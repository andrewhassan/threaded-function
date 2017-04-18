/**
 * @flow
 * ThreadedFunction
 *
 * The ThreadedFunction class allows you to run a pure function in a `Worker`.
 * Doing this allows your function to run in a separate thread without blocking
 * the main thread.
 *
 * The API for this class is fairly simple. You create an instance with the
 * function you'd like to wrap, and then you call the `execute` function with the
 * parameters you want. Your function may return either a value or a `Promise`.
 *
 * Note that all the parameters and the return type of your function must be
 * serializable by the native `Worker` library. Also note that behavior is
 * not defined for non-pure functions (it will most likely error and/or have
 * inconsistent results between Worker and fallback methods).
 *
 * Stuff to do:
 * - proper flow typing
 * - better way of constructing worker function
 * - shared memory (?)
 * - cross browser compatibility
 * - reusing workers
 */
import {noop} from './utils';
import workerHandler from './workerHandler';

type WorkerFunctionType<ParamsType, ResultType> = (...params: ParamsType) => ResultType;
type OptionsType = {
    reuseWorker?: boolean,
};

const RESPONSE_TYPES = {
    ERROR: 'ERROR',
    COMPLETE: 'COMPLETE',
};
const DEFAULT_OPTIONS = {
    reuseWorker: false,
};

// TODO: Better way of getting the Babel shims
const BABEL_TRANSFORMS = `var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };`;

export default class ThreadedFunction<ParamsType, ResultType> {
    _fn: WorkerFunctionType<ParamsType, ResultType>;
    _options: OptionsType;
    _worker: ?Worker;
    _workerUrl: ?string;

    constructor(pureFunction: Function, options?: OptionsType) { // TODO: flow type this properly
        this._fn = pureFunction;
        this._options = Object.assign(DEFAULT_OPTIONS, options || {});
    }

    execute(...params: ParamsType): Promise<ResultType> {
        if (typeof Worker === 'undefined') {
            // $FlowFixMe property `@@iterator` of $Iterable not found...
            return runFallback(this._fn, params);
        }

        const {worker, url} = createWorker(this._fn);

        return new Promise((resolve, reject) => {
            worker.onmessage = e => {
                worker.onmessage = noop;
                // $FlowFixMe flow does not understand that data is always a non-null object
                if (e.data.responseType === RESPONSE_TYPES.COMPLETE) {
                    // $FlowFixMe flow does not understand that data is always a non-null object
                    resolve(e.data.result);
                } else {
                    // $FlowFixMe flow does not understand that data is always a non-null object
                    reject(e.data.error || null);
                }

                cleanupWorker(worker, url);
            };
            worker.postMessage(params);
        });
    }
}

//==----------- PRIVATE METHODS ------------==//

function runFallback<ParamsType, ResultType>(fn: WorkerFunctionType<ParamsType, ResultType>, params: ParamsType): Promise<ResultType> {
    return new Promise((resolve, reject) => {
        let result;
        try {
            // If `fn` is not pure, then calling it here in the fallback will
            // allow it to have access to closure/global vars not available when
            // called via Worker. This means potentially inconsistent results.
            // Non-pure function behavior is undefined though so this should be fine.
            // A remedy for inconsistency (albeit a shitty one) would be to isolate
            // the function by stringifying it and evaling it.
            // $FlowFixMe property `@@iterator` of $Iterable not found...
            result = fn.apply(null, params);
        } catch(e) {
            reject(e);
            return;
        }

        if (result && result.then && typeof result.then === 'function') {
            result.then(val => {
                resolve(val);
            }, err => {
                reject(err);
            });
        } else {
            resolve(result);
        }
    });
}

function createWorker<ParamsType, ResultType>(workerFunction: WorkerFunctionType<ParamsType, ResultType>): {worker: Worker, url: string} {
    const workerString = wrappedWorkerFunction(workerFunction);
    const blob = new Blob([workerString], {type: 'application/javascript'});
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    return {
        url,
        worker,
    };
}

function cleanupWorker(worker: Worker, url: string) {
    URL.revokeObjectURL(url);
    worker.terminate();
}

function wrappedWorkerFunction<ParamsType, ResultType>(fn: WorkerFunctionType<ParamsType, ResultType>): string {
    return `${BABEL_TRANSFORMS}\nself.onmessage = ${workerHandler.toString().replace(/__STRINGIFIED_FUNCTION__/g, fn.toString())};`;
}

/**
 * @flow
 * workerOnHandler function
 *
 * This function wraps the dynamic function passed into the ThreadedFunction
 * class. When a worker is created, it will be bound to the `onmessage`
 * event inside the worker.
 *
 * Because this function is not run on the main JS thread, it *MUST* be a
 * pure function (i.e. only depends on the parameters rather than globals
 * or closures).
 *
 * Also, for now we use `__STRINGIFIED_FUNCTION__` as a placeholder for the
 * dynamic function passed into the ThreadedFunction class. What is happening
 * is that when this function is stringified to be turned into a new `Worker`,
 * a simple find/replace is done for the string `__STRINGIFIED_FUNCTION__`. It
 * is expectedly replaced with a stringified version of the dynamic function.
 *
 * This is not (and should not) be the final solution, but it works until I
 * figure out a more elegant solution ¯\_(ツ)_/¯
 *
 * One other thing to note: Do not rely on flow for this part of the code.
 * flow's support here is flaky at best because of the strange things we're doing.
 * Once I figure out a nicer solution, that should hopefully change.
 */
import {noop} from './utils';
const __STRINGIFIED_FUNCTION__ = noop;

// workerHandler *must* be a pure function
export default function workerHandler<ParamsType>(e: {data: ParamsType}) {
    const params = e.data;
    let result;
    try {
        // $FlowFixMe flow doesn't like this for obvious reasons
        result = __STRINGIFIED_FUNCTION__.apply(null, params);
    } catch(e) {
        let error;
        if (typeof e === 'object' && e.toString) {
            error = e.toString();
        } else {
            error = JSON.stringify(e);
        }
        this.postMessage({
            responseType: 'ERROR',
            error: error,
        });
        return;
    }
    if (result && result.then && typeof result.then === 'function') {
        result.then(value => {
            this.postMessage({
                responseType: 'COMPLETE',
                result: value,
            });
        }, e => {
            let error;
            if (typeof e === 'object' && e.toString) {
                error = e.toString();
            } else {
                error = JSON.stringify(e);
            }
            this.postMessage({
                responseType: '${RESPONSE_TYPES.ERROR}',
                error: error,
            });
        });
    } else {
        this.postMessage({
            responseType: 'COMPLETE',
            result: result,
        });
    }
};

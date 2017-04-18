/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
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


	var _utils = __webpack_require__(1);

	var _workerHandler = __webpack_require__(2);

	var _workerHandler2 = _interopRequireDefault(_workerHandler);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RESPONSE_TYPES = {
	    ERROR: 'ERROR',
	    COMPLETE: 'COMPLETE'
	};

	// TODO: Better way of getting the Babel shims
	var BABEL_TRANSFORMS = 'var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };';

	var ThreadedFunction = function () {
	    function ThreadedFunction(pureFunction) {
	        _classCallCheck(this, ThreadedFunction);

	        // TODO: flow type this properly
	        this._fn = pureFunction;
	    }

	    _createClass(ThreadedFunction, [{
	        key: 'execute',
	        value: function execute() {
	            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
	                params[_key] = arguments[_key];
	            }

	            if (typeof Worker === 'undefined') {
	                // $FlowFixMe property `@@iterator` of $Iterable not found...
	                return runFallback(this._fn, params);
	            }

	            var _createWorker = createWorker(this._fn),
	                worker = _createWorker.worker,
	                url = _createWorker.url;

	            return new Promise(function (resolve, reject) {
	                worker.onmessage = function (e) {
	                    worker.onmessage = _utils.noop;
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
	    }]);

	    return ThreadedFunction;
	}();

	//==----------- PRIVATE METHODS ------------==//

	exports.default = ThreadedFunction;
	function runFallback(fn, params) {
	    return new Promise(function (resolve, reject) {
	        var result = void 0;
	        try {
	            // If `fn` is not pure, then calling it here in the fallback will
	            // allow it to have access to closure/global vars not available when
	            // called via Worker. This means potentially inconsistent results.
	            // Non-pure function behavior is undefined though so this should be fine.
	            // A remedy for inconsistency (albeit a shitty one) would be to isolate
	            // the function by stringifying it and evaling it.
	            // $FlowFixMe property `@@iterator` of $Iterable not found...
	            result = fn.apply(null, params);
	        } catch (e) {
	            reject(e);
	            return;
	        }

	        if (result && result.then && typeof result.then === 'function') {
	            result.then(function (val) {
	                resolve(val);
	            }, function (err) {
	                reject(err);
	            });
	        } else {
	            resolve(result);
	        }
	    });
	}

	function createWorker(workerFunction) {
	    var workerString = wrappedWorkerFunction(workerFunction);
	    var blob = new Blob([workerString], { type: 'application/javascript' });
	    var url = URL.createObjectURL(blob);
	    var worker = new Worker(url);
	    return {
	        url: url,
	        worker: worker
	    };
	}

	function cleanupWorker(worker, url) {
	    URL.revokeObjectURL(url);
	    worker.terminate();
	}

	function wrappedWorkerFunction(fn) {
	    return BABEL_TRANSFORMS + '\nself.onmessage = ' + _workerHandler2.default.toString().replace(/__STRINGIFIED_FUNCTION__/g, fn.toString()) + ';';
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var noop = function noop() {};
	exports.noop = noop;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * 
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


	exports.default = workerHandler;

	var _utils = __webpack_require__(1);

	var __STRINGIFIED_FUNCTION__ = _utils.noop;

	// workerHandler *must* be a pure function
	function workerHandler(e) {
	    var _this = this;

	    var params = e.data;
	    var result = void 0;
	    try {
	        // $FlowFixMe flow doesn't like this for obvious reasons
	        result = __STRINGIFIED_FUNCTION__.apply(null, params);
	    } catch (e) {
	        var error = void 0;
	        if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && e.toString) {
	            error = e.toString();
	        } else {
	            error = JSON.stringify(e);
	        }
	        this.postMessage({
	            responseType: 'ERROR',
	            error: error
	        });
	        return;
	    }
	    if (result && result.then && typeof result.then === 'function') {
	        result.then(function (value) {
	            _this.postMessage({
	                responseType: 'COMPLETE',
	                result: value
	            });
	        }, function (e) {
	            var error = void 0;
	            if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && e.toString) {
	                error = e.toString();
	            } else {
	                error = JSON.stringify(e);
	            }
	            _this.postMessage({
	                responseType: '${RESPONSE_TYPES.ERROR}',
	                error: error
	            });
	        });
	    } else {
	        this.postMessage({
	            responseType: 'COMPLETE',
	            result: result
	        });
	    }
	};

/***/ })
/******/ ]);
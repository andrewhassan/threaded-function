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

	var _ThreadedFunction = __webpack_require__(1);

	var _ThreadedFunction2 = _interopRequireDefault(_ThreadedFunction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addOne(a) {
	    return a + 1;
	}
	var threadedAddOne = new _ThreadedFunction2.default(addOne);
	threadedAddOne.execute(1).then(function (result) {
	    console.log(result);
	});

	function longRunning(a) {
	    return new Promise(function (resolve) {
	        setTimeout(function () {
	            resolve(a + 123);
	        }, 1000);
	    });
	}

	var threadedLongRunning = new _ThreadedFunction2.default(longRunning);
	threadedLongRunning.execute(1234).then(function (result) {
	    console.log(result);
	});

	var test = new _ThreadedFunction2.default(function () {
	    console.log('this is running in a threaded anonymous function');
	});
	test.execute();

	function error() {
	    throw new Error('this is an error!');
	}
	var threadedError = new _ThreadedFunction2.default(error);
	threadedError.execute().catch(function (error) {
	    console.log('Yay, we caught an expected error:', error);
	});

	function rejection() {
	    return Promise.reject(new Error('Promise rejection error'));
	}
	var threadedPromiseRejection = new _ThreadedFunction2.default(rejection);
	threadedPromiseRejection.execute().catch(function (error) {
	    console.log('Yay, we caught an expected error:', error);
	});

	var x = 123;
	function nonPureFunction(a) {
	    return x + a;
	}
	var nonPure = new _ThreadedFunction2.default(nonPureFunction);
	nonPure.execute(1).then(function (result) {
	    console.error('We should not receive a result for this function');
	}, function (error) {
	    console.log('Yay, we caught an expected error:', error);
	});

	function concurrent(val) {
	    return new Promise(function (resolve) {
	        setTimeout(function () {
	            resolve(val);
	        }, 2000);
	    });
	}
	var threadedConcurrent = new _ThreadedFunction2.default(concurrent);
	threadedConcurrent.execute(1).then(function (val) {
	    console.log('this should be true,', val === 1);
	});
	threadedConcurrent.execute(2).then(function (val) {
	    console.log('this should be true,', val === 2);
	});
	threadedConcurrent.execute(3).then(function (val) {
	    console.log('this should be true,', val === 3);
	});
	threadedConcurrent.execute(4).then(function (val) {
	    console.log('this should be true,', val === 4);
	});
	threadedConcurrent.execute(5).then(function (val) {
	    console.log('this should be true,', val === 5);
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	(function webpackUniversalModuleDefinition(root, factory) {
		if (( false ? 'undefined' : _typeof2(exports)) === 'object' && ( false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["threaded-function"] = factory();else root["threaded-function"] = factory();
	})(undefined, function () {
		return function (modules) {
			var installedModules = {};

			function __webpack_require__(moduleId) {
				if (installedModules[moduleId]) return installedModules[moduleId].exports;

				var module = installedModules[moduleId] = { exports: {},
					id: moduleId,
					loaded: false
				};

				modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

				module.loaded = true;

				return module.exports;
			}

			__webpack_require__.m = modules;

			__webpack_require__.c = installedModules;

			__webpack_require__.p = "";

			return __webpack_require__(0);
		}([function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
					}
				}return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
				};
			}();

			var _utils = __webpack_require__(1);

			var _workerHandler = __webpack_require__(2);

			var _workerHandler2 = _interopRequireDefault(_workerHandler);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) {
					throw new TypeError("Cannot call a class as a function");
				}
			}

			var RESPONSE_TYPES = {
				ERROR: 'ERROR',
				COMPLETE: 'COMPLETE'
			};

			var BABEL_TRANSFORMS = 'var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };';

			var ThreadedFunction = function () {
				function ThreadedFunction(pureFunction) {
					_classCallCheck(this, ThreadedFunction);

					this._fn = pureFunction;
				}

				_createClass(ThreadedFunction, [{
					key: 'execute',
					value: function execute() {
						for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
							params[_key] = arguments[_key];
						}

						if (typeof Worker === 'undefined') {
							return runFallback(this._fn, params);
						}

						var _createWorker = createWorker(this._fn),
						    worker = _createWorker.worker,
						    url = _createWorker.url;

						return new Promise(function (resolve, reject) {
							worker.onmessage = function (e) {
								worker.onmessage = _utils.noop;

								if (e.data.responseType === RESPONSE_TYPES.COMPLETE) {
									resolve(e.data.result);
								} else {
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

			exports.default = ThreadedFunction;

			function runFallback(fn, params) {
				return new Promise(function (resolve, reject) {
					var result = void 0;
					try {
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
			module.exports = exports['default'];
		}, function (module, exports) {

			"use strict";

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var noop = function noop() {};
			exports.noop = noop;
		}, function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
				return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
			} : function (obj) {
				return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
			};

			exports.default = workerHandler;

			var _utils = __webpack_require__(1);

			var __STRINGIFIED_FUNCTION__ = _utils.noop;

			function workerHandler(e) {
				var _this = this;

				var params = e.data;
				var result = void 0;
				try {
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
			module.exports = exports['default'];
		}]);
	});
	;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];

			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ })
/******/ ]);

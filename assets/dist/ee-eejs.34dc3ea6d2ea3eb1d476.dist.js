var eejs =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/eejs/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/eejs/currency_config.js":
/*!********************************************!*\
  !*** ./assets/src/eejs/currency_config.js ***!
  \********************************************/
/*! exports provided: currencyConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currencyConfig", function() { return currencyConfig; });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./assets/src/eejs/data.js");

/**
 * Provided via the data passed along by the server.
 * This data a configuration object passed along from the server that indicates
 * the default currency settings from the server.
 * @type {{}}
 */

var _data$currency_config = _data__WEBPACK_IMPORTED_MODULE_0__["default"].currency_config,
    currencyConfig = _data$currency_config === void 0 ? {} : _data$currency_config;


/***/ }),

/***/ "./assets/src/eejs/data.js":
/*!*********************************!*\
  !*** ./assets/src/eejs/data.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This will hold arbitrary data assigned by the Assets Registry.
 * @type {{}}
 */
var data = eejsdata.data || {};
/* harmony default export */ __webpack_exports__["default"] = (data);

/***/ }),

/***/ "./assets/src/eejs/exceptions/general.js":
/*!***********************************************!*\
  !*** ./assets/src/eejs/exceptions/general.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/construct */ "./node_modules/@babel/runtime/helpers/construct.js");
/* harmony import */ var _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0__);


/**
 * General EE Exception
 * Usage: throw new eejs.Exception('some message')
 * @param {string} message
 * @param {...mixed} args
 * @return {Exception} instance
 */
function Exception(message) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var instance = _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0___default()(Error, [message].concat(args));

  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));

  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, Exception);
  }

  return instance;
}

Exception.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(Exception, Error);
} else {
  Exception.__proto__ = Error;
}

/* harmony default export */ __webpack_exports__["default"] = (Exception);

/***/ }),

/***/ "./assets/src/eejs/exceptions/index.js":
/*!*********************************************!*\
  !*** ./assets/src/eejs/exceptions/index.js ***!
  \*********************************************/
/*! exports provided: Exception, InvalidSchema, InvalidArgument, InvalidTimezone, InvalidISO8601String, InvalidLocale, InvalidDatetime, InvalidType, InvalidModelEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _general__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general */ "./assets/src/eejs/exceptions/general.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Exception", function() { return _general__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _invalid_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invalid-schema */ "./assets/src/eejs/exceptions/invalid-schema.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidSchema", function() { return _invalid_schema__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _invalid_argument__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./invalid-argument */ "./assets/src/eejs/exceptions/invalid-argument.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidArgument", function() { return _invalid_argument__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _invalid_timezone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./invalid-timezone */ "./assets/src/eejs/exceptions/invalid-timezone.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidTimezone", function() { return _invalid_timezone__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _invalid_iso8601_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./invalid-iso8601-string */ "./assets/src/eejs/exceptions/invalid-iso8601-string.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidISO8601String", function() { return _invalid_iso8601_string__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _invalid_locale__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./invalid-locale */ "./assets/src/eejs/exceptions/invalid-locale.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidLocale", function() { return _invalid_locale__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _invalid_datetime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./invalid-datetime */ "./assets/src/eejs/exceptions/invalid-datetime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidDatetime", function() { return _invalid_datetime__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _invalid_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./invalid-type */ "./assets/src/eejs/exceptions/invalid-type.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidType", function() { return _invalid_type__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _invalid_model_entity__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./invalid-model-entity */ "./assets/src/eejs/exceptions/invalid-model-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidModelEntity", function() { return _invalid_model_entity__WEBPACK_IMPORTED_MODULE_8__["default"]; });











/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-argument.js":
/*!********************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-argument.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/construct */ "./node_modules/@babel/runtime/helpers/construct.js");
/* harmony import */ var _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0__);


/**
 * InvalidArgument
 * Usage: throw new eejs.InvalidArgument('some message'[, argument])
 *
 * Typically this error is thrown when a function or method is called with an
 * invalid argument for a given parameter.  It could still be the right type
 * but its an unexpected value.
 *
 * @param {string} message
 * @param {mixed} argumentValue Optional, the argument that caused the error.
 * @param {...mixed} args
 * @return {InvalidArgument} instance of InvalidArgument
 */
function InvalidArgument(message, argumentValue) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var instance = _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0___default()(Error, [message].concat(args));

  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  instance.argumentValue = argumentValue || null;
  instance.name = instance.constructor.name;
  instance.message = instance.message !== '' ? 'Invalid argument provided. ' + instance.message : 'Invalid argument provided.';

  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, InvalidArgument);
  }

  return instance;
}

InvalidArgument.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(InvalidArgument, Error);
} else {
  InvalidArgument.__proto__ = Error;
}

/* harmony default export */ __webpack_exports__["default"] = (InvalidArgument);

/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-datetime.js":
/*!********************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-datetime.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InvalidDateTime; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _invalid_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./invalid-type */ "./assets/src/eejs/exceptions/invalid-type.js");






/**
 * Internal imports
 */

/**
 * InvalidDateTime
 * Usage: throw new eejs.InvalidDateTime('some message', [datetime])
 *
 * Typically this error is thrown when a given string is not a valid datetime
 * string.
 *
 * @param {string} msg
 * @param {mixed} datetime Optional, the datetime string that is invalid
 */

var InvalidDateTime =
/*#__PURE__*/
function (_InvalidType) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(InvalidDateTime, _InvalidType);

  function InvalidDateTime(datetime, message) {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, InvalidDateTime);

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(InvalidDateTime)).call.apply(_getPrototypeOf2, [this, message].concat(args)));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), InvalidDateTime);
    }

    _this.message = 'The value provided is not a valid DateTime. ' + _this.message;
    _this.datetime = datetime || '';
    _this.name = 'InvalidDateTime';
    return _this;
  }

  return InvalidDateTime;
}(_invalid_type__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-iso8601-string.js":
/*!**************************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-iso8601-string.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InvalidISO8601String; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _invalid_argument__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./invalid-argument */ "./assets/src/eejs/exceptions/invalid-argument.js");






/**
 * Internal Imports
 */

/**
 * InvalidIso8601String
 * Usage: throw new eejs.InvalidISO8601String('some message', [dateTimeString])
 *
 * Typically this error is thrown when a given string is not the correct format
 * for ISO 8601.
 *
 * @param {string} msg
 * @param {mixed} dateTimeString Optional, the timezone string that is invalid
 */

var InvalidISO8601String =
/*#__PURE__*/
function (_InvalidArgument) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(InvalidISO8601String, _InvalidArgument);

  function InvalidISO8601String(dateTimeString) {
    var _getPrototypeOf2;

    var _this;

    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, InvalidISO8601String);

    message = message ? 'The string provided is not a valid ISO 8601 formatted string. ' + message : 'The string provided is not a valid ISO 8601 formatted string.';

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(InvalidISO8601String)).call.apply(_getPrototypeOf2, [this, message, dateTimeString].concat(args)));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), InvalidISO8601String);
    }

    _this.dateTimeString = dateTimeString || '';
    return _this;
  }

  return InvalidISO8601String;
}(_invalid_argument__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-locale.js":
/*!******************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-locale.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InvalidLocale; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _invalid_argument__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./invalid-argument */ "./assets/src/eejs/exceptions/invalid-argument.js");






/**
 * Internal imports
 */

/**
 * InvalidLocale
 * Usage: throw new eejs.InvalidLocale('some message', [locale])
 *
 * Typically this error is thrown when a given string is not a valid locale
 * string.
 *
 * @param {string} msg
 * @param {mixed} locale Optional, the locale string that is invalid
 */

var InvalidLocale =
/*#__PURE__*/
function (_InvalidArgument) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(InvalidLocale, _InvalidArgument);

  function InvalidLocale(locale) {
    var _getPrototypeOf2;

    var _this;

    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, InvalidLocale);

    message = message ? 'The locale string provided is not valid. ' + message : 'The locale string provided is not valid.';

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(InvalidLocale)).call.apply(_getPrototypeOf2, [this, message, locale].concat(args)));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), InvalidLocale);
    }

    _this.locale = locale || '';
    return _this;
  }

  return InvalidLocale;
}(_invalid_argument__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-model-entity.js":
/*!************************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-model-entity.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InvalidModelEntity; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _invalid_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./invalid-type */ "./assets/src/eejs/exceptions/invalid-type.js");






/**
 * Internal imports
 */

/**
 * InvalidSchema
 * Usage: throw new eejs.InvalidSchema('some message', [schema object])
 *
 * Typically this error is thrown when an object representing a model schema
 * (at a minimum) does not have a "properties" property).
 *
 * @param {string} msg
 * @param {mixed} schema Optional, the schema object which will be added to a
 * schema property.
 */

var InvalidModelEntity =
/*#__PURE__*/
function (_InvalidType) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(InvalidModelEntity, _InvalidType);

  function InvalidModelEntity() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, InvalidModelEntity);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(InvalidModelEntity)).call.apply(_getPrototypeOf2, [this].concat(args)));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), InvalidModelEntity);
    }

    _this.message = 'Invalid model entity instance provided.' + _this.message;
    _this.modelEntity = args[1] || {};
    return _this;
  }

  return InvalidModelEntity;
}(_invalid_type__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-schema.js":
/*!******************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-schema.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InvalidSchema; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _invalid_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./invalid-type */ "./assets/src/eejs/exceptions/invalid-type.js");






/**
 * Internal imports
 */

/**
 * InvalidSchema
 * Usage: throw new eejs.InvalidSchema('some message', [schema object])
 *
 * Typically this error is thrown when an object representing a model schema
 * (at a minimum) does not have a "properties" property).
 *
 * @param {string} msg
 * @param {mixed} schema Optional, the schema object which will be added to a
 * schema property.
 */

var InvalidSchema =
/*#__PURE__*/
function (_InvalidType) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(InvalidSchema, _InvalidType);

  function InvalidSchema() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, InvalidSchema);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(InvalidSchema)).call.apply(_getPrototypeOf2, [this].concat(args)));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), InvalidSchema);
    }

    _this.message = 'Invalid schema object provided. Must have a' + ' "properties" property.' + _this.message;
    _this.schema = args[1] || {};
    return _this;
  }

  return InvalidSchema;
}(_invalid_type__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-timezone.js":
/*!********************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-timezone.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InvalidTimezone; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _invalid_argument__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./invalid-argument */ "./assets/src/eejs/exceptions/invalid-argument.js");






/**
 * Internal imports
 */

/**
 * InvalidTimezone
 * Usage: throw new eejs.InvalidTimezone('some message', [timezone])
 *
 * Typically this error is thrown when a given string is not a valid timezone
 * string.
 *
 * @param {string} msg
 * @param {mixed} timezone Optional, the timezone string that is invalid
 */

var InvalidTimezone =
/*#__PURE__*/
function (_InvalidArgument) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(InvalidTimezone, _InvalidArgument);

  function InvalidTimezone(timezone) {
    var _getPrototypeOf2;

    var _this;

    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, InvalidTimezone);

    message = message ? 'The timezone string provided is not valid. ' + message : 'The timezone string provided is not valid.';

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(InvalidTimezone)).call.apply(_getPrototypeOf2, [this, message, timezone].concat(args)));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), InvalidTimezone);
    }

    _this.timezone = timezone || '';
    return _this;
  }

  return InvalidTimezone;
}(_invalid_argument__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-type.js":
/*!****************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-type.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/construct */ "./node_modules/@babel/runtime/helpers/construct.js");
/* harmony import */ var _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0__);


/**
 * InvalidType
 * Usage: throw new eejs.InvalidType('some message'[, argument])
 *
 * This is essentially a wrapper around the native `TypeError` error handler.
 * The purpose is to allow for more custom specific type errors to be created
 * using ES6 syntax since there are usually transpiling issues using ES6 syntax
 * extending native Errors.
 *
 * @param {string} message
 * @param {mixed} argumentValue Optional, the argument that caused the error.
 * @param {...mixed} args
 * @return {InvalidType} instance of InvalidType
 */
function InvalidType(message, argumentValue) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var instance = _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0___default()(TypeError, [message].concat(args));

  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  instance.argumentValue = argumentValue || null;
  instance.name = instance.constructor.name;
  instance.message = instance.message !== '' ? 'Invalid type provided. ' + instance.message : 'Invalid type provided.';

  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, InvalidType);
  }

  return instance;
}

InvalidType.prototype = Object.create(TypeError.prototype, {
  constructor: {
    value: TypeError,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(InvalidType, TypeError);
} else {
  InvalidType.__proto__ = TypeError;
}

/* harmony default export */ __webpack_exports__["default"] = (InvalidType);

/***/ }),

/***/ "./assets/src/eejs/index.js":
/*!**********************************!*\
  !*** ./assets/src/eejs/index.js ***!
  \**********************************/
/*! exports provided: data, i18n, routes, CURRENCY_CONFIG, TIMEZONE_CONFIG, SERVER_LOCALE, middleWares, __DEV__, Exception, InvalidSchema, InvalidArgument, InvalidTimezone, InvalidISO8601String, InvalidLocale, InvalidDatetime, InvalidType, InvalidModelEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i18n", function() { return i18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "middleWares", function() { return middleWares; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__DEV__", function() { return __DEV__; });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./assets/src/eejs/data.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "data", function() { return _data__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes */ "./assets/src/eejs/routes.js");
/* harmony import */ var _currency_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currency_config */ "./assets/src/eejs/currency_config.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CURRENCY_CONFIG", function() { return _currency_config__WEBPACK_IMPORTED_MODULE_3__["currencyConfig"]; });

/* harmony import */ var _timezone_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timezone-config */ "./assets/src/eejs/timezone-config.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TIMEZONE_CONFIG", function() { return _timezone_config__WEBPACK_IMPORTED_MODULE_4__["timezoneConfig"]; });

/* harmony import */ var _locale__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./locale */ "./assets/src/eejs/locale.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SERVER_LOCALE", function() { return _locale__WEBPACK_IMPORTED_MODULE_5__["locale"]; });

/* harmony import */ var _exceptions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./exceptions */ "./assets/src/eejs/exceptions/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Exception", function() { return _exceptions__WEBPACK_IMPORTED_MODULE_6__["Exception"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidSchema", function() { return _exceptions__WEBPACK_IMPORTED_MODULE_6__["InvalidSchema"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidArgument", function() { return _exceptions__WEBPACK_IMPORTED_MODULE_6__["InvalidArgument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidTimezone", function() { return _exceptions__WEBPACK_IMPORTED_MODULE_6__["InvalidTimezone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidISO8601String", function() { return _exceptions__WEBPACK_IMPORTED_MODULE_6__["InvalidISO8601String"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidLocale", function() { return _exceptions__WEBPACK_IMPORTED_MODULE_6__["InvalidLocale"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidDatetime", function() { return _exceptions__WEBPACK_IMPORTED_MODULE_6__["InvalidDatetime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidType", function() { return _exceptions__WEBPACK_IMPORTED_MODULE_6__["InvalidType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidModelEntity", function() { return _exceptions__WEBPACK_IMPORTED_MODULE_6__["InvalidModelEntity"]; });

/* harmony import */ var _middlewares__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./middlewares */ "./assets/src/eejs/middlewares/index.js");
/**
 * WordPress imports
 */

/**
 * Exported to the `eejs` global.
 */


/**
 * Wrapper around wp.i18n functionality so its exposed on the eejs global as
 * eejs.i18n;
 */

var i18n = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__;
/**
 * exporting routes to a named var
 */


var routes = _routes__WEBPACK_IMPORTED_MODULE_2__;
/**
 * Currency Configuration for the default currency from the server
 */


/**
 * Default timezone configuration for the default timezone settings from the
 * server
 */


/**
 * Server locale configuration.
 */


/**
 * Custom exceptions
 */


/**
 * Middle-wares for various libraries
 */


var middleWares = _middlewares__WEBPACK_IMPORTED_MODULE_7__;
/**
 * environment constant indicating development server
 */

var __DEV__ = "development" !== 'production';

/***/ }),

/***/ "./assets/src/eejs/locale.js":
/*!***********************************!*\
  !*** ./assets/src/eejs/locale.js ***!
  \***********************************/
/*! exports provided: locale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locale", function() { return locale; });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./assets/src/eejs/data.js");

/**
 * Provided via the data passed along by the server.
 * This data is a configuration object passed along from the server that exposes
 * the default locale settings from the server.
 * @type {{}}
 */

var _data$locale = _data__WEBPACK_IMPORTED_MODULE_0__["default"].locale,
    locale = _data$locale === void 0 ? {
  user: 'en',
  site: 'en'
} : _data$locale;


/***/ }),

/***/ "./assets/src/eejs/middlewares/api-fetch/caps-middleware.js":
/*!******************************************************************!*\
  !*** ./assets/src/eejs/middlewares/api-fetch/caps-middleware.js ***!
  \******************************************************************/
/*! exports provided: CONTEXT_CAPS_READ, CONTEXT_CAPS_READ_ADMIN, CONTEXT_CAPS_EDIT, CONTEXT_CAPS_DELETE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_CAPS_READ", function() { return CONTEXT_CAPS_READ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_CAPS_READ_ADMIN", function() { return CONTEXT_CAPS_READ_ADMIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_CAPS_EDIT", function() { return CONTEXT_CAPS_EDIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_CAPS_DELETE", function() { return CONTEXT_CAPS_DELETE; });
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/url */ "./node_modules/@wordpress/url/build-module/index.js");
/**
 * External dependencies
 */

var CONTEXT_CAPS_READ = 'read';
var CONTEXT_CAPS_READ_ADMIN = 'read_admin';
var CONTEXT_CAPS_EDIT = 'edit';
var CONTEXT_CAPS_DELETE = 'delete';
/**
 * Helper function for whether the path should have the context appended or not.
 * @param {string} pathType apiFetch accepts 'path' or 'url' so we allow for
 * checking that here.
 * @param {Object} options the options object provided to api-fetch
 * @return {boolean} Whether context should be appended or not.
 */

function shouldBeAppended(pathType, options) {
  return typeof options[pathType] === 'string' && (!options.method || options.method === 'GET') && !Object(_wordpress_url__WEBPACK_IMPORTED_MODULE_0__["hasQueryArg"])(options[pathType], 'caps') && /ee\/v4\.8\.36/.exec(options[pathType]) !== null;
}
/**
 * Middleware for the @wordpress/api-fetch library that the given context
 * to the `caps` query arg on every EE GET request.
 *
 * @param { string } context Defaults to 'read'
 * @return {function} middleware callback
 */


var capsMiddleware = function capsMiddleware() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CONTEXT_CAPS_READ;
  return function (options, next) {
    if (shouldBeAppended('url', options)) {
      options.url = Object(_wordpress_url__WEBPACK_IMPORTED_MODULE_0__["addQueryArgs"])(options.url, {
        caps: context
      });
    }

    if (shouldBeAppended('path', options)) {
      options.path = Object(_wordpress_url__WEBPACK_IMPORTED_MODULE_0__["addQueryArgs"])(options.path, {
        caps: context
      });
    }

    return next(options, next);
  };
};

/* harmony default export */ __webpack_exports__["default"] = (capsMiddleware);

/***/ }),

/***/ "./assets/src/eejs/middlewares/api-fetch/index.js":
/*!********************************************************!*\
  !*** ./assets/src/eejs/middlewares/api-fetch/index.js ***!
  \********************************************************/
/*! exports provided: capsMiddleware, CONTEXT_CAPS_READ, CONTEXT_CAPS_READ_ADMIN, CONTEXT_CAPS_EDIT, CONTEXT_CAPS_DELETE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _caps_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./caps-middleware */ "./assets/src/eejs/middlewares/api-fetch/caps-middleware.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "capsMiddleware", function() { return _caps_middleware__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_CAPS_READ", function() { return _caps_middleware__WEBPACK_IMPORTED_MODULE_0__["CONTEXT_CAPS_READ"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_CAPS_READ_ADMIN", function() { return _caps_middleware__WEBPACK_IMPORTED_MODULE_0__["CONTEXT_CAPS_READ_ADMIN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_CAPS_EDIT", function() { return _caps_middleware__WEBPACK_IMPORTED_MODULE_0__["CONTEXT_CAPS_EDIT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_CAPS_DELETE", function() { return _caps_middleware__WEBPACK_IMPORTED_MODULE_0__["CONTEXT_CAPS_DELETE"]; });




/***/ }),

/***/ "./assets/src/eejs/middlewares/index.js":
/*!**********************************************!*\
  !*** ./assets/src/eejs/middlewares/index.js ***!
  \**********************************************/
/*! exports provided: apiFetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiFetch", function() { return apiFetch; });
/* harmony import */ var _api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-fetch */ "./assets/src/eejs/middlewares/api-fetch/index.js");

var apiFetch = _api_fetch__WEBPACK_IMPORTED_MODULE_0__;

/***/ }),

/***/ "./assets/src/eejs/routes.js":
/*!***********************************!*\
  !*** ./assets/src/eejs/routes.js ***!
  \***********************************/
/*! exports provided: SITE_URL, ADMIN_URL, ADMIN_ROUTES, ADMIN_ROUTE_ACTION_DEFAULT, ADMIN_ROUTE_ACTIONS, getAdminUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SITE_URL", function() { return SITE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADMIN_URL", function() { return ADMIN_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADMIN_ROUTES", function() { return ADMIN_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADMIN_ROUTE_ACTION_DEFAULT", function() { return ADMIN_ROUTE_ACTION_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADMIN_ROUTE_ACTIONS", function() { return ADMIN_ROUTE_ACTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAdminUrl", function() { return getAdminUrl; });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./assets/src/eejs/data.js");
/**
 * Internal imports
 */

/**
 * Provided via the data passed along by the server.
 * This data has to do with any paths/route information passed along from the
 * server.
 *
 * @type { {} }
 */

var _data$paths = _data__WEBPACK_IMPORTED_MODULE_0__["default"].paths,
    paths = _data$paths === void 0 ? {} : _data$paths;
/**
 * The base url for the site this js is loaded on.
 * eg. 'https://mysite.com/'
 * @type { string }
 */

var SITE_URL = paths.site_url || '';
/**
 * The base admin url for the site this js is loaded on.
 * eg. 'https://mysite.com/wp-admin/
 * @type { string }
 */

var ADMIN_URL = paths.admin_url || '';
/**
 * A list of all main Event Espresso admin routes.
 *
 * @type { { string: string } }
 */

var ADMIN_ROUTES = {
  EVENTS: 'espresso_events',
  REGISTRATIONS: 'espresso_registrations',
  TRANSACTIONS: 'espresso_transactions',
  MESSAGES: 'espresso_messages',
  PRICES: 'pricing',
  REGISTRATION_FORMS: 'registration_form',
  VENUES: 'espresso_venues',
  GENERAL_SETTINGS: 'espresso_general_settings',
  PAYMENT_METHODS: 'espresso_payment_settings',
  EXTENSIONS_AND_SERVICES: 'espresso_packages',
  MAINTENANCE: 'espresso_maintenance',
  HELP_AND_SUPPORT: 'espresso_support',
  ABOUT: 'espresso_about'
};
/**
 * The string used to indicate the 'default' action route for all Event Espresso
 * admin pages.
 *
 * @type { string }
 */

var ADMIN_ROUTE_ACTION_DEFAULT = 'default';
/**
 * A list of all admin route actions for Event Espresso admin pages.
 * Note: currently this list only includes display actions (not processing
 * actions).
 *
 * @type { { string: { string: string } } }
 */

var ADMIN_ROUTE_ACTIONS = {
  EVENTS: {
    OVERVIEW: ADMIN_ROUTE_ACTION_DEFAULT,
    CATEGORY_LIST: 'category_list',
    TEMPLATES: 'template_settings',
    DEFAULT_SETTINGS: 'default_event_settings',
    DEFAULT_TICKETS: 'ticket_list_table'
  },
  REGISTRATIONS: {
    OVERVIEW: ADMIN_ROUTE_ACTION_DEFAULT,
    EVENT_CHECKIN: 'event_registrations',
    CONTACT_LIST: 'contact_list',
    REPORTS: 'reports'
  },
  TRANSACTIONS: {
    OVERVIEW: ADMIN_ROUTE_ACTION_DEFAULT,
    REPORTS: 'reports'
  },
  MESSAGES: {
    MESSAGE_ACTIVITY: ADMIN_ROUTE_ACTION_DEFAULT,
    DEFAULT_MESSAGE_TEMPLATES: 'global_mtps',
    CUSTOM_MESSAGE_TEMPLATES: 'custom_mtps',
    SETTINGS: 'settings'
  },
  PRICES: {
    DEFAULT_PRICING: ADMIN_ROUTE_ACTION_DEFAULT,
    PRICE_TYPES: 'price_types',
    TAX_SETTINGS: 'tax_settings'
  },
  FORMS: {
    QUESTIONS: ADMIN_ROUTE_ACTION_DEFAULT,
    QUESTION_GROUPS: 'question_groups',
    REG_FORM_SETTINGS: 'view_reg_form_settings'
  },
  VENUES: {
    OVERVIEW: ADMIN_ROUTE_ACTION_DEFAULT,
    CATEGORIES: 'category_list',
    GOOGLE_MAPS: 'google_map_settings'
  },
  SETTINGS: {
    YOUR_ORGANIZATION: ADMIN_ROUTE_ACTION_DEFAULT,
    CRITICAL_PAGES: 'critical_pages',
    ADMIN_OPTIONS: 'admin_option_settings',
    COUNTRIES: 'country_settings',
    PRIVACY_SETTINGS: 'privacy_settings'
  },
  PAYMENT_METHODS: {
    PAYMENT_METHODS: ADMIN_ROUTE_ACTION_DEFAULT,
    SETTINGS: 'payment_settings',
    LOGS: 'payment_log'
  },
  MAINTENANCE: {
    MAINTENANCE: ADMIN_ROUTE_ACTION_DEFAULT,
    RESET_OR_DELETE_DATA: 'data_reset',
    DATETIME_UTILITIES: 'datetime_tools',
    SYSTEM_INFORMATION: 'system_status'
  },
  SUPPORT: {
    SUPPORT: ADMIN_ROUTE_ACTION_DEFAULT,
    FAQ: 'faq',
    DEVELOPERS: 'developers',
    SHORTCODES: 'shortcodes'
  },
  ABOUT: {
    WHATS_NEW: ADMIN_ROUTE_ACTION_DEFAULT,
    ABOUT: 'overview',
    CREDITS: 'credits',
    REVIEWS: 'reviews'
  }
};
/**
 * Return the admin url for a given page and action.
 * @param { string } page  The main ee admin page string
 * @param { string } action This should correspond to the action for the admin
 * 							page.
 * @return { string } A full url for the given arguments.
 */

var getAdminUrl = function getAdminUrl() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ADMIN_ROUTES.EVENTS;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ADMIN_ROUTE_ACTION_DEFAULT;
  return "".concat(ADMIN_URL, "admin.php?page=").concat(page, "&action=").concat(action);
};

/***/ }),

/***/ "./assets/src/eejs/timezone-config.js":
/*!********************************************!*\
  !*** ./assets/src/eejs/timezone-config.js ***!
  \********************************************/
/*! exports provided: timezoneConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timezoneConfig", function() { return timezoneConfig; });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./assets/src/eejs/data.js");

/**
 * Provided via the data passed along by the server.
 * This data a configuration object passed along from the server that exposes
 * the default timezone settings from the server.
 * @type {{}}
 */

var _data$default_timezon = _data__WEBPACK_IMPORTED_MODULE_0__["default"].default_timezone,
    timezoneConfig = _data$default_timezon === void 0 ? {
  pretty: 'UTC',
  string: 'UTC',
  offset: 0
} : _data$default_timezon;


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/construct.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/@tannin/compile/index.js":
/*!***********************************************!*\
  !*** ./node_modules/@tannin/compile/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return compile; });
/* harmony import */ var _tannin_postfix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tannin/postfix */ "./node_modules/@tannin/postfix/index.js");
/* harmony import */ var _tannin_evaluate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tannin/evaluate */ "./node_modules/@tannin/evaluate/index.js");



/**
 * Given a C expression, returns a function which can be called to evaluate its
 * result.
 *
 * @example
 *
 * ```js
 * import compile from '@tannin/compile';
 *
 * const evaluate = compile( 'n > 1' );
 *
 * evaluate( { n: 2 } );
 * // ⇒ true
 * ```
 *
 * @param {string} expression C expression.
 *
 * @return {Function} Compiled evaluator.
 */
function compile( expression ) {
	var terms = Object(_tannin_postfix__WEBPACK_IMPORTED_MODULE_0__["default"])( expression );

	return function( variables ) {
		return Object(_tannin_evaluate__WEBPACK_IMPORTED_MODULE_1__["default"])( terms, variables );
	};
}


/***/ }),

/***/ "./node_modules/@tannin/evaluate/index.js":
/*!************************************************!*\
  !*** ./node_modules/@tannin/evaluate/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return evaluate; });
/**
 * Operator callback functions.
 *
 * @type {Object}
 */
var OPERATORS = {
	'!': function( a ) {
		return ! a;
	},
	'*': function( a, b ) {
		return a * b;
	},
	'/': function( a, b ) {
		return a / b;
	},
	'%': function( a, b ) {
		return a % b;
	},
	'+': function( a, b ) {
		return a + b;
	},
	'-': function( a, b ) {
		return a - b;
	},
	'<': function( a, b ) {
		return a < b;
	},
	'<=': function( a, b ) {
		return a <= b;
	},
	'>': function( a, b ) {
		return a > b;
	},
	'>=': function( a, b ) {
		return a >= b;
	},
	'==': function( a, b ) {
		return a === b;
	},
	'!=': function( a, b ) {
		return a !== b;
	},
	'&&': function( a, b ) {
		return a && b;
	},
	'||': function( a, b ) {
		return a || b;
	},
	'?:': function( a, b, c ) {
		if ( a ) {
			throw b;
		}

		return c;
	},
};

/**
 * Given an array of postfix terms and operand variables, returns the result of
 * the postfix evaluation.
 *
 * @example
 *
 * ```js
 * import evaluate from '@tannin/evaluate';
 *
 * // 3 + 4 * 5 / 6 ⇒ '3 4 5 * 6 / +'
 * const terms = [ '3', '4', '5', '*', '6', '/', '+' ];
 *
 * evaluate( terms, {} );
 * // ⇒ 6.333333333333334
 * ```
 *
 * @param {string[]} postfix   Postfix terms.
 * @param {Object}   variables Operand variables.
 *
 * @return {*} Result of evaluation.
 */
function evaluate( postfix, variables ) {
	var stack = [],
		i, j, args, getOperatorResult, term, value;

	for ( i = 0; i < postfix.length; i++ ) {
		term = postfix[ i ];

		getOperatorResult = OPERATORS[ term ];
		if ( getOperatorResult ) {
			// Pop from stack by number of function arguments.
			j = getOperatorResult.length;
			args = Array( j );
			while ( j-- ) {
				args[ j ] = stack.pop();
			}

			try {
				value = getOperatorResult.apply( null, args );
			} catch ( earlyReturn ) {
				return earlyReturn;
			}
		} else if ( variables.hasOwnProperty( term ) ) {
			value = variables[ term ];
		} else {
			value = +term;
		}

		stack.push( value );
	}

	return stack[ 0 ];
}


/***/ }),

/***/ "./node_modules/@tannin/plural-forms/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@tannin/plural-forms/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return pluralForms; });
/* harmony import */ var _tannin_compile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tannin/compile */ "./node_modules/@tannin/compile/index.js");


/**
 * Given a C expression, returns a function which, when called with a value,
 * evaluates the result with the value assumed to be the "n" variable of the
 * expression. The result will be coerced to its numeric equivalent.
 *
 * @param {string} expression C expression.
 *
 * @return {Function} Evaluator function.
 */
function pluralForms( expression ) {
	var evaluate = Object(_tannin_compile__WEBPACK_IMPORTED_MODULE_0__["default"])( expression );

	return function( n ) {
		return +evaluate( { n: n } );
	};
}


/***/ }),

/***/ "./node_modules/@tannin/postfix/index.js":
/*!***********************************************!*\
  !*** ./node_modules/@tannin/postfix/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return postfix; });
var PRECEDENCE, OPENERS, TERMINATORS, PATTERN;

/**
 * Operator precedence mapping.
 *
 * @type {Object}
 */
PRECEDENCE = {
	'(': 9,
	'!': 8,
	'*': 7,
	'/': 7,
	'%': 7,
	'+': 6,
	'-': 6,
	'<': 5,
	'<=': 5,
	'>': 5,
	'>=': 5,
	'==': 4,
	'!=': 4,
	'&&': 3,
	'||': 2,
	'?': 1,
	'?:': 1,
};

/**
 * Characters which signal pair opening, to be terminated by terminators.
 *
 * @type {string[]}
 */
OPENERS = [ '(', '?' ];

/**
 * Characters which signal pair termination, the value an array with the
 * opener as its first member. The second member is an optional operator
 * replacement to push to the stack.
 *
 * @type {string[]}
 */
TERMINATORS = {
	')': [ '(' ],
	':': [ '?', '?:' ],
};

/**
 * Pattern matching operators and openers.
 *
 * @type {RegExp}
 */
PATTERN = /<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/;

/**
 * Given a C expression, returns the equivalent postfix (Reverse Polish)
 * notation terms as an array.
 *
 * If a postfix string is desired, simply `.join( ' ' )` the result.
 *
 * @example
 *
 * ```js
 * import postfix from '@tannin/postfix';
 *
 * postfix( 'n > 1' );
 * // ⇒ [ 'n', '1', '>' ]
 * ```
 *
 * @param {string} expression C expression.
 *
 * @return {string[]} Postfix terms.
 */
function postfix( expression ) {
	var terms = [],
		stack = [],
		match, operator, term, element;

	while ( ( match = expression.match( PATTERN ) ) ) {
		operator = match[ 0 ];

		// Term is the string preceding the operator match. It may contain
		// whitespace, and may be empty (if operator is at beginning).
		term = expression.substr( 0, match.index ).trim();
		if ( term ) {
			terms.push( term );
		}

		while ( ( element = stack.pop() ) ) {
			if ( TERMINATORS[ operator ] ) {
				if ( TERMINATORS[ operator ][ 0 ] === element ) {
					// Substitution works here under assumption that because
					// the assigned operator will no longer be a terminator, it
					// will be pushed to the stack during the condition below.
					operator = TERMINATORS[ operator ][ 1 ] || operator;
					break;
				}
			} else if ( OPENERS.indexOf( element ) >= 0 || PRECEDENCE[ element ] < PRECEDENCE[ operator ] ) {
				// Push to stack if either an opener or when pop reveals an
				// element of lower precedence.
				stack.push( element );
				break;
			}

			// For each popped from stack, push to terms.
			terms.push( element );
		}

		if ( ! TERMINATORS[ operator ] ) {
			stack.push( operator );
		}

		// Slice matched fragment from expression to continue match.
		expression = expression.substr( match.index + operator.length );
	}

	// Push remainder of operand, if exists, to terms.
	expression = expression.trim();
	if ( expression ) {
		terms.push( expression );
	}

	// Pop remaining items from stack into terms.
	return terms.concat( stack.reverse() );
}


/***/ }),

/***/ "./node_modules/@wordpress/i18n/build-module/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/build-module/index.js ***!
  \************************************************************/
/*! exports provided: setLocaleData, __, _x, _n, _nx, sprintf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLocaleData", function() { return setLocaleData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__", function() { return __; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_x", function() { return _x; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_n", function() { return _n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_nx", function() { return _nx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sprintf", function() { return sprintf; });
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread */ "./node_modules/@wordpress/i18n/node_modules/@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var tannin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tannin */ "./node_modules/tannin/index.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! memize */ "./node_modules/memize/index.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(memize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var sprintf_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sprintf-js */ "./node_modules/@wordpress/i18n/node_modules/sprintf-js/src/sprintf.js");
/* harmony import */ var sprintf_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sprintf_js__WEBPACK_IMPORTED_MODULE_3__);


/**
 * External dependencies
 */



/**
 * Default locale data to use for Tannin domain when not otherwise provided.
 * Assumes an English plural forms expression.
 *
 * @type {Object}
 */

var DEFAULT_LOCALE_DATA = {
  '': {
    plural_forms: 'plural=(n!=1)'
  }
};
/**
 * Log to console, once per message; or more precisely, per referentially equal
 * argument set. Because Jed throws errors, we log these to the console instead
 * to avoid crashing the application.
 *
 * @param {...*} args Arguments to pass to `console.error`
 */

var logErrorOnce = memize__WEBPACK_IMPORTED_MODULE_2___default()(console.error); // eslint-disable-line no-console

/**
 * The underlying instance of Tannin to which exported functions interface.
 *
 * @type {Tannin}
 */

var i18n = new tannin__WEBPACK_IMPORTED_MODULE_1__["default"]({});
/**
 * Merges locale data into the Tannin instance by domain. Accepts data in a
 * Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @param {?Object} data   Locale data configuration.
 * @param {?string} domain Domain for which configuration applies.
 */

function setLocaleData(data) {
  var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
  i18n.data[domain] = Object(_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, DEFAULT_LOCALE_DATA, i18n.data[domain], data); // Populate default domain configuration (supported locale date which omits
  // a plural forms expression).

  i18n.data[domain][''] = Object(_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, DEFAULT_LOCALE_DATA[''], i18n.data[domain]['']);
}
/**
 * Wrapper for Tannin's `dcnpgettext`. Populates default locale data if not
 * otherwise previously assigned.
 *
 * @param {?string} domain  Domain to retrieve the translated text.
 * @param {?string} context Context information for the translators.
 * @param {string}  single  Text to translate if non-plural. Used as fallback
 *                          return value on a caught error.
 * @param {?string} plural  The text to be used if the number is plural.
 * @param {?number} number  The number to compare against to use either the
 *                          singular or plural form.
 *
 * @return {string} The translated string.
 */

function dcnpgettext() {
  var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
  var context = arguments.length > 1 ? arguments[1] : undefined;
  var single = arguments.length > 2 ? arguments[2] : undefined;
  var plural = arguments.length > 3 ? arguments[3] : undefined;
  var number = arguments.length > 4 ? arguments[4] : undefined;

  if (!i18n.data[domain]) {
    setLocaleData(undefined, domain);
  }

  return i18n.dcnpgettext(domain, context, single, plural, number);
}
/**
 * Retrieve the translation of text.
 *
 * @see https://developer.wordpress.org/reference/functions/__/
 *
 * @param {string}  text   Text to translate.
 * @param {?string} domain Domain to retrieve the translated text.
 *
 * @return {string} Translated text.
 */


function __(text, domain) {
  return dcnpgettext(domain, undefined, text);
}
/**
 * Retrieve translated string with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_x/
 *
 * @param {string}  text    Text to translate.
 * @param {string}  context Context information for the translators.
 * @param {?string} domain  Domain to retrieve the translated text.
 *
 * @return {string} Translated context string without pipe.
 */

function _x(text, context, domain) {
  return dcnpgettext(domain, context, text);
}
/**
 * Translates and retrieves the singular or plural form based on the supplied
 * number.
 *
 * @see https://developer.wordpress.org/reference/functions/_n/
 *
 * @param {string}  single The text to be used if the number is singular.
 * @param {string}  plural The text to be used if the number is plural.
 * @param {number}  number The number to compare against to use either the
 *                         singular or plural form.
 * @param {?string} domain Domain to retrieve the translated text.
 *
 * @return {string} The translated singular or plural form.
 */

function _n(single, plural, number, domain) {
  return dcnpgettext(domain, undefined, single, plural, number);
}
/**
 * Translates and retrieves the singular or plural form based on the supplied
 * number, with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_nx/
 *
 * @param {string}  single  The text to be used if the number is singular.
 * @param {string}  plural  The text to be used if the number is plural.
 * @param {number}  number  The number to compare against to use either the
 *                          singular or plural form.
 * @param {string}  context Context information for the translators.
 * @param {?string} domain  Domain to retrieve the translated text.
 *
 * @return {string} The translated singular or plural form.
 */

function _nx(single, plural, number, context, domain) {
  return dcnpgettext(domain, context, single, plural, number);
}
/**
 * Returns a formatted string. If an error occurs in applying the format, the
 * original format string is returned.
 *
 * @param {string}   format  The format of the string to generate.
 * @param {...string} args Arguments to apply to the format.
 *
 * @see http://www.diveintojavascript.com/projects/javascript-sprintf
 *
 * @return {string} The formatted string.
 */

function sprintf(format) {
  try {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return sprintf_js__WEBPACK_IMPORTED_MODULE_3___default.a.sprintf.apply(sprintf_js__WEBPACK_IMPORTED_MODULE_3___default.a, [format].concat(args));
  } catch (error) {
    logErrorOnce('sprintf error: \n\n' + error.toString());
    return format;
  }
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@wordpress/i18n/node_modules/@babel/runtime/helpers/esm/objectSpread.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/node_modules/@babel/runtime/helpers/esm/objectSpread.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _objectSpread; });
/* harmony import */ var _defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defineProperty */ "./node_modules/@wordpress/i18n/node_modules/@babel/runtime/helpers/esm/defineProperty.js");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      Object(_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]);
    });
  }

  return target;
}

/***/ }),

/***/ "./node_modules/@wordpress/i18n/node_modules/sprintf-js/src/sprintf.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/node_modules/sprintf-js/src/sprintf.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* global window, exports, define */

!function() {
    'use strict'

    var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
    }

    function sprintf(key) {
        // `arguments` is not an array, but should be fine for this call
        return sprintf_format(sprintf_parse(key), arguments)
    }

    function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []))
    }

    function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, ph, pad, pad_character, pad_length, is_positive, sign
        for (i = 0; i < tree_length; i++) {
            if (typeof parse_tree[i] === 'string') {
                output += parse_tree[i]
            }
            else if (typeof parse_tree[i] === 'object') {
                ph = parse_tree[i] // convenience purposes only
                if (ph.keys) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < ph.keys.length; k++) {
                        if (arg == undefined) {
                            throw new Error(sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k-1]))
                        }
                        arg = arg[ph.keys[k]]
                    }
                }
                else if (ph.param_no) { // positional argument (explicit)
                    arg = argv[ph.param_no]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
                    arg = arg()
                }

                if (re.numeric_arg.test(ph.type) && (typeof arg !== 'number' && isNaN(arg))) {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
                }

                if (re.number.test(ph.type)) {
                    is_positive = arg >= 0
                }

                switch (ph.type) {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2)
                        break
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10))
                        break
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10)
                        break
                    case 'j':
                        arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0)
                        break
                    case 'e':
                        arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential()
                        break
                    case 'f':
                        arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg)
                        break
                    case 'g':
                        arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg)
                        break
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8)
                        break
                    case 's':
                        arg = String(arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 't':
                        arg = String(!!arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0
                        break
                    case 'v':
                        arg = arg.valueOf()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16)
                        break
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
                        break
                }
                if (re.json.test(ph.type)) {
                    output += arg
                }
                else {
                    if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
                        sign = is_positive ? '+' : '-'
                        arg = arg.toString().replace(re.sign, '')
                    }
                    else {
                        sign = ''
                    }
                    pad_character = ph.pad_char ? ph.pad_char === '0' ? '0' : ph.pad_char.charAt(1) : ' '
                    pad_length = ph.width - (sign + arg).length
                    pad = ph.width ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
                    output += ph.align ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output
    }

    var sprintf_cache = Object.create(null)

    function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
            return sprintf_cache[fmt]
        }

        var _fmt = fmt, match, parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree.push(match[0])
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree.push('%')
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1])
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else {
                                throw new SyntaxError('[sprintf] failed to parse named argument key')
                            }
                        }
                    }
                    else {
                        throw new SyntaxError('[sprintf] failed to parse named argument key')
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
                }

                parse_tree.push(
                    {
                        placeholder: match[0],
                        param_no:    match[1],
                        keys:        match[2],
                        sign:        match[3],
                        pad_char:    match[4],
                        align:       match[5],
                        width:       match[6],
                        precision:   match[7],
                        type:        match[8]
                    }
                )
            }
            else {
                throw new SyntaxError('[sprintf] unexpected placeholder')
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return sprintf_cache[fmt] = parse_tree
    }

    /**
     * export to either browser or node.js
     */
    /* eslint-disable quote-props */
    if (true) {
        exports['sprintf'] = sprintf
        exports['vsprintf'] = vsprintf
    }
    if (typeof window !== 'undefined') {
        window['sprintf'] = sprintf
        window['vsprintf'] = vsprintf

        if (true) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
                return {
                    'sprintf': sprintf,
                    'vsprintf': vsprintf
                }
            }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
        }
    }
    /* eslint-enable quote-props */
}(); // eslint-disable-line


/***/ }),

/***/ "./node_modules/@wordpress/url/build-module/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@wordpress/url/build-module/index.js ***!
  \***********************************************************/
/*! exports provided: isURL, getProtocol, isValidProtocol, getAuthority, isValidAuthority, getPath, isValidPath, getQueryString, isValidQueryString, getFragment, isValidFragment, addQueryArgs, getQueryArg, hasQueryArg, removeQueryArgs, prependHTTP, safeDecodeURI, filterURLForDisplay, safeDecodeURIComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isURL", function() { return isURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProtocol", function() { return getProtocol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidProtocol", function() { return isValidProtocol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAuthority", function() { return getAuthority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidAuthority", function() { return isValidAuthority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPath", function() { return getPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidPath", function() { return isValidPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return getQueryString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidQueryString", function() { return isValidQueryString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFragment", function() { return getFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidFragment", function() { return isValidFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addQueryArgs", function() { return addQueryArgs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryArg", function() { return getQueryArg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasQueryArg", function() { return hasQueryArg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeQueryArgs", function() { return removeQueryArgs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prependHTTP", function() { return prependHTTP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safeDecodeURI", function() { return safeDecodeURI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterURLForDisplay", function() { return filterURLForDisplay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safeDecodeURIComponent", function() { return safeDecodeURIComponent; });
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External dependencies
 */

var URL_REGEXP = /^(?:https?:)?\/\/\S+$/i;
var EMAIL_REGEXP = /^(mailto:)?[a-z0-9._%+-]+@[a-z0-9][a-z0-9.-]*\.[a-z]{2,63}$/i;
var USABLE_HREF_REGEXP = /^(?:[a-z]+:|#|\?|\.|\/)/i;
/**
 * Determines whether the given string looks like a URL.
 *
 * @param {string} url The string to scrutinise.
 *
 * @example
 * ```js
 * const isURL = isURL( 'https://wordpress.org' ); // true
 * ```
 *
 * @return {boolean} Whether or not it looks like a URL.
 */

function isURL(url) {
  return URL_REGEXP.test(url);
}
/**
 * Returns the protocol part of the URL.
 *
 * @param {string} url The full URL.
 *
 * @example
 * ```js
 * const protocol1 = getProtocol( 'tel:012345678' ); // 'tel:'
 * const protocol2 = getProtocol( 'https://wordpress.org' ); // 'https:'
 * ```
 *
 * @return {?string} The protocol part of the URL.
 */

function getProtocol(url) {
  var matches = /^([^\s:]+:)/.exec(url);

  if (matches) {
    return matches[1];
  }
}
/**
 * Tests if a url protocol is valid.
 *
 * @param {string} protocol The url protocol.
 *
 * @example
 * ```js
 * const isValid = isValidProtocol( 'https:' ); // true
 * const isNotValid = isValidProtocol( 'https :' ); // false
 * ```
 *
 * @return {boolean} True if the argument is a valid protocol (e.g. http:, tel:).
 */

function isValidProtocol(protocol) {
  if (!protocol) {
    return false;
  }

  return /^[a-z\-.\+]+[0-9]*:$/i.test(protocol);
}
/**
 * Returns the authority part of the URL.
 *
 * @param {string} url The full URL.
 *
 * @example
 * ```js
 * const authority1 = getAuthority( 'https://wordpress.org/help/' ); // 'wordpress.org'
 * const authority2 = getAuthority( 'https://localhost:8080/test/' ); // 'localhost:8080'
 * ```
 *
 * @return {?string} The authority part of the URL.
 */

function getAuthority(url) {
  var matches = /^[^\/\s:]+:(?:\/\/)?\/?([^\/\s#?]+)[\/#?]{0,1}\S*$/.exec(url);

  if (matches) {
    return matches[1];
  }
}
/**
 * Checks for invalid characters within the provided authority.
 *
 * @param {string} authority A string containing the URL authority.
 *
 * @example
 * ```js
 * const isValid = isValidAuthority( 'wordpress.org' ); // true
 * const isNotValid = isValidAuthority( 'wordpress#org' ); // false
 * ```
 *
 * @return {boolean} True if the argument contains a valid authority.
 */

function isValidAuthority(authority) {
  if (!authority) {
    return false;
  }

  return /^[^\s#?]+$/.test(authority);
}
/**
 * Returns the path part of the URL.
 *
 * @param {string} url The full URL.
 *
 * @example
 * ```js
 * const path1 = getPath( 'http://localhost:8080/this/is/a/test?query=true' ); // 'this/is/a/test'
 * const path2 = getPath( 'https://wordpress.org/help/faq/' ); // 'help/faq'
 * ```
 *
 * @return {?string} The path part of the URL.
 */

function getPath(url) {
  var matches = /^[^\/\s:]+:(?:\/\/)?[^\/\s#?]+[\/]([^\s#?]+)[#?]{0,1}\S*$/.exec(url);

  if (matches) {
    return matches[1];
  }
}
/**
 * Checks for invalid characters within the provided path.
 *
 * @param {string} path The URL path.
 *
 * @example
 * ```js
 * const isValid = isValidPath( 'test/path/' ); // true
 * const isNotValid = isValidPath( '/invalid?test/path/' ); // false
 * ```
 *
 * @return {boolean} True if the argument contains a valid path
 */

function isValidPath(path) {
  if (!path) {
    return false;
  }

  return /^[^\s#?]+$/.test(path);
}
/**
 * Returns the query string part of the URL.
 *
 * @param {string} url The full URL.
 *
 * @example
 * ```js
 * const queryString1 = getQueryString( 'http://localhost:8080/this/is/a/test?query=true#fragment' ); // 'query=true'
 * const queryString2 = getQueryString( 'https://wordpress.org#fragment?query=false&search=hello' ); // 'query=false&search=hello'
 * ```
 *
 * @return {?string} The query string part of the URL.
 */

function getQueryString(url) {
  var matches = /^\S+?\?([^\s#]+)/.exec(url);

  if (matches) {
    return matches[1];
  }
}
/**
 * Checks for invalid characters within the provided query string.
 *
 * @param {string} queryString The query string.
 *
 * @example
 * ```js
 * const isValid = isValidQueryString( 'query=true&another=false' ); // true
 * const isNotValid = isValidQueryString( 'query=true?another=false' ); // false
 * ```
 *
 * @return {boolean} True if the argument contains a valid query string.
 */

function isValidQueryString(queryString) {
  if (!queryString) {
    return false;
  }

  return /^[^\s#?\/]+$/.test(queryString);
}
/**
 * Returns the fragment part of the URL.
 *
 * @param {string} url The full URL
 *
 * @example
 * ```js
 * const fragment1 = getFragment( 'http://localhost:8080/this/is/a/test?query=true#fragment' ); // '#fragment'
 * const fragment2 = getFragment( 'https://wordpress.org#another-fragment?query=true' ); // '#another-fragment'
 * ```
 *
 * @return {?string} The fragment part of the URL.
 */

function getFragment(url) {
  var matches = /^\S+?(#[^\s\?]*)/.exec(url);

  if (matches) {
    return matches[1];
  }
}
/**
 * Checks for invalid characters within the provided fragment.
 *
 * @param {string} fragment The url fragment.
 *
 * @example
 * ```js
 * const isValid = isValidFragment( '#valid-fragment' ); // true
 * const isNotValid = isValidFragment( '#invalid-#fragment' ); // false
 * ```
 *
 * @return {boolean} True if the argument contains a valid fragment.
 */

function isValidFragment(fragment) {
  if (!fragment) {
    return false;
  }

  return /^#[^\s#?\/]*$/.test(fragment);
}
/**
 * Appends arguments as querystring to the provided URL. If the URL already
 * includes query arguments, the arguments are merged with (and take precedent
 * over) the existing set.
 *
 * @param {?string} url  URL to which arguments should be appended. If omitted,
 *                       only the resulting querystring is returned.
 * @param {Object}  args Query arguments to apply to URL.
 *
 * @example
 * ```js
 * const newURL = addQueryArgs( 'https://google.com', { q: 'test' } ); // https://google.com/?q=test
 * ```
 *
 * @return {string} URL with arguments applied.
 */

function addQueryArgs() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var args = arguments.length > 1 ? arguments[1] : undefined;

  // If no arguments are to be appended, return original URL.
  if (!args || !Object.keys(args).length) {
    return url;
  }

  var baseUrl = url; // Determine whether URL already had query arguments.

  var queryStringIndex = url.indexOf('?');

  if (queryStringIndex !== -1) {
    // Merge into existing query arguments.
    args = Object.assign(Object(qs__WEBPACK_IMPORTED_MODULE_0__["parse"])(url.substr(queryStringIndex + 1)), args); // Change working base URL to omit previous query arguments.

    baseUrl = baseUrl.substr(0, queryStringIndex);
  }

  return baseUrl + '?' + Object(qs__WEBPACK_IMPORTED_MODULE_0__["stringify"])(args);
}
/**
 * Returns a single query argument of the url
 *
 * @param {string} url URL
 * @param {string} arg Query arg name
 *
 * @example
 * ```js
 * const foo = getQueryArg( 'https://wordpress.org?foo=bar&bar=baz', 'foo' ); // bar
 * ```
 *
 * @return {Array|string} Query arg value.
 */

function getQueryArg(url, arg) {
  var queryStringIndex = url.indexOf('?');
  var query = queryStringIndex !== -1 ? Object(qs__WEBPACK_IMPORTED_MODULE_0__["parse"])(url.substr(queryStringIndex + 1)) : {};
  return query[arg];
}
/**
 * Determines whether the URL contains a given query arg.
 *
 * @param {string} url URL
 * @param {string} arg Query arg name
 *
 * @example
 * ```js
 * const hasBar = hasQueryArg( 'https://wordpress.org?foo=bar&bar=baz', 'bar' ); // true
 * ```
 *
 * @return {boolean} Whether or not the URL contains the query arg.
 */

function hasQueryArg(url, arg) {
  return getQueryArg(url, arg) !== undefined;
}
/**
 * Removes arguments from the query string of the url
 *
 * @param {string} url  URL
 * @param {...string} args Query Args
 *
 * @example
 * ```js
 * const newUrl = removeQueryArgs( 'https://wordpress.org?foo=bar&bar=baz&baz=foobar', 'foo', 'bar' ); // https://wordpress.org?baz=foobar
 * ```
 *
 * @return {string} Updated URL
 */

function removeQueryArgs(url) {
  var queryStringIndex = url.indexOf('?');
  var query = queryStringIndex !== -1 ? Object(qs__WEBPACK_IMPORTED_MODULE_0__["parse"])(url.substr(queryStringIndex + 1)) : {};
  var baseUrl = queryStringIndex !== -1 ? url.substr(0, queryStringIndex) : url;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  args.forEach(function (arg) {
    return delete query[arg];
  });
  return baseUrl + '?' + Object(qs__WEBPACK_IMPORTED_MODULE_0__["stringify"])(query);
}
/**
 * Prepends "http://" to a url, if it looks like something that is meant to be a TLD.
 *
 * @param  {string} url The URL to test
 *
 * @example
 * ```js
 * const actualURL = prependHTTP( 'wordpress.org' ); // http://wordpress.org
 * ```
 *
 * @return {string}     The updated URL
 */

function prependHTTP(url) {
  if (!USABLE_HREF_REGEXP.test(url) && !EMAIL_REGEXP.test(url)) {
    return 'http://' + url;
  }

  return url;
}
/**
 * Safely decodes a URI with `decodeURI`. Returns the URI unmodified if
 * `decodeURI` throws an error.
 *
 * @param {string} uri URI to decode.
 *
 * @example
 * ```js
 * const badUri = safeDecodeURI( '%z' ); // does not throw an Error, simply returns '%z'
 * ```
 *
 * @return {string} Decoded URI if possible.
 */

function safeDecodeURI(uri) {
  try {
    return decodeURI(uri);
  } catch (uriError) {
    return uri;
  }
}
/**
 * Returns a URL for display.
 *
 * @param {string} url Original URL.
 *
 * @example
 * ```js
 * const displayUrl = filterURLForDisplay( 'https://www.wordpress.org/gutenberg/' ); // wordpress.org/gutenberg
 * ```
 *
 * @return {string} Displayed URL.
 */

function filterURLForDisplay(url) {
  // Remove protocol and www prefixes.
  var filteredURL = url.replace(/^(?:https?:)\/\/(?:www\.)?/, ''); // Ends with / and only has that single slash, strip it.

  if (filteredURL.match(/^[^\/]+\/$/)) {
    return filteredURL.replace('/', '');
  }

  return filteredURL;
}
/**
 * Safely decodes a URI component with `decodeURIComponent`. Returns the URI component unmodified if
 * `decodeURIComponent` throws an error.
 *
 * @param {string} uriComponent URI component to decode.
 *
 * @return {string} Decoded URI component if possible.
 */

function safeDecodeURIComponent(uriComponent) {
  try {
    return decodeURIComponent(uriComponent);
  } catch (uriComponentError) {
    return uriComponent;
  }
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/memize/index.js":
/*!**************************************!*\
  !*** ./node_modules/memize/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function memize( fn, options ) {
	var size = 0,
		maxSize, head, tail;

	if ( options && options.maxSize ) {
		maxSize = options.maxSize;
	}

	function memoized( /* ...args */ ) {
		var node = head,
			len = arguments.length,
			args, i;

		searchCache: while ( node ) {
			// Perform a shallow equality test to confirm that whether the node
			// under test is a candidate for the arguments passed. Two arrays
			// are shallowly equal if their length matches and each entry is
			// strictly equal between the two sets. Avoid abstracting to a
			// function which could incur an arguments leaking deoptimization.

			// Check whether node arguments match arguments length
			if ( node.args.length !== arguments.length ) {
				node = node.next;
				continue;
			}

			// Check whether node arguments match arguments values
			for ( i = 0; i < len; i++ ) {
				if ( node.args[ i ] !== arguments[ i ] ) {
					node = node.next;
					continue searchCache;
				}
			}

			// At this point we can assume we've found a match

			// Surface matched node to head if not already
			if ( node !== head ) {
				// As tail, shift to previous. Must only shift if not also
				// head, since if both head and tail, there is no previous.
				if ( node === tail ) {
					tail = node.prev;
				}

				// Adjust siblings to point to each other. If node was tail,
				// this also handles new tail's empty `next` assignment.
				node.prev.next = node.next;
				if ( node.next ) {
					node.next.prev = node.prev;
				}

				node.next = head;
				node.prev = null;
				head.prev = node;
				head = node;
			}

			// Return immediately
			return node.val;
		}

		// No cached value found. Continue to insertion phase:

		// Create a copy of arguments (avoid leaking deoptimization)
		args = new Array( len );
		for ( i = 0; i < len; i++ ) {
			args[ i ] = arguments[ i ];
		}

		node = {
			args: args,

			// Generate the result from original function
			val: fn.apply( null, args )
		};

		// Don't need to check whether node is already head, since it would
		// have been returned above already if it was

		// Shift existing head down list
		if ( head ) {
			head.prev = node;
			node.next = head;
		} else {
			// If no head, follows that there's no tail (at initial or reset)
			tail = node;
		}

		// Trim tail if we're reached max size and are pending cache insertion
		if ( size === maxSize ) {
			tail = tail.prev;
			tail.next = null;
		} else {
			size++;
		}

		head = node;

		return node.val;
	}

	memoized.clear = function() {
		head = null;
		tail = null;
		size = 0;
	};

	if ( false ) {}

	return memoized;
};


/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

var encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),

/***/ "./node_modules/tannin/index.js":
/*!**************************************!*\
  !*** ./node_modules/tannin/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tannin; });
/* harmony import */ var _tannin_plural_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tannin/plural-forms */ "./node_modules/@tannin/plural-forms/index.js");


/**
 * Tannin constructor options.
 *
 * @property {?string}   contextDelimiter Joiner in string lookup with context.
 * @property {?Function} onMissingKey     Callback to invoke when key missing.
 *
 * @type {Object}
 *
 * @typedef {TanninOptions}
 */

/**
 * Default Tannin constructor options.
 *
 * @type {TanninOptions}
 */
var DEFAULT_OPTIONS = {
	contextDelimiter: '\u0004',
	onMissingKey: null,
};

/**
 * Given a specific locale data's config `plural_forms` value, returns the
 * expression.
 *
 * @example
 *
 * ```
 * getPluralExpression( 'nplurals=2; plural=(n != 1);' ) === '(n != 1)'
 * ```
 *
 * @param {string} pf Locale data plural forms.
 *
 * @return {string} Plural forms expression.
 */
function getPluralExpression( pf ) {
	var parts, i, part;

	parts = pf.split( ';' );

	for ( i = 0; i < parts.length; i++ ) {
		part = parts[ i ].trim();
		if ( part.indexOf( 'plural=' ) === 0 ) {
			return part.substr( 7 );
		}
	}
}

/**
 * Tannin constructor.
 *
 * @param {Object}        data    Jed-formatted locale data.
 * @param {TanninOptions} options Tannin options.
 */
function Tannin( data, options ) {
	var key;

	this.data = data;
	this.pluralForms = {};

	options = options || {};
	this.options = {};
	for ( key in DEFAULT_OPTIONS ) {
		this.options[ key ] = options[ key ] || DEFAULT_OPTIONS[ key ];
	}
}

/**
 * Returns the plural form index for the given domain and value.
 *
 * @param {string} domain Domain on which to calculate plural form.
 * @param {number} n      Value for which plural form is to be calculated.
 *
 * @return {number} Plural form index.
 */
Tannin.prototype.getPluralForm = function( domain, n ) {
	var getPluralForm = this.pluralForms[ domain ],
		config, plural, pf;

	if ( ! getPluralForm ) {
		config = this.data[ domain ][ '' ];

		pf = (
			config[ 'Plural-Forms' ] ||
			config[ 'plural-forms' ] ||
			config.plural_forms
		);

		if ( typeof pf !== 'function' ) {
			plural = getPluralExpression(
				config[ 'Plural-Forms' ] ||
				config[ 'plural-forms' ] ||
				config.plural_forms
			);

			pf = Object(_tannin_plural_forms__WEBPACK_IMPORTED_MODULE_0__["default"])( plural );
		}

		getPluralForm = this.pluralForms[ domain ] = pf;
	}

	return getPluralForm( n );
};

/**
 * Translate a string.
 *
 * @param {string} domain   Translation domain.
 * @param {string} context  Context distinguishing terms of the same name.
 * @param {string} singular Primary key for translation lookup.
 * @param {string} plural   Fallback value used for non-zero plural form index.
 * @param {number} n        Value to use in calculating plural form.
 *
 * @return {string} Translated string.
 */
Tannin.prototype.dcnpgettext = function( domain, context, singular, plural, n ) {
	var index, key, entry;

	if ( n === undefined ) {
		// Default to singular.
		index = 0;
	} else {
		// Find index by evaluating plural form for value.
		index = this.getPluralForm( domain, n );
	}

	key = singular;

	// If provided, context is prepended to key with delimiter.
	if ( context ) {
		key = context + this.options.contextDelimiter + singular;
	}

	entry = this.data[ domain ][ key ];

	// Verify not only that entry exists, but that the intended index is within
	// range and non-empty.
	if ( entry && entry[ index ] ) {
		return entry[ index ];
	}

	if ( this.options.onMissingKey ) {
		this.options.onMissingKey( singular, domain );
	}

	// If entry not found, fall back to singular vs. plural with zero index
	// representing the singular value.
	return index === 0 ? singular : plural;
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvY3VycmVuY3lfY29uZmlnLmpzIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvZGF0YS5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vYXNzZXRzL3NyYy9lZWpzL2V4Y2VwdGlvbnMvZ2VuZXJhbC5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vYXNzZXRzL3NyYy9lZWpzL2V4Y2VwdGlvbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL2Fzc2V0cy9zcmMvZWVqcy9leGNlcHRpb25zL2ludmFsaWQtYXJndW1lbnQuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL2Fzc2V0cy9zcmMvZWVqcy9leGNlcHRpb25zL2ludmFsaWQtZGF0ZXRpbWUuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL2Fzc2V0cy9zcmMvZWVqcy9leGNlcHRpb25zL2ludmFsaWQtaXNvODYwMS1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL2Fzc2V0cy9zcmMvZWVqcy9leGNlcHRpb25zL2ludmFsaWQtbG9jYWxlLmpzIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvZXhjZXB0aW9ucy9pbnZhbGlkLW1vZGVsLWVudGl0eS5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vYXNzZXRzL3NyYy9lZWpzL2V4Y2VwdGlvbnMvaW52YWxpZC1zY2hlbWEuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL2Fzc2V0cy9zcmMvZWVqcy9leGNlcHRpb25zL2ludmFsaWQtdGltZXpvbmUuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL2Fzc2V0cy9zcmMvZWVqcy9leGNlcHRpb25zL2ludmFsaWQtdHlwZS5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vYXNzZXRzL3NyYy9lZWpzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvbG9jYWxlLmpzIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvbWlkZGxld2FyZXMvYXBpLWZldGNoL2NhcHMtbWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vYXNzZXRzL3NyYy9lZWpzL21pZGRsZXdhcmVzL2FwaS1mZXRjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vYXNzZXRzL3NyYy9lZWpzL21pZGRsZXdhcmVzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvcm91dGVzLmpzIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvdGltZXpvbmUtY29uZmlnLmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jb25zdHJ1Y3QuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL0B0YW5uaW4vY29tcGlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL0B0YW5uaW4vZXZhbHVhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9AdGFubmluL3BsdXJhbC1mb3Jtcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL0B0YW5uaW4vcG9zdGZpeC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL0B3b3JkcHJlc3MvaTE4bi9idWlsZC1tb2R1bGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9Ad29yZHByZXNzL2kxOG4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvQHdvcmRwcmVzcy9pMThuL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9Ad29yZHByZXNzL2kxOG4vbm9kZV9tb2R1bGVzL3NwcmludGYtanMvc3JjL3NwcmludGYuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9Ad29yZHByZXNzL3VybC9idWlsZC1tb2R1bGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9tZW1pemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9xcy9saWIvZm9ybWF0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9wYXJzZS5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9xcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy90YW5uaW4vaW5kZXguanMiXSwibmFtZXMiOlsiZGF0YSIsImN1cnJlbmN5X2NvbmZpZyIsImN1cnJlbmN5Q29uZmlnIiwiZWVqc2RhdGEiLCJFeGNlcHRpb24iLCJtZXNzYWdlIiwiYXJncyIsImluc3RhbmNlIiwiRXJyb3IiLCJPYmplY3QiLCJzZXRQcm90b3R5cGVPZiIsImdldFByb3RvdHlwZU9mIiwiY2FwdHVyZVN0YWNrVHJhY2UiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwiZW51bWVyYWJsZSIsIndyaXRhYmxlIiwiY29uZmlndXJhYmxlIiwiX19wcm90b19fIiwiSW52YWxpZEFyZ3VtZW50IiwiYXJndW1lbnRWYWx1ZSIsIm5hbWUiLCJJbnZhbGlkRGF0ZVRpbWUiLCJkYXRldGltZSIsIkludmFsaWRUeXBlIiwiSW52YWxpZElTTzg2MDFTdHJpbmciLCJkYXRlVGltZVN0cmluZyIsIkludmFsaWRMb2NhbGUiLCJsb2NhbGUiLCJJbnZhbGlkTW9kZWxFbnRpdHkiLCJtb2RlbEVudGl0eSIsIkludmFsaWRTY2hlbWEiLCJzY2hlbWEiLCJJbnZhbGlkVGltZXpvbmUiLCJ0aW1lem9uZSIsIlR5cGVFcnJvciIsImkxOG4iLCJ3cEkxOG4iLCJyb3V0ZXMiLCJyIiwibWlkZGxlV2FyZXMiLCJtdyIsIl9fREVWX18iLCJwcm9jZXNzIiwidXNlciIsInNpdGUiLCJDT05URVhUX0NBUFNfUkVBRCIsIkNPTlRFWFRfQ0FQU19SRUFEX0FETUlOIiwiQ09OVEVYVF9DQVBTX0VESVQiLCJDT05URVhUX0NBUFNfREVMRVRFIiwic2hvdWxkQmVBcHBlbmRlZCIsInBhdGhUeXBlIiwib3B0aW9ucyIsIm1ldGhvZCIsImhhc1F1ZXJ5QXJnIiwiZXhlYyIsImNhcHNNaWRkbGV3YXJlIiwiY29udGV4dCIsIm5leHQiLCJ1cmwiLCJhZGRRdWVyeUFyZ3MiLCJjYXBzIiwicGF0aCIsImFwaUZldGNoIiwiZmV0Y2giLCJwYXRocyIsIlNJVEVfVVJMIiwic2l0ZV91cmwiLCJBRE1JTl9VUkwiLCJhZG1pbl91cmwiLCJBRE1JTl9ST1VURVMiLCJFVkVOVFMiLCJSRUdJU1RSQVRJT05TIiwiVFJBTlNBQ1RJT05TIiwiTUVTU0FHRVMiLCJQUklDRVMiLCJSRUdJU1RSQVRJT05fRk9STVMiLCJWRU5VRVMiLCJHRU5FUkFMX1NFVFRJTkdTIiwiUEFZTUVOVF9NRVRIT0RTIiwiRVhURU5TSU9OU19BTkRfU0VSVklDRVMiLCJNQUlOVEVOQU5DRSIsIkhFTFBfQU5EX1NVUFBPUlQiLCJBQk9VVCIsIkFETUlOX1JPVVRFX0FDVElPTl9ERUZBVUxUIiwiQURNSU5fUk9VVEVfQUNUSU9OUyIsIk9WRVJWSUVXIiwiQ0FURUdPUllfTElTVCIsIlRFTVBMQVRFUyIsIkRFRkFVTFRfU0VUVElOR1MiLCJERUZBVUxUX1RJQ0tFVFMiLCJFVkVOVF9DSEVDS0lOIiwiQ09OVEFDVF9MSVNUIiwiUkVQT1JUUyIsIk1FU1NBR0VfQUNUSVZJVFkiLCJERUZBVUxUX01FU1NBR0VfVEVNUExBVEVTIiwiQ1VTVE9NX01FU1NBR0VfVEVNUExBVEVTIiwiU0VUVElOR1MiLCJERUZBVUxUX1BSSUNJTkciLCJQUklDRV9UWVBFUyIsIlRBWF9TRVRUSU5HUyIsIkZPUk1TIiwiUVVFU1RJT05TIiwiUVVFU1RJT05fR1JPVVBTIiwiUkVHX0ZPUk1fU0VUVElOR1MiLCJDQVRFR09SSUVTIiwiR09PR0xFX01BUFMiLCJZT1VSX09SR0FOSVpBVElPTiIsIkNSSVRJQ0FMX1BBR0VTIiwiQURNSU5fT1BUSU9OUyIsIkNPVU5UUklFUyIsIlBSSVZBQ1lfU0VUVElOR1MiLCJMT0dTIiwiUkVTRVRfT1JfREVMRVRFX0RBVEEiLCJEQVRFVElNRV9VVElMSVRJRVMiLCJTWVNURU1fSU5GT1JNQVRJT04iLCJTVVBQT1JUIiwiRkFRIiwiREVWRUxPUEVSUyIsIlNIT1JUQ09ERVMiLCJXSEFUU19ORVciLCJDUkVESVRTIiwiUkVWSUVXUyIsImdldEFkbWluVXJsIiwicGFnZSIsImFjdGlvbiIsImRlZmF1bHRfdGltZXpvbmUiLCJ0aW1lem9uZUNvbmZpZyIsInByZXR0eSIsInN0cmluZyIsIm9mZnNldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFFQTs7Ozs7Ozs0QkFNd0RBLDZDLENBQXpDQyxlO0lBQWlCQyxjLHNDQUFpQixFOzs7Ozs7Ozs7Ozs7O0FDUmpEO0FBQUE7Ozs7QUFJQSxJQUFNRixJQUFJLEdBQUdHLFFBQVEsQ0FBQ0gsSUFBVCxJQUFpQixFQUE5QjtBQUNlQSxtRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0xBOzs7Ozs7O0FBT0EsU0FBU0ksU0FBVCxDQUFvQkMsT0FBcEIsRUFBdUM7QUFBQSxvQ0FBUEMsSUFBTztBQUFQQSxRQUFPO0FBQUE7O0FBQ3RDLE1BQU1DLFFBQVEsR0FBRyx3RUFBSUMsS0FBUCxHQUFjSCxPQUFk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OztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLElBQThCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLElBQTZDO0FBQ3pELFlBQVksbUNBQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQUEsb0dBQUM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxDQUFDLEdB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QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsb0VBQVc7QUFDbkI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZWUtZWVqcy4zNGRjM2VhNmQyZWEzZWIxZDQ3Ni5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvc3JjL2VlanMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgZGF0YSBmcm9tICcuL2RhdGEnO1xuXG4vKipcbiAqIFByb3ZpZGVkIHZpYSB0aGUgZGF0YSBwYXNzZWQgYWxvbmcgYnkgdGhlIHNlcnZlci5cbiAqIFRoaXMgZGF0YSBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHBhc3NlZCBhbG9uZyBmcm9tIHRoZSBzZXJ2ZXIgdGhhdCBpbmRpY2F0ZXNcbiAqIHRoZSBkZWZhdWx0IGN1cnJlbmN5IHNldHRpbmdzIGZyb20gdGhlIHNlcnZlci5cbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0IGNvbnN0IHsgY3VycmVuY3lfY29uZmlnOiBjdXJyZW5jeUNvbmZpZyA9IHt9IH0gPSBkYXRhO1xuIiwiLyoqXG4gKiBUaGlzIHdpbGwgaG9sZCBhcmJpdHJhcnkgZGF0YSBhc3NpZ25lZCBieSB0aGUgQXNzZXRzIFJlZ2lzdHJ5LlxuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBkYXRhID0gZWVqc2RhdGEuZGF0YSB8fCB7fTtcbmV4cG9ydCBkZWZhdWx0IGRhdGE7XG4iLCIvKipcbiAqIEdlbmVyYWwgRUUgRXhjZXB0aW9uXG4gKiBVc2FnZTogdGhyb3cgbmV3IGVlanMuRXhjZXB0aW9uKCdzb21lIG1lc3NhZ2UnKVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7Li4ubWl4ZWR9IGFyZ3NcbiAqIEByZXR1cm4ge0V4Y2VwdGlvbn0gaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gRXhjZXB0aW9uKCBtZXNzYWdlLCAuLi5hcmdzICkge1xuXHRjb25zdCBpbnN0YW5jZSA9IG5ldyBFcnJvciggbWVzc2FnZSwgLi4uYXJncyApO1xuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YoIGluc3RhbmNlLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoIHRoaXMgKSApO1xuXHRpZiAoIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlICkge1xuXHRcdEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKCBpbnN0YW5jZSwgRXhjZXB0aW9uICk7XG5cdH1cblx0cmV0dXJuIGluc3RhbmNlO1xufVxuXG5FeGNlcHRpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggRXJyb3IucHJvdG90eXBlLCB7XG5cdGNvbnN0cnVjdG9yOiB7XG5cdFx0dmFsdWU6IEVycm9yLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0fSxcbn0gKTtcblxuaWYgKCBPYmplY3Quc2V0UHJvdG90eXBlT2YgKSB7XG5cdE9iamVjdC5zZXRQcm90b3R5cGVPZiggRXhjZXB0aW9uLCBFcnJvciApO1xufSBlbHNlIHtcblx0RXhjZXB0aW9uLl9fcHJvdG9fXyA9IEVycm9yO1xufVxuXG5leHBvcnQgZGVmYXVsdCBFeGNlcHRpb247XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIEV4Y2VwdGlvbiB9IGZyb20gJy4vZ2VuZXJhbCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEludmFsaWRTY2hlbWEgfSBmcm9tICcuL2ludmFsaWQtc2NoZW1hJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW52YWxpZEFyZ3VtZW50IH0gZnJvbSAnLi9pbnZhbGlkLWFyZ3VtZW50JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW52YWxpZFRpbWV6b25lIH0gZnJvbSAnLi9pbnZhbGlkLXRpbWV6b25lJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW52YWxpZElTTzg2MDFTdHJpbmcgfSBmcm9tICcuL2ludmFsaWQtaXNvODYwMS1zdHJpbmcnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBJbnZhbGlkTG9jYWxlIH0gZnJvbSAnLi9pbnZhbGlkLWxvY2FsZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEludmFsaWREYXRldGltZSB9IGZyb20gJy4vaW52YWxpZC1kYXRldGltZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEludmFsaWRUeXBlIH0gZnJvbSAnLi9pbnZhbGlkLXR5cGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBJbnZhbGlkTW9kZWxFbnRpdHkgfSBmcm9tICcuL2ludmFsaWQtbW9kZWwtZW50aXR5JztcbiIsIi8qKlxuICogSW52YWxpZEFyZ3VtZW50XG4gKiBVc2FnZTogdGhyb3cgbmV3IGVlanMuSW52YWxpZEFyZ3VtZW50KCdzb21lIG1lc3NhZ2UnWywgYXJndW1lbnRdKVxuICpcbiAqIFR5cGljYWxseSB0aGlzIGVycm9yIGlzIHRocm93biB3aGVuIGEgZnVuY3Rpb24gb3IgbWV0aG9kIGlzIGNhbGxlZCB3aXRoIGFuXG4gKiBpbnZhbGlkIGFyZ3VtZW50IGZvciBhIGdpdmVuIHBhcmFtZXRlci4gIEl0IGNvdWxkIHN0aWxsIGJlIHRoZSByaWdodCB0eXBlXG4gKiBidXQgaXRzIGFuIHVuZXhwZWN0ZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7bWl4ZWR9IGFyZ3VtZW50VmFsdWUgT3B0aW9uYWwsIHRoZSBhcmd1bWVudCB0aGF0IGNhdXNlZCB0aGUgZXJyb3IuXG4gKiBAcGFyYW0gey4uLm1peGVkfSBhcmdzXG4gKiBAcmV0dXJuIHtJbnZhbGlkQXJndW1lbnR9IGluc3RhbmNlIG9mIEludmFsaWRBcmd1bWVudFxuICovXG5mdW5jdGlvbiBJbnZhbGlkQXJndW1lbnQoIG1lc3NhZ2UsIGFyZ3VtZW50VmFsdWUsIC4uLmFyZ3MgKSB7XG5cdGNvbnN0IGluc3RhbmNlID0gbmV3IEVycm9yKCBtZXNzYWdlLCAuLi5hcmdzICk7XG5cdE9iamVjdC5zZXRQcm90b3R5cGVPZiggaW5zdGFuY2UsIE9iamVjdC5nZXRQcm90b3R5cGVPZiggdGhpcyApICk7XG5cdGluc3RhbmNlLmFyZ3VtZW50VmFsdWUgPSBhcmd1bWVudFZhbHVlIHx8IG51bGw7XG5cdGluc3RhbmNlLm5hbWUgPSBpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lO1xuXHRpbnN0YW5jZS5tZXNzYWdlID0gaW5zdGFuY2UubWVzc2FnZSAhPT0gJycgP1xuXHRcdCdJbnZhbGlkIGFyZ3VtZW50IHByb3ZpZGVkLiAnICsgaW5zdGFuY2UubWVzc2FnZSA6XG5cdFx0J0ludmFsaWQgYXJndW1lbnQgcHJvdmlkZWQuJztcblx0aWYgKCBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSApIHtcblx0XHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSggaW5zdGFuY2UsIEludmFsaWRBcmd1bWVudCApO1xuXHR9XG5cdHJldHVybiBpbnN0YW5jZTtcbn1cblxuSW52YWxpZEFyZ3VtZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEVycm9yLnByb3RvdHlwZSwge1xuXHRjb25zdHJ1Y3Rvcjoge1xuXHRcdHZhbHVlOiBFcnJvcixcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdH0sXG59ICk7XG5cbmlmICggT2JqZWN0LnNldFByb3RvdHlwZU9mICkge1xuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YoIEludmFsaWRBcmd1bWVudCwgRXJyb3IgKTtcbn0gZWxzZSB7XG5cdEludmFsaWRBcmd1bWVudC5fX3Byb3RvX18gPSBFcnJvcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgSW52YWxpZEFyZ3VtZW50O1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBJbnZhbGlkVHlwZSBmcm9tICcuL2ludmFsaWQtdHlwZSc7XG5cbi8qKlxuICogSW52YWxpZERhdGVUaW1lXG4gKiBVc2FnZTogdGhyb3cgbmV3IGVlanMuSW52YWxpZERhdGVUaW1lKCdzb21lIG1lc3NhZ2UnLCBbZGF0ZXRpbWVdKVxuICpcbiAqIFR5cGljYWxseSB0aGlzIGVycm9yIGlzIHRocm93biB3aGVuIGEgZ2l2ZW4gc3RyaW5nIGlzIG5vdCBhIHZhbGlkIGRhdGV0aW1lXG4gKiBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xuICogQHBhcmFtIHttaXhlZH0gZGF0ZXRpbWUgT3B0aW9uYWwsIHRoZSBkYXRldGltZSBzdHJpbmcgdGhhdCBpcyBpbnZhbGlkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludmFsaWREYXRlVGltZSBleHRlbmRzIEludmFsaWRUeXBlIHtcblx0Y29uc3RydWN0b3IoIGRhdGV0aW1lLCBtZXNzYWdlLCAuLi5hcmdzICkge1xuXHRcdHN1cGVyKCBtZXNzYWdlLCAuLi5hcmdzICk7XG5cdFx0aWYgKCBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSApIHtcblx0XHRcdEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKCB0aGlzLCBJbnZhbGlkRGF0ZVRpbWUgKTtcblx0XHR9XG5cdFx0dGhpcy5tZXNzYWdlID0gJ1RoZSB2YWx1ZSBwcm92aWRlZCBpcyBub3QgYSB2YWxpZCBEYXRlVGltZS4gJyArXG5cdFx0XHR0aGlzLm1lc3NhZ2U7XG5cdFx0dGhpcy5kYXRldGltZSA9IGRhdGV0aW1lIHx8ICcnO1xuXHRcdHRoaXMubmFtZSA9ICdJbnZhbGlkRGF0ZVRpbWUnO1xuXHR9XG59XG4iLCIvKipcbiAqIEludGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0IEludmFsaWRBcmd1bWVudCBmcm9tICcuL2ludmFsaWQtYXJndW1lbnQnO1xuXG4vKipcbiAqIEludmFsaWRJc284NjAxU3RyaW5nXG4gKiBVc2FnZTogdGhyb3cgbmV3IGVlanMuSW52YWxpZElTTzg2MDFTdHJpbmcoJ3NvbWUgbWVzc2FnZScsIFtkYXRlVGltZVN0cmluZ10pXG4gKlxuICogVHlwaWNhbGx5IHRoaXMgZXJyb3IgaXMgdGhyb3duIHdoZW4gYSBnaXZlbiBzdHJpbmcgaXMgbm90IHRoZSBjb3JyZWN0IGZvcm1hdFxuICogZm9yIElTTyA4NjAxLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcbiAqIEBwYXJhbSB7bWl4ZWR9IGRhdGVUaW1lU3RyaW5nIE9wdGlvbmFsLCB0aGUgdGltZXpvbmUgc3RyaW5nIHRoYXQgaXMgaW52YWxpZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZhbGlkSVNPODYwMVN0cmluZyBleHRlbmRzIEludmFsaWRBcmd1bWVudCB7XG5cdGNvbnN0cnVjdG9yKCBkYXRlVGltZVN0cmluZywgbWVzc2FnZSA9ICcnLCAuLi5hcmdzICkge1xuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlID9cblx0XHRcdCdUaGUgc3RyaW5nIHByb3ZpZGVkIGlzIG5vdCBhIHZhbGlkIElTTyA4NjAxIGZvcm1hdHRlZCBzdHJpbmcuICcgK1xuXHRcdFx0XHRtZXNzYWdlIDpcblx0XHRcdCdUaGUgc3RyaW5nIHByb3ZpZGVkIGlzIG5vdCBhIHZhbGlkIElTTyA4NjAxIGZvcm1hdHRlZCBzdHJpbmcuJztcblx0XHRzdXBlciggbWVzc2FnZSwgZGF0ZVRpbWVTdHJpbmcsIC4uLmFyZ3MgKTtcblx0XHRpZiAoIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlICkge1xuXHRcdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoIHRoaXMsIEludmFsaWRJU084NjAxU3RyaW5nICk7XG5cdFx0fVxuXHRcdHRoaXMuZGF0ZVRpbWVTdHJpbmcgPSBkYXRlVGltZVN0cmluZyB8fCAnJztcblx0fVxufVxuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBJbnZhbGlkQXJndW1lbnQgZnJvbSAnLi9pbnZhbGlkLWFyZ3VtZW50JztcblxuLyoqXG4gKiBJbnZhbGlkTG9jYWxlXG4gKiBVc2FnZTogdGhyb3cgbmV3IGVlanMuSW52YWxpZExvY2FsZSgnc29tZSBtZXNzYWdlJywgW2xvY2FsZV0pXG4gKlxuICogVHlwaWNhbGx5IHRoaXMgZXJyb3IgaXMgdGhyb3duIHdoZW4gYSBnaXZlbiBzdHJpbmcgaXMgbm90IGEgdmFsaWQgbG9jYWxlXG4gKiBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xuICogQHBhcmFtIHttaXhlZH0gbG9jYWxlIE9wdGlvbmFsLCB0aGUgbG9jYWxlIHN0cmluZyB0aGF0IGlzIGludmFsaWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52YWxpZExvY2FsZSBleHRlbmRzIEludmFsaWRBcmd1bWVudCB7XG5cdGNvbnN0cnVjdG9yKCBsb2NhbGUsIG1lc3NhZ2UgPSAnJywgLi4uYXJncyApIHtcblx0XHRtZXNzYWdlID0gbWVzc2FnZSA/XG5cdFx0XHQnVGhlIGxvY2FsZSBzdHJpbmcgcHJvdmlkZWQgaXMgbm90IHZhbGlkLiAnICsgbWVzc2FnZSA6XG5cdFx0XHQnVGhlIGxvY2FsZSBzdHJpbmcgcHJvdmlkZWQgaXMgbm90IHZhbGlkLic7XG5cdFx0c3VwZXIoIG1lc3NhZ2UsIGxvY2FsZSwgLi4uYXJncyApO1xuXHRcdGlmICggRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgKSB7XG5cdFx0XHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSggdGhpcywgSW52YWxpZExvY2FsZSApO1xuXHRcdH1cblx0XHR0aGlzLmxvY2FsZSA9IGxvY2FsZSB8fCAnJztcblx0fVxufVxuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBJbnZhbGlkVHlwZSBmcm9tICcuL2ludmFsaWQtdHlwZSc7XG5cbi8qKlxuICogSW52YWxpZFNjaGVtYVxuICogVXNhZ2U6IHRocm93IG5ldyBlZWpzLkludmFsaWRTY2hlbWEoJ3NvbWUgbWVzc2FnZScsIFtzY2hlbWEgb2JqZWN0XSlcbiAqXG4gKiBUeXBpY2FsbHkgdGhpcyBlcnJvciBpcyB0aHJvd24gd2hlbiBhbiBvYmplY3QgcmVwcmVzZW50aW5nIGEgbW9kZWwgc2NoZW1hXG4gKiAoYXQgYSBtaW5pbXVtKSBkb2VzIG5vdCBoYXZlIGEgXCJwcm9wZXJ0aWVzXCIgcHJvcGVydHkpLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcbiAqIEBwYXJhbSB7bWl4ZWR9IHNjaGVtYSBPcHRpb25hbCwgdGhlIHNjaGVtYSBvYmplY3Qgd2hpY2ggd2lsbCBiZSBhZGRlZCB0byBhXG4gKiBzY2hlbWEgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludmFsaWRNb2RlbEVudGl0eSBleHRlbmRzIEludmFsaWRUeXBlIHtcblx0Y29uc3RydWN0b3IoIC4uLmFyZ3MgKSB7XG5cdFx0c3VwZXIoIC4uLmFyZ3MgKTtcblx0XHRpZiAoIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlICkge1xuXHRcdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoIHRoaXMsIEludmFsaWRNb2RlbEVudGl0eSApO1xuXHRcdH1cblx0XHR0aGlzLm1lc3NhZ2UgPSAnSW52YWxpZCBtb2RlbCBlbnRpdHkgaW5zdGFuY2UgcHJvdmlkZWQuJyArIHRoaXMubWVzc2FnZTtcblx0XHR0aGlzLm1vZGVsRW50aXR5ID0gYXJnc1sgMSBdIHx8IHt9O1xuXHR9XG59XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IEludmFsaWRUeXBlIGZyb20gJy4vaW52YWxpZC10eXBlJztcblxuLyoqXG4gKiBJbnZhbGlkU2NoZW1hXG4gKiBVc2FnZTogdGhyb3cgbmV3IGVlanMuSW52YWxpZFNjaGVtYSgnc29tZSBtZXNzYWdlJywgW3NjaGVtYSBvYmplY3RdKVxuICpcbiAqIFR5cGljYWxseSB0aGlzIGVycm9yIGlzIHRocm93biB3aGVuIGFuIG9iamVjdCByZXByZXNlbnRpbmcgYSBtb2RlbCBzY2hlbWFcbiAqIChhdCBhIG1pbmltdW0pIGRvZXMgbm90IGhhdmUgYSBcInByb3BlcnRpZXNcIiBwcm9wZXJ0eSkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xuICogQHBhcmFtIHttaXhlZH0gc2NoZW1hIE9wdGlvbmFsLCB0aGUgc2NoZW1hIG9iamVjdCB3aGljaCB3aWxsIGJlIGFkZGVkIHRvIGFcbiAqIHNjaGVtYSBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52YWxpZFNjaGVtYSBleHRlbmRzIEludmFsaWRUeXBlIHtcblx0Y29uc3RydWN0b3IoIC4uLmFyZ3MgKSB7XG5cdFx0c3VwZXIoIC4uLmFyZ3MgKTtcblx0XHRpZiAoIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlICkge1xuXHRcdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoIHRoaXMsIEludmFsaWRTY2hlbWEgKTtcblx0XHR9XG5cdFx0dGhpcy5tZXNzYWdlID0gJ0ludmFsaWQgc2NoZW1hIG9iamVjdCBwcm92aWRlZC4gTXVzdCBoYXZlIGEnICtcblx0XHRcdCcgXCJwcm9wZXJ0aWVzXCIgcHJvcGVydHkuJyArIHRoaXMubWVzc2FnZTtcblx0XHR0aGlzLnNjaGVtYSA9IGFyZ3NbIDEgXSB8fCB7fTtcblx0fVxufVxuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBJbnZhbGlkQXJndW1lbnQgZnJvbSAnLi9pbnZhbGlkLWFyZ3VtZW50JztcblxuLyoqXG4gKiBJbnZhbGlkVGltZXpvbmVcbiAqIFVzYWdlOiB0aHJvdyBuZXcgZWVqcy5JbnZhbGlkVGltZXpvbmUoJ3NvbWUgbWVzc2FnZScsIFt0aW1lem9uZV0pXG4gKlxuICogVHlwaWNhbGx5IHRoaXMgZXJyb3IgaXMgdGhyb3duIHdoZW4gYSBnaXZlbiBzdHJpbmcgaXMgbm90IGEgdmFsaWQgdGltZXpvbmVcbiAqIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbXNnXG4gKiBAcGFyYW0ge21peGVkfSB0aW1lem9uZSBPcHRpb25hbCwgdGhlIHRpbWV6b25lIHN0cmluZyB0aGF0IGlzIGludmFsaWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52YWxpZFRpbWV6b25lIGV4dGVuZHMgSW52YWxpZEFyZ3VtZW50IHtcblx0Y29uc3RydWN0b3IoIHRpbWV6b25lLCBtZXNzYWdlID0gJycsIC4uLmFyZ3MgKSB7XG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgP1xuXHRcdFx0J1RoZSB0aW1lem9uZSBzdHJpbmcgcHJvdmlkZWQgaXMgbm90IHZhbGlkLiAnICsgbWVzc2FnZSA6XG5cdFx0XHQnVGhlIHRpbWV6b25lIHN0cmluZyBwcm92aWRlZCBpcyBub3QgdmFsaWQuJztcblx0XHRzdXBlciggbWVzc2FnZSwgdGltZXpvbmUsIC4uLmFyZ3MgKTtcblx0XHRpZiAoIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlICkge1xuXHRcdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoIHRoaXMsIEludmFsaWRUaW1lem9uZSApO1xuXHRcdH1cblx0XHR0aGlzLnRpbWV6b25lID0gdGltZXpvbmUgfHwgJyc7XG5cdH1cbn1cbiIsIi8qKlxuICogSW52YWxpZFR5cGVcbiAqIFVzYWdlOiB0aHJvdyBuZXcgZWVqcy5JbnZhbGlkVHlwZSgnc29tZSBtZXNzYWdlJ1ssIGFyZ3VtZW50XSlcbiAqXG4gKiBUaGlzIGlzIGVzc2VudGlhbGx5IGEgd3JhcHBlciBhcm91bmQgdGhlIG5hdGl2ZSBgVHlwZUVycm9yYCBlcnJvciBoYW5kbGVyLlxuICogVGhlIHB1cnBvc2UgaXMgdG8gYWxsb3cgZm9yIG1vcmUgY3VzdG9tIHNwZWNpZmljIHR5cGUgZXJyb3JzIHRvIGJlIGNyZWF0ZWRcbiAqIHVzaW5nIEVTNiBzeW50YXggc2luY2UgdGhlcmUgYXJlIHVzdWFsbHkgdHJhbnNwaWxpbmcgaXNzdWVzIHVzaW5nIEVTNiBzeW50YXhcbiAqIGV4dGVuZGluZyBuYXRpdmUgRXJyb3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gKiBAcGFyYW0ge21peGVkfSBhcmd1bWVudFZhbHVlIE9wdGlvbmFsLCB0aGUgYXJndW1lbnQgdGhhdCBjYXVzZWQgdGhlIGVycm9yLlxuICogQHBhcmFtIHsuLi5taXhlZH0gYXJnc1xuICogQHJldHVybiB7SW52YWxpZFR5cGV9IGluc3RhbmNlIG9mIEludmFsaWRUeXBlXG4gKi9cbmZ1bmN0aW9uIEludmFsaWRUeXBlKCBtZXNzYWdlLCBhcmd1bWVudFZhbHVlLCAuLi5hcmdzICkge1xuXHRjb25zdCBpbnN0YW5jZSA9IG5ldyBUeXBlRXJyb3IoIG1lc3NhZ2UsIC4uLmFyZ3MgKTtcblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKCBpbnN0YW5jZSwgT2JqZWN0LmdldFByb3RvdHlwZU9mKCB0aGlzICkgKTtcblx0aW5zdGFuY2UuYXJndW1lbnRWYWx1ZSA9IGFyZ3VtZW50VmFsdWUgfHwgbnVsbDtcblx0aW5zdGFuY2UubmFtZSA9IGluc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWU7XG5cdGluc3RhbmNlLm1lc3NhZ2UgPSBpbnN0YW5jZS5tZXNzYWdlICE9PSAnJyA/XG5cdFx0J0ludmFsaWQgdHlwZSBwcm92aWRlZC4gJyArIGluc3RhbmNlLm1lc3NhZ2UgOlxuXHRcdCdJbnZhbGlkIHR5cGUgcHJvdmlkZWQuJztcblx0aWYgKCBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSApIHtcblx0XHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSggaW5zdGFuY2UsIEludmFsaWRUeXBlICk7XG5cdH1cblx0cmV0dXJuIGluc3RhbmNlO1xufVxuXG5JbnZhbGlkVHlwZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUeXBlRXJyb3IucHJvdG90eXBlLCB7XG5cdGNvbnN0cnVjdG9yOiB7XG5cdFx0dmFsdWU6IFR5cGVFcnJvcixcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdH0sXG59ICk7XG5cbmlmICggT2JqZWN0LnNldFByb3RvdHlwZU9mICkge1xuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YoIEludmFsaWRUeXBlLCBUeXBlRXJyb3IgKTtcbn0gZWxzZSB7XG5cdEludmFsaWRUeXBlLl9fcHJvdG9fXyA9IFR5cGVFcnJvcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgSW52YWxpZFR5cGU7XG4iLCIvKipcbiAqIFdvcmRQcmVzcyBpbXBvcnRzXG4gKi9cbmltcG9ydCAqIGFzIHdwSTE4biBmcm9tICdAd29yZHByZXNzL2kxOG4nO1xuXG4vKipcbiAqIEV4cG9ydGVkIHRvIHRoZSBgZWVqc2AgZ2xvYmFsLlxuICovXG5leHBvcnQgeyBkZWZhdWx0IGFzIGRhdGEgfSBmcm9tICcuL2RhdGEnO1xuXG4vKipcbiAqIFdyYXBwZXIgYXJvdW5kIHdwLmkxOG4gZnVuY3Rpb25hbGl0eSBzbyBpdHMgZXhwb3NlZCBvbiB0aGUgZWVqcyBnbG9iYWwgYXNcbiAqIGVlanMuaTE4bjtcbiAqL1xuZXhwb3J0IGNvbnN0IGkxOG4gPSB3cEkxOG47XG4vKipcbiAqIGV4cG9ydGluZyByb3V0ZXMgdG8gYSBuYW1lZCB2YXJcbiAqL1xuaW1wb3J0ICogYXMgciBmcm9tICcuL3JvdXRlcyc7XG5leHBvcnQgY29uc3Qgcm91dGVzID0gcjtcblxuLyoqXG4gKiBDdXJyZW5jeSBDb25maWd1cmF0aW9uIGZvciB0aGUgZGVmYXVsdCBjdXJyZW5jeSBmcm9tIHRoZSBzZXJ2ZXJcbiAqL1xuZXhwb3J0IHsgY3VycmVuY3lDb25maWcgYXMgQ1VSUkVOQ1lfQ09ORklHIH0gZnJvbSAnLi9jdXJyZW5jeV9jb25maWcnO1xuXG4vKipcbiAqIERlZmF1bHQgdGltZXpvbmUgY29uZmlndXJhdGlvbiBmb3IgdGhlIGRlZmF1bHQgdGltZXpvbmUgc2V0dGluZ3MgZnJvbSB0aGVcbiAqIHNlcnZlclxuICovXG5leHBvcnQgeyB0aW1lem9uZUNvbmZpZyBhcyBUSU1FWk9ORV9DT05GSUcgfSBmcm9tICcuL3RpbWV6b25lLWNvbmZpZyc7XG5cbi8qKlxuICogU2VydmVyIGxvY2FsZSBjb25maWd1cmF0aW9uLlxuICovXG5leHBvcnQgeyBsb2NhbGUgYXMgU0VSVkVSX0xPQ0FMRSB9IGZyb20gJy4vbG9jYWxlJztcblxuLyoqXG4gKiBDdXN0b20gZXhjZXB0aW9uc1xuICovXG5leHBvcnQgKiBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuXG4vKipcbiAqIE1pZGRsZS13YXJlcyBmb3IgdmFyaW91cyBsaWJyYXJpZXNcbiAqL1xuaW1wb3J0ICogYXMgbXcgZnJvbSAnLi9taWRkbGV3YXJlcyc7XG5leHBvcnQgY29uc3QgbWlkZGxlV2FyZXMgPSBtdztcblxuLyoqXG4gKiBlbnZpcm9ubWVudCBjb25zdGFudCBpbmRpY2F0aW5nIGRldmVsb3BtZW50IHNlcnZlclxuICovXG5leHBvcnQgY29uc3QgX19ERVZfXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XG4iLCJpbXBvcnQgZGF0YSBmcm9tICcuL2RhdGEnO1xuXG4vKipcbiAqIFByb3ZpZGVkIHZpYSB0aGUgZGF0YSBwYXNzZWQgYWxvbmcgYnkgdGhlIHNlcnZlci5cbiAqIFRoaXMgZGF0YSBpcyBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHBhc3NlZCBhbG9uZyBmcm9tIHRoZSBzZXJ2ZXIgdGhhdCBleHBvc2VzXG4gKiB0aGUgZGVmYXVsdCBsb2NhbGUgc2V0dGluZ3MgZnJvbSB0aGUgc2VydmVyLlxuICogQHR5cGUge3t9fVxuICovXG5leHBvcnQgY29uc3QgeyBsb2NhbGUgPSB7XG5cdHVzZXI6ICdlbicsXG5cdHNpdGU6ICdlbicsXG59IH0gPSBkYXRhO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgYWRkUXVlcnlBcmdzLCBoYXNRdWVyeUFyZyB9IGZyb20gJ0B3b3JkcHJlc3MvdXJsJztcblxuZXhwb3J0IGNvbnN0IENPTlRFWFRfQ0FQU19SRUFEID0gJ3JlYWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFWFRfQ0FQU19SRUFEX0FETUlOID0gJ3JlYWRfYWRtaW4nO1xuZXhwb3J0IGNvbnN0IENPTlRFWFRfQ0FQU19FRElUID0gJ2VkaXQnO1xuZXhwb3J0IGNvbnN0IENPTlRFWFRfQ0FQU19ERUxFVEUgPSAnZGVsZXRlJztcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gZm9yIHdoZXRoZXIgdGhlIHBhdGggc2hvdWxkIGhhdmUgdGhlIGNvbnRleHQgYXBwZW5kZWQgb3Igbm90LlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGhUeXBlIGFwaUZldGNoIGFjY2VwdHMgJ3BhdGgnIG9yICd1cmwnIHNvIHdlIGFsbG93IGZvclxuICogY2hlY2tpbmcgdGhhdCBoZXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgdGhlIG9wdGlvbnMgb2JqZWN0IHByb3ZpZGVkIHRvIGFwaS1mZXRjaFxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBjb250ZXh0IHNob3VsZCBiZSBhcHBlbmRlZCBvciBub3QuXG4gKi9cbmZ1bmN0aW9uIHNob3VsZEJlQXBwZW5kZWQoIHBhdGhUeXBlLCBvcHRpb25zICkge1xuXHRyZXR1cm4gdHlwZW9mIG9wdGlvbnNbIHBhdGhUeXBlIF0gPT09ICdzdHJpbmcnICYmXG5cdFx0KCAhIG9wdGlvbnMubWV0aG9kIHx8IG9wdGlvbnMubWV0aG9kID09PSAnR0VUJyApICYmXG5cdFx0ISBoYXNRdWVyeUFyZyggb3B0aW9uc1sgcGF0aFR5cGUgXSwgJ2NhcHMnICkgJiZcblx0XHQvZWVcXC92NFxcLjhcXC4zNi8uZXhlYyggb3B0aW9uc1sgcGF0aFR5cGUgXSApICE9PSBudWxsO1xufVxuXG4vKipcbiAqIE1pZGRsZXdhcmUgZm9yIHRoZSBAd29yZHByZXNzL2FwaS1mZXRjaCBsaWJyYXJ5IHRoYXQgdGhlIGdpdmVuIGNvbnRleHRcbiAqIHRvIHRoZSBgY2Fwc2AgcXVlcnkgYXJnIG9uIGV2ZXJ5IEVFIEdFVCByZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSB7IHN0cmluZyB9IGNvbnRleHQgRGVmYXVsdHMgdG8gJ3JlYWQnXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gbWlkZGxld2FyZSBjYWxsYmFja1xuICovXG5jb25zdCBjYXBzTWlkZGxld2FyZSA9ICggY29udGV4dCA9IENPTlRFWFRfQ0FQU19SRUFEICkgPT4gKCBvcHRpb25zLCBuZXh0ICkgPT4ge1xuXHRpZiAoIHNob3VsZEJlQXBwZW5kZWQoICd1cmwnLCBvcHRpb25zICkgKSB7XG5cdFx0b3B0aW9ucy51cmwgPSBhZGRRdWVyeUFyZ3MoXG5cdFx0XHRvcHRpb25zLnVybCxcblx0XHRcdHsgY2FwczogY29udGV4dCB9XG5cdFx0KTtcblx0fVxuXG5cdGlmICggc2hvdWxkQmVBcHBlbmRlZCggJ3BhdGgnLCBvcHRpb25zICkgKSB7XG5cdFx0b3B0aW9ucy5wYXRoID0gYWRkUXVlcnlBcmdzKFxuXHRcdFx0b3B0aW9ucy5wYXRoLFxuXHRcdFx0eyBjYXBzOiBjb250ZXh0IH1cblx0XHQpO1xuXHR9XG5cdHJldHVybiBuZXh0KCBvcHRpb25zLCBuZXh0ICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjYXBzTWlkZGxld2FyZTtcbiIsImltcG9ydCB7XG5cdGRlZmF1bHQgYXMgY2Fwc01pZGRsZXdhcmUsXG5cdENPTlRFWFRfQ0FQU19SRUFELFxuXHRDT05URVhUX0NBUFNfUkVBRF9BRE1JTixcblx0Q09OVEVYVF9DQVBTX0VESVQsXG5cdENPTlRFWFRfQ0FQU19ERUxFVEUsXG59IGZyb20gJy4vY2Fwcy1taWRkbGV3YXJlJztcblxuZXhwb3J0IHtcblx0Y2Fwc01pZGRsZXdhcmUsXG5cdENPTlRFWFRfQ0FQU19SRUFELFxuXHRDT05URVhUX0NBUFNfUkVBRF9BRE1JTixcblx0Q09OVEVYVF9DQVBTX0VESVQsXG5cdENPTlRFWFRfQ0FQU19ERUxFVEUsXG59O1xuIiwiaW1wb3J0ICogYXMgZmV0Y2ggZnJvbSAnLi9hcGktZmV0Y2gnO1xuZXhwb3J0IGNvbnN0IGFwaUZldGNoID0gZmV0Y2g7XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhJztcblxuLyoqXG4gKiBQcm92aWRlZCB2aWEgdGhlIGRhdGEgcGFzc2VkIGFsb25nIGJ5IHRoZSBzZXJ2ZXIuXG4gKiBUaGlzIGRhdGEgaGFzIHRvIGRvIHdpdGggYW55IHBhdGhzL3JvdXRlIGluZm9ybWF0aW9uIHBhc3NlZCBhbG9uZyBmcm9tIHRoZVxuICogc2VydmVyLlxuICpcbiAqIEB0eXBlIHsge30gfVxuICovXG5jb25zdCB7IHBhdGhzID0ge30gfSA9IGRhdGE7XG5cbi8qKlxuICogVGhlIGJhc2UgdXJsIGZvciB0aGUgc2l0ZSB0aGlzIGpzIGlzIGxvYWRlZCBvbi5cbiAqIGVnLiAnaHR0cHM6Ly9teXNpdGUuY29tLydcbiAqIEB0eXBlIHsgc3RyaW5nIH1cbiAqL1xuZXhwb3J0IGNvbnN0IFNJVEVfVVJMID0gcGF0aHMuc2l0ZV91cmwgfHwgJyc7XG5cbi8qKlxuICogVGhlIGJhc2UgYWRtaW4gdXJsIGZvciB0aGUgc2l0ZSB0aGlzIGpzIGlzIGxvYWRlZCBvbi5cbiAqIGVnLiAnaHR0cHM6Ly9teXNpdGUuY29tL3dwLWFkbWluL1xuICogQHR5cGUgeyBzdHJpbmcgfVxuICovXG5leHBvcnQgY29uc3QgQURNSU5fVVJMID0gcGF0aHMuYWRtaW5fdXJsIHx8ICcnO1xuXG4vKipcbiAqIEEgbGlzdCBvZiBhbGwgbWFpbiBFdmVudCBFc3ByZXNzbyBhZG1pbiByb3V0ZXMuXG4gKlxuICogQHR5cGUgeyB7IHN0cmluZzogc3RyaW5nIH0gfVxuICovXG5leHBvcnQgY29uc3QgQURNSU5fUk9VVEVTID0ge1xuXHRFVkVOVFM6ICdlc3ByZXNzb19ldmVudHMnLFxuXHRSRUdJU1RSQVRJT05TOiAnZXNwcmVzc29fcmVnaXN0cmF0aW9ucycsXG5cdFRSQU5TQUNUSU9OUzogJ2VzcHJlc3NvX3RyYW5zYWN0aW9ucycsXG5cdE1FU1NBR0VTOiAnZXNwcmVzc29fbWVzc2FnZXMnLFxuXHRQUklDRVM6ICdwcmljaW5nJyxcblx0UkVHSVNUUkFUSU9OX0ZPUk1TOiAncmVnaXN0cmF0aW9uX2Zvcm0nLFxuXHRWRU5VRVM6ICdlc3ByZXNzb192ZW51ZXMnLFxuXHRHRU5FUkFMX1NFVFRJTkdTOiAnZXNwcmVzc29fZ2VuZXJhbF9zZXR0aW5ncycsXG5cdFBBWU1FTlRfTUVUSE9EUzogJ2VzcHJlc3NvX3BheW1lbnRfc2V0dGluZ3MnLFxuXHRFWFRFTlNJT05TX0FORF9TRVJWSUNFUzogJ2VzcHJlc3NvX3BhY2thZ2VzJyxcblx0TUFJTlRFTkFOQ0U6ICdlc3ByZXNzb19tYWludGVuYW5jZScsXG5cdEhFTFBfQU5EX1NVUFBPUlQ6ICdlc3ByZXNzb19zdXBwb3J0Jyxcblx0QUJPVVQ6ICdlc3ByZXNzb19hYm91dCcsXG59O1xuXG4vKipcbiAqIFRoZSBzdHJpbmcgdXNlZCB0byBpbmRpY2F0ZSB0aGUgJ2RlZmF1bHQnIGFjdGlvbiByb3V0ZSBmb3IgYWxsIEV2ZW50IEVzcHJlc3NvXG4gKiBhZG1pbiBwYWdlcy5cbiAqXG4gKiBAdHlwZSB7IHN0cmluZyB9XG4gKi9cbmV4cG9ydCBjb25zdCBBRE1JTl9ST1VURV9BQ1RJT05fREVGQVVMVCA9ICdkZWZhdWx0JztcblxuLyoqXG4gKiBBIGxpc3Qgb2YgYWxsIGFkbWluIHJvdXRlIGFjdGlvbnMgZm9yIEV2ZW50IEVzcHJlc3NvIGFkbWluIHBhZ2VzLlxuICogTm90ZTogY3VycmVudGx5IHRoaXMgbGlzdCBvbmx5IGluY2x1ZGVzIGRpc3BsYXkgYWN0aW9ucyAobm90IHByb2Nlc3NpbmdcbiAqIGFjdGlvbnMpLlxuICpcbiAqIEB0eXBlIHsgeyBzdHJpbmc6IHsgc3RyaW5nOiBzdHJpbmcgfSB9IH1cbiAqL1xuZXhwb3J0IGNvbnN0IEFETUlOX1JPVVRFX0FDVElPTlMgPSB7XG5cdEVWRU5UUzoge1xuXHRcdE9WRVJWSUVXOiBBRE1JTl9ST1VURV9BQ1RJT05fREVGQVVMVCxcblx0XHRDQVRFR09SWV9MSVNUOiAnY2F0ZWdvcnlfbGlzdCcsXG5cdFx0VEVNUExBVEVTOiAndGVtcGxhdGVfc2V0dGluZ3MnLFxuXHRcdERFRkFVTFRfU0VUVElOR1M6ICdkZWZhdWx0X2V2ZW50X3NldHRpbmdzJyxcblx0XHRERUZBVUxUX1RJQ0tFVFM6ICd0aWNrZXRfbGlzdF90YWJsZScsXG5cdH0sXG5cdFJFR0lTVFJBVElPTlM6IHtcblx0XHRPVkVSVklFVzogQURNSU5fUk9VVEVfQUNUSU9OX0RFRkFVTFQsXG5cdFx0RVZFTlRfQ0hFQ0tJTjogJ2V2ZW50X3JlZ2lzdHJhdGlvbnMnLFxuXHRcdENPTlRBQ1RfTElTVDogJ2NvbnRhY3RfbGlzdCcsXG5cdFx0UkVQT1JUUzogJ3JlcG9ydHMnLFxuXHR9LFxuXHRUUkFOU0FDVElPTlM6IHtcblx0XHRPVkVSVklFVzogQURNSU5fUk9VVEVfQUNUSU9OX0RFRkFVTFQsXG5cdFx0UkVQT1JUUzogJ3JlcG9ydHMnLFxuXHR9LFxuXHRNRVNTQUdFUzoge1xuXHRcdE1FU1NBR0VfQUNUSVZJVFk6IEFETUlOX1JPVVRFX0FDVElPTl9ERUZBVUxULFxuXHRcdERFRkFVTFRfTUVTU0FHRV9URU1QTEFURVM6ICdnbG9iYWxfbXRwcycsXG5cdFx0Q1VTVE9NX01FU1NBR0VfVEVNUExBVEVTOiAnY3VzdG9tX210cHMnLFxuXHRcdFNFVFRJTkdTOiAnc2V0dGluZ3MnLFxuXHR9LFxuXHRQUklDRVM6IHtcblx0XHRERUZBVUxUX1BSSUNJTkc6IEFETUlOX1JPVVRFX0FDVElPTl9ERUZBVUxULFxuXHRcdFBSSUNFX1RZUEVTOiAncHJpY2VfdHlwZXMnLFxuXHRcdFRBWF9TRVRUSU5HUzogJ3RheF9zZXR0aW5ncycsXG5cdH0sXG5cdEZPUk1TOiB7XG5cdFx0UVVFU1RJT05TOiBBRE1JTl9ST1VURV9BQ1RJT05fREVGQVVMVCxcblx0XHRRVUVTVElPTl9HUk9VUFM6ICdxdWVzdGlvbl9ncm91cHMnLFxuXHRcdFJFR19GT1JNX1NFVFRJTkdTOiAndmlld19yZWdfZm9ybV9zZXR0aW5ncycsXG5cdH0sXG5cdFZFTlVFUzoge1xuXHRcdE9WRVJWSUVXOiBBRE1JTl9ST1VURV9BQ1RJT05fREVGQVVMVCxcblx0XHRDQVRFR09SSUVTOiAnY2F0ZWdvcnlfbGlzdCcsXG5cdFx0R09PR0xFX01BUFM6ICdnb29nbGVfbWFwX3NldHRpbmdzJyxcblx0fSxcblx0U0VUVElOR1M6IHtcblx0XHRZT1VSX09SR0FOSVpBVElPTjogQURNSU5fUk9VVEVfQUNUSU9OX0RFRkFVTFQsXG5cdFx0Q1JJVElDQUxfUEFHRVM6ICdjcml0aWNhbF9wYWdlcycsXG5cdFx0QURNSU5fT1BUSU9OUzogJ2FkbWluX29wdGlvbl9zZXR0aW5ncycsXG5cdFx0Q09VTlRSSUVTOiAnY291bnRyeV9zZXR0aW5ncycsXG5cdFx0UFJJVkFDWV9TRVRUSU5HUzogJ3ByaXZhY3lfc2V0dGluZ3MnLFxuXHR9LFxuXHRQQVlNRU5UX01FVEhPRFM6IHtcblx0XHRQQVlNRU5UX01FVEhPRFM6IEFETUlOX1JPVVRFX0FDVElPTl9ERUZBVUxULFxuXHRcdFNFVFRJTkdTOiAncGF5bWVudF9zZXR0aW5ncycsXG5cdFx0TE9HUzogJ3BheW1lbnRfbG9nJyxcblx0fSxcblx0TUFJTlRFTkFOQ0U6IHtcblx0XHRNQUlOVEVOQU5DRTogQURNSU5fUk9VVEVfQUNUSU9OX0RFRkFVTFQsXG5cdFx0UkVTRVRfT1JfREVMRVRFX0RBVEE6ICdkYXRhX3Jlc2V0Jyxcblx0XHREQVRFVElNRV9VVElMSVRJRVM6ICdkYXRldGltZV90b29scycsXG5cdFx0U1lTVEVNX0lORk9STUFUSU9OOiAnc3lzdGVtX3N0YXR1cycsXG5cdH0sXG5cdFNVUFBPUlQ6IHtcblx0XHRTVVBQT1JUOiBBRE1JTl9ST1VURV9BQ1RJT05fREVGQVVMVCxcblx0XHRGQVE6ICdmYXEnLFxuXHRcdERFVkVMT1BFUlM6ICdkZXZlbG9wZXJzJyxcblx0XHRTSE9SVENPREVTOiAnc2hvcnRjb2RlcycsXG5cdH0sXG5cdEFCT1VUOiB7XG5cdFx0V0hBVFNfTkVXOiBBRE1JTl9ST1VURV9BQ1RJT05fREVGQVVMVCxcblx0XHRBQk9VVDogJ292ZXJ2aWV3Jyxcblx0XHRDUkVESVRTOiAnY3JlZGl0cycsXG5cdFx0UkVWSUVXUzogJ3Jldmlld3MnLFxuXHR9LFxufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGFkbWluIHVybCBmb3IgYSBnaXZlbiBwYWdlIGFuZCBhY3Rpb24uXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBwYWdlICBUaGUgbWFpbiBlZSBhZG1pbiBwYWdlIHN0cmluZ1xuICogQHBhcmFtIHsgc3RyaW5nIH0gYWN0aW9uIFRoaXMgc2hvdWxkIGNvcnJlc3BvbmQgdG8gdGhlIGFjdGlvbiBmb3IgdGhlIGFkbWluXG4gKiBcdFx0XHRcdFx0XHRcdHBhZ2UuXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gQSBmdWxsIHVybCBmb3IgdGhlIGdpdmVuIGFyZ3VtZW50cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEFkbWluVXJsID0gKFxuXHRwYWdlID0gQURNSU5fUk9VVEVTLkVWRU5UUyxcblx0YWN0aW9uID0gQURNSU5fUk9VVEVfQUNUSU9OX0RFRkFVTFRcbikgPT4ge1xuXHRyZXR1cm4gYCR7IEFETUlOX1VSTCB9YWRtaW4ucGhwP3BhZ2U9JHsgcGFnZSB9JmFjdGlvbj0keyBhY3Rpb24gfWA7XG59O1xuIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhJztcblxuLyoqXG4gKiBQcm92aWRlZCB2aWEgdGhlIGRhdGEgcGFzc2VkIGFsb25nIGJ5IHRoZSBzZXJ2ZXIuXG4gKiBUaGlzIGRhdGEgYSBjb25maWd1cmF0aW9uIG9iamVjdCBwYXNzZWQgYWxvbmcgZnJvbSB0aGUgc2VydmVyIHRoYXQgZXhwb3Nlc1xuICogdGhlIGRlZmF1bHQgdGltZXpvbmUgc2V0dGluZ3MgZnJvbSB0aGUgc2VydmVyLlxuICogQHR5cGUge3t9fVxuICovXG5leHBvcnQgY29uc3QgeyBkZWZhdWx0X3RpbWV6b25lOiB0aW1lem9uZUNvbmZpZyA9IHtcblx0cHJldHR5OiAnVVRDJyxcblx0c3RyaW5nOiAnVVRDJyxcblx0b2Zmc2V0OiAwLFxufSB9ID0gZGF0YTtcbiIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJ2YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9zZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7XG4gIGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7XG5cbiAgdHJ5IHtcbiAgICBEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFJlZmxlY3QuY29uc3RydWN0KERhdGUsIFtdLCBmdW5jdGlvbiAoKSB7fSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICBpZiAoaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9jb25zdHJ1Y3QgPSBSZWZsZWN0LmNvbnN0cnVjdDtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9jb25zdHJ1Y3QgPSBmdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHtcbiAgICAgIHZhciBhID0gW251bGxdO1xuICAgICAgYS5wdXNoLmFwcGx5KGEsIGFyZ3MpO1xuICAgICAgdmFyIENvbnN0cnVjdG9yID0gRnVuY3Rpb24uYmluZC5hcHBseShQYXJlbnQsIGEpO1xuICAgICAgdmFyIGluc3RhbmNlID0gbmV3IENvbnN0cnVjdG9yKCk7XG4gICAgICBpZiAoQ2xhc3MpIHNldFByb3RvdHlwZU9mKGluc3RhbmNlLCBDbGFzcy5wcm90b3R5cGUpO1xuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX2NvbnN0cnVjdC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jb25zdHJ1Y3Q7IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsImltcG9ydCBwb3N0Zml4IGZyb20gJ0B0YW5uaW4vcG9zdGZpeCc7XG5pbXBvcnQgZXZhbHVhdGUgZnJvbSAnQHRhbm5pbi9ldmFsdWF0ZSc7XG5cbi8qKlxuICogR2l2ZW4gYSBDIGV4cHJlc3Npb24sIHJldHVybnMgYSBmdW5jdGlvbiB3aGljaCBjYW4gYmUgY2FsbGVkIHRvIGV2YWx1YXRlIGl0c1xuICogcmVzdWx0LlxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogYGBganNcbiAqIGltcG9ydCBjb21waWxlIGZyb20gJ0B0YW5uaW4vY29tcGlsZSc7XG4gKlxuICogY29uc3QgZXZhbHVhdGUgPSBjb21waWxlKCAnbiA+IDEnICk7XG4gKlxuICogZXZhbHVhdGUoIHsgbjogMiB9ICk7XG4gKiAvLyDih5IgdHJ1ZVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV4cHJlc3Npb24gQyBleHByZXNzaW9uLlxuICpcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBDb21waWxlZCBldmFsdWF0b3IuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBpbGUoIGV4cHJlc3Npb24gKSB7XG5cdHZhciB0ZXJtcyA9IHBvc3RmaXgoIGV4cHJlc3Npb24gKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oIHZhcmlhYmxlcyApIHtcblx0XHRyZXR1cm4gZXZhbHVhdGUoIHRlcm1zLCB2YXJpYWJsZXMgKTtcblx0fTtcbn1cbiIsIi8qKlxuICogT3BlcmF0b3IgY2FsbGJhY2sgZnVuY3Rpb25zLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBPUEVSQVRPUlMgPSB7XG5cdCchJzogZnVuY3Rpb24oIGEgKSB7XG5cdFx0cmV0dXJuICEgYTtcblx0fSxcblx0JyonOiBmdW5jdGlvbiggYSwgYiApIHtcblx0XHRyZXR1cm4gYSAqIGI7XG5cdH0sXG5cdCcvJzogZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0cmV0dXJuIGEgLyBiO1xuXHR9LFxuXHQnJSc6IGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdHJldHVybiBhICUgYjtcblx0fSxcblx0JysnOiBmdW5jdGlvbiggYSwgYiApIHtcblx0XHRyZXR1cm4gYSArIGI7XG5cdH0sXG5cdCctJzogZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0cmV0dXJuIGEgLSBiO1xuXHR9LFxuXHQnPCc6IGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdHJldHVybiBhIDwgYjtcblx0fSxcblx0Jzw9JzogZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0cmV0dXJuIGEgPD0gYjtcblx0fSxcblx0Jz4nOiBmdW5jdGlvbiggYSwgYiApIHtcblx0XHRyZXR1cm4gYSA+IGI7XG5cdH0sXG5cdCc+PSc6IGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdHJldHVybiBhID49IGI7XG5cdH0sXG5cdCc9PSc6IGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdHJldHVybiBhID09PSBiO1xuXHR9LFxuXHQnIT0nOiBmdW5jdGlvbiggYSwgYiApIHtcblx0XHRyZXR1cm4gYSAhPT0gYjtcblx0fSxcblx0JyYmJzogZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0cmV0dXJuIGEgJiYgYjtcblx0fSxcblx0J3x8JzogZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0cmV0dXJuIGEgfHwgYjtcblx0fSxcblx0Jz86JzogZnVuY3Rpb24oIGEsIGIsIGMgKSB7XG5cdFx0aWYgKCBhICkge1xuXHRcdFx0dGhyb3cgYjtcblx0XHR9XG5cblx0XHRyZXR1cm4gYztcblx0fSxcbn07XG5cbi8qKlxuICogR2l2ZW4gYW4gYXJyYXkgb2YgcG9zdGZpeCB0ZXJtcyBhbmQgb3BlcmFuZCB2YXJpYWJsZXMsIHJldHVybnMgdGhlIHJlc3VsdCBvZlxuICogdGhlIHBvc3RmaXggZXZhbHVhdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqIGBgYGpzXG4gKiBpbXBvcnQgZXZhbHVhdGUgZnJvbSAnQHRhbm5pbi9ldmFsdWF0ZSc7XG4gKlxuICogLy8gMyArIDQgKiA1IC8gNiDih5IgJzMgNCA1ICogNiAvICsnXG4gKiBjb25zdCB0ZXJtcyA9IFsgJzMnLCAnNCcsICc1JywgJyonLCAnNicsICcvJywgJysnIF07XG4gKlxuICogZXZhbHVhdGUoIHRlcm1zLCB7fSApO1xuICogLy8g4oeSIDYuMzMzMzMzMzMzMzMzMzM0XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwb3N0Zml4ICAgUG9zdGZpeCB0ZXJtcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSAgIHZhcmlhYmxlcyBPcGVyYW5kIHZhcmlhYmxlcy5cbiAqXG4gKiBAcmV0dXJuIHsqfSBSZXN1bHQgb2YgZXZhbHVhdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXZhbHVhdGUoIHBvc3RmaXgsIHZhcmlhYmxlcyApIHtcblx0dmFyIHN0YWNrID0gW10sXG5cdFx0aSwgaiwgYXJncywgZ2V0T3BlcmF0b3JSZXN1bHQsIHRlcm0sIHZhbHVlO1xuXG5cdGZvciAoIGkgPSAwOyBpIDwgcG9zdGZpeC5sZW5ndGg7IGkrKyApIHtcblx0XHR0ZXJtID0gcG9zdGZpeFsgaSBdO1xuXG5cdFx0Z2V0T3BlcmF0b3JSZXN1bHQgPSBPUEVSQVRPUlNbIHRlcm0gXTtcblx0XHRpZiAoIGdldE9wZXJhdG9yUmVzdWx0ICkge1xuXHRcdFx0Ly8gUG9wIGZyb20gc3RhY2sgYnkgbnVtYmVyIG9mIGZ1bmN0aW9uIGFyZ3VtZW50cy5cblx0XHRcdGogPSBnZXRPcGVyYXRvclJlc3VsdC5sZW5ndGg7XG5cdFx0XHRhcmdzID0gQXJyYXkoIGogKTtcblx0XHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0XHRhcmdzWyBqIF0gPSBzdGFjay5wb3AoKTtcblx0XHRcdH1cblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dmFsdWUgPSBnZXRPcGVyYXRvclJlc3VsdC5hcHBseSggbnVsbCwgYXJncyApO1xuXHRcdFx0fSBjYXRjaCAoIGVhcmx5UmV0dXJuICkge1xuXHRcdFx0XHRyZXR1cm4gZWFybHlSZXR1cm47XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICggdmFyaWFibGVzLmhhc093blByb3BlcnR5KCB0ZXJtICkgKSB7XG5cdFx0XHR2YWx1ZSA9IHZhcmlhYmxlc1sgdGVybSBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YWx1ZSA9ICt0ZXJtO1xuXHRcdH1cblxuXHRcdHN0YWNrLnB1c2goIHZhbHVlICk7XG5cdH1cblxuXHRyZXR1cm4gc3RhY2tbIDAgXTtcbn1cbiIsImltcG9ydCBjb21waWxlIGZyb20gJ0B0YW5uaW4vY29tcGlsZSc7XG5cbi8qKlxuICogR2l2ZW4gYSBDIGV4cHJlc3Npb24sIHJldHVybnMgYSBmdW5jdGlvbiB3aGljaCwgd2hlbiBjYWxsZWQgd2l0aCBhIHZhbHVlLFxuICogZXZhbHVhdGVzIHRoZSByZXN1bHQgd2l0aCB0aGUgdmFsdWUgYXNzdW1lZCB0byBiZSB0aGUgXCJuXCIgdmFyaWFibGUgb2YgdGhlXG4gKiBleHByZXNzaW9uLiBUaGUgcmVzdWx0IHdpbGwgYmUgY29lcmNlZCB0byBpdHMgbnVtZXJpYyBlcXVpdmFsZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uIEMgZXhwcmVzc2lvbi5cbiAqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gRXZhbHVhdG9yIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwbHVyYWxGb3JtcyggZXhwcmVzc2lvbiApIHtcblx0dmFyIGV2YWx1YXRlID0gY29tcGlsZSggZXhwcmVzc2lvbiApO1xuXG5cdHJldHVybiBmdW5jdGlvbiggbiApIHtcblx0XHRyZXR1cm4gK2V2YWx1YXRlKCB7IG46IG4gfSApO1xuXHR9O1xufVxuIiwidmFyIFBSRUNFREVOQ0UsIE9QRU5FUlMsIFRFUk1JTkFUT1JTLCBQQVRURVJOO1xuXG4vKipcbiAqIE9wZXJhdG9yIHByZWNlZGVuY2UgbWFwcGluZy5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5QUkVDRURFTkNFID0ge1xuXHQnKCc6IDksXG5cdCchJzogOCxcblx0JyonOiA3LFxuXHQnLyc6IDcsXG5cdCclJzogNyxcblx0JysnOiA2LFxuXHQnLSc6IDYsXG5cdCc8JzogNSxcblx0Jzw9JzogNSxcblx0Jz4nOiA1LFxuXHQnPj0nOiA1LFxuXHQnPT0nOiA0LFxuXHQnIT0nOiA0LFxuXHQnJiYnOiAzLFxuXHQnfHwnOiAyLFxuXHQnPyc6IDEsXG5cdCc/Oic6IDEsXG59O1xuXG4vKipcbiAqIENoYXJhY3RlcnMgd2hpY2ggc2lnbmFsIHBhaXIgb3BlbmluZywgdG8gYmUgdGVybWluYXRlZCBieSB0ZXJtaW5hdG9ycy5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nW119XG4gKi9cbk9QRU5FUlMgPSBbICcoJywgJz8nIF07XG5cbi8qKlxuICogQ2hhcmFjdGVycyB3aGljaCBzaWduYWwgcGFpciB0ZXJtaW5hdGlvbiwgdGhlIHZhbHVlIGFuIGFycmF5IHdpdGggdGhlXG4gKiBvcGVuZXIgYXMgaXRzIGZpcnN0IG1lbWJlci4gVGhlIHNlY29uZCBtZW1iZXIgaXMgYW4gb3B0aW9uYWwgb3BlcmF0b3JcbiAqIHJlcGxhY2VtZW50IHRvIHB1c2ggdG8gdGhlIHN0YWNrLlxuICpcbiAqIEB0eXBlIHtzdHJpbmdbXX1cbiAqL1xuVEVSTUlOQVRPUlMgPSB7XG5cdCcpJzogWyAnKCcgXSxcblx0JzonOiBbICc/JywgJz86JyBdLFxufTtcblxuLyoqXG4gKiBQYXR0ZXJuIG1hdGNoaW5nIG9wZXJhdG9ycyBhbmQgb3BlbmVycy5cbiAqXG4gKiBAdHlwZSB7UmVnRXhwfVxuICovXG5QQVRURVJOID0gLzw9fD49fD09fCE9fCYmfFxcfFxcfHxcXD86fFxcKHwhfFxcKnxcXC98JXxcXCt8LXw8fD58XFw/fFxcKXw6LztcblxuLyoqXG4gKiBHaXZlbiBhIEMgZXhwcmVzc2lvbiwgcmV0dXJucyB0aGUgZXF1aXZhbGVudCBwb3N0Zml4IChSZXZlcnNlIFBvbGlzaClcbiAqIG5vdGF0aW9uIHRlcm1zIGFzIGFuIGFycmF5LlxuICpcbiAqIElmIGEgcG9zdGZpeCBzdHJpbmcgaXMgZGVzaXJlZCwgc2ltcGx5IGAuam9pbiggJyAnIClgIHRoZSByZXN1bHQuXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IHBvc3RmaXggZnJvbSAnQHRhbm5pbi9wb3N0Zml4JztcbiAqXG4gKiBwb3N0Zml4KCAnbiA+IDEnICk7XG4gKiAvLyDih5IgWyAnbicsICcxJywgJz4nIF1cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uIEMgZXhwcmVzc2lvbi5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmdbXX0gUG9zdGZpeCB0ZXJtcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG9zdGZpeCggZXhwcmVzc2lvbiApIHtcblx0dmFyIHRlcm1zID0gW10sXG5cdFx0c3RhY2sgPSBbXSxcblx0XHRtYXRjaCwgb3BlcmF0b3IsIHRlcm0sIGVsZW1lbnQ7XG5cblx0d2hpbGUgKCAoIG1hdGNoID0gZXhwcmVzc2lvbi5tYXRjaCggUEFUVEVSTiApICkgKSB7XG5cdFx0b3BlcmF0b3IgPSBtYXRjaFsgMCBdO1xuXG5cdFx0Ly8gVGVybSBpcyB0aGUgc3RyaW5nIHByZWNlZGluZyB0aGUgb3BlcmF0b3IgbWF0Y2guIEl0IG1heSBjb250YWluXG5cdFx0Ly8gd2hpdGVzcGFjZSwgYW5kIG1heSBiZSBlbXB0eSAoaWYgb3BlcmF0b3IgaXMgYXQgYmVnaW5uaW5nKS5cblx0XHR0ZXJtID0gZXhwcmVzc2lvbi5zdWJzdHIoIDAsIG1hdGNoLmluZGV4ICkudHJpbSgpO1xuXHRcdGlmICggdGVybSApIHtcblx0XHRcdHRlcm1zLnB1c2goIHRlcm0gKTtcblx0XHR9XG5cblx0XHR3aGlsZSAoICggZWxlbWVudCA9IHN0YWNrLnBvcCgpICkgKSB7XG5cdFx0XHRpZiAoIFRFUk1JTkFUT1JTWyBvcGVyYXRvciBdICkge1xuXHRcdFx0XHRpZiAoIFRFUk1JTkFUT1JTWyBvcGVyYXRvciBdWyAwIF0gPT09IGVsZW1lbnQgKSB7XG5cdFx0XHRcdFx0Ly8gU3Vic3RpdHV0aW9uIHdvcmtzIGhlcmUgdW5kZXIgYXNzdW1wdGlvbiB0aGF0IGJlY2F1c2Vcblx0XHRcdFx0XHQvLyB0aGUgYXNzaWduZWQgb3BlcmF0b3Igd2lsbCBubyBsb25nZXIgYmUgYSB0ZXJtaW5hdG9yLCBpdFxuXHRcdFx0XHRcdC8vIHdpbGwgYmUgcHVzaGVkIHRvIHRoZSBzdGFjayBkdXJpbmcgdGhlIGNvbmRpdGlvbiBiZWxvdy5cblx0XHRcdFx0XHRvcGVyYXRvciA9IFRFUk1JTkFUT1JTWyBvcGVyYXRvciBdWyAxIF0gfHwgb3BlcmF0b3I7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoIE9QRU5FUlMuaW5kZXhPZiggZWxlbWVudCApID49IDAgfHwgUFJFQ0VERU5DRVsgZWxlbWVudCBdIDwgUFJFQ0VERU5DRVsgb3BlcmF0b3IgXSApIHtcblx0XHRcdFx0Ly8gUHVzaCB0byBzdGFjayBpZiBlaXRoZXIgYW4gb3BlbmVyIG9yIHdoZW4gcG9wIHJldmVhbHMgYW5cblx0XHRcdFx0Ly8gZWxlbWVudCBvZiBsb3dlciBwcmVjZWRlbmNlLlxuXHRcdFx0XHRzdGFjay5wdXNoKCBlbGVtZW50ICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGb3IgZWFjaCBwb3BwZWQgZnJvbSBzdGFjaywgcHVzaCB0byB0ZXJtcy5cblx0XHRcdHRlcm1zLnB1c2goIGVsZW1lbnQgKTtcblx0XHR9XG5cblx0XHRpZiAoICEgVEVSTUlOQVRPUlNbIG9wZXJhdG9yIF0gKSB7XG5cdFx0XHRzdGFjay5wdXNoKCBvcGVyYXRvciApO1xuXHRcdH1cblxuXHRcdC8vIFNsaWNlIG1hdGNoZWQgZnJhZ21lbnQgZnJvbSBleHByZXNzaW9uIHRvIGNvbnRpbnVlIG1hdGNoLlxuXHRcdGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnN1YnN0ciggbWF0Y2guaW5kZXggKyBvcGVyYXRvci5sZW5ndGggKTtcblx0fVxuXG5cdC8vIFB1c2ggcmVtYWluZGVyIG9mIG9wZXJhbmQsIGlmIGV4aXN0cywgdG8gdGVybXMuXG5cdGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnRyaW0oKTtcblx0aWYgKCBleHByZXNzaW9uICkge1xuXHRcdHRlcm1zLnB1c2goIGV4cHJlc3Npb24gKTtcblx0fVxuXG5cdC8vIFBvcCByZW1haW5pbmcgaXRlbXMgZnJvbSBzdGFjayBpbnRvIHRlcm1zLlxuXHRyZXR1cm4gdGVybXMuY29uY2F0KCBzdGFjay5yZXZlcnNlKCkgKTtcbn1cbiIsImltcG9ydCBfb2JqZWN0U3ByZWFkIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RTcHJlYWRcIjtcblxuLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IFRhbm5pbiBmcm9tICd0YW5uaW4nO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbWVtaXplJztcbmltcG9ydCBzcHJpbnRmanMgZnJvbSAnc3ByaW50Zi1qcyc7XG4vKipcbiAqIERlZmF1bHQgbG9jYWxlIGRhdGEgdG8gdXNlIGZvciBUYW5uaW4gZG9tYWluIHdoZW4gbm90IG90aGVyd2lzZSBwcm92aWRlZC5cbiAqIEFzc3VtZXMgYW4gRW5nbGlzaCBwbHVyYWwgZm9ybXMgZXhwcmVzc2lvbi5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5cbnZhciBERUZBVUxUX0xPQ0FMRV9EQVRBID0ge1xuICAnJzoge1xuICAgIHBsdXJhbF9mb3JtczogJ3BsdXJhbD0obiE9MSknXG4gIH1cbn07XG4vKipcbiAqIExvZyB0byBjb25zb2xlLCBvbmNlIHBlciBtZXNzYWdlOyBvciBtb3JlIHByZWNpc2VseSwgcGVyIHJlZmVyZW50aWFsbHkgZXF1YWxcbiAqIGFyZ3VtZW50IHNldC4gQmVjYXVzZSBKZWQgdGhyb3dzIGVycm9ycywgd2UgbG9nIHRoZXNlIHRvIHRoZSBjb25zb2xlIGluc3RlYWRcbiAqIHRvIGF2b2lkIGNyYXNoaW5nIHRoZSBhcHBsaWNhdGlvbi5cbiAqXG4gKiBAcGFyYW0gey4uLip9IGFyZ3MgQXJndW1lbnRzIHRvIHBhc3MgdG8gYGNvbnNvbGUuZXJyb3JgXG4gKi9cblxudmFyIGxvZ0Vycm9yT25jZSA9IG1lbW9pemUoY29uc29sZS5lcnJvcik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG4vKipcbiAqIFRoZSB1bmRlcmx5aW5nIGluc3RhbmNlIG9mIFRhbm5pbiB0byB3aGljaCBleHBvcnRlZCBmdW5jdGlvbnMgaW50ZXJmYWNlLlxuICpcbiAqIEB0eXBlIHtUYW5uaW59XG4gKi9cblxudmFyIGkxOG4gPSBuZXcgVGFubmluKHt9KTtcbi8qKlxuICogTWVyZ2VzIGxvY2FsZSBkYXRhIGludG8gdGhlIFRhbm5pbiBpbnN0YW5jZSBieSBkb21haW4uIEFjY2VwdHMgZGF0YSBpbiBhXG4gKiBKZWQtZm9ybWF0dGVkIEpTT04gb2JqZWN0IHNoYXBlLlxuICpcbiAqIEBzZWUgaHR0cDovL21lc3NhZ2Vmb3JtYXQuZ2l0aHViLmlvL0plZC9cbiAqXG4gKiBAcGFyYW0gez9PYmplY3R9IGRhdGEgICBMb2NhbGUgZGF0YSBjb25maWd1cmF0aW9uLlxuICogQHBhcmFtIHs/c3RyaW5nfSBkb21haW4gRG9tYWluIGZvciB3aGljaCBjb25maWd1cmF0aW9uIGFwcGxpZXMuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldExvY2FsZURhdGEoZGF0YSkge1xuICB2YXIgZG9tYWluID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnZGVmYXVsdCc7XG4gIGkxOG4uZGF0YVtkb21haW5dID0gX29iamVjdFNwcmVhZCh7fSwgREVGQVVMVF9MT0NBTEVfREFUQSwgaTE4bi5kYXRhW2RvbWFpbl0sIGRhdGEpOyAvLyBQb3B1bGF0ZSBkZWZhdWx0IGRvbWFpbiBjb25maWd1cmF0aW9uIChzdXBwb3J0ZWQgbG9jYWxlIGRhdGUgd2hpY2ggb21pdHNcbiAgLy8gYSBwbHVyYWwgZm9ybXMgZXhwcmVzc2lvbikuXG5cbiAgaTE4bi5kYXRhW2RvbWFpbl1bJyddID0gX29iamVjdFNwcmVhZCh7fSwgREVGQVVMVF9MT0NBTEVfREFUQVsnJ10sIGkxOG4uZGF0YVtkb21haW5dWycnXSk7XG59XG4vKipcbiAqIFdyYXBwZXIgZm9yIFRhbm5pbidzIGBkY25wZ2V0dGV4dGAuIFBvcHVsYXRlcyBkZWZhdWx0IGxvY2FsZSBkYXRhIGlmIG5vdFxuICogb3RoZXJ3aXNlIHByZXZpb3VzbHkgYXNzaWduZWQuXG4gKlxuICogQHBhcmFtIHs/c3RyaW5nfSBkb21haW4gIERvbWFpbiB0byByZXRyaWV2ZSB0aGUgdHJhbnNsYXRlZCB0ZXh0LlxuICogQHBhcmFtIHs/c3RyaW5nfSBjb250ZXh0IENvbnRleHQgaW5mb3JtYXRpb24gZm9yIHRoZSB0cmFuc2xhdG9ycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSAgc2luZ2xlICBUZXh0IHRvIHRyYW5zbGF0ZSBpZiBub24tcGx1cmFsLiBVc2VkIGFzIGZhbGxiYWNrXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlIG9uIGEgY2F1Z2h0IGVycm9yLlxuICogQHBhcmFtIHs/c3RyaW5nfSBwbHVyYWwgIFRoZSB0ZXh0IHRvIGJlIHVzZWQgaWYgdGhlIG51bWJlciBpcyBwbHVyYWwuXG4gKiBAcGFyYW0gez9udW1iZXJ9IG51bWJlciAgVGhlIG51bWJlciB0byBjb21wYXJlIGFnYWluc3QgdG8gdXNlIGVpdGhlciB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBzaW5ndWxhciBvciBwbHVyYWwgZm9ybS5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB0cmFuc2xhdGVkIHN0cmluZy5cbiAqL1xuXG5mdW5jdGlvbiBkY25wZ2V0dGV4dCgpIHtcbiAgdmFyIGRvbWFpbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJ2RlZmF1bHQnO1xuICB2YXIgY29udGV4dCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICB2YXIgc2luZ2xlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQ7XG4gIHZhciBwbHVyYWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMyA/IGFyZ3VtZW50c1szXSA6IHVuZGVmaW5lZDtcbiAgdmFyIG51bWJlciA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ID8gYXJndW1lbnRzWzRdIDogdW5kZWZpbmVkO1xuXG4gIGlmICghaTE4bi5kYXRhW2RvbWFpbl0pIHtcbiAgICBzZXRMb2NhbGVEYXRhKHVuZGVmaW5lZCwgZG9tYWluKTtcbiAgfVxuXG4gIHJldHVybiBpMThuLmRjbnBnZXR0ZXh0KGRvbWFpbiwgY29udGV4dCwgc2luZ2xlLCBwbHVyYWwsIG51bWJlcik7XG59XG4vKipcbiAqIFJldHJpZXZlIHRoZSB0cmFuc2xhdGlvbiBvZiB0ZXh0LlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIud29yZHByZXNzLm9yZy9yZWZlcmVuY2UvZnVuY3Rpb25zL19fL1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSAgdGV4dCAgIFRleHQgdG8gdHJhbnNsYXRlLlxuICogQHBhcmFtIHs/c3RyaW5nfSBkb21haW4gRG9tYWluIHRvIHJldHJpZXZlIHRoZSB0cmFuc2xhdGVkIHRleHQuXG4gKlxuICogQHJldHVybiB7c3RyaW5nfSBUcmFuc2xhdGVkIHRleHQuXG4gKi9cblxuXG5leHBvcnQgZnVuY3Rpb24gX18odGV4dCwgZG9tYWluKSB7XG4gIHJldHVybiBkY25wZ2V0dGV4dChkb21haW4sIHVuZGVmaW5lZCwgdGV4dCk7XG59XG4vKipcbiAqIFJldHJpZXZlIHRyYW5zbGF0ZWQgc3RyaW5nIHdpdGggZ2V0dGV4dCBjb250ZXh0LlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIud29yZHByZXNzLm9yZy9yZWZlcmVuY2UvZnVuY3Rpb25zL194L1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSAgdGV4dCAgICBUZXh0IHRvIHRyYW5zbGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSAgY29udGV4dCBDb250ZXh0IGluZm9ybWF0aW9uIGZvciB0aGUgdHJhbnNsYXRvcnMuXG4gKiBAcGFyYW0gez9zdHJpbmd9IGRvbWFpbiAgRG9tYWluIHRvIHJldHJpZXZlIHRoZSB0cmFuc2xhdGVkIHRleHQuXG4gKlxuICogQHJldHVybiB7c3RyaW5nfSBUcmFuc2xhdGVkIGNvbnRleHQgc3RyaW5nIHdpdGhvdXQgcGlwZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gX3godGV4dCwgY29udGV4dCwgZG9tYWluKSB7XG4gIHJldHVybiBkY25wZ2V0dGV4dChkb21haW4sIGNvbnRleHQsIHRleHQpO1xufVxuLyoqXG4gKiBUcmFuc2xhdGVzIGFuZCByZXRyaWV2ZXMgdGhlIHNpbmd1bGFyIG9yIHBsdXJhbCBmb3JtIGJhc2VkIG9uIHRoZSBzdXBwbGllZFxuICogbnVtYmVyLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIud29yZHByZXNzLm9yZy9yZWZlcmVuY2UvZnVuY3Rpb25zL19uL1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSAgc2luZ2xlIFRoZSB0ZXh0IHRvIGJlIHVzZWQgaWYgdGhlIG51bWJlciBpcyBzaW5ndWxhci5cbiAqIEBwYXJhbSB7c3RyaW5nfSAgcGx1cmFsIFRoZSB0ZXh0IHRvIGJlIHVzZWQgaWYgdGhlIG51bWJlciBpcyBwbHVyYWwuXG4gKiBAcGFyYW0ge251bWJlcn0gIG51bWJlciBUaGUgbnVtYmVyIHRvIGNvbXBhcmUgYWdhaW5zdCB0byB1c2UgZWl0aGVyIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgc2luZ3VsYXIgb3IgcGx1cmFsIGZvcm0uXG4gKiBAcGFyYW0gez9zdHJpbmd9IGRvbWFpbiBEb21haW4gdG8gcmV0cmlldmUgdGhlIHRyYW5zbGF0ZWQgdGV4dC5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB0cmFuc2xhdGVkIHNpbmd1bGFyIG9yIHBsdXJhbCBmb3JtLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBfbihzaW5nbGUsIHBsdXJhbCwgbnVtYmVyLCBkb21haW4pIHtcbiAgcmV0dXJuIGRjbnBnZXR0ZXh0KGRvbWFpbiwgdW5kZWZpbmVkLCBzaW5nbGUsIHBsdXJhbCwgbnVtYmVyKTtcbn1cbi8qKlxuICogVHJhbnNsYXRlcyBhbmQgcmV0cmlldmVzIHRoZSBzaW5ndWxhciBvciBwbHVyYWwgZm9ybSBiYXNlZCBvbiB0aGUgc3VwcGxpZWRcbiAqIG51bWJlciwgd2l0aCBnZXR0ZXh0IGNvbnRleHQuXG4gKlxuICogQHNlZSBodHRwczovL2RldmVsb3Blci53b3JkcHJlc3Mub3JnL3JlZmVyZW5jZS9mdW5jdGlvbnMvX254L1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSAgc2luZ2xlICBUaGUgdGV4dCB0byBiZSB1c2VkIGlmIHRoZSBudW1iZXIgaXMgc2luZ3VsYXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gIHBsdXJhbCAgVGhlIHRleHQgdG8gYmUgdXNlZCBpZiB0aGUgbnVtYmVyIGlzIHBsdXJhbC5cbiAqIEBwYXJhbSB7bnVtYmVyfSAgbnVtYmVyICBUaGUgbnVtYmVyIHRvIGNvbXBhcmUgYWdhaW5zdCB0byB1c2UgZWl0aGVyIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgIHNpbmd1bGFyIG9yIHBsdXJhbCBmb3JtLlxuICogQHBhcmFtIHtzdHJpbmd9ICBjb250ZXh0IENvbnRleHQgaW5mb3JtYXRpb24gZm9yIHRoZSB0cmFuc2xhdG9ycy5cbiAqIEBwYXJhbSB7P3N0cmluZ30gZG9tYWluICBEb21haW4gdG8gcmV0cmlldmUgdGhlIHRyYW5zbGF0ZWQgdGV4dC5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB0cmFuc2xhdGVkIHNpbmd1bGFyIG9yIHBsdXJhbCBmb3JtLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBfbngoc2luZ2xlLCBwbHVyYWwsIG51bWJlciwgY29udGV4dCwgZG9tYWluKSB7XG4gIHJldHVybiBkY25wZ2V0dGV4dChkb21haW4sIGNvbnRleHQsIHNpbmdsZSwgcGx1cmFsLCBudW1iZXIpO1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgZm9ybWF0dGVkIHN0cmluZy4gSWYgYW4gZXJyb3Igb2NjdXJzIGluIGFwcGx5aW5nIHRoZSBmb3JtYXQsIHRoZVxuICogb3JpZ2luYWwgZm9ybWF0IHN0cmluZyBpcyByZXR1cm5lZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gICBmb3JtYXQgIFRoZSBmb3JtYXQgb2YgdGhlIHN0cmluZyB0byBnZW5lcmF0ZS5cbiAqIEBwYXJhbSB7Li4uc3RyaW5nfSBhcmdzIEFyZ3VtZW50cyB0byBhcHBseSB0byB0aGUgZm9ybWF0LlxuICpcbiAqIEBzZWUgaHR0cDovL3d3dy5kaXZlaW50b2phdmFzY3JpcHQuY29tL3Byb2plY3RzL2phdmFzY3JpcHQtc3ByaW50ZlxuICpcbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBzdHJpbmcuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNwcmludGYoZm9ybWF0KSB7XG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwcmludGZqcy5zcHJpbnRmLmFwcGx5KHNwcmludGZqcywgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2dFcnJvck9uY2UoJ3NwcmludGYgZXJyb3I6IFxcblxcbicgKyBlcnJvci50b1N0cmluZygpKTtcbiAgICByZXR1cm4gZm9ybWF0O1xuICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCJpbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSBcIi4vZGVmaW5lUHJvcGVydHlcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG4gICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn0iLCIvKiBnbG9iYWwgd2luZG93LCBleHBvcnRzLCBkZWZpbmUgKi9cblxuIWZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0J1xuXG4gICAgdmFyIHJlID0ge1xuICAgICAgICBub3Rfc3RyaW5nOiAvW15zXS8sXG4gICAgICAgIG5vdF9ib29sOiAvW150XS8sXG4gICAgICAgIG5vdF90eXBlOiAvW15UXS8sXG4gICAgICAgIG5vdF9wcmltaXRpdmU6IC9bXnZdLyxcbiAgICAgICAgbnVtYmVyOiAvW2RpZWZnXS8sXG4gICAgICAgIG51bWVyaWNfYXJnOiAvW2JjZGllZmd1eFhdLyxcbiAgICAgICAganNvbjogL1tqXS8sXG4gICAgICAgIG5vdF9qc29uOiAvW15qXS8sXG4gICAgICAgIHRleHQ6IC9eW15cXHgyNV0rLyxcbiAgICAgICAgbW9kdWxvOiAvXlxceDI1ezJ9LyxcbiAgICAgICAgcGxhY2Vob2xkZXI6IC9eXFx4MjUoPzooWzEtOV1cXGQqKVxcJHxcXCgoW14pXSspXFwpKT8oXFwrKT8oMHwnW14kXSk/KC0pPyhcXGQrKT8oPzpcXC4oXFxkKykpPyhbYi1naWpvc3RUdXZ4WF0pLyxcbiAgICAgICAga2V5OiAvXihbYS16X11bYS16X1xcZF0qKS9pLFxuICAgICAgICBrZXlfYWNjZXNzOiAvXlxcLihbYS16X11bYS16X1xcZF0qKS9pLFxuICAgICAgICBpbmRleF9hY2Nlc3M6IC9eXFxbKFxcZCspXFxdLyxcbiAgICAgICAgc2lnbjogL15bKy1dL1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNwcmludGYoa2V5KSB7XG4gICAgICAgIC8vIGBhcmd1bWVudHNgIGlzIG5vdCBhbiBhcnJheSwgYnV0IHNob3VsZCBiZSBmaW5lIGZvciB0aGlzIGNhbGxcbiAgICAgICAgcmV0dXJuIHNwcmludGZfZm9ybWF0KHNwcmludGZfcGFyc2Uoa2V5KSwgYXJndW1lbnRzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZzcHJpbnRmKGZtdCwgYXJndikge1xuICAgICAgICByZXR1cm4gc3ByaW50Zi5hcHBseShudWxsLCBbZm10XS5jb25jYXQoYXJndiB8fCBbXSkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3ByaW50Zl9mb3JtYXQocGFyc2VfdHJlZSwgYXJndikge1xuICAgICAgICB2YXIgY3Vyc29yID0gMSwgdHJlZV9sZW5ndGggPSBwYXJzZV90cmVlLmxlbmd0aCwgYXJnLCBvdXRwdXQgPSAnJywgaSwgaywgcGgsIHBhZCwgcGFkX2NoYXJhY3RlciwgcGFkX2xlbmd0aCwgaXNfcG9zaXRpdmUsIHNpZ25cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRyZWVfbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyc2VfdHJlZVtpXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gcGFyc2VfdHJlZVtpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHBhcnNlX3RyZWVbaV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgcGggPSBwYXJzZV90cmVlW2ldIC8vIGNvbnZlbmllbmNlIHB1cnBvc2VzIG9ubHlcbiAgICAgICAgICAgICAgICBpZiAocGgua2V5cykgeyAvLyBrZXl3b3JkIGFyZ3VtZW50XG4gICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZ3ZbY3Vyc29yXVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgcGgua2V5cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc3ByaW50ZignW3NwcmludGZdIENhbm5vdCBhY2Nlc3MgcHJvcGVydHkgXCIlc1wiIG9mIHVuZGVmaW5lZCB2YWx1ZSBcIiVzXCInLCBwaC5rZXlzW2tdLCBwaC5rZXlzW2stMV0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJnW3BoLmtleXNba11dXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocGgucGFyYW1fbm8pIHsgLy8gcG9zaXRpb25hbCBhcmd1bWVudCAoZXhwbGljaXQpXG4gICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZ3ZbcGgucGFyYW1fbm9dXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgeyAvLyBwb3NpdGlvbmFsIGFyZ3VtZW50IChpbXBsaWNpdClcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJndltjdXJzb3IrK11cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmUubm90X3R5cGUudGVzdChwaC50eXBlKSAmJiByZS5ub3RfcHJpbWl0aXZlLnRlc3QocGgudHlwZSkgJiYgYXJnIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJnKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmUubnVtZXJpY19hcmcudGVzdChwaC50eXBlKSAmJiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgJiYgaXNOYU4oYXJnKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzcHJpbnRmKCdbc3ByaW50Zl0gZXhwZWN0aW5nIG51bWJlciBidXQgZm91bmQgJVQnLCBhcmcpKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZS5udW1iZXIudGVzdChwaC50eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICBpc19wb3NpdGl2ZSA9IGFyZyA+PSAwXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChwaC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2InOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gcGFyc2VJbnQoYXJnLCAxMCkudG9TdHJpbmcoMilcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChhcmcsIDEwKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdpJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IHBhcnNlSW50KGFyZywgMTApXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdqJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IEpTT04uc3RyaW5naWZ5KGFyZywgbnVsbCwgcGgud2lkdGggPyBwYXJzZUludChwaC53aWR0aCkgOiAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBwaC5wcmVjaXNpb24gPyBwYXJzZUZsb2F0KGFyZykudG9FeHBvbmVudGlhbChwaC5wcmVjaXNpb24pIDogcGFyc2VGbG9hdChhcmcpLnRvRXhwb25lbnRpYWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZic6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBwaC5wcmVjaXNpb24gPyBwYXJzZUZsb2F0KGFyZykudG9GaXhlZChwaC5wcmVjaXNpb24pIDogcGFyc2VGbG9hdChhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdnJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IHBoLnByZWNpc2lvbiA/IFN0cmluZyhOdW1iZXIoYXJnLnRvUHJlY2lzaW9uKHBoLnByZWNpc2lvbikpKSA6IHBhcnNlRmxvYXQoYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSAocGFyc2VJbnQoYXJnLCAxMCkgPj4+IDApLnRvU3RyaW5nKDgpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IFN0cmluZyhhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSAocGgucHJlY2lzaW9uID8gYXJnLnN1YnN0cmluZygwLCBwaC5wcmVjaXNpb24pIDogYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBTdHJpbmcoISFhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSAocGgucHJlY2lzaW9uID8gYXJnLnN1YnN0cmluZygwLCBwaC5wcmVjaXNpb24pIDogYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKS5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKHBoLnByZWNpc2lvbiA/IGFyZy5zdWJzdHJpbmcoMCwgcGgucHJlY2lzaW9uKSA6IGFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gcGFyc2VJbnQoYXJnLCAxMCkgPj4+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJnLnZhbHVlT2YoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKHBoLnByZWNpc2lvbiA/IGFyZy5zdWJzdHJpbmcoMCwgcGgucHJlY2lzaW9uKSA6IGFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKHBhcnNlSW50KGFyZywgMTApID4+PiAwKS50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKHBhcnNlSW50KGFyZywgMTApID4+PiAwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlLmpzb24udGVzdChwaC50eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gYXJnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmUubnVtYmVyLnRlc3QocGgudHlwZSkgJiYgKCFpc19wb3NpdGl2ZSB8fCBwaC5zaWduKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbiA9IGlzX3Bvc2l0aXZlID8gJysnIDogJy0nXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmcudG9TdHJpbmcoKS5yZXBsYWNlKHJlLnNpZ24sICcnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbiA9ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFkX2NoYXJhY3RlciA9IHBoLnBhZF9jaGFyID8gcGgucGFkX2NoYXIgPT09ICcwJyA/ICcwJyA6IHBoLnBhZF9jaGFyLmNoYXJBdCgxKSA6ICcgJ1xuICAgICAgICAgICAgICAgICAgICBwYWRfbGVuZ3RoID0gcGgud2lkdGggLSAoc2lnbiArIGFyZykubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIHBhZCA9IHBoLndpZHRoID8gKHBhZF9sZW5ndGggPiAwID8gcGFkX2NoYXJhY3Rlci5yZXBlYXQocGFkX2xlbmd0aCkgOiAnJykgOiAnJ1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gcGguYWxpZ24gPyBzaWduICsgYXJnICsgcGFkIDogKHBhZF9jaGFyYWN0ZXIgPT09ICcwJyA/IHNpZ24gKyBwYWQgKyBhcmcgOiBwYWQgKyBzaWduICsgYXJnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgfVxuXG4gICAgdmFyIHNwcmludGZfY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgICBmdW5jdGlvbiBzcHJpbnRmX3BhcnNlKGZtdCkge1xuICAgICAgICBpZiAoc3ByaW50Zl9jYWNoZVtmbXRdKSB7XG4gICAgICAgICAgICByZXR1cm4gc3ByaW50Zl9jYWNoZVtmbXRdXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX2ZtdCA9IGZtdCwgbWF0Y2gsIHBhcnNlX3RyZWUgPSBbXSwgYXJnX25hbWVzID0gMFxuICAgICAgICB3aGlsZSAoX2ZtdCkge1xuICAgICAgICAgICAgaWYgKChtYXRjaCA9IHJlLnRleHQuZXhlYyhfZm10KSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBwYXJzZV90cmVlLnB1c2gobWF0Y2hbMF0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobWF0Y2ggPSByZS5tb2R1bG8uZXhlYyhfZm10KSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBwYXJzZV90cmVlLnB1c2goJyUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKG1hdGNoID0gcmUucGxhY2Vob2xkZXIuZXhlYyhfZm10KSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnX25hbWVzIHw9IDFcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkX2xpc3QgPSBbXSwgcmVwbGFjZW1lbnRfZmllbGQgPSBtYXRjaFsyXSwgZmllbGRfbWF0Y2ggPSBbXVxuICAgICAgICAgICAgICAgICAgICBpZiAoKGZpZWxkX21hdGNoID0gcmUua2V5LmV4ZWMocmVwbGFjZW1lbnRfZmllbGQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRfbGlzdC5wdXNoKGZpZWxkX21hdGNoWzFdKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChyZXBsYWNlbWVudF9maWVsZCA9IHJlcGxhY2VtZW50X2ZpZWxkLnN1YnN0cmluZyhmaWVsZF9tYXRjaFswXS5sZW5ndGgpKSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGZpZWxkX21hdGNoID0gcmUua2V5X2FjY2Vzcy5leGVjKHJlcGxhY2VtZW50X2ZpZWxkKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRfbGlzdC5wdXNoKGZpZWxkX21hdGNoWzFdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgoZmllbGRfbWF0Y2ggPSByZS5pbmRleF9hY2Nlc3MuZXhlYyhyZXBsYWNlbWVudF9maWVsZCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkX2xpc3QucHVzaChmaWVsZF9tYXRjaFsxXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignW3NwcmludGZdIGZhaWxlZCB0byBwYXJzZSBuYW1lZCBhcmd1bWVudCBrZXknKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignW3NwcmludGZdIGZhaWxlZCB0byBwYXJzZSBuYW1lZCBhcmd1bWVudCBrZXknKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoWzJdID0gZmllbGRfbGlzdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnX25hbWVzIHw9IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFyZ19uYW1lcyA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tzcHJpbnRmXSBtaXhpbmcgcG9zaXRpb25hbCBhbmQgbmFtZWQgcGxhY2Vob2xkZXJzIGlzIG5vdCAoeWV0KSBzdXBwb3J0ZWQnKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHBhcnNlX3RyZWUucHVzaChcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IG1hdGNoWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1fbm86ICAgIG1hdGNoWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5czogICAgICAgIG1hdGNoWzJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbjogICAgICAgIG1hdGNoWzNdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkX2NoYXI6ICAgIG1hdGNoWzRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ246ICAgICAgIG1hdGNoWzVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICAgICAgIG1hdGNoWzZdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlY2lzaW9uOiAgIG1hdGNoWzddLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogICAgICAgIG1hdGNoWzhdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1tzcHJpbnRmXSB1bmV4cGVjdGVkIHBsYWNlaG9sZGVyJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9mbXQgPSBfZm10LnN1YnN0cmluZyhtYXRjaFswXS5sZW5ndGgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwcmludGZfY2FjaGVbZm10XSA9IHBhcnNlX3RyZWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBleHBvcnQgdG8gZWl0aGVyIGJyb3dzZXIgb3Igbm9kZS5qc1xuICAgICAqL1xuICAgIC8qIGVzbGludC1kaXNhYmxlIHF1b3RlLXByb3BzICovXG4gICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBleHBvcnRzWydzcHJpbnRmJ10gPSBzcHJpbnRmXG4gICAgICAgIGV4cG9ydHNbJ3ZzcHJpbnRmJ10gPSB2c3ByaW50ZlxuICAgIH1cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2luZG93WydzcHJpbnRmJ10gPSBzcHJpbnRmXG4gICAgICAgIHdpbmRvd1sndnNwcmludGYnXSA9IHZzcHJpbnRmXG5cbiAgICAgICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lWydhbWQnXSkge1xuICAgICAgICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICdzcHJpbnRmJzogc3ByaW50ZixcbiAgICAgICAgICAgICAgICAgICAgJ3ZzcHJpbnRmJzogdnNwcmludGZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qIGVzbGludC1lbmFibGUgcXVvdGUtcHJvcHMgKi9cbn0oKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgcGFyc2UsIHN0cmluZ2lmeSB9IGZyb20gJ3FzJztcbnZhciBVUkxfUkVHRVhQID0gL14oPzpodHRwcz86KT9cXC9cXC9cXFMrJC9pO1xudmFyIEVNQUlMX1JFR0VYUCA9IC9eKG1haWx0bzopP1thLXowLTkuXyUrLV0rQFthLXowLTldW2EtejAtOS4tXSpcXC5bYS16XXsyLDYzfSQvaTtcbnZhciBVU0FCTEVfSFJFRl9SRUdFWFAgPSAvXig/OlthLXpdKzp8I3xcXD98XFwufFxcLykvaTtcbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBnaXZlbiBzdHJpbmcgbG9va3MgbGlrZSBhIFVSTC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBzdHJpbmcgdG8gc2NydXRpbmlzZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIGNvbnN0IGlzVVJMID0gaXNVUkwoICdodHRwczovL3dvcmRwcmVzcy5vcmcnICk7IC8vIHRydWVcbiAqIGBgYFxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IGl0IGxvb2tzIGxpa2UgYSBVUkwuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVVJMKHVybCkge1xuICByZXR1cm4gVVJMX1JFR0VYUC50ZXN0KHVybCk7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIHByb3RvY29sIHBhcnQgb2YgdGhlIFVSTC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBmdWxsIFVSTC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIGNvbnN0IHByb3RvY29sMSA9IGdldFByb3RvY29sKCAndGVsOjAxMjM0NTY3OCcgKTsgLy8gJ3RlbDonXG4gKiBjb25zdCBwcm90b2NvbDIgPSBnZXRQcm90b2NvbCggJ2h0dHBzOi8vd29yZHByZXNzLm9yZycgKTsgLy8gJ2h0dHBzOidcbiAqIGBgYFxuICpcbiAqIEByZXR1cm4gez9zdHJpbmd9IFRoZSBwcm90b2NvbCBwYXJ0IG9mIHRoZSBVUkwuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3RvY29sKHVybCkge1xuICB2YXIgbWF0Y2hlcyA9IC9eKFteXFxzOl0rOikvLmV4ZWModXJsKTtcblxuICBpZiAobWF0Y2hlcykge1xuICAgIHJldHVybiBtYXRjaGVzWzFdO1xuICB9XG59XG4vKipcbiAqIFRlc3RzIGlmIGEgdXJsIHByb3RvY29sIGlzIHZhbGlkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm90b2NvbCBUaGUgdXJsIHByb3RvY29sLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogY29uc3QgaXNWYWxpZCA9IGlzVmFsaWRQcm90b2NvbCggJ2h0dHBzOicgKTsgLy8gdHJ1ZVxuICogY29uc3QgaXNOb3RWYWxpZCA9IGlzVmFsaWRQcm90b2NvbCggJ2h0dHBzIDonICk7IC8vIGZhbHNlXG4gKiBgYGBcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBhcmd1bWVudCBpcyBhIHZhbGlkIHByb3RvY29sIChlLmcuIGh0dHA6LCB0ZWw6KS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZFByb3RvY29sKHByb3RvY29sKSB7XG4gIGlmICghcHJvdG9jb2wpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gL15bYS16XFwtLlxcK10rWzAtOV0qOiQvaS50ZXN0KHByb3RvY29sKTtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgYXV0aG9yaXR5IHBhcnQgb2YgdGhlIFVSTC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBmdWxsIFVSTC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIGNvbnN0IGF1dGhvcml0eTEgPSBnZXRBdXRob3JpdHkoICdodHRwczovL3dvcmRwcmVzcy5vcmcvaGVscC8nICk7IC8vICd3b3JkcHJlc3Mub3JnJ1xuICogY29uc3QgYXV0aG9yaXR5MiA9IGdldEF1dGhvcml0eSggJ2h0dHBzOi8vbG9jYWxob3N0OjgwODAvdGVzdC8nICk7IC8vICdsb2NhbGhvc3Q6ODA4MCdcbiAqIGBgYFxuICpcbiAqIEByZXR1cm4gez9zdHJpbmd9IFRoZSBhdXRob3JpdHkgcGFydCBvZiB0aGUgVVJMLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdXRob3JpdHkodXJsKSB7XG4gIHZhciBtYXRjaGVzID0gL15bXlxcL1xcczpdKzooPzpcXC9cXC8pP1xcLz8oW15cXC9cXHMjP10rKVtcXC8jP117MCwxfVxcUyokLy5leGVjKHVybCk7XG5cbiAgaWYgKG1hdGNoZXMpIHtcbiAgICByZXR1cm4gbWF0Y2hlc1sxXTtcbiAgfVxufVxuLyoqXG4gKiBDaGVja3MgZm9yIGludmFsaWQgY2hhcmFjdGVycyB3aXRoaW4gdGhlIHByb3ZpZGVkIGF1dGhvcml0eS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYXV0aG9yaXR5IEEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIFVSTCBhdXRob3JpdHkuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBjb25zdCBpc1ZhbGlkID0gaXNWYWxpZEF1dGhvcml0eSggJ3dvcmRwcmVzcy5vcmcnICk7IC8vIHRydWVcbiAqIGNvbnN0IGlzTm90VmFsaWQgPSBpc1ZhbGlkQXV0aG9yaXR5KCAnd29yZHByZXNzI29yZycgKTsgLy8gZmFsc2VcbiAqIGBgYFxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIGFyZ3VtZW50IGNvbnRhaW5zIGEgdmFsaWQgYXV0aG9yaXR5LlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkQXV0aG9yaXR5KGF1dGhvcml0eSkge1xuICBpZiAoIWF1dGhvcml0eSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiAvXlteXFxzIz9dKyQvLnRlc3QoYXV0aG9yaXR5KTtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgcGF0aCBwYXJ0IG9mIHRoZSBVUkwuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgZnVsbCBVUkwuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBjb25zdCBwYXRoMSA9IGdldFBhdGgoICdodHRwOi8vbG9jYWxob3N0OjgwODAvdGhpcy9pcy9hL3Rlc3Q/cXVlcnk9dHJ1ZScgKTsgLy8gJ3RoaXMvaXMvYS90ZXN0J1xuICogY29uc3QgcGF0aDIgPSBnZXRQYXRoKCAnaHR0cHM6Ly93b3JkcHJlc3Mub3JnL2hlbHAvZmFxLycgKTsgLy8gJ2hlbHAvZmFxJ1xuICogYGBgXG4gKlxuICogQHJldHVybiB7P3N0cmluZ30gVGhlIHBhdGggcGFydCBvZiB0aGUgVVJMLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXRoKHVybCkge1xuICB2YXIgbWF0Y2hlcyA9IC9eW15cXC9cXHM6XSs6KD86XFwvXFwvKT9bXlxcL1xccyM/XStbXFwvXShbXlxccyM/XSspWyM/XXswLDF9XFxTKiQvLmV4ZWModXJsKTtcblxuICBpZiAobWF0Y2hlcykge1xuICAgIHJldHVybiBtYXRjaGVzWzFdO1xuICB9XG59XG4vKipcbiAqIENoZWNrcyBmb3IgaW52YWxpZCBjaGFyYWN0ZXJzIHdpdGhpbiB0aGUgcHJvdmlkZWQgcGF0aC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgVVJMIHBhdGguXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBjb25zdCBpc1ZhbGlkID0gaXNWYWxpZFBhdGgoICd0ZXN0L3BhdGgvJyApOyAvLyB0cnVlXG4gKiBjb25zdCBpc05vdFZhbGlkID0gaXNWYWxpZFBhdGgoICcvaW52YWxpZD90ZXN0L3BhdGgvJyApOyAvLyBmYWxzZVxuICogYGBgXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgYXJndW1lbnQgY29udGFpbnMgYSB2YWxpZCBwYXRoXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRQYXRoKHBhdGgpIHtcbiAgaWYgKCFwYXRoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIC9eW15cXHMjP10rJC8udGVzdChwYXRoKTtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nIHBhcnQgb2YgdGhlIFVSTC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBmdWxsIFVSTC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIGNvbnN0IHF1ZXJ5U3RyaW5nMSA9IGdldFF1ZXJ5U3RyaW5nKCAnaHR0cDovL2xvY2FsaG9zdDo4MDgwL3RoaXMvaXMvYS90ZXN0P3F1ZXJ5PXRydWUjZnJhZ21lbnQnICk7IC8vICdxdWVyeT10cnVlJ1xuICogY29uc3QgcXVlcnlTdHJpbmcyID0gZ2V0UXVlcnlTdHJpbmcoICdodHRwczovL3dvcmRwcmVzcy5vcmcjZnJhZ21lbnQ/cXVlcnk9ZmFsc2Umc2VhcmNoPWhlbGxvJyApOyAvLyAncXVlcnk9ZmFsc2Umc2VhcmNoPWhlbGxvJ1xuICogYGBgXG4gKlxuICogQHJldHVybiB7P3N0cmluZ30gVGhlIHF1ZXJ5IHN0cmluZyBwYXJ0IG9mIHRoZSBVUkwuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFF1ZXJ5U3RyaW5nKHVybCkge1xuICB2YXIgbWF0Y2hlcyA9IC9eXFxTKz9cXD8oW15cXHMjXSspLy5leGVjKHVybCk7XG5cbiAgaWYgKG1hdGNoZXMpIHtcbiAgICByZXR1cm4gbWF0Y2hlc1sxXTtcbiAgfVxufVxuLyoqXG4gKiBDaGVja3MgZm9yIGludmFsaWQgY2hhcmFjdGVycyB3aXRoaW4gdGhlIHByb3ZpZGVkIHF1ZXJ5IHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlTdHJpbmcgVGhlIHF1ZXJ5IHN0cmluZy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIGNvbnN0IGlzVmFsaWQgPSBpc1ZhbGlkUXVlcnlTdHJpbmcoICdxdWVyeT10cnVlJmFub3RoZXI9ZmFsc2UnICk7IC8vIHRydWVcbiAqIGNvbnN0IGlzTm90VmFsaWQgPSBpc1ZhbGlkUXVlcnlTdHJpbmcoICdxdWVyeT10cnVlP2Fub3RoZXI9ZmFsc2UnICk7IC8vIGZhbHNlXG4gKiBgYGBcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBhcmd1bWVudCBjb250YWlucyBhIHZhbGlkIHF1ZXJ5IHN0cmluZy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZFF1ZXJ5U3RyaW5nKHF1ZXJ5U3RyaW5nKSB7XG4gIGlmICghcXVlcnlTdHJpbmcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gL15bXlxccyM/XFwvXSskLy50ZXN0KHF1ZXJ5U3RyaW5nKTtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgZnJhZ21lbnQgcGFydCBvZiB0aGUgVVJMLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGZ1bGwgVVJMXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBjb25zdCBmcmFnbWVudDEgPSBnZXRGcmFnbWVudCggJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC90aGlzL2lzL2EvdGVzdD9xdWVyeT10cnVlI2ZyYWdtZW50JyApOyAvLyAnI2ZyYWdtZW50J1xuICogY29uc3QgZnJhZ21lbnQyID0gZ2V0RnJhZ21lbnQoICdodHRwczovL3dvcmRwcmVzcy5vcmcjYW5vdGhlci1mcmFnbWVudD9xdWVyeT10cnVlJyApOyAvLyAnI2Fub3RoZXItZnJhZ21lbnQnXG4gKiBgYGBcbiAqXG4gKiBAcmV0dXJuIHs/c3RyaW5nfSBUaGUgZnJhZ21lbnQgcGFydCBvZiB0aGUgVVJMLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGcmFnbWVudCh1cmwpIHtcbiAgdmFyIG1hdGNoZXMgPSAvXlxcUys/KCNbXlxcc1xcP10qKS8uZXhlYyh1cmwpO1xuXG4gIGlmIChtYXRjaGVzKSB7XG4gICAgcmV0dXJuIG1hdGNoZXNbMV07XG4gIH1cbn1cbi8qKlxuICogQ2hlY2tzIGZvciBpbnZhbGlkIGNoYXJhY3RlcnMgd2l0aGluIHRoZSBwcm92aWRlZCBmcmFnbWVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZnJhZ21lbnQgVGhlIHVybCBmcmFnbWVudC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIGNvbnN0IGlzVmFsaWQgPSBpc1ZhbGlkRnJhZ21lbnQoICcjdmFsaWQtZnJhZ21lbnQnICk7IC8vIHRydWVcbiAqIGNvbnN0IGlzTm90VmFsaWQgPSBpc1ZhbGlkRnJhZ21lbnQoICcjaW52YWxpZC0jZnJhZ21lbnQnICk7IC8vIGZhbHNlXG4gKiBgYGBcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBhcmd1bWVudCBjb250YWlucyBhIHZhbGlkIGZyYWdtZW50LlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkRnJhZ21lbnQoZnJhZ21lbnQpIHtcbiAgaWYgKCFmcmFnbWVudCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiAvXiNbXlxccyM/XFwvXSokLy50ZXN0KGZyYWdtZW50KTtcbn1cbi8qKlxuICogQXBwZW5kcyBhcmd1bWVudHMgYXMgcXVlcnlzdHJpbmcgdG8gdGhlIHByb3ZpZGVkIFVSTC4gSWYgdGhlIFVSTCBhbHJlYWR5XG4gKiBpbmNsdWRlcyBxdWVyeSBhcmd1bWVudHMsIHRoZSBhcmd1bWVudHMgYXJlIG1lcmdlZCB3aXRoIChhbmQgdGFrZSBwcmVjZWRlbnRcbiAqIG92ZXIpIHRoZSBleGlzdGluZyBzZXQuXG4gKlxuICogQHBhcmFtIHs/c3RyaW5nfSB1cmwgIFVSTCB0byB3aGljaCBhcmd1bWVudHMgc2hvdWxkIGJlIGFwcGVuZGVkLiBJZiBvbWl0dGVkLFxuICogICAgICAgICAgICAgICAgICAgICAgIG9ubHkgdGhlIHJlc3VsdGluZyBxdWVyeXN0cmluZyBpcyByZXR1cm5lZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSAgYXJncyBRdWVyeSBhcmd1bWVudHMgdG8gYXBwbHkgdG8gVVJMLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogY29uc3QgbmV3VVJMID0gYWRkUXVlcnlBcmdzKCAnaHR0cHM6Ly9nb29nbGUuY29tJywgeyBxOiAndGVzdCcgfSApOyAvLyBodHRwczovL2dvb2dsZS5jb20vP3E9dGVzdFxuICogYGBgXG4gKlxuICogQHJldHVybiB7c3RyaW5nfSBVUkwgd2l0aCBhcmd1bWVudHMgYXBwbGllZC5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkUXVlcnlBcmdzKCkge1xuICB2YXIgdXJsID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnJztcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcblxuICAvLyBJZiBubyBhcmd1bWVudHMgYXJlIHRvIGJlIGFwcGVuZGVkLCByZXR1cm4gb3JpZ2luYWwgVVJMLlxuICBpZiAoIWFyZ3MgfHwgIU9iamVjdC5rZXlzKGFyZ3MpLmxlbmd0aCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IHVybDsgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgVVJMIGFscmVhZHkgaGFkIHF1ZXJ5IGFyZ3VtZW50cy5cblxuICB2YXIgcXVlcnlTdHJpbmdJbmRleCA9IHVybC5pbmRleE9mKCc/Jyk7XG5cbiAgaWYgKHF1ZXJ5U3RyaW5nSW5kZXggIT09IC0xKSB7XG4gICAgLy8gTWVyZ2UgaW50byBleGlzdGluZyBxdWVyeSBhcmd1bWVudHMuXG4gICAgYXJncyA9IE9iamVjdC5hc3NpZ24ocGFyc2UodXJsLnN1YnN0cihxdWVyeVN0cmluZ0luZGV4ICsgMSkpLCBhcmdzKTsgLy8gQ2hhbmdlIHdvcmtpbmcgYmFzZSBVUkwgdG8gb21pdCBwcmV2aW91cyBxdWVyeSBhcmd1bWVudHMuXG5cbiAgICBiYXNlVXJsID0gYmFzZVVybC5zdWJzdHIoMCwgcXVlcnlTdHJpbmdJbmRleCk7XG4gIH1cblxuICByZXR1cm4gYmFzZVVybCArICc/JyArIHN0cmluZ2lmeShhcmdzKTtcbn1cbi8qKlxuICogUmV0dXJucyBhIHNpbmdsZSBxdWVyeSBhcmd1bWVudCBvZiB0aGUgdXJsXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcmcgUXVlcnkgYXJnIG5hbWVcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIGNvbnN0IGZvbyA9IGdldFF1ZXJ5QXJnKCAnaHR0cHM6Ly93b3JkcHJlc3Mub3JnP2Zvbz1iYXImYmFyPWJheicsICdmb28nICk7IC8vIGJhclxuICogYGBgXG4gKlxuICogQHJldHVybiB7QXJyYXl8c3RyaW5nfSBRdWVyeSBhcmcgdmFsdWUuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFF1ZXJ5QXJnKHVybCwgYXJnKSB7XG4gIHZhciBxdWVyeVN0cmluZ0luZGV4ID0gdXJsLmluZGV4T2YoJz8nKTtcbiAgdmFyIHF1ZXJ5ID0gcXVlcnlTdHJpbmdJbmRleCAhPT0gLTEgPyBwYXJzZSh1cmwuc3Vic3RyKHF1ZXJ5U3RyaW5nSW5kZXggKyAxKSkgOiB7fTtcbiAgcmV0dXJuIHF1ZXJ5W2FyZ107XG59XG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgVVJMIGNvbnRhaW5zIGEgZ2l2ZW4gcXVlcnkgYXJnLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gYXJnIFF1ZXJ5IGFyZyBuYW1lXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBjb25zdCBoYXNCYXIgPSBoYXNRdWVyeUFyZyggJ2h0dHBzOi8vd29yZHByZXNzLm9yZz9mb289YmFyJmJhcj1iYXonLCAnYmFyJyApOyAvLyB0cnVlXG4gKiBgYGBcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgVVJMIGNvbnRhaW5zIHRoZSBxdWVyeSBhcmcuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1F1ZXJ5QXJnKHVybCwgYXJnKSB7XG4gIHJldHVybiBnZXRRdWVyeUFyZyh1cmwsIGFyZykgIT09IHVuZGVmaW5lZDtcbn1cbi8qKlxuICogUmVtb3ZlcyBhcmd1bWVudHMgZnJvbSB0aGUgcXVlcnkgc3RyaW5nIG9mIHRoZSB1cmxcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsICBVUkxcbiAqIEBwYXJhbSB7Li4uc3RyaW5nfSBhcmdzIFF1ZXJ5IEFyZ3NcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIGNvbnN0IG5ld1VybCA9IHJlbW92ZVF1ZXJ5QXJncyggJ2h0dHBzOi8vd29yZHByZXNzLm9yZz9mb289YmFyJmJhcj1iYXomYmF6PWZvb2JhcicsICdmb28nLCAnYmFyJyApOyAvLyBodHRwczovL3dvcmRwcmVzcy5vcmc/YmF6PWZvb2JhclxuICogYGBgXG4gKlxuICogQHJldHVybiB7c3RyaW5nfSBVcGRhdGVkIFVSTFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVRdWVyeUFyZ3ModXJsKSB7XG4gIHZhciBxdWVyeVN0cmluZ0luZGV4ID0gdXJsLmluZGV4T2YoJz8nKTtcbiAgdmFyIHF1ZXJ5ID0gcXVlcnlTdHJpbmdJbmRleCAhPT0gLTEgPyBwYXJzZSh1cmwuc3Vic3RyKHF1ZXJ5U3RyaW5nSW5kZXggKyAxKSkgOiB7fTtcbiAgdmFyIGJhc2VVcmwgPSBxdWVyeVN0cmluZ0luZGV4ICE9PSAtMSA/IHVybC5zdWJzdHIoMCwgcXVlcnlTdHJpbmdJbmRleCkgOiB1cmw7XG5cbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4gZGVsZXRlIHF1ZXJ5W2FyZ107XG4gIH0pO1xuICByZXR1cm4gYmFzZVVybCArICc/JyArIHN0cmluZ2lmeShxdWVyeSk7XG59XG4vKipcbiAqIFByZXBlbmRzIFwiaHR0cDovL1wiIHRvIGEgdXJsLCBpZiBpdCBsb29rcyBsaWtlIHNvbWV0aGluZyB0aGF0IGlzIG1lYW50IHRvIGJlIGEgVExELlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogY29uc3QgYWN0dWFsVVJMID0gcHJlcGVuZEhUVFAoICd3b3JkcHJlc3Mub3JnJyApOyAvLyBodHRwOi8vd29yZHByZXNzLm9yZ1xuICogYGBgXG4gKlxuICogQHJldHVybiB7c3RyaW5nfSAgICAgVGhlIHVwZGF0ZWQgVVJMXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHByZXBlbmRIVFRQKHVybCkge1xuICBpZiAoIVVTQUJMRV9IUkVGX1JFR0VYUC50ZXN0KHVybCkgJiYgIUVNQUlMX1JFR0VYUC50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gJ2h0dHA6Ly8nICsgdXJsO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cbi8qKlxuICogU2FmZWx5IGRlY29kZXMgYSBVUkkgd2l0aCBgZGVjb2RlVVJJYC4gUmV0dXJucyB0aGUgVVJJIHVubW9kaWZpZWQgaWZcbiAqIGBkZWNvZGVVUklgIHRocm93cyBhbiBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJpIFVSSSB0byBkZWNvZGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBjb25zdCBiYWRVcmkgPSBzYWZlRGVjb2RlVVJJKCAnJXonICk7IC8vIGRvZXMgbm90IHRocm93IGFuIEVycm9yLCBzaW1wbHkgcmV0dXJucyAnJXonXG4gKiBgYGBcbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IERlY29kZWQgVVJJIGlmIHBvc3NpYmxlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlRGVjb2RlVVJJKHVyaSkge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUkkodXJpKTtcbiAgfSBjYXRjaCAodXJpRXJyb3IpIHtcbiAgICByZXR1cm4gdXJpO1xuICB9XG59XG4vKipcbiAqIFJldHVybnMgYSBVUkwgZm9yIGRpc3BsYXkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBPcmlnaW5hbCBVUkwuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBjb25zdCBkaXNwbGF5VXJsID0gZmlsdGVyVVJMRm9yRGlzcGxheSggJ2h0dHBzOi8vd3d3LndvcmRwcmVzcy5vcmcvZ3V0ZW5iZXJnLycgKTsgLy8gd29yZHByZXNzLm9yZy9ndXRlbmJlcmdcbiAqIGBgYFxuICpcbiAqIEByZXR1cm4ge3N0cmluZ30gRGlzcGxheWVkIFVSTC5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyVVJMRm9yRGlzcGxheSh1cmwpIHtcbiAgLy8gUmVtb3ZlIHByb3RvY29sIGFuZCB3d3cgcHJlZml4ZXMuXG4gIHZhciBmaWx0ZXJlZFVSTCA9IHVybC5yZXBsYWNlKC9eKD86aHR0cHM/OilcXC9cXC8oPzp3d3dcXC4pPy8sICcnKTsgLy8gRW5kcyB3aXRoIC8gYW5kIG9ubHkgaGFzIHRoYXQgc2luZ2xlIHNsYXNoLCBzdHJpcCBpdC5cblxuICBpZiAoZmlsdGVyZWRVUkwubWF0Y2goL15bXlxcL10rXFwvJC8pKSB7XG4gICAgcmV0dXJuIGZpbHRlcmVkVVJMLnJlcGxhY2UoJy8nLCAnJyk7XG4gIH1cblxuICByZXR1cm4gZmlsdGVyZWRVUkw7XG59XG4vKipcbiAqIFNhZmVseSBkZWNvZGVzIGEgVVJJIGNvbXBvbmVudCB3aXRoIGBkZWNvZGVVUklDb21wb25lbnRgLiBSZXR1cm5zIHRoZSBVUkkgY29tcG9uZW50IHVubW9kaWZpZWQgaWZcbiAqIGBkZWNvZGVVUklDb21wb25lbnRgIHRocm93cyBhbiBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJpQ29tcG9uZW50IFVSSSBjb21wb25lbnQgdG8gZGVjb2RlLlxuICpcbiAqIEByZXR1cm4ge3N0cmluZ30gRGVjb2RlZCBVUkkgY29tcG9uZW50IGlmIHBvc3NpYmxlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzYWZlRGVjb2RlVVJJQ29tcG9uZW50KHVyaUNvbXBvbmVudCkge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodXJpQ29tcG9uZW50KTtcbiAgfSBjYXRjaCAodXJpQ29tcG9uZW50RXJyb3IpIHtcbiAgICByZXR1cm4gdXJpQ29tcG9uZW50O1xuICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lbWl6ZSggZm4sIG9wdGlvbnMgKSB7XG5cdHZhciBzaXplID0gMCxcblx0XHRtYXhTaXplLCBoZWFkLCB0YWlsO1xuXG5cdGlmICggb3B0aW9ucyAmJiBvcHRpb25zLm1heFNpemUgKSB7XG5cdFx0bWF4U2l6ZSA9IG9wdGlvbnMubWF4U2l6ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIG1lbW9pemVkKCAvKiAuLi5hcmdzICovICkge1xuXHRcdHZhciBub2RlID0gaGVhZCxcblx0XHRcdGxlbiA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0XHRhcmdzLCBpO1xuXG5cdFx0c2VhcmNoQ2FjaGU6IHdoaWxlICggbm9kZSApIHtcblx0XHRcdC8vIFBlcmZvcm0gYSBzaGFsbG93IGVxdWFsaXR5IHRlc3QgdG8gY29uZmlybSB0aGF0IHdoZXRoZXIgdGhlIG5vZGVcblx0XHRcdC8vIHVuZGVyIHRlc3QgaXMgYSBjYW5kaWRhdGUgZm9yIHRoZSBhcmd1bWVudHMgcGFzc2VkLiBUd28gYXJyYXlzXG5cdFx0XHQvLyBhcmUgc2hhbGxvd2x5IGVxdWFsIGlmIHRoZWlyIGxlbmd0aCBtYXRjaGVzIGFuZCBlYWNoIGVudHJ5IGlzXG5cdFx0XHQvLyBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuIHRoZSB0d28gc2V0cy4gQXZvaWQgYWJzdHJhY3RpbmcgdG8gYVxuXHRcdFx0Ly8gZnVuY3Rpb24gd2hpY2ggY291bGQgaW5jdXIgYW4gYXJndW1lbnRzIGxlYWtpbmcgZGVvcHRpbWl6YXRpb24uXG5cblx0XHRcdC8vIENoZWNrIHdoZXRoZXIgbm9kZSBhcmd1bWVudHMgbWF0Y2ggYXJndW1lbnRzIGxlbmd0aFxuXHRcdFx0aWYgKCBub2RlLmFyZ3MubGVuZ3RoICE9PSBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgd2hldGhlciBub2RlIGFyZ3VtZW50cyBtYXRjaCBhcmd1bWVudHMgdmFsdWVzXG5cdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRpZiAoIG5vZGUuYXJnc1sgaSBdICE9PSBhcmd1bWVudHNbIGkgXSApIHtcblx0XHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRcdGNvbnRpbnVlIHNlYXJjaENhY2hlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQgd2UgY2FuIGFzc3VtZSB3ZSd2ZSBmb3VuZCBhIG1hdGNoXG5cblx0XHRcdC8vIFN1cmZhY2UgbWF0Y2hlZCBub2RlIHRvIGhlYWQgaWYgbm90IGFscmVhZHlcblx0XHRcdGlmICggbm9kZSAhPT0gaGVhZCApIHtcblx0XHRcdFx0Ly8gQXMgdGFpbCwgc2hpZnQgdG8gcHJldmlvdXMuIE11c3Qgb25seSBzaGlmdCBpZiBub3QgYWxzb1xuXHRcdFx0XHQvLyBoZWFkLCBzaW5jZSBpZiBib3RoIGhlYWQgYW5kIHRhaWwsIHRoZXJlIGlzIG5vIHByZXZpb3VzLlxuXHRcdFx0XHRpZiAoIG5vZGUgPT09IHRhaWwgKSB7XG5cdFx0XHRcdFx0dGFpbCA9IG5vZGUucHJldjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkanVzdCBzaWJsaW5ncyB0byBwb2ludCB0byBlYWNoIG90aGVyLiBJZiBub2RlIHdhcyB0YWlsLFxuXHRcdFx0XHQvLyB0aGlzIGFsc28gaGFuZGxlcyBuZXcgdGFpbCdzIGVtcHR5IGBuZXh0YCBhc3NpZ25tZW50LlxuXHRcdFx0XHRub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcblx0XHRcdFx0aWYgKCBub2RlLm5leHQgKSB7XG5cdFx0XHRcdFx0bm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRub2RlLm5leHQgPSBoZWFkO1xuXHRcdFx0XHRub2RlLnByZXYgPSBudWxsO1xuXHRcdFx0XHRoZWFkLnByZXYgPSBub2RlO1xuXHRcdFx0XHRoZWFkID0gbm9kZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV0dXJuIGltbWVkaWF0ZWx5XG5cdFx0XHRyZXR1cm4gbm9kZS52YWw7XG5cdFx0fVxuXG5cdFx0Ly8gTm8gY2FjaGVkIHZhbHVlIGZvdW5kLiBDb250aW51ZSB0byBpbnNlcnRpb24gcGhhc2U6XG5cblx0XHQvLyBDcmVhdGUgYSBjb3B5IG9mIGFyZ3VtZW50cyAoYXZvaWQgbGVha2luZyBkZW9wdGltaXphdGlvbilcblx0XHRhcmdzID0gbmV3IEFycmF5KCBsZW4gKTtcblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0YXJnc1sgaSBdID0gYXJndW1lbnRzWyBpIF07XG5cdFx0fVxuXG5cdFx0bm9kZSA9IHtcblx0XHRcdGFyZ3M6IGFyZ3MsXG5cblx0XHRcdC8vIEdlbmVyYXRlIHRoZSByZXN1bHQgZnJvbSBvcmlnaW5hbCBmdW5jdGlvblxuXHRcdFx0dmFsOiBmbi5hcHBseSggbnVsbCwgYXJncyApXG5cdFx0fTtcblxuXHRcdC8vIERvbid0IG5lZWQgdG8gY2hlY2sgd2hldGhlciBub2RlIGlzIGFscmVhZHkgaGVhZCwgc2luY2UgaXQgd291bGRcblx0XHQvLyBoYXZlIGJlZW4gcmV0dXJuZWQgYWJvdmUgYWxyZWFkeSBpZiBpdCB3YXNcblxuXHRcdC8vIFNoaWZ0IGV4aXN0aW5nIGhlYWQgZG93biBsaXN0XG5cdFx0aWYgKCBoZWFkICkge1xuXHRcdFx0aGVhZC5wcmV2ID0gbm9kZTtcblx0XHRcdG5vZGUubmV4dCA9IGhlYWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIElmIG5vIGhlYWQsIGZvbGxvd3MgdGhhdCB0aGVyZSdzIG5vIHRhaWwgKGF0IGluaXRpYWwgb3IgcmVzZXQpXG5cdFx0XHR0YWlsID0gbm9kZTtcblx0XHR9XG5cblx0XHQvLyBUcmltIHRhaWwgaWYgd2UncmUgcmVhY2hlZCBtYXggc2l6ZSBhbmQgYXJlIHBlbmRpbmcgY2FjaGUgaW5zZXJ0aW9uXG5cdFx0aWYgKCBzaXplID09PSBtYXhTaXplICkge1xuXHRcdFx0dGFpbCA9IHRhaWwucHJldjtcblx0XHRcdHRhaWwubmV4dCA9IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNpemUrKztcblx0XHR9XG5cblx0XHRoZWFkID0gbm9kZTtcblxuXHRcdHJldHVybiBub2RlLnZhbDtcblx0fVxuXG5cdG1lbW9pemVkLmNsZWFyID0gZnVuY3Rpb24oKSB7XG5cdFx0aGVhZCA9IG51bGw7XG5cdFx0dGFpbCA9IG51bGw7XG5cdFx0c2l6ZSA9IDA7XG5cdH07XG5cblx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnICkge1xuXHRcdC8vIENhY2hlIGlzIG5vdCBleHBvc2VkIGluIHRoZSBwdWJsaWMgQVBJLCBidXQgdXNlZCBpbiB0ZXN0cyB0byBlbnN1cmVcblx0XHQvLyBleHBlY3RlZCBsaXN0IHByb2dyZXNzaW9uXG5cdFx0bWVtb2l6ZWQuZ2V0Q2FjaGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBbIGhlYWQsIHRhaWwsIHNpemUgXTtcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIG1lbW9pemVkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgcGVyY2VudFR3ZW50aWVzID0gLyUyMC9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnZGVmYXVsdCc6ICdSRkMzOTg2JyxcbiAgICBmb3JtYXR0ZXJzOiB7XG4gICAgICAgIFJGQzE3Mzg6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2UuY2FsbCh2YWx1ZSwgcGVyY2VudFR3ZW50aWVzLCAnKycpO1xuICAgICAgICB9LFxuICAgICAgICBSRkMzOTg2OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUkZDMTczODogJ1JGQzE3MzgnLFxuICAgIFJGQzM5ODY6ICdSRkMzOTg2J1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG52YXIgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmb3JtYXRzOiBmb3JtYXRzLFxuICAgIHBhcnNlOiBwYXJzZSxcbiAgICBzdHJpbmdpZnk6IHN0cmluZ2lmeVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgYWxsb3dQcm90b3R5cGVzOiBmYWxzZSxcbiAgICBhcnJheUxpbWl0OiAyMCxcbiAgICBkZWNvZGVyOiB1dGlscy5kZWNvZGUsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZGVwdGg6IDUsXG4gICAgcGFyYW1ldGVyTGltaXQ6IDEwMDAsXG4gICAgcGxhaW5PYmplY3RzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgcGFyc2VWYWx1ZXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nVmFsdWVzKHN0ciwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSB7fTtcbiAgICB2YXIgY2xlYW5TdHIgPSBvcHRpb25zLmlnbm9yZVF1ZXJ5UHJlZml4ID8gc3RyLnJlcGxhY2UoL15cXD8vLCAnJykgOiBzdHI7XG4gICAgdmFyIGxpbWl0ID0gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBvcHRpb25zLnBhcmFtZXRlckxpbWl0O1xuICAgIHZhciBwYXJ0cyA9IGNsZWFuU3RyLnNwbGl0KG9wdGlvbnMuZGVsaW1pdGVyLCBsaW1pdCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaV07XG5cbiAgICAgICAgdmFyIGJyYWNrZXRFcXVhbHNQb3MgPSBwYXJ0LmluZGV4T2YoJ109Jyk7XG4gICAgICAgIHZhciBwb3MgPSBicmFja2V0RXF1YWxzUG9zID09PSAtMSA/IHBhcnQuaW5kZXhPZignPScpIDogYnJhY2tldEVxdWFsc1BvcyArIDE7XG5cbiAgICAgICAgdmFyIGtleSwgdmFsO1xuICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQsIGRlZmF1bHRzLmRlY29kZXIpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPyBudWxsIDogJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZSgwLCBwb3MpLCBkZWZhdWx0cy5kZWNvZGVyKTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LnNsaWNlKHBvcyArIDEpLCBkZWZhdWx0cy5kZWNvZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IFtdLmNvbmNhdChvYmpba2V5XSkuY29uY2F0KHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgcGFyc2VPYmplY3QgPSBmdW5jdGlvbiAoY2hhaW4sIHZhbCwgb3B0aW9ucykge1xuICAgIHZhciBsZWFmID0gdmFsO1xuXG4gICAgZm9yICh2YXIgaSA9IGNoYWluLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBvYmo7XG4gICAgICAgIHZhciByb290ID0gY2hhaW5baV07XG5cbiAgICAgICAgaWYgKHJvb3QgPT09ICdbXScpIHtcbiAgICAgICAgICAgIG9iaiA9IFtdO1xuICAgICAgICAgICAgb2JqID0gb2JqLmNvbmNhdChsZWFmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgICAgICAgICAgdmFyIGNsZWFuUm9vdCA9IHJvb3QuY2hhckF0KDApID09PSAnWycgJiYgcm9vdC5jaGFyQXQocm9vdC5sZW5ndGggLSAxKSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCAtMSkgOiByb290O1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoY2xlYW5Sb290LCAxMCk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIWlzTmFOKGluZGV4KVxuICAgICAgICAgICAgICAgICYmIHJvb3QgIT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIFN0cmluZyhpbmRleCkgPT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIGluZGV4ID49IDBcbiAgICAgICAgICAgICAgICAmJiAob3B0aW9ucy5wYXJzZUFycmF5cyAmJiBpbmRleCA8PSBvcHRpb25zLmFycmF5TGltaXQpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgICAgICBvYmpbaW5kZXhdID0gbGVhZjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2NsZWFuUm9vdF0gPSBsZWFmO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGVhZiA9IG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVhZjtcbn07XG5cbnZhciBwYXJzZUtleXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nS2V5cyhnaXZlbktleSwgdmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKCFnaXZlbktleSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmb3JtIGRvdCBub3RhdGlvbiB0byBicmFja2V0IG5vdGF0aW9uXG4gICAgdmFyIGtleSA9IG9wdGlvbnMuYWxsb3dEb3RzID8gZ2l2ZW5LZXkucmVwbGFjZSgvXFwuKFteLltdKykvZywgJ1skMV0nKSA6IGdpdmVuS2V5O1xuXG4gICAgLy8gVGhlIHJlZ2V4IGNodW5rc1xuXG4gICAgdmFyIGJyYWNrZXRzID0gLyhcXFtbXltcXF1dKl0pLztcbiAgICB2YXIgY2hpbGQgPSAvKFxcW1teW1xcXV0qXSkvZztcblxuICAgIC8vIEdldCB0aGUgcGFyZW50XG5cbiAgICB2YXIgc2VnbWVudCA9IGJyYWNrZXRzLmV4ZWMoa2V5KTtcbiAgICB2YXIgcGFyZW50ID0gc2VnbWVudCA/IGtleS5zbGljZSgwLCBzZWdtZW50LmluZGV4KSA6IGtleTtcblxuICAgIC8vIFN0YXNoIHRoZSBwYXJlbnQgaWYgaXQgZXhpc3RzXG5cbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlbid0IHVzaW5nIHBsYWluIG9iamVjdHMsIG9wdGlvbmFsbHkgcHJlZml4IGtleXNcbiAgICAgICAgLy8gdGhhdCB3b3VsZCBvdmVyd3JpdGUgb2JqZWN0IHByb3RvdHlwZSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgcGFyZW50KSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMucHVzaChwYXJlbnQpO1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBjaGlsZHJlbiBhcHBlbmRpbmcgdG8gdGhlIGFycmF5IHVudGlsIHdlIGhpdCBkZXB0aFxuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlICgoc2VnbWVudCA9IGNoaWxkLmV4ZWMoa2V5KSkgIT09IG51bGwgJiYgaSA8IG9wdGlvbnMuZGVwdGgpIHtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNlZ21lbnRbMV0uc2xpY2UoMSwgLTEpKSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG4gICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlT2JqZWN0KGtleXMsIHZhbCwgb3B0aW9ucyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIsIG9wdHMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IG9wdHMgPyB1dGlscy5hc3NpZ24oe30sIG9wdHMpIDoge307XG5cbiAgICBpZiAob3B0aW9ucy5kZWNvZGVyICE9PSBudWxsICYmIG9wdGlvbnMuZGVjb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRpb25zLmRlY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRGVjb2RlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBvcHRpb25zLmlnbm9yZVF1ZXJ5UHJlZml4ID0gb3B0aW9ucy5pZ25vcmVRdWVyeVByZWZpeCA9PT0gdHJ1ZTtcbiAgICBvcHRpb25zLmRlbGltaXRlciA9IHR5cGVvZiBvcHRpb25zLmRlbGltaXRlciA9PT0gJ3N0cmluZycgfHwgdXRpbHMuaXNSZWdFeHAob3B0aW9ucy5kZWxpbWl0ZXIpID8gb3B0aW9ucy5kZWxpbWl0ZXIgOiBkZWZhdWx0cy5kZWxpbWl0ZXI7XG4gICAgb3B0aW9ucy5kZXB0aCA9IHR5cGVvZiBvcHRpb25zLmRlcHRoID09PSAnbnVtYmVyJyA/IG9wdGlvbnMuZGVwdGggOiBkZWZhdWx0cy5kZXB0aDtcbiAgICBvcHRpb25zLmFycmF5TGltaXQgPSB0eXBlb2Ygb3B0aW9ucy5hcnJheUxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdGlvbnMuYXJyYXlMaW1pdCA6IGRlZmF1bHRzLmFycmF5TGltaXQ7XG4gICAgb3B0aW9ucy5wYXJzZUFycmF5cyA9IG9wdGlvbnMucGFyc2VBcnJheXMgIT09IGZhbHNlO1xuICAgIG9wdGlvbnMuZGVjb2RlciA9IHR5cGVvZiBvcHRpb25zLmRlY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLmRlY29kZXIgOiBkZWZhdWx0cy5kZWNvZGVyO1xuICAgIG9wdGlvbnMuYWxsb3dEb3RzID0gdHlwZW9mIG9wdGlvbnMuYWxsb3dEb3RzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmFsbG93RG90cyA6IGRlZmF1bHRzLmFsbG93RG90cztcbiAgICBvcHRpb25zLnBsYWluT2JqZWN0cyA9IHR5cGVvZiBvcHRpb25zLnBsYWluT2JqZWN0cyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5wbGFpbk9iamVjdHMgOiBkZWZhdWx0cy5wbGFpbk9iamVjdHM7XG4gICAgb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMgPSB0eXBlb2Ygb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzIDogZGVmYXVsdHMuYWxsb3dQcm90b3R5cGVzO1xuICAgIG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPSB0eXBlb2Ygb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRpb25zLnBhcmFtZXRlckxpbWl0IDogZGVmYXVsdHMucGFyYW1ldGVyTGltaXQ7XG4gICAgb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPSB0eXBlb2Ygb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nO1xuXG4gICAgaWYgKHN0ciA9PT0gJycgfHwgc3RyID09PSBudWxsIHx8IHR5cGVvZiBzdHIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcE9iaiA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gcGFyc2VWYWx1ZXMoc3RyLCBvcHRpb25zKSA6IHN0cjtcbiAgICB2YXIgb2JqID0gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGtleXMgYW5kIHNldHVwIHRoZSBuZXcgb2JqZWN0XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRlbXBPYmopO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIG5ld09iaiA9IHBhcnNlS2V5cyhrZXksIHRlbXBPYmpba2V5XSwgb3B0aW9ucyk7XG4gICAgICAgIG9iaiA9IHV0aWxzLm1lcmdlKG9iaiwgbmV3T2JqLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXRpbHMuY29tcGFjdChvYmopO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxudmFyIGFycmF5UHJlZml4R2VuZXJhdG9ycyA9IHtcbiAgICBicmFja2V0czogZnVuY3Rpb24gYnJhY2tldHMocHJlZml4KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnW10nO1xuICAgIH0sXG4gICAgaW5kaWNlczogZnVuY3Rpb24gaW5kaWNlcyhwcmVmaXgsIGtleSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1snICsga2V5ICsgJ10nO1xuICAgIH0sXG4gICAgcmVwZWF0OiBmdW5jdGlvbiByZXBlYXQocHJlZml4KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgfVxufTtcblxudmFyIHRvSVNPID0gRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmc7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBlbmNvZGU6IHRydWUsXG4gICAgZW5jb2RlcjogdXRpbHMuZW5jb2RlLFxuICAgIGVuY29kZVZhbHVlc09ubHk6IGZhbHNlLFxuICAgIHNlcmlhbGl6ZURhdGU6IGZ1bmN0aW9uIHNlcmlhbGl6ZURhdGUoZGF0ZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gdG9JU08uY2FsbChkYXRlKTtcbiAgICB9LFxuICAgIHNraXBOdWxsczogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIHN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeSggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICBvYmplY3QsXG4gICAgcHJlZml4LFxuICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgIHNraXBOdWxscyxcbiAgICBlbmNvZGVyLFxuICAgIGZpbHRlcixcbiAgICBzb3J0LFxuICAgIGFsbG93RG90cyxcbiAgICBzZXJpYWxpemVEYXRlLFxuICAgIGZvcm1hdHRlcixcbiAgICBlbmNvZGVWYWx1ZXNPbmx5XG4pIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9iaiA9IGZpbHRlcihwcmVmaXgsIG9iaik7XG4gICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIG9iaiA9IHNlcmlhbGl6ZURhdGUob2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoc3RyaWN0TnVsbEhhbmRsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlciAmJiAhZW5jb2RlVmFsdWVzT25seSA/IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyKSA6IHByZWZpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgdXRpbHMuaXNCdWZmZXIob2JqKSkge1xuICAgICAgICBpZiAoZW5jb2Rlcikge1xuICAgICAgICAgICAgdmFyIGtleVZhbHVlID0gZW5jb2RlVmFsdWVzT25seSA/IHByZWZpeCA6IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyKTtcbiAgICAgICAgICAgIHJldHVybiBbZm9ybWF0dGVyKGtleVZhbHVlKSArICc9JyArIGZvcm1hdHRlcihlbmNvZGVyKG9iaiwgZGVmYXVsdHMuZW5jb2RlcikpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihwcmVmaXgpICsgJz0nICsgZm9ybWF0dGVyKFN0cmluZyhvYmopKV07XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgdmFyIG9iaktleXM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgb2JqS2V5cyA9IHNvcnQgPyBrZXlzLnNvcnQoc29ydCkgOiBrZXlzO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAoc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgocHJlZml4LCBrZXkpLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5XG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAgICAgIHByZWZpeCArIChhbGxvd0RvdHMgPyAnLicgKyBrZXkgOiAnWycgKyBrZXkgKyAnXScpLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5XG4gICAgICAgICAgICApKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG9wdHMpIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIHZhciBvcHRpb25zID0gb3B0cyA/IHV0aWxzLmFzc2lnbih7fSwgb3B0cykgOiB7fTtcblxuICAgIGlmIChvcHRpb25zLmVuY29kZXIgIT09IG51bGwgJiYgb3B0aW9ucy5lbmNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdGlvbnMuZW5jb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbmNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBkZWxpbWl0ZXIgPSB0eXBlb2Ygb3B0aW9ucy5kZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuZGVsaW1pdGVyIDogb3B0aW9ucy5kZWxpbWl0ZXI7XG4gICAgdmFyIHN0cmljdE51bGxIYW5kbGluZyA9IHR5cGVvZiBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmc7XG4gICAgdmFyIHNraXBOdWxscyA9IHR5cGVvZiBvcHRpb25zLnNraXBOdWxscyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5za2lwTnVsbHMgOiBkZWZhdWx0cy5za2lwTnVsbHM7XG4gICAgdmFyIGVuY29kZSA9IHR5cGVvZiBvcHRpb25zLmVuY29kZSA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5lbmNvZGUgOiBkZWZhdWx0cy5lbmNvZGU7XG4gICAgdmFyIGVuY29kZXIgPSB0eXBlb2Ygb3B0aW9ucy5lbmNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5lbmNvZGVyIDogZGVmYXVsdHMuZW5jb2RlcjtcbiAgICB2YXIgc29ydCA9IHR5cGVvZiBvcHRpb25zLnNvcnQgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLnNvcnQgOiBudWxsO1xuICAgIHZhciBhbGxvd0RvdHMgPSB0eXBlb2Ygb3B0aW9ucy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZmFsc2UgOiBvcHRpb25zLmFsbG93RG90cztcbiAgICB2YXIgc2VyaWFsaXplRGF0ZSA9IHR5cGVvZiBvcHRpb25zLnNlcmlhbGl6ZURhdGUgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLnNlcmlhbGl6ZURhdGUgOiBkZWZhdWx0cy5zZXJpYWxpemVEYXRlO1xuICAgIHZhciBlbmNvZGVWYWx1ZXNPbmx5ID0gdHlwZW9mIG9wdGlvbnMuZW5jb2RlVmFsdWVzT25seSA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5IDogZGVmYXVsdHMuZW5jb2RlVmFsdWVzT25seTtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZm9ybWF0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBvcHRpb25zLmZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcbiAgICB9IGVsc2UgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZm9ybWF0cy5mb3JtYXR0ZXJzLCBvcHRpb25zLmZvcm1hdCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBmb3JtYXQgb3B0aW9uIHByb3ZpZGVkLicpO1xuICAgIH1cbiAgICB2YXIgZm9ybWF0dGVyID0gZm9ybWF0cy5mb3JtYXR0ZXJzW29wdGlvbnMuZm9ybWF0XTtcbiAgICB2YXIgb2JqS2V5cztcbiAgICB2YXIgZmlsdGVyO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqID0gZmlsdGVyKCcnLCBvYmopO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHZhciBhcnJheUZvcm1hdDtcbiAgICBpZiAob3B0aW9ucy5hcnJheUZvcm1hdCBpbiBhcnJheVByZWZpeEdlbmVyYXRvcnMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRpb25zLmFycmF5Rm9ybWF0O1xuICAgIH0gZWxzZSBpZiAoJ2luZGljZXMnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRpb25zLmluZGljZXMgPyAnaW5kaWNlcycgOiAncmVwZWF0JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheUZvcm1hdCA9ICdpbmRpY2VzJztcbiAgICB9XG5cbiAgICB2YXIgZ2VuZXJhdGVBcnJheVByZWZpeCA9IGFycmF5UHJlZml4R2VuZXJhdG9yc1thcnJheUZvcm1hdF07XG5cbiAgICBpZiAoIW9iaktleXMpIHtcbiAgICAgICAgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgfVxuXG4gICAgaWYgKHNvcnQpIHtcbiAgICAgICAgb2JqS2V5cy5zb3J0KHNvcnQpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAoc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChzdHJpbmdpZnkoXG4gICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICBlbmNvZGUgPyBlbmNvZGVyIDogbnVsbCxcbiAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seVxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICB2YXIgam9pbmVkID0ga2V5cy5qb2luKGRlbGltaXRlcik7XG4gICAgdmFyIHByZWZpeCA9IG9wdGlvbnMuYWRkUXVlcnlQcmVmaXggPT09IHRydWUgPyAnPycgOiAnJztcblxuICAgIHJldHVybiBqb2luZWQubGVuZ3RoID4gMCA/IHByZWZpeCArIGpvaW5lZCA6ICcnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBoZXhUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgICAgICBhcnJheS5wdXNoKCclJyArICgoaSA8IDE2ID8gJzAnIDogJycpICsgaS50b1N0cmluZygxNikpLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheTtcbn0oKSk7XG5cbnZhciBjb21wYWN0UXVldWUgPSBmdW5jdGlvbiBjb21wYWN0UXVldWUocXVldWUpIHtcbiAgICB2YXIgb2JqO1xuXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlLnBvcCgpO1xuICAgICAgICBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhciBjb21wYWN0ZWQgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYmoubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtqXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFjdGVkLnB1c2gob2JqW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0ub2JqW2l0ZW0ucHJvcF0gPSBjb21wYWN0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIGFycmF5VG9PYmplY3QgPSBmdW5jdGlvbiBhcnJheVRvT2JqZWN0KHNvdXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSBvcHRpb25zICYmIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBtZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGxhaW5PYmplY3RzIHx8IG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzIHx8ICFoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3NvdXJjZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFt0YXJnZXQsIHNvdXJjZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gW3RhcmdldF0uY29uY2F0KHNvdXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIG1lcmdlVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgIUFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBtZXJnZVRhcmdldCA9IGFycmF5VG9PYmplY3QodGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKHRhcmdldCwgaSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0W2ldICYmIHR5cGVvZiB0YXJnZXRbaV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IG1lcmdlKHRhcmdldFtpXSwgaXRlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgICAgIGlmIChoYXMuY2FsbChhY2MsIGtleSkpIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gbWVyZ2UoYWNjW2tleV0sIHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBtZXJnZVRhcmdldCk7XG59O1xuXG52YXIgYXNzaWduID0gZnVuY3Rpb24gYXNzaWduU2luZ2xlU291cmNlKHRhcmdldCwgc291cmNlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICBhY2Nba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHRhcmdldCk7XG59O1xuXG52YXIgZGVjb2RlID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufTtcblxudmFyIGVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShzdHIpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gc3RyIDogU3RyaW5nKHN0cik7XG5cbiAgICB2YXIgb3V0ID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjID09PSAweDJEIC8vIC1cbiAgICAgICAgICAgIHx8IGMgPT09IDB4MkUgLy8gLlxuICAgICAgICAgICAgfHwgYyA9PT0gMHg1RiAvLyBfXG4gICAgICAgICAgICB8fCBjID09PSAweDdFIC8vIH5cbiAgICAgICAgICAgIHx8IChjID49IDB4MzAgJiYgYyA8PSAweDM5KSAvLyAwLTlcbiAgICAgICAgICAgIHx8IChjID49IDB4NDEgJiYgYyA8PSAweDVBKSAvLyBhLXpcbiAgICAgICAgICAgIHx8IChjID49IDB4NjEgJiYgYyA8PSAweDdBKSAvLyBBLVpcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBvdXQgKz0gc3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyBoZXhUYWJsZVtjXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4QzAgfCAoYyA+PiA2KV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4RDgwMCB8fCBjID49IDB4RTAwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4RTAgfCAoYyA+PiAxMildICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgYyA9IDB4MTAwMDAgKyAoKChjICYgMHgzRkYpIDw8IDEwKSB8IChzdHJpbmcuY2hhckNvZGVBdChpKSAmIDB4M0ZGKSk7XG4gICAgICAgIG91dCArPSBoZXhUYWJsZVsweEYwIHwgKGMgPj4gMTgpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDEyKSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxudmFyIGNvbXBhY3QgPSBmdW5jdGlvbiBjb21wYWN0KHZhbHVlKSB7XG4gICAgdmFyIHF1ZXVlID0gW3sgb2JqOiB7IG86IHZhbHVlIH0sIHByb3A6ICdvJyB9XTtcbiAgICB2YXIgcmVmcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlW2ldO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbal07XG4gICAgICAgICAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsICYmIHJlZnMuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goeyBvYmo6IG9iaiwgcHJvcDoga2V5IH0pO1xuICAgICAgICAgICAgICAgIHJlZnMucHVzaCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBhY3RRdWV1ZShxdWV1ZSk7XG59O1xuXG52YXIgaXNSZWdFeHAgPSBmdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufTtcblxudmFyIGlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIob2JqKSB7XG4gICAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXJyYXlUb09iamVjdDogYXJyYXlUb09iamVjdCxcbiAgICBhc3NpZ246IGFzc2lnbixcbiAgICBjb21wYWN0OiBjb21wYWN0LFxuICAgIGRlY29kZTogZGVjb2RlLFxuICAgIGVuY29kZTogZW5jb2RlLFxuICAgIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgICBpc1JlZ0V4cDogaXNSZWdFeHAsXG4gICAgbWVyZ2U6IG1lcmdlXG59O1xuIiwiaW1wb3J0IHBsdXJhbEZvcm1zIGZyb20gJ0B0YW5uaW4vcGx1cmFsLWZvcm1zJztcblxuLyoqXG4gKiBUYW5uaW4gY29uc3RydWN0b3Igb3B0aW9ucy5cbiAqXG4gKiBAcHJvcGVydHkgez9zdHJpbmd9ICAgY29udGV4dERlbGltaXRlciBKb2luZXIgaW4gc3RyaW5nIGxvb2t1cCB3aXRoIGNvbnRleHQuXG4gKiBAcHJvcGVydHkgez9GdW5jdGlvbn0gb25NaXNzaW5nS2V5ICAgICBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBrZXkgbWlzc2luZy5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICpcbiAqIEB0eXBlZGVmIHtUYW5uaW5PcHRpb25zfVxuICovXG5cbi8qKlxuICogRGVmYXVsdCBUYW5uaW4gY29uc3RydWN0b3Igb3B0aW9ucy5cbiAqXG4gKiBAdHlwZSB7VGFubmluT3B0aW9uc31cbiAqL1xudmFyIERFRkFVTFRfT1BUSU9OUyA9IHtcblx0Y29udGV4dERlbGltaXRlcjogJ1xcdTAwMDQnLFxuXHRvbk1pc3NpbmdLZXk6IG51bGwsXG59O1xuXG4vKipcbiAqIEdpdmVuIGEgc3BlY2lmaWMgbG9jYWxlIGRhdGEncyBjb25maWcgYHBsdXJhbF9mb3Jtc2AgdmFsdWUsIHJldHVybnMgdGhlXG4gKiBleHByZXNzaW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogYGBgXG4gKiBnZXRQbHVyYWxFeHByZXNzaW9uKCAnbnBsdXJhbHM9MjsgcGx1cmFsPShuICE9IDEpOycgKSA9PT0gJyhuICE9IDEpJ1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBmIExvY2FsZSBkYXRhIHBsdXJhbCBmb3Jtcy5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFBsdXJhbCBmb3JtcyBleHByZXNzaW9uLlxuICovXG5mdW5jdGlvbiBnZXRQbHVyYWxFeHByZXNzaW9uKCBwZiApIHtcblx0dmFyIHBhcnRzLCBpLCBwYXJ0O1xuXG5cdHBhcnRzID0gcGYuc3BsaXQoICc7JyApO1xuXG5cdGZvciAoIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKysgKSB7XG5cdFx0cGFydCA9IHBhcnRzWyBpIF0udHJpbSgpO1xuXHRcdGlmICggcGFydC5pbmRleE9mKCAncGx1cmFsPScgKSA9PT0gMCApIHtcblx0XHRcdHJldHVybiBwYXJ0LnN1YnN0ciggNyApO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFRhbm5pbiBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICAgIGRhdGEgICAgSmVkLWZvcm1hdHRlZCBsb2NhbGUgZGF0YS5cbiAqIEBwYXJhbSB7VGFubmluT3B0aW9uc30gb3B0aW9ucyBUYW5uaW4gb3B0aW9ucy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGFubmluKCBkYXRhLCBvcHRpb25zICkge1xuXHR2YXIga2V5O1xuXG5cdHRoaXMuZGF0YSA9IGRhdGE7XG5cdHRoaXMucGx1cmFsRm9ybXMgPSB7fTtcblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0dGhpcy5vcHRpb25zID0ge307XG5cdGZvciAoIGtleSBpbiBERUZBVUxUX09QVElPTlMgKSB7XG5cdFx0dGhpcy5vcHRpb25zWyBrZXkgXSA9IG9wdGlvbnNbIGtleSBdIHx8IERFRkFVTFRfT1BUSU9OU1sga2V5IF07XG5cdH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwbHVyYWwgZm9ybSBpbmRleCBmb3IgdGhlIGdpdmVuIGRvbWFpbiBhbmQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGRvbWFpbiBEb21haW4gb24gd2hpY2ggdG8gY2FsY3VsYXRlIHBsdXJhbCBmb3JtLlxuICogQHBhcmFtIHtudW1iZXJ9IG4gICAgICBWYWx1ZSBmb3Igd2hpY2ggcGx1cmFsIGZvcm0gaXMgdG8gYmUgY2FsY3VsYXRlZC5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFBsdXJhbCBmb3JtIGluZGV4LlxuICovXG5UYW5uaW4ucHJvdG90eXBlLmdldFBsdXJhbEZvcm0gPSBmdW5jdGlvbiggZG9tYWluLCBuICkge1xuXHR2YXIgZ2V0UGx1cmFsRm9ybSA9IHRoaXMucGx1cmFsRm9ybXNbIGRvbWFpbiBdLFxuXHRcdGNvbmZpZywgcGx1cmFsLCBwZjtcblxuXHRpZiAoICEgZ2V0UGx1cmFsRm9ybSApIHtcblx0XHRjb25maWcgPSB0aGlzLmRhdGFbIGRvbWFpbiBdWyAnJyBdO1xuXG5cdFx0cGYgPSAoXG5cdFx0XHRjb25maWdbICdQbHVyYWwtRm9ybXMnIF0gfHxcblx0XHRcdGNvbmZpZ1sgJ3BsdXJhbC1mb3JtcycgXSB8fFxuXHRcdFx0Y29uZmlnLnBsdXJhbF9mb3Jtc1xuXHRcdCk7XG5cblx0XHRpZiAoIHR5cGVvZiBwZiAhPT0gJ2Z1bmN0aW9uJyApIHtcblx0XHRcdHBsdXJhbCA9IGdldFBsdXJhbEV4cHJlc3Npb24oXG5cdFx0XHRcdGNvbmZpZ1sgJ1BsdXJhbC1Gb3JtcycgXSB8fFxuXHRcdFx0XHRjb25maWdbICdwbHVyYWwtZm9ybXMnIF0gfHxcblx0XHRcdFx0Y29uZmlnLnBsdXJhbF9mb3Jtc1xuXHRcdFx0KTtcblxuXHRcdFx0cGYgPSBwbHVyYWxGb3JtcyggcGx1cmFsICk7XG5cdFx0fVxuXG5cdFx0Z2V0UGx1cmFsRm9ybSA9IHRoaXMucGx1cmFsRm9ybXNbIGRvbWFpbiBdID0gcGY7XG5cdH1cblxuXHRyZXR1cm4gZ2V0UGx1cmFsRm9ybSggbiApO1xufTtcblxuLyoqXG4gKiBUcmFuc2xhdGUgYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGRvbWFpbiAgIFRyYW5zbGF0aW9uIGRvbWFpbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZXh0ICBDb250ZXh0IGRpc3Rpbmd1aXNoaW5nIHRlcm1zIG9mIHRoZSBzYW1lIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2luZ3VsYXIgUHJpbWFyeSBrZXkgZm9yIHRyYW5zbGF0aW9uIGxvb2t1cC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwbHVyYWwgICBGYWxsYmFjayB2YWx1ZSB1c2VkIGZvciBub24temVybyBwbHVyYWwgZm9ybSBpbmRleC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBuICAgICAgICBWYWx1ZSB0byB1c2UgaW4gY2FsY3VsYXRpbmcgcGx1cmFsIGZvcm0uXG4gKlxuICogQHJldHVybiB7c3RyaW5nfSBUcmFuc2xhdGVkIHN0cmluZy5cbiAqL1xuVGFubmluLnByb3RvdHlwZS5kY25wZ2V0dGV4dCA9IGZ1bmN0aW9uKCBkb21haW4sIGNvbnRleHQsIHNpbmd1bGFyLCBwbHVyYWwsIG4gKSB7XG5cdHZhciBpbmRleCwga2V5LCBlbnRyeTtcblxuXHRpZiAoIG4gPT09IHVuZGVmaW5lZCApIHtcblx0XHQvLyBEZWZhdWx0IHRvIHNpbmd1bGFyLlxuXHRcdGluZGV4ID0gMDtcblx0fSBlbHNlIHtcblx0XHQvLyBGaW5kIGluZGV4IGJ5IGV2YWx1YXRpbmcgcGx1cmFsIGZvcm0gZm9yIHZhbHVlLlxuXHRcdGluZGV4ID0gdGhpcy5nZXRQbHVyYWxGb3JtKCBkb21haW4sIG4gKTtcblx0fVxuXG5cdGtleSA9IHNpbmd1bGFyO1xuXG5cdC8vIElmIHByb3ZpZGVkLCBjb250ZXh0IGlzIHByZXBlbmRlZCB0byBrZXkgd2l0aCBkZWxpbWl0ZXIuXG5cdGlmICggY29udGV4dCApIHtcblx0XHRrZXkgPSBjb250ZXh0ICsgdGhpcy5vcHRpb25zLmNvbnRleHREZWxpbWl0ZXIgKyBzaW5ndWxhcjtcblx0fVxuXG5cdGVudHJ5ID0gdGhpcy5kYXRhWyBkb21haW4gXVsga2V5IF07XG5cblx0Ly8gVmVyaWZ5IG5vdCBvbmx5IHRoYXQgZW50cnkgZXhpc3RzLCBidXQgdGhhdCB0aGUgaW50ZW5kZWQgaW5kZXggaXMgd2l0aGluXG5cdC8vIHJhbmdlIGFuZCBub24tZW1wdHkuXG5cdGlmICggZW50cnkgJiYgZW50cnlbIGluZGV4IF0gKSB7XG5cdFx0cmV0dXJuIGVudHJ5WyBpbmRleCBdO1xuXHR9XG5cblx0aWYgKCB0aGlzLm9wdGlvbnMub25NaXNzaW5nS2V5ICkge1xuXHRcdHRoaXMub3B0aW9ucy5vbk1pc3NpbmdLZXkoIHNpbmd1bGFyLCBkb21haW4gKTtcblx0fVxuXG5cdC8vIElmIGVudHJ5IG5vdCBmb3VuZCwgZmFsbCBiYWNrIHRvIHNpbmd1bGFyIHZzLiBwbHVyYWwgd2l0aCB6ZXJvIGluZGV4XG5cdC8vIHJlcHJlc2VudGluZyB0aGUgc2luZ3VsYXIgdmFsdWUuXG5cdHJldHVybiBpbmRleCA9PT0gMCA/IHNpbmd1bGFyIDogcGx1cmFsO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/eejs/currency_config.js":
/*!********************************************!*\
  !*** ./assets/src/eejs/currency_config.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currencyConfig": function() { return /* binding */ currencyConfig; }
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./assets/src/eejs/data.js");

/**
 * Provided via the data passed along by the server.
 * This data a configuration object passed along from the server that indicates
 * the default currency settings from the server.
 *
 * @type {{}}
 */

const {
  currency_config: currencyConfig = {}
} = _data__WEBPACK_IMPORTED_MODULE_0__["default"];

/***/ }),

/***/ "./assets/src/eejs/data.js":
/*!*********************************!*\
  !*** ./assets/src/eejs/data.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * This will hold arbitrary data assigned by the Assets Registry.
 *
 * @type {{}}
 */
const data = eejsdata.data || {};
/* harmony default export */ __webpack_exports__["default"] = (data);

/***/ }),

/***/ "./assets/src/eejs/exceptions/general.js":
/*!***********************************************!*\
  !*** ./assets/src/eejs/exceptions/general.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * General EE Exception
 * Usage: throw new eejs.Exception('some message')
 *
 * @param {string} message
 * @param {...mixed} args
 * @return {Exception} instance
 */
function Exception(message) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  const instance = new Error(message, ...args);
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Exception": function() { return /* reexport safe */ _general__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "InvalidArgument": function() { return /* reexport safe */ _invalid_argument__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   "InvalidDatetime": function() { return /* reexport safe */ _invalid_datetime__WEBPACK_IMPORTED_MODULE_6__["default"]; },
/* harmony export */   "InvalidISO8601String": function() { return /* reexport safe */ _invalid_iso8601_string__WEBPACK_IMPORTED_MODULE_4__["default"]; },
/* harmony export */   "InvalidLocale": function() { return /* reexport safe */ _invalid_locale__WEBPACK_IMPORTED_MODULE_5__["default"]; },
/* harmony export */   "InvalidModelEntity": function() { return /* reexport safe */ _invalid_model_entity__WEBPACK_IMPORTED_MODULE_8__["default"]; },
/* harmony export */   "InvalidSchema": function() { return /* reexport safe */ _invalid_schema__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   "InvalidTimezone": function() { return /* reexport safe */ _invalid_timezone__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   "InvalidType": function() { return /* reexport safe */ _invalid_type__WEBPACK_IMPORTED_MODULE_7__["default"]; }
/* harmony export */ });
/* harmony import */ var _general__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general */ "./assets/src/eejs/exceptions/general.js");
/* harmony import */ var _invalid_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invalid-schema */ "./assets/src/eejs/exceptions/invalid-schema.js");
/* harmony import */ var _invalid_argument__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./invalid-argument */ "./assets/src/eejs/exceptions/invalid-argument.js");
/* harmony import */ var _invalid_timezone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./invalid-timezone */ "./assets/src/eejs/exceptions/invalid-timezone.js");
/* harmony import */ var _invalid_iso8601_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./invalid-iso8601-string */ "./assets/src/eejs/exceptions/invalid-iso8601-string.js");
/* harmony import */ var _invalid_locale__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./invalid-locale */ "./assets/src/eejs/exceptions/invalid-locale.js");
/* harmony import */ var _invalid_datetime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./invalid-datetime */ "./assets/src/eejs/exceptions/invalid-datetime.js");
/* harmony import */ var _invalid_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./invalid-type */ "./assets/src/eejs/exceptions/invalid-type.js");
/* harmony import */ var _invalid_model_entity__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./invalid-model-entity */ "./assets/src/eejs/exceptions/invalid-model-entity.js");










/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-argument.js":
/*!********************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-argument.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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

  const instance = new Error(message, ...args);
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ InvalidDateTime; }
/* harmony export */ });
/* harmony import */ var _invalid_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invalid-type */ "./assets/src/eejs/exceptions/invalid-type.js");
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

class InvalidDateTime extends _invalid_type__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(datetime, message) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    super(message, ...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidDateTime);
    }

    this.message = 'The value provided is not a valid DateTime. ' + this.message;
    this.datetime = datetime || '';
    this.name = 'InvalidDateTime';
  }

}

/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-iso8601-string.js":
/*!**************************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-iso8601-string.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ InvalidISO8601String; }
/* harmony export */ });
/* harmony import */ var _invalid_argument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invalid-argument */ "./assets/src/eejs/exceptions/invalid-argument.js");
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

class InvalidISO8601String extends _invalid_argument__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(dateTimeString) {
    let message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    message = message ? 'The string provided is not a valid ISO 8601 formatted string. ' + message : 'The string provided is not a valid ISO 8601 formatted string.';

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    super(message, dateTimeString, ...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidISO8601String);
    }

    this.dateTimeString = dateTimeString || '';
  }

}

/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-locale.js":
/*!******************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-locale.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ InvalidLocale; }
/* harmony export */ });
/* harmony import */ var _invalid_argument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invalid-argument */ "./assets/src/eejs/exceptions/invalid-argument.js");
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

class InvalidLocale extends _invalid_argument__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(locale) {
    let message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    message = message ? 'The locale string provided (' + JSON.stringify(locale) + ') is not valid. ' + message : 'The locale string provided (' + JSON.stringify(locale) + ') is not valid.';

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    super(message, locale, ...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidLocale);
    }

    this.locale = locale || '';
  }

}

/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-model-entity.js":
/*!************************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-model-entity.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ InvalidModelEntity; }
/* harmony export */ });
/* harmony import */ var _invalid_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invalid-type */ "./assets/src/eejs/exceptions/invalid-type.js");
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

class InvalidModelEntity extends _invalid_type__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidModelEntity);
    }

    this.message = 'Invalid model entity instance provided.' + this.message;
    this.modelEntity = (arguments.length <= 1 ? undefined : arguments[1]) || {};
  }

}

/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-schema.js":
/*!******************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-schema.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ InvalidSchema; }
/* harmony export */ });
/* harmony import */ var _invalid_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invalid-type */ "./assets/src/eejs/exceptions/invalid-type.js");
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

class InvalidSchema extends _invalid_type__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidSchema);
    }

    this.message = 'Invalid schema object provided. Must have a' + ' "properties" property.' + this.message;
    this.schema = (arguments.length <= 1 ? undefined : arguments[1]) || {};
  }

}

/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-timezone.js":
/*!********************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-timezone.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ InvalidTimezone; }
/* harmony export */ });
/* harmony import */ var _invalid_argument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invalid-argument */ "./assets/src/eejs/exceptions/invalid-argument.js");
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

class InvalidTimezone extends _invalid_argument__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(timezone) {
    let message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    message = message ? 'The timezone string provided is not valid. ' + message : 'The timezone string provided is not valid.';

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    super(message, timezone, ...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidTimezone);
    }

    this.timezone = timezone || '';
  }

}

/***/ }),

/***/ "./assets/src/eejs/exceptions/invalid-type.js":
/*!****************************************************!*\
  !*** ./assets/src/eejs/exceptions/invalid-type.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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

  const instance = new TypeError(message, ...args);
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

/***/ "./assets/src/eejs/locale.js":
/*!***********************************!*\
  !*** ./assets/src/eejs/locale.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "locale": function() { return /* binding */ locale; }
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./assets/src/eejs/data.js");

/**
 * Provided via the data passed along by the server.
 * This data is a configuration object passed along from the server that exposes
 * the default locale settings from the server.
 *
 * @type {{}}
 */

const {
  locale = {
    user: 'en',
    site: 'en'
  }
} = _data__WEBPACK_IMPORTED_MODULE_0__["default"];

/***/ }),

/***/ "./assets/src/eejs/middlewares/api-fetch/caps-middleware.js":
/*!******************************************************************!*\
  !*** ./assets/src/eejs/middlewares/api-fetch/caps-middleware.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONTEXT_CAPS_DELETE": function() { return /* binding */ CONTEXT_CAPS_DELETE; },
/* harmony export */   "CONTEXT_CAPS_EDIT": function() { return /* binding */ CONTEXT_CAPS_EDIT; },
/* harmony export */   "CONTEXT_CAPS_READ": function() { return /* binding */ CONTEXT_CAPS_READ; },
/* harmony export */   "CONTEXT_CAPS_READ_ADMIN": function() { return /* binding */ CONTEXT_CAPS_READ_ADMIN; }
/* harmony export */ });
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External dependencies
 */

const CONTEXT_CAPS_READ = 'read';
const CONTEXT_CAPS_READ_ADMIN = 'read_admin';
const CONTEXT_CAPS_EDIT = 'edit';
const CONTEXT_CAPS_DELETE = 'delete';
/**
 * Helper function for whether the path should have the context appended or not.
 *
 * @param {string} pathType apiFetch accepts 'path' or 'url' so we allow for
 * checking that here.
 * @param {Object} options the options object provided to api-fetch
 * @return {boolean} Whether context should be appended or not.
 */

function shouldBeAppended(pathType, options) {
  return typeof options[pathType] === 'string' && (!options.method || options.method === 'GET') && !(0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.hasQueryArg)(options[pathType], 'caps') && /ee\/v4\.8\.36/.exec(options[pathType]) !== null;
}
/**
 * Middleware for the @wordpress/api-fetch library that the given context
 * to the `caps` query arg on every EE GET request.
 *
 * @param { string } context Defaults to 'read'
 * @return {Function} middleware callback
 */


const capsMiddleware = function () {
  let context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CONTEXT_CAPS_READ;
  return (options, next) => {
    if (shouldBeAppended('url', options)) {
      options.url = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.addQueryArgs)(options.url, {
        caps: context
      });
    }

    if (shouldBeAppended('path', options)) {
      options.path = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.addQueryArgs)(options.path, {
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONTEXT_CAPS_DELETE": function() { return /* reexport safe */ _caps_middleware__WEBPACK_IMPORTED_MODULE_0__.CONTEXT_CAPS_DELETE; },
/* harmony export */   "CONTEXT_CAPS_EDIT": function() { return /* reexport safe */ _caps_middleware__WEBPACK_IMPORTED_MODULE_0__.CONTEXT_CAPS_EDIT; },
/* harmony export */   "CONTEXT_CAPS_READ": function() { return /* reexport safe */ _caps_middleware__WEBPACK_IMPORTED_MODULE_0__.CONTEXT_CAPS_READ; },
/* harmony export */   "CONTEXT_CAPS_READ_ADMIN": function() { return /* reexport safe */ _caps_middleware__WEBPACK_IMPORTED_MODULE_0__.CONTEXT_CAPS_READ_ADMIN; },
/* harmony export */   "capsMiddleware": function() { return /* reexport safe */ _caps_middleware__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _caps_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./caps-middleware */ "./assets/src/eejs/middlewares/api-fetch/caps-middleware.js");



/***/ }),

/***/ "./assets/src/eejs/middlewares/index.js":
/*!**********************************************!*\
  !*** ./assets/src/eejs/middlewares/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiFetch": function() { return /* binding */ apiFetch; }
/* harmony export */ });
/* harmony import */ var _api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-fetch */ "./assets/src/eejs/middlewares/api-fetch/index.js");

const apiFetch = _api_fetch__WEBPACK_IMPORTED_MODULE_0__;

/***/ }),

/***/ "./assets/src/eejs/routes.js":
/*!***********************************!*\
  !*** ./assets/src/eejs/routes.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ADMIN_ROUTES": function() { return /* binding */ ADMIN_ROUTES; },
/* harmony export */   "ADMIN_ROUTE_ACTIONS": function() { return /* binding */ ADMIN_ROUTE_ACTIONS; },
/* harmony export */   "ADMIN_ROUTE_ACTION_DEFAULT": function() { return /* binding */ ADMIN_ROUTE_ACTION_DEFAULT; },
/* harmony export */   "ADMIN_URL": function() { return /* binding */ ADMIN_URL; },
/* harmony export */   "SITE_URL": function() { return /* binding */ SITE_URL; },
/* harmony export */   "getAdminUrl": function() { return /* binding */ getAdminUrl; }
/* harmony export */ });
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

const {
  paths = {}
} = _data__WEBPACK_IMPORTED_MODULE_0__["default"];
/**
 * The base url for the site this js is loaded on.
 * eg. 'https://mysite.com/'
 *
 * @type { string }
 */

const SITE_URL = paths.site_url || '';
/**
 * The base admin url for the site this js is loaded on.
 * eg. 'https://mysite.com/wp-admin/
 *
 * @type { string }
 */

const ADMIN_URL = paths.admin_url || '';
/**
 * A list of all main Event Espresso admin routes.
 *
 * @type { { string: string } }
 */

const ADMIN_ROUTES = {
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

const ADMIN_ROUTE_ACTION_DEFAULT = 'default';
/**
 * A list of all admin route actions for Event Espresso admin pages.
 * Note: currently this list only includes display actions (not processing
 * actions).
 *
 * @type { { string: { string: string } } }
 */

const ADMIN_ROUTE_ACTIONS = {
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
    EDIT: 'edit',
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
 *
 * @param { string } page  The main ee admin page string
 * @param { string } action This should correspond to the action for the admin
 * 							page.
 * @return { string } A full url for the given arguments.
 */

const getAdminUrl = function () {
  let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ADMIN_ROUTES.EVENTS;
  let action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ADMIN_ROUTE_ACTION_DEFAULT;
  return `${ADMIN_URL}admin.php?page=${page}&action=${action}`;
};

/***/ }),

/***/ "./assets/src/eejs/timezone-config.js":
/*!********************************************!*\
  !*** ./assets/src/eejs/timezone-config.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timezoneConfig": function() { return /* binding */ timezoneConfig; }
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./assets/src/eejs/data.js");

/**
 * Provided via the data passed along by the server.
 * This data a configuration object passed along from the server that exposes
 * the default timezone settings from the server.
 *
 * @type {{}}
 */

const {
  default_timezone: timezoneConfig = {
    pretty: 'UTC',
    string: 'UTC',
    offset: 0
  }
} = _data__WEBPACK_IMPORTED_MODULE_0__["default"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ (function(module) {

module.exports = window["wp"]["url"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************************!*\
  !*** ./assets/src/eejs/index.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CURRENCY_CONFIG": function() { return /* reexport safe */ _currency_config__WEBPACK_IMPORTED_MODULE_3__.currencyConfig; },
/* harmony export */   "Exception": function() { return /* reexport safe */ _exceptions__WEBPACK_IMPORTED_MODULE_6__.Exception; },
/* harmony export */   "InvalidArgument": function() { return /* reexport safe */ _exceptions__WEBPACK_IMPORTED_MODULE_6__.InvalidArgument; },
/* harmony export */   "InvalidDatetime": function() { return /* reexport safe */ _exceptions__WEBPACK_IMPORTED_MODULE_6__.InvalidDatetime; },
/* harmony export */   "InvalidISO8601String": function() { return /* reexport safe */ _exceptions__WEBPACK_IMPORTED_MODULE_6__.InvalidISO8601String; },
/* harmony export */   "InvalidLocale": function() { return /* reexport safe */ _exceptions__WEBPACK_IMPORTED_MODULE_6__.InvalidLocale; },
/* harmony export */   "InvalidModelEntity": function() { return /* reexport safe */ _exceptions__WEBPACK_IMPORTED_MODULE_6__.InvalidModelEntity; },
/* harmony export */   "InvalidSchema": function() { return /* reexport safe */ _exceptions__WEBPACK_IMPORTED_MODULE_6__.InvalidSchema; },
/* harmony export */   "InvalidTimezone": function() { return /* reexport safe */ _exceptions__WEBPACK_IMPORTED_MODULE_6__.InvalidTimezone; },
/* harmony export */   "InvalidType": function() { return /* reexport safe */ _exceptions__WEBPACK_IMPORTED_MODULE_6__.InvalidType; },
/* harmony export */   "SERVER_LOCALE": function() { return /* reexport safe */ _locale__WEBPACK_IMPORTED_MODULE_5__.locale; },
/* harmony export */   "TIMEZONE_CONFIG": function() { return /* reexport safe */ _timezone_config__WEBPACK_IMPORTED_MODULE_4__.timezoneConfig; },
/* harmony export */   "__DEV__": function() { return /* binding */ __DEV__; },
/* harmony export */   "data": function() { return /* reexport safe */ _data__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   "i18n": function() { return /* binding */ i18n; },
/* harmony export */   "middleWares": function() { return /* binding */ middleWares; },
/* harmony export */   "routes": function() { return /* binding */ routes; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./assets/src/eejs/data.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes */ "./assets/src/eejs/routes.js");
/* harmony import */ var _currency_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currency_config */ "./assets/src/eejs/currency_config.js");
/* harmony import */ var _timezone_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timezone-config */ "./assets/src/eejs/timezone-config.js");
/* harmony import */ var _locale__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./locale */ "./assets/src/eejs/locale.js");
/* harmony import */ var _exceptions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./exceptions */ "./assets/src/eejs/exceptions/index.js");
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

const i18n = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__;
/**
 * exporting routes to a named var
 */


const routes = _routes__WEBPACK_IMPORTED_MODULE_2__;
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


const middleWares = _middlewares__WEBPACK_IMPORTED_MODULE_7__;
/**
 * environment constant indicating development server
 */

const __DEV__ = "development" !== 'production';
}();
window.eejs = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ08sTUFBTU0sV0FBVyxHQUFHRCx5Q0FBcEI7QUFFUDtBQUNBO0FBQ0E7O0FBQ08sTUFBTUUsT0FBTyxHQUFHQyxhQUFBLEtBQXlCLFlBQXpDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLy4vYXNzZXRzL3NyYy9lZWpzL2N1cnJlbmN5X2NvbmZpZy5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vYXNzZXRzL3NyYy9lZWpzL2RhdGEuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL2Fzc2V0cy9zcmMvZWVqcy9leGNlcHRpb25zL2dlbmVyYWwuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL2Fzc2V0cy9zcmMvZWVqcy9leGNlcHRpb25zL2luZGV4LmpzIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvZXhjZXB0aW9ucy9pbnZhbGlkLWFyZ3VtZW50LmpzIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvZXhjZXB0aW9ucy9pbnZhbGlkLWRhdGV0aW1lLmpzIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvZXhjZXB0aW9ucy9pbnZhbGlkLWlzbzg2MDEtc3RyaW5nLmpzIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvZXhjZXB0aW9ucy9pbnZhbGlkLWxvY2FsZS5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vYXNzZXRzL3NyYy9lZWpzL2V4Y2VwdGlvbnMvaW52YWxpZC1tb2RlbC1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL2Fzc2V0cy9zcmMvZWVqcy9leGNlcHRpb25zL2ludmFsaWQtc2NoZW1hLmpzIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvZXhjZXB0aW9ucy9pbnZhbGlkLXRpbWV6b25lLmpzIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvZXhjZXB0aW9ucy9pbnZhbGlkLXR5cGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL2Fzc2V0cy9zcmMvZWVqcy9sb2NhbGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL2Fzc2V0cy9zcmMvZWVqcy9taWRkbGV3YXJlcy9hcGktZmV0Y2gvY2Fwcy1taWRkbGV3YXJlLmpzIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvbWlkZGxld2FyZXMvYXBpLWZldGNoL2luZGV4LmpzIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvbWlkZGxld2FyZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL2Fzc2V0cy9zcmMvZWVqcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL2Fzc2V0cy9zcmMvZWVqcy90aW1lem9uZS1jb25maWcuanMiLCJ3ZWJwYWNrOi8vZWVqcy9leHRlcm5hbCB3aW5kb3cgW1wid3BcIixcImkxOG5cIl0iLCJ3ZWJwYWNrOi8vZWVqcy9leHRlcm5hbCB3aW5kb3cgW1wid3BcIixcInVybFwiXSIsIndlYnBhY2s6Ly9lZWpzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZWVqcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZWVqcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2VlanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lZWpzLy4vYXNzZXRzL3NyYy9lZWpzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkYXRhIGZyb20gJy4vZGF0YSc7XG5cbi8qKlxuICogUHJvdmlkZWQgdmlhIHRoZSBkYXRhIHBhc3NlZCBhbG9uZyBieSB0aGUgc2VydmVyLlxuICogVGhpcyBkYXRhIGEgY29uZmlndXJhdGlvbiBvYmplY3QgcGFzc2VkIGFsb25nIGZyb20gdGhlIHNlcnZlciB0aGF0IGluZGljYXRlc1xuICogdGhlIGRlZmF1bHQgY3VycmVuY3kgc2V0dGluZ3MgZnJvbSB0aGUgc2VydmVyLlxuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0IGNvbnN0IHsgY3VycmVuY3lfY29uZmlnOiBjdXJyZW5jeUNvbmZpZyA9IHt9IH0gPSBkYXRhO1xuIiwiLyoqXG4gKiBUaGlzIHdpbGwgaG9sZCBhcmJpdHJhcnkgZGF0YSBhc3NpZ25lZCBieSB0aGUgQXNzZXRzIFJlZ2lzdHJ5LlxuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgZGF0YSA9IGVlanNkYXRhLmRhdGEgfHwge307XG5leHBvcnQgZGVmYXVsdCBkYXRhO1xuIiwiLyoqXG4gKiBHZW5lcmFsIEVFIEV4Y2VwdGlvblxuICogVXNhZ2U6IHRocm93IG5ldyBlZWpzLkV4Y2VwdGlvbignc29tZSBtZXNzYWdlJylcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICogQHBhcmFtIHsuLi5taXhlZH0gYXJnc1xuICogQHJldHVybiB7RXhjZXB0aW9ufSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBFeGNlcHRpb24obWVzc2FnZSwgLi4uYXJncykge1xuXHRjb25zdCBpbnN0YW5jZSA9IG5ldyBFcnJvcihtZXNzYWdlLCAuLi5hcmdzKTtcblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKGluc3RhbmNlLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykpO1xuXHRpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcblx0XHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShpbnN0YW5jZSwgRXhjZXB0aW9uKTtcblx0fVxuXHRyZXR1cm4gaW5zdGFuY2U7XG59XG5cbkV4Y2VwdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSwge1xuXHRjb25zdHJ1Y3Rvcjoge1xuXHRcdHZhbHVlOiBFcnJvcixcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdH0sXG59KTtcblxuaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YoRXhjZXB0aW9uLCBFcnJvcik7XG59IGVsc2Uge1xuXHRFeGNlcHRpb24uX19wcm90b19fID0gRXJyb3I7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2VwdGlvbjtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgRXhjZXB0aW9uIH0gZnJvbSAnLi9nZW5lcmFsJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW52YWxpZFNjaGVtYSB9IGZyb20gJy4vaW52YWxpZC1zY2hlbWEnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBJbnZhbGlkQXJndW1lbnQgfSBmcm9tICcuL2ludmFsaWQtYXJndW1lbnQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBJbnZhbGlkVGltZXpvbmUgfSBmcm9tICcuL2ludmFsaWQtdGltZXpvbmUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBJbnZhbGlkSVNPODYwMVN0cmluZyB9IGZyb20gJy4vaW52YWxpZC1pc284NjAxLXN0cmluZyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEludmFsaWRMb2NhbGUgfSBmcm9tICcuL2ludmFsaWQtbG9jYWxlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW52YWxpZERhdGV0aW1lIH0gZnJvbSAnLi9pbnZhbGlkLWRhdGV0aW1lJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW52YWxpZFR5cGUgfSBmcm9tICcuL2ludmFsaWQtdHlwZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEludmFsaWRNb2RlbEVudGl0eSB9IGZyb20gJy4vaW52YWxpZC1tb2RlbC1lbnRpdHknO1xuIiwiLyoqXG4gKiBJbnZhbGlkQXJndW1lbnRcbiAqIFVzYWdlOiB0aHJvdyBuZXcgZWVqcy5JbnZhbGlkQXJndW1lbnQoJ3NvbWUgbWVzc2FnZSdbLCBhcmd1bWVudF0pXG4gKlxuICogVHlwaWNhbGx5IHRoaXMgZXJyb3IgaXMgdGhyb3duIHdoZW4gYSBmdW5jdGlvbiBvciBtZXRob2QgaXMgY2FsbGVkIHdpdGggYW5cbiAqIGludmFsaWQgYXJndW1lbnQgZm9yIGEgZ2l2ZW4gcGFyYW1ldGVyLiAgSXQgY291bGQgc3RpbGwgYmUgdGhlIHJpZ2h0IHR5cGVcbiAqIGJ1dCBpdHMgYW4gdW5leHBlY3RlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICogQHBhcmFtIHttaXhlZH0gYXJndW1lbnRWYWx1ZSBPcHRpb25hbCwgdGhlIGFyZ3VtZW50IHRoYXQgY2F1c2VkIHRoZSBlcnJvci5cbiAqIEBwYXJhbSB7Li4ubWl4ZWR9IGFyZ3NcbiAqIEByZXR1cm4ge0ludmFsaWRBcmd1bWVudH0gaW5zdGFuY2Ugb2YgSW52YWxpZEFyZ3VtZW50XG4gKi9cbmZ1bmN0aW9uIEludmFsaWRBcmd1bWVudChtZXNzYWdlLCBhcmd1bWVudFZhbHVlLCAuLi5hcmdzKSB7XG5cdGNvbnN0IGluc3RhbmNlID0gbmV3IEVycm9yKG1lc3NhZ2UsIC4uLmFyZ3MpO1xuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YoaW5zdGFuY2UsIE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKSk7XG5cdGluc3RhbmNlLmFyZ3VtZW50VmFsdWUgPSBhcmd1bWVudFZhbHVlIHx8IG51bGw7XG5cdGluc3RhbmNlLm5hbWUgPSBpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lO1xuXHRpbnN0YW5jZS5tZXNzYWdlID1cblx0XHRpbnN0YW5jZS5tZXNzYWdlICE9PSAnJ1xuXHRcdFx0PyAnSW52YWxpZCBhcmd1bWVudCBwcm92aWRlZC4gJyArIGluc3RhbmNlLm1lc3NhZ2Vcblx0XHRcdDogJ0ludmFsaWQgYXJndW1lbnQgcHJvdmlkZWQuJztcblx0aWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG5cdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoaW5zdGFuY2UsIEludmFsaWRBcmd1bWVudCk7XG5cdH1cblx0cmV0dXJuIGluc3RhbmNlO1xufVxuXG5JbnZhbGlkQXJndW1lbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUsIHtcblx0Y29uc3RydWN0b3I6IHtcblx0XHR2YWx1ZTogRXJyb3IsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHR9LFxufSk7XG5cbmlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKEludmFsaWRBcmd1bWVudCwgRXJyb3IpO1xufSBlbHNlIHtcblx0SW52YWxpZEFyZ3VtZW50Ll9fcHJvdG9fXyA9IEVycm9yO1xufVxuXG5leHBvcnQgZGVmYXVsdCBJbnZhbGlkQXJndW1lbnQ7XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IEludmFsaWRUeXBlIGZyb20gJy4vaW52YWxpZC10eXBlJztcblxuLyoqXG4gKiBJbnZhbGlkRGF0ZVRpbWVcbiAqIFVzYWdlOiB0aHJvdyBuZXcgZWVqcy5JbnZhbGlkRGF0ZVRpbWUoJ3NvbWUgbWVzc2FnZScsIFtkYXRldGltZV0pXG4gKlxuICogVHlwaWNhbGx5IHRoaXMgZXJyb3IgaXMgdGhyb3duIHdoZW4gYSBnaXZlbiBzdHJpbmcgaXMgbm90IGEgdmFsaWQgZGF0ZXRpbWVcbiAqIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbXNnXG4gKiBAcGFyYW0ge21peGVkfSBkYXRldGltZSBPcHRpb25hbCwgdGhlIGRhdGV0aW1lIHN0cmluZyB0aGF0IGlzIGludmFsaWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52YWxpZERhdGVUaW1lIGV4dGVuZHMgSW52YWxpZFR5cGUge1xuXHRjb25zdHJ1Y3RvcihkYXRldGltZSwgbWVzc2FnZSwgLi4uYXJncykge1xuXHRcdHN1cGVyKG1lc3NhZ2UsIC4uLmFyZ3MpO1xuXHRcdGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuXHRcdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgSW52YWxpZERhdGVUaW1lKTtcblx0XHR9XG5cdFx0dGhpcy5tZXNzYWdlID1cblx0XHRcdCdUaGUgdmFsdWUgcHJvdmlkZWQgaXMgbm90IGEgdmFsaWQgRGF0ZVRpbWUuICcgKyB0aGlzLm1lc3NhZ2U7XG5cdFx0dGhpcy5kYXRldGltZSA9IGRhdGV0aW1lIHx8ICcnO1xuXHRcdHRoaXMubmFtZSA9ICdJbnZhbGlkRGF0ZVRpbWUnO1xuXHR9XG59XG4iLCIvKipcbiAqIEludGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0IEludmFsaWRBcmd1bWVudCBmcm9tICcuL2ludmFsaWQtYXJndW1lbnQnO1xuXG4vKipcbiAqIEludmFsaWRJc284NjAxU3RyaW5nXG4gKiBVc2FnZTogdGhyb3cgbmV3IGVlanMuSW52YWxpZElTTzg2MDFTdHJpbmcoJ3NvbWUgbWVzc2FnZScsIFtkYXRlVGltZVN0cmluZ10pXG4gKlxuICogVHlwaWNhbGx5IHRoaXMgZXJyb3IgaXMgdGhyb3duIHdoZW4gYSBnaXZlbiBzdHJpbmcgaXMgbm90IHRoZSBjb3JyZWN0IGZvcm1hdFxuICogZm9yIElTTyA4NjAxLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcbiAqIEBwYXJhbSB7bWl4ZWR9IGRhdGVUaW1lU3RyaW5nIE9wdGlvbmFsLCB0aGUgdGltZXpvbmUgc3RyaW5nIHRoYXQgaXMgaW52YWxpZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZhbGlkSVNPODYwMVN0cmluZyBleHRlbmRzIEludmFsaWRBcmd1bWVudCB7XG5cdGNvbnN0cnVjdG9yKGRhdGVUaW1lU3RyaW5nLCBtZXNzYWdlID0gJycsIC4uLmFyZ3MpIHtcblx0XHRtZXNzYWdlID0gbWVzc2FnZVxuXHRcdFx0PyAnVGhlIHN0cmluZyBwcm92aWRlZCBpcyBub3QgYSB2YWxpZCBJU08gODYwMSBmb3JtYXR0ZWQgc3RyaW5nLiAnICtcblx0XHRcdCAgbWVzc2FnZVxuXHRcdFx0OiAnVGhlIHN0cmluZyBwcm92aWRlZCBpcyBub3QgYSB2YWxpZCBJU08gODYwMSBmb3JtYXR0ZWQgc3RyaW5nLic7XG5cdFx0c3VwZXIobWVzc2FnZSwgZGF0ZVRpbWVTdHJpbmcsIC4uLmFyZ3MpO1xuXHRcdGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuXHRcdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgSW52YWxpZElTTzg2MDFTdHJpbmcpO1xuXHRcdH1cblx0XHR0aGlzLmRhdGVUaW1lU3RyaW5nID0gZGF0ZVRpbWVTdHJpbmcgfHwgJyc7XG5cdH1cbn1cbiIsIi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgSW52YWxpZEFyZ3VtZW50IGZyb20gJy4vaW52YWxpZC1hcmd1bWVudCc7XG5cbi8qKlxuICogSW52YWxpZExvY2FsZVxuICogVXNhZ2U6IHRocm93IG5ldyBlZWpzLkludmFsaWRMb2NhbGUoJ3NvbWUgbWVzc2FnZScsIFtsb2NhbGVdKVxuICpcbiAqIFR5cGljYWxseSB0aGlzIGVycm9yIGlzIHRocm93biB3aGVuIGEgZ2l2ZW4gc3RyaW5nIGlzIG5vdCBhIHZhbGlkIGxvY2FsZVxuICogc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcbiAqIEBwYXJhbSB7bWl4ZWR9IGxvY2FsZSBPcHRpb25hbCwgdGhlIGxvY2FsZSBzdHJpbmcgdGhhdCBpcyBpbnZhbGlkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludmFsaWRMb2NhbGUgZXh0ZW5kcyBJbnZhbGlkQXJndW1lbnQge1xuXHRjb25zdHJ1Y3Rvcihsb2NhbGUsIG1lc3NhZ2UgPSAnJywgLi4uYXJncykge1xuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlXG5cdFx0XHQ/ICdUaGUgbG9jYWxlIHN0cmluZyBwcm92aWRlZCAoJyArXG5cdFx0XHQgIEpTT04uc3RyaW5naWZ5KGxvY2FsZSkgK1xuXHRcdFx0ICAnKSBpcyBub3QgdmFsaWQuICcgK1xuXHRcdFx0ICBtZXNzYWdlXG5cdFx0XHQ6ICdUaGUgbG9jYWxlIHN0cmluZyBwcm92aWRlZCAoJyArXG5cdFx0XHQgIEpTT04uc3RyaW5naWZ5KGxvY2FsZSkgK1xuXHRcdFx0ICAnKSBpcyBub3QgdmFsaWQuJztcblx0XHRzdXBlcihtZXNzYWdlLCBsb2NhbGUsIC4uLmFyZ3MpO1xuXHRcdGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuXHRcdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgSW52YWxpZExvY2FsZSk7XG5cdFx0fVxuXHRcdHRoaXMubG9jYWxlID0gbG9jYWxlIHx8ICcnO1xuXHR9XG59XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IEludmFsaWRUeXBlIGZyb20gJy4vaW52YWxpZC10eXBlJztcblxuLyoqXG4gKiBJbnZhbGlkU2NoZW1hXG4gKiBVc2FnZTogdGhyb3cgbmV3IGVlanMuSW52YWxpZFNjaGVtYSgnc29tZSBtZXNzYWdlJywgW3NjaGVtYSBvYmplY3RdKVxuICpcbiAqIFR5cGljYWxseSB0aGlzIGVycm9yIGlzIHRocm93biB3aGVuIGFuIG9iamVjdCByZXByZXNlbnRpbmcgYSBtb2RlbCBzY2hlbWFcbiAqIChhdCBhIG1pbmltdW0pIGRvZXMgbm90IGhhdmUgYSBcInByb3BlcnRpZXNcIiBwcm9wZXJ0eSkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xuICogQHBhcmFtIHttaXhlZH0gc2NoZW1hIE9wdGlvbmFsLCB0aGUgc2NoZW1hIG9iamVjdCB3aGljaCB3aWxsIGJlIGFkZGVkIHRvIGFcbiAqIHNjaGVtYSBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52YWxpZE1vZGVsRW50aXR5IGV4dGVuZHMgSW52YWxpZFR5cGUge1xuXHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0aWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG5cdFx0XHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBJbnZhbGlkTW9kZWxFbnRpdHkpO1xuXHRcdH1cblx0XHR0aGlzLm1lc3NhZ2UgPSAnSW52YWxpZCBtb2RlbCBlbnRpdHkgaW5zdGFuY2UgcHJvdmlkZWQuJyArIHRoaXMubWVzc2FnZTtcblx0XHR0aGlzLm1vZGVsRW50aXR5ID0gYXJnc1sxXSB8fCB7fTtcblx0fVxufVxuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBJbnZhbGlkVHlwZSBmcm9tICcuL2ludmFsaWQtdHlwZSc7XG5cbi8qKlxuICogSW52YWxpZFNjaGVtYVxuICogVXNhZ2U6IHRocm93IG5ldyBlZWpzLkludmFsaWRTY2hlbWEoJ3NvbWUgbWVzc2FnZScsIFtzY2hlbWEgb2JqZWN0XSlcbiAqXG4gKiBUeXBpY2FsbHkgdGhpcyBlcnJvciBpcyB0aHJvd24gd2hlbiBhbiBvYmplY3QgcmVwcmVzZW50aW5nIGEgbW9kZWwgc2NoZW1hXG4gKiAoYXQgYSBtaW5pbXVtKSBkb2VzIG5vdCBoYXZlIGEgXCJwcm9wZXJ0aWVzXCIgcHJvcGVydHkpLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcbiAqIEBwYXJhbSB7bWl4ZWR9IHNjaGVtYSBPcHRpb25hbCwgdGhlIHNjaGVtYSBvYmplY3Qgd2hpY2ggd2lsbCBiZSBhZGRlZCB0byBhXG4gKiBzY2hlbWEgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludmFsaWRTY2hlbWEgZXh0ZW5kcyBJbnZhbGlkVHlwZSB7XG5cdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcblx0XHRcdEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIEludmFsaWRTY2hlbWEpO1xuXHRcdH1cblx0XHR0aGlzLm1lc3NhZ2UgPVxuXHRcdFx0J0ludmFsaWQgc2NoZW1hIG9iamVjdCBwcm92aWRlZC4gTXVzdCBoYXZlIGEnICtcblx0XHRcdCcgXCJwcm9wZXJ0aWVzXCIgcHJvcGVydHkuJyArXG5cdFx0XHR0aGlzLm1lc3NhZ2U7XG5cdFx0dGhpcy5zY2hlbWEgPSBhcmdzWzFdIHx8IHt9O1xuXHR9XG59XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IEludmFsaWRBcmd1bWVudCBmcm9tICcuL2ludmFsaWQtYXJndW1lbnQnO1xuXG4vKipcbiAqIEludmFsaWRUaW1lem9uZVxuICogVXNhZ2U6IHRocm93IG5ldyBlZWpzLkludmFsaWRUaW1lem9uZSgnc29tZSBtZXNzYWdlJywgW3RpbWV6b25lXSlcbiAqXG4gKiBUeXBpY2FsbHkgdGhpcyBlcnJvciBpcyB0aHJvd24gd2hlbiBhIGdpdmVuIHN0cmluZyBpcyBub3QgYSB2YWxpZCB0aW1lem9uZVxuICogc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcbiAqIEBwYXJhbSB7bWl4ZWR9IHRpbWV6b25lIE9wdGlvbmFsLCB0aGUgdGltZXpvbmUgc3RyaW5nIHRoYXQgaXMgaW52YWxpZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZhbGlkVGltZXpvbmUgZXh0ZW5kcyBJbnZhbGlkQXJndW1lbnQge1xuXHRjb25zdHJ1Y3Rvcih0aW1lem9uZSwgbWVzc2FnZSA9ICcnLCAuLi5hcmdzKSB7XG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2Vcblx0XHRcdD8gJ1RoZSB0aW1lem9uZSBzdHJpbmcgcHJvdmlkZWQgaXMgbm90IHZhbGlkLiAnICsgbWVzc2FnZVxuXHRcdFx0OiAnVGhlIHRpbWV6b25lIHN0cmluZyBwcm92aWRlZCBpcyBub3QgdmFsaWQuJztcblx0XHRzdXBlcihtZXNzYWdlLCB0aW1lem9uZSwgLi4uYXJncyk7XG5cdFx0aWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG5cdFx0XHRFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBJbnZhbGlkVGltZXpvbmUpO1xuXHRcdH1cblx0XHR0aGlzLnRpbWV6b25lID0gdGltZXpvbmUgfHwgJyc7XG5cdH1cbn1cbiIsIi8qKlxuICogSW52YWxpZFR5cGVcbiAqIFVzYWdlOiB0aHJvdyBuZXcgZWVqcy5JbnZhbGlkVHlwZSgnc29tZSBtZXNzYWdlJ1ssIGFyZ3VtZW50XSlcbiAqXG4gKiBUaGlzIGlzIGVzc2VudGlhbGx5IGEgd3JhcHBlciBhcm91bmQgdGhlIG5hdGl2ZSBgVHlwZUVycm9yYCBlcnJvciBoYW5kbGVyLlxuICogVGhlIHB1cnBvc2UgaXMgdG8gYWxsb3cgZm9yIG1vcmUgY3VzdG9tIHNwZWNpZmljIHR5cGUgZXJyb3JzIHRvIGJlIGNyZWF0ZWRcbiAqIHVzaW5nIEVTNiBzeW50YXggc2luY2UgdGhlcmUgYXJlIHVzdWFsbHkgdHJhbnNwaWxpbmcgaXNzdWVzIHVzaW5nIEVTNiBzeW50YXhcbiAqIGV4dGVuZGluZyBuYXRpdmUgRXJyb3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gKiBAcGFyYW0ge21peGVkfSBhcmd1bWVudFZhbHVlIE9wdGlvbmFsLCB0aGUgYXJndW1lbnQgdGhhdCBjYXVzZWQgdGhlIGVycm9yLlxuICogQHBhcmFtIHsuLi5taXhlZH0gYXJnc1xuICogQHJldHVybiB7SW52YWxpZFR5cGV9IGluc3RhbmNlIG9mIEludmFsaWRUeXBlXG4gKi9cbmZ1bmN0aW9uIEludmFsaWRUeXBlKG1lc3NhZ2UsIGFyZ3VtZW50VmFsdWUsIC4uLmFyZ3MpIHtcblx0Y29uc3QgaW5zdGFuY2UgPSBuZXcgVHlwZUVycm9yKG1lc3NhZ2UsIC4uLmFyZ3MpO1xuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YoaW5zdGFuY2UsIE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKSk7XG5cdGluc3RhbmNlLmFyZ3VtZW50VmFsdWUgPSBhcmd1bWVudFZhbHVlIHx8IG51bGw7XG5cdGluc3RhbmNlLm5hbWUgPSBpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lO1xuXHRpbnN0YW5jZS5tZXNzYWdlID1cblx0XHRpbnN0YW5jZS5tZXNzYWdlICE9PSAnJ1xuXHRcdFx0PyAnSW52YWxpZCB0eXBlIHByb3ZpZGVkLiAnICsgaW5zdGFuY2UubWVzc2FnZVxuXHRcdFx0OiAnSW52YWxpZCB0eXBlIHByb3ZpZGVkLic7XG5cdGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuXHRcdEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGluc3RhbmNlLCBJbnZhbGlkVHlwZSk7XG5cdH1cblx0cmV0dXJuIGluc3RhbmNlO1xufVxuXG5JbnZhbGlkVHlwZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFR5cGVFcnJvci5wcm90b3R5cGUsIHtcblx0Y29uc3RydWN0b3I6IHtcblx0XHR2YWx1ZTogVHlwZUVycm9yLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0fSxcbn0pO1xuXG5pZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG5cdE9iamVjdC5zZXRQcm90b3R5cGVPZihJbnZhbGlkVHlwZSwgVHlwZUVycm9yKTtcbn0gZWxzZSB7XG5cdEludmFsaWRUeXBlLl9fcHJvdG9fXyA9IFR5cGVFcnJvcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgSW52YWxpZFR5cGU7XG4iLCJpbXBvcnQgZGF0YSBmcm9tICcuL2RhdGEnO1xuXG4vKipcbiAqIFByb3ZpZGVkIHZpYSB0aGUgZGF0YSBwYXNzZWQgYWxvbmcgYnkgdGhlIHNlcnZlci5cbiAqIFRoaXMgZGF0YSBpcyBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHBhc3NlZCBhbG9uZyBmcm9tIHRoZSBzZXJ2ZXIgdGhhdCBleHBvc2VzXG4gKiB0aGUgZGVmYXVsdCBsb2NhbGUgc2V0dGluZ3MgZnJvbSB0aGUgc2VydmVyLlxuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0IGNvbnN0IHtcblx0bG9jYWxlID0ge1xuXHRcdHVzZXI6ICdlbicsXG5cdFx0c2l0ZTogJ2VuJyxcblx0fSxcbn0gPSBkYXRhO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgYWRkUXVlcnlBcmdzLCBoYXNRdWVyeUFyZyB9IGZyb20gJ0B3b3JkcHJlc3MvdXJsJztcblxuZXhwb3J0IGNvbnN0IENPTlRFWFRfQ0FQU19SRUFEID0gJ3JlYWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFWFRfQ0FQU19SRUFEX0FETUlOID0gJ3JlYWRfYWRtaW4nO1xuZXhwb3J0IGNvbnN0IENPTlRFWFRfQ0FQU19FRElUID0gJ2VkaXQnO1xuZXhwb3J0IGNvbnN0IENPTlRFWFRfQ0FQU19ERUxFVEUgPSAnZGVsZXRlJztcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gZm9yIHdoZXRoZXIgdGhlIHBhdGggc2hvdWxkIGhhdmUgdGhlIGNvbnRleHQgYXBwZW5kZWQgb3Igbm90LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoVHlwZSBhcGlGZXRjaCBhY2NlcHRzICdwYXRoJyBvciAndXJsJyBzbyB3ZSBhbGxvdyBmb3JcbiAqIGNoZWNraW5nIHRoYXQgaGVyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHRoZSBvcHRpb25zIG9iamVjdCBwcm92aWRlZCB0byBhcGktZmV0Y2hcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgY29udGV4dCBzaG91bGQgYmUgYXBwZW5kZWQgb3Igbm90LlxuICovXG5mdW5jdGlvbiBzaG91bGRCZUFwcGVuZGVkKHBhdGhUeXBlLCBvcHRpb25zKSB7XG5cdHJldHVybiAoXG5cdFx0dHlwZW9mIG9wdGlvbnNbcGF0aFR5cGVdID09PSAnc3RyaW5nJyAmJlxuXHRcdCghb3B0aW9ucy5tZXRob2QgfHwgb3B0aW9ucy5tZXRob2QgPT09ICdHRVQnKSAmJlxuXHRcdCFoYXNRdWVyeUFyZyhvcHRpb25zW3BhdGhUeXBlXSwgJ2NhcHMnKSAmJlxuXHRcdC9lZVxcL3Y0XFwuOFxcLjM2Ly5leGVjKG9wdGlvbnNbcGF0aFR5cGVdKSAhPT0gbnVsbFxuXHQpO1xufVxuXG4vKipcbiAqIE1pZGRsZXdhcmUgZm9yIHRoZSBAd29yZHByZXNzL2FwaS1mZXRjaCBsaWJyYXJ5IHRoYXQgdGhlIGdpdmVuIGNvbnRleHRcbiAqIHRvIHRoZSBgY2Fwc2AgcXVlcnkgYXJnIG9uIGV2ZXJ5IEVFIEdFVCByZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSB7IHN0cmluZyB9IGNvbnRleHQgRGVmYXVsdHMgdG8gJ3JlYWQnXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gbWlkZGxld2FyZSBjYWxsYmFja1xuICovXG5jb25zdCBjYXBzTWlkZGxld2FyZSA9XG5cdChjb250ZXh0ID0gQ09OVEVYVF9DQVBTX1JFQUQpID0+XG5cdChvcHRpb25zLCBuZXh0KSA9PiB7XG5cdFx0aWYgKHNob3VsZEJlQXBwZW5kZWQoJ3VybCcsIG9wdGlvbnMpKSB7XG5cdFx0XHRvcHRpb25zLnVybCA9IGFkZFF1ZXJ5QXJncyhvcHRpb25zLnVybCwgeyBjYXBzOiBjb250ZXh0IH0pO1xuXHRcdH1cblxuXHRcdGlmIChzaG91bGRCZUFwcGVuZGVkKCdwYXRoJywgb3B0aW9ucykpIHtcblx0XHRcdG9wdGlvbnMucGF0aCA9IGFkZFF1ZXJ5QXJncyhvcHRpb25zLnBhdGgsIHsgY2FwczogY29udGV4dCB9KTtcblx0XHR9XG5cdFx0cmV0dXJuIG5leHQob3B0aW9ucywgbmV4dCk7XG5cdH07XG5cbmV4cG9ydCBkZWZhdWx0IGNhcHNNaWRkbGV3YXJlO1xuIiwiaW1wb3J0IHtcblx0ZGVmYXVsdCBhcyBjYXBzTWlkZGxld2FyZSxcblx0Q09OVEVYVF9DQVBTX1JFQUQsXG5cdENPTlRFWFRfQ0FQU19SRUFEX0FETUlOLFxuXHRDT05URVhUX0NBUFNfRURJVCxcblx0Q09OVEVYVF9DQVBTX0RFTEVURSxcbn0gZnJvbSAnLi9jYXBzLW1pZGRsZXdhcmUnO1xuXG5leHBvcnQge1xuXHRjYXBzTWlkZGxld2FyZSxcblx0Q09OVEVYVF9DQVBTX1JFQUQsXG5cdENPTlRFWFRfQ0FQU19SRUFEX0FETUlOLFxuXHRDT05URVhUX0NBUFNfRURJVCxcblx0Q09OVEVYVF9DQVBTX0RFTEVURSxcbn07XG4iLCJpbXBvcnQgKiBhcyBmZXRjaCBmcm9tICcuL2FwaS1mZXRjaCc7XG5leHBvcnQgY29uc3QgYXBpRmV0Y2ggPSBmZXRjaDtcbiIsIi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgZGF0YSBmcm9tICcuL2RhdGEnO1xuXG4vKipcbiAqIFByb3ZpZGVkIHZpYSB0aGUgZGF0YSBwYXNzZWQgYWxvbmcgYnkgdGhlIHNlcnZlci5cbiAqIFRoaXMgZGF0YSBoYXMgdG8gZG8gd2l0aCBhbnkgcGF0aHMvcm91dGUgaW5mb3JtYXRpb24gcGFzc2VkIGFsb25nIGZyb20gdGhlXG4gKiBzZXJ2ZXIuXG4gKlxuICogQHR5cGUgeyB7fSB9XG4gKi9cbmNvbnN0IHsgcGF0aHMgPSB7fSB9ID0gZGF0YTtcblxuLyoqXG4gKiBUaGUgYmFzZSB1cmwgZm9yIHRoZSBzaXRlIHRoaXMganMgaXMgbG9hZGVkIG9uLlxuICogZWcuICdodHRwczovL215c2l0ZS5jb20vJ1xuICpcbiAqIEB0eXBlIHsgc3RyaW5nIH1cbiAqL1xuZXhwb3J0IGNvbnN0IFNJVEVfVVJMID0gcGF0aHMuc2l0ZV91cmwgfHwgJyc7XG5cbi8qKlxuICogVGhlIGJhc2UgYWRtaW4gdXJsIGZvciB0aGUgc2l0ZSB0aGlzIGpzIGlzIGxvYWRlZCBvbi5cbiAqIGVnLiAnaHR0cHM6Ly9teXNpdGUuY29tL3dwLWFkbWluL1xuICpcbiAqIEB0eXBlIHsgc3RyaW5nIH1cbiAqL1xuZXhwb3J0IGNvbnN0IEFETUlOX1VSTCA9IHBhdGhzLmFkbWluX3VybCB8fCAnJztcblxuLyoqXG4gKiBBIGxpc3Qgb2YgYWxsIG1haW4gRXZlbnQgRXNwcmVzc28gYWRtaW4gcm91dGVzLlxuICpcbiAqIEB0eXBlIHsgeyBzdHJpbmc6IHN0cmluZyB9IH1cbiAqL1xuZXhwb3J0IGNvbnN0IEFETUlOX1JPVVRFUyA9IHtcblx0RVZFTlRTOiAnZXNwcmVzc29fZXZlbnRzJyxcblx0UkVHSVNUUkFUSU9OUzogJ2VzcHJlc3NvX3JlZ2lzdHJhdGlvbnMnLFxuXHRUUkFOU0FDVElPTlM6ICdlc3ByZXNzb190cmFuc2FjdGlvbnMnLFxuXHRNRVNTQUdFUzogJ2VzcHJlc3NvX21lc3NhZ2VzJyxcblx0UFJJQ0VTOiAncHJpY2luZycsXG5cdFJFR0lTVFJBVElPTl9GT1JNUzogJ3JlZ2lzdHJhdGlvbl9mb3JtJyxcblx0VkVOVUVTOiAnZXNwcmVzc29fdmVudWVzJyxcblx0R0VORVJBTF9TRVRUSU5HUzogJ2VzcHJlc3NvX2dlbmVyYWxfc2V0dGluZ3MnLFxuXHRQQVlNRU5UX01FVEhPRFM6ICdlc3ByZXNzb19wYXltZW50X3NldHRpbmdzJyxcblx0RVhURU5TSU9OU19BTkRfU0VSVklDRVM6ICdlc3ByZXNzb19wYWNrYWdlcycsXG5cdE1BSU5URU5BTkNFOiAnZXNwcmVzc29fbWFpbnRlbmFuY2UnLFxuXHRIRUxQX0FORF9TVVBQT1JUOiAnZXNwcmVzc29fc3VwcG9ydCcsXG5cdEFCT1VUOiAnZXNwcmVzc29fYWJvdXQnLFxufTtcblxuLyoqXG4gKiBUaGUgc3RyaW5nIHVzZWQgdG8gaW5kaWNhdGUgdGhlICdkZWZhdWx0JyBhY3Rpb24gcm91dGUgZm9yIGFsbCBFdmVudCBFc3ByZXNzb1xuICogYWRtaW4gcGFnZXMuXG4gKlxuICogQHR5cGUgeyBzdHJpbmcgfVxuICovXG5leHBvcnQgY29uc3QgQURNSU5fUk9VVEVfQUNUSU9OX0RFRkFVTFQgPSAnZGVmYXVsdCc7XG5cbi8qKlxuICogQSBsaXN0IG9mIGFsbCBhZG1pbiByb3V0ZSBhY3Rpb25zIGZvciBFdmVudCBFc3ByZXNzbyBhZG1pbiBwYWdlcy5cbiAqIE5vdGU6IGN1cnJlbnRseSB0aGlzIGxpc3Qgb25seSBpbmNsdWRlcyBkaXNwbGF5IGFjdGlvbnMgKG5vdCBwcm9jZXNzaW5nXG4gKiBhY3Rpb25zKS5cbiAqXG4gKiBAdHlwZSB7IHsgc3RyaW5nOiB7IHN0cmluZzogc3RyaW5nIH0gfSB9XG4gKi9cbmV4cG9ydCBjb25zdCBBRE1JTl9ST1VURV9BQ1RJT05TID0ge1xuXHRFVkVOVFM6IHtcblx0XHRPVkVSVklFVzogQURNSU5fUk9VVEVfQUNUSU9OX0RFRkFVTFQsXG5cdFx0Q0FURUdPUllfTElTVDogJ2NhdGVnb3J5X2xpc3QnLFxuXHRcdFRFTVBMQVRFUzogJ3RlbXBsYXRlX3NldHRpbmdzJyxcblx0XHRERUZBVUxUX1NFVFRJTkdTOiAnZGVmYXVsdF9ldmVudF9zZXR0aW5ncycsXG5cdFx0REVGQVVMVF9USUNLRVRTOiAndGlja2V0X2xpc3RfdGFibGUnLFxuXHR9LFxuXHRSRUdJU1RSQVRJT05TOiB7XG5cdFx0T1ZFUlZJRVc6IEFETUlOX1JPVVRFX0FDVElPTl9ERUZBVUxULFxuXHRcdEVWRU5UX0NIRUNLSU46ICdldmVudF9yZWdpc3RyYXRpb25zJyxcblx0XHRDT05UQUNUX0xJU1Q6ICdjb250YWN0X2xpc3QnLFxuXHRcdFJFUE9SVFM6ICdyZXBvcnRzJyxcblx0fSxcblx0VFJBTlNBQ1RJT05TOiB7XG5cdFx0T1ZFUlZJRVc6IEFETUlOX1JPVVRFX0FDVElPTl9ERUZBVUxULFxuXHRcdFJFUE9SVFM6ICdyZXBvcnRzJyxcblx0fSxcblx0TUVTU0FHRVM6IHtcblx0XHRNRVNTQUdFX0FDVElWSVRZOiBBRE1JTl9ST1VURV9BQ1RJT05fREVGQVVMVCxcblx0XHRERUZBVUxUX01FU1NBR0VfVEVNUExBVEVTOiAnZ2xvYmFsX210cHMnLFxuXHRcdENVU1RPTV9NRVNTQUdFX1RFTVBMQVRFUzogJ2N1c3RvbV9tdHBzJyxcblx0XHRTRVRUSU5HUzogJ3NldHRpbmdzJyxcblx0fSxcblx0UFJJQ0VTOiB7XG5cdFx0REVGQVVMVF9QUklDSU5HOiBBRE1JTl9ST1VURV9BQ1RJT05fREVGQVVMVCxcblx0XHRQUklDRV9UWVBFUzogJ3ByaWNlX3R5cGVzJyxcblx0XHRUQVhfU0VUVElOR1M6ICd0YXhfc2V0dGluZ3MnLFxuXHR9LFxuXHRGT1JNUzoge1xuXHRcdFFVRVNUSU9OUzogQURNSU5fUk9VVEVfQUNUSU9OX0RFRkFVTFQsXG5cdFx0UVVFU1RJT05fR1JPVVBTOiAncXVlc3Rpb25fZ3JvdXBzJyxcblx0XHRSRUdfRk9STV9TRVRUSU5HUzogJ3ZpZXdfcmVnX2Zvcm1fc2V0dGluZ3MnLFxuXHR9LFxuXHRWRU5VRVM6IHtcblx0XHRPVkVSVklFVzogQURNSU5fUk9VVEVfQUNUSU9OX0RFRkFVTFQsXG5cdFx0Q0FURUdPUklFUzogJ2NhdGVnb3J5X2xpc3QnLFxuXHRcdEVESVQ6ICdlZGl0Jyxcblx0XHRHT09HTEVfTUFQUzogJ2dvb2dsZV9tYXBfc2V0dGluZ3MnLFxuXHR9LFxuXHRTRVRUSU5HUzoge1xuXHRcdFlPVVJfT1JHQU5JWkFUSU9OOiBBRE1JTl9ST1VURV9BQ1RJT05fREVGQVVMVCxcblx0XHRDUklUSUNBTF9QQUdFUzogJ2NyaXRpY2FsX3BhZ2VzJyxcblx0XHRBRE1JTl9PUFRJT05TOiAnYWRtaW5fb3B0aW9uX3NldHRpbmdzJyxcblx0XHRDT1VOVFJJRVM6ICdjb3VudHJ5X3NldHRpbmdzJyxcblx0XHRQUklWQUNZX1NFVFRJTkdTOiAncHJpdmFjeV9zZXR0aW5ncycsXG5cdH0sXG5cdFBBWU1FTlRfTUVUSE9EUzoge1xuXHRcdFBBWU1FTlRfTUVUSE9EUzogQURNSU5fUk9VVEVfQUNUSU9OX0RFRkFVTFQsXG5cdFx0U0VUVElOR1M6ICdwYXltZW50X3NldHRpbmdzJyxcblx0XHRMT0dTOiAncGF5bWVudF9sb2cnLFxuXHR9LFxuXHRNQUlOVEVOQU5DRToge1xuXHRcdE1BSU5URU5BTkNFOiBBRE1JTl9ST1VURV9BQ1RJT05fREVGQVVMVCxcblx0XHRSRVNFVF9PUl9ERUxFVEVfREFUQTogJ2RhdGFfcmVzZXQnLFxuXHRcdERBVEVUSU1FX1VUSUxJVElFUzogJ2RhdGV0aW1lX3Rvb2xzJyxcblx0XHRTWVNURU1fSU5GT1JNQVRJT046ICdzeXN0ZW1fc3RhdHVzJyxcblx0fSxcblx0U1VQUE9SVDoge1xuXHRcdFNVUFBPUlQ6IEFETUlOX1JPVVRFX0FDVElPTl9ERUZBVUxULFxuXHRcdEZBUTogJ2ZhcScsXG5cdFx0REVWRUxPUEVSUzogJ2RldmVsb3BlcnMnLFxuXHRcdFNIT1JUQ09ERVM6ICdzaG9ydGNvZGVzJyxcblx0fSxcblx0QUJPVVQ6IHtcblx0XHRXSEFUU19ORVc6IEFETUlOX1JPVVRFX0FDVElPTl9ERUZBVUxULFxuXHRcdEFCT1VUOiAnb3ZlcnZpZXcnLFxuXHRcdENSRURJVFM6ICdjcmVkaXRzJyxcblx0XHRSRVZJRVdTOiAncmV2aWV3cycsXG5cdH0sXG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgYWRtaW4gdXJsIGZvciBhIGdpdmVuIHBhZ2UgYW5kIGFjdGlvbi5cbiAqXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBwYWdlICBUaGUgbWFpbiBlZSBhZG1pbiBwYWdlIHN0cmluZ1xuICogQHBhcmFtIHsgc3RyaW5nIH0gYWN0aW9uIFRoaXMgc2hvdWxkIGNvcnJlc3BvbmQgdG8gdGhlIGFjdGlvbiBmb3IgdGhlIGFkbWluXG4gKiBcdFx0XHRcdFx0XHRcdHBhZ2UuXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gQSBmdWxsIHVybCBmb3IgdGhlIGdpdmVuIGFyZ3VtZW50cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEFkbWluVXJsID0gKFxuXHRwYWdlID0gQURNSU5fUk9VVEVTLkVWRU5UUyxcblx0YWN0aW9uID0gQURNSU5fUk9VVEVfQUNUSU9OX0RFRkFVTFRcbikgPT4ge1xuXHRyZXR1cm4gYCR7QURNSU5fVVJMfWFkbWluLnBocD9wYWdlPSR7cGFnZX0mYWN0aW9uPSR7YWN0aW9ufWA7XG59O1xuIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhJztcblxuLyoqXG4gKiBQcm92aWRlZCB2aWEgdGhlIGRhdGEgcGFzc2VkIGFsb25nIGJ5IHRoZSBzZXJ2ZXIuXG4gKiBUaGlzIGRhdGEgYSBjb25maWd1cmF0aW9uIG9iamVjdCBwYXNzZWQgYWxvbmcgZnJvbSB0aGUgc2VydmVyIHRoYXQgZXhwb3Nlc1xuICogdGhlIGRlZmF1bHQgdGltZXpvbmUgc2V0dGluZ3MgZnJvbSB0aGUgc2VydmVyLlxuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0IGNvbnN0IHtcblx0ZGVmYXVsdF90aW1lem9uZTogdGltZXpvbmVDb25maWcgPSB7XG5cdFx0cHJldHR5OiAnVVRDJyxcblx0XHRzdHJpbmc6ICdVVEMnLFxuXHRcdG9mZnNldDogMCxcblx0fSxcbn0gPSBkYXRhO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJ3cFwiXVtcImkxOG5cIl07IiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJ3cFwiXVtcInVybFwiXTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiBXb3JkUHJlc3MgaW1wb3J0c1xuICovXG5pbXBvcnQgKiBhcyB3cEkxOG4gZnJvbSAnQHdvcmRwcmVzcy9pMThuJztcblxuLyoqXG4gKiBFeHBvcnRlZCB0byB0aGUgYGVlanNgIGdsb2JhbC5cbiAqL1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBkYXRhIH0gZnJvbSAnLi9kYXRhJztcblxuLyoqXG4gKiBXcmFwcGVyIGFyb3VuZCB3cC5pMThuIGZ1bmN0aW9uYWxpdHkgc28gaXRzIGV4cG9zZWQgb24gdGhlIGVlanMgZ2xvYmFsIGFzXG4gKiBlZWpzLmkxOG47XG4gKi9cbmV4cG9ydCBjb25zdCBpMThuID0gd3BJMThuO1xuLyoqXG4gKiBleHBvcnRpbmcgcm91dGVzIHRvIGEgbmFtZWQgdmFyXG4gKi9cbmltcG9ydCAqIGFzIHIgZnJvbSAnLi9yb3V0ZXMnO1xuZXhwb3J0IGNvbnN0IHJvdXRlcyA9IHI7XG5cbi8qKlxuICogQ3VycmVuY3kgQ29uZmlndXJhdGlvbiBmb3IgdGhlIGRlZmF1bHQgY3VycmVuY3kgZnJvbSB0aGUgc2VydmVyXG4gKi9cbmV4cG9ydCB7IGN1cnJlbmN5Q29uZmlnIGFzIENVUlJFTkNZX0NPTkZJRyB9IGZyb20gJy4vY3VycmVuY3lfY29uZmlnJztcblxuLyoqXG4gKiBEZWZhdWx0IHRpbWV6b25lIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBkZWZhdWx0IHRpbWV6b25lIHNldHRpbmdzIGZyb20gdGhlXG4gKiBzZXJ2ZXJcbiAqL1xuZXhwb3J0IHsgdGltZXpvbmVDb25maWcgYXMgVElNRVpPTkVfQ09ORklHIH0gZnJvbSAnLi90aW1lem9uZS1jb25maWcnO1xuXG4vKipcbiAqIFNlcnZlciBsb2NhbGUgY29uZmlndXJhdGlvbi5cbiAqL1xuZXhwb3J0IHsgbG9jYWxlIGFzIFNFUlZFUl9MT0NBTEUgfSBmcm9tICcuL2xvY2FsZSc7XG5cbi8qKlxuICogQ3VzdG9tIGV4Y2VwdGlvbnNcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9leGNlcHRpb25zJztcblxuLyoqXG4gKiBNaWRkbGUtd2FyZXMgZm9yIHZhcmlvdXMgbGlicmFyaWVzXG4gKi9cbmltcG9ydCAqIGFzIG13IGZyb20gJy4vbWlkZGxld2FyZXMnO1xuZXhwb3J0IGNvbnN0IG1pZGRsZVdhcmVzID0gbXc7XG5cbi8qKlxuICogZW52aXJvbm1lbnQgY29uc3RhbnQgaW5kaWNhdGluZyBkZXZlbG9wbWVudCBzZXJ2ZXJcbiAqL1xuZXhwb3J0IGNvbnN0IF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xuIl0sIm5hbWVzIjpbImRhdGEiLCJjdXJyZW5jeV9jb25maWciLCJjdXJyZW5jeUNvbmZpZyIsImVlanNkYXRhIiwiRXhjZXB0aW9uIiwibWVzc2FnZSIsImFyZ3MiLCJpbnN0YW5jZSIsIkVycm9yIiwiT2JqZWN0Iiwic2V0UHJvdG90eXBlT2YiLCJnZXRQcm90b3R5cGVPZiIsImNhcHR1cmVTdGFja1RyYWNlIiwicHJvdG90eXBlIiwiY3JlYXRlIiwiY29uc3RydWN0b3IiLCJ2YWx1ZSIsImVudW1lcmFibGUiLCJ3cml0YWJsZSIsImNvbmZpZ3VyYWJsZSIsIl9fcHJvdG9fXyIsImRlZmF1bHQiLCJJbnZhbGlkU2NoZW1hIiwiSW52YWxpZEFyZ3VtZW50IiwiSW52YWxpZFRpbWV6b25lIiwiSW52YWxpZElTTzg2MDFTdHJpbmciLCJJbnZhbGlkTG9jYWxlIiwiSW52YWxpZERhdGV0aW1lIiwiSW52YWxpZFR5cGUiLCJJbnZhbGlkTW9kZWxFbnRpdHkiLCJhcmd1bWVudFZhbHVlIiwibmFtZSIsIkludmFsaWREYXRlVGltZSIsImRhdGV0aW1lIiwiZGF0ZVRpbWVTdHJpbmciLCJsb2NhbGUiLCJKU09OIiwic3RyaW5naWZ5IiwibW9kZWxFbnRpdHkiLCJzY2hlbWEiLCJ0aW1lem9uZSIsIlR5cGVFcnJvciIsInVzZXIiLCJzaXRlIiwiYWRkUXVlcnlBcmdzIiwiaGFzUXVlcnlBcmciLCJDT05URVhUX0NBUFNfUkVBRCIsIkNPTlRFWFRfQ0FQU19SRUFEX0FETUlOIiwiQ09OVEVYVF9DQVBTX0VESVQiLCJDT05URVhUX0NBUFNfREVMRVRFIiwic2hvdWxkQmVBcHBlbmRlZCIsInBhdGhUeXBlIiwib3B0aW9ucyIsIm1ldGhvZCIsImV4ZWMiLCJjYXBzTWlkZGxld2FyZSIsImNvbnRleHQiLCJuZXh0IiwidXJsIiwiY2FwcyIsInBhdGgiLCJmZXRjaCIsImFwaUZldGNoIiwicGF0aHMiLCJTSVRFX1VSTCIsInNpdGVfdXJsIiwiQURNSU5fVVJMIiwiYWRtaW5fdXJsIiwiQURNSU5fUk9VVEVTIiwiRVZFTlRTIiwiUkVHSVNUUkFUSU9OUyIsIlRSQU5TQUNUSU9OUyIsIk1FU1NBR0VTIiwiUFJJQ0VTIiwiUkVHSVNUUkFUSU9OX0ZPUk1TIiwiVkVOVUVTIiwiR0VORVJBTF9TRVRUSU5HUyIsIlBBWU1FTlRfTUVUSE9EUyIsIkVYVEVOU0lPTlNfQU5EX1NFUlZJQ0VTIiwiTUFJTlRFTkFOQ0UiLCJIRUxQX0FORF9TVVBQT1JUIiwiQUJPVVQiLCJBRE1JTl9ST1VURV9BQ1RJT05fREVGQVVMVCIsIkFETUlOX1JPVVRFX0FDVElPTlMiLCJPVkVSVklFVyIsIkNBVEVHT1JZX0xJU1QiLCJURU1QTEFURVMiLCJERUZBVUxUX1NFVFRJTkdTIiwiREVGQVVMVF9USUNLRVRTIiwiRVZFTlRfQ0hFQ0tJTiIsIkNPTlRBQ1RfTElTVCIsIlJFUE9SVFMiLCJNRVNTQUdFX0FDVElWSVRZIiwiREVGQVVMVF9NRVNTQUdFX1RFTVBMQVRFUyIsIkNVU1RPTV9NRVNTQUdFX1RFTVBMQVRFUyIsIlNFVFRJTkdTIiwiREVGQVVMVF9QUklDSU5HIiwiUFJJQ0VfVFlQRVMiLCJUQVhfU0VUVElOR1MiLCJGT1JNUyIsIlFVRVNUSU9OUyIsIlFVRVNUSU9OX0dST1VQUyIsIlJFR19GT1JNX1NFVFRJTkdTIiwiQ0FURUdPUklFUyIsIkVESVQiLCJHT09HTEVfTUFQUyIsIllPVVJfT1JHQU5JWkFUSU9OIiwiQ1JJVElDQUxfUEFHRVMiLCJBRE1JTl9PUFRJT05TIiwiQ09VTlRSSUVTIiwiUFJJVkFDWV9TRVRUSU5HUyIsIkxPR1MiLCJSRVNFVF9PUl9ERUxFVEVfREFUQSIsIkRBVEVUSU1FX1VUSUxJVElFUyIsIlNZU1RFTV9JTkZPUk1BVElPTiIsIlNVUFBPUlQiLCJGQVEiLCJERVZFTE9QRVJTIiwiU0hPUlRDT0RFUyIsIldIQVRTX05FVyIsIkNSRURJVFMiLCJSRVZJRVdTIiwiZ2V0QWRtaW5VcmwiLCJwYWdlIiwiYWN0aW9uIiwiZGVmYXVsdF90aW1lem9uZSIsInRpbWV6b25lQ29uZmlnIiwicHJldHR5Iiwic3RyaW5nIiwib2Zmc2V0Iiwid3BJMThuIiwiaTE4biIsInIiLCJyb3V0ZXMiLCJDVVJSRU5DWV9DT05GSUciLCJUSU1FWk9ORV9DT05GSUciLCJTRVJWRVJfTE9DQUxFIiwibXciLCJtaWRkbGVXYXJlcyIsIl9fREVWX18iLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiXSwic291cmNlUm9vdCI6IiJ9
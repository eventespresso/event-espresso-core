this["eejs"] = this["eejs"] || {}; this["eejs"]["valueObjects"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/vo/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/utils/parse-infinity.js":
/*!********************************************!*\
  !*** ./assets/src/utils/parse-infinity.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

/**
 * converts infinite values to null for use in forms
 *
 * @function
 * @param {null|number|string} number
 * @param {boolean} asInt
 * @param {boolean} forDb
 * @return {number} converted infinite value
 */

var parseInfinity = function parseInfinity(number) {
  var asInt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var forDb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  // returns true for any possible value that could represent infinity
  var representsInfinity = function representsInfinity(value) {
    return value === -1 || value === '' || value === 'INF' || value === Infinity || Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isNil"])(value);
  };

  number = representsInfinity(number) || number.type && number.type.name === 'InfinitySymbol' && representsInfinity(number.props.value) ? Infinity : number;
  number = number !== Infinity && asInt ? parseInt(number, 10) : number;
  number = !forDb || forDb && number !== Infinity ? number : -1;
  return number;
};

/* harmony default export */ __webpack_exports__["default"] = (parseInfinity);

/***/ }),

/***/ "./assets/src/vo/currency.js":
/*!***********************************!*\
  !*** ./assets/src/vo/currency.js ***!
  \***********************************/
/*! exports provided: Currency, SiteCurrency, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Currency", function() { return Currency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SiteCurrency", function() { return SiteCurrency; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_5__);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External imports
 */



/**
 * A value object representing currency values
 */

var Currency =
/*#__PURE__*/
function () {
  /**
   * The ISO 4217 code identifying the currency (eg. 'USD')
   *
   * @type {string}
   */

  /**
   * The singular label for the currency (eg. 'Dollar');
   *
   * @type {string}
   */

  /**
   * The plural label for the currency (eg. 'Dollars');
   *
   * @type {string}
   */

  /**
   * The currency symbol (eg. '$');
   *
   * @type {string}
   */

  /**
   * Whether the currency symbol is displayed before or after the value.
   *
   * @type {boolean}
   */

  /**
   * The precision for the value (eg. 10.02 is 2, 10.123 is 3). The number of
   * decimal places can be used to calculate the number of subunits for the
   * currency - subunits = pow( 10, decimalPlaces).
   *
   * @type {number}
   */

  /**
   * The symbol used for the decimal mark (eg. '.')
   *
   * @type {string}
   */

  /**
   * The symbol used to split up thousands in the value (eg. ',')
   *
   * @type {string}
   */

  /**
   * The number of fractional divisions of a currency's main unit.  If not
   * provided, then it is automatically calculated from the decimalPlaces
   * value.
   *
   * @type {number}
   */

  /**
   * Constructor
   *
   * @param {{}} currencyConfig An object containing the configuration for
   * this currency value object.  On construction, the Currency object is
   * frozen so that it becomes immutable.
   */
  function Currency(currencyConfig) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Currency);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "code", '');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "singularLabel", '');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "pluralLabel", '');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "sign", '');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "signB4", true);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "decimalPlaces", 2);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "decimalMark", '.');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "thousandsSeparator", ',');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "subunits", 100);

    Currency.validateCurrencyConfig(currencyConfig);
    this.code = currencyConfig.code;
    this.singularLabel = currencyConfig.singularLabel || '';
    this.pluralLabel = currencyConfig.pluralLabel || '';
    this.sign = currencyConfig.sign;
    this.signB4 = Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isUndefined"])(currencyConfig.signB4) ? this.signB4 : currencyConfig.signB4;
    this.decimalPlaces = Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isUndefined"])(currencyConfig.decimalPlaces) ? this.decimalPlaces : currencyConfig.decimalPlaces;
    this.decimalMark = currencyConfig.decimalMark || this.decimalMark;
    this.thousandsSeparator = currencyConfig.thousandsSeparator || this.thousandsSeparator;
    this.subunits = currencyConfig.subunits || Math.pow(10, this.decimalPlaces);
    Object.freeze(this);
  }
  /**
   * Returns the currency properties as an object formatted for the
   * accounting-js library configuration.
   *
   * @return {{}}  An object shaped for what the accounting-js library expects
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Currency, [{
    key: "toAccountingSettings",
    value: function toAccountingSettings() {
      var decimalInfo = {
        decimal: this.decimalMark,
        thousand: this.thousandsSeparator,
        precision: this.decimalPlaces
      };
      return {
        currency: _objectSpread({
          symbol: this.sign,
          format: {
            pos: this.signB4 ? '%s%v' : '%v%s',
            neg: this.signB4 ? '- $s%v' : '- %v%s',
            zero: this.signB4 ? '%s%v' : '%v%s'
          }
        }, decimalInfo),
        number: decimalInfo
      };
    }
    /**
     * Returns JSON representation of this object.
     *
     * @return {Object} Function returning the object to be serialized by
     * JSON.stringify
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        code: this.code,
        singularLabel: this.singularLabel,
        pluralLabel: this.pluralLabel,
        sign: this.sign,
        signB4: this.signB4,
        decimalMark: this.decimalMark,
        thousandsSeparator: this.thousandsSeparator,
        subunits: this.subunits,
        decimalPlaces: this.decimalPlaces
      };
    }
    /**
     * This validates whether the passed in config has the required properties
     * (and correct types) for constructing a Currency object.
     *
     * @param {{}} config
     * @throws {Exception}
     * @throws {TypeError}
     */

  }]);

  return Currency;
}();
/**
 * Export of a Currency Value object created from a currency config provided.
 * This catches any exception and triggers a console error.
 *
 * @param {{}} config
 * @return {Currency|{}} If there's a problem constructing the currency object
 * an empty object is returned.
 */

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Currency, "validateCurrencyConfig", function (config) {
  if (Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(config)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__["Exception"]('The configuration object provided to Currency must not' + ' be empty');
  }

  if (!config.code || !Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isString"])(config.code)) {
    throw new TypeError('The configuration object provided to Currency must have ' + 'a "code" property that is a string.');
  }

  if (!config.sign || !Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isString"])(config.sign)) {
    throw new TypeError('The configuration object provided to Currency must have a ' + '"sign" property that is a string.');
  }

  if (config.singularLabel && !Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isString"])(config.singularLabel)) {
    throw new TypeError('The singularLabel property on the configuration object ' + 'must be a string primitive.');
  }

  if (config.pluralLabel && !Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isString"])(config.pluralLabel)) {
    throw new TypeError('The pluralLabel property on the configuration object ' + 'must be a string primitive.');
  }

  if (config.signB4 && !Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isBoolean"])(config.signB4)) {
    throw new TypeError('The signB4 property on the configuration object ' + 'must be a boolean primitive.');
  }

  if (config.decimalPlaces && !Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isNumber"])(config.decimalPlaces)) {
    throw new TypeError('The decimalPlaces property on the configuration object ' + 'must be a number primitive');
  }

  if (config.decimalMark && !Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isString"])(config.decimalMark)) {
    throw new TypeError('The decimalMark property on the configuration object ' + 'must be a string primitive.');
  }

  if (config.thousandsSeparator && !Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isString"])(config.thousandsSeparator)) {
    throw new TypeError('The thousandsSeparator property on the configuration object ' + 'must be a string primitive.');
  }

  if (config.subunits && !Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isNumber"])(config.subunits)) {
    throw new TypeError('The subunits property on the configuration object ' + 'must be a number primitive.');
  }
});

var SiteCurrency = function SiteCurrency() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var currency;

  try {
    currency = new Currency(config);
  } catch (e) {
    currency = {};
    warning__WEBPACK_IMPORTED_MODULE_5___default()(false, 'The Site Currency object could not be created because ' + 'of this error: ' + e.message);
  }

  return currency;
};
/* harmony default export */ __webpack_exports__["default"] = (SiteCurrency(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__["CURRENCY_CONFIG"]));

/***/ }),

/***/ "./assets/src/vo/date-time/assertions.js":
/*!***********************************************!*\
  !*** ./assets/src/vo/date-time/assertions.js ***!
  \***********************************************/
/*! exports provided: validateLocale, assertLocaleIsValid, validateISO8601, assertISO8601IsValid, validateTimezone, assertTimezoneIsValid, validateIsDate, assertIsDate, validateIsOffset, assertIsOffset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateLocale", function() { return validateLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertLocaleIsValid", function() { return assertLocaleIsValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateISO8601", function() { return validateISO8601; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertISO8601IsValid", function() { return assertISO8601IsValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateTimezone", function() { return validateTimezone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertTimezoneIsValid", function() { return assertTimezoneIsValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateIsDate", function() { return validateIsDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertIsDate", function() { return assertIsDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateIsOffset", function() { return validateIsOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertIsOffset", function() { return assertIsOffset; });
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__);
/**
 * External imports
 */


/**
 * Internal imports
 */


/**
 * Validates whether the given locale string is a valid locale.
 *
 * @param  {string} locale
 * @return {boolean} If given locale string is not valid this will return false.
 */

function validateLocale(locale) {
  if (!Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isString"])(locale)) {
    return false;
  }

  var originalLocale = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.locale();
  var validationLocale = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.locale(locale); // reset back to original locale

  moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.locale(originalLocale);
  return !(locale !== 'en' && validationLocale === 'en');
}
/**
 * Asserts whether given locale string is valid.  If it's not an exception is
 * thrown.
 *
 * @param {string} locale
 * @throws InvalidLocale
 */

function assertLocaleIsValid(locale) {
  if (!validateLocale(locale)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__["InvalidLocale"](locale);
  }
}
/**
 * Validates whether the given string is a valid ISO8601 formatted date and
 * time string.
 *
 * Note: date regex pattern from
 * http://www.pelagodesign.com/blog/2009/05/20/iso-8601-date-validation-that-doesnt-suck/
 * Note: isDuration regex pattern from
 * https://github.com/cylc/cylc/issues/119#issuecomment-9435533
 *
 * @param {string} dateTimeString
 * @param {boolean} isDuration  Whether to validate for a duration format or not.
 * @return {boolean}  Returns false if the given string is not valid ISO8601
 * format
 */

function validateISO8601(dateTimeString) {
  var isDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isString"])(dateTimeString)) {
    return false;
  }

  var regex = isDuration ? /^(R\d*\/)?P(?:\d+(?:\.\d+)?Y)?(?:\d+(?:\.\d+)?M)?(?:\d+(?:\.\d+)?W)?(?:\d+(?:\.\d+)?D)?(?:T(?:\d+(?:\.\d+)?H)?(?:\d+(?:\.\d+)?M)?(?:\d+(?:\.\d+)?S)?)?$/ : /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
  return regex.test(dateTimeString);
}
/**
 * Asserts whether the given string is a valid ISO8601 formatted date and time
 * string.
 *
 * @param {string} dateTimeString
 * @param {boolean} isDuration  Whether to assert for a duration format or not.
 * @throws InvalidISO8601String
 */

function assertISO8601IsValid(dateTimeString) {
  var isDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!validateISO8601(dateTimeString, isDuration)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__["InvalidISO8601String"](dateTimeString);
  }
}
/**
 * Validates whether the given string is a valid timezone string.
 *
 * @param {string} timezone
 * @return {boolean} Returns false if the given string is not a valid timezone
 * string
 */

function validateTimezone(timezone) {
  if (!Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isString"])(timezone)) {
    return false;
  }

  var dt = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.tz.zone(timezone);
  return dt !== null;
}
/**
 * Asserts whether the given string is a valid timezone string and throws an
 * exception if it isn't.
 *
 * @param {string} timezone
 * @throws InvalidTimezone
 */

function assertTimezoneIsValid(timezone) {
  if (!validateTimezone(timezone)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__["InvalidTimezone"](timezone);
  }
}
/**
 * Validates whether the given value is an instance of the javascript Date
 * object.
 *
 * @param {Date} date
 * @return {boolean} True means the value is an instance of Date
 */

function validateIsDate(date) {
  return date instanceof Date;
}
/**
 * Asserts whether the given value is an instance of Date.
 *
 * @param {Date} date
 * @throws TypeError
 */

function assertIsDate(date) {
  if (!validateIsDate(date)) {
    throw new TypeError('The provided value is not an instance of Date');
  }
}
/**
 * Validates whether the provided value is a valid offset
 *
 * Currently this just validates the provided value is a number. Eventually it
 * might check upper and lower limits.
 *
 * @param {number} offset
 * @return {boolean}  true means its valid.
 */

function validateIsOffset(offset) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(offset);
}
/**
 * Asserts whether the provided value is a valid offset.
 *
 * @param {number} offset
 * @throws TypeError
 */

function assertIsOffset(offset) {
  if (!validateIsOffset(offset)) {
    throw new TypeError('Offset is expected to be a number');
  }
}

/***/ }),

/***/ "./assets/src/vo/date-time/datetime.js":
/*!*********************************************!*\
  !*** ./assets/src/vo/date-time/datetime.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DateTime; });
/* harmony import */ var _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/construct */ "./node_modules/@babel/runtime/helpers/construct.js");
/* harmony import */ var _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assertions */ "./assets/src/vo/date-time/assertions.js");
/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./duration */ "./assets/src/vo/date-time/duration.js");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./defaults */ "./assets/src/vo/date-time/defaults.js");






/**
 * External imports
 */




/**
 * Internal imports
 */




/**
 * A collection of symbols used for "private" properties in the DateTime object.
 *
 * @type {Object}
 * 	{
 * 		datetime: Symbol
 * 	}
 */

var privateProperties = {
  datetime: Symbol('DateTimePropertyDateTime')
};
/**
 * A collection of symbols used for "private" methods in the DateTime object.
 *
 * @type {Object}
 * 	getUnitNames: Symbol,
 * 	createGettersAndSetters: Symbol,
 * 	extractMomentsFromDateTimes: Symbol,
 * 	normalizeUnitName: Symbol,
 * 	normalizeUnitObject: Symbol,
 * 	normalizeUnitValue: Symbol,
 * 	}
 */

var privateMethods = {
  getUnitNames: Symbol('DateTimeMethodGetUnitNames'),
  createGettersAndSetters: Symbol('DateTimeMethodCreateGettersAndSetters'),
  extractMomentsFromDateTimes: Symbol('DateTimeMethodExtractMomentsFromDateTimes'),
  normalizeUnitName: Symbol('DateTimeMethodNormalizeUnitName'),
  normalizeUnitObject: Symbol('DateTimeMethodNormalizeUnitObject'),
  normalizeUnitValue: Symbol('DateTimeMethodNormalizeUnitValue'),
  normalizeArguments: Symbol('DateTimeMethodNormalizeArguments')
};
var validDateTimeUnits = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'];
/**
 * The DateTime value object represents a single point in time.
 *
 * Internally, the DateTime class here uses `moment`.  This is an abstraction
 * loosely following the adapter pattern so that there is a common api that
 * can be depended on if in the future the internal library is switched to
 * something different (such as Luxon).
 */

var DateTime =
/*#__PURE__*/
function () {
  /**
   * The constructor for the DateTime class
   *
   * @param {string} iso8601DateString
   * @param {string|null} timezone If null, then timezone is not set.
   * @param {string} locale
   */
  function DateTime() {
    var iso8601DateString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_TIMEZONE_STRING"];
    var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_VALID_LOCALE"];

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, DateTime);

    if (iso8601DateString !== '') {
      this.constructor.assertISO8601IsValid(iso8601DateString);
    }

    this.constructor.assertLocaleIsValid(locale);

    if (timezone === null) {
      this[privateProperties.datetime] = iso8601DateString === '' ? moment_timezone__WEBPACK_IMPORTED_MODULE_6___default.a.utc().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_6___default()(iso8601DateString).utcOffset(iso8601DateString).locale(locale);
    } else if (timezone === this.constructor.TIMEZONE_LOCAL) {
      this[privateProperties.datetime] = iso8601DateString === '' ? moment_timezone__WEBPACK_IMPORTED_MODULE_6___default()().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_6___default()(iso8601DateString).locale(locale);
    } else {
      this.constructor.assertTimezoneIsValid(timezone);
      this[privateProperties.datetime] = iso8601DateString === '' ? moment_timezone__WEBPACK_IMPORTED_MODULE_6___default()().tz(timezone).locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_6___default.a.tz(iso8601DateString, timezone).locale(locale);
    }

    this[privateMethods.createGettersAndSetters]();
    Object.freeze(this);
  }
  /**
   * Indicates if the given locale is a valid locale.
   *
   * @param {string} locale
   * @return {boolean} true means it is valid
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(DateTime, [{
    key: privateMethods.getUnitNames,

    /**
     * Returns the date and time unit names
     *
     * @return {string[]} An array of unit names
     */
    value: function value() {
      return validDateTimeUnits;
    }
    /**
     * Creates the various getter and setters for the value object.
     */

  }, {
    key: privateMethods.createGettersAndSetters,
    value: function value() {
      var _this = this;

      this[privateMethods.getUnitNames]().forEach(function (unitName) {
        // creates accessor for getting the unit value via a
        // property (eg. instance.hour)
        Object.defineProperty(_this, unitName, {
          get: function get() {
            var methodName = this.constructor[privateMethods.normalizeUnitName](unitName);
            var unitValue = this[privateProperties.datetime][methodName]();
            return this.constructor[privateMethods.normalizeUnitValue](unitName, unitValue, false);
          }
        }); // creates a fluent setter for the value.

        Object.defineProperty(_this, 'set' + Object(lodash__WEBPACK_IMPORTED_MODULE_5__["capitalize"])(unitName), {
          get: function get() {
            var _this2 = this;

            return function (value) {
              return _this2.set(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, unitName, value));
            };
          }
        });
      });
    }
    /**
     * Used to set various parts of the datetime string and returns a NEW
     * instance of DateTime
     *
     * Note: this will construct a DateTime even with invalid units. Make use of
     * `isValid()` to determine whether the instance is a valid DateTime or not.
     *
     * @param {{}} setObject An object where keys are the units.
     * @return {DateTime|ServerDateTime} A new instance of DateTime.
     */

  }, {
    key: "set",
    value: function set() {
      var setObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      setObject = this.constructor[privateMethods.normalizeUnitObject](setObject);
      var instanceArguments = this.constructor[privateMethods.normalizeArguments](this[privateProperties.datetime].clone().set(setObject).toISOString(), this.timezone, this.locale);
      return _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0___default()(this.constructor, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(instanceArguments));
    }
    /**
     * Accessor for the timezone string.
     *
     * @return {string} The timezone string
     */

  }, {
    key: "setTimezone",

    /**
     * Fluent setter for the timezone property.
     *
     * @param {string} timezone
     * @return {DateTime|ServerDateTime} Returns a new instance of DateTime
     */
    value: function setTimezone(timezone) {
      this.constructor.assertTimezoneIsValid(timezone);
      var instanceArguments = this.constructor[privateMethods.normalizeArguments](this[privateProperties.datetime].toISOString(), timezone, this.locale);
      return _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0___default()(this.constructor, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(instanceArguments));
    }
    /**
     * Returns the number of days for the month set in this instance.
     *
     * @return {number}  The number of days in the month.
     */

  }, {
    key: "setOffset",

    /**
     * A fluent setter for the UTC offset.
     *
     * The offset provided defaults to expecting in minutes.  However if the
     * input is less than 16 and greater than -16, it will interpret the input
     * as hours instead.
     *
     * @param {number} offset
     * @return {DateTime|ServerDateTime} returns a new instance of DateTime
     */
    value: function setOffset(offset) {
      this.constructor.assertIsOffset(offset);
      return this.constructor.fromMoment(this[privateProperties.datetime].clone().utcOffset(offset));
    }
    /**
     * Exposes the day of the year for the date and time in the object.
     *
     *
     * @return {number} A number between 1 and 366 (depending on whether the
     * internal date and time is in a leap year or not).
     */

  }, {
    key: "setLocale",

    /**
     * A fluent setter for setting the locale.
     *
     * @param {string} locale
     * @return {DateTime|ServerDateTime} a new instance of DateTime equivalent to this one but
     * with different locale.
     */
    value: function setLocale(locale) {
      this.constructor.assertLocaleIsValid(locale);
      return this.constructor.fromMoment(this[privateProperties.datetime].clone().locale(locale));
    }
    /**
     * Whether this DateTime instance is valid.
     *
     * Typically an invalid state is achieved when the internal moment is
     * invalid.  This can happen when the moment instance is created with
     * invalid parameters.
     *
     * Note: with moment.timezone (which is the internal library),
     * moment.isValid() could return true, false or a string for why it's
     * invalid.  This is why a strict equality check is done for whether it is
     * true or not.
     *
     * @return {boolean}  True means the instance is valid.
     */

  }, {
    key: "isValid",
    value: function isValid() {
      return this[privateProperties.datetime].isValid() === true;
    }
    /**
     * Returns the difference between two DateTime instances as a Duration.
     *
     * @param {DateTime} otherDateTime
     * @return {Duration} An instance of Duration representing the difference
     * between the two DateTime objects.
     */

  }, {
    key: "diff",
    value: function diff(otherDateTime) {
      this.constructor.assertIsDateTime(otherDateTime);
      return new _duration__WEBPACK_IMPORTED_MODULE_10__["default"](moment_timezone__WEBPACK_IMPORTED_MODULE_6___default.a.duration(this[privateProperties.datetime].diff(otherDateTime[privateProperties.datetime])));
    }
    /**
     * Returns the difference between this DateTime and "now" as a Duration.
     *
     * @return {Duration} An instance of Duration representing the difference
     * between this DateTime and "now"
     */

  }, {
    key: "diffNow",
    value: function diffNow() {
      return new _duration__WEBPACK_IMPORTED_MODULE_10__["default"](moment_timezone__WEBPACK_IMPORTED_MODULE_6___default.a.duration(this[privateProperties.datetime].diff(moment_timezone__WEBPACK_IMPORTED_MODULE_6___default()())));
    }
    /**
     * Set the value of this DateTime to the end (i.e. the last millisecond) of
     * a unit of time.
     *
     * @param {string} unit
     * @return {DateTime|ServerDateTime} Returns a new DateTime instance.
     */

  }, {
    key: "endOf",
    value: function endOf(unit) {
      return this.constructor.fromMoment(this[privateProperties.datetime].clone().endOf(unit));
    }
    /**
     * Compares this DateTime with provided DateTime and returns whether they
     * are equal to each other.
     *
     * The two DateTimes are considered equal if they represent the same
     * millisecond, have the same zone and location, and are both valid.
     *
     * @param {DateTime} otherDateTime
     * @return {boolean}  True means they are equal
     */

  }, {
    key: "equals",
    value: function equals(otherDateTime) {
      this.constructor.assertIsDateTime(otherDateTime);
      return this[privateProperties.datetime].isSame(otherDateTime[privateProperties.datetime]);
    }
    /**
     * Whether this DateTime is in the same unit of time as another DateTime
     *
     * eg. DateTime.fromLocal().hasSame( otherDT, 'day' ) //~> true if both the
     * same calendar day.
     *
     * Note: this will match all units equal or larger.  For example, passing in
     * `month` will check `month` and `year`.  So it's not only checking if the
     * two dates share the same month, but that they are the same month in the
     * same year.  If you passed in day, it would return whether the provided
     * DateTime is in the same day, month and year as this DateTime.
     *
     * @param {DateTime} otherDateTime
     * @param {string} unit
     * @return {boolean}  True means they are both in the same time for the
     * given unit.
     */

  }, {
    key: "hasSame",
    value: function hasSame(otherDateTime, unit) {
      this.constructor.assertIsDateTime(otherDateTime);
      return this[privateProperties.datetime].isSame(otherDateTime[privateProperties.datetime], unit);
    }
    /**
     * Subtract a period of time (represented by a Duration) from this DateTime
     * and return the resulting DateTime.
     *
     * @param {Duration} duration
     * @return {DateTime|ServerDateTime} A new instance of DateTime for the new date and time.
     */

  }, {
    key: "minus",
    value: function minus(duration) {
      _duration__WEBPACK_IMPORTED_MODULE_10__["default"].assertIsValidDuration(duration);
      return this.constructor.fromMoment(this[privateProperties.datetime].clone().subtract(duration.toObject()));
    }
    /**
     * Add a period of time (represented by a Duration) to this DateTime and
     * return the resulting DateTime
     *
     * @param {Duration} duration
     * @return {DateTime|ServerDateTime} A new instance of DateTime for the new date and time.
     */

  }, {
    key: "plus",
    value: function plus(duration) {
      _duration__WEBPACK_IMPORTED_MODULE_10__["default"].assertIsValidDuration(duration);
      return this.constructor.fromMoment(this[privateProperties.datetime].clone().add(duration.toObject()));
    }
    /**
     * Set the value of this DateTime to the beginning of a specified unit of
     * time and return a new DateTime representing that.
     *
     * eg.
     * startOf( DateTime.UNIT_YEAR ) //sets to January 1st, 12:00am this
     * year.
     * startOf( DateTime.UNIT_MONTH ) //sets to the first of this month, 12:00am
     *
     * @param {string} unit
     * @return {DateTime|ServerDateTime} A new instance of DateTime
     */

  }, {
    key: "startOf",
    value: function startOf(unit) {
      return this.constructor.fromMoment(this[privateProperties.datetime].clone().startOf(unit));
    }
    /**
     * Returns a string representation of this DateTime formatted according to
     * the specified format string.
     *
     * @link https://momentjs.com/docs/#/displaying/format/
     * @see Moment format ^^ section for the available formats that can be used.
     *
     * An empty format value will return the string formatted in ISO 8601 with
     * any offset included.
     *
     * Without any argument passed, the format will be whatever string the
     * format is server side.
     *
     * @param {string} format
     * @return {string}  The date and time displayed according to the provided
     * format.
     */

  }, {
    key: "toFormat",
    value: function toFormat() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_FORMAT"];
      return this[privateProperties.datetime].format(format);
    }
    /**
     * Returns a string representation of this DateTime formatted according to
     * the ISO 8601 standard.
     *
     * If `inUTC` is true (default) then `toISO` will return the ISO string in
     * UTC. Otherwise it will include the offset information for the internal
     * timezone/offset on the moment in time.
     *
     * @param {boolean} inUTC
     * @return {string} An ISO8601 string
     */

  }, {
    key: "toISO",
    value: function toISO() {
      var inUTC = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return inUTC ? this[privateProperties.datetime].toISOString() : this[privateProperties.datetime].toISOString(true);
    }
    /**
     * Returns the value for this DateTime as a javascript Date object.
     *
     * @return {Date} A javascript Date instance
     */

  }, {
    key: "toJSDate",
    value: function toJSDate() {
      return this[privateProperties.datetime].toDate();
    }
    /**
     * When serializing an object to JSON, if there is a DateTime instance, it
     * will be represented as an ISO8601 string.
     *
     * @return {string} An ISO 8601 string
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this[privateProperties.datetime].toISOString();
    }
    /**
     * Converts a DateTime to whatever the "local" time is.
     *
     * @return {DateTime|ServerDateTime} a new instance of the DateTime
     */

  }, {
    key: "toLocal",
    value: function toLocal() {
      return this.constructor.fromMoment(this[privateProperties.datetime].clone().local());
    }
    /**
     * Returns the milliseconds since the Unix Epoch for the current DateTime
     * instance.
     *
     * @return {number} Number of milliseconds since Unix Epoch
     */

  }, {
    key: "toMillis",
    value: function toMillis() {
      return this.valueOf();
    }
    /**
     * Returns a simple object containing year, month, day, hour,
     * minute, second, and millisecond.
     *
     * @return {Object} An object with year, month, day, hour, minute, second,
     * and millisecond.
     */

  }, {
    key: "toObject",
    value: function toObject() {
      var _this3 = this;

      var datetime = this[privateProperties.datetime].toObject();
      return Object(lodash__WEBPACK_IMPORTED_MODULE_5__["reduce"])(datetime, function (result, value, key) {
        key = _this3.constructor[privateMethods.normalizeUnitName](key);
        result[key] = _this3.constructor[privateMethods.normalizeUnitValue](key, value, false);
        return result;
      }, {});
    }
    /**
     * Converts the DateTime's timezone to UTC.
     *
     * @return {DateTime|ServerDateTime} A new instance of DateTime
     */

  }, {
    key: "toUTC",
    value: function toUTC() {
      return this.constructor.fromMoment(this[privateProperties.datetime].clone().utc());
    }
    /**
     * Returns an english string representation of this DateTime when the instance is
     * coerced to a string (similar format to JS `Date.toString()`.
     *
     * eg `Tue Dec 25 2018 10:15:00 GMT+0000`
     *
     * @return {string} A string representation of this DateTime
     */

  }, {
    key: "toString",
    value: function toString() {
      return this[privateProperties.datetime].toString();
    }
    /**
     * When DateTime is coerced to number this will ensure its displayed as the
     * number of milliseconds since the Unix Epoch for the current DateTime
     *
     * @return {number} Amount of milliseconds since the Unix Epoch
     */

  }, {
    key: "valueOf",
    value: function valueOf() {
      return this[privateProperties.datetime].valueOf();
    }
  }, {
    key: "timezone",
    get: function get() {
      return this[privateProperties.datetime].tz();
    }
  }, {
    key: "daysInMonth",
    get: function get() {
      return this[privateProperties.datetime].daysInMonth();
    }
    /**
     * Whether the current instance in time is currently in Daylight Savings
     * Time.
     *
     * @return {boolean} True means it is currently in Daylight Savings Time.
     */

  }, {
    key: "isInDST",
    get: function get() {
      return this[privateProperties.datetime].isDST();
    }
    /**
     * Whether the current instance in time is currently in a leap year.
     *
     * @return {boolean} True means this date time is in a leap year.
     */

  }, {
    key: "isInLeapYear",
    get: function get() {
      return this[privateProperties.datetime].isLeapYear();
    }
    /**
     * Returns the offset from UTC for the current instance in time (in minutes).
     *
     * @return {number}  The offset is in minutes
     */

  }, {
    key: "offset",
    get: function get() {
      return this[privateProperties.datetime].utcOffset();
    }
  }, {
    key: "dayOfYear",
    get: function get() {
      return this[privateProperties.datetime].dayOfYear();
    }
    /**
     * Exposes the quarter for the date and time in the object.
     *
     * @return {number} A number between 1 and 4
     */

  }, {
    key: "quarter",
    get: function get() {
      return this[privateProperties.datetime].quarter();
    }
    /**
     * Exposes the ISO number of the week for the date and time in the object.
     *
     * @link https://en.wikipedia.org/wiki/ISO_week_date
     * @return {number} Will be a number between 1 and 52ish
     */

  }, {
    key: "isoWeekNumber",
    get: function get() {
      return this[privateProperties.datetime].isoWeek();
    }
    /**
     * Exposes the ISO number for the week year for the date and time in the
     * object.
     *
     * @link https://en.wikipedia.org/wiki/ISO_week_date
     * @return {number}  Will be a number representing a year.
     */

  }, {
    key: "isoWeekYear",
    get: function get() {
      return this[privateProperties.datetime].isoWeekYear();
    }
    /**
     * Exposes the ISO number for the day of the week for the date and time in
     * the object.
     *
     * @link https://en.wikipedia.org/wiki/ISO_week_date
     * @return {number} A number between 1 and 7 (Monday is 1 and Sunday is 7)
     */

  }, {
    key: "isoWeekDay",
    get: function get() {
      return this[privateProperties.datetime].isoWeekday();
    }
    /**
     * Exposes the number of weeks in this DateTime's year.
     *
     * @link https://en.wikipedia.org/wiki/ISO_week_date
     * @return {number} The number of weeks in the ISO year.
     */

  }, {
    key: "isoWeeksInWeekYear",
    get: function get() {
      return this[privateProperties.datetime].isoWeeksInYear();
    }
    /**
     * Returns what the set locale is for this DateTime
     *
     * @return {string} A locale string
     */

  }, {
    key: "locale",
    get: function get() {
      return this[privateProperties.datetime].locale();
    }
  }], [{
    key: "validateLocale",
    value: function validateLocale(locale) {
      return _assertions__WEBPACK_IMPORTED_MODULE_9__["validateLocale"](locale);
    }
    /**
     * Asserts if the given locale is valid and throws an error if not.
     *
     * @param {string} locale
     * @throws InvalidLocale
     */

  }, {
    key: "assertLocaleIsValid",
    value: function assertLocaleIsValid(locale) {
      _assertions__WEBPACK_IMPORTED_MODULE_9__["assertLocaleIsValid"](locale);
    }
    /**
     * Indicates if the given ISO8601 string is valid.
     *
     * @param {string} dateTimeString
     * @return {boolean} true means it is valid.
     */

  }, {
    key: "validateISO8601",
    value: function validateISO8601(dateTimeString) {
      return _assertions__WEBPACK_IMPORTED_MODULE_9__["validateISO8601"](dateTimeString);
    }
    /**
     * Asserts if the given string is a valid ISO 8601 string.
     *
     * @param {string} dateTimeString
     * @throws InvalidISO8601String
     */

  }, {
    key: "assertISO8601IsValid",
    value: function assertISO8601IsValid(dateTimeString) {
      _assertions__WEBPACK_IMPORTED_MODULE_9__["assertISO8601IsValid"](dateTimeString);
    }
    /**
     * Indicates if the given string is a valid timezone
     *
     * @param {string} timezone
     * @return {boolean} true means it is valid.
     */

  }, {
    key: "validateTimezone",
    value: function validateTimezone(timezone) {
      return _assertions__WEBPACK_IMPORTED_MODULE_9__["validateTimezone"](timezone);
    }
    /**
     * Asserts whether the given string is a valid timezone string.
     *
     * @param {string} timezone
     * @throws InvalidTimezone
     */

  }, {
    key: "assertTimezoneIsValid",
    value: function assertTimezoneIsValid(timezone) {
      _assertions__WEBPACK_IMPORTED_MODULE_9__["assertTimezoneIsValid"](timezone);
    }
    /**
     * Validates whether the provided value is a valid offset
     *
     * Currently this just validates the provided value is a number. Eventually it
     * might check upper and lower limits.
     *
     * @param {number} offset
     * @return {boolean}  true means its valid.
     */

  }, {
    key: "validateIsOffset",
    value: function validateIsOffset(offset) {
      return _assertions__WEBPACK_IMPORTED_MODULE_9__["validateIsOffset"](offset);
    }
    /**
     * Asserts whether the provided value is a valid offset.
     *
     * @param {number} offset
     * @throws TypeError
     */

  }, {
    key: "assertIsOffset",
    value: function assertIsOffset(offset) {
      _assertions__WEBPACK_IMPORTED_MODULE_9__["assertIsOffset"](offset);
    }
    /**
     * Indicates whether the provided value is an instance of DateTime
     *
     * @param {DateTime} datetime
     * @return {boolean} returns true if it is an instance of DateTime
     */

  }, {
    key: "validateIsDateTime",
    value: function validateIsDateTime(datetime) {
      return Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_8__["instanceOf"])(datetime, 'DateTime') || Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_8__["instanceOf"])(datetime, 'ServerDateTime');
    }
    /**
     * Asserts whether the provided value is an instance of DateTime
     *
     * @param {DateTime} datetime
     * @throws TypeError
     */

  }, {
    key: "assertIsDateTime",
    value: function assertIsDateTime(datetime) {
      if (!this.validateIsDateTime(datetime)) {
        throw new TypeError('The provided value is not an instance of DateTime');
      }
    }
    /**
     * Validates whether the given value is an instance of the javascript Date
     * object.
     *
     * @param {Date} date
     * @return {boolean} True means the value is an instance of Date
     */

  }, {
    key: "validateIsDate",
    value: function validateIsDate(date) {
      return _assertions__WEBPACK_IMPORTED_MODULE_9__["validateIsDate"](date);
    }
    /**
     * Asserts whether the given value is an instance of Date.
     *
     * @param {Date} date
     * @throws TypeError
     */

  }, {
    key: "assertIsDate",
    value: function assertIsDate(date) {
      _assertions__WEBPACK_IMPORTED_MODULE_9__["assertIsDate"](date);
    }
    /**
     * Indicates whether the provided value is an instance of DateTime and is
     * a "valid" datetime (meaning the instance was constructed with valid
     * arguments).
     *
     * @param {DateTime} datetime
     * @return {boolean} true means it is valid.
     */

  }, {
    key: "isValid",
    value: function isValid(datetime) {
      return this.validateIsDateTime(datetime) && datetime.isValid();
    }
    /**
     * Asserts whether the provided value is an instance of DateTime and is
     * a "valid" datetime (meaning the instance was constructed with valid
     * arguments)
     *
     * @param {DateTime} datetime
     * @throws InvalidDateTime
     */

  }, {
    key: "assertIsValid",
    value: function assertIsValid(datetime) {
      if (!this.isValid(datetime)) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7__["InvalidDateTime"](datetime);
      }
    }
  }, {
    key: privateMethods.normalizeArguments,
    value: function value(dateValue, timezone, locale) {
      return this.name === 'ServerDateTime' ? [dateValue, locale, timezone] : [dateValue, timezone, locale];
    }
    /**
     * A private internal helper method that is used to extract all moment
     * instances from the provided DateTimes (passed in as arguments).
     *
     * @param {...DateTime} datetimes
     * @return {moment[]} An array of moment instances extracted from the
     * DateTimes
     */

  }, {
    key: privateMethods.extractMomentsFromDateTimes,
    value: function value() {
      var _this4 = this;

      for (var _len = arguments.length, datetimes = new Array(_len), _key = 0; _key < _len; _key++) {
        datetimes[_key] = arguments[_key];
      }

      return datetimes.map(function (datetime) {
        _this4.assertIsDateTime(datetime);

        return datetime[privateProperties.datetime];
      });
    }
    /**
     * Given an indefinite number of DateTimes as arguments, this will return a
     * new DateTime that represents the latest point in time.
     *
     * @param {...DateTime} datetimes
     * @return {DateTime|ServerDateTime} A new DateTime representing the latest point of time.
     */

  }, {
    key: "max",
    value: function max() {
      return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_6___default.a.max(this[privateMethods.extractMomentsFromDateTimes].apply(this, arguments)));
    }
    /**
     * Given an indefinite number of DateTimes as arguments, this will return a
     * new DateTime that represents the earliest point in time.
     *
     * @param {...DateTime} datetimes
     * @return {DateTime|ServerDateTime} A new DateTime representing the earliest point in
     * time.
     */

  }, {
    key: "min",
    value: function min() {
      return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_6___default.a.min(this[privateMethods.extractMomentsFromDateTimes].apply(this, arguments)));
    }
    /**
     * Constructs a DateTime from an instance of moment.
     *
     * @param {moment} momentInstance
     * @return {DateTime|ServerDateTime} An instance of DateTime
     */

  }, {
    key: "fromMoment",
    value: function fromMoment(momentInstance) {
      if (!moment_timezone__WEBPACK_IMPORTED_MODULE_6___default.a.isMoment(momentInstance)) {
        throw new TypeError('Requires an instance of moment.');
      } // this would account for client code that is using `moment` but not
      // using `moment-timezone`.


      return Object(lodash__WEBPACK_IMPORTED_MODULE_5__["isFunction"])(momentInstance.tz) && !Object(lodash__WEBPACK_IMPORTED_MODULE_5__["isUndefined"])(momentInstance.tz()) && momentInstance.tz() !== 'UTC' ? _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(this[privateMethods.normalizeArguments](momentInstance.toISOString(), momentInstance.tz(), momentInstance.locale()))) : _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(this[privateMethods.normalizeArguments](momentInstance.toISOString(true), null, momentInstance.locale())));
    }
    /**
     * Constructs a DateTime from an ISO 8601 string.
     *
     * @param {string} ISOString
     * @param {string} timezone
     * @param {string} locale
     * @return {DateTime|ServerDateTime} An instance of DateTime
     */

  }, {
    key: "fromISO",
    value: function fromISO(ISOString) {
      var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_TIMEZONE_STRING"];
      var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_VALID_LOCALE"];

      if (Object(lodash__WEBPACK_IMPORTED_MODULE_5__["isEmpty"])(ISOString)) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7__["InvalidISO8601String"](ISOString);
      }

      return _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(this[privateMethods.normalizeArguments](ISOString, timezone, locale)));
    }
    /**
     * Constructs a DateTime from an ISO 8601 String
     * Differs with `fromISO` in that this allows passing a offset value
     * instead of a timezone string.
     *
     * @param {string} ISOString
     * @param {number} offset  In minutes unless > -16 or < -16 in which case it
     * is treated as hours.
     * @param {string} locale
     * @return {DateTime|ServerDateTime}  An instance of DateTime
     */

  }, {
    key: "fromISOWithOffset",
    value: function fromISOWithOffset(ISOString) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_OFFSET"];
      var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_VALID_LOCALE"];
      this.assertISO8601IsValid(ISOString);
      this.assertIsOffset(offset);
      this.assertLocaleIsValid(locale);
      var datetime = moment_timezone__WEBPACK_IMPORTED_MODULE_6___default.a.utc(ISOString).utcOffset(offset, true).locale(locale);
      return this.fromMoment(datetime);
    }
    /**
     * Constructs a DateTime from a javascript Date object.
     *
     * @param {Date} date
     * @param {string} timezone
     * @param {string} locale
     * @return {DateTime|ServerDateTime} Returns an instance of DateTime
     */

  }, {
    key: "fromJSDate",
    value: function fromJSDate(date) {
      var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_TIMEZONE_STRING"];
      var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_VALID_LOCALE"];
      this.assertIsDate(date);
      this.assertTimezoneIsValid(timezone);
      this.assertLocaleIsValid(locale);
      return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_6___default()(date).tz(timezone).locale(locale));
    }
    /**
     * Constructs a Datetime from a javascript Date object.
     *
     * The difference between this and fromJSDate is that this can be set with
     * an offset vs a timezone string.
     *
     * @param {Date} date
     * @param {number} offset
     * @param {string} locale
     * @return {DateTime|ServerDateTime} Returns an instance of DateTime
     */

  }, {
    key: "fromJSDateWithOffset",
    value: function fromJSDateWithOffset(date) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_OFFSET"];
      var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_VALID_LOCALE"];
      this.assertIsDate(date);
      this.assertIsOffset(offset);
      this.assertLocaleIsValid(locale);
      return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_6___default()(date).utcOffset(offset).locale(locale));
    }
    /**
     * Constructs a DateTime (in UTC) with milliseconds from epoch.
     *
     * @param {number} milliseconds
     * @param {string} locale
     * @return {DateTime|ServerDateTime} Returns an instance of DateTime
     * @throws TypeError
     */

  }, {
    key: "fromMilliseconds",
    value: function fromMilliseconds(milliseconds) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_VALID_LOCALE"];
      this.assertLocaleIsValid(locale);

      if (!Object(lodash__WEBPACK_IMPORTED_MODULE_5__["isNumber"])(milliseconds)) {
        throw new TypeError('Provided value must be a number ' + 'representing milliseconds from the epoch');
      }

      return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_6___default()(milliseconds).utc().locale(locale));
    }
    /**
     * Constructs a DateTime in UTC with seconds from the epoch.
     *
     * @param {number} seconds
     * @param {string} locale
     * @return {DateTime|ServerDateTime} An instance of DateTime
     * @throws TypeError
     */

  }, {
    key: "fromUnix",
    value: function fromUnix(seconds) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_VALID_LOCALE"];
      this.assertLocaleIsValid(locale);

      if (!Object(lodash__WEBPACK_IMPORTED_MODULE_5__["isNumber"])(seconds)) {
        throw new TypeError('Provided value must be a number ' + 'representing seconds from the epoch');
      }

      return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_6___default.a.unix(seconds).utc().locale(locale));
    }
    /**
     * Constructs a DateTime from an object of values assuming its in "local"
     * time (if run via browser or server if run server side).
     *
     * The object is expected to be a representation of this instance in time:
     * Eg.
     * { year: 2018, month: 12, day: 25, hour: 0, minute: 15, seconds: 0 }
     *
     * Pass an empty values value if you want the instance in time to represent
     * "now".
     *
     * @param {Object} values
     * @param {string} locale
     * @return {DateTime|ServerDateTime} An instance of DateTime
     * @throws InvalidArgument
     */

  }, {
    key: "fromLocal",
    value: function fromLocal(values) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_VALID_LOCALE"];
      this.assertLocaleIsValid(locale);
      values = this[privateMethods.normalizeUnitObject](values);
      var datetime = Object(lodash__WEBPACK_IMPORTED_MODULE_5__["isEmpty"])(values) ? moment_timezone__WEBPACK_IMPORTED_MODULE_6___default()().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_6___default()(values).locale(locale);

      if (datetime.isValid() !== true) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7__["InvalidArgument"]('Double-check the values you sent in.', values);
      }

      return this.fromMoment(datetime);
    }
    /**
     * Constructs a DateTime from an object of values and assumes its in
     * 'UTC'.
     *
     * The object is expected to be a representation of this instance in time:
     * Eg.
     * { year: 2018, month: 12, day: 25, hour: 0, minute: 15, seconds: 0 }
     *
     * Any units not specified will be assumed to be `0`.
     *
     * Pass an empty values value if you want the instance in time to represent
     * "now".
     *
     * @param {Object} values
     * @param {string} locale
     * @return {DateTime|ServerDateTime} An instance of DateTime
     * @throws InvalidArgument
     */

  }, {
    key: "utc",
    value: function utc(values) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_VALID_LOCALE"];
      this.assertLocaleIsValid(locale);
      values = this[privateMethods.normalizeUnitObject](values);
      var datetime = Object(lodash__WEBPACK_IMPORTED_MODULE_5__["isEmpty"])(values) ? moment_timezone__WEBPACK_IMPORTED_MODULE_6___default.a.utc().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_6___default.a.utc(values).locale(locale);

      if (datetime.isValid() !== true) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7__["InvalidArgument"]('Double-check the values sent in.', values);
      }

      return this.fromMoment(datetime);
    }
    /**
     * Constructs a DateTime from a configuration object.
     *
     * The configuration object can have:
     * - any of the DateTime units ('year', 'month', etc)
     * - 'locale' a string representing the locale
     * - 'timezone' a string representing the timezone
     * - 'offset' a number representing the offset from UTC this instance in
     * time represents.
     *
     * @param {Object} values
     * @return {DateTime|ServerDateTime} An instance of DateTime
     */

  }, {
    key: "fromObject",
    value: function fromObject(values) {
      var locale = values.locale || _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_VALID_LOCALE"];
      var timezone = values.timezone || _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_TIMEZONE_STRING"];
      var offset = Object(lodash__WEBPACK_IMPORTED_MODULE_5__["isUndefined"])(values.offset) ? null : values.offset;
      var valuesForConstruct = Object(lodash__WEBPACK_IMPORTED_MODULE_5__["omit"])(values, ['locale', 'timezone', 'offset']);
      this.assertLocaleIsValid(locale);

      if (offset !== null) {
        this.assertIsOffset(offset);
        valuesForConstruct = this[privateMethods.normalizeUnitObject](valuesForConstruct);

        var _datetime = Object(lodash__WEBPACK_IMPORTED_MODULE_5__["isEmpty"])(valuesForConstruct) ? moment_timezone__WEBPACK_IMPORTED_MODULE_6___default()().utcOffset(offset, true).locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_6___default.a.utc(valuesForConstruct).utcOffset(offset, true).locale(locale);

        if (_datetime.isValid() !== true) {
          throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7__["InvalidArgument"]('Double-check the configuration object sent in.', values);
        }

        return this.fromMoment(_datetime);
      }

      if (timezone === this.TIMEZONE_LOCAL) {
        return this.fromLocal(valuesForConstruct, locale);
      }

      this.assertTimezoneIsValid(timezone);
      valuesForConstruct = this[privateMethods.normalizeUnitObject](valuesForConstruct);
      var datetime = moment_timezone__WEBPACK_IMPORTED_MODULE_6___default.a.tz(valuesForConstruct, timezone).locale(locale);

      if (datetime.isValid() !== true) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7__["InvalidArgument"]('Double-check the configuration object sent in.', values);
      }

      return this.fromMoment(datetime);
    }
    /**
     * Moment uses different names for some unit getters/setters/properties so
     * this is used to normalize a given unit name to what moment uses.
     *
     * @param {string} nameToNormalize
     * @return {string}  Normalized unit name.
     */

  }, {
    key: privateMethods.normalizeUnitName,
    value: function value(nameToNormalize) {
      var map = {
        day: 'date',
        days: 'day',
        date: 'day',
        years: 'year',
        months: 'month',
        milliseconds: 'millisecond',
        minutes: 'minute',
        seconds: 'second',
        hours: 'hour'
      };
      return map[nameToNormalize] ? map[nameToNormalize] : nameToNormalize;
    }
    /**
     * Handles normalizing unit values for internal library use.
     *
     * For example, moment zero indexes months. DateTime does not, so this
     * method helps with normalizing month values for both setting (used by
     * moment) and getting (returned to client).  This allows client code
     * to expect months in DateTime to be handled with a non-zero index.
     *
     * @param {string} unit The unit to be normalized
     * @param {mixed}  value The value for that unit
     * @param {boolean} set  Whether this should normalize for setting or
     * getting.
     * @return {mixed}  The normalized value.
     */

  }, {
    key: privateMethods.normalizeUnitValue,
    value: function value(unit, _value) {
      var set = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (unit === 'month') {
        _value = set ? _value - 1 : _value + 1;
      }

      return _value;
    }
    /**
     * Given a simple object containing units, this normalizes the object to
     * what moment recognizes.
     *
     * @param {Object} setObject
     * @param {boolean} set  true if setting the object, false if getting the
     * object
     * @return {Object} The normalized object.
     */

  }, {
    key: privateMethods.normalizeUnitObject,
    value: function value(setObject) {
      var _this5 = this;

      var set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!Object(lodash__WEBPACK_IMPORTED_MODULE_5__["isObject"])(setObject)) {
        throw new TypeError('The incoming value must be an object');
      }

      return Object(lodash__WEBPACK_IMPORTED_MODULE_5__["reduce"])(setObject, function (result, value, key) {
        key = _this5[privateMethods.normalizeUnitName](key);
        result[key] = _this5[privateMethods.normalizeUnitValue](key, value, set);
        return result;
      }, {});
    }
  }]);

  return DateTime;
}();
/**
 * These static properties need to be defined outside of the class definition
 * because of compile issues.
 */



DateTime.UNIT_YEAR = 'year';
DateTime.UNIT_MONTH = 'month';
DateTime.UNIT_DAY = 'day';
DateTime.UNIT_HOUR = 'hour';
DateTime.UNIT_MINUTE = 'minute';
DateTime.UNIT_SECOND = 'second';
DateTime.UNIT_MILLISECOND = 'millisecond';
DateTime.TIMEZONE_LOCAL = 'local';

/***/ }),

/***/ "./assets/src/vo/date-time/defaults.js":
/*!*********************************************!*\
  !*** ./assets/src/vo/date-time/defaults.js ***!
  \*********************************************/
/*! exports provided: DEFAULT_TIMEZONE_STRING, DEFAULT_OFFSET, HAS_TIMEZONE_STRING, DEFAULT_FORMAT, DEFAULT_LOCALE, DEFAULT_VALID_LOCALE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_TIMEZONE_STRING", function() { return DEFAULT_TIMEZONE_STRING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_OFFSET", function() { return DEFAULT_OFFSET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HAS_TIMEZONE_STRING", function() { return HAS_TIMEZONE_STRING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_FORMAT", function() { return DEFAULT_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LOCALE", function() { return DEFAULT_LOCALE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_VALID_LOCALE", function() { return DEFAULT_VALID_LOCALE; });
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/helpers */ "@eventespresso/helpers");
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assertions */ "./assets/src/vo/date-time/assertions.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/**
 * External imports
 */




/**
 * Default timezone string to use.
 *
 * @type {string}
 */

var DEFAULT_TIMEZONE_STRING = _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["TIMEZONE_CONFIG"].string === '' ? 'UTC' : _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["TIMEZONE_CONFIG"].string;
/**
 * Default offset
 *
 * @type {number}
 */

var DEFAULT_OFFSET = _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["TIMEZONE_CONFIG"].offset;
/**
 * Whether there is a default timezone string to use.
 * This helps with determining whether to use the offset or not for constructing
 * DateTime value objects.
 *
 * @type {boolean}
 */

var HAS_TIMEZONE_STRING = DEFAULT_TIMEZONE_STRING !== 'UTC' || !(DEFAULT_TIMEZONE_STRING === 'UTC' && DEFAULT_OFFSET !== 0);
/**
 *
 * @type {string}
 */

var DEFAULT_FORMAT = _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["FORMAT_SITE_DATE"] + ' ' + _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["FORMAT_SITE_TIME"];
/**
 * Exposes what to use for the default locale.
 * @type {string}
 */

var DEFAULT_LOCALE = Object(lodash__WEBPACK_IMPORTED_MODULE_3__["snakeCase"])(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["SERVER_LOCALE"].user);
/**
 * This ensures that the provided locale is valid.  So if `DEFAULT_LOCALE` is
 * not valid for this environment, then a fallback of 'en' locale is used.
 *
 * @type {string}
 */

var DEFAULT_VALID_LOCALE = Object(_assertions__WEBPACK_IMPORTED_MODULE_2__["validateLocale"])(DEFAULT_LOCALE) ? DEFAULT_LOCALE : 'en';

/***/ }),

/***/ "./assets/src/vo/date-time/duration.js":
/*!*********************************************!*\
  !*** ./assets/src/vo/date-time/duration.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Duration; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var moment_duration_format__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment-duration-format */ "./node_modules/moment-duration-format/lib/moment-duration-format.js");
/* harmony import */ var moment_duration_format__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment_duration_format__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/is-shallow-equal */ "@wordpress/is-shallow-equal");
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assertions */ "./assets/src/vo/date-time/assertions.js");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./defaults */ "./assets/src/vo/date-time/defaults.js");





var _privateMethods$filte, _privateMethods$setVa, _privateMethods$popul, _privateMethods$getAl, _privateMethods$creat;

/**
 * External imports
 */






/**
 * Internal imports
 */



moment_duration_format__WEBPACK_IMPORTED_MODULE_5___default()(moment_timezone__WEBPACK_IMPORTED_MODULE_4___default.a);
/**
 * A collection of symbols used for "private" properties in the Duration object.
 * @type {
 * 	{
 * 		duration: Symbol,
 * 		values: Symbol,
 * 		isValid: Symbol,
 * 	}
 * }
 */

var privateProperties = {
  duration: Symbol('DurationPrivatePropertiesDuration'),
  durationValues: Symbol('DurationPrivatePropertiesDurationValues'),
  isValid: Symbol('DurationPrivatePropertiesIsValid')
};
/**
 * A collection of symbols used for "private" methods in the Duration object.
 * @type {
 * 	{
 * 		createGettersAndSetters: Symbol,
 * 		getAllUnitNames: Symbol,
 * 		populateValuesFromDuration: Symbol,
 * 		setValues: Symbol,
 * 	    filterValues: Symbol,
 * 	}
 * }
 */

var privateMethods = {
  createGetters: Symbol('DurationPrivateMethodsCreateGetters'),
  getAllUnitNames: Symbol('DurationPrivateMethodsGetAllUnitNames'),
  populateValuesFromDuration: Symbol('DurationPrivateMethodsPopulateValuesFromDuration'),
  setValues: Symbol('DurationPrivateMethodsSetValues'),
  filterValues: Symbol('DurationPrivateMethodsFilterValues')
};
/**
 * An array of unit names for properties in the Duration object
 * @type {string[]}
 */

var unitNames = ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];
/**
 * An array of derivative unit names.
 * These are accessors that are derivatives of base units.  For instance,
 * "weeks" ends up being a derivative (calculated from) the "days" unit.
 * @type {string[]}
 */

var derivativeUnitNames = ['weeks'];
/**
 * Where a DateTime object represents a single point in time, a Duration object
 * represents a length of time.
 *
 * Durations do not have a defined beginning and end date.  They are contextless.
 *
 * As an example, durations are representative of something like "2 hours" and
 * not representative of something like "between 1pm and 3pm".
 *
 * Internally, the Duration class here uses `moment.Duration`.  This is an
 * abstraction loosely following the adapter pattern so that there is a common
 * api that can be depended on if in the future the internal library is switched
 * to something different (such as Luxon).
 */

_privateMethods$filte = privateMethods.filterValues;
_privateMethods$setVa = privateMethods.setValues;
_privateMethods$popul = privateMethods.populateValuesFromDuration;
_privateMethods$getAl = privateMethods.getAllUnitNames;
_privateMethods$creat = privateMethods.createGetters;

var Duration =
/*#__PURE__*/
function () {
  /**
   * The constructor for the Duration class.
   *
   * @param {Object|moment.Duration|string|number} values
   * Receiving a moment.Duration object is something for internal use and should not be used directly via
   * client code.
   * @param {string} locale  A valid locale string.
   * 							@link http://tools.ietf.org/html/rfc5646
   */
  function Duration(values) {
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_VALID_LOCALE"];

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Duration);

    this[privateProperties.isValid] = true;
    _assertions__WEBPACK_IMPORTED_MODULE_10__["assertLocaleIsValid"](locale);

    if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(values) !== 'object') {
      values = moment_timezone__WEBPACK_IMPORTED_MODULE_4___default.a.duration(values).locale(locale);
    }

    if (moment_timezone__WEBPACK_IMPORTED_MODULE_4___default.a.isDuration(values)) {
      this[privateProperties.duration] = values;
      this[privateMethods.populateValuesFromDuration](values);
    } else {
      values = this[privateMethods.filterValues](values);
      this[privateMethods.setValues](values);
      this[privateProperties.duration] = moment_timezone__WEBPACK_IMPORTED_MODULE_4___default.a.duration(values).locale(locale);
    }

    this[privateMethods.createGetters]();
    Object.freeze(this);
  }
  /**
   * Create an instance of Duration from a number of milliseconds.
   * @param {number} milliseconds
   * @param {string} locale
   * @return {Duration}  An instance of Duration.
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Duration, [{
    key: _privateMethods$filte,

    /**
     * This filters the incoming values and returns only key/value pairs that
     * are acceptable as duration units.
     *
     * If a invalid duration unit is discovered, a console.error is generated
     * (in non-production mode).
     *
     * @param {mixed} values
     * @return {Object} Filtered values.
     * @throws TypeError if incoming values argument is not an object.
     */
    value: function value(values) {
      if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(values) !== 'object') {
        throw new TypeError('Incoming values must be a simple object.');
      }

      var valuesToSet = Object(lodash__WEBPACK_IMPORTED_MODULE_6__["pick"])(values, unitNames);

      if (!_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_7___default()(values, valuesToSet)) {
        warning__WEBPACK_IMPORTED_MODULE_8___default()(false, 'The following unexpected keys were in the configuration ' + 'object for constructing the Duration: ' + Object(lodash__WEBPACK_IMPORTED_MODULE_6__["keys"])(Object(lodash__WEBPACK_IMPORTED_MODULE_6__["omit"])(values, unitNames)).join());
        this[privateProperties.isValid] = false;
      }

      return valuesToSet;
    }
    /**
     * Used to set the internal "private" values property.
     *
     * @param {Object} values
     * @access private
     */

  }, {
    key: _privateMethods$setVa,
    value: function value(values) {
      var _this = this;

      this[privateProperties.durationValues] = {};
      unitNames.forEach(function (unit) {
        _this[privateProperties.durationValues][unit] = values[unit] || 0;
      });
    }
    /**
     * Used to set the values "private" property from a moment.Duration object.
     *
     * @param {moment.Duration} duration
     * @access private
     */

  }, {
    key: _privateMethods$popul,
    value: function value(duration) {
      var setValues = {};
      unitNames.forEach(function (unit) {
        setValues[unit] = duration[unit]();
      });
      this[privateMethods.setValues](setValues);
    }
    /**
     * Returns an array of accessor names (that in turn are used for generating
     * private properties).
     *
     * @access private
     * @return {string[]}  Array of accessor names.
     */

  }, {
    key: _privateMethods$getAl,
    value: function value() {
      return [].concat(unitNames, derivativeUnitNames);
    }
    /**
     * Creates getters for the Duration instance from the accessor names.
     * @access private
     */

  }, {
    key: _privateMethods$creat,
    value: function value() {
      var _this2 = this;

      this[privateMethods.getAllUnitNames]().forEach(function (accessorName) {
        // creates accessor for getting the value via a property
        // eg. instance.hours
        Object.defineProperty(_this2, accessorName, {
          get: function get() {
            if (derivativeUnitNames.indexOf(accessorName) > -1) {
              return this[privateProperties.duration][accessorName]();
            }

            return this[privateProperties.durationValues][accessorName] || 0;
          }
        }); // creates `as*` methods.
        // eg `instance.asHours` would return the given duration
        // expressed as the hours unit.
        // note for units such as "years" and "months", this uses what
        // is termed as "longterm" calculation. Longterm is based on
        // a 400 year cycle averaging out the days in a month and
        // days in a year over that cycle.
        // @link https://github.com/moment/moment/blob/develop/src/lib/duration/bubble.js#L52

        var asMethodName = 'as' + Object(lodash__WEBPACK_IMPORTED_MODULE_6__["capitalize"])(accessorName);
        Object.defineProperty(_this2, asMethodName, {
          get: function get() {
            var _this3 = this;

            return function () {
              return _this3[privateProperties.duration][asMethodName]();
            };
          }
        });
      });
    }
    /**
     * Exposes the value of locale.
     * eg. instance.locale
     * @return {string} The locale string.
     */

  }, {
    key: "setLocale",

    /**
     * Returns a new Duration instance that is identical to this except the
     * locale is changed to what was provided.
     * @param {string} locale
     * @return {Duration} A new instance of Duration
     */
    value: function setLocale(locale) {
      return new Duration(this[privateProperties.durationValues], locale);
    }
    /**
     * Reduce this Duration to its canonical representation in its current units.
     *
     * For example:
     * Duration
     *     .fromObject({ years: 2, days: 5000 })
     *     .normalize()
     *     .toObject() //=> { years: 15, months: 8, days: 12 }
     *
     * @return {Duration} A new instance of Duration
     */

  }, {
    key: "normalize",
    value: function normalize() {
      return new Duration(this[privateProperties.duration]);
    }
    /**
     * Returns whether the provided Duration instance is the same as this
     * Duration instance.
     *
     * @param {Duration|mixed} otherDuration
     * @throws TypeError
     * @return {boolean} True means that the compared durations have the same
     * units and the same values for each unit (as well as same locale). This
     * means that a duration with{ minutes: 60 } would be considered not equal
     * to a duration with { hours: 1 }.
     */

  }, {
    key: "sameAs",
    value: function sameAs(otherDuration) {
      Duration.assertIsDuration(otherDuration);

      if (!this.isValid || !otherDuration.isValid) {
        return false;
      }

      if (this.locale !== otherDuration.locale) {
        return false;
      }

      return _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_7___default()(this.toObject(), otherDuration.toObject());
    }
    /**
     * Returns whether the provided Duration instance is equal to this Duration
     * instance.
     *
     * Equality is based on:
     * - locale is the same
     * - the normalized value of the duration is the same.  eg a duration with
     * { hours: 24 } would be considered equal to a duration with { days: 1 }
     *
     * @param {Duration|mixed} otherDuration
     * @throws TypeError
     * @return {boolean} true if considered equal
     */

  }, {
    key: "equals",
    value: function equals(otherDuration) {
      Duration.assertIsDuration(otherDuration);

      if (!this.isValid || !otherDuration.isValid) {
        return false;
      }

      if (this.locale !== otherDuration.locale) {
        return false;
      }

      return _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_7___default()(this.normalize().toObject(), otherDuration.normalize().toObject());
    }
    /**
     * Make this duration longer by the specified amount.
     *
     * Note: the returned Duration will have the locale of the original
     * regardless what the locale was on any passed in duration.
     *
     * The new Duration returned will have normalized values (i.e. if addition
     * of one Duration with `{ hours: 10 }` is done with the other Duration
     * having `{ hours: 14 }` then the new Duration will have `{ days: 1 }`.
     * You can still get the total hours by calling `newDuration.asHours()`.
     *
     * @param {Duration|Object|number} value  Either a Duration instance, a
     * number of milliseconds or an object in the same shape received by
     * Duration.fromObject()
     *
     * @return {Duration} A new instance of Duration
     */

  }, {
    key: "plus",
    value: function plus(value) {
      if (Duration.isDuration(value)) {
        return new Duration(this[privateProperties.duration].clone().add(value[privateProperties.duration]));
      }

      if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value) === 'object') {
        value = this[privateMethods.filterValues](value);
      }

      return new Duration(this[privateProperties.duration].clone().add(value));
    }
    /**
     * Make this duration shorter by the specified amount
     *
     * Note: the returned Duration will have the locale of the original
     * regardless what the locale was on any passed in duration.
     *
     * The new Duration returned will have normalized values (i.e. if subtraction
     * of one Duration with `{ hours: 34 }` is done with the other Duration
     * having `{ hours: 10 }` then the new Duration will have `{ days: 1 }`.
     * You can still get the total hours by calling `newDuration.asHours()`.
     *
     * @param {Duration|Object|number} value Either a duration instance, a
     * number of milliseconds or an object in the same shape as that received by
     * Duration.fromObject()
     *
     * @return {Duration} A new instance of Duration
     */

  }, {
    key: "minus",
    value: function minus(value) {
      if (Duration.isDuration(value)) {
        return new Duration(this[privateProperties.duration].clone().subtract(value[privateProperties.duration]));
      }

      if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value) === 'object') {
        value = this[privateMethods.filterValues](value);
      }

      return new Duration(this[privateProperties.duration].clone().subtract(value));
    }
    /**
     * Returns the negative of this Duration.
     *
     * @return {Duration} A new instance of Duration
     */

  }, {
    key: "negate",
    value: function negate() {
      return new Duration(Object(lodash__WEBPACK_IMPORTED_MODULE_6__["mapValues"])(this.toObject(), function (value) {
        return value * -1;
      }));
    }
    /**
     * Returns a javascript object with this Duration's values.
     *
     * @return {*} Returns { years: number, hours: number ... }
     */

  }, {
    key: "toObject",
    value: function toObject() {
      return this[privateProperties.durationValues];
    }
    /**
     * Returns an ISO 8601-compliant string representation of this Duration.
     * @return {string} eg. "PT24H"
     */

  }, {
    key: "toISO",
    value: function toISO() {
      return this[privateProperties.duration].toISOString();
    }
    /**
     * Returns an ISO 8601 representation of this Duration appropriate for use
     * in JSON.
     * @return {string} eg. "PT24H"
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this[privateProperties.duration].toJSON();
    }
    /**
     * Returns an ISO 8601 representation of this Duration appropriate for use
     * in debugging.
     * @return {string} eg. "PT24H"
     */

  }, {
    key: "toString",
    value: function toString() {
      return this.toISO();
    }
    /**
     * Returns an milliseconds value of this Duration.
     * @return {number} The value of this duration represented in the number of
     * milliseconds.
     */

  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.asMilliseconds();
    }
    /**
     * Returns a string representation of this Duration formatted according to
     * the specified format string.
     *
     * Currently this accepts the following tokens in the format string:
     *
     * years:   Y or y
     * months:  M
     * weeks:   W or w
     * days:    D or d
     * hours:   H or h
     * minutes: m
     * seconds: s
     * ms:      S
     *
     * You can use multiples of the same token together to add zero-length
     * padding: (eg hh -> 01 instead of h -> 1)
     *
     * Escape token characters within the format string using square brackets
     * (eg 'h [hrs], m [min]' -> '12 hrs, 3 min')
     *
     * @param {string}format
     * @return {string}  A formatted string representation of this duration.
     */

  }, {
    key: "toFormat",
    value: function toFormat(format) {
      return this.normalize()[privateProperties.duration].format(format);
    }
  }, {
    key: "locale",
    get: function get() {
      return this[privateProperties.duration].locale();
    }
    /**
     * Indicates whether the current Duration instance represents a valid
     * duration.
     *
     * @return {boolean} True means the Duration instance is valid.
     */

  }, {
    key: "isValid",
    get: function get() {
      return this[privateProperties.isValid] && this[privateProperties.duration].toISOString() !== 'P0D';
    }
  }], [{
    key: "fromMilliseconds",
    value: function fromMilliseconds(milliseconds) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_VALID_LOCALE"];
      return new Duration({
        milliseconds: milliseconds
      }, locale);
    }
    /**
     * Create an instance of Duration from a simple object.
     *
     * @param {Object} values  Keys should be the units (eg 'years', 'days').
     * @param {string} locale
     * @return {Duration} An instance of Duration
     */

  }, {
    key: "fromObject",
    value: function fromObject(values) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_VALID_LOCALE"];
      return new Duration(values, locale);
    }
    /**
     * Create an instance of Duration from an ISO8601 string.
     *
     * @param {string} ISOString (eg. 'PT23H')
     * @param {string} locale
     * @return {Duration} An instance of Duration
     */

  }, {
    key: "fromISO",
    value: function fromISO(ISOString) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_VALID_LOCALE"];
      _assertions__WEBPACK_IMPORTED_MODULE_10__["assertISO8601IsValid"](ISOString, true);
      return new Duration(ISOString, locale);
    }
    /**
     * Indicate whether the provided locale argument is a valid locale.
     *
     * @param {string} locale
     * @return {boolean}  True means it is valid.
     */

  }, {
    key: "isValidLocale",
    value: function isValidLocale(locale) {
      return _assertions__WEBPACK_IMPORTED_MODULE_10__["validateLocale"](locale);
    }
    /**
     * Asserts whether the provided locale argument is a valid locale.
     *
     * @param {string} locale
     * @throws InvalidLocale
     */

  }, {
    key: "assertIsValidLocale",
    value: function assertIsValidLocale(locale) {
      _assertions__WEBPACK_IMPORTED_MODULE_10__["assertLocaleIsValid"](locale);
    }
    /**
     * Indicate whether the provided string is a valid ISO 8601 Duration string.
     *
     * @param {string} isoString
     * @return {boolean} True means it is valid.
     */

  }, {
    key: "isValidISO8601Duration",
    value: function isValidISO8601Duration(isoString) {
      return _assertions__WEBPACK_IMPORTED_MODULE_10__["validateISO8601"](isoString, true);
    }
    /**
     * Assert whether the provided string is a valid ISO 8601 Duration string.
     *
     * @param {string} isoString
     * @throws InvalidISO8601String
     */

  }, {
    key: "assertIsValidISO8601Duration",
    value: function assertIsValidISO8601Duration(isoString) {
      _assertions__WEBPACK_IMPORTED_MODULE_10__["assertISO8601IsValid"](isoString);
    }
    /**
     * Indicates whether the provided value is a valid instance of Duration.
     * @param {mixed|Duration}duration
     * @return {boolean}  True means it is a valid Duration object.
     */

  }, {
    key: "isValidDuration",
    value: function isValidDuration(duration) {
      return Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_9__["instanceOf"])(duration, 'Duration') && duration.isValid;
    }
    /**
     * Asserts whether the provided value is a valid Duration and throws an
     * exception if not.
     * @param {mixed|Duration} duration
     * @throws TypeError
     */

  }, {
    key: "assertIsValidDuration",
    value: function assertIsValidDuration(duration) {
      if (!Duration.isValidDuration(duration)) {
        throw new TypeError('This Duration object is not valid.');
      }
    }
    /**
     * Indicates whether the provided value is an instance of Duration.
     *
     * @param {Duration|mixed} duration
     * @return {boolean}  True means the value is an instance of Duration.
     * Note: true may still mean that the Duration instance is not valid!
     */

  }, {
    key: "isDuration",
    value: function isDuration(duration) {
      return Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_9__["instanceOf"])(duration, 'Duration');
    }
    /**
     * Asserts whether the provided value is an instance of Duration and if not
     * throws an exception.
     *
     * @param {Duration|mixed} duration
     * @throws TypeError
     */

  }, {
    key: "assertIsDuration",
    value: function assertIsDuration(duration) {
      if (!Duration.isDuration(duration)) {
        throw new TypeError('The provided value is not an instance of Duration.');
      }
    }
  }]);

  return Duration;
}();

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Duration, "UNIT_YEARS", 'years');

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Duration, "UNIT_MONTHS", 'months');

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Duration, "UNIT_DAYS", 'days');

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Duration, "UNIT_HOURS", 'hours');

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Duration, "UNIT_MINUTES", 'minutes');

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Duration, "UNIT_SECONDS", 'seconds');

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Duration, "UNIT_MILLISECONDS", 'milliseconds');

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Duration, "UNIT_WEEKS", 'weeks');



/***/ }),

/***/ "./assets/src/vo/date-time/index.js":
/*!******************************************!*\
  !*** ./assets/src/vo/date-time/index.js ***!
  \******************************************/
/*! exports provided: DateTime, Duration, ServerDateTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datetime */ "./assets/src/vo/date-time/datetime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DateTime", function() { return _datetime__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./duration */ "./assets/src/vo/date-time/duration.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Duration", function() { return _duration__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _server_date_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./server-date-time */ "./assets/src/vo/date-time/server-date-time.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ServerDateTime", function() { return _server_date_time__WEBPACK_IMPORTED_MODULE_2__["default"]; });





/***/ }),

/***/ "./assets/src/vo/date-time/server-date-time.js":
/*!*****************************************************!*\
  !*** ./assets/src/vo/date-time/server-date-time.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ServerDateTime; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./datetime */ "./assets/src/vo/date-time/datetime.js");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./defaults */ "./assets/src/vo/date-time/defaults.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_8__);







/**
 * Internal Imports.
 */


/**
 * External Imports.
 */


/**
 * Inheriting the DateTime Value object, this represents a single point in time
 * within the context of the timezone or offset the server is set at.
 *
 * Instantiating this instead of `DateTime` removes the need to pass along
 * timezone string or offset and instantiates according to what has been set as
 * the defaults for those from the server.  Usage of this class is preferred
 * over DateTime to remove the need for client code to figure out if the server
 * has a timezone string set or is using a UTC offset.
 */

var ServerDateTime =
/*#__PURE__*/
function (_DateTime) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ServerDateTime, _DateTime);

  /**
   * The constructor for the ServerDateTime class
   *
   * @param {string} iso8601DateString
   * @param {string} locale
   * @param {string} timezone
   */
  function ServerDateTime() {
    var _this;

    var iso8601DateString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_VALID_LOCALE"];
    var timezone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_TIMEZONE_STRING"];

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ServerDateTime);

    // we only want to use the timezone value if the server indicates there
    // is a a timezone string or if constructing an instance for a non UTC
    // value timezone (HAS_TIMEZONE_STRING is just a shortcut check).
    if (_defaults__WEBPACK_IMPORTED_MODULE_7__["HAS_TIMEZONE_STRING"] || !!timezone && timezone !== 'UTC') {
      _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ServerDateTime).call(this, iso8601DateString, timezone, locale));
    } else {
      var datetime = !!iso8601DateString ? moment_timezone__WEBPACK_IMPORTED_MODULE_8___default()().utcOffset(_defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_OFFSET"], true).locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_8___default()(iso8601DateString).utcOffset(_defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_OFFSET"], true).locale(locale);
      _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ServerDateTime).call(this, datetime.toISOString(true), null, locale));
    }

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(_this);
  }
  /**
   * Instantiate ServerDateTime from an ISO string.
   * This overrides `DateTime.fromISO` removing the need to worry about
   * whether to use `timezone` or `offset`.  This will simply use whatever is
   * provided by the server (preferring timezone if its available).
   *
   * @param {string} ISOString
   * @param {string} locale
   * @return {ServerDateTime} An instance of ServerDateTime
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ServerDateTime, null, [{
    key: "fromISO",
    value: function fromISO(ISOString) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_VALID_LOCALE"];
      return _defaults__WEBPACK_IMPORTED_MODULE_7__["HAS_TIMEZONE_STRING"] ? new this(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ServerDateTime), "fromISO", this).call(this, ISOString, _defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_TIMEZONE_STRING"]).toISO(), locale) : new this(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ServerDateTime), "fromISOWithOffset", this).call(this, ISOString, _defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_OFFSET"]).toISO(), locale);
    }
    /**
     * Instantiate ServerDateTime from an ISO string.
     * This overrides `DateTime.fromJSDate` removing the need to worry about
     * whether to use `timezone` or `offset`.  This will simply use whatever is
     * provided by the server (preferring timezone if its available).
     *
     * @param {Date} date
     * @param {string} locale
     * @return {ServerDateTime} An instance of ServerDateTime
     */

  }, {
    key: "fromJSDate",
    value: function fromJSDate(date) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_VALID_LOCALE"];
      return _defaults__WEBPACK_IMPORTED_MODULE_7__["HAS_TIMEZONE_STRING"] ? new this(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ServerDateTime), "fromJSDate", this).call(this, date, _defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_TIMEZONE_STRING"]).toISO(), locale) : new this(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ServerDateTime), "fromJSDateWithOffset", this).call(this, date, _defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_OFFSET"]).toISO(), locale);
    }
  }]);

  return ServerDateTime;
}(_datetime__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "./assets/src/vo/index.js":
/*!********************************!*\
  !*** ./assets/src/vo/index.js ***!
  \********************************/
/*! exports provided: InfinitySymbol, Money, SiteCurrency, Currency, Label, DateTime, Duration, ServerDateTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _infinity_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./infinity-symbol */ "./assets/src/vo/infinity-symbol.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InfinitySymbol", function() { return _infinity_symbol__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _money__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./money */ "./assets/src/vo/money.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Money", function() { return _money__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _currency__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currency */ "./assets/src/vo/currency.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SiteCurrency", function() { return _currency__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Currency", function() { return _currency__WEBPACK_IMPORTED_MODULE_2__["Currency"]; });

/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./label */ "./assets/src/vo/label.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Label", function() { return _label__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _date_time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./date-time */ "./assets/src/vo/date-time/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DateTime", function() { return _date_time__WEBPACK_IMPORTED_MODULE_4__["DateTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Duration", function() { return _date_time__WEBPACK_IMPORTED_MODULE_4__["Duration"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ServerDateTime", function() { return _date_time__WEBPACK_IMPORTED_MODULE_4__["ServerDateTime"]; });







/***/ }),

/***/ "./assets/src/vo/infinity-symbol.js":
/*!******************************************!*\
  !*** ./assets/src/vo/infinity-symbol.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_parse_infinity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/parse-infinity */ "./assets/src/utils/parse-infinity.js");


/**
 * External imports
 */


/**
 * InfinitySymbol
 * displays infinite values as an infinity symbol
 *
 * @function
 * @param {boolean|number|object|string} value
 * @param {boolean} asInt   whether to parse value as an integer
 * @return {Object}         rendered value or infinity symbol
 */

var InfinitySymbol = function InfinitySymbol(_ref) {
  var value = _ref.value,
      asInt = _ref.asInt;
  value = Object(_utils_parse_infinity__WEBPACK_IMPORTED_MODULE_2__["default"])(value, asInt);
  return value === Infinity ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
    className: 'ee-infinity-sign'
  }, "\u221E") : value;
};

InfinitySymbol.propTypes = {
  value: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),
  asInt: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
InfinitySymbol.defaultProps = {
  value: '',
  asInt: false
};
/* harmony default export */ __webpack_exports__["default"] = (InfinitySymbol);

/***/ }),

/***/ "./assets/src/vo/label.js":
/*!********************************!*\
  !*** ./assets/src/vo/label.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Label; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_4__);




/**
 * External imports
 */


/**
 * A value object for representing a label with singular and plural string
 * values.
 */

var Label =
/*#__PURE__*/
function () {
  /**
   * The string representing the singular form of the label.
   * @type {string}
   */

  /**
   * The string representing the plural form of the label.
   * @type {string}
   */

  /**
   * Constructor
   * @param {string} singular
   * @param {string} plural
   */
  function Label(singular, plural) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Label);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "singular", '');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "plural", '');

    this.setSingular(singular).setPlural(plural);
    Object.freeze(this);
  }
  /**
   * Fluid setter for setting the singular property.
   *
   * If the singular property has already been set, this will return a new
   * instance of Label
   * @param {string} singular
   * @return {Label}  An instance of Label
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Label, [{
    key: "setSingular",
    value: function setSingular(singular) {
      Label.assertString(singular);

      if (this.singular !== '') {
        return new Label(singular, this.plural);
      }

      this.singular = singular;
      return this;
    }
    /**
     * Fluid setter for setting the plural property
     *
     * If the plural property has already been set, this will return a new
     * instance of label.
     *
     * @param {string} plural
     * @return {Label} An instance of Label
     */

  }, {
    key: "setPlural",
    value: function setPlural(plural) {
      Label.assertString(plural);

      if (this.plural !== '') {
        return new Label(this.singular, plural);
      }

      this.plural = plural;
      return this;
    }
    /**
     * Return the value for the property formatted in sentence case.
     *
     * Note, this strips any `-` in dashed labels.  So for instance if your
     * label value was `something-else`, the value returned would be
     * `Something Else`
     *
     * @param {boolean} singular  If true, return the formatted value of the
     * singular property otherwise return the formatted value of the plural
     * property.
     * @return {string} The string in sentence case
     */

  }, {
    key: "asSentenceCase",
    value: function asSentenceCase() {
      var singular = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return singular === true ? Object(lodash__WEBPACK_IMPORTED_MODULE_3__["startCase"])(this.singular.toLowerCase()) : Object(lodash__WEBPACK_IMPORTED_MODULE_3__["startCase"])(this.plural.toLowerCase());
    }
    /**
     * Return the value for the property formatted in lower case.
     *
     * @param {boolean} singular  If true, return the formatted value of the
     * singular property otherwise return the formatted value of the plural
     * property.
     * @return {string} The string in lower case
     */

  }, {
    key: "asLowerCase",
    value: function asLowerCase() {
      var singular = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return singular ? this.singular.toLowerCase() : this.plural.toLowerCase();
    }
    /**
     * Return the value for the property formatted in upper case.
     *
     * @param {boolean} singular  If true, return the formatted value of the
     * singular property otherwise return the formatted value of the plural
     * property.
     * @return {string} The string in upper case
     */

  }, {
    key: "asUpperCase",
    value: function asUpperCase() {
      var singular = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return singular ? this.singular.toUpperCase() : this.plural.toUpperCase();
    }
    /**
     * Return the value for the property formatted according to the provided
     * formatType.
     *
     * @param {boolean} singular If true, return the formatted value of the
     * singular property otherwise return the formatted value of the plural
     * property.
     * @param {('sentence'|'lower'|'upper')} formatType
     * @return {string} The string formatted according to formatType
     */

  }, {
    key: "asFormatted",
    value: function asFormatted() {
      var singular = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var formatType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Label.FORMAT_SENTENCE_CASE;

      switch (formatType) {
        case Label.FORMAT_SENTENCE_CASE:
          return this.asSentenceCase(singular);

        case Label.FORMAT_LOWERCASE:
          return this.asLowerCase(singular);

        case Label.FORMAT_UPPERCASE:
          return this.asUpperCase(singular);

        default:
          warning__WEBPACK_IMPORTED_MODULE_4___default()(false, 'Format type must be one of ' + 'Label.FORMAT_SENTENCE_CASE, Label.FORMAT_UPPERCASE, ' + 'or Label.FORMAT_LOWERCASE');
          return this.asSentenceCase(singular);
      }
    }
    /**
     * Asserts whether the provided value is a string or not.
     *
     * @param {*} value
     * @throws TypeError
     */

  }], [{
    key: "assertString",
    value: function assertString(value) {
      if (!Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isString"])(value)) {
        throw new TypeError('Incoming label value (' + value + ') must' + ' be a string');
      }
    }
    /**
     * Creates an instance of Label that has the same value for singluar and
     * plural properties for the provided argument.
     *
     * @param {string} label
     * @return {Label}  A Label instance
     */

  }]);

  return Label;
}();

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Label, "FORMAT_LOWERCASE", 'lower');

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Label, "FORMAT_UPPERCASE", 'upper');

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Label, "FORMAT_SENTENCE_CASE", 'sentence');

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Label, "fromSameSingleAndPlural", function (label) {
  return new Label(label, label);
});



/***/ }),

/***/ "./assets/src/vo/money.js":
/*!********************************!*\
  !*** ./assets/src/vo/money.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Money; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _currency__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currency */ "./assets/src/vo/currency.js");
/* harmony import */ var decimal_js_light__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! decimal.js-light */ "./node_modules/decimal.js-light/decimal.js");
/* harmony import */ var decimal_js_light__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(decimal_js_light__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var accounting_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! accounting-js */ "./node_modules/accounting-js/dist/accounting.umd.js");
/* harmony import */ var accounting_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(accounting_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/is-shallow-equal */ "@wordpress/is-shallow-equal");
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_10__);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External imports
 */








/**
 * Asserts if incoming value is an instance of Money
 *
 * @param {Money} money
 * @throws {TypeError}
 */

var assertMoney = function assertMoney(money) {
  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_9__["instanceOf"])(money, 'Money')) {
    throw new TypeError('Instance of Money required');
  }
};
/**
 * Asserts if incoming value is an instance of Currency
 *
 * @param {Currency} currency
 * @throws {TypeError}
 */


var assertCurrency = function assertCurrency(currency) {
  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_9__["instanceOf"])(currency, 'Currency')) {
    throw new TypeError('Instance of Currency required');
  }
};
/**
 * Asserts if two currencies are shallow equal.
 *
 * @param {Currency} currencyA
 * @param {Currency} currencyB
 * @throws {Exception}
 */


var assertSameCurrency = function assertSameCurrency(currencyA, currencyB) {
  assertCurrency(currencyA);
  assertCurrency(currencyB);

  if (!_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_6___default()(currencyA.toJSON(), currencyB.toJSON())) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_7__["Exception"]('Provided currencies are not equivalent.');
  }
};
/**
 * A Value object representing money values.
 */


var Money =
/*#__PURE__*/
function () {
  /**
   * Internally the amount is stored as a Decimal instance.
   *
   * @type {Decimal}
   */

  /**
   * Internally the amount is stored as a Currency instance.
   *
   * @type {Currency}
   */

  /**
   * Formatter object for money values.
   *
   * @type { {} }
   */

  /**
   * Rounds away from zero
   *
   * @type {number}
   */

  /**
   * Rounds towards zero
   *
   * @type {number}
   */

  /**
   * Rounds towards infinity
   *
   * @type {number}
   */

  /**
   * Rounds towards -Infinity
   *
   * @type {number}
   */

  /**
   * Rounds towards nearest neighbour. If equidistant, rounds away from zero.
   *
   * @type {number}
   */

  /**
   * Rounds towards nearest neighbour. If equidistant rounds towards zero.
   *
   * @type {number}
   */

  /**
   * Rounds towards nearest neighbour.
   * If equidistant, rounds towards even neighbour.
   *
   * @type {number}
   */

  /**
   * Class constructor
   *
   * @param {number|string|Decimal} amount
   * @param {Currency} currency
   */
  function Money(amount, currency) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Money);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "amount", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "currency", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "formatter", {});

    this.setCurrency(currency).setAmount(amount).setFormatter();
    Object.freeze(this);
  }
  /**
   * Set the currency property
   *
   * @param {Currency} currency
   * @return {Money} Either this Money or new Money depending on state of
   * property.
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Money, [{
    key: "setCurrency",
    value: function setCurrency(currency) {
      Money.assertCurrency(currency); // if there's already a currency set, then return a new object.

      if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_9__["instanceOf"])(this.currency, 'Currency')) {
        return new Money(this.amount, currency);
      }

      this.currency = currency;
      return this;
    }
    /**
     * Set the amount property
     *
     * @param {Decimal|number|string} amount
     * @return {Money} Either this Money or new Money depending on state of the
     * property.
     */

  }, {
    key: "setAmount",
    value: function setAmount(amount) {
      var value = Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_9__["instanceOf"])(amount, 'Decimal') ? amount.toNumber() : amount; // if there's already an amount set, then return a new object.

      if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_9__["instanceOf"])(this.amount, 'Decimal')) {
        return new Money(new decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"](value), this.currency);
      }

      this.amount = new decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"](value);
      return this;
    }
    /**
     * Set the formatter for money values
     *
     * @return {Money} An instance of this object.
     */

  }, {
    key: "setFormatter",
    value: function setFormatter() {
      // only initialize if its not already initialized
      if (Object(lodash__WEBPACK_IMPORTED_MODULE_8__["isEmpty"])(this.formatter)) {
        this.formatter = _objectSpread({}, accounting_js__WEBPACK_IMPORTED_MODULE_5__);
        this.formatter.settings = _objectSpread({}, this.formatter.settings, {}, this.currency.toAccountingSettings().currency);
      }

      return this;
    }
    /**
     * Returns the value of this Money as its subunits.
     *
     * @return {number} If the subunits is 100 and the value is .45,
     * this returns 450
     */

  }, {
    key: "toSubunits",
    value: function toSubunits() {
      return this.amount.toNumber() * this.currency.subunits;
    }
    /**
     * Returns whether the provided money object equals this money object.
     * Compares both amount and currency.
     *
     * @param {Money} other
     * @return {boolean} True means this is equal. False means it isn't.
     */

  }, {
    key: "equals",
    value: function equals(other) {
      Money.assertMoney(other);
      return this.amount.equals(other.amount) && this.hasSameCurrency(other);
    }
    /**
     * Returns whether provided Money object's Currency equals this Money
     * object's Currency.
     *
     * This does a shallow comparison on the serialized values for the currency
     * objects.  That way if the currencies are different instances, but share
     * the same internal value, they are considered equal.
     *
     * @param {Money} other
     * @return {boolean} True means the currencies are equal.
     */

  }, {
    key: "hasSameCurrency",
    value: function hasSameCurrency(other) {
      Money.assertMoney(other);
      return _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_6___default()(this.currency.toJSON(), other.currency.toJSON());
    }
    /**
     * Add one Money object to this Money object
     *
     * @param {Money} other
     * @return {Money} Returns a new instance of Money.
     */

  }, {
    key: "add",
    value: function add(other) {
      Money.assertUsingSameCurrency(this, other);
      return new Money(this.amount.plus(other.amount), this.currency);
    }
    /**
     * Subtract one Money object from this Money object
     *
     * @param {Money} other
     * @return {Money} Returns a new instance of Money
     */

  }, {
    key: "subtract",
    value: function subtract(other) {
      Money.assertUsingSameCurrency(this, other);
      return new Money(this.amount.minus(other.amount), this.currency);
    }
    /**
     * Multiply this money object by the provided multiplier value.
     *
     * @param {number|string|Decimal} multiplier
     * @return {Money} Returns a new instance of Money
     */

  }, {
    key: "multiply",
    value: function multiply(multiplier) {
      return new Money(this.amount.times(multiplier), this.currency);
    }
    /**
     * Divide this money object by the provided divisor value.
     *
     * @param {number|string|Decimal} divisor
     * @return {Money} Returns a new instance of Money
     */

  }, {
    key: "divide",
    value: function divide(divisor) {
      return new Money(this.amount.dividedBy(divisor), this.currency);
    }
    /**
     * Allocates fund bases on the ratios provided returning an array of Money
     * objects as a product of the allocation.
     *
     * Example: splitting a provided Money object three equal ways.
     *
     * ```
     * const splitMoney = moneyInstance.allocate( [ 1, 1, 1 ] );
     * ```
     *
     * Example: splitting a provided Money object two ways with one having 75%
     * of the allocation.
     *
     * ```
     * const splitMoney = moneyInstance.allocate( [ 75, 25 ] );
     * ```
     *
     * Note: Array values for ratios are simply totalled and then each element
     * is considered a fraction of the total value.  So how you submit ratio
     * values is up to you for whatever is most clear to you.
     *
     * @param {number[]} ratios
     * @return {Money[]} An array of Money objects
     */

  }, {
    key: "allocate",
    value: function allocate(ratios) {
      var _this = this;

      var self = this;
      var results = [];
      var convertedRatios = [];
      var remainder = new decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"](self.toSubunits());
      var total = new decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"](0); // convert ratios to decimal and generate total.

      ratios.forEach(function (ratio) {
        convertedRatios.push(Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_9__["instanceOf"])(ratio, 'Decimal') ? ratio : new decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"](ratio));
        total = total.plus(ratio);
      });
      convertedRatios.forEach(function (ratio) {
        var share = new decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"](Math.floor(self.toSubunits() * ratio.toNumber() / total.toNumber()));
        results.push(new Money(share.dividedBy(_this.currency.subunits), _this.currency));
        remainder = remainder.minus(share);
      });

      for (var i = 0; remainder.greaterThan(0); i++) {
        results[i] = new Money(new decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"](results[i].toSubunits()).plus(1).dividedBy(this.currency.subunits), this.currency);
        remainder = remainder.minus(1);
      }

      return results;
    }
    /**
     * Compares two instances of Money.
     *
     * Note: "same" means has equal value and equal currency.  It does not mean
     * identical instances.
     *
     * @param {Money} other
     * @return {number} 0 if they are the same, 1 if this is greater than
     * other and -1 if other is greater than this.
     */

  }, {
    key: "compare",
    value: function compare(other) {
      //quickly return 0 if identical
      if (this === other) {
        return 0;
      }

      Money.assertUsingSameCurrency(this, other);
      return this.amount.comparedTo(other.amount);
    }
    /**
     * Compares whether this Money object is greater than the other Money
     * object.
     *
     * @param {Money} other
     * @return {boolean} If true then this is greater than other.
     */

  }, {
    key: "greaterThan",
    value: function greaterThan(other) {
      Money.assertUsingSameCurrency(this, other);
      return this.amount.greaterThan(other.amount);
    }
    /**
     * Compares whether this Money object is greater than or equal to the other
     * Money object.
     *
     * @param {Money} other
     * @return {boolean} If true then this is greater than or equal to the
     *     other.
     */

  }, {
    key: "greaterThanOrEqualTo",
    value: function greaterThanOrEqualTo(other) {
      Money.assertUsingSameCurrency(this, other);
      return this.amount.greaterThanOrEqualTo(other.amount);
    }
    /**
     * Compares whether this Money object is less than the other Money object.
     *
     * @param {Money} other
     * @return {boolean} If true then this is less than other
     */

  }, {
    key: "lessThan",
    value: function lessThan(other) {
      Money.assertUsingSameCurrency(this, other);
      return this.amount.lessThan(other.amount);
    }
    /**
     * Compares whether this Money object is less than or equal to the other
     * Money object.
     *
     * @param {Money} other
     * @return {boolean} If true then this is less than or equal to other.
     */

  }, {
    key: "lessThanOrEqualTo",
    value: function lessThanOrEqualTo(other) {
      Money.assertUsingSameCurrency(this, other);
      return this.amount.lessThanOrEqualTo(other.amount);
    }
    /**
     * Indicates if this object has the value of 0
     *
     * @return {boolean} If true then the value is 0.
     */

  }, {
    key: "isZero",
    value: function isZero() {
      return this.amount.isZero();
    }
    /**
     * Indicates if the value in this Money object is negative.
     *
     * @return {boolean} If true then the value is negative.
     */

  }, {
    key: "isNegative",
    value: function isNegative() {
      return this.amount.isNegative();
    }
    /**
     * Indicates if the value in this Money object is positive.
     *
     * @return {boolean} If true then the value is positive.
     */

  }, {
    key: "isPositive",
    value: function isPositive() {
      return this.amount.isPositive();
    }
    /**
     * Returns the value of this Money object as a number primitive.
     *
     * @return {number} Returns a number.
     */

  }, {
    key: "toNumber",
    value: function toNumber() {
      return this.amount.toNumber();
    }
    /**
     * A string representing this Money object in normal (fixed-point) notation
     * rounded to `decimalPlaces` using `rounding` mode.
     *
     * If the value of this instance in normal notation has fewer than
     * decimalPlaces fraction digits, the return value will be appended with
     * zeros accordingly.
     *
     * @param {number} decimalPlaces The number of decimal places to round to.
     * If not provided uses the internal decimal place value.
     * @param {number} rounding What rounding type to use (0-8).  Use Money
     *     ROUND constants.  Defaults to Money.ROUND_HALF_UP
     * @return {string} Returns a string representing the value of this Money
     * in normal (fixed-point) notation rounded to decimal places using
     * rounding mode.
     */

  }, {
    key: "toFixed",
    value: function toFixed(decimalPlaces) {
      var rounding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Money.ROUND_HALF_UP;
      decimalPlaces = decimalPlaces || this.currency.decimalPlaces;
      return this.amount.toFixed(decimalPlaces, rounding);
    }
    /**
     * Returns a new Money whose value is the value of this Money rounded
     * to a whole number using rounding mode rounding set on the original
     * Decimal amount.
     *
     * @return {Money} A new Money object
     */

  }, {
    key: "toIntegerMoney",
    value: function toIntegerMoney() {
      return new Money(this.amount.toInteger(), this.currency);
    }
    /**
     * Returns the value of this Money object as a formatted string according
     * to the currency configuration.
     *
     * @return {string} Returns a formatted string according to Currency.
     */

  }, {
    key: "toString",
    value: function toString() {
      return this.formatter.format(this.amount.toNumber(), this.formatter.settings);
    }
    /**
     * @return { Object } Returns an object that represents the serialized
     * value of this object.
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        amount: this.amount.toJSON(),
        currency: this.currency.toJSON()
      };
    }
    /**
     * Asserts if the provided value is an instance of Money.
     *
     * @param {Money} money
     * @throws {TypeError}
     */

  }]);

  return Money;
}();

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "ROUND_UP", decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"].ROUND_UP);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "ROUND_DOWN", decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"].ROUND_DOWN);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "ROUND_CEIL", decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"].ROUND_CEIL);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "ROUND_FLOOR", decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"].ROUND_FLOOR);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "ROUND_HALF_UP", decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"].ROUND_HALF_UP);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "ROUND_HALF_DOWN", decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"].ROUND_HALF_DOWN);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "ROUND_HALF_EVEN", decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"].ROUND_HALF_EVEN);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "assertMoney", function (money) {
  assertMoney(money);
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "assertCurrency", function (currency) {
  assertCurrency(currency);
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "assertUsingSameCurrency", function (thisMoney, otherMoney) {
  assertMoney(thisMoney);
  assertMoney(otherMoney);
  assertSameCurrency(thisMoney.currency, otherMoney.currency);
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "assertSameCurrency", function (currencyA, currencyB) {
  assertSameCurrency(currencyA, currencyB);
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "fromMoneyValue", function (moneyValue, currency) {
  assertCurrency(currency); // detect if incoming value has a currency sign not matching provided
  // currency.  This doesn't provide full protection from improper
  // values sent in but is an initial safeguard.

  if (typeof moneyValue === 'string') {
    var match = moneyValue.match(/[^\d\.\,\s]+/);

    if (match && match[0] !== currency.sign) {
      // The first error message is used if we have just one character
      // returned which is likely the currency symbol.  Otherwise,
      // give a more generic message.
      var message = match[0].length === 1 ? Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_10__["sprintf"])('The provided money value has a %1$s sign in it, but the provided currency value object defines %2$s as the currency sign.', match[0], currency.sign) : Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_10__["sprintf"])('The provided money value has non numeric strings in it (%1$s), please double-check the value.', match[0]);
      throw new Error(message);
    }
  } // set the initial value object using the currency


  var money = new Money(0, currency); // set a new value using the parse on the formatter.

  return money.setAmount(money.formatter.parse(moneyValue));
});



/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

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

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/get.js":
/*!****************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/get.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");

var superPropBase = __webpack_require__(/*! ./superPropBase */ "./node_modules/@babel/runtime/helpers/superPropBase.js");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

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

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

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

/***/ "./node_modules/@babel/runtime/helpers/superPropBase.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

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

/***/ "./node_modules/accounting-js/dist/accounting.umd.js":
/*!***********************************************************!*\
  !*** ./node_modules/accounting-js/dist/accounting.umd.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports) :
	undefined;
}(this, function (exports) { 'use strict';

	function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

	/**
	 * The library's settings configuration object.
	 *
	 * Contains default parameters for currency and number formatting
	 */
	var settings = {
	  symbol: '$', // default currency symbol is '$'
	  format: '%s%v', // controls output: %s = symbol, %v = value (can be object, see docs)
	  decimal: '.', // decimal point separator
	  thousand: ',', // thousands separator
	  precision: 2, // decimal places
	  grouping: 3, // digit grouping (not implemented yet)
	  stripZeros: false, // strip insignificant zeros from decimal part
	  fallback: 0 // value returned on unformat() failure
	};

	/**
	 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
	 * Alias: `accounting.parse(string)`
	 *
	 * Decimal must be included in the regular expression to match floats (defaults to
	 * accounting.settings.decimal), so if the number uses a non-standard decimal
	 * separator, provide it as the second argument.
	 *
	 * Also matches bracketed negatives (eg. '$ (1.99)' => -1.99)
	 *
	 * Doesn't throw any errors (`NaN`s become 0) but this may change in future
	 *
	 * ```js
	 *  accounting.unformat("£ 12,345,678.90 GBP"); // 12345678.9
	 * ```
	 *
	 * @method unformat
	 * @for accounting
	 * @param {String|Array<String>} value The string or array of strings containing the number/s to parse.
	 * @param {Number}               decimal Number of decimal digits of the resultant number
	 * @return {Float} The parsed number
	 */
	function unformat(value) {
	  var decimal = arguments.length <= 1 || arguments[1] === undefined ? settings.decimal : arguments[1];
	  var fallback = arguments.length <= 2 || arguments[2] === undefined ? settings.fallback : arguments[2];

	  // Recursively unformat arrays:
	  if (Array.isArray(value)) {
	    return value.map(function (val) {
	      return unformat(val, decimal, fallback);
	    });
	  }

	  // Return the value as-is if it's already a number:
	  if (typeof value === 'number') return value;

	  // Build regex to strip out everything except digits, decimal point and minus sign:
	  var regex = new RegExp('[^0-9-(-)-' + decimal + ']', ['g']);
	  var unformattedValueString = ('' + value).replace(regex, '') // strip out any cruft
	  .replace(decimal, '.') // make sure decimal point is standard
	  .replace(/\(([-]*\d*[^)]?\d+)\)/g, '-$1') // replace bracketed values with negatives
	  .replace(/\((.*)\)/, ''); // remove any brackets that do not have numeric value

	  /**
	   * Handling -ve number and bracket, eg.
	   * (-100) = 100, -(100) = 100, --100 = 100
	   */
	  var negative = (unformattedValueString.match(/-/g) || 2).length % 2,
	      absUnformatted = parseFloat(unformattedValueString.replace(/-/g, '')),
	      unformatted = absUnformatted * (negative ? -1 : 1);

	  // This will fail silently which may cause trouble, let's wait and see:
	  return !isNaN(unformatted) ? unformatted : fallback;
	}

	/**
	 * Check and normalise the value of precision (must be positive integer)
	 */
	function _checkPrecision(val, base) {
	  val = Math.round(Math.abs(val));
	  return isNaN(val) ? base : val;
	}

	/**
	 * Implementation of toFixed() that treats floats more like decimals
	 *
	 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
	 * problems for accounting- and finance-related software.
	 *
	 * ```js
	 *  (0.615).toFixed(2);           // "0.61" (native toFixed has rounding issues)
	 *  accounting.toFixed(0.615, 2); // "0.62"
	 * ```
	 *
	 * @method toFixed
	 * @for accounting
	 * @param {Float}   value         The float to be treated as a decimal number.
	 * @param {Number} [precision=2] The number of decimal digits to keep.
	 * @return {String} The given number transformed into a string with the given precission
	 */
	function toFixed(value, precision) {
	  precision = _checkPrecision(precision, settings.precision);
	  var power = Math.pow(10, precision);

	  // Multiply up by precision, round accurately, then divide and use native toFixed():
	  return (Math.round((value + 1e-8) * power) / power).toFixed(precision);
	}

	var index = __commonjs(function (module) {
	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};
	});

	var objectAssign = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);

	function _stripInsignificantZeros(str, decimal) {
	  var parts = str.split(decimal);
	  var integerPart = parts[0];
	  var decimalPart = parts[1].replace(/0+$/, '');

	  if (decimalPart.length > 0) {
	    return integerPart + decimal + decimalPart;
	  }

	  return integerPart;
	}

	/**
	 * Format a number, with comma-separated thousands and custom precision/decimal places
	 * Alias: `accounting.format()`
	 *
	 * Localise by overriding the precision and thousand / decimal separators
	 *
	 * ```js
	 * accounting.formatNumber(5318008);              // 5,318,008
	 * accounting.formatNumber(9876543.21, { precision: 3, thousand: " " }); // 9 876 543.210
	 * ```
	 *
	 * @method formatNumber
	 * @for accounting
	 * @param {Number}        number The number to be formatted.
	 * @param {Object}        [opts={}] Object containing all the options of the method.
	 * @return {String} The given number properly formatted.
	  */
	function formatNumber(number) {
	  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  // Resursively format arrays:
	  if (Array.isArray(number)) {
	    return number.map(function (val) {
	      return formatNumber(val, opts);
	    });
	  }

	  // Build options object from second param (if object) or all params, extending defaults:
	  opts = objectAssign({}, settings, opts);

	  // Do some calc:
	  var negative = number < 0 ? '-' : '';
	  var base = parseInt(toFixed(Math.abs(number), opts.precision), 10) + '';
	  var mod = base.length > 3 ? base.length % 3 : 0;

	  // Format the number:
	  var formatted = negative + (mod ? base.substr(0, mod) + opts.thousand : '') + base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + opts.thousand) + (opts.precision > 0 ? opts.decimal + toFixed(Math.abs(number), opts.precision).split('.')[1] : '');

	  return opts.stripZeros ? _stripInsignificantZeros(formatted, opts.decimal) : formatted;
	}

	var index$1 = __commonjs(function (module) {
	'use strict';

	var strValue = String.prototype.valueOf;
	var tryStringObject = function tryStringObject(value) {
		try {
			strValue.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var strClass = '[object String]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isString(value) {
		if (typeof value === 'string') { return true; }
		if (typeof value !== 'object') { return false; }
		return hasToStringTag ? tryStringObject(value) : toStr.call(value) === strClass;
	};
	});

	var isString = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

	/**
	 * Parses a format string or object and returns format obj for use in rendering
	 *
	 * `format` is either a string with the default (positive) format, or object
	 * containing `pos` (required), `neg` and `zero` values
	 *
	 * Either string or format.pos must contain "%v" (value) to be valid
	 *
	 * @method _checkCurrencyFormat
	 * @for accounting
	 * @param {String}        [format="%s%v"] String with the format to apply, where %s is the currency symbol and %v is the value.
	 * @return {Object} object represnting format (with pos, neg and zero attributes)
	 */
	function _checkCurrencyFormat(format) {
	  // Format should be a string, in which case `value` ('%v') must be present:
	  if (isString(format) && format.match('%v')) {
	    // Create and return positive, negative and zero formats:
	    return {
	      pos: format,
	      neg: format.replace('-', '').replace('%v', '-%v'),
	      zero: format
	    };
	  }

	  // Otherwise, assume format was fine:
	  return format;
	}

	/**
	 * Format a number into currency
	 *
	 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
	 * defaults: (0, '$', 2, ',', '.', '%s%v')
	 *
	 * Localise by overriding the symbol, precision, thousand / decimal separators and format
	 *
	 * ```js
	 * // Default usage:
	 * accounting.formatMoney(12345678); // $12,345,678.00
	 *
	 * // European formatting (custom symbol and separators), can also use options object as second parameter:
	 * accounting.formatMoney(4999.99, { symbol: "€", precision: 2, thousand: ".", decimal: "," }); // €4.999,99
	 *
	 * // Negative values can be formatted nicely:
	 * accounting.formatMoney(-500000, { symbol: "£ ", precision: 0 }); // £ -500,000
	 *
	 * // Simple `format` string allows control of symbol position (%v = value, %s = symbol):
	 * accounting.formatMoney(5318008, { symbol: "GBP",  format: "%v %s" }); // 5,318,008.00 GBP
	 * ```
	 *
	 * @method formatMoney
	 * @for accounting
	 * @param {Number}        number Number to be formatted.
	 * @param {Object}        [opts={}] Object containing all the options of the method.
	 * @return {String} The given number properly formatted as money.
	 */
	function formatMoney(number) {
	  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  // Resursively format arrays:
	  if (Array.isArray(number)) {
	    return number.map(function (val) {
	      return formatMoney(val, opts);
	    });
	  }

	  // Build options object from second param (if object) or all params, extending defaults:
	  opts = objectAssign({}, settings, opts);

	  // Check format (returns object with pos, neg and zero):
	  var formats = _checkCurrencyFormat(opts.format);

	  // Choose which format to use for this value:
	  var useFormat = undefined;

	  if (number > 0) {
	    useFormat = formats.pos;
	  } else if (number < 0) {
	    useFormat = formats.neg;
	  } else {
	    useFormat = formats.zero;
	  }

	  // Return with currency symbol added:
	  return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), opts));
	}

	/**
	 * Format a list of numbers into an accounting column, padding with whitespace
	 * to line up currency symbols, thousand separators and decimals places
	 *
	 * List should be an array of numbers
	 *
	 * Returns array of accouting-formatted number strings of same length
	 *
	 * NB: `white-space:pre` CSS rule is required on the list container to prevent
	 * browsers from collapsing the whitespace in the output strings.
	 *
	 * ```js
	 * accounting.formatColumn([123.5, 3456.49, 777888.99, 12345678, -5432], { symbol: "$ " });
	 * ```
	 *
	 * @method formatColumn
	 * @for accounting
	 * @param {Array<Number>} list An array of numbers to format
	 * @param {Object}        [opts={}] Object containing all the options of the method.
	 * @param {Object|String} [symbol="$"] String with the currency symbol. For conveniency if can be an object containing all the options of the method.
	 * @param {Integer}       [precision=2] Number of decimal digits
	 * @param {String}        [thousand=','] String with the thousands separator.
	 * @param {String}        [decimal="."] String with the decimal separator.
	 * @param {String}        [format="%s%v"] String with the format to apply, where %s is the currency symbol and %v is the value.
	 * @return {Array<String>} array of accouting-formatted number strings of same length
	 */
	function formatColumn(list) {
	  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  if (!list) return [];

	  // Build options object from second param (if object) or all params, extending defaults:
	  opts = objectAssign({}, settings, opts);

	  // Check format (returns object with pos, neg and zero), only need pos for now:
	  var formats = _checkCurrencyFormat(opts.format);

	  // Whether to pad at start of string or after currency symbol:
	  var padAfterSymbol = formats.pos.indexOf('%s') < formats.pos.indexOf('%v');

	  // Store value for the length of the longest string in the column:
	  var maxLength = 0;

	  // Format the list according to options, store the length of the longest string:
	  var formatted = list.map(function (val) {
	    if (Array.isArray(val)) {
	      // Recursively format columns if list is a multi-dimensional array:
	      return formatColumn(val, opts);
	    }
	    // Clean up the value
	    val = unformat(val, opts.decimal);

	    // Choose which format to use for this value (pos, neg or zero):
	    var useFormat = undefined;

	    if (val > 0) {
	      useFormat = formats.pos;
	    } else if (val < 0) {
	      useFormat = formats.neg;
	    } else {
	      useFormat = formats.zero;
	    }

	    // Format this value, push into formatted list and save the length:
	    var fVal = useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(val), opts));

	    if (fVal.length > maxLength) {
	      maxLength = fVal.length;
	    }

	    return fVal;
	  });

	  // Pad each number in the list and send back the column of numbers:
	  return formatted.map(function (val) {
	    // Only if this is a string (not a nested array, which would have already been padded):
	    if (isString(val) && val.length < maxLength) {
	      // Depending on symbol position, pad after symbol or at index 0:
	      return padAfterSymbol ? val.replace(opts.symbol, opts.symbol + new Array(maxLength - val.length + 1).join(' ')) : new Array(maxLength - val.length + 1).join(' ') + val;
	    }
	    return val;
	  });
	}

	exports.settings = settings;
	exports.unformat = unformat;
	exports.toFixed = toFixed;
	exports.formatMoney = formatMoney;
	exports.formatNumber = formatNumber;
	exports.formatColumn = formatColumn;
	exports.format = formatMoney;
	exports.parse = unformat;

}));
//# sourceMappingURL=accounting.umd.js.map

/***/ }),

/***/ "./node_modules/decimal.js-light/decimal.js":
/*!**************************************************!*\
  !*** ./node_modules/decimal.js-light/decimal.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! decimal.js-light v2.5.0 https://github.com/MikeMcl/decimal.js-light/LICENCE */
;(function (globalScope) {
  'use strict';


  /*
   *  decimal.js-light v2.5.0
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js-light
   *  Copyright (c) 2018 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Expat Licence
   */


  // -----------------------------------  EDITABLE DEFAULTS  ------------------------------------ //


    // The limit on the value of `precision`, and on the value of the first argument to
    // `toDecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
  var MAX_DIGITS = 1e9,                        // 0 to 1e9


    // The initial configuration properties of the Decimal constructor.
    Decimal = {

      // These values must be integers within the stated ranges (inclusive).
      // Most of these values can be changed during run-time using `Decimal.config`.

      // The maximum number of significant digits of the result of a calculation or base conversion.
      // E.g. `Decimal.config({ precision: 20 });`
      precision: 20,                         // 1 to MAX_DIGITS

      // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
      // `toFixed`, `toPrecision` and `toSignificantDigits`.
      //
      // ROUND_UP         0 Away from zero.
      // ROUND_DOWN       1 Towards zero.
      // ROUND_CEIL       2 Towards +Infinity.
      // ROUND_FLOOR      3 Towards -Infinity.
      // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
      // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
      // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
      // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
      // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
      //
      // E.g.
      // `Decimal.rounding = 4;`
      // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
      rounding: 4,                           // 0 to 8

      // The exponent value at and beneath which `toString` returns exponential notation.
      // JavaScript numbers: -7
      toExpNeg: -7,                          // 0 to -MAX_E

      // The exponent value at and above which `toString` returns exponential notation.
      // JavaScript numbers: 21
      toExpPos:  21,                         // 0 to MAX_E

      // The natural logarithm of 10.
      // 115 digits
      LN10: '2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286'
    },


  // ----------------------------------- END OF EDITABLE DEFAULTS ------------------------------- //


    external = true,

    decimalError = '[DecimalError] ',
    invalidArgument = decimalError + 'Invalid argument: ',
    exponentOutOfRange = decimalError + 'Exponent out of range: ',

    mathfloor = Math.floor,
    mathpow = Math.pow,

    isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,

    ONE,
    BASE = 1e7,
    LOG_BASE = 7,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_E = mathfloor(MAX_SAFE_INTEGER / LOG_BASE),    // 1286742750677284

    // Decimal.prototype object
    P = {};


  // Decimal prototype methods


  /*
   *  absoluteValue                       abs
   *  comparedTo                          cmp
   *  decimalPlaces                       dp
   *  dividedBy                           div
   *  dividedToIntegerBy                  idiv
   *  equals                              eq
   *  exponent
   *  greaterThan                         gt
   *  greaterThanOrEqualTo                gte
   *  isInteger                           isint
   *  isNegative                          isneg
   *  isPositive                          ispos
   *  isZero
   *  lessThan                            lt
   *  lessThanOrEqualTo                   lte
   *  logarithm                           log
   *  minus                               sub
   *  modulo                              mod
   *  naturalExponential                  exp
   *  naturalLogarithm                    ln
   *  negated                             neg
   *  plus                                add
   *  precision                           sd
   *  squareRoot                          sqrt
   *  times                               mul
   *  toDecimalPlaces                     todp
   *  toExponential
   *  toFixed
   *  toInteger                           toint
   *  toNumber
   *  toPower                             pow
   *  toPrecision
   *  toSignificantDigits                 tosd
   *  toString
   *  valueOf                             val
   */


  /*
   * Return a new Decimal whose value is the absolute value of this Decimal.
   *
   */
  P.absoluteValue = P.abs = function () {
    var x = new this.constructor(this);
    if (x.s) x.s = 1;
    return x;
  };


  /*
   * Return
   *   1    if the value of this Decimal is greater than the value of `y`,
   *  -1    if the value of this Decimal is less than the value of `y`,
   *   0    if they have the same value
   *
   */
  P.comparedTo = P.cmp = function (y) {
    var i, j, xdL, ydL,
      x = this;

    y = new x.constructor(y);

    // Signs differ?
    if (x.s !== y.s) return x.s || -y.s;

    // Compare exponents.
    if (x.e !== y.e) return x.e > y.e ^ x.s < 0 ? 1 : -1;

    xdL = x.d.length;
    ydL = y.d.length;

    // Compare digit by digit.
    for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
      if (x.d[i] !== y.d[i]) return x.d[i] > y.d[i] ^ x.s < 0 ? 1 : -1;
    }

    // Compare lengths.
    return xdL === ydL ? 0 : xdL > ydL ^ x.s < 0 ? 1 : -1;
  };


  /*
   * Return the number of decimal places of the value of this Decimal.
   *
   */
  P.decimalPlaces = P.dp = function () {
    var x = this,
      w = x.d.length - 1,
      dp = (w - x.e) * LOG_BASE;

    // Subtract the number of trailing zeros of the last word.
    w = x.d[w];
    if (w) for (; w % 10 == 0; w /= 10) dp--;

    return dp < 0 ? 0 : dp;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal divided by `y`, truncated to
   * `precision` significant digits.
   *
   */
  P.dividedBy = P.div = function (y) {
    return divide(this, new this.constructor(y));
  };


  /*
   * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
   * by the value of `y`, truncated to `precision` significant digits.
   *
   */
  P.dividedToIntegerBy = P.idiv = function (y) {
    var x = this,
      Ctor = x.constructor;
    return round(divide(x, new Ctor(y), 0, 1), Ctor.precision);
  };


  /*
   * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
   *
   */
  P.equals = P.eq = function (y) {
    return !this.cmp(y);
  };


  /*
   * Return the (base 10) exponent value of this Decimal (this.e is the base 10000000 exponent).
   *
   */
  P.exponent = function () {
    return getBase10Exponent(this);
  };


  /*
   * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
   * false.
   *
   */
  P.greaterThan = P.gt = function (y) {
    return this.cmp(y) > 0;
  };


  /*
   * Return true if the value of this Decimal is greater than or equal to the value of `y`,
   * otherwise return false.
   *
   */
  P.greaterThanOrEqualTo = P.gte = function (y) {
    return this.cmp(y) >= 0;
  };


  /*
   * Return true if the value of this Decimal is an integer, otherwise return false.
   *
   */
  P.isInteger = P.isint = function () {
    return this.e > this.d.length - 2;
  };


  /*
   * Return true if the value of this Decimal is negative, otherwise return false.
   *
   */
  P.isNegative = P.isneg = function () {
    return this.s < 0;
  };


  /*
   * Return true if the value of this Decimal is positive, otherwise return false.
   *
   */
  P.isPositive = P.ispos = function () {
    return this.s > 0;
  };


  /*
   * Return true if the value of this Decimal is 0, otherwise return false.
   *
   */
  P.isZero = function () {
    return this.s === 0;
  };


  /*
   * Return true if the value of this Decimal is less than `y`, otherwise return false.
   *
   */
  P.lessThan = P.lt = function (y) {
    return this.cmp(y) < 0;
  };


  /*
   * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
   *
   */
  P.lessThanOrEqualTo = P.lte = function (y) {
    return this.cmp(y) < 1;
  };


  /*
   * Return the logarithm of the value of this Decimal to the specified base, truncated to
   * `precision` significant digits.
   *
   * If no base is specified, return log[10](x).
   *
   * log[base](x) = ln(x) / ln(base)
   *
   * The maximum error of the result is 1 ulp (unit in the last place).
   *
   * [base] {number|string|Decimal} The base of the logarithm.
   *
   */
  P.logarithm = P.log = function (base) {
    var r,
      x = this,
      Ctor = x.constructor,
      pr = Ctor.precision,
      wpr = pr + 5;

    // Default base is 10.
    if (base === void 0) {
      base = new Ctor(10);
    } else {
      base = new Ctor(base);

      // log[-b](x) = NaN
      // log[0](x)  = NaN
      // log[1](x)  = NaN
      if (base.s < 1 || base.eq(ONE)) throw Error(decimalError + 'NaN');
    }

    // log[b](-x) = NaN
    // log[b](0) = -Infinity
    if (x.s < 1) throw Error(decimalError + (x.s ? 'NaN' : '-Infinity'));

    // log[b](1) = 0
    if (x.eq(ONE)) return new Ctor(0);

    external = false;
    r = divide(ln(x, wpr), ln(base, wpr), wpr);
    external = true;

    return round(r, pr);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal minus `y`, truncated to
   * `precision` significant digits.
   *
   */
  P.minus = P.sub = function (y) {
    var x = this;
    y = new x.constructor(y);
    return x.s == y.s ? subtract(x, y) : add(x, (y.s = -y.s, y));
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal modulo `y`, truncated to
   * `precision` significant digits.
   *
   */
  P.modulo = P.mod = function (y) {
    var q,
      x = this,
      Ctor = x.constructor,
      pr = Ctor.precision;

    y = new Ctor(y);

    // x % 0 = NaN
    if (!y.s) throw Error(decimalError + 'NaN');

    // Return x if x is 0.
    if (!x.s) return round(new Ctor(x), pr);

    // Prevent rounding of intermediate calculations.
    external = false;
    q = divide(x, y, 0, 1).times(y);
    external = true;

    return x.minus(q);
  };


  /*
   * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
   * i.e. the base e raised to the power the value of this Decimal, truncated to `precision`
   * significant digits.
   *
   */
  P.naturalExponential = P.exp = function () {
    return exp(this);
  };


  /*
   * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
   * truncated to `precision` significant digits.
   *
   */
  P.naturalLogarithm = P.ln = function () {
    return ln(this);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by
   * -1.
   *
   */
  P.negated = P.neg = function () {
    var x = new this.constructor(this);
    x.s = -x.s || 0;
    return x;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal plus `y`, truncated to
   * `precision` significant digits.
   *
   */
  P.plus = P.add = function (y) {
    var x = this;
    y = new x.constructor(y);
    return x.s == y.s ? add(x, y) : subtract(x, (y.s = -y.s, y));
  };


  /*
   * Return the number of significant digits of the value of this Decimal.
   *
   * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
   *
   */
  P.precision = P.sd = function (z) {
    var e, sd, w,
      x = this;

    if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);

    e = getBase10Exponent(x) + 1;
    w = x.d.length - 1;
    sd = w * LOG_BASE + 1;
    w = x.d[w];

    // If non-zero...
    if (w) {

      // Subtract the number of trailing zeros of the last word.
      for (; w % 10 == 0; w /= 10) sd--;

      // Add the number of digits of the first word.
      for (w = x.d[0]; w >= 10; w /= 10) sd++;
    }

    return z && e > sd ? e : sd;
  };


  /*
   * Return a new Decimal whose value is the square root of this Decimal, truncated to `precision`
   * significant digits.
   *
   */
  P.squareRoot = P.sqrt = function () {
    var e, n, pr, r, s, t, wpr,
      x = this,
      Ctor = x.constructor;

    // Negative or zero?
    if (x.s < 1) {
      if (!x.s) return new Ctor(0);

      // sqrt(-x) = NaN
      throw Error(decimalError + 'NaN');
    }

    e = getBase10Exponent(x);
    external = false;

    // Initial estimate.
    s = Math.sqrt(+x);

    // Math.sqrt underflow/overflow?
    // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
    if (s == 0 || s == 1 / 0) {
      n = digitsToString(x.d);
      if ((n.length + e) % 2 == 0) n += '0';
      s = Math.sqrt(n);
      e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);

      if (s == 1 / 0) {
        n = '1e' + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf('e') + 1) + e;
      }

      r = new Ctor(n);
    } else {
      r = new Ctor(s.toString());
    }

    pr = Ctor.precision;
    s = wpr = pr + 3;

    // Newton-Raphson iteration.
    for (;;) {
      t = r;
      r = t.plus(divide(x, t, wpr + 2)).times(0.5);

      if (digitsToString(t.d).slice(0, wpr) === (n = digitsToString(r.d)).slice(0, wpr)) {
        n = n.slice(wpr - 3, wpr + 1);

        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
        // 4999, i.e. approaching a rounding boundary, continue the iteration.
        if (s == wpr && n == '4999') {

          // On the first iteration only, check to see if rounding up gives the exact result as the
          // nines may infinitely repeat.
          round(t, pr + 1, 0);

          if (t.times(t).eq(x)) {
            r = t;
            break;
          }
        } else if (n != '9999') {
          break;
        }

        wpr += 4;
      }
    }

    external = true;

    return round(r, pr);
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal times `y`, truncated to
   * `precision` significant digits.
   *
   */
  P.times = P.mul = function (y) {
    var carry, e, i, k, r, rL, t, xdL, ydL,
      x = this,
      Ctor = x.constructor,
      xd = x.d,
      yd = (y = new Ctor(y)).d;

    // Return 0 if either is 0.
    if (!x.s || !y.s) return new Ctor(0);

    y.s *= x.s;
    e = x.e + y.e;
    xdL = xd.length;
    ydL = yd.length;

    // Ensure xd points to the longer array.
    if (xdL < ydL) {
      r = xd;
      xd = yd;
      yd = r;
      rL = xdL;
      xdL = ydL;
      ydL = rL;
    }

    // Initialise the result array with zeros.
    r = [];
    rL = xdL + ydL;
    for (i = rL; i--;) r.push(0);

    // Multiply!
    for (i = ydL; --i >= 0;) {
      carry = 0;
      for (k = xdL + i; k > i;) {
        t = r[k] + yd[i] * xd[k - i - 1] + carry;
        r[k--] = t % BASE | 0;
        carry = t / BASE | 0;
      }

      r[k] = (r[k] + carry) % BASE | 0;
    }

    // Remove trailing zeros.
    for (; !r[--rL];) r.pop();

    if (carry) ++e;
    else r.shift();

    y.d = r;
    y.e = e;

    return external ? round(y, Ctor.precision) : y;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
   * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
   *
   * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toDecimalPlaces = P.todp = function (dp, rm) {
    var x = this,
      Ctor = x.constructor;

    x = new Ctor(x);
    if (dp === void 0) return x;

    checkInt32(dp, 0, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);

    return round(x, dp + getBase10Exponent(x) + 1, rm);
  };


  /*
   * Return a string representing the value of this Decimal in exponential notation rounded to
   * `dp` fixed decimal places using rounding mode `rounding`.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toExponential = function (dp, rm) {
    var str,
      x = this,
      Ctor = x.constructor;

    if (dp === void 0) {
      str = toString(x, true);
    } else {
      checkInt32(dp, 0, MAX_DIGITS);

      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);

      x = round(new Ctor(x), dp + 1, rm);
      str = toString(x, true, dp + 1);
    }

    return str;
  };


  /*
   * Return a string representing the value of this Decimal in normal (fixed-point) notation to
   * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
   * omitted.
   *
   * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   * (-0).toFixed(3) is '0.000'.
   * (-0.5).toFixed(0) is '-0'.
   *
   */
  P.toFixed = function (dp, rm) {
    var str, y,
      x = this,
      Ctor = x.constructor;

    if (dp === void 0) return toString(x);

    checkInt32(dp, 0, MAX_DIGITS);

    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);

    y = round(new Ctor(x), dp + getBase10Exponent(x) + 1, rm);
    str = toString(y.abs(), false, dp + getBase10Exponent(y) + 1);

    // To determine whether to add the minus sign look at the value before it was rounded,
    // i.e. look at `x` rather than `y`.
    return x.isneg() && !x.isZero() ? '-' + str : str;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
   * rounding mode `rounding`.
   *
   */
  P.toInteger = P.toint = function () {
    var x = this,
      Ctor = x.constructor;
    return round(new Ctor(x), getBase10Exponent(x) + 1, Ctor.rounding);
  };


  /*
   * Return the value of this Decimal converted to a number primitive.
   *
   */
  P.toNumber = function () {
    return +this;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal raised to the power `y`,
   * truncated to `precision` significant digits.
   *
   * For non-integer or very large exponents pow(x, y) is calculated using
   *
   *   x^y = exp(y*ln(x))
   *
   * The maximum error is 1 ulp (unit in last place).
   *
   * y {number|string|Decimal} The power to which to raise this Decimal.
   *
   */
  P.toPower = P.pow = function (y) {
    var e, k, pr, r, sign, yIsInt,
      x = this,
      Ctor = x.constructor,
      guard = 12,
      yn = +(y = new Ctor(y));

    // pow(x, 0) = 1
    if (!y.s) return new Ctor(ONE);

    x = new Ctor(x);

    // pow(0, y > 0) = 0
    // pow(0, y < 0) = Infinity
    if (!x.s) {
      if (y.s < 1) throw Error(decimalError + 'Infinity');
      return x;
    }

    // pow(1, y) = 1
    if (x.eq(ONE)) return x;

    pr = Ctor.precision;

    // pow(x, 1) = x
    if (y.eq(ONE)) return round(x, pr);

    e = y.e;
    k = y.d.length - 1;
    yIsInt = e >= k;
    sign = x.s;

    if (!yIsInt) {

      // pow(x < 0, y non-integer) = NaN
      if (sign < 0) throw Error(decimalError + 'NaN');

    // If y is a small integer use the 'exponentiation by squaring' algorithm.
    } else if ((k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
      r = new Ctor(ONE);

      // Max k of 9007199254740991 takes 53 loop iterations.
      // Maximum digits array length; leaves [28, 34] guard digits.
      e = Math.ceil(pr / LOG_BASE + 4);

      external = false;

      for (;;) {
        if (k % 2) {
          r = r.times(x);
          truncate(r.d, e);
        }

        k = mathfloor(k / 2);
        if (k === 0) break;

        x = x.times(x);
        truncate(x.d, e);
      }

      external = true;

      return y.s < 0 ? new Ctor(ONE).div(r) : round(r, pr);
    }

    // Result is negative if x is negative and the last digit of integer y is odd.
    sign = sign < 0 && y.d[Math.max(e, k)] & 1 ? -1 : 1;

    x.s = 1;
    external = false;
    r = y.times(ln(x, pr + guard));
    external = true;
    r = exp(r);
    r.s = sign;

    return r;
  };


  /*
   * Return a string representing the value of this Decimal rounded to `sd` significant digits
   * using rounding mode `rounding`.
   *
   * Return exponential notation if `sd` is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toPrecision = function (sd, rm) {
    var e, str,
      x = this,
      Ctor = x.constructor;

    if (sd === void 0) {
      e = getBase10Exponent(x);
      str = toString(x, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
    } else {
      checkInt32(sd, 1, MAX_DIGITS);

      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);

      x = round(new Ctor(x), sd, rm);
      e = getBase10Exponent(x);
      str = toString(x, sd <= e || e <= Ctor.toExpNeg, sd);
    }

    return str;
  };


  /*
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
   * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
   * omitted.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */
  P.toSignificantDigits = P.tosd = function (sd, rm) {
    var x = this,
      Ctor = x.constructor;

    if (sd === void 0) {
      sd = Ctor.precision;
      rm = Ctor.rounding;
    } else {
      checkInt32(sd, 1, MAX_DIGITS);

      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);
    }

    return round(new Ctor(x), sd, rm);
  };


  /*
   * Return a string representing the value of this Decimal.
   *
   * Return exponential notation if this Decimal has a positive exponent equal to or greater than
   * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
   *
   */
  P.toString = P.valueOf = P.val = P.toJSON = function () {
    var x = this,
      e = getBase10Exponent(x),
      Ctor = x.constructor;

    return toString(x, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
  };


  // Helper functions for Decimal.prototype (P) and/or Decimal methods, and their callers.


  /*
   *  add                 P.minus, P.plus
   *  checkInt32          P.todp, P.toExponential, P.toFixed, P.toPrecision, P.tosd
   *  digitsToString      P.log, P.sqrt, P.pow, toString, exp, ln
   *  divide              P.div, P.idiv, P.log, P.mod, P.sqrt, exp, ln
   *  exp                 P.exp, P.pow
   *  getBase10Exponent   P.exponent, P.sd, P.toint, P.sqrt, P.todp, P.toFixed, P.toPrecision,
   *                      P.toString, divide, round, toString, exp, ln
   *  getLn10             P.log, ln
   *  getZeroString       digitsToString, toString
   *  ln                  P.log, P.ln, P.pow, exp
   *  parseDecimal        Decimal
   *  round               P.abs, P.idiv, P.log, P.minus, P.mod, P.neg, P.plus, P.toint, P.sqrt,
   *                      P.times, P.todp, P.toExponential, P.toFixed, P.pow, P.toPrecision, P.tosd,
   *                      divide, getLn10, exp, ln
   *  subtract            P.minus, P.plus
   *  toString            P.toExponential, P.toFixed, P.toPrecision, P.toString, P.valueOf
   *  truncate            P.pow
   *
   *  Throws:             P.log, P.mod, P.sd, P.sqrt, P.pow,  checkInt32, divide, round,
   *                      getLn10, exp, ln, parseDecimal, Decimal, config
   */


  function add(x, y) {
    var carry, d, e, i, k, len, xd, yd,
      Ctor = x.constructor,
      pr = Ctor.precision;

    // If either is zero...
    if (!x.s || !y.s) {

      // Return x if y is zero.
      // Return y if y is non-zero.
      if (!y.s) y = new Ctor(x);
      return external ? round(y, pr) : y;
    }

    xd = x.d;
    yd = y.d;

    // x and y are finite, non-zero numbers with the same sign.

    k = x.e;
    e = y.e;
    xd = xd.slice();
    i = k - e;

    // If base 1e7 exponents differ...
    if (i) {
      if (i < 0) {
        d = xd;
        i = -i;
        len = yd.length;
      } else {
        d = yd;
        e = k;
        len = xd.length;
      }

      // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
      k = Math.ceil(pr / LOG_BASE);
      len = k > len ? k + 1 : len + 1;

      if (i > len) {
        i = len;
        d.length = 1;
      }

      // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
      d.reverse();
      for (; i--;) d.push(0);
      d.reverse();
    }

    len = xd.length;
    i = yd.length;

    // If yd is longer than xd, swap xd and yd so xd points to the longer array.
    if (len - i < 0) {
      i = len;
      d = yd;
      yd = xd;
      xd = d;
    }

    // Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
    for (carry = 0; i;) {
      carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
      xd[i] %= BASE;
    }

    if (carry) {
      xd.unshift(carry);
      ++e;
    }

    // Remove trailing zeros.
    // No need to check for zero, as +x + +y != 0 && -x + -y != 0
    for (len = xd.length; xd[--len] == 0;) xd.pop();

    y.d = xd;
    y.e = e;

    return external ? round(y, pr) : y;
  }


  function checkInt32(i, min, max) {
    if (i !== ~~i || i < min || i > max) {
      throw Error(invalidArgument + i);
    }
  }


  function digitsToString(d) {
    var i, k, ws,
      indexOfLastWord = d.length - 1,
      str = '',
      w = d[0];

    if (indexOfLastWord > 0) {
      str += w;
      for (i = 1; i < indexOfLastWord; i++) {
        ws = d[i] + '';
        k = LOG_BASE - ws.length;
        if (k) str += getZeroString(k);
        str += ws;
      }

      w = d[i];
      ws = w + '';
      k = LOG_BASE - ws.length;
      if (k) str += getZeroString(k);
    } else if (w === 0) {
      return '0';
    }

    // Remove trailing zeros of last w.
    for (; w % 10 === 0;) w /= 10;

    return str + w;
  }


  var divide = (function () {

    // Assumes non-zero x and k, and hence non-zero result.
    function multiplyInteger(x, k) {
      var temp,
        carry = 0,
        i = x.length;

      for (x = x.slice(); i--;) {
        temp = x[i] * k + carry;
        x[i] = temp % BASE | 0;
        carry = temp / BASE | 0;
      }

      if (carry) x.unshift(carry);

      return x;
    }

    function compare(a, b, aL, bL) {
      var i, r;

      if (aL != bL) {
        r = aL > bL ? 1 : -1;
      } else {
        for (i = r = 0; i < aL; i++) {
          if (a[i] != b[i]) {
            r = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }

      return r;
    }

    function subtract(a, b, aL) {
      var i = 0;

      // Subtract b from a.
      for (; aL--;) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * BASE + a[aL] - b[aL];
      }

      // Remove leading zeros.
      for (; !a[0] && a.length > 1;) a.shift();
    }

    return function (x, y, pr, dp) {
      var cmp, e, i, k, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz,
        Ctor = x.constructor,
        sign = x.s == y.s ? 1 : -1,
        xd = x.d,
        yd = y.d;

      // Either 0?
      if (!x.s) return new Ctor(x);
      if (!y.s) throw Error(decimalError + 'Division by zero');

      e = x.e - y.e;
      yL = yd.length;
      xL = xd.length;
      q = new Ctor(sign);
      qd = q.d = [];

      // Result exponent may be one less than e.
      for (i = 0; yd[i] == (xd[i] || 0); ) ++i;
      if (yd[i] > (xd[i] || 0)) --e;

      if (pr == null) {
        sd = pr = Ctor.precision;
      } else if (dp) {
        sd = pr + (getBase10Exponent(x) - getBase10Exponent(y)) + 1;
      } else {
        sd = pr;
      }

      if (sd < 0) return new Ctor(0);

      // Convert precision in number of base 10 digits to base 1e7 digits.
      sd = sd / LOG_BASE + 2 | 0;
      i = 0;

      // divisor < 1e7
      if (yL == 1) {
        k = 0;
        yd = yd[0];
        sd++;

        // k is the carry.
        for (; (i < xL || k) && sd--; i++) {
          t = k * BASE + (xd[i] || 0);
          qd[i] = t / yd | 0;
          k = t % yd | 0;
        }

      // divisor >= 1e7
      } else {

        // Normalise xd and yd so highest order digit of yd is >= BASE/2
        k = BASE / (yd[0] + 1) | 0;

        if (k > 1) {
          yd = multiplyInteger(yd, k);
          xd = multiplyInteger(xd, k);
          yL = yd.length;
          xL = xd.length;
        }

        xi = yL;
        rem = xd.slice(0, yL);
        remL = rem.length;

        // Add zeros to make remainder as long as divisor.
        for (; remL < yL;) rem[remL++] = 0;

        yz = yd.slice();
        yz.unshift(0);
        yd0 = yd[0];

        if (yd[1] >= BASE / 2) ++yd0;

        do {
          k = 0;

          // Compare divisor and remainder.
          cmp = compare(yd, rem, yL, remL);

          // If divisor < remainder.
          if (cmp < 0) {

            // Calculate trial digit, k.
            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * BASE + (rem[1] || 0);

            // k will be how many times the divisor goes into the current remainder.
            k = rem0 / yd0 | 0;

            //  Algorithm:
            //  1. product = divisor * trial digit (k)
            //  2. if product > remainder: product -= divisor, k--
            //  3. remainder -= product
            //  4. if product was < remainder at 2:
            //    5. compare new remainder and divisor
            //    6. If remainder > divisor: remainder -= divisor, k++

            if (k > 1) {
              if (k >= BASE) k = BASE - 1;

              // product = divisor * trial digit.
              prod = multiplyInteger(yd, k);
              prodL = prod.length;
              remL = rem.length;

              // Compare product and remainder.
              cmp = compare(prod, rem, prodL, remL);

              // product > remainder.
              if (cmp == 1) {
                k--;

                // Subtract divisor from product.
                subtract(prod, yL < prodL ? yz : yd, prodL);
              }
            } else {

              // cmp is -1.
              // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
              // to avoid it. If k is 1 there is a need to compare yd and rem again below.
              if (k == 0) cmp = k = 1;
              prod = yd.slice();
            }

            prodL = prod.length;
            if (prodL < remL) prod.unshift(0);

            // Subtract product from remainder.
            subtract(rem, prod, remL);

            // If product was < previous remainder.
            if (cmp == -1) {
              remL = rem.length;

              // Compare divisor and new remainder.
              cmp = compare(yd, rem, yL, remL);

              // If divisor < new remainder, subtract divisor from remainder.
              if (cmp < 1) {
                k++;

                // Subtract divisor from remainder.
                subtract(rem, yL < remL ? yz : yd, remL);
              }
            }

            remL = rem.length;
          } else if (cmp === 0) {
            k++;
            rem = [0];
          }    // if cmp === 1, k will be 0

          // Add the next digit, k, to the result array.
          qd[i++] = k;

          // Update the remainder.
          if (cmp && rem[0]) {
            rem[remL++] = xd[xi] || 0;
          } else {
            rem = [xd[xi]];
            remL = 1;
          }

        } while ((xi++ < xL || rem[0] !== void 0) && sd--);
      }

      // Leading zero?
      if (!qd[0]) qd.shift();

      q.e = e;

      return round(q, dp ? pr + getBase10Exponent(q) + 1 : pr);
    };
  })();


  /*
   * Return a new Decimal whose value is the natural exponential of `x` truncated to `sd`
   * significant digits.
   *
   * Taylor/Maclaurin series.
   *
   * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
   *
   * Argument reduction:
   *   Repeat x = x / 32, k += 5, until |x| < 0.1
   *   exp(x) = exp(x / 2^k)^(2^k)
   *
   * Previously, the argument was initially reduced by
   * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
   * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
   * found to be slower than just dividing repeatedly by 32 as above.
   *
   * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
   *
   *  exp(x) is non-terminating for any finite, non-zero x.
   *
   */
  function exp(x, sd) {
    var denominator, guard, pow, sum, t, wpr,
      i = 0,
      k = 0,
      Ctor = x.constructor,
      pr = Ctor.precision;

    if (getBase10Exponent(x) > 16) throw Error(exponentOutOfRange + getBase10Exponent(x));

    // exp(0) = 1
    if (!x.s) return new Ctor(ONE);

    if (sd == null) {
      external = false;
      wpr = pr;
    } else {
      wpr = sd;
    }

    t = new Ctor(0.03125);

    while (x.abs().gte(0.1)) {
      x = x.times(t);    // x = x / 2^5
      k += 5;
    }

    // Estimate the precision increase necessary to ensure the first 4 rounding digits are correct.
    guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
    wpr += guard;
    denominator = pow = sum = new Ctor(ONE);
    Ctor.precision = wpr;

    for (;;) {
      pow = round(pow.times(x), wpr);
      denominator = denominator.times(++i);
      t = sum.plus(divide(pow, denominator, wpr));

      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
        while (k--) sum = round(sum.times(sum), wpr);
        Ctor.precision = pr;
        return sd == null ? (external = true, round(sum, pr)) : sum;
      }

      sum = t;
    }
  }


  // Calculate the base 10 exponent from the base 1e7 exponent.
  function getBase10Exponent(x) {
    var e = x.e * LOG_BASE,
      w = x.d[0];

    // Add the number of digits of the first word of the digits array.
    for (; w >= 10; w /= 10) e++;
    return e;
  }


  function getLn10(Ctor, sd, pr) {

    if (sd > Ctor.LN10.sd()) {


      // Reset global state in case the exception is caught.
      external = true;
      if (pr) Ctor.precision = pr;
      throw Error(decimalError + 'LN10 precision limit exceeded');
    }

    return round(new Ctor(Ctor.LN10), sd);
  }


  function getZeroString(k) {
    var zs = '';
    for (; k--;) zs += '0';
    return zs;
  }


  /*
   * Return a new Decimal whose value is the natural logarithm of `x` truncated to `sd` significant
   * digits.
   *
   *  ln(n) is non-terminating (n != 1)
   *
   */
  function ln(y, sd) {
    var c, c0, denominator, e, numerator, sum, t, wpr, x2,
      n = 1,
      guard = 10,
      x = y,
      xd = x.d,
      Ctor = x.constructor,
      pr = Ctor.precision;

    // ln(-x) = NaN
    // ln(0) = -Infinity
    if (x.s < 1) throw Error(decimalError + (x.s ? 'NaN' : '-Infinity'));

    // ln(1) = 0
    if (x.eq(ONE)) return new Ctor(0);

    if (sd == null) {
      external = false;
      wpr = pr;
    } else {
      wpr = sd;
    }

    if (x.eq(10)) {
      if (sd == null) external = true;
      return getLn10(Ctor, wpr);
    }

    wpr += guard;
    Ctor.precision = wpr;
    c = digitsToString(xd);
    c0 = c.charAt(0);
    e = getBase10Exponent(x);

    if (Math.abs(e) < 1.5e15) {

      // Argument reduction.
      // The series converges faster the closer the argument is to 1, so using
      // ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
      // multiply the argument by itself until the leading digits of the significand are 7, 8, 9,
      // 10, 11, 12 or 13, recording the number of multiplications so the sum of the series can
      // later be divided by this number, then separate out the power of 10 using
      // ln(a*10^b) = ln(a) + b*ln(10).

      // max n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
      //while (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
      // max n is 6 (gives 0.7 - 1.3)
      while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
        x = x.times(y);
        c = digitsToString(x.d);
        c0 = c.charAt(0);
        n++;
      }

      e = getBase10Exponent(x);

      if (c0 > 1) {
        x = new Ctor('0.' + c);
        e++;
      } else {
        x = new Ctor(c0 + '.' + c.slice(1));
      }
    } else {

      // The argument reduction method above may result in overflow if the argument y is a massive
      // number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
      // function using ln(x*10^e) = ln(x) + e*ln(10).
      t = getLn10(Ctor, wpr + 2, pr).times(e + '');
      x = ln(new Ctor(c0 + '.' + c.slice(1)), wpr - guard).plus(t);

      Ctor.precision = pr;
      return sd == null ? (external = true, round(x, pr)) : x;
    }

    // x is reduced to a value near 1.

    // Taylor series.
    // ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
    // where x = (y - 1)/(y + 1)    (|x| < 1)
    sum = numerator = x = divide(x.minus(ONE), x.plus(ONE), wpr);
    x2 = round(x.times(x), wpr);
    denominator = 3;

    for (;;) {
      numerator = round(numerator.times(x2), wpr);
      t = sum.plus(divide(numerator, new Ctor(denominator), wpr));

      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
        sum = sum.times(2);

        // Reverse the argument reduction.
        if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ''));
        sum = divide(sum, new Ctor(n), wpr);

        Ctor.precision = pr;
        return sd == null ? (external = true, round(sum, pr)) : sum;
      }

      sum = t;
      denominator += 2;
    }
  }


  /*
   * Parse the value of a new Decimal `x` from string `str`.
   */
  function parseDecimal(x, str) {
    var e, i, len;

    // Decimal point?
    if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

    // Exponential form?
    if ((i = str.search(/e/i)) > 0) {

      // Determine exponent.
      if (e < 0) e = i;
      e += +str.slice(i + 1);
      str = str.substring(0, i);
    } else if (e < 0) {

      // Integer.
      e = str.length;
    }

    // Determine leading zeros.
    for (i = 0; str.charCodeAt(i) === 48;) ++i;

    // Determine trailing zeros.
    for (len = str.length; str.charCodeAt(len - 1) === 48;) --len;
    str = str.slice(i, len);

    if (str) {
      len -= i;
      e = e - i - 1;
      x.e = mathfloor(e / LOG_BASE);
      x.d = [];

      // Transform base

      // e is the base 10 exponent.
      // i is where to slice str to get the first word of the digits array.
      i = (e + 1) % LOG_BASE;
      if (e < 0) i += LOG_BASE;

      if (i < len) {
        if (i) x.d.push(+str.slice(0, i));
        for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
        str = str.slice(i);
        i = LOG_BASE - str.length;
      } else {
        i -= len;
      }

      for (; i--;) str += '0';
      x.d.push(+str);

      if (external && (x.e > MAX_E || x.e < -MAX_E)) throw Error(exponentOutOfRange + e);
    } else {

      // Zero.
      x.s = 0;
      x.e = 0;
      x.d = [0];
    }

    return x;
  }


  /*
   * Round `x` to `sd` significant digits, using rounding mode `rm` if present (truncate otherwise).
   */
   function round(x, sd, rm) {
    var i, j, k, n, rd, doRound, w, xdi,
      xd = x.d;

    // rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
    // w: the word of xd which contains the rounding digit, a base 1e7 number.
    // xdi: the index of w within xd.
    // n: the number of digits of w.
    // i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
    // they had leading zeros)
    // j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).

    // Get the length of the first word of the digits array xd.
    for (n = 1, k = xd[0]; k >= 10; k /= 10) n++;
    i = sd - n;

    // Is the rounding digit in the first word of xd?
    if (i < 0) {
      i += LOG_BASE;
      j = sd;
      w = xd[xdi = 0];
    } else {
      xdi = Math.ceil((i + 1) / LOG_BASE);
      k = xd.length;
      if (xdi >= k) return x;
      w = k = xd[xdi];

      // Get the number of digits of w.
      for (n = 1; k >= 10; k /= 10) n++;

      // Get the index of rd within w.
      i %= LOG_BASE;

      // Get the index of rd within w, adjusted for leading zeros.
      // The number of leading zeros of w is given by LOG_BASE - n.
      j = i - LOG_BASE + n;
    }

    if (rm !== void 0) {
      k = mathpow(10, n - j - 1);

      // Get the rounding digit at index j of w.
      rd = w / k % 10 | 0;

      // Are there any non-zero digits after the rounding digit?
      doRound = sd < 0 || xd[xdi + 1] !== void 0 || w % k;

      // The expression `w % mathpow(10, n - j - 1)` returns all the digits of w to the right of the
      // digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression will give
      // 714.

      doRound = rm < 4
        ? (rd || doRound) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
        : rd > 5 || rd == 5 && (rm == 4 || doRound || rm == 6 &&

          // Check whether the digit to the left of the rounding digit is odd.
          ((i > 0 ? j > 0 ? w / mathpow(10, n - j) : 0 : xd[xdi - 1]) % 10) & 1 ||
            rm == (x.s < 0 ? 8 : 7));
    }

    if (sd < 1 || !xd[0]) {
      if (doRound) {
        k = getBase10Exponent(x);
        xd.length = 1;

        // Convert sd to decimal places.
        sd = sd - k - 1;

        // 1, 0.1, 0.01, 0.001, 0.0001 etc.
        xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
        x.e = mathfloor(-sd / LOG_BASE) || 0;
      } else {
        xd.length = 1;

        // Zero.
        xd[0] = x.e = x.s = 0;
      }

      return x;
    }

    // Remove excess digits.
    if (i == 0) {
      xd.length = xdi;
      k = 1;
      xdi--;
    } else {
      xd.length = xdi + 1;
      k = mathpow(10, LOG_BASE - i);

      // E.g. 56700 becomes 56000 if 7 is the rounding digit.
      // j > 0 means i > number of leading zeros of w.
      xd[xdi] = j > 0 ? (w / mathpow(10, n - j) % mathpow(10, j) | 0) * k : 0;
    }

    if (doRound) {
      for (;;) {

        // Is the digit to be rounded up in the first word of xd?
        if (xdi == 0) {
          if ((xd[0] += k) == BASE) {
            xd[0] = 1;
            ++x.e;
          }

          break;
        } else {
          xd[xdi] += k;
          if (xd[xdi] != BASE) break;
          xd[xdi--] = 0;
          k = 1;
        }
      }
    }

    // Remove trailing zeros.
    for (i = xd.length; xd[--i] === 0;) xd.pop();

    if (external && (x.e > MAX_E || x.e < -MAX_E)) {
      throw Error(exponentOutOfRange + getBase10Exponent(x));
    }

    return x;
  }


  function subtract(x, y) {
    var d, e, i, j, k, len, xd, xe, xLTy, yd,
      Ctor = x.constructor,
      pr = Ctor.precision;

    // Return y negated if x is zero.
    // Return x if y is zero and x is non-zero.
    if (!x.s || !y.s) {
      if (y.s) y.s = -y.s;
      else y = new Ctor(x);
      return external ? round(y, pr) : y;
    }

    xd = x.d;
    yd = y.d;

    // x and y are non-zero numbers with the same sign.

    e = y.e;
    xe = x.e;
    xd = xd.slice();
    k = xe - e;

    // If exponents differ...
    if (k) {
      xLTy = k < 0;

      if (xLTy) {
        d = xd;
        k = -k;
        len = yd.length;
      } else {
        d = yd;
        e = xe;
        len = xd.length;
      }

      // Numbers with massively different exponents would result in a very high number of zeros
      // needing to be prepended, but this can be avoided while still ensuring correct rounding by
      // limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
      i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;

      if (k > i) {
        k = i;
        d.length = 1;
      }

      // Prepend zeros to equalise exponents.
      d.reverse();
      for (i = k; i--;) d.push(0);
      d.reverse();

    // Base 1e7 exponents equal.
    } else {

      // Check digits to determine which is the bigger number.

      i = xd.length;
      len = yd.length;
      xLTy = i < len;
      if (xLTy) len = i;

      for (i = 0; i < len; i++) {
        if (xd[i] != yd[i]) {
          xLTy = xd[i] < yd[i];
          break;
        }
      }

      k = 0;
    }

    if (xLTy) {
      d = xd;
      xd = yd;
      yd = d;
      y.s = -y.s;
    }

    len = xd.length;

    // Append zeros to xd if shorter.
    // Don't add zeros to yd if shorter as subtraction only needs to start at yd length.
    for (i = yd.length - len; i > 0; --i) xd[len++] = 0;

    // Subtract yd from xd.
    for (i = yd.length; i > k;) {
      if (xd[--i] < yd[i]) {
        for (j = i; j && xd[--j] === 0;) xd[j] = BASE - 1;
        --xd[j];
        xd[i] += BASE;
      }

      xd[i] -= yd[i];
    }

    // Remove trailing zeros.
    for (; xd[--len] === 0;) xd.pop();

    // Remove leading zeros and adjust exponent accordingly.
    for (; xd[0] === 0; xd.shift()) --e;

    // Zero?
    if (!xd[0]) return new Ctor(0);

    y.d = xd;
    y.e = e;

    //return external && xd.length >= pr / LOG_BASE ? round(y, pr) : y;
    return external ? round(y, pr) : y;
  }


  function toString(x, isExp, sd) {
    var k,
      e = getBase10Exponent(x),
      str = digitsToString(x.d),
      len = str.length;

    if (isExp) {
      if (sd && (k = sd - len) > 0) {
        str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k);
      } else if (len > 1) {
        str = str.charAt(0) + '.' + str.slice(1);
      }

      str = str + (e < 0 ? 'e' : 'e+') + e;
    } else if (e < 0) {
      str = '0.' + getZeroString(-e - 1) + str;
      if (sd && (k = sd - len) > 0) str += getZeroString(k);
    } else if (e >= len) {
      str += getZeroString(e + 1 - len);
      if (sd && (k = sd - e - 1) > 0) str = str + '.' + getZeroString(k);
    } else {
      if ((k = e + 1) < len) str = str.slice(0, k) + '.' + str.slice(k);
      if (sd && (k = sd - len) > 0) {
        if (e + 1 === len) str += '.';
        str += getZeroString(k);
      }
    }

    return x.s < 0 ? '-' + str : str;
  }


  // Does not strip trailing zeros.
  function truncate(arr, len) {
    if (arr.length > len) {
      arr.length = len;
      return true;
    }
  }


  // Decimal methods


  /*
   *  clone
   *  config/set
   */


  /*
   * Create and return a Decimal constructor with the same configuration properties as this Decimal
   * constructor.
   *
   */
  function clone(obj) {
    var i, p, ps;

    /*
     * The Decimal constructor and exported function.
     * Return a new Decimal instance.
     *
     * value {number|string|Decimal} A numeric value.
     *
     */
    function Decimal(value) {
      var x = this;

      // Decimal called without new.
      if (!(x instanceof Decimal)) return new Decimal(value);

      // Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
      // which points to Object.
      x.constructor = Decimal;

      // Duplicate.
      if (value instanceof Decimal) {
        x.s = value.s;
        x.e = value.e;
        x.d = (value = value.d) ? value.slice() : value;
        return;
      }

      if (typeof value === 'number') {

        // Reject Infinity/NaN.
        if (value * 0 !== 0) {
          throw Error(invalidArgument + value);
        }

        if (value > 0) {
          x.s = 1;
        } else if (value < 0) {
          value = -value;
          x.s = -1;
        } else {
          x.s = 0;
          x.e = 0;
          x.d = [0];
          return;
        }

        // Fast path for small integers.
        if (value === ~~value && value < 1e7) {
          x.e = 0;
          x.d = [value];
          return;
        }

        return parseDecimal(x, value.toString());
      } else if (typeof value !== 'string') {
        throw Error(invalidArgument + value);
      }

      // Minus sign?
      if (value.charCodeAt(0) === 45) {
        value = value.slice(1);
        x.s = -1;
      } else {
        x.s = 1;
      }

      if (isDecimal.test(value)) parseDecimal(x, value);
      else throw Error(invalidArgument + value);
    }

    Decimal.prototype = P;

    Decimal.ROUND_UP = 0;
    Decimal.ROUND_DOWN = 1;
    Decimal.ROUND_CEIL = 2;
    Decimal.ROUND_FLOOR = 3;
    Decimal.ROUND_HALF_UP = 4;
    Decimal.ROUND_HALF_DOWN = 5;
    Decimal.ROUND_HALF_EVEN = 6;
    Decimal.ROUND_HALF_CEIL = 7;
    Decimal.ROUND_HALF_FLOOR = 8;

    Decimal.clone = clone;
    Decimal.config = Decimal.set = config;

    if (obj === void 0) obj = {};
    if (obj) {
      ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'LN10'];
      for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
    }

    Decimal.config(obj);

    return Decimal;
  }


  /*
   * Configure global settings for a Decimal constructor.
   *
   * `obj` is an object with one or more of the following properties,
   *
   *   precision  {number}
   *   rounding   {number}
   *   toExpNeg   {number}
   *   toExpPos   {number}
   *
   * E.g. Decimal.config({ precision: 20, rounding: 4 })
   *
   */
  function config(obj) {
    if (!obj || typeof obj !== 'object') {
      throw Error(decimalError + 'Object expected');
    }
    var i, p, v,
      ps = [
        'precision', 1, MAX_DIGITS,
        'rounding', 0, 8,
        'toExpNeg', -1 / 0, 0,
        'toExpPos', 0, 1 / 0
      ];

    for (i = 0; i < ps.length; i += 3) {
      if ((v = obj[p = ps[i]]) !== void 0) {
        if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
        else throw Error(invalidArgument + p + ': ' + v);
      }
    }

    if ((v = obj[p = 'LN10']) !== void 0) {
        if (v == Math.LN10) this[p] = new this(v);
        else throw Error(invalidArgument + p + ': ' + v);
    }

    return this;
  }


  // Create and configure initial Decimal constructor.
  Decimal = clone(Decimal);

  Decimal['default'] = Decimal.Decimal = Decimal;

  // Internal constant.
  ONE = new Decimal(1);


  // Export.


  // AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return Decimal;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Node and other environments that support module.exports.
  } else {}
})(this);


/***/ }),

/***/ "./node_modules/moment-duration-format/lib/moment-duration-format.js":
/*!***************************************************************************!*\
  !*** ./node_modules/moment-duration-format/lib/moment-duration-format.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! Moment Duration Format v2.2.2
 *  https://github.com/jsmreese/moment-duration-format
 *  Date: 2018-02-16
 *
 *  Duration format plugin function for the Moment.js library
 *  http://momentjs.com/
 *
 *  Copyright 2018 John Madhavan-Reese
 *  Released under the MIT license
 */

(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! moment */ "moment")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}

    if (root) {
        // Globals.
        root.momentDurationFormatSetup = root.moment ? factory(root.moment) : factory;
    }
})(this, function (moment) {
    // `Number#tolocaleString` is tested on plugin initialization.
    // If the feature test passes, `toLocaleStringWorks` will be set to `true` and the
    // native function will be used to generate formatted output. If the feature
    // test fails, the fallback format function internal to this plugin will be
    // used.
    var toLocaleStringWorks = false;

    // `Number#toLocaleString` rounds incorrectly for select numbers in Microsoft
    // environments (Edge, IE11, Windows Phone) and possibly other environments.
    // If the rounding test fails and `toLocaleString` will be used for formatting,
    // the plugin will "pre-round" number values using the fallback number format
    // function before passing them to `toLocaleString` for final formatting.
    var toLocaleStringRoundingWorks = false;

    // `Intl.NumberFormat#format` is tested on plugin initialization.
    // If the feature test passes, `intlNumberFormatRoundingWorks` will be set to
    // `true` and the native function will be used to generate formatted output.
    // If the feature test fails, either `Number#tolocaleString` (if
    // `toLocaleStringWorks` is `true`), or the fallback format function internal
    //  to this plugin will be used.
    var intlNumberFormatWorks = false;

    // `Intl.NumberFormat#format` rounds incorrectly for select numbers in Microsoft
    // environments (Edge, IE11, Windows Phone) and possibly other environments.
    // If the rounding test fails and `Intl.NumberFormat#format` will be used for
    // formatting, the plugin will "pre-round" number values using the fallback number
    // format function before passing them to `Intl.NumberFormat#format` for final
    // formatting.
    var intlNumberFormatRoundingWorks = false;

    // Token type names in order of descending magnitude.
    var types = "escape years months weeks days hours minutes seconds milliseconds general".split(" ");

    var bubbles = [
        {
            type: "seconds",
            targets: [
                { type: "minutes", value: 60 },
                { type: "hours", value: 3600 },
                { type: "days", value: 86400 },
                { type: "weeks", value: 604800 },
                { type: "months", value: 2678400 },
                { type: "years", value: 31536000 }
            ]
        },
        {
            type: "minutes",
            targets: [
                { type: "hours", value: 60 },
                { type: "days", value: 1440 },
                { type: "weeks", value: 10080 },
                { type: "months", value: 44640 },
                { type: "years", value: 525600 }
            ]
        },
        {
            type: "hours",
            targets: [
                { type: "days", value: 24 },
                { type: "weeks", value: 168 },
                { type: "months", value: 744 },
                { type: "years", value: 8760 }
            ]
        },
        {
            type: "days",
            targets: [
                { type: "weeks", value: 7 },
                { type: "months", value: 31 },
                { type: "years", value: 365 }
            ]
        },
        {
            type: "months",
            targets: [
                { type: "years", value: 12 }
            ]
        }
    ];

    // stringIncludes
    function stringIncludes(str, search) {
        if (search.length > str.length) {
          return false;
        }

        return str.indexOf(search) !== -1;
    }

    // repeatZero(qty)
    // Returns "0" repeated `qty` times.
    // `qty` must be a integer >= 0.
    function repeatZero(qty) {
        var result = "";

        while (qty) {
            result += "0";
            qty -= 1;
        }

        return result;
    }

    function stringRound(digits) {
        var digitsArray = digits.split("").reverse();
        var i = 0;
        var carry = true;

        while (carry && i < digitsArray.length) {
            if (i) {
                if (digitsArray[i] === "9") {
                    digitsArray[i] = "0";
                } else {
                    digitsArray[i] = (parseInt(digitsArray[i], 10) + 1).toString();
                    carry = false;
                }
            } else {
                if (parseInt(digitsArray[i], 10) < 5) {
                    carry = false;
                }

                digitsArray[i] = "0";
            }

            i += 1;
        }

        if (carry) {
            digitsArray.push("1");
        }

        return digitsArray.reverse().join("");
    }

    // cachedNumberFormat
    // Returns an `Intl.NumberFormat` instance for the given locale and configuration.
    // On first use of a particular configuration, the instance is cached for fast
    // repeat access.
    function cachedNumberFormat(locale, options) {
        // Create a sorted, stringified version of `options`
        // for use as part of the cache key
        var optionsString = map(
            keys(options).sort(),
            function(key) {
                return key + ':' + options[key];
            }
        ).join(',');

        // Set our cache key
        var cacheKey = locale + '+' + optionsString;

        // If we don't have this configuration cached, configure and cache it
        if (!cachedNumberFormat.cache[cacheKey]) {
            cachedNumberFormat.cache[cacheKey] = Intl.NumberFormat(locale, options);
        }

        // Return the cached version of this configuration
        return cachedNumberFormat.cache[cacheKey];
    }
    cachedNumberFormat.cache = {};

    // formatNumber
    // Formats any number greater than or equal to zero using these options:
    // - userLocale
    // - useToLocaleString
    // - useGrouping
    // - grouping
    // - maximumSignificantDigits
    // - minimumIntegerDigits
    // - fractionDigits
    // - groupingSeparator
    // - decimalSeparator
    //
    // `useToLocaleString` will use `Intl.NumberFormat` or `toLocaleString` for formatting.
    // `userLocale` option is passed through to the formatting function.
    // `fractionDigits` is passed through to `maximumFractionDigits` and `minimumFractionDigits`
    // Using `maximumSignificantDigits` will override `minimumIntegerDigits` and `fractionDigits`.
    function formatNumber(number, options, userLocale) {
        var useToLocaleString = options.useToLocaleString;
        var useGrouping = options.useGrouping;
        var grouping = useGrouping && options.grouping.slice();
        var maximumSignificantDigits = options.maximumSignificantDigits;
        var minimumIntegerDigits = options.minimumIntegerDigits || 1;
        var fractionDigits = options.fractionDigits || 0;
        var groupingSeparator = options.groupingSeparator;
        var decimalSeparator = options.decimalSeparator;

        if (useToLocaleString && userLocale) {
            var localeStringOptions = {
                minimumIntegerDigits: minimumIntegerDigits,
                useGrouping: useGrouping
            };

            if (fractionDigits) {
                localeStringOptions.maximumFractionDigits = fractionDigits;
                localeStringOptions.minimumFractionDigits = fractionDigits;
            }

            // toLocaleString output is "0.0" instead of "0" for HTC browsers
            // when maximumSignificantDigits is set. See #96.
            if (maximumSignificantDigits && number > 0) {
                localeStringOptions.maximumSignificantDigits = maximumSignificantDigits;
            }

            if (intlNumberFormatWorks) {
                if (!intlNumberFormatRoundingWorks) {
                    var roundingOptions = extend({}, options);
                    roundingOptions.useGrouping = false;
                    roundingOptions.decimalSeparator = ".";
                    number = parseFloat(formatNumber(number, roundingOptions), 10);
                }

                return cachedNumberFormat(userLocale, localeStringOptions).format(number);
            } else {
                if (!toLocaleStringRoundingWorks) {
                    var roundingOptions = extend({}, options);
                    roundingOptions.useGrouping = false;
                    roundingOptions.decimalSeparator = ".";
                    number = parseFloat(formatNumber(number, roundingOptions), 10);
                }

                return number.toLocaleString(userLocale, localeStringOptions);
            }
        }

        var numberString;

        // Add 1 to digit output length for floating point errors workaround. See below.
        if (maximumSignificantDigits) {
            numberString = number.toPrecision(maximumSignificantDigits + 1);
        } else {
            numberString = number.toFixed(fractionDigits + 1);
        }

        var integerString;
        var fractionString;
        var exponentString;

        var temp = numberString.split("e");

        exponentString = temp[1] || "";

        temp = temp[0].split(".");

        fractionString = temp[1] || "";
        integerString = temp[0] || "";

        // Workaround for floating point errors in `toFixed` and `toPrecision`.
        // (3.55).toFixed(1); --> "3.5"
        // (123.55 - 120).toPrecision(2); --> "3.5"
        // (123.55 - 120); --> 3.549999999999997
        // (123.55 - 120).toFixed(2); --> "3.55"
        // Round by examing the string output of the next digit.

        // *************** Implement String Rounding here ***********************
        // Check integerString + fractionString length of toPrecision before rounding.
        // Check length of fractionString from toFixed output before rounding.
        var integerLength = integerString.length;
        var fractionLength = fractionString.length;
        var digitCount = integerLength + fractionLength;
        var digits = integerString + fractionString;

        if (maximumSignificantDigits && digitCount === (maximumSignificantDigits + 1) || !maximumSignificantDigits && fractionLength === (fractionDigits + 1)) {
            // Round digits.
            digits = stringRound(digits);

            if (digits.length === digitCount + 1) {
                integerLength = integerLength + 1;
            }

            // Discard final fractionDigit.
            if (fractionLength) {
                digits = digits.slice(0, -1);
            }

            // Separate integer and fraction.
            integerString = digits.slice(0, integerLength);
            fractionString = digits.slice(integerLength);
        }

        // Trim trailing zeroes from fractionString because toPrecision outputs
        // precision, not significant digits.
        if (maximumSignificantDigits) {
            fractionString = fractionString.replace(/0*$/, "");
        }

        // Handle exponent.
        var exponent = parseInt(exponentString, 10);

        if (exponent > 0) {
            if (fractionString.length <= exponent) {
                fractionString = fractionString + repeatZero(exponent - fractionString.length);

                integerString = integerString + fractionString;
                fractionString = "";
            } else {
                integerString = integerString + fractionString.slice(0, exponent);
                fractionString = fractionString.slice(exponent);
            }
        } else if (exponent < 0) {
            fractionString = (repeatZero(Math.abs(exponent) - integerString.length) + integerString + fractionString);

            integerString = "0";
        }

        if (!maximumSignificantDigits) {
            // Trim or pad fraction when not using maximumSignificantDigits.
            fractionString = fractionString.slice(0, fractionDigits);

            if (fractionString.length < fractionDigits) {
                fractionString = fractionString + repeatZero(fractionDigits - fractionString.length);
            }

            // Pad integer when using minimumIntegerDigits
            // and not using maximumSignificantDigits.
            if (integerString.length < minimumIntegerDigits) {
                integerString = repeatZero(minimumIntegerDigits - integerString.length) + integerString;
            }
        }

        var formattedString = "";

        // Handle grouping.
        if (useGrouping) {
            temp = integerString;
            var group;

            while (temp.length) {
                if (grouping.length) {
                    group = grouping.shift();
                }

                if (formattedString) {
                    formattedString = groupingSeparator + formattedString;
                }

                formattedString = temp.slice(-group) + formattedString;

                temp = temp.slice(0, -group);
            }
        } else {
            formattedString = integerString;
        }

        // Add decimalSeparator and fraction.
        if (fractionString) {
            formattedString = formattedString + decimalSeparator + fractionString;
        }

        return formattedString;
    }

    // durationLabelCompare
    function durationLabelCompare(a, b) {
        if (a.label.length > b.label.length) {
            return -1;
        }

        if (a.label.length < b.label.length) {
            return 1;
        }

        // a must be equal to b
        return 0;
    }

    // durationGetLabels
    function durationGetLabels(token, localeData) {
        var labels = [];

        each(keys(localeData), function (localeDataKey) {
            if (localeDataKey.slice(0, 15) !== "_durationLabels") {
                return;
            }

            var labelType = localeDataKey.slice(15).toLowerCase();

            each(keys(localeData[localeDataKey]), function (labelKey) {
                if (labelKey.slice(0, 1) === token) {
                    labels.push({
                        type: labelType,
                        key: labelKey,
                        label: localeData[localeDataKey][labelKey]
                    });
                }
            });
        });

        return labels;
    }

    // durationPluralKey
    function durationPluralKey(token, integerValue, decimalValue) {
        // Singular for a value of `1`, but not for `1.0`.
        if (integerValue === 1 && decimalValue === null) {
            return token;
        }

        return token + token;
    }

    var engLocale = {
        durationLabelsStandard: {
            S: 'millisecond',
            SS: 'milliseconds',
            s: 'second',
            ss: 'seconds',
            m: 'minute',
            mm: 'minutes',
            h: 'hour',
            hh: 'hours',
            d: 'day',
            dd: 'days',
            w: 'week',
            ww: 'weeks',
            M: 'month',
            MM: 'months',
            y: 'year',
            yy: 'years'
        },
        durationLabelsShort: {
            S: 'msec',
            SS: 'msecs',
            s: 'sec',
            ss: 'secs',
            m: 'min',
            mm: 'mins',
            h: 'hr',
            hh: 'hrs',
            d: 'dy',
            dd: 'dys',
            w: 'wk',
            ww: 'wks',
            M: 'mo',
            MM: 'mos',
            y: 'yr',
            yy: 'yrs'
        },
        durationTimeTemplates: {
            HMS: 'h:mm:ss',
            HM: 'h:mm',
            MS: 'm:ss'
        },
        durationLabelTypes: [
            { type: "standard", string: "__" },
            { type: "short", string: "_" }
        ],
        durationPluralKey: durationPluralKey
    };

    // isArray
    function isArray(array) {
        return Object.prototype.toString.call(array) === "[object Array]";
    }

    // isObject
    function isObject(obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    }

    // findLast
    function findLast(array, callback) {
        var index = array.length;

        while (index -= 1) {
            if (callback(array[index])) { return array[index]; }
        }
    }

    // find
    function find(array, callback) {
        var index = 0;

        var max = array && array.length || 0;

        var match;

        if (typeof callback !== "function") {
            match = callback;
            callback = function (item) {
                return item === match;
            };
        }

        while (index < max) {
            if (callback(array[index])) { return array[index]; }
            index += 1;
        }
    }

    // each
    function each(array, callback) {
        var index = 0,
            max = array.length;

        if (!array || !max) { return; }

        while (index < max) {
            if (callback(array[index], index) === false) { return; }
            index += 1;
        }
    }

    // map
    function map(array, callback) {
        var index = 0,
            max = array.length,
            ret = [];

        if (!array || !max) { return ret; }

        while (index < max) {
            ret[index] = callback(array[index], index);
            index += 1;
        }

        return ret;
    }

    // pluck
    function pluck(array, prop) {
        return map(array, function (item) {
            return item[prop];
        });
    }

    // compact
    function compact(array) {
        var ret = [];

        each(array, function (item) {
            if (item) { ret.push(item); }
        });

        return ret;
    }

    // unique
    function unique(array) {
        var ret = [];

        each(array, function (_a) {
            if (!find(ret, _a)) { ret.push(_a); }
        });

        return ret;
    }

    // intersection
    function intersection(a, b) {
        var ret = [];

        each(a, function (_a) {
            each(b, function (_b) {
                if (_a === _b) { ret.push(_a); }
            });
        });

        return unique(ret);
    }

    // rest
    function rest(array, callback) {
        var ret = [];

        each(array, function (item, index) {
            if (!callback(item)) {
                ret = array.slice(index);
                return false;
            }
        });

        return ret;
    }

    // initial
    function initial(array, callback) {
        var reversed = array.slice().reverse();

        return rest(reversed, callback).reverse();
    }

    // extend
    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) { a[key] = b[key]; }
        }

        return a;
    }

    // keys
    function keys(a) {
        var ret = [];

        for (var key in a) {
            if (a.hasOwnProperty(key)) { ret.push(key); }
        }

        return ret;
    }

    // any
    function any(array, callback) {
        var index = 0,
            max = array.length;

        if (!array || !max) { return false; }

        while (index < max) {
            if (callback(array[index], index) === true) { return true; }
            index += 1;
        }

        return false;
    }

    // flatten
    function flatten(array) {
        var ret = [];

        each(array, function(child) {
            ret = ret.concat(child);
        });

        return ret;
    }

    function toLocaleStringSupportsLocales() {
        var number = 0;
        try {
            number.toLocaleString('i');
        } catch (e) {
            return e.name === 'RangeError';
        }
        return false;
    }

    function featureTestFormatterRounding(formatter) {
        return formatter(3.55, "en", {
            useGrouping: false,
            minimumIntegerDigits: 1,
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }) === "3.6";
    }

    function featureTestFormatter(formatter) {
        var passed = true;

        // Test minimumIntegerDigits.
        passed = passed && formatter(1, "en", { minimumIntegerDigits: 1 }) === "1";
        passed = passed && formatter(1, "en", { minimumIntegerDigits: 2 }) === "01";
        passed = passed && formatter(1, "en", { minimumIntegerDigits: 3 }) === "001";
        if (!passed) { return false; }

        // Test maximumFractionDigits and minimumFractionDigits.
        passed = passed && formatter(99.99, "en", { maximumFractionDigits: 0, minimumFractionDigits: 0 }) === "100";
        passed = passed && formatter(99.99, "en", { maximumFractionDigits: 1, minimumFractionDigits: 1 }) === "100.0";
        passed = passed && formatter(99.99, "en", { maximumFractionDigits: 2, minimumFractionDigits: 2 }) === "99.99";
        passed = passed && formatter(99.99, "en", { maximumFractionDigits: 3, minimumFractionDigits: 3 }) === "99.990";
        if (!passed) { return false; }

        // Test maximumSignificantDigits.
        passed = passed && formatter(99.99, "en", { maximumSignificantDigits: 1 }) === "100";
        passed = passed && formatter(99.99, "en", { maximumSignificantDigits: 2 }) === "100";
        passed = passed && formatter(99.99, "en", { maximumSignificantDigits: 3 }) === "100";
        passed = passed && formatter(99.99, "en", { maximumSignificantDigits: 4 }) === "99.99";
        passed = passed && formatter(99.99, "en", { maximumSignificantDigits: 5 }) === "99.99";
        if (!passed) { return false; }

        // Test grouping.
        passed = passed && formatter(1000, "en", { useGrouping: true }) === "1,000";
        passed = passed && formatter(1000, "en", { useGrouping: false }) === "1000";
        if (!passed) { return false; }

        return true;
    }

    // durationsFormat(durations [, template] [, precision] [, settings])
    function durationsFormat() {
        var args = [].slice.call(arguments);
        var settings = {};
        var durations;

        // Parse arguments.
        each(args, function (arg, index) {
            if (!index) {
                if (!isArray(arg)) {
                    throw "Expected array as the first argument to durationsFormat.";
                }

                durations = arg;
            }

            if (typeof arg === "string" || typeof arg === "function") {
                settings.template = arg;
                return;
            }

            if (typeof arg === "number") {
                settings.precision = arg;
                return;
            }

            if (isObject(arg)) {
                extend(settings, arg);
            }
        });

        if (!durations || !durations.length) {
            return [];
        }

        settings.returnMomentTypes = true;

        var formattedDurations = map(durations, function (dur) {
            return dur.format(settings);
        });

        // Merge token types from all durations.
        var outputTypes = intersection(types, unique(pluck(flatten(formattedDurations), "type")));

        var largest = settings.largest;

        if (largest) {
            outputTypes = outputTypes.slice(0, largest);
        }

        settings.returnMomentTypes = false;
        settings.outputTypes = outputTypes;

        return map(durations, function (dur) {
            return dur.format(settings);
        });
    }

    // durationFormat([template] [, precision] [, settings])
    function durationFormat() {

        var args = [].slice.call(arguments);
        var settings = extend({}, this.format.defaults);

        // Keep a shadow copy of this moment for calculating remainders.
        // Perform all calculations on positive duration value, handle negative
        // sign at the very end.
        var asMilliseconds = this.asMilliseconds();
        var asMonths = this.asMonths();

        // Treat invalid durations as having a value of 0 milliseconds.
        if (typeof this.isValid === "function" && this.isValid() === false) {
            asMilliseconds = 0;
            asMonths = 0;
        }

        var isNegative = asMilliseconds < 0;

        // Two shadow copies are needed because of the way moment.js handles
        // duration arithmetic for years/months and for weeks/days/hours/minutes/seconds.
        var remainder = moment.duration(Math.abs(asMilliseconds), "milliseconds");
        var remainderMonths = moment.duration(Math.abs(asMonths), "months");

        // Parse arguments.
        each(args, function (arg) {
            if (typeof arg === "string" || typeof arg === "function") {
                settings.template = arg;
                return;
            }

            if (typeof arg === "number") {
                settings.precision = arg;
                return;
            }

            if (isObject(arg)) {
                extend(settings, arg);
            }
        });

        var momentTokens = {
            years: "y",
            months: "M",
            weeks: "w",
            days: "d",
            hours: "h",
            minutes: "m",
            seconds: "s",
            milliseconds: "S"
        };

        var tokenDefs = {
            escape: /\[(.+?)\]/,
            years: /\*?[Yy]+/,
            months: /\*?M+/,
            weeks: /\*?[Ww]+/,
            days: /\*?[Dd]+/,
            hours: /\*?[Hh]+/,
            minutes: /\*?m+/,
            seconds: /\*?s+/,
            milliseconds: /\*?S+/,
            general: /.+?/
        };

        // Types array is available in the template function.
        settings.types = types;

        var typeMap = function (token) {
            return find(types, function (type) {
                return tokenDefs[type].test(token);
            });
        };

        var tokenizer = new RegExp(map(types, function (type) {
            return tokenDefs[type].source;
        }).join("|"), "g");

        // Current duration object is available in the template function.
        settings.duration = this;

        // Eval template function and cache template string.
        var template = typeof settings.template === "function" ? settings.template.apply(settings) : settings.template;

        // outputTypes and returnMomentTypes are settings to support durationsFormat().

        // outputTypes is an array of moment token types that determines
        // the tokens returned in formatted output. This option overrides
        // trim, largest, stopTrim, etc.
        var outputTypes = settings.outputTypes;

        // returnMomentTypes is a boolean that sets durationFormat to return
        // the processed momentTypes instead of formatted output.
        var returnMomentTypes = settings.returnMomentTypes;

        var largest = settings.largest;

        // Setup stopTrim array of token types.
        var stopTrim = [];

        if (!outputTypes) {
            if (isArray(settings.stopTrim)) {
                settings.stopTrim = settings.stopTrim.join("");
            }

            // Parse stopTrim string to create token types array.
            if (settings.stopTrim) {
                each(settings.stopTrim.match(tokenizer), function (token) {
                    var type = typeMap(token);

                    if (type === "escape" || type === "general") {
                        return;
                    }

                    stopTrim.push(type);
                });
            }
        }

        // Cache moment's locale data.
        var localeData = moment.localeData();

        if (!localeData) {
            localeData = {};
        }

        // Fall back to this plugin's `eng` extension.
        each(keys(engLocale), function (key) {
            if (typeof engLocale[key] === "function") {
                if (!localeData[key]) {
                    localeData[key] = engLocale[key];
                }

                return;
            }

            if (!localeData["_" + key]) {
                localeData["_" + key] = engLocale[key];
            }
        });

        // Replace Duration Time Template strings.
        // For locale `eng`: `_HMS_`, `_HM_`, and `_MS_`.
        each(keys(localeData._durationTimeTemplates), function (item) {
            template = template.replace("_" + item + "_", localeData._durationTimeTemplates[item]);
        });

        // Determine user's locale.
        var userLocale = settings.userLocale || moment.locale();

        var useLeftUnits = settings.useLeftUnits;
        var usePlural = settings.usePlural;
        var precision = settings.precision;
        var forceLength = settings.forceLength;
        var useGrouping = settings.useGrouping;
        var trunc = settings.trunc;

        // Use significant digits only when precision is greater than 0.
        var useSignificantDigits = settings.useSignificantDigits && precision > 0;
        var significantDigits = useSignificantDigits ? settings.precision : 0;
        var significantDigitsCache = significantDigits;

        var minValue = settings.minValue;
        var isMinValue = false;

        var maxValue = settings.maxValue;
        var isMaxValue = false;

        // formatNumber fallback options.
        var useToLocaleString = settings.useToLocaleString;
        var groupingSeparator = settings.groupingSeparator;
        var decimalSeparator = settings.decimalSeparator;
        var grouping = settings.grouping;

        useToLocaleString = useToLocaleString && (toLocaleStringWorks || intlNumberFormatWorks);

        // Trim options.
        var trim = settings.trim;

        if (isArray(trim)) {
            trim = trim.join(" ");
        }

        if (trim === null && (largest || maxValue || useSignificantDigits)) {
            trim = "all";
        }

        if (trim === null || trim === true || trim === "left" || trim === "right") {
            trim = "large";
        }

        if (trim === false) {
            trim = "";
        }

        var trimIncludes = function (item) {
            return item.test(trim);
        };

        var rLarge = /large/;
        var rSmall = /small/;
        var rBoth = /both/;
        var rMid = /mid/;
        var rAll = /^all|[^sm]all/;
        var rFinal = /final/;

        var trimLarge = largest > 0 || any([rLarge, rBoth, rAll], trimIncludes);
        var trimSmall = any([rSmall, rBoth, rAll], trimIncludes);
        var trimMid = any([rMid, rAll], trimIncludes);
        var trimFinal = any([rFinal, rAll], trimIncludes);

        // Parse format string to create raw tokens array.
        var rawTokens = map(template.match(tokenizer), function (token, index) {
            var type = typeMap(token);

            if (token.slice(0, 1) === "*") {
                token = token.slice(1);

                if (type !== "escape" && type !== "general") {
                    stopTrim.push(type);
                }
            }

            return {
                index: index,
                length: token.length,
                text: "",

                // Replace escaped tokens with the non-escaped token text.
                token: (type === "escape" ? token.replace(tokenDefs.escape, "$1") : token),

                // Ignore type on non-moment tokens.
                type: ((type === "escape" || type === "general") ? null : type)
            };
        });

        // Associate text tokens with moment tokens.
        var currentToken = {
            index: 0,
            length: 0,
            token: "",
            text: "",
            type: null
        };

        var tokens = [];

        if (useLeftUnits) {
            rawTokens.reverse();
        }

        each(rawTokens, function (token) {
            if (token.type) {
                if (currentToken.type || currentToken.text) {
                    tokens.push(currentToken);
                }

                currentToken = token;

                return;
            }

            if (useLeftUnits) {
                currentToken.text = token.token + currentToken.text;
            } else {
                currentToken.text += token.token;
            }
        });

        if (currentToken.type || currentToken.text) {
            tokens.push(currentToken);
        }

        if (useLeftUnits) {
            tokens.reverse();
        }

        // Find unique moment token types in the template in order of
        // descending magnitude.
        var momentTypes = intersection(types, unique(compact(pluck(tokens, "type"))));

        // Exit early if there are no moment token types.
        if (!momentTypes.length) {
            return pluck(tokens, "text").join("");
        }

        // Calculate values for each moment type in the template.
        // For processing the settings, values are associated with moment types.
        // Values will be assigned to tokens at the last step in order to
        // assume nothing about frequency or order of tokens in the template.
        momentTypes = map(momentTypes, function (momentType, index) {
            // Is this the least-magnitude moment token found?
            var isSmallest = ((index + 1) === momentTypes.length);

            // Is this the greatest-magnitude moment token found?
            var isLargest = (!index);

            // Get the raw value in the current units.
            var rawValue;

            if (momentType === "years" || momentType === "months") {
                rawValue = remainderMonths.as(momentType);
            } else {
                rawValue = remainder.as(momentType);
            }

            var wholeValue = Math.floor(rawValue);
            var decimalValue = rawValue - wholeValue;

            var token = find(tokens, function (token) {
                return momentType === token.type;
            });

            if (isLargest && maxValue && rawValue > maxValue) {
                isMaxValue = true;
            }

            if (isSmallest && minValue && Math.abs(settings.duration.as(momentType)) < minValue) {
                isMinValue = true;
            }

            // Note the length of the largest-magnitude moment token:
            // if it is greater than one and forceLength is not set,
            // then default forceLength to `true`.
            //
            // Rationale is this: If the template is "h:mm:ss" and the
            // moment value is 5 minutes, the user-friendly output is
            // "5:00", not "05:00". We shouldn't pad the `minutes` token
            // even though it has length of two if the template is "h:mm:ss";
            //
            // If the minutes output should always include the leading zero
            // even when the hour is trimmed then set `{ forceLength: true }`
            // to output "05:00". If the template is "hh:mm:ss", the user
            // clearly wanted everything padded so we should output "05:00";
            //
            // If the user wants the full padded output, they can use
            // template "hh:mm:ss" and set `{ trim: false }` to output
            // "00:05:00".
            if (isLargest && forceLength === null && token.length > 1) {
                forceLength = true;
            }

            // Update remainder.
            remainder.subtract(wholeValue, momentType);
            remainderMonths.subtract(wholeValue, momentType);

            return {
                rawValue: rawValue,
                wholeValue: wholeValue,
                // Decimal value is only retained for the least-magnitude
                // moment type in the format template.
                decimalValue: isSmallest ? decimalValue : 0,
                isSmallest: isSmallest,
                isLargest: isLargest,
                type: momentType,
                // Tokens can appear multiple times in a template string,
                // but all instances must share the same length.
                tokenLength: token.length
            };
        });

        var truncMethod = trunc ? Math.floor : Math.round;
        var truncate = function (value, places) {
            var factor = Math.pow(10, places);
            return truncMethod(value * factor) / factor;
        };

        var foundFirst = false;
        var bubbled = false;

        var formatValue = function (momentType, index) {
            var formatOptions = {
                useGrouping: useGrouping,
                groupingSeparator: groupingSeparator,
                decimalSeparator: decimalSeparator,
                grouping: grouping,
                useToLocaleString: useToLocaleString
            };

            if (useSignificantDigits) {
                if (significantDigits <= 0) {
                    momentType.rawValue = 0;
                    momentType.wholeValue = 0;
                    momentType.decimalValue = 0;
                } else {
                    formatOptions.maximumSignificantDigits = significantDigits;
                    momentType.significantDigits = significantDigits;
                }
            }

            if (isMaxValue && !bubbled) {
                if (momentType.isLargest) {
                    momentType.wholeValue = maxValue;
                    momentType.decimalValue = 0;
                } else {
                    momentType.wholeValue = 0;
                    momentType.decimalValue = 0;
                }
            }

            if (isMinValue && !bubbled) {
                if (momentType.isSmallest) {
                    momentType.wholeValue = minValue;
                    momentType.decimalValue = 0;
                } else {
                    momentType.wholeValue = 0;
                    momentType.decimalValue = 0;
                }
            }

            if (momentType.isSmallest || momentType.significantDigits && momentType.significantDigits - momentType.wholeValue.toString().length <= 0) {
                // Apply precision to least significant token value.
                if (precision < 0) {
                    momentType.value = truncate(momentType.wholeValue, precision);
                } else if (precision === 0) {
                    momentType.value = truncMethod(momentType.wholeValue + momentType.decimalValue);
                } else { // precision > 0
                    if (useSignificantDigits) {
                        if (trunc) {
                            momentType.value = truncate(momentType.rawValue, significantDigits - momentType.wholeValue.toString().length);
                        } else {
                            momentType.value = momentType.rawValue;
                        }

                        if (momentType.wholeValue) {
                            significantDigits -= momentType.wholeValue.toString().length;
                        }
                    } else {
                        formatOptions.fractionDigits = precision;

                        if (trunc) {
                            momentType.value = momentType.wholeValue + truncate(momentType.decimalValue, precision);
                        } else {
                            momentType.value = momentType.wholeValue + momentType.decimalValue;
                        }
                    }
                }
            } else {
                if (useSignificantDigits && momentType.wholeValue) {
                    // Outer Math.round required here to handle floating point errors.
                    momentType.value = Math.round(truncate(momentType.wholeValue, momentType.significantDigits - momentType.wholeValue.toString().length));

                    significantDigits -= momentType.wholeValue.toString().length;
                } else {
                    momentType.value = momentType.wholeValue;
                }
            }

            if (momentType.tokenLength > 1 && (forceLength || foundFirst)) {
                formatOptions.minimumIntegerDigits = momentType.tokenLength;

                if (bubbled && formatOptions.maximumSignificantDigits < momentType.tokenLength) {
                    delete formatOptions.maximumSignificantDigits;
                }
            }

            if (!foundFirst && (momentType.value > 0 || trim === "" /* trim: false */ || find(stopTrim, momentType.type) || find(outputTypes, momentType.type))) {
                foundFirst = true;
            }

            momentType.formattedValue = formatNumber(momentType.value, formatOptions, userLocale);

            formatOptions.useGrouping = false;
            formatOptions.decimalSeparator = ".";
            momentType.formattedValueEn = formatNumber(momentType.value, formatOptions, "en");

            if (momentType.tokenLength === 2 && momentType.type === "milliseconds") {
                momentType.formattedValueMS = formatNumber(momentType.value, {
                    minimumIntegerDigits: 3,
                    useGrouping: false
                }, "en").slice(0, 2);
            }

            return momentType;
        };

        // Calculate formatted values.
        momentTypes = map(momentTypes, formatValue);
        momentTypes = compact(momentTypes);

        // Bubble rounded values.
        if (momentTypes.length > 1) {
            var findType = function (type) {
                return find(momentTypes, function (momentType) {
                    return momentType.type === type;
                });
            };

            var bubbleTypes = function (bubble) {
                var bubbleMomentType = findType(bubble.type);

                if (!bubbleMomentType) {
                    return;
                }

                each(bubble.targets, function (target) {
                    var targetMomentType = findType(target.type);

                    if (!targetMomentType) {
                        return;
                    }

                    if (parseInt(bubbleMomentType.formattedValueEn, 10) === target.value) {
                        bubbleMomentType.rawValue = 0;
                        bubbleMomentType.wholeValue = 0;
                        bubbleMomentType.decimalValue = 0;
                        targetMomentType.rawValue += 1;
                        targetMomentType.wholeValue += 1;
                        targetMomentType.decimalValue = 0;
                        targetMomentType.formattedValueEn = targetMomentType.wholeValue.toString();
                        bubbled = true;
                    }
                });
            };

            each(bubbles, bubbleTypes);
        }

        // Recalculate formatted values.
        if (bubbled) {
            foundFirst = false;
            significantDigits = significantDigitsCache;
            momentTypes = map(momentTypes, formatValue);
            momentTypes = compact(momentTypes);
        }

        if (outputTypes && !(isMaxValue && !settings.trim)) {
            momentTypes = map(momentTypes, function (momentType) {
                if (find(outputTypes, function (outputType) {
                    return momentType.type === outputType;
                })) {
                    return momentType;
                }

                return null;
            });

            momentTypes = compact(momentTypes);
        } else {
            // Trim Large.
            if (trimLarge) {
                momentTypes = rest(momentTypes, function (momentType) {
                    // Stop trimming on:
                    // - the smallest moment type
                    // - a type marked for stopTrim
                    // - a type that has a whole value
                    return !momentType.isSmallest && !momentType.wholeValue && !find(stopTrim, momentType.type);
                });
            }

            // Largest.
            if (largest && momentTypes.length) {
                momentTypes = momentTypes.slice(0, largest);
            }

            // Trim Small.
            if (trimSmall && momentTypes.length > 1) {
                momentTypes = initial(momentTypes, function (momentType) {
                    // Stop trimming on:
                    // - a type marked for stopTrim
                    // - a type that has a whole value
                    // - the largest momentType
                    return !momentType.wholeValue && !find(stopTrim, momentType.type) && !momentType.isLargest;
                });
            }

            // Trim Mid.
            if (trimMid) {
                momentTypes = map(momentTypes, function (momentType, index) {
                    if (index > 0 && index < momentTypes.length - 1 && !momentType.wholeValue) {
                        return null;
                    }

                    return momentType;
                });

                momentTypes = compact(momentTypes);
            }

            // Trim Final.
            if (trimFinal && momentTypes.length === 1 && !momentTypes[0].wholeValue && !(!trunc && momentTypes[0].isSmallest && momentTypes[0].rawValue < minValue)) {
                momentTypes = [];
            }
        }

        if (returnMomentTypes) {
            return momentTypes;
        }

        // Localize and pluralize unit labels.
        each(tokens, function (token) {
            var key = momentTokens[token.type];

            var momentType = find(momentTypes, function (momentType) {
                return momentType.type === token.type;
            });

            if (!key || !momentType) {
                return;
            }

            var values = momentType.formattedValueEn.split(".");

            values[0] = parseInt(values[0], 10);

            if (values[1]) {
                values[1] = parseFloat("0." + values[1], 10);
            } else {
                values[1] = null;
            }

            var pluralKey = localeData.durationPluralKey(key, values[0], values[1]);

            var labels = durationGetLabels(key, localeData);

            var autoLocalized = false;

            var pluralizedLabels = {};

            // Auto-Localized unit labels.
            each(localeData._durationLabelTypes, function (labelType) {
                var label = find(labels, function (label) {
                    return label.type === labelType.type && label.key === pluralKey;
                });

                if (label) {
                    pluralizedLabels[label.type] = label.label;

                    if (stringIncludes(token.text, labelType.string)) {
                        token.text = token.text.replace(labelType.string, label.label);
                        autoLocalized = true;
                    }
                }
            });

            // Auto-pluralized unit labels.
            if (usePlural && !autoLocalized) {
                labels.sort(durationLabelCompare);

                each(labels, function (label) {
                    if (pluralizedLabels[label.type] === label.label) {
                        if (stringIncludes(token.text, label.label)) {
                            // Stop checking this token if its label is already
                            // correctly pluralized.
                            return false;
                        }

                        // Skip this label if it is correct, but not present in
                        // the token's text.
                        return;
                    }

                    if (stringIncludes(token.text, label.label)) {
                        // Replece this token's label and stop checking.
                        token.text = token.text.replace(label.label, pluralizedLabels[label.type]);
                        return false;
                    }
                });
            }
        });

        // Build ouptut.
        tokens = map(tokens, function (token) {
            if (!token.type) {
                return token.text;
            }

            var momentType = find(momentTypes, function (momentType) {
                return momentType.type === token.type;
            });

            if (!momentType) {
                return "";
            }

            var out = "";

            if (useLeftUnits) {
                out += token.text;
            }

            if (isNegative && isMaxValue || !isNegative && isMinValue) {
                out += "< ";
                isMaxValue = false;
                isMinValue = false;
            }

            if (isNegative && isMinValue || !isNegative && isMaxValue) {
                out += "> ";
                isMaxValue = false;
                isMinValue = false;
            }

            if (isNegative && (momentType.value > 0 || trim === "" || find(stopTrim, momentType.type) || find(outputTypes, momentType.type))) {
                out += "-";
                isNegative = false;
            }

            if (token.type === "milliseconds" && momentType.formattedValueMS) {
                out += momentType.formattedValueMS;
            } else {
                out += momentType.formattedValue;
            }

            if (!useLeftUnits) {
                out += token.text;
            }

            return out;
        });

        // Trim leading and trailing comma, space, colon, and dot.
        return tokens.join("").replace(/(,| |:|\.)*$/, "").replace(/^(,| |:|\.)*/, "");
    }

    // defaultFormatTemplate
    function defaultFormatTemplate() {
        var dur = this.duration;

        var findType = function findType(type) {
            return dur._data[type];
        };

        var firstType = find(this.types, findType);

        var lastType = findLast(this.types, findType);

        // Default template strings for each duration dimension type.
        switch (firstType) {
            case "milliseconds":
                return "S __";
            case "seconds": // Fallthrough.
            case "minutes":
                return "*_MS_";
            case "hours":
                return "_HMS_";
            case "days": // Possible Fallthrough.
                if (firstType === lastType) {
                    return "d __";
                }
            case "weeks":
                if (firstType === lastType) {
                    return "w __";
                }

                if (this.trim === null) {
                    this.trim = "both";
                }

                return "w __, d __, h __";
            case "months": // Possible Fallthrough.
                if (firstType === lastType) {
                    return "M __";
                }
            case "years":
                if (firstType === lastType) {
                    return "y __";
                }

                if (this.trim === null) {
                    this.trim = "both";
                }

                return "y __, M __, d __";
            default:
                if (this.trim === null) {
                    this.trim = "both";
                }

                return "y __, d __, h __, m __, s __";
        }
    }

    // init
    function init(context) {
        if (!context) {
            throw "Moment Duration Format init cannot find moment instance.";
        }

        context.duration.format = durationsFormat;
        context.duration.fn.format = durationFormat;

        context.duration.fn.format.defaults = {
            // Many options are defaulted to `null` to distinguish between
            // 'not set' and 'set to `false`'

            // trim
            // Can be a string, a delimited list of strings, an array of strings,
            // or a boolean.
            // "large" - will trim largest-magnitude zero-value tokens until
            // finding a token with a value, a token identified as 'stopTrim', or
            // the final token of the format string.
            // "small" - will trim smallest-magnitude zero-value tokens until
            // finding a token with a value, a token identified as 'stopTrim', or
            // the final token of the format string.
            // "both" - will execute "large" trim then "small" trim.
            // "mid" - will trim any zero-value tokens that are not the first or
            // last tokens. Usually used in conjunction with "large" or "both".
            // e.g. "large mid" or "both mid".
            // "final" - will trim the final token if it is zero-value. Use this
            // option with "large" or "both" to output an empty string when
            // formatting a zero-value duration. e.g. "large final" or "both final".
            // "all" - Will trim all zero-value tokens. Shorthand for "both mid final".
            // "left" - maps to "large" to support plugin's version 1 API.
            // "right" - maps to "large" to support plugin's version 1 API.
            // `false` - template tokens are not trimmed.
            // `true` - treated as "large".
            // `null` - treated as "large".
            trim: null,

            // stopTrim
            // A moment token string, a delimited set of moment token strings,
            // or an array of moment token strings. Trimming will stop when a token
            // listed in this option is reached. A "*" character in the format
            // template string will also mark a moment token as stopTrim.
            // e.g. "d [days] *h:mm:ss" will always stop trimming at the 'hours' token.
            stopTrim: null,

            // largest
            // Set to a positive integer to output only the "n" largest-magnitude
            // moment tokens that have a value. All lesser-magnitude moment tokens
            // will be ignored. This option takes effect even if `trim` is set
            // to `false`.
            largest: null,

            // maxValue
            // Use `maxValue` to render generalized output for large duration values,
            // e.g. `"> 60 days"`. `maxValue` must be a positive integer and is
            /// applied to the greatest-magnitude moment token in the format template.
            maxValue: null,

            // minValue
            // Use `minValue` to render generalized output for small duration values,
            // e.g. `"< 5 minutes"`. `minValue` must be a positive integer and is
            // applied to the least-magnitude moment token in the format template.
            minValue: null,

            // precision
            // If a positive integer, number of decimal fraction digits to render.
            // If a negative integer, number of integer place digits to truncate to 0.
            // If `useSignificantDigits` is set to `true` and `precision` is a positive
            // integer, sets the maximum number of significant digits used in the
            // formatted output.
            precision: 0,

            // trunc
            // Default behavior rounds final token value. Set to `true` to
            // truncate final token value, which was the default behavior in
            // version 1 of this plugin.
            trunc: false,

            // forceLength
            // Force first moment token with a value to render at full length
            // even when template is trimmed and first moment token has length of 1.
            forceLength: null,

            // userLocale
            // Formatted numerical output is rendered using `toLocaleString`
            // and the locale of the user's environment. Set this option to render
            // numerical output using a different locale. Unit names are rendered
            // and detected using the locale set in moment.js, which can be different
            // from the locale of user's environment.
            userLocale: null,

            // usePlural
            // Will automatically singularize or pluralize unit names when they
            // appear in the text associated with each moment token. Standard and
            // short unit labels are singularized and pluralized, based on locale.
            // e.g. in english, "1 second" or "1 sec" would be rendered instead
            // of "1 seconds" or "1 secs". The default pluralization function
            // renders a plural label for a value with decimal precision.
            // e.g. "1.0 seconds" is never rendered as "1.0 second".
            // Label types and pluralization function are configurable in the
            // localeData extensions.
            usePlural: true,

            // useLeftUnits
            // The text to the right of each moment token in a format string
            // is treated as that token's units for the purposes of trimming,
            // singularizing, and auto-localizing.
            // e.g. "h [hours], m [minutes], s [seconds]".
            // To properly singularize or localize a format string such as
            // "[hours] h, [minutes] m, [seconds] s", where the units appear
            // to the left of each moment token, set useLeftUnits to `true`.
            // This plugin is not tested in the context of rtl text.
            useLeftUnits: false,

            // useGrouping
            // Enables locale-based digit grouping in the formatted output. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
            useGrouping: true,

            // useSignificantDigits
            // Treat the `precision` option as the maximum significant digits
            // to be rendered. Precision must be a positive integer. Significant
            // digits extend across unit types,
            // e.g. "6 hours 37.5 minutes" represents 4 significant digits.
            // Enabling this option causes token length to be ignored. See  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
            useSignificantDigits: false,

            // template
            // The template string used to format the duration. May be a function
            // or a string. Template functions are executed with the `this` binding
            // of the settings object so that template strings may be dynamically
            // generated based on the duration object (accessible via `this.duration`)
            // or any of the other settings. Leading and trailing space, comma,
            // period, and colon characters are trimmed from the resulting string.
            template: defaultFormatTemplate,

            // useToLocaleString
            // Set this option to `false` to ignore the `toLocaleString` feature
            // test and force the use of the `formatNumber` fallback function
            // included in this plugin.
            useToLocaleString: true,

            // formatNumber fallback options.
            // When `toLocaleString` is detected and passes the feature test, the
            // following options will have no effect: `toLocaleString` will be used
            // for formatting and the grouping separator, decimal separator, and
            // integer digit grouping will be determined by the user locale.

            // groupingSeparator
            // The integer digit grouping separator used when using the fallback
            // formatNumber function.
            groupingSeparator: ",",

            // decimalSeparator
            // The decimal separator used when using the fallback formatNumber
            // function.
            decimalSeparator: ".",

            // grouping
            // The integer digit grouping used when using the fallback formatNumber
            // function. Must be an array. The default value of `[3]` gives the
            // standard 3-digit thousand/million/billion digit groupings for the
            // "en" locale. Setting this option to `[3, 2]` would generate the
            // thousand/lakh/crore digit groupings used in the "en-IN" locale.
            grouping: [3]
        };

        context.updateLocale('en', engLocale);
    }

    // Run feature tests for `Number#toLocaleString`.
    var toLocaleStringFormatter = function(number, locale, options) {
        return number.toLocaleString(locale, options);
    };

    toLocaleStringWorks = toLocaleStringSupportsLocales() && featureTestFormatter(toLocaleStringFormatter);
    toLocaleStringRoundingWorks = toLocaleStringWorks && featureTestFormatterRounding(toLocaleStringFormatter);

    // Run feature tests for `Intl.NumberFormat#format`.
    var intlNumberFormatFormatter = function(number, locale, options) {
        if (typeof window !== 'undefined' && window && window.Intl && window.Intl.NumberFormat) {
            return window.Intl.NumberFormat(locale, options).format(number);
        }
    };

    intlNumberFormatWorks = featureTestFormatter(intlNumberFormatFormatter);
    intlNumberFormatRoundingWorks = intlNumberFormatWorks && featureTestFormatterRounding(intlNumberFormatFormatter);

    // Initialize duration format on the global moment instance.
    init(moment);

    // Return the init function so that duration format can be
    // initialized on other moment instances.
    return init;
});


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;
          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;
              default:
                return $$typeof;
            }
        }
      case REACT_LAZY_TYPE:
      case REACT_MEMO_TYPE:
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}

// AsyncMode is deprecated along with isAsyncMode
var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;

var hasWarnedAboutDeprecatedIsAsyncMode = false;

// AsyncMode should be deprecated
function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }
  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.typeOf = typeOf;
exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isValidElementType = isValidElementType;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/warning/warning.js":
/*!*****************************************!*\
  !*** ./node_modules/warning/warning.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "development" !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  }

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;


/***/ }),

/***/ "@eventespresso/eejs":
/*!**********************************!*\
  !*** external {"this":["eejs"]} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]; }());

/***/ }),

/***/ "@eventespresso/helpers":
/*!********************************************!*\
  !*** external {"this":["eejs","helpers"]} ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["helpers"]; }());

/***/ }),

/***/ "@eventespresso/i18n":
/*!*****************************************!*\
  !*** external {"this":["eejs","i18n"]} ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["i18n"]; }());

/***/ }),

/***/ "@eventespresso/validators":
/*!***********************************************!*\
  !*** external {"this":["eejs","validators"]} ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["validators"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!******************************************!*\
  !*** external {"this":["wp","element"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["element"]; }());

/***/ }),

/***/ "@wordpress/is-shallow-equal":
/*!*************************************************!*\
  !*** external {"this":["wp","isShallowEqual"]} ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["isShallowEqual"]; }());

/***/ }),

/***/ "lodash":
/*!**********************************!*\
  !*** external {"this":"lodash"} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["lodash"]; }());

/***/ }),

/***/ "moment":
/*!**********************************!*\
  !*** external {"this":"moment"} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["moment"]; }());

/***/ }),

/***/ "moment-timezone":
/*!****************************************************!*\
  !*** external {"this":["eejs","vendor","moment"]} ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["vendor"]["moment"]; }());

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9zcmMvdXRpbHMvcGFyc2UtaW5maW5pdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL2N1cnJlbmN5LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL3NyYy92by9kYXRlLXRpbWUvYXNzZXJ0aW9ucy5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9zcmMvdm8vZGF0ZS10aW1lL2RhdGV0aW1lLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL3NyYy92by9kYXRlLXRpbWUvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL2RhdGUtdGltZS9kdXJhdGlvbi5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9zcmMvdm8vZGF0ZS10aW1lL2luZGV4LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL3NyYy92by9kYXRlLXRpbWUvc2VydmVyLWRhdGUtdGltZS5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9zcmMvdm8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL2luZmluaXR5LXN5bWJvbC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9zcmMvdm8vbGFiZWwuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL21vbmV5LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NvbnN0cnVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXQuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zdXBlclByb3BCYXNlLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvYWNjb3VudGluZy1qcy9kaXN0L2FjY291bnRpbmcudW1kLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL2RlY2ltYWwuanMtbGlnaHQvZGVjaW1hbC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9tb21lbnQtZHVyYXRpb24tZm9ybWF0L2xpYi9tb21lbnQtZHVyYXRpb24tZm9ybWF0LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvd2FybmluZy5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcImhlbHBlcnNcIl19Iiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJpMThuXCJdfSIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsaWRhdG9yc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJlbGVtZW50XCJdfSIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImlzU2hhbGxvd0VxdWFsXCJdfSIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvZXh0ZXJuYWwge1widGhpc1wiOlwibW9tZW50XCJ9Iiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJ2ZW5kb3JcIixcIm1vbWVudFwiXX0iXSwibmFtZXMiOlsicGFyc2VJbmZpbml0eSIsIm51bWJlciIsImFzSW50IiwiZm9yRGIiLCJyZXByZXNlbnRzSW5maW5pdHkiLCJ2YWx1ZSIsIkluZmluaXR5IiwiaXNOaWwiLCJ0eXBlIiwibmFtZSIsInByb3BzIiwicGFyc2VJbnQiLCJDdXJyZW5jeSIsImN1cnJlbmN5Q29uZmlnIiwidmFsaWRhdGVDdXJyZW5jeUNvbmZpZyIsImNvZGUiLCJzaW5ndWxhckxhYmVsIiwicGx1cmFsTGFiZWwiLCJzaWduIiwic2lnbkI0IiwiaXNVbmRlZmluZWQiLCJkZWNpbWFsUGxhY2VzIiwiZGVjaW1hbE1hcmsiLCJ0aG91c2FuZHNTZXBhcmF0b3IiLCJzdWJ1bml0cyIsIk1hdGgiLCJwb3ciLCJPYmplY3QiLCJmcmVlemUiLCJkZWNpbWFsSW5mbyIsImRlY2ltYWwiLCJ0aG91c2FuZCIsInByZWNpc2lvbiIsImN1cnJlbmN5Iiwic3ltYm9sIiwiZm9ybWF0IiwicG9zIiwibmVnIiwiemVybyIsImNvbmZpZyIsImlzRW1wdHkiLCJFeGNlcHRpb24iLCJpc1N0cmluZyIsIlR5cGVFcnJvciIsImlzQm9vbGVhbiIsImlzTnVtYmVyIiwiU2l0ZUN1cnJlbmN5IiwiZSIsIndhcm5pbmciLCJtZXNzYWdlIiwiQ1VSUkVOQ1lfQ09ORklHIiwidmFsaWRhdGVMb2NhbGUiLCJsb2NhbGUiLCJvcmlnaW5hbExvY2FsZSIsIm1vbWVudCIsInZhbGlkYXRpb25Mb2NhbGUiLCJhc3NlcnRMb2NhbGVJc1ZhbGlkIiwiSW52YWxpZExvY2FsZSIsInZhbGlkYXRlSVNPODYwMSIsImRhdGVUaW1lU3RyaW5nIiwiaXNEdXJhdGlvbiIsInJlZ2V4IiwidGVzdCIsImFzc2VydElTTzg2MDFJc1ZhbGlkIiwiSW52YWxpZElTTzg2MDFTdHJpbmciLCJ2YWxpZGF0ZVRpbWV6b25lIiwidGltZXpvbmUiLCJkdCIsInR6Iiwiem9uZSIsImFzc2VydFRpbWV6b25lSXNWYWxpZCIsIkludmFsaWRUaW1lem9uZSIsInZhbGlkYXRlSXNEYXRlIiwiZGF0ZSIsIkRhdGUiLCJhc3NlcnRJc0RhdGUiLCJ2YWxpZGF0ZUlzT2Zmc2V0Iiwib2Zmc2V0IiwiYXNzZXJ0SXNPZmZzZXQiLCJwcml2YXRlUHJvcGVydGllcyIsImRhdGV0aW1lIiwiU3ltYm9sIiwicHJpdmF0ZU1ldGhvZHMiLCJnZXRVbml0TmFtZXMiLCJjcmVhdGVHZXR0ZXJzQW5kU2V0dGVycyIsImV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lcyIsIm5vcm1hbGl6ZVVuaXROYW1lIiwibm9ybWFsaXplVW5pdE9iamVjdCIsIm5vcm1hbGl6ZVVuaXRWYWx1ZSIsIm5vcm1hbGl6ZUFyZ3VtZW50cyIsInZhbGlkRGF0ZVRpbWVVbml0cyIsIkRhdGVUaW1lIiwiaXNvODYwMURhdGVTdHJpbmciLCJERUZBVUxUX1RJTUVaT05FX1NUUklORyIsIkRFRkFVTFRfVkFMSURfTE9DQUxFIiwiY29uc3RydWN0b3IiLCJ1dGMiLCJ1dGNPZmZzZXQiLCJUSU1FWk9ORV9MT0NBTCIsImZvckVhY2giLCJ1bml0TmFtZSIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwibWV0aG9kTmFtZSIsInVuaXRWYWx1ZSIsImNhcGl0YWxpemUiLCJzZXQiLCJzZXRPYmplY3QiLCJpbnN0YW5jZUFyZ3VtZW50cyIsImNsb25lIiwidG9JU09TdHJpbmciLCJmcm9tTW9tZW50IiwiaXNWYWxpZCIsIm90aGVyRGF0ZVRpbWUiLCJhc3NlcnRJc0RhdGVUaW1lIiwiRHVyYXRpb24iLCJkdXJhdGlvbiIsImRpZmYiLCJ1bml0IiwiZW5kT2YiLCJpc1NhbWUiLCJhc3NlcnRJc1ZhbGlkRHVyYXRpb24iLCJzdWJ0cmFjdCIsInRvT2JqZWN0IiwiYWRkIiwic3RhcnRPZiIsIkRFRkFVTFRfRk9STUFUIiwiaW5VVEMiLCJ0b0RhdGUiLCJsb2NhbCIsInZhbHVlT2YiLCJyZWR1Y2UiLCJyZXN1bHQiLCJrZXkiLCJ0b1N0cmluZyIsImRheXNJbk1vbnRoIiwiaXNEU1QiLCJpc0xlYXBZZWFyIiwiZGF5T2ZZZWFyIiwicXVhcnRlciIsImlzb1dlZWsiLCJpc29XZWVrWWVhciIsImlzb1dlZWtkYXkiLCJpc29XZWVrc0luWWVhciIsImFzc2VydGlvbnMiLCJpbnN0YW5jZU9mIiwidmFsaWRhdGVJc0RhdGVUaW1lIiwiSW52YWxpZERhdGVUaW1lIiwiZGF0ZVZhbHVlIiwiZGF0ZXRpbWVzIiwibWFwIiwibWF4IiwibWluIiwibW9tZW50SW5zdGFuY2UiLCJpc01vbWVudCIsImlzRnVuY3Rpb24iLCJJU09TdHJpbmciLCJERUZBVUxUX09GRlNFVCIsIm1pbGxpc2Vjb25kcyIsInNlY29uZHMiLCJ1bml4IiwidmFsdWVzIiwiSW52YWxpZEFyZ3VtZW50IiwidmFsdWVzRm9yQ29uc3RydWN0Iiwib21pdCIsImZyb21Mb2NhbCIsIm5hbWVUb05vcm1hbGl6ZSIsImRheSIsImRheXMiLCJ5ZWFycyIsIm1vbnRocyIsIm1pbnV0ZXMiLCJob3VycyIsImlzT2JqZWN0IiwiVU5JVF9ZRUFSIiwiVU5JVF9NT05USCIsIlVOSVRfREFZIiwiVU5JVF9IT1VSIiwiVU5JVF9NSU5VVEUiLCJVTklUX1NFQ09ORCIsIlVOSVRfTUlMTElTRUNPTkQiLCJUSU1FWk9ORV9DT05GSUciLCJzdHJpbmciLCJIQVNfVElNRVpPTkVfU1RSSU5HIiwiRk9STUFUX1NJVEVfREFURSIsIkZPUk1BVF9TSVRFX1RJTUUiLCJERUZBVUxUX0xPQ0FMRSIsInNuYWtlQ2FzZSIsIlNFUlZFUl9MT0NBTEUiLCJ1c2VyIiwibW9tZW50RHVyYXRpb25Gb3JtYXRTZXR1cCIsImR1cmF0aW9uVmFsdWVzIiwiY3JlYXRlR2V0dGVycyIsImdldEFsbFVuaXROYW1lcyIsInBvcHVsYXRlVmFsdWVzRnJvbUR1cmF0aW9uIiwic2V0VmFsdWVzIiwiZmlsdGVyVmFsdWVzIiwidW5pdE5hbWVzIiwiZGVyaXZhdGl2ZVVuaXROYW1lcyIsInZhbHVlc1RvU2V0IiwicGljayIsImlzU2hhbGxvd0VxdWFsIiwia2V5cyIsImpvaW4iLCJhY2Nlc3Nvck5hbWUiLCJpbmRleE9mIiwiYXNNZXRob2ROYW1lIiwib3RoZXJEdXJhdGlvbiIsImFzc2VydElzRHVyYXRpb24iLCJub3JtYWxpemUiLCJtYXBWYWx1ZXMiLCJ0b0pTT04iLCJ0b0lTTyIsImFzTWlsbGlzZWNvbmRzIiwiaXNvU3RyaW5nIiwiaXNWYWxpZER1cmF0aW9uIiwiU2VydmVyRGF0ZVRpbWUiLCJJbmZpbml0eVN5bWJvbCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9uZU9mVHlwZSIsImJvb2wiLCJvYmplY3QiLCJkZWZhdWx0UHJvcHMiLCJMYWJlbCIsInNpbmd1bGFyIiwicGx1cmFsIiwic2V0U2luZ3VsYXIiLCJzZXRQbHVyYWwiLCJhc3NlcnRTdHJpbmciLCJzdGFydENhc2UiLCJ0b0xvd2VyQ2FzZSIsInRvVXBwZXJDYXNlIiwiZm9ybWF0VHlwZSIsIkZPUk1BVF9TRU5URU5DRV9DQVNFIiwiYXNTZW50ZW5jZUNhc2UiLCJGT1JNQVRfTE9XRVJDQVNFIiwiYXNMb3dlckNhc2UiLCJGT1JNQVRfVVBQRVJDQVNFIiwiYXNVcHBlckNhc2UiLCJsYWJlbCIsImFzc2VydE1vbmV5IiwibW9uZXkiLCJhc3NlcnRDdXJyZW5jeSIsImFzc2VydFNhbWVDdXJyZW5jeSIsImN1cnJlbmN5QSIsImN1cnJlbmN5QiIsIk1vbmV5IiwiYW1vdW50Iiwic2V0Q3VycmVuY3kiLCJzZXRBbW91bnQiLCJzZXRGb3JtYXR0ZXIiLCJ0b051bWJlciIsIkRlY2ltYWwiLCJmb3JtYXR0ZXIiLCJBY2NvdW50aW5nIiwic2V0dGluZ3MiLCJ0b0FjY291bnRpbmdTZXR0aW5ncyIsIm90aGVyIiwiZXF1YWxzIiwiaGFzU2FtZUN1cnJlbmN5IiwiYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3kiLCJwbHVzIiwibWludXMiLCJtdWx0aXBsaWVyIiwidGltZXMiLCJkaXZpc29yIiwiZGl2aWRlZEJ5IiwicmF0aW9zIiwic2VsZiIsInJlc3VsdHMiLCJjb252ZXJ0ZWRSYXRpb3MiLCJyZW1haW5kZXIiLCJ0b1N1YnVuaXRzIiwidG90YWwiLCJyYXRpbyIsInB1c2giLCJzaGFyZSIsImZsb29yIiwiaSIsImdyZWF0ZXJUaGFuIiwiY29tcGFyZWRUbyIsImdyZWF0ZXJUaGFuT3JFcXVhbFRvIiwibGVzc1RoYW4iLCJsZXNzVGhhbk9yRXF1YWxUbyIsImlzWmVybyIsImlzTmVnYXRpdmUiLCJpc1Bvc2l0aXZlIiwicm91bmRpbmciLCJST1VORF9IQUxGX1VQIiwidG9GaXhlZCIsInRvSW50ZWdlciIsIlJPVU5EX1VQIiwiUk9VTkRfRE9XTiIsIlJPVU5EX0NFSUwiLCJST1VORF9GTE9PUiIsIlJPVU5EX0hBTEZfRE9XTiIsIlJPVU5EX0hBTEZfRVZFTiIsInRoaXNNb25leSIsIm90aGVyTW9uZXkiLCJtb25leVZhbHVlIiwibWF0Y2giLCJsZW5ndGgiLCJzcHJpbnRmIiwiRXJyb3IiLCJwYXJzZSJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FB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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDO0FBQ0QsMEM7Ozs7Ozs7Ozs7O0FDL1pBO0FBQ0EsQ0FBQztBQUNEOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLGdCQUFnQixFQUFFO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsbURBQW1EO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLE9BQU87QUFDakQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixhQUFhOztBQUU5QjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsc0JBQXNCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZUFBZTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLGFBQWE7O0FBRXpCO0FBQ0Esc0JBQXNCLFNBQVM7QUFDL0I7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixLQUFLOztBQUVyQjtBQUNBLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFVBQVUsVUFBVTs7QUFFcEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0JBQXNCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxxQ0FBcUM7QUFDckM7O0FBRUE7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksS0FBSztBQUNqQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsR0FBRztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QixnQkFBZ0I7O0FBRXpDO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHFCQUFxQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLGNBQWM7O0FBRXhCO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLEtBQUs7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsdUJBQXVCLFFBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksdUJBQXVCO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQix1QkFBdUI7QUFDeEM7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyx1QkFBdUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsV0FBVzs7QUFFekI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVzs7QUFFWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxTQUFTO0FBQ25CO0FBQ0E7OztBQUdBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxVQUFVLEtBQUs7QUFDZjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLDBCQUEwQjs7QUFFekM7QUFDQSwwQkFBMEIsZ0NBQWdDO0FBQzFEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2QixTQUFTO0FBQ3RDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQSxZQUFZLEtBQUs7QUFDakI7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLFNBQVM7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixTQUFTOztBQUUxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsZUFBZTs7QUFFdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNB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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0IseUNBQXlDO0FBQ3pDLDBCQUEwQjtBQUMxQixxQ0FBcUM7QUFDckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxvQkFBb0I7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsY0FBYztBQUMzRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViw2QkFBNkI7QUFDN0IsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw0QkFBNEI7QUFDNUIsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFVBQVUsS0FBcUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxJQUFxQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNLEtBQXFDLDRGQUE0RixTQUFNO0FBQzdJO0FBQ0E7O0FBRUEsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZ0NBQWdDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUErQixFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTlDLGFBQWEsMENBQTBDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBekQsYUFBYSx1Q0FBdUMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F0RCxhQUFhLDZDQUE2QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTVELGFBQWEsd0NBQXdDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdkQsYUFBYSwrQ0FBK0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E5RCxhQUFhLGlDQUFpQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQWhELGFBQWEsaUNBQWlDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBaEQsYUFBYSxtREFBbUQsRUFBRSxJIiwiZmlsZSI6ImV2ZW50ZXNwcmVzc28tdmFsdWUtb2JqZWN0cy5mOWY0Y2U1NDY3NDU4ZGJlZGU0OC5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvc3JjL3ZvL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzTmlsIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBjb252ZXJ0cyBpbmZpbml0ZSB2YWx1ZXMgdG8gbnVsbCBmb3IgdXNlIGluIGZvcm1zXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bGx8bnVtYmVyfHN0cmluZ30gbnVtYmVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFzSW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZvckRiXG4gKiBAcmV0dXJuIHtudW1iZXJ9IGNvbnZlcnRlZCBpbmZpbml0ZSB2YWx1ZVxuICovXG5jb25zdCBwYXJzZUluZmluaXR5ID0gKCBudW1iZXIsIGFzSW50ID0gZmFsc2UsIGZvckRiID0gZmFsc2UgKSA9PiB7XG5cdC8vIHJldHVybnMgdHJ1ZSBmb3IgYW55IHBvc3NpYmxlIHZhbHVlIHRoYXQgY291bGQgcmVwcmVzZW50IGluZmluaXR5XG5cdGNvbnN0IHJlcHJlc2VudHNJbmZpbml0eSA9ICggdmFsdWUgKSA9PlxuXHRcdHZhbHVlID09PSAtMSB8fFxuXHRcdHZhbHVlID09PSAnJyB8fFxuXHRcdHZhbHVlID09PSAnSU5GJyB8fFxuXHRcdHZhbHVlID09PSBJbmZpbml0eSB8fFxuXHRcdGlzTmlsKCB2YWx1ZSApO1xuXHRudW1iZXIgPSByZXByZXNlbnRzSW5maW5pdHkoIG51bWJlciApIHx8IChcblx0XHRudW1iZXIudHlwZSAmJlxuXHRcdG51bWJlci50eXBlLm5hbWUgPT09ICdJbmZpbml0eVN5bWJvbCcgJiZcblx0XHRyZXByZXNlbnRzSW5maW5pdHkoIG51bWJlci5wcm9wcy52YWx1ZSApXG5cdCkgP1xuXHRcdEluZmluaXR5IDpcblx0XHRudW1iZXI7XG5cdG51bWJlciA9IG51bWJlciAhPT0gSW5maW5pdHkgJiYgYXNJbnQgPyBwYXJzZUludCggbnVtYmVyLCAxMCApIDogbnVtYmVyO1xuXHRudW1iZXIgPSAhIGZvckRiIHx8ICggZm9yRGIgJiYgbnVtYmVyICE9PSBJbmZpbml0eSApID8gbnVtYmVyIDogLTE7XG5cdHJldHVybiBudW1iZXI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwYXJzZUluZmluaXR5O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGlzRW1wdHksXG5cdGlzU3RyaW5nLFxuXHRpc051bWJlcixcblx0aXNCb29sZWFuLFxuXHRpc1VuZGVmaW5lZCxcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEV4Y2VwdGlvbiwgQ1VSUkVOQ1lfQ09ORklHIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcblxuLyoqXG4gKiBBIHZhbHVlIG9iamVjdCByZXByZXNlbnRpbmcgY3VycmVuY3kgdmFsdWVzXG4gKi9cbmV4cG9ydCBjbGFzcyBDdXJyZW5jeSB7XG5cdC8qKlxuXHQgKiBUaGUgSVNPIDQyMTcgY29kZSBpZGVudGlmeWluZyB0aGUgY3VycmVuY3kgKGVnLiAnVVNEJylcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGNvZGUgPSAnJztcblxuXHQvKipcblx0ICogVGhlIHNpbmd1bGFyIGxhYmVsIGZvciB0aGUgY3VycmVuY3kgKGVnLiAnRG9sbGFyJyk7XG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRzaW5ndWxhckxhYmVsID0gJyc7XG5cblx0LyoqXG5cdCAqIFRoZSBwbHVyYWwgbGFiZWwgZm9yIHRoZSBjdXJyZW5jeSAoZWcuICdEb2xsYXJzJyk7XG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRwbHVyYWxMYWJlbCA9ICcnO1xuXG5cdC8qKlxuXHQgKiBUaGUgY3VycmVuY3kgc3ltYm9sIChlZy4gJyQnKTtcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHNpZ24gPSAnJztcblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgY3VycmVuY3kgc3ltYm9sIGlzIGRpc3BsYXllZCBiZWZvcmUgb3IgYWZ0ZXIgdGhlIHZhbHVlLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHNpZ25CNCA9IHRydWU7XG5cblx0LyoqXG5cdCAqIFRoZSBwcmVjaXNpb24gZm9yIHRoZSB2YWx1ZSAoZWcuIDEwLjAyIGlzIDIsIDEwLjEyMyBpcyAzKS4gVGhlIG51bWJlciBvZlxuXHQgKiBkZWNpbWFsIHBsYWNlcyBjYW4gYmUgdXNlZCB0byBjYWxjdWxhdGUgdGhlIG51bWJlciBvZiBzdWJ1bml0cyBmb3IgdGhlXG5cdCAqIGN1cnJlbmN5IC0gc3VidW5pdHMgPSBwb3coIDEwLCBkZWNpbWFsUGxhY2VzKS5cblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdGRlY2ltYWxQbGFjZXMgPSAyO1xuXG5cdC8qKlxuXHQgKiBUaGUgc3ltYm9sIHVzZWQgZm9yIHRoZSBkZWNpbWFsIG1hcmsgKGVnLiAnLicpXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRkZWNpbWFsTWFyayA9ICcuJztcblxuXHQvKipcblx0ICogVGhlIHN5bWJvbCB1c2VkIHRvIHNwbGl0IHVwIHRob3VzYW5kcyBpbiB0aGUgdmFsdWUgKGVnLiAnLCcpXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHR0aG91c2FuZHNTZXBhcmF0b3IgPSAnLCc7XG5cblx0LyoqXG5cdCAqIFRoZSBudW1iZXIgb2YgZnJhY3Rpb25hbCBkaXZpc2lvbnMgb2YgYSBjdXJyZW5jeSdzIG1haW4gdW5pdC4gIElmIG5vdFxuXHQgKiBwcm92aWRlZCwgdGhlbiBpdCBpcyBhdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZWQgZnJvbSB0aGUgZGVjaW1hbFBsYWNlc1xuXHQgKiB2YWx1ZS5cblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN1YnVuaXRzID0gMTAwO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAcGFyYW0ge3t9fSBjdXJyZW5jeUNvbmZpZyBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgY29uZmlndXJhdGlvbiBmb3Jcblx0ICogdGhpcyBjdXJyZW5jeSB2YWx1ZSBvYmplY3QuICBPbiBjb25zdHJ1Y3Rpb24sIHRoZSBDdXJyZW5jeSBvYmplY3QgaXNcblx0ICogZnJvemVuIHNvIHRoYXQgaXQgYmVjb21lcyBpbW11dGFibGUuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciggY3VycmVuY3lDb25maWcgKSB7XG5cdFx0Q3VycmVuY3kudmFsaWRhdGVDdXJyZW5jeUNvbmZpZyggY3VycmVuY3lDb25maWcgKTtcblx0XHR0aGlzLmNvZGUgPSBjdXJyZW5jeUNvbmZpZy5jb2RlO1xuXHRcdHRoaXMuc2luZ3VsYXJMYWJlbCA9IGN1cnJlbmN5Q29uZmlnLnNpbmd1bGFyTGFiZWwgfHwgJyc7XG5cdFx0dGhpcy5wbHVyYWxMYWJlbCA9IGN1cnJlbmN5Q29uZmlnLnBsdXJhbExhYmVsIHx8ICcnO1xuXHRcdHRoaXMuc2lnbiA9IGN1cnJlbmN5Q29uZmlnLnNpZ247XG5cdFx0dGhpcy5zaWduQjQgPSBpc1VuZGVmaW5lZCggY3VycmVuY3lDb25maWcuc2lnbkI0ICkgP1xuXHRcdFx0dGhpcy5zaWduQjQgOlxuXHRcdFx0Y3VycmVuY3lDb25maWcuc2lnbkI0O1xuXHRcdHRoaXMuZGVjaW1hbFBsYWNlcyA9IGlzVW5kZWZpbmVkKCBjdXJyZW5jeUNvbmZpZy5kZWNpbWFsUGxhY2VzICkgP1xuXHRcdFx0dGhpcy5kZWNpbWFsUGxhY2VzIDpcblx0XHRcdGN1cnJlbmN5Q29uZmlnLmRlY2ltYWxQbGFjZXM7XG5cdFx0dGhpcy5kZWNpbWFsTWFyayA9IGN1cnJlbmN5Q29uZmlnLmRlY2ltYWxNYXJrIHx8IHRoaXMuZGVjaW1hbE1hcms7XG5cdFx0dGhpcy50aG91c2FuZHNTZXBhcmF0b3IgPSBjdXJyZW5jeUNvbmZpZy50aG91c2FuZHNTZXBhcmF0b3IgfHwgdGhpcy50aG91c2FuZHNTZXBhcmF0b3I7XG5cdFx0dGhpcy5zdWJ1bml0cyA9IGN1cnJlbmN5Q29uZmlnLnN1YnVuaXRzIHx8XG5cdFx0XHRNYXRoLnBvdyggMTAsIHRoaXMuZGVjaW1hbFBsYWNlcyApO1xuXHRcdE9iamVjdC5mcmVlemUoIHRoaXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBjdXJyZW5jeSBwcm9wZXJ0aWVzIGFzIGFuIG9iamVjdCBmb3JtYXR0ZWQgZm9yIHRoZVxuXHQgKiBhY2NvdW50aW5nLWpzIGxpYnJhcnkgY29uZmlndXJhdGlvbi5cblx0ICpcblx0ICogQHJldHVybiB7e319ICBBbiBvYmplY3Qgc2hhcGVkIGZvciB3aGF0IHRoZSBhY2NvdW50aW5nLWpzIGxpYnJhcnkgZXhwZWN0c1xuXHQgKi9cblx0dG9BY2NvdW50aW5nU2V0dGluZ3MoKSB7XG5cdFx0Y29uc3QgZGVjaW1hbEluZm8gPSB7XG5cdFx0XHRkZWNpbWFsOiB0aGlzLmRlY2ltYWxNYXJrLFxuXHRcdFx0dGhvdXNhbmQ6IHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yLFxuXHRcdFx0cHJlY2lzaW9uOiB0aGlzLmRlY2ltYWxQbGFjZXMsXG5cdFx0fTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y3VycmVuY3k6IHtcblx0XHRcdFx0c3ltYm9sOiB0aGlzLnNpZ24sXG5cdFx0XHRcdGZvcm1hdDoge1xuXHRcdFx0XHRcdHBvczogdGhpcy5zaWduQjQgPyAnJXMldicgOiAnJXYlcycsXG5cdFx0XHRcdFx0bmVnOiB0aGlzLnNpZ25CNCA/ICctICRzJXYnIDogJy0gJXYlcycsXG5cdFx0XHRcdFx0emVybzogdGhpcy5zaWduQjQgPyAnJXMldicgOiAnJXYlcycsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdC4uLmRlY2ltYWxJbmZvLFxuXHRcdFx0fSxcblx0XHRcdG51bWJlcjogZGVjaW1hbEluZm8sXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhpcyBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4ge09iamVjdH0gRnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBvYmplY3QgdG8gYmUgc2VyaWFsaXplZCBieVxuXHQgKiBKU09OLnN0cmluZ2lmeVxuXHQgKi9cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb2RlOiB0aGlzLmNvZGUsXG5cdFx0XHRzaW5ndWxhckxhYmVsOiB0aGlzLnNpbmd1bGFyTGFiZWwsXG5cdFx0XHRwbHVyYWxMYWJlbDogdGhpcy5wbHVyYWxMYWJlbCxcblx0XHRcdHNpZ246IHRoaXMuc2lnbixcblx0XHRcdHNpZ25CNDogdGhpcy5zaWduQjQsXG5cdFx0XHRkZWNpbWFsTWFyazogdGhpcy5kZWNpbWFsTWFyayxcblx0XHRcdHRob3VzYW5kc1NlcGFyYXRvcjogdGhpcy50aG91c2FuZHNTZXBhcmF0b3IsXG5cdFx0XHRzdWJ1bml0czogdGhpcy5zdWJ1bml0cyxcblx0XHRcdGRlY2ltYWxQbGFjZXM6IHRoaXMuZGVjaW1hbFBsYWNlcyxcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgdmFsaWRhdGVzIHdoZXRoZXIgdGhlIHBhc3NlZCBpbiBjb25maWcgaGFzIHRoZSByZXF1aXJlZCBwcm9wZXJ0aWVzXG5cdCAqIChhbmQgY29ycmVjdCB0eXBlcykgZm9yIGNvbnN0cnVjdGluZyBhIEN1cnJlbmN5IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHt7fX0gY29uZmlnXG5cdCAqIEB0aHJvd3Mge0V4Y2VwdGlvbn1cblx0ICogQHRocm93cyB7VHlwZUVycm9yfVxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlQ3VycmVuY3lDb25maWcgPSAoIGNvbmZpZyApID0+IHtcblx0XHRpZiAoIGlzRW1wdHkoIGNvbmZpZyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbihcblx0XHRcdFx0J1RoZSBjb25maWd1cmF0aW9uIG9iamVjdCBwcm92aWRlZCB0byBDdXJyZW5jeSBtdXN0IG5vdCcgK1xuXHRcdFx0XHQnIGJlIGVtcHR5J1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKCAhIGNvbmZpZy5jb2RlIHx8ICEgaXNTdHJpbmcoIGNvbmZpZy5jb2RlICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHByb3ZpZGVkIHRvIEN1cnJlbmN5IG11c3QgaGF2ZSAnICtcblx0XHRcdFx0J2EgXCJjb2RlXCIgcHJvcGVydHkgdGhhdCBpcyBhIHN0cmluZy4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggISBjb25maWcuc2lnbiB8fCAhIGlzU3RyaW5nKCBjb25maWcuc2lnbiApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBjb25maWd1cmF0aW9uIG9iamVjdCBwcm92aWRlZCB0byBDdXJyZW5jeSBtdXN0IGhhdmUgYSAnICtcblx0XHRcdFx0J1wic2lnblwiIHByb3BlcnR5IHRoYXQgaXMgYSBzdHJpbmcuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5zaW5ndWxhckxhYmVsICYmICEgaXNTdHJpbmcoIGNvbmZpZy5zaW5ndWxhckxhYmVsICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHNpbmd1bGFyTGFiZWwgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIHN0cmluZyBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5wbHVyYWxMYWJlbCAmJiAhIGlzU3RyaW5nKCBjb25maWcucGx1cmFsTGFiZWwgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgcGx1cmFsTGFiZWwgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIHN0cmluZyBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5zaWduQjQgJiYgISBpc0Jvb2xlYW4oIGNvbmZpZy5zaWduQjQgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgc2lnbkI0IHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBib29sZWFuIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLmRlY2ltYWxQbGFjZXMgJiYgISBpc051bWJlciggY29uZmlnLmRlY2ltYWxQbGFjZXMgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgZGVjaW1hbFBsYWNlcyBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgbnVtYmVyIHByaW1pdGl2ZSdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcuZGVjaW1hbE1hcmsgJiYgISBpc1N0cmluZyggY29uZmlnLmRlY2ltYWxNYXJrICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGRlY2ltYWxNYXJrIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBzdHJpbmcgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcudGhvdXNhbmRzU2VwYXJhdG9yICYmXG5cdFx0XHQhIGlzU3RyaW5nKCBjb25maWcudGhvdXNhbmRzU2VwYXJhdG9yICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHRob3VzYW5kc1NlcGFyYXRvciBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgc3RyaW5nIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLnN1YnVuaXRzICYmICEgaXNOdW1iZXIoIGNvbmZpZy5zdWJ1bml0cyApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBzdWJ1bml0cyBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgbnVtYmVyIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEV4cG9ydCBvZiBhIEN1cnJlbmN5IFZhbHVlIG9iamVjdCBjcmVhdGVkIGZyb20gYSBjdXJyZW5jeSBjb25maWcgcHJvdmlkZWQuXG4gKiBUaGlzIGNhdGNoZXMgYW55IGV4Y2VwdGlvbiBhbmQgdHJpZ2dlcnMgYSBjb25zb2xlIGVycm9yLlxuICpcbiAqIEBwYXJhbSB7e319IGNvbmZpZ1xuICogQHJldHVybiB7Q3VycmVuY3l8e319IElmIHRoZXJlJ3MgYSBwcm9ibGVtIGNvbnN0cnVjdGluZyB0aGUgY3VycmVuY3kgb2JqZWN0XG4gKiBhbiBlbXB0eSBvYmplY3QgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBTaXRlQ3VycmVuY3kgPSAoIGNvbmZpZyA9IHt9ICkgPT4ge1xuXHRsZXQgY3VycmVuY3k7XG5cdHRyeSB7XG5cdFx0Y3VycmVuY3kgPSBuZXcgQ3VycmVuY3koIGNvbmZpZyApO1xuXHR9IGNhdGNoICggZSApIHtcblx0XHRjdXJyZW5jeSA9IHt9O1xuXHRcdHdhcm5pbmcoXG5cdFx0XHRmYWxzZSxcblx0XHRcdCdUaGUgU2l0ZSBDdXJyZW5jeSBvYmplY3QgY291bGQgbm90IGJlIGNyZWF0ZWQgYmVjYXVzZSAnICtcblx0XHRcdCdvZiB0aGlzIGVycm9yOiAnICsgZS5tZXNzYWdlXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gY3VycmVuY3k7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaXRlQ3VycmVuY3koIENVUlJFTkNZX0NPTkZJRyApO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCB7IGlzU3RyaW5nLCBpc051bWJlciB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRJbnZhbGlkVGltZXpvbmUsXG5cdEludmFsaWRJU084NjAxU3RyaW5nLFxuXHRJbnZhbGlkTG9jYWxlLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gbG9jYWxlIHN0cmluZyBpcyBhIHZhbGlkIGxvY2FsZS5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGxvY2FsZVxuICogQHJldHVybiB7Ym9vbGVhbn0gSWYgZ2l2ZW4gbG9jYWxlIHN0cmluZyBpcyBub3QgdmFsaWQgdGhpcyB3aWxsIHJldHVybiBmYWxzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlTG9jYWxlKCBsb2NhbGUgKSB7XG5cdGlmICggISBpc1N0cmluZyggbG9jYWxlICkgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IG9yaWdpbmFsTG9jYWxlID0gbW9tZW50LmxvY2FsZSgpO1xuXHRjb25zdCB2YWxpZGF0aW9uTG9jYWxlID0gbW9tZW50LmxvY2FsZSggbG9jYWxlICk7XG5cdC8vIHJlc2V0IGJhY2sgdG8gb3JpZ2luYWwgbG9jYWxlXG5cdG1vbWVudC5sb2NhbGUoIG9yaWdpbmFsTG9jYWxlICk7XG5cdHJldHVybiAhICggbG9jYWxlICE9PSAnZW4nICYmIHZhbGlkYXRpb25Mb2NhbGUgPT09ICdlbicgKTtcbn1cblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgZ2l2ZW4gbG9jYWxlIHN0cmluZyBpcyB2YWxpZC4gIElmIGl0J3Mgbm90IGFuIGV4Y2VwdGlvbiBpc1xuICogdGhyb3duLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcbiAqIEB0aHJvd3MgSW52YWxpZExvY2FsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICkge1xuXHRpZiAoICEgdmFsaWRhdGVMb2NhbGUoIGxvY2FsZSApICkge1xuXHRcdHRocm93IG5ldyBJbnZhbGlkTG9jYWxlKCBsb2NhbGUgKTtcblx0fVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCBJU084NjAxIGZvcm1hdHRlZCBkYXRlIGFuZFxuICogdGltZSBzdHJpbmcuXG4gKlxuICogTm90ZTogZGF0ZSByZWdleCBwYXR0ZXJuIGZyb21cbiAqIGh0dHA6Ly93d3cucGVsYWdvZGVzaWduLmNvbS9ibG9nLzIwMDkvMDUvMjAvaXNvLTg2MDEtZGF0ZS12YWxpZGF0aW9uLXRoYXQtZG9lc250LXN1Y2svXG4gKiBOb3RlOiBpc0R1cmF0aW9uIHJlZ2V4IHBhdHRlcm4gZnJvbVxuICogaHR0cHM6Ly9naXRodWIuY29tL2N5bGMvY3lsYy9pc3N1ZXMvMTE5I2lzc3VlY29tbWVudC05NDM1NTMzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUaW1lU3RyaW5nXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzRHVyYXRpb24gIFdoZXRoZXIgdG8gdmFsaWRhdGUgZm9yIGEgZHVyYXRpb24gZm9ybWF0IG9yIG5vdC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBSZXR1cm5zIGZhbHNlIGlmIHRoZSBnaXZlbiBzdHJpbmcgaXMgbm90IHZhbGlkIElTTzg2MDFcbiAqIGZvcm1hdFxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVJU084NjAxKCBkYXRlVGltZVN0cmluZywgaXNEdXJhdGlvbiA9IGZhbHNlICkge1xuXHRpZiAoICEgaXNTdHJpbmcoIGRhdGVUaW1lU3RyaW5nICkgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IHJlZ2V4ID0gaXNEdXJhdGlvbiA/XG5cdFx0L14oUlxcZCpcXC8pP1AoPzpcXGQrKD86XFwuXFxkKyk/WSk/KD86XFxkKyg/OlxcLlxcZCspP00pPyg/OlxcZCsoPzpcXC5cXGQrKT9XKT8oPzpcXGQrKD86XFwuXFxkKyk/RCk/KD86VCg/OlxcZCsoPzpcXC5cXGQrKT9IKT8oPzpcXGQrKD86XFwuXFxkKyk/TSk/KD86XFxkKyg/OlxcLlxcZCspP1MpPyk/JC8gOlxuXHRcdC9eKFtcXCstXT9cXGR7NH0oPyFcXGR7Mn1cXGIpKSgoLT8pKCgwWzEtOV18MVswLTJdKShcXDMoWzEyXVxcZHwwWzEtOV18M1swMV0pKT98VyhbMC00XVxcZHw1WzAtMl0pKC0/WzEtN10pP3woMDBbMS05XXwwWzEtOV1cXGR8WzEyXVxcZHsyfXwzKFswLTVdXFxkfDZbMS02XSkpKShbVFxcc10oKChbMDFdXFxkfDJbMC0zXSkoKDo/KVswLTVdXFxkKT98MjRcXDo/MDApKFtcXC4sXVxcZCsoPyE6KSk/KT8oXFwxN1swLTVdXFxkKFtcXC4sXVxcZCspPyk/KFt6Wl18KFtcXCstXSkoWzAxXVxcZHwyWzAtM10pOj8oWzAtNV1cXGQpPyk/KT8pPyQvO1xuXHRyZXR1cm4gcmVnZXgudGVzdCggZGF0ZVRpbWVTdHJpbmcgKTtcbn1cblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIElTTzg2MDEgZm9ybWF0dGVkIGRhdGUgYW5kIHRpbWVcbiAqIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRpbWVTdHJpbmdcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEdXJhdGlvbiAgV2hldGhlciB0byBhc3NlcnQgZm9yIGEgZHVyYXRpb24gZm9ybWF0IG9yIG5vdC5cbiAqIEB0aHJvd3MgSW52YWxpZElTTzg2MDFTdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydElTTzg2MDFJc1ZhbGlkKCBkYXRlVGltZVN0cmluZywgaXNEdXJhdGlvbiA9IGZhbHNlICkge1xuXHRpZiAoICEgdmFsaWRhdGVJU084NjAxKCBkYXRlVGltZVN0cmluZywgaXNEdXJhdGlvbiApICkge1xuXHRcdHRocm93IG5ldyBJbnZhbGlkSVNPODYwMVN0cmluZyggZGF0ZVRpbWVTdHJpbmcgKTtcblx0fVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCB0aW1lem9uZSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRpbWV6b25lXG4gKiBAcmV0dXJuIHtib29sZWFufSBSZXR1cm5zIGZhbHNlIGlmIHRoZSBnaXZlbiBzdHJpbmcgaXMgbm90IGEgdmFsaWQgdGltZXpvbmVcbiAqIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVUaW1lem9uZSggdGltZXpvbmUgKSB7XG5cdGlmICggISBpc1N0cmluZyggdGltZXpvbmUgKSApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Y29uc3QgZHQgPSBtb21lbnQudHouem9uZSggdGltZXpvbmUgKTtcblx0cmV0dXJuIGR0ICE9PSBudWxsO1xufVxuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gc3RyaW5nIGlzIGEgdmFsaWQgdGltZXpvbmUgc3RyaW5nIGFuZCB0aHJvd3MgYW5cbiAqIGV4Y2VwdGlvbiBpZiBpdCBpc24ndC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcbiAqIEB0aHJvd3MgSW52YWxpZFRpbWV6b25lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRUaW1lem9uZUlzVmFsaWQoIHRpbWV6b25lICkge1xuXHRpZiAoICEgdmFsaWRhdGVUaW1lem9uZSggdGltZXpvbmUgKSApIHtcblx0XHR0aHJvdyBuZXcgSW52YWxpZFRpbWV6b25lKCB0aW1lem9uZSApO1xuXHR9XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIHRoZSBqYXZhc2NyaXB0IERhdGVcbiAqIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhlIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSXNEYXRlKCBkYXRlICkge1xuXHRyZXR1cm4gZGF0ZSBpbnN0YW5jZW9mIERhdGU7XG59XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydElzRGF0ZSggZGF0ZSApIHtcblx0aWYgKCAhIHZhbGlkYXRlSXNEYXRlKCBkYXRlICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuIGluc3RhbmNlIG9mIERhdGUnXG5cdFx0KTtcblx0fVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIG9mZnNldFxuICpcbiAqIEN1cnJlbnRseSB0aGlzIGp1c3QgdmFsaWRhdGVzIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIG51bWJlci4gRXZlbnR1YWxseSBpdFxuICogbWlnaHQgY2hlY2sgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gKiBAcmV0dXJuIHtib29sZWFufSAgdHJ1ZSBtZWFucyBpdHMgdmFsaWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUlzT2Zmc2V0KCBvZmZzZXQgKSB7XG5cdHJldHVybiBpc051bWJlciggb2Zmc2V0ICk7XG59XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIG9mZnNldC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0SXNPZmZzZXQoIG9mZnNldCApIHtcblx0aWYgKCAhIHZhbGlkYXRlSXNPZmZzZXQoIG9mZnNldCApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHQnT2Zmc2V0IGlzIGV4cGVjdGVkIHRvIGJlIGEgbnVtYmVyJ1xuXHRcdCk7XG5cdH1cbn1cbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRjYXBpdGFsaXplLFxuXHRvbWl0LFxuXHRpc051bWJlcixcblx0aXNFbXB0eSxcblx0cmVkdWNlLFxuXHRpc09iamVjdCxcblx0aXNVbmRlZmluZWQsXG5cdGlzRnVuY3Rpb24sXG59IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQge1xuXHRJbnZhbGlkRGF0ZVRpbWUsXG5cdEludmFsaWRBcmd1bWVudCxcblx0SW52YWxpZElTTzg2MDFTdHJpbmcsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHsgaW5zdGFuY2VPZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgYXNzZXJ0aW9ucyBmcm9tICcuL2Fzc2VydGlvbnMnO1xuaW1wb3J0IER1cmF0aW9uIGZyb20gJy4vZHVyYXRpb24nO1xuaW1wb3J0IHtcblx0REVGQVVMVF9USU1FWk9ORV9TVFJJTkcsXG5cdERFRkFVTFRfT0ZGU0VULFxuXHRERUZBVUxUX1ZBTElEX0xPQ0FMRSxcblx0REVGQVVMVF9GT1JNQVQsXG59IGZyb20gJy4vZGVmYXVsdHMnO1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBzeW1ib2xzIHVzZWQgZm9yIFwicHJpdmF0ZVwiIHByb3BlcnRpZXMgaW4gdGhlIERhdGVUaW1lIG9iamVjdC5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogXHR7XG4gKiBcdFx0ZGF0ZXRpbWU6IFN5bWJvbFxuICogXHR9XG4gKi9cbmNvbnN0IHByaXZhdGVQcm9wZXJ0aWVzID0ge1xuXHRkYXRldGltZTogU3ltYm9sKCAnRGF0ZVRpbWVQcm9wZXJ0eURhdGVUaW1lJyApLFxufTtcblxuLyoqXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc3ltYm9scyB1c2VkIGZvciBcInByaXZhdGVcIiBtZXRob2RzIGluIHRoZSBEYXRlVGltZSBvYmplY3QuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqIFx0Z2V0VW5pdE5hbWVzOiBTeW1ib2wsXG4gKiBcdGNyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzOiBTeW1ib2wsXG4gKiBcdGV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lczogU3ltYm9sLFxuICogXHRub3JtYWxpemVVbml0TmFtZTogU3ltYm9sLFxuICogXHRub3JtYWxpemVVbml0T2JqZWN0OiBTeW1ib2wsXG4gKiBcdG5vcm1hbGl6ZVVuaXRWYWx1ZTogU3ltYm9sLFxuICogXHR9XG4gKi9cbmNvbnN0IHByaXZhdGVNZXRob2RzID0ge1xuXHRnZXRVbml0TmFtZXM6IFN5bWJvbCggJ0RhdGVUaW1lTWV0aG9kR2V0VW5pdE5hbWVzJyApLFxuXHRjcmVhdGVHZXR0ZXJzQW5kU2V0dGVyczogU3ltYm9sKCAnRGF0ZVRpbWVNZXRob2RDcmVhdGVHZXR0ZXJzQW5kU2V0dGVycycgKSxcblx0ZXh0cmFjdE1vbWVudHNGcm9tRGF0ZVRpbWVzOiBTeW1ib2woICdEYXRlVGltZU1ldGhvZEV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lcycgKSxcblx0bm9ybWFsaXplVW5pdE5hbWU6IFN5bWJvbCggJ0RhdGVUaW1lTWV0aG9kTm9ybWFsaXplVW5pdE5hbWUnICksXG5cdG5vcm1hbGl6ZVVuaXRPYmplY3Q6IFN5bWJvbCggJ0RhdGVUaW1lTWV0aG9kTm9ybWFsaXplVW5pdE9iamVjdCcgKSxcblx0bm9ybWFsaXplVW5pdFZhbHVlOiBTeW1ib2woICdEYXRlVGltZU1ldGhvZE5vcm1hbGl6ZVVuaXRWYWx1ZScgKSxcblx0bm9ybWFsaXplQXJndW1lbnRzOiBTeW1ib2woICdEYXRlVGltZU1ldGhvZE5vcm1hbGl6ZUFyZ3VtZW50cycgKSxcbn07XG5cbmNvbnN0IHZhbGlkRGF0ZVRpbWVVbml0cyA9IFtcblx0J3llYXInLFxuXHQnbW9udGgnLFxuXHQnZGF5Jyxcblx0J2hvdXInLFxuXHQnbWludXRlJyxcblx0J3NlY29uZCcsXG5cdCdtaWxsaXNlY29uZCcsXG5dO1xuXG4vKipcbiAqIFRoZSBEYXRlVGltZSB2YWx1ZSBvYmplY3QgcmVwcmVzZW50cyBhIHNpbmdsZSBwb2ludCBpbiB0aW1lLlxuICpcbiAqIEludGVybmFsbHksIHRoZSBEYXRlVGltZSBjbGFzcyBoZXJlIHVzZXMgYG1vbWVudGAuICBUaGlzIGlzIGFuIGFic3RyYWN0aW9uXG4gKiBsb29zZWx5IGZvbGxvd2luZyB0aGUgYWRhcHRlciBwYXR0ZXJuIHNvIHRoYXQgdGhlcmUgaXMgYSBjb21tb24gYXBpIHRoYXRcbiAqIGNhbiBiZSBkZXBlbmRlZCBvbiBpZiBpbiB0aGUgZnV0dXJlIHRoZSBpbnRlcm5hbCBsaWJyYXJ5IGlzIHN3aXRjaGVkIHRvXG4gKiBzb21ldGhpbmcgZGlmZmVyZW50IChzdWNoIGFzIEx1eG9uKS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZVRpbWUge1xuXHQvKipcblx0ICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgRGF0ZVRpbWUgY2xhc3Ncblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlzbzg2MDFEYXRlU3RyaW5nXG5cdCAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IHRpbWV6b25lIElmIG51bGwsIHRoZW4gdGltZXpvbmUgaXMgbm90IHNldC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKi9cblx0Y29uc3RydWN0b3IoXG5cdFx0aXNvODYwMURhdGVTdHJpbmcgPSAnJyxcblx0XHR0aW1lem9uZSA9IERFRkFVTFRfVElNRVpPTkVfU1RSSU5HLFxuXHRcdGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFXG5cdCkge1xuXHRcdGlmICggaXNvODYwMURhdGVTdHJpbmcgIT09ICcnICkge1xuXHRcdFx0dGhpcy5jb25zdHJ1Y3Rvci5hc3NlcnRJU084NjAxSXNWYWxpZCggaXNvODYwMURhdGVTdHJpbmcgKTtcblx0XHR9XG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0XHRpZiAoIHRpbWV6b25lID09PSBudWxsICkge1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXSA9IGlzbzg2MDFEYXRlU3RyaW5nID09PSAnJyA/XG5cdFx0XHRcdG1vbWVudC51dGMoKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdFx0bW9tZW50KCBpc284NjAxRGF0ZVN0cmluZyApXG5cdFx0XHRcdFx0LnV0Y09mZnNldCggaXNvODYwMURhdGVTdHJpbmcgKVxuXHRcdFx0XHRcdC5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdH0gZWxzZSBpZiAoIHRpbWV6b25lID09PSB0aGlzLmNvbnN0cnVjdG9yLlRJTUVaT05FX0xPQ0FMICkge1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXSA9IGlzbzg2MDFEYXRlU3RyaW5nID09PSAnJyA/XG5cdFx0XHRcdG1vbWVudCgpLmxvY2FsZSggbG9jYWxlICkgOlxuXHRcdFx0XHRtb21lbnQoIGlzbzg2MDFEYXRlU3RyaW5nICkubG9jYWxlKCBsb2NhbGUgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jb25zdHJ1Y3Rvci5hc3NlcnRUaW1lem9uZUlzVmFsaWQoIHRpbWV6b25lICk7XG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdID0gaXNvODYwMURhdGVTdHJpbmcgPT09ICcnID9cblx0XHRcdFx0bW9tZW50KCkudHooIHRpbWV6b25lICkubG9jYWxlKCBsb2NhbGUgKSA6XG5cdFx0XHRcdG1vbWVudC50eihcblx0XHRcdFx0XHRpc284NjAxRGF0ZVN0cmluZyxcblx0XHRcdFx0XHR0aW1lem9uZVxuXHRcdFx0XHQpLmxvY2FsZSggbG9jYWxlICk7XG5cdFx0fVxuXHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmNyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzIF0oKTtcblx0XHRPYmplY3QuZnJlZXplKCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoZSBnaXZlbiBsb2NhbGUgaXMgYSB2YWxpZCBsb2NhbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBtZWFucyBpdCBpcyB2YWxpZFxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlTG9jYWxlKCBsb2NhbGUgKSB7XG5cdFx0cmV0dXJuIGFzc2VydGlvbnMudmFsaWRhdGVMb2NhbGUoIGxvY2FsZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgaWYgdGhlIGdpdmVuIGxvY2FsZSBpcyB2YWxpZCBhbmQgdGhyb3dzIGFuIGVycm9yIGlmIG5vdC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAdGhyb3dzIEludmFsaWRMb2NhbGVcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhlIGdpdmVuIElTTzg2MDEgc3RyaW5nIGlzIHZhbGlkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRpbWVTdHJpbmdcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBtZWFucyBpdCBpcyB2YWxpZC5cblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUlTTzg2MDEoIGRhdGVUaW1lU3RyaW5nICkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlSVNPODYwMSggZGF0ZVRpbWVTdHJpbmcgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIGlmIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCBJU08gODYwMSBzdHJpbmcuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVGltZVN0cmluZ1xuXHQgKiBAdGhyb3dzIEludmFsaWRJU084NjAxU3RyaW5nXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SVNPODYwMUlzVmFsaWQoIGRhdGVUaW1lU3RyaW5nICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SVNPODYwMUlzVmFsaWQoIGRhdGVUaW1lU3RyaW5nICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCB0aW1lem9uZVxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBtZWFucyBpdCBpcyB2YWxpZC5cblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZVRpbWV6b25lKCB0aW1lem9uZSApIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZVRpbWV6b25lKCB0aW1lem9uZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gc3RyaW5nIGlzIGEgdmFsaWQgdGltZXpvbmUgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcblx0ICogQHRocm93cyBJbnZhbGlkVGltZXpvbmVcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRUaW1lem9uZUlzVmFsaWQoIHRpbWV6b25lICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0VGltZXpvbmVJc1ZhbGlkKCB0aW1lem9uZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIG9mZnNldFxuXHQgKlxuXHQgKiBDdXJyZW50bHkgdGhpcyBqdXN0IHZhbGlkYXRlcyB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSBudW1iZXIuIEV2ZW50dWFsbHkgaXRcblx0ICogbWlnaHQgY2hlY2sgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgdHJ1ZSBtZWFucyBpdHMgdmFsaWQuXG5cdCAqL1xuXHRzdGF0aWMgdmFsaWRhdGVJc09mZnNldCggb2Zmc2V0ICkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlSXNPZmZzZXQoIG9mZnNldCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSB2YWxpZCBvZmZzZXQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc09mZnNldCggb2Zmc2V0ICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SXNPZmZzZXQoIG9mZnNldCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBkYXRldGltZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSByZXR1cm5zIHRydWUgaWYgaXQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUlzRGF0ZVRpbWUoIGRhdGV0aW1lICkge1xuXHRcdHJldHVybiBpbnN0YW5jZU9mKCBkYXRldGltZSwgJ0RhdGVUaW1lJyApIHx8XG5cdFx0XHRpbnN0YW5jZU9mKCBkYXRldGltZSwgJ1NlcnZlckRhdGVUaW1lJyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICpcblx0ICogQHBhcmFtIHtEYXRlVGltZX0gZGF0ZXRpbWVcblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc0RhdGVUaW1lKCBkYXRldGltZSApIHtcblx0XHRpZiAoICEgdGhpcy52YWxpZGF0ZUlzRGF0ZVRpbWUoIGRhdGV0aW1lICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZSdcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgamF2YXNjcmlwdCBEYXRlXG5cdCAqIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhlIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVcblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUlzRGF0ZSggZGF0ZSApIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZUlzRGF0ZSggZGF0ZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNEYXRlKCBkYXRlICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SXNEYXRlKCBkYXRlICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lIGFuZCBpc1xuXHQgKiBhIFwidmFsaWRcIiBkYXRldGltZSAobWVhbmluZyB0aGUgaW5zdGFuY2Ugd2FzIGNvbnN0cnVjdGVkIHdpdGggdmFsaWRcblx0ICogYXJndW1lbnRzKS5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlVGltZX0gZGF0ZXRpbWVcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBtZWFucyBpdCBpcyB2YWxpZC5cblx0ICovXG5cdHN0YXRpYyBpc1ZhbGlkKCBkYXRldGltZSApIHtcblx0XHRyZXR1cm4gdGhpcy52YWxpZGF0ZUlzRGF0ZVRpbWUoIGRhdGV0aW1lICkgJiYgZGF0ZXRpbWUuaXNWYWxpZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWUgYW5kIGlzXG5cdCAqIGEgXCJ2YWxpZFwiIGRhdGV0aW1lIChtZWFuaW5nIHRoZSBpbnN0YW5jZSB3YXMgY29uc3RydWN0ZWQgd2l0aCB2YWxpZFxuXHQgKiBhcmd1bWVudHMpXG5cdCAqXG5cdCAqIEBwYXJhbSB7RGF0ZVRpbWV9IGRhdGV0aW1lXG5cdCAqIEB0aHJvd3MgSW52YWxpZERhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNWYWxpZCggZGF0ZXRpbWUgKSB7XG5cdFx0aWYgKCAhIHRoaXMuaXNWYWxpZCggZGF0ZXRpbWUgKSApIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkRGF0ZVRpbWUoIGRhdGV0aW1lICk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIFsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplQXJndW1lbnRzIF0oIGRhdGVWYWx1ZSwgdGltZXpvbmUsIGxvY2FsZSApIHtcblx0XHRyZXR1cm4gdGhpcy5uYW1lID09PSAnU2VydmVyRGF0ZVRpbWUnID9cblx0XHRcdFsgZGF0ZVZhbHVlLCBsb2NhbGUsIHRpbWV6b25lIF0gOlxuXHRcdFx0WyBkYXRlVmFsdWUsIHRpbWV6b25lLCBsb2NhbGUgXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHByaXZhdGUgaW50ZXJuYWwgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gZXh0cmFjdCBhbGwgbW9tZW50XG5cdCAqIGluc3RhbmNlcyBmcm9tIHRoZSBwcm92aWRlZCBEYXRlVGltZXMgKHBhc3NlZCBpbiBhcyBhcmd1bWVudHMpLlxuXHQgKlxuXHQgKiBAcGFyYW0gey4uLkRhdGVUaW1lfSBkYXRldGltZXNcblx0ICogQHJldHVybiB7bW9tZW50W119IEFuIGFycmF5IG9mIG1vbWVudCBpbnN0YW5jZXMgZXh0cmFjdGVkIGZyb20gdGhlXG5cdCAqIERhdGVUaW1lc1xuXHQgKi9cblx0c3RhdGljIFsgcHJpdmF0ZU1ldGhvZHMuZXh0cmFjdE1vbWVudHNGcm9tRGF0ZVRpbWVzIF0oIC4uLmRhdGV0aW1lcyApIHtcblx0XHRyZXR1cm4gZGF0ZXRpbWVzLm1hcCggKCBkYXRldGltZSApID0+IHtcblx0XHRcdHRoaXMuYXNzZXJ0SXNEYXRlVGltZSggZGF0ZXRpbWUgKTtcblx0XHRcdHJldHVybiBkYXRldGltZVsgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXTtcblx0XHR9ICk7XG5cdH1cblxuXHQvKipcblx0ICogR2l2ZW4gYW4gaW5kZWZpbml0ZSBudW1iZXIgb2YgRGF0ZVRpbWVzIGFzIGFyZ3VtZW50cywgdGhpcyB3aWxsIHJldHVybiBhXG5cdCAqIG5ldyBEYXRlVGltZSB0aGF0IHJlcHJlc2VudHMgdGhlIGxhdGVzdCBwb2ludCBpbiB0aW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0gey4uLkRhdGVUaW1lfSBkYXRldGltZXNcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEEgbmV3IERhdGVUaW1lIHJlcHJlc2VudGluZyB0aGUgbGF0ZXN0IHBvaW50IG9mIHRpbWUuXG5cdCAqL1xuXHRzdGF0aWMgbWF4KCAuLi5kYXRldGltZXMgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZnJvbU1vbWVudChcblx0XHRcdG1vbWVudC5tYXgoXG5cdFx0XHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lcyBdKFxuXHRcdFx0XHRcdC4uLmRhdGV0aW1lc1xuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHaXZlbiBhbiBpbmRlZmluaXRlIG51bWJlciBvZiBEYXRlVGltZXMgYXMgYXJndW1lbnRzLCB0aGlzIHdpbGwgcmV0dXJuIGFcblx0ICogbmV3IERhdGVUaW1lIHRoYXQgcmVwcmVzZW50cyB0aGUgZWFybGllc3QgcG9pbnQgaW4gdGltZS5cblx0ICpcblx0ICogQHBhcmFtIHsuLi5EYXRlVGltZX0gZGF0ZXRpbWVzXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBIG5ldyBEYXRlVGltZSByZXByZXNlbnRpbmcgdGhlIGVhcmxpZXN0IHBvaW50IGluXG5cdCAqIHRpbWUuXG5cdCAqL1xuXHRzdGF0aWMgbWluKCAuLi5kYXRldGltZXMgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZnJvbU1vbWVudChcblx0XHRcdG1vbWVudC5taW4oXG5cdFx0XHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lcyBdKFxuXHRcdFx0XHRcdC4uLmRhdGV0aW1lc1xuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBpbnN0YW5jZSBvZiBtb21lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bW9tZW50fSBtb21lbnRJbnN0YW5jZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tTW9tZW50KCBtb21lbnRJbnN0YW5jZSApIHtcblx0XHRpZiAoICEgbW9tZW50LmlzTW9tZW50KCBtb21lbnRJbnN0YW5jZSApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ1JlcXVpcmVzIGFuIGluc3RhbmNlIG9mIG1vbWVudC4nICk7XG5cdFx0fVxuXG5cdFx0Ly8gdGhpcyB3b3VsZCBhY2NvdW50IGZvciBjbGllbnQgY29kZSB0aGF0IGlzIHVzaW5nIGBtb21lbnRgIGJ1dCBub3Rcblx0XHQvLyB1c2luZyBgbW9tZW50LXRpbWV6b25lYC5cblx0XHRyZXR1cm4gaXNGdW5jdGlvbiggbW9tZW50SW5zdGFuY2UudHogKSAmJlxuXHRcdFx0ISBpc1VuZGVmaW5lZCggbW9tZW50SW5zdGFuY2UudHooKSApICYmXG5cdFx0XHRtb21lbnRJbnN0YW5jZS50eigpICE9PSAnVVRDJyA/XG5cdFx0XHRuZXcgdGhpcyhcblx0XHRcdFx0Li4udGhpc1sgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplQXJndW1lbnRzIF0oXG5cdFx0XHRcdFx0bW9tZW50SW5zdGFuY2UudG9JU09TdHJpbmcoKSxcblx0XHRcdFx0XHRtb21lbnRJbnN0YW5jZS50eigpLFxuXHRcdFx0XHRcdG1vbWVudEluc3RhbmNlLmxvY2FsZSgpXG5cdFx0XHRcdClcblx0XHRcdCkgOlxuXHRcdFx0bmV3IHRoaXMoXG5cdFx0XHRcdC4uLnRoaXNbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZUFyZ3VtZW50cyBdKFxuXHRcdFx0XHRcdG1vbWVudEluc3RhbmNlLnRvSVNPU3RyaW5nKCB0cnVlICksXG5cdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRtb21lbnRJbnN0YW5jZS5sb2NhbGUoKVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGFuIElTTyA4NjAxIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IElTT1N0cmluZ1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tSVNPKFxuXHRcdElTT1N0cmluZyxcblx0XHR0aW1lem9uZSA9IERFRkFVTFRfVElNRVpPTkVfU1RSSU5HLFxuXHRcdGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFXG5cdCkge1xuXHRcdGlmICggaXNFbXB0eSggSVNPU3RyaW5nICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZElTTzg2MDFTdHJpbmcoIElTT1N0cmluZyApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IHRoaXMoXG5cdFx0XHQuLi50aGlzWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVBcmd1bWVudHMgXShcblx0XHRcdFx0SVNPU3RyaW5nLFxuXHRcdFx0XHR0aW1lem9uZSxcblx0XHRcdFx0bG9jYWxlXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBJU08gODYwMSBTdHJpbmdcblx0ICogRGlmZmVycyB3aXRoIGBmcm9tSVNPYCBpbiB0aGF0IHRoaXMgYWxsb3dzIHBhc3NpbmcgYSBvZmZzZXQgdmFsdWVcblx0ICogaW5zdGVhZCBvZiBhIHRpbWV6b25lIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IElTT1N0cmluZ1xuXHQgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0ICBJbiBtaW51dGVzIHVubGVzcyA+IC0xNiBvciA8IC0xNiBpbiB3aGljaCBjYXNlIGl0XG5cdCAqIGlzIHRyZWF0ZWQgYXMgaG91cnMuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9ICBBbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGZyb21JU09XaXRoT2Zmc2V0KFxuXHRcdElTT1N0cmluZyxcblx0XHRvZmZzZXQgPSBERUZBVUxUX09GRlNFVCxcblx0XHRsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRVxuXHQpIHtcblx0XHR0aGlzLmFzc2VydElTTzg2MDFJc1ZhbGlkKCBJU09TdHJpbmcgKTtcblx0XHR0aGlzLmFzc2VydElzT2Zmc2V0KCBvZmZzZXQgKTtcblx0XHR0aGlzLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdGNvbnN0IGRhdGV0aW1lID0gbW9tZW50LnV0YyggSVNPU3RyaW5nIClcblx0XHRcdC51dGNPZmZzZXQoIG9mZnNldCwgdHJ1ZSApXG5cdFx0XHQubG9jYWxlKCBsb2NhbGUgKTtcblx0XHRyZXR1cm4gdGhpcy5mcm9tTW9tZW50KCBkYXRldGltZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGEgamF2YXNjcmlwdCBEYXRlIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgZnJvbUpTRGF0ZShcblx0XHRkYXRlLFxuXHRcdHRpbWV6b25lID0gREVGQVVMVF9USU1FWk9ORV9TVFJJTkcsXG5cdFx0bG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEVcblx0KSB7XG5cdFx0dGhpcy5hc3NlcnRJc0RhdGUoIGRhdGUgKTtcblx0XHR0aGlzLmFzc2VydFRpbWV6b25lSXNWYWxpZCggdGltZXpvbmUgKTtcblx0XHR0aGlzLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQoXG5cdFx0XHRtb21lbnQoIGRhdGUgKS50eiggdGltZXpvbmUgKS5sb2NhbGUoIGxvY2FsZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZXRpbWUgZnJvbSBhIGphdmFzY3JpcHQgRGF0ZSBvYmplY3QuXG5cdCAqXG5cdCAqIFRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhpcyBhbmQgZnJvbUpTRGF0ZSBpcyB0aGF0IHRoaXMgY2FuIGJlIHNldCB3aXRoXG5cdCAqIGFuIG9mZnNldCB2cyBhIHRpbWV6b25lIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGZyb21KU0RhdGVXaXRoT2Zmc2V0KFxuXHRcdGRhdGUsXG5cdFx0b2Zmc2V0ID0gREVGQVVMVF9PRkZTRVQsXG5cdFx0bG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEVcblx0KSB7XG5cdFx0dGhpcy5hc3NlcnRJc0RhdGUoIGRhdGUgKTtcblx0XHR0aGlzLmFzc2VydElzT2Zmc2V0KCBvZmZzZXQgKTtcblx0XHR0aGlzLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQoXG5cdFx0XHRtb21lbnQoIGRhdGUgKS51dGNPZmZzZXQoIG9mZnNldCApLmxvY2FsZSggbG9jYWxlIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSAoaW4gVVRDKSB3aXRoIG1pbGxpc2Vjb25kcyBmcm9tIGVwb2NoLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gbWlsbGlzZWNvbmRzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBmcm9tTWlsbGlzZWNvbmRzKCBtaWxsaXNlY29uZHMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0aWYgKCAhIGlzTnVtYmVyKCBtaWxsaXNlY29uZHMgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdQcm92aWRlZCB2YWx1ZSBtdXN0IGJlIGEgbnVtYmVyICcgK1xuXHRcdFx0XHQncmVwcmVzZW50aW5nIG1pbGxpc2Vjb25kcyBmcm9tIHRoZSBlcG9jaCcgKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuZnJvbU1vbWVudChcblx0XHRcdG1vbWVudCggbWlsbGlzZWNvbmRzICkudXRjKCkubG9jYWxlKCBsb2NhbGUgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIGluIFVUQyB3aXRoIHNlY29uZHMgZnJvbSB0aGUgZXBvY2guXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgZnJvbVVuaXgoIHNlY29uZHMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0aWYgKCAhIGlzTnVtYmVyKCBzZWNvbmRzICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnUHJvdmlkZWQgdmFsdWUgbXVzdCBiZSBhIG51bWJlciAnICtcblx0XHRcdFx0J3JlcHJlc2VudGluZyBzZWNvbmRzIGZyb20gdGhlIGVwb2NoJyApO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5mcm9tTW9tZW50KFxuXHRcdFx0bW9tZW50LnVuaXgoIHNlY29uZHMgKS51dGMoKS5sb2NhbGUoIGxvY2FsZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBvYmplY3Qgb2YgdmFsdWVzIGFzc3VtaW5nIGl0cyBpbiBcImxvY2FsXCJcblx0ICogdGltZSAoaWYgcnVuIHZpYSBicm93c2VyIG9yIHNlcnZlciBpZiBydW4gc2VydmVyIHNpZGUpLlxuXHQgKlxuXHQgKiBUaGUgb2JqZWN0IGlzIGV4cGVjdGVkIHRvIGJlIGEgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBpbnN0YW5jZSBpbiB0aW1lOlxuXHQgKiBFZy5cblx0ICogeyB5ZWFyOiAyMDE4LCBtb250aDogMTIsIGRheTogMjUsIGhvdXI6IDAsIG1pbnV0ZTogMTUsIHNlY29uZHM6IDAgfVxuXHQgKlxuXHQgKiBQYXNzIGFuIGVtcHR5IHZhbHVlcyB2YWx1ZSBpZiB5b3Ugd2FudCB0aGUgaW5zdGFuY2UgaW4gdGltZSB0byByZXByZXNlbnRcblx0ICogXCJub3dcIi5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHZhbHVlc1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKiBAdGhyb3dzIEludmFsaWRBcmd1bWVudFxuXHQgKi9cblx0c3RhdGljIGZyb21Mb2NhbCggdmFsdWVzLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSApIHtcblx0XHR0aGlzLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdHZhbHVlcyA9IHRoaXNbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRPYmplY3QgXSggdmFsdWVzICk7XG5cdFx0Y29uc3QgZGF0ZXRpbWUgPSBpc0VtcHR5KCB2YWx1ZXMgKSA/XG5cdFx0XHRtb21lbnQoKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdG1vbWVudCggdmFsdWVzICkubG9jYWxlKCBsb2NhbGUgKTtcblx0XHRpZiAoIGRhdGV0aW1lLmlzVmFsaWQoKSAhPT0gdHJ1ZSApIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnQoXG5cdFx0XHRcdCdEb3VibGUtY2hlY2sgdGhlIHZhbHVlcyB5b3Ugc2VudCBpbi4nLFxuXHRcdFx0XHR2YWx1ZXNcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQoIGRhdGV0aW1lICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIGZyb20gYW4gb2JqZWN0IG9mIHZhbHVlcyBhbmQgYXNzdW1lcyBpdHMgaW5cblx0ICogJ1VUQycuXG5cdCAqXG5cdCAqIFRoZSBvYmplY3QgaXMgZXhwZWN0ZWQgdG8gYmUgYSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGluc3RhbmNlIGluIHRpbWU6XG5cdCAqIEVnLlxuXHQgKiB7IHllYXI6IDIwMTgsIG1vbnRoOiAxMiwgZGF5OiAyNSwgaG91cjogMCwgbWludXRlOiAxNSwgc2Vjb25kczogMCB9XG5cdCAqXG5cdCAqIEFueSB1bml0cyBub3Qgc3BlY2lmaWVkIHdpbGwgYmUgYXNzdW1lZCB0byBiZSBgMGAuXG5cdCAqXG5cdCAqIFBhc3MgYW4gZW1wdHkgdmFsdWVzIHZhbHVlIGlmIHlvdSB3YW50IHRoZSBpbnN0YW5jZSBpbiB0aW1lIHRvIHJlcHJlc2VudFxuXHQgKiBcIm5vd1wiLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEB0aHJvd3MgSW52YWxpZEFyZ3VtZW50XG5cdCAqL1xuXHRzdGF0aWMgdXRjKCB2YWx1ZXMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0dmFsdWVzID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE9iamVjdCBdKCB2YWx1ZXMgKTtcblx0XHRjb25zdCBkYXRldGltZSA9IGlzRW1wdHkoIHZhbHVlcyApID9cblx0XHRcdG1vbWVudC51dGMoKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdG1vbWVudC51dGMoIHZhbHVlcyApLmxvY2FsZSggbG9jYWxlICk7XG5cdFx0aWYgKCBkYXRldGltZS5pc1ZhbGlkKCkgIT09IHRydWUgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50KFxuXHRcdFx0XHQnRG91YmxlLWNoZWNrIHRoZSB2YWx1ZXMgc2VudCBpbi4nLFxuXHRcdFx0XHR2YWx1ZXNcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQoIGRhdGV0aW1lICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIGZyb20gYSBjb25maWd1cmF0aW9uIG9iamVjdC5cblx0ICpcblx0ICogVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGNhbiBoYXZlOlxuXHQgKiAtIGFueSBvZiB0aGUgRGF0ZVRpbWUgdW5pdHMgKCd5ZWFyJywgJ21vbnRoJywgZXRjKVxuXHQgKiAtICdsb2NhbGUnIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbG9jYWxlXG5cdCAqIC0gJ3RpbWV6b25lJyBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHRpbWV6b25lXG5cdCAqIC0gJ29mZnNldCcgYSBudW1iZXIgcmVwcmVzZW50aW5nIHRoZSBvZmZzZXQgZnJvbSBVVEMgdGhpcyBpbnN0YW5jZSBpblxuXHQgKiB0aW1lIHJlcHJlc2VudHMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXNcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgZnJvbU9iamVjdCggdmFsdWVzICkge1xuXHRcdGNvbnN0IGxvY2FsZSA9IHZhbHVlcy5sb2NhbGUgfHwgREVGQVVMVF9WQUxJRF9MT0NBTEU7XG5cdFx0Y29uc3QgdGltZXpvbmUgPSB2YWx1ZXMudGltZXpvbmUgfHwgREVGQVVMVF9USU1FWk9ORV9TVFJJTkc7XG5cdFx0Y29uc3Qgb2Zmc2V0ID0gaXNVbmRlZmluZWQoIHZhbHVlcy5vZmZzZXQgKSA/XG5cdFx0XHRudWxsIDpcblx0XHRcdHZhbHVlcy5vZmZzZXQ7XG5cdFx0bGV0IHZhbHVlc0ZvckNvbnN0cnVjdCA9IG9taXQoXG5cdFx0XHR2YWx1ZXMsXG5cdFx0XHRbICdsb2NhbGUnLCAndGltZXpvbmUnLCAnb2Zmc2V0JyBdXG5cdFx0KTtcblxuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cblx0XHRpZiAoIG9mZnNldCAhPT0gbnVsbCApIHtcblx0XHRcdHRoaXMuYXNzZXJ0SXNPZmZzZXQoIG9mZnNldCApO1xuXHRcdFx0dmFsdWVzRm9yQ29uc3RydWN0ID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE9iamVjdCBdKFxuXHRcdFx0XHR2YWx1ZXNGb3JDb25zdHJ1Y3Rcblx0XHRcdCk7XG5cdFx0XHRjb25zdCBkYXRldGltZSA9IGlzRW1wdHkoIHZhbHVlc0ZvckNvbnN0cnVjdCApID9cblx0XHRcdFx0bW9tZW50KCkudXRjT2Zmc2V0KCBvZmZzZXQsIHRydWUgKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdFx0bW9tZW50LnV0YyggdmFsdWVzRm9yQ29uc3RydWN0IClcblx0XHRcdFx0XHQudXRjT2Zmc2V0KCBvZmZzZXQsIHRydWUgKVxuXHRcdFx0XHRcdC5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdFx0aWYgKCBkYXRldGltZS5pc1ZhbGlkKCkgIT09IHRydWUgKSB7XG5cdFx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnQoXG5cdFx0XHRcdFx0J0RvdWJsZS1jaGVjayB0aGUgY29uZmlndXJhdGlvbiBvYmplY3Qgc2VudCBpbi4nLFxuXHRcdFx0XHRcdHZhbHVlc1xuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMuZnJvbU1vbWVudCggZGF0ZXRpbWUgKTtcblx0XHR9XG5cblx0XHRpZiAoIHRpbWV6b25lID09PSB0aGlzLlRJTUVaT05FX0xPQ0FMICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZnJvbUxvY2FsKCB2YWx1ZXNGb3JDb25zdHJ1Y3QsIGxvY2FsZSApO1xuXHRcdH1cblxuXHRcdHRoaXMuYXNzZXJ0VGltZXpvbmVJc1ZhbGlkKCB0aW1lem9uZSApO1xuXG5cdFx0dmFsdWVzRm9yQ29uc3RydWN0ID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE9iamVjdCBdKFxuXHRcdFx0dmFsdWVzRm9yQ29uc3RydWN0XG5cdFx0KTtcblx0XHRjb25zdCBkYXRldGltZSA9IG1vbWVudC50eiggdmFsdWVzRm9yQ29uc3RydWN0LCB0aW1lem9uZSApXG5cdFx0XHQubG9jYWxlKCBsb2NhbGUgKTtcblx0XHRpZiAoIGRhdGV0aW1lLmlzVmFsaWQoKSAhPT0gdHJ1ZSApIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnQoXG5cdFx0XHRcdCdEb3VibGUtY2hlY2sgdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNlbnQgaW4uJyxcblx0XHRcdFx0dmFsdWVzXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5mcm9tTW9tZW50KCBkYXRldGltZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vbWVudCB1c2VzIGRpZmZlcmVudCBuYW1lcyBmb3Igc29tZSB1bml0IGdldHRlcnMvc2V0dGVycy9wcm9wZXJ0aWVzIHNvXG5cdCAqIHRoaXMgaXMgdXNlZCB0byBub3JtYWxpemUgYSBnaXZlbiB1bml0IG5hbWUgdG8gd2hhdCBtb21lbnQgdXNlcy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWVUb05vcm1hbGl6ZVxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9ICBOb3JtYWxpemVkIHVuaXQgbmFtZS5cblx0ICovXG5cdHN0YXRpYyBbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXROYW1lIF0oIG5hbWVUb05vcm1hbGl6ZSApIHtcblx0XHRjb25zdCBtYXAgPSB7XG5cdFx0XHRkYXk6ICdkYXRlJyxcblx0XHRcdGRheXM6ICdkYXknLFxuXHRcdFx0ZGF0ZTogJ2RheScsXG5cdFx0XHR5ZWFyczogJ3llYXInLFxuXHRcdFx0bW9udGhzOiAnbW9udGgnLFxuXHRcdFx0bWlsbGlzZWNvbmRzOiAnbWlsbGlzZWNvbmQnLFxuXHRcdFx0bWludXRlczogJ21pbnV0ZScsXG5cdFx0XHRzZWNvbmRzOiAnc2Vjb25kJyxcblx0XHRcdGhvdXJzOiAnaG91cicsXG5cdFx0fTtcblx0XHRyZXR1cm4gbWFwWyBuYW1lVG9Ob3JtYWxpemUgXSA/XG5cdFx0XHRtYXBbIG5hbWVUb05vcm1hbGl6ZSBdIDpcblx0XHRcdG5hbWVUb05vcm1hbGl6ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIG5vcm1hbGl6aW5nIHVuaXQgdmFsdWVzIGZvciBpbnRlcm5hbCBsaWJyYXJ5IHVzZS5cblx0ICpcblx0ICogRm9yIGV4YW1wbGUsIG1vbWVudCB6ZXJvIGluZGV4ZXMgbW9udGhzLiBEYXRlVGltZSBkb2VzIG5vdCwgc28gdGhpc1xuXHQgKiBtZXRob2QgaGVscHMgd2l0aCBub3JtYWxpemluZyBtb250aCB2YWx1ZXMgZm9yIGJvdGggc2V0dGluZyAodXNlZCBieVxuXHQgKiBtb21lbnQpIGFuZCBnZXR0aW5nIChyZXR1cm5lZCB0byBjbGllbnQpLiAgVGhpcyBhbGxvd3MgY2xpZW50IGNvZGVcblx0ICogdG8gZXhwZWN0IG1vbnRocyBpbiBEYXRlVGltZSB0byBiZSBoYW5kbGVkIHdpdGggYSBub24temVybyBpbmRleC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHVuaXQgVGhlIHVuaXQgdG8gYmUgbm9ybWFsaXplZFxuXHQgKiBAcGFyYW0ge21peGVkfSAgdmFsdWUgVGhlIHZhbHVlIGZvciB0aGF0IHVuaXRcblx0ICogQHBhcmFtIHtib29sZWFufSBzZXQgIFdoZXRoZXIgdGhpcyBzaG91bGQgbm9ybWFsaXplIGZvciBzZXR0aW5nIG9yXG5cdCAqIGdldHRpbmcuXG5cdCAqIEByZXR1cm4ge21peGVkfSAgVGhlIG5vcm1hbGl6ZWQgdmFsdWUuXG5cdCAqL1xuXHRzdGF0aWMgWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0VmFsdWUgXSggdW5pdCwgdmFsdWUsIHNldCA9IHRydWUgKSB7XG5cdFx0aWYgKCB1bml0ID09PSAnbW9udGgnICkge1xuXHRcdFx0dmFsdWUgPSBzZXQgPyB2YWx1ZSAtIDEgOiB2YWx1ZSArIDE7XG5cdFx0fVxuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHaXZlbiBhIHNpbXBsZSBvYmplY3QgY29udGFpbmluZyB1bml0cywgdGhpcyBub3JtYWxpemVzIHRoZSBvYmplY3QgdG9cblx0ICogd2hhdCBtb21lbnQgcmVjb2duaXplcy5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHNldE9iamVjdFxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNldCAgdHJ1ZSBpZiBzZXR0aW5nIHRoZSBvYmplY3QsIGZhbHNlIGlmIGdldHRpbmcgdGhlXG5cdCAqIG9iamVjdFxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBub3JtYWxpemVkIG9iamVjdC5cblx0ICovXG5cdHN0YXRpYyBbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRPYmplY3QgXSggc2V0T2JqZWN0LCBzZXQgPSB0cnVlICkge1xuXHRcdGlmICggISBpc09iamVjdCggc2V0T2JqZWN0ICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGluY29taW5nIHZhbHVlIG11c3QgYmUgYW4gb2JqZWN0J1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlZHVjZSggc2V0T2JqZWN0LCAoIHJlc3VsdCwgdmFsdWUsIGtleSApID0+IHtcblx0XHRcdGtleSA9IHRoaXNbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXROYW1lIF0oIGtleSApO1xuXHRcdFx0cmVzdWx0WyBrZXkgXSA9IHRoaXNbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRWYWx1ZSBdKFxuXHRcdFx0XHRrZXksXG5cdFx0XHRcdHZhbHVlLFxuXHRcdFx0XHRzZXRcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sIHt9ICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgZGF0ZSBhbmQgdGltZSB1bml0IG5hbWVzXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ1tdfSBBbiBhcnJheSBvZiB1bml0IG5hbWVzXG5cdCAqL1xuXHRbIHByaXZhdGVNZXRob2RzLmdldFVuaXROYW1lcyBdKCkge1xuXHRcdHJldHVybiB2YWxpZERhdGVUaW1lVW5pdHM7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyB0aGUgdmFyaW91cyBnZXR0ZXIgYW5kIHNldHRlcnMgZm9yIHRoZSB2YWx1ZSBvYmplY3QuXG5cdCAqL1xuXHRbIHByaXZhdGVNZXRob2RzLmNyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzIF0oKSB7XG5cdFx0dGhpc1sgcHJpdmF0ZU1ldGhvZHMuZ2V0VW5pdE5hbWVzIF0oKS5mb3JFYWNoKFxuXHRcdFx0KCB1bml0TmFtZSApID0+IHtcblx0XHRcdFx0Ly8gY3JlYXRlcyBhY2Nlc3NvciBmb3IgZ2V0dGluZyB0aGUgdW5pdCB2YWx1ZSB2aWEgYVxuXHRcdFx0XHQvLyBwcm9wZXJ0eSAoZWcuIGluc3RhbmNlLmhvdXIpXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggdGhpcywgdW5pdE5hbWUsIHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtZXRob2ROYW1lID0gdGhpcy5jb25zdHJ1Y3RvclsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE5hbWUgXSggdW5pdE5hbWUgKTtcblx0XHRcdFx0XHRcdGNvbnN0IHVuaXRWYWx1ZSA9IHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdFx0XHRcdFx0WyBtZXRob2ROYW1lIF0oKTtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0VmFsdWUgXShcblx0XHRcdFx0XHRcdFx0dW5pdE5hbWUsXG5cdFx0XHRcdFx0XHRcdHVuaXRWYWx1ZSxcblx0XHRcdFx0XHRcdFx0ZmFsc2Vcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSApO1xuXHRcdFx0XHQvLyBjcmVhdGVzIGEgZmx1ZW50IHNldHRlciBmb3IgdGhlIHZhbHVlLlxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHRoaXMsICdzZXQnICsgY2FwaXRhbGl6ZSggdW5pdE5hbWUgKSwge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAoIHZhbHVlICkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zZXQoIHsgWyB1bml0TmFtZSBdOiB2YWx1ZSB9ICk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVzZWQgdG8gc2V0IHZhcmlvdXMgcGFydHMgb2YgdGhlIGRhdGV0aW1lIHN0cmluZyBhbmQgcmV0dXJucyBhIE5FV1xuXHQgKiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKlxuXHQgKiBOb3RlOiB0aGlzIHdpbGwgY29uc3RydWN0IGEgRGF0ZVRpbWUgZXZlbiB3aXRoIGludmFsaWQgdW5pdHMuIE1ha2UgdXNlIG9mXG5cdCAqIGBpc1ZhbGlkKClgIHRvIGRldGVybWluZSB3aGV0aGVyIHRoZSBpbnN0YW5jZSBpcyBhIHZhbGlkIERhdGVUaW1lIG9yIG5vdC5cblx0ICpcblx0ICogQHBhcmFtIHt7fX0gc2V0T2JqZWN0IEFuIG9iamVjdCB3aGVyZSBrZXlzIGFyZSB0aGUgdW5pdHMuXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZS5cblx0ICovXG5cdHNldCggc2V0T2JqZWN0ID0ge30gKSB7XG5cdFx0c2V0T2JqZWN0ID0gdGhpcy5jb25zdHJ1Y3RvclsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE9iamVjdCBdKCBzZXRPYmplY3QgKTtcblx0XHRjb25zdCBpbnN0YW5jZUFyZ3VtZW50cyA9IHRoaXMuY29uc3RydWN0b3JbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZUFyZ3VtZW50cyBdKFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQuc2V0KCBzZXRPYmplY3QgKS50b0lTT1N0cmluZygpLFxuXHRcdFx0dGhpcy50aW1lem9uZSxcblx0XHRcdHRoaXMubG9jYWxlXG5cdFx0KTtcblx0XHRyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IoIC4uLmluc3RhbmNlQXJndW1lbnRzICk7XG5cdH1cblxuXHQvKipcblx0ICogQWNjZXNzb3IgZm9yIHRoZSB0aW1lem9uZSBzdHJpbmcuXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHRpbWV6b25lIHN0cmluZ1xuXHQgKi9cblx0Z2V0IHRpbWV6b25lKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnR6KCk7XG5cdH1cblxuXHQvKipcblx0ICogRmx1ZW50IHNldHRlciBmb3IgdGhlIHRpbWV6b25lIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHNldFRpbWV6b25lKCB0aW1lem9uZSApIHtcblx0XHR0aGlzLmNvbnN0cnVjdG9yLmFzc2VydFRpbWV6b25lSXNWYWxpZCggdGltZXpvbmUgKTtcblx0XHRjb25zdCBpbnN0YW5jZUFyZ3VtZW50cyA9IHRoaXMuY29uc3RydWN0b3JbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZUFyZ3VtZW50cyBdKFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS50b0lTT1N0cmluZygpLFxuXHRcdFx0dGltZXpvbmUsXG5cdFx0XHR0aGlzLmxvY2FsZVxuXHRcdCk7XG5cdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKCAuLi5pbnN0YW5jZUFyZ3VtZW50cyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGZvciB0aGUgbW9udGggc2V0IGluIHRoaXMgaW5zdGFuY2UuXG5cdCAqXG5cdCAqIEByZXR1cm4ge251bWJlcn0gIFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbW9udGguXG5cdCAqL1xuXHRnZXQgZGF5c0luTW9udGgoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uZGF5c0luTW9udGgoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IGluc3RhbmNlIGluIHRpbWUgaXMgY3VycmVudGx5IGluIERheWxpZ2h0IFNhdmluZ3Ncblx0ICogVGltZS5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyBpdCBpcyBjdXJyZW50bHkgaW4gRGF5bGlnaHQgU2F2aW5ncyBUaW1lLlxuXHQgKi9cblx0Z2V0IGlzSW5EU1QoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uaXNEU1QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IGluc3RhbmNlIGluIHRpbWUgaXMgY3VycmVudGx5IGluIGEgbGVhcCB5ZWFyLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoaXMgZGF0ZSB0aW1lIGlzIGluIGEgbGVhcCB5ZWFyLlxuXHQgKi9cblx0Z2V0IGlzSW5MZWFwWWVhcigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5pc0xlYXBZZWFyKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgb2Zmc2V0IGZyb20gVVRDIGZvciB0aGUgY3VycmVudCBpbnN0YW5jZSBpbiB0aW1lIChpbiBtaW51dGVzKS5cblx0ICpcblx0ICogQHJldHVybiB7bnVtYmVyfSAgVGhlIG9mZnNldCBpcyBpbiBtaW51dGVzXG5cdCAqL1xuXHRnZXQgb2Zmc2V0KCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnV0Y09mZnNldCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZmx1ZW50IHNldHRlciBmb3IgdGhlIFVUQyBvZmZzZXQuXG5cdCAqXG5cdCAqIFRoZSBvZmZzZXQgcHJvdmlkZWQgZGVmYXVsdHMgdG8gZXhwZWN0aW5nIGluIG1pbnV0ZXMuICBIb3dldmVyIGlmIHRoZVxuXHQgKiBpbnB1dCBpcyBsZXNzIHRoYW4gMTYgYW5kIGdyZWF0ZXIgdGhhbiAtMTYsIGl0IHdpbGwgaW50ZXJwcmV0IHRoZSBpbnB1dFxuXHQgKiBhcyBob3VycyBpbnN0ZWFkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSByZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzZXRPZmZzZXQoIG9mZnNldCApIHtcblx0XHR0aGlzLmNvbnN0cnVjdG9yLmFzc2VydElzT2Zmc2V0KCBvZmZzZXQgKTtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5mcm9tTW9tZW50KFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5jbG9uZSgpLnV0Y09mZnNldCggb2Zmc2V0IClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV4cG9zZXMgdGhlIGRheSBvZiB0aGUgeWVhciBmb3IgdGhlIGRhdGUgYW5kIHRpbWUgaW4gdGhlIG9iamVjdC5cblx0ICpcblx0ICpcblx0ICogQHJldHVybiB7bnVtYmVyfSBBIG51bWJlciBiZXR3ZWVuIDEgYW5kIDM2NiAoZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlXG5cdCAqIGludGVybmFsIGRhdGUgYW5kIHRpbWUgaXMgaW4gYSBsZWFwIHllYXIgb3Igbm90KS5cblx0ICovXG5cdGdldCBkYXlPZlllYXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uZGF5T2ZZZWFyKCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgcXVhcnRlciBmb3IgdGhlIGRhdGUgYW5kIHRpbWUgaW4gdGhlIG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiB7bnVtYmVyfSBBIG51bWJlciBiZXR3ZWVuIDEgYW5kIDRcblx0ICovXG5cdGdldCBxdWFydGVyKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnF1YXJ0ZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBJU08gbnVtYmVyIG9mIHRoZSB3ZWVrIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpbiB0aGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAbGluayBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG5cdCAqIEByZXR1cm4ge251bWJlcn0gV2lsbCBiZSBhIG51bWJlciBiZXR3ZWVuIDEgYW5kIDUyaXNoXG5cdCAqL1xuXHRnZXQgaXNvV2Vla051bWJlcigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5pc29XZWVrKCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgSVNPIG51bWJlciBmb3IgdGhlIHdlZWsgeWVhciBmb3IgdGhlIGRhdGUgYW5kIHRpbWUgaW4gdGhlXG5cdCAqIG9iamVjdC5cblx0ICpcblx0ICogQGxpbmsgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9ICBXaWxsIGJlIGEgbnVtYmVyIHJlcHJlc2VudGluZyBhIHllYXIuXG5cdCAqL1xuXHRnZXQgaXNvV2Vla1llYXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uaXNvV2Vla1llYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBJU08gbnVtYmVyIGZvciB0aGUgZGF5IG9mIHRoZSB3ZWVrIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpblxuXHQgKiB0aGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAbGluayBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG5cdCAqIEByZXR1cm4ge251bWJlcn0gQSBudW1iZXIgYmV0d2VlbiAxIGFuZCA3IChNb25kYXkgaXMgMSBhbmQgU3VuZGF5IGlzIDcpXG5cdCAqL1xuXHRnZXQgaXNvV2Vla0RheSgpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5pc29XZWVrZGF5KCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgbnVtYmVyIG9mIHdlZWtzIGluIHRoaXMgRGF0ZVRpbWUncyB5ZWFyLlxuXHQgKlxuXHQgKiBAbGluayBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG5cdCAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiB3ZWVrcyBpbiB0aGUgSVNPIHllYXIuXG5cdCAqL1xuXHRnZXQgaXNvV2Vla3NJbldlZWtZZWFyKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmlzb1dlZWtzSW5ZZWFyKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB3aGF0IHRoZSBzZXQgbG9jYWxlIGlzIGZvciB0aGlzIERhdGVUaW1lXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gQSBsb2NhbGUgc3RyaW5nXG5cdCAqL1xuXHRnZXQgbG9jYWxlKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmxvY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZmx1ZW50IHNldHRlciBmb3Igc2V0dGluZyB0aGUgbG9jYWxlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBhIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZSBlcXVpdmFsZW50IHRvIHRoaXMgb25lIGJ1dFxuXHQgKiB3aXRoIGRpZmZlcmVudCBsb2NhbGUuXG5cdCAqL1xuXHRzZXRMb2NhbGUoIGxvY2FsZSApIHtcblx0XHR0aGlzLmNvbnN0cnVjdG9yLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdXG5cdFx0XHRcdC5jbG9uZSgpXG5cdFx0XHRcdC5sb2NhbGUoIGxvY2FsZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoaXMgRGF0ZVRpbWUgaW5zdGFuY2UgaXMgdmFsaWQuXG5cdCAqXG5cdCAqIFR5cGljYWxseSBhbiBpbnZhbGlkIHN0YXRlIGlzIGFjaGlldmVkIHdoZW4gdGhlIGludGVybmFsIG1vbWVudCBpc1xuXHQgKiBpbnZhbGlkLiAgVGhpcyBjYW4gaGFwcGVuIHdoZW4gdGhlIG1vbWVudCBpbnN0YW5jZSBpcyBjcmVhdGVkIHdpdGhcblx0ICogaW52YWxpZCBwYXJhbWV0ZXJzLlxuXHQgKlxuXHQgKiBOb3RlOiB3aXRoIG1vbWVudC50aW1lem9uZSAod2hpY2ggaXMgdGhlIGludGVybmFsIGxpYnJhcnkpLFxuXHQgKiBtb21lbnQuaXNWYWxpZCgpIGNvdWxkIHJldHVybiB0cnVlLCBmYWxzZSBvciBhIHN0cmluZyBmb3Igd2h5IGl0J3Ncblx0ICogaW52YWxpZC4gIFRoaXMgaXMgd2h5IGEgc3RyaWN0IGVxdWFsaXR5IGNoZWNrIGlzIGRvbmUgZm9yIHdoZXRoZXIgaXQgaXNcblx0ICogdHJ1ZSBvciBub3QuXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoZSBpbnN0YW5jZSBpcyB2YWxpZC5cblx0ICovXG5cdGlzVmFsaWQoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uaXNWYWxpZCgpID09PSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0d28gRGF0ZVRpbWUgaW5zdGFuY2VzIGFzIGEgRHVyYXRpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7RGF0ZVRpbWV9IG90aGVyRGF0ZVRpbWVcblx0ICogQHJldHVybiB7RHVyYXRpb259IEFuIGluc3RhbmNlIG9mIER1cmF0aW9uIHJlcHJlc2VudGluZyB0aGUgZGlmZmVyZW5jZVxuXHQgKiBiZXR3ZWVuIHRoZSB0d28gRGF0ZVRpbWUgb2JqZWN0cy5cblx0ICovXG5cdGRpZmYoIG90aGVyRGF0ZVRpbWUgKSB7XG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci5hc3NlcnRJc0RhdGVUaW1lKCBvdGhlckRhdGVUaW1lICk7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbihcblx0XHRcdG1vbWVudC5kdXJhdGlvbihcblx0XHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHRcdC5kaWZmKCBvdGhlckRhdGVUaW1lWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdIClcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGlzIERhdGVUaW1lIGFuZCBcIm5vd1wiIGFzIGEgRHVyYXRpb24uXG5cdCAqXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBbiBpbnN0YW5jZSBvZiBEdXJhdGlvbiByZXByZXNlbnRpbmcgdGhlIGRpZmZlcmVuY2Vcblx0ICogYmV0d2VlbiB0aGlzIERhdGVUaW1lIGFuZCBcIm5vd1wiXG5cdCAqL1xuXHRkaWZmTm93KCkge1xuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oXG5cdFx0XHRtb21lbnQuZHVyYXRpb24oXG5cdFx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdFx0XHQuZGlmZiggbW9tZW50KCkgKVxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSB2YWx1ZSBvZiB0aGlzIERhdGVUaW1lIHRvIHRoZSBlbmQgKGkuZS4gdGhlIGxhc3QgbWlsbGlzZWNvbmQpIG9mXG5cdCAqIGEgdW5pdCBvZiB0aW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdW5pdFxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gUmV0dXJucyBhIG5ldyBEYXRlVGltZSBpbnN0YW5jZS5cblx0ICovXG5cdGVuZE9mKCB1bml0ICkge1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmNsb25lKCkuZW5kT2YoIHVuaXQgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgdGhpcyBEYXRlVGltZSB3aXRoIHByb3ZpZGVkIERhdGVUaW1lIGFuZCByZXR1cm5zIHdoZXRoZXIgdGhleVxuXHQgKiBhcmUgZXF1YWwgdG8gZWFjaCBvdGhlci5cblx0ICpcblx0ICogVGhlIHR3byBEYXRlVGltZXMgYXJlIGNvbnNpZGVyZWQgZXF1YWwgaWYgdGhleSByZXByZXNlbnQgdGhlIHNhbWVcblx0ICogbWlsbGlzZWNvbmQsIGhhdmUgdGhlIHNhbWUgem9uZSBhbmQgbG9jYXRpb24sIGFuZCBhcmUgYm90aCB2YWxpZC5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlVGltZX0gb3RoZXJEYXRlVGltZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGV5IGFyZSBlcXVhbFxuXHQgKi9cblx0ZXF1YWxzKCBvdGhlckRhdGVUaW1lICkge1xuXHRcdHRoaXMuY29uc3RydWN0b3IuYXNzZXJ0SXNEYXRlVGltZSggb3RoZXJEYXRlVGltZSApO1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdXG5cdFx0XHQuaXNTYW1lKCBvdGhlckRhdGVUaW1lWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdICk7XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGlzIERhdGVUaW1lIGlzIGluIHRoZSBzYW1lIHVuaXQgb2YgdGltZSBhcyBhbm90aGVyIERhdGVUaW1lXG5cdCAqXG5cdCAqIGVnLiBEYXRlVGltZS5mcm9tTG9jYWwoKS5oYXNTYW1lKCBvdGhlckRULCAnZGF5JyApIC8vfj4gdHJ1ZSBpZiBib3RoIHRoZVxuXHQgKiBzYW1lIGNhbGVuZGFyIGRheS5cblx0ICpcblx0ICogTm90ZTogdGhpcyB3aWxsIG1hdGNoIGFsbCB1bml0cyBlcXVhbCBvciBsYXJnZXIuICBGb3IgZXhhbXBsZSwgcGFzc2luZyBpblxuXHQgKiBgbW9udGhgIHdpbGwgY2hlY2sgYG1vbnRoYCBhbmQgYHllYXJgLiAgU28gaXQncyBub3Qgb25seSBjaGVja2luZyBpZiB0aGVcblx0ICogdHdvIGRhdGVzIHNoYXJlIHRoZSBzYW1lIG1vbnRoLCBidXQgdGhhdCB0aGV5IGFyZSB0aGUgc2FtZSBtb250aCBpbiB0aGVcblx0ICogc2FtZSB5ZWFyLiAgSWYgeW91IHBhc3NlZCBpbiBkYXksIGl0IHdvdWxkIHJldHVybiB3aGV0aGVyIHRoZSBwcm92aWRlZFxuXHQgKiBEYXRlVGltZSBpcyBpbiB0aGUgc2FtZSBkYXksIG1vbnRoIGFuZCB5ZWFyIGFzIHRoaXMgRGF0ZVRpbWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RGF0ZVRpbWV9IG90aGVyRGF0ZVRpbWVcblx0ICogQHBhcmFtIHtzdHJpbmd9IHVuaXRcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhleSBhcmUgYm90aCBpbiB0aGUgc2FtZSB0aW1lIGZvciB0aGVcblx0ICogZ2l2ZW4gdW5pdC5cblx0ICovXG5cdGhhc1NhbWUoIG90aGVyRGF0ZVRpbWUsIHVuaXQgKSB7XG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci5hc3NlcnRJc0RhdGVUaW1lKCBvdGhlckRhdGVUaW1lICk7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdC5pc1NhbWUoIG90aGVyRGF0ZVRpbWVbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0sIHVuaXQgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTdWJ0cmFjdCBhIHBlcmlvZCBvZiB0aW1lIChyZXByZXNlbnRlZCBieSBhIER1cmF0aW9uKSBmcm9tIHRoaXMgRGF0ZVRpbWVcblx0ICogYW5kIHJldHVybiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufSBkdXJhdGlvblxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQSBuZXcgaW5zdGFuY2Ugb2YgRGF0ZVRpbWUgZm9yIHRoZSBuZXcgZGF0ZSBhbmQgdGltZS5cblx0ICovXG5cdG1pbnVzKCBkdXJhdGlvbiApIHtcblx0XHREdXJhdGlvbi5hc3NlcnRJc1ZhbGlkRHVyYXRpb24oIGR1cmF0aW9uICk7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0LnN1YnRyYWN0KCBkdXJhdGlvbi50b09iamVjdCgpIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBhIHBlcmlvZCBvZiB0aW1lIChyZXByZXNlbnRlZCBieSBhIER1cmF0aW9uKSB0byB0aGlzIERhdGVUaW1lIGFuZFxuXHQgKiByZXR1cm4gdGhlIHJlc3VsdGluZyBEYXRlVGltZVxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufSBkdXJhdGlvblxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQSBuZXcgaW5zdGFuY2Ugb2YgRGF0ZVRpbWUgZm9yIHRoZSBuZXcgZGF0ZSBhbmQgdGltZS5cblx0ICovXG5cdHBsdXMoIGR1cmF0aW9uICkge1xuXHRcdER1cmF0aW9uLmFzc2VydElzVmFsaWREdXJhdGlvbiggZHVyYXRpb24gKTtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5mcm9tTW9tZW50KFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQuYWRkKCBkdXJhdGlvbi50b09iamVjdCgpIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgdmFsdWUgb2YgdGhpcyBEYXRlVGltZSB0byB0aGUgYmVnaW5uaW5nIG9mIGEgc3BlY2lmaWVkIHVuaXQgb2Zcblx0ICogdGltZSBhbmQgcmV0dXJuIGEgbmV3IERhdGVUaW1lIHJlcHJlc2VudGluZyB0aGF0LlxuXHQgKlxuXHQgKiBlZy5cblx0ICogc3RhcnRPZiggRGF0ZVRpbWUuVU5JVF9ZRUFSICkgLy9zZXRzIHRvIEphbnVhcnkgMXN0LCAxMjowMGFtIHRoaXNcblx0ICogeWVhci5cblx0ICogc3RhcnRPZiggRGF0ZVRpbWUuVU5JVF9NT05USCApIC8vc2V0cyB0byB0aGUgZmlyc3Qgb2YgdGhpcyBtb250aCwgMTI6MDBhbVxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdW5pdFxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQSBuZXcgaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXJ0T2YoIHVuaXQgKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uY2xvbmUoKS5zdGFydE9mKCB1bml0IClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEYXRlVGltZSBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvXG5cdCAqIHRoZSBzcGVjaWZpZWQgZm9ybWF0IHN0cmluZy5cblx0ICpcblx0ICogQGxpbmsgaHR0cHM6Ly9tb21lbnRqcy5jb20vZG9jcy8jL2Rpc3BsYXlpbmcvZm9ybWF0L1xuXHQgKiBAc2VlIE1vbWVudCBmb3JtYXQgXl4gc2VjdGlvbiBmb3IgdGhlIGF2YWlsYWJsZSBmb3JtYXRzIHRoYXQgY2FuIGJlIHVzZWQuXG5cdCAqXG5cdCAqIEFuIGVtcHR5IGZvcm1hdCB2YWx1ZSB3aWxsIHJldHVybiB0aGUgc3RyaW5nIGZvcm1hdHRlZCBpbiBJU08gODYwMSB3aXRoXG5cdCAqIGFueSBvZmZzZXQgaW5jbHVkZWQuXG5cdCAqXG5cdCAqIFdpdGhvdXQgYW55IGFyZ3VtZW50IHBhc3NlZCwgdGhlIGZvcm1hdCB3aWxsIGJlIHdoYXRldmVyIHN0cmluZyB0aGVcblx0ICogZm9ybWF0IGlzIHNlcnZlciBzaWRlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0XG5cdCAqIEByZXR1cm4ge3N0cmluZ30gIFRoZSBkYXRlIGFuZCB0aW1lIGRpc3BsYXllZCBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVkXG5cdCAqIGZvcm1hdC5cblx0ICovXG5cdHRvRm9ybWF0KCBmb3JtYXQgPSBERUZBVUxUX0ZPUk1BVCApIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5mb3JtYXQoIGZvcm1hdCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEYXRlVGltZSBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvXG5cdCAqIHRoZSBJU08gODYwMSBzdGFuZGFyZC5cblx0ICpcblx0ICogSWYgYGluVVRDYCBpcyB0cnVlIChkZWZhdWx0KSB0aGVuIGB0b0lTT2Agd2lsbCByZXR1cm4gdGhlIElTTyBzdHJpbmcgaW5cblx0ICogVVRDLiBPdGhlcndpc2UgaXQgd2lsbCBpbmNsdWRlIHRoZSBvZmZzZXQgaW5mb3JtYXRpb24gZm9yIHRoZSBpbnRlcm5hbFxuXHQgKiB0aW1lem9uZS9vZmZzZXQgb24gdGhlIG1vbWVudCBpbiB0aW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGluVVRDXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gQW4gSVNPODYwMSBzdHJpbmdcblx0ICovXG5cdHRvSVNPKCBpblVUQyA9IHRydWUgKSB7XG5cdFx0cmV0dXJuIGluVVRDID9cblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0udG9JU09TdHJpbmcoKSA6XG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnRvSVNPU3RyaW5nKCB0cnVlICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgdmFsdWUgZm9yIHRoaXMgRGF0ZVRpbWUgYXMgYSBqYXZhc2NyaXB0IERhdGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtEYXRlfSBBIGphdmFzY3JpcHQgRGF0ZSBpbnN0YW5jZVxuXHQgKi9cblx0dG9KU0RhdGUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0udG9EYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogV2hlbiBzZXJpYWxpemluZyBhbiBvYmplY3QgdG8gSlNPTiwgaWYgdGhlcmUgaXMgYSBEYXRlVGltZSBpbnN0YW5jZSwgaXRcblx0ICogd2lsbCBiZSByZXByZXNlbnRlZCBhcyBhbiBJU084NjAxIHN0cmluZy5cblx0ICpcblx0ICogQHJldHVybiB7c3RyaW5nfSBBbiBJU08gODYwMSBzdHJpbmdcblx0ICovXG5cdHRvSlNPTigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS50b0lTT1N0cmluZygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgRGF0ZVRpbWUgdG8gd2hhdGV2ZXIgdGhlIFwibG9jYWxcIiB0aW1lIGlzLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIERhdGVUaW1lXG5cdCAqL1xuXHR0b0xvY2FsKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmNsb25lKCkubG9jYWwoKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgbWlsbGlzZWNvbmRzIHNpbmNlIHRoZSBVbml4IEVwb2NoIGZvciB0aGUgY3VycmVudCBEYXRlVGltZVxuXHQgKiBpbnN0YW5jZS5cblx0ICpcblx0ICogQHJldHVybiB7bnVtYmVyfSBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIHNpbmNlIFVuaXggRXBvY2hcblx0ICovXG5cdHRvTWlsbGlzKCkge1xuXHRcdHJldHVybiB0aGlzLnZhbHVlT2YoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgc2ltcGxlIG9iamVjdCBjb250YWluaW5nIHllYXIsIG1vbnRoLCBkYXksIGhvdXIsXG5cdCAqIG1pbnV0ZSwgc2Vjb25kLCBhbmQgbWlsbGlzZWNvbmQuXG5cdCAqXG5cdCAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IHdpdGggeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsXG5cdCAqIGFuZCBtaWxsaXNlY29uZC5cblx0ICovXG5cdHRvT2JqZWN0KCkge1xuXHRcdGNvbnN0IGRhdGV0aW1lID0gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS50b09iamVjdCgpO1xuXHRcdHJldHVybiByZWR1Y2UoIGRhdGV0aW1lLCAoIHJlc3VsdCwgdmFsdWUsIGtleSApID0+IHtcblx0XHRcdGtleSA9IHRoaXMuY29uc3RydWN0b3JbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXROYW1lIF0oIGtleSApO1xuXHRcdFx0cmVzdWx0WyBrZXkgXSA9IHRoaXMuY29uc3RydWN0b3JbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRWYWx1ZSBdKFxuXHRcdFx0XHRrZXksXG5cdFx0XHRcdHZhbHVlLFxuXHRcdFx0XHRmYWxzZVxuXHRcdFx0KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSwge30gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyB0aGUgRGF0ZVRpbWUncyB0aW1lem9uZSB0byBVVEMuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0dG9VVEMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uY2xvbmUoKS51dGMoKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBlbmdsaXNoIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lIHdoZW4gdGhlIGluc3RhbmNlIGlzXG5cdCAqIGNvZXJjZWQgdG8gYSBzdHJpbmcgKHNpbWlsYXIgZm9ybWF0IHRvIEpTIGBEYXRlLnRvU3RyaW5nKClgLlxuXHQgKlxuXHQgKiBlZyBgVHVlIERlYyAyNSAyMDE4IDEwOjE1OjAwIEdNVCswMDAwYFxuXHQgKlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IEEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWVcblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnRvU3RyaW5nKCk7XG5cdH1cblxuXHQvKipcblx0ICogV2hlbiBEYXRlVGltZSBpcyBjb2VyY2VkIHRvIG51bWJlciB0aGlzIHdpbGwgZW5zdXJlIGl0cyBkaXNwbGF5ZWQgYXMgdGhlXG5cdCAqIG51bWJlciBvZiBtaWxsaXNlY29uZHMgc2luY2UgdGhlIFVuaXggRXBvY2ggZm9yIHRoZSBjdXJyZW50IERhdGVUaW1lXG5cdCAqXG5cdCAqIEByZXR1cm4ge251bWJlcn0gQW1vdW50IG9mIG1pbGxpc2Vjb25kcyBzaW5jZSB0aGUgVW5peCBFcG9jaFxuXHQgKi9cblx0dmFsdWVPZigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS52YWx1ZU9mKCk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGVzZSBzdGF0aWMgcHJvcGVydGllcyBuZWVkIHRvIGJlIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgY2xhc3MgZGVmaW5pdGlvblxuICogYmVjYXVzZSBvZiBjb21waWxlIGlzc3Vlcy5cbiAqL1xuRGF0ZVRpbWUuVU5JVF9ZRUFSID0gJ3llYXInO1xuRGF0ZVRpbWUuVU5JVF9NT05USCA9ICdtb250aCc7XG5EYXRlVGltZS5VTklUX0RBWSA9ICdkYXknO1xuRGF0ZVRpbWUuVU5JVF9IT1VSID0gJ2hvdXInO1xuRGF0ZVRpbWUuVU5JVF9NSU5VVEUgPSAnbWludXRlJztcbkRhdGVUaW1lLlVOSVRfU0VDT05EID0gJ3NlY29uZCc7XG5EYXRlVGltZS5VTklUX01JTExJU0VDT05EID0gJ21pbGxpc2Vjb25kJztcbkRhdGVUaW1lLlRJTUVaT05FX0xPQ0FMID0gJ2xvY2FsJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRUSU1FWk9ORV9DT05GSUcsXG5cdFNFUlZFUl9MT0NBTEUsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHtcblx0Rk9STUFUX1NJVEVfREFURSxcblx0Rk9STUFUX1NJVEVfVElNRSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaGVscGVycyc7XG5pbXBvcnQgeyB2YWxpZGF0ZUxvY2FsZSB9IGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5cbmltcG9ydCB7IHNuYWtlQ2FzZSB9IGZyb20gJ2xvZGFzaCc7XG4vKipcbiAqIERlZmF1bHQgdGltZXpvbmUgc3RyaW5nIHRvIHVzZS5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9USU1FWk9ORV9TVFJJTkcgPSBUSU1FWk9ORV9DT05GSUcuc3RyaW5nID09PSAnJyA/XG5cdCdVVEMnIDpcblx0VElNRVpPTkVfQ09ORklHLnN0cmluZztcblxuLyoqXG4gKiBEZWZhdWx0IG9mZnNldFxuICpcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX09GRlNFVCA9IFRJTUVaT05FX0NPTkZJRy5vZmZzZXQ7XG5cbi8qKlxuICogV2hldGhlciB0aGVyZSBpcyBhIGRlZmF1bHQgdGltZXpvbmUgc3RyaW5nIHRvIHVzZS5cbiAqIFRoaXMgaGVscHMgd2l0aCBkZXRlcm1pbmluZyB3aGV0aGVyIHRvIHVzZSB0aGUgb2Zmc2V0IG9yIG5vdCBmb3IgY29uc3RydWN0aW5nXG4gKiBEYXRlVGltZSB2YWx1ZSBvYmplY3RzLlxuICpcbiAqIEB0eXBlIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgSEFTX1RJTUVaT05FX1NUUklORyA9IChcblx0REVGQVVMVF9USU1FWk9ORV9TVFJJTkcgIT09ICdVVEMnIHx8XG5cdCEgKCBERUZBVUxUX1RJTUVaT05FX1NUUklORyA9PT0gJ1VUQycgJiYgREVGQVVMVF9PRkZTRVQgIT09IDAgKVxuKTtcblxuLyoqXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfRk9STUFUID0gRk9STUFUX1NJVEVfREFURSArICcgJyArIEZPUk1BVF9TSVRFX1RJTUU7XG5cbi8qKlxuICogRXhwb3NlcyB3aGF0IHRvIHVzZSBmb3IgdGhlIGRlZmF1bHQgbG9jYWxlLlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9DQUxFID0gc25ha2VDYXNlKCBTRVJWRVJfTE9DQUxFLnVzZXIgKTtcblxuLyoqXG4gKiBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgcHJvdmlkZWQgbG9jYWxlIGlzIHZhbGlkLiAgU28gaWYgYERFRkFVTFRfTE9DQUxFYCBpc1xuICogbm90IHZhbGlkIGZvciB0aGlzIGVudmlyb25tZW50LCB0aGVuIGEgZmFsbGJhY2sgb2YgJ2VuJyBsb2NhbGUgaXMgdXNlZC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9WQUxJRF9MT0NBTEUgPSB2YWxpZGF0ZUxvY2FsZSggREVGQVVMVF9MT0NBTEUgKSA/XG5cdERFRkFVTFRfTE9DQUxFIDpcblx0J2VuJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgbW9tZW50RHVyYXRpb25Gb3JtYXRTZXR1cCBmcm9tICdtb21lbnQtZHVyYXRpb24tZm9ybWF0JztcbmltcG9ydCB7IGNhcGl0YWxpemUsIHBpY2ssIGtleXMsIG9taXQsIG1hcFZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgaXNTaGFsbG93RXF1YWwgZnJvbSAnQHdvcmRwcmVzcy9pcy1zaGFsbG93LWVxdWFsJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuaW1wb3J0IHsgaW5zdGFuY2VPZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgYXNzZXJ0aW9ucyBmcm9tICcuL2Fzc2VydGlvbnMnO1xuaW1wb3J0IHtcblx0REVGQVVMVF9WQUxJRF9MT0NBTEUsXG59IGZyb20gJy4vZGVmYXVsdHMnO1xuXG5tb21lbnREdXJhdGlvbkZvcm1hdFNldHVwKCBtb21lbnQgKTtcblxuLyoqXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc3ltYm9scyB1c2VkIGZvciBcInByaXZhdGVcIiBwcm9wZXJ0aWVzIGluIHRoZSBEdXJhdGlvbiBvYmplY3QuXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRkdXJhdGlvbjogU3ltYm9sLFxuICogXHRcdHZhbHVlczogU3ltYm9sLFxuICogXHRcdGlzVmFsaWQ6IFN5bWJvbCxcbiAqIFx0fVxuICogfVxuICovXG5jb25zdCBwcml2YXRlUHJvcGVydGllcyA9IHtcblx0ZHVyYXRpb246IFN5bWJvbCggJ0R1cmF0aW9uUHJpdmF0ZVByb3BlcnRpZXNEdXJhdGlvbicgKSxcblx0ZHVyYXRpb25WYWx1ZXM6IFN5bWJvbCggJ0R1cmF0aW9uUHJpdmF0ZVByb3BlcnRpZXNEdXJhdGlvblZhbHVlcycgKSxcblx0aXNWYWxpZDogU3ltYm9sKCAnRHVyYXRpb25Qcml2YXRlUHJvcGVydGllc0lzVmFsaWQnICksXG59O1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBzeW1ib2xzIHVzZWQgZm9yIFwicHJpdmF0ZVwiIG1ldGhvZHMgaW4gdGhlIER1cmF0aW9uIG9iamVjdC5cbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGNyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzOiBTeW1ib2wsXG4gKiBcdFx0Z2V0QWxsVW5pdE5hbWVzOiBTeW1ib2wsXG4gKiBcdFx0cG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb246IFN5bWJvbCxcbiAqIFx0XHRzZXRWYWx1ZXM6IFN5bWJvbCxcbiAqIFx0ICAgIGZpbHRlclZhbHVlczogU3ltYm9sLFxuICogXHR9XG4gKiB9XG4gKi9cbmNvbnN0IHByaXZhdGVNZXRob2RzID0ge1xuXHRjcmVhdGVHZXR0ZXJzOiBTeW1ib2woICdEdXJhdGlvblByaXZhdGVNZXRob2RzQ3JlYXRlR2V0dGVycycgKSxcblx0Z2V0QWxsVW5pdE5hbWVzOiBTeW1ib2woICdEdXJhdGlvblByaXZhdGVNZXRob2RzR2V0QWxsVW5pdE5hbWVzJyApLFxuXHRwb3B1bGF0ZVZhbHVlc0Zyb21EdXJhdGlvbjogU3ltYm9sKFxuXHRcdCdEdXJhdGlvblByaXZhdGVNZXRob2RzUG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb24nXG5cdCksXG5cdHNldFZhbHVlczogU3ltYm9sKCAnRHVyYXRpb25Qcml2YXRlTWV0aG9kc1NldFZhbHVlcycgKSxcblx0ZmlsdGVyVmFsdWVzOiBTeW1ib2woICdEdXJhdGlvblByaXZhdGVNZXRob2RzRmlsdGVyVmFsdWVzJyApLFxufTtcblxuLyoqXG4gKiBBbiBhcnJheSBvZiB1bml0IG5hbWVzIGZvciBwcm9wZXJ0aWVzIGluIHRoZSBEdXJhdGlvbiBvYmplY3RcbiAqIEB0eXBlIHtzdHJpbmdbXX1cbiAqL1xuY29uc3QgdW5pdE5hbWVzID0gW1xuXHQneWVhcnMnLFxuXHQnbW9udGhzJyxcblx0J2RheXMnLFxuXHQnaG91cnMnLFxuXHQnbWludXRlcycsXG5cdCdzZWNvbmRzJyxcblx0J21pbGxpc2Vjb25kcycsXG5dO1xuXG4vKipcbiAqIEFuIGFycmF5IG9mIGRlcml2YXRpdmUgdW5pdCBuYW1lcy5cbiAqIFRoZXNlIGFyZSBhY2Nlc3NvcnMgdGhhdCBhcmUgZGVyaXZhdGl2ZXMgb2YgYmFzZSB1bml0cy4gIEZvciBpbnN0YW5jZSxcbiAqIFwid2Vla3NcIiBlbmRzIHVwIGJlaW5nIGEgZGVyaXZhdGl2ZSAoY2FsY3VsYXRlZCBmcm9tKSB0aGUgXCJkYXlzXCIgdW5pdC5cbiAqIEB0eXBlIHtzdHJpbmdbXX1cbiAqL1xuY29uc3QgZGVyaXZhdGl2ZVVuaXROYW1lcyA9IFtcblx0J3dlZWtzJyxcbl07XG5cbi8qKlxuICogV2hlcmUgYSBEYXRlVGltZSBvYmplY3QgcmVwcmVzZW50cyBhIHNpbmdsZSBwb2ludCBpbiB0aW1lLCBhIER1cmF0aW9uIG9iamVjdFxuICogcmVwcmVzZW50cyBhIGxlbmd0aCBvZiB0aW1lLlxuICpcbiAqIER1cmF0aW9ucyBkbyBub3QgaGF2ZSBhIGRlZmluZWQgYmVnaW5uaW5nIGFuZCBlbmQgZGF0ZS4gIFRoZXkgYXJlIGNvbnRleHRsZXNzLlxuICpcbiAqIEFzIGFuIGV4YW1wbGUsIGR1cmF0aW9ucyBhcmUgcmVwcmVzZW50YXRpdmUgb2Ygc29tZXRoaW5nIGxpa2UgXCIyIGhvdXJzXCIgYW5kXG4gKiBub3QgcmVwcmVzZW50YXRpdmUgb2Ygc29tZXRoaW5nIGxpa2UgXCJiZXR3ZWVuIDFwbSBhbmQgM3BtXCIuXG4gKlxuICogSW50ZXJuYWxseSwgdGhlIER1cmF0aW9uIGNsYXNzIGhlcmUgdXNlcyBgbW9tZW50LkR1cmF0aW9uYC4gIFRoaXMgaXMgYW5cbiAqIGFic3RyYWN0aW9uIGxvb3NlbHkgZm9sbG93aW5nIHRoZSBhZGFwdGVyIHBhdHRlcm4gc28gdGhhdCB0aGVyZSBpcyBhIGNvbW1vblxuICogYXBpIHRoYXQgY2FuIGJlIGRlcGVuZGVkIG9uIGlmIGluIHRoZSBmdXR1cmUgdGhlIGludGVybmFsIGxpYnJhcnkgaXMgc3dpdGNoZWRcbiAqIHRvIHNvbWV0aGluZyBkaWZmZXJlbnQgKHN1Y2ggYXMgTHV4b24pLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEdXJhdGlvbiB7XG5cdHN0YXRpYyBVTklUX1lFQVJTID0gJ3llYXJzJztcblx0c3RhdGljIFVOSVRfTU9OVEhTID0gJ21vbnRocyc7XG5cdHN0YXRpYyBVTklUX0RBWVMgPSAnZGF5cyc7XG5cdHN0YXRpYyBVTklUX0hPVVJTID0gJ2hvdXJzJztcblx0c3RhdGljIFVOSVRfTUlOVVRFUyA9ICdtaW51dGVzJztcblx0c3RhdGljIFVOSVRfU0VDT05EUyA9ICdzZWNvbmRzJztcblx0c3RhdGljIFVOSVRfTUlMTElTRUNPTkRTID0gJ21pbGxpc2Vjb25kcyc7XG5cdHN0YXRpYyBVTklUX1dFRUtTID0gJ3dlZWtzJztcblxuXHQvKipcblx0ICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgRHVyYXRpb24gY2xhc3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fG1vbWVudC5EdXJhdGlvbnxzdHJpbmd8bnVtYmVyfSB2YWx1ZXNcblx0ICogUmVjZWl2aW5nIGEgbW9tZW50LkR1cmF0aW9uIG9iamVjdCBpcyBzb21ldGhpbmcgZm9yIGludGVybmFsIHVzZSBhbmQgc2hvdWxkIG5vdCBiZSB1c2VkIGRpcmVjdGx5IHZpYVxuXHQgKiBjbGllbnQgY29kZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZSAgQSB2YWxpZCBsb2NhbGUgc3RyaW5nLlxuXHQgKiBcdFx0XHRcdFx0XHRcdEBsaW5rIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzU2NDZcblx0ICovXG5cdGNvbnN0cnVjdG9yKCB2YWx1ZXMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmlzVmFsaWQgXSA9IHRydWU7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0XHRpZiAoIHR5cGVvZiB2YWx1ZXMgIT09ICdvYmplY3QnICkge1xuXHRcdFx0dmFsdWVzID0gbW9tZW50LmR1cmF0aW9uKCB2YWx1ZXMgKS5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdH1cblx0XHRpZiAoIG1vbWVudC5pc0R1cmF0aW9uKCB2YWx1ZXMgKSApIHtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF0gPSB2YWx1ZXM7XG5cdFx0XHR0aGlzWyBwcml2YXRlTWV0aG9kcy5wb3B1bGF0ZVZhbHVlc0Zyb21EdXJhdGlvbiBdKCB2YWx1ZXMgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFsdWVzID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMuZmlsdGVyVmFsdWVzIF0oIHZhbHVlcyApO1xuXHRcdFx0dGhpc1sgcHJpdmF0ZU1ldGhvZHMuc2V0VmFsdWVzIF0oIHZhbHVlcyApO1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXSA9IG1vbWVudC5kdXJhdGlvbihcblx0XHRcdFx0dmFsdWVzXG5cdFx0XHQpLmxvY2FsZSggbG9jYWxlICk7XG5cdFx0fVxuXHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmNyZWF0ZUdldHRlcnMgXSgpO1xuXHRcdE9iamVjdC5mcmVlemUoIHRoaXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgRHVyYXRpb24gZnJvbSBhIG51bWJlciBvZiBtaWxsaXNlY29uZHMuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBtaWxsaXNlY29uZHNcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gIEFuIGluc3RhbmNlIG9mIER1cmF0aW9uLlxuXHQgKi9cblx0c3RhdGljIGZyb21NaWxsaXNlY29uZHMoIG1pbGxpc2Vjb25kcywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUgKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbiggeyBtaWxsaXNlY29uZHMgfSwgbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uIGZyb20gYSBzaW1wbGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzICBLZXlzIHNob3VsZCBiZSB0aGUgdW5pdHMgKGVnICd5ZWFycycsICdkYXlzJykuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RHVyYXRpb259IEFuIGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRzdGF0aWMgZnJvbU9iamVjdCggdmFsdWVzLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSApIHtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKCB2YWx1ZXMsIGxvY2FsZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBEdXJhdGlvbiBmcm9tIGFuIElTTzg2MDEgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gSVNPU3RyaW5nIChlZy4gJ1BUMjNIJylcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQW4gaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdHN0YXRpYyBmcm9tSVNPKCBJU09TdHJpbmcsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SVNPODYwMUlzVmFsaWQoIElTT1N0cmluZywgdHJ1ZSApO1xuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oIElTT1N0cmluZywgbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGUgd2hldGhlciB0aGUgcHJvdmlkZWQgbG9jYWxlIGFyZ3VtZW50IGlzIGEgdmFsaWQgbG9jYWxlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIGlzVmFsaWRMb2NhbGUoIGxvY2FsZSApIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZUxvY2FsZSggbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCBsb2NhbGUgYXJndW1lbnQgaXMgYSB2YWxpZCBsb2NhbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHRocm93cyBJbnZhbGlkTG9jYWxlXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNWYWxpZExvY2FsZSggbG9jYWxlICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGUgd2hldGhlciB0aGUgcHJvdmlkZWQgc3RyaW5nIGlzIGEgdmFsaWQgSVNPIDg2MDEgRHVyYXRpb24gc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaXNvU3RyaW5nXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgaXQgaXMgdmFsaWQuXG5cdCAqL1xuXHRzdGF0aWMgaXNWYWxpZElTTzg2MDFEdXJhdGlvbiggaXNvU3RyaW5nICkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlSVNPODYwMSggaXNvU3RyaW5nLCB0cnVlICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0IHdoZXRoZXIgdGhlIHByb3ZpZGVkIHN0cmluZyBpcyBhIHZhbGlkIElTTyA4NjAxIER1cmF0aW9uIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlzb1N0cmluZ1xuXHQgKiBAdGhyb3dzIEludmFsaWRJU084NjAxU3RyaW5nXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNWYWxpZElTTzg2MDFEdXJhdGlvbiggaXNvU3RyaW5nICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SVNPODYwMUlzVmFsaWQoIGlzb1N0cmluZyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIGluc3RhbmNlIG9mIER1cmF0aW9uLlxuXHQgKiBAcGFyYW0ge21peGVkfER1cmF0aW9ufWR1cmF0aW9uXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIGEgdmFsaWQgRHVyYXRpb24gb2JqZWN0LlxuXHQgKi9cblx0c3RhdGljIGlzVmFsaWREdXJhdGlvbiggZHVyYXRpb24gKSB7XG5cdFx0cmV0dXJuIGluc3RhbmNlT2YoIGR1cmF0aW9uLCAnRHVyYXRpb24nICkgJiZcblx0XHRcdGR1cmF0aW9uLmlzVmFsaWQ7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIER1cmF0aW9uIGFuZCB0aHJvd3MgYW5cblx0ICogZXhjZXB0aW9uIGlmIG5vdC5cblx0ICogQHBhcmFtIHttaXhlZHxEdXJhdGlvbn0gZHVyYXRpb25cblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc1ZhbGlkRHVyYXRpb24oIGR1cmF0aW9uICkge1xuXHRcdGlmICggISBEdXJhdGlvbi5pc1ZhbGlkRHVyYXRpb24oIGR1cmF0aW9uICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhpcyBEdXJhdGlvbiBvYmplY3QgaXMgbm90IHZhbGlkLidcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEdXJhdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbnxtaXhlZH0gZHVyYXRpb25cblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhlIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uLlxuXHQgKiBOb3RlOiB0cnVlIG1heSBzdGlsbCBtZWFuIHRoYXQgdGhlIER1cmF0aW9uIGluc3RhbmNlIGlzIG5vdCB2YWxpZCFcblx0ICovXG5cdHN0YXRpYyBpc0R1cmF0aW9uKCBkdXJhdGlvbiApIHtcblx0XHRyZXR1cm4gaW5zdGFuY2VPZiggZHVyYXRpb24sICdEdXJhdGlvbicgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uIGFuZCBpZiBub3Rcblx0ICogdGhyb3dzIGFuIGV4Y2VwdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbnxtaXhlZH0gZHVyYXRpb25cblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc0R1cmF0aW9uKCBkdXJhdGlvbiApIHtcblx0XHRpZiAoICEgRHVyYXRpb24uaXNEdXJhdGlvbiggZHVyYXRpb24gKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuIGluc3RhbmNlIG9mIER1cmF0aW9uLidcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgZmlsdGVycyB0aGUgaW5jb21pbmcgdmFsdWVzIGFuZCByZXR1cm5zIG9ubHkga2V5L3ZhbHVlIHBhaXJzIHRoYXRcblx0ICogYXJlIGFjY2VwdGFibGUgYXMgZHVyYXRpb24gdW5pdHMuXG5cdCAqXG5cdCAqIElmIGEgaW52YWxpZCBkdXJhdGlvbiB1bml0IGlzIGRpc2NvdmVyZWQsIGEgY29uc29sZS5lcnJvciBpcyBnZW5lcmF0ZWRcblx0ICogKGluIG5vbi1wcm9kdWN0aW9uIG1vZGUpLlxuXHQgKlxuXHQgKiBAcGFyYW0ge21peGVkfSB2YWx1ZXNcblx0ICogQHJldHVybiB7T2JqZWN0fSBGaWx0ZXJlZCB2YWx1ZXMuXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yIGlmIGluY29taW5nIHZhbHVlcyBhcmd1bWVudCBpcyBub3QgYW4gb2JqZWN0LlxuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5maWx0ZXJWYWx1ZXMgXSggdmFsdWVzICkge1xuXHRcdGlmICggdHlwZW9mIHZhbHVlcyAhPT0gJ29iamVjdCcgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnSW5jb21pbmcgdmFsdWVzIG11c3QgYmUgYSBzaW1wbGUgb2JqZWN0LicgKTtcblx0XHR9XG5cdFx0Y29uc3QgdmFsdWVzVG9TZXQgPSBwaWNrKCB2YWx1ZXMsIHVuaXROYW1lcyApO1xuXHRcdGlmICggISBpc1NoYWxsb3dFcXVhbCggdmFsdWVzLCB2YWx1ZXNUb1NldCApICkge1xuXHRcdFx0d2FybmluZyhcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdCdUaGUgZm9sbG93aW5nIHVuZXhwZWN0ZWQga2V5cyB3ZXJlIGluIHRoZSBjb25maWd1cmF0aW9uICcgK1xuXHRcdFx0XHQnb2JqZWN0IGZvciBjb25zdHJ1Y3RpbmcgdGhlIER1cmF0aW9uOiAnICtcblx0XHRcdFx0a2V5cyggb21pdCggdmFsdWVzLCB1bml0TmFtZXMgKSApLmpvaW4oKVxuXHRcdFx0KTtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmlzVmFsaWQgXSA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWVzVG9TZXQ7XG5cdH1cblxuXHQvKipcblx0ICogVXNlZCB0byBzZXQgdGhlIGludGVybmFsIFwicHJpdmF0ZVwiIHZhbHVlcyBwcm9wZXJ0eS5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHZhbHVlc1xuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdFsgcHJpdmF0ZU1ldGhvZHMuc2V0VmFsdWVzIF0oIHZhbHVlcyApIHtcblx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvblZhbHVlcyBdID0ge307XG5cdFx0dW5pdE5hbWVzLmZvckVhY2goICggdW5pdCApID0+IHtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uVmFsdWVzIF1bIHVuaXQgXSA9IHZhbHVlc1sgdW5pdCBdIHx8XG5cdFx0XHRcdDA7XG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVzZWQgdG8gc2V0IHRoZSB2YWx1ZXMgXCJwcml2YXRlXCIgcHJvcGVydHkgZnJvbSBhIG1vbWVudC5EdXJhdGlvbiBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bW9tZW50LkR1cmF0aW9ufSBkdXJhdGlvblxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdFsgcHJpdmF0ZU1ldGhvZHMucG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb24gXSggZHVyYXRpb24gKSB7XG5cdFx0Y29uc3Qgc2V0VmFsdWVzID0ge307XG5cdFx0dW5pdE5hbWVzLmZvckVhY2goICggdW5pdCApID0+IHtcblx0XHRcdHNldFZhbHVlc1sgdW5pdCBdID0gZHVyYXRpb25bIHVuaXQgXSgpO1xuXHRcdH0gKTtcblx0XHR0aGlzWyBwcml2YXRlTWV0aG9kcy5zZXRWYWx1ZXMgXSggc2V0VmFsdWVzICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBhcnJheSBvZiBhY2Nlc3NvciBuYW1lcyAodGhhdCBpbiB0dXJuIGFyZSB1c2VkIGZvciBnZW5lcmF0aW5nXG5cdCAqIHByaXZhdGUgcHJvcGVydGllcykuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKiBAcmV0dXJuIHtzdHJpbmdbXX0gIEFycmF5IG9mIGFjY2Vzc29yIG5hbWVzLlxuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5nZXRBbGxVbml0TmFtZXMgXSgpIHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0Li4udW5pdE5hbWVzLFxuXHRcdFx0Li4uZGVyaXZhdGl2ZVVuaXROYW1lcyxcblx0XHRdO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgZ2V0dGVycyBmb3IgdGhlIER1cmF0aW9uIGluc3RhbmNlIGZyb20gdGhlIGFjY2Vzc29yIG5hbWVzLlxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdFsgcHJpdmF0ZU1ldGhvZHMuY3JlYXRlR2V0dGVycyBdKCkge1xuXHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmdldEFsbFVuaXROYW1lcyBdKCkuZm9yRWFjaChcblx0XHRcdCggYWNjZXNzb3JOYW1lICkgPT4ge1xuXHRcdFx0XHQvLyBjcmVhdGVzIGFjY2Vzc29yIGZvciBnZXR0aW5nIHRoZSB2YWx1ZSB2aWEgYSBwcm9wZXJ0eVxuXHRcdFx0XHQvLyBlZy4gaW5zdGFuY2UuaG91cnNcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCB0aGlzLCBhY2Nlc3Nvck5hbWUsIHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGRlcml2YXRpdmVVbml0TmFtZXMuaW5kZXhPZiggYWNjZXNzb3JOYW1lICkgPiAtMSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF1bIGFjY2Vzc29yTmFtZSBdKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpc1xuXHRcdFx0XHRcdFx0XHRbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uVmFsdWVzIF1cblx0XHRcdFx0XHRcdFx0WyBhY2Nlc3Nvck5hbWUgXSB8fFxuXHRcdFx0XHRcdFx0XHQwO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0Ly8gY3JlYXRlcyBgYXMqYCBtZXRob2RzLlxuXHRcdFx0XHQvLyBlZyBgaW5zdGFuY2UuYXNIb3Vyc2Agd291bGQgcmV0dXJuIHRoZSBnaXZlbiBkdXJhdGlvblxuXHRcdFx0XHQvLyBleHByZXNzZWQgYXMgdGhlIGhvdXJzIHVuaXQuXG5cdFx0XHRcdC8vIG5vdGUgZm9yIHVuaXRzIHN1Y2ggYXMgXCJ5ZWFyc1wiIGFuZCBcIm1vbnRoc1wiLCB0aGlzIHVzZXMgd2hhdFxuXHRcdFx0XHQvLyBpcyB0ZXJtZWQgYXMgXCJsb25ndGVybVwiIGNhbGN1bGF0aW9uLiBMb25ndGVybSBpcyBiYXNlZCBvblxuXHRcdFx0XHQvLyBhIDQwMCB5ZWFyIGN5Y2xlIGF2ZXJhZ2luZyBvdXQgdGhlIGRheXMgaW4gYSBtb250aCBhbmRcblx0XHRcdFx0Ly8gZGF5cyBpbiBhIHllYXIgb3ZlciB0aGF0IGN5Y2xlLlxuXHRcdFx0XHQvLyBAbGluayBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9ibG9iL2RldmVsb3Avc3JjL2xpYi9kdXJhdGlvbi9idWJibGUuanMjTDUyXG5cdFx0XHRcdGNvbnN0IGFzTWV0aG9kTmFtZSA9ICdhcycgKyBjYXBpdGFsaXplKCBhY2Nlc3Nvck5hbWUgKTtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCB0aGlzLCBhc01ldGhvZE5hbWUsIHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHRcdFx0XHRcdFsgYXNNZXRob2ROYW1lIF0oKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgdmFsdWUgb2YgbG9jYWxlLlxuXHQgKiBlZy4gaW5zdGFuY2UubG9jYWxlXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGxvY2FsZSBzdHJpbmcuXG5cdCAqL1xuXHRnZXQgbG9jYWxlKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLmxvY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjdXJyZW50IER1cmF0aW9uIGluc3RhbmNlIHJlcHJlc2VudHMgYSB2YWxpZFxuXHQgKiBkdXJhdGlvbi5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGUgRHVyYXRpb24gaW5zdGFuY2UgaXMgdmFsaWQuXG5cdCAqL1xuXHRnZXQgaXNWYWxpZCgpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuaXNWYWxpZCBdICYmXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLnRvSVNPU3RyaW5nKCkgIT09ICdQMEQnO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBuZXcgRHVyYXRpb24gaW5zdGFuY2UgdGhhdCBpcyBpZGVudGljYWwgdG8gdGhpcyBleGNlcHQgdGhlXG5cdCAqIGxvY2FsZSBpcyBjaGFuZ2VkIHRvIHdoYXQgd2FzIHByb3ZpZGVkLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBIG5ldyBpbnN0YW5jZSBvZiBEdXJhdGlvblxuXHQgKi9cblx0c2V0TG9jYWxlKCBsb2NhbGUgKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbiggdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb25WYWx1ZXMgXSwgbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogUmVkdWNlIHRoaXMgRHVyYXRpb24gdG8gaXRzIGNhbm9uaWNhbCByZXByZXNlbnRhdGlvbiBpbiBpdHMgY3VycmVudCB1bml0cy5cblx0ICpcblx0ICogRm9yIGV4YW1wbGU6XG5cdCAqIER1cmF0aW9uXG5cdCAqICAgICAuZnJvbU9iamVjdCh7IHllYXJzOiAyLCBkYXlzOiA1MDAwIH0pXG5cdCAqICAgICAubm9ybWFsaXplKClcblx0ICogICAgIC50b09iamVjdCgpIC8vPT4geyB5ZWFyczogMTUsIG1vbnRoczogOCwgZGF5czogMTIgfVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQSBuZXcgaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdG5vcm1hbGl6ZSgpIHtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKCB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBEdXJhdGlvbiBpbnN0YW5jZSBpcyB0aGUgc2FtZSBhcyB0aGlzXG5cdCAqIER1cmF0aW9uIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufG1peGVkfSBvdGhlckR1cmF0aW9uXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhhdCB0aGUgY29tcGFyZWQgZHVyYXRpb25zIGhhdmUgdGhlIHNhbWVcblx0ICogdW5pdHMgYW5kIHRoZSBzYW1lIHZhbHVlcyBmb3IgZWFjaCB1bml0IChhcyB3ZWxsIGFzIHNhbWUgbG9jYWxlKS4gVGhpc1xuXHQgKiBtZWFucyB0aGF0IGEgZHVyYXRpb24gd2l0aHsgbWludXRlczogNjAgfSB3b3VsZCBiZSBjb25zaWRlcmVkIG5vdCBlcXVhbFxuXHQgKiB0byBhIGR1cmF0aW9uIHdpdGggeyBob3VyczogMSB9LlxuXHQgKi9cblx0c2FtZUFzKCBvdGhlckR1cmF0aW9uICkge1xuXHRcdER1cmF0aW9uLmFzc2VydElzRHVyYXRpb24oIG90aGVyRHVyYXRpb24gKTtcblx0XHRpZiAoICEgdGhpcy5pc1ZhbGlkIHx8ICEgb3RoZXJEdXJhdGlvbi5pc1ZhbGlkICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAoIHRoaXMubG9jYWxlICE9PSBvdGhlckR1cmF0aW9uLmxvY2FsZSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIGlzU2hhbGxvd0VxdWFsKCB0aGlzLnRvT2JqZWN0KCksIG90aGVyRHVyYXRpb24udG9PYmplY3QoKSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgRHVyYXRpb24gaW5zdGFuY2UgaXMgZXF1YWwgdG8gdGhpcyBEdXJhdGlvblxuXHQgKiBpbnN0YW5jZS5cblx0ICpcblx0ICogRXF1YWxpdHkgaXMgYmFzZWQgb246XG5cdCAqIC0gbG9jYWxlIGlzIHRoZSBzYW1lXG5cdCAqIC0gdGhlIG5vcm1hbGl6ZWQgdmFsdWUgb2YgdGhlIGR1cmF0aW9uIGlzIHRoZSBzYW1lLiAgZWcgYSBkdXJhdGlvbiB3aXRoXG5cdCAqIHsgaG91cnM6IDI0IH0gd291bGQgYmUgY29uc2lkZXJlZCBlcXVhbCB0byBhIGR1cmF0aW9uIHdpdGggeyBkYXlzOiAxIH1cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbnxtaXhlZH0gb3RoZXJEdXJhdGlvblxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGNvbnNpZGVyZWQgZXF1YWxcblx0ICovXG5cdGVxdWFscyggb3RoZXJEdXJhdGlvbiApIHtcblx0XHREdXJhdGlvbi5hc3NlcnRJc0R1cmF0aW9uKCBvdGhlckR1cmF0aW9uICk7XG5cdFx0aWYgKCAhIHRoaXMuaXNWYWxpZCB8fCAhIG90aGVyRHVyYXRpb24uaXNWYWxpZCApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKCB0aGlzLmxvY2FsZSAhPT0gb3RoZXJEdXJhdGlvbi5sb2NhbGUgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBpc1NoYWxsb3dFcXVhbChcblx0XHRcdHRoaXMubm9ybWFsaXplKCkudG9PYmplY3QoKSxcblx0XHRcdG90aGVyRHVyYXRpb24ubm9ybWFsaXplKCkudG9PYmplY3QoKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogTWFrZSB0aGlzIGR1cmF0aW9uIGxvbmdlciBieSB0aGUgc3BlY2lmaWVkIGFtb3VudC5cblx0ICpcblx0ICogTm90ZTogdGhlIHJldHVybmVkIER1cmF0aW9uIHdpbGwgaGF2ZSB0aGUgbG9jYWxlIG9mIHRoZSBvcmlnaW5hbFxuXHQgKiByZWdhcmRsZXNzIHdoYXQgdGhlIGxvY2FsZSB3YXMgb24gYW55IHBhc3NlZCBpbiBkdXJhdGlvbi5cblx0ICpcblx0ICogVGhlIG5ldyBEdXJhdGlvbiByZXR1cm5lZCB3aWxsIGhhdmUgbm9ybWFsaXplZCB2YWx1ZXMgKGkuZS4gaWYgYWRkaXRpb25cblx0ICogb2Ygb25lIER1cmF0aW9uIHdpdGggYHsgaG91cnM6IDEwIH1gIGlzIGRvbmUgd2l0aCB0aGUgb3RoZXIgRHVyYXRpb25cblx0ICogaGF2aW5nIGB7IGhvdXJzOiAxNCB9YCB0aGVuIHRoZSBuZXcgRHVyYXRpb24gd2lsbCBoYXZlIGB7IGRheXM6IDEgfWAuXG5cdCAqIFlvdSBjYW4gc3RpbGwgZ2V0IHRoZSB0b3RhbCBob3VycyBieSBjYWxsaW5nIGBuZXdEdXJhdGlvbi5hc0hvdXJzKClgLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufE9iamVjdHxudW1iZXJ9IHZhbHVlICBFaXRoZXIgYSBEdXJhdGlvbiBpbnN0YW5jZSwgYVxuXHQgKiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIG9yIGFuIG9iamVjdCBpbiB0aGUgc2FtZSBzaGFwZSByZWNlaXZlZCBieVxuXHQgKiBEdXJhdGlvbi5mcm9tT2JqZWN0KClcblx0ICpcblx0ICogQHJldHVybiB7RHVyYXRpb259IEEgbmV3IGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRwbHVzKCB2YWx1ZSApIHtcblx0XHRpZiAoIER1cmF0aW9uLmlzRHVyYXRpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdXG5cdFx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0XHQuYWRkKCB2YWx1ZVsgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXSApXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHR2YWx1ZSA9IHRoaXNbIHByaXZhdGVNZXRob2RzLmZpbHRlclZhbHVlcyBdKCB2YWx1ZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQuYWRkKCB2YWx1ZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlIHRoaXMgZHVyYXRpb24gc2hvcnRlciBieSB0aGUgc3BlY2lmaWVkIGFtb3VudFxuXHQgKlxuXHQgKiBOb3RlOiB0aGUgcmV0dXJuZWQgRHVyYXRpb24gd2lsbCBoYXZlIHRoZSBsb2NhbGUgb2YgdGhlIG9yaWdpbmFsXG5cdCAqIHJlZ2FyZGxlc3Mgd2hhdCB0aGUgbG9jYWxlIHdhcyBvbiBhbnkgcGFzc2VkIGluIGR1cmF0aW9uLlxuXHQgKlxuXHQgKiBUaGUgbmV3IER1cmF0aW9uIHJldHVybmVkIHdpbGwgaGF2ZSBub3JtYWxpemVkIHZhbHVlcyAoaS5lLiBpZiBzdWJ0cmFjdGlvblxuXHQgKiBvZiBvbmUgRHVyYXRpb24gd2l0aCBgeyBob3VyczogMzQgfWAgaXMgZG9uZSB3aXRoIHRoZSBvdGhlciBEdXJhdGlvblxuXHQgKiBoYXZpbmcgYHsgaG91cnM6IDEwIH1gIHRoZW4gdGhlIG5ldyBEdXJhdGlvbiB3aWxsIGhhdmUgYHsgZGF5czogMSB9YC5cblx0ICogWW91IGNhbiBzdGlsbCBnZXQgdGhlIHRvdGFsIGhvdXJzIGJ5IGNhbGxpbmcgYG5ld0R1cmF0aW9uLmFzSG91cnMoKWAuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RHVyYXRpb258T2JqZWN0fG51bWJlcn0gdmFsdWUgRWl0aGVyIGEgZHVyYXRpb24gaW5zdGFuY2UsIGFcblx0ICogbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBvciBhbiBvYmplY3QgaW4gdGhlIHNhbWUgc2hhcGUgYXMgdGhhdCByZWNlaXZlZCBieVxuXHQgKiBEdXJhdGlvbi5mcm9tT2JqZWN0KClcblx0ICpcblx0ICogQHJldHVybiB7RHVyYXRpb259IEEgbmV3IGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRtaW51cyggdmFsdWUgKSB7XG5cdFx0aWYgKCBEdXJhdGlvbi5pc0R1cmF0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIG5ldyBEdXJhdGlvbihcblx0XHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHRcdC5jbG9uZSgpXG5cdFx0XHRcdFx0LnN1YnRyYWN0KCB2YWx1ZVsgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXSApXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHR2YWx1ZSA9IHRoaXNbIHByaXZhdGVNZXRob2RzLmZpbHRlclZhbHVlcyBdKCB2YWx1ZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQuc3VidHJhY3QoIHZhbHVlIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG5lZ2F0aXZlIG9mIHRoaXMgRHVyYXRpb24uXG5cdCAqXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBIG5ldyBpbnN0YW5jZSBvZiBEdXJhdGlvblxuXHQgKi9cblx0bmVnYXRlKCkge1xuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oXG5cdFx0XHRtYXBWYWx1ZXMoIHRoaXMudG9PYmplY3QoKSwgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUgKiAtMTtcblx0XHRcdH0gKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIGphdmFzY3JpcHQgb2JqZWN0IHdpdGggdGhpcyBEdXJhdGlvbidzIHZhbHVlcy5cblx0ICpcblx0ICogQHJldHVybiB7Kn0gUmV0dXJucyB7IHllYXJzOiBudW1iZXIsIGhvdXJzOiBudW1iZXIgLi4uIH1cblx0ICovXG5cdHRvT2JqZWN0KCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvblZhbHVlcyBdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uLlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGVnLiBcIlBUMjRIXCJcblx0ICovXG5cdHRvSVNPKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLnRvSVNPU3RyaW5nKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBJU08gODYwMSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uIGFwcHJvcHJpYXRlIGZvciB1c2Vcblx0ICogaW4gSlNPTi5cblx0ICogQHJldHVybiB7c3RyaW5nfSBlZy4gXCJQVDI0SFwiXG5cdCAqL1xuXHR0b0pTT04oKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF0udG9KU09OKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBJU08gODYwMSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uIGFwcHJvcHJpYXRlIGZvciB1c2Vcblx0ICogaW4gZGVidWdnaW5nLlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGVnLiBcIlBUMjRIXCJcblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLnRvSVNPKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBtaWxsaXNlY29uZHMgdmFsdWUgb2YgdGhpcyBEdXJhdGlvbi5cblx0ICogQHJldHVybiB7bnVtYmVyfSBUaGUgdmFsdWUgb2YgdGhpcyBkdXJhdGlvbiByZXByZXNlbnRlZCBpbiB0aGUgbnVtYmVyIG9mXG5cdCAqIG1pbGxpc2Vjb25kcy5cblx0ICovXG5cdHZhbHVlT2YoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXNNaWxsaXNlY29uZHMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRHVyYXRpb24gZm9ybWF0dGVkIGFjY29yZGluZyB0b1xuXHQgKiB0aGUgc3BlY2lmaWVkIGZvcm1hdCBzdHJpbmcuXG5cdCAqXG5cdCAqIEN1cnJlbnRseSB0aGlzIGFjY2VwdHMgdGhlIGZvbGxvd2luZyB0b2tlbnMgaW4gdGhlIGZvcm1hdCBzdHJpbmc6XG5cdCAqXG5cdCAqIHllYXJzOiAgIFkgb3IgeVxuXHQgKiBtb250aHM6ICBNXG5cdCAqIHdlZWtzOiAgIFcgb3Igd1xuXHQgKiBkYXlzOiAgICBEIG9yIGRcblx0ICogaG91cnM6ICAgSCBvciBoXG5cdCAqIG1pbnV0ZXM6IG1cblx0ICogc2Vjb25kczogc1xuXHQgKiBtczogICAgICBTXG5cdCAqXG5cdCAqIFlvdSBjYW4gdXNlIG11bHRpcGxlcyBvZiB0aGUgc2FtZSB0b2tlbiB0b2dldGhlciB0byBhZGQgemVyby1sZW5ndGhcblx0ICogcGFkZGluZzogKGVnIGhoIC0+IDAxIGluc3RlYWQgb2YgaCAtPiAxKVxuXHQgKlxuXHQgKiBFc2NhcGUgdG9rZW4gY2hhcmFjdGVycyB3aXRoaW4gdGhlIGZvcm1hdCBzdHJpbmcgdXNpbmcgc3F1YXJlIGJyYWNrZXRzXG5cdCAqIChlZyAnaCBbaHJzXSwgbSBbbWluXScgLT4gJzEyIGhycywgMyBtaW4nKVxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ31mb3JtYXRcblx0ICogQHJldHVybiB7c3RyaW5nfSAgQSBmb3JtYXR0ZWQgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgZHVyYXRpb24uXG5cdCAqL1xuXHR0b0Zvcm1hdCggZm9ybWF0ICkge1xuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZSgpWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLmZvcm1hdCggZm9ybWF0ICk7XG5cdH1cbn1cbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgRGF0ZVRpbWUgfSBmcm9tICcuL2RhdGV0aW1lJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRHVyYXRpb24gfSBmcm9tICcuL2R1cmF0aW9uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2VydmVyRGF0ZVRpbWUgfSBmcm9tICcuL3NlcnZlci1kYXRlLXRpbWUnO1xuXG4iLCIvKipcbiAqIEludGVybmFsIEltcG9ydHMuXG4gKi9cbmltcG9ydCBEYXRlVGltZSBmcm9tICcuL2RhdGV0aW1lJztcbmltcG9ydCB7XG5cdERFRkFVTFRfVElNRVpPTkVfU1RSSU5HLFxuXHRIQVNfVElNRVpPTkVfU1RSSU5HLFxuXHRERUZBVUxUX09GRlNFVCxcblx0REVGQVVMVF9WQUxJRF9MT0NBTEUsXG59IGZyb20gJy4vZGVmYXVsdHMnO1xuXG4vKipcbiAqIEV4dGVybmFsIEltcG9ydHMuXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcblxuLyoqXG4gKiBJbmhlcml0aW5nIHRoZSBEYXRlVGltZSBWYWx1ZSBvYmplY3QsIHRoaXMgcmVwcmVzZW50cyBhIHNpbmdsZSBwb2ludCBpbiB0aW1lXG4gKiB3aXRoaW4gdGhlIGNvbnRleHQgb2YgdGhlIHRpbWV6b25lIG9yIG9mZnNldCB0aGUgc2VydmVyIGlzIHNldCBhdC5cbiAqXG4gKiBJbnN0YW50aWF0aW5nIHRoaXMgaW5zdGVhZCBvZiBgRGF0ZVRpbWVgIHJlbW92ZXMgdGhlIG5lZWQgdG8gcGFzcyBhbG9uZ1xuICogdGltZXpvbmUgc3RyaW5nIG9yIG9mZnNldCBhbmQgaW5zdGFudGlhdGVzIGFjY29yZGluZyB0byB3aGF0IGhhcyBiZWVuIHNldCBhc1xuICogdGhlIGRlZmF1bHRzIGZvciB0aG9zZSBmcm9tIHRoZSBzZXJ2ZXIuICBVc2FnZSBvZiB0aGlzIGNsYXNzIGlzIHByZWZlcnJlZFxuICogb3ZlciBEYXRlVGltZSB0byByZW1vdmUgdGhlIG5lZWQgZm9yIGNsaWVudCBjb2RlIHRvIGZpZ3VyZSBvdXQgaWYgdGhlIHNlcnZlclxuICogaGFzIGEgdGltZXpvbmUgc3RyaW5nIHNldCBvciBpcyB1c2luZyBhIFVUQyBvZmZzZXQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZlckRhdGVUaW1lIGV4dGVuZHMgRGF0ZVRpbWUge1xuXHQvKipcblx0ICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgU2VydmVyRGF0ZVRpbWUgY2xhc3Ncblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlzbzg2MDFEYXRlU3RyaW5nXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRpbWV6b25lXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRpc284NjAxRGF0ZVN0cmluZyA9ICcnLFxuXHRcdGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFLFxuXHRcdHRpbWV6b25lID0gREVGQVVMVF9USU1FWk9ORV9TVFJJTkcsXG5cdCkge1xuXHRcdC8vIHdlIG9ubHkgd2FudCB0byB1c2UgdGhlIHRpbWV6b25lIHZhbHVlIGlmIHRoZSBzZXJ2ZXIgaW5kaWNhdGVzIHRoZXJlXG5cdFx0Ly8gaXMgYSBhIHRpbWV6b25lIHN0cmluZyBvciBpZiBjb25zdHJ1Y3RpbmcgYW4gaW5zdGFuY2UgZm9yIGEgbm9uIFVUQ1xuXHRcdC8vIHZhbHVlIHRpbWV6b25lIChIQVNfVElNRVpPTkVfU1RSSU5HIGlzIGp1c3QgYSBzaG9ydGN1dCBjaGVjaykuXG5cdFx0aWYgKFxuXHRcdFx0SEFTX1RJTUVaT05FX1NUUklORyB8fFxuXHRcdFx0KCAhISB0aW1lem9uZSAmJiB0aW1lem9uZSAhPT0gJ1VUQycgKVxuXHRcdCkge1xuXHRcdFx0c3VwZXIoIGlzbzg2MDFEYXRlU3RyaW5nLCB0aW1lem9uZSwgbG9jYWxlICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGRhdGV0aW1lID0gISEgaXNvODYwMURhdGVTdHJpbmcgP1xuXHRcdFx0XHRtb21lbnQoKS51dGNPZmZzZXQoIERFRkFVTFRfT0ZGU0VULCB0cnVlICkubG9jYWxlKCBsb2NhbGUgKSA6XG5cdFx0XHRcdG1vbWVudCggaXNvODYwMURhdGVTdHJpbmcgKVxuXHRcdFx0XHRcdC51dGNPZmZzZXQoIERFRkFVTFRfT0ZGU0VULCB0cnVlIClcblx0XHRcdFx0XHQubG9jYWxlKCBsb2NhbGUgKTtcblx0XHRcdHN1cGVyKCBkYXRldGltZS50b0lTT1N0cmluZyggdHJ1ZSApLCBudWxsLCBsb2NhbGUgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSW5zdGFudGlhdGUgU2VydmVyRGF0ZVRpbWUgZnJvbSBhbiBJU08gc3RyaW5nLlxuXHQgKiBUaGlzIG92ZXJyaWRlcyBgRGF0ZVRpbWUuZnJvbUlTT2AgcmVtb3ZpbmcgdGhlIG5lZWQgdG8gd29ycnkgYWJvdXRcblx0ICogd2hldGhlciB0byB1c2UgYHRpbWV6b25lYCBvciBgb2Zmc2V0YC4gIFRoaXMgd2lsbCBzaW1wbHkgdXNlIHdoYXRldmVyIGlzXG5cdCAqIHByb3ZpZGVkIGJ5IHRoZSBzZXJ2ZXIgKHByZWZlcnJpbmcgdGltZXpvbmUgaWYgaXRzIGF2YWlsYWJsZSkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBJU09TdHJpbmdcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtTZXJ2ZXJEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgU2VydmVyRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tSVNPKCBJU09TdHJpbmcsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdHJldHVybiBIQVNfVElNRVpPTkVfU1RSSU5HID9cblx0XHRcdG5ldyB0aGlzKFxuXHRcdFx0XHRzdXBlclxuXHRcdFx0XHRcdC5mcm9tSVNPKCBJU09TdHJpbmcsIERFRkFVTFRfVElNRVpPTkVfU1RSSU5HIClcblx0XHRcdFx0XHQudG9JU08oKSxcblx0XHRcdFx0bG9jYWxlXG5cdFx0XHQpIDpcblx0XHRcdG5ldyB0aGlzKFxuXHRcdFx0XHRzdXBlclxuXHRcdFx0XHRcdC5mcm9tSVNPV2l0aE9mZnNldCggSVNPU3RyaW5nLCBERUZBVUxUX09GRlNFVCApXG5cdFx0XHRcdFx0LnRvSVNPKCksXG5cdFx0XHRcdGxvY2FsZVxuXHRcdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbnN0YW50aWF0ZSBTZXJ2ZXJEYXRlVGltZSBmcm9tIGFuIElTTyBzdHJpbmcuXG5cdCAqIFRoaXMgb3ZlcnJpZGVzIGBEYXRlVGltZS5mcm9tSlNEYXRlYCByZW1vdmluZyB0aGUgbmVlZCB0byB3b3JyeSBhYm91dFxuXHQgKiB3aGV0aGVyIHRvIHVzZSBgdGltZXpvbmVgIG9yIGBvZmZzZXRgLiAgVGhpcyB3aWxsIHNpbXBseSB1c2Ugd2hhdGV2ZXIgaXNcblx0ICogcHJvdmlkZWQgYnkgdGhlIHNlcnZlciAocHJlZmVycmluZyB0aW1lem9uZSBpZiBpdHMgYXZhaWxhYmxlKS5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIFNlcnZlckRhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgZnJvbUpTRGF0ZSggZGF0ZSwgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUgKSB7XG5cdFx0cmV0dXJuIEhBU19USU1FWk9ORV9TVFJJTkcgP1xuXHRcdFx0bmV3IHRoaXMoXG5cdFx0XHRcdHN1cGVyXG5cdFx0XHRcdFx0LmZyb21KU0RhdGUoIGRhdGUsIERFRkFVTFRfVElNRVpPTkVfU1RSSU5HIClcblx0XHRcdFx0XHQudG9JU08oKSxcblx0XHRcdFx0bG9jYWxlXG5cdFx0XHQpIDpcblx0XHRcdG5ldyB0aGlzKFxuXHRcdFx0XHRzdXBlclxuXHRcdFx0XHRcdC5mcm9tSlNEYXRlV2l0aE9mZnNldCggZGF0ZSwgREVGQVVMVF9PRkZTRVQgKVxuXHRcdFx0XHRcdC50b0lTTygpLFxuXHRcdFx0XHRsb2NhbGVcblx0XHRcdCk7XG5cdH1cbn1cbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgSW5maW5pdHlTeW1ib2wgfSBmcm9tICcuL2luZmluaXR5LXN5bWJvbCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1vbmV5IH0gZnJvbSAnLi9tb25leSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFNpdGVDdXJyZW5jeSwgQ3VycmVuY3kgfSBmcm9tICcuL2N1cnJlbmN5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTGFiZWwgfSBmcm9tICcuL2xhYmVsJztcbmV4cG9ydCB7IERhdGVUaW1lLCBEdXJhdGlvbiwgU2VydmVyRGF0ZVRpbWUgfSBmcm9tICcuL2RhdGUtdGltZSc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBwYXJzZUluZmluaXR5IGZyb20gJy4uL3V0aWxzL3BhcnNlLWluZmluaXR5JztcblxuLyoqXG4gKiBJbmZpbml0eVN5bWJvbFxuICogZGlzcGxheXMgaW5maW5pdGUgdmFsdWVzIGFzIGFuIGluZmluaXR5IHN5bWJvbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtib29sZWFufG51bWJlcnxvYmplY3R8c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBhc0ludCAgIHdoZXRoZXIgdG8gcGFyc2UgdmFsdWUgYXMgYW4gaW50ZWdlclxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgIHJlbmRlcmVkIHZhbHVlIG9yIGluZmluaXR5IHN5bWJvbFxuICovXG5jb25zdCBJbmZpbml0eVN5bWJvbCA9ICggeyB2YWx1ZSwgYXNJbnQgfSApID0+IHtcblx0dmFsdWUgPSBwYXJzZUluZmluaXR5KCB2YWx1ZSwgYXNJbnQgKTtcblx0cmV0dXJuIHZhbHVlID09PSBJbmZpbml0eSA/XG5cdFx0PHNwYW4gY2xhc3NOYW1lPXsgJ2VlLWluZmluaXR5LXNpZ24nIH0+JmluZmluOzwvc3Bhbj4gOlxuXHRcdHZhbHVlO1xufTtcblxuSW5maW5pdHlTeW1ib2wucHJvcFR5cGVzID0ge1xuXHR2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZSggW1xuXHRcdFByb3BUeXBlcy5ib29sLFxuXHRcdFByb3BUeXBlcy5udW1iZXIsXG5cdFx0UHJvcFR5cGVzLm9iamVjdCxcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxuXHRdICksXG5cdGFzSW50OiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbkluZmluaXR5U3ltYm9sLmRlZmF1bHRQcm9wcyA9IHtcblx0dmFsdWU6ICcnLFxuXHRhc0ludDogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmZpbml0eVN5bWJvbDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBzdGFydENhc2UsIGlzU3RyaW5nIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuXG4vKipcbiAqIEEgdmFsdWUgb2JqZWN0IGZvciByZXByZXNlbnRpbmcgYSBsYWJlbCB3aXRoIHNpbmd1bGFyIGFuZCBwbHVyYWwgc3RyaW5nXG4gKiB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExhYmVsIHtcblx0c3RhdGljIEZPUk1BVF9MT1dFUkNBU0UgPSAnbG93ZXInO1xuXHRzdGF0aWMgRk9STUFUX1VQUEVSQ0FTRSA9ICd1cHBlcic7XG5cdHN0YXRpYyBGT1JNQVRfU0VOVEVOQ0VfQ0FTRSA9ICdzZW50ZW5jZSc7XG5cblx0LyoqXG5cdCAqIFRoZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzaW5ndWxhciBmb3JtIG9mIHRoZSBsYWJlbC5cblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHNpbmd1bGFyID0gJyc7XG5cblx0LyoqXG5cdCAqIFRoZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBwbHVyYWwgZm9ybSBvZiB0aGUgbGFiZWwuXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRwbHVyYWwgPSAnJztcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNpbmd1bGFyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwbHVyYWxcblx0ICovXG5cdGNvbnN0cnVjdG9yKCBzaW5ndWxhciwgcGx1cmFsICkge1xuXHRcdHRoaXMuc2V0U2luZ3VsYXIoIHNpbmd1bGFyICkuc2V0UGx1cmFsKCBwbHVyYWwgKTtcblx0XHRPYmplY3QuZnJlZXplKCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogRmx1aWQgc2V0dGVyIGZvciBzZXR0aW5nIHRoZSBzaW5ndWxhciBwcm9wZXJ0eS5cblx0ICpcblx0ICogSWYgdGhlIHNpbmd1bGFyIHByb3BlcnR5IGhhcyBhbHJlYWR5IGJlZW4gc2V0LCB0aGlzIHdpbGwgcmV0dXJuIGEgbmV3XG5cdCAqIGluc3RhbmNlIG9mIExhYmVsXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzaW5ndWxhclxuXHQgKiBAcmV0dXJuIHtMYWJlbH0gIEFuIGluc3RhbmNlIG9mIExhYmVsXG5cdCAqL1xuXHRzZXRTaW5ndWxhciggc2luZ3VsYXIgKSB7XG5cdFx0TGFiZWwuYXNzZXJ0U3RyaW5nKCBzaW5ndWxhciApO1xuXHRcdGlmICggdGhpcy5zaW5ndWxhciAhPT0gJycgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IExhYmVsKCBzaW5ndWxhciwgdGhpcy5wbHVyYWwgKTtcblx0XHR9XG5cdFx0dGhpcy5zaW5ndWxhciA9IHNpbmd1bGFyO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZsdWlkIHNldHRlciBmb3Igc2V0dGluZyB0aGUgcGx1cmFsIHByb3BlcnR5XG5cdCAqXG5cdCAqIElmIHRoZSBwbHVyYWwgcHJvcGVydHkgaGFzIGFscmVhZHkgYmVlbiBzZXQsIHRoaXMgd2lsbCByZXR1cm4gYSBuZXdcblx0ICogaW5zdGFuY2Ugb2YgbGFiZWwuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwbHVyYWxcblx0ICogQHJldHVybiB7TGFiZWx9IEFuIGluc3RhbmNlIG9mIExhYmVsXG5cdCAqL1xuXHRzZXRQbHVyYWwoIHBsdXJhbCApIHtcblx0XHRMYWJlbC5hc3NlcnRTdHJpbmcoIHBsdXJhbCApO1xuXHRcdGlmICggdGhpcy5wbHVyYWwgIT09ICcnICkge1xuXHRcdFx0cmV0dXJuIG5ldyBMYWJlbCggdGhpcy5zaW5ndWxhciwgcGx1cmFsICk7XG5cdFx0fVxuXHRcdHRoaXMucGx1cmFsID0gcGx1cmFsO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0aGUgdmFsdWUgZm9yIHRoZSBwcm9wZXJ0eSBmb3JtYXR0ZWQgaW4gc2VudGVuY2UgY2FzZS5cblx0ICpcblx0ICogTm90ZSwgdGhpcyBzdHJpcHMgYW55IGAtYCBpbiBkYXNoZWQgbGFiZWxzLiAgU28gZm9yIGluc3RhbmNlIGlmIHlvdXJcblx0ICogbGFiZWwgdmFsdWUgd2FzIGBzb21ldGhpbmctZWxzZWAsIHRoZSB2YWx1ZSByZXR1cm5lZCB3b3VsZCBiZVxuXHQgKiBgU29tZXRoaW5nIEVsc2VgXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXIgIElmIHRydWUsIHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlIG9mIHRoZVxuXHQgKiBzaW5ndWxhciBwcm9wZXJ0eSBvdGhlcndpc2UgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlIHBsdXJhbFxuXHQgKiBwcm9wZXJ0eS5cblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5nIGluIHNlbnRlbmNlIGNhc2Vcblx0ICovXG5cdGFzU2VudGVuY2VDYXNlKCBzaW5ndWxhciA9IHRydWUgKSB7XG5cdFx0cmV0dXJuIHNpbmd1bGFyID09PSB0cnVlID9cblx0XHRcdHN0YXJ0Q2FzZSggdGhpcy5zaW5ndWxhci50b0xvd2VyQ2FzZSgpICkgOlxuXHRcdFx0c3RhcnRDYXNlKCB0aGlzLnBsdXJhbC50b0xvd2VyQ2FzZSgpICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5IGZvcm1hdHRlZCBpbiBsb3dlciBjYXNlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNpbmd1bGFyICBJZiB0cnVlLCByZXR1cm4gdGhlIGZvcm1hdHRlZCB2YWx1ZSBvZiB0aGVcblx0ICogc2luZ3VsYXIgcHJvcGVydHkgb3RoZXJ3aXNlIHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlIG9mIHRoZSBwbHVyYWxcblx0ICogcHJvcGVydHkuXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHN0cmluZyBpbiBsb3dlciBjYXNlXG5cdCAqL1xuXHRhc0xvd2VyQ2FzZSggc2luZ3VsYXIgPSB0cnVlICkge1xuXHRcdHJldHVybiBzaW5ndWxhciA/XG5cdFx0XHR0aGlzLnNpbmd1bGFyLnRvTG93ZXJDYXNlKCkgOlxuXHRcdFx0dGhpcy5wbHVyYWwudG9Mb3dlckNhc2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdGhlIHZhbHVlIGZvciB0aGUgcHJvcGVydHkgZm9ybWF0dGVkIGluIHVwcGVyIGNhc2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXIgIElmIHRydWUsIHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlIG9mIHRoZVxuXHQgKiBzaW5ndWxhciBwcm9wZXJ0eSBvdGhlcndpc2UgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlIHBsdXJhbFxuXHQgKiBwcm9wZXJ0eS5cblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5nIGluIHVwcGVyIGNhc2Vcblx0ICovXG5cdGFzVXBwZXJDYXNlKCBzaW5ndWxhciA9IHRydWUgKSB7XG5cdFx0cmV0dXJuIHNpbmd1bGFyID9cblx0XHRcdHRoaXMuc2luZ3VsYXIudG9VcHBlckNhc2UoKSA6XG5cdFx0XHR0aGlzLnBsdXJhbC50b1VwcGVyQ2FzZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0aGUgdmFsdWUgZm9yIHRoZSBwcm9wZXJ0eSBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvIHRoZSBwcm92aWRlZFxuXHQgKiBmb3JtYXRUeXBlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNpbmd1bGFyIElmIHRydWUsIHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlIG9mIHRoZVxuXHQgKiBzaW5ndWxhciBwcm9wZXJ0eSBvdGhlcndpc2UgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlIHBsdXJhbFxuXHQgKiBwcm9wZXJ0eS5cblx0ICogQHBhcmFtIHsoJ3NlbnRlbmNlJ3wnbG93ZXInfCd1cHBlcicpfSBmb3JtYXRUeXBlXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHN0cmluZyBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvIGZvcm1hdFR5cGVcblx0ICovXG5cdGFzRm9ybWF0dGVkKCBzaW5ndWxhciA9IHRydWUsIGZvcm1hdFR5cGUgPSBMYWJlbC5GT1JNQVRfU0VOVEVOQ0VfQ0FTRSApIHtcblx0XHRzd2l0Y2ggKCBmb3JtYXRUeXBlICkge1xuXHRcdFx0Y2FzZSBMYWJlbC5GT1JNQVRfU0VOVEVOQ0VfQ0FTRTpcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXNTZW50ZW5jZUNhc2UoIHNpbmd1bGFyICk7XG5cdFx0XHRjYXNlIExhYmVsLkZPUk1BVF9MT1dFUkNBU0U6XG5cdFx0XHRcdHJldHVybiB0aGlzLmFzTG93ZXJDYXNlKCBzaW5ndWxhciApO1xuXHRcdFx0Y2FzZSBMYWJlbC5GT1JNQVRfVVBQRVJDQVNFOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hc1VwcGVyQ2FzZSggc2luZ3VsYXIgKTtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHdhcm5pbmcoIGZhbHNlLCAnRm9ybWF0IHR5cGUgbXVzdCBiZSBvbmUgb2YgJyArXG5cdFx0XHRcdFx0J0xhYmVsLkZPUk1BVF9TRU5URU5DRV9DQVNFLCBMYWJlbC5GT1JNQVRfVVBQRVJDQVNFLCAnICtcblx0XHRcdFx0XHQnb3IgTGFiZWwuRk9STUFUX0xPV0VSQ0FTRScgKTtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXNTZW50ZW5jZUNhc2UoIHNpbmd1bGFyICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSBzdHJpbmcgb3Igbm90LlxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0U3RyaW5nKCB2YWx1ZSApIHtcblx0XHRpZiAoICEgaXNTdHJpbmcoIHZhbHVlICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnSW5jb21pbmcgbGFiZWwgdmFsdWUgKCcgKyB2YWx1ZSArICcpIG11c3QnICtcblx0XHRcdFx0JyBiZSBhIHN0cmluZycgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBMYWJlbCB0aGF0IGhhcyB0aGUgc2FtZSB2YWx1ZSBmb3Igc2luZ2x1YXIgYW5kXG5cdCAqIHBsdXJhbCBwcm9wZXJ0aWVzIGZvciB0aGUgcHJvdmlkZWQgYXJndW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbFxuXHQgKiBAcmV0dXJuIHtMYWJlbH0gIEEgTGFiZWwgaW5zdGFuY2Vcblx0ICovXG5cdHN0YXRpYyBmcm9tU2FtZVNpbmdsZUFuZFBsdXJhbCA9ICggbGFiZWwgKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBMYWJlbCggbGFiZWwsIGxhYmVsICk7XG5cdH1cbn1cbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBDdXJyZW5jeSB9IGZyb20gJy4vY3VycmVuY3knO1xuaW1wb3J0IHsgRGVjaW1hbCB9IGZyb20gJ2RlY2ltYWwuanMtbGlnaHQnO1xuaW1wb3J0ICogYXMgQWNjb3VudGluZyBmcm9tICdhY2NvdW50aW5nLWpzJztcbmltcG9ydCBpc1NoYWxsb3dFcXVhbCBmcm9tICdAd29yZHByZXNzL2lzLXNoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IHsgRXhjZXB0aW9uIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGluc3RhbmNlT2YgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcbmltcG9ydCB7IHNwcmludGYgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcblxuLyoqXG4gKiBBc3NlcnRzIGlmIGluY29taW5nIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIE1vbmV5XG4gKlxuICogQHBhcmFtIHtNb25leX0gbW9uZXlcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAqL1xuY29uc3QgYXNzZXJ0TW9uZXkgPSAoIG1vbmV5ICkgPT4ge1xuXHRpZiAoICEgKFxuXHRcdGluc3RhbmNlT2YoIG1vbmV5LCAnTW9uZXknIClcblx0KSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnSW5zdGFuY2Ugb2YgTW9uZXkgcmVxdWlyZWQnICk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyBpZiBpbmNvbWluZyB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBDdXJyZW5jeVxuICpcbiAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5XG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG4gKi9cbmNvbnN0IGFzc2VydEN1cnJlbmN5ID0gKCBjdXJyZW5jeSApID0+IHtcblx0aWYgKCAhIChcblx0XHRpbnN0YW5jZU9mKCBjdXJyZW5jeSwgJ0N1cnJlbmN5JyApXG5cdCkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ0luc3RhbmNlIG9mIEN1cnJlbmN5IHJlcXVpcmVkJyApO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgaWYgdHdvIGN1cnJlbmNpZXMgYXJlIHNoYWxsb3cgZXF1YWwuXG4gKlxuICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lBXG4gKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeUJcbiAqIEB0aHJvd3Mge0V4Y2VwdGlvbn1cbiAqL1xuY29uc3QgYXNzZXJ0U2FtZUN1cnJlbmN5ID0gKCBjdXJyZW5jeUEsIGN1cnJlbmN5QiApID0+IHtcblx0YXNzZXJ0Q3VycmVuY3koIGN1cnJlbmN5QSApO1xuXHRhc3NlcnRDdXJyZW5jeSggY3VycmVuY3lCICk7XG5cdGlmICggISBpc1NoYWxsb3dFcXVhbCggY3VycmVuY3lBLnRvSlNPTigpLCBjdXJyZW5jeUIudG9KU09OKCkgKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCAnUHJvdmlkZWQgY3VycmVuY2llcyBhcmUgbm90IGVxdWl2YWxlbnQuJyApO1xuXHR9XG59O1xuXG4vKipcbiAqIEEgVmFsdWUgb2JqZWN0IHJlcHJlc2VudGluZyBtb25leSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbmV5IHtcblx0LyoqXG5cdCAqIEludGVybmFsbHkgdGhlIGFtb3VudCBpcyBzdG9yZWQgYXMgYSBEZWNpbWFsIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAdHlwZSB7RGVjaW1hbH1cblx0ICovXG5cdGFtb3VudDtcblxuXHQvKipcblx0ICogSW50ZXJuYWxseSB0aGUgYW1vdW50IGlzIHN0b3JlZCBhcyBhIEN1cnJlbmN5IGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAdHlwZSB7Q3VycmVuY3l9XG5cdCAqL1xuXHRjdXJyZW5jeTtcblxuXHQvKipcblx0ICogRm9ybWF0dGVyIG9iamVjdCBmb3IgbW9uZXkgdmFsdWVzLlxuXHQgKlxuXHQgKiBAdHlwZSB7IHt9IH1cblx0ICovXG5cdGZvcm1hdHRlciA9IHt9O1xuXG5cdC8qKlxuXHQgKiBSb3VuZHMgYXdheSBmcm9tIHplcm9cblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9VUCA9IERlY2ltYWwuUk9VTkRfVVA7XG5cblx0LyoqXG5cdCAqIFJvdW5kcyB0b3dhcmRzIHplcm9cblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9ET1dOID0gRGVjaW1hbC5ST1VORF9ET1dOO1xuXG5cdC8qKlxuXHQgKiBSb3VuZHMgdG93YXJkcyBpbmZpbml0eVxuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIFJPVU5EX0NFSUwgPSBEZWNpbWFsLlJPVU5EX0NFSUw7XG5cblx0LyoqXG5cdCAqIFJvdW5kcyB0b3dhcmRzIC1JbmZpbml0eVxuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIFJPVU5EX0ZMT09SID0gRGVjaW1hbC5ST1VORF9GTE9PUjtcblxuXHQvKipcblx0ICogUm91bmRzIHRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCByb3VuZHMgYXdheSBmcm9tIHplcm8uXG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdGF0aWMgUk9VTkRfSEFMRl9VUCA9IERlY2ltYWwuUk9VTkRfSEFMRl9VUDtcblxuXHQvKipcblx0ICogUm91bmRzIHRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50IHJvdW5kcyB0b3dhcmRzIHplcm8uXG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdGF0aWMgUk9VTkRfSEFMRl9ET1dOID0gRGVjaW1hbC5ST1VORF9IQUxGX0RPV047XG5cblx0LyoqXG5cdCAqIFJvdW5kcyB0b3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLlxuXHQgKiBJZiBlcXVpZGlzdGFudCwgcm91bmRzIHRvd2FyZHMgZXZlbiBuZWlnaGJvdXIuXG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdGF0aWMgUk9VTkRfSEFMRl9FVkVOID0gRGVjaW1hbC5ST1VORF9IQUxGX0VWRU47XG5cblx0LyoqXG5cdCAqIENsYXNzIGNvbnN0cnVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBhbW91bnRcblx0ICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lcblx0ICovXG5cdGNvbnN0cnVjdG9yKCBhbW91bnQsIGN1cnJlbmN5ICkge1xuXHRcdHRoaXMuc2V0Q3VycmVuY3koIGN1cnJlbmN5IClcblx0XHRcdC5zZXRBbW91bnQoIGFtb3VudCApXG5cdFx0XHQuc2V0Rm9ybWF0dGVyKCk7XG5cdFx0T2JqZWN0LmZyZWV6ZSggdGhpcyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgY3VycmVuY3kgcHJvcGVydHlcblx0ICpcblx0ICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lcblx0ICogQHJldHVybiB7TW9uZXl9IEVpdGhlciB0aGlzIE1vbmV5IG9yIG5ldyBNb25leSBkZXBlbmRpbmcgb24gc3RhdGUgb2Zcblx0ICogcHJvcGVydHkuXG5cdCAqL1xuXHRzZXRDdXJyZW5jeSggY3VycmVuY3kgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0Q3VycmVuY3koIGN1cnJlbmN5ICk7XG5cdFx0Ly8gaWYgdGhlcmUncyBhbHJlYWR5IGEgY3VycmVuY3kgc2V0LCB0aGVuIHJldHVybiBhIG5ldyBvYmplY3QuXG5cdFx0aWYgKCBpbnN0YW5jZU9mKCB0aGlzLmN1cnJlbmN5LCAnQ3VycmVuY3knICkgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IE1vbmV5KCB0aGlzLmFtb3VudCwgY3VycmVuY3kgKTtcblx0XHR9XG5cdFx0dGhpcy5jdXJyZW5jeSA9IGN1cnJlbmN5O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgYW1vdW50IHByb3BlcnR5XG5cdCAqXG5cdCAqIEBwYXJhbSB7RGVjaW1hbHxudW1iZXJ8c3RyaW5nfSBhbW91bnRcblx0ICogQHJldHVybiB7TW9uZXl9IEVpdGhlciB0aGlzIE1vbmV5IG9yIG5ldyBNb25leSBkZXBlbmRpbmcgb24gc3RhdGUgb2YgdGhlXG5cdCAqIHByb3BlcnR5LlxuXHQgKi9cblx0c2V0QW1vdW50KCBhbW91bnQgKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSBpbnN0YW5jZU9mKCBhbW91bnQsICdEZWNpbWFsJyApID9cblx0XHRcdGFtb3VudC50b051bWJlcigpIDpcblx0XHRcdGFtb3VudDtcblx0XHQvLyBpZiB0aGVyZSdzIGFscmVhZHkgYW4gYW1vdW50IHNldCwgdGhlbiByZXR1cm4gYSBuZXcgb2JqZWN0LlxuXHRcdGlmICggaW5zdGFuY2VPZiggdGhpcy5hbW91bnQsICdEZWNpbWFsJyApICkge1xuXHRcdFx0cmV0dXJuIG5ldyBNb25leSggbmV3IERlY2ltYWwoIHZhbHVlICksIHRoaXMuY3VycmVuY3kgKTtcblx0XHR9XG5cdFx0dGhpcy5hbW91bnQgPSBuZXcgRGVjaW1hbCggdmFsdWUgKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIGZvcm1hdHRlciBmb3IgbW9uZXkgdmFsdWVzXG5cdCAqXG5cdCAqIEByZXR1cm4ge01vbmV5fSBBbiBpbnN0YW5jZSBvZiB0aGlzIG9iamVjdC5cblx0ICovXG5cdHNldEZvcm1hdHRlcigpIHtcblx0XHQvLyBvbmx5IGluaXRpYWxpemUgaWYgaXRzIG5vdCBhbHJlYWR5IGluaXRpYWxpemVkXG5cdFx0aWYgKCBpc0VtcHR5KCB0aGlzLmZvcm1hdHRlciApICkge1xuXHRcdFx0dGhpcy5mb3JtYXR0ZXIgPSB7IC4uLkFjY291bnRpbmcgfTtcblx0XHRcdHRoaXMuZm9ybWF0dGVyLnNldHRpbmdzID0ge1xuXHRcdFx0XHQuLi50aGlzLmZvcm1hdHRlci5zZXR0aW5ncyxcblx0XHRcdFx0Li4udGhpcy5jdXJyZW5jeS50b0FjY291bnRpbmdTZXR0aW5ncygpLmN1cnJlbmN5LFxuXHRcdFx0fTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBNb25leSBhcyBpdHMgc3VidW5pdHMuXG5cdCAqXG5cdCAqIEByZXR1cm4ge251bWJlcn0gSWYgdGhlIHN1YnVuaXRzIGlzIDEwMCBhbmQgdGhlIHZhbHVlIGlzIC40NSxcblx0ICogdGhpcyByZXR1cm5zIDQ1MFxuXHQgKi9cblx0dG9TdWJ1bml0cygpIHtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQudG9OdW1iZXIoKSAqIHRoaXMuY3VycmVuY3kuc3VidW5pdHM7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBtb25leSBvYmplY3QgZXF1YWxzIHRoaXMgbW9uZXkgb2JqZWN0LlxuXHQgKiBDb21wYXJlcyBib3RoIGFtb3VudCBhbmQgY3VycmVuY3kuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhpcyBpcyBlcXVhbC4gRmFsc2UgbWVhbnMgaXQgaXNuJ3QuXG5cdCAqL1xuXHRlcXVhbHMoIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydE1vbmV5KCBvdGhlciApO1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5lcXVhbHMoIG90aGVyLmFtb3VudCApICYmXG5cdFx0XHR0aGlzLmhhc1NhbWVDdXJyZW5jeSggb3RoZXIgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgcHJvdmlkZWQgTW9uZXkgb2JqZWN0J3MgQ3VycmVuY3kgZXF1YWxzIHRoaXMgTW9uZXlcblx0ICogb2JqZWN0J3MgQ3VycmVuY3kuXG5cdCAqXG5cdCAqIFRoaXMgZG9lcyBhIHNoYWxsb3cgY29tcGFyaXNvbiBvbiB0aGUgc2VyaWFsaXplZCB2YWx1ZXMgZm9yIHRoZSBjdXJyZW5jeVxuXHQgKiBvYmplY3RzLiAgVGhhdCB3YXkgaWYgdGhlIGN1cnJlbmNpZXMgYXJlIGRpZmZlcmVudCBpbnN0YW5jZXMsIGJ1dCBzaGFyZVxuXHQgKiB0aGUgc2FtZSBpbnRlcm5hbCB2YWx1ZSwgdGhleSBhcmUgY29uc2lkZXJlZCBlcXVhbC5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGUgY3VycmVuY2llcyBhcmUgZXF1YWwuXG5cdCAqL1xuXHRoYXNTYW1lQ3VycmVuY3koIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydE1vbmV5KCBvdGhlciApO1xuXHRcdHJldHVybiBpc1NoYWxsb3dFcXVhbChcblx0XHRcdHRoaXMuY3VycmVuY3kudG9KU09OKCksXG5cdFx0XHRvdGhlci5jdXJyZW5jeS50b0pTT04oKSxcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBvbmUgTW9uZXkgb2JqZWN0IHRvIHRoaXMgTW9uZXkgb2JqZWN0XG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge01vbmV5fSBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIE1vbmV5LlxuXHQgKi9cblx0YWRkKCBvdGhlciApIHtcblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSggdGhpcywgb3RoZXIgKTtcblx0XHRyZXR1cm4gbmV3IE1vbmV5KCB0aGlzLmFtb3VudC5wbHVzKCBvdGhlci5hbW91bnQgKSwgdGhpcy5jdXJyZW5jeSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFN1YnRyYWN0IG9uZSBNb25leSBvYmplY3QgZnJvbSB0aGlzIE1vbmV5IG9iamVjdFxuXHQgKlxuXHQgKiBAcGFyYW0ge01vbmV5fSBvdGhlclxuXHQgKiBAcmV0dXJuIHtNb25leX0gUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiBNb25leVxuXHQgKi9cblx0c3VidHJhY3QoIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydFVzaW5nU2FtZUN1cnJlbmN5KCB0aGlzLCBvdGhlciApO1xuXHRcdHJldHVybiBuZXcgTW9uZXkoIHRoaXMuYW1vdW50Lm1pbnVzKCBvdGhlci5hbW91bnQgKSwgdGhpcy5jdXJyZW5jeSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIE11bHRpcGx5IHRoaXMgbW9uZXkgb2JqZWN0IGJ5IHRoZSBwcm92aWRlZCBtdWx0aXBsaWVyIHZhbHVlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gbXVsdGlwbGllclxuXHQgKiBAcmV0dXJuIHtNb25leX0gUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiBNb25leVxuXHQgKi9cblx0bXVsdGlwbHkoIG11bHRpcGxpZXIgKSB7XG5cdFx0cmV0dXJuIG5ldyBNb25leSggdGhpcy5hbW91bnQudGltZXMoIG11bHRpcGxpZXIgKSwgdGhpcy5jdXJyZW5jeSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIERpdmlkZSB0aGlzIG1vbmV5IG9iamVjdCBieSB0aGUgcHJvdmlkZWQgZGl2aXNvciB2YWx1ZS5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9IGRpdmlzb3Jcblx0ICogQHJldHVybiB7TW9uZXl9IFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgTW9uZXlcblx0ICovXG5cdGRpdmlkZSggZGl2aXNvciApIHtcblx0XHRyZXR1cm4gbmV3IE1vbmV5KCB0aGlzLmFtb3VudC5kaXZpZGVkQnkoIGRpdmlzb3IgKSwgdGhpcy5jdXJyZW5jeSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFsbG9jYXRlcyBmdW5kIGJhc2VzIG9uIHRoZSByYXRpb3MgcHJvdmlkZWQgcmV0dXJuaW5nIGFuIGFycmF5IG9mIE1vbmV5XG5cdCAqIG9iamVjdHMgYXMgYSBwcm9kdWN0IG9mIHRoZSBhbGxvY2F0aW9uLlxuXHQgKlxuXHQgKiBFeGFtcGxlOiBzcGxpdHRpbmcgYSBwcm92aWRlZCBNb25leSBvYmplY3QgdGhyZWUgZXF1YWwgd2F5cy5cblx0ICpcblx0ICogYGBgXG5cdCAqIGNvbnN0IHNwbGl0TW9uZXkgPSBtb25leUluc3RhbmNlLmFsbG9jYXRlKCBbIDEsIDEsIDEgXSApO1xuXHQgKiBgYGBcblx0ICpcblx0ICogRXhhbXBsZTogc3BsaXR0aW5nIGEgcHJvdmlkZWQgTW9uZXkgb2JqZWN0IHR3byB3YXlzIHdpdGggb25lIGhhdmluZyA3NSVcblx0ICogb2YgdGhlIGFsbG9jYXRpb24uXG5cdCAqXG5cdCAqIGBgYFxuXHQgKiBjb25zdCBzcGxpdE1vbmV5ID0gbW9uZXlJbnN0YW5jZS5hbGxvY2F0ZSggWyA3NSwgMjUgXSApO1xuXHQgKiBgYGBcblx0ICpcblx0ICogTm90ZTogQXJyYXkgdmFsdWVzIGZvciByYXRpb3MgYXJlIHNpbXBseSB0b3RhbGxlZCBhbmQgdGhlbiBlYWNoIGVsZW1lbnRcblx0ICogaXMgY29uc2lkZXJlZCBhIGZyYWN0aW9uIG9mIHRoZSB0b3RhbCB2YWx1ZS4gIFNvIGhvdyB5b3Ugc3VibWl0IHJhdGlvXG5cdCAqIHZhbHVlcyBpcyB1cCB0byB5b3UgZm9yIHdoYXRldmVyIGlzIG1vc3QgY2xlYXIgdG8geW91LlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcltdfSByYXRpb3Ncblx0ICogQHJldHVybiB7TW9uZXlbXX0gQW4gYXJyYXkgb2YgTW9uZXkgb2JqZWN0c1xuXHQgKi9cblx0YWxsb2NhdGUoIHJhdGlvcyApIHtcblx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRjb25zdCByZXN1bHRzID0gW107XG5cdFx0Y29uc3QgY29udmVydGVkUmF0aW9zID0gW107XG5cdFx0bGV0IHJlbWFpbmRlciA9IG5ldyBEZWNpbWFsKCBzZWxmLnRvU3VidW5pdHMoKSApO1xuXHRcdGxldCB0b3RhbCA9IG5ldyBEZWNpbWFsKCAwICk7XG5cdFx0Ly8gY29udmVydCByYXRpb3MgdG8gZGVjaW1hbCBhbmQgZ2VuZXJhdGUgdG90YWwuXG5cdFx0cmF0aW9zLmZvckVhY2goICggcmF0aW8gKSA9PiB7XG5cdFx0XHRjb252ZXJ0ZWRSYXRpb3MucHVzaChcblx0XHRcdFx0aW5zdGFuY2VPZiggcmF0aW8sICdEZWNpbWFsJyApID8gcmF0aW8gOiBuZXcgRGVjaW1hbCggcmF0aW8gKSxcblx0XHRcdCk7XG5cdFx0XHR0b3RhbCA9IHRvdGFsLnBsdXMoIHJhdGlvICk7XG5cdFx0fSApO1xuXHRcdGNvbnZlcnRlZFJhdGlvcy5mb3JFYWNoKCAoIHJhdGlvICkgPT4ge1xuXHRcdFx0Y29uc3Qgc2hhcmUgPSBuZXcgRGVjaW1hbChcblx0XHRcdFx0TWF0aC5mbG9vcihcblx0XHRcdFx0XHRzZWxmLnRvU3VidW5pdHMoKSAqIHJhdGlvLnRvTnVtYmVyKCkgLyB0b3RhbC50b051bWJlcigpLFxuXHRcdFx0XHQpLFxuXHRcdFx0KTtcblx0XHRcdHJlc3VsdHMucHVzaChcblx0XHRcdFx0bmV3IE1vbmV5KFxuXHRcdFx0XHRcdHNoYXJlLmRpdmlkZWRCeSggdGhpcy5jdXJyZW5jeS5zdWJ1bml0cyApLFxuXHRcdFx0XHRcdHRoaXMuY3VycmVuY3ksXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdFx0cmVtYWluZGVyID0gcmVtYWluZGVyLm1pbnVzKCBzaGFyZSApO1xuXHRcdH0gKTtcblx0XHRmb3IgKCBsZXQgaSA9IDA7IHJlbWFpbmRlci5ncmVhdGVyVGhhbiggMCApOyBpKysgKSB7XG5cdFx0XHRyZXN1bHRzWyBpIF0gPSBuZXcgTW9uZXkoXG5cdFx0XHRcdChcblx0XHRcdFx0XHRuZXcgRGVjaW1hbCggcmVzdWx0c1sgaSBdLnRvU3VidW5pdHMoKSApXG5cdFx0XHRcdClcblx0XHRcdFx0XHQucGx1cyggMSApXG5cdFx0XHRcdFx0LmRpdmlkZWRCeSggdGhpcy5jdXJyZW5jeS5zdWJ1bml0cyApLFxuXHRcdFx0XHR0aGlzLmN1cnJlbmN5LFxuXHRcdFx0KTtcblx0XHRcdHJlbWFpbmRlciA9IHJlbWFpbmRlci5taW51cyggMSApO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wYXJlcyB0d28gaW5zdGFuY2VzIG9mIE1vbmV5LlxuXHQgKlxuXHQgKiBOb3RlOiBcInNhbWVcIiBtZWFucyBoYXMgZXF1YWwgdmFsdWUgYW5kIGVxdWFsIGN1cnJlbmN5LiAgSXQgZG9lcyBub3QgbWVhblxuXHQgKiBpZGVudGljYWwgaW5zdGFuY2VzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge01vbmV5fSBvdGhlclxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IDAgaWYgdGhleSBhcmUgdGhlIHNhbWUsIDEgaWYgdGhpcyBpcyBncmVhdGVyIHRoYW5cblx0ICogb3RoZXIgYW5kIC0xIGlmIG90aGVyIGlzIGdyZWF0ZXIgdGhhbiB0aGlzLlxuXHQgKi9cblx0Y29tcGFyZSggb3RoZXIgKSB7XG5cdFx0Ly9xdWlja2x5IHJldHVybiAwIGlmIGlkZW50aWNhbFxuXHRcdGlmICggdGhpcyA9PT0gb3RoZXIgKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cdFx0TW9uZXkuYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3koIHRoaXMsIG90aGVyICk7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmNvbXBhcmVkVG8oIG90aGVyLmFtb3VudCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhcmVzIHdoZXRoZXIgdGhpcyBNb25leSBvYmplY3QgaXMgZ3JlYXRlciB0aGFuIHRoZSBvdGhlciBNb25leVxuXHQgKiBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGlzIGlzIGdyZWF0ZXIgdGhhbiBvdGhlci5cblx0ICovXG5cdGdyZWF0ZXJUaGFuKCBvdGhlciApIHtcblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSggdGhpcywgb3RoZXIgKTtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQuZ3JlYXRlclRoYW4oIG90aGVyLmFtb3VudCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhcmVzIHdoZXRoZXIgdGhpcyBNb25leSBvYmplY3QgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBvdGhlclxuXHQgKiBNb25leSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGlzIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGVcblx0ICogICAgIG90aGVyLlxuXHQgKi9cblx0Z3JlYXRlclRoYW5PckVxdWFsVG8oIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydFVzaW5nU2FtZUN1cnJlbmN5KCB0aGlzLCBvdGhlciApO1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5ncmVhdGVyVGhhbk9yRXF1YWxUbyggb3RoZXIuYW1vdW50ICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgd2hldGhlciB0aGlzIE1vbmV5IG9iamVjdCBpcyBsZXNzIHRoYW4gdGhlIG90aGVyIE1vbmV5IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoaXMgaXMgbGVzcyB0aGFuIG90aGVyXG5cdCAqL1xuXHRsZXNzVGhhbiggb3RoZXIgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3koIHRoaXMsIG90aGVyICk7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50Lmxlc3NUaGFuKCBvdGhlci5hbW91bnQgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wYXJlcyB3aGV0aGVyIHRoaXMgTW9uZXkgb2JqZWN0IGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgb3RoZXJcblx0ICogTW9uZXkgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge01vbmV5fSBvdGhlclxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBJZiB0cnVlIHRoZW4gdGhpcyBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gb3RoZXIuXG5cdCAqL1xuXHRsZXNzVGhhbk9yRXF1YWxUbyggb3RoZXIgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3koIHRoaXMsIG90aGVyICk7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50Lmxlc3NUaGFuT3JFcXVhbFRvKCBvdGhlci5hbW91bnQgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhpcyBvYmplY3QgaGFzIHRoZSB2YWx1ZSBvZiAwXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGUgdmFsdWUgaXMgMC5cblx0ICovXG5cdGlzWmVybygpIHtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQuaXNaZXJvKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoZSB2YWx1ZSBpbiB0aGlzIE1vbmV5IG9iamVjdCBpcyBuZWdhdGl2ZS5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoZSB2YWx1ZSBpcyBuZWdhdGl2ZS5cblx0ICovXG5cdGlzTmVnYXRpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmlzTmVnYXRpdmUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhlIHZhbHVlIGluIHRoaXMgTW9uZXkgb2JqZWN0IGlzIHBvc2l0aXZlLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBJZiB0cnVlIHRoZW4gdGhlIHZhbHVlIGlzIHBvc2l0aXZlLlxuXHQgKi9cblx0aXNQb3NpdGl2ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQuaXNQb3NpdGl2ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoaXMgTW9uZXkgb2JqZWN0IGFzIGEgbnVtYmVyIHByaW1pdGl2ZS5cblx0ICpcblx0ICogQHJldHVybiB7bnVtYmVyfSBSZXR1cm5zIGEgbnVtYmVyLlxuXHQgKi9cblx0dG9OdW1iZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LnRvTnVtYmVyKCk7XG5cdH1cblxuXHQvKipcblx0ICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoaXMgTW9uZXkgb2JqZWN0IGluIG5vcm1hbCAoZml4ZWQtcG9pbnQpIG5vdGF0aW9uXG5cdCAqIHJvdW5kZWQgdG8gYGRlY2ltYWxQbGFjZXNgIHVzaW5nIGByb3VuZGluZ2AgbW9kZS5cblx0ICpcblx0ICogSWYgdGhlIHZhbHVlIG9mIHRoaXMgaW5zdGFuY2UgaW4gbm9ybWFsIG5vdGF0aW9uIGhhcyBmZXdlciB0aGFuXG5cdCAqIGRlY2ltYWxQbGFjZXMgZnJhY3Rpb24gZGlnaXRzLCB0aGUgcmV0dXJuIHZhbHVlIHdpbGwgYmUgYXBwZW5kZWQgd2l0aFxuXHQgKiB6ZXJvcyBhY2NvcmRpbmdseS5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IGRlY2ltYWxQbGFjZXMgVGhlIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyB0byByb3VuZCB0by5cblx0ICogSWYgbm90IHByb3ZpZGVkIHVzZXMgdGhlIGludGVybmFsIGRlY2ltYWwgcGxhY2UgdmFsdWUuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSByb3VuZGluZyBXaGF0IHJvdW5kaW5nIHR5cGUgdG8gdXNlICgwLTgpLiAgVXNlIE1vbmV5XG5cdCAqICAgICBST1VORCBjb25zdGFudHMuICBEZWZhdWx0cyB0byBNb25leS5ST1VORF9IQUxGX1VQXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgTW9uZXlcblx0ICogaW4gbm9ybWFsIChmaXhlZC1wb2ludCkgbm90YXRpb24gcm91bmRlZCB0byBkZWNpbWFsIHBsYWNlcyB1c2luZ1xuXHQgKiByb3VuZGluZyBtb2RlLlxuXHQgKi9cblx0dG9GaXhlZCggZGVjaW1hbFBsYWNlcywgcm91bmRpbmcgPSBNb25leS5ST1VORF9IQUxGX1VQICkge1xuXHRcdGRlY2ltYWxQbGFjZXMgPSBkZWNpbWFsUGxhY2VzIHx8IHRoaXMuY3VycmVuY3kuZGVjaW1hbFBsYWNlcztcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQudG9GaXhlZCggZGVjaW1hbFBsYWNlcywgcm91bmRpbmcgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgbmV3IE1vbmV5IHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIE1vbmV5IHJvdW5kZWRcblx0ICogdG8gYSB3aG9sZSBudW1iZXIgdXNpbmcgcm91bmRpbmcgbW9kZSByb3VuZGluZyBzZXQgb24gdGhlIG9yaWdpbmFsXG5cdCAqIERlY2ltYWwgYW1vdW50LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtNb25leX0gQSBuZXcgTW9uZXkgb2JqZWN0XG5cdCAqL1xuXHR0b0ludGVnZXJNb25leSgpIHtcblx0XHRyZXR1cm4gbmV3IE1vbmV5KFxuXHRcdFx0dGhpcy5hbW91bnQudG9JbnRlZ2VyKCksXG5cdFx0XHR0aGlzLmN1cnJlbmN5LFxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBNb25leSBvYmplY3QgYXMgYSBmb3JtYXR0ZWQgc3RyaW5nIGFjY29yZGluZ1xuXHQgKiB0byB0aGUgY3VycmVuY3kgY29uZmlndXJhdGlvbi5cblx0ICpcblx0ICogQHJldHVybiB7c3RyaW5nfSBSZXR1cm5zIGEgZm9ybWF0dGVkIHN0cmluZyBhY2NvcmRpbmcgdG8gQ3VycmVuY3kuXG5cdCAqL1xuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXR0ZXIuZm9ybWF0KFxuXHRcdFx0dGhpcy5hbW91bnQudG9OdW1iZXIoKSxcblx0XHRcdHRoaXMuZm9ybWF0dGVyLnNldHRpbmdzLFxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQHJldHVybiB7IE9iamVjdCB9IFJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGUgc2VyaWFsaXplZFxuXHQgKiB2YWx1ZSBvZiB0aGlzIG9iamVjdC5cblx0ICovXG5cdHRvSlNPTigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0YW1vdW50OiB0aGlzLmFtb3VudC50b0pTT04oKSxcblx0XHRcdGN1cnJlbmN5OiB0aGlzLmN1cnJlbmN5LnRvSlNPTigpLFxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyBpZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgTW9uZXkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG1vbmV5XG5cdCAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cblx0ICovXG5cdHN0YXRpYyBhc3NlcnRNb25leSA9ICggbW9uZXkgKSA9PiB7XG5cdFx0YXNzZXJ0TW9uZXkoIG1vbmV5ICk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIEN1cnJlbmN5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeVxuXHQgKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0Q3VycmVuY3kgPSAoIGN1cnJlbmN5ICkgPT4ge1xuXHRcdGFzc2VydEN1cnJlbmN5KCBjdXJyZW5jeSApO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIGlmIHRoZSBwcm92aWRlZCB2YWx1ZXMgYXJlIGJvdGggTW9uZXkgb2JqZWN0cyBhbmQgaGF2ZSBFcXVhbFxuXHQgKiBDdXJyZW5jeSBvYmplY3RzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge01vbmV5fSB0aGlzTW9uZXlcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJNb25leVxuXHQgKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3kgPSAoIHRoaXNNb25leSwgb3RoZXJNb25leSApID0+IHtcblx0XHRhc3NlcnRNb25leSggdGhpc01vbmV5ICk7XG5cdFx0YXNzZXJ0TW9uZXkoIG90aGVyTW9uZXkgKTtcblx0XHRhc3NlcnRTYW1lQ3VycmVuY3koIHRoaXNNb25leS5jdXJyZW5jeSwgb3RoZXJNb25leS5jdXJyZW5jeSApO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIGlmIHR3byBjdXJyZW5jaWVzIGFyZSBzaGFsbG93IGVxdWFsLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeUFcblx0ICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lCXG5cdCAqIEB0aHJvd3Mge0V4Y2VwdGlvbn1cblx0ICovXG5cdHN0YXRpYyBhc3NlcnRTYW1lQ3VycmVuY3kgPSAoIGN1cnJlbmN5QSwgY3VycmVuY3lCICkgPT4ge1xuXHRcdGFzc2VydFNhbWVDdXJyZW5jeSggY3VycmVuY3lBLCBjdXJyZW5jeUIgKTtcblx0fTtcblxuXHQvKipcblx0ICogUmVjZWl2ZXMgYW4gaW5jb21pbmcgdmFsdWUgdGhhdCBjb3VsZCBiZSBhIG1vbmV5IGZvcm1hdHRlZFxuXHQgKiBzdHJpbmcgYW5kIHJldHVybnMgYSBNb25leSB2YWx1ZSBvYmplY3Qgd2l0aCB0aGUgY29ycmVjdCB2YWx1ZVxuXHQgKiBjb25zaWRlcmluZyB0aGUgcHJvdmlkZWQgY3VycmVuY3kuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gbW9uZXlWYWx1ZVxuXHQgKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtNb25leX0gQW4gaW5zdGFuY2Ugb2YgYSBtb25leSB2YWx1ZSBvYmplY3Rcblx0ICovXG5cdHN0YXRpYyBmcm9tTW9uZXlWYWx1ZSA9ICggbW9uZXlWYWx1ZSwgY3VycmVuY3kgKSA9PiB7XG5cdFx0YXNzZXJ0Q3VycmVuY3koIGN1cnJlbmN5ICk7XG5cdFx0Ly8gZGV0ZWN0IGlmIGluY29taW5nIHZhbHVlIGhhcyBhIGN1cnJlbmN5IHNpZ24gbm90IG1hdGNoaW5nIHByb3ZpZGVkXG5cdFx0Ly8gY3VycmVuY3kuICBUaGlzIGRvZXNuJ3QgcHJvdmlkZSBmdWxsIHByb3RlY3Rpb24gZnJvbSBpbXByb3BlclxuXHRcdC8vIHZhbHVlcyBzZW50IGluIGJ1dCBpcyBhbiBpbml0aWFsIHNhZmVndWFyZC5cblx0XHRpZiAoIHR5cGVvZiBtb25leVZhbHVlID09PSAnc3RyaW5nJyApIHtcblx0XHRcdGNvbnN0IG1hdGNoID0gbW9uZXlWYWx1ZS5tYXRjaCggL1teXFxkXFwuXFwsXFxzXSsvICk7XG5cdFx0XHRpZiAoIG1hdGNoICYmIG1hdGNoWyAwIF0gIT09IGN1cnJlbmN5LnNpZ24gKSB7XG5cdFx0XHRcdC8vIFRoZSBmaXJzdCBlcnJvciBtZXNzYWdlIGlzIHVzZWQgaWYgd2UgaGF2ZSBqdXN0IG9uZSBjaGFyYWN0ZXJcblx0XHRcdFx0Ly8gcmV0dXJuZWQgd2hpY2ggaXMgbGlrZWx5IHRoZSBjdXJyZW5jeSBzeW1ib2wuICBPdGhlcndpc2UsXG5cdFx0XHRcdC8vIGdpdmUgYSBtb3JlIGdlbmVyaWMgbWVzc2FnZS5cblx0XHRcdFx0Y29uc3QgbWVzc2FnZSA9IG1hdGNoWyAwIF0ubGVuZ3RoID09PSAxID9cblx0XHRcdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHRcdFx0J1RoZSBwcm92aWRlZCBtb25leSB2YWx1ZSBoYXMgYSAlMSRzIHNpZ24gaW4gaXQsIGJ1dCB0aGUgcHJvdmlkZWQgY3VycmVuY3kgdmFsdWUgb2JqZWN0IGRlZmluZXMgJTIkcyBhcyB0aGUgY3VycmVuY3kgc2lnbi4nLFxuXHRcdFx0XHRcdFx0bWF0Y2hbIDAgXSxcblx0XHRcdFx0XHRcdGN1cnJlbmN5LnNpZ24sXG5cdFx0XHRcdFx0KSA6XG5cdFx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHRcdCdUaGUgcHJvdmlkZWQgbW9uZXkgdmFsdWUgaGFzIG5vbiBudW1lcmljIHN0cmluZ3MgaW4gaXQgKCUxJHMpLCBwbGVhc2UgZG91YmxlLWNoZWNrIHRoZSB2YWx1ZS4nLFxuXHRcdFx0XHRcdFx0bWF0Y2hbIDAgXSxcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggbWVzc2FnZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBzZXQgdGhlIGluaXRpYWwgdmFsdWUgb2JqZWN0IHVzaW5nIHRoZSBjdXJyZW5jeVxuXHRcdGNvbnN0IG1vbmV5ID0gbmV3IE1vbmV5KCAwLCBjdXJyZW5jeSApO1xuXHRcdC8vIHNldCBhIG5ldyB2YWx1ZSB1c2luZyB0aGUgcGFyc2Ugb24gdGhlIGZvcm1hdHRlci5cblx0XHRyZXR1cm4gbW9uZXkuc2V0QW1vdW50KCBtb25leS5mb3JtYXR0ZXIucGFyc2UoIG1vbmV5VmFsdWUgKSApO1xuXHR9O1xufVxuIiwiZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXM7IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBpc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTtcbiAgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTtcblxuICB0cnkge1xuICAgIERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoRGF0ZSwgW10sIGZ1bmN0aW9uICgpIHt9KSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7XG4gIGlmIChpc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2NvbnN0cnVjdCA9IFJlZmxlY3QuY29uc3RydWN0O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2NvbnN0cnVjdCA9IGZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICAgICAgdmFyIGEgPSBbbnVsbF07XG4gICAgICBhLnB1c2guYXBwbHkoYSwgYXJncyk7XG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSBGdW5jdGlvbi5iaW5kLmFwcGx5KFBhcmVudCwgYSk7XG4gICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoKTtcbiAgICAgIGlmIChDbGFzcykgc2V0UHJvdG90eXBlT2YoaW5zdGFuY2UsIENsYXNzLnByb3RvdHlwZSk7XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfY29uc3RydWN0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NvbnN0cnVjdDsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJ2YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9nZXRQcm90b3R5cGVPZlwiKTtcblxudmFyIHN1cGVyUHJvcEJhc2UgPSByZXF1aXJlKFwiLi9zdXBlclByb3BCYXNlXCIpO1xuXG5mdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBSZWZsZWN0LmdldCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2dldCA9IFJlZmxlY3QuZ2V0O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2dldCA9IGZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgIHZhciBiYXNlID0gc3VwZXJQcm9wQmFzZSh0YXJnZXQsIHByb3BlcnR5KTtcbiAgICAgIGlmICghYmFzZSkgcmV0dXJuO1xuICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIHByb3BlcnR5KTtcblxuICAgICAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgICAgIHJldHVybiBkZXNjLmdldC5jYWxsKHJlY2VpdmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyIHx8IHRhcmdldCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldDsiLCJmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2Y7IiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVyKSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIikgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheTsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVTcHJlYWQ7IiwidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgPSByZXF1aXJlKFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIik7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm47IiwiZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2Y7IiwidmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vZ2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9zdXBlclByb3BCYXNlKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgd2hpbGUgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICBvYmplY3QgPSBnZXRQcm90b3R5cGVPZihvYmplY3QpO1xuICAgIGlmIChvYmplY3QgPT09IG51bGwpIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc3VwZXJQcm9wQmFzZTsiLCJ2YXIgYXJyYXlXaXRob3V0SG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhvdXRIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheVwiKTtcblxudmFyIG5vbkl0ZXJhYmxlU3ByZWFkID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVTcHJlYWRcIik7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdG9Db25zdW1hYmxlQXJyYXk7IiwiZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2YyKG9iaik7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuXHQoZmFjdG9yeSgoZ2xvYmFsLmFjY291bnRpbmcgPSBnbG9iYWwuYWNjb3VudGluZyB8fCB7fSkpKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG5cdGZ1bmN0aW9uIF9fY29tbW9uanMoZm4sIG1vZHVsZSkgeyByZXR1cm4gbW9kdWxlID0geyBleHBvcnRzOiB7fSB9LCBmbihtb2R1bGUsIG1vZHVsZS5leHBvcnRzKSwgbW9kdWxlLmV4cG9ydHM7IH1cblxuXHQvKipcblx0ICogVGhlIGxpYnJhcnkncyBzZXR0aW5ncyBjb25maWd1cmF0aW9uIG9iamVjdC5cblx0ICpcblx0ICogQ29udGFpbnMgZGVmYXVsdCBwYXJhbWV0ZXJzIGZvciBjdXJyZW5jeSBhbmQgbnVtYmVyIGZvcm1hdHRpbmdcblx0ICovXG5cdHZhciBzZXR0aW5ncyA9IHtcblx0ICBzeW1ib2w6ICckJywgLy8gZGVmYXVsdCBjdXJyZW5jeSBzeW1ib2wgaXMgJyQnXG5cdCAgZm9ybWF0OiAnJXMldicsIC8vIGNvbnRyb2xzIG91dHB1dDogJXMgPSBzeW1ib2wsICV2ID0gdmFsdWUgKGNhbiBiZSBvYmplY3QsIHNlZSBkb2NzKVxuXHQgIGRlY2ltYWw6ICcuJywgLy8gZGVjaW1hbCBwb2ludCBzZXBhcmF0b3Jcblx0ICB0aG91c2FuZDogJywnLCAvLyB0aG91c2FuZHMgc2VwYXJhdG9yXG5cdCAgcHJlY2lzaW9uOiAyLCAvLyBkZWNpbWFsIHBsYWNlc1xuXHQgIGdyb3VwaW5nOiAzLCAvLyBkaWdpdCBncm91cGluZyAobm90IGltcGxlbWVudGVkIHlldClcblx0ICBzdHJpcFplcm9zOiBmYWxzZSwgLy8gc3RyaXAgaW5zaWduaWZpY2FudCB6ZXJvcyBmcm9tIGRlY2ltYWwgcGFydFxuXHQgIGZhbGxiYWNrOiAwIC8vIHZhbHVlIHJldHVybmVkIG9uIHVuZm9ybWF0KCkgZmFpbHVyZVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBUYWtlcyBhIHN0cmluZy9hcnJheSBvZiBzdHJpbmdzLCByZW1vdmVzIGFsbCBmb3JtYXR0aW5nL2NydWZ0IGFuZCByZXR1cm5zIHRoZSByYXcgZmxvYXQgdmFsdWVcblx0ICogQWxpYXM6IGBhY2NvdW50aW5nLnBhcnNlKHN0cmluZylgXG5cdCAqXG5cdCAqIERlY2ltYWwgbXVzdCBiZSBpbmNsdWRlZCBpbiB0aGUgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIGZsb2F0cyAoZGVmYXVsdHMgdG9cblx0ICogYWNjb3VudGluZy5zZXR0aW5ncy5kZWNpbWFsKSwgc28gaWYgdGhlIG51bWJlciB1c2VzIGEgbm9uLXN0YW5kYXJkIGRlY2ltYWxcblx0ICogc2VwYXJhdG9yLCBwcm92aWRlIGl0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQuXG5cdCAqXG5cdCAqIEFsc28gbWF0Y2hlcyBicmFja2V0ZWQgbmVnYXRpdmVzIChlZy4gJyQgKDEuOTkpJyA9PiAtMS45OSlcblx0ICpcblx0ICogRG9lc24ndCB0aHJvdyBhbnkgZXJyb3JzIChgTmFOYHMgYmVjb21lIDApIGJ1dCB0aGlzIG1heSBjaGFuZ2UgaW4gZnV0dXJlXG5cdCAqXG5cdCAqIGBgYGpzXG5cdCAqICBhY2NvdW50aW5nLnVuZm9ybWF0KFwiwqMgMTIsMzQ1LDY3OC45MCBHQlBcIik7IC8vIDEyMzQ1Njc4Ljlcblx0ICogYGBgXG5cdCAqXG5cdCAqIEBtZXRob2QgdW5mb3JtYXRcblx0ICogQGZvciBhY2NvdW50aW5nXG5cdCAqIEBwYXJhbSB7U3RyaW5nfEFycmF5PFN0cmluZz59IHZhbHVlIFRoZSBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5ncyBjb250YWluaW5nIHRoZSBudW1iZXIvcyB0byBwYXJzZS5cblx0ICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgICAgICAgZGVjaW1hbCBOdW1iZXIgb2YgZGVjaW1hbCBkaWdpdHMgb2YgdGhlIHJlc3VsdGFudCBudW1iZXJcblx0ICogQHJldHVybiB7RmxvYXR9IFRoZSBwYXJzZWQgbnVtYmVyXG5cdCAqL1xuXHRmdW5jdGlvbiB1bmZvcm1hdCh2YWx1ZSkge1xuXHQgIHZhciBkZWNpbWFsID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gc2V0dGluZ3MuZGVjaW1hbCA6IGFyZ3VtZW50c1sxXTtcblx0ICB2YXIgZmFsbGJhY2sgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBzZXR0aW5ncy5mYWxsYmFjayA6IGFyZ3VtZW50c1syXTtcblxuXHQgIC8vIFJlY3Vyc2l2ZWx5IHVuZm9ybWF0IGFycmF5czpcblx0ICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0ICAgIHJldHVybiB2YWx1ZS5tYXAoZnVuY3Rpb24gKHZhbCkge1xuXHQgICAgICByZXR1cm4gdW5mb3JtYXQodmFsLCBkZWNpbWFsLCBmYWxsYmFjayk7XG5cdCAgICB9KTtcblx0ICB9XG5cblx0ICAvLyBSZXR1cm4gdGhlIHZhbHVlIGFzLWlzIGlmIGl0J3MgYWxyZWFkeSBhIG51bWJlcjpcblx0ICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykgcmV0dXJuIHZhbHVlO1xuXG5cdCAgLy8gQnVpbGQgcmVnZXggdG8gc3RyaXAgb3V0IGV2ZXJ5dGhpbmcgZXhjZXB0IGRpZ2l0cywgZGVjaW1hbCBwb2ludCBhbmQgbWludXMgc2lnbjpcblx0ICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCdbXjAtOS0oLSktJyArIGRlY2ltYWwgKyAnXScsIFsnZyddKTtcblx0ICB2YXIgdW5mb3JtYXR0ZWRWYWx1ZVN0cmluZyA9ICgnJyArIHZhbHVlKS5yZXBsYWNlKHJlZ2V4LCAnJykgLy8gc3RyaXAgb3V0IGFueSBjcnVmdFxuXHQgIC5yZXBsYWNlKGRlY2ltYWwsICcuJykgLy8gbWFrZSBzdXJlIGRlY2ltYWwgcG9pbnQgaXMgc3RhbmRhcmRcblx0ICAucmVwbGFjZSgvXFwoKFstXSpcXGQqW14pXT9cXGQrKVxcKS9nLCAnLSQxJykgLy8gcmVwbGFjZSBicmFja2V0ZWQgdmFsdWVzIHdpdGggbmVnYXRpdmVzXG5cdCAgLnJlcGxhY2UoL1xcKCguKilcXCkvLCAnJyk7IC8vIHJlbW92ZSBhbnkgYnJhY2tldHMgdGhhdCBkbyBub3QgaGF2ZSBudW1lcmljIHZhbHVlXG5cblx0ICAvKipcblx0ICAgKiBIYW5kbGluZyAtdmUgbnVtYmVyIGFuZCBicmFja2V0LCBlZy5cblx0ICAgKiAoLTEwMCkgPSAxMDAsIC0oMTAwKSA9IDEwMCwgLS0xMDAgPSAxMDBcblx0ICAgKi9cblx0ICB2YXIgbmVnYXRpdmUgPSAodW5mb3JtYXR0ZWRWYWx1ZVN0cmluZy5tYXRjaCgvLS9nKSB8fCAyKS5sZW5ndGggJSAyLFxuXHQgICAgICBhYnNVbmZvcm1hdHRlZCA9IHBhcnNlRmxvYXQodW5mb3JtYXR0ZWRWYWx1ZVN0cmluZy5yZXBsYWNlKC8tL2csICcnKSksXG5cdCAgICAgIHVuZm9ybWF0dGVkID0gYWJzVW5mb3JtYXR0ZWQgKiAobmVnYXRpdmUgPyAtMSA6IDEpO1xuXG5cdCAgLy8gVGhpcyB3aWxsIGZhaWwgc2lsZW50bHkgd2hpY2ggbWF5IGNhdXNlIHRyb3VibGUsIGxldCdzIHdhaXQgYW5kIHNlZTpcblx0ICByZXR1cm4gIWlzTmFOKHVuZm9ybWF0dGVkKSA/IHVuZm9ybWF0dGVkIDogZmFsbGJhY2s7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgYW5kIG5vcm1hbGlzZSB0aGUgdmFsdWUgb2YgcHJlY2lzaW9uIChtdXN0IGJlIHBvc2l0aXZlIGludGVnZXIpXG5cdCAqL1xuXHRmdW5jdGlvbiBfY2hlY2tQcmVjaXNpb24odmFsLCBiYXNlKSB7XG5cdCAgdmFsID0gTWF0aC5yb3VuZChNYXRoLmFicyh2YWwpKTtcblx0ICByZXR1cm4gaXNOYU4odmFsKSA/IGJhc2UgOiB2YWw7XG5cdH1cblxuXHQvKipcblx0ICogSW1wbGVtZW50YXRpb24gb2YgdG9GaXhlZCgpIHRoYXQgdHJlYXRzIGZsb2F0cyBtb3JlIGxpa2UgZGVjaW1hbHNcblx0ICpcblx0ICogRml4ZXMgYmluYXJ5IHJvdW5kaW5nIGlzc3VlcyAoZWcuICgwLjYxNSkudG9GaXhlZCgyKSA9PT0gJzAuNjEnKSB0aGF0IHByZXNlbnRcblx0ICogcHJvYmxlbXMgZm9yIGFjY291bnRpbmctIGFuZCBmaW5hbmNlLXJlbGF0ZWQgc29mdHdhcmUuXG5cdCAqXG5cdCAqIGBgYGpzXG5cdCAqICAoMC42MTUpLnRvRml4ZWQoMik7ICAgICAgICAgICAvLyBcIjAuNjFcIiAobmF0aXZlIHRvRml4ZWQgaGFzIHJvdW5kaW5nIGlzc3Vlcylcblx0ICogIGFjY291bnRpbmcudG9GaXhlZCgwLjYxNSwgMik7IC8vIFwiMC42MlwiXG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBAbWV0aG9kIHRvRml4ZWRcblx0ICogQGZvciBhY2NvdW50aW5nXG5cdCAqIEBwYXJhbSB7RmxvYXR9ICAgdmFsdWUgICAgICAgICBUaGUgZmxvYXQgdG8gYmUgdHJlYXRlZCBhcyBhIGRlY2ltYWwgbnVtYmVyLlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW3ByZWNpc2lvbj0yXSBUaGUgbnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzIHRvIGtlZXAuXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGdpdmVuIG51bWJlciB0cmFuc2Zvcm1lZCBpbnRvIGEgc3RyaW5nIHdpdGggdGhlIGdpdmVuIHByZWNpc3Npb25cblx0ICovXG5cdGZ1bmN0aW9uIHRvRml4ZWQodmFsdWUsIHByZWNpc2lvbikge1xuXHQgIHByZWNpc2lvbiA9IF9jaGVja1ByZWNpc2lvbihwcmVjaXNpb24sIHNldHRpbmdzLnByZWNpc2lvbik7XG5cdCAgdmFyIHBvd2VyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbik7XG5cblx0ICAvLyBNdWx0aXBseSB1cCBieSBwcmVjaXNpb24sIHJvdW5kIGFjY3VyYXRlbHksIHRoZW4gZGl2aWRlIGFuZCB1c2UgbmF0aXZlIHRvRml4ZWQoKTpcblx0ICByZXR1cm4gKE1hdGgucm91bmQoKHZhbHVlICsgMWUtOCkgKiBwb3dlcikgLyBwb3dlcikudG9GaXhlZChwcmVjaXNpb24pO1xuXHR9XG5cblx0dmFyIGluZGV4ID0gX19jb21tb25qcyhmdW5jdGlvbiAobW9kdWxlKSB7XG5cdC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblx0dmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cdGZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRcdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE9iamVjdCh2YWwpO1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHRcdHZhciBmcm9tO1xuXHRcdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdFx0dmFyIHN5bWJvbHM7XG5cblx0XHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0XHRzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0bztcblx0fTtcblx0fSk7XG5cblx0dmFyIG9iamVjdEFzc2lnbiA9IChpbmRleCAmJiB0eXBlb2YgaW5kZXggPT09ICdvYmplY3QnICYmICdkZWZhdWx0JyBpbiBpbmRleCA/IGluZGV4WydkZWZhdWx0J10gOiBpbmRleCk7XG5cblx0ZnVuY3Rpb24gX3N0cmlwSW5zaWduaWZpY2FudFplcm9zKHN0ciwgZGVjaW1hbCkge1xuXHQgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdChkZWNpbWFsKTtcblx0ICB2YXIgaW50ZWdlclBhcnQgPSBwYXJ0c1swXTtcblx0ICB2YXIgZGVjaW1hbFBhcnQgPSBwYXJ0c1sxXS5yZXBsYWNlKC8wKyQvLCAnJyk7XG5cblx0ICBpZiAoZGVjaW1hbFBhcnQubGVuZ3RoID4gMCkge1xuXHQgICAgcmV0dXJuIGludGVnZXJQYXJ0ICsgZGVjaW1hbCArIGRlY2ltYWxQYXJ0O1xuXHQgIH1cblxuXHQgIHJldHVybiBpbnRlZ2VyUGFydDtcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3JtYXQgYSBudW1iZXIsIHdpdGggY29tbWEtc2VwYXJhdGVkIHRob3VzYW5kcyBhbmQgY3VzdG9tIHByZWNpc2lvbi9kZWNpbWFsIHBsYWNlc1xuXHQgKiBBbGlhczogYGFjY291bnRpbmcuZm9ybWF0KClgXG5cdCAqXG5cdCAqIExvY2FsaXNlIGJ5IG92ZXJyaWRpbmcgdGhlIHByZWNpc2lvbiBhbmQgdGhvdXNhbmQgLyBkZWNpbWFsIHNlcGFyYXRvcnNcblx0ICpcblx0ICogYGBganNcblx0ICogYWNjb3VudGluZy5mb3JtYXROdW1iZXIoNTMxODAwOCk7ICAgICAgICAgICAgICAvLyA1LDMxOCwwMDhcblx0ICogYWNjb3VudGluZy5mb3JtYXROdW1iZXIoOTg3NjU0My4yMSwgeyBwcmVjaXNpb246IDMsIHRob3VzYW5kOiBcIiBcIiB9KTsgLy8gOSA4NzYgNTQzLjIxMFxuXHQgKiBgYGBcblx0ICpcblx0ICogQG1ldGhvZCBmb3JtYXROdW1iZXJcblx0ICogQGZvciBhY2NvdW50aW5nXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgbnVtYmVyIFRoZSBudW1iZXIgdG8gYmUgZm9ybWF0dGVkLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gICAgICAgIFtvcHRzPXt9XSBPYmplY3QgY29udGFpbmluZyBhbGwgdGhlIG9wdGlvbnMgb2YgdGhlIG1ldGhvZC5cblx0ICogQHJldHVybiB7U3RyaW5nfSBUaGUgZ2l2ZW4gbnVtYmVyIHByb3Blcmx5IGZvcm1hdHRlZC5cblx0ICAqL1xuXHRmdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtYmVyKSB7XG5cdCAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIC8vIFJlc3Vyc2l2ZWx5IGZvcm1hdCBhcnJheXM6XG5cdCAgaWYgKEFycmF5LmlzQXJyYXkobnVtYmVyKSkge1xuXHQgICAgcmV0dXJuIG51bWJlci5tYXAoZnVuY3Rpb24gKHZhbCkge1xuXHQgICAgICByZXR1cm4gZm9ybWF0TnVtYmVyKHZhbCwgb3B0cyk7XG5cdCAgICB9KTtcblx0ICB9XG5cblx0ICAvLyBCdWlsZCBvcHRpb25zIG9iamVjdCBmcm9tIHNlY29uZCBwYXJhbSAoaWYgb2JqZWN0KSBvciBhbGwgcGFyYW1zLCBleHRlbmRpbmcgZGVmYXVsdHM6XG5cdCAgb3B0cyA9IG9iamVjdEFzc2lnbih7fSwgc2V0dGluZ3MsIG9wdHMpO1xuXG5cdCAgLy8gRG8gc29tZSBjYWxjOlxuXHQgIHZhciBuZWdhdGl2ZSA9IG51bWJlciA8IDAgPyAnLScgOiAnJztcblx0ICB2YXIgYmFzZSA9IHBhcnNlSW50KHRvRml4ZWQoTWF0aC5hYnMobnVtYmVyKSwgb3B0cy5wcmVjaXNpb24pLCAxMCkgKyAnJztcblx0ICB2YXIgbW9kID0gYmFzZS5sZW5ndGggPiAzID8gYmFzZS5sZW5ndGggJSAzIDogMDtcblxuXHQgIC8vIEZvcm1hdCB0aGUgbnVtYmVyOlxuXHQgIHZhciBmb3JtYXR0ZWQgPSBuZWdhdGl2ZSArIChtb2QgPyBiYXNlLnN1YnN0cigwLCBtb2QpICsgb3B0cy50aG91c2FuZCA6ICcnKSArIGJhc2Uuc3Vic3RyKG1vZCkucmVwbGFjZSgvKFxcZHszfSkoPz1cXGQpL2csICckMScgKyBvcHRzLnRob3VzYW5kKSArIChvcHRzLnByZWNpc2lvbiA+IDAgPyBvcHRzLmRlY2ltYWwgKyB0b0ZpeGVkKE1hdGguYWJzKG51bWJlciksIG9wdHMucHJlY2lzaW9uKS5zcGxpdCgnLicpWzFdIDogJycpO1xuXG5cdCAgcmV0dXJuIG9wdHMuc3RyaXBaZXJvcyA/IF9zdHJpcEluc2lnbmlmaWNhbnRaZXJvcyhmb3JtYXR0ZWQsIG9wdHMuZGVjaW1hbCkgOiBmb3JtYXR0ZWQ7XG5cdH1cblxuXHR2YXIgaW5kZXgkMSA9IF9fY29tbW9uanMoZnVuY3Rpb24gKG1vZHVsZSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHN0clZhbHVlID0gU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mO1xuXHR2YXIgdHJ5U3RyaW5nT2JqZWN0ID0gZnVuY3Rpb24gdHJ5U3RyaW5nT2JqZWN0KHZhbHVlKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHN0clZhbHVlLmNhbGwodmFsdWUpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fTtcblx0dmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblx0dmFyIHN0ckNsYXNzID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cdHZhciBoYXNUb1N0cmluZ1RhZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCc7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0cmV0dXJuIGhhc1RvU3RyaW5nVGFnID8gdHJ5U3RyaW5nT2JqZWN0KHZhbHVlKSA6IHRvU3RyLmNhbGwodmFsdWUpID09PSBzdHJDbGFzcztcblx0fTtcblx0fSk7XG5cblx0dmFyIGlzU3RyaW5nID0gKGluZGV4JDEgJiYgdHlwZW9mIGluZGV4JDEgPT09ICdvYmplY3QnICYmICdkZWZhdWx0JyBpbiBpbmRleCQxID8gaW5kZXgkMVsnZGVmYXVsdCddIDogaW5kZXgkMSk7XG5cblx0LyoqXG5cdCAqIFBhcnNlcyBhIGZvcm1hdCBzdHJpbmcgb3Igb2JqZWN0IGFuZCByZXR1cm5zIGZvcm1hdCBvYmogZm9yIHVzZSBpbiByZW5kZXJpbmdcblx0ICpcblx0ICogYGZvcm1hdGAgaXMgZWl0aGVyIGEgc3RyaW5nIHdpdGggdGhlIGRlZmF1bHQgKHBvc2l0aXZlKSBmb3JtYXQsIG9yIG9iamVjdFxuXHQgKiBjb250YWluaW5nIGBwb3NgIChyZXF1aXJlZCksIGBuZWdgIGFuZCBgemVyb2AgdmFsdWVzXG5cdCAqXG5cdCAqIEVpdGhlciBzdHJpbmcgb3IgZm9ybWF0LnBvcyBtdXN0IGNvbnRhaW4gXCIldlwiICh2YWx1ZSkgdG8gYmUgdmFsaWRcblx0ICpcblx0ICogQG1ldGhvZCBfY2hlY2tDdXJyZW5jeUZvcm1hdFxuXHQgKiBAZm9yIGFjY291bnRpbmdcblx0ICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICBbZm9ybWF0PVwiJXMldlwiXSBTdHJpbmcgd2l0aCB0aGUgZm9ybWF0IHRvIGFwcGx5LCB3aGVyZSAlcyBpcyB0aGUgY3VycmVuY3kgc3ltYm9sIGFuZCAldiBpcyB0aGUgdmFsdWUuXG5cdCAqIEByZXR1cm4ge09iamVjdH0gb2JqZWN0IHJlcHJlc250aW5nIGZvcm1hdCAod2l0aCBwb3MsIG5lZyBhbmQgemVybyBhdHRyaWJ1dGVzKVxuXHQgKi9cblx0ZnVuY3Rpb24gX2NoZWNrQ3VycmVuY3lGb3JtYXQoZm9ybWF0KSB7XG5cdCAgLy8gRm9ybWF0IHNob3VsZCBiZSBhIHN0cmluZywgaW4gd2hpY2ggY2FzZSBgdmFsdWVgICgnJXYnKSBtdXN0IGJlIHByZXNlbnQ6XG5cdCAgaWYgKGlzU3RyaW5nKGZvcm1hdCkgJiYgZm9ybWF0Lm1hdGNoKCcldicpKSB7XG5cdCAgICAvLyBDcmVhdGUgYW5kIHJldHVybiBwb3NpdGl2ZSwgbmVnYXRpdmUgYW5kIHplcm8gZm9ybWF0czpcblx0ICAgIHJldHVybiB7XG5cdCAgICAgIHBvczogZm9ybWF0LFxuXHQgICAgICBuZWc6IGZvcm1hdC5yZXBsYWNlKCctJywgJycpLnJlcGxhY2UoJyV2JywgJy0ldicpLFxuXHQgICAgICB6ZXJvOiBmb3JtYXRcblx0ICAgIH07XG5cdCAgfVxuXG5cdCAgLy8gT3RoZXJ3aXNlLCBhc3N1bWUgZm9ybWF0IHdhcyBmaW5lOlxuXHQgIHJldHVybiBmb3JtYXQ7XG5cdH1cblxuXHQvKipcblx0ICogRm9ybWF0IGEgbnVtYmVyIGludG8gY3VycmVuY3lcblx0ICpcblx0ICogVXNhZ2U6IGFjY291bnRpbmcuZm9ybWF0TW9uZXkobnVtYmVyLCBzeW1ib2wsIHByZWNpc2lvbiwgdGhvdXNhbmRzU2VwLCBkZWNpbWFsU2VwLCBmb3JtYXQpXG5cdCAqIGRlZmF1bHRzOiAoMCwgJyQnLCAyLCAnLCcsICcuJywgJyVzJXYnKVxuXHQgKlxuXHQgKiBMb2NhbGlzZSBieSBvdmVycmlkaW5nIHRoZSBzeW1ib2wsIHByZWNpc2lvbiwgdGhvdXNhbmQgLyBkZWNpbWFsIHNlcGFyYXRvcnMgYW5kIGZvcm1hdFxuXHQgKlxuXHQgKiBgYGBqc1xuXHQgKiAvLyBEZWZhdWx0IHVzYWdlOlxuXHQgKiBhY2NvdW50aW5nLmZvcm1hdE1vbmV5KDEyMzQ1Njc4KTsgLy8gJDEyLDM0NSw2NzguMDBcblx0ICpcblx0ICogLy8gRXVyb3BlYW4gZm9ybWF0dGluZyAoY3VzdG9tIHN5bWJvbCBhbmQgc2VwYXJhdG9ycyksIGNhbiBhbHNvIHVzZSBvcHRpb25zIG9iamVjdCBhcyBzZWNvbmQgcGFyYW1ldGVyOlxuXHQgKiBhY2NvdW50aW5nLmZvcm1hdE1vbmV5KDQ5OTkuOTksIHsgc3ltYm9sOiBcIuKCrFwiLCBwcmVjaXNpb246IDIsIHRob3VzYW5kOiBcIi5cIiwgZGVjaW1hbDogXCIsXCIgfSk7IC8vIOKCrDQuOTk5LDk5XG5cdCAqXG5cdCAqIC8vIE5lZ2F0aXZlIHZhbHVlcyBjYW4gYmUgZm9ybWF0dGVkIG5pY2VseTpcblx0ICogYWNjb3VudGluZy5mb3JtYXRNb25leSgtNTAwMDAwLCB7IHN5bWJvbDogXCLCoyBcIiwgcHJlY2lzaW9uOiAwIH0pOyAvLyDCoyAtNTAwLDAwMFxuXHQgKlxuXHQgKiAvLyBTaW1wbGUgYGZvcm1hdGAgc3RyaW5nIGFsbG93cyBjb250cm9sIG9mIHN5bWJvbCBwb3NpdGlvbiAoJXYgPSB2YWx1ZSwgJXMgPSBzeW1ib2wpOlxuXHQgKiBhY2NvdW50aW5nLmZvcm1hdE1vbmV5KDUzMTgwMDgsIHsgc3ltYm9sOiBcIkdCUFwiLCAgZm9ybWF0OiBcIiV2ICVzXCIgfSk7IC8vIDUsMzE4LDAwOC4wMCBHQlBcblx0ICogYGBgXG5cdCAqXG5cdCAqIEBtZXRob2QgZm9ybWF0TW9uZXlcblx0ICogQGZvciBhY2NvdW50aW5nXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgbnVtYmVyIE51bWJlciB0byBiZSBmb3JtYXR0ZWQuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgW29wdHM9e31dIE9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgb3B0aW9ucyBvZiB0aGUgbWV0aG9kLlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSBnaXZlbiBudW1iZXIgcHJvcGVybHkgZm9ybWF0dGVkIGFzIG1vbmV5LlxuXHQgKi9cblx0ZnVuY3Rpb24gZm9ybWF0TW9uZXkobnVtYmVyKSB7XG5cdCAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIC8vIFJlc3Vyc2l2ZWx5IGZvcm1hdCBhcnJheXM6XG5cdCAgaWYgKEFycmF5LmlzQXJyYXkobnVtYmVyKSkge1xuXHQgICAgcmV0dXJuIG51bWJlci5tYXAoZnVuY3Rpb24gKHZhbCkge1xuXHQgICAgICByZXR1cm4gZm9ybWF0TW9uZXkodmFsLCBvcHRzKTtcblx0ICAgIH0pO1xuXHQgIH1cblxuXHQgIC8vIEJ1aWxkIG9wdGlvbnMgb2JqZWN0IGZyb20gc2Vjb25kIHBhcmFtIChpZiBvYmplY3QpIG9yIGFsbCBwYXJhbXMsIGV4dGVuZGluZyBkZWZhdWx0czpcblx0ICBvcHRzID0gb2JqZWN0QXNzaWduKHt9LCBzZXR0aW5ncywgb3B0cyk7XG5cblx0ICAvLyBDaGVjayBmb3JtYXQgKHJldHVybnMgb2JqZWN0IHdpdGggcG9zLCBuZWcgYW5kIHplcm8pOlxuXHQgIHZhciBmb3JtYXRzID0gX2NoZWNrQ3VycmVuY3lGb3JtYXQob3B0cy5mb3JtYXQpO1xuXG5cdCAgLy8gQ2hvb3NlIHdoaWNoIGZvcm1hdCB0byB1c2UgZm9yIHRoaXMgdmFsdWU6XG5cdCAgdmFyIHVzZUZvcm1hdCA9IHVuZGVmaW5lZDtcblxuXHQgIGlmIChudW1iZXIgPiAwKSB7XG5cdCAgICB1c2VGb3JtYXQgPSBmb3JtYXRzLnBvcztcblx0ICB9IGVsc2UgaWYgKG51bWJlciA8IDApIHtcblx0ICAgIHVzZUZvcm1hdCA9IGZvcm1hdHMubmVnO1xuXHQgIH0gZWxzZSB7XG5cdCAgICB1c2VGb3JtYXQgPSBmb3JtYXRzLnplcm87XG5cdCAgfVxuXG5cdCAgLy8gUmV0dXJuIHdpdGggY3VycmVuY3kgc3ltYm9sIGFkZGVkOlxuXHQgIHJldHVybiB1c2VGb3JtYXQucmVwbGFjZSgnJXMnLCBvcHRzLnN5bWJvbCkucmVwbGFjZSgnJXYnLCBmb3JtYXROdW1iZXIoTWF0aC5hYnMobnVtYmVyKSwgb3B0cykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZvcm1hdCBhIGxpc3Qgb2YgbnVtYmVycyBpbnRvIGFuIGFjY291bnRpbmcgY29sdW1uLCBwYWRkaW5nIHdpdGggd2hpdGVzcGFjZVxuXHQgKiB0byBsaW5lIHVwIGN1cnJlbmN5IHN5bWJvbHMsIHRob3VzYW5kIHNlcGFyYXRvcnMgYW5kIGRlY2ltYWxzIHBsYWNlc1xuXHQgKlxuXHQgKiBMaXN0IHNob3VsZCBiZSBhbiBhcnJheSBvZiBudW1iZXJzXG5cdCAqXG5cdCAqIFJldHVybnMgYXJyYXkgb2YgYWNjb3V0aW5nLWZvcm1hdHRlZCBudW1iZXIgc3RyaW5ncyBvZiBzYW1lIGxlbmd0aFxuXHQgKlxuXHQgKiBOQjogYHdoaXRlLXNwYWNlOnByZWAgQ1NTIHJ1bGUgaXMgcmVxdWlyZWQgb24gdGhlIGxpc3QgY29udGFpbmVyIHRvIHByZXZlbnRcblx0ICogYnJvd3NlcnMgZnJvbSBjb2xsYXBzaW5nIHRoZSB3aGl0ZXNwYWNlIGluIHRoZSBvdXRwdXQgc3RyaW5ncy5cblx0ICpcblx0ICogYGBganNcblx0ICogYWNjb3VudGluZy5mb3JtYXRDb2x1bW4oWzEyMy41LCAzNDU2LjQ5LCA3Nzc4ODguOTksIDEyMzQ1Njc4LCAtNTQzMl0sIHsgc3ltYm9sOiBcIiQgXCIgfSk7XG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBAbWV0aG9kIGZvcm1hdENvbHVtblxuXHQgKiBAZm9yIGFjY291bnRpbmdcblx0ICogQHBhcmFtIHtBcnJheTxOdW1iZXI+fSBsaXN0IEFuIGFycmF5IG9mIG51bWJlcnMgdG8gZm9ybWF0XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgW29wdHM9e31dIE9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgb3B0aW9ucyBvZiB0aGUgbWV0aG9kLlxuXHQgKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IFtzeW1ib2w9XCIkXCJdIFN0cmluZyB3aXRoIHRoZSBjdXJyZW5jeSBzeW1ib2wuIEZvciBjb252ZW5pZW5jeSBpZiBjYW4gYmUgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSBvcHRpb25zIG9mIHRoZSBtZXRob2QuXG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gICAgICAgW3ByZWNpc2lvbj0yXSBOdW1iZXIgb2YgZGVjaW1hbCBkaWdpdHNcblx0ICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICBbdGhvdXNhbmQ9JywnXSBTdHJpbmcgd2l0aCB0aGUgdGhvdXNhbmRzIHNlcGFyYXRvci5cblx0ICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICBbZGVjaW1hbD1cIi5cIl0gU3RyaW5nIHdpdGggdGhlIGRlY2ltYWwgc2VwYXJhdG9yLlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgIFtmb3JtYXQ9XCIlcyV2XCJdIFN0cmluZyB3aXRoIHRoZSBmb3JtYXQgdG8gYXBwbHksIHdoZXJlICVzIGlzIHRoZSBjdXJyZW5jeSBzeW1ib2wgYW5kICV2IGlzIHRoZSB2YWx1ZS5cblx0ICogQHJldHVybiB7QXJyYXk8U3RyaW5nPn0gYXJyYXkgb2YgYWNjb3V0aW5nLWZvcm1hdHRlZCBudW1iZXIgc3RyaW5ncyBvZiBzYW1lIGxlbmd0aFxuXHQgKi9cblx0ZnVuY3Rpb24gZm9ybWF0Q29sdW1uKGxpc3QpIHtcblx0ICB2YXIgb3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG5cdCAgaWYgKCFsaXN0KSByZXR1cm4gW107XG5cblx0ICAvLyBCdWlsZCBvcHRpb25zIG9iamVjdCBmcm9tIHNlY29uZCBwYXJhbSAoaWYgb2JqZWN0KSBvciBhbGwgcGFyYW1zLCBleHRlbmRpbmcgZGVmYXVsdHM6XG5cdCAgb3B0cyA9IG9iamVjdEFzc2lnbih7fSwgc2V0dGluZ3MsIG9wdHMpO1xuXG5cdCAgLy8gQ2hlY2sgZm9ybWF0IChyZXR1cm5zIG9iamVjdCB3aXRoIHBvcywgbmVnIGFuZCB6ZXJvKSwgb25seSBuZWVkIHBvcyBmb3Igbm93OlxuXHQgIHZhciBmb3JtYXRzID0gX2NoZWNrQ3VycmVuY3lGb3JtYXQob3B0cy5mb3JtYXQpO1xuXG5cdCAgLy8gV2hldGhlciB0byBwYWQgYXQgc3RhcnQgb2Ygc3RyaW5nIG9yIGFmdGVyIGN1cnJlbmN5IHN5bWJvbDpcblx0ICB2YXIgcGFkQWZ0ZXJTeW1ib2wgPSBmb3JtYXRzLnBvcy5pbmRleE9mKCclcycpIDwgZm9ybWF0cy5wb3MuaW5kZXhPZignJXYnKTtcblxuXHQgIC8vIFN0b3JlIHZhbHVlIGZvciB0aGUgbGVuZ3RoIG9mIHRoZSBsb25nZXN0IHN0cmluZyBpbiB0aGUgY29sdW1uOlxuXHQgIHZhciBtYXhMZW5ndGggPSAwO1xuXG5cdCAgLy8gRm9ybWF0IHRoZSBsaXN0IGFjY29yZGluZyB0byBvcHRpb25zLCBzdG9yZSB0aGUgbGVuZ3RoIG9mIHRoZSBsb25nZXN0IHN0cmluZzpcblx0ICB2YXIgZm9ybWF0dGVkID0gbGlzdC5tYXAoZnVuY3Rpb24gKHZhbCkge1xuXHQgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuXHQgICAgICAvLyBSZWN1cnNpdmVseSBmb3JtYXQgY29sdW1ucyBpZiBsaXN0IGlzIGEgbXVsdGktZGltZW5zaW9uYWwgYXJyYXk6XG5cdCAgICAgIHJldHVybiBmb3JtYXRDb2x1bW4odmFsLCBvcHRzKTtcblx0ICAgIH1cblx0ICAgIC8vIENsZWFuIHVwIHRoZSB2YWx1ZVxuXHQgICAgdmFsID0gdW5mb3JtYXQodmFsLCBvcHRzLmRlY2ltYWwpO1xuXG5cdCAgICAvLyBDaG9vc2Ugd2hpY2ggZm9ybWF0IHRvIHVzZSBmb3IgdGhpcyB2YWx1ZSAocG9zLCBuZWcgb3IgemVybyk6XG5cdCAgICB2YXIgdXNlRm9ybWF0ID0gdW5kZWZpbmVkO1xuXG5cdCAgICBpZiAodmFsID4gMCkge1xuXHQgICAgICB1c2VGb3JtYXQgPSBmb3JtYXRzLnBvcztcblx0ICAgIH0gZWxzZSBpZiAodmFsIDwgMCkge1xuXHQgICAgICB1c2VGb3JtYXQgPSBmb3JtYXRzLm5lZztcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHVzZUZvcm1hdCA9IGZvcm1hdHMuemVybztcblx0ICAgIH1cblxuXHQgICAgLy8gRm9ybWF0IHRoaXMgdmFsdWUsIHB1c2ggaW50byBmb3JtYXR0ZWQgbGlzdCBhbmQgc2F2ZSB0aGUgbGVuZ3RoOlxuXHQgICAgdmFyIGZWYWwgPSB1c2VGb3JtYXQucmVwbGFjZSgnJXMnLCBvcHRzLnN5bWJvbCkucmVwbGFjZSgnJXYnLCBmb3JtYXROdW1iZXIoTWF0aC5hYnModmFsKSwgb3B0cykpO1xuXG5cdCAgICBpZiAoZlZhbC5sZW5ndGggPiBtYXhMZW5ndGgpIHtcblx0ICAgICAgbWF4TGVuZ3RoID0gZlZhbC5sZW5ndGg7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBmVmFsO1xuXHQgIH0pO1xuXG5cdCAgLy8gUGFkIGVhY2ggbnVtYmVyIGluIHRoZSBsaXN0IGFuZCBzZW5kIGJhY2sgdGhlIGNvbHVtbiBvZiBudW1iZXJzOlxuXHQgIHJldHVybiBmb3JtYXR0ZWQubWFwKGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgIC8vIE9ubHkgaWYgdGhpcyBpcyBhIHN0cmluZyAobm90IGEgbmVzdGVkIGFycmF5LCB3aGljaCB3b3VsZCBoYXZlIGFscmVhZHkgYmVlbiBwYWRkZWQpOlxuXHQgICAgaWYgKGlzU3RyaW5nKHZhbCkgJiYgdmFsLmxlbmd0aCA8IG1heExlbmd0aCkge1xuXHQgICAgICAvLyBEZXBlbmRpbmcgb24gc3ltYm9sIHBvc2l0aW9uLCBwYWQgYWZ0ZXIgc3ltYm9sIG9yIGF0IGluZGV4IDA6XG5cdCAgICAgIHJldHVybiBwYWRBZnRlclN5bWJvbCA/IHZhbC5yZXBsYWNlKG9wdHMuc3ltYm9sLCBvcHRzLnN5bWJvbCArIG5ldyBBcnJheShtYXhMZW5ndGggLSB2YWwubGVuZ3RoICsgMSkuam9pbignICcpKSA6IG5ldyBBcnJheShtYXhMZW5ndGggLSB2YWwubGVuZ3RoICsgMSkuam9pbignICcpICsgdmFsO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIHZhbDtcblx0ICB9KTtcblx0fVxuXG5cdGV4cG9ydHMuc2V0dGluZ3MgPSBzZXR0aW5ncztcblx0ZXhwb3J0cy51bmZvcm1hdCA9IHVuZm9ybWF0O1xuXHRleHBvcnRzLnRvRml4ZWQgPSB0b0ZpeGVkO1xuXHRleHBvcnRzLmZvcm1hdE1vbmV5ID0gZm9ybWF0TW9uZXk7XG5cdGV4cG9ydHMuZm9ybWF0TnVtYmVyID0gZm9ybWF0TnVtYmVyO1xuXHRleHBvcnRzLmZvcm1hdENvbHVtbiA9IGZvcm1hdENvbHVtbjtcblx0ZXhwb3J0cy5mb3JtYXQgPSBmb3JtYXRNb25leTtcblx0ZXhwb3J0cy5wYXJzZSA9IHVuZm9ybWF0O1xuXG59KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hY2NvdW50aW5nLnVtZC5qcy5tYXAiLCIvKiEgZGVjaW1hbC5qcy1saWdodCB2Mi41LjAgaHR0cHM6Ly9naXRodWIuY29tL01pa2VNY2wvZGVjaW1hbC5qcy1saWdodC9MSUNFTkNFICovXHJcbjsoZnVuY3Rpb24gKGdsb2JhbFNjb3BlKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbiAgLypcclxuICAgKiAgZGVjaW1hbC5qcy1saWdodCB2Mi41LjBcclxuICAgKiAgQW4gYXJiaXRyYXJ5LXByZWNpc2lvbiBEZWNpbWFsIHR5cGUgZm9yIEphdmFTY3JpcHQuXHJcbiAgICogIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWtlTWNsL2RlY2ltYWwuanMtbGlnaHRcclxuICAgKiAgQ29weXJpZ2h0IChjKSAyMDE4IE1pY2hhZWwgTWNsYXVnaGxpbiA8TThjaDg4bEBnbWFpbC5jb20+XHJcbiAgICogIE1JVCBFeHBhdCBMaWNlbmNlXHJcbiAgICovXHJcblxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgRURJVEFCTEUgREVGQVVMVFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHJcbiAgICAvLyBUaGUgbGltaXQgb24gdGhlIHZhbHVlIG9mIGBwcmVjaXNpb25gLCBhbmQgb24gdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBhcmd1bWVudCB0b1xyXG4gICAgLy8gYHRvRGVjaW1hbFBsYWNlc2AsIGB0b0V4cG9uZW50aWFsYCwgYHRvRml4ZWRgLCBgdG9QcmVjaXNpb25gIGFuZCBgdG9TaWduaWZpY2FudERpZ2l0c2AuXHJcbiAgdmFyIE1BWF9ESUdJVFMgPSAxZTksICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byAxZTlcclxuXHJcblxyXG4gICAgLy8gVGhlIGluaXRpYWwgY29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzIG9mIHRoZSBEZWNpbWFsIGNvbnN0cnVjdG9yLlxyXG4gICAgRGVjaW1hbCA9IHtcclxuXHJcbiAgICAgIC8vIFRoZXNlIHZhbHVlcyBtdXN0IGJlIGludGVnZXJzIHdpdGhpbiB0aGUgc3RhdGVkIHJhbmdlcyAoaW5jbHVzaXZlKS5cclxuICAgICAgLy8gTW9zdCBvZiB0aGVzZSB2YWx1ZXMgY2FuIGJlIGNoYW5nZWQgZHVyaW5nIHJ1bi10aW1lIHVzaW5nIGBEZWNpbWFsLmNvbmZpZ2AuXHJcblxyXG4gICAgICAvLyBUaGUgbWF4aW11bSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzIG9mIHRoZSByZXN1bHQgb2YgYSBjYWxjdWxhdGlvbiBvciBiYXNlIGNvbnZlcnNpb24uXHJcbiAgICAgIC8vIEUuZy4gYERlY2ltYWwuY29uZmlnKHsgcHJlY2lzaW9uOiAyMCB9KTtgXHJcbiAgICAgIHByZWNpc2lvbjogMjAsICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDEgdG8gTUFYX0RJR0lUU1xyXG5cclxuICAgICAgLy8gVGhlIHJvdW5kaW5nIG1vZGUgdXNlZCBieSBkZWZhdWx0IGJ5IGB0b0ludGVnZXJgLCBgdG9EZWNpbWFsUGxhY2VzYCwgYHRvRXhwb25lbnRpYWxgLFxyXG4gICAgICAvLyBgdG9GaXhlZGAsIGB0b1ByZWNpc2lvbmAgYW5kIGB0b1NpZ25pZmljYW50RGlnaXRzYC5cclxuICAgICAgLy9cclxuICAgICAgLy8gUk9VTkRfVVAgICAgICAgICAwIEF3YXkgZnJvbSB6ZXJvLlxyXG4gICAgICAvLyBST1VORF9ET1dOICAgICAgIDEgVG93YXJkcyB6ZXJvLlxyXG4gICAgICAvLyBST1VORF9DRUlMICAgICAgIDIgVG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAgIC8vIFJPVU5EX0ZMT09SICAgICAgMyBUb3dhcmRzIC1JbmZpbml0eS5cclxuICAgICAgLy8gUk9VTkRfSEFMRl9VUCAgICA0IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB1cC5cclxuICAgICAgLy8gUk9VTkRfSEFMRl9ET1dOICA1IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCBkb3duLlxyXG4gICAgICAvLyBST1VORF9IQUxGX0VWRU4gIDYgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHRvd2FyZHMgZXZlbiBuZWlnaGJvdXIuXHJcbiAgICAgIC8vIFJPVU5EX0hBTEZfQ0VJTCAgNyBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAgIC8vIFJPVU5EX0hBTEZfRkxPT1IgOCBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyAtSW5maW5pdHkuXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIEUuZy5cclxuICAgICAgLy8gYERlY2ltYWwucm91bmRpbmcgPSA0O2BcclxuICAgICAgLy8gYERlY2ltYWwucm91bmRpbmcgPSBEZWNpbWFsLlJPVU5EX0hBTEZfVVA7YFxyXG4gICAgICByb3VuZGluZzogNCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIDhcclxuXHJcbiAgICAgIC8vIFRoZSBleHBvbmVudCB2YWx1ZSBhdCBhbmQgYmVuZWF0aCB3aGljaCBgdG9TdHJpbmdgIHJldHVybnMgZXhwb25lbnRpYWwgbm90YXRpb24uXHJcbiAgICAgIC8vIEphdmFTY3JpcHQgbnVtYmVyczogLTdcclxuICAgICAgdG9FeHBOZWc6IC03LCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byAtTUFYX0VcclxuXHJcbiAgICAgIC8vIFRoZSBleHBvbmVudCB2YWx1ZSBhdCBhbmQgYWJvdmUgd2hpY2ggYHRvU3RyaW5nYCByZXR1cm5zIGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICAvLyBKYXZhU2NyaXB0IG51bWJlcnM6IDIxXHJcbiAgICAgIHRvRXhwUG9zOiAgMjEsICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gTUFYX0VcclxuXHJcbiAgICAgIC8vIFRoZSBuYXR1cmFsIGxvZ2FyaXRobSBvZiAxMC5cclxuICAgICAgLy8gMTE1IGRpZ2l0c1xyXG4gICAgICBMTjEwOiAnMi4zMDI1ODUwOTI5OTQwNDU2ODQwMTc5OTE0NTQ2ODQzNjQyMDc2MDExMDE0ODg2Mjg3NzI5NzYwMzMzMjc5MDA5Njc1NzI2MDk2NzczNTI0ODAyMzU5OTcyMDUwODk1OTgyOTgzNDE5Njc3ODQwNDIyODYnXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRU5EIE9GIEVESVRBQkxFIERFRkFVTFRTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblxyXG4gICAgZXh0ZXJuYWwgPSB0cnVlLFxyXG5cclxuICAgIGRlY2ltYWxFcnJvciA9ICdbRGVjaW1hbEVycm9yXSAnLFxyXG4gICAgaW52YWxpZEFyZ3VtZW50ID0gZGVjaW1hbEVycm9yICsgJ0ludmFsaWQgYXJndW1lbnQ6ICcsXHJcbiAgICBleHBvbmVudE91dE9mUmFuZ2UgPSBkZWNpbWFsRXJyb3IgKyAnRXhwb25lbnQgb3V0IG9mIHJhbmdlOiAnLFxyXG5cclxuICAgIG1hdGhmbG9vciA9IE1hdGguZmxvb3IsXHJcbiAgICBtYXRocG93ID0gTWF0aC5wb3csXHJcblxyXG4gICAgaXNEZWNpbWFsID0gL14oXFxkKyhcXC5cXGQqKT98XFwuXFxkKykoZVsrLV0/XFxkKyk/JC9pLFxyXG5cclxuICAgIE9ORSxcclxuICAgIEJBU0UgPSAxZTcsXHJcbiAgICBMT0dfQkFTRSA9IDcsXHJcbiAgICBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MSxcclxuICAgIE1BWF9FID0gbWF0aGZsb29yKE1BWF9TQUZFX0lOVEVHRVIgLyBMT0dfQkFTRSksICAgIC8vIDEyODY3NDI3NTA2NzcyODRcclxuXHJcbiAgICAvLyBEZWNpbWFsLnByb3RvdHlwZSBvYmplY3RcclxuICAgIFAgPSB7fTtcclxuXHJcblxyXG4gIC8vIERlY2ltYWwgcHJvdG90eXBlIG1ldGhvZHNcclxuXHJcblxyXG4gIC8qXHJcbiAgICogIGFic29sdXRlVmFsdWUgICAgICAgICAgICAgICAgICAgICAgIGFic1xyXG4gICAqICBjb21wYXJlZFRvICAgICAgICAgICAgICAgICAgICAgICAgICBjbXBcclxuICAgKiAgZGVjaW1hbFBsYWNlcyAgICAgICAgICAgICAgICAgICAgICAgZHBcclxuICAgKiAgZGl2aWRlZEJ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2XHJcbiAgICogIGRpdmlkZWRUb0ludGVnZXJCeSAgICAgICAgICAgICAgICAgIGlkaXZcclxuICAgKiAgZXF1YWxzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXFcclxuICAgKiAgZXhwb25lbnRcclxuICAgKiAgZ3JlYXRlclRoYW4gICAgICAgICAgICAgICAgICAgICAgICAgZ3RcclxuICAgKiAgZ3JlYXRlclRoYW5PckVxdWFsVG8gICAgICAgICAgICAgICAgZ3RlXHJcbiAgICogIGlzSW50ZWdlciAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzaW50XHJcbiAgICogIGlzTmVnYXRpdmUgICAgICAgICAgICAgICAgICAgICAgICAgIGlzbmVnXHJcbiAgICogIGlzUG9zaXRpdmUgICAgICAgICAgICAgICAgICAgICAgICAgIGlzcG9zXHJcbiAgICogIGlzWmVyb1xyXG4gICAqICBsZXNzVGhhbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsdFxyXG4gICAqICBsZXNzVGhhbk9yRXF1YWxUbyAgICAgICAgICAgICAgICAgICBsdGVcclxuICAgKiAgbG9nYXJpdGhtICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nXHJcbiAgICogIG1pbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlxyXG4gICAqICBtb2R1bG8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RcclxuICAgKiAgbmF0dXJhbEV4cG9uZW50aWFsICAgICAgICAgICAgICAgICAgZXhwXHJcbiAgICogIG5hdHVyYWxMb2dhcml0aG0gICAgICAgICAgICAgICAgICAgIGxuXHJcbiAgICogIG5lZ2F0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZ1xyXG4gICAqICBwbHVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRcclxuICAgKiAgcHJlY2lzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RcclxuICAgKiAgc3F1YXJlUm9vdCAgICAgICAgICAgICAgICAgICAgICAgICAgc3FydFxyXG4gICAqICB0aW1lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWxcclxuICAgKiAgdG9EZWNpbWFsUGxhY2VzICAgICAgICAgICAgICAgICAgICAgdG9kcFxyXG4gICAqICB0b0V4cG9uZW50aWFsXHJcbiAgICogIHRvRml4ZWRcclxuICAgKiAgdG9JbnRlZ2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9pbnRcclxuICAgKiAgdG9OdW1iZXJcclxuICAgKiAgdG9Qb3dlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG93XHJcbiAgICogIHRvUHJlY2lzaW9uXHJcbiAgICogIHRvU2lnbmlmaWNhbnREaWdpdHMgICAgICAgICAgICAgICAgIHRvc2RcclxuICAgKiAgdG9TdHJpbmdcclxuICAgKiAgdmFsdWVPZiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsXHJcbiAgICovXHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBhYnNvbHV0ZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmFic29sdXRlVmFsdWUgPSBQLmFicyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB4ID0gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcyk7XHJcbiAgICBpZiAoeC5zKSB4LnMgPSAxO1xyXG4gICAgcmV0dXJuIHg7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuXHJcbiAgICogICAxICAgIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZSBvZiBgeWAsXHJcbiAgICogIC0xICAgIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgbGVzcyB0aGFuIHRoZSB2YWx1ZSBvZiBgeWAsXHJcbiAgICogICAwICAgIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSB2YWx1ZVxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5jb21wYXJlZFRvID0gUC5jbXAgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIGksIGosIHhkTCwgeWRMLFxyXG4gICAgICB4ID0gdGhpcztcclxuXHJcbiAgICB5ID0gbmV3IHguY29uc3RydWN0b3IoeSk7XHJcblxyXG4gICAgLy8gU2lnbnMgZGlmZmVyP1xyXG4gICAgaWYgKHgucyAhPT0geS5zKSByZXR1cm4geC5zIHx8IC15LnM7XHJcblxyXG4gICAgLy8gQ29tcGFyZSBleHBvbmVudHMuXHJcbiAgICBpZiAoeC5lICE9PSB5LmUpIHJldHVybiB4LmUgPiB5LmUgXiB4LnMgPCAwID8gMSA6IC0xO1xyXG5cclxuICAgIHhkTCA9IHguZC5sZW5ndGg7XHJcbiAgICB5ZEwgPSB5LmQubGVuZ3RoO1xyXG5cclxuICAgIC8vIENvbXBhcmUgZGlnaXQgYnkgZGlnaXQuXHJcbiAgICBmb3IgKGkgPSAwLCBqID0geGRMIDwgeWRMID8geGRMIDogeWRMOyBpIDwgajsgKytpKSB7XHJcbiAgICAgIGlmICh4LmRbaV0gIT09IHkuZFtpXSkgcmV0dXJuIHguZFtpXSA+IHkuZFtpXSBeIHgucyA8IDAgPyAxIDogLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29tcGFyZSBsZW5ndGhzLlxyXG4gICAgcmV0dXJuIHhkTCA9PT0geWRMID8gMCA6IHhkTCA+IHlkTCBeIHgucyA8IDAgPyAxIDogLTE7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgb2YgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZGVjaW1hbFBsYWNlcyA9IFAuZHAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIHcgPSB4LmQubGVuZ3RoIC0gMSxcclxuICAgICAgZHAgPSAodyAtIHguZSkgKiBMT0dfQkFTRTtcclxuXHJcbiAgICAvLyBTdWJ0cmFjdCB0aGUgbnVtYmVyIG9mIHRyYWlsaW5nIHplcm9zIG9mIHRoZSBsYXN0IHdvcmQuXHJcbiAgICB3ID0geC5kW3ddO1xyXG4gICAgaWYgKHcpIGZvciAoOyB3ICUgMTAgPT0gMDsgdyAvPSAxMCkgZHAtLTtcclxuXHJcbiAgICByZXR1cm4gZHAgPCAwID8gMCA6IGRwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgZGl2aWRlZCBieSBgeWAsIHRydW5jYXRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZGl2aWRlZEJ5ID0gUC5kaXYgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIGRpdmlkZSh0aGlzLCBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih5KSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGludGVnZXIgcGFydCBvZiBkaXZpZGluZyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsXHJcbiAgICogYnkgdGhlIHZhbHVlIG9mIGB5YCwgdHJ1bmNhdGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZGl2aWRlZFRvSW50ZWdlckJ5ID0gUC5pZGl2ID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcbiAgICByZXR1cm4gcm91bmQoZGl2aWRlKHgsIG5ldyBDdG9yKHkpLCAwLCAxKSwgQ3Rvci5wcmVjaXNpb24pO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIGB5YCwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZXF1YWxzID0gUC5lcSA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gIXRoaXMuY21wKHkpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0aGUgKGJhc2UgMTApIGV4cG9uZW50IHZhbHVlIG9mIHRoaXMgRGVjaW1hbCAodGhpcy5lIGlzIHRoZSBiYXNlIDEwMDAwMDAwIGV4cG9uZW50KS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZXhwb25lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gZ2V0QmFzZTEwRXhwb25lbnQodGhpcyk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBncmVhdGVyIHRoYW4gdGhlIHZhbHVlIG9mIGB5YCwgb3RoZXJ3aXNlIHJldHVyblxyXG4gICAqIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5ncmVhdGVyVGhhbiA9IFAuZ3QgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY21wKHkpID4gMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgdmFsdWUgb2YgYHlgLFxyXG4gICAqIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmdyZWF0ZXJUaGFuT3JFcXVhbFRvID0gUC5ndGUgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY21wKHkpID49IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBhbiBpbnRlZ2VyLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5pc0ludGVnZXIgPSBQLmlzaW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZSA+IHRoaXMuZC5sZW5ndGggLSAyO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgbmVnYXRpdmUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmlzTmVnYXRpdmUgPSBQLmlzbmVnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucyA8IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBwb3NpdGl2ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuaXNQb3NpdGl2ZSA9IFAuaXNwb3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zID4gMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIDAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmlzWmVybyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnMgPT09IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBsZXNzIHRoYW4gYHlgLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5sZXNzVGhhbiA9IFAubHQgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY21wKHkpIDwgMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgeWAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmxlc3NUaGFuT3JFcXVhbFRvID0gUC5sdGUgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY21wKHkpIDwgMTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdGhlIGxvZ2FyaXRobSBvZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHRvIHRoZSBzcGVjaWZpZWQgYmFzZSwgdHJ1bmNhdGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICogSWYgbm8gYmFzZSBpcyBzcGVjaWZpZWQsIHJldHVybiBsb2dbMTBdKHgpLlxyXG4gICAqXHJcbiAgICogbG9nW2Jhc2VdKHgpID0gbG4oeCkgLyBsbihiYXNlKVxyXG4gICAqXHJcbiAgICogVGhlIG1heGltdW0gZXJyb3Igb2YgdGhlIHJlc3VsdCBpcyAxIHVscCAodW5pdCBpbiB0aGUgbGFzdCBwbGFjZSkuXHJcbiAgICpcclxuICAgKiBbYmFzZV0ge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gVGhlIGJhc2Ugb2YgdGhlIGxvZ2FyaXRobS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubG9nYXJpdGhtID0gUC5sb2cgPSBmdW5jdGlvbiAoYmFzZSkge1xyXG4gICAgdmFyIHIsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbixcclxuICAgICAgd3ByID0gcHIgKyA1O1xyXG5cclxuICAgIC8vIERlZmF1bHQgYmFzZSBpcyAxMC5cclxuICAgIGlmIChiYXNlID09PSB2b2lkIDApIHtcclxuICAgICAgYmFzZSA9IG5ldyBDdG9yKDEwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGJhc2UgPSBuZXcgQ3RvcihiYXNlKTtcclxuXHJcbiAgICAgIC8vIGxvZ1stYl0oeCkgPSBOYU5cclxuICAgICAgLy8gbG9nWzBdKHgpICA9IE5hTlxyXG4gICAgICAvLyBsb2dbMV0oeCkgID0gTmFOXHJcbiAgICAgIGlmIChiYXNlLnMgPCAxIHx8IGJhc2UuZXEoT05FKSkgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgJ05hTicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGxvZ1tiXSgteCkgPSBOYU5cclxuICAgIC8vIGxvZ1tiXSgwKSA9IC1JbmZpbml0eVxyXG4gICAgaWYgKHgucyA8IDEpIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICh4LnMgPyAnTmFOJyA6ICctSW5maW5pdHknKSk7XHJcblxyXG4gICAgLy8gbG9nW2JdKDEpID0gMFxyXG4gICAgaWYgKHguZXEoT05FKSkgcmV0dXJuIG5ldyBDdG9yKDApO1xyXG5cclxuICAgIGV4dGVybmFsID0gZmFsc2U7XHJcbiAgICByID0gZGl2aWRlKGxuKHgsIHdwciksIGxuKGJhc2UsIHdwciksIHdwcik7XHJcbiAgICBleHRlcm5hbCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHJvdW5kKHIsIHByKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIG1pbnVzIGB5YCwgdHJ1bmNhdGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5taW51cyA9IFAuc3ViID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciB4ID0gdGhpcztcclxuICAgIHkgPSBuZXcgeC5jb25zdHJ1Y3Rvcih5KTtcclxuICAgIHJldHVybiB4LnMgPT0geS5zID8gc3VidHJhY3QoeCwgeSkgOiBhZGQoeCwgKHkucyA9IC15LnMsIHkpKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIG1vZHVsbyBgeWAsIHRydW5jYXRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubW9kdWxvID0gUC5tb2QgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIHEsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuXHJcbiAgICB5ID0gbmV3IEN0b3IoeSk7XHJcblxyXG4gICAgLy8geCAlIDAgPSBOYU5cclxuICAgIGlmICgheS5zKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnTmFOJyk7XHJcblxyXG4gICAgLy8gUmV0dXJuIHggaWYgeCBpcyAwLlxyXG4gICAgaWYgKCF4LnMpIHJldHVybiByb3VuZChuZXcgQ3Rvcih4KSwgcHIpO1xyXG5cclxuICAgIC8vIFByZXZlbnQgcm91bmRpbmcgb2YgaW50ZXJtZWRpYXRlIGNhbGN1bGF0aW9ucy5cclxuICAgIGV4dGVybmFsID0gZmFsc2U7XHJcbiAgICBxID0gZGl2aWRlKHgsIHksIDAsIDEpLnRpbWVzKHkpO1xyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB4Lm1pbnVzKHEpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBuYXR1cmFsIGV4cG9uZW50aWFsIG9mIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwsXHJcbiAgICogaS5lLiB0aGUgYmFzZSBlIHJhaXNlZCB0byB0aGUgcG93ZXIgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCwgdHJ1bmNhdGVkIHRvIGBwcmVjaXNpb25gXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5uYXR1cmFsRXhwb25lbnRpYWwgPSBQLmV4cCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBleHAodGhpcyk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG5hdHVyYWwgbG9nYXJpdGhtIG9mIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwsXHJcbiAgICogdHJ1bmNhdGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubmF0dXJhbExvZ2FyaXRobSA9IFAubG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbG4odGhpcyk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBuZWdhdGVkLCBpLmUuIGFzIGlmIG11bHRpcGxpZWQgYnlcclxuICAgKiAtMS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubmVnYXRlZCA9IFAubmVnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHggPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzKTtcclxuICAgIHgucyA9IC14LnMgfHwgMDtcclxuICAgIHJldHVybiB4O1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgcGx1cyBgeWAsIHRydW5jYXRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAucGx1cyA9IFAuYWRkID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciB4ID0gdGhpcztcclxuICAgIHkgPSBuZXcgeC5jb25zdHJ1Y3Rvcih5KTtcclxuICAgIHJldHVybiB4LnMgPT0geS5zID8gYWRkKHgsIHkpIDogc3VidHJhY3QoeCwgKHkucyA9IC15LnMsIHkpKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHMgb2YgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqIFt6XSB7Ym9vbGVhbnxudW1iZXJ9IFdoZXRoZXIgdG8gY291bnQgaW50ZWdlci1wYXJ0IHRyYWlsaW5nIHplcm9zOiB0cnVlLCBmYWxzZSwgMSBvciAwLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5wcmVjaXNpb24gPSBQLnNkID0gZnVuY3Rpb24gKHopIHtcclxuICAgIHZhciBlLCBzZCwgdyxcclxuICAgICAgeCA9IHRoaXM7XHJcblxyXG4gICAgaWYgKHogIT09IHZvaWQgMCAmJiB6ICE9PSAhIXogJiYgeiAhPT0gMSAmJiB6ICE9PSAwKSB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyB6KTtcclxuXHJcbiAgICBlID0gZ2V0QmFzZTEwRXhwb25lbnQoeCkgKyAxO1xyXG4gICAgdyA9IHguZC5sZW5ndGggLSAxO1xyXG4gICAgc2QgPSB3ICogTE9HX0JBU0UgKyAxO1xyXG4gICAgdyA9IHguZFt3XTtcclxuXHJcbiAgICAvLyBJZiBub24temVyby4uLlxyXG4gICAgaWYgKHcpIHtcclxuXHJcbiAgICAgIC8vIFN1YnRyYWN0IHRoZSBudW1iZXIgb2YgdHJhaWxpbmcgemVyb3Mgb2YgdGhlIGxhc3Qgd29yZC5cclxuICAgICAgZm9yICg7IHcgJSAxMCA9PSAwOyB3IC89IDEwKSBzZC0tO1xyXG5cclxuICAgICAgLy8gQWRkIHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIHRoZSBmaXJzdCB3b3JkLlxyXG4gICAgICBmb3IgKHcgPSB4LmRbMF07IHcgPj0gMTA7IHcgLz0gMTApIHNkKys7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHogJiYgZSA+IHNkID8gZSA6IHNkO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBzcXVhcmUgcm9vdCBvZiB0aGlzIERlY2ltYWwsIHRydW5jYXRlZCB0byBgcHJlY2lzaW9uYFxyXG4gICAqIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuc3F1YXJlUm9vdCA9IFAuc3FydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBlLCBuLCBwciwgciwgcywgdCwgd3ByLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgLy8gTmVnYXRpdmUgb3IgemVybz9cclxuICAgIGlmICh4LnMgPCAxKSB7XHJcbiAgICAgIGlmICgheC5zKSByZXR1cm4gbmV3IEN0b3IoMCk7XHJcblxyXG4gICAgICAvLyBzcXJ0KC14KSA9IE5hTlxyXG4gICAgICB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnTmFOJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpO1xyXG4gICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBJbml0aWFsIGVzdGltYXRlLlxyXG4gICAgcyA9IE1hdGguc3FydCgreCk7XHJcblxyXG4gICAgLy8gTWF0aC5zcXJ0IHVuZGVyZmxvdy9vdmVyZmxvdz9cclxuICAgIC8vIFBhc3MgeCB0byBNYXRoLnNxcnQgYXMgaW50ZWdlciwgdGhlbiBhZGp1c3QgdGhlIGV4cG9uZW50IG9mIHRoZSByZXN1bHQuXHJcbiAgICBpZiAocyA9PSAwIHx8IHMgPT0gMSAvIDApIHtcclxuICAgICAgbiA9IGRpZ2l0c1RvU3RyaW5nKHguZCk7XHJcbiAgICAgIGlmICgobi5sZW5ndGggKyBlKSAlIDIgPT0gMCkgbiArPSAnMCc7XHJcbiAgICAgIHMgPSBNYXRoLnNxcnQobik7XHJcbiAgICAgIGUgPSBtYXRoZmxvb3IoKGUgKyAxKSAvIDIpIC0gKGUgPCAwIHx8IGUgJSAyKTtcclxuXHJcbiAgICAgIGlmIChzID09IDEgLyAwKSB7XHJcbiAgICAgICAgbiA9ICcxZScgKyBlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG4gPSBzLnRvRXhwb25lbnRpYWwoKTtcclxuICAgICAgICBuID0gbi5zbGljZSgwLCBuLmluZGV4T2YoJ2UnKSArIDEpICsgZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgciA9IG5ldyBDdG9yKG4pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgciA9IG5ldyBDdG9yKHMudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuICAgIHMgPSB3cHIgPSBwciArIDM7XHJcblxyXG4gICAgLy8gTmV3dG9uLVJhcGhzb24gaXRlcmF0aW9uLlxyXG4gICAgZm9yICg7Oykge1xyXG4gICAgICB0ID0gcjtcclxuICAgICAgciA9IHQucGx1cyhkaXZpZGUoeCwgdCwgd3ByICsgMikpLnRpbWVzKDAuNSk7XHJcblxyXG4gICAgICBpZiAoZGlnaXRzVG9TdHJpbmcodC5kKS5zbGljZSgwLCB3cHIpID09PSAobiA9IGRpZ2l0c1RvU3RyaW5nKHIuZCkpLnNsaWNlKDAsIHdwcikpIHtcclxuICAgICAgICBuID0gbi5zbGljZSh3cHIgLSAzLCB3cHIgKyAxKTtcclxuXHJcbiAgICAgICAgLy8gVGhlIDR0aCByb3VuZGluZyBkaWdpdCBtYXkgYmUgaW4gZXJyb3IgYnkgLTEgc28gaWYgdGhlIDQgcm91bmRpbmcgZGlnaXRzIGFyZSA5OTk5IG9yXHJcbiAgICAgICAgLy8gNDk5OSwgaS5lLiBhcHByb2FjaGluZyBhIHJvdW5kaW5nIGJvdW5kYXJ5LCBjb250aW51ZSB0aGUgaXRlcmF0aW9uLlxyXG4gICAgICAgIGlmIChzID09IHdwciAmJiBuID09ICc0OTk5Jykge1xyXG5cclxuICAgICAgICAgIC8vIE9uIHRoZSBmaXJzdCBpdGVyYXRpb24gb25seSwgY2hlY2sgdG8gc2VlIGlmIHJvdW5kaW5nIHVwIGdpdmVzIHRoZSBleGFjdCByZXN1bHQgYXMgdGhlXHJcbiAgICAgICAgICAvLyBuaW5lcyBtYXkgaW5maW5pdGVseSByZXBlYXQuXHJcbiAgICAgICAgICByb3VuZCh0LCBwciArIDEsIDApO1xyXG5cclxuICAgICAgICAgIGlmICh0LnRpbWVzKHQpLmVxKHgpKSB7XHJcbiAgICAgICAgICAgIHIgPSB0O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG4gIT0gJzk5OTknKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdwciArPSA0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiByb3VuZChyLCBwcik7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCB0aW1lcyBgeWAsIHRydW5jYXRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudGltZXMgPSBQLm11bCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICB2YXIgY2FycnksIGUsIGksIGssIHIsIHJMLCB0LCB4ZEwsIHlkTCxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICB4ZCA9IHguZCxcclxuICAgICAgeWQgPSAoeSA9IG5ldyBDdG9yKHkpKS5kO1xyXG5cclxuICAgIC8vIFJldHVybiAwIGlmIGVpdGhlciBpcyAwLlxyXG4gICAgaWYgKCF4LnMgfHwgIXkucykgcmV0dXJuIG5ldyBDdG9yKDApO1xyXG5cclxuICAgIHkucyAqPSB4LnM7XHJcbiAgICBlID0geC5lICsgeS5lO1xyXG4gICAgeGRMID0geGQubGVuZ3RoO1xyXG4gICAgeWRMID0geWQubGVuZ3RoO1xyXG5cclxuICAgIC8vIEVuc3VyZSB4ZCBwb2ludHMgdG8gdGhlIGxvbmdlciBhcnJheS5cclxuICAgIGlmICh4ZEwgPCB5ZEwpIHtcclxuICAgICAgciA9IHhkO1xyXG4gICAgICB4ZCA9IHlkO1xyXG4gICAgICB5ZCA9IHI7XHJcbiAgICAgIHJMID0geGRMO1xyXG4gICAgICB4ZEwgPSB5ZEw7XHJcbiAgICAgIHlkTCA9IHJMO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluaXRpYWxpc2UgdGhlIHJlc3VsdCBhcnJheSB3aXRoIHplcm9zLlxyXG4gICAgciA9IFtdO1xyXG4gICAgckwgPSB4ZEwgKyB5ZEw7XHJcbiAgICBmb3IgKGkgPSByTDsgaS0tOykgci5wdXNoKDApO1xyXG5cclxuICAgIC8vIE11bHRpcGx5IVxyXG4gICAgZm9yIChpID0geWRMOyAtLWkgPj0gMDspIHtcclxuICAgICAgY2FycnkgPSAwO1xyXG4gICAgICBmb3IgKGsgPSB4ZEwgKyBpOyBrID4gaTspIHtcclxuICAgICAgICB0ID0gcltrXSArIHlkW2ldICogeGRbayAtIGkgLSAxXSArIGNhcnJ5O1xyXG4gICAgICAgIHJbay0tXSA9IHQgJSBCQVNFIHwgMDtcclxuICAgICAgICBjYXJyeSA9IHQgLyBCQVNFIHwgMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcltrXSA9IChyW2tdICsgY2FycnkpICUgQkFTRSB8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgZm9yICg7ICFyWy0tckxdOykgci5wb3AoKTtcclxuXHJcbiAgICBpZiAoY2FycnkpICsrZTtcclxuICAgIGVsc2Ugci5zaGlmdCgpO1xyXG5cclxuICAgIHkuZCA9IHI7XHJcbiAgICB5LmUgPSBlO1xyXG5cclxuICAgIHJldHVybiBleHRlcm5hbCA/IHJvdW5kKHksIEN0b3IucHJlY2lzaW9uKSA6IHk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByb3VuZGVkIHRvIGEgbWF4aW11bSBvZiBgZHBgXHJcbiAgICogZGVjaW1hbCBwbGFjZXMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm1gIG9yIGByb3VuZGluZ2AgaWYgYHJtYCBpcyBvbWl0dGVkLlxyXG4gICAqXHJcbiAgICogSWYgYGRwYCBpcyBvbWl0dGVkLCByZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvRGVjaW1hbFBsYWNlcyA9IFAudG9kcCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgeCA9IG5ldyBDdG9yKHgpO1xyXG4gICAgaWYgKGRwID09PSB2b2lkIDApIHJldHVybiB4O1xyXG5cclxuICAgIGNoZWNrSW50MzIoZHAsIDAsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgIGlmIChybSA9PT0gdm9pZCAwKSBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICBlbHNlIGNoZWNrSW50MzIocm0sIDAsIDgpO1xyXG5cclxuICAgIHJldHVybiByb3VuZCh4LCBkcCArIGdldEJhc2UxMEV4cG9uZW50KHgpICsgMSwgcm0pO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpbiBleHBvbmVudGlhbCBub3RhdGlvbiByb3VuZGVkIHRvXHJcbiAgICogYGRwYCBmaXhlZCBkZWNpbWFsIHBsYWNlcyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzLiBJbnRlZ2VyLCAwIHRvIE1BWF9ESUdJVFMgaW5jbHVzaXZlLlxyXG4gICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9FeHBvbmVudGlhbCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgIHZhciBzdHIsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICBpZiAoZHAgPT09IHZvaWQgMCkge1xyXG4gICAgICBzdHIgPSB0b1N0cmluZyh4LCB0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoZWNrSW50MzIoZHAsIDAsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgICAgaWYgKHJtID09PSB2b2lkIDApIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgICAgZWxzZSBjaGVja0ludDMyKHJtLCAwLCA4KTtcclxuXHJcbiAgICAgIHggPSByb3VuZChuZXcgQ3Rvcih4KSwgZHAgKyAxLCBybSk7XHJcbiAgICAgIHN0ciA9IHRvU3RyaW5nKHgsIHRydWUsIGRwICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0cjtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaW4gbm9ybWFsIChmaXhlZC1wb2ludCkgbm90YXRpb24gdG9cclxuICAgKiBgZHBgIGZpeGVkIGRlY2ltYWwgcGxhY2VzIGFuZCByb3VuZGVkIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJtYCBvciBgcm91bmRpbmdgIGlmIGBybWAgaXNcclxuICAgKiBvbWl0dGVkLlxyXG4gICAqXHJcbiAgICogQXMgd2l0aCBKYXZhU2NyaXB0IG51bWJlcnMsICgtMCkudG9GaXhlZCgwKSBpcyAnMCcsIGJ1dCBlLmcuICgtMC4wMDAwMSkudG9GaXhlZCgwKSBpcyAnLTAnLlxyXG4gICAqXHJcbiAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKiAoLTApLnRvRml4ZWQoMCkgaXMgJzAnLCBidXQgKC0wLjEpLnRvRml4ZWQoMCkgaXMgJy0wJy5cclxuICAgKiAoLTApLnRvRml4ZWQoMSkgaXMgJzAuMCcsIGJ1dCAoLTAuMDEpLnRvRml4ZWQoMSkgaXMgJy0wLjAnLlxyXG4gICAqICgtMCkudG9GaXhlZCgzKSBpcyAnMC4wMDAnLlxyXG4gICAqICgtMC41KS50b0ZpeGVkKDApIGlzICctMCcuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvRml4ZWQgPSBmdW5jdGlvbiAoZHAsIHJtKSB7XHJcbiAgICB2YXIgc3RyLCB5LFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgaWYgKGRwID09PSB2b2lkIDApIHJldHVybiB0b1N0cmluZyh4KTtcclxuXHJcbiAgICBjaGVja0ludDMyKGRwLCAwLCBNQVhfRElHSVRTKTtcclxuXHJcbiAgICBpZiAocm0gPT09IHZvaWQgMCkgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgZWxzZSBjaGVja0ludDMyKHJtLCAwLCA4KTtcclxuXHJcbiAgICB5ID0gcm91bmQobmV3IEN0b3IoeCksIGRwICsgZ2V0QmFzZTEwRXhwb25lbnQoeCkgKyAxLCBybSk7XHJcbiAgICBzdHIgPSB0b1N0cmluZyh5LmFicygpLCBmYWxzZSwgZHAgKyBnZXRCYXNlMTBFeHBvbmVudCh5KSArIDEpO1xyXG5cclxuICAgIC8vIFRvIGRldGVybWluZSB3aGV0aGVyIHRvIGFkZCB0aGUgbWludXMgc2lnbiBsb29rIGF0IHRoZSB2YWx1ZSBiZWZvcmUgaXQgd2FzIHJvdW5kZWQsXHJcbiAgICAvLyBpLmUuIGxvb2sgYXQgYHhgIHJhdGhlciB0aGFuIGB5YC5cclxuICAgIHJldHVybiB4LmlzbmVnKCkgJiYgIXguaXNaZXJvKCkgPyAnLScgKyBzdHIgOiBzdHI7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByb3VuZGVkIHRvIGEgd2hvbGUgbnVtYmVyIHVzaW5nXHJcbiAgICogcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b0ludGVnZXIgPSBQLnRvaW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuICAgIHJldHVybiByb3VuZChuZXcgQ3Rvcih4KSwgZ2V0QmFzZTEwRXhwb25lbnQoeCkgKyAxLCBDdG9yLnJvdW5kaW5nKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBjb252ZXJ0ZWQgdG8gYSBudW1iZXIgcHJpbWl0aXZlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b051bWJlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiArdGhpcztcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHJhaXNlZCB0byB0aGUgcG93ZXIgYHlgLFxyXG4gICAqIHRydW5jYXRlZCB0byBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKiBGb3Igbm9uLWludGVnZXIgb3IgdmVyeSBsYXJnZSBleHBvbmVudHMgcG93KHgsIHkpIGlzIGNhbGN1bGF0ZWQgdXNpbmdcclxuICAgKlxyXG4gICAqICAgeF55ID0gZXhwKHkqbG4oeCkpXHJcbiAgICpcclxuICAgKiBUaGUgbWF4aW11bSBlcnJvciBpcyAxIHVscCAodW5pdCBpbiBsYXN0IHBsYWNlKS5cclxuICAgKlxyXG4gICAqIHkge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gVGhlIHBvd2VyIHRvIHdoaWNoIHRvIHJhaXNlIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9Qb3dlciA9IFAucG93ID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciBlLCBrLCBwciwgciwgc2lnbiwgeUlzSW50LFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIGd1YXJkID0gMTIsXHJcbiAgICAgIHluID0gKyh5ID0gbmV3IEN0b3IoeSkpO1xyXG5cclxuICAgIC8vIHBvdyh4LCAwKSA9IDFcclxuICAgIGlmICgheS5zKSByZXR1cm4gbmV3IEN0b3IoT05FKTtcclxuXHJcbiAgICB4ID0gbmV3IEN0b3IoeCk7XHJcblxyXG4gICAgLy8gcG93KDAsIHkgPiAwKSA9IDBcclxuICAgIC8vIHBvdygwLCB5IDwgMCkgPSBJbmZpbml0eVxyXG4gICAgaWYgKCF4LnMpIHtcclxuICAgICAgaWYgKHkucyA8IDEpIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdJbmZpbml0eScpO1xyXG4gICAgICByZXR1cm4geDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwb3coMSwgeSkgPSAxXHJcbiAgICBpZiAoeC5lcShPTkUpKSByZXR1cm4geDtcclxuXHJcbiAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG5cclxuICAgIC8vIHBvdyh4LCAxKSA9IHhcclxuICAgIGlmICh5LmVxKE9ORSkpIHJldHVybiByb3VuZCh4LCBwcik7XHJcblxyXG4gICAgZSA9IHkuZTtcclxuICAgIGsgPSB5LmQubGVuZ3RoIC0gMTtcclxuICAgIHlJc0ludCA9IGUgPj0gaztcclxuICAgIHNpZ24gPSB4LnM7XHJcblxyXG4gICAgaWYgKCF5SXNJbnQpIHtcclxuXHJcbiAgICAgIC8vIHBvdyh4IDwgMCwgeSBub24taW50ZWdlcikgPSBOYU5cclxuICAgICAgaWYgKHNpZ24gPCAwKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnTmFOJyk7XHJcblxyXG4gICAgLy8gSWYgeSBpcyBhIHNtYWxsIGludGVnZXIgdXNlIHRoZSAnZXhwb25lbnRpYXRpb24gYnkgc3F1YXJpbmcnIGFsZ29yaXRobS5cclxuICAgIH0gZWxzZSBpZiAoKGsgPSB5biA8IDAgPyAteW4gOiB5bikgPD0gTUFYX1NBRkVfSU5URUdFUikge1xyXG4gICAgICByID0gbmV3IEN0b3IoT05FKTtcclxuXHJcbiAgICAgIC8vIE1heCBrIG9mIDkwMDcxOTkyNTQ3NDA5OTEgdGFrZXMgNTMgbG9vcCBpdGVyYXRpb25zLlxyXG4gICAgICAvLyBNYXhpbXVtIGRpZ2l0cyBhcnJheSBsZW5ndGg7IGxlYXZlcyBbMjgsIDM0XSBndWFyZCBkaWdpdHMuXHJcbiAgICAgIGUgPSBNYXRoLmNlaWwocHIgLyBMT0dfQkFTRSArIDQpO1xyXG5cclxuICAgICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuXHJcbiAgICAgIGZvciAoOzspIHtcclxuICAgICAgICBpZiAoayAlIDIpIHtcclxuICAgICAgICAgIHIgPSByLnRpbWVzKHgpO1xyXG4gICAgICAgICAgdHJ1bmNhdGUoci5kLCBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGsgPSBtYXRoZmxvb3IoayAvIDIpO1xyXG4gICAgICAgIGlmIChrID09PSAwKSBicmVhaztcclxuXHJcbiAgICAgICAgeCA9IHgudGltZXMoeCk7XHJcbiAgICAgICAgdHJ1bmNhdGUoeC5kLCBlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG5cclxuICAgICAgcmV0dXJuIHkucyA8IDAgPyBuZXcgQ3RvcihPTkUpLmRpdihyKSA6IHJvdW5kKHIsIHByKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXN1bHQgaXMgbmVnYXRpdmUgaWYgeCBpcyBuZWdhdGl2ZSBhbmQgdGhlIGxhc3QgZGlnaXQgb2YgaW50ZWdlciB5IGlzIG9kZC5cclxuICAgIHNpZ24gPSBzaWduIDwgMCAmJiB5LmRbTWF0aC5tYXgoZSwgayldICYgMSA/IC0xIDogMTtcclxuXHJcbiAgICB4LnMgPSAxO1xyXG4gICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuICAgIHIgPSB5LnRpbWVzKGxuKHgsIHByICsgZ3VhcmQpKTtcclxuICAgIGV4dGVybmFsID0gdHJ1ZTtcclxuICAgIHIgPSBleHAocik7XHJcbiAgICByLnMgPSBzaWduO1xyXG5cclxuICAgIHJldHVybiByO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByb3VuZGVkIHRvIGBzZGAgc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAgICogdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogUmV0dXJuIGV4cG9uZW50aWFsIG5vdGF0aW9uIGlmIGBzZGAgaXMgbGVzcyB0aGFuIHRoZSBudW1iZXIgb2YgZGlnaXRzIG5lY2Vzc2FyeSB0byByZXByZXNlbnRcclxuICAgKiB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSB2YWx1ZSBpbiBub3JtYWwgbm90YXRpb24uXHJcbiAgICpcclxuICAgKiBbc2RdIHtudW1iZXJ9IFNpZ25pZmljYW50IGRpZ2l0cy4gSW50ZWdlciwgMSB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvUHJlY2lzaW9uID0gZnVuY3Rpb24gKHNkLCBybSkge1xyXG4gICAgdmFyIGUsIHN0cixcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmIChzZCA9PT0gdm9pZCAwKSB7XHJcbiAgICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KTtcclxuICAgICAgc3RyID0gdG9TdHJpbmcoeCwgZSA8PSBDdG9yLnRvRXhwTmVnIHx8IGUgPj0gQ3Rvci50b0V4cFBvcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjaGVja0ludDMyKHNkLCAxLCBNQVhfRElHSVRTKTtcclxuXHJcbiAgICAgIGlmIChybSA9PT0gdm9pZCAwKSBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICAgIGVsc2UgY2hlY2tJbnQzMihybSwgMCwgOCk7XHJcblxyXG4gICAgICB4ID0gcm91bmQobmV3IEN0b3IoeCksIHNkLCBybSk7XHJcbiAgICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KTtcclxuICAgICAgc3RyID0gdG9TdHJpbmcoeCwgc2QgPD0gZSB8fCBlIDw9IEN0b3IudG9FeHBOZWcsIHNkKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgcm91bmRlZCB0byBhIG1heGltdW0gb2YgYHNkYFxyXG4gICAqIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGBybWAsIG9yIHRvIGBwcmVjaXNpb25gIGFuZCBgcm91bmRpbmdgIHJlc3BlY3RpdmVseSBpZlxyXG4gICAqIG9taXR0ZWQuXHJcbiAgICpcclxuICAgKiBbc2RdIHtudW1iZXJ9IFNpZ25pZmljYW50IGRpZ2l0cy4gSW50ZWdlciwgMSB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvU2lnbmlmaWNhbnREaWdpdHMgPSBQLnRvc2QgPSBmdW5jdGlvbiAoc2QsIHJtKSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmIChzZCA9PT0gdm9pZCAwKSB7XHJcbiAgICAgIHNkID0gQ3Rvci5wcmVjaXNpb247XHJcbiAgICAgIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoZWNrSW50MzIoc2QsIDEsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgICAgaWYgKHJtID09PSB2b2lkIDApIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgICAgZWxzZSBjaGVja0ludDMyKHJtLCAwLCA4KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcm91bmQobmV3IEN0b3IoeCksIHNkLCBybSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICogUmV0dXJuIGV4cG9uZW50aWFsIG5vdGF0aW9uIGlmIHRoaXMgRGVjaW1hbCBoYXMgYSBwb3NpdGl2ZSBleHBvbmVudCBlcXVhbCB0byBvciBncmVhdGVyIHRoYW5cclxuICAgKiBgdG9FeHBQb3NgLCBvciBhIG5lZ2F0aXZlIGV4cG9uZW50IGVxdWFsIHRvIG9yIGxlc3MgdGhhbiBgdG9FeHBOZWdgLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b1N0cmluZyA9IFAudmFsdWVPZiA9IFAudmFsID0gUC50b0pTT04gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KSxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgcmV0dXJuIHRvU3RyaW5nKHgsIGUgPD0gQ3Rvci50b0V4cE5lZyB8fCBlID49IEN0b3IudG9FeHBQb3MpO1xyXG4gIH07XHJcblxyXG5cclxuICAvLyBIZWxwZXIgZnVuY3Rpb25zIGZvciBEZWNpbWFsLnByb3RvdHlwZSAoUCkgYW5kL29yIERlY2ltYWwgbWV0aG9kcywgYW5kIHRoZWlyIGNhbGxlcnMuXHJcblxyXG5cclxuICAvKlxyXG4gICAqICBhZGQgICAgICAgICAgICAgICAgIFAubWludXMsIFAucGx1c1xyXG4gICAqICBjaGVja0ludDMyICAgICAgICAgIFAudG9kcCwgUC50b0V4cG9uZW50aWFsLCBQLnRvRml4ZWQsIFAudG9QcmVjaXNpb24sIFAudG9zZFxyXG4gICAqICBkaWdpdHNUb1N0cmluZyAgICAgIFAubG9nLCBQLnNxcnQsIFAucG93LCB0b1N0cmluZywgZXhwLCBsblxyXG4gICAqICBkaXZpZGUgICAgICAgICAgICAgIFAuZGl2LCBQLmlkaXYsIFAubG9nLCBQLm1vZCwgUC5zcXJ0LCBleHAsIGxuXHJcbiAgICogIGV4cCAgICAgICAgICAgICAgICAgUC5leHAsIFAucG93XHJcbiAgICogIGdldEJhc2UxMEV4cG9uZW50ICAgUC5leHBvbmVudCwgUC5zZCwgUC50b2ludCwgUC5zcXJ0LCBQLnRvZHAsIFAudG9GaXhlZCwgUC50b1ByZWNpc2lvbixcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICBQLnRvU3RyaW5nLCBkaXZpZGUsIHJvdW5kLCB0b1N0cmluZywgZXhwLCBsblxyXG4gICAqICBnZXRMbjEwICAgICAgICAgICAgIFAubG9nLCBsblxyXG4gICAqICBnZXRaZXJvU3RyaW5nICAgICAgIGRpZ2l0c1RvU3RyaW5nLCB0b1N0cmluZ1xyXG4gICAqICBsbiAgICAgICAgICAgICAgICAgIFAubG9nLCBQLmxuLCBQLnBvdywgZXhwXHJcbiAgICogIHBhcnNlRGVjaW1hbCAgICAgICAgRGVjaW1hbFxyXG4gICAqICByb3VuZCAgICAgICAgICAgICAgIFAuYWJzLCBQLmlkaXYsIFAubG9nLCBQLm1pbnVzLCBQLm1vZCwgUC5uZWcsIFAucGx1cywgUC50b2ludCwgUC5zcXJ0LFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgIFAudGltZXMsIFAudG9kcCwgUC50b0V4cG9uZW50aWFsLCBQLnRvRml4ZWQsIFAucG93LCBQLnRvUHJlY2lzaW9uLCBQLnRvc2QsXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgZGl2aWRlLCBnZXRMbjEwLCBleHAsIGxuXHJcbiAgICogIHN1YnRyYWN0ICAgICAgICAgICAgUC5taW51cywgUC5wbHVzXHJcbiAgICogIHRvU3RyaW5nICAgICAgICAgICAgUC50b0V4cG9uZW50aWFsLCBQLnRvRml4ZWQsIFAudG9QcmVjaXNpb24sIFAudG9TdHJpbmcsIFAudmFsdWVPZlxyXG4gICAqICB0cnVuY2F0ZSAgICAgICAgICAgIFAucG93XHJcbiAgICpcclxuICAgKiAgVGhyb3dzOiAgICAgICAgICAgICBQLmxvZywgUC5tb2QsIFAuc2QsIFAuc3FydCwgUC5wb3csICBjaGVja0ludDMyLCBkaXZpZGUsIHJvdW5kLFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgIGdldExuMTAsIGV4cCwgbG4sIHBhcnNlRGVjaW1hbCwgRGVjaW1hbCwgY29uZmlnXHJcbiAgICovXHJcblxyXG5cclxuICBmdW5jdGlvbiBhZGQoeCwgeSkge1xyXG4gICAgdmFyIGNhcnJ5LCBkLCBlLCBpLCBrLCBsZW4sIHhkLCB5ZCxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcblxyXG4gICAgLy8gSWYgZWl0aGVyIGlzIHplcm8uLi5cclxuICAgIGlmICgheC5zIHx8ICF5LnMpIHtcclxuXHJcbiAgICAgIC8vIFJldHVybiB4IGlmIHkgaXMgemVyby5cclxuICAgICAgLy8gUmV0dXJuIHkgaWYgeSBpcyBub24temVyby5cclxuICAgICAgaWYgKCF5LnMpIHkgPSBuZXcgQ3Rvcih4KTtcclxuICAgICAgcmV0dXJuIGV4dGVybmFsID8gcm91bmQoeSwgcHIpIDogeTtcclxuICAgIH1cclxuXHJcbiAgICB4ZCA9IHguZDtcclxuICAgIHlkID0geS5kO1xyXG5cclxuICAgIC8vIHggYW5kIHkgYXJlIGZpbml0ZSwgbm9uLXplcm8gbnVtYmVycyB3aXRoIHRoZSBzYW1lIHNpZ24uXHJcblxyXG4gICAgayA9IHguZTtcclxuICAgIGUgPSB5LmU7XHJcbiAgICB4ZCA9IHhkLnNsaWNlKCk7XHJcbiAgICBpID0gayAtIGU7XHJcblxyXG4gICAgLy8gSWYgYmFzZSAxZTcgZXhwb25lbnRzIGRpZmZlci4uLlxyXG4gICAgaWYgKGkpIHtcclxuICAgICAgaWYgKGkgPCAwKSB7XHJcbiAgICAgICAgZCA9IHhkO1xyXG4gICAgICAgIGkgPSAtaTtcclxuICAgICAgICBsZW4gPSB5ZC5sZW5ndGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZCA9IHlkO1xyXG4gICAgICAgIGUgPSBrO1xyXG4gICAgICAgIGxlbiA9IHhkLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTGltaXQgbnVtYmVyIG9mIHplcm9zIHByZXBlbmRlZCB0byBtYXgoY2VpbChwciAvIExPR19CQVNFKSwgbGVuKSArIDEuXHJcbiAgICAgIGsgPSBNYXRoLmNlaWwocHIgLyBMT0dfQkFTRSk7XHJcbiAgICAgIGxlbiA9IGsgPiBsZW4gPyBrICsgMSA6IGxlbiArIDE7XHJcblxyXG4gICAgICBpZiAoaSA+IGxlbikge1xyXG4gICAgICAgIGkgPSBsZW47XHJcbiAgICAgICAgZC5sZW5ndGggPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBQcmVwZW5kIHplcm9zIHRvIGVxdWFsaXNlIGV4cG9uZW50cy4gTm90ZTogRmFzdGVyIHRvIHVzZSByZXZlcnNlIHRoZW4gZG8gdW5zaGlmdHMuXHJcbiAgICAgIGQucmV2ZXJzZSgpO1xyXG4gICAgICBmb3IgKDsgaS0tOykgZC5wdXNoKDApO1xyXG4gICAgICBkLnJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZW4gPSB4ZC5sZW5ndGg7XHJcbiAgICBpID0geWQubGVuZ3RoO1xyXG5cclxuICAgIC8vIElmIHlkIGlzIGxvbmdlciB0aGFuIHhkLCBzd2FwIHhkIGFuZCB5ZCBzbyB4ZCBwb2ludHMgdG8gdGhlIGxvbmdlciBhcnJheS5cclxuICAgIGlmIChsZW4gLSBpIDwgMCkge1xyXG4gICAgICBpID0gbGVuO1xyXG4gICAgICBkID0geWQ7XHJcbiAgICAgIHlkID0geGQ7XHJcbiAgICAgIHhkID0gZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPbmx5IHN0YXJ0IGFkZGluZyBhdCB5ZC5sZW5ndGggLSAxIGFzIHRoZSBmdXJ0aGVyIGRpZ2l0cyBvZiB4ZCBjYW4gYmUgbGVmdCBhcyB0aGV5IGFyZS5cclxuICAgIGZvciAoY2FycnkgPSAwOyBpOykge1xyXG4gICAgICBjYXJyeSA9ICh4ZFstLWldID0geGRbaV0gKyB5ZFtpXSArIGNhcnJ5KSAvIEJBU0UgfCAwO1xyXG4gICAgICB4ZFtpXSAlPSBCQVNFO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjYXJyeSkge1xyXG4gICAgICB4ZC51bnNoaWZ0KGNhcnJ5KTtcclxuICAgICAgKytlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIC8vIE5vIG5lZWQgdG8gY2hlY2sgZm9yIHplcm8sIGFzICt4ICsgK3kgIT0gMCAmJiAteCArIC15ICE9IDBcclxuICAgIGZvciAobGVuID0geGQubGVuZ3RoOyB4ZFstLWxlbl0gPT0gMDspIHhkLnBvcCgpO1xyXG5cclxuICAgIHkuZCA9IHhkO1xyXG4gICAgeS5lID0gZTtcclxuXHJcbiAgICByZXR1cm4gZXh0ZXJuYWwgPyByb3VuZCh5LCBwcikgOiB5O1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGNoZWNrSW50MzIoaSwgbWluLCBtYXgpIHtcclxuICAgIGlmIChpICE9PSB+fmkgfHwgaSA8IG1pbiB8fCBpID4gbWF4KSB7XHJcbiAgICAgIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIGkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGRpZ2l0c1RvU3RyaW5nKGQpIHtcclxuICAgIHZhciBpLCBrLCB3cyxcclxuICAgICAgaW5kZXhPZkxhc3RXb3JkID0gZC5sZW5ndGggLSAxLFxyXG4gICAgICBzdHIgPSAnJyxcclxuICAgICAgdyA9IGRbMF07XHJcblxyXG4gICAgaWYgKGluZGV4T2ZMYXN0V29yZCA+IDApIHtcclxuICAgICAgc3RyICs9IHc7XHJcbiAgICAgIGZvciAoaSA9IDE7IGkgPCBpbmRleE9mTGFzdFdvcmQ7IGkrKykge1xyXG4gICAgICAgIHdzID0gZFtpXSArICcnO1xyXG4gICAgICAgIGsgPSBMT0dfQkFTRSAtIHdzLmxlbmd0aDtcclxuICAgICAgICBpZiAoaykgc3RyICs9IGdldFplcm9TdHJpbmcoayk7XHJcbiAgICAgICAgc3RyICs9IHdzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB3ID0gZFtpXTtcclxuICAgICAgd3MgPSB3ICsgJyc7XHJcbiAgICAgIGsgPSBMT0dfQkFTRSAtIHdzLmxlbmd0aDtcclxuICAgICAgaWYgKGspIHN0ciArPSBnZXRaZXJvU3RyaW5nKGspO1xyXG4gICAgfSBlbHNlIGlmICh3ID09PSAwKSB7XHJcbiAgICAgIHJldHVybiAnMCc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zIG9mIGxhc3Qgdy5cclxuICAgIGZvciAoOyB3ICUgMTAgPT09IDA7KSB3IC89IDEwO1xyXG5cclxuICAgIHJldHVybiBzdHIgKyB3O1xyXG4gIH1cclxuXHJcblxyXG4gIHZhciBkaXZpZGUgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIEFzc3VtZXMgbm9uLXplcm8geCBhbmQgaywgYW5kIGhlbmNlIG5vbi16ZXJvIHJlc3VsdC5cclxuICAgIGZ1bmN0aW9uIG11bHRpcGx5SW50ZWdlcih4LCBrKSB7XHJcbiAgICAgIHZhciB0ZW1wLFxyXG4gICAgICAgIGNhcnJ5ID0gMCxcclxuICAgICAgICBpID0geC5sZW5ndGg7XHJcblxyXG4gICAgICBmb3IgKHggPSB4LnNsaWNlKCk7IGktLTspIHtcclxuICAgICAgICB0ZW1wID0geFtpXSAqIGsgKyBjYXJyeTtcclxuICAgICAgICB4W2ldID0gdGVtcCAlIEJBU0UgfCAwO1xyXG4gICAgICAgIGNhcnJ5ID0gdGVtcCAvIEJBU0UgfCAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2FycnkpIHgudW5zaGlmdChjYXJyeSk7XHJcblxyXG4gICAgICByZXR1cm4geDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb21wYXJlKGEsIGIsIGFMLCBiTCkge1xyXG4gICAgICB2YXIgaSwgcjtcclxuXHJcbiAgICAgIGlmIChhTCAhPSBiTCkge1xyXG4gICAgICAgIHIgPSBhTCA+IGJMID8gMSA6IC0xO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAoaSA9IHIgPSAwOyBpIDwgYUw7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGFbaV0gIT0gYltpXSkge1xyXG4gICAgICAgICAgICByID0gYVtpXSA+IGJbaV0gPyAxIDogLTE7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3VidHJhY3QoYSwgYiwgYUwpIHtcclxuICAgICAgdmFyIGkgPSAwO1xyXG5cclxuICAgICAgLy8gU3VidHJhY3QgYiBmcm9tIGEuXHJcbiAgICAgIGZvciAoOyBhTC0tOykge1xyXG4gICAgICAgIGFbYUxdIC09IGk7XHJcbiAgICAgICAgaSA9IGFbYUxdIDwgYlthTF0gPyAxIDogMDtcclxuICAgICAgICBhW2FMXSA9IGkgKiBCQVNFICsgYVthTF0gLSBiW2FMXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgIGZvciAoOyAhYVswXSAmJiBhLmxlbmd0aCA+IDE7KSBhLnNoaWZ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh4LCB5LCBwciwgZHApIHtcclxuICAgICAgdmFyIGNtcCwgZSwgaSwgaywgcHJvZCwgcHJvZEwsIHEsIHFkLCByZW0sIHJlbUwsIHJlbTAsIHNkLCB0LCB4aSwgeEwsIHlkMCwgeUwsIHl6LFxyXG4gICAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICAgIHNpZ24gPSB4LnMgPT0geS5zID8gMSA6IC0xLFxyXG4gICAgICAgIHhkID0geC5kLFxyXG4gICAgICAgIHlkID0geS5kO1xyXG5cclxuICAgICAgLy8gRWl0aGVyIDA/XHJcbiAgICAgIGlmICgheC5zKSByZXR1cm4gbmV3IEN0b3IoeCk7XHJcbiAgICAgIGlmICgheS5zKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnRGl2aXNpb24gYnkgemVybycpO1xyXG5cclxuICAgICAgZSA9IHguZSAtIHkuZTtcclxuICAgICAgeUwgPSB5ZC5sZW5ndGg7XHJcbiAgICAgIHhMID0geGQubGVuZ3RoO1xyXG4gICAgICBxID0gbmV3IEN0b3Ioc2lnbik7XHJcbiAgICAgIHFkID0gcS5kID0gW107XHJcblxyXG4gICAgICAvLyBSZXN1bHQgZXhwb25lbnQgbWF5IGJlIG9uZSBsZXNzIHRoYW4gZS5cclxuICAgICAgZm9yIChpID0gMDsgeWRbaV0gPT0gKHhkW2ldIHx8IDApOyApICsraTtcclxuICAgICAgaWYgKHlkW2ldID4gKHhkW2ldIHx8IDApKSAtLWU7XHJcblxyXG4gICAgICBpZiAocHIgPT0gbnVsbCkge1xyXG4gICAgICAgIHNkID0gcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuICAgICAgfSBlbHNlIGlmIChkcCkge1xyXG4gICAgICAgIHNkID0gcHIgKyAoZ2V0QmFzZTEwRXhwb25lbnQoeCkgLSBnZXRCYXNlMTBFeHBvbmVudCh5KSkgKyAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNkID0gcHI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzZCA8IDApIHJldHVybiBuZXcgQ3RvcigwKTtcclxuXHJcbiAgICAgIC8vIENvbnZlcnQgcHJlY2lzaW9uIGluIG51bWJlciBvZiBiYXNlIDEwIGRpZ2l0cyB0byBiYXNlIDFlNyBkaWdpdHMuXHJcbiAgICAgIHNkID0gc2QgLyBMT0dfQkFTRSArIDIgfCAwO1xyXG4gICAgICBpID0gMDtcclxuXHJcbiAgICAgIC8vIGRpdmlzb3IgPCAxZTdcclxuICAgICAgaWYgKHlMID09IDEpIHtcclxuICAgICAgICBrID0gMDtcclxuICAgICAgICB5ZCA9IHlkWzBdO1xyXG4gICAgICAgIHNkKys7XHJcblxyXG4gICAgICAgIC8vIGsgaXMgdGhlIGNhcnJ5LlxyXG4gICAgICAgIGZvciAoOyAoaSA8IHhMIHx8IGspICYmIHNkLS07IGkrKykge1xyXG4gICAgICAgICAgdCA9IGsgKiBCQVNFICsgKHhkW2ldIHx8IDApO1xyXG4gICAgICAgICAgcWRbaV0gPSB0IC8geWQgfCAwO1xyXG4gICAgICAgICAgayA9IHQgJSB5ZCB8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgLy8gZGl2aXNvciA+PSAxZTdcclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgLy8gTm9ybWFsaXNlIHhkIGFuZCB5ZCBzbyBoaWdoZXN0IG9yZGVyIGRpZ2l0IG9mIHlkIGlzID49IEJBU0UvMlxyXG4gICAgICAgIGsgPSBCQVNFIC8gKHlkWzBdICsgMSkgfCAwO1xyXG5cclxuICAgICAgICBpZiAoayA+IDEpIHtcclxuICAgICAgICAgIHlkID0gbXVsdGlwbHlJbnRlZ2VyKHlkLCBrKTtcclxuICAgICAgICAgIHhkID0gbXVsdGlwbHlJbnRlZ2VyKHhkLCBrKTtcclxuICAgICAgICAgIHlMID0geWQubGVuZ3RoO1xyXG4gICAgICAgICAgeEwgPSB4ZC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB4aSA9IHlMO1xyXG4gICAgICAgIHJlbSA9IHhkLnNsaWNlKDAsIHlMKTtcclxuICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8gQWRkIHplcm9zIHRvIG1ha2UgcmVtYWluZGVyIGFzIGxvbmcgYXMgZGl2aXNvci5cclxuICAgICAgICBmb3IgKDsgcmVtTCA8IHlMOykgcmVtW3JlbUwrK10gPSAwO1xyXG5cclxuICAgICAgICB5eiA9IHlkLnNsaWNlKCk7XHJcbiAgICAgICAgeXoudW5zaGlmdCgwKTtcclxuICAgICAgICB5ZDAgPSB5ZFswXTtcclxuXHJcbiAgICAgICAgaWYgKHlkWzFdID49IEJBU0UgLyAyKSArK3lkMDtcclxuXHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgayA9IDA7XHJcblxyXG4gICAgICAgICAgLy8gQ29tcGFyZSBkaXZpc29yIGFuZCByZW1haW5kZXIuXHJcbiAgICAgICAgICBjbXAgPSBjb21wYXJlKHlkLCByZW0sIHlMLCByZW1MKTtcclxuXHJcbiAgICAgICAgICAvLyBJZiBkaXZpc29yIDwgcmVtYWluZGVyLlxyXG4gICAgICAgICAgaWYgKGNtcCA8IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0cmlhbCBkaWdpdCwgay5cclxuICAgICAgICAgICAgcmVtMCA9IHJlbVswXTtcclxuICAgICAgICAgICAgaWYgKHlMICE9IHJlbUwpIHJlbTAgPSByZW0wICogQkFTRSArIChyZW1bMV0gfHwgMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBrIHdpbGwgYmUgaG93IG1hbnkgdGltZXMgdGhlIGRpdmlzb3IgZ29lcyBpbnRvIHRoZSBjdXJyZW50IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgayA9IHJlbTAgLyB5ZDAgfCAwO1xyXG5cclxuICAgICAgICAgICAgLy8gIEFsZ29yaXRobTpcclxuICAgICAgICAgICAgLy8gIDEuIHByb2R1Y3QgPSBkaXZpc29yICogdHJpYWwgZGlnaXQgKGspXHJcbiAgICAgICAgICAgIC8vICAyLiBpZiBwcm9kdWN0ID4gcmVtYWluZGVyOiBwcm9kdWN0IC09IGRpdmlzb3IsIGstLVxyXG4gICAgICAgICAgICAvLyAgMy4gcmVtYWluZGVyIC09IHByb2R1Y3RcclxuICAgICAgICAgICAgLy8gIDQuIGlmIHByb2R1Y3Qgd2FzIDwgcmVtYWluZGVyIGF0IDI6XHJcbiAgICAgICAgICAgIC8vICAgIDUuIGNvbXBhcmUgbmV3IHJlbWFpbmRlciBhbmQgZGl2aXNvclxyXG4gICAgICAgICAgICAvLyAgICA2LiBJZiByZW1haW5kZXIgPiBkaXZpc29yOiByZW1haW5kZXIgLT0gZGl2aXNvciwgaysrXHJcblxyXG4gICAgICAgICAgICBpZiAoayA+IDEpIHtcclxuICAgICAgICAgICAgICBpZiAoayA+PSBCQVNFKSBrID0gQkFTRSAtIDE7XHJcblxyXG4gICAgICAgICAgICAgIC8vIHByb2R1Y3QgPSBkaXZpc29yICogdHJpYWwgZGlnaXQuXHJcbiAgICAgICAgICAgICAgcHJvZCA9IG11bHRpcGx5SW50ZWdlcih5ZCwgayk7XHJcbiAgICAgICAgICAgICAgcHJvZEwgPSBwcm9kLmxlbmd0aDtcclxuICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQ29tcGFyZSBwcm9kdWN0IGFuZCByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgY21wID0gY29tcGFyZShwcm9kLCByZW0sIHByb2RMLCByZW1MKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gcHJvZHVjdCA+IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICBpZiAoY21wID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGstLTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdWJ0cmFjdCBkaXZpc29yIGZyb20gcHJvZHVjdC5cclxuICAgICAgICAgICAgICAgIHN1YnRyYWN0KHByb2QsIHlMIDwgcHJvZEwgPyB5eiA6IHlkLCBwcm9kTCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAvLyBjbXAgaXMgLTEuXHJcbiAgICAgICAgICAgICAgLy8gSWYgayBpcyAwLCB0aGVyZSBpcyBubyBuZWVkIHRvIGNvbXBhcmUgeWQgYW5kIHJlbSBhZ2FpbiBiZWxvdywgc28gY2hhbmdlIGNtcCB0byAxXHJcbiAgICAgICAgICAgICAgLy8gdG8gYXZvaWQgaXQuIElmIGsgaXMgMSB0aGVyZSBpcyBhIG5lZWQgdG8gY29tcGFyZSB5ZCBhbmQgcmVtIGFnYWluIGJlbG93LlxyXG4gICAgICAgICAgICAgIGlmIChrID09IDApIGNtcCA9IGsgPSAxO1xyXG4gICAgICAgICAgICAgIHByb2QgPSB5ZC5zbGljZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcm9kTCA9IHByb2QubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAocHJvZEwgPCByZW1MKSBwcm9kLnVuc2hpZnQoMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTdWJ0cmFjdCBwcm9kdWN0IGZyb20gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICBzdWJ0cmFjdChyZW0sIHByb2QsIHJlbUwpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgcHJvZHVjdCB3YXMgPCBwcmV2aW91cyByZW1haW5kZXIuXHJcbiAgICAgICAgICAgIGlmIChjbXAgPT0gLTEpIHtcclxuICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQ29tcGFyZSBkaXZpc29yIGFuZCBuZXcgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIGNtcCA9IGNvbXBhcmUoeWQsIHJlbSwgeUwsIHJlbUwpO1xyXG5cclxuICAgICAgICAgICAgICAvLyBJZiBkaXZpc29yIDwgbmV3IHJlbWFpbmRlciwgc3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICBpZiAoY21wIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgaysrO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN1YnRyYWN0IGRpdmlzb3IgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmFjdChyZW0sIHlMIDwgcmVtTCA/IHl6IDogeWQsIHJlbUwpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVtTCA9IHJlbS5sZW5ndGg7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGNtcCA9PT0gMCkge1xyXG4gICAgICAgICAgICBrKys7XHJcbiAgICAgICAgICAgIHJlbSA9IFswXTtcclxuICAgICAgICAgIH0gICAgLy8gaWYgY21wID09PSAxLCBrIHdpbGwgYmUgMFxyXG5cclxuICAgICAgICAgIC8vIEFkZCB0aGUgbmV4dCBkaWdpdCwgaywgdG8gdGhlIHJlc3VsdCBhcnJheS5cclxuICAgICAgICAgIHFkW2krK10gPSBrO1xyXG5cclxuICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgcmVtYWluZGVyLlxyXG4gICAgICAgICAgaWYgKGNtcCAmJiByZW1bMF0pIHtcclxuICAgICAgICAgICAgcmVtW3JlbUwrK10gPSB4ZFt4aV0gfHwgMDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlbSA9IFt4ZFt4aV1dO1xyXG4gICAgICAgICAgICByZW1MID0gMTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSB3aGlsZSAoKHhpKysgPCB4TCB8fCByZW1bMF0gIT09IHZvaWQgMCkgJiYgc2QtLSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIExlYWRpbmcgemVybz9cclxuICAgICAgaWYgKCFxZFswXSkgcWQuc2hpZnQoKTtcclxuXHJcbiAgICAgIHEuZSA9IGU7XHJcblxyXG4gICAgICByZXR1cm4gcm91bmQocSwgZHAgPyBwciArIGdldEJhc2UxMEV4cG9uZW50KHEpICsgMSA6IHByKTtcclxuICAgIH07XHJcbiAgfSkoKTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG5hdHVyYWwgZXhwb25lbnRpYWwgb2YgYHhgIHRydW5jYXRlZCB0byBgc2RgXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICogVGF5bG9yL01hY2xhdXJpbiBzZXJpZXMuXHJcbiAgICpcclxuICAgKiBleHAoeCkgPSB4XjAvMCEgKyB4XjEvMSEgKyB4XjIvMiEgKyB4XjMvMyEgKyAuLi5cclxuICAgKlxyXG4gICAqIEFyZ3VtZW50IHJlZHVjdGlvbjpcclxuICAgKiAgIFJlcGVhdCB4ID0geCAvIDMyLCBrICs9IDUsIHVudGlsIHx4fCA8IDAuMVxyXG4gICAqICAgZXhwKHgpID0gZXhwKHggLyAyXmspXigyXmspXHJcbiAgICpcclxuICAgKiBQcmV2aW91c2x5LCB0aGUgYXJndW1lbnQgd2FzIGluaXRpYWxseSByZWR1Y2VkIGJ5XHJcbiAgICogZXhwKHgpID0gZXhwKHIpICogMTBeayAgd2hlcmUgciA9IHggLSBrICogbG4xMCwgayA9IGZsb29yKHggLyBsbjEwKVxyXG4gICAqIHRvIGZpcnN0IHB1dCByIGluIHRoZSByYW5nZSBbMCwgbG4xMF0sIGJlZm9yZSBkaXZpZGluZyBieSAzMiB1bnRpbCB8eHwgPCAwLjEsIGJ1dCB0aGlzIHdhc1xyXG4gICAqIGZvdW5kIHRvIGJlIHNsb3dlciB0aGFuIGp1c3QgZGl2aWRpbmcgcmVwZWF0ZWRseSBieSAzMiBhcyBhYm92ZS5cclxuICAgKlxyXG4gICAqIChNYXRoIG9iamVjdCBpbnRlZ2VyIG1pbi9tYXg6IE1hdGguZXhwKDcwOSkgPSA4LjJlKzMwNywgTWF0aC5leHAoLTc0NSkgPSA1ZS0zMjQpXHJcbiAgICpcclxuICAgKiAgZXhwKHgpIGlzIG5vbi10ZXJtaW5hdGluZyBmb3IgYW55IGZpbml0ZSwgbm9uLXplcm8geC5cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGV4cCh4LCBzZCkge1xyXG4gICAgdmFyIGRlbm9taW5hdG9yLCBndWFyZCwgcG93LCBzdW0sIHQsIHdwcixcclxuICAgICAgaSA9IDAsXHJcbiAgICAgIGsgPSAwLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuXHJcbiAgICBpZiAoZ2V0QmFzZTEwRXhwb25lbnQoeCkgPiAxNikgdGhyb3cgRXJyb3IoZXhwb25lbnRPdXRPZlJhbmdlICsgZ2V0QmFzZTEwRXhwb25lbnQoeCkpO1xyXG5cclxuICAgIC8vIGV4cCgwKSA9IDFcclxuICAgIGlmICgheC5zKSByZXR1cm4gbmV3IEN0b3IoT05FKTtcclxuXHJcbiAgICBpZiAoc2QgPT0gbnVsbCkge1xyXG4gICAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG4gICAgICB3cHIgPSBwcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdwciA9IHNkO1xyXG4gICAgfVxyXG5cclxuICAgIHQgPSBuZXcgQ3RvcigwLjAzMTI1KTtcclxuXHJcbiAgICB3aGlsZSAoeC5hYnMoKS5ndGUoMC4xKSkge1xyXG4gICAgICB4ID0geC50aW1lcyh0KTsgICAgLy8geCA9IHggLyAyXjVcclxuICAgICAgayArPSA1O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEVzdGltYXRlIHRoZSBwcmVjaXNpb24gaW5jcmVhc2UgbmVjZXNzYXJ5IHRvIGVuc3VyZSB0aGUgZmlyc3QgNCByb3VuZGluZyBkaWdpdHMgYXJlIGNvcnJlY3QuXHJcbiAgICBndWFyZCA9IE1hdGgubG9nKG1hdGhwb3coMiwgaykpIC8gTWF0aC5MTjEwICogMiArIDUgfCAwO1xyXG4gICAgd3ByICs9IGd1YXJkO1xyXG4gICAgZGVub21pbmF0b3IgPSBwb3cgPSBzdW0gPSBuZXcgQ3RvcihPTkUpO1xyXG4gICAgQ3Rvci5wcmVjaXNpb24gPSB3cHI7XHJcblxyXG4gICAgZm9yICg7Oykge1xyXG4gICAgICBwb3cgPSByb3VuZChwb3cudGltZXMoeCksIHdwcik7XHJcbiAgICAgIGRlbm9taW5hdG9yID0gZGVub21pbmF0b3IudGltZXMoKytpKTtcclxuICAgICAgdCA9IHN1bS5wbHVzKGRpdmlkZShwb3csIGRlbm9taW5hdG9yLCB3cHIpKTtcclxuXHJcbiAgICAgIGlmIChkaWdpdHNUb1N0cmluZyh0LmQpLnNsaWNlKDAsIHdwcikgPT09IGRpZ2l0c1RvU3RyaW5nKHN1bS5kKS5zbGljZSgwLCB3cHIpKSB7XHJcbiAgICAgICAgd2hpbGUgKGstLSkgc3VtID0gcm91bmQoc3VtLnRpbWVzKHN1bSksIHdwcik7XHJcbiAgICAgICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgICAgICByZXR1cm4gc2QgPT0gbnVsbCA/IChleHRlcm5hbCA9IHRydWUsIHJvdW5kKHN1bSwgcHIpKSA6IHN1bTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3VtID0gdDtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLyBDYWxjdWxhdGUgdGhlIGJhc2UgMTAgZXhwb25lbnQgZnJvbSB0aGUgYmFzZSAxZTcgZXhwb25lbnQuXHJcbiAgZnVuY3Rpb24gZ2V0QmFzZTEwRXhwb25lbnQoeCkge1xyXG4gICAgdmFyIGUgPSB4LmUgKiBMT0dfQkFTRSxcclxuICAgICAgdyA9IHguZFswXTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgdGhlIGZpcnN0IHdvcmQgb2YgdGhlIGRpZ2l0cyBhcnJheS5cclxuICAgIGZvciAoOyB3ID49IDEwOyB3IC89IDEwKSBlKys7XHJcbiAgICByZXR1cm4gZTtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiBnZXRMbjEwKEN0b3IsIHNkLCBwcikge1xyXG5cclxuICAgIGlmIChzZCA+IEN0b3IuTE4xMC5zZCgpKSB7XHJcblxyXG5cclxuICAgICAgLy8gUmVzZXQgZ2xvYmFsIHN0YXRlIGluIGNhc2UgdGhlIGV4Y2VwdGlvbiBpcyBjYXVnaHQuXHJcbiAgICAgIGV4dGVybmFsID0gdHJ1ZTtcclxuICAgICAgaWYgKHByKSBDdG9yLnByZWNpc2lvbiA9IHByO1xyXG4gICAgICB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnTE4xMCBwcmVjaXNpb24gbGltaXQgZXhjZWVkZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcm91bmQobmV3IEN0b3IoQ3Rvci5MTjEwKSwgc2QpO1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGdldFplcm9TdHJpbmcoaykge1xyXG4gICAgdmFyIHpzID0gJyc7XHJcbiAgICBmb3IgKDsgay0tOykgenMgKz0gJzAnO1xyXG4gICAgcmV0dXJuIHpzO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG5hdHVyYWwgbG9nYXJpdGhtIG9mIGB4YCB0cnVuY2F0ZWQgdG8gYHNkYCBzaWduaWZpY2FudFxyXG4gICAqIGRpZ2l0cy5cclxuICAgKlxyXG4gICAqICBsbihuKSBpcyBub24tdGVybWluYXRpbmcgKG4gIT0gMSlcclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGxuKHksIHNkKSB7XHJcbiAgICB2YXIgYywgYzAsIGRlbm9taW5hdG9yLCBlLCBudW1lcmF0b3IsIHN1bSwgdCwgd3ByLCB4MixcclxuICAgICAgbiA9IDEsXHJcbiAgICAgIGd1YXJkID0gMTAsXHJcbiAgICAgIHggPSB5LFxyXG4gICAgICB4ZCA9IHguZCxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcblxyXG4gICAgLy8gbG4oLXgpID0gTmFOXHJcbiAgICAvLyBsbigwKSA9IC1JbmZpbml0eVxyXG4gICAgaWYgKHgucyA8IDEpIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICh4LnMgPyAnTmFOJyA6ICctSW5maW5pdHknKSk7XHJcblxyXG4gICAgLy8gbG4oMSkgPSAwXHJcbiAgICBpZiAoeC5lcShPTkUpKSByZXR1cm4gbmV3IEN0b3IoMCk7XHJcblxyXG4gICAgaWYgKHNkID09IG51bGwpIHtcclxuICAgICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuICAgICAgd3ByID0gcHI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3cHIgPSBzZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoeC5lcSgxMCkpIHtcclxuICAgICAgaWYgKHNkID09IG51bGwpIGV4dGVybmFsID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIGdldExuMTAoQ3Rvciwgd3ByKTtcclxuICAgIH1cclxuXHJcbiAgICB3cHIgKz0gZ3VhcmQ7XHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IHdwcjtcclxuICAgIGMgPSBkaWdpdHNUb1N0cmluZyh4ZCk7XHJcbiAgICBjMCA9IGMuY2hhckF0KDApO1xyXG4gICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpO1xyXG5cclxuICAgIGlmIChNYXRoLmFicyhlKSA8IDEuNWUxNSkge1xyXG5cclxuICAgICAgLy8gQXJndW1lbnQgcmVkdWN0aW9uLlxyXG4gICAgICAvLyBUaGUgc2VyaWVzIGNvbnZlcmdlcyBmYXN0ZXIgdGhlIGNsb3NlciB0aGUgYXJndW1lbnQgaXMgdG8gMSwgc28gdXNpbmdcclxuICAgICAgLy8gbG4oYV5iKSA9IGIgKiBsbihhKSwgICBsbihhKSA9IGxuKGFeYikgLyBiXHJcbiAgICAgIC8vIG11bHRpcGx5IHRoZSBhcmd1bWVudCBieSBpdHNlbGYgdW50aWwgdGhlIGxlYWRpbmcgZGlnaXRzIG9mIHRoZSBzaWduaWZpY2FuZCBhcmUgNywgOCwgOSxcclxuICAgICAgLy8gMTAsIDExLCAxMiBvciAxMywgcmVjb3JkaW5nIHRoZSBudW1iZXIgb2YgbXVsdGlwbGljYXRpb25zIHNvIHRoZSBzdW0gb2YgdGhlIHNlcmllcyBjYW5cclxuICAgICAgLy8gbGF0ZXIgYmUgZGl2aWRlZCBieSB0aGlzIG51bWJlciwgdGhlbiBzZXBhcmF0ZSBvdXQgdGhlIHBvd2VyIG9mIDEwIHVzaW5nXHJcbiAgICAgIC8vIGxuKGEqMTBeYikgPSBsbihhKSArIGIqbG4oMTApLlxyXG5cclxuICAgICAgLy8gbWF4IG4gaXMgMjEgKGdpdmVzIDAuOSwgMS4wIG9yIDEuMSkgKDllMTUgLyAyMSA9IDQuMmUxNCkuXHJcbiAgICAgIC8vd2hpbGUgKGMwIDwgOSAmJiBjMCAhPSAxIHx8IGMwID09IDEgJiYgYy5jaGFyQXQoMSkgPiAxKSB7XHJcbiAgICAgIC8vIG1heCBuIGlzIDYgKGdpdmVzIDAuNyAtIDEuMylcclxuICAgICAgd2hpbGUgKGMwIDwgNyAmJiBjMCAhPSAxIHx8IGMwID09IDEgJiYgYy5jaGFyQXQoMSkgPiAzKSB7XHJcbiAgICAgICAgeCA9IHgudGltZXMoeSk7XHJcbiAgICAgICAgYyA9IGRpZ2l0c1RvU3RyaW5nKHguZCk7XHJcbiAgICAgICAgYzAgPSBjLmNoYXJBdCgwKTtcclxuICAgICAgICBuKys7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KTtcclxuXHJcbiAgICAgIGlmIChjMCA+IDEpIHtcclxuICAgICAgICB4ID0gbmV3IEN0b3IoJzAuJyArIGMpO1xyXG4gICAgICAgIGUrKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB4ID0gbmV3IEN0b3IoYzAgKyAnLicgKyBjLnNsaWNlKDEpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vIFRoZSBhcmd1bWVudCByZWR1Y3Rpb24gbWV0aG9kIGFib3ZlIG1heSByZXN1bHQgaW4gb3ZlcmZsb3cgaWYgdGhlIGFyZ3VtZW50IHkgaXMgYSBtYXNzaXZlXHJcbiAgICAgIC8vIG51bWJlciB3aXRoIGV4cG9uZW50ID49IDE1MDAwMDAwMDAwMDAwMDAgKDllMTUgLyA2ID0gMS41ZTE1KSwgc28gaW5zdGVhZCByZWNhbGwgdGhpc1xyXG4gICAgICAvLyBmdW5jdGlvbiB1c2luZyBsbih4KjEwXmUpID0gbG4oeCkgKyBlKmxuKDEwKS5cclxuICAgICAgdCA9IGdldExuMTAoQ3Rvciwgd3ByICsgMiwgcHIpLnRpbWVzKGUgKyAnJyk7XHJcbiAgICAgIHggPSBsbihuZXcgQ3RvcihjMCArICcuJyArIGMuc2xpY2UoMSkpLCB3cHIgLSBndWFyZCkucGx1cyh0KTtcclxuXHJcbiAgICAgIEN0b3IucHJlY2lzaW9uID0gcHI7XHJcbiAgICAgIHJldHVybiBzZCA9PSBudWxsID8gKGV4dGVybmFsID0gdHJ1ZSwgcm91bmQoeCwgcHIpKSA6IHg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8geCBpcyByZWR1Y2VkIHRvIGEgdmFsdWUgbmVhciAxLlxyXG5cclxuICAgIC8vIFRheWxvciBzZXJpZXMuXHJcbiAgICAvLyBsbih5KSA9IGxuKCgxICsgeCkvKDEgLSB4KSkgPSAyKHggKyB4XjMvMyArIHheNS81ICsgeF43LzcgKyAuLi4pXHJcbiAgICAvLyB3aGVyZSB4ID0gKHkgLSAxKS8oeSArIDEpICAgICh8eHwgPCAxKVxyXG4gICAgc3VtID0gbnVtZXJhdG9yID0geCA9IGRpdmlkZSh4Lm1pbnVzKE9ORSksIHgucGx1cyhPTkUpLCB3cHIpO1xyXG4gICAgeDIgPSByb3VuZCh4LnRpbWVzKHgpLCB3cHIpO1xyXG4gICAgZGVub21pbmF0b3IgPSAzO1xyXG5cclxuICAgIGZvciAoOzspIHtcclxuICAgICAgbnVtZXJhdG9yID0gcm91bmQobnVtZXJhdG9yLnRpbWVzKHgyKSwgd3ByKTtcclxuICAgICAgdCA9IHN1bS5wbHVzKGRpdmlkZShudW1lcmF0b3IsIG5ldyBDdG9yKGRlbm9taW5hdG9yKSwgd3ByKSk7XHJcblxyXG4gICAgICBpZiAoZGlnaXRzVG9TdHJpbmcodC5kKS5zbGljZSgwLCB3cHIpID09PSBkaWdpdHNUb1N0cmluZyhzdW0uZCkuc2xpY2UoMCwgd3ByKSkge1xyXG4gICAgICAgIHN1bSA9IHN1bS50aW1lcygyKTtcclxuXHJcbiAgICAgICAgLy8gUmV2ZXJzZSB0aGUgYXJndW1lbnQgcmVkdWN0aW9uLlxyXG4gICAgICAgIGlmIChlICE9PSAwKSBzdW0gPSBzdW0ucGx1cyhnZXRMbjEwKEN0b3IsIHdwciArIDIsIHByKS50aW1lcyhlICsgJycpKTtcclxuICAgICAgICBzdW0gPSBkaXZpZGUoc3VtLCBuZXcgQ3RvcihuKSwgd3ByKTtcclxuXHJcbiAgICAgICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgICAgICByZXR1cm4gc2QgPT0gbnVsbCA/IChleHRlcm5hbCA9IHRydWUsIHJvdW5kKHN1bSwgcHIpKSA6IHN1bTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3VtID0gdDtcclxuICAgICAgZGVub21pbmF0b3IgKz0gMjtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFBhcnNlIHRoZSB2YWx1ZSBvZiBhIG5ldyBEZWNpbWFsIGB4YCBmcm9tIHN0cmluZyBgc3RyYC5cclxuICAgKi9cclxuICBmdW5jdGlvbiBwYXJzZURlY2ltYWwoeCwgc3RyKSB7XHJcbiAgICB2YXIgZSwgaSwgbGVuO1xyXG5cclxuICAgIC8vIERlY2ltYWwgcG9pbnQ/XHJcbiAgICBpZiAoKGUgPSBzdHIuaW5kZXhPZignLicpKSA+IC0xKSBzdHIgPSBzdHIucmVwbGFjZSgnLicsICcnKTtcclxuXHJcbiAgICAvLyBFeHBvbmVudGlhbCBmb3JtP1xyXG4gICAgaWYgKChpID0gc3RyLnNlYXJjaCgvZS9pKSkgPiAwKSB7XHJcblxyXG4gICAgICAvLyBEZXRlcm1pbmUgZXhwb25lbnQuXHJcbiAgICAgIGlmIChlIDwgMCkgZSA9IGk7XHJcbiAgICAgIGUgKz0gK3N0ci5zbGljZShpICsgMSk7XHJcbiAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgaSk7XHJcbiAgICB9IGVsc2UgaWYgKGUgPCAwKSB7XHJcblxyXG4gICAgICAvLyBJbnRlZ2VyLlxyXG4gICAgICBlID0gc3RyLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgbGVhZGluZyB6ZXJvcy5cclxuICAgIGZvciAoaSA9IDA7IHN0ci5jaGFyQ29kZUF0KGkpID09PSA0ODspICsraTtcclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICBmb3IgKGxlbiA9IHN0ci5sZW5ndGg7IHN0ci5jaGFyQ29kZUF0KGxlbiAtIDEpID09PSA0ODspIC0tbGVuO1xyXG4gICAgc3RyID0gc3RyLnNsaWNlKGksIGxlbik7XHJcblxyXG4gICAgaWYgKHN0cikge1xyXG4gICAgICBsZW4gLT0gaTtcclxuICAgICAgZSA9IGUgLSBpIC0gMTtcclxuICAgICAgeC5lID0gbWF0aGZsb29yKGUgLyBMT0dfQkFTRSk7XHJcbiAgICAgIHguZCA9IFtdO1xyXG5cclxuICAgICAgLy8gVHJhbnNmb3JtIGJhc2VcclxuXHJcbiAgICAgIC8vIGUgaXMgdGhlIGJhc2UgMTAgZXhwb25lbnQuXHJcbiAgICAgIC8vIGkgaXMgd2hlcmUgdG8gc2xpY2Ugc3RyIHRvIGdldCB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgZGlnaXRzIGFycmF5LlxyXG4gICAgICBpID0gKGUgKyAxKSAlIExPR19CQVNFO1xyXG4gICAgICBpZiAoZSA8IDApIGkgKz0gTE9HX0JBU0U7XHJcblxyXG4gICAgICBpZiAoaSA8IGxlbikge1xyXG4gICAgICAgIGlmIChpKSB4LmQucHVzaCgrc3RyLnNsaWNlKDAsIGkpKTtcclxuICAgICAgICBmb3IgKGxlbiAtPSBMT0dfQkFTRTsgaSA8IGxlbjspIHguZC5wdXNoKCtzdHIuc2xpY2UoaSwgaSArPSBMT0dfQkFTRSkpO1xyXG4gICAgICAgIHN0ciA9IHN0ci5zbGljZShpKTtcclxuICAgICAgICBpID0gTE9HX0JBU0UgLSBzdHIubGVuZ3RoO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGkgLT0gbGVuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKDsgaS0tOykgc3RyICs9ICcwJztcclxuICAgICAgeC5kLnB1c2goK3N0cik7XHJcblxyXG4gICAgICBpZiAoZXh0ZXJuYWwgJiYgKHguZSA+IE1BWF9FIHx8IHguZSA8IC1NQVhfRSkpIHRocm93IEVycm9yKGV4cG9uZW50T3V0T2ZSYW5nZSArIGUpO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vIFplcm8uXHJcbiAgICAgIHgucyA9IDA7XHJcbiAgICAgIHguZSA9IDA7XHJcbiAgICAgIHguZCA9IFswXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geDtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJvdW5kIGB4YCB0byBgc2RgIHNpZ25pZmljYW50IGRpZ2l0cywgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm1gIGlmIHByZXNlbnQgKHRydW5jYXRlIG90aGVyd2lzZSkuXHJcbiAgICovXHJcbiAgIGZ1bmN0aW9uIHJvdW5kKHgsIHNkLCBybSkge1xyXG4gICAgdmFyIGksIGosIGssIG4sIHJkLCBkb1JvdW5kLCB3LCB4ZGksXHJcbiAgICAgIHhkID0geC5kO1xyXG5cclxuICAgIC8vIHJkOiB0aGUgcm91bmRpbmcgZGlnaXQsIGkuZS4gdGhlIGRpZ2l0IGFmdGVyIHRoZSBkaWdpdCB0aGF0IG1heSBiZSByb3VuZGVkIHVwLlxyXG4gICAgLy8gdzogdGhlIHdvcmQgb2YgeGQgd2hpY2ggY29udGFpbnMgdGhlIHJvdW5kaW5nIGRpZ2l0LCBhIGJhc2UgMWU3IG51bWJlci5cclxuICAgIC8vIHhkaTogdGhlIGluZGV4IG9mIHcgd2l0aGluIHhkLlxyXG4gICAgLy8gbjogdGhlIG51bWJlciBvZiBkaWdpdHMgb2Ygdy5cclxuICAgIC8vIGk6IHdoYXQgd291bGQgYmUgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiB3IGlmIGFsbCB0aGUgbnVtYmVycyB3ZXJlIDcgZGlnaXRzIGxvbmcgKGkuZS4gaWZcclxuICAgIC8vIHRoZXkgaGFkIGxlYWRpbmcgemVyb3MpXHJcbiAgICAvLyBqOiBpZiA+IDAsIHRoZSBhY3R1YWwgaW5kZXggb2YgcmQgd2l0aGluIHcgKGlmIDwgMCwgcmQgaXMgYSBsZWFkaW5nIHplcm8pLlxyXG5cclxuICAgIC8vIEdldCB0aGUgbGVuZ3RoIG9mIHRoZSBmaXJzdCB3b3JkIG9mIHRoZSBkaWdpdHMgYXJyYXkgeGQuXHJcbiAgICBmb3IgKG4gPSAxLCBrID0geGRbMF07IGsgPj0gMTA7IGsgLz0gMTApIG4rKztcclxuICAgIGkgPSBzZCAtIG47XHJcblxyXG4gICAgLy8gSXMgdGhlIHJvdW5kaW5nIGRpZ2l0IGluIHRoZSBmaXJzdCB3b3JkIG9mIHhkP1xyXG4gICAgaWYgKGkgPCAwKSB7XHJcbiAgICAgIGkgKz0gTE9HX0JBU0U7XHJcbiAgICAgIGogPSBzZDtcclxuICAgICAgdyA9IHhkW3hkaSA9IDBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgeGRpID0gTWF0aC5jZWlsKChpICsgMSkgLyBMT0dfQkFTRSk7XHJcbiAgICAgIGsgPSB4ZC5sZW5ndGg7XHJcbiAgICAgIGlmICh4ZGkgPj0gaykgcmV0dXJuIHg7XHJcbiAgICAgIHcgPSBrID0geGRbeGRpXTtcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiB3LlxyXG4gICAgICBmb3IgKG4gPSAxOyBrID49IDEwOyBrIC89IDEwKSBuKys7XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiB3LlxyXG4gICAgICBpICU9IExPR19CQVNFO1xyXG5cclxuICAgICAgLy8gR2V0IHRoZSBpbmRleCBvZiByZCB3aXRoaW4gdywgYWRqdXN0ZWQgZm9yIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgIC8vIFRoZSBudW1iZXIgb2YgbGVhZGluZyB6ZXJvcyBvZiB3IGlzIGdpdmVuIGJ5IExPR19CQVNFIC0gbi5cclxuICAgICAgaiA9IGkgLSBMT0dfQkFTRSArIG47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJtICE9PSB2b2lkIDApIHtcclxuICAgICAgayA9IG1hdGhwb3coMTAsIG4gLSBqIC0gMSk7XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIHJvdW5kaW5nIGRpZ2l0IGF0IGluZGV4IGogb2Ygdy5cclxuICAgICAgcmQgPSB3IC8gayAlIDEwIHwgMDtcclxuXHJcbiAgICAgIC8vIEFyZSB0aGVyZSBhbnkgbm9uLXplcm8gZGlnaXRzIGFmdGVyIHRoZSByb3VuZGluZyBkaWdpdD9cclxuICAgICAgZG9Sb3VuZCA9IHNkIDwgMCB8fCB4ZFt4ZGkgKyAxXSAhPT0gdm9pZCAwIHx8IHcgJSBrO1xyXG5cclxuICAgICAgLy8gVGhlIGV4cHJlc3Npb24gYHcgJSBtYXRocG93KDEwLCBuIC0gaiAtIDEpYCByZXR1cm5zIGFsbCB0aGUgZGlnaXRzIG9mIHcgdG8gdGhlIHJpZ2h0IG9mIHRoZVxyXG4gICAgICAvLyBkaWdpdCBhdCAobGVmdC10by1yaWdodCkgaW5kZXggaiwgZS5nLiBpZiB3IGlzIDkwODcxNCBhbmQgaiBpcyAyLCB0aGUgZXhwcmVzc2lvbiB3aWxsIGdpdmVcclxuICAgICAgLy8gNzE0LlxyXG5cclxuICAgICAgZG9Sb3VuZCA9IHJtIDwgNFxyXG4gICAgICAgID8gKHJkIHx8IGRvUm91bmQpICYmIChybSA9PSAwIHx8IHJtID09ICh4LnMgPCAwID8gMyA6IDIpKVxyXG4gICAgICAgIDogcmQgPiA1IHx8IHJkID09IDUgJiYgKHJtID09IDQgfHwgZG9Sb3VuZCB8fCBybSA9PSA2ICYmXHJcblxyXG4gICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgZGlnaXQgdG8gdGhlIGxlZnQgb2YgdGhlIHJvdW5kaW5nIGRpZ2l0IGlzIG9kZC5cclxuICAgICAgICAgICgoaSA+IDAgPyBqID4gMCA/IHcgLyBtYXRocG93KDEwLCBuIC0gaikgOiAwIDogeGRbeGRpIC0gMV0pICUgMTApICYgMSB8fFxyXG4gICAgICAgICAgICBybSA9PSAoeC5zIDwgMCA/IDggOiA3KSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNkIDwgMSB8fCAheGRbMF0pIHtcclxuICAgICAgaWYgKGRvUm91bmQpIHtcclxuICAgICAgICBrID0gZ2V0QmFzZTEwRXhwb25lbnQoeCk7XHJcbiAgICAgICAgeGQubGVuZ3RoID0gMTtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCBzZCB0byBkZWNpbWFsIHBsYWNlcy5cclxuICAgICAgICBzZCA9IHNkIC0gayAtIDE7XHJcblxyXG4gICAgICAgIC8vIDEsIDAuMSwgMC4wMSwgMC4wMDEsIDAuMDAwMSBldGMuXHJcbiAgICAgICAgeGRbMF0gPSBtYXRocG93KDEwLCAoTE9HX0JBU0UgLSBzZCAlIExPR19CQVNFKSAlIExPR19CQVNFKTtcclxuICAgICAgICB4LmUgPSBtYXRoZmxvb3IoLXNkIC8gTE9HX0JBU0UpIHx8IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeGQubGVuZ3RoID0gMTtcclxuXHJcbiAgICAgICAgLy8gWmVyby5cclxuICAgICAgICB4ZFswXSA9IHguZSA9IHgucyA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSBleGNlc3MgZGlnaXRzLlxyXG4gICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICB4ZC5sZW5ndGggPSB4ZGk7XHJcbiAgICAgIGsgPSAxO1xyXG4gICAgICB4ZGktLTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHhkLmxlbmd0aCA9IHhkaSArIDE7XHJcbiAgICAgIGsgPSBtYXRocG93KDEwLCBMT0dfQkFTRSAtIGkpO1xyXG5cclxuICAgICAgLy8gRS5nLiA1NjcwMCBiZWNvbWVzIDU2MDAwIGlmIDcgaXMgdGhlIHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICAvLyBqID4gMCBtZWFucyBpID4gbnVtYmVyIG9mIGxlYWRpbmcgemVyb3Mgb2Ygdy5cclxuICAgICAgeGRbeGRpXSA9IGogPiAwID8gKHcgLyBtYXRocG93KDEwLCBuIC0gaikgJSBtYXRocG93KDEwLCBqKSB8IDApICogayA6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRvUm91bmQpIHtcclxuICAgICAgZm9yICg7Oykge1xyXG5cclxuICAgICAgICAvLyBJcyB0aGUgZGlnaXQgdG8gYmUgcm91bmRlZCB1cCBpbiB0aGUgZmlyc3Qgd29yZCBvZiB4ZD9cclxuICAgICAgICBpZiAoeGRpID09IDApIHtcclxuICAgICAgICAgIGlmICgoeGRbMF0gKz0gaykgPT0gQkFTRSkge1xyXG4gICAgICAgICAgICB4ZFswXSA9IDE7XHJcbiAgICAgICAgICAgICsreC5lO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB4ZFt4ZGldICs9IGs7XHJcbiAgICAgICAgICBpZiAoeGRbeGRpXSAhPSBCQVNFKSBicmVhaztcclxuICAgICAgICAgIHhkW3hkaS0tXSA9IDA7XHJcbiAgICAgICAgICBrID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICBmb3IgKGkgPSB4ZC5sZW5ndGg7IHhkWy0taV0gPT09IDA7KSB4ZC5wb3AoKTtcclxuXHJcbiAgICBpZiAoZXh0ZXJuYWwgJiYgKHguZSA+IE1BWF9FIHx8IHguZSA8IC1NQVhfRSkpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoZXhwb25lbnRPdXRPZlJhbmdlICsgZ2V0QmFzZTEwRXhwb25lbnQoeCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHN1YnRyYWN0KHgsIHkpIHtcclxuICAgIHZhciBkLCBlLCBpLCBqLCBrLCBsZW4sIHhkLCB4ZSwgeExUeSwgeWQsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG5cclxuICAgIC8vIFJldHVybiB5IG5lZ2F0ZWQgaWYgeCBpcyB6ZXJvLlxyXG4gICAgLy8gUmV0dXJuIHggaWYgeSBpcyB6ZXJvIGFuZCB4IGlzIG5vbi16ZXJvLlxyXG4gICAgaWYgKCF4LnMgfHwgIXkucykge1xyXG4gICAgICBpZiAoeS5zKSB5LnMgPSAteS5zO1xyXG4gICAgICBlbHNlIHkgPSBuZXcgQ3Rvcih4KTtcclxuICAgICAgcmV0dXJuIGV4dGVybmFsID8gcm91bmQoeSwgcHIpIDogeTtcclxuICAgIH1cclxuXHJcbiAgICB4ZCA9IHguZDtcclxuICAgIHlkID0geS5kO1xyXG5cclxuICAgIC8vIHggYW5kIHkgYXJlIG5vbi16ZXJvIG51bWJlcnMgd2l0aCB0aGUgc2FtZSBzaWduLlxyXG5cclxuICAgIGUgPSB5LmU7XHJcbiAgICB4ZSA9IHguZTtcclxuICAgIHhkID0geGQuc2xpY2UoKTtcclxuICAgIGsgPSB4ZSAtIGU7XHJcblxyXG4gICAgLy8gSWYgZXhwb25lbnRzIGRpZmZlci4uLlxyXG4gICAgaWYgKGspIHtcclxuICAgICAgeExUeSA9IGsgPCAwO1xyXG5cclxuICAgICAgaWYgKHhMVHkpIHtcclxuICAgICAgICBkID0geGQ7XHJcbiAgICAgICAgayA9IC1rO1xyXG4gICAgICAgIGxlbiA9IHlkLmxlbmd0aDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkID0geWQ7XHJcbiAgICAgICAgZSA9IHhlO1xyXG4gICAgICAgIGxlbiA9IHhkLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTnVtYmVycyB3aXRoIG1hc3NpdmVseSBkaWZmZXJlbnQgZXhwb25lbnRzIHdvdWxkIHJlc3VsdCBpbiBhIHZlcnkgaGlnaCBudW1iZXIgb2YgemVyb3NcclxuICAgICAgLy8gbmVlZGluZyB0byBiZSBwcmVwZW5kZWQsIGJ1dCB0aGlzIGNhbiBiZSBhdm9pZGVkIHdoaWxlIHN0aWxsIGVuc3VyaW5nIGNvcnJlY3Qgcm91bmRpbmcgYnlcclxuICAgICAgLy8gbGltaXRpbmcgdGhlIG51bWJlciBvZiB6ZXJvcyB0byBgTWF0aC5jZWlsKHByIC8gTE9HX0JBU0UpICsgMmAuXHJcbiAgICAgIGkgPSBNYXRoLm1heChNYXRoLmNlaWwocHIgLyBMT0dfQkFTRSksIGxlbikgKyAyO1xyXG5cclxuICAgICAgaWYgKGsgPiBpKSB7XHJcbiAgICAgICAgayA9IGk7XHJcbiAgICAgICAgZC5sZW5ndGggPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBQcmVwZW5kIHplcm9zIHRvIGVxdWFsaXNlIGV4cG9uZW50cy5cclxuICAgICAgZC5yZXZlcnNlKCk7XHJcbiAgICAgIGZvciAoaSA9IGs7IGktLTspIGQucHVzaCgwKTtcclxuICAgICAgZC5yZXZlcnNlKCk7XHJcblxyXG4gICAgLy8gQmFzZSAxZTcgZXhwb25lbnRzIGVxdWFsLlxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vIENoZWNrIGRpZ2l0cyB0byBkZXRlcm1pbmUgd2hpY2ggaXMgdGhlIGJpZ2dlciBudW1iZXIuXHJcblxyXG4gICAgICBpID0geGQubGVuZ3RoO1xyXG4gICAgICBsZW4gPSB5ZC5sZW5ndGg7XHJcbiAgICAgIHhMVHkgPSBpIDwgbGVuO1xyXG4gICAgICBpZiAoeExUeSkgbGVuID0gaTtcclxuXHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGlmICh4ZFtpXSAhPSB5ZFtpXSkge1xyXG4gICAgICAgICAgeExUeSA9IHhkW2ldIDwgeWRbaV07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGsgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh4TFR5KSB7XHJcbiAgICAgIGQgPSB4ZDtcclxuICAgICAgeGQgPSB5ZDtcclxuICAgICAgeWQgPSBkO1xyXG4gICAgICB5LnMgPSAteS5zO1xyXG4gICAgfVxyXG5cclxuICAgIGxlbiA9IHhkLmxlbmd0aDtcclxuXHJcbiAgICAvLyBBcHBlbmQgemVyb3MgdG8geGQgaWYgc2hvcnRlci5cclxuICAgIC8vIERvbid0IGFkZCB6ZXJvcyB0byB5ZCBpZiBzaG9ydGVyIGFzIHN1YnRyYWN0aW9uIG9ubHkgbmVlZHMgdG8gc3RhcnQgYXQgeWQgbGVuZ3RoLlxyXG4gICAgZm9yIChpID0geWQubGVuZ3RoIC0gbGVuOyBpID4gMDsgLS1pKSB4ZFtsZW4rK10gPSAwO1xyXG5cclxuICAgIC8vIFN1YnRyYWN0IHlkIGZyb20geGQuXHJcbiAgICBmb3IgKGkgPSB5ZC5sZW5ndGg7IGkgPiBrOykge1xyXG4gICAgICBpZiAoeGRbLS1pXSA8IHlkW2ldKSB7XHJcbiAgICAgICAgZm9yIChqID0gaTsgaiAmJiB4ZFstLWpdID09PSAwOykgeGRbal0gPSBCQVNFIC0gMTtcclxuICAgICAgICAtLXhkW2pdO1xyXG4gICAgICAgIHhkW2ldICs9IEJBU0U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHhkW2ldIC09IHlkW2ldO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIGZvciAoOyB4ZFstLWxlbl0gPT09IDA7KSB4ZC5wb3AoKTtcclxuXHJcbiAgICAvLyBSZW1vdmUgbGVhZGluZyB6ZXJvcyBhbmQgYWRqdXN0IGV4cG9uZW50IGFjY29yZGluZ2x5LlxyXG4gICAgZm9yICg7IHhkWzBdID09PSAwOyB4ZC5zaGlmdCgpKSAtLWU7XHJcblxyXG4gICAgLy8gWmVybz9cclxuICAgIGlmICgheGRbMF0pIHJldHVybiBuZXcgQ3RvcigwKTtcclxuXHJcbiAgICB5LmQgPSB4ZDtcclxuICAgIHkuZSA9IGU7XHJcblxyXG4gICAgLy9yZXR1cm4gZXh0ZXJuYWwgJiYgeGQubGVuZ3RoID49IHByIC8gTE9HX0JBU0UgPyByb3VuZCh5LCBwcikgOiB5O1xyXG4gICAgcmV0dXJuIGV4dGVybmFsID8gcm91bmQoeSwgcHIpIDogeTtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiB0b1N0cmluZyh4LCBpc0V4cCwgc2QpIHtcclxuICAgIHZhciBrLFxyXG4gICAgICBlID0gZ2V0QmFzZTEwRXhwb25lbnQoeCksXHJcbiAgICAgIHN0ciA9IGRpZ2l0c1RvU3RyaW5nKHguZCksXHJcbiAgICAgIGxlbiA9IHN0ci5sZW5ndGg7XHJcblxyXG4gICAgaWYgKGlzRXhwKSB7XHJcbiAgICAgIGlmIChzZCAmJiAoayA9IHNkIC0gbGVuKSA+IDApIHtcclxuICAgICAgICBzdHIgPSBzdHIuY2hhckF0KDApICsgJy4nICsgc3RyLnNsaWNlKDEpICsgZ2V0WmVyb1N0cmluZyhrKTtcclxuICAgICAgfSBlbHNlIGlmIChsZW4gPiAxKSB7XHJcbiAgICAgICAgc3RyID0gc3RyLmNoYXJBdCgwKSArICcuJyArIHN0ci5zbGljZSgxKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3RyID0gc3RyICsgKGUgPCAwID8gJ2UnIDogJ2UrJykgKyBlO1xyXG4gICAgfSBlbHNlIGlmIChlIDwgMCkge1xyXG4gICAgICBzdHIgPSAnMC4nICsgZ2V0WmVyb1N0cmluZygtZSAtIDEpICsgc3RyO1xyXG4gICAgICBpZiAoc2QgJiYgKGsgPSBzZCAtIGxlbikgPiAwKSBzdHIgKz0gZ2V0WmVyb1N0cmluZyhrKTtcclxuICAgIH0gZWxzZSBpZiAoZSA+PSBsZW4pIHtcclxuICAgICAgc3RyICs9IGdldFplcm9TdHJpbmcoZSArIDEgLSBsZW4pO1xyXG4gICAgICBpZiAoc2QgJiYgKGsgPSBzZCAtIGUgLSAxKSA+IDApIHN0ciA9IHN0ciArICcuJyArIGdldFplcm9TdHJpbmcoayk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoKGsgPSBlICsgMSkgPCBsZW4pIHN0ciA9IHN0ci5zbGljZSgwLCBrKSArICcuJyArIHN0ci5zbGljZShrKTtcclxuICAgICAgaWYgKHNkICYmIChrID0gc2QgLSBsZW4pID4gMCkge1xyXG4gICAgICAgIGlmIChlICsgMSA9PT0gbGVuKSBzdHIgKz0gJy4nO1xyXG4gICAgICAgIHN0ciArPSBnZXRaZXJvU3RyaW5nKGspO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHgucyA8IDAgPyAnLScgKyBzdHIgOiBzdHI7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gRG9lcyBub3Qgc3RyaXAgdHJhaWxpbmcgemVyb3MuXHJcbiAgZnVuY3Rpb24gdHJ1bmNhdGUoYXJyLCBsZW4pIHtcclxuICAgIGlmIChhcnIubGVuZ3RoID4gbGVuKSB7XHJcbiAgICAgIGFyci5sZW5ndGggPSBsZW47XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vIERlY2ltYWwgbWV0aG9kc1xyXG5cclxuXHJcbiAgLypcclxuICAgKiAgY2xvbmVcclxuICAgKiAgY29uZmlnL3NldFxyXG4gICAqL1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBDcmVhdGUgYW5kIHJldHVybiBhIERlY2ltYWwgY29uc3RydWN0b3Igd2l0aCB0aGUgc2FtZSBjb25maWd1cmF0aW9uIHByb3BlcnRpZXMgYXMgdGhpcyBEZWNpbWFsXHJcbiAgICogY29uc3RydWN0b3IuXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBjbG9uZShvYmopIHtcclxuICAgIHZhciBpLCBwLCBwcztcclxuXHJcbiAgICAvKlxyXG4gICAgICogVGhlIERlY2ltYWwgY29uc3RydWN0b3IgYW5kIGV4cG9ydGVkIGZ1bmN0aW9uLlxyXG4gICAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgaW5zdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogdmFsdWUge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gQSBudW1lcmljIHZhbHVlLlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gRGVjaW1hbCh2YWx1ZSkge1xyXG4gICAgICB2YXIgeCA9IHRoaXM7XHJcblxyXG4gICAgICAvLyBEZWNpbWFsIGNhbGxlZCB3aXRob3V0IG5ldy5cclxuICAgICAgaWYgKCEoeCBpbnN0YW5jZW9mIERlY2ltYWwpKSByZXR1cm4gbmV3IERlY2ltYWwodmFsdWUpO1xyXG5cclxuICAgICAgLy8gUmV0YWluIGEgcmVmZXJlbmNlIHRvIHRoaXMgRGVjaW1hbCBjb25zdHJ1Y3RvciwgYW5kIHNoYWRvdyBEZWNpbWFsLnByb3RvdHlwZS5jb25zdHJ1Y3RvclxyXG4gICAgICAvLyB3aGljaCBwb2ludHMgdG8gT2JqZWN0LlxyXG4gICAgICB4LmNvbnN0cnVjdG9yID0gRGVjaW1hbDtcclxuXHJcbiAgICAgIC8vIER1cGxpY2F0ZS5cclxuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGVjaW1hbCkge1xyXG4gICAgICAgIHgucyA9IHZhbHVlLnM7XHJcbiAgICAgICAgeC5lID0gdmFsdWUuZTtcclxuICAgICAgICB4LmQgPSAodmFsdWUgPSB2YWx1ZS5kKSA/IHZhbHVlLnNsaWNlKCkgOiB2YWx1ZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XHJcblxyXG4gICAgICAgIC8vIFJlamVjdCBJbmZpbml0eS9OYU4uXHJcbiAgICAgICAgaWYgKHZhbHVlICogMCAhPT0gMCkge1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID4gMCkge1xyXG4gICAgICAgICAgeC5zID0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgdmFsdWUgPSAtdmFsdWU7XHJcbiAgICAgICAgICB4LnMgPSAtMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeC5zID0gMDtcclxuICAgICAgICAgIHguZSA9IDA7XHJcbiAgICAgICAgICB4LmQgPSBbMF07XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIHNtYWxsIGludGVnZXJzLlxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gfn52YWx1ZSAmJiB2YWx1ZSA8IDFlNykge1xyXG4gICAgICAgICAgeC5lID0gMDtcclxuICAgICAgICAgIHguZCA9IFt2YWx1ZV07XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFyc2VEZWNpbWFsKHgsIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyB2YWx1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE1pbnVzIHNpZ24/XHJcbiAgICAgIGlmICh2YWx1ZS5jaGFyQ29kZUF0KDApID09PSA0NSkge1xyXG4gICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XHJcbiAgICAgICAgeC5zID0gLTE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeC5zID0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzRGVjaW1hbC50ZXN0KHZhbHVlKSkgcGFyc2VEZWNpbWFsKHgsIHZhbHVlKTtcclxuICAgICAgZWxzZSB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgRGVjaW1hbC5wcm90b3R5cGUgPSBQO1xyXG5cclxuICAgIERlY2ltYWwuUk9VTkRfVVAgPSAwO1xyXG4gICAgRGVjaW1hbC5ST1VORF9ET1dOID0gMTtcclxuICAgIERlY2ltYWwuUk9VTkRfQ0VJTCA9IDI7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0ZMT09SID0gMztcclxuICAgIERlY2ltYWwuUk9VTkRfSEFMRl9VUCA9IDQ7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0hBTEZfRE9XTiA9IDU7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0hBTEZfRVZFTiA9IDY7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0hBTEZfQ0VJTCA9IDc7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0hBTEZfRkxPT1IgPSA4O1xyXG5cclxuICAgIERlY2ltYWwuY2xvbmUgPSBjbG9uZTtcclxuICAgIERlY2ltYWwuY29uZmlnID0gRGVjaW1hbC5zZXQgPSBjb25maWc7XHJcblxyXG4gICAgaWYgKG9iaiA9PT0gdm9pZCAwKSBvYmogPSB7fTtcclxuICAgIGlmIChvYmopIHtcclxuICAgICAgcHMgPSBbJ3ByZWNpc2lvbicsICdyb3VuZGluZycsICd0b0V4cE5lZycsICd0b0V4cFBvcycsICdMTjEwJ107XHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBwcy5sZW5ndGg7KSBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShwID0gcHNbaSsrXSkpIG9ialtwXSA9IHRoaXNbcF07XHJcbiAgICB9XHJcblxyXG4gICAgRGVjaW1hbC5jb25maWcob2JqKTtcclxuXHJcbiAgICByZXR1cm4gRGVjaW1hbDtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIENvbmZpZ3VyZSBnbG9iYWwgc2V0dGluZ3MgZm9yIGEgRGVjaW1hbCBjb25zdHJ1Y3Rvci5cclxuICAgKlxyXG4gICAqIGBvYmpgIGlzIGFuIG9iamVjdCB3aXRoIG9uZSBvciBtb3JlIG9mIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyxcclxuICAgKlxyXG4gICAqICAgcHJlY2lzaW9uICB7bnVtYmVyfVxyXG4gICAqICAgcm91bmRpbmcgICB7bnVtYmVyfVxyXG4gICAqICAgdG9FeHBOZWcgICB7bnVtYmVyfVxyXG4gICAqICAgdG9FeHBQb3MgICB7bnVtYmVyfVxyXG4gICAqXHJcbiAgICogRS5nLiBEZWNpbWFsLmNvbmZpZyh7IHByZWNpc2lvbjogMjAsIHJvdW5kaW5nOiA0IH0pXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBjb25maWcob2JqKSB7XHJcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnT2JqZWN0IGV4cGVjdGVkJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgaSwgcCwgdixcclxuICAgICAgcHMgPSBbXHJcbiAgICAgICAgJ3ByZWNpc2lvbicsIDEsIE1BWF9ESUdJVFMsXHJcbiAgICAgICAgJ3JvdW5kaW5nJywgMCwgOCxcclxuICAgICAgICAndG9FeHBOZWcnLCAtMSAvIDAsIDAsXHJcbiAgICAgICAgJ3RvRXhwUG9zJywgMCwgMSAvIDBcclxuICAgICAgXTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgcHMubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgaWYgKCh2ID0gb2JqW3AgPSBwc1tpXV0pICE9PSB2b2lkIDApIHtcclxuICAgICAgICBpZiAobWF0aGZsb29yKHYpID09PSB2ICYmIHYgPj0gcHNbaSArIDFdICYmIHYgPD0gcHNbaSArIDJdKSB0aGlzW3BdID0gdjtcclxuICAgICAgICBlbHNlIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIHAgKyAnOiAnICsgdik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoKHYgPSBvYmpbcCA9ICdMTjEwJ10pICE9PSB2b2lkIDApIHtcclxuICAgICAgICBpZiAodiA9PSBNYXRoLkxOMTApIHRoaXNbcF0gPSBuZXcgdGhpcyh2KTtcclxuICAgICAgICBlbHNlIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIHAgKyAnOiAnICsgdik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gQ3JlYXRlIGFuZCBjb25maWd1cmUgaW5pdGlhbCBEZWNpbWFsIGNvbnN0cnVjdG9yLlxyXG4gIERlY2ltYWwgPSBjbG9uZShEZWNpbWFsKTtcclxuXHJcbiAgRGVjaW1hbFsnZGVmYXVsdCddID0gRGVjaW1hbC5EZWNpbWFsID0gRGVjaW1hbDtcclxuXHJcbiAgLy8gSW50ZXJuYWwgY29uc3RhbnQuXHJcbiAgT05FID0gbmV3IERlY2ltYWwoMSk7XHJcblxyXG5cclxuICAvLyBFeHBvcnQuXHJcblxyXG5cclxuICAvLyBBTUQuXHJcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gRGVjaW1hbDtcclxuICAgIH0pO1xyXG5cclxuICAvLyBOb2RlIGFuZCBvdGhlciBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLlxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBEZWNpbWFsO1xyXG5cclxuICAgIC8vIEJyb3dzZXIuXHJcbiAgfSBlbHNlIHtcclxuICAgIGlmICghZ2xvYmFsU2NvcGUpIHtcclxuICAgICAgZ2xvYmFsU2NvcGUgPSB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmICYmIHNlbGYuc2VsZiA9PSBzZWxmXHJcbiAgICAgICAgPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcclxuICAgIH1cclxuXHJcbiAgICBnbG9iYWxTY29wZS5EZWNpbWFsID0gRGVjaW1hbDtcclxuICB9XHJcbn0pKHRoaXMpO1xyXG4iLCIvKiEgTW9tZW50IER1cmF0aW9uIEZvcm1hdCB2Mi4yLjJcbiAqICBodHRwczovL2dpdGh1Yi5jb20vanNtcmVlc2UvbW9tZW50LWR1cmF0aW9uLWZvcm1hdFxuICogIERhdGU6IDIwMTgtMDItMTZcbiAqXG4gKiAgRHVyYXRpb24gZm9ybWF0IHBsdWdpbiBmdW5jdGlvbiBmb3IgdGhlIE1vbWVudC5qcyBsaWJyYXJ5XG4gKiAgaHR0cDovL21vbWVudGpzLmNvbS9cbiAqXG4gKiAgQ29weXJpZ2h0IDIwMTggSm9obiBNYWRoYXZhbi1SZWVzZVxuICogIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoWydtb21lbnQnXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0IG9ubHkgQ29tbW9uSlMtbGlrZVxuICAgICAgICAvLyBlbnZpcm9tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsIGxpa2UgTm9kZS5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdtb21lbnQnKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIElmIG1vbWVudCBpcyBub3QgYXZhaWxhYmxlLCBsZWF2ZSB0aGUgc2V0dXAgdXAgdG8gdGhlIHVzZXIuXG4gICAgICAgICAgICAvLyBMaWtlIHdoZW4gdXNpbmcgbW9tZW50LXRpbWV6b25lIG9yIHNpbWlsYXIgbW9tZW50LWJhc2VkIHBhY2thZ2UuXG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocm9vdCkge1xuICAgICAgICAvLyBHbG9iYWxzLlxuICAgICAgICByb290Lm1vbWVudER1cmF0aW9uRm9ybWF0U2V0dXAgPSByb290Lm1vbWVudCA/IGZhY3Rvcnkocm9vdC5tb21lbnQpIDogZmFjdG9yeTtcbiAgICB9XG59KSh0aGlzLCBmdW5jdGlvbiAobW9tZW50KSB7XG4gICAgLy8gYE51bWJlciN0b2xvY2FsZVN0cmluZ2AgaXMgdGVzdGVkIG9uIHBsdWdpbiBpbml0aWFsaXphdGlvbi5cbiAgICAvLyBJZiB0aGUgZmVhdHVyZSB0ZXN0IHBhc3NlcywgYHRvTG9jYWxlU3RyaW5nV29ya3NgIHdpbGwgYmUgc2V0IHRvIGB0cnVlYCBhbmQgdGhlXG4gICAgLy8gbmF0aXZlIGZ1bmN0aW9uIHdpbGwgYmUgdXNlZCB0byBnZW5lcmF0ZSBmb3JtYXR0ZWQgb3V0cHV0LiBJZiB0aGUgZmVhdHVyZVxuICAgIC8vIHRlc3QgZmFpbHMsIHRoZSBmYWxsYmFjayBmb3JtYXQgZnVuY3Rpb24gaW50ZXJuYWwgdG8gdGhpcyBwbHVnaW4gd2lsbCBiZVxuICAgIC8vIHVzZWQuXG4gICAgdmFyIHRvTG9jYWxlU3RyaW5nV29ya3MgPSBmYWxzZTtcblxuICAgIC8vIGBOdW1iZXIjdG9Mb2NhbGVTdHJpbmdgIHJvdW5kcyBpbmNvcnJlY3RseSBmb3Igc2VsZWN0IG51bWJlcnMgaW4gTWljcm9zb2Z0XG4gICAgLy8gZW52aXJvbm1lbnRzIChFZGdlLCBJRTExLCBXaW5kb3dzIFBob25lKSBhbmQgcG9zc2libHkgb3RoZXIgZW52aXJvbm1lbnRzLlxuICAgIC8vIElmIHRoZSByb3VuZGluZyB0ZXN0IGZhaWxzIGFuZCBgdG9Mb2NhbGVTdHJpbmdgIHdpbGwgYmUgdXNlZCBmb3IgZm9ybWF0dGluZyxcbiAgICAvLyB0aGUgcGx1Z2luIHdpbGwgXCJwcmUtcm91bmRcIiBudW1iZXIgdmFsdWVzIHVzaW5nIHRoZSBmYWxsYmFjayBudW1iZXIgZm9ybWF0XG4gICAgLy8gZnVuY3Rpb24gYmVmb3JlIHBhc3NpbmcgdGhlbSB0byBgdG9Mb2NhbGVTdHJpbmdgIGZvciBmaW5hbCBmb3JtYXR0aW5nLlxuICAgIHZhciB0b0xvY2FsZVN0cmluZ1JvdW5kaW5nV29ya3MgPSBmYWxzZTtcblxuICAgIC8vIGBJbnRsLk51bWJlckZvcm1hdCNmb3JtYXRgIGlzIHRlc3RlZCBvbiBwbHVnaW4gaW5pdGlhbGl6YXRpb24uXG4gICAgLy8gSWYgdGhlIGZlYXR1cmUgdGVzdCBwYXNzZXMsIGBpbnRsTnVtYmVyRm9ybWF0Um91bmRpbmdXb3Jrc2Agd2lsbCBiZSBzZXQgdG9cbiAgICAvLyBgdHJ1ZWAgYW5kIHRoZSBuYXRpdmUgZnVuY3Rpb24gd2lsbCBiZSB1c2VkIHRvIGdlbmVyYXRlIGZvcm1hdHRlZCBvdXRwdXQuXG4gICAgLy8gSWYgdGhlIGZlYXR1cmUgdGVzdCBmYWlscywgZWl0aGVyIGBOdW1iZXIjdG9sb2NhbGVTdHJpbmdgIChpZlxuICAgIC8vIGB0b0xvY2FsZVN0cmluZ1dvcmtzYCBpcyBgdHJ1ZWApLCBvciB0aGUgZmFsbGJhY2sgZm9ybWF0IGZ1bmN0aW9uIGludGVybmFsXG4gICAgLy8gIHRvIHRoaXMgcGx1Z2luIHdpbGwgYmUgdXNlZC5cbiAgICB2YXIgaW50bE51bWJlckZvcm1hdFdvcmtzID0gZmFsc2U7XG5cbiAgICAvLyBgSW50bC5OdW1iZXJGb3JtYXQjZm9ybWF0YCByb3VuZHMgaW5jb3JyZWN0bHkgZm9yIHNlbGVjdCBudW1iZXJzIGluIE1pY3Jvc29mdFxuICAgIC8vIGVudmlyb25tZW50cyAoRWRnZSwgSUUxMSwgV2luZG93cyBQaG9uZSkgYW5kIHBvc3NpYmx5IG90aGVyIGVudmlyb25tZW50cy5cbiAgICAvLyBJZiB0aGUgcm91bmRpbmcgdGVzdCBmYWlscyBhbmQgYEludGwuTnVtYmVyRm9ybWF0I2Zvcm1hdGAgd2lsbCBiZSB1c2VkIGZvclxuICAgIC8vIGZvcm1hdHRpbmcsIHRoZSBwbHVnaW4gd2lsbCBcInByZS1yb3VuZFwiIG51bWJlciB2YWx1ZXMgdXNpbmcgdGhlIGZhbGxiYWNrIG51bWJlclxuICAgIC8vIGZvcm1hdCBmdW5jdGlvbiBiZWZvcmUgcGFzc2luZyB0aGVtIHRvIGBJbnRsLk51bWJlckZvcm1hdCNmb3JtYXRgIGZvciBmaW5hbFxuICAgIC8vIGZvcm1hdHRpbmcuXG4gICAgdmFyIGludGxOdW1iZXJGb3JtYXRSb3VuZGluZ1dvcmtzID0gZmFsc2U7XG5cbiAgICAvLyBUb2tlbiB0eXBlIG5hbWVzIGluIG9yZGVyIG9mIGRlc2NlbmRpbmcgbWFnbml0dWRlLlxuICAgIHZhciB0eXBlcyA9IFwiZXNjYXBlIHllYXJzIG1vbnRocyB3ZWVrcyBkYXlzIGhvdXJzIG1pbnV0ZXMgc2Vjb25kcyBtaWxsaXNlY29uZHMgZ2VuZXJhbFwiLnNwbGl0KFwiIFwiKTtcblxuICAgIHZhciBidWJibGVzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcInNlY29uZHNcIixcbiAgICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwibWludXRlc1wiLCB2YWx1ZTogNjAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwiaG91cnNcIiwgdmFsdWU6IDM2MDAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwiZGF5c1wiLCB2YWx1ZTogODY0MDAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwid2Vla3NcIiwgdmFsdWU6IDYwNDgwMCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJtb250aHNcIiwgdmFsdWU6IDI2Nzg0MDAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwieWVhcnNcIiwgdmFsdWU6IDMxNTM2MDAwIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJtaW51dGVzXCIsXG4gICAgICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcImhvdXJzXCIsIHZhbHVlOiA2MCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJkYXlzXCIsIHZhbHVlOiAxNDQwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIndlZWtzXCIsIHZhbHVlOiAxMDA4MCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJtb250aHNcIiwgdmFsdWU6IDQ0NjQwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInllYXJzXCIsIHZhbHVlOiA1MjU2MDAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImhvdXJzXCIsXG4gICAgICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcImRheXNcIiwgdmFsdWU6IDI0IH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIndlZWtzXCIsIHZhbHVlOiAxNjggfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwibW9udGhzXCIsIHZhbHVlOiA3NDQgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwieWVhcnNcIiwgdmFsdWU6IDg3NjAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImRheXNcIixcbiAgICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwid2Vla3NcIiwgdmFsdWU6IDcgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwibW9udGhzXCIsIHZhbHVlOiAzMSB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ5ZWFyc1wiLCB2YWx1ZTogMzY1IH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJtb250aHNcIixcbiAgICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwieWVhcnNcIiwgdmFsdWU6IDEyIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIF07XG5cbiAgICAvLyBzdHJpbmdJbmNsdWRlc1xuICAgIGZ1bmN0aW9uIHN0cmluZ0luY2x1ZGVzKHN0ciwgc2VhcmNoKSB7XG4gICAgICAgIGlmIChzZWFyY2gubGVuZ3RoID4gc3RyLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHIuaW5kZXhPZihzZWFyY2gpICE9PSAtMTtcbiAgICB9XG5cbiAgICAvLyByZXBlYXRaZXJvKHF0eSlcbiAgICAvLyBSZXR1cm5zIFwiMFwiIHJlcGVhdGVkIGBxdHlgIHRpbWVzLlxuICAgIC8vIGBxdHlgIG11c3QgYmUgYSBpbnRlZ2VyID49IDAuXG4gICAgZnVuY3Rpb24gcmVwZWF0WmVybyhxdHkpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XG5cbiAgICAgICAgd2hpbGUgKHF0eSkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IFwiMFwiO1xuICAgICAgICAgICAgcXR5IC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ1JvdW5kKGRpZ2l0cykge1xuICAgICAgICB2YXIgZGlnaXRzQXJyYXkgPSBkaWdpdHMuc3BsaXQoXCJcIikucmV2ZXJzZSgpO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBjYXJyeSA9IHRydWU7XG5cbiAgICAgICAgd2hpbGUgKGNhcnJ5ICYmIGkgPCBkaWdpdHNBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpZ2l0c0FycmF5W2ldID09PSBcIjlcIikge1xuICAgICAgICAgICAgICAgICAgICBkaWdpdHNBcnJheVtpXSA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRpZ2l0c0FycmF5W2ldID0gKHBhcnNlSW50KGRpZ2l0c0FycmF5W2ldLCAxMCkgKyAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBjYXJyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGRpZ2l0c0FycmF5W2ldLCAxMCkgPCA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhcnJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGlnaXRzQXJyYXlbaV0gPSBcIjBcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhcnJ5KSB7XG4gICAgICAgICAgICBkaWdpdHNBcnJheS5wdXNoKFwiMVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkaWdpdHNBcnJheS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICB9XG5cbiAgICAvLyBjYWNoZWROdW1iZXJGb3JtYXRcbiAgICAvLyBSZXR1cm5zIGFuIGBJbnRsLk51bWJlckZvcm1hdGAgaW5zdGFuY2UgZm9yIHRoZSBnaXZlbiBsb2NhbGUgYW5kIGNvbmZpZ3VyYXRpb24uXG4gICAgLy8gT24gZmlyc3QgdXNlIG9mIGEgcGFydGljdWxhciBjb25maWd1cmF0aW9uLCB0aGUgaW5zdGFuY2UgaXMgY2FjaGVkIGZvciBmYXN0XG4gICAgLy8gcmVwZWF0IGFjY2Vzcy5cbiAgICBmdW5jdGlvbiBjYWNoZWROdW1iZXJGb3JtYXQobG9jYWxlLCBvcHRpb25zKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIHNvcnRlZCwgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiBgb3B0aW9uc2BcbiAgICAgICAgLy8gZm9yIHVzZSBhcyBwYXJ0IG9mIHRoZSBjYWNoZSBrZXlcbiAgICAgICAgdmFyIG9wdGlvbnNTdHJpbmcgPSBtYXAoXG4gICAgICAgICAgICBrZXlzKG9wdGlvbnMpLnNvcnQoKSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXkgKyAnOicgKyBvcHRpb25zW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICkuam9pbignLCcpO1xuXG4gICAgICAgIC8vIFNldCBvdXIgY2FjaGUga2V5XG4gICAgICAgIHZhciBjYWNoZUtleSA9IGxvY2FsZSArICcrJyArIG9wdGlvbnNTdHJpbmc7XG5cbiAgICAgICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSB0aGlzIGNvbmZpZ3VyYXRpb24gY2FjaGVkLCBjb25maWd1cmUgYW5kIGNhY2hlIGl0XG4gICAgICAgIGlmICghY2FjaGVkTnVtYmVyRm9ybWF0LmNhY2hlW2NhY2hlS2V5XSkge1xuICAgICAgICAgICAgY2FjaGVkTnVtYmVyRm9ybWF0LmNhY2hlW2NhY2hlS2V5XSA9IEludGwuTnVtYmVyRm9ybWF0KGxvY2FsZSwgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gdGhlIGNhY2hlZCB2ZXJzaW9uIG9mIHRoaXMgY29uZmlndXJhdGlvblxuICAgICAgICByZXR1cm4gY2FjaGVkTnVtYmVyRm9ybWF0LmNhY2hlW2NhY2hlS2V5XTtcbiAgICB9XG4gICAgY2FjaGVkTnVtYmVyRm9ybWF0LmNhY2hlID0ge307XG5cbiAgICAvLyBmb3JtYXROdW1iZXJcbiAgICAvLyBGb3JtYXRzIGFueSBudW1iZXIgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHplcm8gdXNpbmcgdGhlc2Ugb3B0aW9uczpcbiAgICAvLyAtIHVzZXJMb2NhbGVcbiAgICAvLyAtIHVzZVRvTG9jYWxlU3RyaW5nXG4gICAgLy8gLSB1c2VHcm91cGluZ1xuICAgIC8vIC0gZ3JvdXBpbmdcbiAgICAvLyAtIG1heGltdW1TaWduaWZpY2FudERpZ2l0c1xuICAgIC8vIC0gbWluaW11bUludGVnZXJEaWdpdHNcbiAgICAvLyAtIGZyYWN0aW9uRGlnaXRzXG4gICAgLy8gLSBncm91cGluZ1NlcGFyYXRvclxuICAgIC8vIC0gZGVjaW1hbFNlcGFyYXRvclxuICAgIC8vXG4gICAgLy8gYHVzZVRvTG9jYWxlU3RyaW5nYCB3aWxsIHVzZSBgSW50bC5OdW1iZXJGb3JtYXRgIG9yIGB0b0xvY2FsZVN0cmluZ2AgZm9yIGZvcm1hdHRpbmcuXG4gICAgLy8gYHVzZXJMb2NhbGVgIG9wdGlvbiBpcyBwYXNzZWQgdGhyb3VnaCB0byB0aGUgZm9ybWF0dGluZyBmdW5jdGlvbi5cbiAgICAvLyBgZnJhY3Rpb25EaWdpdHNgIGlzIHBhc3NlZCB0aHJvdWdoIHRvIGBtYXhpbXVtRnJhY3Rpb25EaWdpdHNgIGFuZCBgbWluaW11bUZyYWN0aW9uRGlnaXRzYFxuICAgIC8vIFVzaW5nIGBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHNgIHdpbGwgb3ZlcnJpZGUgYG1pbmltdW1JbnRlZ2VyRGlnaXRzYCBhbmQgYGZyYWN0aW9uRGlnaXRzYC5cbiAgICBmdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtYmVyLCBvcHRpb25zLCB1c2VyTG9jYWxlKSB7XG4gICAgICAgIHZhciB1c2VUb0xvY2FsZVN0cmluZyA9IG9wdGlvbnMudXNlVG9Mb2NhbGVTdHJpbmc7XG4gICAgICAgIHZhciB1c2VHcm91cGluZyA9IG9wdGlvbnMudXNlR3JvdXBpbmc7XG4gICAgICAgIHZhciBncm91cGluZyA9IHVzZUdyb3VwaW5nICYmIG9wdGlvbnMuZ3JvdXBpbmcuc2xpY2UoKTtcbiAgICAgICAgdmFyIG1heGltdW1TaWduaWZpY2FudERpZ2l0cyA9IG9wdGlvbnMubWF4aW11bVNpZ25pZmljYW50RGlnaXRzO1xuICAgICAgICB2YXIgbWluaW11bUludGVnZXJEaWdpdHMgPSBvcHRpb25zLm1pbmltdW1JbnRlZ2VyRGlnaXRzIHx8IDE7XG4gICAgICAgIHZhciBmcmFjdGlvbkRpZ2l0cyA9IG9wdGlvbnMuZnJhY3Rpb25EaWdpdHMgfHwgMDtcbiAgICAgICAgdmFyIGdyb3VwaW5nU2VwYXJhdG9yID0gb3B0aW9ucy5ncm91cGluZ1NlcGFyYXRvcjtcbiAgICAgICAgdmFyIGRlY2ltYWxTZXBhcmF0b3IgPSBvcHRpb25zLmRlY2ltYWxTZXBhcmF0b3I7XG5cbiAgICAgICAgaWYgKHVzZVRvTG9jYWxlU3RyaW5nICYmIHVzZXJMb2NhbGUpIHtcbiAgICAgICAgICAgIHZhciBsb2NhbGVTdHJpbmdPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzOiBtaW5pbXVtSW50ZWdlckRpZ2l0cyxcbiAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdXNlR3JvdXBpbmdcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChmcmFjdGlvbkRpZ2l0cykge1xuICAgICAgICAgICAgICAgIGxvY2FsZVN0cmluZ09wdGlvbnMubWF4aW11bUZyYWN0aW9uRGlnaXRzID0gZnJhY3Rpb25EaWdpdHM7XG4gICAgICAgICAgICAgICAgbG9jYWxlU3RyaW5nT3B0aW9ucy5taW5pbXVtRnJhY3Rpb25EaWdpdHMgPSBmcmFjdGlvbkRpZ2l0cztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdG9Mb2NhbGVTdHJpbmcgb3V0cHV0IGlzIFwiMC4wXCIgaW5zdGVhZCBvZiBcIjBcIiBmb3IgSFRDIGJyb3dzZXJzXG4gICAgICAgICAgICAvLyB3aGVuIG1heGltdW1TaWduaWZpY2FudERpZ2l0cyBpcyBzZXQuIFNlZSAjOTYuXG4gICAgICAgICAgICBpZiAobWF4aW11bVNpZ25pZmljYW50RGlnaXRzICYmIG51bWJlciA+IDApIHtcbiAgICAgICAgICAgICAgICBsb2NhbGVTdHJpbmdPcHRpb25zLm1heGltdW1TaWduaWZpY2FudERpZ2l0cyA9IG1heGltdW1TaWduaWZpY2FudERpZ2l0cztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGludGxOdW1iZXJGb3JtYXRXb3Jrcykge1xuICAgICAgICAgICAgICAgIGlmICghaW50bE51bWJlckZvcm1hdFJvdW5kaW5nV29ya3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdW5kaW5nT3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kaW5nT3B0aW9ucy51c2VHcm91cGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByb3VuZGluZ09wdGlvbnMuZGVjaW1hbFNlcGFyYXRvciA9IFwiLlwiO1xuICAgICAgICAgICAgICAgICAgICBudW1iZXIgPSBwYXJzZUZsb2F0KGZvcm1hdE51bWJlcihudW1iZXIsIHJvdW5kaW5nT3B0aW9ucyksIDEwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVkTnVtYmVyRm9ybWF0KHVzZXJMb2NhbGUsIGxvY2FsZVN0cmluZ09wdGlvbnMpLmZvcm1hdChudW1iZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRvTG9jYWxlU3RyaW5nUm91bmRpbmdXb3Jrcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm91bmRpbmdPcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgcm91bmRpbmdPcHRpb25zLnVzZUdyb3VwaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kaW5nT3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yID0gXCIuXCI7XG4gICAgICAgICAgICAgICAgICAgIG51bWJlciA9IHBhcnNlRmxvYXQoZm9ybWF0TnVtYmVyKG51bWJlciwgcm91bmRpbmdPcHRpb25zKSwgMTApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBudW1iZXIudG9Mb2NhbGVTdHJpbmcodXNlckxvY2FsZSwgbG9jYWxlU3RyaW5nT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbnVtYmVyU3RyaW5nO1xuXG4gICAgICAgIC8vIEFkZCAxIHRvIGRpZ2l0IG91dHB1dCBsZW5ndGggZm9yIGZsb2F0aW5nIHBvaW50IGVycm9ycyB3b3JrYXJvdW5kLiBTZWUgYmVsb3cuXG4gICAgICAgIGlmIChtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMpIHtcbiAgICAgICAgICAgIG51bWJlclN0cmluZyA9IG51bWJlci50b1ByZWNpc2lvbihtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgKyAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG51bWJlclN0cmluZyA9IG51bWJlci50b0ZpeGVkKGZyYWN0aW9uRGlnaXRzICsgMSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW50ZWdlclN0cmluZztcbiAgICAgICAgdmFyIGZyYWN0aW9uU3RyaW5nO1xuICAgICAgICB2YXIgZXhwb25lbnRTdHJpbmc7XG5cbiAgICAgICAgdmFyIHRlbXAgPSBudW1iZXJTdHJpbmcuc3BsaXQoXCJlXCIpO1xuXG4gICAgICAgIGV4cG9uZW50U3RyaW5nID0gdGVtcFsxXSB8fCBcIlwiO1xuXG4gICAgICAgIHRlbXAgPSB0ZW1wWzBdLnNwbGl0KFwiLlwiKTtcblxuICAgICAgICBmcmFjdGlvblN0cmluZyA9IHRlbXBbMV0gfHwgXCJcIjtcbiAgICAgICAgaW50ZWdlclN0cmluZyA9IHRlbXBbMF0gfHwgXCJcIjtcblxuICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciBmbG9hdGluZyBwb2ludCBlcnJvcnMgaW4gYHRvRml4ZWRgIGFuZCBgdG9QcmVjaXNpb25gLlxuICAgICAgICAvLyAoMy41NSkudG9GaXhlZCgxKTsgLS0+IFwiMy41XCJcbiAgICAgICAgLy8gKDEyMy41NSAtIDEyMCkudG9QcmVjaXNpb24oMik7IC0tPiBcIjMuNVwiXG4gICAgICAgIC8vICgxMjMuNTUgLSAxMjApOyAtLT4gMy41NDk5OTk5OTk5OTk5OTdcbiAgICAgICAgLy8gKDEyMy41NSAtIDEyMCkudG9GaXhlZCgyKTsgLS0+IFwiMy41NVwiXG4gICAgICAgIC8vIFJvdW5kIGJ5IGV4YW1pbmcgdGhlIHN0cmluZyBvdXRwdXQgb2YgdGhlIG5leHQgZGlnaXQuXG5cbiAgICAgICAgLy8gKioqKioqKioqKioqKioqIEltcGxlbWVudCBTdHJpbmcgUm91bmRpbmcgaGVyZSAqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAvLyBDaGVjayBpbnRlZ2VyU3RyaW5nICsgZnJhY3Rpb25TdHJpbmcgbGVuZ3RoIG9mIHRvUHJlY2lzaW9uIGJlZm9yZSByb3VuZGluZy5cbiAgICAgICAgLy8gQ2hlY2sgbGVuZ3RoIG9mIGZyYWN0aW9uU3RyaW5nIGZyb20gdG9GaXhlZCBvdXRwdXQgYmVmb3JlIHJvdW5kaW5nLlxuICAgICAgICB2YXIgaW50ZWdlckxlbmd0aCA9IGludGVnZXJTdHJpbmcubGVuZ3RoO1xuICAgICAgICB2YXIgZnJhY3Rpb25MZW5ndGggPSBmcmFjdGlvblN0cmluZy5sZW5ndGg7XG4gICAgICAgIHZhciBkaWdpdENvdW50ID0gaW50ZWdlckxlbmd0aCArIGZyYWN0aW9uTGVuZ3RoO1xuICAgICAgICB2YXIgZGlnaXRzID0gaW50ZWdlclN0cmluZyArIGZyYWN0aW9uU3RyaW5nO1xuXG4gICAgICAgIGlmIChtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgJiYgZGlnaXRDb3VudCA9PT0gKG1heGltdW1TaWduaWZpY2FudERpZ2l0cyArIDEpIHx8ICFtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgJiYgZnJhY3Rpb25MZW5ndGggPT09IChmcmFjdGlvbkRpZ2l0cyArIDEpKSB7XG4gICAgICAgICAgICAvLyBSb3VuZCBkaWdpdHMuXG4gICAgICAgICAgICBkaWdpdHMgPSBzdHJpbmdSb3VuZChkaWdpdHMpO1xuXG4gICAgICAgICAgICBpZiAoZGlnaXRzLmxlbmd0aCA9PT0gZGlnaXRDb3VudCArIDEpIHtcbiAgICAgICAgICAgICAgICBpbnRlZ2VyTGVuZ3RoID0gaW50ZWdlckxlbmd0aCArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERpc2NhcmQgZmluYWwgZnJhY3Rpb25EaWdpdC5cbiAgICAgICAgICAgIGlmIChmcmFjdGlvbkxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRpZ2l0cyA9IGRpZ2l0cy5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNlcGFyYXRlIGludGVnZXIgYW5kIGZyYWN0aW9uLlxuICAgICAgICAgICAgaW50ZWdlclN0cmluZyA9IGRpZ2l0cy5zbGljZSgwLCBpbnRlZ2VyTGVuZ3RoKTtcbiAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gZGlnaXRzLnNsaWNlKGludGVnZXJMZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVHJpbSB0cmFpbGluZyB6ZXJvZXMgZnJvbSBmcmFjdGlvblN0cmluZyBiZWNhdXNlIHRvUHJlY2lzaW9uIG91dHB1dHNcbiAgICAgICAgLy8gcHJlY2lzaW9uLCBub3Qgc2lnbmlmaWNhbnQgZGlnaXRzLlxuICAgICAgICBpZiAobWF4aW11bVNpZ25pZmljYW50RGlnaXRzKSB7XG4gICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IGZyYWN0aW9uU3RyaW5nLnJlcGxhY2UoLzAqJC8sIFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIGV4cG9uZW50LlxuICAgICAgICB2YXIgZXhwb25lbnQgPSBwYXJzZUludChleHBvbmVudFN0cmluZywgMTApO1xuXG4gICAgICAgIGlmIChleHBvbmVudCA+IDApIHtcbiAgICAgICAgICAgIGlmIChmcmFjdGlvblN0cmluZy5sZW5ndGggPD0gZXhwb25lbnQpIHtcbiAgICAgICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IGZyYWN0aW9uU3RyaW5nICsgcmVwZWF0WmVybyhleHBvbmVudCAtIGZyYWN0aW9uU3RyaW5nLmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICBpbnRlZ2VyU3RyaW5nID0gaW50ZWdlclN0cmluZyArIGZyYWN0aW9uU3RyaW5nO1xuICAgICAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW50ZWdlclN0cmluZyA9IGludGVnZXJTdHJpbmcgKyBmcmFjdGlvblN0cmluZy5zbGljZSgwLCBleHBvbmVudCk7XG4gICAgICAgICAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSBmcmFjdGlvblN0cmluZy5zbGljZShleHBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXhwb25lbnQgPCAwKSB7XG4gICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IChyZXBlYXRaZXJvKE1hdGguYWJzKGV4cG9uZW50KSAtIGludGVnZXJTdHJpbmcubGVuZ3RoKSArIGludGVnZXJTdHJpbmcgKyBmcmFjdGlvblN0cmluZyk7XG5cbiAgICAgICAgICAgIGludGVnZXJTdHJpbmcgPSBcIjBcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbWF4aW11bVNpZ25pZmljYW50RGlnaXRzKSB7XG4gICAgICAgICAgICAvLyBUcmltIG9yIHBhZCBmcmFjdGlvbiB3aGVuIG5vdCB1c2luZyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMuXG4gICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IGZyYWN0aW9uU3RyaW5nLnNsaWNlKDAsIGZyYWN0aW9uRGlnaXRzKTtcblxuICAgICAgICAgICAgaWYgKGZyYWN0aW9uU3RyaW5nLmxlbmd0aCA8IGZyYWN0aW9uRGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSBmcmFjdGlvblN0cmluZyArIHJlcGVhdFplcm8oZnJhY3Rpb25EaWdpdHMgLSBmcmFjdGlvblN0cmluZy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBQYWQgaW50ZWdlciB3aGVuIHVzaW5nIG1pbmltdW1JbnRlZ2VyRGlnaXRzXG4gICAgICAgICAgICAvLyBhbmQgbm90IHVzaW5nIG1heGltdW1TaWduaWZpY2FudERpZ2l0cy5cbiAgICAgICAgICAgIGlmIChpbnRlZ2VyU3RyaW5nLmxlbmd0aCA8IG1pbmltdW1JbnRlZ2VyRGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgaW50ZWdlclN0cmluZyA9IHJlcGVhdFplcm8obWluaW11bUludGVnZXJEaWdpdHMgLSBpbnRlZ2VyU3RyaW5nLmxlbmd0aCkgKyBpbnRlZ2VyU3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZvcm1hdHRlZFN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgLy8gSGFuZGxlIGdyb3VwaW5nLlxuICAgICAgICBpZiAodXNlR3JvdXBpbmcpIHtcbiAgICAgICAgICAgIHRlbXAgPSBpbnRlZ2VyU3RyaW5nO1xuICAgICAgICAgICAgdmFyIGdyb3VwO1xuXG4gICAgICAgICAgICB3aGlsZSAodGVtcC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gZ3JvdXBpbmcuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0dGVkU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IGdyb3VwaW5nU2VwYXJhdG9yICsgZm9ybWF0dGVkU3RyaW5nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRlbXAuc2xpY2UoLWdyb3VwKSArIGZvcm1hdHRlZFN0cmluZztcblxuICAgICAgICAgICAgICAgIHRlbXAgPSB0ZW1wLnNsaWNlKDAsIC1ncm91cCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3JtYXR0ZWRTdHJpbmcgPSBpbnRlZ2VyU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGRlY2ltYWxTZXBhcmF0b3IgYW5kIGZyYWN0aW9uLlxuICAgICAgICBpZiAoZnJhY3Rpb25TdHJpbmcpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IGZvcm1hdHRlZFN0cmluZyArIGRlY2ltYWxTZXBhcmF0b3IgKyBmcmFjdGlvblN0cmluZztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRTdHJpbmc7XG4gICAgfVxuXG4gICAgLy8gZHVyYXRpb25MYWJlbENvbXBhcmVcbiAgICBmdW5jdGlvbiBkdXJhdGlvbkxhYmVsQ29tcGFyZShhLCBiKSB7XG4gICAgICAgIGlmIChhLmxhYmVsLmxlbmd0aCA+IGIubGFiZWwubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYS5sYWJlbC5sZW5ndGggPCBiLmxhYmVsLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhIG11c3QgYmUgZXF1YWwgdG8gYlxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvLyBkdXJhdGlvbkdldExhYmVsc1xuICAgIGZ1bmN0aW9uIGR1cmF0aW9uR2V0TGFiZWxzKHRva2VuLCBsb2NhbGVEYXRhKSB7XG4gICAgICAgIHZhciBsYWJlbHMgPSBbXTtcblxuICAgICAgICBlYWNoKGtleXMobG9jYWxlRGF0YSksIGZ1bmN0aW9uIChsb2NhbGVEYXRhS2V5KSB7XG4gICAgICAgICAgICBpZiAobG9jYWxlRGF0YUtleS5zbGljZSgwLCAxNSkgIT09IFwiX2R1cmF0aW9uTGFiZWxzXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBsYWJlbFR5cGUgPSBsb2NhbGVEYXRhS2V5LnNsaWNlKDE1KS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBlYWNoKGtleXMobG9jYWxlRGF0YVtsb2NhbGVEYXRhS2V5XSksIGZ1bmN0aW9uIChsYWJlbEtleSkge1xuICAgICAgICAgICAgICAgIGlmIChsYWJlbEtleS5zbGljZSgwLCAxKSA9PT0gdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbGFiZWxUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBsYWJlbEtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBsb2NhbGVEYXRhW2xvY2FsZURhdGFLZXldW2xhYmVsS2V5XVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGxhYmVscztcbiAgICB9XG5cbiAgICAvLyBkdXJhdGlvblBsdXJhbEtleVxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uUGx1cmFsS2V5KHRva2VuLCBpbnRlZ2VyVmFsdWUsIGRlY2ltYWxWYWx1ZSkge1xuICAgICAgICAvLyBTaW5ndWxhciBmb3IgYSB2YWx1ZSBvZiBgMWAsIGJ1dCBub3QgZm9yIGAxLjBgLlxuICAgICAgICBpZiAoaW50ZWdlclZhbHVlID09PSAxICYmIGRlY2ltYWxWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRva2VuICsgdG9rZW47XG4gICAgfVxuXG4gICAgdmFyIGVuZ0xvY2FsZSA9IHtcbiAgICAgICAgZHVyYXRpb25MYWJlbHNTdGFuZGFyZDoge1xuICAgICAgICAgICAgUzogJ21pbGxpc2Vjb25kJyxcbiAgICAgICAgICAgIFNTOiAnbWlsbGlzZWNvbmRzJyxcbiAgICAgICAgICAgIHM6ICdzZWNvbmQnLFxuICAgICAgICAgICAgc3M6ICdzZWNvbmRzJyxcbiAgICAgICAgICAgIG06ICdtaW51dGUnLFxuICAgICAgICAgICAgbW06ICdtaW51dGVzJyxcbiAgICAgICAgICAgIGg6ICdob3VyJyxcbiAgICAgICAgICAgIGhoOiAnaG91cnMnLFxuICAgICAgICAgICAgZDogJ2RheScsXG4gICAgICAgICAgICBkZDogJ2RheXMnLFxuICAgICAgICAgICAgdzogJ3dlZWsnLFxuICAgICAgICAgICAgd3c6ICd3ZWVrcycsXG4gICAgICAgICAgICBNOiAnbW9udGgnLFxuICAgICAgICAgICAgTU06ICdtb250aHMnLFxuICAgICAgICAgICAgeTogJ3llYXInLFxuICAgICAgICAgICAgeXk6ICd5ZWFycydcbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb25MYWJlbHNTaG9ydDoge1xuICAgICAgICAgICAgUzogJ21zZWMnLFxuICAgICAgICAgICAgU1M6ICdtc2VjcycsXG4gICAgICAgICAgICBzOiAnc2VjJyxcbiAgICAgICAgICAgIHNzOiAnc2VjcycsXG4gICAgICAgICAgICBtOiAnbWluJyxcbiAgICAgICAgICAgIG1tOiAnbWlucycsXG4gICAgICAgICAgICBoOiAnaHInLFxuICAgICAgICAgICAgaGg6ICdocnMnLFxuICAgICAgICAgICAgZDogJ2R5JyxcbiAgICAgICAgICAgIGRkOiAnZHlzJyxcbiAgICAgICAgICAgIHc6ICd3aycsXG4gICAgICAgICAgICB3dzogJ3drcycsXG4gICAgICAgICAgICBNOiAnbW8nLFxuICAgICAgICAgICAgTU06ICdtb3MnLFxuICAgICAgICAgICAgeTogJ3lyJyxcbiAgICAgICAgICAgIHl5OiAneXJzJ1xuICAgICAgICB9LFxuICAgICAgICBkdXJhdGlvblRpbWVUZW1wbGF0ZXM6IHtcbiAgICAgICAgICAgIEhNUzogJ2g6bW06c3MnLFxuICAgICAgICAgICAgSE06ICdoOm1tJyxcbiAgICAgICAgICAgIE1TOiAnbTpzcydcbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb25MYWJlbFR5cGVzOiBbXG4gICAgICAgICAgICB7IHR5cGU6IFwic3RhbmRhcmRcIiwgc3RyaW5nOiBcIl9fXCIgfSxcbiAgICAgICAgICAgIHsgdHlwZTogXCJzaG9ydFwiLCBzdHJpbmc6IFwiX1wiIH1cbiAgICAgICAgXSxcbiAgICAgICAgZHVyYXRpb25QbHVyYWxLZXk6IGR1cmF0aW9uUGx1cmFsS2V5XG4gICAgfTtcblxuICAgIC8vIGlzQXJyYXlcbiAgICBmdW5jdGlvbiBpc0FycmF5KGFycmF5KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyYXkpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG4gICAgfVxuXG4gICAgLy8gaXNPYmplY3RcbiAgICBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xuICAgIH1cblxuICAgIC8vIGZpbmRMYXN0XG4gICAgZnVuY3Rpb24gZmluZExhc3QoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGFycmF5Lmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoaW5kZXggLT0gMSkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGFycmF5W2luZGV4XSkpIHsgcmV0dXJuIGFycmF5W2luZGV4XTsgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmluZFxuICAgIGZ1bmN0aW9uIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG5cbiAgICAgICAgdmFyIG1heCA9IGFycmF5ICYmIGFycmF5Lmxlbmd0aCB8fCAwO1xuXG4gICAgICAgIHZhciBtYXRjaDtcblxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIG1hdGNoID0gY2FsbGJhY2s7XG4gICAgICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPT09IG1hdGNoO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChpbmRleCA8IG1heCkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGFycmF5W2luZGV4XSkpIHsgcmV0dXJuIGFycmF5W2luZGV4XTsgfVxuICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGVhY2hcbiAgICBmdW5jdGlvbiBlYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgICAgbWF4ID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgICAgIGlmICghYXJyYXkgfHwgIW1heCkgeyByZXR1cm47IH1cblxuICAgICAgICB3aGlsZSAoaW5kZXggPCBtYXgpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhhcnJheVtpbmRleF0sIGluZGV4KSA9PT0gZmFsc2UpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gbWFwXG4gICAgZnVuY3Rpb24gbWFwKGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgICAgbWF4ID0gYXJyYXkubGVuZ3RoLFxuICAgICAgICAgICAgcmV0ID0gW107XG5cbiAgICAgICAgaWYgKCFhcnJheSB8fCAhbWF4KSB7IHJldHVybiByZXQ7IH1cblxuICAgICAgICB3aGlsZSAoaW5kZXggPCBtYXgpIHtcbiAgICAgICAgICAgIHJldFtpbmRleF0gPSBjYWxsYmFjayhhcnJheVtpbmRleF0sIGluZGV4KTtcbiAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8vIHBsdWNrXG4gICAgZnVuY3Rpb24gcGx1Y2soYXJyYXksIHByb3ApIHtcbiAgICAgICAgcmV0dXJuIG1hcChhcnJheSwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtW3Byb3BdO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBjb21wYWN0XG4gICAgZnVuY3Rpb24gY29tcGFjdChhcnJheSkge1xuICAgICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgICAgZWFjaChhcnJheSwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChpdGVtKSB7IHJldC5wdXNoKGl0ZW0pOyB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gdW5pcXVlXG4gICAgZnVuY3Rpb24gdW5pcXVlKGFycmF5KSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICBlYWNoKGFycmF5LCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIGlmICghZmluZChyZXQsIF9hKSkgeyByZXQucHVzaChfYSk7IH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvLyBpbnRlcnNlY3Rpb25cbiAgICBmdW5jdGlvbiBpbnRlcnNlY3Rpb24oYSwgYikge1xuICAgICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgICAgZWFjaChhLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIGVhY2goYiwgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9hID09PSBfYikgeyByZXQucHVzaChfYSk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdW5pcXVlKHJldCk7XG4gICAgfVxuXG4gICAgLy8gcmVzdFxuICAgIGZ1bmN0aW9uIHJlc3QoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICBlYWNoKGFycmF5LCBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghY2FsbGJhY2soaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXQgPSBhcnJheS5zbGljZShpbmRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8vIGluaXRpYWxcbiAgICBmdW5jdGlvbiBpbml0aWFsKGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgcmV2ZXJzZWQgPSBhcnJheS5zbGljZSgpLnJldmVyc2UoKTtcblxuICAgICAgICByZXR1cm4gcmVzdChyZXZlcnNlZCwgY2FsbGJhY2spLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICAvLyBleHRlbmRcbiAgICBmdW5jdGlvbiBleHRlbmQoYSwgYikge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgICAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSkgeyBhW2tleV0gPSBiW2tleV07IH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIC8vIGtleXNcbiAgICBmdW5jdGlvbiBrZXlzKGEpIHtcbiAgICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBhKSB7XG4gICAgICAgICAgICBpZiAoYS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7IHJldC5wdXNoKGtleSk7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gYW55XG4gICAgZnVuY3Rpb24gYW55KGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgICAgbWF4ID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgICAgIGlmICghYXJyYXkgfHwgIW1heCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICB3aGlsZSAoaW5kZXggPCBtYXgpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhhcnJheVtpbmRleF0sIGluZGV4KSA9PT0gdHJ1ZSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBmbGF0dGVuXG4gICAgZnVuY3Rpb24gZmxhdHRlbihhcnJheSkge1xuICAgICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgICAgZWFjaChhcnJheSwgZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgICAgIHJldCA9IHJldC5jb25jYXQoY2hpbGQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvTG9jYWxlU3RyaW5nU3VwcG9ydHNMb2NhbGVzKCkge1xuICAgICAgICB2YXIgbnVtYmVyID0gMDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG51bWJlci50b0xvY2FsZVN0cmluZygnaScpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5uYW1lID09PSAnUmFuZ2VFcnJvcic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZlYXR1cmVUZXN0Rm9ybWF0dGVyUm91bmRpbmcoZm9ybWF0dGVyKSB7XG4gICAgICAgIHJldHVybiBmb3JtYXR0ZXIoMy41NSwgXCJlblwiLCB7XG4gICAgICAgICAgICB1c2VHcm91cGluZzogZmFsc2UsXG4gICAgICAgICAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogMSxcbiAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMSxcbiAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMVxuICAgICAgICB9KSA9PT0gXCIzLjZcIjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmZWF0dXJlVGVzdEZvcm1hdHRlcihmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHBhc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gVGVzdCBtaW5pbXVtSW50ZWdlckRpZ2l0cy5cbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcigxLCBcImVuXCIsIHsgbWluaW11bUludGVnZXJEaWdpdHM6IDEgfSkgPT09IFwiMVwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDEsIFwiZW5cIiwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMiB9KSA9PT0gXCIwMVwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDEsIFwiZW5cIiwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMyB9KSA9PT0gXCIwMDFcIjtcbiAgICAgICAgaWYgKCFwYXNzZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgLy8gVGVzdCBtYXhpbXVtRnJhY3Rpb25EaWdpdHMgYW5kIG1pbmltdW1GcmFjdGlvbkRpZ2l0cy5cbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMCwgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwIH0pID09PSBcIjEwMFwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDk5Ljk5LCBcImVuXCIsIHsgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAxLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDEgfSkgPT09IFwiMTAwLjBcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMiwgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyIH0pID09PSBcIjk5Ljk5XCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDMsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMyB9KSA9PT0gXCI5OS45OTBcIjtcbiAgICAgICAgaWYgKCFwYXNzZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgLy8gVGVzdCBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMuXG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDEgfSkgPT09IFwiMTAwXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDIgfSkgPT09IFwiMTAwXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDMgfSkgPT09IFwiMTAwXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDQgfSkgPT09IFwiOTkuOTlcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogNSB9KSA9PT0gXCI5OS45OVwiO1xuICAgICAgICBpZiAoIXBhc3NlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICAvLyBUZXN0IGdyb3VwaW5nLlxuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDEwMDAsIFwiZW5cIiwgeyB1c2VHcm91cGluZzogdHJ1ZSB9KSA9PT0gXCIxLDAwMFwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDEwMDAsIFwiZW5cIiwgeyB1c2VHcm91cGluZzogZmFsc2UgfSkgPT09IFwiMTAwMFwiO1xuICAgICAgICBpZiAoIXBhc3NlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBkdXJhdGlvbnNGb3JtYXQoZHVyYXRpb25zIFssIHRlbXBsYXRlXSBbLCBwcmVjaXNpb25dIFssIHNldHRpbmdzXSlcbiAgICBmdW5jdGlvbiBkdXJhdGlvbnNGb3JtYXQoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSB7fTtcbiAgICAgICAgdmFyIGR1cmF0aW9ucztcblxuICAgICAgICAvLyBQYXJzZSBhcmd1bWVudHMuXG4gICAgICAgIGVhY2goYXJncywgZnVuY3Rpb24gKGFyZywgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQXJyYXkoYXJnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIkV4cGVjdGVkIGFycmF5IGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byBkdXJhdGlvbnNGb3JtYXQuXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZHVyYXRpb25zID0gYXJnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgYXJnID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy50ZW1wbGF0ZSA9IGFyZztcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MucHJlY2lzaW9uID0gYXJnO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGFyZykpIHtcbiAgICAgICAgICAgICAgICBleHRlbmQoc2V0dGluZ3MsIGFyZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghZHVyYXRpb25zIHx8ICFkdXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBzZXR0aW5ncy5yZXR1cm5Nb21lbnRUeXBlcyA9IHRydWU7XG5cbiAgICAgICAgdmFyIGZvcm1hdHRlZER1cmF0aW9ucyA9IG1hcChkdXJhdGlvbnMsIGZ1bmN0aW9uIChkdXIpIHtcbiAgICAgICAgICAgIHJldHVybiBkdXIuZm9ybWF0KHNldHRpbmdzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTWVyZ2UgdG9rZW4gdHlwZXMgZnJvbSBhbGwgZHVyYXRpb25zLlxuICAgICAgICB2YXIgb3V0cHV0VHlwZXMgPSBpbnRlcnNlY3Rpb24odHlwZXMsIHVuaXF1ZShwbHVjayhmbGF0dGVuKGZvcm1hdHRlZER1cmF0aW9ucyksIFwidHlwZVwiKSkpO1xuXG4gICAgICAgIHZhciBsYXJnZXN0ID0gc2V0dGluZ3MubGFyZ2VzdDtcblxuICAgICAgICBpZiAobGFyZ2VzdCkge1xuICAgICAgICAgICAgb3V0cHV0VHlwZXMgPSBvdXRwdXRUeXBlcy5zbGljZSgwLCBsYXJnZXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldHRpbmdzLnJldHVybk1vbWVudFR5cGVzID0gZmFsc2U7XG4gICAgICAgIHNldHRpbmdzLm91dHB1dFR5cGVzID0gb3V0cHV0VHlwZXM7XG5cbiAgICAgICAgcmV0dXJuIG1hcChkdXJhdGlvbnMsIGZ1bmN0aW9uIChkdXIpIHtcbiAgICAgICAgICAgIHJldHVybiBkdXIuZm9ybWF0KHNldHRpbmdzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZHVyYXRpb25Gb3JtYXQoW3RlbXBsYXRlXSBbLCBwcmVjaXNpb25dIFssIHNldHRpbmdzXSlcbiAgICBmdW5jdGlvbiBkdXJhdGlvbkZvcm1hdCgpIHtcblxuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgdmFyIHNldHRpbmdzID0gZXh0ZW5kKHt9LCB0aGlzLmZvcm1hdC5kZWZhdWx0cyk7XG5cbiAgICAgICAgLy8gS2VlcCBhIHNoYWRvdyBjb3B5IG9mIHRoaXMgbW9tZW50IGZvciBjYWxjdWxhdGluZyByZW1haW5kZXJzLlxuICAgICAgICAvLyBQZXJmb3JtIGFsbCBjYWxjdWxhdGlvbnMgb24gcG9zaXRpdmUgZHVyYXRpb24gdmFsdWUsIGhhbmRsZSBuZWdhdGl2ZVxuICAgICAgICAvLyBzaWduIGF0IHRoZSB2ZXJ5IGVuZC5cbiAgICAgICAgdmFyIGFzTWlsbGlzZWNvbmRzID0gdGhpcy5hc01pbGxpc2Vjb25kcygpO1xuICAgICAgICB2YXIgYXNNb250aHMgPSB0aGlzLmFzTW9udGhzKCk7XG5cbiAgICAgICAgLy8gVHJlYXQgaW52YWxpZCBkdXJhdGlvbnMgYXMgaGF2aW5nIGEgdmFsdWUgb2YgMCBtaWxsaXNlY29uZHMuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5pc1ZhbGlkID09PSBcImZ1bmN0aW9uXCIgJiYgdGhpcy5pc1ZhbGlkKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBhc01pbGxpc2Vjb25kcyA9IDA7XG4gICAgICAgICAgICBhc01vbnRocyA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXNOZWdhdGl2ZSA9IGFzTWlsbGlzZWNvbmRzIDwgMDtcblxuICAgICAgICAvLyBUd28gc2hhZG93IGNvcGllcyBhcmUgbmVlZGVkIGJlY2F1c2Ugb2YgdGhlIHdheSBtb21lbnQuanMgaGFuZGxlc1xuICAgICAgICAvLyBkdXJhdGlvbiBhcml0aG1ldGljIGZvciB5ZWFycy9tb250aHMgYW5kIGZvciB3ZWVrcy9kYXlzL2hvdXJzL21pbnV0ZXMvc2Vjb25kcy5cbiAgICAgICAgdmFyIHJlbWFpbmRlciA9IG1vbWVudC5kdXJhdGlvbihNYXRoLmFicyhhc01pbGxpc2Vjb25kcyksIFwibWlsbGlzZWNvbmRzXCIpO1xuICAgICAgICB2YXIgcmVtYWluZGVyTW9udGhzID0gbW9tZW50LmR1cmF0aW9uKE1hdGguYWJzKGFzTW9udGhzKSwgXCJtb250aHNcIik7XG5cbiAgICAgICAgLy8gUGFyc2UgYXJndW1lbnRzLlxuICAgICAgICBlYWNoKGFyZ3MsIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBhcmcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnRlbXBsYXRlID0gYXJnO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5wcmVjaXNpb24gPSBhcmc7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoYXJnKSkge1xuICAgICAgICAgICAgICAgIGV4dGVuZChzZXR0aW5ncywgYXJnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG1vbWVudFRva2VucyA9IHtcbiAgICAgICAgICAgIHllYXJzOiBcInlcIixcbiAgICAgICAgICAgIG1vbnRoczogXCJNXCIsXG4gICAgICAgICAgICB3ZWVrczogXCJ3XCIsXG4gICAgICAgICAgICBkYXlzOiBcImRcIixcbiAgICAgICAgICAgIGhvdXJzOiBcImhcIixcbiAgICAgICAgICAgIG1pbnV0ZXM6IFwibVwiLFxuICAgICAgICAgICAgc2Vjb25kczogXCJzXCIsXG4gICAgICAgICAgICBtaWxsaXNlY29uZHM6IFwiU1wiXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRva2VuRGVmcyA9IHtcbiAgICAgICAgICAgIGVzY2FwZTogL1xcWyguKz8pXFxdLyxcbiAgICAgICAgICAgIHllYXJzOiAvXFwqP1tZeV0rLyxcbiAgICAgICAgICAgIG1vbnRoczogL1xcKj9NKy8sXG4gICAgICAgICAgICB3ZWVrczogL1xcKj9bV3ddKy8sXG4gICAgICAgICAgICBkYXlzOiAvXFwqP1tEZF0rLyxcbiAgICAgICAgICAgIGhvdXJzOiAvXFwqP1tIaF0rLyxcbiAgICAgICAgICAgIG1pbnV0ZXM6IC9cXCo/bSsvLFxuICAgICAgICAgICAgc2Vjb25kczogL1xcKj9zKy8sXG4gICAgICAgICAgICBtaWxsaXNlY29uZHM6IC9cXCo/UysvLFxuICAgICAgICAgICAgZ2VuZXJhbDogLy4rPy9cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUeXBlcyBhcnJheSBpcyBhdmFpbGFibGUgaW4gdGhlIHRlbXBsYXRlIGZ1bmN0aW9uLlxuICAgICAgICBzZXR0aW5ncy50eXBlcyA9IHR5cGVzO1xuXG4gICAgICAgIHZhciB0eXBlTWFwID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gZmluZCh0eXBlcywgZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5EZWZzW3R5cGVdLnRlc3QodG9rZW4pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRva2VuaXplciA9IG5ldyBSZWdFeHAobWFwKHR5cGVzLCBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuRGVmc1t0eXBlXS5zb3VyY2U7XG4gICAgICAgIH0pLmpvaW4oXCJ8XCIpLCBcImdcIik7XG5cbiAgICAgICAgLy8gQ3VycmVudCBkdXJhdGlvbiBvYmplY3QgaXMgYXZhaWxhYmxlIGluIHRoZSB0ZW1wbGF0ZSBmdW5jdGlvbi5cbiAgICAgICAgc2V0dGluZ3MuZHVyYXRpb24gPSB0aGlzO1xuXG4gICAgICAgIC8vIEV2YWwgdGVtcGxhdGUgZnVuY3Rpb24gYW5kIGNhY2hlIHRlbXBsYXRlIHN0cmluZy5cbiAgICAgICAgdmFyIHRlbXBsYXRlID0gdHlwZW9mIHNldHRpbmdzLnRlbXBsYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXR0aW5ncy50ZW1wbGF0ZS5hcHBseShzZXR0aW5ncykgOiBzZXR0aW5ncy50ZW1wbGF0ZTtcblxuICAgICAgICAvLyBvdXRwdXRUeXBlcyBhbmQgcmV0dXJuTW9tZW50VHlwZXMgYXJlIHNldHRpbmdzIHRvIHN1cHBvcnQgZHVyYXRpb25zRm9ybWF0KCkuXG5cbiAgICAgICAgLy8gb3V0cHV0VHlwZXMgaXMgYW4gYXJyYXkgb2YgbW9tZW50IHRva2VuIHR5cGVzIHRoYXQgZGV0ZXJtaW5lc1xuICAgICAgICAvLyB0aGUgdG9rZW5zIHJldHVybmVkIGluIGZvcm1hdHRlZCBvdXRwdXQuIFRoaXMgb3B0aW9uIG92ZXJyaWRlc1xuICAgICAgICAvLyB0cmltLCBsYXJnZXN0LCBzdG9wVHJpbSwgZXRjLlxuICAgICAgICB2YXIgb3V0cHV0VHlwZXMgPSBzZXR0aW5ncy5vdXRwdXRUeXBlcztcblxuICAgICAgICAvLyByZXR1cm5Nb21lbnRUeXBlcyBpcyBhIGJvb2xlYW4gdGhhdCBzZXRzIGR1cmF0aW9uRm9ybWF0IHRvIHJldHVyblxuICAgICAgICAvLyB0aGUgcHJvY2Vzc2VkIG1vbWVudFR5cGVzIGluc3RlYWQgb2YgZm9ybWF0dGVkIG91dHB1dC5cbiAgICAgICAgdmFyIHJldHVybk1vbWVudFR5cGVzID0gc2V0dGluZ3MucmV0dXJuTW9tZW50VHlwZXM7XG5cbiAgICAgICAgdmFyIGxhcmdlc3QgPSBzZXR0aW5ncy5sYXJnZXN0O1xuXG4gICAgICAgIC8vIFNldHVwIHN0b3BUcmltIGFycmF5IG9mIHRva2VuIHR5cGVzLlxuICAgICAgICB2YXIgc3RvcFRyaW0gPSBbXTtcblxuICAgICAgICBpZiAoIW91dHB1dFR5cGVzKSB7XG4gICAgICAgICAgICBpZiAoaXNBcnJheShzZXR0aW5ncy5zdG9wVHJpbSkpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5zdG9wVHJpbSA9IHNldHRpbmdzLnN0b3BUcmltLmpvaW4oXCJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFBhcnNlIHN0b3BUcmltIHN0cmluZyB0byBjcmVhdGUgdG9rZW4gdHlwZXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3Muc3RvcFRyaW0pIHtcbiAgICAgICAgICAgICAgICBlYWNoKHNldHRpbmdzLnN0b3BUcmltLm1hdGNoKHRva2VuaXplciksIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVNYXAodG9rZW4pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImVzY2FwZVwiIHx8IHR5cGUgPT09IFwiZ2VuZXJhbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzdG9wVHJpbS5wdXNoKHR5cGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FjaGUgbW9tZW50J3MgbG9jYWxlIGRhdGEuXG4gICAgICAgIHZhciBsb2NhbGVEYXRhID0gbW9tZW50LmxvY2FsZURhdGEoKTtcblxuICAgICAgICBpZiAoIWxvY2FsZURhdGEpIHtcbiAgICAgICAgICAgIGxvY2FsZURhdGEgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byB0aGlzIHBsdWdpbidzIGBlbmdgIGV4dGVuc2lvbi5cbiAgICAgICAgZWFjaChrZXlzKGVuZ0xvY2FsZSksIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW5nTG9jYWxlW2tleV0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGlmICghbG9jYWxlRGF0YVtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZURhdGFba2V5XSA9IGVuZ0xvY2FsZVtrZXldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFsb2NhbGVEYXRhW1wiX1wiICsga2V5XSkge1xuICAgICAgICAgICAgICAgIGxvY2FsZURhdGFbXCJfXCIgKyBrZXldID0gZW5nTG9jYWxlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlcGxhY2UgRHVyYXRpb24gVGltZSBUZW1wbGF0ZSBzdHJpbmdzLlxuICAgICAgICAvLyBGb3IgbG9jYWxlIGBlbmdgOiBgX0hNU19gLCBgX0hNX2AsIGFuZCBgX01TX2AuXG4gICAgICAgIGVhY2goa2V5cyhsb2NhbGVEYXRhLl9kdXJhdGlvblRpbWVUZW1wbGF0ZXMpLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKFwiX1wiICsgaXRlbSArIFwiX1wiLCBsb2NhbGVEYXRhLl9kdXJhdGlvblRpbWVUZW1wbGF0ZXNbaXRlbV0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBEZXRlcm1pbmUgdXNlcidzIGxvY2FsZS5cbiAgICAgICAgdmFyIHVzZXJMb2NhbGUgPSBzZXR0aW5ncy51c2VyTG9jYWxlIHx8IG1vbWVudC5sb2NhbGUoKTtcblxuICAgICAgICB2YXIgdXNlTGVmdFVuaXRzID0gc2V0dGluZ3MudXNlTGVmdFVuaXRzO1xuICAgICAgICB2YXIgdXNlUGx1cmFsID0gc2V0dGluZ3MudXNlUGx1cmFsO1xuICAgICAgICB2YXIgcHJlY2lzaW9uID0gc2V0dGluZ3MucHJlY2lzaW9uO1xuICAgICAgICB2YXIgZm9yY2VMZW5ndGggPSBzZXR0aW5ncy5mb3JjZUxlbmd0aDtcbiAgICAgICAgdmFyIHVzZUdyb3VwaW5nID0gc2V0dGluZ3MudXNlR3JvdXBpbmc7XG4gICAgICAgIHZhciB0cnVuYyA9IHNldHRpbmdzLnRydW5jO1xuXG4gICAgICAgIC8vIFVzZSBzaWduaWZpY2FudCBkaWdpdHMgb25seSB3aGVuIHByZWNpc2lvbiBpcyBncmVhdGVyIHRoYW4gMC5cbiAgICAgICAgdmFyIHVzZVNpZ25pZmljYW50RGlnaXRzID0gc2V0dGluZ3MudXNlU2lnbmlmaWNhbnREaWdpdHMgJiYgcHJlY2lzaW9uID4gMDtcbiAgICAgICAgdmFyIHNpZ25pZmljYW50RGlnaXRzID0gdXNlU2lnbmlmaWNhbnREaWdpdHMgPyBzZXR0aW5ncy5wcmVjaXNpb24gOiAwO1xuICAgICAgICB2YXIgc2lnbmlmaWNhbnREaWdpdHNDYWNoZSA9IHNpZ25pZmljYW50RGlnaXRzO1xuXG4gICAgICAgIHZhciBtaW5WYWx1ZSA9IHNldHRpbmdzLm1pblZhbHVlO1xuICAgICAgICB2YXIgaXNNaW5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBtYXhWYWx1ZSA9IHNldHRpbmdzLm1heFZhbHVlO1xuICAgICAgICB2YXIgaXNNYXhWYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGZvcm1hdE51bWJlciBmYWxsYmFjayBvcHRpb25zLlxuICAgICAgICB2YXIgdXNlVG9Mb2NhbGVTdHJpbmcgPSBzZXR0aW5ncy51c2VUb0xvY2FsZVN0cmluZztcbiAgICAgICAgdmFyIGdyb3VwaW5nU2VwYXJhdG9yID0gc2V0dGluZ3MuZ3JvdXBpbmdTZXBhcmF0b3I7XG4gICAgICAgIHZhciBkZWNpbWFsU2VwYXJhdG9yID0gc2V0dGluZ3MuZGVjaW1hbFNlcGFyYXRvcjtcbiAgICAgICAgdmFyIGdyb3VwaW5nID0gc2V0dGluZ3MuZ3JvdXBpbmc7XG5cbiAgICAgICAgdXNlVG9Mb2NhbGVTdHJpbmcgPSB1c2VUb0xvY2FsZVN0cmluZyAmJiAodG9Mb2NhbGVTdHJpbmdXb3JrcyB8fCBpbnRsTnVtYmVyRm9ybWF0V29ya3MpO1xuXG4gICAgICAgIC8vIFRyaW0gb3B0aW9ucy5cbiAgICAgICAgdmFyIHRyaW0gPSBzZXR0aW5ncy50cmltO1xuXG4gICAgICAgIGlmIChpc0FycmF5KHRyaW0pKSB7XG4gICAgICAgICAgICB0cmltID0gdHJpbS5qb2luKFwiIFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0cmltID09PSBudWxsICYmIChsYXJnZXN0IHx8IG1heFZhbHVlIHx8IHVzZVNpZ25pZmljYW50RGlnaXRzKSkge1xuICAgICAgICAgICAgdHJpbSA9IFwiYWxsXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHJpbSA9PT0gbnVsbCB8fCB0cmltID09PSB0cnVlIHx8IHRyaW0gPT09IFwibGVmdFwiIHx8IHRyaW0gPT09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgdHJpbSA9IFwibGFyZ2VcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0cmltID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdHJpbSA9IFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdHJpbUluY2x1ZGVzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnRlc3QodHJpbSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHJMYXJnZSA9IC9sYXJnZS87XG4gICAgICAgIHZhciByU21hbGwgPSAvc21hbGwvO1xuICAgICAgICB2YXIgckJvdGggPSAvYm90aC87XG4gICAgICAgIHZhciByTWlkID0gL21pZC87XG4gICAgICAgIHZhciByQWxsID0gL15hbGx8W15zbV1hbGwvO1xuICAgICAgICB2YXIgckZpbmFsID0gL2ZpbmFsLztcblxuICAgICAgICB2YXIgdHJpbUxhcmdlID0gbGFyZ2VzdCA+IDAgfHwgYW55KFtyTGFyZ2UsIHJCb3RoLCByQWxsXSwgdHJpbUluY2x1ZGVzKTtcbiAgICAgICAgdmFyIHRyaW1TbWFsbCA9IGFueShbclNtYWxsLCByQm90aCwgckFsbF0sIHRyaW1JbmNsdWRlcyk7XG4gICAgICAgIHZhciB0cmltTWlkID0gYW55KFtyTWlkLCByQWxsXSwgdHJpbUluY2x1ZGVzKTtcbiAgICAgICAgdmFyIHRyaW1GaW5hbCA9IGFueShbckZpbmFsLCByQWxsXSwgdHJpbUluY2x1ZGVzKTtcblxuICAgICAgICAvLyBQYXJzZSBmb3JtYXQgc3RyaW5nIHRvIGNyZWF0ZSByYXcgdG9rZW5zIGFycmF5LlxuICAgICAgICB2YXIgcmF3VG9rZW5zID0gbWFwKHRlbXBsYXRlLm1hdGNoKHRva2VuaXplciksIGZ1bmN0aW9uICh0b2tlbiwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gdHlwZU1hcCh0b2tlbik7XG5cbiAgICAgICAgICAgIGlmICh0b2tlbi5zbGljZSgwLCAxKSA9PT0gXCIqXCIpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2VuLnNsaWNlKDEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IFwiZXNjYXBlXCIgJiYgdHlwZSAhPT0gXCJnZW5lcmFsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcFRyaW0ucHVzaCh0eXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIGxlbmd0aDogdG9rZW4ubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiXCIsXG5cbiAgICAgICAgICAgICAgICAvLyBSZXBsYWNlIGVzY2FwZWQgdG9rZW5zIHdpdGggdGhlIG5vbi1lc2NhcGVkIHRva2VuIHRleHQuXG4gICAgICAgICAgICAgICAgdG9rZW46ICh0eXBlID09PSBcImVzY2FwZVwiID8gdG9rZW4ucmVwbGFjZSh0b2tlbkRlZnMuZXNjYXBlLCBcIiQxXCIpIDogdG9rZW4pLFxuXG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIHR5cGUgb24gbm9uLW1vbWVudCB0b2tlbnMuXG4gICAgICAgICAgICAgICAgdHlwZTogKCh0eXBlID09PSBcImVzY2FwZVwiIHx8IHR5cGUgPT09IFwiZ2VuZXJhbFwiKSA/IG51bGwgOiB0eXBlKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQXNzb2NpYXRlIHRleHQgdG9rZW5zIHdpdGggbW9tZW50IHRva2Vucy5cbiAgICAgICAgdmFyIGN1cnJlbnRUb2tlbiA9IHtcbiAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgbGVuZ3RoOiAwLFxuICAgICAgICAgICAgdG9rZW46IFwiXCIsXG4gICAgICAgICAgICB0ZXh0OiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0b2tlbnMgPSBbXTtcblxuICAgICAgICBpZiAodXNlTGVmdFVuaXRzKSB7XG4gICAgICAgICAgICByYXdUb2tlbnMucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWFjaChyYXdUb2tlbnMsIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRva2VuLnR5cGUgfHwgY3VycmVudFRva2VuLnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5zLnB1c2goY3VycmVudFRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdXJyZW50VG9rZW4gPSB0b2tlbjtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHVzZUxlZnRVbml0cykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUb2tlbi50ZXh0ID0gdG9rZW4udG9rZW4gKyBjdXJyZW50VG9rZW4udGV4dDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRva2VuLnRleHQgKz0gdG9rZW4udG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjdXJyZW50VG9rZW4udHlwZSB8fCBjdXJyZW50VG9rZW4udGV4dCkge1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goY3VycmVudFRva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1c2VMZWZ0VW5pdHMpIHtcbiAgICAgICAgICAgIHRva2Vucy5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaW5kIHVuaXF1ZSBtb21lbnQgdG9rZW4gdHlwZXMgaW4gdGhlIHRlbXBsYXRlIGluIG9yZGVyIG9mXG4gICAgICAgIC8vIGRlc2NlbmRpbmcgbWFnbml0dWRlLlxuICAgICAgICB2YXIgbW9tZW50VHlwZXMgPSBpbnRlcnNlY3Rpb24odHlwZXMsIHVuaXF1ZShjb21wYWN0KHBsdWNrKHRva2VucywgXCJ0eXBlXCIpKSkpO1xuXG4gICAgICAgIC8vIEV4aXQgZWFybHkgaWYgdGhlcmUgYXJlIG5vIG1vbWVudCB0b2tlbiB0eXBlcy5cbiAgICAgICAgaWYgKCFtb21lbnRUeXBlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBwbHVjayh0b2tlbnMsIFwidGV4dFwiKS5qb2luKFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHZhbHVlcyBmb3IgZWFjaCBtb21lbnQgdHlwZSBpbiB0aGUgdGVtcGxhdGUuXG4gICAgICAgIC8vIEZvciBwcm9jZXNzaW5nIHRoZSBzZXR0aW5ncywgdmFsdWVzIGFyZSBhc3NvY2lhdGVkIHdpdGggbW9tZW50IHR5cGVzLlxuICAgICAgICAvLyBWYWx1ZXMgd2lsbCBiZSBhc3NpZ25lZCB0byB0b2tlbnMgYXQgdGhlIGxhc3Qgc3RlcCBpbiBvcmRlciB0b1xuICAgICAgICAvLyBhc3N1bWUgbm90aGluZyBhYm91dCBmcmVxdWVuY3kgb3Igb3JkZXIgb2YgdG9rZW5zIGluIHRoZSB0ZW1wbGF0ZS5cbiAgICAgICAgbW9tZW50VHlwZXMgPSBtYXAobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlLCBpbmRleCkge1xuICAgICAgICAgICAgLy8gSXMgdGhpcyB0aGUgbGVhc3QtbWFnbml0dWRlIG1vbWVudCB0b2tlbiBmb3VuZD9cbiAgICAgICAgICAgIHZhciBpc1NtYWxsZXN0ID0gKChpbmRleCArIDEpID09PSBtb21lbnRUeXBlcy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAvLyBJcyB0aGlzIHRoZSBncmVhdGVzdC1tYWduaXR1ZGUgbW9tZW50IHRva2VuIGZvdW5kP1xuICAgICAgICAgICAgdmFyIGlzTGFyZ2VzdCA9ICghaW5kZXgpO1xuXG4gICAgICAgICAgICAvLyBHZXQgdGhlIHJhdyB2YWx1ZSBpbiB0aGUgY3VycmVudCB1bml0cy5cbiAgICAgICAgICAgIHZhciByYXdWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKG1vbWVudFR5cGUgPT09IFwieWVhcnNcIiB8fCBtb21lbnRUeXBlID09PSBcIm1vbnRoc1wiKSB7XG4gICAgICAgICAgICAgICAgcmF3VmFsdWUgPSByZW1haW5kZXJNb250aHMuYXMobW9tZW50VHlwZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJhd1ZhbHVlID0gcmVtYWluZGVyLmFzKG1vbWVudFR5cGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgd2hvbGVWYWx1ZSA9IE1hdGguZmxvb3IocmF3VmFsdWUpO1xuICAgICAgICAgICAgdmFyIGRlY2ltYWxWYWx1ZSA9IHJhd1ZhbHVlIC0gd2hvbGVWYWx1ZTtcblxuICAgICAgICAgICAgdmFyIHRva2VuID0gZmluZCh0b2tlbnMsIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlID09PSB0b2tlbi50eXBlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChpc0xhcmdlc3QgJiYgbWF4VmFsdWUgJiYgcmF3VmFsdWUgPiBtYXhWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlzTWF4VmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNTbWFsbGVzdCAmJiBtaW5WYWx1ZSAmJiBNYXRoLmFicyhzZXR0aW5ncy5kdXJhdGlvbi5hcyhtb21lbnRUeXBlKSkgPCBtaW5WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlzTWluVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBOb3RlIHRoZSBsZW5ndGggb2YgdGhlIGxhcmdlc3QtbWFnbml0dWRlIG1vbWVudCB0b2tlbjpcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGdyZWF0ZXIgdGhhbiBvbmUgYW5kIGZvcmNlTGVuZ3RoIGlzIG5vdCBzZXQsXG4gICAgICAgICAgICAvLyB0aGVuIGRlZmF1bHQgZm9yY2VMZW5ndGggdG8gYHRydWVgLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFJhdGlvbmFsZSBpcyB0aGlzOiBJZiB0aGUgdGVtcGxhdGUgaXMgXCJoOm1tOnNzXCIgYW5kIHRoZVxuICAgICAgICAgICAgLy8gbW9tZW50IHZhbHVlIGlzIDUgbWludXRlcywgdGhlIHVzZXItZnJpZW5kbHkgb3V0cHV0IGlzXG4gICAgICAgICAgICAvLyBcIjU6MDBcIiwgbm90IFwiMDU6MDBcIi4gV2Ugc2hvdWxkbid0IHBhZCB0aGUgYG1pbnV0ZXNgIHRva2VuXG4gICAgICAgICAgICAvLyBldmVuIHRob3VnaCBpdCBoYXMgbGVuZ3RoIG9mIHR3byBpZiB0aGUgdGVtcGxhdGUgaXMgXCJoOm1tOnNzXCI7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gSWYgdGhlIG1pbnV0ZXMgb3V0cHV0IHNob3VsZCBhbHdheXMgaW5jbHVkZSB0aGUgbGVhZGluZyB6ZXJvXG4gICAgICAgICAgICAvLyBldmVuIHdoZW4gdGhlIGhvdXIgaXMgdHJpbW1lZCB0aGVuIHNldCBgeyBmb3JjZUxlbmd0aDogdHJ1ZSB9YFxuICAgICAgICAgICAgLy8gdG8gb3V0cHV0IFwiMDU6MDBcIi4gSWYgdGhlIHRlbXBsYXRlIGlzIFwiaGg6bW06c3NcIiwgdGhlIHVzZXJcbiAgICAgICAgICAgIC8vIGNsZWFybHkgd2FudGVkIGV2ZXJ5dGhpbmcgcGFkZGVkIHNvIHdlIHNob3VsZCBvdXRwdXQgXCIwNTowMFwiO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIHdhbnRzIHRoZSBmdWxsIHBhZGRlZCBvdXRwdXQsIHRoZXkgY2FuIHVzZVxuICAgICAgICAgICAgLy8gdGVtcGxhdGUgXCJoaDptbTpzc1wiIGFuZCBzZXQgYHsgdHJpbTogZmFsc2UgfWAgdG8gb3V0cHV0XG4gICAgICAgICAgICAvLyBcIjAwOjA1OjAwXCIuXG4gICAgICAgICAgICBpZiAoaXNMYXJnZXN0ICYmIGZvcmNlTGVuZ3RoID09PSBudWxsICYmIHRva2VuLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBmb3JjZUxlbmd0aCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSByZW1haW5kZXIuXG4gICAgICAgICAgICByZW1haW5kZXIuc3VidHJhY3Qod2hvbGVWYWx1ZSwgbW9tZW50VHlwZSk7XG4gICAgICAgICAgICByZW1haW5kZXJNb250aHMuc3VidHJhY3Qod2hvbGVWYWx1ZSwgbW9tZW50VHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmF3VmFsdWU6IHJhd1ZhbHVlLFxuICAgICAgICAgICAgICAgIHdob2xlVmFsdWU6IHdob2xlVmFsdWUsXG4gICAgICAgICAgICAgICAgLy8gRGVjaW1hbCB2YWx1ZSBpcyBvbmx5IHJldGFpbmVkIGZvciB0aGUgbGVhc3QtbWFnbml0dWRlXG4gICAgICAgICAgICAgICAgLy8gbW9tZW50IHR5cGUgaW4gdGhlIGZvcm1hdCB0ZW1wbGF0ZS5cbiAgICAgICAgICAgICAgICBkZWNpbWFsVmFsdWU6IGlzU21hbGxlc3QgPyBkZWNpbWFsVmFsdWUgOiAwLFxuICAgICAgICAgICAgICAgIGlzU21hbGxlc3Q6IGlzU21hbGxlc3QsXG4gICAgICAgICAgICAgICAgaXNMYXJnZXN0OiBpc0xhcmdlc3QsXG4gICAgICAgICAgICAgICAgdHlwZTogbW9tZW50VHlwZSxcbiAgICAgICAgICAgICAgICAvLyBUb2tlbnMgY2FuIGFwcGVhciBtdWx0aXBsZSB0aW1lcyBpbiBhIHRlbXBsYXRlIHN0cmluZyxcbiAgICAgICAgICAgICAgICAvLyBidXQgYWxsIGluc3RhbmNlcyBtdXN0IHNoYXJlIHRoZSBzYW1lIGxlbmd0aC5cbiAgICAgICAgICAgICAgICB0b2tlbkxlbmd0aDogdG9rZW4ubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgdHJ1bmNNZXRob2QgPSB0cnVuYyA/IE1hdGguZmxvb3IgOiBNYXRoLnJvdW5kO1xuICAgICAgICB2YXIgdHJ1bmNhdGUgPSBmdW5jdGlvbiAodmFsdWUsIHBsYWNlcykge1xuICAgICAgICAgICAgdmFyIGZhY3RvciA9IE1hdGgucG93KDEwLCBwbGFjZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydW5jTWV0aG9kKHZhbHVlICogZmFjdG9yKSAvIGZhY3RvcjtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZm91bmRGaXJzdCA9IGZhbHNlO1xuICAgICAgICB2YXIgYnViYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBmb3JtYXRWYWx1ZSA9IGZ1bmN0aW9uIChtb21lbnRUeXBlLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIGZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHVzZUdyb3VwaW5nLFxuICAgICAgICAgICAgICAgIGdyb3VwaW5nU2VwYXJhdG9yOiBncm91cGluZ1NlcGFyYXRvcixcbiAgICAgICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgICAgIGdyb3VwaW5nOiBncm91cGluZyxcbiAgICAgICAgICAgICAgICB1c2VUb0xvY2FsZVN0cmluZzogdXNlVG9Mb2NhbGVTdHJpbmdcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh1c2VTaWduaWZpY2FudERpZ2l0cykge1xuICAgICAgICAgICAgICAgIGlmIChzaWduaWZpY2FudERpZ2l0cyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUucmF3VmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLndob2xlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0T3B0aW9ucy5tYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgPSBzaWduaWZpY2FudERpZ2l0cztcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS5zaWduaWZpY2FudERpZ2l0cyA9IHNpZ25pZmljYW50RGlnaXRzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzTWF4VmFsdWUgJiYgIWJ1YmJsZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAobW9tZW50VHlwZS5pc0xhcmdlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS53aG9sZVZhbHVlID0gbWF4VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLndob2xlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNNaW5WYWx1ZSAmJiAhYnViYmxlZCkge1xuICAgICAgICAgICAgICAgIGlmIChtb21lbnRUeXBlLmlzU21hbGxlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS53aG9sZVZhbHVlID0gbWluVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLndob2xlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobW9tZW50VHlwZS5pc1NtYWxsZXN0IHx8IG1vbWVudFR5cGUuc2lnbmlmaWNhbnREaWdpdHMgJiYgbW9tZW50VHlwZS5zaWduaWZpY2FudERpZ2l0cyAtIG1vbWVudFR5cGUud2hvbGVWYWx1ZS50b1N0cmluZygpLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQXBwbHkgcHJlY2lzaW9uIHRvIGxlYXN0IHNpZ25pZmljYW50IHRva2VuIHZhbHVlLlxuICAgICAgICAgICAgICAgIGlmIChwcmVjaXNpb24gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSB0cnVuY2F0ZShtb21lbnRUeXBlLndob2xlVmFsdWUsIHByZWNpc2lvbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcmVjaXNpb24gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IHRydW5jTWV0aG9kKG1vbWVudFR5cGUud2hvbGVWYWx1ZSArIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBwcmVjaXNpb24gPiAwXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VTaWduaWZpY2FudERpZ2l0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRydW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IHRydW5jYXRlKG1vbWVudFR5cGUucmF3VmFsdWUsIHNpZ25pZmljYW50RGlnaXRzIC0gbW9tZW50VHlwZS53aG9sZVZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IG1vbWVudFR5cGUucmF3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb21lbnRUeXBlLndob2xlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduaWZpY2FudERpZ2l0cyAtPSBtb21lbnRUeXBlLndob2xlVmFsdWUudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRPcHRpb25zLmZyYWN0aW9uRGlnaXRzID0gcHJlY2lzaW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnZhbHVlID0gbW9tZW50VHlwZS53aG9sZVZhbHVlICsgdHJ1bmNhdGUobW9tZW50VHlwZS5kZWNpbWFsVmFsdWUsIHByZWNpc2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSBtb21lbnRUeXBlLndob2xlVmFsdWUgKyBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZVNpZ25pZmljYW50RGlnaXRzICYmIG1vbWVudFR5cGUud2hvbGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBPdXRlciBNYXRoLnJvdW5kIHJlcXVpcmVkIGhlcmUgdG8gaGFuZGxlIGZsb2F0aW5nIHBvaW50IGVycm9ycy5cbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IE1hdGgucm91bmQodHJ1bmNhdGUobW9tZW50VHlwZS53aG9sZVZhbHVlLCBtb21lbnRUeXBlLnNpZ25pZmljYW50RGlnaXRzIC0gbW9tZW50VHlwZS53aG9sZVZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2lnbmlmaWNhbnREaWdpdHMgLT0gbW9tZW50VHlwZS53aG9sZVZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSBtb21lbnRUeXBlLndob2xlVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobW9tZW50VHlwZS50b2tlbkxlbmd0aCA+IDEgJiYgKGZvcmNlTGVuZ3RoIHx8IGZvdW5kRmlyc3QpKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0T3B0aW9ucy5taW5pbXVtSW50ZWdlckRpZ2l0cyA9IG1vbWVudFR5cGUudG9rZW5MZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBpZiAoYnViYmxlZCAmJiBmb3JtYXRPcHRpb25zLm1heGltdW1TaWduaWZpY2FudERpZ2l0cyA8IG1vbWVudFR5cGUudG9rZW5MZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGZvcm1hdE9wdGlvbnMubWF4aW11bVNpZ25pZmljYW50RGlnaXRzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFmb3VuZEZpcnN0ICYmIChtb21lbnRUeXBlLnZhbHVlID4gMCB8fCB0cmltID09PSBcIlwiIC8qIHRyaW06IGZhbHNlICovIHx8IGZpbmQoc3RvcFRyaW0sIG1vbWVudFR5cGUudHlwZSkgfHwgZmluZChvdXRwdXRUeXBlcywgbW9tZW50VHlwZS50eXBlKSkpIHtcbiAgICAgICAgICAgICAgICBmb3VuZEZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZSA9IGZvcm1hdE51bWJlcihtb21lbnRUeXBlLnZhbHVlLCBmb3JtYXRPcHRpb25zLCB1c2VyTG9jYWxlKTtcblxuICAgICAgICAgICAgZm9ybWF0T3B0aW9ucy51c2VHcm91cGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgZm9ybWF0T3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yID0gXCIuXCI7XG4gICAgICAgICAgICBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlRW4gPSBmb3JtYXROdW1iZXIobW9tZW50VHlwZS52YWx1ZSwgZm9ybWF0T3B0aW9ucywgXCJlblwiKTtcblxuICAgICAgICAgICAgaWYgKG1vbWVudFR5cGUudG9rZW5MZW5ndGggPT09IDIgJiYgbW9tZW50VHlwZS50eXBlID09PSBcIm1pbGxpc2Vjb25kc1wiKSB7XG4gICAgICAgICAgICAgICAgbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZU1TID0gZm9ybWF0TnVtYmVyKG1vbWVudFR5cGUudmFsdWUsIHtcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bUludGVnZXJEaWdpdHM6IDMsXG4gICAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sIFwiZW5cIikuc2xpY2UoMCwgMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBmb3JtYXR0ZWQgdmFsdWVzLlxuICAgICAgICBtb21lbnRUeXBlcyA9IG1hcChtb21lbnRUeXBlcywgZm9ybWF0VmFsdWUpO1xuICAgICAgICBtb21lbnRUeXBlcyA9IGNvbXBhY3QobW9tZW50VHlwZXMpO1xuXG4gICAgICAgIC8vIEJ1YmJsZSByb3VuZGVkIHZhbHVlcy5cbiAgICAgICAgaWYgKG1vbWVudFR5cGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHZhciBmaW5kVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmQobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlLnR5cGUgPT09IHR5cGU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgYnViYmxlVHlwZXMgPSBmdW5jdGlvbiAoYnViYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ1YmJsZU1vbWVudFR5cGUgPSBmaW5kVHlwZShidWJibGUudHlwZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWJ1YmJsZU1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVhY2goYnViYmxlLnRhcmdldHMsIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldE1vbWVudFR5cGUgPSBmaW5kVHlwZSh0YXJnZXQudHlwZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXRNb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoYnViYmxlTW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZUVuLCAxMCkgPT09IHRhcmdldC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlTW9tZW50VHlwZS5yYXdWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVNb21lbnRUeXBlLndob2xlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlTW9tZW50VHlwZS5kZWNpbWFsVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TW9tZW50VHlwZS5yYXdWYWx1ZSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TW9tZW50VHlwZS53aG9sZVZhbHVlICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlRW4gPSB0YXJnZXRNb21lbnRUeXBlLndob2xlVmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBlYWNoKGJ1YmJsZXMsIGJ1YmJsZVR5cGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlY2FsY3VsYXRlIGZvcm1hdHRlZCB2YWx1ZXMuXG4gICAgICAgIGlmIChidWJibGVkKSB7XG4gICAgICAgICAgICBmb3VuZEZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICBzaWduaWZpY2FudERpZ2l0cyA9IHNpZ25pZmljYW50RGlnaXRzQ2FjaGU7XG4gICAgICAgICAgICBtb21lbnRUeXBlcyA9IG1hcChtb21lbnRUeXBlcywgZm9ybWF0VmFsdWUpO1xuICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBjb21wYWN0KG1vbWVudFR5cGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvdXRwdXRUeXBlcyAmJiAhKGlzTWF4VmFsdWUgJiYgIXNldHRpbmdzLnRyaW0pKSB7XG4gICAgICAgICAgICBtb21lbnRUeXBlcyA9IG1hcChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmluZChvdXRwdXRUeXBlcywgZnVuY3Rpb24gKG91dHB1dFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGUudHlwZSA9PT0gb3V0cHV0VHlwZTtcbiAgICAgICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb21lbnRUeXBlcyA9IGNvbXBhY3QobW9tZW50VHlwZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVHJpbSBMYXJnZS5cbiAgICAgICAgICAgIGlmICh0cmltTGFyZ2UpIHtcbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlcyA9IHJlc3QobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3AgdHJpbW1pbmcgb246XG4gICAgICAgICAgICAgICAgICAgIC8vIC0gdGhlIHNtYWxsZXN0IG1vbWVudCB0eXBlXG4gICAgICAgICAgICAgICAgICAgIC8vIC0gYSB0eXBlIG1hcmtlZCBmb3Igc3RvcFRyaW1cbiAgICAgICAgICAgICAgICAgICAgLy8gLSBhIHR5cGUgdGhhdCBoYXMgYSB3aG9sZSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIW1vbWVudFR5cGUuaXNTbWFsbGVzdCAmJiAhbW9tZW50VHlwZS53aG9sZVZhbHVlICYmICFmaW5kKHN0b3BUcmltLCBtb21lbnRUeXBlLnR5cGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBMYXJnZXN0LlxuICAgICAgICAgICAgaWYgKGxhcmdlc3QgJiYgbW9tZW50VHlwZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBtb21lbnRUeXBlcy5zbGljZSgwLCBsYXJnZXN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVHJpbSBTbWFsbC5cbiAgICAgICAgICAgIGlmICh0cmltU21hbGwgJiYgbW9tZW50VHlwZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIG1vbWVudFR5cGVzID0gaW5pdGlhbChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU3RvcCB0cmltbWluZyBvbjpcbiAgICAgICAgICAgICAgICAgICAgLy8gLSBhIHR5cGUgbWFya2VkIGZvciBzdG9wVHJpbVxuICAgICAgICAgICAgICAgICAgICAvLyAtIGEgdHlwZSB0aGF0IGhhcyBhIHdob2xlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIC8vIC0gdGhlIGxhcmdlc3QgbW9tZW50VHlwZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIW1vbWVudFR5cGUud2hvbGVWYWx1ZSAmJiAhZmluZChzdG9wVHJpbSwgbW9tZW50VHlwZS50eXBlKSAmJiAhbW9tZW50VHlwZS5pc0xhcmdlc3Q7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRyaW0gTWlkLlxuICAgICAgICAgICAgaWYgKHRyaW1NaWQpIHtcbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlcyA9IG1hcChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDAgJiYgaW5kZXggPCBtb21lbnRUeXBlcy5sZW5ndGggLSAxICYmICFtb21lbnRUeXBlLndob2xlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGU7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlcyA9IGNvbXBhY3QobW9tZW50VHlwZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUcmltIEZpbmFsLlxuICAgICAgICAgICAgaWYgKHRyaW1GaW5hbCAmJiBtb21lbnRUeXBlcy5sZW5ndGggPT09IDEgJiYgIW1vbWVudFR5cGVzWzBdLndob2xlVmFsdWUgJiYgISghdHJ1bmMgJiYgbW9tZW50VHlwZXNbMF0uaXNTbWFsbGVzdCAmJiBtb21lbnRUeXBlc1swXS5yYXdWYWx1ZSA8IG1pblZhbHVlKSkge1xuICAgICAgICAgICAgICAgIG1vbWVudFR5cGVzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmV0dXJuTW9tZW50VHlwZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvY2FsaXplIGFuZCBwbHVyYWxpemUgdW5pdCBsYWJlbHMuXG4gICAgICAgIGVhY2godG9rZW5zLCBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBtb21lbnRUb2tlbnNbdG9rZW4udHlwZV07XG5cbiAgICAgICAgICAgIHZhciBtb21lbnRUeXBlID0gZmluZChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZS50eXBlID09PSB0b2tlbi50eXBlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICgha2V5IHx8ICFtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZUVuLnNwbGl0KFwiLlwiKTtcblxuICAgICAgICAgICAgdmFsdWVzWzBdID0gcGFyc2VJbnQodmFsdWVzWzBdLCAxMCk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZXNbMV0pIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNbMV0gPSBwYXJzZUZsb2F0KFwiMC5cIiArIHZhbHVlc1sxXSwgMTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNbMV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcGx1cmFsS2V5ID0gbG9jYWxlRGF0YS5kdXJhdGlvblBsdXJhbEtleShrZXksIHZhbHVlc1swXSwgdmFsdWVzWzFdKTtcblxuICAgICAgICAgICAgdmFyIGxhYmVscyA9IGR1cmF0aW9uR2V0TGFiZWxzKGtleSwgbG9jYWxlRGF0YSk7XG5cbiAgICAgICAgICAgIHZhciBhdXRvTG9jYWxpemVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHZhciBwbHVyYWxpemVkTGFiZWxzID0ge307XG5cbiAgICAgICAgICAgIC8vIEF1dG8tTG9jYWxpemVkIHVuaXQgbGFiZWxzLlxuICAgICAgICAgICAgZWFjaChsb2NhbGVEYXRhLl9kdXJhdGlvbkxhYmVsVHlwZXMsIGZ1bmN0aW9uIChsYWJlbFR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSBmaW5kKGxhYmVscywgZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsYWJlbC50eXBlID09PSBsYWJlbFR5cGUudHlwZSAmJiBsYWJlbC5rZXkgPT09IHBsdXJhbEtleTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBwbHVyYWxpemVkTGFiZWxzW2xhYmVsLnR5cGVdID0gbGFiZWwubGFiZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZ0luY2x1ZGVzKHRva2VuLnRleHQsIGxhYmVsVHlwZS5zdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi50ZXh0ID0gdG9rZW4udGV4dC5yZXBsYWNlKGxhYmVsVHlwZS5zdHJpbmcsIGxhYmVsLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Mb2NhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEF1dG8tcGx1cmFsaXplZCB1bml0IGxhYmVscy5cbiAgICAgICAgICAgIGlmICh1c2VQbHVyYWwgJiYgIWF1dG9Mb2NhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICBsYWJlbHMuc29ydChkdXJhdGlvbkxhYmVsQ29tcGFyZSk7XG5cbiAgICAgICAgICAgICAgICBlYWNoKGxhYmVscywgZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVyYWxpemVkTGFiZWxzW2xhYmVsLnR5cGVdID09PSBsYWJlbC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZ0luY2x1ZGVzKHRva2VuLnRleHQsIGxhYmVsLmxhYmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0b3AgY2hlY2tpbmcgdGhpcyB0b2tlbiBpZiBpdHMgbGFiZWwgaXMgYWxyZWFkeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvcnJlY3RseSBwbHVyYWxpemVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCB0aGlzIGxhYmVsIGlmIGl0IGlzIGNvcnJlY3QsIGJ1dCBub3QgcHJlc2VudCBpblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHRva2VuJ3MgdGV4dC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmdJbmNsdWRlcyh0b2tlbi50ZXh0LCBsYWJlbC5sYWJlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlcGxlY2UgdGhpcyB0b2tlbidzIGxhYmVsIGFuZCBzdG9wIGNoZWNraW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4udGV4dCA9IHRva2VuLnRleHQucmVwbGFjZShsYWJlbC5sYWJlbCwgcGx1cmFsaXplZExhYmVsc1tsYWJlbC50eXBlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQnVpbGQgb3VwdHV0LlxuICAgICAgICB0b2tlbnMgPSBtYXAodG9rZW5zLCBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIGlmICghdG9rZW4udHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbi50ZXh0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbW9tZW50VHlwZSA9IGZpbmQobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGUudHlwZSA9PT0gdG9rZW4udHlwZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIW1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG91dCA9IFwiXCI7XG5cbiAgICAgICAgICAgIGlmICh1c2VMZWZ0VW5pdHMpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gdG9rZW4udGV4dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzTmVnYXRpdmUgJiYgaXNNYXhWYWx1ZSB8fCAhaXNOZWdhdGl2ZSAmJiBpc01pblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgb3V0ICs9IFwiPCBcIjtcbiAgICAgICAgICAgICAgICBpc01heFZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaXNNaW5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNOZWdhdGl2ZSAmJiBpc01pblZhbHVlIHx8ICFpc05lZ2F0aXZlICYmIGlzTWF4VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gXCI+IFwiO1xuICAgICAgICAgICAgICAgIGlzTWF4VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpc01pblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc05lZ2F0aXZlICYmIChtb21lbnRUeXBlLnZhbHVlID4gMCB8fCB0cmltID09PSBcIlwiIHx8IGZpbmQoc3RvcFRyaW0sIG1vbWVudFR5cGUudHlwZSkgfHwgZmluZChvdXRwdXRUeXBlcywgbW9tZW50VHlwZS50eXBlKSkpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gXCItXCI7XG4gICAgICAgICAgICAgICAgaXNOZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gXCJtaWxsaXNlY29uZHNcIiAmJiBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlTVMpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZU1TO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF1c2VMZWZ0VW5pdHMpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gdG9rZW4udGV4dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVHJpbSBsZWFkaW5nIGFuZCB0cmFpbGluZyBjb21tYSwgc3BhY2UsIGNvbG9uLCBhbmQgZG90LlxuICAgICAgICByZXR1cm4gdG9rZW5zLmpvaW4oXCJcIikucmVwbGFjZSgvKCx8IHw6fFxcLikqJC8sIFwiXCIpLnJlcGxhY2UoL14oLHwgfDp8XFwuKSovLCBcIlwiKTtcbiAgICB9XG5cbiAgICAvLyBkZWZhdWx0Rm9ybWF0VGVtcGxhdGVcbiAgICBmdW5jdGlvbiBkZWZhdWx0Rm9ybWF0VGVtcGxhdGUoKSB7XG4gICAgICAgIHZhciBkdXIgPSB0aGlzLmR1cmF0aW9uO1xuXG4gICAgICAgIHZhciBmaW5kVHlwZSA9IGZ1bmN0aW9uIGZpbmRUeXBlKHR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiBkdXIuX2RhdGFbdHlwZV07XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGZpcnN0VHlwZSA9IGZpbmQodGhpcy50eXBlcywgZmluZFR5cGUpO1xuXG4gICAgICAgIHZhciBsYXN0VHlwZSA9IGZpbmRMYXN0KHRoaXMudHlwZXMsIGZpbmRUeXBlKTtcblxuICAgICAgICAvLyBEZWZhdWx0IHRlbXBsYXRlIHN0cmluZ3MgZm9yIGVhY2ggZHVyYXRpb24gZGltZW5zaW9uIHR5cGUuXG4gICAgICAgIHN3aXRjaCAoZmlyc3RUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwibWlsbGlzZWNvbmRzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiUyBfX1wiO1xuICAgICAgICAgICAgY2FzZSBcInNlY29uZHNcIjogLy8gRmFsbHRocm91Z2guXG4gICAgICAgICAgICBjYXNlIFwibWludXRlc1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIipfTVNfXCI7XG4gICAgICAgICAgICBjYXNlIFwiaG91cnNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJfSE1TX1wiO1xuICAgICAgICAgICAgY2FzZSBcImRheXNcIjogLy8gUG9zc2libGUgRmFsbHRocm91Z2guXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0VHlwZSA9PT0gbGFzdFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZCBfX1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJ3ZWVrc1wiOlxuICAgICAgICAgICAgICAgIGlmIChmaXJzdFR5cGUgPT09IGxhc3RUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIncgX19cIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmltID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpbSA9IFwiYm90aFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBcIncgX18sIGQgX18sIGggX19cIjtcbiAgICAgICAgICAgIGNhc2UgXCJtb250aHNcIjogLy8gUG9zc2libGUgRmFsbHRocm91Z2guXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0VHlwZSA9PT0gbGFzdFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTSBfX1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJ5ZWFyc1wiOlxuICAgICAgICAgICAgICAgIGlmIChmaXJzdFR5cGUgPT09IGxhc3RUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInkgX19cIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmltID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpbSA9IFwiYm90aFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBcInkgX18sIE0gX18sIGQgX19cIjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaW0gPSBcImJvdGhcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ5IF9fLCBkIF9fLCBoIF9fLCBtIF9fLCBzIF9fXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbml0XG4gICAgZnVuY3Rpb24gaW5pdChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgdGhyb3cgXCJNb21lbnQgRHVyYXRpb24gRm9ybWF0IGluaXQgY2Fubm90IGZpbmQgbW9tZW50IGluc3RhbmNlLlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5kdXJhdGlvbi5mb3JtYXQgPSBkdXJhdGlvbnNGb3JtYXQ7XG4gICAgICAgIGNvbnRleHQuZHVyYXRpb24uZm4uZm9ybWF0ID0gZHVyYXRpb25Gb3JtYXQ7XG5cbiAgICAgICAgY29udGV4dC5kdXJhdGlvbi5mbi5mb3JtYXQuZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAvLyBNYW55IG9wdGlvbnMgYXJlIGRlZmF1bHRlZCB0byBgbnVsbGAgdG8gZGlzdGluZ3Vpc2ggYmV0d2VlblxuICAgICAgICAgICAgLy8gJ25vdCBzZXQnIGFuZCAnc2V0IHRvIGBmYWxzZWAnXG5cbiAgICAgICAgICAgIC8vIHRyaW1cbiAgICAgICAgICAgIC8vIENhbiBiZSBhIHN0cmluZywgYSBkZWxpbWl0ZWQgbGlzdCBvZiBzdHJpbmdzLCBhbiBhcnJheSBvZiBzdHJpbmdzLFxuICAgICAgICAgICAgLy8gb3IgYSBib29sZWFuLlxuICAgICAgICAgICAgLy8gXCJsYXJnZVwiIC0gd2lsbCB0cmltIGxhcmdlc3QtbWFnbml0dWRlIHplcm8tdmFsdWUgdG9rZW5zIHVudGlsXG4gICAgICAgICAgICAvLyBmaW5kaW5nIGEgdG9rZW4gd2l0aCBhIHZhbHVlLCBhIHRva2VuIGlkZW50aWZpZWQgYXMgJ3N0b3BUcmltJywgb3JcbiAgICAgICAgICAgIC8vIHRoZSBmaW5hbCB0b2tlbiBvZiB0aGUgZm9ybWF0IHN0cmluZy5cbiAgICAgICAgICAgIC8vIFwic21hbGxcIiAtIHdpbGwgdHJpbSBzbWFsbGVzdC1tYWduaXR1ZGUgemVyby12YWx1ZSB0b2tlbnMgdW50aWxcbiAgICAgICAgICAgIC8vIGZpbmRpbmcgYSB0b2tlbiB3aXRoIGEgdmFsdWUsIGEgdG9rZW4gaWRlbnRpZmllZCBhcyAnc3RvcFRyaW0nLCBvclxuICAgICAgICAgICAgLy8gdGhlIGZpbmFsIHRva2VuIG9mIHRoZSBmb3JtYXQgc3RyaW5nLlxuICAgICAgICAgICAgLy8gXCJib3RoXCIgLSB3aWxsIGV4ZWN1dGUgXCJsYXJnZVwiIHRyaW0gdGhlbiBcInNtYWxsXCIgdHJpbS5cbiAgICAgICAgICAgIC8vIFwibWlkXCIgLSB3aWxsIHRyaW0gYW55IHplcm8tdmFsdWUgdG9rZW5zIHRoYXQgYXJlIG5vdCB0aGUgZmlyc3Qgb3JcbiAgICAgICAgICAgIC8vIGxhc3QgdG9rZW5zLiBVc3VhbGx5IHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBcImxhcmdlXCIgb3IgXCJib3RoXCIuXG4gICAgICAgICAgICAvLyBlLmcuIFwibGFyZ2UgbWlkXCIgb3IgXCJib3RoIG1pZFwiLlxuICAgICAgICAgICAgLy8gXCJmaW5hbFwiIC0gd2lsbCB0cmltIHRoZSBmaW5hbCB0b2tlbiBpZiBpdCBpcyB6ZXJvLXZhbHVlLiBVc2UgdGhpc1xuICAgICAgICAgICAgLy8gb3B0aW9uIHdpdGggXCJsYXJnZVwiIG9yIFwiYm90aFwiIHRvIG91dHB1dCBhbiBlbXB0eSBzdHJpbmcgd2hlblxuICAgICAgICAgICAgLy8gZm9ybWF0dGluZyBhIHplcm8tdmFsdWUgZHVyYXRpb24uIGUuZy4gXCJsYXJnZSBmaW5hbFwiIG9yIFwiYm90aCBmaW5hbFwiLlxuICAgICAgICAgICAgLy8gXCJhbGxcIiAtIFdpbGwgdHJpbSBhbGwgemVyby12YWx1ZSB0b2tlbnMuIFNob3J0aGFuZCBmb3IgXCJib3RoIG1pZCBmaW5hbFwiLlxuICAgICAgICAgICAgLy8gXCJsZWZ0XCIgLSBtYXBzIHRvIFwibGFyZ2VcIiB0byBzdXBwb3J0IHBsdWdpbidzIHZlcnNpb24gMSBBUEkuXG4gICAgICAgICAgICAvLyBcInJpZ2h0XCIgLSBtYXBzIHRvIFwibGFyZ2VcIiB0byBzdXBwb3J0IHBsdWdpbidzIHZlcnNpb24gMSBBUEkuXG4gICAgICAgICAgICAvLyBgZmFsc2VgIC0gdGVtcGxhdGUgdG9rZW5zIGFyZSBub3QgdHJpbW1lZC5cbiAgICAgICAgICAgIC8vIGB0cnVlYCAtIHRyZWF0ZWQgYXMgXCJsYXJnZVwiLlxuICAgICAgICAgICAgLy8gYG51bGxgIC0gdHJlYXRlZCBhcyBcImxhcmdlXCIuXG4gICAgICAgICAgICB0cmltOiBudWxsLFxuXG4gICAgICAgICAgICAvLyBzdG9wVHJpbVxuICAgICAgICAgICAgLy8gQSBtb21lbnQgdG9rZW4gc3RyaW5nLCBhIGRlbGltaXRlZCBzZXQgb2YgbW9tZW50IHRva2VuIHN0cmluZ3MsXG4gICAgICAgICAgICAvLyBvciBhbiBhcnJheSBvZiBtb21lbnQgdG9rZW4gc3RyaW5ncy4gVHJpbW1pbmcgd2lsbCBzdG9wIHdoZW4gYSB0b2tlblxuICAgICAgICAgICAgLy8gbGlzdGVkIGluIHRoaXMgb3B0aW9uIGlzIHJlYWNoZWQuIEEgXCIqXCIgY2hhcmFjdGVyIGluIHRoZSBmb3JtYXRcbiAgICAgICAgICAgIC8vIHRlbXBsYXRlIHN0cmluZyB3aWxsIGFsc28gbWFyayBhIG1vbWVudCB0b2tlbiBhcyBzdG9wVHJpbS5cbiAgICAgICAgICAgIC8vIGUuZy4gXCJkIFtkYXlzXSAqaDptbTpzc1wiIHdpbGwgYWx3YXlzIHN0b3AgdHJpbW1pbmcgYXQgdGhlICdob3VycycgdG9rZW4uXG4gICAgICAgICAgICBzdG9wVHJpbTogbnVsbCxcblxuICAgICAgICAgICAgLy8gbGFyZ2VzdFxuICAgICAgICAgICAgLy8gU2V0IHRvIGEgcG9zaXRpdmUgaW50ZWdlciB0byBvdXRwdXQgb25seSB0aGUgXCJuXCIgbGFyZ2VzdC1tYWduaXR1ZGVcbiAgICAgICAgICAgIC8vIG1vbWVudCB0b2tlbnMgdGhhdCBoYXZlIGEgdmFsdWUuIEFsbCBsZXNzZXItbWFnbml0dWRlIG1vbWVudCB0b2tlbnNcbiAgICAgICAgICAgIC8vIHdpbGwgYmUgaWdub3JlZC4gVGhpcyBvcHRpb24gdGFrZXMgZWZmZWN0IGV2ZW4gaWYgYHRyaW1gIGlzIHNldFxuICAgICAgICAgICAgLy8gdG8gYGZhbHNlYC5cbiAgICAgICAgICAgIGxhcmdlc3Q6IG51bGwsXG5cbiAgICAgICAgICAgIC8vIG1heFZhbHVlXG4gICAgICAgICAgICAvLyBVc2UgYG1heFZhbHVlYCB0byByZW5kZXIgZ2VuZXJhbGl6ZWQgb3V0cHV0IGZvciBsYXJnZSBkdXJhdGlvbiB2YWx1ZXMsXG4gICAgICAgICAgICAvLyBlLmcuIGBcIj4gNjAgZGF5c1wiYC4gYG1heFZhbHVlYCBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciBhbmQgaXNcbiAgICAgICAgICAgIC8vLyBhcHBsaWVkIHRvIHRoZSBncmVhdGVzdC1tYWduaXR1ZGUgbW9tZW50IHRva2VuIGluIHRoZSBmb3JtYXQgdGVtcGxhdGUuXG4gICAgICAgICAgICBtYXhWYWx1ZTogbnVsbCxcblxuICAgICAgICAgICAgLy8gbWluVmFsdWVcbiAgICAgICAgICAgIC8vIFVzZSBgbWluVmFsdWVgIHRvIHJlbmRlciBnZW5lcmFsaXplZCBvdXRwdXQgZm9yIHNtYWxsIGR1cmF0aW9uIHZhbHVlcyxcbiAgICAgICAgICAgIC8vIGUuZy4gYFwiPCA1IG1pbnV0ZXNcImAuIGBtaW5WYWx1ZWAgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIgYW5kIGlzXG4gICAgICAgICAgICAvLyBhcHBsaWVkIHRvIHRoZSBsZWFzdC1tYWduaXR1ZGUgbW9tZW50IHRva2VuIGluIHRoZSBmb3JtYXQgdGVtcGxhdGUuXG4gICAgICAgICAgICBtaW5WYWx1ZTogbnVsbCxcblxuICAgICAgICAgICAgLy8gcHJlY2lzaW9uXG4gICAgICAgICAgICAvLyBJZiBhIHBvc2l0aXZlIGludGVnZXIsIG51bWJlciBvZiBkZWNpbWFsIGZyYWN0aW9uIGRpZ2l0cyB0byByZW5kZXIuXG4gICAgICAgICAgICAvLyBJZiBhIG5lZ2F0aXZlIGludGVnZXIsIG51bWJlciBvZiBpbnRlZ2VyIHBsYWNlIGRpZ2l0cyB0byB0cnVuY2F0ZSB0byAwLlxuICAgICAgICAgICAgLy8gSWYgYHVzZVNpZ25pZmljYW50RGlnaXRzYCBpcyBzZXQgdG8gYHRydWVgIGFuZCBgcHJlY2lzaW9uYCBpcyBhIHBvc2l0aXZlXG4gICAgICAgICAgICAvLyBpbnRlZ2VyLCBzZXRzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHMgdXNlZCBpbiB0aGVcbiAgICAgICAgICAgIC8vIGZvcm1hdHRlZCBvdXRwdXQuXG4gICAgICAgICAgICBwcmVjaXNpb246IDAsXG5cbiAgICAgICAgICAgIC8vIHRydW5jXG4gICAgICAgICAgICAvLyBEZWZhdWx0IGJlaGF2aW9yIHJvdW5kcyBmaW5hbCB0b2tlbiB2YWx1ZS4gU2V0IHRvIGB0cnVlYCB0b1xuICAgICAgICAgICAgLy8gdHJ1bmNhdGUgZmluYWwgdG9rZW4gdmFsdWUsIHdoaWNoIHdhcyB0aGUgZGVmYXVsdCBiZWhhdmlvciBpblxuICAgICAgICAgICAgLy8gdmVyc2lvbiAxIG9mIHRoaXMgcGx1Z2luLlxuICAgICAgICAgICAgdHJ1bmM6IGZhbHNlLFxuXG4gICAgICAgICAgICAvLyBmb3JjZUxlbmd0aFxuICAgICAgICAgICAgLy8gRm9yY2UgZmlyc3QgbW9tZW50IHRva2VuIHdpdGggYSB2YWx1ZSB0byByZW5kZXIgYXQgZnVsbCBsZW5ndGhcbiAgICAgICAgICAgIC8vIGV2ZW4gd2hlbiB0ZW1wbGF0ZSBpcyB0cmltbWVkIGFuZCBmaXJzdCBtb21lbnQgdG9rZW4gaGFzIGxlbmd0aCBvZiAxLlxuICAgICAgICAgICAgZm9yY2VMZW5ndGg6IG51bGwsXG5cbiAgICAgICAgICAgIC8vIHVzZXJMb2NhbGVcbiAgICAgICAgICAgIC8vIEZvcm1hdHRlZCBudW1lcmljYWwgb3V0cHV0IGlzIHJlbmRlcmVkIHVzaW5nIGB0b0xvY2FsZVN0cmluZ2BcbiAgICAgICAgICAgIC8vIGFuZCB0aGUgbG9jYWxlIG9mIHRoZSB1c2VyJ3MgZW52aXJvbm1lbnQuIFNldCB0aGlzIG9wdGlvbiB0byByZW5kZXJcbiAgICAgICAgICAgIC8vIG51bWVyaWNhbCBvdXRwdXQgdXNpbmcgYSBkaWZmZXJlbnQgbG9jYWxlLiBVbml0IG5hbWVzIGFyZSByZW5kZXJlZFxuICAgICAgICAgICAgLy8gYW5kIGRldGVjdGVkIHVzaW5nIHRoZSBsb2NhbGUgc2V0IGluIG1vbWVudC5qcywgd2hpY2ggY2FuIGJlIGRpZmZlcmVudFxuICAgICAgICAgICAgLy8gZnJvbSB0aGUgbG9jYWxlIG9mIHVzZXIncyBlbnZpcm9ubWVudC5cbiAgICAgICAgICAgIHVzZXJMb2NhbGU6IG51bGwsXG5cbiAgICAgICAgICAgIC8vIHVzZVBsdXJhbFxuICAgICAgICAgICAgLy8gV2lsbCBhdXRvbWF0aWNhbGx5IHNpbmd1bGFyaXplIG9yIHBsdXJhbGl6ZSB1bml0IG5hbWVzIHdoZW4gdGhleVxuICAgICAgICAgICAgLy8gYXBwZWFyIGluIHRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCBlYWNoIG1vbWVudCB0b2tlbi4gU3RhbmRhcmQgYW5kXG4gICAgICAgICAgICAvLyBzaG9ydCB1bml0IGxhYmVscyBhcmUgc2luZ3VsYXJpemVkIGFuZCBwbHVyYWxpemVkLCBiYXNlZCBvbiBsb2NhbGUuXG4gICAgICAgICAgICAvLyBlLmcuIGluIGVuZ2xpc2gsIFwiMSBzZWNvbmRcIiBvciBcIjEgc2VjXCIgd291bGQgYmUgcmVuZGVyZWQgaW5zdGVhZFxuICAgICAgICAgICAgLy8gb2YgXCIxIHNlY29uZHNcIiBvciBcIjEgc2Vjc1wiLiBUaGUgZGVmYXVsdCBwbHVyYWxpemF0aW9uIGZ1bmN0aW9uXG4gICAgICAgICAgICAvLyByZW5kZXJzIGEgcGx1cmFsIGxhYmVsIGZvciBhIHZhbHVlIHdpdGggZGVjaW1hbCBwcmVjaXNpb24uXG4gICAgICAgICAgICAvLyBlLmcuIFwiMS4wIHNlY29uZHNcIiBpcyBuZXZlciByZW5kZXJlZCBhcyBcIjEuMCBzZWNvbmRcIi5cbiAgICAgICAgICAgIC8vIExhYmVsIHR5cGVzIGFuZCBwbHVyYWxpemF0aW9uIGZ1bmN0aW9uIGFyZSBjb25maWd1cmFibGUgaW4gdGhlXG4gICAgICAgICAgICAvLyBsb2NhbGVEYXRhIGV4dGVuc2lvbnMuXG4gICAgICAgICAgICB1c2VQbHVyYWw6IHRydWUsXG5cbiAgICAgICAgICAgIC8vIHVzZUxlZnRVbml0c1xuICAgICAgICAgICAgLy8gVGhlIHRleHQgdG8gdGhlIHJpZ2h0IG9mIGVhY2ggbW9tZW50IHRva2VuIGluIGEgZm9ybWF0IHN0cmluZ1xuICAgICAgICAgICAgLy8gaXMgdHJlYXRlZCBhcyB0aGF0IHRva2VuJ3MgdW5pdHMgZm9yIHRoZSBwdXJwb3NlcyBvZiB0cmltbWluZyxcbiAgICAgICAgICAgIC8vIHNpbmd1bGFyaXppbmcsIGFuZCBhdXRvLWxvY2FsaXppbmcuXG4gICAgICAgICAgICAvLyBlLmcuIFwiaCBbaG91cnNdLCBtIFttaW51dGVzXSwgcyBbc2Vjb25kc11cIi5cbiAgICAgICAgICAgIC8vIFRvIHByb3Blcmx5IHNpbmd1bGFyaXplIG9yIGxvY2FsaXplIGEgZm9ybWF0IHN0cmluZyBzdWNoIGFzXG4gICAgICAgICAgICAvLyBcIltob3Vyc10gaCwgW21pbnV0ZXNdIG0sIFtzZWNvbmRzXSBzXCIsIHdoZXJlIHRoZSB1bml0cyBhcHBlYXJcbiAgICAgICAgICAgIC8vIHRvIHRoZSBsZWZ0IG9mIGVhY2ggbW9tZW50IHRva2VuLCBzZXQgdXNlTGVmdFVuaXRzIHRvIGB0cnVlYC5cbiAgICAgICAgICAgIC8vIFRoaXMgcGx1Z2luIGlzIG5vdCB0ZXN0ZWQgaW4gdGhlIGNvbnRleHQgb2YgcnRsIHRleHQuXG4gICAgICAgICAgICB1c2VMZWZ0VW5pdHM6IGZhbHNlLFxuXG4gICAgICAgICAgICAvLyB1c2VHcm91cGluZ1xuICAgICAgICAgICAgLy8gRW5hYmxlcyBsb2NhbGUtYmFzZWQgZGlnaXQgZ3JvdXBpbmcgaW4gdGhlIGZvcm1hdHRlZCBvdXRwdXQuIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9OdW1iZXIvdG9Mb2NhbGVTdHJpbmdcbiAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuXG4gICAgICAgICAgICAvLyB1c2VTaWduaWZpY2FudERpZ2l0c1xuICAgICAgICAgICAgLy8gVHJlYXQgdGhlIGBwcmVjaXNpb25gIG9wdGlvbiBhcyB0aGUgbWF4aW11bSBzaWduaWZpY2FudCBkaWdpdHNcbiAgICAgICAgICAgIC8vIHRvIGJlIHJlbmRlcmVkLiBQcmVjaXNpb24gbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIuIFNpZ25pZmljYW50XG4gICAgICAgICAgICAvLyBkaWdpdHMgZXh0ZW5kIGFjcm9zcyB1bml0IHR5cGVzLFxuICAgICAgICAgICAgLy8gZS5nLiBcIjYgaG91cnMgMzcuNSBtaW51dGVzXCIgcmVwcmVzZW50cyA0IHNpZ25pZmljYW50IGRpZ2l0cy5cbiAgICAgICAgICAgIC8vIEVuYWJsaW5nIHRoaXMgb3B0aW9uIGNhdXNlcyB0b2tlbiBsZW5ndGggdG8gYmUgaWdub3JlZC4gU2VlICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9OdW1iZXIvdG9Mb2NhbGVTdHJpbmdcbiAgICAgICAgICAgIHVzZVNpZ25pZmljYW50RGlnaXRzOiBmYWxzZSxcblxuICAgICAgICAgICAgLy8gdGVtcGxhdGVcbiAgICAgICAgICAgIC8vIFRoZSB0ZW1wbGF0ZSBzdHJpbmcgdXNlZCB0byBmb3JtYXQgdGhlIGR1cmF0aW9uLiBNYXkgYmUgYSBmdW5jdGlvblxuICAgICAgICAgICAgLy8gb3IgYSBzdHJpbmcuIFRlbXBsYXRlIGZ1bmN0aW9ucyBhcmUgZXhlY3V0ZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmdcbiAgICAgICAgICAgIC8vIG9mIHRoZSBzZXR0aW5ncyBvYmplY3Qgc28gdGhhdCB0ZW1wbGF0ZSBzdHJpbmdzIG1heSBiZSBkeW5hbWljYWxseVxuICAgICAgICAgICAgLy8gZ2VuZXJhdGVkIGJhc2VkIG9uIHRoZSBkdXJhdGlvbiBvYmplY3QgKGFjY2Vzc2libGUgdmlhIGB0aGlzLmR1cmF0aW9uYClcbiAgICAgICAgICAgIC8vIG9yIGFueSBvZiB0aGUgb3RoZXIgc2V0dGluZ3MuIExlYWRpbmcgYW5kIHRyYWlsaW5nIHNwYWNlLCBjb21tYSxcbiAgICAgICAgICAgIC8vIHBlcmlvZCwgYW5kIGNvbG9uIGNoYXJhY3RlcnMgYXJlIHRyaW1tZWQgZnJvbSB0aGUgcmVzdWx0aW5nIHN0cmluZy5cbiAgICAgICAgICAgIHRlbXBsYXRlOiBkZWZhdWx0Rm9ybWF0VGVtcGxhdGUsXG5cbiAgICAgICAgICAgIC8vIHVzZVRvTG9jYWxlU3RyaW5nXG4gICAgICAgICAgICAvLyBTZXQgdGhpcyBvcHRpb24gdG8gYGZhbHNlYCB0byBpZ25vcmUgdGhlIGB0b0xvY2FsZVN0cmluZ2AgZmVhdHVyZVxuICAgICAgICAgICAgLy8gdGVzdCBhbmQgZm9yY2UgdGhlIHVzZSBvZiB0aGUgYGZvcm1hdE51bWJlcmAgZmFsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgICAgIC8vIGluY2x1ZGVkIGluIHRoaXMgcGx1Z2luLlxuICAgICAgICAgICAgdXNlVG9Mb2NhbGVTdHJpbmc6IHRydWUsXG5cbiAgICAgICAgICAgIC8vIGZvcm1hdE51bWJlciBmYWxsYmFjayBvcHRpb25zLlxuICAgICAgICAgICAgLy8gV2hlbiBgdG9Mb2NhbGVTdHJpbmdgIGlzIGRldGVjdGVkIGFuZCBwYXNzZXMgdGhlIGZlYXR1cmUgdGVzdCwgdGhlXG4gICAgICAgICAgICAvLyBmb2xsb3dpbmcgb3B0aW9ucyB3aWxsIGhhdmUgbm8gZWZmZWN0OiBgdG9Mb2NhbGVTdHJpbmdgIHdpbGwgYmUgdXNlZFxuICAgICAgICAgICAgLy8gZm9yIGZvcm1hdHRpbmcgYW5kIHRoZSBncm91cGluZyBzZXBhcmF0b3IsIGRlY2ltYWwgc2VwYXJhdG9yLCBhbmRcbiAgICAgICAgICAgIC8vIGludGVnZXIgZGlnaXQgZ3JvdXBpbmcgd2lsbCBiZSBkZXRlcm1pbmVkIGJ5IHRoZSB1c2VyIGxvY2FsZS5cblxuICAgICAgICAgICAgLy8gZ3JvdXBpbmdTZXBhcmF0b3JcbiAgICAgICAgICAgIC8vIFRoZSBpbnRlZ2VyIGRpZ2l0IGdyb3VwaW5nIHNlcGFyYXRvciB1c2VkIHdoZW4gdXNpbmcgdGhlIGZhbGxiYWNrXG4gICAgICAgICAgICAvLyBmb3JtYXROdW1iZXIgZnVuY3Rpb24uXG4gICAgICAgICAgICBncm91cGluZ1NlcGFyYXRvcjogXCIsXCIsXG5cbiAgICAgICAgICAgIC8vIGRlY2ltYWxTZXBhcmF0b3JcbiAgICAgICAgICAgIC8vIFRoZSBkZWNpbWFsIHNlcGFyYXRvciB1c2VkIHdoZW4gdXNpbmcgdGhlIGZhbGxiYWNrIGZvcm1hdE51bWJlclxuICAgICAgICAgICAgLy8gZnVuY3Rpb24uXG4gICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBcIi5cIixcblxuICAgICAgICAgICAgLy8gZ3JvdXBpbmdcbiAgICAgICAgICAgIC8vIFRoZSBpbnRlZ2VyIGRpZ2l0IGdyb3VwaW5nIHVzZWQgd2hlbiB1c2luZyB0aGUgZmFsbGJhY2sgZm9ybWF0TnVtYmVyXG4gICAgICAgICAgICAvLyBmdW5jdGlvbi4gTXVzdCBiZSBhbiBhcnJheS4gVGhlIGRlZmF1bHQgdmFsdWUgb2YgYFszXWAgZ2l2ZXMgdGhlXG4gICAgICAgICAgICAvLyBzdGFuZGFyZCAzLWRpZ2l0IHRob3VzYW5kL21pbGxpb24vYmlsbGlvbiBkaWdpdCBncm91cGluZ3MgZm9yIHRoZVxuICAgICAgICAgICAgLy8gXCJlblwiIGxvY2FsZS4gU2V0dGluZyB0aGlzIG9wdGlvbiB0byBgWzMsIDJdYCB3b3VsZCBnZW5lcmF0ZSB0aGVcbiAgICAgICAgICAgIC8vIHRob3VzYW5kL2xha2gvY3JvcmUgZGlnaXQgZ3JvdXBpbmdzIHVzZWQgaW4gdGhlIFwiZW4tSU5cIiBsb2NhbGUuXG4gICAgICAgICAgICBncm91cGluZzogWzNdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29udGV4dC51cGRhdGVMb2NhbGUoJ2VuJywgZW5nTG9jYWxlKTtcbiAgICB9XG5cbiAgICAvLyBSdW4gZmVhdHVyZSB0ZXN0cyBmb3IgYE51bWJlciN0b0xvY2FsZVN0cmluZ2AuXG4gICAgdmFyIHRvTG9jYWxlU3RyaW5nRm9ybWF0dGVyID0gZnVuY3Rpb24obnVtYmVyLCBsb2NhbGUsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG51bWJlci50b0xvY2FsZVN0cmluZyhsb2NhbGUsIG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICB0b0xvY2FsZVN0cmluZ1dvcmtzID0gdG9Mb2NhbGVTdHJpbmdTdXBwb3J0c0xvY2FsZXMoKSAmJiBmZWF0dXJlVGVzdEZvcm1hdHRlcih0b0xvY2FsZVN0cmluZ0Zvcm1hdHRlcik7XG4gICAgdG9Mb2NhbGVTdHJpbmdSb3VuZGluZ1dvcmtzID0gdG9Mb2NhbGVTdHJpbmdXb3JrcyAmJiBmZWF0dXJlVGVzdEZvcm1hdHRlclJvdW5kaW5nKHRvTG9jYWxlU3RyaW5nRm9ybWF0dGVyKTtcblxuICAgIC8vIFJ1biBmZWF0dXJlIHRlc3RzIGZvciBgSW50bC5OdW1iZXJGb3JtYXQjZm9ybWF0YC5cbiAgICB2YXIgaW50bE51bWJlckZvcm1hdEZvcm1hdHRlciA9IGZ1bmN0aW9uKG51bWJlciwgbG9jYWxlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgJiYgd2luZG93LkludGwgJiYgd2luZG93LkludGwuTnVtYmVyRm9ybWF0KSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LkludGwuTnVtYmVyRm9ybWF0KGxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KG51bWJlcik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaW50bE51bWJlckZvcm1hdFdvcmtzID0gZmVhdHVyZVRlc3RGb3JtYXR0ZXIoaW50bE51bWJlckZvcm1hdEZvcm1hdHRlcik7XG4gICAgaW50bE51bWJlckZvcm1hdFJvdW5kaW5nV29ya3MgPSBpbnRsTnVtYmVyRm9ybWF0V29ya3MgJiYgZmVhdHVyZVRlc3RGb3JtYXR0ZXJSb3VuZGluZyhpbnRsTnVtYmVyRm9ybWF0Rm9ybWF0dGVyKTtcblxuICAgIC8vIEluaXRpYWxpemUgZHVyYXRpb24gZm9ybWF0IG9uIHRoZSBnbG9iYWwgbW9tZW50IGluc3RhbmNlLlxuICAgIGluaXQobW9tZW50KTtcblxuICAgIC8vIFJldHVybiB0aGUgaW5pdCBmdW5jdGlvbiBzbyB0aGF0IGR1cmF0aW9uIGZvcm1hdCBjYW4gYmVcbiAgICAvLyBpbml0aWFsaXplZCBvbiBvdGhlciBtb21lbnQgaW5zdGFuY2VzLlxuICAgIHJldHVybiBpbml0O1xufSk7XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG4gIHZhciBoYXMgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG5cbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKGhhcyh0eXBlU3BlY3MsIHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIGVyciA9IEVycm9yKFxuICAgICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6ICcgKyBsb2NhdGlvbiArICcgdHlwZSBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7ICcgK1xuICAgICAgICAgICAgICAnaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCcgKyB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gKyAnYC4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgJiYgIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICcgK1xuICAgICAgICAgICAgbG9jYXRpb24gKyAnIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAnICsgdHlwZW9mIGVycm9yICsgJy4gJyArXG4gICAgICAgICAgICAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICtcbiAgICAgICAgICAgICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc3RhY2sgPSBnZXRTdGFjayA/IGdldFN0YWNrKCkgOiAnJztcblxuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICdGYWlsZWQgJyArIGxvY2F0aW9uICsgJyB0eXBlOiAnICsgZXJyb3IubWVzc2FnZSArIChzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmVzZXRzIHdhcm5pbmcgY2FjaGUgd2hlbiB0ZXN0aW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmNoZWNrUHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlID0gZnVuY3Rpb24oKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1Byb3BUeXBlcztcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG52YXIgaGFzID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG5mdW5jdGlvbiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGVsZW1lbnRUeXBlOiBjcmVhdGVFbGVtZW50VHlwZVR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyLFxuICAgIGV4YWN0OiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyLFxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gT2xkIGJlaGF2aW9yIGZvciBwZW9wbGUgdXNpbmcgUmVhY3QuUHJvcFR5cGVzXG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gJiZcbiAgICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPCAzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBwcm9wIG9uIGAnICsgY29tcG9uZW50TmFtZSAgKyAnYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgK1xuICAgICAgICAgICAgICAnYW5kIHdpbGwgdGhyb3cgaW4gdGhlIHN0YW5kYWxvbmUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICtcbiAgICAgICAgICAgICAgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIVJlYWN0SXMuaXNWYWxpZEVsZW1lbnRUeXBlKHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50IHR5cGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudHMgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGFycmF5LCBnb3QgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIGFyZ3VtZW50cy4gJyArXG4gICAgICAgICAgICAnQSBjb21tb24gbWlzdGFrZSBpcyB0byB3cml0ZSBvbmVPZih4LCB5LCB6KSBpbnN0ZWFkIG9mIG9uZU9mKFt4LCB5LCB6XSkuJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBhcnJheS4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMsIGZ1bmN0aW9uIHJlcGxhY2VyKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlID09PSAnc3ltYm9sJykge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIFN0cmluZyhwcm9wVmFsdWUpICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgIGlmIChoYXMocHJvcFZhbHVlLCBrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAnICsgZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKGNoZWNrZXIpICsgJyBhdCBpbmRleCAnICsgaSArICcuJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gZmFsc3kgdmFsdWUgY2FuJ3QgYmUgYSBTeW1ib2xcbiAgICBpZiAoIXByb3BWYWx1ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlID0gY2hlY2tQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGU7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKFJlYWN0SXMuaXNFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuOC42XG4gKiByZWFjdC1pcy5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTtcbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb25jdXJyZW50X21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKSA6IDB4ZWFkMDtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0O1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8XG4gIC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSk7XG59XG5cbi8qKlxuICogRm9ya2VkIGZyb20gZmJqcy93YXJuaW5nOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2ZianMvYmxvYi9lNjZiYTIwYWQ1YmU0MzNlYjU0NDIzZjJiMDk3ZDgyOTMyNGQ5ZGU2L3BhY2thZ2VzL2ZianMvc3JjL19fZm9ya3NfXy93YXJuaW5nLmpzXG4gKlxuICogT25seSBjaGFuZ2UgaXMgd2UgdXNlIGNvbnNvbGUud2FybiBpbnN0ZWFkIG9mIGNvbnNvbGUuZXJyb3IsXG4gKiBhbmQgZG8gbm90aGluZyB3aGVuICdjb25zb2xlJyBpcyBub3Qgc3VwcG9ydGVkLlxuICogVGhpcyByZWFsbHkgc2ltcGxpZmllcyB0aGUgY29kZS5cbiAqIC0tLVxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYGxvd1ByaW9yaXR5V2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmckMSA9IGxvd1ByaW9yaXR5V2FybmluZztcblxuZnVuY3Rpb24gdHlwZU9mKG9iamVjdCkge1xuICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsKSB7XG4gICAgdmFyICQkdHlwZW9mID0gb2JqZWN0LiQkdHlwZW9mO1xuICAgIHN3aXRjaCAoJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICB2YXIgdHlwZSA9IG9iamVjdC50eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciAkJHR5cGVvZlR5cGUgPSB0eXBlICYmIHR5cGUuJCR0eXBlb2Y7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2ZUeXBlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vLyBBc3luY01vZGUgaXMgZGVwcmVjYXRlZCBhbG9uZyB3aXRoIGlzQXN5bmNNb2RlXG52YXIgQXN5bmNNb2RlID0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xudmFyIENvbmN1cnJlbnRNb2RlID0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG52YXIgQ29udGV4dENvbnN1bWVyID0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xudmFyIENvbnRleHRQcm92aWRlciA9IFJFQUNUX1BST1ZJREVSX1RZUEU7XG52YXIgRWxlbWVudCA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcbnZhciBGb3J3YXJkUmVmID0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbnZhciBGcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG52YXIgTGF6eSA9IFJFQUNUX0xBWllfVFlQRTtcbnZhciBNZW1vID0gUkVBQ1RfTUVNT19UWVBFO1xudmFyIFBvcnRhbCA9IFJFQUNUX1BPUlRBTF9UWVBFO1xudmFyIFByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbnZhciBTdHJpY3RNb2RlID0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbnZhciBTdXNwZW5zZSA9IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG5cbnZhciBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IGZhbHNlO1xuXG4vLyBBc3luY01vZGUgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcbmZ1bmN0aW9uIGlzQXN5bmNNb2RlKG9iamVjdCkge1xuICB7XG4gICAgaWYgKCFoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSkge1xuICAgICAgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSB0cnVlO1xuICAgICAgbG93UHJpb3JpdHlXYXJuaW5nJDEoZmFsc2UsICdUaGUgUmVhY3RJcy5pc0FzeW5jTW9kZSgpIGFsaWFzIGhhcyBiZWVuIGRlcHJlY2F0ZWQsICcgKyAnYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBSZWFjdCAxNysuIFVwZGF0ZSB5b3VyIGNvZGUgdG8gdXNlICcgKyAnUmVhY3RJcy5pc0NvbmN1cnJlbnRNb2RlKCkgaW5zdGVhZC4gSXQgaGFzIHRoZSBleGFjdCBzYW1lIEFQSS4nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB8fCB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dENvbnN1bWVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTlRFWFRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dFByb3ZpZGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST1ZJREVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZvcndhcmRSZWYob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRnJhZ21lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTGF6eShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9MQVpZX1RZUEU7XG59XG5mdW5jdGlvbiBpc01lbW8ob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTUVNT19UWVBFO1xufVxuZnVuY3Rpb24gaXNQb3J0YWwob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUE9SVEFMX1RZUEU7XG59XG5mdW5jdGlvbiBpc1Byb2ZpbGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N0cmljdE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3VzcGVuc2Uob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbn1cblxuZXhwb3J0cy50eXBlT2YgPSB0eXBlT2Y7XG5leHBvcnRzLkFzeW5jTW9kZSA9IEFzeW5jTW9kZTtcbmV4cG9ydHMuQ29uY3VycmVudE1vZGUgPSBDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuQ29udGV4dENvbnN1bWVyID0gQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5Db250ZXh0UHJvdmlkZXIgPSBDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLkVsZW1lbnQgPSBFbGVtZW50O1xuZXhwb3J0cy5Gb3J3YXJkUmVmID0gRm9yd2FyZFJlZjtcbmV4cG9ydHMuRnJhZ21lbnQgPSBGcmFnbWVudDtcbmV4cG9ydHMuTGF6eSA9IExhenk7XG5leHBvcnRzLk1lbW8gPSBNZW1vO1xuZXhwb3J0cy5Qb3J0YWwgPSBQb3J0YWw7XG5leHBvcnRzLlByb2ZpbGVyID0gUHJvZmlsZXI7XG5leHBvcnRzLlN0cmljdE1vZGUgPSBTdHJpY3RNb2RlO1xuZXhwb3J0cy5TdXNwZW5zZSA9IFN1c3BlbnNlO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGU7XG5leHBvcnRzLmlzQXN5bmNNb2RlID0gaXNBc3luY01vZGU7XG5leHBvcnRzLmlzQ29uY3VycmVudE1vZGUgPSBpc0NvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lciA9IGlzQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlciA9IGlzQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzRm9yd2FyZFJlZiA9IGlzRm9yd2FyZFJlZjtcbmV4cG9ydHMuaXNGcmFnbWVudCA9IGlzRnJhZ21lbnQ7XG5leHBvcnRzLmlzTGF6eSA9IGlzTGF6eTtcbmV4cG9ydHMuaXNNZW1vID0gaXNNZW1vO1xuZXhwb3J0cy5pc1BvcnRhbCA9IGlzUG9ydGFsO1xuZXhwb3J0cy5pc1Byb2ZpbGVyID0gaXNQcm9maWxlcjtcbmV4cG9ydHMuaXNTdHJpY3RNb2RlID0gaXNTdHJpY3RNb2RlO1xuZXhwb3J0cy5pc1N1c3BlbnNlID0gaXNTdXNwZW5zZTtcbiAgfSkoKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAoX19ERVZfXykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMSA/IGxlbiAtIDEgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAxOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDFdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkobnVsbCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJoZWxwZXJzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcImkxOG5cIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsaWRhdG9yc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIndwXCJdW1wiZWxlbWVudFwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIndwXCJdW1wiaXNTaGFsbG93RXF1YWxcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJsb2Rhc2hcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJtb21lbnRcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmVuZG9yXCJdW1wibW9tZW50XCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
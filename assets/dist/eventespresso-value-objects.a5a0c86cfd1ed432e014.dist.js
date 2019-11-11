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
   * @type {string}
   */

  /**
   * The singular label for the currency (eg. 'Dollar');
   * @type {string}
   */

  /**
   * The plural label for the currency (eg. 'Dollars');
   * @type {string}
   */

  /**
   * The currency symbol (eg. '$');
   * @type {string}
   */

  /**
   * Whether the currency symbol is displayed before or after the value.
   * @type {boolean}
   */

  /**
   * The precision for the value (eg. 10.02 is 2, 10.123 is 3). The number of
   * decimal places can be used to calculate the number of subunits for the
   * currency - subunits = pow( 10, decimalPlaces).
   * @type {number}
   */

  /**
   * The symbol used for the decimal mark (eg. '.')
   * @type {string}
   */

  /**
   * The symbol used to split up thousands in the value (eg. ',')
   * @type {string}
   */

  /**
   * The number of fractional divisions of a currency's main unit.  If not
   * provided, then it is automatically calculated from the decimalPlaces
   * value.
   * @type {number}
   */

  /**
   * Constructor
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
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_8__);
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
 * @type {
 * 	{
 * 		datetime: Symbol
 * 	}
 * }
 */

var privateProperties = {
  datetime: Symbol('DateTimePropertyDateTime')
};
/**
 * A collection of symbols used for "private" methods in the DateTime object.
 *
 * @type {
 * {
 * 	getUnitNames: Symbol,
 * 	createGettersAndSetters: Symbol,
 * 	extractMomentsFromDateTimes: Symbol,
 * 	normalizeUnitName: Symbol,
 * 	normalizeUnitObject: Symbol,
 * 	normalizeUnitValue: Symbol,
 * 	}
 * }
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
      this[privateProperties.datetime] = iso8601DateString === '' ? moment_timezone__WEBPACK_IMPORTED_MODULE_5___default.a.utc().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_5___default()(iso8601DateString).utcOffset(iso8601DateString).locale(locale);
    } else if (timezone === this.constructor.TIMEZONE_LOCAL) {
      this[privateProperties.datetime] = iso8601DateString === '' ? moment_timezone__WEBPACK_IMPORTED_MODULE_5___default()().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_5___default()(iso8601DateString).locale(locale);
    } else {
      this.constructor.assertTimezoneIsValid(timezone);
      this[privateProperties.datetime] = iso8601DateString === '' ? moment_timezone__WEBPACK_IMPORTED_MODULE_5___default()().tz(timezone).locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_5___default.a.tz(iso8601DateString, timezone).locale(locale);
    }

    this[privateMethods.createGettersAndSetters]();
    Object.freeze(this);
  }
  /**
   * Indicates if the given locale is a valid locale.
   * @param {string} locale
   * @return {boolean} true means it is valid
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(DateTime, [{
    key: privateMethods.getUnitNames,

    /**
     * Returns the date and time unit names
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

        Object.defineProperty(_this, 'set' + Object(lodash__WEBPACK_IMPORTED_MODULE_6__["capitalize"])(unitName), {
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
      return new _duration__WEBPACK_IMPORTED_MODULE_10__["default"](moment_timezone__WEBPACK_IMPORTED_MODULE_5___default.a.duration(this[privateProperties.datetime].diff(otherDateTime[privateProperties.datetime])));
    }
    /**
     * Returns the difference between this DateTime and "now" as a Duration.
     * @return {Duration} An instance of Duration representing the difference
     * between this DateTime and "now"
     */

  }, {
    key: "diffNow",
    value: function diffNow() {
      return new _duration__WEBPACK_IMPORTED_MODULE_10__["default"](moment_timezone__WEBPACK_IMPORTED_MODULE_5___default.a.duration(this[privateProperties.datetime].diff(moment_timezone__WEBPACK_IMPORTED_MODULE_5___default()())));
    }
    /**
     * Set the value of this DateTime to the end (i.e. the last millisecond) of
     * a unit of time.
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
     * @return {Object} An object with year, month, day, hour, minute, second,
     * and millisecond.
     */

  }, {
    key: "toObject",
    value: function toObject() {
      var _this3 = this;

      var datetime = this[privateProperties.datetime].toObject();
      return Object(lodash__WEBPACK_IMPORTED_MODULE_6__["reduce"])(datetime, function (result, value, key) {
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
     * @link https://en.wikipedia.org/wiki/ISO_week_date
     *
     * @return {number} The number of weeks in the ISO year.
     */

  }, {
    key: "isoWeeksInWeekYear",
    get: function get() {
      return this[privateProperties.datetime].isoWeeksInYear();
    }
    /**
     * Returns what the set locale is for this DateTime
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
     * @param {DateTime} datetime
     * @return {boolean} returns true if it is an instance of DateTime
     */

  }, {
    key: "validateIsDateTime",
    value: function validateIsDateTime(datetime) {
      return Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_7__["instanceOf"])(datetime, 'DateTime') || Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_7__["instanceOf"])(datetime, 'ServerDateTime');
    }
    /**
     * Asserts whether the provided value is an instance of DateTime
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
     * @param {DateTime} datetime
     * @throws InvalidDateTime
     */

  }, {
    key: "assertIsValid",
    value: function assertIsValid(datetime) {
      if (!this.isValid(datetime)) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_8__["InvalidDateTime"](datetime);
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
     * @param {...DateTime} datetimes
     * @return {Moment[]} An array of moment instances extracted from the
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
     * @param {...DateTime} datetimes
     * @return {DateTime|ServerDateTime} A new DateTime representing the latest point of time.
     */

  }, {
    key: "max",
    value: function max() {
      return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_5___default.a.max(this[privateMethods.extractMomentsFromDateTimes].apply(this, arguments)));
    }
    /**
     * Given an indefinite number of DateTimes as arguments, this will return a
     * new DateTime that represents the earliest point in time.
     * @param {...DateTime} datetimes
     * @return {DateTime|ServerDateTime} A new DateTime representing the earliest point in
     * time.
     */

  }, {
    key: "min",
    value: function min() {
      return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_5___default.a.min(this[privateMethods.extractMomentsFromDateTimes].apply(this, arguments)));
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
      if (!moment_timezone__WEBPACK_IMPORTED_MODULE_5___default.a.isMoment(momentInstance)) {
        throw new TypeError('Requires an instance of moment.');
      } // this would account for client code that is using `moment` but not
      // using `moment-timezone`.


      return Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isFunction"])(momentInstance.tz) && !Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isUndefined"])(momentInstance.tz()) && momentInstance.tz() !== 'UTC' ? _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(this[privateMethods.normalizeArguments](momentInstance.toISOString(), momentInstance.tz(), momentInstance.locale()))) : _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(this[privateMethods.normalizeArguments](momentInstance.toISOString(true), null, momentInstance.locale())));
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

      if (Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isEmpty"])(ISOString)) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_8__["InvalidISO8601String"](ISOString);
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
      var datetime = moment_timezone__WEBPACK_IMPORTED_MODULE_5___default.a.utc(ISOString).utcOffset(offset, true).locale(locale);
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
      return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_5___default()(date).tz(timezone).locale(locale));
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
      return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_5___default()(date).utcOffset(offset).locale(locale));
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

      if (!Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isNumber"])(milliseconds)) {
        throw new TypeError('Provided value must be a number ' + 'representing milliseconds from the epoch');
      }

      return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_5___default()(milliseconds).utc().locale(locale));
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

      if (!Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isNumber"])(seconds)) {
        throw new TypeError('Provided value must be a number ' + 'representing seconds from the epoch');
      }

      return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_5___default.a.unix(seconds).utc().locale(locale));
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
      var datetime = Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isEmpty"])(values) ? moment_timezone__WEBPACK_IMPORTED_MODULE_5___default()().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_5___default()(values).locale(locale);

      if (datetime.isValid() !== true) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_8__["InvalidArgument"]('Double-check the values you sent in.', values);
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
      var datetime = Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isEmpty"])(values) ? moment_timezone__WEBPACK_IMPORTED_MODULE_5___default.a.utc().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_5___default.a.utc(values).locale(locale);

      if (datetime.isValid() !== true) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_8__["InvalidArgument"]('Double-check the values sent in.', values);
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
      var offset = Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isUndefined"])(values.offset) ? null : values.offset;
      var valuesForConstruct = Object(lodash__WEBPACK_IMPORTED_MODULE_6__["omit"])(values, ['locale', 'timezone', 'offset']);
      this.assertLocaleIsValid(locale);

      if (offset !== null) {
        this.assertIsOffset(offset);
        valuesForConstruct = this[privateMethods.normalizeUnitObject](valuesForConstruct);

        var _datetime = Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isEmpty"])(valuesForConstruct) ? moment_timezone__WEBPACK_IMPORTED_MODULE_5___default()().utcOffset(offset, true).locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_5___default.a.utc(valuesForConstruct).utcOffset(offset, true).locale(locale);

        if (_datetime.isValid() !== true) {
          throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_8__["InvalidArgument"]('Double-check the configuration object sent in.', values);
        }

        return this.fromMoment(_datetime);
      }

      if (timezone === this.TIMEZONE_LOCAL) {
        return this.fromLocal(valuesForConstruct, locale);
      }

      this.assertTimezoneIsValid(timezone);
      valuesForConstruct = this[privateMethods.normalizeUnitObject](valuesForConstruct);
      var datetime = moment_timezone__WEBPACK_IMPORTED_MODULE_5___default.a.tz(valuesForConstruct, timezone).locale(locale);

      if (datetime.isValid() !== true) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_8__["InvalidArgument"]('Double-check the configuration object sent in.', values);
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

      if (!Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isObject"])(setObject)) {
        throw new TypeError('The incoming value must be an object');
      }

      return Object(lodash__WEBPACK_IMPORTED_MODULE_6__["reduce"])(setObject, function (result, value, key) {
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
/*! exports provided: Money, SiteCurrency, Currency, Label, DateTime, Duration, ServerDateTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _money__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./money */ "./assets/src/vo/money.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Money", function() { return _money__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _currency__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./currency */ "./assets/src/vo/currency.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SiteCurrency", function() { return _currency__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Currency", function() { return _currency__WEBPACK_IMPORTED_MODULE_1__["Currency"]; });

/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./label */ "./assets/src/vo/label.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Label", function() { return _label__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _date_time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date-time */ "./assets/src/vo/date-time/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DateTime", function() { return _date_time__WEBPACK_IMPORTED_MODULE_3__["DateTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Duration", function() { return _date_time__WEBPACK_IMPORTED_MODULE_3__["Duration"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ServerDateTime", function() { return _date_time__WEBPACK_IMPORTED_MODULE_3__["ServerDateTime"]; });






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
/* harmony import */ var decimal_js_light__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! decimal.js-light */ "./node_modules/decimal.js-light/decimal.js");
/* harmony import */ var decimal_js_light__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(decimal_js_light__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var accounting_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! accounting-js */ "./node_modules/accounting-js/dist/accounting.umd.js");
/* harmony import */ var accounting_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(accounting_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/is-shallow-equal */ "@wordpress/is-shallow-equal");
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_9__);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External imports
 */







/**
 * Asserts if incoming value is an instance of Money
 * @param {Money} money
 * @throws {TypeError}
 */

var assertMoney = function assertMoney(money) {
  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_8__["instanceOf"])(money, 'Money')) {
    throw new TypeError('Instance of Money required');
  }
};
/**
 * Asserts if incoming value is an instance of Currency
 * @param {Currency} currency
 * @throws {TypeError}
 */


var assertCurrency = function assertCurrency(currency) {
  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_8__["instanceOf"])(currency, 'Currency')) {
    throw new TypeError('Instance of Currency required');
  }
};
/**
 * Asserts if two currencies are shallow equal.
 * @param {Currency} currencyA
 * @param {Currency} currencyB
 * @throws {Exception}
 */


var assertSameCurrency = function assertSameCurrency(currencyA, currencyB) {
  assertCurrency(currencyA);
  assertCurrency(currencyB);

  if (!_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_5___default()(currencyA.toJSON(), currencyB.toJSON())) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_6__["Exception"]('Provided currencies are not equivalent.');
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
   * @type {Decimal}
   */

  /**
   * Internally the amount is stored as a Currency instance.
   * @type {Currency}
   */

  /**
   * Formatter object for money values.
   * @type {{}}
   */

  /**
   * Rounds away from zero
   * @type {number}
   */

  /**
   * Rounds towards zero
   * @type {number}
   */

  /**
   * Rounds towards infinity
   * @type {number}
   */

  /**
   * Rounds towards -Infinity
   * @type {number}
   */

  /**
   * Rounds towards nearest neighbour. If equidistant, rounds away from zero.
   * @type {number}
   */

  /**
   * Rounds towards nearest neighbour. If equidistant rounds towards zero.
   * @type {number}
   */

  /**
   * Rounds towards nearest neighbour. If equidistant, rounds towards even
   * neighbour.
   * @type {number}
   */

  /**
   * Class constructor
   * @param {number|string|Decimal} amount
   * @param {Currency} currency
   */
  function Money(amount, currency) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Money);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "amount", {});

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "currency", {});

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

      if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_8__["instanceOf"])(this.currency, 'Currency')) {
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
      var value = Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_8__["instanceOf"])(amount, 'Decimal') ? amount.toNumber() : amount; // if there's already an amount set, then return a new object.

      if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_8__["instanceOf"])(this.amount, 'Decimal')) {
        return new Money(new decimal_js_light__WEBPACK_IMPORTED_MODULE_3__["Decimal"](value), this.currency);
      }

      this.amount = new decimal_js_light__WEBPACK_IMPORTED_MODULE_3__["Decimal"](value);
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
      if (Object(lodash__WEBPACK_IMPORTED_MODULE_7__["isEmpty"])(this.formatter)) {
        this.formatter = _objectSpread({}, accounting_js__WEBPACK_IMPORTED_MODULE_4__);
        this.formatter.settings = _objectSpread({}, this.formatter.settings, {}, this.currency.toAccountingSettings().currency);
      }

      return this;
    }
    /**
     * Returns the value of this Money as its subunits.
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
      return _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_5___default()(this.currency.toJSON(), other.currency.toJSON());
    }
    /**
     * Add one Money object to this Money object
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
      var remainder = new decimal_js_light__WEBPACK_IMPORTED_MODULE_3__["Decimal"](self.toSubunits());
      var total = new decimal_js_light__WEBPACK_IMPORTED_MODULE_3__["Decimal"](0); // convert ratios to decimal and generate total.

      ratios.forEach(function (ratio) {
        convertedRatios.push(Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_8__["instanceOf"])(ratio, 'Decimal') ? ratio : new decimal_js_light__WEBPACK_IMPORTED_MODULE_3__["Decimal"](ratio));
        total = total.plus(ratio);
      });
      convertedRatios.forEach(function (ratio) {
        var share = new decimal_js_light__WEBPACK_IMPORTED_MODULE_3__["Decimal"](Math.floor(self.toSubunits() * ratio.toNumber() / total.toNumber()));
        results.push(new Money(share.dividedBy(_this.currency.subunits), _this.currency));
        remainder = remainder.minus(share);
      });

      for (var i = 0; remainder.greaterThan(0); i++) {
        results[i] = new Money(new decimal_js_light__WEBPACK_IMPORTED_MODULE_3__["Decimal"](results[i].toSubunits()).plus(1).dividedBy(this.currency.subunits), this.currency);
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
     * Compares whether this Money object is greater than the other Money object.
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
     * @return {boolean} If true then this is greater than or equal to the other.
     */

  }, {
    key: "greaterThanOrEqualTo",
    value: function greaterThanOrEqualTo(other) {
      Money.assertUsingSameCurrency(this, other);
      return this.amount.greaterThanOrEqualTo(other.amount);
    }
    /**
     * Compares whether this Money object is less than the other Money object.
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
     * @param {number} rounding What rounding type to use (0-8).  Use Money ROUND
     * constants.  Defaults to Money.ROUND_HALF_UP
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
     * @param {Money} money
     * @throws {TypeError}
     */

  }]);

  return Money;
}();

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "ROUND_UP", decimal_js_light__WEBPACK_IMPORTED_MODULE_3__["Decimal"].ROUND_UP);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "ROUND_DOWN", decimal_js_light__WEBPACK_IMPORTED_MODULE_3__["Decimal"].ROUND_DOWN);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "ROUND_CEIL", decimal_js_light__WEBPACK_IMPORTED_MODULE_3__["Decimal"].ROUND_CEIL);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "ROUND_FLOOR", decimal_js_light__WEBPACK_IMPORTED_MODULE_3__["Decimal"].ROUND_FLOOR);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "ROUND_HALF_UP", decimal_js_light__WEBPACK_IMPORTED_MODULE_3__["Decimal"].ROUND_HALF_UP);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "ROUND_HALF_DOWN", decimal_js_light__WEBPACK_IMPORTED_MODULE_3__["Decimal"].ROUND_HALF_DOWN);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Money, "ROUND_HALF_EVEN", decimal_js_light__WEBPACK_IMPORTED_MODULE_3__["Decimal"].ROUND_HALF_EVEN);

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
      var message = match[0].length === 1 ? Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_9__["sprintf"])('The provided money value has a %1$s sign in it, but the provided currency value object defines %2$s as the currency sign.', match[0], currency.sign) : Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_9__["sprintf"])('The provided money value has non numeric strings in it (%1$s), please double-check the value.', match[0]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9zcmMvdm8vY3VycmVuY3kuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL2RhdGUtdGltZS9hc3NlcnRpb25zLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL3NyYy92by9kYXRlLXRpbWUvZGF0ZXRpbWUuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL2RhdGUtdGltZS9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9zcmMvdm8vZGF0ZS10aW1lL2R1cmF0aW9uLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL3NyYy92by9kYXRlLXRpbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL2RhdGUtdGltZS9zZXJ2ZXItZGF0ZS10aW1lLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL3NyYy92by9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9zcmMvdm8vbGFiZWwuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL21vbmV5LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NvbnN0cnVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXQuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zdXBlclByb3BCYXNlLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvYWNjb3VudGluZy1qcy9kaXN0L2FjY291bnRpbmcudW1kLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL2RlY2ltYWwuanMtbGlnaHQvZGVjaW1hbC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9tb21lbnQtZHVyYXRpb24tZm9ybWF0L2xpYi9tb21lbnQtZHVyYXRpb24tZm9ybWF0LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvd2FybmluZy5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcImhlbHBlcnNcIl19Iiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJpMThuXCJdfSIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsaWRhdG9yc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJpc1NoYWxsb3dFcXVhbFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvZXh0ZXJuYWwge1widGhpc1wiOlwibG9kYXNoXCJ9Iiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHtcInRoaXNcIjpcIm1vbWVudFwifSIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmVuZG9yXCIsXCJtb21lbnRcIl19Il0sIm5hbWVzIjpbIkN1cnJlbmN5IiwiY3VycmVuY3lDb25maWciLCJ2YWxpZGF0ZUN1cnJlbmN5Q29uZmlnIiwiY29kZSIsInNpbmd1bGFyTGFiZWwiLCJwbHVyYWxMYWJlbCIsInNpZ24iLCJzaWduQjQiLCJpc1VuZGVmaW5lZCIsImRlY2ltYWxQbGFjZXMiLCJkZWNpbWFsTWFyayIsInRob3VzYW5kc1NlcGFyYXRvciIsInN1YnVuaXRzIiwiTWF0aCIsInBvdyIsIk9iamVjdCIsImZyZWV6ZSIsImRlY2ltYWxJbmZvIiwiZGVjaW1hbCIsInRob3VzYW5kIiwicHJlY2lzaW9uIiwiY3VycmVuY3kiLCJzeW1ib2wiLCJmb3JtYXQiLCJwb3MiLCJuZWciLCJ6ZXJvIiwibnVtYmVyIiwiY29uZmlnIiwiaXNFbXB0eSIsIkV4Y2VwdGlvbiIsImlzU3RyaW5nIiwiVHlwZUVycm9yIiwiaXNCb29sZWFuIiwiaXNOdW1iZXIiLCJTaXRlQ3VycmVuY3kiLCJlIiwid2FybmluZyIsIm1lc3NhZ2UiLCJDVVJSRU5DWV9DT05GSUciLCJ2YWxpZGF0ZUxvY2FsZSIsImxvY2FsZSIsIm9yaWdpbmFsTG9jYWxlIiwibW9tZW50IiwidmFsaWRhdGlvbkxvY2FsZSIsImFzc2VydExvY2FsZUlzVmFsaWQiLCJJbnZhbGlkTG9jYWxlIiwidmFsaWRhdGVJU084NjAxIiwiZGF0ZVRpbWVTdHJpbmciLCJpc0R1cmF0aW9uIiwicmVnZXgiLCJ0ZXN0IiwiYXNzZXJ0SVNPODYwMUlzVmFsaWQiLCJJbnZhbGlkSVNPODYwMVN0cmluZyIsInZhbGlkYXRlVGltZXpvbmUiLCJ0aW1lem9uZSIsImR0IiwidHoiLCJ6b25lIiwiYXNzZXJ0VGltZXpvbmVJc1ZhbGlkIiwiSW52YWxpZFRpbWV6b25lIiwidmFsaWRhdGVJc0RhdGUiLCJkYXRlIiwiRGF0ZSIsImFzc2VydElzRGF0ZSIsInZhbGlkYXRlSXNPZmZzZXQiLCJvZmZzZXQiLCJhc3NlcnRJc09mZnNldCIsInByaXZhdGVQcm9wZXJ0aWVzIiwiZGF0ZXRpbWUiLCJTeW1ib2wiLCJwcml2YXRlTWV0aG9kcyIsImdldFVuaXROYW1lcyIsImNyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzIiwiZXh0cmFjdE1vbWVudHNGcm9tRGF0ZVRpbWVzIiwibm9ybWFsaXplVW5pdE5hbWUiLCJub3JtYWxpemVVbml0T2JqZWN0Iiwibm9ybWFsaXplVW5pdFZhbHVlIiwibm9ybWFsaXplQXJndW1lbnRzIiwidmFsaWREYXRlVGltZVVuaXRzIiwiRGF0ZVRpbWUiLCJpc284NjAxRGF0ZVN0cmluZyIsIkRFRkFVTFRfVElNRVpPTkVfU1RSSU5HIiwiREVGQVVMVF9WQUxJRF9MT0NBTEUiLCJjb25zdHJ1Y3RvciIsInV0YyIsInV0Y09mZnNldCIsIlRJTUVaT05FX0xPQ0FMIiwiZm9yRWFjaCIsInVuaXROYW1lIiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJtZXRob2ROYW1lIiwidW5pdFZhbHVlIiwiY2FwaXRhbGl6ZSIsInZhbHVlIiwic2V0Iiwic2V0T2JqZWN0IiwiaW5zdGFuY2VBcmd1bWVudHMiLCJjbG9uZSIsInRvSVNPU3RyaW5nIiwiZnJvbU1vbWVudCIsImlzVmFsaWQiLCJvdGhlckRhdGVUaW1lIiwiYXNzZXJ0SXNEYXRlVGltZSIsIkR1cmF0aW9uIiwiZHVyYXRpb24iLCJkaWZmIiwidW5pdCIsImVuZE9mIiwiaXNTYW1lIiwiYXNzZXJ0SXNWYWxpZER1cmF0aW9uIiwic3VidHJhY3QiLCJ0b09iamVjdCIsImFkZCIsInN0YXJ0T2YiLCJERUZBVUxUX0ZPUk1BVCIsImluVVRDIiwidG9EYXRlIiwibG9jYWwiLCJ2YWx1ZU9mIiwicmVkdWNlIiwicmVzdWx0Iiwia2V5IiwidG9TdHJpbmciLCJkYXlzSW5Nb250aCIsImlzRFNUIiwiaXNMZWFwWWVhciIsImRheU9mWWVhciIsInF1YXJ0ZXIiLCJpc29XZWVrIiwiaXNvV2Vla1llYXIiLCJpc29XZWVrZGF5IiwiaXNvV2Vla3NJblllYXIiLCJhc3NlcnRpb25zIiwiaW5zdGFuY2VPZiIsInZhbGlkYXRlSXNEYXRlVGltZSIsIkludmFsaWREYXRlVGltZSIsImRhdGVWYWx1ZSIsIm5hbWUiLCJkYXRldGltZXMiLCJtYXAiLCJtYXgiLCJtaW4iLCJtb21lbnRJbnN0YW5jZSIsImlzTW9tZW50IiwiaXNGdW5jdGlvbiIsIklTT1N0cmluZyIsIkRFRkFVTFRfT0ZGU0VUIiwibWlsbGlzZWNvbmRzIiwic2Vjb25kcyIsInVuaXgiLCJ2YWx1ZXMiLCJJbnZhbGlkQXJndW1lbnQiLCJ2YWx1ZXNGb3JDb25zdHJ1Y3QiLCJvbWl0IiwiZnJvbUxvY2FsIiwibmFtZVRvTm9ybWFsaXplIiwiZGF5IiwiZGF5cyIsInllYXJzIiwibW9udGhzIiwibWludXRlcyIsImhvdXJzIiwiaXNPYmplY3QiLCJVTklUX1lFQVIiLCJVTklUX01PTlRIIiwiVU5JVF9EQVkiLCJVTklUX0hPVVIiLCJVTklUX01JTlVURSIsIlVOSVRfU0VDT05EIiwiVU5JVF9NSUxMSVNFQ09ORCIsIlRJTUVaT05FX0NPTkZJRyIsInN0cmluZyIsIkhBU19USU1FWk9ORV9TVFJJTkciLCJGT1JNQVRfU0lURV9EQVRFIiwiRk9STUFUX1NJVEVfVElNRSIsIkRFRkFVTFRfTE9DQUxFIiwic25ha2VDYXNlIiwiU0VSVkVSX0xPQ0FMRSIsInVzZXIiLCJtb21lbnREdXJhdGlvbkZvcm1hdFNldHVwIiwiZHVyYXRpb25WYWx1ZXMiLCJjcmVhdGVHZXR0ZXJzIiwiZ2V0QWxsVW5pdE5hbWVzIiwicG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb24iLCJzZXRWYWx1ZXMiLCJmaWx0ZXJWYWx1ZXMiLCJ1bml0TmFtZXMiLCJkZXJpdmF0aXZlVW5pdE5hbWVzIiwidmFsdWVzVG9TZXQiLCJwaWNrIiwiaXNTaGFsbG93RXF1YWwiLCJrZXlzIiwiam9pbiIsImFjY2Vzc29yTmFtZSIsImluZGV4T2YiLCJhc01ldGhvZE5hbWUiLCJvdGhlckR1cmF0aW9uIiwiYXNzZXJ0SXNEdXJhdGlvbiIsIm5vcm1hbGl6ZSIsIm1hcFZhbHVlcyIsInRvSlNPTiIsInRvSVNPIiwiYXNNaWxsaXNlY29uZHMiLCJpc29TdHJpbmciLCJpc1ZhbGlkRHVyYXRpb24iLCJTZXJ2ZXJEYXRlVGltZSIsIkxhYmVsIiwic2luZ3VsYXIiLCJwbHVyYWwiLCJzZXRTaW5ndWxhciIsInNldFBsdXJhbCIsImFzc2VydFN0cmluZyIsInN0YXJ0Q2FzZSIsInRvTG93ZXJDYXNlIiwidG9VcHBlckNhc2UiLCJmb3JtYXRUeXBlIiwiRk9STUFUX1NFTlRFTkNFX0NBU0UiLCJhc1NlbnRlbmNlQ2FzZSIsIkZPUk1BVF9MT1dFUkNBU0UiLCJhc0xvd2VyQ2FzZSIsIkZPUk1BVF9VUFBFUkNBU0UiLCJhc1VwcGVyQ2FzZSIsImxhYmVsIiwiYXNzZXJ0TW9uZXkiLCJtb25leSIsImFzc2VydEN1cnJlbmN5IiwiYXNzZXJ0U2FtZUN1cnJlbmN5IiwiY3VycmVuY3lBIiwiY3VycmVuY3lCIiwiTW9uZXkiLCJhbW91bnQiLCJzZXRDdXJyZW5jeSIsInNldEFtb3VudCIsInNldEZvcm1hdHRlciIsInRvTnVtYmVyIiwiRGVjaW1hbCIsImZvcm1hdHRlciIsIkFjY291bnRpbmciLCJzZXR0aW5ncyIsInRvQWNjb3VudGluZ1NldHRpbmdzIiwib3RoZXIiLCJlcXVhbHMiLCJoYXNTYW1lQ3VycmVuY3kiLCJhc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSIsInBsdXMiLCJtaW51cyIsIm11bHRpcGxpZXIiLCJ0aW1lcyIsImRpdmlzb3IiLCJkaXZpZGVkQnkiLCJyYXRpb3MiLCJzZWxmIiwicmVzdWx0cyIsImNvbnZlcnRlZFJhdGlvcyIsInJlbWFpbmRlciIsInRvU3VidW5pdHMiLCJ0b3RhbCIsInJhdGlvIiwicHVzaCIsInNoYXJlIiwiZmxvb3IiLCJpIiwiZ3JlYXRlclRoYW4iLCJjb21wYXJlZFRvIiwiZ3JlYXRlclRoYW5PckVxdWFsVG8iLCJsZXNzVGhhbiIsImxlc3NUaGFuT3JFcXVhbFRvIiwiaXNaZXJvIiwiaXNOZWdhdGl2ZSIsImlzUG9zaXRpdmUiLCJyb3VuZGluZyIsIlJPVU5EX0hBTEZfVVAiLCJ0b0ZpeGVkIiwidG9JbnRlZ2VyIiwiUk9VTkRfVVAiLCJST1VORF9ET1dOIiwiUk9VTkRfQ0VJTCIsIlJPVU5EX0ZMT09SIiwiUk9VTkRfSEFMRl9ET1dOIiwiUk9VTkRfSEFMRl9FVkVOIiwidGhpc01vbmV5Iiwib3RoZXJNb25leSIsIm1vbmV5VmFsdWUiLCJtYXRjaCIsImxlbmd0aCIsInNwcmludGYiLCJFcnJvciIsInBhcnNlIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGFBQWE7O0FBRTlCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxzQkFBc0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxlQUFlO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFlBQVksYUFBYTs7QUFFekI7QUFDQSxzQkFBc0IsU0FBUztBQUMvQjs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLEtBQUs7O0FBRXJCO0FBQ0EsaUJBQWlCLFVBQVU7QUFDM0I7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxVQUFVOztBQUVwQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzQkFBc0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLHFDQUFxQztBQUNyQzs7QUFFQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FB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O0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLFNBQVM7QUFDbkI7QUFDQTs7O0FBR0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLFVBQVUsS0FBSztBQUNmO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNB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Q0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsYUFBYSxpQ0FBaUM7QUFDOUMsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUMscUJBQXFCO0FBQzlEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELG9CQUFvQjtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxjQUFjO0FBQzNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN4c0REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxhQUFvQjs7QUFFbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsV0FBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsV0FBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDN0RBLGFBQWEsK0JBQStCLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBOUMsYUFBYSwwQ0FBMEMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F6RCxhQUFhLHVDQUF1QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXRELGFBQWEsNkNBQTZDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBNUQsYUFBYSwrQ0FBK0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E5RCxhQUFhLGlDQUFpQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQWhELGFBQWEsaUNBQWlDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBaEQsYUFBYSxtREFBbUQsRUFBRSxJIiwiZmlsZSI6ImV2ZW50ZXNwcmVzc28tdmFsdWUtb2JqZWN0cy5hNWEwYzg2Y2ZkMWVkNDMyZTAxNC5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvc3JjL3ZvL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGlzRW1wdHksXG5cdGlzU3RyaW5nLFxuXHRpc051bWJlcixcblx0aXNCb29sZWFuLFxuXHRpc1VuZGVmaW5lZCxcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEV4Y2VwdGlvbiwgQ1VSUkVOQ1lfQ09ORklHIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcblxuLyoqXG4gKiBBIHZhbHVlIG9iamVjdCByZXByZXNlbnRpbmcgY3VycmVuY3kgdmFsdWVzXG4gKi9cbmV4cG9ydCBjbGFzcyBDdXJyZW5jeSB7XG5cdC8qKlxuXHQgKiBUaGUgSVNPIDQyMTcgY29kZSBpZGVudGlmeWluZyB0aGUgY3VycmVuY3kgKGVnLiAnVVNEJylcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGNvZGUgPSAnJztcblxuXHQvKipcblx0ICogVGhlIHNpbmd1bGFyIGxhYmVsIGZvciB0aGUgY3VycmVuY3kgKGVnLiAnRG9sbGFyJyk7XG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRzaW5ndWxhckxhYmVsID0gJyc7XG5cblx0LyoqXG5cdCAqIFRoZSBwbHVyYWwgbGFiZWwgZm9yIHRoZSBjdXJyZW5jeSAoZWcuICdEb2xsYXJzJyk7XG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRwbHVyYWxMYWJlbCA9ICcnO1xuXG5cdC8qKlxuXHQgKiBUaGUgY3VycmVuY3kgc3ltYm9sIChlZy4gJyQnKTtcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHNpZ24gPSAnJztcblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgY3VycmVuY3kgc3ltYm9sIGlzIGRpc3BsYXllZCBiZWZvcmUgb3IgYWZ0ZXIgdGhlIHZhbHVlLlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHNpZ25CNCA9IHRydWU7XG5cblx0LyoqXG5cdCAqIFRoZSBwcmVjaXNpb24gZm9yIHRoZSB2YWx1ZSAoZWcuIDEwLjAyIGlzIDIsIDEwLjEyMyBpcyAzKS4gVGhlIG51bWJlciBvZlxuXHQgKiBkZWNpbWFsIHBsYWNlcyBjYW4gYmUgdXNlZCB0byBjYWxjdWxhdGUgdGhlIG51bWJlciBvZiBzdWJ1bml0cyBmb3IgdGhlXG5cdCAqIGN1cnJlbmN5IC0gc3VidW5pdHMgPSBwb3coIDEwLCBkZWNpbWFsUGxhY2VzKS5cblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdGRlY2ltYWxQbGFjZXMgPSAyO1xuXG5cdC8qKlxuXHQgKiBUaGUgc3ltYm9sIHVzZWQgZm9yIHRoZSBkZWNpbWFsIG1hcmsgKGVnLiAnLicpXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRkZWNpbWFsTWFyayA9ICcuJztcblxuXHQvKipcblx0ICogVGhlIHN5bWJvbCB1c2VkIHRvIHNwbGl0IHVwIHRob3VzYW5kcyBpbiB0aGUgdmFsdWUgKGVnLiAnLCcpXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHR0aG91c2FuZHNTZXBhcmF0b3IgPSAnLCc7XG5cblx0LyoqXG5cdCAqIFRoZSBudW1iZXIgb2YgZnJhY3Rpb25hbCBkaXZpc2lvbnMgb2YgYSBjdXJyZW5jeSdzIG1haW4gdW5pdC4gIElmIG5vdFxuXHQgKiBwcm92aWRlZCwgdGhlbiBpdCBpcyBhdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZWQgZnJvbSB0aGUgZGVjaW1hbFBsYWNlc1xuXHQgKiB2YWx1ZS5cblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN1YnVuaXRzID0gMTAwO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge3t9fSBjdXJyZW5jeUNvbmZpZyBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgY29uZmlndXJhdGlvbiBmb3Jcblx0ICogdGhpcyBjdXJyZW5jeSB2YWx1ZSBvYmplY3QuICBPbiBjb25zdHJ1Y3Rpb24sIHRoZSBDdXJyZW5jeSBvYmplY3QgaXNcblx0ICogZnJvemVuIHNvIHRoYXQgaXQgYmVjb21lcyBpbW11dGFibGUuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciggY3VycmVuY3lDb25maWcgKSB7XG5cdFx0Q3VycmVuY3kudmFsaWRhdGVDdXJyZW5jeUNvbmZpZyggY3VycmVuY3lDb25maWcgKTtcblx0XHR0aGlzLmNvZGUgPSBjdXJyZW5jeUNvbmZpZy5jb2RlO1xuXHRcdHRoaXMuc2luZ3VsYXJMYWJlbCA9IGN1cnJlbmN5Q29uZmlnLnNpbmd1bGFyTGFiZWwgfHwgJyc7XG5cdFx0dGhpcy5wbHVyYWxMYWJlbCA9IGN1cnJlbmN5Q29uZmlnLnBsdXJhbExhYmVsIHx8ICcnO1xuXHRcdHRoaXMuc2lnbiA9IGN1cnJlbmN5Q29uZmlnLnNpZ247XG5cdFx0dGhpcy5zaWduQjQgPSBpc1VuZGVmaW5lZCggY3VycmVuY3lDb25maWcuc2lnbkI0ICkgP1xuXHRcdFx0dGhpcy5zaWduQjQgOlxuXHRcdFx0Y3VycmVuY3lDb25maWcuc2lnbkI0O1xuXHRcdHRoaXMuZGVjaW1hbFBsYWNlcyA9IGlzVW5kZWZpbmVkKCBjdXJyZW5jeUNvbmZpZy5kZWNpbWFsUGxhY2VzICkgP1xuXHRcdFx0dGhpcy5kZWNpbWFsUGxhY2VzIDpcblx0XHRcdGN1cnJlbmN5Q29uZmlnLmRlY2ltYWxQbGFjZXM7XG5cdFx0dGhpcy5kZWNpbWFsTWFyayA9IGN1cnJlbmN5Q29uZmlnLmRlY2ltYWxNYXJrIHx8IHRoaXMuZGVjaW1hbE1hcms7XG5cdFx0dGhpcy50aG91c2FuZHNTZXBhcmF0b3IgPSBjdXJyZW5jeUNvbmZpZy50aG91c2FuZHNTZXBhcmF0b3IgfHwgdGhpcy50aG91c2FuZHNTZXBhcmF0b3I7XG5cdFx0dGhpcy5zdWJ1bml0cyA9IGN1cnJlbmN5Q29uZmlnLnN1YnVuaXRzIHx8XG5cdFx0XHRNYXRoLnBvdyggMTAsIHRoaXMuZGVjaW1hbFBsYWNlcyApO1xuXHRcdE9iamVjdC5mcmVlemUoIHRoaXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBjdXJyZW5jeSBwcm9wZXJ0aWVzIGFzIGFuIG9iamVjdCBmb3JtYXR0ZWQgZm9yIHRoZVxuXHQgKiBhY2NvdW50aW5nLWpzIGxpYnJhcnkgY29uZmlndXJhdGlvbi5cblx0ICogQHJldHVybiB7e319ICBBbiBvYmplY3Qgc2hhcGVkIGZvciB3aGF0IHRoZSBhY2NvdW50aW5nLWpzIGxpYnJhcnkgZXhwZWN0c1xuXHQgKi9cblx0dG9BY2NvdW50aW5nU2V0dGluZ3MoKSB7XG5cdFx0Y29uc3QgZGVjaW1hbEluZm8gPSB7XG5cdFx0XHRkZWNpbWFsOiB0aGlzLmRlY2ltYWxNYXJrLFxuXHRcdFx0dGhvdXNhbmQ6IHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yLFxuXHRcdFx0cHJlY2lzaW9uOiB0aGlzLmRlY2ltYWxQbGFjZXMsXG5cdFx0fTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y3VycmVuY3k6IHtcblx0XHRcdFx0c3ltYm9sOiB0aGlzLnNpZ24sXG5cdFx0XHRcdGZvcm1hdDoge1xuXHRcdFx0XHRcdHBvczogdGhpcy5zaWduQjQgPyAnJXMldicgOiAnJXYlcycsXG5cdFx0XHRcdFx0bmVnOiB0aGlzLnNpZ25CNCA/ICctICRzJXYnIDogJy0gJXYlcycsXG5cdFx0XHRcdFx0emVybzogdGhpcy5zaWduQjQgPyAnJXMldicgOiAnJXYlcycsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdC4uLmRlY2ltYWxJbmZvLFxuXHRcdFx0fSxcblx0XHRcdG51bWJlcjogZGVjaW1hbEluZm8sXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhpcyBvYmplY3QuXG5cdCAqIEByZXR1cm4ge09iamVjdH0gRnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBvYmplY3QgdG8gYmUgc2VyaWFsaXplZCBieVxuXHQgKiBKU09OLnN0cmluZ2lmeVxuXHQgKi9cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb2RlOiB0aGlzLmNvZGUsXG5cdFx0XHRzaW5ndWxhckxhYmVsOiB0aGlzLnNpbmd1bGFyTGFiZWwsXG5cdFx0XHRwbHVyYWxMYWJlbDogdGhpcy5wbHVyYWxMYWJlbCxcblx0XHRcdHNpZ246IHRoaXMuc2lnbixcblx0XHRcdHNpZ25CNDogdGhpcy5zaWduQjQsXG5cdFx0XHRkZWNpbWFsTWFyazogdGhpcy5kZWNpbWFsTWFyayxcblx0XHRcdHRob3VzYW5kc1NlcGFyYXRvcjogdGhpcy50aG91c2FuZHNTZXBhcmF0b3IsXG5cdFx0XHRzdWJ1bml0czogdGhpcy5zdWJ1bml0cyxcblx0XHRcdGRlY2ltYWxQbGFjZXM6IHRoaXMuZGVjaW1hbFBsYWNlcyxcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgdmFsaWRhdGVzIHdoZXRoZXIgdGhlIHBhc3NlZCBpbiBjb25maWcgaGFzIHRoZSByZXF1aXJlZCBwcm9wZXJ0aWVzXG5cdCAqIChhbmQgY29ycmVjdCB0eXBlcykgZm9yIGNvbnN0cnVjdGluZyBhIEN1cnJlbmN5IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHt7fX0gY29uZmlnXG5cdCAqIEB0aHJvd3Mge0V4Y2VwdGlvbn1cblx0ICogQHRocm93cyB7VHlwZUVycm9yfVxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlQ3VycmVuY3lDb25maWcgPSAoIGNvbmZpZyApID0+IHtcblx0XHRpZiAoIGlzRW1wdHkoIGNvbmZpZyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbihcblx0XHRcdFx0J1RoZSBjb25maWd1cmF0aW9uIG9iamVjdCBwcm92aWRlZCB0byBDdXJyZW5jeSBtdXN0IG5vdCcgK1xuXHRcdFx0XHQnIGJlIGVtcHR5J1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKCAhIGNvbmZpZy5jb2RlIHx8ICEgaXNTdHJpbmcoIGNvbmZpZy5jb2RlICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHByb3ZpZGVkIHRvIEN1cnJlbmN5IG11c3QgaGF2ZSAnICtcblx0XHRcdFx0J2EgXCJjb2RlXCIgcHJvcGVydHkgdGhhdCBpcyBhIHN0cmluZy4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggISBjb25maWcuc2lnbiB8fCAhIGlzU3RyaW5nKCBjb25maWcuc2lnbiApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBjb25maWd1cmF0aW9uIG9iamVjdCBwcm92aWRlZCB0byBDdXJyZW5jeSBtdXN0IGhhdmUgYSAnICtcblx0XHRcdFx0J1wic2lnblwiIHByb3BlcnR5IHRoYXQgaXMgYSBzdHJpbmcuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5zaW5ndWxhckxhYmVsICYmICEgaXNTdHJpbmcoIGNvbmZpZy5zaW5ndWxhckxhYmVsICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHNpbmd1bGFyTGFiZWwgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIHN0cmluZyBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5wbHVyYWxMYWJlbCAmJiAhIGlzU3RyaW5nKCBjb25maWcucGx1cmFsTGFiZWwgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgcGx1cmFsTGFiZWwgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIHN0cmluZyBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5zaWduQjQgJiYgISBpc0Jvb2xlYW4oIGNvbmZpZy5zaWduQjQgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgc2lnbkI0IHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBib29sZWFuIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLmRlY2ltYWxQbGFjZXMgJiYgISBpc051bWJlciggY29uZmlnLmRlY2ltYWxQbGFjZXMgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgZGVjaW1hbFBsYWNlcyBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgbnVtYmVyIHByaW1pdGl2ZSdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcuZGVjaW1hbE1hcmsgJiYgISBpc1N0cmluZyggY29uZmlnLmRlY2ltYWxNYXJrICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGRlY2ltYWxNYXJrIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBzdHJpbmcgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcudGhvdXNhbmRzU2VwYXJhdG9yICYmXG5cdFx0XHQhIGlzU3RyaW5nKCBjb25maWcudGhvdXNhbmRzU2VwYXJhdG9yICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHRob3VzYW5kc1NlcGFyYXRvciBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgc3RyaW5nIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLnN1YnVuaXRzICYmICEgaXNOdW1iZXIoIGNvbmZpZy5zdWJ1bml0cyApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBzdWJ1bml0cyBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgbnVtYmVyIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEV4cG9ydCBvZiBhIEN1cnJlbmN5IFZhbHVlIG9iamVjdCBjcmVhdGVkIGZyb20gYSBjdXJyZW5jeSBjb25maWcgcHJvdmlkZWQuXG4gKiBUaGlzIGNhdGNoZXMgYW55IGV4Y2VwdGlvbiBhbmQgdHJpZ2dlcnMgYSBjb25zb2xlIGVycm9yLlxuICpcbiAqIEBwYXJhbSB7e319IGNvbmZpZ1xuICogQHJldHVybiB7Q3VycmVuY3l8e319IElmIHRoZXJlJ3MgYSBwcm9ibGVtIGNvbnN0cnVjdGluZyB0aGUgY3VycmVuY3kgb2JqZWN0XG4gKiBhbiBlbXB0eSBvYmplY3QgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBTaXRlQ3VycmVuY3kgPSAoIGNvbmZpZyA9IHt9ICkgPT4ge1xuXHRsZXQgY3VycmVuY3k7XG5cdHRyeSB7XG5cdFx0Y3VycmVuY3kgPSBuZXcgQ3VycmVuY3koIGNvbmZpZyApO1xuXHR9IGNhdGNoICggZSApIHtcblx0XHRjdXJyZW5jeSA9IHt9O1xuXHRcdHdhcm5pbmcoXG5cdFx0XHRmYWxzZSxcblx0XHRcdCdUaGUgU2l0ZSBDdXJyZW5jeSBvYmplY3QgY291bGQgbm90IGJlIGNyZWF0ZWQgYmVjYXVzZSAnICtcblx0XHRcdCdvZiB0aGlzIGVycm9yOiAnICsgZS5tZXNzYWdlXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gY3VycmVuY3k7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaXRlQ3VycmVuY3koIENVUlJFTkNZX0NPTkZJRyApO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCB7IGlzU3RyaW5nLCBpc051bWJlciB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRJbnZhbGlkVGltZXpvbmUsXG5cdEludmFsaWRJU084NjAxU3RyaW5nLFxuXHRJbnZhbGlkTG9jYWxlLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gbG9jYWxlIHN0cmluZyBpcyBhIHZhbGlkIGxvY2FsZS5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGxvY2FsZVxuICogQHJldHVybiB7Ym9vbGVhbn0gSWYgZ2l2ZW4gbG9jYWxlIHN0cmluZyBpcyBub3QgdmFsaWQgdGhpcyB3aWxsIHJldHVybiBmYWxzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlTG9jYWxlKCBsb2NhbGUgKSB7XG5cdGlmICggISBpc1N0cmluZyggbG9jYWxlICkgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IG9yaWdpbmFsTG9jYWxlID0gbW9tZW50LmxvY2FsZSgpO1xuXHRjb25zdCB2YWxpZGF0aW9uTG9jYWxlID0gbW9tZW50LmxvY2FsZSggbG9jYWxlICk7XG5cdC8vIHJlc2V0IGJhY2sgdG8gb3JpZ2luYWwgbG9jYWxlXG5cdG1vbWVudC5sb2NhbGUoIG9yaWdpbmFsTG9jYWxlICk7XG5cdHJldHVybiAhICggbG9jYWxlICE9PSAnZW4nICYmIHZhbGlkYXRpb25Mb2NhbGUgPT09ICdlbicgKTtcbn1cblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgZ2l2ZW4gbG9jYWxlIHN0cmluZyBpcyB2YWxpZC4gIElmIGl0J3Mgbm90IGFuIGV4Y2VwdGlvbiBpc1xuICogdGhyb3duLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcbiAqIEB0aHJvd3MgSW52YWxpZExvY2FsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICkge1xuXHRpZiAoICEgdmFsaWRhdGVMb2NhbGUoIGxvY2FsZSApICkge1xuXHRcdHRocm93IG5ldyBJbnZhbGlkTG9jYWxlKCBsb2NhbGUgKTtcblx0fVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCBJU084NjAxIGZvcm1hdHRlZCBkYXRlIGFuZFxuICogdGltZSBzdHJpbmcuXG4gKlxuICogTm90ZTogZGF0ZSByZWdleCBwYXR0ZXJuIGZyb21cbiAqIGh0dHA6Ly93d3cucGVsYWdvZGVzaWduLmNvbS9ibG9nLzIwMDkvMDUvMjAvaXNvLTg2MDEtZGF0ZS12YWxpZGF0aW9uLXRoYXQtZG9lc250LXN1Y2svXG4gKiBOb3RlOiBpc0R1cmF0aW9uIHJlZ2V4IHBhdHRlcm4gZnJvbVxuICogaHR0cHM6Ly9naXRodWIuY29tL2N5bGMvY3lsYy9pc3N1ZXMvMTE5I2lzc3VlY29tbWVudC05NDM1NTMzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUaW1lU3RyaW5nXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzRHVyYXRpb24gIFdoZXRoZXIgdG8gdmFsaWRhdGUgZm9yIGEgZHVyYXRpb24gZm9ybWF0IG9yIG5vdC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBSZXR1cm5zIGZhbHNlIGlmIHRoZSBnaXZlbiBzdHJpbmcgaXMgbm90IHZhbGlkIElTTzg2MDFcbiAqIGZvcm1hdFxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVJU084NjAxKCBkYXRlVGltZVN0cmluZywgaXNEdXJhdGlvbiA9IGZhbHNlICkge1xuXHRpZiAoICEgaXNTdHJpbmcoIGRhdGVUaW1lU3RyaW5nICkgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IHJlZ2V4ID0gaXNEdXJhdGlvbiA/XG5cdFx0L14oUlxcZCpcXC8pP1AoPzpcXGQrKD86XFwuXFxkKyk/WSk/KD86XFxkKyg/OlxcLlxcZCspP00pPyg/OlxcZCsoPzpcXC5cXGQrKT9XKT8oPzpcXGQrKD86XFwuXFxkKyk/RCk/KD86VCg/OlxcZCsoPzpcXC5cXGQrKT9IKT8oPzpcXGQrKD86XFwuXFxkKyk/TSk/KD86XFxkKyg/OlxcLlxcZCspP1MpPyk/JC8gOlxuXHRcdC9eKFtcXCstXT9cXGR7NH0oPyFcXGR7Mn1cXGIpKSgoLT8pKCgwWzEtOV18MVswLTJdKShcXDMoWzEyXVxcZHwwWzEtOV18M1swMV0pKT98VyhbMC00XVxcZHw1WzAtMl0pKC0/WzEtN10pP3woMDBbMS05XXwwWzEtOV1cXGR8WzEyXVxcZHsyfXwzKFswLTVdXFxkfDZbMS02XSkpKShbVFxcc10oKChbMDFdXFxkfDJbMC0zXSkoKDo/KVswLTVdXFxkKT98MjRcXDo/MDApKFtcXC4sXVxcZCsoPyE6KSk/KT8oXFwxN1swLTVdXFxkKFtcXC4sXVxcZCspPyk/KFt6Wl18KFtcXCstXSkoWzAxXVxcZHwyWzAtM10pOj8oWzAtNV1cXGQpPyk/KT8pPyQvO1xuXHRyZXR1cm4gcmVnZXgudGVzdCggZGF0ZVRpbWVTdHJpbmcgKTtcbn1cblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIElTTzg2MDEgZm9ybWF0dGVkIGRhdGUgYW5kIHRpbWVcbiAqIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRpbWVTdHJpbmdcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEdXJhdGlvbiAgV2hldGhlciB0byBhc3NlcnQgZm9yIGEgZHVyYXRpb24gZm9ybWF0IG9yIG5vdC5cbiAqIEB0aHJvd3MgSW52YWxpZElTTzg2MDFTdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydElTTzg2MDFJc1ZhbGlkKCBkYXRlVGltZVN0cmluZywgaXNEdXJhdGlvbiA9IGZhbHNlICkge1xuXHRpZiAoICEgdmFsaWRhdGVJU084NjAxKCBkYXRlVGltZVN0cmluZywgaXNEdXJhdGlvbiApICkge1xuXHRcdHRocm93IG5ldyBJbnZhbGlkSVNPODYwMVN0cmluZyggZGF0ZVRpbWVTdHJpbmcgKTtcblx0fVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCB0aW1lem9uZSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRpbWV6b25lXG4gKiBAcmV0dXJuIHtib29sZWFufSBSZXR1cm5zIGZhbHNlIGlmIHRoZSBnaXZlbiBzdHJpbmcgaXMgbm90IGEgdmFsaWQgdGltZXpvbmVcbiAqIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVUaW1lem9uZSggdGltZXpvbmUgKSB7XG5cdGlmICggISBpc1N0cmluZyggdGltZXpvbmUgKSApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Y29uc3QgZHQgPSBtb21lbnQudHouem9uZSggdGltZXpvbmUgKTtcblx0cmV0dXJuIGR0ICE9PSBudWxsO1xufVxuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gc3RyaW5nIGlzIGEgdmFsaWQgdGltZXpvbmUgc3RyaW5nIGFuZCB0aHJvd3MgYW5cbiAqIGV4Y2VwdGlvbiBpZiBpdCBpc24ndC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcbiAqIEB0aHJvd3MgSW52YWxpZFRpbWV6b25lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRUaW1lem9uZUlzVmFsaWQoIHRpbWV6b25lICkge1xuXHRpZiAoICEgdmFsaWRhdGVUaW1lem9uZSggdGltZXpvbmUgKSApIHtcblx0XHR0aHJvdyBuZXcgSW52YWxpZFRpbWV6b25lKCB0aW1lem9uZSApO1xuXHR9XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIHRoZSBqYXZhc2NyaXB0IERhdGVcbiAqIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhlIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSXNEYXRlKCBkYXRlICkge1xuXHRyZXR1cm4gZGF0ZSBpbnN0YW5jZW9mIERhdGU7XG59XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0SXNEYXRlKCBkYXRlICkge1xuXHRpZiAoICEgdmFsaWRhdGVJc0RhdGUoIGRhdGUgKSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0J1RoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgRGF0ZSdcblx0XHQpO1xuXHR9XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgdmFsaWQgb2Zmc2V0XG4gKlxuICogQ3VycmVudGx5IHRoaXMganVzdCB2YWxpZGF0ZXMgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgbnVtYmVyLiBFdmVudHVhbGx5IGl0XG4gKiBtaWdodCBjaGVjayB1cHBlciBhbmQgbG93ZXIgbGltaXRzLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICB0cnVlIG1lYW5zIGl0cyB2YWxpZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSXNPZmZzZXQoIG9mZnNldCApIHtcblx0cmV0dXJuIGlzTnVtYmVyKCBvZmZzZXQgKTtcbn1cblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgdmFsaWQgb2Zmc2V0LlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcbiAqIEB0aHJvd3MgVHlwZUVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRJc09mZnNldCggb2Zmc2V0ICkge1xuXHRpZiAoICEgdmFsaWRhdGVJc09mZnNldCggb2Zmc2V0ICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdCdPZmZzZXQgaXMgZXhwZWN0ZWQgdG8gYmUgYSBudW1iZXInXG5cdFx0KTtcblx0fVxufVxuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCB7XG5cdGNhcGl0YWxpemUsXG5cdG9taXQsXG5cdGlzTnVtYmVyLFxuXHRpc0VtcHR5LFxuXHRyZWR1Y2UsXG5cdGlzT2JqZWN0LFxuXHRpc1VuZGVmaW5lZCxcblx0aXNGdW5jdGlvbixcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGluc3RhbmNlT2YgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdEludmFsaWREYXRlVGltZSxcblx0SW52YWxpZEFyZ3VtZW50LFxuXHRJbnZhbGlkSVNPODYwMVN0cmluZyxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgKiBhcyBhc3NlcnRpb25zIGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5pbXBvcnQgRHVyYXRpb24gZnJvbSAnLi9kdXJhdGlvbic7XG5pbXBvcnQge1xuXHRERUZBVUxUX1RJTUVaT05FX1NUUklORyxcblx0REVGQVVMVF9PRkZTRVQsXG5cdERFRkFVTFRfVkFMSURfTE9DQUxFLFxuXHRERUZBVUxUX0ZPUk1BVCxcbn0gZnJvbSAnLi9kZWZhdWx0cyc7XG5cbi8qKlxuICogQSBjb2xsZWN0aW9uIG9mIHN5bWJvbHMgdXNlZCBmb3IgXCJwcml2YXRlXCIgcHJvcGVydGllcyBpbiB0aGUgRGF0ZVRpbWUgb2JqZWN0LlxuICpcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGRhdGV0aW1lOiBTeW1ib2xcbiAqIFx0fVxuICogfVxuICovXG5jb25zdCBwcml2YXRlUHJvcGVydGllcyA9IHtcblx0ZGF0ZXRpbWU6IFN5bWJvbCggJ0RhdGVUaW1lUHJvcGVydHlEYXRlVGltZScgKSxcbn07XG5cbi8qKlxuICogQSBjb2xsZWN0aW9uIG9mIHN5bWJvbHMgdXNlZCBmb3IgXCJwcml2YXRlXCIgbWV0aG9kcyBpbiB0aGUgRGF0ZVRpbWUgb2JqZWN0LlxuICpcbiAqIEB0eXBlIHtcbiAqIHtcbiAqIFx0Z2V0VW5pdE5hbWVzOiBTeW1ib2wsXG4gKiBcdGNyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzOiBTeW1ib2wsXG4gKiBcdGV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lczogU3ltYm9sLFxuICogXHRub3JtYWxpemVVbml0TmFtZTogU3ltYm9sLFxuICogXHRub3JtYWxpemVVbml0T2JqZWN0OiBTeW1ib2wsXG4gKiBcdG5vcm1hbGl6ZVVuaXRWYWx1ZTogU3ltYm9sLFxuICogXHR9XG4gKiB9XG4gKi9cbmNvbnN0IHByaXZhdGVNZXRob2RzID0ge1xuXHRnZXRVbml0TmFtZXM6IFN5bWJvbCggJ0RhdGVUaW1lTWV0aG9kR2V0VW5pdE5hbWVzJyApLFxuXHRjcmVhdGVHZXR0ZXJzQW5kU2V0dGVyczogU3ltYm9sKCAnRGF0ZVRpbWVNZXRob2RDcmVhdGVHZXR0ZXJzQW5kU2V0dGVycycgKSxcblx0ZXh0cmFjdE1vbWVudHNGcm9tRGF0ZVRpbWVzOiBTeW1ib2woICdEYXRlVGltZU1ldGhvZEV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lcycgKSxcblx0bm9ybWFsaXplVW5pdE5hbWU6IFN5bWJvbCggJ0RhdGVUaW1lTWV0aG9kTm9ybWFsaXplVW5pdE5hbWUnICksXG5cdG5vcm1hbGl6ZVVuaXRPYmplY3Q6IFN5bWJvbCggJ0RhdGVUaW1lTWV0aG9kTm9ybWFsaXplVW5pdE9iamVjdCcgKSxcblx0bm9ybWFsaXplVW5pdFZhbHVlOiBTeW1ib2woICdEYXRlVGltZU1ldGhvZE5vcm1hbGl6ZVVuaXRWYWx1ZScgKSxcblx0bm9ybWFsaXplQXJndW1lbnRzOiBTeW1ib2woICdEYXRlVGltZU1ldGhvZE5vcm1hbGl6ZUFyZ3VtZW50cycgKSxcbn07XG5cbmNvbnN0IHZhbGlkRGF0ZVRpbWVVbml0cyA9IFtcblx0J3llYXInLFxuXHQnbW9udGgnLFxuXHQnZGF5Jyxcblx0J2hvdXInLFxuXHQnbWludXRlJyxcblx0J3NlY29uZCcsXG5cdCdtaWxsaXNlY29uZCcsXG5dO1xuXG4vKipcbiAqIFRoZSBEYXRlVGltZSB2YWx1ZSBvYmplY3QgcmVwcmVzZW50cyBhIHNpbmdsZSBwb2ludCBpbiB0aW1lLlxuICpcbiAqIEludGVybmFsbHksIHRoZSBEYXRlVGltZSBjbGFzcyBoZXJlIHVzZXMgYG1vbWVudGAuICBUaGlzIGlzIGFuIGFic3RyYWN0aW9uXG4gKiBsb29zZWx5IGZvbGxvd2luZyB0aGUgYWRhcHRlciBwYXR0ZXJuIHNvIHRoYXQgdGhlcmUgaXMgYSBjb21tb24gYXBpIHRoYXRcbiAqIGNhbiBiZSBkZXBlbmRlZCBvbiBpZiBpbiB0aGUgZnV0dXJlIHRoZSBpbnRlcm5hbCBsaWJyYXJ5IGlzIHN3aXRjaGVkIHRvXG4gKiBzb21ldGhpbmcgZGlmZmVyZW50IChzdWNoIGFzIEx1eG9uKS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZVRpbWUge1xuXHQvKipcblx0ICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgRGF0ZVRpbWUgY2xhc3Ncblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlzbzg2MDFEYXRlU3RyaW5nXG5cdCAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IHRpbWV6b25lIElmIG51bGwsIHRoZW4gdGltZXpvbmUgaXMgbm90IHNldC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKi9cblx0Y29uc3RydWN0b3IoXG5cdFx0aXNvODYwMURhdGVTdHJpbmcgPSAnJyxcblx0XHR0aW1lem9uZSA9IERFRkFVTFRfVElNRVpPTkVfU1RSSU5HLFxuXHRcdGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFXG5cdCkge1xuXHRcdGlmICggaXNvODYwMURhdGVTdHJpbmcgIT09ICcnICkge1xuXHRcdFx0dGhpcy5jb25zdHJ1Y3Rvci5hc3NlcnRJU084NjAxSXNWYWxpZCggaXNvODYwMURhdGVTdHJpbmcgKTtcblx0XHR9XG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0XHRpZiAoIHRpbWV6b25lID09PSBudWxsICkge1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXSA9IGlzbzg2MDFEYXRlU3RyaW5nID09PSAnJyA/XG5cdFx0XHRcdG1vbWVudC51dGMoKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdFx0bW9tZW50KCBpc284NjAxRGF0ZVN0cmluZyApXG5cdFx0XHRcdFx0LnV0Y09mZnNldCggaXNvODYwMURhdGVTdHJpbmcgKVxuXHRcdFx0XHRcdC5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdH0gZWxzZSBpZiAoIHRpbWV6b25lID09PSB0aGlzLmNvbnN0cnVjdG9yLlRJTUVaT05FX0xPQ0FMICkge1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXSA9IGlzbzg2MDFEYXRlU3RyaW5nID09PSAnJyA/XG5cdFx0XHRcdG1vbWVudCgpLmxvY2FsZSggbG9jYWxlICkgOlxuXHRcdFx0XHRtb21lbnQoIGlzbzg2MDFEYXRlU3RyaW5nICkubG9jYWxlKCBsb2NhbGUgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jb25zdHJ1Y3Rvci5hc3NlcnRUaW1lem9uZUlzVmFsaWQoIHRpbWV6b25lICk7XG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdID0gaXNvODYwMURhdGVTdHJpbmcgPT09ICcnID9cblx0XHRcdFx0bW9tZW50KCkudHooIHRpbWV6b25lICkubG9jYWxlKCBsb2NhbGUgKSA6XG5cdFx0XHRcdG1vbWVudC50eihcblx0XHRcdFx0XHRpc284NjAxRGF0ZVN0cmluZyxcblx0XHRcdFx0XHR0aW1lem9uZVxuXHRcdFx0XHQpLmxvY2FsZSggbG9jYWxlICk7XG5cdFx0fVxuXHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmNyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzIF0oKTtcblx0XHRPYmplY3QuZnJlZXplKCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoZSBnaXZlbiBsb2NhbGUgaXMgYSB2YWxpZCBsb2NhbGUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBtZWFucyBpdCBpcyB2YWxpZFxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlTG9jYWxlKCBsb2NhbGUgKSB7XG5cdFx0cmV0dXJuIGFzc2VydGlvbnMudmFsaWRhdGVMb2NhbGUoIGxvY2FsZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgaWYgdGhlIGdpdmVuIGxvY2FsZSBpcyB2YWxpZCBhbmQgdGhyb3dzIGFuIGVycm9yIGlmIG5vdC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAdGhyb3dzIEludmFsaWRMb2NhbGVcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhlIGdpdmVuIElTTzg2MDEgc3RyaW5nIGlzIHZhbGlkLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRpbWVTdHJpbmdcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBtZWFucyBpdCBpcyB2YWxpZC5cblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUlTTzg2MDEoIGRhdGVUaW1lU3RyaW5nICkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlSVNPODYwMSggZGF0ZVRpbWVTdHJpbmcgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIGlmIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCBJU08gODYwMSBzdHJpbmcuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVGltZVN0cmluZ1xuXHQgKiBAdGhyb3dzIEludmFsaWRJU084NjAxU3RyaW5nXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SVNPODYwMUlzVmFsaWQoIGRhdGVUaW1lU3RyaW5nICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SVNPODYwMUlzVmFsaWQoIGRhdGVUaW1lU3RyaW5nICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCB0aW1lem9uZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBtZWFucyBpdCBpcyB2YWxpZC5cblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZVRpbWV6b25lKCB0aW1lem9uZSApIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZVRpbWV6b25lKCB0aW1lem9uZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gc3RyaW5nIGlzIGEgdmFsaWQgdGltZXpvbmUgc3RyaW5nLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcblx0ICogQHRocm93cyBJbnZhbGlkVGltZXpvbmVcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRUaW1lem9uZUlzVmFsaWQoIHRpbWV6b25lICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0VGltZXpvbmVJc1ZhbGlkKCB0aW1lem9uZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIG9mZnNldFxuXHQgKlxuXHQgKiBDdXJyZW50bHkgdGhpcyBqdXN0IHZhbGlkYXRlcyB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSBudW1iZXIuIEV2ZW50dWFsbHkgaXRcblx0ICogbWlnaHQgY2hlY2sgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgdHJ1ZSBtZWFucyBpdHMgdmFsaWQuXG5cdCAqL1xuXHRzdGF0aWMgdmFsaWRhdGVJc09mZnNldCggb2Zmc2V0ICkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlSXNPZmZzZXQoIG9mZnNldCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSB2YWxpZCBvZmZzZXQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc09mZnNldCggb2Zmc2V0ICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SXNPZmZzZXQoIG9mZnNldCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBkYXRldGltZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSByZXR1cm5zIHRydWUgaWYgaXQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUlzRGF0ZVRpbWUoIGRhdGV0aW1lICkge1xuXHRcdHJldHVybiBpbnN0YW5jZU9mKCBkYXRldGltZSwgJ0RhdGVUaW1lJyApIHx8XG5cdFx0XHRpbnN0YW5jZU9mKCBkYXRldGltZSwgJ1NlcnZlckRhdGVUaW1lJyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICogQHBhcmFtIHtEYXRlVGltZX0gZGF0ZXRpbWVcblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc0RhdGVUaW1lKCBkYXRldGltZSApIHtcblx0XHRpZiAoICEgdGhpcy52YWxpZGF0ZUlzRGF0ZVRpbWUoIGRhdGV0aW1lICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZSdcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgamF2YXNjcmlwdCBEYXRlXG5cdCAqIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhlIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVcblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUlzRGF0ZSggZGF0ZSApIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZUlzRGF0ZSggZGF0ZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNEYXRlKCBkYXRlICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SXNEYXRlKCBkYXRlICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lIGFuZCBpc1xuXHQgKiBhIFwidmFsaWRcIiBkYXRldGltZSAobWVhbmluZyB0aGUgaW5zdGFuY2Ugd2FzIGNvbnN0cnVjdGVkIHdpdGggdmFsaWRcblx0ICogYXJndW1lbnRzKS5cblx0ICogQHBhcmFtIHtEYXRlVGltZX0gZGF0ZXRpbWVcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBtZWFucyBpdCBpcyB2YWxpZC5cblx0ICovXG5cdHN0YXRpYyBpc1ZhbGlkKCBkYXRldGltZSApIHtcblx0XHRyZXR1cm4gdGhpcy52YWxpZGF0ZUlzRGF0ZVRpbWUoIGRhdGV0aW1lICkgJiYgZGF0ZXRpbWUuaXNWYWxpZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWUgYW5kIGlzXG5cdCAqIGEgXCJ2YWxpZFwiIGRhdGV0aW1lIChtZWFuaW5nIHRoZSBpbnN0YW5jZSB3YXMgY29uc3RydWN0ZWQgd2l0aCB2YWxpZFxuXHQgKiBhcmd1bWVudHMpXG5cdCAqIEBwYXJhbSB7RGF0ZVRpbWV9IGRhdGV0aW1lXG5cdCAqIEB0aHJvd3MgSW52YWxpZERhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNWYWxpZCggZGF0ZXRpbWUgKSB7XG5cdFx0aWYgKCAhIHRoaXMuaXNWYWxpZCggZGF0ZXRpbWUgKSApIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkRGF0ZVRpbWUoIGRhdGV0aW1lICk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIFsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplQXJndW1lbnRzIF0oIGRhdGVWYWx1ZSwgdGltZXpvbmUsIGxvY2FsZSApIHtcblx0XHRyZXR1cm4gdGhpcy5uYW1lID09PSAnU2VydmVyRGF0ZVRpbWUnID9cblx0XHRcdFsgZGF0ZVZhbHVlLCBsb2NhbGUsIHRpbWV6b25lIF0gOlxuXHRcdFx0WyBkYXRlVmFsdWUsIHRpbWV6b25lLCBsb2NhbGUgXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHByaXZhdGUgaW50ZXJuYWwgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gZXh0cmFjdCBhbGwgbW9tZW50XG5cdCAqIGluc3RhbmNlcyBmcm9tIHRoZSBwcm92aWRlZCBEYXRlVGltZXMgKHBhc3NlZCBpbiBhcyBhcmd1bWVudHMpLlxuXHQgKiBAcGFyYW0gey4uLkRhdGVUaW1lfSBkYXRldGltZXNcblx0ICogQHJldHVybiB7TW9tZW50W119IEFuIGFycmF5IG9mIG1vbWVudCBpbnN0YW5jZXMgZXh0cmFjdGVkIGZyb20gdGhlXG5cdCAqIERhdGVUaW1lc1xuXHQgKi9cblx0c3RhdGljIFsgcHJpdmF0ZU1ldGhvZHMuZXh0cmFjdE1vbWVudHNGcm9tRGF0ZVRpbWVzIF0oIC4uLmRhdGV0aW1lcyApIHtcblx0XHRyZXR1cm4gZGF0ZXRpbWVzLm1hcCggKCBkYXRldGltZSApID0+IHtcblx0XHRcdHRoaXMuYXNzZXJ0SXNEYXRlVGltZSggZGF0ZXRpbWUgKTtcblx0XHRcdHJldHVybiBkYXRldGltZVsgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXTtcblx0XHR9ICk7XG5cdH1cblxuXHQvKipcblx0ICogR2l2ZW4gYW4gaW5kZWZpbml0ZSBudW1iZXIgb2YgRGF0ZVRpbWVzIGFzIGFyZ3VtZW50cywgdGhpcyB3aWxsIHJldHVybiBhXG5cdCAqIG5ldyBEYXRlVGltZSB0aGF0IHJlcHJlc2VudHMgdGhlIGxhdGVzdCBwb2ludCBpbiB0aW1lLlxuXHQgKiBAcGFyYW0gey4uLkRhdGVUaW1lfSBkYXRldGltZXNcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEEgbmV3IERhdGVUaW1lIHJlcHJlc2VudGluZyB0aGUgbGF0ZXN0IHBvaW50IG9mIHRpbWUuXG5cdCAqL1xuXHRzdGF0aWMgbWF4KCAuLi5kYXRldGltZXMgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZnJvbU1vbWVudChcblx0XHRcdG1vbWVudC5tYXgoXG5cdFx0XHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lcyBdKFxuXHRcdFx0XHRcdC4uLmRhdGV0aW1lc1xuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHaXZlbiBhbiBpbmRlZmluaXRlIG51bWJlciBvZiBEYXRlVGltZXMgYXMgYXJndW1lbnRzLCB0aGlzIHdpbGwgcmV0dXJuIGFcblx0ICogbmV3IERhdGVUaW1lIHRoYXQgcmVwcmVzZW50cyB0aGUgZWFybGllc3QgcG9pbnQgaW4gdGltZS5cblx0ICogQHBhcmFtIHsuLi5EYXRlVGltZX0gZGF0ZXRpbWVzXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBIG5ldyBEYXRlVGltZSByZXByZXNlbnRpbmcgdGhlIGVhcmxpZXN0IHBvaW50IGluXG5cdCAqIHRpbWUuXG5cdCAqL1xuXHRzdGF0aWMgbWluKCAuLi5kYXRldGltZXMgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZnJvbU1vbWVudChcblx0XHRcdG1vbWVudC5taW4oXG5cdFx0XHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lcyBdKFxuXHRcdFx0XHRcdC4uLmRhdGV0aW1lc1xuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBpbnN0YW5jZSBvZiBtb21lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bW9tZW50fSBtb21lbnRJbnN0YW5jZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tTW9tZW50KCBtb21lbnRJbnN0YW5jZSApIHtcblx0XHRpZiAoICEgbW9tZW50LmlzTW9tZW50KCBtb21lbnRJbnN0YW5jZSApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ1JlcXVpcmVzIGFuIGluc3RhbmNlIG9mIG1vbWVudC4nICk7XG5cdFx0fVxuXG5cdFx0Ly8gdGhpcyB3b3VsZCBhY2NvdW50IGZvciBjbGllbnQgY29kZSB0aGF0IGlzIHVzaW5nIGBtb21lbnRgIGJ1dCBub3Rcblx0XHQvLyB1c2luZyBgbW9tZW50LXRpbWV6b25lYC5cblx0XHRyZXR1cm4gaXNGdW5jdGlvbiggbW9tZW50SW5zdGFuY2UudHogKSAmJlxuXHRcdFx0ISBpc1VuZGVmaW5lZCggbW9tZW50SW5zdGFuY2UudHooKSApICYmXG5cdFx0XHRtb21lbnRJbnN0YW5jZS50eigpICE9PSAnVVRDJyA/XG5cdFx0XHRuZXcgdGhpcyhcblx0XHRcdFx0Li4udGhpc1sgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplQXJndW1lbnRzIF0oXG5cdFx0XHRcdFx0bW9tZW50SW5zdGFuY2UudG9JU09TdHJpbmcoKSxcblx0XHRcdFx0XHRtb21lbnRJbnN0YW5jZS50eigpLFxuXHRcdFx0XHRcdG1vbWVudEluc3RhbmNlLmxvY2FsZSgpXG5cdFx0XHRcdClcblx0XHRcdCkgOlxuXHRcdFx0bmV3IHRoaXMoXG5cdFx0XHRcdC4uLnRoaXNbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZUFyZ3VtZW50cyBdKFxuXHRcdFx0XHRcdG1vbWVudEluc3RhbmNlLnRvSVNPU3RyaW5nKCB0cnVlICksXG5cdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRtb21lbnRJbnN0YW5jZS5sb2NhbGUoKVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGFuIElTTyA4NjAxIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IElTT1N0cmluZ1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tSVNPKFxuXHRcdElTT1N0cmluZyxcblx0XHR0aW1lem9uZSA9IERFRkFVTFRfVElNRVpPTkVfU1RSSU5HLFxuXHRcdGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFXG5cdCkge1xuXHRcdGlmICggaXNFbXB0eSggSVNPU3RyaW5nICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZElTTzg2MDFTdHJpbmcoIElTT1N0cmluZyApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IHRoaXMoXG5cdFx0XHQuLi50aGlzWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVBcmd1bWVudHMgXShcblx0XHRcdFx0SVNPU3RyaW5nLFxuXHRcdFx0XHR0aW1lem9uZSxcblx0XHRcdFx0bG9jYWxlXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBJU08gODYwMSBTdHJpbmdcblx0ICogRGlmZmVycyB3aXRoIGBmcm9tSVNPYCBpbiB0aGF0IHRoaXMgYWxsb3dzIHBhc3NpbmcgYSBvZmZzZXQgdmFsdWVcblx0ICogaW5zdGVhZCBvZiBhIHRpbWV6b25lIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IElTT1N0cmluZ1xuXHQgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0ICBJbiBtaW51dGVzIHVubGVzcyA+IC0xNiBvciA8IC0xNiBpbiB3aGljaCBjYXNlIGl0XG5cdCAqIGlzIHRyZWF0ZWQgYXMgaG91cnMuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9ICBBbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGZyb21JU09XaXRoT2Zmc2V0KFxuXHRcdElTT1N0cmluZyxcblx0XHRvZmZzZXQgPSBERUZBVUxUX09GRlNFVCxcblx0XHRsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRVxuXHQpIHtcblx0XHR0aGlzLmFzc2VydElTTzg2MDFJc1ZhbGlkKCBJU09TdHJpbmcgKTtcblx0XHR0aGlzLmFzc2VydElzT2Zmc2V0KCBvZmZzZXQgKTtcblx0XHR0aGlzLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdGNvbnN0IGRhdGV0aW1lID0gbW9tZW50LnV0YyggSVNPU3RyaW5nIClcblx0XHRcdC51dGNPZmZzZXQoIG9mZnNldCwgdHJ1ZSApXG5cdFx0XHQubG9jYWxlKCBsb2NhbGUgKTtcblx0XHRyZXR1cm4gdGhpcy5mcm9tTW9tZW50KCBkYXRldGltZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGEgamF2YXNjcmlwdCBEYXRlIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgZnJvbUpTRGF0ZShcblx0XHRkYXRlLFxuXHRcdHRpbWV6b25lID0gREVGQVVMVF9USU1FWk9ORV9TVFJJTkcsXG5cdFx0bG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEVcblx0KSB7XG5cdFx0dGhpcy5hc3NlcnRJc0RhdGUoIGRhdGUgKTtcblx0XHR0aGlzLmFzc2VydFRpbWV6b25lSXNWYWxpZCggdGltZXpvbmUgKTtcblx0XHR0aGlzLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQoXG5cdFx0XHRtb21lbnQoIGRhdGUgKS50eiggdGltZXpvbmUgKS5sb2NhbGUoIGxvY2FsZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZXRpbWUgZnJvbSBhIGphdmFzY3JpcHQgRGF0ZSBvYmplY3QuXG5cdCAqXG5cdCAqIFRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhpcyBhbmQgZnJvbUpTRGF0ZSBpcyB0aGF0IHRoaXMgY2FuIGJlIHNldCB3aXRoXG5cdCAqIGFuIG9mZnNldCB2cyBhIHRpbWV6b25lIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGZyb21KU0RhdGVXaXRoT2Zmc2V0KFxuXHRcdGRhdGUsXG5cdFx0b2Zmc2V0ID0gREVGQVVMVF9PRkZTRVQsXG5cdFx0bG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEVcblx0KSB7XG5cdFx0dGhpcy5hc3NlcnRJc0RhdGUoIGRhdGUgKTtcblx0XHR0aGlzLmFzc2VydElzT2Zmc2V0KCBvZmZzZXQgKTtcblx0XHR0aGlzLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQoXG5cdFx0XHRtb21lbnQoIGRhdGUgKS51dGNPZmZzZXQoIG9mZnNldCApLmxvY2FsZSggbG9jYWxlIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSAoaW4gVVRDKSB3aXRoIG1pbGxpc2Vjb25kcyBmcm9tIGVwb2NoLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gbWlsbGlzZWNvbmRzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBmcm9tTWlsbGlzZWNvbmRzKCBtaWxsaXNlY29uZHMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0aWYgKCAhIGlzTnVtYmVyKCBtaWxsaXNlY29uZHMgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdQcm92aWRlZCB2YWx1ZSBtdXN0IGJlIGEgbnVtYmVyICcgK1xuXHRcdFx0XHQncmVwcmVzZW50aW5nIG1pbGxpc2Vjb25kcyBmcm9tIHRoZSBlcG9jaCcgKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuZnJvbU1vbWVudChcblx0XHRcdG1vbWVudCggbWlsbGlzZWNvbmRzICkudXRjKCkubG9jYWxlKCBsb2NhbGUgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIGluIFVUQyB3aXRoIHNlY29uZHMgZnJvbSB0aGUgZXBvY2guXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgZnJvbVVuaXgoIHNlY29uZHMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0aWYgKCAhIGlzTnVtYmVyKCBzZWNvbmRzICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnUHJvdmlkZWQgdmFsdWUgbXVzdCBiZSBhIG51bWJlciAnICtcblx0XHRcdFx0J3JlcHJlc2VudGluZyBzZWNvbmRzIGZyb20gdGhlIGVwb2NoJyApO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5mcm9tTW9tZW50KFxuXHRcdFx0bW9tZW50LnVuaXgoIHNlY29uZHMgKS51dGMoKS5sb2NhbGUoIGxvY2FsZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBvYmplY3Qgb2YgdmFsdWVzIGFzc3VtaW5nIGl0cyBpbiBcImxvY2FsXCJcblx0ICogdGltZSAoaWYgcnVuIHZpYSBicm93c2VyIG9yIHNlcnZlciBpZiBydW4gc2VydmVyIHNpZGUpLlxuXHQgKlxuXHQgKiBUaGUgb2JqZWN0IGlzIGV4cGVjdGVkIHRvIGJlIGEgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBpbnN0YW5jZSBpbiB0aW1lOlxuXHQgKiBFZy5cblx0ICogeyB5ZWFyOiAyMDE4LCBtb250aDogMTIsIGRheTogMjUsIGhvdXI6IDAsIG1pbnV0ZTogMTUsIHNlY29uZHM6IDAgfVxuXHQgKlxuXHQgKiBQYXNzIGFuIGVtcHR5IHZhbHVlcyB2YWx1ZSBpZiB5b3Ugd2FudCB0aGUgaW5zdGFuY2UgaW4gdGltZSB0byByZXByZXNlbnRcblx0ICogXCJub3dcIi5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHZhbHVlc1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKiBAdGhyb3dzIEludmFsaWRBcmd1bWVudFxuXHQgKi9cblx0c3RhdGljIGZyb21Mb2NhbCggdmFsdWVzLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSApIHtcblx0XHR0aGlzLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdHZhbHVlcyA9IHRoaXNbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRPYmplY3QgXSggdmFsdWVzICk7XG5cdFx0Y29uc3QgZGF0ZXRpbWUgPSBpc0VtcHR5KCB2YWx1ZXMgKSA/XG5cdFx0XHRtb21lbnQoKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdG1vbWVudCggdmFsdWVzICkubG9jYWxlKCBsb2NhbGUgKTtcblx0XHRpZiAoIGRhdGV0aW1lLmlzVmFsaWQoKSAhPT0gdHJ1ZSApIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnQoXG5cdFx0XHRcdCdEb3VibGUtY2hlY2sgdGhlIHZhbHVlcyB5b3Ugc2VudCBpbi4nLFxuXHRcdFx0XHR2YWx1ZXNcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQoIGRhdGV0aW1lICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIGZyb20gYW4gb2JqZWN0IG9mIHZhbHVlcyBhbmQgYXNzdW1lcyBpdHMgaW5cblx0ICogJ1VUQycuXG5cdCAqXG5cdCAqIFRoZSBvYmplY3QgaXMgZXhwZWN0ZWQgdG8gYmUgYSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGluc3RhbmNlIGluIHRpbWU6XG5cdCAqIEVnLlxuXHQgKiB7IHllYXI6IDIwMTgsIG1vbnRoOiAxMiwgZGF5OiAyNSwgaG91cjogMCwgbWludXRlOiAxNSwgc2Vjb25kczogMCB9XG5cdCAqXG5cdCAqIEFueSB1bml0cyBub3Qgc3BlY2lmaWVkIHdpbGwgYmUgYXNzdW1lZCB0byBiZSBgMGAuXG5cdCAqXG5cdCAqIFBhc3MgYW4gZW1wdHkgdmFsdWVzIHZhbHVlIGlmIHlvdSB3YW50IHRoZSBpbnN0YW5jZSBpbiB0aW1lIHRvIHJlcHJlc2VudFxuXHQgKiBcIm5vd1wiLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEB0aHJvd3MgSW52YWxpZEFyZ3VtZW50XG5cdCAqL1xuXHRzdGF0aWMgdXRjKCB2YWx1ZXMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0dmFsdWVzID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE9iamVjdCBdKCB2YWx1ZXMgKTtcblx0XHRjb25zdCBkYXRldGltZSA9IGlzRW1wdHkoIHZhbHVlcyApID9cblx0XHRcdG1vbWVudC51dGMoKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdG1vbWVudC51dGMoIHZhbHVlcyApLmxvY2FsZSggbG9jYWxlICk7XG5cdFx0aWYgKCBkYXRldGltZS5pc1ZhbGlkKCkgIT09IHRydWUgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50KFxuXHRcdFx0XHQnRG91YmxlLWNoZWNrIHRoZSB2YWx1ZXMgc2VudCBpbi4nLFxuXHRcdFx0XHR2YWx1ZXNcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQoIGRhdGV0aW1lICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIGZyb20gYSBjb25maWd1cmF0aW9uIG9iamVjdC5cblx0ICpcblx0ICogVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGNhbiBoYXZlOlxuXHQgKiAtIGFueSBvZiB0aGUgRGF0ZVRpbWUgdW5pdHMgKCd5ZWFyJywgJ21vbnRoJywgZXRjKVxuXHQgKiAtICdsb2NhbGUnIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbG9jYWxlXG5cdCAqIC0gJ3RpbWV6b25lJyBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHRpbWV6b25lXG5cdCAqIC0gJ29mZnNldCcgYSBudW1iZXIgcmVwcmVzZW50aW5nIHRoZSBvZmZzZXQgZnJvbSBVVEMgdGhpcyBpbnN0YW5jZSBpblxuXHQgKiB0aW1lIHJlcHJlc2VudHMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXNcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgZnJvbU9iamVjdCggdmFsdWVzICkge1xuXHRcdGNvbnN0IGxvY2FsZSA9IHZhbHVlcy5sb2NhbGUgfHwgREVGQVVMVF9WQUxJRF9MT0NBTEU7XG5cdFx0Y29uc3QgdGltZXpvbmUgPSB2YWx1ZXMudGltZXpvbmUgfHwgREVGQVVMVF9USU1FWk9ORV9TVFJJTkc7XG5cdFx0Y29uc3Qgb2Zmc2V0ID0gaXNVbmRlZmluZWQoIHZhbHVlcy5vZmZzZXQgKSA/XG5cdFx0XHRudWxsIDpcblx0XHRcdHZhbHVlcy5vZmZzZXQ7XG5cdFx0bGV0IHZhbHVlc0ZvckNvbnN0cnVjdCA9IG9taXQoXG5cdFx0XHR2YWx1ZXMsXG5cdFx0XHRbICdsb2NhbGUnLCAndGltZXpvbmUnLCAnb2Zmc2V0JyBdXG5cdFx0KTtcblxuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cblx0XHRpZiAoIG9mZnNldCAhPT0gbnVsbCApIHtcblx0XHRcdHRoaXMuYXNzZXJ0SXNPZmZzZXQoIG9mZnNldCApO1xuXHRcdFx0dmFsdWVzRm9yQ29uc3RydWN0ID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE9iamVjdCBdKFxuXHRcdFx0XHR2YWx1ZXNGb3JDb25zdHJ1Y3Rcblx0XHRcdCk7XG5cdFx0XHRjb25zdCBkYXRldGltZSA9IGlzRW1wdHkoIHZhbHVlc0ZvckNvbnN0cnVjdCApID9cblx0XHRcdFx0bW9tZW50KCkudXRjT2Zmc2V0KCBvZmZzZXQsIHRydWUgKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdFx0bW9tZW50LnV0YyggdmFsdWVzRm9yQ29uc3RydWN0IClcblx0XHRcdFx0XHQudXRjT2Zmc2V0KCBvZmZzZXQsIHRydWUgKVxuXHRcdFx0XHRcdC5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdFx0aWYgKCBkYXRldGltZS5pc1ZhbGlkKCkgIT09IHRydWUgKSB7XG5cdFx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnQoXG5cdFx0XHRcdFx0J0RvdWJsZS1jaGVjayB0aGUgY29uZmlndXJhdGlvbiBvYmplY3Qgc2VudCBpbi4nLFxuXHRcdFx0XHRcdHZhbHVlc1xuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMuZnJvbU1vbWVudCggZGF0ZXRpbWUgKTtcblx0XHR9XG5cblx0XHRpZiAoIHRpbWV6b25lID09PSB0aGlzLlRJTUVaT05FX0xPQ0FMICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZnJvbUxvY2FsKCB2YWx1ZXNGb3JDb25zdHJ1Y3QsIGxvY2FsZSApO1xuXHRcdH1cblxuXHRcdHRoaXMuYXNzZXJ0VGltZXpvbmVJc1ZhbGlkKCB0aW1lem9uZSApO1xuXG5cdFx0dmFsdWVzRm9yQ29uc3RydWN0ID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE9iamVjdCBdKFxuXHRcdFx0dmFsdWVzRm9yQ29uc3RydWN0XG5cdFx0KTtcblx0XHRjb25zdCBkYXRldGltZSA9IG1vbWVudC50eiggdmFsdWVzRm9yQ29uc3RydWN0LCB0aW1lem9uZSApXG5cdFx0XHQubG9jYWxlKCBsb2NhbGUgKTtcblx0XHRpZiAoIGRhdGV0aW1lLmlzVmFsaWQoKSAhPT0gdHJ1ZSApIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnQoXG5cdFx0XHRcdCdEb3VibGUtY2hlY2sgdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNlbnQgaW4uJyxcblx0XHRcdFx0dmFsdWVzXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5mcm9tTW9tZW50KCBkYXRldGltZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vbWVudCB1c2VzIGRpZmZlcmVudCBuYW1lcyBmb3Igc29tZSB1bml0IGdldHRlcnMvc2V0dGVycy9wcm9wZXJ0aWVzIHNvXG5cdCAqIHRoaXMgaXMgdXNlZCB0byBub3JtYWxpemUgYSBnaXZlbiB1bml0IG5hbWUgdG8gd2hhdCBtb21lbnQgdXNlcy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWVUb05vcm1hbGl6ZVxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9ICBOb3JtYWxpemVkIHVuaXQgbmFtZS5cblx0ICovXG5cdHN0YXRpYyBbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXROYW1lIF0oIG5hbWVUb05vcm1hbGl6ZSApIHtcblx0XHRjb25zdCBtYXAgPSB7XG5cdFx0XHRkYXk6ICdkYXRlJyxcblx0XHRcdGRheXM6ICdkYXknLFxuXHRcdFx0ZGF0ZTogJ2RheScsXG5cdFx0XHR5ZWFyczogJ3llYXInLFxuXHRcdFx0bW9udGhzOiAnbW9udGgnLFxuXHRcdFx0bWlsbGlzZWNvbmRzOiAnbWlsbGlzZWNvbmQnLFxuXHRcdFx0bWludXRlczogJ21pbnV0ZScsXG5cdFx0XHRzZWNvbmRzOiAnc2Vjb25kJyxcblx0XHRcdGhvdXJzOiAnaG91cicsXG5cdFx0fTtcblx0XHRyZXR1cm4gbWFwWyBuYW1lVG9Ob3JtYWxpemUgXSA/XG5cdFx0XHRtYXBbIG5hbWVUb05vcm1hbGl6ZSBdIDpcblx0XHRcdG5hbWVUb05vcm1hbGl6ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIG5vcm1hbGl6aW5nIHVuaXQgdmFsdWVzIGZvciBpbnRlcm5hbCBsaWJyYXJ5IHVzZS5cblx0ICpcblx0ICogRm9yIGV4YW1wbGUsIG1vbWVudCB6ZXJvIGluZGV4ZXMgbW9udGhzLiBEYXRlVGltZSBkb2VzIG5vdCwgc28gdGhpc1xuXHQgKiBtZXRob2QgaGVscHMgd2l0aCBub3JtYWxpemluZyBtb250aCB2YWx1ZXMgZm9yIGJvdGggc2V0dGluZyAodXNlZCBieVxuXHQgKiBtb21lbnQpIGFuZCBnZXR0aW5nIChyZXR1cm5lZCB0byBjbGllbnQpLiAgVGhpcyBhbGxvd3MgY2xpZW50IGNvZGVcblx0ICogdG8gZXhwZWN0IG1vbnRocyBpbiBEYXRlVGltZSB0byBiZSBoYW5kbGVkIHdpdGggYSBub24temVybyBpbmRleC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHVuaXQgVGhlIHVuaXQgdG8gYmUgbm9ybWFsaXplZFxuXHQgKiBAcGFyYW0ge21peGVkfSAgdmFsdWUgVGhlIHZhbHVlIGZvciB0aGF0IHVuaXRcblx0ICogQHBhcmFtIHtib29sZWFufSBzZXQgIFdoZXRoZXIgdGhpcyBzaG91bGQgbm9ybWFsaXplIGZvciBzZXR0aW5nIG9yXG5cdCAqIGdldHRpbmcuXG5cdCAqIEByZXR1cm4ge21peGVkfSAgVGhlIG5vcm1hbGl6ZWQgdmFsdWUuXG5cdCAqL1xuXHRzdGF0aWMgWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0VmFsdWUgXSggdW5pdCwgdmFsdWUsIHNldCA9IHRydWUgKSB7XG5cdFx0aWYgKCB1bml0ID09PSAnbW9udGgnICkge1xuXHRcdFx0dmFsdWUgPSBzZXQgPyB2YWx1ZSAtIDEgOiB2YWx1ZSArIDE7XG5cdFx0fVxuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHaXZlbiBhIHNpbXBsZSBvYmplY3QgY29udGFpbmluZyB1bml0cywgdGhpcyBub3JtYWxpemVzIHRoZSBvYmplY3QgdG9cblx0ICogd2hhdCBtb21lbnQgcmVjb2duaXplcy5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHNldE9iamVjdFxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNldCAgdHJ1ZSBpZiBzZXR0aW5nIHRoZSBvYmplY3QsIGZhbHNlIGlmIGdldHRpbmcgdGhlXG5cdCAqIG9iamVjdFxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBub3JtYWxpemVkIG9iamVjdC5cblx0ICovXG5cdHN0YXRpYyBbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRPYmplY3QgXSggc2V0T2JqZWN0LCBzZXQgPSB0cnVlICkge1xuXHRcdGlmICggISBpc09iamVjdCggc2V0T2JqZWN0ICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGluY29taW5nIHZhbHVlIG11c3QgYmUgYW4gb2JqZWN0J1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlZHVjZSggc2V0T2JqZWN0LCAoIHJlc3VsdCwgdmFsdWUsIGtleSApID0+IHtcblx0XHRcdGtleSA9IHRoaXNbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXROYW1lIF0oIGtleSApO1xuXHRcdFx0cmVzdWx0WyBrZXkgXSA9IHRoaXNbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRWYWx1ZSBdKFxuXHRcdFx0XHRrZXksXG5cdFx0XHRcdHZhbHVlLFxuXHRcdFx0XHRzZXRcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sIHt9ICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgZGF0ZSBhbmQgdGltZSB1bml0IG5hbWVzXG5cdCAqIEByZXR1cm4ge3N0cmluZ1tdfSBBbiBhcnJheSBvZiB1bml0IG5hbWVzXG5cdCAqL1xuXHRbIHByaXZhdGVNZXRob2RzLmdldFVuaXROYW1lcyBdKCkge1xuXHRcdHJldHVybiB2YWxpZERhdGVUaW1lVW5pdHM7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyB0aGUgdmFyaW91cyBnZXR0ZXIgYW5kIHNldHRlcnMgZm9yIHRoZSB2YWx1ZSBvYmplY3QuXG5cdCAqL1xuXHRbIHByaXZhdGVNZXRob2RzLmNyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzIF0oKSB7XG5cdFx0dGhpc1sgcHJpdmF0ZU1ldGhvZHMuZ2V0VW5pdE5hbWVzIF0oKS5mb3JFYWNoKFxuXHRcdFx0KCB1bml0TmFtZSApID0+IHtcblx0XHRcdFx0Ly8gY3JlYXRlcyBhY2Nlc3NvciBmb3IgZ2V0dGluZyB0aGUgdW5pdCB2YWx1ZSB2aWEgYVxuXHRcdFx0XHQvLyBwcm9wZXJ0eSAoZWcuIGluc3RhbmNlLmhvdXIpXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggdGhpcywgdW5pdE5hbWUsIHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtZXRob2ROYW1lID0gdGhpcy5jb25zdHJ1Y3RvclsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE5hbWUgXSggdW5pdE5hbWUgKTtcblx0XHRcdFx0XHRcdGNvbnN0IHVuaXRWYWx1ZSA9IHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdFx0XHRcdFx0WyBtZXRob2ROYW1lIF0oKTtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0VmFsdWUgXShcblx0XHRcdFx0XHRcdFx0dW5pdE5hbWUsXG5cdFx0XHRcdFx0XHRcdHVuaXRWYWx1ZSxcblx0XHRcdFx0XHRcdFx0ZmFsc2Vcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSApO1xuXHRcdFx0XHQvLyBjcmVhdGVzIGEgZmx1ZW50IHNldHRlciBmb3IgdGhlIHZhbHVlLlxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHRoaXMsICdzZXQnICsgY2FwaXRhbGl6ZSggdW5pdE5hbWUgKSwge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAoIHZhbHVlICkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zZXQoIHsgWyB1bml0TmFtZSBdOiB2YWx1ZSB9ICk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVzZWQgdG8gc2V0IHZhcmlvdXMgcGFydHMgb2YgdGhlIGRhdGV0aW1lIHN0cmluZyBhbmQgcmV0dXJucyBhIE5FV1xuXHQgKiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKlxuXHQgKiBOb3RlOiB0aGlzIHdpbGwgY29uc3RydWN0IGEgRGF0ZVRpbWUgZXZlbiB3aXRoIGludmFsaWQgdW5pdHMuIE1ha2UgdXNlIG9mXG5cdCAqIGBpc1ZhbGlkKClgIHRvIGRldGVybWluZSB3aGV0aGVyIHRoZSBpbnN0YW5jZSBpcyBhIHZhbGlkIERhdGVUaW1lIG9yIG5vdC5cblx0ICpcblx0ICogQHBhcmFtIHt7fX0gc2V0T2JqZWN0IEFuIG9iamVjdCB3aGVyZSBrZXlzIGFyZSB0aGUgdW5pdHMuXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZS5cblx0ICovXG5cdHNldCggc2V0T2JqZWN0ID0ge30gKSB7XG5cdFx0c2V0T2JqZWN0ID0gdGhpcy5jb25zdHJ1Y3RvclsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE9iamVjdCBdKCBzZXRPYmplY3QgKTtcblx0XHRjb25zdCBpbnN0YW5jZUFyZ3VtZW50cyA9IHRoaXMuY29uc3RydWN0b3JbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZUFyZ3VtZW50cyBdKFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQuc2V0KCBzZXRPYmplY3QgKS50b0lTT1N0cmluZygpLFxuXHRcdFx0dGhpcy50aW1lem9uZSxcblx0XHRcdHRoaXMubG9jYWxlXG5cdFx0KTtcblx0XHRyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IoIC4uLmluc3RhbmNlQXJndW1lbnRzICk7XG5cdH1cblxuXHQvKipcblx0ICogQWNjZXNzb3IgZm9yIHRoZSB0aW1lem9uZSBzdHJpbmcuXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHRpbWV6b25lIHN0cmluZ1xuXHQgKi9cblx0Z2V0IHRpbWV6b25lKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnR6KCk7XG5cdH1cblxuXHQvKipcblx0ICogRmx1ZW50IHNldHRlciBmb3IgdGhlIHRpbWV6b25lIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHNldFRpbWV6b25lKCB0aW1lem9uZSApIHtcblx0XHR0aGlzLmNvbnN0cnVjdG9yLmFzc2VydFRpbWV6b25lSXNWYWxpZCggdGltZXpvbmUgKTtcblx0XHRjb25zdCBpbnN0YW5jZUFyZ3VtZW50cyA9IHRoaXMuY29uc3RydWN0b3JbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZUFyZ3VtZW50cyBdKFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS50b0lTT1N0cmluZygpLFxuXHRcdFx0dGltZXpvbmUsXG5cdFx0XHR0aGlzLmxvY2FsZVxuXHRcdCk7XG5cdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKCAuLi5pbnN0YW5jZUFyZ3VtZW50cyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGZvciB0aGUgbW9udGggc2V0IGluIHRoaXMgaW5zdGFuY2UuXG5cdCAqXG5cdCAqIEByZXR1cm4ge251bWJlcn0gIFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbW9udGguXG5cdCAqL1xuXHRnZXQgZGF5c0luTW9udGgoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uZGF5c0luTW9udGgoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IGluc3RhbmNlIGluIHRpbWUgaXMgY3VycmVudGx5IGluIERheWxpZ2h0IFNhdmluZ3Ncblx0ICogVGltZS5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyBpdCBpcyBjdXJyZW50bHkgaW4gRGF5bGlnaHQgU2F2aW5ncyBUaW1lLlxuXHQgKi9cblx0Z2V0IGlzSW5EU1QoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uaXNEU1QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IGluc3RhbmNlIGluIHRpbWUgaXMgY3VycmVudGx5IGluIGEgbGVhcCB5ZWFyLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoaXMgZGF0ZSB0aW1lIGlzIGluIGEgbGVhcCB5ZWFyLlxuXHQgKi9cblx0Z2V0IGlzSW5MZWFwWWVhcigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5pc0xlYXBZZWFyKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgb2Zmc2V0IGZyb20gVVRDIGZvciB0aGUgY3VycmVudCBpbnN0YW5jZSBpbiB0aW1lIChpbiBtaW51dGVzKS5cblx0ICogQHJldHVybiB7bnVtYmVyfSAgVGhlIG9mZnNldCBpcyBpbiBtaW51dGVzXG5cdCAqL1xuXHRnZXQgb2Zmc2V0KCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnV0Y09mZnNldCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZmx1ZW50IHNldHRlciBmb3IgdGhlIFVUQyBvZmZzZXQuXG5cdCAqXG5cdCAqIFRoZSBvZmZzZXQgcHJvdmlkZWQgZGVmYXVsdHMgdG8gZXhwZWN0aW5nIGluIG1pbnV0ZXMuICBIb3dldmVyIGlmIHRoZVxuXHQgKiBpbnB1dCBpcyBsZXNzIHRoYW4gMTYgYW5kIGdyZWF0ZXIgdGhhbiAtMTYsIGl0IHdpbGwgaW50ZXJwcmV0IHRoZSBpbnB1dFxuXHQgKiBhcyBob3VycyBpbnN0ZWFkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSByZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzZXRPZmZzZXQoIG9mZnNldCApIHtcblx0XHR0aGlzLmNvbnN0cnVjdG9yLmFzc2VydElzT2Zmc2V0KCBvZmZzZXQgKTtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5mcm9tTW9tZW50KFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5jbG9uZSgpLnV0Y09mZnNldCggb2Zmc2V0IClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV4cG9zZXMgdGhlIGRheSBvZiB0aGUgeWVhciBmb3IgdGhlIGRhdGUgYW5kIHRpbWUgaW4gdGhlIG9iamVjdC5cblx0ICpcblx0ICpcblx0ICogQHJldHVybiB7bnVtYmVyfSBBIG51bWJlciBiZXR3ZWVuIDEgYW5kIDM2NiAoZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlXG5cdCAqIGludGVybmFsIGRhdGUgYW5kIHRpbWUgaXMgaW4gYSBsZWFwIHllYXIgb3Igbm90KS5cblx0ICovXG5cdGdldCBkYXlPZlllYXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uZGF5T2ZZZWFyKCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgcXVhcnRlciBmb3IgdGhlIGRhdGUgYW5kIHRpbWUgaW4gdGhlIG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiB7bnVtYmVyfSBBIG51bWJlciBiZXR3ZWVuIDEgYW5kIDRcblx0ICovXG5cdGdldCBxdWFydGVyKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnF1YXJ0ZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBJU08gbnVtYmVyIG9mIHRoZSB3ZWVrIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpbiB0aGUgb2JqZWN0LlxuXHQgKiBAbGluayBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG5cdCAqIEByZXR1cm4ge251bWJlcn0gV2lsbCBiZSBhIG51bWJlciBiZXR3ZWVuIDEgYW5kIDUyaXNoXG5cdCAqL1xuXHRnZXQgaXNvV2Vla051bWJlcigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5pc29XZWVrKCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgSVNPIG51bWJlciBmb3IgdGhlIHdlZWsgeWVhciBmb3IgdGhlIGRhdGUgYW5kIHRpbWUgaW4gdGhlXG5cdCAqIG9iamVjdC5cblx0ICogQGxpbmsgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9ICBXaWxsIGJlIGEgbnVtYmVyIHJlcHJlc2VudGluZyBhIHllYXIuXG5cdCAqL1xuXHRnZXQgaXNvV2Vla1llYXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uaXNvV2Vla1llYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBJU08gbnVtYmVyIGZvciB0aGUgZGF5IG9mIHRoZSB3ZWVrIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpblxuXHQgKiB0aGUgb2JqZWN0LlxuXHQgKiBAbGluayBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG5cdCAqIEByZXR1cm4ge251bWJlcn0gQSBudW1iZXIgYmV0d2VlbiAxIGFuZCA3IChNb25kYXkgaXMgMSBhbmQgU3VuZGF5IGlzIDcpXG5cdCAqL1xuXHRnZXQgaXNvV2Vla0RheSgpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5pc29XZWVrZGF5KCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgbnVtYmVyIG9mIHdlZWtzIGluIHRoaXMgRGF0ZVRpbWUncyB5ZWFyLlxuXHQgKiBAbGluayBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG5cdCAqXG5cdCAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiB3ZWVrcyBpbiB0aGUgSVNPIHllYXIuXG5cdCAqL1xuXHRnZXQgaXNvV2Vla3NJbldlZWtZZWFyKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmlzb1dlZWtzSW5ZZWFyKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB3aGF0IHRoZSBzZXQgbG9jYWxlIGlzIGZvciB0aGlzIERhdGVUaW1lXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gQSBsb2NhbGUgc3RyaW5nXG5cdCAqL1xuXHRnZXQgbG9jYWxlKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmxvY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZmx1ZW50IHNldHRlciBmb3Igc2V0dGluZyB0aGUgbG9jYWxlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBhIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZSBlcXVpdmFsZW50IHRvIHRoaXMgb25lIGJ1dFxuXHQgKiB3aXRoIGRpZmZlcmVudCBsb2NhbGUuXG5cdCAqL1xuXHRzZXRMb2NhbGUoIGxvY2FsZSApIHtcblx0XHR0aGlzLmNvbnN0cnVjdG9yLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdXG5cdFx0XHRcdC5jbG9uZSgpXG5cdFx0XHRcdC5sb2NhbGUoIGxvY2FsZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoaXMgRGF0ZVRpbWUgaW5zdGFuY2UgaXMgdmFsaWQuXG5cdCAqXG5cdCAqIFR5cGljYWxseSBhbiBpbnZhbGlkIHN0YXRlIGlzIGFjaGlldmVkIHdoZW4gdGhlIGludGVybmFsIG1vbWVudCBpc1xuXHQgKiBpbnZhbGlkLiAgVGhpcyBjYW4gaGFwcGVuIHdoZW4gdGhlIG1vbWVudCBpbnN0YW5jZSBpcyBjcmVhdGVkIHdpdGhcblx0ICogaW52YWxpZCBwYXJhbWV0ZXJzLlxuXHQgKlxuXHQgKiBOb3RlOiB3aXRoIG1vbWVudC50aW1lem9uZSAod2hpY2ggaXMgdGhlIGludGVybmFsIGxpYnJhcnkpLFxuXHQgKiBtb21lbnQuaXNWYWxpZCgpIGNvdWxkIHJldHVybiB0cnVlLCBmYWxzZSBvciBhIHN0cmluZyBmb3Igd2h5IGl0J3Ncblx0ICogaW52YWxpZC4gIFRoaXMgaXMgd2h5IGEgc3RyaWN0IGVxdWFsaXR5IGNoZWNrIGlzIGRvbmUgZm9yIHdoZXRoZXIgaXQgaXNcblx0ICogdHJ1ZSBvciBub3QuXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoZSBpbnN0YW5jZSBpcyB2YWxpZC5cblx0ICovXG5cdGlzVmFsaWQoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uaXNWYWxpZCgpID09PSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0d28gRGF0ZVRpbWUgaW5zdGFuY2VzIGFzIGEgRHVyYXRpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7RGF0ZVRpbWV9IG90aGVyRGF0ZVRpbWVcblx0ICogQHJldHVybiB7RHVyYXRpb259IEFuIGluc3RhbmNlIG9mIER1cmF0aW9uIHJlcHJlc2VudGluZyB0aGUgZGlmZmVyZW5jZVxuXHQgKiBiZXR3ZWVuIHRoZSB0d28gRGF0ZVRpbWUgb2JqZWN0cy5cblx0ICovXG5cdGRpZmYoIG90aGVyRGF0ZVRpbWUgKSB7XG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci5hc3NlcnRJc0RhdGVUaW1lKCBvdGhlckRhdGVUaW1lICk7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbihcblx0XHRcdG1vbWVudC5kdXJhdGlvbihcblx0XHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHRcdC5kaWZmKCBvdGhlckRhdGVUaW1lWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdIClcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGlzIERhdGVUaW1lIGFuZCBcIm5vd1wiIGFzIGEgRHVyYXRpb24uXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBbiBpbnN0YW5jZSBvZiBEdXJhdGlvbiByZXByZXNlbnRpbmcgdGhlIGRpZmZlcmVuY2Vcblx0ICogYmV0d2VlbiB0aGlzIERhdGVUaW1lIGFuZCBcIm5vd1wiXG5cdCAqL1xuXHRkaWZmTm93KCkge1xuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oXG5cdFx0XHRtb21lbnQuZHVyYXRpb24oXG5cdFx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdFx0XHQuZGlmZiggbW9tZW50KCkgKVxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSB2YWx1ZSBvZiB0aGlzIERhdGVUaW1lIHRvIHRoZSBlbmQgKGkuZS4gdGhlIGxhc3QgbWlsbGlzZWNvbmQpIG9mXG5cdCAqIGEgdW5pdCBvZiB0aW1lLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdW5pdFxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gUmV0dXJucyBhIG5ldyBEYXRlVGltZSBpbnN0YW5jZS5cblx0ICovXG5cdGVuZE9mKCB1bml0ICkge1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmNsb25lKCkuZW5kT2YoIHVuaXQgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgdGhpcyBEYXRlVGltZSB3aXRoIHByb3ZpZGVkIERhdGVUaW1lIGFuZCByZXR1cm5zIHdoZXRoZXIgdGhleVxuXHQgKiBhcmUgZXF1YWwgdG8gZWFjaCBvdGhlci5cblx0ICpcblx0ICogVGhlIHR3byBEYXRlVGltZXMgYXJlIGNvbnNpZGVyZWQgZXF1YWwgaWYgdGhleSByZXByZXNlbnQgdGhlIHNhbWVcblx0ICogbWlsbGlzZWNvbmQsIGhhdmUgdGhlIHNhbWUgem9uZSBhbmQgbG9jYXRpb24sIGFuZCBhcmUgYm90aCB2YWxpZC5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlVGltZX0gb3RoZXJEYXRlVGltZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGV5IGFyZSBlcXVhbFxuXHQgKi9cblx0ZXF1YWxzKCBvdGhlckRhdGVUaW1lICkge1xuXHRcdHRoaXMuY29uc3RydWN0b3IuYXNzZXJ0SXNEYXRlVGltZSggb3RoZXJEYXRlVGltZSApO1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdXG5cdFx0XHQuaXNTYW1lKCBvdGhlckRhdGVUaW1lWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdICk7XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGlzIERhdGVUaW1lIGlzIGluIHRoZSBzYW1lIHVuaXQgb2YgdGltZSBhcyBhbm90aGVyIERhdGVUaW1lXG5cdCAqXG5cdCAqIGVnLiBEYXRlVGltZS5mcm9tTG9jYWwoKS5oYXNTYW1lKCBvdGhlckRULCAnZGF5JyApIC8vfj4gdHJ1ZSBpZiBib3RoIHRoZVxuXHQgKiBzYW1lIGNhbGVuZGFyIGRheS5cblx0ICpcblx0ICogTm90ZTogdGhpcyB3aWxsIG1hdGNoIGFsbCB1bml0cyBlcXVhbCBvciBsYXJnZXIuICBGb3IgZXhhbXBsZSwgcGFzc2luZyBpblxuXHQgKiBgbW9udGhgIHdpbGwgY2hlY2sgYG1vbnRoYCBhbmQgYHllYXJgLiAgU28gaXQncyBub3Qgb25seSBjaGVja2luZyBpZiB0aGVcblx0ICogdHdvIGRhdGVzIHNoYXJlIHRoZSBzYW1lIG1vbnRoLCBidXQgdGhhdCB0aGV5IGFyZSB0aGUgc2FtZSBtb250aCBpbiB0aGVcblx0ICogc2FtZSB5ZWFyLiAgSWYgeW91IHBhc3NlZCBpbiBkYXksIGl0IHdvdWxkIHJldHVybiB3aGV0aGVyIHRoZSBwcm92aWRlZFxuXHQgKiBEYXRlVGltZSBpcyBpbiB0aGUgc2FtZSBkYXksIG1vbnRoIGFuZCB5ZWFyIGFzIHRoaXMgRGF0ZVRpbWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RGF0ZVRpbWV9IG90aGVyRGF0ZVRpbWVcblx0ICogQHBhcmFtIHtzdHJpbmd9IHVuaXRcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhleSBhcmUgYm90aCBpbiB0aGUgc2FtZSB0aW1lIGZvciB0aGVcblx0ICogZ2l2ZW4gdW5pdC5cblx0ICovXG5cdGhhc1NhbWUoIG90aGVyRGF0ZVRpbWUsIHVuaXQgKSB7XG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci5hc3NlcnRJc0RhdGVUaW1lKCBvdGhlckRhdGVUaW1lICk7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdC5pc1NhbWUoIG90aGVyRGF0ZVRpbWVbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0sIHVuaXQgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTdWJ0cmFjdCBhIHBlcmlvZCBvZiB0aW1lIChyZXByZXNlbnRlZCBieSBhIER1cmF0aW9uKSBmcm9tIHRoaXMgRGF0ZVRpbWVcblx0ICogYW5kIHJldHVybiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufSBkdXJhdGlvblxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQSBuZXcgaW5zdGFuY2Ugb2YgRGF0ZVRpbWUgZm9yIHRoZSBuZXcgZGF0ZSBhbmQgdGltZS5cblx0ICovXG5cdG1pbnVzKCBkdXJhdGlvbiApIHtcblx0XHREdXJhdGlvbi5hc3NlcnRJc1ZhbGlkRHVyYXRpb24oIGR1cmF0aW9uICk7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0LnN1YnRyYWN0KCBkdXJhdGlvbi50b09iamVjdCgpIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBhIHBlcmlvZCBvZiB0aW1lIChyZXByZXNlbnRlZCBieSBhIER1cmF0aW9uKSB0byB0aGlzIERhdGVUaW1lIGFuZFxuXHQgKiByZXR1cm4gdGhlIHJlc3VsdGluZyBEYXRlVGltZVxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufSBkdXJhdGlvblxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQSBuZXcgaW5zdGFuY2Ugb2YgRGF0ZVRpbWUgZm9yIHRoZSBuZXcgZGF0ZSBhbmQgdGltZS5cblx0ICovXG5cdHBsdXMoIGR1cmF0aW9uICkge1xuXHRcdER1cmF0aW9uLmFzc2VydElzVmFsaWREdXJhdGlvbiggZHVyYXRpb24gKTtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5mcm9tTW9tZW50KFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQuYWRkKCBkdXJhdGlvbi50b09iamVjdCgpIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgdmFsdWUgb2YgdGhpcyBEYXRlVGltZSB0byB0aGUgYmVnaW5uaW5nIG9mIGEgc3BlY2lmaWVkIHVuaXQgb2Zcblx0ICogdGltZSBhbmQgcmV0dXJuIGEgbmV3IERhdGVUaW1lIHJlcHJlc2VudGluZyB0aGF0LlxuXHQgKlxuXHQgKiBlZy5cblx0ICogc3RhcnRPZiggRGF0ZVRpbWUuVU5JVF9ZRUFSICkgLy9zZXRzIHRvIEphbnVhcnkgMXN0LCAxMjowMGFtIHRoaXNcblx0ICogeWVhci5cblx0ICogc3RhcnRPZiggRGF0ZVRpbWUuVU5JVF9NT05USCApIC8vc2V0cyB0byB0aGUgZmlyc3Qgb2YgdGhpcyBtb250aCwgMTI6MDBhbVxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdW5pdFxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQSBuZXcgaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXJ0T2YoIHVuaXQgKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uY2xvbmUoKS5zdGFydE9mKCB1bml0IClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEYXRlVGltZSBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvXG5cdCAqIHRoZSBzcGVjaWZpZWQgZm9ybWF0IHN0cmluZy5cblx0ICpcblx0ICogQGxpbmsgaHR0cHM6Ly9tb21lbnRqcy5jb20vZG9jcy8jL2Rpc3BsYXlpbmcvZm9ybWF0L1xuXHQgKiBAc2VlIE1vbWVudCBmb3JtYXQgXl4gc2VjdGlvbiBmb3IgdGhlIGF2YWlsYWJsZSBmb3JtYXRzIHRoYXQgY2FuIGJlIHVzZWQuXG5cdCAqXG5cdCAqIEFuIGVtcHR5IGZvcm1hdCB2YWx1ZSB3aWxsIHJldHVybiB0aGUgc3RyaW5nIGZvcm1hdHRlZCBpbiBJU08gODYwMSB3aXRoXG5cdCAqIGFueSBvZmZzZXQgaW5jbHVkZWQuXG5cdCAqXG5cdCAqIFdpdGhvdXQgYW55IGFyZ3VtZW50IHBhc3NlZCwgdGhlIGZvcm1hdCB3aWxsIGJlIHdoYXRldmVyIHN0cmluZyB0aGVcblx0ICogZm9ybWF0IGlzIHNlcnZlciBzaWRlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0XG5cdCAqIEByZXR1cm4ge3N0cmluZ30gIFRoZSBkYXRlIGFuZCB0aW1lIGRpc3BsYXllZCBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVkXG5cdCAqIGZvcm1hdC5cblx0ICovXG5cdHRvRm9ybWF0KCBmb3JtYXQgPSBERUZBVUxUX0ZPUk1BVCApIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5mb3JtYXQoIGZvcm1hdCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEYXRlVGltZSBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvXG5cdCAqIHRoZSBJU08gODYwMSBzdGFuZGFyZC5cblx0ICpcblx0ICogSWYgYGluVVRDYCBpcyB0cnVlIChkZWZhdWx0KSB0aGVuIGB0b0lTT2Agd2lsbCByZXR1cm4gdGhlIElTTyBzdHJpbmcgaW5cblx0ICogVVRDLiBPdGhlcndpc2UgaXQgd2lsbCBpbmNsdWRlIHRoZSBvZmZzZXQgaW5mb3JtYXRpb24gZm9yIHRoZSBpbnRlcm5hbFxuXHQgKiB0aW1lem9uZS9vZmZzZXQgb24gdGhlIG1vbWVudCBpbiB0aW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGluVVRDXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gQW4gSVNPODYwMSBzdHJpbmdcblx0ICovXG5cdHRvSVNPKCBpblVUQyA9IHRydWUgKSB7XG5cdFx0cmV0dXJuIGluVVRDID9cblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0udG9JU09TdHJpbmcoKSA6XG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnRvSVNPU3RyaW5nKCB0cnVlICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgdmFsdWUgZm9yIHRoaXMgRGF0ZVRpbWUgYXMgYSBqYXZhc2NyaXB0IERhdGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtEYXRlfSBBIGphdmFzY3JpcHQgRGF0ZSBpbnN0YW5jZVxuXHQgKi9cblx0dG9KU0RhdGUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0udG9EYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogV2hlbiBzZXJpYWxpemluZyBhbiBvYmplY3QgdG8gSlNPTiwgaWYgdGhlcmUgaXMgYSBEYXRlVGltZSBpbnN0YW5jZSwgaXRcblx0ICogd2lsbCBiZSByZXByZXNlbnRlZCBhcyBhbiBJU084NjAxIHN0cmluZy5cblx0ICpcblx0ICogQHJldHVybiB7c3RyaW5nfSBBbiBJU08gODYwMSBzdHJpbmdcblx0ICovXG5cdHRvSlNPTigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS50b0lTT1N0cmluZygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgRGF0ZVRpbWUgdG8gd2hhdGV2ZXIgdGhlIFwibG9jYWxcIiB0aW1lIGlzLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIERhdGVUaW1lXG5cdCAqL1xuXHR0b0xvY2FsKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmNsb25lKCkubG9jYWwoKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgbWlsbGlzZWNvbmRzIHNpbmNlIHRoZSBVbml4IEVwb2NoIGZvciB0aGUgY3VycmVudCBEYXRlVGltZVxuXHQgKiBpbnN0YW5jZS5cblx0ICogQHJldHVybiB7bnVtYmVyfSBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIHNpbmNlIFVuaXggRXBvY2hcblx0ICovXG5cdHRvTWlsbGlzKCkge1xuXHRcdHJldHVybiB0aGlzLnZhbHVlT2YoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgc2ltcGxlIG9iamVjdCBjb250YWluaW5nIHllYXIsIG1vbnRoLCBkYXksIGhvdXIsXG5cdCAqIG1pbnV0ZSwgc2Vjb25kLCBhbmQgbWlsbGlzZWNvbmQuXG5cdCAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IHdpdGggeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsXG5cdCAqIGFuZCBtaWxsaXNlY29uZC5cblx0ICovXG5cdHRvT2JqZWN0KCkge1xuXHRcdGNvbnN0IGRhdGV0aW1lID0gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS50b09iamVjdCgpO1xuXHRcdHJldHVybiByZWR1Y2UoIGRhdGV0aW1lLCAoIHJlc3VsdCwgdmFsdWUsIGtleSApID0+IHtcblx0XHRcdGtleSA9IHRoaXMuY29uc3RydWN0b3JbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXROYW1lIF0oIGtleSApO1xuXHRcdFx0cmVzdWx0WyBrZXkgXSA9IHRoaXMuY29uc3RydWN0b3JbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRWYWx1ZSBdKFxuXHRcdFx0XHRrZXksXG5cdFx0XHRcdHZhbHVlLFxuXHRcdFx0XHRmYWxzZVxuXHRcdFx0KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSwge30gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyB0aGUgRGF0ZVRpbWUncyB0aW1lem9uZSB0byBVVEMuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0dG9VVEMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uY2xvbmUoKS51dGMoKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBlbmdsaXNoIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lIHdoZW4gdGhlIGluc3RhbmNlIGlzXG5cdCAqIGNvZXJjZWQgdG8gYSBzdHJpbmcgKHNpbWlsYXIgZm9ybWF0IHRvIEpTIGBEYXRlLnRvU3RyaW5nKClgLlxuXHQgKlxuXHQgKiBlZyBgVHVlIERlYyAyNSAyMDE4IDEwOjE1OjAwIEdNVCswMDAwYFxuXHQgKlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IEEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWVcblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnRvU3RyaW5nKCk7XG5cdH1cblxuXHQvKipcblx0ICogV2hlbiBEYXRlVGltZSBpcyBjb2VyY2VkIHRvIG51bWJlciB0aGlzIHdpbGwgZW5zdXJlIGl0cyBkaXNwbGF5ZWQgYXMgdGhlXG5cdCAqIG51bWJlciBvZiBtaWxsaXNlY29uZHMgc2luY2UgdGhlIFVuaXggRXBvY2ggZm9yIHRoZSBjdXJyZW50IERhdGVUaW1lXG5cdCAqXG5cdCAqIEByZXR1cm4ge251bWJlcn0gQW1vdW50IG9mIG1pbGxpc2Vjb25kcyBzaW5jZSB0aGUgVW5peCBFcG9jaFxuXHQgKi9cblx0dmFsdWVPZigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS52YWx1ZU9mKCk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGVzZSBzdGF0aWMgcHJvcGVydGllcyBuZWVkIHRvIGJlIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgY2xhc3MgZGVmaW5pdGlvblxuICogYmVjYXVzZSBvZiBjb21waWxlIGlzc3Vlcy5cbiAqL1xuRGF0ZVRpbWUuVU5JVF9ZRUFSID0gJ3llYXInO1xuRGF0ZVRpbWUuVU5JVF9NT05USCA9ICdtb250aCc7XG5EYXRlVGltZS5VTklUX0RBWSA9ICdkYXknO1xuRGF0ZVRpbWUuVU5JVF9IT1VSID0gJ2hvdXInO1xuRGF0ZVRpbWUuVU5JVF9NSU5VVEUgPSAnbWludXRlJztcbkRhdGVUaW1lLlVOSVRfU0VDT05EID0gJ3NlY29uZCc7XG5EYXRlVGltZS5VTklUX01JTExJU0VDT05EID0gJ21pbGxpc2Vjb25kJztcbkRhdGVUaW1lLlRJTUVaT05FX0xPQ0FMID0gJ2xvY2FsJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRUSU1FWk9ORV9DT05GSUcsXG5cdFNFUlZFUl9MT0NBTEUsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHtcblx0Rk9STUFUX1NJVEVfREFURSxcblx0Rk9STUFUX1NJVEVfVElNRSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaGVscGVycyc7XG5pbXBvcnQgeyB2YWxpZGF0ZUxvY2FsZSB9IGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5cbmltcG9ydCB7IHNuYWtlQ2FzZSB9IGZyb20gJ2xvZGFzaCc7XG4vKipcbiAqIERlZmF1bHQgdGltZXpvbmUgc3RyaW5nIHRvIHVzZS5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9USU1FWk9ORV9TVFJJTkcgPSBUSU1FWk9ORV9DT05GSUcuc3RyaW5nID09PSAnJyA/XG5cdCdVVEMnIDpcblx0VElNRVpPTkVfQ09ORklHLnN0cmluZztcblxuLyoqXG4gKiBEZWZhdWx0IG9mZnNldFxuICpcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX09GRlNFVCA9IFRJTUVaT05FX0NPTkZJRy5vZmZzZXQ7XG5cbi8qKlxuICogV2hldGhlciB0aGVyZSBpcyBhIGRlZmF1bHQgdGltZXpvbmUgc3RyaW5nIHRvIHVzZS5cbiAqIFRoaXMgaGVscHMgd2l0aCBkZXRlcm1pbmluZyB3aGV0aGVyIHRvIHVzZSB0aGUgb2Zmc2V0IG9yIG5vdCBmb3IgY29uc3RydWN0aW5nXG4gKiBEYXRlVGltZSB2YWx1ZSBvYmplY3RzLlxuICpcbiAqIEB0eXBlIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgSEFTX1RJTUVaT05FX1NUUklORyA9IChcblx0REVGQVVMVF9USU1FWk9ORV9TVFJJTkcgIT09ICdVVEMnIHx8XG5cdCEgKCBERUZBVUxUX1RJTUVaT05FX1NUUklORyA9PT0gJ1VUQycgJiYgREVGQVVMVF9PRkZTRVQgIT09IDAgKVxuKTtcblxuLyoqXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfRk9STUFUID0gRk9STUFUX1NJVEVfREFURSArICcgJyArIEZPUk1BVF9TSVRFX1RJTUU7XG5cbi8qKlxuICogRXhwb3NlcyB3aGF0IHRvIHVzZSBmb3IgdGhlIGRlZmF1bHQgbG9jYWxlLlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9DQUxFID0gc25ha2VDYXNlKCBTRVJWRVJfTE9DQUxFLnVzZXIgKTtcblxuLyoqXG4gKiBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgcHJvdmlkZWQgbG9jYWxlIGlzIHZhbGlkLiAgU28gaWYgYERFRkFVTFRfTE9DQUxFYCBpc1xuICogbm90IHZhbGlkIGZvciB0aGlzIGVudmlyb25tZW50LCB0aGVuIGEgZmFsbGJhY2sgb2YgJ2VuJyBsb2NhbGUgaXMgdXNlZC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9WQUxJRF9MT0NBTEUgPSB2YWxpZGF0ZUxvY2FsZSggREVGQVVMVF9MT0NBTEUgKSA/XG5cdERFRkFVTFRfTE9DQUxFIDpcblx0J2VuJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgbW9tZW50RHVyYXRpb25Gb3JtYXRTZXR1cCBmcm9tICdtb21lbnQtZHVyYXRpb24tZm9ybWF0JztcbmltcG9ydCB7IGNhcGl0YWxpemUsIHBpY2ssIGtleXMsIG9taXQsIG1hcFZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgaXNTaGFsbG93RXF1YWwgZnJvbSAnQHdvcmRwcmVzcy9pcy1zaGFsbG93LWVxdWFsJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuaW1wb3J0IHsgaW5zdGFuY2VPZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgYXNzZXJ0aW9ucyBmcm9tICcuL2Fzc2VydGlvbnMnO1xuaW1wb3J0IHtcblx0REVGQVVMVF9WQUxJRF9MT0NBTEUsXG59IGZyb20gJy4vZGVmYXVsdHMnO1xuXG5tb21lbnREdXJhdGlvbkZvcm1hdFNldHVwKCBtb21lbnQgKTtcblxuLyoqXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc3ltYm9scyB1c2VkIGZvciBcInByaXZhdGVcIiBwcm9wZXJ0aWVzIGluIHRoZSBEdXJhdGlvbiBvYmplY3QuXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRkdXJhdGlvbjogU3ltYm9sLFxuICogXHRcdHZhbHVlczogU3ltYm9sLFxuICogXHRcdGlzVmFsaWQ6IFN5bWJvbCxcbiAqIFx0fVxuICogfVxuICovXG5jb25zdCBwcml2YXRlUHJvcGVydGllcyA9IHtcblx0ZHVyYXRpb246IFN5bWJvbCggJ0R1cmF0aW9uUHJpdmF0ZVByb3BlcnRpZXNEdXJhdGlvbicgKSxcblx0ZHVyYXRpb25WYWx1ZXM6IFN5bWJvbCggJ0R1cmF0aW9uUHJpdmF0ZVByb3BlcnRpZXNEdXJhdGlvblZhbHVlcycgKSxcblx0aXNWYWxpZDogU3ltYm9sKCAnRHVyYXRpb25Qcml2YXRlUHJvcGVydGllc0lzVmFsaWQnICksXG59O1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBzeW1ib2xzIHVzZWQgZm9yIFwicHJpdmF0ZVwiIG1ldGhvZHMgaW4gdGhlIER1cmF0aW9uIG9iamVjdC5cbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGNyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzOiBTeW1ib2wsXG4gKiBcdFx0Z2V0QWxsVW5pdE5hbWVzOiBTeW1ib2wsXG4gKiBcdFx0cG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb246IFN5bWJvbCxcbiAqIFx0XHRzZXRWYWx1ZXM6IFN5bWJvbCxcbiAqIFx0ICAgIGZpbHRlclZhbHVlczogU3ltYm9sLFxuICogXHR9XG4gKiB9XG4gKi9cbmNvbnN0IHByaXZhdGVNZXRob2RzID0ge1xuXHRjcmVhdGVHZXR0ZXJzOiBTeW1ib2woICdEdXJhdGlvblByaXZhdGVNZXRob2RzQ3JlYXRlR2V0dGVycycgKSxcblx0Z2V0QWxsVW5pdE5hbWVzOiBTeW1ib2woICdEdXJhdGlvblByaXZhdGVNZXRob2RzR2V0QWxsVW5pdE5hbWVzJyApLFxuXHRwb3B1bGF0ZVZhbHVlc0Zyb21EdXJhdGlvbjogU3ltYm9sKFxuXHRcdCdEdXJhdGlvblByaXZhdGVNZXRob2RzUG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb24nXG5cdCksXG5cdHNldFZhbHVlczogU3ltYm9sKCAnRHVyYXRpb25Qcml2YXRlTWV0aG9kc1NldFZhbHVlcycgKSxcblx0ZmlsdGVyVmFsdWVzOiBTeW1ib2woICdEdXJhdGlvblByaXZhdGVNZXRob2RzRmlsdGVyVmFsdWVzJyApLFxufTtcblxuLyoqXG4gKiBBbiBhcnJheSBvZiB1bml0IG5hbWVzIGZvciBwcm9wZXJ0aWVzIGluIHRoZSBEdXJhdGlvbiBvYmplY3RcbiAqIEB0eXBlIHtzdHJpbmdbXX1cbiAqL1xuY29uc3QgdW5pdE5hbWVzID0gW1xuXHQneWVhcnMnLFxuXHQnbW9udGhzJyxcblx0J2RheXMnLFxuXHQnaG91cnMnLFxuXHQnbWludXRlcycsXG5cdCdzZWNvbmRzJyxcblx0J21pbGxpc2Vjb25kcycsXG5dO1xuXG4vKipcbiAqIEFuIGFycmF5IG9mIGRlcml2YXRpdmUgdW5pdCBuYW1lcy5cbiAqIFRoZXNlIGFyZSBhY2Nlc3NvcnMgdGhhdCBhcmUgZGVyaXZhdGl2ZXMgb2YgYmFzZSB1bml0cy4gIEZvciBpbnN0YW5jZSxcbiAqIFwid2Vla3NcIiBlbmRzIHVwIGJlaW5nIGEgZGVyaXZhdGl2ZSAoY2FsY3VsYXRlZCBmcm9tKSB0aGUgXCJkYXlzXCIgdW5pdC5cbiAqIEB0eXBlIHtzdHJpbmdbXX1cbiAqL1xuY29uc3QgZGVyaXZhdGl2ZVVuaXROYW1lcyA9IFtcblx0J3dlZWtzJyxcbl07XG5cbi8qKlxuICogV2hlcmUgYSBEYXRlVGltZSBvYmplY3QgcmVwcmVzZW50cyBhIHNpbmdsZSBwb2ludCBpbiB0aW1lLCBhIER1cmF0aW9uIG9iamVjdFxuICogcmVwcmVzZW50cyBhIGxlbmd0aCBvZiB0aW1lLlxuICpcbiAqIER1cmF0aW9ucyBkbyBub3QgaGF2ZSBhIGRlZmluZWQgYmVnaW5uaW5nIGFuZCBlbmQgZGF0ZS4gIFRoZXkgYXJlIGNvbnRleHRsZXNzLlxuICpcbiAqIEFzIGFuIGV4YW1wbGUsIGR1cmF0aW9ucyBhcmUgcmVwcmVzZW50YXRpdmUgb2Ygc29tZXRoaW5nIGxpa2UgXCIyIGhvdXJzXCIgYW5kXG4gKiBub3QgcmVwcmVzZW50YXRpdmUgb2Ygc29tZXRoaW5nIGxpa2UgXCJiZXR3ZWVuIDFwbSBhbmQgM3BtXCIuXG4gKlxuICogSW50ZXJuYWxseSwgdGhlIER1cmF0aW9uIGNsYXNzIGhlcmUgdXNlcyBgbW9tZW50LkR1cmF0aW9uYC4gIFRoaXMgaXMgYW5cbiAqIGFic3RyYWN0aW9uIGxvb3NlbHkgZm9sbG93aW5nIHRoZSBhZGFwdGVyIHBhdHRlcm4gc28gdGhhdCB0aGVyZSBpcyBhIGNvbW1vblxuICogYXBpIHRoYXQgY2FuIGJlIGRlcGVuZGVkIG9uIGlmIGluIHRoZSBmdXR1cmUgdGhlIGludGVybmFsIGxpYnJhcnkgaXMgc3dpdGNoZWRcbiAqIHRvIHNvbWV0aGluZyBkaWZmZXJlbnQgKHN1Y2ggYXMgTHV4b24pLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEdXJhdGlvbiB7XG5cdHN0YXRpYyBVTklUX1lFQVJTID0gJ3llYXJzJztcblx0c3RhdGljIFVOSVRfTU9OVEhTID0gJ21vbnRocyc7XG5cdHN0YXRpYyBVTklUX0RBWVMgPSAnZGF5cyc7XG5cdHN0YXRpYyBVTklUX0hPVVJTID0gJ2hvdXJzJztcblx0c3RhdGljIFVOSVRfTUlOVVRFUyA9ICdtaW51dGVzJztcblx0c3RhdGljIFVOSVRfU0VDT05EUyA9ICdzZWNvbmRzJztcblx0c3RhdGljIFVOSVRfTUlMTElTRUNPTkRTID0gJ21pbGxpc2Vjb25kcyc7XG5cdHN0YXRpYyBVTklUX1dFRUtTID0gJ3dlZWtzJztcblxuXHQvKipcblx0ICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgRHVyYXRpb24gY2xhc3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fG1vbWVudC5EdXJhdGlvbnxzdHJpbmd8bnVtYmVyfSB2YWx1ZXNcblx0ICogUmVjZWl2aW5nIGEgbW9tZW50LkR1cmF0aW9uIG9iamVjdCBpcyBzb21ldGhpbmcgZm9yIGludGVybmFsIHVzZSBhbmQgc2hvdWxkIG5vdCBiZSB1c2VkIGRpcmVjdGx5IHZpYVxuXHQgKiBjbGllbnQgY29kZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZSAgQSB2YWxpZCBsb2NhbGUgc3RyaW5nLlxuXHQgKiBcdFx0XHRcdFx0XHRcdEBsaW5rIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzU2NDZcblx0ICovXG5cdGNvbnN0cnVjdG9yKCB2YWx1ZXMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmlzVmFsaWQgXSA9IHRydWU7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0XHRpZiAoIHR5cGVvZiB2YWx1ZXMgIT09ICdvYmplY3QnICkge1xuXHRcdFx0dmFsdWVzID0gbW9tZW50LmR1cmF0aW9uKCB2YWx1ZXMgKS5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdH1cblx0XHRpZiAoIG1vbWVudC5pc0R1cmF0aW9uKCB2YWx1ZXMgKSApIHtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF0gPSB2YWx1ZXM7XG5cdFx0XHR0aGlzWyBwcml2YXRlTWV0aG9kcy5wb3B1bGF0ZVZhbHVlc0Zyb21EdXJhdGlvbiBdKCB2YWx1ZXMgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFsdWVzID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMuZmlsdGVyVmFsdWVzIF0oIHZhbHVlcyApO1xuXHRcdFx0dGhpc1sgcHJpdmF0ZU1ldGhvZHMuc2V0VmFsdWVzIF0oIHZhbHVlcyApO1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXSA9IG1vbWVudC5kdXJhdGlvbihcblx0XHRcdFx0dmFsdWVzXG5cdFx0XHQpLmxvY2FsZSggbG9jYWxlICk7XG5cdFx0fVxuXHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmNyZWF0ZUdldHRlcnMgXSgpO1xuXHRcdE9iamVjdC5mcmVlemUoIHRoaXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgRHVyYXRpb24gZnJvbSBhIG51bWJlciBvZiBtaWxsaXNlY29uZHMuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBtaWxsaXNlY29uZHNcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gIEFuIGluc3RhbmNlIG9mIER1cmF0aW9uLlxuXHQgKi9cblx0c3RhdGljIGZyb21NaWxsaXNlY29uZHMoIG1pbGxpc2Vjb25kcywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUgKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbiggeyBtaWxsaXNlY29uZHMgfSwgbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uIGZyb20gYSBzaW1wbGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzICBLZXlzIHNob3VsZCBiZSB0aGUgdW5pdHMgKGVnICd5ZWFycycsICdkYXlzJykuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RHVyYXRpb259IEFuIGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRzdGF0aWMgZnJvbU9iamVjdCggdmFsdWVzLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSApIHtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKCB2YWx1ZXMsIGxvY2FsZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBEdXJhdGlvbiBmcm9tIGFuIElTTzg2MDEgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gSVNPU3RyaW5nIChlZy4gJ1BUMjNIJylcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQW4gaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdHN0YXRpYyBmcm9tSVNPKCBJU09TdHJpbmcsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SVNPODYwMUlzVmFsaWQoIElTT1N0cmluZywgdHJ1ZSApO1xuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oIElTT1N0cmluZywgbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGUgd2hldGhlciB0aGUgcHJvdmlkZWQgbG9jYWxlIGFyZ3VtZW50IGlzIGEgdmFsaWQgbG9jYWxlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIGlzVmFsaWRMb2NhbGUoIGxvY2FsZSApIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZUxvY2FsZSggbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCBsb2NhbGUgYXJndW1lbnQgaXMgYSB2YWxpZCBsb2NhbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHRocm93cyBJbnZhbGlkTG9jYWxlXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNWYWxpZExvY2FsZSggbG9jYWxlICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGUgd2hldGhlciB0aGUgcHJvdmlkZWQgc3RyaW5nIGlzIGEgdmFsaWQgSVNPIDg2MDEgRHVyYXRpb24gc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaXNvU3RyaW5nXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgaXQgaXMgdmFsaWQuXG5cdCAqL1xuXHRzdGF0aWMgaXNWYWxpZElTTzg2MDFEdXJhdGlvbiggaXNvU3RyaW5nICkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlSVNPODYwMSggaXNvU3RyaW5nLCB0cnVlICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0IHdoZXRoZXIgdGhlIHByb3ZpZGVkIHN0cmluZyBpcyBhIHZhbGlkIElTTyA4NjAxIER1cmF0aW9uIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlzb1N0cmluZ1xuXHQgKiBAdGhyb3dzIEludmFsaWRJU084NjAxU3RyaW5nXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNWYWxpZElTTzg2MDFEdXJhdGlvbiggaXNvU3RyaW5nICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SVNPODYwMUlzVmFsaWQoIGlzb1N0cmluZyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIGluc3RhbmNlIG9mIER1cmF0aW9uLlxuXHQgKiBAcGFyYW0ge21peGVkfER1cmF0aW9ufWR1cmF0aW9uXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIGEgdmFsaWQgRHVyYXRpb24gb2JqZWN0LlxuXHQgKi9cblx0c3RhdGljIGlzVmFsaWREdXJhdGlvbiggZHVyYXRpb24gKSB7XG5cdFx0cmV0dXJuIGluc3RhbmNlT2YoIGR1cmF0aW9uLCAnRHVyYXRpb24nICkgJiZcblx0XHRcdGR1cmF0aW9uLmlzVmFsaWQ7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIER1cmF0aW9uIGFuZCB0aHJvd3MgYW5cblx0ICogZXhjZXB0aW9uIGlmIG5vdC5cblx0ICogQHBhcmFtIHttaXhlZHxEdXJhdGlvbn0gZHVyYXRpb25cblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc1ZhbGlkRHVyYXRpb24oIGR1cmF0aW9uICkge1xuXHRcdGlmICggISBEdXJhdGlvbi5pc1ZhbGlkRHVyYXRpb24oIGR1cmF0aW9uICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhpcyBEdXJhdGlvbiBvYmplY3QgaXMgbm90IHZhbGlkLidcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEdXJhdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbnxtaXhlZH0gZHVyYXRpb25cblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhlIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uLlxuXHQgKiBOb3RlOiB0cnVlIG1heSBzdGlsbCBtZWFuIHRoYXQgdGhlIER1cmF0aW9uIGluc3RhbmNlIGlzIG5vdCB2YWxpZCFcblx0ICovXG5cdHN0YXRpYyBpc0R1cmF0aW9uKCBkdXJhdGlvbiApIHtcblx0XHRyZXR1cm4gaW5zdGFuY2VPZiggZHVyYXRpb24sICdEdXJhdGlvbicgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uIGFuZCBpZiBub3Rcblx0ICogdGhyb3dzIGFuIGV4Y2VwdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbnxtaXhlZH0gZHVyYXRpb25cblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc0R1cmF0aW9uKCBkdXJhdGlvbiApIHtcblx0XHRpZiAoICEgRHVyYXRpb24uaXNEdXJhdGlvbiggZHVyYXRpb24gKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuIGluc3RhbmNlIG9mIER1cmF0aW9uLidcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgZmlsdGVycyB0aGUgaW5jb21pbmcgdmFsdWVzIGFuZCByZXR1cm5zIG9ubHkga2V5L3ZhbHVlIHBhaXJzIHRoYXRcblx0ICogYXJlIGFjY2VwdGFibGUgYXMgZHVyYXRpb24gdW5pdHMuXG5cdCAqXG5cdCAqIElmIGEgaW52YWxpZCBkdXJhdGlvbiB1bml0IGlzIGRpc2NvdmVyZWQsIGEgY29uc29sZS5lcnJvciBpcyBnZW5lcmF0ZWRcblx0ICogKGluIG5vbi1wcm9kdWN0aW9uIG1vZGUpLlxuXHQgKlxuXHQgKiBAcGFyYW0ge21peGVkfSB2YWx1ZXNcblx0ICogQHJldHVybiB7T2JqZWN0fSBGaWx0ZXJlZCB2YWx1ZXMuXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yIGlmIGluY29taW5nIHZhbHVlcyBhcmd1bWVudCBpcyBub3QgYW4gb2JqZWN0LlxuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5maWx0ZXJWYWx1ZXMgXSggdmFsdWVzICkge1xuXHRcdGlmICggdHlwZW9mIHZhbHVlcyAhPT0gJ29iamVjdCcgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnSW5jb21pbmcgdmFsdWVzIG11c3QgYmUgYSBzaW1wbGUgb2JqZWN0LicgKTtcblx0XHR9XG5cdFx0Y29uc3QgdmFsdWVzVG9TZXQgPSBwaWNrKCB2YWx1ZXMsIHVuaXROYW1lcyApO1xuXHRcdGlmICggISBpc1NoYWxsb3dFcXVhbCggdmFsdWVzLCB2YWx1ZXNUb1NldCApICkge1xuXHRcdFx0d2FybmluZyhcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdCdUaGUgZm9sbG93aW5nIHVuZXhwZWN0ZWQga2V5cyB3ZXJlIGluIHRoZSBjb25maWd1cmF0aW9uICcgK1xuXHRcdFx0XHQnb2JqZWN0IGZvciBjb25zdHJ1Y3RpbmcgdGhlIER1cmF0aW9uOiAnICtcblx0XHRcdFx0a2V5cyggb21pdCggdmFsdWVzLCB1bml0TmFtZXMgKSApLmpvaW4oKVxuXHRcdFx0KTtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmlzVmFsaWQgXSA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWVzVG9TZXQ7XG5cdH1cblxuXHQvKipcblx0ICogVXNlZCB0byBzZXQgdGhlIGludGVybmFsIFwicHJpdmF0ZVwiIHZhbHVlcyBwcm9wZXJ0eS5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHZhbHVlc1xuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdFsgcHJpdmF0ZU1ldGhvZHMuc2V0VmFsdWVzIF0oIHZhbHVlcyApIHtcblx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvblZhbHVlcyBdID0ge307XG5cdFx0dW5pdE5hbWVzLmZvckVhY2goICggdW5pdCApID0+IHtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uVmFsdWVzIF1bIHVuaXQgXSA9IHZhbHVlc1sgdW5pdCBdIHx8XG5cdFx0XHRcdDA7XG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVzZWQgdG8gc2V0IHRoZSB2YWx1ZXMgXCJwcml2YXRlXCIgcHJvcGVydHkgZnJvbSBhIG1vbWVudC5EdXJhdGlvbiBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bW9tZW50LkR1cmF0aW9ufSBkdXJhdGlvblxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdFsgcHJpdmF0ZU1ldGhvZHMucG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb24gXSggZHVyYXRpb24gKSB7XG5cdFx0Y29uc3Qgc2V0VmFsdWVzID0ge307XG5cdFx0dW5pdE5hbWVzLmZvckVhY2goICggdW5pdCApID0+IHtcblx0XHRcdHNldFZhbHVlc1sgdW5pdCBdID0gZHVyYXRpb25bIHVuaXQgXSgpO1xuXHRcdH0gKTtcblx0XHR0aGlzWyBwcml2YXRlTWV0aG9kcy5zZXRWYWx1ZXMgXSggc2V0VmFsdWVzICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBhcnJheSBvZiBhY2Nlc3NvciBuYW1lcyAodGhhdCBpbiB0dXJuIGFyZSB1c2VkIGZvciBnZW5lcmF0aW5nXG5cdCAqIHByaXZhdGUgcHJvcGVydGllcykuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKiBAcmV0dXJuIHtzdHJpbmdbXX0gIEFycmF5IG9mIGFjY2Vzc29yIG5hbWVzLlxuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5nZXRBbGxVbml0TmFtZXMgXSgpIHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0Li4udW5pdE5hbWVzLFxuXHRcdFx0Li4uZGVyaXZhdGl2ZVVuaXROYW1lcyxcblx0XHRdO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgZ2V0dGVycyBmb3IgdGhlIER1cmF0aW9uIGluc3RhbmNlIGZyb20gdGhlIGFjY2Vzc29yIG5hbWVzLlxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdFsgcHJpdmF0ZU1ldGhvZHMuY3JlYXRlR2V0dGVycyBdKCkge1xuXHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmdldEFsbFVuaXROYW1lcyBdKCkuZm9yRWFjaChcblx0XHRcdCggYWNjZXNzb3JOYW1lICkgPT4ge1xuXHRcdFx0XHQvLyBjcmVhdGVzIGFjY2Vzc29yIGZvciBnZXR0aW5nIHRoZSB2YWx1ZSB2aWEgYSBwcm9wZXJ0eVxuXHRcdFx0XHQvLyBlZy4gaW5zdGFuY2UuaG91cnNcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCB0aGlzLCBhY2Nlc3Nvck5hbWUsIHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGRlcml2YXRpdmVVbml0TmFtZXMuaW5kZXhPZiggYWNjZXNzb3JOYW1lICkgPiAtMSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF1bIGFjY2Vzc29yTmFtZSBdKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpc1xuXHRcdFx0XHRcdFx0XHRbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uVmFsdWVzIF1cblx0XHRcdFx0XHRcdFx0WyBhY2Nlc3Nvck5hbWUgXSB8fFxuXHRcdFx0XHRcdFx0XHQwO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0Ly8gY3JlYXRlcyBgYXMqYCBtZXRob2RzLlxuXHRcdFx0XHQvLyBlZyBgaW5zdGFuY2UuYXNIb3Vyc2Agd291bGQgcmV0dXJuIHRoZSBnaXZlbiBkdXJhdGlvblxuXHRcdFx0XHQvLyBleHByZXNzZWQgYXMgdGhlIGhvdXJzIHVuaXQuXG5cdFx0XHRcdC8vIG5vdGUgZm9yIHVuaXRzIHN1Y2ggYXMgXCJ5ZWFyc1wiIGFuZCBcIm1vbnRoc1wiLCB0aGlzIHVzZXMgd2hhdFxuXHRcdFx0XHQvLyBpcyB0ZXJtZWQgYXMgXCJsb25ndGVybVwiIGNhbGN1bGF0aW9uLiBMb25ndGVybSBpcyBiYXNlZCBvblxuXHRcdFx0XHQvLyBhIDQwMCB5ZWFyIGN5Y2xlIGF2ZXJhZ2luZyBvdXQgdGhlIGRheXMgaW4gYSBtb250aCBhbmRcblx0XHRcdFx0Ly8gZGF5cyBpbiBhIHllYXIgb3ZlciB0aGF0IGN5Y2xlLlxuXHRcdFx0XHQvLyBAbGluayBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9ibG9iL2RldmVsb3Avc3JjL2xpYi9kdXJhdGlvbi9idWJibGUuanMjTDUyXG5cdFx0XHRcdGNvbnN0IGFzTWV0aG9kTmFtZSA9ICdhcycgKyBjYXBpdGFsaXplKCBhY2Nlc3Nvck5hbWUgKTtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCB0aGlzLCBhc01ldGhvZE5hbWUsIHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHRcdFx0XHRcdFsgYXNNZXRob2ROYW1lIF0oKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgdmFsdWUgb2YgbG9jYWxlLlxuXHQgKiBlZy4gaW5zdGFuY2UubG9jYWxlXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGxvY2FsZSBzdHJpbmcuXG5cdCAqL1xuXHRnZXQgbG9jYWxlKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLmxvY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjdXJyZW50IER1cmF0aW9uIGluc3RhbmNlIHJlcHJlc2VudHMgYSB2YWxpZFxuXHQgKiBkdXJhdGlvbi5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGUgRHVyYXRpb24gaW5zdGFuY2UgaXMgdmFsaWQuXG5cdCAqL1xuXHRnZXQgaXNWYWxpZCgpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuaXNWYWxpZCBdICYmXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLnRvSVNPU3RyaW5nKCkgIT09ICdQMEQnO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBuZXcgRHVyYXRpb24gaW5zdGFuY2UgdGhhdCBpcyBpZGVudGljYWwgdG8gdGhpcyBleGNlcHQgdGhlXG5cdCAqIGxvY2FsZSBpcyBjaGFuZ2VkIHRvIHdoYXQgd2FzIHByb3ZpZGVkLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBIG5ldyBpbnN0YW5jZSBvZiBEdXJhdGlvblxuXHQgKi9cblx0c2V0TG9jYWxlKCBsb2NhbGUgKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbiggdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb25WYWx1ZXMgXSwgbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogUmVkdWNlIHRoaXMgRHVyYXRpb24gdG8gaXRzIGNhbm9uaWNhbCByZXByZXNlbnRhdGlvbiBpbiBpdHMgY3VycmVudCB1bml0cy5cblx0ICpcblx0ICogRm9yIGV4YW1wbGU6XG5cdCAqIER1cmF0aW9uXG5cdCAqICAgICAuZnJvbU9iamVjdCh7IHllYXJzOiAyLCBkYXlzOiA1MDAwIH0pXG5cdCAqICAgICAubm9ybWFsaXplKClcblx0ICogICAgIC50b09iamVjdCgpIC8vPT4geyB5ZWFyczogMTUsIG1vbnRoczogOCwgZGF5czogMTIgfVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQSBuZXcgaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdG5vcm1hbGl6ZSgpIHtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKCB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBEdXJhdGlvbiBpbnN0YW5jZSBpcyB0aGUgc2FtZSBhcyB0aGlzXG5cdCAqIER1cmF0aW9uIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufG1peGVkfSBvdGhlckR1cmF0aW9uXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhhdCB0aGUgY29tcGFyZWQgZHVyYXRpb25zIGhhdmUgdGhlIHNhbWVcblx0ICogdW5pdHMgYW5kIHRoZSBzYW1lIHZhbHVlcyBmb3IgZWFjaCB1bml0IChhcyB3ZWxsIGFzIHNhbWUgbG9jYWxlKS4gVGhpc1xuXHQgKiBtZWFucyB0aGF0IGEgZHVyYXRpb24gd2l0aHsgbWludXRlczogNjAgfSB3b3VsZCBiZSBjb25zaWRlcmVkIG5vdCBlcXVhbFxuXHQgKiB0byBhIGR1cmF0aW9uIHdpdGggeyBob3VyczogMSB9LlxuXHQgKi9cblx0c2FtZUFzKCBvdGhlckR1cmF0aW9uICkge1xuXHRcdER1cmF0aW9uLmFzc2VydElzRHVyYXRpb24oIG90aGVyRHVyYXRpb24gKTtcblx0XHRpZiAoICEgdGhpcy5pc1ZhbGlkIHx8ICEgb3RoZXJEdXJhdGlvbi5pc1ZhbGlkICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAoIHRoaXMubG9jYWxlICE9PSBvdGhlckR1cmF0aW9uLmxvY2FsZSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIGlzU2hhbGxvd0VxdWFsKCB0aGlzLnRvT2JqZWN0KCksIG90aGVyRHVyYXRpb24udG9PYmplY3QoKSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgRHVyYXRpb24gaW5zdGFuY2UgaXMgZXF1YWwgdG8gdGhpcyBEdXJhdGlvblxuXHQgKiBpbnN0YW5jZS5cblx0ICpcblx0ICogRXF1YWxpdHkgaXMgYmFzZWQgb246XG5cdCAqIC0gbG9jYWxlIGlzIHRoZSBzYW1lXG5cdCAqIC0gdGhlIG5vcm1hbGl6ZWQgdmFsdWUgb2YgdGhlIGR1cmF0aW9uIGlzIHRoZSBzYW1lLiAgZWcgYSBkdXJhdGlvbiB3aXRoXG5cdCAqIHsgaG91cnM6IDI0IH0gd291bGQgYmUgY29uc2lkZXJlZCBlcXVhbCB0byBhIGR1cmF0aW9uIHdpdGggeyBkYXlzOiAxIH1cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbnxtaXhlZH0gb3RoZXJEdXJhdGlvblxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGNvbnNpZGVyZWQgZXF1YWxcblx0ICovXG5cdGVxdWFscyggb3RoZXJEdXJhdGlvbiApIHtcblx0XHREdXJhdGlvbi5hc3NlcnRJc0R1cmF0aW9uKCBvdGhlckR1cmF0aW9uICk7XG5cdFx0aWYgKCAhIHRoaXMuaXNWYWxpZCB8fCAhIG90aGVyRHVyYXRpb24uaXNWYWxpZCApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKCB0aGlzLmxvY2FsZSAhPT0gb3RoZXJEdXJhdGlvbi5sb2NhbGUgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBpc1NoYWxsb3dFcXVhbChcblx0XHRcdHRoaXMubm9ybWFsaXplKCkudG9PYmplY3QoKSxcblx0XHRcdG90aGVyRHVyYXRpb24ubm9ybWFsaXplKCkudG9PYmplY3QoKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogTWFrZSB0aGlzIGR1cmF0aW9uIGxvbmdlciBieSB0aGUgc3BlY2lmaWVkIGFtb3VudC5cblx0ICpcblx0ICogTm90ZTogdGhlIHJldHVybmVkIER1cmF0aW9uIHdpbGwgaGF2ZSB0aGUgbG9jYWxlIG9mIHRoZSBvcmlnaW5hbFxuXHQgKiByZWdhcmRsZXNzIHdoYXQgdGhlIGxvY2FsZSB3YXMgb24gYW55IHBhc3NlZCBpbiBkdXJhdGlvbi5cblx0ICpcblx0ICogVGhlIG5ldyBEdXJhdGlvbiByZXR1cm5lZCB3aWxsIGhhdmUgbm9ybWFsaXplZCB2YWx1ZXMgKGkuZS4gaWYgYWRkaXRpb25cblx0ICogb2Ygb25lIER1cmF0aW9uIHdpdGggYHsgaG91cnM6IDEwIH1gIGlzIGRvbmUgd2l0aCB0aGUgb3RoZXIgRHVyYXRpb25cblx0ICogaGF2aW5nIGB7IGhvdXJzOiAxNCB9YCB0aGVuIHRoZSBuZXcgRHVyYXRpb24gd2lsbCBoYXZlIGB7IGRheXM6IDEgfWAuXG5cdCAqIFlvdSBjYW4gc3RpbGwgZ2V0IHRoZSB0b3RhbCBob3VycyBieSBjYWxsaW5nIGBuZXdEdXJhdGlvbi5hc0hvdXJzKClgLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufE9iamVjdHxudW1iZXJ9IHZhbHVlICBFaXRoZXIgYSBEdXJhdGlvbiBpbnN0YW5jZSwgYVxuXHQgKiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIG9yIGFuIG9iamVjdCBpbiB0aGUgc2FtZSBzaGFwZSByZWNlaXZlZCBieVxuXHQgKiBEdXJhdGlvbi5mcm9tT2JqZWN0KClcblx0ICpcblx0ICogQHJldHVybiB7RHVyYXRpb259IEEgbmV3IGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRwbHVzKCB2YWx1ZSApIHtcblx0XHRpZiAoIER1cmF0aW9uLmlzRHVyYXRpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdXG5cdFx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0XHQuYWRkKCB2YWx1ZVsgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXSApXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHR2YWx1ZSA9IHRoaXNbIHByaXZhdGVNZXRob2RzLmZpbHRlclZhbHVlcyBdKCB2YWx1ZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQuYWRkKCB2YWx1ZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlIHRoaXMgZHVyYXRpb24gc2hvcnRlciBieSB0aGUgc3BlY2lmaWVkIGFtb3VudFxuXHQgKlxuXHQgKiBOb3RlOiB0aGUgcmV0dXJuZWQgRHVyYXRpb24gd2lsbCBoYXZlIHRoZSBsb2NhbGUgb2YgdGhlIG9yaWdpbmFsXG5cdCAqIHJlZ2FyZGxlc3Mgd2hhdCB0aGUgbG9jYWxlIHdhcyBvbiBhbnkgcGFzc2VkIGluIGR1cmF0aW9uLlxuXHQgKlxuXHQgKiBUaGUgbmV3IER1cmF0aW9uIHJldHVybmVkIHdpbGwgaGF2ZSBub3JtYWxpemVkIHZhbHVlcyAoaS5lLiBpZiBzdWJ0cmFjdGlvblxuXHQgKiBvZiBvbmUgRHVyYXRpb24gd2l0aCBgeyBob3VyczogMzQgfWAgaXMgZG9uZSB3aXRoIHRoZSBvdGhlciBEdXJhdGlvblxuXHQgKiBoYXZpbmcgYHsgaG91cnM6IDEwIH1gIHRoZW4gdGhlIG5ldyBEdXJhdGlvbiB3aWxsIGhhdmUgYHsgZGF5czogMSB9YC5cblx0ICogWW91IGNhbiBzdGlsbCBnZXQgdGhlIHRvdGFsIGhvdXJzIGJ5IGNhbGxpbmcgYG5ld0R1cmF0aW9uLmFzSG91cnMoKWAuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RHVyYXRpb258T2JqZWN0fG51bWJlcn0gdmFsdWUgRWl0aGVyIGEgZHVyYXRpb24gaW5zdGFuY2UsIGFcblx0ICogbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBvciBhbiBvYmplY3QgaW4gdGhlIHNhbWUgc2hhcGUgYXMgdGhhdCByZWNlaXZlZCBieVxuXHQgKiBEdXJhdGlvbi5mcm9tT2JqZWN0KClcblx0ICpcblx0ICogQHJldHVybiB7RHVyYXRpb259IEEgbmV3IGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRtaW51cyggdmFsdWUgKSB7XG5cdFx0aWYgKCBEdXJhdGlvbi5pc0R1cmF0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIG5ldyBEdXJhdGlvbihcblx0XHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHRcdC5jbG9uZSgpXG5cdFx0XHRcdFx0LnN1YnRyYWN0KCB2YWx1ZVsgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXSApXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHR2YWx1ZSA9IHRoaXNbIHByaXZhdGVNZXRob2RzLmZpbHRlclZhbHVlcyBdKCB2YWx1ZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQuc3VidHJhY3QoIHZhbHVlIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG5lZ2F0aXZlIG9mIHRoaXMgRHVyYXRpb24uXG5cdCAqXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBIG5ldyBpbnN0YW5jZSBvZiBEdXJhdGlvblxuXHQgKi9cblx0bmVnYXRlKCkge1xuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oXG5cdFx0XHRtYXBWYWx1ZXMoIHRoaXMudG9PYmplY3QoKSwgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUgKiAtMTtcblx0XHRcdH0gKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIGphdmFzY3JpcHQgb2JqZWN0IHdpdGggdGhpcyBEdXJhdGlvbidzIHZhbHVlcy5cblx0ICpcblx0ICogQHJldHVybiB7Kn0gUmV0dXJucyB7IHllYXJzOiBudW1iZXIsIGhvdXJzOiBudW1iZXIgLi4uIH1cblx0ICovXG5cdHRvT2JqZWN0KCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvblZhbHVlcyBdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uLlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGVnLiBcIlBUMjRIXCJcblx0ICovXG5cdHRvSVNPKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLnRvSVNPU3RyaW5nKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBJU08gODYwMSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uIGFwcHJvcHJpYXRlIGZvciB1c2Vcblx0ICogaW4gSlNPTi5cblx0ICogQHJldHVybiB7c3RyaW5nfSBlZy4gXCJQVDI0SFwiXG5cdCAqL1xuXHR0b0pTT04oKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF0udG9KU09OKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBJU08gODYwMSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uIGFwcHJvcHJpYXRlIGZvciB1c2Vcblx0ICogaW4gZGVidWdnaW5nLlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGVnLiBcIlBUMjRIXCJcblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLnRvSVNPKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBtaWxsaXNlY29uZHMgdmFsdWUgb2YgdGhpcyBEdXJhdGlvbi5cblx0ICogQHJldHVybiB7bnVtYmVyfSBUaGUgdmFsdWUgb2YgdGhpcyBkdXJhdGlvbiByZXByZXNlbnRlZCBpbiB0aGUgbnVtYmVyIG9mXG5cdCAqIG1pbGxpc2Vjb25kcy5cblx0ICovXG5cdHZhbHVlT2YoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXNNaWxsaXNlY29uZHMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRHVyYXRpb24gZm9ybWF0dGVkIGFjY29yZGluZyB0b1xuXHQgKiB0aGUgc3BlY2lmaWVkIGZvcm1hdCBzdHJpbmcuXG5cdCAqXG5cdCAqIEN1cnJlbnRseSB0aGlzIGFjY2VwdHMgdGhlIGZvbGxvd2luZyB0b2tlbnMgaW4gdGhlIGZvcm1hdCBzdHJpbmc6XG5cdCAqXG5cdCAqIHllYXJzOiAgIFkgb3IgeVxuXHQgKiBtb250aHM6ICBNXG5cdCAqIHdlZWtzOiAgIFcgb3Igd1xuXHQgKiBkYXlzOiAgICBEIG9yIGRcblx0ICogaG91cnM6ICAgSCBvciBoXG5cdCAqIG1pbnV0ZXM6IG1cblx0ICogc2Vjb25kczogc1xuXHQgKiBtczogICAgICBTXG5cdCAqXG5cdCAqIFlvdSBjYW4gdXNlIG11bHRpcGxlcyBvZiB0aGUgc2FtZSB0b2tlbiB0b2dldGhlciB0byBhZGQgemVyby1sZW5ndGhcblx0ICogcGFkZGluZzogKGVnIGhoIC0+IDAxIGluc3RlYWQgb2YgaCAtPiAxKVxuXHQgKlxuXHQgKiBFc2NhcGUgdG9rZW4gY2hhcmFjdGVycyB3aXRoaW4gdGhlIGZvcm1hdCBzdHJpbmcgdXNpbmcgc3F1YXJlIGJyYWNrZXRzXG5cdCAqIChlZyAnaCBbaHJzXSwgbSBbbWluXScgLT4gJzEyIGhycywgMyBtaW4nKVxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ31mb3JtYXRcblx0ICogQHJldHVybiB7c3RyaW5nfSAgQSBmb3JtYXR0ZWQgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgZHVyYXRpb24uXG5cdCAqL1xuXHR0b0Zvcm1hdCggZm9ybWF0ICkge1xuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZSgpWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLmZvcm1hdCggZm9ybWF0ICk7XG5cdH1cbn1cbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgRGF0ZVRpbWUgfSBmcm9tICcuL2RhdGV0aW1lJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRHVyYXRpb24gfSBmcm9tICcuL2R1cmF0aW9uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2VydmVyRGF0ZVRpbWUgfSBmcm9tICcuL3NlcnZlci1kYXRlLXRpbWUnO1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBJbXBvcnRzLlxuICovXG5pbXBvcnQgRGF0ZVRpbWUgZnJvbSAnLi9kYXRldGltZSc7XG5pbXBvcnQge1xuXHRERUZBVUxUX1RJTUVaT05FX1NUUklORyxcblx0SEFTX1RJTUVaT05FX1NUUklORyxcblx0REVGQVVMVF9PRkZTRVQsXG5cdERFRkFVTFRfVkFMSURfTE9DQUxFLFxufSBmcm9tICcuL2RlZmF1bHRzJztcblxuLyoqXG4gKiBFeHRlcm5hbCBJbXBvcnRzLlxuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5cbi8qKlxuICogSW5oZXJpdGluZyB0aGUgRGF0ZVRpbWUgVmFsdWUgb2JqZWN0LCB0aGlzIHJlcHJlc2VudHMgYSBzaW5nbGUgcG9pbnQgaW4gdGltZVxuICogd2l0aGluIHRoZSBjb250ZXh0IG9mIHRoZSB0aW1lem9uZSBvciBvZmZzZXQgdGhlIHNlcnZlciBpcyBzZXQgYXQuXG4gKlxuICogSW5zdGFudGlhdGluZyB0aGlzIGluc3RlYWQgb2YgYERhdGVUaW1lYCByZW1vdmVzIHRoZSBuZWVkIHRvIHBhc3MgYWxvbmdcbiAqIHRpbWV6b25lIHN0cmluZyBvciBvZmZzZXQgYW5kIGluc3RhbnRpYXRlcyBhY2NvcmRpbmcgdG8gd2hhdCBoYXMgYmVlbiBzZXQgYXNcbiAqIHRoZSBkZWZhdWx0cyBmb3IgdGhvc2UgZnJvbSB0aGUgc2VydmVyLiAgVXNhZ2Ugb2YgdGhpcyBjbGFzcyBpcyBwcmVmZXJyZWRcbiAqIG92ZXIgRGF0ZVRpbWUgdG8gcmVtb3ZlIHRoZSBuZWVkIGZvciBjbGllbnQgY29kZSB0byBmaWd1cmUgb3V0IGlmIHRoZSBzZXJ2ZXJcbiAqIGhhcyBhIHRpbWV6b25lIHN0cmluZyBzZXQgb3IgaXMgdXNpbmcgYSBVVEMgb2Zmc2V0LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2ZXJEYXRlVGltZSBleHRlbmRzIERhdGVUaW1lIHtcblx0LyoqXG5cdCAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFNlcnZlckRhdGVUaW1lIGNsYXNzXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBpc284NjAxRGF0ZVN0cmluZ1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKi9cblx0Y29uc3RydWN0b3IoXG5cdFx0aXNvODYwMURhdGVTdHJpbmcgPSAnJyxcblx0XHRsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSxcblx0XHR0aW1lem9uZSA9IERFRkFVTFRfVElNRVpPTkVfU1RSSU5HLFxuXHQpIHtcblx0XHQvLyB3ZSBvbmx5IHdhbnQgdG8gdXNlIHRoZSB0aW1lem9uZSB2YWx1ZSBpZiB0aGUgc2VydmVyIGluZGljYXRlcyB0aGVyZVxuXHRcdC8vIGlzIGEgYSB0aW1lem9uZSBzdHJpbmcgb3IgaWYgY29uc3RydWN0aW5nIGFuIGluc3RhbmNlIGZvciBhIG5vbiBVVENcblx0XHQvLyB2YWx1ZSB0aW1lem9uZSAoSEFTX1RJTUVaT05FX1NUUklORyBpcyBqdXN0IGEgc2hvcnRjdXQgY2hlY2spLlxuXHRcdGlmIChcblx0XHRcdEhBU19USU1FWk9ORV9TVFJJTkcgfHxcblx0XHRcdCggISEgdGltZXpvbmUgJiYgdGltZXpvbmUgIT09ICdVVEMnIClcblx0XHQpIHtcblx0XHRcdHN1cGVyKCBpc284NjAxRGF0ZVN0cmluZywgdGltZXpvbmUsIGxvY2FsZSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBkYXRldGltZSA9ICEhIGlzbzg2MDFEYXRlU3RyaW5nID9cblx0XHRcdFx0bW9tZW50KCkudXRjT2Zmc2V0KCBERUZBVUxUX09GRlNFVCwgdHJ1ZSApLmxvY2FsZSggbG9jYWxlICkgOlxuXHRcdFx0XHRtb21lbnQoIGlzbzg2MDFEYXRlU3RyaW5nIClcblx0XHRcdFx0XHQudXRjT2Zmc2V0KCBERUZBVUxUX09GRlNFVCwgdHJ1ZSApXG5cdFx0XHRcdFx0LmxvY2FsZSggbG9jYWxlICk7XG5cdFx0XHRzdXBlciggZGF0ZXRpbWUudG9JU09TdHJpbmcoIHRydWUgKSwgbnVsbCwgbG9jYWxlICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEluc3RhbnRpYXRlIFNlcnZlckRhdGVUaW1lIGZyb20gYW4gSVNPIHN0cmluZy5cblx0ICogVGhpcyBvdmVycmlkZXMgYERhdGVUaW1lLmZyb21JU09gIHJlbW92aW5nIHRoZSBuZWVkIHRvIHdvcnJ5IGFib3V0XG5cdCAqIHdoZXRoZXIgdG8gdXNlIGB0aW1lem9uZWAgb3IgYG9mZnNldGAuICBUaGlzIHdpbGwgc2ltcGx5IHVzZSB3aGF0ZXZlciBpc1xuXHQgKiBwcm92aWRlZCBieSB0aGUgc2VydmVyIChwcmVmZXJyaW5nIHRpbWV6b25lIGlmIGl0cyBhdmFpbGFibGUpLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gSVNPU3RyaW5nXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIFNlcnZlckRhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgZnJvbUlTTyggSVNPU3RyaW5nLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSApIHtcblx0XHRyZXR1cm4gSEFTX1RJTUVaT05FX1NUUklORyA/XG5cdFx0XHRuZXcgdGhpcyhcblx0XHRcdFx0c3VwZXJcblx0XHRcdFx0XHQuZnJvbUlTTyggSVNPU3RyaW5nLCBERUZBVUxUX1RJTUVaT05FX1NUUklORyApXG5cdFx0XHRcdFx0LnRvSVNPKCksXG5cdFx0XHRcdGxvY2FsZVxuXHRcdFx0KSA6XG5cdFx0XHRuZXcgdGhpcyhcblx0XHRcdFx0c3VwZXJcblx0XHRcdFx0XHQuZnJvbUlTT1dpdGhPZmZzZXQoIElTT1N0cmluZywgREVGQVVMVF9PRkZTRVQgKVxuXHRcdFx0XHRcdC50b0lTTygpLFxuXHRcdFx0XHRsb2NhbGVcblx0XHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5zdGFudGlhdGUgU2VydmVyRGF0ZVRpbWUgZnJvbSBhbiBJU08gc3RyaW5nLlxuXHQgKiBUaGlzIG92ZXJyaWRlcyBgRGF0ZVRpbWUuZnJvbUpTRGF0ZWAgcmVtb3ZpbmcgdGhlIG5lZWQgdG8gd29ycnkgYWJvdXRcblx0ICogd2hldGhlciB0byB1c2UgYHRpbWV6b25lYCBvciBgb2Zmc2V0YC4gIFRoaXMgd2lsbCBzaW1wbHkgdXNlIHdoYXRldmVyIGlzXG5cdCAqIHByb3ZpZGVkIGJ5IHRoZSBzZXJ2ZXIgKHByZWZlcnJpbmcgdGltZXpvbmUgaWYgaXRzIGF2YWlsYWJsZSkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge1NlcnZlckRhdGVUaW1lfSBBbiBpbnN0YW5jZSBvZiBTZXJ2ZXJEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGZyb21KU0RhdGUoIGRhdGUsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdHJldHVybiBIQVNfVElNRVpPTkVfU1RSSU5HID9cblx0XHRcdG5ldyB0aGlzKFxuXHRcdFx0XHRzdXBlclxuXHRcdFx0XHRcdC5mcm9tSlNEYXRlKCBkYXRlLCBERUZBVUxUX1RJTUVaT05FX1NUUklORyApXG5cdFx0XHRcdFx0LnRvSVNPKCksXG5cdFx0XHRcdGxvY2FsZVxuXHRcdFx0KSA6XG5cdFx0XHRuZXcgdGhpcyhcblx0XHRcdFx0c3VwZXJcblx0XHRcdFx0XHQuZnJvbUpTRGF0ZVdpdGhPZmZzZXQoIGRhdGUsIERFRkFVTFRfT0ZGU0VUIClcblx0XHRcdFx0XHQudG9JU08oKSxcblx0XHRcdFx0bG9jYWxlXG5cdFx0XHQpO1xuXHR9XG59XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIE1vbmV5IH0gZnJvbSAnLi9tb25leSc7XG5leHBvcnQge1xuXHRkZWZhdWx0IGFzIFNpdGVDdXJyZW5jeSxcblx0Q3VycmVuY3ksXG59IGZyb20gJy4vY3VycmVuY3knO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBMYWJlbCB9IGZyb20gJy4vbGFiZWwnO1xuZXhwb3J0IHsgRGF0ZVRpbWUsIER1cmF0aW9uLCBTZXJ2ZXJEYXRlVGltZSB9IGZyb20gJy4vZGF0ZS10aW1lJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBzdGFydENhc2UsIGlzU3RyaW5nIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuXG4vKipcbiAqIEEgdmFsdWUgb2JqZWN0IGZvciByZXByZXNlbnRpbmcgYSBsYWJlbCB3aXRoIHNpbmd1bGFyIGFuZCBwbHVyYWwgc3RyaW5nXG4gKiB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExhYmVsIHtcblx0c3RhdGljIEZPUk1BVF9MT1dFUkNBU0UgPSAnbG93ZXInO1xuXHRzdGF0aWMgRk9STUFUX1VQUEVSQ0FTRSA9ICd1cHBlcic7XG5cdHN0YXRpYyBGT1JNQVRfU0VOVEVOQ0VfQ0FTRSA9ICdzZW50ZW5jZSc7XG5cblx0LyoqXG5cdCAqIFRoZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzaW5ndWxhciBmb3JtIG9mIHRoZSBsYWJlbC5cblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHNpbmd1bGFyID0gJyc7XG5cblx0LyoqXG5cdCAqIFRoZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBwbHVyYWwgZm9ybSBvZiB0aGUgbGFiZWwuXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRwbHVyYWwgPSAnJztcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNpbmd1bGFyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwbHVyYWxcblx0ICovXG5cdGNvbnN0cnVjdG9yKCBzaW5ndWxhciwgcGx1cmFsICkge1xuXHRcdHRoaXMuc2V0U2luZ3VsYXIoIHNpbmd1bGFyICkuc2V0UGx1cmFsKCBwbHVyYWwgKTtcblx0XHRPYmplY3QuZnJlZXplKCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogRmx1aWQgc2V0dGVyIGZvciBzZXR0aW5nIHRoZSBzaW5ndWxhciBwcm9wZXJ0eS5cblx0ICpcblx0ICogSWYgdGhlIHNpbmd1bGFyIHByb3BlcnR5IGhhcyBhbHJlYWR5IGJlZW4gc2V0LCB0aGlzIHdpbGwgcmV0dXJuIGEgbmV3XG5cdCAqIGluc3RhbmNlIG9mIExhYmVsXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzaW5ndWxhclxuXHQgKiBAcmV0dXJuIHtMYWJlbH0gIEFuIGluc3RhbmNlIG9mIExhYmVsXG5cdCAqL1xuXHRzZXRTaW5ndWxhciggc2luZ3VsYXIgKSB7XG5cdFx0TGFiZWwuYXNzZXJ0U3RyaW5nKCBzaW5ndWxhciApO1xuXHRcdGlmICggdGhpcy5zaW5ndWxhciAhPT0gJycgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IExhYmVsKCBzaW5ndWxhciwgdGhpcy5wbHVyYWwgKTtcblx0XHR9XG5cdFx0dGhpcy5zaW5ndWxhciA9IHNpbmd1bGFyO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZsdWlkIHNldHRlciBmb3Igc2V0dGluZyB0aGUgcGx1cmFsIHByb3BlcnR5XG5cdCAqXG5cdCAqIElmIHRoZSBwbHVyYWwgcHJvcGVydHkgaGFzIGFscmVhZHkgYmVlbiBzZXQsIHRoaXMgd2lsbCByZXR1cm4gYSBuZXdcblx0ICogaW5zdGFuY2Ugb2YgbGFiZWwuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwbHVyYWxcblx0ICogQHJldHVybiB7TGFiZWx9IEFuIGluc3RhbmNlIG9mIExhYmVsXG5cdCAqL1xuXHRzZXRQbHVyYWwoIHBsdXJhbCApIHtcblx0XHRMYWJlbC5hc3NlcnRTdHJpbmcoIHBsdXJhbCApO1xuXHRcdGlmICggdGhpcy5wbHVyYWwgIT09ICcnICkge1xuXHRcdFx0cmV0dXJuIG5ldyBMYWJlbCggdGhpcy5zaW5ndWxhciwgcGx1cmFsICk7XG5cdFx0fVxuXHRcdHRoaXMucGx1cmFsID0gcGx1cmFsO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0aGUgdmFsdWUgZm9yIHRoZSBwcm9wZXJ0eSBmb3JtYXR0ZWQgaW4gc2VudGVuY2UgY2FzZS5cblx0ICpcblx0ICogTm90ZSwgdGhpcyBzdHJpcHMgYW55IGAtYCBpbiBkYXNoZWQgbGFiZWxzLiAgU28gZm9yIGluc3RhbmNlIGlmIHlvdXJcblx0ICogbGFiZWwgdmFsdWUgd2FzIGBzb21ldGhpbmctZWxzZWAsIHRoZSB2YWx1ZSByZXR1cm5lZCB3b3VsZCBiZVxuXHQgKiBgU29tZXRoaW5nIEVsc2VgXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXIgIElmIHRydWUsIHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlIG9mIHRoZVxuXHQgKiBzaW5ndWxhciBwcm9wZXJ0eSBvdGhlcndpc2UgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlIHBsdXJhbFxuXHQgKiBwcm9wZXJ0eS5cblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5nIGluIHNlbnRlbmNlIGNhc2Vcblx0ICovXG5cdGFzU2VudGVuY2VDYXNlKCBzaW5ndWxhciA9IHRydWUgKSB7XG5cdFx0cmV0dXJuIHNpbmd1bGFyID09PSB0cnVlID9cblx0XHRcdHN0YXJ0Q2FzZSggdGhpcy5zaW5ndWxhci50b0xvd2VyQ2FzZSgpICkgOlxuXHRcdFx0c3RhcnRDYXNlKCB0aGlzLnBsdXJhbC50b0xvd2VyQ2FzZSgpICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5IGZvcm1hdHRlZCBpbiBsb3dlciBjYXNlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNpbmd1bGFyICBJZiB0cnVlLCByZXR1cm4gdGhlIGZvcm1hdHRlZCB2YWx1ZSBvZiB0aGVcblx0ICogc2luZ3VsYXIgcHJvcGVydHkgb3RoZXJ3aXNlIHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlIG9mIHRoZSBwbHVyYWxcblx0ICogcHJvcGVydHkuXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHN0cmluZyBpbiBsb3dlciBjYXNlXG5cdCAqL1xuXHRhc0xvd2VyQ2FzZSggc2luZ3VsYXIgPSB0cnVlICkge1xuXHRcdHJldHVybiBzaW5ndWxhciA/XG5cdFx0XHR0aGlzLnNpbmd1bGFyLnRvTG93ZXJDYXNlKCkgOlxuXHRcdFx0dGhpcy5wbHVyYWwudG9Mb3dlckNhc2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdGhlIHZhbHVlIGZvciB0aGUgcHJvcGVydHkgZm9ybWF0dGVkIGluIHVwcGVyIGNhc2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXIgIElmIHRydWUsIHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlIG9mIHRoZVxuXHQgKiBzaW5ndWxhciBwcm9wZXJ0eSBvdGhlcndpc2UgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlIHBsdXJhbFxuXHQgKiBwcm9wZXJ0eS5cblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5nIGluIHVwcGVyIGNhc2Vcblx0ICovXG5cdGFzVXBwZXJDYXNlKCBzaW5ndWxhciA9IHRydWUgKSB7XG5cdFx0cmV0dXJuIHNpbmd1bGFyID9cblx0XHRcdHRoaXMuc2luZ3VsYXIudG9VcHBlckNhc2UoKSA6XG5cdFx0XHR0aGlzLnBsdXJhbC50b1VwcGVyQ2FzZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0aGUgdmFsdWUgZm9yIHRoZSBwcm9wZXJ0eSBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvIHRoZSBwcm92aWRlZFxuXHQgKiBmb3JtYXRUeXBlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNpbmd1bGFyIElmIHRydWUsIHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlIG9mIHRoZVxuXHQgKiBzaW5ndWxhciBwcm9wZXJ0eSBvdGhlcndpc2UgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlIHBsdXJhbFxuXHQgKiBwcm9wZXJ0eS5cblx0ICogQHBhcmFtIHsoJ3NlbnRlbmNlJ3wnbG93ZXInfCd1cHBlcicpfSBmb3JtYXRUeXBlXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHN0cmluZyBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvIGZvcm1hdFR5cGVcblx0ICovXG5cdGFzRm9ybWF0dGVkKCBzaW5ndWxhciA9IHRydWUsIGZvcm1hdFR5cGUgPSBMYWJlbC5GT1JNQVRfU0VOVEVOQ0VfQ0FTRSApIHtcblx0XHRzd2l0Y2ggKCBmb3JtYXRUeXBlICkge1xuXHRcdFx0Y2FzZSBMYWJlbC5GT1JNQVRfU0VOVEVOQ0VfQ0FTRTpcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXNTZW50ZW5jZUNhc2UoIHNpbmd1bGFyICk7XG5cdFx0XHRjYXNlIExhYmVsLkZPUk1BVF9MT1dFUkNBU0U6XG5cdFx0XHRcdHJldHVybiB0aGlzLmFzTG93ZXJDYXNlKCBzaW5ndWxhciApO1xuXHRcdFx0Y2FzZSBMYWJlbC5GT1JNQVRfVVBQRVJDQVNFOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hc1VwcGVyQ2FzZSggc2luZ3VsYXIgKTtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHdhcm5pbmcoIGZhbHNlLCAnRm9ybWF0IHR5cGUgbXVzdCBiZSBvbmUgb2YgJyArXG5cdFx0XHRcdFx0J0xhYmVsLkZPUk1BVF9TRU5URU5DRV9DQVNFLCBMYWJlbC5GT1JNQVRfVVBQRVJDQVNFLCAnICtcblx0XHRcdFx0XHQnb3IgTGFiZWwuRk9STUFUX0xPV0VSQ0FTRScgKTtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXNTZW50ZW5jZUNhc2UoIHNpbmd1bGFyICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSBzdHJpbmcgb3Igbm90LlxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0U3RyaW5nKCB2YWx1ZSApIHtcblx0XHRpZiAoICEgaXNTdHJpbmcoIHZhbHVlICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnSW5jb21pbmcgbGFiZWwgdmFsdWUgKCcgKyB2YWx1ZSArICcpIG11c3QnICtcblx0XHRcdFx0JyBiZSBhIHN0cmluZycgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBMYWJlbCB0aGF0IGhhcyB0aGUgc2FtZSB2YWx1ZSBmb3Igc2luZ2x1YXIgYW5kXG5cdCAqIHBsdXJhbCBwcm9wZXJ0aWVzIGZvciB0aGUgcHJvdmlkZWQgYXJndW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbFxuXHQgKiBAcmV0dXJuIHtMYWJlbH0gIEEgTGFiZWwgaW5zdGFuY2Vcblx0ICovXG5cdHN0YXRpYyBmcm9tU2FtZVNpbmdsZUFuZFBsdXJhbCA9ICggbGFiZWwgKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBMYWJlbCggbGFiZWwsIGxhYmVsICk7XG5cdH1cbn1cbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBEZWNpbWFsIH0gZnJvbSAnZGVjaW1hbC5qcy1saWdodCc7XG5pbXBvcnQgKiBhcyBBY2NvdW50aW5nIGZyb20gJ2FjY291bnRpbmctanMnO1xuaW1wb3J0IGlzU2hhbGxvd0VxdWFsIGZyb20gJ0B3b3JkcHJlc3MvaXMtc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgeyBFeGNlcHRpb24gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaW5zdGFuY2VPZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgc3ByaW50ZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuXG4vKipcbiAqIEFzc2VydHMgaWYgaW5jb21pbmcgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgTW9uZXlcbiAqIEBwYXJhbSB7TW9uZXl9IG1vbmV5XG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG4gKi9cbmNvbnN0IGFzc2VydE1vbmV5ID0gKCBtb25leSApID0+IHtcblx0aWYgKCAhICggaW5zdGFuY2VPZiggbW9uZXksICdNb25leScgKSApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdJbnN0YW5jZSBvZiBNb25leSByZXF1aXJlZCcgKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIGlmIGluY29taW5nIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIEN1cnJlbmN5XG4gKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeVxuICogQHRocm93cyB7VHlwZUVycm9yfVxuICovXG5jb25zdCBhc3NlcnRDdXJyZW5jeSA9ICggY3VycmVuY3kgKSA9PiB7XG5cdGlmICggISAoIGluc3RhbmNlT2YoIGN1cnJlbmN5LCAnQ3VycmVuY3knICkgKSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnSW5zdGFuY2Ugb2YgQ3VycmVuY3kgcmVxdWlyZWQnICk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyBpZiB0d28gY3VycmVuY2llcyBhcmUgc2hhbGxvdyBlcXVhbC5cbiAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5QVxuICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lCXG4gKiBAdGhyb3dzIHtFeGNlcHRpb259XG4gKi9cbmNvbnN0IGFzc2VydFNhbWVDdXJyZW5jeSA9ICggY3VycmVuY3lBLCBjdXJyZW5jeUIgKSA9PiB7XG5cdGFzc2VydEN1cnJlbmN5KCBjdXJyZW5jeUEgKTtcblx0YXNzZXJ0Q3VycmVuY3koIGN1cnJlbmN5QiApO1xuXHRpZiAoICEgaXNTaGFsbG93RXF1YWwoIGN1cnJlbmN5QS50b0pTT04oKSwgY3VycmVuY3lCLnRvSlNPTigpICkgKSB7XG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbiggJ1Byb3ZpZGVkIGN1cnJlbmNpZXMgYXJlIG5vdCBlcXVpdmFsZW50LicgKTtcblx0fVxufTtcblxuLyoqXG4gKiBBIFZhbHVlIG9iamVjdCByZXByZXNlbnRpbmcgbW9uZXkgdmFsdWVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25leSB7XG5cdC8qKlxuXHQgKiBJbnRlcm5hbGx5IHRoZSBhbW91bnQgaXMgc3RvcmVkIGFzIGEgRGVjaW1hbCBpbnN0YW5jZS5cblx0ICogQHR5cGUge0RlY2ltYWx9XG5cdCAqL1xuXHRhbW91bnQgPSB7fTtcblxuXHQvKipcblx0ICogSW50ZXJuYWxseSB0aGUgYW1vdW50IGlzIHN0b3JlZCBhcyBhIEN1cnJlbmN5IGluc3RhbmNlLlxuXHQgKiBAdHlwZSB7Q3VycmVuY3l9XG5cdCAqL1xuXHRjdXJyZW5jeSA9IHt9O1xuXG5cdC8qKlxuXHQgKiBGb3JtYXR0ZXIgb2JqZWN0IGZvciBtb25leSB2YWx1ZXMuXG5cdCAqIEB0eXBlIHt7fX1cblx0ICovXG5cdGZvcm1hdHRlciA9IHt9O1xuXG5cdC8qKlxuXHQgKiBSb3VuZHMgYXdheSBmcm9tIHplcm9cblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9VUCA9IERlY2ltYWwuUk9VTkRfVVA7XG5cblx0LyoqXG5cdCAqIFJvdW5kcyB0b3dhcmRzIHplcm9cblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9ET1dOID0gRGVjaW1hbC5ST1VORF9ET1dOO1xuXG5cdC8qKlxuXHQgKiBSb3VuZHMgdG93YXJkcyBpbmZpbml0eVxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIFJPVU5EX0NFSUwgPSBEZWNpbWFsLlJPVU5EX0NFSUw7XG5cblx0LyoqXG5cdCAqIFJvdW5kcyB0b3dhcmRzIC1JbmZpbml0eVxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIFJPVU5EX0ZMT09SID0gRGVjaW1hbC5ST1VORF9GTE9PUjtcblxuXHQvKipcblx0ICogUm91bmRzIHRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCByb3VuZHMgYXdheSBmcm9tIHplcm8uXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdGF0aWMgUk9VTkRfSEFMRl9VUCA9IERlY2ltYWwuUk9VTkRfSEFMRl9VUDtcblxuXHQvKipcblx0ICogUm91bmRzIHRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50IHJvdW5kcyB0b3dhcmRzIHplcm8uXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdGF0aWMgUk9VTkRfSEFMRl9ET1dOID0gRGVjaW1hbC5ST1VORF9IQUxGX0RPV047XG5cblx0LyoqXG5cdCAqIFJvdW5kcyB0b3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgcm91bmRzIHRvd2FyZHMgZXZlblxuXHQgKiBuZWlnaGJvdXIuXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdGF0aWMgUk9VTkRfSEFMRl9FVkVOID0gRGVjaW1hbC5ST1VORF9IQUxGX0VWRU47XG5cblx0LyoqXG5cdCAqIENsYXNzIGNvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBhbW91bnRcblx0ICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lcblx0ICovXG5cdGNvbnN0cnVjdG9yKCBhbW91bnQsIGN1cnJlbmN5ICkge1xuXHRcdHRoaXMuc2V0Q3VycmVuY3koIGN1cnJlbmN5IClcblx0XHRcdC5zZXRBbW91bnQoIGFtb3VudCApXG5cdFx0XHQuc2V0Rm9ybWF0dGVyKCk7XG5cdFx0T2JqZWN0LmZyZWV6ZSggdGhpcyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgY3VycmVuY3kgcHJvcGVydHlcblx0ICpcblx0ICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lcblx0ICogQHJldHVybiB7TW9uZXl9IEVpdGhlciB0aGlzIE1vbmV5IG9yIG5ldyBNb25leSBkZXBlbmRpbmcgb24gc3RhdGUgb2Zcblx0ICogcHJvcGVydHkuXG5cdCAqL1xuXHRzZXRDdXJyZW5jeSggY3VycmVuY3kgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0Q3VycmVuY3koIGN1cnJlbmN5ICk7XG5cdFx0Ly8gaWYgdGhlcmUncyBhbHJlYWR5IGEgY3VycmVuY3kgc2V0LCB0aGVuIHJldHVybiBhIG5ldyBvYmplY3QuXG5cdFx0aWYgKCBpbnN0YW5jZU9mKCB0aGlzLmN1cnJlbmN5LCAnQ3VycmVuY3knICkgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IE1vbmV5KCB0aGlzLmFtb3VudCwgY3VycmVuY3kgKTtcblx0XHR9XG5cdFx0dGhpcy5jdXJyZW5jeSA9IGN1cnJlbmN5O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgYW1vdW50IHByb3BlcnR5XG5cdCAqXG5cdCAqIEBwYXJhbSB7RGVjaW1hbHxudW1iZXJ8c3RyaW5nfSBhbW91bnRcblx0ICogQHJldHVybiB7TW9uZXl9IEVpdGhlciB0aGlzIE1vbmV5IG9yIG5ldyBNb25leSBkZXBlbmRpbmcgb24gc3RhdGUgb2YgdGhlXG5cdCAqIHByb3BlcnR5LlxuXHQgKi9cblx0c2V0QW1vdW50KCBhbW91bnQgKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSBpbnN0YW5jZU9mKCBhbW91bnQsICdEZWNpbWFsJyApID9cblx0XHRcdGFtb3VudC50b051bWJlcigpIDpcblx0XHRcdGFtb3VudDtcblx0XHQvLyBpZiB0aGVyZSdzIGFscmVhZHkgYW4gYW1vdW50IHNldCwgdGhlbiByZXR1cm4gYSBuZXcgb2JqZWN0LlxuXHRcdGlmICggaW5zdGFuY2VPZiggdGhpcy5hbW91bnQsICdEZWNpbWFsJyApICkge1xuXHRcdFx0cmV0dXJuIG5ldyBNb25leSggbmV3IERlY2ltYWwoIHZhbHVlICksIHRoaXMuY3VycmVuY3kgKTtcblx0XHR9XG5cdFx0dGhpcy5hbW91bnQgPSBuZXcgRGVjaW1hbCggdmFsdWUgKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIGZvcm1hdHRlciBmb3IgbW9uZXkgdmFsdWVzXG5cdCAqXG5cdCAqIEByZXR1cm4ge01vbmV5fSBBbiBpbnN0YW5jZSBvZiB0aGlzIG9iamVjdC5cblx0ICovXG5cdHNldEZvcm1hdHRlcigpIHtcblx0XHQvLyBvbmx5IGluaXRpYWxpemUgaWYgaXRzIG5vdCBhbHJlYWR5IGluaXRpYWxpemVkXG5cdFx0aWYgKCBpc0VtcHR5KCB0aGlzLmZvcm1hdHRlciApICkge1xuXHRcdFx0dGhpcy5mb3JtYXR0ZXIgPSB7IC4uLkFjY291bnRpbmcgfTtcblx0XHRcdHRoaXMuZm9ybWF0dGVyLnNldHRpbmdzID0ge1xuXHRcdFx0XHQuLi50aGlzLmZvcm1hdHRlci5zZXR0aW5ncyxcblx0XHRcdFx0Li4udGhpcy5jdXJyZW5jeS50b0FjY291bnRpbmdTZXR0aW5ncygpLmN1cnJlbmN5LFxuXHRcdFx0fTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBNb25leSBhcyBpdHMgc3VidW5pdHMuXG5cdCAqIEByZXR1cm4ge251bWJlcn0gSWYgdGhlIHN1YnVuaXRzIGlzIDEwMCBhbmQgdGhlIHZhbHVlIGlzIC40NSxcblx0ICogdGhpcyByZXR1cm5zIDQ1MFxuXHQgKi9cblx0dG9TdWJ1bml0cygpIHtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQudG9OdW1iZXIoKSAqIHRoaXMuY3VycmVuY3kuc3VidW5pdHM7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBtb25leSBvYmplY3QgZXF1YWxzIHRoaXMgbW9uZXkgb2JqZWN0LlxuXHQgKiBDb21wYXJlcyBib3RoIGFtb3VudCBhbmQgY3VycmVuY3kuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhpcyBpcyBlcXVhbC4gRmFsc2UgbWVhbnMgaXQgaXNuJ3QuXG5cdCAqL1xuXHRlcXVhbHMoIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydE1vbmV5KCBvdGhlciApO1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5lcXVhbHMoIG90aGVyLmFtb3VudCApICYmXG5cdFx0XHR0aGlzLmhhc1NhbWVDdXJyZW5jeSggb3RoZXIgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgcHJvdmlkZWQgTW9uZXkgb2JqZWN0J3MgQ3VycmVuY3kgZXF1YWxzIHRoaXMgTW9uZXlcblx0ICogb2JqZWN0J3MgQ3VycmVuY3kuXG5cdCAqXG5cdCAqIFRoaXMgZG9lcyBhIHNoYWxsb3cgY29tcGFyaXNvbiBvbiB0aGUgc2VyaWFsaXplZCB2YWx1ZXMgZm9yIHRoZSBjdXJyZW5jeVxuXHQgKiBvYmplY3RzLiAgVGhhdCB3YXkgaWYgdGhlIGN1cnJlbmNpZXMgYXJlIGRpZmZlcmVudCBpbnN0YW5jZXMsIGJ1dCBzaGFyZVxuXHQgKiB0aGUgc2FtZSBpbnRlcm5hbCB2YWx1ZSwgdGhleSBhcmUgY29uc2lkZXJlZCBlcXVhbC5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGUgY3VycmVuY2llcyBhcmUgZXF1YWwuXG5cdCAqL1xuXHRoYXNTYW1lQ3VycmVuY3koIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydE1vbmV5KCBvdGhlciApO1xuXHRcdHJldHVybiBpc1NoYWxsb3dFcXVhbChcblx0XHRcdHRoaXMuY3VycmVuY3kudG9KU09OKCksXG5cdFx0XHRvdGhlci5jdXJyZW5jeS50b0pTT04oKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQWRkIG9uZSBNb25leSBvYmplY3QgdG8gdGhpcyBNb25leSBvYmplY3Rcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7TW9uZXl9IFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgTW9uZXkuXG5cdCAqL1xuXHRhZGQoIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydFVzaW5nU2FtZUN1cnJlbmN5KCB0aGlzLCBvdGhlciApO1xuXHRcdHJldHVybiBuZXcgTW9uZXkoIHRoaXMuYW1vdW50LnBsdXMoIG90aGVyLmFtb3VudCApLCB0aGlzLmN1cnJlbmN5ICk7XG5cdH1cblxuXHQvKipcblx0ICogU3VidHJhY3Qgb25lIE1vbmV5IG9iamVjdCBmcm9tIHRoaXMgTW9uZXkgb2JqZWN0XG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge01vbmV5fSBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIE1vbmV5XG5cdCAqL1xuXHRzdWJ0cmFjdCggb3RoZXIgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3koIHRoaXMsIG90aGVyICk7XG5cdFx0cmV0dXJuIG5ldyBNb25leSggdGhpcy5hbW91bnQubWludXMoIG90aGVyLmFtb3VudCApLCB0aGlzLmN1cnJlbmN5ICk7XG5cdH1cblxuXHQvKipcblx0ICogTXVsdGlwbHkgdGhpcyBtb25leSBvYmplY3QgYnkgdGhlIHByb3ZpZGVkIG11bHRpcGxpZXIgdmFsdWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBtdWx0aXBsaWVyXG5cdCAqIEByZXR1cm4ge01vbmV5fSBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIE1vbmV5XG5cdCAqL1xuXHRtdWx0aXBseSggbXVsdGlwbGllciApIHtcblx0XHRyZXR1cm4gbmV3IE1vbmV5KCB0aGlzLmFtb3VudC50aW1lcyggbXVsdGlwbGllciApLCB0aGlzLmN1cnJlbmN5ICk7XG5cdH1cblxuXHQvKipcblx0ICogRGl2aWRlIHRoaXMgbW9uZXkgb2JqZWN0IGJ5IHRoZSBwcm92aWRlZCBkaXZpc29yIHZhbHVlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gZGl2aXNvclxuXHQgKiBAcmV0dXJuIHtNb25leX0gUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiBNb25leVxuXHQgKi9cblx0ZGl2aWRlKCBkaXZpc29yICkge1xuXHRcdHJldHVybiBuZXcgTW9uZXkoIHRoaXMuYW1vdW50LmRpdmlkZWRCeSggZGl2aXNvciApLCB0aGlzLmN1cnJlbmN5ICk7XG5cdH1cblxuXHQvKipcblx0ICogQWxsb2NhdGVzIGZ1bmQgYmFzZXMgb24gdGhlIHJhdGlvcyBwcm92aWRlZCByZXR1cm5pbmcgYW4gYXJyYXkgb2YgTW9uZXlcblx0ICogb2JqZWN0cyBhcyBhIHByb2R1Y3Qgb2YgdGhlIGFsbG9jYXRpb24uXG5cdCAqXG5cdCAqIEV4YW1wbGU6IHNwbGl0dGluZyBhIHByb3ZpZGVkIE1vbmV5IG9iamVjdCB0aHJlZSBlcXVhbCB3YXlzLlxuXHQgKlxuXHQgKiBgYGBcblx0ICogY29uc3Qgc3BsaXRNb25leSA9IG1vbmV5SW5zdGFuY2UuYWxsb2NhdGUoIFsgMSwgMSwgMSBdICk7XG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBFeGFtcGxlOiBzcGxpdHRpbmcgYSBwcm92aWRlZCBNb25leSBvYmplY3QgdHdvIHdheXMgd2l0aCBvbmUgaGF2aW5nIDc1JVxuXHQgKiBvZiB0aGUgYWxsb2NhdGlvbi5cblx0ICpcblx0ICogYGBgXG5cdCAqIGNvbnN0IHNwbGl0TW9uZXkgPSBtb25leUluc3RhbmNlLmFsbG9jYXRlKCBbIDc1LCAyNSBdICk7XG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBOb3RlOiBBcnJheSB2YWx1ZXMgZm9yIHJhdGlvcyBhcmUgc2ltcGx5IHRvdGFsbGVkIGFuZCB0aGVuIGVhY2ggZWxlbWVudFxuXHQgKiBpcyBjb25zaWRlcmVkIGEgZnJhY3Rpb24gb2YgdGhlIHRvdGFsIHZhbHVlLiAgU28gaG93IHlvdSBzdWJtaXQgcmF0aW9cblx0ICogdmFsdWVzIGlzIHVwIHRvIHlvdSBmb3Igd2hhdGV2ZXIgaXMgbW9zdCBjbGVhciB0byB5b3UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyW119IHJhdGlvc1xuXHQgKiBAcmV0dXJuIHtNb25leVtdfSBBbiBhcnJheSBvZiBNb25leSBvYmplY3RzXG5cdCAqL1xuXHRhbGxvY2F0ZSggcmF0aW9zICkge1xuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdGNvbnN0IHJlc3VsdHMgPSBbXTtcblx0XHRjb25zdCBjb252ZXJ0ZWRSYXRpb3MgPSBbXTtcblx0XHRsZXQgcmVtYWluZGVyID0gbmV3IERlY2ltYWwoIHNlbGYudG9TdWJ1bml0cygpICk7XG5cdFx0bGV0IHRvdGFsID0gbmV3IERlY2ltYWwoIDAgKTtcblx0XHQvLyBjb252ZXJ0IHJhdGlvcyB0byBkZWNpbWFsIGFuZCBnZW5lcmF0ZSB0b3RhbC5cblx0XHRyYXRpb3MuZm9yRWFjaCggKCByYXRpbyApID0+IHtcblx0XHRcdGNvbnZlcnRlZFJhdGlvcy5wdXNoKFxuXHRcdFx0XHRpbnN0YW5jZU9mKCByYXRpbywgJ0RlY2ltYWwnICkgPyByYXRpbyA6IG5ldyBEZWNpbWFsKCByYXRpbyApXG5cdFx0XHQpO1xuXHRcdFx0dG90YWwgPSB0b3RhbC5wbHVzKCByYXRpbyApO1xuXHRcdH0gKTtcblx0XHRjb252ZXJ0ZWRSYXRpb3MuZm9yRWFjaCggKCByYXRpbyApID0+IHtcblx0XHRcdGNvbnN0IHNoYXJlID0gbmV3IERlY2ltYWwoXG5cdFx0XHRcdE1hdGguZmxvb3IoXG5cdFx0XHRcdFx0c2VsZi50b1N1YnVuaXRzKCkgKiByYXRpby50b051bWJlcigpIC8gdG90YWwudG9OdW1iZXIoKVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdFx0cmVzdWx0cy5wdXNoKFxuXHRcdFx0XHRuZXcgTW9uZXkoXG5cdFx0XHRcdFx0c2hhcmUuZGl2aWRlZEJ5KCB0aGlzLmN1cnJlbmN5LnN1YnVuaXRzICksXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW5jeVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdFx0cmVtYWluZGVyID0gcmVtYWluZGVyLm1pbnVzKCBzaGFyZSApO1xuXHRcdH0gKTtcblx0XHRmb3IgKCBsZXQgaSA9IDA7IHJlbWFpbmRlci5ncmVhdGVyVGhhbiggMCApOyBpKysgKSB7XG5cdFx0XHRyZXN1bHRzWyBpIF0gPSBuZXcgTW9uZXkoXG5cdFx0XHRcdCggbmV3IERlY2ltYWwoIHJlc3VsdHNbIGkgXS50b1N1YnVuaXRzKCkgKSApXG5cdFx0XHRcdFx0LnBsdXMoIDEgKVxuXHRcdFx0XHRcdC5kaXZpZGVkQnkoIHRoaXMuY3VycmVuY3kuc3VidW5pdHMgKSxcblx0XHRcdFx0dGhpcy5jdXJyZW5jeVxuXHRcdFx0KTtcblx0XHRcdHJlbWFpbmRlciA9IHJlbWFpbmRlci5taW51cyggMSApO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wYXJlcyB0d28gaW5zdGFuY2VzIG9mIE1vbmV5LlxuXHQgKlxuXHQgKiBOb3RlOiBcInNhbWVcIiBtZWFucyBoYXMgZXF1YWwgdmFsdWUgYW5kIGVxdWFsIGN1cnJlbmN5LiAgSXQgZG9lcyBub3QgbWVhblxuXHQgKiBpZGVudGljYWwgaW5zdGFuY2VzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge01vbmV5fSBvdGhlclxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IDAgaWYgdGhleSBhcmUgdGhlIHNhbWUsIDEgaWYgdGhpcyBpcyBncmVhdGVyIHRoYW5cblx0ICogb3RoZXIgYW5kIC0xIGlmIG90aGVyIGlzIGdyZWF0ZXIgdGhhbiB0aGlzLlxuXHQgKi9cblx0Y29tcGFyZSggb3RoZXIgKSB7XG5cdFx0Ly9xdWlja2x5IHJldHVybiAwIGlmIGlkZW50aWNhbFxuXHRcdGlmICggdGhpcyA9PT0gb3RoZXIgKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cdFx0TW9uZXkuYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3koIHRoaXMsIG90aGVyICk7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmNvbXBhcmVkVG8oIG90aGVyLmFtb3VudCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhcmVzIHdoZXRoZXIgdGhpcyBNb25leSBvYmplY3QgaXMgZ3JlYXRlciB0aGFuIHRoZSBvdGhlciBNb25leSBvYmplY3QuXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGlzIGlzIGdyZWF0ZXIgdGhhbiBvdGhlci5cblx0ICovXG5cdGdyZWF0ZXJUaGFuKCBvdGhlciApIHtcblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSggdGhpcywgb3RoZXIgKTtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQuZ3JlYXRlclRoYW4oIG90aGVyLmFtb3VudCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhcmVzIHdoZXRoZXIgdGhpcyBNb25leSBvYmplY3QgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBvdGhlclxuXHQgKiBNb25leSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGlzIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgb3RoZXIuXG5cdCAqL1xuXHRncmVhdGVyVGhhbk9yRXF1YWxUbyggb3RoZXIgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3koIHRoaXMsIG90aGVyICk7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmdyZWF0ZXJUaGFuT3JFcXVhbFRvKCBvdGhlci5hbW91bnQgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wYXJlcyB3aGV0aGVyIHRoaXMgTW9uZXkgb2JqZWN0IGlzIGxlc3MgdGhhbiB0aGUgb3RoZXIgTW9uZXkgb2JqZWN0LlxuXHQgKiBAcGFyYW0ge01vbmV5fSBvdGhlclxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBJZiB0cnVlIHRoZW4gdGhpcyBpcyBsZXNzIHRoYW4gb3RoZXJcblx0ICovXG5cdGxlc3NUaGFuKCBvdGhlciApIHtcblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSggdGhpcywgb3RoZXIgKTtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQubGVzc1RoYW4oIG90aGVyLmFtb3VudCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhcmVzIHdoZXRoZXIgdGhpcyBNb25leSBvYmplY3QgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSBvdGhlclxuXHQgKiBNb25leSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGlzIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byBvdGhlci5cblx0ICovXG5cdGxlc3NUaGFuT3JFcXVhbFRvKCBvdGhlciApIHtcblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSggdGhpcywgb3RoZXIgKTtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQubGVzc1RoYW5PckVxdWFsVG8oIG90aGVyLmFtb3VudCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyBpZiB0aGlzIG9iamVjdCBoYXMgdGhlIHZhbHVlIG9mIDBcblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoZSB2YWx1ZSBpcyAwLlxuXHQgKi9cblx0aXNaZXJvKCkge1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5pc1plcm8oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhlIHZhbHVlIGluIHRoaXMgTW9uZXkgb2JqZWN0IGlzIG5lZ2F0aXZlLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBJZiB0cnVlIHRoZW4gdGhlIHZhbHVlIGlzIG5lZ2F0aXZlLlxuXHQgKi9cblx0aXNOZWdhdGl2ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQuaXNOZWdhdGl2ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyBpZiB0aGUgdmFsdWUgaW4gdGhpcyBNb25leSBvYmplY3QgaXMgcG9zaXRpdmUuXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGUgdmFsdWUgaXMgcG9zaXRpdmUuXG5cdCAqL1xuXHRpc1Bvc2l0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5pc1Bvc2l0aXZlKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBNb25leSBvYmplY3QgYXMgYSBudW1iZXIgcHJpbWl0aXZlLlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IFJldHVybnMgYSBudW1iZXIuXG5cdCAqL1xuXHR0b051bWJlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQudG9OdW1iZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhpcyBNb25leSBvYmplY3QgaW4gbm9ybWFsIChmaXhlZC1wb2ludCkgbm90YXRpb25cblx0ICogcm91bmRlZCB0byBgZGVjaW1hbFBsYWNlc2AgdXNpbmcgYHJvdW5kaW5nYCBtb2RlLlxuXHQgKlxuXHQgKiBJZiB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZSBpbiBub3JtYWwgbm90YXRpb24gaGFzIGZld2VyIHRoYW5cblx0ICogZGVjaW1hbFBsYWNlcyBmcmFjdGlvbiBkaWdpdHMsIHRoZSByZXR1cm4gdmFsdWUgd2lsbCBiZSBhcHBlbmRlZCB3aXRoXG5cdCAqIHplcm9zIGFjY29yZGluZ2x5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gZGVjaW1hbFBsYWNlcyBUaGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIHRvIHJvdW5kIHRvLlxuXHQgKiBJZiBub3QgcHJvdmlkZWQgdXNlcyB0aGUgaW50ZXJuYWwgZGVjaW1hbCBwbGFjZSB2YWx1ZS5cblx0ICogQHBhcmFtIHtudW1iZXJ9IHJvdW5kaW5nIFdoYXQgcm91bmRpbmcgdHlwZSB0byB1c2UgKDAtOCkuICBVc2UgTW9uZXkgUk9VTkRcblx0ICogY29uc3RhbnRzLiAgRGVmYXVsdHMgdG8gTW9uZXkuUk9VTkRfSEFMRl9VUFxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIE1vbmV5XG5cdCAqIGluIG5vcm1hbCAoZml4ZWQtcG9pbnQpIG5vdGF0aW9uIHJvdW5kZWQgdG8gZGVjaW1hbCBwbGFjZXMgdXNpbmdcblx0ICogcm91bmRpbmcgbW9kZS5cblx0ICovXG5cdHRvRml4ZWQoIGRlY2ltYWxQbGFjZXMsIHJvdW5kaW5nID0gTW9uZXkuUk9VTkRfSEFMRl9VUCApIHtcblx0XHRkZWNpbWFsUGxhY2VzID0gZGVjaW1hbFBsYWNlcyB8fCB0aGlzLmN1cnJlbmN5LmRlY2ltYWxQbGFjZXM7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LnRvRml4ZWQoIGRlY2ltYWxQbGFjZXMsIHJvdW5kaW5nICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIG5ldyBNb25leSB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBNb25leSByb3VuZGVkXG5cdCAqIHRvIGEgd2hvbGUgbnVtYmVyIHVzaW5nIHJvdW5kaW5nIG1vZGUgcm91bmRpbmcgc2V0IG9uIHRoZSBvcmlnaW5hbFxuXHQgKiBEZWNpbWFsIGFtb3VudC5cblx0ICpcblx0ICogQHJldHVybiB7TW9uZXl9IEEgbmV3IE1vbmV5IG9iamVjdFxuXHQgKi9cblx0dG9JbnRlZ2VyTW9uZXkoKSB7XG5cdFx0cmV0dXJuIG5ldyBNb25leShcblx0XHRcdHRoaXMuYW1vdW50LnRvSW50ZWdlcigpLFxuXHRcdFx0dGhpcy5jdXJyZW5jeVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBNb25leSBvYmplY3QgYXMgYSBmb3JtYXR0ZWQgc3RyaW5nIGFjY29yZGluZ1xuXHQgKiB0byB0aGUgY3VycmVuY3kgY29uZmlndXJhdGlvbi5cblx0ICogQHJldHVybiB7c3RyaW5nfSBSZXR1cm5zIGEgZm9ybWF0dGVkIHN0cmluZyBhY2NvcmRpbmcgdG8gQ3VycmVuY3kuXG5cdCAqL1xuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXR0ZXIuZm9ybWF0KFxuXHRcdFx0dGhpcy5hbW91bnQudG9OdW1iZXIoKSxcblx0XHRcdHRoaXMuZm9ybWF0dGVyLnNldHRpbmdzXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJuIHsgT2JqZWN0IH0gUmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSBzZXJpYWxpemVkXG5cdCAqIHZhbHVlIG9mIHRoaXMgb2JqZWN0LlxuXHQgKi9cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRhbW91bnQ6IHRoaXMuYW1vdW50LnRvSlNPTigpLFxuXHRcdFx0Y3VycmVuY3k6IHRoaXMuY3VycmVuY3kudG9KU09OKCksXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIGlmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBNb25leS5cblx0ICogQHBhcmFtIHtNb25leX0gbW9uZXlcblx0ICogQHRocm93cyB7VHlwZUVycm9yfVxuXHQgKi9cblx0c3RhdGljIGFzc2VydE1vbmV5ID0gKCBtb25leSApID0+IHtcblx0XHRhc3NlcnRNb25leSggbW9uZXkgKTtcblx0fTtcblxuXHQvKipcblx0ICogQXNzZXJ0cyBpZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgQ3VycmVuY3kuXG5cdCAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5XG5cdCAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cblx0ICovXG5cdHN0YXRpYyBhc3NlcnRDdXJyZW5jeSA9ICggY3VycmVuY3kgKSA9PiB7XG5cdFx0YXNzZXJ0Q3VycmVuY3koIGN1cnJlbmN5ICk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgaWYgdGhlIHByb3ZpZGVkIHZhbHVlcyBhcmUgYm90aCBNb25leSBvYmplY3RzIGFuZCBoYXZlIEVxdWFsXG5cdCAqIEN1cnJlbmN5IG9iamVjdHMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IHRoaXNNb25leVxuXHQgKiBAcGFyYW0ge01vbmV5fSBvdGhlck1vbmV5XG5cdCAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cblx0ICovXG5cdHN0YXRpYyBhc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSA9ICggdGhpc01vbmV5LCBvdGhlck1vbmV5ICkgPT4ge1xuXHRcdGFzc2VydE1vbmV5KCB0aGlzTW9uZXkgKTtcblx0XHRhc3NlcnRNb25leSggb3RoZXJNb25leSApO1xuXHRcdGFzc2VydFNhbWVDdXJyZW5jeSggdGhpc01vbmV5LmN1cnJlbmN5LCBvdGhlck1vbmV5LmN1cnJlbmN5ICk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgaWYgdHdvIGN1cnJlbmNpZXMgYXJlIHNoYWxsb3cgZXF1YWwuXG5cdCAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5QVxuXHQgKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeUJcblx0ICogQHRocm93cyB7RXhjZXB0aW9ufVxuXHQgKi9cblx0c3RhdGljIGFzc2VydFNhbWVDdXJyZW5jeSA9ICggY3VycmVuY3lBLCBjdXJyZW5jeUIgKSA9PiB7XG5cdFx0YXNzZXJ0U2FtZUN1cnJlbmN5KCBjdXJyZW5jeUEsIGN1cnJlbmN5QiApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlY2VpdmVzIGFuIGluY29taW5nIHZhbHVlIHRoYXQgY291bGQgYmUgYSBtb25leSBmb3JtYXR0ZWRcblx0ICogc3RyaW5nIGFuZCByZXR1cm5zIGEgTW9uZXkgdmFsdWUgb2JqZWN0IHdpdGggdGhlIGNvcnJlY3QgdmFsdWVcblx0ICogY29uc2lkZXJpbmcgdGhlIHByb3ZpZGVkIGN1cnJlbmN5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IG1vbmV5VmFsdWVcblx0ICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lcblx0ICpcblx0ICogQHJldHVybiB7TW9uZXl9IEFuIGluc3RhbmNlIG9mIGEgbW9uZXkgdmFsdWUgb2JqZWN0XG5cdCAqL1xuXHRzdGF0aWMgZnJvbU1vbmV5VmFsdWUgPSAoIG1vbmV5VmFsdWUsIGN1cnJlbmN5ICkgPT4ge1xuXHRcdGFzc2VydEN1cnJlbmN5KCBjdXJyZW5jeSApO1xuXHRcdC8vIGRldGVjdCBpZiBpbmNvbWluZyB2YWx1ZSBoYXMgYSBjdXJyZW5jeSBzaWduIG5vdCBtYXRjaGluZyBwcm92aWRlZFxuXHRcdC8vIGN1cnJlbmN5LiAgVGhpcyBkb2Vzbid0IHByb3ZpZGUgZnVsbCBwcm90ZWN0aW9uIGZyb20gaW1wcm9wZXJcblx0XHQvLyB2YWx1ZXMgc2VudCBpbiBidXQgaXMgYW4gaW5pdGlhbCBzYWZlZ3VhcmQuXG5cdFx0aWYgKCB0eXBlb2YgbW9uZXlWYWx1ZSA9PT0gJ3N0cmluZycgKSB7XG5cdFx0XHRjb25zdCBtYXRjaCA9IG1vbmV5VmFsdWUubWF0Y2goIC9bXlxcZFxcLlxcLFxcc10rLyApO1xuXHRcdFx0aWYgKCBtYXRjaCAmJiBtYXRjaFsgMCBdICE9PSBjdXJyZW5jeS5zaWduICkge1xuXHRcdFx0XHQvLyBUaGUgZmlyc3QgZXJyb3IgbWVzc2FnZSBpcyB1c2VkIGlmIHdlIGhhdmUganVzdCBvbmUgY2hhcmFjdGVyXG5cdFx0XHRcdC8vIHJldHVybmVkIHdoaWNoIGlzIGxpa2VseSB0aGUgY3VycmVuY3kgc3ltYm9sLiAgT3RoZXJ3aXNlLFxuXHRcdFx0XHQvLyBnaXZlIGEgbW9yZSBnZW5lcmljIG1lc3NhZ2UuXG5cdFx0XHRcdGNvbnN0IG1lc3NhZ2UgPSBtYXRjaFsgMCBdLmxlbmd0aCA9PT0gMSA/XG5cdFx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHRcdCdUaGUgcHJvdmlkZWQgbW9uZXkgdmFsdWUgaGFzIGEgJTEkcyBzaWduIGluIGl0LCBidXQgdGhlIHByb3ZpZGVkIGN1cnJlbmN5IHZhbHVlIG9iamVjdCBkZWZpbmVzICUyJHMgYXMgdGhlIGN1cnJlbmN5IHNpZ24uJyxcblx0XHRcdFx0XHRcdG1hdGNoWyAwIF0sXG5cdFx0XHRcdFx0XHRjdXJyZW5jeS5zaWduXG5cdFx0XHRcdFx0KSA6XG5cdFx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHRcdCdUaGUgcHJvdmlkZWQgbW9uZXkgdmFsdWUgaGFzIG5vbiBudW1lcmljIHN0cmluZ3MgaW4gaXQgKCUxJHMpLCBwbGVhc2UgZG91YmxlLWNoZWNrIHRoZSB2YWx1ZS4nLFxuXHRcdFx0XHRcdFx0bWF0Y2hbIDAgXVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBtZXNzYWdlICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIHNldCB0aGUgaW5pdGlhbCB2YWx1ZSBvYmplY3QgdXNpbmcgdGhlIGN1cnJlbmN5XG5cdFx0Y29uc3QgbW9uZXkgPSBuZXcgTW9uZXkoIDAsIGN1cnJlbmN5ICk7XG5cdFx0Ly8gc2V0IGEgbmV3IHZhbHVlIHVzaW5nIHRoZSBwYXJzZSBvbiB0aGUgZm9ybWF0dGVyLlxuXHRcdHJldHVybiBtb25leS5zZXRBbW91bnQoIG1vbmV5LmZvcm1hdHRlci5wYXJzZSggbW9uZXlWYWx1ZSApICk7XG5cdH1cbn1cbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aG91dEhvbGVzOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJ2YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9zZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7XG4gIGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7XG5cbiAgdHJ5IHtcbiAgICBEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFJlZmxlY3QuY29uc3RydWN0KERhdGUsIFtdLCBmdW5jdGlvbiAoKSB7fSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICBpZiAoaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9jb25zdHJ1Y3QgPSBSZWZsZWN0LmNvbnN0cnVjdDtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9jb25zdHJ1Y3QgPSBmdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHtcbiAgICAgIHZhciBhID0gW251bGxdO1xuICAgICAgYS5wdXNoLmFwcGx5KGEsIGFyZ3MpO1xuICAgICAgdmFyIENvbnN0cnVjdG9yID0gRnVuY3Rpb24uYmluZC5hcHBseShQYXJlbnQsIGEpO1xuICAgICAgdmFyIGluc3RhbmNlID0gbmV3IENvbnN0cnVjdG9yKCk7XG4gICAgICBpZiAoQ2xhc3MpIHNldFByb3RvdHlwZU9mKGluc3RhbmNlLCBDbGFzcy5wcm90b3R5cGUpO1xuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX2NvbnN0cnVjdC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jb25zdHJ1Y3Q7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwidmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vZ2V0UHJvdG90eXBlT2ZcIik7XG5cbnZhciBzdXBlclByb3BCYXNlID0gcmVxdWlyZShcIi4vc3VwZXJQcm9wQmFzZVwiKTtcblxuZnVuY3Rpb24gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgIT09IFwidW5kZWZpbmVkXCIgJiYgUmVmbGVjdC5nZXQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9nZXQgPSBSZWZsZWN0LmdldDtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9nZXQgPSBmdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICB2YXIgYmFzZSA9IHN1cGVyUHJvcEJhc2UodGFyZ2V0LCBwcm9wZXJ0eSk7XG4gICAgICBpZiAoIWJhc2UpIHJldHVybjtcbiAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBwcm9wZXJ0eSk7XG5cbiAgICAgIGlmIChkZXNjLmdldCkge1xuICAgICAgICByZXR1cm4gZGVzYy5nZXQuY2FsbChyZWNlaXZlcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlciB8fCB0YXJnZXQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXQ7IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsInZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL2dldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfc3VwZXJQcm9wQmFzZShvYmplY3QsIHByb3BlcnR5KSB7XG4gIHdoaWxlICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpKSB7XG4gICAgb2JqZWN0ID0gZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcbiAgICBpZiAob2JqZWN0ID09PSBudWxsKSBicmVhaztcbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3N1cGVyUHJvcEJhc2U7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcblx0KGZhY3RvcnkoKGdsb2JhbC5hY2NvdW50aW5nID0gZ2xvYmFsLmFjY291bnRpbmcgfHwge30pKSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuXHRmdW5jdGlvbiBfX2NvbW1vbmpzKGZuLCBtb2R1bGUpIHsgcmV0dXJuIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfSwgZm4obW9kdWxlLCBtb2R1bGUuZXhwb3J0cyksIG1vZHVsZS5leHBvcnRzOyB9XG5cblx0LyoqXG5cdCAqIFRoZSBsaWJyYXJ5J3Mgc2V0dGluZ3MgY29uZmlndXJhdGlvbiBvYmplY3QuXG5cdCAqXG5cdCAqIENvbnRhaW5zIGRlZmF1bHQgcGFyYW1ldGVycyBmb3IgY3VycmVuY3kgYW5kIG51bWJlciBmb3JtYXR0aW5nXG5cdCAqL1xuXHR2YXIgc2V0dGluZ3MgPSB7XG5cdCAgc3ltYm9sOiAnJCcsIC8vIGRlZmF1bHQgY3VycmVuY3kgc3ltYm9sIGlzICckJ1xuXHQgIGZvcm1hdDogJyVzJXYnLCAvLyBjb250cm9scyBvdXRwdXQ6ICVzID0gc3ltYm9sLCAldiA9IHZhbHVlIChjYW4gYmUgb2JqZWN0LCBzZWUgZG9jcylcblx0ICBkZWNpbWFsOiAnLicsIC8vIGRlY2ltYWwgcG9pbnQgc2VwYXJhdG9yXG5cdCAgdGhvdXNhbmQ6ICcsJywgLy8gdGhvdXNhbmRzIHNlcGFyYXRvclxuXHQgIHByZWNpc2lvbjogMiwgLy8gZGVjaW1hbCBwbGFjZXNcblx0ICBncm91cGluZzogMywgLy8gZGlnaXQgZ3JvdXBpbmcgKG5vdCBpbXBsZW1lbnRlZCB5ZXQpXG5cdCAgc3RyaXBaZXJvczogZmFsc2UsIC8vIHN0cmlwIGluc2lnbmlmaWNhbnQgemVyb3MgZnJvbSBkZWNpbWFsIHBhcnRcblx0ICBmYWxsYmFjazogMCAvLyB2YWx1ZSByZXR1cm5lZCBvbiB1bmZvcm1hdCgpIGZhaWx1cmVcblx0fTtcblxuXHQvKipcblx0ICogVGFrZXMgYSBzdHJpbmcvYXJyYXkgb2Ygc3RyaW5ncywgcmVtb3ZlcyBhbGwgZm9ybWF0dGluZy9jcnVmdCBhbmQgcmV0dXJucyB0aGUgcmF3IGZsb2F0IHZhbHVlXG5cdCAqIEFsaWFzOiBgYWNjb3VudGluZy5wYXJzZShzdHJpbmcpYFxuXHQgKlxuXHQgKiBEZWNpbWFsIG11c3QgYmUgaW5jbHVkZWQgaW4gdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBmbG9hdHMgKGRlZmF1bHRzIHRvXG5cdCAqIGFjY291bnRpbmcuc2V0dGluZ3MuZGVjaW1hbCksIHNvIGlmIHRoZSBudW1iZXIgdXNlcyBhIG5vbi1zdGFuZGFyZCBkZWNpbWFsXG5cdCAqIHNlcGFyYXRvciwgcHJvdmlkZSBpdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuXHQgKlxuXHQgKiBBbHNvIG1hdGNoZXMgYnJhY2tldGVkIG5lZ2F0aXZlcyAoZWcuICckICgxLjk5KScgPT4gLTEuOTkpXG5cdCAqXG5cdCAqIERvZXNuJ3QgdGhyb3cgYW55IGVycm9ycyAoYE5hTmBzIGJlY29tZSAwKSBidXQgdGhpcyBtYXkgY2hhbmdlIGluIGZ1dHVyZVxuXHQgKlxuXHQgKiBgYGBqc1xuXHQgKiAgYWNjb3VudGluZy51bmZvcm1hdChcIsKjIDEyLDM0NSw2NzguOTAgR0JQXCIpOyAvLyAxMjM0NTY3OC45XG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBAbWV0aG9kIHVuZm9ybWF0XG5cdCAqIEBmb3IgYWNjb3VudGluZ1xuXHQgKiBAcGFyYW0ge1N0cmluZ3xBcnJheTxTdHJpbmc+fSB2YWx1ZSBUaGUgc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgY29udGFpbmluZyB0aGUgbnVtYmVyL3MgdG8gcGFyc2UuXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICAgICAgIGRlY2ltYWwgTnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzIG9mIHRoZSByZXN1bHRhbnQgbnVtYmVyXG5cdCAqIEByZXR1cm4ge0Zsb2F0fSBUaGUgcGFyc2VkIG51bWJlclxuXHQgKi9cblx0ZnVuY3Rpb24gdW5mb3JtYXQodmFsdWUpIHtcblx0ICB2YXIgZGVjaW1hbCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHNldHRpbmdzLmRlY2ltYWwgOiBhcmd1bWVudHNbMV07XG5cdCAgdmFyIGZhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gc2V0dGluZ3MuZmFsbGJhY2sgOiBhcmd1bWVudHNbMl07XG5cblx0ICAvLyBSZWN1cnNpdmVseSB1bmZvcm1hdCBhcnJheXM6XG5cdCAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdCAgICByZXR1cm4gdmFsdWUubWFwKGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgICAgcmV0dXJuIHVuZm9ybWF0KHZhbCwgZGVjaW1hbCwgZmFsbGJhY2spO1xuXHQgICAgfSk7XG5cdCAgfVxuXG5cdCAgLy8gUmV0dXJuIHRoZSB2YWx1ZSBhcy1pcyBpZiBpdCdzIGFscmVhZHkgYSBudW1iZXI6XG5cdCAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHJldHVybiB2YWx1ZTtcblxuXHQgIC8vIEJ1aWxkIHJlZ2V4IHRvIHN0cmlwIG91dCBldmVyeXRoaW5nIGV4Y2VwdCBkaWdpdHMsIGRlY2ltYWwgcG9pbnQgYW5kIG1pbnVzIHNpZ246XG5cdCAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCgnW14wLTktKC0pLScgKyBkZWNpbWFsICsgJ10nLCBbJ2cnXSk7XG5cdCAgdmFyIHVuZm9ybWF0dGVkVmFsdWVTdHJpbmcgPSAoJycgKyB2YWx1ZSkucmVwbGFjZShyZWdleCwgJycpIC8vIHN0cmlwIG91dCBhbnkgY3J1ZnRcblx0ICAucmVwbGFjZShkZWNpbWFsLCAnLicpIC8vIG1ha2Ugc3VyZSBkZWNpbWFsIHBvaW50IGlzIHN0YW5kYXJkXG5cdCAgLnJlcGxhY2UoL1xcKChbLV0qXFxkKlteKV0/XFxkKylcXCkvZywgJy0kMScpIC8vIHJlcGxhY2UgYnJhY2tldGVkIHZhbHVlcyB3aXRoIG5lZ2F0aXZlc1xuXHQgIC5yZXBsYWNlKC9cXCgoLiopXFwpLywgJycpOyAvLyByZW1vdmUgYW55IGJyYWNrZXRzIHRoYXQgZG8gbm90IGhhdmUgbnVtZXJpYyB2YWx1ZVxuXG5cdCAgLyoqXG5cdCAgICogSGFuZGxpbmcgLXZlIG51bWJlciBhbmQgYnJhY2tldCwgZWcuXG5cdCAgICogKC0xMDApID0gMTAwLCAtKDEwMCkgPSAxMDAsIC0tMTAwID0gMTAwXG5cdCAgICovXG5cdCAgdmFyIG5lZ2F0aXZlID0gKHVuZm9ybWF0dGVkVmFsdWVTdHJpbmcubWF0Y2goLy0vZykgfHwgMikubGVuZ3RoICUgMixcblx0ICAgICAgYWJzVW5mb3JtYXR0ZWQgPSBwYXJzZUZsb2F0KHVuZm9ybWF0dGVkVmFsdWVTdHJpbmcucmVwbGFjZSgvLS9nLCAnJykpLFxuXHQgICAgICB1bmZvcm1hdHRlZCA9IGFic1VuZm9ybWF0dGVkICogKG5lZ2F0aXZlID8gLTEgOiAxKTtcblxuXHQgIC8vIFRoaXMgd2lsbCBmYWlsIHNpbGVudGx5IHdoaWNoIG1heSBjYXVzZSB0cm91YmxlLCBsZXQncyB3YWl0IGFuZCBzZWU6XG5cdCAgcmV0dXJuICFpc05hTih1bmZvcm1hdHRlZCkgPyB1bmZvcm1hdHRlZCA6IGZhbGxiYWNrO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIGFuZCBub3JtYWxpc2UgdGhlIHZhbHVlIG9mIHByZWNpc2lvbiAobXVzdCBiZSBwb3NpdGl2ZSBpbnRlZ2VyKVxuXHQgKi9cblx0ZnVuY3Rpb24gX2NoZWNrUHJlY2lzaW9uKHZhbCwgYmFzZSkge1xuXHQgIHZhbCA9IE1hdGgucm91bmQoTWF0aC5hYnModmFsKSk7XG5cdCAgcmV0dXJuIGlzTmFOKHZhbCkgPyBiYXNlIDogdmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIEltcGxlbWVudGF0aW9uIG9mIHRvRml4ZWQoKSB0aGF0IHRyZWF0cyBmbG9hdHMgbW9yZSBsaWtlIGRlY2ltYWxzXG5cdCAqXG5cdCAqIEZpeGVzIGJpbmFyeSByb3VuZGluZyBpc3N1ZXMgKGVnLiAoMC42MTUpLnRvRml4ZWQoMikgPT09ICcwLjYxJykgdGhhdCBwcmVzZW50XG5cdCAqIHByb2JsZW1zIGZvciBhY2NvdW50aW5nLSBhbmQgZmluYW5jZS1yZWxhdGVkIHNvZnR3YXJlLlxuXHQgKlxuXHQgKiBgYGBqc1xuXHQgKiAgKDAuNjE1KS50b0ZpeGVkKDIpOyAgICAgICAgICAgLy8gXCIwLjYxXCIgKG5hdGl2ZSB0b0ZpeGVkIGhhcyByb3VuZGluZyBpc3N1ZXMpXG5cdCAqICBhY2NvdW50aW5nLnRvRml4ZWQoMC42MTUsIDIpOyAvLyBcIjAuNjJcIlxuXHQgKiBgYGBcblx0ICpcblx0ICogQG1ldGhvZCB0b0ZpeGVkXG5cdCAqIEBmb3IgYWNjb3VudGluZ1xuXHQgKiBAcGFyYW0ge0Zsb2F0fSAgIHZhbHVlICAgICAgICAgVGhlIGZsb2F0IHRvIGJlIHRyZWF0ZWQgYXMgYSBkZWNpbWFsIG51bWJlci5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtwcmVjaXNpb249Ml0gVGhlIG51bWJlciBvZiBkZWNpbWFsIGRpZ2l0cyB0byBrZWVwLlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSBnaXZlbiBudW1iZXIgdHJhbnNmb3JtZWQgaW50byBhIHN0cmluZyB3aXRoIHRoZSBnaXZlbiBwcmVjaXNzaW9uXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0ZpeGVkKHZhbHVlLCBwcmVjaXNpb24pIHtcblx0ICBwcmVjaXNpb24gPSBfY2hlY2tQcmVjaXNpb24ocHJlY2lzaW9uLCBzZXR0aW5ncy5wcmVjaXNpb24pO1xuXHQgIHZhciBwb3dlciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24pO1xuXG5cdCAgLy8gTXVsdGlwbHkgdXAgYnkgcHJlY2lzaW9uLCByb3VuZCBhY2N1cmF0ZWx5LCB0aGVuIGRpdmlkZSBhbmQgdXNlIG5hdGl2ZSB0b0ZpeGVkKCk6XG5cdCAgcmV0dXJuIChNYXRoLnJvdW5kKCh2YWx1ZSArIDFlLTgpICogcG93ZXIpIC8gcG93ZXIpLnRvRml4ZWQocHJlY2lzaW9uKTtcblx0fVxuXG5cdHZhciBpbmRleCA9IF9fY29tbW9uanMoZnVuY3Rpb24gKG1vZHVsZSkge1xuXHQvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cdHZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXHRmdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0XHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHRcdH1cblxuXHRcdHJldHVybiBPYmplY3QodmFsKTtcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0XHR2YXIgZnJvbTtcblx0XHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHRcdHZhciBzeW1ib2xzO1xuXG5cdFx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdFx0c3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdG87XG5cdH07XG5cdH0pO1xuXG5cdHZhciBvYmplY3RBc3NpZ24gPSAoaW5kZXggJiYgdHlwZW9mIGluZGV4ID09PSAnb2JqZWN0JyAmJiAnZGVmYXVsdCcgaW4gaW5kZXggPyBpbmRleFsnZGVmYXVsdCddIDogaW5kZXgpO1xuXG5cdGZ1bmN0aW9uIF9zdHJpcEluc2lnbmlmaWNhbnRaZXJvcyhzdHIsIGRlY2ltYWwpIHtcblx0ICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoZGVjaW1hbCk7XG5cdCAgdmFyIGludGVnZXJQYXJ0ID0gcGFydHNbMF07XG5cdCAgdmFyIGRlY2ltYWxQYXJ0ID0gcGFydHNbMV0ucmVwbGFjZSgvMCskLywgJycpO1xuXG5cdCAgaWYgKGRlY2ltYWxQYXJ0Lmxlbmd0aCA+IDApIHtcblx0ICAgIHJldHVybiBpbnRlZ2VyUGFydCArIGRlY2ltYWwgKyBkZWNpbWFsUGFydDtcblx0ICB9XG5cblx0ICByZXR1cm4gaW50ZWdlclBhcnQ7XG5cdH1cblxuXHQvKipcblx0ICogRm9ybWF0IGEgbnVtYmVyLCB3aXRoIGNvbW1hLXNlcGFyYXRlZCB0aG91c2FuZHMgYW5kIGN1c3RvbSBwcmVjaXNpb24vZGVjaW1hbCBwbGFjZXNcblx0ICogQWxpYXM6IGBhY2NvdW50aW5nLmZvcm1hdCgpYFxuXHQgKlxuXHQgKiBMb2NhbGlzZSBieSBvdmVycmlkaW5nIHRoZSBwcmVjaXNpb24gYW5kIHRob3VzYW5kIC8gZGVjaW1hbCBzZXBhcmF0b3JzXG5cdCAqXG5cdCAqIGBgYGpzXG5cdCAqIGFjY291bnRpbmcuZm9ybWF0TnVtYmVyKDUzMTgwMDgpOyAgICAgICAgICAgICAgLy8gNSwzMTgsMDA4XG5cdCAqIGFjY291bnRpbmcuZm9ybWF0TnVtYmVyKDk4NzY1NDMuMjEsIHsgcHJlY2lzaW9uOiAzLCB0aG91c2FuZDogXCIgXCIgfSk7IC8vIDkgODc2IDU0My4yMTBcblx0ICogYGBgXG5cdCAqXG5cdCAqIEBtZXRob2QgZm9ybWF0TnVtYmVyXG5cdCAqIEBmb3IgYWNjb3VudGluZ1xuXHQgKiBAcGFyYW0ge051bWJlcn0gICAgICAgIG51bWJlciBUaGUgbnVtYmVyIHRvIGJlIGZvcm1hdHRlZC5cblx0ICogQHBhcmFtIHtPYmplY3R9ICAgICAgICBbb3B0cz17fV0gT2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSBvcHRpb25zIG9mIHRoZSBtZXRob2QuXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGdpdmVuIG51bWJlciBwcm9wZXJseSBmb3JtYXR0ZWQuXG5cdCAgKi9cblx0ZnVuY3Rpb24gZm9ybWF0TnVtYmVyKG51bWJlcikge1xuXHQgIHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cblx0ICAvLyBSZXN1cnNpdmVseSBmb3JtYXQgYXJyYXlzOlxuXHQgIGlmIChBcnJheS5pc0FycmF5KG51bWJlcikpIHtcblx0ICAgIHJldHVybiBudW1iZXIubWFwKGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgICAgcmV0dXJuIGZvcm1hdE51bWJlcih2YWwsIG9wdHMpO1xuXHQgICAgfSk7XG5cdCAgfVxuXG5cdCAgLy8gQnVpbGQgb3B0aW9ucyBvYmplY3QgZnJvbSBzZWNvbmQgcGFyYW0gKGlmIG9iamVjdCkgb3IgYWxsIHBhcmFtcywgZXh0ZW5kaW5nIGRlZmF1bHRzOlxuXHQgIG9wdHMgPSBvYmplY3RBc3NpZ24oe30sIHNldHRpbmdzLCBvcHRzKTtcblxuXHQgIC8vIERvIHNvbWUgY2FsYzpcblx0ICB2YXIgbmVnYXRpdmUgPSBudW1iZXIgPCAwID8gJy0nIDogJyc7XG5cdCAgdmFyIGJhc2UgPSBwYXJzZUludCh0b0ZpeGVkKE1hdGguYWJzKG51bWJlciksIG9wdHMucHJlY2lzaW9uKSwgMTApICsgJyc7XG5cdCAgdmFyIG1vZCA9IGJhc2UubGVuZ3RoID4gMyA/IGJhc2UubGVuZ3RoICUgMyA6IDA7XG5cblx0ICAvLyBGb3JtYXQgdGhlIG51bWJlcjpcblx0ICB2YXIgZm9ybWF0dGVkID0gbmVnYXRpdmUgKyAobW9kID8gYmFzZS5zdWJzdHIoMCwgbW9kKSArIG9wdHMudGhvdXNhbmQgOiAnJykgKyBiYXNlLnN1YnN0cihtb2QpLnJlcGxhY2UoLyhcXGR7M30pKD89XFxkKS9nLCAnJDEnICsgb3B0cy50aG91c2FuZCkgKyAob3B0cy5wcmVjaXNpb24gPiAwID8gb3B0cy5kZWNpbWFsICsgdG9GaXhlZChNYXRoLmFicyhudW1iZXIpLCBvcHRzLnByZWNpc2lvbikuc3BsaXQoJy4nKVsxXSA6ICcnKTtcblxuXHQgIHJldHVybiBvcHRzLnN0cmlwWmVyb3MgPyBfc3RyaXBJbnNpZ25pZmljYW50WmVyb3MoZm9ybWF0dGVkLCBvcHRzLmRlY2ltYWwpIDogZm9ybWF0dGVkO1xuXHR9XG5cblx0dmFyIGluZGV4JDEgPSBfX2NvbW1vbmpzKGZ1bmN0aW9uIChtb2R1bGUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBzdHJWYWx1ZSA9IFN0cmluZy5wcm90b3R5cGUudmFsdWVPZjtcblx0dmFyIHRyeVN0cmluZ09iamVjdCA9IGZ1bmN0aW9uIHRyeVN0cmluZ09iamVjdCh2YWx1ZSkge1xuXHRcdHRyeSB7XG5cdFx0XHRzdHJWYWx1ZS5jYWxsKHZhbHVlKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH07XG5cdHZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cdHZhciBzdHJDbGFzcyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuXHR2YXIgaGFzVG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHJldHVybiBoYXNUb1N0cmluZ1RhZyA/IHRyeVN0cmluZ09iamVjdCh2YWx1ZSkgOiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gc3RyQ2xhc3M7XG5cdH07XG5cdH0pO1xuXG5cdHZhciBpc1N0cmluZyA9IChpbmRleCQxICYmIHR5cGVvZiBpbmRleCQxID09PSAnb2JqZWN0JyAmJiAnZGVmYXVsdCcgaW4gaW5kZXgkMSA/IGluZGV4JDFbJ2RlZmF1bHQnXSA6IGluZGV4JDEpO1xuXG5cdC8qKlxuXHQgKiBQYXJzZXMgYSBmb3JtYXQgc3RyaW5nIG9yIG9iamVjdCBhbmQgcmV0dXJucyBmb3JtYXQgb2JqIGZvciB1c2UgaW4gcmVuZGVyaW5nXG5cdCAqXG5cdCAqIGBmb3JtYXRgIGlzIGVpdGhlciBhIHN0cmluZyB3aXRoIHRoZSBkZWZhdWx0IChwb3NpdGl2ZSkgZm9ybWF0LCBvciBvYmplY3Rcblx0ICogY29udGFpbmluZyBgcG9zYCAocmVxdWlyZWQpLCBgbmVnYCBhbmQgYHplcm9gIHZhbHVlc1xuXHQgKlxuXHQgKiBFaXRoZXIgc3RyaW5nIG9yIGZvcm1hdC5wb3MgbXVzdCBjb250YWluIFwiJXZcIiAodmFsdWUpIHRvIGJlIHZhbGlkXG5cdCAqXG5cdCAqIEBtZXRob2QgX2NoZWNrQ3VycmVuY3lGb3JtYXRcblx0ICogQGZvciBhY2NvdW50aW5nXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgW2Zvcm1hdD1cIiVzJXZcIl0gU3RyaW5nIHdpdGggdGhlIGZvcm1hdCB0byBhcHBseSwgd2hlcmUgJXMgaXMgdGhlIGN1cnJlbmN5IHN5bWJvbCBhbmQgJXYgaXMgdGhlIHZhbHVlLlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IG9iamVjdCByZXByZXNudGluZyBmb3JtYXQgKHdpdGggcG9zLCBuZWcgYW5kIHplcm8gYXR0cmlidXRlcylcblx0ICovXG5cdGZ1bmN0aW9uIF9jaGVja0N1cnJlbmN5Rm9ybWF0KGZvcm1hdCkge1xuXHQgIC8vIEZvcm1hdCBzaG91bGQgYmUgYSBzdHJpbmcsIGluIHdoaWNoIGNhc2UgYHZhbHVlYCAoJyV2JykgbXVzdCBiZSBwcmVzZW50OlxuXHQgIGlmIChpc1N0cmluZyhmb3JtYXQpICYmIGZvcm1hdC5tYXRjaCgnJXYnKSkge1xuXHQgICAgLy8gQ3JlYXRlIGFuZCByZXR1cm4gcG9zaXRpdmUsIG5lZ2F0aXZlIGFuZCB6ZXJvIGZvcm1hdHM6XG5cdCAgICByZXR1cm4ge1xuXHQgICAgICBwb3M6IGZvcm1hdCxcblx0ICAgICAgbmVnOiBmb3JtYXQucmVwbGFjZSgnLScsICcnKS5yZXBsYWNlKCcldicsICctJXYnKSxcblx0ICAgICAgemVybzogZm9ybWF0XG5cdCAgICB9O1xuXHQgIH1cblxuXHQgIC8vIE90aGVyd2lzZSwgYXNzdW1lIGZvcm1hdCB3YXMgZmluZTpcblx0ICByZXR1cm4gZm9ybWF0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEZvcm1hdCBhIG51bWJlciBpbnRvIGN1cnJlbmN5XG5cdCAqXG5cdCAqIFVzYWdlOiBhY2NvdW50aW5nLmZvcm1hdE1vbmV5KG51bWJlciwgc3ltYm9sLCBwcmVjaXNpb24sIHRob3VzYW5kc1NlcCwgZGVjaW1hbFNlcCwgZm9ybWF0KVxuXHQgKiBkZWZhdWx0czogKDAsICckJywgMiwgJywnLCAnLicsICclcyV2Jylcblx0ICpcblx0ICogTG9jYWxpc2UgYnkgb3ZlcnJpZGluZyB0aGUgc3ltYm9sLCBwcmVjaXNpb24sIHRob3VzYW5kIC8gZGVjaW1hbCBzZXBhcmF0b3JzIGFuZCBmb3JtYXRcblx0ICpcblx0ICogYGBganNcblx0ICogLy8gRGVmYXVsdCB1c2FnZTpcblx0ICogYWNjb3VudGluZy5mb3JtYXRNb25leSgxMjM0NTY3OCk7IC8vICQxMiwzNDUsNjc4LjAwXG5cdCAqXG5cdCAqIC8vIEV1cm9wZWFuIGZvcm1hdHRpbmcgKGN1c3RvbSBzeW1ib2wgYW5kIHNlcGFyYXRvcnMpLCBjYW4gYWxzbyB1c2Ugb3B0aW9ucyBvYmplY3QgYXMgc2Vjb25kIHBhcmFtZXRlcjpcblx0ICogYWNjb3VudGluZy5mb3JtYXRNb25leSg0OTk5Ljk5LCB7IHN5bWJvbDogXCLigqxcIiwgcHJlY2lzaW9uOiAyLCB0aG91c2FuZDogXCIuXCIsIGRlY2ltYWw6IFwiLFwiIH0pOyAvLyDigqw0Ljk5OSw5OVxuXHQgKlxuXHQgKiAvLyBOZWdhdGl2ZSB2YWx1ZXMgY2FuIGJlIGZvcm1hdHRlZCBuaWNlbHk6XG5cdCAqIGFjY291bnRpbmcuZm9ybWF0TW9uZXkoLTUwMDAwMCwgeyBzeW1ib2w6IFwiwqMgXCIsIHByZWNpc2lvbjogMCB9KTsgLy8gwqMgLTUwMCwwMDBcblx0ICpcblx0ICogLy8gU2ltcGxlIGBmb3JtYXRgIHN0cmluZyBhbGxvd3MgY29udHJvbCBvZiBzeW1ib2wgcG9zaXRpb24gKCV2ID0gdmFsdWUsICVzID0gc3ltYm9sKTpcblx0ICogYWNjb3VudGluZy5mb3JtYXRNb25leSg1MzE4MDA4LCB7IHN5bWJvbDogXCJHQlBcIiwgIGZvcm1hdDogXCIldiAlc1wiIH0pOyAvLyA1LDMxOCwwMDguMDAgR0JQXG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBAbWV0aG9kIGZvcm1hdE1vbmV5XG5cdCAqIEBmb3IgYWNjb3VudGluZ1xuXHQgKiBAcGFyYW0ge051bWJlcn0gICAgICAgIG51bWJlciBOdW1iZXIgdG8gYmUgZm9ybWF0dGVkLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gICAgICAgIFtvcHRzPXt9XSBPYmplY3QgY29udGFpbmluZyBhbGwgdGhlIG9wdGlvbnMgb2YgdGhlIG1ldGhvZC5cblx0ICogQHJldHVybiB7U3RyaW5nfSBUaGUgZ2l2ZW4gbnVtYmVyIHByb3Blcmx5IGZvcm1hdHRlZCBhcyBtb25leS5cblx0ICovXG5cdGZ1bmN0aW9uIGZvcm1hdE1vbmV5KG51bWJlcikge1xuXHQgIHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cblx0ICAvLyBSZXN1cnNpdmVseSBmb3JtYXQgYXJyYXlzOlxuXHQgIGlmIChBcnJheS5pc0FycmF5KG51bWJlcikpIHtcblx0ICAgIHJldHVybiBudW1iZXIubWFwKGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgICAgcmV0dXJuIGZvcm1hdE1vbmV5KHZhbCwgb3B0cyk7XG5cdCAgICB9KTtcblx0ICB9XG5cblx0ICAvLyBCdWlsZCBvcHRpb25zIG9iamVjdCBmcm9tIHNlY29uZCBwYXJhbSAoaWYgb2JqZWN0KSBvciBhbGwgcGFyYW1zLCBleHRlbmRpbmcgZGVmYXVsdHM6XG5cdCAgb3B0cyA9IG9iamVjdEFzc2lnbih7fSwgc2V0dGluZ3MsIG9wdHMpO1xuXG5cdCAgLy8gQ2hlY2sgZm9ybWF0IChyZXR1cm5zIG9iamVjdCB3aXRoIHBvcywgbmVnIGFuZCB6ZXJvKTpcblx0ICB2YXIgZm9ybWF0cyA9IF9jaGVja0N1cnJlbmN5Rm9ybWF0KG9wdHMuZm9ybWF0KTtcblxuXHQgIC8vIENob29zZSB3aGljaCBmb3JtYXQgdG8gdXNlIGZvciB0aGlzIHZhbHVlOlxuXHQgIHZhciB1c2VGb3JtYXQgPSB1bmRlZmluZWQ7XG5cblx0ICBpZiAobnVtYmVyID4gMCkge1xuXHQgICAgdXNlRm9ybWF0ID0gZm9ybWF0cy5wb3M7XG5cdCAgfSBlbHNlIGlmIChudW1iZXIgPCAwKSB7XG5cdCAgICB1c2VGb3JtYXQgPSBmb3JtYXRzLm5lZztcblx0ICB9IGVsc2Uge1xuXHQgICAgdXNlRm9ybWF0ID0gZm9ybWF0cy56ZXJvO1xuXHQgIH1cblxuXHQgIC8vIFJldHVybiB3aXRoIGN1cnJlbmN5IHN5bWJvbCBhZGRlZDpcblx0ICByZXR1cm4gdXNlRm9ybWF0LnJlcGxhY2UoJyVzJywgb3B0cy5zeW1ib2wpLnJlcGxhY2UoJyV2JywgZm9ybWF0TnVtYmVyKE1hdGguYWJzKG51bWJlciksIG9wdHMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3JtYXQgYSBsaXN0IG9mIG51bWJlcnMgaW50byBhbiBhY2NvdW50aW5nIGNvbHVtbiwgcGFkZGluZyB3aXRoIHdoaXRlc3BhY2Vcblx0ICogdG8gbGluZSB1cCBjdXJyZW5jeSBzeW1ib2xzLCB0aG91c2FuZCBzZXBhcmF0b3JzIGFuZCBkZWNpbWFscyBwbGFjZXNcblx0ICpcblx0ICogTGlzdCBzaG91bGQgYmUgYW4gYXJyYXkgb2YgbnVtYmVyc1xuXHQgKlxuXHQgKiBSZXR1cm5zIGFycmF5IG9mIGFjY291dGluZy1mb3JtYXR0ZWQgbnVtYmVyIHN0cmluZ3Mgb2Ygc2FtZSBsZW5ndGhcblx0ICpcblx0ICogTkI6IGB3aGl0ZS1zcGFjZTpwcmVgIENTUyBydWxlIGlzIHJlcXVpcmVkIG9uIHRoZSBsaXN0IGNvbnRhaW5lciB0byBwcmV2ZW50XG5cdCAqIGJyb3dzZXJzIGZyb20gY29sbGFwc2luZyB0aGUgd2hpdGVzcGFjZSBpbiB0aGUgb3V0cHV0IHN0cmluZ3MuXG5cdCAqXG5cdCAqIGBgYGpzXG5cdCAqIGFjY291bnRpbmcuZm9ybWF0Q29sdW1uKFsxMjMuNSwgMzQ1Ni40OSwgNzc3ODg4Ljk5LCAxMjM0NTY3OCwgLTU0MzJdLCB7IHN5bWJvbDogXCIkIFwiIH0pO1xuXHQgKiBgYGBcblx0ICpcblx0ICogQG1ldGhvZCBmb3JtYXRDb2x1bW5cblx0ICogQGZvciBhY2NvdW50aW5nXG5cdCAqIEBwYXJhbSB7QXJyYXk8TnVtYmVyPn0gbGlzdCBBbiBhcnJheSBvZiBudW1iZXJzIHRvIGZvcm1hdFxuXHQgKiBAcGFyYW0ge09iamVjdH0gICAgICAgIFtvcHRzPXt9XSBPYmplY3QgY29udGFpbmluZyBhbGwgdGhlIG9wdGlvbnMgb2YgdGhlIG1ldGhvZC5cblx0ICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBbc3ltYm9sPVwiJFwiXSBTdHJpbmcgd2l0aCB0aGUgY3VycmVuY3kgc3ltYm9sLiBGb3IgY29udmVuaWVuY3kgaWYgY2FuIGJlIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgb3B0aW9ucyBvZiB0aGUgbWV0aG9kLlxuXHQgKiBAcGFyYW0ge0ludGVnZXJ9ICAgICAgIFtwcmVjaXNpb249Ml0gTnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgW3Rob3VzYW5kPScsJ10gU3RyaW5nIHdpdGggdGhlIHRob3VzYW5kcyBzZXBhcmF0b3IuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgW2RlY2ltYWw9XCIuXCJdIFN0cmluZyB3aXRoIHRoZSBkZWNpbWFsIHNlcGFyYXRvci5cblx0ICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICBbZm9ybWF0PVwiJXMldlwiXSBTdHJpbmcgd2l0aCB0aGUgZm9ybWF0IHRvIGFwcGx5LCB3aGVyZSAlcyBpcyB0aGUgY3VycmVuY3kgc3ltYm9sIGFuZCAldiBpcyB0aGUgdmFsdWUuXG5cdCAqIEByZXR1cm4ge0FycmF5PFN0cmluZz59IGFycmF5IG9mIGFjY291dGluZy1mb3JtYXR0ZWQgbnVtYmVyIHN0cmluZ3Mgb2Ygc2FtZSBsZW5ndGhcblx0ICovXG5cdGZ1bmN0aW9uIGZvcm1hdENvbHVtbihsaXN0KSB7XG5cdCAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIGlmICghbGlzdCkgcmV0dXJuIFtdO1xuXG5cdCAgLy8gQnVpbGQgb3B0aW9ucyBvYmplY3QgZnJvbSBzZWNvbmQgcGFyYW0gKGlmIG9iamVjdCkgb3IgYWxsIHBhcmFtcywgZXh0ZW5kaW5nIGRlZmF1bHRzOlxuXHQgIG9wdHMgPSBvYmplY3RBc3NpZ24oe30sIHNldHRpbmdzLCBvcHRzKTtcblxuXHQgIC8vIENoZWNrIGZvcm1hdCAocmV0dXJucyBvYmplY3Qgd2l0aCBwb3MsIG5lZyBhbmQgemVybyksIG9ubHkgbmVlZCBwb3MgZm9yIG5vdzpcblx0ICB2YXIgZm9ybWF0cyA9IF9jaGVja0N1cnJlbmN5Rm9ybWF0KG9wdHMuZm9ybWF0KTtcblxuXHQgIC8vIFdoZXRoZXIgdG8gcGFkIGF0IHN0YXJ0IG9mIHN0cmluZyBvciBhZnRlciBjdXJyZW5jeSBzeW1ib2w6XG5cdCAgdmFyIHBhZEFmdGVyU3ltYm9sID0gZm9ybWF0cy5wb3MuaW5kZXhPZignJXMnKSA8IGZvcm1hdHMucG9zLmluZGV4T2YoJyV2Jyk7XG5cblx0ICAvLyBTdG9yZSB2YWx1ZSBmb3IgdGhlIGxlbmd0aCBvZiB0aGUgbG9uZ2VzdCBzdHJpbmcgaW4gdGhlIGNvbHVtbjpcblx0ICB2YXIgbWF4TGVuZ3RoID0gMDtcblxuXHQgIC8vIEZvcm1hdCB0aGUgbGlzdCBhY2NvcmRpbmcgdG8gb3B0aW9ucywgc3RvcmUgdGhlIGxlbmd0aCBvZiB0aGUgbG9uZ2VzdCBzdHJpbmc6XG5cdCAgdmFyIGZvcm1hdHRlZCA9IGxpc3QubWFwKGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcblx0ICAgICAgLy8gUmVjdXJzaXZlbHkgZm9ybWF0IGNvbHVtbnMgaWYgbGlzdCBpcyBhIG11bHRpLWRpbWVuc2lvbmFsIGFycmF5OlxuXHQgICAgICByZXR1cm4gZm9ybWF0Q29sdW1uKHZhbCwgb3B0cyk7XG5cdCAgICB9XG5cdCAgICAvLyBDbGVhbiB1cCB0aGUgdmFsdWVcblx0ICAgIHZhbCA9IHVuZm9ybWF0KHZhbCwgb3B0cy5kZWNpbWFsKTtcblxuXHQgICAgLy8gQ2hvb3NlIHdoaWNoIGZvcm1hdCB0byB1c2UgZm9yIHRoaXMgdmFsdWUgKHBvcywgbmVnIG9yIHplcm8pOlxuXHQgICAgdmFyIHVzZUZvcm1hdCA9IHVuZGVmaW5lZDtcblxuXHQgICAgaWYgKHZhbCA+IDApIHtcblx0ICAgICAgdXNlRm9ybWF0ID0gZm9ybWF0cy5wb3M7XG5cdCAgICB9IGVsc2UgaWYgKHZhbCA8IDApIHtcblx0ICAgICAgdXNlRm9ybWF0ID0gZm9ybWF0cy5uZWc7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB1c2VGb3JtYXQgPSBmb3JtYXRzLnplcm87XG5cdCAgICB9XG5cblx0ICAgIC8vIEZvcm1hdCB0aGlzIHZhbHVlLCBwdXNoIGludG8gZm9ybWF0dGVkIGxpc3QgYW5kIHNhdmUgdGhlIGxlbmd0aDpcblx0ICAgIHZhciBmVmFsID0gdXNlRm9ybWF0LnJlcGxhY2UoJyVzJywgb3B0cy5zeW1ib2wpLnJlcGxhY2UoJyV2JywgZm9ybWF0TnVtYmVyKE1hdGguYWJzKHZhbCksIG9wdHMpKTtcblxuXHQgICAgaWYgKGZWYWwubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG5cdCAgICAgIG1heExlbmd0aCA9IGZWYWwubGVuZ3RoO1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gZlZhbDtcblx0ICB9KTtcblxuXHQgIC8vIFBhZCBlYWNoIG51bWJlciBpbiB0aGUgbGlzdCBhbmQgc2VuZCBiYWNrIHRoZSBjb2x1bW4gb2YgbnVtYmVyczpcblx0ICByZXR1cm4gZm9ybWF0dGVkLm1hcChmdW5jdGlvbiAodmFsKSB7XG5cdCAgICAvLyBPbmx5IGlmIHRoaXMgaXMgYSBzdHJpbmcgKG5vdCBhIG5lc3RlZCBhcnJheSwgd2hpY2ggd291bGQgaGF2ZSBhbHJlYWR5IGJlZW4gcGFkZGVkKTpcblx0ICAgIGlmIChpc1N0cmluZyh2YWwpICYmIHZhbC5sZW5ndGggPCBtYXhMZW5ndGgpIHtcblx0ICAgICAgLy8gRGVwZW5kaW5nIG9uIHN5bWJvbCBwb3NpdGlvbiwgcGFkIGFmdGVyIHN5bWJvbCBvciBhdCBpbmRleCAwOlxuXHQgICAgICByZXR1cm4gcGFkQWZ0ZXJTeW1ib2wgPyB2YWwucmVwbGFjZShvcHRzLnN5bWJvbCwgb3B0cy5zeW1ib2wgKyBuZXcgQXJyYXkobWF4TGVuZ3RoIC0gdmFsLmxlbmd0aCArIDEpLmpvaW4oJyAnKSkgOiBuZXcgQXJyYXkobWF4TGVuZ3RoIC0gdmFsLmxlbmd0aCArIDEpLmpvaW4oJyAnKSArIHZhbDtcblx0ICAgIH1cblx0ICAgIHJldHVybiB2YWw7XG5cdCAgfSk7XG5cdH1cblxuXHRleHBvcnRzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cdGV4cG9ydHMudW5mb3JtYXQgPSB1bmZvcm1hdDtcblx0ZXhwb3J0cy50b0ZpeGVkID0gdG9GaXhlZDtcblx0ZXhwb3J0cy5mb3JtYXRNb25leSA9IGZvcm1hdE1vbmV5O1xuXHRleHBvcnRzLmZvcm1hdE51bWJlciA9IGZvcm1hdE51bWJlcjtcblx0ZXhwb3J0cy5mb3JtYXRDb2x1bW4gPSBmb3JtYXRDb2x1bW47XG5cdGV4cG9ydHMuZm9ybWF0ID0gZm9ybWF0TW9uZXk7XG5cdGV4cG9ydHMucGFyc2UgPSB1bmZvcm1hdDtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWNjb3VudGluZy51bWQuanMubWFwIiwiLyohIGRlY2ltYWwuanMtbGlnaHQgdjIuNS4wIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWtlTWNsL2RlY2ltYWwuanMtbGlnaHQvTElDRU5DRSAqL1xyXG47KGZ1bmN0aW9uIChnbG9iYWxTY29wZSkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcblxyXG4gIC8qXHJcbiAgICogIGRlY2ltYWwuanMtbGlnaHQgdjIuNS4wXHJcbiAgICogIEFuIGFyYml0cmFyeS1wcmVjaXNpb24gRGVjaW1hbCB0eXBlIGZvciBKYXZhU2NyaXB0LlxyXG4gICAqICBodHRwczovL2dpdGh1Yi5jb20vTWlrZU1jbC9kZWNpbWFsLmpzLWxpZ2h0XHJcbiAgICogIENvcHlyaWdodCAoYykgMjAxOCBNaWNoYWVsIE1jbGF1Z2hsaW4gPE04Y2g4OGxAZ21haWwuY29tPlxyXG4gICAqICBNSVQgRXhwYXQgTGljZW5jZVxyXG4gICAqL1xyXG5cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIEVESVRBQkxFIERFRkFVTFRTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblxyXG4gICAgLy8gVGhlIGxpbWl0IG9uIHRoZSB2YWx1ZSBvZiBgcHJlY2lzaW9uYCwgYW5kIG9uIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgYXJndW1lbnQgdG9cclxuICAgIC8vIGB0b0RlY2ltYWxQbGFjZXNgLCBgdG9FeHBvbmVudGlhbGAsIGB0b0ZpeGVkYCwgYHRvUHJlY2lzaW9uYCBhbmQgYHRvU2lnbmlmaWNhbnREaWdpdHNgLlxyXG4gIHZhciBNQVhfRElHSVRTID0gMWU5LCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gMWU5XHJcblxyXG5cclxuICAgIC8vIFRoZSBpbml0aWFsIGNvbmZpZ3VyYXRpb24gcHJvcGVydGllcyBvZiB0aGUgRGVjaW1hbCBjb25zdHJ1Y3Rvci5cclxuICAgIERlY2ltYWwgPSB7XHJcblxyXG4gICAgICAvLyBUaGVzZSB2YWx1ZXMgbXVzdCBiZSBpbnRlZ2VycyB3aXRoaW4gdGhlIHN0YXRlZCByYW5nZXMgKGluY2x1c2l2ZSkuXHJcbiAgICAgIC8vIE1vc3Qgb2YgdGhlc2UgdmFsdWVzIGNhbiBiZSBjaGFuZ2VkIGR1cmluZyBydW4tdGltZSB1c2luZyBgRGVjaW1hbC5jb25maWdgLlxyXG5cclxuICAgICAgLy8gVGhlIG1heGltdW0gbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cyBvZiB0aGUgcmVzdWx0IG9mIGEgY2FsY3VsYXRpb24gb3IgYmFzZSBjb252ZXJzaW9uLlxyXG4gICAgICAvLyBFLmcuIGBEZWNpbWFsLmNvbmZpZyh7IHByZWNpc2lvbjogMjAgfSk7YFxyXG4gICAgICBwcmVjaXNpb246IDIwLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxIHRvIE1BWF9ESUdJVFNcclxuXHJcbiAgICAgIC8vIFRoZSByb3VuZGluZyBtb2RlIHVzZWQgYnkgZGVmYXVsdCBieSBgdG9JbnRlZ2VyYCwgYHRvRGVjaW1hbFBsYWNlc2AsIGB0b0V4cG9uZW50aWFsYCxcclxuICAgICAgLy8gYHRvRml4ZWRgLCBgdG9QcmVjaXNpb25gIGFuZCBgdG9TaWduaWZpY2FudERpZ2l0c2AuXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIFJPVU5EX1VQICAgICAgICAgMCBBd2F5IGZyb20gemVyby5cclxuICAgICAgLy8gUk9VTkRfRE9XTiAgICAgICAxIFRvd2FyZHMgemVyby5cclxuICAgICAgLy8gUk9VTkRfQ0VJTCAgICAgICAyIFRvd2FyZHMgK0luZmluaXR5LlxyXG4gICAgICAvLyBST1VORF9GTE9PUiAgICAgIDMgVG93YXJkcyAtSW5maW5pdHkuXHJcbiAgICAgIC8vIFJPVU5EX0hBTEZfVVAgICAgNCBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdXAuXHJcbiAgICAgIC8vIFJPVU5EX0hBTEZfRE9XTiAgNSBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgZG93bi5cclxuICAgICAgLy8gUk9VTkRfSEFMRl9FVkVOICA2IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB0b3dhcmRzIGV2ZW4gbmVpZ2hib3VyLlxyXG4gICAgICAvLyBST1VORF9IQUxGX0NFSUwgIDcgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHRvd2FyZHMgK0luZmluaXR5LlxyXG4gICAgICAvLyBST1VORF9IQUxGX0ZMT09SIDggVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHRvd2FyZHMgLUluZmluaXR5LlxyXG4gICAgICAvL1xyXG4gICAgICAvLyBFLmcuXHJcbiAgICAgIC8vIGBEZWNpbWFsLnJvdW5kaW5nID0gNDtgXHJcbiAgICAgIC8vIGBEZWNpbWFsLnJvdW5kaW5nID0gRGVjaW1hbC5ST1VORF9IQUxGX1VQO2BcclxuICAgICAgcm91bmRpbmc6IDQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byA4XHJcblxyXG4gICAgICAvLyBUaGUgZXhwb25lbnQgdmFsdWUgYXQgYW5kIGJlbmVhdGggd2hpY2ggYHRvU3RyaW5nYCByZXR1cm5zIGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICAvLyBKYXZhU2NyaXB0IG51bWJlcnM6IC03XHJcbiAgICAgIHRvRXhwTmVnOiAtNywgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gLU1BWF9FXHJcblxyXG4gICAgICAvLyBUaGUgZXhwb25lbnQgdmFsdWUgYXQgYW5kIGFib3ZlIHdoaWNoIGB0b1N0cmluZ2AgcmV0dXJucyBleHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgICAgLy8gSmF2YVNjcmlwdCBudW1iZXJzOiAyMVxyXG4gICAgICB0b0V4cFBvczogIDIxLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIE1BWF9FXHJcblxyXG4gICAgICAvLyBUaGUgbmF0dXJhbCBsb2dhcml0aG0gb2YgMTAuXHJcbiAgICAgIC8vIDExNSBkaWdpdHNcclxuICAgICAgTE4xMDogJzIuMzAyNTg1MDkyOTk0MDQ1Njg0MDE3OTkxNDU0Njg0MzY0MjA3NjAxMTAxNDg4NjI4NzcyOTc2MDMzMzI3OTAwOTY3NTcyNjA5Njc3MzUyNDgwMjM1OTk3MjA1MDg5NTk4Mjk4MzQxOTY3Nzg0MDQyMjg2J1xyXG4gICAgfSxcclxuXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVORCBPRiBFRElUQUJMRSBERUZBVUxUUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG5cclxuICAgIGV4dGVybmFsID0gdHJ1ZSxcclxuXHJcbiAgICBkZWNpbWFsRXJyb3IgPSAnW0RlY2ltYWxFcnJvcl0gJyxcclxuICAgIGludmFsaWRBcmd1bWVudCA9IGRlY2ltYWxFcnJvciArICdJbnZhbGlkIGFyZ3VtZW50OiAnLFxyXG4gICAgZXhwb25lbnRPdXRPZlJhbmdlID0gZGVjaW1hbEVycm9yICsgJ0V4cG9uZW50IG91dCBvZiByYW5nZTogJyxcclxuXHJcbiAgICBtYXRoZmxvb3IgPSBNYXRoLmZsb29yLFxyXG4gICAgbWF0aHBvdyA9IE1hdGgucG93LFxyXG5cclxuICAgIGlzRGVjaW1hbCA9IC9eKFxcZCsoXFwuXFxkKik/fFxcLlxcZCspKGVbKy1dP1xcZCspPyQvaSxcclxuXHJcbiAgICBPTkUsXHJcbiAgICBCQVNFID0gMWU3LFxyXG4gICAgTE9HX0JBU0UgPSA3LFxyXG4gICAgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTEsXHJcbiAgICBNQVhfRSA9IG1hdGhmbG9vcihNQVhfU0FGRV9JTlRFR0VSIC8gTE9HX0JBU0UpLCAgICAvLyAxMjg2NzQyNzUwNjc3Mjg0XHJcblxyXG4gICAgLy8gRGVjaW1hbC5wcm90b3R5cGUgb2JqZWN0XHJcbiAgICBQID0ge307XHJcblxyXG5cclxuICAvLyBEZWNpbWFsIHByb3RvdHlwZSBtZXRob2RzXHJcblxyXG5cclxuICAvKlxyXG4gICAqICBhYnNvbHV0ZVZhbHVlICAgICAgICAgICAgICAgICAgICAgICBhYnNcclxuICAgKiAgY29tcGFyZWRUbyAgICAgICAgICAgICAgICAgICAgICAgICAgY21wXHJcbiAgICogIGRlY2ltYWxQbGFjZXMgICAgICAgICAgICAgICAgICAgICAgIGRwXHJcbiAgICogIGRpdmlkZWRCeSAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdlxyXG4gICAqICBkaXZpZGVkVG9JbnRlZ2VyQnkgICAgICAgICAgICAgICAgICBpZGl2XHJcbiAgICogIGVxdWFscyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVxXHJcbiAgICogIGV4cG9uZW50XHJcbiAgICogIGdyZWF0ZXJUaGFuICAgICAgICAgICAgICAgICAgICAgICAgIGd0XHJcbiAgICogIGdyZWF0ZXJUaGFuT3JFcXVhbFRvICAgICAgICAgICAgICAgIGd0ZVxyXG4gICAqICBpc0ludGVnZXIgICAgICAgICAgICAgICAgICAgICAgICAgICBpc2ludFxyXG4gICAqICBpc05lZ2F0aXZlICAgICAgICAgICAgICAgICAgICAgICAgICBpc25lZ1xyXG4gICAqICBpc1Bvc2l0aXZlICAgICAgICAgICAgICAgICAgICAgICAgICBpc3Bvc1xyXG4gICAqICBpc1plcm9cclxuICAgKiAgbGVzc1RoYW4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbHRcclxuICAgKiAgbGVzc1RoYW5PckVxdWFsVG8gICAgICAgICAgICAgICAgICAgbHRlXHJcbiAgICogIGxvZ2FyaXRobSAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ1xyXG4gICAqICBtaW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJcclxuICAgKiAgbW9kdWxvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kXHJcbiAgICogIG5hdHVyYWxFeHBvbmVudGlhbCAgICAgICAgICAgICAgICAgIGV4cFxyXG4gICAqICBuYXR1cmFsTG9nYXJpdGhtICAgICAgICAgICAgICAgICAgICBsblxyXG4gICAqICBuZWdhdGVkICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWdcclxuICAgKiAgcGx1cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkXHJcbiAgICogIHByZWNpc2lvbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkXHJcbiAgICogIHNxdWFyZVJvb3QgICAgICAgICAgICAgICAgICAgICAgICAgIHNxcnRcclxuICAgKiAgdGltZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsXHJcbiAgICogIHRvRGVjaW1hbFBsYWNlcyAgICAgICAgICAgICAgICAgICAgIHRvZHBcclxuICAgKiAgdG9FeHBvbmVudGlhbFxyXG4gICAqICB0b0ZpeGVkXHJcbiAgICogIHRvSW50ZWdlciAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvaW50XHJcbiAgICogIHRvTnVtYmVyXHJcbiAgICogIHRvUG93ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvd1xyXG4gICAqICB0b1ByZWNpc2lvblxyXG4gICAqICB0b1NpZ25pZmljYW50RGlnaXRzICAgICAgICAgICAgICAgICB0b3NkXHJcbiAgICogIHRvU3RyaW5nXHJcbiAgICogIHZhbHVlT2YgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbFxyXG4gICAqL1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgYWJzb2x1dGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5hYnNvbHV0ZVZhbHVlID0gUC5hYnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgeCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMpO1xyXG4gICAgaWYgKHgucykgeC5zID0gMTtcclxuICAgIHJldHVybiB4O1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVyblxyXG4gICAqICAgMSAgICBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGdyZWF0ZXIgdGhhbiB0aGUgdmFsdWUgb2YgYHlgLFxyXG4gICAqICAtMSAgICBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGxlc3MgdGhhbiB0aGUgdmFsdWUgb2YgYHlgLFxyXG4gICAqICAgMCAgICBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgdmFsdWVcclxuICAgKlxyXG4gICAqL1xyXG4gIFAuY29tcGFyZWRUbyA9IFAuY21wID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciBpLCBqLCB4ZEwsIHlkTCxcclxuICAgICAgeCA9IHRoaXM7XHJcblxyXG4gICAgeSA9IG5ldyB4LmNvbnN0cnVjdG9yKHkpO1xyXG5cclxuICAgIC8vIFNpZ25zIGRpZmZlcj9cclxuICAgIGlmICh4LnMgIT09IHkucykgcmV0dXJuIHgucyB8fCAteS5zO1xyXG5cclxuICAgIC8vIENvbXBhcmUgZXhwb25lbnRzLlxyXG4gICAgaWYgKHguZSAhPT0geS5lKSByZXR1cm4geC5lID4geS5lIF4geC5zIDwgMCA/IDEgOiAtMTtcclxuXHJcbiAgICB4ZEwgPSB4LmQubGVuZ3RoO1xyXG4gICAgeWRMID0geS5kLmxlbmd0aDtcclxuXHJcbiAgICAvLyBDb21wYXJlIGRpZ2l0IGJ5IGRpZ2l0LlxyXG4gICAgZm9yIChpID0gMCwgaiA9IHhkTCA8IHlkTCA/IHhkTCA6IHlkTDsgaSA8IGo7ICsraSkge1xyXG4gICAgICBpZiAoeC5kW2ldICE9PSB5LmRbaV0pIHJldHVybiB4LmRbaV0gPiB5LmRbaV0gXiB4LnMgPCAwID8gMSA6IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbXBhcmUgbGVuZ3Rocy5cclxuICAgIHJldHVybiB4ZEwgPT09IHlkTCA/IDAgOiB4ZEwgPiB5ZEwgXiB4LnMgPCAwID8gMSA6IC0xO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIG9mIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmRlY2ltYWxQbGFjZXMgPSBQLmRwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHggPSB0aGlzLFxyXG4gICAgICB3ID0geC5kLmxlbmd0aCAtIDEsXHJcbiAgICAgIGRwID0gKHcgLSB4LmUpICogTE9HX0JBU0U7XHJcblxyXG4gICAgLy8gU3VidHJhY3QgdGhlIG51bWJlciBvZiB0cmFpbGluZyB6ZXJvcyBvZiB0aGUgbGFzdCB3b3JkLlxyXG4gICAgdyA9IHguZFt3XTtcclxuICAgIGlmICh3KSBmb3IgKDsgdyAlIDEwID09IDA7IHcgLz0gMTApIGRwLS07XHJcblxyXG4gICAgcmV0dXJuIGRwIDwgMCA/IDAgOiBkcDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGRpdmlkZWQgYnkgYHlgLCB0cnVuY2F0ZWQgdG9cclxuICAgKiBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmRpdmlkZWRCeSA9IFAuZGl2ID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHJldHVybiBkaXZpZGUodGhpcywgbmV3IHRoaXMuY29uc3RydWN0b3IoeSkpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBpbnRlZ2VyIHBhcnQgb2YgZGl2aWRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbFxyXG4gICAqIGJ5IHRoZSB2YWx1ZSBvZiBgeWAsIHRydW5jYXRlZCB0byBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmRpdmlkZWRUb0ludGVnZXJCeSA9IFAuaWRpdiA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG4gICAgcmV0dXJuIHJvdW5kKGRpdmlkZSh4LCBuZXcgQ3Rvcih5KSwgMCwgMSksIEN0b3IucHJlY2lzaW9uKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiBgeWAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmVxdWFscyA9IFAuZXEgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuICF0aGlzLmNtcCh5KTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdGhlIChiYXNlIDEwKSBleHBvbmVudCB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgKHRoaXMuZSBpcyB0aGUgYmFzZSAxMDAwMDAwMCBleHBvbmVudCkuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmV4cG9uZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGdldEJhc2UxMEV4cG9uZW50KHRoaXMpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZSBvZiBgeWAsIG90aGVyd2lzZSByZXR1cm5cclxuICAgKiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZ3JlYXRlclRoYW4gPSBQLmd0ID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHJldHVybiB0aGlzLmNtcCh5KSA+IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIGB5YCxcclxuICAgKiBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5ncmVhdGVyVGhhbk9yRXF1YWxUbyA9IFAuZ3RlID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHJldHVybiB0aGlzLmNtcCh5KSA+PSAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgYW4gaW50ZWdlciwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuaXNJbnRlZ2VyID0gUC5pc2ludCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmUgPiB0aGlzLmQubGVuZ3RoIC0gMjtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIG5lZ2F0aXZlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5pc05lZ2F0aXZlID0gUC5pc25lZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnMgPCAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgcG9zaXRpdmUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmlzUG9zaXRpdmUgPSBQLmlzcG9zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucyA+IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyAwLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5pc1plcm8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zID09PSAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgbGVzcyB0aGFuIGB5YCwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubGVzc1RoYW4gPSBQLmx0ID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHJldHVybiB0aGlzLmNtcCh5KSA8IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYHlgLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5sZXNzVGhhbk9yRXF1YWxUbyA9IFAubHRlID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHJldHVybiB0aGlzLmNtcCh5KSA8IDE7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRoZSBsb2dhcml0aG0gb2YgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCB0byB0aGUgc3BlY2lmaWVkIGJhc2UsIHRydW5jYXRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqIElmIG5vIGJhc2UgaXMgc3BlY2lmaWVkLCByZXR1cm4gbG9nWzEwXSh4KS5cclxuICAgKlxyXG4gICAqIGxvZ1tiYXNlXSh4KSA9IGxuKHgpIC8gbG4oYmFzZSlcclxuICAgKlxyXG4gICAqIFRoZSBtYXhpbXVtIGVycm9yIG9mIHRoZSByZXN1bHQgaXMgMSB1bHAgKHVuaXQgaW4gdGhlIGxhc3QgcGxhY2UpLlxyXG4gICAqXHJcbiAgICogW2Jhc2VdIHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9IFRoZSBiYXNlIG9mIHRoZSBsb2dhcml0aG0uXHJcbiAgICpcclxuICAgKi9cclxuICBQLmxvZ2FyaXRobSA9IFAubG9nID0gZnVuY3Rpb24gKGJhc2UpIHtcclxuICAgIHZhciByLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHByID0gQ3Rvci5wcmVjaXNpb24sXHJcbiAgICAgIHdwciA9IHByICsgNTtcclxuXHJcbiAgICAvLyBEZWZhdWx0IGJhc2UgaXMgMTAuXHJcbiAgICBpZiAoYmFzZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgIGJhc2UgPSBuZXcgQ3RvcigxMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBiYXNlID0gbmV3IEN0b3IoYmFzZSk7XHJcblxyXG4gICAgICAvLyBsb2dbLWJdKHgpID0gTmFOXHJcbiAgICAgIC8vIGxvZ1swXSh4KSAgPSBOYU5cclxuICAgICAgLy8gbG9nWzFdKHgpICA9IE5hTlxyXG4gICAgICBpZiAoYmFzZS5zIDwgMSB8fCBiYXNlLmVxKE9ORSkpIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdOYU4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBsb2dbYl0oLXgpID0gTmFOXHJcbiAgICAvLyBsb2dbYl0oMCkgPSAtSW5maW5pdHlcclxuICAgIGlmICh4LnMgPCAxKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAoeC5zID8gJ05hTicgOiAnLUluZmluaXR5JykpO1xyXG5cclxuICAgIC8vIGxvZ1tiXSgxKSA9IDBcclxuICAgIGlmICh4LmVxKE9ORSkpIHJldHVybiBuZXcgQ3RvcigwKTtcclxuXHJcbiAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG4gICAgciA9IGRpdmlkZShsbih4LCB3cHIpLCBsbihiYXNlLCB3cHIpLCB3cHIpO1xyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiByb3VuZChyLCBwcik7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBtaW51cyBgeWAsIHRydW5jYXRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubWludXMgPSBQLnN1YiA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICB2YXIgeCA9IHRoaXM7XHJcbiAgICB5ID0gbmV3IHguY29uc3RydWN0b3IoeSk7XHJcbiAgICByZXR1cm4geC5zID09IHkucyA/IHN1YnRyYWN0KHgsIHkpIDogYWRkKHgsICh5LnMgPSAteS5zLCB5KSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBtb2R1bG8gYHlgLCB0cnVuY2F0ZWQgdG9cclxuICAgKiBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKi9cclxuICBQLm1vZHVsbyA9IFAubW9kID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciBxLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcblxyXG4gICAgeSA9IG5ldyBDdG9yKHkpO1xyXG5cclxuICAgIC8vIHggJSAwID0gTmFOXHJcbiAgICBpZiAoIXkucykgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgJ05hTicpO1xyXG5cclxuICAgIC8vIFJldHVybiB4IGlmIHggaXMgMC5cclxuICAgIGlmICgheC5zKSByZXR1cm4gcm91bmQobmV3IEN0b3IoeCksIHByKTtcclxuXHJcbiAgICAvLyBQcmV2ZW50IHJvdW5kaW5nIG9mIGludGVybWVkaWF0ZSBjYWxjdWxhdGlvbnMuXHJcbiAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG4gICAgcSA9IGRpdmlkZSh4LCB5LCAwLCAxKS50aW1lcyh5KTtcclxuICAgIGV4dGVybmFsID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4geC5taW51cyhxKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgbmF0dXJhbCBleHBvbmVudGlhbCBvZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLFxyXG4gICAqIGkuZS4gdGhlIGJhc2UgZSByYWlzZWQgdG8gdGhlIHBvd2VyIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwsIHRydW5jYXRlZCB0byBgcHJlY2lzaW9uYFxyXG4gICAqIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubmF0dXJhbEV4cG9uZW50aWFsID0gUC5leHAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gZXhwKHRoaXMpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBuYXR1cmFsIGxvZ2FyaXRobSBvZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLFxyXG4gICAqIHRydW5jYXRlZCB0byBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKi9cclxuICBQLm5hdHVyYWxMb2dhcml0aG0gPSBQLmxuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGxuKHRoaXMpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgbmVnYXRlZCwgaS5lLiBhcyBpZiBtdWx0aXBsaWVkIGJ5XHJcbiAgICogLTEuXHJcbiAgICpcclxuICAgKi9cclxuICBQLm5lZ2F0ZWQgPSBQLm5lZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB4ID0gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcyk7XHJcbiAgICB4LnMgPSAteC5zIHx8IDA7XHJcbiAgICByZXR1cm4geDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHBsdXMgYHlgLCB0cnVuY2F0ZWQgdG9cclxuICAgKiBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnBsdXMgPSBQLmFkZCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICB2YXIgeCA9IHRoaXM7XHJcbiAgICB5ID0gbmV3IHguY29uc3RydWN0b3IoeSk7XHJcbiAgICByZXR1cm4geC5zID09IHkucyA/IGFkZCh4LCB5KSA6IHN1YnRyYWN0KHgsICh5LnMgPSAteS5zLCB5KSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzIG9mIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKiBbel0ge2Jvb2xlYW58bnVtYmVyfSBXaGV0aGVyIHRvIGNvdW50IGludGVnZXItcGFydCB0cmFpbGluZyB6ZXJvczogdHJ1ZSwgZmFsc2UsIDEgb3IgMC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAucHJlY2lzaW9uID0gUC5zZCA9IGZ1bmN0aW9uICh6KSB7XHJcbiAgICB2YXIgZSwgc2QsIHcsXHJcbiAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgIGlmICh6ICE9PSB2b2lkIDAgJiYgeiAhPT0gISF6ICYmIHogIT09IDEgJiYgeiAhPT0gMCkgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgeik7XHJcblxyXG4gICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpICsgMTtcclxuICAgIHcgPSB4LmQubGVuZ3RoIC0gMTtcclxuICAgIHNkID0gdyAqIExPR19CQVNFICsgMTtcclxuICAgIHcgPSB4LmRbd107XHJcblxyXG4gICAgLy8gSWYgbm9uLXplcm8uLi5cclxuICAgIGlmICh3KSB7XHJcblxyXG4gICAgICAvLyBTdWJ0cmFjdCB0aGUgbnVtYmVyIG9mIHRyYWlsaW5nIHplcm9zIG9mIHRoZSBsYXN0IHdvcmQuXHJcbiAgICAgIGZvciAoOyB3ICUgMTAgPT0gMDsgdyAvPSAxMCkgc2QtLTtcclxuXHJcbiAgICAgIC8vIEFkZCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiB0aGUgZmlyc3Qgd29yZC5cclxuICAgICAgZm9yICh3ID0geC5kWzBdOyB3ID49IDEwOyB3IC89IDEwKSBzZCsrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB6ICYmIGUgPiBzZCA/IGUgOiBzZDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgc3F1YXJlIHJvb3Qgb2YgdGhpcyBEZWNpbWFsLCB0cnVuY2F0ZWQgdG8gYHByZWNpc2lvbmBcclxuICAgKiBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnNxdWFyZVJvb3QgPSBQLnNxcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZSwgbiwgcHIsIHIsIHMsIHQsIHdwcixcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIC8vIE5lZ2F0aXZlIG9yIHplcm8/XHJcbiAgICBpZiAoeC5zIDwgMSkge1xyXG4gICAgICBpZiAoIXgucykgcmV0dXJuIG5ldyBDdG9yKDApO1xyXG5cclxuICAgICAgLy8gc3FydCgteCkgPSBOYU5cclxuICAgICAgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgJ05hTicpO1xyXG4gICAgfVxyXG5cclxuICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KTtcclxuICAgIGV4dGVybmFsID0gZmFsc2U7XHJcblxyXG4gICAgLy8gSW5pdGlhbCBlc3RpbWF0ZS5cclxuICAgIHMgPSBNYXRoLnNxcnQoK3gpO1xyXG5cclxuICAgIC8vIE1hdGguc3FydCB1bmRlcmZsb3cvb3ZlcmZsb3c/XHJcbiAgICAvLyBQYXNzIHggdG8gTWF0aC5zcXJ0IGFzIGludGVnZXIsIHRoZW4gYWRqdXN0IHRoZSBleHBvbmVudCBvZiB0aGUgcmVzdWx0LlxyXG4gICAgaWYgKHMgPT0gMCB8fCBzID09IDEgLyAwKSB7XHJcbiAgICAgIG4gPSBkaWdpdHNUb1N0cmluZyh4LmQpO1xyXG4gICAgICBpZiAoKG4ubGVuZ3RoICsgZSkgJSAyID09IDApIG4gKz0gJzAnO1xyXG4gICAgICBzID0gTWF0aC5zcXJ0KG4pO1xyXG4gICAgICBlID0gbWF0aGZsb29yKChlICsgMSkgLyAyKSAtIChlIDwgMCB8fCBlICUgMik7XHJcblxyXG4gICAgICBpZiAocyA9PSAxIC8gMCkge1xyXG4gICAgICAgIG4gPSAnMWUnICsgZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuID0gcy50b0V4cG9uZW50aWFsKCk7XHJcbiAgICAgICAgbiA9IG4uc2xpY2UoMCwgbi5pbmRleE9mKCdlJykgKyAxKSArIGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHIgPSBuZXcgQ3RvcihuKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHIgPSBuZXcgQ3RvcihzLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcbiAgICBzID0gd3ByID0gcHIgKyAzO1xyXG5cclxuICAgIC8vIE5ld3Rvbi1SYXBoc29uIGl0ZXJhdGlvbi5cclxuICAgIGZvciAoOzspIHtcclxuICAgICAgdCA9IHI7XHJcbiAgICAgIHIgPSB0LnBsdXMoZGl2aWRlKHgsIHQsIHdwciArIDIpKS50aW1lcygwLjUpO1xyXG5cclxuICAgICAgaWYgKGRpZ2l0c1RvU3RyaW5nKHQuZCkuc2xpY2UoMCwgd3ByKSA9PT0gKG4gPSBkaWdpdHNUb1N0cmluZyhyLmQpKS5zbGljZSgwLCB3cHIpKSB7XHJcbiAgICAgICAgbiA9IG4uc2xpY2Uod3ByIC0gMywgd3ByICsgMSk7XHJcblxyXG4gICAgICAgIC8vIFRoZSA0dGggcm91bmRpbmcgZGlnaXQgbWF5IGJlIGluIGVycm9yIGJ5IC0xIHNvIGlmIHRoZSA0IHJvdW5kaW5nIGRpZ2l0cyBhcmUgOTk5OSBvclxyXG4gICAgICAgIC8vIDQ5OTksIGkuZS4gYXBwcm9hY2hpbmcgYSByb3VuZGluZyBib3VuZGFyeSwgY29udGludWUgdGhlIGl0ZXJhdGlvbi5cclxuICAgICAgICBpZiAocyA9PSB3cHIgJiYgbiA9PSAnNDk5OScpIHtcclxuXHJcbiAgICAgICAgICAvLyBPbiB0aGUgZmlyc3QgaXRlcmF0aW9uIG9ubHksIGNoZWNrIHRvIHNlZSBpZiByb3VuZGluZyB1cCBnaXZlcyB0aGUgZXhhY3QgcmVzdWx0IGFzIHRoZVxyXG4gICAgICAgICAgLy8gbmluZXMgbWF5IGluZmluaXRlbHkgcmVwZWF0LlxyXG4gICAgICAgICAgcm91bmQodCwgcHIgKyAxLCAwKTtcclxuXHJcbiAgICAgICAgICBpZiAodC50aW1lcyh0KS5lcSh4KSkge1xyXG4gICAgICAgICAgICByID0gdDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChuICE9ICc5OTk5Jykge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3cHIgKz0gNDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4dGVybmFsID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gcm91bmQociwgcHIpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgdGltZXMgYHlgLCB0cnVuY2F0ZWQgdG9cclxuICAgKiBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRpbWVzID0gUC5tdWwgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIGNhcnJ5LCBlLCBpLCBrLCByLCByTCwgdCwgeGRMLCB5ZEwsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgeGQgPSB4LmQsXHJcbiAgICAgIHlkID0gKHkgPSBuZXcgQ3Rvcih5KSkuZDtcclxuXHJcbiAgICAvLyBSZXR1cm4gMCBpZiBlaXRoZXIgaXMgMC5cclxuICAgIGlmICgheC5zIHx8ICF5LnMpIHJldHVybiBuZXcgQ3RvcigwKTtcclxuXHJcbiAgICB5LnMgKj0geC5zO1xyXG4gICAgZSA9IHguZSArIHkuZTtcclxuICAgIHhkTCA9IHhkLmxlbmd0aDtcclxuICAgIHlkTCA9IHlkLmxlbmd0aDtcclxuXHJcbiAgICAvLyBFbnN1cmUgeGQgcG9pbnRzIHRvIHRoZSBsb25nZXIgYXJyYXkuXHJcbiAgICBpZiAoeGRMIDwgeWRMKSB7XHJcbiAgICAgIHIgPSB4ZDtcclxuICAgICAgeGQgPSB5ZDtcclxuICAgICAgeWQgPSByO1xyXG4gICAgICByTCA9IHhkTDtcclxuICAgICAgeGRMID0geWRMO1xyXG4gICAgICB5ZEwgPSByTDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbml0aWFsaXNlIHRoZSByZXN1bHQgYXJyYXkgd2l0aCB6ZXJvcy5cclxuICAgIHIgPSBbXTtcclxuICAgIHJMID0geGRMICsgeWRMO1xyXG4gICAgZm9yIChpID0gckw7IGktLTspIHIucHVzaCgwKTtcclxuXHJcbiAgICAvLyBNdWx0aXBseSFcclxuICAgIGZvciAoaSA9IHlkTDsgLS1pID49IDA7KSB7XHJcbiAgICAgIGNhcnJ5ID0gMDtcclxuICAgICAgZm9yIChrID0geGRMICsgaTsgayA+IGk7KSB7XHJcbiAgICAgICAgdCA9IHJba10gKyB5ZFtpXSAqIHhkW2sgLSBpIC0gMV0gKyBjYXJyeTtcclxuICAgICAgICByW2stLV0gPSB0ICUgQkFTRSB8IDA7XHJcbiAgICAgICAgY2FycnkgPSB0IC8gQkFTRSB8IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJba10gPSAocltrXSArIGNhcnJ5KSAlIEJBU0UgfCAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIGZvciAoOyAhclstLXJMXTspIHIucG9wKCk7XHJcblxyXG4gICAgaWYgKGNhcnJ5KSArK2U7XHJcbiAgICBlbHNlIHIuc2hpZnQoKTtcclxuXHJcbiAgICB5LmQgPSByO1xyXG4gICAgeS5lID0gZTtcclxuXHJcbiAgICByZXR1cm4gZXh0ZXJuYWwgPyByb3VuZCh5LCBDdG9yLnByZWNpc2lvbikgOiB5O1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgcm91bmRlZCB0byBhIG1heGltdW0gb2YgYGRwYFxyXG4gICAqIGRlY2ltYWwgcGxhY2VzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJtYCBvciBgcm91bmRpbmdgIGlmIGBybWAgaXMgb21pdHRlZC5cclxuICAgKlxyXG4gICAqIElmIGBkcGAgaXMgb21pdHRlZCwgcmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXMuIEludGVnZXIsIDAgdG8gTUFYX0RJR0lUUyBpbmNsdXNpdmUuXHJcbiAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b0RlY2ltYWxQbGFjZXMgPSBQLnRvZHAgPSBmdW5jdGlvbiAoZHAsIHJtKSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIHggPSBuZXcgQ3Rvcih4KTtcclxuICAgIGlmIChkcCA9PT0gdm9pZCAwKSByZXR1cm4geDtcclxuXHJcbiAgICBjaGVja0ludDMyKGRwLCAwLCBNQVhfRElHSVRTKTtcclxuXHJcbiAgICBpZiAocm0gPT09IHZvaWQgMCkgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgZWxzZSBjaGVja0ludDMyKHJtLCAwLCA4KTtcclxuXHJcbiAgICByZXR1cm4gcm91bmQoeCwgZHAgKyBnZXRCYXNlMTBFeHBvbmVudCh4KSArIDEsIHJtKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaW4gZXhwb25lbnRpYWwgbm90YXRpb24gcm91bmRlZCB0b1xyXG4gICAqIGBkcGAgZml4ZWQgZGVjaW1hbCBwbGFjZXMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvRXhwb25lbnRpYWwgPSBmdW5jdGlvbiAoZHAsIHJtKSB7XHJcbiAgICB2YXIgc3RyLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgaWYgKGRwID09PSB2b2lkIDApIHtcclxuICAgICAgc3RyID0gdG9TdHJpbmcoeCwgdHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjaGVja0ludDMyKGRwLCAwLCBNQVhfRElHSVRTKTtcclxuXHJcbiAgICAgIGlmIChybSA9PT0gdm9pZCAwKSBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICAgIGVsc2UgY2hlY2tJbnQzMihybSwgMCwgOCk7XHJcblxyXG4gICAgICB4ID0gcm91bmQobmV3IEN0b3IoeCksIGRwICsgMSwgcm0pO1xyXG4gICAgICBzdHIgPSB0b1N0cmluZyh4LCB0cnVlLCBkcCArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdHI7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGluIG5vcm1hbCAoZml4ZWQtcG9pbnQpIG5vdGF0aW9uIHRvXHJcbiAgICogYGRwYCBmaXhlZCBkZWNpbWFsIHBsYWNlcyBhbmQgcm91bmRlZCB1c2luZyByb3VuZGluZyBtb2RlIGBybWAgb3IgYHJvdW5kaW5nYCBpZiBgcm1gIGlzXHJcbiAgICogb21pdHRlZC5cclxuICAgKlxyXG4gICAqIEFzIHdpdGggSmF2YVNjcmlwdCBudW1iZXJzLCAoLTApLnRvRml4ZWQoMCkgaXMgJzAnLCBidXQgZS5nLiAoLTAuMDAwMDEpLnRvRml4ZWQoMCkgaXMgJy0wJy5cclxuICAgKlxyXG4gICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXMuIEludGVnZXIsIDAgdG8gTUFYX0RJR0lUUyBpbmNsdXNpdmUuXHJcbiAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAqXHJcbiAgICogKC0wKS50b0ZpeGVkKDApIGlzICcwJywgYnV0ICgtMC4xKS50b0ZpeGVkKDApIGlzICctMCcuXHJcbiAgICogKC0wKS50b0ZpeGVkKDEpIGlzICcwLjAnLCBidXQgKC0wLjAxKS50b0ZpeGVkKDEpIGlzICctMC4wJy5cclxuICAgKiAoLTApLnRvRml4ZWQoMykgaXMgJzAuMDAwJy5cclxuICAgKiAoLTAuNSkudG9GaXhlZCgwKSBpcyAnLTAnLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b0ZpeGVkID0gZnVuY3Rpb24gKGRwLCBybSkge1xyXG4gICAgdmFyIHN0ciwgeSxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmIChkcCA9PT0gdm9pZCAwKSByZXR1cm4gdG9TdHJpbmcoeCk7XHJcblxyXG4gICAgY2hlY2tJbnQzMihkcCwgMCwgTUFYX0RJR0lUUyk7XHJcblxyXG4gICAgaWYgKHJtID09PSB2b2lkIDApIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgIGVsc2UgY2hlY2tJbnQzMihybSwgMCwgOCk7XHJcblxyXG4gICAgeSA9IHJvdW5kKG5ldyBDdG9yKHgpLCBkcCArIGdldEJhc2UxMEV4cG9uZW50KHgpICsgMSwgcm0pO1xyXG4gICAgc3RyID0gdG9TdHJpbmcoeS5hYnMoKSwgZmFsc2UsIGRwICsgZ2V0QmFzZTEwRXhwb25lbnQoeSkgKyAxKTtcclxuXHJcbiAgICAvLyBUbyBkZXRlcm1pbmUgd2hldGhlciB0byBhZGQgdGhlIG1pbnVzIHNpZ24gbG9vayBhdCB0aGUgdmFsdWUgYmVmb3JlIGl0IHdhcyByb3VuZGVkLFxyXG4gICAgLy8gaS5lLiBsb29rIGF0IGB4YCByYXRoZXIgdGhhbiBgeWAuXHJcbiAgICByZXR1cm4geC5pc25lZygpICYmICF4LmlzWmVybygpID8gJy0nICsgc3RyIDogc3RyO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgcm91bmRlZCB0byBhIHdob2xlIG51bWJlciB1c2luZ1xyXG4gICAqIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9JbnRlZ2VyID0gUC50b2ludCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcbiAgICByZXR1cm4gcm91bmQobmV3IEN0b3IoeCksIGdldEJhc2UxMEV4cG9uZW50KHgpICsgMSwgQ3Rvci5yb3VuZGluZyk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgY29udmVydGVkIHRvIGEgbnVtYmVyIHByaW1pdGl2ZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9OdW1iZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gK3RoaXM7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByYWlzZWQgdG8gdGhlIHBvd2VyIGB5YCxcclxuICAgKiB0cnVuY2F0ZWQgdG8gYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICogRm9yIG5vbi1pbnRlZ2VyIG9yIHZlcnkgbGFyZ2UgZXhwb25lbnRzIHBvdyh4LCB5KSBpcyBjYWxjdWxhdGVkIHVzaW5nXHJcbiAgICpcclxuICAgKiAgIHheeSA9IGV4cCh5KmxuKHgpKVxyXG4gICAqXHJcbiAgICogVGhlIG1heGltdW0gZXJyb3IgaXMgMSB1bHAgKHVuaXQgaW4gbGFzdCBwbGFjZSkuXHJcbiAgICpcclxuICAgKiB5IHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9IFRoZSBwb3dlciB0byB3aGljaCB0byByYWlzZSB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvUG93ZXIgPSBQLnBvdyA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICB2YXIgZSwgaywgcHIsIHIsIHNpZ24sIHlJc0ludCxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICBndWFyZCA9IDEyLFxyXG4gICAgICB5biA9ICsoeSA9IG5ldyBDdG9yKHkpKTtcclxuXHJcbiAgICAvLyBwb3coeCwgMCkgPSAxXHJcbiAgICBpZiAoIXkucykgcmV0dXJuIG5ldyBDdG9yKE9ORSk7XHJcblxyXG4gICAgeCA9IG5ldyBDdG9yKHgpO1xyXG5cclxuICAgIC8vIHBvdygwLCB5ID4gMCkgPSAwXHJcbiAgICAvLyBwb3coMCwgeSA8IDApID0gSW5maW5pdHlcclxuICAgIGlmICgheC5zKSB7XHJcbiAgICAgIGlmICh5LnMgPCAxKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnSW5maW5pdHknKTtcclxuICAgICAgcmV0dXJuIHg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcG93KDEsIHkpID0gMVxyXG4gICAgaWYgKHguZXEoT05FKSkgcmV0dXJuIHg7XHJcblxyXG4gICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuXHJcbiAgICAvLyBwb3coeCwgMSkgPSB4XHJcbiAgICBpZiAoeS5lcShPTkUpKSByZXR1cm4gcm91bmQoeCwgcHIpO1xyXG5cclxuICAgIGUgPSB5LmU7XHJcbiAgICBrID0geS5kLmxlbmd0aCAtIDE7XHJcbiAgICB5SXNJbnQgPSBlID49IGs7XHJcbiAgICBzaWduID0geC5zO1xyXG5cclxuICAgIGlmICgheUlzSW50KSB7XHJcblxyXG4gICAgICAvLyBwb3coeCA8IDAsIHkgbm9uLWludGVnZXIpID0gTmFOXHJcbiAgICAgIGlmIChzaWduIDwgMCkgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgJ05hTicpO1xyXG5cclxuICAgIC8vIElmIHkgaXMgYSBzbWFsbCBpbnRlZ2VyIHVzZSB0aGUgJ2V4cG9uZW50aWF0aW9uIGJ5IHNxdWFyaW5nJyBhbGdvcml0aG0uXHJcbiAgICB9IGVsc2UgaWYgKChrID0geW4gPCAwID8gLXluIDogeW4pIDw9IE1BWF9TQUZFX0lOVEVHRVIpIHtcclxuICAgICAgciA9IG5ldyBDdG9yKE9ORSk7XHJcblxyXG4gICAgICAvLyBNYXggayBvZiA5MDA3MTk5MjU0NzQwOTkxIHRha2VzIDUzIGxvb3AgaXRlcmF0aW9ucy5cclxuICAgICAgLy8gTWF4aW11bSBkaWdpdHMgYXJyYXkgbGVuZ3RoOyBsZWF2ZXMgWzI4LCAzNF0gZ3VhcmQgZGlnaXRzLlxyXG4gICAgICBlID0gTWF0aC5jZWlsKHByIC8gTE9HX0JBU0UgKyA0KTtcclxuXHJcbiAgICAgIGV4dGVybmFsID0gZmFsc2U7XHJcblxyXG4gICAgICBmb3IgKDs7KSB7XHJcbiAgICAgICAgaWYgKGsgJSAyKSB7XHJcbiAgICAgICAgICByID0gci50aW1lcyh4KTtcclxuICAgICAgICAgIHRydW5jYXRlKHIuZCwgZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBrID0gbWF0aGZsb29yKGsgLyAyKTtcclxuICAgICAgICBpZiAoayA9PT0gMCkgYnJlYWs7XHJcblxyXG4gICAgICAgIHggPSB4LnRpbWVzKHgpO1xyXG4gICAgICAgIHRydW5jYXRlKHguZCwgZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV4dGVybmFsID0gdHJ1ZTtcclxuXHJcbiAgICAgIHJldHVybiB5LnMgPCAwID8gbmV3IEN0b3IoT05FKS5kaXYocikgOiByb3VuZChyLCBwcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVzdWx0IGlzIG5lZ2F0aXZlIGlmIHggaXMgbmVnYXRpdmUgYW5kIHRoZSBsYXN0IGRpZ2l0IG9mIGludGVnZXIgeSBpcyBvZGQuXHJcbiAgICBzaWduID0gc2lnbiA8IDAgJiYgeS5kW01hdGgubWF4KGUsIGspXSAmIDEgPyAtMSA6IDE7XHJcblxyXG4gICAgeC5zID0gMTtcclxuICAgIGV4dGVybmFsID0gZmFsc2U7XHJcbiAgICByID0geS50aW1lcyhsbih4LCBwciArIGd1YXJkKSk7XHJcbiAgICBleHRlcm5hbCA9IHRydWU7XHJcbiAgICByID0gZXhwKHIpO1xyXG4gICAgci5zID0gc2lnbjtcclxuXHJcbiAgICByZXR1cm4gcjtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgcm91bmRlZCB0byBgc2RgIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gICAqIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqIFJldHVybiBleHBvbmVudGlhbCBub3RhdGlvbiBpZiBgc2RgIGlzIGxlc3MgdGhhbiB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBuZWNlc3NhcnkgdG8gcmVwcmVzZW50XHJcbiAgICogdGhlIGludGVnZXIgcGFydCBvZiB0aGUgdmFsdWUgaW4gbm9ybWFsIG5vdGF0aW9uLlxyXG4gICAqXHJcbiAgICogW3NkXSB7bnVtYmVyfSBTaWduaWZpY2FudCBkaWdpdHMuIEludGVnZXIsIDEgdG8gTUFYX0RJR0lUUyBpbmNsdXNpdmUuXHJcbiAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b1ByZWNpc2lvbiA9IGZ1bmN0aW9uIChzZCwgcm0pIHtcclxuICAgIHZhciBlLCBzdHIsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICBpZiAoc2QgPT09IHZvaWQgMCkge1xyXG4gICAgICBlID0gZ2V0QmFzZTEwRXhwb25lbnQoeCk7XHJcbiAgICAgIHN0ciA9IHRvU3RyaW5nKHgsIGUgPD0gQ3Rvci50b0V4cE5lZyB8fCBlID49IEN0b3IudG9FeHBQb3MpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hlY2tJbnQzMihzZCwgMSwgTUFYX0RJR0lUUyk7XHJcblxyXG4gICAgICBpZiAocm0gPT09IHZvaWQgMCkgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgICBlbHNlIGNoZWNrSW50MzIocm0sIDAsIDgpO1xyXG5cclxuICAgICAgeCA9IHJvdW5kKG5ldyBDdG9yKHgpLCBzZCwgcm0pO1xyXG4gICAgICBlID0gZ2V0QmFzZTEwRXhwb25lbnQoeCk7XHJcbiAgICAgIHN0ciA9IHRvU3RyaW5nKHgsIHNkIDw9IGUgfHwgZSA8PSBDdG9yLnRvRXhwTmVnLCBzZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0cjtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHJvdW5kZWQgdG8gYSBtYXhpbXVtIG9mIGBzZGBcclxuICAgKiBzaWduaWZpY2FudCBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm1gLCBvciB0byBgcHJlY2lzaW9uYCBhbmQgYHJvdW5kaW5nYCByZXNwZWN0aXZlbHkgaWZcclxuICAgKiBvbWl0dGVkLlxyXG4gICAqXHJcbiAgICogW3NkXSB7bnVtYmVyfSBTaWduaWZpY2FudCBkaWdpdHMuIEludGVnZXIsIDEgdG8gTUFYX0RJR0lUUyBpbmNsdXNpdmUuXHJcbiAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b1NpZ25pZmljYW50RGlnaXRzID0gUC50b3NkID0gZnVuY3Rpb24gKHNkLCBybSkge1xyXG4gICAgdmFyIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICBpZiAoc2QgPT09IHZvaWQgMCkge1xyXG4gICAgICBzZCA9IEN0b3IucHJlY2lzaW9uO1xyXG4gICAgICBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjaGVja0ludDMyKHNkLCAxLCBNQVhfRElHSVRTKTtcclxuXHJcbiAgICAgIGlmIChybSA9PT0gdm9pZCAwKSBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICAgIGVsc2UgY2hlY2tJbnQzMihybSwgMCwgOCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJvdW5kKG5ldyBDdG9yKHgpLCBzZCwgcm0pO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqIFJldHVybiBleHBvbmVudGlhbCBub3RhdGlvbiBpZiB0aGlzIERlY2ltYWwgaGFzIGEgcG9zaXRpdmUgZXhwb25lbnQgZXF1YWwgdG8gb3IgZ3JlYXRlciB0aGFuXHJcbiAgICogYHRvRXhwUG9zYCwgb3IgYSBuZWdhdGl2ZSBleHBvbmVudCBlcXVhbCB0byBvciBsZXNzIHRoYW4gYHRvRXhwTmVnYC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9TdHJpbmcgPSBQLnZhbHVlT2YgPSBQLnZhbCA9IFAudG9KU09OID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHggPSB0aGlzLFxyXG4gICAgICBlID0gZ2V0QmFzZTEwRXhwb25lbnQoeCksXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIHJldHVybiB0b1N0cmluZyh4LCBlIDw9IEN0b3IudG9FeHBOZWcgfHwgZSA+PSBDdG9yLnRvRXhwUG9zKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgRGVjaW1hbC5wcm90b3R5cGUgKFApIGFuZC9vciBEZWNpbWFsIG1ldGhvZHMsIGFuZCB0aGVpciBjYWxsZXJzLlxyXG5cclxuXHJcbiAgLypcclxuICAgKiAgYWRkICAgICAgICAgICAgICAgICBQLm1pbnVzLCBQLnBsdXNcclxuICAgKiAgY2hlY2tJbnQzMiAgICAgICAgICBQLnRvZHAsIFAudG9FeHBvbmVudGlhbCwgUC50b0ZpeGVkLCBQLnRvUHJlY2lzaW9uLCBQLnRvc2RcclxuICAgKiAgZGlnaXRzVG9TdHJpbmcgICAgICBQLmxvZywgUC5zcXJ0LCBQLnBvdywgdG9TdHJpbmcsIGV4cCwgbG5cclxuICAgKiAgZGl2aWRlICAgICAgICAgICAgICBQLmRpdiwgUC5pZGl2LCBQLmxvZywgUC5tb2QsIFAuc3FydCwgZXhwLCBsblxyXG4gICAqICBleHAgICAgICAgICAgICAgICAgIFAuZXhwLCBQLnBvd1xyXG4gICAqICBnZXRCYXNlMTBFeHBvbmVudCAgIFAuZXhwb25lbnQsIFAuc2QsIFAudG9pbnQsIFAuc3FydCwgUC50b2RwLCBQLnRvRml4ZWQsIFAudG9QcmVjaXNpb24sXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgUC50b1N0cmluZywgZGl2aWRlLCByb3VuZCwgdG9TdHJpbmcsIGV4cCwgbG5cclxuICAgKiAgZ2V0TG4xMCAgICAgICAgICAgICBQLmxvZywgbG5cclxuICAgKiAgZ2V0WmVyb1N0cmluZyAgICAgICBkaWdpdHNUb1N0cmluZywgdG9TdHJpbmdcclxuICAgKiAgbG4gICAgICAgICAgICAgICAgICBQLmxvZywgUC5sbiwgUC5wb3csIGV4cFxyXG4gICAqICBwYXJzZURlY2ltYWwgICAgICAgIERlY2ltYWxcclxuICAgKiAgcm91bmQgICAgICAgICAgICAgICBQLmFicywgUC5pZGl2LCBQLmxvZywgUC5taW51cywgUC5tb2QsIFAubmVnLCBQLnBsdXMsIFAudG9pbnQsIFAuc3FydCxcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICBQLnRpbWVzLCBQLnRvZHAsIFAudG9FeHBvbmVudGlhbCwgUC50b0ZpeGVkLCBQLnBvdywgUC50b1ByZWNpc2lvbiwgUC50b3NkLFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgIGRpdmlkZSwgZ2V0TG4xMCwgZXhwLCBsblxyXG4gICAqICBzdWJ0cmFjdCAgICAgICAgICAgIFAubWludXMsIFAucGx1c1xyXG4gICAqICB0b1N0cmluZyAgICAgICAgICAgIFAudG9FeHBvbmVudGlhbCwgUC50b0ZpeGVkLCBQLnRvUHJlY2lzaW9uLCBQLnRvU3RyaW5nLCBQLnZhbHVlT2ZcclxuICAgKiAgdHJ1bmNhdGUgICAgICAgICAgICBQLnBvd1xyXG4gICAqXHJcbiAgICogIFRocm93czogICAgICAgICAgICAgUC5sb2csIFAubW9kLCBQLnNkLCBQLnNxcnQsIFAucG93LCAgY2hlY2tJbnQzMiwgZGl2aWRlLCByb3VuZCxcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICBnZXRMbjEwLCBleHAsIGxuLCBwYXJzZURlY2ltYWwsIERlY2ltYWwsIGNvbmZpZ1xyXG4gICAqL1xyXG5cclxuXHJcbiAgZnVuY3Rpb24gYWRkKHgsIHkpIHtcclxuICAgIHZhciBjYXJyeSwgZCwgZSwgaSwgaywgbGVuLCB4ZCwgeWQsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG5cclxuICAgIC8vIElmIGVpdGhlciBpcyB6ZXJvLi4uXHJcbiAgICBpZiAoIXgucyB8fCAheS5zKSB7XHJcblxyXG4gICAgICAvLyBSZXR1cm4geCBpZiB5IGlzIHplcm8uXHJcbiAgICAgIC8vIFJldHVybiB5IGlmIHkgaXMgbm9uLXplcm8uXHJcbiAgICAgIGlmICgheS5zKSB5ID0gbmV3IEN0b3IoeCk7XHJcbiAgICAgIHJldHVybiBleHRlcm5hbCA/IHJvdW5kKHksIHByKSA6IHk7XHJcbiAgICB9XHJcblxyXG4gICAgeGQgPSB4LmQ7XHJcbiAgICB5ZCA9IHkuZDtcclxuXHJcbiAgICAvLyB4IGFuZCB5IGFyZSBmaW5pdGUsIG5vbi16ZXJvIG51bWJlcnMgd2l0aCB0aGUgc2FtZSBzaWduLlxyXG5cclxuICAgIGsgPSB4LmU7XHJcbiAgICBlID0geS5lO1xyXG4gICAgeGQgPSB4ZC5zbGljZSgpO1xyXG4gICAgaSA9IGsgLSBlO1xyXG5cclxuICAgIC8vIElmIGJhc2UgMWU3IGV4cG9uZW50cyBkaWZmZXIuLi5cclxuICAgIGlmIChpKSB7XHJcbiAgICAgIGlmIChpIDwgMCkge1xyXG4gICAgICAgIGQgPSB4ZDtcclxuICAgICAgICBpID0gLWk7XHJcbiAgICAgICAgbGVuID0geWQubGVuZ3RoO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGQgPSB5ZDtcclxuICAgICAgICBlID0gaztcclxuICAgICAgICBsZW4gPSB4ZC5sZW5ndGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIExpbWl0IG51bWJlciBvZiB6ZXJvcyBwcmVwZW5kZWQgdG8gbWF4KGNlaWwocHIgLyBMT0dfQkFTRSksIGxlbikgKyAxLlxyXG4gICAgICBrID0gTWF0aC5jZWlsKHByIC8gTE9HX0JBU0UpO1xyXG4gICAgICBsZW4gPSBrID4gbGVuID8gayArIDEgOiBsZW4gKyAxO1xyXG5cclxuICAgICAgaWYgKGkgPiBsZW4pIHtcclxuICAgICAgICBpID0gbGVuO1xyXG4gICAgICAgIGQubGVuZ3RoID0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUHJlcGVuZCB6ZXJvcyB0byBlcXVhbGlzZSBleHBvbmVudHMuIE5vdGU6IEZhc3RlciB0byB1c2UgcmV2ZXJzZSB0aGVuIGRvIHVuc2hpZnRzLlxyXG4gICAgICBkLnJldmVyc2UoKTtcclxuICAgICAgZm9yICg7IGktLTspIGQucHVzaCgwKTtcclxuICAgICAgZC5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuID0geGQubGVuZ3RoO1xyXG4gICAgaSA9IHlkLmxlbmd0aDtcclxuXHJcbiAgICAvLyBJZiB5ZCBpcyBsb25nZXIgdGhhbiB4ZCwgc3dhcCB4ZCBhbmQgeWQgc28geGQgcG9pbnRzIHRvIHRoZSBsb25nZXIgYXJyYXkuXHJcbiAgICBpZiAobGVuIC0gaSA8IDApIHtcclxuICAgICAgaSA9IGxlbjtcclxuICAgICAgZCA9IHlkO1xyXG4gICAgICB5ZCA9IHhkO1xyXG4gICAgICB4ZCA9IGQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT25seSBzdGFydCBhZGRpbmcgYXQgeWQubGVuZ3RoIC0gMSBhcyB0aGUgZnVydGhlciBkaWdpdHMgb2YgeGQgY2FuIGJlIGxlZnQgYXMgdGhleSBhcmUuXHJcbiAgICBmb3IgKGNhcnJ5ID0gMDsgaTspIHtcclxuICAgICAgY2FycnkgPSAoeGRbLS1pXSA9IHhkW2ldICsgeWRbaV0gKyBjYXJyeSkgLyBCQVNFIHwgMDtcclxuICAgICAgeGRbaV0gJT0gQkFTRTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2FycnkpIHtcclxuICAgICAgeGQudW5zaGlmdChjYXJyeSk7XHJcbiAgICAgICsrZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICAvLyBObyBuZWVkIHRvIGNoZWNrIGZvciB6ZXJvLCBhcyAreCArICt5ICE9IDAgJiYgLXggKyAteSAhPSAwXHJcbiAgICBmb3IgKGxlbiA9IHhkLmxlbmd0aDsgeGRbLS1sZW5dID09IDA7KSB4ZC5wb3AoKTtcclxuXHJcbiAgICB5LmQgPSB4ZDtcclxuICAgIHkuZSA9IGU7XHJcblxyXG4gICAgcmV0dXJuIGV4dGVybmFsID8gcm91bmQoeSwgcHIpIDogeTtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiBjaGVja0ludDMyKGksIG1pbiwgbWF4KSB7XHJcbiAgICBpZiAoaSAhPT0gfn5pIHx8IGkgPCBtaW4gfHwgaSA+IG1heCkge1xyXG4gICAgICB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyBpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiBkaWdpdHNUb1N0cmluZyhkKSB7XHJcbiAgICB2YXIgaSwgaywgd3MsXHJcbiAgICAgIGluZGV4T2ZMYXN0V29yZCA9IGQubGVuZ3RoIC0gMSxcclxuICAgICAgc3RyID0gJycsXHJcbiAgICAgIHcgPSBkWzBdO1xyXG5cclxuICAgIGlmIChpbmRleE9mTGFzdFdvcmQgPiAwKSB7XHJcbiAgICAgIHN0ciArPSB3O1xyXG4gICAgICBmb3IgKGkgPSAxOyBpIDwgaW5kZXhPZkxhc3RXb3JkOyBpKyspIHtcclxuICAgICAgICB3cyA9IGRbaV0gKyAnJztcclxuICAgICAgICBrID0gTE9HX0JBU0UgLSB3cy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGspIHN0ciArPSBnZXRaZXJvU3RyaW5nKGspO1xyXG4gICAgICAgIHN0ciArPSB3cztcclxuICAgICAgfVxyXG5cclxuICAgICAgdyA9IGRbaV07XHJcbiAgICAgIHdzID0gdyArICcnO1xyXG4gICAgICBrID0gTE9HX0JBU0UgLSB3cy5sZW5ndGg7XHJcbiAgICAgIGlmIChrKSBzdHIgKz0gZ2V0WmVyb1N0cmluZyhrKTtcclxuICAgIH0gZWxzZSBpZiAodyA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gJzAnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcyBvZiBsYXN0IHcuXHJcbiAgICBmb3IgKDsgdyAlIDEwID09PSAwOykgdyAvPSAxMDtcclxuXHJcbiAgICByZXR1cm4gc3RyICsgdztcclxuICB9XHJcblxyXG5cclxuICB2YXIgZGl2aWRlID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBBc3N1bWVzIG5vbi16ZXJvIHggYW5kIGssIGFuZCBoZW5jZSBub24temVybyByZXN1bHQuXHJcbiAgICBmdW5jdGlvbiBtdWx0aXBseUludGVnZXIoeCwgaykge1xyXG4gICAgICB2YXIgdGVtcCxcclxuICAgICAgICBjYXJyeSA9IDAsXHJcbiAgICAgICAgaSA9IHgubGVuZ3RoO1xyXG5cclxuICAgICAgZm9yICh4ID0geC5zbGljZSgpOyBpLS07KSB7XHJcbiAgICAgICAgdGVtcCA9IHhbaV0gKiBrICsgY2Fycnk7XHJcbiAgICAgICAgeFtpXSA9IHRlbXAgJSBCQVNFIHwgMDtcclxuICAgICAgICBjYXJyeSA9IHRlbXAgLyBCQVNFIHwgMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNhcnJ5KSB4LnVuc2hpZnQoY2FycnkpO1xyXG5cclxuICAgICAgcmV0dXJuIHg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29tcGFyZShhLCBiLCBhTCwgYkwpIHtcclxuICAgICAgdmFyIGksIHI7XHJcblxyXG4gICAgICBpZiAoYUwgIT0gYkwpIHtcclxuICAgICAgICByID0gYUwgPiBiTCA/IDEgOiAtMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGkgPSByID0gMDsgaSA8IGFMOyBpKyspIHtcclxuICAgICAgICAgIGlmIChhW2ldICE9IGJbaV0pIHtcclxuICAgICAgICAgICAgciA9IGFbaV0gPiBiW2ldID8gMSA6IC0xO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN1YnRyYWN0KGEsIGIsIGFMKSB7XHJcbiAgICAgIHZhciBpID0gMDtcclxuXHJcbiAgICAgIC8vIFN1YnRyYWN0IGIgZnJvbSBhLlxyXG4gICAgICBmb3IgKDsgYUwtLTspIHtcclxuICAgICAgICBhW2FMXSAtPSBpO1xyXG4gICAgICAgIGkgPSBhW2FMXSA8IGJbYUxdID8gMSA6IDA7XHJcbiAgICAgICAgYVthTF0gPSBpICogQkFTRSArIGFbYUxdIC0gYlthTF07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlbW92ZSBsZWFkaW5nIHplcm9zLlxyXG4gICAgICBmb3IgKDsgIWFbMF0gJiYgYS5sZW5ndGggPiAxOykgYS5zaGlmdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbiAoeCwgeSwgcHIsIGRwKSB7XHJcbiAgICAgIHZhciBjbXAsIGUsIGksIGssIHByb2QsIHByb2RMLCBxLCBxZCwgcmVtLCByZW1MLCByZW0wLCBzZCwgdCwgeGksIHhMLCB5ZDAsIHlMLCB5eixcclxuICAgICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgICBzaWduID0geC5zID09IHkucyA/IDEgOiAtMSxcclxuICAgICAgICB4ZCA9IHguZCxcclxuICAgICAgICB5ZCA9IHkuZDtcclxuXHJcbiAgICAgIC8vIEVpdGhlciAwP1xyXG4gICAgICBpZiAoIXgucykgcmV0dXJuIG5ldyBDdG9yKHgpO1xyXG4gICAgICBpZiAoIXkucykgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgJ0RpdmlzaW9uIGJ5IHplcm8nKTtcclxuXHJcbiAgICAgIGUgPSB4LmUgLSB5LmU7XHJcbiAgICAgIHlMID0geWQubGVuZ3RoO1xyXG4gICAgICB4TCA9IHhkLmxlbmd0aDtcclxuICAgICAgcSA9IG5ldyBDdG9yKHNpZ24pO1xyXG4gICAgICBxZCA9IHEuZCA9IFtdO1xyXG5cclxuICAgICAgLy8gUmVzdWx0IGV4cG9uZW50IG1heSBiZSBvbmUgbGVzcyB0aGFuIGUuXHJcbiAgICAgIGZvciAoaSA9IDA7IHlkW2ldID09ICh4ZFtpXSB8fCAwKTsgKSArK2k7XHJcbiAgICAgIGlmICh5ZFtpXSA+ICh4ZFtpXSB8fCAwKSkgLS1lO1xyXG5cclxuICAgICAgaWYgKHByID09IG51bGwpIHtcclxuICAgICAgICBzZCA9IHByID0gQ3Rvci5wcmVjaXNpb247XHJcbiAgICAgIH0gZWxzZSBpZiAoZHApIHtcclxuICAgICAgICBzZCA9IHByICsgKGdldEJhc2UxMEV4cG9uZW50KHgpIC0gZ2V0QmFzZTEwRXhwb25lbnQoeSkpICsgMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZCA9IHByO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc2QgPCAwKSByZXR1cm4gbmV3IEN0b3IoMCk7XHJcblxyXG4gICAgICAvLyBDb252ZXJ0IHByZWNpc2lvbiBpbiBudW1iZXIgb2YgYmFzZSAxMCBkaWdpdHMgdG8gYmFzZSAxZTcgZGlnaXRzLlxyXG4gICAgICBzZCA9IHNkIC8gTE9HX0JBU0UgKyAyIHwgMDtcclxuICAgICAgaSA9IDA7XHJcblxyXG4gICAgICAvLyBkaXZpc29yIDwgMWU3XHJcbiAgICAgIGlmICh5TCA9PSAxKSB7XHJcbiAgICAgICAgayA9IDA7XHJcbiAgICAgICAgeWQgPSB5ZFswXTtcclxuICAgICAgICBzZCsrO1xyXG5cclxuICAgICAgICAvLyBrIGlzIHRoZSBjYXJyeS5cclxuICAgICAgICBmb3IgKDsgKGkgPCB4TCB8fCBrKSAmJiBzZC0tOyBpKyspIHtcclxuICAgICAgICAgIHQgPSBrICogQkFTRSArICh4ZFtpXSB8fCAwKTtcclxuICAgICAgICAgIHFkW2ldID0gdCAvIHlkIHwgMDtcclxuICAgICAgICAgIGsgPSB0ICUgeWQgfCAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIC8vIGRpdmlzb3IgPj0gMWU3XHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vIE5vcm1hbGlzZSB4ZCBhbmQgeWQgc28gaGlnaGVzdCBvcmRlciBkaWdpdCBvZiB5ZCBpcyA+PSBCQVNFLzJcclxuICAgICAgICBrID0gQkFTRSAvICh5ZFswXSArIDEpIHwgMDtcclxuXHJcbiAgICAgICAgaWYgKGsgPiAxKSB7XHJcbiAgICAgICAgICB5ZCA9IG11bHRpcGx5SW50ZWdlcih5ZCwgayk7XHJcbiAgICAgICAgICB4ZCA9IG11bHRpcGx5SW50ZWdlcih4ZCwgayk7XHJcbiAgICAgICAgICB5TCA9IHlkLmxlbmd0aDtcclxuICAgICAgICAgIHhMID0geGQubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgeGkgPSB5TDtcclxuICAgICAgICByZW0gPSB4ZC5zbGljZSgwLCB5TCk7XHJcbiAgICAgICAgcmVtTCA9IHJlbS5sZW5ndGg7XHJcblxyXG4gICAgICAgIC8vIEFkZCB6ZXJvcyB0byBtYWtlIHJlbWFpbmRlciBhcyBsb25nIGFzIGRpdmlzb3IuXHJcbiAgICAgICAgZm9yICg7IHJlbUwgPCB5TDspIHJlbVtyZW1MKytdID0gMDtcclxuXHJcbiAgICAgICAgeXogPSB5ZC5zbGljZSgpO1xyXG4gICAgICAgIHl6LnVuc2hpZnQoMCk7XHJcbiAgICAgICAgeWQwID0geWRbMF07XHJcblxyXG4gICAgICAgIGlmICh5ZFsxXSA+PSBCQVNFIC8gMikgKyt5ZDA7XHJcblxyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgIGsgPSAwO1xyXG5cclxuICAgICAgICAgIC8vIENvbXBhcmUgZGl2aXNvciBhbmQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgY21wID0gY29tcGFyZSh5ZCwgcmVtLCB5TCwgcmVtTCk7XHJcblxyXG4gICAgICAgICAgLy8gSWYgZGl2aXNvciA8IHJlbWFpbmRlci5cclxuICAgICAgICAgIGlmIChjbXAgPCAwKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdHJpYWwgZGlnaXQsIGsuXHJcbiAgICAgICAgICAgIHJlbTAgPSByZW1bMF07XHJcbiAgICAgICAgICAgIGlmICh5TCAhPSByZW1MKSByZW0wID0gcmVtMCAqIEJBU0UgKyAocmVtWzFdIHx8IDApO1xyXG5cclxuICAgICAgICAgICAgLy8gayB3aWxsIGJlIGhvdyBtYW55IHRpbWVzIHRoZSBkaXZpc29yIGdvZXMgaW50byB0aGUgY3VycmVudCByZW1haW5kZXIuXHJcbiAgICAgICAgICAgIGsgPSByZW0wIC8geWQwIHwgMDtcclxuXHJcbiAgICAgICAgICAgIC8vICBBbGdvcml0aG06XHJcbiAgICAgICAgICAgIC8vICAxLiBwcm9kdWN0ID0gZGl2aXNvciAqIHRyaWFsIGRpZ2l0IChrKVxyXG4gICAgICAgICAgICAvLyAgMi4gaWYgcHJvZHVjdCA+IHJlbWFpbmRlcjogcHJvZHVjdCAtPSBkaXZpc29yLCBrLS1cclxuICAgICAgICAgICAgLy8gIDMuIHJlbWFpbmRlciAtPSBwcm9kdWN0XHJcbiAgICAgICAgICAgIC8vICA0LiBpZiBwcm9kdWN0IHdhcyA8IHJlbWFpbmRlciBhdCAyOlxyXG4gICAgICAgICAgICAvLyAgICA1LiBjb21wYXJlIG5ldyByZW1haW5kZXIgYW5kIGRpdmlzb3JcclxuICAgICAgICAgICAgLy8gICAgNi4gSWYgcmVtYWluZGVyID4gZGl2aXNvcjogcmVtYWluZGVyIC09IGRpdmlzb3IsIGsrK1xyXG5cclxuICAgICAgICAgICAgaWYgKGsgPiAxKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGsgPj0gQkFTRSkgayA9IEJBU0UgLSAxO1xyXG5cclxuICAgICAgICAgICAgICAvLyBwcm9kdWN0ID0gZGl2aXNvciAqIHRyaWFsIGRpZ2l0LlxyXG4gICAgICAgICAgICAgIHByb2QgPSBtdWx0aXBseUludGVnZXIoeWQsIGspO1xyXG4gICAgICAgICAgICAgIHByb2RMID0gcHJvZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgcmVtTCA9IHJlbS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgIC8vIENvbXBhcmUgcHJvZHVjdCBhbmQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIGNtcCA9IGNvbXBhcmUocHJvZCwgcmVtLCBwcm9kTCwgcmVtTCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIHByb2R1Y3QgPiByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgaWYgKGNtcCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBrLS07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3VidHJhY3QgZGl2aXNvciBmcm9tIHByb2R1Y3QuXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmFjdChwcm9kLCB5TCA8IHByb2RMID8geXogOiB5ZCwgcHJvZEwpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gY21wIGlzIC0xLlxyXG4gICAgICAgICAgICAgIC8vIElmIGsgaXMgMCwgdGhlcmUgaXMgbm8gbmVlZCB0byBjb21wYXJlIHlkIGFuZCByZW0gYWdhaW4gYmVsb3csIHNvIGNoYW5nZSBjbXAgdG8gMVxyXG4gICAgICAgICAgICAgIC8vIHRvIGF2b2lkIGl0LiBJZiBrIGlzIDEgdGhlcmUgaXMgYSBuZWVkIHRvIGNvbXBhcmUgeWQgYW5kIHJlbSBhZ2FpbiBiZWxvdy5cclxuICAgICAgICAgICAgICBpZiAoayA9PSAwKSBjbXAgPSBrID0gMTtcclxuICAgICAgICAgICAgICBwcm9kID0geWQuc2xpY2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJvZEwgPSBwcm9kLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKHByb2RMIDwgcmVtTCkgcHJvZC51bnNoaWZ0KDApO1xyXG5cclxuICAgICAgICAgICAgLy8gU3VidHJhY3QgcHJvZHVjdCBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgc3VidHJhY3QocmVtLCBwcm9kLCByZW1MKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHByb2R1Y3Qgd2FzIDwgcHJldmlvdXMgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICBpZiAoY21wID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgcmVtTCA9IHJlbS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgIC8vIENvbXBhcmUgZGl2aXNvciBhbmQgbmV3IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICBjbXAgPSBjb21wYXJlKHlkLCByZW0sIHlMLCByZW1MKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gSWYgZGl2aXNvciA8IG5ldyByZW1haW5kZXIsIHN1YnRyYWN0IGRpdmlzb3IgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgaWYgKGNtcCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIGsrKztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdWJ0cmFjdCBkaXZpc29yIGZyb20gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgICAgc3VidHJhY3QocmVtLCB5TCA8IHJlbUwgPyB5eiA6IHlkLCByZW1MKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChjbXAgPT09IDApIHtcclxuICAgICAgICAgICAgaysrO1xyXG4gICAgICAgICAgICByZW0gPSBbMF07XHJcbiAgICAgICAgICB9ICAgIC8vIGlmIGNtcCA9PT0gMSwgayB3aWxsIGJlIDBcclxuXHJcbiAgICAgICAgICAvLyBBZGQgdGhlIG5leHQgZGlnaXQsIGssIHRvIHRoZSByZXN1bHQgYXJyYXkuXHJcbiAgICAgICAgICBxZFtpKytdID0gaztcclxuXHJcbiAgICAgICAgICAvLyBVcGRhdGUgdGhlIHJlbWFpbmRlci5cclxuICAgICAgICAgIGlmIChjbXAgJiYgcmVtWzBdKSB7XHJcbiAgICAgICAgICAgIHJlbVtyZW1MKytdID0geGRbeGldIHx8IDA7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW0gPSBbeGRbeGldXTtcclxuICAgICAgICAgICAgcmVtTCA9IDE7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gd2hpbGUgKCh4aSsrIDwgeEwgfHwgcmVtWzBdICE9PSB2b2lkIDApICYmIHNkLS0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBMZWFkaW5nIHplcm8/XHJcbiAgICAgIGlmICghcWRbMF0pIHFkLnNoaWZ0KCk7XHJcblxyXG4gICAgICBxLmUgPSBlO1xyXG5cclxuICAgICAgcmV0dXJuIHJvdW5kKHEsIGRwID8gcHIgKyBnZXRCYXNlMTBFeHBvbmVudChxKSArIDEgOiBwcik7XHJcbiAgICB9O1xyXG4gIH0pKCk7XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBuYXR1cmFsIGV4cG9uZW50aWFsIG9mIGB4YCB0cnVuY2F0ZWQgdG8gYHNkYFxyXG4gICAqIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqIFRheWxvci9NYWNsYXVyaW4gc2VyaWVzLlxyXG4gICAqXHJcbiAgICogZXhwKHgpID0geF4wLzAhICsgeF4xLzEhICsgeF4yLzIhICsgeF4zLzMhICsgLi4uXHJcbiAgICpcclxuICAgKiBBcmd1bWVudCByZWR1Y3Rpb246XHJcbiAgICogICBSZXBlYXQgeCA9IHggLyAzMiwgayArPSA1LCB1bnRpbCB8eHwgPCAwLjFcclxuICAgKiAgIGV4cCh4KSA9IGV4cCh4IC8gMl5rKV4oMl5rKVxyXG4gICAqXHJcbiAgICogUHJldmlvdXNseSwgdGhlIGFyZ3VtZW50IHdhcyBpbml0aWFsbHkgcmVkdWNlZCBieVxyXG4gICAqIGV4cCh4KSA9IGV4cChyKSAqIDEwXmsgIHdoZXJlIHIgPSB4IC0gayAqIGxuMTAsIGsgPSBmbG9vcih4IC8gbG4xMClcclxuICAgKiB0byBmaXJzdCBwdXQgciBpbiB0aGUgcmFuZ2UgWzAsIGxuMTBdLCBiZWZvcmUgZGl2aWRpbmcgYnkgMzIgdW50aWwgfHh8IDwgMC4xLCBidXQgdGhpcyB3YXNcclxuICAgKiBmb3VuZCB0byBiZSBzbG93ZXIgdGhhbiBqdXN0IGRpdmlkaW5nIHJlcGVhdGVkbHkgYnkgMzIgYXMgYWJvdmUuXHJcbiAgICpcclxuICAgKiAoTWF0aCBvYmplY3QgaW50ZWdlciBtaW4vbWF4OiBNYXRoLmV4cCg3MDkpID0gOC4yZSszMDcsIE1hdGguZXhwKC03NDUpID0gNWUtMzI0KVxyXG4gICAqXHJcbiAgICogIGV4cCh4KSBpcyBub24tdGVybWluYXRpbmcgZm9yIGFueSBmaW5pdGUsIG5vbi16ZXJvIHguXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBleHAoeCwgc2QpIHtcclxuICAgIHZhciBkZW5vbWluYXRvciwgZ3VhcmQsIHBvdywgc3VtLCB0LCB3cHIsXHJcbiAgICAgIGkgPSAwLFxyXG4gICAgICBrID0gMCxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcblxyXG4gICAgaWYgKGdldEJhc2UxMEV4cG9uZW50KHgpID4gMTYpIHRocm93IEVycm9yKGV4cG9uZW50T3V0T2ZSYW5nZSArIGdldEJhc2UxMEV4cG9uZW50KHgpKTtcclxuXHJcbiAgICAvLyBleHAoMCkgPSAxXHJcbiAgICBpZiAoIXgucykgcmV0dXJuIG5ldyBDdG9yKE9ORSk7XHJcblxyXG4gICAgaWYgKHNkID09IG51bGwpIHtcclxuICAgICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuICAgICAgd3ByID0gcHI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3cHIgPSBzZDtcclxuICAgIH1cclxuXHJcbiAgICB0ID0gbmV3IEN0b3IoMC4wMzEyNSk7XHJcblxyXG4gICAgd2hpbGUgKHguYWJzKCkuZ3RlKDAuMSkpIHtcclxuICAgICAgeCA9IHgudGltZXModCk7ICAgIC8vIHggPSB4IC8gMl41XHJcbiAgICAgIGsgKz0gNTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFc3RpbWF0ZSB0aGUgcHJlY2lzaW9uIGluY3JlYXNlIG5lY2Vzc2FyeSB0byBlbnN1cmUgdGhlIGZpcnN0IDQgcm91bmRpbmcgZGlnaXRzIGFyZSBjb3JyZWN0LlxyXG4gICAgZ3VhcmQgPSBNYXRoLmxvZyhtYXRocG93KDIsIGspKSAvIE1hdGguTE4xMCAqIDIgKyA1IHwgMDtcclxuICAgIHdwciArPSBndWFyZDtcclxuICAgIGRlbm9taW5hdG9yID0gcG93ID0gc3VtID0gbmV3IEN0b3IoT05FKTtcclxuICAgIEN0b3IucHJlY2lzaW9uID0gd3ByO1xyXG5cclxuICAgIGZvciAoOzspIHtcclxuICAgICAgcG93ID0gcm91bmQocG93LnRpbWVzKHgpLCB3cHIpO1xyXG4gICAgICBkZW5vbWluYXRvciA9IGRlbm9taW5hdG9yLnRpbWVzKCsraSk7XHJcbiAgICAgIHQgPSBzdW0ucGx1cyhkaXZpZGUocG93LCBkZW5vbWluYXRvciwgd3ByKSk7XHJcblxyXG4gICAgICBpZiAoZGlnaXRzVG9TdHJpbmcodC5kKS5zbGljZSgwLCB3cHIpID09PSBkaWdpdHNUb1N0cmluZyhzdW0uZCkuc2xpY2UoMCwgd3ByKSkge1xyXG4gICAgICAgIHdoaWxlIChrLS0pIHN1bSA9IHJvdW5kKHN1bS50aW1lcyhzdW0pLCB3cHIpO1xyXG4gICAgICAgIEN0b3IucHJlY2lzaW9uID0gcHI7XHJcbiAgICAgICAgcmV0dXJuIHNkID09IG51bGwgPyAoZXh0ZXJuYWwgPSB0cnVlLCByb3VuZChzdW0sIHByKSkgOiBzdW07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN1bSA9IHQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gQ2FsY3VsYXRlIHRoZSBiYXNlIDEwIGV4cG9uZW50IGZyb20gdGhlIGJhc2UgMWU3IGV4cG9uZW50LlxyXG4gIGZ1bmN0aW9uIGdldEJhc2UxMEV4cG9uZW50KHgpIHtcclxuICAgIHZhciBlID0geC5lICogTE9HX0JBU0UsXHJcbiAgICAgIHcgPSB4LmRbMF07XHJcblxyXG4gICAgLy8gQWRkIHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIHRoZSBmaXJzdCB3b3JkIG9mIHRoZSBkaWdpdHMgYXJyYXkuXHJcbiAgICBmb3IgKDsgdyA+PSAxMDsgdyAvPSAxMCkgZSsrO1xyXG4gICAgcmV0dXJuIGU7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gZ2V0TG4xMChDdG9yLCBzZCwgcHIpIHtcclxuXHJcbiAgICBpZiAoc2QgPiBDdG9yLkxOMTAuc2QoKSkge1xyXG5cclxuXHJcbiAgICAgIC8vIFJlc2V0IGdsb2JhbCBzdGF0ZSBpbiBjYXNlIHRoZSBleGNlcHRpb24gaXMgY2F1Z2h0LlxyXG4gICAgICBleHRlcm5hbCA9IHRydWU7XHJcbiAgICAgIGlmIChwcikgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgICAgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgJ0xOMTAgcHJlY2lzaW9uIGxpbWl0IGV4Y2VlZGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJvdW5kKG5ldyBDdG9yKEN0b3IuTE4xMCksIHNkKTtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiBnZXRaZXJvU3RyaW5nKGspIHtcclxuICAgIHZhciB6cyA9ICcnO1xyXG4gICAgZm9yICg7IGstLTspIHpzICs9ICcwJztcclxuICAgIHJldHVybiB6cztcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBuYXR1cmFsIGxvZ2FyaXRobSBvZiBgeGAgdHJ1bmNhdGVkIHRvIGBzZGAgc2lnbmlmaWNhbnRcclxuICAgKiBkaWdpdHMuXHJcbiAgICpcclxuICAgKiAgbG4obikgaXMgbm9uLXRlcm1pbmF0aW5nIChuICE9IDEpXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBsbih5LCBzZCkge1xyXG4gICAgdmFyIGMsIGMwLCBkZW5vbWluYXRvciwgZSwgbnVtZXJhdG9yLCBzdW0sIHQsIHdwciwgeDIsXHJcbiAgICAgIG4gPSAxLFxyXG4gICAgICBndWFyZCA9IDEwLFxyXG4gICAgICB4ID0geSxcclxuICAgICAgeGQgPSB4LmQsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG5cclxuICAgIC8vIGxuKC14KSA9IE5hTlxyXG4gICAgLy8gbG4oMCkgPSAtSW5maW5pdHlcclxuICAgIGlmICh4LnMgPCAxKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAoeC5zID8gJ05hTicgOiAnLUluZmluaXR5JykpO1xyXG5cclxuICAgIC8vIGxuKDEpID0gMFxyXG4gICAgaWYgKHguZXEoT05FKSkgcmV0dXJuIG5ldyBDdG9yKDApO1xyXG5cclxuICAgIGlmIChzZCA9PSBudWxsKSB7XHJcbiAgICAgIGV4dGVybmFsID0gZmFsc2U7XHJcbiAgICAgIHdwciA9IHByO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd3ByID0gc2Q7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHguZXEoMTApKSB7XHJcbiAgICAgIGlmIChzZCA9PSBudWxsKSBleHRlcm5hbCA9IHRydWU7XHJcbiAgICAgIHJldHVybiBnZXRMbjEwKEN0b3IsIHdwcik7XHJcbiAgICB9XHJcblxyXG4gICAgd3ByICs9IGd1YXJkO1xyXG4gICAgQ3Rvci5wcmVjaXNpb24gPSB3cHI7XHJcbiAgICBjID0gZGlnaXRzVG9TdHJpbmcoeGQpO1xyXG4gICAgYzAgPSBjLmNoYXJBdCgwKTtcclxuICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KTtcclxuXHJcbiAgICBpZiAoTWF0aC5hYnMoZSkgPCAxLjVlMTUpIHtcclxuXHJcbiAgICAgIC8vIEFyZ3VtZW50IHJlZHVjdGlvbi5cclxuICAgICAgLy8gVGhlIHNlcmllcyBjb252ZXJnZXMgZmFzdGVyIHRoZSBjbG9zZXIgdGhlIGFyZ3VtZW50IGlzIHRvIDEsIHNvIHVzaW5nXHJcbiAgICAgIC8vIGxuKGFeYikgPSBiICogbG4oYSksICAgbG4oYSkgPSBsbihhXmIpIC8gYlxyXG4gICAgICAvLyBtdWx0aXBseSB0aGUgYXJndW1lbnQgYnkgaXRzZWxmIHVudGlsIHRoZSBsZWFkaW5nIGRpZ2l0cyBvZiB0aGUgc2lnbmlmaWNhbmQgYXJlIDcsIDgsIDksXHJcbiAgICAgIC8vIDEwLCAxMSwgMTIgb3IgMTMsIHJlY29yZGluZyB0aGUgbnVtYmVyIG9mIG11bHRpcGxpY2F0aW9ucyBzbyB0aGUgc3VtIG9mIHRoZSBzZXJpZXMgY2FuXHJcbiAgICAgIC8vIGxhdGVyIGJlIGRpdmlkZWQgYnkgdGhpcyBudW1iZXIsIHRoZW4gc2VwYXJhdGUgb3V0IHRoZSBwb3dlciBvZiAxMCB1c2luZ1xyXG4gICAgICAvLyBsbihhKjEwXmIpID0gbG4oYSkgKyBiKmxuKDEwKS5cclxuXHJcbiAgICAgIC8vIG1heCBuIGlzIDIxIChnaXZlcyAwLjksIDEuMCBvciAxLjEpICg5ZTE1IC8gMjEgPSA0LjJlMTQpLlxyXG4gICAgICAvL3doaWxlIChjMCA8IDkgJiYgYzAgIT0gMSB8fCBjMCA9PSAxICYmIGMuY2hhckF0KDEpID4gMSkge1xyXG4gICAgICAvLyBtYXggbiBpcyA2IChnaXZlcyAwLjcgLSAxLjMpXHJcbiAgICAgIHdoaWxlIChjMCA8IDcgJiYgYzAgIT0gMSB8fCBjMCA9PSAxICYmIGMuY2hhckF0KDEpID4gMykge1xyXG4gICAgICAgIHggPSB4LnRpbWVzKHkpO1xyXG4gICAgICAgIGMgPSBkaWdpdHNUb1N0cmluZyh4LmQpO1xyXG4gICAgICAgIGMwID0gYy5jaGFyQXQoMCk7XHJcbiAgICAgICAgbisrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBlID0gZ2V0QmFzZTEwRXhwb25lbnQoeCk7XHJcblxyXG4gICAgICBpZiAoYzAgPiAxKSB7XHJcbiAgICAgICAgeCA9IG5ldyBDdG9yKCcwLicgKyBjKTtcclxuICAgICAgICBlKys7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeCA9IG5ldyBDdG9yKGMwICsgJy4nICsgYy5zbGljZSgxKSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvLyBUaGUgYXJndW1lbnQgcmVkdWN0aW9uIG1ldGhvZCBhYm92ZSBtYXkgcmVzdWx0IGluIG92ZXJmbG93IGlmIHRoZSBhcmd1bWVudCB5IGlzIGEgbWFzc2l2ZVxyXG4gICAgICAvLyBudW1iZXIgd2l0aCBleHBvbmVudCA+PSAxNTAwMDAwMDAwMDAwMDAwICg5ZTE1IC8gNiA9IDEuNWUxNSksIHNvIGluc3RlYWQgcmVjYWxsIHRoaXNcclxuICAgICAgLy8gZnVuY3Rpb24gdXNpbmcgbG4oeCoxMF5lKSA9IGxuKHgpICsgZSpsbigxMCkuXHJcbiAgICAgIHQgPSBnZXRMbjEwKEN0b3IsIHdwciArIDIsIHByKS50aW1lcyhlICsgJycpO1xyXG4gICAgICB4ID0gbG4obmV3IEN0b3IoYzAgKyAnLicgKyBjLnNsaWNlKDEpKSwgd3ByIC0gZ3VhcmQpLnBsdXModCk7XHJcblxyXG4gICAgICBDdG9yLnByZWNpc2lvbiA9IHByO1xyXG4gICAgICByZXR1cm4gc2QgPT0gbnVsbCA/IChleHRlcm5hbCA9IHRydWUsIHJvdW5kKHgsIHByKSkgOiB4O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHggaXMgcmVkdWNlZCB0byBhIHZhbHVlIG5lYXIgMS5cclxuXHJcbiAgICAvLyBUYXlsb3Igc2VyaWVzLlxyXG4gICAgLy8gbG4oeSkgPSBsbigoMSArIHgpLygxIC0geCkpID0gMih4ICsgeF4zLzMgKyB4XjUvNSArIHheNy83ICsgLi4uKVxyXG4gICAgLy8gd2hlcmUgeCA9ICh5IC0gMSkvKHkgKyAxKSAgICAofHh8IDwgMSlcclxuICAgIHN1bSA9IG51bWVyYXRvciA9IHggPSBkaXZpZGUoeC5taW51cyhPTkUpLCB4LnBsdXMoT05FKSwgd3ByKTtcclxuICAgIHgyID0gcm91bmQoeC50aW1lcyh4KSwgd3ByKTtcclxuICAgIGRlbm9taW5hdG9yID0gMztcclxuXHJcbiAgICBmb3IgKDs7KSB7XHJcbiAgICAgIG51bWVyYXRvciA9IHJvdW5kKG51bWVyYXRvci50aW1lcyh4MiksIHdwcik7XHJcbiAgICAgIHQgPSBzdW0ucGx1cyhkaXZpZGUobnVtZXJhdG9yLCBuZXcgQ3RvcihkZW5vbWluYXRvciksIHdwcikpO1xyXG5cclxuICAgICAgaWYgKGRpZ2l0c1RvU3RyaW5nKHQuZCkuc2xpY2UoMCwgd3ByKSA9PT0gZGlnaXRzVG9TdHJpbmcoc3VtLmQpLnNsaWNlKDAsIHdwcikpIHtcclxuICAgICAgICBzdW0gPSBzdW0udGltZXMoMik7XHJcblxyXG4gICAgICAgIC8vIFJldmVyc2UgdGhlIGFyZ3VtZW50IHJlZHVjdGlvbi5cclxuICAgICAgICBpZiAoZSAhPT0gMCkgc3VtID0gc3VtLnBsdXMoZ2V0TG4xMChDdG9yLCB3cHIgKyAyLCBwcikudGltZXMoZSArICcnKSk7XHJcbiAgICAgICAgc3VtID0gZGl2aWRlKHN1bSwgbmV3IEN0b3IobiksIHdwcik7XHJcblxyXG4gICAgICAgIEN0b3IucHJlY2lzaW9uID0gcHI7XHJcbiAgICAgICAgcmV0dXJuIHNkID09IG51bGwgPyAoZXh0ZXJuYWwgPSB0cnVlLCByb3VuZChzdW0sIHByKSkgOiBzdW07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN1bSA9IHQ7XHJcbiAgICAgIGRlbm9taW5hdG9yICs9IDI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBQYXJzZSB0aGUgdmFsdWUgb2YgYSBuZXcgRGVjaW1hbCBgeGAgZnJvbSBzdHJpbmcgYHN0cmAuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gcGFyc2VEZWNpbWFsKHgsIHN0cikge1xyXG4gICAgdmFyIGUsIGksIGxlbjtcclxuXHJcbiAgICAvLyBEZWNpbWFsIHBvaW50P1xyXG4gICAgaWYgKChlID0gc3RyLmluZGV4T2YoJy4nKSkgPiAtMSkgc3RyID0gc3RyLnJlcGxhY2UoJy4nLCAnJyk7XHJcblxyXG4gICAgLy8gRXhwb25lbnRpYWwgZm9ybT9cclxuICAgIGlmICgoaSA9IHN0ci5zZWFyY2goL2UvaSkpID4gMCkge1xyXG5cclxuICAgICAgLy8gRGV0ZXJtaW5lIGV4cG9uZW50LlxyXG4gICAgICBpZiAoZSA8IDApIGUgPSBpO1xyXG4gICAgICBlICs9ICtzdHIuc2xpY2UoaSArIDEpO1xyXG4gICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIGkpO1xyXG4gICAgfSBlbHNlIGlmIChlIDwgMCkge1xyXG5cclxuICAgICAgLy8gSW50ZWdlci5cclxuICAgICAgZSA9IHN0ci5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIGxlYWRpbmcgemVyb3MuXHJcbiAgICBmb3IgKGkgPSAwOyBzdHIuY2hhckNvZGVBdChpKSA9PT0gNDg7KSArK2k7XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgZm9yIChsZW4gPSBzdHIubGVuZ3RoOyBzdHIuY2hhckNvZGVBdChsZW4gLSAxKSA9PT0gNDg7KSAtLWxlbjtcclxuICAgIHN0ciA9IHN0ci5zbGljZShpLCBsZW4pO1xyXG5cclxuICAgIGlmIChzdHIpIHtcclxuICAgICAgbGVuIC09IGk7XHJcbiAgICAgIGUgPSBlIC0gaSAtIDE7XHJcbiAgICAgIHguZSA9IG1hdGhmbG9vcihlIC8gTE9HX0JBU0UpO1xyXG4gICAgICB4LmQgPSBbXTtcclxuXHJcbiAgICAgIC8vIFRyYW5zZm9ybSBiYXNlXHJcblxyXG4gICAgICAvLyBlIGlzIHRoZSBiYXNlIDEwIGV4cG9uZW50LlxyXG4gICAgICAvLyBpIGlzIHdoZXJlIHRvIHNsaWNlIHN0ciB0byBnZXQgdGhlIGZpcnN0IHdvcmQgb2YgdGhlIGRpZ2l0cyBhcnJheS5cclxuICAgICAgaSA9IChlICsgMSkgJSBMT0dfQkFTRTtcclxuICAgICAgaWYgKGUgPCAwKSBpICs9IExPR19CQVNFO1xyXG5cclxuICAgICAgaWYgKGkgPCBsZW4pIHtcclxuICAgICAgICBpZiAoaSkgeC5kLnB1c2goK3N0ci5zbGljZSgwLCBpKSk7XHJcbiAgICAgICAgZm9yIChsZW4gLT0gTE9HX0JBU0U7IGkgPCBsZW47KSB4LmQucHVzaCgrc3RyLnNsaWNlKGksIGkgKz0gTE9HX0JBU0UpKTtcclxuICAgICAgICBzdHIgPSBzdHIuc2xpY2UoaSk7XHJcbiAgICAgICAgaSA9IExPR19CQVNFIC0gc3RyLmxlbmd0aDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpIC09IGxlbjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yICg7IGktLTspIHN0ciArPSAnMCc7XHJcbiAgICAgIHguZC5wdXNoKCtzdHIpO1xyXG5cclxuICAgICAgaWYgKGV4dGVybmFsICYmICh4LmUgPiBNQVhfRSB8fCB4LmUgPCAtTUFYX0UpKSB0aHJvdyBFcnJvcihleHBvbmVudE91dE9mUmFuZ2UgKyBlKTtcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvLyBaZXJvLlxyXG4gICAgICB4LnMgPSAwO1xyXG4gICAgICB4LmUgPSAwO1xyXG4gICAgICB4LmQgPSBbMF07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHg7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBSb3VuZCBgeGAgdG8gYHNkYCBzaWduaWZpY2FudCBkaWdpdHMsIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJtYCBpZiBwcmVzZW50ICh0cnVuY2F0ZSBvdGhlcndpc2UpLlxyXG4gICAqL1xyXG4gICBmdW5jdGlvbiByb3VuZCh4LCBzZCwgcm0pIHtcclxuICAgIHZhciBpLCBqLCBrLCBuLCByZCwgZG9Sb3VuZCwgdywgeGRpLFxyXG4gICAgICB4ZCA9IHguZDtcclxuXHJcbiAgICAvLyByZDogdGhlIHJvdW5kaW5nIGRpZ2l0LCBpLmUuIHRoZSBkaWdpdCBhZnRlciB0aGUgZGlnaXQgdGhhdCBtYXkgYmUgcm91bmRlZCB1cC5cclxuICAgIC8vIHc6IHRoZSB3b3JkIG9mIHhkIHdoaWNoIGNvbnRhaW5zIHRoZSByb3VuZGluZyBkaWdpdCwgYSBiYXNlIDFlNyBudW1iZXIuXHJcbiAgICAvLyB4ZGk6IHRoZSBpbmRleCBvZiB3IHdpdGhpbiB4ZC5cclxuICAgIC8vIG46IHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIHcuXHJcbiAgICAvLyBpOiB3aGF0IHdvdWxkIGJlIHRoZSBpbmRleCBvZiByZCB3aXRoaW4gdyBpZiBhbGwgdGhlIG51bWJlcnMgd2VyZSA3IGRpZ2l0cyBsb25nIChpLmUuIGlmXHJcbiAgICAvLyB0aGV5IGhhZCBsZWFkaW5nIHplcm9zKVxyXG4gICAgLy8gajogaWYgPiAwLCB0aGUgYWN0dWFsIGluZGV4IG9mIHJkIHdpdGhpbiB3IChpZiA8IDAsIHJkIGlzIGEgbGVhZGluZyB6ZXJvKS5cclxuXHJcbiAgICAvLyBHZXQgdGhlIGxlbmd0aCBvZiB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgZGlnaXRzIGFycmF5IHhkLlxyXG4gICAgZm9yIChuID0gMSwgayA9IHhkWzBdOyBrID49IDEwOyBrIC89IDEwKSBuKys7XHJcbiAgICBpID0gc2QgLSBuO1xyXG5cclxuICAgIC8vIElzIHRoZSByb3VuZGluZyBkaWdpdCBpbiB0aGUgZmlyc3Qgd29yZCBvZiB4ZD9cclxuICAgIGlmIChpIDwgMCkge1xyXG4gICAgICBpICs9IExPR19CQVNFO1xyXG4gICAgICBqID0gc2Q7XHJcbiAgICAgIHcgPSB4ZFt4ZGkgPSAwXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHhkaSA9IE1hdGguY2VpbCgoaSArIDEpIC8gTE9HX0JBU0UpO1xyXG4gICAgICBrID0geGQubGVuZ3RoO1xyXG4gICAgICBpZiAoeGRpID49IGspIHJldHVybiB4O1xyXG4gICAgICB3ID0gayA9IHhkW3hkaV07XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2Ygdy5cclxuICAgICAgZm9yIChuID0gMTsgayA+PSAxMDsgayAvPSAxMCkgbisrO1xyXG5cclxuICAgICAgLy8gR2V0IHRoZSBpbmRleCBvZiByZCB3aXRoaW4gdy5cclxuICAgICAgaSAlPSBMT0dfQkFTRTtcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgaW5kZXggb2YgcmQgd2l0aGluIHcsIGFkanVzdGVkIGZvciBsZWFkaW5nIHplcm9zLlxyXG4gICAgICAvLyBUaGUgbnVtYmVyIG9mIGxlYWRpbmcgemVyb3Mgb2YgdyBpcyBnaXZlbiBieSBMT0dfQkFTRSAtIG4uXHJcbiAgICAgIGogPSBpIC0gTE9HX0JBU0UgKyBuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChybSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgIGsgPSBtYXRocG93KDEwLCBuIC0gaiAtIDEpO1xyXG5cclxuICAgICAgLy8gR2V0IHRoZSByb3VuZGluZyBkaWdpdCBhdCBpbmRleCBqIG9mIHcuXHJcbiAgICAgIHJkID0gdyAvIGsgJSAxMCB8IDA7XHJcblxyXG4gICAgICAvLyBBcmUgdGhlcmUgYW55IG5vbi16ZXJvIGRpZ2l0cyBhZnRlciB0aGUgcm91bmRpbmcgZGlnaXQ/XHJcbiAgICAgIGRvUm91bmQgPSBzZCA8IDAgfHwgeGRbeGRpICsgMV0gIT09IHZvaWQgMCB8fCB3ICUgaztcclxuXHJcbiAgICAgIC8vIFRoZSBleHByZXNzaW9uIGB3ICUgbWF0aHBvdygxMCwgbiAtIGogLSAxKWAgcmV0dXJucyBhbGwgdGhlIGRpZ2l0cyBvZiB3IHRvIHRoZSByaWdodCBvZiB0aGVcclxuICAgICAgLy8gZGlnaXQgYXQgKGxlZnQtdG8tcmlnaHQpIGluZGV4IGosIGUuZy4gaWYgdyBpcyA5MDg3MTQgYW5kIGogaXMgMiwgdGhlIGV4cHJlc3Npb24gd2lsbCBnaXZlXHJcbiAgICAgIC8vIDcxNC5cclxuXHJcbiAgICAgIGRvUm91bmQgPSBybSA8IDRcclxuICAgICAgICA/IChyZCB8fCBkb1JvdW5kKSAmJiAocm0gPT0gMCB8fCBybSA9PSAoeC5zIDwgMCA/IDMgOiAyKSlcclxuICAgICAgICA6IHJkID4gNSB8fCByZCA9PSA1ICYmIChybSA9PSA0IHx8IGRvUm91bmQgfHwgcm0gPT0gNiAmJlxyXG5cclxuICAgICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGRpZ2l0IHRvIHRoZSBsZWZ0IG9mIHRoZSByb3VuZGluZyBkaWdpdCBpcyBvZGQuXHJcbiAgICAgICAgICAoKGkgPiAwID8gaiA+IDAgPyB3IC8gbWF0aHBvdygxMCwgbiAtIGopIDogMCA6IHhkW3hkaSAtIDFdKSAlIDEwKSAmIDEgfHxcclxuICAgICAgICAgICAgcm0gPT0gKHgucyA8IDAgPyA4IDogNykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZCA8IDEgfHwgIXhkWzBdKSB7XHJcbiAgICAgIGlmIChkb1JvdW5kKSB7XHJcbiAgICAgICAgayA9IGdldEJhc2UxMEV4cG9uZW50KHgpO1xyXG4gICAgICAgIHhkLmxlbmd0aCA9IDE7XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgc2QgdG8gZGVjaW1hbCBwbGFjZXMuXHJcbiAgICAgICAgc2QgPSBzZCAtIGsgLSAxO1xyXG5cclxuICAgICAgICAvLyAxLCAwLjEsIDAuMDEsIDAuMDAxLCAwLjAwMDEgZXRjLlxyXG4gICAgICAgIHhkWzBdID0gbWF0aHBvdygxMCwgKExPR19CQVNFIC0gc2QgJSBMT0dfQkFTRSkgJSBMT0dfQkFTRSk7XHJcbiAgICAgICAgeC5lID0gbWF0aGZsb29yKC1zZCAvIExPR19CQVNFKSB8fCAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHhkLmxlbmd0aCA9IDE7XHJcblxyXG4gICAgICAgIC8vIFplcm8uXHJcbiAgICAgICAgeGRbMF0gPSB4LmUgPSB4LnMgPSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4geDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1vdmUgZXhjZXNzIGRpZ2l0cy5cclxuICAgIGlmIChpID09IDApIHtcclxuICAgICAgeGQubGVuZ3RoID0geGRpO1xyXG4gICAgICBrID0gMTtcclxuICAgICAgeGRpLS07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB4ZC5sZW5ndGggPSB4ZGkgKyAxO1xyXG4gICAgICBrID0gbWF0aHBvdygxMCwgTE9HX0JBU0UgLSBpKTtcclxuXHJcbiAgICAgIC8vIEUuZy4gNTY3MDAgYmVjb21lcyA1NjAwMCBpZiA3IGlzIHRoZSByb3VuZGluZyBkaWdpdC5cclxuICAgICAgLy8gaiA+IDAgbWVhbnMgaSA+IG51bWJlciBvZiBsZWFkaW5nIHplcm9zIG9mIHcuXHJcbiAgICAgIHhkW3hkaV0gPSBqID4gMCA/ICh3IC8gbWF0aHBvdygxMCwgbiAtIGopICUgbWF0aHBvdygxMCwgaikgfCAwKSAqIGsgOiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb1JvdW5kKSB7XHJcbiAgICAgIGZvciAoOzspIHtcclxuXHJcbiAgICAgICAgLy8gSXMgdGhlIGRpZ2l0IHRvIGJlIHJvdW5kZWQgdXAgaW4gdGhlIGZpcnN0IHdvcmQgb2YgeGQ/XHJcbiAgICAgICAgaWYgKHhkaSA9PSAwKSB7XHJcbiAgICAgICAgICBpZiAoKHhkWzBdICs9IGspID09IEJBU0UpIHtcclxuICAgICAgICAgICAgeGRbMF0gPSAxO1xyXG4gICAgICAgICAgICArK3guZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeGRbeGRpXSArPSBrO1xyXG4gICAgICAgICAgaWYgKHhkW3hkaV0gIT0gQkFTRSkgYnJlYWs7XHJcbiAgICAgICAgICB4ZFt4ZGktLV0gPSAwO1xyXG4gICAgICAgICAgayA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgZm9yIChpID0geGQubGVuZ3RoOyB4ZFstLWldID09PSAwOykgeGQucG9wKCk7XHJcblxyXG4gICAgaWYgKGV4dGVybmFsICYmICh4LmUgPiBNQVhfRSB8fCB4LmUgPCAtTUFYX0UpKSB7XHJcbiAgICAgIHRocm93IEVycm9yKGV4cG9uZW50T3V0T2ZSYW5nZSArIGdldEJhc2UxMEV4cG9uZW50KHgpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geDtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiBzdWJ0cmFjdCh4LCB5KSB7XHJcbiAgICB2YXIgZCwgZSwgaSwgaiwgaywgbGVuLCB4ZCwgeGUsIHhMVHksIHlkLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuXHJcbiAgICAvLyBSZXR1cm4geSBuZWdhdGVkIGlmIHggaXMgemVyby5cclxuICAgIC8vIFJldHVybiB4IGlmIHkgaXMgemVybyBhbmQgeCBpcyBub24temVyby5cclxuICAgIGlmICgheC5zIHx8ICF5LnMpIHtcclxuICAgICAgaWYgKHkucykgeS5zID0gLXkucztcclxuICAgICAgZWxzZSB5ID0gbmV3IEN0b3IoeCk7XHJcbiAgICAgIHJldHVybiBleHRlcm5hbCA/IHJvdW5kKHksIHByKSA6IHk7XHJcbiAgICB9XHJcblxyXG4gICAgeGQgPSB4LmQ7XHJcbiAgICB5ZCA9IHkuZDtcclxuXHJcbiAgICAvLyB4IGFuZCB5IGFyZSBub24temVybyBudW1iZXJzIHdpdGggdGhlIHNhbWUgc2lnbi5cclxuXHJcbiAgICBlID0geS5lO1xyXG4gICAgeGUgPSB4LmU7XHJcbiAgICB4ZCA9IHhkLnNsaWNlKCk7XHJcbiAgICBrID0geGUgLSBlO1xyXG5cclxuICAgIC8vIElmIGV4cG9uZW50cyBkaWZmZXIuLi5cclxuICAgIGlmIChrKSB7XHJcbiAgICAgIHhMVHkgPSBrIDwgMDtcclxuXHJcbiAgICAgIGlmICh4TFR5KSB7XHJcbiAgICAgICAgZCA9IHhkO1xyXG4gICAgICAgIGsgPSAtaztcclxuICAgICAgICBsZW4gPSB5ZC5sZW5ndGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZCA9IHlkO1xyXG4gICAgICAgIGUgPSB4ZTtcclxuICAgICAgICBsZW4gPSB4ZC5sZW5ndGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE51bWJlcnMgd2l0aCBtYXNzaXZlbHkgZGlmZmVyZW50IGV4cG9uZW50cyB3b3VsZCByZXN1bHQgaW4gYSB2ZXJ5IGhpZ2ggbnVtYmVyIG9mIHplcm9zXHJcbiAgICAgIC8vIG5lZWRpbmcgdG8gYmUgcHJlcGVuZGVkLCBidXQgdGhpcyBjYW4gYmUgYXZvaWRlZCB3aGlsZSBzdGlsbCBlbnN1cmluZyBjb3JyZWN0IHJvdW5kaW5nIGJ5XHJcbiAgICAgIC8vIGxpbWl0aW5nIHRoZSBudW1iZXIgb2YgemVyb3MgdG8gYE1hdGguY2VpbChwciAvIExPR19CQVNFKSArIDJgLlxyXG4gICAgICBpID0gTWF0aC5tYXgoTWF0aC5jZWlsKHByIC8gTE9HX0JBU0UpLCBsZW4pICsgMjtcclxuXHJcbiAgICAgIGlmIChrID4gaSkge1xyXG4gICAgICAgIGsgPSBpO1xyXG4gICAgICAgIGQubGVuZ3RoID0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUHJlcGVuZCB6ZXJvcyB0byBlcXVhbGlzZSBleHBvbmVudHMuXHJcbiAgICAgIGQucmV2ZXJzZSgpO1xyXG4gICAgICBmb3IgKGkgPSBrOyBpLS07KSBkLnB1c2goMCk7XHJcbiAgICAgIGQucmV2ZXJzZSgpO1xyXG5cclxuICAgIC8vIEJhc2UgMWU3IGV4cG9uZW50cyBlcXVhbC5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvLyBDaGVjayBkaWdpdHMgdG8gZGV0ZXJtaW5lIHdoaWNoIGlzIHRoZSBiaWdnZXIgbnVtYmVyLlxyXG5cclxuICAgICAgaSA9IHhkLmxlbmd0aDtcclxuICAgICAgbGVuID0geWQubGVuZ3RoO1xyXG4gICAgICB4TFR5ID0gaSA8IGxlbjtcclxuICAgICAgaWYgKHhMVHkpIGxlbiA9IGk7XHJcblxyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBpZiAoeGRbaV0gIT0geWRbaV0pIHtcclxuICAgICAgICAgIHhMVHkgPSB4ZFtpXSA8IHlkW2ldO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBrID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoeExUeSkge1xyXG4gICAgICBkID0geGQ7XHJcbiAgICAgIHhkID0geWQ7XHJcbiAgICAgIHlkID0gZDtcclxuICAgICAgeS5zID0gLXkucztcclxuICAgIH1cclxuXHJcbiAgICBsZW4gPSB4ZC5sZW5ndGg7XHJcblxyXG4gICAgLy8gQXBwZW5kIHplcm9zIHRvIHhkIGlmIHNob3J0ZXIuXHJcbiAgICAvLyBEb24ndCBhZGQgemVyb3MgdG8geWQgaWYgc2hvcnRlciBhcyBzdWJ0cmFjdGlvbiBvbmx5IG5lZWRzIHRvIHN0YXJ0IGF0IHlkIGxlbmd0aC5cclxuICAgIGZvciAoaSA9IHlkLmxlbmd0aCAtIGxlbjsgaSA+IDA7IC0taSkgeGRbbGVuKytdID0gMDtcclxuXHJcbiAgICAvLyBTdWJ0cmFjdCB5ZCBmcm9tIHhkLlxyXG4gICAgZm9yIChpID0geWQubGVuZ3RoOyBpID4gazspIHtcclxuICAgICAgaWYgKHhkWy0taV0gPCB5ZFtpXSkge1xyXG4gICAgICAgIGZvciAoaiA9IGk7IGogJiYgeGRbLS1qXSA9PT0gMDspIHhkW2pdID0gQkFTRSAtIDE7XHJcbiAgICAgICAgLS14ZFtqXTtcclxuICAgICAgICB4ZFtpXSArPSBCQVNFO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB4ZFtpXSAtPSB5ZFtpXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICBmb3IgKDsgeGRbLS1sZW5dID09PSAwOykgeGQucG9wKCk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGxlYWRpbmcgemVyb3MgYW5kIGFkanVzdCBleHBvbmVudCBhY2NvcmRpbmdseS5cclxuICAgIGZvciAoOyB4ZFswXSA9PT0gMDsgeGQuc2hpZnQoKSkgLS1lO1xyXG5cclxuICAgIC8vIFplcm8/XHJcbiAgICBpZiAoIXhkWzBdKSByZXR1cm4gbmV3IEN0b3IoMCk7XHJcblxyXG4gICAgeS5kID0geGQ7XHJcbiAgICB5LmUgPSBlO1xyXG5cclxuICAgIC8vcmV0dXJuIGV4dGVybmFsICYmIHhkLmxlbmd0aCA+PSBwciAvIExPR19CQVNFID8gcm91bmQoeSwgcHIpIDogeTtcclxuICAgIHJldHVybiBleHRlcm5hbCA/IHJvdW5kKHksIHByKSA6IHk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gdG9TdHJpbmcoeCwgaXNFeHAsIHNkKSB7XHJcbiAgICB2YXIgayxcclxuICAgICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpLFxyXG4gICAgICBzdHIgPSBkaWdpdHNUb1N0cmluZyh4LmQpLFxyXG4gICAgICBsZW4gPSBzdHIubGVuZ3RoO1xyXG5cclxuICAgIGlmIChpc0V4cCkge1xyXG4gICAgICBpZiAoc2QgJiYgKGsgPSBzZCAtIGxlbikgPiAwKSB7XHJcbiAgICAgICAgc3RyID0gc3RyLmNoYXJBdCgwKSArICcuJyArIHN0ci5zbGljZSgxKSArIGdldFplcm9TdHJpbmcoayk7XHJcbiAgICAgIH0gZWxzZSBpZiAobGVuID4gMSkge1xyXG4gICAgICAgIHN0ciA9IHN0ci5jaGFyQXQoMCkgKyAnLicgKyBzdHIuc2xpY2UoMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN0ciA9IHN0ciArIChlIDwgMCA/ICdlJyA6ICdlKycpICsgZTtcclxuICAgIH0gZWxzZSBpZiAoZSA8IDApIHtcclxuICAgICAgc3RyID0gJzAuJyArIGdldFplcm9TdHJpbmcoLWUgLSAxKSArIHN0cjtcclxuICAgICAgaWYgKHNkICYmIChrID0gc2QgLSBsZW4pID4gMCkgc3RyICs9IGdldFplcm9TdHJpbmcoayk7XHJcbiAgICB9IGVsc2UgaWYgKGUgPj0gbGVuKSB7XHJcbiAgICAgIHN0ciArPSBnZXRaZXJvU3RyaW5nKGUgKyAxIC0gbGVuKTtcclxuICAgICAgaWYgKHNkICYmIChrID0gc2QgLSBlIC0gMSkgPiAwKSBzdHIgPSBzdHIgKyAnLicgKyBnZXRaZXJvU3RyaW5nKGspO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKChrID0gZSArIDEpIDwgbGVuKSBzdHIgPSBzdHIuc2xpY2UoMCwgaykgKyAnLicgKyBzdHIuc2xpY2Uoayk7XHJcbiAgICAgIGlmIChzZCAmJiAoayA9IHNkIC0gbGVuKSA+IDApIHtcclxuICAgICAgICBpZiAoZSArIDEgPT09IGxlbikgc3RyICs9ICcuJztcclxuICAgICAgICBzdHIgKz0gZ2V0WmVyb1N0cmluZyhrKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4LnMgPCAwID8gJy0nICsgc3RyIDogc3RyO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIERvZXMgbm90IHN0cmlwIHRyYWlsaW5nIHplcm9zLlxyXG4gIGZ1bmN0aW9uIHRydW5jYXRlKGFyciwgbGVuKSB7XHJcbiAgICBpZiAoYXJyLmxlbmd0aCA+IGxlbikge1xyXG4gICAgICBhcnIubGVuZ3RoID0gbGVuO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLyBEZWNpbWFsIG1ldGhvZHNcclxuXHJcblxyXG4gIC8qXHJcbiAgICogIGNsb25lXHJcbiAgICogIGNvbmZpZy9zZXRcclxuICAgKi9cclxuXHJcblxyXG4gIC8qXHJcbiAgICogQ3JlYXRlIGFuZCByZXR1cm4gYSBEZWNpbWFsIGNvbnN0cnVjdG9yIHdpdGggdGhlIHNhbWUgY29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzIGFzIHRoaXMgRGVjaW1hbFxyXG4gICAqIGNvbnN0cnVjdG9yLlxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gY2xvbmUob2JqKSB7XHJcbiAgICB2YXIgaSwgcCwgcHM7XHJcblxyXG4gICAgLypcclxuICAgICAqIFRoZSBEZWNpbWFsIGNvbnN0cnVjdG9yIGFuZCBleHBvcnRlZCBmdW5jdGlvbi5cclxuICAgICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIHZhbHVlIHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9IEEgbnVtZXJpYyB2YWx1ZS5cclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIERlY2ltYWwodmFsdWUpIHtcclxuICAgICAgdmFyIHggPSB0aGlzO1xyXG5cclxuICAgICAgLy8gRGVjaW1hbCBjYWxsZWQgd2l0aG91dCBuZXcuXHJcbiAgICAgIGlmICghKHggaW5zdGFuY2VvZiBEZWNpbWFsKSkgcmV0dXJuIG5ldyBEZWNpbWFsKHZhbHVlKTtcclxuXHJcbiAgICAgIC8vIFJldGFpbiBhIHJlZmVyZW5jZSB0byB0aGlzIERlY2ltYWwgY29uc3RydWN0b3IsIGFuZCBzaGFkb3cgRGVjaW1hbC5wcm90b3R5cGUuY29uc3RydWN0b3JcclxuICAgICAgLy8gd2hpY2ggcG9pbnRzIHRvIE9iamVjdC5cclxuICAgICAgeC5jb25zdHJ1Y3RvciA9IERlY2ltYWw7XHJcblxyXG4gICAgICAvLyBEdXBsaWNhdGUuXHJcbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERlY2ltYWwpIHtcclxuICAgICAgICB4LnMgPSB2YWx1ZS5zO1xyXG4gICAgICAgIHguZSA9IHZhbHVlLmU7XHJcbiAgICAgICAgeC5kID0gKHZhbHVlID0gdmFsdWUuZCkgPyB2YWx1ZS5zbGljZSgpIDogdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG5cclxuICAgICAgICAvLyBSZWplY3QgSW5maW5pdHkvTmFOLlxyXG4gICAgICAgIGlmICh2YWx1ZSAqIDAgIT09IDApIHtcclxuICAgICAgICAgIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA+IDApIHtcclxuICAgICAgICAgIHgucyA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8IDApIHtcclxuICAgICAgICAgIHZhbHVlID0gLXZhbHVlO1xyXG4gICAgICAgICAgeC5zID0gLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHgucyA9IDA7XHJcbiAgICAgICAgICB4LmUgPSAwO1xyXG4gICAgICAgICAgeC5kID0gWzBdO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmFzdCBwYXRoIGZvciBzbWFsbCBpbnRlZ2Vycy5cclxuICAgICAgICBpZiAodmFsdWUgPT09IH5+dmFsdWUgJiYgdmFsdWUgPCAxZTcpIHtcclxuICAgICAgICAgIHguZSA9IDA7XHJcbiAgICAgICAgICB4LmQgPSBbdmFsdWVdO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlRGVjaW1hbCh4LCB2YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgdmFsdWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBNaW51cyBzaWduP1xyXG4gICAgICBpZiAodmFsdWUuY2hhckNvZGVBdCgwKSA9PT0gNDUpIHtcclxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEpO1xyXG4gICAgICAgIHgucyA9IC0xO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHgucyA9IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc0RlY2ltYWwudGVzdCh2YWx1ZSkpIHBhcnNlRGVjaW1hbCh4LCB2YWx1ZSk7XHJcbiAgICAgIGVsc2UgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIERlY2ltYWwucHJvdG90eXBlID0gUDtcclxuXHJcbiAgICBEZWNpbWFsLlJPVU5EX1VQID0gMDtcclxuICAgIERlY2ltYWwuUk9VTkRfRE9XTiA9IDE7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0NFSUwgPSAyO1xyXG4gICAgRGVjaW1hbC5ST1VORF9GTE9PUiA9IDM7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0hBTEZfVVAgPSA0O1xyXG4gICAgRGVjaW1hbC5ST1VORF9IQUxGX0RPV04gPSA1O1xyXG4gICAgRGVjaW1hbC5ST1VORF9IQUxGX0VWRU4gPSA2O1xyXG4gICAgRGVjaW1hbC5ST1VORF9IQUxGX0NFSUwgPSA3O1xyXG4gICAgRGVjaW1hbC5ST1VORF9IQUxGX0ZMT09SID0gODtcclxuXHJcbiAgICBEZWNpbWFsLmNsb25lID0gY2xvbmU7XHJcbiAgICBEZWNpbWFsLmNvbmZpZyA9IERlY2ltYWwuc2V0ID0gY29uZmlnO1xyXG5cclxuICAgIGlmIChvYmogPT09IHZvaWQgMCkgb2JqID0ge307XHJcbiAgICBpZiAob2JqKSB7XHJcbiAgICAgIHBzID0gWydwcmVjaXNpb24nLCAncm91bmRpbmcnLCAndG9FeHBOZWcnLCAndG9FeHBQb3MnLCAnTE4xMCddO1xyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgcHMubGVuZ3RoOykgaWYgKCFvYmouaGFzT3duUHJvcGVydHkocCA9IHBzW2krK10pKSBvYmpbcF0gPSB0aGlzW3BdO1xyXG4gICAgfVxyXG5cclxuICAgIERlY2ltYWwuY29uZmlnKG9iaik7XHJcblxyXG4gICAgcmV0dXJuIERlY2ltYWw7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBDb25maWd1cmUgZ2xvYmFsIHNldHRpbmdzIGZvciBhIERlY2ltYWwgY29uc3RydWN0b3IuXHJcbiAgICpcclxuICAgKiBgb2JqYCBpcyBhbiBvYmplY3Qgd2l0aCBvbmUgb3IgbW9yZSBvZiB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXMsXHJcbiAgICpcclxuICAgKiAgIHByZWNpc2lvbiAge251bWJlcn1cclxuICAgKiAgIHJvdW5kaW5nICAge251bWJlcn1cclxuICAgKiAgIHRvRXhwTmVnICAge251bWJlcn1cclxuICAgKiAgIHRvRXhwUG9zICAge251bWJlcn1cclxuICAgKlxyXG4gICAqIEUuZy4gRGVjaW1hbC5jb25maWcoeyBwcmVjaXNpb246IDIwLCByb3VuZGluZzogNCB9KVxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gY29uZmlnKG9iaikge1xyXG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgJ09iamVjdCBleHBlY3RlZCcpO1xyXG4gICAgfVxyXG4gICAgdmFyIGksIHAsIHYsXHJcbiAgICAgIHBzID0gW1xyXG4gICAgICAgICdwcmVjaXNpb24nLCAxLCBNQVhfRElHSVRTLFxyXG4gICAgICAgICdyb3VuZGluZycsIDAsIDgsXHJcbiAgICAgICAgJ3RvRXhwTmVnJywgLTEgLyAwLCAwLFxyXG4gICAgICAgICd0b0V4cFBvcycsIDAsIDEgLyAwXHJcbiAgICAgIF07XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHBzLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgIGlmICgodiA9IG9ialtwID0gcHNbaV1dKSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgaWYgKG1hdGhmbG9vcih2KSA9PT0gdiAmJiB2ID49IHBzW2kgKyAxXSAmJiB2IDw9IHBzW2kgKyAyXSkgdGhpc1twXSA9IHY7XHJcbiAgICAgICAgZWxzZSB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyBwICsgJzogJyArIHYpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCh2ID0gb2JqW3AgPSAnTE4xMCddKSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgaWYgKHYgPT0gTWF0aC5MTjEwKSB0aGlzW3BdID0gbmV3IHRoaXModik7XHJcbiAgICAgICAgZWxzZSB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyBwICsgJzogJyArIHYpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIENyZWF0ZSBhbmQgY29uZmlndXJlIGluaXRpYWwgRGVjaW1hbCBjb25zdHJ1Y3Rvci5cclxuICBEZWNpbWFsID0gY2xvbmUoRGVjaW1hbCk7XHJcblxyXG4gIERlY2ltYWxbJ2RlZmF1bHQnXSA9IERlY2ltYWwuRGVjaW1hbCA9IERlY2ltYWw7XHJcblxyXG4gIC8vIEludGVybmFsIGNvbnN0YW50LlxyXG4gIE9ORSA9IG5ldyBEZWNpbWFsKDEpO1xyXG5cclxuXHJcbiAgLy8gRXhwb3J0LlxyXG5cclxuXHJcbiAgLy8gQU1ELlxyXG4gIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIERlY2ltYWw7XHJcbiAgICB9KTtcclxuXHJcbiAgLy8gTm9kZSBhbmQgb3RoZXIgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cy5cclxuICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gRGVjaW1hbDtcclxuXHJcbiAgICAvLyBCcm93c2VyLlxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoIWdsb2JhbFNjb3BlKSB7XHJcbiAgICAgIGdsb2JhbFNjb3BlID0gdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiAmJiBzZWxmLnNlbGYgPT0gc2VsZlxyXG4gICAgICAgID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2xvYmFsU2NvcGUuRGVjaW1hbCA9IERlY2ltYWw7XHJcbiAgfVxyXG59KSh0aGlzKTtcclxuIiwiLyohIE1vbWVudCBEdXJhdGlvbiBGb3JtYXQgdjIuMi4yXG4gKiAgaHR0cHM6Ly9naXRodWIuY29tL2pzbXJlZXNlL21vbWVudC1kdXJhdGlvbi1mb3JtYXRcbiAqICBEYXRlOiAyMDE4LTAyLTE2XG4gKlxuICogIER1cmF0aW9uIGZvcm1hdCBwbHVnaW4gZnVuY3Rpb24gZm9yIHRoZSBNb21lbnQuanMgbGlicmFyeVxuICogIGh0dHA6Ly9tb21lbnRqcy5jb20vXG4gKlxuICogIENvcHlyaWdodCAyMDE4IEpvaG4gTWFkaGF2YW4tUmVlc2VcbiAqICBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKFsnbW9tZW50J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dCBvbmx5IENvbW1vbkpTLWxpa2VcbiAgICAgICAgLy8gZW52aXJvbWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLCBsaWtlIE5vZGUuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnbW9tZW50JykpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBJZiBtb21lbnQgaXMgbm90IGF2YWlsYWJsZSwgbGVhdmUgdGhlIHNldHVwIHVwIHRvIHRoZSB1c2VyLlxuICAgICAgICAgICAgLy8gTGlrZSB3aGVuIHVzaW5nIG1vbWVudC10aW1lem9uZSBvciBzaW1pbGFyIG1vbWVudC1iYXNlZCBwYWNrYWdlLlxuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJvb3QpIHtcbiAgICAgICAgLy8gR2xvYmFscy5cbiAgICAgICAgcm9vdC5tb21lbnREdXJhdGlvbkZvcm1hdFNldHVwID0gcm9vdC5tb21lbnQgPyBmYWN0b3J5KHJvb3QubW9tZW50KSA6IGZhY3Rvcnk7XG4gICAgfVxufSkodGhpcywgZnVuY3Rpb24gKG1vbWVudCkge1xuICAgIC8vIGBOdW1iZXIjdG9sb2NhbGVTdHJpbmdgIGlzIHRlc3RlZCBvbiBwbHVnaW4gaW5pdGlhbGl6YXRpb24uXG4gICAgLy8gSWYgdGhlIGZlYXR1cmUgdGVzdCBwYXNzZXMsIGB0b0xvY2FsZVN0cmluZ1dvcmtzYCB3aWxsIGJlIHNldCB0byBgdHJ1ZWAgYW5kIHRoZVxuICAgIC8vIG5hdGl2ZSBmdW5jdGlvbiB3aWxsIGJlIHVzZWQgdG8gZ2VuZXJhdGUgZm9ybWF0dGVkIG91dHB1dC4gSWYgdGhlIGZlYXR1cmVcbiAgICAvLyB0ZXN0IGZhaWxzLCB0aGUgZmFsbGJhY2sgZm9ybWF0IGZ1bmN0aW9uIGludGVybmFsIHRvIHRoaXMgcGx1Z2luIHdpbGwgYmVcbiAgICAvLyB1c2VkLlxuICAgIHZhciB0b0xvY2FsZVN0cmluZ1dvcmtzID0gZmFsc2U7XG5cbiAgICAvLyBgTnVtYmVyI3RvTG9jYWxlU3RyaW5nYCByb3VuZHMgaW5jb3JyZWN0bHkgZm9yIHNlbGVjdCBudW1iZXJzIGluIE1pY3Jvc29mdFxuICAgIC8vIGVudmlyb25tZW50cyAoRWRnZSwgSUUxMSwgV2luZG93cyBQaG9uZSkgYW5kIHBvc3NpYmx5IG90aGVyIGVudmlyb25tZW50cy5cbiAgICAvLyBJZiB0aGUgcm91bmRpbmcgdGVzdCBmYWlscyBhbmQgYHRvTG9jYWxlU3RyaW5nYCB3aWxsIGJlIHVzZWQgZm9yIGZvcm1hdHRpbmcsXG4gICAgLy8gdGhlIHBsdWdpbiB3aWxsIFwicHJlLXJvdW5kXCIgbnVtYmVyIHZhbHVlcyB1c2luZyB0aGUgZmFsbGJhY2sgbnVtYmVyIGZvcm1hdFxuICAgIC8vIGZ1bmN0aW9uIGJlZm9yZSBwYXNzaW5nIHRoZW0gdG8gYHRvTG9jYWxlU3RyaW5nYCBmb3IgZmluYWwgZm9ybWF0dGluZy5cbiAgICB2YXIgdG9Mb2NhbGVTdHJpbmdSb3VuZGluZ1dvcmtzID0gZmFsc2U7XG5cbiAgICAvLyBgSW50bC5OdW1iZXJGb3JtYXQjZm9ybWF0YCBpcyB0ZXN0ZWQgb24gcGx1Z2luIGluaXRpYWxpemF0aW9uLlxuICAgIC8vIElmIHRoZSBmZWF0dXJlIHRlc3QgcGFzc2VzLCBgaW50bE51bWJlckZvcm1hdFJvdW5kaW5nV29ya3NgIHdpbGwgYmUgc2V0IHRvXG4gICAgLy8gYHRydWVgIGFuZCB0aGUgbmF0aXZlIGZ1bmN0aW9uIHdpbGwgYmUgdXNlZCB0byBnZW5lcmF0ZSBmb3JtYXR0ZWQgb3V0cHV0LlxuICAgIC8vIElmIHRoZSBmZWF0dXJlIHRlc3QgZmFpbHMsIGVpdGhlciBgTnVtYmVyI3RvbG9jYWxlU3RyaW5nYCAoaWZcbiAgICAvLyBgdG9Mb2NhbGVTdHJpbmdXb3Jrc2AgaXMgYHRydWVgKSwgb3IgdGhlIGZhbGxiYWNrIGZvcm1hdCBmdW5jdGlvbiBpbnRlcm5hbFxuICAgIC8vICB0byB0aGlzIHBsdWdpbiB3aWxsIGJlIHVzZWQuXG4gICAgdmFyIGludGxOdW1iZXJGb3JtYXRXb3JrcyA9IGZhbHNlO1xuXG4gICAgLy8gYEludGwuTnVtYmVyRm9ybWF0I2Zvcm1hdGAgcm91bmRzIGluY29ycmVjdGx5IGZvciBzZWxlY3QgbnVtYmVycyBpbiBNaWNyb3NvZnRcbiAgICAvLyBlbnZpcm9ubWVudHMgKEVkZ2UsIElFMTEsIFdpbmRvd3MgUGhvbmUpIGFuZCBwb3NzaWJseSBvdGhlciBlbnZpcm9ubWVudHMuXG4gICAgLy8gSWYgdGhlIHJvdW5kaW5nIHRlc3QgZmFpbHMgYW5kIGBJbnRsLk51bWJlckZvcm1hdCNmb3JtYXRgIHdpbGwgYmUgdXNlZCBmb3JcbiAgICAvLyBmb3JtYXR0aW5nLCB0aGUgcGx1Z2luIHdpbGwgXCJwcmUtcm91bmRcIiBudW1iZXIgdmFsdWVzIHVzaW5nIHRoZSBmYWxsYmFjayBudW1iZXJcbiAgICAvLyBmb3JtYXQgZnVuY3Rpb24gYmVmb3JlIHBhc3NpbmcgdGhlbSB0byBgSW50bC5OdW1iZXJGb3JtYXQjZm9ybWF0YCBmb3IgZmluYWxcbiAgICAvLyBmb3JtYXR0aW5nLlxuICAgIHZhciBpbnRsTnVtYmVyRm9ybWF0Um91bmRpbmdXb3JrcyA9IGZhbHNlO1xuXG4gICAgLy8gVG9rZW4gdHlwZSBuYW1lcyBpbiBvcmRlciBvZiBkZXNjZW5kaW5nIG1hZ25pdHVkZS5cbiAgICB2YXIgdHlwZXMgPSBcImVzY2FwZSB5ZWFycyBtb250aHMgd2Vla3MgZGF5cyBob3VycyBtaW51dGVzIHNlY29uZHMgbWlsbGlzZWNvbmRzIGdlbmVyYWxcIi5zcGxpdChcIiBcIik7XG5cbiAgICB2YXIgYnViYmxlcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJzZWNvbmRzXCIsXG4gICAgICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIm1pbnV0ZXNcIiwgdmFsdWU6IDYwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcImhvdXJzXCIsIHZhbHVlOiAzNjAwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcImRheXNcIiwgdmFsdWU6IDg2NDAwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIndlZWtzXCIsIHZhbHVlOiA2MDQ4MDAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwibW9udGhzXCIsIHZhbHVlOiAyNjc4NDAwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInllYXJzXCIsIHZhbHVlOiAzMTUzNjAwMCB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwibWludXRlc1wiLFxuICAgICAgICAgICAgdGFyZ2V0czogW1xuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJob3Vyc1wiLCB2YWx1ZTogNjAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwiZGF5c1wiLCB2YWx1ZTogMTQ0MCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ3ZWVrc1wiLCB2YWx1ZTogMTAwODAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwibW9udGhzXCIsIHZhbHVlOiA0NDY0MCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ5ZWFyc1wiLCB2YWx1ZTogNTI1NjAwIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJob3Vyc1wiLFxuICAgICAgICAgICAgdGFyZ2V0czogW1xuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJkYXlzXCIsIHZhbHVlOiAyNCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ3ZWVrc1wiLCB2YWx1ZTogMTY4IH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIm1vbnRoc1wiLCB2YWx1ZTogNzQ0IH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInllYXJzXCIsIHZhbHVlOiA4NzYwIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJkYXlzXCIsXG4gICAgICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIndlZWtzXCIsIHZhbHVlOiA3IH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIm1vbnRoc1wiLCB2YWx1ZTogMzEgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwieWVhcnNcIiwgdmFsdWU6IDM2NSB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwibW9udGhzXCIsXG4gICAgICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInllYXJzXCIsIHZhbHVlOiAxMiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgLy8gc3RyaW5nSW5jbHVkZXNcbiAgICBmdW5jdGlvbiBzdHJpbmdJbmNsdWRlcyhzdHIsIHNlYXJjaCkge1xuICAgICAgICBpZiAoc2VhcmNoLmxlbmd0aCA+IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RyLmluZGV4T2Yoc2VhcmNoKSAhPT0gLTE7XG4gICAgfVxuXG4gICAgLy8gcmVwZWF0WmVybyhxdHkpXG4gICAgLy8gUmV0dXJucyBcIjBcIiByZXBlYXRlZCBgcXR5YCB0aW1lcy5cbiAgICAvLyBgcXR5YCBtdXN0IGJlIGEgaW50ZWdlciA+PSAwLlxuICAgIGZ1bmN0aW9uIHJlcGVhdFplcm8ocXR5KSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBcIlwiO1xuXG4gICAgICAgIHdoaWxlIChxdHkpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBcIjBcIjtcbiAgICAgICAgICAgIHF0eSAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdSb3VuZChkaWdpdHMpIHtcbiAgICAgICAgdmFyIGRpZ2l0c0FycmF5ID0gZGlnaXRzLnNwbGl0KFwiXCIpLnJldmVyc2UoKTtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgY2FycnkgPSB0cnVlO1xuXG4gICAgICAgIHdoaWxlIChjYXJyeSAmJiBpIDwgZGlnaXRzQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaSkge1xuICAgICAgICAgICAgICAgIGlmIChkaWdpdHNBcnJheVtpXSA9PT0gXCI5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlnaXRzQXJyYXlbaV0gPSBcIjBcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkaWdpdHNBcnJheVtpXSA9IChwYXJzZUludChkaWdpdHNBcnJheVtpXSwgMTApICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgY2FycnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChkaWdpdHNBcnJheVtpXSwgMTApIDwgNSkge1xuICAgICAgICAgICAgICAgICAgICBjYXJyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRpZ2l0c0FycmF5W2ldID0gXCIwXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYXJyeSkge1xuICAgICAgICAgICAgZGlnaXRzQXJyYXkucHVzaChcIjFcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGlnaXRzQXJyYXkucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgfVxuXG4gICAgLy8gY2FjaGVkTnVtYmVyRm9ybWF0XG4gICAgLy8gUmV0dXJucyBhbiBgSW50bC5OdW1iZXJGb3JtYXRgIGluc3RhbmNlIGZvciB0aGUgZ2l2ZW4gbG9jYWxlIGFuZCBjb25maWd1cmF0aW9uLlxuICAgIC8vIE9uIGZpcnN0IHVzZSBvZiBhIHBhcnRpY3VsYXIgY29uZmlndXJhdGlvbiwgdGhlIGluc3RhbmNlIGlzIGNhY2hlZCBmb3IgZmFzdFxuICAgIC8vIHJlcGVhdCBhY2Nlc3MuXG4gICAgZnVuY3Rpb24gY2FjaGVkTnVtYmVyRm9ybWF0KGxvY2FsZSwgb3B0aW9ucykge1xuICAgICAgICAvLyBDcmVhdGUgYSBzb3J0ZWQsIHN0cmluZ2lmaWVkIHZlcnNpb24gb2YgYG9wdGlvbnNgXG4gICAgICAgIC8vIGZvciB1c2UgYXMgcGFydCBvZiB0aGUgY2FjaGUga2V5XG4gICAgICAgIHZhciBvcHRpb25zU3RyaW5nID0gbWFwKFxuICAgICAgICAgICAga2V5cyhvcHRpb25zKS5zb3J0KCksXG4gICAgICAgICAgICBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5ICsgJzonICsgb3B0aW9uc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICApLmpvaW4oJywnKTtcblxuICAgICAgICAvLyBTZXQgb3VyIGNhY2hlIGtleVxuICAgICAgICB2YXIgY2FjaGVLZXkgPSBsb2NhbGUgKyAnKycgKyBvcHRpb25zU3RyaW5nO1xuXG4gICAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgdGhpcyBjb25maWd1cmF0aW9uIGNhY2hlZCwgY29uZmlndXJlIGFuZCBjYWNoZSBpdFxuICAgICAgICBpZiAoIWNhY2hlZE51bWJlckZvcm1hdC5jYWNoZVtjYWNoZUtleV0pIHtcbiAgICAgICAgICAgIGNhY2hlZE51bWJlckZvcm1hdC5jYWNoZVtjYWNoZUtleV0gPSBJbnRsLk51bWJlckZvcm1hdChsb2NhbGUsIG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBjYWNoZWQgdmVyc2lvbiBvZiB0aGlzIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgcmV0dXJuIGNhY2hlZE51bWJlckZvcm1hdC5jYWNoZVtjYWNoZUtleV07XG4gICAgfVxuICAgIGNhY2hlZE51bWJlckZvcm1hdC5jYWNoZSA9IHt9O1xuXG4gICAgLy8gZm9ybWF0TnVtYmVyXG4gICAgLy8gRm9ybWF0cyBhbnkgbnVtYmVyIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB6ZXJvIHVzaW5nIHRoZXNlIG9wdGlvbnM6XG4gICAgLy8gLSB1c2VyTG9jYWxlXG4gICAgLy8gLSB1c2VUb0xvY2FsZVN0cmluZ1xuICAgIC8vIC0gdXNlR3JvdXBpbmdcbiAgICAvLyAtIGdyb3VwaW5nXG4gICAgLy8gLSBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHNcbiAgICAvLyAtIG1pbmltdW1JbnRlZ2VyRGlnaXRzXG4gICAgLy8gLSBmcmFjdGlvbkRpZ2l0c1xuICAgIC8vIC0gZ3JvdXBpbmdTZXBhcmF0b3JcbiAgICAvLyAtIGRlY2ltYWxTZXBhcmF0b3JcbiAgICAvL1xuICAgIC8vIGB1c2VUb0xvY2FsZVN0cmluZ2Agd2lsbCB1c2UgYEludGwuTnVtYmVyRm9ybWF0YCBvciBgdG9Mb2NhbGVTdHJpbmdgIGZvciBmb3JtYXR0aW5nLlxuICAgIC8vIGB1c2VyTG9jYWxlYCBvcHRpb24gaXMgcGFzc2VkIHRocm91Z2ggdG8gdGhlIGZvcm1hdHRpbmcgZnVuY3Rpb24uXG4gICAgLy8gYGZyYWN0aW9uRGlnaXRzYCBpcyBwYXNzZWQgdGhyb3VnaCB0byBgbWF4aW11bUZyYWN0aW9uRGlnaXRzYCBhbmQgYG1pbmltdW1GcmFjdGlvbkRpZ2l0c2BcbiAgICAvLyBVc2luZyBgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzYCB3aWxsIG92ZXJyaWRlIGBtaW5pbXVtSW50ZWdlckRpZ2l0c2AgYW5kIGBmcmFjdGlvbkRpZ2l0c2AuXG4gICAgZnVuY3Rpb24gZm9ybWF0TnVtYmVyKG51bWJlciwgb3B0aW9ucywgdXNlckxvY2FsZSkge1xuICAgICAgICB2YXIgdXNlVG9Mb2NhbGVTdHJpbmcgPSBvcHRpb25zLnVzZVRvTG9jYWxlU3RyaW5nO1xuICAgICAgICB2YXIgdXNlR3JvdXBpbmcgPSBvcHRpb25zLnVzZUdyb3VwaW5nO1xuICAgICAgICB2YXIgZ3JvdXBpbmcgPSB1c2VHcm91cGluZyAmJiBvcHRpb25zLmdyb3VwaW5nLnNsaWNlKCk7XG4gICAgICAgIHZhciBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgPSBvcHRpb25zLm1heGltdW1TaWduaWZpY2FudERpZ2l0cztcbiAgICAgICAgdmFyIG1pbmltdW1JbnRlZ2VyRGlnaXRzID0gb3B0aW9ucy5taW5pbXVtSW50ZWdlckRpZ2l0cyB8fCAxO1xuICAgICAgICB2YXIgZnJhY3Rpb25EaWdpdHMgPSBvcHRpb25zLmZyYWN0aW9uRGlnaXRzIHx8IDA7XG4gICAgICAgIHZhciBncm91cGluZ1NlcGFyYXRvciA9IG9wdGlvbnMuZ3JvdXBpbmdTZXBhcmF0b3I7XG4gICAgICAgIHZhciBkZWNpbWFsU2VwYXJhdG9yID0gb3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yO1xuXG4gICAgICAgIGlmICh1c2VUb0xvY2FsZVN0cmluZyAmJiB1c2VyTG9jYWxlKSB7XG4gICAgICAgICAgICB2YXIgbG9jYWxlU3RyaW5nT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogbWluaW11bUludGVnZXJEaWdpdHMsXG4gICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHVzZUdyb3VwaW5nXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoZnJhY3Rpb25EaWdpdHMpIHtcbiAgICAgICAgICAgICAgICBsb2NhbGVTdHJpbmdPcHRpb25zLm1heGltdW1GcmFjdGlvbkRpZ2l0cyA9IGZyYWN0aW9uRGlnaXRzO1xuICAgICAgICAgICAgICAgIGxvY2FsZVN0cmluZ09wdGlvbnMubWluaW11bUZyYWN0aW9uRGlnaXRzID0gZnJhY3Rpb25EaWdpdHM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHRvTG9jYWxlU3RyaW5nIG91dHB1dCBpcyBcIjAuMFwiIGluc3RlYWQgb2YgXCIwXCIgZm9yIEhUQyBicm93c2Vyc1xuICAgICAgICAgICAgLy8gd2hlbiBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgaXMgc2V0LiBTZWUgIzk2LlxuICAgICAgICAgICAgaWYgKG1heGltdW1TaWduaWZpY2FudERpZ2l0cyAmJiBudW1iZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlU3RyaW5nT3B0aW9ucy5tYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgPSBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbnRsTnVtYmVyRm9ybWF0V29ya3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWludGxOdW1iZXJGb3JtYXRSb3VuZGluZ1dvcmtzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByb3VuZGluZ09wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICByb3VuZGluZ09wdGlvbnMudXNlR3JvdXBpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcm91bmRpbmdPcHRpb25zLmRlY2ltYWxTZXBhcmF0b3IgPSBcIi5cIjtcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyID0gcGFyc2VGbG9hdChmb3JtYXROdW1iZXIobnVtYmVyLCByb3VuZGluZ09wdGlvbnMpLCAxMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlZE51bWJlckZvcm1hdCh1c2VyTG9jYWxlLCBsb2NhbGVTdHJpbmdPcHRpb25zKS5mb3JtYXQobnVtYmVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0b0xvY2FsZVN0cmluZ1JvdW5kaW5nV29ya3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdW5kaW5nT3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kaW5nT3B0aW9ucy51c2VHcm91cGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByb3VuZGluZ09wdGlvbnMuZGVjaW1hbFNlcGFyYXRvciA9IFwiLlwiO1xuICAgICAgICAgICAgICAgICAgICBudW1iZXIgPSBwYXJzZUZsb2F0KGZvcm1hdE51bWJlcihudW1iZXIsIHJvdW5kaW5nT3B0aW9ucyksIDEwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtYmVyLnRvTG9jYWxlU3RyaW5nKHVzZXJMb2NhbGUsIGxvY2FsZVN0cmluZ09wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG51bWJlclN0cmluZztcblxuICAgICAgICAvLyBBZGQgMSB0byBkaWdpdCBvdXRwdXQgbGVuZ3RoIGZvciBmbG9hdGluZyBwb2ludCBlcnJvcnMgd29ya2Fyb3VuZC4gU2VlIGJlbG93LlxuICAgICAgICBpZiAobWF4aW11bVNpZ25pZmljYW50RGlnaXRzKSB7XG4gICAgICAgICAgICBudW1iZXJTdHJpbmcgPSBudW1iZXIudG9QcmVjaXNpb24obWF4aW11bVNpZ25pZmljYW50RGlnaXRzICsgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW1iZXJTdHJpbmcgPSBudW1iZXIudG9GaXhlZChmcmFjdGlvbkRpZ2l0cyArIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGludGVnZXJTdHJpbmc7XG4gICAgICAgIHZhciBmcmFjdGlvblN0cmluZztcbiAgICAgICAgdmFyIGV4cG9uZW50U3RyaW5nO1xuXG4gICAgICAgIHZhciB0ZW1wID0gbnVtYmVyU3RyaW5nLnNwbGl0KFwiZVwiKTtcblxuICAgICAgICBleHBvbmVudFN0cmluZyA9IHRlbXBbMV0gfHwgXCJcIjtcblxuICAgICAgICB0ZW1wID0gdGVtcFswXS5zcGxpdChcIi5cIik7XG5cbiAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSB0ZW1wWzFdIHx8IFwiXCI7XG4gICAgICAgIGludGVnZXJTdHJpbmcgPSB0ZW1wWzBdIHx8IFwiXCI7XG5cbiAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgZmxvYXRpbmcgcG9pbnQgZXJyb3JzIGluIGB0b0ZpeGVkYCBhbmQgYHRvUHJlY2lzaW9uYC5cbiAgICAgICAgLy8gKDMuNTUpLnRvRml4ZWQoMSk7IC0tPiBcIjMuNVwiXG4gICAgICAgIC8vICgxMjMuNTUgLSAxMjApLnRvUHJlY2lzaW9uKDIpOyAtLT4gXCIzLjVcIlxuICAgICAgICAvLyAoMTIzLjU1IC0gMTIwKTsgLS0+IDMuNTQ5OTk5OTk5OTk5OTk3XG4gICAgICAgIC8vICgxMjMuNTUgLSAxMjApLnRvRml4ZWQoMik7IC0tPiBcIjMuNTVcIlxuICAgICAgICAvLyBSb3VuZCBieSBleGFtaW5nIHRoZSBzdHJpbmcgb3V0cHV0IG9mIHRoZSBuZXh0IGRpZ2l0LlxuXG4gICAgICAgIC8vICoqKioqKioqKioqKioqKiBJbXBsZW1lbnQgU3RyaW5nIFJvdW5kaW5nIGhlcmUgKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgLy8gQ2hlY2sgaW50ZWdlclN0cmluZyArIGZyYWN0aW9uU3RyaW5nIGxlbmd0aCBvZiB0b1ByZWNpc2lvbiBiZWZvcmUgcm91bmRpbmcuXG4gICAgICAgIC8vIENoZWNrIGxlbmd0aCBvZiBmcmFjdGlvblN0cmluZyBmcm9tIHRvRml4ZWQgb3V0cHV0IGJlZm9yZSByb3VuZGluZy5cbiAgICAgICAgdmFyIGludGVnZXJMZW5ndGggPSBpbnRlZ2VyU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgdmFyIGZyYWN0aW9uTGVuZ3RoID0gZnJhY3Rpb25TdHJpbmcubGVuZ3RoO1xuICAgICAgICB2YXIgZGlnaXRDb3VudCA9IGludGVnZXJMZW5ndGggKyBmcmFjdGlvbkxlbmd0aDtcbiAgICAgICAgdmFyIGRpZ2l0cyA9IGludGVnZXJTdHJpbmcgKyBmcmFjdGlvblN0cmluZztcblxuICAgICAgICBpZiAobWF4aW11bVNpZ25pZmljYW50RGlnaXRzICYmIGRpZ2l0Q291bnQgPT09IChtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgKyAxKSB8fCAhbWF4aW11bVNpZ25pZmljYW50RGlnaXRzICYmIGZyYWN0aW9uTGVuZ3RoID09PSAoZnJhY3Rpb25EaWdpdHMgKyAxKSkge1xuICAgICAgICAgICAgLy8gUm91bmQgZGlnaXRzLlxuICAgICAgICAgICAgZGlnaXRzID0gc3RyaW5nUm91bmQoZGlnaXRzKTtcblxuICAgICAgICAgICAgaWYgKGRpZ2l0cy5sZW5ndGggPT09IGRpZ2l0Q291bnQgKyAxKSB7XG4gICAgICAgICAgICAgICAgaW50ZWdlckxlbmd0aCA9IGludGVnZXJMZW5ndGggKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEaXNjYXJkIGZpbmFsIGZyYWN0aW9uRGlnaXQuXG4gICAgICAgICAgICBpZiAoZnJhY3Rpb25MZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBkaWdpdHMgPSBkaWdpdHMuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTZXBhcmF0ZSBpbnRlZ2VyIGFuZCBmcmFjdGlvbi5cbiAgICAgICAgICAgIGludGVnZXJTdHJpbmcgPSBkaWdpdHMuc2xpY2UoMCwgaW50ZWdlckxlbmd0aCk7XG4gICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IGRpZ2l0cy5zbGljZShpbnRlZ2VyTGVuZ3RoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRyaW0gdHJhaWxpbmcgemVyb2VzIGZyb20gZnJhY3Rpb25TdHJpbmcgYmVjYXVzZSB0b1ByZWNpc2lvbiBvdXRwdXRzXG4gICAgICAgIC8vIHByZWNpc2lvbiwgbm90IHNpZ25pZmljYW50IGRpZ2l0cy5cbiAgICAgICAgaWYgKG1heGltdW1TaWduaWZpY2FudERpZ2l0cykge1xuICAgICAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSBmcmFjdGlvblN0cmluZy5yZXBsYWNlKC8wKiQvLCBcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhhbmRsZSBleHBvbmVudC5cbiAgICAgICAgdmFyIGV4cG9uZW50ID0gcGFyc2VJbnQoZXhwb25lbnRTdHJpbmcsIDEwKTtcblxuICAgICAgICBpZiAoZXhwb25lbnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAoZnJhY3Rpb25TdHJpbmcubGVuZ3RoIDw9IGV4cG9uZW50KSB7XG4gICAgICAgICAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSBmcmFjdGlvblN0cmluZyArIHJlcGVhdFplcm8oZXhwb25lbnQgLSBmcmFjdGlvblN0cmluZy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgaW50ZWdlclN0cmluZyA9IGludGVnZXJTdHJpbmcgKyBmcmFjdGlvblN0cmluZztcbiAgICAgICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IFwiXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGludGVnZXJTdHJpbmcgPSBpbnRlZ2VyU3RyaW5nICsgZnJhY3Rpb25TdHJpbmcuc2xpY2UoMCwgZXhwb25lbnQpO1xuICAgICAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gZnJhY3Rpb25TdHJpbmcuc2xpY2UoZXhwb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV4cG9uZW50IDwgMCkge1xuICAgICAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSAocmVwZWF0WmVybyhNYXRoLmFicyhleHBvbmVudCkgLSBpbnRlZ2VyU3RyaW5nLmxlbmd0aCkgKyBpbnRlZ2VyU3RyaW5nICsgZnJhY3Rpb25TdHJpbmcpO1xuXG4gICAgICAgICAgICBpbnRlZ2VyU3RyaW5nID0gXCIwXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW1heGltdW1TaWduaWZpY2FudERpZ2l0cykge1xuICAgICAgICAgICAgLy8gVHJpbSBvciBwYWQgZnJhY3Rpb24gd2hlbiBub3QgdXNpbmcgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzLlxuICAgICAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSBmcmFjdGlvblN0cmluZy5zbGljZSgwLCBmcmFjdGlvbkRpZ2l0cyk7XG5cbiAgICAgICAgICAgIGlmIChmcmFjdGlvblN0cmluZy5sZW5ndGggPCBmcmFjdGlvbkRpZ2l0cykge1xuICAgICAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gZnJhY3Rpb25TdHJpbmcgKyByZXBlYXRaZXJvKGZyYWN0aW9uRGlnaXRzIC0gZnJhY3Rpb25TdHJpbmcubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUGFkIGludGVnZXIgd2hlbiB1c2luZyBtaW5pbXVtSW50ZWdlckRpZ2l0c1xuICAgICAgICAgICAgLy8gYW5kIG5vdCB1c2luZyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMuXG4gICAgICAgICAgICBpZiAoaW50ZWdlclN0cmluZy5sZW5ndGggPCBtaW5pbXVtSW50ZWdlckRpZ2l0cykge1xuICAgICAgICAgICAgICAgIGludGVnZXJTdHJpbmcgPSByZXBlYXRaZXJvKG1pbmltdW1JbnRlZ2VyRGlnaXRzIC0gaW50ZWdlclN0cmluZy5sZW5ndGgpICsgaW50ZWdlclN0cmluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmb3JtYXR0ZWRTdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgIC8vIEhhbmRsZSBncm91cGluZy5cbiAgICAgICAgaWYgKHVzZUdyb3VwaW5nKSB7XG4gICAgICAgICAgICB0ZW1wID0gaW50ZWdlclN0cmluZztcbiAgICAgICAgICAgIHZhciBncm91cDtcblxuICAgICAgICAgICAgd2hpbGUgKHRlbXAubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwaW5nLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBncm91cCA9IGdyb3VwaW5nLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdHRlZFN0cmluZykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRTdHJpbmcgPSBncm91cGluZ1NlcGFyYXRvciArIGZvcm1hdHRlZFN0cmluZztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0ZW1wLnNsaWNlKC1ncm91cCkgKyBmb3JtYXR0ZWRTdHJpbmc7XG5cbiAgICAgICAgICAgICAgICB0ZW1wID0gdGVtcC5zbGljZSgwLCAtZ3JvdXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gaW50ZWdlclN0cmluZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBkZWNpbWFsU2VwYXJhdG9yIGFuZCBmcmFjdGlvbi5cbiAgICAgICAgaWYgKGZyYWN0aW9uU3RyaW5nKSB7XG4gICAgICAgICAgICBmb3JtYXR0ZWRTdHJpbmcgPSBmb3JtYXR0ZWRTdHJpbmcgKyBkZWNpbWFsU2VwYXJhdG9yICsgZnJhY3Rpb25TdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkU3RyaW5nO1xuICAgIH1cblxuICAgIC8vIGR1cmF0aW9uTGFiZWxDb21wYXJlXG4gICAgZnVuY3Rpb24gZHVyYXRpb25MYWJlbENvbXBhcmUoYSwgYikge1xuICAgICAgICBpZiAoYS5sYWJlbC5sZW5ndGggPiBiLmxhYmVsLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEubGFiZWwubGVuZ3RoIDwgYi5sYWJlbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYSBtdXN0IGJlIGVxdWFsIHRvIGJcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgLy8gZHVyYXRpb25HZXRMYWJlbHNcbiAgICBmdW5jdGlvbiBkdXJhdGlvbkdldExhYmVscyh0b2tlbiwgbG9jYWxlRGF0YSkge1xuICAgICAgICB2YXIgbGFiZWxzID0gW107XG5cbiAgICAgICAgZWFjaChrZXlzKGxvY2FsZURhdGEpLCBmdW5jdGlvbiAobG9jYWxlRGF0YUtleSkge1xuICAgICAgICAgICAgaWYgKGxvY2FsZURhdGFLZXkuc2xpY2UoMCwgMTUpICE9PSBcIl9kdXJhdGlvbkxhYmVsc1wiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbGFiZWxUeXBlID0gbG9jYWxlRGF0YUtleS5zbGljZSgxNSkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgZWFjaChrZXlzKGxvY2FsZURhdGFbbG9jYWxlRGF0YUtleV0pLCBmdW5jdGlvbiAobGFiZWxLZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAobGFiZWxLZXkuc2xpY2UoMCwgMSkgPT09IHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVscy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGxhYmVsVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogbGFiZWxLZXksXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogbG9jYWxlRGF0YVtsb2NhbGVEYXRhS2V5XVtsYWJlbEtleV1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBsYWJlbHM7XG4gICAgfVxuXG4gICAgLy8gZHVyYXRpb25QbHVyYWxLZXlcbiAgICBmdW5jdGlvbiBkdXJhdGlvblBsdXJhbEtleSh0b2tlbiwgaW50ZWdlclZhbHVlLCBkZWNpbWFsVmFsdWUpIHtcbiAgICAgICAgLy8gU2luZ3VsYXIgZm9yIGEgdmFsdWUgb2YgYDFgLCBidXQgbm90IGZvciBgMS4wYC5cbiAgICAgICAgaWYgKGludGVnZXJWYWx1ZSA9PT0gMSAmJiBkZWNpbWFsVmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b2tlbiArIHRva2VuO1xuICAgIH1cblxuICAgIHZhciBlbmdMb2NhbGUgPSB7XG4gICAgICAgIGR1cmF0aW9uTGFiZWxzU3RhbmRhcmQ6IHtcbiAgICAgICAgICAgIFM6ICdtaWxsaXNlY29uZCcsXG4gICAgICAgICAgICBTUzogJ21pbGxpc2Vjb25kcycsXG4gICAgICAgICAgICBzOiAnc2Vjb25kJyxcbiAgICAgICAgICAgIHNzOiAnc2Vjb25kcycsXG4gICAgICAgICAgICBtOiAnbWludXRlJyxcbiAgICAgICAgICAgIG1tOiAnbWludXRlcycsXG4gICAgICAgICAgICBoOiAnaG91cicsXG4gICAgICAgICAgICBoaDogJ2hvdXJzJyxcbiAgICAgICAgICAgIGQ6ICdkYXknLFxuICAgICAgICAgICAgZGQ6ICdkYXlzJyxcbiAgICAgICAgICAgIHc6ICd3ZWVrJyxcbiAgICAgICAgICAgIHd3OiAnd2Vla3MnLFxuICAgICAgICAgICAgTTogJ21vbnRoJyxcbiAgICAgICAgICAgIE1NOiAnbW9udGhzJyxcbiAgICAgICAgICAgIHk6ICd5ZWFyJyxcbiAgICAgICAgICAgIHl5OiAneWVhcnMnXG4gICAgICAgIH0sXG4gICAgICAgIGR1cmF0aW9uTGFiZWxzU2hvcnQ6IHtcbiAgICAgICAgICAgIFM6ICdtc2VjJyxcbiAgICAgICAgICAgIFNTOiAnbXNlY3MnLFxuICAgICAgICAgICAgczogJ3NlYycsXG4gICAgICAgICAgICBzczogJ3NlY3MnLFxuICAgICAgICAgICAgbTogJ21pbicsXG4gICAgICAgICAgICBtbTogJ21pbnMnLFxuICAgICAgICAgICAgaDogJ2hyJyxcbiAgICAgICAgICAgIGhoOiAnaHJzJyxcbiAgICAgICAgICAgIGQ6ICdkeScsXG4gICAgICAgICAgICBkZDogJ2R5cycsXG4gICAgICAgICAgICB3OiAnd2snLFxuICAgICAgICAgICAgd3c6ICd3a3MnLFxuICAgICAgICAgICAgTTogJ21vJyxcbiAgICAgICAgICAgIE1NOiAnbW9zJyxcbiAgICAgICAgICAgIHk6ICd5cicsXG4gICAgICAgICAgICB5eTogJ3lycydcbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb25UaW1lVGVtcGxhdGVzOiB7XG4gICAgICAgICAgICBITVM6ICdoOm1tOnNzJyxcbiAgICAgICAgICAgIEhNOiAnaDptbScsXG4gICAgICAgICAgICBNUzogJ206c3MnXG4gICAgICAgIH0sXG4gICAgICAgIGR1cmF0aW9uTGFiZWxUeXBlczogW1xuICAgICAgICAgICAgeyB0eXBlOiBcInN0YW5kYXJkXCIsIHN0cmluZzogXCJfX1wiIH0sXG4gICAgICAgICAgICB7IHR5cGU6IFwic2hvcnRcIiwgc3RyaW5nOiBcIl9cIiB9XG4gICAgICAgIF0sXG4gICAgICAgIGR1cmF0aW9uUGx1cmFsS2V5OiBkdXJhdGlvblBsdXJhbEtleVxuICAgIH07XG5cbiAgICAvLyBpc0FycmF5XG4gICAgZnVuY3Rpb24gaXNBcnJheShhcnJheSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycmF5KSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICAgIH1cblxuICAgIC8vIGlzT2JqZWN0XG4gICAgZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIjtcbiAgICB9XG5cbiAgICAvLyBmaW5kTGFzdFxuICAgIGZ1bmN0aW9uIGZpbmRMYXN0KGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW5kZXggPSBhcnJheS5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKGluZGV4IC09IDEpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhhcnJheVtpbmRleF0pKSB7IHJldHVybiBhcnJheVtpbmRleF07IH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZpbmRcbiAgICBmdW5jdGlvbiBmaW5kKGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuXG4gICAgICAgIHZhciBtYXggPSBhcnJheSAmJiBhcnJheS5sZW5ndGggfHwgMDtcblxuICAgICAgICB2YXIgbWF0Y2g7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBtYXRjaCA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtID09PSBtYXRjaDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoaW5kZXggPCBtYXgpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhhcnJheVtpbmRleF0pKSB7IHJldHVybiBhcnJheVtpbmRleF07IH1cbiAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBlYWNoXG4gICAgZnVuY3Rpb24gZWFjaChhcnJheSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMCxcbiAgICAgICAgICAgIG1heCA9IGFycmF5Lmxlbmd0aDtcblxuICAgICAgICBpZiAoIWFycmF5IHx8ICFtYXgpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgd2hpbGUgKGluZGV4IDwgbWF4KSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soYXJyYXlbaW5kZXhdLCBpbmRleCkgPT09IGZhbHNlKSB7IHJldHVybjsgfVxuICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG1hcFxuICAgIGZ1bmN0aW9uIG1hcChhcnJheSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMCxcbiAgICAgICAgICAgIG1heCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgICAgICAgIHJldCA9IFtdO1xuXG4gICAgICAgIGlmICghYXJyYXkgfHwgIW1heCkgeyByZXR1cm4gcmV0OyB9XG5cbiAgICAgICAgd2hpbGUgKGluZGV4IDwgbWF4KSB7XG4gICAgICAgICAgICByZXRbaW5kZXhdID0gY2FsbGJhY2soYXJyYXlbaW5kZXhdLCBpbmRleCk7XG4gICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvLyBwbHVja1xuICAgIGZ1bmN0aW9uIHBsdWNrKGFycmF5LCBwcm9wKSB7XG4gICAgICAgIHJldHVybiBtYXAoYXJyYXksIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbVtwcm9wXTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gY29tcGFjdFxuICAgIGZ1bmN0aW9uIGNvbXBhY3QoYXJyYXkpIHtcbiAgICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICAgIGVhY2goYXJyYXksIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXRlbSkgeyByZXQucHVzaChpdGVtKTsgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8vIHVuaXF1ZVxuICAgIGZ1bmN0aW9uIHVuaXF1ZShhcnJheSkge1xuICAgICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgICAgZWFjaChhcnJheSwgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBpZiAoIWZpbmQocmV0LCBfYSkpIHsgcmV0LnB1c2goX2EpOyB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gaW50ZXJzZWN0aW9uXG4gICAgZnVuY3Rpb24gaW50ZXJzZWN0aW9uKGEsIGIpIHtcbiAgICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICAgIGVhY2goYSwgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBlYWNoKGIsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIGlmIChfYSA9PT0gX2IpIHsgcmV0LnB1c2goX2EpOyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHVuaXF1ZShyZXQpO1xuICAgIH1cblxuICAgIC8vIHJlc3RcbiAgICBmdW5jdGlvbiByZXN0KGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgICAgZWFjaChhcnJheSwgZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoIWNhbGxiYWNrKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcmV0ID0gYXJyYXkuc2xpY2UoaW5kZXgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvLyBpbml0aWFsXG4gICAgZnVuY3Rpb24gaW5pdGlhbChhcnJheSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHJldmVyc2VkID0gYXJyYXkuc2xpY2UoKS5yZXZlcnNlKCk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3QocmV2ZXJzZWQsIGNhbGxiYWNrKS5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgLy8gZXh0ZW5kXG4gICAgZnVuY3Rpb24gZXh0ZW5kKGEsIGIpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICAgICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIHsgYVtrZXldID0gYltrZXldOyB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG5cbiAgICAvLyBrZXlzXG4gICAgZnVuY3Rpb24ga2V5cyhhKSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYSkge1xuICAgICAgICAgICAgaWYgKGEuaGFzT3duUHJvcGVydHkoa2V5KSkgeyByZXQucHVzaChrZXkpOyB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8vIGFueVxuICAgIGZ1bmN0aW9uIGFueShhcnJheSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMCxcbiAgICAgICAgICAgIG1heCA9IGFycmF5Lmxlbmd0aDtcblxuICAgICAgICBpZiAoIWFycmF5IHx8ICFtYXgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgd2hpbGUgKGluZGV4IDwgbWF4KSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soYXJyYXlbaW5kZXhdLCBpbmRleCkgPT09IHRydWUpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gZmxhdHRlblxuICAgIGZ1bmN0aW9uIGZsYXR0ZW4oYXJyYXkpIHtcbiAgICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICAgIGVhY2goYXJyYXksIGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgICAgICByZXQgPSByZXQuY29uY2F0KGNoaWxkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0xvY2FsZVN0cmluZ1N1cHBvcnRzTG9jYWxlcygpIHtcbiAgICAgICAgdmFyIG51bWJlciA9IDA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBudW1iZXIudG9Mb2NhbGVTdHJpbmcoJ2knKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGUubmFtZSA9PT0gJ1JhbmdlRXJyb3InO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmZWF0dXJlVGVzdEZvcm1hdHRlclJvdW5kaW5nKGZvcm1hdHRlcikge1xuICAgICAgICByZXR1cm4gZm9ybWF0dGVyKDMuNTUsIFwiZW5cIiwge1xuICAgICAgICAgICAgdXNlR3JvdXBpbmc6IGZhbHNlLFxuICAgICAgICAgICAgbWluaW11bUludGVnZXJEaWdpdHM6IDEsXG4gICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDEsXG4gICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDFcbiAgICAgICAgfSkgPT09IFwiMy42XCI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmVhdHVyZVRlc3RGb3JtYXR0ZXIoZm9ybWF0dGVyKSB7XG4gICAgICAgIHZhciBwYXNzZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIFRlc3QgbWluaW11bUludGVnZXJEaWdpdHMuXG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoMSwgXCJlblwiLCB7IG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAxIH0pID09PSBcIjFcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcigxLCBcImVuXCIsIHsgbWluaW11bUludGVnZXJEaWdpdHM6IDIgfSkgPT09IFwiMDFcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcigxLCBcImVuXCIsIHsgbWluaW11bUludGVnZXJEaWdpdHM6IDMgfSkgPT09IFwiMDAxXCI7XG4gICAgICAgIGlmICghcGFzc2VkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIC8vIFRlc3QgbWF4aW11bUZyYWN0aW9uRGlnaXRzIGFuZCBtaW5pbXVtRnJhY3Rpb25EaWdpdHMuXG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDAsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMCB9KSA9PT0gXCIxMDBcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMSwgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAxIH0pID09PSBcIjEwMC4wXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMiB9KSA9PT0gXCI5OS45OVwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDk5Ljk5LCBcImVuXCIsIHsgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAzLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDMgfSkgPT09IFwiOTkuOTkwXCI7XG4gICAgICAgIGlmICghcGFzc2VkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIC8vIFRlc3QgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzLlxuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDk5Ljk5LCBcImVuXCIsIHsgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzOiAxIH0pID09PSBcIjEwMFwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDk5Ljk5LCBcImVuXCIsIHsgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzOiAyIH0pID09PSBcIjEwMFwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDk5Ljk5LCBcImVuXCIsIHsgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzOiAzIH0pID09PSBcIjEwMFwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDk5Ljk5LCBcImVuXCIsIHsgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzOiA0IH0pID09PSBcIjk5Ljk5XCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDUgfSkgPT09IFwiOTkuOTlcIjtcbiAgICAgICAgaWYgKCFwYXNzZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgLy8gVGVzdCBncm91cGluZy5cbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcigxMDAwLCBcImVuXCIsIHsgdXNlR3JvdXBpbmc6IHRydWUgfSkgPT09IFwiMSwwMDBcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcigxMDAwLCBcImVuXCIsIHsgdXNlR3JvdXBpbmc6IGZhbHNlIH0pID09PSBcIjEwMDBcIjtcbiAgICAgICAgaWYgKCFwYXNzZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gZHVyYXRpb25zRm9ybWF0KGR1cmF0aW9ucyBbLCB0ZW1wbGF0ZV0gWywgcHJlY2lzaW9uXSBbLCBzZXR0aW5nc10pXG4gICAgZnVuY3Rpb24gZHVyYXRpb25zRm9ybWF0KCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgdmFyIHNldHRpbmdzID0ge307XG4gICAgICAgIHZhciBkdXJhdGlvbnM7XG5cbiAgICAgICAgLy8gUGFyc2UgYXJndW1lbnRzLlxuICAgICAgICBlYWNoKGFyZ3MsIGZ1bmN0aW9uIChhcmcsIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoIWluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0FycmF5KGFyZykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJFeHBlY3RlZCBhcnJheSBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gZHVyYXRpb25zRm9ybWF0LlwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGR1cmF0aW9ucyA9IGFyZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGFyZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MudGVtcGxhdGUgPSBhcmc7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZyA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnByZWNpc2lvbiA9IGFyZztcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc09iamVjdChhcmcpKSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5kKHNldHRpbmdzLCBhcmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWR1cmF0aW9ucyB8fCAhZHVyYXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0dGluZ3MucmV0dXJuTW9tZW50VHlwZXMgPSB0cnVlO1xuXG4gICAgICAgIHZhciBmb3JtYXR0ZWREdXJhdGlvbnMgPSBtYXAoZHVyYXRpb25zLCBmdW5jdGlvbiAoZHVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZHVyLmZvcm1hdChzZXR0aW5ncyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE1lcmdlIHRva2VuIHR5cGVzIGZyb20gYWxsIGR1cmF0aW9ucy5cbiAgICAgICAgdmFyIG91dHB1dFR5cGVzID0gaW50ZXJzZWN0aW9uKHR5cGVzLCB1bmlxdWUocGx1Y2soZmxhdHRlbihmb3JtYXR0ZWREdXJhdGlvbnMpLCBcInR5cGVcIikpKTtcblxuICAgICAgICB2YXIgbGFyZ2VzdCA9IHNldHRpbmdzLmxhcmdlc3Q7XG5cbiAgICAgICAgaWYgKGxhcmdlc3QpIHtcbiAgICAgICAgICAgIG91dHB1dFR5cGVzID0gb3V0cHV0VHlwZXMuc2xpY2UoMCwgbGFyZ2VzdCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXR0aW5ncy5yZXR1cm5Nb21lbnRUeXBlcyA9IGZhbHNlO1xuICAgICAgICBzZXR0aW5ncy5vdXRwdXRUeXBlcyA9IG91dHB1dFR5cGVzO1xuXG4gICAgICAgIHJldHVybiBtYXAoZHVyYXRpb25zLCBmdW5jdGlvbiAoZHVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZHVyLmZvcm1hdChzZXR0aW5ncyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGR1cmF0aW9uRm9ybWF0KFt0ZW1wbGF0ZV0gWywgcHJlY2lzaW9uXSBbLCBzZXR0aW5nc10pXG4gICAgZnVuY3Rpb24gZHVyYXRpb25Gb3JtYXQoKSB7XG5cbiAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBzZXR0aW5ncyA9IGV4dGVuZCh7fSwgdGhpcy5mb3JtYXQuZGVmYXVsdHMpO1xuXG4gICAgICAgIC8vIEtlZXAgYSBzaGFkb3cgY29weSBvZiB0aGlzIG1vbWVudCBmb3IgY2FsY3VsYXRpbmcgcmVtYWluZGVycy5cbiAgICAgICAgLy8gUGVyZm9ybSBhbGwgY2FsY3VsYXRpb25zIG9uIHBvc2l0aXZlIGR1cmF0aW9uIHZhbHVlLCBoYW5kbGUgbmVnYXRpdmVcbiAgICAgICAgLy8gc2lnbiBhdCB0aGUgdmVyeSBlbmQuXG4gICAgICAgIHZhciBhc01pbGxpc2Vjb25kcyA9IHRoaXMuYXNNaWxsaXNlY29uZHMoKTtcbiAgICAgICAgdmFyIGFzTW9udGhzID0gdGhpcy5hc01vbnRocygpO1xuXG4gICAgICAgIC8vIFRyZWF0IGludmFsaWQgZHVyYXRpb25zIGFzIGhhdmluZyBhIHZhbHVlIG9mIDAgbWlsbGlzZWNvbmRzLlxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuaXNWYWxpZCA9PT0gXCJmdW5jdGlvblwiICYmIHRoaXMuaXNWYWxpZCgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgYXNNaWxsaXNlY29uZHMgPSAwO1xuICAgICAgICAgICAgYXNNb250aHMgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGlzTmVnYXRpdmUgPSBhc01pbGxpc2Vjb25kcyA8IDA7XG5cbiAgICAgICAgLy8gVHdvIHNoYWRvdyBjb3BpZXMgYXJlIG5lZWRlZCBiZWNhdXNlIG9mIHRoZSB3YXkgbW9tZW50LmpzIGhhbmRsZXNcbiAgICAgICAgLy8gZHVyYXRpb24gYXJpdGhtZXRpYyBmb3IgeWVhcnMvbW9udGhzIGFuZCBmb3Igd2Vla3MvZGF5cy9ob3Vycy9taW51dGVzL3NlY29uZHMuXG4gICAgICAgIHZhciByZW1haW5kZXIgPSBtb21lbnQuZHVyYXRpb24oTWF0aC5hYnMoYXNNaWxsaXNlY29uZHMpLCBcIm1pbGxpc2Vjb25kc1wiKTtcbiAgICAgICAgdmFyIHJlbWFpbmRlck1vbnRocyA9IG1vbWVudC5kdXJhdGlvbihNYXRoLmFicyhhc01vbnRocyksIFwibW9udGhzXCIpO1xuXG4gICAgICAgIC8vIFBhcnNlIGFyZ3VtZW50cy5cbiAgICAgICAgZWFjaChhcmdzLCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgYXJnID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy50ZW1wbGF0ZSA9IGFyZztcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MucHJlY2lzaW9uID0gYXJnO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGFyZykpIHtcbiAgICAgICAgICAgICAgICBleHRlbmQoc2V0dGluZ3MsIGFyZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBtb21lbnRUb2tlbnMgPSB7XG4gICAgICAgICAgICB5ZWFyczogXCJ5XCIsXG4gICAgICAgICAgICBtb250aHM6IFwiTVwiLFxuICAgICAgICAgICAgd2Vla3M6IFwid1wiLFxuICAgICAgICAgICAgZGF5czogXCJkXCIsXG4gICAgICAgICAgICBob3VyczogXCJoXCIsXG4gICAgICAgICAgICBtaW51dGVzOiBcIm1cIixcbiAgICAgICAgICAgIHNlY29uZHM6IFwic1wiLFxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzOiBcIlNcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0b2tlbkRlZnMgPSB7XG4gICAgICAgICAgICBlc2NhcGU6IC9cXFsoLis/KVxcXS8sXG4gICAgICAgICAgICB5ZWFyczogL1xcKj9bWXldKy8sXG4gICAgICAgICAgICBtb250aHM6IC9cXCo/TSsvLFxuICAgICAgICAgICAgd2Vla3M6IC9cXCo/W1d3XSsvLFxuICAgICAgICAgICAgZGF5czogL1xcKj9bRGRdKy8sXG4gICAgICAgICAgICBob3VyczogL1xcKj9bSGhdKy8sXG4gICAgICAgICAgICBtaW51dGVzOiAvXFwqP20rLyxcbiAgICAgICAgICAgIHNlY29uZHM6IC9cXCo/cysvLFxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzOiAvXFwqP1MrLyxcbiAgICAgICAgICAgIGdlbmVyYWw6IC8uKz8vXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVHlwZXMgYXJyYXkgaXMgYXZhaWxhYmxlIGluIHRoZSB0ZW1wbGF0ZSBmdW5jdGlvbi5cbiAgICAgICAgc2V0dGluZ3MudHlwZXMgPSB0eXBlcztcblxuICAgICAgICB2YXIgdHlwZU1hcCA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgcmV0dXJuIGZpbmQodHlwZXMsIGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuRGVmc1t0eXBlXS50ZXN0KHRva2VuKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0b2tlbml6ZXIgPSBuZXcgUmVnRXhwKG1hcCh0eXBlcywgZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbkRlZnNbdHlwZV0uc291cmNlO1xuICAgICAgICB9KS5qb2luKFwifFwiKSwgXCJnXCIpO1xuXG4gICAgICAgIC8vIEN1cnJlbnQgZHVyYXRpb24gb2JqZWN0IGlzIGF2YWlsYWJsZSBpbiB0aGUgdGVtcGxhdGUgZnVuY3Rpb24uXG4gICAgICAgIHNldHRpbmdzLmR1cmF0aW9uID0gdGhpcztcblxuICAgICAgICAvLyBFdmFsIHRlbXBsYXRlIGZ1bmN0aW9uIGFuZCBjYWNoZSB0ZW1wbGF0ZSBzdHJpbmcuXG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IHR5cGVvZiBzZXR0aW5ncy50ZW1wbGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gc2V0dGluZ3MudGVtcGxhdGUuYXBwbHkoc2V0dGluZ3MpIDogc2V0dGluZ3MudGVtcGxhdGU7XG5cbiAgICAgICAgLy8gb3V0cHV0VHlwZXMgYW5kIHJldHVybk1vbWVudFR5cGVzIGFyZSBzZXR0aW5ncyB0byBzdXBwb3J0IGR1cmF0aW9uc0Zvcm1hdCgpLlxuXG4gICAgICAgIC8vIG91dHB1dFR5cGVzIGlzIGFuIGFycmF5IG9mIG1vbWVudCB0b2tlbiB0eXBlcyB0aGF0IGRldGVybWluZXNcbiAgICAgICAgLy8gdGhlIHRva2VucyByZXR1cm5lZCBpbiBmb3JtYXR0ZWQgb3V0cHV0LiBUaGlzIG9wdGlvbiBvdmVycmlkZXNcbiAgICAgICAgLy8gdHJpbSwgbGFyZ2VzdCwgc3RvcFRyaW0sIGV0Yy5cbiAgICAgICAgdmFyIG91dHB1dFR5cGVzID0gc2V0dGluZ3Mub3V0cHV0VHlwZXM7XG5cbiAgICAgICAgLy8gcmV0dXJuTW9tZW50VHlwZXMgaXMgYSBib29sZWFuIHRoYXQgc2V0cyBkdXJhdGlvbkZvcm1hdCB0byByZXR1cm5cbiAgICAgICAgLy8gdGhlIHByb2Nlc3NlZCBtb21lbnRUeXBlcyBpbnN0ZWFkIG9mIGZvcm1hdHRlZCBvdXRwdXQuXG4gICAgICAgIHZhciByZXR1cm5Nb21lbnRUeXBlcyA9IHNldHRpbmdzLnJldHVybk1vbWVudFR5cGVzO1xuXG4gICAgICAgIHZhciBsYXJnZXN0ID0gc2V0dGluZ3MubGFyZ2VzdDtcblxuICAgICAgICAvLyBTZXR1cCBzdG9wVHJpbSBhcnJheSBvZiB0b2tlbiB0eXBlcy5cbiAgICAgICAgdmFyIHN0b3BUcmltID0gW107XG5cbiAgICAgICAgaWYgKCFvdXRwdXRUeXBlcykge1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoc2V0dGluZ3Muc3RvcFRyaW0pKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3Muc3RvcFRyaW0gPSBzZXR0aW5ncy5zdG9wVHJpbS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBQYXJzZSBzdG9wVHJpbSBzdHJpbmcgdG8gY3JlYXRlIHRva2VuIHR5cGVzIGFycmF5LlxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnN0b3BUcmltKSB7XG4gICAgICAgICAgICAgICAgZWFjaChzZXR0aW5ncy5zdG9wVHJpbS5tYXRjaCh0b2tlbml6ZXIpLCBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSB0eXBlTWFwKHRva2VuKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJlc2NhcGVcIiB8fCB0eXBlID09PSBcImdlbmVyYWxcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc3RvcFRyaW0ucHVzaCh0eXBlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENhY2hlIG1vbWVudCdzIGxvY2FsZSBkYXRhLlxuICAgICAgICB2YXIgbG9jYWxlRGF0YSA9IG1vbWVudC5sb2NhbGVEYXRhKCk7XG5cbiAgICAgICAgaWYgKCFsb2NhbGVEYXRhKSB7XG4gICAgICAgICAgICBsb2NhbGVEYXRhID0ge307XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGYWxsIGJhY2sgdG8gdGhpcyBwbHVnaW4ncyBgZW5nYCBleHRlbnNpb24uXG4gICAgICAgIGVhY2goa2V5cyhlbmdMb2NhbGUpLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVuZ0xvY2FsZVtrZXldID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWxvY2FsZURhdGFba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbGVEYXRhW2tleV0gPSBlbmdMb2NhbGVba2V5XTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghbG9jYWxlRGF0YVtcIl9cIiArIGtleV0pIHtcbiAgICAgICAgICAgICAgICBsb2NhbGVEYXRhW1wiX1wiICsga2V5XSA9IGVuZ0xvY2FsZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZXBsYWNlIER1cmF0aW9uIFRpbWUgVGVtcGxhdGUgc3RyaW5ncy5cbiAgICAgICAgLy8gRm9yIGxvY2FsZSBgZW5nYDogYF9ITVNfYCwgYF9ITV9gLCBhbmQgYF9NU19gLlxuICAgICAgICBlYWNoKGtleXMobG9jYWxlRGF0YS5fZHVyYXRpb25UaW1lVGVtcGxhdGVzKSwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShcIl9cIiArIGl0ZW0gKyBcIl9cIiwgbG9jYWxlRGF0YS5fZHVyYXRpb25UaW1lVGVtcGxhdGVzW2l0ZW1dKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHVzZXIncyBsb2NhbGUuXG4gICAgICAgIHZhciB1c2VyTG9jYWxlID0gc2V0dGluZ3MudXNlckxvY2FsZSB8fCBtb21lbnQubG9jYWxlKCk7XG5cbiAgICAgICAgdmFyIHVzZUxlZnRVbml0cyA9IHNldHRpbmdzLnVzZUxlZnRVbml0cztcbiAgICAgICAgdmFyIHVzZVBsdXJhbCA9IHNldHRpbmdzLnVzZVBsdXJhbDtcbiAgICAgICAgdmFyIHByZWNpc2lvbiA9IHNldHRpbmdzLnByZWNpc2lvbjtcbiAgICAgICAgdmFyIGZvcmNlTGVuZ3RoID0gc2V0dGluZ3MuZm9yY2VMZW5ndGg7XG4gICAgICAgIHZhciB1c2VHcm91cGluZyA9IHNldHRpbmdzLnVzZUdyb3VwaW5nO1xuICAgICAgICB2YXIgdHJ1bmMgPSBzZXR0aW5ncy50cnVuYztcblxuICAgICAgICAvLyBVc2Ugc2lnbmlmaWNhbnQgZGlnaXRzIG9ubHkgd2hlbiBwcmVjaXNpb24gaXMgZ3JlYXRlciB0aGFuIDAuXG4gICAgICAgIHZhciB1c2VTaWduaWZpY2FudERpZ2l0cyA9IHNldHRpbmdzLnVzZVNpZ25pZmljYW50RGlnaXRzICYmIHByZWNpc2lvbiA+IDA7XG4gICAgICAgIHZhciBzaWduaWZpY2FudERpZ2l0cyA9IHVzZVNpZ25pZmljYW50RGlnaXRzID8gc2V0dGluZ3MucHJlY2lzaW9uIDogMDtcbiAgICAgICAgdmFyIHNpZ25pZmljYW50RGlnaXRzQ2FjaGUgPSBzaWduaWZpY2FudERpZ2l0cztcblxuICAgICAgICB2YXIgbWluVmFsdWUgPSBzZXR0aW5ncy5taW5WYWx1ZTtcbiAgICAgICAgdmFyIGlzTWluVmFsdWUgPSBmYWxzZTtcblxuICAgICAgICB2YXIgbWF4VmFsdWUgPSBzZXR0aW5ncy5tYXhWYWx1ZTtcbiAgICAgICAgdmFyIGlzTWF4VmFsdWUgPSBmYWxzZTtcblxuICAgICAgICAvLyBmb3JtYXROdW1iZXIgZmFsbGJhY2sgb3B0aW9ucy5cbiAgICAgICAgdmFyIHVzZVRvTG9jYWxlU3RyaW5nID0gc2V0dGluZ3MudXNlVG9Mb2NhbGVTdHJpbmc7XG4gICAgICAgIHZhciBncm91cGluZ1NlcGFyYXRvciA9IHNldHRpbmdzLmdyb3VwaW5nU2VwYXJhdG9yO1xuICAgICAgICB2YXIgZGVjaW1hbFNlcGFyYXRvciA9IHNldHRpbmdzLmRlY2ltYWxTZXBhcmF0b3I7XG4gICAgICAgIHZhciBncm91cGluZyA9IHNldHRpbmdzLmdyb3VwaW5nO1xuXG4gICAgICAgIHVzZVRvTG9jYWxlU3RyaW5nID0gdXNlVG9Mb2NhbGVTdHJpbmcgJiYgKHRvTG9jYWxlU3RyaW5nV29ya3MgfHwgaW50bE51bWJlckZvcm1hdFdvcmtzKTtcblxuICAgICAgICAvLyBUcmltIG9wdGlvbnMuXG4gICAgICAgIHZhciB0cmltID0gc2V0dGluZ3MudHJpbTtcblxuICAgICAgICBpZiAoaXNBcnJheSh0cmltKSkge1xuICAgICAgICAgICAgdHJpbSA9IHRyaW0uam9pbihcIiBcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHJpbSA9PT0gbnVsbCAmJiAobGFyZ2VzdCB8fCBtYXhWYWx1ZSB8fCB1c2VTaWduaWZpY2FudERpZ2l0cykpIHtcbiAgICAgICAgICAgIHRyaW0gPSBcImFsbFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyaW0gPT09IG51bGwgfHwgdHJpbSA9PT0gdHJ1ZSB8fCB0cmltID09PSBcImxlZnRcIiB8fCB0cmltID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgIHRyaW0gPSBcImxhcmdlXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHJpbSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRyaW0gPSBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRyaW1JbmNsdWRlcyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS50ZXN0KHRyaW0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciByTGFyZ2UgPSAvbGFyZ2UvO1xuICAgICAgICB2YXIgclNtYWxsID0gL3NtYWxsLztcbiAgICAgICAgdmFyIHJCb3RoID0gL2JvdGgvO1xuICAgICAgICB2YXIgck1pZCA9IC9taWQvO1xuICAgICAgICB2YXIgckFsbCA9IC9eYWxsfFtec21dYWxsLztcbiAgICAgICAgdmFyIHJGaW5hbCA9IC9maW5hbC87XG5cbiAgICAgICAgdmFyIHRyaW1MYXJnZSA9IGxhcmdlc3QgPiAwIHx8IGFueShbckxhcmdlLCByQm90aCwgckFsbF0sIHRyaW1JbmNsdWRlcyk7XG4gICAgICAgIHZhciB0cmltU21hbGwgPSBhbnkoW3JTbWFsbCwgckJvdGgsIHJBbGxdLCB0cmltSW5jbHVkZXMpO1xuICAgICAgICB2YXIgdHJpbU1pZCA9IGFueShbck1pZCwgckFsbF0sIHRyaW1JbmNsdWRlcyk7XG4gICAgICAgIHZhciB0cmltRmluYWwgPSBhbnkoW3JGaW5hbCwgckFsbF0sIHRyaW1JbmNsdWRlcyk7XG5cbiAgICAgICAgLy8gUGFyc2UgZm9ybWF0IHN0cmluZyB0byBjcmVhdGUgcmF3IHRva2VucyBhcnJheS5cbiAgICAgICAgdmFyIHJhd1Rva2VucyA9IG1hcCh0ZW1wbGF0ZS5tYXRjaCh0b2tlbml6ZXIpLCBmdW5jdGlvbiAodG9rZW4sIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVNYXAodG9rZW4pO1xuXG4gICAgICAgICAgICBpZiAodG9rZW4uc2xpY2UoMCwgMSkgPT09IFwiKlwiKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSB0b2tlbi5zbGljZSgxKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlICE9PSBcImVzY2FwZVwiICYmIHR5cGUgIT09IFwiZ2VuZXJhbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3BUcmltLnB1c2godHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IHRva2VuLmxlbmd0aCxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlwiLFxuXG4gICAgICAgICAgICAgICAgLy8gUmVwbGFjZSBlc2NhcGVkIHRva2VucyB3aXRoIHRoZSBub24tZXNjYXBlZCB0b2tlbiB0ZXh0LlxuICAgICAgICAgICAgICAgIHRva2VuOiAodHlwZSA9PT0gXCJlc2NhcGVcIiA/IHRva2VuLnJlcGxhY2UodG9rZW5EZWZzLmVzY2FwZSwgXCIkMVwiKSA6IHRva2VuKSxcblxuICAgICAgICAgICAgICAgIC8vIElnbm9yZSB0eXBlIG9uIG5vbi1tb21lbnQgdG9rZW5zLlxuICAgICAgICAgICAgICAgIHR5cGU6ICgodHlwZSA9PT0gXCJlc2NhcGVcIiB8fCB0eXBlID09PSBcImdlbmVyYWxcIikgPyBudWxsIDogdHlwZSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFzc29jaWF0ZSB0ZXh0IHRva2VucyB3aXRoIG1vbWVudCB0b2tlbnMuXG4gICAgICAgIHZhciBjdXJyZW50VG9rZW4gPSB7XG4gICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgIGxlbmd0aDogMCxcbiAgICAgICAgICAgIHRva2VuOiBcIlwiLFxuICAgICAgICAgICAgdGV4dDogXCJcIixcbiAgICAgICAgICAgIHR5cGU6IG51bGxcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdG9rZW5zID0gW107XG5cbiAgICAgICAgaWYgKHVzZUxlZnRVbml0cykge1xuICAgICAgICAgICAgcmF3VG9rZW5zLnJldmVyc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVhY2gocmF3VG9rZW5zLCBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIGlmICh0b2tlbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUb2tlbi50eXBlIHx8IGN1cnJlbnRUb2tlbi50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2Vucy5wdXNoKGN1cnJlbnRUb2tlbik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VycmVudFRva2VuID0gdG9rZW47XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1c2VMZWZ0VW5pdHMpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VG9rZW4udGV4dCA9IHRva2VuLnRva2VuICsgY3VycmVudFRva2VuLnRleHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUb2tlbi50ZXh0ICs9IHRva2VuLnRva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoY3VycmVudFRva2VuLnR5cGUgfHwgY3VycmVudFRva2VuLnRleHQpIHtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKGN1cnJlbnRUb2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXNlTGVmdFVuaXRzKSB7XG4gICAgICAgICAgICB0b2tlbnMucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmluZCB1bmlxdWUgbW9tZW50IHRva2VuIHR5cGVzIGluIHRoZSB0ZW1wbGF0ZSBpbiBvcmRlciBvZlxuICAgICAgICAvLyBkZXNjZW5kaW5nIG1hZ25pdHVkZS5cbiAgICAgICAgdmFyIG1vbWVudFR5cGVzID0gaW50ZXJzZWN0aW9uKHR5cGVzLCB1bmlxdWUoY29tcGFjdChwbHVjayh0b2tlbnMsIFwidHlwZVwiKSkpKTtcblxuICAgICAgICAvLyBFeGl0IGVhcmx5IGlmIHRoZXJlIGFyZSBubyBtb21lbnQgdG9rZW4gdHlwZXMuXG4gICAgICAgIGlmICghbW9tZW50VHlwZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gcGx1Y2sodG9rZW5zLCBcInRleHRcIikuam9pbihcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB2YWx1ZXMgZm9yIGVhY2ggbW9tZW50IHR5cGUgaW4gdGhlIHRlbXBsYXRlLlxuICAgICAgICAvLyBGb3IgcHJvY2Vzc2luZyB0aGUgc2V0dGluZ3MsIHZhbHVlcyBhcmUgYXNzb2NpYXRlZCB3aXRoIG1vbWVudCB0eXBlcy5cbiAgICAgICAgLy8gVmFsdWVzIHdpbGwgYmUgYXNzaWduZWQgdG8gdG9rZW5zIGF0IHRoZSBsYXN0IHN0ZXAgaW4gb3JkZXIgdG9cbiAgICAgICAgLy8gYXNzdW1lIG5vdGhpbmcgYWJvdXQgZnJlcXVlbmN5IG9yIG9yZGVyIG9mIHRva2VucyBpbiB0aGUgdGVtcGxhdGUuXG4gICAgICAgIG1vbWVudFR5cGVzID0gbWFwKG1vbWVudFR5cGVzLCBmdW5jdGlvbiAobW9tZW50VHlwZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIC8vIElzIHRoaXMgdGhlIGxlYXN0LW1hZ25pdHVkZSBtb21lbnQgdG9rZW4gZm91bmQ/XG4gICAgICAgICAgICB2YXIgaXNTbWFsbGVzdCA9ICgoaW5kZXggKyAxKSA9PT0gbW9tZW50VHlwZXMubGVuZ3RoKTtcblxuICAgICAgICAgICAgLy8gSXMgdGhpcyB0aGUgZ3JlYXRlc3QtbWFnbml0dWRlIG1vbWVudCB0b2tlbiBmb3VuZD9cbiAgICAgICAgICAgIHZhciBpc0xhcmdlc3QgPSAoIWluZGV4KTtcblxuICAgICAgICAgICAgLy8gR2V0IHRoZSByYXcgdmFsdWUgaW4gdGhlIGN1cnJlbnQgdW5pdHMuXG4gICAgICAgICAgICB2YXIgcmF3VmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChtb21lbnRUeXBlID09PSBcInllYXJzXCIgfHwgbW9tZW50VHlwZSA9PT0gXCJtb250aHNcIikge1xuICAgICAgICAgICAgICAgIHJhd1ZhbHVlID0gcmVtYWluZGVyTW9udGhzLmFzKG1vbWVudFR5cGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByYXdWYWx1ZSA9IHJlbWFpbmRlci5hcyhtb21lbnRUeXBlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHdob2xlVmFsdWUgPSBNYXRoLmZsb29yKHJhd1ZhbHVlKTtcbiAgICAgICAgICAgIHZhciBkZWNpbWFsVmFsdWUgPSByYXdWYWx1ZSAtIHdob2xlVmFsdWU7XG5cbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGZpbmQodG9rZW5zLCBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZSA9PT0gdG9rZW4udHlwZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoaXNMYXJnZXN0ICYmIG1heFZhbHVlICYmIHJhd1ZhbHVlID4gbWF4VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpc01heFZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzU21hbGxlc3QgJiYgbWluVmFsdWUgJiYgTWF0aC5hYnMoc2V0dGluZ3MuZHVyYXRpb24uYXMobW9tZW50VHlwZSkpIDwgbWluVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpc01pblZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTm90ZSB0aGUgbGVuZ3RoIG9mIHRoZSBsYXJnZXN0LW1hZ25pdHVkZSBtb21lbnQgdG9rZW46XG4gICAgICAgICAgICAvLyBpZiBpdCBpcyBncmVhdGVyIHRoYW4gb25lIGFuZCBmb3JjZUxlbmd0aCBpcyBub3Qgc2V0LFxuICAgICAgICAgICAgLy8gdGhlbiBkZWZhdWx0IGZvcmNlTGVuZ3RoIHRvIGB0cnVlYC5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBSYXRpb25hbGUgaXMgdGhpczogSWYgdGhlIHRlbXBsYXRlIGlzIFwiaDptbTpzc1wiIGFuZCB0aGVcbiAgICAgICAgICAgIC8vIG1vbWVudCB2YWx1ZSBpcyA1IG1pbnV0ZXMsIHRoZSB1c2VyLWZyaWVuZGx5IG91dHB1dCBpc1xuICAgICAgICAgICAgLy8gXCI1OjAwXCIsIG5vdCBcIjA1OjAwXCIuIFdlIHNob3VsZG4ndCBwYWQgdGhlIGBtaW51dGVzYCB0b2tlblxuICAgICAgICAgICAgLy8gZXZlbiB0aG91Z2ggaXQgaGFzIGxlbmd0aCBvZiB0d28gaWYgdGhlIHRlbXBsYXRlIGlzIFwiaDptbTpzc1wiO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIElmIHRoZSBtaW51dGVzIG91dHB1dCBzaG91bGQgYWx3YXlzIGluY2x1ZGUgdGhlIGxlYWRpbmcgemVyb1xuICAgICAgICAgICAgLy8gZXZlbiB3aGVuIHRoZSBob3VyIGlzIHRyaW1tZWQgdGhlbiBzZXQgYHsgZm9yY2VMZW5ndGg6IHRydWUgfWBcbiAgICAgICAgICAgIC8vIHRvIG91dHB1dCBcIjA1OjAwXCIuIElmIHRoZSB0ZW1wbGF0ZSBpcyBcImhoOm1tOnNzXCIsIHRoZSB1c2VyXG4gICAgICAgICAgICAvLyBjbGVhcmx5IHdhbnRlZCBldmVyeXRoaW5nIHBhZGRlZCBzbyB3ZSBzaG91bGQgb3V0cHV0IFwiMDU6MDBcIjtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBJZiB0aGUgdXNlciB3YW50cyB0aGUgZnVsbCBwYWRkZWQgb3V0cHV0LCB0aGV5IGNhbiB1c2VcbiAgICAgICAgICAgIC8vIHRlbXBsYXRlIFwiaGg6bW06c3NcIiBhbmQgc2V0IGB7IHRyaW06IGZhbHNlIH1gIHRvIG91dHB1dFxuICAgICAgICAgICAgLy8gXCIwMDowNTowMFwiLlxuICAgICAgICAgICAgaWYgKGlzTGFyZ2VzdCAmJiBmb3JjZUxlbmd0aCA9PT0gbnVsbCAmJiB0b2tlbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgZm9yY2VMZW5ndGggPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgcmVtYWluZGVyLlxuICAgICAgICAgICAgcmVtYWluZGVyLnN1YnRyYWN0KHdob2xlVmFsdWUsIG1vbWVudFR5cGUpO1xuICAgICAgICAgICAgcmVtYWluZGVyTW9udGhzLnN1YnRyYWN0KHdob2xlVmFsdWUsIG1vbWVudFR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJhd1ZhbHVlOiByYXdWYWx1ZSxcbiAgICAgICAgICAgICAgICB3aG9sZVZhbHVlOiB3aG9sZVZhbHVlLFxuICAgICAgICAgICAgICAgIC8vIERlY2ltYWwgdmFsdWUgaXMgb25seSByZXRhaW5lZCBmb3IgdGhlIGxlYXN0LW1hZ25pdHVkZVxuICAgICAgICAgICAgICAgIC8vIG1vbWVudCB0eXBlIGluIHRoZSBmb3JtYXQgdGVtcGxhdGUuXG4gICAgICAgICAgICAgICAgZGVjaW1hbFZhbHVlOiBpc1NtYWxsZXN0ID8gZGVjaW1hbFZhbHVlIDogMCxcbiAgICAgICAgICAgICAgICBpc1NtYWxsZXN0OiBpc1NtYWxsZXN0LFxuICAgICAgICAgICAgICAgIGlzTGFyZ2VzdDogaXNMYXJnZXN0LFxuICAgICAgICAgICAgICAgIHR5cGU6IG1vbWVudFR5cGUsXG4gICAgICAgICAgICAgICAgLy8gVG9rZW5zIGNhbiBhcHBlYXIgbXVsdGlwbGUgdGltZXMgaW4gYSB0ZW1wbGF0ZSBzdHJpbmcsXG4gICAgICAgICAgICAgICAgLy8gYnV0IGFsbCBpbnN0YW5jZXMgbXVzdCBzaGFyZSB0aGUgc2FtZSBsZW5ndGguXG4gICAgICAgICAgICAgICAgdG9rZW5MZW5ndGg6IHRva2VuLmxlbmd0aFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHRydW5jTWV0aG9kID0gdHJ1bmMgPyBNYXRoLmZsb29yIDogTWF0aC5yb3VuZDtcbiAgICAgICAgdmFyIHRydW5jYXRlID0gZnVuY3Rpb24gKHZhbHVlLCBwbGFjZXMpIHtcbiAgICAgICAgICAgIHZhciBmYWN0b3IgPSBNYXRoLnBvdygxMCwgcGxhY2VzKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVuY01ldGhvZCh2YWx1ZSAqIGZhY3RvcikgLyBmYWN0b3I7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGZvdW5kRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgdmFyIGJ1YmJsZWQgPSBmYWxzZTtcblxuICAgICAgICB2YXIgZm9ybWF0VmFsdWUgPSBmdW5jdGlvbiAobW9tZW50VHlwZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBmb3JtYXRPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB1c2VHcm91cGluZyxcbiAgICAgICAgICAgICAgICBncm91cGluZ1NlcGFyYXRvcjogZ3JvdXBpbmdTZXBhcmF0b3IsXG4gICAgICAgICAgICAgICAgZGVjaW1hbFNlcGFyYXRvcjogZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgICAgICBncm91cGluZzogZ3JvdXBpbmcsXG4gICAgICAgICAgICAgICAgdXNlVG9Mb2NhbGVTdHJpbmc6IHVzZVRvTG9jYWxlU3RyaW5nXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodXNlU2lnbmlmaWNhbnREaWdpdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2lnbmlmaWNhbnREaWdpdHMgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnJhd1ZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS53aG9sZVZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS5kZWNpbWFsVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdE9wdGlvbnMubWF4aW11bVNpZ25pZmljYW50RGlnaXRzID0gc2lnbmlmaWNhbnREaWdpdHM7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUuc2lnbmlmaWNhbnREaWdpdHMgPSBzaWduaWZpY2FudERpZ2l0cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc01heFZhbHVlICYmICFidWJibGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudFR5cGUuaXNMYXJnZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUud2hvbGVWYWx1ZSA9IG1heFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS53aG9sZVZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS5kZWNpbWFsVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzTWluVmFsdWUgJiYgIWJ1YmJsZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAobW9tZW50VHlwZS5pc1NtYWxsZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUud2hvbGVWYWx1ZSA9IG1pblZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS53aG9sZVZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS5kZWNpbWFsVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1vbWVudFR5cGUuaXNTbWFsbGVzdCB8fCBtb21lbnRUeXBlLnNpZ25pZmljYW50RGlnaXRzICYmIG1vbWVudFR5cGUuc2lnbmlmaWNhbnREaWdpdHMgLSBtb21lbnRUeXBlLndob2xlVmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgICAgIC8vIEFwcGx5IHByZWNpc2lvbiB0byBsZWFzdCBzaWduaWZpY2FudCB0b2tlbiB2YWx1ZS5cbiAgICAgICAgICAgICAgICBpZiAocHJlY2lzaW9uIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnZhbHVlID0gdHJ1bmNhdGUobW9tZW50VHlwZS53aG9sZVZhbHVlLCBwcmVjaXNpb24pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJlY2lzaW9uID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSB0cnVuY01ldGhvZChtb21lbnRUeXBlLndob2xlVmFsdWUgKyBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gcHJlY2lzaW9uID4gMFxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlU2lnbmlmaWNhbnREaWdpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnVuYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSB0cnVuY2F0ZShtb21lbnRUeXBlLnJhd1ZhbHVlLCBzaWduaWZpY2FudERpZ2l0cyAtIG1vbWVudFR5cGUud2hvbGVWYWx1ZS50b1N0cmluZygpLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSBtb21lbnRUeXBlLnJhd1ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9tZW50VHlwZS53aG9sZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmlmaWNhbnREaWdpdHMgLT0gbW9tZW50VHlwZS53aG9sZVZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0T3B0aW9ucy5mcmFjdGlvbkRpZ2l0cyA9IHByZWNpc2lvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRydW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IG1vbWVudFR5cGUud2hvbGVWYWx1ZSArIHRydW5jYXRlKG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlLCBwcmVjaXNpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnZhbHVlID0gbW9tZW50VHlwZS53aG9sZVZhbHVlICsgbW9tZW50VHlwZS5kZWNpbWFsVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh1c2VTaWduaWZpY2FudERpZ2l0cyAmJiBtb21lbnRUeXBlLndob2xlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3V0ZXIgTWF0aC5yb3VuZCByZXF1aXJlZCBoZXJlIHRvIGhhbmRsZSBmbG9hdGluZyBwb2ludCBlcnJvcnMuXG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSBNYXRoLnJvdW5kKHRydW5jYXRlKG1vbWVudFR5cGUud2hvbGVWYWx1ZSwgbW9tZW50VHlwZS5zaWduaWZpY2FudERpZ2l0cyAtIG1vbWVudFR5cGUud2hvbGVWYWx1ZS50b1N0cmluZygpLmxlbmd0aCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNpZ25pZmljYW50RGlnaXRzIC09IG1vbWVudFR5cGUud2hvbGVWYWx1ZS50b1N0cmluZygpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnZhbHVlID0gbW9tZW50VHlwZS53aG9sZVZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1vbWVudFR5cGUudG9rZW5MZW5ndGggPiAxICYmIChmb3JjZUxlbmd0aCB8fCBmb3VuZEZpcnN0KSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdE9wdGlvbnMubWluaW11bUludGVnZXJEaWdpdHMgPSBtb21lbnRUeXBlLnRva2VuTGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgaWYgKGJ1YmJsZWQgJiYgZm9ybWF0T3B0aW9ucy5tYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgPCBtb21lbnRUeXBlLnRva2VuTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBmb3JtYXRPcHRpb25zLm1heGltdW1TaWduaWZpY2FudERpZ2l0cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZm91bmRGaXJzdCAmJiAobW9tZW50VHlwZS52YWx1ZSA+IDAgfHwgdHJpbSA9PT0gXCJcIiAvKiB0cmltOiBmYWxzZSAqLyB8fCBmaW5kKHN0b3BUcmltLCBtb21lbnRUeXBlLnR5cGUpIHx8IGZpbmQob3V0cHV0VHlwZXMsIG1vbWVudFR5cGUudHlwZSkpKSB7XG4gICAgICAgICAgICAgICAgZm91bmRGaXJzdCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1vbWVudFR5cGUuZm9ybWF0dGVkVmFsdWUgPSBmb3JtYXROdW1iZXIobW9tZW50VHlwZS52YWx1ZSwgZm9ybWF0T3B0aW9ucywgdXNlckxvY2FsZSk7XG5cbiAgICAgICAgICAgIGZvcm1hdE9wdGlvbnMudXNlR3JvdXBpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvcm1hdE9wdGlvbnMuZGVjaW1hbFNlcGFyYXRvciA9IFwiLlwiO1xuICAgICAgICAgICAgbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZUVuID0gZm9ybWF0TnVtYmVyKG1vbWVudFR5cGUudmFsdWUsIGZvcm1hdE9wdGlvbnMsIFwiZW5cIik7XG5cbiAgICAgICAgICAgIGlmIChtb21lbnRUeXBlLnRva2VuTGVuZ3RoID09PSAyICYmIG1vbWVudFR5cGUudHlwZSA9PT0gXCJtaWxsaXNlY29uZHNcIikge1xuICAgICAgICAgICAgICAgIG1vbWVudFR5cGUuZm9ybWF0dGVkVmFsdWVNUyA9IGZvcm1hdE51bWJlcihtb21lbnRUeXBlLnZhbHVlLCB7XG4gICAgICAgICAgICAgICAgICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAzLFxuICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogZmFsc2VcbiAgICAgICAgICAgICAgICB9LCBcImVuXCIpLnNsaWNlKDAsIDIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBDYWxjdWxhdGUgZm9ybWF0dGVkIHZhbHVlcy5cbiAgICAgICAgbW9tZW50VHlwZXMgPSBtYXAobW9tZW50VHlwZXMsIGZvcm1hdFZhbHVlKTtcbiAgICAgICAgbW9tZW50VHlwZXMgPSBjb21wYWN0KG1vbWVudFR5cGVzKTtcblxuICAgICAgICAvLyBCdWJibGUgcm91bmRlZCB2YWx1ZXMuXG4gICAgICAgIGlmIChtb21lbnRUeXBlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB2YXIgZmluZFR5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kKG1vbWVudFR5cGVzLCBmdW5jdGlvbiAobW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZS50eXBlID09PSB0eXBlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGJ1YmJsZVR5cGVzID0gZnVuY3Rpb24gKGJ1YmJsZSkge1xuICAgICAgICAgICAgICAgIHZhciBidWJibGVNb21lbnRUeXBlID0gZmluZFR5cGUoYnViYmxlLnR5cGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFidWJibGVNb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlYWNoKGJ1YmJsZS50YXJnZXRzLCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXRNb21lbnRUeXBlID0gZmluZFR5cGUodGFyZ2V0LnR5cGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0TW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGJ1YmJsZU1vbWVudFR5cGUuZm9ybWF0dGVkVmFsdWVFbiwgMTApID09PSB0YXJnZXQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZU1vbWVudFR5cGUucmF3VmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlTW9tZW50VHlwZS53aG9sZVZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZU1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1vbWVudFR5cGUucmF3VmFsdWUgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1vbWVudFR5cGUud2hvbGVWYWx1ZSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TW9tZW50VHlwZS5kZWNpbWFsVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZUVuID0gdGFyZ2V0TW9tZW50VHlwZS53aG9sZVZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZWFjaChidWJibGVzLCBidWJibGVUeXBlcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZWNhbGN1bGF0ZSBmb3JtYXR0ZWQgdmFsdWVzLlxuICAgICAgICBpZiAoYnViYmxlZCkge1xuICAgICAgICAgICAgZm91bmRGaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgc2lnbmlmaWNhbnREaWdpdHMgPSBzaWduaWZpY2FudERpZ2l0c0NhY2hlO1xuICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBtYXAobW9tZW50VHlwZXMsIGZvcm1hdFZhbHVlKTtcbiAgICAgICAgICAgIG1vbWVudFR5cGVzID0gY29tcGFjdChtb21lbnRUeXBlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3V0cHV0VHlwZXMgJiYgIShpc01heFZhbHVlICYmICFzZXR0aW5ncy50cmltKSkge1xuICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBtYXAobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmQob3V0cHV0VHlwZXMsIGZ1bmN0aW9uIChvdXRwdXRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlLnR5cGUgPT09IG91dHB1dFR5cGU7XG4gICAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBjb21wYWN0KG1vbWVudFR5cGVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRyaW0gTGFyZ2UuXG4gICAgICAgICAgICBpZiAodHJpbUxhcmdlKSB7XG4gICAgICAgICAgICAgICAgbW9tZW50VHlwZXMgPSByZXN0KG1vbWVudFR5cGVzLCBmdW5jdGlvbiAobW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTdG9wIHRyaW1taW5nIG9uOlxuICAgICAgICAgICAgICAgICAgICAvLyAtIHRoZSBzbWFsbGVzdCBtb21lbnQgdHlwZVxuICAgICAgICAgICAgICAgICAgICAvLyAtIGEgdHlwZSBtYXJrZWQgZm9yIHN0b3BUcmltXG4gICAgICAgICAgICAgICAgICAgIC8vIC0gYSB0eXBlIHRoYXQgaGFzIGEgd2hvbGUgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFtb21lbnRUeXBlLmlzU21hbGxlc3QgJiYgIW1vbWVudFR5cGUud2hvbGVWYWx1ZSAmJiAhZmluZChzdG9wVHJpbSwgbW9tZW50VHlwZS50eXBlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTGFyZ2VzdC5cbiAgICAgICAgICAgIGlmIChsYXJnZXN0ICYmIG1vbWVudFR5cGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG1vbWVudFR5cGVzID0gbW9tZW50VHlwZXMuc2xpY2UoMCwgbGFyZ2VzdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRyaW0gU21hbGwuXG4gICAgICAgICAgICBpZiAodHJpbVNtYWxsICYmIG1vbWVudFR5cGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlcyA9IGluaXRpYWwobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3AgdHJpbW1pbmcgb246XG4gICAgICAgICAgICAgICAgICAgIC8vIC0gYSB0eXBlIG1hcmtlZCBmb3Igc3RvcFRyaW1cbiAgICAgICAgICAgICAgICAgICAgLy8gLSBhIHR5cGUgdGhhdCBoYXMgYSB3aG9sZSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAvLyAtIHRoZSBsYXJnZXN0IG1vbWVudFR5cGVcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFtb21lbnRUeXBlLndob2xlVmFsdWUgJiYgIWZpbmQoc3RvcFRyaW0sIG1vbWVudFR5cGUudHlwZSkgJiYgIW1vbWVudFR5cGUuaXNMYXJnZXN0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUcmltIE1pZC5cbiAgICAgICAgICAgIGlmICh0cmltTWlkKSB7XG4gICAgICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBtYXAobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwICYmIGluZGV4IDwgbW9tZW50VHlwZXMubGVuZ3RoIC0gMSAmJiAhbW9tZW50VHlwZS53aG9sZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBjb21wYWN0KG1vbWVudFR5cGVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVHJpbSBGaW5hbC5cbiAgICAgICAgICAgIGlmICh0cmltRmluYWwgJiYgbW9tZW50VHlwZXMubGVuZ3RoID09PSAxICYmICFtb21lbnRUeXBlc1swXS53aG9sZVZhbHVlICYmICEoIXRydW5jICYmIG1vbWVudFR5cGVzWzBdLmlzU21hbGxlc3QgJiYgbW9tZW50VHlwZXNbMF0ucmF3VmFsdWUgPCBtaW5WYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJldHVybk1vbWVudFR5cGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMb2NhbGl6ZSBhbmQgcGx1cmFsaXplIHVuaXQgbGFiZWxzLlxuICAgICAgICBlYWNoKHRva2VucywgZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gbW9tZW50VG9rZW5zW3Rva2VuLnR5cGVdO1xuXG4gICAgICAgICAgICB2YXIgbW9tZW50VHlwZSA9IGZpbmQobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGUudHlwZSA9PT0gdG9rZW4udHlwZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIWtleSB8fCAhbW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IG1vbWVudFR5cGUuZm9ybWF0dGVkVmFsdWVFbi5zcGxpdChcIi5cIik7XG5cbiAgICAgICAgICAgIHZhbHVlc1swXSA9IHBhcnNlSW50KHZhbHVlc1swXSwgMTApO1xuXG4gICAgICAgICAgICBpZiAodmFsdWVzWzFdKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzWzFdID0gcGFyc2VGbG9hdChcIjAuXCIgKyB2YWx1ZXNbMV0sIDEwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzWzFdID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBsdXJhbEtleSA9IGxvY2FsZURhdGEuZHVyYXRpb25QbHVyYWxLZXkoa2V5LCB2YWx1ZXNbMF0sIHZhbHVlc1sxXSk7XG5cbiAgICAgICAgICAgIHZhciBsYWJlbHMgPSBkdXJhdGlvbkdldExhYmVscyhrZXksIGxvY2FsZURhdGEpO1xuXG4gICAgICAgICAgICB2YXIgYXV0b0xvY2FsaXplZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB2YXIgcGx1cmFsaXplZExhYmVscyA9IHt9O1xuXG4gICAgICAgICAgICAvLyBBdXRvLUxvY2FsaXplZCB1bml0IGxhYmVscy5cbiAgICAgICAgICAgIGVhY2gobG9jYWxlRGF0YS5fZHVyYXRpb25MYWJlbFR5cGVzLCBmdW5jdGlvbiAobGFiZWxUeXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gZmluZChsYWJlbHMsIGZ1bmN0aW9uIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGFiZWwudHlwZSA9PT0gbGFiZWxUeXBlLnR5cGUgJiYgbGFiZWwua2V5ID09PSBwbHVyYWxLZXk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGx1cmFsaXplZExhYmVsc1tsYWJlbC50eXBlXSA9IGxhYmVsLmxhYmVsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmdJbmNsdWRlcyh0b2tlbi50ZXh0LCBsYWJlbFR5cGUuc3RyaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4udGV4dCA9IHRva2VuLnRleHQucmVwbGFjZShsYWJlbFR5cGUuc3RyaW5nLCBsYWJlbC5sYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvTG9jYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBBdXRvLXBsdXJhbGl6ZWQgdW5pdCBsYWJlbHMuXG4gICAgICAgICAgICBpZiAodXNlUGx1cmFsICYmICFhdXRvTG9jYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgbGFiZWxzLnNvcnQoZHVyYXRpb25MYWJlbENvbXBhcmUpO1xuXG4gICAgICAgICAgICAgICAgZWFjaChsYWJlbHMsIGZ1bmN0aW9uIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGx1cmFsaXplZExhYmVsc1tsYWJlbC50eXBlXSA9PT0gbGFiZWwubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmdJbmNsdWRlcyh0b2tlbi50ZXh0LCBsYWJlbC5sYWJlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdG9wIGNoZWNraW5nIHRoaXMgdG9rZW4gaWYgaXRzIGxhYmVsIGlzIGFscmVhZHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb3JyZWN0bHkgcGx1cmFsaXplZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNraXAgdGhpcyBsYWJlbCBpZiBpdCBpcyBjb3JyZWN0LCBidXQgbm90IHByZXNlbnQgaW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSB0b2tlbidzIHRleHQuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaW5nSW5jbHVkZXModG9rZW4udGV4dCwgbGFiZWwubGFiZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXBsZWNlIHRoaXMgdG9rZW4ncyBsYWJlbCBhbmQgc3RvcCBjaGVja2luZy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuLnRleHQgPSB0b2tlbi50ZXh0LnJlcGxhY2UobGFiZWwubGFiZWwsIHBsdXJhbGl6ZWRMYWJlbHNbbGFiZWwudHlwZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEJ1aWxkIG91cHR1dC5cbiAgICAgICAgdG9rZW5zID0gbWFwKHRva2VucywgZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICBpZiAoIXRva2VuLnR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4udGV4dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1vbWVudFR5cGUgPSBmaW5kKG1vbWVudFR5cGVzLCBmdW5jdGlvbiAobW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlLnR5cGUgPT09IHRva2VuLnR5cGU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBvdXQgPSBcIlwiO1xuXG4gICAgICAgICAgICBpZiAodXNlTGVmdFVuaXRzKSB7XG4gICAgICAgICAgICAgICAgb3V0ICs9IHRva2VuLnRleHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc05lZ2F0aXZlICYmIGlzTWF4VmFsdWUgfHwgIWlzTmVnYXRpdmUgJiYgaXNNaW5WYWx1ZSkge1xuICAgICAgICAgICAgICAgIG91dCArPSBcIjwgXCI7XG4gICAgICAgICAgICAgICAgaXNNYXhWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlzTWluVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzTmVnYXRpdmUgJiYgaXNNaW5WYWx1ZSB8fCAhaXNOZWdhdGl2ZSAmJiBpc01heFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgb3V0ICs9IFwiPiBcIjtcbiAgICAgICAgICAgICAgICBpc01heFZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaXNNaW5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNOZWdhdGl2ZSAmJiAobW9tZW50VHlwZS52YWx1ZSA+IDAgfHwgdHJpbSA9PT0gXCJcIiB8fCBmaW5kKHN0b3BUcmltLCBtb21lbnRUeXBlLnR5cGUpIHx8IGZpbmQob3V0cHV0VHlwZXMsIG1vbWVudFR5cGUudHlwZSkpKSB7XG4gICAgICAgICAgICAgICAgb3V0ICs9IFwiLVwiO1xuICAgICAgICAgICAgICAgIGlzTmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IFwibWlsbGlzZWNvbmRzXCIgJiYgbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZU1TKSB7XG4gICAgICAgICAgICAgICAgb3V0ICs9IG1vbWVudFR5cGUuZm9ybWF0dGVkVmFsdWVNUztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3V0ICs9IG1vbWVudFR5cGUuZm9ybWF0dGVkVmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdXNlTGVmdFVuaXRzKSB7XG4gICAgICAgICAgICAgICAgb3V0ICs9IHRva2VuLnRleHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRyaW0gbGVhZGluZyBhbmQgdHJhaWxpbmcgY29tbWEsIHNwYWNlLCBjb2xvbiwgYW5kIGRvdC5cbiAgICAgICAgcmV0dXJuIHRva2Vucy5qb2luKFwiXCIpLnJlcGxhY2UoLygsfCB8OnxcXC4pKiQvLCBcIlwiKS5yZXBsYWNlKC9eKCx8IHw6fFxcLikqLywgXCJcIik7XG4gICAgfVxuXG4gICAgLy8gZGVmYXVsdEZvcm1hdFRlbXBsYXRlXG4gICAgZnVuY3Rpb24gZGVmYXVsdEZvcm1hdFRlbXBsYXRlKCkge1xuICAgICAgICB2YXIgZHVyID0gdGhpcy5kdXJhdGlvbjtcblxuICAgICAgICB2YXIgZmluZFR5cGUgPSBmdW5jdGlvbiBmaW5kVHlwZSh0eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gZHVyLl9kYXRhW3R5cGVdO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBmaXJzdFR5cGUgPSBmaW5kKHRoaXMudHlwZXMsIGZpbmRUeXBlKTtcblxuICAgICAgICB2YXIgbGFzdFR5cGUgPSBmaW5kTGFzdCh0aGlzLnR5cGVzLCBmaW5kVHlwZSk7XG5cbiAgICAgICAgLy8gRGVmYXVsdCB0ZW1wbGF0ZSBzdHJpbmdzIGZvciBlYWNoIGR1cmF0aW9uIGRpbWVuc2lvbiB0eXBlLlxuICAgICAgICBzd2l0Y2ggKGZpcnN0VHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIm1pbGxpc2Vjb25kc1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIlMgX19cIjtcbiAgICAgICAgICAgIGNhc2UgXCJzZWNvbmRzXCI6IC8vIEZhbGx0aHJvdWdoLlxuICAgICAgICAgICAgY2FzZSBcIm1pbnV0ZXNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIqX01TX1wiO1xuICAgICAgICAgICAgY2FzZSBcImhvdXJzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiX0hNU19cIjtcbiAgICAgICAgICAgIGNhc2UgXCJkYXlzXCI6IC8vIFBvc3NpYmxlIEZhbGx0aHJvdWdoLlxuICAgICAgICAgICAgICAgIGlmIChmaXJzdFR5cGUgPT09IGxhc3RUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImQgX19cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwid2Vla3NcIjpcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RUeXBlID09PSBsYXN0VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ3IF9fXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaW0gPSBcImJvdGhcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ3IF9fLCBkIF9fLCBoIF9fXCI7XG4gICAgICAgICAgICBjYXNlIFwibW9udGhzXCI6IC8vIFBvc3NpYmxlIEZhbGx0aHJvdWdoLlxuICAgICAgICAgICAgICAgIGlmIChmaXJzdFR5cGUgPT09IGxhc3RUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk0gX19cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwieWVhcnNcIjpcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RUeXBlID09PSBsYXN0VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ5IF9fXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaW0gPSBcImJvdGhcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ5IF9fLCBNIF9fLCBkIF9fXCI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmltID0gXCJib3RoXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwieSBfXywgZCBfXywgaCBfXywgbSBfXywgcyBfX1wiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaW5pdFxuICAgIGZ1bmN0aW9uIGluaXQoY29udGV4dCkge1xuICAgICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICAgIHRocm93IFwiTW9tZW50IER1cmF0aW9uIEZvcm1hdCBpbml0IGNhbm5vdCBmaW5kIG1vbWVudCBpbnN0YW5jZS5cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQuZHVyYXRpb24uZm9ybWF0ID0gZHVyYXRpb25zRm9ybWF0O1xuICAgICAgICBjb250ZXh0LmR1cmF0aW9uLmZuLmZvcm1hdCA9IGR1cmF0aW9uRm9ybWF0O1xuXG4gICAgICAgIGNvbnRleHQuZHVyYXRpb24uZm4uZm9ybWF0LmRlZmF1bHRzID0ge1xuICAgICAgICAgICAgLy8gTWFueSBvcHRpb25zIGFyZSBkZWZhdWx0ZWQgdG8gYG51bGxgIHRvIGRpc3Rpbmd1aXNoIGJldHdlZW5cbiAgICAgICAgICAgIC8vICdub3Qgc2V0JyBhbmQgJ3NldCB0byBgZmFsc2VgJ1xuXG4gICAgICAgICAgICAvLyB0cmltXG4gICAgICAgICAgICAvLyBDYW4gYmUgYSBzdHJpbmcsIGEgZGVsaW1pdGVkIGxpc3Qgb2Ygc3RyaW5ncywgYW4gYXJyYXkgb2Ygc3RyaW5ncyxcbiAgICAgICAgICAgIC8vIG9yIGEgYm9vbGVhbi5cbiAgICAgICAgICAgIC8vIFwibGFyZ2VcIiAtIHdpbGwgdHJpbSBsYXJnZXN0LW1hZ25pdHVkZSB6ZXJvLXZhbHVlIHRva2VucyB1bnRpbFxuICAgICAgICAgICAgLy8gZmluZGluZyBhIHRva2VuIHdpdGggYSB2YWx1ZSwgYSB0b2tlbiBpZGVudGlmaWVkIGFzICdzdG9wVHJpbScsIG9yXG4gICAgICAgICAgICAvLyB0aGUgZmluYWwgdG9rZW4gb2YgdGhlIGZvcm1hdCBzdHJpbmcuXG4gICAgICAgICAgICAvLyBcInNtYWxsXCIgLSB3aWxsIHRyaW0gc21hbGxlc3QtbWFnbml0dWRlIHplcm8tdmFsdWUgdG9rZW5zIHVudGlsXG4gICAgICAgICAgICAvLyBmaW5kaW5nIGEgdG9rZW4gd2l0aCBhIHZhbHVlLCBhIHRva2VuIGlkZW50aWZpZWQgYXMgJ3N0b3BUcmltJywgb3JcbiAgICAgICAgICAgIC8vIHRoZSBmaW5hbCB0b2tlbiBvZiB0aGUgZm9ybWF0IHN0cmluZy5cbiAgICAgICAgICAgIC8vIFwiYm90aFwiIC0gd2lsbCBleGVjdXRlIFwibGFyZ2VcIiB0cmltIHRoZW4gXCJzbWFsbFwiIHRyaW0uXG4gICAgICAgICAgICAvLyBcIm1pZFwiIC0gd2lsbCB0cmltIGFueSB6ZXJvLXZhbHVlIHRva2VucyB0aGF0IGFyZSBub3QgdGhlIGZpcnN0IG9yXG4gICAgICAgICAgICAvLyBsYXN0IHRva2Vucy4gVXN1YWxseSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggXCJsYXJnZVwiIG9yIFwiYm90aFwiLlxuICAgICAgICAgICAgLy8gZS5nLiBcImxhcmdlIG1pZFwiIG9yIFwiYm90aCBtaWRcIi5cbiAgICAgICAgICAgIC8vIFwiZmluYWxcIiAtIHdpbGwgdHJpbSB0aGUgZmluYWwgdG9rZW4gaWYgaXQgaXMgemVyby12YWx1ZS4gVXNlIHRoaXNcbiAgICAgICAgICAgIC8vIG9wdGlvbiB3aXRoIFwibGFyZ2VcIiBvciBcImJvdGhcIiB0byBvdXRwdXQgYW4gZW1wdHkgc3RyaW5nIHdoZW5cbiAgICAgICAgICAgIC8vIGZvcm1hdHRpbmcgYSB6ZXJvLXZhbHVlIGR1cmF0aW9uLiBlLmcuIFwibGFyZ2UgZmluYWxcIiBvciBcImJvdGggZmluYWxcIi5cbiAgICAgICAgICAgIC8vIFwiYWxsXCIgLSBXaWxsIHRyaW0gYWxsIHplcm8tdmFsdWUgdG9rZW5zLiBTaG9ydGhhbmQgZm9yIFwiYm90aCBtaWQgZmluYWxcIi5cbiAgICAgICAgICAgIC8vIFwibGVmdFwiIC0gbWFwcyB0byBcImxhcmdlXCIgdG8gc3VwcG9ydCBwbHVnaW4ncyB2ZXJzaW9uIDEgQVBJLlxuICAgICAgICAgICAgLy8gXCJyaWdodFwiIC0gbWFwcyB0byBcImxhcmdlXCIgdG8gc3VwcG9ydCBwbHVnaW4ncyB2ZXJzaW9uIDEgQVBJLlxuICAgICAgICAgICAgLy8gYGZhbHNlYCAtIHRlbXBsYXRlIHRva2VucyBhcmUgbm90IHRyaW1tZWQuXG4gICAgICAgICAgICAvLyBgdHJ1ZWAgLSB0cmVhdGVkIGFzIFwibGFyZ2VcIi5cbiAgICAgICAgICAgIC8vIGBudWxsYCAtIHRyZWF0ZWQgYXMgXCJsYXJnZVwiLlxuICAgICAgICAgICAgdHJpbTogbnVsbCxcblxuICAgICAgICAgICAgLy8gc3RvcFRyaW1cbiAgICAgICAgICAgIC8vIEEgbW9tZW50IHRva2VuIHN0cmluZywgYSBkZWxpbWl0ZWQgc2V0IG9mIG1vbWVudCB0b2tlbiBzdHJpbmdzLFxuICAgICAgICAgICAgLy8gb3IgYW4gYXJyYXkgb2YgbW9tZW50IHRva2VuIHN0cmluZ3MuIFRyaW1taW5nIHdpbGwgc3RvcCB3aGVuIGEgdG9rZW5cbiAgICAgICAgICAgIC8vIGxpc3RlZCBpbiB0aGlzIG9wdGlvbiBpcyByZWFjaGVkLiBBIFwiKlwiIGNoYXJhY3RlciBpbiB0aGUgZm9ybWF0XG4gICAgICAgICAgICAvLyB0ZW1wbGF0ZSBzdHJpbmcgd2lsbCBhbHNvIG1hcmsgYSBtb21lbnQgdG9rZW4gYXMgc3RvcFRyaW0uXG4gICAgICAgICAgICAvLyBlLmcuIFwiZCBbZGF5c10gKmg6bW06c3NcIiB3aWxsIGFsd2F5cyBzdG9wIHRyaW1taW5nIGF0IHRoZSAnaG91cnMnIHRva2VuLlxuICAgICAgICAgICAgc3RvcFRyaW06IG51bGwsXG5cbiAgICAgICAgICAgIC8vIGxhcmdlc3RcbiAgICAgICAgICAgIC8vIFNldCB0byBhIHBvc2l0aXZlIGludGVnZXIgdG8gb3V0cHV0IG9ubHkgdGhlIFwiblwiIGxhcmdlc3QtbWFnbml0dWRlXG4gICAgICAgICAgICAvLyBtb21lbnQgdG9rZW5zIHRoYXQgaGF2ZSBhIHZhbHVlLiBBbGwgbGVzc2VyLW1hZ25pdHVkZSBtb21lbnQgdG9rZW5zXG4gICAgICAgICAgICAvLyB3aWxsIGJlIGlnbm9yZWQuIFRoaXMgb3B0aW9uIHRha2VzIGVmZmVjdCBldmVuIGlmIGB0cmltYCBpcyBzZXRcbiAgICAgICAgICAgIC8vIHRvIGBmYWxzZWAuXG4gICAgICAgICAgICBsYXJnZXN0OiBudWxsLFxuXG4gICAgICAgICAgICAvLyBtYXhWYWx1ZVxuICAgICAgICAgICAgLy8gVXNlIGBtYXhWYWx1ZWAgdG8gcmVuZGVyIGdlbmVyYWxpemVkIG91dHB1dCBmb3IgbGFyZ2UgZHVyYXRpb24gdmFsdWVzLFxuICAgICAgICAgICAgLy8gZS5nLiBgXCI+IDYwIGRheXNcImAuIGBtYXhWYWx1ZWAgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIgYW5kIGlzXG4gICAgICAgICAgICAvLy8gYXBwbGllZCB0byB0aGUgZ3JlYXRlc3QtbWFnbml0dWRlIG1vbWVudCB0b2tlbiBpbiB0aGUgZm9ybWF0IHRlbXBsYXRlLlxuICAgICAgICAgICAgbWF4VmFsdWU6IG51bGwsXG5cbiAgICAgICAgICAgIC8vIG1pblZhbHVlXG4gICAgICAgICAgICAvLyBVc2UgYG1pblZhbHVlYCB0byByZW5kZXIgZ2VuZXJhbGl6ZWQgb3V0cHV0IGZvciBzbWFsbCBkdXJhdGlvbiB2YWx1ZXMsXG4gICAgICAgICAgICAvLyBlLmcuIGBcIjwgNSBtaW51dGVzXCJgLiBgbWluVmFsdWVgIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyIGFuZCBpc1xuICAgICAgICAgICAgLy8gYXBwbGllZCB0byB0aGUgbGVhc3QtbWFnbml0dWRlIG1vbWVudCB0b2tlbiBpbiB0aGUgZm9ybWF0IHRlbXBsYXRlLlxuICAgICAgICAgICAgbWluVmFsdWU6IG51bGwsXG5cbiAgICAgICAgICAgIC8vIHByZWNpc2lvblxuICAgICAgICAgICAgLy8gSWYgYSBwb3NpdGl2ZSBpbnRlZ2VyLCBudW1iZXIgb2YgZGVjaW1hbCBmcmFjdGlvbiBkaWdpdHMgdG8gcmVuZGVyLlxuICAgICAgICAgICAgLy8gSWYgYSBuZWdhdGl2ZSBpbnRlZ2VyLCBudW1iZXIgb2YgaW50ZWdlciBwbGFjZSBkaWdpdHMgdG8gdHJ1bmNhdGUgdG8gMC5cbiAgICAgICAgICAgIC8vIElmIGB1c2VTaWduaWZpY2FudERpZ2l0c2AgaXMgc2V0IHRvIGB0cnVlYCBhbmQgYHByZWNpc2lvbmAgaXMgYSBwb3NpdGl2ZVxuICAgICAgICAgICAgLy8gaW50ZWdlciwgc2V0cyB0aGUgbWF4aW11bSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzIHVzZWQgaW4gdGhlXG4gICAgICAgICAgICAvLyBmb3JtYXR0ZWQgb3V0cHV0LlxuICAgICAgICAgICAgcHJlY2lzaW9uOiAwLFxuXG4gICAgICAgICAgICAvLyB0cnVuY1xuICAgICAgICAgICAgLy8gRGVmYXVsdCBiZWhhdmlvciByb3VuZHMgZmluYWwgdG9rZW4gdmFsdWUuIFNldCB0byBgdHJ1ZWAgdG9cbiAgICAgICAgICAgIC8vIHRydW5jYXRlIGZpbmFsIHRva2VuIHZhbHVlLCB3aGljaCB3YXMgdGhlIGRlZmF1bHQgYmVoYXZpb3IgaW5cbiAgICAgICAgICAgIC8vIHZlcnNpb24gMSBvZiB0aGlzIHBsdWdpbi5cbiAgICAgICAgICAgIHRydW5jOiBmYWxzZSxcblxuICAgICAgICAgICAgLy8gZm9yY2VMZW5ndGhcbiAgICAgICAgICAgIC8vIEZvcmNlIGZpcnN0IG1vbWVudCB0b2tlbiB3aXRoIGEgdmFsdWUgdG8gcmVuZGVyIGF0IGZ1bGwgbGVuZ3RoXG4gICAgICAgICAgICAvLyBldmVuIHdoZW4gdGVtcGxhdGUgaXMgdHJpbW1lZCBhbmQgZmlyc3QgbW9tZW50IHRva2VuIGhhcyBsZW5ndGggb2YgMS5cbiAgICAgICAgICAgIGZvcmNlTGVuZ3RoOiBudWxsLFxuXG4gICAgICAgICAgICAvLyB1c2VyTG9jYWxlXG4gICAgICAgICAgICAvLyBGb3JtYXR0ZWQgbnVtZXJpY2FsIG91dHB1dCBpcyByZW5kZXJlZCB1c2luZyBgdG9Mb2NhbGVTdHJpbmdgXG4gICAgICAgICAgICAvLyBhbmQgdGhlIGxvY2FsZSBvZiB0aGUgdXNlcidzIGVudmlyb25tZW50LiBTZXQgdGhpcyBvcHRpb24gdG8gcmVuZGVyXG4gICAgICAgICAgICAvLyBudW1lcmljYWwgb3V0cHV0IHVzaW5nIGEgZGlmZmVyZW50IGxvY2FsZS4gVW5pdCBuYW1lcyBhcmUgcmVuZGVyZWRcbiAgICAgICAgICAgIC8vIGFuZCBkZXRlY3RlZCB1c2luZyB0aGUgbG9jYWxlIHNldCBpbiBtb21lbnQuanMsIHdoaWNoIGNhbiBiZSBkaWZmZXJlbnRcbiAgICAgICAgICAgIC8vIGZyb20gdGhlIGxvY2FsZSBvZiB1c2VyJ3MgZW52aXJvbm1lbnQuXG4gICAgICAgICAgICB1c2VyTG9jYWxlOiBudWxsLFxuXG4gICAgICAgICAgICAvLyB1c2VQbHVyYWxcbiAgICAgICAgICAgIC8vIFdpbGwgYXV0b21hdGljYWxseSBzaW5ndWxhcml6ZSBvciBwbHVyYWxpemUgdW5pdCBuYW1lcyB3aGVuIHRoZXlcbiAgICAgICAgICAgIC8vIGFwcGVhciBpbiB0aGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggZWFjaCBtb21lbnQgdG9rZW4uIFN0YW5kYXJkIGFuZFxuICAgICAgICAgICAgLy8gc2hvcnQgdW5pdCBsYWJlbHMgYXJlIHNpbmd1bGFyaXplZCBhbmQgcGx1cmFsaXplZCwgYmFzZWQgb24gbG9jYWxlLlxuICAgICAgICAgICAgLy8gZS5nLiBpbiBlbmdsaXNoLCBcIjEgc2Vjb25kXCIgb3IgXCIxIHNlY1wiIHdvdWxkIGJlIHJlbmRlcmVkIGluc3RlYWRcbiAgICAgICAgICAgIC8vIG9mIFwiMSBzZWNvbmRzXCIgb3IgXCIxIHNlY3NcIi4gVGhlIGRlZmF1bHQgcGx1cmFsaXphdGlvbiBmdW5jdGlvblxuICAgICAgICAgICAgLy8gcmVuZGVycyBhIHBsdXJhbCBsYWJlbCBmb3IgYSB2YWx1ZSB3aXRoIGRlY2ltYWwgcHJlY2lzaW9uLlxuICAgICAgICAgICAgLy8gZS5nLiBcIjEuMCBzZWNvbmRzXCIgaXMgbmV2ZXIgcmVuZGVyZWQgYXMgXCIxLjAgc2Vjb25kXCIuXG4gICAgICAgICAgICAvLyBMYWJlbCB0eXBlcyBhbmQgcGx1cmFsaXphdGlvbiBmdW5jdGlvbiBhcmUgY29uZmlndXJhYmxlIGluIHRoZVxuICAgICAgICAgICAgLy8gbG9jYWxlRGF0YSBleHRlbnNpb25zLlxuICAgICAgICAgICAgdXNlUGx1cmFsOiB0cnVlLFxuXG4gICAgICAgICAgICAvLyB1c2VMZWZ0VW5pdHNcbiAgICAgICAgICAgIC8vIFRoZSB0ZXh0IHRvIHRoZSByaWdodCBvZiBlYWNoIG1vbWVudCB0b2tlbiBpbiBhIGZvcm1hdCBzdHJpbmdcbiAgICAgICAgICAgIC8vIGlzIHRyZWF0ZWQgYXMgdGhhdCB0b2tlbidzIHVuaXRzIGZvciB0aGUgcHVycG9zZXMgb2YgdHJpbW1pbmcsXG4gICAgICAgICAgICAvLyBzaW5ndWxhcml6aW5nLCBhbmQgYXV0by1sb2NhbGl6aW5nLlxuICAgICAgICAgICAgLy8gZS5nLiBcImggW2hvdXJzXSwgbSBbbWludXRlc10sIHMgW3NlY29uZHNdXCIuXG4gICAgICAgICAgICAvLyBUbyBwcm9wZXJseSBzaW5ndWxhcml6ZSBvciBsb2NhbGl6ZSBhIGZvcm1hdCBzdHJpbmcgc3VjaCBhc1xuICAgICAgICAgICAgLy8gXCJbaG91cnNdIGgsIFttaW51dGVzXSBtLCBbc2Vjb25kc10gc1wiLCB3aGVyZSB0aGUgdW5pdHMgYXBwZWFyXG4gICAgICAgICAgICAvLyB0byB0aGUgbGVmdCBvZiBlYWNoIG1vbWVudCB0b2tlbiwgc2V0IHVzZUxlZnRVbml0cyB0byBgdHJ1ZWAuXG4gICAgICAgICAgICAvLyBUaGlzIHBsdWdpbiBpcyBub3QgdGVzdGVkIGluIHRoZSBjb250ZXh0IG9mIHJ0bCB0ZXh0LlxuICAgICAgICAgICAgdXNlTGVmdFVuaXRzOiBmYWxzZSxcblxuICAgICAgICAgICAgLy8gdXNlR3JvdXBpbmdcbiAgICAgICAgICAgIC8vIEVuYWJsZXMgbG9jYWxlLWJhc2VkIGRpZ2l0IGdyb3VwaW5nIGluIHRoZSBmb3JtYXR0ZWQgb3V0cHV0LiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTnVtYmVyL3RvTG9jYWxlU3RyaW5nXG4gICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcblxuICAgICAgICAgICAgLy8gdXNlU2lnbmlmaWNhbnREaWdpdHNcbiAgICAgICAgICAgIC8vIFRyZWF0IHRoZSBgcHJlY2lzaW9uYCBvcHRpb24gYXMgdGhlIG1heGltdW0gc2lnbmlmaWNhbnQgZGlnaXRzXG4gICAgICAgICAgICAvLyB0byBiZSByZW5kZXJlZC4gUHJlY2lzaW9uIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyLiBTaWduaWZpY2FudFxuICAgICAgICAgICAgLy8gZGlnaXRzIGV4dGVuZCBhY3Jvc3MgdW5pdCB0eXBlcyxcbiAgICAgICAgICAgIC8vIGUuZy4gXCI2IGhvdXJzIDM3LjUgbWludXRlc1wiIHJlcHJlc2VudHMgNCBzaWduaWZpY2FudCBkaWdpdHMuXG4gICAgICAgICAgICAvLyBFbmFibGluZyB0aGlzIG9wdGlvbiBjYXVzZXMgdG9rZW4gbGVuZ3RoIHRvIGJlIGlnbm9yZWQuIFNlZSAgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTnVtYmVyL3RvTG9jYWxlU3RyaW5nXG4gICAgICAgICAgICB1c2VTaWduaWZpY2FudERpZ2l0czogZmFsc2UsXG5cbiAgICAgICAgICAgIC8vIHRlbXBsYXRlXG4gICAgICAgICAgICAvLyBUaGUgdGVtcGxhdGUgc3RyaW5nIHVzZWQgdG8gZm9ybWF0IHRoZSBkdXJhdGlvbi4gTWF5IGJlIGEgZnVuY3Rpb25cbiAgICAgICAgICAgIC8vIG9yIGEgc3RyaW5nLiBUZW1wbGF0ZSBmdW5jdGlvbnMgYXJlIGV4ZWN1dGVkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nXG4gICAgICAgICAgICAvLyBvZiB0aGUgc2V0dGluZ3Mgb2JqZWN0IHNvIHRoYXQgdGVtcGxhdGUgc3RyaW5ncyBtYXkgYmUgZHluYW1pY2FsbHlcbiAgICAgICAgICAgIC8vIGdlbmVyYXRlZCBiYXNlZCBvbiB0aGUgZHVyYXRpb24gb2JqZWN0IChhY2Nlc3NpYmxlIHZpYSBgdGhpcy5kdXJhdGlvbmApXG4gICAgICAgICAgICAvLyBvciBhbnkgb2YgdGhlIG90aGVyIHNldHRpbmdzLiBMZWFkaW5nIGFuZCB0cmFpbGluZyBzcGFjZSwgY29tbWEsXG4gICAgICAgICAgICAvLyBwZXJpb2QsIGFuZCBjb2xvbiBjaGFyYWN0ZXJzIGFyZSB0cmltbWVkIGZyb20gdGhlIHJlc3VsdGluZyBzdHJpbmcuXG4gICAgICAgICAgICB0ZW1wbGF0ZTogZGVmYXVsdEZvcm1hdFRlbXBsYXRlLFxuXG4gICAgICAgICAgICAvLyB1c2VUb0xvY2FsZVN0cmluZ1xuICAgICAgICAgICAgLy8gU2V0IHRoaXMgb3B0aW9uIHRvIGBmYWxzZWAgdG8gaWdub3JlIHRoZSBgdG9Mb2NhbGVTdHJpbmdgIGZlYXR1cmVcbiAgICAgICAgICAgIC8vIHRlc3QgYW5kIGZvcmNlIHRoZSB1c2Ugb2YgdGhlIGBmb3JtYXROdW1iZXJgIGZhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgICAgICAvLyBpbmNsdWRlZCBpbiB0aGlzIHBsdWdpbi5cbiAgICAgICAgICAgIHVzZVRvTG9jYWxlU3RyaW5nOiB0cnVlLFxuXG4gICAgICAgICAgICAvLyBmb3JtYXROdW1iZXIgZmFsbGJhY2sgb3B0aW9ucy5cbiAgICAgICAgICAgIC8vIFdoZW4gYHRvTG9jYWxlU3RyaW5nYCBpcyBkZXRlY3RlZCBhbmQgcGFzc2VzIHRoZSBmZWF0dXJlIHRlc3QsIHRoZVxuICAgICAgICAgICAgLy8gZm9sbG93aW5nIG9wdGlvbnMgd2lsbCBoYXZlIG5vIGVmZmVjdDogYHRvTG9jYWxlU3RyaW5nYCB3aWxsIGJlIHVzZWRcbiAgICAgICAgICAgIC8vIGZvciBmb3JtYXR0aW5nIGFuZCB0aGUgZ3JvdXBpbmcgc2VwYXJhdG9yLCBkZWNpbWFsIHNlcGFyYXRvciwgYW5kXG4gICAgICAgICAgICAvLyBpbnRlZ2VyIGRpZ2l0IGdyb3VwaW5nIHdpbGwgYmUgZGV0ZXJtaW5lZCBieSB0aGUgdXNlciBsb2NhbGUuXG5cbiAgICAgICAgICAgIC8vIGdyb3VwaW5nU2VwYXJhdG9yXG4gICAgICAgICAgICAvLyBUaGUgaW50ZWdlciBkaWdpdCBncm91cGluZyBzZXBhcmF0b3IgdXNlZCB3aGVuIHVzaW5nIHRoZSBmYWxsYmFja1xuICAgICAgICAgICAgLy8gZm9ybWF0TnVtYmVyIGZ1bmN0aW9uLlxuICAgICAgICAgICAgZ3JvdXBpbmdTZXBhcmF0b3I6IFwiLFwiLFxuXG4gICAgICAgICAgICAvLyBkZWNpbWFsU2VwYXJhdG9yXG4gICAgICAgICAgICAvLyBUaGUgZGVjaW1hbCBzZXBhcmF0b3IgdXNlZCB3aGVuIHVzaW5nIHRoZSBmYWxsYmFjayBmb3JtYXROdW1iZXJcbiAgICAgICAgICAgIC8vIGZ1bmN0aW9uLlxuICAgICAgICAgICAgZGVjaW1hbFNlcGFyYXRvcjogXCIuXCIsXG5cbiAgICAgICAgICAgIC8vIGdyb3VwaW5nXG4gICAgICAgICAgICAvLyBUaGUgaW50ZWdlciBkaWdpdCBncm91cGluZyB1c2VkIHdoZW4gdXNpbmcgdGhlIGZhbGxiYWNrIGZvcm1hdE51bWJlclxuICAgICAgICAgICAgLy8gZnVuY3Rpb24uIE11c3QgYmUgYW4gYXJyYXkuIFRoZSBkZWZhdWx0IHZhbHVlIG9mIGBbM11gIGdpdmVzIHRoZVxuICAgICAgICAgICAgLy8gc3RhbmRhcmQgMy1kaWdpdCB0aG91c2FuZC9taWxsaW9uL2JpbGxpb24gZGlnaXQgZ3JvdXBpbmdzIGZvciB0aGVcbiAgICAgICAgICAgIC8vIFwiZW5cIiBsb2NhbGUuIFNldHRpbmcgdGhpcyBvcHRpb24gdG8gYFszLCAyXWAgd291bGQgZ2VuZXJhdGUgdGhlXG4gICAgICAgICAgICAvLyB0aG91c2FuZC9sYWtoL2Nyb3JlIGRpZ2l0IGdyb3VwaW5ncyB1c2VkIGluIHRoZSBcImVuLUlOXCIgbG9jYWxlLlxuICAgICAgICAgICAgZ3JvdXBpbmc6IFszXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnRleHQudXBkYXRlTG9jYWxlKCdlbicsIGVuZ0xvY2FsZSk7XG4gICAgfVxuXG4gICAgLy8gUnVuIGZlYXR1cmUgdGVzdHMgZm9yIGBOdW1iZXIjdG9Mb2NhbGVTdHJpbmdgLlxuICAgIHZhciB0b0xvY2FsZVN0cmluZ0Zvcm1hdHRlciA9IGZ1bmN0aW9uKG51bWJlciwgbG9jYWxlLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBudW1iZXIudG9Mb2NhbGVTdHJpbmcobG9jYWxlLCBvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgdG9Mb2NhbGVTdHJpbmdXb3JrcyA9IHRvTG9jYWxlU3RyaW5nU3VwcG9ydHNMb2NhbGVzKCkgJiYgZmVhdHVyZVRlc3RGb3JtYXR0ZXIodG9Mb2NhbGVTdHJpbmdGb3JtYXR0ZXIpO1xuICAgIHRvTG9jYWxlU3RyaW5nUm91bmRpbmdXb3JrcyA9IHRvTG9jYWxlU3RyaW5nV29ya3MgJiYgZmVhdHVyZVRlc3RGb3JtYXR0ZXJSb3VuZGluZyh0b0xvY2FsZVN0cmluZ0Zvcm1hdHRlcik7XG5cbiAgICAvLyBSdW4gZmVhdHVyZSB0ZXN0cyBmb3IgYEludGwuTnVtYmVyRm9ybWF0I2Zvcm1hdGAuXG4gICAgdmFyIGludGxOdW1iZXJGb3JtYXRGb3JtYXR0ZXIgPSBmdW5jdGlvbihudW1iZXIsIGxvY2FsZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93ICYmIHdpbmRvdy5JbnRsICYmIHdpbmRvdy5JbnRsLk51bWJlckZvcm1hdCkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5JbnRsLk51bWJlckZvcm1hdChsb2NhbGUsIG9wdGlvbnMpLmZvcm1hdChudW1iZXIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGludGxOdW1iZXJGb3JtYXRXb3JrcyA9IGZlYXR1cmVUZXN0Rm9ybWF0dGVyKGludGxOdW1iZXJGb3JtYXRGb3JtYXR0ZXIpO1xuICAgIGludGxOdW1iZXJGb3JtYXRSb3VuZGluZ1dvcmtzID0gaW50bE51bWJlckZvcm1hdFdvcmtzICYmIGZlYXR1cmVUZXN0Rm9ybWF0dGVyUm91bmRpbmcoaW50bE51bWJlckZvcm1hdEZvcm1hdHRlcik7XG5cbiAgICAvLyBJbml0aWFsaXplIGR1cmF0aW9uIGZvcm1hdCBvbiB0aGUgZ2xvYmFsIG1vbWVudCBpbnN0YW5jZS5cbiAgICBpbml0KG1vbWVudCk7XG5cbiAgICAvLyBSZXR1cm4gdGhlIGluaXQgZnVuY3Rpb24gc28gdGhhdCBkdXJhdGlvbiBmb3JtYXQgY2FuIGJlXG4gICAgLy8gaW5pdGlhbGl6ZWQgb24gb3RoZXIgbW9tZW50IGluc3RhbmNlcy5cbiAgICByZXR1cm4gaW5pdDtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAoX19ERVZfXykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMSA/IGxlbiAtIDEgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAxOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDFdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkobnVsbCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJoZWxwZXJzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcImkxOG5cIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsaWRhdG9yc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIndwXCJdW1wiaXNTaGFsbG93RXF1YWxcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJsb2Rhc2hcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJtb21lbnRcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmVuZG9yXCJdW1wibW9tZW50XCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
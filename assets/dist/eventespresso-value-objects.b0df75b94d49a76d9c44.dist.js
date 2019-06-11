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
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_6__);





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
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Currency);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "code", '');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "singularLabel", '');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "pluralLabel", '');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "sign", '');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "signB4", true);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "decimalPlaces", 2);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "decimalMark", '.');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "thousandsSeparator", ',');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "subunits", 100);

    Currency.validateCurrencyConfig(currencyConfig);
    this.code = currencyConfig.code;
    this.singularLabel = currencyConfig.singularLabel || '';
    this.pluralLabel = currencyConfig.pluralLabel || '';
    this.sign = currencyConfig.sign;
    this.signB4 = Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isUndefined"])(currencyConfig.signB4) ? this.signB4 : currencyConfig.signB4;
    this.decimalPlaces = Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isUndefined"])(currencyConfig.decimalPlaces) ? this.decimalPlaces : currencyConfig.decimalPlaces;
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


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Currency, [{
    key: "toAccountingSettings",
    value: function toAccountingSettings() {
      var decimalInfo = {
        decimal: this.decimalMark,
        thousand: this.thousandsSeparator,
        precision: this.decimalPlaces
      };
      return {
        currency: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({
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

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Currency, "validateCurrencyConfig", function (config) {
  if (Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isEmpty"])(config)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_5__["Exception"]('The configuration object provided to Currency must not' + ' be empty');
  }

  if (!config.code || !Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isString"])(config.code)) {
    throw new TypeError('The configuration object provided to Currency must have ' + 'a "code" property that is a string.');
  }

  if (!config.sign || !Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isString"])(config.sign)) {
    throw new TypeError('The configuration object provided to Currency must have a ' + '"sign" property that is a string.');
  }

  if (config.singularLabel && !Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isString"])(config.singularLabel)) {
    throw new TypeError('The singularLabel property on the configuration object ' + 'must be a string primitive.');
  }

  if (config.pluralLabel && !Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isString"])(config.pluralLabel)) {
    throw new TypeError('The pluralLabel property on the configuration object ' + 'must be a string primitive.');
  }

  if (config.signB4 && !Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isBoolean"])(config.signB4)) {
    throw new TypeError('The signB4 property on the configuration object ' + 'must be a boolean primitive.');
  }

  if (config.decimalPlaces && !Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isNumber"])(config.decimalPlaces)) {
    throw new TypeError('The decimalPlaces property on the configuration object ' + 'must be a number primitive');
  }

  if (config.decimalMark && !Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isString"])(config.decimalMark)) {
    throw new TypeError('The decimalMark property on the configuration object ' + 'must be a string primitive.');
  }

  if (config.thousandsSeparator && !Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isString"])(config.thousandsSeparator)) {
    throw new TypeError('The thousandsSeparator property on the configuration object ' + 'must be a string primitive.');
  }

  if (config.subunits && !Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isNumber"])(config.subunits)) {
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
    warning__WEBPACK_IMPORTED_MODULE_6___default()(false, 'The Site Currency object could not be created because ' + 'of this error: ' + e.message);
  }

  return currency;
};
/* harmony default export */ __webpack_exports__["default"] = (SiteCurrency(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_5__["CURRENCY_CONFIG"]));

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
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assertions */ "./assets/src/vo/date-time/assertions.js");
/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./duration */ "./assets/src/vo/date-time/duration.js");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./defaults */ "./assets/src/vo/date-time/defaults.js");




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
  normalizeUnitValue: Symbol('DateTimeMethodNormalizeUnitValue')
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
    var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_TIMEZONE_STRING"];
    var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_VALID_LOCALE"];

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, DateTime);

    if (iso8601DateString !== '') {
      DateTime.assertISO8601IsValid(iso8601DateString);
    }

    DateTime.assertLocaleIsValid(locale);

    if (timezone === null) {
      this[privateProperties.datetime] = iso8601DateString === '' ? moment_timezone__WEBPACK_IMPORTED_MODULE_3___default.a.utc().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_3___default()(iso8601DateString).utcOffset(iso8601DateString).locale(locale);
    } else if (timezone === DateTime.TIMEZONE_LOCAL) {
      this[privateProperties.datetime] = iso8601DateString === '' ? moment_timezone__WEBPACK_IMPORTED_MODULE_3___default()().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_3___default()(iso8601DateString).locale(locale);
    } else {
      DateTime.assertTimezoneIsValid(timezone);
      this[privateProperties.datetime] = iso8601DateString === '' ? moment_timezone__WEBPACK_IMPORTED_MODULE_3___default()().tz(timezone).locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_3___default.a.tz(iso8601DateString, timezone).locale(locale);
    }

    this[privateMethods.createGettersAndSetters]();
    Object.freeze(this);
  }
  /**
   * Indicates if the given locale is a valid locale.
   * @param {string} locale
   * @return {boolean} true means it is valid
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(DateTime, [{
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
            var methodName = DateTime[privateMethods.normalizeUnitName](unitName);
            var unitValue = this[privateProperties.datetime][methodName]();
            return DateTime[privateMethods.normalizeUnitValue](unitName, unitValue, false);
          }
        }); // creates a fluent setter for the value.

        Object.defineProperty(_this, 'set' + Object(lodash__WEBPACK_IMPORTED_MODULE_4__["capitalize"])(unitName), {
          get: function get() {
            var _this2 = this;

            return function (value) {
              return _this2.set(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, unitName, value));
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
     * @return {DateTime} A new instance of DateTime.
     */

  }, {
    key: "set",
    value: function set() {
      var setObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      setObject = DateTime[privateMethods.normalizeUnitObject](setObject);
      return new DateTime(this[privateProperties.datetime].clone().set(setObject).toISOString(), this.timezone, this.locale);
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
     * @return {DateTime} Returns a new instance of DateTime
     */
    value: function setTimezone(timezone) {
      DateTime.assertTimezoneIsValid(timezone);
      return new DateTime(this[privateProperties.datetime].toISOString(), timezone, this.locale);
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
     * @return {DateTime} returns a new instance of DateTime
     */
    value: function setOffset(offset) {
      DateTime.assertIsOffset(offset);
      return DateTime.fromMoment(this[privateProperties.datetime].clone().utcOffset(offset));
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
     * @return {DateTime} a new instance of DateTime equivalent to this one but
     * with different locale.
     */
    value: function setLocale(locale) {
      DateTime.assertLocaleIsValid(locale);
      return DateTime.fromMoment(this[privateProperties.datetime].clone().locale(locale));
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
      DateTime.assertIsDateTime(otherDateTime);
      return new _duration__WEBPACK_IMPORTED_MODULE_8__["default"](moment_timezone__WEBPACK_IMPORTED_MODULE_3___default.a.duration(this[privateProperties.datetime].diff(otherDateTime[privateProperties.datetime])));
    }
    /**
     * Returns the difference between this DateTime and "now" as a Duration.
     * @return {Duration} An instance of Duration representing the difference
     * between this DateTime and "now"
     */

  }, {
    key: "diffNow",
    value: function diffNow() {
      return new _duration__WEBPACK_IMPORTED_MODULE_8__["default"](moment_timezone__WEBPACK_IMPORTED_MODULE_3___default.a.duration(this[privateProperties.datetime].diff(moment_timezone__WEBPACK_IMPORTED_MODULE_3___default()())));
    }
    /**
     * Set the value of this DateTime to the end (i.e. the last millisecond) of
     * a unit of time.
     * @param {string} unit
     * @return {DateTime} Returns a new DateTime instance.
     */

  }, {
    key: "endOf",
    value: function endOf(unit) {
      return DateTime.fromMoment(this[privateProperties.datetime].clone().endOf(unit));
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
      DateTime.assertIsDateTime(otherDateTime);
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
      DateTime.assertIsDateTime(otherDateTime);
      return this[privateProperties.datetime].isSame(otherDateTime[privateProperties.datetime], unit);
    }
    /**
     * Subtract a period of time (represented by a Duration) from this DateTime
     * and return the resulting DateTime.
     *
     * @param {Duration} duration
     * @return {DateTime} A new instance of DateTime for the new date and time.
     */

  }, {
    key: "minus",
    value: function minus(duration) {
      _duration__WEBPACK_IMPORTED_MODULE_8__["default"].assertIsValidDuration(duration);
      return DateTime.fromMoment(this[privateProperties.datetime].clone().subtract(duration.toObject()));
    }
    /**
     * Add a period of time (represented by a Duration) to this DateTime and
     * return the resulting DateTime
     * @param {Duration} duration
     * @return {DateTime} A new instance of DateTime for the new date and time.
     */

  }, {
    key: "plus",
    value: function plus(duration) {
      _duration__WEBPACK_IMPORTED_MODULE_8__["default"].assertIsValidDuration(duration);
      return DateTime.fromMoment(this[privateProperties.datetime].clone().add(duration.toObject()));
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
     * @return {DateTime} A new instance of DateTime
     */

  }, {
    key: "startOf",
    value: function startOf(unit) {
      return DateTime.fromMoment(this[privateProperties.datetime].clone().startOf(unit));
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
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_FORMAT"];
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
     * @return {DateTime} a new instance of the DateTime
     */

  }, {
    key: "toLocal",
    value: function toLocal() {
      return DateTime.fromMoment(this[privateProperties.datetime].clone().local());
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
      var datetime = this[privateProperties.datetime].toObject();
      return Object(lodash__WEBPACK_IMPORTED_MODULE_4__["reduce"])(datetime, function (result, value, key) {
        key = DateTime[privateMethods.normalizeUnitName](key);
        result[key] = DateTime[privateMethods.normalizeUnitValue](key, value, false);
        return result;
      }, {});
    }
    /**
     * Converts the DateTime's timezone to UTC.
     *
     * @return {DateTime} A new instance of DateTime
     */

  }, {
    key: "toUTC",
    value: function toUTC() {
      return DateTime.fromMoment(this[privateProperties.datetime].clone().utc());
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
      return _assertions__WEBPACK_IMPORTED_MODULE_7__["validateLocale"](locale);
    }
    /**
     * Asserts if the given locale is valid and throws an error if not.
     * @param {string} locale
     * @throws InvalidLocale
     */

  }, {
    key: "assertLocaleIsValid",
    value: function assertLocaleIsValid(locale) {
      _assertions__WEBPACK_IMPORTED_MODULE_7__["assertLocaleIsValid"](locale);
    }
    /**
     * Indicates if the given ISO8601 string is valid.
     * @param {string} dateTimeString
     * @return {boolean} true means it is valid.
     */

  }, {
    key: "validateISO8601",
    value: function validateISO8601(dateTimeString) {
      return _assertions__WEBPACK_IMPORTED_MODULE_7__["validateISO8601"](dateTimeString);
    }
    /**
     * Asserts if the given string is a valid ISO 8601 string.
     * @param {string} dateTimeString
     * @throws InvalidISO8601String
     */

  }, {
    key: "assertISO8601IsValid",
    value: function assertISO8601IsValid(dateTimeString) {
      _assertions__WEBPACK_IMPORTED_MODULE_7__["assertISO8601IsValid"](dateTimeString);
    }
    /**
     * Indicates if the given string is a valid timezone
     * @param {string} timezone
     * @return {boolean} true means it is valid.
     */

  }, {
    key: "validateTimezone",
    value: function validateTimezone(timezone) {
      return _assertions__WEBPACK_IMPORTED_MODULE_7__["validateTimezone"](timezone);
    }
    /**
     * Asserts whether the given string is a valid timezone string.
     * @param {string} timezone
     * @throws InvalidTimezone
     */

  }, {
    key: "assertTimezoneIsValid",
    value: function assertTimezoneIsValid(timezone) {
      _assertions__WEBPACK_IMPORTED_MODULE_7__["assertTimezoneIsValid"](timezone);
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
      return _assertions__WEBPACK_IMPORTED_MODULE_7__["validateIsOffset"](offset);
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
      _assertions__WEBPACK_IMPORTED_MODULE_7__["assertIsOffset"](offset);
    }
    /**
     * Indicates whether the provided value is an instance of DateTime
     * @param {DateTime} datetime
     * @return {boolean} returns true if it is an instance of DateTime
     */

  }, {
    key: "validateIsDateTime",
    value: function validateIsDateTime(datetime) {
      return Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__["instanceOf"])(datetime, 'DateTime') || Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__["instanceOf"])(datetime, 'ServerDateTime');
    }
    /**
     * Asserts whether the provided value is an instance of DateTime
     * @param {DateTime} datetime
     * @throws TypeError
     */

  }, {
    key: "assertIsDateTime",
    value: function assertIsDateTime(datetime) {
      if (!DateTime.validateIsDateTime(datetime)) {
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
      return _assertions__WEBPACK_IMPORTED_MODULE_7__["validateIsDate"](date);
    }
    /**
     * Asserts whether the given value is an instance of Date.
     * @param {Date} date
     * @throws TypeError
     */

  }, {
    key: "assertIsDate",
    value: function assertIsDate(date) {
      _assertions__WEBPACK_IMPORTED_MODULE_7__["assertIsDate"](date);
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
      return DateTime.validateIsDateTime(datetime) && datetime.isValid();
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
      if (!DateTime.isValid(datetime)) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_6__["InvalidDateTime"](datetime);
      }
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
      for (var _len = arguments.length, datetimes = new Array(_len), _key = 0; _key < _len; _key++) {
        datetimes[_key] = arguments[_key];
      }

      return datetimes.map(function (datetime) {
        DateTime.assertIsDateTime(datetime);
        return datetime[privateProperties.datetime];
      });
    }
    /**
     * Given an indefinite number of DateTimes as arguments, this will return a
     * new DateTime that represents the latest point in time.
     * @param {...DateTime} datetimes
     * @return {DateTime} A new DateTime representing the latest point of time.
     */

  }, {
    key: "max",
    value: function max() {
      return DateTime.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_3___default.a.max(DateTime[privateMethods.extractMomentsFromDateTimes].apply(DateTime, arguments)));
    }
    /**
     * Given an indefinite number of DateTimes as arguments, this will return a
     * new DateTime that represents the earliest point in time.
     * @param {...DateTime} datetimes
     * @return {DateTime} A new DateTime representing the earliest point in
     * time.
     */

  }, {
    key: "min",
    value: function min() {
      return DateTime.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_3___default.a.min(DateTime[privateMethods.extractMomentsFromDateTimes].apply(DateTime, arguments)));
    }
    /**
     * Constructs a DateTime from an instance of moment.
     *
     * @param {moment} momentInstance
     * @return {DateTime} An instance of DateTime
     */

  }, {
    key: "fromMoment",
    value: function fromMoment(momentInstance) {
      if (!moment_timezone__WEBPACK_IMPORTED_MODULE_3___default.a.isMoment(momentInstance)) {
        throw new TypeError('Requires an instance of moment.');
      } // this would account for client code that is using `moment` but not
      // using `moment-timezone`.


      return Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(momentInstance.tz) && !Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isUndefined"])(momentInstance.tz()) && momentInstance.tz() !== 'UTC' ? new DateTime(momentInstance.toISOString(), momentInstance.tz(), momentInstance.locale()) : new DateTime(momentInstance.toISOString(true), null, momentInstance.locale());
    }
    /**
     * Constructs a DateTime from an ISO 8601 string.
     *
     * @param {string} ISOString
     * @param {string} timezone
     * @param {string} locale
     * @return {DateTime} An instance of DateTime
     */

  }, {
    key: "fromISO",
    value: function fromISO(ISOString) {
      var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_TIMEZONE_STRING"];
      var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_VALID_LOCALE"];

      if (Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isEmpty"])(ISOString)) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_6__["InvalidISO8601String"](ISOString);
      }

      return new DateTime(ISOString, timezone, locale);
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
     * @return {DateTime}  An instance of DateTime
     */

  }, {
    key: "fromISOWithOffset",
    value: function fromISOWithOffset(ISOString) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_OFFSET"];
      var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_VALID_LOCALE"];
      DateTime.assertISO8601IsValid(ISOString);
      DateTime.assertIsOffset(offset);
      DateTime.assertLocaleIsValid(locale);
      var datetime = moment_timezone__WEBPACK_IMPORTED_MODULE_3___default.a.utc(ISOString).utcOffset(offset, true).locale(locale);
      return new DateTime.fromMoment(datetime);
    }
    /**
     * Constructs a DateTime from a javascript Date object.
     *
     * @param {Date} date
     * @param {string} timezone
     * @param {string} locale
     * @return {DateTime} Returns an instance of DateTime
     */

  }, {
    key: "fromJSDate",
    value: function fromJSDate(date) {
      var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_TIMEZONE_STRING"];
      var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_VALID_LOCALE"];
      DateTime.assertIsDate(date);
      DateTime.assertTimezoneIsValid(timezone);
      DateTime.assertLocaleIsValid(locale);
      return DateTime.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_3___default()(date).tz(timezone).locale(locale));
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
     * @return {DateTime} Returns an instance of DateTime
     */

  }, {
    key: "fromJSDateWithOffset",
    value: function fromJSDateWithOffset(date) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_OFFSET"];
      var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_VALID_LOCALE"];
      DateTime.assertIsDate(date);
      DateTime.assertIsOffset(offset);
      DateTime.assertLocaleIsValid(locale);
      return DateTime.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_3___default()(date).utcOffset(offset).locale(locale));
    }
    /**
     * Constructs a DateTime (in UTC) with milliseconds from epoch.
     *
     * @param {number} milliseconds
     * @param {string} locale
     * @return {DateTime} Returns an instance of DateTime
     * @throws TypeError
     */

  }, {
    key: "fromMilliseconds",
    value: function fromMilliseconds(milliseconds) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_VALID_LOCALE"];
      DateTime.assertLocaleIsValid(locale);

      if (!Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isNumber"])(milliseconds)) {
        throw new TypeError('Provided value must be a number ' + 'representing milliseconds from the epoch');
      }

      return DateTime.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_3___default()(milliseconds).utc().locale(locale));
    }
    /**
     * Constructs a DateTime in UTC with seconds from the epoch.
     *
     * @param {number} seconds
     * @param {string} locale
     * @return {DateTime} An instance of DateTime
     * @throws TypeError
     */

  }, {
    key: "fromUnix",
    value: function fromUnix(seconds) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_VALID_LOCALE"];
      DateTime.assertLocaleIsValid(locale);

      if (!Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isNumber"])(seconds)) {
        throw new TypeError('Provided value must be a number ' + 'representing seconds from the epoch');
      }

      return DateTime.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_3___default.a.unix(seconds).utc().locale(locale));
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
     * @return {DateTime} An instance of DateTime
     * @throws InvalidArgument
     */

  }, {
    key: "fromLocal",
    value: function fromLocal(values) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_VALID_LOCALE"];
      DateTime.assertLocaleIsValid(locale);
      values = DateTime[privateMethods.normalizeUnitObject](values);
      var datetime = Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isEmpty"])(values) ? moment_timezone__WEBPACK_IMPORTED_MODULE_3___default()().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_3___default()(values).locale(locale);

      if (datetime.isValid() !== true) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_6__["InvalidArgument"]('Double-check the values you sent in.', values);
      }

      return DateTime.fromMoment(datetime);
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
     * @return {DateTime} An instance of DateTime
     * @throws InvalidArgument
     */

  }, {
    key: "utc",
    value: function utc(values) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_VALID_LOCALE"];
      DateTime.assertLocaleIsValid(locale);
      values = DateTime[privateMethods.normalizeUnitObject](values);
      var datetime = Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isEmpty"])(values) ? moment_timezone__WEBPACK_IMPORTED_MODULE_3___default.a.utc().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_3___default.a.utc(values).locale(locale);

      if (datetime.isValid() !== true) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_6__["InvalidArgument"]('Double-check the values sent in.', values);
      }

      return DateTime.fromMoment(datetime);
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
     * @return {DateTime} An instance of DateTime
     */

  }, {
    key: "fromObject",
    value: function fromObject(values) {
      var locale = values.locale || _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_VALID_LOCALE"];
      var timezone = values.timezone || _defaults__WEBPACK_IMPORTED_MODULE_9__["DEFAULT_TIMEZONE_STRING"];
      var offset = Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isUndefined"])(values.offset) ? null : values.offset;
      var valuesForConstruct = Object(lodash__WEBPACK_IMPORTED_MODULE_4__["omit"])(values, ['locale', 'timezone', 'offset']);
      DateTime.assertLocaleIsValid(locale);

      if (offset !== null) {
        DateTime.assertIsOffset(offset);
        valuesForConstruct = DateTime[privateMethods.normalizeUnitObject](valuesForConstruct);

        var _datetime = Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isEmpty"])(valuesForConstruct) ? moment_timezone__WEBPACK_IMPORTED_MODULE_3___default()().utcOffset(offset, true).locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_3___default.a.utc(valuesForConstruct).utcOffset(offset, true).locale(locale);

        if (_datetime.isValid() !== true) {
          throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_6__["InvalidArgument"]('Double-check the configuration object sent in.', values);
        }

        return DateTime.fromMoment(_datetime);
      }

      if (timezone === DateTime.TIMEZONE_LOCAL) {
        return DateTime.fromLocal(valuesForConstruct, locale);
      }

      DateTime.assertTimezoneIsValid(timezone);
      valuesForConstruct = DateTime[privateMethods.normalizeUnitObject](valuesForConstruct);
      var datetime = moment_timezone__WEBPACK_IMPORTED_MODULE_3___default.a.tz(valuesForConstruct, timezone).locale(locale);

      if (datetime.isValid() !== true) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_6__["InvalidArgument"]('Double-check the configuration object sent in.', values);
      }

      return DateTime.fromMoment(datetime);
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
      var set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isObject"])(setObject)) {
        throw new TypeError('The incoming value must be an object');
      }

      return Object(lodash__WEBPACK_IMPORTED_MODULE_4__["reduce"])(setObject, function (result, value, key) {
        key = DateTime[privateMethods.normalizeUnitName](key);
        result[key] = DateTime[privateMethods.normalizeUnitValue](key, value, set);
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

var _privateMethods$filte = privateMethods.filterValues;
var _privateMethods$setVa = privateMethods.setValues;
var _privateMethods$popul = privateMethods.populateValuesFromDuration;
var _privateMethods$getAl = privateMethods.getAllUnitNames;
var _privateMethods$creat = privateMethods.createGetters;

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
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_9__);







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
   */
  function ServerDateTime() {
    var _this;

    var iso8601DateString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_VALID_LOCALE"];

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ServerDateTime);

    if (_defaults__WEBPACK_IMPORTED_MODULE_7__["HAS_TIMEZONE_STRING"]) {
      _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ServerDateTime).call(this, iso8601DateString, _defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_TIMEZONE_STRING"], locale));
    } else {
      var datetime = Object(lodash__WEBPACK_IMPORTED_MODULE_8__["isEmpty"])(iso8601DateString) ? moment_timezone__WEBPACK_IMPORTED_MODULE_9___default()().utcOffset(_defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_OFFSET"], true).locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_9___default()(iso8601DateString).utcOffset(_defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_OFFSET"], true).locale(locale);
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
      return _defaults__WEBPACK_IMPORTED_MODULE_7__["HAS_TIMEZONE_STRING"] ? new ServerDateTime(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ServerDateTime), "fromISO", this).call(this, ISOString, _defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_TIMEZONE_STRING"]).toISO(), locale) : new ServerDateTime(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ServerDateTime), "fromISOWithOffset", this).call(this, ISOString, _defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_OFFSET"]).toISO(), locale);
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
      return _defaults__WEBPACK_IMPORTED_MODULE_7__["HAS_TIMEZONE_STRING"] ? new ServerDateTime(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ServerDateTime), "fromJSDate", this).call(this, date, _defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_TIMEZONE_STRING"]).toISO(), locale) : new ServerDateTime(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ServerDateTime), "fromJSDateWithOffset", this).call(this, date, _defaults__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_OFFSET"]).toISO(), locale);
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
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
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





/**
 * External imports
 */






/**
 * Asserts if incoming value is an instance of Money
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
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Money);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "amount", {});

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "currency", {});

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "formatter", {});

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


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Money, [{
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
        this.formatter = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, accounting_js__WEBPACK_IMPORTED_MODULE_5__);
        this.formatter.settings = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, this.formatter.settings, this.currency.toAccountingSettings().currency);
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
      return _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_6___default()(this.currency.toJSON(), other.currency.toJSON());
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

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Money, "ROUND_UP", decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"].ROUND_UP);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Money, "ROUND_DOWN", decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"].ROUND_DOWN);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Money, "ROUND_CEIL", decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"].ROUND_CEIL);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Money, "ROUND_FLOOR", decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"].ROUND_FLOOR);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Money, "ROUND_HALF_UP", decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"].ROUND_HALF_UP);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Money, "ROUND_HALF_DOWN", decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"].ROUND_HALF_DOWN);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Money, "ROUND_HALF_EVEN", decimal_js_light__WEBPACK_IMPORTED_MODULE_4__["Decimal"].ROUND_HALF_EVEN);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Money, "assertMoney", function (money) {
  assertMoney(money);
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Money, "assertCurrency", function (currency) {
  assertCurrency(currency);
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Money, "assertUsingSameCurrency", function (thisMoney, otherMoney) {
  assertMoney(thisMoney);
  assertMoney(otherMoney);
  assertSameCurrency(thisMoney.currency, otherMoney.currency);
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Money, "assertSameCurrency", function (currencyA, currencyB) {
  assertSameCurrency(currencyA, currencyB);
});



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

/***/ "./node_modules/@babel/runtime/helpers/objectSpread.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectSpread.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");

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
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9zcmMvdm8vY3VycmVuY3kuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL2RhdGUtdGltZS9hc3NlcnRpb25zLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL3NyYy92by9kYXRlLXRpbWUvZGF0ZXRpbWUuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL2RhdGUtdGltZS9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9zcmMvdm8vZGF0ZS10aW1lL2R1cmF0aW9uLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL3NyYy92by9kYXRlLXRpbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL2RhdGUtdGltZS9zZXJ2ZXItZGF0ZS10aW1lLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL3NyYy92by9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9zcmMvdm8vbGFiZWwuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL21vbmV5LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFNwcmVhZC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3N1cGVyUHJvcEJhc2UuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvYWNjb3VudGluZy1qcy9kaXN0L2FjY291bnRpbmcudW1kLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL2RlY2ltYWwuanMtbGlnaHQvZGVjaW1hbC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9tb21lbnQtZHVyYXRpb24tZm9ybWF0L2xpYi9tb21lbnQtZHVyYXRpb24tZm9ybWF0LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvd2FybmluZy5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcImhlbHBlcnNcIl19Iiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJ2YWxpZGF0b3JzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImlzU2hhbGxvd0VxdWFsXCJdfSIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvZXh0ZXJuYWwge1widGhpc1wiOlwibW9tZW50XCJ9Iiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJ2ZW5kb3JcIixcIm1vbWVudFwiXX0iXSwibmFtZXMiOlsiQ3VycmVuY3kiLCJjdXJyZW5jeUNvbmZpZyIsInZhbGlkYXRlQ3VycmVuY3lDb25maWciLCJjb2RlIiwic2luZ3VsYXJMYWJlbCIsInBsdXJhbExhYmVsIiwic2lnbiIsInNpZ25CNCIsImlzVW5kZWZpbmVkIiwiZGVjaW1hbFBsYWNlcyIsImRlY2ltYWxNYXJrIiwidGhvdXNhbmRzU2VwYXJhdG9yIiwic3VidW5pdHMiLCJNYXRoIiwicG93IiwiT2JqZWN0IiwiZnJlZXplIiwiZGVjaW1hbEluZm8iLCJkZWNpbWFsIiwidGhvdXNhbmQiLCJwcmVjaXNpb24iLCJjdXJyZW5jeSIsInN5bWJvbCIsImZvcm1hdCIsInBvcyIsIm5lZyIsInplcm8iLCJudW1iZXIiLCJjb25maWciLCJpc0VtcHR5IiwiRXhjZXB0aW9uIiwiaXNTdHJpbmciLCJUeXBlRXJyb3IiLCJpc0Jvb2xlYW4iLCJpc051bWJlciIsIlNpdGVDdXJyZW5jeSIsImUiLCJ3YXJuaW5nIiwibWVzc2FnZSIsIkNVUlJFTkNZX0NPTkZJRyIsInZhbGlkYXRlTG9jYWxlIiwibG9jYWxlIiwib3JpZ2luYWxMb2NhbGUiLCJtb21lbnQiLCJ2YWxpZGF0aW9uTG9jYWxlIiwiYXNzZXJ0TG9jYWxlSXNWYWxpZCIsIkludmFsaWRMb2NhbGUiLCJ2YWxpZGF0ZUlTTzg2MDEiLCJkYXRlVGltZVN0cmluZyIsImlzRHVyYXRpb24iLCJyZWdleCIsInRlc3QiLCJhc3NlcnRJU084NjAxSXNWYWxpZCIsIkludmFsaWRJU084NjAxU3RyaW5nIiwidmFsaWRhdGVUaW1lem9uZSIsInRpbWV6b25lIiwiZHQiLCJ0eiIsInpvbmUiLCJhc3NlcnRUaW1lem9uZUlzVmFsaWQiLCJJbnZhbGlkVGltZXpvbmUiLCJ2YWxpZGF0ZUlzRGF0ZSIsImRhdGUiLCJEYXRlIiwiYXNzZXJ0SXNEYXRlIiwidmFsaWRhdGVJc09mZnNldCIsIm9mZnNldCIsImFzc2VydElzT2Zmc2V0IiwicHJpdmF0ZVByb3BlcnRpZXMiLCJkYXRldGltZSIsIlN5bWJvbCIsInByaXZhdGVNZXRob2RzIiwiZ2V0VW5pdE5hbWVzIiwiY3JlYXRlR2V0dGVyc0FuZFNldHRlcnMiLCJleHRyYWN0TW9tZW50c0Zyb21EYXRlVGltZXMiLCJub3JtYWxpemVVbml0TmFtZSIsIm5vcm1hbGl6ZVVuaXRPYmplY3QiLCJub3JtYWxpemVVbml0VmFsdWUiLCJ2YWxpZERhdGVUaW1lVW5pdHMiLCJEYXRlVGltZSIsImlzbzg2MDFEYXRlU3RyaW5nIiwiREVGQVVMVF9USU1FWk9ORV9TVFJJTkciLCJERUZBVUxUX1ZBTElEX0xPQ0FMRSIsInV0YyIsInV0Y09mZnNldCIsIlRJTUVaT05FX0xPQ0FMIiwiZm9yRWFjaCIsInVuaXROYW1lIiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJtZXRob2ROYW1lIiwidW5pdFZhbHVlIiwiY2FwaXRhbGl6ZSIsInZhbHVlIiwic2V0Iiwic2V0T2JqZWN0IiwiY2xvbmUiLCJ0b0lTT1N0cmluZyIsImZyb21Nb21lbnQiLCJpc1ZhbGlkIiwib3RoZXJEYXRlVGltZSIsImFzc2VydElzRGF0ZVRpbWUiLCJEdXJhdGlvbiIsImR1cmF0aW9uIiwiZGlmZiIsInVuaXQiLCJlbmRPZiIsImlzU2FtZSIsImFzc2VydElzVmFsaWREdXJhdGlvbiIsInN1YnRyYWN0IiwidG9PYmplY3QiLCJhZGQiLCJzdGFydE9mIiwiREVGQVVMVF9GT1JNQVQiLCJpblVUQyIsInRvRGF0ZSIsImxvY2FsIiwidmFsdWVPZiIsInJlZHVjZSIsInJlc3VsdCIsImtleSIsInRvU3RyaW5nIiwiZGF5c0luTW9udGgiLCJpc0RTVCIsImlzTGVhcFllYXIiLCJkYXlPZlllYXIiLCJxdWFydGVyIiwiaXNvV2VlayIsImlzb1dlZWtZZWFyIiwiaXNvV2Vla2RheSIsImlzb1dlZWtzSW5ZZWFyIiwiYXNzZXJ0aW9ucyIsImluc3RhbmNlT2YiLCJ2YWxpZGF0ZUlzRGF0ZVRpbWUiLCJJbnZhbGlkRGF0ZVRpbWUiLCJkYXRldGltZXMiLCJtYXAiLCJtYXgiLCJtaW4iLCJtb21lbnRJbnN0YW5jZSIsImlzTW9tZW50IiwiaXNGdW5jdGlvbiIsIklTT1N0cmluZyIsIkRFRkFVTFRfT0ZGU0VUIiwibWlsbGlzZWNvbmRzIiwic2Vjb25kcyIsInVuaXgiLCJ2YWx1ZXMiLCJJbnZhbGlkQXJndW1lbnQiLCJ2YWx1ZXNGb3JDb25zdHJ1Y3QiLCJvbWl0IiwiZnJvbUxvY2FsIiwibmFtZVRvTm9ybWFsaXplIiwiZGF5IiwiZGF5cyIsInllYXJzIiwibW9udGhzIiwibWludXRlcyIsImhvdXJzIiwiaXNPYmplY3QiLCJVTklUX1lFQVIiLCJVTklUX01PTlRIIiwiVU5JVF9EQVkiLCJVTklUX0hPVVIiLCJVTklUX01JTlVURSIsIlVOSVRfU0VDT05EIiwiVU5JVF9NSUxMSVNFQ09ORCIsIlRJTUVaT05FX0NPTkZJRyIsInN0cmluZyIsIkhBU19USU1FWk9ORV9TVFJJTkciLCJGT1JNQVRfU0lURV9EQVRFIiwiRk9STUFUX1NJVEVfVElNRSIsIkRFRkFVTFRfTE9DQUxFIiwic25ha2VDYXNlIiwiU0VSVkVSX0xPQ0FMRSIsInVzZXIiLCJtb21lbnREdXJhdGlvbkZvcm1hdFNldHVwIiwiZHVyYXRpb25WYWx1ZXMiLCJjcmVhdGVHZXR0ZXJzIiwiZ2V0QWxsVW5pdE5hbWVzIiwicG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb24iLCJzZXRWYWx1ZXMiLCJmaWx0ZXJWYWx1ZXMiLCJ1bml0TmFtZXMiLCJkZXJpdmF0aXZlVW5pdE5hbWVzIiwidmFsdWVzVG9TZXQiLCJwaWNrIiwiaXNTaGFsbG93RXF1YWwiLCJrZXlzIiwiam9pbiIsImFjY2Vzc29yTmFtZSIsImluZGV4T2YiLCJhc01ldGhvZE5hbWUiLCJvdGhlckR1cmF0aW9uIiwiYXNzZXJ0SXNEdXJhdGlvbiIsIm5vcm1hbGl6ZSIsIm1hcFZhbHVlcyIsInRvSlNPTiIsInRvSVNPIiwiYXNNaWxsaXNlY29uZHMiLCJpc29TdHJpbmciLCJpc1ZhbGlkRHVyYXRpb24iLCJTZXJ2ZXJEYXRlVGltZSIsIkxhYmVsIiwic2luZ3VsYXIiLCJwbHVyYWwiLCJzZXRTaW5ndWxhciIsInNldFBsdXJhbCIsImFzc2VydFN0cmluZyIsInN0YXJ0Q2FzZSIsInRvTG93ZXJDYXNlIiwidG9VcHBlckNhc2UiLCJmb3JtYXRUeXBlIiwiRk9STUFUX1NFTlRFTkNFX0NBU0UiLCJhc1NlbnRlbmNlQ2FzZSIsIkZPUk1BVF9MT1dFUkNBU0UiLCJhc0xvd2VyQ2FzZSIsIkZPUk1BVF9VUFBFUkNBU0UiLCJhc1VwcGVyQ2FzZSIsImxhYmVsIiwiYXNzZXJ0TW9uZXkiLCJtb25leSIsImFzc2VydEN1cnJlbmN5IiwiYXNzZXJ0U2FtZUN1cnJlbmN5IiwiY3VycmVuY3lBIiwiY3VycmVuY3lCIiwiTW9uZXkiLCJhbW91bnQiLCJzZXRDdXJyZW5jeSIsInNldEFtb3VudCIsInNldEZvcm1hdHRlciIsInRvTnVtYmVyIiwiRGVjaW1hbCIsImZvcm1hdHRlciIsIkFjY291bnRpbmciLCJzZXR0aW5ncyIsInRvQWNjb3VudGluZ1NldHRpbmdzIiwib3RoZXIiLCJlcXVhbHMiLCJoYXNTYW1lQ3VycmVuY3kiLCJhc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSIsInBsdXMiLCJtaW51cyIsIm11bHRpcGxpZXIiLCJ0aW1lcyIsImRpdmlzb3IiLCJkaXZpZGVkQnkiLCJyYXRpb3MiLCJzZWxmIiwicmVzdWx0cyIsImNvbnZlcnRlZFJhdGlvcyIsInJlbWFpbmRlciIsInRvU3VidW5pdHMiLCJ0b3RhbCIsInJhdGlvIiwicHVzaCIsInNoYXJlIiwiZmxvb3IiLCJpIiwiZ3JlYXRlclRoYW4iLCJjb21wYXJlZFRvIiwiZ3JlYXRlclRoYW5PckVxdWFsVG8iLCJsZXNzVGhhbiIsImxlc3NUaGFuT3JFcXVhbFRvIiwiaXNaZXJvIiwiaXNOZWdhdGl2ZSIsImlzUG9zaXRpdmUiLCJyb3VuZGluZyIsIlJPVU5EX0hBTEZfVVAiLCJ0b0ZpeGVkIiwidG9JbnRlZ2VyIiwiUk9VTkRfVVAiLCJST1VORF9ET1dOIiwiUk9VTkRfQ0VJTCIsIlJPVU5EX0ZMT09SIiwiUk9VTkRfSEFMRl9ET1dOIiwiUk9VTkRfSEFMRl9FVkVOIiwidGhpc01vbmV5Iiwib3RoZXJNb25leSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7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QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGFBQWE7O0FBRTlCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxzQkFBc0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxlQUFlO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFlBQVksYUFBYTs7QUFFekI7QUFDQSxzQkFBc0IsU0FBUztBQUMvQjs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLEtBQUs7O0FBRXJCO0FBQ0EsaUJBQWlCLFVBQVU7QUFDM0I7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxVQUFVOztBQUVwQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzQkFBc0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLHFDQUFxQztBQUNyQzs7QUFFQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxLQUFLO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixHQUFHO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjs7QUFFekM7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIscUJBQXFCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLFVBQVUsY0FBYzs7QUFFeEI7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUIsS0FBSztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUCx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSx1QkFBdUI7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLHVCQUF1QjtBQUN4Qzs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLHVCQUF1QjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxXQUFXOztBQUV6QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxXQUFXOztBQUVYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLFNBQVM7QUFDbkI7QUFDQTs7O0FBR0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLFVBQVUsS0FBSztBQUNmO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QjtBQUM3Qix5Q0FBeUM7QUFDekMsMEJBQTBCO0FBQzFCLHFDQUFxQztBQUNyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELG9CQUFvQjtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxjQUFjO0FBQzNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN4c0REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxhQUFvQjs7QUFFbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsV0FBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsV0FBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDN0RBLGFBQWEsK0JBQStCLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBOUMsYUFBYSwwQ0FBMEMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F6RCxhQUFhLDZDQUE2QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTVELGFBQWEsK0NBQStDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBOUQsYUFBYSxpQ0FBaUMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0FoRCxhQUFhLGlDQUFpQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQWhELGFBQWEsbURBQW1ELEVBQUUsSSIsImZpbGUiOiJldmVudGVzcHJlc3NvLXZhbHVlLW9iamVjdHMuYjBkZjc1Yjk0ZDQ5YTc2ZDljNDQuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL3NyYy92by9pbmRleC5qc1wiKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRpc0VtcHR5LFxuXHRpc1N0cmluZyxcblx0aXNOdW1iZXIsXG5cdGlzQm9vbGVhbixcblx0aXNVbmRlZmluZWQsXG59IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBFeGNlcHRpb24sIENVUlJFTkNZX0NPTkZJRyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5cbi8qKlxuICogQSB2YWx1ZSBvYmplY3QgcmVwcmVzZW50aW5nIGN1cnJlbmN5IHZhbHVlc1xuICovXG5leHBvcnQgY2xhc3MgQ3VycmVuY3kge1xuXHQvKipcblx0ICogVGhlIElTTyA0MjE3IGNvZGUgaWRlbnRpZnlpbmcgdGhlIGN1cnJlbmN5IChlZy4gJ1VTRCcpXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRjb2RlID0gJyc7XG5cblx0LyoqXG5cdCAqIFRoZSBzaW5ndWxhciBsYWJlbCBmb3IgdGhlIGN1cnJlbmN5IChlZy4gJ0RvbGxhcicpO1xuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0c2luZ3VsYXJMYWJlbCA9ICcnO1xuXG5cdC8qKlxuXHQgKiBUaGUgcGx1cmFsIGxhYmVsIGZvciB0aGUgY3VycmVuY3kgKGVnLiAnRG9sbGFycycpO1xuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0cGx1cmFsTGFiZWwgPSAnJztcblxuXHQvKipcblx0ICogVGhlIGN1cnJlbmN5IHN5bWJvbCAoZWcuICckJyk7XG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRzaWduID0gJyc7XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGN1cnJlbmN5IHN5bWJvbCBpcyBkaXNwbGF5ZWQgYmVmb3JlIG9yIGFmdGVyIHRoZSB2YWx1ZS5cblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRzaWduQjQgPSB0cnVlO1xuXG5cdC8qKlxuXHQgKiBUaGUgcHJlY2lzaW9uIGZvciB0aGUgdmFsdWUgKGVnLiAxMC4wMiBpcyAyLCAxMC4xMjMgaXMgMykuIFRoZSBudW1iZXIgb2Zcblx0ICogZGVjaW1hbCBwbGFjZXMgY2FuIGJlIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBudW1iZXIgb2Ygc3VidW5pdHMgZm9yIHRoZVxuXHQgKiBjdXJyZW5jeSAtIHN1YnVuaXRzID0gcG93KCAxMCwgZGVjaW1hbFBsYWNlcykuXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRkZWNpbWFsUGxhY2VzID0gMjtcblxuXHQvKipcblx0ICogVGhlIHN5bWJvbCB1c2VkIGZvciB0aGUgZGVjaW1hbCBtYXJrIChlZy4gJy4nKVxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0ZGVjaW1hbE1hcmsgPSAnLic7XG5cblx0LyoqXG5cdCAqIFRoZSBzeW1ib2wgdXNlZCB0byBzcGxpdCB1cCB0aG91c2FuZHMgaW4gdGhlIHZhbHVlIChlZy4gJywnKVxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0dGhvdXNhbmRzU2VwYXJhdG9yID0gJywnO1xuXG5cdC8qKlxuXHQgKiBUaGUgbnVtYmVyIG9mIGZyYWN0aW9uYWwgZGl2aXNpb25zIG9mIGEgY3VycmVuY3kncyBtYWluIHVuaXQuICBJZiBub3Rcblx0ICogcHJvdmlkZWQsIHRoZW4gaXQgaXMgYXV0b21hdGljYWxseSBjYWxjdWxhdGVkIGZyb20gdGhlIGRlY2ltYWxQbGFjZXNcblx0ICogdmFsdWUuXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdWJ1bml0cyA9IDEwMDtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHt7fX0gY3VycmVuY3lDb25maWcgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGNvbmZpZ3VyYXRpb24gZm9yXG5cdCAqIHRoaXMgY3VycmVuY3kgdmFsdWUgb2JqZWN0LiAgT24gY29uc3RydWN0aW9uLCB0aGUgQ3VycmVuY3kgb2JqZWN0IGlzXG5cdCAqIGZyb3plbiBzbyB0aGF0IGl0IGJlY29tZXMgaW1tdXRhYmxlLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoIGN1cnJlbmN5Q29uZmlnICkge1xuXHRcdEN1cnJlbmN5LnZhbGlkYXRlQ3VycmVuY3lDb25maWcoIGN1cnJlbmN5Q29uZmlnICk7XG5cdFx0dGhpcy5jb2RlID0gY3VycmVuY3lDb25maWcuY29kZTtcblx0XHR0aGlzLnNpbmd1bGFyTGFiZWwgPSBjdXJyZW5jeUNvbmZpZy5zaW5ndWxhckxhYmVsIHx8ICcnO1xuXHRcdHRoaXMucGx1cmFsTGFiZWwgPSBjdXJyZW5jeUNvbmZpZy5wbHVyYWxMYWJlbCB8fCAnJztcblx0XHR0aGlzLnNpZ24gPSBjdXJyZW5jeUNvbmZpZy5zaWduO1xuXHRcdHRoaXMuc2lnbkI0ID0gaXNVbmRlZmluZWQoIGN1cnJlbmN5Q29uZmlnLnNpZ25CNCApID9cblx0XHRcdHRoaXMuc2lnbkI0IDpcblx0XHRcdGN1cnJlbmN5Q29uZmlnLnNpZ25CNDtcblx0XHR0aGlzLmRlY2ltYWxQbGFjZXMgPSBpc1VuZGVmaW5lZCggY3VycmVuY3lDb25maWcuZGVjaW1hbFBsYWNlcyApID9cblx0XHRcdHRoaXMuZGVjaW1hbFBsYWNlcyA6XG5cdFx0XHRjdXJyZW5jeUNvbmZpZy5kZWNpbWFsUGxhY2VzO1xuXHRcdHRoaXMuZGVjaW1hbE1hcmsgPSBjdXJyZW5jeUNvbmZpZy5kZWNpbWFsTWFyayB8fCB0aGlzLmRlY2ltYWxNYXJrO1xuXHRcdHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yID0gY3VycmVuY3lDb25maWcudGhvdXNhbmRzU2VwYXJhdG9yIHx8IHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yO1xuXHRcdHRoaXMuc3VidW5pdHMgPSBjdXJyZW5jeUNvbmZpZy5zdWJ1bml0cyB8fFxuXHRcdFx0TWF0aC5wb3coIDEwLCB0aGlzLmRlY2ltYWxQbGFjZXMgKTtcblx0XHRPYmplY3QuZnJlZXplKCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgY3VycmVuY3kgcHJvcGVydGllcyBhcyBhbiBvYmplY3QgZm9ybWF0dGVkIGZvciB0aGVcblx0ICogYWNjb3VudGluZy1qcyBsaWJyYXJ5IGNvbmZpZ3VyYXRpb24uXG5cdCAqIEByZXR1cm4ge3t9fSAgQW4gb2JqZWN0IHNoYXBlZCBmb3Igd2hhdCB0aGUgYWNjb3VudGluZy1qcyBsaWJyYXJ5IGV4cGVjdHNcblx0ICovXG5cdHRvQWNjb3VudGluZ1NldHRpbmdzKCkge1xuXHRcdGNvbnN0IGRlY2ltYWxJbmZvID0ge1xuXHRcdFx0ZGVjaW1hbDogdGhpcy5kZWNpbWFsTWFyayxcblx0XHRcdHRob3VzYW5kOiB0aGlzLnRob3VzYW5kc1NlcGFyYXRvcixcblx0XHRcdHByZWNpc2lvbjogdGhpcy5kZWNpbWFsUGxhY2VzLFxuXHRcdH07XG5cdFx0cmV0dXJuIHtcblx0XHRcdGN1cnJlbmN5OiB7XG5cdFx0XHRcdHN5bWJvbDogdGhpcy5zaWduLFxuXHRcdFx0XHRmb3JtYXQ6IHtcblx0XHRcdFx0XHRwb3M6IHRoaXMuc2lnbkI0ID8gJyVzJXYnIDogJyV2JXMnLFxuXHRcdFx0XHRcdG5lZzogdGhpcy5zaWduQjQgPyAnLSAkcyV2JyA6ICctICV2JXMnLFxuXHRcdFx0XHRcdHplcm86IHRoaXMuc2lnbkI0ID8gJyVzJXYnIDogJyV2JXMnLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHQuLi5kZWNpbWFsSW5mbyxcblx0XHRcdH0sXG5cdFx0XHRudW1iZXI6IGRlY2ltYWxJbmZvLFxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgb2JqZWN0LlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IEZ1bmN0aW9uIHJldHVybmluZyB0aGUgb2JqZWN0IHRvIGJlIHNlcmlhbGl6ZWQgYnlcblx0ICogSlNPTi5zdHJpbmdpZnlcblx0ICovXG5cdHRvSlNPTigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y29kZTogdGhpcy5jb2RlLFxuXHRcdFx0c2luZ3VsYXJMYWJlbDogdGhpcy5zaW5ndWxhckxhYmVsLFxuXHRcdFx0cGx1cmFsTGFiZWw6IHRoaXMucGx1cmFsTGFiZWwsXG5cdFx0XHRzaWduOiB0aGlzLnNpZ24sXG5cdFx0XHRzaWduQjQ6IHRoaXMuc2lnbkI0LFxuXHRcdFx0ZGVjaW1hbE1hcms6IHRoaXMuZGVjaW1hbE1hcmssXG5cdFx0XHR0aG91c2FuZHNTZXBhcmF0b3I6IHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yLFxuXHRcdFx0c3VidW5pdHM6IHRoaXMuc3VidW5pdHMsXG5cdFx0XHRkZWNpbWFsUGxhY2VzOiB0aGlzLmRlY2ltYWxQbGFjZXMsXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGlzIHZhbGlkYXRlcyB3aGV0aGVyIHRoZSBwYXNzZWQgaW4gY29uZmlnIGhhcyB0aGUgcmVxdWlyZWQgcHJvcGVydGllc1xuXHQgKiAoYW5kIGNvcnJlY3QgdHlwZXMpIGZvciBjb25zdHJ1Y3RpbmcgYSBDdXJyZW5jeSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7e319IGNvbmZpZ1xuXHQgKiBAdGhyb3dzIHtFeGNlcHRpb259XG5cdCAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUN1cnJlbmN5Q29uZmlnID0gKCBjb25maWcgKSA9PiB7XG5cdFx0aWYgKCBpc0VtcHR5KCBjb25maWcgKSApIHtcblx0XHRcdHRocm93IG5ldyBFeGNlcHRpb24oXG5cdFx0XHRcdCdUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgcHJvdmlkZWQgdG8gQ3VycmVuY3kgbXVzdCBub3QnICtcblx0XHRcdFx0JyBiZSBlbXB0eSdcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICggISBjb25maWcuY29kZSB8fCAhIGlzU3RyaW5nKCBjb25maWcuY29kZSApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBjb25maWd1cmF0aW9uIG9iamVjdCBwcm92aWRlZCB0byBDdXJyZW5jeSBtdXN0IGhhdmUgJyArXG5cdFx0XHRcdCdhIFwiY29kZVwiIHByb3BlcnR5IHRoYXQgaXMgYSBzdHJpbmcuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoICEgY29uZmlnLnNpZ24gfHwgISBpc1N0cmluZyggY29uZmlnLnNpZ24gKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgcHJvdmlkZWQgdG8gQ3VycmVuY3kgbXVzdCBoYXZlIGEgJyArXG5cdFx0XHRcdCdcInNpZ25cIiBwcm9wZXJ0eSB0aGF0IGlzIGEgc3RyaW5nLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcuc2luZ3VsYXJMYWJlbCAmJiAhIGlzU3RyaW5nKCBjb25maWcuc2luZ3VsYXJMYWJlbCApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBzaW5ndWxhckxhYmVsIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBzdHJpbmcgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcucGx1cmFsTGFiZWwgJiYgISBpc1N0cmluZyggY29uZmlnLnBsdXJhbExhYmVsICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHBsdXJhbExhYmVsIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBzdHJpbmcgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcuc2lnbkI0ICYmICEgaXNCb29sZWFuKCBjb25maWcuc2lnbkI0ICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHNpZ25CNCBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgYm9vbGVhbiBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5kZWNpbWFsUGxhY2VzICYmICEgaXNOdW1iZXIoIGNvbmZpZy5kZWNpbWFsUGxhY2VzICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGRlY2ltYWxQbGFjZXMgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIG51bWJlciBwcmltaXRpdmUnXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLmRlY2ltYWxNYXJrICYmICEgaXNTdHJpbmcoIGNvbmZpZy5kZWNpbWFsTWFyayApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBkZWNpbWFsTWFyayBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgc3RyaW5nIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLnRob3VzYW5kc1NlcGFyYXRvciAmJlxuXHRcdFx0ISBpc1N0cmluZyggY29uZmlnLnRob3VzYW5kc1NlcGFyYXRvciApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSB0aG91c2FuZHNTZXBhcmF0b3IgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIHN0cmluZyBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5zdWJ1bml0cyAmJiAhIGlzTnVtYmVyKCBjb25maWcuc3VidW5pdHMgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgc3VidW5pdHMgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIG51bWJlciBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBFeHBvcnQgb2YgYSBDdXJyZW5jeSBWYWx1ZSBvYmplY3QgY3JlYXRlZCBmcm9tIGEgY3VycmVuY3kgY29uZmlnIHByb3ZpZGVkLlxuICogVGhpcyBjYXRjaGVzIGFueSBleGNlcHRpb24gYW5kIHRyaWdnZXJzIGEgY29uc29sZSBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge3t9fSBjb25maWdcbiAqIEByZXR1cm4ge0N1cnJlbmN5fHt9fSBJZiB0aGVyZSdzIGEgcHJvYmxlbSBjb25zdHJ1Y3RpbmcgdGhlIGN1cnJlbmN5IG9iamVjdFxuICogYW4gZW1wdHkgb2JqZWN0IGlzIHJldHVybmVkLlxuICovXG5leHBvcnQgY29uc3QgU2l0ZUN1cnJlbmN5ID0gKCBjb25maWcgPSB7fSApID0+IHtcblx0bGV0IGN1cnJlbmN5O1xuXHR0cnkge1xuXHRcdGN1cnJlbmN5ID0gbmV3IEN1cnJlbmN5KCBjb25maWcgKTtcblx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0Y3VycmVuY3kgPSB7fTtcblx0XHR3YXJuaW5nKFxuXHRcdFx0ZmFsc2UsXG5cdFx0XHQnVGhlIFNpdGUgQ3VycmVuY3kgb2JqZWN0IGNvdWxkIG5vdCBiZSBjcmVhdGVkIGJlY2F1c2UgJyArXG5cdFx0XHQnb2YgdGhpcyBlcnJvcjogJyArIGUubWVzc2FnZVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIGN1cnJlbmN5O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2l0ZUN1cnJlbmN5KCBDVVJSRU5DWV9DT05GSUcgKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBpc1N0cmluZywgaXNOdW1iZXIgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0SW52YWxpZFRpbWV6b25lLFxuXHRJbnZhbGlkSVNPODYwMVN0cmluZyxcblx0SW52YWxpZExvY2FsZSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIGxvY2FsZSBzdHJpbmcgaXMgYSB2YWxpZCBsb2NhbGUuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBsb2NhbGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IElmIGdpdmVuIGxvY2FsZSBzdHJpbmcgaXMgbm90IHZhbGlkIHRoaXMgd2lsbCByZXR1cm4gZmFsc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUxvY2FsZSggbG9jYWxlICkge1xuXHRpZiAoICEgaXNTdHJpbmcoIGxvY2FsZSApICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCBvcmlnaW5hbExvY2FsZSA9IG1vbWVudC5sb2NhbGUoKTtcblx0Y29uc3QgdmFsaWRhdGlvbkxvY2FsZSA9IG1vbWVudC5sb2NhbGUoIGxvY2FsZSApO1xuXHQvLyByZXNldCBiYWNrIHRvIG9yaWdpbmFsIGxvY2FsZVxuXHRtb21lbnQubG9jYWxlKCBvcmlnaW5hbExvY2FsZSApO1xuXHRyZXR1cm4gISAoIGxvY2FsZSAhPT0gJ2VuJyAmJiB2YWxpZGF0aW9uTG9jYWxlID09PSAnZW4nICk7XG59XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIGdpdmVuIGxvY2FsZSBzdHJpbmcgaXMgdmFsaWQuICBJZiBpdCdzIG5vdCBhbiBleGNlcHRpb24gaXNcbiAqIHRocm93bi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG4gKiBAdGhyb3dzIEludmFsaWRMb2NhbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApIHtcblx0aWYgKCAhIHZhbGlkYXRlTG9jYWxlKCBsb2NhbGUgKSApIHtcblx0XHR0aHJvdyBuZXcgSW52YWxpZExvY2FsZSggbG9jYWxlICk7XG5cdH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gc3RyaW5nIGlzIGEgdmFsaWQgSVNPODYwMSBmb3JtYXR0ZWQgZGF0ZSBhbmRcbiAqIHRpbWUgc3RyaW5nLlxuICpcbiAqIE5vdGU6IGRhdGUgcmVnZXggcGF0dGVybiBmcm9tXG4gKiBodHRwOi8vd3d3LnBlbGFnb2Rlc2lnbi5jb20vYmxvZy8yMDA5LzA1LzIwL2lzby04NjAxLWRhdGUtdmFsaWRhdGlvbi10aGF0LWRvZXNudC1zdWNrL1xuICogTm90ZTogaXNEdXJhdGlvbiByZWdleCBwYXR0ZXJuIGZyb21cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jeWxjL2N5bGMvaXNzdWVzLzExOSNpc3N1ZWNvbW1lbnQtOTQzNTUzM1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVGltZVN0cmluZ1xuICogQHBhcmFtIHtib29sZWFufSBpc0R1cmF0aW9uICBXaGV0aGVyIHRvIHZhbGlkYXRlIGZvciBhIGR1cmF0aW9uIGZvcm1hdCBvciBub3QuXG4gKiBAcmV0dXJuIHtib29sZWFufSAgUmV0dXJucyBmYWxzZSBpZiB0aGUgZ2l2ZW4gc3RyaW5nIGlzIG5vdCB2YWxpZCBJU084NjAxXG4gKiBmb3JtYXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSVNPODYwMSggZGF0ZVRpbWVTdHJpbmcsIGlzRHVyYXRpb24gPSBmYWxzZSApIHtcblx0aWYgKCAhIGlzU3RyaW5nKCBkYXRlVGltZVN0cmluZyApICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCByZWdleCA9IGlzRHVyYXRpb24gP1xuXHRcdC9eKFJcXGQqXFwvKT9QKD86XFxkKyg/OlxcLlxcZCspP1kpPyg/OlxcZCsoPzpcXC5cXGQrKT9NKT8oPzpcXGQrKD86XFwuXFxkKyk/Vyk/KD86XFxkKyg/OlxcLlxcZCspP0QpPyg/OlQoPzpcXGQrKD86XFwuXFxkKyk/SCk/KD86XFxkKyg/OlxcLlxcZCspP00pPyg/OlxcZCsoPzpcXC5cXGQrKT9TKT8pPyQvIDpcblx0XHQvXihbXFwrLV0/XFxkezR9KD8hXFxkezJ9XFxiKSkoKC0/KSgoMFsxLTldfDFbMC0yXSkoXFwzKFsxMl1cXGR8MFsxLTldfDNbMDFdKSk/fFcoWzAtNF1cXGR8NVswLTJdKSgtP1sxLTddKT98KDAwWzEtOV18MFsxLTldXFxkfFsxMl1cXGR7Mn18MyhbMC01XVxcZHw2WzEtNl0pKSkoW1RcXHNdKCgoWzAxXVxcZHwyWzAtM10pKCg6PylbMC01XVxcZCk/fDI0XFw6PzAwKShbXFwuLF1cXGQrKD8hOikpPyk/KFxcMTdbMC01XVxcZChbXFwuLF1cXGQrKT8pPyhbelpdfChbXFwrLV0pKFswMV1cXGR8MlswLTNdKTo/KFswLTVdXFxkKT8pPyk/KT8kLztcblx0cmV0dXJuIHJlZ2V4LnRlc3QoIGRhdGVUaW1lU3RyaW5nICk7XG59XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCBJU084NjAxIGZvcm1hdHRlZCBkYXRlIGFuZCB0aW1lXG4gKiBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUaW1lU3RyaW5nXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzRHVyYXRpb24gIFdoZXRoZXIgdG8gYXNzZXJ0IGZvciBhIGR1cmF0aW9uIGZvcm1hdCBvciBub3QuXG4gKiBAdGhyb3dzIEludmFsaWRJU084NjAxU3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRJU084NjAxSXNWYWxpZCggZGF0ZVRpbWVTdHJpbmcsIGlzRHVyYXRpb24gPSBmYWxzZSApIHtcblx0aWYgKCAhIHZhbGlkYXRlSVNPODYwMSggZGF0ZVRpbWVTdHJpbmcsIGlzRHVyYXRpb24gKSApIHtcblx0XHR0aHJvdyBuZXcgSW52YWxpZElTTzg2MDFTdHJpbmcoIGRhdGVUaW1lU3RyaW5nICk7XG5cdH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gc3RyaW5nIGlzIGEgdmFsaWQgdGltZXpvbmUgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuICogQHJldHVybiB7Ym9vbGVhbn0gUmV0dXJucyBmYWxzZSBpZiB0aGUgZ2l2ZW4gc3RyaW5nIGlzIG5vdCBhIHZhbGlkIHRpbWV6b25lXG4gKiBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlVGltZXpvbmUoIHRpbWV6b25lICkge1xuXHRpZiAoICEgaXNTdHJpbmcoIHRpbWV6b25lICkgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IGR0ID0gbW9tZW50LnR6LnpvbmUoIHRpbWV6b25lICk7XG5cdHJldHVybiBkdCAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIHRpbWV6b25lIHN0cmluZyBhbmQgdGhyb3dzIGFuXG4gKiBleGNlcHRpb24gaWYgaXQgaXNuJ3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRpbWV6b25lXG4gKiBAdGhyb3dzIEludmFsaWRUaW1lem9uZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0VGltZXpvbmVJc1ZhbGlkKCB0aW1lem9uZSApIHtcblx0aWYgKCAhIHZhbGlkYXRlVGltZXpvbmUoIHRpbWV6b25lICkgKSB7XG5cdFx0dGhyb3cgbmV3IEludmFsaWRUaW1lem9uZSggdGltZXpvbmUgKTtcblx0fVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgamF2YXNjcmlwdCBEYXRlXG4gKiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoZSB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUlzRGF0ZSggZGF0ZSApIHtcblx0cmV0dXJuIGRhdGUgaW5zdGFuY2VvZiBEYXRlO1xufVxuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydElzRGF0ZSggZGF0ZSApIHtcblx0aWYgKCAhIHZhbGlkYXRlSXNEYXRlKCBkYXRlICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuIGluc3RhbmNlIG9mIERhdGUnXG5cdFx0KTtcblx0fVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIG9mZnNldFxuICpcbiAqIEN1cnJlbnRseSB0aGlzIGp1c3QgdmFsaWRhdGVzIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIG51bWJlci4gRXZlbnR1YWxseSBpdFxuICogbWlnaHQgY2hlY2sgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gKiBAcmV0dXJuIHtib29sZWFufSAgdHJ1ZSBtZWFucyBpdHMgdmFsaWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUlzT2Zmc2V0KCBvZmZzZXQgKSB7XG5cdHJldHVybiBpc051bWJlciggb2Zmc2V0ICk7XG59XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIG9mZnNldC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0SXNPZmZzZXQoIG9mZnNldCApIHtcblx0aWYgKCAhIHZhbGlkYXRlSXNPZmZzZXQoIG9mZnNldCApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHQnT2Zmc2V0IGlzIGV4cGVjdGVkIHRvIGJlIGEgbnVtYmVyJ1xuXHRcdCk7XG5cdH1cbn1cbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQge1xuXHRjYXBpdGFsaXplLFxuXHRvbWl0LFxuXHRpc051bWJlcixcblx0aXNFbXB0eSxcblx0cmVkdWNlLFxuXHRpc09iamVjdCxcblx0aXNVbmRlZmluZWQsXG5cdGlzRnVuY3Rpb24sXG59IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpbnN0YW5jZU9mIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRJbnZhbGlkRGF0ZVRpbWUsXG5cdEludmFsaWRBcmd1bWVudCxcblx0SW52YWxpZElTTzg2MDFTdHJpbmcsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0ICogYXMgYXNzZXJ0aW9ucyBmcm9tICcuL2Fzc2VydGlvbnMnO1xuaW1wb3J0IER1cmF0aW9uIGZyb20gJy4vZHVyYXRpb24nO1xuaW1wb3J0IHtcblx0REVGQVVMVF9USU1FWk9ORV9TVFJJTkcsXG5cdERFRkFVTFRfT0ZGU0VULFxuXHRERUZBVUxUX1ZBTElEX0xPQ0FMRSxcblx0REVGQVVMVF9GT1JNQVQsXG59IGZyb20gJy4vZGVmYXVsdHMnO1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBzeW1ib2xzIHVzZWQgZm9yIFwicHJpdmF0ZVwiIHByb3BlcnRpZXMgaW4gdGhlIERhdGVUaW1lIG9iamVjdC5cbiAqXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRkYXRldGltZTogU3ltYm9sXG4gKiBcdH1cbiAqIH1cbiAqL1xuY29uc3QgcHJpdmF0ZVByb3BlcnRpZXMgPSB7XG5cdGRhdGV0aW1lOiBTeW1ib2woICdEYXRlVGltZVByb3BlcnR5RGF0ZVRpbWUnICksXG59O1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBzeW1ib2xzIHVzZWQgZm9yIFwicHJpdmF0ZVwiIG1ldGhvZHMgaW4gdGhlIERhdGVUaW1lIG9iamVjdC5cbiAqXG4gKiBAdHlwZSB7XG4gKiB7XG4gKiBcdGdldFVuaXROYW1lczogU3ltYm9sLFxuICogXHRjcmVhdGVHZXR0ZXJzQW5kU2V0dGVyczogU3ltYm9sLFxuICogXHRleHRyYWN0TW9tZW50c0Zyb21EYXRlVGltZXM6IFN5bWJvbCxcbiAqIFx0bm9ybWFsaXplVW5pdE5hbWU6IFN5bWJvbCxcbiAqIFx0bm9ybWFsaXplVW5pdE9iamVjdDogU3ltYm9sLFxuICogXHRub3JtYWxpemVVbml0VmFsdWU6IFN5bWJvbCxcbiAqIFx0fVxuICogfVxuICovXG5jb25zdCBwcml2YXRlTWV0aG9kcyA9IHtcblx0Z2V0VW5pdE5hbWVzOiBTeW1ib2woICdEYXRlVGltZU1ldGhvZEdldFVuaXROYW1lcycgKSxcblx0Y3JlYXRlR2V0dGVyc0FuZFNldHRlcnM6IFN5bWJvbCggJ0RhdGVUaW1lTWV0aG9kQ3JlYXRlR2V0dGVyc0FuZFNldHRlcnMnICksXG5cdGV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lczogU3ltYm9sKCAnRGF0ZVRpbWVNZXRob2RFeHRyYWN0TW9tZW50c0Zyb21EYXRlVGltZXMnICksXG5cdG5vcm1hbGl6ZVVuaXROYW1lOiBTeW1ib2woICdEYXRlVGltZU1ldGhvZE5vcm1hbGl6ZVVuaXROYW1lJyApLFxuXHRub3JtYWxpemVVbml0T2JqZWN0OiBTeW1ib2woICdEYXRlVGltZU1ldGhvZE5vcm1hbGl6ZVVuaXRPYmplY3QnICksXG5cdG5vcm1hbGl6ZVVuaXRWYWx1ZTogU3ltYm9sKCAnRGF0ZVRpbWVNZXRob2ROb3JtYWxpemVVbml0VmFsdWUnICksXG59O1xuXG5jb25zdCB2YWxpZERhdGVUaW1lVW5pdHMgPSBbXG5cdCd5ZWFyJyxcblx0J21vbnRoJyxcblx0J2RheScsXG5cdCdob3VyJyxcblx0J21pbnV0ZScsXG5cdCdzZWNvbmQnLFxuXHQnbWlsbGlzZWNvbmQnLFxuXTtcblxuLyoqXG4gKiBUaGUgRGF0ZVRpbWUgdmFsdWUgb2JqZWN0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9pbnQgaW4gdGltZS5cbiAqXG4gKiBJbnRlcm5hbGx5LCB0aGUgRGF0ZVRpbWUgY2xhc3MgaGVyZSB1c2VzIGBtb21lbnRgLiAgVGhpcyBpcyBhbiBhYnN0cmFjdGlvblxuICogbG9vc2VseSBmb2xsb3dpbmcgdGhlIGFkYXB0ZXIgcGF0dGVybiBzbyB0aGF0IHRoZXJlIGlzIGEgY29tbW9uIGFwaSB0aGF0XG4gKiBjYW4gYmUgZGVwZW5kZWQgb24gaWYgaW4gdGhlIGZ1dHVyZSB0aGUgaW50ZXJuYWwgbGlicmFyeSBpcyBzd2l0Y2hlZCB0b1xuICogc29tZXRoaW5nIGRpZmZlcmVudCAoc3VjaCBhcyBMdXhvbikuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVUaW1lIHtcblx0LyoqXG5cdCAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIERhdGVUaW1lIGNsYXNzXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBpc284NjAxRGF0ZVN0cmluZ1xuXHQgKiBAcGFyYW0ge3N0cmluZ3xudWxsfSB0aW1lem9uZSBJZiBudWxsLCB0aGVuIHRpbWV6b25lIGlzIG5vdCBzZXQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICovXG5cdGNvbnN0cnVjdG9yKFxuXHRcdGlzbzg2MDFEYXRlU3RyaW5nID0gJycsXG5cdFx0dGltZXpvbmUgPSBERUZBVUxUX1RJTUVaT05FX1NUUklORyxcblx0XHRsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRVxuXHQpIHtcblx0XHRpZiAoIGlzbzg2MDFEYXRlU3RyaW5nICE9PSAnJyApIHtcblx0XHRcdERhdGVUaW1lLmFzc2VydElTTzg2MDFJc1ZhbGlkKCBpc284NjAxRGF0ZVN0cmluZyApO1xuXHRcdH1cblx0XHREYXRlVGltZS5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0XHRpZiAoIHRpbWV6b25lID09PSBudWxsICkge1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXSA9IGlzbzg2MDFEYXRlU3RyaW5nID09PSAnJyA/XG5cdFx0XHRcdG1vbWVudC51dGMoKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdFx0bW9tZW50KCBpc284NjAxRGF0ZVN0cmluZyApXG5cdFx0XHRcdFx0LnV0Y09mZnNldCggaXNvODYwMURhdGVTdHJpbmcgKVxuXHRcdFx0XHRcdC5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdH0gZWxzZSBpZiAoIHRpbWV6b25lID09PSBEYXRlVGltZS5USU1FWk9ORV9MT0NBTCApIHtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0gPSBpc284NjAxRGF0ZVN0cmluZyA9PT0gJycgP1xuXHRcdFx0XHRtb21lbnQoKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdFx0bW9tZW50KCBpc284NjAxRGF0ZVN0cmluZyApLmxvY2FsZSggbG9jYWxlICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdERhdGVUaW1lLmFzc2VydFRpbWV6b25lSXNWYWxpZCggdGltZXpvbmUgKTtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0gPSBpc284NjAxRGF0ZVN0cmluZyA9PT0gJycgP1xuXHRcdFx0XHRtb21lbnQoKS50eiggdGltZXpvbmUgKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdFx0bW9tZW50LnR6KFxuXHRcdFx0XHRcdGlzbzg2MDFEYXRlU3RyaW5nLFxuXHRcdFx0XHRcdHRpbWV6b25lXG5cdFx0XHRcdCkubG9jYWxlKCBsb2NhbGUgKTtcblx0XHR9XG5cdFx0dGhpc1sgcHJpdmF0ZU1ldGhvZHMuY3JlYXRlR2V0dGVyc0FuZFNldHRlcnMgXSgpO1xuXHRcdE9iamVjdC5mcmVlemUoIHRoaXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhlIGdpdmVuIGxvY2FsZSBpcyBhIHZhbGlkIGxvY2FsZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG1lYW5zIGl0IGlzIHZhbGlkXG5cdCAqL1xuXHRzdGF0aWMgdmFsaWRhdGVMb2NhbGUoIGxvY2FsZSApIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZUxvY2FsZSggbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyBpZiB0aGUgZ2l2ZW4gbG9jYWxlIGlzIHZhbGlkIGFuZCB0aHJvd3MgYW4gZXJyb3IgaWYgbm90LlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEB0aHJvd3MgSW52YWxpZExvY2FsZVxuXHQgKi9cblx0c3RhdGljIGFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApIHtcblx0XHRhc3NlcnRpb25zLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyBpZiB0aGUgZ2l2ZW4gSVNPODYwMSBzdHJpbmcgaXMgdmFsaWQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVGltZVN0cmluZ1xuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlSVNPODYwMSggZGF0ZVRpbWVTdHJpbmcgKSB7XG5cdFx0cmV0dXJuIGFzc2VydGlvbnMudmFsaWRhdGVJU084NjAxKCBkYXRlVGltZVN0cmluZyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgaWYgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIElTTyA4NjAxIHN0cmluZy5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUaW1lU3RyaW5nXG5cdCAqIEB0aHJvd3MgSW52YWxpZElTTzg2MDFTdHJpbmdcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJU084NjAxSXNWYWxpZCggZGF0ZVRpbWVTdHJpbmcgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRJU084NjAxSXNWYWxpZCggZGF0ZVRpbWVTdHJpbmcgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIHRpbWV6b25lXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlVGltZXpvbmUoIHRpbWV6b25lICkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlVGltZXpvbmUoIHRpbWV6b25lICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCB0aW1lem9uZSBzdHJpbmcuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKiBAdGhyb3dzIEludmFsaWRUaW1lem9uZVxuXHQgKi9cblx0c3RhdGljIGFzc2VydFRpbWV6b25lSXNWYWxpZCggdGltZXpvbmUgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRUaW1lem9uZUlzVmFsaWQoIHRpbWV6b25lICk7XG5cdH1cblxuXHQvKipcblx0ICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgdmFsaWQgb2Zmc2V0XG5cdCAqXG5cdCAqIEN1cnJlbnRseSB0aGlzIGp1c3QgdmFsaWRhdGVzIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIG51bWJlci4gRXZlbnR1YWxseSBpdFxuXHQgKiBtaWdodCBjaGVjayB1cHBlciBhbmQgbG93ZXIgbGltaXRzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICB0cnVlIG1lYW5zIGl0cyB2YWxpZC5cblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUlzT2Zmc2V0KCBvZmZzZXQgKSB7XG5cdFx0cmV0dXJuIGFzc2VydGlvbnMudmFsaWRhdGVJc09mZnNldCggb2Zmc2V0ICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIG9mZnNldC5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKi9cblx0c3RhdGljIGFzc2VydElzT2Zmc2V0KCBvZmZzZXQgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRJc09mZnNldCggb2Zmc2V0ICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEBwYXJhbSB7RGF0ZVRpbWV9IGRhdGV0aW1lXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IHJldHVybnMgdHJ1ZSBpZiBpdCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlSXNEYXRlVGltZSggZGF0ZXRpbWUgKSB7XG5cdFx0cmV0dXJuIGluc3RhbmNlT2YoIGRhdGV0aW1lLCAnRGF0ZVRpbWUnICkgfHxcblx0XHRcdGluc3RhbmNlT2YoIGRhdGV0aW1lLCAnU2VydmVyRGF0ZVRpbWUnICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBkYXRldGltZVxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKi9cblx0c3RhdGljIGFzc2VydElzRGF0ZVRpbWUoIGRhdGV0aW1lICkge1xuXHRcdGlmICggISBEYXRlVGltZS52YWxpZGF0ZUlzRGF0ZVRpbWUoIGRhdGV0aW1lICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZSdcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgamF2YXNjcmlwdCBEYXRlXG5cdCAqIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhlIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVcblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUlzRGF0ZSggZGF0ZSApIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZUlzRGF0ZSggZGF0ZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNEYXRlKCBkYXRlICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SXNEYXRlKCBkYXRlICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lIGFuZCBpc1xuXHQgKiBhIFwidmFsaWRcIiBkYXRldGltZSAobWVhbmluZyB0aGUgaW5zdGFuY2Ugd2FzIGNvbnN0cnVjdGVkIHdpdGggdmFsaWRcblx0ICogYXJndW1lbnRzKS5cblx0ICogQHBhcmFtIHtEYXRlVGltZX0gZGF0ZXRpbWVcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBtZWFucyBpdCBpcyB2YWxpZC5cblx0ICovXG5cdHN0YXRpYyBpc1ZhbGlkKCBkYXRldGltZSApIHtcblx0XHRyZXR1cm4gRGF0ZVRpbWUudmFsaWRhdGVJc0RhdGVUaW1lKCBkYXRldGltZSApICYmIGRhdGV0aW1lLmlzVmFsaWQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lIGFuZCBpc1xuXHQgKiBhIFwidmFsaWRcIiBkYXRldGltZSAobWVhbmluZyB0aGUgaW5zdGFuY2Ugd2FzIGNvbnN0cnVjdGVkIHdpdGggdmFsaWRcblx0ICogYXJndW1lbnRzKVxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBkYXRldGltZVxuXHQgKiBAdGhyb3dzIEludmFsaWREYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGFzc2VydElzVmFsaWQoIGRhdGV0aW1lICkge1xuXHRcdGlmICggISBEYXRlVGltZS5pc1ZhbGlkKCBkYXRldGltZSApICkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWREYXRlVGltZSggZGF0ZXRpbWUgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQSBwcml2YXRlIGludGVybmFsIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGV4dHJhY3QgYWxsIG1vbWVudFxuXHQgKiBpbnN0YW5jZXMgZnJvbSB0aGUgcHJvdmlkZWQgRGF0ZVRpbWVzIChwYXNzZWQgaW4gYXMgYXJndW1lbnRzKS5cblx0ICogQHBhcmFtIHsuLi5EYXRlVGltZX0gZGF0ZXRpbWVzXG5cdCAqIEByZXR1cm4ge01vbWVudFtdfSBBbiBhcnJheSBvZiBtb21lbnQgaW5zdGFuY2VzIGV4dHJhY3RlZCBmcm9tIHRoZVxuXHQgKiBEYXRlVGltZXNcblx0ICovXG5cdHN0YXRpYyBbIHByaXZhdGVNZXRob2RzLmV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lcyBdKCAuLi5kYXRldGltZXMgKSB7XG5cdFx0cmV0dXJuIGRhdGV0aW1lcy5tYXAoICggZGF0ZXRpbWUgKSA9PiB7XG5cdFx0XHREYXRlVGltZS5hc3NlcnRJc0RhdGVUaW1lKCBkYXRldGltZSApO1xuXHRcdFx0cmV0dXJuIGRhdGV0aW1lWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHaXZlbiBhbiBpbmRlZmluaXRlIG51bWJlciBvZiBEYXRlVGltZXMgYXMgYXJndW1lbnRzLCB0aGlzIHdpbGwgcmV0dXJuIGFcblx0ICogbmV3IERhdGVUaW1lIHRoYXQgcmVwcmVzZW50cyB0aGUgbGF0ZXN0IHBvaW50IGluIHRpbWUuXG5cdCAqIEBwYXJhbSB7Li4uRGF0ZVRpbWV9IGRhdGV0aW1lc1xuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gQSBuZXcgRGF0ZVRpbWUgcmVwcmVzZW50aW5nIHRoZSBsYXRlc3QgcG9pbnQgb2YgdGltZS5cblx0ICovXG5cdHN0YXRpYyBtYXgoIC4uLmRhdGV0aW1lcyApIHtcblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudChcblx0XHRcdG1vbWVudC5tYXgoXG5cdFx0XHRcdERhdGVUaW1lWyBwcml2YXRlTWV0aG9kcy5leHRyYWN0TW9tZW50c0Zyb21EYXRlVGltZXMgXShcblx0XHRcdFx0XHQuLi5kYXRldGltZXNcblx0XHRcdFx0KVxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogR2l2ZW4gYW4gaW5kZWZpbml0ZSBudW1iZXIgb2YgRGF0ZVRpbWVzIGFzIGFyZ3VtZW50cywgdGhpcyB3aWxsIHJldHVybiBhXG5cdCAqIG5ldyBEYXRlVGltZSB0aGF0IHJlcHJlc2VudHMgdGhlIGVhcmxpZXN0IHBvaW50IGluIHRpbWUuXG5cdCAqIEBwYXJhbSB7Li4uRGF0ZVRpbWV9IGRhdGV0aW1lc1xuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gQSBuZXcgRGF0ZVRpbWUgcmVwcmVzZW50aW5nIHRoZSBlYXJsaWVzdCBwb2ludCBpblxuXHQgKiB0aW1lLlxuXHQgKi9cblx0c3RhdGljIG1pbiggLi4uZGF0ZXRpbWVzICkge1xuXHRcdHJldHVybiBEYXRlVGltZS5mcm9tTW9tZW50KFxuXHRcdFx0bW9tZW50Lm1pbihcblx0XHRcdFx0RGF0ZVRpbWVbIHByaXZhdGVNZXRob2RzLmV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lcyBdKFxuXHRcdFx0XHRcdC4uLmRhdGV0aW1lc1xuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBpbnN0YW5jZSBvZiBtb21lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bW9tZW50fSBtb21lbnRJbnN0YW5jZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tTW9tZW50KCBtb21lbnRJbnN0YW5jZSApIHtcblx0XHRpZiAoICEgbW9tZW50LmlzTW9tZW50KCBtb21lbnRJbnN0YW5jZSApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ1JlcXVpcmVzIGFuIGluc3RhbmNlIG9mIG1vbWVudC4nICk7XG5cdFx0fVxuXHRcdC8vIHRoaXMgd291bGQgYWNjb3VudCBmb3IgY2xpZW50IGNvZGUgdGhhdCBpcyB1c2luZyBgbW9tZW50YCBidXQgbm90XG5cdFx0Ly8gdXNpbmcgYG1vbWVudC10aW1lem9uZWAuXG5cdFx0cmV0dXJuIGlzRnVuY3Rpb24oIG1vbWVudEluc3RhbmNlLnR6ICkgJiZcblx0XHRcdCEgaXNVbmRlZmluZWQoIG1vbWVudEluc3RhbmNlLnR6KCkgKSAmJlxuXHRcdFx0bW9tZW50SW5zdGFuY2UudHooKSAhPT0gJ1VUQycgP1xuXHRcdFx0bmV3IERhdGVUaW1lKFxuXHRcdFx0XHRtb21lbnRJbnN0YW5jZS50b0lTT1N0cmluZygpLFxuXHRcdFx0XHRtb21lbnRJbnN0YW5jZS50eigpLFxuXHRcdFx0XHRtb21lbnRJbnN0YW5jZS5sb2NhbGUoKVxuXHRcdFx0KSA6XG5cdFx0XHRuZXcgRGF0ZVRpbWUoXG5cdFx0XHRcdG1vbWVudEluc3RhbmNlLnRvSVNPU3RyaW5nKCB0cnVlICksXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdG1vbWVudEluc3RhbmNlLmxvY2FsZSgpXG5cdFx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGFuIElTTyA4NjAxIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IElTT1N0cmluZ1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tSVNPKFxuXHRcdElTT1N0cmluZyxcblx0XHR0aW1lem9uZSA9IERFRkFVTFRfVElNRVpPTkVfU1RSSU5HLFxuXHRcdGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFXG5cdCkge1xuXHRcdGlmICggaXNFbXB0eSggSVNPU3RyaW5nICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZElTTzg2MDFTdHJpbmcoIElTT1N0cmluZyApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IERhdGVUaW1lKCBJU09TdHJpbmcsIHRpbWV6b25lLCBsb2NhbGUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBJU08gODYwMSBTdHJpbmdcblx0ICogRGlmZmVycyB3aXRoIGBmcm9tSVNPYCBpbiB0aGF0IHRoaXMgYWxsb3dzIHBhc3NpbmcgYSBvZmZzZXQgdmFsdWVcblx0ICogaW5zdGVhZCBvZiBhIHRpbWV6b25lIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IElTT1N0cmluZ1xuXHQgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0ICBJbiBtaW51dGVzIHVubGVzcyA+IC0xNiBvciA8IC0xNiBpbiB3aGljaCBjYXNlIGl0XG5cdCAqIGlzIHRyZWF0ZWQgYXMgaG91cnMuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9ICBBbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGZyb21JU09XaXRoT2Zmc2V0KFxuXHRcdElTT1N0cmluZyxcblx0XHRvZmZzZXQgPSBERUZBVUxUX09GRlNFVCxcblx0XHRsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRVxuXHQpIHtcblx0XHREYXRlVGltZS5hc3NlcnRJU084NjAxSXNWYWxpZCggSVNPU3RyaW5nICk7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0SXNPZmZzZXQoIG9mZnNldCApO1xuXHRcdERhdGVUaW1lLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdGNvbnN0IGRhdGV0aW1lID0gbW9tZW50LnV0YyggSVNPU3RyaW5nIClcblx0XHRcdC51dGNPZmZzZXQoIG9mZnNldCwgdHJ1ZSApXG5cdFx0XHQubG9jYWxlKCBsb2NhbGUgKTtcblx0XHRyZXR1cm4gbmV3IERhdGVUaW1lLmZyb21Nb21lbnQoIGRhdGV0aW1lICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIGZyb20gYSBqYXZhc2NyaXB0IERhdGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGV9IGRhdGVcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRpbWV6b25lXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tSlNEYXRlKFxuXHRcdGRhdGUsXG5cdFx0dGltZXpvbmUgPSBERUZBVUxUX1RJTUVaT05FX1NUUklORyxcblx0XHRsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRVxuXHQpIHtcblx0XHREYXRlVGltZS5hc3NlcnRJc0RhdGUoIGRhdGUgKTtcblx0XHREYXRlVGltZS5hc3NlcnRUaW1lem9uZUlzVmFsaWQoIHRpbWV6b25lICk7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21Nb21lbnQoXG5cdFx0XHRtb21lbnQoIGRhdGUgKS50eiggdGltZXpvbmUgKS5sb2NhbGUoIGxvY2FsZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZXRpbWUgZnJvbSBhIGphdmFzY3JpcHQgRGF0ZSBvYmplY3QuXG5cdCAqXG5cdCAqIFRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhpcyBhbmQgZnJvbUpTRGF0ZSBpcyB0aGF0IHRoaXMgY2FuIGJlIHNldCB3aXRoXG5cdCAqIGFuIG9mZnNldCB2cyBhIHRpbWV6b25lIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGZyb21KU0RhdGVXaXRoT2Zmc2V0KFxuXHRcdGRhdGUsXG5cdFx0b2Zmc2V0ID0gREVGQVVMVF9PRkZTRVQsXG5cdFx0bG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEVcblx0KSB7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0SXNEYXRlKCBkYXRlICk7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0SXNPZmZzZXQoIG9mZnNldCApO1xuXHRcdERhdGVUaW1lLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdHJldHVybiBEYXRlVGltZS5mcm9tTW9tZW50KFxuXHRcdFx0bW9tZW50KCBkYXRlICkudXRjT2Zmc2V0KCBvZmZzZXQgKS5sb2NhbGUoIGxvY2FsZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgKGluIFVUQykgd2l0aCBtaWxsaXNlY29uZHMgZnJvbSBlcG9jaC5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IG1pbGxpc2Vjb25kc1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgZnJvbU1pbGxpc2Vjb25kcyggbWlsbGlzZWNvbmRzLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSApIHtcblx0XHREYXRlVGltZS5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0XHRpZiAoICEgaXNOdW1iZXIoIG1pbGxpc2Vjb25kcyApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ1Byb3ZpZGVkIHZhbHVlIG11c3QgYmUgYSBudW1iZXIgJyArXG5cdFx0XHRcdCdyZXByZXNlbnRpbmcgbWlsbGlzZWNvbmRzIGZyb20gdGhlIGVwb2NoJyApO1xuXHRcdH1cblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudChcblx0XHRcdG1vbWVudCggbWlsbGlzZWNvbmRzICkudXRjKCkubG9jYWxlKCBsb2NhbGUgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIGluIFVUQyB3aXRoIHNlY29uZHMgZnJvbSB0aGUgZXBvY2guXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgZnJvbVVuaXgoIHNlY29uZHMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdERhdGVUaW1lLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdGlmICggISBpc051bWJlciggc2Vjb25kcyApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ1Byb3ZpZGVkIHZhbHVlIG11c3QgYmUgYSBudW1iZXIgJyArXG5cdFx0XHRcdCdyZXByZXNlbnRpbmcgc2Vjb25kcyBmcm9tIHRoZSBlcG9jaCcgKTtcblx0XHR9XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21Nb21lbnQoXG5cdFx0XHRtb21lbnQudW5peCggc2Vjb25kcyApLnV0YygpLmxvY2FsZSggbG9jYWxlIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGFuIG9iamVjdCBvZiB2YWx1ZXMgYXNzdW1pbmcgaXRzIGluIFwibG9jYWxcIlxuXHQgKiB0aW1lIChpZiBydW4gdmlhIGJyb3dzZXIgb3Igc2VydmVyIGlmIHJ1biBzZXJ2ZXIgc2lkZSkuXG5cdCAqXG5cdCAqIFRoZSBvYmplY3QgaXMgZXhwZWN0ZWQgdG8gYmUgYSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGluc3RhbmNlIGluIHRpbWU6XG5cdCAqIEVnLlxuXHQgKiB7IHllYXI6IDIwMTgsIG1vbnRoOiAxMiwgZGF5OiAyNSwgaG91cjogMCwgbWludXRlOiAxNSwgc2Vjb25kczogMCB9XG5cdCAqXG5cdCAqIFBhc3MgYW4gZW1wdHkgdmFsdWVzIHZhbHVlIGlmIHlvdSB3YW50IHRoZSBpbnN0YW5jZSBpbiB0aW1lIHRvIHJlcHJlc2VudFxuXHQgKiBcIm5vd1wiLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEB0aHJvd3MgSW52YWxpZEFyZ3VtZW50XG5cdCAqL1xuXHRzdGF0aWMgZnJvbUxvY2FsKCB2YWx1ZXMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdERhdGVUaW1lLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdHZhbHVlcyA9IERhdGVUaW1lWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0T2JqZWN0IF0oIHZhbHVlcyApO1xuXHRcdGNvbnN0IGRhdGV0aW1lID0gaXNFbXB0eSggdmFsdWVzICkgP1xuXHRcdFx0bW9tZW50KCkubG9jYWxlKCBsb2NhbGUgKSA6XG5cdFx0XHRtb21lbnQoIHZhbHVlcyApLmxvY2FsZSggbG9jYWxlICk7XG5cdFx0aWYgKCBkYXRldGltZS5pc1ZhbGlkKCkgIT09IHRydWUgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50KFxuXHRcdFx0XHQnRG91YmxlLWNoZWNrIHRoZSB2YWx1ZXMgeW91IHNlbnQgaW4uJyxcblx0XHRcdFx0dmFsdWVzXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudCggZGF0ZXRpbWUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBvYmplY3Qgb2YgdmFsdWVzIGFuZCBhc3N1bWVzIGl0cyBpblxuXHQgKiAnVVRDJy5cblx0ICpcblx0ICogVGhlIG9iamVjdCBpcyBleHBlY3RlZCB0byBiZSBhIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgaW5zdGFuY2UgaW4gdGltZTpcblx0ICogRWcuXG5cdCAqIHsgeWVhcjogMjAxOCwgbW9udGg6IDEyLCBkYXk6IDI1LCBob3VyOiAwLCBtaW51dGU6IDE1LCBzZWNvbmRzOiAwIH1cblx0ICpcblx0ICogQW55IHVuaXRzIG5vdCBzcGVjaWZpZWQgd2lsbCBiZSBhc3N1bWVkIHRvIGJlIGAwYC5cblx0ICpcblx0ICogUGFzcyBhbiBlbXB0eSB2YWx1ZXMgdmFsdWUgaWYgeW91IHdhbnQgdGhlIGluc3RhbmNlIGluIHRpbWUgdG8gcmVwcmVzZW50XG5cdCAqIFwibm93XCIuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXNcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICogQHRocm93cyBJbnZhbGlkQXJndW1lbnRcblx0ICovXG5cdHN0YXRpYyB1dGMoIHZhbHVlcywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUgKSB7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0dmFsdWVzID0gRGF0ZVRpbWVbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRPYmplY3QgXSggdmFsdWVzICk7XG5cdFx0Y29uc3QgZGF0ZXRpbWUgPSBpc0VtcHR5KCB2YWx1ZXMgKSA/XG5cdFx0XHRtb21lbnQudXRjKCkubG9jYWxlKCBsb2NhbGUgKSA6XG5cdFx0XHRtb21lbnQudXRjKCB2YWx1ZXMgKS5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdGlmICggZGF0ZXRpbWUuaXNWYWxpZCgpICE9PSB0cnVlICkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudChcblx0XHRcdFx0J0RvdWJsZS1jaGVjayB0aGUgdmFsdWVzIHNlbnQgaW4uJyxcblx0XHRcdFx0dmFsdWVzXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudCggZGF0ZXRpbWUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuXHQgKlxuXHQgKiBUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgY2FuIGhhdmU6XG5cdCAqIC0gYW55IG9mIHRoZSBEYXRlVGltZSB1bml0cyAoJ3llYXInLCAnbW9udGgnLCBldGMpXG5cdCAqIC0gJ2xvY2FsZScgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBsb2NhbGVcblx0ICogLSAndGltZXpvbmUnIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdGltZXpvbmVcblx0ICogLSAnb2Zmc2V0JyBhIG51bWJlciByZXByZXNlbnRpbmcgdGhlIG9mZnNldCBmcm9tIFVUQyB0aGlzIGluc3RhbmNlIGluXG5cdCAqIHRpbWUgcmVwcmVzZW50cy5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHZhbHVlc1xuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tT2JqZWN0KCB2YWx1ZXMgKSB7XG5cdFx0Y29uc3QgbG9jYWxlID0gdmFsdWVzLmxvY2FsZSB8fCBERUZBVUxUX1ZBTElEX0xPQ0FMRTtcblx0XHRjb25zdCB0aW1lem9uZSA9IHZhbHVlcy50aW1lem9uZSB8fCBERUZBVUxUX1RJTUVaT05FX1NUUklORztcblx0XHRjb25zdCBvZmZzZXQgPSBpc1VuZGVmaW5lZCggdmFsdWVzLm9mZnNldCApID9cblx0XHRcdG51bGwgOlxuXHRcdFx0dmFsdWVzLm9mZnNldDtcblx0XHRsZXQgdmFsdWVzRm9yQ29uc3RydWN0ID0gb21pdChcblx0XHRcdHZhbHVlcyxcblx0XHRcdFsgJ2xvY2FsZScsICd0aW1lem9uZScsICdvZmZzZXQnIF1cblx0XHQpO1xuXG5cdFx0RGF0ZVRpbWUuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cblx0XHRpZiAoIG9mZnNldCAhPT0gbnVsbCApIHtcblx0XHRcdERhdGVUaW1lLmFzc2VydElzT2Zmc2V0KCBvZmZzZXQgKTtcblx0XHRcdHZhbHVlc0ZvckNvbnN0cnVjdCA9IERhdGVUaW1lWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0T2JqZWN0IF0oXG5cdFx0XHRcdHZhbHVlc0ZvckNvbnN0cnVjdFxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IGRhdGV0aW1lID0gaXNFbXB0eSggdmFsdWVzRm9yQ29uc3RydWN0ICkgP1xuXHRcdFx0XHRtb21lbnQoKS51dGNPZmZzZXQoIG9mZnNldCwgdHJ1ZSApLmxvY2FsZSggbG9jYWxlICkgOlxuXHRcdFx0XHRtb21lbnQudXRjKCB2YWx1ZXNGb3JDb25zdHJ1Y3QgKVxuXHRcdFx0XHRcdC51dGNPZmZzZXQoIG9mZnNldCwgdHJ1ZSApXG5cdFx0XHRcdFx0LmxvY2FsZSggbG9jYWxlICk7XG5cdFx0XHRpZiAoIGRhdGV0aW1lLmlzVmFsaWQoKSAhPT0gdHJ1ZSApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudChcblx0XHRcdFx0XHQnRG91YmxlLWNoZWNrIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBzZW50IGluLicsXG5cdFx0XHRcdFx0dmFsdWVzXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudCggZGF0ZXRpbWUgKTtcblx0XHR9XG5cblx0XHRpZiAoIHRpbWV6b25lID09PSBEYXRlVGltZS5USU1FWk9ORV9MT0NBTCApIHtcblx0XHRcdHJldHVybiBEYXRlVGltZS5mcm9tTG9jYWwoIHZhbHVlc0ZvckNvbnN0cnVjdCwgbG9jYWxlICk7XG5cdFx0fVxuXG5cdFx0RGF0ZVRpbWUuYXNzZXJ0VGltZXpvbmVJc1ZhbGlkKCB0aW1lem9uZSApO1xuXG5cdFx0dmFsdWVzRm9yQ29uc3RydWN0ID0gRGF0ZVRpbWVbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRPYmplY3QgXShcblx0XHRcdHZhbHVlc0ZvckNvbnN0cnVjdFxuXHRcdCk7XG5cdFx0Y29uc3QgZGF0ZXRpbWUgPSBtb21lbnQudHooIHZhbHVlc0ZvckNvbnN0cnVjdCwgdGltZXpvbmUgKVxuXHRcdFx0LmxvY2FsZSggbG9jYWxlICk7XG5cdFx0aWYgKCBkYXRldGltZS5pc1ZhbGlkKCkgIT09IHRydWUgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50KFxuXHRcdFx0XHQnRG91YmxlLWNoZWNrIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBzZW50IGluLicsXG5cdFx0XHRcdHZhbHVlc1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21Nb21lbnQoIGRhdGV0aW1lICk7XG5cdH1cblxuXHQvKipcblx0ICogTW9tZW50IHVzZXMgZGlmZmVyZW50IG5hbWVzIGZvciBzb21lIHVuaXQgZ2V0dGVycy9zZXR0ZXJzL3Byb3BlcnRpZXMgc29cblx0ICogdGhpcyBpcyB1c2VkIHRvIG5vcm1hbGl6ZSBhIGdpdmVuIHVuaXQgbmFtZSB0byB3aGF0IG1vbWVudCB1c2VzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVRvTm9ybWFsaXplXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gIE5vcm1hbGl6ZWQgdW5pdCBuYW1lLlxuXHQgKi9cblx0c3RhdGljIFsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE5hbWUgXSggbmFtZVRvTm9ybWFsaXplICkge1xuXHRcdGNvbnN0IG1hcCA9IHtcblx0XHRcdGRheTogJ2RhdGUnLFxuXHRcdFx0ZGF5czogJ2RheScsXG5cdFx0XHRkYXRlOiAnZGF5Jyxcblx0XHRcdHllYXJzOiAneWVhcicsXG5cdFx0XHRtb250aHM6ICdtb250aCcsXG5cdFx0XHRtaWxsaXNlY29uZHM6ICdtaWxsaXNlY29uZCcsXG5cdFx0XHRtaW51dGVzOiAnbWludXRlJyxcblx0XHRcdHNlY29uZHM6ICdzZWNvbmQnLFxuXHRcdFx0aG91cnM6ICdob3VyJyxcblx0XHR9O1xuXHRcdHJldHVybiBtYXBbIG5hbWVUb05vcm1hbGl6ZSBdID9cblx0XHRcdG1hcFsgbmFtZVRvTm9ybWFsaXplIF0gOlxuXHRcdFx0bmFtZVRvTm9ybWFsaXplO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgbm9ybWFsaXppbmcgdW5pdCB2YWx1ZXMgZm9yIGludGVybmFsIGxpYnJhcnkgdXNlLlxuXHQgKlxuXHQgKiBGb3IgZXhhbXBsZSwgbW9tZW50IHplcm8gaW5kZXhlcyBtb250aHMuIERhdGVUaW1lIGRvZXMgbm90LCBzbyB0aGlzXG5cdCAqIG1ldGhvZCBoZWxwcyB3aXRoIG5vcm1hbGl6aW5nIG1vbnRoIHZhbHVlcyBmb3IgYm90aCBzZXR0aW5nICh1c2VkIGJ5XG5cdCAqIG1vbWVudCkgYW5kIGdldHRpbmcgKHJldHVybmVkIHRvIGNsaWVudCkuICBUaGlzIGFsbG93cyBjbGllbnQgY29kZVxuXHQgKiB0byBleHBlY3QgbW9udGhzIGluIERhdGVUaW1lIHRvIGJlIGhhbmRsZWQgd2l0aCBhIG5vbi16ZXJvIGluZGV4LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdW5pdCBUaGUgdW5pdCB0byBiZSBub3JtYWxpemVkXG5cdCAqIEBwYXJhbSB7bWl4ZWR9ICB2YWx1ZSBUaGUgdmFsdWUgZm9yIHRoYXQgdW5pdFxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNldCAgV2hldGhlciB0aGlzIHNob3VsZCBub3JtYWxpemUgZm9yIHNldHRpbmcgb3Jcblx0ICogZ2V0dGluZy5cblx0ICogQHJldHVybiB7bWl4ZWR9ICBUaGUgbm9ybWFsaXplZCB2YWx1ZS5cblx0ICovXG5cdHN0YXRpYyBbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRWYWx1ZSBdKCB1bml0LCB2YWx1ZSwgc2V0ID0gdHJ1ZSApIHtcblx0XHRpZiAoIHVuaXQgPT09ICdtb250aCcgKSB7XG5cdFx0XHR2YWx1ZSA9IHNldCA/IHZhbHVlIC0gMSA6IHZhbHVlICsgMTtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdpdmVuIGEgc2ltcGxlIG9iamVjdCBjb250YWluaW5nIHVuaXRzLCB0aGlzIG5vcm1hbGl6ZXMgdGhlIG9iamVjdCB0b1xuXHQgKiB3aGF0IG1vbWVudCByZWNvZ25pemVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2V0T2JqZWN0XG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0ICB0cnVlIGlmIHNldHRpbmcgdGhlIG9iamVjdCwgZmFsc2UgaWYgZ2V0dGluZyB0aGVcblx0ICogb2JqZWN0XG5cdCAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5vcm1hbGl6ZWQgb2JqZWN0LlxuXHQgKi9cblx0c3RhdGljIFsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE9iamVjdCBdKCBzZXRPYmplY3QsIHNldCA9IHRydWUgKSB7XG5cdFx0aWYgKCAhIGlzT2JqZWN0KCBzZXRPYmplY3QgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgaW5jb21pbmcgdmFsdWUgbXVzdCBiZSBhbiBvYmplY3QnXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVkdWNlKCBzZXRPYmplY3QsICggcmVzdWx0LCB2YWx1ZSwga2V5ICkgPT4ge1xuXHRcdFx0a2V5ID0gRGF0ZVRpbWVbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXROYW1lIF0oIGtleSApO1xuXHRcdFx0cmVzdWx0WyBrZXkgXSA9IERhdGVUaW1lWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0VmFsdWUgXShcblx0XHRcdFx0a2V5LFxuXHRcdFx0XHR2YWx1ZSxcblx0XHRcdFx0c2V0XG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LCB7fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGRhdGUgYW5kIHRpbWUgdW5pdCBuYW1lc1xuXHQgKiBAcmV0dXJuIHtzdHJpbmdbXX0gQW4gYXJyYXkgb2YgdW5pdCBuYW1lc1xuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5nZXRVbml0TmFtZXMgXSgpIHtcblx0XHRyZXR1cm4gdmFsaWREYXRlVGltZVVuaXRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgdGhlIHZhcmlvdXMgZ2V0dGVyIGFuZCBzZXR0ZXJzIGZvciB0aGUgdmFsdWUgb2JqZWN0LlxuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5jcmVhdGVHZXR0ZXJzQW5kU2V0dGVycyBdKCkge1xuXHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmdldFVuaXROYW1lcyBdKCkuZm9yRWFjaChcblx0XHRcdCggdW5pdE5hbWUgKSA9PiB7XG5cdFx0XHRcdC8vIGNyZWF0ZXMgYWNjZXNzb3IgZm9yIGdldHRpbmcgdGhlIHVuaXQgdmFsdWUgdmlhIGFcblx0XHRcdFx0Ly8gcHJvcGVydHkgKGVnLiBpbnN0YW5jZS5ob3VyKVxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHRoaXMsIHVuaXROYW1lLCB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWV0aG9kTmFtZSA9IERhdGVUaW1lWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0TmFtZSBdKCB1bml0TmFtZSApO1xuXHRcdFx0XHRcdFx0Y29uc3QgdW5pdFZhbHVlID0gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHRcdFx0XHRbIG1ldGhvZE5hbWUgXSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIERhdGVUaW1lWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0VmFsdWUgXShcblx0XHRcdFx0XHRcdFx0dW5pdE5hbWUsXG5cdFx0XHRcdFx0XHRcdHVuaXRWYWx1ZSxcblx0XHRcdFx0XHRcdFx0ZmFsc2Vcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSApO1xuXHRcdFx0XHQvLyBjcmVhdGVzIGEgZmx1ZW50IHNldHRlciBmb3IgdGhlIHZhbHVlLlxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHRoaXMsICdzZXQnICsgY2FwaXRhbGl6ZSggdW5pdE5hbWUgKSwge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAoIHZhbHVlICkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zZXQoIHsgWyB1bml0TmFtZSBdOiB2YWx1ZSB9ICk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVzZWQgdG8gc2V0IHZhcmlvdXMgcGFydHMgb2YgdGhlIGRhdGV0aW1lIHN0cmluZyBhbmQgcmV0dXJucyBhIE5FV1xuXHQgKiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKlxuXHQgKiBOb3RlOiB0aGlzIHdpbGwgY29uc3RydWN0IGEgRGF0ZVRpbWUgZXZlbiB3aXRoIGludmFsaWQgdW5pdHMuIE1ha2UgdXNlIG9mXG5cdCAqIGBpc1ZhbGlkKClgIHRvIGRldGVybWluZSB3aGV0aGVyIHRoZSBpbnN0YW5jZSBpcyBhIHZhbGlkIERhdGVUaW1lIG9yIG5vdC5cblx0ICpcblx0ICogQHBhcmFtIHt7fX0gc2V0T2JqZWN0IEFuIG9iamVjdCB3aGVyZSBrZXlzIGFyZSB0aGUgdW5pdHMuXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfSBBIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZS5cblx0ICovXG5cdHNldCggc2V0T2JqZWN0ID0ge30gKSB7XG5cdFx0c2V0T2JqZWN0ID0gRGF0ZVRpbWVbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRPYmplY3QgXSggc2V0T2JqZWN0ICk7XG5cdFx0cmV0dXJuIG5ldyBEYXRlVGltZShcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0LnNldCggc2V0T2JqZWN0ICkudG9JU09TdHJpbmcoKSxcblx0XHRcdHRoaXMudGltZXpvbmUsXG5cdFx0XHR0aGlzLmxvY2FsZVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQWNjZXNzb3IgZm9yIHRoZSB0aW1lem9uZSBzdHJpbmcuXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHRpbWV6b25lIHN0cmluZ1xuXHQgKi9cblx0Z2V0IHRpbWV6b25lKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnR6KCk7XG5cdH1cblxuXHQvKipcblx0ICogRmx1ZW50IHNldHRlciBmb3IgdGhlIHRpbWV6b25lIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9IFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHNldFRpbWV6b25lKCB0aW1lem9uZSApIHtcblx0XHREYXRlVGltZS5hc3NlcnRUaW1lem9uZUlzVmFsaWQoIHRpbWV6b25lICk7XG5cdFx0cmV0dXJuIG5ldyBEYXRlVGltZShcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0udG9JU09TdHJpbmcoKSxcblx0XHRcdHRpbWV6b25lLFxuXHRcdFx0dGhpcy5sb2NhbGVcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGZvciB0aGUgbW9udGggc2V0IGluIHRoaXMgaW5zdGFuY2UuXG5cdCAqXG5cdCAqIEByZXR1cm4ge251bWJlcn0gIFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbW9udGguXG5cdCAqL1xuXHRnZXQgZGF5c0luTW9udGgoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uZGF5c0luTW9udGgoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IGluc3RhbmNlIGluIHRpbWUgaXMgY3VycmVudGx5IGluIERheWxpZ2h0IFNhdmluZ3Ncblx0ICogVGltZS5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyBpdCBpcyBjdXJyZW50bHkgaW4gRGF5bGlnaHQgU2F2aW5ncyBUaW1lLlxuXHQgKi9cblx0Z2V0IGlzSW5EU1QoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uaXNEU1QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IGluc3RhbmNlIGluIHRpbWUgaXMgY3VycmVudGx5IGluIGEgbGVhcCB5ZWFyLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoaXMgZGF0ZSB0aW1lIGlzIGluIGEgbGVhcCB5ZWFyLlxuXHQgKi9cblx0Z2V0IGlzSW5MZWFwWWVhcigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5pc0xlYXBZZWFyKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgb2Zmc2V0IGZyb20gVVRDIGZvciB0aGUgY3VycmVudCBpbnN0YW5jZSBpbiB0aW1lIChpbiBtaW51dGVzKS5cblx0ICogQHJldHVybiB7bnVtYmVyfSAgVGhlIG9mZnNldCBpcyBpbiBtaW51dGVzXG5cdCAqL1xuXHRnZXQgb2Zmc2V0KCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnV0Y09mZnNldCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZmx1ZW50IHNldHRlciBmb3IgdGhlIFVUQyBvZmZzZXQuXG5cdCAqXG5cdCAqIFRoZSBvZmZzZXQgcHJvdmlkZWQgZGVmYXVsdHMgdG8gZXhwZWN0aW5nIGluIG1pbnV0ZXMuICBIb3dldmVyIGlmIHRoZVxuXHQgKiBpbnB1dCBpcyBsZXNzIHRoYW4gMTYgYW5kIGdyZWF0ZXIgdGhhbiAtMTYsIGl0IHdpbGwgaW50ZXJwcmV0IHRoZSBpbnB1dFxuXHQgKiBhcyBob3VycyBpbnN0ZWFkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfSByZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzZXRPZmZzZXQoIG9mZnNldCApIHtcblx0XHREYXRlVGltZS5hc3NlcnRJc09mZnNldCggb2Zmc2V0ICk7XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmNsb25lKCkudXRjT2Zmc2V0KCBvZmZzZXQgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgZGF5IG9mIHRoZSB5ZWFyIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpbiB0aGUgb2JqZWN0LlxuXHQgKlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IEEgbnVtYmVyIGJldHdlZW4gMSBhbmQgMzY2IChkZXBlbmRpbmcgb24gd2hldGhlciB0aGVcblx0ICogaW50ZXJuYWwgZGF0ZSBhbmQgdGltZSBpcyBpbiBhIGxlYXAgeWVhciBvciBub3QpLlxuXHQgKi9cblx0Z2V0IGRheU9mWWVhcigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5kYXlPZlllYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBxdWFydGVyIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpbiB0aGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IEEgbnVtYmVyIGJldHdlZW4gMSBhbmQgNFxuXHQgKi9cblx0Z2V0IHF1YXJ0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0ucXVhcnRlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV4cG9zZXMgdGhlIElTTyBudW1iZXIgb2YgdGhlIHdlZWsgZm9yIHRoZSBkYXRlIGFuZCB0aW1lIGluIHRoZSBvYmplY3QuXG5cdCAqIEBsaW5rIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcblx0ICogQHJldHVybiB7bnVtYmVyfSBXaWxsIGJlIGEgbnVtYmVyIGJldHdlZW4gMSBhbmQgNTJpc2hcblx0ICovXG5cdGdldCBpc29XZWVrTnVtYmVyKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmlzb1dlZWsoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBJU08gbnVtYmVyIGZvciB0aGUgd2VlayB5ZWFyIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpbiB0aGVcblx0ICogb2JqZWN0LlxuXHQgKiBAbGluayBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG5cdCAqIEByZXR1cm4ge251bWJlcn0gIFdpbGwgYmUgYSBudW1iZXIgcmVwcmVzZW50aW5nIGEgeWVhci5cblx0ICovXG5cdGdldCBpc29XZWVrWWVhcigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5pc29XZWVrWWVhcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV4cG9zZXMgdGhlIElTTyBudW1iZXIgZm9yIHRoZSBkYXkgb2YgdGhlIHdlZWsgZm9yIHRoZSBkYXRlIGFuZCB0aW1lIGluXG5cdCAqIHRoZSBvYmplY3QuXG5cdCAqIEBsaW5rIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcblx0ICogQHJldHVybiB7bnVtYmVyfSBBIG51bWJlciBiZXR3ZWVuIDEgYW5kIDcgKE1vbmRheSBpcyAxIGFuZCBTdW5kYXkgaXMgNylcblx0ICovXG5cdGdldCBpc29XZWVrRGF5KCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmlzb1dlZWtkYXkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBudW1iZXIgb2Ygd2Vla3MgaW4gdGhpcyBEYXRlVGltZSdzIHllYXIuXG5cdCAqIEBsaW5rIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcblx0ICpcblx0ICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHdlZWtzIGluIHRoZSBJU08geWVhci5cblx0ICovXG5cdGdldCBpc29XZWVrc0luV2Vla1llYXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uaXNvV2Vla3NJblllYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHdoYXQgdGhlIHNldCBsb2NhbGUgaXMgZm9yIHRoaXMgRGF0ZVRpbWVcblx0ICogQHJldHVybiB7c3RyaW5nfSBBIGxvY2FsZSBzdHJpbmdcblx0ICovXG5cdGdldCBsb2NhbGUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0ubG9jYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQSBmbHVlbnQgc2V0dGVyIGZvciBzZXR0aW5nIHRoZSBsb2NhbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9IGEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lIGVxdWl2YWxlbnQgdG8gdGhpcyBvbmUgYnV0XG5cdCAqIHdpdGggZGlmZmVyZW50IGxvY2FsZS5cblx0ICovXG5cdHNldExvY2FsZSggbG9jYWxlICkge1xuXHRcdERhdGVUaW1lLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdHJldHVybiBEYXRlVGltZS5mcm9tTW9tZW50KFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQubG9jYWxlKCBsb2NhbGUgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGlzIERhdGVUaW1lIGluc3RhbmNlIGlzIHZhbGlkLlxuXHQgKlxuXHQgKiBUeXBpY2FsbHkgYW4gaW52YWxpZCBzdGF0ZSBpcyBhY2hpZXZlZCB3aGVuIHRoZSBpbnRlcm5hbCBtb21lbnQgaXNcblx0ICogaW52YWxpZC4gIFRoaXMgY2FuIGhhcHBlbiB3aGVuIHRoZSBtb21lbnQgaW5zdGFuY2UgaXMgY3JlYXRlZCB3aXRoXG5cdCAqIGludmFsaWQgcGFyYW1ldGVycy5cblx0ICpcblx0ICogTm90ZTogd2l0aCBtb21lbnQudGltZXpvbmUgKHdoaWNoIGlzIHRoZSBpbnRlcm5hbCBsaWJyYXJ5KSxcblx0ICogbW9tZW50LmlzVmFsaWQoKSBjb3VsZCByZXR1cm4gdHJ1ZSwgZmFsc2Ugb3IgYSBzdHJpbmcgZm9yIHdoeSBpdCdzXG5cdCAqIGludmFsaWQuICBUaGlzIGlzIHdoeSBhIHN0cmljdCBlcXVhbGl0eSBjaGVjayBpcyBkb25lIGZvciB3aGV0aGVyIGl0IGlzXG5cdCAqIHRydWUgb3Igbm90LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGUgaW5zdGFuY2UgaXMgdmFsaWQuXG5cdCAqL1xuXHRpc1ZhbGlkKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmlzVmFsaWQoKSA9PT0gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIERhdGVUaW1lIGluc3RhbmNlcyBhcyBhIER1cmF0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBvdGhlckRhdGVUaW1lXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBbiBpbnN0YW5jZSBvZiBEdXJhdGlvbiByZXByZXNlbnRpbmcgdGhlIGRpZmZlcmVuY2Vcblx0ICogYmV0d2VlbiB0aGUgdHdvIERhdGVUaW1lIG9iamVjdHMuXG5cdCAqL1xuXHRkaWZmKCBvdGhlckRhdGVUaW1lICkge1xuXHRcdERhdGVUaW1lLmFzc2VydElzRGF0ZVRpbWUoIG90aGVyRGF0ZVRpbWUgKTtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0bW9tZW50LmR1cmF0aW9uKFxuXHRcdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdXG5cdFx0XHRcdFx0LmRpZmYoIG90aGVyRGF0ZVRpbWVbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0gKVxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoaXMgRGF0ZVRpbWUgYW5kIFwibm93XCIgYXMgYSBEdXJhdGlvbi5cblx0ICogQHJldHVybiB7RHVyYXRpb259IEFuIGluc3RhbmNlIG9mIER1cmF0aW9uIHJlcHJlc2VudGluZyB0aGUgZGlmZmVyZW5jZVxuXHQgKiBiZXR3ZWVuIHRoaXMgRGF0ZVRpbWUgYW5kIFwibm93XCJcblx0ICovXG5cdGRpZmZOb3coKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbihcblx0XHRcdG1vbWVudC5kdXJhdGlvbihcblx0XHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHRcdC5kaWZmKCBtb21lbnQoKSApXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIHZhbHVlIG9mIHRoaXMgRGF0ZVRpbWUgdG8gdGhlIGVuZCAoaS5lLiB0aGUgbGFzdCBtaWxsaXNlY29uZCkgb2Zcblx0ICogYSB1bml0IG9mIHRpbWUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1bml0XG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfSBSZXR1cm5zIGEgbmV3IERhdGVUaW1lIGluc3RhbmNlLlxuXHQgKi9cblx0ZW5kT2YoIHVuaXQgKSB7XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmNsb25lKCkuZW5kT2YoIHVuaXQgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgdGhpcyBEYXRlVGltZSB3aXRoIHByb3ZpZGVkIERhdGVUaW1lIGFuZCByZXR1cm5zIHdoZXRoZXIgdGhleVxuXHQgKiBhcmUgZXF1YWwgdG8gZWFjaCBvdGhlci5cblx0ICpcblx0ICogVGhlIHR3byBEYXRlVGltZXMgYXJlIGNvbnNpZGVyZWQgZXF1YWwgaWYgdGhleSByZXByZXNlbnQgdGhlIHNhbWVcblx0ICogbWlsbGlzZWNvbmQsIGhhdmUgdGhlIHNhbWUgem9uZSBhbmQgbG9jYXRpb24sIGFuZCBhcmUgYm90aCB2YWxpZC5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlVGltZX0gb3RoZXJEYXRlVGltZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGV5IGFyZSBlcXVhbFxuXHQgKi9cblx0ZXF1YWxzKCBvdGhlckRhdGVUaW1lICkge1xuXHRcdERhdGVUaW1lLmFzc2VydElzRGF0ZVRpbWUoIG90aGVyRGF0ZVRpbWUgKTtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0LmlzU2FtZSggb3RoZXJEYXRlVGltZVsgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhpcyBEYXRlVGltZSBpcyBpbiB0aGUgc2FtZSB1bml0IG9mIHRpbWUgYXMgYW5vdGhlciBEYXRlVGltZVxuXHQgKlxuXHQgKiBlZy4gRGF0ZVRpbWUuZnJvbUxvY2FsKCkuaGFzU2FtZSggb3RoZXJEVCwgJ2RheScgKSAvL34+IHRydWUgaWYgYm90aCB0aGVcblx0ICogc2FtZSBjYWxlbmRhciBkYXkuXG5cdCAqXG5cdCAqIE5vdGU6IHRoaXMgd2lsbCBtYXRjaCBhbGwgdW5pdHMgZXF1YWwgb3IgbGFyZ2VyLiAgRm9yIGV4YW1wbGUsIHBhc3NpbmcgaW5cblx0ICogYG1vbnRoYCB3aWxsIGNoZWNrIGBtb250aGAgYW5kIGB5ZWFyYC4gIFNvIGl0J3Mgbm90IG9ubHkgY2hlY2tpbmcgaWYgdGhlXG5cdCAqIHR3byBkYXRlcyBzaGFyZSB0aGUgc2FtZSBtb250aCwgYnV0IHRoYXQgdGhleSBhcmUgdGhlIHNhbWUgbW9udGggaW4gdGhlXG5cdCAqIHNhbWUgeWVhci4gIElmIHlvdSBwYXNzZWQgaW4gZGF5LCBpdCB3b3VsZCByZXR1cm4gd2hldGhlciB0aGUgcHJvdmlkZWRcblx0ICogRGF0ZVRpbWUgaXMgaW4gdGhlIHNhbWUgZGF5LCBtb250aCBhbmQgeWVhciBhcyB0aGlzIERhdGVUaW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBvdGhlckRhdGVUaW1lXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1bml0XG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoZXkgYXJlIGJvdGggaW4gdGhlIHNhbWUgdGltZSBmb3IgdGhlXG5cdCAqIGdpdmVuIHVuaXQuXG5cdCAqL1xuXHRoYXNTYW1lKCBvdGhlckRhdGVUaW1lLCB1bml0ICkge1xuXHRcdERhdGVUaW1lLmFzc2VydElzRGF0ZVRpbWUoIG90aGVyRGF0ZVRpbWUgKTtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0LmlzU2FtZSggb3RoZXJEYXRlVGltZVsgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXSwgdW5pdCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFN1YnRyYWN0IGEgcGVyaW9kIG9mIHRpbWUgKHJlcHJlc2VudGVkIGJ5IGEgRHVyYXRpb24pIGZyb20gdGhpcyBEYXRlVGltZVxuXHQgKiBhbmQgcmV0dXJuIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RHVyYXRpb259IGR1cmF0aW9uXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfSBBIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZSBmb3IgdGhlIG5ldyBkYXRlIGFuZCB0aW1lLlxuXHQgKi9cblx0bWludXMoIGR1cmF0aW9uICkge1xuXHRcdER1cmF0aW9uLmFzc2VydElzVmFsaWREdXJhdGlvbiggZHVyYXRpb24gKTtcblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0LnN1YnRyYWN0KCBkdXJhdGlvbi50b09iamVjdCgpIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBhIHBlcmlvZCBvZiB0aW1lIChyZXByZXNlbnRlZCBieSBhIER1cmF0aW9uKSB0byB0aGlzIERhdGVUaW1lIGFuZFxuXHQgKiByZXR1cm4gdGhlIHJlc3VsdGluZyBEYXRlVGltZVxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufSBkdXJhdGlvblxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gQSBuZXcgaW5zdGFuY2Ugb2YgRGF0ZVRpbWUgZm9yIHRoZSBuZXcgZGF0ZSBhbmQgdGltZS5cblx0ICovXG5cdHBsdXMoIGR1cmF0aW9uICkge1xuXHRcdER1cmF0aW9uLmFzc2VydElzVmFsaWREdXJhdGlvbiggZHVyYXRpb24gKTtcblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0LmFkZCggZHVyYXRpb24udG9PYmplY3QoKSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIHZhbHVlIG9mIHRoaXMgRGF0ZVRpbWUgdG8gdGhlIGJlZ2lubmluZyBvZiBhIHNwZWNpZmllZCB1bml0IG9mXG5cdCAqIHRpbWUgYW5kIHJldHVybiBhIG5ldyBEYXRlVGltZSByZXByZXNlbnRpbmcgdGhhdC5cblx0ICpcblx0ICogZWcuXG5cdCAqIHN0YXJ0T2YoIERhdGVUaW1lLlVOSVRfWUVBUiApIC8vc2V0cyB0byBKYW51YXJ5IDFzdCwgMTI6MDBhbSB0aGlzXG5cdCAqIHllYXIuXG5cdCAqIHN0YXJ0T2YoIERhdGVUaW1lLlVOSVRfTU9OVEggKSAvL3NldHMgdG8gdGhlIGZpcnN0IG9mIHRoaXMgbW9udGgsIDEyOjAwYW1cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHVuaXRcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9IEEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzdGFydE9mKCB1bml0ICkge1xuXHRcdHJldHVybiBEYXRlVGltZS5mcm9tTW9tZW50KFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5jbG9uZSgpLnN0YXJ0T2YoIHVuaXQgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lIGZvcm1hdHRlZCBhY2NvcmRpbmcgdG9cblx0ICogdGhlIHNwZWNpZmllZCBmb3JtYXQgc3RyaW5nLlxuXHQgKlxuXHQgKiBAbGluayBodHRwczovL21vbWVudGpzLmNvbS9kb2NzLyMvZGlzcGxheWluZy9mb3JtYXQvXG5cdCAqIEBzZWUgTW9tZW50IGZvcm1hdCBeXiBzZWN0aW9uIGZvciB0aGUgYXZhaWxhYmxlIGZvcm1hdHMgdGhhdCBjYW4gYmUgdXNlZC5cblx0ICpcblx0ICogQW4gZW1wdHkgZm9ybWF0IHZhbHVlIHdpbGwgcmV0dXJuIHRoZSBzdHJpbmcgZm9ybWF0dGVkIGluIElTTyA4NjAxIHdpdGhcblx0ICogYW55IG9mZnNldCBpbmNsdWRlZC5cblx0ICpcblx0ICogV2l0aG91dCBhbnkgYXJndW1lbnQgcGFzc2VkLCB0aGUgZm9ybWF0IHdpbGwgYmUgd2hhdGV2ZXIgc3RyaW5nIHRoZVxuXHQgKiBmb3JtYXQgaXMgc2VydmVyIHNpZGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXRcblx0ICogQHJldHVybiB7c3RyaW5nfSAgVGhlIGRhdGUgYW5kIHRpbWUgZGlzcGxheWVkIGFjY29yZGluZyB0byB0aGUgcHJvdmlkZWRcblx0ICogZm9ybWF0LlxuXHQgKi9cblx0dG9Gb3JtYXQoIGZvcm1hdCA9IERFRkFVTFRfRk9STUFUICkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmZvcm1hdCggZm9ybWF0ICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lIGZvcm1hdHRlZCBhY2NvcmRpbmcgdG9cblx0ICogdGhlIElTTyA4NjAxIHN0YW5kYXJkLlxuXHQgKlxuXHQgKiBJZiBgaW5VVENgIGlzIHRydWUgKGRlZmF1bHQpIHRoZW4gYHRvSVNPYCB3aWxsIHJldHVybiB0aGUgSVNPIHN0cmluZyBpblxuXHQgKiBVVEMuIE90aGVyd2lzZSBpdCB3aWxsIGluY2x1ZGUgdGhlIG9mZnNldCBpbmZvcm1hdGlvbiBmb3IgdGhlIGludGVybmFsXG5cdCAqIHRpbWV6b25lL29mZnNldCBvbiB0aGUgbW9tZW50IGluIHRpbWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5VVENcblx0ICogQHJldHVybiB7c3RyaW5nfSBBbiBJU084NjAxIHN0cmluZ1xuXHQgKi9cblx0dG9JU08oIGluVVRDID0gdHJ1ZSApIHtcblx0XHRyZXR1cm4gaW5VVEMgP1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS50b0lTT1N0cmluZygpIDpcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0udG9JU09TdHJpbmcoIHRydWUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBmb3IgdGhpcyBEYXRlVGltZSBhcyBhIGphdmFzY3JpcHQgRGF0ZSBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0RhdGV9IEEgamF2YXNjcmlwdCBEYXRlIGluc3RhbmNlXG5cdCAqL1xuXHR0b0pTRGF0ZSgpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS50b0RhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGVuIHNlcmlhbGl6aW5nIGFuIG9iamVjdCB0byBKU09OLCBpZiB0aGVyZSBpcyBhIERhdGVUaW1lIGluc3RhbmNlLCBpdFxuXHQgKiB3aWxsIGJlIHJlcHJlc2VudGVkIGFzIGFuIElTTzg2MDEgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IEFuIElTTyA4NjAxIHN0cmluZ1xuXHQgKi9cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnRvSVNPU3RyaW5nKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBEYXRlVGltZSB0byB3aGF0ZXZlciB0aGUgXCJsb2NhbFwiIHRpbWUgaXMuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgRGF0ZVRpbWVcblx0ICovXG5cdHRvTG9jYWwoKSB7XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmNsb25lKCkubG9jYWwoKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgbWlsbGlzZWNvbmRzIHNpbmNlIHRoZSBVbml4IEVwb2NoIGZvciB0aGUgY3VycmVudCBEYXRlVGltZVxuXHQgKiBpbnN0YW5jZS5cblx0ICogQHJldHVybiB7bnVtYmVyfSBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIHNpbmNlIFVuaXggRXBvY2hcblx0ICovXG5cdHRvTWlsbGlzKCkge1xuXHRcdHJldHVybiB0aGlzLnZhbHVlT2YoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgc2ltcGxlIG9iamVjdCBjb250YWluaW5nIHllYXIsIG1vbnRoLCBkYXksIGhvdXIsXG5cdCAqIG1pbnV0ZSwgc2Vjb25kLCBhbmQgbWlsbGlzZWNvbmQuXG5cdCAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IHdpdGggeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsXG5cdCAqIGFuZCBtaWxsaXNlY29uZC5cblx0ICovXG5cdHRvT2JqZWN0KCkge1xuXHRcdGNvbnN0IGRhdGV0aW1lID0gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS50b09iamVjdCgpO1xuXHRcdHJldHVybiByZWR1Y2UoIGRhdGV0aW1lLCAoIHJlc3VsdCwgdmFsdWUsIGtleSApID0+IHtcblx0XHRcdGtleSA9IERhdGVUaW1lWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0TmFtZSBdKCBrZXkgKTtcblx0XHRcdHJlc3VsdFsga2V5IF0gPSBEYXRlVGltZVsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdFZhbHVlIF0oXG5cdFx0XHRcdGtleSxcblx0XHRcdFx0dmFsdWUsXG5cdFx0XHRcdGZhbHNlXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LCB7fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIHRoZSBEYXRlVGltZSdzIHRpbWV6b25lIHRvIFVUQy5cblx0ICpcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9IEEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHR0b1VUQygpIHtcblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uY2xvbmUoKS51dGMoKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBlbmdsaXNoIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lIHdoZW4gdGhlIGluc3RhbmNlIGlzXG5cdCAqIGNvZXJjZWQgdG8gYSBzdHJpbmcgKHNpbWlsYXIgZm9ybWF0IHRvIEpTIGBEYXRlLnRvU3RyaW5nKClgLlxuXHQgKlxuXHQgKiBlZyBgVHVlIERlYyAyNSAyMDE4IDEwOjE1OjAwIEdNVCswMDAwYFxuXHQgKlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IEEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWVcblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnRvU3RyaW5nKCk7XG5cdH1cblxuXHQvKipcblx0ICogV2hlbiBEYXRlVGltZSBpcyBjb2VyY2VkIHRvIG51bWJlciB0aGlzIHdpbGwgZW5zdXJlIGl0cyBkaXNwbGF5ZWQgYXMgdGhlXG5cdCAqIG51bWJlciBvZiBtaWxsaXNlY29uZHMgc2luY2UgdGhlIFVuaXggRXBvY2ggZm9yIHRoZSBjdXJyZW50IERhdGVUaW1lXG5cdCAqXG5cdCAqIEByZXR1cm4ge251bWJlcn0gQW1vdW50IG9mIG1pbGxpc2Vjb25kcyBzaW5jZSB0aGUgVW5peCBFcG9jaFxuXHQgKi9cblx0dmFsdWVPZigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS52YWx1ZU9mKCk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGVzZSBzdGF0aWMgcHJvcGVydGllcyBuZWVkIHRvIGJlIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgY2xhc3MgZGVmaW5pdGlvblxuICogYmVjYXVzZSBvZiBjb21waWxlIGlzc3Vlcy5cbiAqL1xuRGF0ZVRpbWUuVU5JVF9ZRUFSID0gJ3llYXInO1xuRGF0ZVRpbWUuVU5JVF9NT05USCA9ICdtb250aCc7XG5EYXRlVGltZS5VTklUX0RBWSA9ICdkYXknO1xuRGF0ZVRpbWUuVU5JVF9IT1VSID0gJ2hvdXInO1xuRGF0ZVRpbWUuVU5JVF9NSU5VVEUgPSAnbWludXRlJztcbkRhdGVUaW1lLlVOSVRfU0VDT05EID0gJ3NlY29uZCc7XG5EYXRlVGltZS5VTklUX01JTExJU0VDT05EID0gJ21pbGxpc2Vjb25kJztcbkRhdGVUaW1lLlRJTUVaT05FX0xPQ0FMID0gJ2xvY2FsJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRUSU1FWk9ORV9DT05GSUcsXG5cdFNFUlZFUl9MT0NBTEUsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHtcblx0Rk9STUFUX1NJVEVfREFURSxcblx0Rk9STUFUX1NJVEVfVElNRSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaGVscGVycyc7XG5pbXBvcnQgeyB2YWxpZGF0ZUxvY2FsZSB9IGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5cbmltcG9ydCB7IHNuYWtlQ2FzZSB9IGZyb20gJ2xvZGFzaCc7XG4vKipcbiAqIERlZmF1bHQgdGltZXpvbmUgc3RyaW5nIHRvIHVzZS5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9USU1FWk9ORV9TVFJJTkcgPSBUSU1FWk9ORV9DT05GSUcuc3RyaW5nID09PSAnJyA/XG5cdCdVVEMnIDpcblx0VElNRVpPTkVfQ09ORklHLnN0cmluZztcblxuLyoqXG4gKiBEZWZhdWx0IG9mZnNldFxuICpcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX09GRlNFVCA9IFRJTUVaT05FX0NPTkZJRy5vZmZzZXQ7XG5cbi8qKlxuICogV2hldGhlciB0aGVyZSBpcyBhIGRlZmF1bHQgdGltZXpvbmUgc3RyaW5nIHRvIHVzZS5cbiAqIFRoaXMgaGVscHMgd2l0aCBkZXRlcm1pbmluZyB3aGV0aGVyIHRvIHVzZSB0aGUgb2Zmc2V0IG9yIG5vdCBmb3IgY29uc3RydWN0aW5nXG4gKiBEYXRlVGltZSB2YWx1ZSBvYmplY3RzLlxuICpcbiAqIEB0eXBlIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgSEFTX1RJTUVaT05FX1NUUklORyA9IChcblx0REVGQVVMVF9USU1FWk9ORV9TVFJJTkcgIT09ICdVVEMnIHx8XG5cdCEgKCBERUZBVUxUX1RJTUVaT05FX1NUUklORyA9PT0gJ1VUQycgJiYgREVGQVVMVF9PRkZTRVQgIT09IDAgKVxuKTtcblxuLyoqXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfRk9STUFUID0gRk9STUFUX1NJVEVfREFURSArICcgJyArIEZPUk1BVF9TSVRFX1RJTUU7XG5cbi8qKlxuICogRXhwb3NlcyB3aGF0IHRvIHVzZSBmb3IgdGhlIGRlZmF1bHQgbG9jYWxlLlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9DQUxFID0gc25ha2VDYXNlKCBTRVJWRVJfTE9DQUxFLnVzZXIgKTtcblxuLyoqXG4gKiBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgcHJvdmlkZWQgbG9jYWxlIGlzIHZhbGlkLiAgU28gaWYgYERFRkFVTFRfTE9DQUxFYCBpc1xuICogbm90IHZhbGlkIGZvciB0aGlzIGVudmlyb25tZW50LCB0aGVuIGEgZmFsbGJhY2sgb2YgJ2VuJyBsb2NhbGUgaXMgdXNlZC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9WQUxJRF9MT0NBTEUgPSB2YWxpZGF0ZUxvY2FsZSggREVGQVVMVF9MT0NBTEUgKSA/XG5cdERFRkFVTFRfTE9DQUxFIDpcblx0J2VuJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgbW9tZW50RHVyYXRpb25Gb3JtYXRTZXR1cCBmcm9tICdtb21lbnQtZHVyYXRpb24tZm9ybWF0JztcbmltcG9ydCB7IGNhcGl0YWxpemUsIHBpY2ssIGtleXMsIG9taXQsIG1hcFZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgaXNTaGFsbG93RXF1YWwgZnJvbSAnQHdvcmRwcmVzcy9pcy1zaGFsbG93LWVxdWFsJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuaW1wb3J0IHsgaW5zdGFuY2VPZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgYXNzZXJ0aW9ucyBmcm9tICcuL2Fzc2VydGlvbnMnO1xuaW1wb3J0IHtcblx0REVGQVVMVF9WQUxJRF9MT0NBTEUsXG59IGZyb20gJy4vZGVmYXVsdHMnO1xuXG5tb21lbnREdXJhdGlvbkZvcm1hdFNldHVwKCBtb21lbnQgKTtcblxuLyoqXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc3ltYm9scyB1c2VkIGZvciBcInByaXZhdGVcIiBwcm9wZXJ0aWVzIGluIHRoZSBEdXJhdGlvbiBvYmplY3QuXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRkdXJhdGlvbjogU3ltYm9sLFxuICogXHRcdHZhbHVlczogU3ltYm9sLFxuICogXHRcdGlzVmFsaWQ6IFN5bWJvbCxcbiAqIFx0fVxuICogfVxuICovXG5jb25zdCBwcml2YXRlUHJvcGVydGllcyA9IHtcblx0ZHVyYXRpb246IFN5bWJvbCggJ0R1cmF0aW9uUHJpdmF0ZVByb3BlcnRpZXNEdXJhdGlvbicgKSxcblx0ZHVyYXRpb25WYWx1ZXM6IFN5bWJvbCggJ0R1cmF0aW9uUHJpdmF0ZVByb3BlcnRpZXNEdXJhdGlvblZhbHVlcycgKSxcblx0aXNWYWxpZDogU3ltYm9sKCAnRHVyYXRpb25Qcml2YXRlUHJvcGVydGllc0lzVmFsaWQnICksXG59O1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBzeW1ib2xzIHVzZWQgZm9yIFwicHJpdmF0ZVwiIG1ldGhvZHMgaW4gdGhlIER1cmF0aW9uIG9iamVjdC5cbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGNyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzOiBTeW1ib2wsXG4gKiBcdFx0Z2V0QWxsVW5pdE5hbWVzOiBTeW1ib2wsXG4gKiBcdFx0cG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb246IFN5bWJvbCxcbiAqIFx0XHRzZXRWYWx1ZXM6IFN5bWJvbCxcbiAqIFx0ICAgIGZpbHRlclZhbHVlczogU3ltYm9sLFxuICogXHR9XG4gKiB9XG4gKi9cbmNvbnN0IHByaXZhdGVNZXRob2RzID0ge1xuXHRjcmVhdGVHZXR0ZXJzOiBTeW1ib2woICdEdXJhdGlvblByaXZhdGVNZXRob2RzQ3JlYXRlR2V0dGVycycgKSxcblx0Z2V0QWxsVW5pdE5hbWVzOiBTeW1ib2woICdEdXJhdGlvblByaXZhdGVNZXRob2RzR2V0QWxsVW5pdE5hbWVzJyApLFxuXHRwb3B1bGF0ZVZhbHVlc0Zyb21EdXJhdGlvbjogU3ltYm9sKFxuXHRcdCdEdXJhdGlvblByaXZhdGVNZXRob2RzUG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb24nXG5cdCksXG5cdHNldFZhbHVlczogU3ltYm9sKCAnRHVyYXRpb25Qcml2YXRlTWV0aG9kc1NldFZhbHVlcycgKSxcblx0ZmlsdGVyVmFsdWVzOiBTeW1ib2woICdEdXJhdGlvblByaXZhdGVNZXRob2RzRmlsdGVyVmFsdWVzJyApLFxufTtcblxuLyoqXG4gKiBBbiBhcnJheSBvZiB1bml0IG5hbWVzIGZvciBwcm9wZXJ0aWVzIGluIHRoZSBEdXJhdGlvbiBvYmplY3RcbiAqIEB0eXBlIHtzdHJpbmdbXX1cbiAqL1xuY29uc3QgdW5pdE5hbWVzID0gW1xuXHQneWVhcnMnLFxuXHQnbW9udGhzJyxcblx0J2RheXMnLFxuXHQnaG91cnMnLFxuXHQnbWludXRlcycsXG5cdCdzZWNvbmRzJyxcblx0J21pbGxpc2Vjb25kcycsXG5dO1xuXG4vKipcbiAqIEFuIGFycmF5IG9mIGRlcml2YXRpdmUgdW5pdCBuYW1lcy5cbiAqIFRoZXNlIGFyZSBhY2Nlc3NvcnMgdGhhdCBhcmUgZGVyaXZhdGl2ZXMgb2YgYmFzZSB1bml0cy4gIEZvciBpbnN0YW5jZSxcbiAqIFwid2Vla3NcIiBlbmRzIHVwIGJlaW5nIGEgZGVyaXZhdGl2ZSAoY2FsY3VsYXRlZCBmcm9tKSB0aGUgXCJkYXlzXCIgdW5pdC5cbiAqIEB0eXBlIHtzdHJpbmdbXX1cbiAqL1xuY29uc3QgZGVyaXZhdGl2ZVVuaXROYW1lcyA9IFtcblx0J3dlZWtzJyxcbl07XG5cbi8qKlxuICogV2hlcmUgYSBEYXRlVGltZSBvYmplY3QgcmVwcmVzZW50cyBhIHNpbmdsZSBwb2ludCBpbiB0aW1lLCBhIER1cmF0aW9uIG9iamVjdFxuICogcmVwcmVzZW50cyBhIGxlbmd0aCBvZiB0aW1lLlxuICpcbiAqIER1cmF0aW9ucyBkbyBub3QgaGF2ZSBhIGRlZmluZWQgYmVnaW5uaW5nIGFuZCBlbmQgZGF0ZS4gIFRoZXkgYXJlIGNvbnRleHRsZXNzLlxuICpcbiAqIEFzIGFuIGV4YW1wbGUsIGR1cmF0aW9ucyBhcmUgcmVwcmVzZW50YXRpdmUgb2Ygc29tZXRoaW5nIGxpa2UgXCIyIGhvdXJzXCIgYW5kXG4gKiBub3QgcmVwcmVzZW50YXRpdmUgb2Ygc29tZXRoaW5nIGxpa2UgXCJiZXR3ZWVuIDFwbSBhbmQgM3BtXCIuXG4gKlxuICogSW50ZXJuYWxseSwgdGhlIER1cmF0aW9uIGNsYXNzIGhlcmUgdXNlcyBgbW9tZW50LkR1cmF0aW9uYC4gIFRoaXMgaXMgYW5cbiAqIGFic3RyYWN0aW9uIGxvb3NlbHkgZm9sbG93aW5nIHRoZSBhZGFwdGVyIHBhdHRlcm4gc28gdGhhdCB0aGVyZSBpcyBhIGNvbW1vblxuICogYXBpIHRoYXQgY2FuIGJlIGRlcGVuZGVkIG9uIGlmIGluIHRoZSBmdXR1cmUgdGhlIGludGVybmFsIGxpYnJhcnkgaXMgc3dpdGNoZWRcbiAqIHRvIHNvbWV0aGluZyBkaWZmZXJlbnQgKHN1Y2ggYXMgTHV4b24pLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEdXJhdGlvbiB7XG5cdHN0YXRpYyBVTklUX1lFQVJTID0gJ3llYXJzJztcblx0c3RhdGljIFVOSVRfTU9OVEhTID0gJ21vbnRocyc7XG5cdHN0YXRpYyBVTklUX0RBWVMgPSAnZGF5cyc7XG5cdHN0YXRpYyBVTklUX0hPVVJTID0gJ2hvdXJzJztcblx0c3RhdGljIFVOSVRfTUlOVVRFUyA9ICdtaW51dGVzJztcblx0c3RhdGljIFVOSVRfU0VDT05EUyA9ICdzZWNvbmRzJztcblx0c3RhdGljIFVOSVRfTUlMTElTRUNPTkRTID0gJ21pbGxpc2Vjb25kcyc7XG5cdHN0YXRpYyBVTklUX1dFRUtTID0gJ3dlZWtzJztcblxuXHQvKipcblx0ICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgRHVyYXRpb24gY2xhc3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fG1vbWVudC5EdXJhdGlvbnxzdHJpbmd8bnVtYmVyfSB2YWx1ZXNcblx0ICogUmVjZWl2aW5nIGEgbW9tZW50LkR1cmF0aW9uIG9iamVjdCBpcyBzb21ldGhpbmcgZm9yIGludGVybmFsIHVzZSBhbmQgc2hvdWxkIG5vdCBiZSB1c2VkIGRpcmVjdGx5IHZpYVxuXHQgKiBjbGllbnQgY29kZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZSAgQSB2YWxpZCBsb2NhbGUgc3RyaW5nLlxuXHQgKiBcdFx0XHRcdFx0XHRcdEBsaW5rIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzU2NDZcblx0ICovXG5cdGNvbnN0cnVjdG9yKCB2YWx1ZXMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmlzVmFsaWQgXSA9IHRydWU7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0XHRpZiAoIHR5cGVvZiB2YWx1ZXMgIT09ICdvYmplY3QnICkge1xuXHRcdFx0dmFsdWVzID0gbW9tZW50LmR1cmF0aW9uKCB2YWx1ZXMgKS5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdH1cblx0XHRpZiAoIG1vbWVudC5pc0R1cmF0aW9uKCB2YWx1ZXMgKSApIHtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF0gPSB2YWx1ZXM7XG5cdFx0XHR0aGlzWyBwcml2YXRlTWV0aG9kcy5wb3B1bGF0ZVZhbHVlc0Zyb21EdXJhdGlvbiBdKCB2YWx1ZXMgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFsdWVzID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMuZmlsdGVyVmFsdWVzIF0oIHZhbHVlcyApO1xuXHRcdFx0dGhpc1sgcHJpdmF0ZU1ldGhvZHMuc2V0VmFsdWVzIF0oIHZhbHVlcyApO1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXSA9IG1vbWVudC5kdXJhdGlvbihcblx0XHRcdFx0dmFsdWVzXG5cdFx0XHQpLmxvY2FsZSggbG9jYWxlICk7XG5cdFx0fVxuXHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmNyZWF0ZUdldHRlcnMgXSgpO1xuXHRcdE9iamVjdC5mcmVlemUoIHRoaXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgRHVyYXRpb24gZnJvbSBhIG51bWJlciBvZiBtaWxsaXNlY29uZHMuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBtaWxsaXNlY29uZHNcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gIEFuIGluc3RhbmNlIG9mIER1cmF0aW9uLlxuXHQgKi9cblx0c3RhdGljIGZyb21NaWxsaXNlY29uZHMoIG1pbGxpc2Vjb25kcywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUgKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbiggeyBtaWxsaXNlY29uZHMgfSwgbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uIGZyb20gYSBzaW1wbGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzICBLZXlzIHNob3VsZCBiZSB0aGUgdW5pdHMgKGVnICd5ZWFycycsICdkYXlzJykuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RHVyYXRpb259IEFuIGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRzdGF0aWMgZnJvbU9iamVjdCggdmFsdWVzLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSApIHtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKCB2YWx1ZXMsIGxvY2FsZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBEdXJhdGlvbiBmcm9tIGFuIElTTzg2MDEgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gSVNPU3RyaW5nIChlZy4gJ1BUMjNIJylcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQW4gaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdHN0YXRpYyBmcm9tSVNPKCBJU09TdHJpbmcsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SVNPODYwMUlzVmFsaWQoIElTT1N0cmluZywgdHJ1ZSApO1xuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oIElTT1N0cmluZywgbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGUgd2hldGhlciB0aGUgcHJvdmlkZWQgbG9jYWxlIGFyZ3VtZW50IGlzIGEgdmFsaWQgbG9jYWxlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIGlzVmFsaWRMb2NhbGUoIGxvY2FsZSApIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZUxvY2FsZSggbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCBsb2NhbGUgYXJndW1lbnQgaXMgYSB2YWxpZCBsb2NhbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHRocm93cyBJbnZhbGlkTG9jYWxlXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNWYWxpZExvY2FsZSggbG9jYWxlICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGUgd2hldGhlciB0aGUgcHJvdmlkZWQgc3RyaW5nIGlzIGEgdmFsaWQgSVNPIDg2MDEgRHVyYXRpb24gc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaXNvU3RyaW5nXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgaXQgaXMgdmFsaWQuXG5cdCAqL1xuXHRzdGF0aWMgaXNWYWxpZElTTzg2MDFEdXJhdGlvbiggaXNvU3RyaW5nICkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlSVNPODYwMSggaXNvU3RyaW5nLCB0cnVlICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0IHdoZXRoZXIgdGhlIHByb3ZpZGVkIHN0cmluZyBpcyBhIHZhbGlkIElTTyA4NjAxIER1cmF0aW9uIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlzb1N0cmluZ1xuXHQgKiBAdGhyb3dzIEludmFsaWRJU084NjAxU3RyaW5nXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNWYWxpZElTTzg2MDFEdXJhdGlvbiggaXNvU3RyaW5nICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SVNPODYwMUlzVmFsaWQoIGlzb1N0cmluZyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIGluc3RhbmNlIG9mIER1cmF0aW9uLlxuXHQgKiBAcGFyYW0ge21peGVkfER1cmF0aW9ufWR1cmF0aW9uXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIGEgdmFsaWQgRHVyYXRpb24gb2JqZWN0LlxuXHQgKi9cblx0c3RhdGljIGlzVmFsaWREdXJhdGlvbiggZHVyYXRpb24gKSB7XG5cdFx0cmV0dXJuIGluc3RhbmNlT2YoIGR1cmF0aW9uLCAnRHVyYXRpb24nICkgJiZcblx0XHRcdGR1cmF0aW9uLmlzVmFsaWQ7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIER1cmF0aW9uIGFuZCB0aHJvd3MgYW5cblx0ICogZXhjZXB0aW9uIGlmIG5vdC5cblx0ICogQHBhcmFtIHttaXhlZHxEdXJhdGlvbn0gZHVyYXRpb25cblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc1ZhbGlkRHVyYXRpb24oIGR1cmF0aW9uICkge1xuXHRcdGlmICggISBEdXJhdGlvbi5pc1ZhbGlkRHVyYXRpb24oIGR1cmF0aW9uICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhpcyBEdXJhdGlvbiBvYmplY3QgaXMgbm90IHZhbGlkLidcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEdXJhdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbnxtaXhlZH0gZHVyYXRpb25cblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhlIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uLlxuXHQgKiBOb3RlOiB0cnVlIG1heSBzdGlsbCBtZWFuIHRoYXQgdGhlIER1cmF0aW9uIGluc3RhbmNlIGlzIG5vdCB2YWxpZCFcblx0ICovXG5cdHN0YXRpYyBpc0R1cmF0aW9uKCBkdXJhdGlvbiApIHtcblx0XHRyZXR1cm4gaW5zdGFuY2VPZiggZHVyYXRpb24sICdEdXJhdGlvbicgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uIGFuZCBpZiBub3Rcblx0ICogdGhyb3dzIGFuIGV4Y2VwdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbnxtaXhlZH0gZHVyYXRpb25cblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc0R1cmF0aW9uKCBkdXJhdGlvbiApIHtcblx0XHRpZiAoICEgRHVyYXRpb24uaXNEdXJhdGlvbiggZHVyYXRpb24gKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuIGluc3RhbmNlIG9mIER1cmF0aW9uLidcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgZmlsdGVycyB0aGUgaW5jb21pbmcgdmFsdWVzIGFuZCByZXR1cm5zIG9ubHkga2V5L3ZhbHVlIHBhaXJzIHRoYXRcblx0ICogYXJlIGFjY2VwdGFibGUgYXMgZHVyYXRpb24gdW5pdHMuXG5cdCAqXG5cdCAqIElmIGEgaW52YWxpZCBkdXJhdGlvbiB1bml0IGlzIGRpc2NvdmVyZWQsIGEgY29uc29sZS5lcnJvciBpcyBnZW5lcmF0ZWRcblx0ICogKGluIG5vbi1wcm9kdWN0aW9uIG1vZGUpLlxuXHQgKlxuXHQgKiBAcGFyYW0ge21peGVkfSB2YWx1ZXNcblx0ICogQHJldHVybiB7T2JqZWN0fSBGaWx0ZXJlZCB2YWx1ZXMuXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yIGlmIGluY29taW5nIHZhbHVlcyBhcmd1bWVudCBpcyBub3QgYW4gb2JqZWN0LlxuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5maWx0ZXJWYWx1ZXMgXSggdmFsdWVzICkge1xuXHRcdGlmICggdHlwZW9mIHZhbHVlcyAhPT0gJ29iamVjdCcgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnSW5jb21pbmcgdmFsdWVzIG11c3QgYmUgYSBzaW1wbGUgb2JqZWN0LicgKTtcblx0XHR9XG5cdFx0Y29uc3QgdmFsdWVzVG9TZXQgPSBwaWNrKCB2YWx1ZXMsIHVuaXROYW1lcyApO1xuXHRcdGlmICggISBpc1NoYWxsb3dFcXVhbCggdmFsdWVzLCB2YWx1ZXNUb1NldCApICkge1xuXHRcdFx0d2FybmluZyhcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdCdUaGUgZm9sbG93aW5nIHVuZXhwZWN0ZWQga2V5cyB3ZXJlIGluIHRoZSBjb25maWd1cmF0aW9uICcgK1xuXHRcdFx0XHQnb2JqZWN0IGZvciBjb25zdHJ1Y3RpbmcgdGhlIER1cmF0aW9uOiAnICtcblx0XHRcdFx0a2V5cyggb21pdCggdmFsdWVzLCB1bml0TmFtZXMgKSApLmpvaW4oKVxuXHRcdFx0KTtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmlzVmFsaWQgXSA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWVzVG9TZXQ7XG5cdH1cblxuXHQvKipcblx0ICogVXNlZCB0byBzZXQgdGhlIGludGVybmFsIFwicHJpdmF0ZVwiIHZhbHVlcyBwcm9wZXJ0eS5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHZhbHVlc1xuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdFsgcHJpdmF0ZU1ldGhvZHMuc2V0VmFsdWVzIF0oIHZhbHVlcyApIHtcblx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvblZhbHVlcyBdID0ge307XG5cdFx0dW5pdE5hbWVzLmZvckVhY2goICggdW5pdCApID0+IHtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uVmFsdWVzIF1bIHVuaXQgXSA9IHZhbHVlc1sgdW5pdCBdIHx8XG5cdFx0XHRcdDA7XG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVzZWQgdG8gc2V0IHRoZSB2YWx1ZXMgXCJwcml2YXRlXCIgcHJvcGVydHkgZnJvbSBhIG1vbWVudC5EdXJhdGlvbiBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bW9tZW50LkR1cmF0aW9ufSBkdXJhdGlvblxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdFsgcHJpdmF0ZU1ldGhvZHMucG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb24gXSggZHVyYXRpb24gKSB7XG5cdFx0Y29uc3Qgc2V0VmFsdWVzID0ge307XG5cdFx0dW5pdE5hbWVzLmZvckVhY2goICggdW5pdCApID0+IHtcblx0XHRcdHNldFZhbHVlc1sgdW5pdCBdID0gZHVyYXRpb25bIHVuaXQgXSgpO1xuXHRcdH0gKTtcblx0XHR0aGlzWyBwcml2YXRlTWV0aG9kcy5zZXRWYWx1ZXMgXSggc2V0VmFsdWVzICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBhcnJheSBvZiBhY2Nlc3NvciBuYW1lcyAodGhhdCBpbiB0dXJuIGFyZSB1c2VkIGZvciBnZW5lcmF0aW5nXG5cdCAqIHByaXZhdGUgcHJvcGVydGllcykuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKiBAcmV0dXJuIHtzdHJpbmdbXX0gIEFycmF5IG9mIGFjY2Vzc29yIG5hbWVzLlxuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5nZXRBbGxVbml0TmFtZXMgXSgpIHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0Li4udW5pdE5hbWVzLFxuXHRcdFx0Li4uZGVyaXZhdGl2ZVVuaXROYW1lcyxcblx0XHRdO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgZ2V0dGVycyBmb3IgdGhlIER1cmF0aW9uIGluc3RhbmNlIGZyb20gdGhlIGFjY2Vzc29yIG5hbWVzLlxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdFsgcHJpdmF0ZU1ldGhvZHMuY3JlYXRlR2V0dGVycyBdKCkge1xuXHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmdldEFsbFVuaXROYW1lcyBdKCkuZm9yRWFjaChcblx0XHRcdCggYWNjZXNzb3JOYW1lICkgPT4ge1xuXHRcdFx0XHQvLyBjcmVhdGVzIGFjY2Vzc29yIGZvciBnZXR0aW5nIHRoZSB2YWx1ZSB2aWEgYSBwcm9wZXJ0eVxuXHRcdFx0XHQvLyBlZy4gaW5zdGFuY2UuaG91cnNcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCB0aGlzLCBhY2Nlc3Nvck5hbWUsIHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGRlcml2YXRpdmVVbml0TmFtZXMuaW5kZXhPZiggYWNjZXNzb3JOYW1lICkgPiAtMSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF1bIGFjY2Vzc29yTmFtZSBdKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpc1xuXHRcdFx0XHRcdFx0XHRbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uVmFsdWVzIF1cblx0XHRcdFx0XHRcdFx0WyBhY2Nlc3Nvck5hbWUgXSB8fFxuXHRcdFx0XHRcdFx0XHQwO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0Ly8gY3JlYXRlcyBgYXMqYCBtZXRob2RzLlxuXHRcdFx0XHQvLyBlZyBgaW5zdGFuY2UuYXNIb3Vyc2Agd291bGQgcmV0dXJuIHRoZSBnaXZlbiBkdXJhdGlvblxuXHRcdFx0XHQvLyBleHByZXNzZWQgYXMgdGhlIGhvdXJzIHVuaXQuXG5cdFx0XHRcdC8vIG5vdGUgZm9yIHVuaXRzIHN1Y2ggYXMgXCJ5ZWFyc1wiIGFuZCBcIm1vbnRoc1wiLCB0aGlzIHVzZXMgd2hhdFxuXHRcdFx0XHQvLyBpcyB0ZXJtZWQgYXMgXCJsb25ndGVybVwiIGNhbGN1bGF0aW9uLiBMb25ndGVybSBpcyBiYXNlZCBvblxuXHRcdFx0XHQvLyBhIDQwMCB5ZWFyIGN5Y2xlIGF2ZXJhZ2luZyBvdXQgdGhlIGRheXMgaW4gYSBtb250aCBhbmRcblx0XHRcdFx0Ly8gZGF5cyBpbiBhIHllYXIgb3ZlciB0aGF0IGN5Y2xlLlxuXHRcdFx0XHQvLyBAbGluayBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9ibG9iL2RldmVsb3Avc3JjL2xpYi9kdXJhdGlvbi9idWJibGUuanMjTDUyXG5cdFx0XHRcdGNvbnN0IGFzTWV0aG9kTmFtZSA9ICdhcycgKyBjYXBpdGFsaXplKCBhY2Nlc3Nvck5hbWUgKTtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCB0aGlzLCBhc01ldGhvZE5hbWUsIHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHRcdFx0XHRcdFsgYXNNZXRob2ROYW1lIF0oKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgdmFsdWUgb2YgbG9jYWxlLlxuXHQgKiBlZy4gaW5zdGFuY2UubG9jYWxlXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGxvY2FsZSBzdHJpbmcuXG5cdCAqL1xuXHRnZXQgbG9jYWxlKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLmxvY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjdXJyZW50IER1cmF0aW9uIGluc3RhbmNlIHJlcHJlc2VudHMgYSB2YWxpZFxuXHQgKiBkdXJhdGlvbi5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGUgRHVyYXRpb24gaW5zdGFuY2UgaXMgdmFsaWQuXG5cdCAqL1xuXHRnZXQgaXNWYWxpZCgpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuaXNWYWxpZCBdICYmXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLnRvSVNPU3RyaW5nKCkgIT09ICdQMEQnO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBuZXcgRHVyYXRpb24gaW5zdGFuY2UgdGhhdCBpcyBpZGVudGljYWwgdG8gdGhpcyBleGNlcHQgdGhlXG5cdCAqIGxvY2FsZSBpcyBjaGFuZ2VkIHRvIHdoYXQgd2FzIHByb3ZpZGVkLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBIG5ldyBpbnN0YW5jZSBvZiBEdXJhdGlvblxuXHQgKi9cblx0c2V0TG9jYWxlKCBsb2NhbGUgKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbiggdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb25WYWx1ZXMgXSwgbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogUmVkdWNlIHRoaXMgRHVyYXRpb24gdG8gaXRzIGNhbm9uaWNhbCByZXByZXNlbnRhdGlvbiBpbiBpdHMgY3VycmVudCB1bml0cy5cblx0ICpcblx0ICogRm9yIGV4YW1wbGU6XG5cdCAqIER1cmF0aW9uXG5cdCAqICAgICAuZnJvbU9iamVjdCh7IHllYXJzOiAyLCBkYXlzOiA1MDAwIH0pXG5cdCAqICAgICAubm9ybWFsaXplKClcblx0ICogICAgIC50b09iamVjdCgpIC8vPT4geyB5ZWFyczogMTUsIG1vbnRoczogOCwgZGF5czogMTIgfVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQSBuZXcgaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdG5vcm1hbGl6ZSgpIHtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKCB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBEdXJhdGlvbiBpbnN0YW5jZSBpcyB0aGUgc2FtZSBhcyB0aGlzXG5cdCAqIER1cmF0aW9uIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufG1peGVkfSBvdGhlckR1cmF0aW9uXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhhdCB0aGUgY29tcGFyZWQgZHVyYXRpb25zIGhhdmUgdGhlIHNhbWVcblx0ICogdW5pdHMgYW5kIHRoZSBzYW1lIHZhbHVlcyBmb3IgZWFjaCB1bml0IChhcyB3ZWxsIGFzIHNhbWUgbG9jYWxlKS4gVGhpc1xuXHQgKiBtZWFucyB0aGF0IGEgZHVyYXRpb24gd2l0aHsgbWludXRlczogNjAgfSB3b3VsZCBiZSBjb25zaWRlcmVkIG5vdCBlcXVhbFxuXHQgKiB0byBhIGR1cmF0aW9uIHdpdGggeyBob3VyczogMSB9LlxuXHQgKi9cblx0c2FtZUFzKCBvdGhlckR1cmF0aW9uICkge1xuXHRcdER1cmF0aW9uLmFzc2VydElzRHVyYXRpb24oIG90aGVyRHVyYXRpb24gKTtcblx0XHRpZiAoICEgdGhpcy5pc1ZhbGlkIHx8ICEgb3RoZXJEdXJhdGlvbi5pc1ZhbGlkICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAoIHRoaXMubG9jYWxlICE9PSBvdGhlckR1cmF0aW9uLmxvY2FsZSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIGlzU2hhbGxvd0VxdWFsKCB0aGlzLnRvT2JqZWN0KCksIG90aGVyRHVyYXRpb24udG9PYmplY3QoKSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgRHVyYXRpb24gaW5zdGFuY2UgaXMgZXF1YWwgdG8gdGhpcyBEdXJhdGlvblxuXHQgKiBpbnN0YW5jZS5cblx0ICpcblx0ICogRXF1YWxpdHkgaXMgYmFzZWQgb246XG5cdCAqIC0gbG9jYWxlIGlzIHRoZSBzYW1lXG5cdCAqIC0gdGhlIG5vcm1hbGl6ZWQgdmFsdWUgb2YgdGhlIGR1cmF0aW9uIGlzIHRoZSBzYW1lLiAgZWcgYSBkdXJhdGlvbiB3aXRoXG5cdCAqIHsgaG91cnM6IDI0IH0gd291bGQgYmUgY29uc2lkZXJlZCBlcXVhbCB0byBhIGR1cmF0aW9uIHdpdGggeyBkYXlzOiAxIH1cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbnxtaXhlZH0gb3RoZXJEdXJhdGlvblxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGNvbnNpZGVyZWQgZXF1YWxcblx0ICovXG5cdGVxdWFscyggb3RoZXJEdXJhdGlvbiApIHtcblx0XHREdXJhdGlvbi5hc3NlcnRJc0R1cmF0aW9uKCBvdGhlckR1cmF0aW9uICk7XG5cdFx0aWYgKCAhIHRoaXMuaXNWYWxpZCB8fCAhIG90aGVyRHVyYXRpb24uaXNWYWxpZCApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKCB0aGlzLmxvY2FsZSAhPT0gb3RoZXJEdXJhdGlvbi5sb2NhbGUgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBpc1NoYWxsb3dFcXVhbChcblx0XHRcdHRoaXMubm9ybWFsaXplKCkudG9PYmplY3QoKSxcblx0XHRcdG90aGVyRHVyYXRpb24ubm9ybWFsaXplKCkudG9PYmplY3QoKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogTWFrZSB0aGlzIGR1cmF0aW9uIGxvbmdlciBieSB0aGUgc3BlY2lmaWVkIGFtb3VudC5cblx0ICpcblx0ICogTm90ZTogdGhlIHJldHVybmVkIER1cmF0aW9uIHdpbGwgaGF2ZSB0aGUgbG9jYWxlIG9mIHRoZSBvcmlnaW5hbFxuXHQgKiByZWdhcmRsZXNzIHdoYXQgdGhlIGxvY2FsZSB3YXMgb24gYW55IHBhc3NlZCBpbiBkdXJhdGlvbi5cblx0ICpcblx0ICogVGhlIG5ldyBEdXJhdGlvbiByZXR1cm5lZCB3aWxsIGhhdmUgbm9ybWFsaXplZCB2YWx1ZXMgKGkuZS4gaWYgYWRkaXRpb25cblx0ICogb2Ygb25lIER1cmF0aW9uIHdpdGggYHsgaG91cnM6IDEwIH1gIGlzIGRvbmUgd2l0aCB0aGUgb3RoZXIgRHVyYXRpb25cblx0ICogaGF2aW5nIGB7IGhvdXJzOiAxNCB9YCB0aGVuIHRoZSBuZXcgRHVyYXRpb24gd2lsbCBoYXZlIGB7IGRheXM6IDEgfWAuXG5cdCAqIFlvdSBjYW4gc3RpbGwgZ2V0IHRoZSB0b3RhbCBob3VycyBieSBjYWxsaW5nIGBuZXdEdXJhdGlvbi5hc0hvdXJzKClgLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufE9iamVjdHxudW1iZXJ9IHZhbHVlICBFaXRoZXIgYSBEdXJhdGlvbiBpbnN0YW5jZSwgYVxuXHQgKiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIG9yIGFuIG9iamVjdCBpbiB0aGUgc2FtZSBzaGFwZSByZWNlaXZlZCBieVxuXHQgKiBEdXJhdGlvbi5mcm9tT2JqZWN0KClcblx0ICpcblx0ICogQHJldHVybiB7RHVyYXRpb259IEEgbmV3IGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRwbHVzKCB2YWx1ZSApIHtcblx0XHRpZiAoIER1cmF0aW9uLmlzRHVyYXRpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdXG5cdFx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0XHQuYWRkKCB2YWx1ZVsgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXSApXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHR2YWx1ZSA9IHRoaXNbIHByaXZhdGVNZXRob2RzLmZpbHRlclZhbHVlcyBdKCB2YWx1ZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQuYWRkKCB2YWx1ZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlIHRoaXMgZHVyYXRpb24gc2hvcnRlciBieSB0aGUgc3BlY2lmaWVkIGFtb3VudFxuXHQgKlxuXHQgKiBOb3RlOiB0aGUgcmV0dXJuZWQgRHVyYXRpb24gd2lsbCBoYXZlIHRoZSBsb2NhbGUgb2YgdGhlIG9yaWdpbmFsXG5cdCAqIHJlZ2FyZGxlc3Mgd2hhdCB0aGUgbG9jYWxlIHdhcyBvbiBhbnkgcGFzc2VkIGluIGR1cmF0aW9uLlxuXHQgKlxuXHQgKiBUaGUgbmV3IER1cmF0aW9uIHJldHVybmVkIHdpbGwgaGF2ZSBub3JtYWxpemVkIHZhbHVlcyAoaS5lLiBpZiBzdWJ0cmFjdGlvblxuXHQgKiBvZiBvbmUgRHVyYXRpb24gd2l0aCBgeyBob3VyczogMzQgfWAgaXMgZG9uZSB3aXRoIHRoZSBvdGhlciBEdXJhdGlvblxuXHQgKiBoYXZpbmcgYHsgaG91cnM6IDEwIH1gIHRoZW4gdGhlIG5ldyBEdXJhdGlvbiB3aWxsIGhhdmUgYHsgZGF5czogMSB9YC5cblx0ICogWW91IGNhbiBzdGlsbCBnZXQgdGhlIHRvdGFsIGhvdXJzIGJ5IGNhbGxpbmcgYG5ld0R1cmF0aW9uLmFzSG91cnMoKWAuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RHVyYXRpb258T2JqZWN0fG51bWJlcn0gdmFsdWUgRWl0aGVyIGEgZHVyYXRpb24gaW5zdGFuY2UsIGFcblx0ICogbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBvciBhbiBvYmplY3QgaW4gdGhlIHNhbWUgc2hhcGUgYXMgdGhhdCByZWNlaXZlZCBieVxuXHQgKiBEdXJhdGlvbi5mcm9tT2JqZWN0KClcblx0ICpcblx0ICogQHJldHVybiB7RHVyYXRpb259IEEgbmV3IGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRtaW51cyggdmFsdWUgKSB7XG5cdFx0aWYgKCBEdXJhdGlvbi5pc0R1cmF0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIG5ldyBEdXJhdGlvbihcblx0XHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHRcdC5jbG9uZSgpXG5cdFx0XHRcdFx0LnN1YnRyYWN0KCB2YWx1ZVsgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXSApXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHR2YWx1ZSA9IHRoaXNbIHByaXZhdGVNZXRob2RzLmZpbHRlclZhbHVlcyBdKCB2YWx1ZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQuc3VidHJhY3QoIHZhbHVlIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG5lZ2F0aXZlIG9mIHRoaXMgRHVyYXRpb24uXG5cdCAqXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBIG5ldyBpbnN0YW5jZSBvZiBEdXJhdGlvblxuXHQgKi9cblx0bmVnYXRlKCkge1xuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oXG5cdFx0XHRtYXBWYWx1ZXMoIHRoaXMudG9PYmplY3QoKSwgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUgKiAtMTtcblx0XHRcdH0gKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIGphdmFzY3JpcHQgb2JqZWN0IHdpdGggdGhpcyBEdXJhdGlvbidzIHZhbHVlcy5cblx0ICpcblx0ICogQHJldHVybiB7Kn0gUmV0dXJucyB7IHllYXJzOiBudW1iZXIsIGhvdXJzOiBudW1iZXIgLi4uIH1cblx0ICovXG5cdHRvT2JqZWN0KCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvblZhbHVlcyBdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uLlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGVnLiBcIlBUMjRIXCJcblx0ICovXG5cdHRvSVNPKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLnRvSVNPU3RyaW5nKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBJU08gODYwMSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uIGFwcHJvcHJpYXRlIGZvciB1c2Vcblx0ICogaW4gSlNPTi5cblx0ICogQHJldHVybiB7c3RyaW5nfSBlZy4gXCJQVDI0SFwiXG5cdCAqL1xuXHR0b0pTT04oKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF0udG9KU09OKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBJU08gODYwMSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uIGFwcHJvcHJpYXRlIGZvciB1c2Vcblx0ICogaW4gZGVidWdnaW5nLlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGVnLiBcIlBUMjRIXCJcblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLnRvSVNPKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBtaWxsaXNlY29uZHMgdmFsdWUgb2YgdGhpcyBEdXJhdGlvbi5cblx0ICogQHJldHVybiB7bnVtYmVyfSBUaGUgdmFsdWUgb2YgdGhpcyBkdXJhdGlvbiByZXByZXNlbnRlZCBpbiB0aGUgbnVtYmVyIG9mXG5cdCAqIG1pbGxpc2Vjb25kcy5cblx0ICovXG5cdHZhbHVlT2YoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXNNaWxsaXNlY29uZHMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRHVyYXRpb24gZm9ybWF0dGVkIGFjY29yZGluZyB0b1xuXHQgKiB0aGUgc3BlY2lmaWVkIGZvcm1hdCBzdHJpbmcuXG5cdCAqXG5cdCAqIEN1cnJlbnRseSB0aGlzIGFjY2VwdHMgdGhlIGZvbGxvd2luZyB0b2tlbnMgaW4gdGhlIGZvcm1hdCBzdHJpbmc6XG5cdCAqXG5cdCAqIHllYXJzOiAgIFkgb3IgeVxuXHQgKiBtb250aHM6ICBNXG5cdCAqIHdlZWtzOiAgIFcgb3Igd1xuXHQgKiBkYXlzOiAgICBEIG9yIGRcblx0ICogaG91cnM6ICAgSCBvciBoXG5cdCAqIG1pbnV0ZXM6IG1cblx0ICogc2Vjb25kczogc1xuXHQgKiBtczogICAgICBTXG5cdCAqXG5cdCAqIFlvdSBjYW4gdXNlIG11bHRpcGxlcyBvZiB0aGUgc2FtZSB0b2tlbiB0b2dldGhlciB0byBhZGQgemVyby1sZW5ndGhcblx0ICogcGFkZGluZzogKGVnIGhoIC0+IDAxIGluc3RlYWQgb2YgaCAtPiAxKVxuXHQgKlxuXHQgKiBFc2NhcGUgdG9rZW4gY2hhcmFjdGVycyB3aXRoaW4gdGhlIGZvcm1hdCBzdHJpbmcgdXNpbmcgc3F1YXJlIGJyYWNrZXRzXG5cdCAqIChlZyAnaCBbaHJzXSwgbSBbbWluXScgLT4gJzEyIGhycywgMyBtaW4nKVxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ31mb3JtYXRcblx0ICogQHJldHVybiB7c3RyaW5nfSAgQSBmb3JtYXR0ZWQgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgZHVyYXRpb24uXG5cdCAqL1xuXHR0b0Zvcm1hdCggZm9ybWF0ICkge1xuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZSgpWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLmZvcm1hdCggZm9ybWF0ICk7XG5cdH1cbn1cbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgRGF0ZVRpbWUgfSBmcm9tICcuL2RhdGV0aW1lJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRHVyYXRpb24gfSBmcm9tICcuL2R1cmF0aW9uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2VydmVyRGF0ZVRpbWUgfSBmcm9tICcuL3NlcnZlci1kYXRlLXRpbWUnO1xuXG4iLCIvKipcbiAqIEludGVybmFsIEltcG9ydHMuXG4gKi9cbmltcG9ydCBEYXRlVGltZSBmcm9tICcuL2RhdGV0aW1lJztcbmltcG9ydCB7XG5cdERFRkFVTFRfVElNRVpPTkVfU1RSSU5HLFxuXHRIQVNfVElNRVpPTkVfU1RSSU5HLFxuXHRERUZBVUxUX09GRlNFVCxcblx0REVGQVVMVF9WQUxJRF9MT0NBTEUsXG59IGZyb20gJy4vZGVmYXVsdHMnO1xuXG4vKipcbiAqIEV4dGVybmFsIEltcG9ydHMuXG4gKi9cbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuXG4vKipcbiAqIEluaGVyaXRpbmcgdGhlIERhdGVUaW1lIFZhbHVlIG9iamVjdCwgdGhpcyByZXByZXNlbnRzIGEgc2luZ2xlIHBvaW50IGluIHRpbWVcbiAqIHdpdGhpbiB0aGUgY29udGV4dCBvZiB0aGUgdGltZXpvbmUgb3Igb2Zmc2V0IHRoZSBzZXJ2ZXIgaXMgc2V0IGF0LlxuICpcbiAqIEluc3RhbnRpYXRpbmcgdGhpcyBpbnN0ZWFkIG9mIGBEYXRlVGltZWAgcmVtb3ZlcyB0aGUgbmVlZCB0byBwYXNzIGFsb25nXG4gKiB0aW1lem9uZSBzdHJpbmcgb3Igb2Zmc2V0IGFuZCBpbnN0YW50aWF0ZXMgYWNjb3JkaW5nIHRvIHdoYXQgaGFzIGJlZW4gc2V0IGFzXG4gKiB0aGUgZGVmYXVsdHMgZm9yIHRob3NlIGZyb20gdGhlIHNlcnZlci4gIFVzYWdlIG9mIHRoaXMgY2xhc3MgaXMgcHJlZmVycmVkXG4gKiBvdmVyIERhdGVUaW1lIHRvIHJlbW92ZSB0aGUgbmVlZCBmb3IgY2xpZW50IGNvZGUgdG8gZmlndXJlIG91dCBpZiB0aGUgc2VydmVyXG4gKiBoYXMgYSB0aW1lem9uZSBzdHJpbmcgc2V0IG9yIGlzIHVzaW5nIGEgVVRDIG9mZnNldC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyRGF0ZVRpbWUgZXh0ZW5kcyBEYXRlVGltZSB7XG5cdC8qKlxuXHQgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBTZXJ2ZXJEYXRlVGltZSBjbGFzc1xuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaXNvODYwMURhdGVTdHJpbmdcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKi9cblx0Y29uc3RydWN0b3IoXG5cdFx0aXNvODYwMURhdGVTdHJpbmcgPSAnJyxcblx0XHRsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRVxuXHQpIHtcblx0XHRpZiAoIEhBU19USU1FWk9ORV9TVFJJTkcgKSB7XG5cdFx0XHRzdXBlciggaXNvODYwMURhdGVTdHJpbmcsIERFRkFVTFRfVElNRVpPTkVfU1RSSU5HLCBsb2NhbGUgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgZGF0ZXRpbWUgPSBpc0VtcHR5KCBpc284NjAxRGF0ZVN0cmluZyApID9cblx0XHRcdFx0bW9tZW50KCkudXRjT2Zmc2V0KCBERUZBVUxUX09GRlNFVCwgdHJ1ZSApLmxvY2FsZSggbG9jYWxlICkgOlxuXHRcdFx0XHRtb21lbnQoIGlzbzg2MDFEYXRlU3RyaW5nIClcblx0XHRcdFx0XHQudXRjT2Zmc2V0KCBERUZBVUxUX09GRlNFVCwgdHJ1ZSApXG5cdFx0XHRcdFx0LmxvY2FsZSggbG9jYWxlICk7XG5cdFx0XHRzdXBlciggZGF0ZXRpbWUudG9JU09TdHJpbmcoIHRydWUgKSwgbnVsbCwgbG9jYWxlICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEluc3RhbnRpYXRlIFNlcnZlckRhdGVUaW1lIGZyb20gYW4gSVNPIHN0cmluZy5cblx0ICogVGhpcyBvdmVycmlkZXMgYERhdGVUaW1lLmZyb21JU09gIHJlbW92aW5nIHRoZSBuZWVkIHRvIHdvcnJ5IGFib3V0XG5cdCAqIHdoZXRoZXIgdG8gdXNlIGB0aW1lem9uZWAgb3IgYG9mZnNldGAuICBUaGlzIHdpbGwgc2ltcGx5IHVzZSB3aGF0ZXZlciBpc1xuXHQgKiBwcm92aWRlZCBieSB0aGUgc2VydmVyIChwcmVmZXJyaW5nIHRpbWV6b25lIGlmIGl0cyBhdmFpbGFibGUpLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gSVNPU3RyaW5nXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIFNlcnZlckRhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgZnJvbUlTTyggSVNPU3RyaW5nLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSApIHtcblx0XHRyZXR1cm4gSEFTX1RJTUVaT05FX1NUUklORyA/XG5cdFx0XHRuZXcgU2VydmVyRGF0ZVRpbWUoXG5cdFx0XHRcdHN1cGVyXG5cdFx0XHRcdFx0LmZyb21JU08oIElTT1N0cmluZywgREVGQVVMVF9USU1FWk9ORV9TVFJJTkcgKVxuXHRcdFx0XHRcdC50b0lTTygpLFxuXHRcdFx0XHRsb2NhbGVcblx0XHRcdCkgOlxuXHRcdFx0bmV3IFNlcnZlckRhdGVUaW1lKFxuXHRcdFx0XHRzdXBlclxuXHRcdFx0XHRcdC5mcm9tSVNPV2l0aE9mZnNldCggSVNPU3RyaW5nLCBERUZBVUxUX09GRlNFVCApXG5cdFx0XHRcdFx0LnRvSVNPKCksXG5cdFx0XHRcdGxvY2FsZVxuXHRcdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbnN0YW50aWF0ZSBTZXJ2ZXJEYXRlVGltZSBmcm9tIGFuIElTTyBzdHJpbmcuXG5cdCAqIFRoaXMgb3ZlcnJpZGVzIGBEYXRlVGltZS5mcm9tSlNEYXRlYCByZW1vdmluZyB0aGUgbmVlZCB0byB3b3JyeSBhYm91dFxuXHQgKiB3aGV0aGVyIHRvIHVzZSBgdGltZXpvbmVgIG9yIGBvZmZzZXRgLiAgVGhpcyB3aWxsIHNpbXBseSB1c2Ugd2hhdGV2ZXIgaXNcblx0ICogcHJvdmlkZWQgYnkgdGhlIHNlcnZlciAocHJlZmVycmluZyB0aW1lem9uZSBpZiBpdHMgYXZhaWxhYmxlKS5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIFNlcnZlckRhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgZnJvbUpTRGF0ZSggZGF0ZSwgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUgKSB7XG5cdFx0cmV0dXJuIEhBU19USU1FWk9ORV9TVFJJTkcgP1xuXHRcdFx0bmV3IFNlcnZlckRhdGVUaW1lKFxuXHRcdFx0XHRzdXBlclxuXHRcdFx0XHRcdC5mcm9tSlNEYXRlKCBkYXRlLCBERUZBVUxUX1RJTUVaT05FX1NUUklORyApXG5cdFx0XHRcdFx0LnRvSVNPKCksXG5cdFx0XHRcdGxvY2FsZVxuXHRcdFx0KSA6XG5cdFx0XHRuZXcgU2VydmVyRGF0ZVRpbWUoXG5cdFx0XHRcdHN1cGVyXG5cdFx0XHRcdFx0LmZyb21KU0RhdGVXaXRoT2Zmc2V0KCBkYXRlLCBERUZBVUxUX09GRlNFVCApXG5cdFx0XHRcdFx0LnRvSVNPKCksXG5cdFx0XHRcdGxvY2FsZVxuXHRcdFx0KTtcblx0fVxufVxuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBNb25leSB9IGZyb20gJy4vbW9uZXknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTaXRlQ3VycmVuY3ksIEN1cnJlbmN5IH0gZnJvbSAnLi9jdXJyZW5jeSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIExhYmVsIH0gZnJvbSAnLi9sYWJlbCc7XG5leHBvcnQgeyBEYXRlVGltZSwgRHVyYXRpb24sIFNlcnZlckRhdGVUaW1lIH0gZnJvbSAnLi9kYXRlLXRpbWUnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHN0YXJ0Q2FzZSwgaXNTdHJpbmcgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5cbi8qKlxuICogQSB2YWx1ZSBvYmplY3QgZm9yIHJlcHJlc2VudGluZyBhIGxhYmVsIHdpdGggc2luZ3VsYXIgYW5kIHBsdXJhbCBzdHJpbmdcbiAqIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGFiZWwge1xuXHRzdGF0aWMgRk9STUFUX0xPV0VSQ0FTRSA9ICdsb3dlcic7XG5cdHN0YXRpYyBGT1JNQVRfVVBQRVJDQVNFID0gJ3VwcGVyJztcblx0c3RhdGljIEZPUk1BVF9TRU5URU5DRV9DQVNFID0gJ3NlbnRlbmNlJztcblxuXHQvKipcblx0ICogVGhlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNpbmd1bGFyIGZvcm0gb2YgdGhlIGxhYmVsLlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0c2luZ3VsYXIgPSAnJztcblxuXHQvKipcblx0ICogVGhlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHBsdXJhbCBmb3JtIG9mIHRoZSBsYWJlbC5cblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHBsdXJhbCA9ICcnO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc2luZ3VsYXJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBsdXJhbFxuXHQgKi9cblx0Y29uc3RydWN0b3IoIHNpbmd1bGFyLCBwbHVyYWwgKSB7XG5cdFx0dGhpcy5zZXRTaW5ndWxhciggc2luZ3VsYXIgKS5zZXRQbHVyYWwoIHBsdXJhbCApO1xuXHRcdE9iamVjdC5mcmVlemUoIHRoaXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGbHVpZCBzZXR0ZXIgZm9yIHNldHRpbmcgdGhlIHNpbmd1bGFyIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBJZiB0aGUgc2luZ3VsYXIgcHJvcGVydHkgaGFzIGFscmVhZHkgYmVlbiBzZXQsIHRoaXMgd2lsbCByZXR1cm4gYSBuZXdcblx0ICogaW5zdGFuY2Ugb2YgTGFiZWxcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNpbmd1bGFyXG5cdCAqIEByZXR1cm4ge0xhYmVsfSAgQW4gaW5zdGFuY2Ugb2YgTGFiZWxcblx0ICovXG5cdHNldFNpbmd1bGFyKCBzaW5ndWxhciApIHtcblx0XHRMYWJlbC5hc3NlcnRTdHJpbmcoIHNpbmd1bGFyICk7XG5cdFx0aWYgKCB0aGlzLnNpbmd1bGFyICE9PSAnJyApIHtcblx0XHRcdHJldHVybiBuZXcgTGFiZWwoIHNpbmd1bGFyLCB0aGlzLnBsdXJhbCApO1xuXHRcdH1cblx0XHR0aGlzLnNpbmd1bGFyID0gc2luZ3VsYXI7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogRmx1aWQgc2V0dGVyIGZvciBzZXR0aW5nIHRoZSBwbHVyYWwgcHJvcGVydHlcblx0ICpcblx0ICogSWYgdGhlIHBsdXJhbCBwcm9wZXJ0eSBoYXMgYWxyZWFkeSBiZWVuIHNldCwgdGhpcyB3aWxsIHJldHVybiBhIG5ld1xuXHQgKiBpbnN0YW5jZSBvZiBsYWJlbC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBsdXJhbFxuXHQgKiBAcmV0dXJuIHtMYWJlbH0gQW4gaW5zdGFuY2Ugb2YgTGFiZWxcblx0ICovXG5cdHNldFBsdXJhbCggcGx1cmFsICkge1xuXHRcdExhYmVsLmFzc2VydFN0cmluZyggcGx1cmFsICk7XG5cdFx0aWYgKCB0aGlzLnBsdXJhbCAhPT0gJycgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IExhYmVsKCB0aGlzLnNpbmd1bGFyLCBwbHVyYWwgKTtcblx0XHR9XG5cdFx0dGhpcy5wbHVyYWwgPSBwbHVyYWw7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5IGZvcm1hdHRlZCBpbiBzZW50ZW5jZSBjYXNlLlxuXHQgKlxuXHQgKiBOb3RlLCB0aGlzIHN0cmlwcyBhbnkgYC1gIGluIGRhc2hlZCBsYWJlbHMuICBTbyBmb3IgaW5zdGFuY2UgaWYgeW91clxuXHQgKiBsYWJlbCB2YWx1ZSB3YXMgYHNvbWV0aGluZy1lbHNlYCwgdGhlIHZhbHVlIHJldHVybmVkIHdvdWxkIGJlXG5cdCAqIGBTb21ldGhpbmcgRWxzZWBcblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhciAgSWYgdHJ1ZSwgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlXG5cdCAqIHNpbmd1bGFyIHByb3BlcnR5IG90aGVyd2lzZSByZXR1cm4gdGhlIGZvcm1hdHRlZCB2YWx1ZSBvZiB0aGUgcGx1cmFsXG5cdCAqIHByb3BlcnR5LlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmcgaW4gc2VudGVuY2UgY2FzZVxuXHQgKi9cblx0YXNTZW50ZW5jZUNhc2UoIHNpbmd1bGFyID0gdHJ1ZSApIHtcblx0XHRyZXR1cm4gc2luZ3VsYXIgPT09IHRydWUgP1xuXHRcdFx0c3RhcnRDYXNlKCB0aGlzLnNpbmd1bGFyLnRvTG93ZXJDYXNlKCkgKSA6XG5cdFx0XHRzdGFydENhc2UoIHRoaXMucGx1cmFsLnRvTG93ZXJDYXNlKCkgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdGhlIHZhbHVlIGZvciB0aGUgcHJvcGVydHkgZm9ybWF0dGVkIGluIGxvd2VyIGNhc2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXIgIElmIHRydWUsIHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlIG9mIHRoZVxuXHQgKiBzaW5ndWxhciBwcm9wZXJ0eSBvdGhlcndpc2UgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlIHBsdXJhbFxuXHQgKiBwcm9wZXJ0eS5cblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5nIGluIGxvd2VyIGNhc2Vcblx0ICovXG5cdGFzTG93ZXJDYXNlKCBzaW5ndWxhciA9IHRydWUgKSB7XG5cdFx0cmV0dXJuIHNpbmd1bGFyID9cblx0XHRcdHRoaXMuc2luZ3VsYXIudG9Mb3dlckNhc2UoKSA6XG5cdFx0XHR0aGlzLnBsdXJhbC50b0xvd2VyQ2FzZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0aGUgdmFsdWUgZm9yIHRoZSBwcm9wZXJ0eSBmb3JtYXR0ZWQgaW4gdXBwZXIgY2FzZS5cblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhciAgSWYgdHJ1ZSwgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlXG5cdCAqIHNpbmd1bGFyIHByb3BlcnR5IG90aGVyd2lzZSByZXR1cm4gdGhlIGZvcm1hdHRlZCB2YWx1ZSBvZiB0aGUgcGx1cmFsXG5cdCAqIHByb3BlcnR5LlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmcgaW4gdXBwZXIgY2FzZVxuXHQgKi9cblx0YXNVcHBlckNhc2UoIHNpbmd1bGFyID0gdHJ1ZSApIHtcblx0XHRyZXR1cm4gc2luZ3VsYXIgP1xuXHRcdFx0dGhpcy5zaW5ndWxhci50b1VwcGVyQ2FzZSgpIDpcblx0XHRcdHRoaXMucGx1cmFsLnRvVXBwZXJDYXNlKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5IGZvcm1hdHRlZCBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVkXG5cdCAqIGZvcm1hdFR5cGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXIgSWYgdHJ1ZSwgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlXG5cdCAqIHNpbmd1bGFyIHByb3BlcnR5IG90aGVyd2lzZSByZXR1cm4gdGhlIGZvcm1hdHRlZCB2YWx1ZSBvZiB0aGUgcGx1cmFsXG5cdCAqIHByb3BlcnR5LlxuXHQgKiBAcGFyYW0geygnc2VudGVuY2UnfCdsb3dlcid8J3VwcGVyJyl9IGZvcm1hdFR5cGVcblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5nIGZvcm1hdHRlZCBhY2NvcmRpbmcgdG8gZm9ybWF0VHlwZVxuXHQgKi9cblx0YXNGb3JtYXR0ZWQoIHNpbmd1bGFyID0gdHJ1ZSwgZm9ybWF0VHlwZSA9IExhYmVsLkZPUk1BVF9TRU5URU5DRV9DQVNFICkge1xuXHRcdHN3aXRjaCAoIGZvcm1hdFR5cGUgKSB7XG5cdFx0XHRjYXNlIExhYmVsLkZPUk1BVF9TRU5URU5DRV9DQVNFOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hc1NlbnRlbmNlQ2FzZSggc2luZ3VsYXIgKTtcblx0XHRcdGNhc2UgTGFiZWwuRk9STUFUX0xPV0VSQ0FTRTpcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXNMb3dlckNhc2UoIHNpbmd1bGFyICk7XG5cdFx0XHRjYXNlIExhYmVsLkZPUk1BVF9VUFBFUkNBU0U6XG5cdFx0XHRcdHJldHVybiB0aGlzLmFzVXBwZXJDYXNlKCBzaW5ndWxhciApO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0d2FybmluZyggZmFsc2UsICdGb3JtYXQgdHlwZSBtdXN0IGJlIG9uZSBvZiAnICtcblx0XHRcdFx0XHQnTGFiZWwuRk9STUFUX1NFTlRFTkNFX0NBU0UsIExhYmVsLkZPUk1BVF9VUFBFUkNBU0UsICcgK1xuXHRcdFx0XHRcdCdvciBMYWJlbC5GT1JNQVRfTE9XRVJDQVNFJyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hc1NlbnRlbmNlQ2FzZSggc2luZ3VsYXIgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHN0cmluZyBvciBub3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRTdHJpbmcoIHZhbHVlICkge1xuXHRcdGlmICggISBpc1N0cmluZyggdmFsdWUgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdJbmNvbWluZyBsYWJlbCB2YWx1ZSAoJyArIHZhbHVlICsgJykgbXVzdCcgK1xuXHRcdFx0XHQnIGJlIGEgc3RyaW5nJyApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExhYmVsIHRoYXQgaGFzIHRoZSBzYW1lIHZhbHVlIGZvciBzaW5nbHVhciBhbmRcblx0ICogcGx1cmFsIHByb3BlcnRpZXMgZm9yIHRoZSBwcm92aWRlZCBhcmd1bWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsXG5cdCAqIEByZXR1cm4ge0xhYmVsfSAgQSBMYWJlbCBpbnN0YW5jZVxuXHQgKi9cblx0c3RhdGljIGZyb21TYW1lU2luZ2xlQW5kUGx1cmFsID0gKCBsYWJlbCApID0+IHtcblx0XHRyZXR1cm4gbmV3IExhYmVsKCBsYWJlbCwgbGFiZWwgKTtcblx0fVxufVxuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IERlY2ltYWwgfSBmcm9tICdkZWNpbWFsLmpzLWxpZ2h0JztcbmltcG9ydCAqIGFzIEFjY291bnRpbmcgZnJvbSAnYWNjb3VudGluZy1qcyc7XG5pbXBvcnQgaXNTaGFsbG93RXF1YWwgZnJvbSAnQHdvcmRwcmVzcy9pcy1zaGFsbG93LWVxdWFsJztcbmltcG9ydCB7IEV4Y2VwdGlvbiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpbnN0YW5jZU9mIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogQXNzZXJ0cyBpZiBpbmNvbWluZyB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBNb25leVxuICogQHBhcmFtIHtNb25leX0gbW9uZXlcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAqL1xuY29uc3QgYXNzZXJ0TW9uZXkgPSAoIG1vbmV5ICkgPT4ge1xuXHRpZiAoICEgKCBpbnN0YW5jZU9mKCBtb25leSwgJ01vbmV5JyApICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ0luc3RhbmNlIG9mIE1vbmV5IHJlcXVpcmVkJyApO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgaWYgaW5jb21pbmcgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgQ3VycmVuY3lcbiAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5XG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG4gKi9cbmNvbnN0IGFzc2VydEN1cnJlbmN5ID0gKCBjdXJyZW5jeSApID0+IHtcblx0aWYgKCAhICggaW5zdGFuY2VPZiggY3VycmVuY3ksICdDdXJyZW5jeScgKSApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdJbnN0YW5jZSBvZiBDdXJyZW5jeSByZXF1aXJlZCcgKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIGlmIHR3byBjdXJyZW5jaWVzIGFyZSBzaGFsbG93IGVxdWFsLlxuICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lBXG4gKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeUJcbiAqIEB0aHJvd3Mge0V4Y2VwdGlvbn1cbiAqL1xuY29uc3QgYXNzZXJ0U2FtZUN1cnJlbmN5ID0gKCBjdXJyZW5jeUEsIGN1cnJlbmN5QiApID0+IHtcblx0YXNzZXJ0Q3VycmVuY3koIGN1cnJlbmN5QSApO1xuXHRhc3NlcnRDdXJyZW5jeSggY3VycmVuY3lCICk7XG5cdGlmICggISBpc1NoYWxsb3dFcXVhbCggY3VycmVuY3lBLnRvSlNPTigpLCBjdXJyZW5jeUIudG9KU09OKCkgKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCAnUHJvdmlkZWQgY3VycmVuY2llcyBhcmUgbm90IGVxdWl2YWxlbnQuJyApO1xuXHR9XG59O1xuXG4vKipcbiAqIEEgVmFsdWUgb2JqZWN0IHJlcHJlc2VudGluZyBtb25leSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbmV5IHtcblx0LyoqXG5cdCAqIEludGVybmFsbHkgdGhlIGFtb3VudCBpcyBzdG9yZWQgYXMgYSBEZWNpbWFsIGluc3RhbmNlLlxuXHQgKiBAdHlwZSB7RGVjaW1hbH1cblx0ICovXG5cdGFtb3VudCA9IHt9O1xuXG5cdC8qKlxuXHQgKiBJbnRlcm5hbGx5IHRoZSBhbW91bnQgaXMgc3RvcmVkIGFzIGEgQ3VycmVuY3kgaW5zdGFuY2UuXG5cdCAqIEB0eXBlIHtDdXJyZW5jeX1cblx0ICovXG5cdGN1cnJlbmN5ID0ge307XG5cblx0LyoqXG5cdCAqIEZvcm1hdHRlciBvYmplY3QgZm9yIG1vbmV5IHZhbHVlcy5cblx0ICogQHR5cGUge3t9fVxuXHQgKi9cblx0Zm9ybWF0dGVyID0ge307XG5cblx0LyoqXG5cdCAqIFJvdW5kcyBhd2F5IGZyb20gemVyb1xuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIFJPVU5EX1VQID0gRGVjaW1hbC5ST1VORF9VUDtcblxuXHQvKipcblx0ICogUm91bmRzIHRvd2FyZHMgemVyb1xuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIFJPVU5EX0RPV04gPSBEZWNpbWFsLlJPVU5EX0RPV047XG5cblx0LyoqXG5cdCAqIFJvdW5kcyB0b3dhcmRzIGluZmluaXR5XG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdGF0aWMgUk9VTkRfQ0VJTCA9IERlY2ltYWwuUk9VTkRfQ0VJTDtcblxuXHQvKipcblx0ICogUm91bmRzIHRvd2FyZHMgLUluZmluaXR5XG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdGF0aWMgUk9VTkRfRkxPT1IgPSBEZWNpbWFsLlJPVU5EX0ZMT09SO1xuXG5cdC8qKlxuXHQgKiBSb3VuZHMgdG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHJvdW5kcyBhd2F5IGZyb20gemVyby5cblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9IQUxGX1VQID0gRGVjaW1hbC5ST1VORF9IQUxGX1VQO1xuXG5cdC8qKlxuXHQgKiBSb3VuZHMgdG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQgcm91bmRzIHRvd2FyZHMgemVyby5cblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9IQUxGX0RPV04gPSBEZWNpbWFsLlJPVU5EX0hBTEZfRE9XTjtcblxuXHQvKipcblx0ICogUm91bmRzIHRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCByb3VuZHMgdG93YXJkcyBldmVuXG5cdCAqIG5laWdoYm91ci5cblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9IQUxGX0VWRU4gPSBEZWNpbWFsLlJPVU5EX0hBTEZfRVZFTjtcblxuXHQvKipcblx0ICogQ2xhc3MgY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9IGFtb3VudFxuXHQgKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeVxuXHQgKi9cblx0Y29uc3RydWN0b3IoIGFtb3VudCwgY3VycmVuY3kgKSB7XG5cdFx0dGhpcy5zZXRDdXJyZW5jeSggY3VycmVuY3kgKVxuXHRcdFx0LnNldEFtb3VudCggYW1vdW50IClcblx0XHRcdC5zZXRGb3JtYXR0ZXIoKTtcblx0XHRPYmplY3QuZnJlZXplKCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBjdXJyZW5jeSBwcm9wZXJ0eVxuXHQgKlxuXHQgKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeVxuXHQgKiBAcmV0dXJuIHtNb25leX0gRWl0aGVyIHRoaXMgTW9uZXkgb3IgbmV3IE1vbmV5IGRlcGVuZGluZyBvbiBzdGF0ZSBvZlxuXHQgKiBwcm9wZXJ0eS5cblx0ICovXG5cdHNldEN1cnJlbmN5KCBjdXJyZW5jeSApIHtcblx0XHRNb25leS5hc3NlcnRDdXJyZW5jeSggY3VycmVuY3kgKTtcblx0XHQvLyBpZiB0aGVyZSdzIGFscmVhZHkgYSBjdXJyZW5jeSBzZXQsIHRoZW4gcmV0dXJuIGEgbmV3IG9iamVjdC5cblx0XHRpZiAoIGluc3RhbmNlT2YoIHRoaXMuY3VycmVuY3ksICdDdXJyZW5jeScgKSApIHtcblx0XHRcdHJldHVybiBuZXcgTW9uZXkoIHRoaXMuYW1vdW50LCBjdXJyZW5jeSApO1xuXHRcdH1cblx0XHR0aGlzLmN1cnJlbmN5ID0gY3VycmVuY3k7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBhbW91bnQgcHJvcGVydHlcblx0ICpcblx0ICogQHBhcmFtIHtEZWNpbWFsfG51bWJlcnxzdHJpbmd9IGFtb3VudFxuXHQgKiBAcmV0dXJuIHtNb25leX0gRWl0aGVyIHRoaXMgTW9uZXkgb3IgbmV3IE1vbmV5IGRlcGVuZGluZyBvbiBzdGF0ZSBvZiB0aGVcblx0ICogcHJvcGVydHkuXG5cdCAqL1xuXHRzZXRBbW91bnQoIGFtb3VudCApIHtcblx0XHRjb25zdCB2YWx1ZSA9IGluc3RhbmNlT2YoIGFtb3VudCwgJ0RlY2ltYWwnICkgP1xuXHRcdFx0YW1vdW50LnRvTnVtYmVyKCkgOlxuXHRcdFx0YW1vdW50O1xuXHRcdC8vIGlmIHRoZXJlJ3MgYWxyZWFkeSBhbiBhbW91bnQgc2V0LCB0aGVuIHJldHVybiBhIG5ldyBvYmplY3QuXG5cdFx0aWYgKCBpbnN0YW5jZU9mKCB0aGlzLmFtb3VudCwgJ0RlY2ltYWwnICkgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IE1vbmV5KCBuZXcgRGVjaW1hbCggdmFsdWUgKSwgdGhpcy5jdXJyZW5jeSApO1xuXHRcdH1cblx0XHR0aGlzLmFtb3VudCA9IG5ldyBEZWNpbWFsKCB2YWx1ZSApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgZm9ybWF0dGVyIGZvciBtb25leSB2YWx1ZXNcblx0ICpcblx0ICogQHJldHVybiB7TW9uZXl9IEFuIGluc3RhbmNlIG9mIHRoaXMgb2JqZWN0LlxuXHQgKi9cblx0c2V0Rm9ybWF0dGVyKCkge1xuXHRcdC8vIG9ubHkgaW5pdGlhbGl6ZSBpZiBpdHMgbm90IGFscmVhZHkgaW5pdGlhbGl6ZWRcblx0XHRpZiAoIGlzRW1wdHkoIHRoaXMuZm9ybWF0dGVyICkgKSB7XG5cdFx0XHR0aGlzLmZvcm1hdHRlciA9IHsgLi4uQWNjb3VudGluZyB9O1xuXHRcdFx0dGhpcy5mb3JtYXR0ZXIuc2V0dGluZ3MgPSB7XG5cdFx0XHRcdC4uLnRoaXMuZm9ybWF0dGVyLnNldHRpbmdzLFxuXHRcdFx0XHQuLi50aGlzLmN1cnJlbmN5LnRvQWNjb3VudGluZ1NldHRpbmdzKCkuY3VycmVuY3ksXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIE1vbmV5IGFzIGl0cyBzdWJ1bml0cy5cblx0ICogQHJldHVybiB7bnVtYmVyfSBJZiB0aGUgc3VidW5pdHMgaXMgMTAwIGFuZCB0aGUgdmFsdWUgaXMgLjQ1LFxuXHQgKiB0aGlzIHJldHVybnMgNDUwXG5cdCAqL1xuXHR0b1N1YnVuaXRzKCkge1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC50b051bWJlcigpICogdGhpcy5jdXJyZW5jeS5zdWJ1bml0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIG1vbmV5IG9iamVjdCBlcXVhbHMgdGhpcyBtb25leSBvYmplY3QuXG5cdCAqIENvbXBhcmVzIGJvdGggYW1vdW50IGFuZCBjdXJyZW5jeS5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGlzIGlzIGVxdWFsLiBGYWxzZSBtZWFucyBpdCBpc24ndC5cblx0ICovXG5cdGVxdWFscyggb3RoZXIgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0TW9uZXkoIG90aGVyICk7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmVxdWFscyggb3RoZXIuYW1vdW50ICkgJiZcblx0XHRcdHRoaXMuaGFzU2FtZUN1cnJlbmN5KCBvdGhlciApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgd2hldGhlciBwcm92aWRlZCBNb25leSBvYmplY3QncyBDdXJyZW5jeSBlcXVhbHMgdGhpcyBNb25leVxuXHQgKiBvYmplY3QncyBDdXJyZW5jeS5cblx0ICpcblx0ICogVGhpcyBkb2VzIGEgc2hhbGxvdyBjb21wYXJpc29uIG9uIHRoZSBzZXJpYWxpemVkIHZhbHVlcyBmb3IgdGhlIGN1cnJlbmN5XG5cdCAqIG9iamVjdHMuICBUaGF0IHdheSBpZiB0aGUgY3VycmVuY2llcyBhcmUgZGlmZmVyZW50IGluc3RhbmNlcywgYnV0IHNoYXJlXG5cdCAqIHRoZSBzYW1lIGludGVybmFsIHZhbHVlLCB0aGV5IGFyZSBjb25zaWRlcmVkIGVxdWFsLlxuXHQgKlxuXHQgKiBAcGFyYW0ge01vbmV5fSBvdGhlclxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoZSBjdXJyZW5jaWVzIGFyZSBlcXVhbC5cblx0ICovXG5cdGhhc1NhbWVDdXJyZW5jeSggb3RoZXIgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0TW9uZXkoIG90aGVyICk7XG5cdFx0cmV0dXJuIGlzU2hhbGxvd0VxdWFsKFxuXHRcdFx0dGhpcy5jdXJyZW5jeS50b0pTT04oKSxcblx0XHRcdG90aGVyLmN1cnJlbmN5LnRvSlNPTigpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgb25lIE1vbmV5IG9iamVjdCB0byB0aGlzIE1vbmV5IG9iamVjdFxuXHQgKiBAcGFyYW0ge01vbmV5fSBvdGhlclxuXHQgKiBAcmV0dXJuIHtNb25leX0gUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiBNb25leS5cblx0ICovXG5cdGFkZCggb3RoZXIgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3koIHRoaXMsIG90aGVyICk7XG5cdFx0cmV0dXJuIG5ldyBNb25leSggdGhpcy5hbW91bnQucGx1cyggb3RoZXIuYW1vdW50ICksIHRoaXMuY3VycmVuY3kgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTdWJ0cmFjdCBvbmUgTW9uZXkgb2JqZWN0IGZyb20gdGhpcyBNb25leSBvYmplY3Rcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7TW9uZXl9IFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgTW9uZXlcblx0ICovXG5cdHN1YnRyYWN0KCBvdGhlciApIHtcblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSggdGhpcywgb3RoZXIgKTtcblx0XHRyZXR1cm4gbmV3IE1vbmV5KCB0aGlzLmFtb3VudC5taW51cyggb3RoZXIuYW1vdW50ICksIHRoaXMuY3VycmVuY3kgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNdWx0aXBseSB0aGlzIG1vbmV5IG9iamVjdCBieSB0aGUgcHJvdmlkZWQgbXVsdGlwbGllciB2YWx1ZS5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9IG11bHRpcGxpZXJcblx0ICogQHJldHVybiB7TW9uZXl9IFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgTW9uZXlcblx0ICovXG5cdG11bHRpcGx5KCBtdWx0aXBsaWVyICkge1xuXHRcdHJldHVybiBuZXcgTW9uZXkoIHRoaXMuYW1vdW50LnRpbWVzKCBtdWx0aXBsaWVyICksIHRoaXMuY3VycmVuY3kgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEaXZpZGUgdGhpcyBtb25leSBvYmplY3QgYnkgdGhlIHByb3ZpZGVkIGRpdmlzb3IgdmFsdWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBkaXZpc29yXG5cdCAqIEByZXR1cm4ge01vbmV5fSBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIE1vbmV5XG5cdCAqL1xuXHRkaXZpZGUoIGRpdmlzb3IgKSB7XG5cdFx0cmV0dXJuIG5ldyBNb25leSggdGhpcy5hbW91bnQuZGl2aWRlZEJ5KCBkaXZpc29yICksIHRoaXMuY3VycmVuY3kgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbGxvY2F0ZXMgZnVuZCBiYXNlcyBvbiB0aGUgcmF0aW9zIHByb3ZpZGVkIHJldHVybmluZyBhbiBhcnJheSBvZiBNb25leVxuXHQgKiBvYmplY3RzIGFzIGEgcHJvZHVjdCBvZiB0aGUgYWxsb2NhdGlvbi5cblx0ICpcblx0ICogRXhhbXBsZTogc3BsaXR0aW5nIGEgcHJvdmlkZWQgTW9uZXkgb2JqZWN0IHRocmVlIGVxdWFsIHdheXMuXG5cdCAqXG5cdCAqIGBgYFxuXHQgKiBjb25zdCBzcGxpdE1vbmV5ID0gbW9uZXlJbnN0YW5jZS5hbGxvY2F0ZSggWyAxLCAxLCAxIF0gKTtcblx0ICogYGBgXG5cdCAqXG5cdCAqIEV4YW1wbGU6IHNwbGl0dGluZyBhIHByb3ZpZGVkIE1vbmV5IG9iamVjdCB0d28gd2F5cyB3aXRoIG9uZSBoYXZpbmcgNzUlXG5cdCAqIG9mIHRoZSBhbGxvY2F0aW9uLlxuXHQgKlxuXHQgKiBgYGBcblx0ICogY29uc3Qgc3BsaXRNb25leSA9IG1vbmV5SW5zdGFuY2UuYWxsb2NhdGUoIFsgNzUsIDI1IF0gKTtcblx0ICogYGBgXG5cdCAqXG5cdCAqIE5vdGU6IEFycmF5IHZhbHVlcyBmb3IgcmF0aW9zIGFyZSBzaW1wbHkgdG90YWxsZWQgYW5kIHRoZW4gZWFjaCBlbGVtZW50XG5cdCAqIGlzIGNvbnNpZGVyZWQgYSBmcmFjdGlvbiBvZiB0aGUgdG90YWwgdmFsdWUuICBTbyBob3cgeW91IHN1Ym1pdCByYXRpb1xuXHQgKiB2YWx1ZXMgaXMgdXAgdG8geW91IGZvciB3aGF0ZXZlciBpcyBtb3N0IGNsZWFyIHRvIHlvdS5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJbXX0gcmF0aW9zXG5cdCAqIEByZXR1cm4ge01vbmV5W119IEFuIGFycmF5IG9mIE1vbmV5IG9iamVjdHNcblx0ICovXG5cdGFsbG9jYXRlKCByYXRpb3MgKSB7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0Y29uc3QgcmVzdWx0cyA9IFtdO1xuXHRcdGNvbnN0IGNvbnZlcnRlZFJhdGlvcyA9IFtdO1xuXHRcdGxldCByZW1haW5kZXIgPSBuZXcgRGVjaW1hbCggc2VsZi50b1N1YnVuaXRzKCkgKTtcblx0XHRsZXQgdG90YWwgPSBuZXcgRGVjaW1hbCggMCApO1xuXHRcdC8vIGNvbnZlcnQgcmF0aW9zIHRvIGRlY2ltYWwgYW5kIGdlbmVyYXRlIHRvdGFsLlxuXHRcdHJhdGlvcy5mb3JFYWNoKCAoIHJhdGlvICkgPT4ge1xuXHRcdFx0Y29udmVydGVkUmF0aW9zLnB1c2goXG5cdFx0XHRcdGluc3RhbmNlT2YoIHJhdGlvLCAnRGVjaW1hbCcgKSA/IHJhdGlvIDogbmV3IERlY2ltYWwoIHJhdGlvIClcblx0XHRcdCk7XG5cdFx0XHR0b3RhbCA9IHRvdGFsLnBsdXMoIHJhdGlvICk7XG5cdFx0fSApO1xuXHRcdGNvbnZlcnRlZFJhdGlvcy5mb3JFYWNoKCAoIHJhdGlvICkgPT4ge1xuXHRcdFx0Y29uc3Qgc2hhcmUgPSBuZXcgRGVjaW1hbChcblx0XHRcdFx0TWF0aC5mbG9vcihcblx0XHRcdFx0XHRzZWxmLnRvU3VidW5pdHMoKSAqIHJhdGlvLnRvTnVtYmVyKCkgLyB0b3RhbC50b051bWJlcigpXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0XHRyZXN1bHRzLnB1c2goXG5cdFx0XHRcdG5ldyBNb25leShcblx0XHRcdFx0XHRzaGFyZS5kaXZpZGVkQnkoIHRoaXMuY3VycmVuY3kuc3VidW5pdHMgKSxcblx0XHRcdFx0XHR0aGlzLmN1cnJlbmN5XG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0XHRyZW1haW5kZXIgPSByZW1haW5kZXIubWludXMoIHNoYXJlICk7XG5cdFx0fSApO1xuXHRcdGZvciAoIGxldCBpID0gMDsgcmVtYWluZGVyLmdyZWF0ZXJUaGFuKCAwICk7IGkrKyApIHtcblx0XHRcdHJlc3VsdHNbIGkgXSA9IG5ldyBNb25leShcblx0XHRcdFx0KCBuZXcgRGVjaW1hbCggcmVzdWx0c1sgaSBdLnRvU3VidW5pdHMoKSApIClcblx0XHRcdFx0XHQucGx1cyggMSApXG5cdFx0XHRcdFx0LmRpdmlkZWRCeSggdGhpcy5jdXJyZW5jeS5zdWJ1bml0cyApLFxuXHRcdFx0XHR0aGlzLmN1cnJlbmN5XG5cdFx0XHQpO1xuXHRcdFx0cmVtYWluZGVyID0gcmVtYWluZGVyLm1pbnVzKCAxICk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhcmVzIHR3byBpbnN0YW5jZXMgb2YgTW9uZXkuXG5cdCAqXG5cdCAqIE5vdGU6IFwic2FtZVwiIG1lYW5zIGhhcyBlcXVhbCB2YWx1ZSBhbmQgZXF1YWwgY3VycmVuY3kuICBJdCBkb2VzIG5vdCBtZWFuXG5cdCAqIGlkZW50aWNhbCBpbnN0YW5jZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge251bWJlcn0gMCBpZiB0aGV5IGFyZSB0aGUgc2FtZSwgMSBpZiB0aGlzIGlzIGdyZWF0ZXIgdGhhblxuXHQgKiBvdGhlciBhbmQgLTEgaWYgb3RoZXIgaXMgZ3JlYXRlciB0aGFuIHRoaXMuXG5cdCAqL1xuXHRjb21wYXJlKCBvdGhlciApIHtcblx0XHQvL3F1aWNrbHkgcmV0dXJuIDAgaWYgaWRlbnRpY2FsXG5cdFx0aWYgKCB0aGlzID09PSBvdGhlciApIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSggdGhpcywgb3RoZXIgKTtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQuY29tcGFyZWRUbyggb3RoZXIuYW1vdW50ICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgd2hldGhlciB0aGlzIE1vbmV5IG9iamVjdCBpcyBncmVhdGVyIHRoYW4gdGhlIG90aGVyIE1vbmV5IG9iamVjdC5cblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoaXMgaXMgZ3JlYXRlciB0aGFuIG90aGVyLlxuXHQgKi9cblx0Z3JlYXRlclRoYW4oIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydFVzaW5nU2FtZUN1cnJlbmN5KCB0aGlzLCBvdGhlciApO1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5ncmVhdGVyVGhhbiggb3RoZXIuYW1vdW50ICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgd2hldGhlciB0aGlzIE1vbmV5IG9iamVjdCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIG90aGVyXG5cdCAqIE1vbmV5IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoaXMgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBvdGhlci5cblx0ICovXG5cdGdyZWF0ZXJUaGFuT3JFcXVhbFRvKCBvdGhlciApIHtcblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSggdGhpcywgb3RoZXIgKTtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQuZ3JlYXRlclRoYW5PckVxdWFsVG8oIG90aGVyLmFtb3VudCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhcmVzIHdoZXRoZXIgdGhpcyBNb25leSBvYmplY3QgaXMgbGVzcyB0aGFuIHRoZSBvdGhlciBNb25leSBvYmplY3QuXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGlzIGlzIGxlc3MgdGhhbiBvdGhlclxuXHQgKi9cblx0bGVzc1RoYW4oIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydFVzaW5nU2FtZUN1cnJlbmN5KCB0aGlzLCBvdGhlciApO1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5sZXNzVGhhbiggb3RoZXIuYW1vdW50ICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgd2hldGhlciB0aGlzIE1vbmV5IG9iamVjdCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIG90aGVyXG5cdCAqIE1vbmV5IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoaXMgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIG90aGVyLlxuXHQgKi9cblx0bGVzc1RoYW5PckVxdWFsVG8oIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydFVzaW5nU2FtZUN1cnJlbmN5KCB0aGlzLCBvdGhlciApO1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5sZXNzVGhhbk9yRXF1YWxUbyggb3RoZXIuYW1vdW50ICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoaXMgb2JqZWN0IGhhcyB0aGUgdmFsdWUgb2YgMFxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBJZiB0cnVlIHRoZW4gdGhlIHZhbHVlIGlzIDAuXG5cdCAqL1xuXHRpc1plcm8oKSB7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmlzWmVybygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyBpZiB0aGUgdmFsdWUgaW4gdGhpcyBNb25leSBvYmplY3QgaXMgbmVnYXRpdmUuXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGUgdmFsdWUgaXMgbmVnYXRpdmUuXG5cdCAqL1xuXHRpc05lZ2F0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5pc05lZ2F0aXZlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoZSB2YWx1ZSBpbiB0aGlzIE1vbmV5IG9iamVjdCBpcyBwb3NpdGl2ZS5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoZSB2YWx1ZSBpcyBwb3NpdGl2ZS5cblx0ICovXG5cdGlzUG9zaXRpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmlzUG9zaXRpdmUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIE1vbmV5IG9iamVjdCBhcyBhIG51bWJlciBwcmltaXRpdmUuXG5cdCAqIEByZXR1cm4ge251bWJlcn0gUmV0dXJucyBhIG51bWJlci5cblx0ICovXG5cdHRvTnVtYmVyKCkge1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC50b051bWJlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGlzIE1vbmV5IG9iamVjdCBpbiBub3JtYWwgKGZpeGVkLXBvaW50KSBub3RhdGlvblxuXHQgKiByb3VuZGVkIHRvIGBkZWNpbWFsUGxhY2VzYCB1c2luZyBgcm91bmRpbmdgIG1vZGUuXG5cdCAqXG5cdCAqIElmIHRoZSB2YWx1ZSBvZiB0aGlzIGluc3RhbmNlIGluIG5vcm1hbCBub3RhdGlvbiBoYXMgZmV3ZXIgdGhhblxuXHQgKiBkZWNpbWFsUGxhY2VzIGZyYWN0aW9uIGRpZ2l0cywgdGhlIHJldHVybiB2YWx1ZSB3aWxsIGJlIGFwcGVuZGVkIHdpdGhcblx0ICogemVyb3MgYWNjb3JkaW5nbHkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZWNpbWFsUGxhY2VzIFRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgdG8gcm91bmQgdG8uXG5cdCAqIElmIG5vdCBwcm92aWRlZCB1c2VzIHRoZSBpbnRlcm5hbCBkZWNpbWFsIHBsYWNlIHZhbHVlLlxuXHQgKiBAcGFyYW0ge251bWJlcn0gcm91bmRpbmcgV2hhdCByb3VuZGluZyB0eXBlIHRvIHVzZSAoMC04KS4gIFVzZSBNb25leSBST1VORFxuXHQgKiBjb25zdGFudHMuICBEZWZhdWx0cyB0byBNb25leS5ST1VORF9IQUxGX1VQXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgTW9uZXlcblx0ICogaW4gbm9ybWFsIChmaXhlZC1wb2ludCkgbm90YXRpb24gcm91bmRlZCB0byBkZWNpbWFsIHBsYWNlcyB1c2luZ1xuXHQgKiByb3VuZGluZyBtb2RlLlxuXHQgKi9cblx0dG9GaXhlZCggZGVjaW1hbFBsYWNlcywgcm91bmRpbmcgPSBNb25leS5ST1VORF9IQUxGX1VQICkge1xuXHRcdGRlY2ltYWxQbGFjZXMgPSBkZWNpbWFsUGxhY2VzIHx8IHRoaXMuY3VycmVuY3kuZGVjaW1hbFBsYWNlcztcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQudG9GaXhlZCggZGVjaW1hbFBsYWNlcywgcm91bmRpbmcgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgbmV3IE1vbmV5IHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIE1vbmV5IHJvdW5kZWRcblx0ICogdG8gYSB3aG9sZSBudW1iZXIgdXNpbmcgcm91bmRpbmcgbW9kZSByb3VuZGluZyBzZXQgb24gdGhlIG9yaWdpbmFsXG5cdCAqIERlY2ltYWwgYW1vdW50LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtNb25leX0gQSBuZXcgTW9uZXkgb2JqZWN0XG5cdCAqL1xuXHR0b0ludGVnZXJNb25leSgpIHtcblx0XHRyZXR1cm4gbmV3IE1vbmV5KFxuXHRcdFx0dGhpcy5hbW91bnQudG9JbnRlZ2VyKCksXG5cdFx0XHR0aGlzLmN1cnJlbmN5XG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIE1vbmV5IG9iamVjdCBhcyBhIGZvcm1hdHRlZCBzdHJpbmcgYWNjb3JkaW5nXG5cdCAqIHRvIHRoZSBjdXJyZW5jeSBjb25maWd1cmF0aW9uLlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFJldHVybnMgYSBmb3JtYXR0ZWQgc3RyaW5nIGFjY29yZGluZyB0byBDdXJyZW5jeS5cblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmZvcm1hdHRlci5mb3JtYXQoXG5cdFx0XHR0aGlzLmFtb3VudC50b051bWJlcigpLFxuXHRcdFx0dGhpcy5mb3JtYXR0ZXIuc2V0dGluZ3Ncblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEByZXR1cm4geyBPYmplY3QgfSBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgdGhlIHNlcmlhbGl6ZWRcblx0ICogdmFsdWUgb2YgdGhpcyBvYmplY3QuXG5cdCAqL1xuXHR0b0pTT04oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGFtb3VudDogdGhpcy5hbW91bnQudG9KU09OKCksXG5cdFx0XHRjdXJyZW5jeTogdGhpcy5jdXJyZW5jeS50b0pTT04oKSxcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIE1vbmV5LlxuXHQgKiBAcGFyYW0ge01vbmV5fSBtb25leVxuXHQgKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0TW9uZXkgPSAoIG1vbmV5ICkgPT4ge1xuXHRcdGFzc2VydE1vbmV5KCBtb25leSApO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIGlmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBDdXJyZW5jeS5cblx0ICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lcblx0ICogQHRocm93cyB7VHlwZUVycm9yfVxuXHQgKi9cblx0c3RhdGljIGFzc2VydEN1cnJlbmN5ID0gKCBjdXJyZW5jeSApID0+IHtcblx0XHRhc3NlcnRDdXJyZW5jeSggY3VycmVuY3kgKTtcblx0fTtcblxuXHQvKipcblx0ICogQXNzZXJ0cyBpZiB0aGUgcHJvdmlkZWQgdmFsdWVzIGFyZSBib3RoIE1vbmV5IG9iamVjdHMgYW5kIGhhdmUgRXF1YWxcblx0ICogQ3VycmVuY3kgb2JqZWN0cy5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gdGhpc01vbmV5XG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyTW9uZXlcblx0ICogQHRocm93cyB7VHlwZUVycm9yfVxuXHQgKi9cblx0c3RhdGljIGFzc2VydFVzaW5nU2FtZUN1cnJlbmN5ID0gKCB0aGlzTW9uZXksIG90aGVyTW9uZXkgKSA9PiB7XG5cdFx0YXNzZXJ0TW9uZXkoIHRoaXNNb25leSApO1xuXHRcdGFzc2VydE1vbmV5KCBvdGhlck1vbmV5ICk7XG5cdFx0YXNzZXJ0U2FtZUN1cnJlbmN5KCB0aGlzTW9uZXkuY3VycmVuY3ksIG90aGVyTW9uZXkuY3VycmVuY3kgKTtcblx0fTtcblxuXHQvKipcblx0ICogQXNzZXJ0cyBpZiB0d28gY3VycmVuY2llcyBhcmUgc2hhbGxvdyBlcXVhbC5cblx0ICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lBXG5cdCAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5QlxuXHQgKiBAdGhyb3dzIHtFeGNlcHRpb259XG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0U2FtZUN1cnJlbmN5ID0gKCBjdXJyZW5jeUEsIGN1cnJlbmN5QiApID0+IHtcblx0XHRhc3NlcnRTYW1lQ3VycmVuY3koIGN1cnJlbmN5QSwgY3VycmVuY3lCICk7XG5cdH1cbn1cbiIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJ2YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9nZXRQcm90b3R5cGVPZlwiKTtcblxudmFyIHN1cGVyUHJvcEJhc2UgPSByZXF1aXJlKFwiLi9zdXBlclByb3BCYXNlXCIpO1xuXG5mdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBSZWZsZWN0LmdldCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2dldCA9IFJlZmxlY3QuZ2V0O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2dldCA9IGZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgIHZhciBiYXNlID0gc3VwZXJQcm9wQmFzZSh0YXJnZXQsIHByb3BlcnR5KTtcbiAgICAgIGlmICghYmFzZSkgcmV0dXJuO1xuICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIHByb3BlcnR5KTtcblxuICAgICAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgICAgIHJldHVybiBkZXNjLmdldC5jYWxsKHJlY2VpdmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyIHx8IHRhcmdldCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldDsiLCJmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2Y7IiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHM7IiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4vZGVmaW5lUHJvcGVydHlcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG4gICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0U3ByZWFkOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsInZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL2dldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfc3VwZXJQcm9wQmFzZShvYmplY3QsIHByb3BlcnR5KSB7XG4gIHdoaWxlICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpKSB7XG4gICAgb2JqZWN0ID0gZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcbiAgICBpZiAob2JqZWN0ID09PSBudWxsKSBicmVhaztcbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3N1cGVyUHJvcEJhc2U7IiwiZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2YyKG9iaik7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuXHQoZmFjdG9yeSgoZ2xvYmFsLmFjY291bnRpbmcgPSBnbG9iYWwuYWNjb3VudGluZyB8fCB7fSkpKTtcbn0odGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG5cdGZ1bmN0aW9uIF9fY29tbW9uanMoZm4sIG1vZHVsZSkgeyByZXR1cm4gbW9kdWxlID0geyBleHBvcnRzOiB7fSB9LCBmbihtb2R1bGUsIG1vZHVsZS5leHBvcnRzKSwgbW9kdWxlLmV4cG9ydHM7IH1cblxuXHQvKipcblx0ICogVGhlIGxpYnJhcnkncyBzZXR0aW5ncyBjb25maWd1cmF0aW9uIG9iamVjdC5cblx0ICpcblx0ICogQ29udGFpbnMgZGVmYXVsdCBwYXJhbWV0ZXJzIGZvciBjdXJyZW5jeSBhbmQgbnVtYmVyIGZvcm1hdHRpbmdcblx0ICovXG5cdHZhciBzZXR0aW5ncyA9IHtcblx0ICBzeW1ib2w6ICckJywgLy8gZGVmYXVsdCBjdXJyZW5jeSBzeW1ib2wgaXMgJyQnXG5cdCAgZm9ybWF0OiAnJXMldicsIC8vIGNvbnRyb2xzIG91dHB1dDogJXMgPSBzeW1ib2wsICV2ID0gdmFsdWUgKGNhbiBiZSBvYmplY3QsIHNlZSBkb2NzKVxuXHQgIGRlY2ltYWw6ICcuJywgLy8gZGVjaW1hbCBwb2ludCBzZXBhcmF0b3Jcblx0ICB0aG91c2FuZDogJywnLCAvLyB0aG91c2FuZHMgc2VwYXJhdG9yXG5cdCAgcHJlY2lzaW9uOiAyLCAvLyBkZWNpbWFsIHBsYWNlc1xuXHQgIGdyb3VwaW5nOiAzLCAvLyBkaWdpdCBncm91cGluZyAobm90IGltcGxlbWVudGVkIHlldClcblx0ICBzdHJpcFplcm9zOiBmYWxzZSwgLy8gc3RyaXAgaW5zaWduaWZpY2FudCB6ZXJvcyBmcm9tIGRlY2ltYWwgcGFydFxuXHQgIGZhbGxiYWNrOiAwIC8vIHZhbHVlIHJldHVybmVkIG9uIHVuZm9ybWF0KCkgZmFpbHVyZVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBUYWtlcyBhIHN0cmluZy9hcnJheSBvZiBzdHJpbmdzLCByZW1vdmVzIGFsbCBmb3JtYXR0aW5nL2NydWZ0IGFuZCByZXR1cm5zIHRoZSByYXcgZmxvYXQgdmFsdWVcblx0ICogQWxpYXM6IGBhY2NvdW50aW5nLnBhcnNlKHN0cmluZylgXG5cdCAqXG5cdCAqIERlY2ltYWwgbXVzdCBiZSBpbmNsdWRlZCBpbiB0aGUgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIGZsb2F0cyAoZGVmYXVsdHMgdG9cblx0ICogYWNjb3VudGluZy5zZXR0aW5ncy5kZWNpbWFsKSwgc28gaWYgdGhlIG51bWJlciB1c2VzIGEgbm9uLXN0YW5kYXJkIGRlY2ltYWxcblx0ICogc2VwYXJhdG9yLCBwcm92aWRlIGl0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQuXG5cdCAqXG5cdCAqIEFsc28gbWF0Y2hlcyBicmFja2V0ZWQgbmVnYXRpdmVzIChlZy4gJyQgKDEuOTkpJyA9PiAtMS45OSlcblx0ICpcblx0ICogRG9lc24ndCB0aHJvdyBhbnkgZXJyb3JzIChgTmFOYHMgYmVjb21lIDApIGJ1dCB0aGlzIG1heSBjaGFuZ2UgaW4gZnV0dXJlXG5cdCAqXG5cdCAqIGBgYGpzXG5cdCAqICBhY2NvdW50aW5nLnVuZm9ybWF0KFwiwqMgMTIsMzQ1LDY3OC45MCBHQlBcIik7IC8vIDEyMzQ1Njc4Ljlcblx0ICogYGBgXG5cdCAqXG5cdCAqIEBtZXRob2QgdW5mb3JtYXRcblx0ICogQGZvciBhY2NvdW50aW5nXG5cdCAqIEBwYXJhbSB7U3RyaW5nfEFycmF5PFN0cmluZz59IHZhbHVlIFRoZSBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5ncyBjb250YWluaW5nIHRoZSBudW1iZXIvcyB0byBwYXJzZS5cblx0ICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgICAgICAgZGVjaW1hbCBOdW1iZXIgb2YgZGVjaW1hbCBkaWdpdHMgb2YgdGhlIHJlc3VsdGFudCBudW1iZXJcblx0ICogQHJldHVybiB7RmxvYXR9IFRoZSBwYXJzZWQgbnVtYmVyXG5cdCAqL1xuXHRmdW5jdGlvbiB1bmZvcm1hdCh2YWx1ZSkge1xuXHQgIHZhciBkZWNpbWFsID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gc2V0dGluZ3MuZGVjaW1hbCA6IGFyZ3VtZW50c1sxXTtcblx0ICB2YXIgZmFsbGJhY2sgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBzZXR0aW5ncy5mYWxsYmFjayA6IGFyZ3VtZW50c1syXTtcblxuXHQgIC8vIFJlY3Vyc2l2ZWx5IHVuZm9ybWF0IGFycmF5czpcblx0ICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0ICAgIHJldHVybiB2YWx1ZS5tYXAoZnVuY3Rpb24gKHZhbCkge1xuXHQgICAgICByZXR1cm4gdW5mb3JtYXQodmFsLCBkZWNpbWFsLCBmYWxsYmFjayk7XG5cdCAgICB9KTtcblx0ICB9XG5cblx0ICAvLyBSZXR1cm4gdGhlIHZhbHVlIGFzLWlzIGlmIGl0J3MgYWxyZWFkeSBhIG51bWJlcjpcblx0ICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykgcmV0dXJuIHZhbHVlO1xuXG5cdCAgLy8gQnVpbGQgcmVnZXggdG8gc3RyaXAgb3V0IGV2ZXJ5dGhpbmcgZXhjZXB0IGRpZ2l0cywgZGVjaW1hbCBwb2ludCBhbmQgbWludXMgc2lnbjpcblx0ICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCdbXjAtOS0oLSktJyArIGRlY2ltYWwgKyAnXScsIFsnZyddKTtcblx0ICB2YXIgdW5mb3JtYXR0ZWRWYWx1ZVN0cmluZyA9ICgnJyArIHZhbHVlKS5yZXBsYWNlKHJlZ2V4LCAnJykgLy8gc3RyaXAgb3V0IGFueSBjcnVmdFxuXHQgIC5yZXBsYWNlKGRlY2ltYWwsICcuJykgLy8gbWFrZSBzdXJlIGRlY2ltYWwgcG9pbnQgaXMgc3RhbmRhcmRcblx0ICAucmVwbGFjZSgvXFwoKFstXSpcXGQqW14pXT9cXGQrKVxcKS9nLCAnLSQxJykgLy8gcmVwbGFjZSBicmFja2V0ZWQgdmFsdWVzIHdpdGggbmVnYXRpdmVzXG5cdCAgLnJlcGxhY2UoL1xcKCguKilcXCkvLCAnJyk7IC8vIHJlbW92ZSBhbnkgYnJhY2tldHMgdGhhdCBkbyBub3QgaGF2ZSBudW1lcmljIHZhbHVlXG5cblx0ICAvKipcblx0ICAgKiBIYW5kbGluZyAtdmUgbnVtYmVyIGFuZCBicmFja2V0LCBlZy5cblx0ICAgKiAoLTEwMCkgPSAxMDAsIC0oMTAwKSA9IDEwMCwgLS0xMDAgPSAxMDBcblx0ICAgKi9cblx0ICB2YXIgbmVnYXRpdmUgPSAodW5mb3JtYXR0ZWRWYWx1ZVN0cmluZy5tYXRjaCgvLS9nKSB8fCAyKS5sZW5ndGggJSAyLFxuXHQgICAgICBhYnNVbmZvcm1hdHRlZCA9IHBhcnNlRmxvYXQodW5mb3JtYXR0ZWRWYWx1ZVN0cmluZy5yZXBsYWNlKC8tL2csICcnKSksXG5cdCAgICAgIHVuZm9ybWF0dGVkID0gYWJzVW5mb3JtYXR0ZWQgKiAobmVnYXRpdmUgPyAtMSA6IDEpO1xuXG5cdCAgLy8gVGhpcyB3aWxsIGZhaWwgc2lsZW50bHkgd2hpY2ggbWF5IGNhdXNlIHRyb3VibGUsIGxldCdzIHdhaXQgYW5kIHNlZTpcblx0ICByZXR1cm4gIWlzTmFOKHVuZm9ybWF0dGVkKSA/IHVuZm9ybWF0dGVkIDogZmFsbGJhY2s7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgYW5kIG5vcm1hbGlzZSB0aGUgdmFsdWUgb2YgcHJlY2lzaW9uIChtdXN0IGJlIHBvc2l0aXZlIGludGVnZXIpXG5cdCAqL1xuXHRmdW5jdGlvbiBfY2hlY2tQcmVjaXNpb24odmFsLCBiYXNlKSB7XG5cdCAgdmFsID0gTWF0aC5yb3VuZChNYXRoLmFicyh2YWwpKTtcblx0ICByZXR1cm4gaXNOYU4odmFsKSA/IGJhc2UgOiB2YWw7XG5cdH1cblxuXHQvKipcblx0ICogSW1wbGVtZW50YXRpb24gb2YgdG9GaXhlZCgpIHRoYXQgdHJlYXRzIGZsb2F0cyBtb3JlIGxpa2UgZGVjaW1hbHNcblx0ICpcblx0ICogRml4ZXMgYmluYXJ5IHJvdW5kaW5nIGlzc3VlcyAoZWcuICgwLjYxNSkudG9GaXhlZCgyKSA9PT0gJzAuNjEnKSB0aGF0IHByZXNlbnRcblx0ICogcHJvYmxlbXMgZm9yIGFjY291bnRpbmctIGFuZCBmaW5hbmNlLXJlbGF0ZWQgc29mdHdhcmUuXG5cdCAqXG5cdCAqIGBgYGpzXG5cdCAqICAoMC42MTUpLnRvRml4ZWQoMik7ICAgICAgICAgICAvLyBcIjAuNjFcIiAobmF0aXZlIHRvRml4ZWQgaGFzIHJvdW5kaW5nIGlzc3Vlcylcblx0ICogIGFjY291bnRpbmcudG9GaXhlZCgwLjYxNSwgMik7IC8vIFwiMC42MlwiXG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBAbWV0aG9kIHRvRml4ZWRcblx0ICogQGZvciBhY2NvdW50aW5nXG5cdCAqIEBwYXJhbSB7RmxvYXR9ICAgdmFsdWUgICAgICAgICBUaGUgZmxvYXQgdG8gYmUgdHJlYXRlZCBhcyBhIGRlY2ltYWwgbnVtYmVyLlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW3ByZWNpc2lvbj0yXSBUaGUgbnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzIHRvIGtlZXAuXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGdpdmVuIG51bWJlciB0cmFuc2Zvcm1lZCBpbnRvIGEgc3RyaW5nIHdpdGggdGhlIGdpdmVuIHByZWNpc3Npb25cblx0ICovXG5cdGZ1bmN0aW9uIHRvRml4ZWQodmFsdWUsIHByZWNpc2lvbikge1xuXHQgIHByZWNpc2lvbiA9IF9jaGVja1ByZWNpc2lvbihwcmVjaXNpb24sIHNldHRpbmdzLnByZWNpc2lvbik7XG5cdCAgdmFyIHBvd2VyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbik7XG5cblx0ICAvLyBNdWx0aXBseSB1cCBieSBwcmVjaXNpb24sIHJvdW5kIGFjY3VyYXRlbHksIHRoZW4gZGl2aWRlIGFuZCB1c2UgbmF0aXZlIHRvRml4ZWQoKTpcblx0ICByZXR1cm4gKE1hdGgucm91bmQoKHZhbHVlICsgMWUtOCkgKiBwb3dlcikgLyBwb3dlcikudG9GaXhlZChwcmVjaXNpb24pO1xuXHR9XG5cblx0dmFyIGluZGV4ID0gX19jb21tb25qcyhmdW5jdGlvbiAobW9kdWxlKSB7XG5cdC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblx0dmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cdGZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRcdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE9iamVjdCh2YWwpO1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHRcdHZhciBmcm9tO1xuXHRcdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdFx0dmFyIHN5bWJvbHM7XG5cblx0XHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0XHRzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0bztcblx0fTtcblx0fSk7XG5cblx0dmFyIG9iamVjdEFzc2lnbiA9IChpbmRleCAmJiB0eXBlb2YgaW5kZXggPT09ICdvYmplY3QnICYmICdkZWZhdWx0JyBpbiBpbmRleCA/IGluZGV4WydkZWZhdWx0J10gOiBpbmRleCk7XG5cblx0ZnVuY3Rpb24gX3N0cmlwSW5zaWduaWZpY2FudFplcm9zKHN0ciwgZGVjaW1hbCkge1xuXHQgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdChkZWNpbWFsKTtcblx0ICB2YXIgaW50ZWdlclBhcnQgPSBwYXJ0c1swXTtcblx0ICB2YXIgZGVjaW1hbFBhcnQgPSBwYXJ0c1sxXS5yZXBsYWNlKC8wKyQvLCAnJyk7XG5cblx0ICBpZiAoZGVjaW1hbFBhcnQubGVuZ3RoID4gMCkge1xuXHQgICAgcmV0dXJuIGludGVnZXJQYXJ0ICsgZGVjaW1hbCArIGRlY2ltYWxQYXJ0O1xuXHQgIH1cblxuXHQgIHJldHVybiBpbnRlZ2VyUGFydDtcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3JtYXQgYSBudW1iZXIsIHdpdGggY29tbWEtc2VwYXJhdGVkIHRob3VzYW5kcyBhbmQgY3VzdG9tIHByZWNpc2lvbi9kZWNpbWFsIHBsYWNlc1xuXHQgKiBBbGlhczogYGFjY291bnRpbmcuZm9ybWF0KClgXG5cdCAqXG5cdCAqIExvY2FsaXNlIGJ5IG92ZXJyaWRpbmcgdGhlIHByZWNpc2lvbiBhbmQgdGhvdXNhbmQgLyBkZWNpbWFsIHNlcGFyYXRvcnNcblx0ICpcblx0ICogYGBganNcblx0ICogYWNjb3VudGluZy5mb3JtYXROdW1iZXIoNTMxODAwOCk7ICAgICAgICAgICAgICAvLyA1LDMxOCwwMDhcblx0ICogYWNjb3VudGluZy5mb3JtYXROdW1iZXIoOTg3NjU0My4yMSwgeyBwcmVjaXNpb246IDMsIHRob3VzYW5kOiBcIiBcIiB9KTsgLy8gOSA4NzYgNTQzLjIxMFxuXHQgKiBgYGBcblx0ICpcblx0ICogQG1ldGhvZCBmb3JtYXROdW1iZXJcblx0ICogQGZvciBhY2NvdW50aW5nXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgbnVtYmVyIFRoZSBudW1iZXIgdG8gYmUgZm9ybWF0dGVkLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gICAgICAgIFtvcHRzPXt9XSBPYmplY3QgY29udGFpbmluZyBhbGwgdGhlIG9wdGlvbnMgb2YgdGhlIG1ldGhvZC5cblx0ICogQHJldHVybiB7U3RyaW5nfSBUaGUgZ2l2ZW4gbnVtYmVyIHByb3Blcmx5IGZvcm1hdHRlZC5cblx0ICAqL1xuXHRmdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtYmVyKSB7XG5cdCAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIC8vIFJlc3Vyc2l2ZWx5IGZvcm1hdCBhcnJheXM6XG5cdCAgaWYgKEFycmF5LmlzQXJyYXkobnVtYmVyKSkge1xuXHQgICAgcmV0dXJuIG51bWJlci5tYXAoZnVuY3Rpb24gKHZhbCkge1xuXHQgICAgICByZXR1cm4gZm9ybWF0TnVtYmVyKHZhbCwgb3B0cyk7XG5cdCAgICB9KTtcblx0ICB9XG5cblx0ICAvLyBCdWlsZCBvcHRpb25zIG9iamVjdCBmcm9tIHNlY29uZCBwYXJhbSAoaWYgb2JqZWN0KSBvciBhbGwgcGFyYW1zLCBleHRlbmRpbmcgZGVmYXVsdHM6XG5cdCAgb3B0cyA9IG9iamVjdEFzc2lnbih7fSwgc2V0dGluZ3MsIG9wdHMpO1xuXG5cdCAgLy8gRG8gc29tZSBjYWxjOlxuXHQgIHZhciBuZWdhdGl2ZSA9IG51bWJlciA8IDAgPyAnLScgOiAnJztcblx0ICB2YXIgYmFzZSA9IHBhcnNlSW50KHRvRml4ZWQoTWF0aC5hYnMobnVtYmVyKSwgb3B0cy5wcmVjaXNpb24pLCAxMCkgKyAnJztcblx0ICB2YXIgbW9kID0gYmFzZS5sZW5ndGggPiAzID8gYmFzZS5sZW5ndGggJSAzIDogMDtcblxuXHQgIC8vIEZvcm1hdCB0aGUgbnVtYmVyOlxuXHQgIHZhciBmb3JtYXR0ZWQgPSBuZWdhdGl2ZSArIChtb2QgPyBiYXNlLnN1YnN0cigwLCBtb2QpICsgb3B0cy50aG91c2FuZCA6ICcnKSArIGJhc2Uuc3Vic3RyKG1vZCkucmVwbGFjZSgvKFxcZHszfSkoPz1cXGQpL2csICckMScgKyBvcHRzLnRob3VzYW5kKSArIChvcHRzLnByZWNpc2lvbiA+IDAgPyBvcHRzLmRlY2ltYWwgKyB0b0ZpeGVkKE1hdGguYWJzKG51bWJlciksIG9wdHMucHJlY2lzaW9uKS5zcGxpdCgnLicpWzFdIDogJycpO1xuXG5cdCAgcmV0dXJuIG9wdHMuc3RyaXBaZXJvcyA/IF9zdHJpcEluc2lnbmlmaWNhbnRaZXJvcyhmb3JtYXR0ZWQsIG9wdHMuZGVjaW1hbCkgOiBmb3JtYXR0ZWQ7XG5cdH1cblxuXHR2YXIgaW5kZXgkMSA9IF9fY29tbW9uanMoZnVuY3Rpb24gKG1vZHVsZSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHN0clZhbHVlID0gU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mO1xuXHR2YXIgdHJ5U3RyaW5nT2JqZWN0ID0gZnVuY3Rpb24gdHJ5U3RyaW5nT2JqZWN0KHZhbHVlKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHN0clZhbHVlLmNhbGwodmFsdWUpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fTtcblx0dmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblx0dmFyIHN0ckNsYXNzID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cdHZhciBoYXNUb1N0cmluZ1RhZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCc7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0cmV0dXJuIGhhc1RvU3RyaW5nVGFnID8gdHJ5U3RyaW5nT2JqZWN0KHZhbHVlKSA6IHRvU3RyLmNhbGwodmFsdWUpID09PSBzdHJDbGFzcztcblx0fTtcblx0fSk7XG5cblx0dmFyIGlzU3RyaW5nID0gKGluZGV4JDEgJiYgdHlwZW9mIGluZGV4JDEgPT09ICdvYmplY3QnICYmICdkZWZhdWx0JyBpbiBpbmRleCQxID8gaW5kZXgkMVsnZGVmYXVsdCddIDogaW5kZXgkMSk7XG5cblx0LyoqXG5cdCAqIFBhcnNlcyBhIGZvcm1hdCBzdHJpbmcgb3Igb2JqZWN0IGFuZCByZXR1cm5zIGZvcm1hdCBvYmogZm9yIHVzZSBpbiByZW5kZXJpbmdcblx0ICpcblx0ICogYGZvcm1hdGAgaXMgZWl0aGVyIGEgc3RyaW5nIHdpdGggdGhlIGRlZmF1bHQgKHBvc2l0aXZlKSBmb3JtYXQsIG9yIG9iamVjdFxuXHQgKiBjb250YWluaW5nIGBwb3NgIChyZXF1aXJlZCksIGBuZWdgIGFuZCBgemVyb2AgdmFsdWVzXG5cdCAqXG5cdCAqIEVpdGhlciBzdHJpbmcgb3IgZm9ybWF0LnBvcyBtdXN0IGNvbnRhaW4gXCIldlwiICh2YWx1ZSkgdG8gYmUgdmFsaWRcblx0ICpcblx0ICogQG1ldGhvZCBfY2hlY2tDdXJyZW5jeUZvcm1hdFxuXHQgKiBAZm9yIGFjY291bnRpbmdcblx0ICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICBbZm9ybWF0PVwiJXMldlwiXSBTdHJpbmcgd2l0aCB0aGUgZm9ybWF0IHRvIGFwcGx5LCB3aGVyZSAlcyBpcyB0aGUgY3VycmVuY3kgc3ltYm9sIGFuZCAldiBpcyB0aGUgdmFsdWUuXG5cdCAqIEByZXR1cm4ge09iamVjdH0gb2JqZWN0IHJlcHJlc250aW5nIGZvcm1hdCAod2l0aCBwb3MsIG5lZyBhbmQgemVybyBhdHRyaWJ1dGVzKVxuXHQgKi9cblx0ZnVuY3Rpb24gX2NoZWNrQ3VycmVuY3lGb3JtYXQoZm9ybWF0KSB7XG5cdCAgLy8gRm9ybWF0IHNob3VsZCBiZSBhIHN0cmluZywgaW4gd2hpY2ggY2FzZSBgdmFsdWVgICgnJXYnKSBtdXN0IGJlIHByZXNlbnQ6XG5cdCAgaWYgKGlzU3RyaW5nKGZvcm1hdCkgJiYgZm9ybWF0Lm1hdGNoKCcldicpKSB7XG5cdCAgICAvLyBDcmVhdGUgYW5kIHJldHVybiBwb3NpdGl2ZSwgbmVnYXRpdmUgYW5kIHplcm8gZm9ybWF0czpcblx0ICAgIHJldHVybiB7XG5cdCAgICAgIHBvczogZm9ybWF0LFxuXHQgICAgICBuZWc6IGZvcm1hdC5yZXBsYWNlKCctJywgJycpLnJlcGxhY2UoJyV2JywgJy0ldicpLFxuXHQgICAgICB6ZXJvOiBmb3JtYXRcblx0ICAgIH07XG5cdCAgfVxuXG5cdCAgLy8gT3RoZXJ3aXNlLCBhc3N1bWUgZm9ybWF0IHdhcyBmaW5lOlxuXHQgIHJldHVybiBmb3JtYXQ7XG5cdH1cblxuXHQvKipcblx0ICogRm9ybWF0IGEgbnVtYmVyIGludG8gY3VycmVuY3lcblx0ICpcblx0ICogVXNhZ2U6IGFjY291bnRpbmcuZm9ybWF0TW9uZXkobnVtYmVyLCBzeW1ib2wsIHByZWNpc2lvbiwgdGhvdXNhbmRzU2VwLCBkZWNpbWFsU2VwLCBmb3JtYXQpXG5cdCAqIGRlZmF1bHRzOiAoMCwgJyQnLCAyLCAnLCcsICcuJywgJyVzJXYnKVxuXHQgKlxuXHQgKiBMb2NhbGlzZSBieSBvdmVycmlkaW5nIHRoZSBzeW1ib2wsIHByZWNpc2lvbiwgdGhvdXNhbmQgLyBkZWNpbWFsIHNlcGFyYXRvcnMgYW5kIGZvcm1hdFxuXHQgKlxuXHQgKiBgYGBqc1xuXHQgKiAvLyBEZWZhdWx0IHVzYWdlOlxuXHQgKiBhY2NvdW50aW5nLmZvcm1hdE1vbmV5KDEyMzQ1Njc4KTsgLy8gJDEyLDM0NSw2NzguMDBcblx0ICpcblx0ICogLy8gRXVyb3BlYW4gZm9ybWF0dGluZyAoY3VzdG9tIHN5bWJvbCBhbmQgc2VwYXJhdG9ycyksIGNhbiBhbHNvIHVzZSBvcHRpb25zIG9iamVjdCBhcyBzZWNvbmQgcGFyYW1ldGVyOlxuXHQgKiBhY2NvdW50aW5nLmZvcm1hdE1vbmV5KDQ5OTkuOTksIHsgc3ltYm9sOiBcIuKCrFwiLCBwcmVjaXNpb246IDIsIHRob3VzYW5kOiBcIi5cIiwgZGVjaW1hbDogXCIsXCIgfSk7IC8vIOKCrDQuOTk5LDk5XG5cdCAqXG5cdCAqIC8vIE5lZ2F0aXZlIHZhbHVlcyBjYW4gYmUgZm9ybWF0dGVkIG5pY2VseTpcblx0ICogYWNjb3VudGluZy5mb3JtYXRNb25leSgtNTAwMDAwLCB7IHN5bWJvbDogXCLCoyBcIiwgcHJlY2lzaW9uOiAwIH0pOyAvLyDCoyAtNTAwLDAwMFxuXHQgKlxuXHQgKiAvLyBTaW1wbGUgYGZvcm1hdGAgc3RyaW5nIGFsbG93cyBjb250cm9sIG9mIHN5bWJvbCBwb3NpdGlvbiAoJXYgPSB2YWx1ZSwgJXMgPSBzeW1ib2wpOlxuXHQgKiBhY2NvdW50aW5nLmZvcm1hdE1vbmV5KDUzMTgwMDgsIHsgc3ltYm9sOiBcIkdCUFwiLCAgZm9ybWF0OiBcIiV2ICVzXCIgfSk7IC8vIDUsMzE4LDAwOC4wMCBHQlBcblx0ICogYGBgXG5cdCAqXG5cdCAqIEBtZXRob2QgZm9ybWF0TW9uZXlcblx0ICogQGZvciBhY2NvdW50aW5nXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgbnVtYmVyIE51bWJlciB0byBiZSBmb3JtYXR0ZWQuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgW29wdHM9e31dIE9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgb3B0aW9ucyBvZiB0aGUgbWV0aG9kLlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSBnaXZlbiBudW1iZXIgcHJvcGVybHkgZm9ybWF0dGVkIGFzIG1vbmV5LlxuXHQgKi9cblx0ZnVuY3Rpb24gZm9ybWF0TW9uZXkobnVtYmVyKSB7XG5cdCAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIC8vIFJlc3Vyc2l2ZWx5IGZvcm1hdCBhcnJheXM6XG5cdCAgaWYgKEFycmF5LmlzQXJyYXkobnVtYmVyKSkge1xuXHQgICAgcmV0dXJuIG51bWJlci5tYXAoZnVuY3Rpb24gKHZhbCkge1xuXHQgICAgICByZXR1cm4gZm9ybWF0TW9uZXkodmFsLCBvcHRzKTtcblx0ICAgIH0pO1xuXHQgIH1cblxuXHQgIC8vIEJ1aWxkIG9wdGlvbnMgb2JqZWN0IGZyb20gc2Vjb25kIHBhcmFtIChpZiBvYmplY3QpIG9yIGFsbCBwYXJhbXMsIGV4dGVuZGluZyBkZWZhdWx0czpcblx0ICBvcHRzID0gb2JqZWN0QXNzaWduKHt9LCBzZXR0aW5ncywgb3B0cyk7XG5cblx0ICAvLyBDaGVjayBmb3JtYXQgKHJldHVybnMgb2JqZWN0IHdpdGggcG9zLCBuZWcgYW5kIHplcm8pOlxuXHQgIHZhciBmb3JtYXRzID0gX2NoZWNrQ3VycmVuY3lGb3JtYXQob3B0cy5mb3JtYXQpO1xuXG5cdCAgLy8gQ2hvb3NlIHdoaWNoIGZvcm1hdCB0byB1c2UgZm9yIHRoaXMgdmFsdWU6XG5cdCAgdmFyIHVzZUZvcm1hdCA9IHVuZGVmaW5lZDtcblxuXHQgIGlmIChudW1iZXIgPiAwKSB7XG5cdCAgICB1c2VGb3JtYXQgPSBmb3JtYXRzLnBvcztcblx0ICB9IGVsc2UgaWYgKG51bWJlciA8IDApIHtcblx0ICAgIHVzZUZvcm1hdCA9IGZvcm1hdHMubmVnO1xuXHQgIH0gZWxzZSB7XG5cdCAgICB1c2VGb3JtYXQgPSBmb3JtYXRzLnplcm87XG5cdCAgfVxuXG5cdCAgLy8gUmV0dXJuIHdpdGggY3VycmVuY3kgc3ltYm9sIGFkZGVkOlxuXHQgIHJldHVybiB1c2VGb3JtYXQucmVwbGFjZSgnJXMnLCBvcHRzLnN5bWJvbCkucmVwbGFjZSgnJXYnLCBmb3JtYXROdW1iZXIoTWF0aC5hYnMobnVtYmVyKSwgb3B0cykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZvcm1hdCBhIGxpc3Qgb2YgbnVtYmVycyBpbnRvIGFuIGFjY291bnRpbmcgY29sdW1uLCBwYWRkaW5nIHdpdGggd2hpdGVzcGFjZVxuXHQgKiB0byBsaW5lIHVwIGN1cnJlbmN5IHN5bWJvbHMsIHRob3VzYW5kIHNlcGFyYXRvcnMgYW5kIGRlY2ltYWxzIHBsYWNlc1xuXHQgKlxuXHQgKiBMaXN0IHNob3VsZCBiZSBhbiBhcnJheSBvZiBudW1iZXJzXG5cdCAqXG5cdCAqIFJldHVybnMgYXJyYXkgb2YgYWNjb3V0aW5nLWZvcm1hdHRlZCBudW1iZXIgc3RyaW5ncyBvZiBzYW1lIGxlbmd0aFxuXHQgKlxuXHQgKiBOQjogYHdoaXRlLXNwYWNlOnByZWAgQ1NTIHJ1bGUgaXMgcmVxdWlyZWQgb24gdGhlIGxpc3QgY29udGFpbmVyIHRvIHByZXZlbnRcblx0ICogYnJvd3NlcnMgZnJvbSBjb2xsYXBzaW5nIHRoZSB3aGl0ZXNwYWNlIGluIHRoZSBvdXRwdXQgc3RyaW5ncy5cblx0ICpcblx0ICogYGBganNcblx0ICogYWNjb3VudGluZy5mb3JtYXRDb2x1bW4oWzEyMy41LCAzNDU2LjQ5LCA3Nzc4ODguOTksIDEyMzQ1Njc4LCAtNTQzMl0sIHsgc3ltYm9sOiBcIiQgXCIgfSk7XG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBAbWV0aG9kIGZvcm1hdENvbHVtblxuXHQgKiBAZm9yIGFjY291bnRpbmdcblx0ICogQHBhcmFtIHtBcnJheTxOdW1iZXI+fSBsaXN0IEFuIGFycmF5IG9mIG51bWJlcnMgdG8gZm9ybWF0XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgW29wdHM9e31dIE9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgb3B0aW9ucyBvZiB0aGUgbWV0aG9kLlxuXHQgKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IFtzeW1ib2w9XCIkXCJdIFN0cmluZyB3aXRoIHRoZSBjdXJyZW5jeSBzeW1ib2wuIEZvciBjb252ZW5pZW5jeSBpZiBjYW4gYmUgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSBvcHRpb25zIG9mIHRoZSBtZXRob2QuXG5cdCAqIEBwYXJhbSB7SW50ZWdlcn0gICAgICAgW3ByZWNpc2lvbj0yXSBOdW1iZXIgb2YgZGVjaW1hbCBkaWdpdHNcblx0ICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICBbdGhvdXNhbmQ9JywnXSBTdHJpbmcgd2l0aCB0aGUgdGhvdXNhbmRzIHNlcGFyYXRvci5cblx0ICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICBbZGVjaW1hbD1cIi5cIl0gU3RyaW5nIHdpdGggdGhlIGRlY2ltYWwgc2VwYXJhdG9yLlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgIFtmb3JtYXQ9XCIlcyV2XCJdIFN0cmluZyB3aXRoIHRoZSBmb3JtYXQgdG8gYXBwbHksIHdoZXJlICVzIGlzIHRoZSBjdXJyZW5jeSBzeW1ib2wgYW5kICV2IGlzIHRoZSB2YWx1ZS5cblx0ICogQHJldHVybiB7QXJyYXk8U3RyaW5nPn0gYXJyYXkgb2YgYWNjb3V0aW5nLWZvcm1hdHRlZCBudW1iZXIgc3RyaW5ncyBvZiBzYW1lIGxlbmd0aFxuXHQgKi9cblx0ZnVuY3Rpb24gZm9ybWF0Q29sdW1uKGxpc3QpIHtcblx0ICB2YXIgb3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG5cdCAgaWYgKCFsaXN0KSByZXR1cm4gW107XG5cblx0ICAvLyBCdWlsZCBvcHRpb25zIG9iamVjdCBmcm9tIHNlY29uZCBwYXJhbSAoaWYgb2JqZWN0KSBvciBhbGwgcGFyYW1zLCBleHRlbmRpbmcgZGVmYXVsdHM6XG5cdCAgb3B0cyA9IG9iamVjdEFzc2lnbih7fSwgc2V0dGluZ3MsIG9wdHMpO1xuXG5cdCAgLy8gQ2hlY2sgZm9ybWF0IChyZXR1cm5zIG9iamVjdCB3aXRoIHBvcywgbmVnIGFuZCB6ZXJvKSwgb25seSBuZWVkIHBvcyBmb3Igbm93OlxuXHQgIHZhciBmb3JtYXRzID0gX2NoZWNrQ3VycmVuY3lGb3JtYXQob3B0cy5mb3JtYXQpO1xuXG5cdCAgLy8gV2hldGhlciB0byBwYWQgYXQgc3RhcnQgb2Ygc3RyaW5nIG9yIGFmdGVyIGN1cnJlbmN5IHN5bWJvbDpcblx0ICB2YXIgcGFkQWZ0ZXJTeW1ib2wgPSBmb3JtYXRzLnBvcy5pbmRleE9mKCclcycpIDwgZm9ybWF0cy5wb3MuaW5kZXhPZignJXYnKTtcblxuXHQgIC8vIFN0b3JlIHZhbHVlIGZvciB0aGUgbGVuZ3RoIG9mIHRoZSBsb25nZXN0IHN0cmluZyBpbiB0aGUgY29sdW1uOlxuXHQgIHZhciBtYXhMZW5ndGggPSAwO1xuXG5cdCAgLy8gRm9ybWF0IHRoZSBsaXN0IGFjY29yZGluZyB0byBvcHRpb25zLCBzdG9yZSB0aGUgbGVuZ3RoIG9mIHRoZSBsb25nZXN0IHN0cmluZzpcblx0ICB2YXIgZm9ybWF0dGVkID0gbGlzdC5tYXAoZnVuY3Rpb24gKHZhbCkge1xuXHQgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuXHQgICAgICAvLyBSZWN1cnNpdmVseSBmb3JtYXQgY29sdW1ucyBpZiBsaXN0IGlzIGEgbXVsdGktZGltZW5zaW9uYWwgYXJyYXk6XG5cdCAgICAgIHJldHVybiBmb3JtYXRDb2x1bW4odmFsLCBvcHRzKTtcblx0ICAgIH1cblx0ICAgIC8vIENsZWFuIHVwIHRoZSB2YWx1ZVxuXHQgICAgdmFsID0gdW5mb3JtYXQodmFsLCBvcHRzLmRlY2ltYWwpO1xuXG5cdCAgICAvLyBDaG9vc2Ugd2hpY2ggZm9ybWF0IHRvIHVzZSBmb3IgdGhpcyB2YWx1ZSAocG9zLCBuZWcgb3IgemVybyk6XG5cdCAgICB2YXIgdXNlRm9ybWF0ID0gdW5kZWZpbmVkO1xuXG5cdCAgICBpZiAodmFsID4gMCkge1xuXHQgICAgICB1c2VGb3JtYXQgPSBmb3JtYXRzLnBvcztcblx0ICAgIH0gZWxzZSBpZiAodmFsIDwgMCkge1xuXHQgICAgICB1c2VGb3JtYXQgPSBmb3JtYXRzLm5lZztcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHVzZUZvcm1hdCA9IGZvcm1hdHMuemVybztcblx0ICAgIH1cblxuXHQgICAgLy8gRm9ybWF0IHRoaXMgdmFsdWUsIHB1c2ggaW50byBmb3JtYXR0ZWQgbGlzdCBhbmQgc2F2ZSB0aGUgbGVuZ3RoOlxuXHQgICAgdmFyIGZWYWwgPSB1c2VGb3JtYXQucmVwbGFjZSgnJXMnLCBvcHRzLnN5bWJvbCkucmVwbGFjZSgnJXYnLCBmb3JtYXROdW1iZXIoTWF0aC5hYnModmFsKSwgb3B0cykpO1xuXG5cdCAgICBpZiAoZlZhbC5sZW5ndGggPiBtYXhMZW5ndGgpIHtcblx0ICAgICAgbWF4TGVuZ3RoID0gZlZhbC5sZW5ndGg7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBmVmFsO1xuXHQgIH0pO1xuXG5cdCAgLy8gUGFkIGVhY2ggbnVtYmVyIGluIHRoZSBsaXN0IGFuZCBzZW5kIGJhY2sgdGhlIGNvbHVtbiBvZiBudW1iZXJzOlxuXHQgIHJldHVybiBmb3JtYXR0ZWQubWFwKGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgIC8vIE9ubHkgaWYgdGhpcyBpcyBhIHN0cmluZyAobm90IGEgbmVzdGVkIGFycmF5LCB3aGljaCB3b3VsZCBoYXZlIGFscmVhZHkgYmVlbiBwYWRkZWQpOlxuXHQgICAgaWYgKGlzU3RyaW5nKHZhbCkgJiYgdmFsLmxlbmd0aCA8IG1heExlbmd0aCkge1xuXHQgICAgICAvLyBEZXBlbmRpbmcgb24gc3ltYm9sIHBvc2l0aW9uLCBwYWQgYWZ0ZXIgc3ltYm9sIG9yIGF0IGluZGV4IDA6XG5cdCAgICAgIHJldHVybiBwYWRBZnRlclN5bWJvbCA/IHZhbC5yZXBsYWNlKG9wdHMuc3ltYm9sLCBvcHRzLnN5bWJvbCArIG5ldyBBcnJheShtYXhMZW5ndGggLSB2YWwubGVuZ3RoICsgMSkuam9pbignICcpKSA6IG5ldyBBcnJheShtYXhMZW5ndGggLSB2YWwubGVuZ3RoICsgMSkuam9pbignICcpICsgdmFsO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIHZhbDtcblx0ICB9KTtcblx0fVxuXG5cdGV4cG9ydHMuc2V0dGluZ3MgPSBzZXR0aW5ncztcblx0ZXhwb3J0cy51bmZvcm1hdCA9IHVuZm9ybWF0O1xuXHRleHBvcnRzLnRvRml4ZWQgPSB0b0ZpeGVkO1xuXHRleHBvcnRzLmZvcm1hdE1vbmV5ID0gZm9ybWF0TW9uZXk7XG5cdGV4cG9ydHMuZm9ybWF0TnVtYmVyID0gZm9ybWF0TnVtYmVyO1xuXHRleHBvcnRzLmZvcm1hdENvbHVtbiA9IGZvcm1hdENvbHVtbjtcblx0ZXhwb3J0cy5mb3JtYXQgPSBmb3JtYXRNb25leTtcblx0ZXhwb3J0cy5wYXJzZSA9IHVuZm9ybWF0O1xuXG59KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hY2NvdW50aW5nLnVtZC5qcy5tYXAiLCIvKiEgZGVjaW1hbC5qcy1saWdodCB2Mi41LjAgaHR0cHM6Ly9naXRodWIuY29tL01pa2VNY2wvZGVjaW1hbC5qcy1saWdodC9MSUNFTkNFICovXHJcbjsoZnVuY3Rpb24gKGdsb2JhbFNjb3BlKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbiAgLypcclxuICAgKiAgZGVjaW1hbC5qcy1saWdodCB2Mi41LjBcclxuICAgKiAgQW4gYXJiaXRyYXJ5LXByZWNpc2lvbiBEZWNpbWFsIHR5cGUgZm9yIEphdmFTY3JpcHQuXHJcbiAgICogIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWtlTWNsL2RlY2ltYWwuanMtbGlnaHRcclxuICAgKiAgQ29weXJpZ2h0IChjKSAyMDE4IE1pY2hhZWwgTWNsYXVnaGxpbiA8TThjaDg4bEBnbWFpbC5jb20+XHJcbiAgICogIE1JVCBFeHBhdCBMaWNlbmNlXHJcbiAgICovXHJcblxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgRURJVEFCTEUgREVGQVVMVFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHJcbiAgICAvLyBUaGUgbGltaXQgb24gdGhlIHZhbHVlIG9mIGBwcmVjaXNpb25gLCBhbmQgb24gdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBhcmd1bWVudCB0b1xyXG4gICAgLy8gYHRvRGVjaW1hbFBsYWNlc2AsIGB0b0V4cG9uZW50aWFsYCwgYHRvRml4ZWRgLCBgdG9QcmVjaXNpb25gIGFuZCBgdG9TaWduaWZpY2FudERpZ2l0c2AuXHJcbiAgdmFyIE1BWF9ESUdJVFMgPSAxZTksICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byAxZTlcclxuXHJcblxyXG4gICAgLy8gVGhlIGluaXRpYWwgY29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzIG9mIHRoZSBEZWNpbWFsIGNvbnN0cnVjdG9yLlxyXG4gICAgRGVjaW1hbCA9IHtcclxuXHJcbiAgICAgIC8vIFRoZXNlIHZhbHVlcyBtdXN0IGJlIGludGVnZXJzIHdpdGhpbiB0aGUgc3RhdGVkIHJhbmdlcyAoaW5jbHVzaXZlKS5cclxuICAgICAgLy8gTW9zdCBvZiB0aGVzZSB2YWx1ZXMgY2FuIGJlIGNoYW5nZWQgZHVyaW5nIHJ1bi10aW1lIHVzaW5nIGBEZWNpbWFsLmNvbmZpZ2AuXHJcblxyXG4gICAgICAvLyBUaGUgbWF4aW11bSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzIG9mIHRoZSByZXN1bHQgb2YgYSBjYWxjdWxhdGlvbiBvciBiYXNlIGNvbnZlcnNpb24uXHJcbiAgICAgIC8vIEUuZy4gYERlY2ltYWwuY29uZmlnKHsgcHJlY2lzaW9uOiAyMCB9KTtgXHJcbiAgICAgIHByZWNpc2lvbjogMjAsICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDEgdG8gTUFYX0RJR0lUU1xyXG5cclxuICAgICAgLy8gVGhlIHJvdW5kaW5nIG1vZGUgdXNlZCBieSBkZWZhdWx0IGJ5IGB0b0ludGVnZXJgLCBgdG9EZWNpbWFsUGxhY2VzYCwgYHRvRXhwb25lbnRpYWxgLFxyXG4gICAgICAvLyBgdG9GaXhlZGAsIGB0b1ByZWNpc2lvbmAgYW5kIGB0b1NpZ25pZmljYW50RGlnaXRzYC5cclxuICAgICAgLy9cclxuICAgICAgLy8gUk9VTkRfVVAgICAgICAgICAwIEF3YXkgZnJvbSB6ZXJvLlxyXG4gICAgICAvLyBST1VORF9ET1dOICAgICAgIDEgVG93YXJkcyB6ZXJvLlxyXG4gICAgICAvLyBST1VORF9DRUlMICAgICAgIDIgVG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAgIC8vIFJPVU5EX0ZMT09SICAgICAgMyBUb3dhcmRzIC1JbmZpbml0eS5cclxuICAgICAgLy8gUk9VTkRfSEFMRl9VUCAgICA0IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB1cC5cclxuICAgICAgLy8gUk9VTkRfSEFMRl9ET1dOICA1IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCBkb3duLlxyXG4gICAgICAvLyBST1VORF9IQUxGX0VWRU4gIDYgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHRvd2FyZHMgZXZlbiBuZWlnaGJvdXIuXHJcbiAgICAgIC8vIFJPVU5EX0hBTEZfQ0VJTCAgNyBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAgIC8vIFJPVU5EX0hBTEZfRkxPT1IgOCBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyAtSW5maW5pdHkuXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIEUuZy5cclxuICAgICAgLy8gYERlY2ltYWwucm91bmRpbmcgPSA0O2BcclxuICAgICAgLy8gYERlY2ltYWwucm91bmRpbmcgPSBEZWNpbWFsLlJPVU5EX0hBTEZfVVA7YFxyXG4gICAgICByb3VuZGluZzogNCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIDhcclxuXHJcbiAgICAgIC8vIFRoZSBleHBvbmVudCB2YWx1ZSBhdCBhbmQgYmVuZWF0aCB3aGljaCBgdG9TdHJpbmdgIHJldHVybnMgZXhwb25lbnRpYWwgbm90YXRpb24uXHJcbiAgICAgIC8vIEphdmFTY3JpcHQgbnVtYmVyczogLTdcclxuICAgICAgdG9FeHBOZWc6IC03LCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byAtTUFYX0VcclxuXHJcbiAgICAgIC8vIFRoZSBleHBvbmVudCB2YWx1ZSBhdCBhbmQgYWJvdmUgd2hpY2ggYHRvU3RyaW5nYCByZXR1cm5zIGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICAvLyBKYXZhU2NyaXB0IG51bWJlcnM6IDIxXHJcbiAgICAgIHRvRXhwUG9zOiAgMjEsICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gTUFYX0VcclxuXHJcbiAgICAgIC8vIFRoZSBuYXR1cmFsIGxvZ2FyaXRobSBvZiAxMC5cclxuICAgICAgLy8gMTE1IGRpZ2l0c1xyXG4gICAgICBMTjEwOiAnMi4zMDI1ODUwOTI5OTQwNDU2ODQwMTc5OTE0NTQ2ODQzNjQyMDc2MDExMDE0ODg2Mjg3NzI5NzYwMzMzMjc5MDA5Njc1NzI2MDk2NzczNTI0ODAyMzU5OTcyMDUwODk1OTgyOTgzNDE5Njc3ODQwNDIyODYnXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRU5EIE9GIEVESVRBQkxFIERFRkFVTFRTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblxyXG4gICAgZXh0ZXJuYWwgPSB0cnVlLFxyXG5cclxuICAgIGRlY2ltYWxFcnJvciA9ICdbRGVjaW1hbEVycm9yXSAnLFxyXG4gICAgaW52YWxpZEFyZ3VtZW50ID0gZGVjaW1hbEVycm9yICsgJ0ludmFsaWQgYXJndW1lbnQ6ICcsXHJcbiAgICBleHBvbmVudE91dE9mUmFuZ2UgPSBkZWNpbWFsRXJyb3IgKyAnRXhwb25lbnQgb3V0IG9mIHJhbmdlOiAnLFxyXG5cclxuICAgIG1hdGhmbG9vciA9IE1hdGguZmxvb3IsXHJcbiAgICBtYXRocG93ID0gTWF0aC5wb3csXHJcblxyXG4gICAgaXNEZWNpbWFsID0gL14oXFxkKyhcXC5cXGQqKT98XFwuXFxkKykoZVsrLV0/XFxkKyk/JC9pLFxyXG5cclxuICAgIE9ORSxcclxuICAgIEJBU0UgPSAxZTcsXHJcbiAgICBMT0dfQkFTRSA9IDcsXHJcbiAgICBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MSxcclxuICAgIE1BWF9FID0gbWF0aGZsb29yKE1BWF9TQUZFX0lOVEVHRVIgLyBMT0dfQkFTRSksICAgIC8vIDEyODY3NDI3NTA2NzcyODRcclxuXHJcbiAgICAvLyBEZWNpbWFsLnByb3RvdHlwZSBvYmplY3RcclxuICAgIFAgPSB7fTtcclxuXHJcblxyXG4gIC8vIERlY2ltYWwgcHJvdG90eXBlIG1ldGhvZHNcclxuXHJcblxyXG4gIC8qXHJcbiAgICogIGFic29sdXRlVmFsdWUgICAgICAgICAgICAgICAgICAgICAgIGFic1xyXG4gICAqICBjb21wYXJlZFRvICAgICAgICAgICAgICAgICAgICAgICAgICBjbXBcclxuICAgKiAgZGVjaW1hbFBsYWNlcyAgICAgICAgICAgICAgICAgICAgICAgZHBcclxuICAgKiAgZGl2aWRlZEJ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2XHJcbiAgICogIGRpdmlkZWRUb0ludGVnZXJCeSAgICAgICAgICAgICAgICAgIGlkaXZcclxuICAgKiAgZXF1YWxzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXFcclxuICAgKiAgZXhwb25lbnRcclxuICAgKiAgZ3JlYXRlclRoYW4gICAgICAgICAgICAgICAgICAgICAgICAgZ3RcclxuICAgKiAgZ3JlYXRlclRoYW5PckVxdWFsVG8gICAgICAgICAgICAgICAgZ3RlXHJcbiAgICogIGlzSW50ZWdlciAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzaW50XHJcbiAgICogIGlzTmVnYXRpdmUgICAgICAgICAgICAgICAgICAgICAgICAgIGlzbmVnXHJcbiAgICogIGlzUG9zaXRpdmUgICAgICAgICAgICAgICAgICAgICAgICAgIGlzcG9zXHJcbiAgICogIGlzWmVyb1xyXG4gICAqICBsZXNzVGhhbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsdFxyXG4gICAqICBsZXNzVGhhbk9yRXF1YWxUbyAgICAgICAgICAgICAgICAgICBsdGVcclxuICAgKiAgbG9nYXJpdGhtICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nXHJcbiAgICogIG1pbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlxyXG4gICAqICBtb2R1bG8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RcclxuICAgKiAgbmF0dXJhbEV4cG9uZW50aWFsICAgICAgICAgICAgICAgICAgZXhwXHJcbiAgICogIG5hdHVyYWxMb2dhcml0aG0gICAgICAgICAgICAgICAgICAgIGxuXHJcbiAgICogIG5lZ2F0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZ1xyXG4gICAqICBwbHVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRcclxuICAgKiAgcHJlY2lzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RcclxuICAgKiAgc3F1YXJlUm9vdCAgICAgICAgICAgICAgICAgICAgICAgICAgc3FydFxyXG4gICAqICB0aW1lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWxcclxuICAgKiAgdG9EZWNpbWFsUGxhY2VzICAgICAgICAgICAgICAgICAgICAgdG9kcFxyXG4gICAqICB0b0V4cG9uZW50aWFsXHJcbiAgICogIHRvRml4ZWRcclxuICAgKiAgdG9JbnRlZ2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9pbnRcclxuICAgKiAgdG9OdW1iZXJcclxuICAgKiAgdG9Qb3dlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG93XHJcbiAgICogIHRvUHJlY2lzaW9uXHJcbiAgICogIHRvU2lnbmlmaWNhbnREaWdpdHMgICAgICAgICAgICAgICAgIHRvc2RcclxuICAgKiAgdG9TdHJpbmdcclxuICAgKiAgdmFsdWVPZiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsXHJcbiAgICovXHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBhYnNvbHV0ZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmFic29sdXRlVmFsdWUgPSBQLmFicyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB4ID0gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcyk7XHJcbiAgICBpZiAoeC5zKSB4LnMgPSAxO1xyXG4gICAgcmV0dXJuIHg7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuXHJcbiAgICogICAxICAgIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZSBvZiBgeWAsXHJcbiAgICogIC0xICAgIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgbGVzcyB0aGFuIHRoZSB2YWx1ZSBvZiBgeWAsXHJcbiAgICogICAwICAgIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSB2YWx1ZVxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5jb21wYXJlZFRvID0gUC5jbXAgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIGksIGosIHhkTCwgeWRMLFxyXG4gICAgICB4ID0gdGhpcztcclxuXHJcbiAgICB5ID0gbmV3IHguY29uc3RydWN0b3IoeSk7XHJcblxyXG4gICAgLy8gU2lnbnMgZGlmZmVyP1xyXG4gICAgaWYgKHgucyAhPT0geS5zKSByZXR1cm4geC5zIHx8IC15LnM7XHJcblxyXG4gICAgLy8gQ29tcGFyZSBleHBvbmVudHMuXHJcbiAgICBpZiAoeC5lICE9PSB5LmUpIHJldHVybiB4LmUgPiB5LmUgXiB4LnMgPCAwID8gMSA6IC0xO1xyXG5cclxuICAgIHhkTCA9IHguZC5sZW5ndGg7XHJcbiAgICB5ZEwgPSB5LmQubGVuZ3RoO1xyXG5cclxuICAgIC8vIENvbXBhcmUgZGlnaXQgYnkgZGlnaXQuXHJcbiAgICBmb3IgKGkgPSAwLCBqID0geGRMIDwgeWRMID8geGRMIDogeWRMOyBpIDwgajsgKytpKSB7XHJcbiAgICAgIGlmICh4LmRbaV0gIT09IHkuZFtpXSkgcmV0dXJuIHguZFtpXSA+IHkuZFtpXSBeIHgucyA8IDAgPyAxIDogLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29tcGFyZSBsZW5ndGhzLlxyXG4gICAgcmV0dXJuIHhkTCA9PT0geWRMID8gMCA6IHhkTCA+IHlkTCBeIHgucyA8IDAgPyAxIDogLTE7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgb2YgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZGVjaW1hbFBsYWNlcyA9IFAuZHAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIHcgPSB4LmQubGVuZ3RoIC0gMSxcclxuICAgICAgZHAgPSAodyAtIHguZSkgKiBMT0dfQkFTRTtcclxuXHJcbiAgICAvLyBTdWJ0cmFjdCB0aGUgbnVtYmVyIG9mIHRyYWlsaW5nIHplcm9zIG9mIHRoZSBsYXN0IHdvcmQuXHJcbiAgICB3ID0geC5kW3ddO1xyXG4gICAgaWYgKHcpIGZvciAoOyB3ICUgMTAgPT0gMDsgdyAvPSAxMCkgZHAtLTtcclxuXHJcbiAgICByZXR1cm4gZHAgPCAwID8gMCA6IGRwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgZGl2aWRlZCBieSBgeWAsIHRydW5jYXRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZGl2aWRlZEJ5ID0gUC5kaXYgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIGRpdmlkZSh0aGlzLCBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih5KSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGludGVnZXIgcGFydCBvZiBkaXZpZGluZyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsXHJcbiAgICogYnkgdGhlIHZhbHVlIG9mIGB5YCwgdHJ1bmNhdGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZGl2aWRlZFRvSW50ZWdlckJ5ID0gUC5pZGl2ID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcbiAgICByZXR1cm4gcm91bmQoZGl2aWRlKHgsIG5ldyBDdG9yKHkpLCAwLCAxKSwgQ3Rvci5wcmVjaXNpb24pO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIGB5YCwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZXF1YWxzID0gUC5lcSA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gIXRoaXMuY21wKHkpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0aGUgKGJhc2UgMTApIGV4cG9uZW50IHZhbHVlIG9mIHRoaXMgRGVjaW1hbCAodGhpcy5lIGlzIHRoZSBiYXNlIDEwMDAwMDAwIGV4cG9uZW50KS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZXhwb25lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gZ2V0QmFzZTEwRXhwb25lbnQodGhpcyk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBncmVhdGVyIHRoYW4gdGhlIHZhbHVlIG9mIGB5YCwgb3RoZXJ3aXNlIHJldHVyblxyXG4gICAqIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5ncmVhdGVyVGhhbiA9IFAuZ3QgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY21wKHkpID4gMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgdmFsdWUgb2YgYHlgLFxyXG4gICAqIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmdyZWF0ZXJUaGFuT3JFcXVhbFRvID0gUC5ndGUgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY21wKHkpID49IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBhbiBpbnRlZ2VyLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5pc0ludGVnZXIgPSBQLmlzaW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZSA+IHRoaXMuZC5sZW5ndGggLSAyO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgbmVnYXRpdmUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmlzTmVnYXRpdmUgPSBQLmlzbmVnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucyA8IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBwb3NpdGl2ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuaXNQb3NpdGl2ZSA9IFAuaXNwb3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zID4gMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIDAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmlzWmVybyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnMgPT09IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBsZXNzIHRoYW4gYHlgLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5sZXNzVGhhbiA9IFAubHQgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY21wKHkpIDwgMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgeWAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmxlc3NUaGFuT3JFcXVhbFRvID0gUC5sdGUgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY21wKHkpIDwgMTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdGhlIGxvZ2FyaXRobSBvZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHRvIHRoZSBzcGVjaWZpZWQgYmFzZSwgdHJ1bmNhdGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICogSWYgbm8gYmFzZSBpcyBzcGVjaWZpZWQsIHJldHVybiBsb2dbMTBdKHgpLlxyXG4gICAqXHJcbiAgICogbG9nW2Jhc2VdKHgpID0gbG4oeCkgLyBsbihiYXNlKVxyXG4gICAqXHJcbiAgICogVGhlIG1heGltdW0gZXJyb3Igb2YgdGhlIHJlc3VsdCBpcyAxIHVscCAodW5pdCBpbiB0aGUgbGFzdCBwbGFjZSkuXHJcbiAgICpcclxuICAgKiBbYmFzZV0ge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gVGhlIGJhc2Ugb2YgdGhlIGxvZ2FyaXRobS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubG9nYXJpdGhtID0gUC5sb2cgPSBmdW5jdGlvbiAoYmFzZSkge1xyXG4gICAgdmFyIHIsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbixcclxuICAgICAgd3ByID0gcHIgKyA1O1xyXG5cclxuICAgIC8vIERlZmF1bHQgYmFzZSBpcyAxMC5cclxuICAgIGlmIChiYXNlID09PSB2b2lkIDApIHtcclxuICAgICAgYmFzZSA9IG5ldyBDdG9yKDEwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGJhc2UgPSBuZXcgQ3RvcihiYXNlKTtcclxuXHJcbiAgICAgIC8vIGxvZ1stYl0oeCkgPSBOYU5cclxuICAgICAgLy8gbG9nWzBdKHgpICA9IE5hTlxyXG4gICAgICAvLyBsb2dbMV0oeCkgID0gTmFOXHJcbiAgICAgIGlmIChiYXNlLnMgPCAxIHx8IGJhc2UuZXEoT05FKSkgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgJ05hTicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGxvZ1tiXSgteCkgPSBOYU5cclxuICAgIC8vIGxvZ1tiXSgwKSA9IC1JbmZpbml0eVxyXG4gICAgaWYgKHgucyA8IDEpIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICh4LnMgPyAnTmFOJyA6ICctSW5maW5pdHknKSk7XHJcblxyXG4gICAgLy8gbG9nW2JdKDEpID0gMFxyXG4gICAgaWYgKHguZXEoT05FKSkgcmV0dXJuIG5ldyBDdG9yKDApO1xyXG5cclxuICAgIGV4dGVybmFsID0gZmFsc2U7XHJcbiAgICByID0gZGl2aWRlKGxuKHgsIHdwciksIGxuKGJhc2UsIHdwciksIHdwcik7XHJcbiAgICBleHRlcm5hbCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHJvdW5kKHIsIHByKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIG1pbnVzIGB5YCwgdHJ1bmNhdGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5taW51cyA9IFAuc3ViID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciB4ID0gdGhpcztcclxuICAgIHkgPSBuZXcgeC5jb25zdHJ1Y3Rvcih5KTtcclxuICAgIHJldHVybiB4LnMgPT0geS5zID8gc3VidHJhY3QoeCwgeSkgOiBhZGQoeCwgKHkucyA9IC15LnMsIHkpKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIG1vZHVsbyBgeWAsIHRydW5jYXRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubW9kdWxvID0gUC5tb2QgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIHEsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuXHJcbiAgICB5ID0gbmV3IEN0b3IoeSk7XHJcblxyXG4gICAgLy8geCAlIDAgPSBOYU5cclxuICAgIGlmICgheS5zKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnTmFOJyk7XHJcblxyXG4gICAgLy8gUmV0dXJuIHggaWYgeCBpcyAwLlxyXG4gICAgaWYgKCF4LnMpIHJldHVybiByb3VuZChuZXcgQ3Rvcih4KSwgcHIpO1xyXG5cclxuICAgIC8vIFByZXZlbnQgcm91bmRpbmcgb2YgaW50ZXJtZWRpYXRlIGNhbGN1bGF0aW9ucy5cclxuICAgIGV4dGVybmFsID0gZmFsc2U7XHJcbiAgICBxID0gZGl2aWRlKHgsIHksIDAsIDEpLnRpbWVzKHkpO1xyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB4Lm1pbnVzKHEpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBuYXR1cmFsIGV4cG9uZW50aWFsIG9mIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwsXHJcbiAgICogaS5lLiB0aGUgYmFzZSBlIHJhaXNlZCB0byB0aGUgcG93ZXIgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCwgdHJ1bmNhdGVkIHRvIGBwcmVjaXNpb25gXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5uYXR1cmFsRXhwb25lbnRpYWwgPSBQLmV4cCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBleHAodGhpcyk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG5hdHVyYWwgbG9nYXJpdGhtIG9mIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwsXHJcbiAgICogdHJ1bmNhdGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubmF0dXJhbExvZ2FyaXRobSA9IFAubG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbG4odGhpcyk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBuZWdhdGVkLCBpLmUuIGFzIGlmIG11bHRpcGxpZWQgYnlcclxuICAgKiAtMS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubmVnYXRlZCA9IFAubmVnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHggPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzKTtcclxuICAgIHgucyA9IC14LnMgfHwgMDtcclxuICAgIHJldHVybiB4O1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgcGx1cyBgeWAsIHRydW5jYXRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAucGx1cyA9IFAuYWRkID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciB4ID0gdGhpcztcclxuICAgIHkgPSBuZXcgeC5jb25zdHJ1Y3Rvcih5KTtcclxuICAgIHJldHVybiB4LnMgPT0geS5zID8gYWRkKHgsIHkpIDogc3VidHJhY3QoeCwgKHkucyA9IC15LnMsIHkpKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHMgb2YgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqIFt6XSB7Ym9vbGVhbnxudW1iZXJ9IFdoZXRoZXIgdG8gY291bnQgaW50ZWdlci1wYXJ0IHRyYWlsaW5nIHplcm9zOiB0cnVlLCBmYWxzZSwgMSBvciAwLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5wcmVjaXNpb24gPSBQLnNkID0gZnVuY3Rpb24gKHopIHtcclxuICAgIHZhciBlLCBzZCwgdyxcclxuICAgICAgeCA9IHRoaXM7XHJcblxyXG4gICAgaWYgKHogIT09IHZvaWQgMCAmJiB6ICE9PSAhIXogJiYgeiAhPT0gMSAmJiB6ICE9PSAwKSB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyB6KTtcclxuXHJcbiAgICBlID0gZ2V0QmFzZTEwRXhwb25lbnQoeCkgKyAxO1xyXG4gICAgdyA9IHguZC5sZW5ndGggLSAxO1xyXG4gICAgc2QgPSB3ICogTE9HX0JBU0UgKyAxO1xyXG4gICAgdyA9IHguZFt3XTtcclxuXHJcbiAgICAvLyBJZiBub24temVyby4uLlxyXG4gICAgaWYgKHcpIHtcclxuXHJcbiAgICAgIC8vIFN1YnRyYWN0IHRoZSBudW1iZXIgb2YgdHJhaWxpbmcgemVyb3Mgb2YgdGhlIGxhc3Qgd29yZC5cclxuICAgICAgZm9yICg7IHcgJSAxMCA9PSAwOyB3IC89IDEwKSBzZC0tO1xyXG5cclxuICAgICAgLy8gQWRkIHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIHRoZSBmaXJzdCB3b3JkLlxyXG4gICAgICBmb3IgKHcgPSB4LmRbMF07IHcgPj0gMTA7IHcgLz0gMTApIHNkKys7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHogJiYgZSA+IHNkID8gZSA6IHNkO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBzcXVhcmUgcm9vdCBvZiB0aGlzIERlY2ltYWwsIHRydW5jYXRlZCB0byBgcHJlY2lzaW9uYFxyXG4gICAqIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuc3F1YXJlUm9vdCA9IFAuc3FydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBlLCBuLCBwciwgciwgcywgdCwgd3ByLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgLy8gTmVnYXRpdmUgb3IgemVybz9cclxuICAgIGlmICh4LnMgPCAxKSB7XHJcbiAgICAgIGlmICgheC5zKSByZXR1cm4gbmV3IEN0b3IoMCk7XHJcblxyXG4gICAgICAvLyBzcXJ0KC14KSA9IE5hTlxyXG4gICAgICB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnTmFOJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpO1xyXG4gICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBJbml0aWFsIGVzdGltYXRlLlxyXG4gICAgcyA9IE1hdGguc3FydCgreCk7XHJcblxyXG4gICAgLy8gTWF0aC5zcXJ0IHVuZGVyZmxvdy9vdmVyZmxvdz9cclxuICAgIC8vIFBhc3MgeCB0byBNYXRoLnNxcnQgYXMgaW50ZWdlciwgdGhlbiBhZGp1c3QgdGhlIGV4cG9uZW50IG9mIHRoZSByZXN1bHQuXHJcbiAgICBpZiAocyA9PSAwIHx8IHMgPT0gMSAvIDApIHtcclxuICAgICAgbiA9IGRpZ2l0c1RvU3RyaW5nKHguZCk7XHJcbiAgICAgIGlmICgobi5sZW5ndGggKyBlKSAlIDIgPT0gMCkgbiArPSAnMCc7XHJcbiAgICAgIHMgPSBNYXRoLnNxcnQobik7XHJcbiAgICAgIGUgPSBtYXRoZmxvb3IoKGUgKyAxKSAvIDIpIC0gKGUgPCAwIHx8IGUgJSAyKTtcclxuXHJcbiAgICAgIGlmIChzID09IDEgLyAwKSB7XHJcbiAgICAgICAgbiA9ICcxZScgKyBlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG4gPSBzLnRvRXhwb25lbnRpYWwoKTtcclxuICAgICAgICBuID0gbi5zbGljZSgwLCBuLmluZGV4T2YoJ2UnKSArIDEpICsgZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgciA9IG5ldyBDdG9yKG4pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgciA9IG5ldyBDdG9yKHMudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuICAgIHMgPSB3cHIgPSBwciArIDM7XHJcblxyXG4gICAgLy8gTmV3dG9uLVJhcGhzb24gaXRlcmF0aW9uLlxyXG4gICAgZm9yICg7Oykge1xyXG4gICAgICB0ID0gcjtcclxuICAgICAgciA9IHQucGx1cyhkaXZpZGUoeCwgdCwgd3ByICsgMikpLnRpbWVzKDAuNSk7XHJcblxyXG4gICAgICBpZiAoZGlnaXRzVG9TdHJpbmcodC5kKS5zbGljZSgwLCB3cHIpID09PSAobiA9IGRpZ2l0c1RvU3RyaW5nKHIuZCkpLnNsaWNlKDAsIHdwcikpIHtcclxuICAgICAgICBuID0gbi5zbGljZSh3cHIgLSAzLCB3cHIgKyAxKTtcclxuXHJcbiAgICAgICAgLy8gVGhlIDR0aCByb3VuZGluZyBkaWdpdCBtYXkgYmUgaW4gZXJyb3IgYnkgLTEgc28gaWYgdGhlIDQgcm91bmRpbmcgZGlnaXRzIGFyZSA5OTk5IG9yXHJcbiAgICAgICAgLy8gNDk5OSwgaS5lLiBhcHByb2FjaGluZyBhIHJvdW5kaW5nIGJvdW5kYXJ5LCBjb250aW51ZSB0aGUgaXRlcmF0aW9uLlxyXG4gICAgICAgIGlmIChzID09IHdwciAmJiBuID09ICc0OTk5Jykge1xyXG5cclxuICAgICAgICAgIC8vIE9uIHRoZSBmaXJzdCBpdGVyYXRpb24gb25seSwgY2hlY2sgdG8gc2VlIGlmIHJvdW5kaW5nIHVwIGdpdmVzIHRoZSBleGFjdCByZXN1bHQgYXMgdGhlXHJcbiAgICAgICAgICAvLyBuaW5lcyBtYXkgaW5maW5pdGVseSByZXBlYXQuXHJcbiAgICAgICAgICByb3VuZCh0LCBwciArIDEsIDApO1xyXG5cclxuICAgICAgICAgIGlmICh0LnRpbWVzKHQpLmVxKHgpKSB7XHJcbiAgICAgICAgICAgIHIgPSB0O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG4gIT0gJzk5OTknKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdwciArPSA0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiByb3VuZChyLCBwcik7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCB0aW1lcyBgeWAsIHRydW5jYXRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudGltZXMgPSBQLm11bCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICB2YXIgY2FycnksIGUsIGksIGssIHIsIHJMLCB0LCB4ZEwsIHlkTCxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICB4ZCA9IHguZCxcclxuICAgICAgeWQgPSAoeSA9IG5ldyBDdG9yKHkpKS5kO1xyXG5cclxuICAgIC8vIFJldHVybiAwIGlmIGVpdGhlciBpcyAwLlxyXG4gICAgaWYgKCF4LnMgfHwgIXkucykgcmV0dXJuIG5ldyBDdG9yKDApO1xyXG5cclxuICAgIHkucyAqPSB4LnM7XHJcbiAgICBlID0geC5lICsgeS5lO1xyXG4gICAgeGRMID0geGQubGVuZ3RoO1xyXG4gICAgeWRMID0geWQubGVuZ3RoO1xyXG5cclxuICAgIC8vIEVuc3VyZSB4ZCBwb2ludHMgdG8gdGhlIGxvbmdlciBhcnJheS5cclxuICAgIGlmICh4ZEwgPCB5ZEwpIHtcclxuICAgICAgciA9IHhkO1xyXG4gICAgICB4ZCA9IHlkO1xyXG4gICAgICB5ZCA9IHI7XHJcbiAgICAgIHJMID0geGRMO1xyXG4gICAgICB4ZEwgPSB5ZEw7XHJcbiAgICAgIHlkTCA9IHJMO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluaXRpYWxpc2UgdGhlIHJlc3VsdCBhcnJheSB3aXRoIHplcm9zLlxyXG4gICAgciA9IFtdO1xyXG4gICAgckwgPSB4ZEwgKyB5ZEw7XHJcbiAgICBmb3IgKGkgPSByTDsgaS0tOykgci5wdXNoKDApO1xyXG5cclxuICAgIC8vIE11bHRpcGx5IVxyXG4gICAgZm9yIChpID0geWRMOyAtLWkgPj0gMDspIHtcclxuICAgICAgY2FycnkgPSAwO1xyXG4gICAgICBmb3IgKGsgPSB4ZEwgKyBpOyBrID4gaTspIHtcclxuICAgICAgICB0ID0gcltrXSArIHlkW2ldICogeGRbayAtIGkgLSAxXSArIGNhcnJ5O1xyXG4gICAgICAgIHJbay0tXSA9IHQgJSBCQVNFIHwgMDtcclxuICAgICAgICBjYXJyeSA9IHQgLyBCQVNFIHwgMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcltrXSA9IChyW2tdICsgY2FycnkpICUgQkFTRSB8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgZm9yICg7ICFyWy0tckxdOykgci5wb3AoKTtcclxuXHJcbiAgICBpZiAoY2FycnkpICsrZTtcclxuICAgIGVsc2Ugci5zaGlmdCgpO1xyXG5cclxuICAgIHkuZCA9IHI7XHJcbiAgICB5LmUgPSBlO1xyXG5cclxuICAgIHJldHVybiBleHRlcm5hbCA/IHJvdW5kKHksIEN0b3IucHJlY2lzaW9uKSA6IHk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByb3VuZGVkIHRvIGEgbWF4aW11bSBvZiBgZHBgXHJcbiAgICogZGVjaW1hbCBwbGFjZXMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm1gIG9yIGByb3VuZGluZ2AgaWYgYHJtYCBpcyBvbWl0dGVkLlxyXG4gICAqXHJcbiAgICogSWYgYGRwYCBpcyBvbWl0dGVkLCByZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvRGVjaW1hbFBsYWNlcyA9IFAudG9kcCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgeCA9IG5ldyBDdG9yKHgpO1xyXG4gICAgaWYgKGRwID09PSB2b2lkIDApIHJldHVybiB4O1xyXG5cclxuICAgIGNoZWNrSW50MzIoZHAsIDAsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgIGlmIChybSA9PT0gdm9pZCAwKSBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICBlbHNlIGNoZWNrSW50MzIocm0sIDAsIDgpO1xyXG5cclxuICAgIHJldHVybiByb3VuZCh4LCBkcCArIGdldEJhc2UxMEV4cG9uZW50KHgpICsgMSwgcm0pO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpbiBleHBvbmVudGlhbCBub3RhdGlvbiByb3VuZGVkIHRvXHJcbiAgICogYGRwYCBmaXhlZCBkZWNpbWFsIHBsYWNlcyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzLiBJbnRlZ2VyLCAwIHRvIE1BWF9ESUdJVFMgaW5jbHVzaXZlLlxyXG4gICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9FeHBvbmVudGlhbCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgIHZhciBzdHIsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICBpZiAoZHAgPT09IHZvaWQgMCkge1xyXG4gICAgICBzdHIgPSB0b1N0cmluZyh4LCB0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoZWNrSW50MzIoZHAsIDAsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgICAgaWYgKHJtID09PSB2b2lkIDApIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgICAgZWxzZSBjaGVja0ludDMyKHJtLCAwLCA4KTtcclxuXHJcbiAgICAgIHggPSByb3VuZChuZXcgQ3Rvcih4KSwgZHAgKyAxLCBybSk7XHJcbiAgICAgIHN0ciA9IHRvU3RyaW5nKHgsIHRydWUsIGRwICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0cjtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaW4gbm9ybWFsIChmaXhlZC1wb2ludCkgbm90YXRpb24gdG9cclxuICAgKiBgZHBgIGZpeGVkIGRlY2ltYWwgcGxhY2VzIGFuZCByb3VuZGVkIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJtYCBvciBgcm91bmRpbmdgIGlmIGBybWAgaXNcclxuICAgKiBvbWl0dGVkLlxyXG4gICAqXHJcbiAgICogQXMgd2l0aCBKYXZhU2NyaXB0IG51bWJlcnMsICgtMCkudG9GaXhlZCgwKSBpcyAnMCcsIGJ1dCBlLmcuICgtMC4wMDAwMSkudG9GaXhlZCgwKSBpcyAnLTAnLlxyXG4gICAqXHJcbiAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKiAoLTApLnRvRml4ZWQoMCkgaXMgJzAnLCBidXQgKC0wLjEpLnRvRml4ZWQoMCkgaXMgJy0wJy5cclxuICAgKiAoLTApLnRvRml4ZWQoMSkgaXMgJzAuMCcsIGJ1dCAoLTAuMDEpLnRvRml4ZWQoMSkgaXMgJy0wLjAnLlxyXG4gICAqICgtMCkudG9GaXhlZCgzKSBpcyAnMC4wMDAnLlxyXG4gICAqICgtMC41KS50b0ZpeGVkKDApIGlzICctMCcuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvRml4ZWQgPSBmdW5jdGlvbiAoZHAsIHJtKSB7XHJcbiAgICB2YXIgc3RyLCB5LFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgaWYgKGRwID09PSB2b2lkIDApIHJldHVybiB0b1N0cmluZyh4KTtcclxuXHJcbiAgICBjaGVja0ludDMyKGRwLCAwLCBNQVhfRElHSVRTKTtcclxuXHJcbiAgICBpZiAocm0gPT09IHZvaWQgMCkgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgZWxzZSBjaGVja0ludDMyKHJtLCAwLCA4KTtcclxuXHJcbiAgICB5ID0gcm91bmQobmV3IEN0b3IoeCksIGRwICsgZ2V0QmFzZTEwRXhwb25lbnQoeCkgKyAxLCBybSk7XHJcbiAgICBzdHIgPSB0b1N0cmluZyh5LmFicygpLCBmYWxzZSwgZHAgKyBnZXRCYXNlMTBFeHBvbmVudCh5KSArIDEpO1xyXG5cclxuICAgIC8vIFRvIGRldGVybWluZSB3aGV0aGVyIHRvIGFkZCB0aGUgbWludXMgc2lnbiBsb29rIGF0IHRoZSB2YWx1ZSBiZWZvcmUgaXQgd2FzIHJvdW5kZWQsXHJcbiAgICAvLyBpLmUuIGxvb2sgYXQgYHhgIHJhdGhlciB0aGFuIGB5YC5cclxuICAgIHJldHVybiB4LmlzbmVnKCkgJiYgIXguaXNaZXJvKCkgPyAnLScgKyBzdHIgOiBzdHI7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByb3VuZGVkIHRvIGEgd2hvbGUgbnVtYmVyIHVzaW5nXHJcbiAgICogcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b0ludGVnZXIgPSBQLnRvaW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuICAgIHJldHVybiByb3VuZChuZXcgQ3Rvcih4KSwgZ2V0QmFzZTEwRXhwb25lbnQoeCkgKyAxLCBDdG9yLnJvdW5kaW5nKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBjb252ZXJ0ZWQgdG8gYSBudW1iZXIgcHJpbWl0aXZlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b051bWJlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiArdGhpcztcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHJhaXNlZCB0byB0aGUgcG93ZXIgYHlgLFxyXG4gICAqIHRydW5jYXRlZCB0byBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKiBGb3Igbm9uLWludGVnZXIgb3IgdmVyeSBsYXJnZSBleHBvbmVudHMgcG93KHgsIHkpIGlzIGNhbGN1bGF0ZWQgdXNpbmdcclxuICAgKlxyXG4gICAqICAgeF55ID0gZXhwKHkqbG4oeCkpXHJcbiAgICpcclxuICAgKiBUaGUgbWF4aW11bSBlcnJvciBpcyAxIHVscCAodW5pdCBpbiBsYXN0IHBsYWNlKS5cclxuICAgKlxyXG4gICAqIHkge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gVGhlIHBvd2VyIHRvIHdoaWNoIHRvIHJhaXNlIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9Qb3dlciA9IFAucG93ID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciBlLCBrLCBwciwgciwgc2lnbiwgeUlzSW50LFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIGd1YXJkID0gMTIsXHJcbiAgICAgIHluID0gKyh5ID0gbmV3IEN0b3IoeSkpO1xyXG5cclxuICAgIC8vIHBvdyh4LCAwKSA9IDFcclxuICAgIGlmICgheS5zKSByZXR1cm4gbmV3IEN0b3IoT05FKTtcclxuXHJcbiAgICB4ID0gbmV3IEN0b3IoeCk7XHJcblxyXG4gICAgLy8gcG93KDAsIHkgPiAwKSA9IDBcclxuICAgIC8vIHBvdygwLCB5IDwgMCkgPSBJbmZpbml0eVxyXG4gICAgaWYgKCF4LnMpIHtcclxuICAgICAgaWYgKHkucyA8IDEpIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdJbmZpbml0eScpO1xyXG4gICAgICByZXR1cm4geDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwb3coMSwgeSkgPSAxXHJcbiAgICBpZiAoeC5lcShPTkUpKSByZXR1cm4geDtcclxuXHJcbiAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG5cclxuICAgIC8vIHBvdyh4LCAxKSA9IHhcclxuICAgIGlmICh5LmVxKE9ORSkpIHJldHVybiByb3VuZCh4LCBwcik7XHJcblxyXG4gICAgZSA9IHkuZTtcclxuICAgIGsgPSB5LmQubGVuZ3RoIC0gMTtcclxuICAgIHlJc0ludCA9IGUgPj0gaztcclxuICAgIHNpZ24gPSB4LnM7XHJcblxyXG4gICAgaWYgKCF5SXNJbnQpIHtcclxuXHJcbiAgICAgIC8vIHBvdyh4IDwgMCwgeSBub24taW50ZWdlcikgPSBOYU5cclxuICAgICAgaWYgKHNpZ24gPCAwKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnTmFOJyk7XHJcblxyXG4gICAgLy8gSWYgeSBpcyBhIHNtYWxsIGludGVnZXIgdXNlIHRoZSAnZXhwb25lbnRpYXRpb24gYnkgc3F1YXJpbmcnIGFsZ29yaXRobS5cclxuICAgIH0gZWxzZSBpZiAoKGsgPSB5biA8IDAgPyAteW4gOiB5bikgPD0gTUFYX1NBRkVfSU5URUdFUikge1xyXG4gICAgICByID0gbmV3IEN0b3IoT05FKTtcclxuXHJcbiAgICAgIC8vIE1heCBrIG9mIDkwMDcxOTkyNTQ3NDA5OTEgdGFrZXMgNTMgbG9vcCBpdGVyYXRpb25zLlxyXG4gICAgICAvLyBNYXhpbXVtIGRpZ2l0cyBhcnJheSBsZW5ndGg7IGxlYXZlcyBbMjgsIDM0XSBndWFyZCBkaWdpdHMuXHJcbiAgICAgIGUgPSBNYXRoLmNlaWwocHIgLyBMT0dfQkFTRSArIDQpO1xyXG5cclxuICAgICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuXHJcbiAgICAgIGZvciAoOzspIHtcclxuICAgICAgICBpZiAoayAlIDIpIHtcclxuICAgICAgICAgIHIgPSByLnRpbWVzKHgpO1xyXG4gICAgICAgICAgdHJ1bmNhdGUoci5kLCBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGsgPSBtYXRoZmxvb3IoayAvIDIpO1xyXG4gICAgICAgIGlmIChrID09PSAwKSBicmVhaztcclxuXHJcbiAgICAgICAgeCA9IHgudGltZXMoeCk7XHJcbiAgICAgICAgdHJ1bmNhdGUoeC5kLCBlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG5cclxuICAgICAgcmV0dXJuIHkucyA8IDAgPyBuZXcgQ3RvcihPTkUpLmRpdihyKSA6IHJvdW5kKHIsIHByKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXN1bHQgaXMgbmVnYXRpdmUgaWYgeCBpcyBuZWdhdGl2ZSBhbmQgdGhlIGxhc3QgZGlnaXQgb2YgaW50ZWdlciB5IGlzIG9kZC5cclxuICAgIHNpZ24gPSBzaWduIDwgMCAmJiB5LmRbTWF0aC5tYXgoZSwgayldICYgMSA/IC0xIDogMTtcclxuXHJcbiAgICB4LnMgPSAxO1xyXG4gICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuICAgIHIgPSB5LnRpbWVzKGxuKHgsIHByICsgZ3VhcmQpKTtcclxuICAgIGV4dGVybmFsID0gdHJ1ZTtcclxuICAgIHIgPSBleHAocik7XHJcbiAgICByLnMgPSBzaWduO1xyXG5cclxuICAgIHJldHVybiByO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByb3VuZGVkIHRvIGBzZGAgc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAgICogdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogUmV0dXJuIGV4cG9uZW50aWFsIG5vdGF0aW9uIGlmIGBzZGAgaXMgbGVzcyB0aGFuIHRoZSBudW1iZXIgb2YgZGlnaXRzIG5lY2Vzc2FyeSB0byByZXByZXNlbnRcclxuICAgKiB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSB2YWx1ZSBpbiBub3JtYWwgbm90YXRpb24uXHJcbiAgICpcclxuICAgKiBbc2RdIHtudW1iZXJ9IFNpZ25pZmljYW50IGRpZ2l0cy4gSW50ZWdlciwgMSB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvUHJlY2lzaW9uID0gZnVuY3Rpb24gKHNkLCBybSkge1xyXG4gICAgdmFyIGUsIHN0cixcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmIChzZCA9PT0gdm9pZCAwKSB7XHJcbiAgICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KTtcclxuICAgICAgc3RyID0gdG9TdHJpbmcoeCwgZSA8PSBDdG9yLnRvRXhwTmVnIHx8IGUgPj0gQ3Rvci50b0V4cFBvcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjaGVja0ludDMyKHNkLCAxLCBNQVhfRElHSVRTKTtcclxuXHJcbiAgICAgIGlmIChybSA9PT0gdm9pZCAwKSBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICAgIGVsc2UgY2hlY2tJbnQzMihybSwgMCwgOCk7XHJcblxyXG4gICAgICB4ID0gcm91bmQobmV3IEN0b3IoeCksIHNkLCBybSk7XHJcbiAgICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KTtcclxuICAgICAgc3RyID0gdG9TdHJpbmcoeCwgc2QgPD0gZSB8fCBlIDw9IEN0b3IudG9FeHBOZWcsIHNkKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgcm91bmRlZCB0byBhIG1heGltdW0gb2YgYHNkYFxyXG4gICAqIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGBybWAsIG9yIHRvIGBwcmVjaXNpb25gIGFuZCBgcm91bmRpbmdgIHJlc3BlY3RpdmVseSBpZlxyXG4gICAqIG9taXR0ZWQuXHJcbiAgICpcclxuICAgKiBbc2RdIHtudW1iZXJ9IFNpZ25pZmljYW50IGRpZ2l0cy4gSW50ZWdlciwgMSB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvU2lnbmlmaWNhbnREaWdpdHMgPSBQLnRvc2QgPSBmdW5jdGlvbiAoc2QsIHJtKSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmIChzZCA9PT0gdm9pZCAwKSB7XHJcbiAgICAgIHNkID0gQ3Rvci5wcmVjaXNpb247XHJcbiAgICAgIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoZWNrSW50MzIoc2QsIDEsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgICAgaWYgKHJtID09PSB2b2lkIDApIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgICAgZWxzZSBjaGVja0ludDMyKHJtLCAwLCA4KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcm91bmQobmV3IEN0b3IoeCksIHNkLCBybSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICogUmV0dXJuIGV4cG9uZW50aWFsIG5vdGF0aW9uIGlmIHRoaXMgRGVjaW1hbCBoYXMgYSBwb3NpdGl2ZSBleHBvbmVudCBlcXVhbCB0byBvciBncmVhdGVyIHRoYW5cclxuICAgKiBgdG9FeHBQb3NgLCBvciBhIG5lZ2F0aXZlIGV4cG9uZW50IGVxdWFsIHRvIG9yIGxlc3MgdGhhbiBgdG9FeHBOZWdgLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b1N0cmluZyA9IFAudmFsdWVPZiA9IFAudmFsID0gUC50b0pTT04gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KSxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgcmV0dXJuIHRvU3RyaW5nKHgsIGUgPD0gQ3Rvci50b0V4cE5lZyB8fCBlID49IEN0b3IudG9FeHBQb3MpO1xyXG4gIH07XHJcblxyXG5cclxuICAvLyBIZWxwZXIgZnVuY3Rpb25zIGZvciBEZWNpbWFsLnByb3RvdHlwZSAoUCkgYW5kL29yIERlY2ltYWwgbWV0aG9kcywgYW5kIHRoZWlyIGNhbGxlcnMuXHJcblxyXG5cclxuICAvKlxyXG4gICAqICBhZGQgICAgICAgICAgICAgICAgIFAubWludXMsIFAucGx1c1xyXG4gICAqICBjaGVja0ludDMyICAgICAgICAgIFAudG9kcCwgUC50b0V4cG9uZW50aWFsLCBQLnRvRml4ZWQsIFAudG9QcmVjaXNpb24sIFAudG9zZFxyXG4gICAqICBkaWdpdHNUb1N0cmluZyAgICAgIFAubG9nLCBQLnNxcnQsIFAucG93LCB0b1N0cmluZywgZXhwLCBsblxyXG4gICAqICBkaXZpZGUgICAgICAgICAgICAgIFAuZGl2LCBQLmlkaXYsIFAubG9nLCBQLm1vZCwgUC5zcXJ0LCBleHAsIGxuXHJcbiAgICogIGV4cCAgICAgICAgICAgICAgICAgUC5leHAsIFAucG93XHJcbiAgICogIGdldEJhc2UxMEV4cG9uZW50ICAgUC5leHBvbmVudCwgUC5zZCwgUC50b2ludCwgUC5zcXJ0LCBQLnRvZHAsIFAudG9GaXhlZCwgUC50b1ByZWNpc2lvbixcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICBQLnRvU3RyaW5nLCBkaXZpZGUsIHJvdW5kLCB0b1N0cmluZywgZXhwLCBsblxyXG4gICAqICBnZXRMbjEwICAgICAgICAgICAgIFAubG9nLCBsblxyXG4gICAqICBnZXRaZXJvU3RyaW5nICAgICAgIGRpZ2l0c1RvU3RyaW5nLCB0b1N0cmluZ1xyXG4gICAqICBsbiAgICAgICAgICAgICAgICAgIFAubG9nLCBQLmxuLCBQLnBvdywgZXhwXHJcbiAgICogIHBhcnNlRGVjaW1hbCAgICAgICAgRGVjaW1hbFxyXG4gICAqICByb3VuZCAgICAgICAgICAgICAgIFAuYWJzLCBQLmlkaXYsIFAubG9nLCBQLm1pbnVzLCBQLm1vZCwgUC5uZWcsIFAucGx1cywgUC50b2ludCwgUC5zcXJ0LFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgIFAudGltZXMsIFAudG9kcCwgUC50b0V4cG9uZW50aWFsLCBQLnRvRml4ZWQsIFAucG93LCBQLnRvUHJlY2lzaW9uLCBQLnRvc2QsXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgZGl2aWRlLCBnZXRMbjEwLCBleHAsIGxuXHJcbiAgICogIHN1YnRyYWN0ICAgICAgICAgICAgUC5taW51cywgUC5wbHVzXHJcbiAgICogIHRvU3RyaW5nICAgICAgICAgICAgUC50b0V4cG9uZW50aWFsLCBQLnRvRml4ZWQsIFAudG9QcmVjaXNpb24sIFAudG9TdHJpbmcsIFAudmFsdWVPZlxyXG4gICAqICB0cnVuY2F0ZSAgICAgICAgICAgIFAucG93XHJcbiAgICpcclxuICAgKiAgVGhyb3dzOiAgICAgICAgICAgICBQLmxvZywgUC5tb2QsIFAuc2QsIFAuc3FydCwgUC5wb3csICBjaGVja0ludDMyLCBkaXZpZGUsIHJvdW5kLFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgIGdldExuMTAsIGV4cCwgbG4sIHBhcnNlRGVjaW1hbCwgRGVjaW1hbCwgY29uZmlnXHJcbiAgICovXHJcblxyXG5cclxuICBmdW5jdGlvbiBhZGQoeCwgeSkge1xyXG4gICAgdmFyIGNhcnJ5LCBkLCBlLCBpLCBrLCBsZW4sIHhkLCB5ZCxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcblxyXG4gICAgLy8gSWYgZWl0aGVyIGlzIHplcm8uLi5cclxuICAgIGlmICgheC5zIHx8ICF5LnMpIHtcclxuXHJcbiAgICAgIC8vIFJldHVybiB4IGlmIHkgaXMgemVyby5cclxuICAgICAgLy8gUmV0dXJuIHkgaWYgeSBpcyBub24temVyby5cclxuICAgICAgaWYgKCF5LnMpIHkgPSBuZXcgQ3Rvcih4KTtcclxuICAgICAgcmV0dXJuIGV4dGVybmFsID8gcm91bmQoeSwgcHIpIDogeTtcclxuICAgIH1cclxuXHJcbiAgICB4ZCA9IHguZDtcclxuICAgIHlkID0geS5kO1xyXG5cclxuICAgIC8vIHggYW5kIHkgYXJlIGZpbml0ZSwgbm9uLXplcm8gbnVtYmVycyB3aXRoIHRoZSBzYW1lIHNpZ24uXHJcblxyXG4gICAgayA9IHguZTtcclxuICAgIGUgPSB5LmU7XHJcbiAgICB4ZCA9IHhkLnNsaWNlKCk7XHJcbiAgICBpID0gayAtIGU7XHJcblxyXG4gICAgLy8gSWYgYmFzZSAxZTcgZXhwb25lbnRzIGRpZmZlci4uLlxyXG4gICAgaWYgKGkpIHtcclxuICAgICAgaWYgKGkgPCAwKSB7XHJcbiAgICAgICAgZCA9IHhkO1xyXG4gICAgICAgIGkgPSAtaTtcclxuICAgICAgICBsZW4gPSB5ZC5sZW5ndGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZCA9IHlkO1xyXG4gICAgICAgIGUgPSBrO1xyXG4gICAgICAgIGxlbiA9IHhkLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTGltaXQgbnVtYmVyIG9mIHplcm9zIHByZXBlbmRlZCB0byBtYXgoY2VpbChwciAvIExPR19CQVNFKSwgbGVuKSArIDEuXHJcbiAgICAgIGsgPSBNYXRoLmNlaWwocHIgLyBMT0dfQkFTRSk7XHJcbiAgICAgIGxlbiA9IGsgPiBsZW4gPyBrICsgMSA6IGxlbiArIDE7XHJcblxyXG4gICAgICBpZiAoaSA+IGxlbikge1xyXG4gICAgICAgIGkgPSBsZW47XHJcbiAgICAgICAgZC5sZW5ndGggPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBQcmVwZW5kIHplcm9zIHRvIGVxdWFsaXNlIGV4cG9uZW50cy4gTm90ZTogRmFzdGVyIHRvIHVzZSByZXZlcnNlIHRoZW4gZG8gdW5zaGlmdHMuXHJcbiAgICAgIGQucmV2ZXJzZSgpO1xyXG4gICAgICBmb3IgKDsgaS0tOykgZC5wdXNoKDApO1xyXG4gICAgICBkLnJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZW4gPSB4ZC5sZW5ndGg7XHJcbiAgICBpID0geWQubGVuZ3RoO1xyXG5cclxuICAgIC8vIElmIHlkIGlzIGxvbmdlciB0aGFuIHhkLCBzd2FwIHhkIGFuZCB5ZCBzbyB4ZCBwb2ludHMgdG8gdGhlIGxvbmdlciBhcnJheS5cclxuICAgIGlmIChsZW4gLSBpIDwgMCkge1xyXG4gICAgICBpID0gbGVuO1xyXG4gICAgICBkID0geWQ7XHJcbiAgICAgIHlkID0geGQ7XHJcbiAgICAgIHhkID0gZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPbmx5IHN0YXJ0IGFkZGluZyBhdCB5ZC5sZW5ndGggLSAxIGFzIHRoZSBmdXJ0aGVyIGRpZ2l0cyBvZiB4ZCBjYW4gYmUgbGVmdCBhcyB0aGV5IGFyZS5cclxuICAgIGZvciAoY2FycnkgPSAwOyBpOykge1xyXG4gICAgICBjYXJyeSA9ICh4ZFstLWldID0geGRbaV0gKyB5ZFtpXSArIGNhcnJ5KSAvIEJBU0UgfCAwO1xyXG4gICAgICB4ZFtpXSAlPSBCQVNFO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjYXJyeSkge1xyXG4gICAgICB4ZC51bnNoaWZ0KGNhcnJ5KTtcclxuICAgICAgKytlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIC8vIE5vIG5lZWQgdG8gY2hlY2sgZm9yIHplcm8sIGFzICt4ICsgK3kgIT0gMCAmJiAteCArIC15ICE9IDBcclxuICAgIGZvciAobGVuID0geGQubGVuZ3RoOyB4ZFstLWxlbl0gPT0gMDspIHhkLnBvcCgpO1xyXG5cclxuICAgIHkuZCA9IHhkO1xyXG4gICAgeS5lID0gZTtcclxuXHJcbiAgICByZXR1cm4gZXh0ZXJuYWwgPyByb3VuZCh5LCBwcikgOiB5O1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGNoZWNrSW50MzIoaSwgbWluLCBtYXgpIHtcclxuICAgIGlmIChpICE9PSB+fmkgfHwgaSA8IG1pbiB8fCBpID4gbWF4KSB7XHJcbiAgICAgIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIGkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGRpZ2l0c1RvU3RyaW5nKGQpIHtcclxuICAgIHZhciBpLCBrLCB3cyxcclxuICAgICAgaW5kZXhPZkxhc3RXb3JkID0gZC5sZW5ndGggLSAxLFxyXG4gICAgICBzdHIgPSAnJyxcclxuICAgICAgdyA9IGRbMF07XHJcblxyXG4gICAgaWYgKGluZGV4T2ZMYXN0V29yZCA+IDApIHtcclxuICAgICAgc3RyICs9IHc7XHJcbiAgICAgIGZvciAoaSA9IDE7IGkgPCBpbmRleE9mTGFzdFdvcmQ7IGkrKykge1xyXG4gICAgICAgIHdzID0gZFtpXSArICcnO1xyXG4gICAgICAgIGsgPSBMT0dfQkFTRSAtIHdzLmxlbmd0aDtcclxuICAgICAgICBpZiAoaykgc3RyICs9IGdldFplcm9TdHJpbmcoayk7XHJcbiAgICAgICAgc3RyICs9IHdzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB3ID0gZFtpXTtcclxuICAgICAgd3MgPSB3ICsgJyc7XHJcbiAgICAgIGsgPSBMT0dfQkFTRSAtIHdzLmxlbmd0aDtcclxuICAgICAgaWYgKGspIHN0ciArPSBnZXRaZXJvU3RyaW5nKGspO1xyXG4gICAgfSBlbHNlIGlmICh3ID09PSAwKSB7XHJcbiAgICAgIHJldHVybiAnMCc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zIG9mIGxhc3Qgdy5cclxuICAgIGZvciAoOyB3ICUgMTAgPT09IDA7KSB3IC89IDEwO1xyXG5cclxuICAgIHJldHVybiBzdHIgKyB3O1xyXG4gIH1cclxuXHJcblxyXG4gIHZhciBkaXZpZGUgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIEFzc3VtZXMgbm9uLXplcm8geCBhbmQgaywgYW5kIGhlbmNlIG5vbi16ZXJvIHJlc3VsdC5cclxuICAgIGZ1bmN0aW9uIG11bHRpcGx5SW50ZWdlcih4LCBrKSB7XHJcbiAgICAgIHZhciB0ZW1wLFxyXG4gICAgICAgIGNhcnJ5ID0gMCxcclxuICAgICAgICBpID0geC5sZW5ndGg7XHJcblxyXG4gICAgICBmb3IgKHggPSB4LnNsaWNlKCk7IGktLTspIHtcclxuICAgICAgICB0ZW1wID0geFtpXSAqIGsgKyBjYXJyeTtcclxuICAgICAgICB4W2ldID0gdGVtcCAlIEJBU0UgfCAwO1xyXG4gICAgICAgIGNhcnJ5ID0gdGVtcCAvIEJBU0UgfCAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2FycnkpIHgudW5zaGlmdChjYXJyeSk7XHJcblxyXG4gICAgICByZXR1cm4geDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb21wYXJlKGEsIGIsIGFMLCBiTCkge1xyXG4gICAgICB2YXIgaSwgcjtcclxuXHJcbiAgICAgIGlmIChhTCAhPSBiTCkge1xyXG4gICAgICAgIHIgPSBhTCA+IGJMID8gMSA6IC0xO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAoaSA9IHIgPSAwOyBpIDwgYUw7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGFbaV0gIT0gYltpXSkge1xyXG4gICAgICAgICAgICByID0gYVtpXSA+IGJbaV0gPyAxIDogLTE7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3VidHJhY3QoYSwgYiwgYUwpIHtcclxuICAgICAgdmFyIGkgPSAwO1xyXG5cclxuICAgICAgLy8gU3VidHJhY3QgYiBmcm9tIGEuXHJcbiAgICAgIGZvciAoOyBhTC0tOykge1xyXG4gICAgICAgIGFbYUxdIC09IGk7XHJcbiAgICAgICAgaSA9IGFbYUxdIDwgYlthTF0gPyAxIDogMDtcclxuICAgICAgICBhW2FMXSA9IGkgKiBCQVNFICsgYVthTF0gLSBiW2FMXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgIGZvciAoOyAhYVswXSAmJiBhLmxlbmd0aCA+IDE7KSBhLnNoaWZ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh4LCB5LCBwciwgZHApIHtcclxuICAgICAgdmFyIGNtcCwgZSwgaSwgaywgcHJvZCwgcHJvZEwsIHEsIHFkLCByZW0sIHJlbUwsIHJlbTAsIHNkLCB0LCB4aSwgeEwsIHlkMCwgeUwsIHl6LFxyXG4gICAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICAgIHNpZ24gPSB4LnMgPT0geS5zID8gMSA6IC0xLFxyXG4gICAgICAgIHhkID0geC5kLFxyXG4gICAgICAgIHlkID0geS5kO1xyXG5cclxuICAgICAgLy8gRWl0aGVyIDA/XHJcbiAgICAgIGlmICgheC5zKSByZXR1cm4gbmV3IEN0b3IoeCk7XHJcbiAgICAgIGlmICgheS5zKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnRGl2aXNpb24gYnkgemVybycpO1xyXG5cclxuICAgICAgZSA9IHguZSAtIHkuZTtcclxuICAgICAgeUwgPSB5ZC5sZW5ndGg7XHJcbiAgICAgIHhMID0geGQubGVuZ3RoO1xyXG4gICAgICBxID0gbmV3IEN0b3Ioc2lnbik7XHJcbiAgICAgIHFkID0gcS5kID0gW107XHJcblxyXG4gICAgICAvLyBSZXN1bHQgZXhwb25lbnQgbWF5IGJlIG9uZSBsZXNzIHRoYW4gZS5cclxuICAgICAgZm9yIChpID0gMDsgeWRbaV0gPT0gKHhkW2ldIHx8IDApOyApICsraTtcclxuICAgICAgaWYgKHlkW2ldID4gKHhkW2ldIHx8IDApKSAtLWU7XHJcblxyXG4gICAgICBpZiAocHIgPT0gbnVsbCkge1xyXG4gICAgICAgIHNkID0gcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuICAgICAgfSBlbHNlIGlmIChkcCkge1xyXG4gICAgICAgIHNkID0gcHIgKyAoZ2V0QmFzZTEwRXhwb25lbnQoeCkgLSBnZXRCYXNlMTBFeHBvbmVudCh5KSkgKyAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNkID0gcHI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzZCA8IDApIHJldHVybiBuZXcgQ3RvcigwKTtcclxuXHJcbiAgICAgIC8vIENvbnZlcnQgcHJlY2lzaW9uIGluIG51bWJlciBvZiBiYXNlIDEwIGRpZ2l0cyB0byBiYXNlIDFlNyBkaWdpdHMuXHJcbiAgICAgIHNkID0gc2QgLyBMT0dfQkFTRSArIDIgfCAwO1xyXG4gICAgICBpID0gMDtcclxuXHJcbiAgICAgIC8vIGRpdmlzb3IgPCAxZTdcclxuICAgICAgaWYgKHlMID09IDEpIHtcclxuICAgICAgICBrID0gMDtcclxuICAgICAgICB5ZCA9IHlkWzBdO1xyXG4gICAgICAgIHNkKys7XHJcblxyXG4gICAgICAgIC8vIGsgaXMgdGhlIGNhcnJ5LlxyXG4gICAgICAgIGZvciAoOyAoaSA8IHhMIHx8IGspICYmIHNkLS07IGkrKykge1xyXG4gICAgICAgICAgdCA9IGsgKiBCQVNFICsgKHhkW2ldIHx8IDApO1xyXG4gICAgICAgICAgcWRbaV0gPSB0IC8geWQgfCAwO1xyXG4gICAgICAgICAgayA9IHQgJSB5ZCB8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgLy8gZGl2aXNvciA+PSAxZTdcclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgLy8gTm9ybWFsaXNlIHhkIGFuZCB5ZCBzbyBoaWdoZXN0IG9yZGVyIGRpZ2l0IG9mIHlkIGlzID49IEJBU0UvMlxyXG4gICAgICAgIGsgPSBCQVNFIC8gKHlkWzBdICsgMSkgfCAwO1xyXG5cclxuICAgICAgICBpZiAoayA+IDEpIHtcclxuICAgICAgICAgIHlkID0gbXVsdGlwbHlJbnRlZ2VyKHlkLCBrKTtcclxuICAgICAgICAgIHhkID0gbXVsdGlwbHlJbnRlZ2VyKHhkLCBrKTtcclxuICAgICAgICAgIHlMID0geWQubGVuZ3RoO1xyXG4gICAgICAgICAgeEwgPSB4ZC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB4aSA9IHlMO1xyXG4gICAgICAgIHJlbSA9IHhkLnNsaWNlKDAsIHlMKTtcclxuICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8gQWRkIHplcm9zIHRvIG1ha2UgcmVtYWluZGVyIGFzIGxvbmcgYXMgZGl2aXNvci5cclxuICAgICAgICBmb3IgKDsgcmVtTCA8IHlMOykgcmVtW3JlbUwrK10gPSAwO1xyXG5cclxuICAgICAgICB5eiA9IHlkLnNsaWNlKCk7XHJcbiAgICAgICAgeXoudW5zaGlmdCgwKTtcclxuICAgICAgICB5ZDAgPSB5ZFswXTtcclxuXHJcbiAgICAgICAgaWYgKHlkWzFdID49IEJBU0UgLyAyKSArK3lkMDtcclxuXHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgayA9IDA7XHJcblxyXG4gICAgICAgICAgLy8gQ29tcGFyZSBkaXZpc29yIGFuZCByZW1haW5kZXIuXHJcbiAgICAgICAgICBjbXAgPSBjb21wYXJlKHlkLCByZW0sIHlMLCByZW1MKTtcclxuXHJcbiAgICAgICAgICAvLyBJZiBkaXZpc29yIDwgcmVtYWluZGVyLlxyXG4gICAgICAgICAgaWYgKGNtcCA8IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0cmlhbCBkaWdpdCwgay5cclxuICAgICAgICAgICAgcmVtMCA9IHJlbVswXTtcclxuICAgICAgICAgICAgaWYgKHlMICE9IHJlbUwpIHJlbTAgPSByZW0wICogQkFTRSArIChyZW1bMV0gfHwgMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBrIHdpbGwgYmUgaG93IG1hbnkgdGltZXMgdGhlIGRpdmlzb3IgZ29lcyBpbnRvIHRoZSBjdXJyZW50IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgayA9IHJlbTAgLyB5ZDAgfCAwO1xyXG5cclxuICAgICAgICAgICAgLy8gIEFsZ29yaXRobTpcclxuICAgICAgICAgICAgLy8gIDEuIHByb2R1Y3QgPSBkaXZpc29yICogdHJpYWwgZGlnaXQgKGspXHJcbiAgICAgICAgICAgIC8vICAyLiBpZiBwcm9kdWN0ID4gcmVtYWluZGVyOiBwcm9kdWN0IC09IGRpdmlzb3IsIGstLVxyXG4gICAgICAgICAgICAvLyAgMy4gcmVtYWluZGVyIC09IHByb2R1Y3RcclxuICAgICAgICAgICAgLy8gIDQuIGlmIHByb2R1Y3Qgd2FzIDwgcmVtYWluZGVyIGF0IDI6XHJcbiAgICAgICAgICAgIC8vICAgIDUuIGNvbXBhcmUgbmV3IHJlbWFpbmRlciBhbmQgZGl2aXNvclxyXG4gICAgICAgICAgICAvLyAgICA2LiBJZiByZW1haW5kZXIgPiBkaXZpc29yOiByZW1haW5kZXIgLT0gZGl2aXNvciwgaysrXHJcblxyXG4gICAgICAgICAgICBpZiAoayA+IDEpIHtcclxuICAgICAgICAgICAgICBpZiAoayA+PSBCQVNFKSBrID0gQkFTRSAtIDE7XHJcblxyXG4gICAgICAgICAgICAgIC8vIHByb2R1Y3QgPSBkaXZpc29yICogdHJpYWwgZGlnaXQuXHJcbiAgICAgICAgICAgICAgcHJvZCA9IG11bHRpcGx5SW50ZWdlcih5ZCwgayk7XHJcbiAgICAgICAgICAgICAgcHJvZEwgPSBwcm9kLmxlbmd0aDtcclxuICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQ29tcGFyZSBwcm9kdWN0IGFuZCByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgY21wID0gY29tcGFyZShwcm9kLCByZW0sIHByb2RMLCByZW1MKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gcHJvZHVjdCA+IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICBpZiAoY21wID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGstLTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdWJ0cmFjdCBkaXZpc29yIGZyb20gcHJvZHVjdC5cclxuICAgICAgICAgICAgICAgIHN1YnRyYWN0KHByb2QsIHlMIDwgcHJvZEwgPyB5eiA6IHlkLCBwcm9kTCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAvLyBjbXAgaXMgLTEuXHJcbiAgICAgICAgICAgICAgLy8gSWYgayBpcyAwLCB0aGVyZSBpcyBubyBuZWVkIHRvIGNvbXBhcmUgeWQgYW5kIHJlbSBhZ2FpbiBiZWxvdywgc28gY2hhbmdlIGNtcCB0byAxXHJcbiAgICAgICAgICAgICAgLy8gdG8gYXZvaWQgaXQuIElmIGsgaXMgMSB0aGVyZSBpcyBhIG5lZWQgdG8gY29tcGFyZSB5ZCBhbmQgcmVtIGFnYWluIGJlbG93LlxyXG4gICAgICAgICAgICAgIGlmIChrID09IDApIGNtcCA9IGsgPSAxO1xyXG4gICAgICAgICAgICAgIHByb2QgPSB5ZC5zbGljZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcm9kTCA9IHByb2QubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAocHJvZEwgPCByZW1MKSBwcm9kLnVuc2hpZnQoMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTdWJ0cmFjdCBwcm9kdWN0IGZyb20gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICBzdWJ0cmFjdChyZW0sIHByb2QsIHJlbUwpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgcHJvZHVjdCB3YXMgPCBwcmV2aW91cyByZW1haW5kZXIuXHJcbiAgICAgICAgICAgIGlmIChjbXAgPT0gLTEpIHtcclxuICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQ29tcGFyZSBkaXZpc29yIGFuZCBuZXcgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIGNtcCA9IGNvbXBhcmUoeWQsIHJlbSwgeUwsIHJlbUwpO1xyXG5cclxuICAgICAgICAgICAgICAvLyBJZiBkaXZpc29yIDwgbmV3IHJlbWFpbmRlciwgc3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICBpZiAoY21wIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgaysrO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN1YnRyYWN0IGRpdmlzb3IgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmFjdChyZW0sIHlMIDwgcmVtTCA/IHl6IDogeWQsIHJlbUwpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVtTCA9IHJlbS5sZW5ndGg7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGNtcCA9PT0gMCkge1xyXG4gICAgICAgICAgICBrKys7XHJcbiAgICAgICAgICAgIHJlbSA9IFswXTtcclxuICAgICAgICAgIH0gICAgLy8gaWYgY21wID09PSAxLCBrIHdpbGwgYmUgMFxyXG5cclxuICAgICAgICAgIC8vIEFkZCB0aGUgbmV4dCBkaWdpdCwgaywgdG8gdGhlIHJlc3VsdCBhcnJheS5cclxuICAgICAgICAgIHFkW2krK10gPSBrO1xyXG5cclxuICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgcmVtYWluZGVyLlxyXG4gICAgICAgICAgaWYgKGNtcCAmJiByZW1bMF0pIHtcclxuICAgICAgICAgICAgcmVtW3JlbUwrK10gPSB4ZFt4aV0gfHwgMDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlbSA9IFt4ZFt4aV1dO1xyXG4gICAgICAgICAgICByZW1MID0gMTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSB3aGlsZSAoKHhpKysgPCB4TCB8fCByZW1bMF0gIT09IHZvaWQgMCkgJiYgc2QtLSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIExlYWRpbmcgemVybz9cclxuICAgICAgaWYgKCFxZFswXSkgcWQuc2hpZnQoKTtcclxuXHJcbiAgICAgIHEuZSA9IGU7XHJcblxyXG4gICAgICByZXR1cm4gcm91bmQocSwgZHAgPyBwciArIGdldEJhc2UxMEV4cG9uZW50KHEpICsgMSA6IHByKTtcclxuICAgIH07XHJcbiAgfSkoKTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG5hdHVyYWwgZXhwb25lbnRpYWwgb2YgYHhgIHRydW5jYXRlZCB0byBgc2RgXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICogVGF5bG9yL01hY2xhdXJpbiBzZXJpZXMuXHJcbiAgICpcclxuICAgKiBleHAoeCkgPSB4XjAvMCEgKyB4XjEvMSEgKyB4XjIvMiEgKyB4XjMvMyEgKyAuLi5cclxuICAgKlxyXG4gICAqIEFyZ3VtZW50IHJlZHVjdGlvbjpcclxuICAgKiAgIFJlcGVhdCB4ID0geCAvIDMyLCBrICs9IDUsIHVudGlsIHx4fCA8IDAuMVxyXG4gICAqICAgZXhwKHgpID0gZXhwKHggLyAyXmspXigyXmspXHJcbiAgICpcclxuICAgKiBQcmV2aW91c2x5LCB0aGUgYXJndW1lbnQgd2FzIGluaXRpYWxseSByZWR1Y2VkIGJ5XHJcbiAgICogZXhwKHgpID0gZXhwKHIpICogMTBeayAgd2hlcmUgciA9IHggLSBrICogbG4xMCwgayA9IGZsb29yKHggLyBsbjEwKVxyXG4gICAqIHRvIGZpcnN0IHB1dCByIGluIHRoZSByYW5nZSBbMCwgbG4xMF0sIGJlZm9yZSBkaXZpZGluZyBieSAzMiB1bnRpbCB8eHwgPCAwLjEsIGJ1dCB0aGlzIHdhc1xyXG4gICAqIGZvdW5kIHRvIGJlIHNsb3dlciB0aGFuIGp1c3QgZGl2aWRpbmcgcmVwZWF0ZWRseSBieSAzMiBhcyBhYm92ZS5cclxuICAgKlxyXG4gICAqIChNYXRoIG9iamVjdCBpbnRlZ2VyIG1pbi9tYXg6IE1hdGguZXhwKDcwOSkgPSA4LjJlKzMwNywgTWF0aC5leHAoLTc0NSkgPSA1ZS0zMjQpXHJcbiAgICpcclxuICAgKiAgZXhwKHgpIGlzIG5vbi10ZXJtaW5hdGluZyBmb3IgYW55IGZpbml0ZSwgbm9uLXplcm8geC5cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGV4cCh4LCBzZCkge1xyXG4gICAgdmFyIGRlbm9taW5hdG9yLCBndWFyZCwgcG93LCBzdW0sIHQsIHdwcixcclxuICAgICAgaSA9IDAsXHJcbiAgICAgIGsgPSAwLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuXHJcbiAgICBpZiAoZ2V0QmFzZTEwRXhwb25lbnQoeCkgPiAxNikgdGhyb3cgRXJyb3IoZXhwb25lbnRPdXRPZlJhbmdlICsgZ2V0QmFzZTEwRXhwb25lbnQoeCkpO1xyXG5cclxuICAgIC8vIGV4cCgwKSA9IDFcclxuICAgIGlmICgheC5zKSByZXR1cm4gbmV3IEN0b3IoT05FKTtcclxuXHJcbiAgICBpZiAoc2QgPT0gbnVsbCkge1xyXG4gICAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG4gICAgICB3cHIgPSBwcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdwciA9IHNkO1xyXG4gICAgfVxyXG5cclxuICAgIHQgPSBuZXcgQ3RvcigwLjAzMTI1KTtcclxuXHJcbiAgICB3aGlsZSAoeC5hYnMoKS5ndGUoMC4xKSkge1xyXG4gICAgICB4ID0geC50aW1lcyh0KTsgICAgLy8geCA9IHggLyAyXjVcclxuICAgICAgayArPSA1O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEVzdGltYXRlIHRoZSBwcmVjaXNpb24gaW5jcmVhc2UgbmVjZXNzYXJ5IHRvIGVuc3VyZSB0aGUgZmlyc3QgNCByb3VuZGluZyBkaWdpdHMgYXJlIGNvcnJlY3QuXHJcbiAgICBndWFyZCA9IE1hdGgubG9nKG1hdGhwb3coMiwgaykpIC8gTWF0aC5MTjEwICogMiArIDUgfCAwO1xyXG4gICAgd3ByICs9IGd1YXJkO1xyXG4gICAgZGVub21pbmF0b3IgPSBwb3cgPSBzdW0gPSBuZXcgQ3RvcihPTkUpO1xyXG4gICAgQ3Rvci5wcmVjaXNpb24gPSB3cHI7XHJcblxyXG4gICAgZm9yICg7Oykge1xyXG4gICAgICBwb3cgPSByb3VuZChwb3cudGltZXMoeCksIHdwcik7XHJcbiAgICAgIGRlbm9taW5hdG9yID0gZGVub21pbmF0b3IudGltZXMoKytpKTtcclxuICAgICAgdCA9IHN1bS5wbHVzKGRpdmlkZShwb3csIGRlbm9taW5hdG9yLCB3cHIpKTtcclxuXHJcbiAgICAgIGlmIChkaWdpdHNUb1N0cmluZyh0LmQpLnNsaWNlKDAsIHdwcikgPT09IGRpZ2l0c1RvU3RyaW5nKHN1bS5kKS5zbGljZSgwLCB3cHIpKSB7XHJcbiAgICAgICAgd2hpbGUgKGstLSkgc3VtID0gcm91bmQoc3VtLnRpbWVzKHN1bSksIHdwcik7XHJcbiAgICAgICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgICAgICByZXR1cm4gc2QgPT0gbnVsbCA/IChleHRlcm5hbCA9IHRydWUsIHJvdW5kKHN1bSwgcHIpKSA6IHN1bTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3VtID0gdDtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLyBDYWxjdWxhdGUgdGhlIGJhc2UgMTAgZXhwb25lbnQgZnJvbSB0aGUgYmFzZSAxZTcgZXhwb25lbnQuXHJcbiAgZnVuY3Rpb24gZ2V0QmFzZTEwRXhwb25lbnQoeCkge1xyXG4gICAgdmFyIGUgPSB4LmUgKiBMT0dfQkFTRSxcclxuICAgICAgdyA9IHguZFswXTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgdGhlIGZpcnN0IHdvcmQgb2YgdGhlIGRpZ2l0cyBhcnJheS5cclxuICAgIGZvciAoOyB3ID49IDEwOyB3IC89IDEwKSBlKys7XHJcbiAgICByZXR1cm4gZTtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiBnZXRMbjEwKEN0b3IsIHNkLCBwcikge1xyXG5cclxuICAgIGlmIChzZCA+IEN0b3IuTE4xMC5zZCgpKSB7XHJcblxyXG5cclxuICAgICAgLy8gUmVzZXQgZ2xvYmFsIHN0YXRlIGluIGNhc2UgdGhlIGV4Y2VwdGlvbiBpcyBjYXVnaHQuXHJcbiAgICAgIGV4dGVybmFsID0gdHJ1ZTtcclxuICAgICAgaWYgKHByKSBDdG9yLnByZWNpc2lvbiA9IHByO1xyXG4gICAgICB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnTE4xMCBwcmVjaXNpb24gbGltaXQgZXhjZWVkZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcm91bmQobmV3IEN0b3IoQ3Rvci5MTjEwKSwgc2QpO1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGdldFplcm9TdHJpbmcoaykge1xyXG4gICAgdmFyIHpzID0gJyc7XHJcbiAgICBmb3IgKDsgay0tOykgenMgKz0gJzAnO1xyXG4gICAgcmV0dXJuIHpzO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG5hdHVyYWwgbG9nYXJpdGhtIG9mIGB4YCB0cnVuY2F0ZWQgdG8gYHNkYCBzaWduaWZpY2FudFxyXG4gICAqIGRpZ2l0cy5cclxuICAgKlxyXG4gICAqICBsbihuKSBpcyBub24tdGVybWluYXRpbmcgKG4gIT0gMSlcclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGxuKHksIHNkKSB7XHJcbiAgICB2YXIgYywgYzAsIGRlbm9taW5hdG9yLCBlLCBudW1lcmF0b3IsIHN1bSwgdCwgd3ByLCB4MixcclxuICAgICAgbiA9IDEsXHJcbiAgICAgIGd1YXJkID0gMTAsXHJcbiAgICAgIHggPSB5LFxyXG4gICAgICB4ZCA9IHguZCxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcblxyXG4gICAgLy8gbG4oLXgpID0gTmFOXHJcbiAgICAvLyBsbigwKSA9IC1JbmZpbml0eVxyXG4gICAgaWYgKHgucyA8IDEpIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICh4LnMgPyAnTmFOJyA6ICctSW5maW5pdHknKSk7XHJcblxyXG4gICAgLy8gbG4oMSkgPSAwXHJcbiAgICBpZiAoeC5lcShPTkUpKSByZXR1cm4gbmV3IEN0b3IoMCk7XHJcblxyXG4gICAgaWYgKHNkID09IG51bGwpIHtcclxuICAgICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuICAgICAgd3ByID0gcHI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3cHIgPSBzZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoeC5lcSgxMCkpIHtcclxuICAgICAgaWYgKHNkID09IG51bGwpIGV4dGVybmFsID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIGdldExuMTAoQ3Rvciwgd3ByKTtcclxuICAgIH1cclxuXHJcbiAgICB3cHIgKz0gZ3VhcmQ7XHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IHdwcjtcclxuICAgIGMgPSBkaWdpdHNUb1N0cmluZyh4ZCk7XHJcbiAgICBjMCA9IGMuY2hhckF0KDApO1xyXG4gICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpO1xyXG5cclxuICAgIGlmIChNYXRoLmFicyhlKSA8IDEuNWUxNSkge1xyXG5cclxuICAgICAgLy8gQXJndW1lbnQgcmVkdWN0aW9uLlxyXG4gICAgICAvLyBUaGUgc2VyaWVzIGNvbnZlcmdlcyBmYXN0ZXIgdGhlIGNsb3NlciB0aGUgYXJndW1lbnQgaXMgdG8gMSwgc28gdXNpbmdcclxuICAgICAgLy8gbG4oYV5iKSA9IGIgKiBsbihhKSwgICBsbihhKSA9IGxuKGFeYikgLyBiXHJcbiAgICAgIC8vIG11bHRpcGx5IHRoZSBhcmd1bWVudCBieSBpdHNlbGYgdW50aWwgdGhlIGxlYWRpbmcgZGlnaXRzIG9mIHRoZSBzaWduaWZpY2FuZCBhcmUgNywgOCwgOSxcclxuICAgICAgLy8gMTAsIDExLCAxMiBvciAxMywgcmVjb3JkaW5nIHRoZSBudW1iZXIgb2YgbXVsdGlwbGljYXRpb25zIHNvIHRoZSBzdW0gb2YgdGhlIHNlcmllcyBjYW5cclxuICAgICAgLy8gbGF0ZXIgYmUgZGl2aWRlZCBieSB0aGlzIG51bWJlciwgdGhlbiBzZXBhcmF0ZSBvdXQgdGhlIHBvd2VyIG9mIDEwIHVzaW5nXHJcbiAgICAgIC8vIGxuKGEqMTBeYikgPSBsbihhKSArIGIqbG4oMTApLlxyXG5cclxuICAgICAgLy8gbWF4IG4gaXMgMjEgKGdpdmVzIDAuOSwgMS4wIG9yIDEuMSkgKDllMTUgLyAyMSA9IDQuMmUxNCkuXHJcbiAgICAgIC8vd2hpbGUgKGMwIDwgOSAmJiBjMCAhPSAxIHx8IGMwID09IDEgJiYgYy5jaGFyQXQoMSkgPiAxKSB7XHJcbiAgICAgIC8vIG1heCBuIGlzIDYgKGdpdmVzIDAuNyAtIDEuMylcclxuICAgICAgd2hpbGUgKGMwIDwgNyAmJiBjMCAhPSAxIHx8IGMwID09IDEgJiYgYy5jaGFyQXQoMSkgPiAzKSB7XHJcbiAgICAgICAgeCA9IHgudGltZXMoeSk7XHJcbiAgICAgICAgYyA9IGRpZ2l0c1RvU3RyaW5nKHguZCk7XHJcbiAgICAgICAgYzAgPSBjLmNoYXJBdCgwKTtcclxuICAgICAgICBuKys7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KTtcclxuXHJcbiAgICAgIGlmIChjMCA+IDEpIHtcclxuICAgICAgICB4ID0gbmV3IEN0b3IoJzAuJyArIGMpO1xyXG4gICAgICAgIGUrKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB4ID0gbmV3IEN0b3IoYzAgKyAnLicgKyBjLnNsaWNlKDEpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vIFRoZSBhcmd1bWVudCByZWR1Y3Rpb24gbWV0aG9kIGFib3ZlIG1heSByZXN1bHQgaW4gb3ZlcmZsb3cgaWYgdGhlIGFyZ3VtZW50IHkgaXMgYSBtYXNzaXZlXHJcbiAgICAgIC8vIG51bWJlciB3aXRoIGV4cG9uZW50ID49IDE1MDAwMDAwMDAwMDAwMDAgKDllMTUgLyA2ID0gMS41ZTE1KSwgc28gaW5zdGVhZCByZWNhbGwgdGhpc1xyXG4gICAgICAvLyBmdW5jdGlvbiB1c2luZyBsbih4KjEwXmUpID0gbG4oeCkgKyBlKmxuKDEwKS5cclxuICAgICAgdCA9IGdldExuMTAoQ3Rvciwgd3ByICsgMiwgcHIpLnRpbWVzKGUgKyAnJyk7XHJcbiAgICAgIHggPSBsbihuZXcgQ3RvcihjMCArICcuJyArIGMuc2xpY2UoMSkpLCB3cHIgLSBndWFyZCkucGx1cyh0KTtcclxuXHJcbiAgICAgIEN0b3IucHJlY2lzaW9uID0gcHI7XHJcbiAgICAgIHJldHVybiBzZCA9PSBudWxsID8gKGV4dGVybmFsID0gdHJ1ZSwgcm91bmQoeCwgcHIpKSA6IHg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8geCBpcyByZWR1Y2VkIHRvIGEgdmFsdWUgbmVhciAxLlxyXG5cclxuICAgIC8vIFRheWxvciBzZXJpZXMuXHJcbiAgICAvLyBsbih5KSA9IGxuKCgxICsgeCkvKDEgLSB4KSkgPSAyKHggKyB4XjMvMyArIHheNS81ICsgeF43LzcgKyAuLi4pXHJcbiAgICAvLyB3aGVyZSB4ID0gKHkgLSAxKS8oeSArIDEpICAgICh8eHwgPCAxKVxyXG4gICAgc3VtID0gbnVtZXJhdG9yID0geCA9IGRpdmlkZSh4Lm1pbnVzKE9ORSksIHgucGx1cyhPTkUpLCB3cHIpO1xyXG4gICAgeDIgPSByb3VuZCh4LnRpbWVzKHgpLCB3cHIpO1xyXG4gICAgZGVub21pbmF0b3IgPSAzO1xyXG5cclxuICAgIGZvciAoOzspIHtcclxuICAgICAgbnVtZXJhdG9yID0gcm91bmQobnVtZXJhdG9yLnRpbWVzKHgyKSwgd3ByKTtcclxuICAgICAgdCA9IHN1bS5wbHVzKGRpdmlkZShudW1lcmF0b3IsIG5ldyBDdG9yKGRlbm9taW5hdG9yKSwgd3ByKSk7XHJcblxyXG4gICAgICBpZiAoZGlnaXRzVG9TdHJpbmcodC5kKS5zbGljZSgwLCB3cHIpID09PSBkaWdpdHNUb1N0cmluZyhzdW0uZCkuc2xpY2UoMCwgd3ByKSkge1xyXG4gICAgICAgIHN1bSA9IHN1bS50aW1lcygyKTtcclxuXHJcbiAgICAgICAgLy8gUmV2ZXJzZSB0aGUgYXJndW1lbnQgcmVkdWN0aW9uLlxyXG4gICAgICAgIGlmIChlICE9PSAwKSBzdW0gPSBzdW0ucGx1cyhnZXRMbjEwKEN0b3IsIHdwciArIDIsIHByKS50aW1lcyhlICsgJycpKTtcclxuICAgICAgICBzdW0gPSBkaXZpZGUoc3VtLCBuZXcgQ3RvcihuKSwgd3ByKTtcclxuXHJcbiAgICAgICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgICAgICByZXR1cm4gc2QgPT0gbnVsbCA/IChleHRlcm5hbCA9IHRydWUsIHJvdW5kKHN1bSwgcHIpKSA6IHN1bTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3VtID0gdDtcclxuICAgICAgZGVub21pbmF0b3IgKz0gMjtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFBhcnNlIHRoZSB2YWx1ZSBvZiBhIG5ldyBEZWNpbWFsIGB4YCBmcm9tIHN0cmluZyBgc3RyYC5cclxuICAgKi9cclxuICBmdW5jdGlvbiBwYXJzZURlY2ltYWwoeCwgc3RyKSB7XHJcbiAgICB2YXIgZSwgaSwgbGVuO1xyXG5cclxuICAgIC8vIERlY2ltYWwgcG9pbnQ/XHJcbiAgICBpZiAoKGUgPSBzdHIuaW5kZXhPZignLicpKSA+IC0xKSBzdHIgPSBzdHIucmVwbGFjZSgnLicsICcnKTtcclxuXHJcbiAgICAvLyBFeHBvbmVudGlhbCBmb3JtP1xyXG4gICAgaWYgKChpID0gc3RyLnNlYXJjaCgvZS9pKSkgPiAwKSB7XHJcblxyXG4gICAgICAvLyBEZXRlcm1pbmUgZXhwb25lbnQuXHJcbiAgICAgIGlmIChlIDwgMCkgZSA9IGk7XHJcbiAgICAgIGUgKz0gK3N0ci5zbGljZShpICsgMSk7XHJcbiAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgaSk7XHJcbiAgICB9IGVsc2UgaWYgKGUgPCAwKSB7XHJcblxyXG4gICAgICAvLyBJbnRlZ2VyLlxyXG4gICAgICBlID0gc3RyLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgbGVhZGluZyB6ZXJvcy5cclxuICAgIGZvciAoaSA9IDA7IHN0ci5jaGFyQ29kZUF0KGkpID09PSA0ODspICsraTtcclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICBmb3IgKGxlbiA9IHN0ci5sZW5ndGg7IHN0ci5jaGFyQ29kZUF0KGxlbiAtIDEpID09PSA0ODspIC0tbGVuO1xyXG4gICAgc3RyID0gc3RyLnNsaWNlKGksIGxlbik7XHJcblxyXG4gICAgaWYgKHN0cikge1xyXG4gICAgICBsZW4gLT0gaTtcclxuICAgICAgZSA9IGUgLSBpIC0gMTtcclxuICAgICAgeC5lID0gbWF0aGZsb29yKGUgLyBMT0dfQkFTRSk7XHJcbiAgICAgIHguZCA9IFtdO1xyXG5cclxuICAgICAgLy8gVHJhbnNmb3JtIGJhc2VcclxuXHJcbiAgICAgIC8vIGUgaXMgdGhlIGJhc2UgMTAgZXhwb25lbnQuXHJcbiAgICAgIC8vIGkgaXMgd2hlcmUgdG8gc2xpY2Ugc3RyIHRvIGdldCB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgZGlnaXRzIGFycmF5LlxyXG4gICAgICBpID0gKGUgKyAxKSAlIExPR19CQVNFO1xyXG4gICAgICBpZiAoZSA8IDApIGkgKz0gTE9HX0JBU0U7XHJcblxyXG4gICAgICBpZiAoaSA8IGxlbikge1xyXG4gICAgICAgIGlmIChpKSB4LmQucHVzaCgrc3RyLnNsaWNlKDAsIGkpKTtcclxuICAgICAgICBmb3IgKGxlbiAtPSBMT0dfQkFTRTsgaSA8IGxlbjspIHguZC5wdXNoKCtzdHIuc2xpY2UoaSwgaSArPSBMT0dfQkFTRSkpO1xyXG4gICAgICAgIHN0ciA9IHN0ci5zbGljZShpKTtcclxuICAgICAgICBpID0gTE9HX0JBU0UgLSBzdHIubGVuZ3RoO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGkgLT0gbGVuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKDsgaS0tOykgc3RyICs9ICcwJztcclxuICAgICAgeC5kLnB1c2goK3N0cik7XHJcblxyXG4gICAgICBpZiAoZXh0ZXJuYWwgJiYgKHguZSA+IE1BWF9FIHx8IHguZSA8IC1NQVhfRSkpIHRocm93IEVycm9yKGV4cG9uZW50T3V0T2ZSYW5nZSArIGUpO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vIFplcm8uXHJcbiAgICAgIHgucyA9IDA7XHJcbiAgICAgIHguZSA9IDA7XHJcbiAgICAgIHguZCA9IFswXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geDtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJvdW5kIGB4YCB0byBgc2RgIHNpZ25pZmljYW50IGRpZ2l0cywgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm1gIGlmIHByZXNlbnQgKHRydW5jYXRlIG90aGVyd2lzZSkuXHJcbiAgICovXHJcbiAgIGZ1bmN0aW9uIHJvdW5kKHgsIHNkLCBybSkge1xyXG4gICAgdmFyIGksIGosIGssIG4sIHJkLCBkb1JvdW5kLCB3LCB4ZGksXHJcbiAgICAgIHhkID0geC5kO1xyXG5cclxuICAgIC8vIHJkOiB0aGUgcm91bmRpbmcgZGlnaXQsIGkuZS4gdGhlIGRpZ2l0IGFmdGVyIHRoZSBkaWdpdCB0aGF0IG1heSBiZSByb3VuZGVkIHVwLlxyXG4gICAgLy8gdzogdGhlIHdvcmQgb2YgeGQgd2hpY2ggY29udGFpbnMgdGhlIHJvdW5kaW5nIGRpZ2l0LCBhIGJhc2UgMWU3IG51bWJlci5cclxuICAgIC8vIHhkaTogdGhlIGluZGV4IG9mIHcgd2l0aGluIHhkLlxyXG4gICAgLy8gbjogdGhlIG51bWJlciBvZiBkaWdpdHMgb2Ygdy5cclxuICAgIC8vIGk6IHdoYXQgd291bGQgYmUgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiB3IGlmIGFsbCB0aGUgbnVtYmVycyB3ZXJlIDcgZGlnaXRzIGxvbmcgKGkuZS4gaWZcclxuICAgIC8vIHRoZXkgaGFkIGxlYWRpbmcgemVyb3MpXHJcbiAgICAvLyBqOiBpZiA+IDAsIHRoZSBhY3R1YWwgaW5kZXggb2YgcmQgd2l0aGluIHcgKGlmIDwgMCwgcmQgaXMgYSBsZWFkaW5nIHplcm8pLlxyXG5cclxuICAgIC8vIEdldCB0aGUgbGVuZ3RoIG9mIHRoZSBmaXJzdCB3b3JkIG9mIHRoZSBkaWdpdHMgYXJyYXkgeGQuXHJcbiAgICBmb3IgKG4gPSAxLCBrID0geGRbMF07IGsgPj0gMTA7IGsgLz0gMTApIG4rKztcclxuICAgIGkgPSBzZCAtIG47XHJcblxyXG4gICAgLy8gSXMgdGhlIHJvdW5kaW5nIGRpZ2l0IGluIHRoZSBmaXJzdCB3b3JkIG9mIHhkP1xyXG4gICAgaWYgKGkgPCAwKSB7XHJcbiAgICAgIGkgKz0gTE9HX0JBU0U7XHJcbiAgICAgIGogPSBzZDtcclxuICAgICAgdyA9IHhkW3hkaSA9IDBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgeGRpID0gTWF0aC5jZWlsKChpICsgMSkgLyBMT0dfQkFTRSk7XHJcbiAgICAgIGsgPSB4ZC5sZW5ndGg7XHJcbiAgICAgIGlmICh4ZGkgPj0gaykgcmV0dXJuIHg7XHJcbiAgICAgIHcgPSBrID0geGRbeGRpXTtcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiB3LlxyXG4gICAgICBmb3IgKG4gPSAxOyBrID49IDEwOyBrIC89IDEwKSBuKys7XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiB3LlxyXG4gICAgICBpICU9IExPR19CQVNFO1xyXG5cclxuICAgICAgLy8gR2V0IHRoZSBpbmRleCBvZiByZCB3aXRoaW4gdywgYWRqdXN0ZWQgZm9yIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgIC8vIFRoZSBudW1iZXIgb2YgbGVhZGluZyB6ZXJvcyBvZiB3IGlzIGdpdmVuIGJ5IExPR19CQVNFIC0gbi5cclxuICAgICAgaiA9IGkgLSBMT0dfQkFTRSArIG47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJtICE9PSB2b2lkIDApIHtcclxuICAgICAgayA9IG1hdGhwb3coMTAsIG4gLSBqIC0gMSk7XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIHJvdW5kaW5nIGRpZ2l0IGF0IGluZGV4IGogb2Ygdy5cclxuICAgICAgcmQgPSB3IC8gayAlIDEwIHwgMDtcclxuXHJcbiAgICAgIC8vIEFyZSB0aGVyZSBhbnkgbm9uLXplcm8gZGlnaXRzIGFmdGVyIHRoZSByb3VuZGluZyBkaWdpdD9cclxuICAgICAgZG9Sb3VuZCA9IHNkIDwgMCB8fCB4ZFt4ZGkgKyAxXSAhPT0gdm9pZCAwIHx8IHcgJSBrO1xyXG5cclxuICAgICAgLy8gVGhlIGV4cHJlc3Npb24gYHcgJSBtYXRocG93KDEwLCBuIC0gaiAtIDEpYCByZXR1cm5zIGFsbCB0aGUgZGlnaXRzIG9mIHcgdG8gdGhlIHJpZ2h0IG9mIHRoZVxyXG4gICAgICAvLyBkaWdpdCBhdCAobGVmdC10by1yaWdodCkgaW5kZXggaiwgZS5nLiBpZiB3IGlzIDkwODcxNCBhbmQgaiBpcyAyLCB0aGUgZXhwcmVzc2lvbiB3aWxsIGdpdmVcclxuICAgICAgLy8gNzE0LlxyXG5cclxuICAgICAgZG9Sb3VuZCA9IHJtIDwgNFxyXG4gICAgICAgID8gKHJkIHx8IGRvUm91bmQpICYmIChybSA9PSAwIHx8IHJtID09ICh4LnMgPCAwID8gMyA6IDIpKVxyXG4gICAgICAgIDogcmQgPiA1IHx8IHJkID09IDUgJiYgKHJtID09IDQgfHwgZG9Sb3VuZCB8fCBybSA9PSA2ICYmXHJcblxyXG4gICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgZGlnaXQgdG8gdGhlIGxlZnQgb2YgdGhlIHJvdW5kaW5nIGRpZ2l0IGlzIG9kZC5cclxuICAgICAgICAgICgoaSA+IDAgPyBqID4gMCA/IHcgLyBtYXRocG93KDEwLCBuIC0gaikgOiAwIDogeGRbeGRpIC0gMV0pICUgMTApICYgMSB8fFxyXG4gICAgICAgICAgICBybSA9PSAoeC5zIDwgMCA/IDggOiA3KSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNkIDwgMSB8fCAheGRbMF0pIHtcclxuICAgICAgaWYgKGRvUm91bmQpIHtcclxuICAgICAgICBrID0gZ2V0QmFzZTEwRXhwb25lbnQoeCk7XHJcbiAgICAgICAgeGQubGVuZ3RoID0gMTtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCBzZCB0byBkZWNpbWFsIHBsYWNlcy5cclxuICAgICAgICBzZCA9IHNkIC0gayAtIDE7XHJcblxyXG4gICAgICAgIC8vIDEsIDAuMSwgMC4wMSwgMC4wMDEsIDAuMDAwMSBldGMuXHJcbiAgICAgICAgeGRbMF0gPSBtYXRocG93KDEwLCAoTE9HX0JBU0UgLSBzZCAlIExPR19CQVNFKSAlIExPR19CQVNFKTtcclxuICAgICAgICB4LmUgPSBtYXRoZmxvb3IoLXNkIC8gTE9HX0JBU0UpIHx8IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeGQubGVuZ3RoID0gMTtcclxuXHJcbiAgICAgICAgLy8gWmVyby5cclxuICAgICAgICB4ZFswXSA9IHguZSA9IHgucyA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSBleGNlc3MgZGlnaXRzLlxyXG4gICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICB4ZC5sZW5ndGggPSB4ZGk7XHJcbiAgICAgIGsgPSAxO1xyXG4gICAgICB4ZGktLTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHhkLmxlbmd0aCA9IHhkaSArIDE7XHJcbiAgICAgIGsgPSBtYXRocG93KDEwLCBMT0dfQkFTRSAtIGkpO1xyXG5cclxuICAgICAgLy8gRS5nLiA1NjcwMCBiZWNvbWVzIDU2MDAwIGlmIDcgaXMgdGhlIHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICAvLyBqID4gMCBtZWFucyBpID4gbnVtYmVyIG9mIGxlYWRpbmcgemVyb3Mgb2Ygdy5cclxuICAgICAgeGRbeGRpXSA9IGogPiAwID8gKHcgLyBtYXRocG93KDEwLCBuIC0gaikgJSBtYXRocG93KDEwLCBqKSB8IDApICogayA6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRvUm91bmQpIHtcclxuICAgICAgZm9yICg7Oykge1xyXG5cclxuICAgICAgICAvLyBJcyB0aGUgZGlnaXQgdG8gYmUgcm91bmRlZCB1cCBpbiB0aGUgZmlyc3Qgd29yZCBvZiB4ZD9cclxuICAgICAgICBpZiAoeGRpID09IDApIHtcclxuICAgICAgICAgIGlmICgoeGRbMF0gKz0gaykgPT0gQkFTRSkge1xyXG4gICAgICAgICAgICB4ZFswXSA9IDE7XHJcbiAgICAgICAgICAgICsreC5lO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB4ZFt4ZGldICs9IGs7XHJcbiAgICAgICAgICBpZiAoeGRbeGRpXSAhPSBCQVNFKSBicmVhaztcclxuICAgICAgICAgIHhkW3hkaS0tXSA9IDA7XHJcbiAgICAgICAgICBrID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICBmb3IgKGkgPSB4ZC5sZW5ndGg7IHhkWy0taV0gPT09IDA7KSB4ZC5wb3AoKTtcclxuXHJcbiAgICBpZiAoZXh0ZXJuYWwgJiYgKHguZSA+IE1BWF9FIHx8IHguZSA8IC1NQVhfRSkpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoZXhwb25lbnRPdXRPZlJhbmdlICsgZ2V0QmFzZTEwRXhwb25lbnQoeCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHN1YnRyYWN0KHgsIHkpIHtcclxuICAgIHZhciBkLCBlLCBpLCBqLCBrLCBsZW4sIHhkLCB4ZSwgeExUeSwgeWQsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG5cclxuICAgIC8vIFJldHVybiB5IG5lZ2F0ZWQgaWYgeCBpcyB6ZXJvLlxyXG4gICAgLy8gUmV0dXJuIHggaWYgeSBpcyB6ZXJvIGFuZCB4IGlzIG5vbi16ZXJvLlxyXG4gICAgaWYgKCF4LnMgfHwgIXkucykge1xyXG4gICAgICBpZiAoeS5zKSB5LnMgPSAteS5zO1xyXG4gICAgICBlbHNlIHkgPSBuZXcgQ3Rvcih4KTtcclxuICAgICAgcmV0dXJuIGV4dGVybmFsID8gcm91bmQoeSwgcHIpIDogeTtcclxuICAgIH1cclxuXHJcbiAgICB4ZCA9IHguZDtcclxuICAgIHlkID0geS5kO1xyXG5cclxuICAgIC8vIHggYW5kIHkgYXJlIG5vbi16ZXJvIG51bWJlcnMgd2l0aCB0aGUgc2FtZSBzaWduLlxyXG5cclxuICAgIGUgPSB5LmU7XHJcbiAgICB4ZSA9IHguZTtcclxuICAgIHhkID0geGQuc2xpY2UoKTtcclxuICAgIGsgPSB4ZSAtIGU7XHJcblxyXG4gICAgLy8gSWYgZXhwb25lbnRzIGRpZmZlci4uLlxyXG4gICAgaWYgKGspIHtcclxuICAgICAgeExUeSA9IGsgPCAwO1xyXG5cclxuICAgICAgaWYgKHhMVHkpIHtcclxuICAgICAgICBkID0geGQ7XHJcbiAgICAgICAgayA9IC1rO1xyXG4gICAgICAgIGxlbiA9IHlkLmxlbmd0aDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkID0geWQ7XHJcbiAgICAgICAgZSA9IHhlO1xyXG4gICAgICAgIGxlbiA9IHhkLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTnVtYmVycyB3aXRoIG1hc3NpdmVseSBkaWZmZXJlbnQgZXhwb25lbnRzIHdvdWxkIHJlc3VsdCBpbiBhIHZlcnkgaGlnaCBudW1iZXIgb2YgemVyb3NcclxuICAgICAgLy8gbmVlZGluZyB0byBiZSBwcmVwZW5kZWQsIGJ1dCB0aGlzIGNhbiBiZSBhdm9pZGVkIHdoaWxlIHN0aWxsIGVuc3VyaW5nIGNvcnJlY3Qgcm91bmRpbmcgYnlcclxuICAgICAgLy8gbGltaXRpbmcgdGhlIG51bWJlciBvZiB6ZXJvcyB0byBgTWF0aC5jZWlsKHByIC8gTE9HX0JBU0UpICsgMmAuXHJcbiAgICAgIGkgPSBNYXRoLm1heChNYXRoLmNlaWwocHIgLyBMT0dfQkFTRSksIGxlbikgKyAyO1xyXG5cclxuICAgICAgaWYgKGsgPiBpKSB7XHJcbiAgICAgICAgayA9IGk7XHJcbiAgICAgICAgZC5sZW5ndGggPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBQcmVwZW5kIHplcm9zIHRvIGVxdWFsaXNlIGV4cG9uZW50cy5cclxuICAgICAgZC5yZXZlcnNlKCk7XHJcbiAgICAgIGZvciAoaSA9IGs7IGktLTspIGQucHVzaCgwKTtcclxuICAgICAgZC5yZXZlcnNlKCk7XHJcblxyXG4gICAgLy8gQmFzZSAxZTcgZXhwb25lbnRzIGVxdWFsLlxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vIENoZWNrIGRpZ2l0cyB0byBkZXRlcm1pbmUgd2hpY2ggaXMgdGhlIGJpZ2dlciBudW1iZXIuXHJcblxyXG4gICAgICBpID0geGQubGVuZ3RoO1xyXG4gICAgICBsZW4gPSB5ZC5sZW5ndGg7XHJcbiAgICAgIHhMVHkgPSBpIDwgbGVuO1xyXG4gICAgICBpZiAoeExUeSkgbGVuID0gaTtcclxuXHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGlmICh4ZFtpXSAhPSB5ZFtpXSkge1xyXG4gICAgICAgICAgeExUeSA9IHhkW2ldIDwgeWRbaV07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGsgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh4TFR5KSB7XHJcbiAgICAgIGQgPSB4ZDtcclxuICAgICAgeGQgPSB5ZDtcclxuICAgICAgeWQgPSBkO1xyXG4gICAgICB5LnMgPSAteS5zO1xyXG4gICAgfVxyXG5cclxuICAgIGxlbiA9IHhkLmxlbmd0aDtcclxuXHJcbiAgICAvLyBBcHBlbmQgemVyb3MgdG8geGQgaWYgc2hvcnRlci5cclxuICAgIC8vIERvbid0IGFkZCB6ZXJvcyB0byB5ZCBpZiBzaG9ydGVyIGFzIHN1YnRyYWN0aW9uIG9ubHkgbmVlZHMgdG8gc3RhcnQgYXQgeWQgbGVuZ3RoLlxyXG4gICAgZm9yIChpID0geWQubGVuZ3RoIC0gbGVuOyBpID4gMDsgLS1pKSB4ZFtsZW4rK10gPSAwO1xyXG5cclxuICAgIC8vIFN1YnRyYWN0IHlkIGZyb20geGQuXHJcbiAgICBmb3IgKGkgPSB5ZC5sZW5ndGg7IGkgPiBrOykge1xyXG4gICAgICBpZiAoeGRbLS1pXSA8IHlkW2ldKSB7XHJcbiAgICAgICAgZm9yIChqID0gaTsgaiAmJiB4ZFstLWpdID09PSAwOykgeGRbal0gPSBCQVNFIC0gMTtcclxuICAgICAgICAtLXhkW2pdO1xyXG4gICAgICAgIHhkW2ldICs9IEJBU0U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHhkW2ldIC09IHlkW2ldO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIGZvciAoOyB4ZFstLWxlbl0gPT09IDA7KSB4ZC5wb3AoKTtcclxuXHJcbiAgICAvLyBSZW1vdmUgbGVhZGluZyB6ZXJvcyBhbmQgYWRqdXN0IGV4cG9uZW50IGFjY29yZGluZ2x5LlxyXG4gICAgZm9yICg7IHhkWzBdID09PSAwOyB4ZC5zaGlmdCgpKSAtLWU7XHJcblxyXG4gICAgLy8gWmVybz9cclxuICAgIGlmICgheGRbMF0pIHJldHVybiBuZXcgQ3RvcigwKTtcclxuXHJcbiAgICB5LmQgPSB4ZDtcclxuICAgIHkuZSA9IGU7XHJcblxyXG4gICAgLy9yZXR1cm4gZXh0ZXJuYWwgJiYgeGQubGVuZ3RoID49IHByIC8gTE9HX0JBU0UgPyByb3VuZCh5LCBwcikgOiB5O1xyXG4gICAgcmV0dXJuIGV4dGVybmFsID8gcm91bmQoeSwgcHIpIDogeTtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiB0b1N0cmluZyh4LCBpc0V4cCwgc2QpIHtcclxuICAgIHZhciBrLFxyXG4gICAgICBlID0gZ2V0QmFzZTEwRXhwb25lbnQoeCksXHJcbiAgICAgIHN0ciA9IGRpZ2l0c1RvU3RyaW5nKHguZCksXHJcbiAgICAgIGxlbiA9IHN0ci5sZW5ndGg7XHJcblxyXG4gICAgaWYgKGlzRXhwKSB7XHJcbiAgICAgIGlmIChzZCAmJiAoayA9IHNkIC0gbGVuKSA+IDApIHtcclxuICAgICAgICBzdHIgPSBzdHIuY2hhckF0KDApICsgJy4nICsgc3RyLnNsaWNlKDEpICsgZ2V0WmVyb1N0cmluZyhrKTtcclxuICAgICAgfSBlbHNlIGlmIChsZW4gPiAxKSB7XHJcbiAgICAgICAgc3RyID0gc3RyLmNoYXJBdCgwKSArICcuJyArIHN0ci5zbGljZSgxKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3RyID0gc3RyICsgKGUgPCAwID8gJ2UnIDogJ2UrJykgKyBlO1xyXG4gICAgfSBlbHNlIGlmIChlIDwgMCkge1xyXG4gICAgICBzdHIgPSAnMC4nICsgZ2V0WmVyb1N0cmluZygtZSAtIDEpICsgc3RyO1xyXG4gICAgICBpZiAoc2QgJiYgKGsgPSBzZCAtIGxlbikgPiAwKSBzdHIgKz0gZ2V0WmVyb1N0cmluZyhrKTtcclxuICAgIH0gZWxzZSBpZiAoZSA+PSBsZW4pIHtcclxuICAgICAgc3RyICs9IGdldFplcm9TdHJpbmcoZSArIDEgLSBsZW4pO1xyXG4gICAgICBpZiAoc2QgJiYgKGsgPSBzZCAtIGUgLSAxKSA+IDApIHN0ciA9IHN0ciArICcuJyArIGdldFplcm9TdHJpbmcoayk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoKGsgPSBlICsgMSkgPCBsZW4pIHN0ciA9IHN0ci5zbGljZSgwLCBrKSArICcuJyArIHN0ci5zbGljZShrKTtcclxuICAgICAgaWYgKHNkICYmIChrID0gc2QgLSBsZW4pID4gMCkge1xyXG4gICAgICAgIGlmIChlICsgMSA9PT0gbGVuKSBzdHIgKz0gJy4nO1xyXG4gICAgICAgIHN0ciArPSBnZXRaZXJvU3RyaW5nKGspO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHgucyA8IDAgPyAnLScgKyBzdHIgOiBzdHI7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gRG9lcyBub3Qgc3RyaXAgdHJhaWxpbmcgemVyb3MuXHJcbiAgZnVuY3Rpb24gdHJ1bmNhdGUoYXJyLCBsZW4pIHtcclxuICAgIGlmIChhcnIubGVuZ3RoID4gbGVuKSB7XHJcbiAgICAgIGFyci5sZW5ndGggPSBsZW47XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vIERlY2ltYWwgbWV0aG9kc1xyXG5cclxuXHJcbiAgLypcclxuICAgKiAgY2xvbmVcclxuICAgKiAgY29uZmlnL3NldFxyXG4gICAqL1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBDcmVhdGUgYW5kIHJldHVybiBhIERlY2ltYWwgY29uc3RydWN0b3Igd2l0aCB0aGUgc2FtZSBjb25maWd1cmF0aW9uIHByb3BlcnRpZXMgYXMgdGhpcyBEZWNpbWFsXHJcbiAgICogY29uc3RydWN0b3IuXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBjbG9uZShvYmopIHtcclxuICAgIHZhciBpLCBwLCBwcztcclxuXHJcbiAgICAvKlxyXG4gICAgICogVGhlIERlY2ltYWwgY29uc3RydWN0b3IgYW5kIGV4cG9ydGVkIGZ1bmN0aW9uLlxyXG4gICAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgaW5zdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogdmFsdWUge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gQSBudW1lcmljIHZhbHVlLlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gRGVjaW1hbCh2YWx1ZSkge1xyXG4gICAgICB2YXIgeCA9IHRoaXM7XHJcblxyXG4gICAgICAvLyBEZWNpbWFsIGNhbGxlZCB3aXRob3V0IG5ldy5cclxuICAgICAgaWYgKCEoeCBpbnN0YW5jZW9mIERlY2ltYWwpKSByZXR1cm4gbmV3IERlY2ltYWwodmFsdWUpO1xyXG5cclxuICAgICAgLy8gUmV0YWluIGEgcmVmZXJlbmNlIHRvIHRoaXMgRGVjaW1hbCBjb25zdHJ1Y3RvciwgYW5kIHNoYWRvdyBEZWNpbWFsLnByb3RvdHlwZS5jb25zdHJ1Y3RvclxyXG4gICAgICAvLyB3aGljaCBwb2ludHMgdG8gT2JqZWN0LlxyXG4gICAgICB4LmNvbnN0cnVjdG9yID0gRGVjaW1hbDtcclxuXHJcbiAgICAgIC8vIER1cGxpY2F0ZS5cclxuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGVjaW1hbCkge1xyXG4gICAgICAgIHgucyA9IHZhbHVlLnM7XHJcbiAgICAgICAgeC5lID0gdmFsdWUuZTtcclxuICAgICAgICB4LmQgPSAodmFsdWUgPSB2YWx1ZS5kKSA/IHZhbHVlLnNsaWNlKCkgOiB2YWx1ZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XHJcblxyXG4gICAgICAgIC8vIFJlamVjdCBJbmZpbml0eS9OYU4uXHJcbiAgICAgICAgaWYgKHZhbHVlICogMCAhPT0gMCkge1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID4gMCkge1xyXG4gICAgICAgICAgeC5zID0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgdmFsdWUgPSAtdmFsdWU7XHJcbiAgICAgICAgICB4LnMgPSAtMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeC5zID0gMDtcclxuICAgICAgICAgIHguZSA9IDA7XHJcbiAgICAgICAgICB4LmQgPSBbMF07XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIHNtYWxsIGludGVnZXJzLlxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gfn52YWx1ZSAmJiB2YWx1ZSA8IDFlNykge1xyXG4gICAgICAgICAgeC5lID0gMDtcclxuICAgICAgICAgIHguZCA9IFt2YWx1ZV07XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFyc2VEZWNpbWFsKHgsIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyB2YWx1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE1pbnVzIHNpZ24/XHJcbiAgICAgIGlmICh2YWx1ZS5jaGFyQ29kZUF0KDApID09PSA0NSkge1xyXG4gICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XHJcbiAgICAgICAgeC5zID0gLTE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeC5zID0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzRGVjaW1hbC50ZXN0KHZhbHVlKSkgcGFyc2VEZWNpbWFsKHgsIHZhbHVlKTtcclxuICAgICAgZWxzZSB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgRGVjaW1hbC5wcm90b3R5cGUgPSBQO1xyXG5cclxuICAgIERlY2ltYWwuUk9VTkRfVVAgPSAwO1xyXG4gICAgRGVjaW1hbC5ST1VORF9ET1dOID0gMTtcclxuICAgIERlY2ltYWwuUk9VTkRfQ0VJTCA9IDI7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0ZMT09SID0gMztcclxuICAgIERlY2ltYWwuUk9VTkRfSEFMRl9VUCA9IDQ7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0hBTEZfRE9XTiA9IDU7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0hBTEZfRVZFTiA9IDY7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0hBTEZfQ0VJTCA9IDc7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0hBTEZfRkxPT1IgPSA4O1xyXG5cclxuICAgIERlY2ltYWwuY2xvbmUgPSBjbG9uZTtcclxuICAgIERlY2ltYWwuY29uZmlnID0gRGVjaW1hbC5zZXQgPSBjb25maWc7XHJcblxyXG4gICAgaWYgKG9iaiA9PT0gdm9pZCAwKSBvYmogPSB7fTtcclxuICAgIGlmIChvYmopIHtcclxuICAgICAgcHMgPSBbJ3ByZWNpc2lvbicsICdyb3VuZGluZycsICd0b0V4cE5lZycsICd0b0V4cFBvcycsICdMTjEwJ107XHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBwcy5sZW5ndGg7KSBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShwID0gcHNbaSsrXSkpIG9ialtwXSA9IHRoaXNbcF07XHJcbiAgICB9XHJcblxyXG4gICAgRGVjaW1hbC5jb25maWcob2JqKTtcclxuXHJcbiAgICByZXR1cm4gRGVjaW1hbDtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIENvbmZpZ3VyZSBnbG9iYWwgc2V0dGluZ3MgZm9yIGEgRGVjaW1hbCBjb25zdHJ1Y3Rvci5cclxuICAgKlxyXG4gICAqIGBvYmpgIGlzIGFuIG9iamVjdCB3aXRoIG9uZSBvciBtb3JlIG9mIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyxcclxuICAgKlxyXG4gICAqICAgcHJlY2lzaW9uICB7bnVtYmVyfVxyXG4gICAqICAgcm91bmRpbmcgICB7bnVtYmVyfVxyXG4gICAqICAgdG9FeHBOZWcgICB7bnVtYmVyfVxyXG4gICAqICAgdG9FeHBQb3MgICB7bnVtYmVyfVxyXG4gICAqXHJcbiAgICogRS5nLiBEZWNpbWFsLmNvbmZpZyh7IHByZWNpc2lvbjogMjAsIHJvdW5kaW5nOiA0IH0pXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBjb25maWcob2JqKSB7XHJcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnT2JqZWN0IGV4cGVjdGVkJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgaSwgcCwgdixcclxuICAgICAgcHMgPSBbXHJcbiAgICAgICAgJ3ByZWNpc2lvbicsIDEsIE1BWF9ESUdJVFMsXHJcbiAgICAgICAgJ3JvdW5kaW5nJywgMCwgOCxcclxuICAgICAgICAndG9FeHBOZWcnLCAtMSAvIDAsIDAsXHJcbiAgICAgICAgJ3RvRXhwUG9zJywgMCwgMSAvIDBcclxuICAgICAgXTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgcHMubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgaWYgKCh2ID0gb2JqW3AgPSBwc1tpXV0pICE9PSB2b2lkIDApIHtcclxuICAgICAgICBpZiAobWF0aGZsb29yKHYpID09PSB2ICYmIHYgPj0gcHNbaSArIDFdICYmIHYgPD0gcHNbaSArIDJdKSB0aGlzW3BdID0gdjtcclxuICAgICAgICBlbHNlIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIHAgKyAnOiAnICsgdik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoKHYgPSBvYmpbcCA9ICdMTjEwJ10pICE9PSB2b2lkIDApIHtcclxuICAgICAgICBpZiAodiA9PSBNYXRoLkxOMTApIHRoaXNbcF0gPSBuZXcgdGhpcyh2KTtcclxuICAgICAgICBlbHNlIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIHAgKyAnOiAnICsgdik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gQ3JlYXRlIGFuZCBjb25maWd1cmUgaW5pdGlhbCBEZWNpbWFsIGNvbnN0cnVjdG9yLlxyXG4gIERlY2ltYWwgPSBjbG9uZShEZWNpbWFsKTtcclxuXHJcbiAgRGVjaW1hbFsnZGVmYXVsdCddID0gRGVjaW1hbC5EZWNpbWFsID0gRGVjaW1hbDtcclxuXHJcbiAgLy8gSW50ZXJuYWwgY29uc3RhbnQuXHJcbiAgT05FID0gbmV3IERlY2ltYWwoMSk7XHJcblxyXG5cclxuICAvLyBFeHBvcnQuXHJcblxyXG5cclxuICAvLyBBTUQuXHJcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gRGVjaW1hbDtcclxuICAgIH0pO1xyXG5cclxuICAvLyBOb2RlIGFuZCBvdGhlciBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLlxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBEZWNpbWFsO1xyXG5cclxuICAgIC8vIEJyb3dzZXIuXHJcbiAgfSBlbHNlIHtcclxuICAgIGlmICghZ2xvYmFsU2NvcGUpIHtcclxuICAgICAgZ2xvYmFsU2NvcGUgPSB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmICYmIHNlbGYuc2VsZiA9PSBzZWxmXHJcbiAgICAgICAgPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcclxuICAgIH1cclxuXHJcbiAgICBnbG9iYWxTY29wZS5EZWNpbWFsID0gRGVjaW1hbDtcclxuICB9XHJcbn0pKHRoaXMpO1xyXG4iLCIvKiEgTW9tZW50IER1cmF0aW9uIEZvcm1hdCB2Mi4yLjJcbiAqICBodHRwczovL2dpdGh1Yi5jb20vanNtcmVlc2UvbW9tZW50LWR1cmF0aW9uLWZvcm1hdFxuICogIERhdGU6IDIwMTgtMDItMTZcbiAqXG4gKiAgRHVyYXRpb24gZm9ybWF0IHBsdWdpbiBmdW5jdGlvbiBmb3IgdGhlIE1vbWVudC5qcyBsaWJyYXJ5XG4gKiAgaHR0cDovL21vbWVudGpzLmNvbS9cbiAqXG4gKiAgQ29weXJpZ2h0IDIwMTggSm9obiBNYWRoYXZhbi1SZWVzZVxuICogIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoWydtb21lbnQnXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0IG9ubHkgQ29tbW9uSlMtbGlrZVxuICAgICAgICAvLyBlbnZpcm9tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsIGxpa2UgTm9kZS5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdtb21lbnQnKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIElmIG1vbWVudCBpcyBub3QgYXZhaWxhYmxlLCBsZWF2ZSB0aGUgc2V0dXAgdXAgdG8gdGhlIHVzZXIuXG4gICAgICAgICAgICAvLyBMaWtlIHdoZW4gdXNpbmcgbW9tZW50LXRpbWV6b25lIG9yIHNpbWlsYXIgbW9tZW50LWJhc2VkIHBhY2thZ2UuXG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocm9vdCkge1xuICAgICAgICAvLyBHbG9iYWxzLlxuICAgICAgICByb290Lm1vbWVudER1cmF0aW9uRm9ybWF0U2V0dXAgPSByb290Lm1vbWVudCA/IGZhY3Rvcnkocm9vdC5tb21lbnQpIDogZmFjdG9yeTtcbiAgICB9XG59KSh0aGlzLCBmdW5jdGlvbiAobW9tZW50KSB7XG4gICAgLy8gYE51bWJlciN0b2xvY2FsZVN0cmluZ2AgaXMgdGVzdGVkIG9uIHBsdWdpbiBpbml0aWFsaXphdGlvbi5cbiAgICAvLyBJZiB0aGUgZmVhdHVyZSB0ZXN0IHBhc3NlcywgYHRvTG9jYWxlU3RyaW5nV29ya3NgIHdpbGwgYmUgc2V0IHRvIGB0cnVlYCBhbmQgdGhlXG4gICAgLy8gbmF0aXZlIGZ1bmN0aW9uIHdpbGwgYmUgdXNlZCB0byBnZW5lcmF0ZSBmb3JtYXR0ZWQgb3V0cHV0LiBJZiB0aGUgZmVhdHVyZVxuICAgIC8vIHRlc3QgZmFpbHMsIHRoZSBmYWxsYmFjayBmb3JtYXQgZnVuY3Rpb24gaW50ZXJuYWwgdG8gdGhpcyBwbHVnaW4gd2lsbCBiZVxuICAgIC8vIHVzZWQuXG4gICAgdmFyIHRvTG9jYWxlU3RyaW5nV29ya3MgPSBmYWxzZTtcblxuICAgIC8vIGBOdW1iZXIjdG9Mb2NhbGVTdHJpbmdgIHJvdW5kcyBpbmNvcnJlY3RseSBmb3Igc2VsZWN0IG51bWJlcnMgaW4gTWljcm9zb2Z0XG4gICAgLy8gZW52aXJvbm1lbnRzIChFZGdlLCBJRTExLCBXaW5kb3dzIFBob25lKSBhbmQgcG9zc2libHkgb3RoZXIgZW52aXJvbm1lbnRzLlxuICAgIC8vIElmIHRoZSByb3VuZGluZyB0ZXN0IGZhaWxzIGFuZCBgdG9Mb2NhbGVTdHJpbmdgIHdpbGwgYmUgdXNlZCBmb3IgZm9ybWF0dGluZyxcbiAgICAvLyB0aGUgcGx1Z2luIHdpbGwgXCJwcmUtcm91bmRcIiBudW1iZXIgdmFsdWVzIHVzaW5nIHRoZSBmYWxsYmFjayBudW1iZXIgZm9ybWF0XG4gICAgLy8gZnVuY3Rpb24gYmVmb3JlIHBhc3NpbmcgdGhlbSB0byBgdG9Mb2NhbGVTdHJpbmdgIGZvciBmaW5hbCBmb3JtYXR0aW5nLlxuICAgIHZhciB0b0xvY2FsZVN0cmluZ1JvdW5kaW5nV29ya3MgPSBmYWxzZTtcblxuICAgIC8vIGBJbnRsLk51bWJlckZvcm1hdCNmb3JtYXRgIGlzIHRlc3RlZCBvbiBwbHVnaW4gaW5pdGlhbGl6YXRpb24uXG4gICAgLy8gSWYgdGhlIGZlYXR1cmUgdGVzdCBwYXNzZXMsIGBpbnRsTnVtYmVyRm9ybWF0Um91bmRpbmdXb3Jrc2Agd2lsbCBiZSBzZXQgdG9cbiAgICAvLyBgdHJ1ZWAgYW5kIHRoZSBuYXRpdmUgZnVuY3Rpb24gd2lsbCBiZSB1c2VkIHRvIGdlbmVyYXRlIGZvcm1hdHRlZCBvdXRwdXQuXG4gICAgLy8gSWYgdGhlIGZlYXR1cmUgdGVzdCBmYWlscywgZWl0aGVyIGBOdW1iZXIjdG9sb2NhbGVTdHJpbmdgIChpZlxuICAgIC8vIGB0b0xvY2FsZVN0cmluZ1dvcmtzYCBpcyBgdHJ1ZWApLCBvciB0aGUgZmFsbGJhY2sgZm9ybWF0IGZ1bmN0aW9uIGludGVybmFsXG4gICAgLy8gIHRvIHRoaXMgcGx1Z2luIHdpbGwgYmUgdXNlZC5cbiAgICB2YXIgaW50bE51bWJlckZvcm1hdFdvcmtzID0gZmFsc2U7XG5cbiAgICAvLyBgSW50bC5OdW1iZXJGb3JtYXQjZm9ybWF0YCByb3VuZHMgaW5jb3JyZWN0bHkgZm9yIHNlbGVjdCBudW1iZXJzIGluIE1pY3Jvc29mdFxuICAgIC8vIGVudmlyb25tZW50cyAoRWRnZSwgSUUxMSwgV2luZG93cyBQaG9uZSkgYW5kIHBvc3NpYmx5IG90aGVyIGVudmlyb25tZW50cy5cbiAgICAvLyBJZiB0aGUgcm91bmRpbmcgdGVzdCBmYWlscyBhbmQgYEludGwuTnVtYmVyRm9ybWF0I2Zvcm1hdGAgd2lsbCBiZSB1c2VkIGZvclxuICAgIC8vIGZvcm1hdHRpbmcsIHRoZSBwbHVnaW4gd2lsbCBcInByZS1yb3VuZFwiIG51bWJlciB2YWx1ZXMgdXNpbmcgdGhlIGZhbGxiYWNrIG51bWJlclxuICAgIC8vIGZvcm1hdCBmdW5jdGlvbiBiZWZvcmUgcGFzc2luZyB0aGVtIHRvIGBJbnRsLk51bWJlckZvcm1hdCNmb3JtYXRgIGZvciBmaW5hbFxuICAgIC8vIGZvcm1hdHRpbmcuXG4gICAgdmFyIGludGxOdW1iZXJGb3JtYXRSb3VuZGluZ1dvcmtzID0gZmFsc2U7XG5cbiAgICAvLyBUb2tlbiB0eXBlIG5hbWVzIGluIG9yZGVyIG9mIGRlc2NlbmRpbmcgbWFnbml0dWRlLlxuICAgIHZhciB0eXBlcyA9IFwiZXNjYXBlIHllYXJzIG1vbnRocyB3ZWVrcyBkYXlzIGhvdXJzIG1pbnV0ZXMgc2Vjb25kcyBtaWxsaXNlY29uZHMgZ2VuZXJhbFwiLnNwbGl0KFwiIFwiKTtcblxuICAgIHZhciBidWJibGVzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcInNlY29uZHNcIixcbiAgICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwibWludXRlc1wiLCB2YWx1ZTogNjAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwiaG91cnNcIiwgdmFsdWU6IDM2MDAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwiZGF5c1wiLCB2YWx1ZTogODY0MDAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwid2Vla3NcIiwgdmFsdWU6IDYwNDgwMCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJtb250aHNcIiwgdmFsdWU6IDI2Nzg0MDAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwieWVhcnNcIiwgdmFsdWU6IDMxNTM2MDAwIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJtaW51dGVzXCIsXG4gICAgICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcImhvdXJzXCIsIHZhbHVlOiA2MCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJkYXlzXCIsIHZhbHVlOiAxNDQwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIndlZWtzXCIsIHZhbHVlOiAxMDA4MCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJtb250aHNcIiwgdmFsdWU6IDQ0NjQwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInllYXJzXCIsIHZhbHVlOiA1MjU2MDAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImhvdXJzXCIsXG4gICAgICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcImRheXNcIiwgdmFsdWU6IDI0IH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIndlZWtzXCIsIHZhbHVlOiAxNjggfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwibW9udGhzXCIsIHZhbHVlOiA3NDQgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwieWVhcnNcIiwgdmFsdWU6IDg3NjAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImRheXNcIixcbiAgICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwid2Vla3NcIiwgdmFsdWU6IDcgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwibW9udGhzXCIsIHZhbHVlOiAzMSB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ5ZWFyc1wiLCB2YWx1ZTogMzY1IH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJtb250aHNcIixcbiAgICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwieWVhcnNcIiwgdmFsdWU6IDEyIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIF07XG5cbiAgICAvLyBzdHJpbmdJbmNsdWRlc1xuICAgIGZ1bmN0aW9uIHN0cmluZ0luY2x1ZGVzKHN0ciwgc2VhcmNoKSB7XG4gICAgICAgIGlmIChzZWFyY2gubGVuZ3RoID4gc3RyLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHIuaW5kZXhPZihzZWFyY2gpICE9PSAtMTtcbiAgICB9XG5cbiAgICAvLyByZXBlYXRaZXJvKHF0eSlcbiAgICAvLyBSZXR1cm5zIFwiMFwiIHJlcGVhdGVkIGBxdHlgIHRpbWVzLlxuICAgIC8vIGBxdHlgIG11c3QgYmUgYSBpbnRlZ2VyID49IDAuXG4gICAgZnVuY3Rpb24gcmVwZWF0WmVybyhxdHkpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XG5cbiAgICAgICAgd2hpbGUgKHF0eSkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IFwiMFwiO1xuICAgICAgICAgICAgcXR5IC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ1JvdW5kKGRpZ2l0cykge1xuICAgICAgICB2YXIgZGlnaXRzQXJyYXkgPSBkaWdpdHMuc3BsaXQoXCJcIikucmV2ZXJzZSgpO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBjYXJyeSA9IHRydWU7XG5cbiAgICAgICAgd2hpbGUgKGNhcnJ5ICYmIGkgPCBkaWdpdHNBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpZ2l0c0FycmF5W2ldID09PSBcIjlcIikge1xuICAgICAgICAgICAgICAgICAgICBkaWdpdHNBcnJheVtpXSA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRpZ2l0c0FycmF5W2ldID0gKHBhcnNlSW50KGRpZ2l0c0FycmF5W2ldLCAxMCkgKyAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBjYXJyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGRpZ2l0c0FycmF5W2ldLCAxMCkgPCA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhcnJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGlnaXRzQXJyYXlbaV0gPSBcIjBcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhcnJ5KSB7XG4gICAgICAgICAgICBkaWdpdHNBcnJheS5wdXNoKFwiMVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkaWdpdHNBcnJheS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICB9XG5cbiAgICAvLyBjYWNoZWROdW1iZXJGb3JtYXRcbiAgICAvLyBSZXR1cm5zIGFuIGBJbnRsLk51bWJlckZvcm1hdGAgaW5zdGFuY2UgZm9yIHRoZSBnaXZlbiBsb2NhbGUgYW5kIGNvbmZpZ3VyYXRpb24uXG4gICAgLy8gT24gZmlyc3QgdXNlIG9mIGEgcGFydGljdWxhciBjb25maWd1cmF0aW9uLCB0aGUgaW5zdGFuY2UgaXMgY2FjaGVkIGZvciBmYXN0XG4gICAgLy8gcmVwZWF0IGFjY2Vzcy5cbiAgICBmdW5jdGlvbiBjYWNoZWROdW1iZXJGb3JtYXQobG9jYWxlLCBvcHRpb25zKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIHNvcnRlZCwgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiBgb3B0aW9uc2BcbiAgICAgICAgLy8gZm9yIHVzZSBhcyBwYXJ0IG9mIHRoZSBjYWNoZSBrZXlcbiAgICAgICAgdmFyIG9wdGlvbnNTdHJpbmcgPSBtYXAoXG4gICAgICAgICAgICBrZXlzKG9wdGlvbnMpLnNvcnQoKSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXkgKyAnOicgKyBvcHRpb25zW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICkuam9pbignLCcpO1xuXG4gICAgICAgIC8vIFNldCBvdXIgY2FjaGUga2V5XG4gICAgICAgIHZhciBjYWNoZUtleSA9IGxvY2FsZSArICcrJyArIG9wdGlvbnNTdHJpbmc7XG5cbiAgICAgICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSB0aGlzIGNvbmZpZ3VyYXRpb24gY2FjaGVkLCBjb25maWd1cmUgYW5kIGNhY2hlIGl0XG4gICAgICAgIGlmICghY2FjaGVkTnVtYmVyRm9ybWF0LmNhY2hlW2NhY2hlS2V5XSkge1xuICAgICAgICAgICAgY2FjaGVkTnVtYmVyRm9ybWF0LmNhY2hlW2NhY2hlS2V5XSA9IEludGwuTnVtYmVyRm9ybWF0KGxvY2FsZSwgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gdGhlIGNhY2hlZCB2ZXJzaW9uIG9mIHRoaXMgY29uZmlndXJhdGlvblxuICAgICAgICByZXR1cm4gY2FjaGVkTnVtYmVyRm9ybWF0LmNhY2hlW2NhY2hlS2V5XTtcbiAgICB9XG4gICAgY2FjaGVkTnVtYmVyRm9ybWF0LmNhY2hlID0ge307XG5cbiAgICAvLyBmb3JtYXROdW1iZXJcbiAgICAvLyBGb3JtYXRzIGFueSBudW1iZXIgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHplcm8gdXNpbmcgdGhlc2Ugb3B0aW9uczpcbiAgICAvLyAtIHVzZXJMb2NhbGVcbiAgICAvLyAtIHVzZVRvTG9jYWxlU3RyaW5nXG4gICAgLy8gLSB1c2VHcm91cGluZ1xuICAgIC8vIC0gZ3JvdXBpbmdcbiAgICAvLyAtIG1heGltdW1TaWduaWZpY2FudERpZ2l0c1xuICAgIC8vIC0gbWluaW11bUludGVnZXJEaWdpdHNcbiAgICAvLyAtIGZyYWN0aW9uRGlnaXRzXG4gICAgLy8gLSBncm91cGluZ1NlcGFyYXRvclxuICAgIC8vIC0gZGVjaW1hbFNlcGFyYXRvclxuICAgIC8vXG4gICAgLy8gYHVzZVRvTG9jYWxlU3RyaW5nYCB3aWxsIHVzZSBgSW50bC5OdW1iZXJGb3JtYXRgIG9yIGB0b0xvY2FsZVN0cmluZ2AgZm9yIGZvcm1hdHRpbmcuXG4gICAgLy8gYHVzZXJMb2NhbGVgIG9wdGlvbiBpcyBwYXNzZWQgdGhyb3VnaCB0byB0aGUgZm9ybWF0dGluZyBmdW5jdGlvbi5cbiAgICAvLyBgZnJhY3Rpb25EaWdpdHNgIGlzIHBhc3NlZCB0aHJvdWdoIHRvIGBtYXhpbXVtRnJhY3Rpb25EaWdpdHNgIGFuZCBgbWluaW11bUZyYWN0aW9uRGlnaXRzYFxuICAgIC8vIFVzaW5nIGBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHNgIHdpbGwgb3ZlcnJpZGUgYG1pbmltdW1JbnRlZ2VyRGlnaXRzYCBhbmQgYGZyYWN0aW9uRGlnaXRzYC5cbiAgICBmdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtYmVyLCBvcHRpb25zLCB1c2VyTG9jYWxlKSB7XG4gICAgICAgIHZhciB1c2VUb0xvY2FsZVN0cmluZyA9IG9wdGlvbnMudXNlVG9Mb2NhbGVTdHJpbmc7XG4gICAgICAgIHZhciB1c2VHcm91cGluZyA9IG9wdGlvbnMudXNlR3JvdXBpbmc7XG4gICAgICAgIHZhciBncm91cGluZyA9IHVzZUdyb3VwaW5nICYmIG9wdGlvbnMuZ3JvdXBpbmcuc2xpY2UoKTtcbiAgICAgICAgdmFyIG1heGltdW1TaWduaWZpY2FudERpZ2l0cyA9IG9wdGlvbnMubWF4aW11bVNpZ25pZmljYW50RGlnaXRzO1xuICAgICAgICB2YXIgbWluaW11bUludGVnZXJEaWdpdHMgPSBvcHRpb25zLm1pbmltdW1JbnRlZ2VyRGlnaXRzIHx8IDE7XG4gICAgICAgIHZhciBmcmFjdGlvbkRpZ2l0cyA9IG9wdGlvbnMuZnJhY3Rpb25EaWdpdHMgfHwgMDtcbiAgICAgICAgdmFyIGdyb3VwaW5nU2VwYXJhdG9yID0gb3B0aW9ucy5ncm91cGluZ1NlcGFyYXRvcjtcbiAgICAgICAgdmFyIGRlY2ltYWxTZXBhcmF0b3IgPSBvcHRpb25zLmRlY2ltYWxTZXBhcmF0b3I7XG5cbiAgICAgICAgaWYgKHVzZVRvTG9jYWxlU3RyaW5nICYmIHVzZXJMb2NhbGUpIHtcbiAgICAgICAgICAgIHZhciBsb2NhbGVTdHJpbmdPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzOiBtaW5pbXVtSW50ZWdlckRpZ2l0cyxcbiAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdXNlR3JvdXBpbmdcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChmcmFjdGlvbkRpZ2l0cykge1xuICAgICAgICAgICAgICAgIGxvY2FsZVN0cmluZ09wdGlvbnMubWF4aW11bUZyYWN0aW9uRGlnaXRzID0gZnJhY3Rpb25EaWdpdHM7XG4gICAgICAgICAgICAgICAgbG9jYWxlU3RyaW5nT3B0aW9ucy5taW5pbXVtRnJhY3Rpb25EaWdpdHMgPSBmcmFjdGlvbkRpZ2l0cztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdG9Mb2NhbGVTdHJpbmcgb3V0cHV0IGlzIFwiMC4wXCIgaW5zdGVhZCBvZiBcIjBcIiBmb3IgSFRDIGJyb3dzZXJzXG4gICAgICAgICAgICAvLyB3aGVuIG1heGltdW1TaWduaWZpY2FudERpZ2l0cyBpcyBzZXQuIFNlZSAjOTYuXG4gICAgICAgICAgICBpZiAobWF4aW11bVNpZ25pZmljYW50RGlnaXRzICYmIG51bWJlciA+IDApIHtcbiAgICAgICAgICAgICAgICBsb2NhbGVTdHJpbmdPcHRpb25zLm1heGltdW1TaWduaWZpY2FudERpZ2l0cyA9IG1heGltdW1TaWduaWZpY2FudERpZ2l0cztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGludGxOdW1iZXJGb3JtYXRXb3Jrcykge1xuICAgICAgICAgICAgICAgIGlmICghaW50bE51bWJlckZvcm1hdFJvdW5kaW5nV29ya3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdW5kaW5nT3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kaW5nT3B0aW9ucy51c2VHcm91cGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByb3VuZGluZ09wdGlvbnMuZGVjaW1hbFNlcGFyYXRvciA9IFwiLlwiO1xuICAgICAgICAgICAgICAgICAgICBudW1iZXIgPSBwYXJzZUZsb2F0KGZvcm1hdE51bWJlcihudW1iZXIsIHJvdW5kaW5nT3B0aW9ucyksIDEwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVkTnVtYmVyRm9ybWF0KHVzZXJMb2NhbGUsIGxvY2FsZVN0cmluZ09wdGlvbnMpLmZvcm1hdChudW1iZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRvTG9jYWxlU3RyaW5nUm91bmRpbmdXb3Jrcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm91bmRpbmdPcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgcm91bmRpbmdPcHRpb25zLnVzZUdyb3VwaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kaW5nT3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yID0gXCIuXCI7XG4gICAgICAgICAgICAgICAgICAgIG51bWJlciA9IHBhcnNlRmxvYXQoZm9ybWF0TnVtYmVyKG51bWJlciwgcm91bmRpbmdPcHRpb25zKSwgMTApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBudW1iZXIudG9Mb2NhbGVTdHJpbmcodXNlckxvY2FsZSwgbG9jYWxlU3RyaW5nT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbnVtYmVyU3RyaW5nO1xuXG4gICAgICAgIC8vIEFkZCAxIHRvIGRpZ2l0IG91dHB1dCBsZW5ndGggZm9yIGZsb2F0aW5nIHBvaW50IGVycm9ycyB3b3JrYXJvdW5kLiBTZWUgYmVsb3cuXG4gICAgICAgIGlmIChtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMpIHtcbiAgICAgICAgICAgIG51bWJlclN0cmluZyA9IG51bWJlci50b1ByZWNpc2lvbihtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgKyAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG51bWJlclN0cmluZyA9IG51bWJlci50b0ZpeGVkKGZyYWN0aW9uRGlnaXRzICsgMSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW50ZWdlclN0cmluZztcbiAgICAgICAgdmFyIGZyYWN0aW9uU3RyaW5nO1xuICAgICAgICB2YXIgZXhwb25lbnRTdHJpbmc7XG5cbiAgICAgICAgdmFyIHRlbXAgPSBudW1iZXJTdHJpbmcuc3BsaXQoXCJlXCIpO1xuXG4gICAgICAgIGV4cG9uZW50U3RyaW5nID0gdGVtcFsxXSB8fCBcIlwiO1xuXG4gICAgICAgIHRlbXAgPSB0ZW1wWzBdLnNwbGl0KFwiLlwiKTtcblxuICAgICAgICBmcmFjdGlvblN0cmluZyA9IHRlbXBbMV0gfHwgXCJcIjtcbiAgICAgICAgaW50ZWdlclN0cmluZyA9IHRlbXBbMF0gfHwgXCJcIjtcblxuICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciBmbG9hdGluZyBwb2ludCBlcnJvcnMgaW4gYHRvRml4ZWRgIGFuZCBgdG9QcmVjaXNpb25gLlxuICAgICAgICAvLyAoMy41NSkudG9GaXhlZCgxKTsgLS0+IFwiMy41XCJcbiAgICAgICAgLy8gKDEyMy41NSAtIDEyMCkudG9QcmVjaXNpb24oMik7IC0tPiBcIjMuNVwiXG4gICAgICAgIC8vICgxMjMuNTUgLSAxMjApOyAtLT4gMy41NDk5OTk5OTk5OTk5OTdcbiAgICAgICAgLy8gKDEyMy41NSAtIDEyMCkudG9GaXhlZCgyKTsgLS0+IFwiMy41NVwiXG4gICAgICAgIC8vIFJvdW5kIGJ5IGV4YW1pbmcgdGhlIHN0cmluZyBvdXRwdXQgb2YgdGhlIG5leHQgZGlnaXQuXG5cbiAgICAgICAgLy8gKioqKioqKioqKioqKioqIEltcGxlbWVudCBTdHJpbmcgUm91bmRpbmcgaGVyZSAqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAvLyBDaGVjayBpbnRlZ2VyU3RyaW5nICsgZnJhY3Rpb25TdHJpbmcgbGVuZ3RoIG9mIHRvUHJlY2lzaW9uIGJlZm9yZSByb3VuZGluZy5cbiAgICAgICAgLy8gQ2hlY2sgbGVuZ3RoIG9mIGZyYWN0aW9uU3RyaW5nIGZyb20gdG9GaXhlZCBvdXRwdXQgYmVmb3JlIHJvdW5kaW5nLlxuICAgICAgICB2YXIgaW50ZWdlckxlbmd0aCA9IGludGVnZXJTdHJpbmcubGVuZ3RoO1xuICAgICAgICB2YXIgZnJhY3Rpb25MZW5ndGggPSBmcmFjdGlvblN0cmluZy5sZW5ndGg7XG4gICAgICAgIHZhciBkaWdpdENvdW50ID0gaW50ZWdlckxlbmd0aCArIGZyYWN0aW9uTGVuZ3RoO1xuICAgICAgICB2YXIgZGlnaXRzID0gaW50ZWdlclN0cmluZyArIGZyYWN0aW9uU3RyaW5nO1xuXG4gICAgICAgIGlmIChtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgJiYgZGlnaXRDb3VudCA9PT0gKG1heGltdW1TaWduaWZpY2FudERpZ2l0cyArIDEpIHx8ICFtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgJiYgZnJhY3Rpb25MZW5ndGggPT09IChmcmFjdGlvbkRpZ2l0cyArIDEpKSB7XG4gICAgICAgICAgICAvLyBSb3VuZCBkaWdpdHMuXG4gICAgICAgICAgICBkaWdpdHMgPSBzdHJpbmdSb3VuZChkaWdpdHMpO1xuXG4gICAgICAgICAgICBpZiAoZGlnaXRzLmxlbmd0aCA9PT0gZGlnaXRDb3VudCArIDEpIHtcbiAgICAgICAgICAgICAgICBpbnRlZ2VyTGVuZ3RoID0gaW50ZWdlckxlbmd0aCArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERpc2NhcmQgZmluYWwgZnJhY3Rpb25EaWdpdC5cbiAgICAgICAgICAgIGlmIChmcmFjdGlvbkxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRpZ2l0cyA9IGRpZ2l0cy5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNlcGFyYXRlIGludGVnZXIgYW5kIGZyYWN0aW9uLlxuICAgICAgICAgICAgaW50ZWdlclN0cmluZyA9IGRpZ2l0cy5zbGljZSgwLCBpbnRlZ2VyTGVuZ3RoKTtcbiAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gZGlnaXRzLnNsaWNlKGludGVnZXJMZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVHJpbSB0cmFpbGluZyB6ZXJvZXMgZnJvbSBmcmFjdGlvblN0cmluZyBiZWNhdXNlIHRvUHJlY2lzaW9uIG91dHB1dHNcbiAgICAgICAgLy8gcHJlY2lzaW9uLCBub3Qgc2lnbmlmaWNhbnQgZGlnaXRzLlxuICAgICAgICBpZiAobWF4aW11bVNpZ25pZmljYW50RGlnaXRzKSB7XG4gICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IGZyYWN0aW9uU3RyaW5nLnJlcGxhY2UoLzAqJC8sIFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIGV4cG9uZW50LlxuICAgICAgICB2YXIgZXhwb25lbnQgPSBwYXJzZUludChleHBvbmVudFN0cmluZywgMTApO1xuXG4gICAgICAgIGlmIChleHBvbmVudCA+IDApIHtcbiAgICAgICAgICAgIGlmIChmcmFjdGlvblN0cmluZy5sZW5ndGggPD0gZXhwb25lbnQpIHtcbiAgICAgICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IGZyYWN0aW9uU3RyaW5nICsgcmVwZWF0WmVybyhleHBvbmVudCAtIGZyYWN0aW9uU3RyaW5nLmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICBpbnRlZ2VyU3RyaW5nID0gaW50ZWdlclN0cmluZyArIGZyYWN0aW9uU3RyaW5nO1xuICAgICAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW50ZWdlclN0cmluZyA9IGludGVnZXJTdHJpbmcgKyBmcmFjdGlvblN0cmluZy5zbGljZSgwLCBleHBvbmVudCk7XG4gICAgICAgICAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSBmcmFjdGlvblN0cmluZy5zbGljZShleHBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXhwb25lbnQgPCAwKSB7XG4gICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IChyZXBlYXRaZXJvKE1hdGguYWJzKGV4cG9uZW50KSAtIGludGVnZXJTdHJpbmcubGVuZ3RoKSArIGludGVnZXJTdHJpbmcgKyBmcmFjdGlvblN0cmluZyk7XG5cbiAgICAgICAgICAgIGludGVnZXJTdHJpbmcgPSBcIjBcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbWF4aW11bVNpZ25pZmljYW50RGlnaXRzKSB7XG4gICAgICAgICAgICAvLyBUcmltIG9yIHBhZCBmcmFjdGlvbiB3aGVuIG5vdCB1c2luZyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMuXG4gICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IGZyYWN0aW9uU3RyaW5nLnNsaWNlKDAsIGZyYWN0aW9uRGlnaXRzKTtcblxuICAgICAgICAgICAgaWYgKGZyYWN0aW9uU3RyaW5nLmxlbmd0aCA8IGZyYWN0aW9uRGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSBmcmFjdGlvblN0cmluZyArIHJlcGVhdFplcm8oZnJhY3Rpb25EaWdpdHMgLSBmcmFjdGlvblN0cmluZy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBQYWQgaW50ZWdlciB3aGVuIHVzaW5nIG1pbmltdW1JbnRlZ2VyRGlnaXRzXG4gICAgICAgICAgICAvLyBhbmQgbm90IHVzaW5nIG1heGltdW1TaWduaWZpY2FudERpZ2l0cy5cbiAgICAgICAgICAgIGlmIChpbnRlZ2VyU3RyaW5nLmxlbmd0aCA8IG1pbmltdW1JbnRlZ2VyRGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgaW50ZWdlclN0cmluZyA9IHJlcGVhdFplcm8obWluaW11bUludGVnZXJEaWdpdHMgLSBpbnRlZ2VyU3RyaW5nLmxlbmd0aCkgKyBpbnRlZ2VyU3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZvcm1hdHRlZFN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgLy8gSGFuZGxlIGdyb3VwaW5nLlxuICAgICAgICBpZiAodXNlR3JvdXBpbmcpIHtcbiAgICAgICAgICAgIHRlbXAgPSBpbnRlZ2VyU3RyaW5nO1xuICAgICAgICAgICAgdmFyIGdyb3VwO1xuXG4gICAgICAgICAgICB3aGlsZSAodGVtcC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gZ3JvdXBpbmcuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0dGVkU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IGdyb3VwaW5nU2VwYXJhdG9yICsgZm9ybWF0dGVkU3RyaW5nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRlbXAuc2xpY2UoLWdyb3VwKSArIGZvcm1hdHRlZFN0cmluZztcblxuICAgICAgICAgICAgICAgIHRlbXAgPSB0ZW1wLnNsaWNlKDAsIC1ncm91cCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3JtYXR0ZWRTdHJpbmcgPSBpbnRlZ2VyU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGRlY2ltYWxTZXBhcmF0b3IgYW5kIGZyYWN0aW9uLlxuICAgICAgICBpZiAoZnJhY3Rpb25TdHJpbmcpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IGZvcm1hdHRlZFN0cmluZyArIGRlY2ltYWxTZXBhcmF0b3IgKyBmcmFjdGlvblN0cmluZztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRTdHJpbmc7XG4gICAgfVxuXG4gICAgLy8gZHVyYXRpb25MYWJlbENvbXBhcmVcbiAgICBmdW5jdGlvbiBkdXJhdGlvbkxhYmVsQ29tcGFyZShhLCBiKSB7XG4gICAgICAgIGlmIChhLmxhYmVsLmxlbmd0aCA+IGIubGFiZWwubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYS5sYWJlbC5sZW5ndGggPCBiLmxhYmVsLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhIG11c3QgYmUgZXF1YWwgdG8gYlxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvLyBkdXJhdGlvbkdldExhYmVsc1xuICAgIGZ1bmN0aW9uIGR1cmF0aW9uR2V0TGFiZWxzKHRva2VuLCBsb2NhbGVEYXRhKSB7XG4gICAgICAgIHZhciBsYWJlbHMgPSBbXTtcblxuICAgICAgICBlYWNoKGtleXMobG9jYWxlRGF0YSksIGZ1bmN0aW9uIChsb2NhbGVEYXRhS2V5KSB7XG4gICAgICAgICAgICBpZiAobG9jYWxlRGF0YUtleS5zbGljZSgwLCAxNSkgIT09IFwiX2R1cmF0aW9uTGFiZWxzXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBsYWJlbFR5cGUgPSBsb2NhbGVEYXRhS2V5LnNsaWNlKDE1KS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBlYWNoKGtleXMobG9jYWxlRGF0YVtsb2NhbGVEYXRhS2V5XSksIGZ1bmN0aW9uIChsYWJlbEtleSkge1xuICAgICAgICAgICAgICAgIGlmIChsYWJlbEtleS5zbGljZSgwLCAxKSA9PT0gdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbGFiZWxUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBsYWJlbEtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBsb2NhbGVEYXRhW2xvY2FsZURhdGFLZXldW2xhYmVsS2V5XVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGxhYmVscztcbiAgICB9XG5cbiAgICAvLyBkdXJhdGlvblBsdXJhbEtleVxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uUGx1cmFsS2V5KHRva2VuLCBpbnRlZ2VyVmFsdWUsIGRlY2ltYWxWYWx1ZSkge1xuICAgICAgICAvLyBTaW5ndWxhciBmb3IgYSB2YWx1ZSBvZiBgMWAsIGJ1dCBub3QgZm9yIGAxLjBgLlxuICAgICAgICBpZiAoaW50ZWdlclZhbHVlID09PSAxICYmIGRlY2ltYWxWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRva2VuICsgdG9rZW47XG4gICAgfVxuXG4gICAgdmFyIGVuZ0xvY2FsZSA9IHtcbiAgICAgICAgZHVyYXRpb25MYWJlbHNTdGFuZGFyZDoge1xuICAgICAgICAgICAgUzogJ21pbGxpc2Vjb25kJyxcbiAgICAgICAgICAgIFNTOiAnbWlsbGlzZWNvbmRzJyxcbiAgICAgICAgICAgIHM6ICdzZWNvbmQnLFxuICAgICAgICAgICAgc3M6ICdzZWNvbmRzJyxcbiAgICAgICAgICAgIG06ICdtaW51dGUnLFxuICAgICAgICAgICAgbW06ICdtaW51dGVzJyxcbiAgICAgICAgICAgIGg6ICdob3VyJyxcbiAgICAgICAgICAgIGhoOiAnaG91cnMnLFxuICAgICAgICAgICAgZDogJ2RheScsXG4gICAgICAgICAgICBkZDogJ2RheXMnLFxuICAgICAgICAgICAgdzogJ3dlZWsnLFxuICAgICAgICAgICAgd3c6ICd3ZWVrcycsXG4gICAgICAgICAgICBNOiAnbW9udGgnLFxuICAgICAgICAgICAgTU06ICdtb250aHMnLFxuICAgICAgICAgICAgeTogJ3llYXInLFxuICAgICAgICAgICAgeXk6ICd5ZWFycydcbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb25MYWJlbHNTaG9ydDoge1xuICAgICAgICAgICAgUzogJ21zZWMnLFxuICAgICAgICAgICAgU1M6ICdtc2VjcycsXG4gICAgICAgICAgICBzOiAnc2VjJyxcbiAgICAgICAgICAgIHNzOiAnc2VjcycsXG4gICAgICAgICAgICBtOiAnbWluJyxcbiAgICAgICAgICAgIG1tOiAnbWlucycsXG4gICAgICAgICAgICBoOiAnaHInLFxuICAgICAgICAgICAgaGg6ICdocnMnLFxuICAgICAgICAgICAgZDogJ2R5JyxcbiAgICAgICAgICAgIGRkOiAnZHlzJyxcbiAgICAgICAgICAgIHc6ICd3aycsXG4gICAgICAgICAgICB3dzogJ3drcycsXG4gICAgICAgICAgICBNOiAnbW8nLFxuICAgICAgICAgICAgTU06ICdtb3MnLFxuICAgICAgICAgICAgeTogJ3lyJyxcbiAgICAgICAgICAgIHl5OiAneXJzJ1xuICAgICAgICB9LFxuICAgICAgICBkdXJhdGlvblRpbWVUZW1wbGF0ZXM6IHtcbiAgICAgICAgICAgIEhNUzogJ2g6bW06c3MnLFxuICAgICAgICAgICAgSE06ICdoOm1tJyxcbiAgICAgICAgICAgIE1TOiAnbTpzcydcbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb25MYWJlbFR5cGVzOiBbXG4gICAgICAgICAgICB7IHR5cGU6IFwic3RhbmRhcmRcIiwgc3RyaW5nOiBcIl9fXCIgfSxcbiAgICAgICAgICAgIHsgdHlwZTogXCJzaG9ydFwiLCBzdHJpbmc6IFwiX1wiIH1cbiAgICAgICAgXSxcbiAgICAgICAgZHVyYXRpb25QbHVyYWxLZXk6IGR1cmF0aW9uUGx1cmFsS2V5XG4gICAgfTtcblxuICAgIC8vIGlzQXJyYXlcbiAgICBmdW5jdGlvbiBpc0FycmF5KGFycmF5KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyYXkpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG4gICAgfVxuXG4gICAgLy8gaXNPYmplY3RcbiAgICBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xuICAgIH1cblxuICAgIC8vIGZpbmRMYXN0XG4gICAgZnVuY3Rpb24gZmluZExhc3QoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGFycmF5Lmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoaW5kZXggLT0gMSkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGFycmF5W2luZGV4XSkpIHsgcmV0dXJuIGFycmF5W2luZGV4XTsgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmluZFxuICAgIGZ1bmN0aW9uIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG5cbiAgICAgICAgdmFyIG1heCA9IGFycmF5ICYmIGFycmF5Lmxlbmd0aCB8fCAwO1xuXG4gICAgICAgIHZhciBtYXRjaDtcblxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIG1hdGNoID0gY2FsbGJhY2s7XG4gICAgICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPT09IG1hdGNoO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChpbmRleCA8IG1heCkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGFycmF5W2luZGV4XSkpIHsgcmV0dXJuIGFycmF5W2luZGV4XTsgfVxuICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGVhY2hcbiAgICBmdW5jdGlvbiBlYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgICAgbWF4ID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgICAgIGlmICghYXJyYXkgfHwgIW1heCkgeyByZXR1cm47IH1cblxuICAgICAgICB3aGlsZSAoaW5kZXggPCBtYXgpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhhcnJheVtpbmRleF0sIGluZGV4KSA9PT0gZmFsc2UpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gbWFwXG4gICAgZnVuY3Rpb24gbWFwKGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgICAgbWF4ID0gYXJyYXkubGVuZ3RoLFxuICAgICAgICAgICAgcmV0ID0gW107XG5cbiAgICAgICAgaWYgKCFhcnJheSB8fCAhbWF4KSB7IHJldHVybiByZXQ7IH1cblxuICAgICAgICB3aGlsZSAoaW5kZXggPCBtYXgpIHtcbiAgICAgICAgICAgIHJldFtpbmRleF0gPSBjYWxsYmFjayhhcnJheVtpbmRleF0sIGluZGV4KTtcbiAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8vIHBsdWNrXG4gICAgZnVuY3Rpb24gcGx1Y2soYXJyYXksIHByb3ApIHtcbiAgICAgICAgcmV0dXJuIG1hcChhcnJheSwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtW3Byb3BdO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBjb21wYWN0XG4gICAgZnVuY3Rpb24gY29tcGFjdChhcnJheSkge1xuICAgICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgICAgZWFjaChhcnJheSwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChpdGVtKSB7IHJldC5wdXNoKGl0ZW0pOyB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gdW5pcXVlXG4gICAgZnVuY3Rpb24gdW5pcXVlKGFycmF5KSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICBlYWNoKGFycmF5LCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIGlmICghZmluZChyZXQsIF9hKSkgeyByZXQucHVzaChfYSk7IH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvLyBpbnRlcnNlY3Rpb25cbiAgICBmdW5jdGlvbiBpbnRlcnNlY3Rpb24oYSwgYikge1xuICAgICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgICAgZWFjaChhLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIGVhY2goYiwgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9hID09PSBfYikgeyByZXQucHVzaChfYSk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdW5pcXVlKHJldCk7XG4gICAgfVxuXG4gICAgLy8gcmVzdFxuICAgIGZ1bmN0aW9uIHJlc3QoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICBlYWNoKGFycmF5LCBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghY2FsbGJhY2soaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXQgPSBhcnJheS5zbGljZShpbmRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8vIGluaXRpYWxcbiAgICBmdW5jdGlvbiBpbml0aWFsKGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgcmV2ZXJzZWQgPSBhcnJheS5zbGljZSgpLnJldmVyc2UoKTtcblxuICAgICAgICByZXR1cm4gcmVzdChyZXZlcnNlZCwgY2FsbGJhY2spLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICAvLyBleHRlbmRcbiAgICBmdW5jdGlvbiBleHRlbmQoYSwgYikge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgICAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSkgeyBhW2tleV0gPSBiW2tleV07IH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIC8vIGtleXNcbiAgICBmdW5jdGlvbiBrZXlzKGEpIHtcbiAgICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBhKSB7XG4gICAgICAgICAgICBpZiAoYS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7IHJldC5wdXNoKGtleSk7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gYW55XG4gICAgZnVuY3Rpb24gYW55KGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgICAgbWF4ID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgICAgIGlmICghYXJyYXkgfHwgIW1heCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICB3aGlsZSAoaW5kZXggPCBtYXgpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhhcnJheVtpbmRleF0sIGluZGV4KSA9PT0gdHJ1ZSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBmbGF0dGVuXG4gICAgZnVuY3Rpb24gZmxhdHRlbihhcnJheSkge1xuICAgICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgICAgZWFjaChhcnJheSwgZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgICAgIHJldCA9IHJldC5jb25jYXQoY2hpbGQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvTG9jYWxlU3RyaW5nU3VwcG9ydHNMb2NhbGVzKCkge1xuICAgICAgICB2YXIgbnVtYmVyID0gMDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG51bWJlci50b0xvY2FsZVN0cmluZygnaScpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5uYW1lID09PSAnUmFuZ2VFcnJvcic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZlYXR1cmVUZXN0Rm9ybWF0dGVyUm91bmRpbmcoZm9ybWF0dGVyKSB7XG4gICAgICAgIHJldHVybiBmb3JtYXR0ZXIoMy41NSwgXCJlblwiLCB7XG4gICAgICAgICAgICB1c2VHcm91cGluZzogZmFsc2UsXG4gICAgICAgICAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogMSxcbiAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMSxcbiAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMVxuICAgICAgICB9KSA9PT0gXCIzLjZcIjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmZWF0dXJlVGVzdEZvcm1hdHRlcihmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHBhc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gVGVzdCBtaW5pbXVtSW50ZWdlckRpZ2l0cy5cbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcigxLCBcImVuXCIsIHsgbWluaW11bUludGVnZXJEaWdpdHM6IDEgfSkgPT09IFwiMVwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDEsIFwiZW5cIiwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMiB9KSA9PT0gXCIwMVwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDEsIFwiZW5cIiwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMyB9KSA9PT0gXCIwMDFcIjtcbiAgICAgICAgaWYgKCFwYXNzZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgLy8gVGVzdCBtYXhpbXVtRnJhY3Rpb25EaWdpdHMgYW5kIG1pbmltdW1GcmFjdGlvbkRpZ2l0cy5cbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMCwgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwIH0pID09PSBcIjEwMFwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDk5Ljk5LCBcImVuXCIsIHsgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAxLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDEgfSkgPT09IFwiMTAwLjBcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMiwgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyIH0pID09PSBcIjk5Ljk5XCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDMsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMyB9KSA9PT0gXCI5OS45OTBcIjtcbiAgICAgICAgaWYgKCFwYXNzZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgLy8gVGVzdCBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMuXG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDEgfSkgPT09IFwiMTAwXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDIgfSkgPT09IFwiMTAwXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDMgfSkgPT09IFwiMTAwXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDQgfSkgPT09IFwiOTkuOTlcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogNSB9KSA9PT0gXCI5OS45OVwiO1xuICAgICAgICBpZiAoIXBhc3NlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICAvLyBUZXN0IGdyb3VwaW5nLlxuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDEwMDAsIFwiZW5cIiwgeyB1c2VHcm91cGluZzogdHJ1ZSB9KSA9PT0gXCIxLDAwMFwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDEwMDAsIFwiZW5cIiwgeyB1c2VHcm91cGluZzogZmFsc2UgfSkgPT09IFwiMTAwMFwiO1xuICAgICAgICBpZiAoIXBhc3NlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBkdXJhdGlvbnNGb3JtYXQoZHVyYXRpb25zIFssIHRlbXBsYXRlXSBbLCBwcmVjaXNpb25dIFssIHNldHRpbmdzXSlcbiAgICBmdW5jdGlvbiBkdXJhdGlvbnNGb3JtYXQoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSB7fTtcbiAgICAgICAgdmFyIGR1cmF0aW9ucztcblxuICAgICAgICAvLyBQYXJzZSBhcmd1bWVudHMuXG4gICAgICAgIGVhY2goYXJncywgZnVuY3Rpb24gKGFyZywgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQXJyYXkoYXJnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIkV4cGVjdGVkIGFycmF5IGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byBkdXJhdGlvbnNGb3JtYXQuXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZHVyYXRpb25zID0gYXJnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgYXJnID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy50ZW1wbGF0ZSA9IGFyZztcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MucHJlY2lzaW9uID0gYXJnO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGFyZykpIHtcbiAgICAgICAgICAgICAgICBleHRlbmQoc2V0dGluZ3MsIGFyZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghZHVyYXRpb25zIHx8ICFkdXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBzZXR0aW5ncy5yZXR1cm5Nb21lbnRUeXBlcyA9IHRydWU7XG5cbiAgICAgICAgdmFyIGZvcm1hdHRlZER1cmF0aW9ucyA9IG1hcChkdXJhdGlvbnMsIGZ1bmN0aW9uIChkdXIpIHtcbiAgICAgICAgICAgIHJldHVybiBkdXIuZm9ybWF0KHNldHRpbmdzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTWVyZ2UgdG9rZW4gdHlwZXMgZnJvbSBhbGwgZHVyYXRpb25zLlxuICAgICAgICB2YXIgb3V0cHV0VHlwZXMgPSBpbnRlcnNlY3Rpb24odHlwZXMsIHVuaXF1ZShwbHVjayhmbGF0dGVuKGZvcm1hdHRlZER1cmF0aW9ucyksIFwidHlwZVwiKSkpO1xuXG4gICAgICAgIHZhciBsYXJnZXN0ID0gc2V0dGluZ3MubGFyZ2VzdDtcblxuICAgICAgICBpZiAobGFyZ2VzdCkge1xuICAgICAgICAgICAgb3V0cHV0VHlwZXMgPSBvdXRwdXRUeXBlcy5zbGljZSgwLCBsYXJnZXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldHRpbmdzLnJldHVybk1vbWVudFR5cGVzID0gZmFsc2U7XG4gICAgICAgIHNldHRpbmdzLm91dHB1dFR5cGVzID0gb3V0cHV0VHlwZXM7XG5cbiAgICAgICAgcmV0dXJuIG1hcChkdXJhdGlvbnMsIGZ1bmN0aW9uIChkdXIpIHtcbiAgICAgICAgICAgIHJldHVybiBkdXIuZm9ybWF0KHNldHRpbmdzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZHVyYXRpb25Gb3JtYXQoW3RlbXBsYXRlXSBbLCBwcmVjaXNpb25dIFssIHNldHRpbmdzXSlcbiAgICBmdW5jdGlvbiBkdXJhdGlvbkZvcm1hdCgpIHtcblxuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgdmFyIHNldHRpbmdzID0gZXh0ZW5kKHt9LCB0aGlzLmZvcm1hdC5kZWZhdWx0cyk7XG5cbiAgICAgICAgLy8gS2VlcCBhIHNoYWRvdyBjb3B5IG9mIHRoaXMgbW9tZW50IGZvciBjYWxjdWxhdGluZyByZW1haW5kZXJzLlxuICAgICAgICAvLyBQZXJmb3JtIGFsbCBjYWxjdWxhdGlvbnMgb24gcG9zaXRpdmUgZHVyYXRpb24gdmFsdWUsIGhhbmRsZSBuZWdhdGl2ZVxuICAgICAgICAvLyBzaWduIGF0IHRoZSB2ZXJ5IGVuZC5cbiAgICAgICAgdmFyIGFzTWlsbGlzZWNvbmRzID0gdGhpcy5hc01pbGxpc2Vjb25kcygpO1xuICAgICAgICB2YXIgYXNNb250aHMgPSB0aGlzLmFzTW9udGhzKCk7XG5cbiAgICAgICAgLy8gVHJlYXQgaW52YWxpZCBkdXJhdGlvbnMgYXMgaGF2aW5nIGEgdmFsdWUgb2YgMCBtaWxsaXNlY29uZHMuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5pc1ZhbGlkID09PSBcImZ1bmN0aW9uXCIgJiYgdGhpcy5pc1ZhbGlkKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBhc01pbGxpc2Vjb25kcyA9IDA7XG4gICAgICAgICAgICBhc01vbnRocyA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXNOZWdhdGl2ZSA9IGFzTWlsbGlzZWNvbmRzIDwgMDtcblxuICAgICAgICAvLyBUd28gc2hhZG93IGNvcGllcyBhcmUgbmVlZGVkIGJlY2F1c2Ugb2YgdGhlIHdheSBtb21lbnQuanMgaGFuZGxlc1xuICAgICAgICAvLyBkdXJhdGlvbiBhcml0aG1ldGljIGZvciB5ZWFycy9tb250aHMgYW5kIGZvciB3ZWVrcy9kYXlzL2hvdXJzL21pbnV0ZXMvc2Vjb25kcy5cbiAgICAgICAgdmFyIHJlbWFpbmRlciA9IG1vbWVudC5kdXJhdGlvbihNYXRoLmFicyhhc01pbGxpc2Vjb25kcyksIFwibWlsbGlzZWNvbmRzXCIpO1xuICAgICAgICB2YXIgcmVtYWluZGVyTW9udGhzID0gbW9tZW50LmR1cmF0aW9uKE1hdGguYWJzKGFzTW9udGhzKSwgXCJtb250aHNcIik7XG5cbiAgICAgICAgLy8gUGFyc2UgYXJndW1lbnRzLlxuICAgICAgICBlYWNoKGFyZ3MsIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBhcmcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnRlbXBsYXRlID0gYXJnO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5wcmVjaXNpb24gPSBhcmc7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoYXJnKSkge1xuICAgICAgICAgICAgICAgIGV4dGVuZChzZXR0aW5ncywgYXJnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG1vbWVudFRva2VucyA9IHtcbiAgICAgICAgICAgIHllYXJzOiBcInlcIixcbiAgICAgICAgICAgIG1vbnRoczogXCJNXCIsXG4gICAgICAgICAgICB3ZWVrczogXCJ3XCIsXG4gICAgICAgICAgICBkYXlzOiBcImRcIixcbiAgICAgICAgICAgIGhvdXJzOiBcImhcIixcbiAgICAgICAgICAgIG1pbnV0ZXM6IFwibVwiLFxuICAgICAgICAgICAgc2Vjb25kczogXCJzXCIsXG4gICAgICAgICAgICBtaWxsaXNlY29uZHM6IFwiU1wiXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRva2VuRGVmcyA9IHtcbiAgICAgICAgICAgIGVzY2FwZTogL1xcWyguKz8pXFxdLyxcbiAgICAgICAgICAgIHllYXJzOiAvXFwqP1tZeV0rLyxcbiAgICAgICAgICAgIG1vbnRoczogL1xcKj9NKy8sXG4gICAgICAgICAgICB3ZWVrczogL1xcKj9bV3ddKy8sXG4gICAgICAgICAgICBkYXlzOiAvXFwqP1tEZF0rLyxcbiAgICAgICAgICAgIGhvdXJzOiAvXFwqP1tIaF0rLyxcbiAgICAgICAgICAgIG1pbnV0ZXM6IC9cXCo/bSsvLFxuICAgICAgICAgICAgc2Vjb25kczogL1xcKj9zKy8sXG4gICAgICAgICAgICBtaWxsaXNlY29uZHM6IC9cXCo/UysvLFxuICAgICAgICAgICAgZ2VuZXJhbDogLy4rPy9cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUeXBlcyBhcnJheSBpcyBhdmFpbGFibGUgaW4gdGhlIHRlbXBsYXRlIGZ1bmN0aW9uLlxuICAgICAgICBzZXR0aW5ncy50eXBlcyA9IHR5cGVzO1xuXG4gICAgICAgIHZhciB0eXBlTWFwID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gZmluZCh0eXBlcywgZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5EZWZzW3R5cGVdLnRlc3QodG9rZW4pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRva2VuaXplciA9IG5ldyBSZWdFeHAobWFwKHR5cGVzLCBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuRGVmc1t0eXBlXS5zb3VyY2U7XG4gICAgICAgIH0pLmpvaW4oXCJ8XCIpLCBcImdcIik7XG5cbiAgICAgICAgLy8gQ3VycmVudCBkdXJhdGlvbiBvYmplY3QgaXMgYXZhaWxhYmxlIGluIHRoZSB0ZW1wbGF0ZSBmdW5jdGlvbi5cbiAgICAgICAgc2V0dGluZ3MuZHVyYXRpb24gPSB0aGlzO1xuXG4gICAgICAgIC8vIEV2YWwgdGVtcGxhdGUgZnVuY3Rpb24gYW5kIGNhY2hlIHRlbXBsYXRlIHN0cmluZy5cbiAgICAgICAgdmFyIHRlbXBsYXRlID0gdHlwZW9mIHNldHRpbmdzLnRlbXBsYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXR0aW5ncy50ZW1wbGF0ZS5hcHBseShzZXR0aW5ncykgOiBzZXR0aW5ncy50ZW1wbGF0ZTtcblxuICAgICAgICAvLyBvdXRwdXRUeXBlcyBhbmQgcmV0dXJuTW9tZW50VHlwZXMgYXJlIHNldHRpbmdzIHRvIHN1cHBvcnQgZHVyYXRpb25zRm9ybWF0KCkuXG5cbiAgICAgICAgLy8gb3V0cHV0VHlwZXMgaXMgYW4gYXJyYXkgb2YgbW9tZW50IHRva2VuIHR5cGVzIHRoYXQgZGV0ZXJtaW5lc1xuICAgICAgICAvLyB0aGUgdG9rZW5zIHJldHVybmVkIGluIGZvcm1hdHRlZCBvdXRwdXQuIFRoaXMgb3B0aW9uIG92ZXJyaWRlc1xuICAgICAgICAvLyB0cmltLCBsYXJnZXN0LCBzdG9wVHJpbSwgZXRjLlxuICAgICAgICB2YXIgb3V0cHV0VHlwZXMgPSBzZXR0aW5ncy5vdXRwdXRUeXBlcztcblxuICAgICAgICAvLyByZXR1cm5Nb21lbnRUeXBlcyBpcyBhIGJvb2xlYW4gdGhhdCBzZXRzIGR1cmF0aW9uRm9ybWF0IHRvIHJldHVyblxuICAgICAgICAvLyB0aGUgcHJvY2Vzc2VkIG1vbWVudFR5cGVzIGluc3RlYWQgb2YgZm9ybWF0dGVkIG91dHB1dC5cbiAgICAgICAgdmFyIHJldHVybk1vbWVudFR5cGVzID0gc2V0dGluZ3MucmV0dXJuTW9tZW50VHlwZXM7XG5cbiAgICAgICAgdmFyIGxhcmdlc3QgPSBzZXR0aW5ncy5sYXJnZXN0O1xuXG4gICAgICAgIC8vIFNldHVwIHN0b3BUcmltIGFycmF5IG9mIHRva2VuIHR5cGVzLlxuICAgICAgICB2YXIgc3RvcFRyaW0gPSBbXTtcblxuICAgICAgICBpZiAoIW91dHB1dFR5cGVzKSB7XG4gICAgICAgICAgICBpZiAoaXNBcnJheShzZXR0aW5ncy5zdG9wVHJpbSkpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5zdG9wVHJpbSA9IHNldHRpbmdzLnN0b3BUcmltLmpvaW4oXCJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFBhcnNlIHN0b3BUcmltIHN0cmluZyB0byBjcmVhdGUgdG9rZW4gdHlwZXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3Muc3RvcFRyaW0pIHtcbiAgICAgICAgICAgICAgICBlYWNoKHNldHRpbmdzLnN0b3BUcmltLm1hdGNoKHRva2VuaXplciksIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVNYXAodG9rZW4pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImVzY2FwZVwiIHx8IHR5cGUgPT09IFwiZ2VuZXJhbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzdG9wVHJpbS5wdXNoKHR5cGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FjaGUgbW9tZW50J3MgbG9jYWxlIGRhdGEuXG4gICAgICAgIHZhciBsb2NhbGVEYXRhID0gbW9tZW50LmxvY2FsZURhdGEoKTtcblxuICAgICAgICBpZiAoIWxvY2FsZURhdGEpIHtcbiAgICAgICAgICAgIGxvY2FsZURhdGEgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byB0aGlzIHBsdWdpbidzIGBlbmdgIGV4dGVuc2lvbi5cbiAgICAgICAgZWFjaChrZXlzKGVuZ0xvY2FsZSksIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW5nTG9jYWxlW2tleV0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGlmICghbG9jYWxlRGF0YVtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZURhdGFba2V5XSA9IGVuZ0xvY2FsZVtrZXldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFsb2NhbGVEYXRhW1wiX1wiICsga2V5XSkge1xuICAgICAgICAgICAgICAgIGxvY2FsZURhdGFbXCJfXCIgKyBrZXldID0gZW5nTG9jYWxlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlcGxhY2UgRHVyYXRpb24gVGltZSBUZW1wbGF0ZSBzdHJpbmdzLlxuICAgICAgICAvLyBGb3IgbG9jYWxlIGBlbmdgOiBgX0hNU19gLCBgX0hNX2AsIGFuZCBgX01TX2AuXG4gICAgICAgIGVhY2goa2V5cyhsb2NhbGVEYXRhLl9kdXJhdGlvblRpbWVUZW1wbGF0ZXMpLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKFwiX1wiICsgaXRlbSArIFwiX1wiLCBsb2NhbGVEYXRhLl9kdXJhdGlvblRpbWVUZW1wbGF0ZXNbaXRlbV0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBEZXRlcm1pbmUgdXNlcidzIGxvY2FsZS5cbiAgICAgICAgdmFyIHVzZXJMb2NhbGUgPSBzZXR0aW5ncy51c2VyTG9jYWxlIHx8IG1vbWVudC5sb2NhbGUoKTtcblxuICAgICAgICB2YXIgdXNlTGVmdFVuaXRzID0gc2V0dGluZ3MudXNlTGVmdFVuaXRzO1xuICAgICAgICB2YXIgdXNlUGx1cmFsID0gc2V0dGluZ3MudXNlUGx1cmFsO1xuICAgICAgICB2YXIgcHJlY2lzaW9uID0gc2V0dGluZ3MucHJlY2lzaW9uO1xuICAgICAgICB2YXIgZm9yY2VMZW5ndGggPSBzZXR0aW5ncy5mb3JjZUxlbmd0aDtcbiAgICAgICAgdmFyIHVzZUdyb3VwaW5nID0gc2V0dGluZ3MudXNlR3JvdXBpbmc7XG4gICAgICAgIHZhciB0cnVuYyA9IHNldHRpbmdzLnRydW5jO1xuXG4gICAgICAgIC8vIFVzZSBzaWduaWZpY2FudCBkaWdpdHMgb25seSB3aGVuIHByZWNpc2lvbiBpcyBncmVhdGVyIHRoYW4gMC5cbiAgICAgICAgdmFyIHVzZVNpZ25pZmljYW50RGlnaXRzID0gc2V0dGluZ3MudXNlU2lnbmlmaWNhbnREaWdpdHMgJiYgcHJlY2lzaW9uID4gMDtcbiAgICAgICAgdmFyIHNpZ25pZmljYW50RGlnaXRzID0gdXNlU2lnbmlmaWNhbnREaWdpdHMgPyBzZXR0aW5ncy5wcmVjaXNpb24gOiAwO1xuICAgICAgICB2YXIgc2lnbmlmaWNhbnREaWdpdHNDYWNoZSA9IHNpZ25pZmljYW50RGlnaXRzO1xuXG4gICAgICAgIHZhciBtaW5WYWx1ZSA9IHNldHRpbmdzLm1pblZhbHVlO1xuICAgICAgICB2YXIgaXNNaW5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBtYXhWYWx1ZSA9IHNldHRpbmdzLm1heFZhbHVlO1xuICAgICAgICB2YXIgaXNNYXhWYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGZvcm1hdE51bWJlciBmYWxsYmFjayBvcHRpb25zLlxuICAgICAgICB2YXIgdXNlVG9Mb2NhbGVTdHJpbmcgPSBzZXR0aW5ncy51c2VUb0xvY2FsZVN0cmluZztcbiAgICAgICAgdmFyIGdyb3VwaW5nU2VwYXJhdG9yID0gc2V0dGluZ3MuZ3JvdXBpbmdTZXBhcmF0b3I7XG4gICAgICAgIHZhciBkZWNpbWFsU2VwYXJhdG9yID0gc2V0dGluZ3MuZGVjaW1hbFNlcGFyYXRvcjtcbiAgICAgICAgdmFyIGdyb3VwaW5nID0gc2V0dGluZ3MuZ3JvdXBpbmc7XG5cbiAgICAgICAgdXNlVG9Mb2NhbGVTdHJpbmcgPSB1c2VUb0xvY2FsZVN0cmluZyAmJiAodG9Mb2NhbGVTdHJpbmdXb3JrcyB8fCBpbnRsTnVtYmVyRm9ybWF0V29ya3MpO1xuXG4gICAgICAgIC8vIFRyaW0gb3B0aW9ucy5cbiAgICAgICAgdmFyIHRyaW0gPSBzZXR0aW5ncy50cmltO1xuXG4gICAgICAgIGlmIChpc0FycmF5KHRyaW0pKSB7XG4gICAgICAgICAgICB0cmltID0gdHJpbS5qb2luKFwiIFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0cmltID09PSBudWxsICYmIChsYXJnZXN0IHx8IG1heFZhbHVlIHx8IHVzZVNpZ25pZmljYW50RGlnaXRzKSkge1xuICAgICAgICAgICAgdHJpbSA9IFwiYWxsXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHJpbSA9PT0gbnVsbCB8fCB0cmltID09PSB0cnVlIHx8IHRyaW0gPT09IFwibGVmdFwiIHx8IHRyaW0gPT09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgdHJpbSA9IFwibGFyZ2VcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0cmltID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdHJpbSA9IFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdHJpbUluY2x1ZGVzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnRlc3QodHJpbSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHJMYXJnZSA9IC9sYXJnZS87XG4gICAgICAgIHZhciByU21hbGwgPSAvc21hbGwvO1xuICAgICAgICB2YXIgckJvdGggPSAvYm90aC87XG4gICAgICAgIHZhciByTWlkID0gL21pZC87XG4gICAgICAgIHZhciByQWxsID0gL15hbGx8W15zbV1hbGwvO1xuICAgICAgICB2YXIgckZpbmFsID0gL2ZpbmFsLztcblxuICAgICAgICB2YXIgdHJpbUxhcmdlID0gbGFyZ2VzdCA+IDAgfHwgYW55KFtyTGFyZ2UsIHJCb3RoLCByQWxsXSwgdHJpbUluY2x1ZGVzKTtcbiAgICAgICAgdmFyIHRyaW1TbWFsbCA9IGFueShbclNtYWxsLCByQm90aCwgckFsbF0sIHRyaW1JbmNsdWRlcyk7XG4gICAgICAgIHZhciB0cmltTWlkID0gYW55KFtyTWlkLCByQWxsXSwgdHJpbUluY2x1ZGVzKTtcbiAgICAgICAgdmFyIHRyaW1GaW5hbCA9IGFueShbckZpbmFsLCByQWxsXSwgdHJpbUluY2x1ZGVzKTtcblxuICAgICAgICAvLyBQYXJzZSBmb3JtYXQgc3RyaW5nIHRvIGNyZWF0ZSByYXcgdG9rZW5zIGFycmF5LlxuICAgICAgICB2YXIgcmF3VG9rZW5zID0gbWFwKHRlbXBsYXRlLm1hdGNoKHRva2VuaXplciksIGZ1bmN0aW9uICh0b2tlbiwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gdHlwZU1hcCh0b2tlbik7XG5cbiAgICAgICAgICAgIGlmICh0b2tlbi5zbGljZSgwLCAxKSA9PT0gXCIqXCIpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2VuLnNsaWNlKDEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IFwiZXNjYXBlXCIgJiYgdHlwZSAhPT0gXCJnZW5lcmFsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcFRyaW0ucHVzaCh0eXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIGxlbmd0aDogdG9rZW4ubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiXCIsXG5cbiAgICAgICAgICAgICAgICAvLyBSZXBsYWNlIGVzY2FwZWQgdG9rZW5zIHdpdGggdGhlIG5vbi1lc2NhcGVkIHRva2VuIHRleHQuXG4gICAgICAgICAgICAgICAgdG9rZW46ICh0eXBlID09PSBcImVzY2FwZVwiID8gdG9rZW4ucmVwbGFjZSh0b2tlbkRlZnMuZXNjYXBlLCBcIiQxXCIpIDogdG9rZW4pLFxuXG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIHR5cGUgb24gbm9uLW1vbWVudCB0b2tlbnMuXG4gICAgICAgICAgICAgICAgdHlwZTogKCh0eXBlID09PSBcImVzY2FwZVwiIHx8IHR5cGUgPT09IFwiZ2VuZXJhbFwiKSA/IG51bGwgOiB0eXBlKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQXNzb2NpYXRlIHRleHQgdG9rZW5zIHdpdGggbW9tZW50IHRva2Vucy5cbiAgICAgICAgdmFyIGN1cnJlbnRUb2tlbiA9IHtcbiAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgbGVuZ3RoOiAwLFxuICAgICAgICAgICAgdG9rZW46IFwiXCIsXG4gICAgICAgICAgICB0ZXh0OiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0b2tlbnMgPSBbXTtcblxuICAgICAgICBpZiAodXNlTGVmdFVuaXRzKSB7XG4gICAgICAgICAgICByYXdUb2tlbnMucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWFjaChyYXdUb2tlbnMsIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRva2VuLnR5cGUgfHwgY3VycmVudFRva2VuLnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5zLnB1c2goY3VycmVudFRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdXJyZW50VG9rZW4gPSB0b2tlbjtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHVzZUxlZnRVbml0cykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUb2tlbi50ZXh0ID0gdG9rZW4udG9rZW4gKyBjdXJyZW50VG9rZW4udGV4dDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRva2VuLnRleHQgKz0gdG9rZW4udG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjdXJyZW50VG9rZW4udHlwZSB8fCBjdXJyZW50VG9rZW4udGV4dCkge1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goY3VycmVudFRva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1c2VMZWZ0VW5pdHMpIHtcbiAgICAgICAgICAgIHRva2Vucy5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaW5kIHVuaXF1ZSBtb21lbnQgdG9rZW4gdHlwZXMgaW4gdGhlIHRlbXBsYXRlIGluIG9yZGVyIG9mXG4gICAgICAgIC8vIGRlc2NlbmRpbmcgbWFnbml0dWRlLlxuICAgICAgICB2YXIgbW9tZW50VHlwZXMgPSBpbnRlcnNlY3Rpb24odHlwZXMsIHVuaXF1ZShjb21wYWN0KHBsdWNrKHRva2VucywgXCJ0eXBlXCIpKSkpO1xuXG4gICAgICAgIC8vIEV4aXQgZWFybHkgaWYgdGhlcmUgYXJlIG5vIG1vbWVudCB0b2tlbiB0eXBlcy5cbiAgICAgICAgaWYgKCFtb21lbnRUeXBlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBwbHVjayh0b2tlbnMsIFwidGV4dFwiKS5qb2luKFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHZhbHVlcyBmb3IgZWFjaCBtb21lbnQgdHlwZSBpbiB0aGUgdGVtcGxhdGUuXG4gICAgICAgIC8vIEZvciBwcm9jZXNzaW5nIHRoZSBzZXR0aW5ncywgdmFsdWVzIGFyZSBhc3NvY2lhdGVkIHdpdGggbW9tZW50IHR5cGVzLlxuICAgICAgICAvLyBWYWx1ZXMgd2lsbCBiZSBhc3NpZ25lZCB0byB0b2tlbnMgYXQgdGhlIGxhc3Qgc3RlcCBpbiBvcmRlciB0b1xuICAgICAgICAvLyBhc3N1bWUgbm90aGluZyBhYm91dCBmcmVxdWVuY3kgb3Igb3JkZXIgb2YgdG9rZW5zIGluIHRoZSB0ZW1wbGF0ZS5cbiAgICAgICAgbW9tZW50VHlwZXMgPSBtYXAobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlLCBpbmRleCkge1xuICAgICAgICAgICAgLy8gSXMgdGhpcyB0aGUgbGVhc3QtbWFnbml0dWRlIG1vbWVudCB0b2tlbiBmb3VuZD9cbiAgICAgICAgICAgIHZhciBpc1NtYWxsZXN0ID0gKChpbmRleCArIDEpID09PSBtb21lbnRUeXBlcy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAvLyBJcyB0aGlzIHRoZSBncmVhdGVzdC1tYWduaXR1ZGUgbW9tZW50IHRva2VuIGZvdW5kP1xuICAgICAgICAgICAgdmFyIGlzTGFyZ2VzdCA9ICghaW5kZXgpO1xuXG4gICAgICAgICAgICAvLyBHZXQgdGhlIHJhdyB2YWx1ZSBpbiB0aGUgY3VycmVudCB1bml0cy5cbiAgICAgICAgICAgIHZhciByYXdWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKG1vbWVudFR5cGUgPT09IFwieWVhcnNcIiB8fCBtb21lbnRUeXBlID09PSBcIm1vbnRoc1wiKSB7XG4gICAgICAgICAgICAgICAgcmF3VmFsdWUgPSByZW1haW5kZXJNb250aHMuYXMobW9tZW50VHlwZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJhd1ZhbHVlID0gcmVtYWluZGVyLmFzKG1vbWVudFR5cGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgd2hvbGVWYWx1ZSA9IE1hdGguZmxvb3IocmF3VmFsdWUpO1xuICAgICAgICAgICAgdmFyIGRlY2ltYWxWYWx1ZSA9IHJhd1ZhbHVlIC0gd2hvbGVWYWx1ZTtcblxuICAgICAgICAgICAgdmFyIHRva2VuID0gZmluZCh0b2tlbnMsIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlID09PSB0b2tlbi50eXBlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChpc0xhcmdlc3QgJiYgbWF4VmFsdWUgJiYgcmF3VmFsdWUgPiBtYXhWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlzTWF4VmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNTbWFsbGVzdCAmJiBtaW5WYWx1ZSAmJiBNYXRoLmFicyhzZXR0aW5ncy5kdXJhdGlvbi5hcyhtb21lbnRUeXBlKSkgPCBtaW5WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlzTWluVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBOb3RlIHRoZSBsZW5ndGggb2YgdGhlIGxhcmdlc3QtbWFnbml0dWRlIG1vbWVudCB0b2tlbjpcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGdyZWF0ZXIgdGhhbiBvbmUgYW5kIGZvcmNlTGVuZ3RoIGlzIG5vdCBzZXQsXG4gICAgICAgICAgICAvLyB0aGVuIGRlZmF1bHQgZm9yY2VMZW5ndGggdG8gYHRydWVgLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFJhdGlvbmFsZSBpcyB0aGlzOiBJZiB0aGUgdGVtcGxhdGUgaXMgXCJoOm1tOnNzXCIgYW5kIHRoZVxuICAgICAgICAgICAgLy8gbW9tZW50IHZhbHVlIGlzIDUgbWludXRlcywgdGhlIHVzZXItZnJpZW5kbHkgb3V0cHV0IGlzXG4gICAgICAgICAgICAvLyBcIjU6MDBcIiwgbm90IFwiMDU6MDBcIi4gV2Ugc2hvdWxkbid0IHBhZCB0aGUgYG1pbnV0ZXNgIHRva2VuXG4gICAgICAgICAgICAvLyBldmVuIHRob3VnaCBpdCBoYXMgbGVuZ3RoIG9mIHR3byBpZiB0aGUgdGVtcGxhdGUgaXMgXCJoOm1tOnNzXCI7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gSWYgdGhlIG1pbnV0ZXMgb3V0cHV0IHNob3VsZCBhbHdheXMgaW5jbHVkZSB0aGUgbGVhZGluZyB6ZXJvXG4gICAgICAgICAgICAvLyBldmVuIHdoZW4gdGhlIGhvdXIgaXMgdHJpbW1lZCB0aGVuIHNldCBgeyBmb3JjZUxlbmd0aDogdHJ1ZSB9YFxuICAgICAgICAgICAgLy8gdG8gb3V0cHV0IFwiMDU6MDBcIi4gSWYgdGhlIHRlbXBsYXRlIGlzIFwiaGg6bW06c3NcIiwgdGhlIHVzZXJcbiAgICAgICAgICAgIC8vIGNsZWFybHkgd2FudGVkIGV2ZXJ5dGhpbmcgcGFkZGVkIHNvIHdlIHNob3VsZCBvdXRwdXQgXCIwNTowMFwiO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIHdhbnRzIHRoZSBmdWxsIHBhZGRlZCBvdXRwdXQsIHRoZXkgY2FuIHVzZVxuICAgICAgICAgICAgLy8gdGVtcGxhdGUgXCJoaDptbTpzc1wiIGFuZCBzZXQgYHsgdHJpbTogZmFsc2UgfWAgdG8gb3V0cHV0XG4gICAgICAgICAgICAvLyBcIjAwOjA1OjAwXCIuXG4gICAgICAgICAgICBpZiAoaXNMYXJnZXN0ICYmIGZvcmNlTGVuZ3RoID09PSBudWxsICYmIHRva2VuLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBmb3JjZUxlbmd0aCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSByZW1haW5kZXIuXG4gICAgICAgICAgICByZW1haW5kZXIuc3VidHJhY3Qod2hvbGVWYWx1ZSwgbW9tZW50VHlwZSk7XG4gICAgICAgICAgICByZW1haW5kZXJNb250aHMuc3VidHJhY3Qod2hvbGVWYWx1ZSwgbW9tZW50VHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmF3VmFsdWU6IHJhd1ZhbHVlLFxuICAgICAgICAgICAgICAgIHdob2xlVmFsdWU6IHdob2xlVmFsdWUsXG4gICAgICAgICAgICAgICAgLy8gRGVjaW1hbCB2YWx1ZSBpcyBvbmx5IHJldGFpbmVkIGZvciB0aGUgbGVhc3QtbWFnbml0dWRlXG4gICAgICAgICAgICAgICAgLy8gbW9tZW50IHR5cGUgaW4gdGhlIGZvcm1hdCB0ZW1wbGF0ZS5cbiAgICAgICAgICAgICAgICBkZWNpbWFsVmFsdWU6IGlzU21hbGxlc3QgPyBkZWNpbWFsVmFsdWUgOiAwLFxuICAgICAgICAgICAgICAgIGlzU21hbGxlc3Q6IGlzU21hbGxlc3QsXG4gICAgICAgICAgICAgICAgaXNMYXJnZXN0OiBpc0xhcmdlc3QsXG4gICAgICAgICAgICAgICAgdHlwZTogbW9tZW50VHlwZSxcbiAgICAgICAgICAgICAgICAvLyBUb2tlbnMgY2FuIGFwcGVhciBtdWx0aXBsZSB0aW1lcyBpbiBhIHRlbXBsYXRlIHN0cmluZyxcbiAgICAgICAgICAgICAgICAvLyBidXQgYWxsIGluc3RhbmNlcyBtdXN0IHNoYXJlIHRoZSBzYW1lIGxlbmd0aC5cbiAgICAgICAgICAgICAgICB0b2tlbkxlbmd0aDogdG9rZW4ubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgdHJ1bmNNZXRob2QgPSB0cnVuYyA/IE1hdGguZmxvb3IgOiBNYXRoLnJvdW5kO1xuICAgICAgICB2YXIgdHJ1bmNhdGUgPSBmdW5jdGlvbiAodmFsdWUsIHBsYWNlcykge1xuICAgICAgICAgICAgdmFyIGZhY3RvciA9IE1hdGgucG93KDEwLCBwbGFjZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydW5jTWV0aG9kKHZhbHVlICogZmFjdG9yKSAvIGZhY3RvcjtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZm91bmRGaXJzdCA9IGZhbHNlO1xuICAgICAgICB2YXIgYnViYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBmb3JtYXRWYWx1ZSA9IGZ1bmN0aW9uIChtb21lbnRUeXBlLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIGZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHVzZUdyb3VwaW5nLFxuICAgICAgICAgICAgICAgIGdyb3VwaW5nU2VwYXJhdG9yOiBncm91cGluZ1NlcGFyYXRvcixcbiAgICAgICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgICAgIGdyb3VwaW5nOiBncm91cGluZyxcbiAgICAgICAgICAgICAgICB1c2VUb0xvY2FsZVN0cmluZzogdXNlVG9Mb2NhbGVTdHJpbmdcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh1c2VTaWduaWZpY2FudERpZ2l0cykge1xuICAgICAgICAgICAgICAgIGlmIChzaWduaWZpY2FudERpZ2l0cyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUucmF3VmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLndob2xlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0T3B0aW9ucy5tYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgPSBzaWduaWZpY2FudERpZ2l0cztcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS5zaWduaWZpY2FudERpZ2l0cyA9IHNpZ25pZmljYW50RGlnaXRzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzTWF4VmFsdWUgJiYgIWJ1YmJsZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAobW9tZW50VHlwZS5pc0xhcmdlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS53aG9sZVZhbHVlID0gbWF4VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLndob2xlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNNaW5WYWx1ZSAmJiAhYnViYmxlZCkge1xuICAgICAgICAgICAgICAgIGlmIChtb21lbnRUeXBlLmlzU21hbGxlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS53aG9sZVZhbHVlID0gbWluVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLndob2xlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobW9tZW50VHlwZS5pc1NtYWxsZXN0IHx8IG1vbWVudFR5cGUuc2lnbmlmaWNhbnREaWdpdHMgJiYgbW9tZW50VHlwZS5zaWduaWZpY2FudERpZ2l0cyAtIG1vbWVudFR5cGUud2hvbGVWYWx1ZS50b1N0cmluZygpLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQXBwbHkgcHJlY2lzaW9uIHRvIGxlYXN0IHNpZ25pZmljYW50IHRva2VuIHZhbHVlLlxuICAgICAgICAgICAgICAgIGlmIChwcmVjaXNpb24gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSB0cnVuY2F0ZShtb21lbnRUeXBlLndob2xlVmFsdWUsIHByZWNpc2lvbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcmVjaXNpb24gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IHRydW5jTWV0aG9kKG1vbWVudFR5cGUud2hvbGVWYWx1ZSArIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBwcmVjaXNpb24gPiAwXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VTaWduaWZpY2FudERpZ2l0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRydW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IHRydW5jYXRlKG1vbWVudFR5cGUucmF3VmFsdWUsIHNpZ25pZmljYW50RGlnaXRzIC0gbW9tZW50VHlwZS53aG9sZVZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IG1vbWVudFR5cGUucmF3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb21lbnRUeXBlLndob2xlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduaWZpY2FudERpZ2l0cyAtPSBtb21lbnRUeXBlLndob2xlVmFsdWUudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRPcHRpb25zLmZyYWN0aW9uRGlnaXRzID0gcHJlY2lzaW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnZhbHVlID0gbW9tZW50VHlwZS53aG9sZVZhbHVlICsgdHJ1bmNhdGUobW9tZW50VHlwZS5kZWNpbWFsVmFsdWUsIHByZWNpc2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSBtb21lbnRUeXBlLndob2xlVmFsdWUgKyBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZVNpZ25pZmljYW50RGlnaXRzICYmIG1vbWVudFR5cGUud2hvbGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBPdXRlciBNYXRoLnJvdW5kIHJlcXVpcmVkIGhlcmUgdG8gaGFuZGxlIGZsb2F0aW5nIHBvaW50IGVycm9ycy5cbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IE1hdGgucm91bmQodHJ1bmNhdGUobW9tZW50VHlwZS53aG9sZVZhbHVlLCBtb21lbnRUeXBlLnNpZ25pZmljYW50RGlnaXRzIC0gbW9tZW50VHlwZS53aG9sZVZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2lnbmlmaWNhbnREaWdpdHMgLT0gbW9tZW50VHlwZS53aG9sZVZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSBtb21lbnRUeXBlLndob2xlVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobW9tZW50VHlwZS50b2tlbkxlbmd0aCA+IDEgJiYgKGZvcmNlTGVuZ3RoIHx8IGZvdW5kRmlyc3QpKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0T3B0aW9ucy5taW5pbXVtSW50ZWdlckRpZ2l0cyA9IG1vbWVudFR5cGUudG9rZW5MZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBpZiAoYnViYmxlZCAmJiBmb3JtYXRPcHRpb25zLm1heGltdW1TaWduaWZpY2FudERpZ2l0cyA8IG1vbWVudFR5cGUudG9rZW5MZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGZvcm1hdE9wdGlvbnMubWF4aW11bVNpZ25pZmljYW50RGlnaXRzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFmb3VuZEZpcnN0ICYmIChtb21lbnRUeXBlLnZhbHVlID4gMCB8fCB0cmltID09PSBcIlwiIC8qIHRyaW06IGZhbHNlICovIHx8IGZpbmQoc3RvcFRyaW0sIG1vbWVudFR5cGUudHlwZSkgfHwgZmluZChvdXRwdXRUeXBlcywgbW9tZW50VHlwZS50eXBlKSkpIHtcbiAgICAgICAgICAgICAgICBmb3VuZEZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZSA9IGZvcm1hdE51bWJlcihtb21lbnRUeXBlLnZhbHVlLCBmb3JtYXRPcHRpb25zLCB1c2VyTG9jYWxlKTtcblxuICAgICAgICAgICAgZm9ybWF0T3B0aW9ucy51c2VHcm91cGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgZm9ybWF0T3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yID0gXCIuXCI7XG4gICAgICAgICAgICBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlRW4gPSBmb3JtYXROdW1iZXIobW9tZW50VHlwZS52YWx1ZSwgZm9ybWF0T3B0aW9ucywgXCJlblwiKTtcblxuICAgICAgICAgICAgaWYgKG1vbWVudFR5cGUudG9rZW5MZW5ndGggPT09IDIgJiYgbW9tZW50VHlwZS50eXBlID09PSBcIm1pbGxpc2Vjb25kc1wiKSB7XG4gICAgICAgICAgICAgICAgbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZU1TID0gZm9ybWF0TnVtYmVyKG1vbWVudFR5cGUudmFsdWUsIHtcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bUludGVnZXJEaWdpdHM6IDMsXG4gICAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sIFwiZW5cIikuc2xpY2UoMCwgMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBmb3JtYXR0ZWQgdmFsdWVzLlxuICAgICAgICBtb21lbnRUeXBlcyA9IG1hcChtb21lbnRUeXBlcywgZm9ybWF0VmFsdWUpO1xuICAgICAgICBtb21lbnRUeXBlcyA9IGNvbXBhY3QobW9tZW50VHlwZXMpO1xuXG4gICAgICAgIC8vIEJ1YmJsZSByb3VuZGVkIHZhbHVlcy5cbiAgICAgICAgaWYgKG1vbWVudFR5cGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHZhciBmaW5kVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmQobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlLnR5cGUgPT09IHR5cGU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgYnViYmxlVHlwZXMgPSBmdW5jdGlvbiAoYnViYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ1YmJsZU1vbWVudFR5cGUgPSBmaW5kVHlwZShidWJibGUudHlwZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWJ1YmJsZU1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVhY2goYnViYmxlLnRhcmdldHMsIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldE1vbWVudFR5cGUgPSBmaW5kVHlwZSh0YXJnZXQudHlwZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXRNb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoYnViYmxlTW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZUVuLCAxMCkgPT09IHRhcmdldC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlTW9tZW50VHlwZS5yYXdWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVNb21lbnRUeXBlLndob2xlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlTW9tZW50VHlwZS5kZWNpbWFsVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TW9tZW50VHlwZS5yYXdWYWx1ZSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TW9tZW50VHlwZS53aG9sZVZhbHVlICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlRW4gPSB0YXJnZXRNb21lbnRUeXBlLndob2xlVmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBlYWNoKGJ1YmJsZXMsIGJ1YmJsZVR5cGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlY2FsY3VsYXRlIGZvcm1hdHRlZCB2YWx1ZXMuXG4gICAgICAgIGlmIChidWJibGVkKSB7XG4gICAgICAgICAgICBmb3VuZEZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICBzaWduaWZpY2FudERpZ2l0cyA9IHNpZ25pZmljYW50RGlnaXRzQ2FjaGU7XG4gICAgICAgICAgICBtb21lbnRUeXBlcyA9IG1hcChtb21lbnRUeXBlcywgZm9ybWF0VmFsdWUpO1xuICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBjb21wYWN0KG1vbWVudFR5cGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvdXRwdXRUeXBlcyAmJiAhKGlzTWF4VmFsdWUgJiYgIXNldHRpbmdzLnRyaW0pKSB7XG4gICAgICAgICAgICBtb21lbnRUeXBlcyA9IG1hcChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmluZChvdXRwdXRUeXBlcywgZnVuY3Rpb24gKG91dHB1dFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGUudHlwZSA9PT0gb3V0cHV0VHlwZTtcbiAgICAgICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb21lbnRUeXBlcyA9IGNvbXBhY3QobW9tZW50VHlwZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVHJpbSBMYXJnZS5cbiAgICAgICAgICAgIGlmICh0cmltTGFyZ2UpIHtcbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlcyA9IHJlc3QobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3AgdHJpbW1pbmcgb246XG4gICAgICAgICAgICAgICAgICAgIC8vIC0gdGhlIHNtYWxsZXN0IG1vbWVudCB0eXBlXG4gICAgICAgICAgICAgICAgICAgIC8vIC0gYSB0eXBlIG1hcmtlZCBmb3Igc3RvcFRyaW1cbiAgICAgICAgICAgICAgICAgICAgLy8gLSBhIHR5cGUgdGhhdCBoYXMgYSB3aG9sZSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIW1vbWVudFR5cGUuaXNTbWFsbGVzdCAmJiAhbW9tZW50VHlwZS53aG9sZVZhbHVlICYmICFmaW5kKHN0b3BUcmltLCBtb21lbnRUeXBlLnR5cGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBMYXJnZXN0LlxuICAgICAgICAgICAgaWYgKGxhcmdlc3QgJiYgbW9tZW50VHlwZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBtb21lbnRUeXBlcy5zbGljZSgwLCBsYXJnZXN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVHJpbSBTbWFsbC5cbiAgICAgICAgICAgIGlmICh0cmltU21hbGwgJiYgbW9tZW50VHlwZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIG1vbWVudFR5cGVzID0gaW5pdGlhbChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU3RvcCB0cmltbWluZyBvbjpcbiAgICAgICAgICAgICAgICAgICAgLy8gLSBhIHR5cGUgbWFya2VkIGZvciBzdG9wVHJpbVxuICAgICAgICAgICAgICAgICAgICAvLyAtIGEgdHlwZSB0aGF0IGhhcyBhIHdob2xlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIC8vIC0gdGhlIGxhcmdlc3QgbW9tZW50VHlwZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIW1vbWVudFR5cGUud2hvbGVWYWx1ZSAmJiAhZmluZChzdG9wVHJpbSwgbW9tZW50VHlwZS50eXBlKSAmJiAhbW9tZW50VHlwZS5pc0xhcmdlc3Q7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRyaW0gTWlkLlxuICAgICAgICAgICAgaWYgKHRyaW1NaWQpIHtcbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlcyA9IG1hcChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDAgJiYgaW5kZXggPCBtb21lbnRUeXBlcy5sZW5ndGggLSAxICYmICFtb21lbnRUeXBlLndob2xlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGU7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlcyA9IGNvbXBhY3QobW9tZW50VHlwZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUcmltIEZpbmFsLlxuICAgICAgICAgICAgaWYgKHRyaW1GaW5hbCAmJiBtb21lbnRUeXBlcy5sZW5ndGggPT09IDEgJiYgIW1vbWVudFR5cGVzWzBdLndob2xlVmFsdWUgJiYgISghdHJ1bmMgJiYgbW9tZW50VHlwZXNbMF0uaXNTbWFsbGVzdCAmJiBtb21lbnRUeXBlc1swXS5yYXdWYWx1ZSA8IG1pblZhbHVlKSkge1xuICAgICAgICAgICAgICAgIG1vbWVudFR5cGVzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmV0dXJuTW9tZW50VHlwZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvY2FsaXplIGFuZCBwbHVyYWxpemUgdW5pdCBsYWJlbHMuXG4gICAgICAgIGVhY2godG9rZW5zLCBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBtb21lbnRUb2tlbnNbdG9rZW4udHlwZV07XG5cbiAgICAgICAgICAgIHZhciBtb21lbnRUeXBlID0gZmluZChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZS50eXBlID09PSB0b2tlbi50eXBlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICgha2V5IHx8ICFtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZUVuLnNwbGl0KFwiLlwiKTtcblxuICAgICAgICAgICAgdmFsdWVzWzBdID0gcGFyc2VJbnQodmFsdWVzWzBdLCAxMCk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZXNbMV0pIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNbMV0gPSBwYXJzZUZsb2F0KFwiMC5cIiArIHZhbHVlc1sxXSwgMTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNbMV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcGx1cmFsS2V5ID0gbG9jYWxlRGF0YS5kdXJhdGlvblBsdXJhbEtleShrZXksIHZhbHVlc1swXSwgdmFsdWVzWzFdKTtcblxuICAgICAgICAgICAgdmFyIGxhYmVscyA9IGR1cmF0aW9uR2V0TGFiZWxzKGtleSwgbG9jYWxlRGF0YSk7XG5cbiAgICAgICAgICAgIHZhciBhdXRvTG9jYWxpemVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHZhciBwbHVyYWxpemVkTGFiZWxzID0ge307XG5cbiAgICAgICAgICAgIC8vIEF1dG8tTG9jYWxpemVkIHVuaXQgbGFiZWxzLlxuICAgICAgICAgICAgZWFjaChsb2NhbGVEYXRhLl9kdXJhdGlvbkxhYmVsVHlwZXMsIGZ1bmN0aW9uIChsYWJlbFR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSBmaW5kKGxhYmVscywgZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsYWJlbC50eXBlID09PSBsYWJlbFR5cGUudHlwZSAmJiBsYWJlbC5rZXkgPT09IHBsdXJhbEtleTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBwbHVyYWxpemVkTGFiZWxzW2xhYmVsLnR5cGVdID0gbGFiZWwubGFiZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZ0luY2x1ZGVzKHRva2VuLnRleHQsIGxhYmVsVHlwZS5zdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi50ZXh0ID0gdG9rZW4udGV4dC5yZXBsYWNlKGxhYmVsVHlwZS5zdHJpbmcsIGxhYmVsLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Mb2NhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEF1dG8tcGx1cmFsaXplZCB1bml0IGxhYmVscy5cbiAgICAgICAgICAgIGlmICh1c2VQbHVyYWwgJiYgIWF1dG9Mb2NhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICBsYWJlbHMuc29ydChkdXJhdGlvbkxhYmVsQ29tcGFyZSk7XG5cbiAgICAgICAgICAgICAgICBlYWNoKGxhYmVscywgZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVyYWxpemVkTGFiZWxzW2xhYmVsLnR5cGVdID09PSBsYWJlbC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZ0luY2x1ZGVzKHRva2VuLnRleHQsIGxhYmVsLmxhYmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0b3AgY2hlY2tpbmcgdGhpcyB0b2tlbiBpZiBpdHMgbGFiZWwgaXMgYWxyZWFkeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvcnJlY3RseSBwbHVyYWxpemVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCB0aGlzIGxhYmVsIGlmIGl0IGlzIGNvcnJlY3QsIGJ1dCBub3QgcHJlc2VudCBpblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHRva2VuJ3MgdGV4dC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmdJbmNsdWRlcyh0b2tlbi50ZXh0LCBsYWJlbC5sYWJlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlcGxlY2UgdGhpcyB0b2tlbidzIGxhYmVsIGFuZCBzdG9wIGNoZWNraW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4udGV4dCA9IHRva2VuLnRleHQucmVwbGFjZShsYWJlbC5sYWJlbCwgcGx1cmFsaXplZExhYmVsc1tsYWJlbC50eXBlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQnVpbGQgb3VwdHV0LlxuICAgICAgICB0b2tlbnMgPSBtYXAodG9rZW5zLCBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIGlmICghdG9rZW4udHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbi50ZXh0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbW9tZW50VHlwZSA9IGZpbmQobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGUudHlwZSA9PT0gdG9rZW4udHlwZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIW1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG91dCA9IFwiXCI7XG5cbiAgICAgICAgICAgIGlmICh1c2VMZWZ0VW5pdHMpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gdG9rZW4udGV4dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzTmVnYXRpdmUgJiYgaXNNYXhWYWx1ZSB8fCAhaXNOZWdhdGl2ZSAmJiBpc01pblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgb3V0ICs9IFwiPCBcIjtcbiAgICAgICAgICAgICAgICBpc01heFZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaXNNaW5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNOZWdhdGl2ZSAmJiBpc01pblZhbHVlIHx8ICFpc05lZ2F0aXZlICYmIGlzTWF4VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gXCI+IFwiO1xuICAgICAgICAgICAgICAgIGlzTWF4VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpc01pblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc05lZ2F0aXZlICYmIChtb21lbnRUeXBlLnZhbHVlID4gMCB8fCB0cmltID09PSBcIlwiIHx8IGZpbmQoc3RvcFRyaW0sIG1vbWVudFR5cGUudHlwZSkgfHwgZmluZChvdXRwdXRUeXBlcywgbW9tZW50VHlwZS50eXBlKSkpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gXCItXCI7XG4gICAgICAgICAgICAgICAgaXNOZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gXCJtaWxsaXNlY29uZHNcIiAmJiBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlTVMpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZU1TO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF1c2VMZWZ0VW5pdHMpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gdG9rZW4udGV4dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVHJpbSBsZWFkaW5nIGFuZCB0cmFpbGluZyBjb21tYSwgc3BhY2UsIGNvbG9uLCBhbmQgZG90LlxuICAgICAgICByZXR1cm4gdG9rZW5zLmpvaW4oXCJcIikucmVwbGFjZSgvKCx8IHw6fFxcLikqJC8sIFwiXCIpLnJlcGxhY2UoL14oLHwgfDp8XFwuKSovLCBcIlwiKTtcbiAgICB9XG5cbiAgICAvLyBkZWZhdWx0Rm9ybWF0VGVtcGxhdGVcbiAgICBmdW5jdGlvbiBkZWZhdWx0Rm9ybWF0VGVtcGxhdGUoKSB7XG4gICAgICAgIHZhciBkdXIgPSB0aGlzLmR1cmF0aW9uO1xuXG4gICAgICAgIHZhciBmaW5kVHlwZSA9IGZ1bmN0aW9uIGZpbmRUeXBlKHR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiBkdXIuX2RhdGFbdHlwZV07XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGZpcnN0VHlwZSA9IGZpbmQodGhpcy50eXBlcywgZmluZFR5cGUpO1xuXG4gICAgICAgIHZhciBsYXN0VHlwZSA9IGZpbmRMYXN0KHRoaXMudHlwZXMsIGZpbmRUeXBlKTtcblxuICAgICAgICAvLyBEZWZhdWx0IHRlbXBsYXRlIHN0cmluZ3MgZm9yIGVhY2ggZHVyYXRpb24gZGltZW5zaW9uIHR5cGUuXG4gICAgICAgIHN3aXRjaCAoZmlyc3RUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwibWlsbGlzZWNvbmRzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiUyBfX1wiO1xuICAgICAgICAgICAgY2FzZSBcInNlY29uZHNcIjogLy8gRmFsbHRocm91Z2guXG4gICAgICAgICAgICBjYXNlIFwibWludXRlc1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIipfTVNfXCI7XG4gICAgICAgICAgICBjYXNlIFwiaG91cnNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJfSE1TX1wiO1xuICAgICAgICAgICAgY2FzZSBcImRheXNcIjogLy8gUG9zc2libGUgRmFsbHRocm91Z2guXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0VHlwZSA9PT0gbGFzdFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZCBfX1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJ3ZWVrc1wiOlxuICAgICAgICAgICAgICAgIGlmIChmaXJzdFR5cGUgPT09IGxhc3RUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIncgX19cIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmltID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpbSA9IFwiYm90aFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBcIncgX18sIGQgX18sIGggX19cIjtcbiAgICAgICAgICAgIGNhc2UgXCJtb250aHNcIjogLy8gUG9zc2libGUgRmFsbHRocm91Z2guXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0VHlwZSA9PT0gbGFzdFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTSBfX1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJ5ZWFyc1wiOlxuICAgICAgICAgICAgICAgIGlmIChmaXJzdFR5cGUgPT09IGxhc3RUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInkgX19cIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmltID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpbSA9IFwiYm90aFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBcInkgX18sIE0gX18sIGQgX19cIjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaW0gPSBcImJvdGhcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ5IF9fLCBkIF9fLCBoIF9fLCBtIF9fLCBzIF9fXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbml0XG4gICAgZnVuY3Rpb24gaW5pdChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgdGhyb3cgXCJNb21lbnQgRHVyYXRpb24gRm9ybWF0IGluaXQgY2Fubm90IGZpbmQgbW9tZW50IGluc3RhbmNlLlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5kdXJhdGlvbi5mb3JtYXQgPSBkdXJhdGlvbnNGb3JtYXQ7XG4gICAgICAgIGNvbnRleHQuZHVyYXRpb24uZm4uZm9ybWF0ID0gZHVyYXRpb25Gb3JtYXQ7XG5cbiAgICAgICAgY29udGV4dC5kdXJhdGlvbi5mbi5mb3JtYXQuZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAvLyBNYW55IG9wdGlvbnMgYXJlIGRlZmF1bHRlZCB0byBgbnVsbGAgdG8gZGlzdGluZ3Vpc2ggYmV0d2VlblxuICAgICAgICAgICAgLy8gJ25vdCBzZXQnIGFuZCAnc2V0IHRvIGBmYWxzZWAnXG5cbiAgICAgICAgICAgIC8vIHRyaW1cbiAgICAgICAgICAgIC8vIENhbiBiZSBhIHN0cmluZywgYSBkZWxpbWl0ZWQgbGlzdCBvZiBzdHJpbmdzLCBhbiBhcnJheSBvZiBzdHJpbmdzLFxuICAgICAgICAgICAgLy8gb3IgYSBib29sZWFuLlxuICAgICAgICAgICAgLy8gXCJsYXJnZVwiIC0gd2lsbCB0cmltIGxhcmdlc3QtbWFnbml0dWRlIHplcm8tdmFsdWUgdG9rZW5zIHVudGlsXG4gICAgICAgICAgICAvLyBmaW5kaW5nIGEgdG9rZW4gd2l0aCBhIHZhbHVlLCBhIHRva2VuIGlkZW50aWZpZWQgYXMgJ3N0b3BUcmltJywgb3JcbiAgICAgICAgICAgIC8vIHRoZSBmaW5hbCB0b2tlbiBvZiB0aGUgZm9ybWF0IHN0cmluZy5cbiAgICAgICAgICAgIC8vIFwic21hbGxcIiAtIHdpbGwgdHJpbSBzbWFsbGVzdC1tYWduaXR1ZGUgemVyby12YWx1ZSB0b2tlbnMgdW50aWxcbiAgICAgICAgICAgIC8vIGZpbmRpbmcgYSB0b2tlbiB3aXRoIGEgdmFsdWUsIGEgdG9rZW4gaWRlbnRpZmllZCBhcyAnc3RvcFRyaW0nLCBvclxuICAgICAgICAgICAgLy8gdGhlIGZpbmFsIHRva2VuIG9mIHRoZSBmb3JtYXQgc3RyaW5nLlxuICAgICAgICAgICAgLy8gXCJib3RoXCIgLSB3aWxsIGV4ZWN1dGUgXCJsYXJnZVwiIHRyaW0gdGhlbiBcInNtYWxsXCIgdHJpbS5cbiAgICAgICAgICAgIC8vIFwibWlkXCIgLSB3aWxsIHRyaW0gYW55IHplcm8tdmFsdWUgdG9rZW5zIHRoYXQgYXJlIG5vdCB0aGUgZmlyc3Qgb3JcbiAgICAgICAgICAgIC8vIGxhc3QgdG9rZW5zLiBVc3VhbGx5IHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBcImxhcmdlXCIgb3IgXCJib3RoXCIuXG4gICAgICAgICAgICAvLyBlLmcuIFwibGFyZ2UgbWlkXCIgb3IgXCJib3RoIG1pZFwiLlxuICAgICAgICAgICAgLy8gXCJmaW5hbFwiIC0gd2lsbCB0cmltIHRoZSBmaW5hbCB0b2tlbiBpZiBpdCBpcyB6ZXJvLXZhbHVlLiBVc2UgdGhpc1xuICAgICAgICAgICAgLy8gb3B0aW9uIHdpdGggXCJsYXJnZVwiIG9yIFwiYm90aFwiIHRvIG91dHB1dCBhbiBlbXB0eSBzdHJpbmcgd2hlblxuICAgICAgICAgICAgLy8gZm9ybWF0dGluZyBhIHplcm8tdmFsdWUgZHVyYXRpb24uIGUuZy4gXCJsYXJnZSBmaW5hbFwiIG9yIFwiYm90aCBmaW5hbFwiLlxuICAgICAgICAgICAgLy8gXCJhbGxcIiAtIFdpbGwgdHJpbSBhbGwgemVyby12YWx1ZSB0b2tlbnMuIFNob3J0aGFuZCBmb3IgXCJib3RoIG1pZCBmaW5hbFwiLlxuICAgICAgICAgICAgLy8gXCJsZWZ0XCIgLSBtYXBzIHRvIFwibGFyZ2VcIiB0byBzdXBwb3J0IHBsdWdpbidzIHZlcnNpb24gMSBBUEkuXG4gICAgICAgICAgICAvLyBcInJpZ2h0XCIgLSBtYXBzIHRvIFwibGFyZ2VcIiB0byBzdXBwb3J0IHBsdWdpbidzIHZlcnNpb24gMSBBUEkuXG4gICAgICAgICAgICAvLyBgZmFsc2VgIC0gdGVtcGxhdGUgdG9rZW5zIGFyZSBub3QgdHJpbW1lZC5cbiAgICAgICAgICAgIC8vIGB0cnVlYCAtIHRyZWF0ZWQgYXMgXCJsYXJnZVwiLlxuICAgICAgICAgICAgLy8gYG51bGxgIC0gdHJlYXRlZCBhcyBcImxhcmdlXCIuXG4gICAgICAgICAgICB0cmltOiBudWxsLFxuXG4gICAgICAgICAgICAvLyBzdG9wVHJpbVxuICAgICAgICAgICAgLy8gQSBtb21lbnQgdG9rZW4gc3RyaW5nLCBhIGRlbGltaXRlZCBzZXQgb2YgbW9tZW50IHRva2VuIHN0cmluZ3MsXG4gICAgICAgICAgICAvLyBvciBhbiBhcnJheSBvZiBtb21lbnQgdG9rZW4gc3RyaW5ncy4gVHJpbW1pbmcgd2lsbCBzdG9wIHdoZW4gYSB0b2tlblxuICAgICAgICAgICAgLy8gbGlzdGVkIGluIHRoaXMgb3B0aW9uIGlzIHJlYWNoZWQuIEEgXCIqXCIgY2hhcmFjdGVyIGluIHRoZSBmb3JtYXRcbiAgICAgICAgICAgIC8vIHRlbXBsYXRlIHN0cmluZyB3aWxsIGFsc28gbWFyayBhIG1vbWVudCB0b2tlbiBhcyBzdG9wVHJpbS5cbiAgICAgICAgICAgIC8vIGUuZy4gXCJkIFtkYXlzXSAqaDptbTpzc1wiIHdpbGwgYWx3YXlzIHN0b3AgdHJpbW1pbmcgYXQgdGhlICdob3VycycgdG9rZW4uXG4gICAgICAgICAgICBzdG9wVHJpbTogbnVsbCxcblxuICAgICAgICAgICAgLy8gbGFyZ2VzdFxuICAgICAgICAgICAgLy8gU2V0IHRvIGEgcG9zaXRpdmUgaW50ZWdlciB0byBvdXRwdXQgb25seSB0aGUgXCJuXCIgbGFyZ2VzdC1tYWduaXR1ZGVcbiAgICAgICAgICAgIC8vIG1vbWVudCB0b2tlbnMgdGhhdCBoYXZlIGEgdmFsdWUuIEFsbCBsZXNzZXItbWFnbml0dWRlIG1vbWVudCB0b2tlbnNcbiAgICAgICAgICAgIC8vIHdpbGwgYmUgaWdub3JlZC4gVGhpcyBvcHRpb24gdGFrZXMgZWZmZWN0IGV2ZW4gaWYgYHRyaW1gIGlzIHNldFxuICAgICAgICAgICAgLy8gdG8gYGZhbHNlYC5cbiAgICAgICAgICAgIGxhcmdlc3Q6IG51bGwsXG5cbiAgICAgICAgICAgIC8vIG1heFZhbHVlXG4gICAgICAgICAgICAvLyBVc2UgYG1heFZhbHVlYCB0byByZW5kZXIgZ2VuZXJhbGl6ZWQgb3V0cHV0IGZvciBsYXJnZSBkdXJhdGlvbiB2YWx1ZXMsXG4gICAgICAgICAgICAvLyBlLmcuIGBcIj4gNjAgZGF5c1wiYC4gYG1heFZhbHVlYCBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciBhbmQgaXNcbiAgICAgICAgICAgIC8vLyBhcHBsaWVkIHRvIHRoZSBncmVhdGVzdC1tYWduaXR1ZGUgbW9tZW50IHRva2VuIGluIHRoZSBmb3JtYXQgdGVtcGxhdGUuXG4gICAgICAgICAgICBtYXhWYWx1ZTogbnVsbCxcblxuICAgICAgICAgICAgLy8gbWluVmFsdWVcbiAgICAgICAgICAgIC8vIFVzZSBgbWluVmFsdWVgIHRvIHJlbmRlciBnZW5lcmFsaXplZCBvdXRwdXQgZm9yIHNtYWxsIGR1cmF0aW9uIHZhbHVlcyxcbiAgICAgICAgICAgIC8vIGUuZy4gYFwiPCA1IG1pbnV0ZXNcImAuIGBtaW5WYWx1ZWAgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIgYW5kIGlzXG4gICAgICAgICAgICAvLyBhcHBsaWVkIHRvIHRoZSBsZWFzdC1tYWduaXR1ZGUgbW9tZW50IHRva2VuIGluIHRoZSBmb3JtYXQgdGVtcGxhdGUuXG4gICAgICAgICAgICBtaW5WYWx1ZTogbnVsbCxcblxuICAgICAgICAgICAgLy8gcHJlY2lzaW9uXG4gICAgICAgICAgICAvLyBJZiBhIHBvc2l0aXZlIGludGVnZXIsIG51bWJlciBvZiBkZWNpbWFsIGZyYWN0aW9uIGRpZ2l0cyB0byByZW5kZXIuXG4gICAgICAgICAgICAvLyBJZiBhIG5lZ2F0aXZlIGludGVnZXIsIG51bWJlciBvZiBpbnRlZ2VyIHBsYWNlIGRpZ2l0cyB0byB0cnVuY2F0ZSB0byAwLlxuICAgICAgICAgICAgLy8gSWYgYHVzZVNpZ25pZmljYW50RGlnaXRzYCBpcyBzZXQgdG8gYHRydWVgIGFuZCBgcHJlY2lzaW9uYCBpcyBhIHBvc2l0aXZlXG4gICAgICAgICAgICAvLyBpbnRlZ2VyLCBzZXRzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHMgdXNlZCBpbiB0aGVcbiAgICAgICAgICAgIC8vIGZvcm1hdHRlZCBvdXRwdXQuXG4gICAgICAgICAgICBwcmVjaXNpb246IDAsXG5cbiAgICAgICAgICAgIC8vIHRydW5jXG4gICAgICAgICAgICAvLyBEZWZhdWx0IGJlaGF2aW9yIHJvdW5kcyBmaW5hbCB0b2tlbiB2YWx1ZS4gU2V0IHRvIGB0cnVlYCB0b1xuICAgICAgICAgICAgLy8gdHJ1bmNhdGUgZmluYWwgdG9rZW4gdmFsdWUsIHdoaWNoIHdhcyB0aGUgZGVmYXVsdCBiZWhhdmlvciBpblxuICAgICAgICAgICAgLy8gdmVyc2lvbiAxIG9mIHRoaXMgcGx1Z2luLlxuICAgICAgICAgICAgdHJ1bmM6IGZhbHNlLFxuXG4gICAgICAgICAgICAvLyBmb3JjZUxlbmd0aFxuICAgICAgICAgICAgLy8gRm9yY2UgZmlyc3QgbW9tZW50IHRva2VuIHdpdGggYSB2YWx1ZSB0byByZW5kZXIgYXQgZnVsbCBsZW5ndGhcbiAgICAgICAgICAgIC8vIGV2ZW4gd2hlbiB0ZW1wbGF0ZSBpcyB0cmltbWVkIGFuZCBmaXJzdCBtb21lbnQgdG9rZW4gaGFzIGxlbmd0aCBvZiAxLlxuICAgICAgICAgICAgZm9yY2VMZW5ndGg6IG51bGwsXG5cbiAgICAgICAgICAgIC8vIHVzZXJMb2NhbGVcbiAgICAgICAgICAgIC8vIEZvcm1hdHRlZCBudW1lcmljYWwgb3V0cHV0IGlzIHJlbmRlcmVkIHVzaW5nIGB0b0xvY2FsZVN0cmluZ2BcbiAgICAgICAgICAgIC8vIGFuZCB0aGUgbG9jYWxlIG9mIHRoZSB1c2VyJ3MgZW52aXJvbm1lbnQuIFNldCB0aGlzIG9wdGlvbiB0byByZW5kZXJcbiAgICAgICAgICAgIC8vIG51bWVyaWNhbCBvdXRwdXQgdXNpbmcgYSBkaWZmZXJlbnQgbG9jYWxlLiBVbml0IG5hbWVzIGFyZSByZW5kZXJlZFxuICAgICAgICAgICAgLy8gYW5kIGRldGVjdGVkIHVzaW5nIHRoZSBsb2NhbGUgc2V0IGluIG1vbWVudC5qcywgd2hpY2ggY2FuIGJlIGRpZmZlcmVudFxuICAgICAgICAgICAgLy8gZnJvbSB0aGUgbG9jYWxlIG9mIHVzZXIncyBlbnZpcm9ubWVudC5cbiAgICAgICAgICAgIHVzZXJMb2NhbGU6IG51bGwsXG5cbiAgICAgICAgICAgIC8vIHVzZVBsdXJhbFxuICAgICAgICAgICAgLy8gV2lsbCBhdXRvbWF0aWNhbGx5IHNpbmd1bGFyaXplIG9yIHBsdXJhbGl6ZSB1bml0IG5hbWVzIHdoZW4gdGhleVxuICAgICAgICAgICAgLy8gYXBwZWFyIGluIHRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCBlYWNoIG1vbWVudCB0b2tlbi4gU3RhbmRhcmQgYW5kXG4gICAgICAgICAgICAvLyBzaG9ydCB1bml0IGxhYmVscyBhcmUgc2luZ3VsYXJpemVkIGFuZCBwbHVyYWxpemVkLCBiYXNlZCBvbiBsb2NhbGUuXG4gICAgICAgICAgICAvLyBlLmcuIGluIGVuZ2xpc2gsIFwiMSBzZWNvbmRcIiBvciBcIjEgc2VjXCIgd291bGQgYmUgcmVuZGVyZWQgaW5zdGVhZFxuICAgICAgICAgICAgLy8gb2YgXCIxIHNlY29uZHNcIiBvciBcIjEgc2Vjc1wiLiBUaGUgZGVmYXVsdCBwbHVyYWxpemF0aW9uIGZ1bmN0aW9uXG4gICAgICAgICAgICAvLyByZW5kZXJzIGEgcGx1cmFsIGxhYmVsIGZvciBhIHZhbHVlIHdpdGggZGVjaW1hbCBwcmVjaXNpb24uXG4gICAgICAgICAgICAvLyBlLmcuIFwiMS4wIHNlY29uZHNcIiBpcyBuZXZlciByZW5kZXJlZCBhcyBcIjEuMCBzZWNvbmRcIi5cbiAgICAgICAgICAgIC8vIExhYmVsIHR5cGVzIGFuZCBwbHVyYWxpemF0aW9uIGZ1bmN0aW9uIGFyZSBjb25maWd1cmFibGUgaW4gdGhlXG4gICAgICAgICAgICAvLyBsb2NhbGVEYXRhIGV4dGVuc2lvbnMuXG4gICAgICAgICAgICB1c2VQbHVyYWw6IHRydWUsXG5cbiAgICAgICAgICAgIC8vIHVzZUxlZnRVbml0c1xuICAgICAgICAgICAgLy8gVGhlIHRleHQgdG8gdGhlIHJpZ2h0IG9mIGVhY2ggbW9tZW50IHRva2VuIGluIGEgZm9ybWF0IHN0cmluZ1xuICAgICAgICAgICAgLy8gaXMgdHJlYXRlZCBhcyB0aGF0IHRva2VuJ3MgdW5pdHMgZm9yIHRoZSBwdXJwb3NlcyBvZiB0cmltbWluZyxcbiAgICAgICAgICAgIC8vIHNpbmd1bGFyaXppbmcsIGFuZCBhdXRvLWxvY2FsaXppbmcuXG4gICAgICAgICAgICAvLyBlLmcuIFwiaCBbaG91cnNdLCBtIFttaW51dGVzXSwgcyBbc2Vjb25kc11cIi5cbiAgICAgICAgICAgIC8vIFRvIHByb3Blcmx5IHNpbmd1bGFyaXplIG9yIGxvY2FsaXplIGEgZm9ybWF0IHN0cmluZyBzdWNoIGFzXG4gICAgICAgICAgICAvLyBcIltob3Vyc10gaCwgW21pbnV0ZXNdIG0sIFtzZWNvbmRzXSBzXCIsIHdoZXJlIHRoZSB1bml0cyBhcHBlYXJcbiAgICAgICAgICAgIC8vIHRvIHRoZSBsZWZ0IG9mIGVhY2ggbW9tZW50IHRva2VuLCBzZXQgdXNlTGVmdFVuaXRzIHRvIGB0cnVlYC5cbiAgICAgICAgICAgIC8vIFRoaXMgcGx1Z2luIGlzIG5vdCB0ZXN0ZWQgaW4gdGhlIGNvbnRleHQgb2YgcnRsIHRleHQuXG4gICAgICAgICAgICB1c2VMZWZ0VW5pdHM6IGZhbHNlLFxuXG4gICAgICAgICAgICAvLyB1c2VHcm91cGluZ1xuICAgICAgICAgICAgLy8gRW5hYmxlcyBsb2NhbGUtYmFzZWQgZGlnaXQgZ3JvdXBpbmcgaW4gdGhlIGZvcm1hdHRlZCBvdXRwdXQuIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9OdW1iZXIvdG9Mb2NhbGVTdHJpbmdcbiAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuXG4gICAgICAgICAgICAvLyB1c2VTaWduaWZpY2FudERpZ2l0c1xuICAgICAgICAgICAgLy8gVHJlYXQgdGhlIGBwcmVjaXNpb25gIG9wdGlvbiBhcyB0aGUgbWF4aW11bSBzaWduaWZpY2FudCBkaWdpdHNcbiAgICAgICAgICAgIC8vIHRvIGJlIHJlbmRlcmVkLiBQcmVjaXNpb24gbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIuIFNpZ25pZmljYW50XG4gICAgICAgICAgICAvLyBkaWdpdHMgZXh0ZW5kIGFjcm9zcyB1bml0IHR5cGVzLFxuICAgICAgICAgICAgLy8gZS5nLiBcIjYgaG91cnMgMzcuNSBtaW51dGVzXCIgcmVwcmVzZW50cyA0IHNpZ25pZmljYW50IGRpZ2l0cy5cbiAgICAgICAgICAgIC8vIEVuYWJsaW5nIHRoaXMgb3B0aW9uIGNhdXNlcyB0b2tlbiBsZW5ndGggdG8gYmUgaWdub3JlZC4gU2VlICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9OdW1iZXIvdG9Mb2NhbGVTdHJpbmdcbiAgICAgICAgICAgIHVzZVNpZ25pZmljYW50RGlnaXRzOiBmYWxzZSxcblxuICAgICAgICAgICAgLy8gdGVtcGxhdGVcbiAgICAgICAgICAgIC8vIFRoZSB0ZW1wbGF0ZSBzdHJpbmcgdXNlZCB0byBmb3JtYXQgdGhlIGR1cmF0aW9uLiBNYXkgYmUgYSBmdW5jdGlvblxuICAgICAgICAgICAgLy8gb3IgYSBzdHJpbmcuIFRlbXBsYXRlIGZ1bmN0aW9ucyBhcmUgZXhlY3V0ZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmdcbiAgICAgICAgICAgIC8vIG9mIHRoZSBzZXR0aW5ncyBvYmplY3Qgc28gdGhhdCB0ZW1wbGF0ZSBzdHJpbmdzIG1heSBiZSBkeW5hbWljYWxseVxuICAgICAgICAgICAgLy8gZ2VuZXJhdGVkIGJhc2VkIG9uIHRoZSBkdXJhdGlvbiBvYmplY3QgKGFjY2Vzc2libGUgdmlhIGB0aGlzLmR1cmF0aW9uYClcbiAgICAgICAgICAgIC8vIG9yIGFueSBvZiB0aGUgb3RoZXIgc2V0dGluZ3MuIExlYWRpbmcgYW5kIHRyYWlsaW5nIHNwYWNlLCBjb21tYSxcbiAgICAgICAgICAgIC8vIHBlcmlvZCwgYW5kIGNvbG9uIGNoYXJhY3RlcnMgYXJlIHRyaW1tZWQgZnJvbSB0aGUgcmVzdWx0aW5nIHN0cmluZy5cbiAgICAgICAgICAgIHRlbXBsYXRlOiBkZWZhdWx0Rm9ybWF0VGVtcGxhdGUsXG5cbiAgICAgICAgICAgIC8vIHVzZVRvTG9jYWxlU3RyaW5nXG4gICAgICAgICAgICAvLyBTZXQgdGhpcyBvcHRpb24gdG8gYGZhbHNlYCB0byBpZ25vcmUgdGhlIGB0b0xvY2FsZVN0cmluZ2AgZmVhdHVyZVxuICAgICAgICAgICAgLy8gdGVzdCBhbmQgZm9yY2UgdGhlIHVzZSBvZiB0aGUgYGZvcm1hdE51bWJlcmAgZmFsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgICAgIC8vIGluY2x1ZGVkIGluIHRoaXMgcGx1Z2luLlxuICAgICAgICAgICAgdXNlVG9Mb2NhbGVTdHJpbmc6IHRydWUsXG5cbiAgICAgICAgICAgIC8vIGZvcm1hdE51bWJlciBmYWxsYmFjayBvcHRpb25zLlxuICAgICAgICAgICAgLy8gV2hlbiBgdG9Mb2NhbGVTdHJpbmdgIGlzIGRldGVjdGVkIGFuZCBwYXNzZXMgdGhlIGZlYXR1cmUgdGVzdCwgdGhlXG4gICAgICAgICAgICAvLyBmb2xsb3dpbmcgb3B0aW9ucyB3aWxsIGhhdmUgbm8gZWZmZWN0OiBgdG9Mb2NhbGVTdHJpbmdgIHdpbGwgYmUgdXNlZFxuICAgICAgICAgICAgLy8gZm9yIGZvcm1hdHRpbmcgYW5kIHRoZSBncm91cGluZyBzZXBhcmF0b3IsIGRlY2ltYWwgc2VwYXJhdG9yLCBhbmRcbiAgICAgICAgICAgIC8vIGludGVnZXIgZGlnaXQgZ3JvdXBpbmcgd2lsbCBiZSBkZXRlcm1pbmVkIGJ5IHRoZSB1c2VyIGxvY2FsZS5cblxuICAgICAgICAgICAgLy8gZ3JvdXBpbmdTZXBhcmF0b3JcbiAgICAgICAgICAgIC8vIFRoZSBpbnRlZ2VyIGRpZ2l0IGdyb3VwaW5nIHNlcGFyYXRvciB1c2VkIHdoZW4gdXNpbmcgdGhlIGZhbGxiYWNrXG4gICAgICAgICAgICAvLyBmb3JtYXROdW1iZXIgZnVuY3Rpb24uXG4gICAgICAgICAgICBncm91cGluZ1NlcGFyYXRvcjogXCIsXCIsXG5cbiAgICAgICAgICAgIC8vIGRlY2ltYWxTZXBhcmF0b3JcbiAgICAgICAgICAgIC8vIFRoZSBkZWNpbWFsIHNlcGFyYXRvciB1c2VkIHdoZW4gdXNpbmcgdGhlIGZhbGxiYWNrIGZvcm1hdE51bWJlclxuICAgICAgICAgICAgLy8gZnVuY3Rpb24uXG4gICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBcIi5cIixcblxuICAgICAgICAgICAgLy8gZ3JvdXBpbmdcbiAgICAgICAgICAgIC8vIFRoZSBpbnRlZ2VyIGRpZ2l0IGdyb3VwaW5nIHVzZWQgd2hlbiB1c2luZyB0aGUgZmFsbGJhY2sgZm9ybWF0TnVtYmVyXG4gICAgICAgICAgICAvLyBmdW5jdGlvbi4gTXVzdCBiZSBhbiBhcnJheS4gVGhlIGRlZmF1bHQgdmFsdWUgb2YgYFszXWAgZ2l2ZXMgdGhlXG4gICAgICAgICAgICAvLyBzdGFuZGFyZCAzLWRpZ2l0IHRob3VzYW5kL21pbGxpb24vYmlsbGlvbiBkaWdpdCBncm91cGluZ3MgZm9yIHRoZVxuICAgICAgICAgICAgLy8gXCJlblwiIGxvY2FsZS4gU2V0dGluZyB0aGlzIG9wdGlvbiB0byBgWzMsIDJdYCB3b3VsZCBnZW5lcmF0ZSB0aGVcbiAgICAgICAgICAgIC8vIHRob3VzYW5kL2xha2gvY3JvcmUgZGlnaXQgZ3JvdXBpbmdzIHVzZWQgaW4gdGhlIFwiZW4tSU5cIiBsb2NhbGUuXG4gICAgICAgICAgICBncm91cGluZzogWzNdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29udGV4dC51cGRhdGVMb2NhbGUoJ2VuJywgZW5nTG9jYWxlKTtcbiAgICB9XG5cbiAgICAvLyBSdW4gZmVhdHVyZSB0ZXN0cyBmb3IgYE51bWJlciN0b0xvY2FsZVN0cmluZ2AuXG4gICAgdmFyIHRvTG9jYWxlU3RyaW5nRm9ybWF0dGVyID0gZnVuY3Rpb24obnVtYmVyLCBsb2NhbGUsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG51bWJlci50b0xvY2FsZVN0cmluZyhsb2NhbGUsIG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICB0b0xvY2FsZVN0cmluZ1dvcmtzID0gdG9Mb2NhbGVTdHJpbmdTdXBwb3J0c0xvY2FsZXMoKSAmJiBmZWF0dXJlVGVzdEZvcm1hdHRlcih0b0xvY2FsZVN0cmluZ0Zvcm1hdHRlcik7XG4gICAgdG9Mb2NhbGVTdHJpbmdSb3VuZGluZ1dvcmtzID0gdG9Mb2NhbGVTdHJpbmdXb3JrcyAmJiBmZWF0dXJlVGVzdEZvcm1hdHRlclJvdW5kaW5nKHRvTG9jYWxlU3RyaW5nRm9ybWF0dGVyKTtcblxuICAgIC8vIFJ1biBmZWF0dXJlIHRlc3RzIGZvciBgSW50bC5OdW1iZXJGb3JtYXQjZm9ybWF0YC5cbiAgICB2YXIgaW50bE51bWJlckZvcm1hdEZvcm1hdHRlciA9IGZ1bmN0aW9uKG51bWJlciwgbG9jYWxlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgJiYgd2luZG93LkludGwgJiYgd2luZG93LkludGwuTnVtYmVyRm9ybWF0KSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LkludGwuTnVtYmVyRm9ybWF0KGxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KG51bWJlcik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaW50bE51bWJlckZvcm1hdFdvcmtzID0gZmVhdHVyZVRlc3RGb3JtYXR0ZXIoaW50bE51bWJlckZvcm1hdEZvcm1hdHRlcik7XG4gICAgaW50bE51bWJlckZvcm1hdFJvdW5kaW5nV29ya3MgPSBpbnRsTnVtYmVyRm9ybWF0V29ya3MgJiYgZmVhdHVyZVRlc3RGb3JtYXR0ZXJSb3VuZGluZyhpbnRsTnVtYmVyRm9ybWF0Rm9ybWF0dGVyKTtcblxuICAgIC8vIEluaXRpYWxpemUgZHVyYXRpb24gZm9ybWF0IG9uIHRoZSBnbG9iYWwgbW9tZW50IGluc3RhbmNlLlxuICAgIGluaXQobW9tZW50KTtcblxuICAgIC8vIFJldHVybiB0aGUgaW5pdCBmdW5jdGlvbiBzbyB0aGF0IGR1cmF0aW9uIGZvcm1hdCBjYW4gYmVcbiAgICAvLyBpbml0aWFsaXplZCBvbiBvdGhlciBtb21lbnQgaW5zdGFuY2VzLlxuICAgIHJldHVybiBpbml0O1xufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xuXG52YXIgd2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChfX0RFVl9fKSB7XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAxID8gbGVuIC0gMSA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDE7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMV0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICtcbiAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9XG5cbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgK1xuICAgICAgICAgICdtZXNzYWdlIGFyZ3VtZW50J1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHByaW50V2FybmluZy5hcHBseShudWxsLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcImhlbHBlcnNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsaWRhdG9yc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIndwXCJdW1wiaXNTaGFsbG93RXF1YWxcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJsb2Rhc2hcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJtb21lbnRcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmVuZG9yXCJdW1wibW9tZW50XCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
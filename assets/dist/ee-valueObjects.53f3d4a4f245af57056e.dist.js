var eejs = typeof eejs === "object" ? eejs : {}; eejs["valueObjects"] =
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
      return Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_5__["instanceOf"])(datetime, 'DateTime');
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

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ServerDateTime", function() { return _datetime__WEBPACK_IMPORTED_MODULE_0__["default"]; });





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
    // `useToLocaleString` will use `toLocaleString` for formatting.
    // `userLocale` option is passed through to `toLocaleString`.
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

            if (!toLocaleStringRoundingWorks) {
                var roundingOptions = extend({}, options);
                roundingOptions.useGrouping = false;
                roundingOptions.decimalSeparator = ".";
                number = parseFloat(formatNumber(number, roundingOptions), 10);
            }

            return number.toLocaleString(userLocale, localeStringOptions);
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

    function featureTestToLocaleStringRounding() {
        return (3.55).toLocaleString("en", {
            useGrouping: false,
            minimumIntegerDigits: 1,
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }) === "3.6";
    }

    function featureTestToLocaleString() {
        var passed = true;

        // Test locale.
        passed = passed && toLocaleStringSupportsLocales();
        if (!passed) { return false; }

        // Test minimumIntegerDigits.
        passed = passed && (1).toLocaleString("en", { minimumIntegerDigits: 1 }) === "1";
        passed = passed && (1).toLocaleString("en", { minimumIntegerDigits: 2 }) === "01";
        passed = passed && (1).toLocaleString("en", { minimumIntegerDigits: 3 }) === "001";
        if (!passed) { return false; }

        // Test maximumFractionDigits and minimumFractionDigits.
        passed = passed && (99.99).toLocaleString("en", { maximumFractionDigits: 0, minimumFractionDigits: 0 }) === "100";
        passed = passed && (99.99).toLocaleString("en", { maximumFractionDigits: 1, minimumFractionDigits: 1 }) === "100.0";
        passed = passed && (99.99).toLocaleString("en", { maximumFractionDigits: 2, minimumFractionDigits: 2 }) === "99.99";
        passed = passed && (99.99).toLocaleString("en", { maximumFractionDigits: 3, minimumFractionDigits: 3 }) === "99.990";
        if (!passed) { return false; }

        // Test maximumSignificantDigits.
        passed = passed && (99.99).toLocaleString("en", { maximumSignificantDigits: 1 }) === "100";
        passed = passed && (99.99).toLocaleString("en", { maximumSignificantDigits: 2 }) === "100";
        passed = passed && (99.99).toLocaleString("en", { maximumSignificantDigits: 3 }) === "100";
        passed = passed && (99.99).toLocaleString("en", { maximumSignificantDigits: 4 }) === "99.99";
        passed = passed && (99.99).toLocaleString("en", { maximumSignificantDigits: 5 }) === "99.99";
        if (!passed) { return false; }

        // Test grouping.
        passed = passed && (1000).toLocaleString("en", { useGrouping: true }) === "1,000";
        passed = passed && (1000).toLocaleString("en", { useGrouping: false }) === "1000";
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

        useToLocaleString = useToLocaleString && toLocaleStringWorks;

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
    toLocaleStringWorks = featureTestToLocaleString();
    toLocaleStringRoundingWorks = toLocaleStringWorks && featureTestToLocaleStringRounding();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLltuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvdm8vY3VycmVuY3kuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL3ZvL2RhdGUtdGltZS9hc3NlcnRpb25zLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy92by9kYXRlLXRpbWUvZGF0ZXRpbWUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL3ZvL2RhdGUtdGltZS9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvdm8vZGF0ZS10aW1lL2R1cmF0aW9uLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy92by9kYXRlLXRpbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL3ZvL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy92by9sYWJlbC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvdm8vbW9uZXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9vYmplY3RTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvYWNjb3VudGluZy1qcy9kaXN0L2FjY291bnRpbmcudW1kLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2RlY2ltYWwuanMtbGlnaHQvZGVjaW1hbC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9tb21lbnQtZHVyYXRpb24tZm9ybWF0L2xpYi9tb21lbnQtZHVyYXRpb24tZm9ybWF0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvd2FybmluZy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcImhlbHBlcnNcIl19Iiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJ2YWxpZGF0b3JzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImlzU2hhbGxvd0VxdWFsXCJdfSIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwge1widGhpc1wiOlwibW9tZW50XCJ9Iiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJ2ZW5kb3JcIixcIm1vbWVudFwiXX0iXSwibmFtZXMiOlsiQ3VycmVuY3kiLCJjdXJyZW5jeUNvbmZpZyIsInZhbGlkYXRlQ3VycmVuY3lDb25maWciLCJjb2RlIiwic2luZ3VsYXJMYWJlbCIsInBsdXJhbExhYmVsIiwic2lnbiIsInNpZ25CNCIsImlzVW5kZWZpbmVkIiwiZGVjaW1hbFBsYWNlcyIsImRlY2ltYWxNYXJrIiwidGhvdXNhbmRzU2VwYXJhdG9yIiwic3VidW5pdHMiLCJNYXRoIiwicG93IiwiT2JqZWN0IiwiZnJlZXplIiwiZGVjaW1hbEluZm8iLCJkZWNpbWFsIiwidGhvdXNhbmQiLCJwcmVjaXNpb24iLCJjdXJyZW5jeSIsInN5bWJvbCIsImZvcm1hdCIsInBvcyIsIm5lZyIsInplcm8iLCJudW1iZXIiLCJjb25maWciLCJpc0VtcHR5IiwiRXhjZXB0aW9uIiwiaXNTdHJpbmciLCJUeXBlRXJyb3IiLCJpc0Jvb2xlYW4iLCJpc051bWJlciIsIlNpdGVDdXJyZW5jeSIsImUiLCJ3YXJuaW5nIiwibWVzc2FnZSIsIkNVUlJFTkNZX0NPTkZJRyIsInZhbGlkYXRlTG9jYWxlIiwibG9jYWxlIiwib3JpZ2luYWxMb2NhbGUiLCJtb21lbnQiLCJ2YWxpZGF0aW9uTG9jYWxlIiwiYXNzZXJ0TG9jYWxlSXNWYWxpZCIsIkludmFsaWRMb2NhbGUiLCJ2YWxpZGF0ZUlTTzg2MDEiLCJkYXRlVGltZVN0cmluZyIsImlzRHVyYXRpb24iLCJyZWdleCIsInRlc3QiLCJhc3NlcnRJU084NjAxSXNWYWxpZCIsIkludmFsaWRJU084NjAxU3RyaW5nIiwidmFsaWRhdGVUaW1lem9uZSIsInRpbWV6b25lIiwiZHQiLCJ0eiIsInpvbmUiLCJhc3NlcnRUaW1lem9uZUlzVmFsaWQiLCJJbnZhbGlkVGltZXpvbmUiLCJ2YWxpZGF0ZUlzRGF0ZSIsImRhdGUiLCJEYXRlIiwiYXNzZXJ0SXNEYXRlIiwidmFsaWRhdGVJc09mZnNldCIsIm9mZnNldCIsImFzc2VydElzT2Zmc2V0IiwicHJpdmF0ZVByb3BlcnRpZXMiLCJkYXRldGltZSIsIlN5bWJvbCIsInByaXZhdGVNZXRob2RzIiwiZ2V0VW5pdE5hbWVzIiwiY3JlYXRlR2V0dGVyc0FuZFNldHRlcnMiLCJleHRyYWN0TW9tZW50c0Zyb21EYXRlVGltZXMiLCJub3JtYWxpemVVbml0TmFtZSIsIm5vcm1hbGl6ZVVuaXRPYmplY3QiLCJub3JtYWxpemVVbml0VmFsdWUiLCJ2YWxpZERhdGVUaW1lVW5pdHMiLCJEYXRlVGltZSIsImlzbzg2MDFEYXRlU3RyaW5nIiwiREVGQVVMVF9USU1FWk9ORV9TVFJJTkciLCJERUZBVUxUX1ZBTElEX0xPQ0FMRSIsInV0YyIsInV0Y09mZnNldCIsIlRJTUVaT05FX0xPQ0FMIiwiZm9yRWFjaCIsInVuaXROYW1lIiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJtZXRob2ROYW1lIiwidW5pdFZhbHVlIiwiY2FwaXRhbGl6ZSIsInZhbHVlIiwic2V0Iiwic2V0T2JqZWN0IiwiY2xvbmUiLCJ0b0lTT1N0cmluZyIsImZyb21Nb21lbnQiLCJpc1ZhbGlkIiwib3RoZXJEYXRlVGltZSIsImFzc2VydElzRGF0ZVRpbWUiLCJEdXJhdGlvbiIsImR1cmF0aW9uIiwiZGlmZiIsInVuaXQiLCJlbmRPZiIsImlzU2FtZSIsImFzc2VydElzVmFsaWREdXJhdGlvbiIsInN1YnRyYWN0IiwidG9PYmplY3QiLCJhZGQiLCJzdGFydE9mIiwiREVGQVVMVF9GT1JNQVQiLCJpblVUQyIsInRvRGF0ZSIsImxvY2FsIiwidmFsdWVPZiIsInJlZHVjZSIsInJlc3VsdCIsImtleSIsInRvU3RyaW5nIiwiZGF5c0luTW9udGgiLCJpc0RTVCIsImlzTGVhcFllYXIiLCJkYXlPZlllYXIiLCJxdWFydGVyIiwiaXNvV2VlayIsImlzb1dlZWtZZWFyIiwiaXNvV2Vla2RheSIsImlzb1dlZWtzSW5ZZWFyIiwiYXNzZXJ0aW9ucyIsImluc3RhbmNlT2YiLCJ2YWxpZGF0ZUlzRGF0ZVRpbWUiLCJJbnZhbGlkRGF0ZVRpbWUiLCJkYXRldGltZXMiLCJtYXAiLCJtYXgiLCJtaW4iLCJtb21lbnRJbnN0YW5jZSIsImlzTW9tZW50IiwiaXNGdW5jdGlvbiIsIklTT1N0cmluZyIsIkRFRkFVTFRfT0ZGU0VUIiwibWlsbGlzZWNvbmRzIiwic2Vjb25kcyIsInVuaXgiLCJ2YWx1ZXMiLCJJbnZhbGlkQXJndW1lbnQiLCJ2YWx1ZXNGb3JDb25zdHJ1Y3QiLCJvbWl0IiwiZnJvbUxvY2FsIiwibmFtZVRvTm9ybWFsaXplIiwiZGF5IiwiZGF5cyIsInllYXJzIiwibW9udGhzIiwibWludXRlcyIsImhvdXJzIiwiaXNPYmplY3QiLCJVTklUX1lFQVIiLCJVTklUX01PTlRIIiwiVU5JVF9EQVkiLCJVTklUX0hPVVIiLCJVTklUX01JTlVURSIsIlVOSVRfU0VDT05EIiwiVU5JVF9NSUxMSVNFQ09ORCIsIlRJTUVaT05FX0NPTkZJRyIsInN0cmluZyIsIkhBU19USU1FWk9ORV9TVFJJTkciLCJGT1JNQVRfU0lURV9EQVRFIiwiRk9STUFUX1NJVEVfVElNRSIsIkRFRkFVTFRfTE9DQUxFIiwic25ha2VDYXNlIiwiU0VSVkVSX0xPQ0FMRSIsInVzZXIiLCJtb21lbnREdXJhdGlvbkZvcm1hdFNldHVwIiwiZHVyYXRpb25WYWx1ZXMiLCJjcmVhdGVHZXR0ZXJzIiwiZ2V0QWxsVW5pdE5hbWVzIiwicG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb24iLCJzZXRWYWx1ZXMiLCJmaWx0ZXJWYWx1ZXMiLCJ1bml0TmFtZXMiLCJkZXJpdmF0aXZlVW5pdE5hbWVzIiwidmFsdWVzVG9TZXQiLCJwaWNrIiwiaXNTaGFsbG93RXF1YWwiLCJrZXlzIiwiam9pbiIsImFjY2Vzc29yTmFtZSIsImluZGV4T2YiLCJhc01ldGhvZE5hbWUiLCJvdGhlckR1cmF0aW9uIiwiYXNzZXJ0SXNEdXJhdGlvbiIsIm5vcm1hbGl6ZSIsIm1hcFZhbHVlcyIsInRvSlNPTiIsInRvSVNPIiwiYXNNaWxsaXNlY29uZHMiLCJpc29TdHJpbmciLCJpc1ZhbGlkRHVyYXRpb24iLCJMYWJlbCIsInNpbmd1bGFyIiwicGx1cmFsIiwic2V0U2luZ3VsYXIiLCJzZXRQbHVyYWwiLCJhc3NlcnRTdHJpbmciLCJzdGFydENhc2UiLCJ0b0xvd2VyQ2FzZSIsInRvVXBwZXJDYXNlIiwiZm9ybWF0VHlwZSIsIkZPUk1BVF9TRU5URU5DRV9DQVNFIiwiYXNTZW50ZW5jZUNhc2UiLCJGT1JNQVRfTE9XRVJDQVNFIiwiYXNMb3dlckNhc2UiLCJGT1JNQVRfVVBQRVJDQVNFIiwiYXNVcHBlckNhc2UiLCJsYWJlbCIsImFzc2VydE1vbmV5IiwibW9uZXkiLCJhc3NlcnRDdXJyZW5jeSIsImFzc2VydFNhbWVDdXJyZW5jeSIsImN1cnJlbmN5QSIsImN1cnJlbmN5QiIsIk1vbmV5IiwiYW1vdW50Iiwic2V0Q3VycmVuY3kiLCJzZXRBbW91bnQiLCJzZXRGb3JtYXR0ZXIiLCJ0b051bWJlciIsIkRlY2ltYWwiLCJmb3JtYXR0ZXIiLCJBY2NvdW50aW5nIiwic2V0dGluZ3MiLCJ0b0FjY291bnRpbmdTZXR0aW5ncyIsIm90aGVyIiwiZXF1YWxzIiwiaGFzU2FtZUN1cnJlbmN5IiwiYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3kiLCJwbHVzIiwibWludXMiLCJtdWx0aXBsaWVyIiwidGltZXMiLCJkaXZpc29yIiwiZGl2aWRlZEJ5IiwicmF0aW9zIiwic2VsZiIsInJlc3VsdHMiLCJjb252ZXJ0ZWRSYXRpb3MiLCJyZW1haW5kZXIiLCJ0b1N1YnVuaXRzIiwidG90YWwiLCJyYXRpbyIsInB1c2giLCJzaGFyZSIsImZsb29yIiwiaSIsImdyZWF0ZXJUaGFuIiwiY29tcGFyZWRUbyIsImdyZWF0ZXJUaGFuT3JFcXVhbFRvIiwibGVzc1RoYW4iLCJsZXNzVGhhbk9yRXF1YWxUbyIsImlzWmVybyIsImlzTmVnYXRpdmUiLCJpc1Bvc2l0aXZlIiwicm91bmRpbmciLCJST1VORF9IQUxGX1VQIiwidG9GaXhlZCIsInRvSW50ZWdlciIsIlJPVU5EX1VQIiwiUk9VTkRfRE9XTiIsIlJPVU5EX0NFSUwiLCJST1VORF9GTE9PUiIsIlJPVU5EX0hBTEZfRE9XTiIsIlJPVU5EX0hBTEZfRVZFTiIsInRoaXNNb25leSIsIm90aGVyTW9uZXkiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQyxPQUFPO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsYUFBYTs7QUFFOUI7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHNCQUFzQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGVBQWU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxhQUFhOztBQUV6QjtBQUNBLHNCQUFzQixTQUFTO0FBQy9COztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxT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QUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsdUJBQXVCO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsdUJBQXVCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLFdBQVc7O0FBRXpCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVUsU0FBUztBQUNuQjtBQUNBOzs7QUFHQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsVUFBVSxLQUFLO0FBQ2Y7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSwwQkFBMEI7O0FBRXpDO0FBQ0EsMEJBQTBCLGdDQUFnQztBQUMxRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkIsU0FBUztBQUN0QztBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUEsWUFBWSxLQUFLO0FBQ2pCOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQixTQUFTO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsU0FBUzs7QUFFMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLGVBQWU7O0FBRXRDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxvQkFBb0I7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsY0FBYztBQUMzRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN4b0REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxhQUFvQjs7QUFFbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsV0FBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsV0FBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDN0RBLGFBQWEsK0JBQStCLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBOUMsYUFBYSwwQ0FBMEMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F6RCxhQUFhLDZDQUE2QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTVELGFBQWEsK0NBQStDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBOUQsYUFBYSxpQ0FBaUMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0FoRCxhQUFhLGlDQUFpQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQWhELGFBQWEsbURBQW1ELEVBQUUsSSIsImZpbGUiOiJlZS12YWx1ZU9iamVjdHMuNTNmM2Q0YTRmMjQ1YWY1NzA1NmUuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL3NyYy92by9pbmRleC5qc1wiKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRpc0VtcHR5LFxuXHRpc1N0cmluZyxcblx0aXNOdW1iZXIsXG5cdGlzQm9vbGVhbixcblx0aXNVbmRlZmluZWQsXG59IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBFeGNlcHRpb24sIENVUlJFTkNZX0NPTkZJRyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5cbi8qKlxuICogQSB2YWx1ZSBvYmplY3QgcmVwcmVzZW50aW5nIGN1cnJlbmN5IHZhbHVlc1xuICovXG5leHBvcnQgY2xhc3MgQ3VycmVuY3kge1xuXHQvKipcblx0ICogVGhlIElTTyA0MjE3IGNvZGUgaWRlbnRpZnlpbmcgdGhlIGN1cnJlbmN5IChlZy4gJ1VTRCcpXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRjb2RlID0gJyc7XG5cblx0LyoqXG5cdCAqIFRoZSBzaW5ndWxhciBsYWJlbCBmb3IgdGhlIGN1cnJlbmN5IChlZy4gJ0RvbGxhcicpO1xuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0c2luZ3VsYXJMYWJlbCA9ICcnO1xuXG5cdC8qKlxuXHQgKiBUaGUgcGx1cmFsIGxhYmVsIGZvciB0aGUgY3VycmVuY3kgKGVnLiAnRG9sbGFycycpO1xuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0cGx1cmFsTGFiZWwgPSAnJztcblxuXHQvKipcblx0ICogVGhlIGN1cnJlbmN5IHN5bWJvbCAoZWcuICckJyk7XG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRzaWduID0gJyc7XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGN1cnJlbmN5IHN5bWJvbCBpcyBkaXNwbGF5ZWQgYmVmb3JlIG9yIGFmdGVyIHRoZSB2YWx1ZS5cblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRzaWduQjQgPSB0cnVlO1xuXG5cdC8qKlxuXHQgKiBUaGUgcHJlY2lzaW9uIGZvciB0aGUgdmFsdWUgKGVnLiAxMC4wMiBpcyAyLCAxMC4xMjMgaXMgMykuIFRoZSBudW1iZXIgb2Zcblx0ICogZGVjaW1hbCBwbGFjZXMgY2FuIGJlIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBudW1iZXIgb2Ygc3VidW5pdHMgZm9yIHRoZVxuXHQgKiBjdXJyZW5jeSAtIHN1YnVuaXRzID0gcG93KCAxMCwgZGVjaW1hbFBsYWNlcykuXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRkZWNpbWFsUGxhY2VzID0gMjtcblxuXHQvKipcblx0ICogVGhlIHN5bWJvbCB1c2VkIGZvciB0aGUgZGVjaW1hbCBtYXJrIChlZy4gJy4nKVxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0ZGVjaW1hbE1hcmsgPSAnLic7XG5cblx0LyoqXG5cdCAqIFRoZSBzeW1ib2wgdXNlZCB0byBzcGxpdCB1cCB0aG91c2FuZHMgaW4gdGhlIHZhbHVlIChlZy4gJywnKVxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0dGhvdXNhbmRzU2VwYXJhdG9yID0gJywnO1xuXG5cdC8qKlxuXHQgKiBUaGUgbnVtYmVyIG9mIGZyYWN0aW9uYWwgZGl2aXNpb25zIG9mIGEgY3VycmVuY3kncyBtYWluIHVuaXQuICBJZiBub3Rcblx0ICogcHJvdmlkZWQsIHRoZW4gaXQgaXMgYXV0b21hdGljYWxseSBjYWxjdWxhdGVkIGZyb20gdGhlIGRlY2ltYWxQbGFjZXNcblx0ICogdmFsdWUuXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdWJ1bml0cyA9IDEwMDtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHt7fX0gY3VycmVuY3lDb25maWcgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGNvbmZpZ3VyYXRpb24gZm9yXG5cdCAqIHRoaXMgY3VycmVuY3kgdmFsdWUgb2JqZWN0LiAgT24gY29uc3RydWN0aW9uLCB0aGUgQ3VycmVuY3kgb2JqZWN0IGlzXG5cdCAqIGZyb3plbiBzbyB0aGF0IGl0IGJlY29tZXMgaW1tdXRhYmxlLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoIGN1cnJlbmN5Q29uZmlnICkge1xuXHRcdEN1cnJlbmN5LnZhbGlkYXRlQ3VycmVuY3lDb25maWcoIGN1cnJlbmN5Q29uZmlnICk7XG5cdFx0dGhpcy5jb2RlID0gY3VycmVuY3lDb25maWcuY29kZTtcblx0XHR0aGlzLnNpbmd1bGFyTGFiZWwgPSBjdXJyZW5jeUNvbmZpZy5zaW5ndWxhckxhYmVsIHx8ICcnO1xuXHRcdHRoaXMucGx1cmFsTGFiZWwgPSBjdXJyZW5jeUNvbmZpZy5wbHVyYWxMYWJlbCB8fCAnJztcblx0XHR0aGlzLnNpZ24gPSBjdXJyZW5jeUNvbmZpZy5zaWduO1xuXHRcdHRoaXMuc2lnbkI0ID0gaXNVbmRlZmluZWQoIGN1cnJlbmN5Q29uZmlnLnNpZ25CNCApID9cblx0XHRcdHRoaXMuc2lnbkI0IDpcblx0XHRcdGN1cnJlbmN5Q29uZmlnLnNpZ25CNDtcblx0XHR0aGlzLmRlY2ltYWxQbGFjZXMgPSBpc1VuZGVmaW5lZCggY3VycmVuY3lDb25maWcuZGVjaW1hbFBsYWNlcyApID9cblx0XHRcdHRoaXMuZGVjaW1hbFBsYWNlcyA6XG5cdFx0XHRjdXJyZW5jeUNvbmZpZy5kZWNpbWFsUGxhY2VzO1xuXHRcdHRoaXMuZGVjaW1hbE1hcmsgPSBjdXJyZW5jeUNvbmZpZy5kZWNpbWFsTWFyayB8fCB0aGlzLmRlY2ltYWxNYXJrO1xuXHRcdHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yID0gY3VycmVuY3lDb25maWcudGhvdXNhbmRzU2VwYXJhdG9yIHx8IHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yO1xuXHRcdHRoaXMuc3VidW5pdHMgPSBjdXJyZW5jeUNvbmZpZy5zdWJ1bml0cyB8fFxuXHRcdFx0TWF0aC5wb3coIDEwLCB0aGlzLmRlY2ltYWxQbGFjZXMgKTtcblx0XHRPYmplY3QuZnJlZXplKCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgY3VycmVuY3kgcHJvcGVydGllcyBhcyBhbiBvYmplY3QgZm9ybWF0dGVkIGZvciB0aGVcblx0ICogYWNjb3VudGluZy1qcyBsaWJyYXJ5IGNvbmZpZ3VyYXRpb24uXG5cdCAqIEByZXR1cm4ge3t9fSAgQW4gb2JqZWN0IHNoYXBlZCBmb3Igd2hhdCB0aGUgYWNjb3VudGluZy1qcyBsaWJyYXJ5IGV4cGVjdHNcblx0ICovXG5cdHRvQWNjb3VudGluZ1NldHRpbmdzKCkge1xuXHRcdGNvbnN0IGRlY2ltYWxJbmZvID0ge1xuXHRcdFx0ZGVjaW1hbDogdGhpcy5kZWNpbWFsTWFyayxcblx0XHRcdHRob3VzYW5kOiB0aGlzLnRob3VzYW5kc1NlcGFyYXRvcixcblx0XHRcdHByZWNpc2lvbjogdGhpcy5kZWNpbWFsUGxhY2VzLFxuXHRcdH07XG5cdFx0cmV0dXJuIHtcblx0XHRcdGN1cnJlbmN5OiB7XG5cdFx0XHRcdHN5bWJvbDogdGhpcy5zaWduLFxuXHRcdFx0XHRmb3JtYXQ6IHtcblx0XHRcdFx0XHRwb3M6IHRoaXMuc2lnbkI0ID8gJyVzJXYnIDogJyV2JXMnLFxuXHRcdFx0XHRcdG5lZzogdGhpcy5zaWduQjQgPyAnLSAkcyV2JyA6ICctICV2JXMnLFxuXHRcdFx0XHRcdHplcm86IHRoaXMuc2lnbkI0ID8gJyVzJXYnIDogJyV2JXMnLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHQuLi5kZWNpbWFsSW5mbyxcblx0XHRcdH0sXG5cdFx0XHRudW1iZXI6IGRlY2ltYWxJbmZvLFxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgb2JqZWN0LlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IEZ1bmN0aW9uIHJldHVybmluZyB0aGUgb2JqZWN0IHRvIGJlIHNlcmlhbGl6ZWQgYnlcblx0ICogSlNPTi5zdHJpbmdpZnlcblx0ICovXG5cdHRvSlNPTigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y29kZTogdGhpcy5jb2RlLFxuXHRcdFx0c2luZ3VsYXJMYWJlbDogdGhpcy5zaW5ndWxhckxhYmVsLFxuXHRcdFx0cGx1cmFsTGFiZWw6IHRoaXMucGx1cmFsTGFiZWwsXG5cdFx0XHRzaWduOiB0aGlzLnNpZ24sXG5cdFx0XHRzaWduQjQ6IHRoaXMuc2lnbkI0LFxuXHRcdFx0ZGVjaW1hbE1hcms6IHRoaXMuZGVjaW1hbE1hcmssXG5cdFx0XHR0aG91c2FuZHNTZXBhcmF0b3I6IHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yLFxuXHRcdFx0c3VidW5pdHM6IHRoaXMuc3VidW5pdHMsXG5cdFx0XHRkZWNpbWFsUGxhY2VzOiB0aGlzLmRlY2ltYWxQbGFjZXMsXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGlzIHZhbGlkYXRlcyB3aGV0aGVyIHRoZSBwYXNzZWQgaW4gY29uZmlnIGhhcyB0aGUgcmVxdWlyZWQgcHJvcGVydGllc1xuXHQgKiAoYW5kIGNvcnJlY3QgdHlwZXMpIGZvciBjb25zdHJ1Y3RpbmcgYSBDdXJyZW5jeSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7e319IGNvbmZpZ1xuXHQgKiBAdGhyb3dzIHtFeGNlcHRpb259XG5cdCAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUN1cnJlbmN5Q29uZmlnID0gKCBjb25maWcgKSA9PiB7XG5cdFx0aWYgKCBpc0VtcHR5KCBjb25maWcgKSApIHtcblx0XHRcdHRocm93IG5ldyBFeGNlcHRpb24oXG5cdFx0XHRcdCdUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgcHJvdmlkZWQgdG8gQ3VycmVuY3kgbXVzdCBub3QnICtcblx0XHRcdFx0JyBiZSBlbXB0eSdcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICggISBjb25maWcuY29kZSB8fCAhIGlzU3RyaW5nKCBjb25maWcuY29kZSApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBjb25maWd1cmF0aW9uIG9iamVjdCBwcm92aWRlZCB0byBDdXJyZW5jeSBtdXN0IGhhdmUgJyArXG5cdFx0XHRcdCdhIFwiY29kZVwiIHByb3BlcnR5IHRoYXQgaXMgYSBzdHJpbmcuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoICEgY29uZmlnLnNpZ24gfHwgISBpc1N0cmluZyggY29uZmlnLnNpZ24gKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgcHJvdmlkZWQgdG8gQ3VycmVuY3kgbXVzdCBoYXZlIGEgJyArXG5cdFx0XHRcdCdcInNpZ25cIiBwcm9wZXJ0eSB0aGF0IGlzIGEgc3RyaW5nLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcuc2luZ3VsYXJMYWJlbCAmJiAhIGlzU3RyaW5nKCBjb25maWcuc2luZ3VsYXJMYWJlbCApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBzaW5ndWxhckxhYmVsIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBzdHJpbmcgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcucGx1cmFsTGFiZWwgJiYgISBpc1N0cmluZyggY29uZmlnLnBsdXJhbExhYmVsICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHBsdXJhbExhYmVsIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBzdHJpbmcgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcuc2lnbkI0ICYmICEgaXNCb29sZWFuKCBjb25maWcuc2lnbkI0ICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHNpZ25CNCBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgYm9vbGVhbiBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5kZWNpbWFsUGxhY2VzICYmICEgaXNOdW1iZXIoIGNvbmZpZy5kZWNpbWFsUGxhY2VzICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGRlY2ltYWxQbGFjZXMgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIG51bWJlciBwcmltaXRpdmUnXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLmRlY2ltYWxNYXJrICYmICEgaXNTdHJpbmcoIGNvbmZpZy5kZWNpbWFsTWFyayApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBkZWNpbWFsTWFyayBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgc3RyaW5nIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLnRob3VzYW5kc1NlcGFyYXRvciAmJlxuXHRcdFx0ISBpc1N0cmluZyggY29uZmlnLnRob3VzYW5kc1NlcGFyYXRvciApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSB0aG91c2FuZHNTZXBhcmF0b3IgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIHN0cmluZyBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5zdWJ1bml0cyAmJiAhIGlzTnVtYmVyKCBjb25maWcuc3VidW5pdHMgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgc3VidW5pdHMgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIG51bWJlciBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBFeHBvcnQgb2YgYSBDdXJyZW5jeSBWYWx1ZSBvYmplY3QgY3JlYXRlZCBmcm9tIGEgY3VycmVuY3kgY29uZmlnIHByb3ZpZGVkLlxuICogVGhpcyBjYXRjaGVzIGFueSBleGNlcHRpb24gYW5kIHRyaWdnZXJzIGEgY29uc29sZSBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge3t9fSBjb25maWdcbiAqIEByZXR1cm4ge0N1cnJlbmN5fHt9fSBJZiB0aGVyZSdzIGEgcHJvYmxlbSBjb25zdHJ1Y3RpbmcgdGhlIGN1cnJlbmN5IG9iamVjdFxuICogYW4gZW1wdHkgb2JqZWN0IGlzIHJldHVybmVkLlxuICovXG5leHBvcnQgY29uc3QgU2l0ZUN1cnJlbmN5ID0gKCBjb25maWcgPSB7fSApID0+IHtcblx0bGV0IGN1cnJlbmN5O1xuXHR0cnkge1xuXHRcdGN1cnJlbmN5ID0gbmV3IEN1cnJlbmN5KCBjb25maWcgKTtcblx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0Y3VycmVuY3kgPSB7fTtcblx0XHR3YXJuaW5nKFxuXHRcdFx0ZmFsc2UsXG5cdFx0XHQnVGhlIFNpdGUgQ3VycmVuY3kgb2JqZWN0IGNvdWxkIG5vdCBiZSBjcmVhdGVkIGJlY2F1c2UgJyArXG5cdFx0XHQnb2YgdGhpcyBlcnJvcjogJyArIGUubWVzc2FnZVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIGN1cnJlbmN5O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2l0ZUN1cnJlbmN5KCBDVVJSRU5DWV9DT05GSUcgKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBpc1N0cmluZywgaXNOdW1iZXIgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0SW52YWxpZFRpbWV6b25lLFxuXHRJbnZhbGlkSVNPODYwMVN0cmluZyxcblx0SW52YWxpZExvY2FsZSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIGxvY2FsZSBzdHJpbmcgaXMgYSB2YWxpZCBsb2NhbGUuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBsb2NhbGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IElmIGdpdmVuIGxvY2FsZSBzdHJpbmcgaXMgbm90IHZhbGlkIHRoaXMgd2lsbCByZXR1cm4gZmFsc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUxvY2FsZSggbG9jYWxlICkge1xuXHRpZiAoICEgaXNTdHJpbmcoIGxvY2FsZSApICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCBvcmlnaW5hbExvY2FsZSA9IG1vbWVudC5sb2NhbGUoKTtcblx0Y29uc3QgdmFsaWRhdGlvbkxvY2FsZSA9IG1vbWVudC5sb2NhbGUoIGxvY2FsZSApO1xuXHQvLyByZXNldCBiYWNrIHRvIG9yaWdpbmFsIGxvY2FsZVxuXHRtb21lbnQubG9jYWxlKCBvcmlnaW5hbExvY2FsZSApO1xuXHRyZXR1cm4gISAoIGxvY2FsZSAhPT0gJ2VuJyAmJiB2YWxpZGF0aW9uTG9jYWxlID09PSAnZW4nICk7XG59XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIGdpdmVuIGxvY2FsZSBzdHJpbmcgaXMgdmFsaWQuICBJZiBpdCdzIG5vdCBhbiBleGNlcHRpb24gaXNcbiAqIHRocm93bi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG4gKiBAdGhyb3dzIEludmFsaWRMb2NhbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApIHtcblx0aWYgKCAhIHZhbGlkYXRlTG9jYWxlKCBsb2NhbGUgKSApIHtcblx0XHR0aHJvdyBuZXcgSW52YWxpZExvY2FsZSggbG9jYWxlICk7XG5cdH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gc3RyaW5nIGlzIGEgdmFsaWQgSVNPODYwMSBmb3JtYXR0ZWQgZGF0ZSBhbmRcbiAqIHRpbWUgc3RyaW5nLlxuICpcbiAqIE5vdGU6IGRhdGUgcmVnZXggcGF0dGVybiBmcm9tXG4gKiBodHRwOi8vd3d3LnBlbGFnb2Rlc2lnbi5jb20vYmxvZy8yMDA5LzA1LzIwL2lzby04NjAxLWRhdGUtdmFsaWRhdGlvbi10aGF0LWRvZXNudC1zdWNrL1xuICogTm90ZTogaXNEdXJhdGlvbiByZWdleCBwYXR0ZXJuIGZyb21cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jeWxjL2N5bGMvaXNzdWVzLzExOSNpc3N1ZWNvbW1lbnQtOTQzNTUzM1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVGltZVN0cmluZ1xuICogQHBhcmFtIHtib29sZWFufSBpc0R1cmF0aW9uICBXaGV0aGVyIHRvIHZhbGlkYXRlIGZvciBhIGR1cmF0aW9uIGZvcm1hdCBvciBub3QuXG4gKiBAcmV0dXJuIHtib29sZWFufSAgUmV0dXJucyBmYWxzZSBpZiB0aGUgZ2l2ZW4gc3RyaW5nIGlzIG5vdCB2YWxpZCBJU084NjAxXG4gKiBmb3JtYXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSVNPODYwMSggZGF0ZVRpbWVTdHJpbmcsIGlzRHVyYXRpb24gPSBmYWxzZSApIHtcblx0aWYgKCAhIGlzU3RyaW5nKCBkYXRlVGltZVN0cmluZyApICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCByZWdleCA9IGlzRHVyYXRpb24gP1xuXHRcdC9eKFJcXGQqXFwvKT9QKD86XFxkKyg/OlxcLlxcZCspP1kpPyg/OlxcZCsoPzpcXC5cXGQrKT9NKT8oPzpcXGQrKD86XFwuXFxkKyk/Vyk/KD86XFxkKyg/OlxcLlxcZCspP0QpPyg/OlQoPzpcXGQrKD86XFwuXFxkKyk/SCk/KD86XFxkKyg/OlxcLlxcZCspP00pPyg/OlxcZCsoPzpcXC5cXGQrKT9TKT8pPyQvIDpcblx0XHQvXihbXFwrLV0/XFxkezR9KD8hXFxkezJ9XFxiKSkoKC0/KSgoMFsxLTldfDFbMC0yXSkoXFwzKFsxMl1cXGR8MFsxLTldfDNbMDFdKSk/fFcoWzAtNF1cXGR8NVswLTJdKSgtP1sxLTddKT98KDAwWzEtOV18MFsxLTldXFxkfFsxMl1cXGR7Mn18MyhbMC01XVxcZHw2WzEtNl0pKSkoW1RcXHNdKCgoWzAxXVxcZHwyWzAtM10pKCg6PylbMC01XVxcZCk/fDI0XFw6PzAwKShbXFwuLF1cXGQrKD8hOikpPyk/KFxcMTdbMC01XVxcZChbXFwuLF1cXGQrKT8pPyhbelpdfChbXFwrLV0pKFswMV1cXGR8MlswLTNdKTo/KFswLTVdXFxkKT8pPyk/KT8kLztcblx0cmV0dXJuIHJlZ2V4LnRlc3QoIGRhdGVUaW1lU3RyaW5nICk7XG59XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCBJU084NjAxIGZvcm1hdHRlZCBkYXRlIGFuZCB0aW1lXG4gKiBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUaW1lU3RyaW5nXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzRHVyYXRpb24gIFdoZXRoZXIgdG8gYXNzZXJ0IGZvciBhIGR1cmF0aW9uIGZvcm1hdCBvciBub3QuXG4gKiBAdGhyb3dzIEludmFsaWRJU084NjAxU3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRJU084NjAxSXNWYWxpZCggZGF0ZVRpbWVTdHJpbmcsIGlzRHVyYXRpb24gPSBmYWxzZSApIHtcblx0aWYgKCAhIHZhbGlkYXRlSVNPODYwMSggZGF0ZVRpbWVTdHJpbmcsIGlzRHVyYXRpb24gKSApIHtcblx0XHR0aHJvdyBuZXcgSW52YWxpZElTTzg2MDFTdHJpbmcoIGRhdGVUaW1lU3RyaW5nICk7XG5cdH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gc3RyaW5nIGlzIGEgdmFsaWQgdGltZXpvbmUgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuICogQHJldHVybiB7Ym9vbGVhbn0gUmV0dXJucyBmYWxzZSBpZiB0aGUgZ2l2ZW4gc3RyaW5nIGlzIG5vdCBhIHZhbGlkIHRpbWV6b25lXG4gKiBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlVGltZXpvbmUoIHRpbWV6b25lICkge1xuXHRpZiAoICEgaXNTdHJpbmcoIHRpbWV6b25lICkgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IGR0ID0gbW9tZW50LnR6LnpvbmUoIHRpbWV6b25lICk7XG5cdHJldHVybiBkdCAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIHRpbWV6b25lIHN0cmluZyBhbmQgdGhyb3dzIGFuXG4gKiBleGNlcHRpb24gaWYgaXQgaXNuJ3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRpbWV6b25lXG4gKiBAdGhyb3dzIEludmFsaWRUaW1lem9uZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0VGltZXpvbmVJc1ZhbGlkKCB0aW1lem9uZSApIHtcblx0aWYgKCAhIHZhbGlkYXRlVGltZXpvbmUoIHRpbWV6b25lICkgKSB7XG5cdFx0dGhyb3cgbmV3IEludmFsaWRUaW1lem9uZSggdGltZXpvbmUgKTtcblx0fVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgamF2YXNjcmlwdCBEYXRlXG4gKiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoZSB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUlzRGF0ZSggZGF0ZSApIHtcblx0cmV0dXJuIGRhdGUgaW5zdGFuY2VvZiBEYXRlO1xufVxuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydElzRGF0ZSggZGF0ZSApIHtcblx0aWYgKCAhIHZhbGlkYXRlSXNEYXRlKCBkYXRlICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuIGluc3RhbmNlIG9mIERhdGUnXG5cdFx0KTtcblx0fVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIG9mZnNldFxuICpcbiAqIEN1cnJlbnRseSB0aGlzIGp1c3QgdmFsaWRhdGVzIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIG51bWJlci4gRXZlbnR1YWxseSBpdFxuICogbWlnaHQgY2hlY2sgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gKiBAcmV0dXJuIHtib29sZWFufSAgdHJ1ZSBtZWFucyBpdHMgdmFsaWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUlzT2Zmc2V0KCBvZmZzZXQgKSB7XG5cdHJldHVybiBpc051bWJlciggb2Zmc2V0ICk7XG59XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIG9mZnNldC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0SXNPZmZzZXQoIG9mZnNldCApIHtcblx0aWYgKCAhIHZhbGlkYXRlSXNPZmZzZXQoIG9mZnNldCApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHQnT2Zmc2V0IGlzIGV4cGVjdGVkIHRvIGJlIGEgbnVtYmVyJ1xuXHRcdCk7XG5cdH1cbn1cbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQge1xuXHRjYXBpdGFsaXplLFxuXHRvbWl0LFxuXHRpc051bWJlcixcblx0aXNFbXB0eSxcblx0cmVkdWNlLFxuXHRpc09iamVjdCxcblx0aXNVbmRlZmluZWQsXG5cdGlzRnVuY3Rpb24sXG59IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpbnN0YW5jZU9mIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRJbnZhbGlkRGF0ZVRpbWUsXG5cdEludmFsaWRBcmd1bWVudCxcblx0SW52YWxpZElTTzg2MDFTdHJpbmcsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0ICogYXMgYXNzZXJ0aW9ucyBmcm9tICcuL2Fzc2VydGlvbnMnO1xuaW1wb3J0IER1cmF0aW9uIGZyb20gJy4vZHVyYXRpb24nO1xuaW1wb3J0IHtcblx0REVGQVVMVF9USU1FWk9ORV9TVFJJTkcsXG5cdERFRkFVTFRfT0ZGU0VULFxuXHRERUZBVUxUX1ZBTElEX0xPQ0FMRSxcblx0REVGQVVMVF9GT1JNQVQsXG59IGZyb20gJy4vZGVmYXVsdHMnO1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBzeW1ib2xzIHVzZWQgZm9yIFwicHJpdmF0ZVwiIHByb3BlcnRpZXMgaW4gdGhlIERhdGVUaW1lIG9iamVjdC5cbiAqXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRkYXRldGltZTogU3ltYm9sXG4gKiBcdH1cbiAqIH1cbiAqL1xuY29uc3QgcHJpdmF0ZVByb3BlcnRpZXMgPSB7XG5cdGRhdGV0aW1lOiBTeW1ib2woICdEYXRlVGltZVByb3BlcnR5RGF0ZVRpbWUnICksXG59O1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBzeW1ib2xzIHVzZWQgZm9yIFwicHJpdmF0ZVwiIG1ldGhvZHMgaW4gdGhlIERhdGVUaW1lIG9iamVjdC5cbiAqXG4gKiBAdHlwZSB7XG4gKiB7XG4gKiBcdGdldFVuaXROYW1lczogU3ltYm9sLFxuICogXHRjcmVhdGVHZXR0ZXJzQW5kU2V0dGVyczogU3ltYm9sLFxuICogXHRleHRyYWN0TW9tZW50c0Zyb21EYXRlVGltZXM6IFN5bWJvbCxcbiAqIFx0bm9ybWFsaXplVW5pdE5hbWU6IFN5bWJvbCxcbiAqIFx0bm9ybWFsaXplVW5pdE9iamVjdDogU3ltYm9sLFxuICogXHRub3JtYWxpemVVbml0VmFsdWU6IFN5bWJvbCxcbiAqIFx0fVxuICogfVxuICovXG5jb25zdCBwcml2YXRlTWV0aG9kcyA9IHtcblx0Z2V0VW5pdE5hbWVzOiBTeW1ib2woICdEYXRlVGltZU1ldGhvZEdldFVuaXROYW1lcycgKSxcblx0Y3JlYXRlR2V0dGVyc0FuZFNldHRlcnM6IFN5bWJvbCggJ0RhdGVUaW1lTWV0aG9kQ3JlYXRlR2V0dGVyc0FuZFNldHRlcnMnICksXG5cdGV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lczogU3ltYm9sKCAnRGF0ZVRpbWVNZXRob2RFeHRyYWN0TW9tZW50c0Zyb21EYXRlVGltZXMnICksXG5cdG5vcm1hbGl6ZVVuaXROYW1lOiBTeW1ib2woICdEYXRlVGltZU1ldGhvZE5vcm1hbGl6ZVVuaXROYW1lJyApLFxuXHRub3JtYWxpemVVbml0T2JqZWN0OiBTeW1ib2woICdEYXRlVGltZU1ldGhvZE5vcm1hbGl6ZVVuaXRPYmplY3QnICksXG5cdG5vcm1hbGl6ZVVuaXRWYWx1ZTogU3ltYm9sKCAnRGF0ZVRpbWVNZXRob2ROb3JtYWxpemVVbml0VmFsdWUnICksXG59O1xuXG5jb25zdCB2YWxpZERhdGVUaW1lVW5pdHMgPSBbXG5cdCd5ZWFyJyxcblx0J21vbnRoJyxcblx0J2RheScsXG5cdCdob3VyJyxcblx0J21pbnV0ZScsXG5cdCdzZWNvbmQnLFxuXHQnbWlsbGlzZWNvbmQnLFxuXTtcblxuLyoqXG4gKiBUaGUgRGF0ZVRpbWUgdmFsdWUgb2JqZWN0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9pbnQgaW4gdGltZS5cbiAqXG4gKiBJbnRlcm5hbGx5LCB0aGUgRGF0ZVRpbWUgY2xhc3MgaGVyZSB1c2VzIGBtb21lbnRgLiAgVGhpcyBpcyBhbiBhYnN0cmFjdGlvblxuICogbG9vc2VseSBmb2xsb3dpbmcgdGhlIGFkYXB0ZXIgcGF0dGVybiBzbyB0aGF0IHRoZXJlIGlzIGEgY29tbW9uIGFwaSB0aGF0XG4gKiBjYW4gYmUgZGVwZW5kZWQgb24gaWYgaW4gdGhlIGZ1dHVyZSB0aGUgaW50ZXJuYWwgbGlicmFyeSBpcyBzd2l0Y2hlZCB0b1xuICogc29tZXRoaW5nIGRpZmZlcmVudCAoc3VjaCBhcyBMdXhvbikuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVUaW1lIHtcblx0LyoqXG5cdCAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIERhdGVUaW1lIGNsYXNzXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBpc284NjAxRGF0ZVN0cmluZ1xuXHQgKiBAcGFyYW0ge3N0cmluZ3xudWxsfSB0aW1lem9uZSBJZiBudWxsLCB0aGVuIHRpbWV6b25lIGlzIG5vdCBzZXQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICovXG5cdGNvbnN0cnVjdG9yKFxuXHRcdGlzbzg2MDFEYXRlU3RyaW5nID0gJycsXG5cdFx0dGltZXpvbmUgPSBERUZBVUxUX1RJTUVaT05FX1NUUklORyxcblx0XHRsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRVxuXHQpIHtcblx0XHRpZiAoIGlzbzg2MDFEYXRlU3RyaW5nICE9PSAnJyApIHtcblx0XHRcdERhdGVUaW1lLmFzc2VydElTTzg2MDFJc1ZhbGlkKCBpc284NjAxRGF0ZVN0cmluZyApO1xuXHRcdH1cblx0XHREYXRlVGltZS5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0XHRpZiAoIHRpbWV6b25lID09PSBudWxsICkge1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXSA9IGlzbzg2MDFEYXRlU3RyaW5nID09PSAnJyA/XG5cdFx0XHRcdG1vbWVudC51dGMoKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdFx0bW9tZW50KCBpc284NjAxRGF0ZVN0cmluZyApXG5cdFx0XHRcdFx0LnV0Y09mZnNldCggaXNvODYwMURhdGVTdHJpbmcgKVxuXHRcdFx0XHRcdC5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdH0gZWxzZSBpZiAoIHRpbWV6b25lID09PSBEYXRlVGltZS5USU1FWk9ORV9MT0NBTCApIHtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0gPSBpc284NjAxRGF0ZVN0cmluZyA9PT0gJycgP1xuXHRcdFx0XHRtb21lbnQoKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdFx0bW9tZW50KCBpc284NjAxRGF0ZVN0cmluZyApLmxvY2FsZSggbG9jYWxlICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdERhdGVUaW1lLmFzc2VydFRpbWV6b25lSXNWYWxpZCggdGltZXpvbmUgKTtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0gPSBpc284NjAxRGF0ZVN0cmluZyA9PT0gJycgP1xuXHRcdFx0XHRtb21lbnQoKS50eiggdGltZXpvbmUgKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdFx0bW9tZW50LnR6KFxuXHRcdFx0XHRcdGlzbzg2MDFEYXRlU3RyaW5nLFxuXHRcdFx0XHRcdHRpbWV6b25lXG5cdFx0XHRcdCkubG9jYWxlKCBsb2NhbGUgKTtcblx0XHR9XG5cdFx0dGhpc1sgcHJpdmF0ZU1ldGhvZHMuY3JlYXRlR2V0dGVyc0FuZFNldHRlcnMgXSgpO1xuXHRcdE9iamVjdC5mcmVlemUoIHRoaXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhlIGdpdmVuIGxvY2FsZSBpcyBhIHZhbGlkIGxvY2FsZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG1lYW5zIGl0IGlzIHZhbGlkXG5cdCAqL1xuXHRzdGF0aWMgdmFsaWRhdGVMb2NhbGUoIGxvY2FsZSApIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZUxvY2FsZSggbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyBpZiB0aGUgZ2l2ZW4gbG9jYWxlIGlzIHZhbGlkIGFuZCB0aHJvd3MgYW4gZXJyb3IgaWYgbm90LlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEB0aHJvd3MgSW52YWxpZExvY2FsZVxuXHQgKi9cblx0c3RhdGljIGFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApIHtcblx0XHRhc3NlcnRpb25zLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyBpZiB0aGUgZ2l2ZW4gSVNPODYwMSBzdHJpbmcgaXMgdmFsaWQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVGltZVN0cmluZ1xuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlSVNPODYwMSggZGF0ZVRpbWVTdHJpbmcgKSB7XG5cdFx0cmV0dXJuIGFzc2VydGlvbnMudmFsaWRhdGVJU084NjAxKCBkYXRlVGltZVN0cmluZyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgaWYgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIElTTyA4NjAxIHN0cmluZy5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUaW1lU3RyaW5nXG5cdCAqIEB0aHJvd3MgSW52YWxpZElTTzg2MDFTdHJpbmdcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJU084NjAxSXNWYWxpZCggZGF0ZVRpbWVTdHJpbmcgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRJU084NjAxSXNWYWxpZCggZGF0ZVRpbWVTdHJpbmcgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIHRpbWV6b25lXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlVGltZXpvbmUoIHRpbWV6b25lICkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlVGltZXpvbmUoIHRpbWV6b25lICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCB0aW1lem9uZSBzdHJpbmcuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKiBAdGhyb3dzIEludmFsaWRUaW1lem9uZVxuXHQgKi9cblx0c3RhdGljIGFzc2VydFRpbWV6b25lSXNWYWxpZCggdGltZXpvbmUgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRUaW1lem9uZUlzVmFsaWQoIHRpbWV6b25lICk7XG5cdH1cblxuXHQvKipcblx0ICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgdmFsaWQgb2Zmc2V0XG5cdCAqXG5cdCAqIEN1cnJlbnRseSB0aGlzIGp1c3QgdmFsaWRhdGVzIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIG51bWJlci4gRXZlbnR1YWxseSBpdFxuXHQgKiBtaWdodCBjaGVjayB1cHBlciBhbmQgbG93ZXIgbGltaXRzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICB0cnVlIG1lYW5zIGl0cyB2YWxpZC5cblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUlzT2Zmc2V0KCBvZmZzZXQgKSB7XG5cdFx0cmV0dXJuIGFzc2VydGlvbnMudmFsaWRhdGVJc09mZnNldCggb2Zmc2V0ICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIG9mZnNldC5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKi9cblx0c3RhdGljIGFzc2VydElzT2Zmc2V0KCBvZmZzZXQgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRJc09mZnNldCggb2Zmc2V0ICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEBwYXJhbSB7RGF0ZVRpbWV9IGRhdGV0aW1lXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IHJldHVybnMgdHJ1ZSBpZiBpdCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlSXNEYXRlVGltZSggZGF0ZXRpbWUgKSB7XG5cdFx0cmV0dXJuIGluc3RhbmNlT2YoIGRhdGV0aW1lLCAnRGF0ZVRpbWUnICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBkYXRldGltZVxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKi9cblx0c3RhdGljIGFzc2VydElzRGF0ZVRpbWUoIGRhdGV0aW1lICkge1xuXHRcdGlmICggISBEYXRlVGltZS52YWxpZGF0ZUlzRGF0ZVRpbWUoIGRhdGV0aW1lICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZSdcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgamF2YXNjcmlwdCBEYXRlXG5cdCAqIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhlIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVcblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUlzRGF0ZSggZGF0ZSApIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZUlzRGF0ZSggZGF0ZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNEYXRlKCBkYXRlICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SXNEYXRlKCBkYXRlICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lIGFuZCBpc1xuXHQgKiBhIFwidmFsaWRcIiBkYXRldGltZSAobWVhbmluZyB0aGUgaW5zdGFuY2Ugd2FzIGNvbnN0cnVjdGVkIHdpdGggdmFsaWRcblx0ICogYXJndW1lbnRzKS5cblx0ICogQHBhcmFtIHtEYXRlVGltZX0gZGF0ZXRpbWVcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBtZWFucyBpdCBpcyB2YWxpZC5cblx0ICovXG5cdHN0YXRpYyBpc1ZhbGlkKCBkYXRldGltZSApIHtcblx0XHRyZXR1cm4gRGF0ZVRpbWUudmFsaWRhdGVJc0RhdGVUaW1lKCBkYXRldGltZSApICYmIGRhdGV0aW1lLmlzVmFsaWQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lIGFuZCBpc1xuXHQgKiBhIFwidmFsaWRcIiBkYXRldGltZSAobWVhbmluZyB0aGUgaW5zdGFuY2Ugd2FzIGNvbnN0cnVjdGVkIHdpdGggdmFsaWRcblx0ICogYXJndW1lbnRzKVxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBkYXRldGltZVxuXHQgKiBAdGhyb3dzIEludmFsaWREYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGFzc2VydElzVmFsaWQoIGRhdGV0aW1lICkge1xuXHRcdGlmICggISBEYXRlVGltZS5pc1ZhbGlkKCBkYXRldGltZSApICkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWREYXRlVGltZSggZGF0ZXRpbWUgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQSBwcml2YXRlIGludGVybmFsIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGV4dHJhY3QgYWxsIG1vbWVudFxuXHQgKiBpbnN0YW5jZXMgZnJvbSB0aGUgcHJvdmlkZWQgRGF0ZVRpbWVzIChwYXNzZWQgaW4gYXMgYXJndW1lbnRzKS5cblx0ICogQHBhcmFtIHsuLi5EYXRlVGltZX0gZGF0ZXRpbWVzXG5cdCAqIEByZXR1cm4ge01vbWVudFtdfSBBbiBhcnJheSBvZiBtb21lbnQgaW5zdGFuY2VzIGV4dHJhY3RlZCBmcm9tIHRoZVxuXHQgKiBEYXRlVGltZXNcblx0ICovXG5cdHN0YXRpYyBbIHByaXZhdGVNZXRob2RzLmV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lcyBdKCAuLi5kYXRldGltZXMgKSB7XG5cdFx0cmV0dXJuIGRhdGV0aW1lcy5tYXAoICggZGF0ZXRpbWUgKSA9PiB7XG5cdFx0XHREYXRlVGltZS5hc3NlcnRJc0RhdGVUaW1lKCBkYXRldGltZSApO1xuXHRcdFx0cmV0dXJuIGRhdGV0aW1lWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHaXZlbiBhbiBpbmRlZmluaXRlIG51bWJlciBvZiBEYXRlVGltZXMgYXMgYXJndW1lbnRzLCB0aGlzIHdpbGwgcmV0dXJuIGFcblx0ICogbmV3IERhdGVUaW1lIHRoYXQgcmVwcmVzZW50cyB0aGUgbGF0ZXN0IHBvaW50IGluIHRpbWUuXG5cdCAqIEBwYXJhbSB7Li4uRGF0ZVRpbWV9IGRhdGV0aW1lc1xuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gQSBuZXcgRGF0ZVRpbWUgcmVwcmVzZW50aW5nIHRoZSBsYXRlc3QgcG9pbnQgb2YgdGltZS5cblx0ICovXG5cdHN0YXRpYyBtYXgoIC4uLmRhdGV0aW1lcyApIHtcblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudChcblx0XHRcdG1vbWVudC5tYXgoXG5cdFx0XHRcdERhdGVUaW1lWyBwcml2YXRlTWV0aG9kcy5leHRyYWN0TW9tZW50c0Zyb21EYXRlVGltZXMgXShcblx0XHRcdFx0XHQuLi5kYXRldGltZXNcblx0XHRcdFx0KVxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogR2l2ZW4gYW4gaW5kZWZpbml0ZSBudW1iZXIgb2YgRGF0ZVRpbWVzIGFzIGFyZ3VtZW50cywgdGhpcyB3aWxsIHJldHVybiBhXG5cdCAqIG5ldyBEYXRlVGltZSB0aGF0IHJlcHJlc2VudHMgdGhlIGVhcmxpZXN0IHBvaW50IGluIHRpbWUuXG5cdCAqIEBwYXJhbSB7Li4uRGF0ZVRpbWV9IGRhdGV0aW1lc1xuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gQSBuZXcgRGF0ZVRpbWUgcmVwcmVzZW50aW5nIHRoZSBlYXJsaWVzdCBwb2ludCBpblxuXHQgKiB0aW1lLlxuXHQgKi9cblx0c3RhdGljIG1pbiggLi4uZGF0ZXRpbWVzICkge1xuXHRcdHJldHVybiBEYXRlVGltZS5mcm9tTW9tZW50KFxuXHRcdFx0bW9tZW50Lm1pbihcblx0XHRcdFx0RGF0ZVRpbWVbIHByaXZhdGVNZXRob2RzLmV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lcyBdKFxuXHRcdFx0XHRcdC4uLmRhdGV0aW1lc1xuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBpbnN0YW5jZSBvZiBtb21lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bW9tZW50fSBtb21lbnRJbnN0YW5jZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tTW9tZW50KCBtb21lbnRJbnN0YW5jZSApIHtcblx0XHRpZiAoICEgbW9tZW50LmlzTW9tZW50KCBtb21lbnRJbnN0YW5jZSApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ1JlcXVpcmVzIGFuIGluc3RhbmNlIG9mIG1vbWVudC4nICk7XG5cdFx0fVxuXHRcdC8vIHRoaXMgd291bGQgYWNjb3VudCBmb3IgY2xpZW50IGNvZGUgdGhhdCBpcyB1c2luZyBgbW9tZW50YCBidXQgbm90XG5cdFx0Ly8gdXNpbmcgYG1vbWVudC10aW1lem9uZWAuXG5cdFx0cmV0dXJuIGlzRnVuY3Rpb24oIG1vbWVudEluc3RhbmNlLnR6ICkgJiZcblx0XHRcdCEgaXNVbmRlZmluZWQoIG1vbWVudEluc3RhbmNlLnR6KCkgKSAmJlxuXHRcdFx0bW9tZW50SW5zdGFuY2UudHooKSAhPT0gJ1VUQycgP1xuXHRcdFx0bmV3IERhdGVUaW1lKFxuXHRcdFx0XHRtb21lbnRJbnN0YW5jZS50b0lTT1N0cmluZygpLFxuXHRcdFx0XHRtb21lbnRJbnN0YW5jZS50eigpLFxuXHRcdFx0XHRtb21lbnRJbnN0YW5jZS5sb2NhbGUoKVxuXHRcdFx0KSA6XG5cdFx0XHRuZXcgRGF0ZVRpbWUoXG5cdFx0XHRcdG1vbWVudEluc3RhbmNlLnRvSVNPU3RyaW5nKCB0cnVlICksXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdG1vbWVudEluc3RhbmNlLmxvY2FsZSgpXG5cdFx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGFuIElTTyA4NjAxIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IElTT1N0cmluZ1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tSVNPKFxuXHRcdElTT1N0cmluZyxcblx0XHR0aW1lem9uZSA9IERFRkFVTFRfVElNRVpPTkVfU1RSSU5HLFxuXHRcdGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFXG5cdCkge1xuXHRcdGlmICggaXNFbXB0eSggSVNPU3RyaW5nICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZElTTzg2MDFTdHJpbmcoIElTT1N0cmluZyApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IERhdGVUaW1lKCBJU09TdHJpbmcsIHRpbWV6b25lLCBsb2NhbGUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBJU08gODYwMSBTdHJpbmdcblx0ICogRGlmZmVycyB3aXRoIGBmcm9tSVNPYCBpbiB0aGF0IHRoaXMgYWxsb3dzIHBhc3NpbmcgYSBvZmZzZXQgdmFsdWVcblx0ICogaW5zdGVhZCBvZiBhIHRpbWV6b25lIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IElTT1N0cmluZ1xuXHQgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0ICBJbiBtaW51dGVzIHVubGVzcyA+IC0xNiBvciA8IC0xNiBpbiB3aGljaCBjYXNlIGl0XG5cdCAqIGlzIHRyZWF0ZWQgYXMgaG91cnMuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9ICBBbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGZyb21JU09XaXRoT2Zmc2V0KFxuXHRcdElTT1N0cmluZyxcblx0XHRvZmZzZXQgPSBERUZBVUxUX09GRlNFVCxcblx0XHRsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRVxuXHQpIHtcblx0XHREYXRlVGltZS5hc3NlcnRJU084NjAxSXNWYWxpZCggSVNPU3RyaW5nICk7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0SXNPZmZzZXQoIG9mZnNldCApO1xuXHRcdERhdGVUaW1lLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdGNvbnN0IGRhdGV0aW1lID0gbW9tZW50LnV0YyggSVNPU3RyaW5nIClcblx0XHRcdC51dGNPZmZzZXQoIG9mZnNldCwgdHJ1ZSApXG5cdFx0XHQubG9jYWxlKCBsb2NhbGUgKTtcblx0XHRyZXR1cm4gbmV3IERhdGVUaW1lLmZyb21Nb21lbnQoIGRhdGV0aW1lICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIGZyb20gYSBqYXZhc2NyaXB0IERhdGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGV9IGRhdGVcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRpbWV6b25lXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tSlNEYXRlKFxuXHRcdGRhdGUsXG5cdFx0dGltZXpvbmUgPSBERUZBVUxUX1RJTUVaT05FX1NUUklORyxcblx0XHRsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRVxuXHQpIHtcblx0XHREYXRlVGltZS5hc3NlcnRJc0RhdGUoIGRhdGUgKTtcblx0XHREYXRlVGltZS5hc3NlcnRUaW1lem9uZUlzVmFsaWQoIHRpbWV6b25lICk7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21Nb21lbnQoXG5cdFx0XHRtb21lbnQoIGRhdGUgKS50eiggdGltZXpvbmUgKS5sb2NhbGUoIGxvY2FsZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZXRpbWUgZnJvbSBhIGphdmFzY3JpcHQgRGF0ZSBvYmplY3QuXG5cdCAqXG5cdCAqIFRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhpcyBhbmQgZnJvbUpTRGF0ZSBpcyB0aGF0IHRoaXMgY2FuIGJlIHNldCB3aXRoXG5cdCAqIGFuIG9mZnNldCB2cyBhIHRpbWV6b25lIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGZyb21KU0RhdGVXaXRoT2Zmc2V0KFxuXHRcdGRhdGUsXG5cdFx0b2Zmc2V0ID0gREVGQVVMVF9PRkZTRVQsXG5cdFx0bG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEVcblx0KSB7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0SXNEYXRlKCBkYXRlICk7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0SXNPZmZzZXQoIG9mZnNldCApO1xuXHRcdERhdGVUaW1lLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdHJldHVybiBEYXRlVGltZS5mcm9tTW9tZW50KFxuXHRcdFx0bW9tZW50KCBkYXRlICkudXRjT2Zmc2V0KCBvZmZzZXQgKS5sb2NhbGUoIGxvY2FsZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgKGluIFVUQykgd2l0aCBtaWxsaXNlY29uZHMgZnJvbSBlcG9jaC5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IG1pbGxpc2Vjb25kc1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgZnJvbU1pbGxpc2Vjb25kcyggbWlsbGlzZWNvbmRzLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSApIHtcblx0XHREYXRlVGltZS5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0XHRpZiAoICEgaXNOdW1iZXIoIG1pbGxpc2Vjb25kcyApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ1Byb3ZpZGVkIHZhbHVlIG11c3QgYmUgYSBudW1iZXIgJyArXG5cdFx0XHRcdCdyZXByZXNlbnRpbmcgbWlsbGlzZWNvbmRzIGZyb20gdGhlIGVwb2NoJyApO1xuXHRcdH1cblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudChcblx0XHRcdG1vbWVudCggbWlsbGlzZWNvbmRzICkudXRjKCkubG9jYWxlKCBsb2NhbGUgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIGluIFVUQyB3aXRoIHNlY29uZHMgZnJvbSB0aGUgZXBvY2guXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgZnJvbVVuaXgoIHNlY29uZHMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdERhdGVUaW1lLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdGlmICggISBpc051bWJlciggc2Vjb25kcyApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ1Byb3ZpZGVkIHZhbHVlIG11c3QgYmUgYSBudW1iZXIgJyArXG5cdFx0XHRcdCdyZXByZXNlbnRpbmcgc2Vjb25kcyBmcm9tIHRoZSBlcG9jaCcgKTtcblx0XHR9XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21Nb21lbnQoXG5cdFx0XHRtb21lbnQudW5peCggc2Vjb25kcyApLnV0YygpLmxvY2FsZSggbG9jYWxlIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGFuIG9iamVjdCBvZiB2YWx1ZXMgYXNzdW1pbmcgaXRzIGluIFwibG9jYWxcIlxuXHQgKiB0aW1lIChpZiBydW4gdmlhIGJyb3dzZXIgb3Igc2VydmVyIGlmIHJ1biBzZXJ2ZXIgc2lkZSkuXG5cdCAqXG5cdCAqIFRoZSBvYmplY3QgaXMgZXhwZWN0ZWQgdG8gYmUgYSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGluc3RhbmNlIGluIHRpbWU6XG5cdCAqIEVnLlxuXHQgKiB7IHllYXI6IDIwMTgsIG1vbnRoOiAxMiwgZGF5OiAyNSwgaG91cjogMCwgbWludXRlOiAxNSwgc2Vjb25kczogMCB9XG5cdCAqXG5cdCAqIFBhc3MgYW4gZW1wdHkgdmFsdWVzIHZhbHVlIGlmIHlvdSB3YW50IHRoZSBpbnN0YW5jZSBpbiB0aW1lIHRvIHJlcHJlc2VudFxuXHQgKiBcIm5vd1wiLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEB0aHJvd3MgSW52YWxpZEFyZ3VtZW50XG5cdCAqL1xuXHRzdGF0aWMgZnJvbUxvY2FsKCB2YWx1ZXMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdERhdGVUaW1lLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdHZhbHVlcyA9IERhdGVUaW1lWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0T2JqZWN0IF0oIHZhbHVlcyApO1xuXHRcdGNvbnN0IGRhdGV0aW1lID0gaXNFbXB0eSggdmFsdWVzICkgP1xuXHRcdFx0bW9tZW50KCkubG9jYWxlKCBsb2NhbGUgKSA6XG5cdFx0XHRtb21lbnQoIHZhbHVlcyApLmxvY2FsZSggbG9jYWxlICk7XG5cdFx0aWYgKCBkYXRldGltZS5pc1ZhbGlkKCkgIT09IHRydWUgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50KFxuXHRcdFx0XHQnRG91YmxlLWNoZWNrIHRoZSB2YWx1ZXMgeW91IHNlbnQgaW4uJyxcblx0XHRcdFx0dmFsdWVzXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudCggZGF0ZXRpbWUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBvYmplY3Qgb2YgdmFsdWVzIGFuZCBhc3N1bWVzIGl0cyBpblxuXHQgKiAnVVRDJy5cblx0ICpcblx0ICogVGhlIG9iamVjdCBpcyBleHBlY3RlZCB0byBiZSBhIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgaW5zdGFuY2UgaW4gdGltZTpcblx0ICogRWcuXG5cdCAqIHsgeWVhcjogMjAxOCwgbW9udGg6IDEyLCBkYXk6IDI1LCBob3VyOiAwLCBtaW51dGU6IDE1LCBzZWNvbmRzOiAwIH1cblx0ICpcblx0ICogQW55IHVuaXRzIG5vdCBzcGVjaWZpZWQgd2lsbCBiZSBhc3N1bWVkIHRvIGJlIGAwYC5cblx0ICpcblx0ICogUGFzcyBhbiBlbXB0eSB2YWx1ZXMgdmFsdWUgaWYgeW91IHdhbnQgdGhlIGluc3RhbmNlIGluIHRpbWUgdG8gcmVwcmVzZW50XG5cdCAqIFwibm93XCIuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXNcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICogQHRocm93cyBJbnZhbGlkQXJndW1lbnRcblx0ICovXG5cdHN0YXRpYyB1dGMoIHZhbHVlcywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUgKSB7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0dmFsdWVzID0gRGF0ZVRpbWVbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRPYmplY3QgXSggdmFsdWVzICk7XG5cdFx0Y29uc3QgZGF0ZXRpbWUgPSBpc0VtcHR5KCB2YWx1ZXMgKSA/XG5cdFx0XHRtb21lbnQudXRjKCkubG9jYWxlKCBsb2NhbGUgKSA6XG5cdFx0XHRtb21lbnQudXRjKCB2YWx1ZXMgKS5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdGlmICggZGF0ZXRpbWUuaXNWYWxpZCgpICE9PSB0cnVlICkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudChcblx0XHRcdFx0J0RvdWJsZS1jaGVjayB0aGUgdmFsdWVzIHNlbnQgaW4uJyxcblx0XHRcdFx0dmFsdWVzXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudCggZGF0ZXRpbWUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuXHQgKlxuXHQgKiBUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgY2FuIGhhdmU6XG5cdCAqIC0gYW55IG9mIHRoZSBEYXRlVGltZSB1bml0cyAoJ3llYXInLCAnbW9udGgnLCBldGMpXG5cdCAqIC0gJ2xvY2FsZScgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBsb2NhbGVcblx0ICogLSAndGltZXpvbmUnIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdGltZXpvbmVcblx0ICogLSAnb2Zmc2V0JyBhIG51bWJlciByZXByZXNlbnRpbmcgdGhlIG9mZnNldCBmcm9tIFVUQyB0aGlzIGluc3RhbmNlIGluXG5cdCAqIHRpbWUgcmVwcmVzZW50cy5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHZhbHVlc1xuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tT2JqZWN0KCB2YWx1ZXMgKSB7XG5cdFx0Y29uc3QgbG9jYWxlID0gdmFsdWVzLmxvY2FsZSB8fCBERUZBVUxUX1ZBTElEX0xPQ0FMRTtcblx0XHRjb25zdCB0aW1lem9uZSA9IHZhbHVlcy50aW1lem9uZSB8fCBERUZBVUxUX1RJTUVaT05FX1NUUklORztcblx0XHRjb25zdCBvZmZzZXQgPSBpc1VuZGVmaW5lZCggdmFsdWVzLm9mZnNldCApID9cblx0XHRcdG51bGwgOlxuXHRcdFx0dmFsdWVzLm9mZnNldDtcblx0XHRsZXQgdmFsdWVzRm9yQ29uc3RydWN0ID0gb21pdChcblx0XHRcdHZhbHVlcyxcblx0XHRcdFsgJ2xvY2FsZScsICd0aW1lem9uZScsICdvZmZzZXQnIF1cblx0XHQpO1xuXG5cdFx0RGF0ZVRpbWUuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cblx0XHRpZiAoIG9mZnNldCAhPT0gbnVsbCApIHtcblx0XHRcdERhdGVUaW1lLmFzc2VydElzT2Zmc2V0KCBvZmZzZXQgKTtcblx0XHRcdHZhbHVlc0ZvckNvbnN0cnVjdCA9IERhdGVUaW1lWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0T2JqZWN0IF0oXG5cdFx0XHRcdHZhbHVlc0ZvckNvbnN0cnVjdFxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IGRhdGV0aW1lID0gaXNFbXB0eSggdmFsdWVzRm9yQ29uc3RydWN0ICkgP1xuXHRcdFx0XHRtb21lbnQoKS51dGNPZmZzZXQoIG9mZnNldCwgdHJ1ZSApLmxvY2FsZSggbG9jYWxlICkgOlxuXHRcdFx0XHRtb21lbnQudXRjKCB2YWx1ZXNGb3JDb25zdHJ1Y3QgKVxuXHRcdFx0XHRcdC51dGNPZmZzZXQoIG9mZnNldCwgdHJ1ZSApXG5cdFx0XHRcdFx0LmxvY2FsZSggbG9jYWxlICk7XG5cdFx0XHRpZiAoIGRhdGV0aW1lLmlzVmFsaWQoKSAhPT0gdHJ1ZSApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudChcblx0XHRcdFx0XHQnRG91YmxlLWNoZWNrIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBzZW50IGluLicsXG5cdFx0XHRcdFx0dmFsdWVzXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudCggZGF0ZXRpbWUgKTtcblx0XHR9XG5cblx0XHRpZiAoIHRpbWV6b25lID09PSBEYXRlVGltZS5USU1FWk9ORV9MT0NBTCApIHtcblx0XHRcdHJldHVybiBEYXRlVGltZS5mcm9tTG9jYWwoIHZhbHVlc0ZvckNvbnN0cnVjdCwgbG9jYWxlICk7XG5cdFx0fVxuXG5cdFx0RGF0ZVRpbWUuYXNzZXJ0VGltZXpvbmVJc1ZhbGlkKCB0aW1lem9uZSApO1xuXG5cdFx0dmFsdWVzRm9yQ29uc3RydWN0ID0gRGF0ZVRpbWVbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRPYmplY3QgXShcblx0XHRcdHZhbHVlc0ZvckNvbnN0cnVjdFxuXHRcdCk7XG5cdFx0Y29uc3QgZGF0ZXRpbWUgPSBtb21lbnQudHooIHZhbHVlc0ZvckNvbnN0cnVjdCwgdGltZXpvbmUgKVxuXHRcdFx0LmxvY2FsZSggbG9jYWxlICk7XG5cdFx0aWYgKCBkYXRldGltZS5pc1ZhbGlkKCkgIT09IHRydWUgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50KFxuXHRcdFx0XHQnRG91YmxlLWNoZWNrIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBzZW50IGluLicsXG5cdFx0XHRcdHZhbHVlc1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21Nb21lbnQoIGRhdGV0aW1lICk7XG5cdH1cblxuXHQvKipcblx0ICogTW9tZW50IHVzZXMgZGlmZmVyZW50IG5hbWVzIGZvciBzb21lIHVuaXQgZ2V0dGVycy9zZXR0ZXJzL3Byb3BlcnRpZXMgc29cblx0ICogdGhpcyBpcyB1c2VkIHRvIG5vcm1hbGl6ZSBhIGdpdmVuIHVuaXQgbmFtZSB0byB3aGF0IG1vbWVudCB1c2VzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVRvTm9ybWFsaXplXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gIE5vcm1hbGl6ZWQgdW5pdCBuYW1lLlxuXHQgKi9cblx0c3RhdGljIFsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE5hbWUgXSggbmFtZVRvTm9ybWFsaXplICkge1xuXHRcdGNvbnN0IG1hcCA9IHtcblx0XHRcdGRheTogJ2RhdGUnLFxuXHRcdFx0ZGF5czogJ2RheScsXG5cdFx0XHRkYXRlOiAnZGF5Jyxcblx0XHRcdHllYXJzOiAneWVhcicsXG5cdFx0XHRtb250aHM6ICdtb250aCcsXG5cdFx0XHRtaWxsaXNlY29uZHM6ICdtaWxsaXNlY29uZCcsXG5cdFx0XHRtaW51dGVzOiAnbWludXRlJyxcblx0XHRcdHNlY29uZHM6ICdzZWNvbmQnLFxuXHRcdFx0aG91cnM6ICdob3VyJyxcblx0XHR9O1xuXHRcdHJldHVybiBtYXBbIG5hbWVUb05vcm1hbGl6ZSBdID9cblx0XHRcdG1hcFsgbmFtZVRvTm9ybWFsaXplIF0gOlxuXHRcdFx0bmFtZVRvTm9ybWFsaXplO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgbm9ybWFsaXppbmcgdW5pdCB2YWx1ZXMgZm9yIGludGVybmFsIGxpYnJhcnkgdXNlLlxuXHQgKlxuXHQgKiBGb3IgZXhhbXBsZSwgbW9tZW50IHplcm8gaW5kZXhlcyBtb250aHMuIERhdGVUaW1lIGRvZXMgbm90LCBzbyB0aGlzXG5cdCAqIG1ldGhvZCBoZWxwcyB3aXRoIG5vcm1hbGl6aW5nIG1vbnRoIHZhbHVlcyBmb3IgYm90aCBzZXR0aW5nICh1c2VkIGJ5XG5cdCAqIG1vbWVudCkgYW5kIGdldHRpbmcgKHJldHVybmVkIHRvIGNsaWVudCkuICBUaGlzIGFsbG93cyBjbGllbnQgY29kZVxuXHQgKiB0byBleHBlY3QgbW9udGhzIGluIERhdGVUaW1lIHRvIGJlIGhhbmRsZWQgd2l0aCBhIG5vbi16ZXJvIGluZGV4LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdW5pdCBUaGUgdW5pdCB0byBiZSBub3JtYWxpemVkXG5cdCAqIEBwYXJhbSB7bWl4ZWR9ICB2YWx1ZSBUaGUgdmFsdWUgZm9yIHRoYXQgdW5pdFxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNldCAgV2hldGhlciB0aGlzIHNob3VsZCBub3JtYWxpemUgZm9yIHNldHRpbmcgb3Jcblx0ICogZ2V0dGluZy5cblx0ICogQHJldHVybiB7bWl4ZWR9ICBUaGUgbm9ybWFsaXplZCB2YWx1ZS5cblx0ICovXG5cdHN0YXRpYyBbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRWYWx1ZSBdKCB1bml0LCB2YWx1ZSwgc2V0ID0gdHJ1ZSApIHtcblx0XHRpZiAoIHVuaXQgPT09ICdtb250aCcgKSB7XG5cdFx0XHR2YWx1ZSA9IHNldCA/IHZhbHVlIC0gMSA6IHZhbHVlICsgMTtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdpdmVuIGEgc2ltcGxlIG9iamVjdCBjb250YWluaW5nIHVuaXRzLCB0aGlzIG5vcm1hbGl6ZXMgdGhlIG9iamVjdCB0b1xuXHQgKiB3aGF0IG1vbWVudCByZWNvZ25pemVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2V0T2JqZWN0XG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0ICB0cnVlIGlmIHNldHRpbmcgdGhlIG9iamVjdCwgZmFsc2UgaWYgZ2V0dGluZyB0aGVcblx0ICogb2JqZWN0XG5cdCAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5vcm1hbGl6ZWQgb2JqZWN0LlxuXHQgKi9cblx0c3RhdGljIFsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE9iamVjdCBdKCBzZXRPYmplY3QsIHNldCA9IHRydWUgKSB7XG5cdFx0aWYgKCAhIGlzT2JqZWN0KCBzZXRPYmplY3QgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgaW5jb21pbmcgdmFsdWUgbXVzdCBiZSBhbiBvYmplY3QnXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVkdWNlKCBzZXRPYmplY3QsICggcmVzdWx0LCB2YWx1ZSwga2V5ICkgPT4ge1xuXHRcdFx0a2V5ID0gRGF0ZVRpbWVbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXROYW1lIF0oIGtleSApO1xuXHRcdFx0cmVzdWx0WyBrZXkgXSA9IERhdGVUaW1lWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0VmFsdWUgXShcblx0XHRcdFx0a2V5LFxuXHRcdFx0XHR2YWx1ZSxcblx0XHRcdFx0c2V0XG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LCB7fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGRhdGUgYW5kIHRpbWUgdW5pdCBuYW1lc1xuXHQgKiBAcmV0dXJuIHtzdHJpbmdbXX0gQW4gYXJyYXkgb2YgdW5pdCBuYW1lc1xuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5nZXRVbml0TmFtZXMgXSgpIHtcblx0XHRyZXR1cm4gdmFsaWREYXRlVGltZVVuaXRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgdGhlIHZhcmlvdXMgZ2V0dGVyIGFuZCBzZXR0ZXJzIGZvciB0aGUgdmFsdWUgb2JqZWN0LlxuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5jcmVhdGVHZXR0ZXJzQW5kU2V0dGVycyBdKCkge1xuXHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmdldFVuaXROYW1lcyBdKCkuZm9yRWFjaChcblx0XHRcdCggdW5pdE5hbWUgKSA9PiB7XG5cdFx0XHRcdC8vIGNyZWF0ZXMgYWNjZXNzb3IgZm9yIGdldHRpbmcgdGhlIHVuaXQgdmFsdWUgdmlhIGFcblx0XHRcdFx0Ly8gcHJvcGVydHkgKGVnLiBpbnN0YW5jZS5ob3VyKVxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHRoaXMsIHVuaXROYW1lLCB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgbWV0aG9kTmFtZSA9IERhdGVUaW1lWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0TmFtZSBdKCB1bml0TmFtZSApO1xuXHRcdFx0XHRcdFx0Y29uc3QgdW5pdFZhbHVlID0gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHRcdFx0XHRbIG1ldGhvZE5hbWUgXSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIERhdGVUaW1lWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0VmFsdWUgXShcblx0XHRcdFx0XHRcdFx0dW5pdE5hbWUsXG5cdFx0XHRcdFx0XHRcdHVuaXRWYWx1ZSxcblx0XHRcdFx0XHRcdFx0ZmFsc2Vcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSApO1xuXHRcdFx0XHQvLyBjcmVhdGVzIGEgZmx1ZW50IHNldHRlciBmb3IgdGhlIHZhbHVlLlxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHRoaXMsICdzZXQnICsgY2FwaXRhbGl6ZSggdW5pdE5hbWUgKSwge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAoIHZhbHVlICkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zZXQoIHsgWyB1bml0TmFtZSBdOiB2YWx1ZSB9ICk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVzZWQgdG8gc2V0IHZhcmlvdXMgcGFydHMgb2YgdGhlIGRhdGV0aW1lIHN0cmluZyBhbmQgcmV0dXJucyBhIE5FV1xuXHQgKiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKlxuXHQgKiBOb3RlOiB0aGlzIHdpbGwgY29uc3RydWN0IGEgRGF0ZVRpbWUgZXZlbiB3aXRoIGludmFsaWQgdW5pdHMuIE1ha2UgdXNlIG9mXG5cdCAqIGBpc1ZhbGlkKClgIHRvIGRldGVybWluZSB3aGV0aGVyIHRoZSBpbnN0YW5jZSBpcyBhIHZhbGlkIERhdGVUaW1lIG9yIG5vdC5cblx0ICpcblx0ICogQHBhcmFtIHt7fX0gc2V0T2JqZWN0IEFuIG9iamVjdCB3aGVyZSBrZXlzIGFyZSB0aGUgdW5pdHMuXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfSBBIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZS5cblx0ICovXG5cdHNldCggc2V0T2JqZWN0ID0ge30gKSB7XG5cdFx0c2V0T2JqZWN0ID0gRGF0ZVRpbWVbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRPYmplY3QgXSggc2V0T2JqZWN0ICk7XG5cdFx0cmV0dXJuIG5ldyBEYXRlVGltZShcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0LnNldCggc2V0T2JqZWN0ICkudG9JU09TdHJpbmcoKSxcblx0XHRcdHRoaXMudGltZXpvbmUsXG5cdFx0XHR0aGlzLmxvY2FsZVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQWNjZXNzb3IgZm9yIHRoZSB0aW1lem9uZSBzdHJpbmcuXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHRpbWV6b25lIHN0cmluZ1xuXHQgKi9cblx0Z2V0IHRpbWV6b25lKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnR6KCk7XG5cdH1cblxuXHQvKipcblx0ICogRmx1ZW50IHNldHRlciBmb3IgdGhlIHRpbWV6b25lIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9IFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHNldFRpbWV6b25lKCB0aW1lem9uZSApIHtcblx0XHREYXRlVGltZS5hc3NlcnRUaW1lem9uZUlzVmFsaWQoIHRpbWV6b25lICk7XG5cdFx0cmV0dXJuIG5ldyBEYXRlVGltZShcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0udG9JU09TdHJpbmcoKSxcblx0XHRcdHRpbWV6b25lLFxuXHRcdFx0dGhpcy5sb2NhbGVcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGZvciB0aGUgbW9udGggc2V0IGluIHRoaXMgaW5zdGFuY2UuXG5cdCAqXG5cdCAqIEByZXR1cm4ge251bWJlcn0gIFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbW9udGguXG5cdCAqL1xuXHRnZXQgZGF5c0luTW9udGgoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uZGF5c0luTW9udGgoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IGluc3RhbmNlIGluIHRpbWUgaXMgY3VycmVudGx5IGluIERheWxpZ2h0IFNhdmluZ3Ncblx0ICogVGltZS5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyBpdCBpcyBjdXJyZW50bHkgaW4gRGF5bGlnaHQgU2F2aW5ncyBUaW1lLlxuXHQgKi9cblx0Z2V0IGlzSW5EU1QoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uaXNEU1QoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IGluc3RhbmNlIGluIHRpbWUgaXMgY3VycmVudGx5IGluIGEgbGVhcCB5ZWFyLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoaXMgZGF0ZSB0aW1lIGlzIGluIGEgbGVhcCB5ZWFyLlxuXHQgKi9cblx0Z2V0IGlzSW5MZWFwWWVhcigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5pc0xlYXBZZWFyKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgb2Zmc2V0IGZyb20gVVRDIGZvciB0aGUgY3VycmVudCBpbnN0YW5jZSBpbiB0aW1lIChpbiBtaW51dGVzKS5cblx0ICogQHJldHVybiB7bnVtYmVyfSAgVGhlIG9mZnNldCBpcyBpbiBtaW51dGVzXG5cdCAqL1xuXHRnZXQgb2Zmc2V0KCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnV0Y09mZnNldCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZmx1ZW50IHNldHRlciBmb3IgdGhlIFVUQyBvZmZzZXQuXG5cdCAqXG5cdCAqIFRoZSBvZmZzZXQgcHJvdmlkZWQgZGVmYXVsdHMgdG8gZXhwZWN0aW5nIGluIG1pbnV0ZXMuICBIb3dldmVyIGlmIHRoZVxuXHQgKiBpbnB1dCBpcyBsZXNzIHRoYW4gMTYgYW5kIGdyZWF0ZXIgdGhhbiAtMTYsIGl0IHdpbGwgaW50ZXJwcmV0IHRoZSBpbnB1dFxuXHQgKiBhcyBob3VycyBpbnN0ZWFkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfSByZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzZXRPZmZzZXQoIG9mZnNldCApIHtcblx0XHREYXRlVGltZS5hc3NlcnRJc09mZnNldCggb2Zmc2V0ICk7XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmNsb25lKCkudXRjT2Zmc2V0KCBvZmZzZXQgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgZGF5IG9mIHRoZSB5ZWFyIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpbiB0aGUgb2JqZWN0LlxuXHQgKlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IEEgbnVtYmVyIGJldHdlZW4gMSBhbmQgMzY2IChkZXBlbmRpbmcgb24gd2hldGhlciB0aGVcblx0ICogaW50ZXJuYWwgZGF0ZSBhbmQgdGltZSBpcyBpbiBhIGxlYXAgeWVhciBvciBub3QpLlxuXHQgKi9cblx0Z2V0IGRheU9mWWVhcigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5kYXlPZlllYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBxdWFydGVyIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpbiB0aGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IEEgbnVtYmVyIGJldHdlZW4gMSBhbmQgNFxuXHQgKi9cblx0Z2V0IHF1YXJ0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0ucXVhcnRlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV4cG9zZXMgdGhlIElTTyBudW1iZXIgb2YgdGhlIHdlZWsgZm9yIHRoZSBkYXRlIGFuZCB0aW1lIGluIHRoZSBvYmplY3QuXG5cdCAqIEBsaW5rIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcblx0ICogQHJldHVybiB7bnVtYmVyfSBXaWxsIGJlIGEgbnVtYmVyIGJldHdlZW4gMSBhbmQgNTJpc2hcblx0ICovXG5cdGdldCBpc29XZWVrTnVtYmVyKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmlzb1dlZWsoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBJU08gbnVtYmVyIGZvciB0aGUgd2VlayB5ZWFyIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpbiB0aGVcblx0ICogb2JqZWN0LlxuXHQgKiBAbGluayBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG5cdCAqIEByZXR1cm4ge251bWJlcn0gIFdpbGwgYmUgYSBudW1iZXIgcmVwcmVzZW50aW5nIGEgeWVhci5cblx0ICovXG5cdGdldCBpc29XZWVrWWVhcigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5pc29XZWVrWWVhcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV4cG9zZXMgdGhlIElTTyBudW1iZXIgZm9yIHRoZSBkYXkgb2YgdGhlIHdlZWsgZm9yIHRoZSBkYXRlIGFuZCB0aW1lIGluXG5cdCAqIHRoZSBvYmplY3QuXG5cdCAqIEBsaW5rIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcblx0ICogQHJldHVybiB7bnVtYmVyfSBBIG51bWJlciBiZXR3ZWVuIDEgYW5kIDcgKE1vbmRheSBpcyAxIGFuZCBTdW5kYXkgaXMgNylcblx0ICovXG5cdGdldCBpc29XZWVrRGF5KCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmlzb1dlZWtkYXkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBudW1iZXIgb2Ygd2Vla3MgaW4gdGhpcyBEYXRlVGltZSdzIHllYXIuXG5cdCAqIEBsaW5rIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcblx0ICpcblx0ICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHdlZWtzIGluIHRoZSBJU08geWVhci5cblx0ICovXG5cdGdldCBpc29XZWVrc0luV2Vla1llYXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uaXNvV2Vla3NJblllYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHdoYXQgdGhlIHNldCBsb2NhbGUgaXMgZm9yIHRoaXMgRGF0ZVRpbWVcblx0ICogQHJldHVybiB7c3RyaW5nfSBBIGxvY2FsZSBzdHJpbmdcblx0ICovXG5cdGdldCBsb2NhbGUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0ubG9jYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQSBmbHVlbnQgc2V0dGVyIGZvciBzZXR0aW5nIHRoZSBsb2NhbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9IGEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lIGVxdWl2YWxlbnQgdG8gdGhpcyBvbmUgYnV0XG5cdCAqIHdpdGggZGlmZmVyZW50IGxvY2FsZS5cblx0ICovXG5cdHNldExvY2FsZSggbG9jYWxlICkge1xuXHRcdERhdGVUaW1lLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdHJldHVybiBEYXRlVGltZS5mcm9tTW9tZW50KFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQubG9jYWxlKCBsb2NhbGUgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGlzIERhdGVUaW1lIGluc3RhbmNlIGlzIHZhbGlkLlxuXHQgKlxuXHQgKiBUeXBpY2FsbHkgYW4gaW52YWxpZCBzdGF0ZSBpcyBhY2hpZXZlZCB3aGVuIHRoZSBpbnRlcm5hbCBtb21lbnQgaXNcblx0ICogaW52YWxpZC4gIFRoaXMgY2FuIGhhcHBlbiB3aGVuIHRoZSBtb21lbnQgaW5zdGFuY2UgaXMgY3JlYXRlZCB3aXRoXG5cdCAqIGludmFsaWQgcGFyYW1ldGVycy5cblx0ICpcblx0ICogTm90ZTogd2l0aCBtb21lbnQudGltZXpvbmUgKHdoaWNoIGlzIHRoZSBpbnRlcm5hbCBsaWJyYXJ5KSxcblx0ICogbW9tZW50LmlzVmFsaWQoKSBjb3VsZCByZXR1cm4gdHJ1ZSwgZmFsc2Ugb3IgYSBzdHJpbmcgZm9yIHdoeSBpdCdzXG5cdCAqIGludmFsaWQuICBUaGlzIGlzIHdoeSBhIHN0cmljdCBlcXVhbGl0eSBjaGVjayBpcyBkb25lIGZvciB3aGV0aGVyIGl0IGlzXG5cdCAqIHRydWUgb3Igbm90LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGUgaW5zdGFuY2UgaXMgdmFsaWQuXG5cdCAqL1xuXHRpc1ZhbGlkKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmlzVmFsaWQoKSA9PT0gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIERhdGVUaW1lIGluc3RhbmNlcyBhcyBhIER1cmF0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBvdGhlckRhdGVUaW1lXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBbiBpbnN0YW5jZSBvZiBEdXJhdGlvbiByZXByZXNlbnRpbmcgdGhlIGRpZmZlcmVuY2Vcblx0ICogYmV0d2VlbiB0aGUgdHdvIERhdGVUaW1lIG9iamVjdHMuXG5cdCAqL1xuXHRkaWZmKCBvdGhlckRhdGVUaW1lICkge1xuXHRcdERhdGVUaW1lLmFzc2VydElzRGF0ZVRpbWUoIG90aGVyRGF0ZVRpbWUgKTtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0bW9tZW50LmR1cmF0aW9uKFxuXHRcdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdXG5cdFx0XHRcdFx0LmRpZmYoIG90aGVyRGF0ZVRpbWVbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0gKVxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoaXMgRGF0ZVRpbWUgYW5kIFwibm93XCIgYXMgYSBEdXJhdGlvbi5cblx0ICogQHJldHVybiB7RHVyYXRpb259IEFuIGluc3RhbmNlIG9mIER1cmF0aW9uIHJlcHJlc2VudGluZyB0aGUgZGlmZmVyZW5jZVxuXHQgKiBiZXR3ZWVuIHRoaXMgRGF0ZVRpbWUgYW5kIFwibm93XCJcblx0ICovXG5cdGRpZmZOb3coKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbihcblx0XHRcdG1vbWVudC5kdXJhdGlvbihcblx0XHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHRcdC5kaWZmKCBtb21lbnQoKSApXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIHZhbHVlIG9mIHRoaXMgRGF0ZVRpbWUgdG8gdGhlIGVuZCAoaS5lLiB0aGUgbGFzdCBtaWxsaXNlY29uZCkgb2Zcblx0ICogYSB1bml0IG9mIHRpbWUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1bml0XG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfSBSZXR1cm5zIGEgbmV3IERhdGVUaW1lIGluc3RhbmNlLlxuXHQgKi9cblx0ZW5kT2YoIHVuaXQgKSB7XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmNsb25lKCkuZW5kT2YoIHVuaXQgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgdGhpcyBEYXRlVGltZSB3aXRoIHByb3ZpZGVkIERhdGVUaW1lIGFuZCByZXR1cm5zIHdoZXRoZXIgdGhleVxuXHQgKiBhcmUgZXF1YWwgdG8gZWFjaCBvdGhlci5cblx0ICpcblx0ICogVGhlIHR3byBEYXRlVGltZXMgYXJlIGNvbnNpZGVyZWQgZXF1YWwgaWYgdGhleSByZXByZXNlbnQgdGhlIHNhbWVcblx0ICogbWlsbGlzZWNvbmQsIGhhdmUgdGhlIHNhbWUgem9uZSBhbmQgbG9jYXRpb24sIGFuZCBhcmUgYm90aCB2YWxpZC5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlVGltZX0gb3RoZXJEYXRlVGltZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGV5IGFyZSBlcXVhbFxuXHQgKi9cblx0ZXF1YWxzKCBvdGhlckRhdGVUaW1lICkge1xuXHRcdERhdGVUaW1lLmFzc2VydElzRGF0ZVRpbWUoIG90aGVyRGF0ZVRpbWUgKTtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0LmlzU2FtZSggb3RoZXJEYXRlVGltZVsgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhpcyBEYXRlVGltZSBpcyBpbiB0aGUgc2FtZSB1bml0IG9mIHRpbWUgYXMgYW5vdGhlciBEYXRlVGltZVxuXHQgKlxuXHQgKiBlZy4gRGF0ZVRpbWUuZnJvbUxvY2FsKCkuaGFzU2FtZSggb3RoZXJEVCwgJ2RheScgKSAvL34+IHRydWUgaWYgYm90aCB0aGVcblx0ICogc2FtZSBjYWxlbmRhciBkYXkuXG5cdCAqXG5cdCAqIE5vdGU6IHRoaXMgd2lsbCBtYXRjaCBhbGwgdW5pdHMgZXF1YWwgb3IgbGFyZ2VyLiAgRm9yIGV4YW1wbGUsIHBhc3NpbmcgaW5cblx0ICogYG1vbnRoYCB3aWxsIGNoZWNrIGBtb250aGAgYW5kIGB5ZWFyYC4gIFNvIGl0J3Mgbm90IG9ubHkgY2hlY2tpbmcgaWYgdGhlXG5cdCAqIHR3byBkYXRlcyBzaGFyZSB0aGUgc2FtZSBtb250aCwgYnV0IHRoYXQgdGhleSBhcmUgdGhlIHNhbWUgbW9udGggaW4gdGhlXG5cdCAqIHNhbWUgeWVhci4gIElmIHlvdSBwYXNzZWQgaW4gZGF5LCBpdCB3b3VsZCByZXR1cm4gd2hldGhlciB0aGUgcHJvdmlkZWRcblx0ICogRGF0ZVRpbWUgaXMgaW4gdGhlIHNhbWUgZGF5LCBtb250aCBhbmQgeWVhciBhcyB0aGlzIERhdGVUaW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBvdGhlckRhdGVUaW1lXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1bml0XG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoZXkgYXJlIGJvdGggaW4gdGhlIHNhbWUgdGltZSBmb3IgdGhlXG5cdCAqIGdpdmVuIHVuaXQuXG5cdCAqL1xuXHRoYXNTYW1lKCBvdGhlckRhdGVUaW1lLCB1bml0ICkge1xuXHRcdERhdGVUaW1lLmFzc2VydElzRGF0ZVRpbWUoIG90aGVyRGF0ZVRpbWUgKTtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0LmlzU2FtZSggb3RoZXJEYXRlVGltZVsgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXSwgdW5pdCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFN1YnRyYWN0IGEgcGVyaW9kIG9mIHRpbWUgKHJlcHJlc2VudGVkIGJ5IGEgRHVyYXRpb24pIGZyb20gdGhpcyBEYXRlVGltZVxuXHQgKiBhbmQgcmV0dXJuIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RHVyYXRpb259IGR1cmF0aW9uXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfSBBIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZSBmb3IgdGhlIG5ldyBkYXRlIGFuZCB0aW1lLlxuXHQgKi9cblx0bWludXMoIGR1cmF0aW9uICkge1xuXHRcdER1cmF0aW9uLmFzc2VydElzVmFsaWREdXJhdGlvbiggZHVyYXRpb24gKTtcblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0LnN1YnRyYWN0KCBkdXJhdGlvbi50b09iamVjdCgpIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBhIHBlcmlvZCBvZiB0aW1lIChyZXByZXNlbnRlZCBieSBhIER1cmF0aW9uKSB0byB0aGlzIERhdGVUaW1lIGFuZFxuXHQgKiByZXR1cm4gdGhlIHJlc3VsdGluZyBEYXRlVGltZVxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufSBkdXJhdGlvblxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZX0gQSBuZXcgaW5zdGFuY2Ugb2YgRGF0ZVRpbWUgZm9yIHRoZSBuZXcgZGF0ZSBhbmQgdGltZS5cblx0ICovXG5cdHBsdXMoIGR1cmF0aW9uICkge1xuXHRcdER1cmF0aW9uLmFzc2VydElzVmFsaWREdXJhdGlvbiggZHVyYXRpb24gKTtcblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0LmFkZCggZHVyYXRpb24udG9PYmplY3QoKSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIHZhbHVlIG9mIHRoaXMgRGF0ZVRpbWUgdG8gdGhlIGJlZ2lubmluZyBvZiBhIHNwZWNpZmllZCB1bml0IG9mXG5cdCAqIHRpbWUgYW5kIHJldHVybiBhIG5ldyBEYXRlVGltZSByZXByZXNlbnRpbmcgdGhhdC5cblx0ICpcblx0ICogZWcuXG5cdCAqIHN0YXJ0T2YoIERhdGVUaW1lLlVOSVRfWUVBUiApIC8vc2V0cyB0byBKYW51YXJ5IDFzdCwgMTI6MDBhbSB0aGlzXG5cdCAqIHllYXIuXG5cdCAqIHN0YXJ0T2YoIERhdGVUaW1lLlVOSVRfTU9OVEggKSAvL3NldHMgdG8gdGhlIGZpcnN0IG9mIHRoaXMgbW9udGgsIDEyOjAwYW1cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHVuaXRcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9IEEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzdGFydE9mKCB1bml0ICkge1xuXHRcdHJldHVybiBEYXRlVGltZS5mcm9tTW9tZW50KFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5jbG9uZSgpLnN0YXJ0T2YoIHVuaXQgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lIGZvcm1hdHRlZCBhY2NvcmRpbmcgdG9cblx0ICogdGhlIHNwZWNpZmllZCBmb3JtYXQgc3RyaW5nLlxuXHQgKlxuXHQgKiBAbGluayBodHRwczovL21vbWVudGpzLmNvbS9kb2NzLyMvZGlzcGxheWluZy9mb3JtYXQvXG5cdCAqIEBzZWUgTW9tZW50IGZvcm1hdCBeXiBzZWN0aW9uIGZvciB0aGUgYXZhaWxhYmxlIGZvcm1hdHMgdGhhdCBjYW4gYmUgdXNlZC5cblx0ICpcblx0ICogQW4gZW1wdHkgZm9ybWF0IHZhbHVlIHdpbGwgcmV0dXJuIHRoZSBzdHJpbmcgZm9ybWF0dGVkIGluIElTTyA4NjAxIHdpdGhcblx0ICogYW55IG9mZnNldCBpbmNsdWRlZC5cblx0ICpcblx0ICogV2l0aG91dCBhbnkgYXJndW1lbnQgcGFzc2VkLCB0aGUgZm9ybWF0IHdpbGwgYmUgd2hhdGV2ZXIgc3RyaW5nIHRoZVxuXHQgKiBmb3JtYXQgaXMgc2VydmVyIHNpZGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXRcblx0ICogQHJldHVybiB7c3RyaW5nfSAgVGhlIGRhdGUgYW5kIHRpbWUgZGlzcGxheWVkIGFjY29yZGluZyB0byB0aGUgcHJvdmlkZWRcblx0ICogZm9ybWF0LlxuXHQgKi9cblx0dG9Gb3JtYXQoIGZvcm1hdCA9IERFRkFVTFRfRk9STUFUICkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmZvcm1hdCggZm9ybWF0ICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lIGZvcm1hdHRlZCBhY2NvcmRpbmcgdG9cblx0ICogdGhlIElTTyA4NjAxIHN0YW5kYXJkLlxuXHQgKlxuXHQgKiBJZiBgaW5VVENgIGlzIHRydWUgKGRlZmF1bHQpIHRoZW4gYHRvSVNPYCB3aWxsIHJldHVybiB0aGUgSVNPIHN0cmluZyBpblxuXHQgKiBVVEMuIE90aGVyd2lzZSBpdCB3aWxsIGluY2x1ZGUgdGhlIG9mZnNldCBpbmZvcm1hdGlvbiBmb3IgdGhlIGludGVybmFsXG5cdCAqIHRpbWV6b25lL29mZnNldCBvbiB0aGUgbW9tZW50IGluIHRpbWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5VVENcblx0ICogQHJldHVybiB7c3RyaW5nfSBBbiBJU084NjAxIHN0cmluZ1xuXHQgKi9cblx0dG9JU08oIGluVVRDID0gdHJ1ZSApIHtcblx0XHRyZXR1cm4gaW5VVEMgP1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS50b0lTT1N0cmluZygpIDpcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0udG9JU09TdHJpbmcoIHRydWUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBmb3IgdGhpcyBEYXRlVGltZSBhcyBhIGphdmFzY3JpcHQgRGF0ZSBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0RhdGV9IEEgamF2YXNjcmlwdCBEYXRlIGluc3RhbmNlXG5cdCAqL1xuXHR0b0pTRGF0ZSgpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS50b0RhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGVuIHNlcmlhbGl6aW5nIGFuIG9iamVjdCB0byBKU09OLCBpZiB0aGVyZSBpcyBhIERhdGVUaW1lIGluc3RhbmNlLCBpdFxuXHQgKiB3aWxsIGJlIHJlcHJlc2VudGVkIGFzIGFuIElTTzg2MDEgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IEFuIElTTyA4NjAxIHN0cmluZ1xuXHQgKi9cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnRvSVNPU3RyaW5nKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBEYXRlVGltZSB0byB3aGF0ZXZlciB0aGUgXCJsb2NhbFwiIHRpbWUgaXMuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgRGF0ZVRpbWVcblx0ICovXG5cdHRvTG9jYWwoKSB7XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmNsb25lKCkubG9jYWwoKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgbWlsbGlzZWNvbmRzIHNpbmNlIHRoZSBVbml4IEVwb2NoIGZvciB0aGUgY3VycmVudCBEYXRlVGltZVxuXHQgKiBpbnN0YW5jZS5cblx0ICogQHJldHVybiB7bnVtYmVyfSBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIHNpbmNlIFVuaXggRXBvY2hcblx0ICovXG5cdHRvTWlsbGlzKCkge1xuXHRcdHJldHVybiB0aGlzLnZhbHVlT2YoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgc2ltcGxlIG9iamVjdCBjb250YWluaW5nIHllYXIsIG1vbnRoLCBkYXksIGhvdXIsXG5cdCAqIG1pbnV0ZSwgc2Vjb25kLCBhbmQgbWlsbGlzZWNvbmQuXG5cdCAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IHdpdGggeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsXG5cdCAqIGFuZCBtaWxsaXNlY29uZC5cblx0ICovXG5cdHRvT2JqZWN0KCkge1xuXHRcdGNvbnN0IGRhdGV0aW1lID0gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS50b09iamVjdCgpO1xuXHRcdHJldHVybiByZWR1Y2UoIGRhdGV0aW1lLCAoIHJlc3VsdCwgdmFsdWUsIGtleSApID0+IHtcblx0XHRcdGtleSA9IERhdGVUaW1lWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0TmFtZSBdKCBrZXkgKTtcblx0XHRcdHJlc3VsdFsga2V5IF0gPSBEYXRlVGltZVsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdFZhbHVlIF0oXG5cdFx0XHRcdGtleSxcblx0XHRcdFx0dmFsdWUsXG5cdFx0XHRcdGZhbHNlXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LCB7fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIHRoZSBEYXRlVGltZSdzIHRpbWV6b25lIHRvIFVUQy5cblx0ICpcblx0ICogQHJldHVybiB7RGF0ZVRpbWV9IEEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHR0b1VUQygpIHtcblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uY2xvbmUoKS51dGMoKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBlbmdsaXNoIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lIHdoZW4gdGhlIGluc3RhbmNlIGlzXG5cdCAqIGNvZXJjZWQgdG8gYSBzdHJpbmcgKHNpbWlsYXIgZm9ybWF0IHRvIEpTIGBEYXRlLnRvU3RyaW5nKClgLlxuXHQgKlxuXHQgKiBlZyBgVHVlIERlYyAyNSAyMDE4IDEwOjE1OjAwIEdNVCswMDAwYFxuXHQgKlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IEEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWVcblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnRvU3RyaW5nKCk7XG5cdH1cblxuXHQvKipcblx0ICogV2hlbiBEYXRlVGltZSBpcyBjb2VyY2VkIHRvIG51bWJlciB0aGlzIHdpbGwgZW5zdXJlIGl0cyBkaXNwbGF5ZWQgYXMgdGhlXG5cdCAqIG51bWJlciBvZiBtaWxsaXNlY29uZHMgc2luY2UgdGhlIFVuaXggRXBvY2ggZm9yIHRoZSBjdXJyZW50IERhdGVUaW1lXG5cdCAqXG5cdCAqIEByZXR1cm4ge251bWJlcn0gQW1vdW50IG9mIG1pbGxpc2Vjb25kcyBzaW5jZSB0aGUgVW5peCBFcG9jaFxuXHQgKi9cblx0dmFsdWVPZigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS52YWx1ZU9mKCk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGVzZSBzdGF0aWMgcHJvcGVydGllcyBuZWVkIHRvIGJlIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgY2xhc3MgZGVmaW5pdGlvblxuICogYmVjYXVzZSBvZiBjb21waWxlIGlzc3Vlcy5cbiAqL1xuRGF0ZVRpbWUuVU5JVF9ZRUFSID0gJ3llYXInO1xuRGF0ZVRpbWUuVU5JVF9NT05USCA9ICdtb250aCc7XG5EYXRlVGltZS5VTklUX0RBWSA9ICdkYXknO1xuRGF0ZVRpbWUuVU5JVF9IT1VSID0gJ2hvdXInO1xuRGF0ZVRpbWUuVU5JVF9NSU5VVEUgPSAnbWludXRlJztcbkRhdGVUaW1lLlVOSVRfU0VDT05EID0gJ3NlY29uZCc7XG5EYXRlVGltZS5VTklUX01JTExJU0VDT05EID0gJ21pbGxpc2Vjb25kJztcbkRhdGVUaW1lLlRJTUVaT05FX0xPQ0FMID0gJ2xvY2FsJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRUSU1FWk9ORV9DT05GSUcsXG5cdFNFUlZFUl9MT0NBTEUsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHtcblx0Rk9STUFUX1NJVEVfREFURSxcblx0Rk9STUFUX1NJVEVfVElNRSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaGVscGVycyc7XG5pbXBvcnQgeyB2YWxpZGF0ZUxvY2FsZSB9IGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5cbmltcG9ydCB7IHNuYWtlQ2FzZSB9IGZyb20gJ2xvZGFzaCc7XG4vKipcbiAqIERlZmF1bHQgdGltZXpvbmUgc3RyaW5nIHRvIHVzZS5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9USU1FWk9ORV9TVFJJTkcgPSBUSU1FWk9ORV9DT05GSUcuc3RyaW5nID09PSAnJyA/XG5cdCdVVEMnIDpcblx0VElNRVpPTkVfQ09ORklHLnN0cmluZztcblxuLyoqXG4gKiBEZWZhdWx0IG9mZnNldFxuICpcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX09GRlNFVCA9IFRJTUVaT05FX0NPTkZJRy5vZmZzZXQ7XG5cbi8qKlxuICogV2hldGhlciB0aGVyZSBpcyBhIGRlZmF1bHQgdGltZXpvbmUgc3RyaW5nIHRvIHVzZS5cbiAqIFRoaXMgaGVscHMgd2l0aCBkZXRlcm1pbmluZyB3aGV0aGVyIHRvIHVzZSB0aGUgb2Zmc2V0IG9yIG5vdCBmb3IgY29uc3RydWN0aW5nXG4gKiBEYXRlVGltZSB2YWx1ZSBvYmplY3RzLlxuICpcbiAqIEB0eXBlIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgSEFTX1RJTUVaT05FX1NUUklORyA9IChcblx0REVGQVVMVF9USU1FWk9ORV9TVFJJTkcgIT09ICdVVEMnIHx8XG5cdCEgKCBERUZBVUxUX1RJTUVaT05FX1NUUklORyA9PT0gJ1VUQycgJiYgREVGQVVMVF9PRkZTRVQgIT09IDAgKVxuKTtcblxuLyoqXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfRk9STUFUID0gRk9STUFUX1NJVEVfREFURSArICcgJyArIEZPUk1BVF9TSVRFX1RJTUU7XG5cbi8qKlxuICogRXhwb3NlcyB3aGF0IHRvIHVzZSBmb3IgdGhlIGRlZmF1bHQgbG9jYWxlLlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9DQUxFID0gc25ha2VDYXNlKCBTRVJWRVJfTE9DQUxFLnVzZXIgKTtcblxuLyoqXG4gKiBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgcHJvdmlkZWQgbG9jYWxlIGlzIHZhbGlkLiAgU28gaWYgYERFRkFVTFRfTE9DQUxFYCBpc1xuICogbm90IHZhbGlkIGZvciB0aGlzIGVudmlyb25tZW50LCB0aGVuIGEgZmFsbGJhY2sgb2YgJ2VuJyBsb2NhbGUgaXMgdXNlZC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9WQUxJRF9MT0NBTEUgPSB2YWxpZGF0ZUxvY2FsZSggREVGQVVMVF9MT0NBTEUgKSA/XG5cdERFRkFVTFRfTE9DQUxFIDpcblx0J2VuJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgbW9tZW50RHVyYXRpb25Gb3JtYXRTZXR1cCBmcm9tICdtb21lbnQtZHVyYXRpb24tZm9ybWF0JztcbmltcG9ydCB7IGNhcGl0YWxpemUsIHBpY2ssIGtleXMsIG9taXQsIG1hcFZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgaXNTaGFsbG93RXF1YWwgZnJvbSAnQHdvcmRwcmVzcy9pcy1zaGFsbG93LWVxdWFsJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuaW1wb3J0IHsgaW5zdGFuY2VPZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgYXNzZXJ0aW9ucyBmcm9tICcuL2Fzc2VydGlvbnMnO1xuaW1wb3J0IHtcblx0REVGQVVMVF9WQUxJRF9MT0NBTEUsXG59IGZyb20gJy4vZGVmYXVsdHMnO1xuXG5tb21lbnREdXJhdGlvbkZvcm1hdFNldHVwKCBtb21lbnQgKTtcblxuLyoqXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc3ltYm9scyB1c2VkIGZvciBcInByaXZhdGVcIiBwcm9wZXJ0aWVzIGluIHRoZSBEdXJhdGlvbiBvYmplY3QuXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRkdXJhdGlvbjogU3ltYm9sLFxuICogXHRcdHZhbHVlczogU3ltYm9sLFxuICogXHRcdGlzVmFsaWQ6IFN5bWJvbCxcbiAqIFx0fVxuICogfVxuICovXG5jb25zdCBwcml2YXRlUHJvcGVydGllcyA9IHtcblx0ZHVyYXRpb246IFN5bWJvbCggJ0R1cmF0aW9uUHJpdmF0ZVByb3BlcnRpZXNEdXJhdGlvbicgKSxcblx0ZHVyYXRpb25WYWx1ZXM6IFN5bWJvbCggJ0R1cmF0aW9uUHJpdmF0ZVByb3BlcnRpZXNEdXJhdGlvblZhbHVlcycgKSxcblx0aXNWYWxpZDogU3ltYm9sKCAnRHVyYXRpb25Qcml2YXRlUHJvcGVydGllc0lzVmFsaWQnICksXG59O1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBzeW1ib2xzIHVzZWQgZm9yIFwicHJpdmF0ZVwiIG1ldGhvZHMgaW4gdGhlIER1cmF0aW9uIG9iamVjdC5cbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGNyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzOiBTeW1ib2wsXG4gKiBcdFx0Z2V0QWxsVW5pdE5hbWVzOiBTeW1ib2wsXG4gKiBcdFx0cG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb246IFN5bWJvbCxcbiAqIFx0XHRzZXRWYWx1ZXM6IFN5bWJvbCxcbiAqIFx0ICAgIGZpbHRlclZhbHVlczogU3ltYm9sLFxuICogXHR9XG4gKiB9XG4gKi9cbmNvbnN0IHByaXZhdGVNZXRob2RzID0ge1xuXHRjcmVhdGVHZXR0ZXJzOiBTeW1ib2woICdEdXJhdGlvblByaXZhdGVNZXRob2RzQ3JlYXRlR2V0dGVycycgKSxcblx0Z2V0QWxsVW5pdE5hbWVzOiBTeW1ib2woICdEdXJhdGlvblByaXZhdGVNZXRob2RzR2V0QWxsVW5pdE5hbWVzJyApLFxuXHRwb3B1bGF0ZVZhbHVlc0Zyb21EdXJhdGlvbjogU3ltYm9sKFxuXHRcdCdEdXJhdGlvblByaXZhdGVNZXRob2RzUG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb24nXG5cdCksXG5cdHNldFZhbHVlczogU3ltYm9sKCAnRHVyYXRpb25Qcml2YXRlTWV0aG9kc1NldFZhbHVlcycgKSxcblx0ZmlsdGVyVmFsdWVzOiBTeW1ib2woICdEdXJhdGlvblByaXZhdGVNZXRob2RzRmlsdGVyVmFsdWVzJyApLFxufTtcblxuLyoqXG4gKiBBbiBhcnJheSBvZiB1bml0IG5hbWVzIGZvciBwcm9wZXJ0aWVzIGluIHRoZSBEdXJhdGlvbiBvYmplY3RcbiAqIEB0eXBlIHtzdHJpbmdbXX1cbiAqL1xuY29uc3QgdW5pdE5hbWVzID0gW1xuXHQneWVhcnMnLFxuXHQnbW9udGhzJyxcblx0J2RheXMnLFxuXHQnaG91cnMnLFxuXHQnbWludXRlcycsXG5cdCdzZWNvbmRzJyxcblx0J21pbGxpc2Vjb25kcycsXG5dO1xuXG4vKipcbiAqIEFuIGFycmF5IG9mIGRlcml2YXRpdmUgdW5pdCBuYW1lcy5cbiAqIFRoZXNlIGFyZSBhY2Nlc3NvcnMgdGhhdCBhcmUgZGVyaXZhdGl2ZXMgb2YgYmFzZSB1bml0cy4gIEZvciBpbnN0YW5jZSxcbiAqIFwid2Vla3NcIiBlbmRzIHVwIGJlaW5nIGEgZGVyaXZhdGl2ZSAoY2FsY3VsYXRlZCBmcm9tKSB0aGUgXCJkYXlzXCIgdW5pdC5cbiAqIEB0eXBlIHtzdHJpbmdbXX1cbiAqL1xuY29uc3QgZGVyaXZhdGl2ZVVuaXROYW1lcyA9IFtcblx0J3dlZWtzJyxcbl07XG5cbi8qKlxuICogV2hlcmUgYSBEYXRlVGltZSBvYmplY3QgcmVwcmVzZW50cyBhIHNpbmdsZSBwb2ludCBpbiB0aW1lLCBhIER1cmF0aW9uIG9iamVjdFxuICogcmVwcmVzZW50cyBhIGxlbmd0aCBvZiB0aW1lLlxuICpcbiAqIER1cmF0aW9ucyBkbyBub3QgaGF2ZSBhIGRlZmluZWQgYmVnaW5uaW5nIGFuZCBlbmQgZGF0ZS4gIFRoZXkgYXJlIGNvbnRleHRsZXNzLlxuICpcbiAqIEFzIGFuIGV4YW1wbGUsIGR1cmF0aW9ucyBhcmUgcmVwcmVzZW50YXRpdmUgb2Ygc29tZXRoaW5nIGxpa2UgXCIyIGhvdXJzXCIgYW5kXG4gKiBub3QgcmVwcmVzZW50YXRpdmUgb2Ygc29tZXRoaW5nIGxpa2UgXCJiZXR3ZWVuIDFwbSBhbmQgM3BtXCIuXG4gKlxuICogSW50ZXJuYWxseSwgdGhlIER1cmF0aW9uIGNsYXNzIGhlcmUgdXNlcyBgbW9tZW50LkR1cmF0aW9uYC4gIFRoaXMgaXMgYW5cbiAqIGFic3RyYWN0aW9uIGxvb3NlbHkgZm9sbG93aW5nIHRoZSBhZGFwdGVyIHBhdHRlcm4gc28gdGhhdCB0aGVyZSBpcyBhIGNvbW1vblxuICogYXBpIHRoYXQgY2FuIGJlIGRlcGVuZGVkIG9uIGlmIGluIHRoZSBmdXR1cmUgdGhlIGludGVybmFsIGxpYnJhcnkgaXMgc3dpdGNoZWRcbiAqIHRvIHNvbWV0aGluZyBkaWZmZXJlbnQgKHN1Y2ggYXMgTHV4b24pLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEdXJhdGlvbiB7XG5cdHN0YXRpYyBVTklUX1lFQVJTID0gJ3llYXJzJztcblx0c3RhdGljIFVOSVRfTU9OVEhTID0gJ21vbnRocyc7XG5cdHN0YXRpYyBVTklUX0RBWVMgPSAnZGF5cyc7XG5cdHN0YXRpYyBVTklUX0hPVVJTID0gJ2hvdXJzJztcblx0c3RhdGljIFVOSVRfTUlOVVRFUyA9ICdtaW51dGVzJztcblx0c3RhdGljIFVOSVRfU0VDT05EUyA9ICdzZWNvbmRzJztcblx0c3RhdGljIFVOSVRfTUlMTElTRUNPTkRTID0gJ21pbGxpc2Vjb25kcyc7XG5cdHN0YXRpYyBVTklUX1dFRUtTID0gJ3dlZWtzJztcblxuXHQvKipcblx0ICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgRHVyYXRpb24gY2xhc3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fG1vbWVudC5EdXJhdGlvbnxzdHJpbmd8bnVtYmVyfSB2YWx1ZXNcblx0ICogUmVjZWl2aW5nIGEgbW9tZW50LkR1cmF0aW9uIG9iamVjdCBpcyBzb21ldGhpbmcgZm9yIGludGVybmFsIHVzZSBhbmQgc2hvdWxkIG5vdCBiZSB1c2VkIGRpcmVjdGx5IHZpYVxuXHQgKiBjbGllbnQgY29kZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZSAgQSB2YWxpZCBsb2NhbGUgc3RyaW5nLlxuXHQgKiBcdFx0XHRcdFx0XHRcdEBsaW5rIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzU2NDZcblx0ICovXG5cdGNvbnN0cnVjdG9yKCB2YWx1ZXMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmlzVmFsaWQgXSA9IHRydWU7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0XHRpZiAoIHR5cGVvZiB2YWx1ZXMgIT09ICdvYmplY3QnICkge1xuXHRcdFx0dmFsdWVzID0gbW9tZW50LmR1cmF0aW9uKCB2YWx1ZXMgKS5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdH1cblx0XHRpZiAoIG1vbWVudC5pc0R1cmF0aW9uKCB2YWx1ZXMgKSApIHtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF0gPSB2YWx1ZXM7XG5cdFx0XHR0aGlzWyBwcml2YXRlTWV0aG9kcy5wb3B1bGF0ZVZhbHVlc0Zyb21EdXJhdGlvbiBdKCB2YWx1ZXMgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFsdWVzID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMuZmlsdGVyVmFsdWVzIF0oIHZhbHVlcyApO1xuXHRcdFx0dGhpc1sgcHJpdmF0ZU1ldGhvZHMuc2V0VmFsdWVzIF0oIHZhbHVlcyApO1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXSA9IG1vbWVudC5kdXJhdGlvbihcblx0XHRcdFx0dmFsdWVzXG5cdFx0XHQpLmxvY2FsZSggbG9jYWxlICk7XG5cdFx0fVxuXHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmNyZWF0ZUdldHRlcnMgXSgpO1xuXHRcdE9iamVjdC5mcmVlemUoIHRoaXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgRHVyYXRpb24gZnJvbSBhIG51bWJlciBvZiBtaWxsaXNlY29uZHMuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBtaWxsaXNlY29uZHNcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gIEFuIGluc3RhbmNlIG9mIER1cmF0aW9uLlxuXHQgKi9cblx0c3RhdGljIGZyb21NaWxsaXNlY29uZHMoIG1pbGxpc2Vjb25kcywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUgKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbiggeyBtaWxsaXNlY29uZHMgfSwgbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uIGZyb20gYSBzaW1wbGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzICBLZXlzIHNob3VsZCBiZSB0aGUgdW5pdHMgKGVnICd5ZWFycycsICdkYXlzJykuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RHVyYXRpb259IEFuIGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRzdGF0aWMgZnJvbU9iamVjdCggdmFsdWVzLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSApIHtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKCB2YWx1ZXMsIGxvY2FsZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBEdXJhdGlvbiBmcm9tIGFuIElTTzg2MDEgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gSVNPU3RyaW5nIChlZy4gJ1BUMjNIJylcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQW4gaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdHN0YXRpYyBmcm9tSVNPKCBJU09TdHJpbmcsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SVNPODYwMUlzVmFsaWQoIElTT1N0cmluZywgdHJ1ZSApO1xuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oIElTT1N0cmluZywgbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGUgd2hldGhlciB0aGUgcHJvdmlkZWQgbG9jYWxlIGFyZ3VtZW50IGlzIGEgdmFsaWQgbG9jYWxlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIGlzVmFsaWRMb2NhbGUoIGxvY2FsZSApIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZUxvY2FsZSggbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCBsb2NhbGUgYXJndW1lbnQgaXMgYSB2YWxpZCBsb2NhbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHRocm93cyBJbnZhbGlkTG9jYWxlXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNWYWxpZExvY2FsZSggbG9jYWxlICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGUgd2hldGhlciB0aGUgcHJvdmlkZWQgc3RyaW5nIGlzIGEgdmFsaWQgSVNPIDg2MDEgRHVyYXRpb24gc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaXNvU3RyaW5nXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgaXQgaXMgdmFsaWQuXG5cdCAqL1xuXHRzdGF0aWMgaXNWYWxpZElTTzg2MDFEdXJhdGlvbiggaXNvU3RyaW5nICkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlSVNPODYwMSggaXNvU3RyaW5nLCB0cnVlICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0IHdoZXRoZXIgdGhlIHByb3ZpZGVkIHN0cmluZyBpcyBhIHZhbGlkIElTTyA4NjAxIER1cmF0aW9uIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlzb1N0cmluZ1xuXHQgKiBAdGhyb3dzIEludmFsaWRJU084NjAxU3RyaW5nXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNWYWxpZElTTzg2MDFEdXJhdGlvbiggaXNvU3RyaW5nICkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SVNPODYwMUlzVmFsaWQoIGlzb1N0cmluZyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIGluc3RhbmNlIG9mIER1cmF0aW9uLlxuXHQgKiBAcGFyYW0ge21peGVkfER1cmF0aW9ufWR1cmF0aW9uXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIGEgdmFsaWQgRHVyYXRpb24gb2JqZWN0LlxuXHQgKi9cblx0c3RhdGljIGlzVmFsaWREdXJhdGlvbiggZHVyYXRpb24gKSB7XG5cdFx0cmV0dXJuIGluc3RhbmNlT2YoIGR1cmF0aW9uLCAnRHVyYXRpb24nICkgJiZcblx0XHRcdGR1cmF0aW9uLmlzVmFsaWQ7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIER1cmF0aW9uIGFuZCB0aHJvd3MgYW5cblx0ICogZXhjZXB0aW9uIGlmIG5vdC5cblx0ICogQHBhcmFtIHttaXhlZHxEdXJhdGlvbn0gZHVyYXRpb25cblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc1ZhbGlkRHVyYXRpb24oIGR1cmF0aW9uICkge1xuXHRcdGlmICggISBEdXJhdGlvbi5pc1ZhbGlkRHVyYXRpb24oIGR1cmF0aW9uICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhpcyBEdXJhdGlvbiBvYmplY3QgaXMgbm90IHZhbGlkLidcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEdXJhdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbnxtaXhlZH0gZHVyYXRpb25cblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhlIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uLlxuXHQgKiBOb3RlOiB0cnVlIG1heSBzdGlsbCBtZWFuIHRoYXQgdGhlIER1cmF0aW9uIGluc3RhbmNlIGlzIG5vdCB2YWxpZCFcblx0ICovXG5cdHN0YXRpYyBpc0R1cmF0aW9uKCBkdXJhdGlvbiApIHtcblx0XHRyZXR1cm4gaW5zdGFuY2VPZiggZHVyYXRpb24sICdEdXJhdGlvbicgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uIGFuZCBpZiBub3Rcblx0ICogdGhyb3dzIGFuIGV4Y2VwdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbnxtaXhlZH0gZHVyYXRpb25cblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc0R1cmF0aW9uKCBkdXJhdGlvbiApIHtcblx0XHRpZiAoICEgRHVyYXRpb24uaXNEdXJhdGlvbiggZHVyYXRpb24gKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuIGluc3RhbmNlIG9mIER1cmF0aW9uLidcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgZmlsdGVycyB0aGUgaW5jb21pbmcgdmFsdWVzIGFuZCByZXR1cm5zIG9ubHkga2V5L3ZhbHVlIHBhaXJzIHRoYXRcblx0ICogYXJlIGFjY2VwdGFibGUgYXMgZHVyYXRpb24gdW5pdHMuXG5cdCAqXG5cdCAqIElmIGEgaW52YWxpZCBkdXJhdGlvbiB1bml0IGlzIGRpc2NvdmVyZWQsIGEgY29uc29sZS5lcnJvciBpcyBnZW5lcmF0ZWRcblx0ICogKGluIG5vbi1wcm9kdWN0aW9uIG1vZGUpLlxuXHQgKlxuXHQgKiBAcGFyYW0ge21peGVkfSB2YWx1ZXNcblx0ICogQHJldHVybiB7T2JqZWN0fSBGaWx0ZXJlZCB2YWx1ZXMuXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yIGlmIGluY29taW5nIHZhbHVlcyBhcmd1bWVudCBpcyBub3QgYW4gb2JqZWN0LlxuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5maWx0ZXJWYWx1ZXMgXSggdmFsdWVzICkge1xuXHRcdGlmICggdHlwZW9mIHZhbHVlcyAhPT0gJ29iamVjdCcgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnSW5jb21pbmcgdmFsdWVzIG11c3QgYmUgYSBzaW1wbGUgb2JqZWN0LicgKTtcblx0XHR9XG5cdFx0Y29uc3QgdmFsdWVzVG9TZXQgPSBwaWNrKCB2YWx1ZXMsIHVuaXROYW1lcyApO1xuXHRcdGlmICggISBpc1NoYWxsb3dFcXVhbCggdmFsdWVzLCB2YWx1ZXNUb1NldCApICkge1xuXHRcdFx0d2FybmluZyhcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdCdUaGUgZm9sbG93aW5nIHVuZXhwZWN0ZWQga2V5cyB3ZXJlIGluIHRoZSBjb25maWd1cmF0aW9uICcgK1xuXHRcdFx0XHQnb2JqZWN0IGZvciBjb25zdHJ1Y3RpbmcgdGhlIER1cmF0aW9uOiAnICtcblx0XHRcdFx0a2V5cyggb21pdCggdmFsdWVzLCB1bml0TmFtZXMgKSApLmpvaW4oKVxuXHRcdFx0KTtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmlzVmFsaWQgXSA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWVzVG9TZXQ7XG5cdH1cblxuXHQvKipcblx0ICogVXNlZCB0byBzZXQgdGhlIGludGVybmFsIFwicHJpdmF0ZVwiIHZhbHVlcyBwcm9wZXJ0eS5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHZhbHVlc1xuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdFsgcHJpdmF0ZU1ldGhvZHMuc2V0VmFsdWVzIF0oIHZhbHVlcyApIHtcblx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvblZhbHVlcyBdID0ge307XG5cdFx0dW5pdE5hbWVzLmZvckVhY2goICggdW5pdCApID0+IHtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uVmFsdWVzIF1bIHVuaXQgXSA9IHZhbHVlc1sgdW5pdCBdIHx8XG5cdFx0XHRcdDA7XG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVzZWQgdG8gc2V0IHRoZSB2YWx1ZXMgXCJwcml2YXRlXCIgcHJvcGVydHkgZnJvbSBhIG1vbWVudC5EdXJhdGlvbiBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bW9tZW50LkR1cmF0aW9ufSBkdXJhdGlvblxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdFsgcHJpdmF0ZU1ldGhvZHMucG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb24gXSggZHVyYXRpb24gKSB7XG5cdFx0Y29uc3Qgc2V0VmFsdWVzID0ge307XG5cdFx0dW5pdE5hbWVzLmZvckVhY2goICggdW5pdCApID0+IHtcblx0XHRcdHNldFZhbHVlc1sgdW5pdCBdID0gZHVyYXRpb25bIHVuaXQgXSgpO1xuXHRcdH0gKTtcblx0XHR0aGlzWyBwcml2YXRlTWV0aG9kcy5zZXRWYWx1ZXMgXSggc2V0VmFsdWVzICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBhcnJheSBvZiBhY2Nlc3NvciBuYW1lcyAodGhhdCBpbiB0dXJuIGFyZSB1c2VkIGZvciBnZW5lcmF0aW5nXG5cdCAqIHByaXZhdGUgcHJvcGVydGllcykuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKiBAcmV0dXJuIHtzdHJpbmdbXX0gIEFycmF5IG9mIGFjY2Vzc29yIG5hbWVzLlxuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5nZXRBbGxVbml0TmFtZXMgXSgpIHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0Li4udW5pdE5hbWVzLFxuXHRcdFx0Li4uZGVyaXZhdGl2ZVVuaXROYW1lcyxcblx0XHRdO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgZ2V0dGVycyBmb3IgdGhlIER1cmF0aW9uIGluc3RhbmNlIGZyb20gdGhlIGFjY2Vzc29yIG5hbWVzLlxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdFsgcHJpdmF0ZU1ldGhvZHMuY3JlYXRlR2V0dGVycyBdKCkge1xuXHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLmdldEFsbFVuaXROYW1lcyBdKCkuZm9yRWFjaChcblx0XHRcdCggYWNjZXNzb3JOYW1lICkgPT4ge1xuXHRcdFx0XHQvLyBjcmVhdGVzIGFjY2Vzc29yIGZvciBnZXR0aW5nIHRoZSB2YWx1ZSB2aWEgYSBwcm9wZXJ0eVxuXHRcdFx0XHQvLyBlZy4gaW5zdGFuY2UuaG91cnNcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCB0aGlzLCBhY2Nlc3Nvck5hbWUsIHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGRlcml2YXRpdmVVbml0TmFtZXMuaW5kZXhPZiggYWNjZXNzb3JOYW1lICkgPiAtMSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF1bIGFjY2Vzc29yTmFtZSBdKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpc1xuXHRcdFx0XHRcdFx0XHRbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uVmFsdWVzIF1cblx0XHRcdFx0XHRcdFx0WyBhY2Nlc3Nvck5hbWUgXSB8fFxuXHRcdFx0XHRcdFx0XHQwO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0Ly8gY3JlYXRlcyBgYXMqYCBtZXRob2RzLlxuXHRcdFx0XHQvLyBlZyBgaW5zdGFuY2UuYXNIb3Vyc2Agd291bGQgcmV0dXJuIHRoZSBnaXZlbiBkdXJhdGlvblxuXHRcdFx0XHQvLyBleHByZXNzZWQgYXMgdGhlIGhvdXJzIHVuaXQuXG5cdFx0XHRcdC8vIG5vdGUgZm9yIHVuaXRzIHN1Y2ggYXMgXCJ5ZWFyc1wiIGFuZCBcIm1vbnRoc1wiLCB0aGlzIHVzZXMgd2hhdFxuXHRcdFx0XHQvLyBpcyB0ZXJtZWQgYXMgXCJsb25ndGVybVwiIGNhbGN1bGF0aW9uLiBMb25ndGVybSBpcyBiYXNlZCBvblxuXHRcdFx0XHQvLyBhIDQwMCB5ZWFyIGN5Y2xlIGF2ZXJhZ2luZyBvdXQgdGhlIGRheXMgaW4gYSBtb250aCBhbmRcblx0XHRcdFx0Ly8gZGF5cyBpbiBhIHllYXIgb3ZlciB0aGF0IGN5Y2xlLlxuXHRcdFx0XHQvLyBAbGluayBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9ibG9iL2RldmVsb3Avc3JjL2xpYi9kdXJhdGlvbi9idWJibGUuanMjTDUyXG5cdFx0XHRcdGNvbnN0IGFzTWV0aG9kTmFtZSA9ICdhcycgKyBjYXBpdGFsaXplKCBhY2Nlc3Nvck5hbWUgKTtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCB0aGlzLCBhc01ldGhvZE5hbWUsIHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHRcdFx0XHRcdFsgYXNNZXRob2ROYW1lIF0oKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgdmFsdWUgb2YgbG9jYWxlLlxuXHQgKiBlZy4gaW5zdGFuY2UubG9jYWxlXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGxvY2FsZSBzdHJpbmcuXG5cdCAqL1xuXHRnZXQgbG9jYWxlKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLmxvY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjdXJyZW50IER1cmF0aW9uIGluc3RhbmNlIHJlcHJlc2VudHMgYSB2YWxpZFxuXHQgKiBkdXJhdGlvbi5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGUgRHVyYXRpb24gaW5zdGFuY2UgaXMgdmFsaWQuXG5cdCAqL1xuXHRnZXQgaXNWYWxpZCgpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuaXNWYWxpZCBdICYmXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLnRvSVNPU3RyaW5nKCkgIT09ICdQMEQnO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBuZXcgRHVyYXRpb24gaW5zdGFuY2UgdGhhdCBpcyBpZGVudGljYWwgdG8gdGhpcyBleGNlcHQgdGhlXG5cdCAqIGxvY2FsZSBpcyBjaGFuZ2VkIHRvIHdoYXQgd2FzIHByb3ZpZGVkLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBIG5ldyBpbnN0YW5jZSBvZiBEdXJhdGlvblxuXHQgKi9cblx0c2V0TG9jYWxlKCBsb2NhbGUgKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbiggdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb25WYWx1ZXMgXSwgbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogUmVkdWNlIHRoaXMgRHVyYXRpb24gdG8gaXRzIGNhbm9uaWNhbCByZXByZXNlbnRhdGlvbiBpbiBpdHMgY3VycmVudCB1bml0cy5cblx0ICpcblx0ICogRm9yIGV4YW1wbGU6XG5cdCAqIER1cmF0aW9uXG5cdCAqICAgICAuZnJvbU9iamVjdCh7IHllYXJzOiAyLCBkYXlzOiA1MDAwIH0pXG5cdCAqICAgICAubm9ybWFsaXplKClcblx0ICogICAgIC50b09iamVjdCgpIC8vPT4geyB5ZWFyczogMTUsIG1vbnRoczogOCwgZGF5czogMTIgfVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQSBuZXcgaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdG5vcm1hbGl6ZSgpIHtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKCB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBEdXJhdGlvbiBpbnN0YW5jZSBpcyB0aGUgc2FtZSBhcyB0aGlzXG5cdCAqIER1cmF0aW9uIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufG1peGVkfSBvdGhlckR1cmF0aW9uXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhhdCB0aGUgY29tcGFyZWQgZHVyYXRpb25zIGhhdmUgdGhlIHNhbWVcblx0ICogdW5pdHMgYW5kIHRoZSBzYW1lIHZhbHVlcyBmb3IgZWFjaCB1bml0IChhcyB3ZWxsIGFzIHNhbWUgbG9jYWxlKS4gVGhpc1xuXHQgKiBtZWFucyB0aGF0IGEgZHVyYXRpb24gd2l0aHsgbWludXRlczogNjAgfSB3b3VsZCBiZSBjb25zaWRlcmVkIG5vdCBlcXVhbFxuXHQgKiB0byBhIGR1cmF0aW9uIHdpdGggeyBob3VyczogMSB9LlxuXHQgKi9cblx0c2FtZUFzKCBvdGhlckR1cmF0aW9uICkge1xuXHRcdER1cmF0aW9uLmFzc2VydElzRHVyYXRpb24oIG90aGVyRHVyYXRpb24gKTtcblx0XHRpZiAoICEgdGhpcy5pc1ZhbGlkIHx8ICEgb3RoZXJEdXJhdGlvbi5pc1ZhbGlkICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAoIHRoaXMubG9jYWxlICE9PSBvdGhlckR1cmF0aW9uLmxvY2FsZSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIGlzU2hhbGxvd0VxdWFsKCB0aGlzLnRvT2JqZWN0KCksIG90aGVyRHVyYXRpb24udG9PYmplY3QoKSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgRHVyYXRpb24gaW5zdGFuY2UgaXMgZXF1YWwgdG8gdGhpcyBEdXJhdGlvblxuXHQgKiBpbnN0YW5jZS5cblx0ICpcblx0ICogRXF1YWxpdHkgaXMgYmFzZWQgb246XG5cdCAqIC0gbG9jYWxlIGlzIHRoZSBzYW1lXG5cdCAqIC0gdGhlIG5vcm1hbGl6ZWQgdmFsdWUgb2YgdGhlIGR1cmF0aW9uIGlzIHRoZSBzYW1lLiAgZWcgYSBkdXJhdGlvbiB3aXRoXG5cdCAqIHsgaG91cnM6IDI0IH0gd291bGQgYmUgY29uc2lkZXJlZCBlcXVhbCB0byBhIGR1cmF0aW9uIHdpdGggeyBkYXlzOiAxIH1cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbnxtaXhlZH0gb3RoZXJEdXJhdGlvblxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGNvbnNpZGVyZWQgZXF1YWxcblx0ICovXG5cdGVxdWFscyggb3RoZXJEdXJhdGlvbiApIHtcblx0XHREdXJhdGlvbi5hc3NlcnRJc0R1cmF0aW9uKCBvdGhlckR1cmF0aW9uICk7XG5cdFx0aWYgKCAhIHRoaXMuaXNWYWxpZCB8fCAhIG90aGVyRHVyYXRpb24uaXNWYWxpZCApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKCB0aGlzLmxvY2FsZSAhPT0gb3RoZXJEdXJhdGlvbi5sb2NhbGUgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBpc1NoYWxsb3dFcXVhbChcblx0XHRcdHRoaXMubm9ybWFsaXplKCkudG9PYmplY3QoKSxcblx0XHRcdG90aGVyRHVyYXRpb24ubm9ybWFsaXplKCkudG9PYmplY3QoKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogTWFrZSB0aGlzIGR1cmF0aW9uIGxvbmdlciBieSB0aGUgc3BlY2lmaWVkIGFtb3VudC5cblx0ICpcblx0ICogTm90ZTogdGhlIHJldHVybmVkIER1cmF0aW9uIHdpbGwgaGF2ZSB0aGUgbG9jYWxlIG9mIHRoZSBvcmlnaW5hbFxuXHQgKiByZWdhcmRsZXNzIHdoYXQgdGhlIGxvY2FsZSB3YXMgb24gYW55IHBhc3NlZCBpbiBkdXJhdGlvbi5cblx0ICpcblx0ICogVGhlIG5ldyBEdXJhdGlvbiByZXR1cm5lZCB3aWxsIGhhdmUgbm9ybWFsaXplZCB2YWx1ZXMgKGkuZS4gaWYgYWRkaXRpb25cblx0ICogb2Ygb25lIER1cmF0aW9uIHdpdGggYHsgaG91cnM6IDEwIH1gIGlzIGRvbmUgd2l0aCB0aGUgb3RoZXIgRHVyYXRpb25cblx0ICogaGF2aW5nIGB7IGhvdXJzOiAxNCB9YCB0aGVuIHRoZSBuZXcgRHVyYXRpb24gd2lsbCBoYXZlIGB7IGRheXM6IDEgfWAuXG5cdCAqIFlvdSBjYW4gc3RpbGwgZ2V0IHRoZSB0b3RhbCBob3VycyBieSBjYWxsaW5nIGBuZXdEdXJhdGlvbi5hc0hvdXJzKClgLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufE9iamVjdHxudW1iZXJ9IHZhbHVlICBFaXRoZXIgYSBEdXJhdGlvbiBpbnN0YW5jZSwgYVxuXHQgKiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIG9yIGFuIG9iamVjdCBpbiB0aGUgc2FtZSBzaGFwZSByZWNlaXZlZCBieVxuXHQgKiBEdXJhdGlvbi5mcm9tT2JqZWN0KClcblx0ICpcblx0ICogQHJldHVybiB7RHVyYXRpb259IEEgbmV3IGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRwbHVzKCB2YWx1ZSApIHtcblx0XHRpZiAoIER1cmF0aW9uLmlzRHVyYXRpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdXG5cdFx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0XHQuYWRkKCB2YWx1ZVsgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXSApXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHR2YWx1ZSA9IHRoaXNbIHByaXZhdGVNZXRob2RzLmZpbHRlclZhbHVlcyBdKCB2YWx1ZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQuYWRkKCB2YWx1ZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlIHRoaXMgZHVyYXRpb24gc2hvcnRlciBieSB0aGUgc3BlY2lmaWVkIGFtb3VudFxuXHQgKlxuXHQgKiBOb3RlOiB0aGUgcmV0dXJuZWQgRHVyYXRpb24gd2lsbCBoYXZlIHRoZSBsb2NhbGUgb2YgdGhlIG9yaWdpbmFsXG5cdCAqIHJlZ2FyZGxlc3Mgd2hhdCB0aGUgbG9jYWxlIHdhcyBvbiBhbnkgcGFzc2VkIGluIGR1cmF0aW9uLlxuXHQgKlxuXHQgKiBUaGUgbmV3IER1cmF0aW9uIHJldHVybmVkIHdpbGwgaGF2ZSBub3JtYWxpemVkIHZhbHVlcyAoaS5lLiBpZiBzdWJ0cmFjdGlvblxuXHQgKiBvZiBvbmUgRHVyYXRpb24gd2l0aCBgeyBob3VyczogMzQgfWAgaXMgZG9uZSB3aXRoIHRoZSBvdGhlciBEdXJhdGlvblxuXHQgKiBoYXZpbmcgYHsgaG91cnM6IDEwIH1gIHRoZW4gdGhlIG5ldyBEdXJhdGlvbiB3aWxsIGhhdmUgYHsgZGF5czogMSB9YC5cblx0ICogWW91IGNhbiBzdGlsbCBnZXQgdGhlIHRvdGFsIGhvdXJzIGJ5IGNhbGxpbmcgYG5ld0R1cmF0aW9uLmFzSG91cnMoKWAuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RHVyYXRpb258T2JqZWN0fG51bWJlcn0gdmFsdWUgRWl0aGVyIGEgZHVyYXRpb24gaW5zdGFuY2UsIGFcblx0ICogbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBvciBhbiBvYmplY3QgaW4gdGhlIHNhbWUgc2hhcGUgYXMgdGhhdCByZWNlaXZlZCBieVxuXHQgKiBEdXJhdGlvbi5mcm9tT2JqZWN0KClcblx0ICpcblx0ICogQHJldHVybiB7RHVyYXRpb259IEEgbmV3IGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRtaW51cyggdmFsdWUgKSB7XG5cdFx0aWYgKCBEdXJhdGlvbi5pc0R1cmF0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIG5ldyBEdXJhdGlvbihcblx0XHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHRcdC5jbG9uZSgpXG5cdFx0XHRcdFx0LnN1YnRyYWN0KCB2YWx1ZVsgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXSApXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHR2YWx1ZSA9IHRoaXNbIHByaXZhdGVNZXRob2RzLmZpbHRlclZhbHVlcyBdKCB2YWx1ZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQuc3VidHJhY3QoIHZhbHVlIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG5lZ2F0aXZlIG9mIHRoaXMgRHVyYXRpb24uXG5cdCAqXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBIG5ldyBpbnN0YW5jZSBvZiBEdXJhdGlvblxuXHQgKi9cblx0bmVnYXRlKCkge1xuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oXG5cdFx0XHRtYXBWYWx1ZXMoIHRoaXMudG9PYmplY3QoKSwgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUgKiAtMTtcblx0XHRcdH0gKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIGphdmFzY3JpcHQgb2JqZWN0IHdpdGggdGhpcyBEdXJhdGlvbidzIHZhbHVlcy5cblx0ICpcblx0ICogQHJldHVybiB7Kn0gUmV0dXJucyB7IHllYXJzOiBudW1iZXIsIGhvdXJzOiBudW1iZXIgLi4uIH1cblx0ICovXG5cdHRvT2JqZWN0KCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvblZhbHVlcyBdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uLlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGVnLiBcIlBUMjRIXCJcblx0ICovXG5cdHRvSVNPKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLnRvSVNPU3RyaW5nKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBJU08gODYwMSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uIGFwcHJvcHJpYXRlIGZvciB1c2Vcblx0ICogaW4gSlNPTi5cblx0ICogQHJldHVybiB7c3RyaW5nfSBlZy4gXCJQVDI0SFwiXG5cdCAqL1xuXHR0b0pTT04oKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF0udG9KU09OKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBJU08gODYwMSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uIGFwcHJvcHJpYXRlIGZvciB1c2Vcblx0ICogaW4gZGVidWdnaW5nLlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGVnLiBcIlBUMjRIXCJcblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLnRvSVNPKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBtaWxsaXNlY29uZHMgdmFsdWUgb2YgdGhpcyBEdXJhdGlvbi5cblx0ICogQHJldHVybiB7bnVtYmVyfSBUaGUgdmFsdWUgb2YgdGhpcyBkdXJhdGlvbiByZXByZXNlbnRlZCBpbiB0aGUgbnVtYmVyIG9mXG5cdCAqIG1pbGxpc2Vjb25kcy5cblx0ICovXG5cdHZhbHVlT2YoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXNNaWxsaXNlY29uZHMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRHVyYXRpb24gZm9ybWF0dGVkIGFjY29yZGluZyB0b1xuXHQgKiB0aGUgc3BlY2lmaWVkIGZvcm1hdCBzdHJpbmcuXG5cdCAqXG5cdCAqIEN1cnJlbnRseSB0aGlzIGFjY2VwdHMgdGhlIGZvbGxvd2luZyB0b2tlbnMgaW4gdGhlIGZvcm1hdCBzdHJpbmc6XG5cdCAqXG5cdCAqIHllYXJzOiAgIFkgb3IgeVxuXHQgKiBtb250aHM6ICBNXG5cdCAqIHdlZWtzOiAgIFcgb3Igd1xuXHQgKiBkYXlzOiAgICBEIG9yIGRcblx0ICogaG91cnM6ICAgSCBvciBoXG5cdCAqIG1pbnV0ZXM6IG1cblx0ICogc2Vjb25kczogc1xuXHQgKiBtczogICAgICBTXG5cdCAqXG5cdCAqIFlvdSBjYW4gdXNlIG11bHRpcGxlcyBvZiB0aGUgc2FtZSB0b2tlbiB0b2dldGhlciB0byBhZGQgemVyby1sZW5ndGhcblx0ICogcGFkZGluZzogKGVnIGhoIC0+IDAxIGluc3RlYWQgb2YgaCAtPiAxKVxuXHQgKlxuXHQgKiBFc2NhcGUgdG9rZW4gY2hhcmFjdGVycyB3aXRoaW4gdGhlIGZvcm1hdCBzdHJpbmcgdXNpbmcgc3F1YXJlIGJyYWNrZXRzXG5cdCAqIChlZyAnaCBbaHJzXSwgbSBbbWluXScgLT4gJzEyIGhycywgMyBtaW4nKVxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ31mb3JtYXRcblx0ICogQHJldHVybiB7c3RyaW5nfSAgQSBmb3JtYXR0ZWQgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgZHVyYXRpb24uXG5cdCAqL1xuXHR0b0Zvcm1hdCggZm9ybWF0ICkge1xuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZSgpWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdLmZvcm1hdCggZm9ybWF0ICk7XG5cdH1cbn1cbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgRGF0ZVRpbWUgfSBmcm9tICcuL2RhdGV0aW1lJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRHVyYXRpb24gfSBmcm9tICcuL2R1cmF0aW9uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2VydmVyRGF0ZVRpbWUgfSBmcm9tICcuL2RhdGV0aW1lJztcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgTW9uZXkgfSBmcm9tICcuL21vbmV5JztcbmV4cG9ydCB7XG5cdGRlZmF1bHQgYXMgU2l0ZUN1cnJlbmN5LFxuXHRDdXJyZW5jeSxcbn0gZnJvbSAnLi9jdXJyZW5jeSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIExhYmVsIH0gZnJvbSAnLi9sYWJlbCc7XG5leHBvcnQgeyBEYXRlVGltZSwgRHVyYXRpb24sIFNlcnZlckRhdGVUaW1lIH0gZnJvbSAnLi9kYXRlLXRpbWUnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHN0YXJ0Q2FzZSwgaXNTdHJpbmcgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5cbi8qKlxuICogQSB2YWx1ZSBvYmplY3QgZm9yIHJlcHJlc2VudGluZyBhIGxhYmVsIHdpdGggc2luZ3VsYXIgYW5kIHBsdXJhbCBzdHJpbmdcbiAqIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGFiZWwge1xuXHRzdGF0aWMgRk9STUFUX0xPV0VSQ0FTRSA9ICdsb3dlcic7XG5cdHN0YXRpYyBGT1JNQVRfVVBQRVJDQVNFID0gJ3VwcGVyJztcblx0c3RhdGljIEZPUk1BVF9TRU5URU5DRV9DQVNFID0gJ3NlbnRlbmNlJztcblxuXHQvKipcblx0ICogVGhlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNpbmd1bGFyIGZvcm0gb2YgdGhlIGxhYmVsLlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0c2luZ3VsYXIgPSAnJztcblxuXHQvKipcblx0ICogVGhlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHBsdXJhbCBmb3JtIG9mIHRoZSBsYWJlbC5cblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHBsdXJhbCA9ICcnO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc2luZ3VsYXJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBsdXJhbFxuXHQgKi9cblx0Y29uc3RydWN0b3IoIHNpbmd1bGFyLCBwbHVyYWwgKSB7XG5cdFx0dGhpcy5zZXRTaW5ndWxhciggc2luZ3VsYXIgKS5zZXRQbHVyYWwoIHBsdXJhbCApO1xuXHRcdE9iamVjdC5mcmVlemUoIHRoaXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGbHVpZCBzZXR0ZXIgZm9yIHNldHRpbmcgdGhlIHNpbmd1bGFyIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBJZiB0aGUgc2luZ3VsYXIgcHJvcGVydHkgaGFzIGFscmVhZHkgYmVlbiBzZXQsIHRoaXMgd2lsbCByZXR1cm4gYSBuZXdcblx0ICogaW5zdGFuY2Ugb2YgTGFiZWxcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNpbmd1bGFyXG5cdCAqIEByZXR1cm4ge0xhYmVsfSAgQW4gaW5zdGFuY2Ugb2YgTGFiZWxcblx0ICovXG5cdHNldFNpbmd1bGFyKCBzaW5ndWxhciApIHtcblx0XHRMYWJlbC5hc3NlcnRTdHJpbmcoIHNpbmd1bGFyICk7XG5cdFx0aWYgKCB0aGlzLnNpbmd1bGFyICE9PSAnJyApIHtcblx0XHRcdHJldHVybiBuZXcgTGFiZWwoIHNpbmd1bGFyLCB0aGlzLnBsdXJhbCApO1xuXHRcdH1cblx0XHR0aGlzLnNpbmd1bGFyID0gc2luZ3VsYXI7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogRmx1aWQgc2V0dGVyIGZvciBzZXR0aW5nIHRoZSBwbHVyYWwgcHJvcGVydHlcblx0ICpcblx0ICogSWYgdGhlIHBsdXJhbCBwcm9wZXJ0eSBoYXMgYWxyZWFkeSBiZWVuIHNldCwgdGhpcyB3aWxsIHJldHVybiBhIG5ld1xuXHQgKiBpbnN0YW5jZSBvZiBsYWJlbC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBsdXJhbFxuXHQgKiBAcmV0dXJuIHtMYWJlbH0gQW4gaW5zdGFuY2Ugb2YgTGFiZWxcblx0ICovXG5cdHNldFBsdXJhbCggcGx1cmFsICkge1xuXHRcdExhYmVsLmFzc2VydFN0cmluZyggcGx1cmFsICk7XG5cdFx0aWYgKCB0aGlzLnBsdXJhbCAhPT0gJycgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IExhYmVsKCB0aGlzLnNpbmd1bGFyLCBwbHVyYWwgKTtcblx0XHR9XG5cdFx0dGhpcy5wbHVyYWwgPSBwbHVyYWw7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5IGZvcm1hdHRlZCBpbiBzZW50ZW5jZSBjYXNlLlxuXHQgKlxuXHQgKiBOb3RlLCB0aGlzIHN0cmlwcyBhbnkgYC1gIGluIGRhc2hlZCBsYWJlbHMuICBTbyBmb3IgaW5zdGFuY2UgaWYgeW91clxuXHQgKiBsYWJlbCB2YWx1ZSB3YXMgYHNvbWV0aGluZy1lbHNlYCwgdGhlIHZhbHVlIHJldHVybmVkIHdvdWxkIGJlXG5cdCAqIGBTb21ldGhpbmcgRWxzZWBcblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhciAgSWYgdHJ1ZSwgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlXG5cdCAqIHNpbmd1bGFyIHByb3BlcnR5IG90aGVyd2lzZSByZXR1cm4gdGhlIGZvcm1hdHRlZCB2YWx1ZSBvZiB0aGUgcGx1cmFsXG5cdCAqIHByb3BlcnR5LlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmcgaW4gc2VudGVuY2UgY2FzZVxuXHQgKi9cblx0YXNTZW50ZW5jZUNhc2UoIHNpbmd1bGFyID0gdHJ1ZSApIHtcblx0XHRyZXR1cm4gc2luZ3VsYXIgPT09IHRydWUgP1xuXHRcdFx0c3RhcnRDYXNlKCB0aGlzLnNpbmd1bGFyLnRvTG93ZXJDYXNlKCkgKSA6XG5cdFx0XHRzdGFydENhc2UoIHRoaXMucGx1cmFsLnRvTG93ZXJDYXNlKCkgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdGhlIHZhbHVlIGZvciB0aGUgcHJvcGVydHkgZm9ybWF0dGVkIGluIGxvd2VyIGNhc2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXIgIElmIHRydWUsIHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlIG9mIHRoZVxuXHQgKiBzaW5ndWxhciBwcm9wZXJ0eSBvdGhlcndpc2UgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlIHBsdXJhbFxuXHQgKiBwcm9wZXJ0eS5cblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5nIGluIGxvd2VyIGNhc2Vcblx0ICovXG5cdGFzTG93ZXJDYXNlKCBzaW5ndWxhciA9IHRydWUgKSB7XG5cdFx0cmV0dXJuIHNpbmd1bGFyID9cblx0XHRcdHRoaXMuc2luZ3VsYXIudG9Mb3dlckNhc2UoKSA6XG5cdFx0XHR0aGlzLnBsdXJhbC50b0xvd2VyQ2FzZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0aGUgdmFsdWUgZm9yIHRoZSBwcm9wZXJ0eSBmb3JtYXR0ZWQgaW4gdXBwZXIgY2FzZS5cblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhciAgSWYgdHJ1ZSwgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlXG5cdCAqIHNpbmd1bGFyIHByb3BlcnR5IG90aGVyd2lzZSByZXR1cm4gdGhlIGZvcm1hdHRlZCB2YWx1ZSBvZiB0aGUgcGx1cmFsXG5cdCAqIHByb3BlcnR5LlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmcgaW4gdXBwZXIgY2FzZVxuXHQgKi9cblx0YXNVcHBlckNhc2UoIHNpbmd1bGFyID0gdHJ1ZSApIHtcblx0XHRyZXR1cm4gc2luZ3VsYXIgP1xuXHRcdFx0dGhpcy5zaW5ndWxhci50b1VwcGVyQ2FzZSgpIDpcblx0XHRcdHRoaXMucGx1cmFsLnRvVXBwZXJDYXNlKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5IGZvcm1hdHRlZCBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVkXG5cdCAqIGZvcm1hdFR5cGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXIgSWYgdHJ1ZSwgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlXG5cdCAqIHNpbmd1bGFyIHByb3BlcnR5IG90aGVyd2lzZSByZXR1cm4gdGhlIGZvcm1hdHRlZCB2YWx1ZSBvZiB0aGUgcGx1cmFsXG5cdCAqIHByb3BlcnR5LlxuXHQgKiBAcGFyYW0geygnc2VudGVuY2UnfCdsb3dlcid8J3VwcGVyJyl9IGZvcm1hdFR5cGVcblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5nIGZvcm1hdHRlZCBhY2NvcmRpbmcgdG8gZm9ybWF0VHlwZVxuXHQgKi9cblx0YXNGb3JtYXR0ZWQoIHNpbmd1bGFyID0gdHJ1ZSwgZm9ybWF0VHlwZSA9IExhYmVsLkZPUk1BVF9TRU5URU5DRV9DQVNFICkge1xuXHRcdHN3aXRjaCAoIGZvcm1hdFR5cGUgKSB7XG5cdFx0XHRjYXNlIExhYmVsLkZPUk1BVF9TRU5URU5DRV9DQVNFOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hc1NlbnRlbmNlQ2FzZSggc2luZ3VsYXIgKTtcblx0XHRcdGNhc2UgTGFiZWwuRk9STUFUX0xPV0VSQ0FTRTpcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXNMb3dlckNhc2UoIHNpbmd1bGFyICk7XG5cdFx0XHRjYXNlIExhYmVsLkZPUk1BVF9VUFBFUkNBU0U6XG5cdFx0XHRcdHJldHVybiB0aGlzLmFzVXBwZXJDYXNlKCBzaW5ndWxhciApO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0d2FybmluZyggZmFsc2UsICdGb3JtYXQgdHlwZSBtdXN0IGJlIG9uZSBvZiAnICtcblx0XHRcdFx0XHQnTGFiZWwuRk9STUFUX1NFTlRFTkNFX0NBU0UsIExhYmVsLkZPUk1BVF9VUFBFUkNBU0UsICcgK1xuXHRcdFx0XHRcdCdvciBMYWJlbC5GT1JNQVRfTE9XRVJDQVNFJyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hc1NlbnRlbmNlQ2FzZSggc2luZ3VsYXIgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHN0cmluZyBvciBub3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRTdHJpbmcoIHZhbHVlICkge1xuXHRcdGlmICggISBpc1N0cmluZyggdmFsdWUgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdJbmNvbWluZyBsYWJlbCB2YWx1ZSAoJyArIHZhbHVlICsgJykgbXVzdCcgK1xuXHRcdFx0XHQnIGJlIGEgc3RyaW5nJyApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExhYmVsIHRoYXQgaGFzIHRoZSBzYW1lIHZhbHVlIGZvciBzaW5nbHVhciBhbmRcblx0ICogcGx1cmFsIHByb3BlcnRpZXMgZm9yIHRoZSBwcm92aWRlZCBhcmd1bWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsXG5cdCAqIEByZXR1cm4ge0xhYmVsfSAgQSBMYWJlbCBpbnN0YW5jZVxuXHQgKi9cblx0c3RhdGljIGZyb21TYW1lU2luZ2xlQW5kUGx1cmFsID0gKCBsYWJlbCApID0+IHtcblx0XHRyZXR1cm4gbmV3IExhYmVsKCBsYWJlbCwgbGFiZWwgKTtcblx0fVxufVxuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IERlY2ltYWwgfSBmcm9tICdkZWNpbWFsLmpzLWxpZ2h0JztcbmltcG9ydCAqIGFzIEFjY291bnRpbmcgZnJvbSAnYWNjb3VudGluZy1qcyc7XG5pbXBvcnQgaXNTaGFsbG93RXF1YWwgZnJvbSAnQHdvcmRwcmVzcy9pcy1zaGFsbG93LWVxdWFsJztcbmltcG9ydCB7IEV4Y2VwdGlvbiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpbnN0YW5jZU9mIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogQXNzZXJ0cyBpZiBpbmNvbWluZyB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBNb25leVxuICogQHBhcmFtIHtNb25leX0gbW9uZXlcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAqL1xuY29uc3QgYXNzZXJ0TW9uZXkgPSAoIG1vbmV5ICkgPT4ge1xuXHRpZiAoICEgKCBpbnN0YW5jZU9mKCBtb25leSwgJ01vbmV5JyApICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ0luc3RhbmNlIG9mIE1vbmV5IHJlcXVpcmVkJyApO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgaWYgaW5jb21pbmcgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgQ3VycmVuY3lcbiAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5XG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG4gKi9cbmNvbnN0IGFzc2VydEN1cnJlbmN5ID0gKCBjdXJyZW5jeSApID0+IHtcblx0aWYgKCAhICggaW5zdGFuY2VPZiggY3VycmVuY3ksICdDdXJyZW5jeScgKSApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdJbnN0YW5jZSBvZiBDdXJyZW5jeSByZXF1aXJlZCcgKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIGlmIHR3byBjdXJyZW5jaWVzIGFyZSBzaGFsbG93IGVxdWFsLlxuICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lBXG4gKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeUJcbiAqIEB0aHJvd3Mge0V4Y2VwdGlvbn1cbiAqL1xuY29uc3QgYXNzZXJ0U2FtZUN1cnJlbmN5ID0gKCBjdXJyZW5jeUEsIGN1cnJlbmN5QiApID0+IHtcblx0YXNzZXJ0Q3VycmVuY3koIGN1cnJlbmN5QSApO1xuXHRhc3NlcnRDdXJyZW5jeSggY3VycmVuY3lCICk7XG5cdGlmICggISBpc1NoYWxsb3dFcXVhbCggY3VycmVuY3lBLnRvSlNPTigpLCBjdXJyZW5jeUIudG9KU09OKCkgKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCAnUHJvdmlkZWQgY3VycmVuY2llcyBhcmUgbm90IGVxdWl2YWxlbnQuJyApO1xuXHR9XG59O1xuXG4vKipcbiAqIEEgVmFsdWUgb2JqZWN0IHJlcHJlc2VudGluZyBtb25leSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbmV5IHtcblx0LyoqXG5cdCAqIEludGVybmFsbHkgdGhlIGFtb3VudCBpcyBzdG9yZWQgYXMgYSBEZWNpbWFsIGluc3RhbmNlLlxuXHQgKiBAdHlwZSB7RGVjaW1hbH1cblx0ICovXG5cdGFtb3VudCA9IHt9O1xuXG5cdC8qKlxuXHQgKiBJbnRlcm5hbGx5IHRoZSBhbW91bnQgaXMgc3RvcmVkIGFzIGEgQ3VycmVuY3kgaW5zdGFuY2UuXG5cdCAqIEB0eXBlIHtDdXJyZW5jeX1cblx0ICovXG5cdGN1cnJlbmN5ID0ge307XG5cblx0LyoqXG5cdCAqIEZvcm1hdHRlciBvYmplY3QgZm9yIG1vbmV5IHZhbHVlcy5cblx0ICogQHR5cGUge3t9fVxuXHQgKi9cblx0Zm9ybWF0dGVyID0ge307XG5cblx0LyoqXG5cdCAqIFJvdW5kcyBhd2F5IGZyb20gemVyb1xuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIFJPVU5EX1VQID0gRGVjaW1hbC5ST1VORF9VUDtcblxuXHQvKipcblx0ICogUm91bmRzIHRvd2FyZHMgemVyb1xuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIFJPVU5EX0RPV04gPSBEZWNpbWFsLlJPVU5EX0RPV047XG5cblx0LyoqXG5cdCAqIFJvdW5kcyB0b3dhcmRzIGluZmluaXR5XG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdGF0aWMgUk9VTkRfQ0VJTCA9IERlY2ltYWwuUk9VTkRfQ0VJTDtcblxuXHQvKipcblx0ICogUm91bmRzIHRvd2FyZHMgLUluZmluaXR5XG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdGF0aWMgUk9VTkRfRkxPT1IgPSBEZWNpbWFsLlJPVU5EX0ZMT09SO1xuXG5cdC8qKlxuXHQgKiBSb3VuZHMgdG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHJvdW5kcyBhd2F5IGZyb20gemVyby5cblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9IQUxGX1VQID0gRGVjaW1hbC5ST1VORF9IQUxGX1VQO1xuXG5cdC8qKlxuXHQgKiBSb3VuZHMgdG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQgcm91bmRzIHRvd2FyZHMgemVyby5cblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9IQUxGX0RPV04gPSBEZWNpbWFsLlJPVU5EX0hBTEZfRE9XTjtcblxuXHQvKipcblx0ICogUm91bmRzIHRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCByb3VuZHMgdG93YXJkcyBldmVuXG5cdCAqIG5laWdoYm91ci5cblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9IQUxGX0VWRU4gPSBEZWNpbWFsLlJPVU5EX0hBTEZfRVZFTjtcblxuXHQvKipcblx0ICogQ2xhc3MgY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9IGFtb3VudFxuXHQgKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeVxuXHQgKi9cblx0Y29uc3RydWN0b3IoIGFtb3VudCwgY3VycmVuY3kgKSB7XG5cdFx0dGhpcy5zZXRDdXJyZW5jeSggY3VycmVuY3kgKVxuXHRcdFx0LnNldEFtb3VudCggYW1vdW50IClcblx0XHRcdC5zZXRGb3JtYXR0ZXIoKTtcblx0XHRPYmplY3QuZnJlZXplKCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBjdXJyZW5jeSBwcm9wZXJ0eVxuXHQgKlxuXHQgKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeVxuXHQgKiBAcmV0dXJuIHtNb25leX0gRWl0aGVyIHRoaXMgTW9uZXkgb3IgbmV3IE1vbmV5IGRlcGVuZGluZyBvbiBzdGF0ZSBvZlxuXHQgKiBwcm9wZXJ0eS5cblx0ICovXG5cdHNldEN1cnJlbmN5KCBjdXJyZW5jeSApIHtcblx0XHRNb25leS5hc3NlcnRDdXJyZW5jeSggY3VycmVuY3kgKTtcblx0XHQvLyBpZiB0aGVyZSdzIGFscmVhZHkgYSBjdXJyZW5jeSBzZXQsIHRoZW4gcmV0dXJuIGEgbmV3IG9iamVjdC5cblx0XHRpZiAoIGluc3RhbmNlT2YoIHRoaXMuY3VycmVuY3ksICdDdXJyZW5jeScgKSApIHtcblx0XHRcdHJldHVybiBuZXcgTW9uZXkoIHRoaXMuYW1vdW50LCBjdXJyZW5jeSApO1xuXHRcdH1cblx0XHR0aGlzLmN1cnJlbmN5ID0gY3VycmVuY3k7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBhbW91bnQgcHJvcGVydHlcblx0ICpcblx0ICogQHBhcmFtIHtEZWNpbWFsfG51bWJlcnxzdHJpbmd9IGFtb3VudFxuXHQgKiBAcmV0dXJuIHtNb25leX0gRWl0aGVyIHRoaXMgTW9uZXkgb3IgbmV3IE1vbmV5IGRlcGVuZGluZyBvbiBzdGF0ZSBvZiB0aGVcblx0ICogcHJvcGVydHkuXG5cdCAqL1xuXHRzZXRBbW91bnQoIGFtb3VudCApIHtcblx0XHRjb25zdCB2YWx1ZSA9IGluc3RhbmNlT2YoIGFtb3VudCwgJ0RlY2ltYWwnICkgP1xuXHRcdFx0YW1vdW50LnRvTnVtYmVyKCkgOlxuXHRcdFx0YW1vdW50O1xuXHRcdC8vIGlmIHRoZXJlJ3MgYWxyZWFkeSBhbiBhbW91bnQgc2V0LCB0aGVuIHJldHVybiBhIG5ldyBvYmplY3QuXG5cdFx0aWYgKCBpbnN0YW5jZU9mKCB0aGlzLmFtb3VudCwgJ0RlY2ltYWwnICkgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IE1vbmV5KCBuZXcgRGVjaW1hbCggdmFsdWUgKSwgdGhpcy5jdXJyZW5jeSApO1xuXHRcdH1cblx0XHR0aGlzLmFtb3VudCA9IG5ldyBEZWNpbWFsKCB2YWx1ZSApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgZm9ybWF0dGVyIGZvciBtb25leSB2YWx1ZXNcblx0ICpcblx0ICogQHJldHVybiB7TW9uZXl9IEFuIGluc3RhbmNlIG9mIHRoaXMgb2JqZWN0LlxuXHQgKi9cblx0c2V0Rm9ybWF0dGVyKCkge1xuXHRcdC8vIG9ubHkgaW5pdGlhbGl6ZSBpZiBpdHMgbm90IGFscmVhZHkgaW5pdGlhbGl6ZWRcblx0XHRpZiAoIGlzRW1wdHkoIHRoaXMuZm9ybWF0dGVyICkgKSB7XG5cdFx0XHR0aGlzLmZvcm1hdHRlciA9IHsgLi4uQWNjb3VudGluZyB9O1xuXHRcdFx0dGhpcy5mb3JtYXR0ZXIuc2V0dGluZ3MgPSB7XG5cdFx0XHRcdC4uLnRoaXMuZm9ybWF0dGVyLnNldHRpbmdzLFxuXHRcdFx0XHQuLi50aGlzLmN1cnJlbmN5LnRvQWNjb3VudGluZ1NldHRpbmdzKCkuY3VycmVuY3ksXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIE1vbmV5IGFzIGl0cyBzdWJ1bml0cy5cblx0ICogQHJldHVybiB7bnVtYmVyfSBJZiB0aGUgc3VidW5pdHMgaXMgMTAwIGFuZCB0aGUgdmFsdWUgaXMgLjQ1LFxuXHQgKiB0aGlzIHJldHVybnMgNDUwXG5cdCAqL1xuXHR0b1N1YnVuaXRzKCkge1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC50b051bWJlcigpICogdGhpcy5jdXJyZW5jeS5zdWJ1bml0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIG1vbmV5IG9iamVjdCBlcXVhbHMgdGhpcyBtb25leSBvYmplY3QuXG5cdCAqIENvbXBhcmVzIGJvdGggYW1vdW50IGFuZCBjdXJyZW5jeS5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGlzIGlzIGVxdWFsLiBGYWxzZSBtZWFucyBpdCBpc24ndC5cblx0ICovXG5cdGVxdWFscyggb3RoZXIgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0TW9uZXkoIG90aGVyICk7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmVxdWFscyggb3RoZXIuYW1vdW50ICkgJiZcblx0XHRcdHRoaXMuaGFzU2FtZUN1cnJlbmN5KCBvdGhlciApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgd2hldGhlciBwcm92aWRlZCBNb25leSBvYmplY3QncyBDdXJyZW5jeSBlcXVhbHMgdGhpcyBNb25leVxuXHQgKiBvYmplY3QncyBDdXJyZW5jeS5cblx0ICpcblx0ICogVGhpcyBkb2VzIGEgc2hhbGxvdyBjb21wYXJpc29uIG9uIHRoZSBzZXJpYWxpemVkIHZhbHVlcyBmb3IgdGhlIGN1cnJlbmN5XG5cdCAqIG9iamVjdHMuICBUaGF0IHdheSBpZiB0aGUgY3VycmVuY2llcyBhcmUgZGlmZmVyZW50IGluc3RhbmNlcywgYnV0IHNoYXJlXG5cdCAqIHRoZSBzYW1lIGludGVybmFsIHZhbHVlLCB0aGV5IGFyZSBjb25zaWRlcmVkIGVxdWFsLlxuXHQgKlxuXHQgKiBAcGFyYW0ge01vbmV5fSBvdGhlclxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoZSBjdXJyZW5jaWVzIGFyZSBlcXVhbC5cblx0ICovXG5cdGhhc1NhbWVDdXJyZW5jeSggb3RoZXIgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0TW9uZXkoIG90aGVyICk7XG5cdFx0cmV0dXJuIGlzU2hhbGxvd0VxdWFsKFxuXHRcdFx0dGhpcy5jdXJyZW5jeS50b0pTT04oKSxcblx0XHRcdG90aGVyLmN1cnJlbmN5LnRvSlNPTigpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgb25lIE1vbmV5IG9iamVjdCB0byB0aGlzIE1vbmV5IG9iamVjdFxuXHQgKiBAcGFyYW0ge01vbmV5fSBvdGhlclxuXHQgKiBAcmV0dXJuIHtNb25leX0gUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiBNb25leS5cblx0ICovXG5cdGFkZCggb3RoZXIgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3koIHRoaXMsIG90aGVyICk7XG5cdFx0cmV0dXJuIG5ldyBNb25leSggdGhpcy5hbW91bnQucGx1cyggb3RoZXIuYW1vdW50ICksIHRoaXMuY3VycmVuY3kgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTdWJ0cmFjdCBvbmUgTW9uZXkgb2JqZWN0IGZyb20gdGhpcyBNb25leSBvYmplY3Rcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7TW9uZXl9IFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgTW9uZXlcblx0ICovXG5cdHN1YnRyYWN0KCBvdGhlciApIHtcblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSggdGhpcywgb3RoZXIgKTtcblx0XHRyZXR1cm4gbmV3IE1vbmV5KCB0aGlzLmFtb3VudC5taW51cyggb3RoZXIuYW1vdW50ICksIHRoaXMuY3VycmVuY3kgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNdWx0aXBseSB0aGlzIG1vbmV5IG9iamVjdCBieSB0aGUgcHJvdmlkZWQgbXVsdGlwbGllciB2YWx1ZS5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9IG11bHRpcGxpZXJcblx0ICogQHJldHVybiB7TW9uZXl9IFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgTW9uZXlcblx0ICovXG5cdG11bHRpcGx5KCBtdWx0aXBsaWVyICkge1xuXHRcdHJldHVybiBuZXcgTW9uZXkoIHRoaXMuYW1vdW50LnRpbWVzKCBtdWx0aXBsaWVyICksIHRoaXMuY3VycmVuY3kgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEaXZpZGUgdGhpcyBtb25leSBvYmplY3QgYnkgdGhlIHByb3ZpZGVkIGRpdmlzb3IgdmFsdWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBkaXZpc29yXG5cdCAqIEByZXR1cm4ge01vbmV5fSBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIE1vbmV5XG5cdCAqL1xuXHRkaXZpZGUoIGRpdmlzb3IgKSB7XG5cdFx0cmV0dXJuIG5ldyBNb25leSggdGhpcy5hbW91bnQuZGl2aWRlZEJ5KCBkaXZpc29yICksIHRoaXMuY3VycmVuY3kgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbGxvY2F0ZXMgZnVuZCBiYXNlcyBvbiB0aGUgcmF0aW9zIHByb3ZpZGVkIHJldHVybmluZyBhbiBhcnJheSBvZiBNb25leVxuXHQgKiBvYmplY3RzIGFzIGEgcHJvZHVjdCBvZiB0aGUgYWxsb2NhdGlvbi5cblx0ICpcblx0ICogRXhhbXBsZTogc3BsaXR0aW5nIGEgcHJvdmlkZWQgTW9uZXkgb2JqZWN0IHRocmVlIGVxdWFsIHdheXMuXG5cdCAqXG5cdCAqIGBgYFxuXHQgKiBjb25zdCBzcGxpdE1vbmV5ID0gbW9uZXlJbnN0YW5jZS5hbGxvY2F0ZSggWyAxLCAxLCAxIF0gKTtcblx0ICogYGBgXG5cdCAqXG5cdCAqIEV4YW1wbGU6IHNwbGl0dGluZyBhIHByb3ZpZGVkIE1vbmV5IG9iamVjdCB0d28gd2F5cyB3aXRoIG9uZSBoYXZpbmcgNzUlXG5cdCAqIG9mIHRoZSBhbGxvY2F0aW9uLlxuXHQgKlxuXHQgKiBgYGBcblx0ICogY29uc3Qgc3BsaXRNb25leSA9IG1vbmV5SW5zdGFuY2UuYWxsb2NhdGUoIFsgNzUsIDI1IF0gKTtcblx0ICogYGBgXG5cdCAqXG5cdCAqIE5vdGU6IEFycmF5IHZhbHVlcyBmb3IgcmF0aW9zIGFyZSBzaW1wbHkgdG90YWxsZWQgYW5kIHRoZW4gZWFjaCBlbGVtZW50XG5cdCAqIGlzIGNvbnNpZGVyZWQgYSBmcmFjdGlvbiBvZiB0aGUgdG90YWwgdmFsdWUuICBTbyBob3cgeW91IHN1Ym1pdCByYXRpb1xuXHQgKiB2YWx1ZXMgaXMgdXAgdG8geW91IGZvciB3aGF0ZXZlciBpcyBtb3N0IGNsZWFyIHRvIHlvdS5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJbXX0gcmF0aW9zXG5cdCAqIEByZXR1cm4ge01vbmV5W119IEFuIGFycmF5IG9mIE1vbmV5IG9iamVjdHNcblx0ICovXG5cdGFsbG9jYXRlKCByYXRpb3MgKSB7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0Y29uc3QgcmVzdWx0cyA9IFtdO1xuXHRcdGNvbnN0IGNvbnZlcnRlZFJhdGlvcyA9IFtdO1xuXHRcdGxldCByZW1haW5kZXIgPSBuZXcgRGVjaW1hbCggc2VsZi50b1N1YnVuaXRzKCkgKTtcblx0XHRsZXQgdG90YWwgPSBuZXcgRGVjaW1hbCggMCApO1xuXHRcdC8vIGNvbnZlcnQgcmF0aW9zIHRvIGRlY2ltYWwgYW5kIGdlbmVyYXRlIHRvdGFsLlxuXHRcdHJhdGlvcy5mb3JFYWNoKCAoIHJhdGlvICkgPT4ge1xuXHRcdFx0Y29udmVydGVkUmF0aW9zLnB1c2goXG5cdFx0XHRcdGluc3RhbmNlT2YoIHJhdGlvLCAnRGVjaW1hbCcgKSA/IHJhdGlvIDogbmV3IERlY2ltYWwoIHJhdGlvIClcblx0XHRcdCk7XG5cdFx0XHR0b3RhbCA9IHRvdGFsLnBsdXMoIHJhdGlvICk7XG5cdFx0fSApO1xuXHRcdGNvbnZlcnRlZFJhdGlvcy5mb3JFYWNoKCAoIHJhdGlvICkgPT4ge1xuXHRcdFx0Y29uc3Qgc2hhcmUgPSBuZXcgRGVjaW1hbChcblx0XHRcdFx0TWF0aC5mbG9vcihcblx0XHRcdFx0XHRzZWxmLnRvU3VidW5pdHMoKSAqIHJhdGlvLnRvTnVtYmVyKCkgLyB0b3RhbC50b051bWJlcigpXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0XHRyZXN1bHRzLnB1c2goXG5cdFx0XHRcdG5ldyBNb25leShcblx0XHRcdFx0XHRzaGFyZS5kaXZpZGVkQnkoIHRoaXMuY3VycmVuY3kuc3VidW5pdHMgKSxcblx0XHRcdFx0XHR0aGlzLmN1cnJlbmN5XG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0XHRyZW1haW5kZXIgPSByZW1haW5kZXIubWludXMoIHNoYXJlICk7XG5cdFx0fSApO1xuXHRcdGZvciAoIGxldCBpID0gMDsgcmVtYWluZGVyLmdyZWF0ZXJUaGFuKCAwICk7IGkrKyApIHtcblx0XHRcdHJlc3VsdHNbIGkgXSA9IG5ldyBNb25leShcblx0XHRcdFx0KCBuZXcgRGVjaW1hbCggcmVzdWx0c1sgaSBdLnRvU3VidW5pdHMoKSApIClcblx0XHRcdFx0XHQucGx1cyggMSApXG5cdFx0XHRcdFx0LmRpdmlkZWRCeSggdGhpcy5jdXJyZW5jeS5zdWJ1bml0cyApLFxuXHRcdFx0XHR0aGlzLmN1cnJlbmN5XG5cdFx0XHQpO1xuXHRcdFx0cmVtYWluZGVyID0gcmVtYWluZGVyLm1pbnVzKCAxICk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhcmVzIHR3byBpbnN0YW5jZXMgb2YgTW9uZXkuXG5cdCAqXG5cdCAqIE5vdGU6IFwic2FtZVwiIG1lYW5zIGhhcyBlcXVhbCB2YWx1ZSBhbmQgZXF1YWwgY3VycmVuY3kuICBJdCBkb2VzIG5vdCBtZWFuXG5cdCAqIGlkZW50aWNhbCBpbnN0YW5jZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge251bWJlcn0gMCBpZiB0aGV5IGFyZSB0aGUgc2FtZSwgMSBpZiB0aGlzIGlzIGdyZWF0ZXIgdGhhblxuXHQgKiBvdGhlciBhbmQgLTEgaWYgb3RoZXIgaXMgZ3JlYXRlciB0aGFuIHRoaXMuXG5cdCAqL1xuXHRjb21wYXJlKCBvdGhlciApIHtcblx0XHQvL3F1aWNrbHkgcmV0dXJuIDAgaWYgaWRlbnRpY2FsXG5cdFx0aWYgKCB0aGlzID09PSBvdGhlciApIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSggdGhpcywgb3RoZXIgKTtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQuY29tcGFyZWRUbyggb3RoZXIuYW1vdW50ICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgd2hldGhlciB0aGlzIE1vbmV5IG9iamVjdCBpcyBncmVhdGVyIHRoYW4gdGhlIG90aGVyIE1vbmV5IG9iamVjdC5cblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoaXMgaXMgZ3JlYXRlciB0aGFuIG90aGVyLlxuXHQgKi9cblx0Z3JlYXRlclRoYW4oIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydFVzaW5nU2FtZUN1cnJlbmN5KCB0aGlzLCBvdGhlciApO1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5ncmVhdGVyVGhhbiggb3RoZXIuYW1vdW50ICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgd2hldGhlciB0aGlzIE1vbmV5IG9iamVjdCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIG90aGVyXG5cdCAqIE1vbmV5IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoaXMgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBvdGhlci5cblx0ICovXG5cdGdyZWF0ZXJUaGFuT3JFcXVhbFRvKCBvdGhlciApIHtcblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSggdGhpcywgb3RoZXIgKTtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQuZ3JlYXRlclRoYW5PckVxdWFsVG8oIG90aGVyLmFtb3VudCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhcmVzIHdoZXRoZXIgdGhpcyBNb25leSBvYmplY3QgaXMgbGVzcyB0aGFuIHRoZSBvdGhlciBNb25leSBvYmplY3QuXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGlzIGlzIGxlc3MgdGhhbiBvdGhlclxuXHQgKi9cblx0bGVzc1RoYW4oIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydFVzaW5nU2FtZUN1cnJlbmN5KCB0aGlzLCBvdGhlciApO1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5sZXNzVGhhbiggb3RoZXIuYW1vdW50ICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgd2hldGhlciB0aGlzIE1vbmV5IG9iamVjdCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIG90aGVyXG5cdCAqIE1vbmV5IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoaXMgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIG90aGVyLlxuXHQgKi9cblx0bGVzc1RoYW5PckVxdWFsVG8oIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydFVzaW5nU2FtZUN1cnJlbmN5KCB0aGlzLCBvdGhlciApO1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5sZXNzVGhhbk9yRXF1YWxUbyggb3RoZXIuYW1vdW50ICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoaXMgb2JqZWN0IGhhcyB0aGUgdmFsdWUgb2YgMFxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBJZiB0cnVlIHRoZW4gdGhlIHZhbHVlIGlzIDAuXG5cdCAqL1xuXHRpc1plcm8oKSB7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmlzWmVybygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyBpZiB0aGUgdmFsdWUgaW4gdGhpcyBNb25leSBvYmplY3QgaXMgbmVnYXRpdmUuXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGUgdmFsdWUgaXMgbmVnYXRpdmUuXG5cdCAqL1xuXHRpc05lZ2F0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5pc05lZ2F0aXZlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoZSB2YWx1ZSBpbiB0aGlzIE1vbmV5IG9iamVjdCBpcyBwb3NpdGl2ZS5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoZSB2YWx1ZSBpcyBwb3NpdGl2ZS5cblx0ICovXG5cdGlzUG9zaXRpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmlzUG9zaXRpdmUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIE1vbmV5IG9iamVjdCBhcyBhIG51bWJlciBwcmltaXRpdmUuXG5cdCAqIEByZXR1cm4ge251bWJlcn0gUmV0dXJucyBhIG51bWJlci5cblx0ICovXG5cdHRvTnVtYmVyKCkge1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC50b051bWJlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGlzIE1vbmV5IG9iamVjdCBpbiBub3JtYWwgKGZpeGVkLXBvaW50KSBub3RhdGlvblxuXHQgKiByb3VuZGVkIHRvIGBkZWNpbWFsUGxhY2VzYCB1c2luZyBgcm91bmRpbmdgIG1vZGUuXG5cdCAqXG5cdCAqIElmIHRoZSB2YWx1ZSBvZiB0aGlzIGluc3RhbmNlIGluIG5vcm1hbCBub3RhdGlvbiBoYXMgZmV3ZXIgdGhhblxuXHQgKiBkZWNpbWFsUGxhY2VzIGZyYWN0aW9uIGRpZ2l0cywgdGhlIHJldHVybiB2YWx1ZSB3aWxsIGJlIGFwcGVuZGVkIHdpdGhcblx0ICogemVyb3MgYWNjb3JkaW5nbHkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZWNpbWFsUGxhY2VzIFRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgdG8gcm91bmQgdG8uXG5cdCAqIElmIG5vdCBwcm92aWRlZCB1c2VzIHRoZSBpbnRlcm5hbCBkZWNpbWFsIHBsYWNlIHZhbHVlLlxuXHQgKiBAcGFyYW0ge251bWJlcn0gcm91bmRpbmcgV2hhdCByb3VuZGluZyB0eXBlIHRvIHVzZSAoMC04KS4gIFVzZSBNb25leSBST1VORFxuXHQgKiBjb25zdGFudHMuICBEZWZhdWx0cyB0byBNb25leS5ST1VORF9IQUxGX1VQXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgTW9uZXlcblx0ICogaW4gbm9ybWFsIChmaXhlZC1wb2ludCkgbm90YXRpb24gcm91bmRlZCB0byBkZWNpbWFsIHBsYWNlcyB1c2luZ1xuXHQgKiByb3VuZGluZyBtb2RlLlxuXHQgKi9cblx0dG9GaXhlZCggZGVjaW1hbFBsYWNlcywgcm91bmRpbmcgPSBNb25leS5ST1VORF9IQUxGX1VQICkge1xuXHRcdGRlY2ltYWxQbGFjZXMgPSBkZWNpbWFsUGxhY2VzIHx8IHRoaXMuY3VycmVuY3kuZGVjaW1hbFBsYWNlcztcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQudG9GaXhlZCggZGVjaW1hbFBsYWNlcywgcm91bmRpbmcgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgbmV3IE1vbmV5IHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIE1vbmV5IHJvdW5kZWRcblx0ICogdG8gYSB3aG9sZSBudW1iZXIgdXNpbmcgcm91bmRpbmcgbW9kZSByb3VuZGluZyBzZXQgb24gdGhlIG9yaWdpbmFsXG5cdCAqIERlY2ltYWwgYW1vdW50LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtNb25leX0gQSBuZXcgTW9uZXkgb2JqZWN0XG5cdCAqL1xuXHR0b0ludGVnZXJNb25leSgpIHtcblx0XHRyZXR1cm4gbmV3IE1vbmV5KFxuXHRcdFx0dGhpcy5hbW91bnQudG9JbnRlZ2VyKCksXG5cdFx0XHR0aGlzLmN1cnJlbmN5XG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIE1vbmV5IG9iamVjdCBhcyBhIGZvcm1hdHRlZCBzdHJpbmcgYWNjb3JkaW5nXG5cdCAqIHRvIHRoZSBjdXJyZW5jeSBjb25maWd1cmF0aW9uLlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFJldHVybnMgYSBmb3JtYXR0ZWQgc3RyaW5nIGFjY29yZGluZyB0byBDdXJyZW5jeS5cblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmZvcm1hdHRlci5mb3JtYXQoXG5cdFx0XHR0aGlzLmFtb3VudC50b051bWJlcigpLFxuXHRcdFx0dGhpcy5mb3JtYXR0ZXIuc2V0dGluZ3Ncblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEByZXR1cm4geyBPYmplY3QgfSBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgdGhlIHNlcmlhbGl6ZWRcblx0ICogdmFsdWUgb2YgdGhpcyBvYmplY3QuXG5cdCAqL1xuXHR0b0pTT04oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGFtb3VudDogdGhpcy5hbW91bnQudG9KU09OKCksXG5cdFx0XHRjdXJyZW5jeTogdGhpcy5jdXJyZW5jeS50b0pTT04oKSxcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIE1vbmV5LlxuXHQgKiBAcGFyYW0ge01vbmV5fSBtb25leVxuXHQgKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0TW9uZXkgPSAoIG1vbmV5ICkgPT4ge1xuXHRcdGFzc2VydE1vbmV5KCBtb25leSApO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIGlmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBDdXJyZW5jeS5cblx0ICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lcblx0ICogQHRocm93cyB7VHlwZUVycm9yfVxuXHQgKi9cblx0c3RhdGljIGFzc2VydEN1cnJlbmN5ID0gKCBjdXJyZW5jeSApID0+IHtcblx0XHRhc3NlcnRDdXJyZW5jeSggY3VycmVuY3kgKTtcblx0fTtcblxuXHQvKipcblx0ICogQXNzZXJ0cyBpZiB0aGUgcHJvdmlkZWQgdmFsdWVzIGFyZSBib3RoIE1vbmV5IG9iamVjdHMgYW5kIGhhdmUgRXF1YWxcblx0ICogQ3VycmVuY3kgb2JqZWN0cy5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gdGhpc01vbmV5XG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyTW9uZXlcblx0ICogQHRocm93cyB7VHlwZUVycm9yfVxuXHQgKi9cblx0c3RhdGljIGFzc2VydFVzaW5nU2FtZUN1cnJlbmN5ID0gKCB0aGlzTW9uZXksIG90aGVyTW9uZXkgKSA9PiB7XG5cdFx0YXNzZXJ0TW9uZXkoIHRoaXNNb25leSApO1xuXHRcdGFzc2VydE1vbmV5KCBvdGhlck1vbmV5ICk7XG5cdFx0YXNzZXJ0U2FtZUN1cnJlbmN5KCB0aGlzTW9uZXkuY3VycmVuY3ksIG90aGVyTW9uZXkuY3VycmVuY3kgKTtcblx0fTtcblxuXHQvKipcblx0ICogQXNzZXJ0cyBpZiB0d28gY3VycmVuY2llcyBhcmUgc2hhbGxvdyBlcXVhbC5cblx0ICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lBXG5cdCAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5QlxuXHQgKiBAdGhyb3dzIHtFeGNlcHRpb259XG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0U2FtZUN1cnJlbmN5ID0gKCBjdXJyZW5jeUEsIGN1cnJlbmN5QiApID0+IHtcblx0XHRhc3NlcnRTYW1lQ3VycmVuY3koIGN1cnJlbmN5QSwgY3VycmVuY3lCICk7XG5cdH1cbn1cbiIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDsiLCJmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZjIob2JqKTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG5cdChmYWN0b3J5KChnbG9iYWwuYWNjb3VudGluZyA9IGdsb2JhbC5hY2NvdW50aW5nIHx8IHt9KSkpO1xufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cblx0ZnVuY3Rpb24gX19jb21tb25qcyhmbiwgbW9kdWxlKSB7IHJldHVybiBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH0sIGZuKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMpLCBtb2R1bGUuZXhwb3J0czsgfVxuXG5cdC8qKlxuXHQgKiBUaGUgbGlicmFyeSdzIHNldHRpbmdzIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuXHQgKlxuXHQgKiBDb250YWlucyBkZWZhdWx0IHBhcmFtZXRlcnMgZm9yIGN1cnJlbmN5IGFuZCBudW1iZXIgZm9ybWF0dGluZ1xuXHQgKi9cblx0dmFyIHNldHRpbmdzID0ge1xuXHQgIHN5bWJvbDogJyQnLCAvLyBkZWZhdWx0IGN1cnJlbmN5IHN5bWJvbCBpcyAnJCdcblx0ICBmb3JtYXQ6ICclcyV2JywgLy8gY29udHJvbHMgb3V0cHV0OiAlcyA9IHN5bWJvbCwgJXYgPSB2YWx1ZSAoY2FuIGJlIG9iamVjdCwgc2VlIGRvY3MpXG5cdCAgZGVjaW1hbDogJy4nLCAvLyBkZWNpbWFsIHBvaW50IHNlcGFyYXRvclxuXHQgIHRob3VzYW5kOiAnLCcsIC8vIHRob3VzYW5kcyBzZXBhcmF0b3Jcblx0ICBwcmVjaXNpb246IDIsIC8vIGRlY2ltYWwgcGxhY2VzXG5cdCAgZ3JvdXBpbmc6IDMsIC8vIGRpZ2l0IGdyb3VwaW5nIChub3QgaW1wbGVtZW50ZWQgeWV0KVxuXHQgIHN0cmlwWmVyb3M6IGZhbHNlLCAvLyBzdHJpcCBpbnNpZ25pZmljYW50IHplcm9zIGZyb20gZGVjaW1hbCBwYXJ0XG5cdCAgZmFsbGJhY2s6IDAgLy8gdmFsdWUgcmV0dXJuZWQgb24gdW5mb3JtYXQoKSBmYWlsdXJlXG5cdH07XG5cblx0LyoqXG5cdCAqIFRha2VzIGEgc3RyaW5nL2FycmF5IG9mIHN0cmluZ3MsIHJlbW92ZXMgYWxsIGZvcm1hdHRpbmcvY3J1ZnQgYW5kIHJldHVybnMgdGhlIHJhdyBmbG9hdCB2YWx1ZVxuXHQgKiBBbGlhczogYGFjY291bnRpbmcucGFyc2Uoc3RyaW5nKWBcblx0ICpcblx0ICogRGVjaW1hbCBtdXN0IGJlIGluY2x1ZGVkIGluIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWF0Y2ggZmxvYXRzIChkZWZhdWx0cyB0b1xuXHQgKiBhY2NvdW50aW5nLnNldHRpbmdzLmRlY2ltYWwpLCBzbyBpZiB0aGUgbnVtYmVyIHVzZXMgYSBub24tc3RhbmRhcmQgZGVjaW1hbFxuXHQgKiBzZXBhcmF0b3IsIHByb3ZpZGUgaXQgYXMgdGhlIHNlY29uZCBhcmd1bWVudC5cblx0ICpcblx0ICogQWxzbyBtYXRjaGVzIGJyYWNrZXRlZCBuZWdhdGl2ZXMgKGVnLiAnJCAoMS45OSknID0+IC0xLjk5KVxuXHQgKlxuXHQgKiBEb2Vzbid0IHRocm93IGFueSBlcnJvcnMgKGBOYU5gcyBiZWNvbWUgMCkgYnV0IHRoaXMgbWF5IGNoYW5nZSBpbiBmdXR1cmVcblx0ICpcblx0ICogYGBganNcblx0ICogIGFjY291bnRpbmcudW5mb3JtYXQoXCLCoyAxMiwzNDUsNjc4LjkwIEdCUFwiKTsgLy8gMTIzNDU2NzguOVxuXHQgKiBgYGBcblx0ICpcblx0ICogQG1ldGhvZCB1bmZvcm1hdFxuXHQgKiBAZm9yIGFjY291bnRpbmdcblx0ICogQHBhcmFtIHtTdHJpbmd8QXJyYXk8U3RyaW5nPn0gdmFsdWUgVGhlIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzIGNvbnRhaW5pbmcgdGhlIG51bWJlci9zIHRvIHBhcnNlLlxuXHQgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgICAgICBkZWNpbWFsIE51bWJlciBvZiBkZWNpbWFsIGRpZ2l0cyBvZiB0aGUgcmVzdWx0YW50IG51bWJlclxuXHQgKiBAcmV0dXJuIHtGbG9hdH0gVGhlIHBhcnNlZCBudW1iZXJcblx0ICovXG5cdGZ1bmN0aW9uIHVuZm9ybWF0KHZhbHVlKSB7XG5cdCAgdmFyIGRlY2ltYWwgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBzZXR0aW5ncy5kZWNpbWFsIDogYXJndW1lbnRzWzFdO1xuXHQgIHZhciBmYWxsYmFjayA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IHNldHRpbmdzLmZhbGxiYWNrIDogYXJndW1lbnRzWzJdO1xuXG5cdCAgLy8gUmVjdXJzaXZlbHkgdW5mb3JtYXQgYXJyYXlzOlxuXHQgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHQgICAgcmV0dXJuIHZhbHVlLm1hcChmdW5jdGlvbiAodmFsKSB7XG5cdCAgICAgIHJldHVybiB1bmZvcm1hdCh2YWwsIGRlY2ltYWwsIGZhbGxiYWNrKTtcblx0ICAgIH0pO1xuXHQgIH1cblxuXHQgIC8vIFJldHVybiB0aGUgdmFsdWUgYXMtaXMgaWYgaXQncyBhbHJlYWR5IGEgbnVtYmVyOlxuXHQgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSByZXR1cm4gdmFsdWU7XG5cblx0ICAvLyBCdWlsZCByZWdleCB0byBzdHJpcCBvdXQgZXZlcnl0aGluZyBleGNlcHQgZGlnaXRzLCBkZWNpbWFsIHBvaW50IGFuZCBtaW51cyBzaWduOlxuXHQgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoJ1teMC05LSgtKS0nICsgZGVjaW1hbCArICddJywgWydnJ10pO1xuXHQgIHZhciB1bmZvcm1hdHRlZFZhbHVlU3RyaW5nID0gKCcnICsgdmFsdWUpLnJlcGxhY2UocmVnZXgsICcnKSAvLyBzdHJpcCBvdXQgYW55IGNydWZ0XG5cdCAgLnJlcGxhY2UoZGVjaW1hbCwgJy4nKSAvLyBtYWtlIHN1cmUgZGVjaW1hbCBwb2ludCBpcyBzdGFuZGFyZFxuXHQgIC5yZXBsYWNlKC9cXCgoWy1dKlxcZCpbXildP1xcZCspXFwpL2csICctJDEnKSAvLyByZXBsYWNlIGJyYWNrZXRlZCB2YWx1ZXMgd2l0aCBuZWdhdGl2ZXNcblx0ICAucmVwbGFjZSgvXFwoKC4qKVxcKS8sICcnKTsgLy8gcmVtb3ZlIGFueSBicmFja2V0cyB0aGF0IGRvIG5vdCBoYXZlIG51bWVyaWMgdmFsdWVcblxuXHQgIC8qKlxuXHQgICAqIEhhbmRsaW5nIC12ZSBudW1iZXIgYW5kIGJyYWNrZXQsIGVnLlxuXHQgICAqICgtMTAwKSA9IDEwMCwgLSgxMDApID0gMTAwLCAtLTEwMCA9IDEwMFxuXHQgICAqL1xuXHQgIHZhciBuZWdhdGl2ZSA9ICh1bmZvcm1hdHRlZFZhbHVlU3RyaW5nLm1hdGNoKC8tL2cpIHx8IDIpLmxlbmd0aCAlIDIsXG5cdCAgICAgIGFic1VuZm9ybWF0dGVkID0gcGFyc2VGbG9hdCh1bmZvcm1hdHRlZFZhbHVlU3RyaW5nLnJlcGxhY2UoLy0vZywgJycpKSxcblx0ICAgICAgdW5mb3JtYXR0ZWQgPSBhYnNVbmZvcm1hdHRlZCAqIChuZWdhdGl2ZSA/IC0xIDogMSk7XG5cblx0ICAvLyBUaGlzIHdpbGwgZmFpbCBzaWxlbnRseSB3aGljaCBtYXkgY2F1c2UgdHJvdWJsZSwgbGV0J3Mgd2FpdCBhbmQgc2VlOlxuXHQgIHJldHVybiAhaXNOYU4odW5mb3JtYXR0ZWQpID8gdW5mb3JtYXR0ZWQgOiBmYWxsYmFjaztcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayBhbmQgbm9ybWFsaXNlIHRoZSB2YWx1ZSBvZiBwcmVjaXNpb24gKG11c3QgYmUgcG9zaXRpdmUgaW50ZWdlcilcblx0ICovXG5cdGZ1bmN0aW9uIF9jaGVja1ByZWNpc2lvbih2YWwsIGJhc2UpIHtcblx0ICB2YWwgPSBNYXRoLnJvdW5kKE1hdGguYWJzKHZhbCkpO1xuXHQgIHJldHVybiBpc05hTih2YWwpID8gYmFzZSA6IHZhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbXBsZW1lbnRhdGlvbiBvZiB0b0ZpeGVkKCkgdGhhdCB0cmVhdHMgZmxvYXRzIG1vcmUgbGlrZSBkZWNpbWFsc1xuXHQgKlxuXHQgKiBGaXhlcyBiaW5hcnkgcm91bmRpbmcgaXNzdWVzIChlZy4gKDAuNjE1KS50b0ZpeGVkKDIpID09PSAnMC42MScpIHRoYXQgcHJlc2VudFxuXHQgKiBwcm9ibGVtcyBmb3IgYWNjb3VudGluZy0gYW5kIGZpbmFuY2UtcmVsYXRlZCBzb2Z0d2FyZS5cblx0ICpcblx0ICogYGBganNcblx0ICogICgwLjYxNSkudG9GaXhlZCgyKTsgICAgICAgICAgIC8vIFwiMC42MVwiIChuYXRpdmUgdG9GaXhlZCBoYXMgcm91bmRpbmcgaXNzdWVzKVxuXHQgKiAgYWNjb3VudGluZy50b0ZpeGVkKDAuNjE1LCAyKTsgLy8gXCIwLjYyXCJcblx0ICogYGBgXG5cdCAqXG5cdCAqIEBtZXRob2QgdG9GaXhlZFxuXHQgKiBAZm9yIGFjY291bnRpbmdcblx0ICogQHBhcmFtIHtGbG9hdH0gICB2YWx1ZSAgICAgICAgIFRoZSBmbG9hdCB0byBiZSB0cmVhdGVkIGFzIGEgZGVjaW1hbCBudW1iZXIuXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbcHJlY2lzaW9uPTJdIFRoZSBudW1iZXIgb2YgZGVjaW1hbCBkaWdpdHMgdG8ga2VlcC5cblx0ICogQHJldHVybiB7U3RyaW5nfSBUaGUgZ2l2ZW4gbnVtYmVyIHRyYW5zZm9ybWVkIGludG8gYSBzdHJpbmcgd2l0aCB0aGUgZ2l2ZW4gcHJlY2lzc2lvblxuXHQgKi9cblx0ZnVuY3Rpb24gdG9GaXhlZCh2YWx1ZSwgcHJlY2lzaW9uKSB7XG5cdCAgcHJlY2lzaW9uID0gX2NoZWNrUHJlY2lzaW9uKHByZWNpc2lvbiwgc2V0dGluZ3MucHJlY2lzaW9uKTtcblx0ICB2YXIgcG93ZXIgPSBNYXRoLnBvdygxMCwgcHJlY2lzaW9uKTtcblxuXHQgIC8vIE11bHRpcGx5IHVwIGJ5IHByZWNpc2lvbiwgcm91bmQgYWNjdXJhdGVseSwgdGhlbiBkaXZpZGUgYW5kIHVzZSBuYXRpdmUgdG9GaXhlZCgpOlxuXHQgIHJldHVybiAoTWF0aC5yb3VuZCgodmFsdWUgKyAxZS04KSAqIHBvd2VyKSAvIHBvd2VyKS50b0ZpeGVkKHByZWNpc2lvbik7XG5cdH1cblxuXHR2YXIgaW5kZXggPSBfX2NvbW1vbmpzKGZ1bmN0aW9uIChtb2R1bGUpIHtcblx0LyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXHR2YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblx0ZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdFx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gT2JqZWN0KHZhbCk7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdFx0dmFyIGZyb207XG5cdFx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0XHR2YXIgc3ltYm9scztcblxuXHRcdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRcdHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRvO1xuXHR9O1xuXHR9KTtcblxuXHR2YXIgb2JqZWN0QXNzaWduID0gKGluZGV4ICYmIHR5cGVvZiBpbmRleCA9PT0gJ29iamVjdCcgJiYgJ2RlZmF1bHQnIGluIGluZGV4ID8gaW5kZXhbJ2RlZmF1bHQnXSA6IGluZGV4KTtcblxuXHRmdW5jdGlvbiBfc3RyaXBJbnNpZ25pZmljYW50WmVyb3Moc3RyLCBkZWNpbWFsKSB7XG5cdCAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KGRlY2ltYWwpO1xuXHQgIHZhciBpbnRlZ2VyUGFydCA9IHBhcnRzWzBdO1xuXHQgIHZhciBkZWNpbWFsUGFydCA9IHBhcnRzWzFdLnJlcGxhY2UoLzArJC8sICcnKTtcblxuXHQgIGlmIChkZWNpbWFsUGFydC5sZW5ndGggPiAwKSB7XG5cdCAgICByZXR1cm4gaW50ZWdlclBhcnQgKyBkZWNpbWFsICsgZGVjaW1hbFBhcnQ7XG5cdCAgfVxuXG5cdCAgcmV0dXJuIGludGVnZXJQYXJ0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEZvcm1hdCBhIG51bWJlciwgd2l0aCBjb21tYS1zZXBhcmF0ZWQgdGhvdXNhbmRzIGFuZCBjdXN0b20gcHJlY2lzaW9uL2RlY2ltYWwgcGxhY2VzXG5cdCAqIEFsaWFzOiBgYWNjb3VudGluZy5mb3JtYXQoKWBcblx0ICpcblx0ICogTG9jYWxpc2UgYnkgb3ZlcnJpZGluZyB0aGUgcHJlY2lzaW9uIGFuZCB0aG91c2FuZCAvIGRlY2ltYWwgc2VwYXJhdG9yc1xuXHQgKlxuXHQgKiBgYGBqc1xuXHQgKiBhY2NvdW50aW5nLmZvcm1hdE51bWJlcig1MzE4MDA4KTsgICAgICAgICAgICAgIC8vIDUsMzE4LDAwOFxuXHQgKiBhY2NvdW50aW5nLmZvcm1hdE51bWJlcig5ODc2NTQzLjIxLCB7IHByZWNpc2lvbjogMywgdGhvdXNhbmQ6IFwiIFwiIH0pOyAvLyA5IDg3NiA1NDMuMjEwXG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBAbWV0aG9kIGZvcm1hdE51bWJlclxuXHQgKiBAZm9yIGFjY291bnRpbmdcblx0ICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICBudW1iZXIgVGhlIG51bWJlciB0byBiZSBmb3JtYXR0ZWQuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgW29wdHM9e31dIE9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgb3B0aW9ucyBvZiB0aGUgbWV0aG9kLlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSBnaXZlbiBudW1iZXIgcHJvcGVybHkgZm9ybWF0dGVkLlxuXHQgICovXG5cdGZ1bmN0aW9uIGZvcm1hdE51bWJlcihudW1iZXIpIHtcblx0ICB2YXIgb3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG5cdCAgLy8gUmVzdXJzaXZlbHkgZm9ybWF0IGFycmF5czpcblx0ICBpZiAoQXJyYXkuaXNBcnJheShudW1iZXIpKSB7XG5cdCAgICByZXR1cm4gbnVtYmVyLm1hcChmdW5jdGlvbiAodmFsKSB7XG5cdCAgICAgIHJldHVybiBmb3JtYXROdW1iZXIodmFsLCBvcHRzKTtcblx0ICAgIH0pO1xuXHQgIH1cblxuXHQgIC8vIEJ1aWxkIG9wdGlvbnMgb2JqZWN0IGZyb20gc2Vjb25kIHBhcmFtIChpZiBvYmplY3QpIG9yIGFsbCBwYXJhbXMsIGV4dGVuZGluZyBkZWZhdWx0czpcblx0ICBvcHRzID0gb2JqZWN0QXNzaWduKHt9LCBzZXR0aW5ncywgb3B0cyk7XG5cblx0ICAvLyBEbyBzb21lIGNhbGM6XG5cdCAgdmFyIG5lZ2F0aXZlID0gbnVtYmVyIDwgMCA/ICctJyA6ICcnO1xuXHQgIHZhciBiYXNlID0gcGFyc2VJbnQodG9GaXhlZChNYXRoLmFicyhudW1iZXIpLCBvcHRzLnByZWNpc2lvbiksIDEwKSArICcnO1xuXHQgIHZhciBtb2QgPSBiYXNlLmxlbmd0aCA+IDMgPyBiYXNlLmxlbmd0aCAlIDMgOiAwO1xuXG5cdCAgLy8gRm9ybWF0IHRoZSBudW1iZXI6XG5cdCAgdmFyIGZvcm1hdHRlZCA9IG5lZ2F0aXZlICsgKG1vZCA/IGJhc2Uuc3Vic3RyKDAsIG1vZCkgKyBvcHRzLnRob3VzYW5kIDogJycpICsgYmFzZS5zdWJzdHIobW9kKS5yZXBsYWNlKC8oXFxkezN9KSg/PVxcZCkvZywgJyQxJyArIG9wdHMudGhvdXNhbmQpICsgKG9wdHMucHJlY2lzaW9uID4gMCA/IG9wdHMuZGVjaW1hbCArIHRvRml4ZWQoTWF0aC5hYnMobnVtYmVyKSwgb3B0cy5wcmVjaXNpb24pLnNwbGl0KCcuJylbMV0gOiAnJyk7XG5cblx0ICByZXR1cm4gb3B0cy5zdHJpcFplcm9zID8gX3N0cmlwSW5zaWduaWZpY2FudFplcm9zKGZvcm1hdHRlZCwgb3B0cy5kZWNpbWFsKSA6IGZvcm1hdHRlZDtcblx0fVxuXG5cdHZhciBpbmRleCQxID0gX19jb21tb25qcyhmdW5jdGlvbiAobW9kdWxlKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgc3RyVmFsdWUgPSBTdHJpbmcucHJvdG90eXBlLnZhbHVlT2Y7XG5cdHZhciB0cnlTdHJpbmdPYmplY3QgPSBmdW5jdGlvbiB0cnlTdHJpbmdPYmplY3QodmFsdWUpIHtcblx0XHR0cnkge1xuXHRcdFx0c3RyVmFsdWUuY2FsbCh2YWx1ZSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9O1xuXHR2YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXHR2YXIgc3RyQ2xhc3MgPSAnW29iamVjdCBTdHJpbmddJztcblx0dmFyIGhhc1RvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJztcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRyZXR1cm4gaGFzVG9TdHJpbmdUYWcgPyB0cnlTdHJpbmdPYmplY3QodmFsdWUpIDogdG9TdHIuY2FsbCh2YWx1ZSkgPT09IHN0ckNsYXNzO1xuXHR9O1xuXHR9KTtcblxuXHR2YXIgaXNTdHJpbmcgPSAoaW5kZXgkMSAmJiB0eXBlb2YgaW5kZXgkMSA9PT0gJ29iamVjdCcgJiYgJ2RlZmF1bHQnIGluIGluZGV4JDEgPyBpbmRleCQxWydkZWZhdWx0J10gOiBpbmRleCQxKTtcblxuXHQvKipcblx0ICogUGFyc2VzIGEgZm9ybWF0IHN0cmluZyBvciBvYmplY3QgYW5kIHJldHVybnMgZm9ybWF0IG9iaiBmb3IgdXNlIGluIHJlbmRlcmluZ1xuXHQgKlxuXHQgKiBgZm9ybWF0YCBpcyBlaXRoZXIgYSBzdHJpbmcgd2l0aCB0aGUgZGVmYXVsdCAocG9zaXRpdmUpIGZvcm1hdCwgb3Igb2JqZWN0XG5cdCAqIGNvbnRhaW5pbmcgYHBvc2AgKHJlcXVpcmVkKSwgYG5lZ2AgYW5kIGB6ZXJvYCB2YWx1ZXNcblx0ICpcblx0ICogRWl0aGVyIHN0cmluZyBvciBmb3JtYXQucG9zIG11c3QgY29udGFpbiBcIiV2XCIgKHZhbHVlKSB0byBiZSB2YWxpZFxuXHQgKlxuXHQgKiBAbWV0aG9kIF9jaGVja0N1cnJlbmN5Rm9ybWF0XG5cdCAqIEBmb3IgYWNjb3VudGluZ1xuXHQgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgIFtmb3JtYXQ9XCIlcyV2XCJdIFN0cmluZyB3aXRoIHRoZSBmb3JtYXQgdG8gYXBwbHksIHdoZXJlICVzIGlzIHRoZSBjdXJyZW5jeSBzeW1ib2wgYW5kICV2IGlzIHRoZSB2YWx1ZS5cblx0ICogQHJldHVybiB7T2JqZWN0fSBvYmplY3QgcmVwcmVzbnRpbmcgZm9ybWF0ICh3aXRoIHBvcywgbmVnIGFuZCB6ZXJvIGF0dHJpYnV0ZXMpXG5cdCAqL1xuXHRmdW5jdGlvbiBfY2hlY2tDdXJyZW5jeUZvcm1hdChmb3JtYXQpIHtcblx0ICAvLyBGb3JtYXQgc2hvdWxkIGJlIGEgc3RyaW5nLCBpbiB3aGljaCBjYXNlIGB2YWx1ZWAgKCcldicpIG11c3QgYmUgcHJlc2VudDpcblx0ICBpZiAoaXNTdHJpbmcoZm9ybWF0KSAmJiBmb3JtYXQubWF0Y2goJyV2JykpIHtcblx0ICAgIC8vIENyZWF0ZSBhbmQgcmV0dXJuIHBvc2l0aXZlLCBuZWdhdGl2ZSBhbmQgemVybyBmb3JtYXRzOlxuXHQgICAgcmV0dXJuIHtcblx0ICAgICAgcG9zOiBmb3JtYXQsXG5cdCAgICAgIG5lZzogZm9ybWF0LnJlcGxhY2UoJy0nLCAnJykucmVwbGFjZSgnJXYnLCAnLSV2JyksXG5cdCAgICAgIHplcm86IGZvcm1hdFxuXHQgICAgfTtcblx0ICB9XG5cblx0ICAvLyBPdGhlcndpc2UsIGFzc3VtZSBmb3JtYXQgd2FzIGZpbmU6XG5cdCAgcmV0dXJuIGZvcm1hdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3JtYXQgYSBudW1iZXIgaW50byBjdXJyZW5jeVxuXHQgKlxuXHQgKiBVc2FnZTogYWNjb3VudGluZy5mb3JtYXRNb25leShudW1iZXIsIHN5bWJvbCwgcHJlY2lzaW9uLCB0aG91c2FuZHNTZXAsIGRlY2ltYWxTZXAsIGZvcm1hdClcblx0ICogZGVmYXVsdHM6ICgwLCAnJCcsIDIsICcsJywgJy4nLCAnJXMldicpXG5cdCAqXG5cdCAqIExvY2FsaXNlIGJ5IG92ZXJyaWRpbmcgdGhlIHN5bWJvbCwgcHJlY2lzaW9uLCB0aG91c2FuZCAvIGRlY2ltYWwgc2VwYXJhdG9ycyBhbmQgZm9ybWF0XG5cdCAqXG5cdCAqIGBgYGpzXG5cdCAqIC8vIERlZmF1bHQgdXNhZ2U6XG5cdCAqIGFjY291bnRpbmcuZm9ybWF0TW9uZXkoMTIzNDU2NzgpOyAvLyAkMTIsMzQ1LDY3OC4wMFxuXHQgKlxuXHQgKiAvLyBFdXJvcGVhbiBmb3JtYXR0aW5nIChjdXN0b20gc3ltYm9sIGFuZCBzZXBhcmF0b3JzKSwgY2FuIGFsc28gdXNlIG9wdGlvbnMgb2JqZWN0IGFzIHNlY29uZCBwYXJhbWV0ZXI6XG5cdCAqIGFjY291bnRpbmcuZm9ybWF0TW9uZXkoNDk5OS45OSwgeyBzeW1ib2w6IFwi4oKsXCIsIHByZWNpc2lvbjogMiwgdGhvdXNhbmQ6IFwiLlwiLCBkZWNpbWFsOiBcIixcIiB9KTsgLy8g4oKsNC45OTksOTlcblx0ICpcblx0ICogLy8gTmVnYXRpdmUgdmFsdWVzIGNhbiBiZSBmb3JtYXR0ZWQgbmljZWx5OlxuXHQgKiBhY2NvdW50aW5nLmZvcm1hdE1vbmV5KC01MDAwMDAsIHsgc3ltYm9sOiBcIsKjIFwiLCBwcmVjaXNpb246IDAgfSk7IC8vIMKjIC01MDAsMDAwXG5cdCAqXG5cdCAqIC8vIFNpbXBsZSBgZm9ybWF0YCBzdHJpbmcgYWxsb3dzIGNvbnRyb2wgb2Ygc3ltYm9sIHBvc2l0aW9uICgldiA9IHZhbHVlLCAlcyA9IHN5bWJvbCk6XG5cdCAqIGFjY291bnRpbmcuZm9ybWF0TW9uZXkoNTMxODAwOCwgeyBzeW1ib2w6IFwiR0JQXCIsICBmb3JtYXQ6IFwiJXYgJXNcIiB9KTsgLy8gNSwzMTgsMDA4LjAwIEdCUFxuXHQgKiBgYGBcblx0ICpcblx0ICogQG1ldGhvZCBmb3JtYXRNb25leVxuXHQgKiBAZm9yIGFjY291bnRpbmdcblx0ICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICBudW1iZXIgTnVtYmVyIHRvIGJlIGZvcm1hdHRlZC5cblx0ICogQHBhcmFtIHtPYmplY3R9ICAgICAgICBbb3B0cz17fV0gT2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSBvcHRpb25zIG9mIHRoZSBtZXRob2QuXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGdpdmVuIG51bWJlciBwcm9wZXJseSBmb3JtYXR0ZWQgYXMgbW9uZXkuXG5cdCAqL1xuXHRmdW5jdGlvbiBmb3JtYXRNb25leShudW1iZXIpIHtcblx0ICB2YXIgb3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG5cdCAgLy8gUmVzdXJzaXZlbHkgZm9ybWF0IGFycmF5czpcblx0ICBpZiAoQXJyYXkuaXNBcnJheShudW1iZXIpKSB7XG5cdCAgICByZXR1cm4gbnVtYmVyLm1hcChmdW5jdGlvbiAodmFsKSB7XG5cdCAgICAgIHJldHVybiBmb3JtYXRNb25leSh2YWwsIG9wdHMpO1xuXHQgICAgfSk7XG5cdCAgfVxuXG5cdCAgLy8gQnVpbGQgb3B0aW9ucyBvYmplY3QgZnJvbSBzZWNvbmQgcGFyYW0gKGlmIG9iamVjdCkgb3IgYWxsIHBhcmFtcywgZXh0ZW5kaW5nIGRlZmF1bHRzOlxuXHQgIG9wdHMgPSBvYmplY3RBc3NpZ24oe30sIHNldHRpbmdzLCBvcHRzKTtcblxuXHQgIC8vIENoZWNrIGZvcm1hdCAocmV0dXJucyBvYmplY3Qgd2l0aCBwb3MsIG5lZyBhbmQgemVybyk6XG5cdCAgdmFyIGZvcm1hdHMgPSBfY2hlY2tDdXJyZW5jeUZvcm1hdChvcHRzLmZvcm1hdCk7XG5cblx0ICAvLyBDaG9vc2Ugd2hpY2ggZm9ybWF0IHRvIHVzZSBmb3IgdGhpcyB2YWx1ZTpcblx0ICB2YXIgdXNlRm9ybWF0ID0gdW5kZWZpbmVkO1xuXG5cdCAgaWYgKG51bWJlciA+IDApIHtcblx0ICAgIHVzZUZvcm1hdCA9IGZvcm1hdHMucG9zO1xuXHQgIH0gZWxzZSBpZiAobnVtYmVyIDwgMCkge1xuXHQgICAgdXNlRm9ybWF0ID0gZm9ybWF0cy5uZWc7XG5cdCAgfSBlbHNlIHtcblx0ICAgIHVzZUZvcm1hdCA9IGZvcm1hdHMuemVybztcblx0ICB9XG5cblx0ICAvLyBSZXR1cm4gd2l0aCBjdXJyZW5jeSBzeW1ib2wgYWRkZWQ6XG5cdCAgcmV0dXJuIHVzZUZvcm1hdC5yZXBsYWNlKCclcycsIG9wdHMuc3ltYm9sKS5yZXBsYWNlKCcldicsIGZvcm1hdE51bWJlcihNYXRoLmFicyhudW1iZXIpLCBvcHRzKSk7XG5cdH1cblxuXHQvKipcblx0ICogRm9ybWF0IGEgbGlzdCBvZiBudW1iZXJzIGludG8gYW4gYWNjb3VudGluZyBjb2x1bW4sIHBhZGRpbmcgd2l0aCB3aGl0ZXNwYWNlXG5cdCAqIHRvIGxpbmUgdXAgY3VycmVuY3kgc3ltYm9scywgdGhvdXNhbmQgc2VwYXJhdG9ycyBhbmQgZGVjaW1hbHMgcGxhY2VzXG5cdCAqXG5cdCAqIExpc3Qgc2hvdWxkIGJlIGFuIGFycmF5IG9mIG51bWJlcnNcblx0ICpcblx0ICogUmV0dXJucyBhcnJheSBvZiBhY2NvdXRpbmctZm9ybWF0dGVkIG51bWJlciBzdHJpbmdzIG9mIHNhbWUgbGVuZ3RoXG5cdCAqXG5cdCAqIE5COiBgd2hpdGUtc3BhY2U6cHJlYCBDU1MgcnVsZSBpcyByZXF1aXJlZCBvbiB0aGUgbGlzdCBjb250YWluZXIgdG8gcHJldmVudFxuXHQgKiBicm93c2VycyBmcm9tIGNvbGxhcHNpbmcgdGhlIHdoaXRlc3BhY2UgaW4gdGhlIG91dHB1dCBzdHJpbmdzLlxuXHQgKlxuXHQgKiBgYGBqc1xuXHQgKiBhY2NvdW50aW5nLmZvcm1hdENvbHVtbihbMTIzLjUsIDM0NTYuNDksIDc3Nzg4OC45OSwgMTIzNDU2NzgsIC01NDMyXSwgeyBzeW1ib2w6IFwiJCBcIiB9KTtcblx0ICogYGBgXG5cdCAqXG5cdCAqIEBtZXRob2QgZm9ybWF0Q29sdW1uXG5cdCAqIEBmb3IgYWNjb3VudGluZ1xuXHQgKiBAcGFyYW0ge0FycmF5PE51bWJlcj59IGxpc3QgQW4gYXJyYXkgb2YgbnVtYmVycyB0byBmb3JtYXRcblx0ICogQHBhcmFtIHtPYmplY3R9ICAgICAgICBbb3B0cz17fV0gT2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSBvcHRpb25zIG9mIHRoZSBtZXRob2QuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gW3N5bWJvbD1cIiRcIl0gU3RyaW5nIHdpdGggdGhlIGN1cnJlbmN5IHN5bWJvbC4gRm9yIGNvbnZlbmllbmN5IGlmIGNhbiBiZSBhbiBvYmplY3QgY29udGFpbmluZyBhbGwgdGhlIG9wdGlvbnMgb2YgdGhlIG1ldGhvZC5cblx0ICogQHBhcmFtIHtJbnRlZ2VyfSAgICAgICBbcHJlY2lzaW9uPTJdIE51bWJlciBvZiBkZWNpbWFsIGRpZ2l0c1xuXHQgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgIFt0aG91c2FuZD0nLCddIFN0cmluZyB3aXRoIHRoZSB0aG91c2FuZHMgc2VwYXJhdG9yLlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgIFtkZWNpbWFsPVwiLlwiXSBTdHJpbmcgd2l0aCB0aGUgZGVjaW1hbCBzZXBhcmF0b3IuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgW2Zvcm1hdD1cIiVzJXZcIl0gU3RyaW5nIHdpdGggdGhlIGZvcm1hdCB0byBhcHBseSwgd2hlcmUgJXMgaXMgdGhlIGN1cnJlbmN5IHN5bWJvbCBhbmQgJXYgaXMgdGhlIHZhbHVlLlxuXHQgKiBAcmV0dXJuIHtBcnJheTxTdHJpbmc+fSBhcnJheSBvZiBhY2NvdXRpbmctZm9ybWF0dGVkIG51bWJlciBzdHJpbmdzIG9mIHNhbWUgbGVuZ3RoXG5cdCAqL1xuXHRmdW5jdGlvbiBmb3JtYXRDb2x1bW4obGlzdCkge1xuXHQgIHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cblx0ICBpZiAoIWxpc3QpIHJldHVybiBbXTtcblxuXHQgIC8vIEJ1aWxkIG9wdGlvbnMgb2JqZWN0IGZyb20gc2Vjb25kIHBhcmFtIChpZiBvYmplY3QpIG9yIGFsbCBwYXJhbXMsIGV4dGVuZGluZyBkZWZhdWx0czpcblx0ICBvcHRzID0gb2JqZWN0QXNzaWduKHt9LCBzZXR0aW5ncywgb3B0cyk7XG5cblx0ICAvLyBDaGVjayBmb3JtYXQgKHJldHVybnMgb2JqZWN0IHdpdGggcG9zLCBuZWcgYW5kIHplcm8pLCBvbmx5IG5lZWQgcG9zIGZvciBub3c6XG5cdCAgdmFyIGZvcm1hdHMgPSBfY2hlY2tDdXJyZW5jeUZvcm1hdChvcHRzLmZvcm1hdCk7XG5cblx0ICAvLyBXaGV0aGVyIHRvIHBhZCBhdCBzdGFydCBvZiBzdHJpbmcgb3IgYWZ0ZXIgY3VycmVuY3kgc3ltYm9sOlxuXHQgIHZhciBwYWRBZnRlclN5bWJvbCA9IGZvcm1hdHMucG9zLmluZGV4T2YoJyVzJykgPCBmb3JtYXRzLnBvcy5pbmRleE9mKCcldicpO1xuXG5cdCAgLy8gU3RvcmUgdmFsdWUgZm9yIHRoZSBsZW5ndGggb2YgdGhlIGxvbmdlc3Qgc3RyaW5nIGluIHRoZSBjb2x1bW46XG5cdCAgdmFyIG1heExlbmd0aCA9IDA7XG5cblx0ICAvLyBGb3JtYXQgdGhlIGxpc3QgYWNjb3JkaW5nIHRvIG9wdGlvbnMsIHN0b3JlIHRoZSBsZW5ndGggb2YgdGhlIGxvbmdlc3Qgc3RyaW5nOlxuXHQgIHZhciBmb3JtYXR0ZWQgPSBsaXN0Lm1hcChmdW5jdGlvbiAodmFsKSB7XG5cdCAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG5cdCAgICAgIC8vIFJlY3Vyc2l2ZWx5IGZvcm1hdCBjb2x1bW5zIGlmIGxpc3QgaXMgYSBtdWx0aS1kaW1lbnNpb25hbCBhcnJheTpcblx0ICAgICAgcmV0dXJuIGZvcm1hdENvbHVtbih2YWwsIG9wdHMpO1xuXHQgICAgfVxuXHQgICAgLy8gQ2xlYW4gdXAgdGhlIHZhbHVlXG5cdCAgICB2YWwgPSB1bmZvcm1hdCh2YWwsIG9wdHMuZGVjaW1hbCk7XG5cblx0ICAgIC8vIENob29zZSB3aGljaCBmb3JtYXQgdG8gdXNlIGZvciB0aGlzIHZhbHVlIChwb3MsIG5lZyBvciB6ZXJvKTpcblx0ICAgIHZhciB1c2VGb3JtYXQgPSB1bmRlZmluZWQ7XG5cblx0ICAgIGlmICh2YWwgPiAwKSB7XG5cdCAgICAgIHVzZUZvcm1hdCA9IGZvcm1hdHMucG9zO1xuXHQgICAgfSBlbHNlIGlmICh2YWwgPCAwKSB7XG5cdCAgICAgIHVzZUZvcm1hdCA9IGZvcm1hdHMubmVnO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdXNlRm9ybWF0ID0gZm9ybWF0cy56ZXJvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBGb3JtYXQgdGhpcyB2YWx1ZSwgcHVzaCBpbnRvIGZvcm1hdHRlZCBsaXN0IGFuZCBzYXZlIHRoZSBsZW5ndGg6XG5cdCAgICB2YXIgZlZhbCA9IHVzZUZvcm1hdC5yZXBsYWNlKCclcycsIG9wdHMuc3ltYm9sKS5yZXBsYWNlKCcldicsIGZvcm1hdE51bWJlcihNYXRoLmFicyh2YWwpLCBvcHRzKSk7XG5cblx0ICAgIGlmIChmVmFsLmxlbmd0aCA+IG1heExlbmd0aCkge1xuXHQgICAgICBtYXhMZW5ndGggPSBmVmFsLmxlbmd0aDtcblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIGZWYWw7XG5cdCAgfSk7XG5cblx0ICAvLyBQYWQgZWFjaCBudW1iZXIgaW4gdGhlIGxpc3QgYW5kIHNlbmQgYmFjayB0aGUgY29sdW1uIG9mIG51bWJlcnM6XG5cdCAgcmV0dXJuIGZvcm1hdHRlZC5tYXAoZnVuY3Rpb24gKHZhbCkge1xuXHQgICAgLy8gT25seSBpZiB0aGlzIGlzIGEgc3RyaW5nIChub3QgYSBuZXN0ZWQgYXJyYXksIHdoaWNoIHdvdWxkIGhhdmUgYWxyZWFkeSBiZWVuIHBhZGRlZCk6XG5cdCAgICBpZiAoaXNTdHJpbmcodmFsKSAmJiB2YWwubGVuZ3RoIDwgbWF4TGVuZ3RoKSB7XG5cdCAgICAgIC8vIERlcGVuZGluZyBvbiBzeW1ib2wgcG9zaXRpb24sIHBhZCBhZnRlciBzeW1ib2wgb3IgYXQgaW5kZXggMDpcblx0ICAgICAgcmV0dXJuIHBhZEFmdGVyU3ltYm9sID8gdmFsLnJlcGxhY2Uob3B0cy5zeW1ib2wsIG9wdHMuc3ltYm9sICsgbmV3IEFycmF5KG1heExlbmd0aCAtIHZhbC5sZW5ndGggKyAxKS5qb2luKCcgJykpIDogbmV3IEFycmF5KG1heExlbmd0aCAtIHZhbC5sZW5ndGggKyAxKS5qb2luKCcgJykgKyB2YWw7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdmFsO1xuXHQgIH0pO1xuXHR9XG5cblx0ZXhwb3J0cy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXHRleHBvcnRzLnVuZm9ybWF0ID0gdW5mb3JtYXQ7XG5cdGV4cG9ydHMudG9GaXhlZCA9IHRvRml4ZWQ7XG5cdGV4cG9ydHMuZm9ybWF0TW9uZXkgPSBmb3JtYXRNb25leTtcblx0ZXhwb3J0cy5mb3JtYXROdW1iZXIgPSBmb3JtYXROdW1iZXI7XG5cdGV4cG9ydHMuZm9ybWF0Q29sdW1uID0gZm9ybWF0Q29sdW1uO1xuXHRleHBvcnRzLmZvcm1hdCA9IGZvcm1hdE1vbmV5O1xuXHRleHBvcnRzLnBhcnNlID0gdW5mb3JtYXQ7XG5cbn0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFjY291bnRpbmcudW1kLmpzLm1hcCIsIi8qISBkZWNpbWFsLmpzLWxpZ2h0IHYyLjUuMCBodHRwczovL2dpdGh1Yi5jb20vTWlrZU1jbC9kZWNpbWFsLmpzLWxpZ2h0L0xJQ0VOQ0UgKi9cclxuOyhmdW5jdGlvbiAoZ2xvYmFsU2NvcGUpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG5cclxuICAvKlxyXG4gICAqICBkZWNpbWFsLmpzLWxpZ2h0IHYyLjUuMFxyXG4gICAqICBBbiBhcmJpdHJhcnktcHJlY2lzaW9uIERlY2ltYWwgdHlwZSBmb3IgSmF2YVNjcmlwdC5cclxuICAgKiAgaHR0cHM6Ly9naXRodWIuY29tL01pa2VNY2wvZGVjaW1hbC5qcy1saWdodFxyXG4gICAqICBDb3B5cmlnaHQgKGMpIDIwMTggTWljaGFlbCBNY2xhdWdobGluIDxNOGNoODhsQGdtYWlsLmNvbT5cclxuICAgKiAgTUlUIEV4cGF0IExpY2VuY2VcclxuICAgKi9cclxuXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBFRElUQUJMRSBERUZBVUxUUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG5cclxuICAgIC8vIFRoZSBsaW1pdCBvbiB0aGUgdmFsdWUgb2YgYHByZWNpc2lvbmAsIGFuZCBvbiB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGFyZ3VtZW50IHRvXHJcbiAgICAvLyBgdG9EZWNpbWFsUGxhY2VzYCwgYHRvRXhwb25lbnRpYWxgLCBgdG9GaXhlZGAsIGB0b1ByZWNpc2lvbmAgYW5kIGB0b1NpZ25pZmljYW50RGlnaXRzYC5cclxuICB2YXIgTUFYX0RJR0lUUyA9IDFlOSwgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIDFlOVxyXG5cclxuXHJcbiAgICAvLyBUaGUgaW5pdGlhbCBjb25maWd1cmF0aW9uIHByb3BlcnRpZXMgb2YgdGhlIERlY2ltYWwgY29uc3RydWN0b3IuXHJcbiAgICBEZWNpbWFsID0ge1xyXG5cclxuICAgICAgLy8gVGhlc2UgdmFsdWVzIG11c3QgYmUgaW50ZWdlcnMgd2l0aGluIHRoZSBzdGF0ZWQgcmFuZ2VzIChpbmNsdXNpdmUpLlxyXG4gICAgICAvLyBNb3N0IG9mIHRoZXNlIHZhbHVlcyBjYW4gYmUgY2hhbmdlZCBkdXJpbmcgcnVuLXRpbWUgdXNpbmcgYERlY2ltYWwuY29uZmlnYC5cclxuXHJcbiAgICAgIC8vIFRoZSBtYXhpbXVtIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHMgb2YgdGhlIHJlc3VsdCBvZiBhIGNhbGN1bGF0aW9uIG9yIGJhc2UgY29udmVyc2lvbi5cclxuICAgICAgLy8gRS5nLiBgRGVjaW1hbC5jb25maWcoeyBwcmVjaXNpb246IDIwIH0pO2BcclxuICAgICAgcHJlY2lzaW9uOiAyMCwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMSB0byBNQVhfRElHSVRTXHJcblxyXG4gICAgICAvLyBUaGUgcm91bmRpbmcgbW9kZSB1c2VkIGJ5IGRlZmF1bHQgYnkgYHRvSW50ZWdlcmAsIGB0b0RlY2ltYWxQbGFjZXNgLCBgdG9FeHBvbmVudGlhbGAsXHJcbiAgICAgIC8vIGB0b0ZpeGVkYCwgYHRvUHJlY2lzaW9uYCBhbmQgYHRvU2lnbmlmaWNhbnREaWdpdHNgLlxyXG4gICAgICAvL1xyXG4gICAgICAvLyBST1VORF9VUCAgICAgICAgIDAgQXdheSBmcm9tIHplcm8uXHJcbiAgICAgIC8vIFJPVU5EX0RPV04gICAgICAgMSBUb3dhcmRzIHplcm8uXHJcbiAgICAgIC8vIFJPVU5EX0NFSUwgICAgICAgMiBUb3dhcmRzICtJbmZpbml0eS5cclxuICAgICAgLy8gUk9VTkRfRkxPT1IgICAgICAzIFRvd2FyZHMgLUluZmluaXR5LlxyXG4gICAgICAvLyBST1VORF9IQUxGX1VQICAgIDQgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHVwLlxyXG4gICAgICAvLyBST1VORF9IQUxGX0RPV04gIDUgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIGRvd24uXHJcbiAgICAgIC8vIFJPVU5EX0hBTEZfRVZFTiAgNiBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyBldmVuIG5laWdoYm91ci5cclxuICAgICAgLy8gUk9VTkRfSEFMRl9DRUlMICA3IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB0b3dhcmRzICtJbmZpbml0eS5cclxuICAgICAgLy8gUk9VTkRfSEFMRl9GTE9PUiA4IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB0b3dhcmRzIC1JbmZpbml0eS5cclxuICAgICAgLy9cclxuICAgICAgLy8gRS5nLlxyXG4gICAgICAvLyBgRGVjaW1hbC5yb3VuZGluZyA9IDQ7YFxyXG4gICAgICAvLyBgRGVjaW1hbC5yb3VuZGluZyA9IERlY2ltYWwuUk9VTkRfSEFMRl9VUDtgXHJcbiAgICAgIHJvdW5kaW5nOiA0LCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gOFxyXG5cclxuICAgICAgLy8gVGhlIGV4cG9uZW50IHZhbHVlIGF0IGFuZCBiZW5lYXRoIHdoaWNoIGB0b1N0cmluZ2AgcmV0dXJucyBleHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgICAgLy8gSmF2YVNjcmlwdCBudW1iZXJzOiAtN1xyXG4gICAgICB0b0V4cE5lZzogLTcsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIC1NQVhfRVxyXG5cclxuICAgICAgLy8gVGhlIGV4cG9uZW50IHZhbHVlIGF0IGFuZCBhYm92ZSB3aGljaCBgdG9TdHJpbmdgIHJldHVybnMgZXhwb25lbnRpYWwgbm90YXRpb24uXHJcbiAgICAgIC8vIEphdmFTY3JpcHQgbnVtYmVyczogMjFcclxuICAgICAgdG9FeHBQb3M6ICAyMSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byBNQVhfRVxyXG5cclxuICAgICAgLy8gVGhlIG5hdHVyYWwgbG9nYXJpdGhtIG9mIDEwLlxyXG4gICAgICAvLyAxMTUgZGlnaXRzXHJcbiAgICAgIExOMTA6ICcyLjMwMjU4NTA5Mjk5NDA0NTY4NDAxNzk5MTQ1NDY4NDM2NDIwNzYwMTEwMTQ4ODYyODc3Mjk3NjAzMzMyNzkwMDk2NzU3MjYwOTY3NzM1MjQ4MDIzNTk5NzIwNTA4OTU5ODI5ODM0MTk2Nzc4NDA0MjI4NidcclxuICAgIH0sXHJcblxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFTkQgT0YgRURJVEFCTEUgREVGQVVMVFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHJcbiAgICBleHRlcm5hbCA9IHRydWUsXHJcblxyXG4gICAgZGVjaW1hbEVycm9yID0gJ1tEZWNpbWFsRXJyb3JdICcsXHJcbiAgICBpbnZhbGlkQXJndW1lbnQgPSBkZWNpbWFsRXJyb3IgKyAnSW52YWxpZCBhcmd1bWVudDogJyxcclxuICAgIGV4cG9uZW50T3V0T2ZSYW5nZSA9IGRlY2ltYWxFcnJvciArICdFeHBvbmVudCBvdXQgb2YgcmFuZ2U6ICcsXHJcblxyXG4gICAgbWF0aGZsb29yID0gTWF0aC5mbG9vcixcclxuICAgIG1hdGhwb3cgPSBNYXRoLnBvdyxcclxuXHJcbiAgICBpc0RlY2ltYWwgPSAvXihcXGQrKFxcLlxcZCopP3xcXC5cXGQrKShlWystXT9cXGQrKT8kL2ksXHJcblxyXG4gICAgT05FLFxyXG4gICAgQkFTRSA9IDFlNyxcclxuICAgIExPR19CQVNFID0gNyxcclxuICAgIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxLFxyXG4gICAgTUFYX0UgPSBtYXRoZmxvb3IoTUFYX1NBRkVfSU5URUdFUiAvIExPR19CQVNFKSwgICAgLy8gMTI4Njc0Mjc1MDY3NzI4NFxyXG5cclxuICAgIC8vIERlY2ltYWwucHJvdG90eXBlIG9iamVjdFxyXG4gICAgUCA9IHt9O1xyXG5cclxuXHJcbiAgLy8gRGVjaW1hbCBwcm90b3R5cGUgbWV0aG9kc1xyXG5cclxuXHJcbiAgLypcclxuICAgKiAgYWJzb2x1dGVWYWx1ZSAgICAgICAgICAgICAgICAgICAgICAgYWJzXHJcbiAgICogIGNvbXBhcmVkVG8gICAgICAgICAgICAgICAgICAgICAgICAgIGNtcFxyXG4gICAqICBkZWNpbWFsUGxhY2VzICAgICAgICAgICAgICAgICAgICAgICBkcFxyXG4gICAqICBkaXZpZGVkQnkgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXZcclxuICAgKiAgZGl2aWRlZFRvSW50ZWdlckJ5ICAgICAgICAgICAgICAgICAgaWRpdlxyXG4gICAqICBlcXVhbHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcVxyXG4gICAqICBleHBvbmVudFxyXG4gICAqICBncmVhdGVyVGhhbiAgICAgICAgICAgICAgICAgICAgICAgICBndFxyXG4gICAqICBncmVhdGVyVGhhbk9yRXF1YWxUbyAgICAgICAgICAgICAgICBndGVcclxuICAgKiAgaXNJbnRlZ2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNpbnRcclxuICAgKiAgaXNOZWdhdGl2ZSAgICAgICAgICAgICAgICAgICAgICAgICAgaXNuZWdcclxuICAgKiAgaXNQb3NpdGl2ZSAgICAgICAgICAgICAgICAgICAgICAgICAgaXNwb3NcclxuICAgKiAgaXNaZXJvXHJcbiAgICogIGxlc3NUaGFuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGx0XHJcbiAgICogIGxlc3NUaGFuT3JFcXVhbFRvICAgICAgICAgICAgICAgICAgIGx0ZVxyXG4gICAqICBsb2dhcml0aG0gICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dcclxuICAgKiAgbWludXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViXHJcbiAgICogIG1vZHVsbyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZFxyXG4gICAqICBuYXR1cmFsRXhwb25lbnRpYWwgICAgICAgICAgICAgICAgICBleHBcclxuICAgKiAgbmF0dXJhbExvZ2FyaXRobSAgICAgICAgICAgICAgICAgICAgbG5cclxuICAgKiAgbmVnYXRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVnXHJcbiAgICogIHBsdXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZFxyXG4gICAqICBwcmVjaXNpb24gICAgICAgICAgICAgICAgICAgICAgICAgICBzZFxyXG4gICAqICBzcXVhcmVSb290ICAgICAgICAgICAgICAgICAgICAgICAgICBzcXJ0XHJcbiAgICogIHRpbWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bFxyXG4gICAqICB0b0RlY2ltYWxQbGFjZXMgICAgICAgICAgICAgICAgICAgICB0b2RwXHJcbiAgICogIHRvRXhwb25lbnRpYWxcclxuICAgKiAgdG9GaXhlZFxyXG4gICAqICB0b0ludGVnZXIgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2ludFxyXG4gICAqICB0b051bWJlclxyXG4gICAqICB0b1Bvd2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3dcclxuICAgKiAgdG9QcmVjaXNpb25cclxuICAgKiAgdG9TaWduaWZpY2FudERpZ2l0cyAgICAgICAgICAgICAgICAgdG9zZFxyXG4gICAqICB0b1N0cmluZ1xyXG4gICAqICB2YWx1ZU9mICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxcclxuICAgKi9cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGFic29sdXRlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuYWJzb2x1dGVWYWx1ZSA9IFAuYWJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHggPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzKTtcclxuICAgIGlmICh4LnMpIHgucyA9IDE7XHJcbiAgICByZXR1cm4geDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm5cclxuICAgKiAgIDEgICAgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBncmVhdGVyIHRoYW4gdGhlIHZhbHVlIG9mIGB5YCxcclxuICAgKiAgLTEgICAgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBsZXNzIHRoYW4gdGhlIHZhbHVlIG9mIGB5YCxcclxuICAgKiAgIDAgICAgaWYgdGhleSBoYXZlIHRoZSBzYW1lIHZhbHVlXHJcbiAgICpcclxuICAgKi9cclxuICBQLmNvbXBhcmVkVG8gPSBQLmNtcCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICB2YXIgaSwgaiwgeGRMLCB5ZEwsXHJcbiAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgIHkgPSBuZXcgeC5jb25zdHJ1Y3Rvcih5KTtcclxuXHJcbiAgICAvLyBTaWducyBkaWZmZXI/XHJcbiAgICBpZiAoeC5zICE9PSB5LnMpIHJldHVybiB4LnMgfHwgLXkucztcclxuXHJcbiAgICAvLyBDb21wYXJlIGV4cG9uZW50cy5cclxuICAgIGlmICh4LmUgIT09IHkuZSkgcmV0dXJuIHguZSA+IHkuZSBeIHgucyA8IDAgPyAxIDogLTE7XHJcblxyXG4gICAgeGRMID0geC5kLmxlbmd0aDtcclxuICAgIHlkTCA9IHkuZC5sZW5ndGg7XHJcblxyXG4gICAgLy8gQ29tcGFyZSBkaWdpdCBieSBkaWdpdC5cclxuICAgIGZvciAoaSA9IDAsIGogPSB4ZEwgPCB5ZEwgPyB4ZEwgOiB5ZEw7IGkgPCBqOyArK2kpIHtcclxuICAgICAgaWYgKHguZFtpXSAhPT0geS5kW2ldKSByZXR1cm4geC5kW2ldID4geS5kW2ldIF4geC5zIDwgMCA/IDEgOiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb21wYXJlIGxlbmd0aHMuXHJcbiAgICByZXR1cm4geGRMID09PSB5ZEwgPyAwIDogeGRMID4geWRMIF4geC5zIDwgMCA/IDEgOiAtMTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdGhlIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyBvZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5kZWNpbWFsUGxhY2VzID0gUC5kcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgdyA9IHguZC5sZW5ndGggLSAxLFxyXG4gICAgICBkcCA9ICh3IC0geC5lKSAqIExPR19CQVNFO1xyXG5cclxuICAgIC8vIFN1YnRyYWN0IHRoZSBudW1iZXIgb2YgdHJhaWxpbmcgemVyb3Mgb2YgdGhlIGxhc3Qgd29yZC5cclxuICAgIHcgPSB4LmRbd107XHJcbiAgICBpZiAodykgZm9yICg7IHcgJSAxMCA9PSAwOyB3IC89IDEwKSBkcC0tO1xyXG5cclxuICAgIHJldHVybiBkcCA8IDAgPyAwIDogZHA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBkaXZpZGVkIGJ5IGB5YCwgdHJ1bmNhdGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5kaXZpZGVkQnkgPSBQLmRpdiA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gZGl2aWRlKHRoaXMsIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHkpKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgaW50ZWdlciBwYXJ0IG9mIGRpdmlkaW5nIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWxcclxuICAgKiBieSB0aGUgdmFsdWUgb2YgYHlgLCB0cnVuY2F0ZWQgdG8gYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5kaXZpZGVkVG9JbnRlZ2VyQnkgPSBQLmlkaXYgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuICAgIHJldHVybiByb3VuZChkaXZpZGUoeCwgbmV3IEN0b3IoeSksIDAsIDEpLCBDdG9yLnByZWNpc2lvbik7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2YgYHlgLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5lcXVhbHMgPSBQLmVxID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHJldHVybiAhdGhpcy5jbXAoeSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRoZSAoYmFzZSAxMCkgZXhwb25lbnQgdmFsdWUgb2YgdGhpcyBEZWNpbWFsICh0aGlzLmUgaXMgdGhlIGJhc2UgMTAwMDAwMDAgZXhwb25lbnQpLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5leHBvbmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBnZXRCYXNlMTBFeHBvbmVudCh0aGlzKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGdyZWF0ZXIgdGhhbiB0aGUgdmFsdWUgb2YgYHlgLCBvdGhlcndpc2UgcmV0dXJuXHJcbiAgICogZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmdyZWF0ZXJUaGFuID0gUC5ndCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbXAoeSkgPiAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiBgeWAsXHJcbiAgICogb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZ3JlYXRlclRoYW5PckVxdWFsVG8gPSBQLmd0ZSA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbXAoeSkgPj0gMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGFuIGludGVnZXIsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmlzSW50ZWdlciA9IFAuaXNpbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lID4gdGhpcy5kLmxlbmd0aCAtIDI7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBuZWdhdGl2ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuaXNOZWdhdGl2ZSA9IFAuaXNuZWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zIDwgMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIHBvc2l0aXZlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5pc1Bvc2l0aXZlID0gUC5pc3BvcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnMgPiAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgMCwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuaXNaZXJvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucyA9PT0gMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGxlc3MgdGhhbiBgeWAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmxlc3NUaGFuID0gUC5sdCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbXAoeSkgPCAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGB5YCwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubGVzc1RoYW5PckVxdWFsVG8gPSBQLmx0ZSA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbXAoeSkgPCAxO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0aGUgbG9nYXJpdGhtIG9mIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgdG8gdGhlIHNwZWNpZmllZCBiYXNlLCB0cnVuY2F0ZWQgdG9cclxuICAgKiBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKiBJZiBubyBiYXNlIGlzIHNwZWNpZmllZCwgcmV0dXJuIGxvZ1sxMF0oeCkuXHJcbiAgICpcclxuICAgKiBsb2dbYmFzZV0oeCkgPSBsbih4KSAvIGxuKGJhc2UpXHJcbiAgICpcclxuICAgKiBUaGUgbWF4aW11bSBlcnJvciBvZiB0aGUgcmVzdWx0IGlzIDEgdWxwICh1bml0IGluIHRoZSBsYXN0IHBsYWNlKS5cclxuICAgKlxyXG4gICAqIFtiYXNlXSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBUaGUgYmFzZSBvZiB0aGUgbG9nYXJpdGhtLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5sb2dhcml0aG0gPSBQLmxvZyA9IGZ1bmN0aW9uIChiYXNlKSB7XHJcbiAgICB2YXIgcixcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICBwciA9IEN0b3IucHJlY2lzaW9uLFxyXG4gICAgICB3cHIgPSBwciArIDU7XHJcblxyXG4gICAgLy8gRGVmYXVsdCBiYXNlIGlzIDEwLlxyXG4gICAgaWYgKGJhc2UgPT09IHZvaWQgMCkge1xyXG4gICAgICBiYXNlID0gbmV3IEN0b3IoMTApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYmFzZSA9IG5ldyBDdG9yKGJhc2UpO1xyXG5cclxuICAgICAgLy8gbG9nWy1iXSh4KSA9IE5hTlxyXG4gICAgICAvLyBsb2dbMF0oeCkgID0gTmFOXHJcbiAgICAgIC8vIGxvZ1sxXSh4KSAgPSBOYU5cclxuICAgICAgaWYgKGJhc2UucyA8IDEgfHwgYmFzZS5lcShPTkUpKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnTmFOJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbG9nW2JdKC14KSA9IE5hTlxyXG4gICAgLy8gbG9nW2JdKDApID0gLUluZmluaXR5XHJcbiAgICBpZiAoeC5zIDwgMSkgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgKHgucyA/ICdOYU4nIDogJy1JbmZpbml0eScpKTtcclxuXHJcbiAgICAvLyBsb2dbYl0oMSkgPSAwXHJcbiAgICBpZiAoeC5lcShPTkUpKSByZXR1cm4gbmV3IEN0b3IoMCk7XHJcblxyXG4gICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuICAgIHIgPSBkaXZpZGUobG4oeCwgd3ByKSwgbG4oYmFzZSwgd3ByKSwgd3ByKTtcclxuICAgIGV4dGVybmFsID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gcm91bmQociwgcHIpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgbWludXMgYHlgLCB0cnVuY2F0ZWQgdG9cclxuICAgKiBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKi9cclxuICBQLm1pbnVzID0gUC5zdWIgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIHggPSB0aGlzO1xyXG4gICAgeSA9IG5ldyB4LmNvbnN0cnVjdG9yKHkpO1xyXG4gICAgcmV0dXJuIHgucyA9PSB5LnMgPyBzdWJ0cmFjdCh4LCB5KSA6IGFkZCh4LCAoeS5zID0gLXkucywgeSkpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgbW9kdWxvIGB5YCwgdHJ1bmNhdGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5tb2R1bG8gPSBQLm1vZCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICB2YXIgcSxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG5cclxuICAgIHkgPSBuZXcgQ3Rvcih5KTtcclxuXHJcbiAgICAvLyB4ICUgMCA9IE5hTlxyXG4gICAgaWYgKCF5LnMpIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdOYU4nKTtcclxuXHJcbiAgICAvLyBSZXR1cm4geCBpZiB4IGlzIDAuXHJcbiAgICBpZiAoIXgucykgcmV0dXJuIHJvdW5kKG5ldyBDdG9yKHgpLCBwcik7XHJcblxyXG4gICAgLy8gUHJldmVudCByb3VuZGluZyBvZiBpbnRlcm1lZGlhdGUgY2FsY3VsYXRpb25zLlxyXG4gICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuICAgIHEgPSBkaXZpZGUoeCwgeSwgMCwgMSkudGltZXMoeSk7XHJcbiAgICBleHRlcm5hbCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHgubWludXMocSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG5hdHVyYWwgZXhwb25lbnRpYWwgb2YgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCxcclxuICAgKiBpLmUuIHRoZSBiYXNlIGUgcmFpc2VkIHRvIHRoZSBwb3dlciB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLCB0cnVuY2F0ZWQgdG8gYHByZWNpc2lvbmBcclxuICAgKiBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKi9cclxuICBQLm5hdHVyYWxFeHBvbmVudGlhbCA9IFAuZXhwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGV4cCh0aGlzKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgbmF0dXJhbCBsb2dhcml0aG0gb2YgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCxcclxuICAgKiB0cnVuY2F0ZWQgdG8gYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5uYXR1cmFsTG9nYXJpdGhtID0gUC5sbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBsbih0aGlzKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIG5lZ2F0ZWQsIGkuZS4gYXMgaWYgbXVsdGlwbGllZCBieVxyXG4gICAqIC0xLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5uZWdhdGVkID0gUC5uZWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgeCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMpO1xyXG4gICAgeC5zID0gLXgucyB8fCAwO1xyXG4gICAgcmV0dXJuIHg7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBwbHVzIGB5YCwgdHJ1bmNhdGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5wbHVzID0gUC5hZGQgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIHggPSB0aGlzO1xyXG4gICAgeSA9IG5ldyB4LmNvbnN0cnVjdG9yKHkpO1xyXG4gICAgcmV0dXJuIHgucyA9PSB5LnMgPyBhZGQoeCwgeSkgOiBzdWJ0cmFjdCh4LCAoeS5zID0gLXkucywgeSkpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0aGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cyBvZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICogW3pdIHtib29sZWFufG51bWJlcn0gV2hldGhlciB0byBjb3VudCBpbnRlZ2VyLXBhcnQgdHJhaWxpbmcgemVyb3M6IHRydWUsIGZhbHNlLCAxIG9yIDAuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnByZWNpc2lvbiA9IFAuc2QgPSBmdW5jdGlvbiAoeikge1xyXG4gICAgdmFyIGUsIHNkLCB3LFxyXG4gICAgICB4ID0gdGhpcztcclxuXHJcbiAgICBpZiAoeiAhPT0gdm9pZCAwICYmIHogIT09ICEheiAmJiB6ICE9PSAxICYmIHogIT09IDApIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIHopO1xyXG5cclxuICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KSArIDE7XHJcbiAgICB3ID0geC5kLmxlbmd0aCAtIDE7XHJcbiAgICBzZCA9IHcgKiBMT0dfQkFTRSArIDE7XHJcbiAgICB3ID0geC5kW3ddO1xyXG5cclxuICAgIC8vIElmIG5vbi16ZXJvLi4uXHJcbiAgICBpZiAodykge1xyXG5cclxuICAgICAgLy8gU3VidHJhY3QgdGhlIG51bWJlciBvZiB0cmFpbGluZyB6ZXJvcyBvZiB0aGUgbGFzdCB3b3JkLlxyXG4gICAgICBmb3IgKDsgdyAlIDEwID09IDA7IHcgLz0gMTApIHNkLS07XHJcblxyXG4gICAgICAvLyBBZGQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgdGhlIGZpcnN0IHdvcmQuXHJcbiAgICAgIGZvciAodyA9IHguZFswXTsgdyA+PSAxMDsgdyAvPSAxMCkgc2QrKztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geiAmJiBlID4gc2QgPyBlIDogc2Q7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHNxdWFyZSByb290IG9mIHRoaXMgRGVjaW1hbCwgdHJ1bmNhdGVkIHRvIGBwcmVjaXNpb25gXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5zcXVhcmVSb290ID0gUC5zcXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGUsIG4sIHByLCByLCBzLCB0LCB3cHIsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICAvLyBOZWdhdGl2ZSBvciB6ZXJvP1xyXG4gICAgaWYgKHgucyA8IDEpIHtcclxuICAgICAgaWYgKCF4LnMpIHJldHVybiBuZXcgQ3RvcigwKTtcclxuXHJcbiAgICAgIC8vIHNxcnQoLXgpID0gTmFOXHJcbiAgICAgIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdOYU4nKTtcclxuICAgIH1cclxuXHJcbiAgICBlID0gZ2V0QmFzZTEwRXhwb25lbnQoeCk7XHJcbiAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIEluaXRpYWwgZXN0aW1hdGUuXHJcbiAgICBzID0gTWF0aC5zcXJ0KCt4KTtcclxuXHJcbiAgICAvLyBNYXRoLnNxcnQgdW5kZXJmbG93L292ZXJmbG93P1xyXG4gICAgLy8gUGFzcyB4IHRvIE1hdGguc3FydCBhcyBpbnRlZ2VyLCB0aGVuIGFkanVzdCB0aGUgZXhwb25lbnQgb2YgdGhlIHJlc3VsdC5cclxuICAgIGlmIChzID09IDAgfHwgcyA9PSAxIC8gMCkge1xyXG4gICAgICBuID0gZGlnaXRzVG9TdHJpbmcoeC5kKTtcclxuICAgICAgaWYgKChuLmxlbmd0aCArIGUpICUgMiA9PSAwKSBuICs9ICcwJztcclxuICAgICAgcyA9IE1hdGguc3FydChuKTtcclxuICAgICAgZSA9IG1hdGhmbG9vcigoZSArIDEpIC8gMikgLSAoZSA8IDAgfHwgZSAlIDIpO1xyXG5cclxuICAgICAgaWYgKHMgPT0gMSAvIDApIHtcclxuICAgICAgICBuID0gJzFlJyArIGU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbiA9IHMudG9FeHBvbmVudGlhbCgpO1xyXG4gICAgICAgIG4gPSBuLnNsaWNlKDAsIG4uaW5kZXhPZignZScpICsgMSkgKyBlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByID0gbmV3IEN0b3Iobik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByID0gbmV3IEN0b3Iocy50b1N0cmluZygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG4gICAgcyA9IHdwciA9IHByICsgMztcclxuXHJcbiAgICAvLyBOZXd0b24tUmFwaHNvbiBpdGVyYXRpb24uXHJcbiAgICBmb3IgKDs7KSB7XHJcbiAgICAgIHQgPSByO1xyXG4gICAgICByID0gdC5wbHVzKGRpdmlkZSh4LCB0LCB3cHIgKyAyKSkudGltZXMoMC41KTtcclxuXHJcbiAgICAgIGlmIChkaWdpdHNUb1N0cmluZyh0LmQpLnNsaWNlKDAsIHdwcikgPT09IChuID0gZGlnaXRzVG9TdHJpbmcoci5kKSkuc2xpY2UoMCwgd3ByKSkge1xyXG4gICAgICAgIG4gPSBuLnNsaWNlKHdwciAtIDMsIHdwciArIDEpO1xyXG5cclxuICAgICAgICAvLyBUaGUgNHRoIHJvdW5kaW5nIGRpZ2l0IG1heSBiZSBpbiBlcnJvciBieSAtMSBzbyBpZiB0aGUgNCByb3VuZGluZyBkaWdpdHMgYXJlIDk5OTkgb3JcclxuICAgICAgICAvLyA0OTk5LCBpLmUuIGFwcHJvYWNoaW5nIGEgcm91bmRpbmcgYm91bmRhcnksIGNvbnRpbnVlIHRoZSBpdGVyYXRpb24uXHJcbiAgICAgICAgaWYgKHMgPT0gd3ByICYmIG4gPT0gJzQ5OTknKSB7XHJcblxyXG4gICAgICAgICAgLy8gT24gdGhlIGZpcnN0IGl0ZXJhdGlvbiBvbmx5LCBjaGVjayB0byBzZWUgaWYgcm91bmRpbmcgdXAgZ2l2ZXMgdGhlIGV4YWN0IHJlc3VsdCBhcyB0aGVcclxuICAgICAgICAgIC8vIG5pbmVzIG1heSBpbmZpbml0ZWx5IHJlcGVhdC5cclxuICAgICAgICAgIHJvdW5kKHQsIHByICsgMSwgMCk7XHJcblxyXG4gICAgICAgICAgaWYgKHQudGltZXModCkuZXEoeCkpIHtcclxuICAgICAgICAgICAgciA9IHQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAobiAhPSAnOTk5OScpIHtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd3ByICs9IDQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHRlcm5hbCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHJvdW5kKHIsIHByKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHRpbWVzIGB5YCwgdHJ1bmNhdGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50aW1lcyA9IFAubXVsID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciBjYXJyeSwgZSwgaSwgaywgciwgckwsIHQsIHhkTCwgeWRMLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHhkID0geC5kLFxyXG4gICAgICB5ZCA9ICh5ID0gbmV3IEN0b3IoeSkpLmQ7XHJcblxyXG4gICAgLy8gUmV0dXJuIDAgaWYgZWl0aGVyIGlzIDAuXHJcbiAgICBpZiAoIXgucyB8fCAheS5zKSByZXR1cm4gbmV3IEN0b3IoMCk7XHJcblxyXG4gICAgeS5zICo9IHgucztcclxuICAgIGUgPSB4LmUgKyB5LmU7XHJcbiAgICB4ZEwgPSB4ZC5sZW5ndGg7XHJcbiAgICB5ZEwgPSB5ZC5sZW5ndGg7XHJcblxyXG4gICAgLy8gRW5zdXJlIHhkIHBvaW50cyB0byB0aGUgbG9uZ2VyIGFycmF5LlxyXG4gICAgaWYgKHhkTCA8IHlkTCkge1xyXG4gICAgICByID0geGQ7XHJcbiAgICAgIHhkID0geWQ7XHJcbiAgICAgIHlkID0gcjtcclxuICAgICAgckwgPSB4ZEw7XHJcbiAgICAgIHhkTCA9IHlkTDtcclxuICAgICAgeWRMID0gckw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5pdGlhbGlzZSB0aGUgcmVzdWx0IGFycmF5IHdpdGggemVyb3MuXHJcbiAgICByID0gW107XHJcbiAgICByTCA9IHhkTCArIHlkTDtcclxuICAgIGZvciAoaSA9IHJMOyBpLS07KSByLnB1c2goMCk7XHJcblxyXG4gICAgLy8gTXVsdGlwbHkhXHJcbiAgICBmb3IgKGkgPSB5ZEw7IC0taSA+PSAwOykge1xyXG4gICAgICBjYXJyeSA9IDA7XHJcbiAgICAgIGZvciAoayA9IHhkTCArIGk7IGsgPiBpOykge1xyXG4gICAgICAgIHQgPSByW2tdICsgeWRbaV0gKiB4ZFtrIC0gaSAtIDFdICsgY2Fycnk7XHJcbiAgICAgICAgcltrLS1dID0gdCAlIEJBU0UgfCAwO1xyXG4gICAgICAgIGNhcnJ5ID0gdCAvIEJBU0UgfCAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByW2tdID0gKHJba10gKyBjYXJyeSkgJSBCQVNFIHwgMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICBmb3IgKDsgIXJbLS1yTF07KSByLnBvcCgpO1xyXG5cclxuICAgIGlmIChjYXJyeSkgKytlO1xyXG4gICAgZWxzZSByLnNoaWZ0KCk7XHJcblxyXG4gICAgeS5kID0gcjtcclxuICAgIHkuZSA9IGU7XHJcblxyXG4gICAgcmV0dXJuIGV4dGVybmFsID8gcm91bmQoeSwgQ3Rvci5wcmVjaXNpb24pIDogeTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHJvdW5kZWQgdG8gYSBtYXhpbXVtIG9mIGBkcGBcclxuICAgKiBkZWNpbWFsIHBsYWNlcyB1c2luZyByb3VuZGluZyBtb2RlIGBybWAgb3IgYHJvdW5kaW5nYCBpZiBgcm1gIGlzIG9taXR0ZWQuXHJcbiAgICpcclxuICAgKiBJZiBgZHBgIGlzIG9taXR0ZWQsIHJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzLiBJbnRlZ2VyLCAwIHRvIE1BWF9ESUdJVFMgaW5jbHVzaXZlLlxyXG4gICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9EZWNpbWFsUGxhY2VzID0gUC50b2RwID0gZnVuY3Rpb24gKGRwLCBybSkge1xyXG4gICAgdmFyIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICB4ID0gbmV3IEN0b3IoeCk7XHJcbiAgICBpZiAoZHAgPT09IHZvaWQgMCkgcmV0dXJuIHg7XHJcblxyXG4gICAgY2hlY2tJbnQzMihkcCwgMCwgTUFYX0RJR0lUUyk7XHJcblxyXG4gICAgaWYgKHJtID09PSB2b2lkIDApIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgIGVsc2UgY2hlY2tJbnQzMihybSwgMCwgOCk7XHJcblxyXG4gICAgcmV0dXJuIHJvdW5kKHgsIGRwICsgZ2V0QmFzZTEwRXhwb25lbnQoeCkgKyAxLCBybSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGluIGV4cG9uZW50aWFsIG5vdGF0aW9uIHJvdW5kZWQgdG9cclxuICAgKiBgZHBgIGZpeGVkIGRlY2ltYWwgcGxhY2VzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXMuIEludGVnZXIsIDAgdG8gTUFYX0RJR0lUUyBpbmNsdXNpdmUuXHJcbiAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b0V4cG9uZW50aWFsID0gZnVuY3Rpb24gKGRwLCBybSkge1xyXG4gICAgdmFyIHN0cixcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmIChkcCA9PT0gdm9pZCAwKSB7XHJcbiAgICAgIHN0ciA9IHRvU3RyaW5nKHgsIHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hlY2tJbnQzMihkcCwgMCwgTUFYX0RJR0lUUyk7XHJcblxyXG4gICAgICBpZiAocm0gPT09IHZvaWQgMCkgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgICBlbHNlIGNoZWNrSW50MzIocm0sIDAsIDgpO1xyXG5cclxuICAgICAgeCA9IHJvdW5kKG5ldyBDdG9yKHgpLCBkcCArIDEsIHJtKTtcclxuICAgICAgc3RyID0gdG9TdHJpbmcoeCwgdHJ1ZSwgZHAgKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpbiBub3JtYWwgKGZpeGVkLXBvaW50KSBub3RhdGlvbiB0b1xyXG4gICAqIGBkcGAgZml4ZWQgZGVjaW1hbCBwbGFjZXMgYW5kIHJvdW5kZWQgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm1gIG9yIGByb3VuZGluZ2AgaWYgYHJtYCBpc1xyXG4gICAqIG9taXR0ZWQuXHJcbiAgICpcclxuICAgKiBBcyB3aXRoIEphdmFTY3JpcHQgbnVtYmVycywgKC0wKS50b0ZpeGVkKDApIGlzICcwJywgYnV0IGUuZy4gKC0wLjAwMDAxKS50b0ZpeGVkKDApIGlzICctMCcuXHJcbiAgICpcclxuICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzLiBJbnRlZ2VyLCAwIHRvIE1BWF9ESUdJVFMgaW5jbHVzaXZlLlxyXG4gICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqICgtMCkudG9GaXhlZCgwKSBpcyAnMCcsIGJ1dCAoLTAuMSkudG9GaXhlZCgwKSBpcyAnLTAnLlxyXG4gICAqICgtMCkudG9GaXhlZCgxKSBpcyAnMC4wJywgYnV0ICgtMC4wMSkudG9GaXhlZCgxKSBpcyAnLTAuMCcuXHJcbiAgICogKC0wKS50b0ZpeGVkKDMpIGlzICcwLjAwMCcuXHJcbiAgICogKC0wLjUpLnRvRml4ZWQoMCkgaXMgJy0wJy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9GaXhlZCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgIHZhciBzdHIsIHksXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICBpZiAoZHAgPT09IHZvaWQgMCkgcmV0dXJuIHRvU3RyaW5nKHgpO1xyXG5cclxuICAgIGNoZWNrSW50MzIoZHAsIDAsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgIGlmIChybSA9PT0gdm9pZCAwKSBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICBlbHNlIGNoZWNrSW50MzIocm0sIDAsIDgpO1xyXG5cclxuICAgIHkgPSByb3VuZChuZXcgQ3Rvcih4KSwgZHAgKyBnZXRCYXNlMTBFeHBvbmVudCh4KSArIDEsIHJtKTtcclxuICAgIHN0ciA9IHRvU3RyaW5nKHkuYWJzKCksIGZhbHNlLCBkcCArIGdldEJhc2UxMEV4cG9uZW50KHkpICsgMSk7XHJcblxyXG4gICAgLy8gVG8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gYWRkIHRoZSBtaW51cyBzaWduIGxvb2sgYXQgdGhlIHZhbHVlIGJlZm9yZSBpdCB3YXMgcm91bmRlZCxcclxuICAgIC8vIGkuZS4gbG9vayBhdCBgeGAgcmF0aGVyIHRoYW4gYHlgLlxyXG4gICAgcmV0dXJuIHguaXNuZWcoKSAmJiAheC5pc1plcm8oKSA/ICctJyArIHN0ciA6IHN0cjtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHJvdW5kZWQgdG8gYSB3aG9sZSBudW1iZXIgdXNpbmdcclxuICAgKiByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvSW50ZWdlciA9IFAudG9pbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG4gICAgcmV0dXJuIHJvdW5kKG5ldyBDdG9yKHgpLCBnZXRCYXNlMTBFeHBvbmVudCh4KSArIDEsIEN0b3Iucm91bmRpbmcpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGNvbnZlcnRlZCB0byBhIG51bWJlciBwcmltaXRpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvTnVtYmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICt0aGlzO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgcmFpc2VkIHRvIHRoZSBwb3dlciBgeWAsXHJcbiAgICogdHJ1bmNhdGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqIEZvciBub24taW50ZWdlciBvciB2ZXJ5IGxhcmdlIGV4cG9uZW50cyBwb3coeCwgeSkgaXMgY2FsY3VsYXRlZCB1c2luZ1xyXG4gICAqXHJcbiAgICogICB4XnkgPSBleHAoeSpsbih4KSlcclxuICAgKlxyXG4gICAqIFRoZSBtYXhpbXVtIGVycm9yIGlzIDEgdWxwICh1bml0IGluIGxhc3QgcGxhY2UpLlxyXG4gICAqXHJcbiAgICogeSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBUaGUgcG93ZXIgdG8gd2hpY2ggdG8gcmFpc2UgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b1Bvd2VyID0gUC5wb3cgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIGUsIGssIHByLCByLCBzaWduLCB5SXNJbnQsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgZ3VhcmQgPSAxMixcclxuICAgICAgeW4gPSArKHkgPSBuZXcgQ3Rvcih5KSk7XHJcblxyXG4gICAgLy8gcG93KHgsIDApID0gMVxyXG4gICAgaWYgKCF5LnMpIHJldHVybiBuZXcgQ3RvcihPTkUpO1xyXG5cclxuICAgIHggPSBuZXcgQ3Rvcih4KTtcclxuXHJcbiAgICAvLyBwb3coMCwgeSA+IDApID0gMFxyXG4gICAgLy8gcG93KDAsIHkgPCAwKSA9IEluZmluaXR5XHJcbiAgICBpZiAoIXgucykge1xyXG4gICAgICBpZiAoeS5zIDwgMSkgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgJ0luZmluaXR5Jyk7XHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHBvdygxLCB5KSA9IDFcclxuICAgIGlmICh4LmVxKE9ORSkpIHJldHVybiB4O1xyXG5cclxuICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcblxyXG4gICAgLy8gcG93KHgsIDEpID0geFxyXG4gICAgaWYgKHkuZXEoT05FKSkgcmV0dXJuIHJvdW5kKHgsIHByKTtcclxuXHJcbiAgICBlID0geS5lO1xyXG4gICAgayA9IHkuZC5sZW5ndGggLSAxO1xyXG4gICAgeUlzSW50ID0gZSA+PSBrO1xyXG4gICAgc2lnbiA9IHgucztcclxuXHJcbiAgICBpZiAoIXlJc0ludCkge1xyXG5cclxuICAgICAgLy8gcG93KHggPCAwLCB5IG5vbi1pbnRlZ2VyKSA9IE5hTlxyXG4gICAgICBpZiAoc2lnbiA8IDApIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdOYU4nKTtcclxuXHJcbiAgICAvLyBJZiB5IGlzIGEgc21hbGwgaW50ZWdlciB1c2UgdGhlICdleHBvbmVudGlhdGlvbiBieSBzcXVhcmluZycgYWxnb3JpdGhtLlxyXG4gICAgfSBlbHNlIGlmICgoayA9IHluIDwgMCA/IC15biA6IHluKSA8PSBNQVhfU0FGRV9JTlRFR0VSKSB7XHJcbiAgICAgIHIgPSBuZXcgQ3RvcihPTkUpO1xyXG5cclxuICAgICAgLy8gTWF4IGsgb2YgOTAwNzE5OTI1NDc0MDk5MSB0YWtlcyA1MyBsb29wIGl0ZXJhdGlvbnMuXHJcbiAgICAgIC8vIE1heGltdW0gZGlnaXRzIGFycmF5IGxlbmd0aDsgbGVhdmVzIFsyOCwgMzRdIGd1YXJkIGRpZ2l0cy5cclxuICAgICAgZSA9IE1hdGguY2VpbChwciAvIExPR19CQVNFICsgNCk7XHJcblxyXG4gICAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG5cclxuICAgICAgZm9yICg7Oykge1xyXG4gICAgICAgIGlmIChrICUgMikge1xyXG4gICAgICAgICAgciA9IHIudGltZXMoeCk7XHJcbiAgICAgICAgICB0cnVuY2F0ZShyLmQsIGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgayA9IG1hdGhmbG9vcihrIC8gMik7XHJcbiAgICAgICAgaWYgKGsgPT09IDApIGJyZWFrO1xyXG5cclxuICAgICAgICB4ID0geC50aW1lcyh4KTtcclxuICAgICAgICB0cnVuY2F0ZSh4LmQsIGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBleHRlcm5hbCA9IHRydWU7XHJcblxyXG4gICAgICByZXR1cm4geS5zIDwgMCA/IG5ldyBDdG9yKE9ORSkuZGl2KHIpIDogcm91bmQociwgcHIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlc3VsdCBpcyBuZWdhdGl2ZSBpZiB4IGlzIG5lZ2F0aXZlIGFuZCB0aGUgbGFzdCBkaWdpdCBvZiBpbnRlZ2VyIHkgaXMgb2RkLlxyXG4gICAgc2lnbiA9IHNpZ24gPCAwICYmIHkuZFtNYXRoLm1heChlLCBrKV0gJiAxID8gLTEgOiAxO1xyXG5cclxuICAgIHgucyA9IDE7XHJcbiAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG4gICAgciA9IHkudGltZXMobG4oeCwgcHIgKyBndWFyZCkpO1xyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG4gICAgciA9IGV4cChyKTtcclxuICAgIHIucyA9IHNpZ247XHJcblxyXG4gICAgcmV0dXJuIHI7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHJvdW5kZWQgdG8gYHNkYCBzaWduaWZpY2FudCBkaWdpdHNcclxuICAgKiB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiBSZXR1cm4gZXhwb25lbnRpYWwgbm90YXRpb24gaWYgYHNkYCBpcyBsZXNzIHRoYW4gdGhlIG51bWJlciBvZiBkaWdpdHMgbmVjZXNzYXJ5IHRvIHJlcHJlc2VudFxyXG4gICAqIHRoZSBpbnRlZ2VyIHBhcnQgb2YgdGhlIHZhbHVlIGluIG5vcm1hbCBub3RhdGlvbi5cclxuICAgKlxyXG4gICAqIFtzZF0ge251bWJlcn0gU2lnbmlmaWNhbnQgZGlnaXRzLiBJbnRlZ2VyLCAxIHRvIE1BWF9ESUdJVFMgaW5jbHVzaXZlLlxyXG4gICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9QcmVjaXNpb24gPSBmdW5jdGlvbiAoc2QsIHJtKSB7XHJcbiAgICB2YXIgZSwgc3RyLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgaWYgKHNkID09PSB2b2lkIDApIHtcclxuICAgICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpO1xyXG4gICAgICBzdHIgPSB0b1N0cmluZyh4LCBlIDw9IEN0b3IudG9FeHBOZWcgfHwgZSA+PSBDdG9yLnRvRXhwUG9zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoZWNrSW50MzIoc2QsIDEsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgICAgaWYgKHJtID09PSB2b2lkIDApIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgICAgZWxzZSBjaGVja0ludDMyKHJtLCAwLCA4KTtcclxuXHJcbiAgICAgIHggPSByb3VuZChuZXcgQ3Rvcih4KSwgc2QsIHJtKTtcclxuICAgICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpO1xyXG4gICAgICBzdHIgPSB0b1N0cmluZyh4LCBzZCA8PSBlIHx8IGUgPD0gQ3Rvci50b0V4cE5lZywgc2QpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdHI7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByb3VuZGVkIHRvIGEgbWF4aW11bSBvZiBgc2RgXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJtYCwgb3IgdG8gYHByZWNpc2lvbmAgYW5kIGByb3VuZGluZ2AgcmVzcGVjdGl2ZWx5IGlmXHJcbiAgICogb21pdHRlZC5cclxuICAgKlxyXG4gICAqIFtzZF0ge251bWJlcn0gU2lnbmlmaWNhbnQgZGlnaXRzLiBJbnRlZ2VyLCAxIHRvIE1BWF9ESUdJVFMgaW5jbHVzaXZlLlxyXG4gICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9TaWduaWZpY2FudERpZ2l0cyA9IFAudG9zZCA9IGZ1bmN0aW9uIChzZCwgcm0pIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgaWYgKHNkID09PSB2b2lkIDApIHtcclxuICAgICAgc2QgPSBDdG9yLnByZWNpc2lvbjtcclxuICAgICAgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hlY2tJbnQzMihzZCwgMSwgTUFYX0RJR0lUUyk7XHJcblxyXG4gICAgICBpZiAocm0gPT09IHZvaWQgMCkgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgICBlbHNlIGNoZWNrSW50MzIocm0sIDAsIDgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByb3VuZChuZXcgQ3Rvcih4KSwgc2QsIHJtKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKiBSZXR1cm4gZXhwb25lbnRpYWwgbm90YXRpb24gaWYgdGhpcyBEZWNpbWFsIGhhcyBhIHBvc2l0aXZlIGV4cG9uZW50IGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhblxyXG4gICAqIGB0b0V4cFBvc2AsIG9yIGEgbmVnYXRpdmUgZXhwb25lbnQgZXF1YWwgdG8gb3IgbGVzcyB0aGFuIGB0b0V4cE5lZ2AuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvU3RyaW5nID0gUC52YWx1ZU9mID0gUC52YWwgPSBQLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICByZXR1cm4gdG9TdHJpbmcoeCwgZSA8PSBDdG9yLnRvRXhwTmVnIHx8IGUgPj0gQ3Rvci50b0V4cFBvcyk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIERlY2ltYWwucHJvdG90eXBlIChQKSBhbmQvb3IgRGVjaW1hbCBtZXRob2RzLCBhbmQgdGhlaXIgY2FsbGVycy5cclxuXHJcblxyXG4gIC8qXHJcbiAgICogIGFkZCAgICAgICAgICAgICAgICAgUC5taW51cywgUC5wbHVzXHJcbiAgICogIGNoZWNrSW50MzIgICAgICAgICAgUC50b2RwLCBQLnRvRXhwb25lbnRpYWwsIFAudG9GaXhlZCwgUC50b1ByZWNpc2lvbiwgUC50b3NkXHJcbiAgICogIGRpZ2l0c1RvU3RyaW5nICAgICAgUC5sb2csIFAuc3FydCwgUC5wb3csIHRvU3RyaW5nLCBleHAsIGxuXHJcbiAgICogIGRpdmlkZSAgICAgICAgICAgICAgUC5kaXYsIFAuaWRpdiwgUC5sb2csIFAubW9kLCBQLnNxcnQsIGV4cCwgbG5cclxuICAgKiAgZXhwICAgICAgICAgICAgICAgICBQLmV4cCwgUC5wb3dcclxuICAgKiAgZ2V0QmFzZTEwRXhwb25lbnQgICBQLmV4cG9uZW50LCBQLnNkLCBQLnRvaW50LCBQLnNxcnQsIFAudG9kcCwgUC50b0ZpeGVkLCBQLnRvUHJlY2lzaW9uLFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgIFAudG9TdHJpbmcsIGRpdmlkZSwgcm91bmQsIHRvU3RyaW5nLCBleHAsIGxuXHJcbiAgICogIGdldExuMTAgICAgICAgICAgICAgUC5sb2csIGxuXHJcbiAgICogIGdldFplcm9TdHJpbmcgICAgICAgZGlnaXRzVG9TdHJpbmcsIHRvU3RyaW5nXHJcbiAgICogIGxuICAgICAgICAgICAgICAgICAgUC5sb2csIFAubG4sIFAucG93LCBleHBcclxuICAgKiAgcGFyc2VEZWNpbWFsICAgICAgICBEZWNpbWFsXHJcbiAgICogIHJvdW5kICAgICAgICAgICAgICAgUC5hYnMsIFAuaWRpdiwgUC5sb2csIFAubWludXMsIFAubW9kLCBQLm5lZywgUC5wbHVzLCBQLnRvaW50LCBQLnNxcnQsXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgUC50aW1lcywgUC50b2RwLCBQLnRvRXhwb25lbnRpYWwsIFAudG9GaXhlZCwgUC5wb3csIFAudG9QcmVjaXNpb24sIFAudG9zZCxcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICBkaXZpZGUsIGdldExuMTAsIGV4cCwgbG5cclxuICAgKiAgc3VidHJhY3QgICAgICAgICAgICBQLm1pbnVzLCBQLnBsdXNcclxuICAgKiAgdG9TdHJpbmcgICAgICAgICAgICBQLnRvRXhwb25lbnRpYWwsIFAudG9GaXhlZCwgUC50b1ByZWNpc2lvbiwgUC50b1N0cmluZywgUC52YWx1ZU9mXHJcbiAgICogIHRydW5jYXRlICAgICAgICAgICAgUC5wb3dcclxuICAgKlxyXG4gICAqICBUaHJvd3M6ICAgICAgICAgICAgIFAubG9nLCBQLm1vZCwgUC5zZCwgUC5zcXJ0LCBQLnBvdywgIGNoZWNrSW50MzIsIGRpdmlkZSwgcm91bmQsXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgZ2V0TG4xMCwgZXhwLCBsbiwgcGFyc2VEZWNpbWFsLCBEZWNpbWFsLCBjb25maWdcclxuICAgKi9cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGFkZCh4LCB5KSB7XHJcbiAgICB2YXIgY2FycnksIGQsIGUsIGksIGssIGxlbiwgeGQsIHlkLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuXHJcbiAgICAvLyBJZiBlaXRoZXIgaXMgemVyby4uLlxyXG4gICAgaWYgKCF4LnMgfHwgIXkucykge1xyXG5cclxuICAgICAgLy8gUmV0dXJuIHggaWYgeSBpcyB6ZXJvLlxyXG4gICAgICAvLyBSZXR1cm4geSBpZiB5IGlzIG5vbi16ZXJvLlxyXG4gICAgICBpZiAoIXkucykgeSA9IG5ldyBDdG9yKHgpO1xyXG4gICAgICByZXR1cm4gZXh0ZXJuYWwgPyByb3VuZCh5LCBwcikgOiB5O1xyXG4gICAgfVxyXG5cclxuICAgIHhkID0geC5kO1xyXG4gICAgeWQgPSB5LmQ7XHJcblxyXG4gICAgLy8geCBhbmQgeSBhcmUgZmluaXRlLCBub24temVybyBudW1iZXJzIHdpdGggdGhlIHNhbWUgc2lnbi5cclxuXHJcbiAgICBrID0geC5lO1xyXG4gICAgZSA9IHkuZTtcclxuICAgIHhkID0geGQuc2xpY2UoKTtcclxuICAgIGkgPSBrIC0gZTtcclxuXHJcbiAgICAvLyBJZiBiYXNlIDFlNyBleHBvbmVudHMgZGlmZmVyLi4uXHJcbiAgICBpZiAoaSkge1xyXG4gICAgICBpZiAoaSA8IDApIHtcclxuICAgICAgICBkID0geGQ7XHJcbiAgICAgICAgaSA9IC1pO1xyXG4gICAgICAgIGxlbiA9IHlkLmxlbmd0aDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkID0geWQ7XHJcbiAgICAgICAgZSA9IGs7XHJcbiAgICAgICAgbGVuID0geGQubGVuZ3RoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBMaW1pdCBudW1iZXIgb2YgemVyb3MgcHJlcGVuZGVkIHRvIG1heChjZWlsKHByIC8gTE9HX0JBU0UpLCBsZW4pICsgMS5cclxuICAgICAgayA9IE1hdGguY2VpbChwciAvIExPR19CQVNFKTtcclxuICAgICAgbGVuID0gayA+IGxlbiA/IGsgKyAxIDogbGVuICsgMTtcclxuXHJcbiAgICAgIGlmIChpID4gbGVuKSB7XHJcbiAgICAgICAgaSA9IGxlbjtcclxuICAgICAgICBkLmxlbmd0aCA9IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFByZXBlbmQgemVyb3MgdG8gZXF1YWxpc2UgZXhwb25lbnRzLiBOb3RlOiBGYXN0ZXIgdG8gdXNlIHJldmVyc2UgdGhlbiBkbyB1bnNoaWZ0cy5cclxuICAgICAgZC5yZXZlcnNlKCk7XHJcbiAgICAgIGZvciAoOyBpLS07KSBkLnB1c2goMCk7XHJcbiAgICAgIGQucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlbiA9IHhkLmxlbmd0aDtcclxuICAgIGkgPSB5ZC5sZW5ndGg7XHJcblxyXG4gICAgLy8gSWYgeWQgaXMgbG9uZ2VyIHRoYW4geGQsIHN3YXAgeGQgYW5kIHlkIHNvIHhkIHBvaW50cyB0byB0aGUgbG9uZ2VyIGFycmF5LlxyXG4gICAgaWYgKGxlbiAtIGkgPCAwKSB7XHJcbiAgICAgIGkgPSBsZW47XHJcbiAgICAgIGQgPSB5ZDtcclxuICAgICAgeWQgPSB4ZDtcclxuICAgICAgeGQgPSBkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE9ubHkgc3RhcnQgYWRkaW5nIGF0IHlkLmxlbmd0aCAtIDEgYXMgdGhlIGZ1cnRoZXIgZGlnaXRzIG9mIHhkIGNhbiBiZSBsZWZ0IGFzIHRoZXkgYXJlLlxyXG4gICAgZm9yIChjYXJyeSA9IDA7IGk7KSB7XHJcbiAgICAgIGNhcnJ5ID0gKHhkWy0taV0gPSB4ZFtpXSArIHlkW2ldICsgY2FycnkpIC8gQkFTRSB8IDA7XHJcbiAgICAgIHhkW2ldICU9IEJBU0U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNhcnJ5KSB7XHJcbiAgICAgIHhkLnVuc2hpZnQoY2FycnkpO1xyXG4gICAgICArK2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgLy8gTm8gbmVlZCB0byBjaGVjayBmb3IgemVybywgYXMgK3ggKyAreSAhPSAwICYmIC14ICsgLXkgIT0gMFxyXG4gICAgZm9yIChsZW4gPSB4ZC5sZW5ndGg7IHhkWy0tbGVuXSA9PSAwOykgeGQucG9wKCk7XHJcblxyXG4gICAgeS5kID0geGQ7XHJcbiAgICB5LmUgPSBlO1xyXG5cclxuICAgIHJldHVybiBleHRlcm5hbCA/IHJvdW5kKHksIHByKSA6IHk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gY2hlY2tJbnQzMihpLCBtaW4sIG1heCkge1xyXG4gICAgaWYgKGkgIT09IH5+aSB8fCBpIDwgbWluIHx8IGkgPiBtYXgpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgaSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gZGlnaXRzVG9TdHJpbmcoZCkge1xyXG4gICAgdmFyIGksIGssIHdzLFxyXG4gICAgICBpbmRleE9mTGFzdFdvcmQgPSBkLmxlbmd0aCAtIDEsXHJcbiAgICAgIHN0ciA9ICcnLFxyXG4gICAgICB3ID0gZFswXTtcclxuXHJcbiAgICBpZiAoaW5kZXhPZkxhc3RXb3JkID4gMCkge1xyXG4gICAgICBzdHIgKz0gdztcclxuICAgICAgZm9yIChpID0gMTsgaSA8IGluZGV4T2ZMYXN0V29yZDsgaSsrKSB7XHJcbiAgICAgICAgd3MgPSBkW2ldICsgJyc7XHJcbiAgICAgICAgayA9IExPR19CQVNFIC0gd3MubGVuZ3RoO1xyXG4gICAgICAgIGlmIChrKSBzdHIgKz0gZ2V0WmVyb1N0cmluZyhrKTtcclxuICAgICAgICBzdHIgKz0gd3M7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHcgPSBkW2ldO1xyXG4gICAgICB3cyA9IHcgKyAnJztcclxuICAgICAgayA9IExPR19CQVNFIC0gd3MubGVuZ3RoO1xyXG4gICAgICBpZiAoaykgc3RyICs9IGdldFplcm9TdHJpbmcoayk7XHJcbiAgICB9IGVsc2UgaWYgKHcgPT09IDApIHtcclxuICAgICAgcmV0dXJuICcwJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3Mgb2YgbGFzdCB3LlxyXG4gICAgZm9yICg7IHcgJSAxMCA9PT0gMDspIHcgLz0gMTA7XHJcblxyXG4gICAgcmV0dXJuIHN0ciArIHc7XHJcbiAgfVxyXG5cclxuXHJcbiAgdmFyIGRpdmlkZSA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gQXNzdW1lcyBub24temVybyB4IGFuZCBrLCBhbmQgaGVuY2Ugbm9uLXplcm8gcmVzdWx0LlxyXG4gICAgZnVuY3Rpb24gbXVsdGlwbHlJbnRlZ2VyKHgsIGspIHtcclxuICAgICAgdmFyIHRlbXAsXHJcbiAgICAgICAgY2FycnkgPSAwLFxyXG4gICAgICAgIGkgPSB4Lmxlbmd0aDtcclxuXHJcbiAgICAgIGZvciAoeCA9IHguc2xpY2UoKTsgaS0tOykge1xyXG4gICAgICAgIHRlbXAgPSB4W2ldICogayArIGNhcnJ5O1xyXG4gICAgICAgIHhbaV0gPSB0ZW1wICUgQkFTRSB8IDA7XHJcbiAgICAgICAgY2FycnkgPSB0ZW1wIC8gQkFTRSB8IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjYXJyeSkgeC51bnNoaWZ0KGNhcnJ5KTtcclxuXHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBhcmUoYSwgYiwgYUwsIGJMKSB7XHJcbiAgICAgIHZhciBpLCByO1xyXG5cclxuICAgICAgaWYgKGFMICE9IGJMKSB7XHJcbiAgICAgICAgciA9IGFMID4gYkwgPyAxIDogLTE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChpID0gciA9IDA7IGkgPCBhTDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoYVtpXSAhPSBiW2ldKSB7XHJcbiAgICAgICAgICAgIHIgPSBhW2ldID4gYltpXSA/IDEgOiAtMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWJ0cmFjdChhLCBiLCBhTCkge1xyXG4gICAgICB2YXIgaSA9IDA7XHJcblxyXG4gICAgICAvLyBTdWJ0cmFjdCBiIGZyb20gYS5cclxuICAgICAgZm9yICg7IGFMLS07KSB7XHJcbiAgICAgICAgYVthTF0gLT0gaTtcclxuICAgICAgICBpID0gYVthTF0gPCBiW2FMXSA/IDEgOiAwO1xyXG4gICAgICAgIGFbYUxdID0gaSAqIEJBU0UgKyBhW2FMXSAtIGJbYUxdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZW1vdmUgbGVhZGluZyB6ZXJvcy5cclxuICAgICAgZm9yICg7ICFhWzBdICYmIGEubGVuZ3RoID4gMTspIGEuc2hpZnQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHgsIHksIHByLCBkcCkge1xyXG4gICAgICB2YXIgY21wLCBlLCBpLCBrLCBwcm9kLCBwcm9kTCwgcSwgcWQsIHJlbSwgcmVtTCwgcmVtMCwgc2QsIHQsIHhpLCB4TCwgeWQwLCB5TCwgeXosXHJcbiAgICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgICAgc2lnbiA9IHgucyA9PSB5LnMgPyAxIDogLTEsXHJcbiAgICAgICAgeGQgPSB4LmQsXHJcbiAgICAgICAgeWQgPSB5LmQ7XHJcblxyXG4gICAgICAvLyBFaXRoZXIgMD9cclxuICAgICAgaWYgKCF4LnMpIHJldHVybiBuZXcgQ3Rvcih4KTtcclxuICAgICAgaWYgKCF5LnMpIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdEaXZpc2lvbiBieSB6ZXJvJyk7XHJcblxyXG4gICAgICBlID0geC5lIC0geS5lO1xyXG4gICAgICB5TCA9IHlkLmxlbmd0aDtcclxuICAgICAgeEwgPSB4ZC5sZW5ndGg7XHJcbiAgICAgIHEgPSBuZXcgQ3RvcihzaWduKTtcclxuICAgICAgcWQgPSBxLmQgPSBbXTtcclxuXHJcbiAgICAgIC8vIFJlc3VsdCBleHBvbmVudCBtYXkgYmUgb25lIGxlc3MgdGhhbiBlLlxyXG4gICAgICBmb3IgKGkgPSAwOyB5ZFtpXSA9PSAoeGRbaV0gfHwgMCk7ICkgKytpO1xyXG4gICAgICBpZiAoeWRbaV0gPiAoeGRbaV0gfHwgMCkpIC0tZTtcclxuXHJcbiAgICAgIGlmIChwciA9PSBudWxsKSB7XHJcbiAgICAgICAgc2QgPSBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG4gICAgICB9IGVsc2UgaWYgKGRwKSB7XHJcbiAgICAgICAgc2QgPSBwciArIChnZXRCYXNlMTBFeHBvbmVudCh4KSAtIGdldEJhc2UxMEV4cG9uZW50KHkpKSArIDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2QgPSBwcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNkIDwgMCkgcmV0dXJuIG5ldyBDdG9yKDApO1xyXG5cclxuICAgICAgLy8gQ29udmVydCBwcmVjaXNpb24gaW4gbnVtYmVyIG9mIGJhc2UgMTAgZGlnaXRzIHRvIGJhc2UgMWU3IGRpZ2l0cy5cclxuICAgICAgc2QgPSBzZCAvIExPR19CQVNFICsgMiB8IDA7XHJcbiAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgLy8gZGl2aXNvciA8IDFlN1xyXG4gICAgICBpZiAoeUwgPT0gMSkge1xyXG4gICAgICAgIGsgPSAwO1xyXG4gICAgICAgIHlkID0geWRbMF07XHJcbiAgICAgICAgc2QrKztcclxuXHJcbiAgICAgICAgLy8gayBpcyB0aGUgY2FycnkuXHJcbiAgICAgICAgZm9yICg7IChpIDwgeEwgfHwgaykgJiYgc2QtLTsgaSsrKSB7XHJcbiAgICAgICAgICB0ID0gayAqIEJBU0UgKyAoeGRbaV0gfHwgMCk7XHJcbiAgICAgICAgICBxZFtpXSA9IHQgLyB5ZCB8IDA7XHJcbiAgICAgICAgICBrID0gdCAlIHlkIHwgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAvLyBkaXZpc29yID49IDFlN1xyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAvLyBOb3JtYWxpc2UgeGQgYW5kIHlkIHNvIGhpZ2hlc3Qgb3JkZXIgZGlnaXQgb2YgeWQgaXMgPj0gQkFTRS8yXHJcbiAgICAgICAgayA9IEJBU0UgLyAoeWRbMF0gKyAxKSB8IDA7XHJcblxyXG4gICAgICAgIGlmIChrID4gMSkge1xyXG4gICAgICAgICAgeWQgPSBtdWx0aXBseUludGVnZXIoeWQsIGspO1xyXG4gICAgICAgICAgeGQgPSBtdWx0aXBseUludGVnZXIoeGQsIGspO1xyXG4gICAgICAgICAgeUwgPSB5ZC5sZW5ndGg7XHJcbiAgICAgICAgICB4TCA9IHhkLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHhpID0geUw7XHJcbiAgICAgICAgcmVtID0geGQuc2xpY2UoMCwgeUwpO1xyXG4gICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyBBZGQgemVyb3MgdG8gbWFrZSByZW1haW5kZXIgYXMgbG9uZyBhcyBkaXZpc29yLlxyXG4gICAgICAgIGZvciAoOyByZW1MIDwgeUw7KSByZW1bcmVtTCsrXSA9IDA7XHJcblxyXG4gICAgICAgIHl6ID0geWQuc2xpY2UoKTtcclxuICAgICAgICB5ei51bnNoaWZ0KDApO1xyXG4gICAgICAgIHlkMCA9IHlkWzBdO1xyXG5cclxuICAgICAgICBpZiAoeWRbMV0gPj0gQkFTRSAvIDIpICsreWQwO1xyXG5cclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICBrID0gMDtcclxuXHJcbiAgICAgICAgICAvLyBDb21wYXJlIGRpdmlzb3IgYW5kIHJlbWFpbmRlci5cclxuICAgICAgICAgIGNtcCA9IGNvbXBhcmUoeWQsIHJlbSwgeUwsIHJlbUwpO1xyXG5cclxuICAgICAgICAgIC8vIElmIGRpdmlzb3IgPCByZW1haW5kZXIuXHJcbiAgICAgICAgICBpZiAoY21wIDwgMCkge1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRyaWFsIGRpZ2l0LCBrLlxyXG4gICAgICAgICAgICByZW0wID0gcmVtWzBdO1xyXG4gICAgICAgICAgICBpZiAoeUwgIT0gcmVtTCkgcmVtMCA9IHJlbTAgKiBCQVNFICsgKHJlbVsxXSB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGsgd2lsbCBiZSBob3cgbWFueSB0aW1lcyB0aGUgZGl2aXNvciBnb2VzIGludG8gdGhlIGN1cnJlbnQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICBrID0gcmVtMCAvIHlkMCB8IDA7XHJcblxyXG4gICAgICAgICAgICAvLyAgQWxnb3JpdGhtOlxyXG4gICAgICAgICAgICAvLyAgMS4gcHJvZHVjdCA9IGRpdmlzb3IgKiB0cmlhbCBkaWdpdCAoaylcclxuICAgICAgICAgICAgLy8gIDIuIGlmIHByb2R1Y3QgPiByZW1haW5kZXI6IHByb2R1Y3QgLT0gZGl2aXNvciwgay0tXHJcbiAgICAgICAgICAgIC8vICAzLiByZW1haW5kZXIgLT0gcHJvZHVjdFxyXG4gICAgICAgICAgICAvLyAgNC4gaWYgcHJvZHVjdCB3YXMgPCByZW1haW5kZXIgYXQgMjpcclxuICAgICAgICAgICAgLy8gICAgNS4gY29tcGFyZSBuZXcgcmVtYWluZGVyIGFuZCBkaXZpc29yXHJcbiAgICAgICAgICAgIC8vICAgIDYuIElmIHJlbWFpbmRlciA+IGRpdmlzb3I6IHJlbWFpbmRlciAtPSBkaXZpc29yLCBrKytcclxuXHJcbiAgICAgICAgICAgIGlmIChrID4gMSkge1xyXG4gICAgICAgICAgICAgIGlmIChrID49IEJBU0UpIGsgPSBCQVNFIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gcHJvZHVjdCA9IGRpdmlzb3IgKiB0cmlhbCBkaWdpdC5cclxuICAgICAgICAgICAgICBwcm9kID0gbXVsdGlwbHlJbnRlZ2VyKHlkLCBrKTtcclxuICAgICAgICAgICAgICBwcm9kTCA9IHByb2QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAvLyBDb21wYXJlIHByb2R1Y3QgYW5kIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICBjbXAgPSBjb21wYXJlKHByb2QsIHJlbSwgcHJvZEwsIHJlbUwpO1xyXG5cclxuICAgICAgICAgICAgICAvLyBwcm9kdWN0ID4gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIGlmIChjbXAgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgay0tO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN1YnRyYWN0IGRpdmlzb3IgZnJvbSBwcm9kdWN0LlxyXG4gICAgICAgICAgICAgICAgc3VidHJhY3QocHJvZCwgeUwgPCBwcm9kTCA/IHl6IDogeWQsIHByb2RMKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIGNtcCBpcyAtMS5cclxuICAgICAgICAgICAgICAvLyBJZiBrIGlzIDAsIHRoZXJlIGlzIG5vIG5lZWQgdG8gY29tcGFyZSB5ZCBhbmQgcmVtIGFnYWluIGJlbG93LCBzbyBjaGFuZ2UgY21wIHRvIDFcclxuICAgICAgICAgICAgICAvLyB0byBhdm9pZCBpdC4gSWYgayBpcyAxIHRoZXJlIGlzIGEgbmVlZCB0byBjb21wYXJlIHlkIGFuZCByZW0gYWdhaW4gYmVsb3cuXHJcbiAgICAgICAgICAgICAgaWYgKGsgPT0gMCkgY21wID0gayA9IDE7XHJcbiAgICAgICAgICAgICAgcHJvZCA9IHlkLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHByb2RMID0gcHJvZC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChwcm9kTCA8IHJlbUwpIHByb2QudW5zaGlmdCgwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN1YnRyYWN0IHByb2R1Y3QgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgIHN1YnRyYWN0KHJlbSwgcHJvZCwgcmVtTCk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBwcm9kdWN0IHdhcyA8IHByZXZpb3VzIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgaWYgKGNtcCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAvLyBDb21wYXJlIGRpdmlzb3IgYW5kIG5ldyByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgY21wID0gY29tcGFyZSh5ZCwgcmVtLCB5TCwgcmVtTCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIElmIGRpdmlzb3IgPCBuZXcgcmVtYWluZGVyLCBzdWJ0cmFjdCBkaXZpc29yIGZyb20gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIGlmIChjbXAgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICBrKys7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAgIHN1YnRyYWN0KHJlbSwgeUwgPCByZW1MID8geXogOiB5ZCwgcmVtTCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoY21wID09PSAwKSB7XHJcbiAgICAgICAgICAgIGsrKztcclxuICAgICAgICAgICAgcmVtID0gWzBdO1xyXG4gICAgICAgICAgfSAgICAvLyBpZiBjbXAgPT09IDEsIGsgd2lsbCBiZSAwXHJcblxyXG4gICAgICAgICAgLy8gQWRkIHRoZSBuZXh0IGRpZ2l0LCBrLCB0byB0aGUgcmVzdWx0IGFycmF5LlxyXG4gICAgICAgICAgcWRbaSsrXSA9IGs7XHJcblxyXG4gICAgICAgICAgLy8gVXBkYXRlIHRoZSByZW1haW5kZXIuXHJcbiAgICAgICAgICBpZiAoY21wICYmIHJlbVswXSkge1xyXG4gICAgICAgICAgICByZW1bcmVtTCsrXSA9IHhkW3hpXSB8fCAwO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVtID0gW3hkW3hpXV07XHJcbiAgICAgICAgICAgIHJlbUwgPSAxO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IHdoaWxlICgoeGkrKyA8IHhMIHx8IHJlbVswXSAhPT0gdm9pZCAwKSAmJiBzZC0tKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTGVhZGluZyB6ZXJvP1xyXG4gICAgICBpZiAoIXFkWzBdKSBxZC5zaGlmdCgpO1xyXG5cclxuICAgICAgcS5lID0gZTtcclxuXHJcbiAgICAgIHJldHVybiByb3VuZChxLCBkcCA/IHByICsgZ2V0QmFzZTEwRXhwb25lbnQocSkgKyAxIDogcHIpO1xyXG4gICAgfTtcclxuICB9KSgpO1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgbmF0dXJhbCBleHBvbmVudGlhbCBvZiBgeGAgdHJ1bmNhdGVkIHRvIGBzZGBcclxuICAgKiBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKiBUYXlsb3IvTWFjbGF1cmluIHNlcmllcy5cclxuICAgKlxyXG4gICAqIGV4cCh4KSA9IHheMC8wISArIHheMS8xISArIHheMi8yISArIHheMy8zISArIC4uLlxyXG4gICAqXHJcbiAgICogQXJndW1lbnQgcmVkdWN0aW9uOlxyXG4gICAqICAgUmVwZWF0IHggPSB4IC8gMzIsIGsgKz0gNSwgdW50aWwgfHh8IDwgMC4xXHJcbiAgICogICBleHAoeCkgPSBleHAoeCAvIDJeayleKDJeaylcclxuICAgKlxyXG4gICAqIFByZXZpb3VzbHksIHRoZSBhcmd1bWVudCB3YXMgaW5pdGlhbGx5IHJlZHVjZWQgYnlcclxuICAgKiBleHAoeCkgPSBleHAocikgKiAxMF5rICB3aGVyZSByID0geCAtIGsgKiBsbjEwLCBrID0gZmxvb3IoeCAvIGxuMTApXHJcbiAgICogdG8gZmlyc3QgcHV0IHIgaW4gdGhlIHJhbmdlIFswLCBsbjEwXSwgYmVmb3JlIGRpdmlkaW5nIGJ5IDMyIHVudGlsIHx4fCA8IDAuMSwgYnV0IHRoaXMgd2FzXHJcbiAgICogZm91bmQgdG8gYmUgc2xvd2VyIHRoYW4ganVzdCBkaXZpZGluZyByZXBlYXRlZGx5IGJ5IDMyIGFzIGFib3ZlLlxyXG4gICAqXHJcbiAgICogKE1hdGggb2JqZWN0IGludGVnZXIgbWluL21heDogTWF0aC5leHAoNzA5KSA9IDguMmUrMzA3LCBNYXRoLmV4cCgtNzQ1KSA9IDVlLTMyNClcclxuICAgKlxyXG4gICAqICBleHAoeCkgaXMgbm9uLXRlcm1pbmF0aW5nIGZvciBhbnkgZmluaXRlLCBub24temVybyB4LlxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gZXhwKHgsIHNkKSB7XHJcbiAgICB2YXIgZGVub21pbmF0b3IsIGd1YXJkLCBwb3csIHN1bSwgdCwgd3ByLFxyXG4gICAgICBpID0gMCxcclxuICAgICAgayA9IDAsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG5cclxuICAgIGlmIChnZXRCYXNlMTBFeHBvbmVudCh4KSA+IDE2KSB0aHJvdyBFcnJvcihleHBvbmVudE91dE9mUmFuZ2UgKyBnZXRCYXNlMTBFeHBvbmVudCh4KSk7XHJcblxyXG4gICAgLy8gZXhwKDApID0gMVxyXG4gICAgaWYgKCF4LnMpIHJldHVybiBuZXcgQ3RvcihPTkUpO1xyXG5cclxuICAgIGlmIChzZCA9PSBudWxsKSB7XHJcbiAgICAgIGV4dGVybmFsID0gZmFsc2U7XHJcbiAgICAgIHdwciA9IHByO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd3ByID0gc2Q7XHJcbiAgICB9XHJcblxyXG4gICAgdCA9IG5ldyBDdG9yKDAuMDMxMjUpO1xyXG5cclxuICAgIHdoaWxlICh4LmFicygpLmd0ZSgwLjEpKSB7XHJcbiAgICAgIHggPSB4LnRpbWVzKHQpOyAgICAvLyB4ID0geCAvIDJeNVxyXG4gICAgICBrICs9IDU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXN0aW1hdGUgdGhlIHByZWNpc2lvbiBpbmNyZWFzZSBuZWNlc3NhcnkgdG8gZW5zdXJlIHRoZSBmaXJzdCA0IHJvdW5kaW5nIGRpZ2l0cyBhcmUgY29ycmVjdC5cclxuICAgIGd1YXJkID0gTWF0aC5sb2cobWF0aHBvdygyLCBrKSkgLyBNYXRoLkxOMTAgKiAyICsgNSB8IDA7XHJcbiAgICB3cHIgKz0gZ3VhcmQ7XHJcbiAgICBkZW5vbWluYXRvciA9IHBvdyA9IHN1bSA9IG5ldyBDdG9yKE9ORSk7XHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IHdwcjtcclxuXHJcbiAgICBmb3IgKDs7KSB7XHJcbiAgICAgIHBvdyA9IHJvdW5kKHBvdy50aW1lcyh4KSwgd3ByKTtcclxuICAgICAgZGVub21pbmF0b3IgPSBkZW5vbWluYXRvci50aW1lcygrK2kpO1xyXG4gICAgICB0ID0gc3VtLnBsdXMoZGl2aWRlKHBvdywgZGVub21pbmF0b3IsIHdwcikpO1xyXG5cclxuICAgICAgaWYgKGRpZ2l0c1RvU3RyaW5nKHQuZCkuc2xpY2UoMCwgd3ByKSA9PT0gZGlnaXRzVG9TdHJpbmcoc3VtLmQpLnNsaWNlKDAsIHdwcikpIHtcclxuICAgICAgICB3aGlsZSAoay0tKSBzdW0gPSByb3VuZChzdW0udGltZXMoc3VtKSwgd3ByKTtcclxuICAgICAgICBDdG9yLnByZWNpc2lvbiA9IHByO1xyXG4gICAgICAgIHJldHVybiBzZCA9PSBudWxsID8gKGV4dGVybmFsID0gdHJ1ZSwgcm91bmQoc3VtLCBwcikpIDogc3VtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdW0gPSB0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vIENhbGN1bGF0ZSB0aGUgYmFzZSAxMCBleHBvbmVudCBmcm9tIHRoZSBiYXNlIDFlNyBleHBvbmVudC5cclxuICBmdW5jdGlvbiBnZXRCYXNlMTBFeHBvbmVudCh4KSB7XHJcbiAgICB2YXIgZSA9IHguZSAqIExPR19CQVNFLFxyXG4gICAgICB3ID0geC5kWzBdO1xyXG5cclxuICAgIC8vIEFkZCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgZGlnaXRzIGFycmF5LlxyXG4gICAgZm9yICg7IHcgPj0gMTA7IHcgLz0gMTApIGUrKztcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGdldExuMTAoQ3Rvciwgc2QsIHByKSB7XHJcblxyXG4gICAgaWYgKHNkID4gQ3Rvci5MTjEwLnNkKCkpIHtcclxuXHJcblxyXG4gICAgICAvLyBSZXNldCBnbG9iYWwgc3RhdGUgaW4gY2FzZSB0aGUgZXhjZXB0aW9uIGlzIGNhdWdodC5cclxuICAgICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG4gICAgICBpZiAocHIpIEN0b3IucHJlY2lzaW9uID0gcHI7XHJcbiAgICAgIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdMTjEwIHByZWNpc2lvbiBsaW1pdCBleGNlZWRlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByb3VuZChuZXcgQ3RvcihDdG9yLkxOMTApLCBzZCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gZ2V0WmVyb1N0cmluZyhrKSB7XHJcbiAgICB2YXIgenMgPSAnJztcclxuICAgIGZvciAoOyBrLS07KSB6cyArPSAnMCc7XHJcbiAgICByZXR1cm4genM7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgbmF0dXJhbCBsb2dhcml0aG0gb2YgYHhgIHRydW5jYXRlZCB0byBgc2RgIHNpZ25pZmljYW50XHJcbiAgICogZGlnaXRzLlxyXG4gICAqXHJcbiAgICogIGxuKG4pIGlzIG5vbi10ZXJtaW5hdGluZyAobiAhPSAxKVxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gbG4oeSwgc2QpIHtcclxuICAgIHZhciBjLCBjMCwgZGVub21pbmF0b3IsIGUsIG51bWVyYXRvciwgc3VtLCB0LCB3cHIsIHgyLFxyXG4gICAgICBuID0gMSxcclxuICAgICAgZ3VhcmQgPSAxMCxcclxuICAgICAgeCA9IHksXHJcbiAgICAgIHhkID0geC5kLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuXHJcbiAgICAvLyBsbigteCkgPSBOYU5cclxuICAgIC8vIGxuKDApID0gLUluZmluaXR5XHJcbiAgICBpZiAoeC5zIDwgMSkgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgKHgucyA/ICdOYU4nIDogJy1JbmZpbml0eScpKTtcclxuXHJcbiAgICAvLyBsbigxKSA9IDBcclxuICAgIGlmICh4LmVxKE9ORSkpIHJldHVybiBuZXcgQ3RvcigwKTtcclxuXHJcbiAgICBpZiAoc2QgPT0gbnVsbCkge1xyXG4gICAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG4gICAgICB3cHIgPSBwcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdwciA9IHNkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh4LmVxKDEwKSkge1xyXG4gICAgICBpZiAoc2QgPT0gbnVsbCkgZXh0ZXJuYWwgPSB0cnVlO1xyXG4gICAgICByZXR1cm4gZ2V0TG4xMChDdG9yLCB3cHIpO1xyXG4gICAgfVxyXG5cclxuICAgIHdwciArPSBndWFyZDtcclxuICAgIEN0b3IucHJlY2lzaW9uID0gd3ByO1xyXG4gICAgYyA9IGRpZ2l0c1RvU3RyaW5nKHhkKTtcclxuICAgIGMwID0gYy5jaGFyQXQoMCk7XHJcbiAgICBlID0gZ2V0QmFzZTEwRXhwb25lbnQoeCk7XHJcblxyXG4gICAgaWYgKE1hdGguYWJzKGUpIDwgMS41ZTE1KSB7XHJcblxyXG4gICAgICAvLyBBcmd1bWVudCByZWR1Y3Rpb24uXHJcbiAgICAgIC8vIFRoZSBzZXJpZXMgY29udmVyZ2VzIGZhc3RlciB0aGUgY2xvc2VyIHRoZSBhcmd1bWVudCBpcyB0byAxLCBzbyB1c2luZ1xyXG4gICAgICAvLyBsbihhXmIpID0gYiAqIGxuKGEpLCAgIGxuKGEpID0gbG4oYV5iKSAvIGJcclxuICAgICAgLy8gbXVsdGlwbHkgdGhlIGFyZ3VtZW50IGJ5IGl0c2VsZiB1bnRpbCB0aGUgbGVhZGluZyBkaWdpdHMgb2YgdGhlIHNpZ25pZmljYW5kIGFyZSA3LCA4LCA5LFxyXG4gICAgICAvLyAxMCwgMTEsIDEyIG9yIDEzLCByZWNvcmRpbmcgdGhlIG51bWJlciBvZiBtdWx0aXBsaWNhdGlvbnMgc28gdGhlIHN1bSBvZiB0aGUgc2VyaWVzIGNhblxyXG4gICAgICAvLyBsYXRlciBiZSBkaXZpZGVkIGJ5IHRoaXMgbnVtYmVyLCB0aGVuIHNlcGFyYXRlIG91dCB0aGUgcG93ZXIgb2YgMTAgdXNpbmdcclxuICAgICAgLy8gbG4oYSoxMF5iKSA9IGxuKGEpICsgYipsbigxMCkuXHJcblxyXG4gICAgICAvLyBtYXggbiBpcyAyMSAoZ2l2ZXMgMC45LCAxLjAgb3IgMS4xKSAoOWUxNSAvIDIxID0gNC4yZTE0KS5cclxuICAgICAgLy93aGlsZSAoYzAgPCA5ICYmIGMwICE9IDEgfHwgYzAgPT0gMSAmJiBjLmNoYXJBdCgxKSA+IDEpIHtcclxuICAgICAgLy8gbWF4IG4gaXMgNiAoZ2l2ZXMgMC43IC0gMS4zKVxyXG4gICAgICB3aGlsZSAoYzAgPCA3ICYmIGMwICE9IDEgfHwgYzAgPT0gMSAmJiBjLmNoYXJBdCgxKSA+IDMpIHtcclxuICAgICAgICB4ID0geC50aW1lcyh5KTtcclxuICAgICAgICBjID0gZGlnaXRzVG9TdHJpbmcoeC5kKTtcclxuICAgICAgICBjMCA9IGMuY2hhckF0KDApO1xyXG4gICAgICAgIG4rKztcclxuICAgICAgfVxyXG5cclxuICAgICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpO1xyXG5cclxuICAgICAgaWYgKGMwID4gMSkge1xyXG4gICAgICAgIHggPSBuZXcgQ3RvcignMC4nICsgYyk7XHJcbiAgICAgICAgZSsrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHggPSBuZXcgQ3RvcihjMCArICcuJyArIGMuc2xpY2UoMSkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgLy8gVGhlIGFyZ3VtZW50IHJlZHVjdGlvbiBtZXRob2QgYWJvdmUgbWF5IHJlc3VsdCBpbiBvdmVyZmxvdyBpZiB0aGUgYXJndW1lbnQgeSBpcyBhIG1hc3NpdmVcclxuICAgICAgLy8gbnVtYmVyIHdpdGggZXhwb25lbnQgPj0gMTUwMDAwMDAwMDAwMDAwMCAoOWUxNSAvIDYgPSAxLjVlMTUpLCBzbyBpbnN0ZWFkIHJlY2FsbCB0aGlzXHJcbiAgICAgIC8vIGZ1bmN0aW9uIHVzaW5nIGxuKHgqMTBeZSkgPSBsbih4KSArIGUqbG4oMTApLlxyXG4gICAgICB0ID0gZ2V0TG4xMChDdG9yLCB3cHIgKyAyLCBwcikudGltZXMoZSArICcnKTtcclxuICAgICAgeCA9IGxuKG5ldyBDdG9yKGMwICsgJy4nICsgYy5zbGljZSgxKSksIHdwciAtIGd1YXJkKS5wbHVzKHQpO1xyXG5cclxuICAgICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgICAgcmV0dXJuIHNkID09IG51bGwgPyAoZXh0ZXJuYWwgPSB0cnVlLCByb3VuZCh4LCBwcikpIDogeDtcclxuICAgIH1cclxuXHJcbiAgICAvLyB4IGlzIHJlZHVjZWQgdG8gYSB2YWx1ZSBuZWFyIDEuXHJcblxyXG4gICAgLy8gVGF5bG9yIHNlcmllcy5cclxuICAgIC8vIGxuKHkpID0gbG4oKDEgKyB4KS8oMSAtIHgpKSA9IDIoeCArIHheMy8zICsgeF41LzUgKyB4XjcvNyArIC4uLilcclxuICAgIC8vIHdoZXJlIHggPSAoeSAtIDEpLyh5ICsgMSkgICAgKHx4fCA8IDEpXHJcbiAgICBzdW0gPSBudW1lcmF0b3IgPSB4ID0gZGl2aWRlKHgubWludXMoT05FKSwgeC5wbHVzKE9ORSksIHdwcik7XHJcbiAgICB4MiA9IHJvdW5kKHgudGltZXMoeCksIHdwcik7XHJcbiAgICBkZW5vbWluYXRvciA9IDM7XHJcblxyXG4gICAgZm9yICg7Oykge1xyXG4gICAgICBudW1lcmF0b3IgPSByb3VuZChudW1lcmF0b3IudGltZXMoeDIpLCB3cHIpO1xyXG4gICAgICB0ID0gc3VtLnBsdXMoZGl2aWRlKG51bWVyYXRvciwgbmV3IEN0b3IoZGVub21pbmF0b3IpLCB3cHIpKTtcclxuXHJcbiAgICAgIGlmIChkaWdpdHNUb1N0cmluZyh0LmQpLnNsaWNlKDAsIHdwcikgPT09IGRpZ2l0c1RvU3RyaW5nKHN1bS5kKS5zbGljZSgwLCB3cHIpKSB7XHJcbiAgICAgICAgc3VtID0gc3VtLnRpbWVzKDIpO1xyXG5cclxuICAgICAgICAvLyBSZXZlcnNlIHRoZSBhcmd1bWVudCByZWR1Y3Rpb24uXHJcbiAgICAgICAgaWYgKGUgIT09IDApIHN1bSA9IHN1bS5wbHVzKGdldExuMTAoQ3Rvciwgd3ByICsgMiwgcHIpLnRpbWVzKGUgKyAnJykpO1xyXG4gICAgICAgIHN1bSA9IGRpdmlkZShzdW0sIG5ldyBDdG9yKG4pLCB3cHIpO1xyXG5cclxuICAgICAgICBDdG9yLnByZWNpc2lvbiA9IHByO1xyXG4gICAgICAgIHJldHVybiBzZCA9PSBudWxsID8gKGV4dGVybmFsID0gdHJ1ZSwgcm91bmQoc3VtLCBwcikpIDogc3VtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdW0gPSB0O1xyXG4gICAgICBkZW5vbWluYXRvciArPSAyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUGFyc2UgdGhlIHZhbHVlIG9mIGEgbmV3IERlY2ltYWwgYHhgIGZyb20gc3RyaW5nIGBzdHJgLlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHBhcnNlRGVjaW1hbCh4LCBzdHIpIHtcclxuICAgIHZhciBlLCBpLCBsZW47XHJcblxyXG4gICAgLy8gRGVjaW1hbCBwb2ludD9cclxuICAgIGlmICgoZSA9IHN0ci5pbmRleE9mKCcuJykpID4gLTEpIHN0ciA9IHN0ci5yZXBsYWNlKCcuJywgJycpO1xyXG5cclxuICAgIC8vIEV4cG9uZW50aWFsIGZvcm0/XHJcbiAgICBpZiAoKGkgPSBzdHIuc2VhcmNoKC9lL2kpKSA+IDApIHtcclxuXHJcbiAgICAgIC8vIERldGVybWluZSBleHBvbmVudC5cclxuICAgICAgaWYgKGUgPCAwKSBlID0gaTtcclxuICAgICAgZSArPSArc3RyLnNsaWNlKGkgKyAxKTtcclxuICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBpKTtcclxuICAgIH0gZWxzZSBpZiAoZSA8IDApIHtcclxuXHJcbiAgICAgIC8vIEludGVnZXIuXHJcbiAgICAgIGUgPSBzdHIubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERldGVybWluZSBsZWFkaW5nIHplcm9zLlxyXG4gICAgZm9yIChpID0gMDsgc3RyLmNoYXJDb2RlQXQoaSkgPT09IDQ4OykgKytpO1xyXG5cclxuICAgIC8vIERldGVybWluZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIGZvciAobGVuID0gc3RyLmxlbmd0aDsgc3RyLmNoYXJDb2RlQXQobGVuIC0gMSkgPT09IDQ4OykgLS1sZW47XHJcbiAgICBzdHIgPSBzdHIuc2xpY2UoaSwgbGVuKTtcclxuXHJcbiAgICBpZiAoc3RyKSB7XHJcbiAgICAgIGxlbiAtPSBpO1xyXG4gICAgICBlID0gZSAtIGkgLSAxO1xyXG4gICAgICB4LmUgPSBtYXRoZmxvb3IoZSAvIExPR19CQVNFKTtcclxuICAgICAgeC5kID0gW107XHJcblxyXG4gICAgICAvLyBUcmFuc2Zvcm0gYmFzZVxyXG5cclxuICAgICAgLy8gZSBpcyB0aGUgYmFzZSAxMCBleHBvbmVudC5cclxuICAgICAgLy8gaSBpcyB3aGVyZSB0byBzbGljZSBzdHIgdG8gZ2V0IHRoZSBmaXJzdCB3b3JkIG9mIHRoZSBkaWdpdHMgYXJyYXkuXHJcbiAgICAgIGkgPSAoZSArIDEpICUgTE9HX0JBU0U7XHJcbiAgICAgIGlmIChlIDwgMCkgaSArPSBMT0dfQkFTRTtcclxuXHJcbiAgICAgIGlmIChpIDwgbGVuKSB7XHJcbiAgICAgICAgaWYgKGkpIHguZC5wdXNoKCtzdHIuc2xpY2UoMCwgaSkpO1xyXG4gICAgICAgIGZvciAobGVuIC09IExPR19CQVNFOyBpIDwgbGVuOykgeC5kLnB1c2goK3N0ci5zbGljZShpLCBpICs9IExPR19CQVNFKSk7XHJcbiAgICAgICAgc3RyID0gc3RyLnNsaWNlKGkpO1xyXG4gICAgICAgIGkgPSBMT0dfQkFTRSAtIHN0ci5sZW5ndGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaSAtPSBsZW47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAoOyBpLS07KSBzdHIgKz0gJzAnO1xyXG4gICAgICB4LmQucHVzaCgrc3RyKTtcclxuXHJcbiAgICAgIGlmIChleHRlcm5hbCAmJiAoeC5lID4gTUFYX0UgfHwgeC5lIDwgLU1BWF9FKSkgdGhyb3cgRXJyb3IoZXhwb25lbnRPdXRPZlJhbmdlICsgZSk7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgLy8gWmVyby5cclxuICAgICAgeC5zID0gMDtcclxuICAgICAgeC5lID0gMDtcclxuICAgICAgeC5kID0gWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUm91bmQgYHhgIHRvIGBzZGAgc2lnbmlmaWNhbnQgZGlnaXRzLCB1c2luZyByb3VuZGluZyBtb2RlIGBybWAgaWYgcHJlc2VudCAodHJ1bmNhdGUgb3RoZXJ3aXNlKS5cclxuICAgKi9cclxuICAgZnVuY3Rpb24gcm91bmQoeCwgc2QsIHJtKSB7XHJcbiAgICB2YXIgaSwgaiwgaywgbiwgcmQsIGRvUm91bmQsIHcsIHhkaSxcclxuICAgICAgeGQgPSB4LmQ7XHJcblxyXG4gICAgLy8gcmQ6IHRoZSByb3VuZGluZyBkaWdpdCwgaS5lLiB0aGUgZGlnaXQgYWZ0ZXIgdGhlIGRpZ2l0IHRoYXQgbWF5IGJlIHJvdW5kZWQgdXAuXHJcbiAgICAvLyB3OiB0aGUgd29yZCBvZiB4ZCB3aGljaCBjb250YWlucyB0aGUgcm91bmRpbmcgZGlnaXQsIGEgYmFzZSAxZTcgbnVtYmVyLlxyXG4gICAgLy8geGRpOiB0aGUgaW5kZXggb2YgdyB3aXRoaW4geGQuXHJcbiAgICAvLyBuOiB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiB3LlxyXG4gICAgLy8gaTogd2hhdCB3b3VsZCBiZSB0aGUgaW5kZXggb2YgcmQgd2l0aGluIHcgaWYgYWxsIHRoZSBudW1iZXJzIHdlcmUgNyBkaWdpdHMgbG9uZyAoaS5lLiBpZlxyXG4gICAgLy8gdGhleSBoYWQgbGVhZGluZyB6ZXJvcylcclxuICAgIC8vIGo6IGlmID4gMCwgdGhlIGFjdHVhbCBpbmRleCBvZiByZCB3aXRoaW4gdyAoaWYgPCAwLCByZCBpcyBhIGxlYWRpbmcgemVybykuXHJcblxyXG4gICAgLy8gR2V0IHRoZSBsZW5ndGggb2YgdGhlIGZpcnN0IHdvcmQgb2YgdGhlIGRpZ2l0cyBhcnJheSB4ZC5cclxuICAgIGZvciAobiA9IDEsIGsgPSB4ZFswXTsgayA+PSAxMDsgayAvPSAxMCkgbisrO1xyXG4gICAgaSA9IHNkIC0gbjtcclxuXHJcbiAgICAvLyBJcyB0aGUgcm91bmRpbmcgZGlnaXQgaW4gdGhlIGZpcnN0IHdvcmQgb2YgeGQ/XHJcbiAgICBpZiAoaSA8IDApIHtcclxuICAgICAgaSArPSBMT0dfQkFTRTtcclxuICAgICAgaiA9IHNkO1xyXG4gICAgICB3ID0geGRbeGRpID0gMF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB4ZGkgPSBNYXRoLmNlaWwoKGkgKyAxKSAvIExPR19CQVNFKTtcclxuICAgICAgayA9IHhkLmxlbmd0aDtcclxuICAgICAgaWYgKHhkaSA+PSBrKSByZXR1cm4geDtcclxuICAgICAgdyA9IGsgPSB4ZFt4ZGldO1xyXG5cclxuICAgICAgLy8gR2V0IHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIHcuXHJcbiAgICAgIGZvciAobiA9IDE7IGsgPj0gMTA7IGsgLz0gMTApIG4rKztcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgaW5kZXggb2YgcmQgd2l0aGluIHcuXHJcbiAgICAgIGkgJT0gTE9HX0JBU0U7XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiB3LCBhZGp1c3RlZCBmb3IgbGVhZGluZyB6ZXJvcy5cclxuICAgICAgLy8gVGhlIG51bWJlciBvZiBsZWFkaW5nIHplcm9zIG9mIHcgaXMgZ2l2ZW4gYnkgTE9HX0JBU0UgLSBuLlxyXG4gICAgICBqID0gaSAtIExPR19CQVNFICsgbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocm0gIT09IHZvaWQgMCkge1xyXG4gICAgICBrID0gbWF0aHBvdygxMCwgbiAtIGogLSAxKTtcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgcm91bmRpbmcgZGlnaXQgYXQgaW5kZXggaiBvZiB3LlxyXG4gICAgICByZCA9IHcgLyBrICUgMTAgfCAwO1xyXG5cclxuICAgICAgLy8gQXJlIHRoZXJlIGFueSBub24temVybyBkaWdpdHMgYWZ0ZXIgdGhlIHJvdW5kaW5nIGRpZ2l0P1xyXG4gICAgICBkb1JvdW5kID0gc2QgPCAwIHx8IHhkW3hkaSArIDFdICE9PSB2b2lkIDAgfHwgdyAlIGs7XHJcblxyXG4gICAgICAvLyBUaGUgZXhwcmVzc2lvbiBgdyAlIG1hdGhwb3coMTAsIG4gLSBqIC0gMSlgIHJldHVybnMgYWxsIHRoZSBkaWdpdHMgb2YgdyB0byB0aGUgcmlnaHQgb2YgdGhlXHJcbiAgICAgIC8vIGRpZ2l0IGF0IChsZWZ0LXRvLXJpZ2h0KSBpbmRleCBqLCBlLmcuIGlmIHcgaXMgOTA4NzE0IGFuZCBqIGlzIDIsIHRoZSBleHByZXNzaW9uIHdpbGwgZ2l2ZVxyXG4gICAgICAvLyA3MTQuXHJcblxyXG4gICAgICBkb1JvdW5kID0gcm0gPCA0XHJcbiAgICAgICAgPyAocmQgfHwgZG9Sb3VuZCkgJiYgKHJtID09IDAgfHwgcm0gPT0gKHgucyA8IDAgPyAzIDogMikpXHJcbiAgICAgICAgOiByZCA+IDUgfHwgcmQgPT0gNSAmJiAocm0gPT0gNCB8fCBkb1JvdW5kIHx8IHJtID09IDYgJiZcclxuXHJcbiAgICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBkaWdpdCB0byB0aGUgbGVmdCBvZiB0aGUgcm91bmRpbmcgZGlnaXQgaXMgb2RkLlxyXG4gICAgICAgICAgKChpID4gMCA/IGogPiAwID8gdyAvIG1hdGhwb3coMTAsIG4gLSBqKSA6IDAgOiB4ZFt4ZGkgLSAxXSkgJSAxMCkgJiAxIHx8XHJcbiAgICAgICAgICAgIHJtID09ICh4LnMgPCAwID8gOCA6IDcpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2QgPCAxIHx8ICF4ZFswXSkge1xyXG4gICAgICBpZiAoZG9Sb3VuZCkge1xyXG4gICAgICAgIGsgPSBnZXRCYXNlMTBFeHBvbmVudCh4KTtcclxuICAgICAgICB4ZC5sZW5ndGggPSAxO1xyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IHNkIHRvIGRlY2ltYWwgcGxhY2VzLlxyXG4gICAgICAgIHNkID0gc2QgLSBrIC0gMTtcclxuXHJcbiAgICAgICAgLy8gMSwgMC4xLCAwLjAxLCAwLjAwMSwgMC4wMDAxIGV0Yy5cclxuICAgICAgICB4ZFswXSA9IG1hdGhwb3coMTAsIChMT0dfQkFTRSAtIHNkICUgTE9HX0JBU0UpICUgTE9HX0JBU0UpO1xyXG4gICAgICAgIHguZSA9IG1hdGhmbG9vcigtc2QgLyBMT0dfQkFTRSkgfHwgMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB4ZC5sZW5ndGggPSAxO1xyXG5cclxuICAgICAgICAvLyBaZXJvLlxyXG4gICAgICAgIHhkWzBdID0geC5lID0geC5zID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIGV4Y2VzcyBkaWdpdHMuXHJcbiAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgIHhkLmxlbmd0aCA9IHhkaTtcclxuICAgICAgayA9IDE7XHJcbiAgICAgIHhkaS0tO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgeGQubGVuZ3RoID0geGRpICsgMTtcclxuICAgICAgayA9IG1hdGhwb3coMTAsIExPR19CQVNFIC0gaSk7XHJcblxyXG4gICAgICAvLyBFLmcuIDU2NzAwIGJlY29tZXMgNTYwMDAgaWYgNyBpcyB0aGUgcm91bmRpbmcgZGlnaXQuXHJcbiAgICAgIC8vIGogPiAwIG1lYW5zIGkgPiBudW1iZXIgb2YgbGVhZGluZyB6ZXJvcyBvZiB3LlxyXG4gICAgICB4ZFt4ZGldID0gaiA+IDAgPyAodyAvIG1hdGhwb3coMTAsIG4gLSBqKSAlIG1hdGhwb3coMTAsIGopIHwgMCkgKiBrIDogMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9Sb3VuZCkge1xyXG4gICAgICBmb3IgKDs7KSB7XHJcblxyXG4gICAgICAgIC8vIElzIHRoZSBkaWdpdCB0byBiZSByb3VuZGVkIHVwIGluIHRoZSBmaXJzdCB3b3JkIG9mIHhkP1xyXG4gICAgICAgIGlmICh4ZGkgPT0gMCkge1xyXG4gICAgICAgICAgaWYgKCh4ZFswXSArPSBrKSA9PSBCQVNFKSB7XHJcbiAgICAgICAgICAgIHhkWzBdID0gMTtcclxuICAgICAgICAgICAgKyt4LmU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHhkW3hkaV0gKz0gaztcclxuICAgICAgICAgIGlmICh4ZFt4ZGldICE9IEJBU0UpIGJyZWFrO1xyXG4gICAgICAgICAgeGRbeGRpLS1dID0gMDtcclxuICAgICAgICAgIGsgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIGZvciAoaSA9IHhkLmxlbmd0aDsgeGRbLS1pXSA9PT0gMDspIHhkLnBvcCgpO1xyXG5cclxuICAgIGlmIChleHRlcm5hbCAmJiAoeC5lID4gTUFYX0UgfHwgeC5lIDwgLU1BWF9FKSkge1xyXG4gICAgICB0aHJvdyBFcnJvcihleHBvbmVudE91dE9mUmFuZ2UgKyBnZXRCYXNlMTBFeHBvbmVudCh4KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHg7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gc3VidHJhY3QoeCwgeSkge1xyXG4gICAgdmFyIGQsIGUsIGksIGosIGssIGxlbiwgeGQsIHhlLCB4TFR5LCB5ZCxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcblxyXG4gICAgLy8gUmV0dXJuIHkgbmVnYXRlZCBpZiB4IGlzIHplcm8uXHJcbiAgICAvLyBSZXR1cm4geCBpZiB5IGlzIHplcm8gYW5kIHggaXMgbm9uLXplcm8uXHJcbiAgICBpZiAoIXgucyB8fCAheS5zKSB7XHJcbiAgICAgIGlmICh5LnMpIHkucyA9IC15LnM7XHJcbiAgICAgIGVsc2UgeSA9IG5ldyBDdG9yKHgpO1xyXG4gICAgICByZXR1cm4gZXh0ZXJuYWwgPyByb3VuZCh5LCBwcikgOiB5O1xyXG4gICAgfVxyXG5cclxuICAgIHhkID0geC5kO1xyXG4gICAgeWQgPSB5LmQ7XHJcblxyXG4gICAgLy8geCBhbmQgeSBhcmUgbm9uLXplcm8gbnVtYmVycyB3aXRoIHRoZSBzYW1lIHNpZ24uXHJcblxyXG4gICAgZSA9IHkuZTtcclxuICAgIHhlID0geC5lO1xyXG4gICAgeGQgPSB4ZC5zbGljZSgpO1xyXG4gICAgayA9IHhlIC0gZTtcclxuXHJcbiAgICAvLyBJZiBleHBvbmVudHMgZGlmZmVyLi4uXHJcbiAgICBpZiAoaykge1xyXG4gICAgICB4TFR5ID0gayA8IDA7XHJcblxyXG4gICAgICBpZiAoeExUeSkge1xyXG4gICAgICAgIGQgPSB4ZDtcclxuICAgICAgICBrID0gLWs7XHJcbiAgICAgICAgbGVuID0geWQubGVuZ3RoO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGQgPSB5ZDtcclxuICAgICAgICBlID0geGU7XHJcbiAgICAgICAgbGVuID0geGQubGVuZ3RoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBOdW1iZXJzIHdpdGggbWFzc2l2ZWx5IGRpZmZlcmVudCBleHBvbmVudHMgd291bGQgcmVzdWx0IGluIGEgdmVyeSBoaWdoIG51bWJlciBvZiB6ZXJvc1xyXG4gICAgICAvLyBuZWVkaW5nIHRvIGJlIHByZXBlbmRlZCwgYnV0IHRoaXMgY2FuIGJlIGF2b2lkZWQgd2hpbGUgc3RpbGwgZW5zdXJpbmcgY29ycmVjdCByb3VuZGluZyBieVxyXG4gICAgICAvLyBsaW1pdGluZyB0aGUgbnVtYmVyIG9mIHplcm9zIHRvIGBNYXRoLmNlaWwocHIgLyBMT0dfQkFTRSkgKyAyYC5cclxuICAgICAgaSA9IE1hdGgubWF4KE1hdGguY2VpbChwciAvIExPR19CQVNFKSwgbGVuKSArIDI7XHJcblxyXG4gICAgICBpZiAoayA+IGkpIHtcclxuICAgICAgICBrID0gaTtcclxuICAgICAgICBkLmxlbmd0aCA9IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFByZXBlbmQgemVyb3MgdG8gZXF1YWxpc2UgZXhwb25lbnRzLlxyXG4gICAgICBkLnJldmVyc2UoKTtcclxuICAgICAgZm9yIChpID0gazsgaS0tOykgZC5wdXNoKDApO1xyXG4gICAgICBkLnJldmVyc2UoKTtcclxuXHJcbiAgICAvLyBCYXNlIDFlNyBleHBvbmVudHMgZXF1YWwuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgLy8gQ2hlY2sgZGlnaXRzIHRvIGRldGVybWluZSB3aGljaCBpcyB0aGUgYmlnZ2VyIG51bWJlci5cclxuXHJcbiAgICAgIGkgPSB4ZC5sZW5ndGg7XHJcbiAgICAgIGxlbiA9IHlkLmxlbmd0aDtcclxuICAgICAgeExUeSA9IGkgPCBsZW47XHJcbiAgICAgIGlmICh4TFR5KSBsZW4gPSBpO1xyXG5cclxuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHhkW2ldICE9IHlkW2ldKSB7XHJcbiAgICAgICAgICB4TFR5ID0geGRbaV0gPCB5ZFtpXTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgayA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHhMVHkpIHtcclxuICAgICAgZCA9IHhkO1xyXG4gICAgICB4ZCA9IHlkO1xyXG4gICAgICB5ZCA9IGQ7XHJcbiAgICAgIHkucyA9IC15LnM7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuID0geGQubGVuZ3RoO1xyXG5cclxuICAgIC8vIEFwcGVuZCB6ZXJvcyB0byB4ZCBpZiBzaG9ydGVyLlxyXG4gICAgLy8gRG9uJ3QgYWRkIHplcm9zIHRvIHlkIGlmIHNob3J0ZXIgYXMgc3VidHJhY3Rpb24gb25seSBuZWVkcyB0byBzdGFydCBhdCB5ZCBsZW5ndGguXHJcbiAgICBmb3IgKGkgPSB5ZC5sZW5ndGggLSBsZW47IGkgPiAwOyAtLWkpIHhkW2xlbisrXSA9IDA7XHJcblxyXG4gICAgLy8gU3VidHJhY3QgeWQgZnJvbSB4ZC5cclxuICAgIGZvciAoaSA9IHlkLmxlbmd0aDsgaSA+IGs7KSB7XHJcbiAgICAgIGlmICh4ZFstLWldIDwgeWRbaV0pIHtcclxuICAgICAgICBmb3IgKGogPSBpOyBqICYmIHhkWy0tal0gPT09IDA7KSB4ZFtqXSA9IEJBU0UgLSAxO1xyXG4gICAgICAgIC0teGRbal07XHJcbiAgICAgICAgeGRbaV0gKz0gQkFTRTtcclxuICAgICAgfVxyXG5cclxuICAgICAgeGRbaV0gLT0geWRbaV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgZm9yICg7IHhkWy0tbGVuXSA9PT0gMDspIHhkLnBvcCgpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBsZWFkaW5nIHplcm9zIGFuZCBhZGp1c3QgZXhwb25lbnQgYWNjb3JkaW5nbHkuXHJcbiAgICBmb3IgKDsgeGRbMF0gPT09IDA7IHhkLnNoaWZ0KCkpIC0tZTtcclxuXHJcbiAgICAvLyBaZXJvP1xyXG4gICAgaWYgKCF4ZFswXSkgcmV0dXJuIG5ldyBDdG9yKDApO1xyXG5cclxuICAgIHkuZCA9IHhkO1xyXG4gICAgeS5lID0gZTtcclxuXHJcbiAgICAvL3JldHVybiBleHRlcm5hbCAmJiB4ZC5sZW5ndGggPj0gcHIgLyBMT0dfQkFTRSA/IHJvdW5kKHksIHByKSA6IHk7XHJcbiAgICByZXR1cm4gZXh0ZXJuYWwgPyByb3VuZCh5LCBwcikgOiB5O1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHRvU3RyaW5nKHgsIGlzRXhwLCBzZCkge1xyXG4gICAgdmFyIGssXHJcbiAgICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KSxcclxuICAgICAgc3RyID0gZGlnaXRzVG9TdHJpbmcoeC5kKSxcclxuICAgICAgbGVuID0gc3RyLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoaXNFeHApIHtcclxuICAgICAgaWYgKHNkICYmIChrID0gc2QgLSBsZW4pID4gMCkge1xyXG4gICAgICAgIHN0ciA9IHN0ci5jaGFyQXQoMCkgKyAnLicgKyBzdHIuc2xpY2UoMSkgKyBnZXRaZXJvU3RyaW5nKGspO1xyXG4gICAgICB9IGVsc2UgaWYgKGxlbiA+IDEpIHtcclxuICAgICAgICBzdHIgPSBzdHIuY2hhckF0KDApICsgJy4nICsgc3RyLnNsaWNlKDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdHIgPSBzdHIgKyAoZSA8IDAgPyAnZScgOiAnZSsnKSArIGU7XHJcbiAgICB9IGVsc2UgaWYgKGUgPCAwKSB7XHJcbiAgICAgIHN0ciA9ICcwLicgKyBnZXRaZXJvU3RyaW5nKC1lIC0gMSkgKyBzdHI7XHJcbiAgICAgIGlmIChzZCAmJiAoayA9IHNkIC0gbGVuKSA+IDApIHN0ciArPSBnZXRaZXJvU3RyaW5nKGspO1xyXG4gICAgfSBlbHNlIGlmIChlID49IGxlbikge1xyXG4gICAgICBzdHIgKz0gZ2V0WmVyb1N0cmluZyhlICsgMSAtIGxlbik7XHJcbiAgICAgIGlmIChzZCAmJiAoayA9IHNkIC0gZSAtIDEpID4gMCkgc3RyID0gc3RyICsgJy4nICsgZ2V0WmVyb1N0cmluZyhrKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICgoayA9IGUgKyAxKSA8IGxlbikgc3RyID0gc3RyLnNsaWNlKDAsIGspICsgJy4nICsgc3RyLnNsaWNlKGspO1xyXG4gICAgICBpZiAoc2QgJiYgKGsgPSBzZCAtIGxlbikgPiAwKSB7XHJcbiAgICAgICAgaWYgKGUgKyAxID09PSBsZW4pIHN0ciArPSAnLic7XHJcbiAgICAgICAgc3RyICs9IGdldFplcm9TdHJpbmcoayk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geC5zIDwgMCA/ICctJyArIHN0ciA6IHN0cjtcclxuICB9XHJcblxyXG5cclxuICAvLyBEb2VzIG5vdCBzdHJpcCB0cmFpbGluZyB6ZXJvcy5cclxuICBmdW5jdGlvbiB0cnVuY2F0ZShhcnIsIGxlbikge1xyXG4gICAgaWYgKGFyci5sZW5ndGggPiBsZW4pIHtcclxuICAgICAgYXJyLmxlbmd0aCA9IGxlbjtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gRGVjaW1hbCBtZXRob2RzXHJcblxyXG5cclxuICAvKlxyXG4gICAqICBjbG9uZVxyXG4gICAqICBjb25maWcvc2V0XHJcbiAgICovXHJcblxyXG5cclxuICAvKlxyXG4gICAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgRGVjaW1hbCBjb25zdHJ1Y3RvciB3aXRoIHRoZSBzYW1lIGNvbmZpZ3VyYXRpb24gcHJvcGVydGllcyBhcyB0aGlzIERlY2ltYWxcclxuICAgKiBjb25zdHJ1Y3Rvci5cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGNsb25lKG9iaikge1xyXG4gICAgdmFyIGksIHAsIHBzO1xyXG5cclxuICAgIC8qXHJcbiAgICAgKiBUaGUgRGVjaW1hbCBjb25zdHJ1Y3RvciBhbmQgZXhwb3J0ZWQgZnVuY3Rpb24uXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiB2YWx1ZSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBBIG51bWVyaWMgdmFsdWUuXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBEZWNpbWFsKHZhbHVlKSB7XHJcbiAgICAgIHZhciB4ID0gdGhpcztcclxuXHJcbiAgICAgIC8vIERlY2ltYWwgY2FsbGVkIHdpdGhvdXQgbmV3LlxyXG4gICAgICBpZiAoISh4IGluc3RhbmNlb2YgRGVjaW1hbCkpIHJldHVybiBuZXcgRGVjaW1hbCh2YWx1ZSk7XHJcblxyXG4gICAgICAvLyBSZXRhaW4gYSByZWZlcmVuY2UgdG8gdGhpcyBEZWNpbWFsIGNvbnN0cnVjdG9yLCBhbmQgc2hhZG93IERlY2ltYWwucHJvdG90eXBlLmNvbnN0cnVjdG9yXHJcbiAgICAgIC8vIHdoaWNoIHBvaW50cyB0byBPYmplY3QuXHJcbiAgICAgIHguY29uc3RydWN0b3IgPSBEZWNpbWFsO1xyXG5cclxuICAgICAgLy8gRHVwbGljYXRlLlxyXG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEZWNpbWFsKSB7XHJcbiAgICAgICAgeC5zID0gdmFsdWUucztcclxuICAgICAgICB4LmUgPSB2YWx1ZS5lO1xyXG4gICAgICAgIHguZCA9ICh2YWx1ZSA9IHZhbHVlLmQpID8gdmFsdWUuc2xpY2UoKSA6IHZhbHVlO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuXHJcbiAgICAgICAgLy8gUmVqZWN0IEluZmluaXR5L05hTi5cclxuICAgICAgICBpZiAodmFsdWUgKiAwICE9PSAwKSB7XHJcbiAgICAgICAgICB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICB4LnMgPSAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPCAwKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IC12YWx1ZTtcclxuICAgICAgICAgIHgucyA9IC0xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB4LnMgPSAwO1xyXG4gICAgICAgICAgeC5lID0gMDtcclxuICAgICAgICAgIHguZCA9IFswXTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZhc3QgcGF0aCBmb3Igc21hbGwgaW50ZWdlcnMuXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB+fnZhbHVlICYmIHZhbHVlIDwgMWU3KSB7XHJcbiAgICAgICAgICB4LmUgPSAwO1xyXG4gICAgICAgICAgeC5kID0gW3ZhbHVlXTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYXJzZURlY2ltYWwoeCwgdmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIHZhbHVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTWludXMgc2lnbj9cclxuICAgICAgaWYgKHZhbHVlLmNoYXJDb2RlQXQoMCkgPT09IDQ1KSB7XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxKTtcclxuICAgICAgICB4LnMgPSAtMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB4LnMgPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNEZWNpbWFsLnRlc3QodmFsdWUpKSBwYXJzZURlY2ltYWwoeCwgdmFsdWUpO1xyXG4gICAgICBlbHNlIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBEZWNpbWFsLnByb3RvdHlwZSA9IFA7XHJcblxyXG4gICAgRGVjaW1hbC5ST1VORF9VUCA9IDA7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0RPV04gPSAxO1xyXG4gICAgRGVjaW1hbC5ST1VORF9DRUlMID0gMjtcclxuICAgIERlY2ltYWwuUk9VTkRfRkxPT1IgPSAzO1xyXG4gICAgRGVjaW1hbC5ST1VORF9IQUxGX1VQID0gNDtcclxuICAgIERlY2ltYWwuUk9VTkRfSEFMRl9ET1dOID0gNTtcclxuICAgIERlY2ltYWwuUk9VTkRfSEFMRl9FVkVOID0gNjtcclxuICAgIERlY2ltYWwuUk9VTkRfSEFMRl9DRUlMID0gNztcclxuICAgIERlY2ltYWwuUk9VTkRfSEFMRl9GTE9PUiA9IDg7XHJcblxyXG4gICAgRGVjaW1hbC5jbG9uZSA9IGNsb25lO1xyXG4gICAgRGVjaW1hbC5jb25maWcgPSBEZWNpbWFsLnNldCA9IGNvbmZpZztcclxuXHJcbiAgICBpZiAob2JqID09PSB2b2lkIDApIG9iaiA9IHt9O1xyXG4gICAgaWYgKG9iaikge1xyXG4gICAgICBwcyA9IFsncHJlY2lzaW9uJywgJ3JvdW5kaW5nJywgJ3RvRXhwTmVnJywgJ3RvRXhwUG9zJywgJ0xOMTAnXTtcclxuICAgICAgZm9yIChpID0gMDsgaSA8IHBzLmxlbmd0aDspIGlmICghb2JqLmhhc093blByb3BlcnR5KHAgPSBwc1tpKytdKSkgb2JqW3BdID0gdGhpc1twXTtcclxuICAgIH1cclxuXHJcbiAgICBEZWNpbWFsLmNvbmZpZyhvYmopO1xyXG5cclxuICAgIHJldHVybiBEZWNpbWFsO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogQ29uZmlndXJlIGdsb2JhbCBzZXR0aW5ncyBmb3IgYSBEZWNpbWFsIGNvbnN0cnVjdG9yLlxyXG4gICAqXHJcbiAgICogYG9iamAgaXMgYW4gb2JqZWN0IHdpdGggb25lIG9yIG1vcmUgb2YgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzLFxyXG4gICAqXHJcbiAgICogICBwcmVjaXNpb24gIHtudW1iZXJ9XHJcbiAgICogICByb3VuZGluZyAgIHtudW1iZXJ9XHJcbiAgICogICB0b0V4cE5lZyAgIHtudW1iZXJ9XHJcbiAgICogICB0b0V4cFBvcyAgIHtudW1iZXJ9XHJcbiAgICpcclxuICAgKiBFLmcuIERlY2ltYWwuY29uZmlnKHsgcHJlY2lzaW9uOiAyMCwgcm91bmRpbmc6IDQgfSlcclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGNvbmZpZyhvYmopIHtcclxuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdPYmplY3QgZXhwZWN0ZWQnKTtcclxuICAgIH1cclxuICAgIHZhciBpLCBwLCB2LFxyXG4gICAgICBwcyA9IFtcclxuICAgICAgICAncHJlY2lzaW9uJywgMSwgTUFYX0RJR0lUUyxcclxuICAgICAgICAncm91bmRpbmcnLCAwLCA4LFxyXG4gICAgICAgICd0b0V4cE5lZycsIC0xIC8gMCwgMCxcclxuICAgICAgICAndG9FeHBQb3MnLCAwLCAxIC8gMFxyXG4gICAgICBdO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBwcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICBpZiAoKHYgPSBvYmpbcCA9IHBzW2ldXSkgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmIChtYXRoZmxvb3IodikgPT09IHYgJiYgdiA+PSBwc1tpICsgMV0gJiYgdiA8PSBwc1tpICsgMl0pIHRoaXNbcF0gPSB2O1xyXG4gICAgICAgIGVsc2UgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgcCArICc6ICcgKyB2KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICgodiA9IG9ialtwID0gJ0xOMTAnXSkgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh2ID09IE1hdGguTE4xMCkgdGhpc1twXSA9IG5ldyB0aGlzKHYpO1xyXG4gICAgICAgIGVsc2UgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgcCArICc6ICcgKyB2KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG5cclxuICAvLyBDcmVhdGUgYW5kIGNvbmZpZ3VyZSBpbml0aWFsIERlY2ltYWwgY29uc3RydWN0b3IuXHJcbiAgRGVjaW1hbCA9IGNsb25lKERlY2ltYWwpO1xyXG5cclxuICBEZWNpbWFsWydkZWZhdWx0J10gPSBEZWNpbWFsLkRlY2ltYWwgPSBEZWNpbWFsO1xyXG5cclxuICAvLyBJbnRlcm5hbCBjb25zdGFudC5cclxuICBPTkUgPSBuZXcgRGVjaW1hbCgxKTtcclxuXHJcblxyXG4gIC8vIEV4cG9ydC5cclxuXHJcblxyXG4gIC8vIEFNRC5cclxuICBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBEZWNpbWFsO1xyXG4gICAgfSk7XHJcblxyXG4gIC8vIE5vZGUgYW5kIG90aGVyIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMuXHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IERlY2ltYWw7XHJcblxyXG4gICAgLy8gQnJvd3Nlci5cclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKCFnbG9iYWxTY29wZSkge1xyXG4gICAgICBnbG9iYWxTY29wZSA9IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYgJiYgc2VsZi5zZWxmID09IHNlbGZcclxuICAgICAgICA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdsb2JhbFNjb3BlLkRlY2ltYWwgPSBEZWNpbWFsO1xyXG4gIH1cclxufSkodGhpcyk7XHJcbiIsIi8qISBNb21lbnQgRHVyYXRpb24gRm9ybWF0IHYyLjIuMlxuICogIGh0dHBzOi8vZ2l0aHViLmNvbS9qc21yZWVzZS9tb21lbnQtZHVyYXRpb24tZm9ybWF0XG4gKiAgRGF0ZTogMjAxOC0wMi0xNlxuICpcbiAqICBEdXJhdGlvbiBmb3JtYXQgcGx1Z2luIGZ1bmN0aW9uIGZvciB0aGUgTW9tZW50LmpzIGxpYnJhcnlcbiAqICBodHRwOi8vbW9tZW50anMuY29tL1xuICpcbiAqICBDb3B5cmlnaHQgMjAxOCBKb2huIE1hZGhhdmFuLVJlZXNlXG4gKiAgUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cblxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbJ21vbWVudCddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXQgb25seSBDb21tb25KUy1saWtlXG4gICAgICAgIC8vIGVudmlyb21lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cywgbGlrZSBOb2RlLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ21vbWVudCcpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gSWYgbW9tZW50IGlzIG5vdCBhdmFpbGFibGUsIGxlYXZlIHRoZSBzZXR1cCB1cCB0byB0aGUgdXNlci5cbiAgICAgICAgICAgIC8vIExpa2Ugd2hlbiB1c2luZyBtb21lbnQtdGltZXpvbmUgb3Igc2ltaWxhciBtb21lbnQtYmFzZWQgcGFja2FnZS5cbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyb290KSB7XG4gICAgICAgIC8vIEdsb2JhbHMuXG4gICAgICAgIHJvb3QubW9tZW50RHVyYXRpb25Gb3JtYXRTZXR1cCA9IHJvb3QubW9tZW50ID8gZmFjdG9yeShyb290Lm1vbWVudCkgOiBmYWN0b3J5O1xuICAgIH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChtb21lbnQpIHtcbiAgICAvLyBgTnVtYmVyI3RvbG9jYWxlU3RyaW5nYCBpcyB0ZXN0ZWQgb24gcGx1Z2luIGluaXRpYWxpemF0aW9uLlxuICAgIC8vIElmIHRoZSBmZWF0dXJlIHRlc3QgcGFzc2VzLCBgdG9Mb2NhbGVTdHJpbmdXb3Jrc2Agd2lsbCBiZSBzZXQgdG8gYHRydWVgIGFuZCB0aGVcbiAgICAvLyBuYXRpdmUgZnVuY3Rpb24gd2lsbCBiZSB1c2VkIHRvIGdlbmVyYXRlIGZvcm1hdHRlZCBvdXRwdXQuIElmIHRoZSBmZWF0dXJlXG4gICAgLy8gdGVzdCBmYWlscywgdGhlIGZhbGxiYWNrIGZvcm1hdCBmdW5jdGlvbiBpbnRlcm5hbCB0byB0aGlzIHBsdWdpbiB3aWxsIGJlXG4gICAgLy8gdXNlZC5cbiAgICB2YXIgdG9Mb2NhbGVTdHJpbmdXb3JrcyA9IGZhbHNlO1xuXG4gICAgLy8gYE51bWJlciN0b0xvY2FsZVN0cmluZ2Agcm91bmRzIGluY29ycmVjdGx5IGZvciBzZWxlY3QgbnVtYmVycyBpbiBNaWNyb3NvZnRcbiAgICAvLyBlbnZpcm9ubWVudHMgKEVkZ2UsIElFMTEsIFdpbmRvd3MgUGhvbmUpIGFuZCBwb3NzaWJseSBvdGhlciBlbnZpcm9ubWVudHMuXG4gICAgLy8gSWYgdGhlIHJvdW5kaW5nIHRlc3QgZmFpbHMgYW5kIGB0b0xvY2FsZVN0cmluZ2Agd2lsbCBiZSB1c2VkIGZvciBmb3JtYXR0aW5nLFxuICAgIC8vIHRoZSBwbHVnaW4gd2lsbCBcInByZS1yb3VuZFwiIG51bWJlciB2YWx1ZXMgdXNpbmcgdGhlIGZhbGxiYWNrIG51bWJlciBmb3JtYXRcbiAgICAvLyBmdW5jdGlvbiBiZWZvcmUgcGFzc2luZyB0aGVtIHRvIGB0b0xvY2FsZVN0cmluZ2AgZm9yIGZpbmFsIGZvcm1hdHRpbmcuXG4gICAgdmFyIHRvTG9jYWxlU3RyaW5nUm91bmRpbmdXb3JrcyA9IGZhbHNlO1xuXG4gICAgLy8gVG9rZW4gdHlwZSBuYW1lcyBpbiBvcmRlciBvZiBkZXNjZW5kaW5nIG1hZ25pdHVkZS5cbiAgICB2YXIgdHlwZXMgPSBcImVzY2FwZSB5ZWFycyBtb250aHMgd2Vla3MgZGF5cyBob3VycyBtaW51dGVzIHNlY29uZHMgbWlsbGlzZWNvbmRzIGdlbmVyYWxcIi5zcGxpdChcIiBcIik7XG5cbiAgICB2YXIgYnViYmxlcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJzZWNvbmRzXCIsXG4gICAgICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIm1pbnV0ZXNcIiwgdmFsdWU6IDYwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcImhvdXJzXCIsIHZhbHVlOiAzNjAwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcImRheXNcIiwgdmFsdWU6IDg2NDAwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIndlZWtzXCIsIHZhbHVlOiA2MDQ4MDAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwibW9udGhzXCIsIHZhbHVlOiAyNjc4NDAwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInllYXJzXCIsIHZhbHVlOiAzMTUzNjAwMCB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwibWludXRlc1wiLFxuICAgICAgICAgICAgdGFyZ2V0czogW1xuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJob3Vyc1wiLCB2YWx1ZTogNjAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwiZGF5c1wiLCB2YWx1ZTogMTQ0MCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ3ZWVrc1wiLCB2YWx1ZTogMTAwODAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwibW9udGhzXCIsIHZhbHVlOiA0NDY0MCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ5ZWFyc1wiLCB2YWx1ZTogNTI1NjAwIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJob3Vyc1wiLFxuICAgICAgICAgICAgdGFyZ2V0czogW1xuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJkYXlzXCIsIHZhbHVlOiAyNCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ3ZWVrc1wiLCB2YWx1ZTogMTY4IH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIm1vbnRoc1wiLCB2YWx1ZTogNzQ0IH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInllYXJzXCIsIHZhbHVlOiA4NzYwIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJkYXlzXCIsXG4gICAgICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIndlZWtzXCIsIHZhbHVlOiA3IH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIm1vbnRoc1wiLCB2YWx1ZTogMzEgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwieWVhcnNcIiwgdmFsdWU6IDM2NSB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwibW9udGhzXCIsXG4gICAgICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInllYXJzXCIsIHZhbHVlOiAxMiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgLy8gc3RyaW5nSW5jbHVkZXNcbiAgICBmdW5jdGlvbiBzdHJpbmdJbmNsdWRlcyhzdHIsIHNlYXJjaCkge1xuICAgICAgICBpZiAoc2VhcmNoLmxlbmd0aCA+IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RyLmluZGV4T2Yoc2VhcmNoKSAhPT0gLTE7XG4gICAgfVxuXG4gICAgLy8gcmVwZWF0WmVybyhxdHkpXG4gICAgLy8gUmV0dXJucyBcIjBcIiByZXBlYXRlZCBgcXR5YCB0aW1lcy5cbiAgICAvLyBgcXR5YCBtdXN0IGJlIGEgaW50ZWdlciA+PSAwLlxuICAgIGZ1bmN0aW9uIHJlcGVhdFplcm8ocXR5KSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBcIlwiO1xuXG4gICAgICAgIHdoaWxlIChxdHkpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBcIjBcIjtcbiAgICAgICAgICAgIHF0eSAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHJpbmdSb3VuZChkaWdpdHMpIHtcbiAgICAgICAgdmFyIGRpZ2l0c0FycmF5ID0gZGlnaXRzLnNwbGl0KFwiXCIpLnJldmVyc2UoKTtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgY2FycnkgPSB0cnVlO1xuXG4gICAgICAgIHdoaWxlIChjYXJyeSAmJiBpIDwgZGlnaXRzQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaSkge1xuICAgICAgICAgICAgICAgIGlmIChkaWdpdHNBcnJheVtpXSA9PT0gXCI5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlnaXRzQXJyYXlbaV0gPSBcIjBcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkaWdpdHNBcnJheVtpXSA9IChwYXJzZUludChkaWdpdHNBcnJheVtpXSwgMTApICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgY2FycnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChkaWdpdHNBcnJheVtpXSwgMTApIDwgNSkge1xuICAgICAgICAgICAgICAgICAgICBjYXJyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRpZ2l0c0FycmF5W2ldID0gXCIwXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYXJyeSkge1xuICAgICAgICAgICAgZGlnaXRzQXJyYXkucHVzaChcIjFcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGlnaXRzQXJyYXkucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgfVxuXG4gICAgLy8gZm9ybWF0TnVtYmVyXG4gICAgLy8gRm9ybWF0cyBhbnkgbnVtYmVyIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB6ZXJvIHVzaW5nIHRoZXNlIG9wdGlvbnM6XG4gICAgLy8gLSB1c2VyTG9jYWxlXG4gICAgLy8gLSB1c2VUb0xvY2FsZVN0cmluZ1xuICAgIC8vIC0gdXNlR3JvdXBpbmdcbiAgICAvLyAtIGdyb3VwaW5nXG4gICAgLy8gLSBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHNcbiAgICAvLyAtIG1pbmltdW1JbnRlZ2VyRGlnaXRzXG4gICAgLy8gLSBmcmFjdGlvbkRpZ2l0c1xuICAgIC8vIC0gZ3JvdXBpbmdTZXBhcmF0b3JcbiAgICAvLyAtIGRlY2ltYWxTZXBhcmF0b3JcbiAgICAvL1xuICAgIC8vIGB1c2VUb0xvY2FsZVN0cmluZ2Agd2lsbCB1c2UgYHRvTG9jYWxlU3RyaW5nYCBmb3IgZm9ybWF0dGluZy5cbiAgICAvLyBgdXNlckxvY2FsZWAgb3B0aW9uIGlzIHBhc3NlZCB0aHJvdWdoIHRvIGB0b0xvY2FsZVN0cmluZ2AuXG4gICAgLy8gYGZyYWN0aW9uRGlnaXRzYCBpcyBwYXNzZWQgdGhyb3VnaCB0byBgbWF4aW11bUZyYWN0aW9uRGlnaXRzYCBhbmQgYG1pbmltdW1GcmFjdGlvbkRpZ2l0c2BcbiAgICAvLyBVc2luZyBgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzYCB3aWxsIG92ZXJyaWRlIGBtaW5pbXVtSW50ZWdlckRpZ2l0c2AgYW5kIGBmcmFjdGlvbkRpZ2l0c2AuXG4gICAgZnVuY3Rpb24gZm9ybWF0TnVtYmVyKG51bWJlciwgb3B0aW9ucywgdXNlckxvY2FsZSkge1xuICAgICAgICB2YXIgdXNlVG9Mb2NhbGVTdHJpbmcgPSBvcHRpb25zLnVzZVRvTG9jYWxlU3RyaW5nO1xuICAgICAgICB2YXIgdXNlR3JvdXBpbmcgPSBvcHRpb25zLnVzZUdyb3VwaW5nO1xuICAgICAgICB2YXIgZ3JvdXBpbmcgPSB1c2VHcm91cGluZyAmJiBvcHRpb25zLmdyb3VwaW5nLnNsaWNlKCk7XG4gICAgICAgIHZhciBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgPSBvcHRpb25zLm1heGltdW1TaWduaWZpY2FudERpZ2l0cztcbiAgICAgICAgdmFyIG1pbmltdW1JbnRlZ2VyRGlnaXRzID0gb3B0aW9ucy5taW5pbXVtSW50ZWdlckRpZ2l0cyB8fCAxO1xuICAgICAgICB2YXIgZnJhY3Rpb25EaWdpdHMgPSBvcHRpb25zLmZyYWN0aW9uRGlnaXRzIHx8IDA7XG4gICAgICAgIHZhciBncm91cGluZ1NlcGFyYXRvciA9IG9wdGlvbnMuZ3JvdXBpbmdTZXBhcmF0b3I7XG4gICAgICAgIHZhciBkZWNpbWFsU2VwYXJhdG9yID0gb3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yO1xuXG4gICAgICAgIGlmICh1c2VUb0xvY2FsZVN0cmluZyAmJiB1c2VyTG9jYWxlKSB7XG4gICAgICAgICAgICB2YXIgbG9jYWxlU3RyaW5nT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogbWluaW11bUludGVnZXJEaWdpdHMsXG4gICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHVzZUdyb3VwaW5nXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoZnJhY3Rpb25EaWdpdHMpIHtcbiAgICAgICAgICAgICAgICBsb2NhbGVTdHJpbmdPcHRpb25zLm1heGltdW1GcmFjdGlvbkRpZ2l0cyA9IGZyYWN0aW9uRGlnaXRzO1xuICAgICAgICAgICAgICAgIGxvY2FsZVN0cmluZ09wdGlvbnMubWluaW11bUZyYWN0aW9uRGlnaXRzID0gZnJhY3Rpb25EaWdpdHM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHRvTG9jYWxlU3RyaW5nIG91dHB1dCBpcyBcIjAuMFwiIGluc3RlYWQgb2YgXCIwXCIgZm9yIEhUQyBicm93c2Vyc1xuICAgICAgICAgICAgLy8gd2hlbiBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgaXMgc2V0LiBTZWUgIzk2LlxuICAgICAgICAgICAgaWYgKG1heGltdW1TaWduaWZpY2FudERpZ2l0cyAmJiBudW1iZXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlU3RyaW5nT3B0aW9ucy5tYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgPSBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdG9Mb2NhbGVTdHJpbmdSb3VuZGluZ1dvcmtzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvdW5kaW5nT3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgcm91bmRpbmdPcHRpb25zLnVzZUdyb3VwaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcm91bmRpbmdPcHRpb25zLmRlY2ltYWxTZXBhcmF0b3IgPSBcIi5cIjtcbiAgICAgICAgICAgICAgICBudW1iZXIgPSBwYXJzZUZsb2F0KGZvcm1hdE51bWJlcihudW1iZXIsIHJvdW5kaW5nT3B0aW9ucyksIDEwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bWJlci50b0xvY2FsZVN0cmluZyh1c2VyTG9jYWxlLCBsb2NhbGVTdHJpbmdPcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBudW1iZXJTdHJpbmc7XG5cbiAgICAgICAgLy8gQWRkIDEgdG8gZGlnaXQgb3V0cHV0IGxlbmd0aCBmb3IgZmxvYXRpbmcgcG9pbnQgZXJyb3JzIHdvcmthcm91bmQuIFNlZSBiZWxvdy5cbiAgICAgICAgaWYgKG1heGltdW1TaWduaWZpY2FudERpZ2l0cykge1xuICAgICAgICAgICAgbnVtYmVyU3RyaW5nID0gbnVtYmVyLnRvUHJlY2lzaW9uKG1heGltdW1TaWduaWZpY2FudERpZ2l0cyArIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtYmVyU3RyaW5nID0gbnVtYmVyLnRvRml4ZWQoZnJhY3Rpb25EaWdpdHMgKyAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbnRlZ2VyU3RyaW5nO1xuICAgICAgICB2YXIgZnJhY3Rpb25TdHJpbmc7XG4gICAgICAgIHZhciBleHBvbmVudFN0cmluZztcblxuICAgICAgICB2YXIgdGVtcCA9IG51bWJlclN0cmluZy5zcGxpdChcImVcIik7XG5cbiAgICAgICAgZXhwb25lbnRTdHJpbmcgPSB0ZW1wWzFdIHx8IFwiXCI7XG5cbiAgICAgICAgdGVtcCA9IHRlbXBbMF0uc3BsaXQoXCIuXCIpO1xuXG4gICAgICAgIGZyYWN0aW9uU3RyaW5nID0gdGVtcFsxXSB8fCBcIlwiO1xuICAgICAgICBpbnRlZ2VyU3RyaW5nID0gdGVtcFswXSB8fCBcIlwiO1xuXG4gICAgICAgIC8vIFdvcmthcm91bmQgZm9yIGZsb2F0aW5nIHBvaW50IGVycm9ycyBpbiBgdG9GaXhlZGAgYW5kIGB0b1ByZWNpc2lvbmAuXG4gICAgICAgIC8vICgzLjU1KS50b0ZpeGVkKDEpOyAtLT4gXCIzLjVcIlxuICAgICAgICAvLyAoMTIzLjU1IC0gMTIwKS50b1ByZWNpc2lvbigyKTsgLS0+IFwiMy41XCJcbiAgICAgICAgLy8gKDEyMy41NSAtIDEyMCk7IC0tPiAzLjU0OTk5OTk5OTk5OTk5N1xuICAgICAgICAvLyAoMTIzLjU1IC0gMTIwKS50b0ZpeGVkKDIpOyAtLT4gXCIzLjU1XCJcbiAgICAgICAgLy8gUm91bmQgYnkgZXhhbWluZyB0aGUgc3RyaW5nIG91dHB1dCBvZiB0aGUgbmV4dCBkaWdpdC5cblxuICAgICAgICAvLyAqKioqKioqKioqKioqKiogSW1wbGVtZW50IFN0cmluZyBSb3VuZGluZyBoZXJlICoqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgIC8vIENoZWNrIGludGVnZXJTdHJpbmcgKyBmcmFjdGlvblN0cmluZyBsZW5ndGggb2YgdG9QcmVjaXNpb24gYmVmb3JlIHJvdW5kaW5nLlxuICAgICAgICAvLyBDaGVjayBsZW5ndGggb2YgZnJhY3Rpb25TdHJpbmcgZnJvbSB0b0ZpeGVkIG91dHB1dCBiZWZvcmUgcm91bmRpbmcuXG4gICAgICAgIHZhciBpbnRlZ2VyTGVuZ3RoID0gaW50ZWdlclN0cmluZy5sZW5ndGg7XG4gICAgICAgIHZhciBmcmFjdGlvbkxlbmd0aCA9IGZyYWN0aW9uU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgdmFyIGRpZ2l0Q291bnQgPSBpbnRlZ2VyTGVuZ3RoICsgZnJhY3Rpb25MZW5ndGg7XG4gICAgICAgIHZhciBkaWdpdHMgPSBpbnRlZ2VyU3RyaW5nICsgZnJhY3Rpb25TdHJpbmc7XG5cbiAgICAgICAgaWYgKG1heGltdW1TaWduaWZpY2FudERpZ2l0cyAmJiBkaWdpdENvdW50ID09PSAobWF4aW11bVNpZ25pZmljYW50RGlnaXRzICsgMSkgfHwgIW1heGltdW1TaWduaWZpY2FudERpZ2l0cyAmJiBmcmFjdGlvbkxlbmd0aCA9PT0gKGZyYWN0aW9uRGlnaXRzICsgMSkpIHtcbiAgICAgICAgICAgIC8vIFJvdW5kIGRpZ2l0cy5cbiAgICAgICAgICAgIGRpZ2l0cyA9IHN0cmluZ1JvdW5kKGRpZ2l0cyk7XG5cbiAgICAgICAgICAgIGlmIChkaWdpdHMubGVuZ3RoID09PSBkaWdpdENvdW50ICsgMSkge1xuICAgICAgICAgICAgICAgIGludGVnZXJMZW5ndGggPSBpbnRlZ2VyTGVuZ3RoICsgMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRGlzY2FyZCBmaW5hbCBmcmFjdGlvbkRpZ2l0LlxuICAgICAgICAgICAgaWYgKGZyYWN0aW9uTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZGlnaXRzID0gZGlnaXRzLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2VwYXJhdGUgaW50ZWdlciBhbmQgZnJhY3Rpb24uXG4gICAgICAgICAgICBpbnRlZ2VyU3RyaW5nID0gZGlnaXRzLnNsaWNlKDAsIGludGVnZXJMZW5ndGgpO1xuICAgICAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSBkaWdpdHMuc2xpY2UoaW50ZWdlckxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUcmltIHRyYWlsaW5nIHplcm9lcyBmcm9tIGZyYWN0aW9uU3RyaW5nIGJlY2F1c2UgdG9QcmVjaXNpb24gb3V0cHV0c1xuICAgICAgICAvLyBwcmVjaXNpb24sIG5vdCBzaWduaWZpY2FudCBkaWdpdHMuXG4gICAgICAgIGlmIChtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMpIHtcbiAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gZnJhY3Rpb25TdHJpbmcucmVwbGFjZSgvMCokLywgXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGUgZXhwb25lbnQuXG4gICAgICAgIHZhciBleHBvbmVudCA9IHBhcnNlSW50KGV4cG9uZW50U3RyaW5nLCAxMCk7XG5cbiAgICAgICAgaWYgKGV4cG9uZW50ID4gMCkge1xuICAgICAgICAgICAgaWYgKGZyYWN0aW9uU3RyaW5nLmxlbmd0aCA8PSBleHBvbmVudCkge1xuICAgICAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gZnJhY3Rpb25TdHJpbmcgKyByZXBlYXRaZXJvKGV4cG9uZW50IC0gZnJhY3Rpb25TdHJpbmcubGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgIGludGVnZXJTdHJpbmcgPSBpbnRlZ2VyU3RyaW5nICsgZnJhY3Rpb25TdHJpbmc7XG4gICAgICAgICAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnRlZ2VyU3RyaW5nID0gaW50ZWdlclN0cmluZyArIGZyYWN0aW9uU3RyaW5nLnNsaWNlKDAsIGV4cG9uZW50KTtcbiAgICAgICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IGZyYWN0aW9uU3RyaW5nLnNsaWNlKGV4cG9uZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChleHBvbmVudCA8IDApIHtcbiAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gKHJlcGVhdFplcm8oTWF0aC5hYnMoZXhwb25lbnQpIC0gaW50ZWdlclN0cmluZy5sZW5ndGgpICsgaW50ZWdlclN0cmluZyArIGZyYWN0aW9uU3RyaW5nKTtcblxuICAgICAgICAgICAgaW50ZWdlclN0cmluZyA9IFwiMFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMpIHtcbiAgICAgICAgICAgIC8vIFRyaW0gb3IgcGFkIGZyYWN0aW9uIHdoZW4gbm90IHVzaW5nIG1heGltdW1TaWduaWZpY2FudERpZ2l0cy5cbiAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gZnJhY3Rpb25TdHJpbmcuc2xpY2UoMCwgZnJhY3Rpb25EaWdpdHMpO1xuXG4gICAgICAgICAgICBpZiAoZnJhY3Rpb25TdHJpbmcubGVuZ3RoIDwgZnJhY3Rpb25EaWdpdHMpIHtcbiAgICAgICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IGZyYWN0aW9uU3RyaW5nICsgcmVwZWF0WmVybyhmcmFjdGlvbkRpZ2l0cyAtIGZyYWN0aW9uU3RyaW5nLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFBhZCBpbnRlZ2VyIHdoZW4gdXNpbmcgbWluaW11bUludGVnZXJEaWdpdHNcbiAgICAgICAgICAgIC8vIGFuZCBub3QgdXNpbmcgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzLlxuICAgICAgICAgICAgaWYgKGludGVnZXJTdHJpbmcubGVuZ3RoIDwgbWluaW11bUludGVnZXJEaWdpdHMpIHtcbiAgICAgICAgICAgICAgICBpbnRlZ2VyU3RyaW5nID0gcmVwZWF0WmVybyhtaW5pbXVtSW50ZWdlckRpZ2l0cyAtIGludGVnZXJTdHJpbmcubGVuZ3RoKSArIGludGVnZXJTdHJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZm9ybWF0dGVkU3RyaW5nID0gXCJcIjtcblxuICAgICAgICAvLyBIYW5kbGUgZ3JvdXBpbmcuXG4gICAgICAgIGlmICh1c2VHcm91cGluZykge1xuICAgICAgICAgICAgdGVtcCA9IGludGVnZXJTdHJpbmc7XG4gICAgICAgICAgICB2YXIgZ3JvdXA7XG5cbiAgICAgICAgICAgIHdoaWxlICh0ZW1wLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmIChncm91cGluZy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSBncm91cGluZy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChmb3JtYXR0ZWRTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gZ3JvdXBpbmdTZXBhcmF0b3IgKyBmb3JtYXR0ZWRTdHJpbmc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGVtcC5zbGljZSgtZ3JvdXApICsgZm9ybWF0dGVkU3RyaW5nO1xuXG4gICAgICAgICAgICAgICAgdGVtcCA9IHRlbXAuc2xpY2UoMCwgLWdyb3VwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IGludGVnZXJTdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgZGVjaW1hbFNlcGFyYXRvciBhbmQgZnJhY3Rpb24uXG4gICAgICAgIGlmIChmcmFjdGlvblN0cmluZykge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gZm9ybWF0dGVkU3RyaW5nICsgZGVjaW1hbFNlcGFyYXRvciArIGZyYWN0aW9uU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFN0cmluZztcbiAgICB9XG5cbiAgICAvLyBkdXJhdGlvbkxhYmVsQ29tcGFyZVxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uTGFiZWxDb21wYXJlKGEsIGIpIHtcbiAgICAgICAgaWYgKGEubGFiZWwubGVuZ3RoID4gYi5sYWJlbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhLmxhYmVsLmxlbmd0aCA8IGIubGFiZWwubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGEgbXVzdCBiZSBlcXVhbCB0byBiXG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIC8vIGR1cmF0aW9uR2V0TGFiZWxzXG4gICAgZnVuY3Rpb24gZHVyYXRpb25HZXRMYWJlbHModG9rZW4sIGxvY2FsZURhdGEpIHtcbiAgICAgICAgdmFyIGxhYmVscyA9IFtdO1xuXG4gICAgICAgIGVhY2goa2V5cyhsb2NhbGVEYXRhKSwgZnVuY3Rpb24gKGxvY2FsZURhdGFLZXkpIHtcbiAgICAgICAgICAgIGlmIChsb2NhbGVEYXRhS2V5LnNsaWNlKDAsIDE1KSAhPT0gXCJfZHVyYXRpb25MYWJlbHNcIikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGxhYmVsVHlwZSA9IGxvY2FsZURhdGFLZXkuc2xpY2UoMTUpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGVhY2goa2V5cyhsb2NhbGVEYXRhW2xvY2FsZURhdGFLZXldKSwgZnVuY3Rpb24gKGxhYmVsS2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGxhYmVsS2V5LnNsaWNlKDAsIDEpID09PSB0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBsYWJlbFR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGxhYmVsS2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxvY2FsZURhdGFbbG9jYWxlRGF0YUtleV1bbGFiZWxLZXldXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbGFiZWxzO1xuICAgIH1cblxuICAgIC8vIGR1cmF0aW9uUGx1cmFsS2V5XG4gICAgZnVuY3Rpb24gZHVyYXRpb25QbHVyYWxLZXkodG9rZW4sIGludGVnZXJWYWx1ZSwgZGVjaW1hbFZhbHVlKSB7XG4gICAgICAgIC8vIFNpbmd1bGFyIGZvciBhIHZhbHVlIG9mIGAxYCwgYnV0IG5vdCBmb3IgYDEuMGAuXG4gICAgICAgIGlmIChpbnRlZ2VyVmFsdWUgPT09IDEgJiYgZGVjaW1hbFZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9rZW4gKyB0b2tlbjtcbiAgICB9XG5cbiAgICB2YXIgZW5nTG9jYWxlID0ge1xuICAgICAgICBkdXJhdGlvbkxhYmVsc1N0YW5kYXJkOiB7XG4gICAgICAgICAgICBTOiAnbWlsbGlzZWNvbmQnLFxuICAgICAgICAgICAgU1M6ICdtaWxsaXNlY29uZHMnLFxuICAgICAgICAgICAgczogJ3NlY29uZCcsXG4gICAgICAgICAgICBzczogJ3NlY29uZHMnLFxuICAgICAgICAgICAgbTogJ21pbnV0ZScsXG4gICAgICAgICAgICBtbTogJ21pbnV0ZXMnLFxuICAgICAgICAgICAgaDogJ2hvdXInLFxuICAgICAgICAgICAgaGg6ICdob3VycycsXG4gICAgICAgICAgICBkOiAnZGF5JyxcbiAgICAgICAgICAgIGRkOiAnZGF5cycsXG4gICAgICAgICAgICB3OiAnd2VlaycsXG4gICAgICAgICAgICB3dzogJ3dlZWtzJyxcbiAgICAgICAgICAgIE06ICdtb250aCcsXG4gICAgICAgICAgICBNTTogJ21vbnRocycsXG4gICAgICAgICAgICB5OiAneWVhcicsXG4gICAgICAgICAgICB5eTogJ3llYXJzJ1xuICAgICAgICB9LFxuICAgICAgICBkdXJhdGlvbkxhYmVsc1Nob3J0OiB7XG4gICAgICAgICAgICBTOiAnbXNlYycsXG4gICAgICAgICAgICBTUzogJ21zZWNzJyxcbiAgICAgICAgICAgIHM6ICdzZWMnLFxuICAgICAgICAgICAgc3M6ICdzZWNzJyxcbiAgICAgICAgICAgIG06ICdtaW4nLFxuICAgICAgICAgICAgbW06ICdtaW5zJyxcbiAgICAgICAgICAgIGg6ICdocicsXG4gICAgICAgICAgICBoaDogJ2hycycsXG4gICAgICAgICAgICBkOiAnZHknLFxuICAgICAgICAgICAgZGQ6ICdkeXMnLFxuICAgICAgICAgICAgdzogJ3drJyxcbiAgICAgICAgICAgIHd3OiAnd2tzJyxcbiAgICAgICAgICAgIE06ICdtbycsXG4gICAgICAgICAgICBNTTogJ21vcycsXG4gICAgICAgICAgICB5OiAneXInLFxuICAgICAgICAgICAgeXk6ICd5cnMnXG4gICAgICAgIH0sXG4gICAgICAgIGR1cmF0aW9uVGltZVRlbXBsYXRlczoge1xuICAgICAgICAgICAgSE1TOiAnaDptbTpzcycsXG4gICAgICAgICAgICBITTogJ2g6bW0nLFxuICAgICAgICAgICAgTVM6ICdtOnNzJ1xuICAgICAgICB9LFxuICAgICAgICBkdXJhdGlvbkxhYmVsVHlwZXM6IFtcbiAgICAgICAgICAgIHsgdHlwZTogXCJzdGFuZGFyZFwiLCBzdHJpbmc6IFwiX19cIiB9LFxuICAgICAgICAgICAgeyB0eXBlOiBcInNob3J0XCIsIHN0cmluZzogXCJfXCIgfVxuICAgICAgICBdLFxuICAgICAgICBkdXJhdGlvblBsdXJhbEtleTogZHVyYXRpb25QbHVyYWxLZXlcbiAgICB9O1xuXG4gICAgLy8gaXNBcnJheVxuICAgIGZ1bmN0aW9uIGlzQXJyYXkoYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnJheSkgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgICB9XG5cbiAgICAvLyBpc09iamVjdFxuICAgIGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG4gICAgfVxuXG4gICAgLy8gZmluZExhc3RcbiAgICBmdW5jdGlvbiBmaW5kTGFzdChhcnJheSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGluZGV4ID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlIChpbmRleCAtPSAxKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soYXJyYXlbaW5kZXhdKSkgeyByZXR1cm4gYXJyYXlbaW5kZXhdOyB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaW5kXG4gICAgZnVuY3Rpb24gZmluZChhcnJheSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcblxuICAgICAgICB2YXIgbWF4ID0gYXJyYXkgJiYgYXJyYXkubGVuZ3RoIHx8IDA7XG5cbiAgICAgICAgdmFyIG1hdGNoO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgbWF0Y2ggPSBjYWxsYmFjaztcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbSA9PT0gbWF0Y2g7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKGluZGV4IDwgbWF4KSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soYXJyYXlbaW5kZXhdKSkgeyByZXR1cm4gYXJyYXlbaW5kZXhdOyB9XG4gICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZWFjaFxuICAgIGZ1bmN0aW9uIGVhY2goYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDAsXG4gICAgICAgICAgICBtYXggPSBhcnJheS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCFhcnJheSB8fCAhbWF4KSB7IHJldHVybjsgfVxuXG4gICAgICAgIHdoaWxlIChpbmRleCA8IG1heCkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGFycmF5W2luZGV4XSwgaW5kZXgpID09PSBmYWxzZSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBtYXBcbiAgICBmdW5jdGlvbiBtYXAoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDAsXG4gICAgICAgICAgICBtYXggPSBhcnJheS5sZW5ndGgsXG4gICAgICAgICAgICByZXQgPSBbXTtcblxuICAgICAgICBpZiAoIWFycmF5IHx8ICFtYXgpIHsgcmV0dXJuIHJldDsgfVxuXG4gICAgICAgIHdoaWxlIChpbmRleCA8IG1heCkge1xuICAgICAgICAgICAgcmV0W2luZGV4XSA9IGNhbGxiYWNrKGFycmF5W2luZGV4XSwgaW5kZXgpO1xuICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gcGx1Y2tcbiAgICBmdW5jdGlvbiBwbHVjayhhcnJheSwgcHJvcCkge1xuICAgICAgICByZXR1cm4gbWFwKGFycmF5LCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1bcHJvcF07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGNvbXBhY3RcbiAgICBmdW5jdGlvbiBjb21wYWN0KGFycmF5KSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICBlYWNoKGFycmF5LCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHsgcmV0LnB1c2goaXRlbSk7IH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvLyB1bmlxdWVcbiAgICBmdW5jdGlvbiB1bmlxdWUoYXJyYXkpIHtcbiAgICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICAgIGVhY2goYXJyYXksIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgaWYgKCFmaW5kKHJldCwgX2EpKSB7IHJldC5wdXNoKF9hKTsgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8vIGludGVyc2VjdGlvblxuICAgIGZ1bmN0aW9uIGludGVyc2VjdGlvbihhLCBiKSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICBlYWNoKGEsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgZWFjaChiLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBpZiAoX2EgPT09IF9iKSB7IHJldC5wdXNoKF9hKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB1bmlxdWUocmV0KTtcbiAgICB9XG5cbiAgICAvLyByZXN0XG4gICAgZnVuY3Rpb24gcmVzdChhcnJheSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICAgIGVhY2goYXJyYXksIGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKCFjYWxsYmFjayhpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJldCA9IGFycmF5LnNsaWNlKGluZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gaW5pdGlhbFxuICAgIGZ1bmN0aW9uIGluaXRpYWwoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXZlcnNlZCA9IGFycmF5LnNsaWNlKCkucmV2ZXJzZSgpO1xuXG4gICAgICAgIHJldHVybiByZXN0KHJldmVyc2VkLCBjYWxsYmFjaykucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIC8vIGV4dGVuZFxuICAgIGZ1bmN0aW9uIGV4dGVuZChhLCBiKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgICAgICAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7IGFba2V5XSA9IGJba2V5XTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgLy8ga2V5c1xuICAgIGZ1bmN0aW9uIGtleXMoYSkge1xuICAgICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIGEpIHtcbiAgICAgICAgICAgIGlmIChhLmhhc093blByb3BlcnR5KGtleSkpIHsgcmV0LnB1c2goa2V5KTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvLyBhbnlcbiAgICBmdW5jdGlvbiBhbnkoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDAsXG4gICAgICAgICAgICBtYXggPSBhcnJheS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCFhcnJheSB8fCAhbWF4KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHdoaWxlIChpbmRleCA8IG1heCkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGFycmF5W2luZGV4XSwgaW5kZXgpID09PSB0cnVlKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGZsYXR0ZW5cbiAgICBmdW5jdGlvbiBmbGF0dGVuKGFycmF5KSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICBlYWNoKGFycmF5LCBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChjaGlsZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9Mb2NhbGVTdHJpbmdTdXBwb3J0c0xvY2FsZXMoKSB7XG4gICAgICAgIHZhciBudW1iZXIgPSAwO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbnVtYmVyLnRvTG9jYWxlU3RyaW5nKCdpJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlLm5hbWUgPT09ICdSYW5nZUVycm9yJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmVhdHVyZVRlc3RUb0xvY2FsZVN0cmluZ1JvdW5kaW5nKCkge1xuICAgICAgICByZXR1cm4gKDMuNTUpLnRvTG9jYWxlU3RyaW5nKFwiZW5cIiwge1xuICAgICAgICAgICAgdXNlR3JvdXBpbmc6IGZhbHNlLFxuICAgICAgICAgICAgbWluaW11bUludGVnZXJEaWdpdHM6IDEsXG4gICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDEsXG4gICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDFcbiAgICAgICAgfSkgPT09IFwiMy42XCI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmVhdHVyZVRlc3RUb0xvY2FsZVN0cmluZygpIHtcbiAgICAgICAgdmFyIHBhc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gVGVzdCBsb2NhbGUuXG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiB0b0xvY2FsZVN0cmluZ1N1cHBvcnRzTG9jYWxlcygpO1xuICAgICAgICBpZiAoIXBhc3NlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICAvLyBUZXN0IG1pbmltdW1JbnRlZ2VyRGlnaXRzLlxuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgKDEpLnRvTG9jYWxlU3RyaW5nKFwiZW5cIiwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMSB9KSA9PT0gXCIxXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiAoMSkudG9Mb2NhbGVTdHJpbmcoXCJlblwiLCB7IG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAyIH0pID09PSBcIjAxXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiAoMSkudG9Mb2NhbGVTdHJpbmcoXCJlblwiLCB7IG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAzIH0pID09PSBcIjAwMVwiO1xuICAgICAgICBpZiAoIXBhc3NlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICAvLyBUZXN0IG1heGltdW1GcmFjdGlvbkRpZ2l0cyBhbmQgbWluaW11bUZyYWN0aW9uRGlnaXRzLlxuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgKDk5Ljk5KS50b0xvY2FsZVN0cmluZyhcImVuXCIsIHsgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAwLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDAgfSkgPT09IFwiMTAwXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiAoOTkuOTkpLnRvTG9jYWxlU3RyaW5nKFwiZW5cIiwgeyBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDEsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMSB9KSA9PT0gXCIxMDAuMFwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgKDk5Ljk5KS50b0xvY2FsZVN0cmluZyhcImVuXCIsIHsgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIgfSkgPT09IFwiOTkuOTlcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmICg5OS45OSkudG9Mb2NhbGVTdHJpbmcoXCJlblwiLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAzIH0pID09PSBcIjk5Ljk5MFwiO1xuICAgICAgICBpZiAoIXBhc3NlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICAvLyBUZXN0IG1heGltdW1TaWduaWZpY2FudERpZ2l0cy5cbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmICg5OS45OSkudG9Mb2NhbGVTdHJpbmcoXCJlblwiLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogMSB9KSA9PT0gXCIxMDBcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmICg5OS45OSkudG9Mb2NhbGVTdHJpbmcoXCJlblwiLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogMiB9KSA9PT0gXCIxMDBcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmICg5OS45OSkudG9Mb2NhbGVTdHJpbmcoXCJlblwiLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogMyB9KSA9PT0gXCIxMDBcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmICg5OS45OSkudG9Mb2NhbGVTdHJpbmcoXCJlblwiLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogNCB9KSA9PT0gXCI5OS45OVwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgKDk5Ljk5KS50b0xvY2FsZVN0cmluZyhcImVuXCIsIHsgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzOiA1IH0pID09PSBcIjk5Ljk5XCI7XG4gICAgICAgIGlmICghcGFzc2VkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIC8vIFRlc3QgZ3JvdXBpbmcuXG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiAoMTAwMCkudG9Mb2NhbGVTdHJpbmcoXCJlblwiLCB7IHVzZUdyb3VwaW5nOiB0cnVlIH0pID09PSBcIjEsMDAwXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiAoMTAwMCkudG9Mb2NhbGVTdHJpbmcoXCJlblwiLCB7IHVzZUdyb3VwaW5nOiBmYWxzZSB9KSA9PT0gXCIxMDAwXCI7XG4gICAgICAgIGlmICghcGFzc2VkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGR1cmF0aW9uc0Zvcm1hdChkdXJhdGlvbnMgWywgdGVtcGxhdGVdIFssIHByZWNpc2lvbl0gWywgc2V0dGluZ3NdKVxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uc0Zvcm1hdCgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBzZXR0aW5ncyA9IHt9O1xuICAgICAgICB2YXIgZHVyYXRpb25zO1xuXG4gICAgICAgIC8vIFBhcnNlIGFyZ3VtZW50cy5cbiAgICAgICAgZWFjaChhcmdzLCBmdW5jdGlvbiAoYXJnLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKCFpbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICghaXNBcnJheShhcmcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFwiRXhwZWN0ZWQgYXJyYXkgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIGR1cmF0aW9uc0Zvcm1hdC5cIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkdXJhdGlvbnMgPSBhcmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBhcmcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnRlbXBsYXRlID0gYXJnO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5wcmVjaXNpb24gPSBhcmc7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoYXJnKSkge1xuICAgICAgICAgICAgICAgIGV4dGVuZChzZXR0aW5ncywgYXJnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFkdXJhdGlvbnMgfHwgIWR1cmF0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldHRpbmdzLnJldHVybk1vbWVudFR5cGVzID0gdHJ1ZTtcblxuICAgICAgICB2YXIgZm9ybWF0dGVkRHVyYXRpb25zID0gbWFwKGR1cmF0aW9ucywgZnVuY3Rpb24gKGR1cikge1xuICAgICAgICAgICAgcmV0dXJuIGR1ci5mb3JtYXQoc2V0dGluZ3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBNZXJnZSB0b2tlbiB0eXBlcyBmcm9tIGFsbCBkdXJhdGlvbnMuXG4gICAgICAgIHZhciBvdXRwdXRUeXBlcyA9IGludGVyc2VjdGlvbih0eXBlcywgdW5pcXVlKHBsdWNrKGZsYXR0ZW4oZm9ybWF0dGVkRHVyYXRpb25zKSwgXCJ0eXBlXCIpKSk7XG5cbiAgICAgICAgdmFyIGxhcmdlc3QgPSBzZXR0aW5ncy5sYXJnZXN0O1xuXG4gICAgICAgIGlmIChsYXJnZXN0KSB7XG4gICAgICAgICAgICBvdXRwdXRUeXBlcyA9IG91dHB1dFR5cGVzLnNsaWNlKDAsIGxhcmdlc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0dGluZ3MucmV0dXJuTW9tZW50VHlwZXMgPSBmYWxzZTtcbiAgICAgICAgc2V0dGluZ3Mub3V0cHV0VHlwZXMgPSBvdXRwdXRUeXBlcztcblxuICAgICAgICByZXR1cm4gbWFwKGR1cmF0aW9ucywgZnVuY3Rpb24gKGR1cikge1xuICAgICAgICAgICAgcmV0dXJuIGR1ci5mb3JtYXQoc2V0dGluZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBkdXJhdGlvbkZvcm1hdChbdGVtcGxhdGVdIFssIHByZWNpc2lvbl0gWywgc2V0dGluZ3NdKVxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uRm9ybWF0KCkge1xuXG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSBleHRlbmQoe30sIHRoaXMuZm9ybWF0LmRlZmF1bHRzKTtcblxuICAgICAgICAvLyBLZWVwIGEgc2hhZG93IGNvcHkgb2YgdGhpcyBtb21lbnQgZm9yIGNhbGN1bGF0aW5nIHJlbWFpbmRlcnMuXG4gICAgICAgIC8vIFBlcmZvcm0gYWxsIGNhbGN1bGF0aW9ucyBvbiBwb3NpdGl2ZSBkdXJhdGlvbiB2YWx1ZSwgaGFuZGxlIG5lZ2F0aXZlXG4gICAgICAgIC8vIHNpZ24gYXQgdGhlIHZlcnkgZW5kLlxuICAgICAgICB2YXIgYXNNaWxsaXNlY29uZHMgPSB0aGlzLmFzTWlsbGlzZWNvbmRzKCk7XG4gICAgICAgIHZhciBhc01vbnRocyA9IHRoaXMuYXNNb250aHMoKTtcblxuICAgICAgICAvLyBUcmVhdCBpbnZhbGlkIGR1cmF0aW9ucyBhcyBoYXZpbmcgYSB2YWx1ZSBvZiAwIG1pbGxpc2Vjb25kcy5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmlzVmFsaWQgPT09IFwiZnVuY3Rpb25cIiAmJiB0aGlzLmlzVmFsaWQoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGFzTWlsbGlzZWNvbmRzID0gMDtcbiAgICAgICAgICAgIGFzTW9udGhzID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpc05lZ2F0aXZlID0gYXNNaWxsaXNlY29uZHMgPCAwO1xuXG4gICAgICAgIC8vIFR3byBzaGFkb3cgY29waWVzIGFyZSBuZWVkZWQgYmVjYXVzZSBvZiB0aGUgd2F5IG1vbWVudC5qcyBoYW5kbGVzXG4gICAgICAgIC8vIGR1cmF0aW9uIGFyaXRobWV0aWMgZm9yIHllYXJzL21vbnRocyBhbmQgZm9yIHdlZWtzL2RheXMvaG91cnMvbWludXRlcy9zZWNvbmRzLlxuICAgICAgICB2YXIgcmVtYWluZGVyID0gbW9tZW50LmR1cmF0aW9uKE1hdGguYWJzKGFzTWlsbGlzZWNvbmRzKSwgXCJtaWxsaXNlY29uZHNcIik7XG4gICAgICAgIHZhciByZW1haW5kZXJNb250aHMgPSBtb21lbnQuZHVyYXRpb24oTWF0aC5hYnMoYXNNb250aHMpLCBcIm1vbnRoc1wiKTtcblxuICAgICAgICAvLyBQYXJzZSBhcmd1bWVudHMuXG4gICAgICAgIGVhY2goYXJncywgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGFyZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MudGVtcGxhdGUgPSBhcmc7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZyA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnByZWNpc2lvbiA9IGFyZztcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc09iamVjdChhcmcpKSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5kKHNldHRpbmdzLCBhcmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbW9tZW50VG9rZW5zID0ge1xuICAgICAgICAgICAgeWVhcnM6IFwieVwiLFxuICAgICAgICAgICAgbW9udGhzOiBcIk1cIixcbiAgICAgICAgICAgIHdlZWtzOiBcIndcIixcbiAgICAgICAgICAgIGRheXM6IFwiZFwiLFxuICAgICAgICAgICAgaG91cnM6IFwiaFwiLFxuICAgICAgICAgICAgbWludXRlczogXCJtXCIsXG4gICAgICAgICAgICBzZWNvbmRzOiBcInNcIixcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kczogXCJTXCJcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdG9rZW5EZWZzID0ge1xuICAgICAgICAgICAgZXNjYXBlOiAvXFxbKC4rPylcXF0vLFxuICAgICAgICAgICAgeWVhcnM6IC9cXCo/W1l5XSsvLFxuICAgICAgICAgICAgbW9udGhzOiAvXFwqP00rLyxcbiAgICAgICAgICAgIHdlZWtzOiAvXFwqP1tXd10rLyxcbiAgICAgICAgICAgIGRheXM6IC9cXCo/W0RkXSsvLFxuICAgICAgICAgICAgaG91cnM6IC9cXCo/W0hoXSsvLFxuICAgICAgICAgICAgbWludXRlczogL1xcKj9tKy8sXG4gICAgICAgICAgICBzZWNvbmRzOiAvXFwqP3MrLyxcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kczogL1xcKj9TKy8sXG4gICAgICAgICAgICBnZW5lcmFsOiAvLis/L1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFR5cGVzIGFycmF5IGlzIGF2YWlsYWJsZSBpbiB0aGUgdGVtcGxhdGUgZnVuY3Rpb24uXG4gICAgICAgIHNldHRpbmdzLnR5cGVzID0gdHlwZXM7XG5cbiAgICAgICAgdmFyIHR5cGVNYXAgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBmaW5kKHR5cGVzLCBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbkRlZnNbdHlwZV0udGVzdCh0b2tlbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdG9rZW5pemVyID0gbmV3IFJlZ0V4cChtYXAodHlwZXMsIGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW5EZWZzW3R5cGVdLnNvdXJjZTtcbiAgICAgICAgfSkuam9pbihcInxcIiksIFwiZ1wiKTtcblxuICAgICAgICAvLyBDdXJyZW50IGR1cmF0aW9uIG9iamVjdCBpcyBhdmFpbGFibGUgaW4gdGhlIHRlbXBsYXRlIGZ1bmN0aW9uLlxuICAgICAgICBzZXR0aW5ncy5kdXJhdGlvbiA9IHRoaXM7XG5cbiAgICAgICAgLy8gRXZhbCB0ZW1wbGF0ZSBmdW5jdGlvbiBhbmQgY2FjaGUgdGVtcGxhdGUgc3RyaW5nLlxuICAgICAgICB2YXIgdGVtcGxhdGUgPSB0eXBlb2Ygc2V0dGluZ3MudGVtcGxhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHNldHRpbmdzLnRlbXBsYXRlLmFwcGx5KHNldHRpbmdzKSA6IHNldHRpbmdzLnRlbXBsYXRlO1xuXG4gICAgICAgIC8vIG91dHB1dFR5cGVzIGFuZCByZXR1cm5Nb21lbnRUeXBlcyBhcmUgc2V0dGluZ3MgdG8gc3VwcG9ydCBkdXJhdGlvbnNGb3JtYXQoKS5cblxuICAgICAgICAvLyBvdXRwdXRUeXBlcyBpcyBhbiBhcnJheSBvZiBtb21lbnQgdG9rZW4gdHlwZXMgdGhhdCBkZXRlcm1pbmVzXG4gICAgICAgIC8vIHRoZSB0b2tlbnMgcmV0dXJuZWQgaW4gZm9ybWF0dGVkIG91dHB1dC4gVGhpcyBvcHRpb24gb3ZlcnJpZGVzXG4gICAgICAgIC8vIHRyaW0sIGxhcmdlc3QsIHN0b3BUcmltLCBldGMuXG4gICAgICAgIHZhciBvdXRwdXRUeXBlcyA9IHNldHRpbmdzLm91dHB1dFR5cGVzO1xuXG4gICAgICAgIC8vIHJldHVybk1vbWVudFR5cGVzIGlzIGEgYm9vbGVhbiB0aGF0IHNldHMgZHVyYXRpb25Gb3JtYXQgdG8gcmV0dXJuXG4gICAgICAgIC8vIHRoZSBwcm9jZXNzZWQgbW9tZW50VHlwZXMgaW5zdGVhZCBvZiBmb3JtYXR0ZWQgb3V0cHV0LlxuICAgICAgICB2YXIgcmV0dXJuTW9tZW50VHlwZXMgPSBzZXR0aW5ncy5yZXR1cm5Nb21lbnRUeXBlcztcblxuICAgICAgICB2YXIgbGFyZ2VzdCA9IHNldHRpbmdzLmxhcmdlc3Q7XG5cbiAgICAgICAgLy8gU2V0dXAgc3RvcFRyaW0gYXJyYXkgb2YgdG9rZW4gdHlwZXMuXG4gICAgICAgIHZhciBzdG9wVHJpbSA9IFtdO1xuXG4gICAgICAgIGlmICghb3V0cHV0VHlwZXMpIHtcbiAgICAgICAgICAgIGlmIChpc0FycmF5KHNldHRpbmdzLnN0b3BUcmltKSkge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnN0b3BUcmltID0gc2V0dGluZ3Muc3RvcFRyaW0uam9pbihcIlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUGFyc2Ugc3RvcFRyaW0gc3RyaW5nIHRvIGNyZWF0ZSB0b2tlbiB0eXBlcyBhcnJheS5cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5zdG9wVHJpbSkge1xuICAgICAgICAgICAgICAgIGVhY2goc2V0dGluZ3Muc3RvcFRyaW0ubWF0Y2godG9rZW5pemVyKSwgZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gdHlwZU1hcCh0b2tlbik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiZXNjYXBlXCIgfHwgdHlwZSA9PT0gXCJnZW5lcmFsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN0b3BUcmltLnB1c2godHlwZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYWNoZSBtb21lbnQncyBsb2NhbGUgZGF0YS5cbiAgICAgICAgdmFyIGxvY2FsZURhdGEgPSBtb21lbnQubG9jYWxlRGF0YSgpO1xuXG4gICAgICAgIGlmICghbG9jYWxlRGF0YSkge1xuICAgICAgICAgICAgbG9jYWxlRGF0YSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmFsbCBiYWNrIHRvIHRoaXMgcGx1Z2luJ3MgYGVuZ2AgZXh0ZW5zaW9uLlxuICAgICAgICBlYWNoKGtleXMoZW5nTG9jYWxlKSwgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlbmdMb2NhbGVba2V5XSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFsb2NhbGVEYXRhW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlRGF0YVtrZXldID0gZW5nTG9jYWxlW2tleV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWxvY2FsZURhdGFbXCJfXCIgKyBrZXldKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlRGF0YVtcIl9cIiArIGtleV0gPSBlbmdMb2NhbGVba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVwbGFjZSBEdXJhdGlvbiBUaW1lIFRlbXBsYXRlIHN0cmluZ3MuXG4gICAgICAgIC8vIEZvciBsb2NhbGUgYGVuZ2A6IGBfSE1TX2AsIGBfSE1fYCwgYW5kIGBfTVNfYC5cbiAgICAgICAgZWFjaChrZXlzKGxvY2FsZURhdGEuX2R1cmF0aW9uVGltZVRlbXBsYXRlcyksIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoXCJfXCIgKyBpdGVtICsgXCJfXCIsIGxvY2FsZURhdGEuX2R1cmF0aW9uVGltZVRlbXBsYXRlc1tpdGVtXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIERldGVybWluZSB1c2VyJ3MgbG9jYWxlLlxuICAgICAgICB2YXIgdXNlckxvY2FsZSA9IHNldHRpbmdzLnVzZXJMb2NhbGUgfHwgbW9tZW50LmxvY2FsZSgpO1xuXG4gICAgICAgIHZhciB1c2VMZWZ0VW5pdHMgPSBzZXR0aW5ncy51c2VMZWZ0VW5pdHM7XG4gICAgICAgIHZhciB1c2VQbHVyYWwgPSBzZXR0aW5ncy51c2VQbHVyYWw7XG4gICAgICAgIHZhciBwcmVjaXNpb24gPSBzZXR0aW5ncy5wcmVjaXNpb247XG4gICAgICAgIHZhciBmb3JjZUxlbmd0aCA9IHNldHRpbmdzLmZvcmNlTGVuZ3RoO1xuICAgICAgICB2YXIgdXNlR3JvdXBpbmcgPSBzZXR0aW5ncy51c2VHcm91cGluZztcbiAgICAgICAgdmFyIHRydW5jID0gc2V0dGluZ3MudHJ1bmM7XG5cbiAgICAgICAgLy8gVXNlIHNpZ25pZmljYW50IGRpZ2l0cyBvbmx5IHdoZW4gcHJlY2lzaW9uIGlzIGdyZWF0ZXIgdGhhbiAwLlxuICAgICAgICB2YXIgdXNlU2lnbmlmaWNhbnREaWdpdHMgPSBzZXR0aW5ncy51c2VTaWduaWZpY2FudERpZ2l0cyAmJiBwcmVjaXNpb24gPiAwO1xuICAgICAgICB2YXIgc2lnbmlmaWNhbnREaWdpdHMgPSB1c2VTaWduaWZpY2FudERpZ2l0cyA/IHNldHRpbmdzLnByZWNpc2lvbiA6IDA7XG4gICAgICAgIHZhciBzaWduaWZpY2FudERpZ2l0c0NhY2hlID0gc2lnbmlmaWNhbnREaWdpdHM7XG5cbiAgICAgICAgdmFyIG1pblZhbHVlID0gc2V0dGluZ3MubWluVmFsdWU7XG4gICAgICAgIHZhciBpc01pblZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIG1heFZhbHVlID0gc2V0dGluZ3MubWF4VmFsdWU7XG4gICAgICAgIHZhciBpc01heFZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gZm9ybWF0TnVtYmVyIGZhbGxiYWNrIG9wdGlvbnMuXG4gICAgICAgIHZhciB1c2VUb0xvY2FsZVN0cmluZyA9IHNldHRpbmdzLnVzZVRvTG9jYWxlU3RyaW5nO1xuICAgICAgICB2YXIgZ3JvdXBpbmdTZXBhcmF0b3IgPSBzZXR0aW5ncy5ncm91cGluZ1NlcGFyYXRvcjtcbiAgICAgICAgdmFyIGRlY2ltYWxTZXBhcmF0b3IgPSBzZXR0aW5ncy5kZWNpbWFsU2VwYXJhdG9yO1xuICAgICAgICB2YXIgZ3JvdXBpbmcgPSBzZXR0aW5ncy5ncm91cGluZztcblxuICAgICAgICB1c2VUb0xvY2FsZVN0cmluZyA9IHVzZVRvTG9jYWxlU3RyaW5nICYmIHRvTG9jYWxlU3RyaW5nV29ya3M7XG5cbiAgICAgICAgLy8gVHJpbSBvcHRpb25zLlxuICAgICAgICB2YXIgdHJpbSA9IHNldHRpbmdzLnRyaW07XG5cbiAgICAgICAgaWYgKGlzQXJyYXkodHJpbSkpIHtcbiAgICAgICAgICAgIHRyaW0gPSB0cmltLmpvaW4oXCIgXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyaW0gPT09IG51bGwgJiYgKGxhcmdlc3QgfHwgbWF4VmFsdWUgfHwgdXNlU2lnbmlmaWNhbnREaWdpdHMpKSB7XG4gICAgICAgICAgICB0cmltID0gXCJhbGxcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0cmltID09PSBudWxsIHx8IHRyaW0gPT09IHRydWUgfHwgdHJpbSA9PT0gXCJsZWZ0XCIgfHwgdHJpbSA9PT0gXCJyaWdodFwiKSB7XG4gICAgICAgICAgICB0cmltID0gXCJsYXJnZVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyaW0gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0cmltID0gXCJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0cmltSW5jbHVkZXMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udGVzdCh0cmltKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgckxhcmdlID0gL2xhcmdlLztcbiAgICAgICAgdmFyIHJTbWFsbCA9IC9zbWFsbC87XG4gICAgICAgIHZhciByQm90aCA9IC9ib3RoLztcbiAgICAgICAgdmFyIHJNaWQgPSAvbWlkLztcbiAgICAgICAgdmFyIHJBbGwgPSAvXmFsbHxbXnNtXWFsbC87XG4gICAgICAgIHZhciByRmluYWwgPSAvZmluYWwvO1xuXG4gICAgICAgIHZhciB0cmltTGFyZ2UgPSBsYXJnZXN0ID4gMCB8fCBhbnkoW3JMYXJnZSwgckJvdGgsIHJBbGxdLCB0cmltSW5jbHVkZXMpO1xuICAgICAgICB2YXIgdHJpbVNtYWxsID0gYW55KFtyU21hbGwsIHJCb3RoLCByQWxsXSwgdHJpbUluY2x1ZGVzKTtcbiAgICAgICAgdmFyIHRyaW1NaWQgPSBhbnkoW3JNaWQsIHJBbGxdLCB0cmltSW5jbHVkZXMpO1xuICAgICAgICB2YXIgdHJpbUZpbmFsID0gYW55KFtyRmluYWwsIHJBbGxdLCB0cmltSW5jbHVkZXMpO1xuXG4gICAgICAgIC8vIFBhcnNlIGZvcm1hdCBzdHJpbmcgdG8gY3JlYXRlIHJhdyB0b2tlbnMgYXJyYXkuXG4gICAgICAgIHZhciByYXdUb2tlbnMgPSBtYXAodGVtcGxhdGUubWF0Y2godG9rZW5pemVyKSwgZnVuY3Rpb24gKHRva2VuLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIHR5cGUgPSB0eXBlTWFwKHRva2VuKTtcblxuICAgICAgICAgICAgaWYgKHRva2VuLnNsaWNlKDAsIDEpID09PSBcIipcIikge1xuICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW4uc2xpY2UoMSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gXCJlc2NhcGVcIiAmJiB0eXBlICE9PSBcImdlbmVyYWxcIikge1xuICAgICAgICAgICAgICAgICAgICBzdG9wVHJpbS5wdXNoKHR5cGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB0b2tlbi5sZW5ndGgsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJcIixcblxuICAgICAgICAgICAgICAgIC8vIFJlcGxhY2UgZXNjYXBlZCB0b2tlbnMgd2l0aCB0aGUgbm9uLWVzY2FwZWQgdG9rZW4gdGV4dC5cbiAgICAgICAgICAgICAgICB0b2tlbjogKHR5cGUgPT09IFwiZXNjYXBlXCIgPyB0b2tlbi5yZXBsYWNlKHRva2VuRGVmcy5lc2NhcGUsIFwiJDFcIikgOiB0b2tlbiksXG5cbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdHlwZSBvbiBub24tbW9tZW50IHRva2Vucy5cbiAgICAgICAgICAgICAgICB0eXBlOiAoKHR5cGUgPT09IFwiZXNjYXBlXCIgfHwgdHlwZSA9PT0gXCJnZW5lcmFsXCIpID8gbnVsbCA6IHR5cGUpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBBc3NvY2lhdGUgdGV4dCB0b2tlbnMgd2l0aCBtb21lbnQgdG9rZW5zLlxuICAgICAgICB2YXIgY3VycmVudFRva2VuID0ge1xuICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICBsZW5ndGg6IDAsXG4gICAgICAgICAgICB0b2tlbjogXCJcIixcbiAgICAgICAgICAgIHRleHQ6IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRva2VucyA9IFtdO1xuXG4gICAgICAgIGlmICh1c2VMZWZ0VW5pdHMpIHtcbiAgICAgICAgICAgIHJhd1Rva2Vucy5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBlYWNoKHJhd1Rva2VucywgZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSkge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VG9rZW4udHlwZSB8fCBjdXJyZW50VG9rZW4udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbnMucHVzaChjdXJyZW50VG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IHRva2VuO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodXNlTGVmdFVuaXRzKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRva2VuLnRleHQgPSB0b2tlbi50b2tlbiArIGN1cnJlbnRUb2tlbi50ZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VG9rZW4udGV4dCArPSB0b2tlbi50b2tlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRUb2tlbi50eXBlIHx8IGN1cnJlbnRUb2tlbi50ZXh0KSB7XG4gICAgICAgICAgICB0b2tlbnMucHVzaChjdXJyZW50VG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVzZUxlZnRVbml0cykge1xuICAgICAgICAgICAgdG9rZW5zLnJldmVyc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmQgdW5pcXVlIG1vbWVudCB0b2tlbiB0eXBlcyBpbiB0aGUgdGVtcGxhdGUgaW4gb3JkZXIgb2ZcbiAgICAgICAgLy8gZGVzY2VuZGluZyBtYWduaXR1ZGUuXG4gICAgICAgIHZhciBtb21lbnRUeXBlcyA9IGludGVyc2VjdGlvbih0eXBlcywgdW5pcXVlKGNvbXBhY3QocGx1Y2sodG9rZW5zLCBcInR5cGVcIikpKSk7XG5cbiAgICAgICAgLy8gRXhpdCBlYXJseSBpZiB0aGVyZSBhcmUgbm8gbW9tZW50IHRva2VuIHR5cGVzLlxuICAgICAgICBpZiAoIW1vbWVudFR5cGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHBsdWNrKHRva2VucywgXCJ0ZXh0XCIpLmpvaW4oXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYWxjdWxhdGUgdmFsdWVzIGZvciBlYWNoIG1vbWVudCB0eXBlIGluIHRoZSB0ZW1wbGF0ZS5cbiAgICAgICAgLy8gRm9yIHByb2Nlc3NpbmcgdGhlIHNldHRpbmdzLCB2YWx1ZXMgYXJlIGFzc29jaWF0ZWQgd2l0aCBtb21lbnQgdHlwZXMuXG4gICAgICAgIC8vIFZhbHVlcyB3aWxsIGJlIGFzc2lnbmVkIHRvIHRva2VucyBhdCB0aGUgbGFzdCBzdGVwIGluIG9yZGVyIHRvXG4gICAgICAgIC8vIGFzc3VtZSBub3RoaW5nIGFib3V0IGZyZXF1ZW5jeSBvciBvcmRlciBvZiB0b2tlbnMgaW4gdGhlIHRlbXBsYXRlLlxuICAgICAgICBtb21lbnRUeXBlcyA9IG1hcChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUsIGluZGV4KSB7XG4gICAgICAgICAgICAvLyBJcyB0aGlzIHRoZSBsZWFzdC1tYWduaXR1ZGUgbW9tZW50IHRva2VuIGZvdW5kP1xuICAgICAgICAgICAgdmFyIGlzU21hbGxlc3QgPSAoKGluZGV4ICsgMSkgPT09IG1vbWVudFR5cGVzLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIC8vIElzIHRoaXMgdGhlIGdyZWF0ZXN0LW1hZ25pdHVkZSBtb21lbnQgdG9rZW4gZm91bmQ/XG4gICAgICAgICAgICB2YXIgaXNMYXJnZXN0ID0gKCFpbmRleCk7XG5cbiAgICAgICAgICAgIC8vIEdldCB0aGUgcmF3IHZhbHVlIGluIHRoZSBjdXJyZW50IHVuaXRzLlxuICAgICAgICAgICAgdmFyIHJhd1ZhbHVlO1xuXG4gICAgICAgICAgICBpZiAobW9tZW50VHlwZSA9PT0gXCJ5ZWFyc1wiIHx8IG1vbWVudFR5cGUgPT09IFwibW9udGhzXCIpIHtcbiAgICAgICAgICAgICAgICByYXdWYWx1ZSA9IHJlbWFpbmRlck1vbnRocy5hcyhtb21lbnRUeXBlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmF3VmFsdWUgPSByZW1haW5kZXIuYXMobW9tZW50VHlwZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB3aG9sZVZhbHVlID0gTWF0aC5mbG9vcihyYXdWYWx1ZSk7XG4gICAgICAgICAgICB2YXIgZGVjaW1hbFZhbHVlID0gcmF3VmFsdWUgLSB3aG9sZVZhbHVlO1xuXG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBmaW5kKHRva2VucywgZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGUgPT09IHRva2VuLnR5cGU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGlzTGFyZ2VzdCAmJiBtYXhWYWx1ZSAmJiByYXdWYWx1ZSA+IG1heFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaXNNYXhWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc1NtYWxsZXN0ICYmIG1pblZhbHVlICYmIE1hdGguYWJzKHNldHRpbmdzLmR1cmF0aW9uLmFzKG1vbWVudFR5cGUpKSA8IG1pblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaXNNaW5WYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE5vdGUgdGhlIGxlbmd0aCBvZiB0aGUgbGFyZ2VzdC1tYWduaXR1ZGUgbW9tZW50IHRva2VuOlxuICAgICAgICAgICAgLy8gaWYgaXQgaXMgZ3JlYXRlciB0aGFuIG9uZSBhbmQgZm9yY2VMZW5ndGggaXMgbm90IHNldCxcbiAgICAgICAgICAgIC8vIHRoZW4gZGVmYXVsdCBmb3JjZUxlbmd0aCB0byBgdHJ1ZWAuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gUmF0aW9uYWxlIGlzIHRoaXM6IElmIHRoZSB0ZW1wbGF0ZSBpcyBcImg6bW06c3NcIiBhbmQgdGhlXG4gICAgICAgICAgICAvLyBtb21lbnQgdmFsdWUgaXMgNSBtaW51dGVzLCB0aGUgdXNlci1mcmllbmRseSBvdXRwdXQgaXNcbiAgICAgICAgICAgIC8vIFwiNTowMFwiLCBub3QgXCIwNTowMFwiLiBXZSBzaG91bGRuJ3QgcGFkIHRoZSBgbWludXRlc2AgdG9rZW5cbiAgICAgICAgICAgIC8vIGV2ZW4gdGhvdWdoIGl0IGhhcyBsZW5ndGggb2YgdHdvIGlmIHRoZSB0ZW1wbGF0ZSBpcyBcImg6bW06c3NcIjtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBJZiB0aGUgbWludXRlcyBvdXRwdXQgc2hvdWxkIGFsd2F5cyBpbmNsdWRlIHRoZSBsZWFkaW5nIHplcm9cbiAgICAgICAgICAgIC8vIGV2ZW4gd2hlbiB0aGUgaG91ciBpcyB0cmltbWVkIHRoZW4gc2V0IGB7IGZvcmNlTGVuZ3RoOiB0cnVlIH1gXG4gICAgICAgICAgICAvLyB0byBvdXRwdXQgXCIwNTowMFwiLiBJZiB0aGUgdGVtcGxhdGUgaXMgXCJoaDptbTpzc1wiLCB0aGUgdXNlclxuICAgICAgICAgICAgLy8gY2xlYXJseSB3YW50ZWQgZXZlcnl0aGluZyBwYWRkZWQgc28gd2Ugc2hvdWxkIG91dHB1dCBcIjA1OjAwXCI7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgd2FudHMgdGhlIGZ1bGwgcGFkZGVkIG91dHB1dCwgdGhleSBjYW4gdXNlXG4gICAgICAgICAgICAvLyB0ZW1wbGF0ZSBcImhoOm1tOnNzXCIgYW5kIHNldCBgeyB0cmltOiBmYWxzZSB9YCB0byBvdXRwdXRcbiAgICAgICAgICAgIC8vIFwiMDA6MDU6MDBcIi5cbiAgICAgICAgICAgIGlmIChpc0xhcmdlc3QgJiYgZm9yY2VMZW5ndGggPT09IG51bGwgJiYgdG9rZW4ubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGZvcmNlTGVuZ3RoID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXBkYXRlIHJlbWFpbmRlci5cbiAgICAgICAgICAgIHJlbWFpbmRlci5zdWJ0cmFjdCh3aG9sZVZhbHVlLCBtb21lbnRUeXBlKTtcbiAgICAgICAgICAgIHJlbWFpbmRlck1vbnRocy5zdWJ0cmFjdCh3aG9sZVZhbHVlLCBtb21lbnRUeXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYXdWYWx1ZTogcmF3VmFsdWUsXG4gICAgICAgICAgICAgICAgd2hvbGVWYWx1ZTogd2hvbGVWYWx1ZSxcbiAgICAgICAgICAgICAgICAvLyBEZWNpbWFsIHZhbHVlIGlzIG9ubHkgcmV0YWluZWQgZm9yIHRoZSBsZWFzdC1tYWduaXR1ZGVcbiAgICAgICAgICAgICAgICAvLyBtb21lbnQgdHlwZSBpbiB0aGUgZm9ybWF0IHRlbXBsYXRlLlxuICAgICAgICAgICAgICAgIGRlY2ltYWxWYWx1ZTogaXNTbWFsbGVzdCA/IGRlY2ltYWxWYWx1ZSA6IDAsXG4gICAgICAgICAgICAgICAgaXNTbWFsbGVzdDogaXNTbWFsbGVzdCxcbiAgICAgICAgICAgICAgICBpc0xhcmdlc3Q6IGlzTGFyZ2VzdCxcbiAgICAgICAgICAgICAgICB0eXBlOiBtb21lbnRUeXBlLFxuICAgICAgICAgICAgICAgIC8vIFRva2VucyBjYW4gYXBwZWFyIG11bHRpcGxlIHRpbWVzIGluIGEgdGVtcGxhdGUgc3RyaW5nLFxuICAgICAgICAgICAgICAgIC8vIGJ1dCBhbGwgaW5zdGFuY2VzIG11c3Qgc2hhcmUgdGhlIHNhbWUgbGVuZ3RoLlxuICAgICAgICAgICAgICAgIHRva2VuTGVuZ3RoOiB0b2tlbi5sZW5ndGhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciB0cnVuY01ldGhvZCA9IHRydW5jID8gTWF0aC5mbG9vciA6IE1hdGgucm91bmQ7XG4gICAgICAgIHZhciB0cnVuY2F0ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgcGxhY2VzKSB7XG4gICAgICAgICAgICB2YXIgZmFjdG9yID0gTWF0aC5wb3coMTAsIHBsYWNlcyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1bmNNZXRob2QodmFsdWUgKiBmYWN0b3IpIC8gZmFjdG9yO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBmb3VuZEZpcnN0ID0gZmFsc2U7XG4gICAgICAgIHZhciBidWJibGVkID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGZvcm1hdFZhbHVlID0gZnVuY3Rpb24gKG1vbWVudFR5cGUsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgZm9ybWF0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdXNlR3JvdXBpbmcsXG4gICAgICAgICAgICAgICAgZ3JvdXBpbmdTZXBhcmF0b3I6IGdyb3VwaW5nU2VwYXJhdG9yLFxuICAgICAgICAgICAgICAgIGRlY2ltYWxTZXBhcmF0b3I6IGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgICAgICAgICAgZ3JvdXBpbmc6IGdyb3VwaW5nLFxuICAgICAgICAgICAgICAgIHVzZVRvTG9jYWxlU3RyaW5nOiB1c2VUb0xvY2FsZVN0cmluZ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHVzZVNpZ25pZmljYW50RGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNpZ25pZmljYW50RGlnaXRzIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS5yYXdWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUud2hvbGVWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXRPcHRpb25zLm1heGltdW1TaWduaWZpY2FudERpZ2l0cyA9IHNpZ25pZmljYW50RGlnaXRzO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnNpZ25pZmljYW50RGlnaXRzID0gc2lnbmlmaWNhbnREaWdpdHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNNYXhWYWx1ZSAmJiAhYnViYmxlZCkge1xuICAgICAgICAgICAgICAgIGlmIChtb21lbnRUeXBlLmlzTGFyZ2VzdCkge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLndob2xlVmFsdWUgPSBtYXhWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS5kZWNpbWFsVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUud2hvbGVWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc01pblZhbHVlICYmICFidWJibGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudFR5cGUuaXNTbWFsbGVzdCkge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLndob2xlVmFsdWUgPSBtaW5WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS5kZWNpbWFsVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUud2hvbGVWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtb21lbnRUeXBlLmlzU21hbGxlc3QgfHwgbW9tZW50VHlwZS5zaWduaWZpY2FudERpZ2l0cyAmJiBtb21lbnRUeXBlLnNpZ25pZmljYW50RGlnaXRzIC0gbW9tZW50VHlwZS53aG9sZVZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgICAgICAvLyBBcHBseSBwcmVjaXNpb24gdG8gbGVhc3Qgc2lnbmlmaWNhbnQgdG9rZW4gdmFsdWUuXG4gICAgICAgICAgICAgICAgaWYgKHByZWNpc2lvbiA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IHRydW5jYXRlKG1vbWVudFR5cGUud2hvbGVWYWx1ZSwgcHJlY2lzaW9uKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByZWNpc2lvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnZhbHVlID0gdHJ1bmNNZXRob2QobW9tZW50VHlwZS53aG9sZVZhbHVlICsgbW9tZW50VHlwZS5kZWNpbWFsVmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIHByZWNpc2lvbiA+IDBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZVNpZ25pZmljYW50RGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnZhbHVlID0gdHJ1bmNhdGUobW9tZW50VHlwZS5yYXdWYWx1ZSwgc2lnbmlmaWNhbnREaWdpdHMgLSBtb21lbnRUeXBlLndob2xlVmFsdWUudG9TdHJpbmcoKS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnZhbHVlID0gbW9tZW50VHlwZS5yYXdWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbWVudFR5cGUud2hvbGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25pZmljYW50RGlnaXRzIC09IG1vbWVudFR5cGUud2hvbGVWYWx1ZS50b1N0cmluZygpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdE9wdGlvbnMuZnJhY3Rpb25EaWdpdHMgPSBwcmVjaXNpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnVuYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSBtb21lbnRUeXBlLndob2xlVmFsdWUgKyB0cnVuY2F0ZShtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSwgcHJlY2lzaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IG1vbWVudFR5cGUud2hvbGVWYWx1ZSArIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlU2lnbmlmaWNhbnREaWdpdHMgJiYgbW9tZW50VHlwZS53aG9sZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE91dGVyIE1hdGgucm91bmQgcmVxdWlyZWQgaGVyZSB0byBoYW5kbGUgZmxvYXRpbmcgcG9pbnQgZXJyb3JzLlxuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnZhbHVlID0gTWF0aC5yb3VuZCh0cnVuY2F0ZShtb21lbnRUeXBlLndob2xlVmFsdWUsIG1vbWVudFR5cGUuc2lnbmlmaWNhbnREaWdpdHMgLSBtb21lbnRUeXBlLndob2xlVmFsdWUudG9TdHJpbmcoKS5sZW5ndGgpKTtcblxuICAgICAgICAgICAgICAgICAgICBzaWduaWZpY2FudERpZ2l0cyAtPSBtb21lbnRUeXBlLndob2xlVmFsdWUudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IG1vbWVudFR5cGUud2hvbGVWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtb21lbnRUeXBlLnRva2VuTGVuZ3RoID4gMSAmJiAoZm9yY2VMZW5ndGggfHwgZm91bmRGaXJzdCkpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXRPcHRpb25zLm1pbmltdW1JbnRlZ2VyRGlnaXRzID0gbW9tZW50VHlwZS50b2tlbkxlbmd0aDtcblxuICAgICAgICAgICAgICAgIGlmIChidWJibGVkICYmIGZvcm1hdE9wdGlvbnMubWF4aW11bVNpZ25pZmljYW50RGlnaXRzIDwgbW9tZW50VHlwZS50b2tlbkxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZm9ybWF0T3B0aW9ucy5tYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWZvdW5kRmlyc3QgJiYgKG1vbWVudFR5cGUudmFsdWUgPiAwIHx8IHRyaW0gPT09IFwiXCIgLyogdHJpbTogZmFsc2UgKi8gfHwgZmluZChzdG9wVHJpbSwgbW9tZW50VHlwZS50eXBlKSB8fCBmaW5kKG91dHB1dFR5cGVzLCBtb21lbnRUeXBlLnR5cGUpKSkge1xuICAgICAgICAgICAgICAgIGZvdW5kRmlyc3QgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlID0gZm9ybWF0TnVtYmVyKG1vbWVudFR5cGUudmFsdWUsIGZvcm1hdE9wdGlvbnMsIHVzZXJMb2NhbGUpO1xuXG4gICAgICAgICAgICBmb3JtYXRPcHRpb25zLnVzZUdyb3VwaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBmb3JtYXRPcHRpb25zLmRlY2ltYWxTZXBhcmF0b3IgPSBcIi5cIjtcbiAgICAgICAgICAgIG1vbWVudFR5cGUuZm9ybWF0dGVkVmFsdWVFbiA9IGZvcm1hdE51bWJlcihtb21lbnRUeXBlLnZhbHVlLCBmb3JtYXRPcHRpb25zLCBcImVuXCIpO1xuXG4gICAgICAgICAgICBpZiAobW9tZW50VHlwZS50b2tlbkxlbmd0aCA9PT0gMiAmJiBtb21lbnRUeXBlLnR5cGUgPT09IFwibWlsbGlzZWNvbmRzXCIpIHtcbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlTVMgPSBmb3JtYXROdW1iZXIobW9tZW50VHlwZS52YWx1ZSwge1xuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogMyxcbiAgICAgICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSwgXCJlblwiKS5zbGljZSgwLCAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIGZvcm1hdHRlZCB2YWx1ZXMuXG4gICAgICAgIG1vbWVudFR5cGVzID0gbWFwKG1vbWVudFR5cGVzLCBmb3JtYXRWYWx1ZSk7XG4gICAgICAgIG1vbWVudFR5cGVzID0gY29tcGFjdChtb21lbnRUeXBlcyk7XG5cbiAgICAgICAgLy8gQnViYmxlIHJvdW5kZWQgdmFsdWVzLlxuICAgICAgICBpZiAobW9tZW50VHlwZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdmFyIGZpbmRUeXBlID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluZChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGUudHlwZSA9PT0gdHlwZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBidWJibGVUeXBlcyA9IGZ1bmN0aW9uIChidWJibGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYnViYmxlTW9tZW50VHlwZSA9IGZpbmRUeXBlKGJ1YmJsZS50eXBlKTtcblxuICAgICAgICAgICAgICAgIGlmICghYnViYmxlTW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWFjaChidWJibGUudGFyZ2V0cywgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0TW9tZW50VHlwZSA9IGZpbmRUeXBlKHRhcmdldC50eXBlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRhcmdldE1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChidWJibGVNb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlRW4sIDEwKSA9PT0gdGFyZ2V0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVNb21lbnRUeXBlLnJhd1ZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZU1vbWVudFR5cGUud2hvbGVWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVNb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNb21lbnRUeXBlLnJhd1ZhbHVlICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNb21lbnRUeXBlLndob2xlVmFsdWUgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1vbWVudFR5cGUuZm9ybWF0dGVkVmFsdWVFbiA9IHRhcmdldE1vbWVudFR5cGUud2hvbGVWYWx1ZS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGVhY2goYnViYmxlcywgYnViYmxlVHlwZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVjYWxjdWxhdGUgZm9ybWF0dGVkIHZhbHVlcy5cbiAgICAgICAgaWYgKGJ1YmJsZWQpIHtcbiAgICAgICAgICAgIGZvdW5kRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgIHNpZ25pZmljYW50RGlnaXRzID0gc2lnbmlmaWNhbnREaWdpdHNDYWNoZTtcbiAgICAgICAgICAgIG1vbWVudFR5cGVzID0gbWFwKG1vbWVudFR5cGVzLCBmb3JtYXRWYWx1ZSk7XG4gICAgICAgICAgICBtb21lbnRUeXBlcyA9IGNvbXBhY3QobW9tZW50VHlwZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG91dHB1dFR5cGVzICYmICEoaXNNYXhWYWx1ZSAmJiAhc2V0dGluZ3MudHJpbSkpIHtcbiAgICAgICAgICAgIG1vbWVudFR5cGVzID0gbWFwKG1vbWVudFR5cGVzLCBmdW5jdGlvbiAobW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgIGlmIChmaW5kKG91dHB1dFR5cGVzLCBmdW5jdGlvbiAob3V0cHV0VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZS50eXBlID09PSBvdXRwdXRUeXBlO1xuICAgICAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1vbWVudFR5cGVzID0gY29tcGFjdChtb21lbnRUeXBlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUcmltIExhcmdlLlxuICAgICAgICAgICAgaWYgKHRyaW1MYXJnZSkge1xuICAgICAgICAgICAgICAgIG1vbWVudFR5cGVzID0gcmVzdChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU3RvcCB0cmltbWluZyBvbjpcbiAgICAgICAgICAgICAgICAgICAgLy8gLSB0aGUgc21hbGxlc3QgbW9tZW50IHR5cGVcbiAgICAgICAgICAgICAgICAgICAgLy8gLSBhIHR5cGUgbWFya2VkIGZvciBzdG9wVHJpbVxuICAgICAgICAgICAgICAgICAgICAvLyAtIGEgdHlwZSB0aGF0IGhhcyBhIHdob2xlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhbW9tZW50VHlwZS5pc1NtYWxsZXN0ICYmICFtb21lbnRUeXBlLndob2xlVmFsdWUgJiYgIWZpbmQoc3RvcFRyaW0sIG1vbWVudFR5cGUudHlwZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExhcmdlc3QuXG4gICAgICAgICAgICBpZiAobGFyZ2VzdCAmJiBtb21lbnRUeXBlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlcyA9IG1vbWVudFR5cGVzLnNsaWNlKDAsIGxhcmdlc3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUcmltIFNtYWxsLlxuICAgICAgICAgICAgaWYgKHRyaW1TbWFsbCAmJiBtb21lbnRUeXBlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBpbml0aWFsKG1vbWVudFR5cGVzLCBmdW5jdGlvbiAobW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTdG9wIHRyaW1taW5nIG9uOlxuICAgICAgICAgICAgICAgICAgICAvLyAtIGEgdHlwZSBtYXJrZWQgZm9yIHN0b3BUcmltXG4gICAgICAgICAgICAgICAgICAgIC8vIC0gYSB0eXBlIHRoYXQgaGFzIGEgd2hvbGUgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgLy8gLSB0aGUgbGFyZ2VzdCBtb21lbnRUeXBlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhbW9tZW50VHlwZS53aG9sZVZhbHVlICYmICFmaW5kKHN0b3BUcmltLCBtb21lbnRUeXBlLnR5cGUpICYmICFtb21lbnRUeXBlLmlzTGFyZ2VzdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVHJpbSBNaWQuXG4gICAgICAgICAgICBpZiAodHJpbU1pZCkge1xuICAgICAgICAgICAgICAgIG1vbWVudFR5cGVzID0gbWFwKG1vbWVudFR5cGVzLCBmdW5jdGlvbiAobW9tZW50VHlwZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gMCAmJiBpbmRleCA8IG1vbWVudFR5cGVzLmxlbmd0aCAtIDEgJiYgIW1vbWVudFR5cGUud2hvbGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1vbWVudFR5cGVzID0gY29tcGFjdChtb21lbnRUeXBlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRyaW0gRmluYWwuXG4gICAgICAgICAgICBpZiAodHJpbUZpbmFsICYmIG1vbWVudFR5cGVzLmxlbmd0aCA9PT0gMSAmJiAhbW9tZW50VHlwZXNbMF0ud2hvbGVWYWx1ZSAmJiAhKCF0cnVuYyAmJiBtb21lbnRUeXBlc1swXS5pc1NtYWxsZXN0ICYmIG1vbWVudFR5cGVzWzBdLnJhd1ZhbHVlIDwgbWluVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXR1cm5Nb21lbnRUeXBlcykge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGVzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTG9jYWxpemUgYW5kIHBsdXJhbGl6ZSB1bml0IGxhYmVscy5cbiAgICAgICAgZWFjaCh0b2tlbnMsIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgdmFyIGtleSA9IG1vbWVudFRva2Vuc1t0b2tlbi50eXBlXTtcblxuICAgICAgICAgICAgdmFyIG1vbWVudFR5cGUgPSBmaW5kKG1vbWVudFR5cGVzLCBmdW5jdGlvbiAobW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlLnR5cGUgPT09IHRva2VuLnR5cGU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFrZXkgfHwgIW1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlRW4uc3BsaXQoXCIuXCIpO1xuXG4gICAgICAgICAgICB2YWx1ZXNbMF0gPSBwYXJzZUludCh2YWx1ZXNbMF0sIDEwKTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlc1sxXSkge1xuICAgICAgICAgICAgICAgIHZhbHVlc1sxXSA9IHBhcnNlRmxvYXQoXCIwLlwiICsgdmFsdWVzWzFdLCAxMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlc1sxXSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwbHVyYWxLZXkgPSBsb2NhbGVEYXRhLmR1cmF0aW9uUGx1cmFsS2V5KGtleSwgdmFsdWVzWzBdLCB2YWx1ZXNbMV0pO1xuXG4gICAgICAgICAgICB2YXIgbGFiZWxzID0gZHVyYXRpb25HZXRMYWJlbHMoa2V5LCBsb2NhbGVEYXRhKTtcblxuICAgICAgICAgICAgdmFyIGF1dG9Mb2NhbGl6ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgdmFyIHBsdXJhbGl6ZWRMYWJlbHMgPSB7fTtcblxuICAgICAgICAgICAgLy8gQXV0by1Mb2NhbGl6ZWQgdW5pdCBsYWJlbHMuXG4gICAgICAgICAgICBlYWNoKGxvY2FsZURhdGEuX2R1cmF0aW9uTGFiZWxUeXBlcywgZnVuY3Rpb24gKGxhYmVsVHlwZSkge1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IGZpbmQobGFiZWxzLCBmdW5jdGlvbiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhYmVsLnR5cGUgPT09IGxhYmVsVHlwZS50eXBlICYmIGxhYmVsLmtleSA9PT0gcGx1cmFsS2V5O1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsdXJhbGl6ZWRMYWJlbHNbbGFiZWwudHlwZV0gPSBsYWJlbC5sYWJlbDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaW5nSW5jbHVkZXModG9rZW4udGV4dCwgbGFiZWxUeXBlLnN0cmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuLnRleHQgPSB0b2tlbi50ZXh0LnJlcGxhY2UobGFiZWxUeXBlLnN0cmluZywgbGFiZWwubGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0xvY2FsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQXV0by1wbHVyYWxpemVkIHVuaXQgbGFiZWxzLlxuICAgICAgICAgICAgaWYgKHVzZVBsdXJhbCAmJiAhYXV0b0xvY2FsaXplZCkge1xuICAgICAgICAgICAgICAgIGxhYmVscy5zb3J0KGR1cmF0aW9uTGFiZWxDb21wYXJlKTtcblxuICAgICAgICAgICAgICAgIGVhY2gobGFiZWxzLCBmdW5jdGlvbiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsdXJhbGl6ZWRMYWJlbHNbbGFiZWwudHlwZV0gPT09IGxhYmVsLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaW5nSW5jbHVkZXModG9rZW4udGV4dCwgbGFiZWwubGFiZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RvcCBjaGVja2luZyB0aGlzIHRva2VuIGlmIGl0cyBsYWJlbCBpcyBhbHJlYWR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29ycmVjdGx5IHBsdXJhbGl6ZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIHRoaXMgbGFiZWwgaWYgaXQgaXMgY29ycmVjdCwgYnV0IG5vdCBwcmVzZW50IGluXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgdG9rZW4ncyB0ZXh0LlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZ0luY2x1ZGVzKHRva2VuLnRleHQsIGxhYmVsLmxhYmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVwbGVjZSB0aGlzIHRva2VuJ3MgbGFiZWwgYW5kIHN0b3AgY2hlY2tpbmcuXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi50ZXh0ID0gdG9rZW4udGV4dC5yZXBsYWNlKGxhYmVsLmxhYmVsLCBwbHVyYWxpemVkTGFiZWxzW2xhYmVsLnR5cGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBCdWlsZCBvdXB0dXQuXG4gICAgICAgIHRva2VucyA9IG1hcCh0b2tlbnMsIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgaWYgKCF0b2tlbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuLnRleHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtb21lbnRUeXBlID0gZmluZChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZS50eXBlID09PSB0b2tlbi50eXBlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghbW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgb3V0ID0gXCJcIjtcblxuICAgICAgICAgICAgaWYgKHVzZUxlZnRVbml0cykge1xuICAgICAgICAgICAgICAgIG91dCArPSB0b2tlbi50ZXh0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNOZWdhdGl2ZSAmJiBpc01heFZhbHVlIHx8ICFpc05lZ2F0aXZlICYmIGlzTWluVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gXCI8IFwiO1xuICAgICAgICAgICAgICAgIGlzTWF4VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpc01pblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc05lZ2F0aXZlICYmIGlzTWluVmFsdWUgfHwgIWlzTmVnYXRpdmUgJiYgaXNNYXhWYWx1ZSkge1xuICAgICAgICAgICAgICAgIG91dCArPSBcIj4gXCI7XG4gICAgICAgICAgICAgICAgaXNNYXhWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlzTWluVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzTmVnYXRpdmUgJiYgKG1vbWVudFR5cGUudmFsdWUgPiAwIHx8IHRyaW0gPT09IFwiXCIgfHwgZmluZChzdG9wVHJpbSwgbW9tZW50VHlwZS50eXBlKSB8fCBmaW5kKG91dHB1dFR5cGVzLCBtb21lbnRUeXBlLnR5cGUpKSkge1xuICAgICAgICAgICAgICAgIG91dCArPSBcIi1cIjtcbiAgICAgICAgICAgICAgICBpc05lZ2F0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0b2tlbi50eXBlID09PSBcIm1pbGxpc2Vjb25kc1wiICYmIG1vbWVudFR5cGUuZm9ybWF0dGVkVmFsdWVNUykge1xuICAgICAgICAgICAgICAgIG91dCArPSBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlTVM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG91dCArPSBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXVzZUxlZnRVbml0cykge1xuICAgICAgICAgICAgICAgIG91dCArPSB0b2tlbi50ZXh0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBUcmltIGxlYWRpbmcgYW5kIHRyYWlsaW5nIGNvbW1hLCBzcGFjZSwgY29sb24sIGFuZCBkb3QuXG4gICAgICAgIHJldHVybiB0b2tlbnMuam9pbihcIlwiKS5yZXBsYWNlKC8oLHwgfDp8XFwuKSokLywgXCJcIikucmVwbGFjZSgvXigsfCB8OnxcXC4pKi8sIFwiXCIpO1xuICAgIH1cblxuICAgIC8vIGRlZmF1bHRGb3JtYXRUZW1wbGF0ZVxuICAgIGZ1bmN0aW9uIGRlZmF1bHRGb3JtYXRUZW1wbGF0ZSgpIHtcbiAgICAgICAgdmFyIGR1ciA9IHRoaXMuZHVyYXRpb247XG5cbiAgICAgICAgdmFyIGZpbmRUeXBlID0gZnVuY3Rpb24gZmluZFR5cGUodHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIGR1ci5fZGF0YVt0eXBlXTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZmlyc3RUeXBlID0gZmluZCh0aGlzLnR5cGVzLCBmaW5kVHlwZSk7XG5cbiAgICAgICAgdmFyIGxhc3RUeXBlID0gZmluZExhc3QodGhpcy50eXBlcywgZmluZFR5cGUpO1xuXG4gICAgICAgIC8vIERlZmF1bHQgdGVtcGxhdGUgc3RyaW5ncyBmb3IgZWFjaCBkdXJhdGlvbiBkaW1lbnNpb24gdHlwZS5cbiAgICAgICAgc3dpdGNoIChmaXJzdFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJtaWxsaXNlY29uZHNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJTIF9fXCI7XG4gICAgICAgICAgICBjYXNlIFwic2Vjb25kc1wiOiAvLyBGYWxsdGhyb3VnaC5cbiAgICAgICAgICAgIGNhc2UgXCJtaW51dGVzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiKl9NU19cIjtcbiAgICAgICAgICAgIGNhc2UgXCJob3Vyc1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIl9ITVNfXCI7XG4gICAgICAgICAgICBjYXNlIFwiZGF5c1wiOiAvLyBQb3NzaWJsZSBGYWxsdGhyb3VnaC5cbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RUeXBlID09PSBsYXN0VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJkIF9fXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcIndlZWtzXCI6XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0VHlwZSA9PT0gbGFzdFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidyBfX1wiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmltID0gXCJib3RoXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidyBfXywgZCBfXywgaCBfX1wiO1xuICAgICAgICAgICAgY2FzZSBcIm1vbnRoc1wiOiAvLyBQb3NzaWJsZSBGYWxsdGhyb3VnaC5cbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RUeXBlID09PSBsYXN0VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJNIF9fXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcInllYXJzXCI6XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0VHlwZSA9PT0gbGFzdFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwieSBfX1wiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmltID0gXCJib3RoXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwieSBfXywgTSBfXywgZCBfX1wiO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmltID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpbSA9IFwiYm90aFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBcInkgX18sIGQgX18sIGggX18sIG0gX18sIHMgX19cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGluaXRcbiAgICBmdW5jdGlvbiBpbml0KGNvbnRleHQpIHtcbiAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgICB0aHJvdyBcIk1vbWVudCBEdXJhdGlvbiBGb3JtYXQgaW5pdCBjYW5ub3QgZmluZCBtb21lbnQgaW5zdGFuY2UuXCI7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LmR1cmF0aW9uLmZvcm1hdCA9IGR1cmF0aW9uc0Zvcm1hdDtcbiAgICAgICAgY29udGV4dC5kdXJhdGlvbi5mbi5mb3JtYXQgPSBkdXJhdGlvbkZvcm1hdDtcblxuICAgICAgICBjb250ZXh0LmR1cmF0aW9uLmZuLmZvcm1hdC5kZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIC8vIE1hbnkgb3B0aW9ucyBhcmUgZGVmYXVsdGVkIHRvIGBudWxsYCB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuXG4gICAgICAgICAgICAvLyAnbm90IHNldCcgYW5kICdzZXQgdG8gYGZhbHNlYCdcblxuICAgICAgICAgICAgLy8gdHJpbVxuICAgICAgICAgICAgLy8gQ2FuIGJlIGEgc3RyaW5nLCBhIGRlbGltaXRlZCBsaXN0IG9mIHN0cmluZ3MsIGFuIGFycmF5IG9mIHN0cmluZ3MsXG4gICAgICAgICAgICAvLyBvciBhIGJvb2xlYW4uXG4gICAgICAgICAgICAvLyBcImxhcmdlXCIgLSB3aWxsIHRyaW0gbGFyZ2VzdC1tYWduaXR1ZGUgemVyby12YWx1ZSB0b2tlbnMgdW50aWxcbiAgICAgICAgICAgIC8vIGZpbmRpbmcgYSB0b2tlbiB3aXRoIGEgdmFsdWUsIGEgdG9rZW4gaWRlbnRpZmllZCBhcyAnc3RvcFRyaW0nLCBvclxuICAgICAgICAgICAgLy8gdGhlIGZpbmFsIHRva2VuIG9mIHRoZSBmb3JtYXQgc3RyaW5nLlxuICAgICAgICAgICAgLy8gXCJzbWFsbFwiIC0gd2lsbCB0cmltIHNtYWxsZXN0LW1hZ25pdHVkZSB6ZXJvLXZhbHVlIHRva2VucyB1bnRpbFxuICAgICAgICAgICAgLy8gZmluZGluZyBhIHRva2VuIHdpdGggYSB2YWx1ZSwgYSB0b2tlbiBpZGVudGlmaWVkIGFzICdzdG9wVHJpbScsIG9yXG4gICAgICAgICAgICAvLyB0aGUgZmluYWwgdG9rZW4gb2YgdGhlIGZvcm1hdCBzdHJpbmcuXG4gICAgICAgICAgICAvLyBcImJvdGhcIiAtIHdpbGwgZXhlY3V0ZSBcImxhcmdlXCIgdHJpbSB0aGVuIFwic21hbGxcIiB0cmltLlxuICAgICAgICAgICAgLy8gXCJtaWRcIiAtIHdpbGwgdHJpbSBhbnkgemVyby12YWx1ZSB0b2tlbnMgdGhhdCBhcmUgbm90IHRoZSBmaXJzdCBvclxuICAgICAgICAgICAgLy8gbGFzdCB0b2tlbnMuIFVzdWFsbHkgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIFwibGFyZ2VcIiBvciBcImJvdGhcIi5cbiAgICAgICAgICAgIC8vIGUuZy4gXCJsYXJnZSBtaWRcIiBvciBcImJvdGggbWlkXCIuXG4gICAgICAgICAgICAvLyBcImZpbmFsXCIgLSB3aWxsIHRyaW0gdGhlIGZpbmFsIHRva2VuIGlmIGl0IGlzIHplcm8tdmFsdWUuIFVzZSB0aGlzXG4gICAgICAgICAgICAvLyBvcHRpb24gd2l0aCBcImxhcmdlXCIgb3IgXCJib3RoXCIgdG8gb3V0cHV0IGFuIGVtcHR5IHN0cmluZyB3aGVuXG4gICAgICAgICAgICAvLyBmb3JtYXR0aW5nIGEgemVyby12YWx1ZSBkdXJhdGlvbi4gZS5nLiBcImxhcmdlIGZpbmFsXCIgb3IgXCJib3RoIGZpbmFsXCIuXG4gICAgICAgICAgICAvLyBcImFsbFwiIC0gV2lsbCB0cmltIGFsbCB6ZXJvLXZhbHVlIHRva2Vucy4gU2hvcnRoYW5kIGZvciBcImJvdGggbWlkIGZpbmFsXCIuXG4gICAgICAgICAgICAvLyBcImxlZnRcIiAtIG1hcHMgdG8gXCJsYXJnZVwiIHRvIHN1cHBvcnQgcGx1Z2luJ3MgdmVyc2lvbiAxIEFQSS5cbiAgICAgICAgICAgIC8vIFwicmlnaHRcIiAtIG1hcHMgdG8gXCJsYXJnZVwiIHRvIHN1cHBvcnQgcGx1Z2luJ3MgdmVyc2lvbiAxIEFQSS5cbiAgICAgICAgICAgIC8vIGBmYWxzZWAgLSB0ZW1wbGF0ZSB0b2tlbnMgYXJlIG5vdCB0cmltbWVkLlxuICAgICAgICAgICAgLy8gYHRydWVgIC0gdHJlYXRlZCBhcyBcImxhcmdlXCIuXG4gICAgICAgICAgICAvLyBgbnVsbGAgLSB0cmVhdGVkIGFzIFwibGFyZ2VcIi5cbiAgICAgICAgICAgIHRyaW06IG51bGwsXG5cbiAgICAgICAgICAgIC8vIHN0b3BUcmltXG4gICAgICAgICAgICAvLyBBIG1vbWVudCB0b2tlbiBzdHJpbmcsIGEgZGVsaW1pdGVkIHNldCBvZiBtb21lbnQgdG9rZW4gc3RyaW5ncyxcbiAgICAgICAgICAgIC8vIG9yIGFuIGFycmF5IG9mIG1vbWVudCB0b2tlbiBzdHJpbmdzLiBUcmltbWluZyB3aWxsIHN0b3Agd2hlbiBhIHRva2VuXG4gICAgICAgICAgICAvLyBsaXN0ZWQgaW4gdGhpcyBvcHRpb24gaXMgcmVhY2hlZC4gQSBcIipcIiBjaGFyYWN0ZXIgaW4gdGhlIGZvcm1hdFxuICAgICAgICAgICAgLy8gdGVtcGxhdGUgc3RyaW5nIHdpbGwgYWxzbyBtYXJrIGEgbW9tZW50IHRva2VuIGFzIHN0b3BUcmltLlxuICAgICAgICAgICAgLy8gZS5nLiBcImQgW2RheXNdICpoOm1tOnNzXCIgd2lsbCBhbHdheXMgc3RvcCB0cmltbWluZyBhdCB0aGUgJ2hvdXJzJyB0b2tlbi5cbiAgICAgICAgICAgIHN0b3BUcmltOiBudWxsLFxuXG4gICAgICAgICAgICAvLyBsYXJnZXN0XG4gICAgICAgICAgICAvLyBTZXQgdG8gYSBwb3NpdGl2ZSBpbnRlZ2VyIHRvIG91dHB1dCBvbmx5IHRoZSBcIm5cIiBsYXJnZXN0LW1hZ25pdHVkZVxuICAgICAgICAgICAgLy8gbW9tZW50IHRva2VucyB0aGF0IGhhdmUgYSB2YWx1ZS4gQWxsIGxlc3Nlci1tYWduaXR1ZGUgbW9tZW50IHRva2Vuc1xuICAgICAgICAgICAgLy8gd2lsbCBiZSBpZ25vcmVkLiBUaGlzIG9wdGlvbiB0YWtlcyBlZmZlY3QgZXZlbiBpZiBgdHJpbWAgaXMgc2V0XG4gICAgICAgICAgICAvLyB0byBgZmFsc2VgLlxuICAgICAgICAgICAgbGFyZ2VzdDogbnVsbCxcblxuICAgICAgICAgICAgLy8gbWF4VmFsdWVcbiAgICAgICAgICAgIC8vIFVzZSBgbWF4VmFsdWVgIHRvIHJlbmRlciBnZW5lcmFsaXplZCBvdXRwdXQgZm9yIGxhcmdlIGR1cmF0aW9uIHZhbHVlcyxcbiAgICAgICAgICAgIC8vIGUuZy4gYFwiPiA2MCBkYXlzXCJgLiBgbWF4VmFsdWVgIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyIGFuZCBpc1xuICAgICAgICAgICAgLy8vIGFwcGxpZWQgdG8gdGhlIGdyZWF0ZXN0LW1hZ25pdHVkZSBtb21lbnQgdG9rZW4gaW4gdGhlIGZvcm1hdCB0ZW1wbGF0ZS5cbiAgICAgICAgICAgIG1heFZhbHVlOiBudWxsLFxuXG4gICAgICAgICAgICAvLyBtaW5WYWx1ZVxuICAgICAgICAgICAgLy8gVXNlIGBtaW5WYWx1ZWAgdG8gcmVuZGVyIGdlbmVyYWxpemVkIG91dHB1dCBmb3Igc21hbGwgZHVyYXRpb24gdmFsdWVzLFxuICAgICAgICAgICAgLy8gZS5nLiBgXCI8IDUgbWludXRlc1wiYC4gYG1pblZhbHVlYCBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciBhbmQgaXNcbiAgICAgICAgICAgIC8vIGFwcGxpZWQgdG8gdGhlIGxlYXN0LW1hZ25pdHVkZSBtb21lbnQgdG9rZW4gaW4gdGhlIGZvcm1hdCB0ZW1wbGF0ZS5cbiAgICAgICAgICAgIG1pblZhbHVlOiBudWxsLFxuXG4gICAgICAgICAgICAvLyBwcmVjaXNpb25cbiAgICAgICAgICAgIC8vIElmIGEgcG9zaXRpdmUgaW50ZWdlciwgbnVtYmVyIG9mIGRlY2ltYWwgZnJhY3Rpb24gZGlnaXRzIHRvIHJlbmRlci5cbiAgICAgICAgICAgIC8vIElmIGEgbmVnYXRpdmUgaW50ZWdlciwgbnVtYmVyIG9mIGludGVnZXIgcGxhY2UgZGlnaXRzIHRvIHRydW5jYXRlIHRvIDAuXG4gICAgICAgICAgICAvLyBJZiBgdXNlU2lnbmlmaWNhbnREaWdpdHNgIGlzIHNldCB0byBgdHJ1ZWAgYW5kIGBwcmVjaXNpb25gIGlzIGEgcG9zaXRpdmVcbiAgICAgICAgICAgIC8vIGludGVnZXIsIHNldHMgdGhlIG1heGltdW0gbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cyB1c2VkIGluIHRoZVxuICAgICAgICAgICAgLy8gZm9ybWF0dGVkIG91dHB1dC5cbiAgICAgICAgICAgIHByZWNpc2lvbjogMCxcblxuICAgICAgICAgICAgLy8gdHJ1bmNcbiAgICAgICAgICAgIC8vIERlZmF1bHQgYmVoYXZpb3Igcm91bmRzIGZpbmFsIHRva2VuIHZhbHVlLiBTZXQgdG8gYHRydWVgIHRvXG4gICAgICAgICAgICAvLyB0cnVuY2F0ZSBmaW5hbCB0b2tlbiB2YWx1ZSwgd2hpY2ggd2FzIHRoZSBkZWZhdWx0IGJlaGF2aW9yIGluXG4gICAgICAgICAgICAvLyB2ZXJzaW9uIDEgb2YgdGhpcyBwbHVnaW4uXG4gICAgICAgICAgICB0cnVuYzogZmFsc2UsXG5cbiAgICAgICAgICAgIC8vIGZvcmNlTGVuZ3RoXG4gICAgICAgICAgICAvLyBGb3JjZSBmaXJzdCBtb21lbnQgdG9rZW4gd2l0aCBhIHZhbHVlIHRvIHJlbmRlciBhdCBmdWxsIGxlbmd0aFxuICAgICAgICAgICAgLy8gZXZlbiB3aGVuIHRlbXBsYXRlIGlzIHRyaW1tZWQgYW5kIGZpcnN0IG1vbWVudCB0b2tlbiBoYXMgbGVuZ3RoIG9mIDEuXG4gICAgICAgICAgICBmb3JjZUxlbmd0aDogbnVsbCxcblxuICAgICAgICAgICAgLy8gdXNlckxvY2FsZVxuICAgICAgICAgICAgLy8gRm9ybWF0dGVkIG51bWVyaWNhbCBvdXRwdXQgaXMgcmVuZGVyZWQgdXNpbmcgYHRvTG9jYWxlU3RyaW5nYFxuICAgICAgICAgICAgLy8gYW5kIHRoZSBsb2NhbGUgb2YgdGhlIHVzZXIncyBlbnZpcm9ubWVudC4gU2V0IHRoaXMgb3B0aW9uIHRvIHJlbmRlclxuICAgICAgICAgICAgLy8gbnVtZXJpY2FsIG91dHB1dCB1c2luZyBhIGRpZmZlcmVudCBsb2NhbGUuIFVuaXQgbmFtZXMgYXJlIHJlbmRlcmVkXG4gICAgICAgICAgICAvLyBhbmQgZGV0ZWN0ZWQgdXNpbmcgdGhlIGxvY2FsZSBzZXQgaW4gbW9tZW50LmpzLCB3aGljaCBjYW4gYmUgZGlmZmVyZW50XG4gICAgICAgICAgICAvLyBmcm9tIHRoZSBsb2NhbGUgb2YgdXNlcidzIGVudmlyb25tZW50LlxuICAgICAgICAgICAgdXNlckxvY2FsZTogbnVsbCxcblxuICAgICAgICAgICAgLy8gdXNlUGx1cmFsXG4gICAgICAgICAgICAvLyBXaWxsIGF1dG9tYXRpY2FsbHkgc2luZ3VsYXJpemUgb3IgcGx1cmFsaXplIHVuaXQgbmFtZXMgd2hlbiB0aGV5XG4gICAgICAgICAgICAvLyBhcHBlYXIgaW4gdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIGVhY2ggbW9tZW50IHRva2VuLiBTdGFuZGFyZCBhbmRcbiAgICAgICAgICAgIC8vIHNob3J0IHVuaXQgbGFiZWxzIGFyZSBzaW5ndWxhcml6ZWQgYW5kIHBsdXJhbGl6ZWQsIGJhc2VkIG9uIGxvY2FsZS5cbiAgICAgICAgICAgIC8vIGUuZy4gaW4gZW5nbGlzaCwgXCIxIHNlY29uZFwiIG9yIFwiMSBzZWNcIiB3b3VsZCBiZSByZW5kZXJlZCBpbnN0ZWFkXG4gICAgICAgICAgICAvLyBvZiBcIjEgc2Vjb25kc1wiIG9yIFwiMSBzZWNzXCIuIFRoZSBkZWZhdWx0IHBsdXJhbGl6YXRpb24gZnVuY3Rpb25cbiAgICAgICAgICAgIC8vIHJlbmRlcnMgYSBwbHVyYWwgbGFiZWwgZm9yIGEgdmFsdWUgd2l0aCBkZWNpbWFsIHByZWNpc2lvbi5cbiAgICAgICAgICAgIC8vIGUuZy4gXCIxLjAgc2Vjb25kc1wiIGlzIG5ldmVyIHJlbmRlcmVkIGFzIFwiMS4wIHNlY29uZFwiLlxuICAgICAgICAgICAgLy8gTGFiZWwgdHlwZXMgYW5kIHBsdXJhbGl6YXRpb24gZnVuY3Rpb24gYXJlIGNvbmZpZ3VyYWJsZSBpbiB0aGVcbiAgICAgICAgICAgIC8vIGxvY2FsZURhdGEgZXh0ZW5zaW9ucy5cbiAgICAgICAgICAgIHVzZVBsdXJhbDogdHJ1ZSxcblxuICAgICAgICAgICAgLy8gdXNlTGVmdFVuaXRzXG4gICAgICAgICAgICAvLyBUaGUgdGV4dCB0byB0aGUgcmlnaHQgb2YgZWFjaCBtb21lbnQgdG9rZW4gaW4gYSBmb3JtYXQgc3RyaW5nXG4gICAgICAgICAgICAvLyBpcyB0cmVhdGVkIGFzIHRoYXQgdG9rZW4ncyB1bml0cyBmb3IgdGhlIHB1cnBvc2VzIG9mIHRyaW1taW5nLFxuICAgICAgICAgICAgLy8gc2luZ3VsYXJpemluZywgYW5kIGF1dG8tbG9jYWxpemluZy5cbiAgICAgICAgICAgIC8vIGUuZy4gXCJoIFtob3Vyc10sIG0gW21pbnV0ZXNdLCBzIFtzZWNvbmRzXVwiLlxuICAgICAgICAgICAgLy8gVG8gcHJvcGVybHkgc2luZ3VsYXJpemUgb3IgbG9jYWxpemUgYSBmb3JtYXQgc3RyaW5nIHN1Y2ggYXNcbiAgICAgICAgICAgIC8vIFwiW2hvdXJzXSBoLCBbbWludXRlc10gbSwgW3NlY29uZHNdIHNcIiwgd2hlcmUgdGhlIHVuaXRzIGFwcGVhclxuICAgICAgICAgICAgLy8gdG8gdGhlIGxlZnQgb2YgZWFjaCBtb21lbnQgdG9rZW4sIHNldCB1c2VMZWZ0VW5pdHMgdG8gYHRydWVgLlxuICAgICAgICAgICAgLy8gVGhpcyBwbHVnaW4gaXMgbm90IHRlc3RlZCBpbiB0aGUgY29udGV4dCBvZiBydGwgdGV4dC5cbiAgICAgICAgICAgIHVzZUxlZnRVbml0czogZmFsc2UsXG5cbiAgICAgICAgICAgIC8vIHVzZUdyb3VwaW5nXG4gICAgICAgICAgICAvLyBFbmFibGVzIGxvY2FsZS1iYXNlZCBkaWdpdCBncm91cGluZyBpbiB0aGUgZm9ybWF0dGVkIG91dHB1dC4gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL051bWJlci90b0xvY2FsZVN0cmluZ1xuICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG5cbiAgICAgICAgICAgIC8vIHVzZVNpZ25pZmljYW50RGlnaXRzXG4gICAgICAgICAgICAvLyBUcmVhdCB0aGUgYHByZWNpc2lvbmAgb3B0aW9uIGFzIHRoZSBtYXhpbXVtIHNpZ25pZmljYW50IGRpZ2l0c1xuICAgICAgICAgICAgLy8gdG8gYmUgcmVuZGVyZWQuIFByZWNpc2lvbiBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlci4gU2lnbmlmaWNhbnRcbiAgICAgICAgICAgIC8vIGRpZ2l0cyBleHRlbmQgYWNyb3NzIHVuaXQgdHlwZXMsXG4gICAgICAgICAgICAvLyBlLmcuIFwiNiBob3VycyAzNy41IG1pbnV0ZXNcIiByZXByZXNlbnRzIDQgc2lnbmlmaWNhbnQgZGlnaXRzLlxuICAgICAgICAgICAgLy8gRW5hYmxpbmcgdGhpcyBvcHRpb24gY2F1c2VzIHRva2VuIGxlbmd0aCB0byBiZSBpZ25vcmVkLiBTZWUgIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL051bWJlci90b0xvY2FsZVN0cmluZ1xuICAgICAgICAgICAgdXNlU2lnbmlmaWNhbnREaWdpdHM6IGZhbHNlLFxuXG4gICAgICAgICAgICAvLyB0ZW1wbGF0ZVxuICAgICAgICAgICAgLy8gVGhlIHRlbXBsYXRlIHN0cmluZyB1c2VkIHRvIGZvcm1hdCB0aGUgZHVyYXRpb24uIE1heSBiZSBhIGZ1bmN0aW9uXG4gICAgICAgICAgICAvLyBvciBhIHN0cmluZy4gVGVtcGxhdGUgZnVuY3Rpb25zIGFyZSBleGVjdXRlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZ1xuICAgICAgICAgICAgLy8gb2YgdGhlIHNldHRpbmdzIG9iamVjdCBzbyB0aGF0IHRlbXBsYXRlIHN0cmluZ3MgbWF5IGJlIGR5bmFtaWNhbGx5XG4gICAgICAgICAgICAvLyBnZW5lcmF0ZWQgYmFzZWQgb24gdGhlIGR1cmF0aW9uIG9iamVjdCAoYWNjZXNzaWJsZSB2aWEgYHRoaXMuZHVyYXRpb25gKVxuICAgICAgICAgICAgLy8gb3IgYW55IG9mIHRoZSBvdGhlciBzZXR0aW5ncy4gTGVhZGluZyBhbmQgdHJhaWxpbmcgc3BhY2UsIGNvbW1hLFxuICAgICAgICAgICAgLy8gcGVyaW9kLCBhbmQgY29sb24gY2hhcmFjdGVycyBhcmUgdHJpbW1lZCBmcm9tIHRoZSByZXN1bHRpbmcgc3RyaW5nLlxuICAgICAgICAgICAgdGVtcGxhdGU6IGRlZmF1bHRGb3JtYXRUZW1wbGF0ZSxcblxuICAgICAgICAgICAgLy8gdXNlVG9Mb2NhbGVTdHJpbmdcbiAgICAgICAgICAgIC8vIFNldCB0aGlzIG9wdGlvbiB0byBgZmFsc2VgIHRvIGlnbm9yZSB0aGUgYHRvTG9jYWxlU3RyaW5nYCBmZWF0dXJlXG4gICAgICAgICAgICAvLyB0ZXN0IGFuZCBmb3JjZSB0aGUgdXNlIG9mIHRoZSBgZm9ybWF0TnVtYmVyYCBmYWxsYmFjayBmdW5jdGlvblxuICAgICAgICAgICAgLy8gaW5jbHVkZWQgaW4gdGhpcyBwbHVnaW4uXG4gICAgICAgICAgICB1c2VUb0xvY2FsZVN0cmluZzogdHJ1ZSxcblxuICAgICAgICAgICAgLy8gZm9ybWF0TnVtYmVyIGZhbGxiYWNrIG9wdGlvbnMuXG4gICAgICAgICAgICAvLyBXaGVuIGB0b0xvY2FsZVN0cmluZ2AgaXMgZGV0ZWN0ZWQgYW5kIHBhc3NlcyB0aGUgZmVhdHVyZSB0ZXN0LCB0aGVcbiAgICAgICAgICAgIC8vIGZvbGxvd2luZyBvcHRpb25zIHdpbGwgaGF2ZSBubyBlZmZlY3Q6IGB0b0xvY2FsZVN0cmluZ2Agd2lsbCBiZSB1c2VkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybWF0dGluZyBhbmQgdGhlIGdyb3VwaW5nIHNlcGFyYXRvciwgZGVjaW1hbCBzZXBhcmF0b3IsIGFuZFxuICAgICAgICAgICAgLy8gaW50ZWdlciBkaWdpdCBncm91cGluZyB3aWxsIGJlIGRldGVybWluZWQgYnkgdGhlIHVzZXIgbG9jYWxlLlxuXG4gICAgICAgICAgICAvLyBncm91cGluZ1NlcGFyYXRvclxuICAgICAgICAgICAgLy8gVGhlIGludGVnZXIgZGlnaXQgZ3JvdXBpbmcgc2VwYXJhdG9yIHVzZWQgd2hlbiB1c2luZyB0aGUgZmFsbGJhY2tcbiAgICAgICAgICAgIC8vIGZvcm1hdE51bWJlciBmdW5jdGlvbi5cbiAgICAgICAgICAgIGdyb3VwaW5nU2VwYXJhdG9yOiBcIixcIixcblxuICAgICAgICAgICAgLy8gZGVjaW1hbFNlcGFyYXRvclxuICAgICAgICAgICAgLy8gVGhlIGRlY2ltYWwgc2VwYXJhdG9yIHVzZWQgd2hlbiB1c2luZyB0aGUgZmFsbGJhY2sgZm9ybWF0TnVtYmVyXG4gICAgICAgICAgICAvLyBmdW5jdGlvbi5cbiAgICAgICAgICAgIGRlY2ltYWxTZXBhcmF0b3I6IFwiLlwiLFxuXG4gICAgICAgICAgICAvLyBncm91cGluZ1xuICAgICAgICAgICAgLy8gVGhlIGludGVnZXIgZGlnaXQgZ3JvdXBpbmcgdXNlZCB3aGVuIHVzaW5nIHRoZSBmYWxsYmFjayBmb3JtYXROdW1iZXJcbiAgICAgICAgICAgIC8vIGZ1bmN0aW9uLiBNdXN0IGJlIGFuIGFycmF5LiBUaGUgZGVmYXVsdCB2YWx1ZSBvZiBgWzNdYCBnaXZlcyB0aGVcbiAgICAgICAgICAgIC8vIHN0YW5kYXJkIDMtZGlnaXQgdGhvdXNhbmQvbWlsbGlvbi9iaWxsaW9uIGRpZ2l0IGdyb3VwaW5ncyBmb3IgdGhlXG4gICAgICAgICAgICAvLyBcImVuXCIgbG9jYWxlLiBTZXR0aW5nIHRoaXMgb3B0aW9uIHRvIGBbMywgMl1gIHdvdWxkIGdlbmVyYXRlIHRoZVxuICAgICAgICAgICAgLy8gdGhvdXNhbmQvbGFraC9jcm9yZSBkaWdpdCBncm91cGluZ3MgdXNlZCBpbiB0aGUgXCJlbi1JTlwiIGxvY2FsZS5cbiAgICAgICAgICAgIGdyb3VwaW5nOiBbM11cbiAgICAgICAgfTtcblxuICAgICAgICBjb250ZXh0LnVwZGF0ZUxvY2FsZSgnZW4nLCBlbmdMb2NhbGUpO1xuICAgIH1cblxuICAgIC8vIFJ1biBmZWF0dXJlIHRlc3RzIGZvciBgTnVtYmVyI3RvTG9jYWxlU3RyaW5nYC5cbiAgICB0b0xvY2FsZVN0cmluZ1dvcmtzID0gZmVhdHVyZVRlc3RUb0xvY2FsZVN0cmluZygpO1xuICAgIHRvTG9jYWxlU3RyaW5nUm91bmRpbmdXb3JrcyA9IHRvTG9jYWxlU3RyaW5nV29ya3MgJiYgZmVhdHVyZVRlc3RUb0xvY2FsZVN0cmluZ1JvdW5kaW5nKCk7XG5cbiAgICAvLyBJbml0aWFsaXplIGR1cmF0aW9uIGZvcm1hdCBvbiB0aGUgZ2xvYmFsIG1vbWVudCBpbnN0YW5jZS5cbiAgICBpbml0KG1vbWVudCk7XG5cbiAgICAvLyBSZXR1cm4gdGhlIGluaXQgZnVuY3Rpb24gc28gdGhhdCBkdXJhdGlvbiBmb3JtYXQgY2FuIGJlXG4gICAgLy8gaW5pdGlhbGl6ZWQgb24gb3RoZXIgbW9tZW50IGluc3RhbmNlcy5cbiAgICByZXR1cm4gaW5pdDtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAoX19ERVZfXykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMSA/IGxlbiAtIDEgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAxOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDFdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkobnVsbCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJoZWxwZXJzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZhbGlkYXRvcnNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJ3cFwiXVtcImlzU2hhbGxvd0VxdWFsXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibG9kYXNoXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibW9tZW50XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZlbmRvclwiXVtcIm1vbWVudFwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9
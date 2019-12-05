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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/ZZZ/vo/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/ZZZ/utils/parse-infinity.js":
/*!********************************************!*\
  !*** ./assets/ZZZ/utils/parse-infinity.js ***!
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
    return value < 0 || value === '' || value === 'INF' || value === Infinity || Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isNil"])(value);
  };

  if (number && number.type && number.type.name === 'InfinitySymbol') {
    number = number.props.value;
  }

  number = representsInfinity(number) ? Infinity : number;
  number = number !== Infinity && asInt ? parseInt(number, 10) : number;

  if (isNaN(number)) {
    number = asInt ? -1 : Infinity;
  } // If infinity and for db


  if (number === Infinity && forDb) {
    number = -1;
  }

  return number;
};

/* harmony default export */ __webpack_exports__["default"] = (parseInfinity);

/***/ }),

/***/ "./assets/ZZZ/vo/currency.js":
/*!***********************************!*\
  !*** ./assets/ZZZ/vo/currency.js ***!
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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/***/ "./assets/ZZZ/vo/date-time/assertions.js":
/*!***********************************************!*\
  !*** ./assets/ZZZ/vo/date-time/assertions.js ***!
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

/***/ "./assets/ZZZ/vo/date-time/datetime.js":
/*!*********************************************!*\
  !*** ./assets/ZZZ/vo/date-time/datetime.js ***!
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
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assertions */ "./assets/ZZZ/vo/date-time/assertions.js");
/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./duration */ "./assets/ZZZ/vo/date-time/duration.js");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./defaults */ "./assets/ZZZ/vo/date-time/defaults.js");






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

/***/ "./assets/ZZZ/vo/date-time/defaults.js":
/*!*********************************************!*\
  !*** ./assets/ZZZ/vo/date-time/defaults.js ***!
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
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assertions */ "./assets/ZZZ/vo/date-time/assertions.js");
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

/***/ "./assets/ZZZ/vo/date-time/duration.js":
/*!*********************************************!*\
  !*** ./assets/ZZZ/vo/date-time/duration.js ***!
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
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assertions */ "./assets/ZZZ/vo/date-time/assertions.js");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./defaults */ "./assets/ZZZ/vo/date-time/defaults.js");





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

/***/ "./assets/ZZZ/vo/date-time/index.js":
/*!******************************************!*\
  !*** ./assets/ZZZ/vo/date-time/index.js ***!
  \******************************************/
/*! exports provided: DateTime, Duration, ServerDateTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datetime */ "./assets/ZZZ/vo/date-time/datetime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DateTime", function() { return _datetime__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./duration */ "./assets/ZZZ/vo/date-time/duration.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Duration", function() { return _duration__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _server_date_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./server-date-time */ "./assets/ZZZ/vo/date-time/server-date-time.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ServerDateTime", function() { return _server_date_time__WEBPACK_IMPORTED_MODULE_2__["default"]; });





/***/ }),

/***/ "./assets/ZZZ/vo/date-time/server-date-time.js":
/*!*****************************************************!*\
  !*** ./assets/ZZZ/vo/date-time/server-date-time.js ***!
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
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./datetime */ "./assets/ZZZ/vo/date-time/datetime.js");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./defaults */ "./assets/ZZZ/vo/date-time/defaults.js");
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

/***/ "./assets/ZZZ/vo/index.js":
/*!********************************!*\
  !*** ./assets/ZZZ/vo/index.js ***!
  \********************************/
/*! exports provided: InfinitySymbol, Money, SiteCurrency, Currency, Label, DateTime, Duration, ServerDateTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _infinity_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./infinity-symbol */ "./assets/ZZZ/vo/infinity-symbol.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InfinitySymbol", function() { return _infinity_symbol__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _money__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./money */ "./assets/ZZZ/vo/money.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Money", function() { return _money__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _currency__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currency */ "./assets/ZZZ/vo/currency.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SiteCurrency", function() { return _currency__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Currency", function() { return _currency__WEBPACK_IMPORTED_MODULE_2__["Currency"]; });

/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./label */ "./assets/ZZZ/vo/label.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Label", function() { return _label__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _date_time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./date-time */ "./assets/ZZZ/vo/date-time/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DateTime", function() { return _date_time__WEBPACK_IMPORTED_MODULE_4__["DateTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Duration", function() { return _date_time__WEBPACK_IMPORTED_MODULE_4__["Duration"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ServerDateTime", function() { return _date_time__WEBPACK_IMPORTED_MODULE_4__["ServerDateTime"]; });







/***/ }),

/***/ "./assets/ZZZ/vo/infinity-symbol.js":
/*!******************************************!*\
  !*** ./assets/ZZZ/vo/infinity-symbol.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_parse_infinity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/parse-infinity */ "./assets/ZZZ/utils/parse-infinity.js");


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

/***/ "./assets/ZZZ/vo/label.js":
/*!********************************!*\
  !*** ./assets/ZZZ/vo/label.js ***!
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

/***/ "./assets/ZZZ/vo/money.js":
/*!********************************!*\
  !*** ./assets/ZZZ/vo/money.js ***!
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
/* harmony import */ var _currency__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currency */ "./assets/ZZZ/vo/currency.js");
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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
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
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

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

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.12.0
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
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE);
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
var lowPriorityWarningWithoutStack = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
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

  lowPriorityWarningWithoutStack = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(void 0, [format].concat(args));
    }
  };
}

var lowPriorityWarningWithoutStack$1 = lowPriorityWarningWithoutStack;

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
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

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
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarningWithoutStack$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
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

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9aWlovdXRpbHMvcGFyc2UtaW5maW5pdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvWlpaL3ZvL2N1cnJlbmN5LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL1paWi92by9kYXRlLXRpbWUvYXNzZXJ0aW9ucy5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9aWlovdm8vZGF0ZS10aW1lL2RhdGV0aW1lLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL1paWi92by9kYXRlLXRpbWUvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvWlpaL3ZvL2RhdGUtdGltZS9kdXJhdGlvbi5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9aWlovdm8vZGF0ZS10aW1lL2luZGV4LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL1paWi92by9kYXRlLXRpbWUvc2VydmVyLWRhdGUtdGltZS5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9aWlovdm8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvWlpaL3ZvL2luZmluaXR5LXN5bWJvbC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9aWlovdm8vbGFiZWwuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvWlpaL3ZvL21vbmV5LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NvbnN0cnVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXQuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zdXBlclByb3BCYXNlLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi4vbGliL3NldHRpbmdzLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4uL2xpYi91bmZvcm1hdC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uLi9saWIvaW50ZXJuYWwvY2hlY2tQcmVjaXNpb24uanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi4vbGliL3RvRml4ZWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi4vbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi4vbGliL2ludGVybmFsL3N0cmlwSW5zaWduaWZpY2FudFplcm9zLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4uL2xpYi9mb3JtYXROdW1iZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi4vbm9kZV9tb2R1bGVzL2lzLXN0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uLi9saWIvaW50ZXJuYWwvY2hlY2tDdXJyZW5jeUZvcm1hdC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uLi9saWIvZm9ybWF0TW9uZXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi4vbGliL2Zvcm1hdENvbHVtbi5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9kZWNpbWFsLmpzLWxpZ2h0L2RlY2ltYWwuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvbW9tZW50LWR1cmF0aW9uLWZvcm1hdC9saWIvbW9tZW50LWR1cmF0aW9uLWZvcm1hdC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL25vZGVfbW9kdWxlcy93YXJuaW5nL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIl19Iiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJoZWxwZXJzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaTE4blwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZhbGlkYXRvcnNcIl19Iiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiZWxlbWVudFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJpc1NoYWxsb3dFcXVhbFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvZXh0ZXJuYWwge1widGhpc1wiOlwibG9kYXNoXCJ9Iiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHtcInRoaXNcIjpcIm1vbWVudFwifSIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmVuZG9yXCIsXCJtb21lbnRcIl19Il0sIm5hbWVzIjpbInBhcnNlSW5maW5pdHkiLCJudW1iZXIiLCJhc0ludCIsImZvckRiIiwicmVwcmVzZW50c0luZmluaXR5IiwidmFsdWUiLCJJbmZpbml0eSIsImlzTmlsIiwidHlwZSIsIm5hbWUiLCJwcm9wcyIsInBhcnNlSW50IiwiaXNOYU4iLCJDdXJyZW5jeSIsImN1cnJlbmN5Q29uZmlnIiwidmFsaWRhdGVDdXJyZW5jeUNvbmZpZyIsImNvZGUiLCJzaW5ndWxhckxhYmVsIiwicGx1cmFsTGFiZWwiLCJzaWduIiwic2lnbkI0IiwiaXNVbmRlZmluZWQiLCJkZWNpbWFsUGxhY2VzIiwiZGVjaW1hbE1hcmsiLCJ0aG91c2FuZHNTZXBhcmF0b3IiLCJzdWJ1bml0cyIsIk1hdGgiLCJwb3ciLCJPYmplY3QiLCJmcmVlemUiLCJkZWNpbWFsSW5mbyIsImRlY2ltYWwiLCJ0aG91c2FuZCIsInByZWNpc2lvbiIsImN1cnJlbmN5Iiwic3ltYm9sIiwiZm9ybWF0IiwicG9zIiwibmVnIiwiemVybyIsImNvbmZpZyIsImlzRW1wdHkiLCJFeGNlcHRpb24iLCJpc1N0cmluZyIsIlR5cGVFcnJvciIsImlzQm9vbGVhbiIsImlzTnVtYmVyIiwiU2l0ZUN1cnJlbmN5IiwiZSIsIndhcm5pbmciLCJtZXNzYWdlIiwiQ1VSUkVOQ1lfQ09ORklHIiwidmFsaWRhdGVMb2NhbGUiLCJsb2NhbGUiLCJvcmlnaW5hbExvY2FsZSIsIm1vbWVudCIsInZhbGlkYXRpb25Mb2NhbGUiLCJhc3NlcnRMb2NhbGVJc1ZhbGlkIiwiSW52YWxpZExvY2FsZSIsInZhbGlkYXRlSVNPODYwMSIsImRhdGVUaW1lU3RyaW5nIiwiaXNEdXJhdGlvbiIsInJlZ2V4IiwidGVzdCIsImFzc2VydElTTzg2MDFJc1ZhbGlkIiwiSW52YWxpZElTTzg2MDFTdHJpbmciLCJ2YWxpZGF0ZVRpbWV6b25lIiwidGltZXpvbmUiLCJkdCIsInR6Iiwiem9uZSIsImFzc2VydFRpbWV6b25lSXNWYWxpZCIsIkludmFsaWRUaW1lem9uZSIsInZhbGlkYXRlSXNEYXRlIiwiZGF0ZSIsIkRhdGUiLCJhc3NlcnRJc0RhdGUiLCJ2YWxpZGF0ZUlzT2Zmc2V0Iiwib2Zmc2V0IiwiYXNzZXJ0SXNPZmZzZXQiLCJwcml2YXRlUHJvcGVydGllcyIsImRhdGV0aW1lIiwiU3ltYm9sIiwicHJpdmF0ZU1ldGhvZHMiLCJnZXRVbml0TmFtZXMiLCJjcmVhdGVHZXR0ZXJzQW5kU2V0dGVycyIsImV4dHJhY3RNb21lbnRzRnJvbURhdGVUaW1lcyIsIm5vcm1hbGl6ZVVuaXROYW1lIiwibm9ybWFsaXplVW5pdE9iamVjdCIsIm5vcm1hbGl6ZVVuaXRWYWx1ZSIsIm5vcm1hbGl6ZUFyZ3VtZW50cyIsInZhbGlkRGF0ZVRpbWVVbml0cyIsIkRhdGVUaW1lIiwiaXNvODYwMURhdGVTdHJpbmciLCJERUZBVUxUX1RJTUVaT05FX1NUUklORyIsIkRFRkFVTFRfVkFMSURfTE9DQUxFIiwiY29uc3RydWN0b3IiLCJ1dGMiLCJ1dGNPZmZzZXQiLCJUSU1FWk9ORV9MT0NBTCIsImZvckVhY2giLCJ1bml0TmFtZSIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwibWV0aG9kTmFtZSIsInVuaXRWYWx1ZSIsImNhcGl0YWxpemUiLCJzZXQiLCJzZXRPYmplY3QiLCJpbnN0YW5jZUFyZ3VtZW50cyIsImNsb25lIiwidG9JU09TdHJpbmciLCJmcm9tTW9tZW50IiwiaXNWYWxpZCIsIm90aGVyRGF0ZVRpbWUiLCJhc3NlcnRJc0RhdGVUaW1lIiwiRHVyYXRpb24iLCJkdXJhdGlvbiIsImRpZmYiLCJ1bml0IiwiZW5kT2YiLCJpc1NhbWUiLCJhc3NlcnRJc1ZhbGlkRHVyYXRpb24iLCJzdWJ0cmFjdCIsInRvT2JqZWN0IiwiYWRkIiwic3RhcnRPZiIsIkRFRkFVTFRfRk9STUFUIiwiaW5VVEMiLCJ0b0RhdGUiLCJsb2NhbCIsInZhbHVlT2YiLCJyZWR1Y2UiLCJyZXN1bHQiLCJrZXkiLCJ0b1N0cmluZyIsImRheXNJbk1vbnRoIiwiaXNEU1QiLCJpc0xlYXBZZWFyIiwiZGF5T2ZZZWFyIiwicXVhcnRlciIsImlzb1dlZWsiLCJpc29XZWVrWWVhciIsImlzb1dlZWtkYXkiLCJpc29XZWVrc0luWWVhciIsImFzc2VydGlvbnMiLCJpbnN0YW5jZU9mIiwidmFsaWRhdGVJc0RhdGVUaW1lIiwiSW52YWxpZERhdGVUaW1lIiwiZGF0ZVZhbHVlIiwiZGF0ZXRpbWVzIiwibWFwIiwibWF4IiwibWluIiwibW9tZW50SW5zdGFuY2UiLCJpc01vbWVudCIsImlzRnVuY3Rpb24iLCJJU09TdHJpbmciLCJERUZBVUxUX09GRlNFVCIsIm1pbGxpc2Vjb25kcyIsInNlY29uZHMiLCJ1bml4IiwidmFsdWVzIiwiSW52YWxpZEFyZ3VtZW50IiwidmFsdWVzRm9yQ29uc3RydWN0Iiwib21pdCIsImZyb21Mb2NhbCIsIm5hbWVUb05vcm1hbGl6ZSIsImRheSIsImRheXMiLCJ5ZWFycyIsIm1vbnRocyIsIm1pbnV0ZXMiLCJob3VycyIsImlzT2JqZWN0IiwiVU5JVF9ZRUFSIiwiVU5JVF9NT05USCIsIlVOSVRfREFZIiwiVU5JVF9IT1VSIiwiVU5JVF9NSU5VVEUiLCJVTklUX1NFQ09ORCIsIlVOSVRfTUlMTElTRUNPTkQiLCJUSU1FWk9ORV9DT05GSUciLCJzdHJpbmciLCJIQVNfVElNRVpPTkVfU1RSSU5HIiwiRk9STUFUX1NJVEVfREFURSIsIkZPUk1BVF9TSVRFX1RJTUUiLCJERUZBVUxUX0xPQ0FMRSIsInNuYWtlQ2FzZSIsIlNFUlZFUl9MT0NBTEUiLCJ1c2VyIiwibW9tZW50RHVyYXRpb25Gb3JtYXRTZXR1cCIsImR1cmF0aW9uVmFsdWVzIiwiY3JlYXRlR2V0dGVycyIsImdldEFsbFVuaXROYW1lcyIsInBvcHVsYXRlVmFsdWVzRnJvbUR1cmF0aW9uIiwic2V0VmFsdWVzIiwiZmlsdGVyVmFsdWVzIiwidW5pdE5hbWVzIiwiZGVyaXZhdGl2ZVVuaXROYW1lcyIsInZhbHVlc1RvU2V0IiwicGljayIsImlzU2hhbGxvd0VxdWFsIiwia2V5cyIsImpvaW4iLCJhY2Nlc3Nvck5hbWUiLCJpbmRleE9mIiwiYXNNZXRob2ROYW1lIiwib3RoZXJEdXJhdGlvbiIsImFzc2VydElzRHVyYXRpb24iLCJub3JtYWxpemUiLCJtYXBWYWx1ZXMiLCJ0b0pTT04iLCJ0b0lTTyIsImFzTWlsbGlzZWNvbmRzIiwiaXNvU3RyaW5nIiwiaXNWYWxpZER1cmF0aW9uIiwiU2VydmVyRGF0ZVRpbWUiLCJJbmZpbml0eVN5bWJvbCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9uZU9mVHlwZSIsImJvb2wiLCJvYmplY3QiLCJkZWZhdWx0UHJvcHMiLCJMYWJlbCIsInNpbmd1bGFyIiwicGx1cmFsIiwic2V0U2luZ3VsYXIiLCJzZXRQbHVyYWwiLCJhc3NlcnRTdHJpbmciLCJzdGFydENhc2UiLCJ0b0xvd2VyQ2FzZSIsInRvVXBwZXJDYXNlIiwiZm9ybWF0VHlwZSIsIkZPUk1BVF9TRU5URU5DRV9DQVNFIiwiYXNTZW50ZW5jZUNhc2UiLCJGT1JNQVRfTE9XRVJDQVNFIiwiYXNMb3dlckNhc2UiLCJGT1JNQVRfVVBQRVJDQVNFIiwiYXNVcHBlckNhc2UiLCJsYWJlbCIsImFzc2VydE1vbmV5IiwibW9uZXkiLCJhc3NlcnRDdXJyZW5jeSIsImFzc2VydFNhbWVDdXJyZW5jeSIsImN1cnJlbmN5QSIsImN1cnJlbmN5QiIsIk1vbmV5IiwiYW1vdW50Iiwic2V0Q3VycmVuY3kiLCJzZXRBbW91bnQiLCJzZXRGb3JtYXR0ZXIiLCJ0b051bWJlciIsIkRlY2ltYWwiLCJmb3JtYXR0ZXIiLCJBY2NvdW50aW5nIiwic2V0dGluZ3MiLCJ0b0FjY291bnRpbmdTZXR0aW5ncyIsIm90aGVyIiwiZXF1YWxzIiwiaGFzU2FtZUN1cnJlbmN5IiwiYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3kiLCJwbHVzIiwibWludXMiLCJtdWx0aXBsaWVyIiwidGltZXMiLCJkaXZpc29yIiwiZGl2aWRlZEJ5IiwicmF0aW9zIiwic2VsZiIsInJlc3VsdHMiLCJjb252ZXJ0ZWRSYXRpb3MiLCJyZW1haW5kZXIiLCJ0b1N1YnVuaXRzIiwidG90YWwiLCJyYXRpbyIsInB1c2giLCJzaGFyZSIsImZsb29yIiwiaSIsImdyZWF0ZXJUaGFuIiwiY29tcGFyZWRUbyIsImdyZWF0ZXJUaGFuT3JFcXVhbFRvIiwibGVzc1RoYW4iLCJsZXNzVGhhbk9yRXF1YWxUbyIsImlzWmVybyIsImlzTmVnYXRpdmUiLCJpc1Bvc2l0aXZlIiwicm91bmRpbmciLCJST1VORF9IQUxGX1VQIiwidG9GaXhlZCIsInRvSW50ZWdlciIsIlJPVU5EX1VQIiwiUk9VTkRfRE9XTiIsIlJPVU5EX0NFSUwiLCJST1VORF9GTE9PUiIsIlJPVU5EX0hBTEZfRE9XTiIsIlJPVU5EX0hBTEZfRVZFTiIsInRoaXNNb25leSIsIm90aGVyTW9uZXkiLCJtb25leVZhbHVlIiwibWF0Y2giLCJsZW5ndGgiLCJzcHJpbnRmIiwiRXJyb3IiLCJwYXJzZSJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7OztBQUdBO0FBRUE7Ozs7Ozs7Ozs7QUFTQSxJQUFNQSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUVDLE1BQUYsRUFBNEM7QUFBQSxNQUFsQ0MsS0FBa0MsdUVBQTFCLEtBQTBCO0FBQUEsTUFBbkJDLEtBQW1CLHVFQUFYLEtBQVc7O0FBQ2pFO0FBQ0EsTUFBTUMsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFFQyxLQUFGO0FBQUEsV0FDMUJBLEtBQUssR0FBRyxDQUFSLElBQ0FBLEtBQUssS0FBSyxFQURWLElBRUFBLEtBQUssS0FBSyxLQUZWLElBR0FBLEtBQUssS0FBS0MsUUFIVixJQUlB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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQyxPQUFPO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsYUFBYTs7QUFFOUI7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHNCQUFzQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGVBQWU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxhQUFhOztBQUV6QjtBQUNBLHNCQUFzQixTQUFTO0FBQy9COztB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QUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVUsU0FBUztBQUNuQjtBQUNBOzs7QUFHQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsVUFBVSxLQUFLO0FBQ2Y7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztB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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxhQUFhLGlDQUFpQztBQUM5QyxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FB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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Qsb0JBQW9CO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGNBQWM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3hzREQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsSUFBcUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxVQUFVLEtBQXFDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsSUFBcUM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTSxLQUFxQyw0RkFBNEYsU0FBTTtBQUM3STtBQUNBOztBQUVBLG1CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLGdDQUFnQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5a0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLElBQXFDO0FBQ3pDLGdCQUFnQixtQkFBTyxDQUFDLGtEQUFVOztBQUVsQztBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQU8sQ0FBQyx1RkFBMkI7QUFDdEQsQ0FBQyxNQUFNLEVBSU47Ozs7Ozs7Ozs7Ozs7QUNsQkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7OztBQUliLElBQUksSUFBcUM7QUFDekM7QUFDQTs7QUFFQSw4Q0FBOEMsY0FBYzs7QUFFNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFO0FBQzFFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBGQUEwRixhQUFhO0FBQ3ZHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdHQUFnRyxlQUFlO0FBQy9HO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQzNPYTs7QUFFYixJQUFJLEtBQXFDLEVBQUUsRUFFMUM7QUFDRCxtQkFBbUIsbUJBQU8sQ0FBQywwRkFBK0I7QUFDMUQ7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsYUFBb0I7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFdBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFdBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzdEQSxhQUFhLCtCQUErQixFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTlDLGFBQWEsMENBQTBDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBekQsYUFBYSx1Q0FBdUMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F0RCxhQUFhLDZDQUE2QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTVELGFBQWEsd0NBQXdDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdkQsYUFBYSwrQ0FBK0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E5RCxhQUFhLGlDQUFpQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQWhELGFBQWEsaUNBQWlDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBaEQsYUFBYSxtREFBbUQsRUFBRSxJIiwiZmlsZSI6ImV2ZW50ZXNwcmVzc28tdmFsdWUtb2JqZWN0cy42ZjFhOTI2MGJlOWZjN2E1OGY4ZS5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvWlpaL3ZvL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzTmlsIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBjb252ZXJ0cyBpbmZpbml0ZSB2YWx1ZXMgdG8gbnVsbCBmb3IgdXNlIGluIGZvcm1zXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bGx8bnVtYmVyfHN0cmluZ30gbnVtYmVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFzSW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZvckRiXG4gKiBAcmV0dXJuIHtudW1iZXJ9IGNvbnZlcnRlZCBpbmZpbml0ZSB2YWx1ZVxuICovXG5jb25zdCBwYXJzZUluZmluaXR5ID0gKCBudW1iZXIsIGFzSW50ID0gZmFsc2UsIGZvckRiID0gZmFsc2UgKSA9PiB7XG5cdC8vIHJldHVybnMgdHJ1ZSBmb3IgYW55IHBvc3NpYmxlIHZhbHVlIHRoYXQgY291bGQgcmVwcmVzZW50IGluZmluaXR5XG5cdGNvbnN0IHJlcHJlc2VudHNJbmZpbml0eSA9ICggdmFsdWUgKSA9PlxuXHRcdHZhbHVlIDwgMCB8fFxuXHRcdHZhbHVlID09PSAnJyB8fFxuXHRcdHZhbHVlID09PSAnSU5GJyB8fFxuXHRcdHZhbHVlID09PSBJbmZpbml0eSB8fFxuXHRcdGlzTmlsKCB2YWx1ZSApO1xuXG5cdGlmICggbnVtYmVyICYmIG51bWJlci50eXBlICYmIG51bWJlci50eXBlLm5hbWUgPT09ICdJbmZpbml0eVN5bWJvbCcgKSB7XG5cdFx0bnVtYmVyID0gbnVtYmVyLnByb3BzLnZhbHVlO1xuXHR9XG5cblx0bnVtYmVyID0gcmVwcmVzZW50c0luZmluaXR5KCBudW1iZXIgKSA/IEluZmluaXR5IDogbnVtYmVyO1xuXHRudW1iZXIgPSBudW1iZXIgIT09IEluZmluaXR5ICYmIGFzSW50ID8gcGFyc2VJbnQoIG51bWJlciwgMTAgKSA6IG51bWJlcjtcblxuXHRpZiAoIGlzTmFOKCBudW1iZXIgKSApIHtcblx0XHRudW1iZXIgPSBhc0ludCA/IC0xIDogSW5maW5pdHk7XG5cdH1cblx0Ly8gSWYgaW5maW5pdHkgYW5kIGZvciBkYlxuXHRpZiAoIG51bWJlciA9PT0gSW5maW5pdHkgJiYgZm9yRGIgKSB7XG5cdFx0bnVtYmVyID0gLTE7XG5cdH1cblx0cmV0dXJuIG51bWJlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlSW5maW5pdHk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0aXNFbXB0eSxcblx0aXNTdHJpbmcsXG5cdGlzTnVtYmVyLFxuXHRpc0Jvb2xlYW4sXG5cdGlzVW5kZWZpbmVkLFxufSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgRXhjZXB0aW9uLCBDVVJSRU5DWV9DT05GSUcgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuXG4vKipcbiAqIEEgdmFsdWUgb2JqZWN0IHJlcHJlc2VudGluZyBjdXJyZW5jeSB2YWx1ZXNcbiAqL1xuZXhwb3J0IGNsYXNzIEN1cnJlbmN5IHtcblx0LyoqXG5cdCAqIFRoZSBJU08gNDIxNyBjb2RlIGlkZW50aWZ5aW5nIHRoZSBjdXJyZW5jeSAoZWcuICdVU0QnKVxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Y29kZSA9ICcnO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2luZ3VsYXIgbGFiZWwgZm9yIHRoZSBjdXJyZW5jeSAoZWcuICdEb2xsYXInKTtcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHNpbmd1bGFyTGFiZWwgPSAnJztcblxuXHQvKipcblx0ICogVGhlIHBsdXJhbCBsYWJlbCBmb3IgdGhlIGN1cnJlbmN5IChlZy4gJ0RvbGxhcnMnKTtcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHBsdXJhbExhYmVsID0gJyc7XG5cblx0LyoqXG5cdCAqIFRoZSBjdXJyZW5jeSBzeW1ib2wgKGVnLiAnJCcpO1xuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0c2lnbiA9ICcnO1xuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW5jeSBzeW1ib2wgaXMgZGlzcGxheWVkIGJlZm9yZSBvciBhZnRlciB0aGUgdmFsdWUuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0c2lnbkI0ID0gdHJ1ZTtcblxuXHQvKipcblx0ICogVGhlIHByZWNpc2lvbiBmb3IgdGhlIHZhbHVlIChlZy4gMTAuMDIgaXMgMiwgMTAuMTIzIGlzIDMpLiBUaGUgbnVtYmVyIG9mXG5cdCAqIGRlY2ltYWwgcGxhY2VzIGNhbiBiZSB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgbnVtYmVyIG9mIHN1YnVuaXRzIGZvciB0aGVcblx0ICogY3VycmVuY3kgLSBzdWJ1bml0cyA9IHBvdyggMTAsIGRlY2ltYWxQbGFjZXMpLlxuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0ZGVjaW1hbFBsYWNlcyA9IDI7XG5cblx0LyoqXG5cdCAqIFRoZSBzeW1ib2wgdXNlZCBmb3IgdGhlIGRlY2ltYWwgbWFyayAoZWcuICcuJylcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGRlY2ltYWxNYXJrID0gJy4nO1xuXG5cdC8qKlxuXHQgKiBUaGUgc3ltYm9sIHVzZWQgdG8gc3BsaXQgdXAgdGhvdXNhbmRzIGluIHRoZSB2YWx1ZSAoZWcuICcsJylcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHRob3VzYW5kc1NlcGFyYXRvciA9ICcsJztcblxuXHQvKipcblx0ICogVGhlIG51bWJlciBvZiBmcmFjdGlvbmFsIGRpdmlzaW9ucyBvZiBhIGN1cnJlbmN5J3MgbWFpbiB1bml0LiAgSWYgbm90XG5cdCAqIHByb3ZpZGVkLCB0aGVuIGl0IGlzIGF1dG9tYXRpY2FsbHkgY2FsY3VsYXRlZCBmcm9tIHRoZSBkZWNpbWFsUGxhY2VzXG5cdCAqIHZhbHVlLlxuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3VidW5pdHMgPSAxMDA7XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSB7e319IGN1cnJlbmN5Q29uZmlnIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBjb25maWd1cmF0aW9uIGZvclxuXHQgKiB0aGlzIGN1cnJlbmN5IHZhbHVlIG9iamVjdC4gIE9uIGNvbnN0cnVjdGlvbiwgdGhlIEN1cnJlbmN5IG9iamVjdCBpc1xuXHQgKiBmcm96ZW4gc28gdGhhdCBpdCBiZWNvbWVzIGltbXV0YWJsZS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKCBjdXJyZW5jeUNvbmZpZyApIHtcblx0XHRDdXJyZW5jeS52YWxpZGF0ZUN1cnJlbmN5Q29uZmlnKCBjdXJyZW5jeUNvbmZpZyApO1xuXHRcdHRoaXMuY29kZSA9IGN1cnJlbmN5Q29uZmlnLmNvZGU7XG5cdFx0dGhpcy5zaW5ndWxhckxhYmVsID0gY3VycmVuY3lDb25maWcuc2luZ3VsYXJMYWJlbCB8fCAnJztcblx0XHR0aGlzLnBsdXJhbExhYmVsID0gY3VycmVuY3lDb25maWcucGx1cmFsTGFiZWwgfHwgJyc7XG5cdFx0dGhpcy5zaWduID0gY3VycmVuY3lDb25maWcuc2lnbjtcblx0XHR0aGlzLnNpZ25CNCA9IGlzVW5kZWZpbmVkKCBjdXJyZW5jeUNvbmZpZy5zaWduQjQgKSA/XG5cdFx0XHR0aGlzLnNpZ25CNCA6XG5cdFx0XHRjdXJyZW5jeUNvbmZpZy5zaWduQjQ7XG5cdFx0dGhpcy5kZWNpbWFsUGxhY2VzID0gaXNVbmRlZmluZWQoIGN1cnJlbmN5Q29uZmlnLmRlY2ltYWxQbGFjZXMgKSA/XG5cdFx0XHR0aGlzLmRlY2ltYWxQbGFjZXMgOlxuXHRcdFx0Y3VycmVuY3lDb25maWcuZGVjaW1hbFBsYWNlcztcblx0XHR0aGlzLmRlY2ltYWxNYXJrID0gY3VycmVuY3lDb25maWcuZGVjaW1hbE1hcmsgfHwgdGhpcy5kZWNpbWFsTWFyaztcblx0XHR0aGlzLnRob3VzYW5kc1NlcGFyYXRvciA9IGN1cnJlbmN5Q29uZmlnLnRob3VzYW5kc1NlcGFyYXRvciB8fCB0aGlzLnRob3VzYW5kc1NlcGFyYXRvcjtcblx0XHR0aGlzLnN1YnVuaXRzID0gY3VycmVuY3lDb25maWcuc3VidW5pdHMgfHxcblx0XHRcdE1hdGgucG93KCAxMCwgdGhpcy5kZWNpbWFsUGxhY2VzICk7XG5cdFx0T2JqZWN0LmZyZWV6ZSggdGhpcyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGN1cnJlbmN5IHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0IGZvcm1hdHRlZCBmb3IgdGhlXG5cdCAqIGFjY291bnRpbmctanMgbGlicmFyeSBjb25maWd1cmF0aW9uLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHt7fX0gIEFuIG9iamVjdCBzaGFwZWQgZm9yIHdoYXQgdGhlIGFjY291bnRpbmctanMgbGlicmFyeSBleHBlY3RzXG5cdCAqL1xuXHR0b0FjY291bnRpbmdTZXR0aW5ncygpIHtcblx0XHRjb25zdCBkZWNpbWFsSW5mbyA9IHtcblx0XHRcdGRlY2ltYWw6IHRoaXMuZGVjaW1hbE1hcmssXG5cdFx0XHR0aG91c2FuZDogdGhpcy50aG91c2FuZHNTZXBhcmF0b3IsXG5cdFx0XHRwcmVjaXNpb246IHRoaXMuZGVjaW1hbFBsYWNlcyxcblx0XHR9O1xuXHRcdHJldHVybiB7XG5cdFx0XHRjdXJyZW5jeToge1xuXHRcdFx0XHRzeW1ib2w6IHRoaXMuc2lnbixcblx0XHRcdFx0Zm9ybWF0OiB7XG5cdFx0XHRcdFx0cG9zOiB0aGlzLnNpZ25CNCA/ICclcyV2JyA6ICcldiVzJyxcblx0XHRcdFx0XHRuZWc6IHRoaXMuc2lnbkI0ID8gJy0gJHMldicgOiAnLSAldiVzJyxcblx0XHRcdFx0XHR6ZXJvOiB0aGlzLnNpZ25CNCA/ICclcyV2JyA6ICcldiVzJyxcblx0XHRcdFx0fSxcblx0XHRcdFx0Li4uZGVjaW1hbEluZm8sXG5cdFx0XHR9LFxuXHRcdFx0bnVtYmVyOiBkZWNpbWFsSW5mbyxcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiB7T2JqZWN0fSBGdW5jdGlvbiByZXR1cm5pbmcgdGhlIG9iamVjdCB0byBiZSBzZXJpYWxpemVkIGJ5XG5cdCAqIEpTT04uc3RyaW5naWZ5XG5cdCAqL1xuXHR0b0pTT04oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvZGU6IHRoaXMuY29kZSxcblx0XHRcdHNpbmd1bGFyTGFiZWw6IHRoaXMuc2luZ3VsYXJMYWJlbCxcblx0XHRcdHBsdXJhbExhYmVsOiB0aGlzLnBsdXJhbExhYmVsLFxuXHRcdFx0c2lnbjogdGhpcy5zaWduLFxuXHRcdFx0c2lnbkI0OiB0aGlzLnNpZ25CNCxcblx0XHRcdGRlY2ltYWxNYXJrOiB0aGlzLmRlY2ltYWxNYXJrLFxuXHRcdFx0dGhvdXNhbmRzU2VwYXJhdG9yOiB0aGlzLnRob3VzYW5kc1NlcGFyYXRvcixcblx0XHRcdHN1YnVuaXRzOiB0aGlzLnN1YnVuaXRzLFxuXHRcdFx0ZGVjaW1hbFBsYWNlczogdGhpcy5kZWNpbWFsUGxhY2VzLFxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyB2YWxpZGF0ZXMgd2hldGhlciB0aGUgcGFzc2VkIGluIGNvbmZpZyBoYXMgdGhlIHJlcXVpcmVkIHByb3BlcnRpZXNcblx0ICogKGFuZCBjb3JyZWN0IHR5cGVzKSBmb3IgY29uc3RydWN0aW5nIGEgQ3VycmVuY3kgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3t9fSBjb25maWdcblx0ICogQHRocm93cyB7RXhjZXB0aW9ufVxuXHQgKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG5cdCAqL1xuXHRzdGF0aWMgdmFsaWRhdGVDdXJyZW5jeUNvbmZpZyA9ICggY29uZmlnICkgPT4ge1xuXHRcdGlmICggaXNFbXB0eSggY29uZmlnICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKFxuXHRcdFx0XHQnVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHByb3ZpZGVkIHRvIEN1cnJlbmN5IG11c3Qgbm90JyArXG5cdFx0XHRcdCcgYmUgZW1wdHknXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoICEgY29uZmlnLmNvZGUgfHwgISBpc1N0cmluZyggY29uZmlnLmNvZGUgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgcHJvdmlkZWQgdG8gQ3VycmVuY3kgbXVzdCBoYXZlICcgK1xuXHRcdFx0XHQnYSBcImNvZGVcIiBwcm9wZXJ0eSB0aGF0IGlzIGEgc3RyaW5nLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCAhIGNvbmZpZy5zaWduIHx8ICEgaXNTdHJpbmcoIGNvbmZpZy5zaWduICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHByb3ZpZGVkIHRvIEN1cnJlbmN5IG11c3QgaGF2ZSBhICcgK1xuXHRcdFx0XHQnXCJzaWduXCIgcHJvcGVydHkgdGhhdCBpcyBhIHN0cmluZy4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLnNpbmd1bGFyTGFiZWwgJiYgISBpc1N0cmluZyggY29uZmlnLnNpbmd1bGFyTGFiZWwgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgc2luZ3VsYXJMYWJlbCBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgc3RyaW5nIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLnBsdXJhbExhYmVsICYmICEgaXNTdHJpbmcoIGNvbmZpZy5wbHVyYWxMYWJlbCApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBwbHVyYWxMYWJlbCBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgc3RyaW5nIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLnNpZ25CNCAmJiAhIGlzQm9vbGVhbiggY29uZmlnLnNpZ25CNCApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBzaWduQjQgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIGJvb2xlYW4gcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcuZGVjaW1hbFBsYWNlcyAmJiAhIGlzTnVtYmVyKCBjb25maWcuZGVjaW1hbFBsYWNlcyApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBkZWNpbWFsUGxhY2VzIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBudW1iZXIgcHJpbWl0aXZlJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5kZWNpbWFsTWFyayAmJiAhIGlzU3RyaW5nKCBjb25maWcuZGVjaW1hbE1hcmsgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgZGVjaW1hbE1hcmsgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIHN0cmluZyBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy50aG91c2FuZHNTZXBhcmF0b3IgJiZcblx0XHRcdCEgaXNTdHJpbmcoIGNvbmZpZy50aG91c2FuZHNTZXBhcmF0b3IgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgdGhvdXNhbmRzU2VwYXJhdG9yIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBzdHJpbmcgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcuc3VidW5pdHMgJiYgISBpc051bWJlciggY29uZmlnLnN1YnVuaXRzICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHN1YnVuaXRzIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBudW1iZXIgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogRXhwb3J0IG9mIGEgQ3VycmVuY3kgVmFsdWUgb2JqZWN0IGNyZWF0ZWQgZnJvbSBhIGN1cnJlbmN5IGNvbmZpZyBwcm92aWRlZC5cbiAqIFRoaXMgY2F0Y2hlcyBhbnkgZXhjZXB0aW9uIGFuZCB0cmlnZ2VycyBhIGNvbnNvbGUgZXJyb3IuXG4gKlxuICogQHBhcmFtIHt7fX0gY29uZmlnXG4gKiBAcmV0dXJuIHtDdXJyZW5jeXx7fX0gSWYgdGhlcmUncyBhIHByb2JsZW0gY29uc3RydWN0aW5nIHRoZSBjdXJyZW5jeSBvYmplY3RcbiAqIGFuIGVtcHR5IG9iamVjdCBpcyByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGNvbnN0IFNpdGVDdXJyZW5jeSA9ICggY29uZmlnID0ge30gKSA9PiB7XG5cdGxldCBjdXJyZW5jeTtcblx0dHJ5IHtcblx0XHRjdXJyZW5jeSA9IG5ldyBDdXJyZW5jeSggY29uZmlnICk7XG5cdH0gY2F0Y2ggKCBlICkge1xuXHRcdGN1cnJlbmN5ID0ge307XG5cdFx0d2FybmluZyhcblx0XHRcdGZhbHNlLFxuXHRcdFx0J1RoZSBTaXRlIEN1cnJlbmN5IG9iamVjdCBjb3VsZCBub3QgYmUgY3JlYXRlZCBiZWNhdXNlICcgK1xuXHRcdFx0J29mIHRoaXMgZXJyb3I6ICcgKyBlLm1lc3NhZ2Vcblx0XHQpO1xuXHR9XG5cdHJldHVybiBjdXJyZW5jeTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNpdGVDdXJyZW5jeSggQ1VSUkVOQ1lfQ09ORklHICk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IHsgaXNTdHJpbmcsIGlzTnVtYmVyIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdEludmFsaWRUaW1lem9uZSxcblx0SW52YWxpZElTTzg2MDFTdHJpbmcsXG5cdEludmFsaWRMb2NhbGUsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBsb2NhbGUgc3RyaW5nIGlzIGEgdmFsaWQgbG9jYWxlLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gbG9jYWxlXG4gKiBAcmV0dXJuIHtib29sZWFufSBJZiBnaXZlbiBsb2NhbGUgc3RyaW5nIGlzIG5vdCB2YWxpZCB0aGlzIHdpbGwgcmV0dXJuIGZhbHNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVMb2NhbGUoIGxvY2FsZSApIHtcblx0aWYgKCAhIGlzU3RyaW5nKCBsb2NhbGUgKSApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Y29uc3Qgb3JpZ2luYWxMb2NhbGUgPSBtb21lbnQubG9jYWxlKCk7XG5cdGNvbnN0IHZhbGlkYXRpb25Mb2NhbGUgPSBtb21lbnQubG9jYWxlKCBsb2NhbGUgKTtcblx0Ly8gcmVzZXQgYmFjayB0byBvcmlnaW5hbCBsb2NhbGVcblx0bW9tZW50LmxvY2FsZSggb3JpZ2luYWxMb2NhbGUgKTtcblx0cmV0dXJuICEgKCBsb2NhbGUgIT09ICdlbicgJiYgdmFsaWRhdGlvbkxvY2FsZSA9PT0gJ2VuJyApO1xufVxuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciBnaXZlbiBsb2NhbGUgc3RyaW5nIGlzIHZhbGlkLiAgSWYgaXQncyBub3QgYW4gZXhjZXB0aW9uIGlzXG4gKiB0aHJvd24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuICogQHRocm93cyBJbnZhbGlkTG9jYWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKSB7XG5cdGlmICggISB2YWxpZGF0ZUxvY2FsZSggbG9jYWxlICkgKSB7XG5cdFx0dGhyb3cgbmV3IEludmFsaWRMb2NhbGUoIGxvY2FsZSApO1xuXHR9XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIElTTzg2MDEgZm9ybWF0dGVkIGRhdGUgYW5kXG4gKiB0aW1lIHN0cmluZy5cbiAqXG4gKiBOb3RlOiBkYXRlIHJlZ2V4IHBhdHRlcm4gZnJvbVxuICogaHR0cDovL3d3dy5wZWxhZ29kZXNpZ24uY29tL2Jsb2cvMjAwOS8wNS8yMC9pc28tODYwMS1kYXRlLXZhbGlkYXRpb24tdGhhdC1kb2VzbnQtc3Vjay9cbiAqIE5vdGU6IGlzRHVyYXRpb24gcmVnZXggcGF0dGVybiBmcm9tXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY3lsYy9jeWxjL2lzc3Vlcy8xMTkjaXNzdWVjb21tZW50LTk0MzU1MzNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRpbWVTdHJpbmdcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEdXJhdGlvbiAgV2hldGhlciB0byB2YWxpZGF0ZSBmb3IgYSBkdXJhdGlvbiBmb3JtYXQgb3Igbm90LlxuICogQHJldHVybiB7Ym9vbGVhbn0gIFJldHVybnMgZmFsc2UgaWYgdGhlIGdpdmVuIHN0cmluZyBpcyBub3QgdmFsaWQgSVNPODYwMVxuICogZm9ybWF0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUlTTzg2MDEoIGRhdGVUaW1lU3RyaW5nLCBpc0R1cmF0aW9uID0gZmFsc2UgKSB7XG5cdGlmICggISBpc1N0cmluZyggZGF0ZVRpbWVTdHJpbmcgKSApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Y29uc3QgcmVnZXggPSBpc0R1cmF0aW9uID9cblx0XHQvXihSXFxkKlxcLyk/UCg/OlxcZCsoPzpcXC5cXGQrKT9ZKT8oPzpcXGQrKD86XFwuXFxkKyk/TSk/KD86XFxkKyg/OlxcLlxcZCspP1cpPyg/OlxcZCsoPzpcXC5cXGQrKT9EKT8oPzpUKD86XFxkKyg/OlxcLlxcZCspP0gpPyg/OlxcZCsoPzpcXC5cXGQrKT9NKT8oPzpcXGQrKD86XFwuXFxkKyk/Uyk/KT8kLyA6XG5cdFx0L14oW1xcKy1dP1xcZHs0fSg/IVxcZHsyfVxcYikpKCgtPykoKDBbMS05XXwxWzAtMl0pKFxcMyhbMTJdXFxkfDBbMS05XXwzWzAxXSkpP3xXKFswLTRdXFxkfDVbMC0yXSkoLT9bMS03XSk/fCgwMFsxLTldfDBbMS05XVxcZHxbMTJdXFxkezJ9fDMoWzAtNV1cXGR8NlsxLTZdKSkpKFtUXFxzXSgoKFswMV1cXGR8MlswLTNdKSgoOj8pWzAtNV1cXGQpP3wyNFxcOj8wMCkoW1xcLixdXFxkKyg/ITopKT8pPyhcXDE3WzAtNV1cXGQoW1xcLixdXFxkKyk/KT8oW3paXXwoW1xcKy1dKShbMDFdXFxkfDJbMC0zXSk6PyhbMC01XVxcZCk/KT8pPyk/JC87XG5cdHJldHVybiByZWdleC50ZXN0KCBkYXRlVGltZVN0cmluZyApO1xufVxuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gc3RyaW5nIGlzIGEgdmFsaWQgSVNPODYwMSBmb3JtYXR0ZWQgZGF0ZSBhbmQgdGltZVxuICogc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVGltZVN0cmluZ1xuICogQHBhcmFtIHtib29sZWFufSBpc0R1cmF0aW9uICBXaGV0aGVyIHRvIGFzc2VydCBmb3IgYSBkdXJhdGlvbiBmb3JtYXQgb3Igbm90LlxuICogQHRocm93cyBJbnZhbGlkSVNPODYwMVN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0SVNPODYwMUlzVmFsaWQoIGRhdGVUaW1lU3RyaW5nLCBpc0R1cmF0aW9uID0gZmFsc2UgKSB7XG5cdGlmICggISB2YWxpZGF0ZUlTTzg2MDEoIGRhdGVUaW1lU3RyaW5nLCBpc0R1cmF0aW9uICkgKSB7XG5cdFx0dGhyb3cgbmV3IEludmFsaWRJU084NjAxU3RyaW5nKCBkYXRlVGltZVN0cmluZyApO1xuXHR9XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIHRpbWV6b25lIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFJldHVybnMgZmFsc2UgaWYgdGhlIGdpdmVuIHN0cmluZyBpcyBub3QgYSB2YWxpZCB0aW1lem9uZVxuICogc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVRpbWV6b25lKCB0aW1lem9uZSApIHtcblx0aWYgKCAhIGlzU3RyaW5nKCB0aW1lem9uZSApICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCBkdCA9IG1vbWVudC50ei56b25lKCB0aW1lem9uZSApO1xuXHRyZXR1cm4gZHQgIT09IG51bGw7XG59XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCB0aW1lem9uZSBzdHJpbmcgYW5kIHRocm93cyBhblxuICogZXhjZXB0aW9uIGlmIGl0IGlzbid0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuICogQHRocm93cyBJbnZhbGlkVGltZXpvbmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFRpbWV6b25lSXNWYWxpZCggdGltZXpvbmUgKSB7XG5cdGlmICggISB2YWxpZGF0ZVRpbWV6b25lKCB0aW1lem9uZSApICkge1xuXHRcdHRocm93IG5ldyBJbnZhbGlkVGltZXpvbmUoIHRpbWV6b25lICk7XG5cdH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGphdmFzY3JpcHQgRGF0ZVxuICogb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGUgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVJc0RhdGUoIGRhdGUgKSB7XG5cdHJldHVybiBkYXRlIGluc3RhbmNlb2YgRGF0ZTtcbn1cblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0SXNEYXRlKCBkYXRlICkge1xuXHRpZiAoICEgdmFsaWRhdGVJc0RhdGUoIGRhdGUgKSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0J1RoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgRGF0ZSdcblx0XHQpO1xuXHR9XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgdmFsaWQgb2Zmc2V0XG4gKlxuICogQ3VycmVudGx5IHRoaXMganVzdCB2YWxpZGF0ZXMgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgbnVtYmVyLiBFdmVudHVhbGx5IGl0XG4gKiBtaWdodCBjaGVjayB1cHBlciBhbmQgbG93ZXIgbGltaXRzLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICB0cnVlIG1lYW5zIGl0cyB2YWxpZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSXNPZmZzZXQoIG9mZnNldCApIHtcblx0cmV0dXJuIGlzTnVtYmVyKCBvZmZzZXQgKTtcbn1cblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgdmFsaWQgb2Zmc2V0LlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcbiAqIEB0aHJvd3MgVHlwZUVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRJc09mZnNldCggb2Zmc2V0ICkge1xuXHRpZiAoICEgdmFsaWRhdGVJc09mZnNldCggb2Zmc2V0ICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdCdPZmZzZXQgaXMgZXhwZWN0ZWQgdG8gYmUgYSBudW1iZXInXG5cdFx0KTtcblx0fVxufVxuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGNhcGl0YWxpemUsXG5cdG9taXQsXG5cdGlzTnVtYmVyLFxuXHRpc0VtcHR5LFxuXHRyZWR1Y2UsXG5cdGlzT2JqZWN0LFxuXHRpc1VuZGVmaW5lZCxcblx0aXNGdW5jdGlvbixcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCB7XG5cdEludmFsaWREYXRlVGltZSxcblx0SW52YWxpZEFyZ3VtZW50LFxuXHRJbnZhbGlkSVNPODYwMVN0cmluZyxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgeyBpbnN0YW5jZU9mIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgKiBhcyBhc3NlcnRpb25zIGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5pbXBvcnQgRHVyYXRpb24gZnJvbSAnLi9kdXJhdGlvbic7XG5pbXBvcnQge1xuXHRERUZBVUxUX1RJTUVaT05FX1NUUklORyxcblx0REVGQVVMVF9PRkZTRVQsXG5cdERFRkFVTFRfVkFMSURfTE9DQUxFLFxuXHRERUZBVUxUX0ZPUk1BVCxcbn0gZnJvbSAnLi9kZWZhdWx0cyc7XG5cbi8qKlxuICogQSBjb2xsZWN0aW9uIG9mIHN5bWJvbHMgdXNlZCBmb3IgXCJwcml2YXRlXCIgcHJvcGVydGllcyBpbiB0aGUgRGF0ZVRpbWUgb2JqZWN0LlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBcdHtcbiAqIFx0XHRkYXRldGltZTogU3ltYm9sXG4gKiBcdH1cbiAqL1xuY29uc3QgcHJpdmF0ZVByb3BlcnRpZXMgPSB7XG5cdGRhdGV0aW1lOiBTeW1ib2woICdEYXRlVGltZVByb3BlcnR5RGF0ZVRpbWUnICksXG59O1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBzeW1ib2xzIHVzZWQgZm9yIFwicHJpdmF0ZVwiIG1ldGhvZHMgaW4gdGhlIERhdGVUaW1lIG9iamVjdC5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogXHRnZXRVbml0TmFtZXM6IFN5bWJvbCxcbiAqIFx0Y3JlYXRlR2V0dGVyc0FuZFNldHRlcnM6IFN5bWJvbCxcbiAqIFx0ZXh0cmFjdE1vbWVudHNGcm9tRGF0ZVRpbWVzOiBTeW1ib2wsXG4gKiBcdG5vcm1hbGl6ZVVuaXROYW1lOiBTeW1ib2wsXG4gKiBcdG5vcm1hbGl6ZVVuaXRPYmplY3Q6IFN5bWJvbCxcbiAqIFx0bm9ybWFsaXplVW5pdFZhbHVlOiBTeW1ib2wsXG4gKiBcdH1cbiAqL1xuY29uc3QgcHJpdmF0ZU1ldGhvZHMgPSB7XG5cdGdldFVuaXROYW1lczogU3ltYm9sKCAnRGF0ZVRpbWVNZXRob2RHZXRVbml0TmFtZXMnICksXG5cdGNyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzOiBTeW1ib2woICdEYXRlVGltZU1ldGhvZENyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzJyApLFxuXHRleHRyYWN0TW9tZW50c0Zyb21EYXRlVGltZXM6IFN5bWJvbCggJ0RhdGVUaW1lTWV0aG9kRXh0cmFjdE1vbWVudHNGcm9tRGF0ZVRpbWVzJyApLFxuXHRub3JtYWxpemVVbml0TmFtZTogU3ltYm9sKCAnRGF0ZVRpbWVNZXRob2ROb3JtYWxpemVVbml0TmFtZScgKSxcblx0bm9ybWFsaXplVW5pdE9iamVjdDogU3ltYm9sKCAnRGF0ZVRpbWVNZXRob2ROb3JtYWxpemVVbml0T2JqZWN0JyApLFxuXHRub3JtYWxpemVVbml0VmFsdWU6IFN5bWJvbCggJ0RhdGVUaW1lTWV0aG9kTm9ybWFsaXplVW5pdFZhbHVlJyApLFxuXHRub3JtYWxpemVBcmd1bWVudHM6IFN5bWJvbCggJ0RhdGVUaW1lTWV0aG9kTm9ybWFsaXplQXJndW1lbnRzJyApLFxufTtcblxuY29uc3QgdmFsaWREYXRlVGltZVVuaXRzID0gW1xuXHQneWVhcicsXG5cdCdtb250aCcsXG5cdCdkYXknLFxuXHQnaG91cicsXG5cdCdtaW51dGUnLFxuXHQnc2Vjb25kJyxcblx0J21pbGxpc2Vjb25kJyxcbl07XG5cbi8qKlxuICogVGhlIERhdGVUaW1lIHZhbHVlIG9iamVjdCByZXByZXNlbnRzIGEgc2luZ2xlIHBvaW50IGluIHRpbWUuXG4gKlxuICogSW50ZXJuYWxseSwgdGhlIERhdGVUaW1lIGNsYXNzIGhlcmUgdXNlcyBgbW9tZW50YC4gIFRoaXMgaXMgYW4gYWJzdHJhY3Rpb25cbiAqIGxvb3NlbHkgZm9sbG93aW5nIHRoZSBhZGFwdGVyIHBhdHRlcm4gc28gdGhhdCB0aGVyZSBpcyBhIGNvbW1vbiBhcGkgdGhhdFxuICogY2FuIGJlIGRlcGVuZGVkIG9uIGlmIGluIHRoZSBmdXR1cmUgdGhlIGludGVybmFsIGxpYnJhcnkgaXMgc3dpdGNoZWQgdG9cbiAqIHNvbWV0aGluZyBkaWZmZXJlbnQgKHN1Y2ggYXMgTHV4b24pLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlVGltZSB7XG5cdC8qKlxuXHQgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBEYXRlVGltZSBjbGFzc1xuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaXNvODYwMURhdGVTdHJpbmdcblx0ICogQHBhcmFtIHtzdHJpbmd8bnVsbH0gdGltZXpvbmUgSWYgbnVsbCwgdGhlbiB0aW1lem9uZSBpcyBub3Qgc2V0LlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRpc284NjAxRGF0ZVN0cmluZyA9ICcnLFxuXHRcdHRpbWV6b25lID0gREVGQVVMVF9USU1FWk9ORV9TVFJJTkcsXG5cdFx0bG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEVcblx0KSB7XG5cdFx0aWYgKCBpc284NjAxRGF0ZVN0cmluZyAhPT0gJycgKSB7XG5cdFx0XHR0aGlzLmNvbnN0cnVjdG9yLmFzc2VydElTTzg2MDFJc1ZhbGlkKCBpc284NjAxRGF0ZVN0cmluZyApO1xuXHRcdH1cblx0XHR0aGlzLmNvbnN0cnVjdG9yLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdGlmICggdGltZXpvbmUgPT09IG51bGwgKSB7XG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdID0gaXNvODYwMURhdGVTdHJpbmcgPT09ICcnID9cblx0XHRcdFx0bW9tZW50LnV0YygpLmxvY2FsZSggbG9jYWxlICkgOlxuXHRcdFx0XHRtb21lbnQoIGlzbzg2MDFEYXRlU3RyaW5nIClcblx0XHRcdFx0XHQudXRjT2Zmc2V0KCBpc284NjAxRGF0ZVN0cmluZyApXG5cdFx0XHRcdFx0LmxvY2FsZSggbG9jYWxlICk7XG5cdFx0fSBlbHNlIGlmICggdGltZXpvbmUgPT09IHRoaXMuY29uc3RydWN0b3IuVElNRVpPTkVfTE9DQUwgKSB7XG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdID0gaXNvODYwMURhdGVTdHJpbmcgPT09ICcnID9cblx0XHRcdFx0bW9tZW50KCkubG9jYWxlKCBsb2NhbGUgKSA6XG5cdFx0XHRcdG1vbWVudCggaXNvODYwMURhdGVTdHJpbmcgKS5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmNvbnN0cnVjdG9yLmFzc2VydFRpbWV6b25lSXNWYWxpZCggdGltZXpvbmUgKTtcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0gPSBpc284NjAxRGF0ZVN0cmluZyA9PT0gJycgP1xuXHRcdFx0XHRtb21lbnQoKS50eiggdGltZXpvbmUgKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdFx0bW9tZW50LnR6KFxuXHRcdFx0XHRcdGlzbzg2MDFEYXRlU3RyaW5nLFxuXHRcdFx0XHRcdHRpbWV6b25lXG5cdFx0XHRcdCkubG9jYWxlKCBsb2NhbGUgKTtcblx0XHR9XG5cdFx0dGhpc1sgcHJpdmF0ZU1ldGhvZHMuY3JlYXRlR2V0dGVyc0FuZFNldHRlcnMgXSgpO1xuXHRcdE9iamVjdC5mcmVlemUoIHRoaXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhlIGdpdmVuIGxvY2FsZSBpcyBhIHZhbGlkIGxvY2FsZS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG1lYW5zIGl0IGlzIHZhbGlkXG5cdCAqL1xuXHRzdGF0aWMgdmFsaWRhdGVMb2NhbGUoIGxvY2FsZSApIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZUxvY2FsZSggbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyBpZiB0aGUgZ2l2ZW4gbG9jYWxlIGlzIHZhbGlkIGFuZCB0aHJvd3MgYW4gZXJyb3IgaWYgbm90LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEB0aHJvd3MgSW52YWxpZExvY2FsZVxuXHQgKi9cblx0c3RhdGljIGFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApIHtcblx0XHRhc3NlcnRpb25zLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyBpZiB0aGUgZ2l2ZW4gSVNPODYwMSBzdHJpbmcgaXMgdmFsaWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVGltZVN0cmluZ1xuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlSVNPODYwMSggZGF0ZVRpbWVTdHJpbmcgKSB7XG5cdFx0cmV0dXJuIGFzc2VydGlvbnMudmFsaWRhdGVJU084NjAxKCBkYXRlVGltZVN0cmluZyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgaWYgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIElTTyA4NjAxIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUaW1lU3RyaW5nXG5cdCAqIEB0aHJvd3MgSW52YWxpZElTTzg2MDFTdHJpbmdcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJU084NjAxSXNWYWxpZCggZGF0ZVRpbWVTdHJpbmcgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRJU084NjAxSXNWYWxpZCggZGF0ZVRpbWVTdHJpbmcgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIHRpbWV6b25lXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlVGltZXpvbmUoIHRpbWV6b25lICkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlVGltZXpvbmUoIHRpbWV6b25lICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCB0aW1lem9uZSBzdHJpbmcuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKiBAdGhyb3dzIEludmFsaWRUaW1lem9uZVxuXHQgKi9cblx0c3RhdGljIGFzc2VydFRpbWV6b25lSXNWYWxpZCggdGltZXpvbmUgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRUaW1lem9uZUlzVmFsaWQoIHRpbWV6b25lICk7XG5cdH1cblxuXHQvKipcblx0ICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgdmFsaWQgb2Zmc2V0XG5cdCAqXG5cdCAqIEN1cnJlbnRseSB0aGlzIGp1c3QgdmFsaWRhdGVzIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIG51bWJlci4gRXZlbnR1YWxseSBpdFxuXHQgKiBtaWdodCBjaGVjayB1cHBlciBhbmQgbG93ZXIgbGltaXRzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICB0cnVlIG1lYW5zIGl0cyB2YWxpZC5cblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUlzT2Zmc2V0KCBvZmZzZXQgKSB7XG5cdFx0cmV0dXJuIGFzc2VydGlvbnMudmFsaWRhdGVJc09mZnNldCggb2Zmc2V0ICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIG9mZnNldC5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKi9cblx0c3RhdGljIGFzc2VydElzT2Zmc2V0KCBvZmZzZXQgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRJc09mZnNldCggb2Zmc2V0ICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqXG5cdCAqIEBwYXJhbSB7RGF0ZVRpbWV9IGRhdGV0aW1lXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IHJldHVybnMgdHJ1ZSBpZiBpdCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlSXNEYXRlVGltZSggZGF0ZXRpbWUgKSB7XG5cdFx0cmV0dXJuIGluc3RhbmNlT2YoIGRhdGV0aW1lLCAnRGF0ZVRpbWUnICkgfHxcblx0XHRcdGluc3RhbmNlT2YoIGRhdGV0aW1lLCAnU2VydmVyRGF0ZVRpbWUnICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBkYXRldGltZVxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKi9cblx0c3RhdGljIGFzc2VydElzRGF0ZVRpbWUoIGRhdGV0aW1lICkge1xuXHRcdGlmICggISB0aGlzLnZhbGlkYXRlSXNEYXRlVGltZSggZGF0ZXRpbWUgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuIGluc3RhbmNlIG9mIERhdGVUaW1lJ1xuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIHRoZSBqYXZhc2NyaXB0IERhdGVcblx0ICogb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGV9IGRhdGVcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGUgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlSXNEYXRlKCBkYXRlICkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlSXNEYXRlKCBkYXRlICk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGV9IGRhdGVcblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc0RhdGUoIGRhdGUgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRJc0RhdGUoIGRhdGUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWUgYW5kIGlzXG5cdCAqIGEgXCJ2YWxpZFwiIGRhdGV0aW1lIChtZWFuaW5nIHRoZSBpbnN0YW5jZSB3YXMgY29uc3RydWN0ZWQgd2l0aCB2YWxpZFxuXHQgKiBhcmd1bWVudHMpLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBkYXRldGltZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIGlzVmFsaWQoIGRhdGV0aW1lICkge1xuXHRcdHJldHVybiB0aGlzLnZhbGlkYXRlSXNEYXRlVGltZSggZGF0ZXRpbWUgKSAmJiBkYXRldGltZS5pc1ZhbGlkKCk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZSBhbmQgaXNcblx0ICogYSBcInZhbGlkXCIgZGF0ZXRpbWUgKG1lYW5pbmcgdGhlIGluc3RhbmNlIHdhcyBjb25zdHJ1Y3RlZCB3aXRoIHZhbGlkXG5cdCAqIGFyZ3VtZW50cylcblx0ICpcblx0ICogQHBhcmFtIHtEYXRlVGltZX0gZGF0ZXRpbWVcblx0ICogQHRocm93cyBJbnZhbGlkRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc1ZhbGlkKCBkYXRldGltZSApIHtcblx0XHRpZiAoICEgdGhpcy5pc1ZhbGlkKCBkYXRldGltZSApICkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWREYXRlVGltZSggZGF0ZXRpbWUgKTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVBcmd1bWVudHMgXSggZGF0ZVZhbHVlLCB0aW1lem9uZSwgbG9jYWxlICkge1xuXHRcdHJldHVybiB0aGlzLm5hbWUgPT09ICdTZXJ2ZXJEYXRlVGltZScgP1xuXHRcdFx0WyBkYXRlVmFsdWUsIGxvY2FsZSwgdGltZXpvbmUgXSA6XG5cdFx0XHRbIGRhdGVWYWx1ZSwgdGltZXpvbmUsIGxvY2FsZSBdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgcHJpdmF0ZSBpbnRlcm5hbCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBleHRyYWN0IGFsbCBtb21lbnRcblx0ICogaW5zdGFuY2VzIGZyb20gdGhlIHByb3ZpZGVkIERhdGVUaW1lcyAocGFzc2VkIGluIGFzIGFyZ3VtZW50cykuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Li4uRGF0ZVRpbWV9IGRhdGV0aW1lc1xuXHQgKiBAcmV0dXJuIHttb21lbnRbXX0gQW4gYXJyYXkgb2YgbW9tZW50IGluc3RhbmNlcyBleHRyYWN0ZWQgZnJvbSB0aGVcblx0ICogRGF0ZVRpbWVzXG5cdCAqL1xuXHRzdGF0aWMgWyBwcml2YXRlTWV0aG9kcy5leHRyYWN0TW9tZW50c0Zyb21EYXRlVGltZXMgXSggLi4uZGF0ZXRpbWVzICkge1xuXHRcdHJldHVybiBkYXRldGltZXMubWFwKCAoIGRhdGV0aW1lICkgPT4ge1xuXHRcdFx0dGhpcy5hc3NlcnRJc0RhdGVUaW1lKCBkYXRldGltZSApO1xuXHRcdFx0cmV0dXJuIGRhdGV0aW1lWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHaXZlbiBhbiBpbmRlZmluaXRlIG51bWJlciBvZiBEYXRlVGltZXMgYXMgYXJndW1lbnRzLCB0aGlzIHdpbGwgcmV0dXJuIGFcblx0ICogbmV3IERhdGVUaW1lIHRoYXQgcmVwcmVzZW50cyB0aGUgbGF0ZXN0IHBvaW50IGluIHRpbWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Li4uRGF0ZVRpbWV9IGRhdGV0aW1lc1xuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQSBuZXcgRGF0ZVRpbWUgcmVwcmVzZW50aW5nIHRoZSBsYXRlc3QgcG9pbnQgb2YgdGltZS5cblx0ICovXG5cdHN0YXRpYyBtYXgoIC4uLmRhdGV0aW1lcyApIHtcblx0XHRyZXR1cm4gdGhpcy5mcm9tTW9tZW50KFxuXHRcdFx0bW9tZW50Lm1heChcblx0XHRcdFx0dGhpc1sgcHJpdmF0ZU1ldGhvZHMuZXh0cmFjdE1vbWVudHNGcm9tRGF0ZVRpbWVzIF0oXG5cdFx0XHRcdFx0Li4uZGF0ZXRpbWVzXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdpdmVuIGFuIGluZGVmaW5pdGUgbnVtYmVyIG9mIERhdGVUaW1lcyBhcyBhcmd1bWVudHMsIHRoaXMgd2lsbCByZXR1cm4gYVxuXHQgKiBuZXcgRGF0ZVRpbWUgdGhhdCByZXByZXNlbnRzIHRoZSBlYXJsaWVzdCBwb2ludCBpbiB0aW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0gey4uLkRhdGVUaW1lfSBkYXRldGltZXNcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEEgbmV3IERhdGVUaW1lIHJlcHJlc2VudGluZyB0aGUgZWFybGllc3QgcG9pbnQgaW5cblx0ICogdGltZS5cblx0ICovXG5cdHN0YXRpYyBtaW4oIC4uLmRhdGV0aW1lcyApIHtcblx0XHRyZXR1cm4gdGhpcy5mcm9tTW9tZW50KFxuXHRcdFx0bW9tZW50Lm1pbihcblx0XHRcdFx0dGhpc1sgcHJpdmF0ZU1ldGhvZHMuZXh0cmFjdE1vbWVudHNGcm9tRGF0ZVRpbWVzIF0oXG5cdFx0XHRcdFx0Li4uZGF0ZXRpbWVzXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGFuIGluc3RhbmNlIG9mIG1vbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHttb21lbnR9IG1vbWVudEluc3RhbmNlXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGZyb21Nb21lbnQoIG1vbWVudEluc3RhbmNlICkge1xuXHRcdGlmICggISBtb21lbnQuaXNNb21lbnQoIG1vbWVudEluc3RhbmNlICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnUmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgbW9tZW50LicgKTtcblx0XHR9XG5cblx0XHQvLyB0aGlzIHdvdWxkIGFjY291bnQgZm9yIGNsaWVudCBjb2RlIHRoYXQgaXMgdXNpbmcgYG1vbWVudGAgYnV0IG5vdFxuXHRcdC8vIHVzaW5nIGBtb21lbnQtdGltZXpvbmVgLlxuXHRcdHJldHVybiBpc0Z1bmN0aW9uKCBtb21lbnRJbnN0YW5jZS50eiApICYmXG5cdFx0XHQhIGlzVW5kZWZpbmVkKCBtb21lbnRJbnN0YW5jZS50eigpICkgJiZcblx0XHRcdG1vbWVudEluc3RhbmNlLnR6KCkgIT09ICdVVEMnID9cblx0XHRcdG5ldyB0aGlzKFxuXHRcdFx0XHQuLi50aGlzWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVBcmd1bWVudHMgXShcblx0XHRcdFx0XHRtb21lbnRJbnN0YW5jZS50b0lTT1N0cmluZygpLFxuXHRcdFx0XHRcdG1vbWVudEluc3RhbmNlLnR6KCksXG5cdFx0XHRcdFx0bW9tZW50SW5zdGFuY2UubG9jYWxlKClcblx0XHRcdFx0KVxuXHRcdFx0KSA6XG5cdFx0XHRuZXcgdGhpcyhcblx0XHRcdFx0Li4udGhpc1sgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplQXJndW1lbnRzIF0oXG5cdFx0XHRcdFx0bW9tZW50SW5zdGFuY2UudG9JU09TdHJpbmcoIHRydWUgKSxcblx0XHRcdFx0XHRudWxsLFxuXHRcdFx0XHRcdG1vbWVudEluc3RhbmNlLmxvY2FsZSgpXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIGZyb20gYW4gSVNPIDg2MDEgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gSVNPU3RyaW5nXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGZyb21JU08oXG5cdFx0SVNPU3RyaW5nLFxuXHRcdHRpbWV6b25lID0gREVGQVVMVF9USU1FWk9ORV9TVFJJTkcsXG5cdFx0bG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEVcblx0KSB7XG5cdFx0aWYgKCBpc0VtcHR5KCBJU09TdHJpbmcgKSApIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkSVNPODYwMVN0cmluZyggSVNPU3RyaW5nICk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXcgdGhpcyhcblx0XHRcdC4uLnRoaXNbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZUFyZ3VtZW50cyBdKFxuXHRcdFx0XHRJU09TdHJpbmcsXG5cdFx0XHRcdHRpbWV6b25lLFxuXHRcdFx0XHRsb2NhbGVcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGFuIElTTyA4NjAxIFN0cmluZ1xuXHQgKiBEaWZmZXJzIHdpdGggYGZyb21JU09gIGluIHRoYXQgdGhpcyBhbGxvd3MgcGFzc2luZyBhIG9mZnNldCB2YWx1ZVxuXHQgKiBpbnN0ZWFkIG9mIGEgdGltZXpvbmUgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gSVNPU3RyaW5nXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgIEluIG1pbnV0ZXMgdW5sZXNzID4gLTE2IG9yIDwgLTE2IGluIHdoaWNoIGNhc2UgaXRcblx0ICogaXMgdHJlYXRlZCBhcyBob3Vycy5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gIEFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgZnJvbUlTT1dpdGhPZmZzZXQoXG5cdFx0SVNPU3RyaW5nLFxuXHRcdG9mZnNldCA9IERFRkFVTFRfT0ZGU0VULFxuXHRcdGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFXG5cdCkge1xuXHRcdHRoaXMuYXNzZXJ0SVNPODYwMUlzVmFsaWQoIElTT1N0cmluZyApO1xuXHRcdHRoaXMuYXNzZXJ0SXNPZmZzZXQoIG9mZnNldCApO1xuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0Y29uc3QgZGF0ZXRpbWUgPSBtb21lbnQudXRjKCBJU09TdHJpbmcgKVxuXHRcdFx0LnV0Y09mZnNldCggb2Zmc2V0LCB0cnVlIClcblx0XHRcdC5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQoIGRhdGV0aW1lICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIGZyb20gYSBqYXZhc2NyaXB0IERhdGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGV9IGRhdGVcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRpbWV6b25lXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tSlNEYXRlKFxuXHRcdGRhdGUsXG5cdFx0dGltZXpvbmUgPSBERUZBVUxUX1RJTUVaT05FX1NUUklORyxcblx0XHRsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRVxuXHQpIHtcblx0XHR0aGlzLmFzc2VydElzRGF0ZSggZGF0ZSApO1xuXHRcdHRoaXMuYXNzZXJ0VGltZXpvbmVJc1ZhbGlkKCB0aW1lem9uZSApO1xuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0cmV0dXJuIHRoaXMuZnJvbU1vbWVudChcblx0XHRcdG1vbWVudCggZGF0ZSApLnR6KCB0aW1lem9uZSApLmxvY2FsZSggbG9jYWxlIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRldGltZSBmcm9tIGEgamF2YXNjcmlwdCBEYXRlIG9iamVjdC5cblx0ICpcblx0ICogVGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGlzIGFuZCBmcm9tSlNEYXRlIGlzIHRoYXQgdGhpcyBjYW4gYmUgc2V0IHdpdGhcblx0ICogYW4gb2Zmc2V0IHZzIGEgdGltZXpvbmUgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGV9IGRhdGVcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgZnJvbUpTRGF0ZVdpdGhPZmZzZXQoXG5cdFx0ZGF0ZSxcblx0XHRvZmZzZXQgPSBERUZBVUxUX09GRlNFVCxcblx0XHRsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRVxuXHQpIHtcblx0XHR0aGlzLmFzc2VydElzRGF0ZSggZGF0ZSApO1xuXHRcdHRoaXMuYXNzZXJ0SXNPZmZzZXQoIG9mZnNldCApO1xuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0cmV0dXJuIHRoaXMuZnJvbU1vbWVudChcblx0XHRcdG1vbWVudCggZGF0ZSApLnV0Y09mZnNldCggb2Zmc2V0ICkubG9jYWxlKCBsb2NhbGUgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIChpbiBVVEMpIHdpdGggbWlsbGlzZWNvbmRzIGZyb20gZXBvY2guXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBtaWxsaXNlY29uZHNcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKi9cblx0c3RhdGljIGZyb21NaWxsaXNlY29uZHMoIG1pbGxpc2Vjb25kcywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUgKSB7XG5cdFx0dGhpcy5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0XHRpZiAoICEgaXNOdW1iZXIoIG1pbGxpc2Vjb25kcyApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ1Byb3ZpZGVkIHZhbHVlIG11c3QgYmUgYSBudW1iZXIgJyArXG5cdFx0XHRcdCdyZXByZXNlbnRpbmcgbWlsbGlzZWNvbmRzIGZyb20gdGhlIGVwb2NoJyApO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5mcm9tTW9tZW50KFxuXHRcdFx0bW9tZW50KCBtaWxsaXNlY29uZHMgKS51dGMoKS5sb2NhbGUoIGxvY2FsZSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgaW4gVVRDIHdpdGggc2Vjb25kcyBmcm9tIHRoZSBlcG9jaC5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IHNlY29uZHNcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBmcm9tVW5peCggc2Vjb25kcywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUgKSB7XG5cdFx0dGhpcy5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0XHRpZiAoICEgaXNOdW1iZXIoIHNlY29uZHMgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdQcm92aWRlZCB2YWx1ZSBtdXN0IGJlIGEgbnVtYmVyICcgK1xuXHRcdFx0XHQncmVwcmVzZW50aW5nIHNlY29uZHMgZnJvbSB0aGUgZXBvY2gnICk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQoXG5cdFx0XHRtb21lbnQudW5peCggc2Vjb25kcyApLnV0YygpLmxvY2FsZSggbG9jYWxlIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGFuIG9iamVjdCBvZiB2YWx1ZXMgYXNzdW1pbmcgaXRzIGluIFwibG9jYWxcIlxuXHQgKiB0aW1lIChpZiBydW4gdmlhIGJyb3dzZXIgb3Igc2VydmVyIGlmIHJ1biBzZXJ2ZXIgc2lkZSkuXG5cdCAqXG5cdCAqIFRoZSBvYmplY3QgaXMgZXhwZWN0ZWQgdG8gYmUgYSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGluc3RhbmNlIGluIHRpbWU6XG5cdCAqIEVnLlxuXHQgKiB7IHllYXI6IDIwMTgsIG1vbnRoOiAxMiwgZGF5OiAyNSwgaG91cjogMCwgbWludXRlOiAxNSwgc2Vjb25kczogMCB9XG5cdCAqXG5cdCAqIFBhc3MgYW4gZW1wdHkgdmFsdWVzIHZhbHVlIGlmIHlvdSB3YW50IHRoZSBpbnN0YW5jZSBpbiB0aW1lIHRvIHJlcHJlc2VudFxuXHQgKiBcIm5vd1wiLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEB0aHJvd3MgSW52YWxpZEFyZ3VtZW50XG5cdCAqL1xuXHRzdGF0aWMgZnJvbUxvY2FsKCB2YWx1ZXMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0dmFsdWVzID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE9iamVjdCBdKCB2YWx1ZXMgKTtcblx0XHRjb25zdCBkYXRldGltZSA9IGlzRW1wdHkoIHZhbHVlcyApID9cblx0XHRcdG1vbWVudCgpLmxvY2FsZSggbG9jYWxlICkgOlxuXHRcdFx0bW9tZW50KCB2YWx1ZXMgKS5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdGlmICggZGF0ZXRpbWUuaXNWYWxpZCgpICE9PSB0cnVlICkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudChcblx0XHRcdFx0J0RvdWJsZS1jaGVjayB0aGUgdmFsdWVzIHlvdSBzZW50IGluLicsXG5cdFx0XHRcdHZhbHVlc1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuZnJvbU1vbWVudCggZGF0ZXRpbWUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBvYmplY3Qgb2YgdmFsdWVzIGFuZCBhc3N1bWVzIGl0cyBpblxuXHQgKiAnVVRDJy5cblx0ICpcblx0ICogVGhlIG9iamVjdCBpcyBleHBlY3RlZCB0byBiZSBhIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgaW5zdGFuY2UgaW4gdGltZTpcblx0ICogRWcuXG5cdCAqIHsgeWVhcjogMjAxOCwgbW9udGg6IDEyLCBkYXk6IDI1LCBob3VyOiAwLCBtaW51dGU6IDE1LCBzZWNvbmRzOiAwIH1cblx0ICpcblx0ICogQW55IHVuaXRzIG5vdCBzcGVjaWZpZWQgd2lsbCBiZSBhc3N1bWVkIHRvIGJlIGAwYC5cblx0ICpcblx0ICogUGFzcyBhbiBlbXB0eSB2YWx1ZXMgdmFsdWUgaWYgeW91IHdhbnQgdGhlIGluc3RhbmNlIGluIHRpbWUgdG8gcmVwcmVzZW50XG5cdCAqIFwibm93XCIuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXNcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICogQHRocm93cyBJbnZhbGlkQXJndW1lbnRcblx0ICovXG5cdHN0YXRpYyB1dGMoIHZhbHVlcywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUgKSB7XG5cdFx0dGhpcy5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0XHR2YWx1ZXMgPSB0aGlzWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0T2JqZWN0IF0oIHZhbHVlcyApO1xuXHRcdGNvbnN0IGRhdGV0aW1lID0gaXNFbXB0eSggdmFsdWVzICkgP1xuXHRcdFx0bW9tZW50LnV0YygpLmxvY2FsZSggbG9jYWxlICkgOlxuXHRcdFx0bW9tZW50LnV0YyggdmFsdWVzICkubG9jYWxlKCBsb2NhbGUgKTtcblx0XHRpZiAoIGRhdGV0aW1lLmlzVmFsaWQoKSAhPT0gdHJ1ZSApIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnQoXG5cdFx0XHRcdCdEb3VibGUtY2hlY2sgdGhlIHZhbHVlcyBzZW50IGluLicsXG5cdFx0XHRcdHZhbHVlc1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuZnJvbU1vbWVudCggZGF0ZXRpbWUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuXHQgKlxuXHQgKiBUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgY2FuIGhhdmU6XG5cdCAqIC0gYW55IG9mIHRoZSBEYXRlVGltZSB1bml0cyAoJ3llYXInLCAnbW9udGgnLCBldGMpXG5cdCAqIC0gJ2xvY2FsZScgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBsb2NhbGVcblx0ICogLSAndGltZXpvbmUnIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdGltZXpvbmVcblx0ICogLSAnb2Zmc2V0JyBhIG51bWJlciByZXByZXNlbnRpbmcgdGhlIG9mZnNldCBmcm9tIFVUQyB0aGlzIGluc3RhbmNlIGluXG5cdCAqIHRpbWUgcmVwcmVzZW50cy5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHZhbHVlc1xuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tT2JqZWN0KCB2YWx1ZXMgKSB7XG5cdFx0Y29uc3QgbG9jYWxlID0gdmFsdWVzLmxvY2FsZSB8fCBERUZBVUxUX1ZBTElEX0xPQ0FMRTtcblx0XHRjb25zdCB0aW1lem9uZSA9IHZhbHVlcy50aW1lem9uZSB8fCBERUZBVUxUX1RJTUVaT05FX1NUUklORztcblx0XHRjb25zdCBvZmZzZXQgPSBpc1VuZGVmaW5lZCggdmFsdWVzLm9mZnNldCApID9cblx0XHRcdG51bGwgOlxuXHRcdFx0dmFsdWVzLm9mZnNldDtcblx0XHRsZXQgdmFsdWVzRm9yQ29uc3RydWN0ID0gb21pdChcblx0XHRcdHZhbHVlcyxcblx0XHRcdFsgJ2xvY2FsZScsICd0aW1lem9uZScsICdvZmZzZXQnIF1cblx0XHQpO1xuXG5cdFx0dGhpcy5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblxuXHRcdGlmICggb2Zmc2V0ICE9PSBudWxsICkge1xuXHRcdFx0dGhpcy5hc3NlcnRJc09mZnNldCggb2Zmc2V0ICk7XG5cdFx0XHR2YWx1ZXNGb3JDb25zdHJ1Y3QgPSB0aGlzWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0T2JqZWN0IF0oXG5cdFx0XHRcdHZhbHVlc0ZvckNvbnN0cnVjdFxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IGRhdGV0aW1lID0gaXNFbXB0eSggdmFsdWVzRm9yQ29uc3RydWN0ICkgP1xuXHRcdFx0XHRtb21lbnQoKS51dGNPZmZzZXQoIG9mZnNldCwgdHJ1ZSApLmxvY2FsZSggbG9jYWxlICkgOlxuXHRcdFx0XHRtb21lbnQudXRjKCB2YWx1ZXNGb3JDb25zdHJ1Y3QgKVxuXHRcdFx0XHRcdC51dGNPZmZzZXQoIG9mZnNldCwgdHJ1ZSApXG5cdFx0XHRcdFx0LmxvY2FsZSggbG9jYWxlICk7XG5cdFx0XHRpZiAoIGRhdGV0aW1lLmlzVmFsaWQoKSAhPT0gdHJ1ZSApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudChcblx0XHRcdFx0XHQnRG91YmxlLWNoZWNrIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBzZW50IGluLicsXG5cdFx0XHRcdFx0dmFsdWVzXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5mcm9tTW9tZW50KCBkYXRldGltZSApO1xuXHRcdH1cblxuXHRcdGlmICggdGltZXpvbmUgPT09IHRoaXMuVElNRVpPTkVfTE9DQUwgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5mcm9tTG9jYWwoIHZhbHVlc0ZvckNvbnN0cnVjdCwgbG9jYWxlICk7XG5cdFx0fVxuXG5cdFx0dGhpcy5hc3NlcnRUaW1lem9uZUlzVmFsaWQoIHRpbWV6b25lICk7XG5cblx0XHR2YWx1ZXNGb3JDb25zdHJ1Y3QgPSB0aGlzWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0T2JqZWN0IF0oXG5cdFx0XHR2YWx1ZXNGb3JDb25zdHJ1Y3Rcblx0XHQpO1xuXHRcdGNvbnN0IGRhdGV0aW1lID0gbW9tZW50LnR6KCB2YWx1ZXNGb3JDb25zdHJ1Y3QsIHRpbWV6b25lIClcblx0XHRcdC5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdGlmICggZGF0ZXRpbWUuaXNWYWxpZCgpICE9PSB0cnVlICkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudChcblx0XHRcdFx0J0RvdWJsZS1jaGVjayB0aGUgY29uZmlndXJhdGlvbiBvYmplY3Qgc2VudCBpbi4nLFxuXHRcdFx0XHR2YWx1ZXNcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQoIGRhdGV0aW1lICk7XG5cdH1cblxuXHQvKipcblx0ICogTW9tZW50IHVzZXMgZGlmZmVyZW50IG5hbWVzIGZvciBzb21lIHVuaXQgZ2V0dGVycy9zZXR0ZXJzL3Byb3BlcnRpZXMgc29cblx0ICogdGhpcyBpcyB1c2VkIHRvIG5vcm1hbGl6ZSBhIGdpdmVuIHVuaXQgbmFtZSB0byB3aGF0IG1vbWVudCB1c2VzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVRvTm9ybWFsaXplXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gIE5vcm1hbGl6ZWQgdW5pdCBuYW1lLlxuXHQgKi9cblx0c3RhdGljIFsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE5hbWUgXSggbmFtZVRvTm9ybWFsaXplICkge1xuXHRcdGNvbnN0IG1hcCA9IHtcblx0XHRcdGRheTogJ2RhdGUnLFxuXHRcdFx0ZGF5czogJ2RheScsXG5cdFx0XHRkYXRlOiAnZGF5Jyxcblx0XHRcdHllYXJzOiAneWVhcicsXG5cdFx0XHRtb250aHM6ICdtb250aCcsXG5cdFx0XHRtaWxsaXNlY29uZHM6ICdtaWxsaXNlY29uZCcsXG5cdFx0XHRtaW51dGVzOiAnbWludXRlJyxcblx0XHRcdHNlY29uZHM6ICdzZWNvbmQnLFxuXHRcdFx0aG91cnM6ICdob3VyJyxcblx0XHR9O1xuXHRcdHJldHVybiBtYXBbIG5hbWVUb05vcm1hbGl6ZSBdID9cblx0XHRcdG1hcFsgbmFtZVRvTm9ybWFsaXplIF0gOlxuXHRcdFx0bmFtZVRvTm9ybWFsaXplO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgbm9ybWFsaXppbmcgdW5pdCB2YWx1ZXMgZm9yIGludGVybmFsIGxpYnJhcnkgdXNlLlxuXHQgKlxuXHQgKiBGb3IgZXhhbXBsZSwgbW9tZW50IHplcm8gaW5kZXhlcyBtb250aHMuIERhdGVUaW1lIGRvZXMgbm90LCBzbyB0aGlzXG5cdCAqIG1ldGhvZCBoZWxwcyB3aXRoIG5vcm1hbGl6aW5nIG1vbnRoIHZhbHVlcyBmb3IgYm90aCBzZXR0aW5nICh1c2VkIGJ5XG5cdCAqIG1vbWVudCkgYW5kIGdldHRpbmcgKHJldHVybmVkIHRvIGNsaWVudCkuICBUaGlzIGFsbG93cyBjbGllbnQgY29kZVxuXHQgKiB0byBleHBlY3QgbW9udGhzIGluIERhdGVUaW1lIHRvIGJlIGhhbmRsZWQgd2l0aCBhIG5vbi16ZXJvIGluZGV4LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdW5pdCBUaGUgdW5pdCB0byBiZSBub3JtYWxpemVkXG5cdCAqIEBwYXJhbSB7bWl4ZWR9ICB2YWx1ZSBUaGUgdmFsdWUgZm9yIHRoYXQgdW5pdFxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNldCAgV2hldGhlciB0aGlzIHNob3VsZCBub3JtYWxpemUgZm9yIHNldHRpbmcgb3Jcblx0ICogZ2V0dGluZy5cblx0ICogQHJldHVybiB7bWl4ZWR9ICBUaGUgbm9ybWFsaXplZCB2YWx1ZS5cblx0ICovXG5cdHN0YXRpYyBbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRWYWx1ZSBdKCB1bml0LCB2YWx1ZSwgc2V0ID0gdHJ1ZSApIHtcblx0XHRpZiAoIHVuaXQgPT09ICdtb250aCcgKSB7XG5cdFx0XHR2YWx1ZSA9IHNldCA/IHZhbHVlIC0gMSA6IHZhbHVlICsgMTtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdpdmVuIGEgc2ltcGxlIG9iamVjdCBjb250YWluaW5nIHVuaXRzLCB0aGlzIG5vcm1hbGl6ZXMgdGhlIG9iamVjdCB0b1xuXHQgKiB3aGF0IG1vbWVudCByZWNvZ25pemVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gc2V0T2JqZWN0XG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0ICB0cnVlIGlmIHNldHRpbmcgdGhlIG9iamVjdCwgZmFsc2UgaWYgZ2V0dGluZyB0aGVcblx0ICogb2JqZWN0XG5cdCAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5vcm1hbGl6ZWQgb2JqZWN0LlxuXHQgKi9cblx0c3RhdGljIFsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE9iamVjdCBdKCBzZXRPYmplY3QsIHNldCA9IHRydWUgKSB7XG5cdFx0aWYgKCAhIGlzT2JqZWN0KCBzZXRPYmplY3QgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgaW5jb21pbmcgdmFsdWUgbXVzdCBiZSBhbiBvYmplY3QnXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVkdWNlKCBzZXRPYmplY3QsICggcmVzdWx0LCB2YWx1ZSwga2V5ICkgPT4ge1xuXHRcdFx0a2V5ID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE5hbWUgXSgga2V5ICk7XG5cdFx0XHRyZXN1bHRbIGtleSBdID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdFZhbHVlIF0oXG5cdFx0XHRcdGtleSxcblx0XHRcdFx0dmFsdWUsXG5cdFx0XHRcdHNldFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSwge30gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBkYXRlIGFuZCB0aW1lIHVuaXQgbmFtZXNcblx0ICpcblx0ICogQHJldHVybiB7c3RyaW5nW119IEFuIGFycmF5IG9mIHVuaXQgbmFtZXNcblx0ICovXG5cdFsgcHJpdmF0ZU1ldGhvZHMuZ2V0VW5pdE5hbWVzIF0oKSB7XG5cdFx0cmV0dXJuIHZhbGlkRGF0ZVRpbWVVbml0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIHRoZSB2YXJpb3VzIGdldHRlciBhbmQgc2V0dGVycyBmb3IgdGhlIHZhbHVlIG9iamVjdC5cblx0ICovXG5cdFsgcHJpdmF0ZU1ldGhvZHMuY3JlYXRlR2V0dGVyc0FuZFNldHRlcnMgXSgpIHtcblx0XHR0aGlzWyBwcml2YXRlTWV0aG9kcy5nZXRVbml0TmFtZXMgXSgpLmZvckVhY2goXG5cdFx0XHQoIHVuaXROYW1lICkgPT4ge1xuXHRcdFx0XHQvLyBjcmVhdGVzIGFjY2Vzc29yIGZvciBnZXR0aW5nIHRoZSB1bml0IHZhbHVlIHZpYSBhXG5cdFx0XHRcdC8vIHByb3BlcnR5IChlZy4gaW5zdGFuY2UuaG91cilcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCB0aGlzLCB1bml0TmFtZSwge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1ldGhvZE5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0TmFtZSBdKCB1bml0TmFtZSApO1xuXHRcdFx0XHRcdFx0Y29uc3QgdW5pdFZhbHVlID0gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHRcdFx0XHRbIG1ldGhvZE5hbWUgXSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3JbIHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRWYWx1ZSBdKFxuXHRcdFx0XHRcdFx0XHR1bml0TmFtZSxcblx0XHRcdFx0XHRcdFx0dW5pdFZhbHVlLFxuXHRcdFx0XHRcdFx0XHRmYWxzZVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9ICk7XG5cdFx0XHRcdC8vIGNyZWF0ZXMgYSBmbHVlbnQgc2V0dGVyIGZvciB0aGUgdmFsdWUuXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggdGhpcywgJ3NldCcgKyBjYXBpdGFsaXplKCB1bml0TmFtZSApLCB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuICggdmFsdWUgKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnNldCggeyBbIHVuaXROYW1lIF06IHZhbHVlIH0gKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogVXNlZCB0byBzZXQgdmFyaW91cyBwYXJ0cyBvZiB0aGUgZGF0ZXRpbWUgc3RyaW5nIGFuZCByZXR1cm5zIGEgTkVXXG5cdCAqIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqXG5cdCAqIE5vdGU6IHRoaXMgd2lsbCBjb25zdHJ1Y3QgYSBEYXRlVGltZSBldmVuIHdpdGggaW52YWxpZCB1bml0cy4gTWFrZSB1c2Ugb2Zcblx0ICogYGlzVmFsaWQoKWAgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGluc3RhbmNlIGlzIGEgdmFsaWQgRGF0ZVRpbWUgb3Igbm90LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3t9fSBzZXRPYmplY3QgQW4gb2JqZWN0IHdoZXJlIGtleXMgYXJlIHRoZSB1bml0cy5cblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lLlxuXHQgKi9cblx0c2V0KCBzZXRPYmplY3QgPSB7fSApIHtcblx0XHRzZXRPYmplY3QgPSB0aGlzLmNvbnN0cnVjdG9yWyBwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0T2JqZWN0IF0oIHNldE9iamVjdCApO1xuXHRcdGNvbnN0IGluc3RhbmNlQXJndW1lbnRzID0gdGhpcy5jb25zdHJ1Y3RvclsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplQXJndW1lbnRzIF0oXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdXG5cdFx0XHRcdC5jbG9uZSgpXG5cdFx0XHRcdC5zZXQoIHNldE9iamVjdCApLnRvSVNPU3RyaW5nKCksXG5cdFx0XHR0aGlzLnRpbWV6b25lLFxuXHRcdFx0dGhpcy5sb2NhbGVcblx0XHQpO1xuXHRcdHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvciggLi4uaW5zdGFuY2VBcmd1bWVudHMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBY2Nlc3NvciBmb3IgdGhlIHRpbWV6b25lIHN0cmluZy5cblx0ICpcblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgdGltZXpvbmUgc3RyaW5nXG5cdCAqL1xuXHRnZXQgdGltZXpvbmUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0udHooKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGbHVlbnQgc2V0dGVyIGZvciB0aGUgdGltZXpvbmUgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c2V0VGltZXpvbmUoIHRpbWV6b25lICkge1xuXHRcdHRoaXMuY29uc3RydWN0b3IuYXNzZXJ0VGltZXpvbmVJc1ZhbGlkKCB0aW1lem9uZSApO1xuXHRcdGNvbnN0IGluc3RhbmNlQXJndW1lbnRzID0gdGhpcy5jb25zdHJ1Y3RvclsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplQXJndW1lbnRzIF0oXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnRvSVNPU3RyaW5nKCksXG5cdFx0XHR0aW1lem9uZSxcblx0XHRcdHRoaXMubG9jYWxlXG5cdFx0KTtcblx0XHRyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IoIC4uLmluc3RhbmNlQXJndW1lbnRzICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGRheXMgZm9yIHRoZSBtb250aCBzZXQgaW4gdGhpcyBpbnN0YW5jZS5cblx0ICpcblx0ICogQHJldHVybiB7bnVtYmVyfSAgVGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aC5cblx0ICovXG5cdGdldCBkYXlzSW5Nb250aCgpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5kYXlzSW5Nb250aCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGN1cnJlbnQgaW5zdGFuY2UgaW4gdGltZSBpcyBjdXJyZW50bHkgaW4gRGF5bGlnaHQgU2F2aW5nc1xuXHQgKiBUaW1lLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIGl0IGlzIGN1cnJlbnRseSBpbiBEYXlsaWdodCBTYXZpbmdzIFRpbWUuXG5cdCAqL1xuXHRnZXQgaXNJbkRTVCgpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5pc0RTVCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGN1cnJlbnQgaW5zdGFuY2UgaW4gdGltZSBpcyBjdXJyZW50bHkgaW4gYSBsZWFwIHllYXIuXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhpcyBkYXRlIHRpbWUgaXMgaW4gYSBsZWFwIHllYXIuXG5cdCAqL1xuXHRnZXQgaXNJbkxlYXBZZWFyKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmlzTGVhcFllYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBvZmZzZXQgZnJvbSBVVEMgZm9yIHRoZSBjdXJyZW50IGluc3RhbmNlIGluIHRpbWUgKGluIG1pbnV0ZXMpLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9ICBUaGUgb2Zmc2V0IGlzIGluIG1pbnV0ZXNcblx0ICovXG5cdGdldCBvZmZzZXQoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0udXRjT2Zmc2V0KCk7XG5cdH1cblxuXHQvKipcblx0ICogQSBmbHVlbnQgc2V0dGVyIGZvciB0aGUgVVRDIG9mZnNldC5cblx0ICpcblx0ICogVGhlIG9mZnNldCBwcm92aWRlZCBkZWZhdWx0cyB0byBleHBlY3RpbmcgaW4gbWludXRlcy4gIEhvd2V2ZXIgaWYgdGhlXG5cdCAqIGlucHV0IGlzIGxlc3MgdGhhbiAxNiBhbmQgZ3JlYXRlciB0aGFuIC0xNiwgaXQgd2lsbCBpbnRlcnByZXQgdGhlIGlucHV0XG5cdCAqIGFzIGhvdXJzIGluc3RlYWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IHJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHNldE9mZnNldCggb2Zmc2V0ICkge1xuXHRcdHRoaXMuY29uc3RydWN0b3IuYXNzZXJ0SXNPZmZzZXQoIG9mZnNldCApO1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmNsb25lKCkudXRjT2Zmc2V0KCBvZmZzZXQgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgZGF5IG9mIHRoZSB5ZWFyIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpbiB0aGUgb2JqZWN0LlxuXHQgKlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IEEgbnVtYmVyIGJldHdlZW4gMSBhbmQgMzY2IChkZXBlbmRpbmcgb24gd2hldGhlciB0aGVcblx0ICogaW50ZXJuYWwgZGF0ZSBhbmQgdGltZSBpcyBpbiBhIGxlYXAgeWVhciBvciBub3QpLlxuXHQgKi9cblx0Z2V0IGRheU9mWWVhcigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5kYXlPZlllYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBxdWFydGVyIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpbiB0aGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IEEgbnVtYmVyIGJldHdlZW4gMSBhbmQgNFxuXHQgKi9cblx0Z2V0IHF1YXJ0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0ucXVhcnRlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV4cG9zZXMgdGhlIElTTyBudW1iZXIgb2YgdGhlIHdlZWsgZm9yIHRoZSBkYXRlIGFuZCB0aW1lIGluIHRoZSBvYmplY3QuXG5cdCAqXG5cdCAqIEBsaW5rIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcblx0ICogQHJldHVybiB7bnVtYmVyfSBXaWxsIGJlIGEgbnVtYmVyIGJldHdlZW4gMSBhbmQgNTJpc2hcblx0ICovXG5cdGdldCBpc29XZWVrTnVtYmVyKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmlzb1dlZWsoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBJU08gbnVtYmVyIGZvciB0aGUgd2VlayB5ZWFyIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpbiB0aGVcblx0ICogb2JqZWN0LlxuXHQgKlxuXHQgKiBAbGluayBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG5cdCAqIEByZXR1cm4ge251bWJlcn0gIFdpbGwgYmUgYSBudW1iZXIgcmVwcmVzZW50aW5nIGEgeWVhci5cblx0ICovXG5cdGdldCBpc29XZWVrWWVhcigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5pc29XZWVrWWVhcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV4cG9zZXMgdGhlIElTTyBudW1iZXIgZm9yIHRoZSBkYXkgb2YgdGhlIHdlZWsgZm9yIHRoZSBkYXRlIGFuZCB0aW1lIGluXG5cdCAqIHRoZSBvYmplY3QuXG5cdCAqXG5cdCAqIEBsaW5rIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcblx0ICogQHJldHVybiB7bnVtYmVyfSBBIG51bWJlciBiZXR3ZWVuIDEgYW5kIDcgKE1vbmRheSBpcyAxIGFuZCBTdW5kYXkgaXMgNylcblx0ICovXG5cdGdldCBpc29XZWVrRGF5KCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmlzb1dlZWtkYXkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBudW1iZXIgb2Ygd2Vla3MgaW4gdGhpcyBEYXRlVGltZSdzIHllYXIuXG5cdCAqXG5cdCAqIEBsaW5rIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcblx0ICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIHdlZWtzIGluIHRoZSBJU08geWVhci5cblx0ICovXG5cdGdldCBpc29XZWVrc0luV2Vla1llYXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uaXNvV2Vla3NJblllYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHdoYXQgdGhlIHNldCBsb2NhbGUgaXMgZm9yIHRoaXMgRGF0ZVRpbWVcblx0ICpcblx0ICogQHJldHVybiB7c3RyaW5nfSBBIGxvY2FsZSBzdHJpbmdcblx0ICovXG5cdGdldCBsb2NhbGUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0ubG9jYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQSBmbHVlbnQgc2V0dGVyIGZvciBzZXR0aW5nIHRoZSBsb2NhbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IGEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lIGVxdWl2YWxlbnQgdG8gdGhpcyBvbmUgYnV0XG5cdCAqIHdpdGggZGlmZmVyZW50IGxvY2FsZS5cblx0ICovXG5cdHNldExvY2FsZSggbG9jYWxlICkge1xuXHRcdHRoaXMuY29uc3RydWN0b3IuYXNzZXJ0TG9jYWxlSXNWYWxpZCggbG9jYWxlICk7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0LmxvY2FsZSggbG9jYWxlIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhpcyBEYXRlVGltZSBpbnN0YW5jZSBpcyB2YWxpZC5cblx0ICpcblx0ICogVHlwaWNhbGx5IGFuIGludmFsaWQgc3RhdGUgaXMgYWNoaWV2ZWQgd2hlbiB0aGUgaW50ZXJuYWwgbW9tZW50IGlzXG5cdCAqIGludmFsaWQuICBUaGlzIGNhbiBoYXBwZW4gd2hlbiB0aGUgbW9tZW50IGluc3RhbmNlIGlzIGNyZWF0ZWQgd2l0aFxuXHQgKiBpbnZhbGlkIHBhcmFtZXRlcnMuXG5cdCAqXG5cdCAqIE5vdGU6IHdpdGggbW9tZW50LnRpbWV6b25lICh3aGljaCBpcyB0aGUgaW50ZXJuYWwgbGlicmFyeSksXG5cdCAqIG1vbWVudC5pc1ZhbGlkKCkgY291bGQgcmV0dXJuIHRydWUsIGZhbHNlIG9yIGEgc3RyaW5nIGZvciB3aHkgaXQnc1xuXHQgKiBpbnZhbGlkLiAgVGhpcyBpcyB3aHkgYSBzdHJpY3QgZXF1YWxpdHkgY2hlY2sgaXMgZG9uZSBmb3Igd2hldGhlciBpdCBpc1xuXHQgKiB0cnVlIG9yIG5vdC5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhlIGluc3RhbmNlIGlzIHZhbGlkLlxuXHQgKi9cblx0aXNWYWxpZCgpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5pc1ZhbGlkKCkgPT09IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHR3byBEYXRlVGltZSBpbnN0YW5jZXMgYXMgYSBEdXJhdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlVGltZX0gb3RoZXJEYXRlVGltZVxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQW4gaW5zdGFuY2Ugb2YgRHVyYXRpb24gcmVwcmVzZW50aW5nIHRoZSBkaWZmZXJlbmNlXG5cdCAqIGJldHdlZW4gdGhlIHR3byBEYXRlVGltZSBvYmplY3RzLlxuXHQgKi9cblx0ZGlmZiggb3RoZXJEYXRlVGltZSApIHtcblx0XHR0aGlzLmNvbnN0cnVjdG9yLmFzc2VydElzRGF0ZVRpbWUoIG90aGVyRGF0ZVRpbWUgKTtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0bW9tZW50LmR1cmF0aW9uKFxuXHRcdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdXG5cdFx0XHRcdFx0LmRpZmYoIG90aGVyRGF0ZVRpbWVbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0gKVxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoaXMgRGF0ZVRpbWUgYW5kIFwibm93XCIgYXMgYSBEdXJhdGlvbi5cblx0ICpcblx0ICogQHJldHVybiB7RHVyYXRpb259IEFuIGluc3RhbmNlIG9mIER1cmF0aW9uIHJlcHJlc2VudGluZyB0aGUgZGlmZmVyZW5jZVxuXHQgKiBiZXR3ZWVuIHRoaXMgRGF0ZVRpbWUgYW5kIFwibm93XCJcblx0ICovXG5cdGRpZmZOb3coKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbihcblx0XHRcdG1vbWVudC5kdXJhdGlvbihcblx0XHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHRcdC5kaWZmKCBtb21lbnQoKSApXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIHZhbHVlIG9mIHRoaXMgRGF0ZVRpbWUgdG8gdGhlIGVuZCAoaS5lLiB0aGUgbGFzdCBtaWxsaXNlY29uZCkgb2Zcblx0ICogYSB1bml0IG9mIHRpbWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1bml0XG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBSZXR1cm5zIGEgbmV3IERhdGVUaW1lIGluc3RhbmNlLlxuXHQgKi9cblx0ZW5kT2YoIHVuaXQgKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uY2xvbmUoKS5lbmRPZiggdW5pdCApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wYXJlcyB0aGlzIERhdGVUaW1lIHdpdGggcHJvdmlkZWQgRGF0ZVRpbWUgYW5kIHJldHVybnMgd2hldGhlciB0aGV5XG5cdCAqIGFyZSBlcXVhbCB0byBlYWNoIG90aGVyLlxuXHQgKlxuXHQgKiBUaGUgdHdvIERhdGVUaW1lcyBhcmUgY29uc2lkZXJlZCBlcXVhbCBpZiB0aGV5IHJlcHJlc2VudCB0aGUgc2FtZVxuXHQgKiBtaWxsaXNlY29uZCwgaGF2ZSB0aGUgc2FtZSB6b25lIGFuZCBsb2NhdGlvbiwgYW5kIGFyZSBib3RoIHZhbGlkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBvdGhlckRhdGVUaW1lXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoZXkgYXJlIGVxdWFsXG5cdCAqL1xuXHRlcXVhbHMoIG90aGVyRGF0ZVRpbWUgKSB7XG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci5hc3NlcnRJc0RhdGVUaW1lKCBvdGhlckRhdGVUaW1lICk7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF1cblx0XHRcdC5pc1NhbWUoIG90aGVyRGF0ZVRpbWVbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoaXMgRGF0ZVRpbWUgaXMgaW4gdGhlIHNhbWUgdW5pdCBvZiB0aW1lIGFzIGFub3RoZXIgRGF0ZVRpbWVcblx0ICpcblx0ICogZWcuIERhdGVUaW1lLmZyb21Mb2NhbCgpLmhhc1NhbWUoIG90aGVyRFQsICdkYXknICkgLy9+PiB0cnVlIGlmIGJvdGggdGhlXG5cdCAqIHNhbWUgY2FsZW5kYXIgZGF5LlxuXHQgKlxuXHQgKiBOb3RlOiB0aGlzIHdpbGwgbWF0Y2ggYWxsIHVuaXRzIGVxdWFsIG9yIGxhcmdlci4gIEZvciBleGFtcGxlLCBwYXNzaW5nIGluXG5cdCAqIGBtb250aGAgd2lsbCBjaGVjayBgbW9udGhgIGFuZCBgeWVhcmAuICBTbyBpdCdzIG5vdCBvbmx5IGNoZWNraW5nIGlmIHRoZVxuXHQgKiB0d28gZGF0ZXMgc2hhcmUgdGhlIHNhbWUgbW9udGgsIGJ1dCB0aGF0IHRoZXkgYXJlIHRoZSBzYW1lIG1vbnRoIGluIHRoZVxuXHQgKiBzYW1lIHllYXIuICBJZiB5b3UgcGFzc2VkIGluIGRheSwgaXQgd291bGQgcmV0dXJuIHdoZXRoZXIgdGhlIHByb3ZpZGVkXG5cdCAqIERhdGVUaW1lIGlzIGluIHRoZSBzYW1lIGRheSwgbW9udGggYW5kIHllYXIgYXMgdGhpcyBEYXRlVGltZS5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlVGltZX0gb3RoZXJEYXRlVGltZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdW5pdFxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGV5IGFyZSBib3RoIGluIHRoZSBzYW1lIHRpbWUgZm9yIHRoZVxuXHQgKiBnaXZlbiB1bml0LlxuXHQgKi9cblx0aGFzU2FtZSggb3RoZXJEYXRlVGltZSwgdW5pdCApIHtcblx0XHR0aGlzLmNvbnN0cnVjdG9yLmFzc2VydElzRGF0ZVRpbWUoIG90aGVyRGF0ZVRpbWUgKTtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0LmlzU2FtZSggb3RoZXJEYXRlVGltZVsgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXSwgdW5pdCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFN1YnRyYWN0IGEgcGVyaW9kIG9mIHRpbWUgKHJlcHJlc2VudGVkIGJ5IGEgRHVyYXRpb24pIGZyb20gdGhpcyBEYXRlVGltZVxuXHQgKiBhbmQgcmV0dXJuIHRoZSByZXN1bHRpbmcgRGF0ZVRpbWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RHVyYXRpb259IGR1cmF0aW9uXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZSBmb3IgdGhlIG5ldyBkYXRlIGFuZCB0aW1lLlxuXHQgKi9cblx0bWludXMoIGR1cmF0aW9uICkge1xuXHRcdER1cmF0aW9uLmFzc2VydElzVmFsaWREdXJhdGlvbiggZHVyYXRpb24gKTtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5mcm9tTW9tZW50KFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQuc3VidHJhY3QoIGR1cmF0aW9uLnRvT2JqZWN0KCkgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQWRkIGEgcGVyaW9kIG9mIHRpbWUgKHJlcHJlc2VudGVkIGJ5IGEgRHVyYXRpb24pIHRvIHRoaXMgRGF0ZVRpbWUgYW5kXG5cdCAqIHJldHVybiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lXG5cdCAqXG5cdCAqIEBwYXJhbSB7RHVyYXRpb259IGR1cmF0aW9uXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZSBmb3IgdGhlIG5ldyBkYXRlIGFuZCB0aW1lLlxuXHQgKi9cblx0cGx1cyggZHVyYXRpb24gKSB7XG5cdFx0RHVyYXRpb24uYXNzZXJ0SXNWYWxpZER1cmF0aW9uKCBkdXJhdGlvbiApO1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdXG5cdFx0XHRcdC5jbG9uZSgpXG5cdFx0XHRcdC5hZGQoIGR1cmF0aW9uLnRvT2JqZWN0KCkgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSB2YWx1ZSBvZiB0aGlzIERhdGVUaW1lIHRvIHRoZSBiZWdpbm5pbmcgb2YgYSBzcGVjaWZpZWQgdW5pdCBvZlxuXHQgKiB0aW1lIGFuZCByZXR1cm4gYSBuZXcgRGF0ZVRpbWUgcmVwcmVzZW50aW5nIHRoYXQuXG5cdCAqXG5cdCAqIGVnLlxuXHQgKiBzdGFydE9mKCBEYXRlVGltZS5VTklUX1lFQVIgKSAvL3NldHMgdG8gSmFudWFyeSAxc3QsIDEyOjAwYW0gdGhpc1xuXHQgKiB5ZWFyLlxuXHQgKiBzdGFydE9mKCBEYXRlVGltZS5VTklUX01PTlRIICkgLy9zZXRzIHRvIHRoZSBmaXJzdCBvZiB0aGlzIG1vbnRoLCAxMjowMGFtXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1bml0XG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhcnRPZiggdW5pdCApIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5mcm9tTW9tZW50KFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5jbG9uZSgpLnN0YXJ0T2YoIHVuaXQgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lIGZvcm1hdHRlZCBhY2NvcmRpbmcgdG9cblx0ICogdGhlIHNwZWNpZmllZCBmb3JtYXQgc3RyaW5nLlxuXHQgKlxuXHQgKiBAbGluayBodHRwczovL21vbWVudGpzLmNvbS9kb2NzLyMvZGlzcGxheWluZy9mb3JtYXQvXG5cdCAqIEBzZWUgTW9tZW50IGZvcm1hdCBeXiBzZWN0aW9uIGZvciB0aGUgYXZhaWxhYmxlIGZvcm1hdHMgdGhhdCBjYW4gYmUgdXNlZC5cblx0ICpcblx0ICogQW4gZW1wdHkgZm9ybWF0IHZhbHVlIHdpbGwgcmV0dXJuIHRoZSBzdHJpbmcgZm9ybWF0dGVkIGluIElTTyA4NjAxIHdpdGhcblx0ICogYW55IG9mZnNldCBpbmNsdWRlZC5cblx0ICpcblx0ICogV2l0aG91dCBhbnkgYXJndW1lbnQgcGFzc2VkLCB0aGUgZm9ybWF0IHdpbGwgYmUgd2hhdGV2ZXIgc3RyaW5nIHRoZVxuXHQgKiBmb3JtYXQgaXMgc2VydmVyIHNpZGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXRcblx0ICogQHJldHVybiB7c3RyaW5nfSAgVGhlIGRhdGUgYW5kIHRpbWUgZGlzcGxheWVkIGFjY29yZGluZyB0byB0aGUgcHJvdmlkZWRcblx0ICogZm9ybWF0LlxuXHQgKi9cblx0dG9Gb3JtYXQoIGZvcm1hdCA9IERFRkFVTFRfRk9STUFUICkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLmZvcm1hdCggZm9ybWF0ICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIERhdGVUaW1lIGZvcm1hdHRlZCBhY2NvcmRpbmcgdG9cblx0ICogdGhlIElTTyA4NjAxIHN0YW5kYXJkLlxuXHQgKlxuXHQgKiBJZiBgaW5VVENgIGlzIHRydWUgKGRlZmF1bHQpIHRoZW4gYHRvSVNPYCB3aWxsIHJldHVybiB0aGUgSVNPIHN0cmluZyBpblxuXHQgKiBVVEMuIE90aGVyd2lzZSBpdCB3aWxsIGluY2x1ZGUgdGhlIG9mZnNldCBpbmZvcm1hdGlvbiBmb3IgdGhlIGludGVybmFsXG5cdCAqIHRpbWV6b25lL29mZnNldCBvbiB0aGUgbW9tZW50IGluIHRpbWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5VVENcblx0ICogQHJldHVybiB7c3RyaW5nfSBBbiBJU084NjAxIHN0cmluZ1xuXHQgKi9cblx0dG9JU08oIGluVVRDID0gdHJ1ZSApIHtcblx0XHRyZXR1cm4gaW5VVEMgP1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS50b0lTT1N0cmluZygpIDpcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0udG9JU09TdHJpbmcoIHRydWUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBmb3IgdGhpcyBEYXRlVGltZSBhcyBhIGphdmFzY3JpcHQgRGF0ZSBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0RhdGV9IEEgamF2YXNjcmlwdCBEYXRlIGluc3RhbmNlXG5cdCAqL1xuXHR0b0pTRGF0ZSgpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS50b0RhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGVuIHNlcmlhbGl6aW5nIGFuIG9iamVjdCB0byBKU09OLCBpZiB0aGVyZSBpcyBhIERhdGVUaW1lIGluc3RhbmNlLCBpdFxuXHQgKiB3aWxsIGJlIHJlcHJlc2VudGVkIGFzIGFuIElTTzg2MDEgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IEFuIElTTyA4NjAxIHN0cmluZ1xuXHQgKi9cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnRvSVNPU3RyaW5nKCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBEYXRlVGltZSB0byB3aGF0ZXZlciB0aGUgXCJsb2NhbFwiIHRpbWUgaXMuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgRGF0ZVRpbWVcblx0ICovXG5cdHRvTG9jYWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0uY2xvbmUoKS5sb2NhbCgpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBtaWxsaXNlY29uZHMgc2luY2UgdGhlIFVuaXggRXBvY2ggZm9yIHRoZSBjdXJyZW50IERhdGVUaW1lXG5cdCAqIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IE51bWJlciBvZiBtaWxsaXNlY29uZHMgc2luY2UgVW5peCBFcG9jaFxuXHQgKi9cblx0dG9NaWxsaXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMudmFsdWVPZigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBzaW1wbGUgb2JqZWN0IGNvbnRhaW5pbmcgeWVhciwgbW9udGgsIGRheSwgaG91cixcblx0ICogbWludXRlLCBzZWNvbmQsIGFuZCBtaWxsaXNlY29uZC5cblx0ICpcblx0ICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCB5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCxcblx0ICogYW5kIG1pbGxpc2Vjb25kLlxuXHQgKi9cblx0dG9PYmplY3QoKSB7XG5cdFx0Y29uc3QgZGF0ZXRpbWUgPSB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnRvT2JqZWN0KCk7XG5cdFx0cmV0dXJuIHJlZHVjZSggZGF0ZXRpbWUsICggcmVzdWx0LCB2YWx1ZSwga2V5ICkgPT4ge1xuXHRcdFx0a2V5ID0gdGhpcy5jb25zdHJ1Y3RvclsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE5hbWUgXSgga2V5ICk7XG5cdFx0XHRyZXN1bHRbIGtleSBdID0gdGhpcy5jb25zdHJ1Y3RvclsgcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdFZhbHVlIF0oXG5cdFx0XHRcdGtleSxcblx0XHRcdFx0dmFsdWUsXG5cdFx0XHRcdGZhbHNlXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LCB7fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIHRoZSBEYXRlVGltZSdzIHRpbWV6b25lIHRvIFVUQy5cblx0ICpcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHR0b1VUQygpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5mcm9tTW9tZW50KFxuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWUgXS5jbG9uZSgpLnV0YygpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIGVuZ2xpc2ggc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWUgd2hlbiB0aGUgaW5zdGFuY2UgaXNcblx0ICogY29lcmNlZCB0byBhIHN0cmluZyAoc2ltaWxhciBmb3JtYXQgdG8gSlMgYERhdGUudG9TdHJpbmcoKWAuXG5cdCAqXG5cdCAqIGVnIGBUdWUgRGVjIDI1IDIwMTggMTA6MTU6MDAgR01UKzAwMDBgXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEYXRlVGltZVxuXHQgKi9cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lIF0udG9TdHJpbmcoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGVuIERhdGVUaW1lIGlzIGNvZXJjZWQgdG8gbnVtYmVyIHRoaXMgd2lsbCBlbnN1cmUgaXRzIGRpc3BsYXllZCBhcyB0aGVcblx0ICogbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBzaW5jZSB0aGUgVW5peCBFcG9jaCBmb3IgdGhlIGN1cnJlbnQgRGF0ZVRpbWVcblx0ICpcblx0ICogQHJldHVybiB7bnVtYmVyfSBBbW91bnQgb2YgbWlsbGlzZWNvbmRzIHNpbmNlIHRoZSBVbml4IEVwb2NoXG5cdCAqL1xuXHR2YWx1ZU9mKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kYXRldGltZSBdLnZhbHVlT2YoKTtcblx0fVxufVxuXG4vKipcbiAqIFRoZXNlIHN0YXRpYyBwcm9wZXJ0aWVzIG5lZWQgdG8gYmUgZGVmaW5lZCBvdXRzaWRlIG9mIHRoZSBjbGFzcyBkZWZpbml0aW9uXG4gKiBiZWNhdXNlIG9mIGNvbXBpbGUgaXNzdWVzLlxuICovXG5EYXRlVGltZS5VTklUX1lFQVIgPSAneWVhcic7XG5EYXRlVGltZS5VTklUX01PTlRIID0gJ21vbnRoJztcbkRhdGVUaW1lLlVOSVRfREFZID0gJ2RheSc7XG5EYXRlVGltZS5VTklUX0hPVVIgPSAnaG91cic7XG5EYXRlVGltZS5VTklUX01JTlVURSA9ICdtaW51dGUnO1xuRGF0ZVRpbWUuVU5JVF9TRUNPTkQgPSAnc2Vjb25kJztcbkRhdGVUaW1lLlVOSVRfTUlMTElTRUNPTkQgPSAnbWlsbGlzZWNvbmQnO1xuRGF0ZVRpbWUuVElNRVpPTkVfTE9DQUwgPSAnbG9jYWwnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdFRJTUVaT05FX0NPTkZJRyxcblx0U0VSVkVSX0xPQ0FMRSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQge1xuXHRGT1JNQVRfU0lURV9EQVRFLFxuXHRGT1JNQVRfU0lURV9USU1FLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby9oZWxwZXJzJztcbmltcG9ydCB7IHZhbGlkYXRlTG9jYWxlIH0gZnJvbSAnLi9hc3NlcnRpb25zJztcblxuaW1wb3J0IHsgc25ha2VDYXNlIH0gZnJvbSAnbG9kYXNoJztcbi8qKlxuICogRGVmYXVsdCB0aW1lem9uZSBzdHJpbmcgdG8gdXNlLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUVaT05FX1NUUklORyA9IFRJTUVaT05FX0NPTkZJRy5zdHJpbmcgPT09ICcnID9cblx0J1VUQycgOlxuXHRUSU1FWk9ORV9DT05GSUcuc3RyaW5nO1xuXG4vKipcbiAqIERlZmF1bHQgb2Zmc2V0XG4gKlxuICogQHR5cGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfT0ZGU0VUID0gVElNRVpPTkVfQ09ORklHLm9mZnNldDtcblxuLyoqXG4gKiBXaGV0aGVyIHRoZXJlIGlzIGEgZGVmYXVsdCB0aW1lem9uZSBzdHJpbmcgdG8gdXNlLlxuICogVGhpcyBoZWxwcyB3aXRoIGRldGVybWluaW5nIHdoZXRoZXIgdG8gdXNlIHRoZSBvZmZzZXQgb3Igbm90IGZvciBjb25zdHJ1Y3RpbmdcbiAqIERhdGVUaW1lIHZhbHVlIG9iamVjdHMuXG4gKlxuICogQHR5cGUge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBIQVNfVElNRVpPTkVfU1RSSU5HID0gKFxuXHRERUZBVUxUX1RJTUVaT05FX1NUUklORyAhPT0gJ1VUQycgfHxcblx0ISAoIERFRkFVTFRfVElNRVpPTkVfU1RSSU5HID09PSAnVVRDJyAmJiBERUZBVUxUX09GRlNFVCAhPT0gMCApXG4pO1xuXG4vKipcbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9GT1JNQVQgPSBGT1JNQVRfU0lURV9EQVRFICsgJyAnICsgRk9STUFUX1NJVEVfVElNRTtcblxuLyoqXG4gKiBFeHBvc2VzIHdoYXQgdG8gdXNlIGZvciB0aGUgZGVmYXVsdCBsb2NhbGUuXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9MT0NBTEUgPSBzbmFrZUNhc2UoIFNFUlZFUl9MT0NBTEUudXNlciApO1xuXG4vKipcbiAqIFRoaXMgZW5zdXJlcyB0aGF0IHRoZSBwcm92aWRlZCBsb2NhbGUgaXMgdmFsaWQuICBTbyBpZiBgREVGQVVMVF9MT0NBTEVgIGlzXG4gKiBub3QgdmFsaWQgZm9yIHRoaXMgZW52aXJvbm1lbnQsIHRoZW4gYSBmYWxsYmFjayBvZiAnZW4nIGxvY2FsZSBpcyB1c2VkLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1ZBTElEX0xPQ0FMRSA9IHZhbGlkYXRlTG9jYWxlKCBERUZBVUxUX0xPQ0FMRSApID9cblx0REVGQVVMVF9MT0NBTEUgOlxuXHQnZW4nO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCBtb21lbnREdXJhdGlvbkZvcm1hdFNldHVwIGZyb20gJ21vbWVudC1kdXJhdGlvbi1mb3JtYXQnO1xuaW1wb3J0IHsgY2FwaXRhbGl6ZSwgcGljaywga2V5cywgb21pdCwgbWFwVmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBpc1NoYWxsb3dFcXVhbCBmcm9tICdAd29yZHByZXNzL2lzLXNoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5pbXBvcnQgeyBpbnN0YW5jZU9mIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgKiBhcyBhc3NlcnRpb25zIGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5pbXBvcnQge1xuXHRERUZBVUxUX1ZBTElEX0xPQ0FMRSxcbn0gZnJvbSAnLi9kZWZhdWx0cyc7XG5cbm1vbWVudER1cmF0aW9uRm9ybWF0U2V0dXAoIG1vbWVudCApO1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBzeW1ib2xzIHVzZWQgZm9yIFwicHJpdmF0ZVwiIHByb3BlcnRpZXMgaW4gdGhlIER1cmF0aW9uIG9iamVjdC5cbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGR1cmF0aW9uOiBTeW1ib2wsXG4gKiBcdFx0dmFsdWVzOiBTeW1ib2wsXG4gKiBcdFx0aXNWYWxpZDogU3ltYm9sLFxuICogXHR9XG4gKiB9XG4gKi9cbmNvbnN0IHByaXZhdGVQcm9wZXJ0aWVzID0ge1xuXHRkdXJhdGlvbjogU3ltYm9sKCAnRHVyYXRpb25Qcml2YXRlUHJvcGVydGllc0R1cmF0aW9uJyApLFxuXHRkdXJhdGlvblZhbHVlczogU3ltYm9sKCAnRHVyYXRpb25Qcml2YXRlUHJvcGVydGllc0R1cmF0aW9uVmFsdWVzJyApLFxuXHRpc1ZhbGlkOiBTeW1ib2woICdEdXJhdGlvblByaXZhdGVQcm9wZXJ0aWVzSXNWYWxpZCcgKSxcbn07XG5cbi8qKlxuICogQSBjb2xsZWN0aW9uIG9mIHN5bWJvbHMgdXNlZCBmb3IgXCJwcml2YXRlXCIgbWV0aG9kcyBpbiB0aGUgRHVyYXRpb24gb2JqZWN0LlxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0Y3JlYXRlR2V0dGVyc0FuZFNldHRlcnM6IFN5bWJvbCxcbiAqIFx0XHRnZXRBbGxVbml0TmFtZXM6IFN5bWJvbCxcbiAqIFx0XHRwb3B1bGF0ZVZhbHVlc0Zyb21EdXJhdGlvbjogU3ltYm9sLFxuICogXHRcdHNldFZhbHVlczogU3ltYm9sLFxuICogXHQgICAgZmlsdGVyVmFsdWVzOiBTeW1ib2wsXG4gKiBcdH1cbiAqIH1cbiAqL1xuY29uc3QgcHJpdmF0ZU1ldGhvZHMgPSB7XG5cdGNyZWF0ZUdldHRlcnM6IFN5bWJvbCggJ0R1cmF0aW9uUHJpdmF0ZU1ldGhvZHNDcmVhdGVHZXR0ZXJzJyApLFxuXHRnZXRBbGxVbml0TmFtZXM6IFN5bWJvbCggJ0R1cmF0aW9uUHJpdmF0ZU1ldGhvZHNHZXRBbGxVbml0TmFtZXMnICksXG5cdHBvcHVsYXRlVmFsdWVzRnJvbUR1cmF0aW9uOiBTeW1ib2woXG5cdFx0J0R1cmF0aW9uUHJpdmF0ZU1ldGhvZHNQb3B1bGF0ZVZhbHVlc0Zyb21EdXJhdGlvbidcblx0KSxcblx0c2V0VmFsdWVzOiBTeW1ib2woICdEdXJhdGlvblByaXZhdGVNZXRob2RzU2V0VmFsdWVzJyApLFxuXHRmaWx0ZXJWYWx1ZXM6IFN5bWJvbCggJ0R1cmF0aW9uUHJpdmF0ZU1ldGhvZHNGaWx0ZXJWYWx1ZXMnICksXG59O1xuXG4vKipcbiAqIEFuIGFycmF5IG9mIHVuaXQgbmFtZXMgZm9yIHByb3BlcnRpZXMgaW4gdGhlIER1cmF0aW9uIG9iamVjdFxuICogQHR5cGUge3N0cmluZ1tdfVxuICovXG5jb25zdCB1bml0TmFtZXMgPSBbXG5cdCd5ZWFycycsXG5cdCdtb250aHMnLFxuXHQnZGF5cycsXG5cdCdob3VycycsXG5cdCdtaW51dGVzJyxcblx0J3NlY29uZHMnLFxuXHQnbWlsbGlzZWNvbmRzJyxcbl07XG5cbi8qKlxuICogQW4gYXJyYXkgb2YgZGVyaXZhdGl2ZSB1bml0IG5hbWVzLlxuICogVGhlc2UgYXJlIGFjY2Vzc29ycyB0aGF0IGFyZSBkZXJpdmF0aXZlcyBvZiBiYXNlIHVuaXRzLiAgRm9yIGluc3RhbmNlLFxuICogXCJ3ZWVrc1wiIGVuZHMgdXAgYmVpbmcgYSBkZXJpdmF0aXZlIChjYWxjdWxhdGVkIGZyb20pIHRoZSBcImRheXNcIiB1bml0LlxuICogQHR5cGUge3N0cmluZ1tdfVxuICovXG5jb25zdCBkZXJpdmF0aXZlVW5pdE5hbWVzID0gW1xuXHQnd2Vla3MnLFxuXTtcblxuLyoqXG4gKiBXaGVyZSBhIERhdGVUaW1lIG9iamVjdCByZXByZXNlbnRzIGEgc2luZ2xlIHBvaW50IGluIHRpbWUsIGEgRHVyYXRpb24gb2JqZWN0XG4gKiByZXByZXNlbnRzIGEgbGVuZ3RoIG9mIHRpbWUuXG4gKlxuICogRHVyYXRpb25zIGRvIG5vdCBoYXZlIGEgZGVmaW5lZCBiZWdpbm5pbmcgYW5kIGVuZCBkYXRlLiAgVGhleSBhcmUgY29udGV4dGxlc3MuXG4gKlxuICogQXMgYW4gZXhhbXBsZSwgZHVyYXRpb25zIGFyZSByZXByZXNlbnRhdGl2ZSBvZiBzb21ldGhpbmcgbGlrZSBcIjIgaG91cnNcIiBhbmRcbiAqIG5vdCByZXByZXNlbnRhdGl2ZSBvZiBzb21ldGhpbmcgbGlrZSBcImJldHdlZW4gMXBtIGFuZCAzcG1cIi5cbiAqXG4gKiBJbnRlcm5hbGx5LCB0aGUgRHVyYXRpb24gY2xhc3MgaGVyZSB1c2VzIGBtb21lbnQuRHVyYXRpb25gLiAgVGhpcyBpcyBhblxuICogYWJzdHJhY3Rpb24gbG9vc2VseSBmb2xsb3dpbmcgdGhlIGFkYXB0ZXIgcGF0dGVybiBzbyB0aGF0IHRoZXJlIGlzIGEgY29tbW9uXG4gKiBhcGkgdGhhdCBjYW4gYmUgZGVwZW5kZWQgb24gaWYgaW4gdGhlIGZ1dHVyZSB0aGUgaW50ZXJuYWwgbGlicmFyeSBpcyBzd2l0Y2hlZFxuICogdG8gc29tZXRoaW5nIGRpZmZlcmVudCAoc3VjaCBhcyBMdXhvbikuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIER1cmF0aW9uIHtcblx0c3RhdGljIFVOSVRfWUVBUlMgPSAneWVhcnMnO1xuXHRzdGF0aWMgVU5JVF9NT05USFMgPSAnbW9udGhzJztcblx0c3RhdGljIFVOSVRfREFZUyA9ICdkYXlzJztcblx0c3RhdGljIFVOSVRfSE9VUlMgPSAnaG91cnMnO1xuXHRzdGF0aWMgVU5JVF9NSU5VVEVTID0gJ21pbnV0ZXMnO1xuXHRzdGF0aWMgVU5JVF9TRUNPTkRTID0gJ3NlY29uZHMnO1xuXHRzdGF0aWMgVU5JVF9NSUxMSVNFQ09ORFMgPSAnbWlsbGlzZWNvbmRzJztcblx0c3RhdGljIFVOSVRfV0VFS1MgPSAnd2Vla3MnO1xuXG5cdC8qKlxuXHQgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBEdXJhdGlvbiBjbGFzcy5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R8bW9tZW50LkR1cmF0aW9ufHN0cmluZ3xudW1iZXJ9IHZhbHVlc1xuXHQgKiBSZWNlaXZpbmcgYSBtb21lbnQuRHVyYXRpb24gb2JqZWN0IGlzIHNvbWV0aGluZyBmb3IgaW50ZXJuYWwgdXNlIGFuZCBzaG91bGQgbm90IGJlIHVzZWQgZGlyZWN0bHkgdmlhXG5cdCAqIGNsaWVudCBjb2RlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlICBBIHZhbGlkIGxvY2FsZSBzdHJpbmcuXG5cdCAqIFx0XHRcdFx0XHRcdFx0QGxpbmsgaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTY0NlxuXHQgKi9cblx0Y29uc3RydWN0b3IoIHZhbHVlcywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUgKSB7XG5cdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuaXNWYWxpZCBdID0gdHJ1ZTtcblx0XHRhc3NlcnRpb25zLmFzc2VydExvY2FsZUlzVmFsaWQoIGxvY2FsZSApO1xuXHRcdGlmICggdHlwZW9mIHZhbHVlcyAhPT0gJ29iamVjdCcgKSB7XG5cdFx0XHR2YWx1ZXMgPSBtb21lbnQuZHVyYXRpb24oIHZhbHVlcyApLmxvY2FsZSggbG9jYWxlICk7XG5cdFx0fVxuXHRcdGlmICggbW9tZW50LmlzRHVyYXRpb24oIHZhbHVlcyApICkge1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXSA9IHZhbHVlcztcblx0XHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLnBvcHVsYXRlVmFsdWVzRnJvbUR1cmF0aW9uIF0oIHZhbHVlcyApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YWx1ZXMgPSB0aGlzWyBwcml2YXRlTWV0aG9kcy5maWx0ZXJWYWx1ZXMgXSggdmFsdWVzICk7XG5cdFx0XHR0aGlzWyBwcml2YXRlTWV0aG9kcy5zZXRWYWx1ZXMgXSggdmFsdWVzICk7XG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdID0gbW9tZW50LmR1cmF0aW9uKFxuXHRcdFx0XHR2YWx1ZXNcblx0XHRcdCkubG9jYWxlKCBsb2NhbGUgKTtcblx0XHR9XG5cdFx0dGhpc1sgcHJpdmF0ZU1ldGhvZHMuY3JlYXRlR2V0dGVycyBdKCk7XG5cdFx0T2JqZWN0LmZyZWV6ZSggdGhpcyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBEdXJhdGlvbiBmcm9tIGEgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcy5cblx0ICogQHBhcmFtIHtudW1iZXJ9IG1pbGxpc2Vjb25kc1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSAgQW4gaW5zdGFuY2Ugb2YgRHVyYXRpb24uXG5cdCAqL1xuXHRzdGF0aWMgZnJvbU1pbGxpc2Vjb25kcyggbWlsbGlzZWNvbmRzLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSApIHtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKCB7IG1pbGxpc2Vjb25kcyB9LCBsb2NhbGUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgRHVyYXRpb24gZnJvbSBhIHNpbXBsZSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXMgIEtleXMgc2hvdWxkIGJlIHRoZSB1bml0cyAoZWcgJ3llYXJzJywgJ2RheXMnKS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQW4gaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdHN0YXRpYyBmcm9tT2JqZWN0KCB2YWx1ZXMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFICkge1xuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oIHZhbHVlcywgbG9jYWxlICk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uIGZyb20gYW4gSVNPODYwMSBzdHJpbmcuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBJU09TdHJpbmcgKGVnLiAnUFQyM0gnKVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBbiBpbnN0YW5jZSBvZiBEdXJhdGlvblxuXHQgKi9cblx0c3RhdGljIGZyb21JU08oIElTT1N0cmluZywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRJU084NjAxSXNWYWxpZCggSVNPU3RyaW5nLCB0cnVlICk7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbiggSVNPU3RyaW5nLCBsb2NhbGUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZSB3aGV0aGVyIHRoZSBwcm92aWRlZCBsb2NhbGUgYXJndW1lbnQgaXMgYSB2YWxpZCBsb2NhbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgaXQgaXMgdmFsaWQuXG5cdCAqL1xuXHRzdGF0aWMgaXNWYWxpZExvY2FsZSggbG9jYWxlICkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlTG9jYWxlKCBsb2NhbGUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIGxvY2FsZSBhcmd1bWVudCBpcyBhIHZhbGlkIGxvY2FsZS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAdGhyb3dzIEludmFsaWRMb2NhbGVcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc1ZhbGlkTG9jYWxlKCBsb2NhbGUgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRMb2NhbGVJc1ZhbGlkKCBsb2NhbGUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZSB3aGV0aGVyIHRoZSBwcm92aWRlZCBzdHJpbmcgaXMgYSB2YWxpZCBJU08gODYwMSBEdXJhdGlvbiBzdHJpbmcuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBpc29TdHJpbmdcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyBpdCBpcyB2YWxpZC5cblx0ICovXG5cdHN0YXRpYyBpc1ZhbGlkSVNPODYwMUR1cmF0aW9uKCBpc29TdHJpbmcgKSB7XG5cdFx0cmV0dXJuIGFzc2VydGlvbnMudmFsaWRhdGVJU084NjAxKCBpc29TdHJpbmcsIHRydWUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnQgd2hldGhlciB0aGUgcHJvdmlkZWQgc3RyaW5nIGlzIGEgdmFsaWQgSVNPIDg2MDEgRHVyYXRpb24gc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaXNvU3RyaW5nXG5cdCAqIEB0aHJvd3MgSW52YWxpZElTTzg2MDFTdHJpbmdcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc1ZhbGlkSVNPODYwMUR1cmF0aW9uKCBpc29TdHJpbmcgKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRJU084NjAxSXNWYWxpZCggaXNvU3RyaW5nICk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgdmFsaWQgaW5zdGFuY2Ugb2YgRHVyYXRpb24uXG5cdCAqIEBwYXJhbSB7bWl4ZWR8RHVyYXRpb259ZHVyYXRpb25cblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgaXQgaXMgYSB2YWxpZCBEdXJhdGlvbiBvYmplY3QuXG5cdCAqL1xuXHRzdGF0aWMgaXNWYWxpZER1cmF0aW9uKCBkdXJhdGlvbiApIHtcblx0XHRyZXR1cm4gaW5zdGFuY2VPZiggZHVyYXRpb24sICdEdXJhdGlvbicgKSAmJlxuXHRcdFx0ZHVyYXRpb24uaXNWYWxpZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgdmFsaWQgRHVyYXRpb24gYW5kIHRocm93cyBhblxuXHQgKiBleGNlcHRpb24gaWYgbm90LlxuXHQgKiBAcGFyYW0ge21peGVkfER1cmF0aW9ufSBkdXJhdGlvblxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKi9cblx0c3RhdGljIGFzc2VydElzVmFsaWREdXJhdGlvbiggZHVyYXRpb24gKSB7XG5cdFx0aWYgKCAhIER1cmF0aW9uLmlzVmFsaWREdXJhdGlvbiggZHVyYXRpb24gKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGlzIER1cmF0aW9uIG9iamVjdCBpcyBub3QgdmFsaWQuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufG1peGVkfSBkdXJhdGlvblxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGUgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRHVyYXRpb24uXG5cdCAqIE5vdGU6IHRydWUgbWF5IHN0aWxsIG1lYW4gdGhhdCB0aGUgRHVyYXRpb24gaW5zdGFuY2UgaXMgbm90IHZhbGlkIVxuXHQgKi9cblx0c3RhdGljIGlzRHVyYXRpb24oIGR1cmF0aW9uICkge1xuXHRcdHJldHVybiBpbnN0YW5jZU9mKCBkdXJhdGlvbiwgJ0R1cmF0aW9uJyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRHVyYXRpb24gYW5kIGlmIG5vdFxuXHQgKiB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufG1peGVkfSBkdXJhdGlvblxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKi9cblx0c3RhdGljIGFzc2VydElzRHVyYXRpb24oIGR1cmF0aW9uICkge1xuXHRcdGlmICggISBEdXJhdGlvbi5pc0R1cmF0aW9uKCBkdXJhdGlvbiApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgRHVyYXRpb24uJ1xuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyBmaWx0ZXJzIHRoZSBpbmNvbWluZyB2YWx1ZXMgYW5kIHJldHVybnMgb25seSBrZXkvdmFsdWUgcGFpcnMgdGhhdFxuXHQgKiBhcmUgYWNjZXB0YWJsZSBhcyBkdXJhdGlvbiB1bml0cy5cblx0ICpcblx0ICogSWYgYSBpbnZhbGlkIGR1cmF0aW9uIHVuaXQgaXMgZGlzY292ZXJlZCwgYSBjb25zb2xlLmVycm9yIGlzIGdlbmVyYXRlZFxuXHQgKiAoaW4gbm9uLXByb2R1Y3Rpb24gbW9kZSkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bWl4ZWR9IHZhbHVlc1xuXHQgKiBAcmV0dXJuIHtPYmplY3R9IEZpbHRlcmVkIHZhbHVlcy5cblx0ICogQHRocm93cyBUeXBlRXJyb3IgaWYgaW5jb21pbmcgdmFsdWVzIGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3QuXG5cdCAqL1xuXHRbIHByaXZhdGVNZXRob2RzLmZpbHRlclZhbHVlcyBdKCB2YWx1ZXMgKSB7XG5cdFx0aWYgKCB0eXBlb2YgdmFsdWVzICE9PSAnb2JqZWN0JyApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdJbmNvbWluZyB2YWx1ZXMgbXVzdCBiZSBhIHNpbXBsZSBvYmplY3QuJyApO1xuXHRcdH1cblx0XHRjb25zdCB2YWx1ZXNUb1NldCA9IHBpY2soIHZhbHVlcywgdW5pdE5hbWVzICk7XG5cdFx0aWYgKCAhIGlzU2hhbGxvd0VxdWFsKCB2YWx1ZXMsIHZhbHVlc1RvU2V0ICkgKSB7XG5cdFx0XHR3YXJuaW5nKFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0J1RoZSBmb2xsb3dpbmcgdW5leHBlY3RlZCBrZXlzIHdlcmUgaW4gdGhlIGNvbmZpZ3VyYXRpb24gJyArXG5cdFx0XHRcdCdvYmplY3QgZm9yIGNvbnN0cnVjdGluZyB0aGUgRHVyYXRpb246ICcgK1xuXHRcdFx0XHRrZXlzKCBvbWl0KCB2YWx1ZXMsIHVuaXROYW1lcyApICkuam9pbigpXG5cdFx0XHQpO1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuaXNWYWxpZCBdID0gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB2YWx1ZXNUb1NldDtcblx0fVxuXG5cdC8qKlxuXHQgKiBVc2VkIHRvIHNldCB0aGUgaW50ZXJuYWwgXCJwcml2YXRlXCIgdmFsdWVzIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5zZXRWYWx1ZXMgXSggdmFsdWVzICkge1xuXHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uVmFsdWVzIF0gPSB7fTtcblx0XHR1bml0TmFtZXMuZm9yRWFjaCggKCB1bml0ICkgPT4ge1xuXHRcdFx0dGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb25WYWx1ZXMgXVsgdW5pdCBdID0gdmFsdWVzWyB1bml0IF0gfHxcblx0XHRcdFx0MDtcblx0XHR9ICk7XG5cdH1cblxuXHQvKipcblx0ICogVXNlZCB0byBzZXQgdGhlIHZhbHVlcyBcInByaXZhdGVcIiBwcm9wZXJ0eSBmcm9tIGEgbW9tZW50LkR1cmF0aW9uIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHttb21lbnQuRHVyYXRpb259IGR1cmF0aW9uXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5wb3B1bGF0ZVZhbHVlc0Zyb21EdXJhdGlvbiBdKCBkdXJhdGlvbiApIHtcblx0XHRjb25zdCBzZXRWYWx1ZXMgPSB7fTtcblx0XHR1bml0TmFtZXMuZm9yRWFjaCggKCB1bml0ICkgPT4ge1xuXHRcdFx0c2V0VmFsdWVzWyB1bml0IF0gPSBkdXJhdGlvblsgdW5pdCBdKCk7XG5cdFx0fSApO1xuXHRcdHRoaXNbIHByaXZhdGVNZXRob2RzLnNldFZhbHVlcyBdKCBzZXRWYWx1ZXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGFjY2Vzc29yIG5hbWVzICh0aGF0IGluIHR1cm4gYXJlIHVzZWQgZm9yIGdlbmVyYXRpbmdcblx0ICogcHJpdmF0ZSBwcm9wZXJ0aWVzKS5cblx0ICpcblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqIEByZXR1cm4ge3N0cmluZ1tdfSAgQXJyYXkgb2YgYWNjZXNzb3IgbmFtZXMuXG5cdCAqL1xuXHRbIHByaXZhdGVNZXRob2RzLmdldEFsbFVuaXROYW1lcyBdKCkge1xuXHRcdHJldHVybiBbXG5cdFx0XHQuLi51bml0TmFtZXMsXG5cdFx0XHQuLi5kZXJpdmF0aXZlVW5pdE5hbWVzLFxuXHRcdF07XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBnZXR0ZXJzIGZvciB0aGUgRHVyYXRpb24gaW5zdGFuY2UgZnJvbSB0aGUgYWNjZXNzb3IgbmFtZXMuXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKi9cblx0WyBwcml2YXRlTWV0aG9kcy5jcmVhdGVHZXR0ZXJzIF0oKSB7XG5cdFx0dGhpc1sgcHJpdmF0ZU1ldGhvZHMuZ2V0QWxsVW5pdE5hbWVzIF0oKS5mb3JFYWNoKFxuXHRcdFx0KCBhY2Nlc3Nvck5hbWUgKSA9PiB7XG5cdFx0XHRcdC8vIGNyZWF0ZXMgYWNjZXNzb3IgZm9yIGdldHRpbmcgdGhlIHZhbHVlIHZpYSBhIHByb3BlcnR5XG5cdFx0XHRcdC8vIGVnLiBpbnN0YW5jZS5ob3Vyc1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHRoaXMsIGFjY2Vzc29yTmFtZSwge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdGlmICggZGVyaXZhdGl2ZVVuaXROYW1lcy5pbmRleE9mKCBhY2Nlc3Nvck5hbWUgKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXVsgYWNjZXNzb3JOYW1lIF0oKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiB0aGlzXG5cdFx0XHRcdFx0XHRcdFsgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb25WYWx1ZXMgXVxuXHRcdFx0XHRcdFx0XHRbIGFjY2Vzc29yTmFtZSBdIHx8XG5cdFx0XHRcdFx0XHRcdDA7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSApO1xuXHRcdFx0XHQvLyBjcmVhdGVzIGBhcypgIG1ldGhvZHMuXG5cdFx0XHRcdC8vIGVnIGBpbnN0YW5jZS5hc0hvdXJzYCB3b3VsZCByZXR1cm4gdGhlIGdpdmVuIGR1cmF0aW9uXG5cdFx0XHRcdC8vIGV4cHJlc3NlZCBhcyB0aGUgaG91cnMgdW5pdC5cblx0XHRcdFx0Ly8gbm90ZSBmb3IgdW5pdHMgc3VjaCBhcyBcInllYXJzXCIgYW5kIFwibW9udGhzXCIsIHRoaXMgdXNlcyB3aGF0XG5cdFx0XHRcdC8vIGlzIHRlcm1lZCBhcyBcImxvbmd0ZXJtXCIgY2FsY3VsYXRpb24uIExvbmd0ZXJtIGlzIGJhc2VkIG9uXG5cdFx0XHRcdC8vIGEgNDAwIHllYXIgY3ljbGUgYXZlcmFnaW5nIG91dCB0aGUgZGF5cyBpbiBhIG1vbnRoIGFuZFxuXHRcdFx0XHQvLyBkYXlzIGluIGEgeWVhciBvdmVyIHRoYXQgY3ljbGUuXG5cdFx0XHRcdC8vIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2Jsb2IvZGV2ZWxvcC9zcmMvbGliL2R1cmF0aW9uL2J1YmJsZS5qcyNMNTJcblx0XHRcdFx0Y29uc3QgYXNNZXRob2ROYW1lID0gJ2FzJyArIGNhcGl0YWxpemUoIGFjY2Vzc29yTmFtZSApO1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHRoaXMsIGFzTWV0aG9kTmFtZSwge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdXG5cdFx0XHRcdFx0XHRcdFx0WyBhc01ldGhvZE5hbWUgXSgpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSB2YWx1ZSBvZiBsb2NhbGUuXG5cdCAqIGVnLiBpbnN0YW5jZS5sb2NhbGVcblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgbG9jYWxlIHN0cmluZy5cblx0ICovXG5cdGdldCBsb2NhbGUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF0ubG9jYWxlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGN1cnJlbnQgRHVyYXRpb24gaW5zdGFuY2UgcmVwcmVzZW50cyBhIHZhbGlkXG5cdCAqIGR1cmF0aW9uLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoZSBEdXJhdGlvbiBpbnN0YW5jZSBpcyB2YWxpZC5cblx0ICovXG5cdGdldCBpc1ZhbGlkKCkge1xuXHRcdHJldHVybiB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5pc1ZhbGlkIF0gJiZcblx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF0udG9JU09TdHJpbmcoKSAhPT0gJ1AwRCc7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIG5ldyBEdXJhdGlvbiBpbnN0YW5jZSB0aGF0IGlzIGlkZW50aWNhbCB0byB0aGlzIGV4Y2VwdCB0aGVcblx0ICogbG9jYWxlIGlzIGNoYW5nZWQgdG8gd2hhdCB3YXMgcHJvdmlkZWQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RHVyYXRpb259IEEgbmV3IGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRzZXRMb2NhbGUoIGxvY2FsZSApIHtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKCB0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvblZhbHVlcyBdLCBsb2NhbGUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWR1Y2UgdGhpcyBEdXJhdGlvbiB0byBpdHMgY2Fub25pY2FsIHJlcHJlc2VudGF0aW9uIGluIGl0cyBjdXJyZW50IHVuaXRzLlxuXHQgKlxuXHQgKiBGb3IgZXhhbXBsZTpcblx0ICogRHVyYXRpb25cblx0ICogICAgIC5mcm9tT2JqZWN0KHsgeWVhcnM6IDIsIGRheXM6IDUwMDAgfSlcblx0ICogICAgIC5ub3JtYWxpemUoKVxuXHQgKiAgICAgLnRvT2JqZWN0KCkgLy89PiB7IHllYXJzOiAxNSwgbW9udGhzOiA4LCBkYXlzOiAxMiB9XG5cdCAqXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBIG5ldyBpbnN0YW5jZSBvZiBEdXJhdGlvblxuXHQgKi9cblx0bm9ybWFsaXplKCkge1xuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIER1cmF0aW9uIGluc3RhbmNlIGlzIHRoZSBzYW1lIGFzIHRoaXNcblx0ICogRHVyYXRpb24gaW5zdGFuY2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RHVyYXRpb258bWl4ZWR9IG90aGVyRHVyYXRpb25cblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGF0IHRoZSBjb21wYXJlZCBkdXJhdGlvbnMgaGF2ZSB0aGUgc2FtZVxuXHQgKiB1bml0cyBhbmQgdGhlIHNhbWUgdmFsdWVzIGZvciBlYWNoIHVuaXQgKGFzIHdlbGwgYXMgc2FtZSBsb2NhbGUpLiBUaGlzXG5cdCAqIG1lYW5zIHRoYXQgYSBkdXJhdGlvbiB3aXRoeyBtaW51dGVzOiA2MCB9IHdvdWxkIGJlIGNvbnNpZGVyZWQgbm90IGVxdWFsXG5cdCAqIHRvIGEgZHVyYXRpb24gd2l0aCB7IGhvdXJzOiAxIH0uXG5cdCAqL1xuXHRzYW1lQXMoIG90aGVyRHVyYXRpb24gKSB7XG5cdFx0RHVyYXRpb24uYXNzZXJ0SXNEdXJhdGlvbiggb3RoZXJEdXJhdGlvbiApO1xuXHRcdGlmICggISB0aGlzLmlzVmFsaWQgfHwgISBvdGhlckR1cmF0aW9uLmlzVmFsaWQgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGlmICggdGhpcy5sb2NhbGUgIT09IG90aGVyRHVyYXRpb24ubG9jYWxlICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gaXNTaGFsbG93RXF1YWwoIHRoaXMudG9PYmplY3QoKSwgb3RoZXJEdXJhdGlvbi50b09iamVjdCgpICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBEdXJhdGlvbiBpbnN0YW5jZSBpcyBlcXVhbCB0byB0aGlzIER1cmF0aW9uXG5cdCAqIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBFcXVhbGl0eSBpcyBiYXNlZCBvbjpcblx0ICogLSBsb2NhbGUgaXMgdGhlIHNhbWVcblx0ICogLSB0aGUgbm9ybWFsaXplZCB2YWx1ZSBvZiB0aGUgZHVyYXRpb24gaXMgdGhlIHNhbWUuICBlZyBhIGR1cmF0aW9uIHdpdGhcblx0ICogeyBob3VyczogMjQgfSB3b3VsZCBiZSBjb25zaWRlcmVkIGVxdWFsIHRvIGEgZHVyYXRpb24gd2l0aCB7IGRheXM6IDEgfVxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufG1peGVkfSBvdGhlckR1cmF0aW9uXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgY29uc2lkZXJlZCBlcXVhbFxuXHQgKi9cblx0ZXF1YWxzKCBvdGhlckR1cmF0aW9uICkge1xuXHRcdER1cmF0aW9uLmFzc2VydElzRHVyYXRpb24oIG90aGVyRHVyYXRpb24gKTtcblx0XHRpZiAoICEgdGhpcy5pc1ZhbGlkIHx8ICEgb3RoZXJEdXJhdGlvbi5pc1ZhbGlkICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAoIHRoaXMubG9jYWxlICE9PSBvdGhlckR1cmF0aW9uLmxvY2FsZSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIGlzU2hhbGxvd0VxdWFsKFxuXHRcdFx0dGhpcy5ub3JtYWxpemUoKS50b09iamVjdCgpLFxuXHRcdFx0b3RoZXJEdXJhdGlvbi5ub3JtYWxpemUoKS50b09iamVjdCgpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlIHRoaXMgZHVyYXRpb24gbG9uZ2VyIGJ5IHRoZSBzcGVjaWZpZWQgYW1vdW50LlxuXHQgKlxuXHQgKiBOb3RlOiB0aGUgcmV0dXJuZWQgRHVyYXRpb24gd2lsbCBoYXZlIHRoZSBsb2NhbGUgb2YgdGhlIG9yaWdpbmFsXG5cdCAqIHJlZ2FyZGxlc3Mgd2hhdCB0aGUgbG9jYWxlIHdhcyBvbiBhbnkgcGFzc2VkIGluIGR1cmF0aW9uLlxuXHQgKlxuXHQgKiBUaGUgbmV3IER1cmF0aW9uIHJldHVybmVkIHdpbGwgaGF2ZSBub3JtYWxpemVkIHZhbHVlcyAoaS5lLiBpZiBhZGRpdGlvblxuXHQgKiBvZiBvbmUgRHVyYXRpb24gd2l0aCBgeyBob3VyczogMTAgfWAgaXMgZG9uZSB3aXRoIHRoZSBvdGhlciBEdXJhdGlvblxuXHQgKiBoYXZpbmcgYHsgaG91cnM6IDE0IH1gIHRoZW4gdGhlIG5ldyBEdXJhdGlvbiB3aWxsIGhhdmUgYHsgZGF5czogMSB9YC5cblx0ICogWW91IGNhbiBzdGlsbCBnZXQgdGhlIHRvdGFsIGhvdXJzIGJ5IGNhbGxpbmcgYG5ld0R1cmF0aW9uLmFzSG91cnMoKWAuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RHVyYXRpb258T2JqZWN0fG51bWJlcn0gdmFsdWUgIEVpdGhlciBhIER1cmF0aW9uIGluc3RhbmNlLCBhXG5cdCAqIG51bWJlciBvZiBtaWxsaXNlY29uZHMgb3IgYW4gb2JqZWN0IGluIHRoZSBzYW1lIHNoYXBlIHJlY2VpdmVkIGJ5XG5cdCAqIER1cmF0aW9uLmZyb21PYmplY3QoKVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQSBuZXcgaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdHBsdXMoIHZhbHVlICkge1xuXHRcdGlmICggRHVyYXRpb24uaXNEdXJhdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiBuZXcgRHVyYXRpb24oXG5cdFx0XHRcdHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF1cblx0XHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHRcdC5hZGQoIHZhbHVlWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdIClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICggdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyApIHtcblx0XHRcdHZhbHVlID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMuZmlsdGVyVmFsdWVzIF0oIHZhbHVlICk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdXG5cdFx0XHRcdC5jbG9uZSgpXG5cdFx0XHRcdC5hZGQoIHZhbHVlIClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1ha2UgdGhpcyBkdXJhdGlvbiBzaG9ydGVyIGJ5IHRoZSBzcGVjaWZpZWQgYW1vdW50XG5cdCAqXG5cdCAqIE5vdGU6IHRoZSByZXR1cm5lZCBEdXJhdGlvbiB3aWxsIGhhdmUgdGhlIGxvY2FsZSBvZiB0aGUgb3JpZ2luYWxcblx0ICogcmVnYXJkbGVzcyB3aGF0IHRoZSBsb2NhbGUgd2FzIG9uIGFueSBwYXNzZWQgaW4gZHVyYXRpb24uXG5cdCAqXG5cdCAqIFRoZSBuZXcgRHVyYXRpb24gcmV0dXJuZWQgd2lsbCBoYXZlIG5vcm1hbGl6ZWQgdmFsdWVzIChpLmUuIGlmIHN1YnRyYWN0aW9uXG5cdCAqIG9mIG9uZSBEdXJhdGlvbiB3aXRoIGB7IGhvdXJzOiAzNCB9YCBpcyBkb25lIHdpdGggdGhlIG90aGVyIER1cmF0aW9uXG5cdCAqIGhhdmluZyBgeyBob3VyczogMTAgfWAgdGhlbiB0aGUgbmV3IER1cmF0aW9uIHdpbGwgaGF2ZSBgeyBkYXlzOiAxIH1gLlxuXHQgKiBZb3UgY2FuIHN0aWxsIGdldCB0aGUgdG90YWwgaG91cnMgYnkgY2FsbGluZyBgbmV3RHVyYXRpb24uYXNIb3VycygpYC5cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbnxPYmplY3R8bnVtYmVyfSB2YWx1ZSBFaXRoZXIgYSBkdXJhdGlvbiBpbnN0YW5jZSwgYVxuXHQgKiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIG9yIGFuIG9iamVjdCBpbiB0aGUgc2FtZSBzaGFwZSBhcyB0aGF0IHJlY2VpdmVkIGJ5XG5cdCAqIER1cmF0aW9uLmZyb21PYmplY3QoKVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQSBuZXcgaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdG1pbnVzKCB2YWx1ZSApIHtcblx0XHRpZiAoIER1cmF0aW9uLmlzRHVyYXRpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdXG5cdFx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0XHQuc3VidHJhY3QoIHZhbHVlWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdIClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICggdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyApIHtcblx0XHRcdHZhbHVlID0gdGhpc1sgcHJpdmF0ZU1ldGhvZHMuZmlsdGVyVmFsdWVzIF0oIHZhbHVlICk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oXG5cdFx0XHR0aGlzWyBwcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbiBdXG5cdFx0XHRcdC5jbG9uZSgpXG5cdFx0XHRcdC5zdWJ0cmFjdCggdmFsdWUgKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgbmVnYXRpdmUgb2YgdGhpcyBEdXJhdGlvbi5cblx0ICpcblx0ICogQHJldHVybiB7RHVyYXRpb259IEEgbmV3IGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRuZWdhdGUoKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbihcblx0XHRcdG1hcFZhbHVlcyggdGhpcy50b09iamVjdCgpLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZSAqIC0xO1xuXHRcdFx0fSApXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgamF2YXNjcmlwdCBvYmplY3Qgd2l0aCB0aGlzIER1cmF0aW9uJ3MgdmFsdWVzLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHsqfSBSZXR1cm5zIHsgeWVhcnM6IG51bWJlciwgaG91cnM6IG51bWJlciAuLi4gfVxuXHQgKi9cblx0dG9PYmplY3QoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uVmFsdWVzIF07XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBJU08gODYwMS1jb21wbGlhbnQgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRHVyYXRpb24uXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gZWcuIFwiUFQyNEhcIlxuXHQgKi9cblx0dG9JU08oKSB7XG5cdFx0cmV0dXJuIHRoaXNbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF0udG9JU09TdHJpbmcoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIElTTyA4NjAxIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRHVyYXRpb24gYXBwcm9wcmlhdGUgZm9yIHVzZVxuXHQgKiBpbiBKU09OLlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGVnLiBcIlBUMjRIXCJcblx0ICovXG5cdHRvSlNPTigpIHtcblx0XHRyZXR1cm4gdGhpc1sgcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb24gXS50b0pTT04oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIElTTyA4NjAxIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRHVyYXRpb24gYXBwcm9wcmlhdGUgZm9yIHVzZVxuXHQgKiBpbiBkZWJ1Z2dpbmcuXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gZWcuIFwiUFQyNEhcIlxuXHQgKi9cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMudG9JU08oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIG1pbGxpc2Vjb25kcyB2YWx1ZSBvZiB0aGlzIER1cmF0aW9uLlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSB2YWx1ZSBvZiB0aGlzIGR1cmF0aW9uIHJlcHJlc2VudGVkIGluIHRoZSBudW1iZXIgb2Zcblx0ICogbWlsbGlzZWNvbmRzLlxuXHQgKi9cblx0dmFsdWVPZigpIHtcblx0XHRyZXR1cm4gdGhpcy5hc01pbGxpc2Vjb25kcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEdXJhdGlvbiBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvXG5cdCAqIHRoZSBzcGVjaWZpZWQgZm9ybWF0IHN0cmluZy5cblx0ICpcblx0ICogQ3VycmVudGx5IHRoaXMgYWNjZXB0cyB0aGUgZm9sbG93aW5nIHRva2VucyBpbiB0aGUgZm9ybWF0IHN0cmluZzpcblx0ICpcblx0ICogeWVhcnM6ICAgWSBvciB5XG5cdCAqIG1vbnRoczogIE1cblx0ICogd2Vla3M6ICAgVyBvciB3XG5cdCAqIGRheXM6ICAgIEQgb3IgZFxuXHQgKiBob3VyczogICBIIG9yIGhcblx0ICogbWludXRlczogbVxuXHQgKiBzZWNvbmRzOiBzXG5cdCAqIG1zOiAgICAgIFNcblx0ICpcblx0ICogWW91IGNhbiB1c2UgbXVsdGlwbGVzIG9mIHRoZSBzYW1lIHRva2VuIHRvZ2V0aGVyIHRvIGFkZCB6ZXJvLWxlbmd0aFxuXHQgKiBwYWRkaW5nOiAoZWcgaGggLT4gMDEgaW5zdGVhZCBvZiBoIC0+IDEpXG5cdCAqXG5cdCAqIEVzY2FwZSB0b2tlbiBjaGFyYWN0ZXJzIHdpdGhpbiB0aGUgZm9ybWF0IHN0cmluZyB1c2luZyBzcXVhcmUgYnJhY2tldHNcblx0ICogKGVnICdoIFtocnNdLCBtIFttaW5dJyAtPiAnMTIgaHJzLCAzIG1pbicpXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfWZvcm1hdFxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9ICBBIGZvcm1hdHRlZCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBkdXJhdGlvbi5cblx0ICovXG5cdHRvRm9ybWF0KCBmb3JtYXQgKSB7XG5cdFx0cmV0dXJuIHRoaXMubm9ybWFsaXplKClbIHByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uIF0uZm9ybWF0KCBmb3JtYXQgKTtcblx0fVxufVxuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBEYXRlVGltZSB9IGZyb20gJy4vZGF0ZXRpbWUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEdXJhdGlvbiB9IGZyb20gJy4vZHVyYXRpb24nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTZXJ2ZXJEYXRlVGltZSB9IGZyb20gJy4vc2VydmVyLWRhdGUtdGltZSc7XG5cbiIsIi8qKlxuICogSW50ZXJuYWwgSW1wb3J0cy5cbiAqL1xuaW1wb3J0IERhdGVUaW1lIGZyb20gJy4vZGF0ZXRpbWUnO1xuaW1wb3J0IHtcblx0REVGQVVMVF9USU1FWk9ORV9TVFJJTkcsXG5cdEhBU19USU1FWk9ORV9TVFJJTkcsXG5cdERFRkFVTFRfT0ZGU0VULFxuXHRERUZBVUxUX1ZBTElEX0xPQ0FMRSxcbn0gZnJvbSAnLi9kZWZhdWx0cyc7XG5cbi8qKlxuICogRXh0ZXJuYWwgSW1wb3J0cy5cbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuXG4vKipcbiAqIEluaGVyaXRpbmcgdGhlIERhdGVUaW1lIFZhbHVlIG9iamVjdCwgdGhpcyByZXByZXNlbnRzIGEgc2luZ2xlIHBvaW50IGluIHRpbWVcbiAqIHdpdGhpbiB0aGUgY29udGV4dCBvZiB0aGUgdGltZXpvbmUgb3Igb2Zmc2V0IHRoZSBzZXJ2ZXIgaXMgc2V0IGF0LlxuICpcbiAqIEluc3RhbnRpYXRpbmcgdGhpcyBpbnN0ZWFkIG9mIGBEYXRlVGltZWAgcmVtb3ZlcyB0aGUgbmVlZCB0byBwYXNzIGFsb25nXG4gKiB0aW1lem9uZSBzdHJpbmcgb3Igb2Zmc2V0IGFuZCBpbnN0YW50aWF0ZXMgYWNjb3JkaW5nIHRvIHdoYXQgaGFzIGJlZW4gc2V0IGFzXG4gKiB0aGUgZGVmYXVsdHMgZm9yIHRob3NlIGZyb20gdGhlIHNlcnZlci4gIFVzYWdlIG9mIHRoaXMgY2xhc3MgaXMgcHJlZmVycmVkXG4gKiBvdmVyIERhdGVUaW1lIHRvIHJlbW92ZSB0aGUgbmVlZCBmb3IgY2xpZW50IGNvZGUgdG8gZmlndXJlIG91dCBpZiB0aGUgc2VydmVyXG4gKiBoYXMgYSB0aW1lem9uZSBzdHJpbmcgc2V0IG9yIGlzIHVzaW5nIGEgVVRDIG9mZnNldC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyRGF0ZVRpbWUgZXh0ZW5kcyBEYXRlVGltZSB7XG5cdC8qKlxuXHQgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBTZXJ2ZXJEYXRlVGltZSBjbGFzc1xuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaXNvODYwMURhdGVTdHJpbmdcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcblx0ICovXG5cdGNvbnN0cnVjdG9yKFxuXHRcdGlzbzg2MDFEYXRlU3RyaW5nID0gJycsXG5cdFx0bG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUsXG5cdFx0dGltZXpvbmUgPSBERUZBVUxUX1RJTUVaT05FX1NUUklORyxcblx0KSB7XG5cdFx0Ly8gd2Ugb25seSB3YW50IHRvIHVzZSB0aGUgdGltZXpvbmUgdmFsdWUgaWYgdGhlIHNlcnZlciBpbmRpY2F0ZXMgdGhlcmVcblx0XHQvLyBpcyBhIGEgdGltZXpvbmUgc3RyaW5nIG9yIGlmIGNvbnN0cnVjdGluZyBhbiBpbnN0YW5jZSBmb3IgYSBub24gVVRDXG5cdFx0Ly8gdmFsdWUgdGltZXpvbmUgKEhBU19USU1FWk9ORV9TVFJJTkcgaXMganVzdCBhIHNob3J0Y3V0IGNoZWNrKS5cblx0XHRpZiAoXG5cdFx0XHRIQVNfVElNRVpPTkVfU1RSSU5HIHx8XG5cdFx0XHQoICEhIHRpbWV6b25lICYmIHRpbWV6b25lICE9PSAnVVRDJyApXG5cdFx0KSB7XG5cdFx0XHRzdXBlciggaXNvODYwMURhdGVTdHJpbmcsIHRpbWV6b25lLCBsb2NhbGUgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgZGF0ZXRpbWUgPSAhISBpc284NjAxRGF0ZVN0cmluZyA/XG5cdFx0XHRcdG1vbWVudCgpLnV0Y09mZnNldCggREVGQVVMVF9PRkZTRVQsIHRydWUgKS5sb2NhbGUoIGxvY2FsZSApIDpcblx0XHRcdFx0bW9tZW50KCBpc284NjAxRGF0ZVN0cmluZyApXG5cdFx0XHRcdFx0LnV0Y09mZnNldCggREVGQVVMVF9PRkZTRVQsIHRydWUgKVxuXHRcdFx0XHRcdC5sb2NhbGUoIGxvY2FsZSApO1xuXHRcdFx0c3VwZXIoIGRhdGV0aW1lLnRvSVNPU3RyaW5nKCB0cnVlICksIG51bGwsIGxvY2FsZSApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBJbnN0YW50aWF0ZSBTZXJ2ZXJEYXRlVGltZSBmcm9tIGFuIElTTyBzdHJpbmcuXG5cdCAqIFRoaXMgb3ZlcnJpZGVzIGBEYXRlVGltZS5mcm9tSVNPYCByZW1vdmluZyB0aGUgbmVlZCB0byB3b3JyeSBhYm91dFxuXHQgKiB3aGV0aGVyIHRvIHVzZSBgdGltZXpvbmVgIG9yIGBvZmZzZXRgLiAgVGhpcyB3aWxsIHNpbXBseSB1c2Ugd2hhdGV2ZXIgaXNcblx0ICogcHJvdmlkZWQgYnkgdGhlIHNlcnZlciAocHJlZmVycmluZyB0aW1lem9uZSBpZiBpdHMgYXZhaWxhYmxlKS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IElTT1N0cmluZ1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge1NlcnZlckRhdGVUaW1lfSBBbiBpbnN0YW5jZSBvZiBTZXJ2ZXJEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGZyb21JU08oIElTT1N0cmluZywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUgKSB7XG5cdFx0cmV0dXJuIEhBU19USU1FWk9ORV9TVFJJTkcgP1xuXHRcdFx0bmV3IHRoaXMoXG5cdFx0XHRcdHN1cGVyXG5cdFx0XHRcdFx0LmZyb21JU08oIElTT1N0cmluZywgREVGQVVMVF9USU1FWk9ORV9TVFJJTkcgKVxuXHRcdFx0XHRcdC50b0lTTygpLFxuXHRcdFx0XHRsb2NhbGVcblx0XHRcdCkgOlxuXHRcdFx0bmV3IHRoaXMoXG5cdFx0XHRcdHN1cGVyXG5cdFx0XHRcdFx0LmZyb21JU09XaXRoT2Zmc2V0KCBJU09TdHJpbmcsIERFRkFVTFRfT0ZGU0VUIClcblx0XHRcdFx0XHQudG9JU08oKSxcblx0XHRcdFx0bG9jYWxlXG5cdFx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluc3RhbnRpYXRlIFNlcnZlckRhdGVUaW1lIGZyb20gYW4gSVNPIHN0cmluZy5cblx0ICogVGhpcyBvdmVycmlkZXMgYERhdGVUaW1lLmZyb21KU0RhdGVgIHJlbW92aW5nIHRoZSBuZWVkIHRvIHdvcnJ5IGFib3V0XG5cdCAqIHdoZXRoZXIgdG8gdXNlIGB0aW1lem9uZWAgb3IgYG9mZnNldGAuICBUaGlzIHdpbGwgc2ltcGx5IHVzZSB3aGF0ZXZlciBpc1xuXHQgKiBwcm92aWRlZCBieSB0aGUgc2VydmVyIChwcmVmZXJyaW5nIHRpbWV6b25lIGlmIGl0cyBhdmFpbGFibGUpLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGV9IGRhdGVcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtTZXJ2ZXJEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgU2VydmVyRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tSlNEYXRlKCBkYXRlLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSApIHtcblx0XHRyZXR1cm4gSEFTX1RJTUVaT05FX1NUUklORyA/XG5cdFx0XHRuZXcgdGhpcyhcblx0XHRcdFx0c3VwZXJcblx0XHRcdFx0XHQuZnJvbUpTRGF0ZSggZGF0ZSwgREVGQVVMVF9USU1FWk9ORV9TVFJJTkcgKVxuXHRcdFx0XHRcdC50b0lTTygpLFxuXHRcdFx0XHRsb2NhbGVcblx0XHRcdCkgOlxuXHRcdFx0bmV3IHRoaXMoXG5cdFx0XHRcdHN1cGVyXG5cdFx0XHRcdFx0LmZyb21KU0RhdGVXaXRoT2Zmc2V0KCBkYXRlLCBERUZBVUxUX09GRlNFVCApXG5cdFx0XHRcdFx0LnRvSVNPKCksXG5cdFx0XHRcdGxvY2FsZVxuXHRcdFx0KTtcblx0fVxufVxuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBJbmZpbml0eVN5bWJvbCB9IGZyb20gJy4vaW5maW5pdHktc3ltYm9sJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTW9uZXkgfSBmcm9tICcuL21vbmV5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2l0ZUN1cnJlbmN5LCBDdXJyZW5jeSB9IGZyb20gJy4vY3VycmVuY3knO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBMYWJlbCB9IGZyb20gJy4vbGFiZWwnO1xuZXhwb3J0IHsgRGF0ZVRpbWUsIER1cmF0aW9uLCBTZXJ2ZXJEYXRlVGltZSB9IGZyb20gJy4vZGF0ZS10aW1lJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHBhcnNlSW5maW5pdHkgZnJvbSAnLi4vdXRpbHMvcGFyc2UtaW5maW5pdHknO1xuXG4vKipcbiAqIEluZmluaXR5U3ltYm9sXG4gKiBkaXNwbGF5cyBpbmZpbml0ZSB2YWx1ZXMgYXMgYW4gaW5maW5pdHkgc3ltYm9sXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2Jvb2xlYW58bnVtYmVyfG9iamVjdHxzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFzSW50ICAgd2hldGhlciB0byBwYXJzZSB2YWx1ZSBhcyBhbiBpbnRlZ2VyXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgcmVuZGVyZWQgdmFsdWUgb3IgaW5maW5pdHkgc3ltYm9sXG4gKi9cbmNvbnN0IEluZmluaXR5U3ltYm9sID0gKCB7IHZhbHVlLCBhc0ludCB9ICkgPT4ge1xuXHR2YWx1ZSA9IHBhcnNlSW5maW5pdHkoIHZhbHVlLCBhc0ludCApO1xuXHRyZXR1cm4gdmFsdWUgPT09IEluZmluaXR5ID9cblx0XHQ8c3BhbiBjbGFzc05hbWU9eyAnZWUtaW5maW5pdHktc2lnbicgfT4maW5maW47PC9zcGFuPiA6XG5cdFx0dmFsdWU7XG59O1xuXG5JbmZpbml0eVN5bWJvbC5wcm9wVHlwZXMgPSB7XG5cdHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKCBbXG5cdFx0UHJvcFR5cGVzLmJvb2wsXG5cdFx0UHJvcFR5cGVzLm51bWJlcixcblx0XHRQcm9wVHlwZXMub2JqZWN0LFxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXG5cdF0gKSxcblx0YXNJbnQ6IFByb3BUeXBlcy5ib29sLFxufTtcblxuSW5maW5pdHlTeW1ib2wuZGVmYXVsdFByb3BzID0ge1xuXHR2YWx1ZTogJycsXG5cdGFzSW50OiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEluZmluaXR5U3ltYm9sO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHN0YXJ0Q2FzZSwgaXNTdHJpbmcgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5cbi8qKlxuICogQSB2YWx1ZSBvYmplY3QgZm9yIHJlcHJlc2VudGluZyBhIGxhYmVsIHdpdGggc2luZ3VsYXIgYW5kIHBsdXJhbCBzdHJpbmdcbiAqIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGFiZWwge1xuXHRzdGF0aWMgRk9STUFUX0xPV0VSQ0FTRSA9ICdsb3dlcic7XG5cdHN0YXRpYyBGT1JNQVRfVVBQRVJDQVNFID0gJ3VwcGVyJztcblx0c3RhdGljIEZPUk1BVF9TRU5URU5DRV9DQVNFID0gJ3NlbnRlbmNlJztcblxuXHQvKipcblx0ICogVGhlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNpbmd1bGFyIGZvcm0gb2YgdGhlIGxhYmVsLlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0c2luZ3VsYXIgPSAnJztcblxuXHQvKipcblx0ICogVGhlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHBsdXJhbCBmb3JtIG9mIHRoZSBsYWJlbC5cblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHBsdXJhbCA9ICcnO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc2luZ3VsYXJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBsdXJhbFxuXHQgKi9cblx0Y29uc3RydWN0b3IoIHNpbmd1bGFyLCBwbHVyYWwgKSB7XG5cdFx0dGhpcy5zZXRTaW5ndWxhciggc2luZ3VsYXIgKS5zZXRQbHVyYWwoIHBsdXJhbCApO1xuXHRcdE9iamVjdC5mcmVlemUoIHRoaXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGbHVpZCBzZXR0ZXIgZm9yIHNldHRpbmcgdGhlIHNpbmd1bGFyIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBJZiB0aGUgc2luZ3VsYXIgcHJvcGVydHkgaGFzIGFscmVhZHkgYmVlbiBzZXQsIHRoaXMgd2lsbCByZXR1cm4gYSBuZXdcblx0ICogaW5zdGFuY2Ugb2YgTGFiZWxcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNpbmd1bGFyXG5cdCAqIEByZXR1cm4ge0xhYmVsfSAgQW4gaW5zdGFuY2Ugb2YgTGFiZWxcblx0ICovXG5cdHNldFNpbmd1bGFyKCBzaW5ndWxhciApIHtcblx0XHRMYWJlbC5hc3NlcnRTdHJpbmcoIHNpbmd1bGFyICk7XG5cdFx0aWYgKCB0aGlzLnNpbmd1bGFyICE9PSAnJyApIHtcblx0XHRcdHJldHVybiBuZXcgTGFiZWwoIHNpbmd1bGFyLCB0aGlzLnBsdXJhbCApO1xuXHRcdH1cblx0XHR0aGlzLnNpbmd1bGFyID0gc2luZ3VsYXI7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogRmx1aWQgc2V0dGVyIGZvciBzZXR0aW5nIHRoZSBwbHVyYWwgcHJvcGVydHlcblx0ICpcblx0ICogSWYgdGhlIHBsdXJhbCBwcm9wZXJ0eSBoYXMgYWxyZWFkeSBiZWVuIHNldCwgdGhpcyB3aWxsIHJldHVybiBhIG5ld1xuXHQgKiBpbnN0YW5jZSBvZiBsYWJlbC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBsdXJhbFxuXHQgKiBAcmV0dXJuIHtMYWJlbH0gQW4gaW5zdGFuY2Ugb2YgTGFiZWxcblx0ICovXG5cdHNldFBsdXJhbCggcGx1cmFsICkge1xuXHRcdExhYmVsLmFzc2VydFN0cmluZyggcGx1cmFsICk7XG5cdFx0aWYgKCB0aGlzLnBsdXJhbCAhPT0gJycgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IExhYmVsKCB0aGlzLnNpbmd1bGFyLCBwbHVyYWwgKTtcblx0XHR9XG5cdFx0dGhpcy5wbHVyYWwgPSBwbHVyYWw7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5IGZvcm1hdHRlZCBpbiBzZW50ZW5jZSBjYXNlLlxuXHQgKlxuXHQgKiBOb3RlLCB0aGlzIHN0cmlwcyBhbnkgYC1gIGluIGRhc2hlZCBsYWJlbHMuICBTbyBmb3IgaW5zdGFuY2UgaWYgeW91clxuXHQgKiBsYWJlbCB2YWx1ZSB3YXMgYHNvbWV0aGluZy1lbHNlYCwgdGhlIHZhbHVlIHJldHVybmVkIHdvdWxkIGJlXG5cdCAqIGBTb21ldGhpbmcgRWxzZWBcblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhciAgSWYgdHJ1ZSwgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlXG5cdCAqIHNpbmd1bGFyIHByb3BlcnR5IG90aGVyd2lzZSByZXR1cm4gdGhlIGZvcm1hdHRlZCB2YWx1ZSBvZiB0aGUgcGx1cmFsXG5cdCAqIHByb3BlcnR5LlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmcgaW4gc2VudGVuY2UgY2FzZVxuXHQgKi9cblx0YXNTZW50ZW5jZUNhc2UoIHNpbmd1bGFyID0gdHJ1ZSApIHtcblx0XHRyZXR1cm4gc2luZ3VsYXIgPT09IHRydWUgP1xuXHRcdFx0c3RhcnRDYXNlKCB0aGlzLnNpbmd1bGFyLnRvTG93ZXJDYXNlKCkgKSA6XG5cdFx0XHRzdGFydENhc2UoIHRoaXMucGx1cmFsLnRvTG93ZXJDYXNlKCkgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdGhlIHZhbHVlIGZvciB0aGUgcHJvcGVydHkgZm9ybWF0dGVkIGluIGxvd2VyIGNhc2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXIgIElmIHRydWUsIHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlIG9mIHRoZVxuXHQgKiBzaW5ndWxhciBwcm9wZXJ0eSBvdGhlcndpc2UgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlIHBsdXJhbFxuXHQgKiBwcm9wZXJ0eS5cblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5nIGluIGxvd2VyIGNhc2Vcblx0ICovXG5cdGFzTG93ZXJDYXNlKCBzaW5ndWxhciA9IHRydWUgKSB7XG5cdFx0cmV0dXJuIHNpbmd1bGFyID9cblx0XHRcdHRoaXMuc2luZ3VsYXIudG9Mb3dlckNhc2UoKSA6XG5cdFx0XHR0aGlzLnBsdXJhbC50b0xvd2VyQ2FzZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0aGUgdmFsdWUgZm9yIHRoZSBwcm9wZXJ0eSBmb3JtYXR0ZWQgaW4gdXBwZXIgY2FzZS5cblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhciAgSWYgdHJ1ZSwgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlXG5cdCAqIHNpbmd1bGFyIHByb3BlcnR5IG90aGVyd2lzZSByZXR1cm4gdGhlIGZvcm1hdHRlZCB2YWx1ZSBvZiB0aGUgcGx1cmFsXG5cdCAqIHByb3BlcnR5LlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmcgaW4gdXBwZXIgY2FzZVxuXHQgKi9cblx0YXNVcHBlckNhc2UoIHNpbmd1bGFyID0gdHJ1ZSApIHtcblx0XHRyZXR1cm4gc2luZ3VsYXIgP1xuXHRcdFx0dGhpcy5zaW5ndWxhci50b1VwcGVyQ2FzZSgpIDpcblx0XHRcdHRoaXMucGx1cmFsLnRvVXBwZXJDYXNlKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5IGZvcm1hdHRlZCBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVkXG5cdCAqIGZvcm1hdFR5cGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXIgSWYgdHJ1ZSwgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlXG5cdCAqIHNpbmd1bGFyIHByb3BlcnR5IG90aGVyd2lzZSByZXR1cm4gdGhlIGZvcm1hdHRlZCB2YWx1ZSBvZiB0aGUgcGx1cmFsXG5cdCAqIHByb3BlcnR5LlxuXHQgKiBAcGFyYW0geygnc2VudGVuY2UnfCdsb3dlcid8J3VwcGVyJyl9IGZvcm1hdFR5cGVcblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5nIGZvcm1hdHRlZCBhY2NvcmRpbmcgdG8gZm9ybWF0VHlwZVxuXHQgKi9cblx0YXNGb3JtYXR0ZWQoIHNpbmd1bGFyID0gdHJ1ZSwgZm9ybWF0VHlwZSA9IExhYmVsLkZPUk1BVF9TRU5URU5DRV9DQVNFICkge1xuXHRcdHN3aXRjaCAoIGZvcm1hdFR5cGUgKSB7XG5cdFx0XHRjYXNlIExhYmVsLkZPUk1BVF9TRU5URU5DRV9DQVNFOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hc1NlbnRlbmNlQ2FzZSggc2luZ3VsYXIgKTtcblx0XHRcdGNhc2UgTGFiZWwuRk9STUFUX0xPV0VSQ0FTRTpcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXNMb3dlckNhc2UoIHNpbmd1bGFyICk7XG5cdFx0XHRjYXNlIExhYmVsLkZPUk1BVF9VUFBFUkNBU0U6XG5cdFx0XHRcdHJldHVybiB0aGlzLmFzVXBwZXJDYXNlKCBzaW5ndWxhciApO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0d2FybmluZyggZmFsc2UsICdGb3JtYXQgdHlwZSBtdXN0IGJlIG9uZSBvZiAnICtcblx0XHRcdFx0XHQnTGFiZWwuRk9STUFUX1NFTlRFTkNFX0NBU0UsIExhYmVsLkZPUk1BVF9VUFBFUkNBU0UsICcgK1xuXHRcdFx0XHRcdCdvciBMYWJlbC5GT1JNQVRfTE9XRVJDQVNFJyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hc1NlbnRlbmNlQ2FzZSggc2luZ3VsYXIgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHN0cmluZyBvciBub3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWVcblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRTdHJpbmcoIHZhbHVlICkge1xuXHRcdGlmICggISBpc1N0cmluZyggdmFsdWUgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdJbmNvbWluZyBsYWJlbCB2YWx1ZSAoJyArIHZhbHVlICsgJykgbXVzdCcgK1xuXHRcdFx0XHQnIGJlIGEgc3RyaW5nJyApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIExhYmVsIHRoYXQgaGFzIHRoZSBzYW1lIHZhbHVlIGZvciBzaW5nbHVhciBhbmRcblx0ICogcGx1cmFsIHByb3BlcnRpZXMgZm9yIHRoZSBwcm92aWRlZCBhcmd1bWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsXG5cdCAqIEByZXR1cm4ge0xhYmVsfSAgQSBMYWJlbCBpbnN0YW5jZVxuXHQgKi9cblx0c3RhdGljIGZyb21TYW1lU2luZ2xlQW5kUGx1cmFsID0gKCBsYWJlbCApID0+IHtcblx0XHRyZXR1cm4gbmV3IExhYmVsKCBsYWJlbCwgbGFiZWwgKTtcblx0fVxufVxuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IEN1cnJlbmN5IH0gZnJvbSAnLi9jdXJyZW5jeSc7XG5pbXBvcnQgeyBEZWNpbWFsIH0gZnJvbSAnZGVjaW1hbC5qcy1saWdodCc7XG5pbXBvcnQgKiBhcyBBY2NvdW50aW5nIGZyb20gJ2FjY291bnRpbmctanMnO1xuaW1wb3J0IGlzU2hhbGxvd0VxdWFsIGZyb20gJ0B3b3JkcHJlc3MvaXMtc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgeyBFeGNlcHRpb24gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaW5zdGFuY2VPZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgc3ByaW50ZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuXG4vKipcbiAqIEFzc2VydHMgaWYgaW5jb21pbmcgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgTW9uZXlcbiAqXG4gKiBAcGFyYW0ge01vbmV5fSBtb25leVxuICogQHRocm93cyB7VHlwZUVycm9yfVxuICovXG5jb25zdCBhc3NlcnRNb25leSA9ICggbW9uZXkgKSA9PiB7XG5cdGlmICggISAoXG5cdFx0aW5zdGFuY2VPZiggbW9uZXksICdNb25leScgKVxuXHQpICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdJbnN0YW5jZSBvZiBNb25leSByZXF1aXJlZCcgKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIGlmIGluY29taW5nIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIEN1cnJlbmN5XG4gKlxuICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAqL1xuY29uc3QgYXNzZXJ0Q3VycmVuY3kgPSAoIGN1cnJlbmN5ICkgPT4ge1xuXHRpZiAoICEgKFxuXHRcdGluc3RhbmNlT2YoIGN1cnJlbmN5LCAnQ3VycmVuY3knIClcblx0KSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnSW5zdGFuY2Ugb2YgQ3VycmVuY3kgcmVxdWlyZWQnICk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyBpZiB0d28gY3VycmVuY2llcyBhcmUgc2hhbGxvdyBlcXVhbC5cbiAqXG4gKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeUFcbiAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5QlxuICogQHRocm93cyB7RXhjZXB0aW9ufVxuICovXG5jb25zdCBhc3NlcnRTYW1lQ3VycmVuY3kgPSAoIGN1cnJlbmN5QSwgY3VycmVuY3lCICkgPT4ge1xuXHRhc3NlcnRDdXJyZW5jeSggY3VycmVuY3lBICk7XG5cdGFzc2VydEN1cnJlbmN5KCBjdXJyZW5jeUIgKTtcblx0aWYgKCAhIGlzU2hhbGxvd0VxdWFsKCBjdXJyZW5jeUEudG9KU09OKCksIGN1cnJlbmN5Qi50b0pTT04oKSApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oICdQcm92aWRlZCBjdXJyZW5jaWVzIGFyZSBub3QgZXF1aXZhbGVudC4nICk7XG5cdH1cbn07XG5cbi8qKlxuICogQSBWYWx1ZSBvYmplY3QgcmVwcmVzZW50aW5nIG1vbmV5IHZhbHVlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uZXkge1xuXHQvKipcblx0ICogSW50ZXJuYWxseSB0aGUgYW1vdW50IGlzIHN0b3JlZCBhcyBhIERlY2ltYWwgaW5zdGFuY2UuXG5cdCAqXG5cdCAqIEB0eXBlIHtEZWNpbWFsfVxuXHQgKi9cblx0YW1vdW50O1xuXG5cdC8qKlxuXHQgKiBJbnRlcm5hbGx5IHRoZSBhbW91bnQgaXMgc3RvcmVkIGFzIGEgQ3VycmVuY3kgaW5zdGFuY2UuXG5cdCAqXG5cdCAqIEB0eXBlIHtDdXJyZW5jeX1cblx0ICovXG5cdGN1cnJlbmN5O1xuXG5cdC8qKlxuXHQgKiBGb3JtYXR0ZXIgb2JqZWN0IGZvciBtb25leSB2YWx1ZXMuXG5cdCAqXG5cdCAqIEB0eXBlIHsge30gfVxuXHQgKi9cblx0Zm9ybWF0dGVyID0ge307XG5cblx0LyoqXG5cdCAqIFJvdW5kcyBhd2F5IGZyb20gemVyb1xuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIFJPVU5EX1VQID0gRGVjaW1hbC5ST1VORF9VUDtcblxuXHQvKipcblx0ICogUm91bmRzIHRvd2FyZHMgemVyb1xuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIFJPVU5EX0RPV04gPSBEZWNpbWFsLlJPVU5EX0RPV047XG5cblx0LyoqXG5cdCAqIFJvdW5kcyB0b3dhcmRzIGluZmluaXR5XG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdGF0aWMgUk9VTkRfQ0VJTCA9IERlY2ltYWwuUk9VTkRfQ0VJTDtcblxuXHQvKipcblx0ICogUm91bmRzIHRvd2FyZHMgLUluZmluaXR5XG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdGF0aWMgUk9VTkRfRkxPT1IgPSBEZWNpbWFsLlJPVU5EX0ZMT09SO1xuXG5cdC8qKlxuXHQgKiBSb3VuZHMgdG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHJvdW5kcyBhd2F5IGZyb20gemVyby5cblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9IQUxGX1VQID0gRGVjaW1hbC5ST1VORF9IQUxGX1VQO1xuXG5cdC8qKlxuXHQgKiBSb3VuZHMgdG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQgcm91bmRzIHRvd2FyZHMgemVyby5cblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9IQUxGX0RPV04gPSBEZWNpbWFsLlJPVU5EX0hBTEZfRE9XTjtcblxuXHQvKipcblx0ICogUm91bmRzIHRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuXG5cdCAqIElmIGVxdWlkaXN0YW50LCByb3VuZHMgdG93YXJkcyBldmVuIG5laWdoYm91ci5cblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9IQUxGX0VWRU4gPSBEZWNpbWFsLlJPVU5EX0hBTEZfRVZFTjtcblxuXHQvKipcblx0ICogQ2xhc3MgY29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9IGFtb3VudFxuXHQgKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeVxuXHQgKi9cblx0Y29uc3RydWN0b3IoIGFtb3VudCwgY3VycmVuY3kgKSB7XG5cdFx0dGhpcy5zZXRDdXJyZW5jeSggY3VycmVuY3kgKVxuXHRcdFx0LnNldEFtb3VudCggYW1vdW50IClcblx0XHRcdC5zZXRGb3JtYXR0ZXIoKTtcblx0XHRPYmplY3QuZnJlZXplKCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBjdXJyZW5jeSBwcm9wZXJ0eVxuXHQgKlxuXHQgKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeVxuXHQgKiBAcmV0dXJuIHtNb25leX0gRWl0aGVyIHRoaXMgTW9uZXkgb3IgbmV3IE1vbmV5IGRlcGVuZGluZyBvbiBzdGF0ZSBvZlxuXHQgKiBwcm9wZXJ0eS5cblx0ICovXG5cdHNldEN1cnJlbmN5KCBjdXJyZW5jeSApIHtcblx0XHRNb25leS5hc3NlcnRDdXJyZW5jeSggY3VycmVuY3kgKTtcblx0XHQvLyBpZiB0aGVyZSdzIGFscmVhZHkgYSBjdXJyZW5jeSBzZXQsIHRoZW4gcmV0dXJuIGEgbmV3IG9iamVjdC5cblx0XHRpZiAoIGluc3RhbmNlT2YoIHRoaXMuY3VycmVuY3ksICdDdXJyZW5jeScgKSApIHtcblx0XHRcdHJldHVybiBuZXcgTW9uZXkoIHRoaXMuYW1vdW50LCBjdXJyZW5jeSApO1xuXHRcdH1cblx0XHR0aGlzLmN1cnJlbmN5ID0gY3VycmVuY3k7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBhbW91bnQgcHJvcGVydHlcblx0ICpcblx0ICogQHBhcmFtIHtEZWNpbWFsfG51bWJlcnxzdHJpbmd9IGFtb3VudFxuXHQgKiBAcmV0dXJuIHtNb25leX0gRWl0aGVyIHRoaXMgTW9uZXkgb3IgbmV3IE1vbmV5IGRlcGVuZGluZyBvbiBzdGF0ZSBvZiB0aGVcblx0ICogcHJvcGVydHkuXG5cdCAqL1xuXHRzZXRBbW91bnQoIGFtb3VudCApIHtcblx0XHRjb25zdCB2YWx1ZSA9IGluc3RhbmNlT2YoIGFtb3VudCwgJ0RlY2ltYWwnICkgP1xuXHRcdFx0YW1vdW50LnRvTnVtYmVyKCkgOlxuXHRcdFx0YW1vdW50O1xuXHRcdC8vIGlmIHRoZXJlJ3MgYWxyZWFkeSBhbiBhbW91bnQgc2V0LCB0aGVuIHJldHVybiBhIG5ldyBvYmplY3QuXG5cdFx0aWYgKCBpbnN0YW5jZU9mKCB0aGlzLmFtb3VudCwgJ0RlY2ltYWwnICkgKSB7XG5cdFx0XHRyZXR1cm4gbmV3IE1vbmV5KCBuZXcgRGVjaW1hbCggdmFsdWUgKSwgdGhpcy5jdXJyZW5jeSApO1xuXHRcdH1cblx0XHR0aGlzLmFtb3VudCA9IG5ldyBEZWNpbWFsKCB2YWx1ZSApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgZm9ybWF0dGVyIGZvciBtb25leSB2YWx1ZXNcblx0ICpcblx0ICogQHJldHVybiB7TW9uZXl9IEFuIGluc3RhbmNlIG9mIHRoaXMgb2JqZWN0LlxuXHQgKi9cblx0c2V0Rm9ybWF0dGVyKCkge1xuXHRcdC8vIG9ubHkgaW5pdGlhbGl6ZSBpZiBpdHMgbm90IGFscmVhZHkgaW5pdGlhbGl6ZWRcblx0XHRpZiAoIGlzRW1wdHkoIHRoaXMuZm9ybWF0dGVyICkgKSB7XG5cdFx0XHR0aGlzLmZvcm1hdHRlciA9IHsgLi4uQWNjb3VudGluZyB9O1xuXHRcdFx0dGhpcy5mb3JtYXR0ZXIuc2V0dGluZ3MgPSB7XG5cdFx0XHRcdC4uLnRoaXMuZm9ybWF0dGVyLnNldHRpbmdzLFxuXHRcdFx0XHQuLi50aGlzLmN1cnJlbmN5LnRvQWNjb3VudGluZ1NldHRpbmdzKCkuY3VycmVuY3ksXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIE1vbmV5IGFzIGl0cyBzdWJ1bml0cy5cblx0ICpcblx0ICogQHJldHVybiB7bnVtYmVyfSBJZiB0aGUgc3VidW5pdHMgaXMgMTAwIGFuZCB0aGUgdmFsdWUgaXMgLjQ1LFxuXHQgKiB0aGlzIHJldHVybnMgNDUwXG5cdCAqL1xuXHR0b1N1YnVuaXRzKCkge1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC50b051bWJlcigpICogdGhpcy5jdXJyZW5jeS5zdWJ1bml0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIG1vbmV5IG9iamVjdCBlcXVhbHMgdGhpcyBtb25leSBvYmplY3QuXG5cdCAqIENvbXBhcmVzIGJvdGggYW1vdW50IGFuZCBjdXJyZW5jeS5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGlzIGlzIGVxdWFsLiBGYWxzZSBtZWFucyBpdCBpc24ndC5cblx0ICovXG5cdGVxdWFscyggb3RoZXIgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0TW9uZXkoIG90aGVyICk7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmVxdWFscyggb3RoZXIuYW1vdW50ICkgJiZcblx0XHRcdHRoaXMuaGFzU2FtZUN1cnJlbmN5KCBvdGhlciApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgd2hldGhlciBwcm92aWRlZCBNb25leSBvYmplY3QncyBDdXJyZW5jeSBlcXVhbHMgdGhpcyBNb25leVxuXHQgKiBvYmplY3QncyBDdXJyZW5jeS5cblx0ICpcblx0ICogVGhpcyBkb2VzIGEgc2hhbGxvdyBjb21wYXJpc29uIG9uIHRoZSBzZXJpYWxpemVkIHZhbHVlcyBmb3IgdGhlIGN1cnJlbmN5XG5cdCAqIG9iamVjdHMuICBUaGF0IHdheSBpZiB0aGUgY3VycmVuY2llcyBhcmUgZGlmZmVyZW50IGluc3RhbmNlcywgYnV0IHNoYXJlXG5cdCAqIHRoZSBzYW1lIGludGVybmFsIHZhbHVlLCB0aGV5IGFyZSBjb25zaWRlcmVkIGVxdWFsLlxuXHQgKlxuXHQgKiBAcGFyYW0ge01vbmV5fSBvdGhlclxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoZSBjdXJyZW5jaWVzIGFyZSBlcXVhbC5cblx0ICovXG5cdGhhc1NhbWVDdXJyZW5jeSggb3RoZXIgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0TW9uZXkoIG90aGVyICk7XG5cdFx0cmV0dXJuIGlzU2hhbGxvd0VxdWFsKFxuXHRcdFx0dGhpcy5jdXJyZW5jeS50b0pTT04oKSxcblx0XHRcdG90aGVyLmN1cnJlbmN5LnRvSlNPTigpLFxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQWRkIG9uZSBNb25leSBvYmplY3QgdG8gdGhpcyBNb25leSBvYmplY3Rcblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7TW9uZXl9IFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgTW9uZXkuXG5cdCAqL1xuXHRhZGQoIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydFVzaW5nU2FtZUN1cnJlbmN5KCB0aGlzLCBvdGhlciApO1xuXHRcdHJldHVybiBuZXcgTW9uZXkoIHRoaXMuYW1vdW50LnBsdXMoIG90aGVyLmFtb3VudCApLCB0aGlzLmN1cnJlbmN5ICk7XG5cdH1cblxuXHQvKipcblx0ICogU3VidHJhY3Qgb25lIE1vbmV5IG9iamVjdCBmcm9tIHRoaXMgTW9uZXkgb2JqZWN0XG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge01vbmV5fSBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIE1vbmV5XG5cdCAqL1xuXHRzdWJ0cmFjdCggb3RoZXIgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3koIHRoaXMsIG90aGVyICk7XG5cdFx0cmV0dXJuIG5ldyBNb25leSggdGhpcy5hbW91bnQubWludXMoIG90aGVyLmFtb3VudCApLCB0aGlzLmN1cnJlbmN5ICk7XG5cdH1cblxuXHQvKipcblx0ICogTXVsdGlwbHkgdGhpcyBtb25leSBvYmplY3QgYnkgdGhlIHByb3ZpZGVkIG11bHRpcGxpZXIgdmFsdWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBtdWx0aXBsaWVyXG5cdCAqIEByZXR1cm4ge01vbmV5fSBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIE1vbmV5XG5cdCAqL1xuXHRtdWx0aXBseSggbXVsdGlwbGllciApIHtcblx0XHRyZXR1cm4gbmV3IE1vbmV5KCB0aGlzLmFtb3VudC50aW1lcyggbXVsdGlwbGllciApLCB0aGlzLmN1cnJlbmN5ICk7XG5cdH1cblxuXHQvKipcblx0ICogRGl2aWRlIHRoaXMgbW9uZXkgb2JqZWN0IGJ5IHRoZSBwcm92aWRlZCBkaXZpc29yIHZhbHVlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gZGl2aXNvclxuXHQgKiBAcmV0dXJuIHtNb25leX0gUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiBNb25leVxuXHQgKi9cblx0ZGl2aWRlKCBkaXZpc29yICkge1xuXHRcdHJldHVybiBuZXcgTW9uZXkoIHRoaXMuYW1vdW50LmRpdmlkZWRCeSggZGl2aXNvciApLCB0aGlzLmN1cnJlbmN5ICk7XG5cdH1cblxuXHQvKipcblx0ICogQWxsb2NhdGVzIGZ1bmQgYmFzZXMgb24gdGhlIHJhdGlvcyBwcm92aWRlZCByZXR1cm5pbmcgYW4gYXJyYXkgb2YgTW9uZXlcblx0ICogb2JqZWN0cyBhcyBhIHByb2R1Y3Qgb2YgdGhlIGFsbG9jYXRpb24uXG5cdCAqXG5cdCAqIEV4YW1wbGU6IHNwbGl0dGluZyBhIHByb3ZpZGVkIE1vbmV5IG9iamVjdCB0aHJlZSBlcXVhbCB3YXlzLlxuXHQgKlxuXHQgKiBgYGBcblx0ICogY29uc3Qgc3BsaXRNb25leSA9IG1vbmV5SW5zdGFuY2UuYWxsb2NhdGUoIFsgMSwgMSwgMSBdICk7XG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBFeGFtcGxlOiBzcGxpdHRpbmcgYSBwcm92aWRlZCBNb25leSBvYmplY3QgdHdvIHdheXMgd2l0aCBvbmUgaGF2aW5nIDc1JVxuXHQgKiBvZiB0aGUgYWxsb2NhdGlvbi5cblx0ICpcblx0ICogYGBgXG5cdCAqIGNvbnN0IHNwbGl0TW9uZXkgPSBtb25leUluc3RhbmNlLmFsbG9jYXRlKCBbIDc1LCAyNSBdICk7XG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBOb3RlOiBBcnJheSB2YWx1ZXMgZm9yIHJhdGlvcyBhcmUgc2ltcGx5IHRvdGFsbGVkIGFuZCB0aGVuIGVhY2ggZWxlbWVudFxuXHQgKiBpcyBjb25zaWRlcmVkIGEgZnJhY3Rpb24gb2YgdGhlIHRvdGFsIHZhbHVlLiAgU28gaG93IHlvdSBzdWJtaXQgcmF0aW9cblx0ICogdmFsdWVzIGlzIHVwIHRvIHlvdSBmb3Igd2hhdGV2ZXIgaXMgbW9zdCBjbGVhciB0byB5b3UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyW119IHJhdGlvc1xuXHQgKiBAcmV0dXJuIHtNb25leVtdfSBBbiBhcnJheSBvZiBNb25leSBvYmplY3RzXG5cdCAqL1xuXHRhbGxvY2F0ZSggcmF0aW9zICkge1xuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdGNvbnN0IHJlc3VsdHMgPSBbXTtcblx0XHRjb25zdCBjb252ZXJ0ZWRSYXRpb3MgPSBbXTtcblx0XHRsZXQgcmVtYWluZGVyID0gbmV3IERlY2ltYWwoIHNlbGYudG9TdWJ1bml0cygpICk7XG5cdFx0bGV0IHRvdGFsID0gbmV3IERlY2ltYWwoIDAgKTtcblx0XHQvLyBjb252ZXJ0IHJhdGlvcyB0byBkZWNpbWFsIGFuZCBnZW5lcmF0ZSB0b3RhbC5cblx0XHRyYXRpb3MuZm9yRWFjaCggKCByYXRpbyApID0+IHtcblx0XHRcdGNvbnZlcnRlZFJhdGlvcy5wdXNoKFxuXHRcdFx0XHRpbnN0YW5jZU9mKCByYXRpbywgJ0RlY2ltYWwnICkgPyByYXRpbyA6IG5ldyBEZWNpbWFsKCByYXRpbyApLFxuXHRcdFx0KTtcblx0XHRcdHRvdGFsID0gdG90YWwucGx1cyggcmF0aW8gKTtcblx0XHR9ICk7XG5cdFx0Y29udmVydGVkUmF0aW9zLmZvckVhY2goICggcmF0aW8gKSA9PiB7XG5cdFx0XHRjb25zdCBzaGFyZSA9IG5ldyBEZWNpbWFsKFxuXHRcdFx0XHRNYXRoLmZsb29yKFxuXHRcdFx0XHRcdHNlbGYudG9TdWJ1bml0cygpICogcmF0aW8udG9OdW1iZXIoKSAvIHRvdGFsLnRvTnVtYmVyKCksXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdFx0cmVzdWx0cy5wdXNoKFxuXHRcdFx0XHRuZXcgTW9uZXkoXG5cdFx0XHRcdFx0c2hhcmUuZGl2aWRlZEJ5KCB0aGlzLmN1cnJlbmN5LnN1YnVuaXRzICksXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW5jeSxcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0XHRyZW1haW5kZXIgPSByZW1haW5kZXIubWludXMoIHNoYXJlICk7XG5cdFx0fSApO1xuXHRcdGZvciAoIGxldCBpID0gMDsgcmVtYWluZGVyLmdyZWF0ZXJUaGFuKCAwICk7IGkrKyApIHtcblx0XHRcdHJlc3VsdHNbIGkgXSA9IG5ldyBNb25leShcblx0XHRcdFx0KFxuXHRcdFx0XHRcdG5ldyBEZWNpbWFsKCByZXN1bHRzWyBpIF0udG9TdWJ1bml0cygpIClcblx0XHRcdFx0KVxuXHRcdFx0XHRcdC5wbHVzKCAxIClcblx0XHRcdFx0XHQuZGl2aWRlZEJ5KCB0aGlzLmN1cnJlbmN5LnN1YnVuaXRzICksXG5cdFx0XHRcdHRoaXMuY3VycmVuY3ksXG5cdFx0XHQpO1xuXHRcdFx0cmVtYWluZGVyID0gcmVtYWluZGVyLm1pbnVzKCAxICk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhcmVzIHR3byBpbnN0YW5jZXMgb2YgTW9uZXkuXG5cdCAqXG5cdCAqIE5vdGU6IFwic2FtZVwiIG1lYW5zIGhhcyBlcXVhbCB2YWx1ZSBhbmQgZXF1YWwgY3VycmVuY3kuICBJdCBkb2VzIG5vdCBtZWFuXG5cdCAqIGlkZW50aWNhbCBpbnN0YW5jZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge251bWJlcn0gMCBpZiB0aGV5IGFyZSB0aGUgc2FtZSwgMSBpZiB0aGlzIGlzIGdyZWF0ZXIgdGhhblxuXHQgKiBvdGhlciBhbmQgLTEgaWYgb3RoZXIgaXMgZ3JlYXRlciB0aGFuIHRoaXMuXG5cdCAqL1xuXHRjb21wYXJlKCBvdGhlciApIHtcblx0XHQvL3F1aWNrbHkgcmV0dXJuIDAgaWYgaWRlbnRpY2FsXG5cdFx0aWYgKCB0aGlzID09PSBvdGhlciApIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSggdGhpcywgb3RoZXIgKTtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQuY29tcGFyZWRUbyggb3RoZXIuYW1vdW50ICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgd2hldGhlciB0aGlzIE1vbmV5IG9iamVjdCBpcyBncmVhdGVyIHRoYW4gdGhlIG90aGVyIE1vbmV5XG5cdCAqIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoaXMgaXMgZ3JlYXRlciB0aGFuIG90aGVyLlxuXHQgKi9cblx0Z3JlYXRlclRoYW4oIG90aGVyICkge1xuXHRcdE1vbmV5LmFzc2VydFVzaW5nU2FtZUN1cnJlbmN5KCB0aGlzLCBvdGhlciApO1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5ncmVhdGVyVGhhbiggb3RoZXIuYW1vdW50ICk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgd2hldGhlciB0aGlzIE1vbmV5IG9iamVjdCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIG90aGVyXG5cdCAqIE1vbmV5IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoaXMgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZVxuXHQgKiAgICAgb3RoZXIuXG5cdCAqL1xuXHRncmVhdGVyVGhhbk9yRXF1YWxUbyggb3RoZXIgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3koIHRoaXMsIG90aGVyICk7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmdyZWF0ZXJUaGFuT3JFcXVhbFRvKCBvdGhlci5hbW91bnQgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wYXJlcyB3aGV0aGVyIHRoaXMgTW9uZXkgb2JqZWN0IGlzIGxlc3MgdGhhbiB0aGUgb3RoZXIgTW9uZXkgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge01vbmV5fSBvdGhlclxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBJZiB0cnVlIHRoZW4gdGhpcyBpcyBsZXNzIHRoYW4gb3RoZXJcblx0ICovXG5cdGxlc3NUaGFuKCBvdGhlciApIHtcblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSggdGhpcywgb3RoZXIgKTtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQubGVzc1RoYW4oIG90aGVyLmFtb3VudCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhcmVzIHdoZXRoZXIgdGhpcyBNb25leSBvYmplY3QgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSBvdGhlclxuXHQgKiBNb25leSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGlzIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byBvdGhlci5cblx0ICovXG5cdGxlc3NUaGFuT3JFcXVhbFRvKCBvdGhlciApIHtcblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSggdGhpcywgb3RoZXIgKTtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQubGVzc1RoYW5PckVxdWFsVG8oIG90aGVyLmFtb3VudCApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyBpZiB0aGlzIG9iamVjdCBoYXMgdGhlIHZhbHVlIG9mIDBcblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoZSB2YWx1ZSBpcyAwLlxuXHQgKi9cblx0aXNaZXJvKCkge1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5pc1plcm8oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhlIHZhbHVlIGluIHRoaXMgTW9uZXkgb2JqZWN0IGlzIG5lZ2F0aXZlLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBJZiB0cnVlIHRoZW4gdGhlIHZhbHVlIGlzIG5lZ2F0aXZlLlxuXHQgKi9cblx0aXNOZWdhdGl2ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQuaXNOZWdhdGl2ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyBpZiB0aGUgdmFsdWUgaW4gdGhpcyBNb25leSBvYmplY3QgaXMgcG9zaXRpdmUuXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGUgdmFsdWUgaXMgcG9zaXRpdmUuXG5cdCAqL1xuXHRpc1Bvc2l0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5pc1Bvc2l0aXZlKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBNb25leSBvYmplY3QgYXMgYSBudW1iZXIgcHJpbWl0aXZlLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IFJldHVybnMgYSBudW1iZXIuXG5cdCAqL1xuXHR0b051bWJlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQudG9OdW1iZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhpcyBNb25leSBvYmplY3QgaW4gbm9ybWFsIChmaXhlZC1wb2ludCkgbm90YXRpb25cblx0ICogcm91bmRlZCB0byBgZGVjaW1hbFBsYWNlc2AgdXNpbmcgYHJvdW5kaW5nYCBtb2RlLlxuXHQgKlxuXHQgKiBJZiB0aGUgdmFsdWUgb2YgdGhpcyBpbnN0YW5jZSBpbiBub3JtYWwgbm90YXRpb24gaGFzIGZld2VyIHRoYW5cblx0ICogZGVjaW1hbFBsYWNlcyBmcmFjdGlvbiBkaWdpdHMsIHRoZSByZXR1cm4gdmFsdWUgd2lsbCBiZSBhcHBlbmRlZCB3aXRoXG5cdCAqIHplcm9zIGFjY29yZGluZ2x5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gZGVjaW1hbFBsYWNlcyBUaGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIHRvIHJvdW5kIHRvLlxuXHQgKiBJZiBub3QgcHJvdmlkZWQgdXNlcyB0aGUgaW50ZXJuYWwgZGVjaW1hbCBwbGFjZSB2YWx1ZS5cblx0ICogQHBhcmFtIHtudW1iZXJ9IHJvdW5kaW5nIFdoYXQgcm91bmRpbmcgdHlwZSB0byB1c2UgKDAtOCkuICBVc2UgTW9uZXlcblx0ICogICAgIFJPVU5EIGNvbnN0YW50cy4gIERlZmF1bHRzIHRvIE1vbmV5LlJPVU5EX0hBTEZfVVBcblx0ICogQHJldHVybiB7c3RyaW5nfSBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBNb25leVxuXHQgKiBpbiBub3JtYWwgKGZpeGVkLXBvaW50KSBub3RhdGlvbiByb3VuZGVkIHRvIGRlY2ltYWwgcGxhY2VzIHVzaW5nXG5cdCAqIHJvdW5kaW5nIG1vZGUuXG5cdCAqL1xuXHR0b0ZpeGVkKCBkZWNpbWFsUGxhY2VzLCByb3VuZGluZyA9IE1vbmV5LlJPVU5EX0hBTEZfVVAgKSB7XG5cdFx0ZGVjaW1hbFBsYWNlcyA9IGRlY2ltYWxQbGFjZXMgfHwgdGhpcy5jdXJyZW5jeS5kZWNpbWFsUGxhY2VzO1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC50b0ZpeGVkKCBkZWNpbWFsUGxhY2VzLCByb3VuZGluZyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBuZXcgTW9uZXkgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgTW9uZXkgcm91bmRlZFxuXHQgKiB0byBhIHdob2xlIG51bWJlciB1c2luZyByb3VuZGluZyBtb2RlIHJvdW5kaW5nIHNldCBvbiB0aGUgb3JpZ2luYWxcblx0ICogRGVjaW1hbCBhbW91bnQuXG5cdCAqXG5cdCAqIEByZXR1cm4ge01vbmV5fSBBIG5ldyBNb25leSBvYmplY3Rcblx0ICovXG5cdHRvSW50ZWdlck1vbmV5KCkge1xuXHRcdHJldHVybiBuZXcgTW9uZXkoXG5cdFx0XHR0aGlzLmFtb3VudC50b0ludGVnZXIoKSxcblx0XHRcdHRoaXMuY3VycmVuY3ksXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIE1vbmV5IG9iamVjdCBhcyBhIGZvcm1hdHRlZCBzdHJpbmcgYWNjb3JkaW5nXG5cdCAqIHRvIHRoZSBjdXJyZW5jeSBjb25maWd1cmF0aW9uLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFJldHVybnMgYSBmb3JtYXR0ZWQgc3RyaW5nIGFjY29yZGluZyB0byBDdXJyZW5jeS5cblx0ICovXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmZvcm1hdHRlci5mb3JtYXQoXG5cdFx0XHR0aGlzLmFtb3VudC50b051bWJlcigpLFxuXHRcdFx0dGhpcy5mb3JtYXR0ZXIuc2V0dGluZ3MsXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJuIHsgT2JqZWN0IH0gUmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSBzZXJpYWxpemVkXG5cdCAqIHZhbHVlIG9mIHRoaXMgb2JqZWN0LlxuXHQgKi9cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRhbW91bnQ6IHRoaXMuYW1vdW50LnRvSlNPTigpLFxuXHRcdFx0Y3VycmVuY3k6IHRoaXMuY3VycmVuY3kudG9KU09OKCksXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIGlmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBNb25leS5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gbW9uZXlcblx0ICogQHRocm93cyB7VHlwZUVycm9yfVxuXHQgKi9cblx0c3RhdGljIGFzc2VydE1vbmV5ID0gKCBtb25leSApID0+IHtcblx0XHRhc3NlcnRNb25leSggbW9uZXkgKTtcblx0fTtcblxuXHQvKipcblx0ICogQXNzZXJ0cyBpZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgQ3VycmVuY3kuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5XG5cdCAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cblx0ICovXG5cdHN0YXRpYyBhc3NlcnRDdXJyZW5jeSA9ICggY3VycmVuY3kgKSA9PiB7XG5cdFx0YXNzZXJ0Q3VycmVuY3koIGN1cnJlbmN5ICk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgaWYgdGhlIHByb3ZpZGVkIHZhbHVlcyBhcmUgYm90aCBNb25leSBvYmplY3RzIGFuZCBoYXZlIEVxdWFsXG5cdCAqIEN1cnJlbmN5IG9iamVjdHMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IHRoaXNNb25leVxuXHQgKiBAcGFyYW0ge01vbmV5fSBvdGhlck1vbmV5XG5cdCAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cblx0ICovXG5cdHN0YXRpYyBhc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSA9ICggdGhpc01vbmV5LCBvdGhlck1vbmV5ICkgPT4ge1xuXHRcdGFzc2VydE1vbmV5KCB0aGlzTW9uZXkgKTtcblx0XHRhc3NlcnRNb25leSggb3RoZXJNb25leSApO1xuXHRcdGFzc2VydFNhbWVDdXJyZW5jeSggdGhpc01vbmV5LmN1cnJlbmN5LCBvdGhlck1vbmV5LmN1cnJlbmN5ICk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgaWYgdHdvIGN1cnJlbmNpZXMgYXJlIHNoYWxsb3cgZXF1YWwuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5QVxuXHQgKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeUJcblx0ICogQHRocm93cyB7RXhjZXB0aW9ufVxuXHQgKi9cblx0c3RhdGljIGFzc2VydFNhbWVDdXJyZW5jeSA9ICggY3VycmVuY3lBLCBjdXJyZW5jeUIgKSA9PiB7XG5cdFx0YXNzZXJ0U2FtZUN1cnJlbmN5KCBjdXJyZW5jeUEsIGN1cnJlbmN5QiApO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZWNlaXZlcyBhbiBpbmNvbWluZyB2YWx1ZSB0aGF0IGNvdWxkIGJlIGEgbW9uZXkgZm9ybWF0dGVkXG5cdCAqIHN0cmluZyBhbmQgcmV0dXJucyBhIE1vbmV5IHZhbHVlIG9iamVjdCB3aXRoIHRoZSBjb3JyZWN0IHZhbHVlXG5cdCAqIGNvbnNpZGVyaW5nIHRoZSBwcm92aWRlZCBjdXJyZW5jeS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBtb25leVZhbHVlXG5cdCAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5XG5cdCAqXG5cdCAqIEByZXR1cm4ge01vbmV5fSBBbiBpbnN0YW5jZSBvZiBhIG1vbmV5IHZhbHVlIG9iamVjdFxuXHQgKi9cblx0c3RhdGljIGZyb21Nb25leVZhbHVlID0gKCBtb25leVZhbHVlLCBjdXJyZW5jeSApID0+IHtcblx0XHRhc3NlcnRDdXJyZW5jeSggY3VycmVuY3kgKTtcblx0XHQvLyBkZXRlY3QgaWYgaW5jb21pbmcgdmFsdWUgaGFzIGEgY3VycmVuY3kgc2lnbiBub3QgbWF0Y2hpbmcgcHJvdmlkZWRcblx0XHQvLyBjdXJyZW5jeS4gIFRoaXMgZG9lc24ndCBwcm92aWRlIGZ1bGwgcHJvdGVjdGlvbiBmcm9tIGltcHJvcGVyXG5cdFx0Ly8gdmFsdWVzIHNlbnQgaW4gYnV0IGlzIGFuIGluaXRpYWwgc2FmZWd1YXJkLlxuXHRcdGlmICggdHlwZW9mIG1vbmV5VmFsdWUgPT09ICdzdHJpbmcnICkge1xuXHRcdFx0Y29uc3QgbWF0Y2ggPSBtb25leVZhbHVlLm1hdGNoKCAvW15cXGRcXC5cXCxcXHNdKy8gKTtcblx0XHRcdGlmICggbWF0Y2ggJiYgbWF0Y2hbIDAgXSAhPT0gY3VycmVuY3kuc2lnbiApIHtcblx0XHRcdFx0Ly8gVGhlIGZpcnN0IGVycm9yIG1lc3NhZ2UgaXMgdXNlZCBpZiB3ZSBoYXZlIGp1c3Qgb25lIGNoYXJhY3RlclxuXHRcdFx0XHQvLyByZXR1cm5lZCB3aGljaCBpcyBsaWtlbHkgdGhlIGN1cnJlbmN5IHN5bWJvbC4gIE90aGVyd2lzZSxcblx0XHRcdFx0Ly8gZ2l2ZSBhIG1vcmUgZ2VuZXJpYyBtZXNzYWdlLlxuXHRcdFx0XHRjb25zdCBtZXNzYWdlID0gbWF0Y2hbIDAgXS5sZW5ndGggPT09IDEgP1xuXHRcdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0XHQnVGhlIHByb3ZpZGVkIG1vbmV5IHZhbHVlIGhhcyBhICUxJHMgc2lnbiBpbiBpdCwgYnV0IHRoZSBwcm92aWRlZCBjdXJyZW5jeSB2YWx1ZSBvYmplY3QgZGVmaW5lcyAlMiRzIGFzIHRoZSBjdXJyZW5jeSBzaWduLicsXG5cdFx0XHRcdFx0XHRtYXRjaFsgMCBdLFxuXHRcdFx0XHRcdFx0Y3VycmVuY3kuc2lnbixcblx0XHRcdFx0XHQpIDpcblx0XHRcdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHRcdFx0J1RoZSBwcm92aWRlZCBtb25leSB2YWx1ZSBoYXMgbm9uIG51bWVyaWMgc3RyaW5ncyBpbiBpdCAoJTEkcyksIHBsZWFzZSBkb3VibGUtY2hlY2sgdGhlIHZhbHVlLicsXG5cdFx0XHRcdFx0XHRtYXRjaFsgMCBdLFxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBtZXNzYWdlICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIHNldCB0aGUgaW5pdGlhbCB2YWx1ZSBvYmplY3QgdXNpbmcgdGhlIGN1cnJlbmN5XG5cdFx0Y29uc3QgbW9uZXkgPSBuZXcgTW9uZXkoIDAsIGN1cnJlbmN5ICk7XG5cdFx0Ly8gc2V0IGEgbmV3IHZhbHVlIHVzaW5nIHRoZSBwYXJzZSBvbiB0aGUgZm9ybWF0dGVyLlxuXHRcdHJldHVybiBtb25leS5zZXRBbW91bnQoIG1vbmV5LmZvcm1hdHRlci5wYXJzZSggbW9uZXlWYWx1ZSApICk7XG5cdH07XG59XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhvdXRIb2xlczsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQ7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlO1xuXG4gIHRyeSB7XG4gICAgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHtcbiAgaWYgKGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0ID0gUmVmbGVjdC5jb25zdHJ1Y3Q7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0ID0gZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7XG4gICAgICB2YXIgYSA9IFtudWxsXTtcbiAgICAgIGEucHVzaC5hcHBseShhLCBhcmdzKTtcbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IEZ1bmN0aW9uLmJpbmQuYXBwbHkoUGFyZW50LCBhKTtcbiAgICAgIHZhciBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcigpO1xuICAgICAgaWYgKENsYXNzKSBzZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgQ2xhc3MucHJvdG90eXBlKTtcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF9jb25zdHJ1Y3QuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0OyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsInZhciBzdXBlclByb3BCYXNlID0gcmVxdWlyZShcIi4vc3VwZXJQcm9wQmFzZVwiKTtcblxuZnVuY3Rpb24gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgIT09IFwidW5kZWZpbmVkXCIgJiYgUmVmbGVjdC5nZXQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9nZXQgPSBSZWZsZWN0LmdldDtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9nZXQgPSBmdW5jdGlvbiBfZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICB2YXIgYmFzZSA9IHN1cGVyUHJvcEJhc2UodGFyZ2V0LCBwcm9wZXJ0eSk7XG4gICAgICBpZiAoIWJhc2UpIHJldHVybjtcbiAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBwcm9wZXJ0eSk7XG5cbiAgICAgIGlmIChkZXNjLmdldCkge1xuICAgICAgICByZXR1cm4gZGVzYy5nZXQuY2FsbChyZWNlaXZlcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlciB8fCB0YXJnZXQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXQ7IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsInZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL2dldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfc3VwZXJQcm9wQmFzZShvYmplY3QsIHByb3BlcnR5KSB7XG4gIHdoaWxlICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpKSB7XG4gICAgb2JqZWN0ID0gZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcbiAgICBpZiAob2JqZWN0ID09PSBudWxsKSBicmVhaztcbiAgfVxuXG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3N1cGVyUHJvcEJhc2U7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsIi8qKlxuICogVGhlIGxpYnJhcnkncyBzZXR0aW5ncyBjb25maWd1cmF0aW9uIG9iamVjdC5cbiAqXG4gKiBDb250YWlucyBkZWZhdWx0IHBhcmFtZXRlcnMgZm9yIGN1cnJlbmN5IGFuZCBudW1iZXIgZm9ybWF0dGluZ1xuICovXG5jb25zdCBzZXR0aW5ncyA9IHtcbiAgc3ltYm9sOiAnJCcsICAgICAgICAvLyBkZWZhdWx0IGN1cnJlbmN5IHN5bWJvbCBpcyAnJCdcbiAgZm9ybWF0OiAnJXMldicsICAgICAvLyBjb250cm9scyBvdXRwdXQ6ICVzID0gc3ltYm9sLCAldiA9IHZhbHVlIChjYW4gYmUgb2JqZWN0LCBzZWUgZG9jcylcbiAgZGVjaW1hbDogJy4nLCAgICAgICAvLyBkZWNpbWFsIHBvaW50IHNlcGFyYXRvclxuICB0aG91c2FuZDogJywnLCAgICAgIC8vIHRob3VzYW5kcyBzZXBhcmF0b3JcbiAgcHJlY2lzaW9uOiAyLCAgICAgICAvLyBkZWNpbWFsIHBsYWNlc1xuICBncm91cGluZzogMywgICAgICAgIC8vIGRpZ2l0IGdyb3VwaW5nIChub3QgaW1wbGVtZW50ZWQgeWV0KVxuICBzdHJpcFplcm9zOiBmYWxzZSwgIC8vIHN0cmlwIGluc2lnbmlmaWNhbnQgemVyb3MgZnJvbSBkZWNpbWFsIHBhcnRcbiAgZmFsbGJhY2s6IDAgICAgICAgICAvLyB2YWx1ZSByZXR1cm5lZCBvbiB1bmZvcm1hdCgpIGZhaWx1cmVcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNldHRpbmdzO1xuIiwiaW1wb3J0IHNldHRpbmdzIGZyb20gJy4vc2V0dGluZ3MnO1xuXG4vKipcbiAqIFRha2VzIGEgc3RyaW5nL2FycmF5IG9mIHN0cmluZ3MsIHJlbW92ZXMgYWxsIGZvcm1hdHRpbmcvY3J1ZnQgYW5kIHJldHVybnMgdGhlIHJhdyBmbG9hdCB2YWx1ZVxuICogQWxpYXM6IGBhY2NvdW50aW5nLnBhcnNlKHN0cmluZylgXG4gKlxuICogRGVjaW1hbCBtdXN0IGJlIGluY2x1ZGVkIGluIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWF0Y2ggZmxvYXRzIChkZWZhdWx0cyB0b1xuICogYWNjb3VudGluZy5zZXR0aW5ncy5kZWNpbWFsKSwgc28gaWYgdGhlIG51bWJlciB1c2VzIGEgbm9uLXN0YW5kYXJkIGRlY2ltYWxcbiAqIHNlcGFyYXRvciwgcHJvdmlkZSBpdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICpcbiAqIEFsc28gbWF0Y2hlcyBicmFja2V0ZWQgbmVnYXRpdmVzIChlZy4gJyQgKDEuOTkpJyA9PiAtMS45OSlcbiAqXG4gKiBEb2Vzbid0IHRocm93IGFueSBlcnJvcnMgKGBOYU5gcyBiZWNvbWUgMCkgYnV0IHRoaXMgbWF5IGNoYW5nZSBpbiBmdXR1cmVcbiAqXG4gKiBgYGBqc1xuICogIGFjY291bnRpbmcudW5mb3JtYXQoXCLCoyAxMiwzNDUsNjc4LjkwIEdCUFwiKTsgLy8gMTIzNDU2NzguOVxuICogYGBgXG4gKlxuICogQG1ldGhvZCB1bmZvcm1hdFxuICogQGZvciBhY2NvdW50aW5nXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheTxTdHJpbmc+fSB2YWx1ZSBUaGUgc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgY29udGFpbmluZyB0aGUgbnVtYmVyL3MgdG8gcGFyc2UuXG4gKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgICAgICBkZWNpbWFsIE51bWJlciBvZiBkZWNpbWFsIGRpZ2l0cyBvZiB0aGUgcmVzdWx0YW50IG51bWJlclxuICogQHJldHVybiB7RmxvYXR9IFRoZSBwYXJzZWQgbnVtYmVyXG4gKi9cbmZ1bmN0aW9uIHVuZm9ybWF0KHZhbHVlLCBkZWNpbWFsID0gc2V0dGluZ3MuZGVjaW1hbCwgZmFsbGJhY2sgPSBzZXR0aW5ncy5mYWxsYmFjaykge1xuICAvLyBSZWN1cnNpdmVseSB1bmZvcm1hdCBhcnJheXM6XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5tYXAoKHZhbCkgPT4gdW5mb3JtYXQodmFsLCBkZWNpbWFsLCBmYWxsYmFjaykpO1xuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSB2YWx1ZSBhcy1pcyBpZiBpdCdzIGFscmVhZHkgYSBudW1iZXI6XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSByZXR1cm4gdmFsdWU7XG5cbiAgIC8vIEJ1aWxkIHJlZ2V4IHRvIHN0cmlwIG91dCBldmVyeXRoaW5nIGV4Y2VwdCBkaWdpdHMsIGRlY2ltYWwgcG9pbnQgYW5kIG1pbnVzIHNpZ246XG4gIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnW14wLTktKC0pLScgKyBkZWNpbWFsICsgJ10nLCBbJ2cnXSk7XG4gIGNvbnN0IHVuZm9ybWF0dGVkVmFsdWVTdHJpbmcgPVxuICAgICAgKCcnICsgdmFsdWUpXG4gICAgICAucmVwbGFjZShyZWdleCwgJycpICAgICAgICAgLy8gc3RyaXAgb3V0IGFueSBjcnVmdFxuICAgICAgLnJlcGxhY2UoZGVjaW1hbCwgJy4nKSAgICAgIC8vIG1ha2Ugc3VyZSBkZWNpbWFsIHBvaW50IGlzIHN0YW5kYXJkXG4gICAgICAucmVwbGFjZSgvXFwoKFstXSpcXGQqW14pXT9cXGQrKVxcKS9nLCAnLSQxJykgLy8gcmVwbGFjZSBicmFja2V0ZWQgdmFsdWVzIHdpdGggbmVnYXRpdmVzXG4gICAgICAucmVwbGFjZSgvXFwoKC4qKVxcKS8sICcnKTsgICAvLyByZW1vdmUgYW55IGJyYWNrZXRzIHRoYXQgZG8gbm90IGhhdmUgbnVtZXJpYyB2YWx1ZVxuXG4gIC8qKlxuICAgKiBIYW5kbGluZyAtdmUgbnVtYmVyIGFuZCBicmFja2V0LCBlZy5cbiAgICogKC0xMDApID0gMTAwLCAtKDEwMCkgPSAxMDAsIC0tMTAwID0gMTAwXG4gICAqL1xuICBjb25zdCBuZWdhdGl2ZSA9ICh1bmZvcm1hdHRlZFZhbHVlU3RyaW5nLm1hdGNoKC8tL2cpIHx8IDIpLmxlbmd0aCAlIDIsXG4gICAgYWJzVW5mb3JtYXR0ZWQgPSBwYXJzZUZsb2F0KHVuZm9ybWF0dGVkVmFsdWVTdHJpbmcucmVwbGFjZSgvLS9nLCAnJykpLFxuICAgIHVuZm9ybWF0dGVkID0gYWJzVW5mb3JtYXR0ZWQgKiAoKG5lZ2F0aXZlKSA/IC0xIDogMSk7XG5cbiAgLy8gVGhpcyB3aWxsIGZhaWwgc2lsZW50bHkgd2hpY2ggbWF5IGNhdXNlIHRyb3VibGUsIGxldCdzIHdhaXQgYW5kIHNlZTpcbiAgcmV0dXJuICFpc05hTih1bmZvcm1hdHRlZCkgPyB1bmZvcm1hdHRlZCA6IGZhbGxiYWNrO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1bmZvcm1hdDtcbiIsIi8qKlxuICogQ2hlY2sgYW5kIG5vcm1hbGlzZSB0aGUgdmFsdWUgb2YgcHJlY2lzaW9uIChtdXN0IGJlIHBvc2l0aXZlIGludGVnZXIpXG4gKi9cbmZ1bmN0aW9uIF9jaGVja1ByZWNpc2lvbih2YWwsIGJhc2UpIHtcbiAgdmFsID0gTWF0aC5yb3VuZChNYXRoLmFicyh2YWwpKTtcbiAgcmV0dXJuIGlzTmFOKHZhbCkgPyBiYXNlIDogdmFsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBfY2hlY2tQcmVjaXNpb247XG4iLCJpbXBvcnQgX2NoZWNrUHJlY2lzaW9uIGZyb20gJy4vaW50ZXJuYWwvY2hlY2tQcmVjaXNpb24nO1xuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4vc2V0dGluZ3MnO1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRvRml4ZWQoKSB0aGF0IHRyZWF0cyBmbG9hdHMgbW9yZSBsaWtlIGRlY2ltYWxzXG4gKlxuICogRml4ZXMgYmluYXJ5IHJvdW5kaW5nIGlzc3VlcyAoZWcuICgwLjYxNSkudG9GaXhlZCgyKSA9PT0gJzAuNjEnKSB0aGF0IHByZXNlbnRcbiAqIHByb2JsZW1zIGZvciBhY2NvdW50aW5nLSBhbmQgZmluYW5jZS1yZWxhdGVkIHNvZnR3YXJlLlxuICpcbiAqIGBgYGpzXG4gKiAgKDAuNjE1KS50b0ZpeGVkKDIpOyAgICAgICAgICAgLy8gXCIwLjYxXCIgKG5hdGl2ZSB0b0ZpeGVkIGhhcyByb3VuZGluZyBpc3N1ZXMpXG4gKiAgYWNjb3VudGluZy50b0ZpeGVkKDAuNjE1LCAyKTsgLy8gXCIwLjYyXCJcbiAqIGBgYFxuICpcbiAqIEBtZXRob2QgdG9GaXhlZFxuICogQGZvciBhY2NvdW50aW5nXG4gKiBAcGFyYW0ge0Zsb2F0fSAgIHZhbHVlICAgICAgICAgVGhlIGZsb2F0IHRvIGJlIHRyZWF0ZWQgYXMgYSBkZWNpbWFsIG51bWJlci5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbcHJlY2lzaW9uPTJdIFRoZSBudW1iZXIgb2YgZGVjaW1hbCBkaWdpdHMgdG8ga2VlcC5cbiAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGdpdmVuIG51bWJlciB0cmFuc2Zvcm1lZCBpbnRvIGEgc3RyaW5nIHdpdGggdGhlIGdpdmVuIHByZWNpc3Npb25cbiAqL1xuZnVuY3Rpb24gdG9GaXhlZCh2YWx1ZSwgcHJlY2lzaW9uKSB7XG4gIHByZWNpc2lvbiA9IF9jaGVja1ByZWNpc2lvbihwcmVjaXNpb24sIHNldHRpbmdzLnByZWNpc2lvbik7XG4gIGNvbnN0IHBvd2VyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbik7XG5cbiAgLy8gTXVsdGlwbHkgdXAgYnkgcHJlY2lzaW9uLCByb3VuZCBhY2N1cmF0ZWx5LCB0aGVuIGRpdmlkZSBhbmQgdXNlIG5hdGl2ZSB0b0ZpeGVkKCk6XG4gIHJldHVybiAoTWF0aC5yb3VuZCgodmFsdWUgKyAxZS04KSAqIHBvd2VyKSAvIHBvd2VyKS50b0ZpeGVkKHByZWNpc2lvbik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvRml4ZWQ7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiXG5mdW5jdGlvbiBfc3RyaXBJbnNpZ25pZmljYW50WmVyb3Moc3RyLCBkZWNpbWFsKSB7XG4gIGNvbnN0IHBhcnRzID0gc3RyLnNwbGl0KGRlY2ltYWwpO1xuICBjb25zdCBpbnRlZ2VyUGFydCA9IHBhcnRzWzBdO1xuICBjb25zdCBkZWNpbWFsUGFydCA9IHBhcnRzWzFdLnJlcGxhY2UoLzArJC8sICcnKTtcblxuICBpZiAoZGVjaW1hbFBhcnQubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBpbnRlZ2VyUGFydCArIGRlY2ltYWwgKyBkZWNpbWFsUGFydDtcbiAgfVxuXG4gIHJldHVybiBpbnRlZ2VyUGFydDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgX3N0cmlwSW5zaWduaWZpY2FudFplcm9zO1xuIiwiaW1wb3J0IG9iamVjdEFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJztcblxuaW1wb3J0IF9zdHJpcEluc2lnbmlmaWNhbnRaZXJvcyBmcm9tICcuL2ludGVybmFsL3N0cmlwSW5zaWduaWZpY2FudFplcm9zJztcbmltcG9ydCBzZXR0aW5ncyBmcm9tICcuL3NldHRpbmdzJztcbmltcG9ydCB0b0ZpeGVkIGZyb20gJy4vdG9GaXhlZCc7XG5cbi8qKlxuICogRm9ybWF0IGEgbnVtYmVyLCB3aXRoIGNvbW1hLXNlcGFyYXRlZCB0aG91c2FuZHMgYW5kIGN1c3RvbSBwcmVjaXNpb24vZGVjaW1hbCBwbGFjZXNcbiAqIEFsaWFzOiBgYWNjb3VudGluZy5mb3JtYXQoKWBcbiAqXG4gKiBMb2NhbGlzZSBieSBvdmVycmlkaW5nIHRoZSBwcmVjaXNpb24gYW5kIHRob3VzYW5kIC8gZGVjaW1hbCBzZXBhcmF0b3JzXG4gKlxuICogYGBganNcbiAqIGFjY291bnRpbmcuZm9ybWF0TnVtYmVyKDUzMTgwMDgpOyAgICAgICAgICAgICAgLy8gNSwzMTgsMDA4XG4gKiBhY2NvdW50aW5nLmZvcm1hdE51bWJlcig5ODc2NTQzLjIxLCB7IHByZWNpc2lvbjogMywgdGhvdXNhbmQ6IFwiIFwiIH0pOyAvLyA5IDg3NiA1NDMuMjEwXG4gKiBgYGBcbiAqXG4gKiBAbWV0aG9kIGZvcm1hdE51bWJlclxuICogQGZvciBhY2NvdW50aW5nXG4gKiBAcGFyYW0ge051bWJlcn0gICAgICAgIG51bWJlciBUaGUgbnVtYmVyIHRvIGJlIGZvcm1hdHRlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgW29wdHM9e31dIE9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgb3B0aW9ucyBvZiB0aGUgbWV0aG9kLlxuICogQHJldHVybiB7U3RyaW5nfSBUaGUgZ2l2ZW4gbnVtYmVyIHByb3Blcmx5IGZvcm1hdHRlZC5cbiAgKi9cbmZ1bmN0aW9uIGZvcm1hdE51bWJlcihudW1iZXIsIG9wdHMgPSB7fSkge1xuICAvLyBSZXN1cnNpdmVseSBmb3JtYXQgYXJyYXlzOlxuICBpZiAoQXJyYXkuaXNBcnJheShudW1iZXIpKSB7XG4gICAgcmV0dXJuIG51bWJlci5tYXAoKHZhbCkgPT4gZm9ybWF0TnVtYmVyKHZhbCwgb3B0cykpO1xuICB9XG5cbiAgLy8gQnVpbGQgb3B0aW9ucyBvYmplY3QgZnJvbSBzZWNvbmQgcGFyYW0gKGlmIG9iamVjdCkgb3IgYWxsIHBhcmFtcywgZXh0ZW5kaW5nIGRlZmF1bHRzOlxuICBvcHRzID0gb2JqZWN0QXNzaWduKHt9LFxuICAgIHNldHRpbmdzLFxuICAgIG9wdHNcbiAgKTtcblxuICAvLyBEbyBzb21lIGNhbGM6XG4gIGNvbnN0IG5lZ2F0aXZlID0gbnVtYmVyIDwgMCA/ICctJyA6ICcnO1xuICBjb25zdCBiYXNlID0gcGFyc2VJbnQodG9GaXhlZChNYXRoLmFicyhudW1iZXIpLCBvcHRzLnByZWNpc2lvbiksIDEwKSArICcnO1xuICBjb25zdCBtb2QgPSBiYXNlLmxlbmd0aCA+IDMgPyBiYXNlLmxlbmd0aCAlIDMgOiAwO1xuXG4gIC8vIEZvcm1hdCB0aGUgbnVtYmVyOlxuICBjb25zdCBmb3JtYXR0ZWQgPSBuZWdhdGl2ZSArXG4gICAgKG1vZCA/IGJhc2Uuc3Vic3RyKDAsIG1vZCkgKyBvcHRzLnRob3VzYW5kIDogJycpICtcbiAgICAgIGJhc2Uuc3Vic3RyKG1vZCkucmVwbGFjZSgvKFxcZHszfSkoPz1cXGQpL2csICckMScgKyBvcHRzLnRob3VzYW5kKSArXG4gICAgICAgIChvcHRzLnByZWNpc2lvbiA+IDAgPyBvcHRzLmRlY2ltYWwgKyB0b0ZpeGVkKE1hdGguYWJzKG51bWJlciksIG9wdHMucHJlY2lzaW9uKS5zcGxpdCgnLicpWzFdIDogJycpO1xuXG4gIHJldHVybiBvcHRzLnN0cmlwWmVyb3MgPyBfc3RyaXBJbnNpZ25pZmljYW50WmVyb3MoZm9ybWF0dGVkLCBvcHRzLmRlY2ltYWwpIDogZm9ybWF0dGVkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JtYXROdW1iZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJWYWx1ZSA9IFN0cmluZy5wcm90b3R5cGUudmFsdWVPZjtcbnZhciB0cnlTdHJpbmdPYmplY3QgPSBmdW5jdGlvbiB0cnlTdHJpbmdPYmplY3QodmFsdWUpIHtcblx0dHJ5IHtcblx0XHRzdHJWYWx1ZS5jYWxsKHZhbHVlKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgc3RyQ2xhc3MgPSAnW29iamVjdCBTdHJpbmddJztcbnZhciBoYXNUb1N0cmluZ1RhZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHsgcmV0dXJuIHRydWU7IH1cblx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdHJldHVybiBoYXNUb1N0cmluZ1RhZyA/IHRyeVN0cmluZ09iamVjdCh2YWx1ZSkgOiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gc3RyQ2xhc3M7XG59O1xuIiwiaW1wb3J0IGlzU3RyaW5nIGZyb20gJ2lzLXN0cmluZyc7XG5cbi8qKlxuICogUGFyc2VzIGEgZm9ybWF0IHN0cmluZyBvciBvYmplY3QgYW5kIHJldHVybnMgZm9ybWF0IG9iaiBmb3IgdXNlIGluIHJlbmRlcmluZ1xuICpcbiAqIGBmb3JtYXRgIGlzIGVpdGhlciBhIHN0cmluZyB3aXRoIHRoZSBkZWZhdWx0IChwb3NpdGl2ZSkgZm9ybWF0LCBvciBvYmplY3RcbiAqIGNvbnRhaW5pbmcgYHBvc2AgKHJlcXVpcmVkKSwgYG5lZ2AgYW5kIGB6ZXJvYCB2YWx1ZXNcbiAqXG4gKiBFaXRoZXIgc3RyaW5nIG9yIGZvcm1hdC5wb3MgbXVzdCBjb250YWluIFwiJXZcIiAodmFsdWUpIHRvIGJlIHZhbGlkXG4gKlxuICogQG1ldGhvZCBfY2hlY2tDdXJyZW5jeUZvcm1hdFxuICogQGZvciBhY2NvdW50aW5nXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICAgIFtmb3JtYXQ9XCIlcyV2XCJdIFN0cmluZyB3aXRoIHRoZSBmb3JtYXQgdG8gYXBwbHksIHdoZXJlICVzIGlzIHRoZSBjdXJyZW5jeSBzeW1ib2wgYW5kICV2IGlzIHRoZSB2YWx1ZS5cbiAqIEByZXR1cm4ge09iamVjdH0gb2JqZWN0IHJlcHJlc250aW5nIGZvcm1hdCAod2l0aCBwb3MsIG5lZyBhbmQgemVybyBhdHRyaWJ1dGVzKVxuICovXG5mdW5jdGlvbiBfY2hlY2tDdXJyZW5jeUZvcm1hdChmb3JtYXQpIHtcbiAgLy8gRm9ybWF0IHNob3VsZCBiZSBhIHN0cmluZywgaW4gd2hpY2ggY2FzZSBgdmFsdWVgICgnJXYnKSBtdXN0IGJlIHByZXNlbnQ6XG4gIGlmIChpc1N0cmluZyhmb3JtYXQpICYmIGZvcm1hdC5tYXRjaCgnJXYnKSkge1xuICAgIC8vIENyZWF0ZSBhbmQgcmV0dXJuIHBvc2l0aXZlLCBuZWdhdGl2ZSBhbmQgemVybyBmb3JtYXRzOlxuICAgIHJldHVybiB7XG4gICAgICBwb3M6IGZvcm1hdCxcbiAgICAgIG5lZzogZm9ybWF0LnJlcGxhY2UoJy0nLCAnJykucmVwbGFjZSgnJXYnLCAnLSV2JyksXG4gICAgICB6ZXJvOiBmb3JtYXRcbiAgICB9O1xuICB9XG5cbiAgLy8gT3RoZXJ3aXNlLCBhc3N1bWUgZm9ybWF0IHdhcyBmaW5lOlxuICByZXR1cm4gZm9ybWF0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBfY2hlY2tDdXJyZW5jeUZvcm1hdDtcbiIsImltcG9ydCBvYmplY3RBc3NpZ24gZnJvbSAnb2JqZWN0LWFzc2lnbic7XG5cbmltcG9ydCBfY2hlY2tDdXJyZW5jeUZvcm1hdCBmcm9tICcuL2ludGVybmFsL2NoZWNrQ3VycmVuY3lGb3JtYXQnO1xuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4vc2V0dGluZ3MnO1xuaW1wb3J0IGZvcm1hdE51bWJlciBmcm9tICcuL2Zvcm1hdE51bWJlcic7XG5cbi8qKlxuICogRm9ybWF0IGEgbnVtYmVyIGludG8gY3VycmVuY3lcbiAqXG4gKiBVc2FnZTogYWNjb3VudGluZy5mb3JtYXRNb25leShudW1iZXIsIHN5bWJvbCwgcHJlY2lzaW9uLCB0aG91c2FuZHNTZXAsIGRlY2ltYWxTZXAsIGZvcm1hdClcbiAqIGRlZmF1bHRzOiAoMCwgJyQnLCAyLCAnLCcsICcuJywgJyVzJXYnKVxuICpcbiAqIExvY2FsaXNlIGJ5IG92ZXJyaWRpbmcgdGhlIHN5bWJvbCwgcHJlY2lzaW9uLCB0aG91c2FuZCAvIGRlY2ltYWwgc2VwYXJhdG9ycyBhbmQgZm9ybWF0XG4gKlxuICogYGBganNcbiAqIC8vIERlZmF1bHQgdXNhZ2U6XG4gKiBhY2NvdW50aW5nLmZvcm1hdE1vbmV5KDEyMzQ1Njc4KTsgLy8gJDEyLDM0NSw2NzguMDBcbiAqXG4gKiAvLyBFdXJvcGVhbiBmb3JtYXR0aW5nIChjdXN0b20gc3ltYm9sIGFuZCBzZXBhcmF0b3JzKSwgY2FuIGFsc28gdXNlIG9wdGlvbnMgb2JqZWN0IGFzIHNlY29uZCBwYXJhbWV0ZXI6XG4gKiBhY2NvdW50aW5nLmZvcm1hdE1vbmV5KDQ5OTkuOTksIHsgc3ltYm9sOiBcIuKCrFwiLCBwcmVjaXNpb246IDIsIHRob3VzYW5kOiBcIi5cIiwgZGVjaW1hbDogXCIsXCIgfSk7IC8vIOKCrDQuOTk5LDk5XG4gKlxuICogLy8gTmVnYXRpdmUgdmFsdWVzIGNhbiBiZSBmb3JtYXR0ZWQgbmljZWx5OlxuICogYWNjb3VudGluZy5mb3JtYXRNb25leSgtNTAwMDAwLCB7IHN5bWJvbDogXCLCoyBcIiwgcHJlY2lzaW9uOiAwIH0pOyAvLyDCoyAtNTAwLDAwMFxuICpcbiAqIC8vIFNpbXBsZSBgZm9ybWF0YCBzdHJpbmcgYWxsb3dzIGNvbnRyb2wgb2Ygc3ltYm9sIHBvc2l0aW9uICgldiA9IHZhbHVlLCAlcyA9IHN5bWJvbCk6XG4gKiBhY2NvdW50aW5nLmZvcm1hdE1vbmV5KDUzMTgwMDgsIHsgc3ltYm9sOiBcIkdCUFwiLCAgZm9ybWF0OiBcIiV2ICVzXCIgfSk7IC8vIDUsMzE4LDAwOC4wMCBHQlBcbiAqIGBgYFxuICpcbiAqIEBtZXRob2QgZm9ybWF0TW9uZXlcbiAqIEBmb3IgYWNjb3VudGluZ1xuICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICBudW1iZXIgTnVtYmVyIHRvIGJlIGZvcm1hdHRlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgW29wdHM9e31dIE9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgb3B0aW9ucyBvZiB0aGUgbWV0aG9kLlxuICogQHJldHVybiB7U3RyaW5nfSBUaGUgZ2l2ZW4gbnVtYmVyIHByb3Blcmx5IGZvcm1hdHRlZCBhcyBtb25leS5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0TW9uZXkobnVtYmVyLCBvcHRzID0ge30pIHtcbiAgLy8gUmVzdXJzaXZlbHkgZm9ybWF0IGFycmF5czpcbiAgaWYgKEFycmF5LmlzQXJyYXkobnVtYmVyKSkge1xuICAgIHJldHVybiBudW1iZXIubWFwKCh2YWwpID0+IGZvcm1hdE1vbmV5KHZhbCwgb3B0cykpO1xuICB9XG5cbiAgLy8gQnVpbGQgb3B0aW9ucyBvYmplY3QgZnJvbSBzZWNvbmQgcGFyYW0gKGlmIG9iamVjdCkgb3IgYWxsIHBhcmFtcywgZXh0ZW5kaW5nIGRlZmF1bHRzOlxuICBvcHRzID0gb2JqZWN0QXNzaWduKHt9LFxuICAgIHNldHRpbmdzLFxuICAgIG9wdHNcbiAgKTtcblxuICAvLyBDaGVjayBmb3JtYXQgKHJldHVybnMgb2JqZWN0IHdpdGggcG9zLCBuZWcgYW5kIHplcm8pOlxuICBjb25zdCBmb3JtYXRzID0gX2NoZWNrQ3VycmVuY3lGb3JtYXQob3B0cy5mb3JtYXQpO1xuXG4gIC8vIENob29zZSB3aGljaCBmb3JtYXQgdG8gdXNlIGZvciB0aGlzIHZhbHVlOlxuICBsZXQgdXNlRm9ybWF0O1xuXG4gIGlmIChudW1iZXIgPiAwKSB7XG4gICAgdXNlRm9ybWF0ID0gZm9ybWF0cy5wb3M7XG4gIH0gZWxzZSBpZiAobnVtYmVyIDwgMCkge1xuICAgIHVzZUZvcm1hdCA9IGZvcm1hdHMubmVnO1xuICB9IGVsc2Uge1xuICAgIHVzZUZvcm1hdCA9IGZvcm1hdHMuemVybztcbiAgfVxuXG4gIC8vIFJldHVybiB3aXRoIGN1cnJlbmN5IHN5bWJvbCBhZGRlZDpcbiAgcmV0dXJuIHVzZUZvcm1hdFxuICAgIC5yZXBsYWNlKCclcycsIG9wdHMuc3ltYm9sKVxuICAgIC5yZXBsYWNlKCcldicsIGZvcm1hdE51bWJlcihNYXRoLmFicyhudW1iZXIpLCBvcHRzKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1hdE1vbmV5O1xuIiwiaW1wb3J0IG9iamVjdEFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJztcbmltcG9ydCBpc1N0cmluZyBmcm9tICdpcy1zdHJpbmcnO1xuXG5pbXBvcnQgX2NoZWNrQ3VycmVuY3lGb3JtYXQgZnJvbSAnLi9pbnRlcm5hbC9jaGVja0N1cnJlbmN5Rm9ybWF0JztcbmltcG9ydCBzZXR0aW5ncyBmcm9tICcuL3NldHRpbmdzJztcbmltcG9ydCBmb3JtYXROdW1iZXIgZnJvbSAnLi9mb3JtYXROdW1iZXInO1xuaW1wb3J0IHVuZm9ybWF0IGZyb20gJy4vdW5mb3JtYXQnO1xuXG4vKipcbiAqIEZvcm1hdCBhIGxpc3Qgb2YgbnVtYmVycyBpbnRvIGFuIGFjY291bnRpbmcgY29sdW1uLCBwYWRkaW5nIHdpdGggd2hpdGVzcGFjZVxuICogdG8gbGluZSB1cCBjdXJyZW5jeSBzeW1ib2xzLCB0aG91c2FuZCBzZXBhcmF0b3JzIGFuZCBkZWNpbWFscyBwbGFjZXNcbiAqXG4gKiBMaXN0IHNob3VsZCBiZSBhbiBhcnJheSBvZiBudW1iZXJzXG4gKlxuICogUmV0dXJucyBhcnJheSBvZiBhY2NvdXRpbmctZm9ybWF0dGVkIG51bWJlciBzdHJpbmdzIG9mIHNhbWUgbGVuZ3RoXG4gKlxuICogTkI6IGB3aGl0ZS1zcGFjZTpwcmVgIENTUyBydWxlIGlzIHJlcXVpcmVkIG9uIHRoZSBsaXN0IGNvbnRhaW5lciB0byBwcmV2ZW50XG4gKiBicm93c2VycyBmcm9tIGNvbGxhcHNpbmcgdGhlIHdoaXRlc3BhY2UgaW4gdGhlIG91dHB1dCBzdHJpbmdzLlxuICpcbiAqIGBgYGpzXG4gKiBhY2NvdW50aW5nLmZvcm1hdENvbHVtbihbMTIzLjUsIDM0NTYuNDksIDc3Nzg4OC45OSwgMTIzNDU2NzgsIC01NDMyXSwgeyBzeW1ib2w6IFwiJCBcIiB9KTtcbiAqIGBgYFxuICpcbiAqIEBtZXRob2QgZm9ybWF0Q29sdW1uXG4gKiBAZm9yIGFjY291bnRpbmdcbiAqIEBwYXJhbSB7QXJyYXk8TnVtYmVyPn0gbGlzdCBBbiBhcnJheSBvZiBudW1iZXJzIHRvIGZvcm1hdFxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgICBbb3B0cz17fV0gT2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSBvcHRpb25zIG9mIHRoZSBtZXRob2QuXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IFtzeW1ib2w9XCIkXCJdIFN0cmluZyB3aXRoIHRoZSBjdXJyZW5jeSBzeW1ib2wuIEZvciBjb252ZW5pZW5jeSBpZiBjYW4gYmUgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSBvcHRpb25zIG9mIHRoZSBtZXRob2QuXG4gKiBAcGFyYW0ge0ludGVnZXJ9ICAgICAgIFtwcmVjaXNpb249Ml0gTnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICAgIFt0aG91c2FuZD0nLCddIFN0cmluZyB3aXRoIHRoZSB0aG91c2FuZHMgc2VwYXJhdG9yLlxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICBbZGVjaW1hbD1cIi5cIl0gU3RyaW5nIHdpdGggdGhlIGRlY2ltYWwgc2VwYXJhdG9yLlxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICBbZm9ybWF0PVwiJXMldlwiXSBTdHJpbmcgd2l0aCB0aGUgZm9ybWF0IHRvIGFwcGx5LCB3aGVyZSAlcyBpcyB0aGUgY3VycmVuY3kgc3ltYm9sIGFuZCAldiBpcyB0aGUgdmFsdWUuXG4gKiBAcmV0dXJuIHtBcnJheTxTdHJpbmc+fSBhcnJheSBvZiBhY2NvdXRpbmctZm9ybWF0dGVkIG51bWJlciBzdHJpbmdzIG9mIHNhbWUgbGVuZ3RoXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdENvbHVtbihsaXN0LCBvcHRzID0ge30pIHtcbiAgaWYgKCFsaXN0KSByZXR1cm4gW107XG5cbiAgLy8gQnVpbGQgb3B0aW9ucyBvYmplY3QgZnJvbSBzZWNvbmQgcGFyYW0gKGlmIG9iamVjdCkgb3IgYWxsIHBhcmFtcywgZXh0ZW5kaW5nIGRlZmF1bHRzOlxuICBvcHRzID0gb2JqZWN0QXNzaWduKHt9LFxuICAgIHNldHRpbmdzLFxuICAgIG9wdHNcbiAgKTtcblxuICAvLyBDaGVjayBmb3JtYXQgKHJldHVybnMgb2JqZWN0IHdpdGggcG9zLCBuZWcgYW5kIHplcm8pLCBvbmx5IG5lZWQgcG9zIGZvciBub3c6XG4gIGNvbnN0IGZvcm1hdHMgPSBfY2hlY2tDdXJyZW5jeUZvcm1hdChvcHRzLmZvcm1hdCk7XG5cbiAgLy8gV2hldGhlciB0byBwYWQgYXQgc3RhcnQgb2Ygc3RyaW5nIG9yIGFmdGVyIGN1cnJlbmN5IHN5bWJvbDpcbiAgY29uc3QgcGFkQWZ0ZXJTeW1ib2wgPSBmb3JtYXRzLnBvcy5pbmRleE9mKCclcycpIDwgZm9ybWF0cy5wb3MuaW5kZXhPZignJXYnKTtcblxuICAvLyBTdG9yZSB2YWx1ZSBmb3IgdGhlIGxlbmd0aCBvZiB0aGUgbG9uZ2VzdCBzdHJpbmcgaW4gdGhlIGNvbHVtbjpcbiAgbGV0IG1heExlbmd0aCA9IDA7XG5cbiAgLy8gRm9ybWF0IHRoZSBsaXN0IGFjY29yZGluZyB0byBvcHRpb25zLCBzdG9yZSB0aGUgbGVuZ3RoIG9mIHRoZSBsb25nZXN0IHN0cmluZzpcbiAgY29uc3QgZm9ybWF0dGVkID0gbGlzdC5tYXAoKHZhbCkgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIC8vIFJlY3Vyc2l2ZWx5IGZvcm1hdCBjb2x1bW5zIGlmIGxpc3QgaXMgYSBtdWx0aS1kaW1lbnNpb25hbCBhcnJheTpcbiAgICAgIHJldHVybiBmb3JtYXRDb2x1bW4odmFsLCBvcHRzKTtcbiAgICB9XG4gICAgLy8gQ2xlYW4gdXAgdGhlIHZhbHVlXG4gICAgdmFsID0gdW5mb3JtYXQodmFsLCBvcHRzLmRlY2ltYWwpO1xuXG4gICAgLy8gQ2hvb3NlIHdoaWNoIGZvcm1hdCB0byB1c2UgZm9yIHRoaXMgdmFsdWUgKHBvcywgbmVnIG9yIHplcm8pOlxuICAgIGxldCB1c2VGb3JtYXQ7XG5cbiAgICBpZiAodmFsID4gMCkge1xuICAgICAgdXNlRm9ybWF0ID0gZm9ybWF0cy5wb3M7XG4gICAgfSBlbHNlIGlmICh2YWwgPCAwKSB7XG4gICAgICB1c2VGb3JtYXQgPSBmb3JtYXRzLm5lZztcbiAgICB9IGVsc2Uge1xuICAgICAgdXNlRm9ybWF0ID0gZm9ybWF0cy56ZXJvO1xuICAgIH1cblxuICAgIC8vIEZvcm1hdCB0aGlzIHZhbHVlLCBwdXNoIGludG8gZm9ybWF0dGVkIGxpc3QgYW5kIHNhdmUgdGhlIGxlbmd0aDpcbiAgICBjb25zdCBmVmFsID0gdXNlRm9ybWF0XG4gICAgICAucmVwbGFjZSgnJXMnLCBvcHRzLnN5bWJvbClcbiAgICAgIC5yZXBsYWNlKCcldicsIGZvcm1hdE51bWJlcihNYXRoLmFicyh2YWwpLCBvcHRzKSk7XG5cbiAgICBpZiAoZlZhbC5sZW5ndGggPiBtYXhMZW5ndGgpIHtcbiAgICAgIG1heExlbmd0aCA9IGZWYWwubGVuZ3RoO1xuICAgIH1cblxuICAgIHJldHVybiBmVmFsO1xuICB9KTtcblxuICAvLyBQYWQgZWFjaCBudW1iZXIgaW4gdGhlIGxpc3QgYW5kIHNlbmQgYmFjayB0aGUgY29sdW1uIG9mIG51bWJlcnM6XG4gIHJldHVybiBmb3JtYXR0ZWQubWFwKCh2YWwpID0+IHtcbiAgICAvLyBPbmx5IGlmIHRoaXMgaXMgYSBzdHJpbmcgKG5vdCBhIG5lc3RlZCBhcnJheSwgd2hpY2ggd291bGQgaGF2ZSBhbHJlYWR5IGJlZW4gcGFkZGVkKTpcbiAgICBpZiAoaXNTdHJpbmcodmFsKSAmJiB2YWwubGVuZ3RoIDwgbWF4TGVuZ3RoKSB7XG4gICAgICAvLyBEZXBlbmRpbmcgb24gc3ltYm9sIHBvc2l0aW9uLCBwYWQgYWZ0ZXIgc3ltYm9sIG9yIGF0IGluZGV4IDA6XG4gICAgICByZXR1cm4gcGFkQWZ0ZXJTeW1ib2wgP1xuICAgICAgICB2YWwucmVwbGFjZShvcHRzLnN5bWJvbCwgb3B0cy5zeW1ib2wgKyAobmV3IEFycmF5KG1heExlbmd0aCAtIHZhbC5sZW5ndGggKyAxKS5qb2luKCcgJykpKSA6XG4gICAgICAgIChuZXcgQXJyYXkobWF4TGVuZ3RoIC0gdmFsLmxlbmd0aCArIDEpLmpvaW4oJyAnKSkgKyB2YWw7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JtYXRDb2x1bW47XG4iLCIvKiEgZGVjaW1hbC5qcy1saWdodCB2Mi41LjAgaHR0cHM6Ly9naXRodWIuY29tL01pa2VNY2wvZGVjaW1hbC5qcy1saWdodC9MSUNFTkNFICovXHJcbjsoZnVuY3Rpb24gKGdsb2JhbFNjb3BlKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbiAgLypcclxuICAgKiAgZGVjaW1hbC5qcy1saWdodCB2Mi41LjBcclxuICAgKiAgQW4gYXJiaXRyYXJ5LXByZWNpc2lvbiBEZWNpbWFsIHR5cGUgZm9yIEphdmFTY3JpcHQuXHJcbiAgICogIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWtlTWNsL2RlY2ltYWwuanMtbGlnaHRcclxuICAgKiAgQ29weXJpZ2h0IChjKSAyMDE4IE1pY2hhZWwgTWNsYXVnaGxpbiA8TThjaDg4bEBnbWFpbC5jb20+XHJcbiAgICogIE1JVCBFeHBhdCBMaWNlbmNlXHJcbiAgICovXHJcblxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgRURJVEFCTEUgREVGQVVMVFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHJcbiAgICAvLyBUaGUgbGltaXQgb24gdGhlIHZhbHVlIG9mIGBwcmVjaXNpb25gLCBhbmQgb24gdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBhcmd1bWVudCB0b1xyXG4gICAgLy8gYHRvRGVjaW1hbFBsYWNlc2AsIGB0b0V4cG9uZW50aWFsYCwgYHRvRml4ZWRgLCBgdG9QcmVjaXNpb25gIGFuZCBgdG9TaWduaWZpY2FudERpZ2l0c2AuXHJcbiAgdmFyIE1BWF9ESUdJVFMgPSAxZTksICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byAxZTlcclxuXHJcblxyXG4gICAgLy8gVGhlIGluaXRpYWwgY29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzIG9mIHRoZSBEZWNpbWFsIGNvbnN0cnVjdG9yLlxyXG4gICAgRGVjaW1hbCA9IHtcclxuXHJcbiAgICAgIC8vIFRoZXNlIHZhbHVlcyBtdXN0IGJlIGludGVnZXJzIHdpdGhpbiB0aGUgc3RhdGVkIHJhbmdlcyAoaW5jbHVzaXZlKS5cclxuICAgICAgLy8gTW9zdCBvZiB0aGVzZSB2YWx1ZXMgY2FuIGJlIGNoYW5nZWQgZHVyaW5nIHJ1bi10aW1lIHVzaW5nIGBEZWNpbWFsLmNvbmZpZ2AuXHJcblxyXG4gICAgICAvLyBUaGUgbWF4aW11bSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzIG9mIHRoZSByZXN1bHQgb2YgYSBjYWxjdWxhdGlvbiBvciBiYXNlIGNvbnZlcnNpb24uXHJcbiAgICAgIC8vIEUuZy4gYERlY2ltYWwuY29uZmlnKHsgcHJlY2lzaW9uOiAyMCB9KTtgXHJcbiAgICAgIHByZWNpc2lvbjogMjAsICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDEgdG8gTUFYX0RJR0lUU1xyXG5cclxuICAgICAgLy8gVGhlIHJvdW5kaW5nIG1vZGUgdXNlZCBieSBkZWZhdWx0IGJ5IGB0b0ludGVnZXJgLCBgdG9EZWNpbWFsUGxhY2VzYCwgYHRvRXhwb25lbnRpYWxgLFxyXG4gICAgICAvLyBgdG9GaXhlZGAsIGB0b1ByZWNpc2lvbmAgYW5kIGB0b1NpZ25pZmljYW50RGlnaXRzYC5cclxuICAgICAgLy9cclxuICAgICAgLy8gUk9VTkRfVVAgICAgICAgICAwIEF3YXkgZnJvbSB6ZXJvLlxyXG4gICAgICAvLyBST1VORF9ET1dOICAgICAgIDEgVG93YXJkcyB6ZXJvLlxyXG4gICAgICAvLyBST1VORF9DRUlMICAgICAgIDIgVG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAgIC8vIFJPVU5EX0ZMT09SICAgICAgMyBUb3dhcmRzIC1JbmZpbml0eS5cclxuICAgICAgLy8gUk9VTkRfSEFMRl9VUCAgICA0IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB1cC5cclxuICAgICAgLy8gUk9VTkRfSEFMRl9ET1dOICA1IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCBkb3duLlxyXG4gICAgICAvLyBST1VORF9IQUxGX0VWRU4gIDYgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHRvd2FyZHMgZXZlbiBuZWlnaGJvdXIuXHJcbiAgICAgIC8vIFJPVU5EX0hBTEZfQ0VJTCAgNyBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAgIC8vIFJPVU5EX0hBTEZfRkxPT1IgOCBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyAtSW5maW5pdHkuXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIEUuZy5cclxuICAgICAgLy8gYERlY2ltYWwucm91bmRpbmcgPSA0O2BcclxuICAgICAgLy8gYERlY2ltYWwucm91bmRpbmcgPSBEZWNpbWFsLlJPVU5EX0hBTEZfVVA7YFxyXG4gICAgICByb3VuZGluZzogNCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIDhcclxuXHJcbiAgICAgIC8vIFRoZSBleHBvbmVudCB2YWx1ZSBhdCBhbmQgYmVuZWF0aCB3aGljaCBgdG9TdHJpbmdgIHJldHVybnMgZXhwb25lbnRpYWwgbm90YXRpb24uXHJcbiAgICAgIC8vIEphdmFTY3JpcHQgbnVtYmVyczogLTdcclxuICAgICAgdG9FeHBOZWc6IC03LCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byAtTUFYX0VcclxuXHJcbiAgICAgIC8vIFRoZSBleHBvbmVudCB2YWx1ZSBhdCBhbmQgYWJvdmUgd2hpY2ggYHRvU3RyaW5nYCByZXR1cm5zIGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICAvLyBKYXZhU2NyaXB0IG51bWJlcnM6IDIxXHJcbiAgICAgIHRvRXhwUG9zOiAgMjEsICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gTUFYX0VcclxuXHJcbiAgICAgIC8vIFRoZSBuYXR1cmFsIGxvZ2FyaXRobSBvZiAxMC5cclxuICAgICAgLy8gMTE1IGRpZ2l0c1xyXG4gICAgICBMTjEwOiAnMi4zMDI1ODUwOTI5OTQwNDU2ODQwMTc5OTE0NTQ2ODQzNjQyMDc2MDExMDE0ODg2Mjg3NzI5NzYwMzMzMjc5MDA5Njc1NzI2MDk2NzczNTI0ODAyMzU5OTcyMDUwODk1OTgyOTgzNDE5Njc3ODQwNDIyODYnXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRU5EIE9GIEVESVRBQkxFIERFRkFVTFRTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcblxyXG4gICAgZXh0ZXJuYWwgPSB0cnVlLFxyXG5cclxuICAgIGRlY2ltYWxFcnJvciA9ICdbRGVjaW1hbEVycm9yXSAnLFxyXG4gICAgaW52YWxpZEFyZ3VtZW50ID0gZGVjaW1hbEVycm9yICsgJ0ludmFsaWQgYXJndW1lbnQ6ICcsXHJcbiAgICBleHBvbmVudE91dE9mUmFuZ2UgPSBkZWNpbWFsRXJyb3IgKyAnRXhwb25lbnQgb3V0IG9mIHJhbmdlOiAnLFxyXG5cclxuICAgIG1hdGhmbG9vciA9IE1hdGguZmxvb3IsXHJcbiAgICBtYXRocG93ID0gTWF0aC5wb3csXHJcblxyXG4gICAgaXNEZWNpbWFsID0gL14oXFxkKyhcXC5cXGQqKT98XFwuXFxkKykoZVsrLV0/XFxkKyk/JC9pLFxyXG5cclxuICAgIE9ORSxcclxuICAgIEJBU0UgPSAxZTcsXHJcbiAgICBMT0dfQkFTRSA9IDcsXHJcbiAgICBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MSxcclxuICAgIE1BWF9FID0gbWF0aGZsb29yKE1BWF9TQUZFX0lOVEVHRVIgLyBMT0dfQkFTRSksICAgIC8vIDEyODY3NDI3NTA2NzcyODRcclxuXHJcbiAgICAvLyBEZWNpbWFsLnByb3RvdHlwZSBvYmplY3RcclxuICAgIFAgPSB7fTtcclxuXHJcblxyXG4gIC8vIERlY2ltYWwgcHJvdG90eXBlIG1ldGhvZHNcclxuXHJcblxyXG4gIC8qXHJcbiAgICogIGFic29sdXRlVmFsdWUgICAgICAgICAgICAgICAgICAgICAgIGFic1xyXG4gICAqICBjb21wYXJlZFRvICAgICAgICAgICAgICAgICAgICAgICAgICBjbXBcclxuICAgKiAgZGVjaW1hbFBsYWNlcyAgICAgICAgICAgICAgICAgICAgICAgZHBcclxuICAgKiAgZGl2aWRlZEJ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2XHJcbiAgICogIGRpdmlkZWRUb0ludGVnZXJCeSAgICAgICAgICAgICAgICAgIGlkaXZcclxuICAgKiAgZXF1YWxzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXFcclxuICAgKiAgZXhwb25lbnRcclxuICAgKiAgZ3JlYXRlclRoYW4gICAgICAgICAgICAgICAgICAgICAgICAgZ3RcclxuICAgKiAgZ3JlYXRlclRoYW5PckVxdWFsVG8gICAgICAgICAgICAgICAgZ3RlXHJcbiAgICogIGlzSW50ZWdlciAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzaW50XHJcbiAgICogIGlzTmVnYXRpdmUgICAgICAgICAgICAgICAgICAgICAgICAgIGlzbmVnXHJcbiAgICogIGlzUG9zaXRpdmUgICAgICAgICAgICAgICAgICAgICAgICAgIGlzcG9zXHJcbiAgICogIGlzWmVyb1xyXG4gICAqICBsZXNzVGhhbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsdFxyXG4gICAqICBsZXNzVGhhbk9yRXF1YWxUbyAgICAgICAgICAgICAgICAgICBsdGVcclxuICAgKiAgbG9nYXJpdGhtICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nXHJcbiAgICogIG1pbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlxyXG4gICAqICBtb2R1bG8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RcclxuICAgKiAgbmF0dXJhbEV4cG9uZW50aWFsICAgICAgICAgICAgICAgICAgZXhwXHJcbiAgICogIG5hdHVyYWxMb2dhcml0aG0gICAgICAgICAgICAgICAgICAgIGxuXHJcbiAgICogIG5lZ2F0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZ1xyXG4gICAqICBwbHVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRcclxuICAgKiAgcHJlY2lzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RcclxuICAgKiAgc3F1YXJlUm9vdCAgICAgICAgICAgICAgICAgICAgICAgICAgc3FydFxyXG4gICAqICB0aW1lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWxcclxuICAgKiAgdG9EZWNpbWFsUGxhY2VzICAgICAgICAgICAgICAgICAgICAgdG9kcFxyXG4gICAqICB0b0V4cG9uZW50aWFsXHJcbiAgICogIHRvRml4ZWRcclxuICAgKiAgdG9JbnRlZ2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9pbnRcclxuICAgKiAgdG9OdW1iZXJcclxuICAgKiAgdG9Qb3dlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG93XHJcbiAgICogIHRvUHJlY2lzaW9uXHJcbiAgICogIHRvU2lnbmlmaWNhbnREaWdpdHMgICAgICAgICAgICAgICAgIHRvc2RcclxuICAgKiAgdG9TdHJpbmdcclxuICAgKiAgdmFsdWVPZiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsXHJcbiAgICovXHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBhYnNvbHV0ZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmFic29sdXRlVmFsdWUgPSBQLmFicyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB4ID0gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcyk7XHJcbiAgICBpZiAoeC5zKSB4LnMgPSAxO1xyXG4gICAgcmV0dXJuIHg7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuXHJcbiAgICogICAxICAgIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZSBvZiBgeWAsXHJcbiAgICogIC0xICAgIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgbGVzcyB0aGFuIHRoZSB2YWx1ZSBvZiBgeWAsXHJcbiAgICogICAwICAgIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSB2YWx1ZVxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5jb21wYXJlZFRvID0gUC5jbXAgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIGksIGosIHhkTCwgeWRMLFxyXG4gICAgICB4ID0gdGhpcztcclxuXHJcbiAgICB5ID0gbmV3IHguY29uc3RydWN0b3IoeSk7XHJcblxyXG4gICAgLy8gU2lnbnMgZGlmZmVyP1xyXG4gICAgaWYgKHgucyAhPT0geS5zKSByZXR1cm4geC5zIHx8IC15LnM7XHJcblxyXG4gICAgLy8gQ29tcGFyZSBleHBvbmVudHMuXHJcbiAgICBpZiAoeC5lICE9PSB5LmUpIHJldHVybiB4LmUgPiB5LmUgXiB4LnMgPCAwID8gMSA6IC0xO1xyXG5cclxuICAgIHhkTCA9IHguZC5sZW5ndGg7XHJcbiAgICB5ZEwgPSB5LmQubGVuZ3RoO1xyXG5cclxuICAgIC8vIENvbXBhcmUgZGlnaXQgYnkgZGlnaXQuXHJcbiAgICBmb3IgKGkgPSAwLCBqID0geGRMIDwgeWRMID8geGRMIDogeWRMOyBpIDwgajsgKytpKSB7XHJcbiAgICAgIGlmICh4LmRbaV0gIT09IHkuZFtpXSkgcmV0dXJuIHguZFtpXSA+IHkuZFtpXSBeIHgucyA8IDAgPyAxIDogLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29tcGFyZSBsZW5ndGhzLlxyXG4gICAgcmV0dXJuIHhkTCA9PT0geWRMID8gMCA6IHhkTCA+IHlkTCBeIHgucyA8IDAgPyAxIDogLTE7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgb2YgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZGVjaW1hbFBsYWNlcyA9IFAuZHAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIHcgPSB4LmQubGVuZ3RoIC0gMSxcclxuICAgICAgZHAgPSAodyAtIHguZSkgKiBMT0dfQkFTRTtcclxuXHJcbiAgICAvLyBTdWJ0cmFjdCB0aGUgbnVtYmVyIG9mIHRyYWlsaW5nIHplcm9zIG9mIHRoZSBsYXN0IHdvcmQuXHJcbiAgICB3ID0geC5kW3ddO1xyXG4gICAgaWYgKHcpIGZvciAoOyB3ICUgMTAgPT0gMDsgdyAvPSAxMCkgZHAtLTtcclxuXHJcbiAgICByZXR1cm4gZHAgPCAwID8gMCA6IGRwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgZGl2aWRlZCBieSBgeWAsIHRydW5jYXRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZGl2aWRlZEJ5ID0gUC5kaXYgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIGRpdmlkZSh0aGlzLCBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih5KSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGludGVnZXIgcGFydCBvZiBkaXZpZGluZyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsXHJcbiAgICogYnkgdGhlIHZhbHVlIG9mIGB5YCwgdHJ1bmNhdGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZGl2aWRlZFRvSW50ZWdlckJ5ID0gUC5pZGl2ID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcbiAgICByZXR1cm4gcm91bmQoZGl2aWRlKHgsIG5ldyBDdG9yKHkpLCAwLCAxKSwgQ3Rvci5wcmVjaXNpb24pO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIGB5YCwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZXF1YWxzID0gUC5lcSA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gIXRoaXMuY21wKHkpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0aGUgKGJhc2UgMTApIGV4cG9uZW50IHZhbHVlIG9mIHRoaXMgRGVjaW1hbCAodGhpcy5lIGlzIHRoZSBiYXNlIDEwMDAwMDAwIGV4cG9uZW50KS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZXhwb25lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gZ2V0QmFzZTEwRXhwb25lbnQodGhpcyk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBncmVhdGVyIHRoYW4gdGhlIHZhbHVlIG9mIGB5YCwgb3RoZXJ3aXNlIHJldHVyblxyXG4gICAqIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5ncmVhdGVyVGhhbiA9IFAuZ3QgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY21wKHkpID4gMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgdmFsdWUgb2YgYHlgLFxyXG4gICAqIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmdyZWF0ZXJUaGFuT3JFcXVhbFRvID0gUC5ndGUgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY21wKHkpID49IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBhbiBpbnRlZ2VyLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5pc0ludGVnZXIgPSBQLmlzaW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZSA+IHRoaXMuZC5sZW5ndGggLSAyO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgbmVnYXRpdmUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmlzTmVnYXRpdmUgPSBQLmlzbmVnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucyA8IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBwb3NpdGl2ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuaXNQb3NpdGl2ZSA9IFAuaXNwb3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zID4gMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIDAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmlzWmVybyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnMgPT09IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBsZXNzIHRoYW4gYHlgLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5sZXNzVGhhbiA9IFAubHQgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY21wKHkpIDwgMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgeWAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmxlc3NUaGFuT3JFcXVhbFRvID0gUC5sdGUgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY21wKHkpIDwgMTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdGhlIGxvZ2FyaXRobSBvZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHRvIHRoZSBzcGVjaWZpZWQgYmFzZSwgdHJ1bmNhdGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICogSWYgbm8gYmFzZSBpcyBzcGVjaWZpZWQsIHJldHVybiBsb2dbMTBdKHgpLlxyXG4gICAqXHJcbiAgICogbG9nW2Jhc2VdKHgpID0gbG4oeCkgLyBsbihiYXNlKVxyXG4gICAqXHJcbiAgICogVGhlIG1heGltdW0gZXJyb3Igb2YgdGhlIHJlc3VsdCBpcyAxIHVscCAodW5pdCBpbiB0aGUgbGFzdCBwbGFjZSkuXHJcbiAgICpcclxuICAgKiBbYmFzZV0ge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gVGhlIGJhc2Ugb2YgdGhlIGxvZ2FyaXRobS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubG9nYXJpdGhtID0gUC5sb2cgPSBmdW5jdGlvbiAoYmFzZSkge1xyXG4gICAgdmFyIHIsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbixcclxuICAgICAgd3ByID0gcHIgKyA1O1xyXG5cclxuICAgIC8vIERlZmF1bHQgYmFzZSBpcyAxMC5cclxuICAgIGlmIChiYXNlID09PSB2b2lkIDApIHtcclxuICAgICAgYmFzZSA9IG5ldyBDdG9yKDEwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGJhc2UgPSBuZXcgQ3RvcihiYXNlKTtcclxuXHJcbiAgICAgIC8vIGxvZ1stYl0oeCkgPSBOYU5cclxuICAgICAgLy8gbG9nWzBdKHgpICA9IE5hTlxyXG4gICAgICAvLyBsb2dbMV0oeCkgID0gTmFOXHJcbiAgICAgIGlmIChiYXNlLnMgPCAxIHx8IGJhc2UuZXEoT05FKSkgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgJ05hTicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGxvZ1tiXSgteCkgPSBOYU5cclxuICAgIC8vIGxvZ1tiXSgwKSA9IC1JbmZpbml0eVxyXG4gICAgaWYgKHgucyA8IDEpIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICh4LnMgPyAnTmFOJyA6ICctSW5maW5pdHknKSk7XHJcblxyXG4gICAgLy8gbG9nW2JdKDEpID0gMFxyXG4gICAgaWYgKHguZXEoT05FKSkgcmV0dXJuIG5ldyBDdG9yKDApO1xyXG5cclxuICAgIGV4dGVybmFsID0gZmFsc2U7XHJcbiAgICByID0gZGl2aWRlKGxuKHgsIHdwciksIGxuKGJhc2UsIHdwciksIHdwcik7XHJcbiAgICBleHRlcm5hbCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHJvdW5kKHIsIHByKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIG1pbnVzIGB5YCwgdHJ1bmNhdGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5taW51cyA9IFAuc3ViID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciB4ID0gdGhpcztcclxuICAgIHkgPSBuZXcgeC5jb25zdHJ1Y3Rvcih5KTtcclxuICAgIHJldHVybiB4LnMgPT0geS5zID8gc3VidHJhY3QoeCwgeSkgOiBhZGQoeCwgKHkucyA9IC15LnMsIHkpKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIG1vZHVsbyBgeWAsIHRydW5jYXRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubW9kdWxvID0gUC5tb2QgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIHEsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuXHJcbiAgICB5ID0gbmV3IEN0b3IoeSk7XHJcblxyXG4gICAgLy8geCAlIDAgPSBOYU5cclxuICAgIGlmICgheS5zKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnTmFOJyk7XHJcblxyXG4gICAgLy8gUmV0dXJuIHggaWYgeCBpcyAwLlxyXG4gICAgaWYgKCF4LnMpIHJldHVybiByb3VuZChuZXcgQ3Rvcih4KSwgcHIpO1xyXG5cclxuICAgIC8vIFByZXZlbnQgcm91bmRpbmcgb2YgaW50ZXJtZWRpYXRlIGNhbGN1bGF0aW9ucy5cclxuICAgIGV4dGVybmFsID0gZmFsc2U7XHJcbiAgICBxID0gZGl2aWRlKHgsIHksIDAsIDEpLnRpbWVzKHkpO1xyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB4Lm1pbnVzKHEpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBuYXR1cmFsIGV4cG9uZW50aWFsIG9mIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwsXHJcbiAgICogaS5lLiB0aGUgYmFzZSBlIHJhaXNlZCB0byB0aGUgcG93ZXIgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCwgdHJ1bmNhdGVkIHRvIGBwcmVjaXNpb25gXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5uYXR1cmFsRXhwb25lbnRpYWwgPSBQLmV4cCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBleHAodGhpcyk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG5hdHVyYWwgbG9nYXJpdGhtIG9mIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwsXHJcbiAgICogdHJ1bmNhdGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubmF0dXJhbExvZ2FyaXRobSA9IFAubG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbG4odGhpcyk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBuZWdhdGVkLCBpLmUuIGFzIGlmIG11bHRpcGxpZWQgYnlcclxuICAgKiAtMS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubmVnYXRlZCA9IFAubmVnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHggPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzKTtcclxuICAgIHgucyA9IC14LnMgfHwgMDtcclxuICAgIHJldHVybiB4O1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgcGx1cyBgeWAsIHRydW5jYXRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAucGx1cyA9IFAuYWRkID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciB4ID0gdGhpcztcclxuICAgIHkgPSBuZXcgeC5jb25zdHJ1Y3Rvcih5KTtcclxuICAgIHJldHVybiB4LnMgPT0geS5zID8gYWRkKHgsIHkpIDogc3VidHJhY3QoeCwgKHkucyA9IC15LnMsIHkpKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHMgb2YgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqIFt6XSB7Ym9vbGVhbnxudW1iZXJ9IFdoZXRoZXIgdG8gY291bnQgaW50ZWdlci1wYXJ0IHRyYWlsaW5nIHplcm9zOiB0cnVlLCBmYWxzZSwgMSBvciAwLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5wcmVjaXNpb24gPSBQLnNkID0gZnVuY3Rpb24gKHopIHtcclxuICAgIHZhciBlLCBzZCwgdyxcclxuICAgICAgeCA9IHRoaXM7XHJcblxyXG4gICAgaWYgKHogIT09IHZvaWQgMCAmJiB6ICE9PSAhIXogJiYgeiAhPT0gMSAmJiB6ICE9PSAwKSB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyB6KTtcclxuXHJcbiAgICBlID0gZ2V0QmFzZTEwRXhwb25lbnQoeCkgKyAxO1xyXG4gICAgdyA9IHguZC5sZW5ndGggLSAxO1xyXG4gICAgc2QgPSB3ICogTE9HX0JBU0UgKyAxO1xyXG4gICAgdyA9IHguZFt3XTtcclxuXHJcbiAgICAvLyBJZiBub24temVyby4uLlxyXG4gICAgaWYgKHcpIHtcclxuXHJcbiAgICAgIC8vIFN1YnRyYWN0IHRoZSBudW1iZXIgb2YgdHJhaWxpbmcgemVyb3Mgb2YgdGhlIGxhc3Qgd29yZC5cclxuICAgICAgZm9yICg7IHcgJSAxMCA9PSAwOyB3IC89IDEwKSBzZC0tO1xyXG5cclxuICAgICAgLy8gQWRkIHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIHRoZSBmaXJzdCB3b3JkLlxyXG4gICAgICBmb3IgKHcgPSB4LmRbMF07IHcgPj0gMTA7IHcgLz0gMTApIHNkKys7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHogJiYgZSA+IHNkID8gZSA6IHNkO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSBzcXVhcmUgcm9vdCBvZiB0aGlzIERlY2ltYWwsIHRydW5jYXRlZCB0byBgcHJlY2lzaW9uYFxyXG4gICAqIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuc3F1YXJlUm9vdCA9IFAuc3FydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBlLCBuLCBwciwgciwgcywgdCwgd3ByLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgLy8gTmVnYXRpdmUgb3IgemVybz9cclxuICAgIGlmICh4LnMgPCAxKSB7XHJcbiAgICAgIGlmICgheC5zKSByZXR1cm4gbmV3IEN0b3IoMCk7XHJcblxyXG4gICAgICAvLyBzcXJ0KC14KSA9IE5hTlxyXG4gICAgICB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnTmFOJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpO1xyXG4gICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBJbml0aWFsIGVzdGltYXRlLlxyXG4gICAgcyA9IE1hdGguc3FydCgreCk7XHJcblxyXG4gICAgLy8gTWF0aC5zcXJ0IHVuZGVyZmxvdy9vdmVyZmxvdz9cclxuICAgIC8vIFBhc3MgeCB0byBNYXRoLnNxcnQgYXMgaW50ZWdlciwgdGhlbiBhZGp1c3QgdGhlIGV4cG9uZW50IG9mIHRoZSByZXN1bHQuXHJcbiAgICBpZiAocyA9PSAwIHx8IHMgPT0gMSAvIDApIHtcclxuICAgICAgbiA9IGRpZ2l0c1RvU3RyaW5nKHguZCk7XHJcbiAgICAgIGlmICgobi5sZW5ndGggKyBlKSAlIDIgPT0gMCkgbiArPSAnMCc7XHJcbiAgICAgIHMgPSBNYXRoLnNxcnQobik7XHJcbiAgICAgIGUgPSBtYXRoZmxvb3IoKGUgKyAxKSAvIDIpIC0gKGUgPCAwIHx8IGUgJSAyKTtcclxuXHJcbiAgICAgIGlmIChzID09IDEgLyAwKSB7XHJcbiAgICAgICAgbiA9ICcxZScgKyBlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG4gPSBzLnRvRXhwb25lbnRpYWwoKTtcclxuICAgICAgICBuID0gbi5zbGljZSgwLCBuLmluZGV4T2YoJ2UnKSArIDEpICsgZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgciA9IG5ldyBDdG9yKG4pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgciA9IG5ldyBDdG9yKHMudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuICAgIHMgPSB3cHIgPSBwciArIDM7XHJcblxyXG4gICAgLy8gTmV3dG9uLVJhcGhzb24gaXRlcmF0aW9uLlxyXG4gICAgZm9yICg7Oykge1xyXG4gICAgICB0ID0gcjtcclxuICAgICAgciA9IHQucGx1cyhkaXZpZGUoeCwgdCwgd3ByICsgMikpLnRpbWVzKDAuNSk7XHJcblxyXG4gICAgICBpZiAoZGlnaXRzVG9TdHJpbmcodC5kKS5zbGljZSgwLCB3cHIpID09PSAobiA9IGRpZ2l0c1RvU3RyaW5nKHIuZCkpLnNsaWNlKDAsIHdwcikpIHtcclxuICAgICAgICBuID0gbi5zbGljZSh3cHIgLSAzLCB3cHIgKyAxKTtcclxuXHJcbiAgICAgICAgLy8gVGhlIDR0aCByb3VuZGluZyBkaWdpdCBtYXkgYmUgaW4gZXJyb3IgYnkgLTEgc28gaWYgdGhlIDQgcm91bmRpbmcgZGlnaXRzIGFyZSA5OTk5IG9yXHJcbiAgICAgICAgLy8gNDk5OSwgaS5lLiBhcHByb2FjaGluZyBhIHJvdW5kaW5nIGJvdW5kYXJ5LCBjb250aW51ZSB0aGUgaXRlcmF0aW9uLlxyXG4gICAgICAgIGlmIChzID09IHdwciAmJiBuID09ICc0OTk5Jykge1xyXG5cclxuICAgICAgICAgIC8vIE9uIHRoZSBmaXJzdCBpdGVyYXRpb24gb25seSwgY2hlY2sgdG8gc2VlIGlmIHJvdW5kaW5nIHVwIGdpdmVzIHRoZSBleGFjdCByZXN1bHQgYXMgdGhlXHJcbiAgICAgICAgICAvLyBuaW5lcyBtYXkgaW5maW5pdGVseSByZXBlYXQuXHJcbiAgICAgICAgICByb3VuZCh0LCBwciArIDEsIDApO1xyXG5cclxuICAgICAgICAgIGlmICh0LnRpbWVzKHQpLmVxKHgpKSB7XHJcbiAgICAgICAgICAgIHIgPSB0O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG4gIT0gJzk5OTknKSB7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdwciArPSA0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiByb3VuZChyLCBwcik7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCB0aW1lcyBgeWAsIHRydW5jYXRlZCB0b1xyXG4gICAqIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudGltZXMgPSBQLm11bCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICB2YXIgY2FycnksIGUsIGksIGssIHIsIHJMLCB0LCB4ZEwsIHlkTCxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICB4ZCA9IHguZCxcclxuICAgICAgeWQgPSAoeSA9IG5ldyBDdG9yKHkpKS5kO1xyXG5cclxuICAgIC8vIFJldHVybiAwIGlmIGVpdGhlciBpcyAwLlxyXG4gICAgaWYgKCF4LnMgfHwgIXkucykgcmV0dXJuIG5ldyBDdG9yKDApO1xyXG5cclxuICAgIHkucyAqPSB4LnM7XHJcbiAgICBlID0geC5lICsgeS5lO1xyXG4gICAgeGRMID0geGQubGVuZ3RoO1xyXG4gICAgeWRMID0geWQubGVuZ3RoO1xyXG5cclxuICAgIC8vIEVuc3VyZSB4ZCBwb2ludHMgdG8gdGhlIGxvbmdlciBhcnJheS5cclxuICAgIGlmICh4ZEwgPCB5ZEwpIHtcclxuICAgICAgciA9IHhkO1xyXG4gICAgICB4ZCA9IHlkO1xyXG4gICAgICB5ZCA9IHI7XHJcbiAgICAgIHJMID0geGRMO1xyXG4gICAgICB4ZEwgPSB5ZEw7XHJcbiAgICAgIHlkTCA9IHJMO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluaXRpYWxpc2UgdGhlIHJlc3VsdCBhcnJheSB3aXRoIHplcm9zLlxyXG4gICAgciA9IFtdO1xyXG4gICAgckwgPSB4ZEwgKyB5ZEw7XHJcbiAgICBmb3IgKGkgPSByTDsgaS0tOykgci5wdXNoKDApO1xyXG5cclxuICAgIC8vIE11bHRpcGx5IVxyXG4gICAgZm9yIChpID0geWRMOyAtLWkgPj0gMDspIHtcclxuICAgICAgY2FycnkgPSAwO1xyXG4gICAgICBmb3IgKGsgPSB4ZEwgKyBpOyBrID4gaTspIHtcclxuICAgICAgICB0ID0gcltrXSArIHlkW2ldICogeGRbayAtIGkgLSAxXSArIGNhcnJ5O1xyXG4gICAgICAgIHJbay0tXSA9IHQgJSBCQVNFIHwgMDtcclxuICAgICAgICBjYXJyeSA9IHQgLyBCQVNFIHwgMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcltrXSA9IChyW2tdICsgY2FycnkpICUgQkFTRSB8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgZm9yICg7ICFyWy0tckxdOykgci5wb3AoKTtcclxuXHJcbiAgICBpZiAoY2FycnkpICsrZTtcclxuICAgIGVsc2Ugci5zaGlmdCgpO1xyXG5cclxuICAgIHkuZCA9IHI7XHJcbiAgICB5LmUgPSBlO1xyXG5cclxuICAgIHJldHVybiBleHRlcm5hbCA/IHJvdW5kKHksIEN0b3IucHJlY2lzaW9uKSA6IHk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByb3VuZGVkIHRvIGEgbWF4aW11bSBvZiBgZHBgXHJcbiAgICogZGVjaW1hbCBwbGFjZXMgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm1gIG9yIGByb3VuZGluZ2AgaWYgYHJtYCBpcyBvbWl0dGVkLlxyXG4gICAqXHJcbiAgICogSWYgYGRwYCBpcyBvbWl0dGVkLCByZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvRGVjaW1hbFBsYWNlcyA9IFAudG9kcCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgeCA9IG5ldyBDdG9yKHgpO1xyXG4gICAgaWYgKGRwID09PSB2b2lkIDApIHJldHVybiB4O1xyXG5cclxuICAgIGNoZWNrSW50MzIoZHAsIDAsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgIGlmIChybSA9PT0gdm9pZCAwKSBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICBlbHNlIGNoZWNrSW50MzIocm0sIDAsIDgpO1xyXG5cclxuICAgIHJldHVybiByb3VuZCh4LCBkcCArIGdldEJhc2UxMEV4cG9uZW50KHgpICsgMSwgcm0pO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpbiBleHBvbmVudGlhbCBub3RhdGlvbiByb3VuZGVkIHRvXHJcbiAgICogYGRwYCBmaXhlZCBkZWNpbWFsIHBsYWNlcyB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzLiBJbnRlZ2VyLCAwIHRvIE1BWF9ESUdJVFMgaW5jbHVzaXZlLlxyXG4gICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9FeHBvbmVudGlhbCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgIHZhciBzdHIsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICBpZiAoZHAgPT09IHZvaWQgMCkge1xyXG4gICAgICBzdHIgPSB0b1N0cmluZyh4LCB0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoZWNrSW50MzIoZHAsIDAsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgICAgaWYgKHJtID09PSB2b2lkIDApIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgICAgZWxzZSBjaGVja0ludDMyKHJtLCAwLCA4KTtcclxuXHJcbiAgICAgIHggPSByb3VuZChuZXcgQ3Rvcih4KSwgZHAgKyAxLCBybSk7XHJcbiAgICAgIHN0ciA9IHRvU3RyaW5nKHgsIHRydWUsIGRwICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0cjtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaW4gbm9ybWFsIChmaXhlZC1wb2ludCkgbm90YXRpb24gdG9cclxuICAgKiBgZHBgIGZpeGVkIGRlY2ltYWwgcGxhY2VzIGFuZCByb3VuZGVkIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJtYCBvciBgcm91bmRpbmdgIGlmIGBybWAgaXNcclxuICAgKiBvbWl0dGVkLlxyXG4gICAqXHJcbiAgICogQXMgd2l0aCBKYXZhU2NyaXB0IG51bWJlcnMsICgtMCkudG9GaXhlZCgwKSBpcyAnMCcsIGJ1dCBlLmcuICgtMC4wMDAwMSkudG9GaXhlZCgwKSBpcyAnLTAnLlxyXG4gICAqXHJcbiAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKiAoLTApLnRvRml4ZWQoMCkgaXMgJzAnLCBidXQgKC0wLjEpLnRvRml4ZWQoMCkgaXMgJy0wJy5cclxuICAgKiAoLTApLnRvRml4ZWQoMSkgaXMgJzAuMCcsIGJ1dCAoLTAuMDEpLnRvRml4ZWQoMSkgaXMgJy0wLjAnLlxyXG4gICAqICgtMCkudG9GaXhlZCgzKSBpcyAnMC4wMDAnLlxyXG4gICAqICgtMC41KS50b0ZpeGVkKDApIGlzICctMCcuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvRml4ZWQgPSBmdW5jdGlvbiAoZHAsIHJtKSB7XHJcbiAgICB2YXIgc3RyLCB5LFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgaWYgKGRwID09PSB2b2lkIDApIHJldHVybiB0b1N0cmluZyh4KTtcclxuXHJcbiAgICBjaGVja0ludDMyKGRwLCAwLCBNQVhfRElHSVRTKTtcclxuXHJcbiAgICBpZiAocm0gPT09IHZvaWQgMCkgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgZWxzZSBjaGVja0ludDMyKHJtLCAwLCA4KTtcclxuXHJcbiAgICB5ID0gcm91bmQobmV3IEN0b3IoeCksIGRwICsgZ2V0QmFzZTEwRXhwb25lbnQoeCkgKyAxLCBybSk7XHJcbiAgICBzdHIgPSB0b1N0cmluZyh5LmFicygpLCBmYWxzZSwgZHAgKyBnZXRCYXNlMTBFeHBvbmVudCh5KSArIDEpO1xyXG5cclxuICAgIC8vIFRvIGRldGVybWluZSB3aGV0aGVyIHRvIGFkZCB0aGUgbWludXMgc2lnbiBsb29rIGF0IHRoZSB2YWx1ZSBiZWZvcmUgaXQgd2FzIHJvdW5kZWQsXHJcbiAgICAvLyBpLmUuIGxvb2sgYXQgYHhgIHJhdGhlciB0aGFuIGB5YC5cclxuICAgIHJldHVybiB4LmlzbmVnKCkgJiYgIXguaXNaZXJvKCkgPyAnLScgKyBzdHIgOiBzdHI7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByb3VuZGVkIHRvIGEgd2hvbGUgbnVtYmVyIHVzaW5nXHJcbiAgICogcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b0ludGVnZXIgPSBQLnRvaW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuICAgIHJldHVybiByb3VuZChuZXcgQ3Rvcih4KSwgZ2V0QmFzZTEwRXhwb25lbnQoeCkgKyAxLCBDdG9yLnJvdW5kaW5nKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBjb252ZXJ0ZWQgdG8gYSBudW1iZXIgcHJpbWl0aXZlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b051bWJlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiArdGhpcztcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHJhaXNlZCB0byB0aGUgcG93ZXIgYHlgLFxyXG4gICAqIHRydW5jYXRlZCB0byBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKiBGb3Igbm9uLWludGVnZXIgb3IgdmVyeSBsYXJnZSBleHBvbmVudHMgcG93KHgsIHkpIGlzIGNhbGN1bGF0ZWQgdXNpbmdcclxuICAgKlxyXG4gICAqICAgeF55ID0gZXhwKHkqbG4oeCkpXHJcbiAgICpcclxuICAgKiBUaGUgbWF4aW11bSBlcnJvciBpcyAxIHVscCAodW5pdCBpbiBsYXN0IHBsYWNlKS5cclxuICAgKlxyXG4gICAqIHkge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gVGhlIHBvd2VyIHRvIHdoaWNoIHRvIHJhaXNlIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9Qb3dlciA9IFAucG93ID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciBlLCBrLCBwciwgciwgc2lnbiwgeUlzSW50LFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIGd1YXJkID0gMTIsXHJcbiAgICAgIHluID0gKyh5ID0gbmV3IEN0b3IoeSkpO1xyXG5cclxuICAgIC8vIHBvdyh4LCAwKSA9IDFcclxuICAgIGlmICgheS5zKSByZXR1cm4gbmV3IEN0b3IoT05FKTtcclxuXHJcbiAgICB4ID0gbmV3IEN0b3IoeCk7XHJcblxyXG4gICAgLy8gcG93KDAsIHkgPiAwKSA9IDBcclxuICAgIC8vIHBvdygwLCB5IDwgMCkgPSBJbmZpbml0eVxyXG4gICAgaWYgKCF4LnMpIHtcclxuICAgICAgaWYgKHkucyA8IDEpIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdJbmZpbml0eScpO1xyXG4gICAgICByZXR1cm4geDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwb3coMSwgeSkgPSAxXHJcbiAgICBpZiAoeC5lcShPTkUpKSByZXR1cm4geDtcclxuXHJcbiAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG5cclxuICAgIC8vIHBvdyh4LCAxKSA9IHhcclxuICAgIGlmICh5LmVxKE9ORSkpIHJldHVybiByb3VuZCh4LCBwcik7XHJcblxyXG4gICAgZSA9IHkuZTtcclxuICAgIGsgPSB5LmQubGVuZ3RoIC0gMTtcclxuICAgIHlJc0ludCA9IGUgPj0gaztcclxuICAgIHNpZ24gPSB4LnM7XHJcblxyXG4gICAgaWYgKCF5SXNJbnQpIHtcclxuXHJcbiAgICAgIC8vIHBvdyh4IDwgMCwgeSBub24taW50ZWdlcikgPSBOYU5cclxuICAgICAgaWYgKHNpZ24gPCAwKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnTmFOJyk7XHJcblxyXG4gICAgLy8gSWYgeSBpcyBhIHNtYWxsIGludGVnZXIgdXNlIHRoZSAnZXhwb25lbnRpYXRpb24gYnkgc3F1YXJpbmcnIGFsZ29yaXRobS5cclxuICAgIH0gZWxzZSBpZiAoKGsgPSB5biA8IDAgPyAteW4gOiB5bikgPD0gTUFYX1NBRkVfSU5URUdFUikge1xyXG4gICAgICByID0gbmV3IEN0b3IoT05FKTtcclxuXHJcbiAgICAgIC8vIE1heCBrIG9mIDkwMDcxOTkyNTQ3NDA5OTEgdGFrZXMgNTMgbG9vcCBpdGVyYXRpb25zLlxyXG4gICAgICAvLyBNYXhpbXVtIGRpZ2l0cyBhcnJheSBsZW5ndGg7IGxlYXZlcyBbMjgsIDM0XSBndWFyZCBkaWdpdHMuXHJcbiAgICAgIGUgPSBNYXRoLmNlaWwocHIgLyBMT0dfQkFTRSArIDQpO1xyXG5cclxuICAgICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuXHJcbiAgICAgIGZvciAoOzspIHtcclxuICAgICAgICBpZiAoayAlIDIpIHtcclxuICAgICAgICAgIHIgPSByLnRpbWVzKHgpO1xyXG4gICAgICAgICAgdHJ1bmNhdGUoci5kLCBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGsgPSBtYXRoZmxvb3IoayAvIDIpO1xyXG4gICAgICAgIGlmIChrID09PSAwKSBicmVhaztcclxuXHJcbiAgICAgICAgeCA9IHgudGltZXMoeCk7XHJcbiAgICAgICAgdHJ1bmNhdGUoeC5kLCBlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG5cclxuICAgICAgcmV0dXJuIHkucyA8IDAgPyBuZXcgQ3RvcihPTkUpLmRpdihyKSA6IHJvdW5kKHIsIHByKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXN1bHQgaXMgbmVnYXRpdmUgaWYgeCBpcyBuZWdhdGl2ZSBhbmQgdGhlIGxhc3QgZGlnaXQgb2YgaW50ZWdlciB5IGlzIG9kZC5cclxuICAgIHNpZ24gPSBzaWduIDwgMCAmJiB5LmRbTWF0aC5tYXgoZSwgayldICYgMSA/IC0xIDogMTtcclxuXHJcbiAgICB4LnMgPSAxO1xyXG4gICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuICAgIHIgPSB5LnRpbWVzKGxuKHgsIHByICsgZ3VhcmQpKTtcclxuICAgIGV4dGVybmFsID0gdHJ1ZTtcclxuICAgIHIgPSBleHAocik7XHJcbiAgICByLnMgPSBzaWduO1xyXG5cclxuICAgIHJldHVybiByO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByb3VuZGVkIHRvIGBzZGAgc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAgICogdXNpbmcgcm91bmRpbmcgbW9kZSBgcm91bmRpbmdgLlxyXG4gICAqXHJcbiAgICogUmV0dXJuIGV4cG9uZW50aWFsIG5vdGF0aW9uIGlmIGBzZGAgaXMgbGVzcyB0aGFuIHRoZSBudW1iZXIgb2YgZGlnaXRzIG5lY2Vzc2FyeSB0byByZXByZXNlbnRcclxuICAgKiB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSB2YWx1ZSBpbiBub3JtYWwgbm90YXRpb24uXHJcbiAgICpcclxuICAgKiBbc2RdIHtudW1iZXJ9IFNpZ25pZmljYW50IGRpZ2l0cy4gSW50ZWdlciwgMSB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvUHJlY2lzaW9uID0gZnVuY3Rpb24gKHNkLCBybSkge1xyXG4gICAgdmFyIGUsIHN0cixcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmIChzZCA9PT0gdm9pZCAwKSB7XHJcbiAgICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KTtcclxuICAgICAgc3RyID0gdG9TdHJpbmcoeCwgZSA8PSBDdG9yLnRvRXhwTmVnIHx8IGUgPj0gQ3Rvci50b0V4cFBvcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjaGVja0ludDMyKHNkLCAxLCBNQVhfRElHSVRTKTtcclxuXHJcbiAgICAgIGlmIChybSA9PT0gdm9pZCAwKSBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICAgIGVsc2UgY2hlY2tJbnQzMihybSwgMCwgOCk7XHJcblxyXG4gICAgICB4ID0gcm91bmQobmV3IEN0b3IoeCksIHNkLCBybSk7XHJcbiAgICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KTtcclxuICAgICAgc3RyID0gdG9TdHJpbmcoeCwgc2QgPD0gZSB8fCBlIDw9IEN0b3IudG9FeHBOZWcsIHNkKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgcm91bmRlZCB0byBhIG1heGltdW0gb2YgYHNkYFxyXG4gICAqIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIGBybWAsIG9yIHRvIGBwcmVjaXNpb25gIGFuZCBgcm91bmRpbmdgIHJlc3BlY3RpdmVseSBpZlxyXG4gICAqIG9taXR0ZWQuXHJcbiAgICpcclxuICAgKiBbc2RdIHtudW1iZXJ9IFNpZ25pZmljYW50IGRpZ2l0cy4gSW50ZWdlciwgMSB0byBNQVhfRElHSVRTIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvU2lnbmlmaWNhbnREaWdpdHMgPSBQLnRvc2QgPSBmdW5jdGlvbiAoc2QsIHJtKSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmIChzZCA9PT0gdm9pZCAwKSB7XHJcbiAgICAgIHNkID0gQ3Rvci5wcmVjaXNpb247XHJcbiAgICAgIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoZWNrSW50MzIoc2QsIDEsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgICAgaWYgKHJtID09PSB2b2lkIDApIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgICAgZWxzZSBjaGVja0ludDMyKHJtLCAwLCA4KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcm91bmQobmV3IEN0b3IoeCksIHNkLCBybSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICogUmV0dXJuIGV4cG9uZW50aWFsIG5vdGF0aW9uIGlmIHRoaXMgRGVjaW1hbCBoYXMgYSBwb3NpdGl2ZSBleHBvbmVudCBlcXVhbCB0byBvciBncmVhdGVyIHRoYW5cclxuICAgKiBgdG9FeHBQb3NgLCBvciBhIG5lZ2F0aXZlIGV4cG9uZW50IGVxdWFsIHRvIG9yIGxlc3MgdGhhbiBgdG9FeHBOZWdgLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b1N0cmluZyA9IFAudmFsdWVPZiA9IFAudmFsID0gUC50b0pTT04gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KSxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgcmV0dXJuIHRvU3RyaW5nKHgsIGUgPD0gQ3Rvci50b0V4cE5lZyB8fCBlID49IEN0b3IudG9FeHBQb3MpO1xyXG4gIH07XHJcblxyXG5cclxuICAvLyBIZWxwZXIgZnVuY3Rpb25zIGZvciBEZWNpbWFsLnByb3RvdHlwZSAoUCkgYW5kL29yIERlY2ltYWwgbWV0aG9kcywgYW5kIHRoZWlyIGNhbGxlcnMuXHJcblxyXG5cclxuICAvKlxyXG4gICAqICBhZGQgICAgICAgICAgICAgICAgIFAubWludXMsIFAucGx1c1xyXG4gICAqICBjaGVja0ludDMyICAgICAgICAgIFAudG9kcCwgUC50b0V4cG9uZW50aWFsLCBQLnRvRml4ZWQsIFAudG9QcmVjaXNpb24sIFAudG9zZFxyXG4gICAqICBkaWdpdHNUb1N0cmluZyAgICAgIFAubG9nLCBQLnNxcnQsIFAucG93LCB0b1N0cmluZywgZXhwLCBsblxyXG4gICAqICBkaXZpZGUgICAgICAgICAgICAgIFAuZGl2LCBQLmlkaXYsIFAubG9nLCBQLm1vZCwgUC5zcXJ0LCBleHAsIGxuXHJcbiAgICogIGV4cCAgICAgICAgICAgICAgICAgUC5leHAsIFAucG93XHJcbiAgICogIGdldEJhc2UxMEV4cG9uZW50ICAgUC5leHBvbmVudCwgUC5zZCwgUC50b2ludCwgUC5zcXJ0LCBQLnRvZHAsIFAudG9GaXhlZCwgUC50b1ByZWNpc2lvbixcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICBQLnRvU3RyaW5nLCBkaXZpZGUsIHJvdW5kLCB0b1N0cmluZywgZXhwLCBsblxyXG4gICAqICBnZXRMbjEwICAgICAgICAgICAgIFAubG9nLCBsblxyXG4gICAqICBnZXRaZXJvU3RyaW5nICAgICAgIGRpZ2l0c1RvU3RyaW5nLCB0b1N0cmluZ1xyXG4gICAqICBsbiAgICAgICAgICAgICAgICAgIFAubG9nLCBQLmxuLCBQLnBvdywgZXhwXHJcbiAgICogIHBhcnNlRGVjaW1hbCAgICAgICAgRGVjaW1hbFxyXG4gICAqICByb3VuZCAgICAgICAgICAgICAgIFAuYWJzLCBQLmlkaXYsIFAubG9nLCBQLm1pbnVzLCBQLm1vZCwgUC5uZWcsIFAucGx1cywgUC50b2ludCwgUC5zcXJ0LFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgIFAudGltZXMsIFAudG9kcCwgUC50b0V4cG9uZW50aWFsLCBQLnRvRml4ZWQsIFAucG93LCBQLnRvUHJlY2lzaW9uLCBQLnRvc2QsXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgZGl2aWRlLCBnZXRMbjEwLCBleHAsIGxuXHJcbiAgICogIHN1YnRyYWN0ICAgICAgICAgICAgUC5taW51cywgUC5wbHVzXHJcbiAgICogIHRvU3RyaW5nICAgICAgICAgICAgUC50b0V4cG9uZW50aWFsLCBQLnRvRml4ZWQsIFAudG9QcmVjaXNpb24sIFAudG9TdHJpbmcsIFAudmFsdWVPZlxyXG4gICAqICB0cnVuY2F0ZSAgICAgICAgICAgIFAucG93XHJcbiAgICpcclxuICAgKiAgVGhyb3dzOiAgICAgICAgICAgICBQLmxvZywgUC5tb2QsIFAuc2QsIFAuc3FydCwgUC5wb3csICBjaGVja0ludDMyLCBkaXZpZGUsIHJvdW5kLFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgIGdldExuMTAsIGV4cCwgbG4sIHBhcnNlRGVjaW1hbCwgRGVjaW1hbCwgY29uZmlnXHJcbiAgICovXHJcblxyXG5cclxuICBmdW5jdGlvbiBhZGQoeCwgeSkge1xyXG4gICAgdmFyIGNhcnJ5LCBkLCBlLCBpLCBrLCBsZW4sIHhkLCB5ZCxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcblxyXG4gICAgLy8gSWYgZWl0aGVyIGlzIHplcm8uLi5cclxuICAgIGlmICgheC5zIHx8ICF5LnMpIHtcclxuXHJcbiAgICAgIC8vIFJldHVybiB4IGlmIHkgaXMgemVyby5cclxuICAgICAgLy8gUmV0dXJuIHkgaWYgeSBpcyBub24temVyby5cclxuICAgICAgaWYgKCF5LnMpIHkgPSBuZXcgQ3Rvcih4KTtcclxuICAgICAgcmV0dXJuIGV4dGVybmFsID8gcm91bmQoeSwgcHIpIDogeTtcclxuICAgIH1cclxuXHJcbiAgICB4ZCA9IHguZDtcclxuICAgIHlkID0geS5kO1xyXG5cclxuICAgIC8vIHggYW5kIHkgYXJlIGZpbml0ZSwgbm9uLXplcm8gbnVtYmVycyB3aXRoIHRoZSBzYW1lIHNpZ24uXHJcblxyXG4gICAgayA9IHguZTtcclxuICAgIGUgPSB5LmU7XHJcbiAgICB4ZCA9IHhkLnNsaWNlKCk7XHJcbiAgICBpID0gayAtIGU7XHJcblxyXG4gICAgLy8gSWYgYmFzZSAxZTcgZXhwb25lbnRzIGRpZmZlci4uLlxyXG4gICAgaWYgKGkpIHtcclxuICAgICAgaWYgKGkgPCAwKSB7XHJcbiAgICAgICAgZCA9IHhkO1xyXG4gICAgICAgIGkgPSAtaTtcclxuICAgICAgICBsZW4gPSB5ZC5sZW5ndGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZCA9IHlkO1xyXG4gICAgICAgIGUgPSBrO1xyXG4gICAgICAgIGxlbiA9IHhkLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTGltaXQgbnVtYmVyIG9mIHplcm9zIHByZXBlbmRlZCB0byBtYXgoY2VpbChwciAvIExPR19CQVNFKSwgbGVuKSArIDEuXHJcbiAgICAgIGsgPSBNYXRoLmNlaWwocHIgLyBMT0dfQkFTRSk7XHJcbiAgICAgIGxlbiA9IGsgPiBsZW4gPyBrICsgMSA6IGxlbiArIDE7XHJcblxyXG4gICAgICBpZiAoaSA+IGxlbikge1xyXG4gICAgICAgIGkgPSBsZW47XHJcbiAgICAgICAgZC5sZW5ndGggPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBQcmVwZW5kIHplcm9zIHRvIGVxdWFsaXNlIGV4cG9uZW50cy4gTm90ZTogRmFzdGVyIHRvIHVzZSByZXZlcnNlIHRoZW4gZG8gdW5zaGlmdHMuXHJcbiAgICAgIGQucmV2ZXJzZSgpO1xyXG4gICAgICBmb3IgKDsgaS0tOykgZC5wdXNoKDApO1xyXG4gICAgICBkLnJldmVyc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZW4gPSB4ZC5sZW5ndGg7XHJcbiAgICBpID0geWQubGVuZ3RoO1xyXG5cclxuICAgIC8vIElmIHlkIGlzIGxvbmdlciB0aGFuIHhkLCBzd2FwIHhkIGFuZCB5ZCBzbyB4ZCBwb2ludHMgdG8gdGhlIGxvbmdlciBhcnJheS5cclxuICAgIGlmIChsZW4gLSBpIDwgMCkge1xyXG4gICAgICBpID0gbGVuO1xyXG4gICAgICBkID0geWQ7XHJcbiAgICAgIHlkID0geGQ7XHJcbiAgICAgIHhkID0gZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPbmx5IHN0YXJ0IGFkZGluZyBhdCB5ZC5sZW5ndGggLSAxIGFzIHRoZSBmdXJ0aGVyIGRpZ2l0cyBvZiB4ZCBjYW4gYmUgbGVmdCBhcyB0aGV5IGFyZS5cclxuICAgIGZvciAoY2FycnkgPSAwOyBpOykge1xyXG4gICAgICBjYXJyeSA9ICh4ZFstLWldID0geGRbaV0gKyB5ZFtpXSArIGNhcnJ5KSAvIEJBU0UgfCAwO1xyXG4gICAgICB4ZFtpXSAlPSBCQVNFO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjYXJyeSkge1xyXG4gICAgICB4ZC51bnNoaWZ0KGNhcnJ5KTtcclxuICAgICAgKytlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIC8vIE5vIG5lZWQgdG8gY2hlY2sgZm9yIHplcm8sIGFzICt4ICsgK3kgIT0gMCAmJiAteCArIC15ICE9IDBcclxuICAgIGZvciAobGVuID0geGQubGVuZ3RoOyB4ZFstLWxlbl0gPT0gMDspIHhkLnBvcCgpO1xyXG5cclxuICAgIHkuZCA9IHhkO1xyXG4gICAgeS5lID0gZTtcclxuXHJcbiAgICByZXR1cm4gZXh0ZXJuYWwgPyByb3VuZCh5LCBwcikgOiB5O1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGNoZWNrSW50MzIoaSwgbWluLCBtYXgpIHtcclxuICAgIGlmIChpICE9PSB+fmkgfHwgaSA8IG1pbiB8fCBpID4gbWF4KSB7XHJcbiAgICAgIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIGkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGRpZ2l0c1RvU3RyaW5nKGQpIHtcclxuICAgIHZhciBpLCBrLCB3cyxcclxuICAgICAgaW5kZXhPZkxhc3RXb3JkID0gZC5sZW5ndGggLSAxLFxyXG4gICAgICBzdHIgPSAnJyxcclxuICAgICAgdyA9IGRbMF07XHJcblxyXG4gICAgaWYgKGluZGV4T2ZMYXN0V29yZCA+IDApIHtcclxuICAgICAgc3RyICs9IHc7XHJcbiAgICAgIGZvciAoaSA9IDE7IGkgPCBpbmRleE9mTGFzdFdvcmQ7IGkrKykge1xyXG4gICAgICAgIHdzID0gZFtpXSArICcnO1xyXG4gICAgICAgIGsgPSBMT0dfQkFTRSAtIHdzLmxlbmd0aDtcclxuICAgICAgICBpZiAoaykgc3RyICs9IGdldFplcm9TdHJpbmcoayk7XHJcbiAgICAgICAgc3RyICs9IHdzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB3ID0gZFtpXTtcclxuICAgICAgd3MgPSB3ICsgJyc7XHJcbiAgICAgIGsgPSBMT0dfQkFTRSAtIHdzLmxlbmd0aDtcclxuICAgICAgaWYgKGspIHN0ciArPSBnZXRaZXJvU3RyaW5nKGspO1xyXG4gICAgfSBlbHNlIGlmICh3ID09PSAwKSB7XHJcbiAgICAgIHJldHVybiAnMCc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zIG9mIGxhc3Qgdy5cclxuICAgIGZvciAoOyB3ICUgMTAgPT09IDA7KSB3IC89IDEwO1xyXG5cclxuICAgIHJldHVybiBzdHIgKyB3O1xyXG4gIH1cclxuXHJcblxyXG4gIHZhciBkaXZpZGUgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIEFzc3VtZXMgbm9uLXplcm8geCBhbmQgaywgYW5kIGhlbmNlIG5vbi16ZXJvIHJlc3VsdC5cclxuICAgIGZ1bmN0aW9uIG11bHRpcGx5SW50ZWdlcih4LCBrKSB7XHJcbiAgICAgIHZhciB0ZW1wLFxyXG4gICAgICAgIGNhcnJ5ID0gMCxcclxuICAgICAgICBpID0geC5sZW5ndGg7XHJcblxyXG4gICAgICBmb3IgKHggPSB4LnNsaWNlKCk7IGktLTspIHtcclxuICAgICAgICB0ZW1wID0geFtpXSAqIGsgKyBjYXJyeTtcclxuICAgICAgICB4W2ldID0gdGVtcCAlIEJBU0UgfCAwO1xyXG4gICAgICAgIGNhcnJ5ID0gdGVtcCAvIEJBU0UgfCAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2FycnkpIHgudW5zaGlmdChjYXJyeSk7XHJcblxyXG4gICAgICByZXR1cm4geDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb21wYXJlKGEsIGIsIGFMLCBiTCkge1xyXG4gICAgICB2YXIgaSwgcjtcclxuXHJcbiAgICAgIGlmIChhTCAhPSBiTCkge1xyXG4gICAgICAgIHIgPSBhTCA+IGJMID8gMSA6IC0xO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAoaSA9IHIgPSAwOyBpIDwgYUw7IGkrKykge1xyXG4gICAgICAgICAgaWYgKGFbaV0gIT0gYltpXSkge1xyXG4gICAgICAgICAgICByID0gYVtpXSA+IGJbaV0gPyAxIDogLTE7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3VidHJhY3QoYSwgYiwgYUwpIHtcclxuICAgICAgdmFyIGkgPSAwO1xyXG5cclxuICAgICAgLy8gU3VidHJhY3QgYiBmcm9tIGEuXHJcbiAgICAgIGZvciAoOyBhTC0tOykge1xyXG4gICAgICAgIGFbYUxdIC09IGk7XHJcbiAgICAgICAgaSA9IGFbYUxdIDwgYlthTF0gPyAxIDogMDtcclxuICAgICAgICBhW2FMXSA9IGkgKiBCQVNFICsgYVthTF0gLSBiW2FMXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgIGZvciAoOyAhYVswXSAmJiBhLmxlbmd0aCA+IDE7KSBhLnNoaWZ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh4LCB5LCBwciwgZHApIHtcclxuICAgICAgdmFyIGNtcCwgZSwgaSwgaywgcHJvZCwgcHJvZEwsIHEsIHFkLCByZW0sIHJlbUwsIHJlbTAsIHNkLCB0LCB4aSwgeEwsIHlkMCwgeUwsIHl6LFxyXG4gICAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICAgIHNpZ24gPSB4LnMgPT0geS5zID8gMSA6IC0xLFxyXG4gICAgICAgIHhkID0geC5kLFxyXG4gICAgICAgIHlkID0geS5kO1xyXG5cclxuICAgICAgLy8gRWl0aGVyIDA/XHJcbiAgICAgIGlmICgheC5zKSByZXR1cm4gbmV3IEN0b3IoeCk7XHJcbiAgICAgIGlmICgheS5zKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnRGl2aXNpb24gYnkgemVybycpO1xyXG5cclxuICAgICAgZSA9IHguZSAtIHkuZTtcclxuICAgICAgeUwgPSB5ZC5sZW5ndGg7XHJcbiAgICAgIHhMID0geGQubGVuZ3RoO1xyXG4gICAgICBxID0gbmV3IEN0b3Ioc2lnbik7XHJcbiAgICAgIHFkID0gcS5kID0gW107XHJcblxyXG4gICAgICAvLyBSZXN1bHQgZXhwb25lbnQgbWF5IGJlIG9uZSBsZXNzIHRoYW4gZS5cclxuICAgICAgZm9yIChpID0gMDsgeWRbaV0gPT0gKHhkW2ldIHx8IDApOyApICsraTtcclxuICAgICAgaWYgKHlkW2ldID4gKHhkW2ldIHx8IDApKSAtLWU7XHJcblxyXG4gICAgICBpZiAocHIgPT0gbnVsbCkge1xyXG4gICAgICAgIHNkID0gcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuICAgICAgfSBlbHNlIGlmIChkcCkge1xyXG4gICAgICAgIHNkID0gcHIgKyAoZ2V0QmFzZTEwRXhwb25lbnQoeCkgLSBnZXRCYXNlMTBFeHBvbmVudCh5KSkgKyAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNkID0gcHI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzZCA8IDApIHJldHVybiBuZXcgQ3RvcigwKTtcclxuXHJcbiAgICAgIC8vIENvbnZlcnQgcHJlY2lzaW9uIGluIG51bWJlciBvZiBiYXNlIDEwIGRpZ2l0cyB0byBiYXNlIDFlNyBkaWdpdHMuXHJcbiAgICAgIHNkID0gc2QgLyBMT0dfQkFTRSArIDIgfCAwO1xyXG4gICAgICBpID0gMDtcclxuXHJcbiAgICAgIC8vIGRpdmlzb3IgPCAxZTdcclxuICAgICAgaWYgKHlMID09IDEpIHtcclxuICAgICAgICBrID0gMDtcclxuICAgICAgICB5ZCA9IHlkWzBdO1xyXG4gICAgICAgIHNkKys7XHJcblxyXG4gICAgICAgIC8vIGsgaXMgdGhlIGNhcnJ5LlxyXG4gICAgICAgIGZvciAoOyAoaSA8IHhMIHx8IGspICYmIHNkLS07IGkrKykge1xyXG4gICAgICAgICAgdCA9IGsgKiBCQVNFICsgKHhkW2ldIHx8IDApO1xyXG4gICAgICAgICAgcWRbaV0gPSB0IC8geWQgfCAwO1xyXG4gICAgICAgICAgayA9IHQgJSB5ZCB8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgLy8gZGl2aXNvciA+PSAxZTdcclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgLy8gTm9ybWFsaXNlIHhkIGFuZCB5ZCBzbyBoaWdoZXN0IG9yZGVyIGRpZ2l0IG9mIHlkIGlzID49IEJBU0UvMlxyXG4gICAgICAgIGsgPSBCQVNFIC8gKHlkWzBdICsgMSkgfCAwO1xyXG5cclxuICAgICAgICBpZiAoayA+IDEpIHtcclxuICAgICAgICAgIHlkID0gbXVsdGlwbHlJbnRlZ2VyKHlkLCBrKTtcclxuICAgICAgICAgIHhkID0gbXVsdGlwbHlJbnRlZ2VyKHhkLCBrKTtcclxuICAgICAgICAgIHlMID0geWQubGVuZ3RoO1xyXG4gICAgICAgICAgeEwgPSB4ZC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB4aSA9IHlMO1xyXG4gICAgICAgIHJlbSA9IHhkLnNsaWNlKDAsIHlMKTtcclxuICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8gQWRkIHplcm9zIHRvIG1ha2UgcmVtYWluZGVyIGFzIGxvbmcgYXMgZGl2aXNvci5cclxuICAgICAgICBmb3IgKDsgcmVtTCA8IHlMOykgcmVtW3JlbUwrK10gPSAwO1xyXG5cclxuICAgICAgICB5eiA9IHlkLnNsaWNlKCk7XHJcbiAgICAgICAgeXoudW5zaGlmdCgwKTtcclxuICAgICAgICB5ZDAgPSB5ZFswXTtcclxuXHJcbiAgICAgICAgaWYgKHlkWzFdID49IEJBU0UgLyAyKSArK3lkMDtcclxuXHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgayA9IDA7XHJcblxyXG4gICAgICAgICAgLy8gQ29tcGFyZSBkaXZpc29yIGFuZCByZW1haW5kZXIuXHJcbiAgICAgICAgICBjbXAgPSBjb21wYXJlKHlkLCByZW0sIHlMLCByZW1MKTtcclxuXHJcbiAgICAgICAgICAvLyBJZiBkaXZpc29yIDwgcmVtYWluZGVyLlxyXG4gICAgICAgICAgaWYgKGNtcCA8IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0cmlhbCBkaWdpdCwgay5cclxuICAgICAgICAgICAgcmVtMCA9IHJlbVswXTtcclxuICAgICAgICAgICAgaWYgKHlMICE9IHJlbUwpIHJlbTAgPSByZW0wICogQkFTRSArIChyZW1bMV0gfHwgMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBrIHdpbGwgYmUgaG93IG1hbnkgdGltZXMgdGhlIGRpdmlzb3IgZ29lcyBpbnRvIHRoZSBjdXJyZW50IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgayA9IHJlbTAgLyB5ZDAgfCAwO1xyXG5cclxuICAgICAgICAgICAgLy8gIEFsZ29yaXRobTpcclxuICAgICAgICAgICAgLy8gIDEuIHByb2R1Y3QgPSBkaXZpc29yICogdHJpYWwgZGlnaXQgKGspXHJcbiAgICAgICAgICAgIC8vICAyLiBpZiBwcm9kdWN0ID4gcmVtYWluZGVyOiBwcm9kdWN0IC09IGRpdmlzb3IsIGstLVxyXG4gICAgICAgICAgICAvLyAgMy4gcmVtYWluZGVyIC09IHByb2R1Y3RcclxuICAgICAgICAgICAgLy8gIDQuIGlmIHByb2R1Y3Qgd2FzIDwgcmVtYWluZGVyIGF0IDI6XHJcbiAgICAgICAgICAgIC8vICAgIDUuIGNvbXBhcmUgbmV3IHJlbWFpbmRlciBhbmQgZGl2aXNvclxyXG4gICAgICAgICAgICAvLyAgICA2LiBJZiByZW1haW5kZXIgPiBkaXZpc29yOiByZW1haW5kZXIgLT0gZGl2aXNvciwgaysrXHJcblxyXG4gICAgICAgICAgICBpZiAoayA+IDEpIHtcclxuICAgICAgICAgICAgICBpZiAoayA+PSBCQVNFKSBrID0gQkFTRSAtIDE7XHJcblxyXG4gICAgICAgICAgICAgIC8vIHByb2R1Y3QgPSBkaXZpc29yICogdHJpYWwgZGlnaXQuXHJcbiAgICAgICAgICAgICAgcHJvZCA9IG11bHRpcGx5SW50ZWdlcih5ZCwgayk7XHJcbiAgICAgICAgICAgICAgcHJvZEwgPSBwcm9kLmxlbmd0aDtcclxuICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQ29tcGFyZSBwcm9kdWN0IGFuZCByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgY21wID0gY29tcGFyZShwcm9kLCByZW0sIHByb2RMLCByZW1MKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gcHJvZHVjdCA+IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICBpZiAoY21wID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGstLTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdWJ0cmFjdCBkaXZpc29yIGZyb20gcHJvZHVjdC5cclxuICAgICAgICAgICAgICAgIHN1YnRyYWN0KHByb2QsIHlMIDwgcHJvZEwgPyB5eiA6IHlkLCBwcm9kTCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAvLyBjbXAgaXMgLTEuXHJcbiAgICAgICAgICAgICAgLy8gSWYgayBpcyAwLCB0aGVyZSBpcyBubyBuZWVkIHRvIGNvbXBhcmUgeWQgYW5kIHJlbSBhZ2FpbiBiZWxvdywgc28gY2hhbmdlIGNtcCB0byAxXHJcbiAgICAgICAgICAgICAgLy8gdG8gYXZvaWQgaXQuIElmIGsgaXMgMSB0aGVyZSBpcyBhIG5lZWQgdG8gY29tcGFyZSB5ZCBhbmQgcmVtIGFnYWluIGJlbG93LlxyXG4gICAgICAgICAgICAgIGlmIChrID09IDApIGNtcCA9IGsgPSAxO1xyXG4gICAgICAgICAgICAgIHByb2QgPSB5ZC5zbGljZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcm9kTCA9IHByb2QubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAocHJvZEwgPCByZW1MKSBwcm9kLnVuc2hpZnQoMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTdWJ0cmFjdCBwcm9kdWN0IGZyb20gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICBzdWJ0cmFjdChyZW0sIHByb2QsIHJlbUwpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgcHJvZHVjdCB3YXMgPCBwcmV2aW91cyByZW1haW5kZXIuXHJcbiAgICAgICAgICAgIGlmIChjbXAgPT0gLTEpIHtcclxuICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQ29tcGFyZSBkaXZpc29yIGFuZCBuZXcgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIGNtcCA9IGNvbXBhcmUoeWQsIHJlbSwgeUwsIHJlbUwpO1xyXG5cclxuICAgICAgICAgICAgICAvLyBJZiBkaXZpc29yIDwgbmV3IHJlbWFpbmRlciwgc3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICBpZiAoY21wIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgaysrO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN1YnRyYWN0IGRpdmlzb3IgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmFjdChyZW0sIHlMIDwgcmVtTCA/IHl6IDogeWQsIHJlbUwpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVtTCA9IHJlbS5sZW5ndGg7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGNtcCA9PT0gMCkge1xyXG4gICAgICAgICAgICBrKys7XHJcbiAgICAgICAgICAgIHJlbSA9IFswXTtcclxuICAgICAgICAgIH0gICAgLy8gaWYgY21wID09PSAxLCBrIHdpbGwgYmUgMFxyXG5cclxuICAgICAgICAgIC8vIEFkZCB0aGUgbmV4dCBkaWdpdCwgaywgdG8gdGhlIHJlc3VsdCBhcnJheS5cclxuICAgICAgICAgIHFkW2krK10gPSBrO1xyXG5cclxuICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgcmVtYWluZGVyLlxyXG4gICAgICAgICAgaWYgKGNtcCAmJiByZW1bMF0pIHtcclxuICAgICAgICAgICAgcmVtW3JlbUwrK10gPSB4ZFt4aV0gfHwgMDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlbSA9IFt4ZFt4aV1dO1xyXG4gICAgICAgICAgICByZW1MID0gMTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSB3aGlsZSAoKHhpKysgPCB4TCB8fCByZW1bMF0gIT09IHZvaWQgMCkgJiYgc2QtLSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIExlYWRpbmcgemVybz9cclxuICAgICAgaWYgKCFxZFswXSkgcWQuc2hpZnQoKTtcclxuXHJcbiAgICAgIHEuZSA9IGU7XHJcblxyXG4gICAgICByZXR1cm4gcm91bmQocSwgZHAgPyBwciArIGdldEJhc2UxMEV4cG9uZW50KHEpICsgMSA6IHByKTtcclxuICAgIH07XHJcbiAgfSkoKTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG5hdHVyYWwgZXhwb25lbnRpYWwgb2YgYHhgIHRydW5jYXRlZCB0byBgc2RgXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICogVGF5bG9yL01hY2xhdXJpbiBzZXJpZXMuXHJcbiAgICpcclxuICAgKiBleHAoeCkgPSB4XjAvMCEgKyB4XjEvMSEgKyB4XjIvMiEgKyB4XjMvMyEgKyAuLi5cclxuICAgKlxyXG4gICAqIEFyZ3VtZW50IHJlZHVjdGlvbjpcclxuICAgKiAgIFJlcGVhdCB4ID0geCAvIDMyLCBrICs9IDUsIHVudGlsIHx4fCA8IDAuMVxyXG4gICAqICAgZXhwKHgpID0gZXhwKHggLyAyXmspXigyXmspXHJcbiAgICpcclxuICAgKiBQcmV2aW91c2x5LCB0aGUgYXJndW1lbnQgd2FzIGluaXRpYWxseSByZWR1Y2VkIGJ5XHJcbiAgICogZXhwKHgpID0gZXhwKHIpICogMTBeayAgd2hlcmUgciA9IHggLSBrICogbG4xMCwgayA9IGZsb29yKHggLyBsbjEwKVxyXG4gICAqIHRvIGZpcnN0IHB1dCByIGluIHRoZSByYW5nZSBbMCwgbG4xMF0sIGJlZm9yZSBkaXZpZGluZyBieSAzMiB1bnRpbCB8eHwgPCAwLjEsIGJ1dCB0aGlzIHdhc1xyXG4gICAqIGZvdW5kIHRvIGJlIHNsb3dlciB0aGFuIGp1c3QgZGl2aWRpbmcgcmVwZWF0ZWRseSBieSAzMiBhcyBhYm92ZS5cclxuICAgKlxyXG4gICAqIChNYXRoIG9iamVjdCBpbnRlZ2VyIG1pbi9tYXg6IE1hdGguZXhwKDcwOSkgPSA4LjJlKzMwNywgTWF0aC5leHAoLTc0NSkgPSA1ZS0zMjQpXHJcbiAgICpcclxuICAgKiAgZXhwKHgpIGlzIG5vbi10ZXJtaW5hdGluZyBmb3IgYW55IGZpbml0ZSwgbm9uLXplcm8geC5cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGV4cCh4LCBzZCkge1xyXG4gICAgdmFyIGRlbm9taW5hdG9yLCBndWFyZCwgcG93LCBzdW0sIHQsIHdwcixcclxuICAgICAgaSA9IDAsXHJcbiAgICAgIGsgPSAwLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuXHJcbiAgICBpZiAoZ2V0QmFzZTEwRXhwb25lbnQoeCkgPiAxNikgdGhyb3cgRXJyb3IoZXhwb25lbnRPdXRPZlJhbmdlICsgZ2V0QmFzZTEwRXhwb25lbnQoeCkpO1xyXG5cclxuICAgIC8vIGV4cCgwKSA9IDFcclxuICAgIGlmICgheC5zKSByZXR1cm4gbmV3IEN0b3IoT05FKTtcclxuXHJcbiAgICBpZiAoc2QgPT0gbnVsbCkge1xyXG4gICAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG4gICAgICB3cHIgPSBwcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdwciA9IHNkO1xyXG4gICAgfVxyXG5cclxuICAgIHQgPSBuZXcgQ3RvcigwLjAzMTI1KTtcclxuXHJcbiAgICB3aGlsZSAoeC5hYnMoKS5ndGUoMC4xKSkge1xyXG4gICAgICB4ID0geC50aW1lcyh0KTsgICAgLy8geCA9IHggLyAyXjVcclxuICAgICAgayArPSA1O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEVzdGltYXRlIHRoZSBwcmVjaXNpb24gaW5jcmVhc2UgbmVjZXNzYXJ5IHRvIGVuc3VyZSB0aGUgZmlyc3QgNCByb3VuZGluZyBkaWdpdHMgYXJlIGNvcnJlY3QuXHJcbiAgICBndWFyZCA9IE1hdGgubG9nKG1hdGhwb3coMiwgaykpIC8gTWF0aC5MTjEwICogMiArIDUgfCAwO1xyXG4gICAgd3ByICs9IGd1YXJkO1xyXG4gICAgZGVub21pbmF0b3IgPSBwb3cgPSBzdW0gPSBuZXcgQ3RvcihPTkUpO1xyXG4gICAgQ3Rvci5wcmVjaXNpb24gPSB3cHI7XHJcblxyXG4gICAgZm9yICg7Oykge1xyXG4gICAgICBwb3cgPSByb3VuZChwb3cudGltZXMoeCksIHdwcik7XHJcbiAgICAgIGRlbm9taW5hdG9yID0gZGVub21pbmF0b3IudGltZXMoKytpKTtcclxuICAgICAgdCA9IHN1bS5wbHVzKGRpdmlkZShwb3csIGRlbm9taW5hdG9yLCB3cHIpKTtcclxuXHJcbiAgICAgIGlmIChkaWdpdHNUb1N0cmluZyh0LmQpLnNsaWNlKDAsIHdwcikgPT09IGRpZ2l0c1RvU3RyaW5nKHN1bS5kKS5zbGljZSgwLCB3cHIpKSB7XHJcbiAgICAgICAgd2hpbGUgKGstLSkgc3VtID0gcm91bmQoc3VtLnRpbWVzKHN1bSksIHdwcik7XHJcbiAgICAgICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgICAgICByZXR1cm4gc2QgPT0gbnVsbCA/IChleHRlcm5hbCA9IHRydWUsIHJvdW5kKHN1bSwgcHIpKSA6IHN1bTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3VtID0gdDtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLyBDYWxjdWxhdGUgdGhlIGJhc2UgMTAgZXhwb25lbnQgZnJvbSB0aGUgYmFzZSAxZTcgZXhwb25lbnQuXHJcbiAgZnVuY3Rpb24gZ2V0QmFzZTEwRXhwb25lbnQoeCkge1xyXG4gICAgdmFyIGUgPSB4LmUgKiBMT0dfQkFTRSxcclxuICAgICAgdyA9IHguZFswXTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgdGhlIGZpcnN0IHdvcmQgb2YgdGhlIGRpZ2l0cyBhcnJheS5cclxuICAgIGZvciAoOyB3ID49IDEwOyB3IC89IDEwKSBlKys7XHJcbiAgICByZXR1cm4gZTtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiBnZXRMbjEwKEN0b3IsIHNkLCBwcikge1xyXG5cclxuICAgIGlmIChzZCA+IEN0b3IuTE4xMC5zZCgpKSB7XHJcblxyXG5cclxuICAgICAgLy8gUmVzZXQgZ2xvYmFsIHN0YXRlIGluIGNhc2UgdGhlIGV4Y2VwdGlvbiBpcyBjYXVnaHQuXHJcbiAgICAgIGV4dGVybmFsID0gdHJ1ZTtcclxuICAgICAgaWYgKHByKSBDdG9yLnByZWNpc2lvbiA9IHByO1xyXG4gICAgICB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnTE4xMCBwcmVjaXNpb24gbGltaXQgZXhjZWVkZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcm91bmQobmV3IEN0b3IoQ3Rvci5MTjEwKSwgc2QpO1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGdldFplcm9TdHJpbmcoaykge1xyXG4gICAgdmFyIHpzID0gJyc7XHJcbiAgICBmb3IgKDsgay0tOykgenMgKz0gJzAnO1xyXG4gICAgcmV0dXJuIHpzO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG5hdHVyYWwgbG9nYXJpdGhtIG9mIGB4YCB0cnVuY2F0ZWQgdG8gYHNkYCBzaWduaWZpY2FudFxyXG4gICAqIGRpZ2l0cy5cclxuICAgKlxyXG4gICAqICBsbihuKSBpcyBub24tdGVybWluYXRpbmcgKG4gIT0gMSlcclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGxuKHksIHNkKSB7XHJcbiAgICB2YXIgYywgYzAsIGRlbm9taW5hdG9yLCBlLCBudW1lcmF0b3IsIHN1bSwgdCwgd3ByLCB4MixcclxuICAgICAgbiA9IDEsXHJcbiAgICAgIGd1YXJkID0gMTAsXHJcbiAgICAgIHggPSB5LFxyXG4gICAgICB4ZCA9IHguZCxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcblxyXG4gICAgLy8gbG4oLXgpID0gTmFOXHJcbiAgICAvLyBsbigwKSA9IC1JbmZpbml0eVxyXG4gICAgaWYgKHgucyA8IDEpIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICh4LnMgPyAnTmFOJyA6ICctSW5maW5pdHknKSk7XHJcblxyXG4gICAgLy8gbG4oMSkgPSAwXHJcbiAgICBpZiAoeC5lcShPTkUpKSByZXR1cm4gbmV3IEN0b3IoMCk7XHJcblxyXG4gICAgaWYgKHNkID09IG51bGwpIHtcclxuICAgICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuICAgICAgd3ByID0gcHI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3cHIgPSBzZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoeC5lcSgxMCkpIHtcclxuICAgICAgaWYgKHNkID09IG51bGwpIGV4dGVybmFsID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIGdldExuMTAoQ3Rvciwgd3ByKTtcclxuICAgIH1cclxuXHJcbiAgICB3cHIgKz0gZ3VhcmQ7XHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IHdwcjtcclxuICAgIGMgPSBkaWdpdHNUb1N0cmluZyh4ZCk7XHJcbiAgICBjMCA9IGMuY2hhckF0KDApO1xyXG4gICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpO1xyXG5cclxuICAgIGlmIChNYXRoLmFicyhlKSA8IDEuNWUxNSkge1xyXG5cclxuICAgICAgLy8gQXJndW1lbnQgcmVkdWN0aW9uLlxyXG4gICAgICAvLyBUaGUgc2VyaWVzIGNvbnZlcmdlcyBmYXN0ZXIgdGhlIGNsb3NlciB0aGUgYXJndW1lbnQgaXMgdG8gMSwgc28gdXNpbmdcclxuICAgICAgLy8gbG4oYV5iKSA9IGIgKiBsbihhKSwgICBsbihhKSA9IGxuKGFeYikgLyBiXHJcbiAgICAgIC8vIG11bHRpcGx5IHRoZSBhcmd1bWVudCBieSBpdHNlbGYgdW50aWwgdGhlIGxlYWRpbmcgZGlnaXRzIG9mIHRoZSBzaWduaWZpY2FuZCBhcmUgNywgOCwgOSxcclxuICAgICAgLy8gMTAsIDExLCAxMiBvciAxMywgcmVjb3JkaW5nIHRoZSBudW1iZXIgb2YgbXVsdGlwbGljYXRpb25zIHNvIHRoZSBzdW0gb2YgdGhlIHNlcmllcyBjYW5cclxuICAgICAgLy8gbGF0ZXIgYmUgZGl2aWRlZCBieSB0aGlzIG51bWJlciwgdGhlbiBzZXBhcmF0ZSBvdXQgdGhlIHBvd2VyIG9mIDEwIHVzaW5nXHJcbiAgICAgIC8vIGxuKGEqMTBeYikgPSBsbihhKSArIGIqbG4oMTApLlxyXG5cclxuICAgICAgLy8gbWF4IG4gaXMgMjEgKGdpdmVzIDAuOSwgMS4wIG9yIDEuMSkgKDllMTUgLyAyMSA9IDQuMmUxNCkuXHJcbiAgICAgIC8vd2hpbGUgKGMwIDwgOSAmJiBjMCAhPSAxIHx8IGMwID09IDEgJiYgYy5jaGFyQXQoMSkgPiAxKSB7XHJcbiAgICAgIC8vIG1heCBuIGlzIDYgKGdpdmVzIDAuNyAtIDEuMylcclxuICAgICAgd2hpbGUgKGMwIDwgNyAmJiBjMCAhPSAxIHx8IGMwID09IDEgJiYgYy5jaGFyQXQoMSkgPiAzKSB7XHJcbiAgICAgICAgeCA9IHgudGltZXMoeSk7XHJcbiAgICAgICAgYyA9IGRpZ2l0c1RvU3RyaW5nKHguZCk7XHJcbiAgICAgICAgYzAgPSBjLmNoYXJBdCgwKTtcclxuICAgICAgICBuKys7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KTtcclxuXHJcbiAgICAgIGlmIChjMCA+IDEpIHtcclxuICAgICAgICB4ID0gbmV3IEN0b3IoJzAuJyArIGMpO1xyXG4gICAgICAgIGUrKztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB4ID0gbmV3IEN0b3IoYzAgKyAnLicgKyBjLnNsaWNlKDEpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vIFRoZSBhcmd1bWVudCByZWR1Y3Rpb24gbWV0aG9kIGFib3ZlIG1heSByZXN1bHQgaW4gb3ZlcmZsb3cgaWYgdGhlIGFyZ3VtZW50IHkgaXMgYSBtYXNzaXZlXHJcbiAgICAgIC8vIG51bWJlciB3aXRoIGV4cG9uZW50ID49IDE1MDAwMDAwMDAwMDAwMDAgKDllMTUgLyA2ID0gMS41ZTE1KSwgc28gaW5zdGVhZCByZWNhbGwgdGhpc1xyXG4gICAgICAvLyBmdW5jdGlvbiB1c2luZyBsbih4KjEwXmUpID0gbG4oeCkgKyBlKmxuKDEwKS5cclxuICAgICAgdCA9IGdldExuMTAoQ3Rvciwgd3ByICsgMiwgcHIpLnRpbWVzKGUgKyAnJyk7XHJcbiAgICAgIHggPSBsbihuZXcgQ3RvcihjMCArICcuJyArIGMuc2xpY2UoMSkpLCB3cHIgLSBndWFyZCkucGx1cyh0KTtcclxuXHJcbiAgICAgIEN0b3IucHJlY2lzaW9uID0gcHI7XHJcbiAgICAgIHJldHVybiBzZCA9PSBudWxsID8gKGV4dGVybmFsID0gdHJ1ZSwgcm91bmQoeCwgcHIpKSA6IHg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8geCBpcyByZWR1Y2VkIHRvIGEgdmFsdWUgbmVhciAxLlxyXG5cclxuICAgIC8vIFRheWxvciBzZXJpZXMuXHJcbiAgICAvLyBsbih5KSA9IGxuKCgxICsgeCkvKDEgLSB4KSkgPSAyKHggKyB4XjMvMyArIHheNS81ICsgeF43LzcgKyAuLi4pXHJcbiAgICAvLyB3aGVyZSB4ID0gKHkgLSAxKS8oeSArIDEpICAgICh8eHwgPCAxKVxyXG4gICAgc3VtID0gbnVtZXJhdG9yID0geCA9IGRpdmlkZSh4Lm1pbnVzKE9ORSksIHgucGx1cyhPTkUpLCB3cHIpO1xyXG4gICAgeDIgPSByb3VuZCh4LnRpbWVzKHgpLCB3cHIpO1xyXG4gICAgZGVub21pbmF0b3IgPSAzO1xyXG5cclxuICAgIGZvciAoOzspIHtcclxuICAgICAgbnVtZXJhdG9yID0gcm91bmQobnVtZXJhdG9yLnRpbWVzKHgyKSwgd3ByKTtcclxuICAgICAgdCA9IHN1bS5wbHVzKGRpdmlkZShudW1lcmF0b3IsIG5ldyBDdG9yKGRlbm9taW5hdG9yKSwgd3ByKSk7XHJcblxyXG4gICAgICBpZiAoZGlnaXRzVG9TdHJpbmcodC5kKS5zbGljZSgwLCB3cHIpID09PSBkaWdpdHNUb1N0cmluZyhzdW0uZCkuc2xpY2UoMCwgd3ByKSkge1xyXG4gICAgICAgIHN1bSA9IHN1bS50aW1lcygyKTtcclxuXHJcbiAgICAgICAgLy8gUmV2ZXJzZSB0aGUgYXJndW1lbnQgcmVkdWN0aW9uLlxyXG4gICAgICAgIGlmIChlICE9PSAwKSBzdW0gPSBzdW0ucGx1cyhnZXRMbjEwKEN0b3IsIHdwciArIDIsIHByKS50aW1lcyhlICsgJycpKTtcclxuICAgICAgICBzdW0gPSBkaXZpZGUoc3VtLCBuZXcgQ3RvcihuKSwgd3ByKTtcclxuXHJcbiAgICAgICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgICAgICByZXR1cm4gc2QgPT0gbnVsbCA/IChleHRlcm5hbCA9IHRydWUsIHJvdW5kKHN1bSwgcHIpKSA6IHN1bTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3VtID0gdDtcclxuICAgICAgZGVub21pbmF0b3IgKz0gMjtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFBhcnNlIHRoZSB2YWx1ZSBvZiBhIG5ldyBEZWNpbWFsIGB4YCBmcm9tIHN0cmluZyBgc3RyYC5cclxuICAgKi9cclxuICBmdW5jdGlvbiBwYXJzZURlY2ltYWwoeCwgc3RyKSB7XHJcbiAgICB2YXIgZSwgaSwgbGVuO1xyXG5cclxuICAgIC8vIERlY2ltYWwgcG9pbnQ/XHJcbiAgICBpZiAoKGUgPSBzdHIuaW5kZXhPZignLicpKSA+IC0xKSBzdHIgPSBzdHIucmVwbGFjZSgnLicsICcnKTtcclxuXHJcbiAgICAvLyBFeHBvbmVudGlhbCBmb3JtP1xyXG4gICAgaWYgKChpID0gc3RyLnNlYXJjaCgvZS9pKSkgPiAwKSB7XHJcblxyXG4gICAgICAvLyBEZXRlcm1pbmUgZXhwb25lbnQuXHJcbiAgICAgIGlmIChlIDwgMCkgZSA9IGk7XHJcbiAgICAgIGUgKz0gK3N0ci5zbGljZShpICsgMSk7XHJcbiAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgaSk7XHJcbiAgICB9IGVsc2UgaWYgKGUgPCAwKSB7XHJcblxyXG4gICAgICAvLyBJbnRlZ2VyLlxyXG4gICAgICBlID0gc3RyLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgbGVhZGluZyB6ZXJvcy5cclxuICAgIGZvciAoaSA9IDA7IHN0ci5jaGFyQ29kZUF0KGkpID09PSA0ODspICsraTtcclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICBmb3IgKGxlbiA9IHN0ci5sZW5ndGg7IHN0ci5jaGFyQ29kZUF0KGxlbiAtIDEpID09PSA0ODspIC0tbGVuO1xyXG4gICAgc3RyID0gc3RyLnNsaWNlKGksIGxlbik7XHJcblxyXG4gICAgaWYgKHN0cikge1xyXG4gICAgICBsZW4gLT0gaTtcclxuICAgICAgZSA9IGUgLSBpIC0gMTtcclxuICAgICAgeC5lID0gbWF0aGZsb29yKGUgLyBMT0dfQkFTRSk7XHJcbiAgICAgIHguZCA9IFtdO1xyXG5cclxuICAgICAgLy8gVHJhbnNmb3JtIGJhc2VcclxuXHJcbiAgICAgIC8vIGUgaXMgdGhlIGJhc2UgMTAgZXhwb25lbnQuXHJcbiAgICAgIC8vIGkgaXMgd2hlcmUgdG8gc2xpY2Ugc3RyIHRvIGdldCB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgZGlnaXRzIGFycmF5LlxyXG4gICAgICBpID0gKGUgKyAxKSAlIExPR19CQVNFO1xyXG4gICAgICBpZiAoZSA8IDApIGkgKz0gTE9HX0JBU0U7XHJcblxyXG4gICAgICBpZiAoaSA8IGxlbikge1xyXG4gICAgICAgIGlmIChpKSB4LmQucHVzaCgrc3RyLnNsaWNlKDAsIGkpKTtcclxuICAgICAgICBmb3IgKGxlbiAtPSBMT0dfQkFTRTsgaSA8IGxlbjspIHguZC5wdXNoKCtzdHIuc2xpY2UoaSwgaSArPSBMT0dfQkFTRSkpO1xyXG4gICAgICAgIHN0ciA9IHN0ci5zbGljZShpKTtcclxuICAgICAgICBpID0gTE9HX0JBU0UgLSBzdHIubGVuZ3RoO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGkgLT0gbGVuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKDsgaS0tOykgc3RyICs9ICcwJztcclxuICAgICAgeC5kLnB1c2goK3N0cik7XHJcblxyXG4gICAgICBpZiAoZXh0ZXJuYWwgJiYgKHguZSA+IE1BWF9FIHx8IHguZSA8IC1NQVhfRSkpIHRocm93IEVycm9yKGV4cG9uZW50T3V0T2ZSYW5nZSArIGUpO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vIFplcm8uXHJcbiAgICAgIHgucyA9IDA7XHJcbiAgICAgIHguZSA9IDA7XHJcbiAgICAgIHguZCA9IFswXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geDtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJvdW5kIGB4YCB0byBgc2RgIHNpZ25pZmljYW50IGRpZ2l0cywgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm1gIGlmIHByZXNlbnQgKHRydW5jYXRlIG90aGVyd2lzZSkuXHJcbiAgICovXHJcbiAgIGZ1bmN0aW9uIHJvdW5kKHgsIHNkLCBybSkge1xyXG4gICAgdmFyIGksIGosIGssIG4sIHJkLCBkb1JvdW5kLCB3LCB4ZGksXHJcbiAgICAgIHhkID0geC5kO1xyXG5cclxuICAgIC8vIHJkOiB0aGUgcm91bmRpbmcgZGlnaXQsIGkuZS4gdGhlIGRpZ2l0IGFmdGVyIHRoZSBkaWdpdCB0aGF0IG1heSBiZSByb3VuZGVkIHVwLlxyXG4gICAgLy8gdzogdGhlIHdvcmQgb2YgeGQgd2hpY2ggY29udGFpbnMgdGhlIHJvdW5kaW5nIGRpZ2l0LCBhIGJhc2UgMWU3IG51bWJlci5cclxuICAgIC8vIHhkaTogdGhlIGluZGV4IG9mIHcgd2l0aGluIHhkLlxyXG4gICAgLy8gbjogdGhlIG51bWJlciBvZiBkaWdpdHMgb2Ygdy5cclxuICAgIC8vIGk6IHdoYXQgd291bGQgYmUgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiB3IGlmIGFsbCB0aGUgbnVtYmVycyB3ZXJlIDcgZGlnaXRzIGxvbmcgKGkuZS4gaWZcclxuICAgIC8vIHRoZXkgaGFkIGxlYWRpbmcgemVyb3MpXHJcbiAgICAvLyBqOiBpZiA+IDAsIHRoZSBhY3R1YWwgaW5kZXggb2YgcmQgd2l0aGluIHcgKGlmIDwgMCwgcmQgaXMgYSBsZWFkaW5nIHplcm8pLlxyXG5cclxuICAgIC8vIEdldCB0aGUgbGVuZ3RoIG9mIHRoZSBmaXJzdCB3b3JkIG9mIHRoZSBkaWdpdHMgYXJyYXkgeGQuXHJcbiAgICBmb3IgKG4gPSAxLCBrID0geGRbMF07IGsgPj0gMTA7IGsgLz0gMTApIG4rKztcclxuICAgIGkgPSBzZCAtIG47XHJcblxyXG4gICAgLy8gSXMgdGhlIHJvdW5kaW5nIGRpZ2l0IGluIHRoZSBmaXJzdCB3b3JkIG9mIHhkP1xyXG4gICAgaWYgKGkgPCAwKSB7XHJcbiAgICAgIGkgKz0gTE9HX0JBU0U7XHJcbiAgICAgIGogPSBzZDtcclxuICAgICAgdyA9IHhkW3hkaSA9IDBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgeGRpID0gTWF0aC5jZWlsKChpICsgMSkgLyBMT0dfQkFTRSk7XHJcbiAgICAgIGsgPSB4ZC5sZW5ndGg7XHJcbiAgICAgIGlmICh4ZGkgPj0gaykgcmV0dXJuIHg7XHJcbiAgICAgIHcgPSBrID0geGRbeGRpXTtcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiB3LlxyXG4gICAgICBmb3IgKG4gPSAxOyBrID49IDEwOyBrIC89IDEwKSBuKys7XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiB3LlxyXG4gICAgICBpICU9IExPR19CQVNFO1xyXG5cclxuICAgICAgLy8gR2V0IHRoZSBpbmRleCBvZiByZCB3aXRoaW4gdywgYWRqdXN0ZWQgZm9yIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgIC8vIFRoZSBudW1iZXIgb2YgbGVhZGluZyB6ZXJvcyBvZiB3IGlzIGdpdmVuIGJ5IExPR19CQVNFIC0gbi5cclxuICAgICAgaiA9IGkgLSBMT0dfQkFTRSArIG47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJtICE9PSB2b2lkIDApIHtcclxuICAgICAgayA9IG1hdGhwb3coMTAsIG4gLSBqIC0gMSk7XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIHJvdW5kaW5nIGRpZ2l0IGF0IGluZGV4IGogb2Ygdy5cclxuICAgICAgcmQgPSB3IC8gayAlIDEwIHwgMDtcclxuXHJcbiAgICAgIC8vIEFyZSB0aGVyZSBhbnkgbm9uLXplcm8gZGlnaXRzIGFmdGVyIHRoZSByb3VuZGluZyBkaWdpdD9cclxuICAgICAgZG9Sb3VuZCA9IHNkIDwgMCB8fCB4ZFt4ZGkgKyAxXSAhPT0gdm9pZCAwIHx8IHcgJSBrO1xyXG5cclxuICAgICAgLy8gVGhlIGV4cHJlc3Npb24gYHcgJSBtYXRocG93KDEwLCBuIC0gaiAtIDEpYCByZXR1cm5zIGFsbCB0aGUgZGlnaXRzIG9mIHcgdG8gdGhlIHJpZ2h0IG9mIHRoZVxyXG4gICAgICAvLyBkaWdpdCBhdCAobGVmdC10by1yaWdodCkgaW5kZXggaiwgZS5nLiBpZiB3IGlzIDkwODcxNCBhbmQgaiBpcyAyLCB0aGUgZXhwcmVzc2lvbiB3aWxsIGdpdmVcclxuICAgICAgLy8gNzE0LlxyXG5cclxuICAgICAgZG9Sb3VuZCA9IHJtIDwgNFxyXG4gICAgICAgID8gKHJkIHx8IGRvUm91bmQpICYmIChybSA9PSAwIHx8IHJtID09ICh4LnMgPCAwID8gMyA6IDIpKVxyXG4gICAgICAgIDogcmQgPiA1IHx8IHJkID09IDUgJiYgKHJtID09IDQgfHwgZG9Sb3VuZCB8fCBybSA9PSA2ICYmXHJcblxyXG4gICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgZGlnaXQgdG8gdGhlIGxlZnQgb2YgdGhlIHJvdW5kaW5nIGRpZ2l0IGlzIG9kZC5cclxuICAgICAgICAgICgoaSA+IDAgPyBqID4gMCA/IHcgLyBtYXRocG93KDEwLCBuIC0gaikgOiAwIDogeGRbeGRpIC0gMV0pICUgMTApICYgMSB8fFxyXG4gICAgICAgICAgICBybSA9PSAoeC5zIDwgMCA/IDggOiA3KSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNkIDwgMSB8fCAheGRbMF0pIHtcclxuICAgICAgaWYgKGRvUm91bmQpIHtcclxuICAgICAgICBrID0gZ2V0QmFzZTEwRXhwb25lbnQoeCk7XHJcbiAgICAgICAgeGQubGVuZ3RoID0gMTtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCBzZCB0byBkZWNpbWFsIHBsYWNlcy5cclxuICAgICAgICBzZCA9IHNkIC0gayAtIDE7XHJcblxyXG4gICAgICAgIC8vIDEsIDAuMSwgMC4wMSwgMC4wMDEsIDAuMDAwMSBldGMuXHJcbiAgICAgICAgeGRbMF0gPSBtYXRocG93KDEwLCAoTE9HX0JBU0UgLSBzZCAlIExPR19CQVNFKSAlIExPR19CQVNFKTtcclxuICAgICAgICB4LmUgPSBtYXRoZmxvb3IoLXNkIC8gTE9HX0JBU0UpIHx8IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeGQubGVuZ3RoID0gMTtcclxuXHJcbiAgICAgICAgLy8gWmVyby5cclxuICAgICAgICB4ZFswXSA9IHguZSA9IHgucyA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSBleGNlc3MgZGlnaXRzLlxyXG4gICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICB4ZC5sZW5ndGggPSB4ZGk7XHJcbiAgICAgIGsgPSAxO1xyXG4gICAgICB4ZGktLTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHhkLmxlbmd0aCA9IHhkaSArIDE7XHJcbiAgICAgIGsgPSBtYXRocG93KDEwLCBMT0dfQkFTRSAtIGkpO1xyXG5cclxuICAgICAgLy8gRS5nLiA1NjcwMCBiZWNvbWVzIDU2MDAwIGlmIDcgaXMgdGhlIHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICAvLyBqID4gMCBtZWFucyBpID4gbnVtYmVyIG9mIGxlYWRpbmcgemVyb3Mgb2Ygdy5cclxuICAgICAgeGRbeGRpXSA9IGogPiAwID8gKHcgLyBtYXRocG93KDEwLCBuIC0gaikgJSBtYXRocG93KDEwLCBqKSB8IDApICogayA6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRvUm91bmQpIHtcclxuICAgICAgZm9yICg7Oykge1xyXG5cclxuICAgICAgICAvLyBJcyB0aGUgZGlnaXQgdG8gYmUgcm91bmRlZCB1cCBpbiB0aGUgZmlyc3Qgd29yZCBvZiB4ZD9cclxuICAgICAgICBpZiAoeGRpID09IDApIHtcclxuICAgICAgICAgIGlmICgoeGRbMF0gKz0gaykgPT0gQkFTRSkge1xyXG4gICAgICAgICAgICB4ZFswXSA9IDE7XHJcbiAgICAgICAgICAgICsreC5lO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB4ZFt4ZGldICs9IGs7XHJcbiAgICAgICAgICBpZiAoeGRbeGRpXSAhPSBCQVNFKSBicmVhaztcclxuICAgICAgICAgIHhkW3hkaS0tXSA9IDA7XHJcbiAgICAgICAgICBrID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICBmb3IgKGkgPSB4ZC5sZW5ndGg7IHhkWy0taV0gPT09IDA7KSB4ZC5wb3AoKTtcclxuXHJcbiAgICBpZiAoZXh0ZXJuYWwgJiYgKHguZSA+IE1BWF9FIHx8IHguZSA8IC1NQVhfRSkpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoZXhwb25lbnRPdXRPZlJhbmdlICsgZ2V0QmFzZTEwRXhwb25lbnQoeCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHN1YnRyYWN0KHgsIHkpIHtcclxuICAgIHZhciBkLCBlLCBpLCBqLCBrLCBsZW4sIHhkLCB4ZSwgeExUeSwgeWQsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG5cclxuICAgIC8vIFJldHVybiB5IG5lZ2F0ZWQgaWYgeCBpcyB6ZXJvLlxyXG4gICAgLy8gUmV0dXJuIHggaWYgeSBpcyB6ZXJvIGFuZCB4IGlzIG5vbi16ZXJvLlxyXG4gICAgaWYgKCF4LnMgfHwgIXkucykge1xyXG4gICAgICBpZiAoeS5zKSB5LnMgPSAteS5zO1xyXG4gICAgICBlbHNlIHkgPSBuZXcgQ3Rvcih4KTtcclxuICAgICAgcmV0dXJuIGV4dGVybmFsID8gcm91bmQoeSwgcHIpIDogeTtcclxuICAgIH1cclxuXHJcbiAgICB4ZCA9IHguZDtcclxuICAgIHlkID0geS5kO1xyXG5cclxuICAgIC8vIHggYW5kIHkgYXJlIG5vbi16ZXJvIG51bWJlcnMgd2l0aCB0aGUgc2FtZSBzaWduLlxyXG5cclxuICAgIGUgPSB5LmU7XHJcbiAgICB4ZSA9IHguZTtcclxuICAgIHhkID0geGQuc2xpY2UoKTtcclxuICAgIGsgPSB4ZSAtIGU7XHJcblxyXG4gICAgLy8gSWYgZXhwb25lbnRzIGRpZmZlci4uLlxyXG4gICAgaWYgKGspIHtcclxuICAgICAgeExUeSA9IGsgPCAwO1xyXG5cclxuICAgICAgaWYgKHhMVHkpIHtcclxuICAgICAgICBkID0geGQ7XHJcbiAgICAgICAgayA9IC1rO1xyXG4gICAgICAgIGxlbiA9IHlkLmxlbmd0aDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkID0geWQ7XHJcbiAgICAgICAgZSA9IHhlO1xyXG4gICAgICAgIGxlbiA9IHhkLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTnVtYmVycyB3aXRoIG1hc3NpdmVseSBkaWZmZXJlbnQgZXhwb25lbnRzIHdvdWxkIHJlc3VsdCBpbiBhIHZlcnkgaGlnaCBudW1iZXIgb2YgemVyb3NcclxuICAgICAgLy8gbmVlZGluZyB0byBiZSBwcmVwZW5kZWQsIGJ1dCB0aGlzIGNhbiBiZSBhdm9pZGVkIHdoaWxlIHN0aWxsIGVuc3VyaW5nIGNvcnJlY3Qgcm91bmRpbmcgYnlcclxuICAgICAgLy8gbGltaXRpbmcgdGhlIG51bWJlciBvZiB6ZXJvcyB0byBgTWF0aC5jZWlsKHByIC8gTE9HX0JBU0UpICsgMmAuXHJcbiAgICAgIGkgPSBNYXRoLm1heChNYXRoLmNlaWwocHIgLyBMT0dfQkFTRSksIGxlbikgKyAyO1xyXG5cclxuICAgICAgaWYgKGsgPiBpKSB7XHJcbiAgICAgICAgayA9IGk7XHJcbiAgICAgICAgZC5sZW5ndGggPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBQcmVwZW5kIHplcm9zIHRvIGVxdWFsaXNlIGV4cG9uZW50cy5cclxuICAgICAgZC5yZXZlcnNlKCk7XHJcbiAgICAgIGZvciAoaSA9IGs7IGktLTspIGQucHVzaCgwKTtcclxuICAgICAgZC5yZXZlcnNlKCk7XHJcblxyXG4gICAgLy8gQmFzZSAxZTcgZXhwb25lbnRzIGVxdWFsLlxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vIENoZWNrIGRpZ2l0cyB0byBkZXRlcm1pbmUgd2hpY2ggaXMgdGhlIGJpZ2dlciBudW1iZXIuXHJcblxyXG4gICAgICBpID0geGQubGVuZ3RoO1xyXG4gICAgICBsZW4gPSB5ZC5sZW5ndGg7XHJcbiAgICAgIHhMVHkgPSBpIDwgbGVuO1xyXG4gICAgICBpZiAoeExUeSkgbGVuID0gaTtcclxuXHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGlmICh4ZFtpXSAhPSB5ZFtpXSkge1xyXG4gICAgICAgICAgeExUeSA9IHhkW2ldIDwgeWRbaV07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGsgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh4TFR5KSB7XHJcbiAgICAgIGQgPSB4ZDtcclxuICAgICAgeGQgPSB5ZDtcclxuICAgICAgeWQgPSBkO1xyXG4gICAgICB5LnMgPSAteS5zO1xyXG4gICAgfVxyXG5cclxuICAgIGxlbiA9IHhkLmxlbmd0aDtcclxuXHJcbiAgICAvLyBBcHBlbmQgemVyb3MgdG8geGQgaWYgc2hvcnRlci5cclxuICAgIC8vIERvbid0IGFkZCB6ZXJvcyB0byB5ZCBpZiBzaG9ydGVyIGFzIHN1YnRyYWN0aW9uIG9ubHkgbmVlZHMgdG8gc3RhcnQgYXQgeWQgbGVuZ3RoLlxyXG4gICAgZm9yIChpID0geWQubGVuZ3RoIC0gbGVuOyBpID4gMDsgLS1pKSB4ZFtsZW4rK10gPSAwO1xyXG5cclxuICAgIC8vIFN1YnRyYWN0IHlkIGZyb20geGQuXHJcbiAgICBmb3IgKGkgPSB5ZC5sZW5ndGg7IGkgPiBrOykge1xyXG4gICAgICBpZiAoeGRbLS1pXSA8IHlkW2ldKSB7XHJcbiAgICAgICAgZm9yIChqID0gaTsgaiAmJiB4ZFstLWpdID09PSAwOykgeGRbal0gPSBCQVNFIC0gMTtcclxuICAgICAgICAtLXhkW2pdO1xyXG4gICAgICAgIHhkW2ldICs9IEJBU0U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHhkW2ldIC09IHlkW2ldO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIGZvciAoOyB4ZFstLWxlbl0gPT09IDA7KSB4ZC5wb3AoKTtcclxuXHJcbiAgICAvLyBSZW1vdmUgbGVhZGluZyB6ZXJvcyBhbmQgYWRqdXN0IGV4cG9uZW50IGFjY29yZGluZ2x5LlxyXG4gICAgZm9yICg7IHhkWzBdID09PSAwOyB4ZC5zaGlmdCgpKSAtLWU7XHJcblxyXG4gICAgLy8gWmVybz9cclxuICAgIGlmICgheGRbMF0pIHJldHVybiBuZXcgQ3RvcigwKTtcclxuXHJcbiAgICB5LmQgPSB4ZDtcclxuICAgIHkuZSA9IGU7XHJcblxyXG4gICAgLy9yZXR1cm4gZXh0ZXJuYWwgJiYgeGQubGVuZ3RoID49IHByIC8gTE9HX0JBU0UgPyByb3VuZCh5LCBwcikgOiB5O1xyXG4gICAgcmV0dXJuIGV4dGVybmFsID8gcm91bmQoeSwgcHIpIDogeTtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiB0b1N0cmluZyh4LCBpc0V4cCwgc2QpIHtcclxuICAgIHZhciBrLFxyXG4gICAgICBlID0gZ2V0QmFzZTEwRXhwb25lbnQoeCksXHJcbiAgICAgIHN0ciA9IGRpZ2l0c1RvU3RyaW5nKHguZCksXHJcbiAgICAgIGxlbiA9IHN0ci5sZW5ndGg7XHJcblxyXG4gICAgaWYgKGlzRXhwKSB7XHJcbiAgICAgIGlmIChzZCAmJiAoayA9IHNkIC0gbGVuKSA+IDApIHtcclxuICAgICAgICBzdHIgPSBzdHIuY2hhckF0KDApICsgJy4nICsgc3RyLnNsaWNlKDEpICsgZ2V0WmVyb1N0cmluZyhrKTtcclxuICAgICAgfSBlbHNlIGlmIChsZW4gPiAxKSB7XHJcbiAgICAgICAgc3RyID0gc3RyLmNoYXJBdCgwKSArICcuJyArIHN0ci5zbGljZSgxKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3RyID0gc3RyICsgKGUgPCAwID8gJ2UnIDogJ2UrJykgKyBlO1xyXG4gICAgfSBlbHNlIGlmIChlIDwgMCkge1xyXG4gICAgICBzdHIgPSAnMC4nICsgZ2V0WmVyb1N0cmluZygtZSAtIDEpICsgc3RyO1xyXG4gICAgICBpZiAoc2QgJiYgKGsgPSBzZCAtIGxlbikgPiAwKSBzdHIgKz0gZ2V0WmVyb1N0cmluZyhrKTtcclxuICAgIH0gZWxzZSBpZiAoZSA+PSBsZW4pIHtcclxuICAgICAgc3RyICs9IGdldFplcm9TdHJpbmcoZSArIDEgLSBsZW4pO1xyXG4gICAgICBpZiAoc2QgJiYgKGsgPSBzZCAtIGUgLSAxKSA+IDApIHN0ciA9IHN0ciArICcuJyArIGdldFplcm9TdHJpbmcoayk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoKGsgPSBlICsgMSkgPCBsZW4pIHN0ciA9IHN0ci5zbGljZSgwLCBrKSArICcuJyArIHN0ci5zbGljZShrKTtcclxuICAgICAgaWYgKHNkICYmIChrID0gc2QgLSBsZW4pID4gMCkge1xyXG4gICAgICAgIGlmIChlICsgMSA9PT0gbGVuKSBzdHIgKz0gJy4nO1xyXG4gICAgICAgIHN0ciArPSBnZXRaZXJvU3RyaW5nKGspO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHgucyA8IDAgPyAnLScgKyBzdHIgOiBzdHI7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gRG9lcyBub3Qgc3RyaXAgdHJhaWxpbmcgemVyb3MuXHJcbiAgZnVuY3Rpb24gdHJ1bmNhdGUoYXJyLCBsZW4pIHtcclxuICAgIGlmIChhcnIubGVuZ3RoID4gbGVuKSB7XHJcbiAgICAgIGFyci5sZW5ndGggPSBsZW47XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vIERlY2ltYWwgbWV0aG9kc1xyXG5cclxuXHJcbiAgLypcclxuICAgKiAgY2xvbmVcclxuICAgKiAgY29uZmlnL3NldFxyXG4gICAqL1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBDcmVhdGUgYW5kIHJldHVybiBhIERlY2ltYWwgY29uc3RydWN0b3Igd2l0aCB0aGUgc2FtZSBjb25maWd1cmF0aW9uIHByb3BlcnRpZXMgYXMgdGhpcyBEZWNpbWFsXHJcbiAgICogY29uc3RydWN0b3IuXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBjbG9uZShvYmopIHtcclxuICAgIHZhciBpLCBwLCBwcztcclxuXHJcbiAgICAvKlxyXG4gICAgICogVGhlIERlY2ltYWwgY29uc3RydWN0b3IgYW5kIGV4cG9ydGVkIGZ1bmN0aW9uLlxyXG4gICAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgaW5zdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogdmFsdWUge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gQSBudW1lcmljIHZhbHVlLlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gRGVjaW1hbCh2YWx1ZSkge1xyXG4gICAgICB2YXIgeCA9IHRoaXM7XHJcblxyXG4gICAgICAvLyBEZWNpbWFsIGNhbGxlZCB3aXRob3V0IG5ldy5cclxuICAgICAgaWYgKCEoeCBpbnN0YW5jZW9mIERlY2ltYWwpKSByZXR1cm4gbmV3IERlY2ltYWwodmFsdWUpO1xyXG5cclxuICAgICAgLy8gUmV0YWluIGEgcmVmZXJlbmNlIHRvIHRoaXMgRGVjaW1hbCBjb25zdHJ1Y3RvciwgYW5kIHNoYWRvdyBEZWNpbWFsLnByb3RvdHlwZS5jb25zdHJ1Y3RvclxyXG4gICAgICAvLyB3aGljaCBwb2ludHMgdG8gT2JqZWN0LlxyXG4gICAgICB4LmNvbnN0cnVjdG9yID0gRGVjaW1hbDtcclxuXHJcbiAgICAgIC8vIER1cGxpY2F0ZS5cclxuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGVjaW1hbCkge1xyXG4gICAgICAgIHgucyA9IHZhbHVlLnM7XHJcbiAgICAgICAgeC5lID0gdmFsdWUuZTtcclxuICAgICAgICB4LmQgPSAodmFsdWUgPSB2YWx1ZS5kKSA/IHZhbHVlLnNsaWNlKCkgOiB2YWx1ZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XHJcblxyXG4gICAgICAgIC8vIFJlamVjdCBJbmZpbml0eS9OYU4uXHJcbiAgICAgICAgaWYgKHZhbHVlICogMCAhPT0gMCkge1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID4gMCkge1xyXG4gICAgICAgICAgeC5zID0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgdmFsdWUgPSAtdmFsdWU7XHJcbiAgICAgICAgICB4LnMgPSAtMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeC5zID0gMDtcclxuICAgICAgICAgIHguZSA9IDA7XHJcbiAgICAgICAgICB4LmQgPSBbMF07XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIHNtYWxsIGludGVnZXJzLlxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gfn52YWx1ZSAmJiB2YWx1ZSA8IDFlNykge1xyXG4gICAgICAgICAgeC5lID0gMDtcclxuICAgICAgICAgIHguZCA9IFt2YWx1ZV07XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFyc2VEZWNpbWFsKHgsIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyB2YWx1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE1pbnVzIHNpZ24/XHJcbiAgICAgIGlmICh2YWx1ZS5jaGFyQ29kZUF0KDApID09PSA0NSkge1xyXG4gICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XHJcbiAgICAgICAgeC5zID0gLTE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeC5zID0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzRGVjaW1hbC50ZXN0KHZhbHVlKSkgcGFyc2VEZWNpbWFsKHgsIHZhbHVlKTtcclxuICAgICAgZWxzZSB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgRGVjaW1hbC5wcm90b3R5cGUgPSBQO1xyXG5cclxuICAgIERlY2ltYWwuUk9VTkRfVVAgPSAwO1xyXG4gICAgRGVjaW1hbC5ST1VORF9ET1dOID0gMTtcclxuICAgIERlY2ltYWwuUk9VTkRfQ0VJTCA9IDI7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0ZMT09SID0gMztcclxuICAgIERlY2ltYWwuUk9VTkRfSEFMRl9VUCA9IDQ7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0hBTEZfRE9XTiA9IDU7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0hBTEZfRVZFTiA9IDY7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0hBTEZfQ0VJTCA9IDc7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0hBTEZfRkxPT1IgPSA4O1xyXG5cclxuICAgIERlY2ltYWwuY2xvbmUgPSBjbG9uZTtcclxuICAgIERlY2ltYWwuY29uZmlnID0gRGVjaW1hbC5zZXQgPSBjb25maWc7XHJcblxyXG4gICAgaWYgKG9iaiA9PT0gdm9pZCAwKSBvYmogPSB7fTtcclxuICAgIGlmIChvYmopIHtcclxuICAgICAgcHMgPSBbJ3ByZWNpc2lvbicsICdyb3VuZGluZycsICd0b0V4cE5lZycsICd0b0V4cFBvcycsICdMTjEwJ107XHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBwcy5sZW5ndGg7KSBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShwID0gcHNbaSsrXSkpIG9ialtwXSA9IHRoaXNbcF07XHJcbiAgICB9XHJcblxyXG4gICAgRGVjaW1hbC5jb25maWcob2JqKTtcclxuXHJcbiAgICByZXR1cm4gRGVjaW1hbDtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIENvbmZpZ3VyZSBnbG9iYWwgc2V0dGluZ3MgZm9yIGEgRGVjaW1hbCBjb25zdHJ1Y3Rvci5cclxuICAgKlxyXG4gICAqIGBvYmpgIGlzIGFuIG9iamVjdCB3aXRoIG9uZSBvciBtb3JlIG9mIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyxcclxuICAgKlxyXG4gICAqICAgcHJlY2lzaW9uICB7bnVtYmVyfVxyXG4gICAqICAgcm91bmRpbmcgICB7bnVtYmVyfVxyXG4gICAqICAgdG9FeHBOZWcgICB7bnVtYmVyfVxyXG4gICAqICAgdG9FeHBQb3MgICB7bnVtYmVyfVxyXG4gICAqXHJcbiAgICogRS5nLiBEZWNpbWFsLmNvbmZpZyh7IHByZWNpc2lvbjogMjAsIHJvdW5kaW5nOiA0IH0pXHJcbiAgICpcclxuICAgKi9cclxuICBmdW5jdGlvbiBjb25maWcob2JqKSB7XHJcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnT2JqZWN0IGV4cGVjdGVkJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgaSwgcCwgdixcclxuICAgICAgcHMgPSBbXHJcbiAgICAgICAgJ3ByZWNpc2lvbicsIDEsIE1BWF9ESUdJVFMsXHJcbiAgICAgICAgJ3JvdW5kaW5nJywgMCwgOCxcclxuICAgICAgICAndG9FeHBOZWcnLCAtMSAvIDAsIDAsXHJcbiAgICAgICAgJ3RvRXhwUG9zJywgMCwgMSAvIDBcclxuICAgICAgXTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgcHMubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgaWYgKCh2ID0gb2JqW3AgPSBwc1tpXV0pICE9PSB2b2lkIDApIHtcclxuICAgICAgICBpZiAobWF0aGZsb29yKHYpID09PSB2ICYmIHYgPj0gcHNbaSArIDFdICYmIHYgPD0gcHNbaSArIDJdKSB0aGlzW3BdID0gdjtcclxuICAgICAgICBlbHNlIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIHAgKyAnOiAnICsgdik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoKHYgPSBvYmpbcCA9ICdMTjEwJ10pICE9PSB2b2lkIDApIHtcclxuICAgICAgICBpZiAodiA9PSBNYXRoLkxOMTApIHRoaXNbcF0gPSBuZXcgdGhpcyh2KTtcclxuICAgICAgICBlbHNlIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIHAgKyAnOiAnICsgdik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gQ3JlYXRlIGFuZCBjb25maWd1cmUgaW5pdGlhbCBEZWNpbWFsIGNvbnN0cnVjdG9yLlxyXG4gIERlY2ltYWwgPSBjbG9uZShEZWNpbWFsKTtcclxuXHJcbiAgRGVjaW1hbFsnZGVmYXVsdCddID0gRGVjaW1hbC5EZWNpbWFsID0gRGVjaW1hbDtcclxuXHJcbiAgLy8gSW50ZXJuYWwgY29uc3RhbnQuXHJcbiAgT05FID0gbmV3IERlY2ltYWwoMSk7XHJcblxyXG5cclxuICAvLyBFeHBvcnQuXHJcblxyXG5cclxuICAvLyBBTUQuXHJcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gRGVjaW1hbDtcclxuICAgIH0pO1xyXG5cclxuICAvLyBOb2RlIGFuZCBvdGhlciBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLlxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBEZWNpbWFsO1xyXG5cclxuICAgIC8vIEJyb3dzZXIuXHJcbiAgfSBlbHNlIHtcclxuICAgIGlmICghZ2xvYmFsU2NvcGUpIHtcclxuICAgICAgZ2xvYmFsU2NvcGUgPSB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmICYmIHNlbGYuc2VsZiA9PSBzZWxmXHJcbiAgICAgICAgPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcclxuICAgIH1cclxuXHJcbiAgICBnbG9iYWxTY29wZS5EZWNpbWFsID0gRGVjaW1hbDtcclxuICB9XHJcbn0pKHRoaXMpO1xyXG4iLCIvKiEgTW9tZW50IER1cmF0aW9uIEZvcm1hdCB2Mi4yLjJcbiAqICBodHRwczovL2dpdGh1Yi5jb20vanNtcmVlc2UvbW9tZW50LWR1cmF0aW9uLWZvcm1hdFxuICogIERhdGU6IDIwMTgtMDItMTZcbiAqXG4gKiAgRHVyYXRpb24gZm9ybWF0IHBsdWdpbiBmdW5jdGlvbiBmb3IgdGhlIE1vbWVudC5qcyBsaWJyYXJ5XG4gKiAgaHR0cDovL21vbWVudGpzLmNvbS9cbiAqXG4gKiAgQ29weXJpZ2h0IDIwMTggSm9obiBNYWRoYXZhbi1SZWVzZVxuICogIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoWydtb21lbnQnXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0IG9ubHkgQ29tbW9uSlMtbGlrZVxuICAgICAgICAvLyBlbnZpcm9tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsIGxpa2UgTm9kZS5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdtb21lbnQnKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIElmIG1vbWVudCBpcyBub3QgYXZhaWxhYmxlLCBsZWF2ZSB0aGUgc2V0dXAgdXAgdG8gdGhlIHVzZXIuXG4gICAgICAgICAgICAvLyBMaWtlIHdoZW4gdXNpbmcgbW9tZW50LXRpbWV6b25lIG9yIHNpbWlsYXIgbW9tZW50LWJhc2VkIHBhY2thZ2UuXG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocm9vdCkge1xuICAgICAgICAvLyBHbG9iYWxzLlxuICAgICAgICByb290Lm1vbWVudER1cmF0aW9uRm9ybWF0U2V0dXAgPSByb290Lm1vbWVudCA/IGZhY3Rvcnkocm9vdC5tb21lbnQpIDogZmFjdG9yeTtcbiAgICB9XG59KSh0aGlzLCBmdW5jdGlvbiAobW9tZW50KSB7XG4gICAgLy8gYE51bWJlciN0b2xvY2FsZVN0cmluZ2AgaXMgdGVzdGVkIG9uIHBsdWdpbiBpbml0aWFsaXphdGlvbi5cbiAgICAvLyBJZiB0aGUgZmVhdHVyZSB0ZXN0IHBhc3NlcywgYHRvTG9jYWxlU3RyaW5nV29ya3NgIHdpbGwgYmUgc2V0IHRvIGB0cnVlYCBhbmQgdGhlXG4gICAgLy8gbmF0aXZlIGZ1bmN0aW9uIHdpbGwgYmUgdXNlZCB0byBnZW5lcmF0ZSBmb3JtYXR0ZWQgb3V0cHV0LiBJZiB0aGUgZmVhdHVyZVxuICAgIC8vIHRlc3QgZmFpbHMsIHRoZSBmYWxsYmFjayBmb3JtYXQgZnVuY3Rpb24gaW50ZXJuYWwgdG8gdGhpcyBwbHVnaW4gd2lsbCBiZVxuICAgIC8vIHVzZWQuXG4gICAgdmFyIHRvTG9jYWxlU3RyaW5nV29ya3MgPSBmYWxzZTtcblxuICAgIC8vIGBOdW1iZXIjdG9Mb2NhbGVTdHJpbmdgIHJvdW5kcyBpbmNvcnJlY3RseSBmb3Igc2VsZWN0IG51bWJlcnMgaW4gTWljcm9zb2Z0XG4gICAgLy8gZW52aXJvbm1lbnRzIChFZGdlLCBJRTExLCBXaW5kb3dzIFBob25lKSBhbmQgcG9zc2libHkgb3RoZXIgZW52aXJvbm1lbnRzLlxuICAgIC8vIElmIHRoZSByb3VuZGluZyB0ZXN0IGZhaWxzIGFuZCBgdG9Mb2NhbGVTdHJpbmdgIHdpbGwgYmUgdXNlZCBmb3IgZm9ybWF0dGluZyxcbiAgICAvLyB0aGUgcGx1Z2luIHdpbGwgXCJwcmUtcm91bmRcIiBudW1iZXIgdmFsdWVzIHVzaW5nIHRoZSBmYWxsYmFjayBudW1iZXIgZm9ybWF0XG4gICAgLy8gZnVuY3Rpb24gYmVmb3JlIHBhc3NpbmcgdGhlbSB0byBgdG9Mb2NhbGVTdHJpbmdgIGZvciBmaW5hbCBmb3JtYXR0aW5nLlxuICAgIHZhciB0b0xvY2FsZVN0cmluZ1JvdW5kaW5nV29ya3MgPSBmYWxzZTtcblxuICAgIC8vIGBJbnRsLk51bWJlckZvcm1hdCNmb3JtYXRgIGlzIHRlc3RlZCBvbiBwbHVnaW4gaW5pdGlhbGl6YXRpb24uXG4gICAgLy8gSWYgdGhlIGZlYXR1cmUgdGVzdCBwYXNzZXMsIGBpbnRsTnVtYmVyRm9ybWF0Um91bmRpbmdXb3Jrc2Agd2lsbCBiZSBzZXQgdG9cbiAgICAvLyBgdHJ1ZWAgYW5kIHRoZSBuYXRpdmUgZnVuY3Rpb24gd2lsbCBiZSB1c2VkIHRvIGdlbmVyYXRlIGZvcm1hdHRlZCBvdXRwdXQuXG4gICAgLy8gSWYgdGhlIGZlYXR1cmUgdGVzdCBmYWlscywgZWl0aGVyIGBOdW1iZXIjdG9sb2NhbGVTdHJpbmdgIChpZlxuICAgIC8vIGB0b0xvY2FsZVN0cmluZ1dvcmtzYCBpcyBgdHJ1ZWApLCBvciB0aGUgZmFsbGJhY2sgZm9ybWF0IGZ1bmN0aW9uIGludGVybmFsXG4gICAgLy8gIHRvIHRoaXMgcGx1Z2luIHdpbGwgYmUgdXNlZC5cbiAgICB2YXIgaW50bE51bWJlckZvcm1hdFdvcmtzID0gZmFsc2U7XG5cbiAgICAvLyBgSW50bC5OdW1iZXJGb3JtYXQjZm9ybWF0YCByb3VuZHMgaW5jb3JyZWN0bHkgZm9yIHNlbGVjdCBudW1iZXJzIGluIE1pY3Jvc29mdFxuICAgIC8vIGVudmlyb25tZW50cyAoRWRnZSwgSUUxMSwgV2luZG93cyBQaG9uZSkgYW5kIHBvc3NpYmx5IG90aGVyIGVudmlyb25tZW50cy5cbiAgICAvLyBJZiB0aGUgcm91bmRpbmcgdGVzdCBmYWlscyBhbmQgYEludGwuTnVtYmVyRm9ybWF0I2Zvcm1hdGAgd2lsbCBiZSB1c2VkIGZvclxuICAgIC8vIGZvcm1hdHRpbmcsIHRoZSBwbHVnaW4gd2lsbCBcInByZS1yb3VuZFwiIG51bWJlciB2YWx1ZXMgdXNpbmcgdGhlIGZhbGxiYWNrIG51bWJlclxuICAgIC8vIGZvcm1hdCBmdW5jdGlvbiBiZWZvcmUgcGFzc2luZyB0aGVtIHRvIGBJbnRsLk51bWJlckZvcm1hdCNmb3JtYXRgIGZvciBmaW5hbFxuICAgIC8vIGZvcm1hdHRpbmcuXG4gICAgdmFyIGludGxOdW1iZXJGb3JtYXRSb3VuZGluZ1dvcmtzID0gZmFsc2U7XG5cbiAgICAvLyBUb2tlbiB0eXBlIG5hbWVzIGluIG9yZGVyIG9mIGRlc2NlbmRpbmcgbWFnbml0dWRlLlxuICAgIHZhciB0eXBlcyA9IFwiZXNjYXBlIHllYXJzIG1vbnRocyB3ZWVrcyBkYXlzIGhvdXJzIG1pbnV0ZXMgc2Vjb25kcyBtaWxsaXNlY29uZHMgZ2VuZXJhbFwiLnNwbGl0KFwiIFwiKTtcblxuICAgIHZhciBidWJibGVzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcInNlY29uZHNcIixcbiAgICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwibWludXRlc1wiLCB2YWx1ZTogNjAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwiaG91cnNcIiwgdmFsdWU6IDM2MDAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwiZGF5c1wiLCB2YWx1ZTogODY0MDAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwid2Vla3NcIiwgdmFsdWU6IDYwNDgwMCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJtb250aHNcIiwgdmFsdWU6IDI2Nzg0MDAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwieWVhcnNcIiwgdmFsdWU6IDMxNTM2MDAwIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJtaW51dGVzXCIsXG4gICAgICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcImhvdXJzXCIsIHZhbHVlOiA2MCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJkYXlzXCIsIHZhbHVlOiAxNDQwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIndlZWtzXCIsIHZhbHVlOiAxMDA4MCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJtb250aHNcIiwgdmFsdWU6IDQ0NjQwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInllYXJzXCIsIHZhbHVlOiA1MjU2MDAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImhvdXJzXCIsXG4gICAgICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcImRheXNcIiwgdmFsdWU6IDI0IH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIndlZWtzXCIsIHZhbHVlOiAxNjggfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwibW9udGhzXCIsIHZhbHVlOiA3NDQgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwieWVhcnNcIiwgdmFsdWU6IDg3NjAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImRheXNcIixcbiAgICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwid2Vla3NcIiwgdmFsdWU6IDcgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwibW9udGhzXCIsIHZhbHVlOiAzMSB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ5ZWFyc1wiLCB2YWx1ZTogMzY1IH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJtb250aHNcIixcbiAgICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwieWVhcnNcIiwgdmFsdWU6IDEyIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIF07XG5cbiAgICAvLyBzdHJpbmdJbmNsdWRlc1xuICAgIGZ1bmN0aW9uIHN0cmluZ0luY2x1ZGVzKHN0ciwgc2VhcmNoKSB7XG4gICAgICAgIGlmIChzZWFyY2gubGVuZ3RoID4gc3RyLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHIuaW5kZXhPZihzZWFyY2gpICE9PSAtMTtcbiAgICB9XG5cbiAgICAvLyByZXBlYXRaZXJvKHF0eSlcbiAgICAvLyBSZXR1cm5zIFwiMFwiIHJlcGVhdGVkIGBxdHlgIHRpbWVzLlxuICAgIC8vIGBxdHlgIG11c3QgYmUgYSBpbnRlZ2VyID49IDAuXG4gICAgZnVuY3Rpb24gcmVwZWF0WmVybyhxdHkpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XG5cbiAgICAgICAgd2hpbGUgKHF0eSkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IFwiMFwiO1xuICAgICAgICAgICAgcXR5IC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ1JvdW5kKGRpZ2l0cykge1xuICAgICAgICB2YXIgZGlnaXRzQXJyYXkgPSBkaWdpdHMuc3BsaXQoXCJcIikucmV2ZXJzZSgpO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBjYXJyeSA9IHRydWU7XG5cbiAgICAgICAgd2hpbGUgKGNhcnJ5ICYmIGkgPCBkaWdpdHNBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpZ2l0c0FycmF5W2ldID09PSBcIjlcIikge1xuICAgICAgICAgICAgICAgICAgICBkaWdpdHNBcnJheVtpXSA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRpZ2l0c0FycmF5W2ldID0gKHBhcnNlSW50KGRpZ2l0c0FycmF5W2ldLCAxMCkgKyAxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBjYXJyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGRpZ2l0c0FycmF5W2ldLCAxMCkgPCA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhcnJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGlnaXRzQXJyYXlbaV0gPSBcIjBcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhcnJ5KSB7XG4gICAgICAgICAgICBkaWdpdHNBcnJheS5wdXNoKFwiMVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkaWdpdHNBcnJheS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICB9XG5cbiAgICAvLyBjYWNoZWROdW1iZXJGb3JtYXRcbiAgICAvLyBSZXR1cm5zIGFuIGBJbnRsLk51bWJlckZvcm1hdGAgaW5zdGFuY2UgZm9yIHRoZSBnaXZlbiBsb2NhbGUgYW5kIGNvbmZpZ3VyYXRpb24uXG4gICAgLy8gT24gZmlyc3QgdXNlIG9mIGEgcGFydGljdWxhciBjb25maWd1cmF0aW9uLCB0aGUgaW5zdGFuY2UgaXMgY2FjaGVkIGZvciBmYXN0XG4gICAgLy8gcmVwZWF0IGFjY2Vzcy5cbiAgICBmdW5jdGlvbiBjYWNoZWROdW1iZXJGb3JtYXQobG9jYWxlLCBvcHRpb25zKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIHNvcnRlZCwgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiBgb3B0aW9uc2BcbiAgICAgICAgLy8gZm9yIHVzZSBhcyBwYXJ0IG9mIHRoZSBjYWNoZSBrZXlcbiAgICAgICAgdmFyIG9wdGlvbnNTdHJpbmcgPSBtYXAoXG4gICAgICAgICAgICBrZXlzKG9wdGlvbnMpLnNvcnQoKSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXkgKyAnOicgKyBvcHRpb25zW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICkuam9pbignLCcpO1xuXG4gICAgICAgIC8vIFNldCBvdXIgY2FjaGUga2V5XG4gICAgICAgIHZhciBjYWNoZUtleSA9IGxvY2FsZSArICcrJyArIG9wdGlvbnNTdHJpbmc7XG5cbiAgICAgICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSB0aGlzIGNvbmZpZ3VyYXRpb24gY2FjaGVkLCBjb25maWd1cmUgYW5kIGNhY2hlIGl0XG4gICAgICAgIGlmICghY2FjaGVkTnVtYmVyRm9ybWF0LmNhY2hlW2NhY2hlS2V5XSkge1xuICAgICAgICAgICAgY2FjaGVkTnVtYmVyRm9ybWF0LmNhY2hlW2NhY2hlS2V5XSA9IEludGwuTnVtYmVyRm9ybWF0KGxvY2FsZSwgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gdGhlIGNhY2hlZCB2ZXJzaW9uIG9mIHRoaXMgY29uZmlndXJhdGlvblxuICAgICAgICByZXR1cm4gY2FjaGVkTnVtYmVyRm9ybWF0LmNhY2hlW2NhY2hlS2V5XTtcbiAgICB9XG4gICAgY2FjaGVkTnVtYmVyRm9ybWF0LmNhY2hlID0ge307XG5cbiAgICAvLyBmb3JtYXROdW1iZXJcbiAgICAvLyBGb3JtYXRzIGFueSBudW1iZXIgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHplcm8gdXNpbmcgdGhlc2Ugb3B0aW9uczpcbiAgICAvLyAtIHVzZXJMb2NhbGVcbiAgICAvLyAtIHVzZVRvTG9jYWxlU3RyaW5nXG4gICAgLy8gLSB1c2VHcm91cGluZ1xuICAgIC8vIC0gZ3JvdXBpbmdcbiAgICAvLyAtIG1heGltdW1TaWduaWZpY2FudERpZ2l0c1xuICAgIC8vIC0gbWluaW11bUludGVnZXJEaWdpdHNcbiAgICAvLyAtIGZyYWN0aW9uRGlnaXRzXG4gICAgLy8gLSBncm91cGluZ1NlcGFyYXRvclxuICAgIC8vIC0gZGVjaW1hbFNlcGFyYXRvclxuICAgIC8vXG4gICAgLy8gYHVzZVRvTG9jYWxlU3RyaW5nYCB3aWxsIHVzZSBgSW50bC5OdW1iZXJGb3JtYXRgIG9yIGB0b0xvY2FsZVN0cmluZ2AgZm9yIGZvcm1hdHRpbmcuXG4gICAgLy8gYHVzZXJMb2NhbGVgIG9wdGlvbiBpcyBwYXNzZWQgdGhyb3VnaCB0byB0aGUgZm9ybWF0dGluZyBmdW5jdGlvbi5cbiAgICAvLyBgZnJhY3Rpb25EaWdpdHNgIGlzIHBhc3NlZCB0aHJvdWdoIHRvIGBtYXhpbXVtRnJhY3Rpb25EaWdpdHNgIGFuZCBgbWluaW11bUZyYWN0aW9uRGlnaXRzYFxuICAgIC8vIFVzaW5nIGBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHNgIHdpbGwgb3ZlcnJpZGUgYG1pbmltdW1JbnRlZ2VyRGlnaXRzYCBhbmQgYGZyYWN0aW9uRGlnaXRzYC5cbiAgICBmdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtYmVyLCBvcHRpb25zLCB1c2VyTG9jYWxlKSB7XG4gICAgICAgIHZhciB1c2VUb0xvY2FsZVN0cmluZyA9IG9wdGlvbnMudXNlVG9Mb2NhbGVTdHJpbmc7XG4gICAgICAgIHZhciB1c2VHcm91cGluZyA9IG9wdGlvbnMudXNlR3JvdXBpbmc7XG4gICAgICAgIHZhciBncm91cGluZyA9IHVzZUdyb3VwaW5nICYmIG9wdGlvbnMuZ3JvdXBpbmcuc2xpY2UoKTtcbiAgICAgICAgdmFyIG1heGltdW1TaWduaWZpY2FudERpZ2l0cyA9IG9wdGlvbnMubWF4aW11bVNpZ25pZmljYW50RGlnaXRzO1xuICAgICAgICB2YXIgbWluaW11bUludGVnZXJEaWdpdHMgPSBvcHRpb25zLm1pbmltdW1JbnRlZ2VyRGlnaXRzIHx8IDE7XG4gICAgICAgIHZhciBmcmFjdGlvbkRpZ2l0cyA9IG9wdGlvbnMuZnJhY3Rpb25EaWdpdHMgfHwgMDtcbiAgICAgICAgdmFyIGdyb3VwaW5nU2VwYXJhdG9yID0gb3B0aW9ucy5ncm91cGluZ1NlcGFyYXRvcjtcbiAgICAgICAgdmFyIGRlY2ltYWxTZXBhcmF0b3IgPSBvcHRpb25zLmRlY2ltYWxTZXBhcmF0b3I7XG5cbiAgICAgICAgaWYgKHVzZVRvTG9jYWxlU3RyaW5nICYmIHVzZXJMb2NhbGUpIHtcbiAgICAgICAgICAgIHZhciBsb2NhbGVTdHJpbmdPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzOiBtaW5pbXVtSW50ZWdlckRpZ2l0cyxcbiAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdXNlR3JvdXBpbmdcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChmcmFjdGlvbkRpZ2l0cykge1xuICAgICAgICAgICAgICAgIGxvY2FsZVN0cmluZ09wdGlvbnMubWF4aW11bUZyYWN0aW9uRGlnaXRzID0gZnJhY3Rpb25EaWdpdHM7XG4gICAgICAgICAgICAgICAgbG9jYWxlU3RyaW5nT3B0aW9ucy5taW5pbXVtRnJhY3Rpb25EaWdpdHMgPSBmcmFjdGlvbkRpZ2l0cztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdG9Mb2NhbGVTdHJpbmcgb3V0cHV0IGlzIFwiMC4wXCIgaW5zdGVhZCBvZiBcIjBcIiBmb3IgSFRDIGJyb3dzZXJzXG4gICAgICAgICAgICAvLyB3aGVuIG1heGltdW1TaWduaWZpY2FudERpZ2l0cyBpcyBzZXQuIFNlZSAjOTYuXG4gICAgICAgICAgICBpZiAobWF4aW11bVNpZ25pZmljYW50RGlnaXRzICYmIG51bWJlciA+IDApIHtcbiAgICAgICAgICAgICAgICBsb2NhbGVTdHJpbmdPcHRpb25zLm1heGltdW1TaWduaWZpY2FudERpZ2l0cyA9IG1heGltdW1TaWduaWZpY2FudERpZ2l0cztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGludGxOdW1iZXJGb3JtYXRXb3Jrcykge1xuICAgICAgICAgICAgICAgIGlmICghaW50bE51bWJlckZvcm1hdFJvdW5kaW5nV29ya3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdW5kaW5nT3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kaW5nT3B0aW9ucy51c2VHcm91cGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByb3VuZGluZ09wdGlvbnMuZGVjaW1hbFNlcGFyYXRvciA9IFwiLlwiO1xuICAgICAgICAgICAgICAgICAgICBudW1iZXIgPSBwYXJzZUZsb2F0KGZvcm1hdE51bWJlcihudW1iZXIsIHJvdW5kaW5nT3B0aW9ucyksIDEwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVkTnVtYmVyRm9ybWF0KHVzZXJMb2NhbGUsIGxvY2FsZVN0cmluZ09wdGlvbnMpLmZvcm1hdChudW1iZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRvTG9jYWxlU3RyaW5nUm91bmRpbmdXb3Jrcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm91bmRpbmdPcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgcm91bmRpbmdPcHRpb25zLnVzZUdyb3VwaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kaW5nT3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yID0gXCIuXCI7XG4gICAgICAgICAgICAgICAgICAgIG51bWJlciA9IHBhcnNlRmxvYXQoZm9ybWF0TnVtYmVyKG51bWJlciwgcm91bmRpbmdPcHRpb25zKSwgMTApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBudW1iZXIudG9Mb2NhbGVTdHJpbmcodXNlckxvY2FsZSwgbG9jYWxlU3RyaW5nT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbnVtYmVyU3RyaW5nO1xuXG4gICAgICAgIC8vIEFkZCAxIHRvIGRpZ2l0IG91dHB1dCBsZW5ndGggZm9yIGZsb2F0aW5nIHBvaW50IGVycm9ycyB3b3JrYXJvdW5kLiBTZWUgYmVsb3cuXG4gICAgICAgIGlmIChtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMpIHtcbiAgICAgICAgICAgIG51bWJlclN0cmluZyA9IG51bWJlci50b1ByZWNpc2lvbihtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgKyAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG51bWJlclN0cmluZyA9IG51bWJlci50b0ZpeGVkKGZyYWN0aW9uRGlnaXRzICsgMSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW50ZWdlclN0cmluZztcbiAgICAgICAgdmFyIGZyYWN0aW9uU3RyaW5nO1xuICAgICAgICB2YXIgZXhwb25lbnRTdHJpbmc7XG5cbiAgICAgICAgdmFyIHRlbXAgPSBudW1iZXJTdHJpbmcuc3BsaXQoXCJlXCIpO1xuXG4gICAgICAgIGV4cG9uZW50U3RyaW5nID0gdGVtcFsxXSB8fCBcIlwiO1xuXG4gICAgICAgIHRlbXAgPSB0ZW1wWzBdLnNwbGl0KFwiLlwiKTtcblxuICAgICAgICBmcmFjdGlvblN0cmluZyA9IHRlbXBbMV0gfHwgXCJcIjtcbiAgICAgICAgaW50ZWdlclN0cmluZyA9IHRlbXBbMF0gfHwgXCJcIjtcblxuICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciBmbG9hdGluZyBwb2ludCBlcnJvcnMgaW4gYHRvRml4ZWRgIGFuZCBgdG9QcmVjaXNpb25gLlxuICAgICAgICAvLyAoMy41NSkudG9GaXhlZCgxKTsgLS0+IFwiMy41XCJcbiAgICAgICAgLy8gKDEyMy41NSAtIDEyMCkudG9QcmVjaXNpb24oMik7IC0tPiBcIjMuNVwiXG4gICAgICAgIC8vICgxMjMuNTUgLSAxMjApOyAtLT4gMy41NDk5OTk5OTk5OTk5OTdcbiAgICAgICAgLy8gKDEyMy41NSAtIDEyMCkudG9GaXhlZCgyKTsgLS0+IFwiMy41NVwiXG4gICAgICAgIC8vIFJvdW5kIGJ5IGV4YW1pbmcgdGhlIHN0cmluZyBvdXRwdXQgb2YgdGhlIG5leHQgZGlnaXQuXG5cbiAgICAgICAgLy8gKioqKioqKioqKioqKioqIEltcGxlbWVudCBTdHJpbmcgUm91bmRpbmcgaGVyZSAqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAvLyBDaGVjayBpbnRlZ2VyU3RyaW5nICsgZnJhY3Rpb25TdHJpbmcgbGVuZ3RoIG9mIHRvUHJlY2lzaW9uIGJlZm9yZSByb3VuZGluZy5cbiAgICAgICAgLy8gQ2hlY2sgbGVuZ3RoIG9mIGZyYWN0aW9uU3RyaW5nIGZyb20gdG9GaXhlZCBvdXRwdXQgYmVmb3JlIHJvdW5kaW5nLlxuICAgICAgICB2YXIgaW50ZWdlckxlbmd0aCA9IGludGVnZXJTdHJpbmcubGVuZ3RoO1xuICAgICAgICB2YXIgZnJhY3Rpb25MZW5ndGggPSBmcmFjdGlvblN0cmluZy5sZW5ndGg7XG4gICAgICAgIHZhciBkaWdpdENvdW50ID0gaW50ZWdlckxlbmd0aCArIGZyYWN0aW9uTGVuZ3RoO1xuICAgICAgICB2YXIgZGlnaXRzID0gaW50ZWdlclN0cmluZyArIGZyYWN0aW9uU3RyaW5nO1xuXG4gICAgICAgIGlmIChtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgJiYgZGlnaXRDb3VudCA9PT0gKG1heGltdW1TaWduaWZpY2FudERpZ2l0cyArIDEpIHx8ICFtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgJiYgZnJhY3Rpb25MZW5ndGggPT09IChmcmFjdGlvbkRpZ2l0cyArIDEpKSB7XG4gICAgICAgICAgICAvLyBSb3VuZCBkaWdpdHMuXG4gICAgICAgICAgICBkaWdpdHMgPSBzdHJpbmdSb3VuZChkaWdpdHMpO1xuXG4gICAgICAgICAgICBpZiAoZGlnaXRzLmxlbmd0aCA9PT0gZGlnaXRDb3VudCArIDEpIHtcbiAgICAgICAgICAgICAgICBpbnRlZ2VyTGVuZ3RoID0gaW50ZWdlckxlbmd0aCArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERpc2NhcmQgZmluYWwgZnJhY3Rpb25EaWdpdC5cbiAgICAgICAgICAgIGlmIChmcmFjdGlvbkxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRpZ2l0cyA9IGRpZ2l0cy5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNlcGFyYXRlIGludGVnZXIgYW5kIGZyYWN0aW9uLlxuICAgICAgICAgICAgaW50ZWdlclN0cmluZyA9IGRpZ2l0cy5zbGljZSgwLCBpbnRlZ2VyTGVuZ3RoKTtcbiAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gZGlnaXRzLnNsaWNlKGludGVnZXJMZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVHJpbSB0cmFpbGluZyB6ZXJvZXMgZnJvbSBmcmFjdGlvblN0cmluZyBiZWNhdXNlIHRvUHJlY2lzaW9uIG91dHB1dHNcbiAgICAgICAgLy8gcHJlY2lzaW9uLCBub3Qgc2lnbmlmaWNhbnQgZGlnaXRzLlxuICAgICAgICBpZiAobWF4aW11bVNpZ25pZmljYW50RGlnaXRzKSB7XG4gICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IGZyYWN0aW9uU3RyaW5nLnJlcGxhY2UoLzAqJC8sIFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIGV4cG9uZW50LlxuICAgICAgICB2YXIgZXhwb25lbnQgPSBwYXJzZUludChleHBvbmVudFN0cmluZywgMTApO1xuXG4gICAgICAgIGlmIChleHBvbmVudCA+IDApIHtcbiAgICAgICAgICAgIGlmIChmcmFjdGlvblN0cmluZy5sZW5ndGggPD0gZXhwb25lbnQpIHtcbiAgICAgICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IGZyYWN0aW9uU3RyaW5nICsgcmVwZWF0WmVybyhleHBvbmVudCAtIGZyYWN0aW9uU3RyaW5nLmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICBpbnRlZ2VyU3RyaW5nID0gaW50ZWdlclN0cmluZyArIGZyYWN0aW9uU3RyaW5nO1xuICAgICAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW50ZWdlclN0cmluZyA9IGludGVnZXJTdHJpbmcgKyBmcmFjdGlvblN0cmluZy5zbGljZSgwLCBleHBvbmVudCk7XG4gICAgICAgICAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSBmcmFjdGlvblN0cmluZy5zbGljZShleHBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXhwb25lbnQgPCAwKSB7XG4gICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IChyZXBlYXRaZXJvKE1hdGguYWJzKGV4cG9uZW50KSAtIGludGVnZXJTdHJpbmcubGVuZ3RoKSArIGludGVnZXJTdHJpbmcgKyBmcmFjdGlvblN0cmluZyk7XG5cbiAgICAgICAgICAgIGludGVnZXJTdHJpbmcgPSBcIjBcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbWF4aW11bVNpZ25pZmljYW50RGlnaXRzKSB7XG4gICAgICAgICAgICAvLyBUcmltIG9yIHBhZCBmcmFjdGlvbiB3aGVuIG5vdCB1c2luZyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMuXG4gICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IGZyYWN0aW9uU3RyaW5nLnNsaWNlKDAsIGZyYWN0aW9uRGlnaXRzKTtcblxuICAgICAgICAgICAgaWYgKGZyYWN0aW9uU3RyaW5nLmxlbmd0aCA8IGZyYWN0aW9uRGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSBmcmFjdGlvblN0cmluZyArIHJlcGVhdFplcm8oZnJhY3Rpb25EaWdpdHMgLSBmcmFjdGlvblN0cmluZy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBQYWQgaW50ZWdlciB3aGVuIHVzaW5nIG1pbmltdW1JbnRlZ2VyRGlnaXRzXG4gICAgICAgICAgICAvLyBhbmQgbm90IHVzaW5nIG1heGltdW1TaWduaWZpY2FudERpZ2l0cy5cbiAgICAgICAgICAgIGlmIChpbnRlZ2VyU3RyaW5nLmxlbmd0aCA8IG1pbmltdW1JbnRlZ2VyRGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgaW50ZWdlclN0cmluZyA9IHJlcGVhdFplcm8obWluaW11bUludGVnZXJEaWdpdHMgLSBpbnRlZ2VyU3RyaW5nLmxlbmd0aCkgKyBpbnRlZ2VyU3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZvcm1hdHRlZFN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgLy8gSGFuZGxlIGdyb3VwaW5nLlxuICAgICAgICBpZiAodXNlR3JvdXBpbmcpIHtcbiAgICAgICAgICAgIHRlbXAgPSBpbnRlZ2VyU3RyaW5nO1xuICAgICAgICAgICAgdmFyIGdyb3VwO1xuXG4gICAgICAgICAgICB3aGlsZSAodGVtcC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gZ3JvdXBpbmcuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0dGVkU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IGdyb3VwaW5nU2VwYXJhdG9yICsgZm9ybWF0dGVkU3RyaW5nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRlbXAuc2xpY2UoLWdyb3VwKSArIGZvcm1hdHRlZFN0cmluZztcblxuICAgICAgICAgICAgICAgIHRlbXAgPSB0ZW1wLnNsaWNlKDAsIC1ncm91cCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3JtYXR0ZWRTdHJpbmcgPSBpbnRlZ2VyU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGRlY2ltYWxTZXBhcmF0b3IgYW5kIGZyYWN0aW9uLlxuICAgICAgICBpZiAoZnJhY3Rpb25TdHJpbmcpIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IGZvcm1hdHRlZFN0cmluZyArIGRlY2ltYWxTZXBhcmF0b3IgKyBmcmFjdGlvblN0cmluZztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRTdHJpbmc7XG4gICAgfVxuXG4gICAgLy8gZHVyYXRpb25MYWJlbENvbXBhcmVcbiAgICBmdW5jdGlvbiBkdXJhdGlvbkxhYmVsQ29tcGFyZShhLCBiKSB7XG4gICAgICAgIGlmIChhLmxhYmVsLmxlbmd0aCA+IGIubGFiZWwubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYS5sYWJlbC5sZW5ndGggPCBiLmxhYmVsLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhIG11c3QgYmUgZXF1YWwgdG8gYlxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvLyBkdXJhdGlvbkdldExhYmVsc1xuICAgIGZ1bmN0aW9uIGR1cmF0aW9uR2V0TGFiZWxzKHRva2VuLCBsb2NhbGVEYXRhKSB7XG4gICAgICAgIHZhciBsYWJlbHMgPSBbXTtcblxuICAgICAgICBlYWNoKGtleXMobG9jYWxlRGF0YSksIGZ1bmN0aW9uIChsb2NhbGVEYXRhS2V5KSB7XG4gICAgICAgICAgICBpZiAobG9jYWxlRGF0YUtleS5zbGljZSgwLCAxNSkgIT09IFwiX2R1cmF0aW9uTGFiZWxzXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBsYWJlbFR5cGUgPSBsb2NhbGVEYXRhS2V5LnNsaWNlKDE1KS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBlYWNoKGtleXMobG9jYWxlRGF0YVtsb2NhbGVEYXRhS2V5XSksIGZ1bmN0aW9uIChsYWJlbEtleSkge1xuICAgICAgICAgICAgICAgIGlmIChsYWJlbEtleS5zbGljZSgwLCAxKSA9PT0gdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbGFiZWxUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBsYWJlbEtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBsb2NhbGVEYXRhW2xvY2FsZURhdGFLZXldW2xhYmVsS2V5XVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGxhYmVscztcbiAgICB9XG5cbiAgICAvLyBkdXJhdGlvblBsdXJhbEtleVxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uUGx1cmFsS2V5KHRva2VuLCBpbnRlZ2VyVmFsdWUsIGRlY2ltYWxWYWx1ZSkge1xuICAgICAgICAvLyBTaW5ndWxhciBmb3IgYSB2YWx1ZSBvZiBgMWAsIGJ1dCBub3QgZm9yIGAxLjBgLlxuICAgICAgICBpZiAoaW50ZWdlclZhbHVlID09PSAxICYmIGRlY2ltYWxWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRva2VuICsgdG9rZW47XG4gICAgfVxuXG4gICAgdmFyIGVuZ0xvY2FsZSA9IHtcbiAgICAgICAgZHVyYXRpb25MYWJlbHNTdGFuZGFyZDoge1xuICAgICAgICAgICAgUzogJ21pbGxpc2Vjb25kJyxcbiAgICAgICAgICAgIFNTOiAnbWlsbGlzZWNvbmRzJyxcbiAgICAgICAgICAgIHM6ICdzZWNvbmQnLFxuICAgICAgICAgICAgc3M6ICdzZWNvbmRzJyxcbiAgICAgICAgICAgIG06ICdtaW51dGUnLFxuICAgICAgICAgICAgbW06ICdtaW51dGVzJyxcbiAgICAgICAgICAgIGg6ICdob3VyJyxcbiAgICAgICAgICAgIGhoOiAnaG91cnMnLFxuICAgICAgICAgICAgZDogJ2RheScsXG4gICAgICAgICAgICBkZDogJ2RheXMnLFxuICAgICAgICAgICAgdzogJ3dlZWsnLFxuICAgICAgICAgICAgd3c6ICd3ZWVrcycsXG4gICAgICAgICAgICBNOiAnbW9udGgnLFxuICAgICAgICAgICAgTU06ICdtb250aHMnLFxuICAgICAgICAgICAgeTogJ3llYXInLFxuICAgICAgICAgICAgeXk6ICd5ZWFycydcbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb25MYWJlbHNTaG9ydDoge1xuICAgICAgICAgICAgUzogJ21zZWMnLFxuICAgICAgICAgICAgU1M6ICdtc2VjcycsXG4gICAgICAgICAgICBzOiAnc2VjJyxcbiAgICAgICAgICAgIHNzOiAnc2VjcycsXG4gICAgICAgICAgICBtOiAnbWluJyxcbiAgICAgICAgICAgIG1tOiAnbWlucycsXG4gICAgICAgICAgICBoOiAnaHInLFxuICAgICAgICAgICAgaGg6ICdocnMnLFxuICAgICAgICAgICAgZDogJ2R5JyxcbiAgICAgICAgICAgIGRkOiAnZHlzJyxcbiAgICAgICAgICAgIHc6ICd3aycsXG4gICAgICAgICAgICB3dzogJ3drcycsXG4gICAgICAgICAgICBNOiAnbW8nLFxuICAgICAgICAgICAgTU06ICdtb3MnLFxuICAgICAgICAgICAgeTogJ3lyJyxcbiAgICAgICAgICAgIHl5OiAneXJzJ1xuICAgICAgICB9LFxuICAgICAgICBkdXJhdGlvblRpbWVUZW1wbGF0ZXM6IHtcbiAgICAgICAgICAgIEhNUzogJ2g6bW06c3MnLFxuICAgICAgICAgICAgSE06ICdoOm1tJyxcbiAgICAgICAgICAgIE1TOiAnbTpzcydcbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb25MYWJlbFR5cGVzOiBbXG4gICAgICAgICAgICB7IHR5cGU6IFwic3RhbmRhcmRcIiwgc3RyaW5nOiBcIl9fXCIgfSxcbiAgICAgICAgICAgIHsgdHlwZTogXCJzaG9ydFwiLCBzdHJpbmc6IFwiX1wiIH1cbiAgICAgICAgXSxcbiAgICAgICAgZHVyYXRpb25QbHVyYWxLZXk6IGR1cmF0aW9uUGx1cmFsS2V5XG4gICAgfTtcblxuICAgIC8vIGlzQXJyYXlcbiAgICBmdW5jdGlvbiBpc0FycmF5KGFycmF5KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyYXkpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG4gICAgfVxuXG4gICAgLy8gaXNPYmplY3RcbiAgICBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xuICAgIH1cblxuICAgIC8vIGZpbmRMYXN0XG4gICAgZnVuY3Rpb24gZmluZExhc3QoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGFycmF5Lmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoaW5kZXggLT0gMSkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGFycmF5W2luZGV4XSkpIHsgcmV0dXJuIGFycmF5W2luZGV4XTsgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmluZFxuICAgIGZ1bmN0aW9uIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG5cbiAgICAgICAgdmFyIG1heCA9IGFycmF5ICYmIGFycmF5Lmxlbmd0aCB8fCAwO1xuXG4gICAgICAgIHZhciBtYXRjaDtcblxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIG1hdGNoID0gY2FsbGJhY2s7XG4gICAgICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPT09IG1hdGNoO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChpbmRleCA8IG1heCkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGFycmF5W2luZGV4XSkpIHsgcmV0dXJuIGFycmF5W2luZGV4XTsgfVxuICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGVhY2hcbiAgICBmdW5jdGlvbiBlYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgICAgbWF4ID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgICAgIGlmICghYXJyYXkgfHwgIW1heCkgeyByZXR1cm47IH1cblxuICAgICAgICB3aGlsZSAoaW5kZXggPCBtYXgpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhhcnJheVtpbmRleF0sIGluZGV4KSA9PT0gZmFsc2UpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gbWFwXG4gICAgZnVuY3Rpb24gbWFwKGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgICAgbWF4ID0gYXJyYXkubGVuZ3RoLFxuICAgICAgICAgICAgcmV0ID0gW107XG5cbiAgICAgICAgaWYgKCFhcnJheSB8fCAhbWF4KSB7IHJldHVybiByZXQ7IH1cblxuICAgICAgICB3aGlsZSAoaW5kZXggPCBtYXgpIHtcbiAgICAgICAgICAgIHJldFtpbmRleF0gPSBjYWxsYmFjayhhcnJheVtpbmRleF0sIGluZGV4KTtcbiAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8vIHBsdWNrXG4gICAgZnVuY3Rpb24gcGx1Y2soYXJyYXksIHByb3ApIHtcbiAgICAgICAgcmV0dXJuIG1hcChhcnJheSwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtW3Byb3BdO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBjb21wYWN0XG4gICAgZnVuY3Rpb24gY29tcGFjdChhcnJheSkge1xuICAgICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgICAgZWFjaChhcnJheSwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChpdGVtKSB7IHJldC5wdXNoKGl0ZW0pOyB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gdW5pcXVlXG4gICAgZnVuY3Rpb24gdW5pcXVlKGFycmF5KSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICBlYWNoKGFycmF5LCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIGlmICghZmluZChyZXQsIF9hKSkgeyByZXQucHVzaChfYSk7IH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvLyBpbnRlcnNlY3Rpb25cbiAgICBmdW5jdGlvbiBpbnRlcnNlY3Rpb24oYSwgYikge1xuICAgICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgICAgZWFjaChhLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIGVhY2goYiwgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9hID09PSBfYikgeyByZXQucHVzaChfYSk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdW5pcXVlKHJldCk7XG4gICAgfVxuXG4gICAgLy8gcmVzdFxuICAgIGZ1bmN0aW9uIHJlc3QoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICBlYWNoKGFycmF5LCBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghY2FsbGJhY2soaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXQgPSBhcnJheS5zbGljZShpbmRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8vIGluaXRpYWxcbiAgICBmdW5jdGlvbiBpbml0aWFsKGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgcmV2ZXJzZWQgPSBhcnJheS5zbGljZSgpLnJldmVyc2UoKTtcblxuICAgICAgICByZXR1cm4gcmVzdChyZXZlcnNlZCwgY2FsbGJhY2spLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICAvLyBleHRlbmRcbiAgICBmdW5jdGlvbiBleHRlbmQoYSwgYikge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgICAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSkgeyBhW2tleV0gPSBiW2tleV07IH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIC8vIGtleXNcbiAgICBmdW5jdGlvbiBrZXlzKGEpIHtcbiAgICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBhKSB7XG4gICAgICAgICAgICBpZiAoYS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7IHJldC5wdXNoKGtleSk7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gYW55XG4gICAgZnVuY3Rpb24gYW55KGFycmF5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgICAgbWF4ID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgICAgIGlmICghYXJyYXkgfHwgIW1heCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICB3aGlsZSAoaW5kZXggPCBtYXgpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhhcnJheVtpbmRleF0sIGluZGV4KSA9PT0gdHJ1ZSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBmbGF0dGVuXG4gICAgZnVuY3Rpb24gZmxhdHRlbihhcnJheSkge1xuICAgICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgICAgZWFjaChhcnJheSwgZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgICAgIHJldCA9IHJldC5jb25jYXQoY2hpbGQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvTG9jYWxlU3RyaW5nU3VwcG9ydHNMb2NhbGVzKCkge1xuICAgICAgICB2YXIgbnVtYmVyID0gMDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG51bWJlci50b0xvY2FsZVN0cmluZygnaScpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5uYW1lID09PSAnUmFuZ2VFcnJvcic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZlYXR1cmVUZXN0Rm9ybWF0dGVyUm91bmRpbmcoZm9ybWF0dGVyKSB7XG4gICAgICAgIHJldHVybiBmb3JtYXR0ZXIoMy41NSwgXCJlblwiLCB7XG4gICAgICAgICAgICB1c2VHcm91cGluZzogZmFsc2UsXG4gICAgICAgICAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogMSxcbiAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMSxcbiAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMVxuICAgICAgICB9KSA9PT0gXCIzLjZcIjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmZWF0dXJlVGVzdEZvcm1hdHRlcihmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHBhc3NlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gVGVzdCBtaW5pbXVtSW50ZWdlckRpZ2l0cy5cbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcigxLCBcImVuXCIsIHsgbWluaW11bUludGVnZXJEaWdpdHM6IDEgfSkgPT09IFwiMVwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDEsIFwiZW5cIiwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMiB9KSA9PT0gXCIwMVwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDEsIFwiZW5cIiwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMyB9KSA9PT0gXCIwMDFcIjtcbiAgICAgICAgaWYgKCFwYXNzZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgLy8gVGVzdCBtYXhpbXVtRnJhY3Rpb25EaWdpdHMgYW5kIG1pbmltdW1GcmFjdGlvbkRpZ2l0cy5cbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMCwgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwIH0pID09PSBcIjEwMFwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDk5Ljk5LCBcImVuXCIsIHsgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAxLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDEgfSkgPT09IFwiMTAwLjBcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMiwgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyIH0pID09PSBcIjk5Ljk5XCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDMsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMyB9KSA9PT0gXCI5OS45OTBcIjtcbiAgICAgICAgaWYgKCFwYXNzZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAgICAgLy8gVGVzdCBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMuXG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDEgfSkgPT09IFwiMTAwXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDIgfSkgPT09IFwiMTAwXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDMgfSkgPT09IFwiMTAwXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDQgfSkgPT09IFwiOTkuOTlcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogNSB9KSA9PT0gXCI5OS45OVwiO1xuICAgICAgICBpZiAoIXBhc3NlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICAvLyBUZXN0IGdyb3VwaW5nLlxuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDEwMDAsIFwiZW5cIiwgeyB1c2VHcm91cGluZzogdHJ1ZSB9KSA9PT0gXCIxLDAwMFwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDEwMDAsIFwiZW5cIiwgeyB1c2VHcm91cGluZzogZmFsc2UgfSkgPT09IFwiMTAwMFwiO1xuICAgICAgICBpZiAoIXBhc3NlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBkdXJhdGlvbnNGb3JtYXQoZHVyYXRpb25zIFssIHRlbXBsYXRlXSBbLCBwcmVjaXNpb25dIFssIHNldHRpbmdzXSlcbiAgICBmdW5jdGlvbiBkdXJhdGlvbnNGb3JtYXQoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSB7fTtcbiAgICAgICAgdmFyIGR1cmF0aW9ucztcblxuICAgICAgICAvLyBQYXJzZSBhcmd1bWVudHMuXG4gICAgICAgIGVhY2goYXJncywgZnVuY3Rpb24gKGFyZywgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQXJyYXkoYXJnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIkV4cGVjdGVkIGFycmF5IGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byBkdXJhdGlvbnNGb3JtYXQuXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZHVyYXRpb25zID0gYXJnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgYXJnID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy50ZW1wbGF0ZSA9IGFyZztcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MucHJlY2lzaW9uID0gYXJnO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGFyZykpIHtcbiAgICAgICAgICAgICAgICBleHRlbmQoc2V0dGluZ3MsIGFyZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghZHVyYXRpb25zIHx8ICFkdXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBzZXR0aW5ncy5yZXR1cm5Nb21lbnRUeXBlcyA9IHRydWU7XG5cbiAgICAgICAgdmFyIGZvcm1hdHRlZER1cmF0aW9ucyA9IG1hcChkdXJhdGlvbnMsIGZ1bmN0aW9uIChkdXIpIHtcbiAgICAgICAgICAgIHJldHVybiBkdXIuZm9ybWF0KHNldHRpbmdzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTWVyZ2UgdG9rZW4gdHlwZXMgZnJvbSBhbGwgZHVyYXRpb25zLlxuICAgICAgICB2YXIgb3V0cHV0VHlwZXMgPSBpbnRlcnNlY3Rpb24odHlwZXMsIHVuaXF1ZShwbHVjayhmbGF0dGVuKGZvcm1hdHRlZER1cmF0aW9ucyksIFwidHlwZVwiKSkpO1xuXG4gICAgICAgIHZhciBsYXJnZXN0ID0gc2V0dGluZ3MubGFyZ2VzdDtcblxuICAgICAgICBpZiAobGFyZ2VzdCkge1xuICAgICAgICAgICAgb3V0cHV0VHlwZXMgPSBvdXRwdXRUeXBlcy5zbGljZSgwLCBsYXJnZXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldHRpbmdzLnJldHVybk1vbWVudFR5cGVzID0gZmFsc2U7XG4gICAgICAgIHNldHRpbmdzLm91dHB1dFR5cGVzID0gb3V0cHV0VHlwZXM7XG5cbiAgICAgICAgcmV0dXJuIG1hcChkdXJhdGlvbnMsIGZ1bmN0aW9uIChkdXIpIHtcbiAgICAgICAgICAgIHJldHVybiBkdXIuZm9ybWF0KHNldHRpbmdzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZHVyYXRpb25Gb3JtYXQoW3RlbXBsYXRlXSBbLCBwcmVjaXNpb25dIFssIHNldHRpbmdzXSlcbiAgICBmdW5jdGlvbiBkdXJhdGlvbkZvcm1hdCgpIHtcblxuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgdmFyIHNldHRpbmdzID0gZXh0ZW5kKHt9LCB0aGlzLmZvcm1hdC5kZWZhdWx0cyk7XG5cbiAgICAgICAgLy8gS2VlcCBhIHNoYWRvdyBjb3B5IG9mIHRoaXMgbW9tZW50IGZvciBjYWxjdWxhdGluZyByZW1haW5kZXJzLlxuICAgICAgICAvLyBQZXJmb3JtIGFsbCBjYWxjdWxhdGlvbnMgb24gcG9zaXRpdmUgZHVyYXRpb24gdmFsdWUsIGhhbmRsZSBuZWdhdGl2ZVxuICAgICAgICAvLyBzaWduIGF0IHRoZSB2ZXJ5IGVuZC5cbiAgICAgICAgdmFyIGFzTWlsbGlzZWNvbmRzID0gdGhpcy5hc01pbGxpc2Vjb25kcygpO1xuICAgICAgICB2YXIgYXNNb250aHMgPSB0aGlzLmFzTW9udGhzKCk7XG5cbiAgICAgICAgLy8gVHJlYXQgaW52YWxpZCBkdXJhdGlvbnMgYXMgaGF2aW5nIGEgdmFsdWUgb2YgMCBtaWxsaXNlY29uZHMuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5pc1ZhbGlkID09PSBcImZ1bmN0aW9uXCIgJiYgdGhpcy5pc1ZhbGlkKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBhc01pbGxpc2Vjb25kcyA9IDA7XG4gICAgICAgICAgICBhc01vbnRocyA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXNOZWdhdGl2ZSA9IGFzTWlsbGlzZWNvbmRzIDwgMDtcblxuICAgICAgICAvLyBUd28gc2hhZG93IGNvcGllcyBhcmUgbmVlZGVkIGJlY2F1c2Ugb2YgdGhlIHdheSBtb21lbnQuanMgaGFuZGxlc1xuICAgICAgICAvLyBkdXJhdGlvbiBhcml0aG1ldGljIGZvciB5ZWFycy9tb250aHMgYW5kIGZvciB3ZWVrcy9kYXlzL2hvdXJzL21pbnV0ZXMvc2Vjb25kcy5cbiAgICAgICAgdmFyIHJlbWFpbmRlciA9IG1vbWVudC5kdXJhdGlvbihNYXRoLmFicyhhc01pbGxpc2Vjb25kcyksIFwibWlsbGlzZWNvbmRzXCIpO1xuICAgICAgICB2YXIgcmVtYWluZGVyTW9udGhzID0gbW9tZW50LmR1cmF0aW9uKE1hdGguYWJzKGFzTW9udGhzKSwgXCJtb250aHNcIik7XG5cbiAgICAgICAgLy8gUGFyc2UgYXJndW1lbnRzLlxuICAgICAgICBlYWNoKGFyZ3MsIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBhcmcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnRlbXBsYXRlID0gYXJnO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5wcmVjaXNpb24gPSBhcmc7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoYXJnKSkge1xuICAgICAgICAgICAgICAgIGV4dGVuZChzZXR0aW5ncywgYXJnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG1vbWVudFRva2VucyA9IHtcbiAgICAgICAgICAgIHllYXJzOiBcInlcIixcbiAgICAgICAgICAgIG1vbnRoczogXCJNXCIsXG4gICAgICAgICAgICB3ZWVrczogXCJ3XCIsXG4gICAgICAgICAgICBkYXlzOiBcImRcIixcbiAgICAgICAgICAgIGhvdXJzOiBcImhcIixcbiAgICAgICAgICAgIG1pbnV0ZXM6IFwibVwiLFxuICAgICAgICAgICAgc2Vjb25kczogXCJzXCIsXG4gICAgICAgICAgICBtaWxsaXNlY29uZHM6IFwiU1wiXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRva2VuRGVmcyA9IHtcbiAgICAgICAgICAgIGVzY2FwZTogL1xcWyguKz8pXFxdLyxcbiAgICAgICAgICAgIHllYXJzOiAvXFwqP1tZeV0rLyxcbiAgICAgICAgICAgIG1vbnRoczogL1xcKj9NKy8sXG4gICAgICAgICAgICB3ZWVrczogL1xcKj9bV3ddKy8sXG4gICAgICAgICAgICBkYXlzOiAvXFwqP1tEZF0rLyxcbiAgICAgICAgICAgIGhvdXJzOiAvXFwqP1tIaF0rLyxcbiAgICAgICAgICAgIG1pbnV0ZXM6IC9cXCo/bSsvLFxuICAgICAgICAgICAgc2Vjb25kczogL1xcKj9zKy8sXG4gICAgICAgICAgICBtaWxsaXNlY29uZHM6IC9cXCo/UysvLFxuICAgICAgICAgICAgZ2VuZXJhbDogLy4rPy9cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUeXBlcyBhcnJheSBpcyBhdmFpbGFibGUgaW4gdGhlIHRlbXBsYXRlIGZ1bmN0aW9uLlxuICAgICAgICBzZXR0aW5ncy50eXBlcyA9IHR5cGVzO1xuXG4gICAgICAgIHZhciB0eXBlTWFwID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gZmluZCh0eXBlcywgZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5EZWZzW3R5cGVdLnRlc3QodG9rZW4pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRva2VuaXplciA9IG5ldyBSZWdFeHAobWFwKHR5cGVzLCBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuRGVmc1t0eXBlXS5zb3VyY2U7XG4gICAgICAgIH0pLmpvaW4oXCJ8XCIpLCBcImdcIik7XG5cbiAgICAgICAgLy8gQ3VycmVudCBkdXJhdGlvbiBvYmplY3QgaXMgYXZhaWxhYmxlIGluIHRoZSB0ZW1wbGF0ZSBmdW5jdGlvbi5cbiAgICAgICAgc2V0dGluZ3MuZHVyYXRpb24gPSB0aGlzO1xuXG4gICAgICAgIC8vIEV2YWwgdGVtcGxhdGUgZnVuY3Rpb24gYW5kIGNhY2hlIHRlbXBsYXRlIHN0cmluZy5cbiAgICAgICAgdmFyIHRlbXBsYXRlID0gdHlwZW9mIHNldHRpbmdzLnRlbXBsYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXR0aW5ncy50ZW1wbGF0ZS5hcHBseShzZXR0aW5ncykgOiBzZXR0aW5ncy50ZW1wbGF0ZTtcblxuICAgICAgICAvLyBvdXRwdXRUeXBlcyBhbmQgcmV0dXJuTW9tZW50VHlwZXMgYXJlIHNldHRpbmdzIHRvIHN1cHBvcnQgZHVyYXRpb25zRm9ybWF0KCkuXG5cbiAgICAgICAgLy8gb3V0cHV0VHlwZXMgaXMgYW4gYXJyYXkgb2YgbW9tZW50IHRva2VuIHR5cGVzIHRoYXQgZGV0ZXJtaW5lc1xuICAgICAgICAvLyB0aGUgdG9rZW5zIHJldHVybmVkIGluIGZvcm1hdHRlZCBvdXRwdXQuIFRoaXMgb3B0aW9uIG92ZXJyaWRlc1xuICAgICAgICAvLyB0cmltLCBsYXJnZXN0LCBzdG9wVHJpbSwgZXRjLlxuICAgICAgICB2YXIgb3V0cHV0VHlwZXMgPSBzZXR0aW5ncy5vdXRwdXRUeXBlcztcblxuICAgICAgICAvLyByZXR1cm5Nb21lbnRUeXBlcyBpcyBhIGJvb2xlYW4gdGhhdCBzZXRzIGR1cmF0aW9uRm9ybWF0IHRvIHJldHVyblxuICAgICAgICAvLyB0aGUgcHJvY2Vzc2VkIG1vbWVudFR5cGVzIGluc3RlYWQgb2YgZm9ybWF0dGVkIG91dHB1dC5cbiAgICAgICAgdmFyIHJldHVybk1vbWVudFR5cGVzID0gc2V0dGluZ3MucmV0dXJuTW9tZW50VHlwZXM7XG5cbiAgICAgICAgdmFyIGxhcmdlc3QgPSBzZXR0aW5ncy5sYXJnZXN0O1xuXG4gICAgICAgIC8vIFNldHVwIHN0b3BUcmltIGFycmF5IG9mIHRva2VuIHR5cGVzLlxuICAgICAgICB2YXIgc3RvcFRyaW0gPSBbXTtcblxuICAgICAgICBpZiAoIW91dHB1dFR5cGVzKSB7XG4gICAgICAgICAgICBpZiAoaXNBcnJheShzZXR0aW5ncy5zdG9wVHJpbSkpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5zdG9wVHJpbSA9IHNldHRpbmdzLnN0b3BUcmltLmpvaW4oXCJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFBhcnNlIHN0b3BUcmltIHN0cmluZyB0byBjcmVhdGUgdG9rZW4gdHlwZXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3Muc3RvcFRyaW0pIHtcbiAgICAgICAgICAgICAgICBlYWNoKHNldHRpbmdzLnN0b3BUcmltLm1hdGNoKHRva2VuaXplciksIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVNYXAodG9rZW4pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImVzY2FwZVwiIHx8IHR5cGUgPT09IFwiZ2VuZXJhbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzdG9wVHJpbS5wdXNoKHR5cGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FjaGUgbW9tZW50J3MgbG9jYWxlIGRhdGEuXG4gICAgICAgIHZhciBsb2NhbGVEYXRhID0gbW9tZW50LmxvY2FsZURhdGEoKTtcblxuICAgICAgICBpZiAoIWxvY2FsZURhdGEpIHtcbiAgICAgICAgICAgIGxvY2FsZURhdGEgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byB0aGlzIHBsdWdpbidzIGBlbmdgIGV4dGVuc2lvbi5cbiAgICAgICAgZWFjaChrZXlzKGVuZ0xvY2FsZSksIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW5nTG9jYWxlW2tleV0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGlmICghbG9jYWxlRGF0YVtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZURhdGFba2V5XSA9IGVuZ0xvY2FsZVtrZXldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFsb2NhbGVEYXRhW1wiX1wiICsga2V5XSkge1xuICAgICAgICAgICAgICAgIGxvY2FsZURhdGFbXCJfXCIgKyBrZXldID0gZW5nTG9jYWxlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlcGxhY2UgRHVyYXRpb24gVGltZSBUZW1wbGF0ZSBzdHJpbmdzLlxuICAgICAgICAvLyBGb3IgbG9jYWxlIGBlbmdgOiBgX0hNU19gLCBgX0hNX2AsIGFuZCBgX01TX2AuXG4gICAgICAgIGVhY2goa2V5cyhsb2NhbGVEYXRhLl9kdXJhdGlvblRpbWVUZW1wbGF0ZXMpLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKFwiX1wiICsgaXRlbSArIFwiX1wiLCBsb2NhbGVEYXRhLl9kdXJhdGlvblRpbWVUZW1wbGF0ZXNbaXRlbV0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBEZXRlcm1pbmUgdXNlcidzIGxvY2FsZS5cbiAgICAgICAgdmFyIHVzZXJMb2NhbGUgPSBzZXR0aW5ncy51c2VyTG9jYWxlIHx8IG1vbWVudC5sb2NhbGUoKTtcblxuICAgICAgICB2YXIgdXNlTGVmdFVuaXRzID0gc2V0dGluZ3MudXNlTGVmdFVuaXRzO1xuICAgICAgICB2YXIgdXNlUGx1cmFsID0gc2V0dGluZ3MudXNlUGx1cmFsO1xuICAgICAgICB2YXIgcHJlY2lzaW9uID0gc2V0dGluZ3MucHJlY2lzaW9uO1xuICAgICAgICB2YXIgZm9yY2VMZW5ndGggPSBzZXR0aW5ncy5mb3JjZUxlbmd0aDtcbiAgICAgICAgdmFyIHVzZUdyb3VwaW5nID0gc2V0dGluZ3MudXNlR3JvdXBpbmc7XG4gICAgICAgIHZhciB0cnVuYyA9IHNldHRpbmdzLnRydW5jO1xuXG4gICAgICAgIC8vIFVzZSBzaWduaWZpY2FudCBkaWdpdHMgb25seSB3aGVuIHByZWNpc2lvbiBpcyBncmVhdGVyIHRoYW4gMC5cbiAgICAgICAgdmFyIHVzZVNpZ25pZmljYW50RGlnaXRzID0gc2V0dGluZ3MudXNlU2lnbmlmaWNhbnREaWdpdHMgJiYgcHJlY2lzaW9uID4gMDtcbiAgICAgICAgdmFyIHNpZ25pZmljYW50RGlnaXRzID0gdXNlU2lnbmlmaWNhbnREaWdpdHMgPyBzZXR0aW5ncy5wcmVjaXNpb24gOiAwO1xuICAgICAgICB2YXIgc2lnbmlmaWNhbnREaWdpdHNDYWNoZSA9IHNpZ25pZmljYW50RGlnaXRzO1xuXG4gICAgICAgIHZhciBtaW5WYWx1ZSA9IHNldHRpbmdzLm1pblZhbHVlO1xuICAgICAgICB2YXIgaXNNaW5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBtYXhWYWx1ZSA9IHNldHRpbmdzLm1heFZhbHVlO1xuICAgICAgICB2YXIgaXNNYXhWYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGZvcm1hdE51bWJlciBmYWxsYmFjayBvcHRpb25zLlxuICAgICAgICB2YXIgdXNlVG9Mb2NhbGVTdHJpbmcgPSBzZXR0aW5ncy51c2VUb0xvY2FsZVN0cmluZztcbiAgICAgICAgdmFyIGdyb3VwaW5nU2VwYXJhdG9yID0gc2V0dGluZ3MuZ3JvdXBpbmdTZXBhcmF0b3I7XG4gICAgICAgIHZhciBkZWNpbWFsU2VwYXJhdG9yID0gc2V0dGluZ3MuZGVjaW1hbFNlcGFyYXRvcjtcbiAgICAgICAgdmFyIGdyb3VwaW5nID0gc2V0dGluZ3MuZ3JvdXBpbmc7XG5cbiAgICAgICAgdXNlVG9Mb2NhbGVTdHJpbmcgPSB1c2VUb0xvY2FsZVN0cmluZyAmJiAodG9Mb2NhbGVTdHJpbmdXb3JrcyB8fCBpbnRsTnVtYmVyRm9ybWF0V29ya3MpO1xuXG4gICAgICAgIC8vIFRyaW0gb3B0aW9ucy5cbiAgICAgICAgdmFyIHRyaW0gPSBzZXR0aW5ncy50cmltO1xuXG4gICAgICAgIGlmIChpc0FycmF5KHRyaW0pKSB7XG4gICAgICAgICAgICB0cmltID0gdHJpbS5qb2luKFwiIFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0cmltID09PSBudWxsICYmIChsYXJnZXN0IHx8IG1heFZhbHVlIHx8IHVzZVNpZ25pZmljYW50RGlnaXRzKSkge1xuICAgICAgICAgICAgdHJpbSA9IFwiYWxsXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHJpbSA9PT0gbnVsbCB8fCB0cmltID09PSB0cnVlIHx8IHRyaW0gPT09IFwibGVmdFwiIHx8IHRyaW0gPT09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgdHJpbSA9IFwibGFyZ2VcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0cmltID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdHJpbSA9IFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdHJpbUluY2x1ZGVzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnRlc3QodHJpbSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHJMYXJnZSA9IC9sYXJnZS87XG4gICAgICAgIHZhciByU21hbGwgPSAvc21hbGwvO1xuICAgICAgICB2YXIgckJvdGggPSAvYm90aC87XG4gICAgICAgIHZhciByTWlkID0gL21pZC87XG4gICAgICAgIHZhciByQWxsID0gL15hbGx8W15zbV1hbGwvO1xuICAgICAgICB2YXIgckZpbmFsID0gL2ZpbmFsLztcblxuICAgICAgICB2YXIgdHJpbUxhcmdlID0gbGFyZ2VzdCA+IDAgfHwgYW55KFtyTGFyZ2UsIHJCb3RoLCByQWxsXSwgdHJpbUluY2x1ZGVzKTtcbiAgICAgICAgdmFyIHRyaW1TbWFsbCA9IGFueShbclNtYWxsLCByQm90aCwgckFsbF0sIHRyaW1JbmNsdWRlcyk7XG4gICAgICAgIHZhciB0cmltTWlkID0gYW55KFtyTWlkLCByQWxsXSwgdHJpbUluY2x1ZGVzKTtcbiAgICAgICAgdmFyIHRyaW1GaW5hbCA9IGFueShbckZpbmFsLCByQWxsXSwgdHJpbUluY2x1ZGVzKTtcblxuICAgICAgICAvLyBQYXJzZSBmb3JtYXQgc3RyaW5nIHRvIGNyZWF0ZSByYXcgdG9rZW5zIGFycmF5LlxuICAgICAgICB2YXIgcmF3VG9rZW5zID0gbWFwKHRlbXBsYXRlLm1hdGNoKHRva2VuaXplciksIGZ1bmN0aW9uICh0b2tlbiwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gdHlwZU1hcCh0b2tlbik7XG5cbiAgICAgICAgICAgIGlmICh0b2tlbi5zbGljZSgwLCAxKSA9PT0gXCIqXCIpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2VuLnNsaWNlKDEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IFwiZXNjYXBlXCIgJiYgdHlwZSAhPT0gXCJnZW5lcmFsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcFRyaW0ucHVzaCh0eXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIGxlbmd0aDogdG9rZW4ubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiXCIsXG5cbiAgICAgICAgICAgICAgICAvLyBSZXBsYWNlIGVzY2FwZWQgdG9rZW5zIHdpdGggdGhlIG5vbi1lc2NhcGVkIHRva2VuIHRleHQuXG4gICAgICAgICAgICAgICAgdG9rZW46ICh0eXBlID09PSBcImVzY2FwZVwiID8gdG9rZW4ucmVwbGFjZSh0b2tlbkRlZnMuZXNjYXBlLCBcIiQxXCIpIDogdG9rZW4pLFxuXG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIHR5cGUgb24gbm9uLW1vbWVudCB0b2tlbnMuXG4gICAgICAgICAgICAgICAgdHlwZTogKCh0eXBlID09PSBcImVzY2FwZVwiIHx8IHR5cGUgPT09IFwiZ2VuZXJhbFwiKSA/IG51bGwgOiB0eXBlKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQXNzb2NpYXRlIHRleHQgdG9rZW5zIHdpdGggbW9tZW50IHRva2Vucy5cbiAgICAgICAgdmFyIGN1cnJlbnRUb2tlbiA9IHtcbiAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgbGVuZ3RoOiAwLFxuICAgICAgICAgICAgdG9rZW46IFwiXCIsXG4gICAgICAgICAgICB0ZXh0OiBcIlwiLFxuICAgICAgICAgICAgdHlwZTogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0b2tlbnMgPSBbXTtcblxuICAgICAgICBpZiAodXNlTGVmdFVuaXRzKSB7XG4gICAgICAgICAgICByYXdUb2tlbnMucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWFjaChyYXdUb2tlbnMsIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRva2VuLnR5cGUgfHwgY3VycmVudFRva2VuLnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5zLnB1c2goY3VycmVudFRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdXJyZW50VG9rZW4gPSB0b2tlbjtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHVzZUxlZnRVbml0cykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUb2tlbi50ZXh0ID0gdG9rZW4udG9rZW4gKyBjdXJyZW50VG9rZW4udGV4dDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRva2VuLnRleHQgKz0gdG9rZW4udG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjdXJyZW50VG9rZW4udHlwZSB8fCBjdXJyZW50VG9rZW4udGV4dCkge1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goY3VycmVudFRva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1c2VMZWZ0VW5pdHMpIHtcbiAgICAgICAgICAgIHRva2Vucy5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaW5kIHVuaXF1ZSBtb21lbnQgdG9rZW4gdHlwZXMgaW4gdGhlIHRlbXBsYXRlIGluIG9yZGVyIG9mXG4gICAgICAgIC8vIGRlc2NlbmRpbmcgbWFnbml0dWRlLlxuICAgICAgICB2YXIgbW9tZW50VHlwZXMgPSBpbnRlcnNlY3Rpb24odHlwZXMsIHVuaXF1ZShjb21wYWN0KHBsdWNrKHRva2VucywgXCJ0eXBlXCIpKSkpO1xuXG4gICAgICAgIC8vIEV4aXQgZWFybHkgaWYgdGhlcmUgYXJlIG5vIG1vbWVudCB0b2tlbiB0eXBlcy5cbiAgICAgICAgaWYgKCFtb21lbnRUeXBlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBwbHVjayh0b2tlbnMsIFwidGV4dFwiKS5qb2luKFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHZhbHVlcyBmb3IgZWFjaCBtb21lbnQgdHlwZSBpbiB0aGUgdGVtcGxhdGUuXG4gICAgICAgIC8vIEZvciBwcm9jZXNzaW5nIHRoZSBzZXR0aW5ncywgdmFsdWVzIGFyZSBhc3NvY2lhdGVkIHdpdGggbW9tZW50IHR5cGVzLlxuICAgICAgICAvLyBWYWx1ZXMgd2lsbCBiZSBhc3NpZ25lZCB0byB0b2tlbnMgYXQgdGhlIGxhc3Qgc3RlcCBpbiBvcmRlciB0b1xuICAgICAgICAvLyBhc3N1bWUgbm90aGluZyBhYm91dCBmcmVxdWVuY3kgb3Igb3JkZXIgb2YgdG9rZW5zIGluIHRoZSB0ZW1wbGF0ZS5cbiAgICAgICAgbW9tZW50VHlwZXMgPSBtYXAobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlLCBpbmRleCkge1xuICAgICAgICAgICAgLy8gSXMgdGhpcyB0aGUgbGVhc3QtbWFnbml0dWRlIG1vbWVudCB0b2tlbiBmb3VuZD9cbiAgICAgICAgICAgIHZhciBpc1NtYWxsZXN0ID0gKChpbmRleCArIDEpID09PSBtb21lbnRUeXBlcy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAvLyBJcyB0aGlzIHRoZSBncmVhdGVzdC1tYWduaXR1ZGUgbW9tZW50IHRva2VuIGZvdW5kP1xuICAgICAgICAgICAgdmFyIGlzTGFyZ2VzdCA9ICghaW5kZXgpO1xuXG4gICAgICAgICAgICAvLyBHZXQgdGhlIHJhdyB2YWx1ZSBpbiB0aGUgY3VycmVudCB1bml0cy5cbiAgICAgICAgICAgIHZhciByYXdWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKG1vbWVudFR5cGUgPT09IFwieWVhcnNcIiB8fCBtb21lbnRUeXBlID09PSBcIm1vbnRoc1wiKSB7XG4gICAgICAgICAgICAgICAgcmF3VmFsdWUgPSByZW1haW5kZXJNb250aHMuYXMobW9tZW50VHlwZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJhd1ZhbHVlID0gcmVtYWluZGVyLmFzKG1vbWVudFR5cGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgd2hvbGVWYWx1ZSA9IE1hdGguZmxvb3IocmF3VmFsdWUpO1xuICAgICAgICAgICAgdmFyIGRlY2ltYWxWYWx1ZSA9IHJhd1ZhbHVlIC0gd2hvbGVWYWx1ZTtcblxuICAgICAgICAgICAgdmFyIHRva2VuID0gZmluZCh0b2tlbnMsIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlID09PSB0b2tlbi50eXBlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChpc0xhcmdlc3QgJiYgbWF4VmFsdWUgJiYgcmF3VmFsdWUgPiBtYXhWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlzTWF4VmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNTbWFsbGVzdCAmJiBtaW5WYWx1ZSAmJiBNYXRoLmFicyhzZXR0aW5ncy5kdXJhdGlvbi5hcyhtb21lbnRUeXBlKSkgPCBtaW5WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlzTWluVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBOb3RlIHRoZSBsZW5ndGggb2YgdGhlIGxhcmdlc3QtbWFnbml0dWRlIG1vbWVudCB0b2tlbjpcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGdyZWF0ZXIgdGhhbiBvbmUgYW5kIGZvcmNlTGVuZ3RoIGlzIG5vdCBzZXQsXG4gICAgICAgICAgICAvLyB0aGVuIGRlZmF1bHQgZm9yY2VMZW5ndGggdG8gYHRydWVgLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFJhdGlvbmFsZSBpcyB0aGlzOiBJZiB0aGUgdGVtcGxhdGUgaXMgXCJoOm1tOnNzXCIgYW5kIHRoZVxuICAgICAgICAgICAgLy8gbW9tZW50IHZhbHVlIGlzIDUgbWludXRlcywgdGhlIHVzZXItZnJpZW5kbHkgb3V0cHV0IGlzXG4gICAgICAgICAgICAvLyBcIjU6MDBcIiwgbm90IFwiMDU6MDBcIi4gV2Ugc2hvdWxkbid0IHBhZCB0aGUgYG1pbnV0ZXNgIHRva2VuXG4gICAgICAgICAgICAvLyBldmVuIHRob3VnaCBpdCBoYXMgbGVuZ3RoIG9mIHR3byBpZiB0aGUgdGVtcGxhdGUgaXMgXCJoOm1tOnNzXCI7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gSWYgdGhlIG1pbnV0ZXMgb3V0cHV0IHNob3VsZCBhbHdheXMgaW5jbHVkZSB0aGUgbGVhZGluZyB6ZXJvXG4gICAgICAgICAgICAvLyBldmVuIHdoZW4gdGhlIGhvdXIgaXMgdHJpbW1lZCB0aGVuIHNldCBgeyBmb3JjZUxlbmd0aDogdHJ1ZSB9YFxuICAgICAgICAgICAgLy8gdG8gb3V0cHV0IFwiMDU6MDBcIi4gSWYgdGhlIHRlbXBsYXRlIGlzIFwiaGg6bW06c3NcIiwgdGhlIHVzZXJcbiAgICAgICAgICAgIC8vIGNsZWFybHkgd2FudGVkIGV2ZXJ5dGhpbmcgcGFkZGVkIHNvIHdlIHNob3VsZCBvdXRwdXQgXCIwNTowMFwiO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIHdhbnRzIHRoZSBmdWxsIHBhZGRlZCBvdXRwdXQsIHRoZXkgY2FuIHVzZVxuICAgICAgICAgICAgLy8gdGVtcGxhdGUgXCJoaDptbTpzc1wiIGFuZCBzZXQgYHsgdHJpbTogZmFsc2UgfWAgdG8gb3V0cHV0XG4gICAgICAgICAgICAvLyBcIjAwOjA1OjAwXCIuXG4gICAgICAgICAgICBpZiAoaXNMYXJnZXN0ICYmIGZvcmNlTGVuZ3RoID09PSBudWxsICYmIHRva2VuLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBmb3JjZUxlbmd0aCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSByZW1haW5kZXIuXG4gICAgICAgICAgICByZW1haW5kZXIuc3VidHJhY3Qod2hvbGVWYWx1ZSwgbW9tZW50VHlwZSk7XG4gICAgICAgICAgICByZW1haW5kZXJNb250aHMuc3VidHJhY3Qod2hvbGVWYWx1ZSwgbW9tZW50VHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmF3VmFsdWU6IHJhd1ZhbHVlLFxuICAgICAgICAgICAgICAgIHdob2xlVmFsdWU6IHdob2xlVmFsdWUsXG4gICAgICAgICAgICAgICAgLy8gRGVjaW1hbCB2YWx1ZSBpcyBvbmx5IHJldGFpbmVkIGZvciB0aGUgbGVhc3QtbWFnbml0dWRlXG4gICAgICAgICAgICAgICAgLy8gbW9tZW50IHR5cGUgaW4gdGhlIGZvcm1hdCB0ZW1wbGF0ZS5cbiAgICAgICAgICAgICAgICBkZWNpbWFsVmFsdWU6IGlzU21hbGxlc3QgPyBkZWNpbWFsVmFsdWUgOiAwLFxuICAgICAgICAgICAgICAgIGlzU21hbGxlc3Q6IGlzU21hbGxlc3QsXG4gICAgICAgICAgICAgICAgaXNMYXJnZXN0OiBpc0xhcmdlc3QsXG4gICAgICAgICAgICAgICAgdHlwZTogbW9tZW50VHlwZSxcbiAgICAgICAgICAgICAgICAvLyBUb2tlbnMgY2FuIGFwcGVhciBtdWx0aXBsZSB0aW1lcyBpbiBhIHRlbXBsYXRlIHN0cmluZyxcbiAgICAgICAgICAgICAgICAvLyBidXQgYWxsIGluc3RhbmNlcyBtdXN0IHNoYXJlIHRoZSBzYW1lIGxlbmd0aC5cbiAgICAgICAgICAgICAgICB0b2tlbkxlbmd0aDogdG9rZW4ubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgdHJ1bmNNZXRob2QgPSB0cnVuYyA/IE1hdGguZmxvb3IgOiBNYXRoLnJvdW5kO1xuICAgICAgICB2YXIgdHJ1bmNhdGUgPSBmdW5jdGlvbiAodmFsdWUsIHBsYWNlcykge1xuICAgICAgICAgICAgdmFyIGZhY3RvciA9IE1hdGgucG93KDEwLCBwbGFjZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydW5jTWV0aG9kKHZhbHVlICogZmFjdG9yKSAvIGZhY3RvcjtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZm91bmRGaXJzdCA9IGZhbHNlO1xuICAgICAgICB2YXIgYnViYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBmb3JtYXRWYWx1ZSA9IGZ1bmN0aW9uIChtb21lbnRUeXBlLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIGZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHVzZUdyb3VwaW5nLFxuICAgICAgICAgICAgICAgIGdyb3VwaW5nU2VwYXJhdG9yOiBncm91cGluZ1NlcGFyYXRvcixcbiAgICAgICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBkZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgICAgIGdyb3VwaW5nOiBncm91cGluZyxcbiAgICAgICAgICAgICAgICB1c2VUb0xvY2FsZVN0cmluZzogdXNlVG9Mb2NhbGVTdHJpbmdcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh1c2VTaWduaWZpY2FudERpZ2l0cykge1xuICAgICAgICAgICAgICAgIGlmIChzaWduaWZpY2FudERpZ2l0cyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUucmF3VmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLndob2xlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0T3B0aW9ucy5tYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgPSBzaWduaWZpY2FudERpZ2l0cztcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS5zaWduaWZpY2FudERpZ2l0cyA9IHNpZ25pZmljYW50RGlnaXRzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzTWF4VmFsdWUgJiYgIWJ1YmJsZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAobW9tZW50VHlwZS5pc0xhcmdlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS53aG9sZVZhbHVlID0gbWF4VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLndob2xlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNNaW5WYWx1ZSAmJiAhYnViYmxlZCkge1xuICAgICAgICAgICAgICAgIGlmIChtb21lbnRUeXBlLmlzU21hbGxlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS53aG9sZVZhbHVlID0gbWluVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLndob2xlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobW9tZW50VHlwZS5pc1NtYWxsZXN0IHx8IG1vbWVudFR5cGUuc2lnbmlmaWNhbnREaWdpdHMgJiYgbW9tZW50VHlwZS5zaWduaWZpY2FudERpZ2l0cyAtIG1vbWVudFR5cGUud2hvbGVWYWx1ZS50b1N0cmluZygpLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQXBwbHkgcHJlY2lzaW9uIHRvIGxlYXN0IHNpZ25pZmljYW50IHRva2VuIHZhbHVlLlxuICAgICAgICAgICAgICAgIGlmIChwcmVjaXNpb24gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSB0cnVuY2F0ZShtb21lbnRUeXBlLndob2xlVmFsdWUsIHByZWNpc2lvbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcmVjaXNpb24gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IHRydW5jTWV0aG9kKG1vbWVudFR5cGUud2hvbGVWYWx1ZSArIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBwcmVjaXNpb24gPiAwXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VTaWduaWZpY2FudERpZ2l0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRydW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IHRydW5jYXRlKG1vbWVudFR5cGUucmF3VmFsdWUsIHNpZ25pZmljYW50RGlnaXRzIC0gbW9tZW50VHlwZS53aG9sZVZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IG1vbWVudFR5cGUucmF3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb21lbnRUeXBlLndob2xlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduaWZpY2FudERpZ2l0cyAtPSBtb21lbnRUeXBlLndob2xlVmFsdWUudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRPcHRpb25zLmZyYWN0aW9uRGlnaXRzID0gcHJlY2lzaW9uO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnZhbHVlID0gbW9tZW50VHlwZS53aG9sZVZhbHVlICsgdHJ1bmNhdGUobW9tZW50VHlwZS5kZWNpbWFsVmFsdWUsIHByZWNpc2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSBtb21lbnRUeXBlLndob2xlVmFsdWUgKyBtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZVNpZ25pZmljYW50RGlnaXRzICYmIG1vbWVudFR5cGUud2hvbGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBPdXRlciBNYXRoLnJvdW5kIHJlcXVpcmVkIGhlcmUgdG8gaGFuZGxlIGZsb2F0aW5nIHBvaW50IGVycm9ycy5cbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IE1hdGgucm91bmQodHJ1bmNhdGUobW9tZW50VHlwZS53aG9sZVZhbHVlLCBtb21lbnRUeXBlLnNpZ25pZmljYW50RGlnaXRzIC0gbW9tZW50VHlwZS53aG9sZVZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2lnbmlmaWNhbnREaWdpdHMgLT0gbW9tZW50VHlwZS53aG9sZVZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSBtb21lbnRUeXBlLndob2xlVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobW9tZW50VHlwZS50b2tlbkxlbmd0aCA+IDEgJiYgKGZvcmNlTGVuZ3RoIHx8IGZvdW5kRmlyc3QpKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0T3B0aW9ucy5taW5pbXVtSW50ZWdlckRpZ2l0cyA9IG1vbWVudFR5cGUudG9rZW5MZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBpZiAoYnViYmxlZCAmJiBmb3JtYXRPcHRpb25zLm1heGltdW1TaWduaWZpY2FudERpZ2l0cyA8IG1vbWVudFR5cGUudG9rZW5MZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGZvcm1hdE9wdGlvbnMubWF4aW11bVNpZ25pZmljYW50RGlnaXRzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFmb3VuZEZpcnN0ICYmIChtb21lbnRUeXBlLnZhbHVlID4gMCB8fCB0cmltID09PSBcIlwiIC8qIHRyaW06IGZhbHNlICovIHx8IGZpbmQoc3RvcFRyaW0sIG1vbWVudFR5cGUudHlwZSkgfHwgZmluZChvdXRwdXRUeXBlcywgbW9tZW50VHlwZS50eXBlKSkpIHtcbiAgICAgICAgICAgICAgICBmb3VuZEZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZSA9IGZvcm1hdE51bWJlcihtb21lbnRUeXBlLnZhbHVlLCBmb3JtYXRPcHRpb25zLCB1c2VyTG9jYWxlKTtcblxuICAgICAgICAgICAgZm9ybWF0T3B0aW9ucy51c2VHcm91cGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgZm9ybWF0T3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yID0gXCIuXCI7XG4gICAgICAgICAgICBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlRW4gPSBmb3JtYXROdW1iZXIobW9tZW50VHlwZS52YWx1ZSwgZm9ybWF0T3B0aW9ucywgXCJlblwiKTtcblxuICAgICAgICAgICAgaWYgKG1vbWVudFR5cGUudG9rZW5MZW5ndGggPT09IDIgJiYgbW9tZW50VHlwZS50eXBlID09PSBcIm1pbGxpc2Vjb25kc1wiKSB7XG4gICAgICAgICAgICAgICAgbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZU1TID0gZm9ybWF0TnVtYmVyKG1vbWVudFR5cGUudmFsdWUsIHtcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bUludGVnZXJEaWdpdHM6IDMsXG4gICAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sIFwiZW5cIikuc2xpY2UoMCwgMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBmb3JtYXR0ZWQgdmFsdWVzLlxuICAgICAgICBtb21lbnRUeXBlcyA9IG1hcChtb21lbnRUeXBlcywgZm9ybWF0VmFsdWUpO1xuICAgICAgICBtb21lbnRUeXBlcyA9IGNvbXBhY3QobW9tZW50VHlwZXMpO1xuXG4gICAgICAgIC8vIEJ1YmJsZSByb3VuZGVkIHZhbHVlcy5cbiAgICAgICAgaWYgKG1vbWVudFR5cGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHZhciBmaW5kVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmQobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlLnR5cGUgPT09IHR5cGU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgYnViYmxlVHlwZXMgPSBmdW5jdGlvbiAoYnViYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ1YmJsZU1vbWVudFR5cGUgPSBmaW5kVHlwZShidWJibGUudHlwZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWJ1YmJsZU1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVhY2goYnViYmxlLnRhcmdldHMsIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldE1vbWVudFR5cGUgPSBmaW5kVHlwZSh0YXJnZXQudHlwZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXRNb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoYnViYmxlTW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZUVuLCAxMCkgPT09IHRhcmdldC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlTW9tZW50VHlwZS5yYXdWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVNb21lbnRUeXBlLndob2xlVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlTW9tZW50VHlwZS5kZWNpbWFsVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TW9tZW50VHlwZS5yYXdWYWx1ZSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TW9tZW50VHlwZS53aG9sZVZhbHVlICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlRW4gPSB0YXJnZXRNb21lbnRUeXBlLndob2xlVmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBlYWNoKGJ1YmJsZXMsIGJ1YmJsZVR5cGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlY2FsY3VsYXRlIGZvcm1hdHRlZCB2YWx1ZXMuXG4gICAgICAgIGlmIChidWJibGVkKSB7XG4gICAgICAgICAgICBmb3VuZEZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICBzaWduaWZpY2FudERpZ2l0cyA9IHNpZ25pZmljYW50RGlnaXRzQ2FjaGU7XG4gICAgICAgICAgICBtb21lbnRUeXBlcyA9IG1hcChtb21lbnRUeXBlcywgZm9ybWF0VmFsdWUpO1xuICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBjb21wYWN0KG1vbWVudFR5cGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvdXRwdXRUeXBlcyAmJiAhKGlzTWF4VmFsdWUgJiYgIXNldHRpbmdzLnRyaW0pKSB7XG4gICAgICAgICAgICBtb21lbnRUeXBlcyA9IG1hcChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmluZChvdXRwdXRUeXBlcywgZnVuY3Rpb24gKG91dHB1dFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGUudHlwZSA9PT0gb3V0cHV0VHlwZTtcbiAgICAgICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb21lbnRUeXBlcyA9IGNvbXBhY3QobW9tZW50VHlwZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVHJpbSBMYXJnZS5cbiAgICAgICAgICAgIGlmICh0cmltTGFyZ2UpIHtcbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlcyA9IHJlc3QobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3AgdHJpbW1pbmcgb246XG4gICAgICAgICAgICAgICAgICAgIC8vIC0gdGhlIHNtYWxsZXN0IG1vbWVudCB0eXBlXG4gICAgICAgICAgICAgICAgICAgIC8vIC0gYSB0eXBlIG1hcmtlZCBmb3Igc3RvcFRyaW1cbiAgICAgICAgICAgICAgICAgICAgLy8gLSBhIHR5cGUgdGhhdCBoYXMgYSB3aG9sZSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIW1vbWVudFR5cGUuaXNTbWFsbGVzdCAmJiAhbW9tZW50VHlwZS53aG9sZVZhbHVlICYmICFmaW5kKHN0b3BUcmltLCBtb21lbnRUeXBlLnR5cGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBMYXJnZXN0LlxuICAgICAgICAgICAgaWYgKGxhcmdlc3QgJiYgbW9tZW50VHlwZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBtb21lbnRUeXBlcy5zbGljZSgwLCBsYXJnZXN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVHJpbSBTbWFsbC5cbiAgICAgICAgICAgIGlmICh0cmltU21hbGwgJiYgbW9tZW50VHlwZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIG1vbWVudFR5cGVzID0gaW5pdGlhbChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU3RvcCB0cmltbWluZyBvbjpcbiAgICAgICAgICAgICAgICAgICAgLy8gLSBhIHR5cGUgbWFya2VkIGZvciBzdG9wVHJpbVxuICAgICAgICAgICAgICAgICAgICAvLyAtIGEgdHlwZSB0aGF0IGhhcyBhIHdob2xlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIC8vIC0gdGhlIGxhcmdlc3QgbW9tZW50VHlwZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIW1vbWVudFR5cGUud2hvbGVWYWx1ZSAmJiAhZmluZChzdG9wVHJpbSwgbW9tZW50VHlwZS50eXBlKSAmJiAhbW9tZW50VHlwZS5pc0xhcmdlc3Q7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRyaW0gTWlkLlxuICAgICAgICAgICAgaWYgKHRyaW1NaWQpIHtcbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlcyA9IG1hcChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDAgJiYgaW5kZXggPCBtb21lbnRUeXBlcy5sZW5ndGggLSAxICYmICFtb21lbnRUeXBlLndob2xlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGU7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlcyA9IGNvbXBhY3QobW9tZW50VHlwZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUcmltIEZpbmFsLlxuICAgICAgICAgICAgaWYgKHRyaW1GaW5hbCAmJiBtb21lbnRUeXBlcy5sZW5ndGggPT09IDEgJiYgIW1vbWVudFR5cGVzWzBdLndob2xlVmFsdWUgJiYgISghdHJ1bmMgJiYgbW9tZW50VHlwZXNbMF0uaXNTbWFsbGVzdCAmJiBtb21lbnRUeXBlc1swXS5yYXdWYWx1ZSA8IG1pblZhbHVlKSkge1xuICAgICAgICAgICAgICAgIG1vbWVudFR5cGVzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmV0dXJuTW9tZW50VHlwZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvY2FsaXplIGFuZCBwbHVyYWxpemUgdW5pdCBsYWJlbHMuXG4gICAgICAgIGVhY2godG9rZW5zLCBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBtb21lbnRUb2tlbnNbdG9rZW4udHlwZV07XG5cbiAgICAgICAgICAgIHZhciBtb21lbnRUeXBlID0gZmluZChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZS50eXBlID09PSB0b2tlbi50eXBlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICgha2V5IHx8ICFtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZUVuLnNwbGl0KFwiLlwiKTtcblxuICAgICAgICAgICAgdmFsdWVzWzBdID0gcGFyc2VJbnQodmFsdWVzWzBdLCAxMCk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZXNbMV0pIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNbMV0gPSBwYXJzZUZsb2F0KFwiMC5cIiArIHZhbHVlc1sxXSwgMTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNbMV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcGx1cmFsS2V5ID0gbG9jYWxlRGF0YS5kdXJhdGlvblBsdXJhbEtleShrZXksIHZhbHVlc1swXSwgdmFsdWVzWzFdKTtcblxuICAgICAgICAgICAgdmFyIGxhYmVscyA9IGR1cmF0aW9uR2V0TGFiZWxzKGtleSwgbG9jYWxlRGF0YSk7XG5cbiAgICAgICAgICAgIHZhciBhdXRvTG9jYWxpemVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHZhciBwbHVyYWxpemVkTGFiZWxzID0ge307XG5cbiAgICAgICAgICAgIC8vIEF1dG8tTG9jYWxpemVkIHVuaXQgbGFiZWxzLlxuICAgICAgICAgICAgZWFjaChsb2NhbGVEYXRhLl9kdXJhdGlvbkxhYmVsVHlwZXMsIGZ1bmN0aW9uIChsYWJlbFR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSBmaW5kKGxhYmVscywgZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsYWJlbC50eXBlID09PSBsYWJlbFR5cGUudHlwZSAmJiBsYWJlbC5rZXkgPT09IHBsdXJhbEtleTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBwbHVyYWxpemVkTGFiZWxzW2xhYmVsLnR5cGVdID0gbGFiZWwubGFiZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZ0luY2x1ZGVzKHRva2VuLnRleHQsIGxhYmVsVHlwZS5zdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi50ZXh0ID0gdG9rZW4udGV4dC5yZXBsYWNlKGxhYmVsVHlwZS5zdHJpbmcsIGxhYmVsLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Mb2NhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEF1dG8tcGx1cmFsaXplZCB1bml0IGxhYmVscy5cbiAgICAgICAgICAgIGlmICh1c2VQbHVyYWwgJiYgIWF1dG9Mb2NhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICBsYWJlbHMuc29ydChkdXJhdGlvbkxhYmVsQ29tcGFyZSk7XG5cbiAgICAgICAgICAgICAgICBlYWNoKGxhYmVscywgZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVyYWxpemVkTGFiZWxzW2xhYmVsLnR5cGVdID09PSBsYWJlbC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZ0luY2x1ZGVzKHRva2VuLnRleHQsIGxhYmVsLmxhYmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0b3AgY2hlY2tpbmcgdGhpcyB0b2tlbiBpZiBpdHMgbGFiZWwgaXMgYWxyZWFkeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvcnJlY3RseSBwbHVyYWxpemVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCB0aGlzIGxhYmVsIGlmIGl0IGlzIGNvcnJlY3QsIGJ1dCBub3QgcHJlc2VudCBpblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHRva2VuJ3MgdGV4dC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmdJbmNsdWRlcyh0b2tlbi50ZXh0LCBsYWJlbC5sYWJlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlcGxlY2UgdGhpcyB0b2tlbidzIGxhYmVsIGFuZCBzdG9wIGNoZWNraW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4udGV4dCA9IHRva2VuLnRleHQucmVwbGFjZShsYWJlbC5sYWJlbCwgcGx1cmFsaXplZExhYmVsc1tsYWJlbC50eXBlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQnVpbGQgb3VwdHV0LlxuICAgICAgICB0b2tlbnMgPSBtYXAodG9rZW5zLCBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIGlmICghdG9rZW4udHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbi50ZXh0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbW9tZW50VHlwZSA9IGZpbmQobW9tZW50VHlwZXMsIGZ1bmN0aW9uIChtb21lbnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGUudHlwZSA9PT0gdG9rZW4udHlwZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIW1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG91dCA9IFwiXCI7XG5cbiAgICAgICAgICAgIGlmICh1c2VMZWZ0VW5pdHMpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gdG9rZW4udGV4dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzTmVnYXRpdmUgJiYgaXNNYXhWYWx1ZSB8fCAhaXNOZWdhdGl2ZSAmJiBpc01pblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgb3V0ICs9IFwiPCBcIjtcbiAgICAgICAgICAgICAgICBpc01heFZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaXNNaW5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNOZWdhdGl2ZSAmJiBpc01pblZhbHVlIHx8ICFpc05lZ2F0aXZlICYmIGlzTWF4VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gXCI+IFwiO1xuICAgICAgICAgICAgICAgIGlzTWF4VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpc01pblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc05lZ2F0aXZlICYmIChtb21lbnRUeXBlLnZhbHVlID4gMCB8fCB0cmltID09PSBcIlwiIHx8IGZpbmQoc3RvcFRyaW0sIG1vbWVudFR5cGUudHlwZSkgfHwgZmluZChvdXRwdXRUeXBlcywgbW9tZW50VHlwZS50eXBlKSkpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gXCItXCI7XG4gICAgICAgICAgICAgICAgaXNOZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gXCJtaWxsaXNlY29uZHNcIiAmJiBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlTVMpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZU1TO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gbW9tZW50VHlwZS5mb3JtYXR0ZWRWYWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF1c2VMZWZ0VW5pdHMpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gdG9rZW4udGV4dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVHJpbSBsZWFkaW5nIGFuZCB0cmFpbGluZyBjb21tYSwgc3BhY2UsIGNvbG9uLCBhbmQgZG90LlxuICAgICAgICByZXR1cm4gdG9rZW5zLmpvaW4oXCJcIikucmVwbGFjZSgvKCx8IHw6fFxcLikqJC8sIFwiXCIpLnJlcGxhY2UoL14oLHwgfDp8XFwuKSovLCBcIlwiKTtcbiAgICB9XG5cbiAgICAvLyBkZWZhdWx0Rm9ybWF0VGVtcGxhdGVcbiAgICBmdW5jdGlvbiBkZWZhdWx0Rm9ybWF0VGVtcGxhdGUoKSB7XG4gICAgICAgIHZhciBkdXIgPSB0aGlzLmR1cmF0aW9uO1xuXG4gICAgICAgIHZhciBmaW5kVHlwZSA9IGZ1bmN0aW9uIGZpbmRUeXBlKHR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiBkdXIuX2RhdGFbdHlwZV07XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGZpcnN0VHlwZSA9IGZpbmQodGhpcy50eXBlcywgZmluZFR5cGUpO1xuXG4gICAgICAgIHZhciBsYXN0VHlwZSA9IGZpbmRMYXN0KHRoaXMudHlwZXMsIGZpbmRUeXBlKTtcblxuICAgICAgICAvLyBEZWZhdWx0IHRlbXBsYXRlIHN0cmluZ3MgZm9yIGVhY2ggZHVyYXRpb24gZGltZW5zaW9uIHR5cGUuXG4gICAgICAgIHN3aXRjaCAoZmlyc3RUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwibWlsbGlzZWNvbmRzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiUyBfX1wiO1xuICAgICAgICAgICAgY2FzZSBcInNlY29uZHNcIjogLy8gRmFsbHRocm91Z2guXG4gICAgICAgICAgICBjYXNlIFwibWludXRlc1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIipfTVNfXCI7XG4gICAgICAgICAgICBjYXNlIFwiaG91cnNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJfSE1TX1wiO1xuICAgICAgICAgICAgY2FzZSBcImRheXNcIjogLy8gUG9zc2libGUgRmFsbHRocm91Z2guXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0VHlwZSA9PT0gbGFzdFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZCBfX1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJ3ZWVrc1wiOlxuICAgICAgICAgICAgICAgIGlmIChmaXJzdFR5cGUgPT09IGxhc3RUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIncgX19cIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmltID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpbSA9IFwiYm90aFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBcIncgX18sIGQgX18sIGggX19cIjtcbiAgICAgICAgICAgIGNhc2UgXCJtb250aHNcIjogLy8gUG9zc2libGUgRmFsbHRocm91Z2guXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0VHlwZSA9PT0gbGFzdFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTSBfX1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJ5ZWFyc1wiOlxuICAgICAgICAgICAgICAgIGlmIChmaXJzdFR5cGUgPT09IGxhc3RUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInkgX19cIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmltID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpbSA9IFwiYm90aFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBcInkgX18sIE0gX18sIGQgX19cIjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaW0gPSBcImJvdGhcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ5IF9fLCBkIF9fLCBoIF9fLCBtIF9fLCBzIF9fXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbml0XG4gICAgZnVuY3Rpb24gaW5pdChjb250ZXh0KSB7XG4gICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgdGhyb3cgXCJNb21lbnQgRHVyYXRpb24gRm9ybWF0IGluaXQgY2Fubm90IGZpbmQgbW9tZW50IGluc3RhbmNlLlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5kdXJhdGlvbi5mb3JtYXQgPSBkdXJhdGlvbnNGb3JtYXQ7XG4gICAgICAgIGNvbnRleHQuZHVyYXRpb24uZm4uZm9ybWF0ID0gZHVyYXRpb25Gb3JtYXQ7XG5cbiAgICAgICAgY29udGV4dC5kdXJhdGlvbi5mbi5mb3JtYXQuZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAvLyBNYW55IG9wdGlvbnMgYXJlIGRlZmF1bHRlZCB0byBgbnVsbGAgdG8gZGlzdGluZ3Vpc2ggYmV0d2VlblxuICAgICAgICAgICAgLy8gJ25vdCBzZXQnIGFuZCAnc2V0IHRvIGBmYWxzZWAnXG5cbiAgICAgICAgICAgIC8vIHRyaW1cbiAgICAgICAgICAgIC8vIENhbiBiZSBhIHN0cmluZywgYSBkZWxpbWl0ZWQgbGlzdCBvZiBzdHJpbmdzLCBhbiBhcnJheSBvZiBzdHJpbmdzLFxuICAgICAgICAgICAgLy8gb3IgYSBib29sZWFuLlxuICAgICAgICAgICAgLy8gXCJsYXJnZVwiIC0gd2lsbCB0cmltIGxhcmdlc3QtbWFnbml0dWRlIHplcm8tdmFsdWUgdG9rZW5zIHVudGlsXG4gICAgICAgICAgICAvLyBmaW5kaW5nIGEgdG9rZW4gd2l0aCBhIHZhbHVlLCBhIHRva2VuIGlkZW50aWZpZWQgYXMgJ3N0b3BUcmltJywgb3JcbiAgICAgICAgICAgIC8vIHRoZSBmaW5hbCB0b2tlbiBvZiB0aGUgZm9ybWF0IHN0cmluZy5cbiAgICAgICAgICAgIC8vIFwic21hbGxcIiAtIHdpbGwgdHJpbSBzbWFsbGVzdC1tYWduaXR1ZGUgemVyby12YWx1ZSB0b2tlbnMgdW50aWxcbiAgICAgICAgICAgIC8vIGZpbmRpbmcgYSB0b2tlbiB3aXRoIGEgdmFsdWUsIGEgdG9rZW4gaWRlbnRpZmllZCBhcyAnc3RvcFRyaW0nLCBvclxuICAgICAgICAgICAgLy8gdGhlIGZpbmFsIHRva2VuIG9mIHRoZSBmb3JtYXQgc3RyaW5nLlxuICAgICAgICAgICAgLy8gXCJib3RoXCIgLSB3aWxsIGV4ZWN1dGUgXCJsYXJnZVwiIHRyaW0gdGhlbiBcInNtYWxsXCIgdHJpbS5cbiAgICAgICAgICAgIC8vIFwibWlkXCIgLSB3aWxsIHRyaW0gYW55IHplcm8tdmFsdWUgdG9rZW5zIHRoYXQgYXJlIG5vdCB0aGUgZmlyc3Qgb3JcbiAgICAgICAgICAgIC8vIGxhc3QgdG9rZW5zLiBVc3VhbGx5IHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBcImxhcmdlXCIgb3IgXCJib3RoXCIuXG4gICAgICAgICAgICAvLyBlLmcuIFwibGFyZ2UgbWlkXCIgb3IgXCJib3RoIG1pZFwiLlxuICAgICAgICAgICAgLy8gXCJmaW5hbFwiIC0gd2lsbCB0cmltIHRoZSBmaW5hbCB0b2tlbiBpZiBpdCBpcyB6ZXJvLXZhbHVlLiBVc2UgdGhpc1xuICAgICAgICAgICAgLy8gb3B0aW9uIHdpdGggXCJsYXJnZVwiIG9yIFwiYm90aFwiIHRvIG91dHB1dCBhbiBlbXB0eSBzdHJpbmcgd2hlblxuICAgICAgICAgICAgLy8gZm9ybWF0dGluZyBhIHplcm8tdmFsdWUgZHVyYXRpb24uIGUuZy4gXCJsYXJnZSBmaW5hbFwiIG9yIFwiYm90aCBmaW5hbFwiLlxuICAgICAgICAgICAgLy8gXCJhbGxcIiAtIFdpbGwgdHJpbSBhbGwgemVyby12YWx1ZSB0b2tlbnMuIFNob3J0aGFuZCBmb3IgXCJib3RoIG1pZCBmaW5hbFwiLlxuICAgICAgICAgICAgLy8gXCJsZWZ0XCIgLSBtYXBzIHRvIFwibGFyZ2VcIiB0byBzdXBwb3J0IHBsdWdpbidzIHZlcnNpb24gMSBBUEkuXG4gICAgICAgICAgICAvLyBcInJpZ2h0XCIgLSBtYXBzIHRvIFwibGFyZ2VcIiB0byBzdXBwb3J0IHBsdWdpbidzIHZlcnNpb24gMSBBUEkuXG4gICAgICAgICAgICAvLyBgZmFsc2VgIC0gdGVtcGxhdGUgdG9rZW5zIGFyZSBub3QgdHJpbW1lZC5cbiAgICAgICAgICAgIC8vIGB0cnVlYCAtIHRyZWF0ZWQgYXMgXCJsYXJnZVwiLlxuICAgICAgICAgICAgLy8gYG51bGxgIC0gdHJlYXRlZCBhcyBcImxhcmdlXCIuXG4gICAgICAgICAgICB0cmltOiBudWxsLFxuXG4gICAgICAgICAgICAvLyBzdG9wVHJpbVxuICAgICAgICAgICAgLy8gQSBtb21lbnQgdG9rZW4gc3RyaW5nLCBhIGRlbGltaXRlZCBzZXQgb2YgbW9tZW50IHRva2VuIHN0cmluZ3MsXG4gICAgICAgICAgICAvLyBvciBhbiBhcnJheSBvZiBtb21lbnQgdG9rZW4gc3RyaW5ncy4gVHJpbW1pbmcgd2lsbCBzdG9wIHdoZW4gYSB0b2tlblxuICAgICAgICAgICAgLy8gbGlzdGVkIGluIHRoaXMgb3B0aW9uIGlzIHJlYWNoZWQuIEEgXCIqXCIgY2hhcmFjdGVyIGluIHRoZSBmb3JtYXRcbiAgICAgICAgICAgIC8vIHRlbXBsYXRlIHN0cmluZyB3aWxsIGFsc28gbWFyayBhIG1vbWVudCB0b2tlbiBhcyBzdG9wVHJpbS5cbiAgICAgICAgICAgIC8vIGUuZy4gXCJkIFtkYXlzXSAqaDptbTpzc1wiIHdpbGwgYWx3YXlzIHN0b3AgdHJpbW1pbmcgYXQgdGhlICdob3VycycgdG9rZW4uXG4gICAgICAgICAgICBzdG9wVHJpbTogbnVsbCxcblxuICAgICAgICAgICAgLy8gbGFyZ2VzdFxuICAgICAgICAgICAgLy8gU2V0IHRvIGEgcG9zaXRpdmUgaW50ZWdlciB0byBvdXRwdXQgb25seSB0aGUgXCJuXCIgbGFyZ2VzdC1tYWduaXR1ZGVcbiAgICAgICAgICAgIC8vIG1vbWVudCB0b2tlbnMgdGhhdCBoYXZlIGEgdmFsdWUuIEFsbCBsZXNzZXItbWFnbml0dWRlIG1vbWVudCB0b2tlbnNcbiAgICAgICAgICAgIC8vIHdpbGwgYmUgaWdub3JlZC4gVGhpcyBvcHRpb24gdGFrZXMgZWZmZWN0IGV2ZW4gaWYgYHRyaW1gIGlzIHNldFxuICAgICAgICAgICAgLy8gdG8gYGZhbHNlYC5cbiAgICAgICAgICAgIGxhcmdlc3Q6IG51bGwsXG5cbiAgICAgICAgICAgIC8vIG1heFZhbHVlXG4gICAgICAgICAgICAvLyBVc2UgYG1heFZhbHVlYCB0byByZW5kZXIgZ2VuZXJhbGl6ZWQgb3V0cHV0IGZvciBsYXJnZSBkdXJhdGlvbiB2YWx1ZXMsXG4gICAgICAgICAgICAvLyBlLmcuIGBcIj4gNjAgZGF5c1wiYC4gYG1heFZhbHVlYCBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciBhbmQgaXNcbiAgICAgICAgICAgIC8vLyBhcHBsaWVkIHRvIHRoZSBncmVhdGVzdC1tYWduaXR1ZGUgbW9tZW50IHRva2VuIGluIHRoZSBmb3JtYXQgdGVtcGxhdGUuXG4gICAgICAgICAgICBtYXhWYWx1ZTogbnVsbCxcblxuICAgICAgICAgICAgLy8gbWluVmFsdWVcbiAgICAgICAgICAgIC8vIFVzZSBgbWluVmFsdWVgIHRvIHJlbmRlciBnZW5lcmFsaXplZCBvdXRwdXQgZm9yIHNtYWxsIGR1cmF0aW9uIHZhbHVlcyxcbiAgICAgICAgICAgIC8vIGUuZy4gYFwiPCA1IG1pbnV0ZXNcImAuIGBtaW5WYWx1ZWAgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIgYW5kIGlzXG4gICAgICAgICAgICAvLyBhcHBsaWVkIHRvIHRoZSBsZWFzdC1tYWduaXR1ZGUgbW9tZW50IHRva2VuIGluIHRoZSBmb3JtYXQgdGVtcGxhdGUuXG4gICAgICAgICAgICBtaW5WYWx1ZTogbnVsbCxcblxuICAgICAgICAgICAgLy8gcHJlY2lzaW9uXG4gICAgICAgICAgICAvLyBJZiBhIHBvc2l0aXZlIGludGVnZXIsIG51bWJlciBvZiBkZWNpbWFsIGZyYWN0aW9uIGRpZ2l0cyB0byByZW5kZXIuXG4gICAgICAgICAgICAvLyBJZiBhIG5lZ2F0aXZlIGludGVnZXIsIG51bWJlciBvZiBpbnRlZ2VyIHBsYWNlIGRpZ2l0cyB0byB0cnVuY2F0ZSB0byAwLlxuICAgICAgICAgICAgLy8gSWYgYHVzZVNpZ25pZmljYW50RGlnaXRzYCBpcyBzZXQgdG8gYHRydWVgIGFuZCBgcHJlY2lzaW9uYCBpcyBhIHBvc2l0aXZlXG4gICAgICAgICAgICAvLyBpbnRlZ2VyLCBzZXRzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHMgdXNlZCBpbiB0aGVcbiAgICAgICAgICAgIC8vIGZvcm1hdHRlZCBvdXRwdXQuXG4gICAgICAgICAgICBwcmVjaXNpb246IDAsXG5cbiAgICAgICAgICAgIC8vIHRydW5jXG4gICAgICAgICAgICAvLyBEZWZhdWx0IGJlaGF2aW9yIHJvdW5kcyBmaW5hbCB0b2tlbiB2YWx1ZS4gU2V0IHRvIGB0cnVlYCB0b1xuICAgICAgICAgICAgLy8gdHJ1bmNhdGUgZmluYWwgdG9rZW4gdmFsdWUsIHdoaWNoIHdhcyB0aGUgZGVmYXVsdCBiZWhhdmlvciBpblxuICAgICAgICAgICAgLy8gdmVyc2lvbiAxIG9mIHRoaXMgcGx1Z2luLlxuICAgICAgICAgICAgdHJ1bmM6IGZhbHNlLFxuXG4gICAgICAgICAgICAvLyBmb3JjZUxlbmd0aFxuICAgICAgICAgICAgLy8gRm9yY2UgZmlyc3QgbW9tZW50IHRva2VuIHdpdGggYSB2YWx1ZSB0byByZW5kZXIgYXQgZnVsbCBsZW5ndGhcbiAgICAgICAgICAgIC8vIGV2ZW4gd2hlbiB0ZW1wbGF0ZSBpcyB0cmltbWVkIGFuZCBmaXJzdCBtb21lbnQgdG9rZW4gaGFzIGxlbmd0aCBvZiAxLlxuICAgICAgICAgICAgZm9yY2VMZW5ndGg6IG51bGwsXG5cbiAgICAgICAgICAgIC8vIHVzZXJMb2NhbGVcbiAgICAgICAgICAgIC8vIEZvcm1hdHRlZCBudW1lcmljYWwgb3V0cHV0IGlzIHJlbmRlcmVkIHVzaW5nIGB0b0xvY2FsZVN0cmluZ2BcbiAgICAgICAgICAgIC8vIGFuZCB0aGUgbG9jYWxlIG9mIHRoZSB1c2VyJ3MgZW52aXJvbm1lbnQuIFNldCB0aGlzIG9wdGlvbiB0byByZW5kZXJcbiAgICAgICAgICAgIC8vIG51bWVyaWNhbCBvdXRwdXQgdXNpbmcgYSBkaWZmZXJlbnQgbG9jYWxlLiBVbml0IG5hbWVzIGFyZSByZW5kZXJlZFxuICAgICAgICAgICAgLy8gYW5kIGRldGVjdGVkIHVzaW5nIHRoZSBsb2NhbGUgc2V0IGluIG1vbWVudC5qcywgd2hpY2ggY2FuIGJlIGRpZmZlcmVudFxuICAgICAgICAgICAgLy8gZnJvbSB0aGUgbG9jYWxlIG9mIHVzZXIncyBlbnZpcm9ubWVudC5cbiAgICAgICAgICAgIHVzZXJMb2NhbGU6IG51bGwsXG5cbiAgICAgICAgICAgIC8vIHVzZVBsdXJhbFxuICAgICAgICAgICAgLy8gV2lsbCBhdXRvbWF0aWNhbGx5IHNpbmd1bGFyaXplIG9yIHBsdXJhbGl6ZSB1bml0IG5hbWVzIHdoZW4gdGhleVxuICAgICAgICAgICAgLy8gYXBwZWFyIGluIHRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCBlYWNoIG1vbWVudCB0b2tlbi4gU3RhbmRhcmQgYW5kXG4gICAgICAgICAgICAvLyBzaG9ydCB1bml0IGxhYmVscyBhcmUgc2luZ3VsYXJpemVkIGFuZCBwbHVyYWxpemVkLCBiYXNlZCBvbiBsb2NhbGUuXG4gICAgICAgICAgICAvLyBlLmcuIGluIGVuZ2xpc2gsIFwiMSBzZWNvbmRcIiBvciBcIjEgc2VjXCIgd291bGQgYmUgcmVuZGVyZWQgaW5zdGVhZFxuICAgICAgICAgICAgLy8gb2YgXCIxIHNlY29uZHNcIiBvciBcIjEgc2Vjc1wiLiBUaGUgZGVmYXVsdCBwbHVyYWxpemF0aW9uIGZ1bmN0aW9uXG4gICAgICAgICAgICAvLyByZW5kZXJzIGEgcGx1cmFsIGxhYmVsIGZvciBhIHZhbHVlIHdpdGggZGVjaW1hbCBwcmVjaXNpb24uXG4gICAgICAgICAgICAvLyBlLmcuIFwiMS4wIHNlY29uZHNcIiBpcyBuZXZlciByZW5kZXJlZCBhcyBcIjEuMCBzZWNvbmRcIi5cbiAgICAgICAgICAgIC8vIExhYmVsIHR5cGVzIGFuZCBwbHVyYWxpemF0aW9uIGZ1bmN0aW9uIGFyZSBjb25maWd1cmFibGUgaW4gdGhlXG4gICAgICAgICAgICAvLyBsb2NhbGVEYXRhIGV4dGVuc2lvbnMuXG4gICAgICAgICAgICB1c2VQbHVyYWw6IHRydWUsXG5cbiAgICAgICAgICAgIC8vIHVzZUxlZnRVbml0c1xuICAgICAgICAgICAgLy8gVGhlIHRleHQgdG8gdGhlIHJpZ2h0IG9mIGVhY2ggbW9tZW50IHRva2VuIGluIGEgZm9ybWF0IHN0cmluZ1xuICAgICAgICAgICAgLy8gaXMgdHJlYXRlZCBhcyB0aGF0IHRva2VuJ3MgdW5pdHMgZm9yIHRoZSBwdXJwb3NlcyBvZiB0cmltbWluZyxcbiAgICAgICAgICAgIC8vIHNpbmd1bGFyaXppbmcsIGFuZCBhdXRvLWxvY2FsaXppbmcuXG4gICAgICAgICAgICAvLyBlLmcuIFwiaCBbaG91cnNdLCBtIFttaW51dGVzXSwgcyBbc2Vjb25kc11cIi5cbiAgICAgICAgICAgIC8vIFRvIHByb3Blcmx5IHNpbmd1bGFyaXplIG9yIGxvY2FsaXplIGEgZm9ybWF0IHN0cmluZyBzdWNoIGFzXG4gICAgICAgICAgICAvLyBcIltob3Vyc10gaCwgW21pbnV0ZXNdIG0sIFtzZWNvbmRzXSBzXCIsIHdoZXJlIHRoZSB1bml0cyBhcHBlYXJcbiAgICAgICAgICAgIC8vIHRvIHRoZSBsZWZ0IG9mIGVhY2ggbW9tZW50IHRva2VuLCBzZXQgdXNlTGVmdFVuaXRzIHRvIGB0cnVlYC5cbiAgICAgICAgICAgIC8vIFRoaXMgcGx1Z2luIGlzIG5vdCB0ZXN0ZWQgaW4gdGhlIGNvbnRleHQgb2YgcnRsIHRleHQuXG4gICAgICAgICAgICB1c2VMZWZ0VW5pdHM6IGZhbHNlLFxuXG4gICAgICAgICAgICAvLyB1c2VHcm91cGluZ1xuICAgICAgICAgICAgLy8gRW5hYmxlcyBsb2NhbGUtYmFzZWQgZGlnaXQgZ3JvdXBpbmcgaW4gdGhlIGZvcm1hdHRlZCBvdXRwdXQuIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9OdW1iZXIvdG9Mb2NhbGVTdHJpbmdcbiAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuXG4gICAgICAgICAgICAvLyB1c2VTaWduaWZpY2FudERpZ2l0c1xuICAgICAgICAgICAgLy8gVHJlYXQgdGhlIGBwcmVjaXNpb25gIG9wdGlvbiBhcyB0aGUgbWF4aW11bSBzaWduaWZpY2FudCBkaWdpdHNcbiAgICAgICAgICAgIC8vIHRvIGJlIHJlbmRlcmVkLiBQcmVjaXNpb24gbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIuIFNpZ25pZmljYW50XG4gICAgICAgICAgICAvLyBkaWdpdHMgZXh0ZW5kIGFjcm9zcyB1bml0IHR5cGVzLFxuICAgICAgICAgICAgLy8gZS5nLiBcIjYgaG91cnMgMzcuNSBtaW51dGVzXCIgcmVwcmVzZW50cyA0IHNpZ25pZmljYW50IGRpZ2l0cy5cbiAgICAgICAgICAgIC8vIEVuYWJsaW5nIHRoaXMgb3B0aW9uIGNhdXNlcyB0b2tlbiBsZW5ndGggdG8gYmUgaWdub3JlZC4gU2VlICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9OdW1iZXIvdG9Mb2NhbGVTdHJpbmdcbiAgICAgICAgICAgIHVzZVNpZ25pZmljYW50RGlnaXRzOiBmYWxzZSxcblxuICAgICAgICAgICAgLy8gdGVtcGxhdGVcbiAgICAgICAgICAgIC8vIFRoZSB0ZW1wbGF0ZSBzdHJpbmcgdXNlZCB0byBmb3JtYXQgdGhlIGR1cmF0aW9uLiBNYXkgYmUgYSBmdW5jdGlvblxuICAgICAgICAgICAgLy8gb3IgYSBzdHJpbmcuIFRlbXBsYXRlIGZ1bmN0aW9ucyBhcmUgZXhlY3V0ZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmdcbiAgICAgICAgICAgIC8vIG9mIHRoZSBzZXR0aW5ncyBvYmplY3Qgc28gdGhhdCB0ZW1wbGF0ZSBzdHJpbmdzIG1heSBiZSBkeW5hbWljYWxseVxuICAgICAgICAgICAgLy8gZ2VuZXJhdGVkIGJhc2VkIG9uIHRoZSBkdXJhdGlvbiBvYmplY3QgKGFjY2Vzc2libGUgdmlhIGB0aGlzLmR1cmF0aW9uYClcbiAgICAgICAgICAgIC8vIG9yIGFueSBvZiB0aGUgb3RoZXIgc2V0dGluZ3MuIExlYWRpbmcgYW5kIHRyYWlsaW5nIHNwYWNlLCBjb21tYSxcbiAgICAgICAgICAgIC8vIHBlcmlvZCwgYW5kIGNvbG9uIGNoYXJhY3RlcnMgYXJlIHRyaW1tZWQgZnJvbSB0aGUgcmVzdWx0aW5nIHN0cmluZy5cbiAgICAgICAgICAgIHRlbXBsYXRlOiBkZWZhdWx0Rm9ybWF0VGVtcGxhdGUsXG5cbiAgICAgICAgICAgIC8vIHVzZVRvTG9jYWxlU3RyaW5nXG4gICAgICAgICAgICAvLyBTZXQgdGhpcyBvcHRpb24gdG8gYGZhbHNlYCB0byBpZ25vcmUgdGhlIGB0b0xvY2FsZVN0cmluZ2AgZmVhdHVyZVxuICAgICAgICAgICAgLy8gdGVzdCBhbmQgZm9yY2UgdGhlIHVzZSBvZiB0aGUgYGZvcm1hdE51bWJlcmAgZmFsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgICAgIC8vIGluY2x1ZGVkIGluIHRoaXMgcGx1Z2luLlxuICAgICAgICAgICAgdXNlVG9Mb2NhbGVTdHJpbmc6IHRydWUsXG5cbiAgICAgICAgICAgIC8vIGZvcm1hdE51bWJlciBmYWxsYmFjayBvcHRpb25zLlxuICAgICAgICAgICAgLy8gV2hlbiBgdG9Mb2NhbGVTdHJpbmdgIGlzIGRldGVjdGVkIGFuZCBwYXNzZXMgdGhlIGZlYXR1cmUgdGVzdCwgdGhlXG4gICAgICAgICAgICAvLyBmb2xsb3dpbmcgb3B0aW9ucyB3aWxsIGhhdmUgbm8gZWZmZWN0OiBgdG9Mb2NhbGVTdHJpbmdgIHdpbGwgYmUgdXNlZFxuICAgICAgICAgICAgLy8gZm9yIGZvcm1hdHRpbmcgYW5kIHRoZSBncm91cGluZyBzZXBhcmF0b3IsIGRlY2ltYWwgc2VwYXJhdG9yLCBhbmRcbiAgICAgICAgICAgIC8vIGludGVnZXIgZGlnaXQgZ3JvdXBpbmcgd2lsbCBiZSBkZXRlcm1pbmVkIGJ5IHRoZSB1c2VyIGxvY2FsZS5cblxuICAgICAgICAgICAgLy8gZ3JvdXBpbmdTZXBhcmF0b3JcbiAgICAgICAgICAgIC8vIFRoZSBpbnRlZ2VyIGRpZ2l0IGdyb3VwaW5nIHNlcGFyYXRvciB1c2VkIHdoZW4gdXNpbmcgdGhlIGZhbGxiYWNrXG4gICAgICAgICAgICAvLyBmb3JtYXROdW1iZXIgZnVuY3Rpb24uXG4gICAgICAgICAgICBncm91cGluZ1NlcGFyYXRvcjogXCIsXCIsXG5cbiAgICAgICAgICAgIC8vIGRlY2ltYWxTZXBhcmF0b3JcbiAgICAgICAgICAgIC8vIFRoZSBkZWNpbWFsIHNlcGFyYXRvciB1c2VkIHdoZW4gdXNpbmcgdGhlIGZhbGxiYWNrIGZvcm1hdE51bWJlclxuICAgICAgICAgICAgLy8gZnVuY3Rpb24uXG4gICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBcIi5cIixcblxuICAgICAgICAgICAgLy8gZ3JvdXBpbmdcbiAgICAgICAgICAgIC8vIFRoZSBpbnRlZ2VyIGRpZ2l0IGdyb3VwaW5nIHVzZWQgd2hlbiB1c2luZyB0aGUgZmFsbGJhY2sgZm9ybWF0TnVtYmVyXG4gICAgICAgICAgICAvLyBmdW5jdGlvbi4gTXVzdCBiZSBhbiBhcnJheS4gVGhlIGRlZmF1bHQgdmFsdWUgb2YgYFszXWAgZ2l2ZXMgdGhlXG4gICAgICAgICAgICAvLyBzdGFuZGFyZCAzLWRpZ2l0IHRob3VzYW5kL21pbGxpb24vYmlsbGlvbiBkaWdpdCBncm91cGluZ3MgZm9yIHRoZVxuICAgICAgICAgICAgLy8gXCJlblwiIGxvY2FsZS4gU2V0dGluZyB0aGlzIG9wdGlvbiB0byBgWzMsIDJdYCB3b3VsZCBnZW5lcmF0ZSB0aGVcbiAgICAgICAgICAgIC8vIHRob3VzYW5kL2xha2gvY3JvcmUgZGlnaXQgZ3JvdXBpbmdzIHVzZWQgaW4gdGhlIFwiZW4tSU5cIiBsb2NhbGUuXG4gICAgICAgICAgICBncm91cGluZzogWzNdXG4gICAgICAgIH07XG5cbiAgICAgICAgY29udGV4dC51cGRhdGVMb2NhbGUoJ2VuJywgZW5nTG9jYWxlKTtcbiAgICB9XG5cbiAgICAvLyBSdW4gZmVhdHVyZSB0ZXN0cyBmb3IgYE51bWJlciN0b0xvY2FsZVN0cmluZ2AuXG4gICAgdmFyIHRvTG9jYWxlU3RyaW5nRm9ybWF0dGVyID0gZnVuY3Rpb24obnVtYmVyLCBsb2NhbGUsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG51bWJlci50b0xvY2FsZVN0cmluZyhsb2NhbGUsIG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICB0b0xvY2FsZVN0cmluZ1dvcmtzID0gdG9Mb2NhbGVTdHJpbmdTdXBwb3J0c0xvY2FsZXMoKSAmJiBmZWF0dXJlVGVzdEZvcm1hdHRlcih0b0xvY2FsZVN0cmluZ0Zvcm1hdHRlcik7XG4gICAgdG9Mb2NhbGVTdHJpbmdSb3VuZGluZ1dvcmtzID0gdG9Mb2NhbGVTdHJpbmdXb3JrcyAmJiBmZWF0dXJlVGVzdEZvcm1hdHRlclJvdW5kaW5nKHRvTG9jYWxlU3RyaW5nRm9ybWF0dGVyKTtcblxuICAgIC8vIFJ1biBmZWF0dXJlIHRlc3RzIGZvciBgSW50bC5OdW1iZXJGb3JtYXQjZm9ybWF0YC5cbiAgICB2YXIgaW50bE51bWJlckZvcm1hdEZvcm1hdHRlciA9IGZ1bmN0aW9uKG51bWJlciwgbG9jYWxlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgJiYgd2luZG93LkludGwgJiYgd2luZG93LkludGwuTnVtYmVyRm9ybWF0KSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LkludGwuTnVtYmVyRm9ybWF0KGxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KG51bWJlcik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaW50bE51bWJlckZvcm1hdFdvcmtzID0gZmVhdHVyZVRlc3RGb3JtYXR0ZXIoaW50bE51bWJlckZvcm1hdEZvcm1hdHRlcik7XG4gICAgaW50bE51bWJlckZvcm1hdFJvdW5kaW5nV29ya3MgPSBpbnRsTnVtYmVyRm9ybWF0V29ya3MgJiYgZmVhdHVyZVRlc3RGb3JtYXR0ZXJSb3VuZGluZyhpbnRsTnVtYmVyRm9ybWF0Rm9ybWF0dGVyKTtcblxuICAgIC8vIEluaXRpYWxpemUgZHVyYXRpb24gZm9ybWF0IG9uIHRoZSBnbG9iYWwgbW9tZW50IGluc3RhbmNlLlxuICAgIGluaXQobW9tZW50KTtcblxuICAgIC8vIFJldHVybiB0aGUgaW5pdCBmdW5jdGlvbiBzbyB0aGF0IGR1cmF0aW9uIGZvcm1hdCBjYW4gYmVcbiAgICAvLyBpbml0aWFsaXplZCBvbiBvdGhlciBtb21lbnQgaW5zdGFuY2VzLlxuICAgIHJldHVybiBpbml0O1xufSk7XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG4gIHZhciBoYXMgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG5cbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKGhhcyh0eXBlU3BlY3MsIHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIGVyciA9IEVycm9yKFxuICAgICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6ICcgKyBsb2NhdGlvbiArICcgdHlwZSBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7ICcgK1xuICAgICAgICAgICAgICAnaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCcgKyB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gKyAnYC4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgJiYgIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICcgK1xuICAgICAgICAgICAgbG9jYXRpb24gKyAnIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAnICsgdHlwZW9mIGVycm9yICsgJy4gJyArXG4gICAgICAgICAgICAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICtcbiAgICAgICAgICAgICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc3RhY2sgPSBnZXRTdGFjayA/IGdldFN0YWNrKCkgOiAnJztcblxuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICdGYWlsZWQgJyArIGxvY2F0aW9uICsgJyB0eXBlOiAnICsgZXJyb3IubWVzc2FnZSArIChzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmVzZXRzIHdhcm5pbmcgY2FjaGUgd2hlbiB0ZXN0aW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmNoZWNrUHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlID0gZnVuY3Rpb24oKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1Byb3BUeXBlcztcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG52YXIgaGFzID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG5mdW5jdGlvbiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGVsZW1lbnRUeXBlOiBjcmVhdGVFbGVtZW50VHlwZVR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyLFxuICAgIGV4YWN0OiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyLFxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gT2xkIGJlaGF2aW9yIGZvciBwZW9wbGUgdXNpbmcgUmVhY3QuUHJvcFR5cGVzXG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gJiZcbiAgICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPCAzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBwcm9wIG9uIGAnICsgY29tcG9uZW50TmFtZSAgKyAnYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgK1xuICAgICAgICAgICAgICAnYW5kIHdpbGwgdGhyb3cgaW4gdGhlIHN0YW5kYWxvbmUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICtcbiAgICAgICAgICAgICAgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIVJlYWN0SXMuaXNWYWxpZEVsZW1lbnRUeXBlKHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50IHR5cGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudHMgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGFycmF5LCBnb3QgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIGFyZ3VtZW50cy4gJyArXG4gICAgICAgICAgICAnQSBjb21tb24gbWlzdGFrZSBpcyB0byB3cml0ZSBvbmVPZih4LCB5LCB6KSBpbnN0ZWFkIG9mIG9uZU9mKFt4LCB5LCB6XSkuJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBhcnJheS4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMsIGZ1bmN0aW9uIHJlcGxhY2VyKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlID09PSAnc3ltYm9sJykge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIFN0cmluZyhwcm9wVmFsdWUpICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgIGlmIChoYXMocHJvcFZhbHVlLCBrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAnICsgZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKGNoZWNrZXIpICsgJyBhdCBpbmRleCAnICsgaSArICcuJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gZmFsc3kgdmFsdWUgY2FuJ3QgYmUgYSBTeW1ib2xcbiAgICBpZiAoIXByb3BWYWx1ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlID0gY2hlY2tQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGU7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKFJlYWN0SXMuaXNFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuMTIuMFxuICogcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cblxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIChmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50LWxpa2UgdHlwZXMuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cbnZhciBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3I7XG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIDogMHhlYWM3O1xudmFyIFJFQUNUX1BPUlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucG9ydGFsJykgOiAweGVhY2E7XG52YXIgUkVBQ1RfRlJBR01FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZyYWdtZW50JykgOiAweGVhY2I7XG52YXIgUkVBQ1RfU1RSSUNUX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN0cmljdF9tb2RlJykgOiAweGVhY2M7XG52YXIgUkVBQ1RfUFJPRklMRVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb2ZpbGVyJykgOiAweGVhZDI7XG52YXIgUkVBQ1RfUFJPVklERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb3ZpZGVyJykgOiAweGVhY2Q7XG52YXIgUkVBQ1RfQ09OVEVYVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29udGV4dCcpIDogMHhlYWNlOyAvLyBUT0RPOiBXZSBkb24ndCB1c2UgQXN5bmNNb2RlIG9yIENvbmN1cnJlbnRNb2RlIGFueW1vcmUuIFRoZXkgd2VyZSB0ZW1wb3Jhcnlcbi8vICh1bnN0YWJsZSkgQVBJcyB0aGF0IGhhdmUgYmVlbiByZW1vdmVkLiBDYW4gd2UgcmVtb3ZlIHRoZSBzeW1ib2xzP1xuXG52YXIgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuYXN5bmNfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29uY3VycmVudF9tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJykgOiAweGVhZDA7XG52YXIgUkVBQ1RfU1VTUEVOU0VfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlJykgOiAweGVhZDE7XG52YXIgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2VfbGlzdCcpIDogMHhlYWQ4O1xudmFyIFJFQUNUX01FTU9fVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0Lm1lbW8nKSA6IDB4ZWFkMztcbnZhciBSRUFDVF9MQVpZX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5sYXp5JykgOiAweGVhZDQ7XG52YXIgUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZ1bmRhbWVudGFsJykgOiAweGVhZDU7XG52YXIgUkVBQ1RfUkVTUE9OREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5yZXNwb25kZXInKSA6IDB4ZWFkNjtcbnZhciBSRUFDVF9TQ09QRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc2NvcGUnKSA6IDB4ZWFkNztcblxuZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCAvLyBOb3RlOiBpdHMgdHlwZW9mIG1pZ2h0IGJlIG90aGVyIHRoYW4gJ3N5bWJvbCcgb3IgJ251bWJlcicgaWYgaXQncyBhIHBvbHlmaWxsLlxuICB0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSB8fCB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCAmJiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTEFaWV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9QUk9WSURFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0NPTlRFWFRfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZVTkRBTUVOVEFMX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUkVTUE9OREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfU0NPUEVfVFlQRSk7XG59XG5cbi8qKlxuICogRm9ya2VkIGZyb20gZmJqcy93YXJuaW5nOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2ZianMvYmxvYi9lNjZiYTIwYWQ1YmU0MzNlYjU0NDIzZjJiMDk3ZDgyOTMyNGQ5ZGU2L3BhY2thZ2VzL2ZianMvc3JjL19fZm9ya3NfXy93YXJuaW5nLmpzXG4gKlxuICogT25seSBjaGFuZ2UgaXMgd2UgdXNlIGNvbnNvbGUud2FybiBpbnN0ZWFkIG9mIGNvbnNvbGUuZXJyb3IsXG4gKiBhbmQgZG8gbm90aGluZyB3aGVuICdjb25zb2xlJyBpcyBub3Qgc3VwcG9ydGVkLlxuICogVGhpcyByZWFsbHkgc2ltcGxpZmllcyB0aGUgY29kZS5cbiAqIC0tLVxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG52YXIgbG93UHJpb3JpdHlXYXJuaW5nV2l0aG91dFN0YWNrID0gZnVuY3Rpb24gKCkge307XG5cbntcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICBsb3dQcmlvcml0eVdhcm5pbmdXaXRob3V0U3RhY2sgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYGxvd1ByaW9yaXR5V2FybmluZ1dpdGhvdXRTdGFjayhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHZvaWQgMCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmdXaXRob3V0U3RhY2skMSA9IGxvd1ByaW9yaXR5V2FybmluZ1dpdGhvdXRTdGFjaztcblxuZnVuY3Rpb24gdHlwZU9mKG9iamVjdCkge1xuICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsKSB7XG4gICAgdmFyICQkdHlwZW9mID0gb2JqZWN0LiQkdHlwZW9mO1xuXG4gICAgc3dpdGNoICgkJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9FTEVNRU5UX1RZUEU6XG4gICAgICAgIHZhciB0eXBlID0gb2JqZWN0LnR5cGU7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgY2FzZSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0ZSQUdNRU5UX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1RSSUNUX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICAgICAgICByZXR1cm4gdHlwZTtcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgJCR0eXBlb2ZUeXBlID0gdHlwZSAmJiB0eXBlLiQkdHlwZW9mO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKCQkdHlwZW9mVHlwZSkge1xuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2ZUeXBlO1xuXG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgICAgcmV0dXJuICQkdHlwZW9mO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59IC8vIEFzeW5jTW9kZSBpcyBkZXByZWNhdGVkIGFsb25nIHdpdGggaXNBc3luY01vZGVcblxudmFyIEFzeW5jTW9kZSA9IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbnZhciBDb25jdXJyZW50TW9kZSA9IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFO1xudmFyIENvbnRleHRDb25zdW1lciA9IFJFQUNUX0NPTlRFWFRfVFlQRTtcbnZhciBDb250ZXh0UHJvdmlkZXIgPSBSRUFDVF9QUk9WSURFUl9UWVBFO1xudmFyIEVsZW1lbnQgPSBSRUFDVF9FTEVNRU5UX1RZUEU7XG52YXIgRm9yd2FyZFJlZiA9IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG52YXIgRnJhZ21lbnQgPSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xudmFyIExhenkgPSBSRUFDVF9MQVpZX1RZUEU7XG52YXIgTWVtbyA9IFJFQUNUX01FTU9fVFlQRTtcbnZhciBQb3J0YWwgPSBSRUFDVF9QT1JUQUxfVFlQRTtcbnZhciBQcm9maWxlciA9IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG52YXIgU3RyaWN0TW9kZSA9IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG52YXIgU3VzcGVuc2UgPSBSRUFDVF9TVVNQRU5TRV9UWVBFO1xudmFyIGhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlID0gZmFsc2U7IC8vIEFzeW5jTW9kZSBzaG91bGQgYmUgZGVwcmVjYXRlZFxuXG5mdW5jdGlvbiBpc0FzeW5jTW9kZShvYmplY3QpIHtcbiAge1xuICAgIGlmICghaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUpIHtcbiAgICAgIGhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlID0gdHJ1ZTtcbiAgICAgIGxvd1ByaW9yaXR5V2FybmluZ1dpdGhvdXRTdGFjayQxKGZhbHNlLCAnVGhlIFJlYWN0SXMuaXNBc3luY01vZGUoKSBhbGlhcyBoYXMgYmVlbiBkZXByZWNhdGVkLCAnICsgJ2FuZCB3aWxsIGJlIHJlbW92ZWQgaW4gUmVhY3QgMTcrLiBVcGRhdGUgeW91ciBjb2RlIHRvIHVzZSAnICsgJ1JlYWN0SXMuaXNDb25jdXJyZW50TW9kZSgpIGluc3RlYWQuIEl0IGhhcyB0aGUgZXhhY3Qgc2FtZSBBUEkuJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB8fCB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dENvbnN1bWVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTlRFWFRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dFByb3ZpZGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST1ZJREVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZvcndhcmRSZWYob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRnJhZ21lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTGF6eShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9MQVpZX1RZUEU7XG59XG5mdW5jdGlvbiBpc01lbW8ob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTUVNT19UWVBFO1xufVxuZnVuY3Rpb24gaXNQb3J0YWwob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUE9SVEFMX1RZUEU7XG59XG5mdW5jdGlvbiBpc1Byb2ZpbGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N0cmljdE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3VzcGVuc2Uob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbn1cblxuZXhwb3J0cy50eXBlT2YgPSB0eXBlT2Y7XG5leHBvcnRzLkFzeW5jTW9kZSA9IEFzeW5jTW9kZTtcbmV4cG9ydHMuQ29uY3VycmVudE1vZGUgPSBDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuQ29udGV4dENvbnN1bWVyID0gQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5Db250ZXh0UHJvdmlkZXIgPSBDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLkVsZW1lbnQgPSBFbGVtZW50O1xuZXhwb3J0cy5Gb3J3YXJkUmVmID0gRm9yd2FyZFJlZjtcbmV4cG9ydHMuRnJhZ21lbnQgPSBGcmFnbWVudDtcbmV4cG9ydHMuTGF6eSA9IExhenk7XG5leHBvcnRzLk1lbW8gPSBNZW1vO1xuZXhwb3J0cy5Qb3J0YWwgPSBQb3J0YWw7XG5leHBvcnRzLlByb2ZpbGVyID0gUHJvZmlsZXI7XG5leHBvcnRzLlN0cmljdE1vZGUgPSBTdHJpY3RNb2RlO1xuZXhwb3J0cy5TdXNwZW5zZSA9IFN1c3BlbnNlO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGU7XG5leHBvcnRzLmlzQXN5bmNNb2RlID0gaXNBc3luY01vZGU7XG5leHBvcnRzLmlzQ29uY3VycmVudE1vZGUgPSBpc0NvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lciA9IGlzQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlciA9IGlzQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzRm9yd2FyZFJlZiA9IGlzRm9yd2FyZFJlZjtcbmV4cG9ydHMuaXNGcmFnbWVudCA9IGlzRnJhZ21lbnQ7XG5leHBvcnRzLmlzTGF6eSA9IGlzTGF6eTtcbmV4cG9ydHMuaXNNZW1vID0gaXNNZW1vO1xuZXhwb3J0cy5pc1BvcnRhbCA9IGlzUG9ydGFsO1xuZXhwb3J0cy5pc1Byb2ZpbGVyID0gaXNQcm9maWxlcjtcbmV4cG9ydHMuaXNTdHJpY3RNb2RlID0gaXNTdHJpY3RNb2RlO1xuZXhwb3J0cy5pc1N1c3BlbnNlID0gaXNTdXNwZW5zZTtcbiAgfSkoKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAoX19ERVZfXykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMSA/IGxlbiAtIDEgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAxOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDFdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkobnVsbCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJoZWxwZXJzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcImkxOG5cIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsaWRhdG9yc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIndwXCJdW1wiZWxlbWVudFwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIndwXCJdW1wiaXNTaGFsbG93RXF1YWxcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJsb2Rhc2hcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJtb21lbnRcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmVuZG9yXCJdW1wibW9tZW50XCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
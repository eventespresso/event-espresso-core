this["eejs"] = this["eejs"] || {}; this["eejs"]["utils"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/utils/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/utils/amounts-match.js":
/*!*******************************************!*\
  !*** ./assets/src/utils/amounts-match.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @function
 * @param {number|string} v1
 * @param {number|string} v2
 * @return {boolean} true if values match after conversion to float
 */
var amountsMatch = function amountsMatch(v1, v2) {
  return parseFloat(v1) === parseFloat(v2);
};

/* harmony default export */ __webpack_exports__["default"] = (amountsMatch);

/***/ }),

/***/ "./assets/src/utils/cancel-click-event.js":
/*!************************************************!*\
  !*** ./assets/src/utils/cancel-click-event.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

var _window = window,
    console = _window.console;
/**
 * utility for blocking click events
 * and displaying debug data in dev environments
 *
 * @function
 * @param {Object} click - DOM click event
 * @param {string} source - where click originated
 */

var cancelClickEvent = function cancelClickEvent(click) {
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (click && typeof click.preventDefault === 'function') {
    click.preventDefault();
    click.stopPropagation();

    if (_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["__DEV__"] && source !== '') {
      console.log('%c >> CLICK <<', 'font-size: 13px; color: yellow;', source, click);
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (cancelClickEvent);

/***/ }),

/***/ "./assets/src/utils/get-server-date-time.js":
/*!**************************************************!*\
  !*** ./assets/src/utils/get-server-date-time.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/value-objects */ "@eventespresso/value-objects");
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External imports
 */


/**
 * attempts to create a ServerDateTime object from the provided value
 *
 * @function
 * @param {Date|moment|number|ServerDateTime|string} newDateValue
 * @return {ServerDateTime} valid date object
 */

var getServerDateTime = function getServerDateTime(newDateValue) {
  if (newDateValue instanceof _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_1__["ServerDateTime"]) {
    return newDateValue;
  }

  if (newDateValue instanceof Date) {
    return _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_1__["ServerDateTime"].fromJSDate(newDateValue);
  }

  if (typeof newDateValue === 'string') {
    var newDate = new Date(newDateValue);

    if (newDate instanceof Date) {
      return _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_1__["ServerDateTime"].fromJSDate(newDate);
    }
  }

  var newDateValueInt = parseInt(newDateValue, 10);

  if (newDateValueInt) {
    return _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_1__["ServerDateTime"].fromUnix(newDateValue);
  }

  if (moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.isMoment(newDateValue)) {
    return _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_1__["ServerDateTime"].fromMoment(newDateValue);
  }

  throw new TypeError('Could not create a ServerDateTime object because an invalid' + ' value was supplied to getServerDateTime');
};

/* harmony default export */ __webpack_exports__["default"] = (getServerDateTime);

/***/ }),

/***/ "./assets/src/utils/index.js":
/*!***********************************!*\
  !*** ./assets/src/utils/index.js ***!
  \***********************************/
/*! exports provided: amountsMatch, cancelClickEvent, getServerDateTime, parseHtmlPlaceholders, parseInfinity, parseMoneyValue, shortenCuid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _amounts_match__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./amounts-match */ "./assets/src/utils/amounts-match.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "amountsMatch", function() { return _amounts_match__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _cancel_click_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cancel-click-event */ "./assets/src/utils/cancel-click-event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelClickEvent", function() { return _cancel_click_event__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _get_server_date_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-server-date-time */ "./assets/src/utils/get-server-date-time.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getServerDateTime", function() { return _get_server_date_time__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _parse_html_placeholders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parse-html-placeholders */ "./assets/src/utils/parse-html-placeholders.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseHtmlPlaceholders", function() { return _parse_html_placeholders__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _parse_infinity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parse-infinity */ "./assets/src/utils/parse-infinity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseInfinity", function() { return _parse_infinity__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _parse_money_value__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parse-money-value */ "./assets/src/utils/parse-money-value.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseMoneyValue", function() { return _parse_money_value__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _shorten_cuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shorten-cuid */ "./assets/src/utils/shorten-cuid.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shortenCuid", function() { return _shorten_cuid__WEBPACK_IMPORTED_MODULE_6__["default"]; });









/***/ }),

/***/ "./assets/src/utils/parse-html-placeholders.js":
/*!*****************************************************!*\
  !*** ./assets/src/utils/parse-html-placeholders.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

var PLACEHOLDER = '%%var%%';
/**
 * kinda like a weaker version of sprintf that won't choke on HTML elements
 *
 * @function
 * @param {string} placeholderText
 * @param {Array} replacements
 * @return {string} text with placeholders replaced by variables
 */

var parseHtmlPlaceholders = function parseHtmlPlaceholders(placeholderText, replacements) {
  if (Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isEmpty"])(replacements) || !placeholderText.includes(PLACEHOLDER)) {
    return placeholderText;
  }

  if (!Array.isArray(replacements)) {
    replacements = [replacements];
  }

  var finalText = [];
  var chunks = placeholderText.split(PLACEHOLDER);

  if (chunks.length - replacements.length !== 1) {
    throw new RangeError('The number of text placeholders does not match' + ' the number of replacement strings supplied.');
  }

  chunks.forEach(function (chunk, index) {
    finalText.push(chunk);

    if (replacements[index]) {
      finalText.push(replacements[index]);
    }
  });
  return finalText.join('');
};

/* harmony default export */ __webpack_exports__["default"] = (parseHtmlPlaceholders);

/***/ }),

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
  number = number !== Infinity && asInt ? parseInt(number, 10) : number; // not infinity OR is infinity but not for db

  number = number !== Infinity || number === Infinity && !forDb ? number : -1;
  return number;
};

/* harmony default export */ __webpack_exports__["default"] = (parseInfinity);

/***/ }),

/***/ "./assets/src/utils/parse-money-value.js":
/*!***********************************************!*\
  !*** ./assets/src/utils/parse-money-value.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vo_currency__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vo/currency */ "./assets/src/vo/currency.js");
/**
 * External imports
 */

/**
 * @function
 * @param {number|string} moneyValue
 * @return {number} money value
 */

var parseMoneyValue = function parseMoneyValue(moneyValue) {
  moneyValue = moneyValue && moneyValue.toString ? moneyValue.toString().replace(new RegExp(_vo_currency__WEBPACK_IMPORTED_MODULE_0__["default"].thousandsSeparator, 'g'), '').replace(_vo_currency__WEBPACK_IMPORTED_MODULE_0__["default"].sign, '') : 0;
  moneyValue = parseFloat(moneyValue);
  return !isNaN(moneyValue) ? moneyValue : 0;
};

/* harmony default export */ __webpack_exports__["default"] = (parseMoneyValue);

/***/ }),

/***/ "./assets/src/utils/shorten-cuid.js":
/*!******************************************!*\
  !*** ./assets/src/utils/shorten-cuid.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @function
 * @param {string} cuid
 * @param {number} start
 * @param {number} end
 * @return {string} cuid snippet
 */
var shortenCuid = function shortenCuid(cuid) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 18;

  if (cuid.hasOwnProperty('length') && cuid.length > end) {
    // use a smaller more unique portion of the CUID
    return cuid.substring(start, end);
  }

  return cuid;
};

/* harmony default export */ __webpack_exports__["default"] = (shortenCuid);

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

/***/ "@eventespresso/value-objects":
/*!*************************************************!*\
  !*** external {"this":["eejs","valueObjects"]} ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["valueObjects"]; }());

/***/ }),

/***/ "lodash":
/*!**********************************!*\
  !*** external {"this":"lodash"} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["lodash"]; }());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLnV0aWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL2Ftb3VudHMtbWF0Y2guanMiLCJ3ZWJwYWNrOi8vZWVqcy51dGlscy8uL2Fzc2V0cy9zcmMvdXRpbHMvY2FuY2VsLWNsaWNrLWV2ZW50LmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL2dldC1zZXJ2ZXItZGF0ZS10aW1lLmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL3BhcnNlLWh0bWwtcGxhY2Vob2xkZXJzLmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL3BhcnNlLWluZmluaXR5LmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL3BhcnNlLW1vbmV5LXZhbHVlLmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL3Nob3J0ZW4tY3VpZC5qcyIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzLy4vYXNzZXRzL3NyYy92by9jdXJyZW5jeS5qcyIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vZWVqcy51dGlscy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzLy4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvd2FybmluZy5qcyIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJ2YWx1ZU9iamVjdHNcIl19Iiwid2VicGFjazovL2VlanMudXRpbHMvZXh0ZXJuYWwge1widGhpc1wiOlwibG9kYXNoXCJ9Iiwid2VicGFjazovL2VlanMudXRpbHMvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZlbmRvclwiLFwibW9tZW50XCJdfSJdLCJuYW1lcyI6WyJhbW91bnRzTWF0Y2giLCJ2MSIsInYyIiwicGFyc2VGbG9hdCIsIndpbmRvdyIsImNvbnNvbGUiLCJjYW5jZWxDbGlja0V2ZW50IiwiY2xpY2siLCJzb3VyY2UiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsIl9fREVWX18iLCJsb2ciLCJnZXRTZXJ2ZXJEYXRlVGltZSIsIm5ld0RhdGVWYWx1ZSIsIlNlcnZlckRhdGVUaW1lIiwiRGF0ZSIsImZyb21KU0RhdGUiLCJuZXdEYXRlIiwibmV3RGF0ZVZhbHVlSW50IiwicGFyc2VJbnQiLCJmcm9tVW5peCIsIm1vbWVudCIsImlzTW9tZW50IiwiZnJvbU1vbWVudCIsIlR5cGVFcnJvciIsIlBMQUNFSE9MREVSIiwicGFyc2VIdG1sUGxhY2Vob2xkZXJzIiwicGxhY2Vob2xkZXJUZXh0IiwicmVwbGFjZW1lbnRzIiwiaXNFbXB0eSIsImluY2x1ZGVzIiwiQXJyYXkiLCJpc0FycmF5IiwiZmluYWxUZXh0IiwiY2h1bmtzIiwic3BsaXQiLCJsZW5ndGgiLCJSYW5nZUVycm9yIiwiZm9yRWFjaCIsImNodW5rIiwiaW5kZXgiLCJwdXNoIiwiam9pbiIsInBhcnNlSW5maW5pdHkiLCJudW1iZXIiLCJhc0ludCIsImZvckRiIiwicmVwcmVzZW50c0luZmluaXR5IiwidmFsdWUiLCJJbmZpbml0eSIsImlzTmlsIiwidHlwZSIsIm5hbWUiLCJwcm9wcyIsInBhcnNlTW9uZXlWYWx1ZSIsIm1vbmV5VmFsdWUiLCJ0b1N0cmluZyIsInJlcGxhY2UiLCJSZWdFeHAiLCJTaXRlQ3VycmVuY3kiLCJ0aG91c2FuZHNTZXBhcmF0b3IiLCJzaWduIiwiaXNOYU4iLCJzaG9ydGVuQ3VpZCIsImN1aWQiLCJzdGFydCIsImVuZCIsImhhc093blByb3BlcnR5Iiwic3Vic3RyaW5nIiwiQ3VycmVuY3kiLCJjdXJyZW5jeUNvbmZpZyIsInZhbGlkYXRlQ3VycmVuY3lDb25maWciLCJjb2RlIiwic2luZ3VsYXJMYWJlbCIsInBsdXJhbExhYmVsIiwic2lnbkI0IiwiaXNVbmRlZmluZWQiLCJkZWNpbWFsUGxhY2VzIiwiZGVjaW1hbE1hcmsiLCJzdWJ1bml0cyIsIk1hdGgiLCJwb3ciLCJPYmplY3QiLCJmcmVlemUiLCJkZWNpbWFsSW5mbyIsImRlY2ltYWwiLCJ0aG91c2FuZCIsInByZWNpc2lvbiIsImN1cnJlbmN5Iiwic3ltYm9sIiwiZm9ybWF0IiwicG9zIiwibmVnIiwiemVybyIsImNvbmZpZyIsIkV4Y2VwdGlvbiIsImlzU3RyaW5nIiwiaXNCb29sZWFuIiwiaXNOdW1iZXIiLCJlIiwid2FybmluZyIsIm1lc3NhZ2UiLCJDVVJSRU5DWV9DT05GSUciXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNy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QTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDN0RBLGFBQWEsK0JBQStCLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBOUMsYUFBYSwrQ0FBK0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E5RCxhQUFhLGlDQUFpQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQWhELGFBQWEsbURBQW1ELEVBQUUsSSIsImZpbGUiOiJldmVudGVzcHJlc3NvLXV0aWxzLjZkY2M2MzEzYTYxZjA4NTIyZWNmLmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9zcmMvdXRpbHMvaW5kZXguanNcIik7XG4iLCIvKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2MVxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2MlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB2YWx1ZXMgbWF0Y2ggYWZ0ZXIgY29udmVyc2lvbiB0byBmbG9hdFxuICovXG5jb25zdCBhbW91bnRzTWF0Y2ggPSAoIHYxLCB2MiApID0+IHBhcnNlRmxvYXQoIHYxICkgPT09IHBhcnNlRmxvYXQoIHYyICk7XG5cbmV4cG9ydCBkZWZhdWx0IGFtb3VudHNNYXRjaDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBfX0RFVl9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5cbmNvbnN0IHsgY29uc29sZSB9ID0gd2luZG93O1xuXG4vKipcbiAqIHV0aWxpdHkgZm9yIGJsb2NraW5nIGNsaWNrIGV2ZW50c1xuICogYW5kIGRpc3BsYXlpbmcgZGVidWcgZGF0YSBpbiBkZXYgZW52aXJvbm1lbnRzXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gY2xpY2sgLSBET00gY2xpY2sgZXZlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2UgLSB3aGVyZSBjbGljayBvcmlnaW5hdGVkXG4gKi9cbmNvbnN0IGNhbmNlbENsaWNrRXZlbnQgPSAoIGNsaWNrLCBzb3VyY2UgPSAnJyApID0+IHtcblx0aWYgKCBjbGljayAmJiB0eXBlb2YgY2xpY2sucHJldmVudERlZmF1bHQgPT09ICdmdW5jdGlvbicgKSB7XG5cdFx0Y2xpY2sucHJldmVudERlZmF1bHQoKTtcblx0XHRjbGljay5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRpZiAoIF9fREVWX18gJiYgc291cmNlICE9PSAnJyApIHtcblx0XHRcdGNvbnNvbGUubG9nKFxuXHRcdFx0XHQnJWMgPj4gQ0xJQ0sgPDwnLFxuXHRcdFx0XHQnZm9udC1zaXplOiAxM3B4OyBjb2xvcjogeWVsbG93OycsXG5cdFx0XHRcdHNvdXJjZSxcblx0XHRcdFx0Y2xpY2tcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjYW5jZWxDbGlja0V2ZW50O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCB7IFNlcnZlckRhdGVUaW1lIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsdWUtb2JqZWN0cyc7XG5cbi8qKlxuICogYXR0ZW1wdHMgdG8gY3JlYXRlIGEgU2VydmVyRGF0ZVRpbWUgb2JqZWN0IGZyb20gdGhlIHByb3ZpZGVkIHZhbHVlXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0RhdGV8bW9tZW50fG51bWJlcnxTZXJ2ZXJEYXRlVGltZXxzdHJpbmd9IG5ld0RhdGVWYWx1ZVxuICogQHJldHVybiB7U2VydmVyRGF0ZVRpbWV9IHZhbGlkIGRhdGUgb2JqZWN0XG4gKi9cbmNvbnN0IGdldFNlcnZlckRhdGVUaW1lID0gKCBuZXdEYXRlVmFsdWUgKSA9PiB7XG5cdGlmICggbmV3RGF0ZVZhbHVlIGluc3RhbmNlb2YgU2VydmVyRGF0ZVRpbWUgKSB7XG5cdFx0cmV0dXJuIG5ld0RhdGVWYWx1ZTtcblx0fVxuXHRpZiAoIG5ld0RhdGVWYWx1ZSBpbnN0YW5jZW9mIERhdGUgKSB7XG5cdFx0cmV0dXJuIFNlcnZlckRhdGVUaW1lLmZyb21KU0RhdGUoIG5ld0RhdGVWYWx1ZSApO1xuXHR9XG5cdGlmICggdHlwZW9mIG5ld0RhdGVWYWx1ZSA9PT0gJ3N0cmluZycgKSB7XG5cdFx0Y29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKCBuZXdEYXRlVmFsdWUgKTtcblx0XHRpZiAoIG5ld0RhdGUgaW5zdGFuY2VvZiBEYXRlICkge1xuXHRcdFx0cmV0dXJuIFNlcnZlckRhdGVUaW1lLmZyb21KU0RhdGUoIG5ld0RhdGUgKTtcblx0XHR9XG5cdH1cblx0Y29uc3QgbmV3RGF0ZVZhbHVlSW50ID0gcGFyc2VJbnQoIG5ld0RhdGVWYWx1ZSwgMTAgKTtcblx0aWYgKCBuZXdEYXRlVmFsdWVJbnQgKSB7XG5cdFx0cmV0dXJuIFNlcnZlckRhdGVUaW1lLmZyb21Vbml4KCBuZXdEYXRlVmFsdWUgKTtcblx0fVxuXHRpZiAoIG1vbWVudC5pc01vbWVudCggbmV3RGF0ZVZhbHVlICkgKSB7XG5cdFx0cmV0dXJuIFNlcnZlckRhdGVUaW1lLmZyb21Nb21lbnQoIG5ld0RhdGVWYWx1ZSApO1xuXHR9XG5cdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0J0NvdWxkIG5vdCBjcmVhdGUgYSBTZXJ2ZXJEYXRlVGltZSBvYmplY3QgYmVjYXVzZSBhbiBpbnZhbGlkJyArXG5cdFx0JyB2YWx1ZSB3YXMgc3VwcGxpZWQgdG8gZ2V0U2VydmVyRGF0ZVRpbWUnXG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXRTZXJ2ZXJEYXRlVGltZTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgYW1vdW50c01hdGNoIH0gZnJvbSAnLi9hbW91bnRzLW1hdGNoJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgY2FuY2VsQ2xpY2tFdmVudCB9IGZyb20gJy4vY2FuY2VsLWNsaWNrLWV2ZW50JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZ2V0U2VydmVyRGF0ZVRpbWUgfSBmcm9tICcuL2dldC1zZXJ2ZXItZGF0ZS10aW1lJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2VIdG1sUGxhY2Vob2xkZXJzIH0gZnJvbSAnLi9wYXJzZS1odG1sLXBsYWNlaG9sZGVycyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHBhcnNlSW5maW5pdHkgfSBmcm9tICcuL3BhcnNlLWluZmluaXR5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2VNb25leVZhbHVlIH0gZnJvbSAnLi9wYXJzZS1tb25leS12YWx1ZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHNob3J0ZW5DdWlkIH0gZnJvbSAnLi9zaG9ydGVuLWN1aWQnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBQTEFDRUhPTERFUiA9ICclJXZhciUlJztcblxuLyoqXG4gKiBraW5kYSBsaWtlIGEgd2Vha2VyIHZlcnNpb24gb2Ygc3ByaW50ZiB0aGF0IHdvbid0IGNob2tlIG9uIEhUTUwgZWxlbWVudHNcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclRleHRcbiAqIEBwYXJhbSB7QXJyYXl9IHJlcGxhY2VtZW50c1xuICogQHJldHVybiB7c3RyaW5nfSB0ZXh0IHdpdGggcGxhY2Vob2xkZXJzIHJlcGxhY2VkIGJ5IHZhcmlhYmxlc1xuICovXG5jb25zdCBwYXJzZUh0bWxQbGFjZWhvbGRlcnMgPSAoIHBsYWNlaG9sZGVyVGV4dCwgcmVwbGFjZW1lbnRzICkgPT4ge1xuXHRpZiAoXG5cdFx0aXNFbXB0eSggcmVwbGFjZW1lbnRzICkgfHxcblx0XHQhIHBsYWNlaG9sZGVyVGV4dC5pbmNsdWRlcyggUExBQ0VIT0xERVIgKVxuXHQpIHtcblx0XHRyZXR1cm4gcGxhY2Vob2xkZXJUZXh0O1xuXHR9XG5cdGlmICggISBBcnJheS5pc0FycmF5KCByZXBsYWNlbWVudHMgKSApIHtcblx0XHRyZXBsYWNlbWVudHMgPSBbIHJlcGxhY2VtZW50cyBdO1xuXHR9XG5cdGNvbnN0IGZpbmFsVGV4dCA9IFtdO1xuXHRjb25zdCBjaHVua3MgPSBwbGFjZWhvbGRlclRleHQuc3BsaXQoIFBMQUNFSE9MREVSICk7XG5cdGlmICggY2h1bmtzLmxlbmd0aCAtIHJlcGxhY2VtZW50cy5sZW5ndGggIT09IDEgKSB7XG5cdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoXG5cdFx0XHQnVGhlIG51bWJlciBvZiB0ZXh0IHBsYWNlaG9sZGVycyBkb2VzIG5vdCBtYXRjaCcgK1xuXHRcdFx0JyB0aGUgbnVtYmVyIG9mIHJlcGxhY2VtZW50IHN0cmluZ3Mgc3VwcGxpZWQuJ1xuXHRcdCk7XG5cdH1cblx0Y2h1bmtzLmZvckVhY2goICggY2h1bmssIGluZGV4ICkgPT4ge1xuXHRcdGZpbmFsVGV4dC5wdXNoKCBjaHVuayApO1xuXHRcdGlmICggcmVwbGFjZW1lbnRzWyBpbmRleCBdICkge1xuXHRcdFx0ZmluYWxUZXh0LnB1c2goIHJlcGxhY2VtZW50c1sgaW5kZXggXSApO1xuXHRcdH1cblx0fSApO1xuXHRyZXR1cm4gZmluYWxUZXh0LmpvaW4oICcnICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwYXJzZUh0bWxQbGFjZWhvbGRlcnM7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNOaWwgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIGNvbnZlcnRzIGluZmluaXRlIHZhbHVlcyB0byBudWxsIGZvciB1c2UgaW4gZm9ybXNcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVsbHxudW1iZXJ8c3RyaW5nfSBudW1iZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXNJbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9yRGJcbiAqIEByZXR1cm4ge251bWJlcn0gY29udmVydGVkIGluZmluaXRlIHZhbHVlXG4gKi9cbmNvbnN0IHBhcnNlSW5maW5pdHkgPSAoIG51bWJlciwgYXNJbnQgPSBmYWxzZSwgZm9yRGIgPSBmYWxzZSApID0+IHtcblx0Ly8gcmV0dXJucyB0cnVlIGZvciBhbnkgcG9zc2libGUgdmFsdWUgdGhhdCBjb3VsZCByZXByZXNlbnQgaW5maW5pdHlcblx0Y29uc3QgcmVwcmVzZW50c0luZmluaXR5ID0gKCB2YWx1ZSApID0+XG5cdFx0dmFsdWUgPT09IC0xIHx8XG5cdFx0dmFsdWUgPT09ICcnIHx8XG5cdFx0dmFsdWUgPT09ICdJTkYnIHx8XG5cdFx0dmFsdWUgPT09IEluZmluaXR5IHx8XG5cdFx0aXNOaWwoIHZhbHVlICk7XG5cdG51bWJlciA9IHJlcHJlc2VudHNJbmZpbml0eSggbnVtYmVyICkgfHwgKFxuXHRcdG51bWJlci50eXBlICYmXG5cdFx0bnVtYmVyLnR5cGUubmFtZSA9PT0gJ0luZmluaXR5U3ltYm9sJyAmJlxuXHRcdHJlcHJlc2VudHNJbmZpbml0eSggbnVtYmVyLnByb3BzLnZhbHVlIClcblx0KSA/XG5cdFx0SW5maW5pdHkgOlxuXHRcdG51bWJlcjtcblx0bnVtYmVyID0gbnVtYmVyICE9PSBJbmZpbml0eSAmJiBhc0ludCA/IHBhcnNlSW50KCBudW1iZXIsIDEwICkgOiBudW1iZXI7XG5cdC8vIG5vdCBpbmZpbml0eSBPUiBpcyBpbmZpbml0eSBidXQgbm90IGZvciBkYlxuXHRudW1iZXIgPSBudW1iZXIgIT09IEluZmluaXR5IHx8ICggbnVtYmVyID09PSBJbmZpbml0eSAmJiAhIGZvckRiICkgP1xuXHRcdG51bWJlciA6XG5cdFx0LTE7XG5cdHJldHVybiBudW1iZXI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwYXJzZUluZmluaXR5O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBTaXRlQ3VycmVuY3kgZnJvbSAnLi4vdm8vY3VycmVuY3knO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBtb25leVZhbHVlXG4gKiBAcmV0dXJuIHtudW1iZXJ9IG1vbmV5IHZhbHVlXG4gKi9cbmNvbnN0IHBhcnNlTW9uZXlWYWx1ZSA9ICggbW9uZXlWYWx1ZSApID0+IHtcblx0bW9uZXlWYWx1ZSA9IG1vbmV5VmFsdWUgJiYgbW9uZXlWYWx1ZS50b1N0cmluZyA/XG5cdFx0bW9uZXlWYWx1ZS50b1N0cmluZygpLnJlcGxhY2UoXG5cdFx0XHRuZXcgUmVnRXhwKCBTaXRlQ3VycmVuY3kudGhvdXNhbmRzU2VwYXJhdG9yLCAnZycgKSxcblx0XHRcdCcnXG5cdFx0KS5yZXBsYWNlKFxuXHRcdFx0U2l0ZUN1cnJlbmN5LnNpZ24sXG5cdFx0XHQnJ1xuXHRcdCkgOlxuXHRcdDA7XG5cdG1vbmV5VmFsdWUgPSBwYXJzZUZsb2F0KCBtb25leVZhbHVlICk7XG5cdHJldHVybiAhIGlzTmFOKCBtb25leVZhbHVlICkgPyBtb25leVZhbHVlIDogMDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlTW9uZXlWYWx1ZTtcbiIsIi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gY3VpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0XG4gKiBAcGFyYW0ge251bWJlcn0gZW5kXG4gKiBAcmV0dXJuIHtzdHJpbmd9IGN1aWQgc25pcHBldFxuICovXG5jb25zdCBzaG9ydGVuQ3VpZCA9ICggY3VpZCwgc3RhcnQgPSAxMiwgZW5kID0gMTggKSA9PiB7XG5cdGlmICggY3VpZC5oYXNPd25Qcm9wZXJ0eSggJ2xlbmd0aCcgKSAmJiBjdWlkLmxlbmd0aCA+IGVuZCApIHtcblx0XHQvLyB1c2UgYSBzbWFsbGVyIG1vcmUgdW5pcXVlIHBvcnRpb24gb2YgdGhlIENVSURcblx0XHRyZXR1cm4gY3VpZC5zdWJzdHJpbmcoIHN0YXJ0LCBlbmQgKTtcblx0fVxuXHRyZXR1cm4gY3VpZDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNob3J0ZW5DdWlkO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGlzRW1wdHksXG5cdGlzU3RyaW5nLFxuXHRpc051bWJlcixcblx0aXNCb29sZWFuLFxuXHRpc1VuZGVmaW5lZCxcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEV4Y2VwdGlvbiwgQ1VSUkVOQ1lfQ09ORklHIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcblxuLyoqXG4gKiBBIHZhbHVlIG9iamVjdCByZXByZXNlbnRpbmcgY3VycmVuY3kgdmFsdWVzXG4gKi9cbmV4cG9ydCBjbGFzcyBDdXJyZW5jeSB7XG5cdC8qKlxuXHQgKiBUaGUgSVNPIDQyMTcgY29kZSBpZGVudGlmeWluZyB0aGUgY3VycmVuY3kgKGVnLiAnVVNEJylcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGNvZGUgPSAnJztcblxuXHQvKipcblx0ICogVGhlIHNpbmd1bGFyIGxhYmVsIGZvciB0aGUgY3VycmVuY3kgKGVnLiAnRG9sbGFyJyk7XG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRzaW5ndWxhckxhYmVsID0gJyc7XG5cblx0LyoqXG5cdCAqIFRoZSBwbHVyYWwgbGFiZWwgZm9yIHRoZSBjdXJyZW5jeSAoZWcuICdEb2xsYXJzJyk7XG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRwbHVyYWxMYWJlbCA9ICcnO1xuXG5cdC8qKlxuXHQgKiBUaGUgY3VycmVuY3kgc3ltYm9sIChlZy4gJyQnKTtcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHNpZ24gPSAnJztcblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgY3VycmVuY3kgc3ltYm9sIGlzIGRpc3BsYXllZCBiZWZvcmUgb3IgYWZ0ZXIgdGhlIHZhbHVlLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHNpZ25CNCA9IHRydWU7XG5cblx0LyoqXG5cdCAqIFRoZSBwcmVjaXNpb24gZm9yIHRoZSB2YWx1ZSAoZWcuIDEwLjAyIGlzIDIsIDEwLjEyMyBpcyAzKS4gVGhlIG51bWJlciBvZlxuXHQgKiBkZWNpbWFsIHBsYWNlcyBjYW4gYmUgdXNlZCB0byBjYWxjdWxhdGUgdGhlIG51bWJlciBvZiBzdWJ1bml0cyBmb3IgdGhlXG5cdCAqIGN1cnJlbmN5IC0gc3VidW5pdHMgPSBwb3coIDEwLCBkZWNpbWFsUGxhY2VzKS5cblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdGRlY2ltYWxQbGFjZXMgPSAyO1xuXG5cdC8qKlxuXHQgKiBUaGUgc3ltYm9sIHVzZWQgZm9yIHRoZSBkZWNpbWFsIG1hcmsgKGVnLiAnLicpXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRkZWNpbWFsTWFyayA9ICcuJztcblxuXHQvKipcblx0ICogVGhlIHN5bWJvbCB1c2VkIHRvIHNwbGl0IHVwIHRob3VzYW5kcyBpbiB0aGUgdmFsdWUgKGVnLiAnLCcpXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHR0aG91c2FuZHNTZXBhcmF0b3IgPSAnLCc7XG5cblx0LyoqXG5cdCAqIFRoZSBudW1iZXIgb2YgZnJhY3Rpb25hbCBkaXZpc2lvbnMgb2YgYSBjdXJyZW5jeSdzIG1haW4gdW5pdC4gIElmIG5vdFxuXHQgKiBwcm92aWRlZCwgdGhlbiBpdCBpcyBhdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZWQgZnJvbSB0aGUgZGVjaW1hbFBsYWNlc1xuXHQgKiB2YWx1ZS5cblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN1YnVuaXRzID0gMTAwO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAcGFyYW0ge3t9fSBjdXJyZW5jeUNvbmZpZyBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgY29uZmlndXJhdGlvbiBmb3Jcblx0ICogdGhpcyBjdXJyZW5jeSB2YWx1ZSBvYmplY3QuICBPbiBjb25zdHJ1Y3Rpb24sIHRoZSBDdXJyZW5jeSBvYmplY3QgaXNcblx0ICogZnJvemVuIHNvIHRoYXQgaXQgYmVjb21lcyBpbW11dGFibGUuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciggY3VycmVuY3lDb25maWcgKSB7XG5cdFx0Q3VycmVuY3kudmFsaWRhdGVDdXJyZW5jeUNvbmZpZyggY3VycmVuY3lDb25maWcgKTtcblx0XHR0aGlzLmNvZGUgPSBjdXJyZW5jeUNvbmZpZy5jb2RlO1xuXHRcdHRoaXMuc2luZ3VsYXJMYWJlbCA9IGN1cnJlbmN5Q29uZmlnLnNpbmd1bGFyTGFiZWwgfHwgJyc7XG5cdFx0dGhpcy5wbHVyYWxMYWJlbCA9IGN1cnJlbmN5Q29uZmlnLnBsdXJhbExhYmVsIHx8ICcnO1xuXHRcdHRoaXMuc2lnbiA9IGN1cnJlbmN5Q29uZmlnLnNpZ247XG5cdFx0dGhpcy5zaWduQjQgPSBpc1VuZGVmaW5lZCggY3VycmVuY3lDb25maWcuc2lnbkI0ICkgP1xuXHRcdFx0dGhpcy5zaWduQjQgOlxuXHRcdFx0Y3VycmVuY3lDb25maWcuc2lnbkI0O1xuXHRcdHRoaXMuZGVjaW1hbFBsYWNlcyA9IGlzVW5kZWZpbmVkKCBjdXJyZW5jeUNvbmZpZy5kZWNpbWFsUGxhY2VzICkgP1xuXHRcdFx0dGhpcy5kZWNpbWFsUGxhY2VzIDpcblx0XHRcdGN1cnJlbmN5Q29uZmlnLmRlY2ltYWxQbGFjZXM7XG5cdFx0dGhpcy5kZWNpbWFsTWFyayA9IGN1cnJlbmN5Q29uZmlnLmRlY2ltYWxNYXJrIHx8IHRoaXMuZGVjaW1hbE1hcms7XG5cdFx0dGhpcy50aG91c2FuZHNTZXBhcmF0b3IgPSBjdXJyZW5jeUNvbmZpZy50aG91c2FuZHNTZXBhcmF0b3IgfHwgdGhpcy50aG91c2FuZHNTZXBhcmF0b3I7XG5cdFx0dGhpcy5zdWJ1bml0cyA9IGN1cnJlbmN5Q29uZmlnLnN1YnVuaXRzIHx8XG5cdFx0XHRNYXRoLnBvdyggMTAsIHRoaXMuZGVjaW1hbFBsYWNlcyApO1xuXHRcdE9iamVjdC5mcmVlemUoIHRoaXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBjdXJyZW5jeSBwcm9wZXJ0aWVzIGFzIGFuIG9iamVjdCBmb3JtYXR0ZWQgZm9yIHRoZVxuXHQgKiBhY2NvdW50aW5nLWpzIGxpYnJhcnkgY29uZmlndXJhdGlvbi5cblx0ICpcblx0ICogQHJldHVybiB7e319ICBBbiBvYmplY3Qgc2hhcGVkIGZvciB3aGF0IHRoZSBhY2NvdW50aW5nLWpzIGxpYnJhcnkgZXhwZWN0c1xuXHQgKi9cblx0dG9BY2NvdW50aW5nU2V0dGluZ3MoKSB7XG5cdFx0Y29uc3QgZGVjaW1hbEluZm8gPSB7XG5cdFx0XHRkZWNpbWFsOiB0aGlzLmRlY2ltYWxNYXJrLFxuXHRcdFx0dGhvdXNhbmQ6IHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yLFxuXHRcdFx0cHJlY2lzaW9uOiB0aGlzLmRlY2ltYWxQbGFjZXMsXG5cdFx0fTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y3VycmVuY3k6IHtcblx0XHRcdFx0c3ltYm9sOiB0aGlzLnNpZ24sXG5cdFx0XHRcdGZvcm1hdDoge1xuXHRcdFx0XHRcdHBvczogdGhpcy5zaWduQjQgPyAnJXMldicgOiAnJXYlcycsXG5cdFx0XHRcdFx0bmVnOiB0aGlzLnNpZ25CNCA/ICctICRzJXYnIDogJy0gJXYlcycsXG5cdFx0XHRcdFx0emVybzogdGhpcy5zaWduQjQgPyAnJXMldicgOiAnJXYlcycsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdC4uLmRlY2ltYWxJbmZvLFxuXHRcdFx0fSxcblx0XHRcdG51bWJlcjogZGVjaW1hbEluZm8sXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhpcyBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4ge09iamVjdH0gRnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBvYmplY3QgdG8gYmUgc2VyaWFsaXplZCBieVxuXHQgKiBKU09OLnN0cmluZ2lmeVxuXHQgKi9cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb2RlOiB0aGlzLmNvZGUsXG5cdFx0XHRzaW5ndWxhckxhYmVsOiB0aGlzLnNpbmd1bGFyTGFiZWwsXG5cdFx0XHRwbHVyYWxMYWJlbDogdGhpcy5wbHVyYWxMYWJlbCxcblx0XHRcdHNpZ246IHRoaXMuc2lnbixcblx0XHRcdHNpZ25CNDogdGhpcy5zaWduQjQsXG5cdFx0XHRkZWNpbWFsTWFyazogdGhpcy5kZWNpbWFsTWFyayxcblx0XHRcdHRob3VzYW5kc1NlcGFyYXRvcjogdGhpcy50aG91c2FuZHNTZXBhcmF0b3IsXG5cdFx0XHRzdWJ1bml0czogdGhpcy5zdWJ1bml0cyxcblx0XHRcdGRlY2ltYWxQbGFjZXM6IHRoaXMuZGVjaW1hbFBsYWNlcyxcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgdmFsaWRhdGVzIHdoZXRoZXIgdGhlIHBhc3NlZCBpbiBjb25maWcgaGFzIHRoZSByZXF1aXJlZCBwcm9wZXJ0aWVzXG5cdCAqIChhbmQgY29ycmVjdCB0eXBlcykgZm9yIGNvbnN0cnVjdGluZyBhIEN1cnJlbmN5IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHt7fX0gY29uZmlnXG5cdCAqIEB0aHJvd3Mge0V4Y2VwdGlvbn1cblx0ICogQHRocm93cyB7VHlwZUVycm9yfVxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlQ3VycmVuY3lDb25maWcgPSAoIGNvbmZpZyApID0+IHtcblx0XHRpZiAoIGlzRW1wdHkoIGNvbmZpZyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbihcblx0XHRcdFx0J1RoZSBjb25maWd1cmF0aW9uIG9iamVjdCBwcm92aWRlZCB0byBDdXJyZW5jeSBtdXN0IG5vdCcgK1xuXHRcdFx0XHQnIGJlIGVtcHR5J1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKCAhIGNvbmZpZy5jb2RlIHx8ICEgaXNTdHJpbmcoIGNvbmZpZy5jb2RlICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHByb3ZpZGVkIHRvIEN1cnJlbmN5IG11c3QgaGF2ZSAnICtcblx0XHRcdFx0J2EgXCJjb2RlXCIgcHJvcGVydHkgdGhhdCBpcyBhIHN0cmluZy4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggISBjb25maWcuc2lnbiB8fCAhIGlzU3RyaW5nKCBjb25maWcuc2lnbiApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBjb25maWd1cmF0aW9uIG9iamVjdCBwcm92aWRlZCB0byBDdXJyZW5jeSBtdXN0IGhhdmUgYSAnICtcblx0XHRcdFx0J1wic2lnblwiIHByb3BlcnR5IHRoYXQgaXMgYSBzdHJpbmcuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5zaW5ndWxhckxhYmVsICYmICEgaXNTdHJpbmcoIGNvbmZpZy5zaW5ndWxhckxhYmVsICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHNpbmd1bGFyTGFiZWwgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIHN0cmluZyBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5wbHVyYWxMYWJlbCAmJiAhIGlzU3RyaW5nKCBjb25maWcucGx1cmFsTGFiZWwgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgcGx1cmFsTGFiZWwgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIHN0cmluZyBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5zaWduQjQgJiYgISBpc0Jvb2xlYW4oIGNvbmZpZy5zaWduQjQgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgc2lnbkI0IHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBib29sZWFuIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLmRlY2ltYWxQbGFjZXMgJiYgISBpc051bWJlciggY29uZmlnLmRlY2ltYWxQbGFjZXMgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgZGVjaW1hbFBsYWNlcyBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgbnVtYmVyIHByaW1pdGl2ZSdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcuZGVjaW1hbE1hcmsgJiYgISBpc1N0cmluZyggY29uZmlnLmRlY2ltYWxNYXJrICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGRlY2ltYWxNYXJrIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBzdHJpbmcgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcudGhvdXNhbmRzU2VwYXJhdG9yICYmXG5cdFx0XHQhIGlzU3RyaW5nKCBjb25maWcudGhvdXNhbmRzU2VwYXJhdG9yICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHRob3VzYW5kc1NlcGFyYXRvciBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgc3RyaW5nIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLnN1YnVuaXRzICYmICEgaXNOdW1iZXIoIGNvbmZpZy5zdWJ1bml0cyApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBzdWJ1bml0cyBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgbnVtYmVyIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEV4cG9ydCBvZiBhIEN1cnJlbmN5IFZhbHVlIG9iamVjdCBjcmVhdGVkIGZyb20gYSBjdXJyZW5jeSBjb25maWcgcHJvdmlkZWQuXG4gKiBUaGlzIGNhdGNoZXMgYW55IGV4Y2VwdGlvbiBhbmQgdHJpZ2dlcnMgYSBjb25zb2xlIGVycm9yLlxuICpcbiAqIEBwYXJhbSB7e319IGNvbmZpZ1xuICogQHJldHVybiB7Q3VycmVuY3l8e319IElmIHRoZXJlJ3MgYSBwcm9ibGVtIGNvbnN0cnVjdGluZyB0aGUgY3VycmVuY3kgb2JqZWN0XG4gKiBhbiBlbXB0eSBvYmplY3QgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBTaXRlQ3VycmVuY3kgPSAoIGNvbmZpZyA9IHt9ICkgPT4ge1xuXHRsZXQgY3VycmVuY3k7XG5cdHRyeSB7XG5cdFx0Y3VycmVuY3kgPSBuZXcgQ3VycmVuY3koIGNvbmZpZyApO1xuXHR9IGNhdGNoICggZSApIHtcblx0XHRjdXJyZW5jeSA9IHt9O1xuXHRcdHdhcm5pbmcoXG5cdFx0XHRmYWxzZSxcblx0XHRcdCdUaGUgU2l0ZSBDdXJyZW5jeSBvYmplY3QgY291bGQgbm90IGJlIGNyZWF0ZWQgYmVjYXVzZSAnICtcblx0XHRcdCdvZiB0aGlzIGVycm9yOiAnICsgZS5tZXNzYWdlXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gY3VycmVuY3k7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaXRlQ3VycmVuY3koIENVUlJFTkNZX0NPTkZJRyApO1xuIiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAoX19ERVZfXykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMSA/IGxlbiAtIDEgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAxOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDFdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkobnVsbCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ2YWx1ZU9iamVjdHNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJsb2Rhc2hcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmVuZG9yXCJdW1wibW9tZW50XCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
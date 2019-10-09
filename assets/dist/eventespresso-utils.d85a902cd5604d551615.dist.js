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
/*! exports provided: amountsMatch, cancelClickEvent, getServerDateTime, parseInfinity, parseMoneyValue, shortenCuid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _amounts_match__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./amounts-match */ "./assets/src/utils/amounts-match.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "amountsMatch", function() { return _amounts_match__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _cancel_click_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cancel-click-event */ "./assets/src/utils/cancel-click-event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelClickEvent", function() { return _cancel_click_event__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _get_server_date_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-server-date-time */ "./assets/src/utils/get-server-date-time.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getServerDateTime", function() { return _get_server_date_time__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _parse_infinity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parse-infinity */ "./assets/src/utils/parse-infinity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseInfinity", function() { return _parse_infinity__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _parse_money_value__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parse-money-value */ "./assets/src/utils/parse-money-value.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseMoneyValue", function() { return _parse_money_value__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _shorten_cuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shorten-cuid */ "./assets/src/utils/shorten-cuid.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shortenCuid", function() { return _shorten_cuid__WEBPACK_IMPORTED_MODULE_5__["default"]; });








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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLnV0aWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL2Ftb3VudHMtbWF0Y2guanMiLCJ3ZWJwYWNrOi8vZWVqcy51dGlscy8uL2Fzc2V0cy9zcmMvdXRpbHMvY2FuY2VsLWNsaWNrLWV2ZW50LmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL2dldC1zZXJ2ZXItZGF0ZS10aW1lLmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL3BhcnNlLWluZmluaXR5LmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL3BhcnNlLW1vbmV5LXZhbHVlLmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL3Nob3J0ZW4tY3VpZC5qcyIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzLy4vYXNzZXRzL3NyYy92by9jdXJyZW5jeS5qcyIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vZWVqcy51dGlscy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzLy4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvd2FybmluZy5qcyIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJ2YWx1ZU9iamVjdHNcIl19Iiwid2VicGFjazovL2VlanMudXRpbHMvZXh0ZXJuYWwge1widGhpc1wiOlwibG9kYXNoXCJ9Iiwid2VicGFjazovL2VlanMudXRpbHMvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZlbmRvclwiLFwibW9tZW50XCJdfSJdLCJuYW1lcyI6WyJhbW91bnRzTWF0Y2giLCJ2MSIsInYyIiwicGFyc2VGbG9hdCIsIndpbmRvdyIsImNvbnNvbGUiLCJjYW5jZWxDbGlja0V2ZW50IiwiY2xpY2siLCJzb3VyY2UiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsIl9fREVWX18iLCJsb2ciLCJnZXRTZXJ2ZXJEYXRlVGltZSIsIm5ld0RhdGVWYWx1ZSIsIlNlcnZlckRhdGVUaW1lIiwiRGF0ZSIsImZyb21KU0RhdGUiLCJuZXdEYXRlIiwibmV3RGF0ZVZhbHVlSW50IiwicGFyc2VJbnQiLCJmcm9tVW5peCIsIm1vbWVudCIsImlzTW9tZW50IiwiZnJvbU1vbWVudCIsIlR5cGVFcnJvciIsInBhcnNlSW5maW5pdHkiLCJudW1iZXIiLCJhc0ludCIsImZvckRiIiwicmVwcmVzZW50c0luZmluaXR5IiwidmFsdWUiLCJJbmZpbml0eSIsImlzTmlsIiwidHlwZSIsIm5hbWUiLCJwcm9wcyIsInBhcnNlTW9uZXlWYWx1ZSIsIm1vbmV5VmFsdWUiLCJ0b1N0cmluZyIsInJlcGxhY2UiLCJSZWdFeHAiLCJTaXRlQ3VycmVuY3kiLCJ0aG91c2FuZHNTZXBhcmF0b3IiLCJzaWduIiwiaXNOYU4iLCJzaG9ydGVuQ3VpZCIsImN1aWQiLCJzdGFydCIsImVuZCIsImhhc093blByb3BlcnR5IiwibGVuZ3RoIiwic3Vic3RyaW5nIiwiQ3VycmVuY3kiLCJjdXJyZW5jeUNvbmZpZyIsInZhbGlkYXRlQ3VycmVuY3lDb25maWciLCJjb2RlIiwic2luZ3VsYXJMYWJlbCIsInBsdXJhbExhYmVsIiwic2lnbkI0IiwiaXNVbmRlZmluZWQiLCJkZWNpbWFsUGxhY2VzIiwiZGVjaW1hbE1hcmsiLCJzdWJ1bml0cyIsIk1hdGgiLCJwb3ciLCJPYmplY3QiLCJmcmVlemUiLCJkZWNpbWFsSW5mbyIsImRlY2ltYWwiLCJ0aG91c2FuZCIsInByZWNpc2lvbiIsImN1cnJlbmN5Iiwic3ltYm9sIiwiZm9ybWF0IiwicG9zIiwibmVnIiwiemVybyIsImNvbmZpZyIsImlzRW1wdHkiLCJFeGNlcHRpb24iLCJpc1N0cmluZyIsImlzQm9vbGVhbiIsImlzTnVtYmVyIiwiZSIsIndhcm5pbmciLCJtZXNzYWdlIiwiQ1VSUkVOQ1lfQ09ORklHIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBOzs7Ozs7QUFNQSxJQUFNQSxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFFQyxFQUFGLEVBQU1DLEVBQU47QUFBQSxTQUFjQyxVQUFVLENBQUVGLEVBQUYsQ0FBVixLQUFxQkUs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aXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvc3JjL3V0aWxzL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdjFcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdjJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdmFsdWVzIG1hdGNoIGFmdGVyIGNvbnZlcnNpb24gdG8gZmxvYXRcbiAqL1xuY29uc3QgYW1vdW50c01hdGNoID0gKCB2MSwgdjIgKSA9PiBwYXJzZUZsb2F0KCB2MSApID09PSBwYXJzZUZsb2F0KCB2MiApO1xuXG5leHBvcnQgZGVmYXVsdCBhbW91bnRzTWF0Y2g7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgX19ERVZfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuXG5jb25zdCB7IGNvbnNvbGUgfSA9IHdpbmRvdztcblxuLyoqXG4gKiB1dGlsaXR5IGZvciBibG9ja2luZyBjbGljayBldmVudHNcbiAqIGFuZCBkaXNwbGF5aW5nIGRlYnVnIGRhdGEgaW4gZGV2IGVudmlyb25tZW50c1xuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IGNsaWNrIC0gRE9NIGNsaWNrIGV2ZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gc291cmNlIC0gd2hlcmUgY2xpY2sgb3JpZ2luYXRlZFxuICovXG5jb25zdCBjYW5jZWxDbGlja0V2ZW50ID0gKCBjbGljaywgc291cmNlID0gJycgKSA9PiB7XG5cdGlmICggY2xpY2sgJiYgdHlwZW9mIGNsaWNrLnByZXZlbnREZWZhdWx0ID09PSAnZnVuY3Rpb24nICkge1xuXHRcdGNsaWNrLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y2xpY2suc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0aWYgKCBfX0RFVl9fICYmIHNvdXJjZSAhPT0gJycgKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcblx0XHRcdFx0JyVjID4+IENMSUNLIDw8Jyxcblx0XHRcdFx0J2ZvbnQtc2l6ZTogMTNweDsgY29sb3I6IHllbGxvdzsnLFxuXHRcdFx0XHRzb3VyY2UsXG5cdFx0XHRcdGNsaWNrXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2FuY2VsQ2xpY2tFdmVudDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBTZXJ2ZXJEYXRlVGltZSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbHVlLW9iamVjdHMnO1xuXG4vKipcbiAqIGF0dGVtcHRzIHRvIGNyZWF0ZSBhIFNlcnZlckRhdGVUaW1lIG9iamVjdCBmcm9tIHRoZSBwcm92aWRlZCB2YWx1ZVxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtEYXRlfG1vbWVudHxudW1iZXJ8U2VydmVyRGF0ZVRpbWV8c3RyaW5nfSBuZXdEYXRlVmFsdWVcbiAqIEByZXR1cm4ge1NlcnZlckRhdGVUaW1lfSB2YWxpZCBkYXRlIG9iamVjdFxuICovXG5jb25zdCBnZXRTZXJ2ZXJEYXRlVGltZSA9ICggbmV3RGF0ZVZhbHVlICkgPT4ge1xuXHRpZiAoIG5ld0RhdGVWYWx1ZSBpbnN0YW5jZW9mIFNlcnZlckRhdGVUaW1lICkge1xuXHRcdHJldHVybiBuZXdEYXRlVmFsdWU7XG5cdH1cblx0aWYgKCBuZXdEYXRlVmFsdWUgaW5zdGFuY2VvZiBEYXRlICkge1xuXHRcdHJldHVybiBTZXJ2ZXJEYXRlVGltZS5mcm9tSlNEYXRlKCBuZXdEYXRlVmFsdWUgKTtcblx0fVxuXHRpZiAoIHR5cGVvZiBuZXdEYXRlVmFsdWUgPT09ICdzdHJpbmcnICkge1xuXHRcdGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZSggbmV3RGF0ZVZhbHVlICk7XG5cdFx0aWYgKCBuZXdEYXRlIGluc3RhbmNlb2YgRGF0ZSApIHtcblx0XHRcdHJldHVybiBTZXJ2ZXJEYXRlVGltZS5mcm9tSlNEYXRlKCBuZXdEYXRlICk7XG5cdFx0fVxuXHR9XG5cdGNvbnN0IG5ld0RhdGVWYWx1ZUludCA9IHBhcnNlSW50KCBuZXdEYXRlVmFsdWUsIDEwICk7XG5cdGlmICggbmV3RGF0ZVZhbHVlSW50ICkge1xuXHRcdHJldHVybiBTZXJ2ZXJEYXRlVGltZS5mcm9tVW5peCggbmV3RGF0ZVZhbHVlICk7XG5cdH1cblx0aWYgKCBtb21lbnQuaXNNb21lbnQoIG5ld0RhdGVWYWx1ZSApICkge1xuXHRcdHJldHVybiBTZXJ2ZXJEYXRlVGltZS5mcm9tTW9tZW50KCBuZXdEYXRlVmFsdWUgKTtcblx0fVxuXHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdCdDb3VsZCBub3QgY3JlYXRlIGEgU2VydmVyRGF0ZVRpbWUgb2JqZWN0IGJlY2F1c2UgYW4gaW52YWxpZCcgK1xuXHRcdCcgdmFsdWUgd2FzIHN1cHBsaWVkIHRvIGdldFNlcnZlckRhdGVUaW1lJ1xuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0U2VydmVyRGF0ZVRpbWU7XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIGFtb3VudHNNYXRjaCB9IGZyb20gJy4vYW1vdW50cy1tYXRjaCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNhbmNlbENsaWNrRXZlbnQgfSBmcm9tICcuL2NhbmNlbC1jbGljay1ldmVudCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGdldFNlcnZlckRhdGVUaW1lIH0gZnJvbSAnLi9nZXQtc2VydmVyLWRhdGUtdGltZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHBhcnNlSW5maW5pdHkgfSBmcm9tICcuL3BhcnNlLWluZmluaXR5JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2VNb25leVZhbHVlIH0gZnJvbSAnLi9wYXJzZS1tb25leS12YWx1ZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHNob3J0ZW5DdWlkIH0gZnJvbSAnLi9zaG9ydGVuLWN1aWQnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzTmlsIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBjb252ZXJ0cyBpbmZpbml0ZSB2YWx1ZXMgdG8gbnVsbCBmb3IgdXNlIGluIGZvcm1zXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bGx8bnVtYmVyfHN0cmluZ30gbnVtYmVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFzSW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZvckRiXG4gKiBAcmV0dXJuIHtudW1iZXJ9IGNvbnZlcnRlZCBpbmZpbml0ZSB2YWx1ZVxuICovXG5jb25zdCBwYXJzZUluZmluaXR5ID0gKCBudW1iZXIsIGFzSW50ID0gZmFsc2UsIGZvckRiID0gZmFsc2UgKSA9PiB7XG5cdC8vIHJldHVybnMgdHJ1ZSBmb3IgYW55IHBvc3NpYmxlIHZhbHVlIHRoYXQgY291bGQgcmVwcmVzZW50IGluZmluaXR5XG5cdGNvbnN0IHJlcHJlc2VudHNJbmZpbml0eSA9ICggdmFsdWUgKSA9PlxuXHRcdHZhbHVlID09PSAtMSB8fFxuXHRcdHZhbHVlID09PSAnJyB8fFxuXHRcdHZhbHVlID09PSAnSU5GJyB8fFxuXHRcdHZhbHVlID09PSBJbmZpbml0eSB8fFxuXHRcdGlzTmlsKCB2YWx1ZSApO1xuXHRudW1iZXIgPSByZXByZXNlbnRzSW5maW5pdHkoIG51bWJlciApIHx8IChcblx0XHRudW1iZXIudHlwZSAmJlxuXHRcdG51bWJlci50eXBlLm5hbWUgPT09ICdJbmZpbml0eVN5bWJvbCcgJiZcblx0XHRyZXByZXNlbnRzSW5maW5pdHkoIG51bWJlci5wcm9wcy52YWx1ZSApXG5cdCkgP1xuXHRcdEluZmluaXR5IDpcblx0XHRudW1iZXI7XG5cdG51bWJlciA9IG51bWJlciAhPT0gSW5maW5pdHkgJiYgYXNJbnQgPyBwYXJzZUludCggbnVtYmVyLCAxMCApIDogbnVtYmVyO1xuXHQvLyBub3QgaW5maW5pdHkgT1IgaXMgaW5maW5pdHkgYnV0IG5vdCBmb3IgZGJcblx0bnVtYmVyID0gbnVtYmVyICE9PSBJbmZpbml0eSB8fCAoIG51bWJlciA9PT0gSW5maW5pdHkgJiYgISBmb3JEYiApID9cblx0XHRudW1iZXIgOlxuXHRcdC0xO1xuXHRyZXR1cm4gbnVtYmVyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFyc2VJbmZpbml0eTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgU2l0ZUN1cnJlbmN5IGZyb20gJy4uL3ZvL2N1cnJlbmN5JztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbW9uZXlWYWx1ZVxuICogQHJldHVybiB7bnVtYmVyfSBtb25leSB2YWx1ZVxuICovXG5jb25zdCBwYXJzZU1vbmV5VmFsdWUgPSAoIG1vbmV5VmFsdWUgKSA9PiB7XG5cdG1vbmV5VmFsdWUgPSBtb25leVZhbHVlICYmIG1vbmV5VmFsdWUudG9TdHJpbmcgP1xuXHRcdG1vbmV5VmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKFxuXHRcdFx0bmV3IFJlZ0V4cCggU2l0ZUN1cnJlbmN5LnRob3VzYW5kc1NlcGFyYXRvciwgJ2cnICksXG5cdFx0XHQnJ1xuXHRcdCkucmVwbGFjZShcblx0XHRcdFNpdGVDdXJyZW5jeS5zaWduLFxuXHRcdFx0Jydcblx0XHQpIDpcblx0XHQwO1xuXHRtb25leVZhbHVlID0gcGFyc2VGbG9hdCggbW9uZXlWYWx1ZSApO1xuXHRyZXR1cm4gISBpc05hTiggbW9uZXlWYWx1ZSApID8gbW9uZXlWYWx1ZSA6IDA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwYXJzZU1vbmV5VmFsdWU7XG4iLCIvKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IGN1aWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFxuICogQHBhcmFtIHtudW1iZXJ9IGVuZFxuICogQHJldHVybiB7c3RyaW5nfSBjdWlkIHNuaXBwZXRcbiAqL1xuY29uc3Qgc2hvcnRlbkN1aWQgPSAoIGN1aWQsIHN0YXJ0ID0gMTIsIGVuZCA9IDE4ICkgPT4ge1xuXHRpZiAoIGN1aWQuaGFzT3duUHJvcGVydHkoICdsZW5ndGgnICkgJiYgY3VpZC5sZW5ndGggPiBlbmQgKSB7XG5cdFx0Ly8gdXNlIGEgc21hbGxlciBtb3JlIHVuaXF1ZSBwb3J0aW9uIG9mIHRoZSBDVUlEXG5cdFx0cmV0dXJuIGN1aWQuc3Vic3RyaW5nKCBzdGFydCwgZW5kICk7XG5cdH1cblx0cmV0dXJuIGN1aWQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzaG9ydGVuQ3VpZDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRpc0VtcHR5LFxuXHRpc1N0cmluZyxcblx0aXNOdW1iZXIsXG5cdGlzQm9vbGVhbixcblx0aXNVbmRlZmluZWQsXG59IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBFeGNlcHRpb24sIENVUlJFTkNZX0NPTkZJRyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5cbi8qKlxuICogQSB2YWx1ZSBvYmplY3QgcmVwcmVzZW50aW5nIGN1cnJlbmN5IHZhbHVlc1xuICovXG5leHBvcnQgY2xhc3MgQ3VycmVuY3kge1xuXHQvKipcblx0ICogVGhlIElTTyA0MjE3IGNvZGUgaWRlbnRpZnlpbmcgdGhlIGN1cnJlbmN5IChlZy4gJ1VTRCcpXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRjb2RlID0gJyc7XG5cblx0LyoqXG5cdCAqIFRoZSBzaW5ndWxhciBsYWJlbCBmb3IgdGhlIGN1cnJlbmN5IChlZy4gJ0RvbGxhcicpO1xuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0c2luZ3VsYXJMYWJlbCA9ICcnO1xuXG5cdC8qKlxuXHQgKiBUaGUgcGx1cmFsIGxhYmVsIGZvciB0aGUgY3VycmVuY3kgKGVnLiAnRG9sbGFycycpO1xuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0cGx1cmFsTGFiZWwgPSAnJztcblxuXHQvKipcblx0ICogVGhlIGN1cnJlbmN5IHN5bWJvbCAoZWcuICckJyk7XG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRzaWduID0gJyc7XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGN1cnJlbmN5IHN5bWJvbCBpcyBkaXNwbGF5ZWQgYmVmb3JlIG9yIGFmdGVyIHRoZSB2YWx1ZS5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRzaWduQjQgPSB0cnVlO1xuXG5cdC8qKlxuXHQgKiBUaGUgcHJlY2lzaW9uIGZvciB0aGUgdmFsdWUgKGVnLiAxMC4wMiBpcyAyLCAxMC4xMjMgaXMgMykuIFRoZSBudW1iZXIgb2Zcblx0ICogZGVjaW1hbCBwbGFjZXMgY2FuIGJlIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBudW1iZXIgb2Ygc3VidW5pdHMgZm9yIHRoZVxuXHQgKiBjdXJyZW5jeSAtIHN1YnVuaXRzID0gcG93KCAxMCwgZGVjaW1hbFBsYWNlcykuXG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRkZWNpbWFsUGxhY2VzID0gMjtcblxuXHQvKipcblx0ICogVGhlIHN5bWJvbCB1c2VkIGZvciB0aGUgZGVjaW1hbCBtYXJrIChlZy4gJy4nKVxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0ZGVjaW1hbE1hcmsgPSAnLic7XG5cblx0LyoqXG5cdCAqIFRoZSBzeW1ib2wgdXNlZCB0byBzcGxpdCB1cCB0aG91c2FuZHMgaW4gdGhlIHZhbHVlIChlZy4gJywnKVxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0dGhvdXNhbmRzU2VwYXJhdG9yID0gJywnO1xuXG5cdC8qKlxuXHQgKiBUaGUgbnVtYmVyIG9mIGZyYWN0aW9uYWwgZGl2aXNpb25zIG9mIGEgY3VycmVuY3kncyBtYWluIHVuaXQuICBJZiBub3Rcblx0ICogcHJvdmlkZWQsIHRoZW4gaXQgaXMgYXV0b21hdGljYWxseSBjYWxjdWxhdGVkIGZyb20gdGhlIGRlY2ltYWxQbGFjZXNcblx0ICogdmFsdWUuXG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdWJ1bml0cyA9IDEwMDtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIHt7fX0gY3VycmVuY3lDb25maWcgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGNvbmZpZ3VyYXRpb24gZm9yXG5cdCAqIHRoaXMgY3VycmVuY3kgdmFsdWUgb2JqZWN0LiAgT24gY29uc3RydWN0aW9uLCB0aGUgQ3VycmVuY3kgb2JqZWN0IGlzXG5cdCAqIGZyb3plbiBzbyB0aGF0IGl0IGJlY29tZXMgaW1tdXRhYmxlLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoIGN1cnJlbmN5Q29uZmlnICkge1xuXHRcdEN1cnJlbmN5LnZhbGlkYXRlQ3VycmVuY3lDb25maWcoIGN1cnJlbmN5Q29uZmlnICk7XG5cdFx0dGhpcy5jb2RlID0gY3VycmVuY3lDb25maWcuY29kZTtcblx0XHR0aGlzLnNpbmd1bGFyTGFiZWwgPSBjdXJyZW5jeUNvbmZpZy5zaW5ndWxhckxhYmVsIHx8ICcnO1xuXHRcdHRoaXMucGx1cmFsTGFiZWwgPSBjdXJyZW5jeUNvbmZpZy5wbHVyYWxMYWJlbCB8fCAnJztcblx0XHR0aGlzLnNpZ24gPSBjdXJyZW5jeUNvbmZpZy5zaWduO1xuXHRcdHRoaXMuc2lnbkI0ID0gaXNVbmRlZmluZWQoIGN1cnJlbmN5Q29uZmlnLnNpZ25CNCApID9cblx0XHRcdHRoaXMuc2lnbkI0IDpcblx0XHRcdGN1cnJlbmN5Q29uZmlnLnNpZ25CNDtcblx0XHR0aGlzLmRlY2ltYWxQbGFjZXMgPSBpc1VuZGVmaW5lZCggY3VycmVuY3lDb25maWcuZGVjaW1hbFBsYWNlcyApID9cblx0XHRcdHRoaXMuZGVjaW1hbFBsYWNlcyA6XG5cdFx0XHRjdXJyZW5jeUNvbmZpZy5kZWNpbWFsUGxhY2VzO1xuXHRcdHRoaXMuZGVjaW1hbE1hcmsgPSBjdXJyZW5jeUNvbmZpZy5kZWNpbWFsTWFyayB8fCB0aGlzLmRlY2ltYWxNYXJrO1xuXHRcdHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yID0gY3VycmVuY3lDb25maWcudGhvdXNhbmRzU2VwYXJhdG9yIHx8IHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yO1xuXHRcdHRoaXMuc3VidW5pdHMgPSBjdXJyZW5jeUNvbmZpZy5zdWJ1bml0cyB8fFxuXHRcdFx0TWF0aC5wb3coIDEwLCB0aGlzLmRlY2ltYWxQbGFjZXMgKTtcblx0XHRPYmplY3QuZnJlZXplKCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgY3VycmVuY3kgcHJvcGVydGllcyBhcyBhbiBvYmplY3QgZm9ybWF0dGVkIGZvciB0aGVcblx0ICogYWNjb3VudGluZy1qcyBsaWJyYXJ5IGNvbmZpZ3VyYXRpb24uXG5cdCAqXG5cdCAqIEByZXR1cm4ge3t9fSAgQW4gb2JqZWN0IHNoYXBlZCBmb3Igd2hhdCB0aGUgYWNjb3VudGluZy1qcyBsaWJyYXJ5IGV4cGVjdHNcblx0ICovXG5cdHRvQWNjb3VudGluZ1NldHRpbmdzKCkge1xuXHRcdGNvbnN0IGRlY2ltYWxJbmZvID0ge1xuXHRcdFx0ZGVjaW1hbDogdGhpcy5kZWNpbWFsTWFyayxcblx0XHRcdHRob3VzYW5kOiB0aGlzLnRob3VzYW5kc1NlcGFyYXRvcixcblx0XHRcdHByZWNpc2lvbjogdGhpcy5kZWNpbWFsUGxhY2VzLFxuXHRcdH07XG5cdFx0cmV0dXJuIHtcblx0XHRcdGN1cnJlbmN5OiB7XG5cdFx0XHRcdHN5bWJvbDogdGhpcy5zaWduLFxuXHRcdFx0XHRmb3JtYXQ6IHtcblx0XHRcdFx0XHRwb3M6IHRoaXMuc2lnbkI0ID8gJyVzJXYnIDogJyV2JXMnLFxuXHRcdFx0XHRcdG5lZzogdGhpcy5zaWduQjQgPyAnLSAkcyV2JyA6ICctICV2JXMnLFxuXHRcdFx0XHRcdHplcm86IHRoaXMuc2lnbkI0ID8gJyVzJXYnIDogJyV2JXMnLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHQuLi5kZWNpbWFsSW5mbyxcblx0XHRcdH0sXG5cdFx0XHRudW1iZXI6IGRlY2ltYWxJbmZvLFxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IEZ1bmN0aW9uIHJldHVybmluZyB0aGUgb2JqZWN0IHRvIGJlIHNlcmlhbGl6ZWQgYnlcblx0ICogSlNPTi5zdHJpbmdpZnlcblx0ICovXG5cdHRvSlNPTigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y29kZTogdGhpcy5jb2RlLFxuXHRcdFx0c2luZ3VsYXJMYWJlbDogdGhpcy5zaW5ndWxhckxhYmVsLFxuXHRcdFx0cGx1cmFsTGFiZWw6IHRoaXMucGx1cmFsTGFiZWwsXG5cdFx0XHRzaWduOiB0aGlzLnNpZ24sXG5cdFx0XHRzaWduQjQ6IHRoaXMuc2lnbkI0LFxuXHRcdFx0ZGVjaW1hbE1hcms6IHRoaXMuZGVjaW1hbE1hcmssXG5cdFx0XHR0aG91c2FuZHNTZXBhcmF0b3I6IHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yLFxuXHRcdFx0c3VidW5pdHM6IHRoaXMuc3VidW5pdHMsXG5cdFx0XHRkZWNpbWFsUGxhY2VzOiB0aGlzLmRlY2ltYWxQbGFjZXMsXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGlzIHZhbGlkYXRlcyB3aGV0aGVyIHRoZSBwYXNzZWQgaW4gY29uZmlnIGhhcyB0aGUgcmVxdWlyZWQgcHJvcGVydGllc1xuXHQgKiAoYW5kIGNvcnJlY3QgdHlwZXMpIGZvciBjb25zdHJ1Y3RpbmcgYSBDdXJyZW5jeSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7e319IGNvbmZpZ1xuXHQgKiBAdGhyb3dzIHtFeGNlcHRpb259XG5cdCAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUN1cnJlbmN5Q29uZmlnID0gKCBjb25maWcgKSA9PiB7XG5cdFx0aWYgKCBpc0VtcHR5KCBjb25maWcgKSApIHtcblx0XHRcdHRocm93IG5ldyBFeGNlcHRpb24oXG5cdFx0XHRcdCdUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgcHJvdmlkZWQgdG8gQ3VycmVuY3kgbXVzdCBub3QnICtcblx0XHRcdFx0JyBiZSBlbXB0eSdcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICggISBjb25maWcuY29kZSB8fCAhIGlzU3RyaW5nKCBjb25maWcuY29kZSApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBjb25maWd1cmF0aW9uIG9iamVjdCBwcm92aWRlZCB0byBDdXJyZW5jeSBtdXN0IGhhdmUgJyArXG5cdFx0XHRcdCdhIFwiY29kZVwiIHByb3BlcnR5IHRoYXQgaXMgYSBzdHJpbmcuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoICEgY29uZmlnLnNpZ24gfHwgISBpc1N0cmluZyggY29uZmlnLnNpZ24gKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgcHJvdmlkZWQgdG8gQ3VycmVuY3kgbXVzdCBoYXZlIGEgJyArXG5cdFx0XHRcdCdcInNpZ25cIiBwcm9wZXJ0eSB0aGF0IGlzIGEgc3RyaW5nLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcuc2luZ3VsYXJMYWJlbCAmJiAhIGlzU3RyaW5nKCBjb25maWcuc2luZ3VsYXJMYWJlbCApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBzaW5ndWxhckxhYmVsIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBzdHJpbmcgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcucGx1cmFsTGFiZWwgJiYgISBpc1N0cmluZyggY29uZmlnLnBsdXJhbExhYmVsICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHBsdXJhbExhYmVsIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBzdHJpbmcgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcuc2lnbkI0ICYmICEgaXNCb29sZWFuKCBjb25maWcuc2lnbkI0ICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHNpZ25CNCBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgYm9vbGVhbiBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5kZWNpbWFsUGxhY2VzICYmICEgaXNOdW1iZXIoIGNvbmZpZy5kZWNpbWFsUGxhY2VzICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGRlY2ltYWxQbGFjZXMgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIG51bWJlciBwcmltaXRpdmUnXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLmRlY2ltYWxNYXJrICYmICEgaXNTdHJpbmcoIGNvbmZpZy5kZWNpbWFsTWFyayApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBkZWNpbWFsTWFyayBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgc3RyaW5nIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLnRob3VzYW5kc1NlcGFyYXRvciAmJlxuXHRcdFx0ISBpc1N0cmluZyggY29uZmlnLnRob3VzYW5kc1NlcGFyYXRvciApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSB0aG91c2FuZHNTZXBhcmF0b3IgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIHN0cmluZyBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5zdWJ1bml0cyAmJiAhIGlzTnVtYmVyKCBjb25maWcuc3VidW5pdHMgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgc3VidW5pdHMgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIG51bWJlciBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBFeHBvcnQgb2YgYSBDdXJyZW5jeSBWYWx1ZSBvYmplY3QgY3JlYXRlZCBmcm9tIGEgY3VycmVuY3kgY29uZmlnIHByb3ZpZGVkLlxuICogVGhpcyBjYXRjaGVzIGFueSBleGNlcHRpb24gYW5kIHRyaWdnZXJzIGEgY29uc29sZSBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge3t9fSBjb25maWdcbiAqIEByZXR1cm4ge0N1cnJlbmN5fHt9fSBJZiB0aGVyZSdzIGEgcHJvYmxlbSBjb25zdHJ1Y3RpbmcgdGhlIGN1cnJlbmN5IG9iamVjdFxuICogYW4gZW1wdHkgb2JqZWN0IGlzIHJldHVybmVkLlxuICovXG5leHBvcnQgY29uc3QgU2l0ZUN1cnJlbmN5ID0gKCBjb25maWcgPSB7fSApID0+IHtcblx0bGV0IGN1cnJlbmN5O1xuXHR0cnkge1xuXHRcdGN1cnJlbmN5ID0gbmV3IEN1cnJlbmN5KCBjb25maWcgKTtcblx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0Y3VycmVuY3kgPSB7fTtcblx0XHR3YXJuaW5nKFxuXHRcdFx0ZmFsc2UsXG5cdFx0XHQnVGhlIFNpdGUgQ3VycmVuY3kgb2JqZWN0IGNvdWxkIG5vdCBiZSBjcmVhdGVkIGJlY2F1c2UgJyArXG5cdFx0XHQnb2YgdGhpcyBlcnJvcjogJyArIGUubWVzc2FnZVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIGN1cnJlbmN5O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2l0ZUN1cnJlbmN5KCBDVVJSRU5DWV9DT05GSUcgKTtcbiIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgX19ERVZfXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKF9fREVWX18pIHtcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDEgPyBsZW4gLSAxIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMTsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAxXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgK1xuICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH1cblxuICB3YXJuaW5nID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDIgPyBsZW4gLSAyIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMjsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAyXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXG4gICAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KG51bGwsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsdWVPYmplY3RzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibG9kYXNoXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZlbmRvclwiXVtcIm1vbWVudFwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9
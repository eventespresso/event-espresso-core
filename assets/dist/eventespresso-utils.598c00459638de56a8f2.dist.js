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

/***/ "./assets/src/utils/index.js":
/*!***********************************!*\
  !*** ./assets/src/utils/index.js ***!
  \***********************************/
/*! exports provided: amountsMatch, cancelClickEvent, parseInfinity, parseMoneyValue, shortenCuid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _amounts_match__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./amounts-match */ "./assets/src/utils/amounts-match.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "amountsMatch", function() { return _amounts_match__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _cancel_click_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cancel-click-event */ "./assets/src/utils/cancel-click-event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelClickEvent", function() { return _cancel_click_event__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _parse_infinity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parse-infinity */ "./assets/src/utils/parse-infinity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseInfinity", function() { return _parse_infinity__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _parse_money_value__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parse-money-value */ "./assets/src/utils/parse-money-value.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseMoneyValue", function() { return _parse_money_value__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _shorten_cuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shorten-cuid */ "./assets/src/utils/shorten-cuid.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shortenCuid", function() { return _shorten_cuid__WEBPACK_IMPORTED_MODULE_4__["default"]; });







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

/***/ "lodash":
/*!**********************************!*\
  !*** external {"this":"lodash"} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["lodash"]; }());

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLnV0aWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL2Ftb3VudHMtbWF0Y2guanMiLCJ3ZWJwYWNrOi8vZWVqcy51dGlscy8uL2Fzc2V0cy9zcmMvdXRpbHMvY2FuY2VsLWNsaWNrLWV2ZW50LmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL3BhcnNlLWluZmluaXR5LmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL3BhcnNlLW1vbmV5LXZhbHVlLmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9hc3NldHMvc3JjL3V0aWxzL3Nob3J0ZW4tY3VpZC5qcyIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzLy4vYXNzZXRzL3NyYy92by9jdXJyZW5jeS5qcyIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vZWVqcy51dGlscy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2VlanMudXRpbHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzLy4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvd2FybmluZy5qcyIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLnV0aWxzL2V4dGVybmFsIHtcInRoaXNcIjpcImxvZGFzaFwifSJdLCJuYW1lcyI6WyJhbW91bnRzTWF0Y2giLCJ2MSIsInYyIiwicGFyc2VGbG9hdCIsIndpbmRvdyIsImNvbnNvbGUiLCJjYW5jZWxDbGlja0V2ZW50IiwiY2xpY2siLCJzb3VyY2UiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsIl9fREVWX18iLCJsb2ciLCJwYXJzZUluZmluaXR5IiwibnVtYmVyIiwiYXNJbnQiLCJmb3JEYiIsInJlcHJlc2VudHNJbmZpbml0eSIsInZhbHVlIiwiSW5maW5pdHkiLCJpc05pbCIsInR5cGUiLCJuYW1lIiwicHJvcHMiLCJwYXJzZUludCIsInBhcnNlTW9uZXlWYWx1ZSIsIm1vbmV5VmFsdWUiLCJ0b1N0cmluZyIsInJlcGxhY2UiLCJSZWdFeHAiLCJTaXRlQ3VycmVuY3kiLCJ0aG91c2FuZHNTZXBhcmF0b3IiLCJzaWduIiwiaXNOYU4iLCJzaG9ydGVuQ3VpZCIsImN1aWQiLCJzdGFydCIsImVuZCIsImhhc093blByb3BlcnR5IiwibGVuZ3RoIiwic3Vic3RyaW5nIiwiQ3VycmVuY3kiLCJjdXJyZW5jeUNvbmZpZyIsInZhbGlkYXRlQ3VycmVuY3lDb25maWciLCJjb2RlIiwic2luZ3VsYXJMYWJlbCIsInBsdXJhbExhYmVsIiwic2lnbkI0IiwiaXNVbmRlZmluZWQiLCJkZWNpbWFsUGxhY2VzIiwiZGVjaW1hbE1hcmsiLCJzdWJ1bml0cyIsIk1hdGgiLCJwb3ciLCJPYmplY3QiLCJmcmVlemUiLCJkZWNpbWFsSW5mbyIsImRlY2ltYWwiLCJ0aG91c2FuZCIsInByZWNpc2lvbiIsImN1cnJlbmN5Iiwic3ltYm9sIiwiZm9ybWF0IiwicG9zIiwibmVnIiwiemVybyIsImNvbmZpZyIsImlzRW1wdHkiLCJFeGNlcHRpb24iLCJpc1N0cmluZyIsIlR5cGVFcnJvciIsImlzQm9vbGVhbiIsImlzTnVtYmVyIiwiZSIsIndhcm5pbmciLCJtZXNzYWdlIiwiQ1VSUkVOQ1lfQ09ORklHIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCOzs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlDOzs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsYUFBb0I7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFdBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFdBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzdEQSxhQUFhLCtCQUErQixFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTlDLGFBQWEsaUNBQWlDLEVBQUUsSSIsImZpbGUiOiJldmVudGVzcHJlc3NvLXV0aWxzLjU5OGMwMDQ1OTYzOGRlNTZhOGYyLmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9zcmMvdXRpbHMvaW5kZXguanNcIik7XG4iLCIvKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2MVxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2MlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB2YWx1ZXMgbWF0Y2ggYWZ0ZXIgY29udmVyc2lvbiB0byBmbG9hdFxuICovXG5jb25zdCBhbW91bnRzTWF0Y2ggPSAoIHYxLCB2MiApID0+IHBhcnNlRmxvYXQoIHYxICkgPT09IHBhcnNlRmxvYXQoIHYyICk7XG5cbmV4cG9ydCBkZWZhdWx0IGFtb3VudHNNYXRjaDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBfX0RFVl9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5cbmNvbnN0IHsgY29uc29sZSB9ID0gd2luZG93O1xuXG4vKipcbiAqIHV0aWxpdHkgZm9yIGJsb2NraW5nIGNsaWNrIGV2ZW50c1xuICogYW5kIGRpc3BsYXlpbmcgZGVidWcgZGF0YSBpbiBkZXYgZW52aXJvbm1lbnRzXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gY2xpY2sgLSBET00gY2xpY2sgZXZlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2UgLSB3aGVyZSBjbGljayBvcmlnaW5hdGVkXG4gKi9cbmNvbnN0IGNhbmNlbENsaWNrRXZlbnQgPSAoIGNsaWNrLCBzb3VyY2UgPSAnJyApID0+IHtcblx0aWYgKCBjbGljayAmJiB0eXBlb2YgY2xpY2sucHJldmVudERlZmF1bHQgPT09ICdmdW5jdGlvbicgKSB7XG5cdFx0Y2xpY2sucHJldmVudERlZmF1bHQoKTtcblx0XHRjbGljay5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRpZiAoIF9fREVWX18gJiYgc291cmNlICE9PSAnJyApIHtcblx0XHRcdGNvbnNvbGUubG9nKFxuXHRcdFx0XHQnJWMgPj4gQ0xJQ0sgPDwnLFxuXHRcdFx0XHQnZm9udC1zaXplOiAxM3B4OyBjb2xvcjogeWVsbG93OycsXG5cdFx0XHRcdHNvdXJjZSxcblx0XHRcdFx0Y2xpY2tcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjYW5jZWxDbGlja0V2ZW50O1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBhbW91bnRzTWF0Y2ggfSBmcm9tICcuL2Ftb3VudHMtbWF0Y2gnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBjYW5jZWxDbGlja0V2ZW50IH0gZnJvbSAnLi9jYW5jZWwtY2xpY2stZXZlbnQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBwYXJzZUluZmluaXR5IH0gZnJvbSAnLi9wYXJzZS1pbmZpbml0eSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHBhcnNlTW9uZXlWYWx1ZSB9IGZyb20gJy4vcGFyc2UtbW9uZXktdmFsdWUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBzaG9ydGVuQ3VpZCB9IGZyb20gJy4vc2hvcnRlbi1jdWlkJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc05pbCB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogY29udmVydHMgaW5maW5pdGUgdmFsdWVzIHRvIG51bGwgZm9yIHVzZSBpbiBmb3Jtc1xuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudWxsfG51bWJlcnxzdHJpbmd9IG51bWJlclxuICogQHBhcmFtIHtib29sZWFufSBhc0ludFxuICogQHBhcmFtIHtib29sZWFufSBmb3JEYlxuICogQHJldHVybiB7bnVtYmVyfSBjb252ZXJ0ZWQgaW5maW5pdGUgdmFsdWVcbiAqL1xuY29uc3QgcGFyc2VJbmZpbml0eSA9ICggbnVtYmVyLCBhc0ludCA9IGZhbHNlLCBmb3JEYiA9IGZhbHNlICkgPT4ge1xuXHQvLyByZXR1cm5zIHRydWUgZm9yIGFueSBwb3NzaWJsZSB2YWx1ZSB0aGF0IGNvdWxkIHJlcHJlc2VudCBpbmZpbml0eVxuXHRjb25zdCByZXByZXNlbnRzSW5maW5pdHkgPSAoIHZhbHVlICkgPT5cblx0XHR2YWx1ZSA9PT0gLTEgfHxcblx0XHR2YWx1ZSA9PT0gJycgfHxcblx0XHR2YWx1ZSA9PT0gJ0lORicgfHxcblx0XHR2YWx1ZSA9PT0gSW5maW5pdHkgfHxcblx0XHRpc05pbCggdmFsdWUgKTtcblx0bnVtYmVyID0gcmVwcmVzZW50c0luZmluaXR5KCBudW1iZXIgKSB8fCAoXG5cdFx0bnVtYmVyLnR5cGUgJiZcblx0XHRudW1iZXIudHlwZS5uYW1lID09PSAnSW5maW5pdHlTeW1ib2wnICYmXG5cdFx0cmVwcmVzZW50c0luZmluaXR5KCBudW1iZXIucHJvcHMudmFsdWUgKVxuXHQpID9cblx0XHRJbmZpbml0eSA6XG5cdFx0bnVtYmVyO1xuXHRudW1iZXIgPSBudW1iZXIgIT09IEluZmluaXR5ICYmIGFzSW50ID8gcGFyc2VJbnQoIG51bWJlciwgMTAgKSA6IG51bWJlcjtcblx0Ly8gbm90IGluZmluaXR5IE9SIGlzIGluZmluaXR5IGJ1dCBub3QgZm9yIGRiXG5cdG51bWJlciA9IG51bWJlciAhPT0gSW5maW5pdHkgfHwgKCBudW1iZXIgPT09IEluZmluaXR5ICYmICEgZm9yRGIgKSA/XG5cdFx0bnVtYmVyIDpcblx0XHQtMTtcblx0cmV0dXJuIG51bWJlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlSW5maW5pdHk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IFNpdGVDdXJyZW5jeSBmcm9tICcuLi92by9jdXJyZW5jeSc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG1vbmV5VmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn0gbW9uZXkgdmFsdWVcbiAqL1xuY29uc3QgcGFyc2VNb25leVZhbHVlID0gKCBtb25leVZhbHVlICkgPT4ge1xuXHRtb25leVZhbHVlID0gbW9uZXlWYWx1ZSAmJiBtb25leVZhbHVlLnRvU3RyaW5nID9cblx0XHRtb25leVZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZShcblx0XHRcdG5ldyBSZWdFeHAoIFNpdGVDdXJyZW5jeS50aG91c2FuZHNTZXBhcmF0b3IsICdnJyApLFxuXHRcdFx0Jydcblx0XHQpLnJlcGxhY2UoXG5cdFx0XHRTaXRlQ3VycmVuY3kuc2lnbixcblx0XHRcdCcnXG5cdFx0KSA6XG5cdFx0MDtcblx0bW9uZXlWYWx1ZSA9IHBhcnNlRmxvYXQoIG1vbmV5VmFsdWUgKTtcblx0cmV0dXJuICEgaXNOYU4oIG1vbmV5VmFsdWUgKSA/IG1vbmV5VmFsdWUgOiAwO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFyc2VNb25leVZhbHVlO1xuIiwiLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBjdWlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmRcbiAqIEByZXR1cm4ge3N0cmluZ30gY3VpZCBzbmlwcGV0XG4gKi9cbmNvbnN0IHNob3J0ZW5DdWlkID0gKCBjdWlkLCBzdGFydCA9IDEyLCBlbmQgPSAxOCApID0+IHtcblx0aWYgKCBjdWlkLmhhc093blByb3BlcnR5KCAnbGVuZ3RoJyApICYmIGN1aWQubGVuZ3RoID4gZW5kICkge1xuXHRcdC8vIHVzZSBhIHNtYWxsZXIgbW9yZSB1bmlxdWUgcG9ydGlvbiBvZiB0aGUgQ1VJRFxuXHRcdHJldHVybiBjdWlkLnN1YnN0cmluZyggc3RhcnQsIGVuZCApO1xuXHR9XG5cdHJldHVybiBjdWlkO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2hvcnRlbkN1aWQ7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0aXNFbXB0eSxcblx0aXNTdHJpbmcsXG5cdGlzTnVtYmVyLFxuXHRpc0Jvb2xlYW4sXG5cdGlzVW5kZWZpbmVkLFxufSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgRXhjZXB0aW9uLCBDVVJSRU5DWV9DT05GSUcgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnO1xuXG4vKipcbiAqIEEgdmFsdWUgb2JqZWN0IHJlcHJlc2VudGluZyBjdXJyZW5jeSB2YWx1ZXNcbiAqL1xuZXhwb3J0IGNsYXNzIEN1cnJlbmN5IHtcblx0LyoqXG5cdCAqIFRoZSBJU08gNDIxNyBjb2RlIGlkZW50aWZ5aW5nIHRoZSBjdXJyZW5jeSAoZWcuICdVU0QnKVxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Y29kZSA9ICcnO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2luZ3VsYXIgbGFiZWwgZm9yIHRoZSBjdXJyZW5jeSAoZWcuICdEb2xsYXInKTtcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHNpbmd1bGFyTGFiZWwgPSAnJztcblxuXHQvKipcblx0ICogVGhlIHBsdXJhbCBsYWJlbCBmb3IgdGhlIGN1cnJlbmN5IChlZy4gJ0RvbGxhcnMnKTtcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHBsdXJhbExhYmVsID0gJyc7XG5cblx0LyoqXG5cdCAqIFRoZSBjdXJyZW5jeSBzeW1ib2wgKGVnLiAnJCcpO1xuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0c2lnbiA9ICcnO1xuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW5jeSBzeW1ib2wgaXMgZGlzcGxheWVkIGJlZm9yZSBvciBhZnRlciB0aGUgdmFsdWUuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0c2lnbkI0ID0gdHJ1ZTtcblxuXHQvKipcblx0ICogVGhlIHByZWNpc2lvbiBmb3IgdGhlIHZhbHVlIChlZy4gMTAuMDIgaXMgMiwgMTAuMTIzIGlzIDMpLiBUaGUgbnVtYmVyIG9mXG5cdCAqIGRlY2ltYWwgcGxhY2VzIGNhbiBiZSB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgbnVtYmVyIG9mIHN1YnVuaXRzIGZvciB0aGVcblx0ICogY3VycmVuY3kgLSBzdWJ1bml0cyA9IHBvdyggMTAsIGRlY2ltYWxQbGFjZXMpLlxuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0ZGVjaW1hbFBsYWNlcyA9IDI7XG5cblx0LyoqXG5cdCAqIFRoZSBzeW1ib2wgdXNlZCBmb3IgdGhlIGRlY2ltYWwgbWFyayAoZWcuICcuJylcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGRlY2ltYWxNYXJrID0gJy4nO1xuXG5cdC8qKlxuXHQgKiBUaGUgc3ltYm9sIHVzZWQgdG8gc3BsaXQgdXAgdGhvdXNhbmRzIGluIHRoZSB2YWx1ZSAoZWcuICcsJylcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHRob3VzYW5kc1NlcGFyYXRvciA9ICcsJztcblxuXHQvKipcblx0ICogVGhlIG51bWJlciBvZiBmcmFjdGlvbmFsIGRpdmlzaW9ucyBvZiBhIGN1cnJlbmN5J3MgbWFpbiB1bml0LiAgSWYgbm90XG5cdCAqIHByb3ZpZGVkLCB0aGVuIGl0IGlzIGF1dG9tYXRpY2FsbHkgY2FsY3VsYXRlZCBmcm9tIHRoZSBkZWNpbWFsUGxhY2VzXG5cdCAqIHZhbHVlLlxuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3VidW5pdHMgPSAxMDA7XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSB7e319IGN1cnJlbmN5Q29uZmlnIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBjb25maWd1cmF0aW9uIGZvclxuXHQgKiB0aGlzIGN1cnJlbmN5IHZhbHVlIG9iamVjdC4gIE9uIGNvbnN0cnVjdGlvbiwgdGhlIEN1cnJlbmN5IG9iamVjdCBpc1xuXHQgKiBmcm96ZW4gc28gdGhhdCBpdCBiZWNvbWVzIGltbXV0YWJsZS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKCBjdXJyZW5jeUNvbmZpZyApIHtcblx0XHRDdXJyZW5jeS52YWxpZGF0ZUN1cnJlbmN5Q29uZmlnKCBjdXJyZW5jeUNvbmZpZyApO1xuXHRcdHRoaXMuY29kZSA9IGN1cnJlbmN5Q29uZmlnLmNvZGU7XG5cdFx0dGhpcy5zaW5ndWxhckxhYmVsID0gY3VycmVuY3lDb25maWcuc2luZ3VsYXJMYWJlbCB8fCAnJztcblx0XHR0aGlzLnBsdXJhbExhYmVsID0gY3VycmVuY3lDb25maWcucGx1cmFsTGFiZWwgfHwgJyc7XG5cdFx0dGhpcy5zaWduID0gY3VycmVuY3lDb25maWcuc2lnbjtcblx0XHR0aGlzLnNpZ25CNCA9IGlzVW5kZWZpbmVkKCBjdXJyZW5jeUNvbmZpZy5zaWduQjQgKSA/XG5cdFx0XHR0aGlzLnNpZ25CNCA6XG5cdFx0XHRjdXJyZW5jeUNvbmZpZy5zaWduQjQ7XG5cdFx0dGhpcy5kZWNpbWFsUGxhY2VzID0gaXNVbmRlZmluZWQoIGN1cnJlbmN5Q29uZmlnLmRlY2ltYWxQbGFjZXMgKSA/XG5cdFx0XHR0aGlzLmRlY2ltYWxQbGFjZXMgOlxuXHRcdFx0Y3VycmVuY3lDb25maWcuZGVjaW1hbFBsYWNlcztcblx0XHR0aGlzLmRlY2ltYWxNYXJrID0gY3VycmVuY3lDb25maWcuZGVjaW1hbE1hcmsgfHwgdGhpcy5kZWNpbWFsTWFyaztcblx0XHR0aGlzLnRob3VzYW5kc1NlcGFyYXRvciA9IGN1cnJlbmN5Q29uZmlnLnRob3VzYW5kc1NlcGFyYXRvciB8fCB0aGlzLnRob3VzYW5kc1NlcGFyYXRvcjtcblx0XHR0aGlzLnN1YnVuaXRzID0gY3VycmVuY3lDb25maWcuc3VidW5pdHMgfHxcblx0XHRcdE1hdGgucG93KCAxMCwgdGhpcy5kZWNpbWFsUGxhY2VzICk7XG5cdFx0T2JqZWN0LmZyZWV6ZSggdGhpcyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGN1cnJlbmN5IHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0IGZvcm1hdHRlZCBmb3IgdGhlXG5cdCAqIGFjY291bnRpbmctanMgbGlicmFyeSBjb25maWd1cmF0aW9uLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHt7fX0gIEFuIG9iamVjdCBzaGFwZWQgZm9yIHdoYXQgdGhlIGFjY291bnRpbmctanMgbGlicmFyeSBleHBlY3RzXG5cdCAqL1xuXHR0b0FjY291bnRpbmdTZXR0aW5ncygpIHtcblx0XHRjb25zdCBkZWNpbWFsSW5mbyA9IHtcblx0XHRcdGRlY2ltYWw6IHRoaXMuZGVjaW1hbE1hcmssXG5cdFx0XHR0aG91c2FuZDogdGhpcy50aG91c2FuZHNTZXBhcmF0b3IsXG5cdFx0XHRwcmVjaXNpb246IHRoaXMuZGVjaW1hbFBsYWNlcyxcblx0XHR9O1xuXHRcdHJldHVybiB7XG5cdFx0XHRjdXJyZW5jeToge1xuXHRcdFx0XHRzeW1ib2w6IHRoaXMuc2lnbixcblx0XHRcdFx0Zm9ybWF0OiB7XG5cdFx0XHRcdFx0cG9zOiB0aGlzLnNpZ25CNCA/ICclcyV2JyA6ICcldiVzJyxcblx0XHRcdFx0XHRuZWc6IHRoaXMuc2lnbkI0ID8gJy0gJHMldicgOiAnLSAldiVzJyxcblx0XHRcdFx0XHR6ZXJvOiB0aGlzLnNpZ25CNCA/ICclcyV2JyA6ICcldiVzJyxcblx0XHRcdFx0fSxcblx0XHRcdFx0Li4uZGVjaW1hbEluZm8sXG5cdFx0XHR9LFxuXHRcdFx0bnVtYmVyOiBkZWNpbWFsSW5mbyxcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiB7T2JqZWN0fSBGdW5jdGlvbiByZXR1cm5pbmcgdGhlIG9iamVjdCB0byBiZSBzZXJpYWxpemVkIGJ5XG5cdCAqIEpTT04uc3RyaW5naWZ5XG5cdCAqL1xuXHR0b0pTT04oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvZGU6IHRoaXMuY29kZSxcblx0XHRcdHNpbmd1bGFyTGFiZWw6IHRoaXMuc2luZ3VsYXJMYWJlbCxcblx0XHRcdHBsdXJhbExhYmVsOiB0aGlzLnBsdXJhbExhYmVsLFxuXHRcdFx0c2lnbjogdGhpcy5zaWduLFxuXHRcdFx0c2lnbkI0OiB0aGlzLnNpZ25CNCxcblx0XHRcdGRlY2ltYWxNYXJrOiB0aGlzLmRlY2ltYWxNYXJrLFxuXHRcdFx0dGhvdXNhbmRzU2VwYXJhdG9yOiB0aGlzLnRob3VzYW5kc1NlcGFyYXRvcixcblx0XHRcdHN1YnVuaXRzOiB0aGlzLnN1YnVuaXRzLFxuXHRcdFx0ZGVjaW1hbFBsYWNlczogdGhpcy5kZWNpbWFsUGxhY2VzLFxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyB2YWxpZGF0ZXMgd2hldGhlciB0aGUgcGFzc2VkIGluIGNvbmZpZyBoYXMgdGhlIHJlcXVpcmVkIHByb3BlcnRpZXNcblx0ICogKGFuZCBjb3JyZWN0IHR5cGVzKSBmb3IgY29uc3RydWN0aW5nIGEgQ3VycmVuY3kgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3t9fSBjb25maWdcblx0ICogQHRocm93cyB7RXhjZXB0aW9ufVxuXHQgKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG5cdCAqL1xuXHRzdGF0aWMgdmFsaWRhdGVDdXJyZW5jeUNvbmZpZyA9ICggY29uZmlnICkgPT4ge1xuXHRcdGlmICggaXNFbXB0eSggY29uZmlnICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKFxuXHRcdFx0XHQnVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHByb3ZpZGVkIHRvIEN1cnJlbmN5IG11c3Qgbm90JyArXG5cdFx0XHRcdCcgYmUgZW1wdHknXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoICEgY29uZmlnLmNvZGUgfHwgISBpc1N0cmluZyggY29uZmlnLmNvZGUgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgcHJvdmlkZWQgdG8gQ3VycmVuY3kgbXVzdCBoYXZlICcgK1xuXHRcdFx0XHQnYSBcImNvZGVcIiBwcm9wZXJ0eSB0aGF0IGlzIGEgc3RyaW5nLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCAhIGNvbmZpZy5zaWduIHx8ICEgaXNTdHJpbmcoIGNvbmZpZy5zaWduICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHByb3ZpZGVkIHRvIEN1cnJlbmN5IG11c3QgaGF2ZSBhICcgK1xuXHRcdFx0XHQnXCJzaWduXCIgcHJvcGVydHkgdGhhdCBpcyBhIHN0cmluZy4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLnNpbmd1bGFyTGFiZWwgJiYgISBpc1N0cmluZyggY29uZmlnLnNpbmd1bGFyTGFiZWwgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgc2luZ3VsYXJMYWJlbCBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgc3RyaW5nIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLnBsdXJhbExhYmVsICYmICEgaXNTdHJpbmcoIGNvbmZpZy5wbHVyYWxMYWJlbCApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBwbHVyYWxMYWJlbCBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdCdtdXN0IGJlIGEgc3RyaW5nIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggY29uZmlnLnNpZ25CNCAmJiAhIGlzQm9vbGVhbiggY29uZmlnLnNpZ25CNCApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBzaWduQjQgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIGJvb2xlYW4gcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcuZGVjaW1hbFBsYWNlcyAmJiAhIGlzTnVtYmVyKCBjb25maWcuZGVjaW1hbFBsYWNlcyApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBkZWNpbWFsUGxhY2VzIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBudW1iZXIgcHJpbWl0aXZlJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy5kZWNpbWFsTWFyayAmJiAhIGlzU3RyaW5nKCBjb25maWcuZGVjaW1hbE1hcmsgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgZGVjaW1hbE1hcmsgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHQnbXVzdCBiZSBhIHN0cmluZyBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIGNvbmZpZy50aG91c2FuZHNTZXBhcmF0b3IgJiZcblx0XHRcdCEgaXNTdHJpbmcoIGNvbmZpZy50aG91c2FuZHNTZXBhcmF0b3IgKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgdGhvdXNhbmRzU2VwYXJhdG9yIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBzdHJpbmcgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcuc3VidW5pdHMgJiYgISBpc051bWJlciggY29uZmlnLnN1YnVuaXRzICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHN1YnVuaXRzIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0J211c3QgYmUgYSBudW1iZXIgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogRXhwb3J0IG9mIGEgQ3VycmVuY3kgVmFsdWUgb2JqZWN0IGNyZWF0ZWQgZnJvbSBhIGN1cnJlbmN5IGNvbmZpZyBwcm92aWRlZC5cbiAqIFRoaXMgY2F0Y2hlcyBhbnkgZXhjZXB0aW9uIGFuZCB0cmlnZ2VycyBhIGNvbnNvbGUgZXJyb3IuXG4gKlxuICogQHBhcmFtIHt7fX0gY29uZmlnXG4gKiBAcmV0dXJuIHtDdXJyZW5jeXx7fX0gSWYgdGhlcmUncyBhIHByb2JsZW0gY29uc3RydWN0aW5nIHRoZSBjdXJyZW5jeSBvYmplY3RcbiAqIGFuIGVtcHR5IG9iamVjdCBpcyByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGNvbnN0IFNpdGVDdXJyZW5jeSA9ICggY29uZmlnID0ge30gKSA9PiB7XG5cdGxldCBjdXJyZW5jeTtcblx0dHJ5IHtcblx0XHRjdXJyZW5jeSA9IG5ldyBDdXJyZW5jeSggY29uZmlnICk7XG5cdH0gY2F0Y2ggKCBlICkge1xuXHRcdGN1cnJlbmN5ID0ge307XG5cdFx0d2FybmluZyhcblx0XHRcdGZhbHNlLFxuXHRcdFx0J1RoZSBTaXRlIEN1cnJlbmN5IG9iamVjdCBjb3VsZCBub3QgYmUgY3JlYXRlZCBiZWNhdXNlICcgK1xuXHRcdFx0J29mIHRoaXMgZXJyb3I6ICcgKyBlLm1lc3NhZ2Vcblx0XHQpO1xuXHR9XG5cdHJldHVybiBjdXJyZW5jeTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNpdGVDdXJyZW5jeSggQ1VSUkVOQ1lfQ09ORklHICk7XG4iLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xuXG52YXIgd2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChfX0RFVl9fKSB7XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAxID8gbGVuIC0gMSA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDE7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMV0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICtcbiAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9XG5cbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgK1xuICAgICAgICAgICdtZXNzYWdlIGFyZ3VtZW50J1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHByaW50V2FybmluZy5hcHBseShudWxsLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibG9kYXNoXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
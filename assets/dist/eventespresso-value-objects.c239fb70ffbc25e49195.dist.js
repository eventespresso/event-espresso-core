/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/accounting-js/dist/accounting.umd.js":
/*!***********************************************************!*\
  !*** ./node_modules/accounting-js/dist/accounting.umd.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports) {

(function (global, factory) {
	 true ? factory(exports) :
	0;
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

/***/ "./assets/src/vo/currency.js":
/*!***********************************!*\
  !*** ./assets/src/vo/currency.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Currency": function() { return /* binding */ Currency; },
/* harmony export */   "SiteCurrency": function() { return /* binding */ SiteCurrency; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_3__);


/**
 * External imports
 */



/**
 * A value object representing currency values
 */

class Currency {
  /**
   * because minification destroys class names and renders instaneOf useless
   *
   * @type {string}
   */

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
  constructor(currencyConfig) {
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "displayName", 'Currency');

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "code", '');

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "singularLabel", '');

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "pluralLabel", '');

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "sign", '');

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "signB4", true);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "decimalPlaces", 2);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "decimalMark", '.');

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "thousandsSeparator", ',');

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "subunits", 100);

    Currency.validateCurrencyConfig(currencyConfig);
    this.displayName = 'Currency';
    this.code = currencyConfig.code;
    this.singularLabel = currencyConfig.singularLabel || '';
    this.pluralLabel = currencyConfig.pluralLabel || '';
    this.sign = currencyConfig.sign;
    this.signB4 = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(currencyConfig.signB4) ? this.signB4 : currencyConfig.signB4;
    this.decimalPlaces = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(currencyConfig.decimalPlaces) ? this.decimalPlaces : currencyConfig.decimalPlaces;
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


  toAccountingSettings() {
    const decimalInfo = {
      decimal: this.decimalMark,
      thousand: this.thousandsSeparator,
      precision: this.decimalPlaces
    };
    return {
      currency: {
        symbol: this.sign,
        format: {
          pos: this.signB4 ? '%s%v' : '%v%s',
          neg: this.signB4 ? '- $s%v' : '- %v%s',
          zero: this.signB4 ? '%s%v' : '%v%s'
        },
        ...decimalInfo
      },
      number: decimalInfo
    };
  }
  /**
   * Returns JSON representation of this object.
   *
   * @return {Object} Function returning the object to be serialized by
   * JSON.stringify
   */


  toJSON() {
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
   * @param {Object} config
   * @throws {Exception}
   * @throws {TypeError}
   */


}
/**
 * Export of a Currency Value object created from a currency config provided.
 * This catches any exception and triggers a console error.
 *
 * @param {Object} config
 * @return {Currency|{}} If there's a problem constructing the currency object
 * an empty object is returned.
 */

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Currency, "validateCurrencyConfig", config => {
  if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(config)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__.Exception('The configuration object provided to Currency must not' + ' be empty');
  }

  if (!config.code || !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(config.code)) {
    throw new TypeError('The configuration object provided to Currency must have ' + 'a "code" property that is a string.');
  }

  if (!config.sign || !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(config.sign)) {
    throw new TypeError('The configuration object provided to Currency must have a ' + '"sign" property that is a string.');
  }

  if (config.singularLabel && !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(config.singularLabel)) {
    throw new TypeError('The singularLabel property on the configuration object ' + 'must be a string primitive.');
  }

  if (config.pluralLabel && !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(config.pluralLabel)) {
    throw new TypeError('The pluralLabel property on the configuration object ' + 'must be a string primitive.');
  }

  if (config.signB4 && !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isBoolean)(config.signB4)) {
    throw new TypeError('The signB4 property on the configuration object ' + 'must be a boolean primitive.');
  }

  if (config.decimalPlaces && !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNumber)(config.decimalPlaces)) {
    throw new TypeError('The decimalPlaces property on the configuration object ' + 'must be a number primitive');
  }

  if (config.decimalMark && !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(config.decimalMark)) {
    throw new TypeError('The decimalMark property on the configuration object ' + 'must be a string primitive.');
  }

  if (config.thousandsSeparator && !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(config.thousandsSeparator)) {
    throw new TypeError('The thousandsSeparator property on the configuration object ' + 'must be a string primitive.');
  }

  if (config.subunits && !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNumber)(config.subunits)) {
    throw new TypeError('The subunits property on the configuration object ' + 'must be a number primitive.');
  }
});

const SiteCurrency = function () {
  let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let currency;

  try {
    currency = new Currency(config);
  } catch (e) {
    currency = {};
    warning__WEBPACK_IMPORTED_MODULE_3___default()(false, 'The Site Currency object could not be created because ' + 'of this error: ' + e.message);
  }

  return currency;
};
/* harmony default export */ __webpack_exports__["default"] = (SiteCurrency(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__.CURRENCY_CONFIG));

/***/ }),

/***/ "./assets/src/vo/date-time/assertions.js":
/*!***********************************************!*\
  !*** ./assets/src/vo/date-time/assertions.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assertISO8601IsValid": function() { return /* binding */ assertISO8601IsValid; },
/* harmony export */   "assertIsDate": function() { return /* binding */ assertIsDate; },
/* harmony export */   "assertIsOffset": function() { return /* binding */ assertIsOffset; },
/* harmony export */   "assertLocaleIsValid": function() { return /* binding */ assertLocaleIsValid; },
/* harmony export */   "assertTimezoneIsValid": function() { return /* binding */ assertTimezoneIsValid; },
/* harmony export */   "validateISO8601": function() { return /* binding */ validateISO8601; },
/* harmony export */   "validateIsDate": function() { return /* binding */ validateIsDate; },
/* harmony export */   "validateIsOffset": function() { return /* binding */ validateIsOffset; },
/* harmony export */   "validateLocale": function() { return /* binding */ validateLocale; },
/* harmony export */   "validateTimezone": function() { return /* binding */ validateTimezone; }
/* harmony export */ });
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
  if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(locale)) {
    return false;
  }

  const originalLocale = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default().locale();
  const validationLocale = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default().locale(locale); // reset back to original locale

  moment_timezone__WEBPACK_IMPORTED_MODULE_0___default().locale(originalLocale);
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
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__.InvalidLocale(locale);
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
  let isDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(dateTimeString)) {
    return false;
  }

  const regex = isDuration ? /^(R\d*\/)?P(?:\d+(?:\.\d+)?Y)?(?:\d+(?:\.\d+)?M)?(?:\d+(?:\.\d+)?W)?(?:\d+(?:\.\d+)?D)?(?:T(?:\d+(?:\.\d+)?H)?(?:\d+(?:\.\d+)?M)?(?:\d+(?:\.\d+)?S)?)?$/ : /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
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
  let isDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!validateISO8601(dateTimeString, isDuration)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__.InvalidISO8601String(dateTimeString);
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
  if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(timezone)) {
    return false;
  }

  const dt = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default().tz.zone(timezone);
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
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__.InvalidTimezone(timezone);
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
  return (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNumber)(offset);
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ DateTime; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assertions */ "./assets/src/vo/date-time/assertions.js");
/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./duration */ "./assets/src/vo/date-time/duration.js");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./defaults */ "./assets/src/vo/date-time/defaults.js");


let _privateMethods$norma, _privateMethods$extra, _privateMethods$norma2, _privateMethods$norma3, _privateMethods$norma4, _privateMethods$getUn, _privateMethods$creat;

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

const privateProperties = {
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

const privateMethods = {
  getUnitNames: Symbol('DateTimeMethodGetUnitNames'),
  createGettersAndSetters: Symbol('DateTimeMethodCreateGettersAndSetters'),
  extractMomentsFromDateTimes: Symbol('DateTimeMethodExtractMomentsFromDateTimes'),
  normalizeUnitName: Symbol('DateTimeMethodNormalizeUnitName'),
  normalizeUnitObject: Symbol('DateTimeMethodNormalizeUnitObject'),
  normalizeUnitValue: Symbol('DateTimeMethodNormalizeUnitValue'),
  normalizeArguments: Symbol('DateTimeMethodNormalizeArguments')
};
const validDateTimeUnits = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'];
/**
 * The DateTime value object represents a single point in time.
 *
 * Internally, the DateTime class here uses `moment`.  This is an abstraction
 * loosely following the adapter pattern so that there is a common api that
 * can be depended on if in the future the internal library is switched to
 * something different (such as Luxon).
 */

_privateMethods$norma = privateMethods.normalizeArguments;
_privateMethods$extra = privateMethods.extractMomentsFromDateTimes;
_privateMethods$norma2 = privateMethods.normalizeUnitName;
_privateMethods$norma3 = privateMethods.normalizeUnitValue;
_privateMethods$norma4 = privateMethods.normalizeUnitObject;
_privateMethods$getUn = privateMethods.getUnitNames;
_privateMethods$creat = privateMethods.createGettersAndSetters;
class DateTime {
  /**
   * because minification destroys class names and renders instaneOf useless
   *
   * @type {string}
   */

  /**
   * The constructor for the DateTime class
   *
   * @param {string} iso8601DateString
   * @param {string|null} timezone If null, then timezone is not set.
   * @param {string} locale
   * @param {string} displayName
   */
  constructor() {
    let iso8601DateString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_TIMEZONE_STRING;
    let locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_VALID_LOCALE;
    let displayName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'DateTime';

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "displayName", 'DateTime');

    this.displayName = displayName === 'DateTime' || displayName === 'ServerDateTime' ? displayName : 'DateTime';

    if (iso8601DateString !== '') {
      this.constructor.assertISO8601IsValid(iso8601DateString);
    }

    this.constructor.assertLocaleIsValid(locale);

    if (timezone === null) {
      this[privateProperties.datetime] = iso8601DateString === '' ? moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().utc().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()(iso8601DateString).utcOffset(iso8601DateString).locale(locale);
    } else if (timezone === this.constructor.TIMEZONE_LOCAL) {
      this[privateProperties.datetime] = iso8601DateString === '' ? moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()(iso8601DateString).locale(locale);
    } else {
      this.constructor.assertTimezoneIsValid(timezone);
      this[privateProperties.datetime] = iso8601DateString === '' ? moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()().tz(timezone).locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().tz(iso8601DateString, timezone).locale(locale);
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


  static validateLocale(locale) {
    return _assertions__WEBPACK_IMPORTED_MODULE_5__.validateLocale(locale);
  }
  /**
   * Asserts if the given locale is valid and throws an error if not.
   *
   * @param {string} locale
   * @throws InvalidLocale
   */


  static assertLocaleIsValid(locale) {
    _assertions__WEBPACK_IMPORTED_MODULE_5__.assertLocaleIsValid(locale);
  }
  /**
   * Indicates if the given ISO8601 string is valid.
   *
   * @param {string} dateTimeString
   * @return {boolean} true means it is valid.
   */


  static validateISO8601(dateTimeString) {
    return _assertions__WEBPACK_IMPORTED_MODULE_5__.validateISO8601(dateTimeString);
  }
  /**
   * Asserts if the given string is a valid ISO 8601 string.
   *
   * @param {string} dateTimeString
   * @throws InvalidISO8601String
   */


  static assertISO8601IsValid(dateTimeString) {
    _assertions__WEBPACK_IMPORTED_MODULE_5__.assertISO8601IsValid(dateTimeString);
  }
  /**
   * Indicates if the given string is a valid timezone
   *
   * @param {string} timezone
   * @return {boolean} true means it is valid.
   */


  static validateTimezone(timezone) {
    return _assertions__WEBPACK_IMPORTED_MODULE_5__.validateTimezone(timezone);
  }
  /**
   * Asserts whether the given string is a valid timezone string.
   *
   * @param {string} timezone
   * @throws InvalidTimezone
   */


  static assertTimezoneIsValid(timezone) {
    _assertions__WEBPACK_IMPORTED_MODULE_5__.assertTimezoneIsValid(timezone);
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


  static validateIsOffset(offset) {
    return _assertions__WEBPACK_IMPORTED_MODULE_5__.validateIsOffset(offset);
  }
  /**
   * Asserts whether the provided value is a valid offset.
   *
   * @param {number} offset
   * @throws TypeError
   */


  static assertIsOffset(offset) {
    _assertions__WEBPACK_IMPORTED_MODULE_5__.assertIsOffset(offset);
  }
  /**
   * Indicates whether the provided value is an instance of DateTime
   *
   * @param {DateTime} datetime
   * @return {boolean} returns true if it is an instance of DateTime
   */


  static validateIsDateTime(datetime) {
    return (0,_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__.instanceOf)(datetime, 'DateTime') || (0,_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__.instanceOf)(datetime, 'ServerDateTime');
  }
  /**
   * Asserts whether the provided value is an instance of DateTime
   *
   * @param {DateTime} datetime
   * @throws TypeError
   */


  static assertIsDateTime(datetime) {
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


  static validateIsDate(date) {
    return _assertions__WEBPACK_IMPORTED_MODULE_5__.validateIsDate(date);
  }
  /**
   * Asserts whether the given value is an instance of Date.
   *
   * @param {Date} date
   * @throws TypeError
   */


  static assertIsDate(date) {
    _assertions__WEBPACK_IMPORTED_MODULE_5__.assertIsDate(date);
  }
  /**
   * Indicates whether the provided value is an instance of DateTime and is
   * a "valid" datetime (meaning the instance was constructed with valid
   * arguments).
   *
   * @param {DateTime} datetime
   * @return {boolean} true means it is valid.
   */


  static isValid(datetime) {
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


  static assertIsValid(datetime) {
    if (!this.isValid(datetime)) {
      throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__.InvalidDateTime(datetime);
    }
  }

  static [_privateMethods$norma](dateValue, timezone, locale) {
    return [dateValue, timezone, locale];
  }
  /**
   * A private internal helper method that is used to extract all moment
   * instances from the provided DateTimes (passed in as arguments).
   *
   * @param {...DateTime} datetimes
   * @return {Moment[]} An array of moment instances extracted from the
   * DateTimes
   */


  static [_privateMethods$extra]() {
    for (var _len = arguments.length, datetimes = new Array(_len), _key = 0; _key < _len; _key++) {
      datetimes[_key] = arguments[_key];
    }

    return datetimes.map(datetime => {
      this.assertIsDateTime(datetime);
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


  static max() {
    return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().max(this[privateMethods.extractMomentsFromDateTimes](...arguments)));
  }
  /**
   * Given an indefinite number of DateTimes as arguments, this will return a
   * new DateTime that represents the earliest point in time.
   *
   * @param {...DateTime} datetimes
   * @return {DateTime|ServerDateTime} A new DateTime representing the earliest point in
   * time.
   */


  static min() {
    return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().min(this[privateMethods.extractMomentsFromDateTimes](...arguments)));
  }
  /**
   * Constructs a DateTime from an instance of moment.
   *
   * @param {moment} momentInstance
   * @return {DateTime|ServerDateTime} An instance of DateTime
   */


  static fromMoment(momentInstance) {
    if (!moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().isMoment(momentInstance)) {
      throw new TypeError('Requires an instance of moment.');
    } // this would account for client code that is using `moment` but not
    // using `moment-timezone`.


    return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isFunction)(momentInstance.tz) && !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(momentInstance.tz()) && momentInstance.tz() !== 'UTC' ? new this(momentInstance.toISOString(), momentInstance.tz(), momentInstance.locale()) : new this(momentInstance.toISOString(true), null, momentInstance.locale());
  }
  /**
   * Constructs a DateTime from an ISO 8601 string.
   *
   * @param {string} ISOString
   * @param {string} timezone
   * @param {string} locale
   * @return {DateTime|ServerDateTime} An instance of DateTime
   */


  static fromISO(ISOString) {
    let timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_TIMEZONE_STRING;
    let locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_VALID_LOCALE;

    if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(ISOString)) {
      throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__.InvalidISO8601String(ISOString);
    }

    return new this(ISOString, timezone, locale);
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


  static fromISOWithOffset(ISOString) {
    let offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_OFFSET;
    let locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_VALID_LOCALE;
    this.assertISO8601IsValid(ISOString);
    this.assertIsOffset(offset);
    this.assertLocaleIsValid(locale);
    const datetime = moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().utc(ISOString).utcOffset(offset, true).locale(locale);
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


  static fromJSDate(date) {
    let timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_TIMEZONE_STRING;
    let locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_VALID_LOCALE;
    this.assertIsDate(date);
    this.assertTimezoneIsValid(timezone);
    this.assertLocaleIsValid(locale);
    return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()(date).tz(timezone).locale(locale));
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


  static fromJSDateWithOffset(date) {
    let offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_OFFSET;
    let locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_VALID_LOCALE;
    this.assertIsDate(date);
    this.assertIsOffset(offset);
    this.assertLocaleIsValid(locale);
    return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()(date).utcOffset(offset).locale(locale));
  }
  /**
   * Constructs a DateTime (in UTC) with milliseconds from epoch.
   *
   * @param {number} milliseconds
   * @param {string} locale
   * @return {DateTime|ServerDateTime} Returns an instance of DateTime
   * @throws TypeError
   */


  static fromMilliseconds(milliseconds) {
    let locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_VALID_LOCALE;
    this.assertLocaleIsValid(locale);

    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNumber)(milliseconds)) {
      throw new TypeError('Provided value must be a number ' + 'representing milliseconds from the epoch');
    }

    return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()(milliseconds).utc().locale(locale));
  }
  /**
   * Constructs a DateTime in UTC with seconds from the epoch.
   *
   * @param {number} seconds
   * @param {string} locale
   * @return {DateTime|ServerDateTime} An instance of DateTime
   * @throws TypeError
   */


  static fromUnix(seconds) {
    let locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_VALID_LOCALE;
    this.assertLocaleIsValid(locale);

    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNumber)(seconds)) {
      throw new TypeError('Provided value must be a number ' + 'representing seconds from the epoch');
    }

    return this.fromMoment(moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().unix(seconds).utc().locale(locale));
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


  static fromLocal(values) {
    let locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_VALID_LOCALE;
    this.assertLocaleIsValid(locale);
    values = this[privateMethods.normalizeUnitObject](values);
    const datetime = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(values) ? moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()(values).locale(locale);

    if (datetime.isValid() !== true) {
      throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__.InvalidArgument('Double-check the values you sent in.', values);
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


  static utc(values) {
    let locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_VALID_LOCALE;
    this.assertLocaleIsValid(locale);
    values = this[privateMethods.normalizeUnitObject](values);
    const datetime = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(values) ? moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().utc().locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().utc(values).locale(locale);

    if (datetime.isValid() !== true) {
      throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__.InvalidArgument('Double-check the values sent in.', values);
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


  static fromObject(values) {
    const locale = values.locale || _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_VALID_LOCALE;
    const timezone = values.timezone || _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_TIMEZONE_STRING;
    const offset = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(values.offset) ? null : values.offset;
    let valuesForConstruct = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.omit)(values, ['locale', 'timezone', 'offset']);
    this.assertLocaleIsValid(locale);

    if (offset !== null) {
      this.assertIsOffset(offset);
      valuesForConstruct = this[privateMethods.normalizeUnitObject](valuesForConstruct);
      const datetime = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(valuesForConstruct) ? moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()().utcOffset(offset, true).locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().utc(valuesForConstruct).utcOffset(offset, true).locale(locale);

      if (datetime.isValid() !== true) {
        throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__.InvalidArgument('Double-check the configuration object sent in.', values);
      }

      return this.fromMoment(datetime);
    }

    if (timezone === this.TIMEZONE_LOCAL) {
      return this.fromLocal(valuesForConstruct, locale);
    }

    this.assertTimezoneIsValid(timezone);
    valuesForConstruct = this[privateMethods.normalizeUnitObject](valuesForConstruct);
    const datetime = moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().tz(valuesForConstruct, timezone).locale(locale);

    if (datetime.isValid() !== true) {
      throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__.InvalidArgument('Double-check the configuration object sent in.', values);
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


  static [_privateMethods$norma2](nameToNormalize) {
    const map = {
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


  static [_privateMethods$norma3](unit, value) {
    let set = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (unit === 'month') {
      value = set ? value - 1 : value + 1;
    }

    return value;
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


  static [_privateMethods$norma4](setObject) {
    let set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isObject)(setObject)) {
      throw new TypeError('The incoming value must be an object');
    }

    return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.reduce)(setObject, (result, value, key) => {
      key = this[privateMethods.normalizeUnitName](key);
      result[key] = this[privateMethods.normalizeUnitValue](key, value, set);
      return result;
    }, {});
  }
  /**
   * Returns the date and time unit names
   *
   * @return {string[]} An array of unit names
   */


  [_privateMethods$getUn]() {
    return validDateTimeUnits;
  }
  /**
   * Creates the various getter and setters for the value object.
   */


  [_privateMethods$creat]() {
    this[privateMethods.getUnitNames]().forEach(unitName => {
      // creates accessor for getting the unit value via a
      // property (eg. instance.hour)
      Object.defineProperty(this, unitName, {
        get() {
          const methodName = this.constructor[privateMethods.normalizeUnitName](unitName);
          const unitValue = this[privateProperties.datetime][methodName]();
          return this.constructor[privateMethods.normalizeUnitValue](unitName, unitValue, false);
        }

      }); // creates a fluent setter for the value.

      Object.defineProperty(this, 'set' + (0,lodash__WEBPACK_IMPORTED_MODULE_2__.capitalize)(unitName), {
        get() {
          return value => {
            return this.set({
              [unitName]: value
            });
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


  set() {
    let setObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    setObject = this.constructor[privateMethods.normalizeUnitObject](setObject);
    return new this.constructor(this[privateProperties.datetime].clone().set(setObject).toISOString(), this.timezone, this.locale);
  }
  /**
   * Accessor for the timezone string.
   *
   * @return {string} The timezone string
   */


  get timezone() {
    return this[privateProperties.datetime].tz();
  }
  /**
   * Fluent setter for the timezone property.
   *
   * @param {string} timezone
   * @return {DateTime|ServerDateTime} Returns a new instance of DateTime
   */


  setTimezone(timezone) {
    this.constructor.assertTimezoneIsValid(timezone);
    return new this.constructor(this[privateProperties.datetime].toISOString(), timezone, this.locale);
  }
  /**
   * Returns the number of days for the month set in this instance.
   *
   * @return {number}  The number of days in the month.
   */


  get daysInMonth() {
    return this[privateProperties.datetime].daysInMonth();
  }
  /**
   * Whether the current instance in time is currently in Daylight Savings
   * Time.
   *
   * @return {boolean} True means it is currently in Daylight Savings Time.
   */


  get isInDST() {
    return this[privateProperties.datetime].isDST();
  }
  /**
   * Whether the current instance in time is currently in a leap year.
   *
   * @return {boolean} True means this date time is in a leap year.
   */


  get isInLeapYear() {
    return this[privateProperties.datetime].isLeapYear();
  }
  /**
   * Returns the offset from UTC for the current instance in time (in minutes).
   *
   * @return {number}  The offset is in minutes
   */


  get offset() {
    return this[privateProperties.datetime].utcOffset();
  }
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


  setOffset(offset) {
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


  get dayOfYear() {
    return this[privateProperties.datetime].dayOfYear();
  }
  /**
   * Exposes the quarter for the date and time in the object.
   *
   * @return {number} A number between 1 and 4
   */


  get quarter() {
    return this[privateProperties.datetime].quarter();
  }
  /**
   * Exposes the ISO number of the week for the date and time in the object.
   *
   * @link https://en.wikipedia.org/wiki/ISO_week_date
   * @return {number} Will be a number between 1 and 52ish
   */


  get isoWeekNumber() {
    return this[privateProperties.datetime].isoWeek();
  }
  /**
   * Exposes the ISO number for the week year for the date and time in the
   * object.
   *
   * @link https://en.wikipedia.org/wiki/ISO_week_date
   * @return {number}  Will be a number representing a year.
   */


  get isoWeekYear() {
    return this[privateProperties.datetime].isoWeekYear();
  }
  /**
   * Exposes the ISO number for the day of the week for the date and time in
   * the object.
   *
   * @link https://en.wikipedia.org/wiki/ISO_week_date
   * @return {number} A number between 1 and 7 (Monday is 1 and Sunday is 7)
   */


  get isoWeekDay() {
    return this[privateProperties.datetime].isoWeekday();
  }
  /**
   * Exposes the number of weeks in this DateTime's year.
   *
   * @link https://en.wikipedia.org/wiki/ISO_week_date
   * @return {number} The number of weeks in the ISO year.
   */


  get isoWeeksInWeekYear() {
    return this[privateProperties.datetime].isoWeeksInYear();
  }
  /**
   * Returns what the set locale is for this DateTime
   *
   * @return {string} A locale string
   */


  get locale() {
    return this[privateProperties.datetime].locale();
  }
  /**
   * A fluent setter for setting the locale.
   *
   * @param {string} locale
   * @return {DateTime|ServerDateTime} a new instance of DateTime equivalent to this one but
   * with different locale.
   */


  setLocale(locale) {
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


  isValid() {
    return this[privateProperties.datetime].isValid() === true;
  }
  /**
   * Returns the difference between two DateTime instances as a Duration.
   *
   * @param {DateTime} otherDateTime
   * @return {Duration} An instance of Duration representing the difference
   * between the two DateTime objects.
   */


  diff(otherDateTime) {
    this.constructor.assertIsDateTime(otherDateTime);
    return new _duration__WEBPACK_IMPORTED_MODULE_6__["default"](moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().duration(this[privateProperties.datetime].diff(otherDateTime[privateProperties.datetime])));
  }
  /**
   * Returns the difference between this DateTime and "now" as a Duration.
   *
   * @return {Duration} An instance of Duration representing the difference
   * between this DateTime and "now"
   */


  diffNow() {
    return new _duration__WEBPACK_IMPORTED_MODULE_6__["default"](moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().duration(this[privateProperties.datetime].diff(moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()())));
  }
  /**
   * Set the value of this DateTime to the end (i.e. the last millisecond) of
   * a unit of time.
   *
   * @param {string} unit
   * @return {DateTime|ServerDateTime} Returns a new DateTime instance.
   */


  endOf(unit) {
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


  equals(otherDateTime) {
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


  hasSame(otherDateTime, unit) {
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


  minus(duration) {
    _duration__WEBPACK_IMPORTED_MODULE_6__["default"].assertIsValidDuration(duration);
    return this.constructor.fromMoment(this[privateProperties.datetime].clone().subtract(duration.toObject()));
  }
  /**
   * Add a period of time (represented by a Duration) to this DateTime and
   * return the resulting DateTime
   *
   * @param {Duration} duration
   * @return {DateTime|ServerDateTime} A new instance of DateTime for the new date and time.
   */


  plus(duration) {
    _duration__WEBPACK_IMPORTED_MODULE_6__["default"].assertIsValidDuration(duration);
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


  startOf(unit) {
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


  toFormat() {
    let format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaults__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_FORMAT;
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


  toISO() {
    let inUTC = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return inUTC ? this[privateProperties.datetime].toISOString() : this[privateProperties.datetime].toISOString(true);
  }
  /**
   * Returns the value for this DateTime as a javascript Date object.
   *
   * @return {Date} A javascript Date instance
   */


  toJSDate() {
    return this[privateProperties.datetime].toDate();
  }
  /**
   * When serializing an object to JSON, if there is a DateTime instance, it
   * will be represented as an ISO8601 string.
   *
   * @return {string} An ISO 8601 string
   */


  toJSON() {
    return this[privateProperties.datetime].toISOString();
  }
  /**
   * Converts a DateTime to whatever the "local" time is.
   *
   * @return {DateTime|ServerDateTime} a new instance of the DateTime
   */


  toLocal() {
    return this.constructor.fromMoment(this[privateProperties.datetime].clone().local());
  }
  /**
   * Returns the milliseconds since the Unix Epoch for the current DateTime
   * instance.
   *
   * @return {number} Number of milliseconds since Unix Epoch
   */


  toMillis() {
    return this.valueOf();
  }
  /**
   * Returns a simple object containing year, month, day, hour,
   * minute, second, and millisecond.
   *
   * @return {Object} An object with year, month, day, hour, minute, second,
   * and millisecond.
   */


  toObject() {
    const datetime = this[privateProperties.datetime].toObject();
    return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.reduce)(datetime, (result, value, key) => {
      key = this.constructor[privateMethods.normalizeUnitName](key);
      result[key] = this.constructor[privateMethods.normalizeUnitValue](key, value, false);
      return result;
    }, {});
  }
  /**
   * Converts the DateTime's timezone to UTC.
   *
   * @return {DateTime|ServerDateTime} A new instance of DateTime
   */


  toUTC() {
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


  toString() {
    return this[privateProperties.datetime].toString();
  }
  /**
   * When DateTime is coerced to number this will ensure its displayed as the
   * number of milliseconds since the Unix Epoch for the current DateTime
   *
   * @return {number} Amount of milliseconds since the Unix Epoch
   */


  valueOf() {
    return this[privateProperties.datetime].valueOf();
  }

}
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_FORMAT": function() { return /* binding */ DEFAULT_FORMAT; },
/* harmony export */   "DEFAULT_LOCALE": function() { return /* binding */ DEFAULT_LOCALE; },
/* harmony export */   "DEFAULT_OFFSET": function() { return /* binding */ DEFAULT_OFFSET; },
/* harmony export */   "DEFAULT_TIMEZONE_STRING": function() { return /* binding */ DEFAULT_TIMEZONE_STRING; },
/* harmony export */   "DEFAULT_VALID_LOCALE": function() { return /* binding */ DEFAULT_VALID_LOCALE; },
/* harmony export */   "HAS_TIMEZONE_STRING": function() { return /* binding */ HAS_TIMEZONE_STRING; }
/* harmony export */ });
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

const DEFAULT_TIMEZONE_STRING = _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__.TIMEZONE_CONFIG.string === '' ? 'UTC' : _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__.TIMEZONE_CONFIG.string;
/**
 * Default offset
 *
 * @type {number}
 */

const DEFAULT_OFFSET = _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__.TIMEZONE_CONFIG.offset;
/**
 * Whether there is a default timezone string to use.
 * This helps with determining whether to use the offset or not for constructing
 * DateTime value objects.
 *
 * @type {boolean}
 */

const HAS_TIMEZONE_STRING = DEFAULT_TIMEZONE_STRING !== 'UTC' || !(DEFAULT_TIMEZONE_STRING === 'UTC' && DEFAULT_OFFSET !== 0);
/**
 *
 * @type {string}
 */

const DEFAULT_FORMAT = _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__.FORMAT_SITE_DATE + ' ' + _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__.FORMAT_SITE_TIME;
/**
 * Exposes what to use for the default locale.
 *
 * @type {string}
 */

const DEFAULT_LOCALE = (0,lodash__WEBPACK_IMPORTED_MODULE_3__.snakeCase)(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__.SERVER_LOCALE.user);
/**
 * This ensures that the provided locale is valid.  So if `DEFAULT_LOCALE` is
 * not valid for this environment, then a fallback of 'en' locale is used.
 *
 * @type {string}
 */

const DEFAULT_VALID_LOCALE = (0,_assertions__WEBPACK_IMPORTED_MODULE_2__.validateLocale)(DEFAULT_LOCALE) ? DEFAULT_LOCALE : 'en';

/***/ }),

/***/ "./assets/src/vo/date-time/duration.js":
/*!*********************************************!*\
  !*** ./assets/src/vo/date-time/duration.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Duration; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment_duration_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment-duration-format */ "./node_modules/moment-duration-format/lib/moment-duration-format.js");
/* harmony import */ var moment_duration_format__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment_duration_format__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/is-shallow-equal */ "@wordpress/is-shallow-equal");
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assertions */ "./assets/src/vo/date-time/assertions.js");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./defaults */ "./assets/src/vo/date-time/defaults.js");


let _privateMethods$filte, _privateMethods$setVa, _privateMethods$popul, _privateMethods$getAl, _privateMethods$creat;

/**
 * External imports
 */






/**
 * Internal imports
 */



moment_duration_format__WEBPACK_IMPORTED_MODULE_2___default()((moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()));
/**
 * A collection of symbols used for "private" properties in the Duration object.
 *
 * @type {
 * 	{
 * 		duration: Symbol,
 * 		values: Symbol,
 * 		isValid: Symbol,
 * 	}
 * }
 */

const privateProperties = {
  duration: Symbol('DurationPrivatePropertiesDuration'),
  durationValues: Symbol('DurationPrivatePropertiesDurationValues'),
  isValid: Symbol('DurationPrivatePropertiesIsValid')
};
/**
 * A collection of symbols used for "private" methods in the Duration object.
 *
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

const privateMethods = {
  createGetters: Symbol('DurationPrivateMethodsCreateGetters'),
  getAllUnitNames: Symbol('DurationPrivateMethodsGetAllUnitNames'),
  populateValuesFromDuration: Symbol('DurationPrivateMethodsPopulateValuesFromDuration'),
  setValues: Symbol('DurationPrivateMethodsSetValues'),
  filterValues: Symbol('DurationPrivateMethodsFilterValues')
};
/**
 * An array of unit names for properties in the Duration object
 *
 * @type {string[]}
 */

const unitNames = ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];
/**
 * An array of derivative unit names.
 * These are accessors that are derivatives of base units.  For instance,
 * "weeks" ends up being a derivative (calculated from) the "days" unit.
 *
 * @type {string[]}
 */

const derivativeUnitNames = ['weeks'];
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
class Duration {
  /**
   * because minification destroys class names and renders instaneOf useless
   *
   * @type {string}
   */

  /**
   * The constructor for the Duration class.
   *
   * @param {Object|moment.Duration|string|number} values
   * Receiving a moment.Duration object is something for internal use and should not be used directly via
   * client code.
   * @param {string} locale  A valid locale string.
   * @link http://tools.ietf.org/html/rfc5646
   */
  constructor(values) {
    let locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_8__.DEFAULT_VALID_LOCALE;

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "displayName", 'Duration');

    this.displayName = 'Duration';
    this[privateProperties.isValid] = true;
    _assertions__WEBPACK_IMPORTED_MODULE_7__.assertLocaleIsValid(locale);

    if (typeof values !== 'object') {
      values = moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().duration(values).locale(locale);
    }

    if (moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().isDuration(values)) {
      this[privateProperties.duration] = values;
      this[privateMethods.populateValuesFromDuration](values);
    } else {
      values = this[privateMethods.filterValues](values);
      this[privateMethods.setValues](values);
      this[privateProperties.duration] = moment_timezone__WEBPACK_IMPORTED_MODULE_1___default().duration(values).locale(locale);
    }

    this[privateMethods.createGetters]();
    Object.freeze(this);
  }
  /**
   * Create an instance of Duration from a number of milliseconds.
   *
   * @param {number} milliseconds
   * @param {string} locale
   * @return {Duration}  An instance of Duration.
   */


  static fromMilliseconds(milliseconds) {
    let locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_8__.DEFAULT_VALID_LOCALE;
    return new Duration({
      milliseconds
    }, locale);
  }
  /**
   * Create an instance of Duration from a simple object.
   *
   * @param {Object} values  Keys should be the units (eg 'years', 'days').
   * @param {string} locale
   * @return {Duration} An instance of Duration
   */


  static fromObject(values) {
    let locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_8__.DEFAULT_VALID_LOCALE;
    return new Duration(values, locale);
  }
  /**
   * Create an instance of Duration from an ISO8601 string.
   *
   * @param {string} ISOString (eg. 'PT23H')
   * @param {string} locale
   * @return {Duration} An instance of Duration
   */


  static fromISO(ISOString) {
    let locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_8__.DEFAULT_VALID_LOCALE;
    _assertions__WEBPACK_IMPORTED_MODULE_7__.assertISO8601IsValid(ISOString, true);
    return new Duration(ISOString, locale);
  }
  /**
   * Indicate whether the provided locale argument is a valid locale.
   *
   * @param {string} locale
   * @return {boolean}  True means it is valid.
   */


  static isValidLocale(locale) {
    return _assertions__WEBPACK_IMPORTED_MODULE_7__.validateLocale(locale);
  }
  /**
   * Asserts whether the provided locale argument is a valid locale.
   *
   * @param {string} locale
   * @throws InvalidLocale
   */


  static assertIsValidLocale(locale) {
    _assertions__WEBPACK_IMPORTED_MODULE_7__.assertLocaleIsValid(locale);
  }
  /**
   * Indicate whether the provided string is a valid ISO 8601 Duration string.
   *
   * @param {string} isoString
   * @return {boolean} True means it is valid.
   */


  static isValidISO8601Duration(isoString) {
    return _assertions__WEBPACK_IMPORTED_MODULE_7__.validateISO8601(isoString, true);
  }
  /**
   * Assert whether the provided string is a valid ISO 8601 Duration string.
   *
   * @param {string} isoString
   * @throws InvalidISO8601String
   */


  static assertIsValidISO8601Duration(isoString) {
    _assertions__WEBPACK_IMPORTED_MODULE_7__.assertISO8601IsValid(isoString);
  }
  /**
   * Indicates whether the provided value is a valid instance of Duration.
   *
   * @param {Duration}duration
   * @return {boolean}  True means it is a valid Duration object.
   */


  static isValidDuration(duration) {
    return (0,_eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__.instanceOf)(duration, 'Duration') && duration.isValid;
  }
  /**
   * Asserts whether the provided value is a valid Duration and throws an
   * exception if not.
   *
   * @param {Duration} duration
   * @throws TypeError
   */


  static assertIsValidDuration(duration) {
    if (!Duration.isValidDuration(duration)) {
      throw new TypeError('This Duration object is not valid.');
    }
  }
  /**
   * Indicates whether the provided value is an instance of Duration.
   *
   * @param {Duration} duration
   * @return {boolean}  True means the value is an instance of Duration.
   * Note: true may still mean that the Duration instance is not valid!
   */


  static isDuration(duration) {
    return (0,_eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__.instanceOf)(duration, 'Duration');
  }
  /**
   * Asserts whether the provided value is an instance of Duration and if not
   * throws an exception.
   *
   * @param {Duration} duration
   * @throws TypeError
   */


  static assertIsDuration(duration) {
    if (!Duration.isDuration(duration)) {
      throw new TypeError('The provided value is not an instance of Duration.');
    }
  }
  /**
   * This filters the incoming values and returns only key/value pairs that
   * are acceptable as duration units.
   *
   * If a invalid duration unit is discovered, a console.error is generated
   * (in non-production mode).
   *
   * @param {any} values
   * @return {Object} Filtered values.
   * @throws TypeError if incoming values argument is not an object.
   */


  [_privateMethods$filte](values) {
    if (typeof values !== 'object') {
      throw new TypeError('Incoming values must be a simple object.');
    }

    const valuesToSet = (0,lodash__WEBPACK_IMPORTED_MODULE_3__.pick)(values, unitNames);

    if (!_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_4___default()(values, valuesToSet)) {
      warning__WEBPACK_IMPORTED_MODULE_5___default()(false, 'The following unexpected keys were in the configuration ' + 'object for constructing the Duration: ' + (0,lodash__WEBPACK_IMPORTED_MODULE_3__.keys)((0,lodash__WEBPACK_IMPORTED_MODULE_3__.omit)(values, unitNames)).join());
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


  [_privateMethods$setVa](values) {
    this[privateProperties.durationValues] = {};
    unitNames.forEach(unit => {
      this[privateProperties.durationValues][unit] = values[unit] || 0;
    });
  }
  /**
   * Used to set the values "private" property from a moment.Duration object.
   *
   * @param {moment.Duration} duration
   * @access private
   */


  [_privateMethods$popul](duration) {
    const setValues = {};
    unitNames.forEach(unit => {
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


  [_privateMethods$getAl]() {
    return [...unitNames, ...derivativeUnitNames];
  }
  /**
   * Creates getters for the Duration instance from the accessor names.
   *
   * @access private
   */


  [_privateMethods$creat]() {
    this[privateMethods.getAllUnitNames]().forEach(accessorName => {
      // creates accessor for getting the value via a property
      // eg. instance.hours
      Object.defineProperty(this, accessorName, {
        get() {
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

      const asMethodName = 'as' + (0,lodash__WEBPACK_IMPORTED_MODULE_3__.capitalize)(accessorName);
      Object.defineProperty(this, asMethodName, {
        get() {
          return () => {
            return this[privateProperties.duration][asMethodName]();
          };
        }

      });
    });
  }
  /**
   * Exposes the value of locale.
   * eg. instance.locale
   *
   * @return {string} The locale string.
   */


  get locale() {
    return this[privateProperties.duration].locale();
  }
  /**
   * Indicates whether the current Duration instance represents a valid
   * duration.
   *
   * @return {boolean} True means the Duration instance is valid.
   */


  get isValid() {
    return this[privateProperties.isValid] && this[privateProperties.duration].toISOString() !== 'P0D';
  }
  /**
   * Returns a new Duration instance that is identical to this except the
   * locale is changed to what was provided.
   *
   * @param {string} locale
   * @return {Duration} A new instance of Duration
   */


  setLocale(locale) {
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


  normalize() {
    return new Duration(this[privateProperties.duration]);
  }
  /**
   * Returns whether the provided Duration instance is the same as this
   * Duration instance.
   *
   * @param {Duration} otherDuration
   * @throws TypeError
   * @return {boolean} True means that the compared durations have the same
   * units and the same values for each unit (as well as same locale). This
   * means that a duration with{ minutes: 60 } would be considered not equal
   * to a duration with { hours: 1 }.
   */


  sameAs(otherDuration) {
    Duration.assertIsDuration(otherDuration);

    if (!this.isValid || !otherDuration.isValid) {
      return false;
    }

    if (this.locale !== otherDuration.locale) {
      return false;
    }

    return _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_4___default()(this.toObject(), otherDuration.toObject());
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
   * @param {Duration} otherDuration
   * @throws TypeError
   * @return {boolean} true if considered equal
   */


  equals(otherDuration) {
    Duration.assertIsDuration(otherDuration);

    if (!this.isValid || !otherDuration.isValid) {
      return false;
    }

    if (this.locale !== otherDuration.locale) {
      return false;
    }

    return _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_4___default()(this.normalize().toObject(), otherDuration.normalize().toObject());
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


  plus(value) {
    if (Duration.isDuration(value)) {
      return new Duration(this[privateProperties.duration].clone().add(value[privateProperties.duration]));
    }

    if (typeof value === 'object') {
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


  minus(value) {
    if (Duration.isDuration(value)) {
      return new Duration(this[privateProperties.duration].clone().subtract(value[privateProperties.duration]));
    }

    if (typeof value === 'object') {
      value = this[privateMethods.filterValues](value);
    }

    return new Duration(this[privateProperties.duration].clone().subtract(value));
  }
  /**
   * Returns the negative of this Duration.
   *
   * @return {Duration} A new instance of Duration
   */


  negate() {
    return new Duration((0,lodash__WEBPACK_IMPORTED_MODULE_3__.mapValues)(this.toObject(), function (value) {
      return value * -1;
    }));
  }
  /**
   * Returns a javascript object with this Duration's values.
   *
   * @return {*} Returns { years: number, hours: number ... }
   */


  toObject() {
    return this[privateProperties.durationValues];
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   *
   * @return {string} eg. "PT24H"
   */


  toISO() {
    return this[privateProperties.duration].toISOString();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use
   * in JSON.
   *
   * @return {string} eg. "PT24H"
   */


  toJSON() {
    return this[privateProperties.duration].toJSON();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use
   * in debugging.
   *
   * @return {string} eg. "PT24H"
   */


  toString() {
    return this.toISO();
  }
  /**
   * Returns an milliseconds value of this Duration.
   *
   * @return {number} The value of this duration represented in the number of
   * milliseconds.
   */


  valueOf() {
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


  toFormat(format) {
    return this.normalize()[privateProperties.duration].format(format);
  }

}

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Duration, "UNIT_YEARS", 'years');

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Duration, "UNIT_MONTHS", 'months');

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Duration, "UNIT_DAYS", 'days');

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Duration, "UNIT_HOURS", 'hours');

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Duration, "UNIT_MINUTES", 'minutes');

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Duration, "UNIT_SECONDS", 'seconds');

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Duration, "UNIT_MILLISECONDS", 'milliseconds');

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Duration, "UNIT_WEEKS", 'weeks');

/***/ }),

/***/ "./assets/src/vo/date-time/index.js":
/*!******************************************!*\
  !*** ./assets/src/vo/date-time/index.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateTime": function() { return /* reexport safe */ _datetime__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "Duration": function() { return /* reexport safe */ _duration__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   "ServerDateTime": function() { return /* reexport safe */ _server_date_time__WEBPACK_IMPORTED_MODULE_2__["default"]; }
/* harmony export */ });
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datetime */ "./assets/src/vo/date-time/datetime.js");
/* harmony import */ var _duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./duration */ "./assets/src/vo/date-time/duration.js");
/* harmony import */ var _server_date_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./server-date-time */ "./assets/src/vo/date-time/server-date-time.js");




/***/ }),

/***/ "./assets/src/vo/date-time/server-date-time.js":
/*!*****************************************************!*\
  !*** ./assets/src/vo/date-time/server-date-time.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ServerDateTime; }
/* harmony export */ });
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datetime */ "./assets/src/vo/date-time/datetime.js");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaults */ "./assets/src/vo/date-time/defaults.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_2__);
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

class ServerDateTime extends _datetime__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * The constructor for the ServerDateTime class
   *
   * @param {string} iso8601DateString
   * @param {string} timezone
   * @param {string} locale
   */
  constructor() {
    let iso8601DateString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TIMEZONE_STRING;
    let locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_VALID_LOCALE;

    // we only want to use the timezone value if the server indicates there
    // is a a timezone string or if constructing an instance for a non UTC
    // value timezone (HAS_TIMEZONE_STRING is just a shortcut check).
    if (_defaults__WEBPACK_IMPORTED_MODULE_1__.HAS_TIMEZONE_STRING || !!timezone && timezone !== 'UTC') {
      super(iso8601DateString, timezone, locale, 'ServerDateTime');
    } else {
      const datetime = !!iso8601DateString ? moment_timezone__WEBPACK_IMPORTED_MODULE_2___default()().utcOffset(_defaults__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_OFFSET, true).locale(locale) : moment_timezone__WEBPACK_IMPORTED_MODULE_2___default()(iso8601DateString).utcOffset(_defaults__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_OFFSET, true).locale(locale);
      super(datetime.toISOString(true), null, locale, 'ServerDateTime');
    }
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


  static fromISO(ISOString) {
    let locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_VALID_LOCALE;
    return _defaults__WEBPACK_IMPORTED_MODULE_1__.HAS_TIMEZONE_STRING ? new this(super.fromISO(ISOString, _defaults__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TIMEZONE_STRING).toISO(), _defaults__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TIMEZONE_STRING, locale) : new this(super.fromISOWithOffset(ISOString, _defaults__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_OFFSET).toISO(), null, locale);
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


  static fromJSDate(date) {
    let locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_VALID_LOCALE;
    return _defaults__WEBPACK_IMPORTED_MODULE_1__.HAS_TIMEZONE_STRING ? new this(super.fromJSDate(date, _defaults__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TIMEZONE_STRING).toISO(), _defaults__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TIMEZONE_STRING, locale) : new this(super.fromJSDateWithOffset(date, _defaults__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_OFFSET).toISO(), null, locale);
  }

}

/***/ }),

/***/ "./assets/src/vo/label.js":
/*!********************************!*\
  !*** ./assets/src/vo/label.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Label; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_2__);


/**
 * External imports
 */


/**
 * A value object for representing a label with singular and plural string
 * values.
 */

class Label {
  /**
   * The string representing the singular form of the label.
   *
   * @type {string}
   */

  /**
   * The string representing the plural form of the label.
   *
   * @type {string}
   */

  /**
   * Constructor
   *
   * @param {string} singular
   * @param {string} plural
   */
  constructor(singular, plural) {
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "singular", '');

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "plural", '');

    this.setSingular(singular).setPlural(plural);
    Object.freeze(this);
  }
  /**
   * Fluid setter for setting the singular property.
   *
   * If the singular property has already been set, this will return a new
   * instance of Label
   *
   * @param {string} singular
   * @return {Label}  An instance of Label
   */


  setSingular(singular) {
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


  setPlural(plural) {
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


  asSentenceCase() {
    let singular = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return singular === true ? (0,lodash__WEBPACK_IMPORTED_MODULE_1__.startCase)(this.singular.toLowerCase()) : (0,lodash__WEBPACK_IMPORTED_MODULE_1__.startCase)(this.plural.toLowerCase());
  }
  /**
   * Return the value for the property formatted in lower case.
   *
   * @param {boolean} singular  If true, return the formatted value of the
   * singular property otherwise return the formatted value of the plural
   * property.
   * @return {string} The string in lower case
   */


  asLowerCase() {
    let singular = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
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


  asUpperCase() {
    let singular = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
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


  asFormatted() {
    let singular = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    let formatType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Label.FORMAT_SENTENCE_CASE;

    switch (formatType) {
      case Label.FORMAT_SENTENCE_CASE:
        return this.asSentenceCase(singular);

      case Label.FORMAT_LOWERCASE:
        return this.asLowerCase(singular);

      case Label.FORMAT_UPPERCASE:
        return this.asUpperCase(singular);

      default:
        warning__WEBPACK_IMPORTED_MODULE_2___default()(false, 'Format type must be one of ' + 'Label.FORMAT_SENTENCE_CASE, Label.FORMAT_UPPERCASE, ' + 'or Label.FORMAT_LOWERCASE');
        return this.asSentenceCase(singular);
    }
  }
  /**
   * Asserts whether the provided value is a string or not.
   *
   * @param {*} value
   * @throws TypeError
   */


  static assertString(value) {
    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(value)) {
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


}

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Label, "FORMAT_LOWERCASE", 'lower');

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Label, "FORMAT_UPPERCASE", 'upper');

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Label, "FORMAT_SENTENCE_CASE", 'sentence');

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Label, "fromSameSingleAndPlural", label => {
  return new Label(label, label);
});

/***/ }),

/***/ "./assets/src/vo/money.js":
/*!********************************!*\
  !*** ./assets/src/vo/money.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Money; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var decimal_js_light__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! decimal.js-light */ "./node_modules/decimal.js-light/decimal.js");
/* harmony import */ var decimal_js_light__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(decimal_js_light__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var accounting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! accounting-js */ "./node_modules/accounting-js/dist/accounting.umd.js");
/* harmony import */ var accounting_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(accounting_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/is-shallow-equal */ "@wordpress/is-shallow-equal");
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _currency__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./currency */ "./assets/src/vo/currency.js");


/**
 * External imports
 */








/**
 * Asserts if incoming value is an instance of Money
 *
 * @param {Money} money
 * @throws {TypeError}
 */

const assertMoney = money => {
  if (!(0,_eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__.instanceOf)(money, 'Money')) {
    throw new TypeError('Instance of Money required. Received: ' + JSON.stringify(money));
  }
};
/**
 * Asserts if incoming value is an instance of Currency
 *
 * @param {Currency} currency
 * @throws {TypeError}
 */


const assertCurrency = currency => {
  if (!(0,_eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__.instanceOf)(currency, 'Currency')) {
    throw new TypeError('Instance of Currency required. Received: ' + JSON.stringify(currency));
  }
};
/**
 * Asserts if two currencies are shallow equal.
 *
 * @param {Currency} currencyA
 * @param {Currency} currencyB
 * @throws {Exception}
 */


const assertSameCurrency = (currencyA, currencyB) => {
  assertCurrency(currencyA);
  assertCurrency(currencyB);

  if (!_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_3___default()(currencyA.toJSON(), currencyB.toJSON())) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__.Exception('Provided currencies are not equivalent.');
  }
};
/**
 * A Value object representing money values.
 */


class Money {
  /**
   * because minification destroys class names and renders instaneOf useless
   *
   * @type {string}
   */

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
   * @type {{}}
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
   * Rounds towards nearest neighbour. If equidistant, rounds towards even
   * neighbour.
   *
   * @type {number}
   */

  /**
   * Class constructor
   *
   * @param {number|string|Decimal} amount
   * @param {Currency} currency
   */
  constructor(amount, currency) {
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "displayName", 'Money');

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "amount", void 0);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "currency", void 0);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "formatter", {});

    this.displayName = 'Money';
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


  setCurrency(currency) {
    Money.assertCurrency(currency); // if there's already a currency set, then return a new object.

    if ((0,_eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__.instanceOf)(this.currency, 'Currency')) {
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


  setAmount(amount) {
    const value = (0,_eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__.instanceOf)(amount, 'Decimal') ? amount.toNumber() : amount; // if there's already an amount set, then return a new object.

    if ((0,_eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__.instanceOf)(this.amount, 'Decimal')) {
      return new Money(new decimal_js_light__WEBPACK_IMPORTED_MODULE_1__.Decimal(value), this.currency);
    }

    this.amount = new decimal_js_light__WEBPACK_IMPORTED_MODULE_1__.Decimal(value);
    return this;
  }
  /**
   * Set the formatter for money values
   *
   * @return {Money} An instance of this object.
   */


  setFormatter() {
    // only initialize if its not already initialized
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_5__.isEmpty)(this.formatter)) {
      this.formatter = { ...accounting_js__WEBPACK_IMPORTED_MODULE_2__
      };
      this.formatter.settings = { ...this.formatter.settings,
        ...this.currency.toAccountingSettings().currency
      };
    }

    return this;
  }
  /**
   * Returns the value of this Money as its subunits.
   *
   * @return {number} If the subunits is 100 and the value is .45,
   * this returns 450
   */


  toSubunits() {
    return this.amount.toNumber() * this.currency.subunits;
  }
  /**
   * Returns whether the provided money object equals this money object.
   * Compares both amount and currency.
   *
   * @param {Money} other
   * @return {boolean} True means this is equal. False means it isn't.
   */


  equals(other) {
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


  hasSameCurrency(other) {
    Money.assertMoney(other);
    return _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_3___default()(this.currency.toJSON(), other.currency.toJSON());
  }
  /**
   * Add one Money object to this Money object
   *
   * @param {Money} other
   * @return {Money} Returns a new instance of Money.
   */


  add(other) {
    Money.assertUsingSameCurrency(this, other);
    return new Money(this.amount.plus(other.amount), this.currency);
  }
  /**
   * Subtract one Money object from this Money object
   *
   * @param {Money} other
   * @return {Money} Returns a new instance of Money
   */


  subtract(other) {
    Money.assertUsingSameCurrency(this, other);
    return new Money(this.amount.minus(other.amount), this.currency);
  }
  /**
   * Multiply this money object by the provided multiplier value.
   *
   * @param {number|string|Decimal} multiplier
   * @return {Money} Returns a new instance of Money
   */


  multiply(multiplier) {
    return new Money(this.amount.times(multiplier), this.currency);
  }
  /**
   * Divide this money object by the provided divisor value.
   *
   * @param {number|string|Decimal} divisor
   * @return {Money} Returns a new instance of Money
   */


  divide(divisor) {
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


  allocate(ratios) {
    const self = this;
    const results = [];
    const convertedRatios = [];
    let remainder = new decimal_js_light__WEBPACK_IMPORTED_MODULE_1__.Decimal(self.toSubunits());
    let total = new decimal_js_light__WEBPACK_IMPORTED_MODULE_1__.Decimal(0); // convert ratios to decimal and generate total.

    ratios.forEach(ratio => {
      convertedRatios.push((0,_eventespresso_validators__WEBPACK_IMPORTED_MODULE_6__.instanceOf)(ratio, 'Decimal') ? ratio : new decimal_js_light__WEBPACK_IMPORTED_MODULE_1__.Decimal(ratio));
      total = total.plus(ratio);
    });
    convertedRatios.forEach(ratio => {
      const share = new decimal_js_light__WEBPACK_IMPORTED_MODULE_1__.Decimal(Math.floor(self.toSubunits() * ratio.toNumber() / total.toNumber()));
      results.push(new Money(share.dividedBy(this.currency.subunits), this.currency));
      remainder = remainder.minus(share);
    });

    for (let i = 0; remainder.greaterThan(0); i++) {
      results[i] = new Money(new decimal_js_light__WEBPACK_IMPORTED_MODULE_1__.Decimal(results[i].toSubunits()).plus(1).dividedBy(this.currency.subunits), this.currency);
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


  compare(other) {
    //quickly return 0 if identical
    if (this === other) {
      return 0;
    }

    Money.assertUsingSameCurrency(this, other);
    return this.amount.comparedTo(other.amount);
  }
  /**
   * Compares whether this Money object is greater than the other Money object.
   *
   * @param {Money} other
   * @return {boolean} If true then this is greater than other.
   */


  greaterThan(other) {
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


  greaterThanOrEqualTo(other) {
    Money.assertUsingSameCurrency(this, other);
    return this.amount.greaterThanOrEqualTo(other.amount);
  }
  /**
   * Compares whether this Money object is less than the other Money object.
   *
   * @param {Money} other
   * @return {boolean} If true then this is less than other
   */


  lessThan(other) {
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


  lessThanOrEqualTo(other) {
    Money.assertUsingSameCurrency(this, other);
    return this.amount.lessThanOrEqualTo(other.amount);
  }
  /**
   * Indicates if this object has the value of 0
   *
   * @return {boolean} If true then the value is 0.
   */


  isZero() {
    return this.amount.isZero();
  }
  /**
   * Indicates if the value in this Money object is negative.
   *
   * @return {boolean} If true then the value is negative.
   */


  isNegative() {
    return this.amount.isNegative();
  }
  /**
   * Indicates if the value in this Money object is positive.
   *
   * @return {boolean} If true then the value is positive.
   */


  isPositive() {
    return this.amount.isPositive();
  }
  /**
   * Returns the value of this Money object as a number primitive.
   *
   * @return {number} Returns a number.
   */


  toNumber() {
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


  toFixed(decimalPlaces) {
    let rounding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Money.ROUND_HALF_UP;
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


  toIntegerMoney() {
    return new Money(this.amount.toInteger(), this.currency);
  }
  /**
   * Returns the value of this Money object as a formatted string according
   * to the currency configuration.
   *
   * @return {string} Returns a formatted string according to Currency.
   */


  toString() {
    return this.formatter.format(this.amount.toNumber(), this.formatter.settings);
  }
  /**
   * @return { Object } Returns an object that represents the serialized
   * value of this object.
   */


  toJSON() {
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


}

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Money, "ROUND_UP", decimal_js_light__WEBPACK_IMPORTED_MODULE_1__.Decimal.ROUND_UP);

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Money, "ROUND_DOWN", decimal_js_light__WEBPACK_IMPORTED_MODULE_1__.Decimal.ROUND_DOWN);

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Money, "ROUND_CEIL", decimal_js_light__WEBPACK_IMPORTED_MODULE_1__.Decimal.ROUND_CEIL);

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Money, "ROUND_FLOOR", decimal_js_light__WEBPACK_IMPORTED_MODULE_1__.Decimal.ROUND_FLOOR);

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Money, "ROUND_HALF_UP", decimal_js_light__WEBPACK_IMPORTED_MODULE_1__.Decimal.ROUND_HALF_UP);

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Money, "ROUND_HALF_DOWN", decimal_js_light__WEBPACK_IMPORTED_MODULE_1__.Decimal.ROUND_HALF_DOWN);

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Money, "ROUND_HALF_EVEN", decimal_js_light__WEBPACK_IMPORTED_MODULE_1__.Decimal.ROUND_HALF_EVEN);

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Money, "assertMoney", money => {
  assertMoney(money);
});

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Money, "assertCurrency", currency => {
  assertCurrency(currency);
});

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Money, "assertUsingSameCurrency", (thisMoney, otherMoney) => {
  assertMoney(thisMoney);
  assertMoney(otherMoney);
  assertSameCurrency(thisMoney.currency, otherMoney.currency);
});

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Money, "assertSameCurrency", (currencyA, currencyB) => {
  assertSameCurrency(currencyA, currencyB);
});

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(Money, "fromMoneyValue", (moneyValue, currency) => {
  assertCurrency(currency); // detect if incoming value has a currency sign not matching provided
  // currency.  This doesn't provide full protection from improper
  // values sent in but is an initial safeguard.

  if (typeof moneyValue === 'string') {
    const match = moneyValue.match(/[^\d\.\,\s]+/);

    if (match && match[0] !== currency.sign) {
      // The first error message is used if we have just one character
      // returned which is likely the currency symbol.  Otherwise,
      // give a more generic message.
      const message = match[0].length === 1 ? (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__.sprintf)('The provided money value has a %1$s sign in it, but the provided currency value object defines %2$s as the currency sign.', match[0], currency.sign) : (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__.sprintf)('The provided money value has non numeric strings in it (%1$s), please double-check the value.', match[0]);
      throw new Error(message);
    }
  } // set the initial value object using the currency


  const money = new Money(0, currency); // set a new value using the parse on the formatter.

  return money.setAmount(money.formatter.parse(moneyValue));
});

/***/ }),

/***/ "./node_modules/decimal.js-light/decimal.js":
/*!**************************************************!*\
  !*** ./node_modules/decimal.js-light/decimal.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! decimal.js-light v2.5.1 https://github.com/MikeMcl/decimal.js-light/LICENCE */
;(function (globalScope) {
  'use strict';


  /*
   *  decimal.js-light v2.5.1
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js-light
   *  Copyright (c) 2020 Michael Mclaughlin <M8ch88l@gmail.com>
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
        n = '5e' + e;
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
/***/ (function(module) {

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

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = window["moment"];

/***/ }),

/***/ "@eventespresso/helpers":
/*!***********************************!*\
  !*** external ["eejs","helpers"] ***!
  \***********************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"]["helpers"];

/***/ }),

/***/ "@eventespresso/i18n":
/*!********************************!*\
  !*** external ["eejs","i18n"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"]["i18n"];

/***/ }),

/***/ "@eventespresso/validators":
/*!**************************************!*\
  !*** external ["eejs","validators"] ***!
  \**************************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"]["validators"];

/***/ }),

/***/ "moment-timezone":
/*!*******************************************!*\
  !*** external ["eejs","vendor","moment"] ***!
  \*******************************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"]["vendor"]["moment"];

/***/ }),

/***/ "@eventespresso/eejs":
/*!*************************!*\
  !*** external ["eejs"] ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"];

/***/ }),

/***/ "@wordpress/is-shallow-equal":
/*!****************************************!*\
  !*** external ["wp","isShallowEqual"] ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["isShallowEqual"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _defineProperty; }
/* harmony export */ });
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!********************************!*\
  !*** ./assets/src/vo/index.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Currency": function() { return /* reexport safe */ _currency__WEBPACK_IMPORTED_MODULE_1__.Currency; },
/* harmony export */   "DateTime": function() { return /* reexport safe */ _date_time__WEBPACK_IMPORTED_MODULE_3__.DateTime; },
/* harmony export */   "Duration": function() { return /* reexport safe */ _date_time__WEBPACK_IMPORTED_MODULE_3__.Duration; },
/* harmony export */   "Label": function() { return /* reexport safe */ _label__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   "Money": function() { return /* reexport safe */ _money__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "ServerDateTime": function() { return /* reexport safe */ _date_time__WEBPACK_IMPORTED_MODULE_3__.ServerDateTime; },
/* harmony export */   "SiteCurrency": function() { return /* reexport safe */ _currency__WEBPACK_IMPORTED_MODULE_1__["default"]; }
/* harmony export */ });
/* harmony import */ var _money__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./money */ "./assets/src/vo/money.js");
/* harmony import */ var _currency__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./currency */ "./assets/src/vo/currency.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./label */ "./assets/src/vo/label.js");
/* harmony import */ var _date_time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date-time */ "./assets/src/vo/date-time/index.js");




}();
(this.eejs = this.eejs || {}).valueObjects = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRlc3ByZXNzby12YWx1ZS1vYmplY3RzLmMyMzlmYjcwZmZiYzI1ZTQ5MTk1LmRpc3QuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQSxDQUFDLEtBQTREO0FBQzdELENBQUMsQ0FDd0Q7QUFDekQsQ0FBQyw0QkFBNEI7O0FBRTdCLG1DQUFtQyxrQkFBa0IsYUFBYTs7QUFFbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxzQkFBc0I7QUFDbEMsWUFBWSxzQkFBc0I7QUFDbEMsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksU0FBUztBQUNyQixZQUFZLFFBQVE7QUFDcEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHNCQUFzQjtBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsZUFBZSxFQUFFO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsT0FBTztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixhQUFhO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsdUJBQXVCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixJQUFJO0FBQ3JCO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBLHdCQUF3QixNQUFNO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVCQUF1QjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLElBQUk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHlCQUF5QjtBQUN6QztBQUNBO0FBQ0EsMkJBQTJCLCtCQUErQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFFBQVE7QUFDdEM7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxhQUFhLElBQUk7QUFDakI7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JB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LDhCQUE4QjtBQUM5QiwwQ0FBMEM7QUFDMUMsMkJBQTJCO0FBQzNCLHNDQUFzQztBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FB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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsbUJBQW1CO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGFBQWE7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDeHNERDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsYUFBb0I7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFdBQVc7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFdBQVc7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL2FjY291bnRpbmctanMvZGlzdC9hY2NvdW50aW5nLnVtZC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9zcmMvdm8vY3VycmVuY3kuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL2RhdGUtdGltZS9hc3NlcnRpb25zLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL3NyYy92by9kYXRlLXRpbWUvZGF0ZXRpbWUuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL2RhdGUtdGltZS9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9zcmMvdm8vZGF0ZS10aW1lL2R1cmF0aW9uLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL3NyYy92by9kYXRlLXRpbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL2RhdGUtdGltZS9zZXJ2ZXItZGF0ZS10aW1lLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vYXNzZXRzL3NyYy92by9sYWJlbC5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy8uL2Fzc2V0cy9zcmMvdm8vbW9uZXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvZGVjaW1hbC5qcy1saWdodC9kZWNpbWFsLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL21vbWVudC1kdXJhdGlvbi1mb3JtYXQvbGliL21vbWVudC1kdXJhdGlvbi1mb3JtYXQuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9ub2RlX21vZHVsZXMvd2FybmluZy93YXJuaW5nLmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHdpbmRvdyBcImxvZGFzaFwiIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHdpbmRvdyBcIm1vbWVudFwiIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHdpbmRvdyBbXCJlZWpzXCIsXCJoZWxwZXJzXCJdIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHdpbmRvdyBbXCJlZWpzXCIsXCJpMThuXCJdIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHdpbmRvdyBbXCJlZWpzXCIsXCJ2YWxpZGF0b3JzXCJdIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL2V4dGVybmFsIHdpbmRvdyBbXCJlZWpzXCIsXCJ2ZW5kb3JcIixcIm1vbWVudFwiXSIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy9leHRlcm5hbCB3aW5kb3cgW1wiZWVqc1wiXSIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy9leHRlcm5hbCB3aW5kb3cgW1wid3BcIixcImlzU2hhbGxvd0VxdWFsXCJdIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lZWpzLnZhbHVlT2JqZWN0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2VlanMudmFsdWVPYmplY3RzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZWVqcy52YWx1ZU9iamVjdHMvLi9hc3NldHMvc3JjL3ZvL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcblx0KGZhY3RvcnkoKGdsb2JhbC5hY2NvdW50aW5nID0gZ2xvYmFsLmFjY291bnRpbmcgfHwge30pKSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuXHRmdW5jdGlvbiBfX2NvbW1vbmpzKGZuLCBtb2R1bGUpIHsgcmV0dXJuIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfSwgZm4obW9kdWxlLCBtb2R1bGUuZXhwb3J0cyksIG1vZHVsZS5leHBvcnRzOyB9XG5cblx0LyoqXG5cdCAqIFRoZSBsaWJyYXJ5J3Mgc2V0dGluZ3MgY29uZmlndXJhdGlvbiBvYmplY3QuXG5cdCAqXG5cdCAqIENvbnRhaW5zIGRlZmF1bHQgcGFyYW1ldGVycyBmb3IgY3VycmVuY3kgYW5kIG51bWJlciBmb3JtYXR0aW5nXG5cdCAqL1xuXHR2YXIgc2V0dGluZ3MgPSB7XG5cdCAgc3ltYm9sOiAnJCcsIC8vIGRlZmF1bHQgY3VycmVuY3kgc3ltYm9sIGlzICckJ1xuXHQgIGZvcm1hdDogJyVzJXYnLCAvLyBjb250cm9scyBvdXRwdXQ6ICVzID0gc3ltYm9sLCAldiA9IHZhbHVlIChjYW4gYmUgb2JqZWN0LCBzZWUgZG9jcylcblx0ICBkZWNpbWFsOiAnLicsIC8vIGRlY2ltYWwgcG9pbnQgc2VwYXJhdG9yXG5cdCAgdGhvdXNhbmQ6ICcsJywgLy8gdGhvdXNhbmRzIHNlcGFyYXRvclxuXHQgIHByZWNpc2lvbjogMiwgLy8gZGVjaW1hbCBwbGFjZXNcblx0ICBncm91cGluZzogMywgLy8gZGlnaXQgZ3JvdXBpbmcgKG5vdCBpbXBsZW1lbnRlZCB5ZXQpXG5cdCAgc3RyaXBaZXJvczogZmFsc2UsIC8vIHN0cmlwIGluc2lnbmlmaWNhbnQgemVyb3MgZnJvbSBkZWNpbWFsIHBhcnRcblx0ICBmYWxsYmFjazogMCAvLyB2YWx1ZSByZXR1cm5lZCBvbiB1bmZvcm1hdCgpIGZhaWx1cmVcblx0fTtcblxuXHQvKipcblx0ICogVGFrZXMgYSBzdHJpbmcvYXJyYXkgb2Ygc3RyaW5ncywgcmVtb3ZlcyBhbGwgZm9ybWF0dGluZy9jcnVmdCBhbmQgcmV0dXJucyB0aGUgcmF3IGZsb2F0IHZhbHVlXG5cdCAqIEFsaWFzOiBgYWNjb3VudGluZy5wYXJzZShzdHJpbmcpYFxuXHQgKlxuXHQgKiBEZWNpbWFsIG11c3QgYmUgaW5jbHVkZWQgaW4gdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBmbG9hdHMgKGRlZmF1bHRzIHRvXG5cdCAqIGFjY291bnRpbmcuc2V0dGluZ3MuZGVjaW1hbCksIHNvIGlmIHRoZSBudW1iZXIgdXNlcyBhIG5vbi1zdGFuZGFyZCBkZWNpbWFsXG5cdCAqIHNlcGFyYXRvciwgcHJvdmlkZSBpdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuXHQgKlxuXHQgKiBBbHNvIG1hdGNoZXMgYnJhY2tldGVkIG5lZ2F0aXZlcyAoZWcuICckICgxLjk5KScgPT4gLTEuOTkpXG5cdCAqXG5cdCAqIERvZXNuJ3QgdGhyb3cgYW55IGVycm9ycyAoYE5hTmBzIGJlY29tZSAwKSBidXQgdGhpcyBtYXkgY2hhbmdlIGluIGZ1dHVyZVxuXHQgKlxuXHQgKiBgYGBqc1xuXHQgKiAgYWNjb3VudGluZy51bmZvcm1hdChcIsKjIDEyLDM0NSw2NzguOTAgR0JQXCIpOyAvLyAxMjM0NTY3OC45XG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBAbWV0aG9kIHVuZm9ybWF0XG5cdCAqIEBmb3IgYWNjb3VudGluZ1xuXHQgKiBAcGFyYW0ge1N0cmluZ3xBcnJheTxTdHJpbmc+fSB2YWx1ZSBUaGUgc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgY29udGFpbmluZyB0aGUgbnVtYmVyL3MgdG8gcGFyc2UuXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICAgICAgIGRlY2ltYWwgTnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzIG9mIHRoZSByZXN1bHRhbnQgbnVtYmVyXG5cdCAqIEByZXR1cm4ge0Zsb2F0fSBUaGUgcGFyc2VkIG51bWJlclxuXHQgKi9cblx0ZnVuY3Rpb24gdW5mb3JtYXQodmFsdWUpIHtcblx0ICB2YXIgZGVjaW1hbCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHNldHRpbmdzLmRlY2ltYWwgOiBhcmd1bWVudHNbMV07XG5cdCAgdmFyIGZhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gc2V0dGluZ3MuZmFsbGJhY2sgOiBhcmd1bWVudHNbMl07XG5cblx0ICAvLyBSZWN1cnNpdmVseSB1bmZvcm1hdCBhcnJheXM6XG5cdCAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdCAgICByZXR1cm4gdmFsdWUubWFwKGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgICAgcmV0dXJuIHVuZm9ybWF0KHZhbCwgZGVjaW1hbCwgZmFsbGJhY2spO1xuXHQgICAgfSk7XG5cdCAgfVxuXG5cdCAgLy8gUmV0dXJuIHRoZSB2YWx1ZSBhcy1pcyBpZiBpdCdzIGFscmVhZHkgYSBudW1iZXI6XG5cdCAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHJldHVybiB2YWx1ZTtcblxuXHQgIC8vIEJ1aWxkIHJlZ2V4IHRvIHN0cmlwIG91dCBldmVyeXRoaW5nIGV4Y2VwdCBkaWdpdHMsIGRlY2ltYWwgcG9pbnQgYW5kIG1pbnVzIHNpZ246XG5cdCAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCgnW14wLTktKC0pLScgKyBkZWNpbWFsICsgJ10nLCBbJ2cnXSk7XG5cdCAgdmFyIHVuZm9ybWF0dGVkVmFsdWVTdHJpbmcgPSAoJycgKyB2YWx1ZSkucmVwbGFjZShyZWdleCwgJycpIC8vIHN0cmlwIG91dCBhbnkgY3J1ZnRcblx0ICAucmVwbGFjZShkZWNpbWFsLCAnLicpIC8vIG1ha2Ugc3VyZSBkZWNpbWFsIHBvaW50IGlzIHN0YW5kYXJkXG5cdCAgLnJlcGxhY2UoL1xcKChbLV0qXFxkKlteKV0/XFxkKylcXCkvZywgJy0kMScpIC8vIHJlcGxhY2UgYnJhY2tldGVkIHZhbHVlcyB3aXRoIG5lZ2F0aXZlc1xuXHQgIC5yZXBsYWNlKC9cXCgoLiopXFwpLywgJycpOyAvLyByZW1vdmUgYW55IGJyYWNrZXRzIHRoYXQgZG8gbm90IGhhdmUgbnVtZXJpYyB2YWx1ZVxuXG5cdCAgLyoqXG5cdCAgICogSGFuZGxpbmcgLXZlIG51bWJlciBhbmQgYnJhY2tldCwgZWcuXG5cdCAgICogKC0xMDApID0gMTAwLCAtKDEwMCkgPSAxMDAsIC0tMTAwID0gMTAwXG5cdCAgICovXG5cdCAgdmFyIG5lZ2F0aXZlID0gKHVuZm9ybWF0dGVkVmFsdWVTdHJpbmcubWF0Y2goLy0vZykgfHwgMikubGVuZ3RoICUgMixcblx0ICAgICAgYWJzVW5mb3JtYXR0ZWQgPSBwYXJzZUZsb2F0KHVuZm9ybWF0dGVkVmFsdWVTdHJpbmcucmVwbGFjZSgvLS9nLCAnJykpLFxuXHQgICAgICB1bmZvcm1hdHRlZCA9IGFic1VuZm9ybWF0dGVkICogKG5lZ2F0aXZlID8gLTEgOiAxKTtcblxuXHQgIC8vIFRoaXMgd2lsbCBmYWlsIHNpbGVudGx5IHdoaWNoIG1heSBjYXVzZSB0cm91YmxlLCBsZXQncyB3YWl0IGFuZCBzZWU6XG5cdCAgcmV0dXJuICFpc05hTih1bmZvcm1hdHRlZCkgPyB1bmZvcm1hdHRlZCA6IGZhbGxiYWNrO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIGFuZCBub3JtYWxpc2UgdGhlIHZhbHVlIG9mIHByZWNpc2lvbiAobXVzdCBiZSBwb3NpdGl2ZSBpbnRlZ2VyKVxuXHQgKi9cblx0ZnVuY3Rpb24gX2NoZWNrUHJlY2lzaW9uKHZhbCwgYmFzZSkge1xuXHQgIHZhbCA9IE1hdGgucm91bmQoTWF0aC5hYnModmFsKSk7XG5cdCAgcmV0dXJuIGlzTmFOKHZhbCkgPyBiYXNlIDogdmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIEltcGxlbWVudGF0aW9uIG9mIHRvRml4ZWQoKSB0aGF0IHRyZWF0cyBmbG9hdHMgbW9yZSBsaWtlIGRlY2ltYWxzXG5cdCAqXG5cdCAqIEZpeGVzIGJpbmFyeSByb3VuZGluZyBpc3N1ZXMgKGVnLiAoMC42MTUpLnRvRml4ZWQoMikgPT09ICcwLjYxJykgdGhhdCBwcmVzZW50XG5cdCAqIHByb2JsZW1zIGZvciBhY2NvdW50aW5nLSBhbmQgZmluYW5jZS1yZWxhdGVkIHNvZnR3YXJlLlxuXHQgKlxuXHQgKiBgYGBqc1xuXHQgKiAgKDAuNjE1KS50b0ZpeGVkKDIpOyAgICAgICAgICAgLy8gXCIwLjYxXCIgKG5hdGl2ZSB0b0ZpeGVkIGhhcyByb3VuZGluZyBpc3N1ZXMpXG5cdCAqICBhY2NvdW50aW5nLnRvRml4ZWQoMC42MTUsIDIpOyAvLyBcIjAuNjJcIlxuXHQgKiBgYGBcblx0ICpcblx0ICogQG1ldGhvZCB0b0ZpeGVkXG5cdCAqIEBmb3IgYWNjb3VudGluZ1xuXHQgKiBAcGFyYW0ge0Zsb2F0fSAgIHZhbHVlICAgICAgICAgVGhlIGZsb2F0IHRvIGJlIHRyZWF0ZWQgYXMgYSBkZWNpbWFsIG51bWJlci5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtwcmVjaXNpb249Ml0gVGhlIG51bWJlciBvZiBkZWNpbWFsIGRpZ2l0cyB0byBrZWVwLlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSBnaXZlbiBudW1iZXIgdHJhbnNmb3JtZWQgaW50byBhIHN0cmluZyB3aXRoIHRoZSBnaXZlbiBwcmVjaXNzaW9uXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0ZpeGVkKHZhbHVlLCBwcmVjaXNpb24pIHtcblx0ICBwcmVjaXNpb24gPSBfY2hlY2tQcmVjaXNpb24ocHJlY2lzaW9uLCBzZXR0aW5ncy5wcmVjaXNpb24pO1xuXHQgIHZhciBwb3dlciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24pO1xuXG5cdCAgLy8gTXVsdGlwbHkgdXAgYnkgcHJlY2lzaW9uLCByb3VuZCBhY2N1cmF0ZWx5LCB0aGVuIGRpdmlkZSBhbmQgdXNlIG5hdGl2ZSB0b0ZpeGVkKCk6XG5cdCAgcmV0dXJuIChNYXRoLnJvdW5kKCh2YWx1ZSArIDFlLTgpICogcG93ZXIpIC8gcG93ZXIpLnRvRml4ZWQocHJlY2lzaW9uKTtcblx0fVxuXG5cdHZhciBpbmRleCA9IF9fY29tbW9uanMoZnVuY3Rpb24gKG1vZHVsZSkge1xuXHQvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cdHZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXHRmdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0XHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHRcdH1cblxuXHRcdHJldHVybiBPYmplY3QodmFsKTtcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0XHR2YXIgZnJvbTtcblx0XHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHRcdHZhciBzeW1ib2xzO1xuXG5cdFx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdFx0c3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdG87XG5cdH07XG5cdH0pO1xuXG5cdHZhciBvYmplY3RBc3NpZ24gPSAoaW5kZXggJiYgdHlwZW9mIGluZGV4ID09PSAnb2JqZWN0JyAmJiAnZGVmYXVsdCcgaW4gaW5kZXggPyBpbmRleFsnZGVmYXVsdCddIDogaW5kZXgpO1xuXG5cdGZ1bmN0aW9uIF9zdHJpcEluc2lnbmlmaWNhbnRaZXJvcyhzdHIsIGRlY2ltYWwpIHtcblx0ICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoZGVjaW1hbCk7XG5cdCAgdmFyIGludGVnZXJQYXJ0ID0gcGFydHNbMF07XG5cdCAgdmFyIGRlY2ltYWxQYXJ0ID0gcGFydHNbMV0ucmVwbGFjZSgvMCskLywgJycpO1xuXG5cdCAgaWYgKGRlY2ltYWxQYXJ0Lmxlbmd0aCA+IDApIHtcblx0ICAgIHJldHVybiBpbnRlZ2VyUGFydCArIGRlY2ltYWwgKyBkZWNpbWFsUGFydDtcblx0ICB9XG5cblx0ICByZXR1cm4gaW50ZWdlclBhcnQ7XG5cdH1cblxuXHQvKipcblx0ICogRm9ybWF0IGEgbnVtYmVyLCB3aXRoIGNvbW1hLXNlcGFyYXRlZCB0aG91c2FuZHMgYW5kIGN1c3RvbSBwcmVjaXNpb24vZGVjaW1hbCBwbGFjZXNcblx0ICogQWxpYXM6IGBhY2NvdW50aW5nLmZvcm1hdCgpYFxuXHQgKlxuXHQgKiBMb2NhbGlzZSBieSBvdmVycmlkaW5nIHRoZSBwcmVjaXNpb24gYW5kIHRob3VzYW5kIC8gZGVjaW1hbCBzZXBhcmF0b3JzXG5cdCAqXG5cdCAqIGBgYGpzXG5cdCAqIGFjY291bnRpbmcuZm9ybWF0TnVtYmVyKDUzMTgwMDgpOyAgICAgICAgICAgICAgLy8gNSwzMTgsMDA4XG5cdCAqIGFjY291bnRpbmcuZm9ybWF0TnVtYmVyKDk4NzY1NDMuMjEsIHsgcHJlY2lzaW9uOiAzLCB0aG91c2FuZDogXCIgXCIgfSk7IC8vIDkgODc2IDU0My4yMTBcblx0ICogYGBgXG5cdCAqXG5cdCAqIEBtZXRob2QgZm9ybWF0TnVtYmVyXG5cdCAqIEBmb3IgYWNjb3VudGluZ1xuXHQgKiBAcGFyYW0ge051bWJlcn0gICAgICAgIG51bWJlciBUaGUgbnVtYmVyIHRvIGJlIGZvcm1hdHRlZC5cblx0ICogQHBhcmFtIHtPYmplY3R9ICAgICAgICBbb3B0cz17fV0gT2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSBvcHRpb25zIG9mIHRoZSBtZXRob2QuXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGdpdmVuIG51bWJlciBwcm9wZXJseSBmb3JtYXR0ZWQuXG5cdCAgKi9cblx0ZnVuY3Rpb24gZm9ybWF0TnVtYmVyKG51bWJlcikge1xuXHQgIHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cblx0ICAvLyBSZXN1cnNpdmVseSBmb3JtYXQgYXJyYXlzOlxuXHQgIGlmIChBcnJheS5pc0FycmF5KG51bWJlcikpIHtcblx0ICAgIHJldHVybiBudW1iZXIubWFwKGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgICAgcmV0dXJuIGZvcm1hdE51bWJlcih2YWwsIG9wdHMpO1xuXHQgICAgfSk7XG5cdCAgfVxuXG5cdCAgLy8gQnVpbGQgb3B0aW9ucyBvYmplY3QgZnJvbSBzZWNvbmQgcGFyYW0gKGlmIG9iamVjdCkgb3IgYWxsIHBhcmFtcywgZXh0ZW5kaW5nIGRlZmF1bHRzOlxuXHQgIG9wdHMgPSBvYmplY3RBc3NpZ24oe30sIHNldHRpbmdzLCBvcHRzKTtcblxuXHQgIC8vIERvIHNvbWUgY2FsYzpcblx0ICB2YXIgbmVnYXRpdmUgPSBudW1iZXIgPCAwID8gJy0nIDogJyc7XG5cdCAgdmFyIGJhc2UgPSBwYXJzZUludCh0b0ZpeGVkKE1hdGguYWJzKG51bWJlciksIG9wdHMucHJlY2lzaW9uKSwgMTApICsgJyc7XG5cdCAgdmFyIG1vZCA9IGJhc2UubGVuZ3RoID4gMyA/IGJhc2UubGVuZ3RoICUgMyA6IDA7XG5cblx0ICAvLyBGb3JtYXQgdGhlIG51bWJlcjpcblx0ICB2YXIgZm9ybWF0dGVkID0gbmVnYXRpdmUgKyAobW9kID8gYmFzZS5zdWJzdHIoMCwgbW9kKSArIG9wdHMudGhvdXNhbmQgOiAnJykgKyBiYXNlLnN1YnN0cihtb2QpLnJlcGxhY2UoLyhcXGR7M30pKD89XFxkKS9nLCAnJDEnICsgb3B0cy50aG91c2FuZCkgKyAob3B0cy5wcmVjaXNpb24gPiAwID8gb3B0cy5kZWNpbWFsICsgdG9GaXhlZChNYXRoLmFicyhudW1iZXIpLCBvcHRzLnByZWNpc2lvbikuc3BsaXQoJy4nKVsxXSA6ICcnKTtcblxuXHQgIHJldHVybiBvcHRzLnN0cmlwWmVyb3MgPyBfc3RyaXBJbnNpZ25pZmljYW50WmVyb3MoZm9ybWF0dGVkLCBvcHRzLmRlY2ltYWwpIDogZm9ybWF0dGVkO1xuXHR9XG5cblx0dmFyIGluZGV4JDEgPSBfX2NvbW1vbmpzKGZ1bmN0aW9uIChtb2R1bGUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBzdHJWYWx1ZSA9IFN0cmluZy5wcm90b3R5cGUudmFsdWVPZjtcblx0dmFyIHRyeVN0cmluZ09iamVjdCA9IGZ1bmN0aW9uIHRyeVN0cmluZ09iamVjdCh2YWx1ZSkge1xuXHRcdHRyeSB7XG5cdFx0XHRzdHJWYWx1ZS5jYWxsKHZhbHVlKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH07XG5cdHZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cdHZhciBzdHJDbGFzcyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuXHR2YXIgaGFzVG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHJldHVybiBoYXNUb1N0cmluZ1RhZyA/IHRyeVN0cmluZ09iamVjdCh2YWx1ZSkgOiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gc3RyQ2xhc3M7XG5cdH07XG5cdH0pO1xuXG5cdHZhciBpc1N0cmluZyA9IChpbmRleCQxICYmIHR5cGVvZiBpbmRleCQxID09PSAnb2JqZWN0JyAmJiAnZGVmYXVsdCcgaW4gaW5kZXgkMSA/IGluZGV4JDFbJ2RlZmF1bHQnXSA6IGluZGV4JDEpO1xuXG5cdC8qKlxuXHQgKiBQYXJzZXMgYSBmb3JtYXQgc3RyaW5nIG9yIG9iamVjdCBhbmQgcmV0dXJucyBmb3JtYXQgb2JqIGZvciB1c2UgaW4gcmVuZGVyaW5nXG5cdCAqXG5cdCAqIGBmb3JtYXRgIGlzIGVpdGhlciBhIHN0cmluZyB3aXRoIHRoZSBkZWZhdWx0IChwb3NpdGl2ZSkgZm9ybWF0LCBvciBvYmplY3Rcblx0ICogY29udGFpbmluZyBgcG9zYCAocmVxdWlyZWQpLCBgbmVnYCBhbmQgYHplcm9gIHZhbHVlc1xuXHQgKlxuXHQgKiBFaXRoZXIgc3RyaW5nIG9yIGZvcm1hdC5wb3MgbXVzdCBjb250YWluIFwiJXZcIiAodmFsdWUpIHRvIGJlIHZhbGlkXG5cdCAqXG5cdCAqIEBtZXRob2QgX2NoZWNrQ3VycmVuY3lGb3JtYXRcblx0ICogQGZvciBhY2NvdW50aW5nXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgW2Zvcm1hdD1cIiVzJXZcIl0gU3RyaW5nIHdpdGggdGhlIGZvcm1hdCB0byBhcHBseSwgd2hlcmUgJXMgaXMgdGhlIGN1cnJlbmN5IHN5bWJvbCBhbmQgJXYgaXMgdGhlIHZhbHVlLlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IG9iamVjdCByZXByZXNudGluZyBmb3JtYXQgKHdpdGggcG9zLCBuZWcgYW5kIHplcm8gYXR0cmlidXRlcylcblx0ICovXG5cdGZ1bmN0aW9uIF9jaGVja0N1cnJlbmN5Rm9ybWF0KGZvcm1hdCkge1xuXHQgIC8vIEZvcm1hdCBzaG91bGQgYmUgYSBzdHJpbmcsIGluIHdoaWNoIGNhc2UgYHZhbHVlYCAoJyV2JykgbXVzdCBiZSBwcmVzZW50OlxuXHQgIGlmIChpc1N0cmluZyhmb3JtYXQpICYmIGZvcm1hdC5tYXRjaCgnJXYnKSkge1xuXHQgICAgLy8gQ3JlYXRlIGFuZCByZXR1cm4gcG9zaXRpdmUsIG5lZ2F0aXZlIGFuZCB6ZXJvIGZvcm1hdHM6XG5cdCAgICByZXR1cm4ge1xuXHQgICAgICBwb3M6IGZvcm1hdCxcblx0ICAgICAgbmVnOiBmb3JtYXQucmVwbGFjZSgnLScsICcnKS5yZXBsYWNlKCcldicsICctJXYnKSxcblx0ICAgICAgemVybzogZm9ybWF0XG5cdCAgICB9O1xuXHQgIH1cblxuXHQgIC8vIE90aGVyd2lzZSwgYXNzdW1lIGZvcm1hdCB3YXMgZmluZTpcblx0ICByZXR1cm4gZm9ybWF0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEZvcm1hdCBhIG51bWJlciBpbnRvIGN1cnJlbmN5XG5cdCAqXG5cdCAqIFVzYWdlOiBhY2NvdW50aW5nLmZvcm1hdE1vbmV5KG51bWJlciwgc3ltYm9sLCBwcmVjaXNpb24sIHRob3VzYW5kc1NlcCwgZGVjaW1hbFNlcCwgZm9ybWF0KVxuXHQgKiBkZWZhdWx0czogKDAsICckJywgMiwgJywnLCAnLicsICclcyV2Jylcblx0ICpcblx0ICogTG9jYWxpc2UgYnkgb3ZlcnJpZGluZyB0aGUgc3ltYm9sLCBwcmVjaXNpb24sIHRob3VzYW5kIC8gZGVjaW1hbCBzZXBhcmF0b3JzIGFuZCBmb3JtYXRcblx0ICpcblx0ICogYGBganNcblx0ICogLy8gRGVmYXVsdCB1c2FnZTpcblx0ICogYWNjb3VudGluZy5mb3JtYXRNb25leSgxMjM0NTY3OCk7IC8vICQxMiwzNDUsNjc4LjAwXG5cdCAqXG5cdCAqIC8vIEV1cm9wZWFuIGZvcm1hdHRpbmcgKGN1c3RvbSBzeW1ib2wgYW5kIHNlcGFyYXRvcnMpLCBjYW4gYWxzbyB1c2Ugb3B0aW9ucyBvYmplY3QgYXMgc2Vjb25kIHBhcmFtZXRlcjpcblx0ICogYWNjb3VudGluZy5mb3JtYXRNb25leSg0OTk5Ljk5LCB7IHN5bWJvbDogXCLigqxcIiwgcHJlY2lzaW9uOiAyLCB0aG91c2FuZDogXCIuXCIsIGRlY2ltYWw6IFwiLFwiIH0pOyAvLyDigqw0Ljk5OSw5OVxuXHQgKlxuXHQgKiAvLyBOZWdhdGl2ZSB2YWx1ZXMgY2FuIGJlIGZvcm1hdHRlZCBuaWNlbHk6XG5cdCAqIGFjY291bnRpbmcuZm9ybWF0TW9uZXkoLTUwMDAwMCwgeyBzeW1ib2w6IFwiwqMgXCIsIHByZWNpc2lvbjogMCB9KTsgLy8gwqMgLTUwMCwwMDBcblx0ICpcblx0ICogLy8gU2ltcGxlIGBmb3JtYXRgIHN0cmluZyBhbGxvd3MgY29udHJvbCBvZiBzeW1ib2wgcG9zaXRpb24gKCV2ID0gdmFsdWUsICVzID0gc3ltYm9sKTpcblx0ICogYWNjb3VudGluZy5mb3JtYXRNb25leSg1MzE4MDA4LCB7IHN5bWJvbDogXCJHQlBcIiwgIGZvcm1hdDogXCIldiAlc1wiIH0pOyAvLyA1LDMxOCwwMDguMDAgR0JQXG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBAbWV0aG9kIGZvcm1hdE1vbmV5XG5cdCAqIEBmb3IgYWNjb3VudGluZ1xuXHQgKiBAcGFyYW0ge051bWJlcn0gICAgICAgIG51bWJlciBOdW1iZXIgdG8gYmUgZm9ybWF0dGVkLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gICAgICAgIFtvcHRzPXt9XSBPYmplY3QgY29udGFpbmluZyBhbGwgdGhlIG9wdGlvbnMgb2YgdGhlIG1ldGhvZC5cblx0ICogQHJldHVybiB7U3RyaW5nfSBUaGUgZ2l2ZW4gbnVtYmVyIHByb3Blcmx5IGZvcm1hdHRlZCBhcyBtb25leS5cblx0ICovXG5cdGZ1bmN0aW9uIGZvcm1hdE1vbmV5KG51bWJlcikge1xuXHQgIHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cblx0ICAvLyBSZXN1cnNpdmVseSBmb3JtYXQgYXJyYXlzOlxuXHQgIGlmIChBcnJheS5pc0FycmF5KG51bWJlcikpIHtcblx0ICAgIHJldHVybiBudW1iZXIubWFwKGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgICAgcmV0dXJuIGZvcm1hdE1vbmV5KHZhbCwgb3B0cyk7XG5cdCAgICB9KTtcblx0ICB9XG5cblx0ICAvLyBCdWlsZCBvcHRpb25zIG9iamVjdCBmcm9tIHNlY29uZCBwYXJhbSAoaWYgb2JqZWN0KSBvciBhbGwgcGFyYW1zLCBleHRlbmRpbmcgZGVmYXVsdHM6XG5cdCAgb3B0cyA9IG9iamVjdEFzc2lnbih7fSwgc2V0dGluZ3MsIG9wdHMpO1xuXG5cdCAgLy8gQ2hlY2sgZm9ybWF0IChyZXR1cm5zIG9iamVjdCB3aXRoIHBvcywgbmVnIGFuZCB6ZXJvKTpcblx0ICB2YXIgZm9ybWF0cyA9IF9jaGVja0N1cnJlbmN5Rm9ybWF0KG9wdHMuZm9ybWF0KTtcblxuXHQgIC8vIENob29zZSB3aGljaCBmb3JtYXQgdG8gdXNlIGZvciB0aGlzIHZhbHVlOlxuXHQgIHZhciB1c2VGb3JtYXQgPSB1bmRlZmluZWQ7XG5cblx0ICBpZiAobnVtYmVyID4gMCkge1xuXHQgICAgdXNlRm9ybWF0ID0gZm9ybWF0cy5wb3M7XG5cdCAgfSBlbHNlIGlmIChudW1iZXIgPCAwKSB7XG5cdCAgICB1c2VGb3JtYXQgPSBmb3JtYXRzLm5lZztcblx0ICB9IGVsc2Uge1xuXHQgICAgdXNlRm9ybWF0ID0gZm9ybWF0cy56ZXJvO1xuXHQgIH1cblxuXHQgIC8vIFJldHVybiB3aXRoIGN1cnJlbmN5IHN5bWJvbCBhZGRlZDpcblx0ICByZXR1cm4gdXNlRm9ybWF0LnJlcGxhY2UoJyVzJywgb3B0cy5zeW1ib2wpLnJlcGxhY2UoJyV2JywgZm9ybWF0TnVtYmVyKE1hdGguYWJzKG51bWJlciksIG9wdHMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGb3JtYXQgYSBsaXN0IG9mIG51bWJlcnMgaW50byBhbiBhY2NvdW50aW5nIGNvbHVtbiwgcGFkZGluZyB3aXRoIHdoaXRlc3BhY2Vcblx0ICogdG8gbGluZSB1cCBjdXJyZW5jeSBzeW1ib2xzLCB0aG91c2FuZCBzZXBhcmF0b3JzIGFuZCBkZWNpbWFscyBwbGFjZXNcblx0ICpcblx0ICogTGlzdCBzaG91bGQgYmUgYW4gYXJyYXkgb2YgbnVtYmVyc1xuXHQgKlxuXHQgKiBSZXR1cm5zIGFycmF5IG9mIGFjY291dGluZy1mb3JtYXR0ZWQgbnVtYmVyIHN0cmluZ3Mgb2Ygc2FtZSBsZW5ndGhcblx0ICpcblx0ICogTkI6IGB3aGl0ZS1zcGFjZTpwcmVgIENTUyBydWxlIGlzIHJlcXVpcmVkIG9uIHRoZSBsaXN0IGNvbnRhaW5lciB0byBwcmV2ZW50XG5cdCAqIGJyb3dzZXJzIGZyb20gY29sbGFwc2luZyB0aGUgd2hpdGVzcGFjZSBpbiB0aGUgb3V0cHV0IHN0cmluZ3MuXG5cdCAqXG5cdCAqIGBgYGpzXG5cdCAqIGFjY291bnRpbmcuZm9ybWF0Q29sdW1uKFsxMjMuNSwgMzQ1Ni40OSwgNzc3ODg4Ljk5LCAxMjM0NTY3OCwgLTU0MzJdLCB7IHN5bWJvbDogXCIkIFwiIH0pO1xuXHQgKiBgYGBcblx0ICpcblx0ICogQG1ldGhvZCBmb3JtYXRDb2x1bW5cblx0ICogQGZvciBhY2NvdW50aW5nXG5cdCAqIEBwYXJhbSB7QXJyYXk8TnVtYmVyPn0gbGlzdCBBbiBhcnJheSBvZiBudW1iZXJzIHRvIGZvcm1hdFxuXHQgKiBAcGFyYW0ge09iamVjdH0gICAgICAgIFtvcHRzPXt9XSBPYmplY3QgY29udGFpbmluZyBhbGwgdGhlIG9wdGlvbnMgb2YgdGhlIG1ldGhvZC5cblx0ICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBbc3ltYm9sPVwiJFwiXSBTdHJpbmcgd2l0aCB0aGUgY3VycmVuY3kgc3ltYm9sLiBGb3IgY29udmVuaWVuY3kgaWYgY2FuIGJlIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgb3B0aW9ucyBvZiB0aGUgbWV0aG9kLlxuXHQgKiBAcGFyYW0ge0ludGVnZXJ9ICAgICAgIFtwcmVjaXNpb249Ml0gTnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgW3Rob3VzYW5kPScsJ10gU3RyaW5nIHdpdGggdGhlIHRob3VzYW5kcyBzZXBhcmF0b3IuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgW2RlY2ltYWw9XCIuXCJdIFN0cmluZyB3aXRoIHRoZSBkZWNpbWFsIHNlcGFyYXRvci5cblx0ICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICBbZm9ybWF0PVwiJXMldlwiXSBTdHJpbmcgd2l0aCB0aGUgZm9ybWF0IHRvIGFwcGx5LCB3aGVyZSAlcyBpcyB0aGUgY3VycmVuY3kgc3ltYm9sIGFuZCAldiBpcyB0aGUgdmFsdWUuXG5cdCAqIEByZXR1cm4ge0FycmF5PFN0cmluZz59IGFycmF5IG9mIGFjY291dGluZy1mb3JtYXR0ZWQgbnVtYmVyIHN0cmluZ3Mgb2Ygc2FtZSBsZW5ndGhcblx0ICovXG5cdGZ1bmN0aW9uIGZvcm1hdENvbHVtbihsaXN0KSB7XG5cdCAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIGlmICghbGlzdCkgcmV0dXJuIFtdO1xuXG5cdCAgLy8gQnVpbGQgb3B0aW9ucyBvYmplY3QgZnJvbSBzZWNvbmQgcGFyYW0gKGlmIG9iamVjdCkgb3IgYWxsIHBhcmFtcywgZXh0ZW5kaW5nIGRlZmF1bHRzOlxuXHQgIG9wdHMgPSBvYmplY3RBc3NpZ24oe30sIHNldHRpbmdzLCBvcHRzKTtcblxuXHQgIC8vIENoZWNrIGZvcm1hdCAocmV0dXJucyBvYmplY3Qgd2l0aCBwb3MsIG5lZyBhbmQgemVybyksIG9ubHkgbmVlZCBwb3MgZm9yIG5vdzpcblx0ICB2YXIgZm9ybWF0cyA9IF9jaGVja0N1cnJlbmN5Rm9ybWF0KG9wdHMuZm9ybWF0KTtcblxuXHQgIC8vIFdoZXRoZXIgdG8gcGFkIGF0IHN0YXJ0IG9mIHN0cmluZyBvciBhZnRlciBjdXJyZW5jeSBzeW1ib2w6XG5cdCAgdmFyIHBhZEFmdGVyU3ltYm9sID0gZm9ybWF0cy5wb3MuaW5kZXhPZignJXMnKSA8IGZvcm1hdHMucG9zLmluZGV4T2YoJyV2Jyk7XG5cblx0ICAvLyBTdG9yZSB2YWx1ZSBmb3IgdGhlIGxlbmd0aCBvZiB0aGUgbG9uZ2VzdCBzdHJpbmcgaW4gdGhlIGNvbHVtbjpcblx0ICB2YXIgbWF4TGVuZ3RoID0gMDtcblxuXHQgIC8vIEZvcm1hdCB0aGUgbGlzdCBhY2NvcmRpbmcgdG8gb3B0aW9ucywgc3RvcmUgdGhlIGxlbmd0aCBvZiB0aGUgbG9uZ2VzdCBzdHJpbmc6XG5cdCAgdmFyIGZvcm1hdHRlZCA9IGxpc3QubWFwKGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcblx0ICAgICAgLy8gUmVjdXJzaXZlbHkgZm9ybWF0IGNvbHVtbnMgaWYgbGlzdCBpcyBhIG11bHRpLWRpbWVuc2lvbmFsIGFycmF5OlxuXHQgICAgICByZXR1cm4gZm9ybWF0Q29sdW1uKHZhbCwgb3B0cyk7XG5cdCAgICB9XG5cdCAgICAvLyBDbGVhbiB1cCB0aGUgdmFsdWVcblx0ICAgIHZhbCA9IHVuZm9ybWF0KHZhbCwgb3B0cy5kZWNpbWFsKTtcblxuXHQgICAgLy8gQ2hvb3NlIHdoaWNoIGZvcm1hdCB0byB1c2UgZm9yIHRoaXMgdmFsdWUgKHBvcywgbmVnIG9yIHplcm8pOlxuXHQgICAgdmFyIHVzZUZvcm1hdCA9IHVuZGVmaW5lZDtcblxuXHQgICAgaWYgKHZhbCA+IDApIHtcblx0ICAgICAgdXNlRm9ybWF0ID0gZm9ybWF0cy5wb3M7XG5cdCAgICB9IGVsc2UgaWYgKHZhbCA8IDApIHtcblx0ICAgICAgdXNlRm9ybWF0ID0gZm9ybWF0cy5uZWc7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB1c2VGb3JtYXQgPSBmb3JtYXRzLnplcm87XG5cdCAgICB9XG5cblx0ICAgIC8vIEZvcm1hdCB0aGlzIHZhbHVlLCBwdXNoIGludG8gZm9ybWF0dGVkIGxpc3QgYW5kIHNhdmUgdGhlIGxlbmd0aDpcblx0ICAgIHZhciBmVmFsID0gdXNlRm9ybWF0LnJlcGxhY2UoJyVzJywgb3B0cy5zeW1ib2wpLnJlcGxhY2UoJyV2JywgZm9ybWF0TnVtYmVyKE1hdGguYWJzKHZhbCksIG9wdHMpKTtcblxuXHQgICAgaWYgKGZWYWwubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG5cdCAgICAgIG1heExlbmd0aCA9IGZWYWwubGVuZ3RoO1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gZlZhbDtcblx0ICB9KTtcblxuXHQgIC8vIFBhZCBlYWNoIG51bWJlciBpbiB0aGUgbGlzdCBhbmQgc2VuZCBiYWNrIHRoZSBjb2x1bW4gb2YgbnVtYmVyczpcblx0ICByZXR1cm4gZm9ybWF0dGVkLm1hcChmdW5jdGlvbiAodmFsKSB7XG5cdCAgICAvLyBPbmx5IGlmIHRoaXMgaXMgYSBzdHJpbmcgKG5vdCBhIG5lc3RlZCBhcnJheSwgd2hpY2ggd291bGQgaGF2ZSBhbHJlYWR5IGJlZW4gcGFkZGVkKTpcblx0ICAgIGlmIChpc1N0cmluZyh2YWwpICYmIHZhbC5sZW5ndGggPCBtYXhMZW5ndGgpIHtcblx0ICAgICAgLy8gRGVwZW5kaW5nIG9uIHN5bWJvbCBwb3NpdGlvbiwgcGFkIGFmdGVyIHN5bWJvbCBvciBhdCBpbmRleCAwOlxuXHQgICAgICByZXR1cm4gcGFkQWZ0ZXJTeW1ib2wgPyB2YWwucmVwbGFjZShvcHRzLnN5bWJvbCwgb3B0cy5zeW1ib2wgKyBuZXcgQXJyYXkobWF4TGVuZ3RoIC0gdmFsLmxlbmd0aCArIDEpLmpvaW4oJyAnKSkgOiBuZXcgQXJyYXkobWF4TGVuZ3RoIC0gdmFsLmxlbmd0aCArIDEpLmpvaW4oJyAnKSArIHZhbDtcblx0ICAgIH1cblx0ICAgIHJldHVybiB2YWw7XG5cdCAgfSk7XG5cdH1cblxuXHRleHBvcnRzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cdGV4cG9ydHMudW5mb3JtYXQgPSB1bmZvcm1hdDtcblx0ZXhwb3J0cy50b0ZpeGVkID0gdG9GaXhlZDtcblx0ZXhwb3J0cy5mb3JtYXRNb25leSA9IGZvcm1hdE1vbmV5O1xuXHRleHBvcnRzLmZvcm1hdE51bWJlciA9IGZvcm1hdE51bWJlcjtcblx0ZXhwb3J0cy5mb3JtYXRDb2x1bW4gPSBmb3JtYXRDb2x1bW47XG5cdGV4cG9ydHMuZm9ybWF0ID0gZm9ybWF0TW9uZXk7XG5cdGV4cG9ydHMucGFyc2UgPSB1bmZvcm1hdDtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWNjb3VudGluZy51bWQuanMubWFwIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzRW1wdHksIGlzU3RyaW5nLCBpc051bWJlciwgaXNCb29sZWFuLCBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBFeGNlcHRpb24sIENVUlJFTkNZX0NPTkZJRyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5cbi8qKlxuICogQSB2YWx1ZSBvYmplY3QgcmVwcmVzZW50aW5nIGN1cnJlbmN5IHZhbHVlc1xuICovXG5leHBvcnQgY2xhc3MgQ3VycmVuY3kge1xuXHQvKipcblx0ICogYmVjYXVzZSBtaW5pZmljYXRpb24gZGVzdHJveXMgY2xhc3MgbmFtZXMgYW5kIHJlbmRlcnMgaW5zdGFuZU9mIHVzZWxlc3Ncblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGRpc3BsYXlOYW1lID0gJ0N1cnJlbmN5JztcblxuXHQvKipcblx0ICogVGhlIElTTyA0MjE3IGNvZGUgaWRlbnRpZnlpbmcgdGhlIGN1cnJlbmN5IChlZy4gJ1VTRCcpXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRjb2RlID0gJyc7XG5cblx0LyoqXG5cdCAqIFRoZSBzaW5ndWxhciBsYWJlbCBmb3IgdGhlIGN1cnJlbmN5IChlZy4gJ0RvbGxhcicpO1xuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0c2luZ3VsYXJMYWJlbCA9ICcnO1xuXG5cdC8qKlxuXHQgKiBUaGUgcGx1cmFsIGxhYmVsIGZvciB0aGUgY3VycmVuY3kgKGVnLiAnRG9sbGFycycpO1xuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0cGx1cmFsTGFiZWwgPSAnJztcblxuXHQvKipcblx0ICogVGhlIGN1cnJlbmN5IHN5bWJvbCAoZWcuICckJyk7XG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRzaWduID0gJyc7XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGN1cnJlbmN5IHN5bWJvbCBpcyBkaXNwbGF5ZWQgYmVmb3JlIG9yIGFmdGVyIHRoZSB2YWx1ZS5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRzaWduQjQgPSB0cnVlO1xuXG5cdC8qKlxuXHQgKiBUaGUgcHJlY2lzaW9uIGZvciB0aGUgdmFsdWUgKGVnLiAxMC4wMiBpcyAyLCAxMC4xMjMgaXMgMykuIFRoZSBudW1iZXIgb2Zcblx0ICogZGVjaW1hbCBwbGFjZXMgY2FuIGJlIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBudW1iZXIgb2Ygc3VidW5pdHMgZm9yIHRoZVxuXHQgKiBjdXJyZW5jeSAtIHN1YnVuaXRzID0gcG93KCAxMCwgZGVjaW1hbFBsYWNlcykuXG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRkZWNpbWFsUGxhY2VzID0gMjtcblxuXHQvKipcblx0ICogVGhlIHN5bWJvbCB1c2VkIGZvciB0aGUgZGVjaW1hbCBtYXJrIChlZy4gJy4nKVxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0ZGVjaW1hbE1hcmsgPSAnLic7XG5cblx0LyoqXG5cdCAqIFRoZSBzeW1ib2wgdXNlZCB0byBzcGxpdCB1cCB0aG91c2FuZHMgaW4gdGhlIHZhbHVlIChlZy4gJywnKVxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0dGhvdXNhbmRzU2VwYXJhdG9yID0gJywnO1xuXG5cdC8qKlxuXHQgKiBUaGUgbnVtYmVyIG9mIGZyYWN0aW9uYWwgZGl2aXNpb25zIG9mIGEgY3VycmVuY3kncyBtYWluIHVuaXQuICBJZiBub3Rcblx0ICogcHJvdmlkZWQsIHRoZW4gaXQgaXMgYXV0b21hdGljYWxseSBjYWxjdWxhdGVkIGZyb20gdGhlIGRlY2ltYWxQbGFjZXNcblx0ICogdmFsdWUuXG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdWJ1bml0cyA9IDEwMDtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIHt7fX0gY3VycmVuY3lDb25maWcgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGNvbmZpZ3VyYXRpb24gZm9yXG5cdCAqIHRoaXMgY3VycmVuY3kgdmFsdWUgb2JqZWN0LiAgT24gY29uc3RydWN0aW9uLCB0aGUgQ3VycmVuY3kgb2JqZWN0IGlzXG5cdCAqIGZyb3plbiBzbyB0aGF0IGl0IGJlY29tZXMgaW1tdXRhYmxlLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoY3VycmVuY3lDb25maWcpIHtcblx0XHRDdXJyZW5jeS52YWxpZGF0ZUN1cnJlbmN5Q29uZmlnKGN1cnJlbmN5Q29uZmlnKTtcblx0XHR0aGlzLmRpc3BsYXlOYW1lID0gJ0N1cnJlbmN5Jztcblx0XHR0aGlzLmNvZGUgPSBjdXJyZW5jeUNvbmZpZy5jb2RlO1xuXHRcdHRoaXMuc2luZ3VsYXJMYWJlbCA9IGN1cnJlbmN5Q29uZmlnLnNpbmd1bGFyTGFiZWwgfHwgJyc7XG5cdFx0dGhpcy5wbHVyYWxMYWJlbCA9IGN1cnJlbmN5Q29uZmlnLnBsdXJhbExhYmVsIHx8ICcnO1xuXHRcdHRoaXMuc2lnbiA9IGN1cnJlbmN5Q29uZmlnLnNpZ247XG5cdFx0dGhpcy5zaWduQjQgPSBpc1VuZGVmaW5lZChjdXJyZW5jeUNvbmZpZy5zaWduQjQpXG5cdFx0XHQ/IHRoaXMuc2lnbkI0XG5cdFx0XHQ6IGN1cnJlbmN5Q29uZmlnLnNpZ25CNDtcblx0XHR0aGlzLmRlY2ltYWxQbGFjZXMgPSBpc1VuZGVmaW5lZChjdXJyZW5jeUNvbmZpZy5kZWNpbWFsUGxhY2VzKVxuXHRcdFx0PyB0aGlzLmRlY2ltYWxQbGFjZXNcblx0XHRcdDogY3VycmVuY3lDb25maWcuZGVjaW1hbFBsYWNlcztcblx0XHR0aGlzLmRlY2ltYWxNYXJrID0gY3VycmVuY3lDb25maWcuZGVjaW1hbE1hcmsgfHwgdGhpcy5kZWNpbWFsTWFyaztcblx0XHR0aGlzLnRob3VzYW5kc1NlcGFyYXRvciA9XG5cdFx0XHRjdXJyZW5jeUNvbmZpZy50aG91c2FuZHNTZXBhcmF0b3IgfHwgdGhpcy50aG91c2FuZHNTZXBhcmF0b3I7XG5cdFx0dGhpcy5zdWJ1bml0cyA9XG5cdFx0XHRjdXJyZW5jeUNvbmZpZy5zdWJ1bml0cyB8fCBNYXRoLnBvdygxMCwgdGhpcy5kZWNpbWFsUGxhY2VzKTtcblx0XHRPYmplY3QuZnJlZXplKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGN1cnJlbmN5IHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0IGZvcm1hdHRlZCBmb3IgdGhlXG5cdCAqIGFjY291bnRpbmctanMgbGlicmFyeSBjb25maWd1cmF0aW9uLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHt7fX0gIEFuIG9iamVjdCBzaGFwZWQgZm9yIHdoYXQgdGhlIGFjY291bnRpbmctanMgbGlicmFyeSBleHBlY3RzXG5cdCAqL1xuXHR0b0FjY291bnRpbmdTZXR0aW5ncygpIHtcblx0XHRjb25zdCBkZWNpbWFsSW5mbyA9IHtcblx0XHRcdGRlY2ltYWw6IHRoaXMuZGVjaW1hbE1hcmssXG5cdFx0XHR0aG91c2FuZDogdGhpcy50aG91c2FuZHNTZXBhcmF0b3IsXG5cdFx0XHRwcmVjaXNpb246IHRoaXMuZGVjaW1hbFBsYWNlcyxcblx0XHR9O1xuXHRcdHJldHVybiB7XG5cdFx0XHRjdXJyZW5jeToge1xuXHRcdFx0XHRzeW1ib2w6IHRoaXMuc2lnbixcblx0XHRcdFx0Zm9ybWF0OiB7XG5cdFx0XHRcdFx0cG9zOiB0aGlzLnNpZ25CNCA/ICclcyV2JyA6ICcldiVzJyxcblx0XHRcdFx0XHRuZWc6IHRoaXMuc2lnbkI0ID8gJy0gJHMldicgOiAnLSAldiVzJyxcblx0XHRcdFx0XHR6ZXJvOiB0aGlzLnNpZ25CNCA/ICclcyV2JyA6ICcldiVzJyxcblx0XHRcdFx0fSxcblx0XHRcdFx0Li4uZGVjaW1hbEluZm8sXG5cdFx0XHR9LFxuXHRcdFx0bnVtYmVyOiBkZWNpbWFsSW5mbyxcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiB7T2JqZWN0fSBGdW5jdGlvbiByZXR1cm5pbmcgdGhlIG9iamVjdCB0byBiZSBzZXJpYWxpemVkIGJ5XG5cdCAqIEpTT04uc3RyaW5naWZ5XG5cdCAqL1xuXHR0b0pTT04oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvZGU6IHRoaXMuY29kZSxcblx0XHRcdHNpbmd1bGFyTGFiZWw6IHRoaXMuc2luZ3VsYXJMYWJlbCxcblx0XHRcdHBsdXJhbExhYmVsOiB0aGlzLnBsdXJhbExhYmVsLFxuXHRcdFx0c2lnbjogdGhpcy5zaWduLFxuXHRcdFx0c2lnbkI0OiB0aGlzLnNpZ25CNCxcblx0XHRcdGRlY2ltYWxNYXJrOiB0aGlzLmRlY2ltYWxNYXJrLFxuXHRcdFx0dGhvdXNhbmRzU2VwYXJhdG9yOiB0aGlzLnRob3VzYW5kc1NlcGFyYXRvcixcblx0XHRcdHN1YnVuaXRzOiB0aGlzLnN1YnVuaXRzLFxuXHRcdFx0ZGVjaW1hbFBsYWNlczogdGhpcy5kZWNpbWFsUGxhY2VzLFxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyB2YWxpZGF0ZXMgd2hldGhlciB0aGUgcGFzc2VkIGluIGNvbmZpZyBoYXMgdGhlIHJlcXVpcmVkIHByb3BlcnRpZXNcblx0ICogKGFuZCBjb3JyZWN0IHR5cGVzKSBmb3IgY29uc3RydWN0aW5nIGEgQ3VycmVuY3kgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG5cdCAqIEB0aHJvd3Mge0V4Y2VwdGlvbn1cblx0ICogQHRocm93cyB7VHlwZUVycm9yfVxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlQ3VycmVuY3lDb25maWcgPSAoY29uZmlnKSA9PiB7XG5cdFx0aWYgKGlzRW1wdHkoY29uZmlnKSkge1xuXHRcdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbihcblx0XHRcdFx0J1RoZSBjb25maWd1cmF0aW9uIG9iamVjdCBwcm92aWRlZCB0byBDdXJyZW5jeSBtdXN0IG5vdCcgK1xuXHRcdFx0XHRcdCcgYmUgZW1wdHknXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIWNvbmZpZy5jb2RlIHx8ICFpc1N0cmluZyhjb25maWcuY29kZSkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgcHJvdmlkZWQgdG8gQ3VycmVuY3kgbXVzdCBoYXZlICcgK1xuXHRcdFx0XHRcdCdhIFwiY29kZVwiIHByb3BlcnR5IHRoYXQgaXMgYSBzdHJpbmcuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIWNvbmZpZy5zaWduIHx8ICFpc1N0cmluZyhjb25maWcuc2lnbikpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgY29uZmlndXJhdGlvbiBvYmplY3QgcHJvdmlkZWQgdG8gQ3VycmVuY3kgbXVzdCBoYXZlIGEgJyArXG5cdFx0XHRcdFx0J1wic2lnblwiIHByb3BlcnR5IHRoYXQgaXMgYSBzdHJpbmcuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoY29uZmlnLnNpbmd1bGFyTGFiZWwgJiYgIWlzU3RyaW5nKGNvbmZpZy5zaW5ndWxhckxhYmVsKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBzaW5ndWxhckxhYmVsIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0XHQnbXVzdCBiZSBhIHN0cmluZyBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoY29uZmlnLnBsdXJhbExhYmVsICYmICFpc1N0cmluZyhjb25maWcucGx1cmFsTGFiZWwpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHBsdXJhbExhYmVsIHByb3BlcnR5IG9uIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCAnICtcblx0XHRcdFx0XHQnbXVzdCBiZSBhIHN0cmluZyBwcmltaXRpdmUuJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoY29uZmlnLnNpZ25CNCAmJiAhaXNCb29sZWFuKGNvbmZpZy5zaWduQjQpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHNpZ25CNCBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdFx0J211c3QgYmUgYSBib29sZWFuIHByaW1pdGl2ZS4nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChjb25maWcuZGVjaW1hbFBsYWNlcyAmJiAhaXNOdW1iZXIoY29uZmlnLmRlY2ltYWxQbGFjZXMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGRlY2ltYWxQbGFjZXMgcHJvcGVydHkgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0ICcgK1xuXHRcdFx0XHRcdCdtdXN0IGJlIGEgbnVtYmVyIHByaW1pdGl2ZSdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKGNvbmZpZy5kZWNpbWFsTWFyayAmJiAhaXNTdHJpbmcoY29uZmlnLmRlY2ltYWxNYXJrKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBkZWNpbWFsTWFyayBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdFx0J211c3QgYmUgYSBzdHJpbmcgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKGNvbmZpZy50aG91c2FuZHNTZXBhcmF0b3IgJiYgIWlzU3RyaW5nKGNvbmZpZy50aG91c2FuZHNTZXBhcmF0b3IpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIHRob3VzYW5kc1NlcGFyYXRvciBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdFx0J211c3QgYmUgYSBzdHJpbmcgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKGNvbmZpZy5zdWJ1bml0cyAmJiAhaXNOdW1iZXIoY29uZmlnLnN1YnVuaXRzKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBzdWJ1bml0cyBwcm9wZXJ0eSBvbiB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgJyArXG5cdFx0XHRcdFx0J211c3QgYmUgYSBudW1iZXIgcHJpbWl0aXZlLidcblx0XHRcdCk7XG5cdFx0fVxuXHR9O1xufVxuXG4vKipcbiAqIEV4cG9ydCBvZiBhIEN1cnJlbmN5IFZhbHVlIG9iamVjdCBjcmVhdGVkIGZyb20gYSBjdXJyZW5jeSBjb25maWcgcHJvdmlkZWQuXG4gKiBUaGlzIGNhdGNoZXMgYW55IGV4Y2VwdGlvbiBhbmQgdHJpZ2dlcnMgYSBjb25zb2xlIGVycm9yLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAqIEByZXR1cm4ge0N1cnJlbmN5fHt9fSBJZiB0aGVyZSdzIGEgcHJvYmxlbSBjb25zdHJ1Y3RpbmcgdGhlIGN1cnJlbmN5IG9iamVjdFxuICogYW4gZW1wdHkgb2JqZWN0IGlzIHJldHVybmVkLlxuICovXG5leHBvcnQgY29uc3QgU2l0ZUN1cnJlbmN5ID0gKGNvbmZpZyA9IHt9KSA9PiB7XG5cdGxldCBjdXJyZW5jeTtcblx0dHJ5IHtcblx0XHRjdXJyZW5jeSA9IG5ldyBDdXJyZW5jeShjb25maWcpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Y3VycmVuY3kgPSB7fTtcblx0XHR3YXJuaW5nKFxuXHRcdFx0ZmFsc2UsXG5cdFx0XHQnVGhlIFNpdGUgQ3VycmVuY3kgb2JqZWN0IGNvdWxkIG5vdCBiZSBjcmVhdGVkIGJlY2F1c2UgJyArXG5cdFx0XHRcdCdvZiB0aGlzIGVycm9yOiAnICtcblx0XHRcdFx0ZS5tZXNzYWdlXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gY3VycmVuY3k7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaXRlQ3VycmVuY3koQ1VSUkVOQ1lfQ09ORklHKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBpc1N0cmluZywgaXNOdW1iZXIgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0SW52YWxpZFRpbWV6b25lLFxuXHRJbnZhbGlkSVNPODYwMVN0cmluZyxcblx0SW52YWxpZExvY2FsZSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIGxvY2FsZSBzdHJpbmcgaXMgYSB2YWxpZCBsb2NhbGUuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBsb2NhbGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IElmIGdpdmVuIGxvY2FsZSBzdHJpbmcgaXMgbm90IHZhbGlkIHRoaXMgd2lsbCByZXR1cm4gZmFsc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUxvY2FsZShsb2NhbGUpIHtcblx0aWYgKCFpc1N0cmluZyhsb2NhbGUpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IG9yaWdpbmFsTG9jYWxlID0gbW9tZW50LmxvY2FsZSgpO1xuXHRjb25zdCB2YWxpZGF0aW9uTG9jYWxlID0gbW9tZW50LmxvY2FsZShsb2NhbGUpO1xuXHQvLyByZXNldCBiYWNrIHRvIG9yaWdpbmFsIGxvY2FsZVxuXHRtb21lbnQubG9jYWxlKG9yaWdpbmFsTG9jYWxlKTtcblx0cmV0dXJuICEobG9jYWxlICE9PSAnZW4nICYmIHZhbGlkYXRpb25Mb2NhbGUgPT09ICdlbicpO1xufVxuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciBnaXZlbiBsb2NhbGUgc3RyaW5nIGlzIHZhbGlkLiAgSWYgaXQncyBub3QgYW4gZXhjZXB0aW9uIGlzXG4gKiB0aHJvd24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuICogQHRocm93cyBJbnZhbGlkTG9jYWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRMb2NhbGVJc1ZhbGlkKGxvY2FsZSkge1xuXHRpZiAoIXZhbGlkYXRlTG9jYWxlKGxvY2FsZSkpIHtcblx0XHR0aHJvdyBuZXcgSW52YWxpZExvY2FsZShsb2NhbGUpO1xuXHR9XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIElTTzg2MDEgZm9ybWF0dGVkIGRhdGUgYW5kXG4gKiB0aW1lIHN0cmluZy5cbiAqXG4gKiBOb3RlOiBkYXRlIHJlZ2V4IHBhdHRlcm4gZnJvbVxuICogaHR0cDovL3d3dy5wZWxhZ29kZXNpZ24uY29tL2Jsb2cvMjAwOS8wNS8yMC9pc28tODYwMS1kYXRlLXZhbGlkYXRpb24tdGhhdC1kb2VzbnQtc3Vjay9cbiAqIE5vdGU6IGlzRHVyYXRpb24gcmVnZXggcGF0dGVybiBmcm9tXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY3lsYy9jeWxjL2lzc3Vlcy8xMTkjaXNzdWVjb21tZW50LTk0MzU1MzNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRpbWVTdHJpbmdcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEdXJhdGlvbiAgV2hldGhlciB0byB2YWxpZGF0ZSBmb3IgYSBkdXJhdGlvbiBmb3JtYXQgb3Igbm90LlxuICogQHJldHVybiB7Ym9vbGVhbn0gIFJldHVybnMgZmFsc2UgaWYgdGhlIGdpdmVuIHN0cmluZyBpcyBub3QgdmFsaWQgSVNPODYwMVxuICogZm9ybWF0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUlTTzg2MDEoZGF0ZVRpbWVTdHJpbmcsIGlzRHVyYXRpb24gPSBmYWxzZSkge1xuXHRpZiAoIWlzU3RyaW5nKGRhdGVUaW1lU3RyaW5nKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCByZWdleCA9IGlzRHVyYXRpb25cblx0XHQ/IC9eKFJcXGQqXFwvKT9QKD86XFxkKyg/OlxcLlxcZCspP1kpPyg/OlxcZCsoPzpcXC5cXGQrKT9NKT8oPzpcXGQrKD86XFwuXFxkKyk/Vyk/KD86XFxkKyg/OlxcLlxcZCspP0QpPyg/OlQoPzpcXGQrKD86XFwuXFxkKyk/SCk/KD86XFxkKyg/OlxcLlxcZCspP00pPyg/OlxcZCsoPzpcXC5cXGQrKT9TKT8pPyQvXG5cdFx0OiAvXihbXFwrLV0/XFxkezR9KD8hXFxkezJ9XFxiKSkoKC0/KSgoMFsxLTldfDFbMC0yXSkoXFwzKFsxMl1cXGR8MFsxLTldfDNbMDFdKSk/fFcoWzAtNF1cXGR8NVswLTJdKSgtP1sxLTddKT98KDAwWzEtOV18MFsxLTldXFxkfFsxMl1cXGR7Mn18MyhbMC01XVxcZHw2WzEtNl0pKSkoW1RcXHNdKCgoWzAxXVxcZHwyWzAtM10pKCg6PylbMC01XVxcZCk/fDI0XFw6PzAwKShbXFwuLF1cXGQrKD8hOikpPyk/KFxcMTdbMC01XVxcZChbXFwuLF1cXGQrKT8pPyhbelpdfChbXFwrLV0pKFswMV1cXGR8MlswLTNdKTo/KFswLTVdXFxkKT8pPyk/KT8kLztcblx0cmV0dXJuIHJlZ2V4LnRlc3QoZGF0ZVRpbWVTdHJpbmcpO1xufVxuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gc3RyaW5nIGlzIGEgdmFsaWQgSVNPODYwMSBmb3JtYXR0ZWQgZGF0ZSBhbmQgdGltZVxuICogc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVGltZVN0cmluZ1xuICogQHBhcmFtIHtib29sZWFufSBpc0R1cmF0aW9uICBXaGV0aGVyIHRvIGFzc2VydCBmb3IgYSBkdXJhdGlvbiBmb3JtYXQgb3Igbm90LlxuICogQHRocm93cyBJbnZhbGlkSVNPODYwMVN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0SVNPODYwMUlzVmFsaWQoZGF0ZVRpbWVTdHJpbmcsIGlzRHVyYXRpb24gPSBmYWxzZSkge1xuXHRpZiAoIXZhbGlkYXRlSVNPODYwMShkYXRlVGltZVN0cmluZywgaXNEdXJhdGlvbikpIHtcblx0XHR0aHJvdyBuZXcgSW52YWxpZElTTzg2MDFTdHJpbmcoZGF0ZVRpbWVTdHJpbmcpO1xuXHR9XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIHRpbWV6b25lIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFJldHVybnMgZmFsc2UgaWYgdGhlIGdpdmVuIHN0cmluZyBpcyBub3QgYSB2YWxpZCB0aW1lem9uZVxuICogc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVRpbWV6b25lKHRpbWV6b25lKSB7XG5cdGlmICghaXNTdHJpbmcodGltZXpvbmUpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGNvbnN0IGR0ID0gbW9tZW50LnR6LnpvbmUodGltZXpvbmUpO1xuXHRyZXR1cm4gZHQgIT09IG51bGw7XG59XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCB0aW1lem9uZSBzdHJpbmcgYW5kIHRocm93cyBhblxuICogZXhjZXB0aW9uIGlmIGl0IGlzbid0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuICogQHRocm93cyBJbnZhbGlkVGltZXpvbmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFRpbWV6b25lSXNWYWxpZCh0aW1lem9uZSkge1xuXHRpZiAoIXZhbGlkYXRlVGltZXpvbmUodGltZXpvbmUpKSB7XG5cdFx0dGhyb3cgbmV3IEludmFsaWRUaW1lem9uZSh0aW1lem9uZSk7XG5cdH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGphdmFzY3JpcHQgRGF0ZVxuICogb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGUgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVJc0RhdGUoZGF0ZSkge1xuXHRyZXR1cm4gZGF0ZSBpbnN0YW5jZW9mIERhdGU7XG59XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydElzRGF0ZShkYXRlKSB7XG5cdGlmICghdmFsaWRhdGVJc0RhdGUoZGF0ZSkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuIGluc3RhbmNlIG9mIERhdGUnKTtcblx0fVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIG9mZnNldFxuICpcbiAqIEN1cnJlbnRseSB0aGlzIGp1c3QgdmFsaWRhdGVzIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIG51bWJlci4gRXZlbnR1YWxseSBpdFxuICogbWlnaHQgY2hlY2sgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gKiBAcmV0dXJuIHtib29sZWFufSAgdHJ1ZSBtZWFucyBpdHMgdmFsaWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUlzT2Zmc2V0KG9mZnNldCkge1xuXHRyZXR1cm4gaXNOdW1iZXIob2Zmc2V0KTtcbn1cblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgdmFsaWQgb2Zmc2V0LlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcbiAqIEB0aHJvd3MgVHlwZUVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRJc09mZnNldChvZmZzZXQpIHtcblx0aWYgKCF2YWxpZGF0ZUlzT2Zmc2V0KG9mZnNldCkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPZmZzZXQgaXMgZXhwZWN0ZWQgdG8gYmUgYSBudW1iZXInKTtcblx0fVxufVxuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCB7XG5cdGNhcGl0YWxpemUsXG5cdG9taXQsXG5cdGlzTnVtYmVyLFxuXHRpc0VtcHR5LFxuXHRyZWR1Y2UsXG5cdGlzT2JqZWN0LFxuXHRpc1VuZGVmaW5lZCxcblx0aXNGdW5jdGlvbixcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGluc3RhbmNlT2YgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdEludmFsaWREYXRlVGltZSxcblx0SW52YWxpZEFyZ3VtZW50LFxuXHRJbnZhbGlkSVNPODYwMVN0cmluZyxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgKiBhcyBhc3NlcnRpb25zIGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5pbXBvcnQgRHVyYXRpb24gZnJvbSAnLi9kdXJhdGlvbic7XG5pbXBvcnQge1xuXHRERUZBVUxUX1RJTUVaT05FX1NUUklORyxcblx0REVGQVVMVF9PRkZTRVQsXG5cdERFRkFVTFRfVkFMSURfTE9DQUxFLFxuXHRERUZBVUxUX0ZPUk1BVCxcbn0gZnJvbSAnLi9kZWZhdWx0cyc7XG5cbi8qKlxuICogQSBjb2xsZWN0aW9uIG9mIHN5bWJvbHMgdXNlZCBmb3IgXCJwcml2YXRlXCIgcHJvcGVydGllcyBpbiB0aGUgRGF0ZVRpbWUgb2JqZWN0LlxuICpcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGRhdGV0aW1lOiBTeW1ib2xcbiAqIFx0fVxuICogfVxuICovXG5jb25zdCBwcml2YXRlUHJvcGVydGllcyA9IHtcblx0ZGF0ZXRpbWU6IFN5bWJvbCgnRGF0ZVRpbWVQcm9wZXJ0eURhdGVUaW1lJyksXG59O1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBzeW1ib2xzIHVzZWQgZm9yIFwicHJpdmF0ZVwiIG1ldGhvZHMgaW4gdGhlIERhdGVUaW1lIG9iamVjdC5cbiAqXG4gKiBAdHlwZSB7XG4gKiB7XG4gKiBcdGdldFVuaXROYW1lczogU3ltYm9sLFxuICogXHRjcmVhdGVHZXR0ZXJzQW5kU2V0dGVyczogU3ltYm9sLFxuICogXHRleHRyYWN0TW9tZW50c0Zyb21EYXRlVGltZXM6IFN5bWJvbCxcbiAqIFx0bm9ybWFsaXplVW5pdE5hbWU6IFN5bWJvbCxcbiAqIFx0bm9ybWFsaXplVW5pdE9iamVjdDogU3ltYm9sLFxuICogXHRub3JtYWxpemVVbml0VmFsdWU6IFN5bWJvbCxcbiAqIFx0fVxuICogfVxuICovXG5jb25zdCBwcml2YXRlTWV0aG9kcyA9IHtcblx0Z2V0VW5pdE5hbWVzOiBTeW1ib2woJ0RhdGVUaW1lTWV0aG9kR2V0VW5pdE5hbWVzJyksXG5cdGNyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzOiBTeW1ib2woJ0RhdGVUaW1lTWV0aG9kQ3JlYXRlR2V0dGVyc0FuZFNldHRlcnMnKSxcblx0ZXh0cmFjdE1vbWVudHNGcm9tRGF0ZVRpbWVzOiBTeW1ib2woXG5cdFx0J0RhdGVUaW1lTWV0aG9kRXh0cmFjdE1vbWVudHNGcm9tRGF0ZVRpbWVzJ1xuXHQpLFxuXHRub3JtYWxpemVVbml0TmFtZTogU3ltYm9sKCdEYXRlVGltZU1ldGhvZE5vcm1hbGl6ZVVuaXROYW1lJyksXG5cdG5vcm1hbGl6ZVVuaXRPYmplY3Q6IFN5bWJvbCgnRGF0ZVRpbWVNZXRob2ROb3JtYWxpemVVbml0T2JqZWN0JyksXG5cdG5vcm1hbGl6ZVVuaXRWYWx1ZTogU3ltYm9sKCdEYXRlVGltZU1ldGhvZE5vcm1hbGl6ZVVuaXRWYWx1ZScpLFxuXHRub3JtYWxpemVBcmd1bWVudHM6IFN5bWJvbCgnRGF0ZVRpbWVNZXRob2ROb3JtYWxpemVBcmd1bWVudHMnKSxcbn07XG5cbmNvbnN0IHZhbGlkRGF0ZVRpbWVVbml0cyA9IFtcblx0J3llYXInLFxuXHQnbW9udGgnLFxuXHQnZGF5Jyxcblx0J2hvdXInLFxuXHQnbWludXRlJyxcblx0J3NlY29uZCcsXG5cdCdtaWxsaXNlY29uZCcsXG5dO1xuXG4vKipcbiAqIFRoZSBEYXRlVGltZSB2YWx1ZSBvYmplY3QgcmVwcmVzZW50cyBhIHNpbmdsZSBwb2ludCBpbiB0aW1lLlxuICpcbiAqIEludGVybmFsbHksIHRoZSBEYXRlVGltZSBjbGFzcyBoZXJlIHVzZXMgYG1vbWVudGAuICBUaGlzIGlzIGFuIGFic3RyYWN0aW9uXG4gKiBsb29zZWx5IGZvbGxvd2luZyB0aGUgYWRhcHRlciBwYXR0ZXJuIHNvIHRoYXQgdGhlcmUgaXMgYSBjb21tb24gYXBpIHRoYXRcbiAqIGNhbiBiZSBkZXBlbmRlZCBvbiBpZiBpbiB0aGUgZnV0dXJlIHRoZSBpbnRlcm5hbCBsaWJyYXJ5IGlzIHN3aXRjaGVkIHRvXG4gKiBzb21ldGhpbmcgZGlmZmVyZW50IChzdWNoIGFzIEx1eG9uKS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZVRpbWUge1xuXHQvKipcblx0ICogYmVjYXVzZSBtaW5pZmljYXRpb24gZGVzdHJveXMgY2xhc3MgbmFtZXMgYW5kIHJlbmRlcnMgaW5zdGFuZU9mIHVzZWxlc3Ncblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGRpc3BsYXlOYW1lID0gJ0RhdGVUaW1lJztcblxuXHQvKipcblx0ICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgRGF0ZVRpbWUgY2xhc3Ncblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlzbzg2MDFEYXRlU3RyaW5nXG5cdCAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IHRpbWV6b25lIElmIG51bGwsIHRoZW4gdGltZXpvbmUgaXMgbm90IHNldC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGlzcGxheU5hbWVcblx0ICovXG5cdGNvbnN0cnVjdG9yKFxuXHRcdGlzbzg2MDFEYXRlU3RyaW5nID0gJycsXG5cdFx0dGltZXpvbmUgPSBERUZBVUxUX1RJTUVaT05FX1NUUklORyxcblx0XHRsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSxcblx0XHRkaXNwbGF5TmFtZSA9ICdEYXRlVGltZSdcblx0KSB7XG5cdFx0dGhpcy5kaXNwbGF5TmFtZSA9XG5cdFx0XHRkaXNwbGF5TmFtZSA9PT0gJ0RhdGVUaW1lJyB8fCBkaXNwbGF5TmFtZSA9PT0gJ1NlcnZlckRhdGVUaW1lJ1xuXHRcdFx0XHQ/IGRpc3BsYXlOYW1lXG5cdFx0XHRcdDogJ0RhdGVUaW1lJztcblx0XHRpZiAoaXNvODYwMURhdGVTdHJpbmcgIT09ICcnKSB7XG5cdFx0XHR0aGlzLmNvbnN0cnVjdG9yLmFzc2VydElTTzg2MDFJc1ZhbGlkKGlzbzg2MDFEYXRlU3RyaW5nKTtcblx0XHR9XG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci5hc3NlcnRMb2NhbGVJc1ZhbGlkKGxvY2FsZSk7XG5cdFx0aWYgKHRpbWV6b25lID09PSBudWxsKSB7XG5cdFx0XHR0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lXSA9XG5cdFx0XHRcdGlzbzg2MDFEYXRlU3RyaW5nID09PSAnJ1xuXHRcdFx0XHRcdD8gbW9tZW50LnV0YygpLmxvY2FsZShsb2NhbGUpXG5cdFx0XHRcdFx0OiBtb21lbnQoaXNvODYwMURhdGVTdHJpbmcpXG5cdFx0XHRcdFx0XHRcdC51dGNPZmZzZXQoaXNvODYwMURhdGVTdHJpbmcpXG5cdFx0XHRcdFx0XHRcdC5sb2NhbGUobG9jYWxlKTtcblx0XHR9IGVsc2UgaWYgKHRpbWV6b25lID09PSB0aGlzLmNvbnN0cnVjdG9yLlRJTUVaT05FX0xPQ0FMKSB7XG5cdFx0XHR0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lXSA9XG5cdFx0XHRcdGlzbzg2MDFEYXRlU3RyaW5nID09PSAnJ1xuXHRcdFx0XHRcdD8gbW9tZW50KCkubG9jYWxlKGxvY2FsZSlcblx0XHRcdFx0XHQ6IG1vbWVudChpc284NjAxRGF0ZVN0cmluZykubG9jYWxlKGxvY2FsZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY29uc3RydWN0b3IuYXNzZXJ0VGltZXpvbmVJc1ZhbGlkKHRpbWV6b25lKTtcblx0XHRcdHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWVdID1cblx0XHRcdFx0aXNvODYwMURhdGVTdHJpbmcgPT09ICcnXG5cdFx0XHRcdFx0PyBtb21lbnQoKS50eih0aW1lem9uZSkubG9jYWxlKGxvY2FsZSlcblx0XHRcdFx0XHQ6IG1vbWVudC50eihpc284NjAxRGF0ZVN0cmluZywgdGltZXpvbmUpLmxvY2FsZShsb2NhbGUpO1xuXHRcdH1cblx0XHR0aGlzW3ByaXZhdGVNZXRob2RzLmNyZWF0ZUdldHRlcnNBbmRTZXR0ZXJzXSgpO1xuXHRcdE9iamVjdC5mcmVlemUodGhpcyk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoZSBnaXZlbiBsb2NhbGUgaXMgYSB2YWxpZCBsb2NhbGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBtZWFucyBpdCBpcyB2YWxpZFxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlTG9jYWxlKGxvY2FsZSkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlTG9jYWxlKGxvY2FsZSk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyBpZiB0aGUgZ2l2ZW4gbG9jYWxlIGlzIHZhbGlkIGFuZCB0aHJvd3MgYW4gZXJyb3IgaWYgbm90LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEB0aHJvd3MgSW52YWxpZExvY2FsZVxuXHQgKi9cblx0c3RhdGljIGFzc2VydExvY2FsZUlzVmFsaWQobG9jYWxlKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRMb2NhbGVJc1ZhbGlkKGxvY2FsZSk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoZSBnaXZlbiBJU084NjAxIHN0cmluZyBpcyB2YWxpZC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUaW1lU3RyaW5nXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgbWVhbnMgaXQgaXMgdmFsaWQuXG5cdCAqL1xuXHRzdGF0aWMgdmFsaWRhdGVJU084NjAxKGRhdGVUaW1lU3RyaW5nKSB7XG5cdFx0cmV0dXJuIGFzc2VydGlvbnMudmFsaWRhdGVJU084NjAxKGRhdGVUaW1lU3RyaW5nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIGlmIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSB2YWxpZCBJU08gODYwMSBzdHJpbmcuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVGltZVN0cmluZ1xuXHQgKiBAdGhyb3dzIEludmFsaWRJU084NjAxU3RyaW5nXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SVNPODYwMUlzVmFsaWQoZGF0ZVRpbWVTdHJpbmcpIHtcblx0XHRhc3NlcnRpb25zLmFzc2VydElTTzg2MDFJc1ZhbGlkKGRhdGVUaW1lU3RyaW5nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIHRpbWV6b25lXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIHZhbGlkYXRlVGltZXpvbmUodGltZXpvbmUpIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZVRpbWV6b25lKHRpbWV6b25lKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIHN0cmluZyBpcyBhIHZhbGlkIHRpbWV6b25lIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRpbWV6b25lXG5cdCAqIEB0aHJvd3MgSW52YWxpZFRpbWV6b25lXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0VGltZXpvbmVJc1ZhbGlkKHRpbWV6b25lKSB7XG5cdFx0YXNzZXJ0aW9ucy5hc3NlcnRUaW1lem9uZUlzVmFsaWQodGltZXpvbmUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIG9mZnNldFxuXHQgKlxuXHQgKiBDdXJyZW50bHkgdGhpcyBqdXN0IHZhbGlkYXRlcyB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSBudW1iZXIuIEV2ZW50dWFsbHkgaXRcblx0ICogbWlnaHQgY2hlY2sgdXBwZXIgYW5kIGxvd2VyIGxpbWl0cy5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgdHJ1ZSBtZWFucyBpdHMgdmFsaWQuXG5cdCAqL1xuXHRzdGF0aWMgdmFsaWRhdGVJc09mZnNldChvZmZzZXQpIHtcblx0XHRyZXR1cm4gYXNzZXJ0aW9ucy52YWxpZGF0ZUlzT2Zmc2V0KG9mZnNldCk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIG9mZnNldC5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKi9cblx0c3RhdGljIGFzc2VydElzT2Zmc2V0KG9mZnNldCkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0SXNPZmZzZXQob2Zmc2V0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICpcblx0ICogQHBhcmFtIHtEYXRlVGltZX0gZGF0ZXRpbWVcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gcmV0dXJucyB0cnVlIGlmIGl0IGlzIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgdmFsaWRhdGVJc0RhdGVUaW1lKGRhdGV0aW1lKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdGluc3RhbmNlT2YoZGF0ZXRpbWUsICdEYXRlVGltZScpIHx8XG5cdFx0XHRpbnN0YW5jZU9mKGRhdGV0aW1lLCAnU2VydmVyRGF0ZVRpbWUnKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBkYXRldGltZVxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKi9cblx0c3RhdGljIGFzc2VydElzRGF0ZVRpbWUoZGF0ZXRpbWUpIHtcblx0XHRpZiAoIXRoaXMudmFsaWRhdGVJc0RhdGVUaW1lKGRhdGV0aW1lKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWUnXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGphdmFzY3JpcHQgRGF0ZVxuXHQgKiBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoZSB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlXG5cdCAqL1xuXHRzdGF0aWMgdmFsaWRhdGVJc0RhdGUoZGF0ZSkge1xuXHRcdHJldHVybiBhc3NlcnRpb25zLnZhbGlkYXRlSXNEYXRlKGRhdGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNEYXRlKGRhdGUpIHtcblx0XHRhc3NlcnRpb25zLmFzc2VydElzRGF0ZShkYXRlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWUgYW5kIGlzXG5cdCAqIGEgXCJ2YWxpZFwiIGRhdGV0aW1lIChtZWFuaW5nIHRoZSBpbnN0YW5jZSB3YXMgY29uc3RydWN0ZWQgd2l0aCB2YWxpZFxuXHQgKiBhcmd1bWVudHMpLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBkYXRldGltZVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIGlzVmFsaWQoZGF0ZXRpbWUpIHtcblx0XHRyZXR1cm4gdGhpcy52YWxpZGF0ZUlzRGF0ZVRpbWUoZGF0ZXRpbWUpICYmIGRhdGV0aW1lLmlzVmFsaWQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lIGFuZCBpc1xuXHQgKiBhIFwidmFsaWRcIiBkYXRldGltZSAobWVhbmluZyB0aGUgaW5zdGFuY2Ugd2FzIGNvbnN0cnVjdGVkIHdpdGggdmFsaWRcblx0ICogYXJndW1lbnRzKVxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBkYXRldGltZVxuXHQgKiBAdGhyb3dzIEludmFsaWREYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGFzc2VydElzVmFsaWQoZGF0ZXRpbWUpIHtcblx0XHRpZiAoIXRoaXMuaXNWYWxpZChkYXRldGltZSkpIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkRGF0ZVRpbWUoZGF0ZXRpbWUpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBbcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplQXJndW1lbnRzXShkYXRlVmFsdWUsIHRpbWV6b25lLCBsb2NhbGUpIHtcblx0XHRyZXR1cm4gW2RhdGVWYWx1ZSwgdGltZXpvbmUsIGxvY2FsZV07XG5cdH1cblxuXHQvKipcblx0ICogQSBwcml2YXRlIGludGVybmFsIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGV4dHJhY3QgYWxsIG1vbWVudFxuXHQgKiBpbnN0YW5jZXMgZnJvbSB0aGUgcHJvdmlkZWQgRGF0ZVRpbWVzIChwYXNzZWQgaW4gYXMgYXJndW1lbnRzKS5cblx0ICpcblx0ICogQHBhcmFtIHsuLi5EYXRlVGltZX0gZGF0ZXRpbWVzXG5cdCAqIEByZXR1cm4ge01vbWVudFtdfSBBbiBhcnJheSBvZiBtb21lbnQgaW5zdGFuY2VzIGV4dHJhY3RlZCBmcm9tIHRoZVxuXHQgKiBEYXRlVGltZXNcblx0ICovXG5cdHN0YXRpYyBbcHJpdmF0ZU1ldGhvZHMuZXh0cmFjdE1vbWVudHNGcm9tRGF0ZVRpbWVzXSguLi5kYXRldGltZXMpIHtcblx0XHRyZXR1cm4gZGF0ZXRpbWVzLm1hcCgoZGF0ZXRpbWUpID0+IHtcblx0XHRcdHRoaXMuYXNzZXJ0SXNEYXRlVGltZShkYXRldGltZSk7XG5cdFx0XHRyZXR1cm4gZGF0ZXRpbWVbcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWVdO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdpdmVuIGFuIGluZGVmaW5pdGUgbnVtYmVyIG9mIERhdGVUaW1lcyBhcyBhcmd1bWVudHMsIHRoaXMgd2lsbCByZXR1cm4gYVxuXHQgKiBuZXcgRGF0ZVRpbWUgdGhhdCByZXByZXNlbnRzIHRoZSBsYXRlc3QgcG9pbnQgaW4gdGltZS5cblx0ICpcblx0ICogQHBhcmFtIHsuLi5EYXRlVGltZX0gZGF0ZXRpbWVzXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBIG5ldyBEYXRlVGltZSByZXByZXNlbnRpbmcgdGhlIGxhdGVzdCBwb2ludCBvZiB0aW1lLlxuXHQgKi9cblx0c3RhdGljIG1heCguLi5kYXRldGltZXMpIHtcblx0XHRyZXR1cm4gdGhpcy5mcm9tTW9tZW50KFxuXHRcdFx0bW9tZW50Lm1heChcblx0XHRcdFx0dGhpc1twcml2YXRlTWV0aG9kcy5leHRyYWN0TW9tZW50c0Zyb21EYXRlVGltZXNdKC4uLmRhdGV0aW1lcylcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdpdmVuIGFuIGluZGVmaW5pdGUgbnVtYmVyIG9mIERhdGVUaW1lcyBhcyBhcmd1bWVudHMsIHRoaXMgd2lsbCByZXR1cm4gYVxuXHQgKiBuZXcgRGF0ZVRpbWUgdGhhdCByZXByZXNlbnRzIHRoZSBlYXJsaWVzdCBwb2ludCBpbiB0aW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0gey4uLkRhdGVUaW1lfSBkYXRldGltZXNcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEEgbmV3IERhdGVUaW1lIHJlcHJlc2VudGluZyB0aGUgZWFybGllc3QgcG9pbnQgaW5cblx0ICogdGltZS5cblx0ICovXG5cdHN0YXRpYyBtaW4oLi4uZGF0ZXRpbWVzKSB7XG5cdFx0cmV0dXJuIHRoaXMuZnJvbU1vbWVudChcblx0XHRcdG1vbWVudC5taW4oXG5cdFx0XHRcdHRoaXNbcHJpdmF0ZU1ldGhvZHMuZXh0cmFjdE1vbWVudHNGcm9tRGF0ZVRpbWVzXSguLi5kYXRldGltZXMpXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBpbnN0YW5jZSBvZiBtb21lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bW9tZW50fSBtb21lbnRJbnN0YW5jZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tTW9tZW50KG1vbWVudEluc3RhbmNlKSB7XG5cdFx0aWYgKCFtb21lbnQuaXNNb21lbnQobW9tZW50SW5zdGFuY2UpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdSZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBtb21lbnQuJyk7XG5cdFx0fVxuXG5cdFx0Ly8gdGhpcyB3b3VsZCBhY2NvdW50IGZvciBjbGllbnQgY29kZSB0aGF0IGlzIHVzaW5nIGBtb21lbnRgIGJ1dCBub3Rcblx0XHQvLyB1c2luZyBgbW9tZW50LXRpbWV6b25lYC5cblx0XHRyZXR1cm4gaXNGdW5jdGlvbihtb21lbnRJbnN0YW5jZS50eikgJiZcblx0XHRcdCFpc1VuZGVmaW5lZChtb21lbnRJbnN0YW5jZS50eigpKSAmJlxuXHRcdFx0bW9tZW50SW5zdGFuY2UudHooKSAhPT0gJ1VUQydcblx0XHRcdD8gbmV3IHRoaXMoXG5cdFx0XHRcdFx0bW9tZW50SW5zdGFuY2UudG9JU09TdHJpbmcoKSxcblx0XHRcdFx0XHRtb21lbnRJbnN0YW5jZS50eigpLFxuXHRcdFx0XHRcdG1vbWVudEluc3RhbmNlLmxvY2FsZSgpXG5cdFx0XHQgIClcblx0XHRcdDogbmV3IHRoaXMoXG5cdFx0XHRcdFx0bW9tZW50SW5zdGFuY2UudG9JU09TdHJpbmcodHJ1ZSksXG5cdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRtb21lbnRJbnN0YW5jZS5sb2NhbGUoKVxuXHRcdFx0ICApO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGFuIElTTyA4NjAxIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IElTT1N0cmluZ1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGltZXpvbmVcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tSVNPKFxuXHRcdElTT1N0cmluZyxcblx0XHR0aW1lem9uZSA9IERFRkFVTFRfVElNRVpPTkVfU1RSSU5HLFxuXHRcdGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFXG5cdCkge1xuXHRcdGlmIChpc0VtcHR5KElTT1N0cmluZykpIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkSVNPODYwMVN0cmluZyhJU09TdHJpbmcpO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IHRoaXMoSVNPU3RyaW5nLCB0aW1lem9uZSwgbG9jYWxlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgZnJvbSBhbiBJU08gODYwMSBTdHJpbmdcblx0ICogRGlmZmVycyB3aXRoIGBmcm9tSVNPYCBpbiB0aGF0IHRoaXMgYWxsb3dzIHBhc3NpbmcgYSBvZmZzZXQgdmFsdWVcblx0ICogaW5zdGVhZCBvZiBhIHRpbWV6b25lIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IElTT1N0cmluZ1xuXHQgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0ICBJbiBtaW51dGVzIHVubGVzcyA+IC0xNiBvciA8IC0xNiBpbiB3aGljaCBjYXNlIGl0XG5cdCAqIGlzIHRyZWF0ZWQgYXMgaG91cnMuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9ICBBbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGZyb21JU09XaXRoT2Zmc2V0KFxuXHRcdElTT1N0cmluZyxcblx0XHRvZmZzZXQgPSBERUZBVUxUX09GRlNFVCxcblx0XHRsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRVxuXHQpIHtcblx0XHR0aGlzLmFzc2VydElTTzg2MDFJc1ZhbGlkKElTT1N0cmluZyk7XG5cdFx0dGhpcy5hc3NlcnRJc09mZnNldChvZmZzZXQpO1xuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZChsb2NhbGUpO1xuXHRcdGNvbnN0IGRhdGV0aW1lID0gbW9tZW50XG5cdFx0XHQudXRjKElTT1N0cmluZylcblx0XHRcdC51dGNPZmZzZXQob2Zmc2V0LCB0cnVlKVxuXHRcdFx0LmxvY2FsZShsb2NhbGUpO1xuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQoZGF0ZXRpbWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGEgamF2YXNjcmlwdCBEYXRlIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgZnJvbUpTRGF0ZShcblx0XHRkYXRlLFxuXHRcdHRpbWV6b25lID0gREVGQVVMVF9USU1FWk9ORV9TVFJJTkcsXG5cdFx0bG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEVcblx0KSB7XG5cdFx0dGhpcy5hc3NlcnRJc0RhdGUoZGF0ZSk7XG5cdFx0dGhpcy5hc3NlcnRUaW1lem9uZUlzVmFsaWQodGltZXpvbmUpO1xuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZChsb2NhbGUpO1xuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQobW9tZW50KGRhdGUpLnR6KHRpbWV6b25lKS5sb2NhbGUobG9jYWxlKSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGV0aW1lIGZyb20gYSBqYXZhc2NyaXB0IERhdGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBUaGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoaXMgYW5kIGZyb21KU0RhdGUgaXMgdGhhdCB0aGlzIGNhbiBiZSBzZXQgd2l0aFxuXHQgKiBhbiBvZmZzZXQgdnMgYSB0aW1lem9uZSBzdHJpbmcuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxuXHQgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHN0YXRpYyBmcm9tSlNEYXRlV2l0aE9mZnNldChcblx0XHRkYXRlLFxuXHRcdG9mZnNldCA9IERFRkFVTFRfT0ZGU0VULFxuXHRcdGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFXG5cdCkge1xuXHRcdHRoaXMuYXNzZXJ0SXNEYXRlKGRhdGUpO1xuXHRcdHRoaXMuYXNzZXJ0SXNPZmZzZXQob2Zmc2V0KTtcblx0XHR0aGlzLmFzc2VydExvY2FsZUlzVmFsaWQobG9jYWxlKTtcblx0XHRyZXR1cm4gdGhpcy5mcm9tTW9tZW50KG1vbWVudChkYXRlKS51dGNPZmZzZXQob2Zmc2V0KS5sb2NhbGUobG9jYWxlKSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIChpbiBVVEMpIHdpdGggbWlsbGlzZWNvbmRzIGZyb20gZXBvY2guXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBtaWxsaXNlY29uZHNcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKi9cblx0c3RhdGljIGZyb21NaWxsaXNlY29uZHMobWlsbGlzZWNvbmRzLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSkge1xuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZChsb2NhbGUpO1xuXHRcdGlmICghaXNOdW1iZXIobWlsbGlzZWNvbmRzKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1Byb3ZpZGVkIHZhbHVlIG11c3QgYmUgYSBudW1iZXIgJyArXG5cdFx0XHRcdFx0J3JlcHJlc2VudGluZyBtaWxsaXNlY29uZHMgZnJvbSB0aGUgZXBvY2gnXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5mcm9tTW9tZW50KG1vbWVudChtaWxsaXNlY29uZHMpLnV0YygpLmxvY2FsZShsb2NhbGUpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGEgRGF0ZVRpbWUgaW4gVVRDIHdpdGggc2Vjb25kcyBmcm9tIHRoZSBlcG9jaC5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IHNlY29uZHNcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQW4gaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBmcm9tVW5peChzZWNvbmRzLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSkge1xuXHRcdHRoaXMuYXNzZXJ0TG9jYWxlSXNWYWxpZChsb2NhbGUpO1xuXHRcdGlmICghaXNOdW1iZXIoc2Vjb25kcykpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdQcm92aWRlZCB2YWx1ZSBtdXN0IGJlIGEgbnVtYmVyICcgK1xuXHRcdFx0XHRcdCdyZXByZXNlbnRpbmcgc2Vjb25kcyBmcm9tIHRoZSBlcG9jaCdcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQobW9tZW50LnVuaXgoc2Vjb25kcykudXRjKCkubG9jYWxlKGxvY2FsZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGFuIG9iamVjdCBvZiB2YWx1ZXMgYXNzdW1pbmcgaXRzIGluIFwibG9jYWxcIlxuXHQgKiB0aW1lIChpZiBydW4gdmlhIGJyb3dzZXIgb3Igc2VydmVyIGlmIHJ1biBzZXJ2ZXIgc2lkZSkuXG5cdCAqXG5cdCAqIFRoZSBvYmplY3QgaXMgZXhwZWN0ZWQgdG8gYmUgYSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGluc3RhbmNlIGluIHRpbWU6XG5cdCAqIEVnLlxuXHQgKiB7IHllYXI6IDIwMTgsIG1vbnRoOiAxMiwgZGF5OiAyNSwgaG91cjogMCwgbWludXRlOiAxNSwgc2Vjb25kczogMCB9XG5cdCAqXG5cdCAqIFBhc3MgYW4gZW1wdHkgdmFsdWVzIHZhbHVlIGlmIHlvdSB3YW50IHRoZSBpbnN0YW5jZSBpbiB0aW1lIHRvIHJlcHJlc2VudFxuXHQgKiBcIm5vd1wiLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEB0aHJvd3MgSW52YWxpZEFyZ3VtZW50XG5cdCAqL1xuXHRzdGF0aWMgZnJvbUxvY2FsKHZhbHVlcywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUpIHtcblx0XHR0aGlzLmFzc2VydExvY2FsZUlzVmFsaWQobG9jYWxlKTtcblx0XHR2YWx1ZXMgPSB0aGlzW3ByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRPYmplY3RdKHZhbHVlcyk7XG5cdFx0Y29uc3QgZGF0ZXRpbWUgPSBpc0VtcHR5KHZhbHVlcylcblx0XHRcdD8gbW9tZW50KCkubG9jYWxlKGxvY2FsZSlcblx0XHRcdDogbW9tZW50KHZhbHVlcykubG9jYWxlKGxvY2FsZSk7XG5cdFx0aWYgKGRhdGV0aW1lLmlzVmFsaWQoKSAhPT0gdHJ1ZSkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudChcblx0XHRcdFx0J0RvdWJsZS1jaGVjayB0aGUgdmFsdWVzIHlvdSBzZW50IGluLicsXG5cdFx0XHRcdHZhbHVlc1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuZnJvbU1vbWVudChkYXRldGltZSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0cyBhIERhdGVUaW1lIGZyb20gYW4gb2JqZWN0IG9mIHZhbHVlcyBhbmQgYXNzdW1lcyBpdHMgaW5cblx0ICogJ1VUQycuXG5cdCAqXG5cdCAqIFRoZSBvYmplY3QgaXMgZXhwZWN0ZWQgdG8gYmUgYSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGluc3RhbmNlIGluIHRpbWU6XG5cdCAqIEVnLlxuXHQgKiB7IHllYXI6IDIwMTgsIG1vbnRoOiAxMiwgZGF5OiAyNSwgaG91cjogMCwgbWludXRlOiAxNSwgc2Vjb25kczogMCB9XG5cdCAqXG5cdCAqIEFueSB1bml0cyBub3Qgc3BlY2lmaWVkIHdpbGwgYmUgYXNzdW1lZCB0byBiZSBgMGAuXG5cdCAqXG5cdCAqIFBhc3MgYW4gZW1wdHkgdmFsdWVzIHZhbHVlIGlmIHlvdSB3YW50IHRoZSBpbnN0YW5jZSBpbiB0aW1lIHRvIHJlcHJlc2VudFxuXHQgKiBcIm5vd1wiLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqIEB0aHJvd3MgSW52YWxpZEFyZ3VtZW50XG5cdCAqL1xuXHRzdGF0aWMgdXRjKHZhbHVlcywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUpIHtcblx0XHR0aGlzLmFzc2VydExvY2FsZUlzVmFsaWQobG9jYWxlKTtcblx0XHR2YWx1ZXMgPSB0aGlzW3ByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRPYmplY3RdKHZhbHVlcyk7XG5cdFx0Y29uc3QgZGF0ZXRpbWUgPSBpc0VtcHR5KHZhbHVlcylcblx0XHRcdD8gbW9tZW50LnV0YygpLmxvY2FsZShsb2NhbGUpXG5cdFx0XHQ6IG1vbWVudC51dGModmFsdWVzKS5sb2NhbGUobG9jYWxlKTtcblx0XHRpZiAoZGF0ZXRpbWUuaXNWYWxpZCgpICE9PSB0cnVlKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50KFxuXHRcdFx0XHQnRG91YmxlLWNoZWNrIHRoZSB2YWx1ZXMgc2VudCBpbi4nLFxuXHRcdFx0XHR2YWx1ZXNcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQoZGF0ZXRpbWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdHMgYSBEYXRlVGltZSBmcm9tIGEgY29uZmlndXJhdGlvbiBvYmplY3QuXG5cdCAqXG5cdCAqIFRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBjYW4gaGF2ZTpcblx0ICogLSBhbnkgb2YgdGhlIERhdGVUaW1lIHVuaXRzICgneWVhcicsICdtb250aCcsIGV0Yylcblx0ICogLSAnbG9jYWxlJyBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGxvY2FsZVxuXHQgKiAtICd0aW1lem9uZScgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB0aW1lem9uZVxuXHQgKiAtICdvZmZzZXQnIGEgbnVtYmVyIHJlcHJlc2VudGluZyB0aGUgb2Zmc2V0IGZyb20gVVRDIHRoaXMgaW5zdGFuY2UgaW5cblx0ICogdGltZSByZXByZXNlbnRzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBbiBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c3RhdGljIGZyb21PYmplY3QodmFsdWVzKSB7XG5cdFx0Y29uc3QgbG9jYWxlID0gdmFsdWVzLmxvY2FsZSB8fCBERUZBVUxUX1ZBTElEX0xPQ0FMRTtcblx0XHRjb25zdCB0aW1lem9uZSA9IHZhbHVlcy50aW1lem9uZSB8fCBERUZBVUxUX1RJTUVaT05FX1NUUklORztcblx0XHRjb25zdCBvZmZzZXQgPSBpc1VuZGVmaW5lZCh2YWx1ZXMub2Zmc2V0KSA/IG51bGwgOiB2YWx1ZXMub2Zmc2V0O1xuXHRcdGxldCB2YWx1ZXNGb3JDb25zdHJ1Y3QgPSBvbWl0KHZhbHVlcywgWydsb2NhbGUnLCAndGltZXpvbmUnLCAnb2Zmc2V0J10pO1xuXG5cdFx0dGhpcy5hc3NlcnRMb2NhbGVJc1ZhbGlkKGxvY2FsZSk7XG5cblx0XHRpZiAob2Zmc2V0ICE9PSBudWxsKSB7XG5cdFx0XHR0aGlzLmFzc2VydElzT2Zmc2V0KG9mZnNldCk7XG5cdFx0XHR2YWx1ZXNGb3JDb25zdHJ1Y3QgPVxuXHRcdFx0XHR0aGlzW3ByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRPYmplY3RdKHZhbHVlc0ZvckNvbnN0cnVjdCk7XG5cdFx0XHRjb25zdCBkYXRldGltZSA9IGlzRW1wdHkodmFsdWVzRm9yQ29uc3RydWN0KVxuXHRcdFx0XHQ/IG1vbWVudCgpLnV0Y09mZnNldChvZmZzZXQsIHRydWUpLmxvY2FsZShsb2NhbGUpXG5cdFx0XHRcdDogbW9tZW50XG5cdFx0XHRcdFx0XHQudXRjKHZhbHVlc0ZvckNvbnN0cnVjdClcblx0XHRcdFx0XHRcdC51dGNPZmZzZXQob2Zmc2V0LCB0cnVlKVxuXHRcdFx0XHRcdFx0LmxvY2FsZShsb2NhbGUpO1xuXHRcdFx0aWYgKGRhdGV0aW1lLmlzVmFsaWQoKSAhPT0gdHJ1ZSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50KFxuXHRcdFx0XHRcdCdEb3VibGUtY2hlY2sgdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNlbnQgaW4uJyxcblx0XHRcdFx0XHR2YWx1ZXNcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLmZyb21Nb21lbnQoZGF0ZXRpbWUpO1xuXHRcdH1cblxuXHRcdGlmICh0aW1lem9uZSA9PT0gdGhpcy5USU1FWk9ORV9MT0NBTCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZnJvbUxvY2FsKHZhbHVlc0ZvckNvbnN0cnVjdCwgbG9jYWxlKTtcblx0XHR9XG5cblx0XHR0aGlzLmFzc2VydFRpbWV6b25lSXNWYWxpZCh0aW1lem9uZSk7XG5cblx0XHR2YWx1ZXNGb3JDb25zdHJ1Y3QgPVxuXHRcdFx0dGhpc1twcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0T2JqZWN0XSh2YWx1ZXNGb3JDb25zdHJ1Y3QpO1xuXHRcdGNvbnN0IGRhdGV0aW1lID0gbW9tZW50LnR6KHZhbHVlc0ZvckNvbnN0cnVjdCwgdGltZXpvbmUpLmxvY2FsZShsb2NhbGUpO1xuXHRcdGlmIChkYXRldGltZS5pc1ZhbGlkKCkgIT09IHRydWUpIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnQoXG5cdFx0XHRcdCdEb3VibGUtY2hlY2sgdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNlbnQgaW4uJyxcblx0XHRcdFx0dmFsdWVzXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5mcm9tTW9tZW50KGRhdGV0aW1lKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb21lbnQgdXNlcyBkaWZmZXJlbnQgbmFtZXMgZm9yIHNvbWUgdW5pdCBnZXR0ZXJzL3NldHRlcnMvcHJvcGVydGllcyBzb1xuXHQgKiB0aGlzIGlzIHVzZWQgdG8gbm9ybWFsaXplIGEgZ2l2ZW4gdW5pdCBuYW1lIHRvIHdoYXQgbW9tZW50IHVzZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lVG9Ob3JtYWxpemVcblx0ICogQHJldHVybiB7c3RyaW5nfSAgTm9ybWFsaXplZCB1bml0IG5hbWUuXG5cdCAqL1xuXHRzdGF0aWMgW3ByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXROYW1lXShuYW1lVG9Ob3JtYWxpemUpIHtcblx0XHRjb25zdCBtYXAgPSB7XG5cdFx0XHRkYXk6ICdkYXRlJyxcblx0XHRcdGRheXM6ICdkYXknLFxuXHRcdFx0ZGF0ZTogJ2RheScsXG5cdFx0XHR5ZWFyczogJ3llYXInLFxuXHRcdFx0bW9udGhzOiAnbW9udGgnLFxuXHRcdFx0bWlsbGlzZWNvbmRzOiAnbWlsbGlzZWNvbmQnLFxuXHRcdFx0bWludXRlczogJ21pbnV0ZScsXG5cdFx0XHRzZWNvbmRzOiAnc2Vjb25kJyxcblx0XHRcdGhvdXJzOiAnaG91cicsXG5cdFx0fTtcblx0XHRyZXR1cm4gbWFwW25hbWVUb05vcm1hbGl6ZV0gPyBtYXBbbmFtZVRvTm9ybWFsaXplXSA6IG5hbWVUb05vcm1hbGl6ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIG5vcm1hbGl6aW5nIHVuaXQgdmFsdWVzIGZvciBpbnRlcm5hbCBsaWJyYXJ5IHVzZS5cblx0ICpcblx0ICogRm9yIGV4YW1wbGUsIG1vbWVudCB6ZXJvIGluZGV4ZXMgbW9udGhzLiBEYXRlVGltZSBkb2VzIG5vdCwgc28gdGhpc1xuXHQgKiBtZXRob2QgaGVscHMgd2l0aCBub3JtYWxpemluZyBtb250aCB2YWx1ZXMgZm9yIGJvdGggc2V0dGluZyAodXNlZCBieVxuXHQgKiBtb21lbnQpIGFuZCBnZXR0aW5nIChyZXR1cm5lZCB0byBjbGllbnQpLiAgVGhpcyBhbGxvd3MgY2xpZW50IGNvZGVcblx0ICogdG8gZXhwZWN0IG1vbnRocyBpbiBEYXRlVGltZSB0byBiZSBoYW5kbGVkIHdpdGggYSBub24temVybyBpbmRleC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHVuaXQgVGhlIHVuaXQgdG8gYmUgbm9ybWFsaXplZFxuXHQgKiBAcGFyYW0ge21peGVkfSAgdmFsdWUgVGhlIHZhbHVlIGZvciB0aGF0IHVuaXRcblx0ICogQHBhcmFtIHtib29sZWFufSBzZXQgIFdoZXRoZXIgdGhpcyBzaG91bGQgbm9ybWFsaXplIGZvciBzZXR0aW5nIG9yXG5cdCAqIGdldHRpbmcuXG5cdCAqIEByZXR1cm4ge21peGVkfSAgVGhlIG5vcm1hbGl6ZWQgdmFsdWUuXG5cdCAqL1xuXHRzdGF0aWMgW3ByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRWYWx1ZV0odW5pdCwgdmFsdWUsIHNldCA9IHRydWUpIHtcblx0XHRpZiAodW5pdCA9PT0gJ21vbnRoJykge1xuXHRcdFx0dmFsdWUgPSBzZXQgPyB2YWx1ZSAtIDEgOiB2YWx1ZSArIDE7XG5cdFx0fVxuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHaXZlbiBhIHNpbXBsZSBvYmplY3QgY29udGFpbmluZyB1bml0cywgdGhpcyBub3JtYWxpemVzIHRoZSBvYmplY3QgdG9cblx0ICogd2hhdCBtb21lbnQgcmVjb2duaXplcy5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHNldE9iamVjdFxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNldCAgdHJ1ZSBpZiBzZXR0aW5nIHRoZSBvYmplY3QsIGZhbHNlIGlmIGdldHRpbmcgdGhlXG5cdCAqIG9iamVjdFxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBub3JtYWxpemVkIG9iamVjdC5cblx0ICovXG5cdHN0YXRpYyBbcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE9iamVjdF0oc2V0T2JqZWN0LCBzZXQgPSB0cnVlKSB7XG5cdFx0aWYgKCFpc09iamVjdChzZXRPYmplY3QpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgaW5jb21pbmcgdmFsdWUgbXVzdCBiZSBhbiBvYmplY3QnKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlZHVjZShcblx0XHRcdHNldE9iamVjdCxcblx0XHRcdChyZXN1bHQsIHZhbHVlLCBrZXkpID0+IHtcblx0XHRcdFx0a2V5ID0gdGhpc1twcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0TmFtZV0oa2V5KTtcblx0XHRcdFx0cmVzdWx0W2tleV0gPSB0aGlzW3ByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRWYWx1ZV0oXG5cdFx0XHRcdFx0a2V5LFxuXHRcdFx0XHRcdHZhbHVlLFxuXHRcdFx0XHRcdHNldFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdHt9XG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBkYXRlIGFuZCB0aW1lIHVuaXQgbmFtZXNcblx0ICpcblx0ICogQHJldHVybiB7c3RyaW5nW119IEFuIGFycmF5IG9mIHVuaXQgbmFtZXNcblx0ICovXG5cdFtwcml2YXRlTWV0aG9kcy5nZXRVbml0TmFtZXNdKCkge1xuXHRcdHJldHVybiB2YWxpZERhdGVUaW1lVW5pdHM7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyB0aGUgdmFyaW91cyBnZXR0ZXIgYW5kIHNldHRlcnMgZm9yIHRoZSB2YWx1ZSBvYmplY3QuXG5cdCAqL1xuXHRbcHJpdmF0ZU1ldGhvZHMuY3JlYXRlR2V0dGVyc0FuZFNldHRlcnNdKCkge1xuXHRcdHRoaXNbcHJpdmF0ZU1ldGhvZHMuZ2V0VW5pdE5hbWVzXSgpLmZvckVhY2goKHVuaXROYW1lKSA9PiB7XG5cdFx0XHQvLyBjcmVhdGVzIGFjY2Vzc29yIGZvciBnZXR0aW5nIHRoZSB1bml0IHZhbHVlIHZpYSBhXG5cdFx0XHQvLyBwcm9wZXJ0eSAoZWcuIGluc3RhbmNlLmhvdXIpXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgdW5pdE5hbWUsIHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdGNvbnN0IG1ldGhvZE5hbWUgPVxuXHRcdFx0XHRcdFx0dGhpcy5jb25zdHJ1Y3Rvcltwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0TmFtZV0oXG5cdFx0XHRcdFx0XHRcdHVuaXROYW1lXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGNvbnN0IHVuaXRWYWx1ZSA9XG5cdFx0XHRcdFx0XHR0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lXVttZXRob2ROYW1lXSgpO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yW3ByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRWYWx1ZV0oXG5cdFx0XHRcdFx0XHR1bml0TmFtZSxcblx0XHRcdFx0XHRcdHVuaXRWYWx1ZSxcblx0XHRcdFx0XHRcdGZhbHNlXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXHRcdFx0Ly8gY3JlYXRlcyBhIGZsdWVudCBzZXR0ZXIgZm9yIHRoZSB2YWx1ZS5cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnc2V0JyArIGNhcGl0YWxpemUodW5pdE5hbWUpLCB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zZXQoeyBbdW5pdE5hbWVdOiB2YWx1ZSB9KTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogVXNlZCB0byBzZXQgdmFyaW91cyBwYXJ0cyBvZiB0aGUgZGF0ZXRpbWUgc3RyaW5nIGFuZCByZXR1cm5zIGEgTkVXXG5cdCAqIGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqXG5cdCAqIE5vdGU6IHRoaXMgd2lsbCBjb25zdHJ1Y3QgYSBEYXRlVGltZSBldmVuIHdpdGggaW52YWxpZCB1bml0cy4gTWFrZSB1c2Ugb2Zcblx0ICogYGlzVmFsaWQoKWAgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGluc3RhbmNlIGlzIGEgdmFsaWQgRGF0ZVRpbWUgb3Igbm90LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3t9fSBzZXRPYmplY3QgQW4gb2JqZWN0IHdoZXJlIGtleXMgYXJlIHRoZSB1bml0cy5cblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lLlxuXHQgKi9cblx0c2V0KHNldE9iamVjdCA9IHt9KSB7XG5cdFx0c2V0T2JqZWN0ID1cblx0XHRcdHRoaXMuY29uc3RydWN0b3JbcHJpdmF0ZU1ldGhvZHMubm9ybWFsaXplVW5pdE9iamVjdF0oc2V0T2JqZWN0KTtcblx0XHRyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IoXG5cdFx0XHR0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lXVxuXHRcdFx0XHQuY2xvbmUoKVxuXHRcdFx0XHQuc2V0KHNldE9iamVjdClcblx0XHRcdFx0LnRvSVNPU3RyaW5nKCksXG5cdFx0XHR0aGlzLnRpbWV6b25lLFxuXHRcdFx0dGhpcy5sb2NhbGVcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFjY2Vzc29yIGZvciB0aGUgdGltZXpvbmUgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB0aW1lem9uZSBzdHJpbmdcblx0ICovXG5cdGdldCB0aW1lem9uZSgpIHtcblx0XHRyZXR1cm4gdGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0udHooKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGbHVlbnQgc2V0dGVyIGZvciB0aGUgdGltZXpvbmUgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c2V0VGltZXpvbmUodGltZXpvbmUpIHtcblx0XHR0aGlzLmNvbnN0cnVjdG9yLmFzc2VydFRpbWV6b25lSXNWYWxpZCh0aW1lem9uZSk7XG5cdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKFxuXHRcdFx0dGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0udG9JU09TdHJpbmcoKSxcblx0XHRcdHRpbWV6b25lLFxuXHRcdFx0dGhpcy5sb2NhbGVcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGZvciB0aGUgbW9udGggc2V0IGluIHRoaXMgaW5zdGFuY2UuXG5cdCAqXG5cdCAqIEByZXR1cm4ge251bWJlcn0gIFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbW9udGguXG5cdCAqL1xuXHRnZXQgZGF5c0luTW9udGgoKSB7XG5cdFx0cmV0dXJuIHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWVdLmRheXNJbk1vbnRoKCk7XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgY3VycmVudCBpbnN0YW5jZSBpbiB0aW1lIGlzIGN1cnJlbnRseSBpbiBEYXlsaWdodCBTYXZpbmdzXG5cdCAqIFRpbWUuXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgaXQgaXMgY3VycmVudGx5IGluIERheWxpZ2h0IFNhdmluZ3MgVGltZS5cblx0ICovXG5cdGdldCBpc0luRFNUKCkge1xuXHRcdHJldHVybiB0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lXS5pc0RTVCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGN1cnJlbnQgaW5zdGFuY2UgaW4gdGltZSBpcyBjdXJyZW50bHkgaW4gYSBsZWFwIHllYXIuXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhpcyBkYXRlIHRpbWUgaXMgaW4gYSBsZWFwIHllYXIuXG5cdCAqL1xuXHRnZXQgaXNJbkxlYXBZZWFyKCkge1xuXHRcdHJldHVybiB0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lXS5pc0xlYXBZZWFyKCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgb2Zmc2V0IGZyb20gVVRDIGZvciB0aGUgY3VycmVudCBpbnN0YW5jZSBpbiB0aW1lIChpbiBtaW51dGVzKS5cblx0ICpcblx0ICogQHJldHVybiB7bnVtYmVyfSAgVGhlIG9mZnNldCBpcyBpbiBtaW51dGVzXG5cdCAqL1xuXHRnZXQgb2Zmc2V0KCkge1xuXHRcdHJldHVybiB0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lXS51dGNPZmZzZXQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIGZsdWVudCBzZXR0ZXIgZm9yIHRoZSBVVEMgb2Zmc2V0LlxuXHQgKlxuXHQgKiBUaGUgb2Zmc2V0IHByb3ZpZGVkIGRlZmF1bHRzIHRvIGV4cGVjdGluZyBpbiBtaW51dGVzLiAgSG93ZXZlciBpZiB0aGVcblx0ICogaW5wdXQgaXMgbGVzcyB0aGFuIDE2IGFuZCBncmVhdGVyIHRoYW4gLTE2LCBpdCB3aWxsIGludGVycHJldCB0aGUgaW5wdXRcblx0ICogYXMgaG91cnMgaW5zdGVhZC5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gcmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZVxuXHQgKi9cblx0c2V0T2Zmc2V0KG9mZnNldCkge1xuXHRcdHRoaXMuY29uc3RydWN0b3IuYXNzZXJ0SXNPZmZzZXQob2Zmc2V0KTtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5mcm9tTW9tZW50KFxuXHRcdFx0dGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0uY2xvbmUoKS51dGNPZmZzZXQob2Zmc2V0KVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgZGF5IG9mIHRoZSB5ZWFyIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpbiB0aGUgb2JqZWN0LlxuXHQgKlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IEEgbnVtYmVyIGJldHdlZW4gMSBhbmQgMzY2IChkZXBlbmRpbmcgb24gd2hldGhlciB0aGVcblx0ICogaW50ZXJuYWwgZGF0ZSBhbmQgdGltZSBpcyBpbiBhIGxlYXAgeWVhciBvciBub3QpLlxuXHQgKi9cblx0Z2V0IGRheU9mWWVhcigpIHtcblx0XHRyZXR1cm4gdGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0uZGF5T2ZZZWFyKCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgcXVhcnRlciBmb3IgdGhlIGRhdGUgYW5kIHRpbWUgaW4gdGhlIG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiB7bnVtYmVyfSBBIG51bWJlciBiZXR3ZWVuIDEgYW5kIDRcblx0ICovXG5cdGdldCBxdWFydGVyKCkge1xuXHRcdHJldHVybiB0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lXS5xdWFydGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgSVNPIG51bWJlciBvZiB0aGUgd2VlayBmb3IgdGhlIGRhdGUgYW5kIHRpbWUgaW4gdGhlIG9iamVjdC5cblx0ICpcblx0ICogQGxpbmsgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IFdpbGwgYmUgYSBudW1iZXIgYmV0d2VlbiAxIGFuZCA1MmlzaFxuXHQgKi9cblx0Z2V0IGlzb1dlZWtOdW1iZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWVdLmlzb1dlZWsoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBJU08gbnVtYmVyIGZvciB0aGUgd2VlayB5ZWFyIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpbiB0aGVcblx0ICogb2JqZWN0LlxuXHQgKlxuXHQgKiBAbGluayBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG5cdCAqIEByZXR1cm4ge251bWJlcn0gIFdpbGwgYmUgYSBudW1iZXIgcmVwcmVzZW50aW5nIGEgeWVhci5cblx0ICovXG5cdGdldCBpc29XZWVrWWVhcigpIHtcblx0XHRyZXR1cm4gdGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0uaXNvV2Vla1llYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBvc2VzIHRoZSBJU08gbnVtYmVyIGZvciB0aGUgZGF5IG9mIHRoZSB3ZWVrIGZvciB0aGUgZGF0ZSBhbmQgdGltZSBpblxuXHQgKiB0aGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAbGluayBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG5cdCAqIEByZXR1cm4ge251bWJlcn0gQSBudW1iZXIgYmV0d2VlbiAxIGFuZCA3IChNb25kYXkgaXMgMSBhbmQgU3VuZGF5IGlzIDcpXG5cdCAqL1xuXHRnZXQgaXNvV2Vla0RheSgpIHtcblx0XHRyZXR1cm4gdGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0uaXNvV2Vla2RheSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV4cG9zZXMgdGhlIG51bWJlciBvZiB3ZWVrcyBpbiB0aGlzIERhdGVUaW1lJ3MgeWVhci5cblx0ICpcblx0ICogQGxpbmsgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2Ygd2Vla3MgaW4gdGhlIElTTyB5ZWFyLlxuXHQgKi9cblx0Z2V0IGlzb1dlZWtzSW5XZWVrWWVhcigpIHtcblx0XHRyZXR1cm4gdGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0uaXNvV2Vla3NJblllYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHdoYXQgdGhlIHNldCBsb2NhbGUgaXMgZm9yIHRoaXMgRGF0ZVRpbWVcblx0ICpcblx0ICogQHJldHVybiB7c3RyaW5nfSBBIGxvY2FsZSBzdHJpbmdcblx0ICovXG5cdGdldCBsb2NhbGUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWVdLmxvY2FsZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZmx1ZW50IHNldHRlciBmb3Igc2V0dGluZyB0aGUgbG9jYWxlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBhIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZSBlcXVpdmFsZW50IHRvIHRoaXMgb25lIGJ1dFxuXHQgKiB3aXRoIGRpZmZlcmVudCBsb2NhbGUuXG5cdCAqL1xuXHRzZXRMb2NhbGUobG9jYWxlKSB7XG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci5hc3NlcnRMb2NhbGVJc1ZhbGlkKGxvY2FsZSk7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWVdLmNsb25lKCkubG9jYWxlKGxvY2FsZSlcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhpcyBEYXRlVGltZSBpbnN0YW5jZSBpcyB2YWxpZC5cblx0ICpcblx0ICogVHlwaWNhbGx5IGFuIGludmFsaWQgc3RhdGUgaXMgYWNoaWV2ZWQgd2hlbiB0aGUgaW50ZXJuYWwgbW9tZW50IGlzXG5cdCAqIGludmFsaWQuICBUaGlzIGNhbiBoYXBwZW4gd2hlbiB0aGUgbW9tZW50IGluc3RhbmNlIGlzIGNyZWF0ZWQgd2l0aFxuXHQgKiBpbnZhbGlkIHBhcmFtZXRlcnMuXG5cdCAqXG5cdCAqIE5vdGU6IHdpdGggbW9tZW50LnRpbWV6b25lICh3aGljaCBpcyB0aGUgaW50ZXJuYWwgbGlicmFyeSksXG5cdCAqIG1vbWVudC5pc1ZhbGlkKCkgY291bGQgcmV0dXJuIHRydWUsIGZhbHNlIG9yIGEgc3RyaW5nIGZvciB3aHkgaXQnc1xuXHQgKiBpbnZhbGlkLiAgVGhpcyBpcyB3aHkgYSBzdHJpY3QgZXF1YWxpdHkgY2hlY2sgaXMgZG9uZSBmb3Igd2hldGhlciBpdCBpc1xuXHQgKiB0cnVlIG9yIG5vdC5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhlIGluc3RhbmNlIGlzIHZhbGlkLlxuXHQgKi9cblx0aXNWYWxpZCgpIHtcblx0XHRyZXR1cm4gdGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0uaXNWYWxpZCgpID09PSB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0d28gRGF0ZVRpbWUgaW5zdGFuY2VzIGFzIGEgRHVyYXRpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7RGF0ZVRpbWV9IG90aGVyRGF0ZVRpbWVcblx0ICogQHJldHVybiB7RHVyYXRpb259IEFuIGluc3RhbmNlIG9mIER1cmF0aW9uIHJlcHJlc2VudGluZyB0aGUgZGlmZmVyZW5jZVxuXHQgKiBiZXR3ZWVuIHRoZSB0d28gRGF0ZVRpbWUgb2JqZWN0cy5cblx0ICovXG5cdGRpZmYob3RoZXJEYXRlVGltZSkge1xuXHRcdHRoaXMuY29uc3RydWN0b3IuYXNzZXJ0SXNEYXRlVGltZShvdGhlckRhdGVUaW1lKTtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0bW9tZW50LmR1cmF0aW9uKFxuXHRcdFx0XHR0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lXS5kaWZmKFxuXHRcdFx0XHRcdG90aGVyRGF0ZVRpbWVbcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWVdXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGlzIERhdGVUaW1lIGFuZCBcIm5vd1wiIGFzIGEgRHVyYXRpb24uXG5cdCAqXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBbiBpbnN0YW5jZSBvZiBEdXJhdGlvbiByZXByZXNlbnRpbmcgdGhlIGRpZmZlcmVuY2Vcblx0ICogYmV0d2VlbiB0aGlzIERhdGVUaW1lIGFuZCBcIm5vd1wiXG5cdCAqL1xuXHRkaWZmTm93KCkge1xuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oXG5cdFx0XHRtb21lbnQuZHVyYXRpb24odGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0uZGlmZihtb21lbnQoKSkpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIHZhbHVlIG9mIHRoaXMgRGF0ZVRpbWUgdG8gdGhlIGVuZCAoaS5lLiB0aGUgbGFzdCBtaWxsaXNlY29uZCkgb2Zcblx0ICogYSB1bml0IG9mIHRpbWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1bml0XG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBSZXR1cm5zIGEgbmV3IERhdGVUaW1lIGluc3RhbmNlLlxuXHQgKi9cblx0ZW5kT2YodW5pdCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lXS5jbG9uZSgpLmVuZE9mKHVuaXQpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wYXJlcyB0aGlzIERhdGVUaW1lIHdpdGggcHJvdmlkZWQgRGF0ZVRpbWUgYW5kIHJldHVybnMgd2hldGhlciB0aGV5XG5cdCAqIGFyZSBlcXVhbCB0byBlYWNoIG90aGVyLlxuXHQgKlxuXHQgKiBUaGUgdHdvIERhdGVUaW1lcyBhcmUgY29uc2lkZXJlZCBlcXVhbCBpZiB0aGV5IHJlcHJlc2VudCB0aGUgc2FtZVxuXHQgKiBtaWxsaXNlY29uZCwgaGF2ZSB0aGUgc2FtZSB6b25lIGFuZCBsb2NhdGlvbiwgYW5kIGFyZSBib3RoIHZhbGlkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBvdGhlckRhdGVUaW1lXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoZXkgYXJlIGVxdWFsXG5cdCAqL1xuXHRlcXVhbHMob3RoZXJEYXRlVGltZSkge1xuXHRcdHRoaXMuY29uc3RydWN0b3IuYXNzZXJ0SXNEYXRlVGltZShvdGhlckRhdGVUaW1lKTtcblx0XHRyZXR1cm4gdGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0uaXNTYW1lKFxuXHRcdFx0b3RoZXJEYXRlVGltZVtwcml2YXRlUHJvcGVydGllcy5kYXRldGltZV1cblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhpcyBEYXRlVGltZSBpcyBpbiB0aGUgc2FtZSB1bml0IG9mIHRpbWUgYXMgYW5vdGhlciBEYXRlVGltZVxuXHQgKlxuXHQgKiBlZy4gRGF0ZVRpbWUuZnJvbUxvY2FsKCkuaGFzU2FtZSggb3RoZXJEVCwgJ2RheScgKSAvL34+IHRydWUgaWYgYm90aCB0aGVcblx0ICogc2FtZSBjYWxlbmRhciBkYXkuXG5cdCAqXG5cdCAqIE5vdGU6IHRoaXMgd2lsbCBtYXRjaCBhbGwgdW5pdHMgZXF1YWwgb3IgbGFyZ2VyLiAgRm9yIGV4YW1wbGUsIHBhc3NpbmcgaW5cblx0ICogYG1vbnRoYCB3aWxsIGNoZWNrIGBtb250aGAgYW5kIGB5ZWFyYC4gIFNvIGl0J3Mgbm90IG9ubHkgY2hlY2tpbmcgaWYgdGhlXG5cdCAqIHR3byBkYXRlcyBzaGFyZSB0aGUgc2FtZSBtb250aCwgYnV0IHRoYXQgdGhleSBhcmUgdGhlIHNhbWUgbW9udGggaW4gdGhlXG5cdCAqIHNhbWUgeWVhci4gIElmIHlvdSBwYXNzZWQgaW4gZGF5LCBpdCB3b3VsZCByZXR1cm4gd2hldGhlciB0aGUgcHJvdmlkZWRcblx0ICogRGF0ZVRpbWUgaXMgaW4gdGhlIHNhbWUgZGF5LCBtb250aCBhbmQgeWVhciBhcyB0aGlzIERhdGVUaW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGVUaW1lfSBvdGhlckRhdGVUaW1lXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1bml0XG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoZXkgYXJlIGJvdGggaW4gdGhlIHNhbWUgdGltZSBmb3IgdGhlXG5cdCAqIGdpdmVuIHVuaXQuXG5cdCAqL1xuXHRoYXNTYW1lKG90aGVyRGF0ZVRpbWUsIHVuaXQpIHtcblx0XHR0aGlzLmNvbnN0cnVjdG9yLmFzc2VydElzRGF0ZVRpbWUob3RoZXJEYXRlVGltZSk7XG5cdFx0cmV0dXJuIHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWVdLmlzU2FtZShcblx0XHRcdG90aGVyRGF0ZVRpbWVbcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWVdLFxuXHRcdFx0dW5pdFxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogU3VidHJhY3QgYSBwZXJpb2Qgb2YgdGltZSAocmVwcmVzZW50ZWQgYnkgYSBEdXJhdGlvbikgZnJvbSB0aGlzIERhdGVUaW1lXG5cdCAqIGFuZCByZXR1cm4gdGhlIHJlc3VsdGluZyBEYXRlVGltZS5cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbn0gZHVyYXRpb25cblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lIGZvciB0aGUgbmV3IGRhdGUgYW5kIHRpbWUuXG5cdCAqL1xuXHRtaW51cyhkdXJhdGlvbikge1xuXHRcdER1cmF0aW9uLmFzc2VydElzVmFsaWREdXJhdGlvbihkdXJhdGlvbik7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWVdXG5cdFx0XHRcdC5jbG9uZSgpXG5cdFx0XHRcdC5zdWJ0cmFjdChkdXJhdGlvbi50b09iamVjdCgpKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQWRkIGEgcGVyaW9kIG9mIHRpbWUgKHJlcHJlc2VudGVkIGJ5IGEgRHVyYXRpb24pIHRvIHRoaXMgRGF0ZVRpbWUgYW5kXG5cdCAqIHJldHVybiB0aGUgcmVzdWx0aW5nIERhdGVUaW1lXG5cdCAqXG5cdCAqIEBwYXJhbSB7RHVyYXRpb259IGR1cmF0aW9uXG5cdCAqIEByZXR1cm4ge0RhdGVUaW1lfFNlcnZlckRhdGVUaW1lfSBBIG5ldyBpbnN0YW5jZSBvZiBEYXRlVGltZSBmb3IgdGhlIG5ldyBkYXRlIGFuZCB0aW1lLlxuXHQgKi9cblx0cGx1cyhkdXJhdGlvbikge1xuXHRcdER1cmF0aW9uLmFzc2VydElzVmFsaWREdXJhdGlvbihkdXJhdGlvbik7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IuZnJvbU1vbWVudChcblx0XHRcdHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWVdLmNsb25lKCkuYWRkKGR1cmF0aW9uLnRvT2JqZWN0KCkpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIHZhbHVlIG9mIHRoaXMgRGF0ZVRpbWUgdG8gdGhlIGJlZ2lubmluZyBvZiBhIHNwZWNpZmllZCB1bml0IG9mXG5cdCAqIHRpbWUgYW5kIHJldHVybiBhIG5ldyBEYXRlVGltZSByZXByZXNlbnRpbmcgdGhhdC5cblx0ICpcblx0ICogZWcuXG5cdCAqIHN0YXJ0T2YoIERhdGVUaW1lLlVOSVRfWUVBUiApIC8vc2V0cyB0byBKYW51YXJ5IDFzdCwgMTI6MDBhbSB0aGlzXG5cdCAqIHllYXIuXG5cdCAqIHN0YXJ0T2YoIERhdGVUaW1lLlVOSVRfTU9OVEggKSAvL3NldHMgdG8gdGhlIGZpcnN0IG9mIHRoaXMgbW9udGgsIDEyOjAwYW1cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHVuaXRcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IEEgbmV3IGluc3RhbmNlIG9mIERhdGVUaW1lXG5cdCAqL1xuXHRzdGFydE9mKHVuaXQpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5mcm9tTW9tZW50KFxuXHRcdFx0dGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0uY2xvbmUoKS5zdGFydE9mKHVuaXQpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWUgZm9ybWF0dGVkIGFjY29yZGluZyB0b1xuXHQgKiB0aGUgc3BlY2lmaWVkIGZvcm1hdCBzdHJpbmcuXG5cdCAqXG5cdCAqIEBsaW5rIGh0dHBzOi8vbW9tZW50anMuY29tL2RvY3MvIy9kaXNwbGF5aW5nL2Zvcm1hdC9cblx0ICogQHNlZSBNb21lbnQgZm9ybWF0IF5eIHNlY3Rpb24gZm9yIHRoZSBhdmFpbGFibGUgZm9ybWF0cyB0aGF0IGNhbiBiZSB1c2VkLlxuXHQgKlxuXHQgKiBBbiBlbXB0eSBmb3JtYXQgdmFsdWUgd2lsbCByZXR1cm4gdGhlIHN0cmluZyBmb3JtYXR0ZWQgaW4gSVNPIDg2MDEgd2l0aFxuXHQgKiBhbnkgb2Zmc2V0IGluY2x1ZGVkLlxuXHQgKlxuXHQgKiBXaXRob3V0IGFueSBhcmd1bWVudCBwYXNzZWQsIHRoZSBmb3JtYXQgd2lsbCBiZSB3aGF0ZXZlciBzdHJpbmcgdGhlXG5cdCAqIGZvcm1hdCBpcyBzZXJ2ZXIgc2lkZS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdFxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9ICBUaGUgZGF0ZSBhbmQgdGltZSBkaXNwbGF5ZWQgYWNjb3JkaW5nIHRvIHRoZSBwcm92aWRlZFxuXHQgKiBmb3JtYXQuXG5cdCAqL1xuXHR0b0Zvcm1hdChmb3JtYXQgPSBERUZBVUxUX0ZPUk1BVCkge1xuXHRcdHJldHVybiB0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lXS5mb3JtYXQoZm9ybWF0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWUgZm9ybWF0dGVkIGFjY29yZGluZyB0b1xuXHQgKiB0aGUgSVNPIDg2MDEgc3RhbmRhcmQuXG5cdCAqXG5cdCAqIElmIGBpblVUQ2AgaXMgdHJ1ZSAoZGVmYXVsdCkgdGhlbiBgdG9JU09gIHdpbGwgcmV0dXJuIHRoZSBJU08gc3RyaW5nIGluXG5cdCAqIFVUQy4gT3RoZXJ3aXNlIGl0IHdpbGwgaW5jbHVkZSB0aGUgb2Zmc2V0IGluZm9ybWF0aW9uIGZvciB0aGUgaW50ZXJuYWxcblx0ICogdGltZXpvbmUvb2Zmc2V0IG9uIHRoZSBtb21lbnQgaW4gdGltZS5cblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBpblVUQ1xuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IEFuIElTTzg2MDEgc3RyaW5nXG5cdCAqL1xuXHR0b0lTTyhpblVUQyA9IHRydWUpIHtcblx0XHRyZXR1cm4gaW5VVENcblx0XHRcdD8gdGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0udG9JU09TdHJpbmcoKVxuXHRcdFx0OiB0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lXS50b0lTT1N0cmluZyh0cnVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBmb3IgdGhpcyBEYXRlVGltZSBhcyBhIGphdmFzY3JpcHQgRGF0ZSBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0RhdGV9IEEgamF2YXNjcmlwdCBEYXRlIGluc3RhbmNlXG5cdCAqL1xuXHR0b0pTRGF0ZSgpIHtcblx0XHRyZXR1cm4gdGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0udG9EYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogV2hlbiBzZXJpYWxpemluZyBhbiBvYmplY3QgdG8gSlNPTiwgaWYgdGhlcmUgaXMgYSBEYXRlVGltZSBpbnN0YW5jZSwgaXRcblx0ICogd2lsbCBiZSByZXByZXNlbnRlZCBhcyBhbiBJU084NjAxIHN0cmluZy5cblx0ICpcblx0ICogQHJldHVybiB7c3RyaW5nfSBBbiBJU08gODYwMSBzdHJpbmdcblx0ICovXG5cdHRvSlNPTigpIHtcblx0XHRyZXR1cm4gdGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0udG9JU09TdHJpbmcoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIERhdGVUaW1lIHRvIHdoYXRldmVyIHRoZSBcImxvY2FsXCIgdGltZSBpcy5cblx0ICpcblx0ICogQHJldHVybiB7RGF0ZVRpbWV8U2VydmVyRGF0ZVRpbWV9IGEgbmV3IGluc3RhbmNlIG9mIHRoZSBEYXRlVGltZVxuXHQgKi9cblx0dG9Mb2NhbCgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5mcm9tTW9tZW50KFxuXHRcdFx0dGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0uY2xvbmUoKS5sb2NhbCgpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBtaWxsaXNlY29uZHMgc2luY2UgdGhlIFVuaXggRXBvY2ggZm9yIHRoZSBjdXJyZW50IERhdGVUaW1lXG5cdCAqIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IE51bWJlciBvZiBtaWxsaXNlY29uZHMgc2luY2UgVW5peCBFcG9jaFxuXHQgKi9cblx0dG9NaWxsaXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMudmFsdWVPZigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBzaW1wbGUgb2JqZWN0IGNvbnRhaW5pbmcgeWVhciwgbW9udGgsIGRheSwgaG91cixcblx0ICogbWludXRlLCBzZWNvbmQsIGFuZCBtaWxsaXNlY29uZC5cblx0ICpcblx0ICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCB5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCxcblx0ICogYW5kIG1pbGxpc2Vjb25kLlxuXHQgKi9cblx0dG9PYmplY3QoKSB7XG5cdFx0Y29uc3QgZGF0ZXRpbWUgPSB0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lXS50b09iamVjdCgpO1xuXHRcdHJldHVybiByZWR1Y2UoXG5cdFx0XHRkYXRldGltZSxcblx0XHRcdChyZXN1bHQsIHZhbHVlLCBrZXkpID0+IHtcblx0XHRcdFx0a2V5ID0gdGhpcy5jb25zdHJ1Y3Rvcltwcml2YXRlTWV0aG9kcy5ub3JtYWxpemVVbml0TmFtZV0oa2V5KTtcblx0XHRcdFx0cmVzdWx0W2tleV0gPSB0aGlzLmNvbnN0cnVjdG9yW1xuXHRcdFx0XHRcdHByaXZhdGVNZXRob2RzLm5vcm1hbGl6ZVVuaXRWYWx1ZVxuXHRcdFx0XHRdKGtleSwgdmFsdWUsIGZhbHNlKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cdFx0XHR7fVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgdGhlIERhdGVUaW1lJ3MgdGltZXpvbmUgdG8gVVRDLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtEYXRlVGltZXxTZXJ2ZXJEYXRlVGltZX0gQSBuZXcgaW5zdGFuY2Ugb2YgRGF0ZVRpbWVcblx0ICovXG5cdHRvVVRDKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmZyb21Nb21lbnQoXG5cdFx0XHR0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmRhdGV0aW1lXS5jbG9uZSgpLnV0YygpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIGVuZ2xpc2ggc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRGF0ZVRpbWUgd2hlbiB0aGUgaW5zdGFuY2UgaXNcblx0ICogY29lcmNlZCB0byBhIHN0cmluZyAoc2ltaWxhciBmb3JtYXQgdG8gSlMgYERhdGUudG9TdHJpbmcoKWAuXG5cdCAqXG5cdCAqIGVnIGBUdWUgRGVjIDI1IDIwMTggMTA6MTU6MDAgR01UKzAwMDBgXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEYXRlVGltZVxuXHQgKi9cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuZGF0ZXRpbWVdLnRvU3RyaW5nKCk7XG5cdH1cblxuXHQvKipcblx0ICogV2hlbiBEYXRlVGltZSBpcyBjb2VyY2VkIHRvIG51bWJlciB0aGlzIHdpbGwgZW5zdXJlIGl0cyBkaXNwbGF5ZWQgYXMgdGhlXG5cdCAqIG51bWJlciBvZiBtaWxsaXNlY29uZHMgc2luY2UgdGhlIFVuaXggRXBvY2ggZm9yIHRoZSBjdXJyZW50IERhdGVUaW1lXG5cdCAqXG5cdCAqIEByZXR1cm4ge251bWJlcn0gQW1vdW50IG9mIG1pbGxpc2Vjb25kcyBzaW5jZSB0aGUgVW5peCBFcG9jaFxuXHQgKi9cblx0dmFsdWVPZigpIHtcblx0XHRyZXR1cm4gdGhpc1twcml2YXRlUHJvcGVydGllcy5kYXRldGltZV0udmFsdWVPZigpO1xuXHR9XG59XG5cbi8qKlxuICogVGhlc2Ugc3RhdGljIHByb3BlcnRpZXMgbmVlZCB0byBiZSBkZWZpbmVkIG91dHNpZGUgb2YgdGhlIGNsYXNzIGRlZmluaXRpb25cbiAqIGJlY2F1c2Ugb2YgY29tcGlsZSBpc3N1ZXMuXG4gKi9cbkRhdGVUaW1lLlVOSVRfWUVBUiA9ICd5ZWFyJztcbkRhdGVUaW1lLlVOSVRfTU9OVEggPSAnbW9udGgnO1xuRGF0ZVRpbWUuVU5JVF9EQVkgPSAnZGF5JztcbkRhdGVUaW1lLlVOSVRfSE9VUiA9ICdob3VyJztcbkRhdGVUaW1lLlVOSVRfTUlOVVRFID0gJ21pbnV0ZSc7XG5EYXRlVGltZS5VTklUX1NFQ09ORCA9ICdzZWNvbmQnO1xuRGF0ZVRpbWUuVU5JVF9NSUxMSVNFQ09ORCA9ICdtaWxsaXNlY29uZCc7XG5EYXRlVGltZS5USU1FWk9ORV9MT0NBTCA9ICdsb2NhbCc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgVElNRVpPTkVfQ09ORklHLCBTRVJWRVJfTE9DQUxFIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgeyBGT1JNQVRfU0lURV9EQVRFLCBGT1JNQVRfU0lURV9USU1FIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaGVscGVycyc7XG5pbXBvcnQgeyB2YWxpZGF0ZUxvY2FsZSB9IGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5cbmltcG9ydCB7IHNuYWtlQ2FzZSB9IGZyb20gJ2xvZGFzaCc7XG4vKipcbiAqIERlZmF1bHQgdGltZXpvbmUgc3RyaW5nIHRvIHVzZS5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9USU1FWk9ORV9TVFJJTkcgPVxuXHRUSU1FWk9ORV9DT05GSUcuc3RyaW5nID09PSAnJyA/ICdVVEMnIDogVElNRVpPTkVfQ09ORklHLnN0cmluZztcblxuLyoqXG4gKiBEZWZhdWx0IG9mZnNldFxuICpcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX09GRlNFVCA9IFRJTUVaT05FX0NPTkZJRy5vZmZzZXQ7XG5cbi8qKlxuICogV2hldGhlciB0aGVyZSBpcyBhIGRlZmF1bHQgdGltZXpvbmUgc3RyaW5nIHRvIHVzZS5cbiAqIFRoaXMgaGVscHMgd2l0aCBkZXRlcm1pbmluZyB3aGV0aGVyIHRvIHVzZSB0aGUgb2Zmc2V0IG9yIG5vdCBmb3IgY29uc3RydWN0aW5nXG4gKiBEYXRlVGltZSB2YWx1ZSBvYmplY3RzLlxuICpcbiAqIEB0eXBlIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgSEFTX1RJTUVaT05FX1NUUklORyA9XG5cdERFRkFVTFRfVElNRVpPTkVfU1RSSU5HICE9PSAnVVRDJyB8fFxuXHQhKERFRkFVTFRfVElNRVpPTkVfU1RSSU5HID09PSAnVVRDJyAmJiBERUZBVUxUX09GRlNFVCAhPT0gMCk7XG5cbi8qKlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0ZPUk1BVCA9IEZPUk1BVF9TSVRFX0RBVEUgKyAnICcgKyBGT1JNQVRfU0lURV9USU1FO1xuXG4vKipcbiAqIEV4cG9zZXMgd2hhdCB0byB1c2UgZm9yIHRoZSBkZWZhdWx0IGxvY2FsZS5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9MT0NBTEUgPSBzbmFrZUNhc2UoU0VSVkVSX0xPQ0FMRS51c2VyKTtcblxuLyoqXG4gKiBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgcHJvdmlkZWQgbG9jYWxlIGlzIHZhbGlkLiAgU28gaWYgYERFRkFVTFRfTE9DQUxFYCBpc1xuICogbm90IHZhbGlkIGZvciB0aGlzIGVudmlyb25tZW50LCB0aGVuIGEgZmFsbGJhY2sgb2YgJ2VuJyBsb2NhbGUgaXMgdXNlZC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9WQUxJRF9MT0NBTEUgPSB2YWxpZGF0ZUxvY2FsZShERUZBVUxUX0xPQ0FMRSlcblx0PyBERUZBVUxUX0xPQ0FMRVxuXHQ6ICdlbic7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IG1vbWVudER1cmF0aW9uRm9ybWF0U2V0dXAgZnJvbSAnbW9tZW50LWR1cmF0aW9uLWZvcm1hdCc7XG5pbXBvcnQgeyBjYXBpdGFsaXplLCBwaWNrLCBrZXlzLCBvbWl0LCBtYXBWYWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGlzU2hhbGxvd0VxdWFsIGZyb20gJ0B3b3JkcHJlc3MvaXMtc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICd3YXJuaW5nJztcbmltcG9ydCB7IGluc3RhbmNlT2YgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCAqIGFzIGFzc2VydGlvbnMgZnJvbSAnLi9hc3NlcnRpb25zJztcbmltcG9ydCB7IERFRkFVTFRfVkFMSURfTE9DQUxFIH0gZnJvbSAnLi9kZWZhdWx0cyc7XG5cbm1vbWVudER1cmF0aW9uRm9ybWF0U2V0dXAobW9tZW50KTtcblxuLyoqXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc3ltYm9scyB1c2VkIGZvciBcInByaXZhdGVcIiBwcm9wZXJ0aWVzIGluIHRoZSBEdXJhdGlvbiBvYmplY3QuXG4gKlxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0ZHVyYXRpb246IFN5bWJvbCxcbiAqIFx0XHR2YWx1ZXM6IFN5bWJvbCxcbiAqIFx0XHRpc1ZhbGlkOiBTeW1ib2wsXG4gKiBcdH1cbiAqIH1cbiAqL1xuY29uc3QgcHJpdmF0ZVByb3BlcnRpZXMgPSB7XG5cdGR1cmF0aW9uOiBTeW1ib2woJ0R1cmF0aW9uUHJpdmF0ZVByb3BlcnRpZXNEdXJhdGlvbicpLFxuXHRkdXJhdGlvblZhbHVlczogU3ltYm9sKCdEdXJhdGlvblByaXZhdGVQcm9wZXJ0aWVzRHVyYXRpb25WYWx1ZXMnKSxcblx0aXNWYWxpZDogU3ltYm9sKCdEdXJhdGlvblByaXZhdGVQcm9wZXJ0aWVzSXNWYWxpZCcpLFxufTtcblxuLyoqXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc3ltYm9scyB1c2VkIGZvciBcInByaXZhdGVcIiBtZXRob2RzIGluIHRoZSBEdXJhdGlvbiBvYmplY3QuXG4gKlxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0Y3JlYXRlR2V0dGVyc0FuZFNldHRlcnM6IFN5bWJvbCxcbiAqIFx0XHRnZXRBbGxVbml0TmFtZXM6IFN5bWJvbCxcbiAqIFx0XHRwb3B1bGF0ZVZhbHVlc0Zyb21EdXJhdGlvbjogU3ltYm9sLFxuICogXHRcdHNldFZhbHVlczogU3ltYm9sLFxuICogXHQgICAgZmlsdGVyVmFsdWVzOiBTeW1ib2wsXG4gKiBcdH1cbiAqIH1cbiAqL1xuY29uc3QgcHJpdmF0ZU1ldGhvZHMgPSB7XG5cdGNyZWF0ZUdldHRlcnM6IFN5bWJvbCgnRHVyYXRpb25Qcml2YXRlTWV0aG9kc0NyZWF0ZUdldHRlcnMnKSxcblx0Z2V0QWxsVW5pdE5hbWVzOiBTeW1ib2woJ0R1cmF0aW9uUHJpdmF0ZU1ldGhvZHNHZXRBbGxVbml0TmFtZXMnKSxcblx0cG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb246IFN5bWJvbChcblx0XHQnRHVyYXRpb25Qcml2YXRlTWV0aG9kc1BvcHVsYXRlVmFsdWVzRnJvbUR1cmF0aW9uJ1xuXHQpLFxuXHRzZXRWYWx1ZXM6IFN5bWJvbCgnRHVyYXRpb25Qcml2YXRlTWV0aG9kc1NldFZhbHVlcycpLFxuXHRmaWx0ZXJWYWx1ZXM6IFN5bWJvbCgnRHVyYXRpb25Qcml2YXRlTWV0aG9kc0ZpbHRlclZhbHVlcycpLFxufTtcblxuLyoqXG4gKiBBbiBhcnJheSBvZiB1bml0IG5hbWVzIGZvciBwcm9wZXJ0aWVzIGluIHRoZSBEdXJhdGlvbiBvYmplY3RcbiAqXG4gKiBAdHlwZSB7c3RyaW5nW119XG4gKi9cbmNvbnN0IHVuaXROYW1lcyA9IFtcblx0J3llYXJzJyxcblx0J21vbnRocycsXG5cdCdkYXlzJyxcblx0J2hvdXJzJyxcblx0J21pbnV0ZXMnLFxuXHQnc2Vjb25kcycsXG5cdCdtaWxsaXNlY29uZHMnLFxuXTtcblxuLyoqXG4gKiBBbiBhcnJheSBvZiBkZXJpdmF0aXZlIHVuaXQgbmFtZXMuXG4gKiBUaGVzZSBhcmUgYWNjZXNzb3JzIHRoYXQgYXJlIGRlcml2YXRpdmVzIG9mIGJhc2UgdW5pdHMuICBGb3IgaW5zdGFuY2UsXG4gKiBcIndlZWtzXCIgZW5kcyB1cCBiZWluZyBhIGRlcml2YXRpdmUgKGNhbGN1bGF0ZWQgZnJvbSkgdGhlIFwiZGF5c1wiIHVuaXQuXG4gKlxuICogQHR5cGUge3N0cmluZ1tdfVxuICovXG5jb25zdCBkZXJpdmF0aXZlVW5pdE5hbWVzID0gWyd3ZWVrcyddO1xuXG4vKipcbiAqIFdoZXJlIGEgRGF0ZVRpbWUgb2JqZWN0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9pbnQgaW4gdGltZSwgYSBEdXJhdGlvbiBvYmplY3RcbiAqIHJlcHJlc2VudHMgYSBsZW5ndGggb2YgdGltZS5cbiAqXG4gKiBEdXJhdGlvbnMgZG8gbm90IGhhdmUgYSBkZWZpbmVkIGJlZ2lubmluZyBhbmQgZW5kIGRhdGUuICBUaGV5IGFyZSBjb250ZXh0bGVzcy5cbiAqXG4gKiBBcyBhbiBleGFtcGxlLCBkdXJhdGlvbnMgYXJlIHJlcHJlc2VudGF0aXZlIG9mIHNvbWV0aGluZyBsaWtlIFwiMiBob3Vyc1wiIGFuZFxuICogbm90IHJlcHJlc2VudGF0aXZlIG9mIHNvbWV0aGluZyBsaWtlIFwiYmV0d2VlbiAxcG0gYW5kIDNwbVwiLlxuICpcbiAqIEludGVybmFsbHksIHRoZSBEdXJhdGlvbiBjbGFzcyBoZXJlIHVzZXMgYG1vbWVudC5EdXJhdGlvbmAuICBUaGlzIGlzIGFuXG4gKiBhYnN0cmFjdGlvbiBsb29zZWx5IGZvbGxvd2luZyB0aGUgYWRhcHRlciBwYXR0ZXJuIHNvIHRoYXQgdGhlcmUgaXMgYSBjb21tb25cbiAqIGFwaSB0aGF0IGNhbiBiZSBkZXBlbmRlZCBvbiBpZiBpbiB0aGUgZnV0dXJlIHRoZSBpbnRlcm5hbCBsaWJyYXJ5IGlzIHN3aXRjaGVkXG4gKiB0byBzb21ldGhpbmcgZGlmZmVyZW50IChzdWNoIGFzIEx1eG9uKS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHVyYXRpb24ge1xuXHRzdGF0aWMgVU5JVF9ZRUFSUyA9ICd5ZWFycyc7XG5cdHN0YXRpYyBVTklUX01PTlRIUyA9ICdtb250aHMnO1xuXHRzdGF0aWMgVU5JVF9EQVlTID0gJ2RheXMnO1xuXHRzdGF0aWMgVU5JVF9IT1VSUyA9ICdob3Vycyc7XG5cdHN0YXRpYyBVTklUX01JTlVURVMgPSAnbWludXRlcyc7XG5cdHN0YXRpYyBVTklUX1NFQ09ORFMgPSAnc2Vjb25kcyc7XG5cdHN0YXRpYyBVTklUX01JTExJU0VDT05EUyA9ICdtaWxsaXNlY29uZHMnO1xuXHRzdGF0aWMgVU5JVF9XRUVLUyA9ICd3ZWVrcyc7XG5cblx0LyoqXG5cdCAqIGJlY2F1c2UgbWluaWZpY2F0aW9uIGRlc3Ryb3lzIGNsYXNzIG5hbWVzIGFuZCByZW5kZXJzIGluc3RhbmVPZiB1c2VsZXNzXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRkaXNwbGF5TmFtZSA9ICdEdXJhdGlvbic7XG5cblx0LyoqXG5cdCAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIER1cmF0aW9uIGNsYXNzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdHxtb21lbnQuRHVyYXRpb258c3RyaW5nfG51bWJlcn0gdmFsdWVzXG5cdCAqIFJlY2VpdmluZyBhIG1vbWVudC5EdXJhdGlvbiBvYmplY3QgaXMgc29tZXRoaW5nIGZvciBpbnRlcm5hbCB1c2UgYW5kIHNob3VsZCBub3QgYmUgdXNlZCBkaXJlY3RseSB2aWFcblx0ICogY2xpZW50IGNvZGUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGUgIEEgdmFsaWQgbG9jYWxlIHN0cmluZy5cblx0ICogQGxpbmsgaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTY0NlxuXHQgKi9cblx0Y29uc3RydWN0b3IodmFsdWVzLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSkge1xuXHRcdHRoaXMuZGlzcGxheU5hbWUgPSAnRHVyYXRpb24nO1xuXHRcdHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuaXNWYWxpZF0gPSB0cnVlO1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0TG9jYWxlSXNWYWxpZChsb2NhbGUpO1xuXHRcdGlmICh0eXBlb2YgdmFsdWVzICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0dmFsdWVzID0gbW9tZW50LmR1cmF0aW9uKHZhbHVlcykubG9jYWxlKGxvY2FsZSk7XG5cdFx0fVxuXHRcdGlmIChtb21lbnQuaXNEdXJhdGlvbih2YWx1ZXMpKSB7XG5cdFx0XHR0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uXSA9IHZhbHVlcztcblx0XHRcdHRoaXNbcHJpdmF0ZU1ldGhvZHMucG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb25dKHZhbHVlcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhbHVlcyA9IHRoaXNbcHJpdmF0ZU1ldGhvZHMuZmlsdGVyVmFsdWVzXSh2YWx1ZXMpO1xuXHRcdFx0dGhpc1twcml2YXRlTWV0aG9kcy5zZXRWYWx1ZXNdKHZhbHVlcyk7XG5cdFx0XHR0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uXSA9IG1vbWVudFxuXHRcdFx0XHQuZHVyYXRpb24odmFsdWVzKVxuXHRcdFx0XHQubG9jYWxlKGxvY2FsZSk7XG5cdFx0fVxuXHRcdHRoaXNbcHJpdmF0ZU1ldGhvZHMuY3JlYXRlR2V0dGVyc10oKTtcblx0XHRPYmplY3QuZnJlZXplKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBEdXJhdGlvbiBmcm9tIGEgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcy5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IG1pbGxpc2Vjb25kc1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSAgQW4gaW5zdGFuY2Ugb2YgRHVyYXRpb24uXG5cdCAqL1xuXHRzdGF0aWMgZnJvbU1pbGxpc2Vjb25kcyhtaWxsaXNlY29uZHMsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbih7IG1pbGxpc2Vjb25kcyB9LCBsb2NhbGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBEdXJhdGlvbiBmcm9tIGEgc2ltcGxlIG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHZhbHVlcyAgS2V5cyBzaG91bGQgYmUgdGhlIHVuaXRzIChlZyAneWVhcnMnLCAnZGF5cycpLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge0R1cmF0aW9ufSBBbiBpbnN0YW5jZSBvZiBEdXJhdGlvblxuXHQgKi9cblx0c3RhdGljIGZyb21PYmplY3QodmFsdWVzLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSkge1xuXHRcdHJldHVybiBuZXcgRHVyYXRpb24odmFsdWVzLCBsb2NhbGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBEdXJhdGlvbiBmcm9tIGFuIElTTzg2MDEgc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gSVNPU3RyaW5nIChlZy4gJ1BUMjNIJylcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQW4gaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdHN0YXRpYyBmcm9tSVNPKElTT1N0cmluZywgbG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEUpIHtcblx0XHRhc3NlcnRpb25zLmFzc2VydElTTzg2MDFJc1ZhbGlkKElTT1N0cmluZywgdHJ1ZSk7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbihJU09TdHJpbmcsIGxvY2FsZSk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGUgd2hldGhlciB0aGUgcHJvdmlkZWQgbG9jYWxlIGFyZ3VtZW50IGlzIGEgdmFsaWQgbG9jYWxlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIGlzVmFsaWRMb2NhbGUobG9jYWxlKSB7XG5cdFx0cmV0dXJuIGFzc2VydGlvbnMudmFsaWRhdGVMb2NhbGUobG9jYWxlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIGxvY2FsZSBhcmd1bWVudCBpcyBhIHZhbGlkIGxvY2FsZS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAdGhyb3dzIEludmFsaWRMb2NhbGVcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc1ZhbGlkTG9jYWxlKGxvY2FsZSkge1xuXHRcdGFzc2VydGlvbnMuYXNzZXJ0TG9jYWxlSXNWYWxpZChsb2NhbGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHN0cmluZyBpcyBhIHZhbGlkIElTTyA4NjAxIER1cmF0aW9uIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlzb1N0cmluZ1xuXHQgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIGl0IGlzIHZhbGlkLlxuXHQgKi9cblx0c3RhdGljIGlzVmFsaWRJU084NjAxRHVyYXRpb24oaXNvU3RyaW5nKSB7XG5cdFx0cmV0dXJuIGFzc2VydGlvbnMudmFsaWRhdGVJU084NjAxKGlzb1N0cmluZywgdHJ1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0IHdoZXRoZXIgdGhlIHByb3ZpZGVkIHN0cmluZyBpcyBhIHZhbGlkIElTTyA4NjAxIER1cmF0aW9uIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlzb1N0cmluZ1xuXHQgKiBAdGhyb3dzIEludmFsaWRJU084NjAxU3RyaW5nXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNWYWxpZElTTzg2MDFEdXJhdGlvbihpc29TdHJpbmcpIHtcblx0XHRhc3NlcnRpb25zLmFzc2VydElTTzg2MDFJc1ZhbGlkKGlzb1N0cmluZyk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgdmFsaWQgaW5zdGFuY2Ugb2YgRHVyYXRpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7RHVyYXRpb259ZHVyYXRpb25cblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgaXQgaXMgYSB2YWxpZCBEdXJhdGlvbiBvYmplY3QuXG5cdCAqL1xuXHRzdGF0aWMgaXNWYWxpZER1cmF0aW9uKGR1cmF0aW9uKSB7XG5cdFx0cmV0dXJuIGluc3RhbmNlT2YoZHVyYXRpb24sICdEdXJhdGlvbicpICYmIGR1cmF0aW9uLmlzVmFsaWQ7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIHZhbGlkIER1cmF0aW9uIGFuZCB0aHJvd3MgYW5cblx0ICogZXhjZXB0aW9uIGlmIG5vdC5cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbn0gZHVyYXRpb25cblx0ICogQHRocm93cyBUeXBlRXJyb3Jcblx0ICovXG5cdHN0YXRpYyBhc3NlcnRJc1ZhbGlkRHVyYXRpb24oZHVyYXRpb24pIHtcblx0XHRpZiAoIUR1cmF0aW9uLmlzVmFsaWREdXJhdGlvbihkdXJhdGlvbikpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoaXMgRHVyYXRpb24gb2JqZWN0IGlzIG5vdCB2YWxpZC4nKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIER1cmF0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufSBkdXJhdGlvblxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGUgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRHVyYXRpb24uXG5cdCAqIE5vdGU6IHRydWUgbWF5IHN0aWxsIG1lYW4gdGhhdCB0aGUgRHVyYXRpb24gaW5zdGFuY2UgaXMgbm90IHZhbGlkIVxuXHQgKi9cblx0c3RhdGljIGlzRHVyYXRpb24oZHVyYXRpb24pIHtcblx0XHRyZXR1cm4gaW5zdGFuY2VPZihkdXJhdGlvbiwgJ0R1cmF0aW9uJyk7XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEdXJhdGlvbiBhbmQgaWYgbm90XG5cdCAqIHRocm93cyBhbiBleGNlcHRpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7RHVyYXRpb259IGR1cmF0aW9uXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNEdXJhdGlvbihkdXJhdGlvbikge1xuXHRcdGlmICghRHVyYXRpb24uaXNEdXJhdGlvbihkdXJhdGlvbikpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuIGluc3RhbmNlIG9mIER1cmF0aW9uLidcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgZmlsdGVycyB0aGUgaW5jb21pbmcgdmFsdWVzIGFuZCByZXR1cm5zIG9ubHkga2V5L3ZhbHVlIHBhaXJzIHRoYXRcblx0ICogYXJlIGFjY2VwdGFibGUgYXMgZHVyYXRpb24gdW5pdHMuXG5cdCAqXG5cdCAqIElmIGEgaW52YWxpZCBkdXJhdGlvbiB1bml0IGlzIGRpc2NvdmVyZWQsIGEgY29uc29sZS5lcnJvciBpcyBnZW5lcmF0ZWRcblx0ICogKGluIG5vbi1wcm9kdWN0aW9uIG1vZGUpLlxuXHQgKlxuXHQgKiBAcGFyYW0ge2FueX0gdmFsdWVzXG5cdCAqIEByZXR1cm4ge09iamVjdH0gRmlsdGVyZWQgdmFsdWVzLlxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvciBpZiBpbmNvbWluZyB2YWx1ZXMgYXJndW1lbnQgaXMgbm90IGFuIG9iamVjdC5cblx0ICovXG5cdFtwcml2YXRlTWV0aG9kcy5maWx0ZXJWYWx1ZXNdKHZhbHVlcykge1xuXHRcdGlmICh0eXBlb2YgdmFsdWVzICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignSW5jb21pbmcgdmFsdWVzIG11c3QgYmUgYSBzaW1wbGUgb2JqZWN0LicpO1xuXHRcdH1cblx0XHRjb25zdCB2YWx1ZXNUb1NldCA9IHBpY2sodmFsdWVzLCB1bml0TmFtZXMpO1xuXHRcdGlmICghaXNTaGFsbG93RXF1YWwodmFsdWVzLCB2YWx1ZXNUb1NldCkpIHtcblx0XHRcdHdhcm5pbmcoXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHQnVGhlIGZvbGxvd2luZyB1bmV4cGVjdGVkIGtleXMgd2VyZSBpbiB0aGUgY29uZmlndXJhdGlvbiAnICtcblx0XHRcdFx0XHQnb2JqZWN0IGZvciBjb25zdHJ1Y3RpbmcgdGhlIER1cmF0aW9uOiAnICtcblx0XHRcdFx0XHRrZXlzKG9taXQodmFsdWVzLCB1bml0TmFtZXMpKS5qb2luKClcblx0XHRcdCk7XG5cdFx0XHR0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmlzVmFsaWRdID0gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB2YWx1ZXNUb1NldDtcblx0fVxuXG5cdC8qKlxuXHQgKiBVc2VkIHRvIHNldCB0aGUgaW50ZXJuYWwgXCJwcml2YXRlXCIgdmFsdWVzIHByb3BlcnR5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKi9cblx0W3ByaXZhdGVNZXRob2RzLnNldFZhbHVlc10odmFsdWVzKSB7XG5cdFx0dGhpc1twcml2YXRlUHJvcGVydGllcy5kdXJhdGlvblZhbHVlc10gPSB7fTtcblx0XHR1bml0TmFtZXMuZm9yRWFjaCgodW5pdCkgPT4ge1xuXHRcdFx0dGhpc1twcml2YXRlUHJvcGVydGllcy5kdXJhdGlvblZhbHVlc11bdW5pdF0gPSB2YWx1ZXNbdW5pdF0gfHwgMDtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVc2VkIHRvIHNldCB0aGUgdmFsdWVzIFwicHJpdmF0ZVwiIHByb3BlcnR5IGZyb20gYSBtb21lbnQuRHVyYXRpb24gb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge21vbWVudC5EdXJhdGlvbn0gZHVyYXRpb25cblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqL1xuXHRbcHJpdmF0ZU1ldGhvZHMucG9wdWxhdGVWYWx1ZXNGcm9tRHVyYXRpb25dKGR1cmF0aW9uKSB7XG5cdFx0Y29uc3Qgc2V0VmFsdWVzID0ge307XG5cdFx0dW5pdE5hbWVzLmZvckVhY2goKHVuaXQpID0+IHtcblx0XHRcdHNldFZhbHVlc1t1bml0XSA9IGR1cmF0aW9uW3VuaXRdKCk7XG5cdFx0fSk7XG5cdFx0dGhpc1twcml2YXRlTWV0aG9kcy5zZXRWYWx1ZXNdKHNldFZhbHVlcyk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBhcnJheSBvZiBhY2Nlc3NvciBuYW1lcyAodGhhdCBpbiB0dXJuIGFyZSB1c2VkIGZvciBnZW5lcmF0aW5nXG5cdCAqIHByaXZhdGUgcHJvcGVydGllcykuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKiBAcmV0dXJuIHtzdHJpbmdbXX0gIEFycmF5IG9mIGFjY2Vzc29yIG5hbWVzLlxuXHQgKi9cblx0W3ByaXZhdGVNZXRob2RzLmdldEFsbFVuaXROYW1lc10oKSB7XG5cdFx0cmV0dXJuIFsuLi51bml0TmFtZXMsIC4uLmRlcml2YXRpdmVVbml0TmFtZXNdO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgZ2V0dGVycyBmb3IgdGhlIER1cmF0aW9uIGluc3RhbmNlIGZyb20gdGhlIGFjY2Vzc29yIG5hbWVzLlxuXHQgKlxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdFtwcml2YXRlTWV0aG9kcy5jcmVhdGVHZXR0ZXJzXSgpIHtcblx0XHR0aGlzW3ByaXZhdGVNZXRob2RzLmdldEFsbFVuaXROYW1lc10oKS5mb3JFYWNoKChhY2Nlc3Nvck5hbWUpID0+IHtcblx0XHRcdC8vIGNyZWF0ZXMgYWNjZXNzb3IgZm9yIGdldHRpbmcgdGhlIHZhbHVlIHZpYSBhIHByb3BlcnR5XG5cdFx0XHQvLyBlZy4gaW5zdGFuY2UuaG91cnNcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBhY2Nlc3Nvck5hbWUsIHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdGlmIChkZXJpdmF0aXZlVW5pdE5hbWVzLmluZGV4T2YoYWNjZXNzb3JOYW1lKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpc1twcml2YXRlUHJvcGVydGllcy5kdXJhdGlvbl1bYWNjZXNzb3JOYW1lXSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0dGhpc1twcml2YXRlUHJvcGVydGllcy5kdXJhdGlvblZhbHVlc11bYWNjZXNzb3JOYW1lXSB8fFxuXHRcdFx0XHRcdFx0MFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblx0XHRcdC8vIGNyZWF0ZXMgYGFzKmAgbWV0aG9kcy5cblx0XHRcdC8vIGVnIGBpbnN0YW5jZS5hc0hvdXJzYCB3b3VsZCByZXR1cm4gdGhlIGdpdmVuIGR1cmF0aW9uXG5cdFx0XHQvLyBleHByZXNzZWQgYXMgdGhlIGhvdXJzIHVuaXQuXG5cdFx0XHQvLyBub3RlIGZvciB1bml0cyBzdWNoIGFzIFwieWVhcnNcIiBhbmQgXCJtb250aHNcIiwgdGhpcyB1c2VzIHdoYXRcblx0XHRcdC8vIGlzIHRlcm1lZCBhcyBcImxvbmd0ZXJtXCIgY2FsY3VsYXRpb24uIExvbmd0ZXJtIGlzIGJhc2VkIG9uXG5cdFx0XHQvLyBhIDQwMCB5ZWFyIGN5Y2xlIGF2ZXJhZ2luZyBvdXQgdGhlIGRheXMgaW4gYSBtb250aCBhbmRcblx0XHRcdC8vIGRheXMgaW4gYSB5ZWFyIG92ZXIgdGhhdCBjeWNsZS5cblx0XHRcdC8vIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2Jsb2IvZGV2ZWxvcC9zcmMvbGliL2R1cmF0aW9uL2J1YmJsZS5qcyNMNTJcblx0XHRcdGNvbnN0IGFzTWV0aG9kTmFtZSA9ICdhcycgKyBjYXBpdGFsaXplKGFjY2Vzc29yTmFtZSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgYXNNZXRob2ROYW1lLCB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb25dW2FzTWV0aG9kTmFtZV0oKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogRXhwb3NlcyB0aGUgdmFsdWUgb2YgbG9jYWxlLlxuXHQgKiBlZy4gaW5zdGFuY2UubG9jYWxlXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGxvY2FsZSBzdHJpbmcuXG5cdCAqL1xuXHRnZXQgbG9jYWxlKCkge1xuXHRcdHJldHVybiB0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uXS5sb2NhbGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY3VycmVudCBEdXJhdGlvbiBpbnN0YW5jZSByZXByZXNlbnRzIGEgdmFsaWRcblx0ICogZHVyYXRpb24uXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhlIER1cmF0aW9uIGluc3RhbmNlIGlzIHZhbGlkLlxuXHQgKi9cblx0Z2V0IGlzVmFsaWQoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuaXNWYWxpZF0gJiZcblx0XHRcdHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb25dLnRvSVNPU3RyaW5nKCkgIT09ICdQMEQnXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgbmV3IER1cmF0aW9uIGluc3RhbmNlIHRoYXQgaXMgaWRlbnRpY2FsIHRvIHRoaXMgZXhjZXB0IHRoZVxuXHQgKiBsb2NhbGUgaXMgY2hhbmdlZCB0byB3aGF0IHdhcyBwcm92aWRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQSBuZXcgaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdHNldExvY2FsZShsb2NhbGUpIHtcblx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb25WYWx1ZXNdLCBsb2NhbGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlZHVjZSB0aGlzIER1cmF0aW9uIHRvIGl0cyBjYW5vbmljYWwgcmVwcmVzZW50YXRpb24gaW4gaXRzIGN1cnJlbnQgdW5pdHMuXG5cdCAqXG5cdCAqIEZvciBleGFtcGxlOlxuXHQgKiBEdXJhdGlvblxuXHQgKiAgICAgLmZyb21PYmplY3QoeyB5ZWFyczogMiwgZGF5czogNTAwMCB9KVxuXHQgKiAgICAgLm5vcm1hbGl6ZSgpXG5cdCAqICAgICAudG9PYmplY3QoKSAvLz0+IHsgeWVhcnM6IDE1LCBtb250aHM6IDgsIGRheXM6IDEyIH1cblx0ICpcblx0ICogQHJldHVybiB7RHVyYXRpb259IEEgbmV3IGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRub3JtYWxpemUoKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbih0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uXSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBEdXJhdGlvbiBpbnN0YW5jZSBpcyB0aGUgc2FtZSBhcyB0aGlzXG5cdCAqIER1cmF0aW9uIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0R1cmF0aW9ufSBvdGhlckR1cmF0aW9uXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhhdCB0aGUgY29tcGFyZWQgZHVyYXRpb25zIGhhdmUgdGhlIHNhbWVcblx0ICogdW5pdHMgYW5kIHRoZSBzYW1lIHZhbHVlcyBmb3IgZWFjaCB1bml0IChhcyB3ZWxsIGFzIHNhbWUgbG9jYWxlKS4gVGhpc1xuXHQgKiBtZWFucyB0aGF0IGEgZHVyYXRpb24gd2l0aHsgbWludXRlczogNjAgfSB3b3VsZCBiZSBjb25zaWRlcmVkIG5vdCBlcXVhbFxuXHQgKiB0byBhIGR1cmF0aW9uIHdpdGggeyBob3VyczogMSB9LlxuXHQgKi9cblx0c2FtZUFzKG90aGVyRHVyYXRpb24pIHtcblx0XHREdXJhdGlvbi5hc3NlcnRJc0R1cmF0aW9uKG90aGVyRHVyYXRpb24pO1xuXHRcdGlmICghdGhpcy5pc1ZhbGlkIHx8ICFvdGhlckR1cmF0aW9uLmlzVmFsaWQpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKHRoaXMubG9jYWxlICE9PSBvdGhlckR1cmF0aW9uLmxvY2FsZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gaXNTaGFsbG93RXF1YWwodGhpcy50b09iamVjdCgpLCBvdGhlckR1cmF0aW9uLnRvT2JqZWN0KCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgRHVyYXRpb24gaW5zdGFuY2UgaXMgZXF1YWwgdG8gdGhpcyBEdXJhdGlvblxuXHQgKiBpbnN0YW5jZS5cblx0ICpcblx0ICogRXF1YWxpdHkgaXMgYmFzZWQgb246XG5cdCAqIC0gbG9jYWxlIGlzIHRoZSBzYW1lXG5cdCAqIC0gdGhlIG5vcm1hbGl6ZWQgdmFsdWUgb2YgdGhlIGR1cmF0aW9uIGlzIHRoZSBzYW1lLiAgZWcgYSBkdXJhdGlvbiB3aXRoXG5cdCAqIHsgaG91cnM6IDI0IH0gd291bGQgYmUgY29uc2lkZXJlZCBlcXVhbCB0byBhIGR1cmF0aW9uIHdpdGggeyBkYXlzOiAxIH1cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbn0gb3RoZXJEdXJhdGlvblxuXHQgKiBAdGhyb3dzIFR5cGVFcnJvclxuXHQgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGNvbnNpZGVyZWQgZXF1YWxcblx0ICovXG5cdGVxdWFscyhvdGhlckR1cmF0aW9uKSB7XG5cdFx0RHVyYXRpb24uYXNzZXJ0SXNEdXJhdGlvbihvdGhlckR1cmF0aW9uKTtcblx0XHRpZiAoIXRoaXMuaXNWYWxpZCB8fCAhb3RoZXJEdXJhdGlvbi5pc1ZhbGlkKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmxvY2FsZSAhPT0gb3RoZXJEdXJhdGlvbi5sb2NhbGUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIGlzU2hhbGxvd0VxdWFsKFxuXHRcdFx0dGhpcy5ub3JtYWxpemUoKS50b09iamVjdCgpLFxuXHRcdFx0b3RoZXJEdXJhdGlvbi5ub3JtYWxpemUoKS50b09iamVjdCgpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlIHRoaXMgZHVyYXRpb24gbG9uZ2VyIGJ5IHRoZSBzcGVjaWZpZWQgYW1vdW50LlxuXHQgKlxuXHQgKiBOb3RlOiB0aGUgcmV0dXJuZWQgRHVyYXRpb24gd2lsbCBoYXZlIHRoZSBsb2NhbGUgb2YgdGhlIG9yaWdpbmFsXG5cdCAqIHJlZ2FyZGxlc3Mgd2hhdCB0aGUgbG9jYWxlIHdhcyBvbiBhbnkgcGFzc2VkIGluIGR1cmF0aW9uLlxuXHQgKlxuXHQgKiBUaGUgbmV3IER1cmF0aW9uIHJldHVybmVkIHdpbGwgaGF2ZSBub3JtYWxpemVkIHZhbHVlcyAoaS5lLiBpZiBhZGRpdGlvblxuXHQgKiBvZiBvbmUgRHVyYXRpb24gd2l0aCBgeyBob3VyczogMTAgfWAgaXMgZG9uZSB3aXRoIHRoZSBvdGhlciBEdXJhdGlvblxuXHQgKiBoYXZpbmcgYHsgaG91cnM6IDE0IH1gIHRoZW4gdGhlIG5ldyBEdXJhdGlvbiB3aWxsIGhhdmUgYHsgZGF5czogMSB9YC5cblx0ICogWW91IGNhbiBzdGlsbCBnZXQgdGhlIHRvdGFsIGhvdXJzIGJ5IGNhbGxpbmcgYG5ld0R1cmF0aW9uLmFzSG91cnMoKWAuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RHVyYXRpb258T2JqZWN0fG51bWJlcn0gdmFsdWUgIEVpdGhlciBhIER1cmF0aW9uIGluc3RhbmNlLCBhXG5cdCAqIG51bWJlciBvZiBtaWxsaXNlY29uZHMgb3IgYW4gb2JqZWN0IGluIHRoZSBzYW1lIHNoYXBlIHJlY2VpdmVkIGJ5XG5cdCAqIER1cmF0aW9uLmZyb21PYmplY3QoKVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQSBuZXcgaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdHBsdXModmFsdWUpIHtcblx0XHRpZiAoRHVyYXRpb24uaXNEdXJhdGlvbih2YWx1ZSkpIHtcblx0XHRcdHJldHVybiBuZXcgRHVyYXRpb24oXG5cdFx0XHRcdHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb25dXG5cdFx0XHRcdFx0LmNsb25lKClcblx0XHRcdFx0XHQuYWRkKHZhbHVlW3ByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uXSlcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHR2YWx1ZSA9IHRoaXNbcHJpdmF0ZU1ldGhvZHMuZmlsdGVyVmFsdWVzXSh2YWx1ZSk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oXG5cdFx0XHR0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uXS5jbG9uZSgpLmFkZCh2YWx1ZSlcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1ha2UgdGhpcyBkdXJhdGlvbiBzaG9ydGVyIGJ5IHRoZSBzcGVjaWZpZWQgYW1vdW50XG5cdCAqXG5cdCAqIE5vdGU6IHRoZSByZXR1cm5lZCBEdXJhdGlvbiB3aWxsIGhhdmUgdGhlIGxvY2FsZSBvZiB0aGUgb3JpZ2luYWxcblx0ICogcmVnYXJkbGVzcyB3aGF0IHRoZSBsb2NhbGUgd2FzIG9uIGFueSBwYXNzZWQgaW4gZHVyYXRpb24uXG5cdCAqXG5cdCAqIFRoZSBuZXcgRHVyYXRpb24gcmV0dXJuZWQgd2lsbCBoYXZlIG5vcm1hbGl6ZWQgdmFsdWVzIChpLmUuIGlmIHN1YnRyYWN0aW9uXG5cdCAqIG9mIG9uZSBEdXJhdGlvbiB3aXRoIGB7IGhvdXJzOiAzNCB9YCBpcyBkb25lIHdpdGggdGhlIG90aGVyIER1cmF0aW9uXG5cdCAqIGhhdmluZyBgeyBob3VyczogMTAgfWAgdGhlbiB0aGUgbmV3IER1cmF0aW9uIHdpbGwgaGF2ZSBgeyBkYXlzOiAxIH1gLlxuXHQgKiBZb3UgY2FuIHN0aWxsIGdldCB0aGUgdG90YWwgaG91cnMgYnkgY2FsbGluZyBgbmV3RHVyYXRpb24uYXNIb3VycygpYC5cblx0ICpcblx0ICogQHBhcmFtIHtEdXJhdGlvbnxPYmplY3R8bnVtYmVyfSB2YWx1ZSBFaXRoZXIgYSBkdXJhdGlvbiBpbnN0YW5jZSwgYVxuXHQgKiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIG9yIGFuIG9iamVjdCBpbiB0aGUgc2FtZSBzaGFwZSBhcyB0aGF0IHJlY2VpdmVkIGJ5XG5cdCAqIER1cmF0aW9uLmZyb21PYmplY3QoKVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtEdXJhdGlvbn0gQSBuZXcgaW5zdGFuY2Ugb2YgRHVyYXRpb25cblx0ICovXG5cdG1pbnVzKHZhbHVlKSB7XG5cdFx0aWYgKER1cmF0aW9uLmlzRHVyYXRpb24odmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gbmV3IER1cmF0aW9uKFxuXHRcdFx0XHR0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uXVxuXHRcdFx0XHRcdC5jbG9uZSgpXG5cdFx0XHRcdFx0LnN1YnRyYWN0KHZhbHVlW3ByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uXSlcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHR2YWx1ZSA9IHRoaXNbcHJpdmF0ZU1ldGhvZHMuZmlsdGVyVmFsdWVzXSh2YWx1ZSk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXcgRHVyYXRpb24oXG5cdFx0XHR0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uXS5jbG9uZSgpLnN1YnRyYWN0KHZhbHVlKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgbmVnYXRpdmUgb2YgdGhpcyBEdXJhdGlvbi5cblx0ICpcblx0ICogQHJldHVybiB7RHVyYXRpb259IEEgbmV3IGluc3RhbmNlIG9mIER1cmF0aW9uXG5cdCAqL1xuXHRuZWdhdGUoKSB7XG5cdFx0cmV0dXJuIG5ldyBEdXJhdGlvbihcblx0XHRcdG1hcFZhbHVlcyh0aGlzLnRvT2JqZWN0KCksIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUgKiAtMTtcblx0XHRcdH0pXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgamF2YXNjcmlwdCBvYmplY3Qgd2l0aCB0aGlzIER1cmF0aW9uJ3MgdmFsdWVzLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHsqfSBSZXR1cm5zIHsgeWVhcnM6IG51bWJlciwgaG91cnM6IG51bWJlciAuLi4gfVxuXHQgKi9cblx0dG9PYmplY3QoKSB7XG5cdFx0cmV0dXJuIHRoaXNbcHJpdmF0ZVByb3BlcnRpZXMuZHVyYXRpb25WYWx1ZXNdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gSVNPIDg2MDEtY29tcGxpYW50IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIER1cmF0aW9uLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGVnLiBcIlBUMjRIXCJcblx0ICovXG5cdHRvSVNPKCkge1xuXHRcdHJldHVybiB0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uXS50b0lTT1N0cmluZygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYW4gSVNPIDg2MDEgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEdXJhdGlvbiBhcHByb3ByaWF0ZSBmb3IgdXNlXG5cdCAqIGluIEpTT04uXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gZWcuIFwiUFQyNEhcIlxuXHQgKi9cblx0dG9KU09OKCkge1xuXHRcdHJldHVybiB0aGlzW3ByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uXS50b0pTT04oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIElTTyA4NjAxIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgRHVyYXRpb24gYXBwcm9wcmlhdGUgZm9yIHVzZVxuXHQgKiBpbiBkZWJ1Z2dpbmcuXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gZWcuIFwiUFQyNEhcIlxuXHQgKi9cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMudG9JU08oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIG1pbGxpc2Vjb25kcyB2YWx1ZSBvZiB0aGlzIER1cmF0aW9uLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSB2YWx1ZSBvZiB0aGlzIGR1cmF0aW9uIHJlcHJlc2VudGVkIGluIHRoZSBudW1iZXIgb2Zcblx0ICogbWlsbGlzZWNvbmRzLlxuXHQgKi9cblx0dmFsdWVPZigpIHtcblx0XHRyZXR1cm4gdGhpcy5hc01pbGxpc2Vjb25kcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBEdXJhdGlvbiBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvXG5cdCAqIHRoZSBzcGVjaWZpZWQgZm9ybWF0IHN0cmluZy5cblx0ICpcblx0ICogQ3VycmVudGx5IHRoaXMgYWNjZXB0cyB0aGUgZm9sbG93aW5nIHRva2VucyBpbiB0aGUgZm9ybWF0IHN0cmluZzpcblx0ICpcblx0ICogeWVhcnM6ICAgWSBvciB5XG5cdCAqIG1vbnRoczogIE1cblx0ICogd2Vla3M6ICAgVyBvciB3XG5cdCAqIGRheXM6ICAgIEQgb3IgZFxuXHQgKiBob3VyczogICBIIG9yIGhcblx0ICogbWludXRlczogbVxuXHQgKiBzZWNvbmRzOiBzXG5cdCAqIG1zOiAgICAgIFNcblx0ICpcblx0ICogWW91IGNhbiB1c2UgbXVsdGlwbGVzIG9mIHRoZSBzYW1lIHRva2VuIHRvZ2V0aGVyIHRvIGFkZCB6ZXJvLWxlbmd0aFxuXHQgKiBwYWRkaW5nOiAoZWcgaGggLT4gMDEgaW5zdGVhZCBvZiBoIC0+IDEpXG5cdCAqXG5cdCAqIEVzY2FwZSB0b2tlbiBjaGFyYWN0ZXJzIHdpdGhpbiB0aGUgZm9ybWF0IHN0cmluZyB1c2luZyBzcXVhcmUgYnJhY2tldHNcblx0ICogKGVnICdoIFtocnNdLCBtIFttaW5dJyAtPiAnMTIgaHJzLCAzIG1pbicpXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfWZvcm1hdFxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9ICBBIGZvcm1hdHRlZCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBkdXJhdGlvbi5cblx0ICovXG5cdHRvRm9ybWF0KGZvcm1hdCkge1xuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZSgpW3ByaXZhdGVQcm9wZXJ0aWVzLmR1cmF0aW9uXS5mb3JtYXQoZm9ybWF0KTtcblx0fVxufVxuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBEYXRlVGltZSB9IGZyb20gJy4vZGF0ZXRpbWUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEdXJhdGlvbiB9IGZyb20gJy4vZHVyYXRpb24nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTZXJ2ZXJEYXRlVGltZSB9IGZyb20gJy4vc2VydmVyLWRhdGUtdGltZSc7XG4iLCIvKipcbiAqIEludGVybmFsIEltcG9ydHMuXG4gKi9cbmltcG9ydCBEYXRlVGltZSBmcm9tICcuL2RhdGV0aW1lJztcbmltcG9ydCB7XG5cdERFRkFVTFRfVElNRVpPTkVfU1RSSU5HLFxuXHRIQVNfVElNRVpPTkVfU1RSSU5HLFxuXHRERUZBVUxUX09GRlNFVCxcblx0REVGQVVMVF9WQUxJRF9MT0NBTEUsXG59IGZyb20gJy4vZGVmYXVsdHMnO1xuXG4vKipcbiAqIEV4dGVybmFsIEltcG9ydHMuXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcblxuLyoqXG4gKiBJbmhlcml0aW5nIHRoZSBEYXRlVGltZSBWYWx1ZSBvYmplY3QsIHRoaXMgcmVwcmVzZW50cyBhIHNpbmdsZSBwb2ludCBpbiB0aW1lXG4gKiB3aXRoaW4gdGhlIGNvbnRleHQgb2YgdGhlIHRpbWV6b25lIG9yIG9mZnNldCB0aGUgc2VydmVyIGlzIHNldCBhdC5cbiAqXG4gKiBJbnN0YW50aWF0aW5nIHRoaXMgaW5zdGVhZCBvZiBgRGF0ZVRpbWVgIHJlbW92ZXMgdGhlIG5lZWQgdG8gcGFzcyBhbG9uZ1xuICogdGltZXpvbmUgc3RyaW5nIG9yIG9mZnNldCBhbmQgaW5zdGFudGlhdGVzIGFjY29yZGluZyB0byB3aGF0IGhhcyBiZWVuIHNldCBhc1xuICogdGhlIGRlZmF1bHRzIGZvciB0aG9zZSBmcm9tIHRoZSBzZXJ2ZXIuICBVc2FnZSBvZiB0aGlzIGNsYXNzIGlzIHByZWZlcnJlZFxuICogb3ZlciBEYXRlVGltZSB0byByZW1vdmUgdGhlIG5lZWQgZm9yIGNsaWVudCBjb2RlIHRvIGZpZ3VyZSBvdXQgaWYgdGhlIHNlcnZlclxuICogaGFzIGEgdGltZXpvbmUgc3RyaW5nIHNldCBvciBpcyB1c2luZyBhIFVUQyBvZmZzZXQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZlckRhdGVUaW1lIGV4dGVuZHMgRGF0ZVRpbWUge1xuXHQvKipcblx0ICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgU2VydmVyRGF0ZVRpbWUgY2xhc3Ncblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlzbzg2MDFEYXRlU3RyaW5nXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lem9uZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRpc284NjAxRGF0ZVN0cmluZyA9ICcnLFxuXHRcdHRpbWV6b25lID0gREVGQVVMVF9USU1FWk9ORV9TVFJJTkcsXG5cdFx0bG9jYWxlID0gREVGQVVMVF9WQUxJRF9MT0NBTEVcblx0KSB7XG5cdFx0Ly8gd2Ugb25seSB3YW50IHRvIHVzZSB0aGUgdGltZXpvbmUgdmFsdWUgaWYgdGhlIHNlcnZlciBpbmRpY2F0ZXMgdGhlcmVcblx0XHQvLyBpcyBhIGEgdGltZXpvbmUgc3RyaW5nIG9yIGlmIGNvbnN0cnVjdGluZyBhbiBpbnN0YW5jZSBmb3IgYSBub24gVVRDXG5cdFx0Ly8gdmFsdWUgdGltZXpvbmUgKEhBU19USU1FWk9ORV9TVFJJTkcgaXMganVzdCBhIHNob3J0Y3V0IGNoZWNrKS5cblx0XHRpZiAoSEFTX1RJTUVaT05FX1NUUklORyB8fCAoISF0aW1lem9uZSAmJiB0aW1lem9uZSAhPT0gJ1VUQycpKSB7XG5cdFx0XHRzdXBlcihpc284NjAxRGF0ZVN0cmluZywgdGltZXpvbmUsIGxvY2FsZSwgJ1NlcnZlckRhdGVUaW1lJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGRhdGV0aW1lID0gISFpc284NjAxRGF0ZVN0cmluZ1xuXHRcdFx0XHQ/IG1vbWVudCgpLnV0Y09mZnNldChERUZBVUxUX09GRlNFVCwgdHJ1ZSkubG9jYWxlKGxvY2FsZSlcblx0XHRcdFx0OiBtb21lbnQoaXNvODYwMURhdGVTdHJpbmcpXG5cdFx0XHRcdFx0XHQudXRjT2Zmc2V0KERFRkFVTFRfT0ZGU0VULCB0cnVlKVxuXHRcdFx0XHRcdFx0LmxvY2FsZShsb2NhbGUpO1xuXHRcdFx0c3VwZXIoZGF0ZXRpbWUudG9JU09TdHJpbmcodHJ1ZSksIG51bGwsIGxvY2FsZSwgJ1NlcnZlckRhdGVUaW1lJyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEluc3RhbnRpYXRlIFNlcnZlckRhdGVUaW1lIGZyb20gYW4gSVNPIHN0cmluZy5cblx0ICogVGhpcyBvdmVycmlkZXMgYERhdGVUaW1lLmZyb21JU09gIHJlbW92aW5nIHRoZSBuZWVkIHRvIHdvcnJ5IGFib3V0XG5cdCAqIHdoZXRoZXIgdG8gdXNlIGB0aW1lem9uZWAgb3IgYG9mZnNldGAuICBUaGlzIHdpbGwgc2ltcGx5IHVzZSB3aGF0ZXZlciBpc1xuXHQgKiBwcm92aWRlZCBieSB0aGUgc2VydmVyIChwcmVmZXJyaW5nIHRpbWV6b25lIGlmIGl0cyBhdmFpbGFibGUpLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gSVNPU3RyaW5nXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIFNlcnZlckRhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgZnJvbUlTTyhJU09TdHJpbmcsIGxvY2FsZSA9IERFRkFVTFRfVkFMSURfTE9DQUxFKSB7XG5cdFx0cmV0dXJuIEhBU19USU1FWk9ORV9TVFJJTkdcblx0XHRcdD8gbmV3IHRoaXMoXG5cdFx0XHRcdFx0c3VwZXIuZnJvbUlTTyhJU09TdHJpbmcsIERFRkFVTFRfVElNRVpPTkVfU1RSSU5HKS50b0lTTygpLFxuXHRcdFx0XHRcdERFRkFVTFRfVElNRVpPTkVfU1RSSU5HLFxuXHRcdFx0XHRcdGxvY2FsZVxuXHRcdFx0ICApXG5cdFx0XHQ6IG5ldyB0aGlzKFxuXHRcdFx0XHRcdHN1cGVyLmZyb21JU09XaXRoT2Zmc2V0KElTT1N0cmluZywgREVGQVVMVF9PRkZTRVQpLnRvSVNPKCksXG5cdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRsb2NhbGVcblx0XHRcdCAgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbnN0YW50aWF0ZSBTZXJ2ZXJEYXRlVGltZSBmcm9tIGFuIElTTyBzdHJpbmcuXG5cdCAqIFRoaXMgb3ZlcnJpZGVzIGBEYXRlVGltZS5mcm9tSlNEYXRlYCByZW1vdmluZyB0aGUgbmVlZCB0byB3b3JyeSBhYm91dFxuXHQgKiB3aGV0aGVyIHRvIHVzZSBgdGltZXpvbmVgIG9yIGBvZmZzZXRgLiAgVGhpcyB3aWxsIHNpbXBseSB1c2Ugd2hhdGV2ZXIgaXNcblx0ICogcHJvdmlkZWQgYnkgdGhlIHNlcnZlciAocHJlZmVycmluZyB0aW1lem9uZSBpZiBpdHMgYXZhaWxhYmxlKS5cblx0ICpcblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcblx0ICogQHJldHVybiB7U2VydmVyRGF0ZVRpbWV9IEFuIGluc3RhbmNlIG9mIFNlcnZlckRhdGVUaW1lXG5cdCAqL1xuXHRzdGF0aWMgZnJvbUpTRGF0ZShkYXRlLCBsb2NhbGUgPSBERUZBVUxUX1ZBTElEX0xPQ0FMRSkge1xuXHRcdHJldHVybiBIQVNfVElNRVpPTkVfU1RSSU5HXG5cdFx0XHQ/IG5ldyB0aGlzKFxuXHRcdFx0XHRcdHN1cGVyLmZyb21KU0RhdGUoZGF0ZSwgREVGQVVMVF9USU1FWk9ORV9TVFJJTkcpLnRvSVNPKCksXG5cdFx0XHRcdFx0REVGQVVMVF9USU1FWk9ORV9TVFJJTkcsXG5cdFx0XHRcdFx0bG9jYWxlXG5cdFx0XHQgIClcblx0XHRcdDogbmV3IHRoaXMoXG5cdFx0XHRcdFx0c3VwZXIuZnJvbUpTRGF0ZVdpdGhPZmZzZXQoZGF0ZSwgREVGQVVMVF9PRkZTRVQpLnRvSVNPKCksXG5cdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHRsb2NhbGVcblx0XHRcdCAgKTtcblx0fVxufVxuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHN0YXJ0Q2FzZSwgaXNTdHJpbmcgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5cbi8qKlxuICogQSB2YWx1ZSBvYmplY3QgZm9yIHJlcHJlc2VudGluZyBhIGxhYmVsIHdpdGggc2luZ3VsYXIgYW5kIHBsdXJhbCBzdHJpbmdcbiAqIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGFiZWwge1xuXHRzdGF0aWMgRk9STUFUX0xPV0VSQ0FTRSA9ICdsb3dlcic7XG5cdHN0YXRpYyBGT1JNQVRfVVBQRVJDQVNFID0gJ3VwcGVyJztcblx0c3RhdGljIEZPUk1BVF9TRU5URU5DRV9DQVNFID0gJ3NlbnRlbmNlJztcblxuXHQvKipcblx0ICogVGhlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNpbmd1bGFyIGZvcm0gb2YgdGhlIGxhYmVsLlxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0c2luZ3VsYXIgPSAnJztcblxuXHQvKipcblx0ICogVGhlIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHBsdXJhbCBmb3JtIG9mIHRoZSBsYWJlbC5cblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHBsdXJhbCA9ICcnO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc2luZ3VsYXJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBsdXJhbFxuXHQgKi9cblx0Y29uc3RydWN0b3Ioc2luZ3VsYXIsIHBsdXJhbCkge1xuXHRcdHRoaXMuc2V0U2luZ3VsYXIoc2luZ3VsYXIpLnNldFBsdXJhbChwbHVyYWwpO1xuXHRcdE9iamVjdC5mcmVlemUodGhpcyk7XG5cdH1cblxuXHQvKipcblx0ICogRmx1aWQgc2V0dGVyIGZvciBzZXR0aW5nIHRoZSBzaW5ndWxhciBwcm9wZXJ0eS5cblx0ICpcblx0ICogSWYgdGhlIHNpbmd1bGFyIHByb3BlcnR5IGhhcyBhbHJlYWR5IGJlZW4gc2V0LCB0aGlzIHdpbGwgcmV0dXJuIGEgbmV3XG5cdCAqIGluc3RhbmNlIG9mIExhYmVsXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzaW5ndWxhclxuXHQgKiBAcmV0dXJuIHtMYWJlbH0gIEFuIGluc3RhbmNlIG9mIExhYmVsXG5cdCAqL1xuXHRzZXRTaW5ndWxhcihzaW5ndWxhcikge1xuXHRcdExhYmVsLmFzc2VydFN0cmluZyhzaW5ndWxhcik7XG5cdFx0aWYgKHRoaXMuc2luZ3VsYXIgIT09ICcnKSB7XG5cdFx0XHRyZXR1cm4gbmV3IExhYmVsKHNpbmd1bGFyLCB0aGlzLnBsdXJhbCk7XG5cdFx0fVxuXHRcdHRoaXMuc2luZ3VsYXIgPSBzaW5ndWxhcjtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBGbHVpZCBzZXR0ZXIgZm9yIHNldHRpbmcgdGhlIHBsdXJhbCBwcm9wZXJ0eVxuXHQgKlxuXHQgKiBJZiB0aGUgcGx1cmFsIHByb3BlcnR5IGhhcyBhbHJlYWR5IGJlZW4gc2V0LCB0aGlzIHdpbGwgcmV0dXJuIGEgbmV3XG5cdCAqIGluc3RhbmNlIG9mIGxhYmVsLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGx1cmFsXG5cdCAqIEByZXR1cm4ge0xhYmVsfSBBbiBpbnN0YW5jZSBvZiBMYWJlbFxuXHQgKi9cblx0c2V0UGx1cmFsKHBsdXJhbCkge1xuXHRcdExhYmVsLmFzc2VydFN0cmluZyhwbHVyYWwpO1xuXHRcdGlmICh0aGlzLnBsdXJhbCAhPT0gJycpIHtcblx0XHRcdHJldHVybiBuZXcgTGFiZWwodGhpcy5zaW5ndWxhciwgcGx1cmFsKTtcblx0XHR9XG5cdFx0dGhpcy5wbHVyYWwgPSBwbHVyYWw7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5IGZvcm1hdHRlZCBpbiBzZW50ZW5jZSBjYXNlLlxuXHQgKlxuXHQgKiBOb3RlLCB0aGlzIHN0cmlwcyBhbnkgYC1gIGluIGRhc2hlZCBsYWJlbHMuICBTbyBmb3IgaW5zdGFuY2UgaWYgeW91clxuXHQgKiBsYWJlbCB2YWx1ZSB3YXMgYHNvbWV0aGluZy1lbHNlYCwgdGhlIHZhbHVlIHJldHVybmVkIHdvdWxkIGJlXG5cdCAqIGBTb21ldGhpbmcgRWxzZWBcblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhciAgSWYgdHJ1ZSwgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlXG5cdCAqIHNpbmd1bGFyIHByb3BlcnR5IG90aGVyd2lzZSByZXR1cm4gdGhlIGZvcm1hdHRlZCB2YWx1ZSBvZiB0aGUgcGx1cmFsXG5cdCAqIHByb3BlcnR5LlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmcgaW4gc2VudGVuY2UgY2FzZVxuXHQgKi9cblx0YXNTZW50ZW5jZUNhc2Uoc2luZ3VsYXIgPSB0cnVlKSB7XG5cdFx0cmV0dXJuIHNpbmd1bGFyID09PSB0cnVlXG5cdFx0XHQ/IHN0YXJ0Q2FzZSh0aGlzLnNpbmd1bGFyLnRvTG93ZXJDYXNlKCkpXG5cdFx0XHQ6IHN0YXJ0Q2FzZSh0aGlzLnBsdXJhbC50b0xvd2VyQ2FzZSgpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdGhlIHZhbHVlIGZvciB0aGUgcHJvcGVydHkgZm9ybWF0dGVkIGluIGxvd2VyIGNhc2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXIgIElmIHRydWUsIHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlIG9mIHRoZVxuXHQgKiBzaW5ndWxhciBwcm9wZXJ0eSBvdGhlcndpc2UgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlIHBsdXJhbFxuXHQgKiBwcm9wZXJ0eS5cblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5nIGluIGxvd2VyIGNhc2Vcblx0ICovXG5cdGFzTG93ZXJDYXNlKHNpbmd1bGFyID0gdHJ1ZSkge1xuXHRcdHJldHVybiBzaW5ndWxhclxuXHRcdFx0PyB0aGlzLnNpbmd1bGFyLnRvTG93ZXJDYXNlKClcblx0XHRcdDogdGhpcy5wbHVyYWwudG9Mb3dlckNhc2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdGhlIHZhbHVlIGZvciB0aGUgcHJvcGVydHkgZm9ybWF0dGVkIGluIHVwcGVyIGNhc2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXIgIElmIHRydWUsIHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlIG9mIHRoZVxuXHQgKiBzaW5ndWxhciBwcm9wZXJ0eSBvdGhlcndpc2UgcmV0dXJuIHRoZSBmb3JtYXR0ZWQgdmFsdWUgb2YgdGhlIHBsdXJhbFxuXHQgKiBwcm9wZXJ0eS5cblx0ICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5nIGluIHVwcGVyIGNhc2Vcblx0ICovXG5cdGFzVXBwZXJDYXNlKHNpbmd1bGFyID0gdHJ1ZSkge1xuXHRcdHJldHVybiBzaW5ndWxhclxuXHRcdFx0PyB0aGlzLnNpbmd1bGFyLnRvVXBwZXJDYXNlKClcblx0XHRcdDogdGhpcy5wbHVyYWwudG9VcHBlckNhc2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdGhlIHZhbHVlIGZvciB0aGUgcHJvcGVydHkgZm9ybWF0dGVkIGFjY29yZGluZyB0byB0aGUgcHJvdmlkZWRcblx0ICogZm9ybWF0VHlwZS5cblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhciBJZiB0cnVlLCByZXR1cm4gdGhlIGZvcm1hdHRlZCB2YWx1ZSBvZiB0aGVcblx0ICogc2luZ3VsYXIgcHJvcGVydHkgb3RoZXJ3aXNlIHJldHVybiB0aGUgZm9ybWF0dGVkIHZhbHVlIG9mIHRoZSBwbHVyYWxcblx0ICogcHJvcGVydHkuXG5cdCAqIEBwYXJhbSB7KCdzZW50ZW5jZSd8J2xvd2VyJ3wndXBwZXInKX0gZm9ybWF0VHlwZVxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmcgZm9ybWF0dGVkIGFjY29yZGluZyB0byBmb3JtYXRUeXBlXG5cdCAqL1xuXHRhc0Zvcm1hdHRlZChzaW5ndWxhciA9IHRydWUsIGZvcm1hdFR5cGUgPSBMYWJlbC5GT1JNQVRfU0VOVEVOQ0VfQ0FTRSkge1xuXHRcdHN3aXRjaCAoZm9ybWF0VHlwZSkge1xuXHRcdFx0Y2FzZSBMYWJlbC5GT1JNQVRfU0VOVEVOQ0VfQ0FTRTpcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXNTZW50ZW5jZUNhc2Uoc2luZ3VsYXIpO1xuXHRcdFx0Y2FzZSBMYWJlbC5GT1JNQVRfTE9XRVJDQVNFOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hc0xvd2VyQ2FzZShzaW5ndWxhcik7XG5cdFx0XHRjYXNlIExhYmVsLkZPUk1BVF9VUFBFUkNBU0U6XG5cdFx0XHRcdHJldHVybiB0aGlzLmFzVXBwZXJDYXNlKHNpbmd1bGFyKTtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHdhcm5pbmcoXG5cdFx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdFx0J0Zvcm1hdCB0eXBlIG11c3QgYmUgb25lIG9mICcgK1xuXHRcdFx0XHRcdFx0J0xhYmVsLkZPUk1BVF9TRU5URU5DRV9DQVNFLCBMYWJlbC5GT1JNQVRfVVBQRVJDQVNFLCAnICtcblx0XHRcdFx0XHRcdCdvciBMYWJlbC5GT1JNQVRfTE9XRVJDQVNFJ1xuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hc1NlbnRlbmNlQ2FzZShzaW5ndWxhcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSBzdHJpbmcgb3Igbm90LlxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IHZhbHVlXG5cdCAqIEB0aHJvd3MgVHlwZUVycm9yXG5cdCAqL1xuXHRzdGF0aWMgYXNzZXJ0U3RyaW5nKHZhbHVlKSB7XG5cdFx0aWYgKCFpc1N0cmluZyh2YWx1ZSkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdJbmNvbWluZyBsYWJlbCB2YWx1ZSAoJyArIHZhbHVlICsgJykgbXVzdCcgKyAnIGJlIGEgc3RyaW5nJ1xuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBMYWJlbCB0aGF0IGhhcyB0aGUgc2FtZSB2YWx1ZSBmb3Igc2luZ2x1YXIgYW5kXG5cdCAqIHBsdXJhbCBwcm9wZXJ0aWVzIGZvciB0aGUgcHJvdmlkZWQgYXJndW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbFxuXHQgKiBAcmV0dXJuIHtMYWJlbH0gIEEgTGFiZWwgaW5zdGFuY2Vcblx0ICovXG5cdHN0YXRpYyBmcm9tU2FtZVNpbmdsZUFuZFBsdXJhbCA9IChsYWJlbCkgPT4ge1xuXHRcdHJldHVybiBuZXcgTGFiZWwobGFiZWwsIGxhYmVsKTtcblx0fTtcbn1cbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBEZWNpbWFsIH0gZnJvbSAnZGVjaW1hbC5qcy1saWdodCc7XG5pbXBvcnQgKiBhcyBBY2NvdW50aW5nIGZyb20gJ2FjY291bnRpbmctanMnO1xuaW1wb3J0IGlzU2hhbGxvd0VxdWFsIGZyb20gJ0B3b3JkcHJlc3MvaXMtc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgeyBFeGNlcHRpb24gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaW5zdGFuY2VPZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgc3ByaW50ZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgQ3VycmVuY3kgfSBmcm9tICcuL2N1cnJlbmN5JztcblxuLyoqXG4gKiBBc3NlcnRzIGlmIGluY29taW5nIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIE1vbmV5XG4gKlxuICogQHBhcmFtIHtNb25leX0gbW9uZXlcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAqL1xuY29uc3QgYXNzZXJ0TW9uZXkgPSAobW9uZXkpID0+IHtcblx0aWYgKCFpbnN0YW5jZU9mKG1vbmV5LCAnTW9uZXknKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHQnSW5zdGFuY2Ugb2YgTW9uZXkgcmVxdWlyZWQuIFJlY2VpdmVkOiAnICsgSlNPTi5zdHJpbmdpZnkobW9uZXkpXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIGlmIGluY29taW5nIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIEN1cnJlbmN5XG4gKlxuICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAqL1xuY29uc3QgYXNzZXJ0Q3VycmVuY3kgPSAoY3VycmVuY3kpID0+IHtcblx0aWYgKCFpbnN0YW5jZU9mKGN1cnJlbmN5LCAnQ3VycmVuY3knKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHQnSW5zdGFuY2Ugb2YgQ3VycmVuY3kgcmVxdWlyZWQuIFJlY2VpdmVkOiAnICtcblx0XHRcdFx0SlNPTi5zdHJpbmdpZnkoY3VycmVuY3kpXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIGlmIHR3byBjdXJyZW5jaWVzIGFyZSBzaGFsbG93IGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5QVxuICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lCXG4gKiBAdGhyb3dzIHtFeGNlcHRpb259XG4gKi9cbmNvbnN0IGFzc2VydFNhbWVDdXJyZW5jeSA9IChjdXJyZW5jeUEsIGN1cnJlbmN5QikgPT4ge1xuXHRhc3NlcnRDdXJyZW5jeShjdXJyZW5jeUEpO1xuXHRhc3NlcnRDdXJyZW5jeShjdXJyZW5jeUIpO1xuXHRpZiAoIWlzU2hhbGxvd0VxdWFsKGN1cnJlbmN5QS50b0pTT04oKSwgY3VycmVuY3lCLnRvSlNPTigpKSkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oJ1Byb3ZpZGVkIGN1cnJlbmNpZXMgYXJlIG5vdCBlcXVpdmFsZW50LicpO1xuXHR9XG59O1xuXG4vKipcbiAqIEEgVmFsdWUgb2JqZWN0IHJlcHJlc2VudGluZyBtb25leSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbmV5IHtcblx0LyoqXG5cdCAqIGJlY2F1c2UgbWluaWZpY2F0aW9uIGRlc3Ryb3lzIGNsYXNzIG5hbWVzIGFuZCByZW5kZXJzIGluc3RhbmVPZiB1c2VsZXNzXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRkaXNwbGF5TmFtZSA9ICdNb25leSc7XG5cblx0LyoqXG5cdCAqIEludGVybmFsbHkgdGhlIGFtb3VudCBpcyBzdG9yZWQgYXMgYSBEZWNpbWFsIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAdHlwZSB7RGVjaW1hbH1cblx0ICovXG5cdGFtb3VudDtcblxuXHQvKipcblx0ICogSW50ZXJuYWxseSB0aGUgYW1vdW50IGlzIHN0b3JlZCBhcyBhIEN1cnJlbmN5IGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAdHlwZSB7Q3VycmVuY3l9XG5cdCAqL1xuXHRjdXJyZW5jeTtcblxuXHQvKipcblx0ICogRm9ybWF0dGVyIG9iamVjdCBmb3IgbW9uZXkgdmFsdWVzLlxuXHQgKlxuXHQgKiBAdHlwZSB7e319XG5cdCAqL1xuXHRmb3JtYXR0ZXIgPSB7fTtcblxuXHQvKipcblx0ICogUm91bmRzIGF3YXkgZnJvbSB6ZXJvXG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdGF0aWMgUk9VTkRfVVAgPSBEZWNpbWFsLlJPVU5EX1VQO1xuXG5cdC8qKlxuXHQgKiBSb3VuZHMgdG93YXJkcyB6ZXJvXG5cdCAqXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHRzdGF0aWMgUk9VTkRfRE9XTiA9IERlY2ltYWwuUk9VTkRfRE9XTjtcblxuXHQvKipcblx0ICogUm91bmRzIHRvd2FyZHMgaW5maW5pdHlcblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9DRUlMID0gRGVjaW1hbC5ST1VORF9DRUlMO1xuXG5cdC8qKlxuXHQgKiBSb3VuZHMgdG93YXJkcyAtSW5maW5pdHlcblx0ICpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBST1VORF9GTE9PUiA9IERlY2ltYWwuUk9VTkRfRkxPT1I7XG5cblx0LyoqXG5cdCAqIFJvdW5kcyB0b3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgcm91bmRzIGF3YXkgZnJvbSB6ZXJvLlxuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIFJPVU5EX0hBTEZfVVAgPSBEZWNpbWFsLlJPVU5EX0hBTEZfVVA7XG5cblx0LyoqXG5cdCAqIFJvdW5kcyB0b3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCByb3VuZHMgdG93YXJkcyB6ZXJvLlxuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIFJPVU5EX0hBTEZfRE9XTiA9IERlY2ltYWwuUk9VTkRfSEFMRl9ET1dOO1xuXG5cdC8qKlxuXHQgKiBSb3VuZHMgdG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHJvdW5kcyB0b3dhcmRzIGV2ZW5cblx0ICogbmVpZ2hib3VyLlxuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIFJPVU5EX0hBTEZfRVZFTiA9IERlY2ltYWwuUk9VTkRfSEFMRl9FVkVOO1xuXG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gYW1vdW50XG5cdCAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5XG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihhbW91bnQsIGN1cnJlbmN5KSB7XG5cdFx0dGhpcy5kaXNwbGF5TmFtZSA9ICdNb25leSc7XG5cdFx0dGhpcy5zZXRDdXJyZW5jeShjdXJyZW5jeSkuc2V0QW1vdW50KGFtb3VudCkuc2V0Rm9ybWF0dGVyKCk7XG5cdFx0T2JqZWN0LmZyZWV6ZSh0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIGN1cnJlbmN5IHByb3BlcnR5XG5cdCAqXG5cdCAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5XG5cdCAqIEByZXR1cm4ge01vbmV5fSBFaXRoZXIgdGhpcyBNb25leSBvciBuZXcgTW9uZXkgZGVwZW5kaW5nIG9uIHN0YXRlIG9mXG5cdCAqIHByb3BlcnR5LlxuXHQgKi9cblx0c2V0Q3VycmVuY3koY3VycmVuY3kpIHtcblx0XHRNb25leS5hc3NlcnRDdXJyZW5jeShjdXJyZW5jeSk7XG5cdFx0Ly8gaWYgdGhlcmUncyBhbHJlYWR5IGEgY3VycmVuY3kgc2V0LCB0aGVuIHJldHVybiBhIG5ldyBvYmplY3QuXG5cdFx0aWYgKGluc3RhbmNlT2YodGhpcy5jdXJyZW5jeSwgJ0N1cnJlbmN5JykpIHtcblx0XHRcdHJldHVybiBuZXcgTW9uZXkodGhpcy5hbW91bnQsIGN1cnJlbmN5KTtcblx0XHR9XG5cdFx0dGhpcy5jdXJyZW5jeSA9IGN1cnJlbmN5O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgYW1vdW50IHByb3BlcnR5XG5cdCAqXG5cdCAqIEBwYXJhbSB7RGVjaW1hbHxudW1iZXJ8c3RyaW5nfSBhbW91bnRcblx0ICogQHJldHVybiB7TW9uZXl9IEVpdGhlciB0aGlzIE1vbmV5IG9yIG5ldyBNb25leSBkZXBlbmRpbmcgb24gc3RhdGUgb2YgdGhlXG5cdCAqIHByb3BlcnR5LlxuXHQgKi9cblx0c2V0QW1vdW50KGFtb3VudCkge1xuXHRcdGNvbnN0IHZhbHVlID0gaW5zdGFuY2VPZihhbW91bnQsICdEZWNpbWFsJylcblx0XHRcdD8gYW1vdW50LnRvTnVtYmVyKClcblx0XHRcdDogYW1vdW50O1xuXHRcdC8vIGlmIHRoZXJlJ3MgYWxyZWFkeSBhbiBhbW91bnQgc2V0LCB0aGVuIHJldHVybiBhIG5ldyBvYmplY3QuXG5cdFx0aWYgKGluc3RhbmNlT2YodGhpcy5hbW91bnQsICdEZWNpbWFsJykpIHtcblx0XHRcdHJldHVybiBuZXcgTW9uZXkobmV3IERlY2ltYWwodmFsdWUpLCB0aGlzLmN1cnJlbmN5KTtcblx0XHR9XG5cdFx0dGhpcy5hbW91bnQgPSBuZXcgRGVjaW1hbCh2YWx1ZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBmb3JtYXR0ZXIgZm9yIG1vbmV5IHZhbHVlc1xuXHQgKlxuXHQgKiBAcmV0dXJuIHtNb25leX0gQW4gaW5zdGFuY2Ugb2YgdGhpcyBvYmplY3QuXG5cdCAqL1xuXHRzZXRGb3JtYXR0ZXIoKSB7XG5cdFx0Ly8gb25seSBpbml0aWFsaXplIGlmIGl0cyBub3QgYWxyZWFkeSBpbml0aWFsaXplZFxuXHRcdGlmIChpc0VtcHR5KHRoaXMuZm9ybWF0dGVyKSkge1xuXHRcdFx0dGhpcy5mb3JtYXR0ZXIgPSB7IC4uLkFjY291bnRpbmcgfTtcblx0XHRcdHRoaXMuZm9ybWF0dGVyLnNldHRpbmdzID0ge1xuXHRcdFx0XHQuLi50aGlzLmZvcm1hdHRlci5zZXR0aW5ncyxcblx0XHRcdFx0Li4udGhpcy5jdXJyZW5jeS50b0FjY291bnRpbmdTZXR0aW5ncygpLmN1cnJlbmN5LFxuXHRcdFx0fTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhpcyBNb25leSBhcyBpdHMgc3VidW5pdHMuXG5cdCAqXG5cdCAqIEByZXR1cm4ge251bWJlcn0gSWYgdGhlIHN1YnVuaXRzIGlzIDEwMCBhbmQgdGhlIHZhbHVlIGlzIC40NSxcblx0ICogdGhpcyByZXR1cm5zIDQ1MFxuXHQgKi9cblx0dG9TdWJ1bml0cygpIHtcblx0XHRyZXR1cm4gdGhpcy5hbW91bnQudG9OdW1iZXIoKSAqIHRoaXMuY3VycmVuY3kuc3VidW5pdHM7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBtb25leSBvYmplY3QgZXF1YWxzIHRoaXMgbW9uZXkgb2JqZWN0LlxuXHQgKiBDb21wYXJlcyBib3RoIGFtb3VudCBhbmQgY3VycmVuY3kuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhpcyBpcyBlcXVhbC4gRmFsc2UgbWVhbnMgaXQgaXNuJ3QuXG5cdCAqL1xuXHRlcXVhbHMob3RoZXIpIHtcblx0XHRNb25leS5hc3NlcnRNb25leShvdGhlcik7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmVxdWFscyhvdGhlci5hbW91bnQpICYmIHRoaXMuaGFzU2FtZUN1cnJlbmN5KG90aGVyKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgcHJvdmlkZWQgTW9uZXkgb2JqZWN0J3MgQ3VycmVuY3kgZXF1YWxzIHRoaXMgTW9uZXlcblx0ICogb2JqZWN0J3MgQ3VycmVuY3kuXG5cdCAqXG5cdCAqIFRoaXMgZG9lcyBhIHNoYWxsb3cgY29tcGFyaXNvbiBvbiB0aGUgc2VyaWFsaXplZCB2YWx1ZXMgZm9yIHRoZSBjdXJyZW5jeVxuXHQgKiBvYmplY3RzLiAgVGhhdCB3YXkgaWYgdGhlIGN1cnJlbmNpZXMgYXJlIGRpZmZlcmVudCBpbnN0YW5jZXMsIGJ1dCBzaGFyZVxuXHQgKiB0aGUgc2FtZSBpbnRlcm5hbCB2YWx1ZSwgdGhleSBhcmUgY29uc2lkZXJlZCBlcXVhbC5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGUgY3VycmVuY2llcyBhcmUgZXF1YWwuXG5cdCAqL1xuXHRoYXNTYW1lQ3VycmVuY3kob3RoZXIpIHtcblx0XHRNb25leS5hc3NlcnRNb25leShvdGhlcik7XG5cdFx0cmV0dXJuIGlzU2hhbGxvd0VxdWFsKHRoaXMuY3VycmVuY3kudG9KU09OKCksIG90aGVyLmN1cnJlbmN5LnRvSlNPTigpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgb25lIE1vbmV5IG9iamVjdCB0byB0aGlzIE1vbmV5IG9iamVjdFxuXHQgKlxuXHQgKiBAcGFyYW0ge01vbmV5fSBvdGhlclxuXHQgKiBAcmV0dXJuIHtNb25leX0gUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiBNb25leS5cblx0ICovXG5cdGFkZChvdGhlcikge1xuXHRcdE1vbmV5LmFzc2VydFVzaW5nU2FtZUN1cnJlbmN5KHRoaXMsIG90aGVyKTtcblx0XHRyZXR1cm4gbmV3IE1vbmV5KHRoaXMuYW1vdW50LnBsdXMob3RoZXIuYW1vdW50KSwgdGhpcy5jdXJyZW5jeSk7XG5cdH1cblxuXHQvKipcblx0ICogU3VidHJhY3Qgb25lIE1vbmV5IG9iamVjdCBmcm9tIHRoaXMgTW9uZXkgb2JqZWN0XG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge01vbmV5fSBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIE1vbmV5XG5cdCAqL1xuXHRzdWJ0cmFjdChvdGhlcikge1xuXHRcdE1vbmV5LmFzc2VydFVzaW5nU2FtZUN1cnJlbmN5KHRoaXMsIG90aGVyKTtcblx0XHRyZXR1cm4gbmV3IE1vbmV5KHRoaXMuYW1vdW50Lm1pbnVzKG90aGVyLmFtb3VudCksIHRoaXMuY3VycmVuY3kpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE11bHRpcGx5IHRoaXMgbW9uZXkgb2JqZWN0IGJ5IHRoZSBwcm92aWRlZCBtdWx0aXBsaWVyIHZhbHVlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd8RGVjaW1hbH0gbXVsdGlwbGllclxuXHQgKiBAcmV0dXJuIHtNb25leX0gUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiBNb25leVxuXHQgKi9cblx0bXVsdGlwbHkobXVsdGlwbGllcikge1xuXHRcdHJldHVybiBuZXcgTW9uZXkodGhpcy5hbW91bnQudGltZXMobXVsdGlwbGllciksIHRoaXMuY3VycmVuY3kpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERpdmlkZSB0aGlzIG1vbmV5IG9iamVjdCBieSB0aGUgcHJvdmlkZWQgZGl2aXNvciB2YWx1ZS5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfERlY2ltYWx9IGRpdmlzb3Jcblx0ICogQHJldHVybiB7TW9uZXl9IFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgTW9uZXlcblx0ICovXG5cdGRpdmlkZShkaXZpc29yKSB7XG5cdFx0cmV0dXJuIG5ldyBNb25leSh0aGlzLmFtb3VudC5kaXZpZGVkQnkoZGl2aXNvciksIHRoaXMuY3VycmVuY3kpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFsbG9jYXRlcyBmdW5kIGJhc2VzIG9uIHRoZSByYXRpb3MgcHJvdmlkZWQgcmV0dXJuaW5nIGFuIGFycmF5IG9mIE1vbmV5XG5cdCAqIG9iamVjdHMgYXMgYSBwcm9kdWN0IG9mIHRoZSBhbGxvY2F0aW9uLlxuXHQgKlxuXHQgKiBFeGFtcGxlOiBzcGxpdHRpbmcgYSBwcm92aWRlZCBNb25leSBvYmplY3QgdGhyZWUgZXF1YWwgd2F5cy5cblx0ICpcblx0ICogYGBgXG5cdCAqIGNvbnN0IHNwbGl0TW9uZXkgPSBtb25leUluc3RhbmNlLmFsbG9jYXRlKCBbIDEsIDEsIDEgXSApO1xuXHQgKiBgYGBcblx0ICpcblx0ICogRXhhbXBsZTogc3BsaXR0aW5nIGEgcHJvdmlkZWQgTW9uZXkgb2JqZWN0IHR3byB3YXlzIHdpdGggb25lIGhhdmluZyA3NSVcblx0ICogb2YgdGhlIGFsbG9jYXRpb24uXG5cdCAqXG5cdCAqIGBgYFxuXHQgKiBjb25zdCBzcGxpdE1vbmV5ID0gbW9uZXlJbnN0YW5jZS5hbGxvY2F0ZSggWyA3NSwgMjUgXSApO1xuXHQgKiBgYGBcblx0ICpcblx0ICogTm90ZTogQXJyYXkgdmFsdWVzIGZvciByYXRpb3MgYXJlIHNpbXBseSB0b3RhbGxlZCBhbmQgdGhlbiBlYWNoIGVsZW1lbnRcblx0ICogaXMgY29uc2lkZXJlZCBhIGZyYWN0aW9uIG9mIHRoZSB0b3RhbCB2YWx1ZS4gIFNvIGhvdyB5b3Ugc3VibWl0IHJhdGlvXG5cdCAqIHZhbHVlcyBpcyB1cCB0byB5b3UgZm9yIHdoYXRldmVyIGlzIG1vc3QgY2xlYXIgdG8geW91LlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcltdfSByYXRpb3Ncblx0ICogQHJldHVybiB7TW9uZXlbXX0gQW4gYXJyYXkgb2YgTW9uZXkgb2JqZWN0c1xuXHQgKi9cblx0YWxsb2NhdGUocmF0aW9zKSB7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0Y29uc3QgcmVzdWx0cyA9IFtdO1xuXHRcdGNvbnN0IGNvbnZlcnRlZFJhdGlvcyA9IFtdO1xuXHRcdGxldCByZW1haW5kZXIgPSBuZXcgRGVjaW1hbChzZWxmLnRvU3VidW5pdHMoKSk7XG5cdFx0bGV0IHRvdGFsID0gbmV3IERlY2ltYWwoMCk7XG5cdFx0Ly8gY29udmVydCByYXRpb3MgdG8gZGVjaW1hbCBhbmQgZ2VuZXJhdGUgdG90YWwuXG5cdFx0cmF0aW9zLmZvckVhY2goKHJhdGlvKSA9PiB7XG5cdFx0XHRjb252ZXJ0ZWRSYXRpb3MucHVzaChcblx0XHRcdFx0aW5zdGFuY2VPZihyYXRpbywgJ0RlY2ltYWwnKSA/IHJhdGlvIDogbmV3IERlY2ltYWwocmF0aW8pXG5cdFx0XHQpO1xuXHRcdFx0dG90YWwgPSB0b3RhbC5wbHVzKHJhdGlvKTtcblx0XHR9KTtcblx0XHRjb252ZXJ0ZWRSYXRpb3MuZm9yRWFjaCgocmF0aW8pID0+IHtcblx0XHRcdGNvbnN0IHNoYXJlID0gbmV3IERlY2ltYWwoXG5cdFx0XHRcdE1hdGguZmxvb3IoXG5cdFx0XHRcdFx0KHNlbGYudG9TdWJ1bml0cygpICogcmF0aW8udG9OdW1iZXIoKSkgLyB0b3RhbC50b051bWJlcigpXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0XHRyZXN1bHRzLnB1c2goXG5cdFx0XHRcdG5ldyBNb25leShcblx0XHRcdFx0XHRzaGFyZS5kaXZpZGVkQnkodGhpcy5jdXJyZW5jeS5zdWJ1bml0cyksXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW5jeVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdFx0cmVtYWluZGVyID0gcmVtYWluZGVyLm1pbnVzKHNoYXJlKTtcblx0XHR9KTtcblx0XHRmb3IgKGxldCBpID0gMDsgcmVtYWluZGVyLmdyZWF0ZXJUaGFuKDApOyBpKyspIHtcblx0XHRcdHJlc3VsdHNbaV0gPSBuZXcgTW9uZXkoXG5cdFx0XHRcdG5ldyBEZWNpbWFsKHJlc3VsdHNbaV0udG9TdWJ1bml0cygpKVxuXHRcdFx0XHRcdC5wbHVzKDEpXG5cdFx0XHRcdFx0LmRpdmlkZWRCeSh0aGlzLmN1cnJlbmN5LnN1YnVuaXRzKSxcblx0XHRcdFx0dGhpcy5jdXJyZW5jeVxuXHRcdFx0KTtcblx0XHRcdHJlbWFpbmRlciA9IHJlbWFpbmRlci5taW51cygxKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgdHdvIGluc3RhbmNlcyBvZiBNb25leS5cblx0ICpcblx0ICogTm90ZTogXCJzYW1lXCIgbWVhbnMgaGFzIGVxdWFsIHZhbHVlIGFuZCBlcXVhbCBjdXJyZW5jeS4gIEl0IGRvZXMgbm90IG1lYW5cblx0ICogaWRlbnRpY2FsIGluc3RhbmNlcy5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7bnVtYmVyfSAwIGlmIHRoZXkgYXJlIHRoZSBzYW1lLCAxIGlmIHRoaXMgaXMgZ3JlYXRlciB0aGFuXG5cdCAqIG90aGVyIGFuZCAtMSBpZiBvdGhlciBpcyBncmVhdGVyIHRoYW4gdGhpcy5cblx0ICovXG5cdGNvbXBhcmUob3RoZXIpIHtcblx0XHQvL3F1aWNrbHkgcmV0dXJuIDAgaWYgaWRlbnRpY2FsXG5cdFx0aWYgKHRoaXMgPT09IG90aGVyKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cdFx0TW9uZXkuYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3kodGhpcywgb3RoZXIpO1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5jb21wYXJlZFRvKG90aGVyLmFtb3VudCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgd2hldGhlciB0aGlzIE1vbmV5IG9iamVjdCBpcyBncmVhdGVyIHRoYW4gdGhlIG90aGVyIE1vbmV5IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoaXMgaXMgZ3JlYXRlciB0aGFuIG90aGVyLlxuXHQgKi9cblx0Z3JlYXRlclRoYW4ob3RoZXIpIHtcblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSh0aGlzLCBvdGhlcik7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmdyZWF0ZXJUaGFuKG90aGVyLmFtb3VudCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgd2hldGhlciB0aGlzIE1vbmV5IG9iamVjdCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIG90aGVyXG5cdCAqIE1vbmV5IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoaXMgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBvdGhlci5cblx0ICovXG5cdGdyZWF0ZXJUaGFuT3JFcXVhbFRvKG90aGVyKSB7XG5cdFx0TW9uZXkuYXNzZXJ0VXNpbmdTYW1lQ3VycmVuY3kodGhpcywgb3RoZXIpO1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5ncmVhdGVyVGhhbk9yRXF1YWxUbyhvdGhlci5hbW91bnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbXBhcmVzIHdoZXRoZXIgdGhpcyBNb25leSBvYmplY3QgaXMgbGVzcyB0aGFuIHRoZSBvdGhlciBNb25leSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGlzIGlzIGxlc3MgdGhhbiBvdGhlclxuXHQgKi9cblx0bGVzc1RoYW4ob3RoZXIpIHtcblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSh0aGlzLCBvdGhlcik7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50Lmxlc3NUaGFuKG90aGVyLmFtb3VudCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29tcGFyZXMgd2hldGhlciB0aGlzIE1vbmV5IG9iamVjdCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIG90aGVyXG5cdCAqIE1vbmV5IG9iamVjdC5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gb3RoZXJcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoaXMgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIG90aGVyLlxuXHQgKi9cblx0bGVzc1RoYW5PckVxdWFsVG8ob3RoZXIpIHtcblx0XHRNb25leS5hc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSh0aGlzLCBvdGhlcik7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50Lmxlc3NUaGFuT3JFcXVhbFRvKG90aGVyLmFtb3VudCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoaXMgb2JqZWN0IGhhcyB0aGUgdmFsdWUgb2YgMFxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBJZiB0cnVlIHRoZW4gdGhlIHZhbHVlIGlzIDAuXG5cdCAqL1xuXHRpc1plcm8oKSB7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmlzWmVybygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyBpZiB0aGUgdmFsdWUgaW4gdGhpcyBNb25leSBvYmplY3QgaXMgbmVnYXRpdmUuXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRydWUgdGhlbiB0aGUgdmFsdWUgaXMgbmVnYXRpdmUuXG5cdCAqL1xuXHRpc05lZ2F0aXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC5pc05lZ2F0aXZlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIGlmIHRoZSB2YWx1ZSBpbiB0aGlzIE1vbmV5IG9iamVjdCBpcyBwb3NpdGl2ZS5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdHJ1ZSB0aGVuIHRoZSB2YWx1ZSBpcyBwb3NpdGl2ZS5cblx0ICovXG5cdGlzUG9zaXRpdmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LmlzUG9zaXRpdmUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGlzIE1vbmV5IG9iamVjdCBhcyBhIG51bWJlciBwcmltaXRpdmUuXG5cdCAqXG5cdCAqIEByZXR1cm4ge251bWJlcn0gUmV0dXJucyBhIG51bWJlci5cblx0ICovXG5cdHRvTnVtYmVyKCkge1xuXHRcdHJldHVybiB0aGlzLmFtb3VudC50b051bWJlcigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGlzIE1vbmV5IG9iamVjdCBpbiBub3JtYWwgKGZpeGVkLXBvaW50KSBub3RhdGlvblxuXHQgKiByb3VuZGVkIHRvIGBkZWNpbWFsUGxhY2VzYCB1c2luZyBgcm91bmRpbmdgIG1vZGUuXG5cdCAqXG5cdCAqIElmIHRoZSB2YWx1ZSBvZiB0aGlzIGluc3RhbmNlIGluIG5vcm1hbCBub3RhdGlvbiBoYXMgZmV3ZXIgdGhhblxuXHQgKiBkZWNpbWFsUGxhY2VzIGZyYWN0aW9uIGRpZ2l0cywgdGhlIHJldHVybiB2YWx1ZSB3aWxsIGJlIGFwcGVuZGVkIHdpdGhcblx0ICogemVyb3MgYWNjb3JkaW5nbHkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZWNpbWFsUGxhY2VzIFRoZSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgdG8gcm91bmQgdG8uXG5cdCAqIElmIG5vdCBwcm92aWRlZCB1c2VzIHRoZSBpbnRlcm5hbCBkZWNpbWFsIHBsYWNlIHZhbHVlLlxuXHQgKiBAcGFyYW0ge251bWJlcn0gcm91bmRpbmcgV2hhdCByb3VuZGluZyB0eXBlIHRvIHVzZSAoMC04KS4gIFVzZSBNb25leSBST1VORFxuXHQgKiBjb25zdGFudHMuICBEZWZhdWx0cyB0byBNb25leS5ST1VORF9IQUxGX1VQXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgTW9uZXlcblx0ICogaW4gbm9ybWFsIChmaXhlZC1wb2ludCkgbm90YXRpb24gcm91bmRlZCB0byBkZWNpbWFsIHBsYWNlcyB1c2luZ1xuXHQgKiByb3VuZGluZyBtb2RlLlxuXHQgKi9cblx0dG9GaXhlZChkZWNpbWFsUGxhY2VzLCByb3VuZGluZyA9IE1vbmV5LlJPVU5EX0hBTEZfVVApIHtcblx0XHRkZWNpbWFsUGxhY2VzID0gZGVjaW1hbFBsYWNlcyB8fCB0aGlzLmN1cnJlbmN5LmRlY2ltYWxQbGFjZXM7XG5cdFx0cmV0dXJuIHRoaXMuYW1vdW50LnRvRml4ZWQoZGVjaW1hbFBsYWNlcywgcm91bmRpbmcpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYSBuZXcgTW9uZXkgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgTW9uZXkgcm91bmRlZFxuXHQgKiB0byBhIHdob2xlIG51bWJlciB1c2luZyByb3VuZGluZyBtb2RlIHJvdW5kaW5nIHNldCBvbiB0aGUgb3JpZ2luYWxcblx0ICogRGVjaW1hbCBhbW91bnQuXG5cdCAqXG5cdCAqIEByZXR1cm4ge01vbmV5fSBBIG5ldyBNb25leSBvYmplY3Rcblx0ICovXG5cdHRvSW50ZWdlck1vbmV5KCkge1xuXHRcdHJldHVybiBuZXcgTW9uZXkodGhpcy5hbW91bnQudG9JbnRlZ2VyKCksIHRoaXMuY3VycmVuY3kpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoaXMgTW9uZXkgb2JqZWN0IGFzIGEgZm9ybWF0dGVkIHN0cmluZyBhY2NvcmRpbmdcblx0ICogdG8gdGhlIGN1cnJlbmN5IGNvbmZpZ3VyYXRpb24uXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gUmV0dXJucyBhIGZvcm1hdHRlZCBzdHJpbmcgYWNjb3JkaW5nIHRvIEN1cnJlbmN5LlxuXHQgKi9cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZm9ybWF0dGVyLmZvcm1hdChcblx0XHRcdHRoaXMuYW1vdW50LnRvTnVtYmVyKCksXG5cdFx0XHR0aGlzLmZvcm1hdHRlci5zZXR0aW5nc1xuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQHJldHVybiB7IE9iamVjdCB9IFJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGUgc2VyaWFsaXplZFxuXHQgKiB2YWx1ZSBvZiB0aGlzIG9iamVjdC5cblx0ICovXG5cdHRvSlNPTigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0YW1vdW50OiB0aGlzLmFtb3VudC50b0pTT04oKSxcblx0XHRcdGN1cnJlbmN5OiB0aGlzLmN1cnJlbmN5LnRvSlNPTigpLFxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQXNzZXJ0cyBpZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgTW9uZXkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TW9uZXl9IG1vbmV5XG5cdCAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cblx0ICovXG5cdHN0YXRpYyBhc3NlcnRNb25leSA9IChtb25leSkgPT4ge1xuXHRcdGFzc2VydE1vbmV5KG1vbmV5KTtcblx0fTtcblxuXHQvKipcblx0ICogQXNzZXJ0cyBpZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgQ3VycmVuY3kuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5XG5cdCAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cblx0ICovXG5cdHN0YXRpYyBhc3NlcnRDdXJyZW5jeSA9IChjdXJyZW5jeSkgPT4ge1xuXHRcdGFzc2VydEN1cnJlbmN5KGN1cnJlbmN5KTtcblx0fTtcblxuXHQvKipcblx0ICogQXNzZXJ0cyBpZiB0aGUgcHJvdmlkZWQgdmFsdWVzIGFyZSBib3RoIE1vbmV5IG9iamVjdHMgYW5kIGhhdmUgRXF1YWxcblx0ICogQ3VycmVuY3kgb2JqZWN0cy5cblx0ICpcblx0ICogQHBhcmFtIHtNb25leX0gdGhpc01vbmV5XG5cdCAqIEBwYXJhbSB7TW9uZXl9IG90aGVyTW9uZXlcblx0ICogQHRocm93cyB7VHlwZUVycm9yfVxuXHQgKi9cblx0c3RhdGljIGFzc2VydFVzaW5nU2FtZUN1cnJlbmN5ID0gKHRoaXNNb25leSwgb3RoZXJNb25leSkgPT4ge1xuXHRcdGFzc2VydE1vbmV5KHRoaXNNb25leSk7XG5cdFx0YXNzZXJ0TW9uZXkob3RoZXJNb25leSk7XG5cdFx0YXNzZXJ0U2FtZUN1cnJlbmN5KHRoaXNNb25leS5jdXJyZW5jeSwgb3RoZXJNb25leS5jdXJyZW5jeSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEFzc2VydHMgaWYgdHdvIGN1cnJlbmNpZXMgYXJlIHNoYWxsb3cgZXF1YWwuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Q3VycmVuY3l9IGN1cnJlbmN5QVxuXHQgKiBAcGFyYW0ge0N1cnJlbmN5fSBjdXJyZW5jeUJcblx0ICogQHRocm93cyB7RXhjZXB0aW9ufVxuXHQgKi9cblx0c3RhdGljIGFzc2VydFNhbWVDdXJyZW5jeSA9IChjdXJyZW5jeUEsIGN1cnJlbmN5QikgPT4ge1xuXHRcdGFzc2VydFNhbWVDdXJyZW5jeShjdXJyZW5jeUEsIGN1cnJlbmN5Qik7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlY2VpdmVzIGFuIGluY29taW5nIHZhbHVlIHRoYXQgY291bGQgYmUgYSBtb25leSBmb3JtYXR0ZWRcblx0ICogc3RyaW5nIGFuZCByZXR1cm5zIGEgTW9uZXkgdmFsdWUgb2JqZWN0IHdpdGggdGhlIGNvcnJlY3QgdmFsdWVcblx0ICogY29uc2lkZXJpbmcgdGhlIHByb3ZpZGVkIGN1cnJlbmN5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IG1vbmV5VmFsdWVcblx0ICogQHBhcmFtIHtDdXJyZW5jeX0gY3VycmVuY3lcblx0ICpcblx0ICogQHJldHVybiB7TW9uZXl9IEFuIGluc3RhbmNlIG9mIGEgbW9uZXkgdmFsdWUgb2JqZWN0XG5cdCAqL1xuXHRzdGF0aWMgZnJvbU1vbmV5VmFsdWUgPSAobW9uZXlWYWx1ZSwgY3VycmVuY3kpID0+IHtcblx0XHRhc3NlcnRDdXJyZW5jeShjdXJyZW5jeSk7XG5cdFx0Ly8gZGV0ZWN0IGlmIGluY29taW5nIHZhbHVlIGhhcyBhIGN1cnJlbmN5IHNpZ24gbm90IG1hdGNoaW5nIHByb3ZpZGVkXG5cdFx0Ly8gY3VycmVuY3kuICBUaGlzIGRvZXNuJ3QgcHJvdmlkZSBmdWxsIHByb3RlY3Rpb24gZnJvbSBpbXByb3BlclxuXHRcdC8vIHZhbHVlcyBzZW50IGluIGJ1dCBpcyBhbiBpbml0aWFsIHNhZmVndWFyZC5cblx0XHRpZiAodHlwZW9mIG1vbmV5VmFsdWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRjb25zdCBtYXRjaCA9IG1vbmV5VmFsdWUubWF0Y2goL1teXFxkXFwuXFwsXFxzXSsvKTtcblx0XHRcdGlmIChtYXRjaCAmJiBtYXRjaFswXSAhPT0gY3VycmVuY3kuc2lnbikge1xuXHRcdFx0XHQvLyBUaGUgZmlyc3QgZXJyb3IgbWVzc2FnZSBpcyB1c2VkIGlmIHdlIGhhdmUganVzdCBvbmUgY2hhcmFjdGVyXG5cdFx0XHRcdC8vIHJldHVybmVkIHdoaWNoIGlzIGxpa2VseSB0aGUgY3VycmVuY3kgc3ltYm9sLiAgT3RoZXJ3aXNlLFxuXHRcdFx0XHQvLyBnaXZlIGEgbW9yZSBnZW5lcmljIG1lc3NhZ2UuXG5cdFx0XHRcdGNvbnN0IG1lc3NhZ2UgPVxuXHRcdFx0XHRcdG1hdGNoWzBdLmxlbmd0aCA9PT0gMVxuXHRcdFx0XHRcdFx0PyBzcHJpbnRmKFxuXHRcdFx0XHRcdFx0XHRcdCdUaGUgcHJvdmlkZWQgbW9uZXkgdmFsdWUgaGFzIGEgJTEkcyBzaWduIGluIGl0LCBidXQgdGhlIHByb3ZpZGVkIGN1cnJlbmN5IHZhbHVlIG9iamVjdCBkZWZpbmVzICUyJHMgYXMgdGhlIGN1cnJlbmN5IHNpZ24uJyxcblx0XHRcdFx0XHRcdFx0XHRtYXRjaFswXSxcblx0XHRcdFx0XHRcdFx0XHRjdXJyZW5jeS5zaWduXG5cdFx0XHRcdFx0XHQgIClcblx0XHRcdFx0XHRcdDogc3ByaW50Zihcblx0XHRcdFx0XHRcdFx0XHQnVGhlIHByb3ZpZGVkIG1vbmV5IHZhbHVlIGhhcyBub24gbnVtZXJpYyBzdHJpbmdzIGluIGl0ICglMSRzKSwgcGxlYXNlIGRvdWJsZS1jaGVjayB0aGUgdmFsdWUuJyxcblx0XHRcdFx0XHRcdFx0XHRtYXRjaFswXVxuXHRcdFx0XHRcdFx0ICApO1xuXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gc2V0IHRoZSBpbml0aWFsIHZhbHVlIG9iamVjdCB1c2luZyB0aGUgY3VycmVuY3lcblx0XHRjb25zdCBtb25leSA9IG5ldyBNb25leSgwLCBjdXJyZW5jeSk7XG5cdFx0Ly8gc2V0IGEgbmV3IHZhbHVlIHVzaW5nIHRoZSBwYXJzZSBvbiB0aGUgZm9ybWF0dGVyLlxuXHRcdHJldHVybiBtb25leS5zZXRBbW91bnQobW9uZXkuZm9ybWF0dGVyLnBhcnNlKG1vbmV5VmFsdWUpKTtcblx0fTtcbn1cbiIsIi8qISBkZWNpbWFsLmpzLWxpZ2h0IHYyLjUuMSBodHRwczovL2dpdGh1Yi5jb20vTWlrZU1jbC9kZWNpbWFsLmpzLWxpZ2h0L0xJQ0VOQ0UgKi9cclxuOyhmdW5jdGlvbiAoZ2xvYmFsU2NvcGUpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG5cclxuICAvKlxyXG4gICAqICBkZWNpbWFsLmpzLWxpZ2h0IHYyLjUuMVxyXG4gICAqICBBbiBhcmJpdHJhcnktcHJlY2lzaW9uIERlY2ltYWwgdHlwZSBmb3IgSmF2YVNjcmlwdC5cclxuICAgKiAgaHR0cHM6Ly9naXRodWIuY29tL01pa2VNY2wvZGVjaW1hbC5qcy1saWdodFxyXG4gICAqICBDb3B5cmlnaHQgKGMpIDIwMjAgTWljaGFlbCBNY2xhdWdobGluIDxNOGNoODhsQGdtYWlsLmNvbT5cclxuICAgKiAgTUlUIEV4cGF0IExpY2VuY2VcclxuICAgKi9cclxuXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBFRElUQUJMRSBERUZBVUxUUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG5cclxuICAgIC8vIFRoZSBsaW1pdCBvbiB0aGUgdmFsdWUgb2YgYHByZWNpc2lvbmAsIGFuZCBvbiB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IGFyZ3VtZW50IHRvXHJcbiAgICAvLyBgdG9EZWNpbWFsUGxhY2VzYCwgYHRvRXhwb25lbnRpYWxgLCBgdG9GaXhlZGAsIGB0b1ByZWNpc2lvbmAgYW5kIGB0b1NpZ25pZmljYW50RGlnaXRzYC5cclxuICB2YXIgTUFYX0RJR0lUUyA9IDFlOSwgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIDFlOVxyXG5cclxuXHJcbiAgICAvLyBUaGUgaW5pdGlhbCBjb25maWd1cmF0aW9uIHByb3BlcnRpZXMgb2YgdGhlIERlY2ltYWwgY29uc3RydWN0b3IuXHJcbiAgICBEZWNpbWFsID0ge1xyXG5cclxuICAgICAgLy8gVGhlc2UgdmFsdWVzIG11c3QgYmUgaW50ZWdlcnMgd2l0aGluIHRoZSBzdGF0ZWQgcmFuZ2VzIChpbmNsdXNpdmUpLlxyXG4gICAgICAvLyBNb3N0IG9mIHRoZXNlIHZhbHVlcyBjYW4gYmUgY2hhbmdlZCBkdXJpbmcgcnVuLXRpbWUgdXNpbmcgYERlY2ltYWwuY29uZmlnYC5cclxuXHJcbiAgICAgIC8vIFRoZSBtYXhpbXVtIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHMgb2YgdGhlIHJlc3VsdCBvZiBhIGNhbGN1bGF0aW9uIG9yIGJhc2UgY29udmVyc2lvbi5cclxuICAgICAgLy8gRS5nLiBgRGVjaW1hbC5jb25maWcoeyBwcmVjaXNpb246IDIwIH0pO2BcclxuICAgICAgcHJlY2lzaW9uOiAyMCwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMSB0byBNQVhfRElHSVRTXHJcblxyXG4gICAgICAvLyBUaGUgcm91bmRpbmcgbW9kZSB1c2VkIGJ5IGRlZmF1bHQgYnkgYHRvSW50ZWdlcmAsIGB0b0RlY2ltYWxQbGFjZXNgLCBgdG9FeHBvbmVudGlhbGAsXHJcbiAgICAgIC8vIGB0b0ZpeGVkYCwgYHRvUHJlY2lzaW9uYCBhbmQgYHRvU2lnbmlmaWNhbnREaWdpdHNgLlxyXG4gICAgICAvL1xyXG4gICAgICAvLyBST1VORF9VUCAgICAgICAgIDAgQXdheSBmcm9tIHplcm8uXHJcbiAgICAgIC8vIFJPVU5EX0RPV04gICAgICAgMSBUb3dhcmRzIHplcm8uXHJcbiAgICAgIC8vIFJPVU5EX0NFSUwgICAgICAgMiBUb3dhcmRzICtJbmZpbml0eS5cclxuICAgICAgLy8gUk9VTkRfRkxPT1IgICAgICAzIFRvd2FyZHMgLUluZmluaXR5LlxyXG4gICAgICAvLyBST1VORF9IQUxGX1VQICAgIDQgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHVwLlxyXG4gICAgICAvLyBST1VORF9IQUxGX0RPV04gIDUgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIGRvd24uXHJcbiAgICAgIC8vIFJPVU5EX0hBTEZfRVZFTiAgNiBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyBldmVuIG5laWdoYm91ci5cclxuICAgICAgLy8gUk9VTkRfSEFMRl9DRUlMICA3IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB0b3dhcmRzICtJbmZpbml0eS5cclxuICAgICAgLy8gUk9VTkRfSEFMRl9GTE9PUiA4IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB0b3dhcmRzIC1JbmZpbml0eS5cclxuICAgICAgLy9cclxuICAgICAgLy8gRS5nLlxyXG4gICAgICAvLyBgRGVjaW1hbC5yb3VuZGluZyA9IDQ7YFxyXG4gICAgICAvLyBgRGVjaW1hbC5yb3VuZGluZyA9IERlY2ltYWwuUk9VTkRfSEFMRl9VUDtgXHJcbiAgICAgIHJvdW5kaW5nOiA0LCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gOFxyXG5cclxuICAgICAgLy8gVGhlIGV4cG9uZW50IHZhbHVlIGF0IGFuZCBiZW5lYXRoIHdoaWNoIGB0b1N0cmluZ2AgcmV0dXJucyBleHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgICAgLy8gSmF2YVNjcmlwdCBudW1iZXJzOiAtN1xyXG4gICAgICB0b0V4cE5lZzogLTcsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIC1NQVhfRVxyXG5cclxuICAgICAgLy8gVGhlIGV4cG9uZW50IHZhbHVlIGF0IGFuZCBhYm92ZSB3aGljaCBgdG9TdHJpbmdgIHJldHVybnMgZXhwb25lbnRpYWwgbm90YXRpb24uXHJcbiAgICAgIC8vIEphdmFTY3JpcHQgbnVtYmVyczogMjFcclxuICAgICAgdG9FeHBQb3M6ICAyMSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byBNQVhfRVxyXG5cclxuICAgICAgLy8gVGhlIG5hdHVyYWwgbG9nYXJpdGhtIG9mIDEwLlxyXG4gICAgICAvLyAxMTUgZGlnaXRzXHJcbiAgICAgIExOMTA6ICcyLjMwMjU4NTA5Mjk5NDA0NTY4NDAxNzk5MTQ1NDY4NDM2NDIwNzYwMTEwMTQ4ODYyODc3Mjk3NjAzMzMyNzkwMDk2NzU3MjYwOTY3NzM1MjQ4MDIzNTk5NzIwNTA4OTU5ODI5ODM0MTk2Nzc4NDA0MjI4NidcclxuICAgIH0sXHJcblxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFTkQgT0YgRURJVEFCTEUgREVGQVVMVFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuXHJcbiAgICBleHRlcm5hbCA9IHRydWUsXHJcblxyXG4gICAgZGVjaW1hbEVycm9yID0gJ1tEZWNpbWFsRXJyb3JdICcsXHJcbiAgICBpbnZhbGlkQXJndW1lbnQgPSBkZWNpbWFsRXJyb3IgKyAnSW52YWxpZCBhcmd1bWVudDogJyxcclxuICAgIGV4cG9uZW50T3V0T2ZSYW5nZSA9IGRlY2ltYWxFcnJvciArICdFeHBvbmVudCBvdXQgb2YgcmFuZ2U6ICcsXHJcblxyXG4gICAgbWF0aGZsb29yID0gTWF0aC5mbG9vcixcclxuICAgIG1hdGhwb3cgPSBNYXRoLnBvdyxcclxuXHJcbiAgICBpc0RlY2ltYWwgPSAvXihcXGQrKFxcLlxcZCopP3xcXC5cXGQrKShlWystXT9cXGQrKT8kL2ksXHJcblxyXG4gICAgT05FLFxyXG4gICAgQkFTRSA9IDFlNyxcclxuICAgIExPR19CQVNFID0gNyxcclxuICAgIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxLFxyXG4gICAgTUFYX0UgPSBtYXRoZmxvb3IoTUFYX1NBRkVfSU5URUdFUiAvIExPR19CQVNFKSwgICAgLy8gMTI4Njc0Mjc1MDY3NzI4NFxyXG5cclxuICAgIC8vIERlY2ltYWwucHJvdG90eXBlIG9iamVjdFxyXG4gICAgUCA9IHt9O1xyXG5cclxuXHJcbiAgLy8gRGVjaW1hbCBwcm90b3R5cGUgbWV0aG9kc1xyXG5cclxuXHJcbiAgLypcclxuICAgKiAgYWJzb2x1dGVWYWx1ZSAgICAgICAgICAgICAgICAgICAgICAgYWJzXHJcbiAgICogIGNvbXBhcmVkVG8gICAgICAgICAgICAgICAgICAgICAgICAgIGNtcFxyXG4gICAqICBkZWNpbWFsUGxhY2VzICAgICAgICAgICAgICAgICAgICAgICBkcFxyXG4gICAqICBkaXZpZGVkQnkgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXZcclxuICAgKiAgZGl2aWRlZFRvSW50ZWdlckJ5ICAgICAgICAgICAgICAgICAgaWRpdlxyXG4gICAqICBlcXVhbHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcVxyXG4gICAqICBleHBvbmVudFxyXG4gICAqICBncmVhdGVyVGhhbiAgICAgICAgICAgICAgICAgICAgICAgICBndFxyXG4gICAqICBncmVhdGVyVGhhbk9yRXF1YWxUbyAgICAgICAgICAgICAgICBndGVcclxuICAgKiAgaXNJbnRlZ2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNpbnRcclxuICAgKiAgaXNOZWdhdGl2ZSAgICAgICAgICAgICAgICAgICAgICAgICAgaXNuZWdcclxuICAgKiAgaXNQb3NpdGl2ZSAgICAgICAgICAgICAgICAgICAgICAgICAgaXNwb3NcclxuICAgKiAgaXNaZXJvXHJcbiAgICogIGxlc3NUaGFuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGx0XHJcbiAgICogIGxlc3NUaGFuT3JFcXVhbFRvICAgICAgICAgICAgICAgICAgIGx0ZVxyXG4gICAqICBsb2dhcml0aG0gICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dcclxuICAgKiAgbWludXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViXHJcbiAgICogIG1vZHVsbyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZFxyXG4gICAqICBuYXR1cmFsRXhwb25lbnRpYWwgICAgICAgICAgICAgICAgICBleHBcclxuICAgKiAgbmF0dXJhbExvZ2FyaXRobSAgICAgICAgICAgICAgICAgICAgbG5cclxuICAgKiAgbmVnYXRlZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVnXHJcbiAgICogIHBsdXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZFxyXG4gICAqICBwcmVjaXNpb24gICAgICAgICAgICAgICAgICAgICAgICAgICBzZFxyXG4gICAqICBzcXVhcmVSb290ICAgICAgICAgICAgICAgICAgICAgICAgICBzcXJ0XHJcbiAgICogIHRpbWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bFxyXG4gICAqICB0b0RlY2ltYWxQbGFjZXMgICAgICAgICAgICAgICAgICAgICB0b2RwXHJcbiAgICogIHRvRXhwb25lbnRpYWxcclxuICAgKiAgdG9GaXhlZFxyXG4gICAqICB0b0ludGVnZXIgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2ludFxyXG4gICAqICB0b051bWJlclxyXG4gICAqICB0b1Bvd2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3dcclxuICAgKiAgdG9QcmVjaXNpb25cclxuICAgKiAgdG9TaWduaWZpY2FudERpZ2l0cyAgICAgICAgICAgICAgICAgdG9zZFxyXG4gICAqICB0b1N0cmluZ1xyXG4gICAqICB2YWx1ZU9mICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxcclxuICAgKi9cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIGFic29sdXRlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbC5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuYWJzb2x1dGVWYWx1ZSA9IFAuYWJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHggPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzKTtcclxuICAgIGlmICh4LnMpIHgucyA9IDE7XHJcbiAgICByZXR1cm4geDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm5cclxuICAgKiAgIDEgICAgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBncmVhdGVyIHRoYW4gdGhlIHZhbHVlIG9mIGB5YCxcclxuICAgKiAgLTEgICAgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBsZXNzIHRoYW4gdGhlIHZhbHVlIG9mIGB5YCxcclxuICAgKiAgIDAgICAgaWYgdGhleSBoYXZlIHRoZSBzYW1lIHZhbHVlXHJcbiAgICpcclxuICAgKi9cclxuICBQLmNvbXBhcmVkVG8gPSBQLmNtcCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICB2YXIgaSwgaiwgeGRMLCB5ZEwsXHJcbiAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgIHkgPSBuZXcgeC5jb25zdHJ1Y3Rvcih5KTtcclxuXHJcbiAgICAvLyBTaWducyBkaWZmZXI/XHJcbiAgICBpZiAoeC5zICE9PSB5LnMpIHJldHVybiB4LnMgfHwgLXkucztcclxuXHJcbiAgICAvLyBDb21wYXJlIGV4cG9uZW50cy5cclxuICAgIGlmICh4LmUgIT09IHkuZSkgcmV0dXJuIHguZSA+IHkuZSBeIHgucyA8IDAgPyAxIDogLTE7XHJcblxyXG4gICAgeGRMID0geC5kLmxlbmd0aDtcclxuICAgIHlkTCA9IHkuZC5sZW5ndGg7XHJcblxyXG4gICAgLy8gQ29tcGFyZSBkaWdpdCBieSBkaWdpdC5cclxuICAgIGZvciAoaSA9IDAsIGogPSB4ZEwgPCB5ZEwgPyB4ZEwgOiB5ZEw7IGkgPCBqOyArK2kpIHtcclxuICAgICAgaWYgKHguZFtpXSAhPT0geS5kW2ldKSByZXR1cm4geC5kW2ldID4geS5kW2ldIF4geC5zIDwgMCA/IDEgOiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb21wYXJlIGxlbmd0aHMuXHJcbiAgICByZXR1cm4geGRMID09PSB5ZEwgPyAwIDogeGRMID4geWRMIF4geC5zIDwgMCA/IDEgOiAtMTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdGhlIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyBvZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5kZWNpbWFsUGxhY2VzID0gUC5kcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgdyA9IHguZC5sZW5ndGggLSAxLFxyXG4gICAgICBkcCA9ICh3IC0geC5lKSAqIExPR19CQVNFO1xyXG5cclxuICAgIC8vIFN1YnRyYWN0IHRoZSBudW1iZXIgb2YgdHJhaWxpbmcgemVyb3Mgb2YgdGhlIGxhc3Qgd29yZC5cclxuICAgIHcgPSB4LmRbd107XHJcbiAgICBpZiAodykgZm9yICg7IHcgJSAxMCA9PSAwOyB3IC89IDEwKSBkcC0tO1xyXG5cclxuICAgIHJldHVybiBkcCA8IDAgPyAwIDogZHA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBkaXZpZGVkIGJ5IGB5YCwgdHJ1bmNhdGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5kaXZpZGVkQnkgPSBQLmRpdiA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gZGl2aWRlKHRoaXMsIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHkpKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgaW50ZWdlciBwYXJ0IG9mIGRpdmlkaW5nIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWxcclxuICAgKiBieSB0aGUgdmFsdWUgb2YgYHlgLCB0cnVuY2F0ZWQgdG8gYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5kaXZpZGVkVG9JbnRlZ2VyQnkgPSBQLmlkaXYgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuICAgIHJldHVybiByb3VuZChkaXZpZGUoeCwgbmV3IEN0b3IoeSksIDAsIDEpLCBDdG9yLnByZWNpc2lvbik7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2YgYHlgLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5lcXVhbHMgPSBQLmVxID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHJldHVybiAhdGhpcy5jbXAoeSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRoZSAoYmFzZSAxMCkgZXhwb25lbnQgdmFsdWUgb2YgdGhpcyBEZWNpbWFsICh0aGlzLmUgaXMgdGhlIGJhc2UgMTAwMDAwMDAgZXhwb25lbnQpLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5leHBvbmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBnZXRCYXNlMTBFeHBvbmVudCh0aGlzKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGdyZWF0ZXIgdGhhbiB0aGUgdmFsdWUgb2YgYHlgLCBvdGhlcndpc2UgcmV0dXJuXHJcbiAgICogZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmdyZWF0ZXJUaGFuID0gUC5ndCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbXAoeSkgPiAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiBgeWAsXHJcbiAgICogb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuZ3JlYXRlclRoYW5PckVxdWFsVG8gPSBQLmd0ZSA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbXAoeSkgPj0gMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGFuIGludGVnZXIsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmlzSW50ZWdlciA9IFAuaXNpbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lID4gdGhpcy5kLmxlbmd0aCAtIDI7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpcyBuZWdhdGl2ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuaXNOZWdhdGl2ZSA9IFAuaXNuZWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zIDwgMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIHBvc2l0aXZlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5pc1Bvc2l0aXZlID0gUC5pc3BvcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnMgPiAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgMCwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAuaXNaZXJvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucyA9PT0gMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGlzIGxlc3MgdGhhbiBgeWAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKi9cclxuICBQLmxlc3NUaGFuID0gUC5sdCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbXAoeSkgPCAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGB5YCwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAubGVzc1RoYW5PckVxdWFsVG8gPSBQLmx0ZSA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbXAoeSkgPCAxO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0aGUgbG9nYXJpdGhtIG9mIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgdG8gdGhlIHNwZWNpZmllZCBiYXNlLCB0cnVuY2F0ZWQgdG9cclxuICAgKiBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKiBJZiBubyBiYXNlIGlzIHNwZWNpZmllZCwgcmV0dXJuIGxvZ1sxMF0oeCkuXHJcbiAgICpcclxuICAgKiBsb2dbYmFzZV0oeCkgPSBsbih4KSAvIGxuKGJhc2UpXHJcbiAgICpcclxuICAgKiBUaGUgbWF4aW11bSBlcnJvciBvZiB0aGUgcmVzdWx0IGlzIDEgdWxwICh1bml0IGluIHRoZSBsYXN0IHBsYWNlKS5cclxuICAgKlxyXG4gICAqIFtiYXNlXSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBUaGUgYmFzZSBvZiB0aGUgbG9nYXJpdGhtLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5sb2dhcml0aG0gPSBQLmxvZyA9IGZ1bmN0aW9uIChiYXNlKSB7XHJcbiAgICB2YXIgcixcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICBwciA9IEN0b3IucHJlY2lzaW9uLFxyXG4gICAgICB3cHIgPSBwciArIDU7XHJcblxyXG4gICAgLy8gRGVmYXVsdCBiYXNlIGlzIDEwLlxyXG4gICAgaWYgKGJhc2UgPT09IHZvaWQgMCkge1xyXG4gICAgICBiYXNlID0gbmV3IEN0b3IoMTApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYmFzZSA9IG5ldyBDdG9yKGJhc2UpO1xyXG5cclxuICAgICAgLy8gbG9nWy1iXSh4KSA9IE5hTlxyXG4gICAgICAvLyBsb2dbMF0oeCkgID0gTmFOXHJcbiAgICAgIC8vIGxvZ1sxXSh4KSAgPSBOYU5cclxuICAgICAgaWYgKGJhc2UucyA8IDEgfHwgYmFzZS5lcShPTkUpKSB0aHJvdyBFcnJvcihkZWNpbWFsRXJyb3IgKyAnTmFOJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbG9nW2JdKC14KSA9IE5hTlxyXG4gICAgLy8gbG9nW2JdKDApID0gLUluZmluaXR5XHJcbiAgICBpZiAoeC5zIDwgMSkgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgKHgucyA/ICdOYU4nIDogJy1JbmZpbml0eScpKTtcclxuXHJcbiAgICAvLyBsb2dbYl0oMSkgPSAwXHJcbiAgICBpZiAoeC5lcShPTkUpKSByZXR1cm4gbmV3IEN0b3IoMCk7XHJcblxyXG4gICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuICAgIHIgPSBkaXZpZGUobG4oeCwgd3ByKSwgbG4oYmFzZSwgd3ByKSwgd3ByKTtcclxuICAgIGV4dGVybmFsID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gcm91bmQociwgcHIpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgbWludXMgYHlgLCB0cnVuY2F0ZWQgdG9cclxuICAgKiBgcHJlY2lzaW9uYCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKi9cclxuICBQLm1pbnVzID0gUC5zdWIgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIHggPSB0aGlzO1xyXG4gICAgeSA9IG5ldyB4LmNvbnN0cnVjdG9yKHkpO1xyXG4gICAgcmV0dXJuIHgucyA9PSB5LnMgPyBzdWJ0cmFjdCh4LCB5KSA6IGFkZCh4LCAoeS5zID0gLXkucywgeSkpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgbW9kdWxvIGB5YCwgdHJ1bmNhdGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5tb2R1bG8gPSBQLm1vZCA9IGZ1bmN0aW9uICh5KSB7XHJcbiAgICB2YXIgcSxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG5cclxuICAgIHkgPSBuZXcgQ3Rvcih5KTtcclxuXHJcbiAgICAvLyB4ICUgMCA9IE5hTlxyXG4gICAgaWYgKCF5LnMpIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdOYU4nKTtcclxuXHJcbiAgICAvLyBSZXR1cm4geCBpZiB4IGlzIDAuXHJcbiAgICBpZiAoIXgucykgcmV0dXJuIHJvdW5kKG5ldyBDdG9yKHgpLCBwcik7XHJcblxyXG4gICAgLy8gUHJldmVudCByb3VuZGluZyBvZiBpbnRlcm1lZGlhdGUgY2FsY3VsYXRpb25zLlxyXG4gICAgZXh0ZXJuYWwgPSBmYWxzZTtcclxuICAgIHEgPSBkaXZpZGUoeCwgeSwgMCwgMSkudGltZXMoeSk7XHJcbiAgICBleHRlcm5hbCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHgubWludXMocSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIG5hdHVyYWwgZXhwb25lbnRpYWwgb2YgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCxcclxuICAgKiBpLmUuIHRoZSBiYXNlIGUgcmFpc2VkIHRvIHRoZSBwb3dlciB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLCB0cnVuY2F0ZWQgdG8gYHByZWNpc2lvbmBcclxuICAgKiBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKi9cclxuICBQLm5hdHVyYWxFeHBvbmVudGlhbCA9IFAuZXhwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGV4cCh0aGlzKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgbmF0dXJhbCBsb2dhcml0aG0gb2YgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCxcclxuICAgKiB0cnVuY2F0ZWQgdG8gYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5uYXR1cmFsTG9nYXJpdGhtID0gUC5sbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBsbih0aGlzKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIG5lZ2F0ZWQsIGkuZS4gYXMgaWYgbXVsdGlwbGllZCBieVxyXG4gICAqIC0xLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5uZWdhdGVkID0gUC5uZWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgeCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMpO1xyXG4gICAgeC5zID0gLXgucyB8fCAwO1xyXG4gICAgcmV0dXJuIHg7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBwbHVzIGB5YCwgdHJ1bmNhdGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5wbHVzID0gUC5hZGQgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIHggPSB0aGlzO1xyXG4gICAgeSA9IG5ldyB4LmNvbnN0cnVjdG9yKHkpO1xyXG4gICAgcmV0dXJuIHgucyA9PSB5LnMgPyBhZGQoeCwgeSkgOiBzdWJ0cmFjdCh4LCAoeS5zID0gLXkucywgeSkpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0aGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cyBvZiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICogW3pdIHtib29sZWFufG51bWJlcn0gV2hldGhlciB0byBjb3VudCBpbnRlZ2VyLXBhcnQgdHJhaWxpbmcgemVyb3M6IHRydWUsIGZhbHNlLCAxIG9yIDAuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnByZWNpc2lvbiA9IFAuc2QgPSBmdW5jdGlvbiAoeikge1xyXG4gICAgdmFyIGUsIHNkLCB3LFxyXG4gICAgICB4ID0gdGhpcztcclxuXHJcbiAgICBpZiAoeiAhPT0gdm9pZCAwICYmIHogIT09ICEheiAmJiB6ICE9PSAxICYmIHogIT09IDApIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIHopO1xyXG5cclxuICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KSArIDE7XHJcbiAgICB3ID0geC5kLmxlbmd0aCAtIDE7XHJcbiAgICBzZCA9IHcgKiBMT0dfQkFTRSArIDE7XHJcbiAgICB3ID0geC5kW3ddO1xyXG5cclxuICAgIC8vIElmIG5vbi16ZXJvLi4uXHJcbiAgICBpZiAodykge1xyXG5cclxuICAgICAgLy8gU3VidHJhY3QgdGhlIG51bWJlciBvZiB0cmFpbGluZyB6ZXJvcyBvZiB0aGUgbGFzdCB3b3JkLlxyXG4gICAgICBmb3IgKDsgdyAlIDEwID09IDA7IHcgLz0gMTApIHNkLS07XHJcblxyXG4gICAgICAvLyBBZGQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgdGhlIGZpcnN0IHdvcmQuXHJcbiAgICAgIGZvciAodyA9IHguZFswXTsgdyA+PSAxMDsgdyAvPSAxMCkgc2QrKztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geiAmJiBlID4gc2QgPyBlIDogc2Q7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHNxdWFyZSByb290IG9mIHRoaXMgRGVjaW1hbCwgdHJ1bmNhdGVkIHRvIGBwcmVjaXNpb25gXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC5zcXVhcmVSb290ID0gUC5zcXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGUsIG4sIHByLCByLCBzLCB0LCB3cHIsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICAvLyBOZWdhdGl2ZSBvciB6ZXJvP1xyXG4gICAgaWYgKHgucyA8IDEpIHtcclxuICAgICAgaWYgKCF4LnMpIHJldHVybiBuZXcgQ3RvcigwKTtcclxuXHJcbiAgICAgIC8vIHNxcnQoLXgpID0gTmFOXHJcbiAgICAgIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdOYU4nKTtcclxuICAgIH1cclxuXHJcbiAgICBlID0gZ2V0QmFzZTEwRXhwb25lbnQoeCk7XHJcbiAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIEluaXRpYWwgZXN0aW1hdGUuXHJcbiAgICBzID0gTWF0aC5zcXJ0KCt4KTtcclxuXHJcbiAgICAvLyBNYXRoLnNxcnQgdW5kZXJmbG93L292ZXJmbG93P1xyXG4gICAgLy8gUGFzcyB4IHRvIE1hdGguc3FydCBhcyBpbnRlZ2VyLCB0aGVuIGFkanVzdCB0aGUgZXhwb25lbnQgb2YgdGhlIHJlc3VsdC5cclxuICAgIGlmIChzID09IDAgfHwgcyA9PSAxIC8gMCkge1xyXG4gICAgICBuID0gZGlnaXRzVG9TdHJpbmcoeC5kKTtcclxuICAgICAgaWYgKChuLmxlbmd0aCArIGUpICUgMiA9PSAwKSBuICs9ICcwJztcclxuICAgICAgcyA9IE1hdGguc3FydChuKTtcclxuICAgICAgZSA9IG1hdGhmbG9vcigoZSArIDEpIC8gMikgLSAoZSA8IDAgfHwgZSAlIDIpO1xyXG5cclxuICAgICAgaWYgKHMgPT0gMSAvIDApIHtcclxuICAgICAgICBuID0gJzVlJyArIGU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbiA9IHMudG9FeHBvbmVudGlhbCgpO1xyXG4gICAgICAgIG4gPSBuLnNsaWNlKDAsIG4uaW5kZXhPZignZScpICsgMSkgKyBlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByID0gbmV3IEN0b3Iobik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByID0gbmV3IEN0b3Iocy50b1N0cmluZygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG4gICAgcyA9IHdwciA9IHByICsgMztcclxuXHJcbiAgICAvLyBOZXd0b24tUmFwaHNvbiBpdGVyYXRpb24uXHJcbiAgICBmb3IgKDs7KSB7XHJcbiAgICAgIHQgPSByO1xyXG4gICAgICByID0gdC5wbHVzKGRpdmlkZSh4LCB0LCB3cHIgKyAyKSkudGltZXMoMC41KTtcclxuXHJcbiAgICAgIGlmIChkaWdpdHNUb1N0cmluZyh0LmQpLnNsaWNlKDAsIHdwcikgPT09IChuID0gZGlnaXRzVG9TdHJpbmcoci5kKSkuc2xpY2UoMCwgd3ByKSkge1xyXG4gICAgICAgIG4gPSBuLnNsaWNlKHdwciAtIDMsIHdwciArIDEpO1xyXG5cclxuICAgICAgICAvLyBUaGUgNHRoIHJvdW5kaW5nIGRpZ2l0IG1heSBiZSBpbiBlcnJvciBieSAtMSBzbyBpZiB0aGUgNCByb3VuZGluZyBkaWdpdHMgYXJlIDk5OTkgb3JcclxuICAgICAgICAvLyA0OTk5LCBpLmUuIGFwcHJvYWNoaW5nIGEgcm91bmRpbmcgYm91bmRhcnksIGNvbnRpbnVlIHRoZSBpdGVyYXRpb24uXHJcbiAgICAgICAgaWYgKHMgPT0gd3ByICYmIG4gPT0gJzQ5OTknKSB7XHJcblxyXG4gICAgICAgICAgLy8gT24gdGhlIGZpcnN0IGl0ZXJhdGlvbiBvbmx5LCBjaGVjayB0byBzZWUgaWYgcm91bmRpbmcgdXAgZ2l2ZXMgdGhlIGV4YWN0IHJlc3VsdCBhcyB0aGVcclxuICAgICAgICAgIC8vIG5pbmVzIG1heSBpbmZpbml0ZWx5IHJlcGVhdC5cclxuICAgICAgICAgIHJvdW5kKHQsIHByICsgMSwgMCk7XHJcblxyXG4gICAgICAgICAgaWYgKHQudGltZXModCkuZXEoeCkpIHtcclxuICAgICAgICAgICAgciA9IHQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAobiAhPSAnOTk5OScpIHtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd3ByICs9IDQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHRlcm5hbCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHJvdW5kKHIsIHByKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHRpbWVzIGB5YCwgdHJ1bmNhdGVkIHRvXHJcbiAgICogYHByZWNpc2lvbmAgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50aW1lcyA9IFAubXVsID0gZnVuY3Rpb24gKHkpIHtcclxuICAgIHZhciBjYXJyeSwgZSwgaSwgaywgciwgckwsIHQsIHhkTCwgeWRMLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHhkID0geC5kLFxyXG4gICAgICB5ZCA9ICh5ID0gbmV3IEN0b3IoeSkpLmQ7XHJcblxyXG4gICAgLy8gUmV0dXJuIDAgaWYgZWl0aGVyIGlzIDAuXHJcbiAgICBpZiAoIXgucyB8fCAheS5zKSByZXR1cm4gbmV3IEN0b3IoMCk7XHJcblxyXG4gICAgeS5zICo9IHgucztcclxuICAgIGUgPSB4LmUgKyB5LmU7XHJcbiAgICB4ZEwgPSB4ZC5sZW5ndGg7XHJcbiAgICB5ZEwgPSB5ZC5sZW5ndGg7XHJcblxyXG4gICAgLy8gRW5zdXJlIHhkIHBvaW50cyB0byB0aGUgbG9uZ2VyIGFycmF5LlxyXG4gICAgaWYgKHhkTCA8IHlkTCkge1xyXG4gICAgICByID0geGQ7XHJcbiAgICAgIHhkID0geWQ7XHJcbiAgICAgIHlkID0gcjtcclxuICAgICAgckwgPSB4ZEw7XHJcbiAgICAgIHhkTCA9IHlkTDtcclxuICAgICAgeWRMID0gckw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5pdGlhbGlzZSB0aGUgcmVzdWx0IGFycmF5IHdpdGggemVyb3MuXHJcbiAgICByID0gW107XHJcbiAgICByTCA9IHhkTCArIHlkTDtcclxuICAgIGZvciAoaSA9IHJMOyBpLS07KSByLnB1c2goMCk7XHJcblxyXG4gICAgLy8gTXVsdGlwbHkhXHJcbiAgICBmb3IgKGkgPSB5ZEw7IC0taSA+PSAwOykge1xyXG4gICAgICBjYXJyeSA9IDA7XHJcbiAgICAgIGZvciAoayA9IHhkTCArIGk7IGsgPiBpOykge1xyXG4gICAgICAgIHQgPSByW2tdICsgeWRbaV0gKiB4ZFtrIC0gaSAtIDFdICsgY2Fycnk7XHJcbiAgICAgICAgcltrLS1dID0gdCAlIEJBU0UgfCAwO1xyXG4gICAgICAgIGNhcnJ5ID0gdCAvIEJBU0UgfCAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByW2tdID0gKHJba10gKyBjYXJyeSkgJSBCQVNFIHwgMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICBmb3IgKDsgIXJbLS1yTF07KSByLnBvcCgpO1xyXG5cclxuICAgIGlmIChjYXJyeSkgKytlO1xyXG4gICAgZWxzZSByLnNoaWZ0KCk7XHJcblxyXG4gICAgeS5kID0gcjtcclxuICAgIHkuZSA9IGU7XHJcblxyXG4gICAgcmV0dXJuIGV4dGVybmFsID8gcm91bmQoeSwgQ3Rvci5wcmVjaXNpb24pIDogeTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHJvdW5kZWQgdG8gYSBtYXhpbXVtIG9mIGBkcGBcclxuICAgKiBkZWNpbWFsIHBsYWNlcyB1c2luZyByb3VuZGluZyBtb2RlIGBybWAgb3IgYHJvdW5kaW5nYCBpZiBgcm1gIGlzIG9taXR0ZWQuXHJcbiAgICpcclxuICAgKiBJZiBgZHBgIGlzIG9taXR0ZWQsIHJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzLiBJbnRlZ2VyLCAwIHRvIE1BWF9ESUdJVFMgaW5jbHVzaXZlLlxyXG4gICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9EZWNpbWFsUGxhY2VzID0gUC50b2RwID0gZnVuY3Rpb24gKGRwLCBybSkge1xyXG4gICAgdmFyIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICB4ID0gbmV3IEN0b3IoeCk7XHJcbiAgICBpZiAoZHAgPT09IHZvaWQgMCkgcmV0dXJuIHg7XHJcblxyXG4gICAgY2hlY2tJbnQzMihkcCwgMCwgTUFYX0RJR0lUUyk7XHJcblxyXG4gICAgaWYgKHJtID09PSB2b2lkIDApIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgIGVsc2UgY2hlY2tJbnQzMihybSwgMCwgOCk7XHJcblxyXG4gICAgcmV0dXJuIHJvdW5kKHgsIGRwICsgZ2V0QmFzZTEwRXhwb25lbnQoeCkgKyAxLCBybSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGluIGV4cG9uZW50aWFsIG5vdGF0aW9uIHJvdW5kZWQgdG9cclxuICAgKiBgZHBgIGZpeGVkIGRlY2ltYWwgcGxhY2VzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJvdW5kaW5nYC5cclxuICAgKlxyXG4gICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXMuIEludGVnZXIsIDAgdG8gTUFYX0RJR0lUUyBpbmNsdXNpdmUuXHJcbiAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b0V4cG9uZW50aWFsID0gZnVuY3Rpb24gKGRwLCBybSkge1xyXG4gICAgdmFyIHN0cixcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG5cclxuICAgIGlmIChkcCA9PT0gdm9pZCAwKSB7XHJcbiAgICAgIHN0ciA9IHRvU3RyaW5nKHgsIHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hlY2tJbnQzMihkcCwgMCwgTUFYX0RJR0lUUyk7XHJcblxyXG4gICAgICBpZiAocm0gPT09IHZvaWQgMCkgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgICBlbHNlIGNoZWNrSW50MzIocm0sIDAsIDgpO1xyXG5cclxuICAgICAgeCA9IHJvdW5kKG5ldyBDdG9yKHgpLCBkcCArIDEsIHJtKTtcclxuICAgICAgc3RyID0gdG9TdHJpbmcoeCwgdHJ1ZSwgZHAgKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCBpbiBub3JtYWwgKGZpeGVkLXBvaW50KSBub3RhdGlvbiB0b1xyXG4gICAqIGBkcGAgZml4ZWQgZGVjaW1hbCBwbGFjZXMgYW5kIHJvdW5kZWQgdXNpbmcgcm91bmRpbmcgbW9kZSBgcm1gIG9yIGByb3VuZGluZ2AgaWYgYHJtYCBpc1xyXG4gICAqIG9taXR0ZWQuXHJcbiAgICpcclxuICAgKiBBcyB3aXRoIEphdmFTY3JpcHQgbnVtYmVycywgKC0wKS50b0ZpeGVkKDApIGlzICcwJywgYnV0IGUuZy4gKC0wLjAwMDAxKS50b0ZpeGVkKDApIGlzICctMCcuXHJcbiAgICpcclxuICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzLiBJbnRlZ2VyLCAwIHRvIE1BWF9ESUdJVFMgaW5jbHVzaXZlLlxyXG4gICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqICgtMCkudG9GaXhlZCgwKSBpcyAnMCcsIGJ1dCAoLTAuMSkudG9GaXhlZCgwKSBpcyAnLTAnLlxyXG4gICAqICgtMCkudG9GaXhlZCgxKSBpcyAnMC4wJywgYnV0ICgtMC4wMSkudG9GaXhlZCgxKSBpcyAnLTAuMCcuXHJcbiAgICogKC0wKS50b0ZpeGVkKDMpIGlzICcwLjAwMCcuXHJcbiAgICogKC0wLjUpLnRvRml4ZWQoMCkgaXMgJy0wJy5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9GaXhlZCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgIHZhciBzdHIsIHksXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICBpZiAoZHAgPT09IHZvaWQgMCkgcmV0dXJuIHRvU3RyaW5nKHgpO1xyXG5cclxuICAgIGNoZWNrSW50MzIoZHAsIDAsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgIGlmIChybSA9PT0gdm9pZCAwKSBybSA9IEN0b3Iucm91bmRpbmc7XHJcbiAgICBlbHNlIGNoZWNrSW50MzIocm0sIDAsIDgpO1xyXG5cclxuICAgIHkgPSByb3VuZChuZXcgQ3Rvcih4KSwgZHAgKyBnZXRCYXNlMTBFeHBvbmVudCh4KSArIDEsIHJtKTtcclxuICAgIHN0ciA9IHRvU3RyaW5nKHkuYWJzKCksIGZhbHNlLCBkcCArIGdldEJhc2UxMEV4cG9uZW50KHkpICsgMSk7XHJcblxyXG4gICAgLy8gVG8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gYWRkIHRoZSBtaW51cyBzaWduIGxvb2sgYXQgdGhlIHZhbHVlIGJlZm9yZSBpdCB3YXMgcm91bmRlZCxcclxuICAgIC8vIGkuZS4gbG9vayBhdCBgeGAgcmF0aGVyIHRoYW4gYHlgLlxyXG4gICAgcmV0dXJuIHguaXNuZWcoKSAmJiAheC5pc1plcm8oKSA/ICctJyArIHN0ciA6IHN0cjtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHJvdW5kZWQgdG8gYSB3aG9sZSBudW1iZXIgdXNpbmdcclxuICAgKiByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvSW50ZWdlciA9IFAudG9pbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgeCA9IHRoaXMsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yO1xyXG4gICAgcmV0dXJuIHJvdW5kKG5ldyBDdG9yKHgpLCBnZXRCYXNlMTBFeHBvbmVudCh4KSArIDEsIEN0b3Iucm91bmRpbmcpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIGNvbnZlcnRlZCB0byBhIG51bWJlciBwcmltaXRpdmUuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvTnVtYmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICt0aGlzO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBEZWNpbWFsIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwgcmFpc2VkIHRvIHRoZSBwb3dlciBgeWAsXHJcbiAgICogdHJ1bmNhdGVkIHRvIGBwcmVjaXNpb25gIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgKlxyXG4gICAqIEZvciBub24taW50ZWdlciBvciB2ZXJ5IGxhcmdlIGV4cG9uZW50cyBwb3coeCwgeSkgaXMgY2FsY3VsYXRlZCB1c2luZ1xyXG4gICAqXHJcbiAgICogICB4XnkgPSBleHAoeSpsbih4KSlcclxuICAgKlxyXG4gICAqIFRoZSBtYXhpbXVtIGVycm9yIGlzIDEgdWxwICh1bml0IGluIGxhc3QgcGxhY2UpLlxyXG4gICAqXHJcbiAgICogeSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBUaGUgcG93ZXIgdG8gd2hpY2ggdG8gcmFpc2UgdGhpcyBEZWNpbWFsLlxyXG4gICAqXHJcbiAgICovXHJcbiAgUC50b1Bvd2VyID0gUC5wb3cgPSBmdW5jdGlvbiAoeSkge1xyXG4gICAgdmFyIGUsIGssIHByLCByLCBzaWduLCB5SXNJbnQsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgZ3VhcmQgPSAxMixcclxuICAgICAgeW4gPSArKHkgPSBuZXcgQ3Rvcih5KSk7XHJcblxyXG4gICAgLy8gcG93KHgsIDApID0gMVxyXG4gICAgaWYgKCF5LnMpIHJldHVybiBuZXcgQ3RvcihPTkUpO1xyXG5cclxuICAgIHggPSBuZXcgQ3Rvcih4KTtcclxuXHJcbiAgICAvLyBwb3coMCwgeSA+IDApID0gMFxyXG4gICAgLy8gcG93KDAsIHkgPCAwKSA9IEluZmluaXR5XHJcbiAgICBpZiAoIXgucykge1xyXG4gICAgICBpZiAoeS5zIDwgMSkgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgJ0luZmluaXR5Jyk7XHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHBvdygxLCB5KSA9IDFcclxuICAgIGlmICh4LmVxKE9ORSkpIHJldHVybiB4O1xyXG5cclxuICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcblxyXG4gICAgLy8gcG93KHgsIDEpID0geFxyXG4gICAgaWYgKHkuZXEoT05FKSkgcmV0dXJuIHJvdW5kKHgsIHByKTtcclxuXHJcbiAgICBlID0geS5lO1xyXG4gICAgayA9IHkuZC5sZW5ndGggLSAxO1xyXG4gICAgeUlzSW50ID0gZSA+PSBrO1xyXG4gICAgc2lnbiA9IHgucztcclxuXHJcbiAgICBpZiAoIXlJc0ludCkge1xyXG5cclxuICAgICAgLy8gcG93KHggPCAwLCB5IG5vbi1pbnRlZ2VyKSA9IE5hTlxyXG4gICAgICBpZiAoc2lnbiA8IDApIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdOYU4nKTtcclxuXHJcbiAgICAvLyBJZiB5IGlzIGEgc21hbGwgaW50ZWdlciB1c2UgdGhlICdleHBvbmVudGlhdGlvbiBieSBzcXVhcmluZycgYWxnb3JpdGhtLlxyXG4gICAgfSBlbHNlIGlmICgoayA9IHluIDwgMCA/IC15biA6IHluKSA8PSBNQVhfU0FGRV9JTlRFR0VSKSB7XHJcbiAgICAgIHIgPSBuZXcgQ3RvcihPTkUpO1xyXG5cclxuICAgICAgLy8gTWF4IGsgb2YgOTAwNzE5OTI1NDc0MDk5MSB0YWtlcyA1MyBsb29wIGl0ZXJhdGlvbnMuXHJcbiAgICAgIC8vIE1heGltdW0gZGlnaXRzIGFycmF5IGxlbmd0aDsgbGVhdmVzIFsyOCwgMzRdIGd1YXJkIGRpZ2l0cy5cclxuICAgICAgZSA9IE1hdGguY2VpbChwciAvIExPR19CQVNFICsgNCk7XHJcblxyXG4gICAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG5cclxuICAgICAgZm9yICg7Oykge1xyXG4gICAgICAgIGlmIChrICUgMikge1xyXG4gICAgICAgICAgciA9IHIudGltZXMoeCk7XHJcbiAgICAgICAgICB0cnVuY2F0ZShyLmQsIGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgayA9IG1hdGhmbG9vcihrIC8gMik7XHJcbiAgICAgICAgaWYgKGsgPT09IDApIGJyZWFrO1xyXG5cclxuICAgICAgICB4ID0geC50aW1lcyh4KTtcclxuICAgICAgICB0cnVuY2F0ZSh4LmQsIGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBleHRlcm5hbCA9IHRydWU7XHJcblxyXG4gICAgICByZXR1cm4geS5zIDwgMCA/IG5ldyBDdG9yKE9ORSkuZGl2KHIpIDogcm91bmQociwgcHIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlc3VsdCBpcyBuZWdhdGl2ZSBpZiB4IGlzIG5lZ2F0aXZlIGFuZCB0aGUgbGFzdCBkaWdpdCBvZiBpbnRlZ2VyIHkgaXMgb2RkLlxyXG4gICAgc2lnbiA9IHNpZ24gPCAwICYmIHkuZFtNYXRoLm1heChlLCBrKV0gJiAxID8gLTEgOiAxO1xyXG5cclxuICAgIHgucyA9IDE7XHJcbiAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG4gICAgciA9IHkudGltZXMobG4oeCwgcHIgKyBndWFyZCkpO1xyXG4gICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG4gICAgciA9IGV4cChyKTtcclxuICAgIHIucyA9IHNpZ247XHJcblxyXG4gICAgcmV0dXJuIHI7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBEZWNpbWFsIHJvdW5kZWQgdG8gYHNkYCBzaWduaWZpY2FudCBkaWdpdHNcclxuICAgKiB1c2luZyByb3VuZGluZyBtb2RlIGByb3VuZGluZ2AuXHJcbiAgICpcclxuICAgKiBSZXR1cm4gZXhwb25lbnRpYWwgbm90YXRpb24gaWYgYHNkYCBpcyBsZXNzIHRoYW4gdGhlIG51bWJlciBvZiBkaWdpdHMgbmVjZXNzYXJ5IHRvIHJlcHJlc2VudFxyXG4gICAqIHRoZSBpbnRlZ2VyIHBhcnQgb2YgdGhlIHZhbHVlIGluIG5vcm1hbCBub3RhdGlvbi5cclxuICAgKlxyXG4gICAqIFtzZF0ge251bWJlcn0gU2lnbmlmaWNhbnQgZGlnaXRzLiBJbnRlZ2VyLCAxIHRvIE1BWF9ESUdJVFMgaW5jbHVzaXZlLlxyXG4gICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9QcmVjaXNpb24gPSBmdW5jdGlvbiAoc2QsIHJtKSB7XHJcbiAgICB2YXIgZSwgc3RyLFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgaWYgKHNkID09PSB2b2lkIDApIHtcclxuICAgICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpO1xyXG4gICAgICBzdHIgPSB0b1N0cmluZyh4LCBlIDw9IEN0b3IudG9FeHBOZWcgfHwgZSA+PSBDdG9yLnRvRXhwUG9zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoZWNrSW50MzIoc2QsIDEsIE1BWF9ESUdJVFMpO1xyXG5cclxuICAgICAgaWYgKHJtID09PSB2b2lkIDApIHJtID0gQ3Rvci5yb3VuZGluZztcclxuICAgICAgZWxzZSBjaGVja0ludDMyKHJtLCAwLCA4KTtcclxuXHJcbiAgICAgIHggPSByb3VuZChuZXcgQ3Rvcih4KSwgc2QsIHJtKTtcclxuICAgICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpO1xyXG4gICAgICBzdHIgPSB0b1N0cmluZyh4LCBzZCA8PSBlIHx8IGUgPD0gQ3Rvci50b0V4cE5lZywgc2QpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdHI7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IERlY2ltYWwgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgRGVjaW1hbCByb3VuZGVkIHRvIGEgbWF4aW11bSBvZiBgc2RgXHJcbiAgICogc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgYHJtYCwgb3IgdG8gYHByZWNpc2lvbmAgYW5kIGByb3VuZGluZ2AgcmVzcGVjdGl2ZWx5IGlmXHJcbiAgICogb21pdHRlZC5cclxuICAgKlxyXG4gICAqIFtzZF0ge251bWJlcn0gU2lnbmlmaWNhbnQgZGlnaXRzLiBJbnRlZ2VyLCAxIHRvIE1BWF9ESUdJVFMgaW5jbHVzaXZlLlxyXG4gICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqL1xyXG4gIFAudG9TaWduaWZpY2FudERpZ2l0cyA9IFAudG9zZCA9IGZ1bmN0aW9uIChzZCwgcm0pIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3I7XHJcblxyXG4gICAgaWYgKHNkID09PSB2b2lkIDApIHtcclxuICAgICAgc2QgPSBDdG9yLnByZWNpc2lvbjtcclxuICAgICAgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hlY2tJbnQzMihzZCwgMSwgTUFYX0RJR0lUUyk7XHJcblxyXG4gICAgICBpZiAocm0gPT09IHZvaWQgMCkgcm0gPSBDdG9yLnJvdW5kaW5nO1xyXG4gICAgICBlbHNlIGNoZWNrSW50MzIocm0sIDAsIDgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByb3VuZChuZXcgQ3Rvcih4KSwgc2QsIHJtKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIERlY2ltYWwuXHJcbiAgICpcclxuICAgKiBSZXR1cm4gZXhwb25lbnRpYWwgbm90YXRpb24gaWYgdGhpcyBEZWNpbWFsIGhhcyBhIHBvc2l0aXZlIGV4cG9uZW50IGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhblxyXG4gICAqIGB0b0V4cFBvc2AsIG9yIGEgbmVnYXRpdmUgZXhwb25lbnQgZXF1YWwgdG8gb3IgbGVzcyB0aGFuIGB0b0V4cE5lZ2AuXHJcbiAgICpcclxuICAgKi9cclxuICBQLnRvU3RyaW5nID0gUC52YWx1ZU9mID0gUC52YWwgPSBQLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB4ID0gdGhpcyxcclxuICAgICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICByZXR1cm4gdG9TdHJpbmcoeCwgZSA8PSBDdG9yLnRvRXhwTmVnIHx8IGUgPj0gQ3Rvci50b0V4cFBvcyk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIERlY2ltYWwucHJvdG90eXBlIChQKSBhbmQvb3IgRGVjaW1hbCBtZXRob2RzLCBhbmQgdGhlaXIgY2FsbGVycy5cclxuXHJcblxyXG4gIC8qXHJcbiAgICogIGFkZCAgICAgICAgICAgICAgICAgUC5taW51cywgUC5wbHVzXHJcbiAgICogIGNoZWNrSW50MzIgICAgICAgICAgUC50b2RwLCBQLnRvRXhwb25lbnRpYWwsIFAudG9GaXhlZCwgUC50b1ByZWNpc2lvbiwgUC50b3NkXHJcbiAgICogIGRpZ2l0c1RvU3RyaW5nICAgICAgUC5sb2csIFAuc3FydCwgUC5wb3csIHRvU3RyaW5nLCBleHAsIGxuXHJcbiAgICogIGRpdmlkZSAgICAgICAgICAgICAgUC5kaXYsIFAuaWRpdiwgUC5sb2csIFAubW9kLCBQLnNxcnQsIGV4cCwgbG5cclxuICAgKiAgZXhwICAgICAgICAgICAgICAgICBQLmV4cCwgUC5wb3dcclxuICAgKiAgZ2V0QmFzZTEwRXhwb25lbnQgICBQLmV4cG9uZW50LCBQLnNkLCBQLnRvaW50LCBQLnNxcnQsIFAudG9kcCwgUC50b0ZpeGVkLCBQLnRvUHJlY2lzaW9uLFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgIFAudG9TdHJpbmcsIGRpdmlkZSwgcm91bmQsIHRvU3RyaW5nLCBleHAsIGxuXHJcbiAgICogIGdldExuMTAgICAgICAgICAgICAgUC5sb2csIGxuXHJcbiAgICogIGdldFplcm9TdHJpbmcgICAgICAgZGlnaXRzVG9TdHJpbmcsIHRvU3RyaW5nXHJcbiAgICogIGxuICAgICAgICAgICAgICAgICAgUC5sb2csIFAubG4sIFAucG93LCBleHBcclxuICAgKiAgcGFyc2VEZWNpbWFsICAgICAgICBEZWNpbWFsXHJcbiAgICogIHJvdW5kICAgICAgICAgICAgICAgUC5hYnMsIFAuaWRpdiwgUC5sb2csIFAubWludXMsIFAubW9kLCBQLm5lZywgUC5wbHVzLCBQLnRvaW50LCBQLnNxcnQsXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgUC50aW1lcywgUC50b2RwLCBQLnRvRXhwb25lbnRpYWwsIFAudG9GaXhlZCwgUC5wb3csIFAudG9QcmVjaXNpb24sIFAudG9zZCxcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICBkaXZpZGUsIGdldExuMTAsIGV4cCwgbG5cclxuICAgKiAgc3VidHJhY3QgICAgICAgICAgICBQLm1pbnVzLCBQLnBsdXNcclxuICAgKiAgdG9TdHJpbmcgICAgICAgICAgICBQLnRvRXhwb25lbnRpYWwsIFAudG9GaXhlZCwgUC50b1ByZWNpc2lvbiwgUC50b1N0cmluZywgUC52YWx1ZU9mXHJcbiAgICogIHRydW5jYXRlICAgICAgICAgICAgUC5wb3dcclxuICAgKlxyXG4gICAqICBUaHJvd3M6ICAgICAgICAgICAgIFAubG9nLCBQLm1vZCwgUC5zZCwgUC5zcXJ0LCBQLnBvdywgIGNoZWNrSW50MzIsIGRpdmlkZSwgcm91bmQsXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgZ2V0TG4xMCwgZXhwLCBsbiwgcGFyc2VEZWNpbWFsLCBEZWNpbWFsLCBjb25maWdcclxuICAgKi9cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGFkZCh4LCB5KSB7XHJcbiAgICB2YXIgY2FycnksIGQsIGUsIGksIGssIGxlbiwgeGQsIHlkLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuXHJcbiAgICAvLyBJZiBlaXRoZXIgaXMgemVyby4uLlxyXG4gICAgaWYgKCF4LnMgfHwgIXkucykge1xyXG5cclxuICAgICAgLy8gUmV0dXJuIHggaWYgeSBpcyB6ZXJvLlxyXG4gICAgICAvLyBSZXR1cm4geSBpZiB5IGlzIG5vbi16ZXJvLlxyXG4gICAgICBpZiAoIXkucykgeSA9IG5ldyBDdG9yKHgpO1xyXG4gICAgICByZXR1cm4gZXh0ZXJuYWwgPyByb3VuZCh5LCBwcikgOiB5O1xyXG4gICAgfVxyXG5cclxuICAgIHhkID0geC5kO1xyXG4gICAgeWQgPSB5LmQ7XHJcblxyXG4gICAgLy8geCBhbmQgeSBhcmUgZmluaXRlLCBub24temVybyBudW1iZXJzIHdpdGggdGhlIHNhbWUgc2lnbi5cclxuXHJcbiAgICBrID0geC5lO1xyXG4gICAgZSA9IHkuZTtcclxuICAgIHhkID0geGQuc2xpY2UoKTtcclxuICAgIGkgPSBrIC0gZTtcclxuXHJcbiAgICAvLyBJZiBiYXNlIDFlNyBleHBvbmVudHMgZGlmZmVyLi4uXHJcbiAgICBpZiAoaSkge1xyXG4gICAgICBpZiAoaSA8IDApIHtcclxuICAgICAgICBkID0geGQ7XHJcbiAgICAgICAgaSA9IC1pO1xyXG4gICAgICAgIGxlbiA9IHlkLmxlbmd0aDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkID0geWQ7XHJcbiAgICAgICAgZSA9IGs7XHJcbiAgICAgICAgbGVuID0geGQubGVuZ3RoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBMaW1pdCBudW1iZXIgb2YgemVyb3MgcHJlcGVuZGVkIHRvIG1heChjZWlsKHByIC8gTE9HX0JBU0UpLCBsZW4pICsgMS5cclxuICAgICAgayA9IE1hdGguY2VpbChwciAvIExPR19CQVNFKTtcclxuICAgICAgbGVuID0gayA+IGxlbiA/IGsgKyAxIDogbGVuICsgMTtcclxuXHJcbiAgICAgIGlmIChpID4gbGVuKSB7XHJcbiAgICAgICAgaSA9IGxlbjtcclxuICAgICAgICBkLmxlbmd0aCA9IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFByZXBlbmQgemVyb3MgdG8gZXF1YWxpc2UgZXhwb25lbnRzLiBOb3RlOiBGYXN0ZXIgdG8gdXNlIHJldmVyc2UgdGhlbiBkbyB1bnNoaWZ0cy5cclxuICAgICAgZC5yZXZlcnNlKCk7XHJcbiAgICAgIGZvciAoOyBpLS07KSBkLnB1c2goMCk7XHJcbiAgICAgIGQucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxlbiA9IHhkLmxlbmd0aDtcclxuICAgIGkgPSB5ZC5sZW5ndGg7XHJcblxyXG4gICAgLy8gSWYgeWQgaXMgbG9uZ2VyIHRoYW4geGQsIHN3YXAgeGQgYW5kIHlkIHNvIHhkIHBvaW50cyB0byB0aGUgbG9uZ2VyIGFycmF5LlxyXG4gICAgaWYgKGxlbiAtIGkgPCAwKSB7XHJcbiAgICAgIGkgPSBsZW47XHJcbiAgICAgIGQgPSB5ZDtcclxuICAgICAgeWQgPSB4ZDtcclxuICAgICAgeGQgPSBkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE9ubHkgc3RhcnQgYWRkaW5nIGF0IHlkLmxlbmd0aCAtIDEgYXMgdGhlIGZ1cnRoZXIgZGlnaXRzIG9mIHhkIGNhbiBiZSBsZWZ0IGFzIHRoZXkgYXJlLlxyXG4gICAgZm9yIChjYXJyeSA9IDA7IGk7KSB7XHJcbiAgICAgIGNhcnJ5ID0gKHhkWy0taV0gPSB4ZFtpXSArIHlkW2ldICsgY2FycnkpIC8gQkFTRSB8IDA7XHJcbiAgICAgIHhkW2ldICU9IEJBU0U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNhcnJ5KSB7XHJcbiAgICAgIHhkLnVuc2hpZnQoY2FycnkpO1xyXG4gICAgICArK2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgLy8gTm8gbmVlZCB0byBjaGVjayBmb3IgemVybywgYXMgK3ggKyAreSAhPSAwICYmIC14ICsgLXkgIT0gMFxyXG4gICAgZm9yIChsZW4gPSB4ZC5sZW5ndGg7IHhkWy0tbGVuXSA9PSAwOykgeGQucG9wKCk7XHJcblxyXG4gICAgeS5kID0geGQ7XHJcbiAgICB5LmUgPSBlO1xyXG5cclxuICAgIHJldHVybiBleHRlcm5hbCA/IHJvdW5kKHksIHByKSA6IHk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gY2hlY2tJbnQzMihpLCBtaW4sIG1heCkge1xyXG4gICAgaWYgKGkgIT09IH5+aSB8fCBpIDwgbWluIHx8IGkgPiBtYXgpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgaSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gZGlnaXRzVG9TdHJpbmcoZCkge1xyXG4gICAgdmFyIGksIGssIHdzLFxyXG4gICAgICBpbmRleE9mTGFzdFdvcmQgPSBkLmxlbmd0aCAtIDEsXHJcbiAgICAgIHN0ciA9ICcnLFxyXG4gICAgICB3ID0gZFswXTtcclxuXHJcbiAgICBpZiAoaW5kZXhPZkxhc3RXb3JkID4gMCkge1xyXG4gICAgICBzdHIgKz0gdztcclxuICAgICAgZm9yIChpID0gMTsgaSA8IGluZGV4T2ZMYXN0V29yZDsgaSsrKSB7XHJcbiAgICAgICAgd3MgPSBkW2ldICsgJyc7XHJcbiAgICAgICAgayA9IExPR19CQVNFIC0gd3MubGVuZ3RoO1xyXG4gICAgICAgIGlmIChrKSBzdHIgKz0gZ2V0WmVyb1N0cmluZyhrKTtcclxuICAgICAgICBzdHIgKz0gd3M7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHcgPSBkW2ldO1xyXG4gICAgICB3cyA9IHcgKyAnJztcclxuICAgICAgayA9IExPR19CQVNFIC0gd3MubGVuZ3RoO1xyXG4gICAgICBpZiAoaykgc3RyICs9IGdldFplcm9TdHJpbmcoayk7XHJcbiAgICB9IGVsc2UgaWYgKHcgPT09IDApIHtcclxuICAgICAgcmV0dXJuICcwJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3Mgb2YgbGFzdCB3LlxyXG4gICAgZm9yICg7IHcgJSAxMCA9PT0gMDspIHcgLz0gMTA7XHJcblxyXG4gICAgcmV0dXJuIHN0ciArIHc7XHJcbiAgfVxyXG5cclxuXHJcbiAgdmFyIGRpdmlkZSA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gQXNzdW1lcyBub24temVybyB4IGFuZCBrLCBhbmQgaGVuY2Ugbm9uLXplcm8gcmVzdWx0LlxyXG4gICAgZnVuY3Rpb24gbXVsdGlwbHlJbnRlZ2VyKHgsIGspIHtcclxuICAgICAgdmFyIHRlbXAsXHJcbiAgICAgICAgY2FycnkgPSAwLFxyXG4gICAgICAgIGkgPSB4Lmxlbmd0aDtcclxuXHJcbiAgICAgIGZvciAoeCA9IHguc2xpY2UoKTsgaS0tOykge1xyXG4gICAgICAgIHRlbXAgPSB4W2ldICogayArIGNhcnJ5O1xyXG4gICAgICAgIHhbaV0gPSB0ZW1wICUgQkFTRSB8IDA7XHJcbiAgICAgICAgY2FycnkgPSB0ZW1wIC8gQkFTRSB8IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjYXJyeSkgeC51bnNoaWZ0KGNhcnJ5KTtcclxuXHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBhcmUoYSwgYiwgYUwsIGJMKSB7XHJcbiAgICAgIHZhciBpLCByO1xyXG5cclxuICAgICAgaWYgKGFMICE9IGJMKSB7XHJcbiAgICAgICAgciA9IGFMID4gYkwgPyAxIDogLTE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChpID0gciA9IDA7IGkgPCBhTDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoYVtpXSAhPSBiW2ldKSB7XHJcbiAgICAgICAgICAgIHIgPSBhW2ldID4gYltpXSA/IDEgOiAtMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWJ0cmFjdChhLCBiLCBhTCkge1xyXG4gICAgICB2YXIgaSA9IDA7XHJcblxyXG4gICAgICAvLyBTdWJ0cmFjdCBiIGZyb20gYS5cclxuICAgICAgZm9yICg7IGFMLS07KSB7XHJcbiAgICAgICAgYVthTF0gLT0gaTtcclxuICAgICAgICBpID0gYVthTF0gPCBiW2FMXSA/IDEgOiAwO1xyXG4gICAgICAgIGFbYUxdID0gaSAqIEJBU0UgKyBhW2FMXSAtIGJbYUxdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZW1vdmUgbGVhZGluZyB6ZXJvcy5cclxuICAgICAgZm9yICg7ICFhWzBdICYmIGEubGVuZ3RoID4gMTspIGEuc2hpZnQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHgsIHksIHByLCBkcCkge1xyXG4gICAgICB2YXIgY21wLCBlLCBpLCBrLCBwcm9kLCBwcm9kTCwgcSwgcWQsIHJlbSwgcmVtTCwgcmVtMCwgc2QsIHQsIHhpLCB4TCwgeWQwLCB5TCwgeXosXHJcbiAgICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgICAgc2lnbiA9IHgucyA9PSB5LnMgPyAxIDogLTEsXHJcbiAgICAgICAgeGQgPSB4LmQsXHJcbiAgICAgICAgeWQgPSB5LmQ7XHJcblxyXG4gICAgICAvLyBFaXRoZXIgMD9cclxuICAgICAgaWYgKCF4LnMpIHJldHVybiBuZXcgQ3Rvcih4KTtcclxuICAgICAgaWYgKCF5LnMpIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdEaXZpc2lvbiBieSB6ZXJvJyk7XHJcblxyXG4gICAgICBlID0geC5lIC0geS5lO1xyXG4gICAgICB5TCA9IHlkLmxlbmd0aDtcclxuICAgICAgeEwgPSB4ZC5sZW5ndGg7XHJcbiAgICAgIHEgPSBuZXcgQ3RvcihzaWduKTtcclxuICAgICAgcWQgPSBxLmQgPSBbXTtcclxuXHJcbiAgICAgIC8vIFJlc3VsdCBleHBvbmVudCBtYXkgYmUgb25lIGxlc3MgdGhhbiBlLlxyXG4gICAgICBmb3IgKGkgPSAwOyB5ZFtpXSA9PSAoeGRbaV0gfHwgMCk7ICkgKytpO1xyXG4gICAgICBpZiAoeWRbaV0gPiAoeGRbaV0gfHwgMCkpIC0tZTtcclxuXHJcbiAgICAgIGlmIChwciA9PSBudWxsKSB7XHJcbiAgICAgICAgc2QgPSBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG4gICAgICB9IGVsc2UgaWYgKGRwKSB7XHJcbiAgICAgICAgc2QgPSBwciArIChnZXRCYXNlMTBFeHBvbmVudCh4KSAtIGdldEJhc2UxMEV4cG9uZW50KHkpKSArIDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2QgPSBwcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNkIDwgMCkgcmV0dXJuIG5ldyBDdG9yKDApO1xyXG5cclxuICAgICAgLy8gQ29udmVydCBwcmVjaXNpb24gaW4gbnVtYmVyIG9mIGJhc2UgMTAgZGlnaXRzIHRvIGJhc2UgMWU3IGRpZ2l0cy5cclxuICAgICAgc2QgPSBzZCAvIExPR19CQVNFICsgMiB8IDA7XHJcbiAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgLy8gZGl2aXNvciA8IDFlN1xyXG4gICAgICBpZiAoeUwgPT0gMSkge1xyXG4gICAgICAgIGsgPSAwO1xyXG4gICAgICAgIHlkID0geWRbMF07XHJcbiAgICAgICAgc2QrKztcclxuXHJcbiAgICAgICAgLy8gayBpcyB0aGUgY2FycnkuXHJcbiAgICAgICAgZm9yICg7IChpIDwgeEwgfHwgaykgJiYgc2QtLTsgaSsrKSB7XHJcbiAgICAgICAgICB0ID0gayAqIEJBU0UgKyAoeGRbaV0gfHwgMCk7XHJcbiAgICAgICAgICBxZFtpXSA9IHQgLyB5ZCB8IDA7XHJcbiAgICAgICAgICBrID0gdCAlIHlkIHwgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAvLyBkaXZpc29yID49IDFlN1xyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAvLyBOb3JtYWxpc2UgeGQgYW5kIHlkIHNvIGhpZ2hlc3Qgb3JkZXIgZGlnaXQgb2YgeWQgaXMgPj0gQkFTRS8yXHJcbiAgICAgICAgayA9IEJBU0UgLyAoeWRbMF0gKyAxKSB8IDA7XHJcblxyXG4gICAgICAgIGlmIChrID4gMSkge1xyXG4gICAgICAgICAgeWQgPSBtdWx0aXBseUludGVnZXIoeWQsIGspO1xyXG4gICAgICAgICAgeGQgPSBtdWx0aXBseUludGVnZXIoeGQsIGspO1xyXG4gICAgICAgICAgeUwgPSB5ZC5sZW5ndGg7XHJcbiAgICAgICAgICB4TCA9IHhkLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHhpID0geUw7XHJcbiAgICAgICAgcmVtID0geGQuc2xpY2UoMCwgeUwpO1xyXG4gICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyBBZGQgemVyb3MgdG8gbWFrZSByZW1haW5kZXIgYXMgbG9uZyBhcyBkaXZpc29yLlxyXG4gICAgICAgIGZvciAoOyByZW1MIDwgeUw7KSByZW1bcmVtTCsrXSA9IDA7XHJcblxyXG4gICAgICAgIHl6ID0geWQuc2xpY2UoKTtcclxuICAgICAgICB5ei51bnNoaWZ0KDApO1xyXG4gICAgICAgIHlkMCA9IHlkWzBdO1xyXG5cclxuICAgICAgICBpZiAoeWRbMV0gPj0gQkFTRSAvIDIpICsreWQwO1xyXG5cclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICBrID0gMDtcclxuXHJcbiAgICAgICAgICAvLyBDb21wYXJlIGRpdmlzb3IgYW5kIHJlbWFpbmRlci5cclxuICAgICAgICAgIGNtcCA9IGNvbXBhcmUoeWQsIHJlbSwgeUwsIHJlbUwpO1xyXG5cclxuICAgICAgICAgIC8vIElmIGRpdmlzb3IgPCByZW1haW5kZXIuXHJcbiAgICAgICAgICBpZiAoY21wIDwgMCkge1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRyaWFsIGRpZ2l0LCBrLlxyXG4gICAgICAgICAgICByZW0wID0gcmVtWzBdO1xyXG4gICAgICAgICAgICBpZiAoeUwgIT0gcmVtTCkgcmVtMCA9IHJlbTAgKiBCQVNFICsgKHJlbVsxXSB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGsgd2lsbCBiZSBob3cgbWFueSB0aW1lcyB0aGUgZGl2aXNvciBnb2VzIGludG8gdGhlIGN1cnJlbnQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICBrID0gcmVtMCAvIHlkMCB8IDA7XHJcblxyXG4gICAgICAgICAgICAvLyAgQWxnb3JpdGhtOlxyXG4gICAgICAgICAgICAvLyAgMS4gcHJvZHVjdCA9IGRpdmlzb3IgKiB0cmlhbCBkaWdpdCAoaylcclxuICAgICAgICAgICAgLy8gIDIuIGlmIHByb2R1Y3QgPiByZW1haW5kZXI6IHByb2R1Y3QgLT0gZGl2aXNvciwgay0tXHJcbiAgICAgICAgICAgIC8vICAzLiByZW1haW5kZXIgLT0gcHJvZHVjdFxyXG4gICAgICAgICAgICAvLyAgNC4gaWYgcHJvZHVjdCB3YXMgPCByZW1haW5kZXIgYXQgMjpcclxuICAgICAgICAgICAgLy8gICAgNS4gY29tcGFyZSBuZXcgcmVtYWluZGVyIGFuZCBkaXZpc29yXHJcbiAgICAgICAgICAgIC8vICAgIDYuIElmIHJlbWFpbmRlciA+IGRpdmlzb3I6IHJlbWFpbmRlciAtPSBkaXZpc29yLCBrKytcclxuXHJcbiAgICAgICAgICAgIGlmIChrID4gMSkge1xyXG4gICAgICAgICAgICAgIGlmIChrID49IEJBU0UpIGsgPSBCQVNFIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gcHJvZHVjdCA9IGRpdmlzb3IgKiB0cmlhbCBkaWdpdC5cclxuICAgICAgICAgICAgICBwcm9kID0gbXVsdGlwbHlJbnRlZ2VyKHlkLCBrKTtcclxuICAgICAgICAgICAgICBwcm9kTCA9IHByb2QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAvLyBDb21wYXJlIHByb2R1Y3QgYW5kIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICBjbXAgPSBjb21wYXJlKHByb2QsIHJlbSwgcHJvZEwsIHJlbUwpO1xyXG5cclxuICAgICAgICAgICAgICAvLyBwcm9kdWN0ID4gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIGlmIChjbXAgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgay0tO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN1YnRyYWN0IGRpdmlzb3IgZnJvbSBwcm9kdWN0LlxyXG4gICAgICAgICAgICAgICAgc3VidHJhY3QocHJvZCwgeUwgPCBwcm9kTCA/IHl6IDogeWQsIHByb2RMKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIGNtcCBpcyAtMS5cclxuICAgICAgICAgICAgICAvLyBJZiBrIGlzIDAsIHRoZXJlIGlzIG5vIG5lZWQgdG8gY29tcGFyZSB5ZCBhbmQgcmVtIGFnYWluIGJlbG93LCBzbyBjaGFuZ2UgY21wIHRvIDFcclxuICAgICAgICAgICAgICAvLyB0byBhdm9pZCBpdC4gSWYgayBpcyAxIHRoZXJlIGlzIGEgbmVlZCB0byBjb21wYXJlIHlkIGFuZCByZW0gYWdhaW4gYmVsb3cuXHJcbiAgICAgICAgICAgICAgaWYgKGsgPT0gMCkgY21wID0gayA9IDE7XHJcbiAgICAgICAgICAgICAgcHJvZCA9IHlkLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHByb2RMID0gcHJvZC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChwcm9kTCA8IHJlbUwpIHByb2QudW5zaGlmdCgwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN1YnRyYWN0IHByb2R1Y3QgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgIHN1YnRyYWN0KHJlbSwgcHJvZCwgcmVtTCk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBwcm9kdWN0IHdhcyA8IHByZXZpb3VzIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgaWYgKGNtcCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAvLyBDb21wYXJlIGRpdmlzb3IgYW5kIG5ldyByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgY21wID0gY29tcGFyZSh5ZCwgcmVtLCB5TCwgcmVtTCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIElmIGRpdmlzb3IgPCBuZXcgcmVtYWluZGVyLCBzdWJ0cmFjdCBkaXZpc29yIGZyb20gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIGlmIChjbXAgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICBrKys7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAgIHN1YnRyYWN0KHJlbSwgeUwgPCByZW1MID8geXogOiB5ZCwgcmVtTCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoY21wID09PSAwKSB7XHJcbiAgICAgICAgICAgIGsrKztcclxuICAgICAgICAgICAgcmVtID0gWzBdO1xyXG4gICAgICAgICAgfSAgICAvLyBpZiBjbXAgPT09IDEsIGsgd2lsbCBiZSAwXHJcblxyXG4gICAgICAgICAgLy8gQWRkIHRoZSBuZXh0IGRpZ2l0LCBrLCB0byB0aGUgcmVzdWx0IGFycmF5LlxyXG4gICAgICAgICAgcWRbaSsrXSA9IGs7XHJcblxyXG4gICAgICAgICAgLy8gVXBkYXRlIHRoZSByZW1haW5kZXIuXHJcbiAgICAgICAgICBpZiAoY21wICYmIHJlbVswXSkge1xyXG4gICAgICAgICAgICByZW1bcmVtTCsrXSA9IHhkW3hpXSB8fCAwO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVtID0gW3hkW3hpXV07XHJcbiAgICAgICAgICAgIHJlbUwgPSAxO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IHdoaWxlICgoeGkrKyA8IHhMIHx8IHJlbVswXSAhPT0gdm9pZCAwKSAmJiBzZC0tKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTGVhZGluZyB6ZXJvP1xyXG4gICAgICBpZiAoIXFkWzBdKSBxZC5zaGlmdCgpO1xyXG5cclxuICAgICAgcS5lID0gZTtcclxuXHJcbiAgICAgIHJldHVybiByb3VuZChxLCBkcCA/IHByICsgZ2V0QmFzZTEwRXhwb25lbnQocSkgKyAxIDogcHIpO1xyXG4gICAgfTtcclxuICB9KSgpO1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgbmF0dXJhbCBleHBvbmVudGlhbCBvZiBgeGAgdHJ1bmNhdGVkIHRvIGBzZGBcclxuICAgKiBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICpcclxuICAgKiBUYXlsb3IvTWFjbGF1cmluIHNlcmllcy5cclxuICAgKlxyXG4gICAqIGV4cCh4KSA9IHheMC8wISArIHheMS8xISArIHheMi8yISArIHheMy8zISArIC4uLlxyXG4gICAqXHJcbiAgICogQXJndW1lbnQgcmVkdWN0aW9uOlxyXG4gICAqICAgUmVwZWF0IHggPSB4IC8gMzIsIGsgKz0gNSwgdW50aWwgfHh8IDwgMC4xXHJcbiAgICogICBleHAoeCkgPSBleHAoeCAvIDJeayleKDJeaylcclxuICAgKlxyXG4gICAqIFByZXZpb3VzbHksIHRoZSBhcmd1bWVudCB3YXMgaW5pdGlhbGx5IHJlZHVjZWQgYnlcclxuICAgKiBleHAoeCkgPSBleHAocikgKiAxMF5rICB3aGVyZSByID0geCAtIGsgKiBsbjEwLCBrID0gZmxvb3IoeCAvIGxuMTApXHJcbiAgICogdG8gZmlyc3QgcHV0IHIgaW4gdGhlIHJhbmdlIFswLCBsbjEwXSwgYmVmb3JlIGRpdmlkaW5nIGJ5IDMyIHVudGlsIHx4fCA8IDAuMSwgYnV0IHRoaXMgd2FzXHJcbiAgICogZm91bmQgdG8gYmUgc2xvd2VyIHRoYW4ganVzdCBkaXZpZGluZyByZXBlYXRlZGx5IGJ5IDMyIGFzIGFib3ZlLlxyXG4gICAqXHJcbiAgICogKE1hdGggb2JqZWN0IGludGVnZXIgbWluL21heDogTWF0aC5leHAoNzA5KSA9IDguMmUrMzA3LCBNYXRoLmV4cCgtNzQ1KSA9IDVlLTMyNClcclxuICAgKlxyXG4gICAqICBleHAoeCkgaXMgbm9uLXRlcm1pbmF0aW5nIGZvciBhbnkgZmluaXRlLCBub24temVybyB4LlxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gZXhwKHgsIHNkKSB7XHJcbiAgICB2YXIgZGVub21pbmF0b3IsIGd1YXJkLCBwb3csIHN1bSwgdCwgd3ByLFxyXG4gICAgICBpID0gMCxcclxuICAgICAgayA9IDAsXHJcbiAgICAgIEN0b3IgPSB4LmNvbnN0cnVjdG9yLFxyXG4gICAgICBwciA9IEN0b3IucHJlY2lzaW9uO1xyXG5cclxuICAgIGlmIChnZXRCYXNlMTBFeHBvbmVudCh4KSA+IDE2KSB0aHJvdyBFcnJvcihleHBvbmVudE91dE9mUmFuZ2UgKyBnZXRCYXNlMTBFeHBvbmVudCh4KSk7XHJcblxyXG4gICAgLy8gZXhwKDApID0gMVxyXG4gICAgaWYgKCF4LnMpIHJldHVybiBuZXcgQ3RvcihPTkUpO1xyXG5cclxuICAgIGlmIChzZCA9PSBudWxsKSB7XHJcbiAgICAgIGV4dGVybmFsID0gZmFsc2U7XHJcbiAgICAgIHdwciA9IHByO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd3ByID0gc2Q7XHJcbiAgICB9XHJcblxyXG4gICAgdCA9IG5ldyBDdG9yKDAuMDMxMjUpO1xyXG5cclxuICAgIHdoaWxlICh4LmFicygpLmd0ZSgwLjEpKSB7XHJcbiAgICAgIHggPSB4LnRpbWVzKHQpOyAgICAvLyB4ID0geCAvIDJeNVxyXG4gICAgICBrICs9IDU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXN0aW1hdGUgdGhlIHByZWNpc2lvbiBpbmNyZWFzZSBuZWNlc3NhcnkgdG8gZW5zdXJlIHRoZSBmaXJzdCA0IHJvdW5kaW5nIGRpZ2l0cyBhcmUgY29ycmVjdC5cclxuICAgIGd1YXJkID0gTWF0aC5sb2cobWF0aHBvdygyLCBrKSkgLyBNYXRoLkxOMTAgKiAyICsgNSB8IDA7XHJcbiAgICB3cHIgKz0gZ3VhcmQ7XHJcbiAgICBkZW5vbWluYXRvciA9IHBvdyA9IHN1bSA9IG5ldyBDdG9yKE9ORSk7XHJcbiAgICBDdG9yLnByZWNpc2lvbiA9IHdwcjtcclxuXHJcbiAgICBmb3IgKDs7KSB7XHJcbiAgICAgIHBvdyA9IHJvdW5kKHBvdy50aW1lcyh4KSwgd3ByKTtcclxuICAgICAgZGVub21pbmF0b3IgPSBkZW5vbWluYXRvci50aW1lcygrK2kpO1xyXG4gICAgICB0ID0gc3VtLnBsdXMoZGl2aWRlKHBvdywgZGVub21pbmF0b3IsIHdwcikpO1xyXG5cclxuICAgICAgaWYgKGRpZ2l0c1RvU3RyaW5nKHQuZCkuc2xpY2UoMCwgd3ByKSA9PT0gZGlnaXRzVG9TdHJpbmcoc3VtLmQpLnNsaWNlKDAsIHdwcikpIHtcclxuICAgICAgICB3aGlsZSAoay0tKSBzdW0gPSByb3VuZChzdW0udGltZXMoc3VtKSwgd3ByKTtcclxuICAgICAgICBDdG9yLnByZWNpc2lvbiA9IHByO1xyXG4gICAgICAgIHJldHVybiBzZCA9PSBudWxsID8gKGV4dGVybmFsID0gdHJ1ZSwgcm91bmQoc3VtLCBwcikpIDogc3VtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdW0gPSB0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vIENhbGN1bGF0ZSB0aGUgYmFzZSAxMCBleHBvbmVudCBmcm9tIHRoZSBiYXNlIDFlNyBleHBvbmVudC5cclxuICBmdW5jdGlvbiBnZXRCYXNlMTBFeHBvbmVudCh4KSB7XHJcbiAgICB2YXIgZSA9IHguZSAqIExPR19CQVNFLFxyXG4gICAgICB3ID0geC5kWzBdO1xyXG5cclxuICAgIC8vIEFkZCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiB0aGUgZmlyc3Qgd29yZCBvZiB0aGUgZGlnaXRzIGFycmF5LlxyXG4gICAgZm9yICg7IHcgPj0gMTA7IHcgLz0gMTApIGUrKztcclxuICAgIHJldHVybiBlO1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGdldExuMTAoQ3Rvciwgc2QsIHByKSB7XHJcblxyXG4gICAgaWYgKHNkID4gQ3Rvci5MTjEwLnNkKCkpIHtcclxuXHJcblxyXG4gICAgICAvLyBSZXNldCBnbG9iYWwgc3RhdGUgaW4gY2FzZSB0aGUgZXhjZXB0aW9uIGlzIGNhdWdodC5cclxuICAgICAgZXh0ZXJuYWwgPSB0cnVlO1xyXG4gICAgICBpZiAocHIpIEN0b3IucHJlY2lzaW9uID0gcHI7XHJcbiAgICAgIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdMTjEwIHByZWNpc2lvbiBsaW1pdCBleGNlZWRlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByb3VuZChuZXcgQ3RvcihDdG9yLkxOMTApLCBzZCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gZ2V0WmVyb1N0cmluZyhrKSB7XHJcbiAgICB2YXIgenMgPSAnJztcclxuICAgIGZvciAoOyBrLS07KSB6cyArPSAnMCc7XHJcbiAgICByZXR1cm4genM7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCB3aG9zZSB2YWx1ZSBpcyB0aGUgbmF0dXJhbCBsb2dhcml0aG0gb2YgYHhgIHRydW5jYXRlZCB0byBgc2RgIHNpZ25pZmljYW50XHJcbiAgICogZGlnaXRzLlxyXG4gICAqXHJcbiAgICogIGxuKG4pIGlzIG5vbi10ZXJtaW5hdGluZyAobiAhPSAxKVxyXG4gICAqXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gbG4oeSwgc2QpIHtcclxuICAgIHZhciBjLCBjMCwgZGVub21pbmF0b3IsIGUsIG51bWVyYXRvciwgc3VtLCB0LCB3cHIsIHgyLFxyXG4gICAgICBuID0gMSxcclxuICAgICAgZ3VhcmQgPSAxMCxcclxuICAgICAgeCA9IHksXHJcbiAgICAgIHhkID0geC5kLFxyXG4gICAgICBDdG9yID0geC5jb25zdHJ1Y3RvcixcclxuICAgICAgcHIgPSBDdG9yLnByZWNpc2lvbjtcclxuXHJcbiAgICAvLyBsbigteCkgPSBOYU5cclxuICAgIC8vIGxuKDApID0gLUluZmluaXR5XHJcbiAgICBpZiAoeC5zIDwgMSkgdGhyb3cgRXJyb3IoZGVjaW1hbEVycm9yICsgKHgucyA/ICdOYU4nIDogJy1JbmZpbml0eScpKTtcclxuXHJcbiAgICAvLyBsbigxKSA9IDBcclxuICAgIGlmICh4LmVxKE9ORSkpIHJldHVybiBuZXcgQ3RvcigwKTtcclxuXHJcbiAgICBpZiAoc2QgPT0gbnVsbCkge1xyXG4gICAgICBleHRlcm5hbCA9IGZhbHNlO1xyXG4gICAgICB3cHIgPSBwcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdwciA9IHNkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh4LmVxKDEwKSkge1xyXG4gICAgICBpZiAoc2QgPT0gbnVsbCkgZXh0ZXJuYWwgPSB0cnVlO1xyXG4gICAgICByZXR1cm4gZ2V0TG4xMChDdG9yLCB3cHIpO1xyXG4gICAgfVxyXG5cclxuICAgIHdwciArPSBndWFyZDtcclxuICAgIEN0b3IucHJlY2lzaW9uID0gd3ByO1xyXG4gICAgYyA9IGRpZ2l0c1RvU3RyaW5nKHhkKTtcclxuICAgIGMwID0gYy5jaGFyQXQoMCk7XHJcbiAgICBlID0gZ2V0QmFzZTEwRXhwb25lbnQoeCk7XHJcblxyXG4gICAgaWYgKE1hdGguYWJzKGUpIDwgMS41ZTE1KSB7XHJcblxyXG4gICAgICAvLyBBcmd1bWVudCByZWR1Y3Rpb24uXHJcbiAgICAgIC8vIFRoZSBzZXJpZXMgY29udmVyZ2VzIGZhc3RlciB0aGUgY2xvc2VyIHRoZSBhcmd1bWVudCBpcyB0byAxLCBzbyB1c2luZ1xyXG4gICAgICAvLyBsbihhXmIpID0gYiAqIGxuKGEpLCAgIGxuKGEpID0gbG4oYV5iKSAvIGJcclxuICAgICAgLy8gbXVsdGlwbHkgdGhlIGFyZ3VtZW50IGJ5IGl0c2VsZiB1bnRpbCB0aGUgbGVhZGluZyBkaWdpdHMgb2YgdGhlIHNpZ25pZmljYW5kIGFyZSA3LCA4LCA5LFxyXG4gICAgICAvLyAxMCwgMTEsIDEyIG9yIDEzLCByZWNvcmRpbmcgdGhlIG51bWJlciBvZiBtdWx0aXBsaWNhdGlvbnMgc28gdGhlIHN1bSBvZiB0aGUgc2VyaWVzIGNhblxyXG4gICAgICAvLyBsYXRlciBiZSBkaXZpZGVkIGJ5IHRoaXMgbnVtYmVyLCB0aGVuIHNlcGFyYXRlIG91dCB0aGUgcG93ZXIgb2YgMTAgdXNpbmdcclxuICAgICAgLy8gbG4oYSoxMF5iKSA9IGxuKGEpICsgYipsbigxMCkuXHJcblxyXG4gICAgICAvLyBtYXggbiBpcyAyMSAoZ2l2ZXMgMC45LCAxLjAgb3IgMS4xKSAoOWUxNSAvIDIxID0gNC4yZTE0KS5cclxuICAgICAgLy93aGlsZSAoYzAgPCA5ICYmIGMwICE9IDEgfHwgYzAgPT0gMSAmJiBjLmNoYXJBdCgxKSA+IDEpIHtcclxuICAgICAgLy8gbWF4IG4gaXMgNiAoZ2l2ZXMgMC43IC0gMS4zKVxyXG4gICAgICB3aGlsZSAoYzAgPCA3ICYmIGMwICE9IDEgfHwgYzAgPT0gMSAmJiBjLmNoYXJBdCgxKSA+IDMpIHtcclxuICAgICAgICB4ID0geC50aW1lcyh5KTtcclxuICAgICAgICBjID0gZGlnaXRzVG9TdHJpbmcoeC5kKTtcclxuICAgICAgICBjMCA9IGMuY2hhckF0KDApO1xyXG4gICAgICAgIG4rKztcclxuICAgICAgfVxyXG5cclxuICAgICAgZSA9IGdldEJhc2UxMEV4cG9uZW50KHgpO1xyXG5cclxuICAgICAgaWYgKGMwID4gMSkge1xyXG4gICAgICAgIHggPSBuZXcgQ3RvcignMC4nICsgYyk7XHJcbiAgICAgICAgZSsrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHggPSBuZXcgQ3RvcihjMCArICcuJyArIGMuc2xpY2UoMSkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgLy8gVGhlIGFyZ3VtZW50IHJlZHVjdGlvbiBtZXRob2QgYWJvdmUgbWF5IHJlc3VsdCBpbiBvdmVyZmxvdyBpZiB0aGUgYXJndW1lbnQgeSBpcyBhIG1hc3NpdmVcclxuICAgICAgLy8gbnVtYmVyIHdpdGggZXhwb25lbnQgPj0gMTUwMDAwMDAwMDAwMDAwMCAoOWUxNSAvIDYgPSAxLjVlMTUpLCBzbyBpbnN0ZWFkIHJlY2FsbCB0aGlzXHJcbiAgICAgIC8vIGZ1bmN0aW9uIHVzaW5nIGxuKHgqMTBeZSkgPSBsbih4KSArIGUqbG4oMTApLlxyXG4gICAgICB0ID0gZ2V0TG4xMChDdG9yLCB3cHIgKyAyLCBwcikudGltZXMoZSArICcnKTtcclxuICAgICAgeCA9IGxuKG5ldyBDdG9yKGMwICsgJy4nICsgYy5zbGljZSgxKSksIHdwciAtIGd1YXJkKS5wbHVzKHQpO1xyXG5cclxuICAgICAgQ3Rvci5wcmVjaXNpb24gPSBwcjtcclxuICAgICAgcmV0dXJuIHNkID09IG51bGwgPyAoZXh0ZXJuYWwgPSB0cnVlLCByb3VuZCh4LCBwcikpIDogeDtcclxuICAgIH1cclxuXHJcbiAgICAvLyB4IGlzIHJlZHVjZWQgdG8gYSB2YWx1ZSBuZWFyIDEuXHJcblxyXG4gICAgLy8gVGF5bG9yIHNlcmllcy5cclxuICAgIC8vIGxuKHkpID0gbG4oKDEgKyB4KS8oMSAtIHgpKSA9IDIoeCArIHheMy8zICsgeF41LzUgKyB4XjcvNyArIC4uLilcclxuICAgIC8vIHdoZXJlIHggPSAoeSAtIDEpLyh5ICsgMSkgICAgKHx4fCA8IDEpXHJcbiAgICBzdW0gPSBudW1lcmF0b3IgPSB4ID0gZGl2aWRlKHgubWludXMoT05FKSwgeC5wbHVzKE9ORSksIHdwcik7XHJcbiAgICB4MiA9IHJvdW5kKHgudGltZXMoeCksIHdwcik7XHJcbiAgICBkZW5vbWluYXRvciA9IDM7XHJcblxyXG4gICAgZm9yICg7Oykge1xyXG4gICAgICBudW1lcmF0b3IgPSByb3VuZChudW1lcmF0b3IudGltZXMoeDIpLCB3cHIpO1xyXG4gICAgICB0ID0gc3VtLnBsdXMoZGl2aWRlKG51bWVyYXRvciwgbmV3IEN0b3IoZGVub21pbmF0b3IpLCB3cHIpKTtcclxuXHJcbiAgICAgIGlmIChkaWdpdHNUb1N0cmluZyh0LmQpLnNsaWNlKDAsIHdwcikgPT09IGRpZ2l0c1RvU3RyaW5nKHN1bS5kKS5zbGljZSgwLCB3cHIpKSB7XHJcbiAgICAgICAgc3VtID0gc3VtLnRpbWVzKDIpO1xyXG5cclxuICAgICAgICAvLyBSZXZlcnNlIHRoZSBhcmd1bWVudCByZWR1Y3Rpb24uXHJcbiAgICAgICAgaWYgKGUgIT09IDApIHN1bSA9IHN1bS5wbHVzKGdldExuMTAoQ3Rvciwgd3ByICsgMiwgcHIpLnRpbWVzKGUgKyAnJykpO1xyXG4gICAgICAgIHN1bSA9IGRpdmlkZShzdW0sIG5ldyBDdG9yKG4pLCB3cHIpO1xyXG5cclxuICAgICAgICBDdG9yLnByZWNpc2lvbiA9IHByO1xyXG4gICAgICAgIHJldHVybiBzZCA9PSBudWxsID8gKGV4dGVybmFsID0gdHJ1ZSwgcm91bmQoc3VtLCBwcikpIDogc3VtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdW0gPSB0O1xyXG4gICAgICBkZW5vbWluYXRvciArPSAyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUGFyc2UgdGhlIHZhbHVlIG9mIGEgbmV3IERlY2ltYWwgYHhgIGZyb20gc3RyaW5nIGBzdHJgLlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHBhcnNlRGVjaW1hbCh4LCBzdHIpIHtcclxuICAgIHZhciBlLCBpLCBsZW47XHJcblxyXG4gICAgLy8gRGVjaW1hbCBwb2ludD9cclxuICAgIGlmICgoZSA9IHN0ci5pbmRleE9mKCcuJykpID4gLTEpIHN0ciA9IHN0ci5yZXBsYWNlKCcuJywgJycpO1xyXG5cclxuICAgIC8vIEV4cG9uZW50aWFsIGZvcm0/XHJcbiAgICBpZiAoKGkgPSBzdHIuc2VhcmNoKC9lL2kpKSA+IDApIHtcclxuXHJcbiAgICAgIC8vIERldGVybWluZSBleHBvbmVudC5cclxuICAgICAgaWYgKGUgPCAwKSBlID0gaTtcclxuICAgICAgZSArPSArc3RyLnNsaWNlKGkgKyAxKTtcclxuICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBpKTtcclxuICAgIH0gZWxzZSBpZiAoZSA8IDApIHtcclxuXHJcbiAgICAgIC8vIEludGVnZXIuXHJcbiAgICAgIGUgPSBzdHIubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERldGVybWluZSBsZWFkaW5nIHplcm9zLlxyXG4gICAgZm9yIChpID0gMDsgc3RyLmNoYXJDb2RlQXQoaSkgPT09IDQ4OykgKytpO1xyXG5cclxuICAgIC8vIERldGVybWluZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIGZvciAobGVuID0gc3RyLmxlbmd0aDsgc3RyLmNoYXJDb2RlQXQobGVuIC0gMSkgPT09IDQ4OykgLS1sZW47XHJcbiAgICBzdHIgPSBzdHIuc2xpY2UoaSwgbGVuKTtcclxuXHJcbiAgICBpZiAoc3RyKSB7XHJcbiAgICAgIGxlbiAtPSBpO1xyXG4gICAgICBlID0gZSAtIGkgLSAxO1xyXG4gICAgICB4LmUgPSBtYXRoZmxvb3IoZSAvIExPR19CQVNFKTtcclxuICAgICAgeC5kID0gW107XHJcblxyXG4gICAgICAvLyBUcmFuc2Zvcm0gYmFzZVxyXG5cclxuICAgICAgLy8gZSBpcyB0aGUgYmFzZSAxMCBleHBvbmVudC5cclxuICAgICAgLy8gaSBpcyB3aGVyZSB0byBzbGljZSBzdHIgdG8gZ2V0IHRoZSBmaXJzdCB3b3JkIG9mIHRoZSBkaWdpdHMgYXJyYXkuXHJcbiAgICAgIGkgPSAoZSArIDEpICUgTE9HX0JBU0U7XHJcbiAgICAgIGlmIChlIDwgMCkgaSArPSBMT0dfQkFTRTtcclxuXHJcbiAgICAgIGlmIChpIDwgbGVuKSB7XHJcbiAgICAgICAgaWYgKGkpIHguZC5wdXNoKCtzdHIuc2xpY2UoMCwgaSkpO1xyXG4gICAgICAgIGZvciAobGVuIC09IExPR19CQVNFOyBpIDwgbGVuOykgeC5kLnB1c2goK3N0ci5zbGljZShpLCBpICs9IExPR19CQVNFKSk7XHJcbiAgICAgICAgc3RyID0gc3RyLnNsaWNlKGkpO1xyXG4gICAgICAgIGkgPSBMT0dfQkFTRSAtIHN0ci5sZW5ndGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaSAtPSBsZW47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAoOyBpLS07KSBzdHIgKz0gJzAnO1xyXG4gICAgICB4LmQucHVzaCgrc3RyKTtcclxuXHJcbiAgICAgIGlmIChleHRlcm5hbCAmJiAoeC5lID4gTUFYX0UgfHwgeC5lIDwgLU1BWF9FKSkgdGhyb3cgRXJyb3IoZXhwb25lbnRPdXRPZlJhbmdlICsgZSk7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgLy8gWmVyby5cclxuICAgICAgeC5zID0gMDtcclxuICAgICAgeC5lID0gMDtcclxuICAgICAgeC5kID0gWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogUm91bmQgYHhgIHRvIGBzZGAgc2lnbmlmaWNhbnQgZGlnaXRzLCB1c2luZyByb3VuZGluZyBtb2RlIGBybWAgaWYgcHJlc2VudCAodHJ1bmNhdGUgb3RoZXJ3aXNlKS5cclxuICAgKi9cclxuICAgZnVuY3Rpb24gcm91bmQoeCwgc2QsIHJtKSB7XHJcbiAgICB2YXIgaSwgaiwgaywgbiwgcmQsIGRvUm91bmQsIHcsIHhkaSxcclxuICAgICAgeGQgPSB4LmQ7XHJcblxyXG4gICAgLy8gcmQ6IHRoZSByb3VuZGluZyBkaWdpdCwgaS5lLiB0aGUgZGlnaXQgYWZ0ZXIgdGhlIGRpZ2l0IHRoYXQgbWF5IGJlIHJvdW5kZWQgdXAuXHJcbiAgICAvLyB3OiB0aGUgd29yZCBvZiB4ZCB3aGljaCBjb250YWlucyB0aGUgcm91bmRpbmcgZGlnaXQsIGEgYmFzZSAxZTcgbnVtYmVyLlxyXG4gICAgLy8geGRpOiB0aGUgaW5kZXggb2YgdyB3aXRoaW4geGQuXHJcbiAgICAvLyBuOiB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiB3LlxyXG4gICAgLy8gaTogd2hhdCB3b3VsZCBiZSB0aGUgaW5kZXggb2YgcmQgd2l0aGluIHcgaWYgYWxsIHRoZSBudW1iZXJzIHdlcmUgNyBkaWdpdHMgbG9uZyAoaS5lLiBpZlxyXG4gICAgLy8gdGhleSBoYWQgbGVhZGluZyB6ZXJvcylcclxuICAgIC8vIGo6IGlmID4gMCwgdGhlIGFjdHVhbCBpbmRleCBvZiByZCB3aXRoaW4gdyAoaWYgPCAwLCByZCBpcyBhIGxlYWRpbmcgemVybykuXHJcblxyXG4gICAgLy8gR2V0IHRoZSBsZW5ndGggb2YgdGhlIGZpcnN0IHdvcmQgb2YgdGhlIGRpZ2l0cyBhcnJheSB4ZC5cclxuICAgIGZvciAobiA9IDEsIGsgPSB4ZFswXTsgayA+PSAxMDsgayAvPSAxMCkgbisrO1xyXG4gICAgaSA9IHNkIC0gbjtcclxuXHJcbiAgICAvLyBJcyB0aGUgcm91bmRpbmcgZGlnaXQgaW4gdGhlIGZpcnN0IHdvcmQgb2YgeGQ/XHJcbiAgICBpZiAoaSA8IDApIHtcclxuICAgICAgaSArPSBMT0dfQkFTRTtcclxuICAgICAgaiA9IHNkO1xyXG4gICAgICB3ID0geGRbeGRpID0gMF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB4ZGkgPSBNYXRoLmNlaWwoKGkgKyAxKSAvIExPR19CQVNFKTtcclxuICAgICAgayA9IHhkLmxlbmd0aDtcclxuICAgICAgaWYgKHhkaSA+PSBrKSByZXR1cm4geDtcclxuICAgICAgdyA9IGsgPSB4ZFt4ZGldO1xyXG5cclxuICAgICAgLy8gR2V0IHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIHcuXHJcbiAgICAgIGZvciAobiA9IDE7IGsgPj0gMTA7IGsgLz0gMTApIG4rKztcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgaW5kZXggb2YgcmQgd2l0aGluIHcuXHJcbiAgICAgIGkgJT0gTE9HX0JBU0U7XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiB3LCBhZGp1c3RlZCBmb3IgbGVhZGluZyB6ZXJvcy5cclxuICAgICAgLy8gVGhlIG51bWJlciBvZiBsZWFkaW5nIHplcm9zIG9mIHcgaXMgZ2l2ZW4gYnkgTE9HX0JBU0UgLSBuLlxyXG4gICAgICBqID0gaSAtIExPR19CQVNFICsgbjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocm0gIT09IHZvaWQgMCkge1xyXG4gICAgICBrID0gbWF0aHBvdygxMCwgbiAtIGogLSAxKTtcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgcm91bmRpbmcgZGlnaXQgYXQgaW5kZXggaiBvZiB3LlxyXG4gICAgICByZCA9IHcgLyBrICUgMTAgfCAwO1xyXG5cclxuICAgICAgLy8gQXJlIHRoZXJlIGFueSBub24temVybyBkaWdpdHMgYWZ0ZXIgdGhlIHJvdW5kaW5nIGRpZ2l0P1xyXG4gICAgICBkb1JvdW5kID0gc2QgPCAwIHx8IHhkW3hkaSArIDFdICE9PSB2b2lkIDAgfHwgdyAlIGs7XHJcblxyXG4gICAgICAvLyBUaGUgZXhwcmVzc2lvbiBgdyAlIG1hdGhwb3coMTAsIG4gLSBqIC0gMSlgIHJldHVybnMgYWxsIHRoZSBkaWdpdHMgb2YgdyB0byB0aGUgcmlnaHQgb2YgdGhlXHJcbiAgICAgIC8vIGRpZ2l0IGF0IChsZWZ0LXRvLXJpZ2h0KSBpbmRleCBqLCBlLmcuIGlmIHcgaXMgOTA4NzE0IGFuZCBqIGlzIDIsIHRoZSBleHByZXNzaW9uIHdpbGwgZ2l2ZVxyXG4gICAgICAvLyA3MTQuXHJcblxyXG4gICAgICBkb1JvdW5kID0gcm0gPCA0XHJcbiAgICAgICAgPyAocmQgfHwgZG9Sb3VuZCkgJiYgKHJtID09IDAgfHwgcm0gPT0gKHgucyA8IDAgPyAzIDogMikpXHJcbiAgICAgICAgOiByZCA+IDUgfHwgcmQgPT0gNSAmJiAocm0gPT0gNCB8fCBkb1JvdW5kIHx8IHJtID09IDYgJiZcclxuXHJcbiAgICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBkaWdpdCB0byB0aGUgbGVmdCBvZiB0aGUgcm91bmRpbmcgZGlnaXQgaXMgb2RkLlxyXG4gICAgICAgICAgKChpID4gMCA/IGogPiAwID8gdyAvIG1hdGhwb3coMTAsIG4gLSBqKSA6IDAgOiB4ZFt4ZGkgLSAxXSkgJSAxMCkgJiAxIHx8XHJcbiAgICAgICAgICAgIHJtID09ICh4LnMgPCAwID8gOCA6IDcpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2QgPCAxIHx8ICF4ZFswXSkge1xyXG4gICAgICBpZiAoZG9Sb3VuZCkge1xyXG4gICAgICAgIGsgPSBnZXRCYXNlMTBFeHBvbmVudCh4KTtcclxuICAgICAgICB4ZC5sZW5ndGggPSAxO1xyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IHNkIHRvIGRlY2ltYWwgcGxhY2VzLlxyXG4gICAgICAgIHNkID0gc2QgLSBrIC0gMTtcclxuXHJcbiAgICAgICAgLy8gMSwgMC4xLCAwLjAxLCAwLjAwMSwgMC4wMDAxIGV0Yy5cclxuICAgICAgICB4ZFswXSA9IG1hdGhwb3coMTAsIChMT0dfQkFTRSAtIHNkICUgTE9HX0JBU0UpICUgTE9HX0JBU0UpO1xyXG4gICAgICAgIHguZSA9IG1hdGhmbG9vcigtc2QgLyBMT0dfQkFTRSkgfHwgMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB4ZC5sZW5ndGggPSAxO1xyXG5cclxuICAgICAgICAvLyBaZXJvLlxyXG4gICAgICAgIHhkWzBdID0geC5lID0geC5zID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIGV4Y2VzcyBkaWdpdHMuXHJcbiAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgIHhkLmxlbmd0aCA9IHhkaTtcclxuICAgICAgayA9IDE7XHJcbiAgICAgIHhkaS0tO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgeGQubGVuZ3RoID0geGRpICsgMTtcclxuICAgICAgayA9IG1hdGhwb3coMTAsIExPR19CQVNFIC0gaSk7XHJcblxyXG4gICAgICAvLyBFLmcuIDU2NzAwIGJlY29tZXMgNTYwMDAgaWYgNyBpcyB0aGUgcm91bmRpbmcgZGlnaXQuXHJcbiAgICAgIC8vIGogPiAwIG1lYW5zIGkgPiBudW1iZXIgb2YgbGVhZGluZyB6ZXJvcyBvZiB3LlxyXG4gICAgICB4ZFt4ZGldID0gaiA+IDAgPyAodyAvIG1hdGhwb3coMTAsIG4gLSBqKSAlIG1hdGhwb3coMTAsIGopIHwgMCkgKiBrIDogMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9Sb3VuZCkge1xyXG4gICAgICBmb3IgKDs7KSB7XHJcblxyXG4gICAgICAgIC8vIElzIHRoZSBkaWdpdCB0byBiZSByb3VuZGVkIHVwIGluIHRoZSBmaXJzdCB3b3JkIG9mIHhkP1xyXG4gICAgICAgIGlmICh4ZGkgPT0gMCkge1xyXG4gICAgICAgICAgaWYgKCh4ZFswXSArPSBrKSA9PSBCQVNFKSB7XHJcbiAgICAgICAgICAgIHhkWzBdID0gMTtcclxuICAgICAgICAgICAgKyt4LmU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHhkW3hkaV0gKz0gaztcclxuICAgICAgICAgIGlmICh4ZFt4ZGldICE9IEJBU0UpIGJyZWFrO1xyXG4gICAgICAgICAgeGRbeGRpLS1dID0gMDtcclxuICAgICAgICAgIGsgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIGZvciAoaSA9IHhkLmxlbmd0aDsgeGRbLS1pXSA9PT0gMDspIHhkLnBvcCgpO1xyXG5cclxuICAgIGlmIChleHRlcm5hbCAmJiAoeC5lID4gTUFYX0UgfHwgeC5lIDwgLU1BWF9FKSkge1xyXG4gICAgICB0aHJvdyBFcnJvcihleHBvbmVudE91dE9mUmFuZ2UgKyBnZXRCYXNlMTBFeHBvbmVudCh4KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHg7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gc3VidHJhY3QoeCwgeSkge1xyXG4gICAgdmFyIGQsIGUsIGksIGosIGssIGxlbiwgeGQsIHhlLCB4TFR5LCB5ZCxcclxuICAgICAgQ3RvciA9IHguY29uc3RydWN0b3IsXHJcbiAgICAgIHByID0gQ3Rvci5wcmVjaXNpb247XHJcblxyXG4gICAgLy8gUmV0dXJuIHkgbmVnYXRlZCBpZiB4IGlzIHplcm8uXHJcbiAgICAvLyBSZXR1cm4geCBpZiB5IGlzIHplcm8gYW5kIHggaXMgbm9uLXplcm8uXHJcbiAgICBpZiAoIXgucyB8fCAheS5zKSB7XHJcbiAgICAgIGlmICh5LnMpIHkucyA9IC15LnM7XHJcbiAgICAgIGVsc2UgeSA9IG5ldyBDdG9yKHgpO1xyXG4gICAgICByZXR1cm4gZXh0ZXJuYWwgPyByb3VuZCh5LCBwcikgOiB5O1xyXG4gICAgfVxyXG5cclxuICAgIHhkID0geC5kO1xyXG4gICAgeWQgPSB5LmQ7XHJcblxyXG4gICAgLy8geCBhbmQgeSBhcmUgbm9uLXplcm8gbnVtYmVycyB3aXRoIHRoZSBzYW1lIHNpZ24uXHJcblxyXG4gICAgZSA9IHkuZTtcclxuICAgIHhlID0geC5lO1xyXG4gICAgeGQgPSB4ZC5zbGljZSgpO1xyXG4gICAgayA9IHhlIC0gZTtcclxuXHJcbiAgICAvLyBJZiBleHBvbmVudHMgZGlmZmVyLi4uXHJcbiAgICBpZiAoaykge1xyXG4gICAgICB4TFR5ID0gayA8IDA7XHJcblxyXG4gICAgICBpZiAoeExUeSkge1xyXG4gICAgICAgIGQgPSB4ZDtcclxuICAgICAgICBrID0gLWs7XHJcbiAgICAgICAgbGVuID0geWQubGVuZ3RoO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGQgPSB5ZDtcclxuICAgICAgICBlID0geGU7XHJcbiAgICAgICAgbGVuID0geGQubGVuZ3RoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBOdW1iZXJzIHdpdGggbWFzc2l2ZWx5IGRpZmZlcmVudCBleHBvbmVudHMgd291bGQgcmVzdWx0IGluIGEgdmVyeSBoaWdoIG51bWJlciBvZiB6ZXJvc1xyXG4gICAgICAvLyBuZWVkaW5nIHRvIGJlIHByZXBlbmRlZCwgYnV0IHRoaXMgY2FuIGJlIGF2b2lkZWQgd2hpbGUgc3RpbGwgZW5zdXJpbmcgY29ycmVjdCByb3VuZGluZyBieVxyXG4gICAgICAvLyBsaW1pdGluZyB0aGUgbnVtYmVyIG9mIHplcm9zIHRvIGBNYXRoLmNlaWwocHIgLyBMT0dfQkFTRSkgKyAyYC5cclxuICAgICAgaSA9IE1hdGgubWF4KE1hdGguY2VpbChwciAvIExPR19CQVNFKSwgbGVuKSArIDI7XHJcblxyXG4gICAgICBpZiAoayA+IGkpIHtcclxuICAgICAgICBrID0gaTtcclxuICAgICAgICBkLmxlbmd0aCA9IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFByZXBlbmQgemVyb3MgdG8gZXF1YWxpc2UgZXhwb25lbnRzLlxyXG4gICAgICBkLnJldmVyc2UoKTtcclxuICAgICAgZm9yIChpID0gazsgaS0tOykgZC5wdXNoKDApO1xyXG4gICAgICBkLnJldmVyc2UoKTtcclxuXHJcbiAgICAvLyBCYXNlIDFlNyBleHBvbmVudHMgZXF1YWwuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgLy8gQ2hlY2sgZGlnaXRzIHRvIGRldGVybWluZSB3aGljaCBpcyB0aGUgYmlnZ2VyIG51bWJlci5cclxuXHJcbiAgICAgIGkgPSB4ZC5sZW5ndGg7XHJcbiAgICAgIGxlbiA9IHlkLmxlbmd0aDtcclxuICAgICAgeExUeSA9IGkgPCBsZW47XHJcbiAgICAgIGlmICh4TFR5KSBsZW4gPSBpO1xyXG5cclxuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHhkW2ldICE9IHlkW2ldKSB7XHJcbiAgICAgICAgICB4TFR5ID0geGRbaV0gPCB5ZFtpXTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgayA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHhMVHkpIHtcclxuICAgICAgZCA9IHhkO1xyXG4gICAgICB4ZCA9IHlkO1xyXG4gICAgICB5ZCA9IGQ7XHJcbiAgICAgIHkucyA9IC15LnM7XHJcbiAgICB9XHJcblxyXG4gICAgbGVuID0geGQubGVuZ3RoO1xyXG5cclxuICAgIC8vIEFwcGVuZCB6ZXJvcyB0byB4ZCBpZiBzaG9ydGVyLlxyXG4gICAgLy8gRG9uJ3QgYWRkIHplcm9zIHRvIHlkIGlmIHNob3J0ZXIgYXMgc3VidHJhY3Rpb24gb25seSBuZWVkcyB0byBzdGFydCBhdCB5ZCBsZW5ndGguXHJcbiAgICBmb3IgKGkgPSB5ZC5sZW5ndGggLSBsZW47IGkgPiAwOyAtLWkpIHhkW2xlbisrXSA9IDA7XHJcblxyXG4gICAgLy8gU3VidHJhY3QgeWQgZnJvbSB4ZC5cclxuICAgIGZvciAoaSA9IHlkLmxlbmd0aDsgaSA+IGs7KSB7XHJcbiAgICAgIGlmICh4ZFstLWldIDwgeWRbaV0pIHtcclxuICAgICAgICBmb3IgKGogPSBpOyBqICYmIHhkWy0tal0gPT09IDA7KSB4ZFtqXSA9IEJBU0UgLSAxO1xyXG4gICAgICAgIC0teGRbal07XHJcbiAgICAgICAgeGRbaV0gKz0gQkFTRTtcclxuICAgICAgfVxyXG5cclxuICAgICAgeGRbaV0gLT0geWRbaV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgZm9yICg7IHhkWy0tbGVuXSA9PT0gMDspIHhkLnBvcCgpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBsZWFkaW5nIHplcm9zIGFuZCBhZGp1c3QgZXhwb25lbnQgYWNjb3JkaW5nbHkuXHJcbiAgICBmb3IgKDsgeGRbMF0gPT09IDA7IHhkLnNoaWZ0KCkpIC0tZTtcclxuXHJcbiAgICAvLyBaZXJvP1xyXG4gICAgaWYgKCF4ZFswXSkgcmV0dXJuIG5ldyBDdG9yKDApO1xyXG5cclxuICAgIHkuZCA9IHhkO1xyXG4gICAgeS5lID0gZTtcclxuXHJcbiAgICAvL3JldHVybiBleHRlcm5hbCAmJiB4ZC5sZW5ndGggPj0gcHIgLyBMT0dfQkFTRSA/IHJvdW5kKHksIHByKSA6IHk7XHJcbiAgICByZXR1cm4gZXh0ZXJuYWwgPyByb3VuZCh5LCBwcikgOiB5O1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHRvU3RyaW5nKHgsIGlzRXhwLCBzZCkge1xyXG4gICAgdmFyIGssXHJcbiAgICAgIGUgPSBnZXRCYXNlMTBFeHBvbmVudCh4KSxcclxuICAgICAgc3RyID0gZGlnaXRzVG9TdHJpbmcoeC5kKSxcclxuICAgICAgbGVuID0gc3RyLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoaXNFeHApIHtcclxuICAgICAgaWYgKHNkICYmIChrID0gc2QgLSBsZW4pID4gMCkge1xyXG4gICAgICAgIHN0ciA9IHN0ci5jaGFyQXQoMCkgKyAnLicgKyBzdHIuc2xpY2UoMSkgKyBnZXRaZXJvU3RyaW5nKGspO1xyXG4gICAgICB9IGVsc2UgaWYgKGxlbiA+IDEpIHtcclxuICAgICAgICBzdHIgPSBzdHIuY2hhckF0KDApICsgJy4nICsgc3RyLnNsaWNlKDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdHIgPSBzdHIgKyAoZSA8IDAgPyAnZScgOiAnZSsnKSArIGU7XHJcbiAgICB9IGVsc2UgaWYgKGUgPCAwKSB7XHJcbiAgICAgIHN0ciA9ICcwLicgKyBnZXRaZXJvU3RyaW5nKC1lIC0gMSkgKyBzdHI7XHJcbiAgICAgIGlmIChzZCAmJiAoayA9IHNkIC0gbGVuKSA+IDApIHN0ciArPSBnZXRaZXJvU3RyaW5nKGspO1xyXG4gICAgfSBlbHNlIGlmIChlID49IGxlbikge1xyXG4gICAgICBzdHIgKz0gZ2V0WmVyb1N0cmluZyhlICsgMSAtIGxlbik7XHJcbiAgICAgIGlmIChzZCAmJiAoayA9IHNkIC0gZSAtIDEpID4gMCkgc3RyID0gc3RyICsgJy4nICsgZ2V0WmVyb1N0cmluZyhrKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICgoayA9IGUgKyAxKSA8IGxlbikgc3RyID0gc3RyLnNsaWNlKDAsIGspICsgJy4nICsgc3RyLnNsaWNlKGspO1xyXG4gICAgICBpZiAoc2QgJiYgKGsgPSBzZCAtIGxlbikgPiAwKSB7XHJcbiAgICAgICAgaWYgKGUgKyAxID09PSBsZW4pIHN0ciArPSAnLic7XHJcbiAgICAgICAgc3RyICs9IGdldFplcm9TdHJpbmcoayk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geC5zIDwgMCA/ICctJyArIHN0ciA6IHN0cjtcclxuICB9XHJcblxyXG5cclxuICAvLyBEb2VzIG5vdCBzdHJpcCB0cmFpbGluZyB6ZXJvcy5cclxuICBmdW5jdGlvbiB0cnVuY2F0ZShhcnIsIGxlbikge1xyXG4gICAgaWYgKGFyci5sZW5ndGggPiBsZW4pIHtcclxuICAgICAgYXJyLmxlbmd0aCA9IGxlbjtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gRGVjaW1hbCBtZXRob2RzXHJcblxyXG5cclxuICAvKlxyXG4gICAqICBjbG9uZVxyXG4gICAqICBjb25maWcvc2V0XHJcbiAgICovXHJcblxyXG5cclxuICAvKlxyXG4gICAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgRGVjaW1hbCBjb25zdHJ1Y3RvciB3aXRoIHRoZSBzYW1lIGNvbmZpZ3VyYXRpb24gcHJvcGVydGllcyBhcyB0aGlzIERlY2ltYWxcclxuICAgKiBjb25zdHJ1Y3Rvci5cclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGNsb25lKG9iaikge1xyXG4gICAgdmFyIGksIHAsIHBzO1xyXG5cclxuICAgIC8qXHJcbiAgICAgKiBUaGUgRGVjaW1hbCBjb25zdHJ1Y3RvciBhbmQgZXhwb3J0ZWQgZnVuY3Rpb24uXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgRGVjaW1hbCBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiB2YWx1ZSB7bnVtYmVyfHN0cmluZ3xEZWNpbWFsfSBBIG51bWVyaWMgdmFsdWUuXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBEZWNpbWFsKHZhbHVlKSB7XHJcbiAgICAgIHZhciB4ID0gdGhpcztcclxuXHJcbiAgICAgIC8vIERlY2ltYWwgY2FsbGVkIHdpdGhvdXQgbmV3LlxyXG4gICAgICBpZiAoISh4IGluc3RhbmNlb2YgRGVjaW1hbCkpIHJldHVybiBuZXcgRGVjaW1hbCh2YWx1ZSk7XHJcblxyXG4gICAgICAvLyBSZXRhaW4gYSByZWZlcmVuY2UgdG8gdGhpcyBEZWNpbWFsIGNvbnN0cnVjdG9yLCBhbmQgc2hhZG93IERlY2ltYWwucHJvdG90eXBlLmNvbnN0cnVjdG9yXHJcbiAgICAgIC8vIHdoaWNoIHBvaW50cyB0byBPYmplY3QuXHJcbiAgICAgIHguY29uc3RydWN0b3IgPSBEZWNpbWFsO1xyXG5cclxuICAgICAgLy8gRHVwbGljYXRlLlxyXG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEZWNpbWFsKSB7XHJcbiAgICAgICAgeC5zID0gdmFsdWUucztcclxuICAgICAgICB4LmUgPSB2YWx1ZS5lO1xyXG4gICAgICAgIHguZCA9ICh2YWx1ZSA9IHZhbHVlLmQpID8gdmFsdWUuc2xpY2UoKSA6IHZhbHVlO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuXHJcbiAgICAgICAgLy8gUmVqZWN0IEluZmluaXR5L05hTi5cclxuICAgICAgICBpZiAodmFsdWUgKiAwICE9PSAwKSB7XHJcbiAgICAgICAgICB0aHJvdyBFcnJvcihpbnZhbGlkQXJndW1lbnQgKyB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICB4LnMgPSAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPCAwKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IC12YWx1ZTtcclxuICAgICAgICAgIHgucyA9IC0xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB4LnMgPSAwO1xyXG4gICAgICAgICAgeC5lID0gMDtcclxuICAgICAgICAgIHguZCA9IFswXTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZhc3QgcGF0aCBmb3Igc21hbGwgaW50ZWdlcnMuXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB+fnZhbHVlICYmIHZhbHVlIDwgMWU3KSB7XHJcbiAgICAgICAgICB4LmUgPSAwO1xyXG4gICAgICAgICAgeC5kID0gW3ZhbHVlXTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYXJzZURlY2ltYWwoeCwgdmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIHZhbHVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTWludXMgc2lnbj9cclxuICAgICAgaWYgKHZhbHVlLmNoYXJDb2RlQXQoMCkgPT09IDQ1KSB7XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxKTtcclxuICAgICAgICB4LnMgPSAtMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB4LnMgPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNEZWNpbWFsLnRlc3QodmFsdWUpKSBwYXJzZURlY2ltYWwoeCwgdmFsdWUpO1xyXG4gICAgICBlbHNlIHRocm93IEVycm9yKGludmFsaWRBcmd1bWVudCArIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBEZWNpbWFsLnByb3RvdHlwZSA9IFA7XHJcblxyXG4gICAgRGVjaW1hbC5ST1VORF9VUCA9IDA7XHJcbiAgICBEZWNpbWFsLlJPVU5EX0RPV04gPSAxO1xyXG4gICAgRGVjaW1hbC5ST1VORF9DRUlMID0gMjtcclxuICAgIERlY2ltYWwuUk9VTkRfRkxPT1IgPSAzO1xyXG4gICAgRGVjaW1hbC5ST1VORF9IQUxGX1VQID0gNDtcclxuICAgIERlY2ltYWwuUk9VTkRfSEFMRl9ET1dOID0gNTtcclxuICAgIERlY2ltYWwuUk9VTkRfSEFMRl9FVkVOID0gNjtcclxuICAgIERlY2ltYWwuUk9VTkRfSEFMRl9DRUlMID0gNztcclxuICAgIERlY2ltYWwuUk9VTkRfSEFMRl9GTE9PUiA9IDg7XHJcblxyXG4gICAgRGVjaW1hbC5jbG9uZSA9IGNsb25lO1xyXG4gICAgRGVjaW1hbC5jb25maWcgPSBEZWNpbWFsLnNldCA9IGNvbmZpZztcclxuXHJcbiAgICBpZiAob2JqID09PSB2b2lkIDApIG9iaiA9IHt9O1xyXG4gICAgaWYgKG9iaikge1xyXG4gICAgICBwcyA9IFsncHJlY2lzaW9uJywgJ3JvdW5kaW5nJywgJ3RvRXhwTmVnJywgJ3RvRXhwUG9zJywgJ0xOMTAnXTtcclxuICAgICAgZm9yIChpID0gMDsgaSA8IHBzLmxlbmd0aDspIGlmICghb2JqLmhhc093blByb3BlcnR5KHAgPSBwc1tpKytdKSkgb2JqW3BdID0gdGhpc1twXTtcclxuICAgIH1cclxuXHJcbiAgICBEZWNpbWFsLmNvbmZpZyhvYmopO1xyXG5cclxuICAgIHJldHVybiBEZWNpbWFsO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogQ29uZmlndXJlIGdsb2JhbCBzZXR0aW5ncyBmb3IgYSBEZWNpbWFsIGNvbnN0cnVjdG9yLlxyXG4gICAqXHJcbiAgICogYG9iamAgaXMgYW4gb2JqZWN0IHdpdGggb25lIG9yIG1vcmUgb2YgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzLFxyXG4gICAqXHJcbiAgICogICBwcmVjaXNpb24gIHtudW1iZXJ9XHJcbiAgICogICByb3VuZGluZyAgIHtudW1iZXJ9XHJcbiAgICogICB0b0V4cE5lZyAgIHtudW1iZXJ9XHJcbiAgICogICB0b0V4cFBvcyAgIHtudW1iZXJ9XHJcbiAgICpcclxuICAgKiBFLmcuIERlY2ltYWwuY29uZmlnKHsgcHJlY2lzaW9uOiAyMCwgcm91bmRpbmc6IDQgfSlcclxuICAgKlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGNvbmZpZyhvYmopIHtcclxuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IEVycm9yKGRlY2ltYWxFcnJvciArICdPYmplY3QgZXhwZWN0ZWQnKTtcclxuICAgIH1cclxuICAgIHZhciBpLCBwLCB2LFxyXG4gICAgICBwcyA9IFtcclxuICAgICAgICAncHJlY2lzaW9uJywgMSwgTUFYX0RJR0lUUyxcclxuICAgICAgICAncm91bmRpbmcnLCAwLCA4LFxyXG4gICAgICAgICd0b0V4cE5lZycsIC0xIC8gMCwgMCxcclxuICAgICAgICAndG9FeHBQb3MnLCAwLCAxIC8gMFxyXG4gICAgICBdO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBwcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICBpZiAoKHYgPSBvYmpbcCA9IHBzW2ldXSkgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmIChtYXRoZmxvb3IodikgPT09IHYgJiYgdiA+PSBwc1tpICsgMV0gJiYgdiA8PSBwc1tpICsgMl0pIHRoaXNbcF0gPSB2O1xyXG4gICAgICAgIGVsc2UgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgcCArICc6ICcgKyB2KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICgodiA9IG9ialtwID0gJ0xOMTAnXSkgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh2ID09IE1hdGguTE4xMCkgdGhpc1twXSA9IG5ldyB0aGlzKHYpO1xyXG4gICAgICAgIGVsc2UgdGhyb3cgRXJyb3IoaW52YWxpZEFyZ3VtZW50ICsgcCArICc6ICcgKyB2KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG5cclxuICAvLyBDcmVhdGUgYW5kIGNvbmZpZ3VyZSBpbml0aWFsIERlY2ltYWwgY29uc3RydWN0b3IuXHJcbiAgRGVjaW1hbCA9IGNsb25lKERlY2ltYWwpO1xyXG5cclxuICBEZWNpbWFsWydkZWZhdWx0J10gPSBEZWNpbWFsLkRlY2ltYWwgPSBEZWNpbWFsO1xyXG5cclxuICAvLyBJbnRlcm5hbCBjb25zdGFudC5cclxuICBPTkUgPSBuZXcgRGVjaW1hbCgxKTtcclxuXHJcblxyXG4gIC8vIEV4cG9ydC5cclxuXHJcblxyXG4gIC8vIEFNRC5cclxuICBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBEZWNpbWFsO1xyXG4gICAgfSk7XHJcblxyXG4gIC8vIE5vZGUgYW5kIG90aGVyIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMuXHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IERlY2ltYWw7XHJcblxyXG4gICAgLy8gQnJvd3Nlci5cclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKCFnbG9iYWxTY29wZSkge1xyXG4gICAgICBnbG9iYWxTY29wZSA9IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYgJiYgc2VsZi5zZWxmID09IHNlbGZcclxuICAgICAgICA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdsb2JhbFNjb3BlLkRlY2ltYWwgPSBEZWNpbWFsO1xyXG4gIH1cclxufSkodGhpcyk7XHJcbiIsIi8qISBNb21lbnQgRHVyYXRpb24gRm9ybWF0IHYyLjIuMlxuICogIGh0dHBzOi8vZ2l0aHViLmNvbS9qc21yZWVzZS9tb21lbnQtZHVyYXRpb24tZm9ybWF0XG4gKiAgRGF0ZTogMjAxOC0wMi0xNlxuICpcbiAqICBEdXJhdGlvbiBmb3JtYXQgcGx1Z2luIGZ1bmN0aW9uIGZvciB0aGUgTW9tZW50LmpzIGxpYnJhcnlcbiAqICBodHRwOi8vbW9tZW50anMuY29tL1xuICpcbiAqICBDb3B5cmlnaHQgMjAxOCBKb2huIE1hZGhhdmFuLVJlZXNlXG4gKiAgUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cblxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbJ21vbWVudCddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXQgb25seSBDb21tb25KUy1saWtlXG4gICAgICAgIC8vIGVudmlyb21lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cywgbGlrZSBOb2RlLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ21vbWVudCcpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gSWYgbW9tZW50IGlzIG5vdCBhdmFpbGFibGUsIGxlYXZlIHRoZSBzZXR1cCB1cCB0byB0aGUgdXNlci5cbiAgICAgICAgICAgIC8vIExpa2Ugd2hlbiB1c2luZyBtb21lbnQtdGltZXpvbmUgb3Igc2ltaWxhciBtb21lbnQtYmFzZWQgcGFja2FnZS5cbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyb290KSB7XG4gICAgICAgIC8vIEdsb2JhbHMuXG4gICAgICAgIHJvb3QubW9tZW50RHVyYXRpb25Gb3JtYXRTZXR1cCA9IHJvb3QubW9tZW50ID8gZmFjdG9yeShyb290Lm1vbWVudCkgOiBmYWN0b3J5O1xuICAgIH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChtb21lbnQpIHtcbiAgICAvLyBgTnVtYmVyI3RvbG9jYWxlU3RyaW5nYCBpcyB0ZXN0ZWQgb24gcGx1Z2luIGluaXRpYWxpemF0aW9uLlxuICAgIC8vIElmIHRoZSBmZWF0dXJlIHRlc3QgcGFzc2VzLCBgdG9Mb2NhbGVTdHJpbmdXb3Jrc2Agd2lsbCBiZSBzZXQgdG8gYHRydWVgIGFuZCB0aGVcbiAgICAvLyBuYXRpdmUgZnVuY3Rpb24gd2lsbCBiZSB1c2VkIHRvIGdlbmVyYXRlIGZvcm1hdHRlZCBvdXRwdXQuIElmIHRoZSBmZWF0dXJlXG4gICAgLy8gdGVzdCBmYWlscywgdGhlIGZhbGxiYWNrIGZvcm1hdCBmdW5jdGlvbiBpbnRlcm5hbCB0byB0aGlzIHBsdWdpbiB3aWxsIGJlXG4gICAgLy8gdXNlZC5cbiAgICB2YXIgdG9Mb2NhbGVTdHJpbmdXb3JrcyA9IGZhbHNlO1xuXG4gICAgLy8gYE51bWJlciN0b0xvY2FsZVN0cmluZ2Agcm91bmRzIGluY29ycmVjdGx5IGZvciBzZWxlY3QgbnVtYmVycyBpbiBNaWNyb3NvZnRcbiAgICAvLyBlbnZpcm9ubWVudHMgKEVkZ2UsIElFMTEsIFdpbmRvd3MgUGhvbmUpIGFuZCBwb3NzaWJseSBvdGhlciBlbnZpcm9ubWVudHMuXG4gICAgLy8gSWYgdGhlIHJvdW5kaW5nIHRlc3QgZmFpbHMgYW5kIGB0b0xvY2FsZVN0cmluZ2Agd2lsbCBiZSB1c2VkIGZvciBmb3JtYXR0aW5nLFxuICAgIC8vIHRoZSBwbHVnaW4gd2lsbCBcInByZS1yb3VuZFwiIG51bWJlciB2YWx1ZXMgdXNpbmcgdGhlIGZhbGxiYWNrIG51bWJlciBmb3JtYXRcbiAgICAvLyBmdW5jdGlvbiBiZWZvcmUgcGFzc2luZyB0aGVtIHRvIGB0b0xvY2FsZVN0cmluZ2AgZm9yIGZpbmFsIGZvcm1hdHRpbmcuXG4gICAgdmFyIHRvTG9jYWxlU3RyaW5nUm91bmRpbmdXb3JrcyA9IGZhbHNlO1xuXG4gICAgLy8gYEludGwuTnVtYmVyRm9ybWF0I2Zvcm1hdGAgaXMgdGVzdGVkIG9uIHBsdWdpbiBpbml0aWFsaXphdGlvbi5cbiAgICAvLyBJZiB0aGUgZmVhdHVyZSB0ZXN0IHBhc3NlcywgYGludGxOdW1iZXJGb3JtYXRSb3VuZGluZ1dvcmtzYCB3aWxsIGJlIHNldCB0b1xuICAgIC8vIGB0cnVlYCBhbmQgdGhlIG5hdGl2ZSBmdW5jdGlvbiB3aWxsIGJlIHVzZWQgdG8gZ2VuZXJhdGUgZm9ybWF0dGVkIG91dHB1dC5cbiAgICAvLyBJZiB0aGUgZmVhdHVyZSB0ZXN0IGZhaWxzLCBlaXRoZXIgYE51bWJlciN0b2xvY2FsZVN0cmluZ2AgKGlmXG4gICAgLy8gYHRvTG9jYWxlU3RyaW5nV29ya3NgIGlzIGB0cnVlYCksIG9yIHRoZSBmYWxsYmFjayBmb3JtYXQgZnVuY3Rpb24gaW50ZXJuYWxcbiAgICAvLyAgdG8gdGhpcyBwbHVnaW4gd2lsbCBiZSB1c2VkLlxuICAgIHZhciBpbnRsTnVtYmVyRm9ybWF0V29ya3MgPSBmYWxzZTtcblxuICAgIC8vIGBJbnRsLk51bWJlckZvcm1hdCNmb3JtYXRgIHJvdW5kcyBpbmNvcnJlY3RseSBmb3Igc2VsZWN0IG51bWJlcnMgaW4gTWljcm9zb2Z0XG4gICAgLy8gZW52aXJvbm1lbnRzIChFZGdlLCBJRTExLCBXaW5kb3dzIFBob25lKSBhbmQgcG9zc2libHkgb3RoZXIgZW52aXJvbm1lbnRzLlxuICAgIC8vIElmIHRoZSByb3VuZGluZyB0ZXN0IGZhaWxzIGFuZCBgSW50bC5OdW1iZXJGb3JtYXQjZm9ybWF0YCB3aWxsIGJlIHVzZWQgZm9yXG4gICAgLy8gZm9ybWF0dGluZywgdGhlIHBsdWdpbiB3aWxsIFwicHJlLXJvdW5kXCIgbnVtYmVyIHZhbHVlcyB1c2luZyB0aGUgZmFsbGJhY2sgbnVtYmVyXG4gICAgLy8gZm9ybWF0IGZ1bmN0aW9uIGJlZm9yZSBwYXNzaW5nIHRoZW0gdG8gYEludGwuTnVtYmVyRm9ybWF0I2Zvcm1hdGAgZm9yIGZpbmFsXG4gICAgLy8gZm9ybWF0dGluZy5cbiAgICB2YXIgaW50bE51bWJlckZvcm1hdFJvdW5kaW5nV29ya3MgPSBmYWxzZTtcblxuICAgIC8vIFRva2VuIHR5cGUgbmFtZXMgaW4gb3JkZXIgb2YgZGVzY2VuZGluZyBtYWduaXR1ZGUuXG4gICAgdmFyIHR5cGVzID0gXCJlc2NhcGUgeWVhcnMgbW9udGhzIHdlZWtzIGRheXMgaG91cnMgbWludXRlcyBzZWNvbmRzIG1pbGxpc2Vjb25kcyBnZW5lcmFsXCIuc3BsaXQoXCIgXCIpO1xuXG4gICAgdmFyIGJ1YmJsZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwic2Vjb25kc1wiLFxuICAgICAgICAgICAgdGFyZ2V0czogW1xuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJtaW51dGVzXCIsIHZhbHVlOiA2MCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJob3Vyc1wiLCB2YWx1ZTogMzYwMCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJkYXlzXCIsIHZhbHVlOiA4NjQwMCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ3ZWVrc1wiLCB2YWx1ZTogNjA0ODAwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIm1vbnRoc1wiLCB2YWx1ZTogMjY3ODQwMCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ5ZWFyc1wiLCB2YWx1ZTogMzE1MzYwMDAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcIm1pbnV0ZXNcIixcbiAgICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwiaG91cnNcIiwgdmFsdWU6IDYwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcImRheXNcIiwgdmFsdWU6IDE0NDAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwid2Vla3NcIiwgdmFsdWU6IDEwMDgwIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcIm1vbnRoc1wiLCB2YWx1ZTogNDQ2NDAgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwieWVhcnNcIiwgdmFsdWU6IDUyNTYwMCB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwiaG91cnNcIixcbiAgICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwiZGF5c1wiLCB2YWx1ZTogMjQgfSxcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwid2Vla3NcIiwgdmFsdWU6IDE2OCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJtb250aHNcIiwgdmFsdWU6IDc0NCB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ5ZWFyc1wiLCB2YWx1ZTogODc2MCB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwiZGF5c1wiLFxuICAgICAgICAgICAgdGFyZ2V0czogW1xuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ3ZWVrc1wiLCB2YWx1ZTogNyB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJtb250aHNcIiwgdmFsdWU6IDMxIH0sXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInllYXJzXCIsIHZhbHVlOiAzNjUgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcIm1vbnRoc1wiLFxuICAgICAgICAgICAgdGFyZ2V0czogW1xuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJ5ZWFyc1wiLCB2YWx1ZTogMTIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgXTtcblxuICAgIC8vIHN0cmluZ0luY2x1ZGVzXG4gICAgZnVuY3Rpb24gc3RyaW5nSW5jbHVkZXMoc3RyLCBzZWFyY2gpIHtcbiAgICAgICAgaWYgKHNlYXJjaC5sZW5ndGggPiBzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0ci5pbmRleE9mKHNlYXJjaCkgIT09IC0xO1xuICAgIH1cblxuICAgIC8vIHJlcGVhdFplcm8ocXR5KVxuICAgIC8vIFJldHVybnMgXCIwXCIgcmVwZWF0ZWQgYHF0eWAgdGltZXMuXG4gICAgLy8gYHF0eWAgbXVzdCBiZSBhIGludGVnZXIgPj0gMC5cbiAgICBmdW5jdGlvbiByZXBlYXRaZXJvKHF0eSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcblxuICAgICAgICB3aGlsZSAocXR5KSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gXCIwXCI7XG4gICAgICAgICAgICBxdHkgLT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RyaW5nUm91bmQoZGlnaXRzKSB7XG4gICAgICAgIHZhciBkaWdpdHNBcnJheSA9IGRpZ2l0cy5zcGxpdChcIlwiKS5yZXZlcnNlKCk7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIGNhcnJ5ID0gdHJ1ZTtcblxuICAgICAgICB3aGlsZSAoY2FycnkgJiYgaSA8IGRpZ2l0c0FycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlnaXRzQXJyYXlbaV0gPT09IFwiOVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpZ2l0c0FycmF5W2ldID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGlnaXRzQXJyYXlbaV0gPSAocGFyc2VJbnQoZGlnaXRzQXJyYXlbaV0sIDEwKSArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGNhcnJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoZGlnaXRzQXJyYXlbaV0sIDEwKSA8IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FycnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkaWdpdHNBcnJheVtpXSA9IFwiMFwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FycnkpIHtcbiAgICAgICAgICAgIGRpZ2l0c0FycmF5LnB1c2goXCIxXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRpZ2l0c0FycmF5LnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgIH1cblxuICAgIC8vIGNhY2hlZE51bWJlckZvcm1hdFxuICAgIC8vIFJldHVybnMgYW4gYEludGwuTnVtYmVyRm9ybWF0YCBpbnN0YW5jZSBmb3IgdGhlIGdpdmVuIGxvY2FsZSBhbmQgY29uZmlndXJhdGlvbi5cbiAgICAvLyBPbiBmaXJzdCB1c2Ugb2YgYSBwYXJ0aWN1bGFyIGNvbmZpZ3VyYXRpb24sIHRoZSBpbnN0YW5jZSBpcyBjYWNoZWQgZm9yIGZhc3RcbiAgICAvLyByZXBlYXQgYWNjZXNzLlxuICAgIGZ1bmN0aW9uIGNhY2hlZE51bWJlckZvcm1hdChsb2NhbGUsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgc29ydGVkLCBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIGBvcHRpb25zYFxuICAgICAgICAvLyBmb3IgdXNlIGFzIHBhcnQgb2YgdGhlIGNhY2hlIGtleVxuICAgICAgICB2YXIgb3B0aW9uc1N0cmluZyA9IG1hcChcbiAgICAgICAgICAgIGtleXMob3B0aW9ucykuc29ydCgpLFxuICAgICAgICAgICAgZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleSArICc6JyArIG9wdGlvbnNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKS5qb2luKCcsJyk7XG5cbiAgICAgICAgLy8gU2V0IG91ciBjYWNoZSBrZXlcbiAgICAgICAgdmFyIGNhY2hlS2V5ID0gbG9jYWxlICsgJysnICsgb3B0aW9uc1N0cmluZztcblxuICAgICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIHRoaXMgY29uZmlndXJhdGlvbiBjYWNoZWQsIGNvbmZpZ3VyZSBhbmQgY2FjaGUgaXRcbiAgICAgICAgaWYgKCFjYWNoZWROdW1iZXJGb3JtYXQuY2FjaGVbY2FjaGVLZXldKSB7XG4gICAgICAgICAgICBjYWNoZWROdW1iZXJGb3JtYXQuY2FjaGVbY2FjaGVLZXldID0gSW50bC5OdW1iZXJGb3JtYXQobG9jYWxlLCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgY2FjaGVkIHZlcnNpb24gb2YgdGhpcyBjb25maWd1cmF0aW9uXG4gICAgICAgIHJldHVybiBjYWNoZWROdW1iZXJGb3JtYXQuY2FjaGVbY2FjaGVLZXldO1xuICAgIH1cbiAgICBjYWNoZWROdW1iZXJGb3JtYXQuY2FjaGUgPSB7fTtcblxuICAgIC8vIGZvcm1hdE51bWJlclxuICAgIC8vIEZvcm1hdHMgYW55IG51bWJlciBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gemVybyB1c2luZyB0aGVzZSBvcHRpb25zOlxuICAgIC8vIC0gdXNlckxvY2FsZVxuICAgIC8vIC0gdXNlVG9Mb2NhbGVTdHJpbmdcbiAgICAvLyAtIHVzZUdyb3VwaW5nXG4gICAgLy8gLSBncm91cGluZ1xuICAgIC8vIC0gbWF4aW11bVNpZ25pZmljYW50RGlnaXRzXG4gICAgLy8gLSBtaW5pbXVtSW50ZWdlckRpZ2l0c1xuICAgIC8vIC0gZnJhY3Rpb25EaWdpdHNcbiAgICAvLyAtIGdyb3VwaW5nU2VwYXJhdG9yXG4gICAgLy8gLSBkZWNpbWFsU2VwYXJhdG9yXG4gICAgLy9cbiAgICAvLyBgdXNlVG9Mb2NhbGVTdHJpbmdgIHdpbGwgdXNlIGBJbnRsLk51bWJlckZvcm1hdGAgb3IgYHRvTG9jYWxlU3RyaW5nYCBmb3IgZm9ybWF0dGluZy5cbiAgICAvLyBgdXNlckxvY2FsZWAgb3B0aW9uIGlzIHBhc3NlZCB0aHJvdWdoIHRvIHRoZSBmb3JtYXR0aW5nIGZ1bmN0aW9uLlxuICAgIC8vIGBmcmFjdGlvbkRpZ2l0c2AgaXMgcGFzc2VkIHRocm91Z2ggdG8gYG1heGltdW1GcmFjdGlvbkRpZ2l0c2AgYW5kIGBtaW5pbXVtRnJhY3Rpb25EaWdpdHNgXG4gICAgLy8gVXNpbmcgYG1heGltdW1TaWduaWZpY2FudERpZ2l0c2Agd2lsbCBvdmVycmlkZSBgbWluaW11bUludGVnZXJEaWdpdHNgIGFuZCBgZnJhY3Rpb25EaWdpdHNgLlxuICAgIGZ1bmN0aW9uIGZvcm1hdE51bWJlcihudW1iZXIsIG9wdGlvbnMsIHVzZXJMb2NhbGUpIHtcbiAgICAgICAgdmFyIHVzZVRvTG9jYWxlU3RyaW5nID0gb3B0aW9ucy51c2VUb0xvY2FsZVN0cmluZztcbiAgICAgICAgdmFyIHVzZUdyb3VwaW5nID0gb3B0aW9ucy51c2VHcm91cGluZztcbiAgICAgICAgdmFyIGdyb3VwaW5nID0gdXNlR3JvdXBpbmcgJiYgb3B0aW9ucy5ncm91cGluZy5zbGljZSgpO1xuICAgICAgICB2YXIgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzID0gb3B0aW9ucy5tYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM7XG4gICAgICAgIHZhciBtaW5pbXVtSW50ZWdlckRpZ2l0cyA9IG9wdGlvbnMubWluaW11bUludGVnZXJEaWdpdHMgfHwgMTtcbiAgICAgICAgdmFyIGZyYWN0aW9uRGlnaXRzID0gb3B0aW9ucy5mcmFjdGlvbkRpZ2l0cyB8fCAwO1xuICAgICAgICB2YXIgZ3JvdXBpbmdTZXBhcmF0b3IgPSBvcHRpb25zLmdyb3VwaW5nU2VwYXJhdG9yO1xuICAgICAgICB2YXIgZGVjaW1hbFNlcGFyYXRvciA9IG9wdGlvbnMuZGVjaW1hbFNlcGFyYXRvcjtcblxuICAgICAgICBpZiAodXNlVG9Mb2NhbGVTdHJpbmcgJiYgdXNlckxvY2FsZSkge1xuICAgICAgICAgICAgdmFyIGxvY2FsZVN0cmluZ09wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgbWluaW11bUludGVnZXJEaWdpdHM6IG1pbmltdW1JbnRlZ2VyRGlnaXRzLFxuICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB1c2VHcm91cGluZ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGZyYWN0aW9uRGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlU3RyaW5nT3B0aW9ucy5tYXhpbXVtRnJhY3Rpb25EaWdpdHMgPSBmcmFjdGlvbkRpZ2l0cztcbiAgICAgICAgICAgICAgICBsb2NhbGVTdHJpbmdPcHRpb25zLm1pbmltdW1GcmFjdGlvbkRpZ2l0cyA9IGZyYWN0aW9uRGlnaXRzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB0b0xvY2FsZVN0cmluZyBvdXRwdXQgaXMgXCIwLjBcIiBpbnN0ZWFkIG9mIFwiMFwiIGZvciBIVEMgYnJvd3NlcnNcbiAgICAgICAgICAgIC8vIHdoZW4gbWF4aW11bVNpZ25pZmljYW50RGlnaXRzIGlzIHNldC4gU2VlICM5Ni5cbiAgICAgICAgICAgIGlmIChtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgJiYgbnVtYmVyID4gMCkge1xuICAgICAgICAgICAgICAgIGxvY2FsZVN0cmluZ09wdGlvbnMubWF4aW11bVNpZ25pZmljYW50RGlnaXRzID0gbWF4aW11bVNpZ25pZmljYW50RGlnaXRzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW50bE51bWJlckZvcm1hdFdvcmtzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpbnRsTnVtYmVyRm9ybWF0Um91bmRpbmdXb3Jrcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm91bmRpbmdPcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgcm91bmRpbmdPcHRpb25zLnVzZUdyb3VwaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kaW5nT3B0aW9ucy5kZWNpbWFsU2VwYXJhdG9yID0gXCIuXCI7XG4gICAgICAgICAgICAgICAgICAgIG51bWJlciA9IHBhcnNlRmxvYXQoZm9ybWF0TnVtYmVyKG51bWJlciwgcm91bmRpbmdPcHRpb25zKSwgMTApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWROdW1iZXJGb3JtYXQodXNlckxvY2FsZSwgbG9jYWxlU3RyaW5nT3B0aW9ucykuZm9ybWF0KG51bWJlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghdG9Mb2NhbGVTdHJpbmdSb3VuZGluZ1dvcmtzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByb3VuZGluZ09wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICByb3VuZGluZ09wdGlvbnMudXNlR3JvdXBpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcm91bmRpbmdPcHRpb25zLmRlY2ltYWxTZXBhcmF0b3IgPSBcIi5cIjtcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyID0gcGFyc2VGbG9hdChmb3JtYXROdW1iZXIobnVtYmVyLCByb3VuZGluZ09wdGlvbnMpLCAxMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bWJlci50b0xvY2FsZVN0cmluZyh1c2VyTG9jYWxlLCBsb2NhbGVTdHJpbmdPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBudW1iZXJTdHJpbmc7XG5cbiAgICAgICAgLy8gQWRkIDEgdG8gZGlnaXQgb3V0cHV0IGxlbmd0aCBmb3IgZmxvYXRpbmcgcG9pbnQgZXJyb3JzIHdvcmthcm91bmQuIFNlZSBiZWxvdy5cbiAgICAgICAgaWYgKG1heGltdW1TaWduaWZpY2FudERpZ2l0cykge1xuICAgICAgICAgICAgbnVtYmVyU3RyaW5nID0gbnVtYmVyLnRvUHJlY2lzaW9uKG1heGltdW1TaWduaWZpY2FudERpZ2l0cyArIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtYmVyU3RyaW5nID0gbnVtYmVyLnRvRml4ZWQoZnJhY3Rpb25EaWdpdHMgKyAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbnRlZ2VyU3RyaW5nO1xuICAgICAgICB2YXIgZnJhY3Rpb25TdHJpbmc7XG4gICAgICAgIHZhciBleHBvbmVudFN0cmluZztcblxuICAgICAgICB2YXIgdGVtcCA9IG51bWJlclN0cmluZy5zcGxpdChcImVcIik7XG5cbiAgICAgICAgZXhwb25lbnRTdHJpbmcgPSB0ZW1wWzFdIHx8IFwiXCI7XG5cbiAgICAgICAgdGVtcCA9IHRlbXBbMF0uc3BsaXQoXCIuXCIpO1xuXG4gICAgICAgIGZyYWN0aW9uU3RyaW5nID0gdGVtcFsxXSB8fCBcIlwiO1xuICAgICAgICBpbnRlZ2VyU3RyaW5nID0gdGVtcFswXSB8fCBcIlwiO1xuXG4gICAgICAgIC8vIFdvcmthcm91bmQgZm9yIGZsb2F0aW5nIHBvaW50IGVycm9ycyBpbiBgdG9GaXhlZGAgYW5kIGB0b1ByZWNpc2lvbmAuXG4gICAgICAgIC8vICgzLjU1KS50b0ZpeGVkKDEpOyAtLT4gXCIzLjVcIlxuICAgICAgICAvLyAoMTIzLjU1IC0gMTIwKS50b1ByZWNpc2lvbigyKTsgLS0+IFwiMy41XCJcbiAgICAgICAgLy8gKDEyMy41NSAtIDEyMCk7IC0tPiAzLjU0OTk5OTk5OTk5OTk5N1xuICAgICAgICAvLyAoMTIzLjU1IC0gMTIwKS50b0ZpeGVkKDIpOyAtLT4gXCIzLjU1XCJcbiAgICAgICAgLy8gUm91bmQgYnkgZXhhbWluZyB0aGUgc3RyaW5nIG91dHB1dCBvZiB0aGUgbmV4dCBkaWdpdC5cblxuICAgICAgICAvLyAqKioqKioqKioqKioqKiogSW1wbGVtZW50IFN0cmluZyBSb3VuZGluZyBoZXJlICoqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgIC8vIENoZWNrIGludGVnZXJTdHJpbmcgKyBmcmFjdGlvblN0cmluZyBsZW5ndGggb2YgdG9QcmVjaXNpb24gYmVmb3JlIHJvdW5kaW5nLlxuICAgICAgICAvLyBDaGVjayBsZW5ndGggb2YgZnJhY3Rpb25TdHJpbmcgZnJvbSB0b0ZpeGVkIG91dHB1dCBiZWZvcmUgcm91bmRpbmcuXG4gICAgICAgIHZhciBpbnRlZ2VyTGVuZ3RoID0gaW50ZWdlclN0cmluZy5sZW5ndGg7XG4gICAgICAgIHZhciBmcmFjdGlvbkxlbmd0aCA9IGZyYWN0aW9uU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgdmFyIGRpZ2l0Q291bnQgPSBpbnRlZ2VyTGVuZ3RoICsgZnJhY3Rpb25MZW5ndGg7XG4gICAgICAgIHZhciBkaWdpdHMgPSBpbnRlZ2VyU3RyaW5nICsgZnJhY3Rpb25TdHJpbmc7XG5cbiAgICAgICAgaWYgKG1heGltdW1TaWduaWZpY2FudERpZ2l0cyAmJiBkaWdpdENvdW50ID09PSAobWF4aW11bVNpZ25pZmljYW50RGlnaXRzICsgMSkgfHwgIW1heGltdW1TaWduaWZpY2FudERpZ2l0cyAmJiBmcmFjdGlvbkxlbmd0aCA9PT0gKGZyYWN0aW9uRGlnaXRzICsgMSkpIHtcbiAgICAgICAgICAgIC8vIFJvdW5kIGRpZ2l0cy5cbiAgICAgICAgICAgIGRpZ2l0cyA9IHN0cmluZ1JvdW5kKGRpZ2l0cyk7XG5cbiAgICAgICAgICAgIGlmIChkaWdpdHMubGVuZ3RoID09PSBkaWdpdENvdW50ICsgMSkge1xuICAgICAgICAgICAgICAgIGludGVnZXJMZW5ndGggPSBpbnRlZ2VyTGVuZ3RoICsgMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRGlzY2FyZCBmaW5hbCBmcmFjdGlvbkRpZ2l0LlxuICAgICAgICAgICAgaWYgKGZyYWN0aW9uTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZGlnaXRzID0gZGlnaXRzLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2VwYXJhdGUgaW50ZWdlciBhbmQgZnJhY3Rpb24uXG4gICAgICAgICAgICBpbnRlZ2VyU3RyaW5nID0gZGlnaXRzLnNsaWNlKDAsIGludGVnZXJMZW5ndGgpO1xuICAgICAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSBkaWdpdHMuc2xpY2UoaW50ZWdlckxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUcmltIHRyYWlsaW5nIHplcm9lcyBmcm9tIGZyYWN0aW9uU3RyaW5nIGJlY2F1c2UgdG9QcmVjaXNpb24gb3V0cHV0c1xuICAgICAgICAvLyBwcmVjaXNpb24sIG5vdCBzaWduaWZpY2FudCBkaWdpdHMuXG4gICAgICAgIGlmIChtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMpIHtcbiAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gZnJhY3Rpb25TdHJpbmcucmVwbGFjZSgvMCokLywgXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGUgZXhwb25lbnQuXG4gICAgICAgIHZhciBleHBvbmVudCA9IHBhcnNlSW50KGV4cG9uZW50U3RyaW5nLCAxMCk7XG5cbiAgICAgICAgaWYgKGV4cG9uZW50ID4gMCkge1xuICAgICAgICAgICAgaWYgKGZyYWN0aW9uU3RyaW5nLmxlbmd0aCA8PSBleHBvbmVudCkge1xuICAgICAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gZnJhY3Rpb25TdHJpbmcgKyByZXBlYXRaZXJvKGV4cG9uZW50IC0gZnJhY3Rpb25TdHJpbmcubGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgIGludGVnZXJTdHJpbmcgPSBpbnRlZ2VyU3RyaW5nICsgZnJhY3Rpb25TdHJpbmc7XG4gICAgICAgICAgICAgICAgZnJhY3Rpb25TdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnRlZ2VyU3RyaW5nID0gaW50ZWdlclN0cmluZyArIGZyYWN0aW9uU3RyaW5nLnNsaWNlKDAsIGV4cG9uZW50KTtcbiAgICAgICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IGZyYWN0aW9uU3RyaW5nLnNsaWNlKGV4cG9uZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChleHBvbmVudCA8IDApIHtcbiAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gKHJlcGVhdFplcm8oTWF0aC5hYnMoZXhwb25lbnQpIC0gaW50ZWdlclN0cmluZy5sZW5ndGgpICsgaW50ZWdlclN0cmluZyArIGZyYWN0aW9uU3RyaW5nKTtcblxuICAgICAgICAgICAgaW50ZWdlclN0cmluZyA9IFwiMFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMpIHtcbiAgICAgICAgICAgIC8vIFRyaW0gb3IgcGFkIGZyYWN0aW9uIHdoZW4gbm90IHVzaW5nIG1heGltdW1TaWduaWZpY2FudERpZ2l0cy5cbiAgICAgICAgICAgIGZyYWN0aW9uU3RyaW5nID0gZnJhY3Rpb25TdHJpbmcuc2xpY2UoMCwgZnJhY3Rpb25EaWdpdHMpO1xuXG4gICAgICAgICAgICBpZiAoZnJhY3Rpb25TdHJpbmcubGVuZ3RoIDwgZnJhY3Rpb25EaWdpdHMpIHtcbiAgICAgICAgICAgICAgICBmcmFjdGlvblN0cmluZyA9IGZyYWN0aW9uU3RyaW5nICsgcmVwZWF0WmVybyhmcmFjdGlvbkRpZ2l0cyAtIGZyYWN0aW9uU3RyaW5nLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFBhZCBpbnRlZ2VyIHdoZW4gdXNpbmcgbWluaW11bUludGVnZXJEaWdpdHNcbiAgICAgICAgICAgIC8vIGFuZCBub3QgdXNpbmcgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzLlxuICAgICAgICAgICAgaWYgKGludGVnZXJTdHJpbmcubGVuZ3RoIDwgbWluaW11bUludGVnZXJEaWdpdHMpIHtcbiAgICAgICAgICAgICAgICBpbnRlZ2VyU3RyaW5nID0gcmVwZWF0WmVybyhtaW5pbXVtSW50ZWdlckRpZ2l0cyAtIGludGVnZXJTdHJpbmcubGVuZ3RoKSArIGludGVnZXJTdHJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZm9ybWF0dGVkU3RyaW5nID0gXCJcIjtcblxuICAgICAgICAvLyBIYW5kbGUgZ3JvdXBpbmcuXG4gICAgICAgIGlmICh1c2VHcm91cGluZykge1xuICAgICAgICAgICAgdGVtcCA9IGludGVnZXJTdHJpbmc7XG4gICAgICAgICAgICB2YXIgZ3JvdXA7XG5cbiAgICAgICAgICAgIHdoaWxlICh0ZW1wLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmIChncm91cGluZy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSBncm91cGluZy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChmb3JtYXR0ZWRTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gZ3JvdXBpbmdTZXBhcmF0b3IgKyBmb3JtYXR0ZWRTdHJpbmc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGVtcC5zbGljZSgtZ3JvdXApICsgZm9ybWF0dGVkU3RyaW5nO1xuXG4gICAgICAgICAgICAgICAgdGVtcCA9IHRlbXAuc2xpY2UoMCwgLWdyb3VwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IGludGVnZXJTdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgZGVjaW1hbFNlcGFyYXRvciBhbmQgZnJhY3Rpb24uXG4gICAgICAgIGlmIChmcmFjdGlvblN0cmluZykge1xuICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gZm9ybWF0dGVkU3RyaW5nICsgZGVjaW1hbFNlcGFyYXRvciArIGZyYWN0aW9uU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFN0cmluZztcbiAgICB9XG5cbiAgICAvLyBkdXJhdGlvbkxhYmVsQ29tcGFyZVxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uTGFiZWxDb21wYXJlKGEsIGIpIHtcbiAgICAgICAgaWYgKGEubGFiZWwubGVuZ3RoID4gYi5sYWJlbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhLmxhYmVsLmxlbmd0aCA8IGIubGFiZWwubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGEgbXVzdCBiZSBlcXVhbCB0byBiXG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIC8vIGR1cmF0aW9uR2V0TGFiZWxzXG4gICAgZnVuY3Rpb24gZHVyYXRpb25HZXRMYWJlbHModG9rZW4sIGxvY2FsZURhdGEpIHtcbiAgICAgICAgdmFyIGxhYmVscyA9IFtdO1xuXG4gICAgICAgIGVhY2goa2V5cyhsb2NhbGVEYXRhKSwgZnVuY3Rpb24gKGxvY2FsZURhdGFLZXkpIHtcbiAgICAgICAgICAgIGlmIChsb2NhbGVEYXRhS2V5LnNsaWNlKDAsIDE1KSAhPT0gXCJfZHVyYXRpb25MYWJlbHNcIikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGxhYmVsVHlwZSA9IGxvY2FsZURhdGFLZXkuc2xpY2UoMTUpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGVhY2goa2V5cyhsb2NhbGVEYXRhW2xvY2FsZURhdGFLZXldKSwgZnVuY3Rpb24gKGxhYmVsS2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGxhYmVsS2V5LnNsaWNlKDAsIDEpID09PSB0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBsYWJlbFR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGxhYmVsS2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxvY2FsZURhdGFbbG9jYWxlRGF0YUtleV1bbGFiZWxLZXldXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbGFiZWxzO1xuICAgIH1cblxuICAgIC8vIGR1cmF0aW9uUGx1cmFsS2V5XG4gICAgZnVuY3Rpb24gZHVyYXRpb25QbHVyYWxLZXkodG9rZW4sIGludGVnZXJWYWx1ZSwgZGVjaW1hbFZhbHVlKSB7XG4gICAgICAgIC8vIFNpbmd1bGFyIGZvciBhIHZhbHVlIG9mIGAxYCwgYnV0IG5vdCBmb3IgYDEuMGAuXG4gICAgICAgIGlmIChpbnRlZ2VyVmFsdWUgPT09IDEgJiYgZGVjaW1hbFZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9rZW4gKyB0b2tlbjtcbiAgICB9XG5cbiAgICB2YXIgZW5nTG9jYWxlID0ge1xuICAgICAgICBkdXJhdGlvbkxhYmVsc1N0YW5kYXJkOiB7XG4gICAgICAgICAgICBTOiAnbWlsbGlzZWNvbmQnLFxuICAgICAgICAgICAgU1M6ICdtaWxsaXNlY29uZHMnLFxuICAgICAgICAgICAgczogJ3NlY29uZCcsXG4gICAgICAgICAgICBzczogJ3NlY29uZHMnLFxuICAgICAgICAgICAgbTogJ21pbnV0ZScsXG4gICAgICAgICAgICBtbTogJ21pbnV0ZXMnLFxuICAgICAgICAgICAgaDogJ2hvdXInLFxuICAgICAgICAgICAgaGg6ICdob3VycycsXG4gICAgICAgICAgICBkOiAnZGF5JyxcbiAgICAgICAgICAgIGRkOiAnZGF5cycsXG4gICAgICAgICAgICB3OiAnd2VlaycsXG4gICAgICAgICAgICB3dzogJ3dlZWtzJyxcbiAgICAgICAgICAgIE06ICdtb250aCcsXG4gICAgICAgICAgICBNTTogJ21vbnRocycsXG4gICAgICAgICAgICB5OiAneWVhcicsXG4gICAgICAgICAgICB5eTogJ3llYXJzJ1xuICAgICAgICB9LFxuICAgICAgICBkdXJhdGlvbkxhYmVsc1Nob3J0OiB7XG4gICAgICAgICAgICBTOiAnbXNlYycsXG4gICAgICAgICAgICBTUzogJ21zZWNzJyxcbiAgICAgICAgICAgIHM6ICdzZWMnLFxuICAgICAgICAgICAgc3M6ICdzZWNzJyxcbiAgICAgICAgICAgIG06ICdtaW4nLFxuICAgICAgICAgICAgbW06ICdtaW5zJyxcbiAgICAgICAgICAgIGg6ICdocicsXG4gICAgICAgICAgICBoaDogJ2hycycsXG4gICAgICAgICAgICBkOiAnZHknLFxuICAgICAgICAgICAgZGQ6ICdkeXMnLFxuICAgICAgICAgICAgdzogJ3drJyxcbiAgICAgICAgICAgIHd3OiAnd2tzJyxcbiAgICAgICAgICAgIE06ICdtbycsXG4gICAgICAgICAgICBNTTogJ21vcycsXG4gICAgICAgICAgICB5OiAneXInLFxuICAgICAgICAgICAgeXk6ICd5cnMnXG4gICAgICAgIH0sXG4gICAgICAgIGR1cmF0aW9uVGltZVRlbXBsYXRlczoge1xuICAgICAgICAgICAgSE1TOiAnaDptbTpzcycsXG4gICAgICAgICAgICBITTogJ2g6bW0nLFxuICAgICAgICAgICAgTVM6ICdtOnNzJ1xuICAgICAgICB9LFxuICAgICAgICBkdXJhdGlvbkxhYmVsVHlwZXM6IFtcbiAgICAgICAgICAgIHsgdHlwZTogXCJzdGFuZGFyZFwiLCBzdHJpbmc6IFwiX19cIiB9LFxuICAgICAgICAgICAgeyB0eXBlOiBcInNob3J0XCIsIHN0cmluZzogXCJfXCIgfVxuICAgICAgICBdLFxuICAgICAgICBkdXJhdGlvblBsdXJhbEtleTogZHVyYXRpb25QbHVyYWxLZXlcbiAgICB9O1xuXG4gICAgLy8gaXNBcnJheVxuICAgIGZ1bmN0aW9uIGlzQXJyYXkoYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnJheSkgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgICB9XG5cbiAgICAvLyBpc09iamVjdFxuICAgIGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG4gICAgfVxuXG4gICAgLy8gZmluZExhc3RcbiAgICBmdW5jdGlvbiBmaW5kTGFzdChhcnJheSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGluZGV4ID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlIChpbmRleCAtPSAxKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soYXJyYXlbaW5kZXhdKSkgeyByZXR1cm4gYXJyYXlbaW5kZXhdOyB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaW5kXG4gICAgZnVuY3Rpb24gZmluZChhcnJheSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcblxuICAgICAgICB2YXIgbWF4ID0gYXJyYXkgJiYgYXJyYXkubGVuZ3RoIHx8IDA7XG5cbiAgICAgICAgdmFyIG1hdGNoO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgbWF0Y2ggPSBjYWxsYmFjaztcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbSA9PT0gbWF0Y2g7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKGluZGV4IDwgbWF4KSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soYXJyYXlbaW5kZXhdKSkgeyByZXR1cm4gYXJyYXlbaW5kZXhdOyB9XG4gICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZWFjaFxuICAgIGZ1bmN0aW9uIGVhY2goYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDAsXG4gICAgICAgICAgICBtYXggPSBhcnJheS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCFhcnJheSB8fCAhbWF4KSB7IHJldHVybjsgfVxuXG4gICAgICAgIHdoaWxlIChpbmRleCA8IG1heCkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGFycmF5W2luZGV4XSwgaW5kZXgpID09PSBmYWxzZSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBtYXBcbiAgICBmdW5jdGlvbiBtYXAoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDAsXG4gICAgICAgICAgICBtYXggPSBhcnJheS5sZW5ndGgsXG4gICAgICAgICAgICByZXQgPSBbXTtcblxuICAgICAgICBpZiAoIWFycmF5IHx8ICFtYXgpIHsgcmV0dXJuIHJldDsgfVxuXG4gICAgICAgIHdoaWxlIChpbmRleCA8IG1heCkge1xuICAgICAgICAgICAgcmV0W2luZGV4XSA9IGNhbGxiYWNrKGFycmF5W2luZGV4XSwgaW5kZXgpO1xuICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gcGx1Y2tcbiAgICBmdW5jdGlvbiBwbHVjayhhcnJheSwgcHJvcCkge1xuICAgICAgICByZXR1cm4gbWFwKGFycmF5LCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1bcHJvcF07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGNvbXBhY3RcbiAgICBmdW5jdGlvbiBjb21wYWN0KGFycmF5KSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICBlYWNoKGFycmF5LCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHsgcmV0LnB1c2goaXRlbSk7IH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvLyB1bmlxdWVcbiAgICBmdW5jdGlvbiB1bmlxdWUoYXJyYXkpIHtcbiAgICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICAgIGVhY2goYXJyYXksIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgaWYgKCFmaW5kKHJldCwgX2EpKSB7IHJldC5wdXNoKF9hKTsgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8vIGludGVyc2VjdGlvblxuICAgIGZ1bmN0aW9uIGludGVyc2VjdGlvbihhLCBiKSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICBlYWNoKGEsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgZWFjaChiLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBpZiAoX2EgPT09IF9iKSB7IHJldC5wdXNoKF9hKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB1bmlxdWUocmV0KTtcbiAgICB9XG5cbiAgICAvLyByZXN0XG4gICAgZnVuY3Rpb24gcmVzdChhcnJheSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICAgIGVhY2goYXJyYXksIGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKCFjYWxsYmFjayhpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJldCA9IGFycmF5LnNsaWNlKGluZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLy8gaW5pdGlhbFxuICAgIGZ1bmN0aW9uIGluaXRpYWwoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXZlcnNlZCA9IGFycmF5LnNsaWNlKCkucmV2ZXJzZSgpO1xuXG4gICAgICAgIHJldHVybiByZXN0KHJldmVyc2VkLCBjYWxsYmFjaykucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIC8vIGV4dGVuZFxuICAgIGZ1bmN0aW9uIGV4dGVuZChhLCBiKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgICAgICAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7IGFba2V5XSA9IGJba2V5XTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgLy8ga2V5c1xuICAgIGZ1bmN0aW9uIGtleXMoYSkge1xuICAgICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIGEpIHtcbiAgICAgICAgICAgIGlmIChhLmhhc093blByb3BlcnR5KGtleSkpIHsgcmV0LnB1c2goa2V5KTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvLyBhbnlcbiAgICBmdW5jdGlvbiBhbnkoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDAsXG4gICAgICAgICAgICBtYXggPSBhcnJheS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCFhcnJheSB8fCAhbWF4KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHdoaWxlIChpbmRleCA8IG1heCkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGFycmF5W2luZGV4XSwgaW5kZXgpID09PSB0cnVlKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGZsYXR0ZW5cbiAgICBmdW5jdGlvbiBmbGF0dGVuKGFycmF5KSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICBlYWNoKGFycmF5LCBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChjaGlsZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9Mb2NhbGVTdHJpbmdTdXBwb3J0c0xvY2FsZXMoKSB7XG4gICAgICAgIHZhciBudW1iZXIgPSAwO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbnVtYmVyLnRvTG9jYWxlU3RyaW5nKCdpJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlLm5hbWUgPT09ICdSYW5nZUVycm9yJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmVhdHVyZVRlc3RGb3JtYXR0ZXJSb3VuZGluZyhmb3JtYXR0ZXIpIHtcbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlcigzLjU1LCBcImVuXCIsIHtcbiAgICAgICAgICAgIHVzZUdyb3VwaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAxLFxuICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAxLFxuICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAxXG4gICAgICAgIH0pID09PSBcIjMuNlwiO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZlYXR1cmVUZXN0Rm9ybWF0dGVyKGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgcGFzc2VkID0gdHJ1ZTtcblxuICAgICAgICAvLyBUZXN0IG1pbmltdW1JbnRlZ2VyRGlnaXRzLlxuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDEsIFwiZW5cIiwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMSB9KSA9PT0gXCIxXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoMSwgXCJlblwiLCB7IG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAyIH0pID09PSBcIjAxXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoMSwgXCJlblwiLCB7IG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAzIH0pID09PSBcIjAwMVwiO1xuICAgICAgICBpZiAoIXBhc3NlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICAvLyBUZXN0IG1heGltdW1GcmFjdGlvbkRpZ2l0cyBhbmQgbWluaW11bUZyYWN0aW9uRGlnaXRzLlxuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDk5Ljk5LCBcImVuXCIsIHsgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAwLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDAgfSkgPT09IFwiMTAwXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoOTkuOTksIFwiZW5cIiwgeyBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDEsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMSB9KSA9PT0gXCIxMDAuMFwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDk5Ljk5LCBcImVuXCIsIHsgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIgfSkgPT09IFwiOTkuOTlcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAzIH0pID09PSBcIjk5Ljk5MFwiO1xuICAgICAgICBpZiAoIXBhc3NlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICAvLyBUZXN0IG1heGltdW1TaWduaWZpY2FudERpZ2l0cy5cbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogMSB9KSA9PT0gXCIxMDBcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogMiB9KSA9PT0gXCIxMDBcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogMyB9KSA9PT0gXCIxMDBcIjtcbiAgICAgICAgcGFzc2VkID0gcGFzc2VkICYmIGZvcm1hdHRlcig5OS45OSwgXCJlblwiLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogNCB9KSA9PT0gXCI5OS45OVwiO1xuICAgICAgICBwYXNzZWQgPSBwYXNzZWQgJiYgZm9ybWF0dGVyKDk5Ljk5LCBcImVuXCIsIHsgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzOiA1IH0pID09PSBcIjk5Ljk5XCI7XG4gICAgICAgIGlmICghcGFzc2VkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIC8vIFRlc3QgZ3JvdXBpbmcuXG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoMTAwMCwgXCJlblwiLCB7IHVzZUdyb3VwaW5nOiB0cnVlIH0pID09PSBcIjEsMDAwXCI7XG4gICAgICAgIHBhc3NlZCA9IHBhc3NlZCAmJiBmb3JtYXR0ZXIoMTAwMCwgXCJlblwiLCB7IHVzZUdyb3VwaW5nOiBmYWxzZSB9KSA9PT0gXCIxMDAwXCI7XG4gICAgICAgIGlmICghcGFzc2VkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGR1cmF0aW9uc0Zvcm1hdChkdXJhdGlvbnMgWywgdGVtcGxhdGVdIFssIHByZWNpc2lvbl0gWywgc2V0dGluZ3NdKVxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uc0Zvcm1hdCgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBzZXR0aW5ncyA9IHt9O1xuICAgICAgICB2YXIgZHVyYXRpb25zO1xuXG4gICAgICAgIC8vIFBhcnNlIGFyZ3VtZW50cy5cbiAgICAgICAgZWFjaChhcmdzLCBmdW5jdGlvbiAoYXJnLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKCFpbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICghaXNBcnJheShhcmcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFwiRXhwZWN0ZWQgYXJyYXkgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIGR1cmF0aW9uc0Zvcm1hdC5cIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkdXJhdGlvbnMgPSBhcmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBhcmcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnRlbXBsYXRlID0gYXJnO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5wcmVjaXNpb24gPSBhcmc7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoYXJnKSkge1xuICAgICAgICAgICAgICAgIGV4dGVuZChzZXR0aW5ncywgYXJnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFkdXJhdGlvbnMgfHwgIWR1cmF0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldHRpbmdzLnJldHVybk1vbWVudFR5cGVzID0gdHJ1ZTtcblxuICAgICAgICB2YXIgZm9ybWF0dGVkRHVyYXRpb25zID0gbWFwKGR1cmF0aW9ucywgZnVuY3Rpb24gKGR1cikge1xuICAgICAgICAgICAgcmV0dXJuIGR1ci5mb3JtYXQoc2V0dGluZ3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBNZXJnZSB0b2tlbiB0eXBlcyBmcm9tIGFsbCBkdXJhdGlvbnMuXG4gICAgICAgIHZhciBvdXRwdXRUeXBlcyA9IGludGVyc2VjdGlvbih0eXBlcywgdW5pcXVlKHBsdWNrKGZsYXR0ZW4oZm9ybWF0dGVkRHVyYXRpb25zKSwgXCJ0eXBlXCIpKSk7XG5cbiAgICAgICAgdmFyIGxhcmdlc3QgPSBzZXR0aW5ncy5sYXJnZXN0O1xuXG4gICAgICAgIGlmIChsYXJnZXN0KSB7XG4gICAgICAgICAgICBvdXRwdXRUeXBlcyA9IG91dHB1dFR5cGVzLnNsaWNlKDAsIGxhcmdlc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0dGluZ3MucmV0dXJuTW9tZW50VHlwZXMgPSBmYWxzZTtcbiAgICAgICAgc2V0dGluZ3Mub3V0cHV0VHlwZXMgPSBvdXRwdXRUeXBlcztcblxuICAgICAgICByZXR1cm4gbWFwKGR1cmF0aW9ucywgZnVuY3Rpb24gKGR1cikge1xuICAgICAgICAgICAgcmV0dXJuIGR1ci5mb3JtYXQoc2V0dGluZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBkdXJhdGlvbkZvcm1hdChbdGVtcGxhdGVdIFssIHByZWNpc2lvbl0gWywgc2V0dGluZ3NdKVxuICAgIGZ1bmN0aW9uIGR1cmF0aW9uRm9ybWF0KCkge1xuXG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSBleHRlbmQoe30sIHRoaXMuZm9ybWF0LmRlZmF1bHRzKTtcblxuICAgICAgICAvLyBLZWVwIGEgc2hhZG93IGNvcHkgb2YgdGhpcyBtb21lbnQgZm9yIGNhbGN1bGF0aW5nIHJlbWFpbmRlcnMuXG4gICAgICAgIC8vIFBlcmZvcm0gYWxsIGNhbGN1bGF0aW9ucyBvbiBwb3NpdGl2ZSBkdXJhdGlvbiB2YWx1ZSwgaGFuZGxlIG5lZ2F0aXZlXG4gICAgICAgIC8vIHNpZ24gYXQgdGhlIHZlcnkgZW5kLlxuICAgICAgICB2YXIgYXNNaWxsaXNlY29uZHMgPSB0aGlzLmFzTWlsbGlzZWNvbmRzKCk7XG4gICAgICAgIHZhciBhc01vbnRocyA9IHRoaXMuYXNNb250aHMoKTtcblxuICAgICAgICAvLyBUcmVhdCBpbnZhbGlkIGR1cmF0aW9ucyBhcyBoYXZpbmcgYSB2YWx1ZSBvZiAwIG1pbGxpc2Vjb25kcy5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmlzVmFsaWQgPT09IFwiZnVuY3Rpb25cIiAmJiB0aGlzLmlzVmFsaWQoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGFzTWlsbGlzZWNvbmRzID0gMDtcbiAgICAgICAgICAgIGFzTW9udGhzID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpc05lZ2F0aXZlID0gYXNNaWxsaXNlY29uZHMgPCAwO1xuXG4gICAgICAgIC8vIFR3byBzaGFkb3cgY29waWVzIGFyZSBuZWVkZWQgYmVjYXVzZSBvZiB0aGUgd2F5IG1vbWVudC5qcyBoYW5kbGVzXG4gICAgICAgIC8vIGR1cmF0aW9uIGFyaXRobWV0aWMgZm9yIHllYXJzL21vbnRocyBhbmQgZm9yIHdlZWtzL2RheXMvaG91cnMvbWludXRlcy9zZWNvbmRzLlxuICAgICAgICB2YXIgcmVtYWluZGVyID0gbW9tZW50LmR1cmF0aW9uKE1hdGguYWJzKGFzTWlsbGlzZWNvbmRzKSwgXCJtaWxsaXNlY29uZHNcIik7XG4gICAgICAgIHZhciByZW1haW5kZXJNb250aHMgPSBtb21lbnQuZHVyYXRpb24oTWF0aC5hYnMoYXNNb250aHMpLCBcIm1vbnRoc1wiKTtcblxuICAgICAgICAvLyBQYXJzZSBhcmd1bWVudHMuXG4gICAgICAgIGVhY2goYXJncywgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGFyZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MudGVtcGxhdGUgPSBhcmc7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZyA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnByZWNpc2lvbiA9IGFyZztcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc09iamVjdChhcmcpKSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5kKHNldHRpbmdzLCBhcmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbW9tZW50VG9rZW5zID0ge1xuICAgICAgICAgICAgeWVhcnM6IFwieVwiLFxuICAgICAgICAgICAgbW9udGhzOiBcIk1cIixcbiAgICAgICAgICAgIHdlZWtzOiBcIndcIixcbiAgICAgICAgICAgIGRheXM6IFwiZFwiLFxuICAgICAgICAgICAgaG91cnM6IFwiaFwiLFxuICAgICAgICAgICAgbWludXRlczogXCJtXCIsXG4gICAgICAgICAgICBzZWNvbmRzOiBcInNcIixcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kczogXCJTXCJcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdG9rZW5EZWZzID0ge1xuICAgICAgICAgICAgZXNjYXBlOiAvXFxbKC4rPylcXF0vLFxuICAgICAgICAgICAgeWVhcnM6IC9cXCo/W1l5XSsvLFxuICAgICAgICAgICAgbW9udGhzOiAvXFwqP00rLyxcbiAgICAgICAgICAgIHdlZWtzOiAvXFwqP1tXd10rLyxcbiAgICAgICAgICAgIGRheXM6IC9cXCo/W0RkXSsvLFxuICAgICAgICAgICAgaG91cnM6IC9cXCo/W0hoXSsvLFxuICAgICAgICAgICAgbWludXRlczogL1xcKj9tKy8sXG4gICAgICAgICAgICBzZWNvbmRzOiAvXFwqP3MrLyxcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kczogL1xcKj9TKy8sXG4gICAgICAgICAgICBnZW5lcmFsOiAvLis/L1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFR5cGVzIGFycmF5IGlzIGF2YWlsYWJsZSBpbiB0aGUgdGVtcGxhdGUgZnVuY3Rpb24uXG4gICAgICAgIHNldHRpbmdzLnR5cGVzID0gdHlwZXM7XG5cbiAgICAgICAgdmFyIHR5cGVNYXAgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBmaW5kKHR5cGVzLCBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbkRlZnNbdHlwZV0udGVzdCh0b2tlbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdG9rZW5pemVyID0gbmV3IFJlZ0V4cChtYXAodHlwZXMsIGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW5EZWZzW3R5cGVdLnNvdXJjZTtcbiAgICAgICAgfSkuam9pbihcInxcIiksIFwiZ1wiKTtcblxuICAgICAgICAvLyBDdXJyZW50IGR1cmF0aW9uIG9iamVjdCBpcyBhdmFpbGFibGUgaW4gdGhlIHRlbXBsYXRlIGZ1bmN0aW9uLlxuICAgICAgICBzZXR0aW5ncy5kdXJhdGlvbiA9IHRoaXM7XG5cbiAgICAgICAgLy8gRXZhbCB0ZW1wbGF0ZSBmdW5jdGlvbiBhbmQgY2FjaGUgdGVtcGxhdGUgc3RyaW5nLlxuICAgICAgICB2YXIgdGVtcGxhdGUgPSB0eXBlb2Ygc2V0dGluZ3MudGVtcGxhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHNldHRpbmdzLnRlbXBsYXRlLmFwcGx5KHNldHRpbmdzKSA6IHNldHRpbmdzLnRlbXBsYXRlO1xuXG4gICAgICAgIC8vIG91dHB1dFR5cGVzIGFuZCByZXR1cm5Nb21lbnRUeXBlcyBhcmUgc2V0dGluZ3MgdG8gc3VwcG9ydCBkdXJhdGlvbnNGb3JtYXQoKS5cblxuICAgICAgICAvLyBvdXRwdXRUeXBlcyBpcyBhbiBhcnJheSBvZiBtb21lbnQgdG9rZW4gdHlwZXMgdGhhdCBkZXRlcm1pbmVzXG4gICAgICAgIC8vIHRoZSB0b2tlbnMgcmV0dXJuZWQgaW4gZm9ybWF0dGVkIG91dHB1dC4gVGhpcyBvcHRpb24gb3ZlcnJpZGVzXG4gICAgICAgIC8vIHRyaW0sIGxhcmdlc3QsIHN0b3BUcmltLCBldGMuXG4gICAgICAgIHZhciBvdXRwdXRUeXBlcyA9IHNldHRpbmdzLm91dHB1dFR5cGVzO1xuXG4gICAgICAgIC8vIHJldHVybk1vbWVudFR5cGVzIGlzIGEgYm9vbGVhbiB0aGF0IHNldHMgZHVyYXRpb25Gb3JtYXQgdG8gcmV0dXJuXG4gICAgICAgIC8vIHRoZSBwcm9jZXNzZWQgbW9tZW50VHlwZXMgaW5zdGVhZCBvZiBmb3JtYXR0ZWQgb3V0cHV0LlxuICAgICAgICB2YXIgcmV0dXJuTW9tZW50VHlwZXMgPSBzZXR0aW5ncy5yZXR1cm5Nb21lbnRUeXBlcztcblxuICAgICAgICB2YXIgbGFyZ2VzdCA9IHNldHRpbmdzLmxhcmdlc3Q7XG5cbiAgICAgICAgLy8gU2V0dXAgc3RvcFRyaW0gYXJyYXkgb2YgdG9rZW4gdHlwZXMuXG4gICAgICAgIHZhciBzdG9wVHJpbSA9IFtdO1xuXG4gICAgICAgIGlmICghb3V0cHV0VHlwZXMpIHtcbiAgICAgICAgICAgIGlmIChpc0FycmF5KHNldHRpbmdzLnN0b3BUcmltKSkge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnN0b3BUcmltID0gc2V0dGluZ3Muc3RvcFRyaW0uam9pbihcIlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUGFyc2Ugc3RvcFRyaW0gc3RyaW5nIHRvIGNyZWF0ZSB0b2tlbiB0eXBlcyBhcnJheS5cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5zdG9wVHJpbSkge1xuICAgICAgICAgICAgICAgIGVhY2goc2V0dGluZ3Muc3RvcFRyaW0ubWF0Y2godG9rZW5pemVyKSwgZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gdHlwZU1hcCh0b2tlbik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiZXNjYXBlXCIgfHwgdHlwZSA9PT0gXCJnZW5lcmFsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN0b3BUcmltLnB1c2godHlwZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYWNoZSBtb21lbnQncyBsb2NhbGUgZGF0YS5cbiAgICAgICAgdmFyIGxvY2FsZURhdGEgPSBtb21lbnQubG9jYWxlRGF0YSgpO1xuXG4gICAgICAgIGlmICghbG9jYWxlRGF0YSkge1xuICAgICAgICAgICAgbG9jYWxlRGF0YSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmFsbCBiYWNrIHRvIHRoaXMgcGx1Z2luJ3MgYGVuZ2AgZXh0ZW5zaW9uLlxuICAgICAgICBlYWNoKGtleXMoZW5nTG9jYWxlKSwgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlbmdMb2NhbGVba2V5XSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFsb2NhbGVEYXRhW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlRGF0YVtrZXldID0gZW5nTG9jYWxlW2tleV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWxvY2FsZURhdGFbXCJfXCIgKyBrZXldKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlRGF0YVtcIl9cIiArIGtleV0gPSBlbmdMb2NhbGVba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVwbGFjZSBEdXJhdGlvbiBUaW1lIFRlbXBsYXRlIHN0cmluZ3MuXG4gICAgICAgIC8vIEZvciBsb2NhbGUgYGVuZ2A6IGBfSE1TX2AsIGBfSE1fYCwgYW5kIGBfTVNfYC5cbiAgICAgICAgZWFjaChrZXlzKGxvY2FsZURhdGEuX2R1cmF0aW9uVGltZVRlbXBsYXRlcyksIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoXCJfXCIgKyBpdGVtICsgXCJfXCIsIGxvY2FsZURhdGEuX2R1cmF0aW9uVGltZVRlbXBsYXRlc1tpdGVtXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIERldGVybWluZSB1c2VyJ3MgbG9jYWxlLlxuICAgICAgICB2YXIgdXNlckxvY2FsZSA9IHNldHRpbmdzLnVzZXJMb2NhbGUgfHwgbW9tZW50LmxvY2FsZSgpO1xuXG4gICAgICAgIHZhciB1c2VMZWZ0VW5pdHMgPSBzZXR0aW5ncy51c2VMZWZ0VW5pdHM7XG4gICAgICAgIHZhciB1c2VQbHVyYWwgPSBzZXR0aW5ncy51c2VQbHVyYWw7XG4gICAgICAgIHZhciBwcmVjaXNpb24gPSBzZXR0aW5ncy5wcmVjaXNpb247XG4gICAgICAgIHZhciBmb3JjZUxlbmd0aCA9IHNldHRpbmdzLmZvcmNlTGVuZ3RoO1xuICAgICAgICB2YXIgdXNlR3JvdXBpbmcgPSBzZXR0aW5ncy51c2VHcm91cGluZztcbiAgICAgICAgdmFyIHRydW5jID0gc2V0dGluZ3MudHJ1bmM7XG5cbiAgICAgICAgLy8gVXNlIHNpZ25pZmljYW50IGRpZ2l0cyBvbmx5IHdoZW4gcHJlY2lzaW9uIGlzIGdyZWF0ZXIgdGhhbiAwLlxuICAgICAgICB2YXIgdXNlU2lnbmlmaWNhbnREaWdpdHMgPSBzZXR0aW5ncy51c2VTaWduaWZpY2FudERpZ2l0cyAmJiBwcmVjaXNpb24gPiAwO1xuICAgICAgICB2YXIgc2lnbmlmaWNhbnREaWdpdHMgPSB1c2VTaWduaWZpY2FudERpZ2l0cyA/IHNldHRpbmdzLnByZWNpc2lvbiA6IDA7XG4gICAgICAgIHZhciBzaWduaWZpY2FudERpZ2l0c0NhY2hlID0gc2lnbmlmaWNhbnREaWdpdHM7XG5cbiAgICAgICAgdmFyIG1pblZhbHVlID0gc2V0dGluZ3MubWluVmFsdWU7XG4gICAgICAgIHZhciBpc01pblZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIG1heFZhbHVlID0gc2V0dGluZ3MubWF4VmFsdWU7XG4gICAgICAgIHZhciBpc01heFZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gZm9ybWF0TnVtYmVyIGZhbGxiYWNrIG9wdGlvbnMuXG4gICAgICAgIHZhciB1c2VUb0xvY2FsZVN0cmluZyA9IHNldHRpbmdzLnVzZVRvTG9jYWxlU3RyaW5nO1xuICAgICAgICB2YXIgZ3JvdXBpbmdTZXBhcmF0b3IgPSBzZXR0aW5ncy5ncm91cGluZ1NlcGFyYXRvcjtcbiAgICAgICAgdmFyIGRlY2ltYWxTZXBhcmF0b3IgPSBzZXR0aW5ncy5kZWNpbWFsU2VwYXJhdG9yO1xuICAgICAgICB2YXIgZ3JvdXBpbmcgPSBzZXR0aW5ncy5ncm91cGluZztcblxuICAgICAgICB1c2VUb0xvY2FsZVN0cmluZyA9IHVzZVRvTG9jYWxlU3RyaW5nICYmICh0b0xvY2FsZVN0cmluZ1dvcmtzIHx8IGludGxOdW1iZXJGb3JtYXRXb3Jrcyk7XG5cbiAgICAgICAgLy8gVHJpbSBvcHRpb25zLlxuICAgICAgICB2YXIgdHJpbSA9IHNldHRpbmdzLnRyaW07XG5cbiAgICAgICAgaWYgKGlzQXJyYXkodHJpbSkpIHtcbiAgICAgICAgICAgIHRyaW0gPSB0cmltLmpvaW4oXCIgXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyaW0gPT09IG51bGwgJiYgKGxhcmdlc3QgfHwgbWF4VmFsdWUgfHwgdXNlU2lnbmlmaWNhbnREaWdpdHMpKSB7XG4gICAgICAgICAgICB0cmltID0gXCJhbGxcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0cmltID09PSBudWxsIHx8IHRyaW0gPT09IHRydWUgfHwgdHJpbSA9PT0gXCJsZWZ0XCIgfHwgdHJpbSA9PT0gXCJyaWdodFwiKSB7XG4gICAgICAgICAgICB0cmltID0gXCJsYXJnZVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyaW0gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0cmltID0gXCJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0cmltSW5jbHVkZXMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udGVzdCh0cmltKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgckxhcmdlID0gL2xhcmdlLztcbiAgICAgICAgdmFyIHJTbWFsbCA9IC9zbWFsbC87XG4gICAgICAgIHZhciByQm90aCA9IC9ib3RoLztcbiAgICAgICAgdmFyIHJNaWQgPSAvbWlkLztcbiAgICAgICAgdmFyIHJBbGwgPSAvXmFsbHxbXnNtXWFsbC87XG4gICAgICAgIHZhciByRmluYWwgPSAvZmluYWwvO1xuXG4gICAgICAgIHZhciB0cmltTGFyZ2UgPSBsYXJnZXN0ID4gMCB8fCBhbnkoW3JMYXJnZSwgckJvdGgsIHJBbGxdLCB0cmltSW5jbHVkZXMpO1xuICAgICAgICB2YXIgdHJpbVNtYWxsID0gYW55KFtyU21hbGwsIHJCb3RoLCByQWxsXSwgdHJpbUluY2x1ZGVzKTtcbiAgICAgICAgdmFyIHRyaW1NaWQgPSBhbnkoW3JNaWQsIHJBbGxdLCB0cmltSW5jbHVkZXMpO1xuICAgICAgICB2YXIgdHJpbUZpbmFsID0gYW55KFtyRmluYWwsIHJBbGxdLCB0cmltSW5jbHVkZXMpO1xuXG4gICAgICAgIC8vIFBhcnNlIGZvcm1hdCBzdHJpbmcgdG8gY3JlYXRlIHJhdyB0b2tlbnMgYXJyYXkuXG4gICAgICAgIHZhciByYXdUb2tlbnMgPSBtYXAodGVtcGxhdGUubWF0Y2godG9rZW5pemVyKSwgZnVuY3Rpb24gKHRva2VuLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIHR5cGUgPSB0eXBlTWFwKHRva2VuKTtcblxuICAgICAgICAgICAgaWYgKHRva2VuLnNsaWNlKDAsIDEpID09PSBcIipcIikge1xuICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW4uc2xpY2UoMSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gXCJlc2NhcGVcIiAmJiB0eXBlICE9PSBcImdlbmVyYWxcIikge1xuICAgICAgICAgICAgICAgICAgICBzdG9wVHJpbS5wdXNoKHR5cGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiB0b2tlbi5sZW5ndGgsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJcIixcblxuICAgICAgICAgICAgICAgIC8vIFJlcGxhY2UgZXNjYXBlZCB0b2tlbnMgd2l0aCB0aGUgbm9uLWVzY2FwZWQgdG9rZW4gdGV4dC5cbiAgICAgICAgICAgICAgICB0b2tlbjogKHR5cGUgPT09IFwiZXNjYXBlXCIgPyB0b2tlbi5yZXBsYWNlKHRva2VuRGVmcy5lc2NhcGUsIFwiJDFcIikgOiB0b2tlbiksXG5cbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdHlwZSBvbiBub24tbW9tZW50IHRva2Vucy5cbiAgICAgICAgICAgICAgICB0eXBlOiAoKHR5cGUgPT09IFwiZXNjYXBlXCIgfHwgdHlwZSA9PT0gXCJnZW5lcmFsXCIpID8gbnVsbCA6IHR5cGUpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBBc3NvY2lhdGUgdGV4dCB0b2tlbnMgd2l0aCBtb21lbnQgdG9rZW5zLlxuICAgICAgICB2YXIgY3VycmVudFRva2VuID0ge1xuICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICBsZW5ndGg6IDAsXG4gICAgICAgICAgICB0b2tlbjogXCJcIixcbiAgICAgICAgICAgIHRleHQ6IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRva2VucyA9IFtdO1xuXG4gICAgICAgIGlmICh1c2VMZWZ0VW5pdHMpIHtcbiAgICAgICAgICAgIHJhd1Rva2Vucy5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBlYWNoKHJhd1Rva2VucywgZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSkge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VG9rZW4udHlwZSB8fCBjdXJyZW50VG9rZW4udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbnMucHVzaChjdXJyZW50VG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IHRva2VuO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodXNlTGVmdFVuaXRzKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRva2VuLnRleHQgPSB0b2tlbi50b2tlbiArIGN1cnJlbnRUb2tlbi50ZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VG9rZW4udGV4dCArPSB0b2tlbi50b2tlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRUb2tlbi50eXBlIHx8IGN1cnJlbnRUb2tlbi50ZXh0KSB7XG4gICAgICAgICAgICB0b2tlbnMucHVzaChjdXJyZW50VG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVzZUxlZnRVbml0cykge1xuICAgICAgICAgICAgdG9rZW5zLnJldmVyc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmQgdW5pcXVlIG1vbWVudCB0b2tlbiB0eXBlcyBpbiB0aGUgdGVtcGxhdGUgaW4gb3JkZXIgb2ZcbiAgICAgICAgLy8gZGVzY2VuZGluZyBtYWduaXR1ZGUuXG4gICAgICAgIHZhciBtb21lbnRUeXBlcyA9IGludGVyc2VjdGlvbih0eXBlcywgdW5pcXVlKGNvbXBhY3QocGx1Y2sodG9rZW5zLCBcInR5cGVcIikpKSk7XG5cbiAgICAgICAgLy8gRXhpdCBlYXJseSBpZiB0aGVyZSBhcmUgbm8gbW9tZW50IHRva2VuIHR5cGVzLlxuICAgICAgICBpZiAoIW1vbWVudFR5cGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHBsdWNrKHRva2VucywgXCJ0ZXh0XCIpLmpvaW4oXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYWxjdWxhdGUgdmFsdWVzIGZvciBlYWNoIG1vbWVudCB0eXBlIGluIHRoZSB0ZW1wbGF0ZS5cbiAgICAgICAgLy8gRm9yIHByb2Nlc3NpbmcgdGhlIHNldHRpbmdzLCB2YWx1ZXMgYXJlIGFzc29jaWF0ZWQgd2l0aCBtb21lbnQgdHlwZXMuXG4gICAgICAgIC8vIFZhbHVlcyB3aWxsIGJlIGFzc2lnbmVkIHRvIHRva2VucyBhdCB0aGUgbGFzdCBzdGVwIGluIG9yZGVyIHRvXG4gICAgICAgIC8vIGFzc3VtZSBub3RoaW5nIGFib3V0IGZyZXF1ZW5jeSBvciBvcmRlciBvZiB0b2tlbnMgaW4gdGhlIHRlbXBsYXRlLlxuICAgICAgICBtb21lbnRUeXBlcyA9IG1hcChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUsIGluZGV4KSB7XG4gICAgICAgICAgICAvLyBJcyB0aGlzIHRoZSBsZWFzdC1tYWduaXR1ZGUgbW9tZW50IHRva2VuIGZvdW5kP1xuICAgICAgICAgICAgdmFyIGlzU21hbGxlc3QgPSAoKGluZGV4ICsgMSkgPT09IG1vbWVudFR5cGVzLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIC8vIElzIHRoaXMgdGhlIGdyZWF0ZXN0LW1hZ25pdHVkZSBtb21lbnQgdG9rZW4gZm91bmQ/XG4gICAgICAgICAgICB2YXIgaXNMYXJnZXN0ID0gKCFpbmRleCk7XG5cbiAgICAgICAgICAgIC8vIEdldCB0aGUgcmF3IHZhbHVlIGluIHRoZSBjdXJyZW50IHVuaXRzLlxuICAgICAgICAgICAgdmFyIHJhd1ZhbHVlO1xuXG4gICAgICAgICAgICBpZiAobW9tZW50VHlwZSA9PT0gXCJ5ZWFyc1wiIHx8IG1vbWVudFR5cGUgPT09IFwibW9udGhzXCIpIHtcbiAgICAgICAgICAgICAgICByYXdWYWx1ZSA9IHJlbWFpbmRlck1vbnRocy5hcyhtb21lbnRUeXBlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmF3VmFsdWUgPSByZW1haW5kZXIuYXMobW9tZW50VHlwZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB3aG9sZVZhbHVlID0gTWF0aC5mbG9vcihyYXdWYWx1ZSk7XG4gICAgICAgICAgICB2YXIgZGVjaW1hbFZhbHVlID0gcmF3VmFsdWUgLSB3aG9sZVZhbHVlO1xuXG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBmaW5kKHRva2VucywgZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGUgPT09IHRva2VuLnR5cGU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGlzTGFyZ2VzdCAmJiBtYXhWYWx1ZSAmJiByYXdWYWx1ZSA+IG1heFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaXNNYXhWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc1NtYWxsZXN0ICYmIG1pblZhbHVlICYmIE1hdGguYWJzKHNldHRpbmdzLmR1cmF0aW9uLmFzKG1vbWVudFR5cGUpKSA8IG1pblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaXNNaW5WYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE5vdGUgdGhlIGxlbmd0aCBvZiB0aGUgbGFyZ2VzdC1tYWduaXR1ZGUgbW9tZW50IHRva2VuOlxuICAgICAgICAgICAgLy8gaWYgaXQgaXMgZ3JlYXRlciB0aGFuIG9uZSBhbmQgZm9yY2VMZW5ndGggaXMgbm90IHNldCxcbiAgICAgICAgICAgIC8vIHRoZW4gZGVmYXVsdCBmb3JjZUxlbmd0aCB0byBgdHJ1ZWAuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gUmF0aW9uYWxlIGlzIHRoaXM6IElmIHRoZSB0ZW1wbGF0ZSBpcyBcImg6bW06c3NcIiBhbmQgdGhlXG4gICAgICAgICAgICAvLyBtb21lbnQgdmFsdWUgaXMgNSBtaW51dGVzLCB0aGUgdXNlci1mcmllbmRseSBvdXRwdXQgaXNcbiAgICAgICAgICAgIC8vIFwiNTowMFwiLCBub3QgXCIwNTowMFwiLiBXZSBzaG91bGRuJ3QgcGFkIHRoZSBgbWludXRlc2AgdG9rZW5cbiAgICAgICAgICAgIC8vIGV2ZW4gdGhvdWdoIGl0IGhhcyBsZW5ndGggb2YgdHdvIGlmIHRoZSB0ZW1wbGF0ZSBpcyBcImg6bW06c3NcIjtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBJZiB0aGUgbWludXRlcyBvdXRwdXQgc2hvdWxkIGFsd2F5cyBpbmNsdWRlIHRoZSBsZWFkaW5nIHplcm9cbiAgICAgICAgICAgIC8vIGV2ZW4gd2hlbiB0aGUgaG91ciBpcyB0cmltbWVkIHRoZW4gc2V0IGB7IGZvcmNlTGVuZ3RoOiB0cnVlIH1gXG4gICAgICAgICAgICAvLyB0byBvdXRwdXQgXCIwNTowMFwiLiBJZiB0aGUgdGVtcGxhdGUgaXMgXCJoaDptbTpzc1wiLCB0aGUgdXNlclxuICAgICAgICAgICAgLy8gY2xlYXJseSB3YW50ZWQgZXZlcnl0aGluZyBwYWRkZWQgc28gd2Ugc2hvdWxkIG91dHB1dCBcIjA1OjAwXCI7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgd2FudHMgdGhlIGZ1bGwgcGFkZGVkIG91dHB1dCwgdGhleSBjYW4gdXNlXG4gICAgICAgICAgICAvLyB0ZW1wbGF0ZSBcImhoOm1tOnNzXCIgYW5kIHNldCBgeyB0cmltOiBmYWxzZSB9YCB0byBvdXRwdXRcbiAgICAgICAgICAgIC8vIFwiMDA6MDU6MDBcIi5cbiAgICAgICAgICAgIGlmIChpc0xhcmdlc3QgJiYgZm9yY2VMZW5ndGggPT09IG51bGwgJiYgdG9rZW4ubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGZvcmNlTGVuZ3RoID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXBkYXRlIHJlbWFpbmRlci5cbiAgICAgICAgICAgIHJlbWFpbmRlci5zdWJ0cmFjdCh3aG9sZVZhbHVlLCBtb21lbnRUeXBlKTtcbiAgICAgICAgICAgIHJlbWFpbmRlck1vbnRocy5zdWJ0cmFjdCh3aG9sZVZhbHVlLCBtb21lbnRUeXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYXdWYWx1ZTogcmF3VmFsdWUsXG4gICAgICAgICAgICAgICAgd2hvbGVWYWx1ZTogd2hvbGVWYWx1ZSxcbiAgICAgICAgICAgICAgICAvLyBEZWNpbWFsIHZhbHVlIGlzIG9ubHkgcmV0YWluZWQgZm9yIHRoZSBsZWFzdC1tYWduaXR1ZGVcbiAgICAgICAgICAgICAgICAvLyBtb21lbnQgdHlwZSBpbiB0aGUgZm9ybWF0IHRlbXBsYXRlLlxuICAgICAgICAgICAgICAgIGRlY2ltYWxWYWx1ZTogaXNTbWFsbGVzdCA/IGRlY2ltYWxWYWx1ZSA6IDAsXG4gICAgICAgICAgICAgICAgaXNTbWFsbGVzdDogaXNTbWFsbGVzdCxcbiAgICAgICAgICAgICAgICBpc0xhcmdlc3Q6IGlzTGFyZ2VzdCxcbiAgICAgICAgICAgICAgICB0eXBlOiBtb21lbnRUeXBlLFxuICAgICAgICAgICAgICAgIC8vIFRva2VucyBjYW4gYXBwZWFyIG11bHRpcGxlIHRpbWVzIGluIGEgdGVtcGxhdGUgc3RyaW5nLFxuICAgICAgICAgICAgICAgIC8vIGJ1dCBhbGwgaW5zdGFuY2VzIG11c3Qgc2hhcmUgdGhlIHNhbWUgbGVuZ3RoLlxuICAgICAgICAgICAgICAgIHRva2VuTGVuZ3RoOiB0b2tlbi5sZW5ndGhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciB0cnVuY01ldGhvZCA9IHRydW5jID8gTWF0aC5mbG9vciA6IE1hdGgucm91bmQ7XG4gICAgICAgIHZhciB0cnVuY2F0ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgcGxhY2VzKSB7XG4gICAgICAgICAgICB2YXIgZmFjdG9yID0gTWF0aC5wb3coMTAsIHBsYWNlcyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1bmNNZXRob2QodmFsdWUgKiBmYWN0b3IpIC8gZmFjdG9yO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBmb3VuZEZpcnN0ID0gZmFsc2U7XG4gICAgICAgIHZhciBidWJibGVkID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGZvcm1hdFZhbHVlID0gZnVuY3Rpb24gKG1vbWVudFR5cGUsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgZm9ybWF0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdXNlR3JvdXBpbmcsXG4gICAgICAgICAgICAgICAgZ3JvdXBpbmdTZXBhcmF0b3I6IGdyb3VwaW5nU2VwYXJhdG9yLFxuICAgICAgICAgICAgICAgIGRlY2ltYWxTZXBhcmF0b3I6IGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgICAgICAgICAgZ3JvdXBpbmc6IGdyb3VwaW5nLFxuICAgICAgICAgICAgICAgIHVzZVRvTG9jYWxlU3RyaW5nOiB1c2VUb0xvY2FsZVN0cmluZ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHVzZVNpZ25pZmljYW50RGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNpZ25pZmljYW50RGlnaXRzIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS5yYXdWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUud2hvbGVWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXRPcHRpb25zLm1heGltdW1TaWduaWZpY2FudERpZ2l0cyA9IHNpZ25pZmljYW50RGlnaXRzO1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnNpZ25pZmljYW50RGlnaXRzID0gc2lnbmlmaWNhbnREaWdpdHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNNYXhWYWx1ZSAmJiAhYnViYmxlZCkge1xuICAgICAgICAgICAgICAgIGlmIChtb21lbnRUeXBlLmlzTGFyZ2VzdCkge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLndob2xlVmFsdWUgPSBtYXhWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS5kZWNpbWFsVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUud2hvbGVWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc01pblZhbHVlICYmICFidWJibGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1vbWVudFR5cGUuaXNTbWFsbGVzdCkge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLndob2xlVmFsdWUgPSBtaW5WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS5kZWNpbWFsVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUud2hvbGVWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtb21lbnRUeXBlLmlzU21hbGxlc3QgfHwgbW9tZW50VHlwZS5zaWduaWZpY2FudERpZ2l0cyAmJiBtb21lbnRUeXBlLnNpZ25pZmljYW50RGlnaXRzIC0gbW9tZW50VHlwZS53aG9sZVZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgICAgICAvLyBBcHBseSBwcmVjaXNpb24gdG8gbGVhc3Qgc2lnbmlmaWNhbnQgdG9rZW4gdmFsdWUuXG4gICAgICAgICAgICAgICAgaWYgKHByZWNpc2lvbiA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IHRydW5jYXRlKG1vbWVudFR5cGUud2hvbGVWYWx1ZSwgcHJlY2lzaW9uKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByZWNpc2lvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnZhbHVlID0gdHJ1bmNNZXRob2QobW9tZW50VHlwZS53aG9sZVZhbHVlICsgbW9tZW50VHlwZS5kZWNpbWFsVmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIHByZWNpc2lvbiA+IDBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZVNpZ25pZmljYW50RGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnZhbHVlID0gdHJ1bmNhdGUobW9tZW50VHlwZS5yYXdWYWx1ZSwgc2lnbmlmaWNhbnREaWdpdHMgLSBtb21lbnRUeXBlLndob2xlVmFsdWUudG9TdHJpbmcoKS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnZhbHVlID0gbW9tZW50VHlwZS5yYXdWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbWVudFR5cGUud2hvbGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25pZmljYW50RGlnaXRzIC09IG1vbWVudFR5cGUud2hvbGVWYWx1ZS50b1N0cmluZygpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdE9wdGlvbnMuZnJhY3Rpb25EaWdpdHMgPSBwcmVjaXNpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnVuYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbWVudFR5cGUudmFsdWUgPSBtb21lbnRUeXBlLndob2xlVmFsdWUgKyB0cnVuY2F0ZShtb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSwgcHJlY2lzaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IG1vbWVudFR5cGUud2hvbGVWYWx1ZSArIG1vbWVudFR5cGUuZGVjaW1hbFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlU2lnbmlmaWNhbnREaWdpdHMgJiYgbW9tZW50VHlwZS53aG9sZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE91dGVyIE1hdGgucm91bmQgcmVxdWlyZWQgaGVyZSB0byBoYW5kbGUgZmxvYXRpbmcgcG9pbnQgZXJyb3JzLlxuICAgICAgICAgICAgICAgICAgICBtb21lbnRUeXBlLnZhbHVlID0gTWF0aC5yb3VuZCh0cnVuY2F0ZShtb21lbnRUeXBlLndob2xlVmFsdWUsIG1vbWVudFR5cGUuc2lnbmlmaWNhbnREaWdpdHMgLSBtb21lbnRUeXBlLndob2xlVmFsdWUudG9TdHJpbmcoKS5sZW5ndGgpKTtcblxuICAgICAgICAgICAgICAgICAgICBzaWduaWZpY2FudERpZ2l0cyAtPSBtb21lbnRUeXBlLndob2xlVmFsdWUudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50VHlwZS52YWx1ZSA9IG1vbWVudFR5cGUud2hvbGVWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtb21lbnRUeXBlLnRva2VuTGVuZ3RoID4gMSAmJiAoZm9yY2VMZW5ndGggfHwgZm91bmRGaXJzdCkpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXRPcHRpb25zLm1pbmltdW1JbnRlZ2VyRGlnaXRzID0gbW9tZW50VHlwZS50b2tlbkxlbmd0aDtcblxuICAgICAgICAgICAgICAgIGlmIChidWJibGVkICYmIGZvcm1hdE9wdGlvbnMubWF4aW11bVNpZ25pZmljYW50RGlnaXRzIDwgbW9tZW50VHlwZS50b2tlbkxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZm9ybWF0T3B0aW9ucy5tYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWZvdW5kRmlyc3QgJiYgKG1vbWVudFR5cGUudmFsdWUgPiAwIHx8IHRyaW0gPT09IFwiXCIgLyogdHJpbTogZmFsc2UgKi8gfHwgZmluZChzdG9wVHJpbSwgbW9tZW50VHlwZS50eXBlKSB8fCBmaW5kKG91dHB1dFR5cGVzLCBtb21lbnRUeXBlLnR5cGUpKSkge1xuICAgICAgICAgICAgICAgIGZvdW5kRmlyc3QgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlID0gZm9ybWF0TnVtYmVyKG1vbWVudFR5cGUudmFsdWUsIGZvcm1hdE9wdGlvbnMsIHVzZXJMb2NhbGUpO1xuXG4gICAgICAgICAgICBmb3JtYXRPcHRpb25zLnVzZUdyb3VwaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBmb3JtYXRPcHRpb25zLmRlY2ltYWxTZXBhcmF0b3IgPSBcIi5cIjtcbiAgICAgICAgICAgIG1vbWVudFR5cGUuZm9ybWF0dGVkVmFsdWVFbiA9IGZvcm1hdE51bWJlcihtb21lbnRUeXBlLnZhbHVlLCBmb3JtYXRPcHRpb25zLCBcImVuXCIpO1xuXG4gICAgICAgICAgICBpZiAobW9tZW50VHlwZS50b2tlbkxlbmd0aCA9PT0gMiAmJiBtb21lbnRUeXBlLnR5cGUgPT09IFwibWlsbGlzZWNvbmRzXCIpIHtcbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlTVMgPSBmb3JtYXROdW1iZXIobW9tZW50VHlwZS52YWx1ZSwge1xuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogMyxcbiAgICAgICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSwgXCJlblwiKS5zbGljZSgwLCAyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIGZvcm1hdHRlZCB2YWx1ZXMuXG4gICAgICAgIG1vbWVudFR5cGVzID0gbWFwKG1vbWVudFR5cGVzLCBmb3JtYXRWYWx1ZSk7XG4gICAgICAgIG1vbWVudFR5cGVzID0gY29tcGFjdChtb21lbnRUeXBlcyk7XG5cbiAgICAgICAgLy8gQnViYmxlIHJvdW5kZWQgdmFsdWVzLlxuICAgICAgICBpZiAobW9tZW50VHlwZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdmFyIGZpbmRUeXBlID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluZChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGUudHlwZSA9PT0gdHlwZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBidWJibGVUeXBlcyA9IGZ1bmN0aW9uIChidWJibGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYnViYmxlTW9tZW50VHlwZSA9IGZpbmRUeXBlKGJ1YmJsZS50eXBlKTtcblxuICAgICAgICAgICAgICAgIGlmICghYnViYmxlTW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWFjaChidWJibGUudGFyZ2V0cywgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0TW9tZW50VHlwZSA9IGZpbmRUeXBlKHRhcmdldC50eXBlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRhcmdldE1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChidWJibGVNb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlRW4sIDEwKSA9PT0gdGFyZ2V0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVNb21lbnRUeXBlLnJhd1ZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZU1vbWVudFR5cGUud2hvbGVWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWJibGVNb21lbnRUeXBlLmRlY2ltYWxWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNb21lbnRUeXBlLnJhd1ZhbHVlICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRNb21lbnRUeXBlLndob2xlVmFsdWUgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1vbWVudFR5cGUuZGVjaW1hbFZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE1vbWVudFR5cGUuZm9ybWF0dGVkVmFsdWVFbiA9IHRhcmdldE1vbWVudFR5cGUud2hvbGVWYWx1ZS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnViYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGVhY2goYnViYmxlcywgYnViYmxlVHlwZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVjYWxjdWxhdGUgZm9ybWF0dGVkIHZhbHVlcy5cbiAgICAgICAgaWYgKGJ1YmJsZWQpIHtcbiAgICAgICAgICAgIGZvdW5kRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgIHNpZ25pZmljYW50RGlnaXRzID0gc2lnbmlmaWNhbnREaWdpdHNDYWNoZTtcbiAgICAgICAgICAgIG1vbWVudFR5cGVzID0gbWFwKG1vbWVudFR5cGVzLCBmb3JtYXRWYWx1ZSk7XG4gICAgICAgICAgICBtb21lbnRUeXBlcyA9IGNvbXBhY3QobW9tZW50VHlwZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG91dHB1dFR5cGVzICYmICEoaXNNYXhWYWx1ZSAmJiAhc2V0dGluZ3MudHJpbSkpIHtcbiAgICAgICAgICAgIG1vbWVudFR5cGVzID0gbWFwKG1vbWVudFR5cGVzLCBmdW5jdGlvbiAobW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgIGlmIChmaW5kKG91dHB1dFR5cGVzLCBmdW5jdGlvbiAob3V0cHV0VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZS50eXBlID09PSBvdXRwdXRUeXBlO1xuICAgICAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1vbWVudFR5cGVzID0gY29tcGFjdChtb21lbnRUeXBlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUcmltIExhcmdlLlxuICAgICAgICAgICAgaWYgKHRyaW1MYXJnZSkge1xuICAgICAgICAgICAgICAgIG1vbWVudFR5cGVzID0gcmVzdChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU3RvcCB0cmltbWluZyBvbjpcbiAgICAgICAgICAgICAgICAgICAgLy8gLSB0aGUgc21hbGxlc3QgbW9tZW50IHR5cGVcbiAgICAgICAgICAgICAgICAgICAgLy8gLSBhIHR5cGUgbWFya2VkIGZvciBzdG9wVHJpbVxuICAgICAgICAgICAgICAgICAgICAvLyAtIGEgdHlwZSB0aGF0IGhhcyBhIHdob2xlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhbW9tZW50VHlwZS5pc1NtYWxsZXN0ICYmICFtb21lbnRUeXBlLndob2xlVmFsdWUgJiYgIWZpbmQoc3RvcFRyaW0sIG1vbWVudFR5cGUudHlwZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExhcmdlc3QuXG4gICAgICAgICAgICBpZiAobGFyZ2VzdCAmJiBtb21lbnRUeXBlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBtb21lbnRUeXBlcyA9IG1vbWVudFR5cGVzLnNsaWNlKDAsIGxhcmdlc3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUcmltIFNtYWxsLlxuICAgICAgICAgICAgaWYgKHRyaW1TbWFsbCAmJiBtb21lbnRUeXBlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBpbml0aWFsKG1vbWVudFR5cGVzLCBmdW5jdGlvbiAobW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTdG9wIHRyaW1taW5nIG9uOlxuICAgICAgICAgICAgICAgICAgICAvLyAtIGEgdHlwZSBtYXJrZWQgZm9yIHN0b3BUcmltXG4gICAgICAgICAgICAgICAgICAgIC8vIC0gYSB0eXBlIHRoYXQgaGFzIGEgd2hvbGUgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgLy8gLSB0aGUgbGFyZ2VzdCBtb21lbnRUeXBlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhbW9tZW50VHlwZS53aG9sZVZhbHVlICYmICFmaW5kKHN0b3BUcmltLCBtb21lbnRUeXBlLnR5cGUpICYmICFtb21lbnRUeXBlLmlzTGFyZ2VzdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVHJpbSBNaWQuXG4gICAgICAgICAgICBpZiAodHJpbU1pZCkge1xuICAgICAgICAgICAgICAgIG1vbWVudFR5cGVzID0gbWFwKG1vbWVudFR5cGVzLCBmdW5jdGlvbiAobW9tZW50VHlwZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gMCAmJiBpbmRleCA8IG1vbWVudFR5cGVzLmxlbmd0aCAtIDEgJiYgIW1vbWVudFR5cGUud2hvbGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1vbWVudFR5cGVzID0gY29tcGFjdChtb21lbnRUeXBlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRyaW0gRmluYWwuXG4gICAgICAgICAgICBpZiAodHJpbUZpbmFsICYmIG1vbWVudFR5cGVzLmxlbmd0aCA9PT0gMSAmJiAhbW9tZW50VHlwZXNbMF0ud2hvbGVWYWx1ZSAmJiAhKCF0cnVuYyAmJiBtb21lbnRUeXBlc1swXS5pc1NtYWxsZXN0ICYmIG1vbWVudFR5cGVzWzBdLnJhd1ZhbHVlIDwgbWluVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgbW9tZW50VHlwZXMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXR1cm5Nb21lbnRUeXBlcykge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudFR5cGVzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTG9jYWxpemUgYW5kIHBsdXJhbGl6ZSB1bml0IGxhYmVscy5cbiAgICAgICAgZWFjaCh0b2tlbnMsIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgdmFyIGtleSA9IG1vbWVudFRva2Vuc1t0b2tlbi50eXBlXTtcblxuICAgICAgICAgICAgdmFyIG1vbWVudFR5cGUgPSBmaW5kKG1vbWVudFR5cGVzLCBmdW5jdGlvbiAobW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnRUeXBlLnR5cGUgPT09IHRva2VuLnR5cGU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFrZXkgfHwgIW1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlRW4uc3BsaXQoXCIuXCIpO1xuXG4gICAgICAgICAgICB2YWx1ZXNbMF0gPSBwYXJzZUludCh2YWx1ZXNbMF0sIDEwKTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlc1sxXSkge1xuICAgICAgICAgICAgICAgIHZhbHVlc1sxXSA9IHBhcnNlRmxvYXQoXCIwLlwiICsgdmFsdWVzWzFdLCAxMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlc1sxXSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwbHVyYWxLZXkgPSBsb2NhbGVEYXRhLmR1cmF0aW9uUGx1cmFsS2V5KGtleSwgdmFsdWVzWzBdLCB2YWx1ZXNbMV0pO1xuXG4gICAgICAgICAgICB2YXIgbGFiZWxzID0gZHVyYXRpb25HZXRMYWJlbHMoa2V5LCBsb2NhbGVEYXRhKTtcblxuICAgICAgICAgICAgdmFyIGF1dG9Mb2NhbGl6ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgdmFyIHBsdXJhbGl6ZWRMYWJlbHMgPSB7fTtcblxuICAgICAgICAgICAgLy8gQXV0by1Mb2NhbGl6ZWQgdW5pdCBsYWJlbHMuXG4gICAgICAgICAgICBlYWNoKGxvY2FsZURhdGEuX2R1cmF0aW9uTGFiZWxUeXBlcywgZnVuY3Rpb24gKGxhYmVsVHlwZSkge1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IGZpbmQobGFiZWxzLCBmdW5jdGlvbiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhYmVsLnR5cGUgPT09IGxhYmVsVHlwZS50eXBlICYmIGxhYmVsLmtleSA9PT0gcGx1cmFsS2V5O1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsdXJhbGl6ZWRMYWJlbHNbbGFiZWwudHlwZV0gPSBsYWJlbC5sYWJlbDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaW5nSW5jbHVkZXModG9rZW4udGV4dCwgbGFiZWxUeXBlLnN0cmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuLnRleHQgPSB0b2tlbi50ZXh0LnJlcGxhY2UobGFiZWxUeXBlLnN0cmluZywgbGFiZWwubGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0xvY2FsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQXV0by1wbHVyYWxpemVkIHVuaXQgbGFiZWxzLlxuICAgICAgICAgICAgaWYgKHVzZVBsdXJhbCAmJiAhYXV0b0xvY2FsaXplZCkge1xuICAgICAgICAgICAgICAgIGxhYmVscy5zb3J0KGR1cmF0aW9uTGFiZWxDb21wYXJlKTtcblxuICAgICAgICAgICAgICAgIGVhY2gobGFiZWxzLCBmdW5jdGlvbiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsdXJhbGl6ZWRMYWJlbHNbbGFiZWwudHlwZV0gPT09IGxhYmVsLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaW5nSW5jbHVkZXModG9rZW4udGV4dCwgbGFiZWwubGFiZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RvcCBjaGVja2luZyB0aGlzIHRva2VuIGlmIGl0cyBsYWJlbCBpcyBhbHJlYWR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29ycmVjdGx5IHBsdXJhbGl6ZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIHRoaXMgbGFiZWwgaWYgaXQgaXMgY29ycmVjdCwgYnV0IG5vdCBwcmVzZW50IGluXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgdG9rZW4ncyB0ZXh0LlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZ0luY2x1ZGVzKHRva2VuLnRleHQsIGxhYmVsLmxhYmVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVwbGVjZSB0aGlzIHRva2VuJ3MgbGFiZWwgYW5kIHN0b3AgY2hlY2tpbmcuXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi50ZXh0ID0gdG9rZW4udGV4dC5yZXBsYWNlKGxhYmVsLmxhYmVsLCBwbHVyYWxpemVkTGFiZWxzW2xhYmVsLnR5cGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBCdWlsZCBvdXB0dXQuXG4gICAgICAgIHRva2VucyA9IG1hcCh0b2tlbnMsIGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgaWYgKCF0b2tlbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuLnRleHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtb21lbnRUeXBlID0gZmluZChtb21lbnRUeXBlcywgZnVuY3Rpb24gKG1vbWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50VHlwZS50eXBlID09PSB0b2tlbi50eXBlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghbW9tZW50VHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgb3V0ID0gXCJcIjtcblxuICAgICAgICAgICAgaWYgKHVzZUxlZnRVbml0cykge1xuICAgICAgICAgICAgICAgIG91dCArPSB0b2tlbi50ZXh0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNOZWdhdGl2ZSAmJiBpc01heFZhbHVlIHx8ICFpc05lZ2F0aXZlICYmIGlzTWluVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBvdXQgKz0gXCI8IFwiO1xuICAgICAgICAgICAgICAgIGlzTWF4VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpc01pblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc05lZ2F0aXZlICYmIGlzTWluVmFsdWUgfHwgIWlzTmVnYXRpdmUgJiYgaXNNYXhWYWx1ZSkge1xuICAgICAgICAgICAgICAgIG91dCArPSBcIj4gXCI7XG4gICAgICAgICAgICAgICAgaXNNYXhWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlzTWluVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzTmVnYXRpdmUgJiYgKG1vbWVudFR5cGUudmFsdWUgPiAwIHx8IHRyaW0gPT09IFwiXCIgfHwgZmluZChzdG9wVHJpbSwgbW9tZW50VHlwZS50eXBlKSB8fCBmaW5kKG91dHB1dFR5cGVzLCBtb21lbnRUeXBlLnR5cGUpKSkge1xuICAgICAgICAgICAgICAgIG91dCArPSBcIi1cIjtcbiAgICAgICAgICAgICAgICBpc05lZ2F0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0b2tlbi50eXBlID09PSBcIm1pbGxpc2Vjb25kc1wiICYmIG1vbWVudFR5cGUuZm9ybWF0dGVkVmFsdWVNUykge1xuICAgICAgICAgICAgICAgIG91dCArPSBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlTVM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG91dCArPSBtb21lbnRUeXBlLmZvcm1hdHRlZFZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXVzZUxlZnRVbml0cykge1xuICAgICAgICAgICAgICAgIG91dCArPSB0b2tlbi50ZXh0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBUcmltIGxlYWRpbmcgYW5kIHRyYWlsaW5nIGNvbW1hLCBzcGFjZSwgY29sb24sIGFuZCBkb3QuXG4gICAgICAgIHJldHVybiB0b2tlbnMuam9pbihcIlwiKS5yZXBsYWNlKC8oLHwgfDp8XFwuKSokLywgXCJcIikucmVwbGFjZSgvXigsfCB8OnxcXC4pKi8sIFwiXCIpO1xuICAgIH1cblxuICAgIC8vIGRlZmF1bHRGb3JtYXRUZW1wbGF0ZVxuICAgIGZ1bmN0aW9uIGRlZmF1bHRGb3JtYXRUZW1wbGF0ZSgpIHtcbiAgICAgICAgdmFyIGR1ciA9IHRoaXMuZHVyYXRpb247XG5cbiAgICAgICAgdmFyIGZpbmRUeXBlID0gZnVuY3Rpb24gZmluZFR5cGUodHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIGR1ci5fZGF0YVt0eXBlXTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZmlyc3RUeXBlID0gZmluZCh0aGlzLnR5cGVzLCBmaW5kVHlwZSk7XG5cbiAgICAgICAgdmFyIGxhc3RUeXBlID0gZmluZExhc3QodGhpcy50eXBlcywgZmluZFR5cGUpO1xuXG4gICAgICAgIC8vIERlZmF1bHQgdGVtcGxhdGUgc3RyaW5ncyBmb3IgZWFjaCBkdXJhdGlvbiBkaW1lbnNpb24gdHlwZS5cbiAgICAgICAgc3dpdGNoIChmaXJzdFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJtaWxsaXNlY29uZHNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJTIF9fXCI7XG4gICAgICAgICAgICBjYXNlIFwic2Vjb25kc1wiOiAvLyBGYWxsdGhyb3VnaC5cbiAgICAgICAgICAgIGNhc2UgXCJtaW51dGVzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiKl9NU19cIjtcbiAgICAgICAgICAgIGNhc2UgXCJob3Vyc1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIl9ITVNfXCI7XG4gICAgICAgICAgICBjYXNlIFwiZGF5c1wiOiAvLyBQb3NzaWJsZSBGYWxsdGhyb3VnaC5cbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RUeXBlID09PSBsYXN0VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJkIF9fXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcIndlZWtzXCI6XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0VHlwZSA9PT0gbGFzdFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidyBfX1wiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmltID0gXCJib3RoXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidyBfXywgZCBfXywgaCBfX1wiO1xuICAgICAgICAgICAgY2FzZSBcIm1vbnRoc1wiOiAvLyBQb3NzaWJsZSBGYWxsdGhyb3VnaC5cbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RUeXBlID09PSBsYXN0VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJNIF9fXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcInllYXJzXCI6XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0VHlwZSA9PT0gbGFzdFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwieSBfX1wiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmltID0gXCJib3RoXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwieSBfXywgTSBfXywgZCBfX1wiO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmltID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpbSA9IFwiYm90aFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBcInkgX18sIGQgX18sIGggX18sIG0gX18sIHMgX19cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGluaXRcbiAgICBmdW5jdGlvbiBpbml0KGNvbnRleHQpIHtcbiAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgICB0aHJvdyBcIk1vbWVudCBEdXJhdGlvbiBGb3JtYXQgaW5pdCBjYW5ub3QgZmluZCBtb21lbnQgaW5zdGFuY2UuXCI7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LmR1cmF0aW9uLmZvcm1hdCA9IGR1cmF0aW9uc0Zvcm1hdDtcbiAgICAgICAgY29udGV4dC5kdXJhdGlvbi5mbi5mb3JtYXQgPSBkdXJhdGlvbkZvcm1hdDtcblxuICAgICAgICBjb250ZXh0LmR1cmF0aW9uLmZuLmZvcm1hdC5kZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIC8vIE1hbnkgb3B0aW9ucyBhcmUgZGVmYXVsdGVkIHRvIGBudWxsYCB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuXG4gICAgICAgICAgICAvLyAnbm90IHNldCcgYW5kICdzZXQgdG8gYGZhbHNlYCdcblxuICAgICAgICAgICAgLy8gdHJpbVxuICAgICAgICAgICAgLy8gQ2FuIGJlIGEgc3RyaW5nLCBhIGRlbGltaXRlZCBsaXN0IG9mIHN0cmluZ3MsIGFuIGFycmF5IG9mIHN0cmluZ3MsXG4gICAgICAgICAgICAvLyBvciBhIGJvb2xlYW4uXG4gICAgICAgICAgICAvLyBcImxhcmdlXCIgLSB3aWxsIHRyaW0gbGFyZ2VzdC1tYWduaXR1ZGUgemVyby12YWx1ZSB0b2tlbnMgdW50aWxcbiAgICAgICAgICAgIC8vIGZpbmRpbmcgYSB0b2tlbiB3aXRoIGEgdmFsdWUsIGEgdG9rZW4gaWRlbnRpZmllZCBhcyAnc3RvcFRyaW0nLCBvclxuICAgICAgICAgICAgLy8gdGhlIGZpbmFsIHRva2VuIG9mIHRoZSBmb3JtYXQgc3RyaW5nLlxuICAgICAgICAgICAgLy8gXCJzbWFsbFwiIC0gd2lsbCB0cmltIHNtYWxsZXN0LW1hZ25pdHVkZSB6ZXJvLXZhbHVlIHRva2VucyB1bnRpbFxuICAgICAgICAgICAgLy8gZmluZGluZyBhIHRva2VuIHdpdGggYSB2YWx1ZSwgYSB0b2tlbiBpZGVudGlmaWVkIGFzICdzdG9wVHJpbScsIG9yXG4gICAgICAgICAgICAvLyB0aGUgZmluYWwgdG9rZW4gb2YgdGhlIGZvcm1hdCBzdHJpbmcuXG4gICAgICAgICAgICAvLyBcImJvdGhcIiAtIHdpbGwgZXhlY3V0ZSBcImxhcmdlXCIgdHJpbSB0aGVuIFwic21hbGxcIiB0cmltLlxuICAgICAgICAgICAgLy8gXCJtaWRcIiAtIHdpbGwgdHJpbSBhbnkgemVyby12YWx1ZSB0b2tlbnMgdGhhdCBhcmUgbm90IHRoZSBmaXJzdCBvclxuICAgICAgICAgICAgLy8gbGFzdCB0b2tlbnMuIFVzdWFsbHkgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIFwibGFyZ2VcIiBvciBcImJvdGhcIi5cbiAgICAgICAgICAgIC8vIGUuZy4gXCJsYXJnZSBtaWRcIiBvciBcImJvdGggbWlkXCIuXG4gICAgICAgICAgICAvLyBcImZpbmFsXCIgLSB3aWxsIHRyaW0gdGhlIGZpbmFsIHRva2VuIGlmIGl0IGlzIHplcm8tdmFsdWUuIFVzZSB0aGlzXG4gICAgICAgICAgICAvLyBvcHRpb24gd2l0aCBcImxhcmdlXCIgb3IgXCJib3RoXCIgdG8gb3V0cHV0IGFuIGVtcHR5IHN0cmluZyB3aGVuXG4gICAgICAgICAgICAvLyBmb3JtYXR0aW5nIGEgemVyby12YWx1ZSBkdXJhdGlvbi4gZS5nLiBcImxhcmdlIGZpbmFsXCIgb3IgXCJib3RoIGZpbmFsXCIuXG4gICAgICAgICAgICAvLyBcImFsbFwiIC0gV2lsbCB0cmltIGFsbCB6ZXJvLXZhbHVlIHRva2Vucy4gU2hvcnRoYW5kIGZvciBcImJvdGggbWlkIGZpbmFsXCIuXG4gICAgICAgICAgICAvLyBcImxlZnRcIiAtIG1hcHMgdG8gXCJsYXJnZVwiIHRvIHN1cHBvcnQgcGx1Z2luJ3MgdmVyc2lvbiAxIEFQSS5cbiAgICAgICAgICAgIC8vIFwicmlnaHRcIiAtIG1hcHMgdG8gXCJsYXJnZVwiIHRvIHN1cHBvcnQgcGx1Z2luJ3MgdmVyc2lvbiAxIEFQSS5cbiAgICAgICAgICAgIC8vIGBmYWxzZWAgLSB0ZW1wbGF0ZSB0b2tlbnMgYXJlIG5vdCB0cmltbWVkLlxuICAgICAgICAgICAgLy8gYHRydWVgIC0gdHJlYXRlZCBhcyBcImxhcmdlXCIuXG4gICAgICAgICAgICAvLyBgbnVsbGAgLSB0cmVhdGVkIGFzIFwibGFyZ2VcIi5cbiAgICAgICAgICAgIHRyaW06IG51bGwsXG5cbiAgICAgICAgICAgIC8vIHN0b3BUcmltXG4gICAgICAgICAgICAvLyBBIG1vbWVudCB0b2tlbiBzdHJpbmcsIGEgZGVsaW1pdGVkIHNldCBvZiBtb21lbnQgdG9rZW4gc3RyaW5ncyxcbiAgICAgICAgICAgIC8vIG9yIGFuIGFycmF5IG9mIG1vbWVudCB0b2tlbiBzdHJpbmdzLiBUcmltbWluZyB3aWxsIHN0b3Agd2hlbiBhIHRva2VuXG4gICAgICAgICAgICAvLyBsaXN0ZWQgaW4gdGhpcyBvcHRpb24gaXMgcmVhY2hlZC4gQSBcIipcIiBjaGFyYWN0ZXIgaW4gdGhlIGZvcm1hdFxuICAgICAgICAgICAgLy8gdGVtcGxhdGUgc3RyaW5nIHdpbGwgYWxzbyBtYXJrIGEgbW9tZW50IHRva2VuIGFzIHN0b3BUcmltLlxuICAgICAgICAgICAgLy8gZS5nLiBcImQgW2RheXNdICpoOm1tOnNzXCIgd2lsbCBhbHdheXMgc3RvcCB0cmltbWluZyBhdCB0aGUgJ2hvdXJzJyB0b2tlbi5cbiAgICAgICAgICAgIHN0b3BUcmltOiBudWxsLFxuXG4gICAgICAgICAgICAvLyBsYXJnZXN0XG4gICAgICAgICAgICAvLyBTZXQgdG8gYSBwb3NpdGl2ZSBpbnRlZ2VyIHRvIG91dHB1dCBvbmx5IHRoZSBcIm5cIiBsYXJnZXN0LW1hZ25pdHVkZVxuICAgICAgICAgICAgLy8gbW9tZW50IHRva2VucyB0aGF0IGhhdmUgYSB2YWx1ZS4gQWxsIGxlc3Nlci1tYWduaXR1ZGUgbW9tZW50IHRva2Vuc1xuICAgICAgICAgICAgLy8gd2lsbCBiZSBpZ25vcmVkLiBUaGlzIG9wdGlvbiB0YWtlcyBlZmZlY3QgZXZlbiBpZiBgdHJpbWAgaXMgc2V0XG4gICAgICAgICAgICAvLyB0byBgZmFsc2VgLlxuICAgICAgICAgICAgbGFyZ2VzdDogbnVsbCxcblxuICAgICAgICAgICAgLy8gbWF4VmFsdWVcbiAgICAgICAgICAgIC8vIFVzZSBgbWF4VmFsdWVgIHRvIHJlbmRlciBnZW5lcmFsaXplZCBvdXRwdXQgZm9yIGxhcmdlIGR1cmF0aW9uIHZhbHVlcyxcbiAgICAgICAgICAgIC8vIGUuZy4gYFwiPiA2MCBkYXlzXCJgLiBgbWF4VmFsdWVgIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyIGFuZCBpc1xuICAgICAgICAgICAgLy8vIGFwcGxpZWQgdG8gdGhlIGdyZWF0ZXN0LW1hZ25pdHVkZSBtb21lbnQgdG9rZW4gaW4gdGhlIGZvcm1hdCB0ZW1wbGF0ZS5cbiAgICAgICAgICAgIG1heFZhbHVlOiBudWxsLFxuXG4gICAgICAgICAgICAvLyBtaW5WYWx1ZVxuICAgICAgICAgICAgLy8gVXNlIGBtaW5WYWx1ZWAgdG8gcmVuZGVyIGdlbmVyYWxpemVkIG91dHB1dCBmb3Igc21hbGwgZHVyYXRpb24gdmFsdWVzLFxuICAgICAgICAgICAgLy8gZS5nLiBgXCI8IDUgbWludXRlc1wiYC4gYG1pblZhbHVlYCBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciBhbmQgaXNcbiAgICAgICAgICAgIC8vIGFwcGxpZWQgdG8gdGhlIGxlYXN0LW1hZ25pdHVkZSBtb21lbnQgdG9rZW4gaW4gdGhlIGZvcm1hdCB0ZW1wbGF0ZS5cbiAgICAgICAgICAgIG1pblZhbHVlOiBudWxsLFxuXG4gICAgICAgICAgICAvLyBwcmVjaXNpb25cbiAgICAgICAgICAgIC8vIElmIGEgcG9zaXRpdmUgaW50ZWdlciwgbnVtYmVyIG9mIGRlY2ltYWwgZnJhY3Rpb24gZGlnaXRzIHRvIHJlbmRlci5cbiAgICAgICAgICAgIC8vIElmIGEgbmVnYXRpdmUgaW50ZWdlciwgbnVtYmVyIG9mIGludGVnZXIgcGxhY2UgZGlnaXRzIHRvIHRydW5jYXRlIHRvIDAuXG4gICAgICAgICAgICAvLyBJZiBgdXNlU2lnbmlmaWNhbnREaWdpdHNgIGlzIHNldCB0byBgdHJ1ZWAgYW5kIGBwcmVjaXNpb25gIGlzIGEgcG9zaXRpdmVcbiAgICAgICAgICAgIC8vIGludGVnZXIsIHNldHMgdGhlIG1heGltdW0gbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cyB1c2VkIGluIHRoZVxuICAgICAgICAgICAgLy8gZm9ybWF0dGVkIG91dHB1dC5cbiAgICAgICAgICAgIHByZWNpc2lvbjogMCxcblxuICAgICAgICAgICAgLy8gdHJ1bmNcbiAgICAgICAgICAgIC8vIERlZmF1bHQgYmVoYXZpb3Igcm91bmRzIGZpbmFsIHRva2VuIHZhbHVlLiBTZXQgdG8gYHRydWVgIHRvXG4gICAgICAgICAgICAvLyB0cnVuY2F0ZSBmaW5hbCB0b2tlbiB2YWx1ZSwgd2hpY2ggd2FzIHRoZSBkZWZhdWx0IGJlaGF2aW9yIGluXG4gICAgICAgICAgICAvLyB2ZXJzaW9uIDEgb2YgdGhpcyBwbHVnaW4uXG4gICAgICAgICAgICB0cnVuYzogZmFsc2UsXG5cbiAgICAgICAgICAgIC8vIGZvcmNlTGVuZ3RoXG4gICAgICAgICAgICAvLyBGb3JjZSBmaXJzdCBtb21lbnQgdG9rZW4gd2l0aCBhIHZhbHVlIHRvIHJlbmRlciBhdCBmdWxsIGxlbmd0aFxuICAgICAgICAgICAgLy8gZXZlbiB3aGVuIHRlbXBsYXRlIGlzIHRyaW1tZWQgYW5kIGZpcnN0IG1vbWVudCB0b2tlbiBoYXMgbGVuZ3RoIG9mIDEuXG4gICAgICAgICAgICBmb3JjZUxlbmd0aDogbnVsbCxcblxuICAgICAgICAgICAgLy8gdXNlckxvY2FsZVxuICAgICAgICAgICAgLy8gRm9ybWF0dGVkIG51bWVyaWNhbCBvdXRwdXQgaXMgcmVuZGVyZWQgdXNpbmcgYHRvTG9jYWxlU3RyaW5nYFxuICAgICAgICAgICAgLy8gYW5kIHRoZSBsb2NhbGUgb2YgdGhlIHVzZXIncyBlbnZpcm9ubWVudC4gU2V0IHRoaXMgb3B0aW9uIHRvIHJlbmRlclxuICAgICAgICAgICAgLy8gbnVtZXJpY2FsIG91dHB1dCB1c2luZyBhIGRpZmZlcmVudCBsb2NhbGUuIFVuaXQgbmFtZXMgYXJlIHJlbmRlcmVkXG4gICAgICAgICAgICAvLyBhbmQgZGV0ZWN0ZWQgdXNpbmcgdGhlIGxvY2FsZSBzZXQgaW4gbW9tZW50LmpzLCB3aGljaCBjYW4gYmUgZGlmZmVyZW50XG4gICAgICAgICAgICAvLyBmcm9tIHRoZSBsb2NhbGUgb2YgdXNlcidzIGVudmlyb25tZW50LlxuICAgICAgICAgICAgdXNlckxvY2FsZTogbnVsbCxcblxuICAgICAgICAgICAgLy8gdXNlUGx1cmFsXG4gICAgICAgICAgICAvLyBXaWxsIGF1dG9tYXRpY2FsbHkgc2luZ3VsYXJpemUgb3IgcGx1cmFsaXplIHVuaXQgbmFtZXMgd2hlbiB0aGV5XG4gICAgICAgICAgICAvLyBhcHBlYXIgaW4gdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIGVhY2ggbW9tZW50IHRva2VuLiBTdGFuZGFyZCBhbmRcbiAgICAgICAgICAgIC8vIHNob3J0IHVuaXQgbGFiZWxzIGFyZSBzaW5ndWxhcml6ZWQgYW5kIHBsdXJhbGl6ZWQsIGJhc2VkIG9uIGxvY2FsZS5cbiAgICAgICAgICAgIC8vIGUuZy4gaW4gZW5nbGlzaCwgXCIxIHNlY29uZFwiIG9yIFwiMSBzZWNcIiB3b3VsZCBiZSByZW5kZXJlZCBpbnN0ZWFkXG4gICAgICAgICAgICAvLyBvZiBcIjEgc2Vjb25kc1wiIG9yIFwiMSBzZWNzXCIuIFRoZSBkZWZhdWx0IHBsdXJhbGl6YXRpb24gZnVuY3Rpb25cbiAgICAgICAgICAgIC8vIHJlbmRlcnMgYSBwbHVyYWwgbGFiZWwgZm9yIGEgdmFsdWUgd2l0aCBkZWNpbWFsIHByZWNpc2lvbi5cbiAgICAgICAgICAgIC8vIGUuZy4gXCIxLjAgc2Vjb25kc1wiIGlzIG5ldmVyIHJlbmRlcmVkIGFzIFwiMS4wIHNlY29uZFwiLlxuICAgICAgICAgICAgLy8gTGFiZWwgdHlwZXMgYW5kIHBsdXJhbGl6YXRpb24gZnVuY3Rpb24gYXJlIGNvbmZpZ3VyYWJsZSBpbiB0aGVcbiAgICAgICAgICAgIC8vIGxvY2FsZURhdGEgZXh0ZW5zaW9ucy5cbiAgICAgICAgICAgIHVzZVBsdXJhbDogdHJ1ZSxcblxuICAgICAgICAgICAgLy8gdXNlTGVmdFVuaXRzXG4gICAgICAgICAgICAvLyBUaGUgdGV4dCB0byB0aGUgcmlnaHQgb2YgZWFjaCBtb21lbnQgdG9rZW4gaW4gYSBmb3JtYXQgc3RyaW5nXG4gICAgICAgICAgICAvLyBpcyB0cmVhdGVkIGFzIHRoYXQgdG9rZW4ncyB1bml0cyBmb3IgdGhlIHB1cnBvc2VzIG9mIHRyaW1taW5nLFxuICAgICAgICAgICAgLy8gc2luZ3VsYXJpemluZywgYW5kIGF1dG8tbG9jYWxpemluZy5cbiAgICAgICAgICAgIC8vIGUuZy4gXCJoIFtob3Vyc10sIG0gW21pbnV0ZXNdLCBzIFtzZWNvbmRzXVwiLlxuICAgICAgICAgICAgLy8gVG8gcHJvcGVybHkgc2luZ3VsYXJpemUgb3IgbG9jYWxpemUgYSBmb3JtYXQgc3RyaW5nIHN1Y2ggYXNcbiAgICAgICAgICAgIC8vIFwiW2hvdXJzXSBoLCBbbWludXRlc10gbSwgW3NlY29uZHNdIHNcIiwgd2hlcmUgdGhlIHVuaXRzIGFwcGVhclxuICAgICAgICAgICAgLy8gdG8gdGhlIGxlZnQgb2YgZWFjaCBtb21lbnQgdG9rZW4sIHNldCB1c2VMZWZ0VW5pdHMgdG8gYHRydWVgLlxuICAgICAgICAgICAgLy8gVGhpcyBwbHVnaW4gaXMgbm90IHRlc3RlZCBpbiB0aGUgY29udGV4dCBvZiBydGwgdGV4dC5cbiAgICAgICAgICAgIHVzZUxlZnRVbml0czogZmFsc2UsXG5cbiAgICAgICAgICAgIC8vIHVzZUdyb3VwaW5nXG4gICAgICAgICAgICAvLyBFbmFibGVzIGxvY2FsZS1iYXNlZCBkaWdpdCBncm91cGluZyBpbiB0aGUgZm9ybWF0dGVkIG91dHB1dC4gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL051bWJlci90b0xvY2FsZVN0cmluZ1xuICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG5cbiAgICAgICAgICAgIC8vIHVzZVNpZ25pZmljYW50RGlnaXRzXG4gICAgICAgICAgICAvLyBUcmVhdCB0aGUgYHByZWNpc2lvbmAgb3B0aW9uIGFzIHRoZSBtYXhpbXVtIHNpZ25pZmljYW50IGRpZ2l0c1xuICAgICAgICAgICAgLy8gdG8gYmUgcmVuZGVyZWQuIFByZWNpc2lvbiBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlci4gU2lnbmlmaWNhbnRcbiAgICAgICAgICAgIC8vIGRpZ2l0cyBleHRlbmQgYWNyb3NzIHVuaXQgdHlwZXMsXG4gICAgICAgICAgICAvLyBlLmcuIFwiNiBob3VycyAzNy41IG1pbnV0ZXNcIiByZXByZXNlbnRzIDQgc2lnbmlmaWNhbnQgZGlnaXRzLlxuICAgICAgICAgICAgLy8gRW5hYmxpbmcgdGhpcyBvcHRpb24gY2F1c2VzIHRva2VuIGxlbmd0aCB0byBiZSBpZ25vcmVkLiBTZWUgIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL051bWJlci90b0xvY2FsZVN0cmluZ1xuICAgICAgICAgICAgdXNlU2lnbmlmaWNhbnREaWdpdHM6IGZhbHNlLFxuXG4gICAgICAgICAgICAvLyB0ZW1wbGF0ZVxuICAgICAgICAgICAgLy8gVGhlIHRlbXBsYXRlIHN0cmluZyB1c2VkIHRvIGZvcm1hdCB0aGUgZHVyYXRpb24uIE1heSBiZSBhIGZ1bmN0aW9uXG4gICAgICAgICAgICAvLyBvciBhIHN0cmluZy4gVGVtcGxhdGUgZnVuY3Rpb25zIGFyZSBleGVjdXRlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZ1xuICAgICAgICAgICAgLy8gb2YgdGhlIHNldHRpbmdzIG9iamVjdCBzbyB0aGF0IHRlbXBsYXRlIHN0cmluZ3MgbWF5IGJlIGR5bmFtaWNhbGx5XG4gICAgICAgICAgICAvLyBnZW5lcmF0ZWQgYmFzZWQgb24gdGhlIGR1cmF0aW9uIG9iamVjdCAoYWNjZXNzaWJsZSB2aWEgYHRoaXMuZHVyYXRpb25gKVxuICAgICAgICAgICAgLy8gb3IgYW55IG9mIHRoZSBvdGhlciBzZXR0aW5ncy4gTGVhZGluZyBhbmQgdHJhaWxpbmcgc3BhY2UsIGNvbW1hLFxuICAgICAgICAgICAgLy8gcGVyaW9kLCBhbmQgY29sb24gY2hhcmFjdGVycyBhcmUgdHJpbW1lZCBmcm9tIHRoZSByZXN1bHRpbmcgc3RyaW5nLlxuICAgICAgICAgICAgdGVtcGxhdGU6IGRlZmF1bHRGb3JtYXRUZW1wbGF0ZSxcblxuICAgICAgICAgICAgLy8gdXNlVG9Mb2NhbGVTdHJpbmdcbiAgICAgICAgICAgIC8vIFNldCB0aGlzIG9wdGlvbiB0byBgZmFsc2VgIHRvIGlnbm9yZSB0aGUgYHRvTG9jYWxlU3RyaW5nYCBmZWF0dXJlXG4gICAgICAgICAgICAvLyB0ZXN0IGFuZCBmb3JjZSB0aGUgdXNlIG9mIHRoZSBgZm9ybWF0TnVtYmVyYCBmYWxsYmFjayBmdW5jdGlvblxuICAgICAgICAgICAgLy8gaW5jbHVkZWQgaW4gdGhpcyBwbHVnaW4uXG4gICAgICAgICAgICB1c2VUb0xvY2FsZVN0cmluZzogdHJ1ZSxcblxuICAgICAgICAgICAgLy8gZm9ybWF0TnVtYmVyIGZhbGxiYWNrIG9wdGlvbnMuXG4gICAgICAgICAgICAvLyBXaGVuIGB0b0xvY2FsZVN0cmluZ2AgaXMgZGV0ZWN0ZWQgYW5kIHBhc3NlcyB0aGUgZmVhdHVyZSB0ZXN0LCB0aGVcbiAgICAgICAgICAgIC8vIGZvbGxvd2luZyBvcHRpb25zIHdpbGwgaGF2ZSBubyBlZmZlY3Q6IGB0b0xvY2FsZVN0cmluZ2Agd2lsbCBiZSB1c2VkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybWF0dGluZyBhbmQgdGhlIGdyb3VwaW5nIHNlcGFyYXRvciwgZGVjaW1hbCBzZXBhcmF0b3IsIGFuZFxuICAgICAgICAgICAgLy8gaW50ZWdlciBkaWdpdCBncm91cGluZyB3aWxsIGJlIGRldGVybWluZWQgYnkgdGhlIHVzZXIgbG9jYWxlLlxuXG4gICAgICAgICAgICAvLyBncm91cGluZ1NlcGFyYXRvclxuICAgICAgICAgICAgLy8gVGhlIGludGVnZXIgZGlnaXQgZ3JvdXBpbmcgc2VwYXJhdG9yIHVzZWQgd2hlbiB1c2luZyB0aGUgZmFsbGJhY2tcbiAgICAgICAgICAgIC8vIGZvcm1hdE51bWJlciBmdW5jdGlvbi5cbiAgICAgICAgICAgIGdyb3VwaW5nU2VwYXJhdG9yOiBcIixcIixcblxuICAgICAgICAgICAgLy8gZGVjaW1hbFNlcGFyYXRvclxuICAgICAgICAgICAgLy8gVGhlIGRlY2ltYWwgc2VwYXJhdG9yIHVzZWQgd2hlbiB1c2luZyB0aGUgZmFsbGJhY2sgZm9ybWF0TnVtYmVyXG4gICAgICAgICAgICAvLyBmdW5jdGlvbi5cbiAgICAgICAgICAgIGRlY2ltYWxTZXBhcmF0b3I6IFwiLlwiLFxuXG4gICAgICAgICAgICAvLyBncm91cGluZ1xuICAgICAgICAgICAgLy8gVGhlIGludGVnZXIgZGlnaXQgZ3JvdXBpbmcgdXNlZCB3aGVuIHVzaW5nIHRoZSBmYWxsYmFjayBmb3JtYXROdW1iZXJcbiAgICAgICAgICAgIC8vIGZ1bmN0aW9uLiBNdXN0IGJlIGFuIGFycmF5LiBUaGUgZGVmYXVsdCB2YWx1ZSBvZiBgWzNdYCBnaXZlcyB0aGVcbiAgICAgICAgICAgIC8vIHN0YW5kYXJkIDMtZGlnaXQgdGhvdXNhbmQvbWlsbGlvbi9iaWxsaW9uIGRpZ2l0IGdyb3VwaW5ncyBmb3IgdGhlXG4gICAgICAgICAgICAvLyBcImVuXCIgbG9jYWxlLiBTZXR0aW5nIHRoaXMgb3B0aW9uIHRvIGBbMywgMl1gIHdvdWxkIGdlbmVyYXRlIHRoZVxuICAgICAgICAgICAgLy8gdGhvdXNhbmQvbGFraC9jcm9yZSBkaWdpdCBncm91cGluZ3MgdXNlZCBpbiB0aGUgXCJlbi1JTlwiIGxvY2FsZS5cbiAgICAgICAgICAgIGdyb3VwaW5nOiBbM11cbiAgICAgICAgfTtcblxuICAgICAgICBjb250ZXh0LnVwZGF0ZUxvY2FsZSgnZW4nLCBlbmdMb2NhbGUpO1xuICAgIH1cblxuICAgIC8vIFJ1biBmZWF0dXJlIHRlc3RzIGZvciBgTnVtYmVyI3RvTG9jYWxlU3RyaW5nYC5cbiAgICB2YXIgdG9Mb2NhbGVTdHJpbmdGb3JtYXR0ZXIgPSBmdW5jdGlvbihudW1iZXIsIGxvY2FsZSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbnVtYmVyLnRvTG9jYWxlU3RyaW5nKGxvY2FsZSwgb3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHRvTG9jYWxlU3RyaW5nV29ya3MgPSB0b0xvY2FsZVN0cmluZ1N1cHBvcnRzTG9jYWxlcygpICYmIGZlYXR1cmVUZXN0Rm9ybWF0dGVyKHRvTG9jYWxlU3RyaW5nRm9ybWF0dGVyKTtcbiAgICB0b0xvY2FsZVN0cmluZ1JvdW5kaW5nV29ya3MgPSB0b0xvY2FsZVN0cmluZ1dvcmtzICYmIGZlYXR1cmVUZXN0Rm9ybWF0dGVyUm91bmRpbmcodG9Mb2NhbGVTdHJpbmdGb3JtYXR0ZXIpO1xuXG4gICAgLy8gUnVuIGZlYXR1cmUgdGVzdHMgZm9yIGBJbnRsLk51bWJlckZvcm1hdCNmb3JtYXRgLlxuICAgIHZhciBpbnRsTnVtYmVyRm9ybWF0Rm9ybWF0dGVyID0gZnVuY3Rpb24obnVtYmVyLCBsb2NhbGUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdyAmJiB3aW5kb3cuSW50bCAmJiB3aW5kb3cuSW50bC5OdW1iZXJGb3JtYXQpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuSW50bC5OdW1iZXJGb3JtYXQobG9jYWxlLCBvcHRpb25zKS5mb3JtYXQobnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBpbnRsTnVtYmVyRm9ybWF0V29ya3MgPSBmZWF0dXJlVGVzdEZvcm1hdHRlcihpbnRsTnVtYmVyRm9ybWF0Rm9ybWF0dGVyKTtcbiAgICBpbnRsTnVtYmVyRm9ybWF0Um91bmRpbmdXb3JrcyA9IGludGxOdW1iZXJGb3JtYXRXb3JrcyAmJiBmZWF0dXJlVGVzdEZvcm1hdHRlclJvdW5kaW5nKGludGxOdW1iZXJGb3JtYXRGb3JtYXR0ZXIpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBkdXJhdGlvbiBmb3JtYXQgb24gdGhlIGdsb2JhbCBtb21lbnQgaW5zdGFuY2UuXG4gICAgaW5pdChtb21lbnQpO1xuXG4gICAgLy8gUmV0dXJuIHRoZSBpbml0IGZ1bmN0aW9uIHNvIHRoYXQgZHVyYXRpb24gZm9ybWF0IGNhbiBiZVxuICAgIC8vIGluaXRpYWxpemVkIG9uIG90aGVyIG1vbWVudCBpbnN0YW5jZXMuXG4gICAgcmV0dXJuIGluaXQ7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgX19ERVZfXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKF9fREVWX18pIHtcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDEgPyBsZW4gLSAxIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMTsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAxXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgK1xuICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH1cblxuICB3YXJuaW5nID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDIgPyBsZW4gLSAyIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMjsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAyXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXG4gICAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KG51bGwsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImxvZGFzaFwiXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcIm1vbWVudFwiXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImVlanNcIl1bXCJoZWxwZXJzXCJdOyIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wiZWVqc1wiXVtcImkxOG5cIl07IiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJlZWpzXCJdW1widmFsaWRhdG9yc1wiXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImVlanNcIl1bXCJ2ZW5kb3JcIl1bXCJtb21lbnRcIl07IiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJlZWpzXCJdOyIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wid3BcIl1bXCJpc1NoYWxsb3dFcXVhbFwiXTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBNb25leSB9IGZyb20gJy4vbW9uZXknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTaXRlQ3VycmVuY3ksIEN1cnJlbmN5IH0gZnJvbSAnLi9jdXJyZW5jeSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIExhYmVsIH0gZnJvbSAnLi9sYWJlbCc7XG5leHBvcnQgeyBEYXRlVGltZSwgRHVyYXRpb24sIFNlcnZlckRhdGVUaW1lIH0gZnJvbSAnLi9kYXRlLXRpbWUnO1xuIl0sIm5hbWVzIjpbImlzRW1wdHkiLCJpc1N0cmluZyIsImlzTnVtYmVyIiwiaXNCb29sZWFuIiwiaXNVbmRlZmluZWQiLCJFeGNlcHRpb24iLCJDVVJSRU5DWV9DT05GSUciLCJ3YXJuaW5nIiwiQ3VycmVuY3kiLCJjb25zdHJ1Y3RvciIsImN1cnJlbmN5Q29uZmlnIiwidmFsaWRhdGVDdXJyZW5jeUNvbmZpZyIsImRpc3BsYXlOYW1lIiwiY29kZSIsInNpbmd1bGFyTGFiZWwiLCJwbHVyYWxMYWJlbCIsInNpZ24iLCJzaWduQjQiLCJkZWNpbWFsUGxhY2VzIiwiZGVjaW1hbE1hcmsiLCJ0aG91c2FuZHNTZXBhcmF0b3IiLCJzdWJ1bml0cyIsIk1hdGgiLCJwb3ciLCJPYmplY3QiLCJmcmVlemUiLCJ0b0FjY291bnRpbmdTZXR0aW5ncyIsImRlY2ltYWxJbmZvIiwiZGVjaW1hbCIsInRob3VzYW5kIiwicHJlY2lzaW9uIiwiY3VycmVuY3kiLCJzeW1ib2wiLCJmb3JtYXQiLCJwb3MiLCJuZWciLCJ6ZXJvIiwibnVtYmVyIiwidG9KU09OIiwiY29uZmlnIiwiVHlwZUVycm9yIiwiU2l0ZUN1cnJlbmN5IiwiZSIsIm1lc3NhZ2UiLCJtb21lbnQiLCJJbnZhbGlkVGltZXpvbmUiLCJJbnZhbGlkSVNPODYwMVN0cmluZyIsIkludmFsaWRMb2NhbGUiLCJ2YWxpZGF0ZUxvY2FsZSIsImxvY2FsZSIsIm9yaWdpbmFsTG9jYWxlIiwidmFsaWRhdGlvbkxvY2FsZSIsImFzc2VydExvY2FsZUlzVmFsaWQiLCJ2YWxpZGF0ZUlTTzg2MDEiLCJkYXRlVGltZVN0cmluZyIsImlzRHVyYXRpb24iLCJyZWdleCIsInRlc3QiLCJhc3NlcnRJU084NjAxSXNWYWxpZCIsInZhbGlkYXRlVGltZXpvbmUiLCJ0aW1lem9uZSIsImR0IiwidHoiLCJ6b25lIiwiYXNzZXJ0VGltZXpvbmVJc1ZhbGlkIiwidmFsaWRhdGVJc0RhdGUiLCJkYXRlIiwiRGF0ZSIsImFzc2VydElzRGF0ZSIsInZhbGlkYXRlSXNPZmZzZXQiLCJvZmZzZXQiLCJhc3NlcnRJc09mZnNldCIsImNhcGl0YWxpemUiLCJvbWl0IiwicmVkdWNlIiwiaXNPYmplY3QiLCJpc0Z1bmN0aW9uIiwiaW5zdGFuY2VPZiIsIkludmFsaWREYXRlVGltZSIsIkludmFsaWRBcmd1bWVudCIsImFzc2VydGlvbnMiLCJEdXJhdGlvbiIsIkRFRkFVTFRfVElNRVpPTkVfU1RSSU5HIiwiREVGQVVMVF9PRkZTRVQiLCJERUZBVUxUX1ZBTElEX0xPQ0FMRSIsIkRFRkFVTFRfRk9STUFUIiwicHJpdmF0ZVByb3BlcnRpZXMiLCJkYXRldGltZSIsIlN5bWJvbCIsInByaXZhdGVNZXRob2RzIiwiZ2V0VW5pdE5hbWVzIiwiY3JlYXRlR2V0dGVyc0FuZFNldHRlcnMiLCJleHRyYWN0TW9tZW50c0Zyb21EYXRlVGltZXMiLCJub3JtYWxpemVVbml0TmFtZSIsIm5vcm1hbGl6ZVVuaXRPYmplY3QiLCJub3JtYWxpemVVbml0VmFsdWUiLCJub3JtYWxpemVBcmd1bWVudHMiLCJ2YWxpZERhdGVUaW1lVW5pdHMiLCJEYXRlVGltZSIsImlzbzg2MDFEYXRlU3RyaW5nIiwidXRjIiwidXRjT2Zmc2V0IiwiVElNRVpPTkVfTE9DQUwiLCJ2YWxpZGF0ZUlzRGF0ZVRpbWUiLCJhc3NlcnRJc0RhdGVUaW1lIiwiaXNWYWxpZCIsImFzc2VydElzVmFsaWQiLCJkYXRlVmFsdWUiLCJkYXRldGltZXMiLCJtYXAiLCJtYXgiLCJmcm9tTW9tZW50IiwibWluIiwibW9tZW50SW5zdGFuY2UiLCJpc01vbWVudCIsInRvSVNPU3RyaW5nIiwiZnJvbUlTTyIsIklTT1N0cmluZyIsImZyb21JU09XaXRoT2Zmc2V0IiwiZnJvbUpTRGF0ZSIsImZyb21KU0RhdGVXaXRoT2Zmc2V0IiwiZnJvbU1pbGxpc2Vjb25kcyIsIm1pbGxpc2Vjb25kcyIsImZyb21Vbml4Iiwic2Vjb25kcyIsInVuaXgiLCJmcm9tTG9jYWwiLCJ2YWx1ZXMiLCJmcm9tT2JqZWN0IiwidmFsdWVzRm9yQ29uc3RydWN0IiwibmFtZVRvTm9ybWFsaXplIiwiZGF5IiwiZGF5cyIsInllYXJzIiwibW9udGhzIiwibWludXRlcyIsImhvdXJzIiwidW5pdCIsInZhbHVlIiwic2V0Iiwic2V0T2JqZWN0IiwicmVzdWx0Iiwia2V5IiwiZm9yRWFjaCIsInVuaXROYW1lIiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJtZXRob2ROYW1lIiwidW5pdFZhbHVlIiwiY2xvbmUiLCJzZXRUaW1lem9uZSIsImRheXNJbk1vbnRoIiwiaXNJbkRTVCIsImlzRFNUIiwiaXNJbkxlYXBZZWFyIiwiaXNMZWFwWWVhciIsInNldE9mZnNldCIsImRheU9mWWVhciIsInF1YXJ0ZXIiLCJpc29XZWVrTnVtYmVyIiwiaXNvV2VlayIsImlzb1dlZWtZZWFyIiwiaXNvV2Vla0RheSIsImlzb1dlZWtkYXkiLCJpc29XZWVrc0luV2Vla1llYXIiLCJpc29XZWVrc0luWWVhciIsInNldExvY2FsZSIsImRpZmYiLCJvdGhlckRhdGVUaW1lIiwiZHVyYXRpb24iLCJkaWZmTm93IiwiZW5kT2YiLCJlcXVhbHMiLCJpc1NhbWUiLCJoYXNTYW1lIiwibWludXMiLCJhc3NlcnRJc1ZhbGlkRHVyYXRpb24iLCJzdWJ0cmFjdCIsInRvT2JqZWN0IiwicGx1cyIsImFkZCIsInN0YXJ0T2YiLCJ0b0Zvcm1hdCIsInRvSVNPIiwiaW5VVEMiLCJ0b0pTRGF0ZSIsInRvRGF0ZSIsInRvTG9jYWwiLCJsb2NhbCIsInRvTWlsbGlzIiwidmFsdWVPZiIsInRvVVRDIiwidG9TdHJpbmciLCJVTklUX1lFQVIiLCJVTklUX01PTlRIIiwiVU5JVF9EQVkiLCJVTklUX0hPVVIiLCJVTklUX01JTlVURSIsIlVOSVRfU0VDT05EIiwiVU5JVF9NSUxMSVNFQ09ORCIsIlRJTUVaT05FX0NPTkZJRyIsIlNFUlZFUl9MT0NBTEUiLCJGT1JNQVRfU0lURV9EQVRFIiwiRk9STUFUX1NJVEVfVElNRSIsInNuYWtlQ2FzZSIsInN0cmluZyIsIkhBU19USU1FWk9ORV9TVFJJTkciLCJERUZBVUxUX0xPQ0FMRSIsInVzZXIiLCJtb21lbnREdXJhdGlvbkZvcm1hdFNldHVwIiwicGljayIsImtleXMiLCJtYXBWYWx1ZXMiLCJpc1NoYWxsb3dFcXVhbCIsImR1cmF0aW9uVmFsdWVzIiwiY3JlYXRlR2V0dGVycyIsImdldEFsbFVuaXROYW1lcyIsInBvcHVsYXRlVmFsdWVzRnJvbUR1cmF0aW9uIiwic2V0VmFsdWVzIiwiZmlsdGVyVmFsdWVzIiwidW5pdE5hbWVzIiwiZGVyaXZhdGl2ZVVuaXROYW1lcyIsImlzVmFsaWRMb2NhbGUiLCJhc3NlcnRJc1ZhbGlkTG9jYWxlIiwiaXNWYWxpZElTTzg2MDFEdXJhdGlvbiIsImlzb1N0cmluZyIsImFzc2VydElzVmFsaWRJU084NjAxRHVyYXRpb24iLCJpc1ZhbGlkRHVyYXRpb24iLCJhc3NlcnRJc0R1cmF0aW9uIiwidmFsdWVzVG9TZXQiLCJqb2luIiwiYWNjZXNzb3JOYW1lIiwiaW5kZXhPZiIsImFzTWV0aG9kTmFtZSIsIm5vcm1hbGl6ZSIsInNhbWVBcyIsIm90aGVyRHVyYXRpb24iLCJuZWdhdGUiLCJhc01pbGxpc2Vjb25kcyIsImRlZmF1bHQiLCJTZXJ2ZXJEYXRlVGltZSIsInN0YXJ0Q2FzZSIsIkxhYmVsIiwic2luZ3VsYXIiLCJwbHVyYWwiLCJzZXRTaW5ndWxhciIsInNldFBsdXJhbCIsImFzc2VydFN0cmluZyIsImFzU2VudGVuY2VDYXNlIiwidG9Mb3dlckNhc2UiLCJhc0xvd2VyQ2FzZSIsImFzVXBwZXJDYXNlIiwidG9VcHBlckNhc2UiLCJhc0Zvcm1hdHRlZCIsImZvcm1hdFR5cGUiLCJGT1JNQVRfU0VOVEVOQ0VfQ0FTRSIsIkZPUk1BVF9MT1dFUkNBU0UiLCJGT1JNQVRfVVBQRVJDQVNFIiwibGFiZWwiLCJEZWNpbWFsIiwiQWNjb3VudGluZyIsInNwcmludGYiLCJhc3NlcnRNb25leSIsIm1vbmV5IiwiSlNPTiIsInN0cmluZ2lmeSIsImFzc2VydEN1cnJlbmN5IiwiYXNzZXJ0U2FtZUN1cnJlbmN5IiwiY3VycmVuY3lBIiwiY3VycmVuY3lCIiwiTW9uZXkiLCJhbW91bnQiLCJzZXRDdXJyZW5jeSIsInNldEFtb3VudCIsInNldEZvcm1hdHRlciIsInRvTnVtYmVyIiwiZm9ybWF0dGVyIiwic2V0dGluZ3MiLCJ0b1N1YnVuaXRzIiwib3RoZXIiLCJoYXNTYW1lQ3VycmVuY3kiLCJhc3NlcnRVc2luZ1NhbWVDdXJyZW5jeSIsIm11bHRpcGx5IiwibXVsdGlwbGllciIsInRpbWVzIiwiZGl2aWRlIiwiZGl2aXNvciIsImRpdmlkZWRCeSIsImFsbG9jYXRlIiwicmF0aW9zIiwic2VsZiIsInJlc3VsdHMiLCJjb252ZXJ0ZWRSYXRpb3MiLCJyZW1haW5kZXIiLCJ0b3RhbCIsInJhdGlvIiwicHVzaCIsInNoYXJlIiwiZmxvb3IiLCJpIiwiZ3JlYXRlclRoYW4iLCJjb21wYXJlIiwiY29tcGFyZWRUbyIsImdyZWF0ZXJUaGFuT3JFcXVhbFRvIiwibGVzc1RoYW4iLCJsZXNzVGhhbk9yRXF1YWxUbyIsImlzWmVybyIsImlzTmVnYXRpdmUiLCJpc1Bvc2l0aXZlIiwidG9GaXhlZCIsInJvdW5kaW5nIiwiUk9VTkRfSEFMRl9VUCIsInRvSW50ZWdlck1vbmV5IiwidG9JbnRlZ2VyIiwiUk9VTkRfVVAiLCJST1VORF9ET1dOIiwiUk9VTkRfQ0VJTCIsIlJPVU5EX0ZMT09SIiwiUk9VTkRfSEFMRl9ET1dOIiwiUk9VTkRfSEFMRl9FVkVOIiwidGhpc01vbmV5Iiwib3RoZXJNb25leSIsIm1vbmV5VmFsdWUiLCJtYXRjaCIsImxlbmd0aCIsIkVycm9yIiwicGFyc2UiXSwic291cmNlUm9vdCI6IiJ9
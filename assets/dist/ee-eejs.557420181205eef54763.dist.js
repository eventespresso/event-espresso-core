this["eejs"] =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/eejs/index.js":
/*!**********************************!*\
  !*** ./assets/src/eejs/index.js ***!
  \**********************************/
/*! exports provided: data, i18n, exception */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "data", function() { return data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i18n", function() { return i18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exception", function() { return exception; });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/**
 * WordPress imports
 */


/**
 * Exported to the `eejs` global.
 */

/**
 * This will hold arbitrary data assigned by the Assets Registry.
 * @type {{}}
 */
var data = eejsdata.data || {};

/**
 * Wrapper around wp.i18n functionality so its exposed on the eejs global as
 * eejs.i18n;
 */
var i18n = _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__;

/**
 * use this for eejs exceptions
 * Usage: throw new eejs.exception('some message')
 * @param {string} msg
 */
var exception = function exception(msg) {
  this.message = msg;
};

/***/ }),

/***/ "./node_modules/@wordpress/i18n/build-module/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/build-module/index.js ***!
  \************************************************************/
/*! exports provided: setLocaleData, getI18n, dcnpgettext, __, _x, _n, _nx, sprintf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLocaleData", function() { return setLocaleData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getI18n", function() { return getI18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dcnpgettext", function() { return dcnpgettext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__", function() { return __; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_x", function() { return _x; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_n", function() { return _n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_nx", function() { return _nx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sprintf", function() { return sprintf; });
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "./node_modules/babel-runtime/core-js/object/assign.js");
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jed */ "./node_modules/jed/jed.js");
/* harmony import */ var jed__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jed__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! memize */ "./node_modules/memize/index.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(memize__WEBPACK_IMPORTED_MODULE_2__);

/**
 * External dependencies
 */



var i18n = void 0;

/**
 * Log to console, once per message; or more precisely, per referentially equal
 * argument set. Because Jed throws errors, we log these to the console instead
 * to avoid crashing the application.
 *
 * @param {...*} args Arguments to pass to `console.error`
 */
var logErrorOnce = memize__WEBPACK_IMPORTED_MODULE_2___default()(console.error); // eslint-disable-line no-console

/**
 * Merges locale data into the Jed instance by domain. Creates a new Jed
 * instance if one has not yet been assigned.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @param {?Object} localeData Locale data configuration.
 * @param {?string} domain     Domain for which configuration applies.
 */
function setLocaleData() {
  var localeData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { '': {} };
  var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';

  if (!i18n) {
    i18n = new jed__WEBPACK_IMPORTED_MODULE_1___default.a({
      domain: 'default',
      locale_data: {
        default: {}
      }
    });
  }

  i18n.options.locale_data[domain] = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, i18n.options.locale_data[domain], localeData);
}

/**
 * Returns the current Jed instance, initializing with a default configuration
 * if not already assigned.
 *
 * @return {Jed} Jed instance.
 */
function getI18n() {
  if (!i18n) {
    setLocaleData();
  }

  return i18n;
}

/**
 * Wrapper for Jed's `dcnpgettext`, its most qualified function. Absorbs errors
 * which are thrown as the result of invalid translation.
 *
 * @param {?string} domain  Domain to retrieve the translated text.
 * @param {?string} context Context information for the translators.
 * @param {string}  single  Text to translate if non-plural. Used as fallback
 *                          return value on a caught error.
 * @param {?string} plural  The text to be used if the number is plural.
 * @param {?number} number  The number to compare against to use either the
 *                          singular or plural form.
 *
 * @return {string} The translated string.
 */
var dcnpgettext = memize__WEBPACK_IMPORTED_MODULE_2___default()(function () {
  var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
  var context = arguments[1];
  var single = arguments[2];
  var plural = arguments[3];
  var number = arguments[4];

  try {
    return getI18n().dcnpgettext(domain, context, single, plural, number);
  } catch (error) {
    logErrorOnce('Jed localization error: \n\n' + error.toString());

    return single;
  }
});

/**
 * Retrieve the translation of text.
 *
 * @see https://developer.wordpress.org/reference/functions/__/
 *
 * @param {string}  text   Text to translate.
 * @param {?string} domain Domain to retrieve the translated text.
 *
 * @return {string} Translated text.
 */
function __(text, domain) {
  return dcnpgettext(domain, undefined, text);
}

/**
 * Retrieve translated string with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_x/
 *
 * @param {string}  text    Text to translate.
 * @param {string}  context Context information for the translators.
 * @param {?string} domain  Domain to retrieve the translated text.
 *
 * @return {string} Translated context string without pipe.
 */
function _x(text, context, domain) {
  return dcnpgettext(domain, context, text);
}

/**
 * Translates and retrieves the singular or plural form based on the supplied
 * number.
 *
 * @see https://developer.wordpress.org/reference/functions/_n/
 *
 * @param {string}  single The text to be used if the number is singular.
 * @param {string}  plural The text to be used if the number is plural.
 * @param {number}  number The number to compare against to use either the
 *                         singular or plural form.
 * @param {?string} domain Domain to retrieve the translated text.
 *
 * @return {string} The translated singular or plural form.
 */
function _n(single, plural, number, domain) {
  return dcnpgettext(domain, undefined, single, plural, number);
}

/**
 * Translates and retrieves the singular or plural form based on the supplied
 * number, with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_nx/
 *
 * @param {string}  single  The text to be used if the number is singular.
 * @param {string}  plural  The text to be used if the number is plural.
 * @param {number}  number  The number to compare against to use either the
 *                          singular or plural form.
 * @param {string}  context Context information for the translators.
 * @param {?string} domain  Domain to retrieve the translated text.
 *
 * @return {string} The translated singular or plural form.
 */
function _nx(single, plural, number, context, domain) {
  return dcnpgettext(domain, context, single, plural, number);
}

/**
 * Returns a formatted string. If an error occurs in applying the format, the
 * original format string is returned.
 *
 * @param {string}   format  The format of the string to generate.
 * @param {string[]} ...args Arguments to apply to the format.
 *
 * @see http://www.diveintojavascript.com/projects/javascript-sprintf
 *
 * @return {string} The formatted string.
 */
function sprintf(format) {
  try {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return jed__WEBPACK_IMPORTED_MODULE_1___default.a.sprintf.apply(jed__WEBPACK_IMPORTED_MODULE_1___default.a, [format].concat(args));
  } catch (error) {
    logErrorOnce('Jed sprintf error: \n\n' + error.toString());

    return format;
  }
}

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/assign.js":
/*!*************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/assign.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/assign */ "./node_modules/core-js/library/fn/object/assign.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/core-js/library/fn/object/assign.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/assign.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.assign */ "./node_modules/core-js/library/modules/es6.object.assign.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object.assign;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_a-function.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_a-function.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_an-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_an-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_array-includes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_array-includes.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/library/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/library/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_cof.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_cof.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_core.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_core.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.6' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/library/modules/_ctx.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ctx.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/library/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_defined.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_defined.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_descriptors.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_descriptors.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/_dom-create.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_dom-create.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_enum-bug-keys.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_enum-bug-keys.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/library/modules/_export.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_export.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_fails.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_fails.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_global.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_global.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/library/modules/_has.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_has.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_hide.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_hide.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_ie8-dom-define.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ie8-dom-define.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/library/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iobject.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iobject.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/library/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_library.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_library.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-assign.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-assign.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/library/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/library/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/library/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/library/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/library/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-dp.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dp.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/library/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/library/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gops.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gops.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-keys-internal.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-keys-internal.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/library/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-keys.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-keys.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/library/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/library/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-pie.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-pie.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_property-desc.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_property-desc.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_shared-key.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_shared-key.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/library/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/library/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_shared.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_shared.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/library/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-absolute-index.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-absolute-index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/library/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-integer.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-integer.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-iobject.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-iobject.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/library/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-length.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-length.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/library/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-primitive.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-primitive.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_uid.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_uid.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.assign.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.assign.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/library/modules/_object-assign.js") });


/***/ }),

/***/ "./node_modules/jed/jed.js":
/*!*********************************!*\
  !*** ./node_modules/jed/jed.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @preserve jed.js https://github.com/SlexAxton/Jed
 */
/*
-----------
A gettext compatible i18n library for modern JavaScript Applications

by Alex Sexton - AlexSexton [at] gmail - @SlexAxton

MIT License

A jQuery Foundation project - requires CLA to contribute -
https://contribute.jquery.org/CLA/



Jed offers the entire applicable GNU gettext spec'd set of
functions, but also offers some nicer wrappers around them.
The api for gettext was written for a language with no function
overloading, so Jed allows a little more of that.

Many thanks to Joshua I. Miller - unrtst@cpan.org - who wrote
gettext.js back in 2008. I was able to vet a lot of my ideas
against his. I also made sure Jed passed against his tests
in order to offer easy upgrades -- jsgettext.berlios.de
*/
(function (root, undef) {

  // Set up some underscore-style functions, if you already have
  // underscore, feel free to delete this section, and use it
  // directly, however, the amount of functions used doesn't
  // warrant having underscore as a full dependency.
  // Underscore 1.3.0 was used to port and is licensed
  // under the MIT License by Jeremy Ashkenas.
  var ArrayProto    = Array.prototype,
      ObjProto      = Object.prototype,
      slice         = ArrayProto.slice,
      hasOwnProp    = ObjProto.hasOwnProperty,
      nativeForEach = ArrayProto.forEach,
      breaker       = {};

  // We're not using the OOP style _ so we don't need the
  // extra level of indirection. This still means that you
  // sub out for real `_` though.
  var _ = {
    forEach : function( obj, iterator, context ) {
      var i, l, key;
      if ( obj === null ) {
        return;
      }

      if ( nativeForEach && obj.forEach === nativeForEach ) {
        obj.forEach( iterator, context );
      }
      else if ( obj.length === +obj.length ) {
        for ( i = 0, l = obj.length; i < l; i++ ) {
          if ( i in obj && iterator.call( context, obj[i], i, obj ) === breaker ) {
            return;
          }
        }
      }
      else {
        for ( key in obj) {
          if ( hasOwnProp.call( obj, key ) ) {
            if ( iterator.call (context, obj[key], key, obj ) === breaker ) {
              return;
            }
          }
        }
      }
    },
    extend : function( obj ) {
      this.forEach( slice.call( arguments, 1 ), function ( source ) {
        for ( var prop in source ) {
          obj[prop] = source[prop];
        }
      });
      return obj;
    }
  };
  // END Miniature underscore impl

  // Jed is a constructor function
  var Jed = function ( options ) {
    // Some minimal defaults
    this.defaults = {
      "locale_data" : {
        "messages" : {
          "" : {
            "domain"       : "messages",
            "lang"         : "en",
            "plural_forms" : "nplurals=2; plural=(n != 1);"
          }
          // There are no default keys, though
        }
      },
      // The default domain if one is missing
      "domain" : "messages",
      // enable debug mode to log untranslated strings to the console
      "debug" : false
    };

    // Mix in the sent options with the default options
    this.options = _.extend( {}, this.defaults, options );
    this.textdomain( this.options.domain );

    if ( options.domain && ! this.options.locale_data[ this.options.domain ] ) {
      throw new Error('Text domain set to non-existent domain: `' + options.domain + '`');
    }
  };

  // The gettext spec sets this character as the default
  // delimiter for context lookups.
  // e.g.: context\u0004key
  // If your translation company uses something different,
  // just change this at any time and it will use that instead.
  Jed.context_delimiter = String.fromCharCode( 4 );

  function getPluralFormFunc ( plural_form_string ) {
    return Jed.PF.compile( plural_form_string || "nplurals=2; plural=(n != 1);");
  }

  function Chain( key, i18n ){
    this._key = key;
    this._i18n = i18n;
  }

  // Create a chainable api for adding args prettily
  _.extend( Chain.prototype, {
    onDomain : function ( domain ) {
      this._domain = domain;
      return this;
    },
    withContext : function ( context ) {
      this._context = context;
      return this;
    },
    ifPlural : function ( num, pkey ) {
      this._val = num;
      this._pkey = pkey;
      return this;
    },
    fetch : function ( sArr ) {
      if ( {}.toString.call( sArr ) != '[object Array]' ) {
        sArr = [].slice.call(arguments, 0);
      }
      return ( sArr && sArr.length ? Jed.sprintf : function(x){ return x; } )(
        this._i18n.dcnpgettext(this._domain, this._context, this._key, this._pkey, this._val),
        sArr
      );
    }
  });

  // Add functions to the Jed prototype.
  // These will be the functions on the object that's returned
  // from creating a `new Jed()`
  // These seem redundant, but they gzip pretty well.
  _.extend( Jed.prototype, {
    // The sexier api start point
    translate : function ( key ) {
      return new Chain( key, this );
    },

    textdomain : function ( domain ) {
      if ( ! domain ) {
        return this._textdomain;
      }
      this._textdomain = domain;
    },

    gettext : function ( key ) {
      return this.dcnpgettext.call( this, undef, undef, key );
    },

    dgettext : function ( domain, key ) {
     return this.dcnpgettext.call( this, domain, undef, key );
    },

    dcgettext : function ( domain , key /*, category */ ) {
      // Ignores the category anyways
      return this.dcnpgettext.call( this, domain, undef, key );
    },

    ngettext : function ( skey, pkey, val ) {
      return this.dcnpgettext.call( this, undef, undef, skey, pkey, val );
    },

    dngettext : function ( domain, skey, pkey, val ) {
      return this.dcnpgettext.call( this, domain, undef, skey, pkey, val );
    },

    dcngettext : function ( domain, skey, pkey, val/*, category */) {
      return this.dcnpgettext.call( this, domain, undef, skey, pkey, val );
    },

    pgettext : function ( context, key ) {
      return this.dcnpgettext.call( this, undef, context, key );
    },

    dpgettext : function ( domain, context, key ) {
      return this.dcnpgettext.call( this, domain, context, key );
    },

    dcpgettext : function ( domain, context, key/*, category */) {
      return this.dcnpgettext.call( this, domain, context, key );
    },

    npgettext : function ( context, skey, pkey, val ) {
      return this.dcnpgettext.call( this, undef, context, skey, pkey, val );
    },

    dnpgettext : function ( domain, context, skey, pkey, val ) {
      return this.dcnpgettext.call( this, domain, context, skey, pkey, val );
    },

    // The most fully qualified gettext function. It has every option.
    // Since it has every option, we can use it from every other method.
    // This is the bread and butter.
    // Technically there should be one more argument in this function for 'Category',
    // but since we never use it, we might as well not waste the bytes to define it.
    dcnpgettext : function ( domain, context, singular_key, plural_key, val ) {
      // Set some defaults

      plural_key = plural_key || singular_key;

      // Use the global domain default if one
      // isn't explicitly passed in
      domain = domain || this._textdomain;

      var fallback;

      // Handle special cases

      // No options found
      if ( ! this.options ) {
        // There's likely something wrong, but we'll return the correct key for english
        // We do this by instantiating a brand new Jed instance with the default set
        // for everything that could be broken.
        fallback = new Jed();
        return fallback.dcnpgettext.call( fallback, undefined, undefined, singular_key, plural_key, val );
      }

      // No translation data provided
      if ( ! this.options.locale_data ) {
        throw new Error('No locale data provided.');
      }

      if ( ! this.options.locale_data[ domain ] ) {
        throw new Error('Domain `' + domain + '` was not found.');
      }

      if ( ! this.options.locale_data[ domain ][ "" ] ) {
        throw new Error('No locale meta information provided.');
      }

      // Make sure we have a truthy key. Otherwise we might start looking
      // into the empty string key, which is the options for the locale
      // data.
      if ( ! singular_key ) {
        throw new Error('No translation key found.');
      }

      var key  = context ? context + Jed.context_delimiter + singular_key : singular_key,
          locale_data = this.options.locale_data,
          dict = locale_data[ domain ],
          defaultConf = (locale_data.messages || this.defaults.locale_data.messages)[""],
          pluralForms = dict[""].plural_forms || dict[""]["Plural-Forms"] || dict[""]["plural-forms"] || defaultConf.plural_forms || defaultConf["Plural-Forms"] || defaultConf["plural-forms"],
          val_list,
          res;

      var val_idx;
      if (val === undefined) {
        // No value passed in; assume singular key lookup.
        val_idx = 0;

      } else {
        // Value has been passed in; use plural-forms calculations.

        // Handle invalid numbers, but try casting strings for good measure
        if ( typeof val != 'number' ) {
          val = parseInt( val, 10 );

          if ( isNaN( val ) ) {
            throw new Error('The number that was passed in is not a number.');
          }
        }

        val_idx = getPluralFormFunc(pluralForms)(val);
      }

      // Throw an error if a domain isn't found
      if ( ! dict ) {
        throw new Error('No domain named `' + domain + '` could be found.');
      }

      val_list = dict[ key ];

      // If there is no match, then revert back to
      // english style singular/plural with the keys passed in.
      if ( ! val_list || val_idx > val_list.length ) {
        if (this.options.missing_key_callback) {
          this.options.missing_key_callback(key, domain);
        }
        res = [ singular_key, plural_key ];

        // collect untranslated strings
        if (this.options.debug===true) {
          console.log(res[ getPluralFormFunc(pluralForms)( val ) ]);
        }
        return res[ getPluralFormFunc()( val ) ];
      }

      res = val_list[ val_idx ];

      // This includes empty strings on purpose
      if ( ! res  ) {
        res = [ singular_key, plural_key ];
        return res[ getPluralFormFunc()( val ) ];
      }
      return res;
    }
  });


  // We add in sprintf capabilities for post translation value interolation
  // This is not internally used, so you can remove it if you have this
  // available somewhere else, or want to use a different system.

  // We _slightly_ modify the normal sprintf behavior to more gracefully handle
  // undefined values.

  /**
   sprintf() for JavaScript 0.7-beta1
   http://www.diveintojavascript.com/projects/javascript-sprintf

   Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:
       * Redistributions of source code must retain the above copyright
         notice, this list of conditions and the following disclaimer.
       * Redistributions in binary form must reproduce the above copyright
         notice, this list of conditions and the following disclaimer in the
         documentation and/or other materials provided with the distribution.
       * Neither the name of sprintf() for JavaScript nor the
         names of its contributors may be used to endorse or promote products
         derived from this software without specific prior written permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
   DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
   (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
   LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
   ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  */
  var sprintf = (function() {
    function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }
    function str_repeat(input, multiplier) {
      for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
      return output.join('');
    }

    var str_format = function() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }
      return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);
        if (node_type === 'string') {
          output.push(parse_tree[i]);
        }
        else if (node_type === 'array') {
          match = parse_tree[i]; // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
              }
              arg = arg[match[2][k]];
            }
          }
          else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]];
          }
          else { // positional argument (implicit)
            arg = argv[cursor++];
          }

          if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
            throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
          }

          // Jed EDIT
          if ( typeof arg == 'undefined' || arg === null ) {
            arg = '';
          }
          // Jed EDIT

          switch (match[8]) {
            case 'b': arg = arg.toString(2); break;
            case 'c': arg = String.fromCharCode(arg); break;
            case 'd': arg = parseInt(arg, 10); break;
            case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
            case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
            case 'o': arg = arg.toString(8); break;
            case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
            case 'u': arg = Math.abs(arg); break;
            case 'x': arg = arg.toString(16); break;
            case 'X': arg = arg.toString(16).toUpperCase(); break;
          }
          arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
          pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : '';
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }
      return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function(fmt) {
      var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        }
        else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push('%');
        }
        else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else {
                  throw('[sprintf] huh?');
                }
              }
            }
            else {
              throw('[sprintf] huh?');
            }
            match[2] = field_list;
          }
          else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
          }
          parse_tree.push(match);
        }
        else {
          throw('[sprintf] huh?');
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return parse_tree;
    };

    return str_format;
  })();

  var vsprintf = function(fmt, argv) {
    argv.unshift(fmt);
    return sprintf.apply(null, argv);
  };

  Jed.parse_plural = function ( plural_forms, n ) {
    plural_forms = plural_forms.replace(/n/g, n);
    return Jed.parse_expression(plural_forms);
  };

  Jed.sprintf = function ( fmt, args ) {
    if ( {}.toString.call( args ) == '[object Array]' ) {
      return vsprintf( fmt, [].slice.call(args) );
    }
    return sprintf.apply(this, [].slice.call(arguments) );
  };

  Jed.prototype.sprintf = function () {
    return Jed.sprintf.apply(this, arguments);
  };
  // END sprintf Implementation

  // Start the Plural forms section
  // This is a full plural form expression parser. It is used to avoid
  // running 'eval' or 'new Function' directly against the plural
  // forms.
  //
  // This can be important if you get translations done through a 3rd
  // party vendor. I encourage you to use this instead, however, I
  // also will provide a 'precompiler' that you can use at build time
  // to output valid/safe function representations of the plural form
  // expressions. This means you can build this code out for the most
  // part.
  Jed.PF = {};

  Jed.PF.parse = function ( p ) {
    var plural_str = Jed.PF.extractPluralExpr( p );
    return Jed.PF.parser.parse.call(Jed.PF.parser, plural_str);
  };

  Jed.PF.compile = function ( p ) {
    // Handle trues and falses as 0 and 1
    function imply( val ) {
      return (val === true ? 1 : val ? val : 0);
    }

    var ast = Jed.PF.parse( p );
    return function ( n ) {
      return imply( Jed.PF.interpreter( ast )( n ) );
    };
  };

  Jed.PF.interpreter = function ( ast ) {
    return function ( n ) {
      var res;
      switch ( ast.type ) {
        case 'GROUP':
          return Jed.PF.interpreter( ast.expr )( n );
        case 'TERNARY':
          if ( Jed.PF.interpreter( ast.expr )( n ) ) {
            return Jed.PF.interpreter( ast.truthy )( n );
          }
          return Jed.PF.interpreter( ast.falsey )( n );
        case 'OR':
          return Jed.PF.interpreter( ast.left )( n ) || Jed.PF.interpreter( ast.right )( n );
        case 'AND':
          return Jed.PF.interpreter( ast.left )( n ) && Jed.PF.interpreter( ast.right )( n );
        case 'LT':
          return Jed.PF.interpreter( ast.left )( n ) < Jed.PF.interpreter( ast.right )( n );
        case 'GT':
          return Jed.PF.interpreter( ast.left )( n ) > Jed.PF.interpreter( ast.right )( n );
        case 'LTE':
          return Jed.PF.interpreter( ast.left )( n ) <= Jed.PF.interpreter( ast.right )( n );
        case 'GTE':
          return Jed.PF.interpreter( ast.left )( n ) >= Jed.PF.interpreter( ast.right )( n );
        case 'EQ':
          return Jed.PF.interpreter( ast.left )( n ) == Jed.PF.interpreter( ast.right )( n );
        case 'NEQ':
          return Jed.PF.interpreter( ast.left )( n ) != Jed.PF.interpreter( ast.right )( n );
        case 'MOD':
          return Jed.PF.interpreter( ast.left )( n ) % Jed.PF.interpreter( ast.right )( n );
        case 'VAR':
          return n;
        case 'NUM':
          return ast.val;
        default:
          throw new Error("Invalid Token found.");
      }
    };
  };

  Jed.PF.extractPluralExpr = function ( p ) {
    // trim first
    p = p.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

    if (! /;\s*$/.test(p)) {
      p = p.concat(';');
    }

    var nplurals_re = /nplurals\=(\d+);/,
        plural_re = /plural\=(.*);/,
        nplurals_matches = p.match( nplurals_re ),
        res = {},
        plural_matches;

    // Find the nplurals number
    if ( nplurals_matches.length > 1 ) {
      res.nplurals = nplurals_matches[1];
    }
    else {
      throw new Error('nplurals not found in plural_forms string: ' + p );
    }

    // remove that data to get to the formula
    p = p.replace( nplurals_re, "" );
    plural_matches = p.match( plural_re );

    if (!( plural_matches && plural_matches.length > 1 ) ) {
      throw new Error('`plural` expression not found: ' + p);
    }
    return plural_matches[ 1 ];
  };

  /* Jison generated parser */
  Jed.PF.parser = (function(){

var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"e":4,"EOF":5,"?":6,":":7,"||":8,"&&":9,"<":10,"<=":11,">":12,">=":13,"!=":14,"==":15,"%":16,"(":17,")":18,"n":19,"NUMBER":20,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"?",7:":",8:"||",9:"&&",10:"<",11:"<=",12:">",13:">=",14:"!=",15:"==",16:"%",17:"(",18:")",19:"n",20:"NUMBER"},
productions_: [0,[3,2],[4,5],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,1],[4,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return { type : 'GROUP', expr: $$[$0-1] };
break;
case 2:this.$ = { type: 'TERNARY', expr: $$[$0-4], truthy : $$[$0-2], falsey: $$[$0] };
break;
case 3:this.$ = { type: "OR", left: $$[$0-2], right: $$[$0] };
break;
case 4:this.$ = { type: "AND", left: $$[$0-2], right: $$[$0] };
break;
case 5:this.$ = { type: 'LT', left: $$[$0-2], right: $$[$0] };
break;
case 6:this.$ = { type: 'LTE', left: $$[$0-2], right: $$[$0] };
break;
case 7:this.$ = { type: 'GT', left: $$[$0-2], right: $$[$0] };
break;
case 8:this.$ = { type: 'GTE', left: $$[$0-2], right: $$[$0] };
break;
case 9:this.$ = { type: 'NEQ', left: $$[$0-2], right: $$[$0] };
break;
case 10:this.$ = { type: 'EQ', left: $$[$0-2], right: $$[$0] };
break;
case 11:this.$ = { type: 'MOD', left: $$[$0-2], right: $$[$0] };
break;
case 12:this.$ = { type: 'GROUP', expr: $$[$0-1] };
break;
case 13:this.$ = { type: 'VAR' };
break;
case 14:this.$ = { type: 'NUM', val: Number(yytext) };
break;
}
},
table: [{3:1,4:2,17:[1,3],19:[1,4],20:[1,5]},{1:[3]},{5:[1,6],6:[1,7],8:[1,8],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16]},{4:17,17:[1,3],19:[1,4],20:[1,5]},{5:[2,13],6:[2,13],7:[2,13],8:[2,13],9:[2,13],10:[2,13],11:[2,13],12:[2,13],13:[2,13],14:[2,13],15:[2,13],16:[2,13],18:[2,13]},{5:[2,14],6:[2,14],7:[2,14],8:[2,14],9:[2,14],10:[2,14],11:[2,14],12:[2,14],13:[2,14],14:[2,14],15:[2,14],16:[2,14],18:[2,14]},{1:[2,1]},{4:18,17:[1,3],19:[1,4],20:[1,5]},{4:19,17:[1,3],19:[1,4],20:[1,5]},{4:20,17:[1,3],19:[1,4],20:[1,5]},{4:21,17:[1,3],19:[1,4],20:[1,5]},{4:22,17:[1,3],19:[1,4],20:[1,5]},{4:23,17:[1,3],19:[1,4],20:[1,5]},{4:24,17:[1,3],19:[1,4],20:[1,5]},{4:25,17:[1,3],19:[1,4],20:[1,5]},{4:26,17:[1,3],19:[1,4],20:[1,5]},{4:27,17:[1,3],19:[1,4],20:[1,5]},{6:[1,7],8:[1,8],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16],18:[1,28]},{6:[1,7],7:[1,29],8:[1,8],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16]},{5:[2,3],6:[2,3],7:[2,3],8:[2,3],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16],18:[2,3]},{5:[2,4],6:[2,4],7:[2,4],8:[2,4],9:[2,4],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16],18:[2,4]},{5:[2,5],6:[2,5],7:[2,5],8:[2,5],9:[2,5],10:[2,5],11:[2,5],12:[2,5],13:[2,5],14:[2,5],15:[2,5],16:[1,16],18:[2,5]},{5:[2,6],6:[2,6],7:[2,6],8:[2,6],9:[2,6],10:[2,6],11:[2,6],12:[2,6],13:[2,6],14:[2,6],15:[2,6],16:[1,16],18:[2,6]},{5:[2,7],6:[2,7],7:[2,7],8:[2,7],9:[2,7],10:[2,7],11:[2,7],12:[2,7],13:[2,7],14:[2,7],15:[2,7],16:[1,16],18:[2,7]},{5:[2,8],6:[2,8],7:[2,8],8:[2,8],9:[2,8],10:[2,8],11:[2,8],12:[2,8],13:[2,8],14:[2,8],15:[2,8],16:[1,16],18:[2,8]},{5:[2,9],6:[2,9],7:[2,9],8:[2,9],9:[2,9],10:[2,9],11:[2,9],12:[2,9],13:[2,9],14:[2,9],15:[2,9],16:[1,16],18:[2,9]},{5:[2,10],6:[2,10],7:[2,10],8:[2,10],9:[2,10],10:[2,10],11:[2,10],12:[2,10],13:[2,10],14:[2,10],15:[2,10],16:[1,16],18:[2,10]},{5:[2,11],6:[2,11],7:[2,11],8:[2,11],9:[2,11],10:[2,11],11:[2,11],12:[2,11],13:[2,11],14:[2,11],15:[2,11],16:[2,11],18:[2,11]},{5:[2,12],6:[2,12],7:[2,12],8:[2,12],9:[2,12],10:[2,12],11:[2,12],12:[2,12],13:[2,12],14:[2,12],15:[2,12],16:[2,12],18:[2,12]},{4:30,17:[1,3],19:[1,4],20:[1,5]},{5:[2,2],6:[1,7],7:[2,2],8:[1,8],9:[1,9],10:[1,10],11:[1,11],12:[1,12],13:[1,13],14:[1,14],15:[1,15],16:[1,16],18:[2,2]}],
defaultActions: {6:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){

var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 20
break;
case 2:return 19
break;
case 3:return 8
break;
case 4:return 9
break;
case 5:return 6
break;
case 6:return 7
break;
case 7:return 11
break;
case 8:return 13
break;
case 9:return 10
break;
case 10:return 12
break;
case 11:return 14
break;
case 12:return 15
break;
case 13:return 16
break;
case 14:return 17
break;
case 15:return 18
break;
case 16:return 5
break;
case 17:return 'INVALID'
break;
}
};
lexer.rules = [/^\s+/,/^[0-9]+(\.[0-9]+)?\b/,/^n\b/,/^\|\|/,/^&&/,/^\?/,/^:/,/^<=/,/^>=/,/^</,/^>/,/^!=/,/^==/,/^%/,/^\(/,/^\)/,/^$/,/^./];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
// End parser

  // Handle node, amd, and global systems
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Jed;
    }
    exports.Jed = Jed;
  }
  else {}

})(this);


/***/ }),

/***/ "./node_modules/memize/index.js":
/*!**************************************!*\
  !*** ./node_modules/memize/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function memize( fn, options ) {
	var size = 0,
		maxSize, head, tail;

	if ( options && options.maxSize ) {
		maxSize = options.maxSize;
	}

	function memoized( /* ...args */ ) {
		var node = head,
			len = arguments.length,
			args, i;

		searchCache: while ( node ) {
			// Perform a shallow equality test to confirm that whether the node
			// under test is a candidate for the arguments passed. Two arrays
			// are shallowly equal if their length matches and each entry is
			// strictly equal between the two sets. Avoid abstracting to a
			// function which could incur an arguments leaking deoptimization.

			// Check whether node arguments match arguments length
			if ( node.args.length !== arguments.length ) {
				node = node.next;
				continue;
			}

			// Check whether node arguments match arguments values
			for ( i = 0; i < len; i++ ) {
				if ( node.args[ i ] !== arguments[ i ] ) {
					node = node.next;
					continue searchCache;
				}
			}

			// At this point we can assume we've found a match

			// Surface matched node to head if not already
			if ( node !== head ) {
				// As tail, shift to previous. Must only shift if not also
				// head, since if both head and tail, there is no previous.
				if ( node === tail ) {
					tail = node.prev;
				}

				// Adjust siblings to point to each other. If node was tail,
				// this also handles new tail's empty `next` assignment.
				node.prev.next = node.next;
				if ( node.next ) {
					node.next.prev = node.prev;
				}

				node.next = head;
				node.prev = null;
				head.prev = node;
				head = node;
			}

			// Return immediately
			return node.val;
		}

		// No cached value found. Continue to insertion phase:

		// Create a copy of arguments (avoid leaking deoptimization)
		args = new Array( len );
		for ( i = 0; i < len; i++ ) {
			args[ i ] = arguments[ i ];
		}

		node = {
			args: args,

			// Generate the result from original function
			val: fn.apply( null, args )
		};

		// Don't need to check whether node is already head, since it would
		// have been returned above already if it was

		// Shift existing head down list
		if ( head ) {
			head.prev = node;
			node.next = head;
		} else {
			// If no head, follows that there's no tail (at initial or reset)
			tail = node;
		}

		// Trim tail if we're reached max size and are pending cache insertion
		if ( size === maxSize ) {
			tail = tail.prev;
			tail.next = null;
		} else {
			size++;
		}

		head = node;

		return node.val;
	}

	memoized.clear = function() {
		head = null;
		tail = null;
		size = 0;
	};

	if ( false ) {}

	return memoized;
};


/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi ./assets/src/eejs/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./assets/src/eejs/index.js */"./assets/src/eejs/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMvLi9hc3NldHMvc3JjL2VlanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9Ad29yZHByZXNzL2kxOG4vYnVpbGQtbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vZWVqcy8uL25vZGVfbW9kdWxlcy9qZWQvamVkLmpzIiwid2VicGFjazovL2VlanMvLi9ub2RlX21vZHVsZXMvbWVtaXplL2luZGV4LmpzIl0sIm5hbWVzIjpbImRhdGEiLCJlZWpzZGF0YSIsImkxOG4iLCJleGNlcHRpb24iLCJtc2ciLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBO0FBQUE7OztBQUdBOztBQUVBOzs7O0FBSUE7Ozs7QUFJTyxJQUFNQSxPQUFPQyxTQUFTRCxJQUFULElBQWlCLEVBQTlCOztBQUVQOzs7O0FBSU8sSUFBTUUsT0FBTyw0Q0FBYjs7QUFFUDs7Ozs7QUFLTyxJQUFNQyxZQUFZLFNBQVpBLFNBQVksQ0FBVUMsR0FBVixFQUFnQjtBQUN4QyxPQUFLQyxPQUFMLEdBQWVELEdBQWY7QUFDQSxDQUZNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztB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Q0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QjtBQUM5Qjs7QUFFQSxPQUFPO0FBQ1Asb0NBQW9DOztBQUVwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsV0FBVyx5RUFBeUUsY0FBYztBQUN0SDtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FRQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNsZ0NEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGNBQWMsU0FBUztBQUN2QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQU1BOztBQUVBO0FBQ0EiLCJmaWxlIjoiZWUtZWVqcy41NTc0MjAxODEyMDVlZWY1NDc2My5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8qKlxuICogV29yZFByZXNzIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgd3BJMThuIGZyb20gJ0B3b3JkcHJlc3MvaTE4bic7XG5cbi8qKlxuICogRXhwb3J0ZWQgdG8gdGhlIGBlZWpzYCBnbG9iYWwuXG4gKi9cblxuLyoqXG4gKiBUaGlzIHdpbGwgaG9sZCBhcmJpdHJhcnkgZGF0YSBhc3NpZ25lZCBieSB0aGUgQXNzZXRzIFJlZ2lzdHJ5LlxuICogQHR5cGUge3t9fVxuICovXG5leHBvcnQgY29uc3QgZGF0YSA9IGVlanNkYXRhLmRhdGEgfHwge307XG5cbi8qKlxuICogV3JhcHBlciBhcm91bmQgd3AuaTE4biBmdW5jdGlvbmFsaXR5IHNvIGl0cyBleHBvc2VkIG9uIHRoZSBlZWpzIGdsb2JhbCBhc1xuICogZWVqcy5pMThuO1xuICovXG5leHBvcnQgY29uc3QgaTE4biA9IHdwSTE4bjtcblxuLyoqXG4gKiB1c2UgdGhpcyBmb3IgZWVqcyBleGNlcHRpb25zXG4gKiBVc2FnZTogdGhyb3cgbmV3IGVlanMuZXhjZXB0aW9uKCdzb21lIG1lc3NhZ2UnKVxuICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xuICovXG5leHBvcnQgY29uc3QgZXhjZXB0aW9uID0gZnVuY3Rpb24oIG1zZyApIHtcblx0dGhpcy5tZXNzYWdlID0gbXNnO1xufTtcbiIsImltcG9ydCBfT2JqZWN0JGFzc2lnbiBmcm9tICdiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbic7XG4vKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgSmVkIGZyb20gJ2plZCc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdtZW1pemUnO1xuXG52YXIgaTE4biA9IHZvaWQgMDtcblxuLyoqXG4gKiBMb2cgdG8gY29uc29sZSwgb25jZSBwZXIgbWVzc2FnZTsgb3IgbW9yZSBwcmVjaXNlbHksIHBlciByZWZlcmVudGlhbGx5IGVxdWFsXG4gKiBhcmd1bWVudCBzZXQuIEJlY2F1c2UgSmVkIHRocm93cyBlcnJvcnMsIHdlIGxvZyB0aGVzZSB0byB0aGUgY29uc29sZSBpbnN0ZWFkXG4gKiB0byBhdm9pZCBjcmFzaGluZyB0aGUgYXBwbGljYXRpb24uXG4gKlxuICogQHBhcmFtIHsuLi4qfSBhcmdzIEFyZ3VtZW50cyB0byBwYXNzIHRvIGBjb25zb2xlLmVycm9yYFxuICovXG52YXIgbG9nRXJyb3JPbmNlID0gbWVtb2l6ZShjb25zb2xlLmVycm9yKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cbi8qKlxuICogTWVyZ2VzIGxvY2FsZSBkYXRhIGludG8gdGhlIEplZCBpbnN0YW5jZSBieSBkb21haW4uIENyZWF0ZXMgYSBuZXcgSmVkXG4gKiBpbnN0YW5jZSBpZiBvbmUgaGFzIG5vdCB5ZXQgYmVlbiBhc3NpZ25lZC5cbiAqXG4gKiBAc2VlIGh0dHA6Ly9tZXNzYWdlZm9ybWF0LmdpdGh1Yi5pby9KZWQvXG4gKlxuICogQHBhcmFtIHs/T2JqZWN0fSBsb2NhbGVEYXRhIExvY2FsZSBkYXRhIGNvbmZpZ3VyYXRpb24uXG4gKiBAcGFyYW0gez9zdHJpbmd9IGRvbWFpbiAgICAgRG9tYWluIGZvciB3aGljaCBjb25maWd1cmF0aW9uIGFwcGxpZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRMb2NhbGVEYXRhKCkge1xuICB2YXIgbG9jYWxlRGF0YSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogeyAnJzoge30gfTtcbiAgdmFyIGRvbWFpbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJ2RlZmF1bHQnO1xuXG4gIGlmICghaTE4bikge1xuICAgIGkxOG4gPSBuZXcgSmVkKHtcbiAgICAgIGRvbWFpbjogJ2RlZmF1bHQnLFxuICAgICAgbG9jYWxlX2RhdGE6IHtcbiAgICAgICAgZGVmYXVsdDoge31cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGkxOG4ub3B0aW9ucy5sb2NhbGVfZGF0YVtkb21haW5dID0gX09iamVjdCRhc3NpZ24oe30sIGkxOG4ub3B0aW9ucy5sb2NhbGVfZGF0YVtkb21haW5dLCBsb2NhbGVEYXRhKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjdXJyZW50IEplZCBpbnN0YW5jZSwgaW5pdGlhbGl6aW5nIHdpdGggYSBkZWZhdWx0IGNvbmZpZ3VyYXRpb25cbiAqIGlmIG5vdCBhbHJlYWR5IGFzc2lnbmVkLlxuICpcbiAqIEByZXR1cm4ge0plZH0gSmVkIGluc3RhbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0STE4bigpIHtcbiAgaWYgKCFpMThuKSB7XG4gICAgc2V0TG9jYWxlRGF0YSgpO1xuICB9XG5cbiAgcmV0dXJuIGkxOG47XG59XG5cbi8qKlxuICogV3JhcHBlciBmb3IgSmVkJ3MgYGRjbnBnZXR0ZXh0YCwgaXRzIG1vc3QgcXVhbGlmaWVkIGZ1bmN0aW9uLiBBYnNvcmJzIGVycm9yc1xuICogd2hpY2ggYXJlIHRocm93biBhcyB0aGUgcmVzdWx0IG9mIGludmFsaWQgdHJhbnNsYXRpb24uXG4gKlxuICogQHBhcmFtIHs/c3RyaW5nfSBkb21haW4gIERvbWFpbiB0byByZXRyaWV2ZSB0aGUgdHJhbnNsYXRlZCB0ZXh0LlxuICogQHBhcmFtIHs/c3RyaW5nfSBjb250ZXh0IENvbnRleHQgaW5mb3JtYXRpb24gZm9yIHRoZSB0cmFuc2xhdG9ycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSAgc2luZ2xlICBUZXh0IHRvIHRyYW5zbGF0ZSBpZiBub24tcGx1cmFsLiBVc2VkIGFzIGZhbGxiYWNrXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlIG9uIGEgY2F1Z2h0IGVycm9yLlxuICogQHBhcmFtIHs/c3RyaW5nfSBwbHVyYWwgIFRoZSB0ZXh0IHRvIGJlIHVzZWQgaWYgdGhlIG51bWJlciBpcyBwbHVyYWwuXG4gKiBAcGFyYW0gez9udW1iZXJ9IG51bWJlciAgVGhlIG51bWJlciB0byBjb21wYXJlIGFnYWluc3QgdG8gdXNlIGVpdGhlciB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBzaW5ndWxhciBvciBwbHVyYWwgZm9ybS5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB0cmFuc2xhdGVkIHN0cmluZy5cbiAqL1xuZXhwb3J0IHZhciBkY25wZ2V0dGV4dCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuICB2YXIgZG9tYWluID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnZGVmYXVsdCc7XG4gIHZhciBjb250ZXh0ID0gYXJndW1lbnRzWzFdO1xuICB2YXIgc2luZ2xlID0gYXJndW1lbnRzWzJdO1xuICB2YXIgcGx1cmFsID0gYXJndW1lbnRzWzNdO1xuICB2YXIgbnVtYmVyID0gYXJndW1lbnRzWzRdO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuIGdldEkxOG4oKS5kY25wZ2V0dGV4dChkb21haW4sIGNvbnRleHQsIHNpbmdsZSwgcGx1cmFsLCBudW1iZXIpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZ0Vycm9yT25jZSgnSmVkIGxvY2FsaXphdGlvbiBlcnJvcjogXFxuXFxuJyArIGVycm9yLnRvU3RyaW5nKCkpO1xuXG4gICAgcmV0dXJuIHNpbmdsZTtcbiAgfVxufSk7XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIHRyYW5zbGF0aW9uIG9mIHRleHQuXG4gKlxuICogQHNlZSBodHRwczovL2RldmVsb3Blci53b3JkcHJlc3Mub3JnL3JlZmVyZW5jZS9mdW5jdGlvbnMvX18vXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9ICB0ZXh0ICAgVGV4dCB0byB0cmFuc2xhdGUuXG4gKiBAcGFyYW0gez9zdHJpbmd9IGRvbWFpbiBEb21haW4gdG8gcmV0cmlldmUgdGhlIHRyYW5zbGF0ZWQgdGV4dC5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRyYW5zbGF0ZWQgdGV4dC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fKHRleHQsIGRvbWFpbikge1xuICByZXR1cm4gZGNucGdldHRleHQoZG9tYWluLCB1bmRlZmluZWQsIHRleHQpO1xufVxuXG4vKipcbiAqIFJldHJpZXZlIHRyYW5zbGF0ZWQgc3RyaW5nIHdpdGggZ2V0dGV4dCBjb250ZXh0LlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIud29yZHByZXNzLm9yZy9yZWZlcmVuY2UvZnVuY3Rpb25zL194L1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSAgdGV4dCAgICBUZXh0IHRvIHRyYW5zbGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSAgY29udGV4dCBDb250ZXh0IGluZm9ybWF0aW9uIGZvciB0aGUgdHJhbnNsYXRvcnMuXG4gKiBAcGFyYW0gez9zdHJpbmd9IGRvbWFpbiAgRG9tYWluIHRvIHJldHJpZXZlIHRoZSB0cmFuc2xhdGVkIHRleHQuXG4gKlxuICogQHJldHVybiB7c3RyaW5nfSBUcmFuc2xhdGVkIGNvbnRleHQgc3RyaW5nIHdpdGhvdXQgcGlwZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF94KHRleHQsIGNvbnRleHQsIGRvbWFpbikge1xuICByZXR1cm4gZGNucGdldHRleHQoZG9tYWluLCBjb250ZXh0LCB0ZXh0KTtcbn1cblxuLyoqXG4gKiBUcmFuc2xhdGVzIGFuZCByZXRyaWV2ZXMgdGhlIHNpbmd1bGFyIG9yIHBsdXJhbCBmb3JtIGJhc2VkIG9uIHRoZSBzdXBwbGllZFxuICogbnVtYmVyLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIud29yZHByZXNzLm9yZy9yZWZlcmVuY2UvZnVuY3Rpb25zL19uL1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSAgc2luZ2xlIFRoZSB0ZXh0IHRvIGJlIHVzZWQgaWYgdGhlIG51bWJlciBpcyBzaW5ndWxhci5cbiAqIEBwYXJhbSB7c3RyaW5nfSAgcGx1cmFsIFRoZSB0ZXh0IHRvIGJlIHVzZWQgaWYgdGhlIG51bWJlciBpcyBwbHVyYWwuXG4gKiBAcGFyYW0ge251bWJlcn0gIG51bWJlciBUaGUgbnVtYmVyIHRvIGNvbXBhcmUgYWdhaW5zdCB0byB1c2UgZWl0aGVyIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgc2luZ3VsYXIgb3IgcGx1cmFsIGZvcm0uXG4gKiBAcGFyYW0gez9zdHJpbmd9IGRvbWFpbiBEb21haW4gdG8gcmV0cmlldmUgdGhlIHRyYW5zbGF0ZWQgdGV4dC5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB0cmFuc2xhdGVkIHNpbmd1bGFyIG9yIHBsdXJhbCBmb3JtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gX24oc2luZ2xlLCBwbHVyYWwsIG51bWJlciwgZG9tYWluKSB7XG4gIHJldHVybiBkY25wZ2V0dGV4dChkb21haW4sIHVuZGVmaW5lZCwgc2luZ2xlLCBwbHVyYWwsIG51bWJlcik7XG59XG5cbi8qKlxuICogVHJhbnNsYXRlcyBhbmQgcmV0cmlldmVzIHRoZSBzaW5ndWxhciBvciBwbHVyYWwgZm9ybSBiYXNlZCBvbiB0aGUgc3VwcGxpZWRcbiAqIG51bWJlciwgd2l0aCBnZXR0ZXh0IGNvbnRleHQuXG4gKlxuICogQHNlZSBodHRwczovL2RldmVsb3Blci53b3JkcHJlc3Mub3JnL3JlZmVyZW5jZS9mdW5jdGlvbnMvX254L1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSAgc2luZ2xlICBUaGUgdGV4dCB0byBiZSB1c2VkIGlmIHRoZSBudW1iZXIgaXMgc2luZ3VsYXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gIHBsdXJhbCAgVGhlIHRleHQgdG8gYmUgdXNlZCBpZiB0aGUgbnVtYmVyIGlzIHBsdXJhbC5cbiAqIEBwYXJhbSB7bnVtYmVyfSAgbnVtYmVyICBUaGUgbnVtYmVyIHRvIGNvbXBhcmUgYWdhaW5zdCB0byB1c2UgZWl0aGVyIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgIHNpbmd1bGFyIG9yIHBsdXJhbCBmb3JtLlxuICogQHBhcmFtIHtzdHJpbmd9ICBjb250ZXh0IENvbnRleHQgaW5mb3JtYXRpb24gZm9yIHRoZSB0cmFuc2xhdG9ycy5cbiAqIEBwYXJhbSB7P3N0cmluZ30gZG9tYWluICBEb21haW4gdG8gcmV0cmlldmUgdGhlIHRyYW5zbGF0ZWQgdGV4dC5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB0cmFuc2xhdGVkIHNpbmd1bGFyIG9yIHBsdXJhbCBmb3JtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gX254KHNpbmdsZSwgcGx1cmFsLCBudW1iZXIsIGNvbnRleHQsIGRvbWFpbikge1xuICByZXR1cm4gZGNucGdldHRleHQoZG9tYWluLCBjb250ZXh0LCBzaW5nbGUsIHBsdXJhbCwgbnVtYmVyKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZm9ybWF0dGVkIHN0cmluZy4gSWYgYW4gZXJyb3Igb2NjdXJzIGluIGFwcGx5aW5nIHRoZSBmb3JtYXQsIHRoZVxuICogb3JpZ2luYWwgZm9ybWF0IHN0cmluZyBpcyByZXR1cm5lZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gICBmb3JtYXQgIFRoZSBmb3JtYXQgb2YgdGhlIHN0cmluZyB0byBnZW5lcmF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IC4uLmFyZ3MgQXJndW1lbnRzIHRvIGFwcGx5IHRvIHRoZSBmb3JtYXQuXG4gKlxuICogQHNlZSBodHRwOi8vd3d3LmRpdmVpbnRvamF2YXNjcmlwdC5jb20vcHJvamVjdHMvamF2YXNjcmlwdC1zcHJpbnRmXG4gKlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwcmludGYoZm9ybWF0KSB7XG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gSmVkLnNwcmludGYuYXBwbHkoSmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZ0Vycm9yT25jZSgnSmVkIHNwcmludGYgZXJyb3I6IFxcblxcbicgKyBlcnJvci50b1N0cmluZygpKTtcblxuICAgIHJldHVybiBmb3JtYXQ7XG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuNicgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGhhcyhleHBvcnRzLCBrZXkpKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogY29yZS52ZXJzaW9uLFxuICBtb2RlOiByZXF1aXJlKCcuL19saWJyYXJ5JykgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOCBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG4iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcbiIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG4iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuIiwiLyoqXG4gKiBAcHJlc2VydmUgamVkLmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9TbGV4QXh0b24vSmVkXG4gKi9cbi8qXG4tLS0tLS0tLS0tLVxuQSBnZXR0ZXh0IGNvbXBhdGlibGUgaTE4biBsaWJyYXJ5IGZvciBtb2Rlcm4gSmF2YVNjcmlwdCBBcHBsaWNhdGlvbnNcblxuYnkgQWxleCBTZXh0b24gLSBBbGV4U2V4dG9uIFthdF0gZ21haWwgLSBAU2xleEF4dG9uXG5cbk1JVCBMaWNlbnNlXG5cbkEgalF1ZXJ5IEZvdW5kYXRpb24gcHJvamVjdCAtIHJlcXVpcmVzIENMQSB0byBjb250cmlidXRlIC1cbmh0dHBzOi8vY29udHJpYnV0ZS5qcXVlcnkub3JnL0NMQS9cblxuXG5cbkplZCBvZmZlcnMgdGhlIGVudGlyZSBhcHBsaWNhYmxlIEdOVSBnZXR0ZXh0IHNwZWMnZCBzZXQgb2ZcbmZ1bmN0aW9ucywgYnV0IGFsc28gb2ZmZXJzIHNvbWUgbmljZXIgd3JhcHBlcnMgYXJvdW5kIHRoZW0uXG5UaGUgYXBpIGZvciBnZXR0ZXh0IHdhcyB3cml0dGVuIGZvciBhIGxhbmd1YWdlIHdpdGggbm8gZnVuY3Rpb25cbm92ZXJsb2FkaW5nLCBzbyBKZWQgYWxsb3dzIGEgbGl0dGxlIG1vcmUgb2YgdGhhdC5cblxuTWFueSB0aGFua3MgdG8gSm9zaHVhIEkuIE1pbGxlciAtIHVucnRzdEBjcGFuLm9yZyAtIHdobyB3cm90ZVxuZ2V0dGV4dC5qcyBiYWNrIGluIDIwMDguIEkgd2FzIGFibGUgdG8gdmV0IGEgbG90IG9mIG15IGlkZWFzXG5hZ2FpbnN0IGhpcy4gSSBhbHNvIG1hZGUgc3VyZSBKZWQgcGFzc2VkIGFnYWluc3QgaGlzIHRlc3RzXG5pbiBvcmRlciB0byBvZmZlciBlYXN5IHVwZ3JhZGVzIC0tIGpzZ2V0dGV4dC5iZXJsaW9zLmRlXG4qL1xuKGZ1bmN0aW9uIChyb290LCB1bmRlZikge1xuXG4gIC8vIFNldCB1cCBzb21lIHVuZGVyc2NvcmUtc3R5bGUgZnVuY3Rpb25zLCBpZiB5b3UgYWxyZWFkeSBoYXZlXG4gIC8vIHVuZGVyc2NvcmUsIGZlZWwgZnJlZSB0byBkZWxldGUgdGhpcyBzZWN0aW9uLCBhbmQgdXNlIGl0XG4gIC8vIGRpcmVjdGx5LCBob3dldmVyLCB0aGUgYW1vdW50IG9mIGZ1bmN0aW9ucyB1c2VkIGRvZXNuJ3RcbiAgLy8gd2FycmFudCBoYXZpbmcgdW5kZXJzY29yZSBhcyBhIGZ1bGwgZGVwZW5kZW5jeS5cbiAgLy8gVW5kZXJzY29yZSAxLjMuMCB3YXMgdXNlZCB0byBwb3J0IGFuZCBpcyBsaWNlbnNlZFxuICAvLyB1bmRlciB0aGUgTUlUIExpY2Vuc2UgYnkgSmVyZW15IEFzaGtlbmFzLlxuICB2YXIgQXJyYXlQcm90byAgICA9IEFycmF5LnByb3RvdHlwZSxcbiAgICAgIE9ialByb3RvICAgICAgPSBPYmplY3QucHJvdG90eXBlLFxuICAgICAgc2xpY2UgICAgICAgICA9IEFycmF5UHJvdG8uc2xpY2UsXG4gICAgICBoYXNPd25Qcm9wICAgID0gT2JqUHJvdG8uaGFzT3duUHJvcGVydHksXG4gICAgICBuYXRpdmVGb3JFYWNoID0gQXJyYXlQcm90by5mb3JFYWNoLFxuICAgICAgYnJlYWtlciAgICAgICA9IHt9O1xuXG4gIC8vIFdlJ3JlIG5vdCB1c2luZyB0aGUgT09QIHN0eWxlIF8gc28gd2UgZG9uJ3QgbmVlZCB0aGVcbiAgLy8gZXh0cmEgbGV2ZWwgb2YgaW5kaXJlY3Rpb24uIFRoaXMgc3RpbGwgbWVhbnMgdGhhdCB5b3VcbiAgLy8gc3ViIG91dCBmb3IgcmVhbCBgX2AgdGhvdWdoLlxuICB2YXIgXyA9IHtcbiAgICBmb3JFYWNoIDogZnVuY3Rpb24oIG9iaiwgaXRlcmF0b3IsIGNvbnRleHQgKSB7XG4gICAgICB2YXIgaSwgbCwga2V5O1xuICAgICAgaWYgKCBvYmogPT09IG51bGwgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCBuYXRpdmVGb3JFYWNoICYmIG9iai5mb3JFYWNoID09PSBuYXRpdmVGb3JFYWNoICkge1xuICAgICAgICBvYmouZm9yRWFjaCggaXRlcmF0b3IsIGNvbnRleHQgKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCBvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCApIHtcbiAgICAgICAgZm9yICggaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuICAgICAgICAgIGlmICggaSBpbiBvYmogJiYgaXRlcmF0b3IuY2FsbCggY29udGV4dCwgb2JqW2ldLCBpLCBvYmogKSA9PT0gYnJlYWtlciApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBmb3IgKCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgaWYgKCBoYXNPd25Qcm9wLmNhbGwoIG9iaiwga2V5ICkgKSB7XG4gICAgICAgICAgICBpZiAoIGl0ZXJhdG9yLmNhbGwgKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaiApID09PSBicmVha2VyICkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBleHRlbmQgOiBmdW5jdGlvbiggb2JqICkge1xuICAgICAgdGhpcy5mb3JFYWNoKCBzbGljZS5jYWxsKCBhcmd1bWVudHMsIDEgKSwgZnVuY3Rpb24gKCBzb3VyY2UgKSB7XG4gICAgICAgIGZvciAoIHZhciBwcm9wIGluIHNvdXJjZSApIHtcbiAgICAgICAgICBvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gIH07XG4gIC8vIEVORCBNaW5pYXR1cmUgdW5kZXJzY29yZSBpbXBsXG5cbiAgLy8gSmVkIGlzIGEgY29uc3RydWN0b3IgZnVuY3Rpb25cbiAgdmFyIEplZCA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICAvLyBTb21lIG1pbmltYWwgZGVmYXVsdHNcbiAgICB0aGlzLmRlZmF1bHRzID0ge1xuICAgICAgXCJsb2NhbGVfZGF0YVwiIDoge1xuICAgICAgICBcIm1lc3NhZ2VzXCIgOiB7XG4gICAgICAgICAgXCJcIiA6IHtcbiAgICAgICAgICAgIFwiZG9tYWluXCIgICAgICAgOiBcIm1lc3NhZ2VzXCIsXG4gICAgICAgICAgICBcImxhbmdcIiAgICAgICAgIDogXCJlblwiLFxuICAgICAgICAgICAgXCJwbHVyYWxfZm9ybXNcIiA6IFwibnBsdXJhbHM9MjsgcGx1cmFsPShuICE9IDEpO1wiXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFRoZXJlIGFyZSBubyBkZWZhdWx0IGtleXMsIHRob3VnaFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gVGhlIGRlZmF1bHQgZG9tYWluIGlmIG9uZSBpcyBtaXNzaW5nXG4gICAgICBcImRvbWFpblwiIDogXCJtZXNzYWdlc1wiLFxuICAgICAgLy8gZW5hYmxlIGRlYnVnIG1vZGUgdG8gbG9nIHVudHJhbnNsYXRlZCBzdHJpbmdzIHRvIHRoZSBjb25zb2xlXG4gICAgICBcImRlYnVnXCIgOiBmYWxzZVxuICAgIH07XG5cbiAgICAvLyBNaXggaW4gdGhlIHNlbnQgb3B0aW9ucyB3aXRoIHRoZSBkZWZhdWx0IG9wdGlvbnNcbiAgICB0aGlzLm9wdGlvbnMgPSBfLmV4dGVuZCgge30sIHRoaXMuZGVmYXVsdHMsIG9wdGlvbnMgKTtcbiAgICB0aGlzLnRleHRkb21haW4oIHRoaXMub3B0aW9ucy5kb21haW4gKTtcblxuICAgIGlmICggb3B0aW9ucy5kb21haW4gJiYgISB0aGlzLm9wdGlvbnMubG9jYWxlX2RhdGFbIHRoaXMub3B0aW9ucy5kb21haW4gXSApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGV4dCBkb21haW4gc2V0IHRvIG5vbi1leGlzdGVudCBkb21haW46IGAnICsgb3B0aW9ucy5kb21haW4gKyAnYCcpO1xuICAgIH1cbiAgfTtcblxuICAvLyBUaGUgZ2V0dGV4dCBzcGVjIHNldHMgdGhpcyBjaGFyYWN0ZXIgYXMgdGhlIGRlZmF1bHRcbiAgLy8gZGVsaW1pdGVyIGZvciBjb250ZXh0IGxvb2t1cHMuXG4gIC8vIGUuZy46IGNvbnRleHRcXHUwMDA0a2V5XG4gIC8vIElmIHlvdXIgdHJhbnNsYXRpb24gY29tcGFueSB1c2VzIHNvbWV0aGluZyBkaWZmZXJlbnQsXG4gIC8vIGp1c3QgY2hhbmdlIHRoaXMgYXQgYW55IHRpbWUgYW5kIGl0IHdpbGwgdXNlIHRoYXQgaW5zdGVhZC5cbiAgSmVkLmNvbnRleHRfZGVsaW1pdGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZSggNCApO1xuXG4gIGZ1bmN0aW9uIGdldFBsdXJhbEZvcm1GdW5jICggcGx1cmFsX2Zvcm1fc3RyaW5nICkge1xuICAgIHJldHVybiBKZWQuUEYuY29tcGlsZSggcGx1cmFsX2Zvcm1fc3RyaW5nIHx8IFwibnBsdXJhbHM9MjsgcGx1cmFsPShuICE9IDEpO1wiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIENoYWluKCBrZXksIGkxOG4gKXtcbiAgICB0aGlzLl9rZXkgPSBrZXk7XG4gICAgdGhpcy5faTE4biA9IGkxOG47XG4gIH1cblxuICAvLyBDcmVhdGUgYSBjaGFpbmFibGUgYXBpIGZvciBhZGRpbmcgYXJncyBwcmV0dGlseVxuICBfLmV4dGVuZCggQ2hhaW4ucHJvdG90eXBlLCB7XG4gICAgb25Eb21haW4gOiBmdW5jdGlvbiAoIGRvbWFpbiApIHtcbiAgICAgIHRoaXMuX2RvbWFpbiA9IGRvbWFpbjtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgd2l0aENvbnRleHQgOiBmdW5jdGlvbiAoIGNvbnRleHQgKSB7XG4gICAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgaWZQbHVyYWwgOiBmdW5jdGlvbiAoIG51bSwgcGtleSApIHtcbiAgICAgIHRoaXMuX3ZhbCA9IG51bTtcbiAgICAgIHRoaXMuX3BrZXkgPSBwa2V5O1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBmZXRjaCA6IGZ1bmN0aW9uICggc0FyciApIHtcbiAgICAgIGlmICgge30udG9TdHJpbmcuY2FsbCggc0FyciApICE9ICdbb2JqZWN0IEFycmF5XScgKSB7XG4gICAgICAgIHNBcnIgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKCBzQXJyICYmIHNBcnIubGVuZ3RoID8gSmVkLnNwcmludGYgOiBmdW5jdGlvbih4KXsgcmV0dXJuIHg7IH0gKShcbiAgICAgICAgdGhpcy5faTE4bi5kY25wZ2V0dGV4dCh0aGlzLl9kb21haW4sIHRoaXMuX2NvbnRleHQsIHRoaXMuX2tleSwgdGhpcy5fcGtleSwgdGhpcy5fdmFsKSxcbiAgICAgICAgc0FyclxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIEFkZCBmdW5jdGlvbnMgdG8gdGhlIEplZCBwcm90b3R5cGUuXG4gIC8vIFRoZXNlIHdpbGwgYmUgdGhlIGZ1bmN0aW9ucyBvbiB0aGUgb2JqZWN0IHRoYXQncyByZXR1cm5lZFxuICAvLyBmcm9tIGNyZWF0aW5nIGEgYG5ldyBKZWQoKWBcbiAgLy8gVGhlc2Ugc2VlbSByZWR1bmRhbnQsIGJ1dCB0aGV5IGd6aXAgcHJldHR5IHdlbGwuXG4gIF8uZXh0ZW5kKCBKZWQucHJvdG90eXBlLCB7XG4gICAgLy8gVGhlIHNleGllciBhcGkgc3RhcnQgcG9pbnRcbiAgICB0cmFuc2xhdGUgOiBmdW5jdGlvbiAoIGtleSApIHtcbiAgICAgIHJldHVybiBuZXcgQ2hhaW4oIGtleSwgdGhpcyApO1xuICAgIH0sXG5cbiAgICB0ZXh0ZG9tYWluIDogZnVuY3Rpb24gKCBkb21haW4gKSB7XG4gICAgICBpZiAoICEgZG9tYWluICkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dGRvbWFpbjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3RleHRkb21haW4gPSBkb21haW47XG4gICAgfSxcblxuICAgIGdldHRleHQgOiBmdW5jdGlvbiAoIGtleSApIHtcbiAgICAgIHJldHVybiB0aGlzLmRjbnBnZXR0ZXh0LmNhbGwoIHRoaXMsIHVuZGVmLCB1bmRlZiwga2V5ICk7XG4gICAgfSxcblxuICAgIGRnZXR0ZXh0IDogZnVuY3Rpb24gKCBkb21haW4sIGtleSApIHtcbiAgICAgcmV0dXJuIHRoaXMuZGNucGdldHRleHQuY2FsbCggdGhpcywgZG9tYWluLCB1bmRlZiwga2V5ICk7XG4gICAgfSxcblxuICAgIGRjZ2V0dGV4dCA6IGZ1bmN0aW9uICggZG9tYWluICwga2V5IC8qLCBjYXRlZ29yeSAqLyApIHtcbiAgICAgIC8vIElnbm9yZXMgdGhlIGNhdGVnb3J5IGFueXdheXNcbiAgICAgIHJldHVybiB0aGlzLmRjbnBnZXR0ZXh0LmNhbGwoIHRoaXMsIGRvbWFpbiwgdW5kZWYsIGtleSApO1xuICAgIH0sXG5cbiAgICBuZ2V0dGV4dCA6IGZ1bmN0aW9uICggc2tleSwgcGtleSwgdmFsICkge1xuICAgICAgcmV0dXJuIHRoaXMuZGNucGdldHRleHQuY2FsbCggdGhpcywgdW5kZWYsIHVuZGVmLCBza2V5LCBwa2V5LCB2YWwgKTtcbiAgICB9LFxuXG4gICAgZG5nZXR0ZXh0IDogZnVuY3Rpb24gKCBkb21haW4sIHNrZXksIHBrZXksIHZhbCApIHtcbiAgICAgIHJldHVybiB0aGlzLmRjbnBnZXR0ZXh0LmNhbGwoIHRoaXMsIGRvbWFpbiwgdW5kZWYsIHNrZXksIHBrZXksIHZhbCApO1xuICAgIH0sXG5cbiAgICBkY25nZXR0ZXh0IDogZnVuY3Rpb24gKCBkb21haW4sIHNrZXksIHBrZXksIHZhbC8qLCBjYXRlZ29yeSAqLykge1xuICAgICAgcmV0dXJuIHRoaXMuZGNucGdldHRleHQuY2FsbCggdGhpcywgZG9tYWluLCB1bmRlZiwgc2tleSwgcGtleSwgdmFsICk7XG4gICAgfSxcblxuICAgIHBnZXR0ZXh0IDogZnVuY3Rpb24gKCBjb250ZXh0LCBrZXkgKSB7XG4gICAgICByZXR1cm4gdGhpcy5kY25wZ2V0dGV4dC5jYWxsKCB0aGlzLCB1bmRlZiwgY29udGV4dCwga2V5ICk7XG4gICAgfSxcblxuICAgIGRwZ2V0dGV4dCA6IGZ1bmN0aW9uICggZG9tYWluLCBjb250ZXh0LCBrZXkgKSB7XG4gICAgICByZXR1cm4gdGhpcy5kY25wZ2V0dGV4dC5jYWxsKCB0aGlzLCBkb21haW4sIGNvbnRleHQsIGtleSApO1xuICAgIH0sXG5cbiAgICBkY3BnZXR0ZXh0IDogZnVuY3Rpb24gKCBkb21haW4sIGNvbnRleHQsIGtleS8qLCBjYXRlZ29yeSAqLykge1xuICAgICAgcmV0dXJuIHRoaXMuZGNucGdldHRleHQuY2FsbCggdGhpcywgZG9tYWluLCBjb250ZXh0LCBrZXkgKTtcbiAgICB9LFxuXG4gICAgbnBnZXR0ZXh0IDogZnVuY3Rpb24gKCBjb250ZXh0LCBza2V5LCBwa2V5LCB2YWwgKSB7XG4gICAgICByZXR1cm4gdGhpcy5kY25wZ2V0dGV4dC5jYWxsKCB0aGlzLCB1bmRlZiwgY29udGV4dCwgc2tleSwgcGtleSwgdmFsICk7XG4gICAgfSxcblxuICAgIGRucGdldHRleHQgOiBmdW5jdGlvbiAoIGRvbWFpbiwgY29udGV4dCwgc2tleSwgcGtleSwgdmFsICkge1xuICAgICAgcmV0dXJuIHRoaXMuZGNucGdldHRleHQuY2FsbCggdGhpcywgZG9tYWluLCBjb250ZXh0LCBza2V5LCBwa2V5LCB2YWwgKTtcbiAgICB9LFxuXG4gICAgLy8gVGhlIG1vc3QgZnVsbHkgcXVhbGlmaWVkIGdldHRleHQgZnVuY3Rpb24uIEl0IGhhcyBldmVyeSBvcHRpb24uXG4gICAgLy8gU2luY2UgaXQgaGFzIGV2ZXJ5IG9wdGlvbiwgd2UgY2FuIHVzZSBpdCBmcm9tIGV2ZXJ5IG90aGVyIG1ldGhvZC5cbiAgICAvLyBUaGlzIGlzIHRoZSBicmVhZCBhbmQgYnV0dGVyLlxuICAgIC8vIFRlY2huaWNhbGx5IHRoZXJlIHNob3VsZCBiZSBvbmUgbW9yZSBhcmd1bWVudCBpbiB0aGlzIGZ1bmN0aW9uIGZvciAnQ2F0ZWdvcnknLFxuICAgIC8vIGJ1dCBzaW5jZSB3ZSBuZXZlciB1c2UgaXQsIHdlIG1pZ2h0IGFzIHdlbGwgbm90IHdhc3RlIHRoZSBieXRlcyB0byBkZWZpbmUgaXQuXG4gICAgZGNucGdldHRleHQgOiBmdW5jdGlvbiAoIGRvbWFpbiwgY29udGV4dCwgc2luZ3VsYXJfa2V5LCBwbHVyYWxfa2V5LCB2YWwgKSB7XG4gICAgICAvLyBTZXQgc29tZSBkZWZhdWx0c1xuXG4gICAgICBwbHVyYWxfa2V5ID0gcGx1cmFsX2tleSB8fCBzaW5ndWxhcl9rZXk7XG5cbiAgICAgIC8vIFVzZSB0aGUgZ2xvYmFsIGRvbWFpbiBkZWZhdWx0IGlmIG9uZVxuICAgICAgLy8gaXNuJ3QgZXhwbGljaXRseSBwYXNzZWQgaW5cbiAgICAgIGRvbWFpbiA9IGRvbWFpbiB8fCB0aGlzLl90ZXh0ZG9tYWluO1xuXG4gICAgICB2YXIgZmFsbGJhY2s7XG5cbiAgICAgIC8vIEhhbmRsZSBzcGVjaWFsIGNhc2VzXG5cbiAgICAgIC8vIE5vIG9wdGlvbnMgZm91bmRcbiAgICAgIGlmICggISB0aGlzLm9wdGlvbnMgKSB7XG4gICAgICAgIC8vIFRoZXJlJ3MgbGlrZWx5IHNvbWV0aGluZyB3cm9uZywgYnV0IHdlJ2xsIHJldHVybiB0aGUgY29ycmVjdCBrZXkgZm9yIGVuZ2xpc2hcbiAgICAgICAgLy8gV2UgZG8gdGhpcyBieSBpbnN0YW50aWF0aW5nIGEgYnJhbmQgbmV3IEplZCBpbnN0YW5jZSB3aXRoIHRoZSBkZWZhdWx0IHNldFxuICAgICAgICAvLyBmb3IgZXZlcnl0aGluZyB0aGF0IGNvdWxkIGJlIGJyb2tlbi5cbiAgICAgICAgZmFsbGJhY2sgPSBuZXcgSmVkKCk7XG4gICAgICAgIHJldHVybiBmYWxsYmFjay5kY25wZ2V0dGV4dC5jYWxsKCBmYWxsYmFjaywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHNpbmd1bGFyX2tleSwgcGx1cmFsX2tleSwgdmFsICk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5vIHRyYW5zbGF0aW9uIGRhdGEgcHJvdmlkZWRcbiAgICAgIGlmICggISB0aGlzLm9wdGlvbnMubG9jYWxlX2RhdGEgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbG9jYWxlIGRhdGEgcHJvdmlkZWQuJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICggISB0aGlzLm9wdGlvbnMubG9jYWxlX2RhdGFbIGRvbWFpbiBdICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvbWFpbiBgJyArIGRvbWFpbiArICdgIHdhcyBub3QgZm91bmQuJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICggISB0aGlzLm9wdGlvbnMubG9jYWxlX2RhdGFbIGRvbWFpbiBdWyBcIlwiIF0gKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbG9jYWxlIG1ldGEgaW5mb3JtYXRpb24gcHJvdmlkZWQuJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIGEgdHJ1dGh5IGtleS4gT3RoZXJ3aXNlIHdlIG1pZ2h0IHN0YXJ0IGxvb2tpbmdcbiAgICAgIC8vIGludG8gdGhlIGVtcHR5IHN0cmluZyBrZXksIHdoaWNoIGlzIHRoZSBvcHRpb25zIGZvciB0aGUgbG9jYWxlXG4gICAgICAvLyBkYXRhLlxuICAgICAgaWYgKCAhIHNpbmd1bGFyX2tleSApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyB0cmFuc2xhdGlvbiBrZXkgZm91bmQuJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBrZXkgID0gY29udGV4dCA/IGNvbnRleHQgKyBKZWQuY29udGV4dF9kZWxpbWl0ZXIgKyBzaW5ndWxhcl9rZXkgOiBzaW5ndWxhcl9rZXksXG4gICAgICAgICAgbG9jYWxlX2RhdGEgPSB0aGlzLm9wdGlvbnMubG9jYWxlX2RhdGEsXG4gICAgICAgICAgZGljdCA9IGxvY2FsZV9kYXRhWyBkb21haW4gXSxcbiAgICAgICAgICBkZWZhdWx0Q29uZiA9IChsb2NhbGVfZGF0YS5tZXNzYWdlcyB8fCB0aGlzLmRlZmF1bHRzLmxvY2FsZV9kYXRhLm1lc3NhZ2VzKVtcIlwiXSxcbiAgICAgICAgICBwbHVyYWxGb3JtcyA9IGRpY3RbXCJcIl0ucGx1cmFsX2Zvcm1zIHx8IGRpY3RbXCJcIl1bXCJQbHVyYWwtRm9ybXNcIl0gfHwgZGljdFtcIlwiXVtcInBsdXJhbC1mb3Jtc1wiXSB8fCBkZWZhdWx0Q29uZi5wbHVyYWxfZm9ybXMgfHwgZGVmYXVsdENvbmZbXCJQbHVyYWwtRm9ybXNcIl0gfHwgZGVmYXVsdENvbmZbXCJwbHVyYWwtZm9ybXNcIl0sXG4gICAgICAgICAgdmFsX2xpc3QsXG4gICAgICAgICAgcmVzO1xuXG4gICAgICB2YXIgdmFsX2lkeDtcbiAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBObyB2YWx1ZSBwYXNzZWQgaW47IGFzc3VtZSBzaW5ndWxhciBrZXkgbG9va3VwLlxuICAgICAgICB2YWxfaWR4ID0gMDtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVmFsdWUgaGFzIGJlZW4gcGFzc2VkIGluOyB1c2UgcGx1cmFsLWZvcm1zIGNhbGN1bGF0aW9ucy5cblxuICAgICAgICAvLyBIYW5kbGUgaW52YWxpZCBudW1iZXJzLCBidXQgdHJ5IGNhc3Rpbmcgc3RyaW5ncyBmb3IgZ29vZCBtZWFzdXJlXG4gICAgICAgIGlmICggdHlwZW9mIHZhbCAhPSAnbnVtYmVyJyApIHtcbiAgICAgICAgICB2YWwgPSBwYXJzZUludCggdmFsLCAxMCApO1xuXG4gICAgICAgICAgaWYgKCBpc05hTiggdmFsICkgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBudW1iZXIgdGhhdCB3YXMgcGFzc2VkIGluIGlzIG5vdCBhIG51bWJlci4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YWxfaWR4ID0gZ2V0UGx1cmFsRm9ybUZ1bmMocGx1cmFsRm9ybXMpKHZhbCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRocm93IGFuIGVycm9yIGlmIGEgZG9tYWluIGlzbid0IGZvdW5kXG4gICAgICBpZiAoICEgZGljdCApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBkb21haW4gbmFtZWQgYCcgKyBkb21haW4gKyAnYCBjb3VsZCBiZSBmb3VuZC4nKTtcbiAgICAgIH1cblxuICAgICAgdmFsX2xpc3QgPSBkaWN0WyBrZXkgXTtcblxuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gbWF0Y2gsIHRoZW4gcmV2ZXJ0IGJhY2sgdG9cbiAgICAgIC8vIGVuZ2xpc2ggc3R5bGUgc2luZ3VsYXIvcGx1cmFsIHdpdGggdGhlIGtleXMgcGFzc2VkIGluLlxuICAgICAgaWYgKCAhIHZhbF9saXN0IHx8IHZhbF9pZHggPiB2YWxfbGlzdC5sZW5ndGggKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubWlzc2luZ19rZXlfY2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMubWlzc2luZ19rZXlfY2FsbGJhY2soa2V5LCBkb21haW4pO1xuICAgICAgICB9XG4gICAgICAgIHJlcyA9IFsgc2luZ3VsYXJfa2V5LCBwbHVyYWxfa2V5IF07XG5cbiAgICAgICAgLy8gY29sbGVjdCB1bnRyYW5zbGF0ZWQgc3RyaW5nc1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnPT09dHJ1ZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc1sgZ2V0UGx1cmFsRm9ybUZ1bmMocGx1cmFsRm9ybXMpKCB2YWwgKSBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzWyBnZXRQbHVyYWxGb3JtRnVuYygpKCB2YWwgKSBdO1xuICAgICAgfVxuXG4gICAgICByZXMgPSB2YWxfbGlzdFsgdmFsX2lkeCBdO1xuXG4gICAgICAvLyBUaGlzIGluY2x1ZGVzIGVtcHR5IHN0cmluZ3Mgb24gcHVycG9zZVxuICAgICAgaWYgKCAhIHJlcyAgKSB7XG4gICAgICAgIHJlcyA9IFsgc2luZ3VsYXJfa2V5LCBwbHVyYWxfa2V5IF07XG4gICAgICAgIHJldHVybiByZXNbIGdldFBsdXJhbEZvcm1GdW5jKCkoIHZhbCApIF07XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgfSk7XG5cblxuICAvLyBXZSBhZGQgaW4gc3ByaW50ZiBjYXBhYmlsaXRpZXMgZm9yIHBvc3QgdHJhbnNsYXRpb24gdmFsdWUgaW50ZXJvbGF0aW9uXG4gIC8vIFRoaXMgaXMgbm90IGludGVybmFsbHkgdXNlZCwgc28geW91IGNhbiByZW1vdmUgaXQgaWYgeW91IGhhdmUgdGhpc1xuICAvLyBhdmFpbGFibGUgc29tZXdoZXJlIGVsc2UsIG9yIHdhbnQgdG8gdXNlIGEgZGlmZmVyZW50IHN5c3RlbS5cblxuICAvLyBXZSBfc2xpZ2h0bHlfIG1vZGlmeSB0aGUgbm9ybWFsIHNwcmludGYgYmVoYXZpb3IgdG8gbW9yZSBncmFjZWZ1bGx5IGhhbmRsZVxuICAvLyB1bmRlZmluZWQgdmFsdWVzLlxuXG4gIC8qKlxuICAgc3ByaW50ZigpIGZvciBKYXZhU2NyaXB0IDAuNy1iZXRhMVxuICAgaHR0cDovL3d3dy5kaXZlaW50b2phdmFzY3JpcHQuY29tL3Byb2plY3RzL2phdmFzY3JpcHQtc3ByaW50ZlxuXG4gICBDb3B5cmlnaHQgKGMpIEFsZXhhbmRydSBNYXJhc3RlYW51IDxhbGV4YWhvbGljIFthdCkgZ21haWwgKGRvdF0gY29tPlxuICAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuICAgUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gICBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAgICAgICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG4gICAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICAgICAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodFxuICAgICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuICAgICAgICAgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAgICAgICAqIE5laXRoZXIgdGhlIG5hbWUgb2Ygc3ByaW50ZigpIGZvciBKYXZhU2NyaXB0IG5vciB0aGVcbiAgICAgICAgIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzXG4gICAgICAgICBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cblxuICAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG4gICBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICAgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuICAgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgQWxleGFuZHJ1IE1hcmFzdGVhbnUgQkUgTElBQkxFIEZPUiBBTllcbiAgIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4gICAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG4gICBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkRcbiAgIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4gICAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuICAgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gICovXG4gIHZhciBzcHJpbnRmID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIGdldF90eXBlKHZhcmlhYmxlKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhcmlhYmxlKS5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3RyX3JlcGVhdChpbnB1dCwgbXVsdGlwbGllcikge1xuICAgICAgZm9yICh2YXIgb3V0cHV0ID0gW107IG11bHRpcGxpZXIgPiAwOyBvdXRwdXRbLS1tdWx0aXBsaWVyXSA9IGlucHV0KSB7LyogZG8gbm90aGluZyAqL31cbiAgICAgIHJldHVybiBvdXRwdXQuam9pbignJyk7XG4gICAgfVxuXG4gICAgdmFyIHN0cl9mb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghc3RyX2Zvcm1hdC5jYWNoZS5oYXNPd25Qcm9wZXJ0eShhcmd1bWVudHNbMF0pKSB7XG4gICAgICAgIHN0cl9mb3JtYXQuY2FjaGVbYXJndW1lbnRzWzBdXSA9IHN0cl9mb3JtYXQucGFyc2UoYXJndW1lbnRzWzBdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJfZm9ybWF0LmZvcm1hdC5jYWxsKG51bGwsIHN0cl9mb3JtYXQuY2FjaGVbYXJndW1lbnRzWzBdXSwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgc3RyX2Zvcm1hdC5mb3JtYXQgPSBmdW5jdGlvbihwYXJzZV90cmVlLCBhcmd2KSB7XG4gICAgICB2YXIgY3Vyc29yID0gMSwgdHJlZV9sZW5ndGggPSBwYXJzZV90cmVlLmxlbmd0aCwgbm9kZV90eXBlID0gJycsIGFyZywgb3V0cHV0ID0gW10sIGksIGssIG1hdGNoLCBwYWQsIHBhZF9jaGFyYWN0ZXIsIHBhZF9sZW5ndGg7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdHJlZV9sZW5ndGg7IGkrKykge1xuICAgICAgICBub2RlX3R5cGUgPSBnZXRfdHlwZShwYXJzZV90cmVlW2ldKTtcbiAgICAgICAgaWYgKG5vZGVfdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBvdXRwdXQucHVzaChwYXJzZV90cmVlW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChub2RlX3R5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgICBtYXRjaCA9IHBhcnNlX3RyZWVbaV07IC8vIGNvbnZlbmllbmNlIHB1cnBvc2VzIG9ubHlcbiAgICAgICAgICBpZiAobWF0Y2hbMl0pIHsgLy8ga2V5d29yZCBhcmd1bWVudFxuICAgICAgICAgICAgYXJnID0gYXJndltjdXJzb3JdO1xuICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IG1hdGNoWzJdLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgIGlmICghYXJnLmhhc093blByb3BlcnR5KG1hdGNoWzJdW2tdKSkge1xuICAgICAgICAgICAgICAgIHRocm93KHNwcmludGYoJ1tzcHJpbnRmXSBwcm9wZXJ0eSBcIiVzXCIgZG9lcyBub3QgZXhpc3QnLCBtYXRjaFsyXVtrXSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGFyZyA9IGFyZ1ttYXRjaFsyXVtrXV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKG1hdGNoWzFdKSB7IC8vIHBvc2l0aW9uYWwgYXJndW1lbnQgKGV4cGxpY2l0KVxuICAgICAgICAgICAgYXJnID0gYXJndlttYXRjaFsxXV07XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgeyAvLyBwb3NpdGlvbmFsIGFyZ3VtZW50IChpbXBsaWNpdClcbiAgICAgICAgICAgIGFyZyA9IGFyZ3ZbY3Vyc29yKytdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICgvW15zXS8udGVzdChtYXRjaFs4XSkgJiYgKGdldF90eXBlKGFyZykgIT0gJ251bWJlcicpKSB7XG4gICAgICAgICAgICB0aHJvdyhzcHJpbnRmKCdbc3ByaW50Zl0gZXhwZWN0aW5nIG51bWJlciBidXQgZm91bmQgJXMnLCBnZXRfdHlwZShhcmcpKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSmVkIEVESVRcbiAgICAgICAgICBpZiAoIHR5cGVvZiBhcmcgPT0gJ3VuZGVmaW5lZCcgfHwgYXJnID09PSBudWxsICkge1xuICAgICAgICAgICAgYXJnID0gJyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEplZCBFRElUXG5cbiAgICAgICAgICBzd2l0Y2ggKG1hdGNoWzhdKSB7XG4gICAgICAgICAgICBjYXNlICdiJzogYXJnID0gYXJnLnRvU3RyaW5nKDIpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2MnOiBhcmcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGFyZyk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZCc6IGFyZyA9IHBhcnNlSW50KGFyZywgMTApOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2UnOiBhcmcgPSBtYXRjaFs3XSA/IGFyZy50b0V4cG9uZW50aWFsKG1hdGNoWzddKSA6IGFyZy50b0V4cG9uZW50aWFsKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZic6IGFyZyA9IG1hdGNoWzddID8gcGFyc2VGbG9hdChhcmcpLnRvRml4ZWQobWF0Y2hbN10pIDogcGFyc2VGbG9hdChhcmcpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ28nOiBhcmcgPSBhcmcudG9TdHJpbmcoOCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncyc6IGFyZyA9ICgoYXJnID0gU3RyaW5nKGFyZykpICYmIG1hdGNoWzddID8gYXJnLnN1YnN0cmluZygwLCBtYXRjaFs3XSkgOiBhcmcpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3UnOiBhcmcgPSBNYXRoLmFicyhhcmcpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3gnOiBhcmcgPSBhcmcudG9TdHJpbmcoMTYpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1gnOiBhcmcgPSBhcmcudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7IGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhcmcgPSAoL1tkZWZdLy50ZXN0KG1hdGNoWzhdKSAmJiBtYXRjaFszXSAmJiBhcmcgPj0gMCA/ICcrJysgYXJnIDogYXJnKTtcbiAgICAgICAgICBwYWRfY2hhcmFjdGVyID0gbWF0Y2hbNF0gPyBtYXRjaFs0XSA9PSAnMCcgPyAnMCcgOiBtYXRjaFs0XS5jaGFyQXQoMSkgOiAnICc7XG4gICAgICAgICAgcGFkX2xlbmd0aCA9IG1hdGNoWzZdIC0gU3RyaW5nKGFyZykubGVuZ3RoO1xuICAgICAgICAgIHBhZCA9IG1hdGNoWzZdID8gc3RyX3JlcGVhdChwYWRfY2hhcmFjdGVyLCBwYWRfbGVuZ3RoKSA6ICcnO1xuICAgICAgICAgIG91dHB1dC5wdXNoKG1hdGNoWzVdID8gYXJnICsgcGFkIDogcGFkICsgYXJnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dC5qb2luKCcnKTtcbiAgICB9O1xuXG4gICAgc3RyX2Zvcm1hdC5jYWNoZSA9IHt9O1xuXG4gICAgc3RyX2Zvcm1hdC5wYXJzZSA9IGZ1bmN0aW9uKGZtdCkge1xuICAgICAgdmFyIF9mbXQgPSBmbXQsIG1hdGNoID0gW10sIHBhcnNlX3RyZWUgPSBbXSwgYXJnX25hbWVzID0gMDtcbiAgICAgIHdoaWxlIChfZm10KSB7XG4gICAgICAgIGlmICgobWF0Y2ggPSAvXlteXFx4MjVdKy8uZXhlYyhfZm10KSkgIT09IG51bGwpIHtcbiAgICAgICAgICBwYXJzZV90cmVlLnB1c2gobWF0Y2hbMF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChtYXRjaCA9IC9eXFx4MjV7Mn0vLmV4ZWMoX2ZtdCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgcGFyc2VfdHJlZS5wdXNoKCclJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKG1hdGNoID0gL15cXHgyNSg/OihbMS05XVxcZCopXFwkfFxcKChbXlxcKV0rKVxcKSk/KFxcKyk/KDB8J1teJF0pPygtKT8oXFxkKyk/KD86XFwuKFxcZCspKT8oW2ItZm9zdXhYXSkvLmV4ZWMoX2ZtdCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKG1hdGNoWzJdKSB7XG4gICAgICAgICAgICBhcmdfbmFtZXMgfD0gMTtcbiAgICAgICAgICAgIHZhciBmaWVsZF9saXN0ID0gW10sIHJlcGxhY2VtZW50X2ZpZWxkID0gbWF0Y2hbMl0sIGZpZWxkX21hdGNoID0gW107XG4gICAgICAgICAgICBpZiAoKGZpZWxkX21hdGNoID0gL14oW2Etel9dW2Etel9cXGRdKikvaS5leGVjKHJlcGxhY2VtZW50X2ZpZWxkKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgZmllbGRfbGlzdC5wdXNoKGZpZWxkX21hdGNoWzFdKTtcbiAgICAgICAgICAgICAgd2hpbGUgKChyZXBsYWNlbWVudF9maWVsZCA9IHJlcGxhY2VtZW50X2ZpZWxkLnN1YnN0cmluZyhmaWVsZF9tYXRjaFswXS5sZW5ndGgpKSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBpZiAoKGZpZWxkX21hdGNoID0gL15cXC4oW2Etel9dW2Etel9cXGRdKikvaS5leGVjKHJlcGxhY2VtZW50X2ZpZWxkKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkX2xpc3QucHVzaChmaWVsZF9tYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKChmaWVsZF9tYXRjaCA9IC9eXFxbKFxcZCspXFxdLy5leGVjKHJlcGxhY2VtZW50X2ZpZWxkKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkX2xpc3QucHVzaChmaWVsZF9tYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhyb3coJ1tzcHJpbnRmXSBodWg/Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3coJ1tzcHJpbnRmXSBodWg/Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXRjaFsyXSA9IGZpZWxkX2xpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXJnX25hbWVzIHw9IDI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcmdfbmFtZXMgPT09IDMpIHtcbiAgICAgICAgICAgIHRocm93KCdbc3ByaW50Zl0gbWl4aW5nIHBvc2l0aW9uYWwgYW5kIG5hbWVkIHBsYWNlaG9sZGVycyBpcyBub3QgKHlldCkgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcnNlX3RyZWUucHVzaChtYXRjaCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhyb3coJ1tzcHJpbnRmXSBodWg/Jyk7XG4gICAgICAgIH1cbiAgICAgICAgX2ZtdCA9IF9mbXQuc3Vic3RyaW5nKG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFyc2VfdHJlZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0cl9mb3JtYXQ7XG4gIH0pKCk7XG5cbiAgdmFyIHZzcHJpbnRmID0gZnVuY3Rpb24oZm10LCBhcmd2KSB7XG4gICAgYXJndi51bnNoaWZ0KGZtdCk7XG4gICAgcmV0dXJuIHNwcmludGYuYXBwbHkobnVsbCwgYXJndik7XG4gIH07XG5cbiAgSmVkLnBhcnNlX3BsdXJhbCA9IGZ1bmN0aW9uICggcGx1cmFsX2Zvcm1zLCBuICkge1xuICAgIHBsdXJhbF9mb3JtcyA9IHBsdXJhbF9mb3Jtcy5yZXBsYWNlKC9uL2csIG4pO1xuICAgIHJldHVybiBKZWQucGFyc2VfZXhwcmVzc2lvbihwbHVyYWxfZm9ybXMpO1xuICB9O1xuXG4gIEplZC5zcHJpbnRmID0gZnVuY3Rpb24gKCBmbXQsIGFyZ3MgKSB7XG4gICAgaWYgKCB7fS50b1N0cmluZy5jYWxsKCBhcmdzICkgPT0gJ1tvYmplY3QgQXJyYXldJyApIHtcbiAgICAgIHJldHVybiB2c3ByaW50ZiggZm10LCBbXS5zbGljZS5jYWxsKGFyZ3MpICk7XG4gICAgfVxuICAgIHJldHVybiBzcHJpbnRmLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSApO1xuICB9O1xuXG4gIEplZC5wcm90b3R5cGUuc3ByaW50ZiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gSmVkLnNwcmludGYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbiAgLy8gRU5EIHNwcmludGYgSW1wbGVtZW50YXRpb25cblxuICAvLyBTdGFydCB0aGUgUGx1cmFsIGZvcm1zIHNlY3Rpb25cbiAgLy8gVGhpcyBpcyBhIGZ1bGwgcGx1cmFsIGZvcm0gZXhwcmVzc2lvbiBwYXJzZXIuIEl0IGlzIHVzZWQgdG8gYXZvaWRcbiAgLy8gcnVubmluZyAnZXZhbCcgb3IgJ25ldyBGdW5jdGlvbicgZGlyZWN0bHkgYWdhaW5zdCB0aGUgcGx1cmFsXG4gIC8vIGZvcm1zLlxuICAvL1xuICAvLyBUaGlzIGNhbiBiZSBpbXBvcnRhbnQgaWYgeW91IGdldCB0cmFuc2xhdGlvbnMgZG9uZSB0aHJvdWdoIGEgM3JkXG4gIC8vIHBhcnR5IHZlbmRvci4gSSBlbmNvdXJhZ2UgeW91IHRvIHVzZSB0aGlzIGluc3RlYWQsIGhvd2V2ZXIsIElcbiAgLy8gYWxzbyB3aWxsIHByb3ZpZGUgYSAncHJlY29tcGlsZXInIHRoYXQgeW91IGNhbiB1c2UgYXQgYnVpbGQgdGltZVxuICAvLyB0byBvdXRwdXQgdmFsaWQvc2FmZSBmdW5jdGlvbiByZXByZXNlbnRhdGlvbnMgb2YgdGhlIHBsdXJhbCBmb3JtXG4gIC8vIGV4cHJlc3Npb25zLiBUaGlzIG1lYW5zIHlvdSBjYW4gYnVpbGQgdGhpcyBjb2RlIG91dCBmb3IgdGhlIG1vc3RcbiAgLy8gcGFydC5cbiAgSmVkLlBGID0ge307XG5cbiAgSmVkLlBGLnBhcnNlID0gZnVuY3Rpb24gKCBwICkge1xuICAgIHZhciBwbHVyYWxfc3RyID0gSmVkLlBGLmV4dHJhY3RQbHVyYWxFeHByKCBwICk7XG4gICAgcmV0dXJuIEplZC5QRi5wYXJzZXIucGFyc2UuY2FsbChKZWQuUEYucGFyc2VyLCBwbHVyYWxfc3RyKTtcbiAgfTtcblxuICBKZWQuUEYuY29tcGlsZSA9IGZ1bmN0aW9uICggcCApIHtcbiAgICAvLyBIYW5kbGUgdHJ1ZXMgYW5kIGZhbHNlcyBhcyAwIGFuZCAxXG4gICAgZnVuY3Rpb24gaW1wbHkoIHZhbCApIHtcbiAgICAgIHJldHVybiAodmFsID09PSB0cnVlID8gMSA6IHZhbCA/IHZhbCA6IDApO1xuICAgIH1cblxuICAgIHZhciBhc3QgPSBKZWQuUEYucGFyc2UoIHAgKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCBuICkge1xuICAgICAgcmV0dXJuIGltcGx5KCBKZWQuUEYuaW50ZXJwcmV0ZXIoIGFzdCApKCBuICkgKTtcbiAgICB9O1xuICB9O1xuXG4gIEplZC5QRi5pbnRlcnByZXRlciA9IGZ1bmN0aW9uICggYXN0ICkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoIG4gKSB7XG4gICAgICB2YXIgcmVzO1xuICAgICAgc3dpdGNoICggYXN0LnR5cGUgKSB7XG4gICAgICAgIGNhc2UgJ0dST1VQJzpcbiAgICAgICAgICByZXR1cm4gSmVkLlBGLmludGVycHJldGVyKCBhc3QuZXhwciApKCBuICk7XG4gICAgICAgIGNhc2UgJ1RFUk5BUlknOlxuICAgICAgICAgIGlmICggSmVkLlBGLmludGVycHJldGVyKCBhc3QuZXhwciApKCBuICkgKSB7XG4gICAgICAgICAgICByZXR1cm4gSmVkLlBGLmludGVycHJldGVyKCBhc3QudHJ1dGh5ICkoIG4gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIEplZC5QRi5pbnRlcnByZXRlciggYXN0LmZhbHNleSApKCBuICk7XG4gICAgICAgIGNhc2UgJ09SJzpcbiAgICAgICAgICByZXR1cm4gSmVkLlBGLmludGVycHJldGVyKCBhc3QubGVmdCApKCBuICkgfHwgSmVkLlBGLmludGVycHJldGVyKCBhc3QucmlnaHQgKSggbiApO1xuICAgICAgICBjYXNlICdBTkQnOlxuICAgICAgICAgIHJldHVybiBKZWQuUEYuaW50ZXJwcmV0ZXIoIGFzdC5sZWZ0ICkoIG4gKSAmJiBKZWQuUEYuaW50ZXJwcmV0ZXIoIGFzdC5yaWdodCApKCBuICk7XG4gICAgICAgIGNhc2UgJ0xUJzpcbiAgICAgICAgICByZXR1cm4gSmVkLlBGLmludGVycHJldGVyKCBhc3QubGVmdCApKCBuICkgPCBKZWQuUEYuaW50ZXJwcmV0ZXIoIGFzdC5yaWdodCApKCBuICk7XG4gICAgICAgIGNhc2UgJ0dUJzpcbiAgICAgICAgICByZXR1cm4gSmVkLlBGLmludGVycHJldGVyKCBhc3QubGVmdCApKCBuICkgPiBKZWQuUEYuaW50ZXJwcmV0ZXIoIGFzdC5yaWdodCApKCBuICk7XG4gICAgICAgIGNhc2UgJ0xURSc6XG4gICAgICAgICAgcmV0dXJuIEplZC5QRi5pbnRlcnByZXRlciggYXN0LmxlZnQgKSggbiApIDw9IEplZC5QRi5pbnRlcnByZXRlciggYXN0LnJpZ2h0ICkoIG4gKTtcbiAgICAgICAgY2FzZSAnR1RFJzpcbiAgICAgICAgICByZXR1cm4gSmVkLlBGLmludGVycHJldGVyKCBhc3QubGVmdCApKCBuICkgPj0gSmVkLlBGLmludGVycHJldGVyKCBhc3QucmlnaHQgKSggbiApO1xuICAgICAgICBjYXNlICdFUSc6XG4gICAgICAgICAgcmV0dXJuIEplZC5QRi5pbnRlcnByZXRlciggYXN0LmxlZnQgKSggbiApID09IEplZC5QRi5pbnRlcnByZXRlciggYXN0LnJpZ2h0ICkoIG4gKTtcbiAgICAgICAgY2FzZSAnTkVRJzpcbiAgICAgICAgICByZXR1cm4gSmVkLlBGLmludGVycHJldGVyKCBhc3QubGVmdCApKCBuICkgIT0gSmVkLlBGLmludGVycHJldGVyKCBhc3QucmlnaHQgKSggbiApO1xuICAgICAgICBjYXNlICdNT0QnOlxuICAgICAgICAgIHJldHVybiBKZWQuUEYuaW50ZXJwcmV0ZXIoIGFzdC5sZWZ0ICkoIG4gKSAlIEplZC5QRi5pbnRlcnByZXRlciggYXN0LnJpZ2h0ICkoIG4gKTtcbiAgICAgICAgY2FzZSAnVkFSJzpcbiAgICAgICAgICByZXR1cm4gbjtcbiAgICAgICAgY2FzZSAnTlVNJzpcbiAgICAgICAgICByZXR1cm4gYXN0LnZhbDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIFRva2VuIGZvdW5kLlwiKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIEplZC5QRi5leHRyYWN0UGx1cmFsRXhwciA9IGZ1bmN0aW9uICggcCApIHtcbiAgICAvLyB0cmltIGZpcnN0XG4gICAgcCA9IHAucmVwbGFjZSgvXlxcc1xccyovLCAnJykucmVwbGFjZSgvXFxzXFxzKiQvLCAnJyk7XG5cbiAgICBpZiAoISAvO1xccyokLy50ZXN0KHApKSB7XG4gICAgICBwID0gcC5jb25jYXQoJzsnKTtcbiAgICB9XG5cbiAgICB2YXIgbnBsdXJhbHNfcmUgPSAvbnBsdXJhbHNcXD0oXFxkKyk7LyxcbiAgICAgICAgcGx1cmFsX3JlID0gL3BsdXJhbFxcPSguKik7LyxcbiAgICAgICAgbnBsdXJhbHNfbWF0Y2hlcyA9IHAubWF0Y2goIG5wbHVyYWxzX3JlICksXG4gICAgICAgIHJlcyA9IHt9LFxuICAgICAgICBwbHVyYWxfbWF0Y2hlcztcblxuICAgIC8vIEZpbmQgdGhlIG5wbHVyYWxzIG51bWJlclxuICAgIGlmICggbnBsdXJhbHNfbWF0Y2hlcy5sZW5ndGggPiAxICkge1xuICAgICAgcmVzLm5wbHVyYWxzID0gbnBsdXJhbHNfbWF0Y2hlc1sxXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25wbHVyYWxzIG5vdCBmb3VuZCBpbiBwbHVyYWxfZm9ybXMgc3RyaW5nOiAnICsgcCApO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSB0aGF0IGRhdGEgdG8gZ2V0IHRvIHRoZSBmb3JtdWxhXG4gICAgcCA9IHAucmVwbGFjZSggbnBsdXJhbHNfcmUsIFwiXCIgKTtcbiAgICBwbHVyYWxfbWF0Y2hlcyA9IHAubWF0Y2goIHBsdXJhbF9yZSApO1xuXG4gICAgaWYgKCEoIHBsdXJhbF9tYXRjaGVzICYmIHBsdXJhbF9tYXRjaGVzLmxlbmd0aCA+IDEgKSApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHBsdXJhbGAgZXhwcmVzc2lvbiBub3QgZm91bmQ6ICcgKyBwKTtcbiAgICB9XG4gICAgcmV0dXJuIHBsdXJhbF9tYXRjaGVzWyAxIF07XG4gIH07XG5cbiAgLyogSmlzb24gZ2VuZXJhdGVkIHBhcnNlciAqL1xuICBKZWQuUEYucGFyc2VyID0gKGZ1bmN0aW9uKCl7XG5cbnZhciBwYXJzZXIgPSB7dHJhY2U6IGZ1bmN0aW9uIHRyYWNlKCkgeyB9LFxueXk6IHt9LFxuc3ltYm9sc186IHtcImVycm9yXCI6MixcImV4cHJlc3Npb25zXCI6MyxcImVcIjo0LFwiRU9GXCI6NSxcIj9cIjo2LFwiOlwiOjcsXCJ8fFwiOjgsXCImJlwiOjksXCI8XCI6MTAsXCI8PVwiOjExLFwiPlwiOjEyLFwiPj1cIjoxMyxcIiE9XCI6MTQsXCI9PVwiOjE1LFwiJVwiOjE2LFwiKFwiOjE3LFwiKVwiOjE4LFwiblwiOjE5LFwiTlVNQkVSXCI6MjAsXCIkYWNjZXB0XCI6MCxcIiRlbmRcIjoxfSxcbnRlcm1pbmFsc186IHsyOlwiZXJyb3JcIiw1OlwiRU9GXCIsNjpcIj9cIiw3OlwiOlwiLDg6XCJ8fFwiLDk6XCImJlwiLDEwOlwiPFwiLDExOlwiPD1cIiwxMjpcIj5cIiwxMzpcIj49XCIsMTQ6XCIhPVwiLDE1OlwiPT1cIiwxNjpcIiVcIiwxNzpcIihcIiwxODpcIilcIiwxOTpcIm5cIiwyMDpcIk5VTUJFUlwifSxcbnByb2R1Y3Rpb25zXzogWzAsWzMsMl0sWzQsNV0sWzQsM10sWzQsM10sWzQsM10sWzQsM10sWzQsM10sWzQsM10sWzQsM10sWzQsM10sWzQsM10sWzQsM10sWzQsMV0sWzQsMV1dLFxucGVyZm9ybUFjdGlvbjogZnVuY3Rpb24gYW5vbnltb3VzKHl5dGV4dCx5eWxlbmcseXlsaW5lbm8seXkseXlzdGF0ZSwkJCxfJCkge1xuXG52YXIgJDAgPSAkJC5sZW5ndGggLSAxO1xuc3dpdGNoICh5eXN0YXRlKSB7XG5jYXNlIDE6IHJldHVybiB7IHR5cGUgOiAnR1JPVVAnLCBleHByOiAkJFskMC0xXSB9O1xuYnJlYWs7XG5jYXNlIDI6dGhpcy4kID0geyB0eXBlOiAnVEVSTkFSWScsIGV4cHI6ICQkWyQwLTRdLCB0cnV0aHkgOiAkJFskMC0yXSwgZmFsc2V5OiAkJFskMF0gfTtcbmJyZWFrO1xuY2FzZSAzOnRoaXMuJCA9IHsgdHlwZTogXCJPUlwiLCBsZWZ0OiAkJFskMC0yXSwgcmlnaHQ6ICQkWyQwXSB9O1xuYnJlYWs7XG5jYXNlIDQ6dGhpcy4kID0geyB0eXBlOiBcIkFORFwiLCBsZWZ0OiAkJFskMC0yXSwgcmlnaHQ6ICQkWyQwXSB9O1xuYnJlYWs7XG5jYXNlIDU6dGhpcy4kID0geyB0eXBlOiAnTFQnLCBsZWZ0OiAkJFskMC0yXSwgcmlnaHQ6ICQkWyQwXSB9O1xuYnJlYWs7XG5jYXNlIDY6dGhpcy4kID0geyB0eXBlOiAnTFRFJywgbGVmdDogJCRbJDAtMl0sIHJpZ2h0OiAkJFskMF0gfTtcbmJyZWFrO1xuY2FzZSA3OnRoaXMuJCA9IHsgdHlwZTogJ0dUJywgbGVmdDogJCRbJDAtMl0sIHJpZ2h0OiAkJFskMF0gfTtcbmJyZWFrO1xuY2FzZSA4OnRoaXMuJCA9IHsgdHlwZTogJ0dURScsIGxlZnQ6ICQkWyQwLTJdLCByaWdodDogJCRbJDBdIH07XG5icmVhaztcbmNhc2UgOTp0aGlzLiQgPSB7IHR5cGU6ICdORVEnLCBsZWZ0OiAkJFskMC0yXSwgcmlnaHQ6ICQkWyQwXSB9O1xuYnJlYWs7XG5jYXNlIDEwOnRoaXMuJCA9IHsgdHlwZTogJ0VRJywgbGVmdDogJCRbJDAtMl0sIHJpZ2h0OiAkJFskMF0gfTtcbmJyZWFrO1xuY2FzZSAxMTp0aGlzLiQgPSB7IHR5cGU6ICdNT0QnLCBsZWZ0OiAkJFskMC0yXSwgcmlnaHQ6ICQkWyQwXSB9O1xuYnJlYWs7XG5jYXNlIDEyOnRoaXMuJCA9IHsgdHlwZTogJ0dST1VQJywgZXhwcjogJCRbJDAtMV0gfTtcbmJyZWFrO1xuY2FzZSAxMzp0aGlzLiQgPSB7IHR5cGU6ICdWQVInIH07XG5icmVhaztcbmNhc2UgMTQ6dGhpcy4kID0geyB0eXBlOiAnTlVNJywgdmFsOiBOdW1iZXIoeXl0ZXh0KSB9O1xuYnJlYWs7XG59XG59LFxudGFibGU6IFt7MzoxLDQ6MiwxNzpbMSwzXSwxOTpbMSw0XSwyMDpbMSw1XX0sezE6WzNdfSx7NTpbMSw2XSw2OlsxLDddLDg6WzEsOF0sOTpbMSw5XSwxMDpbMSwxMF0sMTE6WzEsMTFdLDEyOlsxLDEyXSwxMzpbMSwxM10sMTQ6WzEsMTRdLDE1OlsxLDE1XSwxNjpbMSwxNl19LHs0OjE3LDE3OlsxLDNdLDE5OlsxLDRdLDIwOlsxLDVdfSx7NTpbMiwxM10sNjpbMiwxM10sNzpbMiwxM10sODpbMiwxM10sOTpbMiwxM10sMTA6WzIsMTNdLDExOlsyLDEzXSwxMjpbMiwxM10sMTM6WzIsMTNdLDE0OlsyLDEzXSwxNTpbMiwxM10sMTY6WzIsMTNdLDE4OlsyLDEzXX0sezU6WzIsMTRdLDY6WzIsMTRdLDc6WzIsMTRdLDg6WzIsMTRdLDk6WzIsMTRdLDEwOlsyLDE0XSwxMTpbMiwxNF0sMTI6WzIsMTRdLDEzOlsyLDE0XSwxNDpbMiwxNF0sMTU6WzIsMTRdLDE2OlsyLDE0XSwxODpbMiwxNF19LHsxOlsyLDFdfSx7NDoxOCwxNzpbMSwzXSwxOTpbMSw0XSwyMDpbMSw1XX0sezQ6MTksMTc6WzEsM10sMTk6WzEsNF0sMjA6WzEsNV19LHs0OjIwLDE3OlsxLDNdLDE5OlsxLDRdLDIwOlsxLDVdfSx7NDoyMSwxNzpbMSwzXSwxOTpbMSw0XSwyMDpbMSw1XX0sezQ6MjIsMTc6WzEsM10sMTk6WzEsNF0sMjA6WzEsNV19LHs0OjIzLDE3OlsxLDNdLDE5OlsxLDRdLDIwOlsxLDVdfSx7NDoyNCwxNzpbMSwzXSwxOTpbMSw0XSwyMDpbMSw1XX0sezQ6MjUsMTc6WzEsM10sMTk6WzEsNF0sMjA6WzEsNV19LHs0OjI2LDE3OlsxLDNdLDE5OlsxLDRdLDIwOlsxLDVdfSx7NDoyNywxNzpbMSwzXSwxOTpbMSw0XSwyMDpbMSw1XX0sezY6WzEsN10sODpbMSw4XSw5OlsxLDldLDEwOlsxLDEwXSwxMTpbMSwxMV0sMTI6WzEsMTJdLDEzOlsxLDEzXSwxNDpbMSwxNF0sMTU6WzEsMTVdLDE2OlsxLDE2XSwxODpbMSwyOF19LHs2OlsxLDddLDc6WzEsMjldLDg6WzEsOF0sOTpbMSw5XSwxMDpbMSwxMF0sMTE6WzEsMTFdLDEyOlsxLDEyXSwxMzpbMSwxM10sMTQ6WzEsMTRdLDE1OlsxLDE1XSwxNjpbMSwxNl19LHs1OlsyLDNdLDY6WzIsM10sNzpbMiwzXSw4OlsyLDNdLDk6WzEsOV0sMTA6WzEsMTBdLDExOlsxLDExXSwxMjpbMSwxMl0sMTM6WzEsMTNdLDE0OlsxLDE0XSwxNTpbMSwxNV0sMTY6WzEsMTZdLDE4OlsyLDNdfSx7NTpbMiw0XSw2OlsyLDRdLDc6WzIsNF0sODpbMiw0XSw5OlsyLDRdLDEwOlsxLDEwXSwxMTpbMSwxMV0sMTI6WzEsMTJdLDEzOlsxLDEzXSwxNDpbMSwxNF0sMTU6WzEsMTVdLDE2OlsxLDE2XSwxODpbMiw0XX0sezU6WzIsNV0sNjpbMiw1XSw3OlsyLDVdLDg6WzIsNV0sOTpbMiw1XSwxMDpbMiw1XSwxMTpbMiw1XSwxMjpbMiw1XSwxMzpbMiw1XSwxNDpbMiw1XSwxNTpbMiw1XSwxNjpbMSwxNl0sMTg6WzIsNV19LHs1OlsyLDZdLDY6WzIsNl0sNzpbMiw2XSw4OlsyLDZdLDk6WzIsNl0sMTA6WzIsNl0sMTE6WzIsNl0sMTI6WzIsNl0sMTM6WzIsNl0sMTQ6WzIsNl0sMTU6WzIsNl0sMTY6WzEsMTZdLDE4OlsyLDZdfSx7NTpbMiw3XSw2OlsyLDddLDc6WzIsN10sODpbMiw3XSw5OlsyLDddLDEwOlsyLDddLDExOlsyLDddLDEyOlsyLDddLDEzOlsyLDddLDE0OlsyLDddLDE1OlsyLDddLDE2OlsxLDE2XSwxODpbMiw3XX0sezU6WzIsOF0sNjpbMiw4XSw3OlsyLDhdLDg6WzIsOF0sOTpbMiw4XSwxMDpbMiw4XSwxMTpbMiw4XSwxMjpbMiw4XSwxMzpbMiw4XSwxNDpbMiw4XSwxNTpbMiw4XSwxNjpbMSwxNl0sMTg6WzIsOF19LHs1OlsyLDldLDY6WzIsOV0sNzpbMiw5XSw4OlsyLDldLDk6WzIsOV0sMTA6WzIsOV0sMTE6WzIsOV0sMTI6WzIsOV0sMTM6WzIsOV0sMTQ6WzIsOV0sMTU6WzIsOV0sMTY6WzEsMTZdLDE4OlsyLDldfSx7NTpbMiwxMF0sNjpbMiwxMF0sNzpbMiwxMF0sODpbMiwxMF0sOTpbMiwxMF0sMTA6WzIsMTBdLDExOlsyLDEwXSwxMjpbMiwxMF0sMTM6WzIsMTBdLDE0OlsyLDEwXSwxNTpbMiwxMF0sMTY6WzEsMTZdLDE4OlsyLDEwXX0sezU6WzIsMTFdLDY6WzIsMTFdLDc6WzIsMTFdLDg6WzIsMTFdLDk6WzIsMTFdLDEwOlsyLDExXSwxMTpbMiwxMV0sMTI6WzIsMTFdLDEzOlsyLDExXSwxNDpbMiwxMV0sMTU6WzIsMTFdLDE2OlsyLDExXSwxODpbMiwxMV19LHs1OlsyLDEyXSw2OlsyLDEyXSw3OlsyLDEyXSw4OlsyLDEyXSw5OlsyLDEyXSwxMDpbMiwxMl0sMTE6WzIsMTJdLDEyOlsyLDEyXSwxMzpbMiwxMl0sMTQ6WzIsMTJdLDE1OlsyLDEyXSwxNjpbMiwxMl0sMTg6WzIsMTJdfSx7NDozMCwxNzpbMSwzXSwxOTpbMSw0XSwyMDpbMSw1XX0sezU6WzIsMl0sNjpbMSw3XSw3OlsyLDJdLDg6WzEsOF0sOTpbMSw5XSwxMDpbMSwxMF0sMTE6WzEsMTFdLDEyOlsxLDEyXSwxMzpbMSwxM10sMTQ6WzEsMTRdLDE1OlsxLDE1XSwxNjpbMSwxNl0sMTg6WzIsMl19XSxcbmRlZmF1bHRBY3Rpb25zOiB7NjpbMiwxXX0sXG5wYXJzZUVycm9yOiBmdW5jdGlvbiBwYXJzZUVycm9yKHN0ciwgaGFzaCkge1xuICAgIHRocm93IG5ldyBFcnJvcihzdHIpO1xufSxcbnBhcnNlOiBmdW5jdGlvbiBwYXJzZShpbnB1dCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgc3RhY2sgPSBbMF0sXG4gICAgICAgIHZzdGFjayA9IFtudWxsXSwgLy8gc2VtYW50aWMgdmFsdWUgc3RhY2tcbiAgICAgICAgbHN0YWNrID0gW10sIC8vIGxvY2F0aW9uIHN0YWNrXG4gICAgICAgIHRhYmxlID0gdGhpcy50YWJsZSxcbiAgICAgICAgeXl0ZXh0ID0gJycsXG4gICAgICAgIHl5bGluZW5vID0gMCxcbiAgICAgICAgeXlsZW5nID0gMCxcbiAgICAgICAgcmVjb3ZlcmluZyA9IDAsXG4gICAgICAgIFRFUlJPUiA9IDIsXG4gICAgICAgIEVPRiA9IDE7XG5cbiAgICAvL3RoaXMucmVkdWN0aW9uQ291bnQgPSB0aGlzLnNoaWZ0Q291bnQgPSAwO1xuXG4gICAgdGhpcy5sZXhlci5zZXRJbnB1dChpbnB1dCk7XG4gICAgdGhpcy5sZXhlci55eSA9IHRoaXMueXk7XG4gICAgdGhpcy55eS5sZXhlciA9IHRoaXMubGV4ZXI7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmxleGVyLnl5bGxvYyA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgdGhpcy5sZXhlci55eWxsb2MgPSB7fTtcbiAgICB2YXIgeXlsb2MgPSB0aGlzLmxleGVyLnl5bGxvYztcbiAgICBsc3RhY2sucHVzaCh5eWxvYyk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMueXkucGFyc2VFcnJvciA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgdGhpcy5wYXJzZUVycm9yID0gdGhpcy55eS5wYXJzZUVycm9yO1xuXG4gICAgZnVuY3Rpb24gcG9wU3RhY2sgKG4pIHtcbiAgICAgICAgc3RhY2subGVuZ3RoID0gc3RhY2subGVuZ3RoIC0gMipuO1xuICAgICAgICB2c3RhY2subGVuZ3RoID0gdnN0YWNrLmxlbmd0aCAtIG47XG4gICAgICAgIGxzdGFjay5sZW5ndGggPSBsc3RhY2subGVuZ3RoIC0gbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsZXgoKSB7XG4gICAgICAgIHZhciB0b2tlbjtcbiAgICAgICAgdG9rZW4gPSBzZWxmLmxleGVyLmxleCgpIHx8IDE7IC8vICRlbmQgPSAxXG4gICAgICAgIC8vIGlmIHRva2VuIGlzbid0IGl0cyBudW1lcmljIHZhbHVlLCBjb252ZXJ0XG4gICAgICAgIGlmICh0eXBlb2YgdG9rZW4gIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHNlbGYuc3ltYm9sc19bdG9rZW5dIHx8IHRva2VuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG5cbiAgICB2YXIgc3ltYm9sLCBwcmVFcnJvclN5bWJvbCwgc3RhdGUsIGFjdGlvbiwgYSwgciwgeXl2YWw9e30scCxsZW4sbmV3U3RhdGUsIGV4cGVjdGVkO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIC8vIHJldHJlaXZlIHN0YXRlIG51bWJlciBmcm9tIHRvcCBvZiBzdGFja1xuICAgICAgICBzdGF0ZSA9IHN0YWNrW3N0YWNrLmxlbmd0aC0xXTtcblxuICAgICAgICAvLyB1c2UgZGVmYXVsdCBhY3Rpb25zIGlmIGF2YWlsYWJsZVxuICAgICAgICBpZiAodGhpcy5kZWZhdWx0QWN0aW9uc1tzdGF0ZV0pIHtcbiAgICAgICAgICAgIGFjdGlvbiA9IHRoaXMuZGVmYXVsdEFjdGlvbnNbc3RhdGVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHN5bWJvbCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHN5bWJvbCA9IGxleCgpO1xuICAgICAgICAgICAgLy8gcmVhZCBhY3Rpb24gZm9yIGN1cnJlbnQgc3RhdGUgYW5kIGZpcnN0IGlucHV0XG4gICAgICAgICAgICBhY3Rpb24gPSB0YWJsZVtzdGF0ZV0gJiYgdGFibGVbc3RhdGVdW3N5bWJvbF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoYW5kbGUgcGFyc2UgZXJyb3JcbiAgICAgICAgX2hhbmRsZV9lcnJvcjpcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICd1bmRlZmluZWQnIHx8ICFhY3Rpb24ubGVuZ3RoIHx8ICFhY3Rpb25bMF0pIHtcblxuICAgICAgICAgICAgaWYgKCFyZWNvdmVyaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVwb3J0IGVycm9yXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHAgaW4gdGFibGVbc3RhdGVdKSBpZiAodGhpcy50ZXJtaW5hbHNfW3BdICYmIHAgPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkLnB1c2goXCInXCIrdGhpcy50ZXJtaW5hbHNfW3BdK1wiJ1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGVyclN0ciA9ICcnO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxleGVyLnNob3dQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBlcnJTdHIgPSAnUGFyc2UgZXJyb3Igb24gbGluZSAnKyh5eWxpbmVubysxKStcIjpcXG5cIit0aGlzLmxleGVyLnNob3dQb3NpdGlvbigpK1wiXFxuRXhwZWN0aW5nIFwiK2V4cGVjdGVkLmpvaW4oJywgJykgKyBcIiwgZ290ICdcIiArIHRoaXMudGVybWluYWxzX1tzeW1ib2xdKyBcIidcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlcnJTdHIgPSAnUGFyc2UgZXJyb3Igb24gbGluZSAnKyh5eWxpbmVubysxKStcIjogVW5leHBlY3RlZCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN5bWJvbCA9PSAxIC8qRU9GKi8gPyBcImVuZCBvZiBpbnB1dFwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoXCInXCIrKHRoaXMudGVybWluYWxzX1tzeW1ib2xdIHx8IHN5bWJvbCkrXCInXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUVycm9yKGVyclN0cixcbiAgICAgICAgICAgICAgICAgICAge3RleHQ6IHRoaXMubGV4ZXIubWF0Y2gsIHRva2VuOiB0aGlzLnRlcm1pbmFsc19bc3ltYm9sXSB8fCBzeW1ib2wsIGxpbmU6IHRoaXMubGV4ZXIueXlsaW5lbm8sIGxvYzogeXlsb2MsIGV4cGVjdGVkOiBleHBlY3RlZH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBqdXN0IHJlY292ZXJlZCBmcm9tIGFub3RoZXIgZXJyb3JcbiAgICAgICAgICAgIGlmIChyZWNvdmVyaW5nID09IDMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ltYm9sID09IEVPRikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyU3RyIHx8ICdQYXJzaW5nIGhhbHRlZC4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBkaXNjYXJkIGN1cnJlbnQgbG9va2FoZWFkIGFuZCBncmFiIGFub3RoZXJcbiAgICAgICAgICAgICAgICB5eWxlbmcgPSB0aGlzLmxleGVyLnl5bGVuZztcbiAgICAgICAgICAgICAgICB5eXRleHQgPSB0aGlzLmxleGVyLnl5dGV4dDtcbiAgICAgICAgICAgICAgICB5eWxpbmVubyA9IHRoaXMubGV4ZXIueXlsaW5lbm87XG4gICAgICAgICAgICAgICAgeXlsb2MgPSB0aGlzLmxleGVyLnl5bGxvYztcbiAgICAgICAgICAgICAgICBzeW1ib2wgPSBsZXgoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdHJ5IHRvIHJlY292ZXIgZnJvbSBlcnJvclxuICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3IgZXJyb3IgcmVjb3ZlcnkgcnVsZSBpbiB0aGlzIHN0YXRlXG4gICAgICAgICAgICAgICAgaWYgKChURVJST1IudG9TdHJpbmcoKSkgaW4gdGFibGVbc3RhdGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyU3RyIHx8ICdQYXJzaW5nIGhhbHRlZC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9wU3RhY2soMSk7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBzdGFja1tzdGFjay5sZW5ndGgtMV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByZUVycm9yU3ltYm9sID0gc3ltYm9sOyAvLyBzYXZlIHRoZSBsb29rYWhlYWQgdG9rZW5cbiAgICAgICAgICAgIHN5bWJvbCA9IFRFUlJPUjsgICAgICAgICAvLyBpbnNlcnQgZ2VuZXJpYyBlcnJvciBzeW1ib2wgYXMgbmV3IGxvb2thaGVhZFxuICAgICAgICAgICAgc3RhdGUgPSBzdGFja1tzdGFjay5sZW5ndGgtMV07XG4gICAgICAgICAgICBhY3Rpb24gPSB0YWJsZVtzdGF0ZV0gJiYgdGFibGVbc3RhdGVdW1RFUlJPUl07XG4gICAgICAgICAgICByZWNvdmVyaW5nID0gMzsgLy8gYWxsb3cgMyByZWFsIHN5bWJvbHMgdG8gYmUgc2hpZnRlZCBiZWZvcmUgcmVwb3J0aW5nIGEgbmV3IGVycm9yXG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzIHNob3VsZG4ndCBoYXBwZW4sIHVubGVzcyByZXNvbHZlIGRlZmF1bHRzIGFyZSBvZmZcbiAgICAgICAgaWYgKGFjdGlvblswXSBpbnN0YW5jZW9mIEFycmF5ICYmIGFjdGlvbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcnNlIEVycm9yOiBtdWx0aXBsZSBhY3Rpb25zIHBvc3NpYmxlIGF0IHN0YXRlOiAnK3N0YXRlKycsIHRva2VuOiAnK3N5bWJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGFjdGlvblswXSkge1xuXG4gICAgICAgICAgICBjYXNlIDE6IC8vIHNoaWZ0XG4gICAgICAgICAgICAgICAgLy90aGlzLnNoaWZ0Q291bnQrKztcblxuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goc3ltYm9sKTtcbiAgICAgICAgICAgICAgICB2c3RhY2sucHVzaCh0aGlzLmxleGVyLnl5dGV4dCk7XG4gICAgICAgICAgICAgICAgbHN0YWNrLnB1c2godGhpcy5sZXhlci55eWxsb2MpO1xuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goYWN0aW9uWzFdKTsgLy8gcHVzaCBzdGF0ZVxuICAgICAgICAgICAgICAgIHN5bWJvbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmVFcnJvclN5bWJvbCkgeyAvLyBub3JtYWwgZXhlY3V0aW9uL25vIGVycm9yXG4gICAgICAgICAgICAgICAgICAgIHl5bGVuZyA9IHRoaXMubGV4ZXIueXlsZW5nO1xuICAgICAgICAgICAgICAgICAgICB5eXRleHQgPSB0aGlzLmxleGVyLnl5dGV4dDtcbiAgICAgICAgICAgICAgICAgICAgeXlsaW5lbm8gPSB0aGlzLmxleGVyLnl5bGluZW5vO1xuICAgICAgICAgICAgICAgICAgICB5eWxvYyA9IHRoaXMubGV4ZXIueXlsbG9jO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3ZlcmluZyA+IDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvdmVyaW5nLS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gZXJyb3IganVzdCBvY2N1cnJlZCwgcmVzdW1lIG9sZCBsb29rYWhlYWQgZi8gYmVmb3JlIGVycm9yXG4gICAgICAgICAgICAgICAgICAgIHN5bWJvbCA9IHByZUVycm9yU3ltYm9sO1xuICAgICAgICAgICAgICAgICAgICBwcmVFcnJvclN5bWJvbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDI6IC8vIHJlZHVjZVxuICAgICAgICAgICAgICAgIC8vdGhpcy5yZWR1Y3Rpb25Db3VudCsrO1xuXG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5wcm9kdWN0aW9uc19bYWN0aW9uWzFdXVsxXTtcblxuICAgICAgICAgICAgICAgIC8vIHBlcmZvcm0gc2VtYW50aWMgYWN0aW9uXG4gICAgICAgICAgICAgICAgeXl2YWwuJCA9IHZzdGFja1t2c3RhY2subGVuZ3RoLWxlbl07IC8vIGRlZmF1bHQgdG8gJCQgPSAkMVxuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgbG9jYXRpb24sIHVzZXMgZmlyc3QgdG9rZW4gZm9yIGZpcnN0cywgbGFzdCBmb3IgbGFzdHNcbiAgICAgICAgICAgICAgICB5eXZhbC5fJCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RfbGluZTogbHN0YWNrW2xzdGFjay5sZW5ndGgtKGxlbnx8MSldLmZpcnN0X2xpbmUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3RfbGluZTogbHN0YWNrW2xzdGFjay5sZW5ndGgtMV0ubGFzdF9saW5lLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdF9jb2x1bW46IGxzdGFja1tsc3RhY2subGVuZ3RoLShsZW58fDEpXS5maXJzdF9jb2x1bW4sXG4gICAgICAgICAgICAgICAgICAgIGxhc3RfY29sdW1uOiBsc3RhY2tbbHN0YWNrLmxlbmd0aC0xXS5sYXN0X2NvbHVtblxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgciA9IHRoaXMucGVyZm9ybUFjdGlvbi5jYWxsKHl5dmFsLCB5eXRleHQsIHl5bGVuZywgeXlsaW5lbm8sIHRoaXMueXksIGFjdGlvblsxXSwgdnN0YWNrLCBsc3RhY2spO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBwb3Agb2ZmIHN0YWNrXG4gICAgICAgICAgICAgICAgaWYgKGxlbikge1xuICAgICAgICAgICAgICAgICAgICBzdGFjayA9IHN0YWNrLnNsaWNlKDAsLTEqbGVuKjIpO1xuICAgICAgICAgICAgICAgICAgICB2c3RhY2sgPSB2c3RhY2suc2xpY2UoMCwgLTEqbGVuKTtcbiAgICAgICAgICAgICAgICAgICAgbHN0YWNrID0gbHN0YWNrLnNsaWNlKDAsIC0xKmxlbik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaCh0aGlzLnByb2R1Y3Rpb25zX1thY3Rpb25bMV1dWzBdKTsgICAgLy8gcHVzaCBub250ZXJtaW5hbCAocmVkdWNlKVxuICAgICAgICAgICAgICAgIHZzdGFjay5wdXNoKHl5dmFsLiQpO1xuICAgICAgICAgICAgICAgIGxzdGFjay5wdXNoKHl5dmFsLl8kKTtcbiAgICAgICAgICAgICAgICAvLyBnb3RvIG5ldyBzdGF0ZSA9IHRhYmxlW1NUQVRFXVtOT05URVJNSU5BTF1cbiAgICAgICAgICAgICAgICBuZXdTdGF0ZSA9IHRhYmxlW3N0YWNrW3N0YWNrLmxlbmd0aC0yXV1bc3RhY2tbc3RhY2subGVuZ3RoLTFdXTtcbiAgICAgICAgICAgICAgICBzdGFjay5wdXNoKG5ld1N0YXRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAzOiAvLyBhY2NlcHRcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59fTsvKiBKaXNvbiBnZW5lcmF0ZWQgbGV4ZXIgKi9cbnZhciBsZXhlciA9IChmdW5jdGlvbigpe1xuXG52YXIgbGV4ZXIgPSAoe0VPRjoxLFxucGFyc2VFcnJvcjpmdW5jdGlvbiBwYXJzZUVycm9yKHN0ciwgaGFzaCkge1xuICAgICAgICBpZiAodGhpcy55eS5wYXJzZUVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLnl5LnBhcnNlRXJyb3Ioc3RyLCBoYXNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihzdHIpO1xuICAgICAgICB9XG4gICAgfSxcbnNldElucHV0OmZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuICAgICAgICB0aGlzLl9tb3JlID0gdGhpcy5fbGVzcyA9IHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnl5bGluZW5vID0gdGhpcy55eWxlbmcgPSAwO1xuICAgICAgICB0aGlzLnl5dGV4dCA9IHRoaXMubWF0Y2hlZCA9IHRoaXMubWF0Y2ggPSAnJztcbiAgICAgICAgdGhpcy5jb25kaXRpb25TdGFjayA9IFsnSU5JVElBTCddO1xuICAgICAgICB0aGlzLnl5bGxvYyA9IHtmaXJzdF9saW5lOjEsZmlyc3RfY29sdW1uOjAsbGFzdF9saW5lOjEsbGFzdF9jb2x1bW46MH07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5pbnB1dDpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaCA9IHRoaXMuX2lucHV0WzBdO1xuICAgICAgICB0aGlzLnl5dGV4dCs9Y2g7XG4gICAgICAgIHRoaXMueXlsZW5nKys7XG4gICAgICAgIHRoaXMubWF0Y2grPWNoO1xuICAgICAgICB0aGlzLm1hdGNoZWQrPWNoO1xuICAgICAgICB2YXIgbGluZXMgPSBjaC5tYXRjaCgvXFxuLyk7XG4gICAgICAgIGlmIChsaW5lcykgdGhpcy55eWxpbmVubysrO1xuICAgICAgICB0aGlzLl9pbnB1dCA9IHRoaXMuX2lucHV0LnNsaWNlKDEpO1xuICAgICAgICByZXR1cm4gY2g7XG4gICAgfSxcbnVucHV0OmZ1bmN0aW9uIChjaCkge1xuICAgICAgICB0aGlzLl9pbnB1dCA9IGNoICsgdGhpcy5faW5wdXQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5tb3JlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fbW9yZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5wYXN0SW5wdXQ6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFzdCA9IHRoaXMubWF0Y2hlZC5zdWJzdHIoMCwgdGhpcy5tYXRjaGVkLmxlbmd0aCAtIHRoaXMubWF0Y2gubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIChwYXN0Lmxlbmd0aCA+IDIwID8gJy4uLic6JycpICsgcGFzdC5zdWJzdHIoLTIwKS5yZXBsYWNlKC9cXG4vZywgXCJcIik7XG4gICAgfSxcbnVwY29taW5nSW5wdXQ6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmV4dCA9IHRoaXMubWF0Y2g7XG4gICAgICAgIGlmIChuZXh0Lmxlbmd0aCA8IDIwKSB7XG4gICAgICAgICAgICBuZXh0ICs9IHRoaXMuX2lucHV0LnN1YnN0cigwLCAyMC1uZXh0Lmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChuZXh0LnN1YnN0cigwLDIwKSsobmV4dC5sZW5ndGggPiAyMCA/ICcuLi4nOicnKSkucmVwbGFjZSgvXFxuL2csIFwiXCIpO1xuICAgIH0sXG5zaG93UG9zaXRpb246ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJlID0gdGhpcy5wYXN0SW5wdXQoKTtcbiAgICAgICAgdmFyIGMgPSBuZXcgQXJyYXkocHJlLmxlbmd0aCArIDEpLmpvaW4oXCItXCIpO1xuICAgICAgICByZXR1cm4gcHJlICsgdGhpcy51cGNvbWluZ0lucHV0KCkgKyBcIlxcblwiICsgYytcIl5cIjtcbiAgICB9LFxubmV4dDpmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkVPRjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2lucHV0KSB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICAgIHZhciB0b2tlbixcbiAgICAgICAgICAgIG1hdGNoLFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgbGluZXM7XG4gICAgICAgIGlmICghdGhpcy5fbW9yZSkge1xuICAgICAgICAgICAgdGhpcy55eXRleHQgPSAnJztcbiAgICAgICAgICAgIHRoaXMubWF0Y2ggPSAnJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgcnVsZXMgPSB0aGlzLl9jdXJyZW50UnVsZXMoKTtcbiAgICAgICAgZm9yICh2YXIgaT0wO2kgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbWF0Y2ggPSB0aGlzLl9pbnB1dC5tYXRjaCh0aGlzLnJ1bGVzW3J1bGVzW2ldXSk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBsaW5lcyA9IG1hdGNoWzBdLm1hdGNoKC9cXG4uKi9nKTtcbiAgICAgICAgICAgICAgICBpZiAobGluZXMpIHRoaXMueXlsaW5lbm8gKz0gbGluZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMueXlsbG9jID0ge2ZpcnN0X2xpbmU6IHRoaXMueXlsbG9jLmxhc3RfbGluZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X2xpbmU6IHRoaXMueXlsaW5lbm8rMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdF9jb2x1bW46IHRoaXMueXlsbG9jLmxhc3RfY29sdW1uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfY29sdW1uOiBsaW5lcyA/IGxpbmVzW2xpbmVzLmxlbmd0aC0xXS5sZW5ndGgtMSA6IHRoaXMueXlsbG9jLmxhc3RfY29sdW1uICsgbWF0Y2hbMF0ubGVuZ3RofVxuICAgICAgICAgICAgICAgIHRoaXMueXl0ZXh0ICs9IG1hdGNoWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2ggKz0gbWF0Y2hbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVzID0gbWF0Y2g7XG4gICAgICAgICAgICAgICAgdGhpcy55eWxlbmcgPSB0aGlzLnl5dGV4dC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9yZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lucHV0ID0gdGhpcy5faW5wdXQuc2xpY2UobWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZWQgKz0gbWF0Y2hbMF07XG4gICAgICAgICAgICAgICAgdG9rZW4gPSB0aGlzLnBlcmZvcm1BY3Rpb24uY2FsbCh0aGlzLCB0aGlzLnl5LCB0aGlzLCBydWxlc1tpXSx0aGlzLmNvbmRpdGlvblN0YWNrW3RoaXMuY29uZGl0aW9uU3RhY2subGVuZ3RoLTFdKTtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faW5wdXQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkVPRjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFyc2VFcnJvcignTGV4aWNhbCBlcnJvciBvbiBsaW5lICcrKHRoaXMueXlsaW5lbm8rMSkrJy4gVW5yZWNvZ25pemVkIHRleHQuXFxuJyt0aGlzLnNob3dQb3NpdGlvbigpLFxuICAgICAgICAgICAgICAgICAgICB7dGV4dDogXCJcIiwgdG9rZW46IG51bGwsIGxpbmU6IHRoaXMueXlsaW5lbm99KTtcbiAgICAgICAgfVxuICAgIH0sXG5sZXg6ZnVuY3Rpb24gbGV4KCkge1xuICAgICAgICB2YXIgciA9IHRoaXMubmV4dCgpO1xuICAgICAgICBpZiAodHlwZW9mIHIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxleCgpO1xuICAgICAgICB9XG4gICAgfSxcbmJlZ2luOmZ1bmN0aW9uIGJlZ2luKGNvbmRpdGlvbikge1xuICAgICAgICB0aGlzLmNvbmRpdGlvblN0YWNrLnB1c2goY29uZGl0aW9uKTtcbiAgICB9LFxucG9wU3RhdGU6ZnVuY3Rpb24gcG9wU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmRpdGlvblN0YWNrLnBvcCgpO1xuICAgIH0sXG5fY3VycmVudFJ1bGVzOmZ1bmN0aW9uIF9jdXJyZW50UnVsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmRpdGlvbnNbdGhpcy5jb25kaXRpb25TdGFja1t0aGlzLmNvbmRpdGlvblN0YWNrLmxlbmd0aC0xXV0ucnVsZXM7XG4gICAgfSxcbnRvcFN0YXRlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZGl0aW9uU3RhY2tbdGhpcy5jb25kaXRpb25TdGFjay5sZW5ndGgtMl07XG4gICAgfSxcbnB1c2hTdGF0ZTpmdW5jdGlvbiBiZWdpbihjb25kaXRpb24pIHtcbiAgICAgICAgdGhpcy5iZWdpbihjb25kaXRpb24pO1xuICAgIH19KTtcbmxleGVyLnBlcmZvcm1BY3Rpb24gPSBmdW5jdGlvbiBhbm9ueW1vdXMoeXkseXlfLCRhdm9pZGluZ19uYW1lX2NvbGxpc2lvbnMsWVlfU1RBUlQpIHtcblxudmFyIFlZU1RBVEU9WVlfU1RBUlQ7XG5zd2l0Y2goJGF2b2lkaW5nX25hbWVfY29sbGlzaW9ucykge1xuY2FzZSAwOi8qIHNraXAgd2hpdGVzcGFjZSAqL1xuYnJlYWs7XG5jYXNlIDE6cmV0dXJuIDIwXG5icmVhaztcbmNhc2UgMjpyZXR1cm4gMTlcbmJyZWFrO1xuY2FzZSAzOnJldHVybiA4XG5icmVhaztcbmNhc2UgNDpyZXR1cm4gOVxuYnJlYWs7XG5jYXNlIDU6cmV0dXJuIDZcbmJyZWFrO1xuY2FzZSA2OnJldHVybiA3XG5icmVhaztcbmNhc2UgNzpyZXR1cm4gMTFcbmJyZWFrO1xuY2FzZSA4OnJldHVybiAxM1xuYnJlYWs7XG5jYXNlIDk6cmV0dXJuIDEwXG5icmVhaztcbmNhc2UgMTA6cmV0dXJuIDEyXG5icmVhaztcbmNhc2UgMTE6cmV0dXJuIDE0XG5icmVhaztcbmNhc2UgMTI6cmV0dXJuIDE1XG5icmVhaztcbmNhc2UgMTM6cmV0dXJuIDE2XG5icmVhaztcbmNhc2UgMTQ6cmV0dXJuIDE3XG5icmVhaztcbmNhc2UgMTU6cmV0dXJuIDE4XG5icmVhaztcbmNhc2UgMTY6cmV0dXJuIDVcbmJyZWFrO1xuY2FzZSAxNzpyZXR1cm4gJ0lOVkFMSUQnXG5icmVhaztcbn1cbn07XG5sZXhlci5ydWxlcyA9IFsvXlxccysvLC9eWzAtOV0rKFxcLlswLTldKyk/XFxiLywvXm5cXGIvLC9eXFx8XFx8LywvXiYmLywvXlxcPy8sL146LywvXjw9LywvXj49LywvXjwvLC9ePi8sL14hPS8sL149PS8sL14lLywvXlxcKC8sL15cXCkvLC9eJC8sL14uL107XG5sZXhlci5jb25kaXRpb25zID0ge1wiSU5JVElBTFwiOntcInJ1bGVzXCI6WzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTddLFwiaW5jbHVzaXZlXCI6dHJ1ZX19O3JldHVybiBsZXhlcjt9KSgpXG5wYXJzZXIubGV4ZXIgPSBsZXhlcjtcbnJldHVybiBwYXJzZXI7XG59KSgpO1xuLy8gRW5kIHBhcnNlclxuXG4gIC8vIEhhbmRsZSBub2RlLCBhbWQsIGFuZCBnbG9iYWwgc3lzdGVtc1xuICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBKZWQ7XG4gICAgfVxuICAgIGV4cG9ydHMuSmVkID0gSmVkO1xuICB9XG4gIGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEplZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBMZWFrIGEgZ2xvYmFsIHJlZ2FyZGxlc3Mgb2YgbW9kdWxlIHN5c3RlbVxuICAgIHJvb3RbJ0plZCddID0gSmVkO1xuICB9XG5cbn0pKHRoaXMpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZW1pemUoIGZuLCBvcHRpb25zICkge1xuXHR2YXIgc2l6ZSA9IDAsXG5cdFx0bWF4U2l6ZSwgaGVhZCwgdGFpbDtcblxuXHRpZiAoIG9wdGlvbnMgJiYgb3B0aW9ucy5tYXhTaXplICkge1xuXHRcdG1heFNpemUgPSBvcHRpb25zLm1heFNpemU7XG5cdH1cblxuXHRmdW5jdGlvbiBtZW1vaXplZCggLyogLi4uYXJncyAqLyApIHtcblx0XHR2YXIgbm9kZSA9IGhlYWQsXG5cdFx0XHRsZW4gPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdFx0YXJncywgaTtcblxuXHRcdHNlYXJjaENhY2hlOiB3aGlsZSAoIG5vZGUgKSB7XG5cdFx0XHQvLyBQZXJmb3JtIGEgc2hhbGxvdyBlcXVhbGl0eSB0ZXN0IHRvIGNvbmZpcm0gdGhhdCB3aGV0aGVyIHRoZSBub2RlXG5cdFx0XHQvLyB1bmRlciB0ZXN0IGlzIGEgY2FuZGlkYXRlIGZvciB0aGUgYXJndW1lbnRzIHBhc3NlZC4gVHdvIGFycmF5c1xuXHRcdFx0Ly8gYXJlIHNoYWxsb3dseSBlcXVhbCBpZiB0aGVpciBsZW5ndGggbWF0Y2hlcyBhbmQgZWFjaCBlbnRyeSBpc1xuXHRcdFx0Ly8gc3RyaWN0bHkgZXF1YWwgYmV0d2VlbiB0aGUgdHdvIHNldHMuIEF2b2lkIGFic3RyYWN0aW5nIHRvIGFcblx0XHRcdC8vIGZ1bmN0aW9uIHdoaWNoIGNvdWxkIGluY3VyIGFuIGFyZ3VtZW50cyBsZWFraW5nIGRlb3B0aW1pemF0aW9uLlxuXG5cdFx0XHQvLyBDaGVjayB3aGV0aGVyIG5vZGUgYXJndW1lbnRzIG1hdGNoIGFyZ3VtZW50cyBsZW5ndGhcblx0XHRcdGlmICggbm9kZS5hcmdzLmxlbmd0aCAhPT0gYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdFx0bm9kZSA9IG5vZGUubmV4dDtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENoZWNrIHdoZXRoZXIgbm9kZSBhcmd1bWVudHMgbWF0Y2ggYXJndW1lbnRzIHZhbHVlc1xuXHRcdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0aWYgKCBub2RlLmFyZ3NbIGkgXSAhPT0gYXJndW1lbnRzWyBpIF0gKSB7XG5cdFx0XHRcdFx0bm9kZSA9IG5vZGUubmV4dDtcblx0XHRcdFx0XHRjb250aW51ZSBzZWFyY2hDYWNoZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBBdCB0aGlzIHBvaW50IHdlIGNhbiBhc3N1bWUgd2UndmUgZm91bmQgYSBtYXRjaFxuXG5cdFx0XHQvLyBTdXJmYWNlIG1hdGNoZWQgbm9kZSB0byBoZWFkIGlmIG5vdCBhbHJlYWR5XG5cdFx0XHRpZiAoIG5vZGUgIT09IGhlYWQgKSB7XG5cdFx0XHRcdC8vIEFzIHRhaWwsIHNoaWZ0IHRvIHByZXZpb3VzLiBNdXN0IG9ubHkgc2hpZnQgaWYgbm90IGFsc29cblx0XHRcdFx0Ly8gaGVhZCwgc2luY2UgaWYgYm90aCBoZWFkIGFuZCB0YWlsLCB0aGVyZSBpcyBubyBwcmV2aW91cy5cblx0XHRcdFx0aWYgKCBub2RlID09PSB0YWlsICkge1xuXHRcdFx0XHRcdHRhaWwgPSBub2RlLnByZXY7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBZGp1c3Qgc2libGluZ3MgdG8gcG9pbnQgdG8gZWFjaCBvdGhlci4gSWYgbm9kZSB3YXMgdGFpbCxcblx0XHRcdFx0Ly8gdGhpcyBhbHNvIGhhbmRsZXMgbmV3IHRhaWwncyBlbXB0eSBgbmV4dGAgYXNzaWdubWVudC5cblx0XHRcdFx0bm9kZS5wcmV2Lm5leHQgPSBub2RlLm5leHQ7XG5cdFx0XHRcdGlmICggbm9kZS5uZXh0ICkge1xuXHRcdFx0XHRcdG5vZGUubmV4dC5wcmV2ID0gbm9kZS5wcmV2O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bm9kZS5uZXh0ID0gaGVhZDtcblx0XHRcdFx0bm9kZS5wcmV2ID0gbnVsbDtcblx0XHRcdFx0aGVhZC5wcmV2ID0gbm9kZTtcblx0XHRcdFx0aGVhZCA9IG5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJldHVybiBpbW1lZGlhdGVseVxuXHRcdFx0cmV0dXJuIG5vZGUudmFsO1xuXHRcdH1cblxuXHRcdC8vIE5vIGNhY2hlZCB2YWx1ZSBmb3VuZC4gQ29udGludWUgdG8gaW5zZXJ0aW9uIHBoYXNlOlxuXG5cdFx0Ly8gQ3JlYXRlIGEgY29weSBvZiBhcmd1bWVudHMgKGF2b2lkIGxlYWtpbmcgZGVvcHRpbWl6YXRpb24pXG5cdFx0YXJncyA9IG5ldyBBcnJheSggbGVuICk7XG5cdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdGFyZ3NbIGkgXSA9IGFyZ3VtZW50c1sgaSBdO1xuXHRcdH1cblxuXHRcdG5vZGUgPSB7XG5cdFx0XHRhcmdzOiBhcmdzLFxuXG5cdFx0XHQvLyBHZW5lcmF0ZSB0aGUgcmVzdWx0IGZyb20gb3JpZ2luYWwgZnVuY3Rpb25cblx0XHRcdHZhbDogZm4uYXBwbHkoIG51bGwsIGFyZ3MgKVxuXHRcdH07XG5cblx0XHQvLyBEb24ndCBuZWVkIHRvIGNoZWNrIHdoZXRoZXIgbm9kZSBpcyBhbHJlYWR5IGhlYWQsIHNpbmNlIGl0IHdvdWxkXG5cdFx0Ly8gaGF2ZSBiZWVuIHJldHVybmVkIGFib3ZlIGFscmVhZHkgaWYgaXQgd2FzXG5cblx0XHQvLyBTaGlmdCBleGlzdGluZyBoZWFkIGRvd24gbGlzdFxuXHRcdGlmICggaGVhZCApIHtcblx0XHRcdGhlYWQucHJldiA9IG5vZGU7XG5cdFx0XHRub2RlLm5leHQgPSBoZWFkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBJZiBubyBoZWFkLCBmb2xsb3dzIHRoYXQgdGhlcmUncyBubyB0YWlsIChhdCBpbml0aWFsIG9yIHJlc2V0KVxuXHRcdFx0dGFpbCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0Ly8gVHJpbSB0YWlsIGlmIHdlJ3JlIHJlYWNoZWQgbWF4IHNpemUgYW5kIGFyZSBwZW5kaW5nIGNhY2hlIGluc2VydGlvblxuXHRcdGlmICggc2l6ZSA9PT0gbWF4U2l6ZSApIHtcblx0XHRcdHRhaWwgPSB0YWlsLnByZXY7XG5cdFx0XHR0YWlsLm5leHQgPSBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzaXplKys7XG5cdFx0fVxuXG5cdFx0aGVhZCA9IG5vZGU7XG5cblx0XHRyZXR1cm4gbm9kZS52YWw7XG5cdH1cblxuXHRtZW1vaXplZC5jbGVhciA9IGZ1bmN0aW9uKCkge1xuXHRcdGhlYWQgPSBudWxsO1xuXHRcdHRhaWwgPSBudWxsO1xuXHRcdHNpemUgPSAwO1xuXHR9O1xuXG5cdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0JyApIHtcblx0XHQvLyBDYWNoZSBpcyBub3QgZXhwb3NlZCBpbiB0aGUgcHVibGljIEFQSSwgYnV0IHVzZWQgaW4gdGVzdHMgdG8gZW5zdXJlXG5cdFx0Ly8gZXhwZWN0ZWQgbGlzdCBwcm9ncmVzc2lvblxuXHRcdG1lbW9pemVkLmdldENhY2hlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gWyBoZWFkLCB0YWlsLCBzaXplIF07XG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBtZW1vaXplZDtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9
var eejs = typeof eejs === "object" ? eejs : {}; eejs["helpers"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/data/helpers/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/data/helpers/datetime.js":
/*!*********************************************!*\
  !*** ./assets/src/data/helpers/datetime.js ***!
  \*********************************************/
/*! exports provided: DATE_TIME_FORMAT_MYSQL, DATE_TIME_FORMAT_ISO8601, DATE_TIME_FORMAT_SITE, DATE_FORMAT_SITE, TIME_FORMAT_SITE, formatDateString, formatMysqlDateString, formatSiteDateString, stringToMoment, allDateTimesAsString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_TIME_FORMAT_MYSQL", function() { return DATE_TIME_FORMAT_MYSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_TIME_FORMAT_ISO8601", function() { return DATE_TIME_FORMAT_ISO8601; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_TIME_FORMAT_SITE", function() { return DATE_TIME_FORMAT_SITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_FORMAT_SITE", function() { return DATE_FORMAT_SITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TIME_FORMAT_SITE", function() { return TIME_FORMAT_SITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDateString", function() { return formatDateString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatMysqlDateString", function() { return formatMysqlDateString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatSiteDateString", function() { return formatSiteDateString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToMoment", function() { return stringToMoment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allDateTimesAsString", function() { return allDateTimesAsString; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _site_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./site-data */ "./assets/src/data/helpers/site-data.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _separators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./separators */ "./assets/src/data/helpers/separators.js");
/**
 * External imports
 */




/**
 * Internal imports
 */


var DATE_TIME_FORMAT_MYSQL = 'YYYY-MM-DD HH:mm:ss';
var DATE_TIME_FORMAT_ISO8601 = moment__WEBPACK_IMPORTED_MODULE_0___default.a.DefaultFormat;
var DATE_TIME_FORMAT_SITE = _site_data__WEBPACK_IMPORTED_MODULE_1__["FORMAT_SITE_DATE"] + ' ' + _site_data__WEBPACK_IMPORTED_MODULE_1__["FORMAT_SITE_TIME"];
var DATE_FORMAT_SITE = _site_data__WEBPACK_IMPORTED_MODULE_1__["FORMAT_SITE_DATE"];
var TIME_FORMAT_SITE = _site_data__WEBPACK_IMPORTED_MODULE_1__["FORMAT_SITE_TIME"];

/**
 * Recieves a moment parseable dateString and returns a string in the provided
 * format.
 * @param { string } dateString  Incoming date string.  Should be parseable by
 *   moment
 * @param { string } format        Incoming format string.  Should be a format
 *   useable by moment.
 * @param { boolean } local        Whether or not convert the date to the local
 *   time on output (local being the browser set timezone). If this is set to
 *   true, it's recommended the incoming dateString is in UTC OR the format of
 *   the incoming string includes offset info.
 * @return { string }  Returns a date string in the provided format.
 */
var formatDateString = function formatDateString() {
  var dateString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DATE_TIME_FORMAT_ISO8601;
  var local = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var date = stringToMoment(dateString);
  return local ? date.local().format(format) : date.format(format);
};

/**
 * Receives a moment parseable dateString and returns a string in the mysql
 * date and time format.
 * @param { string } dateString  Incoming date string.  Should be parseable by
 *   moment
 * @param { boolean } local        Whether or not convert the date to the local
 *   time on output (local being the browser set timezone). If this is set to
 *   true, it's recommended the incoming dateString is in UTC OR the format of
 *   the incoming string includes offset info.
 * @return { string }  Returns a date string in mysql format.
 */
var formatMysqlDateString = function formatMysqlDateString() {
  var dateString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var local = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return formatDateString(dateString, DATE_TIME_FORMAT_MYSQL, local);
};

/**
 * Receives a moment parseable dateString and returns a string in the format
 * currently set on the host site.
 * @param { string } dateString  Incoming date string.  Should be parseable by
 *   moment
 * @param { boolean } local        Whether or not convert the date to the local
 *   time on output (local being the browser set timezone). If this is set to
 *   true, it's recommended the incoming dateString is in UTC OR the format of
 *   the incoming string includes offset info.
 * @return { string }  Returns a date string in sites format.
 */
var formatSiteDateString = function formatSiteDateString() {
  var dateString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var local = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return formatDateString(dateString, DATE_TIME_FORMAT_SITE, local);
};

/**
 * A quick wrapper for returning a moment object. If dateString is provided, a
 * moment object is returned for that dateString, otherwise the moment object
 * will represent "now" (the time the object was created).
 *
 * @param { string } dateString Incoming date string.  Should be parseable by
 *   moment
 * @return {null|moment.Moment}  A moment object.
 */
var stringToMoment = function stringToMoment() {
  var dateString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return dateString === '' ? moment__WEBPACK_IMPORTED_MODULE_0___default()() : moment__WEBPACK_IMPORTED_MODULE_0___default()(dateString);
};

/**
 * Receives an indefinite number of dateStrings as arguments and concatenates
 * them together with the given separator.
 * @param { string } separator
 * @param { ...string } dateStrings
 * @return { string }  Returns a string concatenating all the provided
 *   dateStrings together with the given separator.
 */
var allDateTimesAsString = function allDateTimesAsString() {
  for (var _len = arguments.length, dateStrings = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    dateStrings[_key - 1] = arguments[_key];
  }

  var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _separators__WEBPACK_IMPORTED_MODULE_3__["SEPARATOR_SPACE_DASH_SPACE"];

  var content = '';
  dateStrings.forEach(function (item) {
    content += item + separator;
  });
  return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["trimEnd"])(content, separator);
};

/***/ }),

/***/ "./assets/src/data/helpers/index.js":
/*!******************************************!*\
  !*** ./assets/src/data/helpers/index.js ***!
  \******************************************/
/*! exports provided: dateFormats, FORMAT_SITE_DATE, FORMAT_SITE_TIME, DATE_TIME_FORMAT_MYSQL, DATE_TIME_FORMAT_ISO8601, DATE_TIME_FORMAT_SITE, DATE_FORMAT_SITE, TIME_FORMAT_SITE, formatDateString, formatMysqlDateString, formatSiteDateString, stringToMoment, allDateTimesAsString, SEPARATOR_SPACE_DASH_SPACE, SEPARATOR_COMMA_SPACE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _site_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./site-data */ "./assets/src/data/helpers/site-data.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateFormats", function() { return _site_data__WEBPACK_IMPORTED_MODULE_0__["dateFormats"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FORMAT_SITE_DATE", function() { return _site_data__WEBPACK_IMPORTED_MODULE_0__["FORMAT_SITE_DATE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FORMAT_SITE_TIME", function() { return _site_data__WEBPACK_IMPORTED_MODULE_0__["FORMAT_SITE_TIME"]; });

/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datetime */ "./assets/src/data/helpers/datetime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATE_TIME_FORMAT_MYSQL", function() { return _datetime__WEBPACK_IMPORTED_MODULE_1__["DATE_TIME_FORMAT_MYSQL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATE_TIME_FORMAT_ISO8601", function() { return _datetime__WEBPACK_IMPORTED_MODULE_1__["DATE_TIME_FORMAT_ISO8601"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATE_TIME_FORMAT_SITE", function() { return _datetime__WEBPACK_IMPORTED_MODULE_1__["DATE_TIME_FORMAT_SITE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATE_FORMAT_SITE", function() { return _datetime__WEBPACK_IMPORTED_MODULE_1__["DATE_FORMAT_SITE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TIME_FORMAT_SITE", function() { return _datetime__WEBPACK_IMPORTED_MODULE_1__["TIME_FORMAT_SITE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatDateString", function() { return _datetime__WEBPACK_IMPORTED_MODULE_1__["formatDateString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatMysqlDateString", function() { return _datetime__WEBPACK_IMPORTED_MODULE_1__["formatMysqlDateString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatSiteDateString", function() { return _datetime__WEBPACK_IMPORTED_MODULE_1__["formatSiteDateString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringToMoment", function() { return _datetime__WEBPACK_IMPORTED_MODULE_1__["stringToMoment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "allDateTimesAsString", function() { return _datetime__WEBPACK_IMPORTED_MODULE_1__["allDateTimesAsString"]; });

/* harmony import */ var _separators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./separators */ "./assets/src/data/helpers/separators.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SEPARATOR_SPACE_DASH_SPACE", function() { return _separators__WEBPACK_IMPORTED_MODULE_2__["SEPARATOR_SPACE_DASH_SPACE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SEPARATOR_COMMA_SPACE", function() { return _separators__WEBPACK_IMPORTED_MODULE_2__["SEPARATOR_COMMA_SPACE"]; });





/***/ }),

/***/ "./assets/src/data/helpers/separators.js":
/*!***********************************************!*\
  !*** ./assets/src/data/helpers/separators.js ***!
  \***********************************************/
/*! exports provided: SEPARATOR_SPACE_DASH_SPACE, SEPARATOR_COMMA_SPACE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEPARATOR_SPACE_DASH_SPACE", function() { return SEPARATOR_SPACE_DASH_SPACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEPARATOR_COMMA_SPACE", function() { return SEPARATOR_COMMA_SPACE; });
var SEPARATOR_SPACE_DASH_SPACE = ' - ';
var SEPARATOR_COMMA_SPACE = ', ';

/***/ }),

/***/ "./assets/src/data/helpers/site-data.js":
/*!**********************************************!*\
  !*** ./assets/src/data/helpers/site-data.js ***!
  \**********************************************/
/*! exports provided: dateFormats, FORMAT_SITE_DATE, FORMAT_SITE_TIME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateFormats", function() { return dateFormats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORMAT_SITE_DATE", function() { return FORMAT_SITE_DATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORMAT_SITE_TIME", function() { return FORMAT_SITE_TIME; });
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */


_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["data"].site_formats = _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["data"].site_formats || {};

/**
 * All available site formats exposed via the eejs.data global from the server.
 * @type {{}}
 */
var _data$site_formats$da = _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["data"].site_formats.date_formats,
    dateFormats = _data$site_formats$da === undefined ? {} : _data$site_formats$da;

/**
 * The date format used by the site or mysql date format if not set.
 * @type { string }
 */


var FORMAT_SITE_DATE = dateFormats.moment_split && dateFormats.moment_split.date ? dateFormats.moment_split.date : 'YY-MM-DD';

/**
 * The time format used by the site or mysql time format if not set.
 * @type { string }
 */
var FORMAT_SITE_TIME = dateFormats.moment_split && dateFormats.moment_split.time ? dateFormats.moment_split.time : 'HH:mm:ss';

/***/ }),

/***/ "@eventespresso/eejs":
/*!***********************!*\
  !*** external "eejs" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs;

/***/ }),

/***/ "lodash":
/*!*************************************!*\
  !*** external "eejs.vendor.lodash" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.vendor.lodash;

/***/ }),

/***/ "moment":
/*!*************************************!*\
  !*** external "eejs.vendor.moment" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.vendor.moment;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLltuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9oZWxwZXJzL2RhdGV0aW1lLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL2hlbHBlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvaGVscGVycy9zZXBhcmF0b3JzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL2hlbHBlcnMvc2l0ZS1kYXRhLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwiZWVqc1wiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwiZWVqcy52ZW5kb3IubG9kYXNoXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzLnZlbmRvci5tb21lbnRcIiJdLCJuYW1lcyI6WyJEQVRFX1RJTUVfRk9STUFUX01ZU1FMIiwiREFURV9USU1FX0ZPUk1BVF9JU084NjAxIiwibW9tZW50IiwiRGVmYXVsdEZvcm1hdCIsIkRBVEVfVElNRV9GT1JNQVRfU0lURSIsIkZPUk1BVF9TSVRFX0RBVEUiLCJEQVRFX0ZPUk1BVF9TSVRFIiwiVElNRV9GT1JNQVRfU0lURSIsImZvcm1hdERhdGVTdHJpbmciLCJkYXRlU3RyaW5nIiwiZm9ybWF0IiwibG9jYWwiLCJkYXRlIiwic3RyaW5nVG9Nb21lbnQiLCJmb3JtYXRNeXNxbERhdGVTdHJpbmciLCJmb3JtYXRTaXRlRGF0ZVN0cmluZyIsImFsbERhdGVUaW1lc0FzU3RyaW5nIiwiZGF0ZVN0cmluZ3MiLCJzZXBhcmF0b3IiLCJjb250ZW50IiwiZm9yRWFjaCIsIml0ZW0iLCJ0cmltRW5kIiwiU0VQQVJBVE9SX1NQQUNFX0RBU0hfU1BBQ0UiLCJTRVBBUkFUT1JfQ09NTUFfU1BBQ0UiLCJkYXRhIiwic2l0ZV9mb3JtYXRzIiwiZGF0ZV9mb3JtYXRzIiwiZGF0ZUZvcm1hdHMiLCJtb21lbnRfc3BsaXQiLCJGT1JNQVRfU0lURV9USU1FIiwidGltZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRU8sSUFBTUEseUJBQXlCLHFCQUEvQjtBQUNBLElBQU1DLDJCQUEyQiw2Q0FBQUMsQ0FBT0MsYUFBeEM7QUFDQSxJQUFNQyx3QkFBd0IsMkRBQUFDLEdBQW1CLEdBQW5CLEdBQXlCLDJEQUF2RDtBQUNBLElBQU1DLG1CQUFtQiwyREFBekI7QUFDQSxJQUFNQyxtQkFBbUIsMkRBQXpCOztBQUVQOzs7Ozs7Ozs7Ozs7O0FBYU8sSUFBTUMsbUJBQW1CLFNBQW5CQSxnQkFBbUIsR0FJM0I7QUFBQSxNQUhKQyxVQUdJLHVFQUhTLEVBR1Q7QUFBQSxNQUZKQyxNQUVJLHVFQUZLVCx3QkFFTDtBQUFBLE1BREpVLEtBQ0ksdUVBREksSUFDSjs7QUFDSixNQUFNQyxPQUFPQyxlQUFnQkosVUFBaEIsQ0FBYjtBQUNBLFNBQU9FLFFBQ05DLEtBQUtELEtBQUwsR0FBYUQsTUFBYixDQUFxQkEsTUFBckIsQ0FETSxHQUVORSxLQUFLRixNQUFMLENBQWFBLE1BQWIsQ0FGRDtBQUdBLENBVE07O0FBV1A7Ozs7Ozs7Ozs7O0FBV08sSUFBTUksd0JBQXdCLFNBQXhCQSxxQkFBd0IsR0FBcUM7QUFBQSxNQUFuQ0wsVUFBbUMsdUVBQXRCLEVBQXNCO0FBQUEsTUFBbEJFLEtBQWtCLHVFQUFWLElBQVU7O0FBQ3pFLFNBQU9ILGlCQUFrQkMsVUFBbEIsRUFBOEJULHNCQUE5QixFQUFzRFcsS0FBdEQsQ0FBUDtBQUNBLENBRk07O0FBSVA7Ozs7Ozs7Ozs7O0FBV08sSUFBTUksdUJBQXVCLFNBQXZCQSxvQkFBdUIsR0FBcUM7QUFBQSxNQUFuQ04sVUFBbUMsdUVBQXRCLEVBQXNCO0FBQUEsTUFBbEJFLEtBQWtCLHVFQUFWLElBQVU7O0FBQ3hFLFNBQU9ILGlCQUFrQkMsVUFBbEIsRUFBOEJMLHFCQUE5QixFQUFxRE8sS0FBckQsQ0FBUDtBQUNBLENBRk07O0FBSVA7Ozs7Ozs7OztBQVNPLElBQU1FLGlCQUFpQixTQUFqQkEsY0FBaUIsR0FBdUI7QUFBQSxNQUFyQkosVUFBcUIsdUVBQVIsRUFBUTs7QUFDcEQsU0FBT0EsZUFBZSxFQUFmLEdBQW9CLDZDQUFBUCxFQUFwQixHQUErQiw2Q0FBQUEsQ0FBUU8sVUFBUixDQUF0QztBQUNBLENBRk07O0FBSVA7Ozs7Ozs7O0FBUU8sSUFBTU8sdUJBQXVCLFNBQXZCQSxvQkFBdUIsR0FBOEQ7QUFBQSxvQ0FBakJDLFdBQWlCO0FBQWpCQSxlQUFpQjtBQUFBOztBQUFBLE1BQTVEQyxTQUE0RCx1RUFBaEQsc0VBQWdEOztBQUNqRyxNQUFJQyxVQUFVLEVBQWQ7QUFDQUYsY0FBWUcsT0FBWixDQUFxQixVQUFFQyxJQUFGLEVBQVk7QUFDaENGLGVBQVdFLE9BQU9ILFNBQWxCO0FBQ0EsR0FGRDtBQUdBLFNBQU8sc0RBQUFJLENBQVNILE9BQVQsRUFBa0JELFNBQWxCLENBQVA7QUFDQSxDQU5NLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RlA7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0RPLElBQU1LLDZCQUE2QixLQUFuQztBQUNBLElBQU1DLHdCQUF3QixJQUE5QixDOzs7Ozs7Ozs7Ozs7Ozs7O0FDRFA7QUFBQTtBQUFBOzs7QUFHQTs7QUFFQSx3REFBQUMsQ0FBS0MsWUFBTCxHQUFvQix3REFBQUQsQ0FBS0MsWUFBTCxJQUFxQixFQUF6Qzs7QUFFQTs7Ozs0QkFJa0Qsd0RBQUFELENBQUtDLFksQ0FBeENDLFk7SUFBY0MsVyx5Q0FBYyxFOztBQUUzQzs7Ozs7O0FBSU8sSUFBTXZCLG1CQUFtQnVCLFlBQVlDLFlBQVosSUFDL0JELFlBQVlDLFlBQVosQ0FBeUJqQixJQURNLEdBRS9CZ0IsWUFBWUMsWUFBWixDQUF5QmpCLElBRk0sR0FHL0IsVUFITTs7QUFLUDs7OztBQUlPLElBQU1rQixtQkFBbUJGLFlBQVlDLFlBQVosSUFDL0JELFlBQVlDLFlBQVosQ0FBeUJFLElBRE0sR0FFL0JILFlBQVlDLFlBQVosQ0FBeUJFLElBRk0sR0FHL0IsVUFITSxDOzs7Ozs7Ozs7OztBQzFCUCxzQjs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxvQyIsImZpbGUiOiJlZS1oZWxwZXJzLjI0MmRjYWQ0NWU5MWM4ZjY1NjkzLmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9zcmMvZGF0YS9oZWxwZXJzL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IEZPUk1BVF9TSVRFX0RBVEUsIEZPUk1BVF9TSVRFX1RJTUUgfSBmcm9tICcuL3NpdGUtZGF0YSc7XG5pbXBvcnQgeyB0cmltRW5kIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IFNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFIH0gZnJvbSAnLi9zZXBhcmF0b3JzJztcblxuZXhwb3J0IGNvbnN0IERBVEVfVElNRV9GT1JNQVRfTVlTUUwgPSAnWVlZWS1NTS1ERCBISDptbTpzcyc7XG5leHBvcnQgY29uc3QgREFURV9USU1FX0ZPUk1BVF9JU084NjAxID0gbW9tZW50LkRlZmF1bHRGb3JtYXQ7XG5leHBvcnQgY29uc3QgREFURV9USU1FX0ZPUk1BVF9TSVRFID0gRk9STUFUX1NJVEVfREFURSArICcgJyArIEZPUk1BVF9TSVRFX1RJTUU7XG5leHBvcnQgY29uc3QgREFURV9GT1JNQVRfU0lURSA9IEZPUk1BVF9TSVRFX0RBVEU7XG5leHBvcnQgY29uc3QgVElNRV9GT1JNQVRfU0lURSA9IEZPUk1BVF9TSVRFX1RJTUU7XG5cbi8qKlxuICogUmVjaWV2ZXMgYSBtb21lbnQgcGFyc2VhYmxlIGRhdGVTdHJpbmcgYW5kIHJldHVybnMgYSBzdHJpbmcgaW4gdGhlIHByb3ZpZGVkXG4gKiBmb3JtYXQuXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBkYXRlU3RyaW5nICBJbmNvbWluZyBkYXRlIHN0cmluZy4gIFNob3VsZCBiZSBwYXJzZWFibGUgYnlcbiAqICAgbW9tZW50XG4gKiBAcGFyYW0geyBzdHJpbmcgfSBmb3JtYXQgICAgICAgIEluY29taW5nIGZvcm1hdCBzdHJpbmcuICBTaG91bGQgYmUgYSBmb3JtYXRcbiAqICAgdXNlYWJsZSBieSBtb21lbnQuXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICAgIFdoZXRoZXIgb3Igbm90IGNvbnZlcnQgdGhlIGRhdGUgdG8gdGhlIGxvY2FsXG4gKiAgIHRpbWUgb24gb3V0cHV0IChsb2NhbCBiZWluZyB0aGUgYnJvd3NlciBzZXQgdGltZXpvbmUpLiBJZiB0aGlzIGlzIHNldCB0b1xuICogICB0cnVlLCBpdCdzIHJlY29tbWVuZGVkIHRoZSBpbmNvbWluZyBkYXRlU3RyaW5nIGlzIGluIFVUQyBPUiB0aGUgZm9ybWF0IG9mXG4gKiAgIHRoZSBpbmNvbWluZyBzdHJpbmcgaW5jbHVkZXMgb2Zmc2V0IGluZm8uXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgYSBkYXRlIHN0cmluZyBpbiB0aGUgcHJvdmlkZWQgZm9ybWF0LlxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RGF0ZVN0cmluZyA9IChcblx0ZGF0ZVN0cmluZyA9ICcnLFxuXHRmb3JtYXQgPSBEQVRFX1RJTUVfRk9STUFUX0lTTzg2MDEsXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRjb25zdCBkYXRlID0gc3RyaW5nVG9Nb21lbnQoIGRhdGVTdHJpbmcgKTtcblx0cmV0dXJuIGxvY2FsID9cblx0XHRkYXRlLmxvY2FsKCkuZm9ybWF0KCBmb3JtYXQgKSA6XG5cdFx0ZGF0ZS5mb3JtYXQoIGZvcm1hdCApO1xufTtcblxuLyoqXG4gKiBSZWNlaXZlcyBhIG1vbWVudCBwYXJzZWFibGUgZGF0ZVN0cmluZyBhbmQgcmV0dXJucyBhIHN0cmluZyBpbiB0aGUgbXlzcWxcbiAqIGRhdGUgYW5kIHRpbWUgZm9ybWF0LlxuICogQHBhcmFtIHsgc3RyaW5nIH0gZGF0ZVN0cmluZyAgSW5jb21pbmcgZGF0ZSBzdHJpbmcuICBTaG91bGQgYmUgcGFyc2VhYmxlIGJ5XG4gKiAgIG1vbWVudFxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgICBXaGV0aGVyIG9yIG5vdCBjb252ZXJ0IHRoZSBkYXRlIHRvIHRoZSBsb2NhbFxuICogICB0aW1lIG9uIG91dHB1dCAobG9jYWwgYmVpbmcgdGhlIGJyb3dzZXIgc2V0IHRpbWV6b25lKS4gSWYgdGhpcyBpcyBzZXQgdG9cbiAqICAgdHJ1ZSwgaXQncyByZWNvbW1lbmRlZCB0aGUgaW5jb21pbmcgZGF0ZVN0cmluZyBpcyBpbiBVVEMgT1IgdGhlIGZvcm1hdCBvZlxuICogICB0aGUgaW5jb21pbmcgc3RyaW5nIGluY2x1ZGVzIG9mZnNldCBpbmZvLlxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIGEgZGF0ZSBzdHJpbmcgaW4gbXlzcWwgZm9ybWF0LlxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0TXlzcWxEYXRlU3RyaW5nID0gKCBkYXRlU3RyaW5nID0gJycsIGxvY2FsID0gdHJ1ZSApID0+IHtcblx0cmV0dXJuIGZvcm1hdERhdGVTdHJpbmcoIGRhdGVTdHJpbmcsIERBVEVfVElNRV9GT1JNQVRfTVlTUUwsIGxvY2FsICk7XG59O1xuXG4vKipcbiAqIFJlY2VpdmVzIGEgbW9tZW50IHBhcnNlYWJsZSBkYXRlU3RyaW5nIGFuZCByZXR1cm5zIGEgc3RyaW5nIGluIHRoZSBmb3JtYXRcbiAqIGN1cnJlbnRseSBzZXQgb24gdGhlIGhvc3Qgc2l0ZS5cbiAqIEBwYXJhbSB7IHN0cmluZyB9IGRhdGVTdHJpbmcgIEluY29taW5nIGRhdGUgc3RyaW5nLiAgU2hvdWxkIGJlIHBhcnNlYWJsZSBieVxuICogICBtb21lbnRcbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgICAgV2hldGhlciBvciBub3QgY29udmVydCB0aGUgZGF0ZSB0byB0aGUgbG9jYWxcbiAqICAgdGltZSBvbiBvdXRwdXQgKGxvY2FsIGJlaW5nIHRoZSBicm93c2VyIHNldCB0aW1lem9uZSkuIElmIHRoaXMgaXMgc2V0IHRvXG4gKiAgIHRydWUsIGl0J3MgcmVjb21tZW5kZWQgdGhlIGluY29taW5nIGRhdGVTdHJpbmcgaXMgaW4gVVRDIE9SIHRoZSBmb3JtYXQgb2ZcbiAqICAgdGhlIGluY29taW5nIHN0cmluZyBpbmNsdWRlcyBvZmZzZXQgaW5mby5cbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyBhIGRhdGUgc3RyaW5nIGluIHNpdGVzIGZvcm1hdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdFNpdGVEYXRlU3RyaW5nID0gKCBkYXRlU3RyaW5nID0gJycsIGxvY2FsID0gdHJ1ZSApID0+IHtcblx0cmV0dXJuIGZvcm1hdERhdGVTdHJpbmcoIGRhdGVTdHJpbmcsIERBVEVfVElNRV9GT1JNQVRfU0lURSwgbG9jYWwgKTtcbn07XG5cbi8qKlxuICogQSBxdWljayB3cmFwcGVyIGZvciByZXR1cm5pbmcgYSBtb21lbnQgb2JqZWN0LiBJZiBkYXRlU3RyaW5nIGlzIHByb3ZpZGVkLCBhXG4gKiBtb21lbnQgb2JqZWN0IGlzIHJldHVybmVkIGZvciB0aGF0IGRhdGVTdHJpbmcsIG90aGVyd2lzZSB0aGUgbW9tZW50IG9iamVjdFxuICogd2lsbCByZXByZXNlbnQgXCJub3dcIiAodGhlIHRpbWUgdGhlIG9iamVjdCB3YXMgY3JlYXRlZCkuXG4gKlxuICogQHBhcmFtIHsgc3RyaW5nIH0gZGF0ZVN0cmluZyBJbmNvbWluZyBkYXRlIHN0cmluZy4gIFNob3VsZCBiZSBwYXJzZWFibGUgYnlcbiAqICAgbW9tZW50XG4gKiBAcmV0dXJuIHtudWxsfG1vbWVudC5Nb21lbnR9ICBBIG1vbWVudCBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBzdHJpbmdUb01vbWVudCA9ICggZGF0ZVN0cmluZyA9ICcnICkgPT4ge1xuXHRyZXR1cm4gZGF0ZVN0cmluZyA9PT0gJycgPyBtb21lbnQoKSA6IG1vbWVudCggZGF0ZVN0cmluZyApO1xufTtcblxuLyoqXG4gKiBSZWNlaXZlcyBhbiBpbmRlZmluaXRlIG51bWJlciBvZiBkYXRlU3RyaW5ncyBhcyBhcmd1bWVudHMgYW5kIGNvbmNhdGVuYXRlc1xuICogdGhlbSB0b2dldGhlciB3aXRoIHRoZSBnaXZlbiBzZXBhcmF0b3IuXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBzZXBhcmF0b3JcbiAqIEBwYXJhbSB7IC4uLnN0cmluZyB9IGRhdGVTdHJpbmdzXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgYSBzdHJpbmcgY29uY2F0ZW5hdGluZyBhbGwgdGhlIHByb3ZpZGVkXG4gKiAgIGRhdGVTdHJpbmdzIHRvZ2V0aGVyIHdpdGggdGhlIGdpdmVuIHNlcGFyYXRvci5cbiAqL1xuZXhwb3J0IGNvbnN0IGFsbERhdGVUaW1lc0FzU3RyaW5nID0gKCBzZXBhcmF0b3IgPSBTRVBBUkFUT1JfU1BBQ0VfREFTSF9TUEFDRSwgLi4uZGF0ZVN0cmluZ3MgKSA9PiB7XG5cdGxldCBjb250ZW50ID0gJyc7XG5cdGRhdGVTdHJpbmdzLmZvckVhY2goICggaXRlbSApID0+IHtcblx0XHRjb250ZW50ICs9IGl0ZW0gKyBzZXBhcmF0b3I7XG5cdH0gKTtcblx0cmV0dXJuIHRyaW1FbmQoIGNvbnRlbnQsIHNlcGFyYXRvciApO1xufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vc2l0ZS1kYXRhJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZXRpbWUnO1xuZXhwb3J0ICogZnJvbSAnLi9zZXBhcmF0b3JzJztcbiIsImV4cG9ydCBjb25zdCBTRVBBUkFUT1JfU1BBQ0VfREFTSF9TUEFDRSA9ICcgLSAnO1xuZXhwb3J0IGNvbnN0IFNFUEFSQVRPUl9DT01NQV9TUEFDRSA9ICcsICc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuXG5kYXRhLnNpdGVfZm9ybWF0cyA9IGRhdGEuc2l0ZV9mb3JtYXRzIHx8IHt9O1xuXG4vKipcbiAqIEFsbCBhdmFpbGFibGUgc2l0ZSBmb3JtYXRzIGV4cG9zZWQgdmlhIHRoZSBlZWpzLmRhdGEgZ2xvYmFsIGZyb20gdGhlIHNlcnZlci5cbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0IGNvbnN0IHsgZGF0ZV9mb3JtYXRzOiBkYXRlRm9ybWF0cyA9IHt9IH0gPSBkYXRhLnNpdGVfZm9ybWF0cztcblxuLyoqXG4gKiBUaGUgZGF0ZSBmb3JtYXQgdXNlZCBieSB0aGUgc2l0ZSBvciBteXNxbCBkYXRlIGZvcm1hdCBpZiBub3Qgc2V0LlxuICogQHR5cGUgeyBzdHJpbmcgfVxuICovXG5leHBvcnQgY29uc3QgRk9STUFUX1NJVEVfREFURSA9IGRhdGVGb3JtYXRzLm1vbWVudF9zcGxpdCAmJlxuXHRkYXRlRm9ybWF0cy5tb21lbnRfc3BsaXQuZGF0ZSA/XG5cdGRhdGVGb3JtYXRzLm1vbWVudF9zcGxpdC5kYXRlIDpcblx0J1lZLU1NLUREJztcblxuLyoqXG4gKiBUaGUgdGltZSBmb3JtYXQgdXNlZCBieSB0aGUgc2l0ZSBvciBteXNxbCB0aW1lIGZvcm1hdCBpZiBub3Qgc2V0LlxuICogQHR5cGUgeyBzdHJpbmcgfVxuICovXG5leHBvcnQgY29uc3QgRk9STUFUX1NJVEVfVElNRSA9IGRhdGVGb3JtYXRzLm1vbWVudF9zcGxpdCAmJlxuXHRkYXRlRm9ybWF0cy5tb21lbnRfc3BsaXQudGltZSA/XG5cdGRhdGVGb3JtYXRzLm1vbWVudF9zcGxpdC50aW1lIDpcblx0J0hIOm1tOnNzJztcbiIsIm1vZHVsZS5leHBvcnRzID0gZWVqczsiLCJtb2R1bGUuZXhwb3J0cyA9IGVlanMudmVuZG9yLmxvZGFzaDsiLCJtb2R1bGUuZXhwb3J0cyA9IGVlanMudmVuZG9yLm1vbWVudDsiXSwic291cmNlUm9vdCI6IiJ9
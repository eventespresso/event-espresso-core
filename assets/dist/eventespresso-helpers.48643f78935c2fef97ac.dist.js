this["eejs"] = this["eejs"] || {}; this["eejs"]["helpers"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/ZZZ/data/helpers/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/ZZZ/data/helpers/convert-to-map-from-object.js":
/*!***************************************************************!*\
  !*** ./assets/ZZZ/data/helpers/convert-to-map-from-object.js ***!
  \***************************************************************/
/*! exports provided: convertToMapFromObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToMapFromObject", function() { return convertToMapFromObject; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

/**
 * Converts an incoming plain object of entities to a javascript Map object.
 * @param {Array<number|string,BaseEntity>}entities
 * @return {Map} A map.
 */

var convertToMapFromObject = function convertToMapFromObject(entities) {
  var reduceCallback = function reduceCallback(mapped, entity) {
    mapped.set(entity.id, entity);
    return mapped;
  };

  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["reduce"])(entities, reduceCallback, new Map());
};

/***/ }),

/***/ "./assets/ZZZ/data/helpers/convert-to-object-from-map.js":
/*!***************************************************************!*\
  !*** ./assets/ZZZ/data/helpers/convert-to-object-from-map.js ***!
  \***************************************************************/
/*! exports provided: convertToObjectFromMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToObjectFromMap", function() { return convertToObjectFromMap; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _map_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map-reducer */ "./assets/ZZZ/data/helpers/map-reducer.js");
/**
 * External imports.
 */

/**
 * Internal imports.
 */


/**
 * Given a map object, this returns its contents as a plain object
 *
 * @param {Map} mapObject
 * @return {Object} A plain object equivalent of the incoming Map
 */

var convertToObjectFromMap = function convertToObjectFromMap(mapObject) {
  if (!Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isMap"])(mapObject)) {
    return mapObject;
  }

  return Object(_map_reducer__WEBPACK_IMPORTED_MODULE_1__["mapReducer"])(mapObject, function (object, item, itemId) {
    object[itemId] = item;
    return object;
  }, {});
};

/***/ }),

/***/ "./assets/ZZZ/data/helpers/datetime.js":
/*!*********************************************!*\
  !*** ./assets/ZZZ/data/helpers/datetime.js ***!
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
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _site_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./site-data */ "./assets/ZZZ/data/helpers/site-data.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _separators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./separators */ "./assets/ZZZ/data/helpers/separators.js");
/**
 * External imports
 */



/**
 * Internal imports
 */


var DATE_TIME_FORMAT_MYSQL = 'YYYY-MM-DD HH:mm:ss';
var DATE_TIME_FORMAT_ISO8601 = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default.a.DefaultFormat;
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
  return dateString === '' ? moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()() : moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()(dateString);
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
  var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _separators__WEBPACK_IMPORTED_MODULE_3__["SEPARATOR_SPACE_DASH_SPACE"];
  var content = '';

  for (var _len = arguments.length, dateStrings = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    dateStrings[_key - 1] = arguments[_key];
  }

  dateStrings.forEach(function (item) {
    content += item + separator;
  });
  return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["trimEnd"])(content, separator);
};

/***/ }),

/***/ "./assets/ZZZ/data/helpers/ids-from-base-entity-array.js":
/*!***************************************************************!*\
  !*** ./assets/ZZZ/data/helpers/ids-from-base-entity-array.js ***!
  \***************************************************************/
/*! exports provided: getIdsFromBaseEntityArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIdsFromBaseEntityArray", function() { return getIdsFromBaseEntityArray; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Extract the ids from an array of BaseEntity instances.
 *
 * Note, this could return a smaller count of array items if anything in the
 * incoming array is not a BaseEntity.
 *
 * @param {Array<BaseEntity>} entities
 * @return {Array} An array of ids.
 */

function getIdsFromBaseEntityArray(entities) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isArray"])(entities) ? entities.map(function (entity) {
    return !!entity.id ? entity.id : false;
  }).filter(function (x) {
    return x;
  }) : entities;
}

/***/ }),

/***/ "./assets/ZZZ/data/helpers/index.js":
/*!******************************************!*\
  !*** ./assets/ZZZ/data/helpers/index.js ***!
  \******************************************/
/*! exports provided: dateFormats, FORMAT_SITE_DATE, FORMAT_SITE_TIME, DATE_TIME_FORMAT_MYSQL, DATE_TIME_FORMAT_ISO8601, DATE_TIME_FORMAT_SITE, DATE_FORMAT_SITE, TIME_FORMAT_SITE, formatDateString, formatMysqlDateString, formatSiteDateString, stringToMoment, allDateTimesAsString, SEPARATOR_SPACE_DASH_SPACE, SEPARATOR_COMMA_SPACE, mergeAndDeDuplicateArrays, mergeAndDeDuplicateObjects, mapReducer, convertToObjectFromMap, convertToMapFromObject, getIdsFromBaseEntityArray, removeEmptyFromState, normalizeEntityId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _site_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./site-data */ "./assets/ZZZ/data/helpers/site-data.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateFormats", function() { return _site_data__WEBPACK_IMPORTED_MODULE_0__["dateFormats"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FORMAT_SITE_DATE", function() { return _site_data__WEBPACK_IMPORTED_MODULE_0__["FORMAT_SITE_DATE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FORMAT_SITE_TIME", function() { return _site_data__WEBPACK_IMPORTED_MODULE_0__["FORMAT_SITE_TIME"]; });

/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datetime */ "./assets/ZZZ/data/helpers/datetime.js");
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

/* harmony import */ var _separators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./separators */ "./assets/ZZZ/data/helpers/separators.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SEPARATOR_SPACE_DASH_SPACE", function() { return _separators__WEBPACK_IMPORTED_MODULE_2__["SEPARATOR_SPACE_DASH_SPACE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SEPARATOR_COMMA_SPACE", function() { return _separators__WEBPACK_IMPORTED_MODULE_2__["SEPARATOR_COMMA_SPACE"]; });

/* harmony import */ var _merge_and_de_duplicate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./merge-and-de-duplicate */ "./assets/ZZZ/data/helpers/merge-and-de-duplicate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeAndDeDuplicateArrays", function() { return _merge_and_de_duplicate__WEBPACK_IMPORTED_MODULE_3__["mergeAndDeDuplicateArrays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeAndDeDuplicateObjects", function() { return _merge_and_de_duplicate__WEBPACK_IMPORTED_MODULE_3__["mergeAndDeDuplicateObjects"]; });

/* harmony import */ var _map_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./map-reducer */ "./assets/ZZZ/data/helpers/map-reducer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapReducer", function() { return _map_reducer__WEBPACK_IMPORTED_MODULE_4__["mapReducer"]; });

/* harmony import */ var _convert_to_object_from_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./convert-to-object-from-map */ "./assets/ZZZ/data/helpers/convert-to-object-from-map.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "convertToObjectFromMap", function() { return _convert_to_object_from_map__WEBPACK_IMPORTED_MODULE_5__["convertToObjectFromMap"]; });

/* harmony import */ var _convert_to_map_from_object__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./convert-to-map-from-object */ "./assets/ZZZ/data/helpers/convert-to-map-from-object.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "convertToMapFromObject", function() { return _convert_to_map_from_object__WEBPACK_IMPORTED_MODULE_6__["convertToMapFromObject"]; });

/* harmony import */ var _ids_from_base_entity_array__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ids-from-base-entity-array */ "./assets/ZZZ/data/helpers/ids-from-base-entity-array.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getIdsFromBaseEntityArray", function() { return _ids_from_base_entity_array__WEBPACK_IMPORTED_MODULE_7__["getIdsFromBaseEntityArray"]; });

/* harmony import */ var _remove_empty_from_state__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./remove-empty-from-state */ "./assets/ZZZ/data/helpers/remove-empty-from-state.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeEmptyFromState", function() { return _remove_empty_from_state__WEBPACK_IMPORTED_MODULE_8__["removeEmptyFromState"]; });

/* harmony import */ var _normalize_entity_id__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./normalize-entity-id */ "./assets/ZZZ/data/helpers/normalize-entity-id.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "normalizeEntityId", function() { return _normalize_entity_id__WEBPACK_IMPORTED_MODULE_9__["normalizeEntityId"]; });












/***/ }),

/***/ "./assets/ZZZ/data/helpers/map-reducer.js":
/*!************************************************!*\
  !*** ./assets/ZZZ/data/helpers/map-reducer.js ***!
  \************************************************/
/*! exports provided: mapReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapReducer", function() { return mapReducer; });
/**
 * A reducer for Map objects.
 *
 * @param {Map} map  The map object for reducing
 * @param {function} reducerCallback Same shape as callback provided for regular
 * reducers.
 * @param {*} defaultValue  The default value to provide the accumulator
 * @return {*} The reduced accumulator value.
 */
var mapReducer = function mapReducer(map, reducerCallback, defaultValue) {
  var keyValueCallbackHandler = function keyValueCallbackHandler(accumulator, keyValue) {
    return reducerCallback(accumulator, keyValue[1], keyValue[0]);
  };

  return Array.from(map.entries()).reduce(keyValueCallbackHandler, defaultValue);
};

/***/ }),

/***/ "./assets/ZZZ/data/helpers/merge-and-de-duplicate.js":
/*!***********************************************************!*\
  !*** ./assets/ZZZ/data/helpers/merge-and-de-duplicate.js ***!
  \***********************************************************/
/*! exports provided: mergeAndDeDuplicateArrays, mergeAndDeDuplicateObjects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeAndDeDuplicateArrays", function() { return mergeAndDeDuplicateArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeAndDeDuplicateObjects", function() { return mergeAndDeDuplicateObjects; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


/**
 * External imports
 */

/**
 * This utility function will merge and de-duplicate arrays so that there is
 * only one of each value in the returned (new) array.
 *
 * @param { Array } arrays (accepts multiple arrays)
 * @return { Array } A new array consisting of all the incoming arrays combined
 * 					 and with no duplicate values.
 */

var mergeAndDeDuplicateArrays = function mergeAndDeDuplicateArrays() {
  var _ref;

  for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key];
  }

  return _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(new Set((_ref = []).concat.apply(_ref, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(arrays.filter(function (item) {
    return Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isArray"])(item);
  })))));
};
/**
 * This utility function will merge and de-duplicate arrays of objects into one
 * array with no duplicates values for objects with the provided property.
 *
 * @param { string } property
 * @param { Array } arrays  (accepts multiple arrays of objects)
 * @return { Array }  A merged array of all the provided objects with only one
 * 					  object for the given property value.
 */

var mergeAndDeDuplicateObjects = function mergeAndDeDuplicateObjects(property) {
  var _ref2;

  for (var _len2 = arguments.length, arrays = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    arrays[_key2 - 1] = arguments[_key2];
  }

  return (_ref2 = []).concat.apply(_ref2, arrays).reduce(function (a, b) {
    return !a.filter(function (c) {
      return b[property] === c[property];
    }).length ? [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(a), [b]) : a;
  }, []);
};

/***/ }),

/***/ "./assets/ZZZ/data/helpers/normalize-entity-id.js":
/*!********************************************************!*\
  !*** ./assets/ZZZ/data/helpers/normalize-entity-id.js ***!
  \********************************************************/
/*! exports provided: normalizeEntityId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeEntityId", function() { return normalizeEntityId; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cuid */ "cuid");
/* harmony import */ var cuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cuid__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External imports
 */


var normalizeEntityId = function normalizeEntityId(id) {
  return cuid__WEBPACK_IMPORTED_MODULE_1___default.a.isCuid(id) ? id : Object(lodash__WEBPACK_IMPORTED_MODULE_0__["toInteger"])(id);
};

/***/ }),

/***/ "./assets/ZZZ/data/helpers/remove-empty-from-state.js":
/*!************************************************************!*\
  !*** ./assets/ZZZ/data/helpers/remove-empty-from-state.js ***!
  \************************************************************/
/*! exports provided: removeEmptyFromState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeEmptyFromState", function() { return removeEmptyFromState; });
/**
 * Utility function for recursively removing empty List/Map from the Map on the
 * given path. (Immutable.Map and Immutable.List)
 *
 * This will stop deleting paths from the state either when there are no more
 * empty values or when the count of items in the path matches the
 * lengthRemaining value.
 *
 * Note:  It's important to remember that `Immutable.List.deleteIn` and
 * `Immutable.List.delete` CANNOT be safely used in `withMutations`. So this
 * should not be used when deleting paths within a List.
 *
 * @param {Immutable.Map} state  Incoming state to recursively clear empty values from.
 * @param {Array} path The path to recursively clear empty values from in the
 * state map.
 * @param {number} lengthRemaining  What number of path items to leave remaining
 * on recursion.
 * @param {boolean} withMutations Whether to call the recursion via the
 * Immutable.withMutations function (true) or assume the incoming state is
 * already mutable (false).
 * @return {Immutable.Map} The processed state.
 */
var removeEmptyFromState = function removeEmptyFromState(state, path) {
  var lengthRemaining = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var withMutations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  var clearPaths = function clearPaths(subState) {
    if (subState.hasIn(path)) {
      subState.deleteIn(path);
      path.pop();

      while (path.length > lengthRemaining && subState.getIn(path).isEmpty()) {
        subState.deleteIn(path);
        path.pop();
      }
    }
  };

  return withMutations ? state.withMutations(function (subState) {
    return clearPaths(subState);
  }) : clearPaths(state);
};

/***/ }),

/***/ "./assets/ZZZ/data/helpers/separators.js":
/*!***********************************************!*\
  !*** ./assets/ZZZ/data/helpers/separators.js ***!
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

/***/ "./assets/ZZZ/data/helpers/site-data.js":
/*!**********************************************!*\
  !*** ./assets/ZZZ/data/helpers/site-data.js ***!
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
    dateFormats = _data$site_formats$da === void 0 ? {} : _data$site_formats$da;
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

/***/ "@eventespresso/eejs":
/*!**********************************!*\
  !*** external {"this":["eejs"]} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]; }());

/***/ }),

/***/ "cuid":
/*!**************************************************!*\
  !*** external {"this":["eejs","vendor","cuid"]} ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["vendor"]["cuid"]; }());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLmhlbHBlcnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWVqcy5oZWxwZXJzLy4vYXNzZXRzL1paWi9kYXRhL2hlbHBlcnMvY29udmVydC10by1tYXAtZnJvbS1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZWVqcy5oZWxwZXJzLy4vYXNzZXRzL1paWi9kYXRhL2hlbHBlcnMvY29udmVydC10by1vYmplY3QtZnJvbS1tYXAuanMiLCJ3ZWJwYWNrOi8vZWVqcy5oZWxwZXJzLy4vYXNzZXRzL1paWi9kYXRhL2hlbHBlcnMvZGF0ZXRpbWUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5oZWxwZXJzLy4vYXNzZXRzL1paWi9kYXRhL2hlbHBlcnMvaWRzLWZyb20tYmFzZS1lbnRpdHktYXJyYXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5oZWxwZXJzLy4vYXNzZXRzL1paWi9kYXRhL2hlbHBlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5oZWxwZXJzLy4vYXNzZXRzL1paWi9kYXRhL2hlbHBlcnMvbWFwLXJlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5oZWxwZXJzLy4vYXNzZXRzL1paWi9kYXRhL2hlbHBlcnMvbWVyZ2UtYW5kLWRlLWR1cGxpY2F0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhlbHBlcnMvLi9hc3NldHMvWlpaL2RhdGEvaGVscGVycy9ub3JtYWxpemUtZW50aXR5LWlkLmpzIiwid2VicGFjazovL2VlanMuaGVscGVycy8uL2Fzc2V0cy9aWlovZGF0YS9oZWxwZXJzL3JlbW92ZS1lbXB0eS1mcm9tLXN0YXRlLmpzIiwid2VicGFjazovL2VlanMuaGVscGVycy8uL2Fzc2V0cy9aWlovZGF0YS9oZWxwZXJzL3NlcGFyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5oZWxwZXJzLy4vYXNzZXRzL1paWi9kYXRhL2hlbHBlcnMvc2l0ZS1kYXRhLmpzIiwid2VicGFjazovL2VlanMuaGVscGVycy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2VlanMuaGVscGVycy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhlbHBlcnMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9lZWpzLmhlbHBlcnMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly9lZWpzLmhlbHBlcnMvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIl19Iiwid2VicGFjazovL2VlanMuaGVscGVycy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmVuZG9yXCIsXCJjdWlkXCJdfSIsIndlYnBhY2s6Ly9lZWpzLmhlbHBlcnMvZXh0ZXJuYWwge1widGhpc1wiOlwibG9kYXNoXCJ9Iiwid2VicGFjazovL2VlanMuaGVscGVycy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmVuZG9yXCIsXCJtb21lbnRcIl19Il0sIm5hbWVzIjpbImNvbnZlcnRUb01hcEZyb21PYmplY3QiLCJlbnRpdGllcyIsInJlZHVjZUNhbGxiYWNrIiwibWFwcGVkIiwiZW50aXR5Iiwic2V0IiwiaWQiLCJyZWR1Y2UiLCJNYXAiLCJjb252ZXJ0VG9PYmplY3RGcm9tTWFwIiwibWFwT2JqZWN0IiwiaXNNYXAiLCJtYXBSZWR1Y2VyIiwib2JqZWN0IiwiaXRlbSIsIml0ZW1JZCIsIkRBVEVfVElNRV9GT1JNQVRfTVlTUUwiLCJEQVRFX1RJTUVfRk9STUFUX0lTTzg2MDEiLCJtb21lbnQiLCJEZWZhdWx0Rm9ybWF0IiwiREFURV9USU1FX0ZPUk1BVF9TSVRFIiwiRk9STUFUX1NJVEVfREFURSIsIkZPUk1BVF9TSVRFX1RJTUUiLCJEQVRFX0ZPUk1BVF9TSVRFIiwiVElNRV9GT1JNQVRfU0lURSIsImZvcm1hdERhdGVTdHJpbmciLCJkYXRlU3RyaW5nIiwiZm9ybWF0IiwibG9jYWwiLCJkYXRlIiwic3RyaW5nVG9Nb21lbnQiLCJmb3JtYXRNeXNxbERhdGVTdHJpbmciLCJmb3JtYXRTaXRlRGF0ZVN0cmluZyIsImFsbERhdGVUaW1lc0FzU3RyaW5nIiwic2VwYXJhdG9yIiwiU0VQQVJBVE9SX1NQQUNFX0RBU0hfU1BBQ0UiLCJjb250ZW50IiwiZGF0ZVN0cmluZ3MiLCJmb3JFYWNoIiwidHJpbUVuZCIsImdldElkc0Zyb21CYXNlRW50aXR5QXJyYXkiLCJpc0FycmF5IiwibWFwIiwiZmlsdGVyIiwieCIsInJlZHVjZXJDYWxsYmFjayIsImRlZmF1bHRWYWx1ZSIsImtleVZhbHVlQ2FsbGJhY2tIYW5kbGVyIiwiYWNjdW11bGF0b3IiLCJrZXlWYWx1ZSIsIkFycmF5IiwiZnJvbSIsImVudHJpZXMiLCJtZXJnZUFuZERlRHVwbGljYXRlQXJyYXlzIiwiYXJyYXlzIiwiU2V0IiwiY29uY2F0IiwibWVyZ2VBbmREZUR1cGxpY2F0ZU9iamVjdHMiLCJwcm9wZXJ0eSIsImEiLCJiIiwiYyIsImxlbmd0aCIsIm5vcm1hbGl6ZUVudGl0eUlkIiwiY3VpZCIsImlzQ3VpZCIsInRvSW50ZWdlciIsInJlbW92ZUVtcHR5RnJvbVN0YXRlIiwic3RhdGUiLCJwYXRoIiwibGVuZ3RoUmVtYWluaW5nIiwid2l0aE11dGF0aW9ucyIsImNsZWFyUGF0aHMiLCJzdWJTdGF0ZSIsImhhc0luIiwiZGVsZXRlSW4iLCJwb3AiLCJnZXRJbiIsImlzRW1wdHkiLCJTRVBBUkFUT1JfQ09NTUFfU1BBQ0UiLCJkYXRhIiwic2l0ZV9mb3JtYXRzIiwiZGF0ZV9mb3JtYXRzIiwiZGF0ZUZvcm1hdHMiLCJtb21lbnRfc3BsaXQiLCJ0aW1lIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUVBOzs7Ozs7QUFLTyxJQUFNQSxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXlCLENBQUVDLFFBQUYsRUFBZ0I7QUFDckQsTUFBTUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFFQyxNQUFGLEVBQVVDLE1BQVYsRUFBc0I7QUFDNUNELFVBQU0sQ0FBQ0UsR0FBUCxDQUFZRCxNQUFNLENBQUNFLEVBQW5CLEVBQXVCRixNQUF2QjtBQUNBLFdBQU9ELE1BQVA7QUFDQSxHQUhEOztBQUlBLFNBQU9JLHFEQUFNLENBQUVOLFFBQUYsRUFBWUMsY0FBWixFQUE0QixJQUFJTSxHQUFKLEVBQTVCLENBQWI7QUFDQSxDQU5NLEM7Ozs7Ozs7Ozs7OztBQ1ZQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FBR0E7QUFFQTs7OztBQUdBO0FBRUE7Ozs7Ozs7QUFNTyxJQUFNQyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXlCLENBQUVDLFNBQUYsRUFBaUI7QUFDdEQsTUFBSyxDQUFFQyxvREFBSyxDQUFFRCxTQUFGLENBQVosRUFBNEI7QUFDM0IsV0FBT0EsU0FBUDtBQUNBOztBQUNELFNBQU9FLCtEQUFVLENBQUVGLFNBQUYsRUFBYSxVQUFFRyxNQUFGLEVBQVVDLElBQVYsRUFBZ0JDLE1BQWhCLEVBQTRCO0FBQ3pERixVQUFNLENBQUVFLE1BQUYsQ0FBTixHQUFtQkQsSUFBbkI7QUFDQSxXQUFPRCxNQUFQO0FBQ0EsR0FIZ0IsRUFHZCxFQUhjLENBQWpCO0FBSUEsQ0FSTSxDOzs7Ozs7Ozs7Ozs7QUNoQlA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUdBO0FBRU8sSUFBTUcsc0JBQXNCLEdBQUcscUJBQS9CO0FBQ0EsSUFBTUMsd0JBQXdCLEdBQUdDLHNEQUFNLENBQUNDLGFBQXhDO0FBQ0EsSUFBTUMscUJBQXFCLEdBQUdDLDJEQUFnQixHQUFHLEdBQW5CLEdBQXlCQywyREFBdkQ7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBR0YsMkRBQXpCO0FBQ0EsSUFBTUcsZ0JBQWdCLEdBQUdGLDJEQUF6QjtBQUVQOzs7Ozs7Ozs7Ozs7OztBQWFPLElBQU1HLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsR0FJM0I7QUFBQSxNQUhKQyxVQUdJLHVFQUhTLEVBR1Q7QUFBQSxNQUZKQyxNQUVJLHVFQUZLVix3QkFFTDtBQUFBLE1BREpXLEtBQ0ksdUVBREksSUFDSjtBQUNKLE1BQU1DLElBQUksR0FBR0MsY0FBYyxDQUFFSixVQUFGLENBQTNCO0FBQ0EsU0FBT0UsS0FBSyxHQUNYQyxJQUFJLENBQUNELEtBQUwsR0FBYUQsTUFBYixDQUFxQkEsTUFBckIsQ0FEVyxHQUVYRSxJQUFJLENBQUNGLE1BQUwsQ0FBYUEsTUFBYixDQUZEO0FBR0EsQ0FUTTtBQVdQOzs7Ozs7Ozs7Ozs7QUFXTyxJQUFNSSxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLEdBQXFDO0FBQUEsTUFBbkNMLFVBQW1DLHVFQUF0QixFQUFzQjtBQUFBLE1BQWxCRSxLQUFrQix1RUFBVixJQUFVO0FBQ3pFLFNBQU9ILGdCQUFnQixDQUFFQyxVQUFGLEVBQWNWLHNCQUFkLEVBQXNDWSxLQUF0QyxDQUF2QjtBQUNBLENBRk07QUFJUDs7Ozs7Ozs7Ozs7O0FBV08sSUFBTUksb0JBQW9CLEdBQUcsU0FBdkJBLG9CQUF1QixHQUFxQztBQUFBLE1BQW5DTixVQUFtQyx1RUFBdEIsRUFBc0I7QUFBQSxNQUFsQkUsS0FBa0IsdUVBQVYsSUFBVTtBQUN4RSxTQUFPSCxnQkFBZ0IsQ0FBRUMsVUFBRixFQUFjTixxQkFBZCxFQUFxQ1EsS0FBckMsQ0FBdkI7QUFDQSxDQUZNO0FBSVA7Ozs7Ozs7Ozs7QUFTTyxJQUFNRSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLEdBQXVCO0FBQUEsTUFBckJKLFVBQXFCLHVFQUFSLEVBQVE7QUFDcEQsU0FBT0EsVUFBVSxLQUFLLEVBQWYsR0FBb0JSLHNEQUFNLEVBQTFCLEdBQStCQSxzREFBTSxDQUFFUSxVQUFGLENBQTVDO0FBQ0EsQ0FGTTtBQUlQOzs7Ozs7Ozs7QUFRTyxJQUFNTyxvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQXVCLEdBQThEO0FBQUEsTUFBNURDLFNBQTRELHVFQUFoREMsc0VBQWdEO0FBQ2pHLE1BQUlDLE9BQU8sR0FBRyxFQUFkOztBQURpRyxvQ0FBakJDLFdBQWlCO0FBQWpCQSxlQUFpQjtBQUFBOztBQUVqR0EsYUFBVyxDQUFDQyxPQUFaLENBQXFCLFVBQUV4QixJQUFGLEVBQVk7QUFDaENzQixXQUFPLElBQUl0QixJQUFJLEdBQUdvQixTQUFsQjtBQUNBLEdBRkQ7QUFHQSxTQUFPSyxzREFBTyxDQUFFSCxPQUFGLEVBQVdGLFNBQVgsQ0FBZDtBQUNBLENBTk0sQzs7Ozs7Ozs7Ozs7O0FDN0ZQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTs7Ozs7Ozs7OztBQVNPLFNBQVNNLHlCQUFULENBQW9DdkMsUUFBcEMsRUFBK0M7QUFDckQsU0FBT3dDLHNEQUFPLENBQUV4QyxRQUFGLENBQVAsR0FDTkEsUUFBUSxDQUNOeUMsR0FERixDQUNPLFVBQUV0QyxNQUFGO0FBQUEsV0FBYyxDQUFDLENBQUVBLE1BQU0sQ0FBQ0UsRUFBVixHQUFlRixNQUFNLENBQUNFLEVBQXRCLEdBQTJCLEtBQXpDO0FBQUEsR0FEUCxFQUVFcUMsTUFGRixDQUVVLFVBQUVDLENBQUY7QUFBQSxXQUFTQSxDQUFUO0FBQUEsR0FGVixDQURNLEdBSU4zQyxRQUpEO0FBS0EsQzs7Ozs7Ozs7Ozs7O0FDakJEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTs7Ozs7Ozs7O0FBU08sSUFBTVcsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBRThCLEdBQUYsRUFBT0csZUFBUCxFQUF3QkMsWUFBeEIsRUFBMEM7QUFDbkUsTUFBTUMsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQixDQUFFQyxXQUFGLEVBQWVDLFFBQWYsRUFBNkI7QUFDNUQsV0FBT0osZUFBZSxDQUFFRyxXQUFGLEVBQWVDLFFBQVEsQ0FBRSxDQUFGLENBQXZCLEVBQThCQSxRQUFRLENBQUUsQ0FBRixDQUF0QyxDQUF0QjtBQUNBLEdBRkQ7O0FBR0EsU0FBT0MsS0FBSyxDQUNWQyxJQURLLENBQ0NULEdBQUcsQ0FBQ1UsT0FBSixFQURELEVBRUw3QyxNQUZLLENBRUd3Qyx1QkFGSCxFQUU0QkQsWUFGNUIsQ0FBUDtBQUdBLENBUE0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVFA7OztBQUdBO0FBQ0E7Ozs7Ozs7OztBQVFPLElBQU1PLHlCQUF5QixHQUFHLFNBQTVCQSx5QkFBNEI7QUFBQTs7QUFBQSxvQ0FBS0MsTUFBTDtBQUFLQSxVQUFMO0FBQUE7O0FBQUEseUZBQ3JDLElBQUlDLEdBQUosQ0FBUyxZQUFHQyxNQUFILDZGQUNSRixNQUFNLENBQUNYLE1BQVAsQ0FBZSxVQUFFN0IsSUFBRjtBQUFBLFdBQVkyQixzREFBTyxDQUFFM0IsSUFBRixDQUFuQjtBQUFBLEdBQWYsQ0FEUSxFQUFULENBRHFDO0FBQUEsQ0FBbEM7QUFNUDs7Ozs7Ozs7OztBQVNPLElBQU0yQywwQkFBMEIsR0FBRyxTQUE3QkEsMEJBQTZCLENBQUVDLFFBQUYsRUFBMkI7QUFBQTs7QUFBQSxxQ0FBWkosTUFBWTtBQUFaQSxVQUFZO0FBQUE7O0FBQ3BFLFNBQU8sYUFBR0UsTUFBSCxjQUFjRixNQUFkLEVBQXVCL0MsTUFBdkIsQ0FDTixVQUFFb0QsQ0FBRixFQUFLQyxDQUFMLEVBQVk7QUFDWCxXQUFPLENBQUVELENBQUMsQ0FBQ2hCLE1BQUYsQ0FDUixVQUFFa0IsQ0FBRjtBQUFBLGFBQVNELENBQUMsQ0FBRUYsUUFBRixDQUFELEtBQWtCRyxDQUFDLENBQUVILFFBQUYsQ0FBNUI7QUFBQSxLQURRLEVBRVBJLE1BRkssNkZBR0RILENBSEMsSUFHRUMsQ0FIRixLQUlORCxDQUpEO0FBS0EsR0FQSyxFQVFOLEVBUk0sQ0FBUDtBQVVBLENBWE0sQzs7Ozs7Ozs7Ozs7O0FDM0JQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUNBO0FBRU8sSUFBTUksaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFFekQsRUFBRjtBQUFBLFNBQVUwRCwyQ0FBSSxDQUFDQyxNQUFMLENBQWEzRCxFQUFiLElBQzFDQSxFQUQwQyxHQUUxQzRELHdEQUFTLENBQUU1RCxFQUFGLENBRnVCO0FBQUEsQ0FBMUIsQzs7Ozs7Ozs7Ozs7O0FDTlA7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JPLElBQU02RCxvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQXVCLENBQ25DQyxLQURtQyxFQUVuQ0MsSUFGbUMsRUFLL0I7QUFBQSxNQUZKQyxlQUVJLHVFQUZjLENBRWQ7QUFBQSxNQURKQyxhQUNJLHVFQURZLElBQ1o7O0FBQ0osTUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBRUMsUUFBRixFQUFnQjtBQUNsQyxRQUFLQSxRQUFRLENBQUNDLEtBQVQsQ0FBZ0JMLElBQWhCLENBQUwsRUFBOEI7QUFDN0JJLGNBQVEsQ0FBQ0UsUUFBVCxDQUFtQk4sSUFBbkI7QUFDQUEsVUFBSSxDQUFDTyxHQUFMOztBQUNBLGFBQ0NQLElBQUksQ0FBQ1AsTUFBTCxHQUFjUSxlQUFkLElBQ0FHLFFBQVEsQ0FBQ0ksS0FBVCxDQUFnQlIsSUFBaEIsRUFBdUJTLE9BQXZCLEVBRkQsRUFHRTtBQUNETCxnQkFBUSxDQUFDRSxRQUFULENBQW1CTixJQUFuQjtBQUNBQSxZQUFJLENBQUNPLEdBQUw7QUFDQTtBQUNEO0FBQ0QsR0FaRDs7QUFjQSxTQUFPTCxhQUFhLEdBQ25CSCxLQUFLLENBQUNHLGFBQU4sQ0FBcUIsVUFBRUUsUUFBRjtBQUFBLFdBQWdCRCxVQUFVLENBQUVDLFFBQUYsQ0FBMUI7QUFBQSxHQUFyQixDQURtQixHQUVuQkQsVUFBVSxDQUFFSixLQUFGLENBRlg7QUFHQSxDQXZCTSxDOzs7Ozs7Ozs7Ozs7QUN0QlA7QUFBQTtBQUFBO0FBQU8sSUFBTWpDLDBCQUEwQixHQUFHLEtBQW5DO0FBQ0EsSUFBTTRDLHFCQUFxQixHQUFHLElBQTlCLEM7Ozs7Ozs7Ozs7OztBQ0RQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUVBQyx3REFBSSxDQUFDQyxZQUFMLEdBQW9CRCx3REFBSSxDQUFDQyxZQUFMLElBQXFCLEVBQXpDO0FBRUE7Ozs7OzRCQUlrREQsd0RBQUksQ0FBQ0MsWSxDQUF4Q0MsWTtJQUFjQyxXLHNDQUFjLEU7QUFFM0M7Ozs7OztBQUlPLElBQU05RCxnQkFBZ0IsR0FBRzhELFdBQVcsQ0FBQ0MsWUFBWixJQUMvQkQsV0FBVyxDQUFDQyxZQUFaLENBQXlCdkQsSUFETSxHQUUvQnNELFdBQVcsQ0FBQ0MsWUFBWixDQUF5QnZELElBRk0sR0FHL0IsVUFITTtBQUtQOzs7OztBQUlPLElBQU1QLGdCQUFnQixHQUFHNkQsV0FBVyxDQUFDQyxZQUFaLElBQy9CRCxXQUFXLENBQUNDLFlBQVosQ0FBeUJDLElBRE0sR0FFL0JGLFdBQVcsQ0FBQ0MsWUFBWixDQUF5QkMsSUFGTSxHQUcvQixVQUhNLEM7Ozs7Ozs7Ozs7O0FDMUJQO0FBQ0E7QUFDQSxpREFBaUQsZ0JBQWdCO0FBQ2pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9DOzs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTs7QUFFQSxrQzs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7O0FBRUEsb0M7Ozs7Ozs7Ozs7O0FDSkEsd0JBQXdCLG1CQUFPLENBQUMsdUZBQXFCOztBQUVyRCxzQkFBc0IsbUJBQU8sQ0FBQyxtRkFBbUI7O0FBRWpELHdCQUF3QixtQkFBTyxDQUFDLHVGQUFxQjs7QUFFckQ7QUFDQTtBQUNBOztBQUVBLG9DOzs7Ozs7Ozs7OztBQ1ZBLGFBQWEsK0JBQStCLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBOUMsYUFBYSxpREFBaUQsRUFBRSxJOzs7Ozs7Ozs7OztBQ0FoRSxhQUFhLGlDQUFpQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQWhELGFBQWEsbURBQW1ELEVBQUUsSSIsImZpbGUiOiJldmVudGVzcHJlc3NvLWhlbHBlcnMuNDg2NDNmNzg5MzVjMmZlZjk3YWMuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL1paWi9kYXRhL2hlbHBlcnMvaW5kZXguanNcIik7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgcmVkdWNlIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBpbmNvbWluZyBwbGFpbiBvYmplY3Qgb2YgZW50aXRpZXMgdG8gYSBqYXZhc2NyaXB0IE1hcCBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcnxzdHJpbmcsQmFzZUVudGl0eT59ZW50aXRpZXNcbiAqIEByZXR1cm4ge01hcH0gQSBtYXAuXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0VG9NYXBGcm9tT2JqZWN0ID0gKCBlbnRpdGllcyApID0+IHtcblx0Y29uc3QgcmVkdWNlQ2FsbGJhY2sgPSAoIG1hcHBlZCwgZW50aXR5ICkgPT4ge1xuXHRcdG1hcHBlZC5zZXQoIGVudGl0eS5pZCwgZW50aXR5ICk7XG5cdFx0cmV0dXJuIG1hcHBlZDtcblx0fTtcblx0cmV0dXJuIHJlZHVjZSggZW50aXRpZXMsIHJlZHVjZUNhbGxiYWNrLCBuZXcgTWFwKCkgKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHMuXG4gKi9cbmltcG9ydCB7IGlzTWFwIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzLlxuICovXG5pbXBvcnQgeyBtYXBSZWR1Y2VyIH0gZnJvbSAnLi9tYXAtcmVkdWNlcic7XG5cbi8qKlxuICogR2l2ZW4gYSBtYXAgb2JqZWN0LCB0aGlzIHJldHVybnMgaXRzIGNvbnRlbnRzIGFzIGEgcGxhaW4gb2JqZWN0XG4gKlxuICogQHBhcmFtIHtNYXB9IG1hcE9iamVjdFxuICogQHJldHVybiB7T2JqZWN0fSBBIHBsYWluIG9iamVjdCBlcXVpdmFsZW50IG9mIHRoZSBpbmNvbWluZyBNYXBcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRUb09iamVjdEZyb21NYXAgPSAoIG1hcE9iamVjdCApID0+IHtcblx0aWYgKCAhIGlzTWFwKCBtYXBPYmplY3QgKSApIHtcblx0XHRyZXR1cm4gbWFwT2JqZWN0O1xuXHR9XG5cdHJldHVybiBtYXBSZWR1Y2VyKCBtYXBPYmplY3QsICggb2JqZWN0LCBpdGVtLCBpdGVtSWQgKSA9PiB7XG5cdFx0b2JqZWN0WyBpdGVtSWQgXSA9IGl0ZW07XG5cdFx0cmV0dXJuIG9iamVjdDtcblx0fSwge30gKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IHsgRk9STUFUX1NJVEVfREFURSwgRk9STUFUX1NJVEVfVElNRSB9IGZyb20gJy4vc2l0ZS1kYXRhJztcbmltcG9ydCB7IHRyaW1FbmQgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgU0VQQVJBVE9SX1NQQUNFX0RBU0hfU1BBQ0UgfSBmcm9tICcuL3NlcGFyYXRvcnMnO1xuXG5leHBvcnQgY29uc3QgREFURV9USU1FX0ZPUk1BVF9NWVNRTCA9ICdZWVlZLU1NLUREIEhIOm1tOnNzJztcbmV4cG9ydCBjb25zdCBEQVRFX1RJTUVfRk9STUFUX0lTTzg2MDEgPSBtb21lbnQuRGVmYXVsdEZvcm1hdDtcbmV4cG9ydCBjb25zdCBEQVRFX1RJTUVfRk9STUFUX1NJVEUgPSBGT1JNQVRfU0lURV9EQVRFICsgJyAnICsgRk9STUFUX1NJVEVfVElNRTtcbmV4cG9ydCBjb25zdCBEQVRFX0ZPUk1BVF9TSVRFID0gRk9STUFUX1NJVEVfREFURTtcbmV4cG9ydCBjb25zdCBUSU1FX0ZPUk1BVF9TSVRFID0gRk9STUFUX1NJVEVfVElNRTtcblxuLyoqXG4gKiBSZWNpZXZlcyBhIG1vbWVudCBwYXJzZWFibGUgZGF0ZVN0cmluZyBhbmQgcmV0dXJucyBhIHN0cmluZyBpbiB0aGUgcHJvdmlkZWRcbiAqIGZvcm1hdC5cbiAqIEBwYXJhbSB7IHN0cmluZyB9IGRhdGVTdHJpbmcgIEluY29taW5nIGRhdGUgc3RyaW5nLiAgU2hvdWxkIGJlIHBhcnNlYWJsZSBieVxuICogICBtb21lbnRcbiAqIEBwYXJhbSB7IHN0cmluZyB9IGZvcm1hdCAgICAgICAgSW5jb21pbmcgZm9ybWF0IHN0cmluZy4gIFNob3VsZCBiZSBhIGZvcm1hdFxuICogICB1c2VhYmxlIGJ5IG1vbWVudC5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgICAgV2hldGhlciBvciBub3QgY29udmVydCB0aGUgZGF0ZSB0byB0aGUgbG9jYWxcbiAqICAgdGltZSBvbiBvdXRwdXQgKGxvY2FsIGJlaW5nIHRoZSBicm93c2VyIHNldCB0aW1lem9uZSkuIElmIHRoaXMgaXMgc2V0IHRvXG4gKiAgIHRydWUsIGl0J3MgcmVjb21tZW5kZWQgdGhlIGluY29taW5nIGRhdGVTdHJpbmcgaXMgaW4gVVRDIE9SIHRoZSBmb3JtYXQgb2ZcbiAqICAgdGhlIGluY29taW5nIHN0cmluZyBpbmNsdWRlcyBvZmZzZXQgaW5mby5cbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyBhIGRhdGUgc3RyaW5nIGluIHRoZSBwcm92aWRlZCBmb3JtYXQuXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlU3RyaW5nID0gKFxuXHRkYXRlU3RyaW5nID0gJycsXG5cdGZvcm1hdCA9IERBVEVfVElNRV9GT1JNQVRfSVNPODYwMSxcblx0bG9jYWwgPSB0cnVlLFxuKSA9PiB7XG5cdGNvbnN0IGRhdGUgPSBzdHJpbmdUb01vbWVudCggZGF0ZVN0cmluZyApO1xuXHRyZXR1cm4gbG9jYWwgP1xuXHRcdGRhdGUubG9jYWwoKS5mb3JtYXQoIGZvcm1hdCApIDpcblx0XHRkYXRlLmZvcm1hdCggZm9ybWF0ICk7XG59O1xuXG4vKipcbiAqIFJlY2VpdmVzIGEgbW9tZW50IHBhcnNlYWJsZSBkYXRlU3RyaW5nIGFuZCByZXR1cm5zIGEgc3RyaW5nIGluIHRoZSBteXNxbFxuICogZGF0ZSBhbmQgdGltZSBmb3JtYXQuXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBkYXRlU3RyaW5nICBJbmNvbWluZyBkYXRlIHN0cmluZy4gIFNob3VsZCBiZSBwYXJzZWFibGUgYnlcbiAqICAgbW9tZW50XG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICAgIFdoZXRoZXIgb3Igbm90IGNvbnZlcnQgdGhlIGRhdGUgdG8gdGhlIGxvY2FsXG4gKiAgIHRpbWUgb24gb3V0cHV0IChsb2NhbCBiZWluZyB0aGUgYnJvd3NlciBzZXQgdGltZXpvbmUpLiBJZiB0aGlzIGlzIHNldCB0b1xuICogICB0cnVlLCBpdCdzIHJlY29tbWVuZGVkIHRoZSBpbmNvbWluZyBkYXRlU3RyaW5nIGlzIGluIFVUQyBPUiB0aGUgZm9ybWF0IG9mXG4gKiAgIHRoZSBpbmNvbWluZyBzdHJpbmcgaW5jbHVkZXMgb2Zmc2V0IGluZm8uXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgYSBkYXRlIHN0cmluZyBpbiBteXNxbCBmb3JtYXQuXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXRNeXNxbERhdGVTdHJpbmcgPSAoIGRhdGVTdHJpbmcgPSAnJywgbG9jYWwgPSB0cnVlICkgPT4ge1xuXHRyZXR1cm4gZm9ybWF0RGF0ZVN0cmluZyggZGF0ZVN0cmluZywgREFURV9USU1FX0ZPUk1BVF9NWVNRTCwgbG9jYWwgKTtcbn07XG5cbi8qKlxuICogUmVjZWl2ZXMgYSBtb21lbnQgcGFyc2VhYmxlIGRhdGVTdHJpbmcgYW5kIHJldHVybnMgYSBzdHJpbmcgaW4gdGhlIGZvcm1hdFxuICogY3VycmVudGx5IHNldCBvbiB0aGUgaG9zdCBzaXRlLlxuICogQHBhcmFtIHsgc3RyaW5nIH0gZGF0ZVN0cmluZyAgSW5jb21pbmcgZGF0ZSBzdHJpbmcuICBTaG91bGQgYmUgcGFyc2VhYmxlIGJ5XG4gKiAgIG1vbWVudFxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgICBXaGV0aGVyIG9yIG5vdCBjb252ZXJ0IHRoZSBkYXRlIHRvIHRoZSBsb2NhbFxuICogICB0aW1lIG9uIG91dHB1dCAobG9jYWwgYmVpbmcgdGhlIGJyb3dzZXIgc2V0IHRpbWV6b25lKS4gSWYgdGhpcyBpcyBzZXQgdG9cbiAqICAgdHJ1ZSwgaXQncyByZWNvbW1lbmRlZCB0aGUgaW5jb21pbmcgZGF0ZVN0cmluZyBpcyBpbiBVVEMgT1IgdGhlIGZvcm1hdCBvZlxuICogICB0aGUgaW5jb21pbmcgc3RyaW5nIGluY2x1ZGVzIG9mZnNldCBpbmZvLlxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIGEgZGF0ZSBzdHJpbmcgaW4gc2l0ZXMgZm9ybWF0LlxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0U2l0ZURhdGVTdHJpbmcgPSAoIGRhdGVTdHJpbmcgPSAnJywgbG9jYWwgPSB0cnVlICkgPT4ge1xuXHRyZXR1cm4gZm9ybWF0RGF0ZVN0cmluZyggZGF0ZVN0cmluZywgREFURV9USU1FX0ZPUk1BVF9TSVRFLCBsb2NhbCApO1xufTtcblxuLyoqXG4gKiBBIHF1aWNrIHdyYXBwZXIgZm9yIHJldHVybmluZyBhIG1vbWVudCBvYmplY3QuIElmIGRhdGVTdHJpbmcgaXMgcHJvdmlkZWQsIGFcbiAqIG1vbWVudCBvYmplY3QgaXMgcmV0dXJuZWQgZm9yIHRoYXQgZGF0ZVN0cmluZywgb3RoZXJ3aXNlIHRoZSBtb21lbnQgb2JqZWN0XG4gKiB3aWxsIHJlcHJlc2VudCBcIm5vd1wiICh0aGUgdGltZSB0aGUgb2JqZWN0IHdhcyBjcmVhdGVkKS5cbiAqXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBkYXRlU3RyaW5nIEluY29taW5nIGRhdGUgc3RyaW5nLiAgU2hvdWxkIGJlIHBhcnNlYWJsZSBieVxuICogICBtb21lbnRcbiAqIEByZXR1cm4ge251bGx8bW9tZW50Lk1vbWVudH0gIEEgbW9tZW50IG9iamVjdC5cbiAqL1xuZXhwb3J0IGNvbnN0IHN0cmluZ1RvTW9tZW50ID0gKCBkYXRlU3RyaW5nID0gJycgKSA9PiB7XG5cdHJldHVybiBkYXRlU3RyaW5nID09PSAnJyA/IG1vbWVudCgpIDogbW9tZW50KCBkYXRlU3RyaW5nICk7XG59O1xuXG4vKipcbiAqIFJlY2VpdmVzIGFuIGluZGVmaW5pdGUgbnVtYmVyIG9mIGRhdGVTdHJpbmdzIGFzIGFyZ3VtZW50cyBhbmQgY29uY2F0ZW5hdGVzXG4gKiB0aGVtIHRvZ2V0aGVyIHdpdGggdGhlIGdpdmVuIHNlcGFyYXRvci5cbiAqIEBwYXJhbSB7IHN0cmluZyB9IHNlcGFyYXRvclxuICogQHBhcmFtIHsgLi4uc3RyaW5nIH0gZGF0ZVN0cmluZ3NcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyBhIHN0cmluZyBjb25jYXRlbmF0aW5nIGFsbCB0aGUgcHJvdmlkZWRcbiAqICAgZGF0ZVN0cmluZ3MgdG9nZXRoZXIgd2l0aCB0aGUgZ2l2ZW4gc2VwYXJhdG9yLlxuICovXG5leHBvcnQgY29uc3QgYWxsRGF0ZVRpbWVzQXNTdHJpbmcgPSAoIHNlcGFyYXRvciA9IFNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFLCAuLi5kYXRlU3RyaW5ncyApID0+IHtcblx0bGV0IGNvbnRlbnQgPSAnJztcblx0ZGF0ZVN0cmluZ3MuZm9yRWFjaCggKCBpdGVtICkgPT4ge1xuXHRcdGNvbnRlbnQgKz0gaXRlbSArIHNlcGFyYXRvcjtcblx0fSApO1xuXHRyZXR1cm4gdHJpbUVuZCggY29udGVudCwgc2VwYXJhdG9yICk7XG59O1xuIiwiaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogRXh0cmFjdCB0aGUgaWRzIGZyb20gYW4gYXJyYXkgb2YgQmFzZUVudGl0eSBpbnN0YW5jZXMuXG4gKlxuICogTm90ZSwgdGhpcyBjb3VsZCByZXR1cm4gYSBzbWFsbGVyIGNvdW50IG9mIGFycmF5IGl0ZW1zIGlmIGFueXRoaW5nIGluIHRoZVxuICogaW5jb21pbmcgYXJyYXkgaXMgbm90IGEgQmFzZUVudGl0eS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PEJhc2VFbnRpdHk+fSBlbnRpdGllc1xuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIGlkcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElkc0Zyb21CYXNlRW50aXR5QXJyYXkoIGVudGl0aWVzICkge1xuXHRyZXR1cm4gaXNBcnJheSggZW50aXRpZXMgKSA/XG5cdFx0ZW50aXRpZXNcblx0XHRcdC5tYXAoICggZW50aXR5ICkgPT4gISEgZW50aXR5LmlkID8gZW50aXR5LmlkIDogZmFsc2UgKVxuXHRcdFx0LmZpbHRlciggKCB4ICkgPT4geCApIDpcblx0XHRlbnRpdGllcztcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vc2l0ZS1kYXRhJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZXRpbWUnO1xuZXhwb3J0ICogZnJvbSAnLi9zZXBhcmF0b3JzJztcbmV4cG9ydCAqIGZyb20gJy4vbWVyZ2UtYW5kLWRlLWR1cGxpY2F0ZSc7XG5leHBvcnQgKiBmcm9tICcuL21hcC1yZWR1Y2VyJztcbmV4cG9ydCAqIGZyb20gJy4vY29udmVydC10by1vYmplY3QtZnJvbS1tYXAnO1xuZXhwb3J0ICogZnJvbSAnLi9jb252ZXJ0LXRvLW1hcC1mcm9tLW9iamVjdCc7XG5leHBvcnQgKiBmcm9tICcuL2lkcy1mcm9tLWJhc2UtZW50aXR5LWFycmF5JztcbmV4cG9ydCAqIGZyb20gJy4vcmVtb3ZlLWVtcHR5LWZyb20tc3RhdGUnO1xuZXhwb3J0ICogZnJvbSAnLi9ub3JtYWxpemUtZW50aXR5LWlkJztcbiIsIi8qKlxuICogQSByZWR1Y2VyIGZvciBNYXAgb2JqZWN0cy5cbiAqXG4gKiBAcGFyYW0ge01hcH0gbWFwICBUaGUgbWFwIG9iamVjdCBmb3IgcmVkdWNpbmdcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlZHVjZXJDYWxsYmFjayBTYW1lIHNoYXBlIGFzIGNhbGxiYWNrIHByb3ZpZGVkIGZvciByZWd1bGFyXG4gKiByZWR1Y2Vycy5cbiAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlICBUaGUgZGVmYXVsdCB2YWx1ZSB0byBwcm92aWRlIHRoZSBhY2N1bXVsYXRvclxuICogQHJldHVybiB7Kn0gVGhlIHJlZHVjZWQgYWNjdW11bGF0b3IgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBSZWR1Y2VyID0gKCBtYXAsIHJlZHVjZXJDYWxsYmFjaywgZGVmYXVsdFZhbHVlICkgPT4ge1xuXHRjb25zdCBrZXlWYWx1ZUNhbGxiYWNrSGFuZGxlciA9ICggYWNjdW11bGF0b3IsIGtleVZhbHVlICkgPT4ge1xuXHRcdHJldHVybiByZWR1Y2VyQ2FsbGJhY2soIGFjY3VtdWxhdG9yLCBrZXlWYWx1ZVsgMSBdLCBrZXlWYWx1ZVsgMCBdICk7XG5cdH07XG5cdHJldHVybiBBcnJheVxuXHRcdC5mcm9tKCBtYXAuZW50cmllcygpIClcblx0XHQucmVkdWNlKCBrZXlWYWx1ZUNhbGxiYWNrSGFuZGxlciwgZGVmYXVsdFZhbHVlICk7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICdsb2Rhc2gnO1xuLyoqXG4gKiBUaGlzIHV0aWxpdHkgZnVuY3Rpb24gd2lsbCBtZXJnZSBhbmQgZGUtZHVwbGljYXRlIGFycmF5cyBzbyB0aGF0IHRoZXJlIGlzXG4gKiBvbmx5IG9uZSBvZiBlYWNoIHZhbHVlIGluIHRoZSByZXR1cm5lZCAobmV3KSBhcnJheS5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGFycmF5cyAoYWNjZXB0cyBtdWx0aXBsZSBhcnJheXMpXG4gKiBAcmV0dXJuIHsgQXJyYXkgfSBBIG5ldyBhcnJheSBjb25zaXN0aW5nIG9mIGFsbCB0aGUgaW5jb21pbmcgYXJyYXlzIGNvbWJpbmVkXG4gKiBcdFx0XHRcdFx0IGFuZCB3aXRoIG5vIGR1cGxpY2F0ZSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBtZXJnZUFuZERlRHVwbGljYXRlQXJyYXlzID0gKCAuLi5hcnJheXMgKSA9PiBbXG5cdC4uLm5ldyBTZXQoIFtdLmNvbmNhdChcblx0XHQuLi5hcnJheXMuZmlsdGVyKCAoIGl0ZW0gKSA9PiBpc0FycmF5KCBpdGVtICkgKVxuXHQpICksXG5dO1xuXG4vKipcbiAqIFRoaXMgdXRpbGl0eSBmdW5jdGlvbiB3aWxsIG1lcmdlIGFuZCBkZS1kdXBsaWNhdGUgYXJyYXlzIG9mIG9iamVjdHMgaW50byBvbmVcbiAqIGFycmF5IHdpdGggbm8gZHVwbGljYXRlcyB2YWx1ZXMgZm9yIG9iamVjdHMgd2l0aCB0aGUgcHJvdmlkZWQgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHsgc3RyaW5nIH0gcHJvcGVydHlcbiAqIEBwYXJhbSB7IEFycmF5IH0gYXJyYXlzICAoYWNjZXB0cyBtdWx0aXBsZSBhcnJheXMgb2Ygb2JqZWN0cylcbiAqIEByZXR1cm4geyBBcnJheSB9ICBBIG1lcmdlZCBhcnJheSBvZiBhbGwgdGhlIHByb3ZpZGVkIG9iamVjdHMgd2l0aCBvbmx5IG9uZVxuICogXHRcdFx0XHRcdCAgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gcHJvcGVydHkgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBtZXJnZUFuZERlRHVwbGljYXRlT2JqZWN0cyA9ICggcHJvcGVydHksIC4uLmFycmF5cyApID0+IHtcblx0cmV0dXJuIFtdLmNvbmNhdCggLi4uYXJyYXlzICkucmVkdWNlKFxuXHRcdCggYSwgYiApID0+IHtcblx0XHRcdHJldHVybiAhIGEuZmlsdGVyKFxuXHRcdFx0XHQoIGMgKSA9PiBiWyBwcm9wZXJ0eSBdID09PSBjWyBwcm9wZXJ0eSBdXG5cdFx0XHQpLmxlbmd0aCA/XG5cdFx0XHRcdFsgLi4uYSwgYiBdIDpcblx0XHRcdFx0YTtcblx0XHR9LFxuXHRcdFtdLFxuXHQpO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB0b0ludGVnZXIgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGN1aWQgZnJvbSAnY3VpZCc7XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFbnRpdHlJZCA9ICggaWQgKSA9PiBjdWlkLmlzQ3VpZCggaWQgKSA/XG5cdGlkIDpcblx0dG9JbnRlZ2VyKCBpZCApO1xuIiwiLyoqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIGZvciByZWN1cnNpdmVseSByZW1vdmluZyBlbXB0eSBMaXN0L01hcCBmcm9tIHRoZSBNYXAgb24gdGhlXG4gKiBnaXZlbiBwYXRoLiAoSW1tdXRhYmxlLk1hcCBhbmQgSW1tdXRhYmxlLkxpc3QpXG4gKlxuICogVGhpcyB3aWxsIHN0b3AgZGVsZXRpbmcgcGF0aHMgZnJvbSB0aGUgc3RhdGUgZWl0aGVyIHdoZW4gdGhlcmUgYXJlIG5vIG1vcmVcbiAqIGVtcHR5IHZhbHVlcyBvciB3aGVuIHRoZSBjb3VudCBvZiBpdGVtcyBpbiB0aGUgcGF0aCBtYXRjaGVzIHRoZVxuICogbGVuZ3RoUmVtYWluaW5nIHZhbHVlLlxuICpcbiAqIE5vdGU6ICBJdCdzIGltcG9ydGFudCB0byByZW1lbWJlciB0aGF0IGBJbW11dGFibGUuTGlzdC5kZWxldGVJbmAgYW5kXG4gKiBgSW1tdXRhYmxlLkxpc3QuZGVsZXRlYCBDQU5OT1QgYmUgc2FmZWx5IHVzZWQgaW4gYHdpdGhNdXRhdGlvbnNgLiBTbyB0aGlzXG4gKiBzaG91bGQgbm90IGJlIHVzZWQgd2hlbiBkZWxldGluZyBwYXRocyB3aXRoaW4gYSBMaXN0LlxuICpcbiAqIEBwYXJhbSB7SW1tdXRhYmxlLk1hcH0gc3RhdGUgIEluY29taW5nIHN0YXRlIHRvIHJlY3Vyc2l2ZWx5IGNsZWFyIGVtcHR5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcGF0aCBUaGUgcGF0aCB0byByZWN1cnNpdmVseSBjbGVhciBlbXB0eSB2YWx1ZXMgZnJvbSBpbiB0aGVcbiAqIHN0YXRlIG1hcC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhSZW1haW5pbmcgIFdoYXQgbnVtYmVyIG9mIHBhdGggaXRlbXMgdG8gbGVhdmUgcmVtYWluaW5nXG4gKiBvbiByZWN1cnNpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHdpdGhNdXRhdGlvbnMgV2hldGhlciB0byBjYWxsIHRoZSByZWN1cnNpb24gdmlhIHRoZVxuICogSW1tdXRhYmxlLndpdGhNdXRhdGlvbnMgZnVuY3Rpb24gKHRydWUpIG9yIGFzc3VtZSB0aGUgaW5jb21pbmcgc3RhdGUgaXNcbiAqIGFscmVhZHkgbXV0YWJsZSAoZmFsc2UpLlxuICogQHJldHVybiB7SW1tdXRhYmxlLk1hcH0gVGhlIHByb2Nlc3NlZCBzdGF0ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUVtcHR5RnJvbVN0YXRlID0gKFxuXHRzdGF0ZSxcblx0cGF0aCxcblx0bGVuZ3RoUmVtYWluaW5nID0gMSxcblx0d2l0aE11dGF0aW9ucyA9IHRydWVcbikgPT4ge1xuXHRjb25zdCBjbGVhclBhdGhzID0gKCBzdWJTdGF0ZSApID0+IHtcblx0XHRpZiAoIHN1YlN0YXRlLmhhc0luKCBwYXRoICkgKSB7XG5cdFx0XHRzdWJTdGF0ZS5kZWxldGVJbiggcGF0aCApO1xuXHRcdFx0cGF0aC5wb3AoKTtcblx0XHRcdHdoaWxlIChcblx0XHRcdFx0cGF0aC5sZW5ndGggPiBsZW5ndGhSZW1haW5pbmcgJiZcblx0XHRcdFx0c3ViU3RhdGUuZ2V0SW4oIHBhdGggKS5pc0VtcHR5KClcblx0XHRcdCkge1xuXHRcdFx0XHRzdWJTdGF0ZS5kZWxldGVJbiggcGF0aCApO1xuXHRcdFx0XHRwYXRoLnBvcCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gd2l0aE11dGF0aW9ucyA/XG5cdFx0c3RhdGUud2l0aE11dGF0aW9ucyggKCBzdWJTdGF0ZSApID0+IGNsZWFyUGF0aHMoIHN1YlN0YXRlICkgKSA6XG5cdFx0Y2xlYXJQYXRocyggc3RhdGUgKTtcbn07XG4iLCJleHBvcnQgY29uc3QgU0VQQVJBVE9SX1NQQUNFX0RBU0hfU1BBQ0UgPSAnIC0gJztcbmV4cG9ydCBjb25zdCBTRVBBUkFUT1JfQ09NTUFfU1BBQ0UgPSAnLCAnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGRhdGEgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcblxuZGF0YS5zaXRlX2Zvcm1hdHMgPSBkYXRhLnNpdGVfZm9ybWF0cyB8fCB7fTtcblxuLyoqXG4gKiBBbGwgYXZhaWxhYmxlIHNpdGUgZm9ybWF0cyBleHBvc2VkIHZpYSB0aGUgZWVqcy5kYXRhIGdsb2JhbCBmcm9tIHRoZSBzZXJ2ZXIuXG4gKiBAdHlwZSB7e319XG4gKi9cbmV4cG9ydCBjb25zdCB7IGRhdGVfZm9ybWF0czogZGF0ZUZvcm1hdHMgPSB7fSB9ID0gZGF0YS5zaXRlX2Zvcm1hdHM7XG5cbi8qKlxuICogVGhlIGRhdGUgZm9ybWF0IHVzZWQgYnkgdGhlIHNpdGUgb3IgbXlzcWwgZGF0ZSBmb3JtYXQgaWYgbm90IHNldC5cbiAqIEB0eXBlIHsgc3RyaW5nIH1cbiAqL1xuZXhwb3J0IGNvbnN0IEZPUk1BVF9TSVRFX0RBVEUgPSBkYXRlRm9ybWF0cy5tb21lbnRfc3BsaXQgJiZcblx0ZGF0ZUZvcm1hdHMubW9tZW50X3NwbGl0LmRhdGUgP1xuXHRkYXRlRm9ybWF0cy5tb21lbnRfc3BsaXQuZGF0ZSA6XG5cdCdZWS1NTS1ERCc7XG5cbi8qKlxuICogVGhlIHRpbWUgZm9ybWF0IHVzZWQgYnkgdGhlIHNpdGUgb3IgbXlzcWwgdGltZSBmb3JtYXQgaWYgbm90IHNldC5cbiAqIEB0eXBlIHsgc3RyaW5nIH1cbiAqL1xuZXhwb3J0IGNvbnN0IEZPUk1BVF9TSVRFX1RJTUUgPSBkYXRlRm9ybWF0cy5tb21lbnRfc3BsaXQgJiZcblx0ZGF0ZUZvcm1hdHMubW9tZW50X3NwbGl0LnRpbWUgP1xuXHRkYXRlRm9ybWF0cy5tb21lbnRfc3BsaXQudGltZSA6XG5cdCdISDptbTpzcyc7XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhvdXRIb2xlczsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXIpID09PSBcIltvYmplY3QgQXJndW1lbnRzXVwiKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVNwcmVhZDsiLCJ2YXIgYXJyYXlXaXRob3V0SG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhvdXRIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheVwiKTtcblxudmFyIG5vbkl0ZXJhYmxlU3ByZWFkID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVTcHJlYWRcIik7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdG9Db25zdW1hYmxlQXJyYXk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZlbmRvclwiXVtcImN1aWRcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJsb2Rhc2hcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmVuZG9yXCJdW1wibW9tZW50XCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
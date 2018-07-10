var eejs = typeof eejs === "object" ? eejs : {}; eejs["model"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/data/model/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/data/model/base-date-formatter.js":
/*!******************************************************!*\
  !*** ./assets/src/data/model/base-date-formatter.js ***!
  \******************************************************/
/*! exports provided: formatDatesOnEntities, formatDatesOnEntity, formatEntitiesDatesToMysql, formatEntityDatesToMysql, formatEntitiesDatesToSite, formatEntityDatesToSite, convertEntitiesDatesToMoment, convertEntityDatesToMoment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDatesOnEntities", function() { return formatDatesOnEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDatesOnEntity", function() { return formatDatesOnEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatEntitiesDatesToMysql", function() { return formatEntitiesDatesToMysql; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatEntityDatesToMysql", function() { return formatEntityDatesToMysql; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatEntitiesDatesToSite", function() { return formatEntitiesDatesToSite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatEntityDatesToSite", function() { return formatEntityDatesToSite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEntitiesDatesToMoment", function() { return convertEntitiesDatesToMoment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEntityDatesToMoment", function() { return convertEntityDatesToMoment; });
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/helpers */ "@eventespresso/helpers");
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);

/**
 * External imports
 */



/**
 * Formats the date fields on provided entities.  Does not mutate original
 * entities.
 *
 * @param { Array } entities  An array of entity objects
 * @param { Array } entityDateFields  An array of field names that are date
 *   fields.
 * @param { string } format  The format to transform the date field values to.
 * @param { boolean } local      Whether or not to convert the date field value
 *   to the local timezone for the host.
 * @return { Array }  Returns a new array of new entities with the date field
 *   values formatted
 */
var formatDatesOnEntities = function formatDatesOnEntities() {
	var entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["DATE_TIME_FORMAT_ISO8601"];
	var local = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

	if (Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(entities) || Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(entityDateFields)) {
		return entities;
	}
	var formattedEntities = [];
	entities.forEach(function (entity) {
		formattedEntities.push(formatDatesOnEntity(entity, entityDateFields, format, local));
	});
	return formattedEntities;
};

/**
 * Formats the date fields on the provided entity.  Does not mutate original
 * entity.
 *
 * @param { Object } entity  An entity
 * @param { Array } entityDateFields  An array of field names that are date
 *   fields.
 * @param { string } format  The format to transform the date field values to.
 * @param { boolean } local      Whether or not to convert the date field value
 *   to the local timezone for the host.
 * @return { Object }  Returns a new entity with the date field values formatted
 */
var formatDatesOnEntity = function formatDatesOnEntity() {
	var entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["DATE_TIME_FORMAT_ISO8601"];
	var local = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

	var newEntity = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, entity);
	entityDateFields.forEach(function (dateField) {
		if (newEntity[dateField]) {
			newEntity[dateField] = _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["formatDateString"](newEntity[dateField], format, local);
		}
	});
	return newEntity;
};

/**
 * Formats the date fields to mysql format on provided entities.  Does not
 * mutate original entities.
 *
 * @param { Array } entities  An array of entity objects
 * @param { Array } entityDateFields  An array of field names that are date
 *   fields.
 * @param { boolean } local      Whether or not to convert the date field value
 *   to the local timezone for the host.
 * @return { Array }  Returns a new array of new entities with the date field
 *   values formatted
 */
var formatEntitiesDatesToMysql = function formatEntitiesDatesToMysql() {
	var entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	var local = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	return formatDatesOnEntities(entities, entityDateFields, _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["DATE_TIME_FORMAT_MYSQL"], local);
};

/**
 * Formats the date fields to mysql format on provided entity.  Does not
 * mutate original entity.
 *
 * @param { Object } entity  An array of entity objects
 * @param { Array } entityDateFields  An array of field names that are date
 *   fields.
 * @param { boolean } local      Whether or not to convert the date field value
 *   to the local timezone for the host.
 * @return { Object }  Returns a new entity with the date field values formatted
 */
var formatEntityDatesToMysql = function formatEntityDatesToMysql() {
	var entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	var local = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	return formatDatesOnEntity(entity, entityDateFields, _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["DATE_TIME_FORMAT_MYSQL"], local);
};

/**
 * Formats the date fields to the site format on provided entities.  Does not
 * mutate original entities.
 *
 * @param { Array } entities  An array of entity objects
 * @param { Array } entityDateFields  An array of field names that are date
 *   fields.
 * @param { boolean } local      Whether or not to convert the date field value
 *   to the local timezone for the host.
 * @return { Array }  Returns a new array of new entities with the date field
 *   values formatted
 */
var formatEntitiesDatesToSite = function formatEntitiesDatesToSite() {
	var entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	var local = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	return formatDatesOnEntities(entities, entityDateFields, _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["DATE_TIME_FORMAT_SITE"], local);
};

/**
 * Formats the date fields to the site format on provided entity.  Does not
 * mutate original entity.
 *
 * @param { Object } entity  An array of entity objects
 * @param { Array } entityDateFields  An array of field names that are date
 *   fields.
 * @param { boolean } local      Whether or not to convert the date field value
 *   to the local timezone for the host.
 * @return { Object }  Returns a new entity with the date field values formatted
 */
var formatEntityDatesToSite = function formatEntityDatesToSite() {
	var entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	var local = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	return formatDatesOnEntity(entity, entityDateFields, _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["DATE_TIME_FORMAT_SITE"], local);
};

/**
 * Converts date field values to moment objects for the provided entities.
 * Does not mutate original entities.
 *
 * @param { Array } entities An array of entity objects
 * @param { Array } entityDateFields An array of field names that are date
 *   fields.
 * @return { Array } Returns a new array of new entities with the date field
 *   values converted to moment objects.
 */
var convertEntitiesDatesToMoment = function convertEntitiesDatesToMoment() {
	var entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	if (Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(entities) || Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(entityDateFields)) {
		return entities;
	}
	var formattedEntities = [];
	entities.forEach(function (entity) {
		formattedEntities.push(convertEntityDatesToMoment(entity, entityDateFields));
	});
	return formattedEntities;
};

/**
 * Converts date field values to moment objects for the provided entity.
 * Does not mutate original entity.
 *
 * @param { Object } entity An entity.
 * @param { Array } entityDateFields An array of field names that are date
 *   fields.
 * @return { Object } Returns a new entity with the date field values converted
 *   to moment objects.
 */
var convertEntityDatesToMoment = function convertEntityDatesToMoment() {
	var entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	var newEntity = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, entity);
	entityDateFields.forEach(function (dateField) {
		if (newEntity[dateField]) {
			newEntity[dateField] = _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["stringToMoment"](newEntity[dateField]);
		}
	});
	return newEntity;
};

/***/ }),

/***/ "./assets/src/data/model/base.js":
/*!***************************************!*\
  !*** ./assets/src/data/model/base.js ***!
  \***************************************/
/*! exports provided: QUERY_ORDER_ASC, QUERY_ORDER_DESC, ALLOWED_ORDER_VALUES, GREATER_THAN, LESS_THAN, GREATER_THAN_AND_EQUAL, LESS_THAN_AND_EQUAL, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_ASC", function() { return QUERY_ORDER_ASC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_DESC", function() { return QUERY_ORDER_DESC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALLOWED_ORDER_VALUES", function() { return ALLOWED_ORDER_VALUES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GREATER_THAN", function() { return GREATER_THAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LESS_THAN", function() { return LESS_THAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GREATER_THAN_AND_EQUAL", function() { return GREATER_THAN_AND_EQUAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LESS_THAN_AND_EQUAL", function() { return LESS_THAN_AND_EQUAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return getQueryString; });
/* harmony import */ var babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ "./node_modules/babel-runtime/core-js/get-iterator.js");
/* harmony import */ var babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);



var QUERY_ORDER_ASC = 'ASC';
var QUERY_ORDER_DESC = 'DESC';
var ALLOWED_ORDER_VALUES = ['asc', 'desc', 'ASC', 'DESC'];
var GREATER_THAN = encodeURIComponent('>');
var LESS_THAN = encodeURIComponent('<');
var GREATER_THAN_AND_EQUAL = encodeURIComponent('>=');
var LESS_THAN_AND_EQUAL = encodeURIComponent('<=');

/**
 * Return a query string for use by a REST request given a set of queryData.
 * @param { Object } queryData
 * @param { function } whereConditions  A function for prepping the where
 * 										conditions from the queryData.
 * @param { function } mapOrderBy		A function for mapping incoming order_by
 * 										strings to the value needed for the
 * 										query_string.
 * @return { string }  					Returns the query string.
 */
var getQueryString = function getQueryString() {
	var queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var whereConditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
		return null;
	};
	var mapOrderBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (orderBy) {
		return orderBy;
	};

	var where = whereConditions(queryData);
	var limit = queryData.limit,
	    order = queryData.order,
	    orderBy = queryData.orderBy;

	var queryParams = [];
	if (!Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(limit)) {
		queryParams.push('limit=' + limit);
	}
	if (!Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(mapOrderBy(orderBy))) {
		if (Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isArray"])(mapOrderBy(orderBy))) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default()(mapOrderBy(orderBy)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var field = _step.value;

					queryParams.push('order_by[' + field + ']=' + order);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		} else {
			queryParams.push('order=' + order);
			queryParams.push('order_by=' + mapOrderBy(orderBy));
		}
	}
	var queryString = queryParams.join('&');
	if (where) {
		queryString += '&' + where;
	}
	return queryString;
};

/***/ }),

/***/ "./assets/src/data/model/datetime/constants.js":
/*!*****************************************************!*\
  !*** ./assets/src/data/model/datetime/constants.js ***!
  \*****************************************************/
/*! exports provided: MODEL_NAME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return MODEL_NAME; });
var MODEL_NAME = 'datetime';

/***/ }),

/***/ "./assets/src/data/model/datetime/formatter.js":
/*!*****************************************************!*\
  !*** ./assets/src/data/model/datetime/formatter.js ***!
  \*****************************************************/
/*! exports provided: DATE_FIELDS, prettyDateFromDateTime, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_FIELDS", function() { return DATE_FIELDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prettyDateFromDateTime", function() { return prettyDateFromDateTime; });
/* harmony import */ var _base_date_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base-date-formatter */ "./assets/src/data/model/base-date-formatter.js");
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/helpers */ "@eventespresso/helpers");
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Internal imports
 */



/**
 * External imports
 */


/**
 * Array of fields that have date information
 * @type { string[] }
 */
var DATE_FIELDS = ['DTT_EVT_start', 'DTT_EVT_end'];

/**
 * Will hold the dynamically generated list of formatters for dates.  Formatters
 * are functions defined in `../base-date-formatter` but wrapped by dynamically
 * generated functions (callable via same name) that automatically receive the
 * correct dateFieldsMap argument.
 *
 * Eg.  `../base-date-formatter has
 * formatDatesOnEntities( entities, entityDateFields, format, local );
 * When importing `formatDatesOnEntities` from this file, you can call it simply
 * by doing this:
 *
 * formatDatesOnEntities( dateTimeObjects, format, local );
 *
 * Notice that it's called without the entityDateFields argument because that's
 * provided by this generator.
 *
 * @type {{}}
 */
var formatters = {};

Object(lodash__WEBPACK_IMPORTED_MODULE_2__["forOwn"])(_base_date_formatter__WEBPACK_IMPORTED_MODULE_0__, function (implementation, functionName) {
	formatters[functionName] = function () {
		for (var _len = arguments.length, incomingArgs = Array(_len), _key = 0; _key < _len; _key++) {
			incomingArgs[_key] = arguments[_key];
		}

		var firstArg = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["pullAt"])(incomingArgs, 0);
		return implementation.apply(undefined, [firstArg[0], DATE_FIELDS].concat(incomingArgs));
	};
});

/**
 * This will spit out a prettified label for the provided DateTime entity.
 *
 * If there is a DTT_name, the format will be:
 * `DTT_name (DTT_EVT_start - DTT_EVT_end)`
 *
 * If no DTT_name then:
 * `DTT_EVT_start - DTT_EVT_end`
 *
 * This will account for if both start and end are in the same day and simply
 * use time for the end part.
 *
 * @param { Object } DateTimeEntity
 * @return { string }  A formatted string representing the provided
 *    DateTimeEntity.
 */
var prettyDateFromDateTime = function prettyDateFromDateTime() {
	var DateTimeEntity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var content = '';
	DateTimeEntity = formatters.convertEntityDatesToMoment(DateTimeEntity);
	if (DateTimeEntity.DTT_EVT_start && DateTimeEntity.DTT_EVT_end) {
		if (DateTimeEntity.DTT_EVT_start.local().format('md') === DateTimeEntity.DTT_EVT_end.local().format('md')) {
			content += Object(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["allDateTimesAsString"])(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["SEPARATOR_SPACE_DASH_SPACE"], DateTimeEntity.DTT_EVT_start.format(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["DATE_TIME_FORMAT_SITE"]), DateTimeEntity.DTT_EVT_end.format(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["TIME_FORMAT_SITE"]));
		} else {
			content += Object(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["allDateTimesAsString"])(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["SEPARATOR_SPACE_DASH_SPACE"], DateTimeEntity.DTT_EVT_start.format(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["DATE_TIME_FORMAT_SITE"]), DateTimeEntity.DTT_EVT_end.format(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["DATE_TIME_FORMAT_SITE"]));
		}
	} else {
		if (DateTimeEntity.DTT_EVT_start) {
			content += DateTimeEntity.DTT_EVT_start.format(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["DATE_TIME_FORMAT_SITE"]);
		}
		if (DateTimeEntity.DTT_EVT_end) {
			content += DateTimeEntity.DTT_EVT_end.format(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["DATE_TIME_FORMAT_SITE"]);
		}
	}
	content = DateTimeEntity.DTT_name ? DateTimeEntity.DTT_name + ' (' + content + ')' : content;
	return content;
};

/* harmony default export */ __webpack_exports__["default"] = (formatters);

/***/ }),

/***/ "./assets/src/data/model/datetime/index.js":
/*!*************************************************!*\
  !*** ./assets/src/data/model/datetime/index.js ***!
  \*************************************************/
/*! exports provided: MODEL_NAME, nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString, DATE_FIELDS, prettyDateFromDateTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/datetime/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAME"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/datetime/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nowDateAndTime", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["nowDateAndTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });

/* harmony import */ var _formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formatter */ "./assets/src/data/model/datetime/formatter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATE_FIELDS", function() { return _formatter__WEBPACK_IMPORTED_MODULE_2__["DATE_FIELDS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "prettyDateFromDateTime", function() { return _formatter__WEBPACK_IMPORTED_MODULE_2__["prettyDateFromDateTime"]; });





/***/ }),

/***/ "./assets/src/data/model/datetime/query.js":
/*!*************************************************!*\
  !*** ./assets/src/data/model/datetime/query.js ***!
  \*************************************************/
/*! exports provided: nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nowDateAndTime", function() { return nowDateAndTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return queryDataTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return defaultQueryData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return mapOrderBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return whereConditions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return getQueryString; });
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");

/**
 * External imports
 */




/**
 * Internal dependencies
 */


var nowDateAndTime = moment__WEBPACK_IMPORTED_MODULE_1___default()();

/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */
var queryDataTypes = {
	queryData: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
		limit: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,
		orderBy: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['DTT_name', 'DTT_ID', 'start_date', 'end_date']),
		order: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(_base__WEBPACK_IMPORTED_MODULE_4__["ALLOWED_ORDER_VALUES"]),
		showExpired: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
		month: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.month
	})
};

/**
 * Default attributes for this model
 * @type {
 * 	{
 * 		attributes: {
 * 			limit: number,
 * 			orderBy: string,
 * 			order: string,
 *   		showExpired: boolean
 *   	}
 *   }
 * }
 */
var defaultQueryData = {
	queryData: {
		limit: 100,
		orderBy: 'start_date',
		order: _base__WEBPACK_IMPORTED_MODULE_4__["QUERY_ORDER_DESC"],
		showExpired: false
	}
};

/**
 * Used to map an orderBy string to the actual value used in a REST query from
 * the context of an event.
 *
 * @param {string} orderBy
 *
 * @return { string } Returns an actual orderBy string for the REST query for
 *                      the provided alias
 */
var mapOrderBy = function mapOrderBy(orderBy) {
	var orderByMap = {
		start_date: 'DTT_EVT_start',
		end_date: 'DTT_EVT_end'
	};
	return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
};

/**
 * Builds where conditions for an events endpoint request using provided
 * information.
 *
 * @param {number} forEventId  ID for Event to retrieve datetimes from
 * @param {boolean} showExpired  Whether or not to include expired events.
 * @param {string} month         Return events for the given month.  Can be any
 *                                 in any month format recognized by moment.
 * @return {string}             The assembled where conditions.
 */
var whereConditions = function whereConditions(_ref) {
	var _ref$forEventId = _ref.forEventId,
	    forEventId = _ref$forEventId === undefined ? 0 : _ref$forEventId,
	    _ref$showExpired = _ref.showExpired,
	    showExpired = _ref$showExpired === undefined ? false : _ref$showExpired,
	    _ref$month = _ref.month,
	    month = _ref$month === undefined ? 'none' : _ref$month;

	var where = [];
	if (!showExpired) {
		where.push('where[DTT_EVT_end**expired][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN"] + '&where[DTT_EVT_end**expired][]=' + nowDateAndTime.local().format());
	}
	if (month && month !== 'none') {
		where.push('where[DTT_EVT_start][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN_AND_EQUAL"] + '&where[DTT_EVT_start][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).startOf('month').local().format());
		where.push('where[DTT_EVT_end][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["LESS_THAN_AND_EQUAL"] + '&where[DTT_EVT_end][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).endOf('month').local().format());
	}
	if (parseInt(forEventId, 10) !== 0) {
		where.push('where[Event.EVT_ID]=' + forEventId);
	}
	return where.join('&');
};

/**
 * Return a query string for use by a REST request given a set of queryData.
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */
var getQueryString = function getQueryString() {
	var queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	queryData = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
	return Object(_base__WEBPACK_IMPORTED_MODULE_4__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/default-model-state.js":
/*!******************************************************!*\
  !*** ./assets/src/data/model/default-model-state.js ***!
  \******************************************************/
/*! exports provided: DEFAULT_LISTS_STATE, DEFAULT_CORE_STATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LISTS_STATE", function() { return DEFAULT_LISTS_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CORE_STATE", function() { return DEFAULT_CORE_STATE; });
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _endpoints_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./endpoints.js */ "./assets/src/data/model/endpoints.js");

/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


/**
 * Receives an object map of modelName to endpoint and maps that to a default
 * map of modelName to empty array.
 *
 * @param { Object } modelNameEndpoints
 * @return { Object } An object of { { modelName } : [] }
 */
var mapToArrayValues = function mapToArrayValues(modelNameEndpoints) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_1__["mapValues"])(modelNameEndpoints, function () {
    return [];
  });
};

/**
 * Receives an object map of modelName to endpoint and maps that to a default
 * map of modelName to empty object.
 *
 * @param { Object } modelNameEndpoints
 * @return { Object } An object of { { modelName } : {} }
 */
var mapToObjectValues = function mapToObjectValues(modelNameEndpoints) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_1__["mapValues"])(modelNameEndpoints, function () {
    return {};
  });
};

/**
 * Provides the default state to be used by stores containing lists.
 *
 * @type { Object }
 */
var DEFAULT_LISTS_STATE = mapToArrayValues(_endpoints_js__WEBPACK_IMPORTED_MODULE_2__["endpoints"]);

/**
 * Provides the default state to be used by the core store.
 *
 * @type {{entities: {}, entityIds: {}, dirty: {}}}
 */
var DEFAULT_CORE_STATE = {
  entities: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, mapToObjectValues(_endpoints_js__WEBPACK_IMPORTED_MODULE_2__["endpoints"])),
  entityIds: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, DEFAULT_LISTS_STATE),
  dirty: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, DEFAULT_LISTS_STATE)
};

/***/ }),

/***/ "./assets/src/data/model/endpoints.js":
/*!********************************************!*\
  !*** ./assets/src/data/model/endpoints.js ***!
  \********************************************/
/*! exports provided: endpoints, getEndpoint, applyQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endpoints", function() { return endpoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEndpoint", function() { return getEndpoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyQueryString", function() { return applyQueryString; });
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validators */ "./assets/src/data/model/validators.js");
/**
 * External imports
 */


/**
 * Internal imports
 */


/**
 * All available endpoints exposed via the eejs.data global from the server.
 *
 * @type {{}}
 */
var _data$paths$collectio = _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["data"].paths.collection_endpoints,
    endpoints = _data$paths$collectio === undefined ? {} : _data$paths$collectio;

/**
 * Retrieves the endpoint for the provided model.
 *
 * @param {string} modelName  What model to retrieve the endpoint for.
 * @return {string}  The endpoint for the provided model.
 * @throws {Exception}
 */


var getEndpoint = function getEndpoint(modelName) {
  Object(_validators__WEBPACK_IMPORTED_MODULE_1__["validateEntityHasKey"])(modelName, endpoints);
  return endpoints[modelName];
};

/**
 * Applies the provided queryString to the endpoint for the provided model name.
 * @param {string} modelName  What model the final string is for.
 * @param {string} queryString  The query being appended to the endpoint.
 * @return {string} The final assembled query string.
 */
var applyQueryString = function applyQueryString(modelName, queryString) {
  return getEndpoint(modelName) + '?' + queryString;
};

/***/ }),

/***/ "./assets/src/data/model/event/constants.js":
/*!**************************************************!*\
  !*** ./assets/src/data/model/event/constants.js ***!
  \**************************************************/
/*! exports provided: MODEL_NAME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return MODEL_NAME; });
var MODEL_NAME = 'event';

/***/ }),

/***/ "./assets/src/data/model/event/index.js":
/*!**********************************************!*\
  !*** ./assets/src/data/model/event/index.js ***!
  \**********************************************/
/*! exports provided: MODEL_NAME, nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/event/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAME"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/event/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nowDateAndTime", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["nowDateAndTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });




/***/ }),

/***/ "./assets/src/data/model/event/query.js":
/*!**********************************************!*\
  !*** ./assets/src/data/model/event/query.js ***!
  \**********************************************/
/*! exports provided: nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nowDateAndTime", function() { return nowDateAndTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return queryDataTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return defaultQueryData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return mapOrderBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return whereConditions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return getQueryString; });
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");

/**
 * External dependencies
 */




/**
 * Internal imports
 */


var nowDateAndTime = moment__WEBPACK_IMPORTED_MODULE_1___default()();

/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */
var queryDataTypes = {
	queryData: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
		limit: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,
		orderBy: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['EVT_name', 'EVT_ID', 'start_date', 'end_date', 'ticket_start', 'ticket_end']),
		order: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(_base__WEBPACK_IMPORTED_MODULE_4__["ALLOWED_ORDER_VALUES"]),
		showExpired: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
		categorySlug: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,
		month: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.month
	})
};

/**
 * Default attributes for this model
 * @type {
 * 	{
 * 		attributes: {
 * 			limit: number,
 * 			orderBy: string,
 * 			order: string,
 *   		showExpired: boolean
 *   	}
 *   }
 * }
 */
var defaultQueryData = {
	queryData: {
		limit: 100,
		orderBy: 'start_date',
		order: _base__WEBPACK_IMPORTED_MODULE_4__["QUERY_ORDER_DESC"],
		showExpired: false
	}
};

/**
 * Used to map an orderBy string to the actual value used in a REST query from
 * the context of an event.
 *
 * @param {string} orderBy
 *
 * @return { string } Returns an actual orderBy string for the REST query for
 *                      the provided alias
 */
var mapOrderBy = function mapOrderBy(orderBy) {
	var orderByMap = {
		start_date: 'Datetime.DTT_EVT_start',
		end_date: 'Datetime.DTT_EVT_end',
		ticket_start: 'Datetime.Ticket.TKT_start_date',
		ticket_end: 'Datetime.Ticket.TKT_end_date'
	};
	return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
};

/**
 * Builds where conditions for an events endpoint request using provided
 * information.
 *
 * @param {boolean} showExpired  Whether or not to include expired events.
 * @param {string} categorySlug  Return events for the given categorySlug
 * @param {string} month         Return events for the given month.
 * 								 Can be any month format recognized by moment.
 * @return {string}              The assembled where conditions.
 */
var whereConditions = function whereConditions(_ref) {
	var _ref$showExpired = _ref.showExpired,
	    showExpired = _ref$showExpired === undefined ? false : _ref$showExpired,
	    categorySlug = _ref.categorySlug,
	    _ref$month = _ref.month,
	    month = _ref$month === undefined ? 'none' : _ref$month;

	var where = [];

	if (!showExpired) {
		where.push('where[Datetime.DTT_EVT_end**expired][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN"] + '&where[Datetime.DTT_EVT_end**expired][]=' + nowDateAndTime.local().format());
	}
	if (categorySlug) {
		where.push('where[Term_Relationship.Term_Taxonomy.Term.slug]=' + categorySlug);
	}
	if (month && month !== 'none') {
		where.push('where[Datetime.DTT_EVT_start][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN_AND_EQUAL"] + '&where[Datetime.DTT_EVT_start][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).startOf('month').local().format());
		where.push('where[Datetime.DTT_EVT_end][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["LESS_THAN_AND_EQUAL"] + '&where[Datetime.DTT_EVT_end][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).endOf('month').local().format());
	}
	return where.join('&');
};

/**
 * Return a query string for use by a REST request given a set of queryData.
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */
var getQueryString = function getQueryString() {
	var queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	queryData = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
	return Object(_base__WEBPACK_IMPORTED_MODULE_4__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/index.js":
/*!****************************************!*\
  !*** ./assets/src/data/model/index.js ***!
  \****************************************/
/*! exports provided: DEFAULT_LISTS_STATE, DEFAULT_CORE_STATE, endpoints, getEndpoint, applyQueryString, primaryKeys, valuesForCombinedPrimaryKeys, valueForPrimaryKey, getPrimaryKey, getEntityPrimaryKeyValues, keyEntitiesByPrimaryKeyValue, validateEntityHasKey, validateIsArray, validateIsNotEmpty, MODEL_NAMES, QUERY_ORDER_ASC, QUERY_ORDER_DESC, ALLOWED_ORDER_VALUES, GREATER_THAN, LESS_THAN, GREATER_THAN_AND_EQUAL, LESS_THAN_AND_EQUAL, getQueryString, dateTimeModel, eventModel, registrationModel, statusModel, ticketModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_model_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default-model-state */ "./assets/src/data/model/default-model-state.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LISTS_STATE", function() { return _default_model_state__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_LISTS_STATE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CORE_STATE", function() { return _default_model_state__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_CORE_STATE"]; });

/* harmony import */ var _endpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endpoints */ "./assets/src/data/model/endpoints.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "endpoints", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_1__["endpoints"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getEndpoint", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_1__["getEndpoint"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyQueryString", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_1__["applyQueryString"]; });

/* harmony import */ var _primary_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./primary-keys */ "./assets/src/data/model/primary-keys.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "primaryKeys", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["primaryKeys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "valuesForCombinedPrimaryKeys", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["valuesForCombinedPrimaryKeys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "valueForPrimaryKey", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["valueForPrimaryKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPrimaryKey", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["getPrimaryKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getEntityPrimaryKeyValues", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["getEntityPrimaryKeyValues"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keyEntitiesByPrimaryKeyValue", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["keyEntitiesByPrimaryKeyValue"]; });

/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validators */ "./assets/src/data/model/validators.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateEntityHasKey", function() { return _validators__WEBPACK_IMPORTED_MODULE_3__["validateEntityHasKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateIsArray", function() { return _validators__WEBPACK_IMPORTED_MODULE_3__["validateIsArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateIsNotEmpty", function() { return _validators__WEBPACK_IMPORTED_MODULE_3__["validateIsNotEmpty"]; });

/* harmony import */ var _model_names__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./model-names */ "./assets/src/data/model/model-names.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return _model_names__WEBPACK_IMPORTED_MODULE_4__["MODEL_NAMES"]; });

/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base */ "./assets/src/data/model/base.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_ASC", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["QUERY_ORDER_ASC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_DESC", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["QUERY_ORDER_DESC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALLOWED_ORDER_VALUES", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["ALLOWED_ORDER_VALUES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GREATER_THAN", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["GREATER_THAN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LESS_THAN", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["LESS_THAN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GREATER_THAN_AND_EQUAL", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["GREATER_THAN_AND_EQUAL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LESS_THAN_AND_EQUAL", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["LESS_THAN_AND_EQUAL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _base__WEBPACK_IMPORTED_MODULE_5__["getQueryString"]; });

/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./models */ "./assets/src/data/model/models.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateTimeModel", function() { return _models__WEBPACK_IMPORTED_MODULE_6__["dateTimeModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventModel", function() { return _models__WEBPACK_IMPORTED_MODULE_6__["eventModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registrationModel", function() { return _models__WEBPACK_IMPORTED_MODULE_6__["registrationModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "statusModel", function() { return _models__WEBPACK_IMPORTED_MODULE_6__["statusModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ticketModel", function() { return _models__WEBPACK_IMPORTED_MODULE_6__["ticketModel"]; });









/***/ }),

/***/ "./assets/src/data/model/model-names.js":
/*!**********************************************!*\
  !*** ./assets/src/data/model/model-names.js ***!
  \**********************************************/
/*! exports provided: MODEL_NAMES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return MODEL_NAMES; });
/* harmony import */ var _primary_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./primary-keys.js */ "./assets/src/data/model/primary-keys.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Internal imports
 */


/**
 * External imports
 */


/**
 * Returns an array of model names currently exposed for REST API request.
 */
var MODEL_NAMES = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["keys"])(_primary_keys_js__WEBPACK_IMPORTED_MODULE_0__["primaryKeys"]);

/***/ }),

/***/ "./assets/src/data/model/models.js":
/*!*****************************************!*\
  !*** ./assets/src/data/model/models.js ***!
  \*****************************************/
/*! exports provided: dateTimeModel, eventModel, registrationModel, statusModel, ticketModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datetime */ "./assets/src/data/model/datetime/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "dateTimeModel", function() { return _datetime__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event */ "./assets/src/data/model/event/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "eventModel", function() { return _event__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _registration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./registration */ "./assets/src/data/model/registration/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "registrationModel", function() { return _registration__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./status */ "./assets/src/data/model/status/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "statusModel", function() { return _status__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _ticket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ticket */ "./assets/src/data/model/ticket/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ticketModel", function() { return _ticket__WEBPACK_IMPORTED_MODULE_4__; });








/***/ }),

/***/ "./assets/src/data/model/primary-keys.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/primary-keys.js ***!
  \***********************************************/
/*! exports provided: primaryKeys, valuesForCombinedPrimaryKeys, valueForPrimaryKey, getPrimaryKey, getEntityPrimaryKeyValues, keyEntitiesByPrimaryKeyValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "primaryKeys", function() { return primaryKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valuesForCombinedPrimaryKeys", function() { return valuesForCombinedPrimaryKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valueForPrimaryKey", function() { return valueForPrimaryKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPrimaryKey", function() { return getPrimaryKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntityPrimaryKeyValues", function() { return getEntityPrimaryKeyValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyEntitiesByPrimaryKeyValue", function() { return keyEntitiesByPrimaryKeyValue; });
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! memize */ "./node_modules/memize/index.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(memize__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validators */ "./assets/src/data/model/validators.js");
/**
 * External imports
 */





/**
 * Internal imports
 */


/**
 * Exposes a map of modelname to primary key exposed by the eejs.data global
 * via the server.
 *
 * @type {{}}
 */
var _data$paths$primary_k = _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["data"].paths.primary_keys,
    primaryKeys = _data$paths$primary_k === undefined ? {} : _data$paths$primary_k;

/**
 * Returns the values for the given keys from the provided entity.
 * This function would be used for models that have combined primary keys
 * (delivered as an array).
 *
 * @type { memoized }
 * @return { string } The string representation for the values.
 * @throws { Exception }
 */


var valuesForCombinedPrimaryKeys = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (keys, entity) {
  Object(_validators__WEBPACK_IMPORTED_MODULE_4__["validateIsArray"])(keys);
  var primaryKey = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["reduce"])(keys, function (result, key) {
    Object(_validators__WEBPACK_IMPORTED_MODULE_4__["validateEntityHasKey"])(key, entity);
    return entity[result] + ':' + entity[key];
  });
  return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["trimEnd"])(primaryKey, ':');
});

/**
 * Returns the value for the given key from the provided entity.
 * This function would be used for models that have only one primary key.
 *
 * @type {memoized}
 * @return { number } The value for the key in the provided entity.
 * @throws { Exception }
 */
var valueForPrimaryKey = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (key, entity) {
  Object(_validators__WEBPACK_IMPORTED_MODULE_4__["validateEntityHasKey"])(key, entity);
  return entity[key];
});

/**
 * Returns the primary key (or combined primary keys) from the available data.
 *
 * @type {memoized}
 * @return { string|Array }
 * @throws { Exception }
 */
var getPrimaryKey = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (modelName) {
  Object(_validators__WEBPACK_IMPORTED_MODULE_4__["validateEntityHasKey"])(modelName, primaryKeys);
  return primaryKeys[modelName];
});

/**
 * Returns the values for the primary keys from the provided entity.
 *
 * @type {memoized}
 * @return { string }  If the model has only one primary key then the value will
 * be a simple string.  If the model has combined primary keys, then the value
 * will be as string in the format `%s.%s` for the primary key values.
 * @throws { Exception }
 */
var getEntityPrimaryKeyValues = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (modelName, entity) {
  var keys = getPrimaryKey(modelName);
  return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isArray"])(keys) ? valuesForCombinedPrimaryKeys(keys, entity) : valueForPrimaryKey(keys, entity);
});

/**
 * This receives an array of entities and returns a collection of those same
 * entities indexed by the primary key value for each entity.
 *
 * @param { string } modelName
 * @param { Array } entities
 * @return {*}  A collection indexed by the primary key values for each entity.
 * @throws { Exception }
 */
var keyEntitiesByPrimaryKeyValue = function keyEntitiesByPrimaryKeyValue(modelName) {
  var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  Object(_validators__WEBPACK_IMPORTED_MODULE_4__["validateIsNotEmpty"])(entities, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('The provided array of entities must not be empty', 'event_espresso'));
  Object(_validators__WEBPACK_IMPORTED_MODULE_4__["validateIsArray"])(entities);
  return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["keyBy"])(entities, function (entity) {
    return String(getEntityPrimaryKeyValues(modelName, entity));
  });
};

/***/ }),

/***/ "./assets/src/data/model/registration/constants.js":
/*!*********************************************************!*\
  !*** ./assets/src/data/model/registration/constants.js ***!
  \*********************************************************/
/*! exports provided: MODEL_NAME, REGISTRATION_STATUS_IDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return MODEL_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGISTRATION_STATUS_IDS", function() { return REGISTRATION_STATUS_IDS; });
/* harmony import */ var _status_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../status/constants */ "./assets/src/data/model/status/constants.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Internal Imports
 */


/**
 * External imports
 */


var MODEL_NAME = 'registration';

var REGISTRATION_STATUS_IDS = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(_status_constants__WEBPACK_IMPORTED_MODULE_0__["REGISTRATION_STATUS_ID"]);

/***/ }),

/***/ "./assets/src/data/model/registration/index.js":
/*!*****************************************************!*\
  !*** ./assets/src/data/model/registration/index.js ***!
  \*****************************************************/
/*! exports provided: MODEL_NAME, REGISTRATION_STATUS_IDS, queryDataTypes, optionsEntityMap, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/registration/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAME"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "REGISTRATION_STATUS_IDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["REGISTRATION_STATUS_IDS"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/registration/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "optionsEntityMap", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["optionsEntityMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });




/***/ }),

/***/ "./assets/src/data/model/registration/query.js":
/*!*****************************************************!*\
  !*** ./assets/src/data/model/registration/query.js ***!
  \*****************************************************/
/*! exports provided: queryDataTypes, optionsEntityMap, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return queryDataTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optionsEntityMap", function() { return optionsEntityMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return defaultQueryData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return mapOrderBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return whereConditions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return getQueryString; });
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");
/* harmony import */ var _status_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../status/constants */ "./assets/src/data/model/status/constants.js");

/**
 * External imports
 */



/**
 * Internal imports
 */



/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */
var queryDataTypes = {
	forEventId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
	forAttendeeId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
	forTransactionId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
	forTicketId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
	forStatusId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(_status_constants__WEBPACK_IMPORTED_MODULE_4__["REGISTRATION_STATUS_ID"])),
	queryData: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
		limit: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
		orderBy: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['REG_ID', 'REG_date']),
		order: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(_base__WEBPACK_IMPORTED_MODULE_3__["ALLOWED_ORDER_VALUES"])
	})
};

var optionsEntityMap = {
	default: {
		value: 'REG_ID',
		label: 'REG_code'
	}
};

/**
 * Default attributes for this model
 * @type {
 * 	{
 * 		attributes: {
 * 			limit: number,
 * 			orderBy: string,
 * 			order: string,
 *   	}
 *   }
 * }
 */
var defaultQueryData = {
	queryData: {
		limit: 100,
		orderBy: 'reg_date',
		order: _base__WEBPACK_IMPORTED_MODULE_3__["QUERY_ORDER_DESC"]
	}
};

/**
 * Used to map an orderBy string to the actual value used in a REST query from
 * the context of a registration.
 *
 * @param {string} orderBy
 *
 * @return { string } Returns an actual orderBy string for the REST query for
 *                      the provided alias
 */
var mapOrderBy = function mapOrderBy(orderBy) {
	var orderByMap = {
		reg_id: 'REG_ID',
		reg_date: 'REG_date'
	};
	return Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
};

/**
 * Builds where conditions for an registrations endpoint request
 *
 * @param {number} forEventId    	ID of Event to retrieve registrations for
 * @param {number} forAttendeeId    ID of Attendee to retrieve registrations for
 * @param {number} forTransactionId ID of Transaction to retrieve registrations for
 * @param {number} forTicketId 		ID of Ticket to retrieve registrations for
 * @param {string} forStatusId 		ID of Status to retrieve registrations for
 * @return {string}                	The assembled where conditions.
 */
var whereConditions = function whereConditions(_ref) {
	var _ref$forEventId = _ref.forEventId,
	    forEventId = _ref$forEventId === undefined ? 0 : _ref$forEventId,
	    _ref$forAttendeeId = _ref.forAttendeeId,
	    forAttendeeId = _ref$forAttendeeId === undefined ? 0 : _ref$forAttendeeId,
	    _ref$forTransactionId = _ref.forTransactionId,
	    forTransactionId = _ref$forTransactionId === undefined ? 0 : _ref$forTransactionId,
	    _ref$forTicketId = _ref.forTicketId,
	    forTicketId = _ref$forTicketId === undefined ? 0 : _ref$forTicketId,
	    _ref$forStatusId = _ref.forStatusId,
	    forStatusId = _ref$forStatusId === undefined ? '' : _ref$forStatusId;

	var where = [];
	forEventId = parseInt(forEventId, 10);
	if (forEventId !== 0 && !isNaN(forEventId)) {
		where.push('where[EVT_ID]=' + forEventId);
	}
	forAttendeeId = parseInt(forAttendeeId, 10);
	if (forAttendeeId !== 0 && !isNaN(forAttendeeId)) {
		where.push('where[ATT_ID]=' + forAttendeeId);
	}
	forTransactionId = parseInt(forTransactionId, 10);
	if (forTransactionId !== 0 && !isNaN(forTransactionId)) {
		where.push('where[TXN_ID]=' + forTransactionId);
	}
	forTicketId = parseInt(forTicketId, 10);
	if (forTicketId !== 0 && !isNaN(forTicketId)) {
		where.push('where[TKT_ID]=' + forTicketId);
	}
	if (forStatusId !== '' && forStatusId !== null) {
		where.push('where[STS_ID]=' + forStatusId);
	}
	return where.join('&');
};

/**
 * Return a query string for use by a REST request given a set of queryData.
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */
var getQueryString = function getQueryString() {
	var queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	queryData = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
	return Object(_base__WEBPACK_IMPORTED_MODULE_3__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/status/constants.js":
/*!***************************************************!*\
  !*** ./assets/src/data/model/status/constants.js ***!
  \***************************************************/
/*! exports provided: MODEL_NAME, STATUS_TYPE_EMAIL, STATUS_TYPE_EVENT, STATUS_TYPE_MESSAGE, STATUS_TYPE_PAYMENT, STATUS_TYPE_REGISTRATION, STATUS_TYPE_TRANSACTION, EMAIL_STATUS_ID, EVENT_STATUS_ID, MESSAGE_STATUS_ID, PAYMENT_STATUS_ID, REGISTRATION_STATUS_ID, TRANSACTION_STATUS_ID, ALL_STATUS_IDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return MODEL_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_EMAIL", function() { return STATUS_TYPE_EMAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_EVENT", function() { return STATUS_TYPE_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_MESSAGE", function() { return STATUS_TYPE_MESSAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_PAYMENT", function() { return STATUS_TYPE_PAYMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_REGISTRATION", function() { return STATUS_TYPE_REGISTRATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_TRANSACTION", function() { return STATUS_TYPE_TRANSACTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMAIL_STATUS_ID", function() { return EMAIL_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_STATUS_ID", function() { return EVENT_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGE_STATUS_ID", function() { return MESSAGE_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAYMENT_STATUS_ID", function() { return PAYMENT_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGISTRATION_STATUS_ID", function() { return REGISTRATION_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRANSACTION_STATUS_ID", function() { return TRANSACTION_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_STATUS_IDS", function() { return ALL_STATUS_IDS; });
/* harmony import */ var babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "./node_modules/babel-runtime/helpers/toConsumableArray.js");
/* harmony import */ var babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);

/**
 * External imports
 */


var MODEL_NAME = 'status';
// types
var STATUS_TYPE_EMAIL = 'email';
var STATUS_TYPE_EVENT = 'event';
var STATUS_TYPE_MESSAGE = 'message';
var STATUS_TYPE_PAYMENT = 'payment';
var STATUS_TYPE_REGISTRATION = 'registration';
var STATUS_TYPE_TRANSACTION = 'transaction';
// email
var EMAIL_STATUS_ID = {
	DRAFT: 'EDR',
	SENT: 'ESN',
	EXPIRED: 'EXP'
};
// event
var EVENT_STATUS_ID = {
	ACTIVE: 'ACT',
	REGISTRATION_CLOSED: 'CLS',
	DELETED: 'DEL',
	DENIED: 'DEN',
	DRAFT: 'DRF',
	NOT_ACTIVE: 'NAC',
	NOT_OPEN: 'NOP',
	ONGOING: 'ONG',
	REGISTRATION_OPEN: 'OPN',
	PENDING: 'PND',
	SECONDARY: 'SEC'
};
// message
var MESSAGE_STATUS_ID = {
	DEBUG: 'MDO',
	EXECUTING: 'MEX',
	FAIL: 'MFL',
	INCOMPLETE: 'MIC',
	IDLE: 'MID',
	RESEND: 'MRS',
	SENT: 'MSN'
};
// payment
var PAYMENT_STATUS_ID = {
	APPROVED: 'PAP',
	CANCELLED: 'PCN',
	DECLINED: 'PDC',
	FAILED: 'PFL',
	PENDING: 'PPN'
};
// registration
var REGISTRATION_STATUS_ID = {
	APPROVED: 'RAP',
	CANCELLED: 'RCN',
	DECLINED: 'RDC',
	INCOMPLETE: 'RIC',
	NOT_APPROVED: 'RNA',
	PENDING_PAYMENT: 'RPP',
	WAIT_LIST: 'RWL'
};
// transaction
var TRANSACTION_STATUS_ID = {
	ABANDONED: 'TAB',
	COMPLETE: 'TCM',
	FAILED: 'TFL',
	INCOMPLETE: 'TIN',
	OVERPAID: 'TOP'
};

var ALL_STATUS_IDS = [].concat(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(EMAIL_STATUS_ID)), babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(EVENT_STATUS_ID)), babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(MESSAGE_STATUS_ID)), babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(PAYMENT_STATUS_ID)), babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(REGISTRATION_STATUS_ID)), babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(TRANSACTION_STATUS_ID)));

/***/ }),

/***/ "./assets/src/data/model/status/index.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/status/index.js ***!
  \***********************************************/
/*! exports provided: MODEL_NAME, STATUS_TYPE_EMAIL, STATUS_TYPE_EVENT, STATUS_TYPE_MESSAGE, STATUS_TYPE_PAYMENT, STATUS_TYPE_REGISTRATION, STATUS_TYPE_TRANSACTION, EMAIL_STATUS_ID, EVENT_STATUS_ID, MESSAGE_STATUS_ID, PAYMENT_STATUS_ID, REGISTRATION_STATUS_ID, TRANSACTION_STATUS_ID, ALL_STATUS_IDS, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/status/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAME"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_EMAIL", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["STATUS_TYPE_EMAIL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_EVENT", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["STATUS_TYPE_EVENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_MESSAGE", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["STATUS_TYPE_MESSAGE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_PAYMENT", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["STATUS_TYPE_PAYMENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_REGISTRATION", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["STATUS_TYPE_REGISTRATION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_TRANSACTION", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["STATUS_TYPE_TRANSACTION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EMAIL_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["EMAIL_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EVENT_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MESSAGE_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MESSAGE_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PAYMENT_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["PAYMENT_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "REGISTRATION_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["REGISTRATION_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TRANSACTION_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["TRANSACTION_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALL_STATUS_IDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["ALL_STATUS_IDS"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/status/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });




/***/ }),

/***/ "./assets/src/data/model/status/query.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/status/query.js ***!
  \***********************************************/
/*! exports provided: queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return queryDataTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return defaultQueryData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return mapOrderBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return whereConditions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return getQueryString; });
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");

/**
 * External imports
 */



/**
 * Internal dependencies
 */


/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */
var queryDataTypes = {
  queryData: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    limit: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
    orderBy: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    order: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(_base__WEBPACK_IMPORTED_MODULE_3__["ALLOWED_ORDER_VALUES"])
  })
};

/**
 * Default attributes for this model
 * @type {
 * 	{
 * 		attributes: {
 * 			limit: number,
 * 			orderBy: string,
 * 			order: string,
 *   	}
 *   }
 * }
 */
var defaultQueryData = {
  queryData: {
    limit: 25,
    orderBy: 'statusCode',
    order: _base__WEBPACK_IMPORTED_MODULE_3__["QUERY_ORDER_ASC"]
  }
};

/**
 * Used to map an orderBy string to the actual value used in a REST query from
 * the context of an event.
 *
 * @param {string} orderBy
 *
 * @return { string } Returns an actual orderBy string for the REST query for
 *                      the provided alias
 */
var mapOrderBy = function mapOrderBy(orderBy) {
  var orderByMap = {
    statusCode: 'STS_code'
  };
  return Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
};

/**
 * Builds where conditions for an events endpoint request using provided
 * information.
 *
 * @param {number} statusType 	ID for type of Status to retrieve
 * @return {string}             The assembled where conditions.
 */
var whereConditions = function whereConditions(_ref) {
  var statusType = _ref.statusType;

  var where = [];
  if (statusType) {
    where.push('where[STS_type]=' + statusType);
  }
  return where.join('&');
};

/**
 * Return a query string for use by a REST request given a set of queryData.
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */
var getQueryString = function getQueryString() {
  var queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  queryData = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
  return Object(_base__WEBPACK_IMPORTED_MODULE_3__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/ticket/constants.js":
/*!***************************************************!*\
  !*** ./assets/src/data/model/ticket/constants.js ***!
  \***************************************************/
/*! exports provided: MODEL_NAME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return MODEL_NAME; });
var MODEL_NAME = 'ticket';

/***/ }),

/***/ "./assets/src/data/model/ticket/index.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/ticket/index.js ***!
  \***********************************************/
/*! exports provided: MODEL_NAME, nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/ticket/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAME"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/ticket/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nowDateAndTime", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["nowDateAndTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });




/***/ }),

/***/ "./assets/src/data/model/ticket/query.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/ticket/query.js ***!
  \***********************************************/
/*! exports provided: nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nowDateAndTime", function() { return nowDateAndTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return queryDataTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return defaultQueryData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return mapOrderBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return whereConditions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return getQueryString; });
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");

/**
 * External imports
 */






var nowDateAndTime = moment__WEBPACK_IMPORTED_MODULE_1___default()();

/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */
var queryDataTypes = {
	queryData: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
		limit: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,
		orderBy: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['TKT_name', 'TKT_ID', 'start_date', 'end_date']),
		order: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(_base__WEBPACK_IMPORTED_MODULE_4__["ALLOWED_ORDER_VALUES"]),
		showExpired: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
		month: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.month
	})
};

/**
 * Default attributes for this model
 * @type {
 * 	{
 * 		attributes: {
 * 			limit: number,
 * 			orderBy: string,
 * 			order: string,
 *   		showExpired: boolean
 *   	}
 *   }
 * }
 */
var defaultQueryData = {
	queryData: {
		limit: 100,
		orderBy: 'start_date',
		order: _base__WEBPACK_IMPORTED_MODULE_4__["QUERY_ORDER_DESC"],
		showExpired: false
	}
};

/**
 * Used to map an orderBy string to the actual value used in a REST query from
 * the context of a ticket.
 *
 * @param {string} orderBy
 *
 * @return { string } Returns an actual orderBy string for the REST query for
 *                      the provided alias
 */
var mapOrderBy = function mapOrderBy(orderBy) {
	var orderByMap = {
		start_date: 'TKT_start_date',
		end_date: 'TKT_end_date'
	};
	return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
};

/**
 * Builds where conditions for an tickets endpoint request using provided
 * information.
 *
 * @param {boolean} showExpired 	Whether or not to include expired tickets.
 * @param {string} month            Return tickets for the given month. Can be
 *                                	in any month format recognized by moment
 * @param {number} forEventId    	ID of Event to retrieve tickets for
 * @param {number} forDatetimeId    ID of Datetime to retrieve tickets for
 * @return {string}                	The assembled where conditions.
 */
var whereConditions = function whereConditions(_ref) {
	var _ref$forEventId = _ref.forEventId,
	    forEventId = _ref$forEventId === undefined ? 0 : _ref$forEventId,
	    _ref$forDatetimeId = _ref.forDatetimeId,
	    forDatetimeId = _ref$forDatetimeId === undefined ? 0 : _ref$forDatetimeId,
	    _ref$showExpired = _ref.showExpired,
	    showExpired = _ref$showExpired === undefined ? false : _ref$showExpired,
	    _ref$month = _ref.month,
	    month = _ref$month === undefined ? 'none' : _ref$month;

	var where = [];
	if (!showExpired) {
		where.push('where[TKT_end_date**expired][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN"] + '&where[TKT_end_date**expired][]=' + nowDateAndTime.local().format());
	}
	if (month && month !== 'none') {
		where.push('where[TKT_start_date][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN_AND_EQUAL"] + '&where[TKT_start_date][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).startOf('month').local().format());
		where.push('where[TKT_end_date][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["LESS_THAN_AND_EQUAL"] + '&where[TKT_end_date][]=' + moment__WEBPACK_IMPORTED_MODULE_1___default()().month(month).endOf('month').local().format());
	}
	forEventId = parseInt(forEventId, 10);
	if (forEventId !== 0 && !isNaN(forEventId)) {
		where.push('where[Datetime.Event.EVT_ID]=' + forEventId);
	}
	forDatetimeId = parseInt(forDatetimeId, 10);
	if (forDatetimeId !== 0 && !isNaN(forDatetimeId)) {
		where.push('where[Datetime.DTT_ID]=' + forDatetimeId);
	}
	return where.join('&');
};

/**
 * Return a query string for use by a REST request given a set of queryData.
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */
var getQueryString = function getQueryString() {
	var queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	queryData = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
	return Object(_base__WEBPACK_IMPORTED_MODULE_4__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/validators.js":
/*!*********************************************!*\
  !*** ./assets/src/data/model/validators.js ***!
  \*********************************************/
/*! exports provided: validateEntityHasKey, validateIsArray, validateIsNotEmpty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateEntityHasKey", function() { return validateEntityHasKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateIsArray", function() { return validateIsArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateIsNotEmpty", function() { return validateIsNotEmpty; });
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/**
 * External imports
 */




/**
 * Validates whether the given key exists in the provided entity object.
 * This is used when calling code wants an exception to be thrown.
 *
 * @param { string } key
 * @param { Object } entity
 * @param { string } message
 * @throws { Exception }  Throws an exception if the provided entity does not
 *                          have the given key.
 */
var validateEntityHasKey = function validateEntityHasKey(key, entity) {
	var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	if (message === '') {
		message = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('The provided entity (%s) does not have the given property (%s)', 'event_espresso'), entity, key);
	}
	if (!entity.hasOwnProperty(key)) {
		throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["Exception"](message);
	}
};

/**
 * Validates whether the given value is an array.
 *
 * @param {*} items
 * @param { string }  message
 * @throws { Exception } Throws an exception if the provided value is not an
 *                          array.
 */
var validateIsArray = function validateIsArray(items) {
	var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	if (message === '') {
		message = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('The provided value is not an array.', 'event_espresso');
	}
	if (!Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isArray"])(items)) {
		throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["Exception"](message);
	}
};

/**
 * Validates whether the given value is empty or not.
 *
 * Call this validator when you want to make sure the value is NOT empty.
 *
 * @param {*} items
 * @param { string } message
 * @throws { Exception } Throws an exception if the provided value is empty.
 */
var validateIsNotEmpty = function validateIsNotEmpty(items) {
	var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	if (message === '') {
		message = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('The provided items must not be empty', 'event_espresso');
	}
	if (Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(items)) {
		throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["Exception"](message);
	}
};

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/array/from.js":
/*!**********************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/array/from.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/array/from */ "./node_modules/core-js/library/fn/array/from.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/get-iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/get-iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/get-iterator */ "./node_modules/core-js/library/fn/get-iterator.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/assign.js":
/*!*************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/assign.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/assign */ "./node_modules/core-js/library/fn/object/assign.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/extends.js":
/*!*******************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/extends.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(/*! ../core-js/object/assign */ "./node_modules/babel-runtime/core-js/object/assign.js");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/toConsumableArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/toConsumableArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(/*! ../core-js/array/from */ "./node_modules/babel-runtime/core-js/array/from.js");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),

/***/ "./node_modules/core-js/library/fn/array/from.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/fn/array/from.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ "./node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__(/*! ../../modules/es6.array.from */ "./node_modules/core-js/library/modules/es6.array.from.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Array.from;


/***/ }),

/***/ "./node_modules/core-js/library/fn/get-iterator.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/fn/get-iterator.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/library/modules/es6.string.iterator.js");
module.exports = __webpack_require__(/*! ../modules/core.get-iterator */ "./node_modules/core-js/library/modules/core.get-iterator.js");


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

/***/ "./node_modules/core-js/library/modules/_add-to-unscopables.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_add-to-unscopables.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


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

/***/ "./node_modules/core-js/library/modules/_classof.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_classof.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/library/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
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

/***/ "./node_modules/core-js/library/modules/_create-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_create-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


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

/***/ "./node_modules/core-js/library/modules/_html.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_html.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js").document;
module.exports = document && document.documentElement;


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

/***/ "./node_modules/core-js/library/modules/_is-array-iter.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-array-iter.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
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

/***/ "./node_modules/core-js/library/modules/_iter-call.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-call.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-create.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-create.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/library/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/library/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-define.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-define.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/library/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/library/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/library/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/library/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/library/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-detect.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-detect.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-step.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-step.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iterators.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iterators.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


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

/***/ "./node_modules/core-js/library/modules/_object-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-create.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/library/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/library/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/library/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/library/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


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

/***/ "./node_modules/core-js/library/modules/_object-dps.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dps.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/library/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
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

/***/ "./node_modules/core-js/library/modules/_object-gpo.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gpo.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/library/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


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

/***/ "./node_modules/core-js/library/modules/_redefine.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_redefine.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");


/***/ }),

/***/ "./node_modules/core-js/library/modules/_set-to-string-tag.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-to-string-tag.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
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

/***/ "./node_modules/core-js/library/modules/_string-at.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_string-at.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/library/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/library/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


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

/***/ "./node_modules/core-js/library/modules/_wks.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/library/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/library/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/library/modules/core.get-iterator-method.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/core.get-iterator-method.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/library/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/core.get-iterator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/core.get-iterator.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var get = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/library/modules/core.get-iterator-method.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.array.from.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.array.from.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/library/modules/_to-object.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/library/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/library/modules/_is-array-iter.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/library/modules/_to-length.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/core-js/library/modules/_create-property.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/library/modules/core.get-iterator-method.js");

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/library/modules/_iter-detect.js")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.array.iterator.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.array.iterator.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/library/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/library/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/library/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


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

/***/ "./node_modules/core-js/library/modules/es6.string.iterator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.string.iterator.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/library/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/library/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/web.dom.iterable.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/web.dom.iterable.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/library/modules/es6.array.iterator.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
var TO_STRING_TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


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
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
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
          )

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



var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

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
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
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
       true ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
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
        if (propValue.hasOwnProperty(key)) {
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
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(isValidElement, throwOnDirectAccess);
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

/***/ "@eventespresso/eejs":
/*!***********************!*\
  !*** external "eejs" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs;

/***/ }),

/***/ "@eventespresso/helpers":
/*!*******************************!*\
  !*** external "eejs.helpers" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.helpers;

/***/ }),

/***/ "@eventespresso/i18n":
/*!****************************!*\
  !*** external "eejs.i18n" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.i18n;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLltuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9iYXNlLWRhdGUtZm9ybWF0dGVyLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZGF0ZXRpbWUvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2RhdGV0aW1lL2Zvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9xdWVyeS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kZWZhdWx0LW1vZGVsLXN0YXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VuZHBvaW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9ldmVudC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZXZlbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZXZlbnQvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvbW9kZWwtbmFtZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvbW9kZWxzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3ByaW1hcnkta2V5cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3JlZ2lzdHJhdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvc3RhdHVzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvc3RhdHVzL3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3RpY2tldC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3RpY2tldC9xdWVyeS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC92YWxpZGF0b3JzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9tZW1pemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcImVlanNcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcImVlanMuaGVscGVyc1wiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwiZWVqcy5pMThuXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzLnZlbmRvci5sb2Rhc2hcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcImVlanMudmVuZG9yLm1vbWVudFwiIl0sIm5hbWVzIjpbImZvcm1hdERhdGVzT25FbnRpdGllcyIsImVudGl0aWVzIiwiZW50aXR5RGF0ZUZpZWxkcyIsImZvcm1hdCIsImxvY2FsIiwiaXNFbXB0eSIsImZvcm1hdHRlZEVudGl0aWVzIiwiZm9yRWFjaCIsImVudGl0eSIsInB1c2giLCJmb3JtYXREYXRlc09uRW50aXR5IiwibmV3RW50aXR5IiwiZGF0ZUZpZWxkIiwiZm9ybWF0RW50aXRpZXNEYXRlc1RvTXlzcWwiLCJmb3JtYXRFbnRpdHlEYXRlc1RvTXlzcWwiLCJmb3JtYXRFbnRpdGllc0RhdGVzVG9TaXRlIiwiZm9ybWF0RW50aXR5RGF0ZXNUb1NpdGUiLCJjb252ZXJ0RW50aXRpZXNEYXRlc1RvTW9tZW50IiwiY29udmVydEVudGl0eURhdGVzVG9Nb21lbnQiLCJRVUVSWV9PUkRFUl9BU0MiLCJRVUVSWV9PUkRFUl9ERVNDIiwiQUxMT1dFRF9PUkRFUl9WQUxVRVMiLCJHUkVBVEVSX1RIQU4iLCJlbmNvZGVVUklDb21wb25lbnQiLCJMRVNTX1RIQU4iLCJHUkVBVEVSX1RIQU5fQU5EX0VRVUFMIiwiTEVTU19USEFOX0FORF9FUVVBTCIsImdldFF1ZXJ5U3RyaW5nIiwicXVlcnlEYXRhIiwid2hlcmVDb25kaXRpb25zIiwibWFwT3JkZXJCeSIsIm9yZGVyQnkiLCJ3aGVyZSIsImxpbWl0Iiwib3JkZXIiLCJxdWVyeVBhcmFtcyIsImlzVW5kZWZpbmVkIiwiaXNBcnJheSIsImZpZWxkIiwicXVlcnlTdHJpbmciLCJqb2luIiwiTU9ERUxfTkFNRSIsIkRBVEVfRklFTERTIiwiZm9ybWF0dGVycyIsImZvck93biIsImltcGxlbWVudGF0aW9uIiwiZnVuY3Rpb25OYW1lIiwiaW5jb21pbmdBcmdzIiwiZmlyc3RBcmciLCJwdWxsQXQiLCJwcmV0dHlEYXRlRnJvbURhdGVUaW1lIiwiRGF0ZVRpbWVFbnRpdHkiLCJjb250ZW50IiwiRFRUX0VWVF9zdGFydCIsIkRUVF9FVlRfZW5kIiwiYWxsRGF0ZVRpbWVzQXNTdHJpbmciLCJEVFRfbmFtZSIsIm5vd0RhdGVBbmRUaW1lIiwibW9tZW50IiwicXVlcnlEYXRhVHlwZXMiLCJQcm9wVHlwZXMiLCJzaGFwZSIsIm51bWJlciIsIm9uZU9mIiwic2hvd0V4cGlyZWQiLCJib29sIiwibW9udGgiLCJkZWZhdWx0UXVlcnlEYXRhIiwib3JkZXJCeU1hcCIsInN0YXJ0X2RhdGUiLCJlbmRfZGF0ZSIsImZvckV2ZW50SWQiLCJzdGFydE9mIiwiZW5kT2YiLCJwYXJzZUludCIsImJhc2VHZXRRdWVyeVN0cmluZyIsIm1hcFRvQXJyYXlWYWx1ZXMiLCJtYXBWYWx1ZXMiLCJtb2RlbE5hbWVFbmRwb2ludHMiLCJtYXBUb09iamVjdFZhbHVlcyIsIkRFRkFVTFRfTElTVFNfU1RBVEUiLCJERUZBVUxUX0NPUkVfU1RBVEUiLCJlbnRpdHlJZHMiLCJkaXJ0eSIsImRhdGEiLCJwYXRocyIsImNvbGxlY3Rpb25fZW5kcG9pbnRzIiwiZW5kcG9pbnRzIiwiZ2V0RW5kcG9pbnQiLCJtb2RlbE5hbWUiLCJ2YWxpZGF0ZUVudGl0eUhhc0tleSIsImFwcGx5UXVlcnlTdHJpbmciLCJjYXRlZ29yeVNsdWciLCJzdHJpbmciLCJ0aWNrZXRfc3RhcnQiLCJ0aWNrZXRfZW5kIiwiTU9ERUxfTkFNRVMiLCJrZXlzIiwicHJpbWFyeV9rZXlzIiwicHJpbWFyeUtleXMiLCJ2YWx1ZXNGb3JDb21iaW5lZFByaW1hcnlLZXlzIiwibWVtb2l6ZSIsInZhbGlkYXRlSXNBcnJheSIsInByaW1hcnlLZXkiLCJyZWR1Y2UiLCJyZXN1bHQiLCJrZXkiLCJ0cmltRW5kIiwidmFsdWVGb3JQcmltYXJ5S2V5IiwiZ2V0UHJpbWFyeUtleSIsImdldEVudGl0eVByaW1hcnlLZXlWYWx1ZXMiLCJrZXlFbnRpdGllc0J5UHJpbWFyeUtleVZhbHVlIiwidmFsaWRhdGVJc05vdEVtcHR5IiwiX18iLCJrZXlCeSIsIlN0cmluZyIsIlJFR0lTVFJBVElPTl9TVEFUVVNfSURTIiwidmFsdWVzIiwiZm9yQXR0ZW5kZWVJZCIsImZvclRyYW5zYWN0aW9uSWQiLCJmb3JUaWNrZXRJZCIsImZvclN0YXR1c0lkIiwib3B0aW9uc0VudGl0eU1hcCIsImRlZmF1bHQiLCJ2YWx1ZSIsImxhYmVsIiwicmVnX2lkIiwicmVnX2RhdGUiLCJpc05hTiIsIlNUQVRVU19UWVBFX0VNQUlMIiwiU1RBVFVTX1RZUEVfRVZFTlQiLCJTVEFUVVNfVFlQRV9NRVNTQUdFIiwiU1RBVFVTX1RZUEVfUEFZTUVOVCIsIlNUQVRVU19UWVBFX1JFR0lTVFJBVElPTiIsIlNUQVRVU19UWVBFX1RSQU5TQUNUSU9OIiwiRU1BSUxfU1RBVFVTX0lEIiwiRFJBRlQiLCJTRU5UIiwiRVhQSVJFRCIsIkVWRU5UX1NUQVRVU19JRCIsIkFDVElWRSIsIlJFR0lTVFJBVElPTl9DTE9TRUQiLCJERUxFVEVEIiwiREVOSUVEIiwiTk9UX0FDVElWRSIsIk5PVF9PUEVOIiwiT05HT0lORyIsIlJFR0lTVFJBVElPTl9PUEVOIiwiUEVORElORyIsIlNFQ09OREFSWSIsIk1FU1NBR0VfU1RBVFVTX0lEIiwiREVCVUciLCJFWEVDVVRJTkciLCJGQUlMIiwiSU5DT01QTEVURSIsIklETEUiLCJSRVNFTkQiLCJQQVlNRU5UX1NUQVRVU19JRCIsIkFQUFJPVkVEIiwiQ0FOQ0VMTEVEIiwiREVDTElORUQiLCJGQUlMRUQiLCJSRUdJU1RSQVRJT05fU1RBVFVTX0lEIiwiTk9UX0FQUFJPVkVEIiwiUEVORElOR19QQVlNRU5UIiwiV0FJVF9MSVNUIiwiVFJBTlNBQ1RJT05fU1RBVFVTX0lEIiwiQUJBTkRPTkVEIiwiQ09NUExFVEUiLCJPVkVSUEFJRCIsIkFMTF9TVEFUVVNfSURTIiwic3RhdHVzQ29kZSIsInN0YXR1c1R5cGUiLCJmb3JEYXRldGltZUlkIiwibWVzc2FnZSIsInNwcmludGYiLCJoYXNPd25Qcm9wZXJ0eSIsIml0ZW1zIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7OztBQUdBO0FBQ0E7O0FBRUE7Ozs7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QUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNOQSxjQUFjOzs7Ozs7Ozs7Ozs7QUNBZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNQQTs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0VBQW9FLGlDQUFpQztBQUNyRzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEOztBQUVsRDtBQUNBLHFFQUFxRTtBQUNyRSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDWEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Q7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsNkJBQTZCO0FBQzdCLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixLQUFLO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsNEJBQTRCO0FBQzVCLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsZ0NBQWdDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixnQ0FBZ0M7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFpQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsUUFJRDs7Ozs7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7OztBQ1hBLHNCOzs7Ozs7Ozs7OztBQ0FBLDhCOzs7Ozs7Ozs7OztBQ0FBLDJCOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLG9DIiwiZmlsZSI6ImVlLW1vZGVsLjMxMDMwMDNkMDc1YTkyMDg4ZTQ5LmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9pbmRleC5qc1wiKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgKiBhcyBkYXRlRm9ybWF0cyBmcm9tICdAZXZlbnRlc3ByZXNzby9oZWxwZXJzJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIG9uIHByb3ZpZGVkIGVudGl0aWVzLiAgRG9lcyBub3QgbXV0YXRlIG9yaWdpbmFsXG4gKiBlbnRpdGllcy5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzICBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IHN0cmluZyB9IGZvcm1hdCAgVGhlIGZvcm1hdCB0byB0cmFuc2Zvcm0gdGhlIGRhdGUgZmllbGQgdmFsdWVzIHRvLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IEFycmF5IH0gIFJldHVybnMgYSBuZXcgYXJyYXkgb2YgbmV3IGVudGl0aWVzIHdpdGggdGhlIGRhdGUgZmllbGRcbiAqICAgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RGF0ZXNPbkVudGl0aWVzID0gKFxuXHRlbnRpdGllcyA9IFtdLFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGZvcm1hdCA9IGRhdGVGb3JtYXRzLkRBVEVfVElNRV9GT1JNQVRfSVNPODYwMSxcblx0bG9jYWwgPSB0cnVlLFxuKSA9PiB7XG5cdGlmICggaXNFbXB0eSggZW50aXRpZXMgKSB8fCBpc0VtcHR5KCBlbnRpdHlEYXRlRmllbGRzICkgKSB7XG5cdFx0cmV0dXJuIGVudGl0aWVzO1xuXHR9XG5cdGNvbnN0IGZvcm1hdHRlZEVudGl0aWVzID0gW107XG5cdGVudGl0aWVzLmZvckVhY2goICggZW50aXR5ICkgPT4ge1xuXHRcdGZvcm1hdHRlZEVudGl0aWVzLnB1c2goIGZvcm1hdERhdGVzT25FbnRpdHkoXG5cdFx0XHRlbnRpdHksXG5cdFx0XHRlbnRpdHlEYXRlRmllbGRzLFxuXHRcdFx0Zm9ybWF0LFxuXHRcdFx0bG9jYWwsXG5cdFx0KSApO1xuXHR9ICk7XG5cdHJldHVybiBmb3JtYXR0ZWRFbnRpdGllcztcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgb24gdGhlIHByb3ZpZGVkIGVudGl0eS4gIERvZXMgbm90IG11dGF0ZSBvcmlnaW5hbFxuICogZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGVudGl0eSAgQW4gZW50aXR5XG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgc3RyaW5nIH0gZm9ybWF0ICBUaGUgZm9ybWF0IHRvIHRyYW5zZm9ybSB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgdG8uXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICBXaGV0aGVyIG9yIG5vdCB0byBjb252ZXJ0IHRoZSBkYXRlIGZpZWxkIHZhbHVlXG4gKiAgIHRvIHRoZSBsb2NhbCB0aW1lem9uZSBmb3IgdGhlIGhvc3QuXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gIFJldHVybnMgYSBuZXcgZW50aXR5IHdpdGggdGhlIGRhdGUgZmllbGQgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RGF0ZXNPbkVudGl0eSA9IChcblx0ZW50aXR5ID0ge30sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0Zm9ybWF0ID0gZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9JU084NjAxLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0Y29uc3QgbmV3RW50aXR5ID0geyAuLi5lbnRpdHkgfTtcblx0ZW50aXR5RGF0ZUZpZWxkcy5mb3JFYWNoKCAoIGRhdGVGaWVsZCApID0+IHtcblx0XHRpZiAoIG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0gKSB7XG5cdFx0XHRuZXdFbnRpdHlbIGRhdGVGaWVsZCBdID0gZGF0ZUZvcm1hdHMuZm9ybWF0RGF0ZVN0cmluZyhcblx0XHRcdFx0bmV3RW50aXR5WyBkYXRlRmllbGQgXSxcblx0XHRcdFx0Zm9ybWF0LFxuXHRcdFx0XHRsb2NhbCxcblx0XHRcdCk7XG5cdFx0fVxuXHR9ICk7XG5cdHJldHVybiBuZXdFbnRpdHk7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIHRvIG15c3FsIGZvcm1hdCBvbiBwcm92aWRlZCBlbnRpdGllcy4gIERvZXMgbm90XG4gKiBtdXRhdGUgb3JpZ2luYWwgZW50aXRpZXMuXG4gKlxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdGllcyAgQW4gYXJyYXkgb2YgZW50aXR5IG9iamVjdHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyAgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICBXaGV0aGVyIG9yIG5vdCB0byBjb252ZXJ0IHRoZSBkYXRlIGZpZWxkIHZhbHVlXG4gKiAgIHRvIHRoZSBsb2NhbCB0aW1lem9uZSBmb3IgdGhlIGhvc3QuXG4gKiBAcmV0dXJuIHsgQXJyYXkgfSAgUmV0dXJucyBhIG5ldyBhcnJheSBvZiBuZXcgZW50aXRpZXMgd2l0aCB0aGUgZGF0ZSBmaWVsZFxuICogICB2YWx1ZXMgZm9ybWF0dGVkXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXRFbnRpdGllc0RhdGVzVG9NeXNxbCA9IChcblx0ZW50aXRpZXMgPSBbXSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0cmV0dXJuIGZvcm1hdERhdGVzT25FbnRpdGllcyhcblx0XHRlbnRpdGllcyxcblx0XHRlbnRpdHlEYXRlRmllbGRzLFxuXHRcdGRhdGVGb3JtYXRzLkRBVEVfVElNRV9GT1JNQVRfTVlTUUwsXG5cdFx0bG9jYWwsXG5cdCk7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIHRvIG15c3FsIGZvcm1hdCBvbiBwcm92aWRlZCBlbnRpdHkuICBEb2VzIG5vdFxuICogbXV0YXRlIG9yaWdpbmFsIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHkgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IE9iamVjdCB9ICBSZXR1cm5zIGEgbmV3IGVudGl0eSB3aXRoIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEVudGl0eURhdGVzVG9NeXNxbCA9IChcblx0ZW50aXR5ID0ge30sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0bG9jYWwgPSB0cnVlLFxuKSA9PiB7XG5cdHJldHVybiBmb3JtYXREYXRlc09uRW50aXR5KFxuXHRcdGVudGl0eSxcblx0XHRlbnRpdHlEYXRlRmllbGRzLFxuXHRcdGRhdGVGb3JtYXRzLkRBVEVfVElNRV9GT1JNQVRfTVlTUUwsXG5cdFx0bG9jYWwsXG5cdCk7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIHRvIHRoZSBzaXRlIGZvcm1hdCBvbiBwcm92aWRlZCBlbnRpdGllcy4gIERvZXMgbm90XG4gKiBtdXRhdGUgb3JpZ2luYWwgZW50aXRpZXMuXG4gKlxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdGllcyAgQW4gYXJyYXkgb2YgZW50aXR5IG9iamVjdHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyAgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICBXaGV0aGVyIG9yIG5vdCB0byBjb252ZXJ0IHRoZSBkYXRlIGZpZWxkIHZhbHVlXG4gKiAgIHRvIHRoZSBsb2NhbCB0aW1lem9uZSBmb3IgdGhlIGhvc3QuXG4gKiBAcmV0dXJuIHsgQXJyYXkgfSAgUmV0dXJucyBhIG5ldyBhcnJheSBvZiBuZXcgZW50aXRpZXMgd2l0aCB0aGUgZGF0ZSBmaWVsZFxuICogICB2YWx1ZXMgZm9ybWF0dGVkXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXRFbnRpdGllc0RhdGVzVG9TaXRlID0gKFxuXHRlbnRpdGllcyA9IFtdLFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRyZXR1cm4gZm9ybWF0RGF0ZXNPbkVudGl0aWVzKFxuXHRcdGVudGl0aWVzLFxuXHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0ZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9TSVRFLFxuXHRcdGxvY2FsLFxuXHQpO1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlIGZpZWxkcyB0byB0aGUgc2l0ZSBmb3JtYXQgb24gcHJvdmlkZWQgZW50aXR5LiAgRG9lcyBub3RcbiAqIG11dGF0ZSBvcmlnaW5hbCBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gZW50aXR5ICBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBPYmplY3QgfSAgUmV0dXJucyBhIG5ldyBlbnRpdHkgd2l0aCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgZm9ybWF0dGVkXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXRFbnRpdHlEYXRlc1RvU2l0ZSA9IChcblx0ZW50aXR5ID0ge30sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0bG9jYWwgPSB0cnVlLFxuKSA9PiB7XG5cdHJldHVybiBmb3JtYXREYXRlc09uRW50aXR5KFxuXHRcdGVudGl0eSxcblx0XHRlbnRpdHlEYXRlRmllbGRzLFxuXHRcdGRhdGVGb3JtYXRzLkRBVEVfVElNRV9GT1JNQVRfU0lURSxcblx0XHRsb2NhbCxcblx0KTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgZGF0ZSBmaWVsZCB2YWx1ZXMgdG8gbW9tZW50IG9iamVjdHMgZm9yIHRoZSBwcm92aWRlZCBlbnRpdGllcy5cbiAqIERvZXMgbm90IG11dGF0ZSBvcmlnaW5hbCBlbnRpdGllcy5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcmV0dXJuIHsgQXJyYXkgfSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIG5ldyBlbnRpdGllcyB3aXRoIHRoZSBkYXRlIGZpZWxkXG4gKiAgIHZhbHVlcyBjb252ZXJ0ZWQgdG8gbW9tZW50IG9iamVjdHMuXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0RW50aXRpZXNEYXRlc1RvTW9tZW50ID0gKFxuXHRlbnRpdGllcyA9IFtdLFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG4pID0+IHtcblx0aWYgKCBpc0VtcHR5KCBlbnRpdGllcyApIHx8IGlzRW1wdHkoIGVudGl0eURhdGVGaWVsZHMgKSApIHtcblx0XHRyZXR1cm4gZW50aXRpZXM7XG5cdH1cblx0Y29uc3QgZm9ybWF0dGVkRW50aXRpZXMgPSBbXTtcblx0ZW50aXRpZXMuZm9yRWFjaCggKCBlbnRpdHkgKSA9PiB7XG5cdFx0Zm9ybWF0dGVkRW50aXRpZXMucHVzaCggY29udmVydEVudGl0eURhdGVzVG9Nb21lbnQoXG5cdFx0XHRlbnRpdHksXG5cdFx0XHRlbnRpdHlEYXRlRmllbGRzLFxuXHRcdCkgKTtcblx0fSApO1xuXHRyZXR1cm4gZm9ybWF0dGVkRW50aXRpZXM7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGRhdGUgZmllbGQgdmFsdWVzIHRvIG1vbWVudCBvYmplY3RzIGZvciB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogRG9lcyBub3QgbXV0YXRlIG9yaWdpbmFsIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHkgQW4gZW50aXR5LlxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHJldHVybiB7IE9iamVjdCB9IFJldHVybnMgYSBuZXcgZW50aXR5IHdpdGggdGhlIGRhdGUgZmllbGQgdmFsdWVzIGNvbnZlcnRlZFxuICogICB0byBtb21lbnQgb2JqZWN0cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRFbnRpdHlEYXRlc1RvTW9tZW50ID0gKFxuXHRlbnRpdHkgPSB7fSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuKSA9PiB7XG5cdGNvbnN0IG5ld0VudGl0eSA9IHsgLi4uZW50aXR5IH07XG5cdGVudGl0eURhdGVGaWVsZHMuZm9yRWFjaCggKCBkYXRlRmllbGQgKSA9PiB7XG5cdFx0aWYgKCBuZXdFbnRpdHlbIGRhdGVGaWVsZCBdICkge1xuXHRcdFx0bmV3RW50aXR5WyBkYXRlRmllbGQgXSA9IGRhdGVGb3JtYXRzLnN0cmluZ1RvTW9tZW50KFxuXHRcdFx0XHRuZXdFbnRpdHlbIGRhdGVGaWVsZCBdLFxuXHRcdFx0KTtcblx0XHR9XG5cdH0gKTtcblx0cmV0dXJuIG5ld0VudGl0eTtcbn07XG4iLCJpbXBvcnQgeyBpc0FycmF5LCBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBRVUVSWV9PUkRFUl9BU0MgPSAnQVNDJztcbmV4cG9ydCBjb25zdCBRVUVSWV9PUkRFUl9ERVNDID0gJ0RFU0MnO1xuZXhwb3J0IGNvbnN0IEFMTE9XRURfT1JERVJfVkFMVUVTID0gWyAnYXNjJywgJ2Rlc2MnLCAnQVNDJywgJ0RFU0MnIF07XG5leHBvcnQgY29uc3QgR1JFQVRFUl9USEFOID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPicgKTtcbmV4cG9ydCBjb25zdCBMRVNTX1RIQU4gPSBlbmNvZGVVUklDb21wb25lbnQoICc8JyApO1xuZXhwb3J0IGNvbnN0IEdSRUFURVJfVEhBTl9BTkRfRVFVQUwgPSBlbmNvZGVVUklDb21wb25lbnQoICc+PScgKTtcbmV4cG9ydCBjb25zdCBMRVNTX1RIQU5fQU5EX0VRVUFMID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPD0nICk7XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcGFyYW0geyBmdW5jdGlvbiB9IHdoZXJlQ29uZGl0aW9ucyAgQSBmdW5jdGlvbiBmb3IgcHJlcHBpbmcgdGhlIHdoZXJlXG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbmRpdGlvbnMgZnJvbSB0aGUgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgZnVuY3Rpb24gfSBtYXBPcmRlckJ5XHRcdEEgZnVuY3Rpb24gZm9yIG1hcHBpbmcgaW5jb21pbmcgb3JkZXJfYnlcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0c3RyaW5ncyB0byB0aGUgdmFsdWUgbmVlZGVkIGZvciB0aGVcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0cXVlcnlfc3RyaW5nLlxuICogQHJldHVybiB7IHN0cmluZyB9ICBcdFx0XHRcdFx0UmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoXG5cdHF1ZXJ5RGF0YSA9IHt9LFxuXHR3aGVyZUNvbmRpdGlvbnMgPSAoKSA9PiBudWxsLFxuXHRtYXBPcmRlckJ5ID0gb3JkZXJCeSA9PiBvcmRlckJ5LFxuKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gd2hlcmVDb25kaXRpb25zKCBxdWVyeURhdGEgKTtcblx0Y29uc3QgeyBsaW1pdCwgb3JkZXIsIG9yZGVyQnkgfSA9IHF1ZXJ5RGF0YTtcblx0Y29uc3QgcXVlcnlQYXJhbXMgPSBbXTtcblx0aWYgKCAhIGlzVW5kZWZpbmVkKCBsaW1pdCApICkge1xuXHRcdHF1ZXJ5UGFyYW1zLnB1c2goIGBsaW1pdD0keyBsaW1pdCB9YCApO1xuXHR9XG5cdGlmICggISBpc1VuZGVmaW5lZCggbWFwT3JkZXJCeSggb3JkZXJCeSApICkgKSB7XG5cdFx0aWYgKCBpc0FycmF5KCBtYXBPcmRlckJ5KCBvcmRlckJ5ICkgKSApIHtcblx0XHRcdGZvciAoIGNvbnN0IGZpZWxkIG9mIG1hcE9yZGVyQnkoIG9yZGVyQnkgKSApIHtcblx0XHRcdFx0cXVlcnlQYXJhbXMucHVzaCggYG9yZGVyX2J5WyR7IGZpZWxkIH1dPSR7IG9yZGVyIH1gICk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHF1ZXJ5UGFyYW1zLnB1c2goIGBvcmRlcj0keyBvcmRlciB9YCApO1xuXHRcdFx0cXVlcnlQYXJhbXMucHVzaCggYG9yZGVyX2J5PSR7IG1hcE9yZGVyQnkoIG9yZGVyQnkgKSB9YCApO1xuXHRcdH1cblx0fVxuXHRsZXQgcXVlcnlTdHJpbmcgPSBxdWVyeVBhcmFtcy5qb2luKCAnJicgKTtcblx0aWYgKCB3aGVyZSApIHtcblx0XHRxdWVyeVN0cmluZyArPSAnJicgKyB3aGVyZTtcblx0fVxuXHRyZXR1cm4gcXVlcnlTdHJpbmc7XG59O1xuIiwiZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAnZGF0ZXRpbWUnO1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCAqIGFzIGJhc2VGb3JtYXR0ZXIgZnJvbSAnLi4vYmFzZS1kYXRlLWZvcm1hdHRlcic7XG5pbXBvcnQge1xuXHRUSU1FX0ZPUk1BVF9TSVRFLFxuXHREQVRFX1RJTUVfRk9STUFUX1NJVEUsXG5cdGFsbERhdGVUaW1lc0FzU3RyaW5nLFxuXHRTRVBBUkFUT1JfU1BBQ0VfREFTSF9TUEFDRSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaGVscGVycyc7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBmb3JPd24sIHB1bGxBdCB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogQXJyYXkgb2YgZmllbGRzIHRoYXQgaGF2ZSBkYXRlIGluZm9ybWF0aW9uXG4gKiBAdHlwZSB7IHN0cmluZ1tdIH1cbiAqL1xuZXhwb3J0IGNvbnN0IERBVEVfRklFTERTID0gW1xuXHQnRFRUX0VWVF9zdGFydCcsXG5cdCdEVFRfRVZUX2VuZCcsXG5dO1xuXG4vKipcbiAqIFdpbGwgaG9sZCB0aGUgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGxpc3Qgb2YgZm9ybWF0dGVycyBmb3IgZGF0ZXMuICBGb3JtYXR0ZXJzXG4gKiBhcmUgZnVuY3Rpb25zIGRlZmluZWQgaW4gYC4uL2Jhc2UtZGF0ZS1mb3JtYXR0ZXJgIGJ1dCB3cmFwcGVkIGJ5IGR5bmFtaWNhbGx5XG4gKiBnZW5lcmF0ZWQgZnVuY3Rpb25zIChjYWxsYWJsZSB2aWEgc2FtZSBuYW1lKSB0aGF0IGF1dG9tYXRpY2FsbHkgcmVjZWl2ZSB0aGVcbiAqIGNvcnJlY3QgZGF0ZUZpZWxkc01hcCBhcmd1bWVudC5cbiAqXG4gKiBFZy4gIGAuLi9iYXNlLWRhdGUtZm9ybWF0dGVyIGhhc1xuICogZm9ybWF0RGF0ZXNPbkVudGl0aWVzKCBlbnRpdGllcywgZW50aXR5RGF0ZUZpZWxkcywgZm9ybWF0LCBsb2NhbCApO1xuICogV2hlbiBpbXBvcnRpbmcgYGZvcm1hdERhdGVzT25FbnRpdGllc2AgZnJvbSB0aGlzIGZpbGUsIHlvdSBjYW4gY2FsbCBpdCBzaW1wbHlcbiAqIGJ5IGRvaW5nIHRoaXM6XG4gKlxuICogZm9ybWF0RGF0ZXNPbkVudGl0aWVzKCBkYXRlVGltZU9iamVjdHMsIGZvcm1hdCwgbG9jYWwgKTtcbiAqXG4gKiBOb3RpY2UgdGhhdCBpdCdzIGNhbGxlZCB3aXRob3V0IHRoZSBlbnRpdHlEYXRlRmllbGRzIGFyZ3VtZW50IGJlY2F1c2UgdGhhdCdzXG4gKiBwcm92aWRlZCBieSB0aGlzIGdlbmVyYXRvci5cbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IGZvcm1hdHRlcnMgPSB7fTtcblxuZm9yT3duKCBiYXNlRm9ybWF0dGVyLCAoIGltcGxlbWVudGF0aW9uLCBmdW5jdGlvbk5hbWUgKSA9PiB7XG5cdGZvcm1hdHRlcnNbIGZ1bmN0aW9uTmFtZSBdID0gKCAuLi5pbmNvbWluZ0FyZ3MgKSA9PiB7XG5cdFx0Y29uc3QgZmlyc3RBcmcgPSBwdWxsQXQoIGluY29taW5nQXJncywgMCApO1xuXHRcdHJldHVybiBpbXBsZW1lbnRhdGlvbiggZmlyc3RBcmdbIDAgXSwgREFURV9GSUVMRFMsIC4uLmluY29taW5nQXJncyApO1xuXHR9O1xufSApO1xuXG4vKipcbiAqIFRoaXMgd2lsbCBzcGl0IG91dCBhIHByZXR0aWZpZWQgbGFiZWwgZm9yIHRoZSBwcm92aWRlZCBEYXRlVGltZSBlbnRpdHkuXG4gKlxuICogSWYgdGhlcmUgaXMgYSBEVFRfbmFtZSwgdGhlIGZvcm1hdCB3aWxsIGJlOlxuICogYERUVF9uYW1lIChEVFRfRVZUX3N0YXJ0IC0gRFRUX0VWVF9lbmQpYFxuICpcbiAqIElmIG5vIERUVF9uYW1lIHRoZW46XG4gKiBgRFRUX0VWVF9zdGFydCAtIERUVF9FVlRfZW5kYFxuICpcbiAqIFRoaXMgd2lsbCBhY2NvdW50IGZvciBpZiBib3RoIHN0YXJ0IGFuZCBlbmQgYXJlIGluIHRoZSBzYW1lIGRheSBhbmQgc2ltcGx5XG4gKiB1c2UgdGltZSBmb3IgdGhlIGVuZCBwYXJ0LlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IERhdGVUaW1lRW50aXR5XG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIEEgZm9ybWF0dGVkIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHByb3ZpZGVkXG4gKiAgICBEYXRlVGltZUVudGl0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IHByZXR0eURhdGVGcm9tRGF0ZVRpbWUgPSAoIERhdGVUaW1lRW50aXR5ID0ge30gKSA9PiB7XG5cdGxldCBjb250ZW50ID0gJyc7XG5cdERhdGVUaW1lRW50aXR5ID0gZm9ybWF0dGVycy5jb252ZXJ0RW50aXR5RGF0ZXNUb01vbWVudCggRGF0ZVRpbWVFbnRpdHkgKTtcblx0aWYgKCBEYXRlVGltZUVudGl0eS5EVFRfRVZUX3N0YXJ0ICYmIERhdGVUaW1lRW50aXR5LkRUVF9FVlRfZW5kICkge1xuXHRcdGlmICggRGF0ZVRpbWVFbnRpdHkuRFRUX0VWVF9zdGFydC5sb2NhbCgpLmZvcm1hdCggJ21kJyApID09PVxuXHRcdFx0RGF0ZVRpbWVFbnRpdHkuRFRUX0VWVF9lbmQubG9jYWwoKS5mb3JtYXQoICdtZCcgKSApIHtcblx0XHRcdGNvbnRlbnQgKz0gYWxsRGF0ZVRpbWVzQXNTdHJpbmcoXG5cdFx0XHRcdFNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFLFxuXHRcdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX3N0YXJ0LmZvcm1hdChcblx0XHRcdFx0XHREQVRFX1RJTUVfRk9STUFUX1NJVEVcblx0XHRcdFx0KSxcblx0XHRcdFx0RGF0ZVRpbWVFbnRpdHkuRFRUX0VWVF9lbmQuZm9ybWF0KFxuXHRcdFx0XHRcdFRJTUVfRk9STUFUX1NJVEVcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRlbnQgKz0gYWxsRGF0ZVRpbWVzQXNTdHJpbmcoXG5cdFx0XHRcdFNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFLFxuXHRcdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX3N0YXJ0LmZvcm1hdChcblx0XHRcdFx0XHREQVRFX1RJTUVfRk9STUFUX1NJVEVcblx0XHRcdFx0KSxcblx0XHRcdFx0RGF0ZVRpbWVFbnRpdHkuRFRUX0VWVF9lbmQuZm9ybWF0KFxuXHRcdFx0XHRcdERBVEVfVElNRV9GT1JNQVRfU0lURVxuXHRcdFx0XHQpLFxuXHRcdFx0KTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0aWYgKCBEYXRlVGltZUVudGl0eS5EVFRfRVZUX3N0YXJ0ICkge1xuXHRcdFx0Y29udGVudCArPSBEYXRlVGltZUVudGl0eS5EVFRfRVZUX3N0YXJ0LmZvcm1hdChcblx0XHRcdFx0REFURV9USU1FX0ZPUk1BVF9TSVRFXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIERhdGVUaW1lRW50aXR5LkRUVF9FVlRfZW5kICkge1xuXHRcdFx0Y29udGVudCArPSBEYXRlVGltZUVudGl0eS5EVFRfRVZUX2VuZC5mb3JtYXQoXG5cdFx0XHRcdERBVEVfVElNRV9GT1JNQVRfU0lURVxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblx0Y29udGVudCA9IERhdGVUaW1lRW50aXR5LkRUVF9uYW1lID9cblx0XHRgJHsgRGF0ZVRpbWVFbnRpdHkuRFRUX25hbWUgfSAoJHsgY29udGVudCB9KWAgOlxuXHRcdGNvbnRlbnQ7XG5cdHJldHVybiBjb250ZW50O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZm9ybWF0dGVycztcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9mb3JtYXR0ZXInO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfREVTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG5cdEdSRUFURVJfVEhBTixcblx0R1JFQVRFUl9USEFOX0FORF9FUVVBTCxcblx0TEVTU19USEFOX0FORF9FUVVBTCxcbn0gZnJvbSAnLi4vYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBub3dEYXRlQW5kVGltZSA9IG1vbWVudCgpO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0XHQnRFRUX25hbWUnLFxuXHRcdFx0J0RUVF9JRCcsXG5cdFx0XHQnc3RhcnRfZGF0ZScsXG5cdFx0XHQnZW5kX2RhdGUnLFxuXHRcdF0gKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHRcdHNob3dFeHBpcmVkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRtb250aDogUHJvcFR5cGVzLm1vbnRoLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0XHRzaG93RXhwaXJlZDogYm9vbGVhblxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDEwMCxcblx0XHRvcmRlckJ5OiAnc3RhcnRfZGF0ZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdFx0c2hvd0V4cGlyZWQ6IGZhbHNlLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGFuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHRzdGFydF9kYXRlOiAnRFRUX0VWVF9zdGFydCcsXG5cdFx0ZW5kX2RhdGU6ICdEVFRfRVZUX2VuZCcsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIGV2ZW50cyBlbmRwb2ludCByZXF1ZXN0IHVzaW5nIHByb3ZpZGVkXG4gKiBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRXZlbnRJZCAgSUQgZm9yIEV2ZW50IHRvIHJldHJpZXZlIGRhdGV0aW1lcyBmcm9tXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3dFeHBpcmVkICBXaGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIGV4cGlyZWQgZXZlbnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IG1vbnRoICAgICAgICAgUmV0dXJuIGV2ZW50cyBmb3IgdGhlIGdpdmVuIG1vbnRoLiAgQ2FuIGJlIGFueVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBhbnkgbW9udGggZm9ybWF0IHJlY29nbml6ZWQgYnkgbW9tZW50LlxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICBUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdHNob3dFeHBpcmVkID0gZmFsc2UsXG5cdG1vbnRoID0gJ25vbmUnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0aWYgKCAhIHNob3dFeHBpcmVkICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRFRUX0VWVF9lbmQqKmV4cGlyZWRdW109JyArIEdSRUFURVJfVEhBTiArXG5cdFx0XHQnJndoZXJlW0RUVF9FVlRfZW5kKipleHBpcmVkXVtdPScgK1xuXHRcdFx0bm93RGF0ZUFuZFRpbWUubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0aWYgKCBtb250aCAmJiBtb250aCAhPT0gJ25vbmUnICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRFRUX0VWVF9zdGFydF1bXT0nICsgR1JFQVRFUl9USEFOX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW0RUVF9FVlRfc3RhcnRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5zdGFydE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEVFRfRVZUX2VuZF1bXT0nICsgTEVTU19USEFOX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW0RUVF9FVlRfZW5kXVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuZW5kT2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRpZiAoIHBhcnNlSW50KCBmb3JFdmVudElkLCAxMCApICE9PSAwICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtFdmVudC5FVlRfSURdPScgKyBmb3JFdmVudElkICk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBtYXBWYWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBlbmRwb2ludHMgfSBmcm9tICcuL2VuZHBvaW50cy5qcyc7XG5cbi8qKlxuICogUmVjZWl2ZXMgYW4gb2JqZWN0IG1hcCBvZiBtb2RlbE5hbWUgdG8gZW5kcG9pbnQgYW5kIG1hcHMgdGhhdCB0byBhIGRlZmF1bHRcbiAqIG1hcCBvZiBtb2RlbE5hbWUgdG8gZW1wdHkgYXJyYXkuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gbW9kZWxOYW1lRW5kcG9pbnRzXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gQW4gb2JqZWN0IG9mIHsgeyBtb2RlbE5hbWUgfSA6IFtdIH1cbiAqL1xuY29uc3QgbWFwVG9BcnJheVZhbHVlcyA9IG1vZGVsTmFtZUVuZHBvaW50cyA9PiB7XG5cdHJldHVybiBtYXBWYWx1ZXMoIG1vZGVsTmFtZUVuZHBvaW50cyxcblx0XHRmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9LFxuXHQpO1xufTtcblxuLyoqXG4gKiBSZWNlaXZlcyBhbiBvYmplY3QgbWFwIG9mIG1vZGVsTmFtZSB0byBlbmRwb2ludCBhbmQgbWFwcyB0aGF0IHRvIGEgZGVmYXVsdFxuICogbWFwIG9mIG1vZGVsTmFtZSB0byBlbXB0eSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gbW9kZWxOYW1lRW5kcG9pbnRzXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gQW4gb2JqZWN0IG9mIHsgeyBtb2RlbE5hbWUgfSA6IHt9IH1cbiAqL1xuY29uc3QgbWFwVG9PYmplY3RWYWx1ZXMgPSBtb2RlbE5hbWVFbmRwb2ludHMgPT4ge1xuXHRyZXR1cm4gbWFwVmFsdWVzKCBtb2RlbE5hbWVFbmRwb2ludHMsXG5cdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fSxcblx0KTtcbn07XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIGRlZmF1bHQgc3RhdGUgdG8gYmUgdXNlZCBieSBzdG9yZXMgY29udGFpbmluZyBsaXN0cy5cbiAqXG4gKiBAdHlwZSB7IE9iamVjdCB9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xJU1RTX1NUQVRFID0gbWFwVG9BcnJheVZhbHVlcyggZW5kcG9pbnRzICk7XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIGRlZmF1bHQgc3RhdGUgdG8gYmUgdXNlZCBieSB0aGUgY29yZSBzdG9yZS5cbiAqXG4gKiBAdHlwZSB7e2VudGl0aWVzOiB7fSwgZW50aXR5SWRzOiB7fSwgZGlydHk6IHt9fX1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09SRV9TVEFURSA9IHtcblx0ZW50aXRpZXM6IHtcblx0XHQuLi5tYXBUb09iamVjdFZhbHVlcyggZW5kcG9pbnRzICksXG5cdH0sXG5cdGVudGl0eUlkczoge1xuXHRcdC4uLkRFRkFVTFRfTElTVFNfU1RBVEUsXG5cdH0sXG5cdGRpcnR5OiB7XG5cdFx0Li4uREVGQVVMVF9MSVNUU19TVEFURSxcblx0fSxcbn07XG5cbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWxpZGF0ZUVudGl0eUhhc0tleSB9IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogQWxsIGF2YWlsYWJsZSBlbmRwb2ludHMgZXhwb3NlZCB2aWEgdGhlIGVlanMuZGF0YSBnbG9iYWwgZnJvbSB0aGUgc2VydmVyLlxuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0IGNvbnN0IHsgY29sbGVjdGlvbl9lbmRwb2ludHM6IGVuZHBvaW50cyA9IHt9IH0gPSBkYXRhLnBhdGhzO1xuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgZW5kcG9pbnQgZm9yIHRoZSBwcm92aWRlZCBtb2RlbC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lICBXaGF0IG1vZGVsIHRvIHJldHJpZXZlIHRoZSBlbmRwb2ludCBmb3IuXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICBUaGUgZW5kcG9pbnQgZm9yIHRoZSBwcm92aWRlZCBtb2RlbC5cbiAqIEB0aHJvd3Mge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVuZHBvaW50ID0gKCBtb2RlbE5hbWUgKSA9PiB7XG5cdHZhbGlkYXRlRW50aXR5SGFzS2V5KCBtb2RlbE5hbWUsIGVuZHBvaW50cyApO1xuXHRyZXR1cm4gZW5kcG9pbnRzWyBtb2RlbE5hbWUgXTtcbn07XG5cbi8qKlxuICogQXBwbGllcyB0aGUgcHJvdmlkZWQgcXVlcnlTdHJpbmcgdG8gdGhlIGVuZHBvaW50IGZvciB0aGUgcHJvdmlkZWQgbW9kZWwgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFdoYXQgbW9kZWwgdGhlIGZpbmFsIHN0cmluZyBpcyBmb3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlTdHJpbmcgIFRoZSBxdWVyeSBiZWluZyBhcHBlbmRlZCB0byB0aGUgZW5kcG9pbnQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmaW5hbCBhc3NlbWJsZWQgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgYXBwbHlRdWVyeVN0cmluZyA9ICggbW9kZWxOYW1lLCBxdWVyeVN0cmluZyApID0+IHtcblx0cmV0dXJuIGdldEVuZHBvaW50KCBtb2RlbE5hbWUgKSArICc/JyArIHF1ZXJ5U3RyaW5nO1xufTtcbiIsImV4cG9ydCBjb25zdCBNT0RFTF9OQU1FID0gJ2V2ZW50JztcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfREVTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG5cdEdSRUFURVJfVEhBTixcblx0R1JFQVRFUl9USEFOX0FORF9FUVVBTCxcblx0TEVTU19USEFOX0FORF9FUVVBTCxcbn0gZnJvbSAnLi4vYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBub3dEYXRlQW5kVGltZSA9IG1vbWVudCgpO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0XHQnRVZUX25hbWUnLFxuXHRcdFx0J0VWVF9JRCcsXG5cdFx0XHQnc3RhcnRfZGF0ZScsXG5cdFx0XHQnZW5kX2RhdGUnLFxuXHRcdFx0J3RpY2tldF9zdGFydCcsXG5cdFx0XHQndGlja2V0X2VuZCcsXG5cdFx0XSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdFx0c2hvd0V4cGlyZWQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdGNhdGVnb3J5U2x1ZzogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRtb250aDogUHJvcFR5cGVzLm1vbnRoLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0XHRzaG93RXhwaXJlZDogYm9vbGVhblxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDEwMCxcblx0XHRvcmRlckJ5OiAnc3RhcnRfZGF0ZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdFx0c2hvd0V4cGlyZWQ6IGZhbHNlLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGFuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHRzdGFydF9kYXRlOiAnRGF0ZXRpbWUuRFRUX0VWVF9zdGFydCcsXG5cdFx0ZW5kX2RhdGU6ICdEYXRldGltZS5EVFRfRVZUX2VuZCcsXG5cdFx0dGlja2V0X3N0YXJ0OiAnRGF0ZXRpbWUuVGlja2V0LlRLVF9zdGFydF9kYXRlJyxcblx0XHR0aWNrZXRfZW5kOiAnRGF0ZXRpbWUuVGlja2V0LlRLVF9lbmRfZGF0ZScsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIGV2ZW50cyBlbmRwb2ludCByZXF1ZXN0IHVzaW5nIHByb3ZpZGVkXG4gKiBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3dFeHBpcmVkICBXaGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIGV4cGlyZWQgZXZlbnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IGNhdGVnb3J5U2x1ZyAgUmV0dXJuIGV2ZW50cyBmb3IgdGhlIGdpdmVuIGNhdGVnb3J5U2x1Z1xuICogQHBhcmFtIHtzdHJpbmd9IG1vbnRoICAgICAgICAgUmV0dXJuIGV2ZW50cyBmb3IgdGhlIGdpdmVuIG1vbnRoLlxuICogXHRcdFx0XHRcdFx0XHRcdCBDYW4gYmUgYW55IG1vbnRoIGZvcm1hdCByZWNvZ25pemVkIGJ5IG1vbWVudC5cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgIFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICgge1xuXHRzaG93RXhwaXJlZCA9IGZhbHNlLFxuXHRjYXRlZ29yeVNsdWcsXG5cdG1vbnRoID0gJ25vbmUnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblxuXHRpZiAoICEgc2hvd0V4cGlyZWQgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEYXRldGltZS5EVFRfRVZUX2VuZCoqZXhwaXJlZF1bXT0nICsgR1JFQVRFUl9USEFOICtcblx0XHRcdCcmd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9lbmQqKmV4cGlyZWRdW109JyArXG5cdFx0XHRub3dEYXRlQW5kVGltZS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRpZiAoIGNhdGVnb3J5U2x1ZyApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW1Rlcm1fUmVsYXRpb25zaGlwLlRlcm1fVGF4b25vbXkuVGVybS5zbHVnXT0nICsgY2F0ZWdvcnlTbHVnXG5cdFx0KTtcblx0fVxuXHRpZiAoIG1vbnRoICYmIG1vbnRoICE9PSAnbm9uZScgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEYXRldGltZS5EVFRfRVZUX3N0YXJ0XVtdPScgKyBHUkVBVEVSX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9zdGFydF1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLnN0YXJ0T2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RhdGV0aW1lLkRUVF9FVlRfZW5kXVtdPScgKyBMRVNTX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9lbmRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5lbmRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwiZXhwb3J0ICogZnJvbSAnLi9kZWZhdWx0LW1vZGVsLXN0YXRlJztcbmV4cG9ydCAqIGZyb20gJy4vZW5kcG9pbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcHJpbWFyeS1rZXlzJztcbmV4cG9ydCAqIGZyb20gJy4vdmFsaWRhdG9ycyc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVsLW5hbWVzJztcbmV4cG9ydCAqIGZyb20gJy4vYmFzZSc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscyc7XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgcHJpbWFyeUtleXMgfSBmcm9tICcuL3ByaW1hcnkta2V5cy5qcyc7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBrZXlzIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIG1vZGVsIG5hbWVzIGN1cnJlbnRseSBleHBvc2VkIGZvciBSRVNUIEFQSSByZXF1ZXN0LlxuICovXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRVMgPSBrZXlzKCBwcmltYXJ5S2V5cyApO1xuXG4iLCJpbXBvcnQgKiBhcyBkYXRlVGltZU1vZGVsIGZyb20gJy4vZGF0ZXRpbWUnO1xuaW1wb3J0ICogYXMgZXZlbnRNb2RlbCBmcm9tICcuL2V2ZW50JztcbmltcG9ydCAqIGFzIHJlZ2lzdHJhdGlvbk1vZGVsIGZyb20gJy4vcmVnaXN0cmF0aW9uJztcbmltcG9ydCAqIGFzIHN0YXR1c01vZGVsIGZyb20gJy4vc3RhdHVzJztcbmltcG9ydCAqIGFzIHRpY2tldE1vZGVsIGZyb20gJy4vdGlja2V0JztcblxuZXhwb3J0IHsgZGF0ZVRpbWVNb2RlbCwgZXZlbnRNb2RlbCwgcmVnaXN0cmF0aW9uTW9kZWwsIHN0YXR1c01vZGVsLCB0aWNrZXRNb2RlbCB9O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGRhdGEgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc0FycmF5LCByZWR1Y2UsIHRyaW1FbmQsIGtleUJ5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ21lbWl6ZSc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHR2YWxpZGF0ZUVudGl0eUhhc0tleSxcblx0dmFsaWRhdGVJc0FycmF5LFxuXHR2YWxpZGF0ZUlzTm90RW1wdHksXG59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogRXhwb3NlcyBhIG1hcCBvZiBtb2RlbG5hbWUgdG8gcHJpbWFyeSBrZXkgZXhwb3NlZCBieSB0aGUgZWVqcy5kYXRhIGdsb2JhbFxuICogdmlhIHRoZSBzZXJ2ZXIuXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5leHBvcnQgY29uc3QgeyBwcmltYXJ5X2tleXM6IHByaW1hcnlLZXlzID0ge30gfSA9IGRhdGEucGF0aHM7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWVzIGZvciB0aGUgZ2l2ZW4ga2V5cyBmcm9tIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKiBUaGlzIGZ1bmN0aW9uIHdvdWxkIGJlIHVzZWQgZm9yIG1vZGVscyB0aGF0IGhhdmUgY29tYmluZWQgcHJpbWFyeSBrZXlzXG4gKiAoZGVsaXZlcmVkIGFzIGFuIGFycmF5KS5cbiAqXG4gKiBAdHlwZSB7IG1lbW9pemVkIH1cbiAqIEByZXR1cm4geyBzdHJpbmcgfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIGZvciB0aGUgdmFsdWVzLlxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCB2YWx1ZXNGb3JDb21iaW5lZFByaW1hcnlLZXlzID0gbWVtb2l6ZSggKCBrZXlzLCBlbnRpdHkgKSA9PiB7XG5cdHZhbGlkYXRlSXNBcnJheSgga2V5cyApO1xuXHRjb25zdCBwcmltYXJ5S2V5ID0gcmVkdWNlKCBrZXlzLCBmdW5jdGlvbiggcmVzdWx0LCBrZXkgKSB7XG5cdFx0dmFsaWRhdGVFbnRpdHlIYXNLZXkoIGtleSwgZW50aXR5ICk7XG5cdFx0cmV0dXJuIGVudGl0eVsgcmVzdWx0IF0gKyAnOicgKyBlbnRpdHlbIGtleSBdO1xuXHR9ICk7XG5cdHJldHVybiB0cmltRW5kKCBwcmltYXJ5S2V5LCAnOicgKTtcbn0gKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBmb3IgdGhlIGdpdmVuIGtleSBmcm9tIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKiBUaGlzIGZ1bmN0aW9uIHdvdWxkIGJlIHVzZWQgZm9yIG1vZGVscyB0aGF0IGhhdmUgb25seSBvbmUgcHJpbWFyeSBrZXkuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7IG51bWJlciB9IFRoZSB2YWx1ZSBmb3IgdGhlIGtleSBpbiB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCB2YWx1ZUZvclByaW1hcnlLZXkgPSBtZW1vaXplKCAoIGtleSwgZW50aXR5ICkgPT4ge1xuXHR2YWxpZGF0ZUVudGl0eUhhc0tleSgga2V5LCBlbnRpdHkgKTtcblx0cmV0dXJuIGVudGl0eVsga2V5IF07XG59ICk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcHJpbWFyeSBrZXkgKG9yIGNvbWJpbmVkIHByaW1hcnkga2V5cykgZnJvbSB0aGUgYXZhaWxhYmxlIGRhdGEuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7IHN0cmluZ3xBcnJheSB9XG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFByaW1hcnlLZXkgPSBtZW1vaXplKCAoIG1vZGVsTmFtZSApID0+IHtcblx0dmFsaWRhdGVFbnRpdHlIYXNLZXkoIG1vZGVsTmFtZSwgcHJpbWFyeUtleXMgKTtcblx0cmV0dXJuIHByaW1hcnlLZXlzWyBtb2RlbE5hbWUgXTtcbn0gKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZXMgZm9yIHRoZSBwcmltYXJ5IGtleXMgZnJvbSB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICpcbiAqIEB0eXBlIHttZW1vaXplZH1cbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgSWYgdGhlIG1vZGVsIGhhcyBvbmx5IG9uZSBwcmltYXJ5IGtleSB0aGVuIHRoZSB2YWx1ZSB3aWxsXG4gKiBiZSBhIHNpbXBsZSBzdHJpbmcuICBJZiB0aGUgbW9kZWwgaGFzIGNvbWJpbmVkIHByaW1hcnkga2V5cywgdGhlbiB0aGUgdmFsdWVcbiAqIHdpbGwgYmUgYXMgc3RyaW5nIGluIHRoZSBmb3JtYXQgYCVzLiVzYCBmb3IgdGhlIHByaW1hcnkga2V5IHZhbHVlcy5cbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgZ2V0RW50aXR5UHJpbWFyeUtleVZhbHVlcyA9IG1lbW9pemUoICggbW9kZWxOYW1lLCBlbnRpdHkgKSA9PiB7XG5cdGNvbnN0IGtleXMgPSBnZXRQcmltYXJ5S2V5KCBtb2RlbE5hbWUgKTtcblx0cmV0dXJuIGlzQXJyYXkoIGtleXMgKSA/XG5cdFx0dmFsdWVzRm9yQ29tYmluZWRQcmltYXJ5S2V5cygga2V5cywgZW50aXR5ICkgOlxuXHRcdHZhbHVlRm9yUHJpbWFyeUtleSgga2V5cywgZW50aXR5ICk7XG59ICk7XG5cbi8qKlxuICogVGhpcyByZWNlaXZlcyBhbiBhcnJheSBvZiBlbnRpdGllcyBhbmQgcmV0dXJucyBhIGNvbGxlY3Rpb24gb2YgdGhvc2Ugc2FtZVxuICogZW50aXRpZXMgaW5kZXhlZCBieSB0aGUgcHJpbWFyeSBrZXkgdmFsdWUgZm9yIGVhY2ggZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7IHN0cmluZyB9IG1vZGVsTmFtZVxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdGllc1xuICogQHJldHVybiB7Kn0gIEEgY29sbGVjdGlvbiBpbmRleGVkIGJ5IHRoZSBwcmltYXJ5IGtleSB2YWx1ZXMgZm9yIGVhY2ggZW50aXR5LlxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCBrZXlFbnRpdGllc0J5UHJpbWFyeUtleVZhbHVlID0gKCBtb2RlbE5hbWUsIGVudGl0aWVzID0gW10gKSA9PiB7XG5cdHZhbGlkYXRlSXNOb3RFbXB0eShcblx0XHRlbnRpdGllcyxcblx0XHRfXyhcblx0XHRcdCdUaGUgcHJvdmlkZWQgYXJyYXkgb2YgZW50aXRpZXMgbXVzdCBub3QgYmUgZW1wdHknLFxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHQpXG5cdCk7XG5cdHZhbGlkYXRlSXNBcnJheSggZW50aXRpZXMgKTtcblx0cmV0dXJuIGtleUJ5KCBlbnRpdGllcywgZnVuY3Rpb24oIGVudGl0eSApIHtcblx0XHRyZXR1cm4gU3RyaW5nKCBnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzKCBtb2RlbE5hbWUsIGVudGl0eSApICk7XG5cdH0gKTtcbn07XG4iLCIvKipcbiAqIEludGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgc3RhdHVzTW9kZWwgZnJvbSAnLi4vc3RhdHVzL2NvbnN0YW50cyc7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdyZWdpc3RyYXRpb24nO1xuXG5leHBvcnQgY29uc3QgUkVHSVNUUkFUSU9OX1NUQVRVU19JRFMgPSB2YWx1ZXMoXG5cdHN0YXR1c01vZGVsLlJFR0lTVFJBVElPTl9TVEFUVVNfSURcbik7XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCwgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxufSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCAqIGFzIHN0YXR1c01vZGVsIGZyb20gJy4uL3N0YXR1cy9jb25zdGFudHMnO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdGZvckV2ZW50SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvckF0dGVuZGVlSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclRyYW5zYWN0aW9uSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclRpY2tldElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JTdGF0dXNJZDogUHJvcFR5cGVzLm9uZU9mKCB2YWx1ZXMoIHN0YXR1c01vZGVsLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQgKSApLFxuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdFx0J1JFR19JRCcsXG5cdFx0XHQnUkVHX2RhdGUnLFxuXHRcdF0gKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHR9ICksXG59O1xuXG5leHBvcnQgY29uc3Qgb3B0aW9uc0VudGl0eU1hcCA9IHtcblx0ZGVmYXVsdDoge1xuXHRcdHZhbHVlOiAnUkVHX0lEJyxcblx0XHRsYWJlbDogJ1JFR19jb2RlJyxcblx0fSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ3JlZ19kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhIHJlZ2lzdHJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0cmVnX2lkOiAnUkVHX0lEJyxcblx0XHRyZWdfZGF0ZTogJ1JFR19kYXRlJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gcmVnaXN0cmF0aW9ucyBlbmRwb2ludCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgICAgXHRJRCBvZiBFdmVudCB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvckF0dGVuZGVlSWQgICAgSUQgb2YgQXR0ZW5kZWUgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JUcmFuc2FjdGlvbklkIElEIG9mIFRyYW5zYWN0aW9uIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yVGlja2V0SWQgXHRcdElEIG9mIFRpY2tldCB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtzdHJpbmd9IGZvclN0YXR1c0lkIFx0XHRJRCBvZiBTdGF0dXMgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgXHRUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdGZvckF0dGVuZGVlSWQgPSAwLFxuXHRmb3JUcmFuc2FjdGlvbklkID0gMCxcblx0Zm9yVGlja2V0SWQgPSAwLFxuXHRmb3JTdGF0dXNJZCA9ICcnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0Zm9yRXZlbnRJZCA9IHBhcnNlSW50KCBmb3JFdmVudElkLCAxMCApO1xuXHRpZiAoIGZvckV2ZW50SWQgIT09IDAgJiYgISBpc05hTiggZm9yRXZlbnRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtFVlRfSURdPScgKyBmb3JFdmVudElkICk7XG5cdH1cblx0Zm9yQXR0ZW5kZWVJZCA9IHBhcnNlSW50KCBmb3JBdHRlbmRlZUlkLCAxMCApO1xuXHRpZiAoIGZvckF0dGVuZGVlSWQgIT09IDAgJiYgISBpc05hTiggZm9yQXR0ZW5kZWVJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtBVFRfSURdPScgKyBmb3JBdHRlbmRlZUlkICk7XG5cdH1cblx0Zm9yVHJhbnNhY3Rpb25JZCA9IHBhcnNlSW50KCBmb3JUcmFuc2FjdGlvbklkLCAxMCApO1xuXHRpZiAoIGZvclRyYW5zYWN0aW9uSWQgIT09IDAgJiYgISBpc05hTiggZm9yVHJhbnNhY3Rpb25JZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtUWE5fSURdPScgKyBmb3JUcmFuc2FjdGlvbklkICk7XG5cdH1cblx0Zm9yVGlja2V0SWQgPSBwYXJzZUludCggZm9yVGlja2V0SWQsIDEwICk7XG5cdGlmICggZm9yVGlja2V0SWQgIT09IDAgJiYgISBpc05hTiggZm9yVGlja2V0SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbVEtUX0lEXT0nICsgZm9yVGlja2V0SWQgKTtcblx0fVxuXHRpZiAoIGZvclN0YXR1c0lkICE9PSAnJyAmJiBmb3JTdGF0dXNJZCAhPT0gbnVsbCApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbU1RTX0lEXT0nICsgZm9yU3RhdHVzSWQgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdzdGF0dXMnO1xuLy8gdHlwZXNcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9FTUFJTCA9ICdlbWFpbCc7XG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfRVZFTlQgPSAnZXZlbnQnO1xuZXhwb3J0IGNvbnN0IFNUQVRVU19UWVBFX01FU1NBR0UgPSAnbWVzc2FnZSc7XG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfUEFZTUVOVCA9ICdwYXltZW50JztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9SRUdJU1RSQVRJT04gPSAncmVnaXN0cmF0aW9uJztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9UUkFOU0FDVElPTiA9ICd0cmFuc2FjdGlvbic7XG4vLyBlbWFpbFxuZXhwb3J0IGNvbnN0IEVNQUlMX1NUQVRVU19JRCA9IHtcblx0RFJBRlQ6ICdFRFInLFxuXHRTRU5UOiAnRVNOJyxcblx0RVhQSVJFRDogJ0VYUCcsXG59O1xuLy8gZXZlbnRcbmV4cG9ydCBjb25zdCBFVkVOVF9TVEFUVVNfSUQgPSB7XG5cdEFDVElWRTogJ0FDVCcsXG5cdFJFR0lTVFJBVElPTl9DTE9TRUQ6ICdDTFMnLFxuXHRERUxFVEVEOiAnREVMJyxcblx0REVOSUVEOiAnREVOJyxcblx0RFJBRlQ6ICdEUkYnLFxuXHROT1RfQUNUSVZFOiAnTkFDJyxcblx0Tk9UX09QRU46ICdOT1AnLFxuXHRPTkdPSU5HOiAnT05HJyxcblx0UkVHSVNUUkFUSU9OX09QRU46ICdPUE4nLFxuXHRQRU5ESU5HOiAnUE5EJyxcblx0U0VDT05EQVJZOiAnU0VDJyxcbn07XG4vLyBtZXNzYWdlXG5leHBvcnQgY29uc3QgTUVTU0FHRV9TVEFUVVNfSUQgPSB7XG5cdERFQlVHOiAnTURPJyxcblx0RVhFQ1VUSU5HOiAnTUVYJyxcblx0RkFJTDogJ01GTCcsXG5cdElOQ09NUExFVEU6ICdNSUMnLFxuXHRJRExFOiAnTUlEJyxcblx0UkVTRU5EOiAnTVJTJyxcblx0U0VOVDogJ01TTicsXG59O1xuLy8gcGF5bWVudFxuZXhwb3J0IGNvbnN0IFBBWU1FTlRfU1RBVFVTX0lEID0ge1xuXHRBUFBST1ZFRDogJ1BBUCcsXG5cdENBTkNFTExFRDogJ1BDTicsXG5cdERFQ0xJTkVEOiAnUERDJyxcblx0RkFJTEVEOiAnUEZMJyxcblx0UEVORElORzogJ1BQTicsXG59O1xuLy8gcmVnaXN0cmF0aW9uXG5leHBvcnQgY29uc3QgUkVHSVNUUkFUSU9OX1NUQVRVU19JRCA9IHtcblx0QVBQUk9WRUQ6ICdSQVAnLFxuXHRDQU5DRUxMRUQ6ICdSQ04nLFxuXHRERUNMSU5FRDogJ1JEQycsXG5cdElOQ09NUExFVEU6ICdSSUMnLFxuXHROT1RfQVBQUk9WRUQ6ICdSTkEnLFxuXHRQRU5ESU5HX1BBWU1FTlQ6ICdSUFAnLFxuXHRXQUlUX0xJU1Q6ICdSV0wnLFxufTtcbi8vIHRyYW5zYWN0aW9uXG5leHBvcnQgY29uc3QgVFJBTlNBQ1RJT05fU1RBVFVTX0lEID0ge1xuXHRBQkFORE9ORUQ6ICdUQUInLFxuXHRDT01QTEVURTogJ1RDTScsXG5cdEZBSUxFRDogJ1RGTCcsXG5cdElOQ09NUExFVEU6ICdUSU4nLFxuXHRPVkVSUEFJRDogJ1RPUCcsXG59O1xuXG5leHBvcnQgY29uc3QgQUxMX1NUQVRVU19JRFMgPSBbXG5cdC4uLnZhbHVlcyggRU1BSUxfU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggRVZFTlRfU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggTUVTU0FHRV9TVEFUVVNfSUQgKSxcblx0Li4udmFsdWVzKCBQQVlNRU5UX1NUQVRVU19JRCApLFxuXHQuLi52YWx1ZXMoIFJFR0lTVFJBVElPTl9TVEFUVVNfSUQgKSxcblx0Li4udmFsdWVzKCBUUkFOU0FDVElPTl9TVEFUVVNfSUQgKSxcbl07XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0FTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG59IGZyb20gJy4uL2Jhc2UnO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMjUsXG5cdFx0b3JkZXJCeTogJ3N0YXR1c0NvZGUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9BU0MsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXR1c0NvZGU6ICdTVFNfY29kZScsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIGV2ZW50cyBlbmRwb2ludCByZXF1ZXN0IHVzaW5nIHByb3ZpZGVkXG4gKiBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhdHVzVHlwZSBcdElEIGZvciB0eXBlIG9mIFN0YXR1cyB0byByZXRyaWV2ZVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICBUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHsgc3RhdHVzVHlwZSB9ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXHRpZiAoIHN0YXR1c1R5cGUgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1NUU190eXBlXT0nICsgc3RhdHVzVHlwZSApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuXG4iLCJleHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICd0aWNrZXQnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcblx0R1JFQVRFUl9USEFOLFxuXHRHUkVBVEVSX1RIQU5fQU5EX0VRVUFMLFxuXHRMRVNTX1RIQU5fQU5EX0VRVUFMLFxufSBmcm9tICcuLi9iYXNlJztcblxuZXhwb3J0IGNvbnN0IG5vd0RhdGVBbmRUaW1lID0gbW9tZW50KCk7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIFtcblx0XHRcdCdUS1RfbmFtZScsXG5cdFx0XHQnVEtUX0lEJyxcblx0XHRcdCdzdGFydF9kYXRlJyxcblx0XHRcdCdlbmRfZGF0ZScsXG5cdFx0XSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdFx0c2hvd0V4cGlyZWQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdG1vbnRoOiBQcm9wVHlwZXMubW9udGgsXG5cdH0gKSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHRcdHNob3dFeHBpcmVkOiBib29sZWFuXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdzdGFydF9kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0XHRzaG93RXhwaXJlZDogZmFsc2UsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYSB0aWNrZXQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXJ0X2RhdGU6ICdUS1Rfc3RhcnRfZGF0ZScsXG5cdFx0ZW5kX2RhdGU6ICdUS1RfZW5kX2RhdGUnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiB0aWNrZXRzIGVuZHBvaW50IHJlcXVlc3QgdXNpbmcgcHJvdmlkZWRcbiAqIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0V4cGlyZWQgXHRXaGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIGV4cGlyZWQgdGlja2V0cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb250aCAgICAgICAgICAgIFJldHVybiB0aWNrZXRzIGZvciB0aGUgZ2l2ZW4gbW9udGguIENhbiBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx0aW4gYW55IG1vbnRoIGZvcm1hdCByZWNvZ25pemVkIGJ5IG1vbWVudFxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgICAgXHRJRCBvZiBFdmVudCB0byByZXRyaWV2ZSB0aWNrZXRzIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvckRhdGV0aW1lSWQgICAgSUQgb2YgRGF0ZXRpbWUgdG8gcmV0cmlldmUgdGlja2V0cyBmb3JcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgXHRUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdGZvckRhdGV0aW1lSWQgPSAwLFxuXHRzaG93RXhwaXJlZCA9IGZhbHNlLFxuXHRtb250aCA9ICdub25lJyxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cdGlmICggISBzaG93RXhwaXJlZCApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW1RLVF9lbmRfZGF0ZSoqZXhwaXJlZF1bXT0nICsgR1JFQVRFUl9USEFOICtcblx0XHRcdCcmd2hlcmVbVEtUX2VuZF9kYXRlKipleHBpcmVkXVtdPScgK1xuXHRcdFx0bm93RGF0ZUFuZFRpbWUubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0aWYgKCBtb250aCAmJiBtb250aCAhPT0gJ25vbmUnICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVEtUX3N0YXJ0X2RhdGVdW109JyArIEdSRUFURVJfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtUS1Rfc3RhcnRfZGF0ZV1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLnN0YXJ0T2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW1RLVF9lbmRfZGF0ZV1bXT0nICsgTEVTU19USEFOX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW1RLVF9lbmRfZGF0ZV1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLmVuZE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0Zm9yRXZlbnRJZCA9IHBhcnNlSW50KCBmb3JFdmVudElkLCAxMCApO1xuXHRpZiAoIGZvckV2ZW50SWQgIT09IDAgJiYgISBpc05hTiggZm9yRXZlbnRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtEYXRldGltZS5FdmVudC5FVlRfSURdPScgKyBmb3JFdmVudElkICk7XG5cdH1cblx0Zm9yRGF0ZXRpbWVJZCA9IHBhcnNlSW50KCBmb3JEYXRldGltZUlkLCAxMCApO1xuXHRpZiAoIGZvckRhdGV0aW1lSWQgIT09IDAgJiYgISBpc05hTiggZm9yRGF0ZXRpbWVJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtEYXRldGltZS5EVFRfSURdPScgKyBmb3JEYXRldGltZUlkICk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgRXhjZXB0aW9uIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgeyBzcHJpbnRmLCBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNBcnJheSwgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIGtleSBleGlzdHMgaW4gdGhlIHByb3ZpZGVkIGVudGl0eSBvYmplY3QuXG4gKiBUaGlzIGlzIHVzZWQgd2hlbiBjYWxsaW5nIGNvZGUgd2FudHMgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93bi5cbiAqXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBrZXlcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGVudGl0eVxuICogQHBhcmFtIHsgc3RyaW5nIH0gbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9ICBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoZSBwcm92aWRlZCBlbnRpdHkgZG9lcyBub3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBoYXZlIHRoZSBnaXZlbiBrZXkuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVudGl0eUhhc0tleSA9ICgga2V5LCBlbnRpdHksIG1lc3NhZ2UgPSAnJyApID0+IHtcblx0aWYgKCBtZXNzYWdlID09PSAnJyApIHtcblx0XHRtZXNzYWdlID0gc3ByaW50Zihcblx0XHRcdF9fKFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIGVudGl0eSAoJXMpIGRvZXMgbm90IGhhdmUgdGhlIGdpdmVuIHByb3BlcnR5ICglcyknLFxuXHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdFx0KSxcblx0XHRcdGVudGl0eSxcblx0XHRcdGtleSxcblx0XHQpO1xuXHR9XG5cdGlmICggISBlbnRpdHkuaGFzT3duUHJvcGVydHkoIGtleSApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gYXJyYXkuXG4gKlxuICogQHBhcmFtIHsqfSBpdGVtc1xuICogQHBhcmFtIHsgc3RyaW5nIH0gIG1lc3NhZ2VcbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfSBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlSXNBcnJheSA9ICggaXRlbXMsIG1lc3NhZ2UgPSAnJyApID0+IHtcblx0aWYgKCBtZXNzYWdlID09PSAnJyApIHtcblx0XHRtZXNzYWdlID0gX18oICdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuIGFycmF5LicsICdldmVudF9lc3ByZXNzbycgKTtcblx0fVxuXHRpZiAoICEgaXNBcnJheSggaXRlbXMgKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGVtcHR5IG9yIG5vdC5cbiAqXG4gKiBDYWxsIHRoaXMgdmFsaWRhdG9yIHdoZW4geW91IHdhbnQgdG8gbWFrZSBzdXJlIHRoZSB2YWx1ZSBpcyBOT1QgZW1wdHkuXG4gKlxuICogQHBhcmFtIHsqfSBpdGVtc1xuICogQHBhcmFtIHsgc3RyaW5nIH0gbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9IFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGVtcHR5LlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVJc05vdEVtcHR5ID0gKCBpdGVtcywgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBfXyhcblx0XHRcdCdUaGUgcHJvdmlkZWQgaXRlbXMgbXVzdCBub3QgYmUgZW1wdHknLFxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHQpO1xuXHR9XG5cdGlmICggaXNFbXB0eSggaXRlbXMgKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9hc3NpZ25cIik7XG5cbnZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9hc3NpZ24yLmRlZmF1bHQgfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Zyb20gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9hcnJheS9mcm9tXCIpO1xuXG52YXIgX2Zyb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJvbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICgwLCBfZnJvbTIuZGVmYXVsdCkoYXJyKTtcbiAgfVxufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcbiIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIEFSRyA9IGNvZihmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuNicgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBpbmRleCwgdmFsdWUpIHtcbiAgaWYgKGluZGV4IGluIG9iamVjdCkgJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07XG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGhhcyhleHBvcnRzLCBrZXkpKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuIiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcykge1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkgYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmIHR5cGVvZiBJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwidmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24gKCkgeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIHNraXBDbG9zaW5nKSB7XG4gIGlmICghc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBbN107XG4gICAgdmFyIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4geyBkb25lOiBzYWZlID0gdHJ1ZSB9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRvbmUsIHZhbHVlKSB7XG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpO1xuIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogY29yZS52ZXJzaW9uLFxuICBtb2RlOiByZXF1aXJlKCcuL19saWJyYXJ5JykgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOCBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG4iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXQgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmICh0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UgLyogLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCAqLykge1xuICAgIHZhciBPID0gdG9PYmplY3QoYXJyYXlMaWtlKTtcbiAgICB2YXIgQyA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXk7XG4gICAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBtYXBmbiA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICAgIHZhciBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBpdGVyRm4gPSBnZXRJdGVyRm4oTyk7XG4gICAgdmFyIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZiAobWFwcGluZykgbWFwZm4gPSBjdHgobWFwZm4sIGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZiAoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpIHtcbiAgICAgIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEMoKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgZm9yIChyZXN1bHQgPSBuZXcgQyhsZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBzdGVwID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIga2luZCA9IHRoaXMuX2s7XG4gIHZhciBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYgKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKSB7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcbiIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcbiIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbnZhciBET01JdGVyYWJsZXMgPSAoJ0NTU1J1bGVMaXN0LENTU1N0eWxlRGVjbGFyYXRpb24sQ1NTVmFsdWVMaXN0LENsaWVudFJlY3RMaXN0LERPTVJlY3RMaXN0LERPTVN0cmluZ0xpc3QsJyArXG4gICdET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LCcgK1xuICAnTWVkaWFMaXN0LE1pbWVUeXBlQXJyYXksTmFtZWROb2RlTWFwLE5vZGVMaXN0LFBhaW50UmVxdWVzdExpc3QsUGx1Z2luLFBsdWdpbkFycmF5LFNWR0xlbmd0aExpc3QsU1ZHTnVtYmVyTGlzdCwnICtcbiAgJ1NWR1BhdGhTZWdMaXN0LFNWR1BvaW50TGlzdCxTVkdTdHJpbmdMaXN0LFNWR1RyYW5zZm9ybUxpc3QsU291cmNlQnVmZmVyTGlzdCxTdHlsZVNoZWV0TGlzdCxUZXh0VHJhY2tDdWVMaXN0LCcgK1xuICAnVGV4dFRyYWNrTGlzdCxUb3VjaExpc3QnKS5zcGxpdCgnLCcpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IERPTUl0ZXJhYmxlcy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IERPTUl0ZXJhYmxlc1tpXTtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV07XG4gIHZhciBwcm90byA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10pIGhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lbWl6ZSggZm4sIG9wdGlvbnMgKSB7XG5cdHZhciBzaXplID0gMCxcblx0XHRtYXhTaXplLCBoZWFkLCB0YWlsO1xuXG5cdGlmICggb3B0aW9ucyAmJiBvcHRpb25zLm1heFNpemUgKSB7XG5cdFx0bWF4U2l6ZSA9IG9wdGlvbnMubWF4U2l6ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIG1lbW9pemVkKCAvKiAuLi5hcmdzICovICkge1xuXHRcdHZhciBub2RlID0gaGVhZCxcblx0XHRcdGxlbiA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0XHRhcmdzLCBpO1xuXG5cdFx0c2VhcmNoQ2FjaGU6IHdoaWxlICggbm9kZSApIHtcblx0XHRcdC8vIFBlcmZvcm0gYSBzaGFsbG93IGVxdWFsaXR5IHRlc3QgdG8gY29uZmlybSB0aGF0IHdoZXRoZXIgdGhlIG5vZGVcblx0XHRcdC8vIHVuZGVyIHRlc3QgaXMgYSBjYW5kaWRhdGUgZm9yIHRoZSBhcmd1bWVudHMgcGFzc2VkLiBUd28gYXJyYXlzXG5cdFx0XHQvLyBhcmUgc2hhbGxvd2x5IGVxdWFsIGlmIHRoZWlyIGxlbmd0aCBtYXRjaGVzIGFuZCBlYWNoIGVudHJ5IGlzXG5cdFx0XHQvLyBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuIHRoZSB0d28gc2V0cy4gQXZvaWQgYWJzdHJhY3RpbmcgdG8gYVxuXHRcdFx0Ly8gZnVuY3Rpb24gd2hpY2ggY291bGQgaW5jdXIgYW4gYXJndW1lbnRzIGxlYWtpbmcgZGVvcHRpbWl6YXRpb24uXG5cblx0XHRcdC8vIENoZWNrIHdoZXRoZXIgbm9kZSBhcmd1bWVudHMgbWF0Y2ggYXJndW1lbnRzIGxlbmd0aFxuXHRcdFx0aWYgKCBub2RlLmFyZ3MubGVuZ3RoICE9PSBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgd2hldGhlciBub2RlIGFyZ3VtZW50cyBtYXRjaCBhcmd1bWVudHMgdmFsdWVzXG5cdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRpZiAoIG5vZGUuYXJnc1sgaSBdICE9PSBhcmd1bWVudHNbIGkgXSApIHtcblx0XHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRcdGNvbnRpbnVlIHNlYXJjaENhY2hlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQgd2UgY2FuIGFzc3VtZSB3ZSd2ZSBmb3VuZCBhIG1hdGNoXG5cblx0XHRcdC8vIFN1cmZhY2UgbWF0Y2hlZCBub2RlIHRvIGhlYWQgaWYgbm90IGFscmVhZHlcblx0XHRcdGlmICggbm9kZSAhPT0gaGVhZCApIHtcblx0XHRcdFx0Ly8gQXMgdGFpbCwgc2hpZnQgdG8gcHJldmlvdXMuIE11c3Qgb25seSBzaGlmdCBpZiBub3QgYWxzb1xuXHRcdFx0XHQvLyBoZWFkLCBzaW5jZSBpZiBib3RoIGhlYWQgYW5kIHRhaWwsIHRoZXJlIGlzIG5vIHByZXZpb3VzLlxuXHRcdFx0XHRpZiAoIG5vZGUgPT09IHRhaWwgKSB7XG5cdFx0XHRcdFx0dGFpbCA9IG5vZGUucHJldjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkanVzdCBzaWJsaW5ncyB0byBwb2ludCB0byBlYWNoIG90aGVyLiBJZiBub2RlIHdhcyB0YWlsLFxuXHRcdFx0XHQvLyB0aGlzIGFsc28gaGFuZGxlcyBuZXcgdGFpbCdzIGVtcHR5IGBuZXh0YCBhc3NpZ25tZW50LlxuXHRcdFx0XHRub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcblx0XHRcdFx0aWYgKCBub2RlLm5leHQgKSB7XG5cdFx0XHRcdFx0bm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRub2RlLm5leHQgPSBoZWFkO1xuXHRcdFx0XHRub2RlLnByZXYgPSBudWxsO1xuXHRcdFx0XHRoZWFkLnByZXYgPSBub2RlO1xuXHRcdFx0XHRoZWFkID0gbm9kZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV0dXJuIGltbWVkaWF0ZWx5XG5cdFx0XHRyZXR1cm4gbm9kZS52YWw7XG5cdFx0fVxuXG5cdFx0Ly8gTm8gY2FjaGVkIHZhbHVlIGZvdW5kLiBDb250aW51ZSB0byBpbnNlcnRpb24gcGhhc2U6XG5cblx0XHQvLyBDcmVhdGUgYSBjb3B5IG9mIGFyZ3VtZW50cyAoYXZvaWQgbGVha2luZyBkZW9wdGltaXphdGlvbilcblx0XHRhcmdzID0gbmV3IEFycmF5KCBsZW4gKTtcblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0YXJnc1sgaSBdID0gYXJndW1lbnRzWyBpIF07XG5cdFx0fVxuXG5cdFx0bm9kZSA9IHtcblx0XHRcdGFyZ3M6IGFyZ3MsXG5cblx0XHRcdC8vIEdlbmVyYXRlIHRoZSByZXN1bHQgZnJvbSBvcmlnaW5hbCBmdW5jdGlvblxuXHRcdFx0dmFsOiBmbi5hcHBseSggbnVsbCwgYXJncyApXG5cdFx0fTtcblxuXHRcdC8vIERvbid0IG5lZWQgdG8gY2hlY2sgd2hldGhlciBub2RlIGlzIGFscmVhZHkgaGVhZCwgc2luY2UgaXQgd291bGRcblx0XHQvLyBoYXZlIGJlZW4gcmV0dXJuZWQgYWJvdmUgYWxyZWFkeSBpZiBpdCB3YXNcblxuXHRcdC8vIFNoaWZ0IGV4aXN0aW5nIGhlYWQgZG93biBsaXN0XG5cdFx0aWYgKCBoZWFkICkge1xuXHRcdFx0aGVhZC5wcmV2ID0gbm9kZTtcblx0XHRcdG5vZGUubmV4dCA9IGhlYWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIElmIG5vIGhlYWQsIGZvbGxvd3MgdGhhdCB0aGVyZSdzIG5vIHRhaWwgKGF0IGluaXRpYWwgb3IgcmVzZXQpXG5cdFx0XHR0YWlsID0gbm9kZTtcblx0XHR9XG5cblx0XHQvLyBUcmltIHRhaWwgaWYgd2UncmUgcmVhY2hlZCBtYXggc2l6ZSBhbmQgYXJlIHBlbmRpbmcgY2FjaGUgaW5zZXJ0aW9uXG5cdFx0aWYgKCBzaXplID09PSBtYXhTaXplICkge1xuXHRcdFx0dGFpbCA9IHRhaWwucHJldjtcblx0XHRcdHRhaWwubmV4dCA9IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNpemUrKztcblx0XHR9XG5cblx0XHRoZWFkID0gbm9kZTtcblxuXHRcdHJldHVybiBub2RlLnZhbDtcblx0fVxuXG5cdG1lbW9pemVkLmNsZWFyID0gZnVuY3Rpb24oKSB7XG5cdFx0aGVhZCA9IG51bGw7XG5cdFx0dGFpbCA9IG51bGw7XG5cdFx0c2l6ZSA9IDA7XG5cdH07XG5cblx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnICkge1xuXHRcdC8vIENhY2hlIGlzIG5vdCBleHBvc2VkIGluIHRoZSBwdWJsaWMgQVBJLCBidXQgdXNlZCBpbiB0ZXN0cyB0byBlbnN1cmVcblx0XHQvLyBleHBlY3RlZCBsaXN0IHByb2dyZXNzaW9uXG5cdFx0bWVtb2l6ZWQuZ2V0Q2FjaGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBbIGhlYWQsIHRhaWwsIHNpemUgXTtcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIG1lbW9pemVkO1xufTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcblxuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAodHlwZVNwZWNzLmhhc093blByb3BlcnR5KHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIGVyciA9IEVycm9yKFxuICAgICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6ICcgKyBsb2NhdGlvbiArICcgdHlwZSBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7ICcgK1xuICAgICAgICAgICAgICAnaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCcgKyB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gKyAnYC4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgJiYgIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICcgK1xuICAgICAgICAgICAgbG9jYXRpb24gKyAnIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAnICsgdHlwZW9mIGVycm9yICsgJy4gJyArXG4gICAgICAgICAgICAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICtcbiAgICAgICAgICAgICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJ1xuICAgICAgICAgIClcblxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnRmFpbGVkICcgKyBsb2NhdGlvbiArICcgdHlwZTogJyArIGVycm9yLm1lc3NhZ2UgKyAoc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuZnVuY3Rpb24gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIsXG4gICAgZXhhY3Q6IGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIsXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJyArIHByb3BGdWxsTmFtZSArICdgIHByb3Agb24gYCcgKyBjb21wb25lbnROYW1lICArICdgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAnICsgZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKGNoZWNrZXIpICsgJyBhdCBpbmRleCAnICsgaSArICcuJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9ICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmXG4gICAgU3ltYm9sLmZvciAmJlxuICAgIFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSkgfHxcbiAgICAweGVhYzc7XG5cbiAgdmFyIGlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICBvYmplY3QgIT09IG51bGwgJiZcbiAgICAgIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xuICB9O1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBlZWpzOyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy5oZWxwZXJzOyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy5pMThuOyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy52ZW5kb3IubG9kYXNoOyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy52ZW5kb3IubW9tZW50OyJdLCJzb3VyY2VSb290IjoiIn0=
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

/***/ "./assets/src/data/model/assertions.js":
/*!*********************************************!*\
  !*** ./assets/src/data/model/assertions.js ***!
  \*********************************************/
/*! exports provided: assertEntityHasKey, assertImmutableObjectHasPath, assertIsArray, assertIsNotEmpty, assertIsMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertEntityHasKey", function() { return assertEntityHasKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertImmutableObjectHasPath", function() { return assertImmutableObjectHasPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertIsArray", function() { return assertIsArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertIsNotEmpty", function() { return assertIsNotEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertIsMap", function() { return assertIsMap; });
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
 * Asserts whether the given key exists in the provided entity object.
 * This is used when calling code wants an exception to be thrown.
 *
 * @param { string } key
 * @param { Object } entity
 * @param { string } message
 * @throws { Exception }  Throws an exception if the provided entity does not
 *                          have the given key.
 */

var assertEntityHasKey = function assertEntityHasKey(key, entity) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (message === '') {
    message = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('The provided entity (%s) does not have the given property (%s)', 'event_espresso'), entity, key);
  }

  if (!entity.hasOwnProperty(key)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["Exception"](message);
  }
};
/**
 * Asserts whether the given path in the provided immutable object exists.
 * This is used when calling code wants an exception to be thrown if the given
 * search path array does not exist in the immutable object.
 *
 * If the immutable object is setup like this:
 *
 * immutable = Immutable.Map().set( 'event', Immutable.Map().set( 10, Event ) );
 *
 * Then a valid searchable path could be `[ 'event', 10 ]`.  An invalid path
 * would be `[ 'datetime', 10 ]`
 *
 * @param {Array} path  Searchable path for the immutable ojbect to verify.
 * @param {Immutable.Map|Immutable.Set} immutable  An immutable object (Map, Set, List etc)
 * @param {string} message A custom message to use.
 * @throws Exception
 */

var assertImmutableObjectHasPath = function assertImmutableObjectHasPath(path, immutable) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (message === '') {
    message = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('The provided immutable object (%s) does not have the given path (%s)', 'event_espresso'), immutable, path);
  }

  if (!immutable.hasIn(path)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["Exception"](message);
  }
};
/**
 * Asserts whether the given value is an array.
 *
 * @param {*} items
 * @param { string }  message
 * @throws { Exception } Throws an exception if the provided value is not an
 *                          array.
 */

var assertIsArray = function assertIsArray(items) {
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

var assertIsNotEmpty = function assertIsNotEmpty(items) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (message === '') {
    message = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('The provided items must not be empty', 'event_espresso');
  }

  if (Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(items)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["Exception"](message);
  }
};
/**
 * Asserts whether the given value is a Map object.
 *
 * @param {*} item
 * @param {string} message
 * @throws { Exception }
 */

var assertIsMap = function assertIsMap(item) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (message === '') {
    message = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('The provided item must be a Map object', 'event_espresso');
  }

  if (!Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isMap"])(item)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["Exception"](message);
  }
};

/***/ }),

/***/ "./assets/src/data/model/attendee/constants.js":
/*!*****************************************************!*\
  !*** ./assets/src/data/model/attendee/constants.js ***!
  \*****************************************************/
/*! exports provided: MODEL_NAME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return MODEL_NAME; });
var MODEL_NAME = 'attendee';

/***/ }),

/***/ "./assets/src/data/model/attendee/index.js":
/*!*************************************************!*\
  !*** ./assets/src/data/model/attendee/index.js ***!
  \*************************************************/
/*! exports provided: orderByMap, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString, MODEL_NAME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/attendee/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "orderByMap", function() { return _query__WEBPACK_IMPORTED_MODULE_0__["orderByMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_0__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_0__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_0__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_0__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_0__["getQueryString"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/attendee/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["MODEL_NAME"]; });




/***/ }),

/***/ "./assets/src/data/model/attendee/query.js":
/*!*************************************************!*\
  !*** ./assets/src/data/model/attendee/query.js ***!
  \*************************************************/
/*! exports provided: orderByMap, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderByMap", function() { return orderByMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return queryDataTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return defaultQueryData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return mapOrderBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return whereConditions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return getQueryString; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");
/* harmony import */ var _registration_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../registration/constants */ "./assets/src/data/model/registration/constants.js");


/**
 * External imports
 */




var orderByMap = {
  id: 'ATT_ID',
  lastNameOnly: 'ATT_lname',
  firstNameOnly: 'ATT_fname',
  firstThenLastName: ['ATT_fname', 'ATT_lname'],
  lastThenFirstName: ['ATT_lname', 'ATT_fname']
};
/**
 * Described attributes for this model
 * @type {{attributes: *}}
 */

var queryDataTypes = {
  forEventId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  forDatetimeId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  forTicketId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  forStatusId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(_registration_constants__WEBPACK_IMPORTED_MODULE_4__["REGISTRATION_STATUS_IDS"]),
  forRegistrationId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  showGravatar: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  queryData: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    limit: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
    orderBy: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(Object.keys(orderByMap)),
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
    limit: 100,
    orderBy: 'lastThenFirstName',
    order: _base__WEBPACK_IMPORTED_MODULE_3__["QUERY_ORDER_ASC"]
  }
};
/**
 * Used to map an orderBy string to the actual value used
 * in a REST query from the context of a attendee.
 *
 * @param {string} 		orderBy
 * @return { string } 	Returns an actual orderBy string
 * 						for the REST query for the provided alias
 */

var mapOrderBy = function mapOrderBy(orderBy) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
};
/**
 * Builds where conditions for an attendees endpoint request
 *
 * @param {number} forEventId    	ID of Event to retrieve attendees for
 * @param {number} forDatetimeId 	ID of Datetime to retrieve attendees for
 * @param {number} forTicketId 		ID of Ticket to retrieve attendees for
 * @param {number} forRegistrationId
 * @param {string} forStatusId 		ID of Status to retrieve attendees for
 * @param {string} showGravatar 	Boolean toggle for whether to display user Gravatar
 * @return {string}                	The assembled where conditions.
 */

var whereConditions = function whereConditions(_ref) {
  var _ref$forEventId = _ref.forEventId,
      forEventId = _ref$forEventId === void 0 ? 0 : _ref$forEventId,
      _ref$forDatetimeId = _ref.forDatetimeId,
      forDatetimeId = _ref$forDatetimeId === void 0 ? 0 : _ref$forDatetimeId,
      _ref$forTicketId = _ref.forTicketId,
      forTicketId = _ref$forTicketId === void 0 ? 0 : _ref$forTicketId,
      _ref$forRegistrationI = _ref.forRegistrationId,
      forRegistrationId = _ref$forRegistrationI === void 0 ? 0 : _ref$forRegistrationI,
      _ref$forStatusId = _ref.forStatusId,
      forStatusId = _ref$forStatusId === void 0 ? 'RAP' : _ref$forStatusId,
      _ref$showGravatar = _ref.showGravatar,
      showGravatar = _ref$showGravatar === void 0 ? false : _ref$showGravatar;
  var where = []; // ensure that entity IDs are integers

  forRegistrationId = parseInt(forRegistrationId, 10);
  forTicketId = parseInt(forTicketId, 10);
  forDatetimeId = parseInt(forDatetimeId, 10);
  forEventId = parseInt(forEventId, 10); // order of priority for provided arguments.

  if (forRegistrationId !== 0 && !isNaN(forRegistrationId)) {
    where.push("where[Registration.REG_ID]=".concat(forRegistrationId));
  } else if (forTicketId !== 0 && !isNaN(forTicketId)) {
    where.push("where[Registration.Ticket.TKT_ID]=".concat(forTicketId));
  } else if (forDatetimeId !== 0 && !isNaN(forDatetimeId)) {
    where.push("where[Registration.Ticket.Datetime.DTT_ID]=".concat(forDatetimeId));
  } else if (forEventId !== 0 && !isNaN(forEventId)) {
    where.push("where[Registration.EVT_ID]=".concat(forEventId));
  }

  if (_registration_constants__WEBPACK_IMPORTED_MODULE_4__["REGISTRATION_STATUS_IDS"].includes(forStatusId)) {
    where.push("where[Registration.Status.STS_ID]=".concat(forStatusId));
  }

  if (showGravatar === true) {
    where.push('calculate=user_avatar');
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
  queryData = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
  return Object(_base__WEBPACK_IMPORTED_MODULE_3__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

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
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
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

  var newEntity = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, entity);

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

  var newEntity = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, entity);

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
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

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
      orderBy = queryData.orderBy,
      defaultWhereConditions = queryData.defaultWhereConditions;
  var queryParams = [];

  if (!Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(limit)) {
    queryParams.push("limit=".concat(limit));
  }

  if (!Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(defaultWhereConditions)) {
    queryParams.push("default_where_conditions=".concat(defaultWhereConditions));
  }

  if (!Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(mapOrderBy(orderBy))) {
    if (Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isArray"])(mapOrderBy(orderBy))) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = mapOrderBy(orderBy)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var field = _step.value;
          queryParams.push("order_by[".concat(field, "]=").concat(order));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      queryParams.push("order=".concat(order));
      queryParams.push("order_by=".concat(mapOrderBy(orderBy)));
    }
  }

  var queryString = queryParams.join('&');

  if (where) {
    queryString += '&' + where;
  }

  return queryString;
};

/***/ }),

/***/ "./assets/src/data/model/checkin/constants.js":
/*!****************************************************!*\
  !*** ./assets/src/data/model/checkin/constants.js ***!
  \****************************************************/
/*! exports provided: MODEL_NAME, CHECKIN_STATUS_ID, CHECKIN_STATUS_IDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return MODEL_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECKIN_STATUS_ID", function() { return CHECKIN_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECKIN_STATUS_IDS", function() { return CHECKIN_STATUS_IDS; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

var MODEL_NAME = 'checkin';
var CHECKIN_STATUS_ID = {
  STATUS_CHECKED_OUT: false,
  STATUS_CHECKED_IN: true,
  STATUS_CHECKED_NEVER: 2
};
var CHECKIN_STATUS_IDS = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["values"])(CHECKIN_STATUS_ID);

/***/ }),

/***/ "./assets/src/data/model/checkin/index.js":
/*!************************************************!*\
  !*** ./assets/src/data/model/checkin/index.js ***!
  \************************************************/
/*! exports provided: MODEL_NAME, CHECKIN_STATUS_ID, CHECKIN_STATUS_IDS, queryDataTypes, optionsEntityMap, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/checkin/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAME"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CHECKIN_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["CHECKIN_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CHECKIN_STATUS_IDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["CHECKIN_STATUS_IDS"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/checkin/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "optionsEntityMap", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["optionsEntityMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });




/***/ }),

/***/ "./assets/src/data/model/checkin/query.js":
/*!************************************************!*\
  !*** ./assets/src/data/model/checkin/query.js ***!
  \************************************************/
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
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../status */ "./assets/src/data/model/status/index.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/checkin/constants.js");


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
  forDatetimeId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  forEventId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  forRegistrationId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  forTicketId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  forStatusId: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(_constants__WEBPACK_IMPORTED_MODULE_5__["CHECKIN_STATUS_IDS"]),
  queryData: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    limit: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
    orderBy: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['CHK_ID', 'REG_ID', 'CHK_timestamp', 'DTT_ID']),
    order: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(_base__WEBPACK_IMPORTED_MODULE_4__["ALLOWED_ORDER_VALUES"])
  })
};
var optionsEntityMap = {
  default: function _default() {
    return [{
      label: Object(_status__WEBPACK_IMPORTED_MODULE_3__["prettyStatus"])(_constants__WEBPACK_IMPORTED_MODULE_5__["CHECKIN_STATUS_ID"].STATUS_CHECKED_OUT),
      value: _constants__WEBPACK_IMPORTED_MODULE_5__["CHECKIN_STATUS_ID"].STATUS_CHECKED_OUT
    }, {
      label: Object(_status__WEBPACK_IMPORTED_MODULE_3__["prettyStatus"])(_constants__WEBPACK_IMPORTED_MODULE_5__["CHECKIN_STATUS_ID"].STATUS_CHECKED_IN),
      value: _constants__WEBPACK_IMPORTED_MODULE_5__["CHECKIN_STATUS_ID"].STATUS_CHECKED_IN
    }];
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
    orderBy: 'CHK_timestamp',
    order: _base__WEBPACK_IMPORTED_MODULE_4__["QUERY_ORDER_DESC"]
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
    timestamp: 'CHK_timestamp',
    id: 'CHK_ID'
  };
  return Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
};
/**
 * Builds where conditions for an registrations endpoint request
 *
 * @param {number} forDatetimeId    	ID of Event to retrieve registrations for
 * @param {number} forEventId    ID of Attendee to retrieve registrations for
 * @param {number} forRegistrationId ID of Transaction to retrieve registrations for
 * @param {number} forTicketId 		ID of Ticket to retrieve registrations for
 * @param {string} forStatusId 		ID of Status to retrieve registrations for
 * @return {string}                	The assembled where conditions.
 */

var whereConditions = function whereConditions(_ref) {
  var _ref$forDatetimeId = _ref.forDatetimeId,
      forDatetimeId = _ref$forDatetimeId === void 0 ? 0 : _ref$forDatetimeId,
      _ref$forEventId = _ref.forEventId,
      forEventId = _ref$forEventId === void 0 ? 0 : _ref$forEventId,
      _ref$forRegistrationI = _ref.forRegistrationId,
      forRegistrationId = _ref$forRegistrationI === void 0 ? 0 : _ref$forRegistrationI,
      _ref$forTicketId = _ref.forTicketId,
      forTicketId = _ref$forTicketId === void 0 ? 0 : _ref$forTicketId,
      _ref$forStatusId = _ref.forStatusId,
      forStatusId = _ref$forStatusId === void 0 ? '' : _ref$forStatusId;
  var where = [];
  forEventId = parseInt(forEventId, 10);

  if (forEventId !== 0 && !isNaN(forEventId)) {
    where.push('where[Registration.EVT_ID]=' + forEventId);
  }

  forDatetimeId = parseInt(forDatetimeId, 10);

  if (forDatetimeId !== 0 && !isNaN(forDatetimeId)) {
    where.push('where[DTT_ID]=' + forDatetimeId);
  }

  forRegistrationId = parseInt(forRegistrationId, 10);

  if (forRegistrationId !== 0 && !isNaN(forRegistrationId)) {
    where.push('where[REG_ID]=' + forRegistrationId);
  }

  forTicketId = parseInt(forTicketId, 10);

  if (forTicketId !== 0 && !isNaN(forTicketId)) {
    where.push('where[Registration.TKT_ID]=' + forTicketId);
  }

  if (forStatusId !== '' && forStatusId !== null) {
    where.push('where[CHK_in]=' + forStatusId);
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
  queryData = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
  return Object(_base__WEBPACK_IMPORTED_MODULE_4__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/datetime/constants.js":
/*!*****************************************************!*\
  !*** ./assets/src/data/model/datetime/constants.js ***!
  \*****************************************************/
/*! exports provided: MODEL_NAME, DATETIME_STATUS_ID, DATETIME_STATUS_IDS, MINUTE_IN_SECONDS, HOUR_IN_SECONDS, DAY_IN_SECONDS, WEEK_IN_SECONDS, MONTH_IN_SECONDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return MODEL_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_STATUS_ID", function() { return DATETIME_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_STATUS_IDS", function() { return DATETIME_STATUS_IDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MINUTE_IN_SECONDS", function() { return MINUTE_IN_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOUR_IN_SECONDS", function() { return HOUR_IN_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DAY_IN_SECONDS", function() { return DAY_IN_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEEK_IN_SECONDS", function() { return WEEK_IN_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTH_IN_SECONDS", function() { return MONTH_IN_SECONDS; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var MODEL_NAME = 'datetime';
var DATETIME_STATUS_ID = {
  ACTIVE: 'DTA',
  CANCELLED: 'DTC',
  EXPIRED: 'DTE',
  INACTIVE: 'DTI',
  POSTPONED: 'DTP',
  SOLD_OUT: 'DTS',
  TRASHED: 'DTT',
  UPCOMING: 'DTU'
};
var DATETIME_STATUS_IDS = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["values"])(DATETIME_STATUS_ID);
var MINUTE_IN_SECONDS = 60;
var HOUR_IN_SECONDS = MINUTE_IN_SECONDS * 60;
var DAY_IN_SECONDS = HOUR_IN_SECONDS * 24;
var WEEK_IN_SECONDS = HOUR_IN_SECONDS * 7;
var MONTH_IN_SECONDS = DAY_IN_SECONDS * 30;

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
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/helpers */ "@eventespresso/helpers");
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__);
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
Object(lodash__WEBPACK_IMPORTED_MODULE_1__["forOwn"])(_base_date_formatter__WEBPACK_IMPORTED_MODULE_0__, function (implementation, functionName) {
  formatters[functionName] = function () {
    for (var _len = arguments.length, incomingArgs = new Array(_len), _key = 0; _key < _len; _key++) {
      incomingArgs[_key] = arguments[_key];
    }

    var firstArg = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["pullAt"])(incomingArgs, 0);
    return implementation.apply(void 0, [firstArg[0], DATE_FIELDS].concat(incomingArgs));
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
 * @param { BaseEntity } DateTimeEntity
 * @return { string }  A formatted string representing the provided
 *    DateTimeEntity.
 */

var prettyDateFromDateTime = function prettyDateFromDateTime(DateTimeEntity) {
  var content = '';

  if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__["isModelEntityOfModel"])(DateTimeEntity, 'datetime')) {
    if (DateTimeEntity.DTT_EVT_start.hasSame(DateTimeEntity.DTT_EVT_end, 'day')) {
      content += Object(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__["allDateTimesAsString"])(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__["SEPARATOR_SPACE_DASH_SPACE"], DateTimeEntity.DTT_EVT_start.toFormat(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__["DATE_TIME_FORMAT_SITE"]), DateTimeEntity.DTT_EVT_end.toFormat(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__["TIME_FORMAT_SITE"]));
    } else {
      content += Object(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__["allDateTimesAsString"])(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__["SEPARATOR_SPACE_DASH_SPACE"], DateTimeEntity.DTT_EVT_start.toFormat(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__["DATE_TIME_FORMAT_SITE"]), DateTimeEntity.DTT_EVT_end.toFormat(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__["DATE_TIME_FORMAT_SITE"]));
    }

    content = DateTimeEntity.DTT_name ? "".concat(DateTimeEntity.DTT_name, " (").concat(content, ")") : content;
  }

  return content;
};
/* harmony default export */ __webpack_exports__["default"] = (formatters);

/***/ }),

/***/ "./assets/src/data/model/datetime/index.js":
/*!*************************************************!*\
  !*** ./assets/src/data/model/datetime/index.js ***!
  \*************************************************/
/*! exports provided: MODEL_NAME, DATETIME_STATUS_ID, DATETIME_STATUS_IDS, MINUTE_IN_SECONDS, HOUR_IN_SECONDS, DAY_IN_SECONDS, WEEK_IN_SECONDS, MONTH_IN_SECONDS, nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString, DATE_FIELDS, prettyDateFromDateTime, isActive, isExpired, isRecentlyExpired, isSoldOut, isUpcoming, isTrashed, status, statusColorClass, getBackgroundColorClass, getBorderColorClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/datetime/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAME"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATETIME_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["DATETIME_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATETIME_STATUS_IDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["DATETIME_STATUS_IDS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MINUTE_IN_SECONDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MINUTE_IN_SECONDS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HOUR_IN_SECONDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["HOUR_IN_SECONDS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DAY_IN_SECONDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["DAY_IN_SECONDS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WEEK_IN_SECONDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["WEEK_IN_SECONDS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MONTH_IN_SECONDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MONTH_IN_SECONDS"]; });

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

/* harmony import */ var _status_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./status-helper */ "./assets/src/data/model/datetime/status-helper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isActive", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_3__["isActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isExpired", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_3__["isExpired"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isRecentlyExpired", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_3__["isRecentlyExpired"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSoldOut", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_3__["isSoldOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isUpcoming", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_3__["isUpcoming"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTrashed", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_3__["isTrashed"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "status", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_3__["status"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "statusColorClass", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_3__["statusColorClass"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getBackgroundColorClass", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_3__["getBackgroundColorClass"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getBorderColorClass", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_3__["getBorderColorClass"]; });






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
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_1__);
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


var nowDateAndTime = moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()();
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
      forEventId = _ref$forEventId === void 0 ? 0 : _ref$forEventId,
      _ref$showExpired = _ref.showExpired,
      showExpired = _ref$showExpired === void 0 ? false : _ref$showExpired,
      _ref$month = _ref.month,
      month = _ref$month === void 0 ? 'none' : _ref$month;
  var where = [];

  if (!showExpired) {
    where.push('where[DTT_EVT_end**expired][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN"] + '&where[DTT_EVT_end**expired][]=' + nowDateAndTime.local().format());
  }

  if (month && month !== 'none') {
    where.push('where[DTT_EVT_start][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN_AND_EQUAL"] + '&where[DTT_EVT_start][]=' + moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()().month(month).startOf('month').local().format());
    where.push('where[DTT_EVT_end][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["LESS_THAN_AND_EQUAL"] + '&where[DTT_EVT_end][]=' + moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()().month(month).endOf('month').local().format());
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
  queryData = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
  return Object(_base__WEBPACK_IMPORTED_MODULE_4__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/datetime/status-helper.js":
/*!*********************************************************!*\
  !*** ./assets/src/data/model/datetime/status-helper.js ***!
  \*********************************************************/
/*! exports provided: isActive, isExpired, isRecentlyExpired, isSoldOut, isUpcoming, isTrashed, status, statusColorClass, getBackgroundColorClass, getBorderColorClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isActive", function() { return isActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isExpired", function() { return isExpired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRecentlyExpired", function() { return isRecentlyExpired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSoldOut", function() { return isSoldOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUpcoming", function() { return isUpcoming; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTrashed", function() { return isTrashed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "status", function() { return status; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statusColorClass", function() { return statusColorClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBackgroundColorClass", function() { return getBackgroundColorClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBorderColorClass", function() { return getBorderColorClass; });
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/datetime/constants.js");
/**
 * External imports
 */

/**
 * Internal imports
 */


/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @throws {TypeError}
 */

var assertDateTimeEntity = function assertDateTimeEntity(DateTimeEntity) {
  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_0__["isModelEntityOfModel"])(DateTimeEntity, _constants__WEBPACK_IMPORTED_MODULE_1__["MODEL_NAME"])) {
    throw new TypeError('The provided entity is not a datetime instance');
  }
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if event date is occurring NOW
 */


var isActive = function isActive(DateTimeEntity) {
  assertDateTimeEntity(DateTimeEntity);
  return DateTimeEntity.start.diffNow().asSeconds() < 0 && DateTimeEntity.end.diffNow().asSeconds() > 0;
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if end date is in the past
 */

var isExpired = function isExpired(DateTimeEntity) {
  assertDateTimeEntity(DateTimeEntity);
  return DateTimeEntity.end.diffNow().asSeconds() < 0;
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if end date is in the past
 */

var isRecentlyExpired = function isRecentlyExpired(DateTimeEntity) {
  assertDateTimeEntity(DateTimeEntity);
  return DateTimeEntity.end.diffNow().asSeconds() < 0 && DateTimeEntity.end.diffNow().asSeconds() > _constants__WEBPACK_IMPORTED_MODULE_1__["MONTH_IN_SECONDS"] * -1;
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if tickets sold meets or exceeds registration limit
 */

var isSoldOut = function isSoldOut(DateTimeEntity) {
  assertDateTimeEntity(DateTimeEntity);
  var cap = DateTimeEntity.regLimit;
  return cap !== null && cap !== 'INF' && cap !== Infinity && DateTimeEntity.sold >= cap;
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if start date is in the future
 */

var isUpcoming = function isUpcoming(DateTimeEntity) {
  assertDateTimeEntity(DateTimeEntity);
  return DateTimeEntity.start.diffNow().asSeconds() > 0;
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if ticket is archived
 */

var isTrashed = function isTrashed(DateTimeEntity) {
  assertDateTimeEntity(DateTimeEntity);
  return DateTimeEntity.deleted;
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {string} status ID
 */

var status = function status(DateTimeEntity) {
  assertDateTimeEntity(DateTimeEntity);

  if (isTrashed(DateTimeEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_1__["DATETIME_STATUS_ID"].TRASHED;
  }

  if (isExpired(DateTimeEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_1__["DATETIME_STATUS_ID"].EXPIRED;
  }

  if (isSoldOut(DateTimeEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_1__["DATETIME_STATUS_ID"].SOLD_OUT;
  }

  if (isUpcoming(DateTimeEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_1__["DATETIME_STATUS_ID"].UPCOMING;
  }

  if (isActive(DateTimeEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_1__["DATETIME_STATUS_ID"].ACTIVE;
  }

  return _constants__WEBPACK_IMPORTED_MODULE_1__["DATETIME_STATUS_ID"].INACTIVE;
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {string}    CSS class for the background color
 */

var statusColorClass = function statusColorClass(DateTimeEntity) {
  switch (status(DateTimeEntity)) {
    case _constants__WEBPACK_IMPORTED_MODULE_1__["DATETIME_STATUS_ID"].ACTIVE:
      return 'green';

    case _constants__WEBPACK_IMPORTED_MODULE_1__["DATETIME_STATUS_ID"].CANCELLED:
      return 'red';

    case _constants__WEBPACK_IMPORTED_MODULE_1__["DATETIME_STATUS_ID"].EXPIRED:
      return 'lite-grey';

    case _constants__WEBPACK_IMPORTED_MODULE_1__["DATETIME_STATUS_ID"].INACTIVE:
      return 'dark-blue';

    case _constants__WEBPACK_IMPORTED_MODULE_1__["DATETIME_STATUS_ID"].POSTPONED:
      return 'purple';

    case _constants__WEBPACK_IMPORTED_MODULE_1__["DATETIME_STATUS_ID"].SOLD_OUT:
      return 'gold';

    case _constants__WEBPACK_IMPORTED_MODULE_1__["DATETIME_STATUS_ID"].TRASHED:
      return 'dark-grey';

    case _constants__WEBPACK_IMPORTED_MODULE_1__["DATETIME_STATUS_ID"].UPCOMING:
    default:
      return 'blue';
  }
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {string}    CSS class for the background color
 */

var getBackgroundColorClass = function getBackgroundColorClass(DateTimeEntity) {
  return "ee-".concat(statusColorClass(DateTimeEntity), "-background");
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {string} border 'all', 'top', 'right', 'bottom', 'left'
 * @return {string}    CSS class for the background color
 */

var getBorderColorClass = function getBorderColorClass(DateTimeEntity) {
  var border = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
  var color = statusColorClass(DateTimeEntity);

  switch (border) {
    case 'all':
      return "ee-".concat(color, "-border");

    case 'top':
      return "ee-".concat(color, "-border-top");

    case 'right':
      return "ee-".concat(color, "-border-right");

    case 'bottom':
      return "ee-".concat(color, "-border-bottom");

    case 'left':
      return "ee-".concat(color, "-border-left");
  }
};

/***/ }),

/***/ "./assets/src/data/model/default-model-state.js":
/*!******************************************************!*\
  !*** ./assets/src/data/model/default-model-state.js ***!
  \******************************************************/
/*! exports provided: DEFAULT_LISTS_STATE, DEFAULT_CORE_STATE, DEFAULT_SCHEMA_STATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LISTS_STATE", function() { return DEFAULT_LISTS_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CORE_STATE", function() { return DEFAULT_CORE_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SCHEMA_STATE", function() { return DEFAULT_SCHEMA_STATE; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! memize */ "./node_modules/memize/index.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(memize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _endpoints_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./endpoints.js */ "./assets/src/data/model/endpoints.js");


/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


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

var getDefaultModelEntitiesObject = memize__WEBPACK_IMPORTED_MODULE_2___default()(function () {
  return mapToObjectValues(_endpoints_js__WEBPACK_IMPORTED_MODULE_3__["endpoints"]);
});
/**
 * Provides the default state to be used by stores containing lists.
 *
 * @type { Object }
 */

var DEFAULT_LISTS_STATE = mapToObjectValues(_endpoints_js__WEBPACK_IMPORTED_MODULE_3__["endpoints"]);
/**
 * Provides the default state to be used by the core store.
 *
 * @type {{entities: {}, entityIds: {}, dirty: {}}}
 */

var DEFAULT_CORE_STATE = {
  entities: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, getDefaultModelEntitiesObject()),
  relations: {},
  dirty: {
    relations: {
      index: {},
      delete: {},
      add: {}
    },
    trash: {},
    delete: {}
  }
};
/**
 * Provides the default state to be used by the schema store.
 * @type {Object}
 */

var DEFAULT_SCHEMA_STATE = {
  schema: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, getDefaultModelEntitiesObject()),
  factory: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, getDefaultModelEntitiesObject()),
  relationEndpoints: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, getDefaultModelEntitiesObject()),
  relationSchema: {}
};

/***/ }),

/***/ "./assets/src/data/model/endpoints.js":
/*!********************************************!*\
  !*** ./assets/src/data/model/endpoints.js ***!
  \********************************************/
/*! exports provided: baseRestRoute, endpoints, getEndpoint, applyQueryString, stripBaseRouteFromUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseRestRoute", function() { return baseRestRoute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endpoints", function() { return endpoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEndpoint", function() { return getEndpoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyQueryString", function() { return applyQueryString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripBaseRouteFromUrl", function() { return stripBaseRouteFromUrl; });
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertions */ "./assets/src/data/model/assertions.js");
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

var _data$paths = _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__["data"].paths,
    _data$paths$collectio = _data$paths.collection_endpoints,
    endpoints = _data$paths$collectio === void 0 ? {} : _data$paths$collectio,
    baseRestRoute = _data$paths.base_rest_route;
/**
 * Retrieves the endpoint for the provided model.
 *
 * @param {string} modelName  What model to retrieve the endpoint for.
 * @return {string}  The endpoint for the provided model.
 * @throws {Exception}
 */


var getEndpoint = function getEndpoint(modelName) {
  Object(_assertions__WEBPACK_IMPORTED_MODULE_1__["assertEntityHasKey"])(modelName, endpoints);
  return endpoints[modelName];
};
/**
 * Applies the provided queryString to the endpoint for the provided model name.
 * @param {string} modelName  What model the final string is for.
 * @param {string} queryString  The query being appended to the endpoint.
 * @return {string} The final assembled query string.
 */

var applyQueryString = function applyQueryString(modelName) {
  var queryString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return queryString !== '' ? getEndpoint(modelName) + '?' + queryString : getEndpoint(modelName);
};
/**
 * Strips the base_rest_route (i.e. https://myurl.com/wp-json/) from the provided
 * url string.
 *
 * @param {string} url
 * @return {string} the url with the base rest route removed.
 */

var stripBaseRouteFromUrl = function stripBaseRouteFromUrl(url) {
  return url.replace(baseRestRoute, '');
};

/***/ }),

/***/ "./assets/src/data/model/entity-factory/assertions.js":
/*!************************************************************!*\
  !*** ./assets/src/data/model/entity-factory/assertions.js ***!
  \************************************************************/
/*! exports provided: maybeAssertValueObject, assertValidSchema, assertValidSchemaFieldProperties, assertValidValueForPreparedField, assertValidFieldAndValueAgainstSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maybeAssertValueObject", function() { return maybeAssertValueObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertValidSchema", function() { return assertValidSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertValidSchemaFieldProperties", function() { return assertValidSchemaFieldProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertValidValueForPreparedField", function() { return assertValidValueForPreparedField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertValidFieldAndValueAgainstSchema", function() { return assertValidFieldAndValueAgainstSchema; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/value-objects */ "@eventespresso/value-objects");
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _booleans__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./booleans */ "./assets/src/data/model/entity-factory/booleans.js");
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validators */ "./assets/src/data/model/entity-factory/validators.js");
/* harmony import */ var _extractors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./extractors */ "./assets/src/data/model/entity-factory/extractors.js");
/**
 * External imports
 */





/**
 * Internal imports
 */




/**
 * Asserts whether the provided field value is a known value object.
 *
 * Note: this only asserts known value objects, if the value is not detected as
 * a known value object it is passed back as is.
 *
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {Object} schema
 * @throws InvalidDateTime
 * @throws TypeError
 */

var maybeAssertValueObject = function maybeAssertValueObject(fieldName, fieldValue, schema) {
  if (Object(_booleans__WEBPACK_IMPORTED_MODULE_5__["isDateTimeField"])(fieldName, schema)) {
    _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_4__["ServerDateTime"].assertIsDateTime(fieldValue);
  }

  if (Object(_booleans__WEBPACK_IMPORTED_MODULE_5__["isMoneyField"])(fieldName, schema)) {
    _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_4__["Money"].assertMoney(fieldValue);
  }
};
/**
 * Asserts whether the provided object is a valid model schema object.
 *
 * Currently, an object is considered a valid model schema if it has a
 * 'properties' property.
 *
 * @param {*} schema
 * @throws InvalidSchema
 */

var assertValidSchema = function assertValidSchema(schema) {
  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__["isSchema"])(schema)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__["InvalidSchema"]('This is an invalid schema for a model.');
  }
};
/**
 * Asserts that the given field exists in the provided schema and the shape for
 * the schema entry on that field is expected.
 *
 * @param {string} modelName  The model the schema belongs to, this is used for
 * error messages.
 * @param {string} fieldName  The field being checked against the schema
 * @param {Object} schema     The schema for the model used for validation
 * @throws InvalidSchema
 * @throws TypeError
 */

var assertValidSchemaFieldProperties = function assertValidSchemaFieldProperties(modelName, fieldName, schema) {
  if (Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema[fieldName])) {
    throw new TypeError(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])('The given "%s" fieldName does not have a defined schema for the model "%s"', fieldName, modelName));
  }

  if (schema[fieldName].type === 'object') {
    if (Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema[fieldName].properties)) {
      throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__["InvalidSchema"](Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])('The schema for the field %s on the model %s is of type "object" but does not have a properties property.', fieldName, modelName));
    }

    if (Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema[fieldName].properties.raw)) {
      throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__["InvalidSchema"](Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])('The schema for the field %s on the model %s is of type "object" but does not have a raw property in it\'s "properties" property.', fieldName, modelName));
    }

    if (Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema[fieldName].properties.raw.type)) {
      throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__["InvalidSchema"](Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])('The schema for the field %s on the model %s is of type "object" and has a properties.raw property, however there is no "type" defined for the raw property.', fieldName, modelName));
    }
  }
};
/**
 * Asserts that the value provided for the prepared field is valid according to
 * the schema.
 *
 * Prepared fields are:
 *
 * - fields having values that are set as a value object and expect a value
 *   object on updates/inserts.
 * - fields that are the equivalent `raw` value when the field in the schema is
 *   defined to have raw and rendered/pretty values.
 *
 * Note:  This validates against prepared fields which means that:
 *
 * - if the prepared field has a value object as its value, then that value
 *   object is validated before any other validation.
 * - if the prepared field represents an object in the schema, then its value is
 *   validated against the `raw` type in the schema.
 *
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {Object} instance
 * @throws TypeError
 * @throws InvalidDateTime
 */

var assertValidValueForPreparedField = function assertValidValueForPreparedField(fieldName, fieldValue, instance) {
  var schema = instance.schema;
  var isValid = Object(_validators__WEBPACK_IMPORTED_MODULE_6__["isShallowValidValueForField"])(fieldName, fieldValue, schema);

  if (!isValid && schema[fieldName].type === 'object' && schema[fieldName].properties) {
    isValid = schema[fieldName].properties.raw.enum ? Object(_validators__WEBPACK_IMPORTED_MODULE_6__["validateEnumType"])(schema[fieldName].properties.raw.type, schema[fieldName].properties.raw.enum, fieldValue) : Object(_validators__WEBPACK_IMPORTED_MODULE_6__["validateType"])(schema[fieldName].properties.raw.type, Object(_extractors__WEBPACK_IMPORTED_MODULE_7__["maybeConvertFromValueObjectWithAssertions"])(fieldName, fieldValue, schema));

    if (!isValid) {
      throw new TypeError(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])('The given "%1$s" field  is not valid for the defined schema.  It\'s `raw` property Value (%2$s) is not the correct expected type (%3$s).', fieldName, fieldValue, schema[fieldName].properties.raw.type));
    }
  }

  if (!isValid) {
    throw new TypeError(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])('The given "%1$s" field\'s Value (%2$s) is not valid for the defined schema type (%3$s).', fieldName, fieldValue, schema[fieldName].type));
  }
};
/**
 * Asserts whether the value for the given field is valid according to the
 * schema.
 *
 * This is used on entity construction and does not validate prepared field
 * values (see assert assertValidValueForPreparedField).
 *
 * This method also asserts that the schema has valid schema field properties.
 *
 * @param {string} modelName
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {Object} instance
 * @throws TypeError
 * @throws InvalidSchema
 */

var assertValidFieldAndValueAgainstSchema = function assertValidFieldAndValueAgainstSchema(modelName, fieldName, fieldValue, instance) {
  var schema = instance.schema;
  var validationType = Object(_validators__WEBPACK_IMPORTED_MODULE_6__["validateTypeForField"])(fieldName, instance);
  assertValidSchemaFieldProperties(modelName, fieldName, schema);
  var isValid = Object(_validators__WEBPACK_IMPORTED_MODULE_6__["isShallowValidValueForField"])(fieldName, fieldValue, schema, false); // account for fieldName fieldValues that have property schema. For Model
  // Entities, only the VALIDATE_TYPE property is cared about.

  if (schema[fieldName].type === 'object' && schema[fieldName].properties) {
    if (Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(fieldValue[validationType])) {
      throw new TypeError(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])('The given "%1$s" value is not valid for the defined schema. It must be an object and it must have a `%2$s` key.', fieldName, validationType));
    }

    isValid = schema[fieldName].properties[validationType].enum ? Object(_validators__WEBPACK_IMPORTED_MODULE_6__["validateEnumType"])(schema[fieldName].properties[validationType].type, schema[fieldName].properties.raw.enum, fieldValue[validationType]) : Object(_validators__WEBPACK_IMPORTED_MODULE_6__["validateType"])(schema[fieldName].properties[validationType].type, fieldValue[validationType]);

    if (!isValid) {
      throw new TypeError(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])('The given "%1$s" value is not valid for the defined schema.  It\'s `%2$s` property value (%3$s) is not the correct expected type (%4$s).', fieldName, validationType, fieldValue, schema[fieldName].properties[validationType].type));
    }
  }

  if (!isValid) {
    throw new TypeError(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])('The given "%1$s" field\'s value (%2$s) is not valid for the defined schema type (%3$s).', fieldName, fieldValue, schema[fieldName].type));
  }
};

/***/ }),

/***/ "./assets/src/data/model/entity-factory/base-entity.js":
/*!*************************************************************!*\
  !*** ./assets/src/data/model/entity-factory/base-entity.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! memize */ "./node_modules/memize/index.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(memize__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assertions */ "./assets/src/data/model/entity-factory/assertions.js");
/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./create */ "./assets/src/data/model/entity-factory/create.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/entity-factory/constants.js");







/**
 * External imports
 */


/**
 * Internal imports
 */




/**
 * BaseEntity is the basic class for all entities.  createEntityFactory returns
 * an instance of this and all the getters/setters for fields etc are
 * dynamically created via the constructor.
 */

var _PRIVATE_PROPERTIES$S = _constants__WEBPACK_IMPORTED_MODULE_10__["PRIVATE_PROPERTIES"].SAVE_STATE;
var _PRIVATE_PROPERTIES$V = _constants__WEBPACK_IMPORTED_MODULE_10__["PRIVATE_PROPERTIES"].VALIDATE_TYPES;

var BaseEntity =
/*#__PURE__*/
function () {
  /**
   * Constructor for Base Entity
   * @param {string} modelName
   * @param {Object} entityFieldsAndValues
   * @param {Object} schema
   * @param {Array}fieldPrefixes
   * @param {boolean} isNew
   */
  function BaseEntity(modelName, entityFieldsAndValues, schema) {
    var fieldPrefixes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var isNew = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, BaseEntity);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(this, _PRIVATE_PROPERTIES$S, _constants__WEBPACK_IMPORTED_MODULE_10__["SAVE_STATE"].CLEAN);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(this, _PRIVATE_PROPERTIES$V, {});

    Object(_assertions__WEBPACK_IMPORTED_MODULE_8__["assertValidSchema"])(schema);
    fieldPrefixes = Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isArray"])(fieldPrefixes) ? fieldPrefixes : [];
    Object(_create__WEBPACK_IMPORTED_MODULE_9__["createGetter"])(this, 'fieldPrefixes', fieldPrefixes);
    Object(_create__WEBPACK_IMPORTED_MODULE_9__["createGetter"])(this, 'schema', schema.properties);
    Object(_create__WEBPACK_IMPORTED_MODULE_9__["setSaveState"])(this, isNew ? _constants__WEBPACK_IMPORTED_MODULE_10__["SAVE_STATE"].NEW : _constants__WEBPACK_IMPORTED_MODULE_10__["SAVE_STATE"].CLEAN);
    Object(_create__WEBPACK_IMPORTED_MODULE_9__["createGetter"])(this, 'modelName', modelName);
    Object(_create__WEBPACK_IMPORTED_MODULE_9__["createGetter"])(this, 'originalFieldsAndValues', entityFieldsAndValues);
    Object(_create__WEBPACK_IMPORTED_MODULE_9__["createGetter"])(this, 'fieldsToPersistOnInsert', new Set(Object.keys(entityFieldsAndValues)));
    Object(_create__WEBPACK_IMPORTED_MODULE_9__["createEntityGettersAndSetters"])(this);
    Object(_create__WEBPACK_IMPORTED_MODULE_9__["createPersistingGettersAndSetters"])(this);
    Object.seal(this);
  }
  /**
   * Returns the current save state on the entity.
   *
   * Save state describes whether the entity is:
   *
   * - SAVE_STATE.NEW: The entity has never been persisted to storage.
   * - SAVE_STATE.CLEAN: The entity exists in storage and has not been mutated.
   * - SAVE_STATE.DIRTY: The entity is mutated and changes have not been
   * persisted to storage.
   *
   * @return {Symbol}  Returns the current save state for the entity.
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(BaseEntity, [{
    key: "saveState",
    get: function get() {
      return this[_constants__WEBPACK_IMPORTED_MODULE_10__["PRIVATE_PROPERTIES"].SAVE_STATE];
    }
    /**
     * Whether the current save state is SAVE_STATE.NEW
     * @return {boolean}  True means SAVE_STATE.NEW is the save state.
     */

  }, {
    key: "isNew",
    get: function get() {
      return this.saveState === _constants__WEBPACK_IMPORTED_MODULE_10__["SAVE_STATE"].NEW;
    }
    /**
     * Whether the current save state is SAVE_STATE.DIRTY
     * @return {boolean}  True means SAVE_STATE.DIRTY is the save state.
     */

  }, {
    key: "isDirty",
    get: function get() {
      return this.saveState === _constants__WEBPACK_IMPORTED_MODULE_10__["SAVE_STATE"].DIRTY;
    }
    /**
     * Whether the current save state is SAVE_STATE.CLEAN
     * @return {boolean}  True means SAVE_STATE.CLEAN is the save state.
     */

  }, {
    key: "isClean",
    get: function get() {
      return this.saveState === _constants__WEBPACK_IMPORTED_MODULE_10__["SAVE_STATE"].CLEAN;
    }
    /**
     * Whether the entity has any password protected fields.
     * @return {boolean} True means it does, false means it doesn't.
     */

  }, {
    key: "isPasswordProtected",
    get: function get() {
      return this.protectedFields.length > 0;
    }
    /**
     * Whether the given fieldName is a password protected field.
     * @return {function(string): boolean}  Returns a function that can be used
     * to check if the given field name is a protected field in this entity.
     */

  }, {
    key: "isFieldPasswordProtected",
    get: function get() {
      var _this = this;

      return function (fieldName) {
        return _this.protectedFields.indexOf(fieldName) > -1;
      };
    }
    /**
     * Used to clone the current entity object.  This results in an instance of
     * BaseEntity that is equivalent as this current instance (except it will
     * have a new generated id).
     *
     * @return {BaseEntity} A new instance of BaseEntity
     */

  }, {
    key: "clone",
    get: function get() {
      var _this2 = this;

      return function () {
        var keepId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var createFactory = memize__WEBPACK_IMPORTED_MODULE_7___default()(function () {
          return createEntityFactory(_this2.modelName, {
            $schema: {},
            properties: _this2.schema
          }, _this2.fieldPrefixes);
        });
        var factory = createFactory();
        var newEntity = factory.createNew(_this2.forClone);

        if (keepId) {
          newEntity.id = _this2.id;
          Object(_create__WEBPACK_IMPORTED_MODULE_9__["setSaveState"])(newEntity, _this2.saveState, true);
        }

        return newEntity;
      };
    }
  }]);

  return BaseEntity;
}();
/**
 * A function that gives a class the provided name
 * (and optionally extends the provided object).
 * @param {string} name
 * @param {Object} extendedClass
 * @return {Function} A function
 */


_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(BaseEntity, "name", 'BaseEntity');

var nameClass = function nameClass(name, extendedClass) {
  return (
    /*#__PURE__*/
    function (_extendedClass) {
      _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(_class, _extendedClass);

      function _class() {
        _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, _class);

        return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(_class).apply(this, arguments));
      }

      _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(_class, null, [{
        key: "name",
        get: function get() {
          return name;
        }
      }]);

      return _class;
    }(extendedClass)
  );
};
/**
 * A factory for entity factories.
 *
 * Calling this returns an object of factory functions that instantiate an
 * instance of a named Entity.  The modelName is used as the name for the new
 * entity.
 *
 * Two methods are available on the object returned: `createNew` and
 * `fromExisting`.
 *
 * @param {string} modelName  The model for the entity
 * @param {Object} schema     The schema for the model. This is the schema
 * provided by the OPTIONS endpoint for the model.
 * @param {Array} fieldPrefixes An array of field prefixes for base fields on
 * on the model (eg. Event model has `[ EVT ]` prefixes on fields, Datetime model
 * has [ `DTT`, `DTT_EVT` ]
 * @return {Object} A factory for instantiating an entity instance.
 */


var createEntityFactory = function createEntityFactory(modelName, schema) {
  var fieldPrefixes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var Entity = nameClass(Object(lodash__WEBPACK_IMPORTED_MODULE_6__["upperFirst"])(Object(lodash__WEBPACK_IMPORTED_MODULE_6__["camelCase"])(modelName)), BaseEntity);
  return {
    /**
     * Exposes modelName so client code can derive what model this factory
     * is for from any given factory.
     * @type string
     */
    modelName: modelName,

    /**
     * This is the class definition for the Entity.  Typically this is
     * retrieved for the ability to do instanceof checks.
     */
    classDef: Entity,

    /**
     * This returns an instance of Entity for the given arguments with the
     * indication this is a new non-persisted entity.  This means:
     *
     * - All field values are populated and any not provided will be
     *   populated with default values defined by the schema.
     * - Generates temporary unique ids for the primary key fields on the
     *   entity (using cuid).
     * - Sets the `isNew` flag to true for the entity so client code is able
     *   to discover which entities have never been persisted.
     * - This factory method expects fields and values to be "prepared".
     *   What that means is that for any fields that the schema described as
     *   having a `raw` property (i.e. { EVT_desc: { raw: 'something' } })
     *   the value should be of the correct type for that raw property and.
     *   This also means is that for any fields the schema describes as a
     *   date-time (format) or money (format) field, the value is expected
     *   to be the corresponding value object.
     *
     * @param {Object} fieldsAndValues
     * @return {Entity} an instance of Entity
     */
    createNew: function createNew(fieldsAndValues) {
      return new Entity(modelName, fieldsAndValues, schema, fieldPrefixes, true);
    },

    /**
     * This returns an instance of Entity for the given arguments with the
     * indication this represents the entity as is in the db.  This means:
     *
     * - All field values are NOT populated if missing values.  This is
     *   especially important for contexts like unauthorized views where
     *   only partial entities are returned in REST responses.
     * - isNew flag is set to false (and never changes for this entity)
     * - The incoming values are expected to be in the exact shape as
     *   described by the schema for the entity model.
     *
     * @param {Object} fieldsAndValues
     * @return {Entity} an instance of Entity
     */
    fromExisting: function fromExisting(fieldsAndValues) {
      return new Entity(modelName, fieldsAndValues, schema, fieldPrefixes);
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (createEntityFactory);

/***/ }),

/***/ "./assets/src/data/model/entity-factory/booleans.js":
/*!**********************************************************!*\
  !*** ./assets/src/data/model/entity-factory/booleans.js ***!
  \**********************************************************/
/*! exports provided: hasRawProperty, hasPrettyProperty, hasRenderedProperty, hasFormatProperty, hasEnumProperty, isValueObjectField, isDateTimeField, isUTCDateTimeField, isPrimaryKeyField, isReadOnly, isEntityField, isMoneyField, isEnumField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasRawProperty", function() { return hasRawProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasPrettyProperty", function() { return hasPrettyProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasRenderedProperty", function() { return hasRenderedProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasFormatProperty", function() { return hasFormatProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasEnumProperty", function() { return hasEnumProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValueObjectField", function() { return isValueObjectField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDateTimeField", function() { return isDateTimeField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUTCDateTimeField", function() { return isUTCDateTimeField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPrimaryKeyField", function() { return isPrimaryKeyField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isReadOnly", function() { return isReadOnly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEntityField", function() { return isEntityField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMoneyField", function() { return isMoneyField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEnumField", function() { return isEnumField; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

/**
 * Indicates whether the provided value has a "raw" property.
 *
 * @param {*} value
 * @return {boolean} True if the value is a plain object and has a `raw` property.
 */

var hasRawProperty = function hasRawProperty(value) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(value) && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(value.raw);
};
/**
 * Indicates whether the provided value has a "pretty" property.
 *
 * @param {*} value
 * @return {*} True if the value is a plain object and has a `pretty` property.
 */

var hasPrettyProperty = function hasPrettyProperty(value) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(value) && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(value.pretty);
};
/**
 * Indicates whether the provided value has a "rendered" property.
 *
 * @param {*} value
 * @return {boolean} True if the value is a plain object and has a `rendered` property.
 */

var hasRenderedProperty = function hasRenderedProperty(value) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(value) && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(value.rendered);
};
/**
 * Indicates whether the provided value has a "format" property.
 *
 * @param {*} value
 * @return {boolean} True if the value is a plain object and has a `format` property.
 */

var hasFormatProperty = function hasFormatProperty(value) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(value) && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(value.format);
};
/**
 * Indicates whether the provided value has a "enum" property.
 *
 * @param {*} value
 * @return {boolean} True if the value is a plain object and has an enum
 * property.
 */

var hasEnumProperty = function hasEnumProperty(value) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(value) && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(value.enum);
};
/**
 * Indicates whether the provided value is a "value object" field.
 *
 * @param {string} field
 * @param {Object} schema
 * @return {boolean} True if the value is a value object field.
 */

var isValueObjectField = function isValueObjectField(field, schema) {
  return isDateTimeField(field, schema) || isMoneyField(field, schema);
};
/**
 * Indicates whether the provided field is a date-time field according to the
 * provided schema.
 *
 * @param {string} field
 * @param {Object} schema
 * @return {boolean} True means it is a date-time field.
 */

var isDateTimeField = function isDateTimeField(field, schema) {
  return !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema[field]) && hasFormatProperty(schema[field]) && schema[field].format === 'date-time';
};
/**
 * Indicates whether the provided field is a UTC date-time field.
 *
 * If schema is provided, this also considers whether this is a date-time field.
 *
 * @param {string} dateTimeFieldName
 * @param {Object} schema [optional]
 * @return {boolean} True means this is a UTC field.  If schema is provided it
 * means this is also a date-time field.
 */

var isUTCDateTimeField = function isUTCDateTimeField(dateTimeFieldName) {
  var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return schema !== null ? isDateTimeField(dateTimeFieldName, schema) && dateTimeFieldName.indexOf('_gmt') > 0 : dateTimeFieldName.indexOf('_gmt') > 0;
};
/**
 * Returns whether the provided field represents a primary key field using the
 * provided schema.
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {boolean}  True means it is a primary key field.
 */

var isPrimaryKeyField = function isPrimaryKeyField(fieldName, schema) {
  return !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema[fieldName]) && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema[fieldName].primary_key);
};
/**
 * Returns whether the provided field represents a readonly field using the
 * provided schema.
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {boolean}  True means it is a readonly field.
 */

var isReadOnly = function isReadOnly(fieldName, schema) {
  return !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema[fieldName]) && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema[fieldName].readonly) && schema[fieldName].readonly;
};
/**
 * Indicates whether the provided field is a "entity" field using the provided
 * schema.
 *
 * An "entity" field is any field that satisfies the following conditions:
 *
 * - field exists in the schema
 * - it is not readonly or is a primary key field.
 * - it is not a utc field.
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {boolean} True if this is an entity field
 */

var isEntityField = function isEntityField(fieldName, schema) {
  return !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema[fieldName]) && (!isReadOnly(fieldName, schema) || isPrimaryKeyField(fieldName, schema)) && !isUTCDateTimeField(fieldName) && fieldName !== '_protected';
};
/**
 * Indicates whether the field represents a value of money from the provided
 * schema.
 *
 * A field is a money field if the following conditions are satisfied:
 *
 * - It exists in the schema
 * - It has a pretty property
 * - The pretty property value has a format property.
 * - The format property is equal to 'money'
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {boolean} True if it is a money field.
 */

var isMoneyField = function isMoneyField(fieldName, schema) {
  return !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema[fieldName]) && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema[fieldName].properties) && hasPrettyProperty(schema[fieldName].properties) && hasFormatProperty(schema[fieldName].properties.pretty) && schema[fieldName].properties.pretty.format === 'money';
};
/**
 * Indicates whether the field is an enum type field as defined in the provided
 * schema.
 *
 * Note: this only evaluates the top-level for the field schema.  If the field
 * in the schema is of type 'object' and one of the object properties is of type
 * 'enum' this will not consider it an "enum" field.
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {boolean}  True if the field is an enum type field.
 */

var isEnumField = function isEnumField(fieldName, schema) {
  return !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema[fieldName]) && hasEnumProperty(schema[fieldName]) && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema[fieldName].enum.length) && schema[fieldName].enum.length > 0;
};

/***/ }),

/***/ "./assets/src/data/model/entity-factory/constants.js":
/*!***********************************************************!*\
  !*** ./assets/src/data/model/entity-factory/constants.js ***!
  \***********************************************************/
/*! exports provided: SAVE_STATE, VALIDATE_TYPE, PRIVATE_PROPERTIES, MODEL_PREFIXES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SAVE_STATE", function() { return SAVE_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALIDATE_TYPE", function() { return VALIDATE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRIVATE_PROPERTIES", function() { return PRIVATE_PROPERTIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_PREFIXES", function() { return MODEL_PREFIXES; });
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External imports
 */


/**
 * Constants describing the current "save state" for an entity.
 *
 * @type {{CLEAN: Symbol, NEW: Symbol, DIRTY: Symbol}}
 */

var SAVE_STATE = {
  CLEAN: Symbol('Entity is persisted.'),
  NEW: Symbol('Entity is new.'),
  DIRTY: Symbol('Existing entity has changes and needs persisted.')
};
/**
 * Validation types are for schema's that have value variations.
 * @type {{RAW: string, RENDERED: string, PRETTY: string}}
 */

var VALIDATE_TYPE = {
  RAW: 'raw',
  RENDERED: 'rendered',
  PRETTY: 'pretty'
};
/**
 * Private properties used internally by the Base Entity Class
 * @type {{saveState: boolean}}
 */

var PRIVATE_PROPERTIES = {
  SAVE_STATE: Symbol('baseEntityPrivatePropertiesSaveState'),
  VALIDATE_TYPES: Symbol('baseEntityPrivatePropertiesValidateTypes')
};
/**
 * Hardcoded list of model prefixes for fields on models.

 * A model prefix is something that "namespaces" a field on a model.  For
 * example, if the field is "EVT_ID", then the prefix is "EVT"; if the field is
 * "DTT_EVT_start", then the prefixes are "DTT", and "DTT_EVT".
 *
 * @param  {string} modelName
 * @return {Object} A filtered object indexed by model name and the values are
 * an array of model prefixes for that model.
 */

var MODEL_PREFIXES = function MODEL_PREFIXES(modelName) {
  var prefixMap = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__["applyFilters"])('FHEE__ENTITY_FACTORY__CONSTANTS__MODEL_PREFIXES', {
    answer: ['ANS'],
    attendee: ['ATT'],
    change_log: ['LOG'],
    checkin: ['CHK'],
    country: ['CNT'],
    currency: ['CUR'],
    currency_payment_method: ['CPM'],
    datetime: ['DTT', 'DTT_EVT'],
    datetime_ticket: ['DTK'],
    event: ['EVT'],
    event_message_template: ['EMT'],
    event_question_group: ['EQG'],
    event_venue: ['EVV'],
    extra_join: ['EXJ'],
    extra_meta: ['EXM'],
    line_item: ['LIN'],
    message: ['MSG'],
    message_template: ['MTP'],
    message_template_group: ['GRP', 'MTP'],
    payment: ['PAY'],
    payment_method: ['PMD'],
    post_meta: ['meta'],
    price: ['PRC'],
    price_type: ['PRT'],
    question: ['QST'],
    question_group: ['QSG'],
    question_group_question: ['QGQ'],
    question_option: ['QSO'],
    registration: ['REG'],
    registration_payment: ['RPY'],
    state: ['STA'],
    status: ['STS'],
    term: ['term'],
    term_relationship: [],
    term_taxonomy: ['term_taxonomy'],
    ticket: ['TKT'],
    ticket_price: ['TKP'],
    ticket_template: ['TTM'],
    transaction: ['TXN'],
    venue: ['VNU'],
    wp_user: ['user']
  });
  return !Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isUndefined"])(prefixMap[modelName]) ? prefixMap[modelName] : [];
};

/***/ }),

/***/ "./assets/src/data/model/entity-factory/create.js":
/*!********************************************************!*\
  !*** ./assets/src/data/model/entity-factory/create.js ***!
  \********************************************************/
/*! exports provided: createGetter, createCallbackGetter, createGetterAndSetter, createAliasGetterAndSetter, createAliasGetter, createFluentSetter, createEntityGettersAndSetters, createPersistingGettersAndSetters, createRawEntityGettersSetters, createAliasGetterForField, createAliasGetterAndSetterForField, createRenderedGetters, createPrimaryKeyFieldGetters, setCalculatedFieldAndValues, setResources, setRelationsResource, setSaveState, setFieldToPersist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGetter", function() { return createGetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCallbackGetter", function() { return createCallbackGetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGetterAndSetter", function() { return createGetterAndSetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAliasGetterAndSetter", function() { return createAliasGetterAndSetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAliasGetter", function() { return createAliasGetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFluentSetter", function() { return createFluentSetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntityGettersAndSetters", function() { return createEntityGettersAndSetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPersistingGettersAndSetters", function() { return createPersistingGettersAndSetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRawEntityGettersSetters", function() { return createRawEntityGettersSetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAliasGetterForField", function() { return createAliasGetterForField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAliasGetterAndSetterForField", function() { return createAliasGetterAndSetterForField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRenderedGetters", function() { return createRenderedGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPrimaryKeyFieldGetters", function() { return createPrimaryKeyFieldGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCalculatedFieldAndValues", function() { return setCalculatedFieldAndValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setResources", function() { return setResources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRelationsResource", function() { return setRelationsResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSaveState", function() { return setSaveState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFieldToPersist", function() { return setFieldToPersist; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cuid */ "cuid");
/* harmony import */ var cuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cuid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assertions */ "./assets/src/data/model/entity-factory/assertions.js");
/* harmony import */ var _extractors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./extractors */ "./assets/src/data/model/entity-factory/extractors.js");
/* harmony import */ var _booleans__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./booleans */ "./assets/src/data/model/entity-factory/booleans.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/entity-factory/constants.js");



/**
 * External imports
 */



/**
 * Internal imports
 */





/**(
 * A generic getter creator for a provided instance.
 *
 * @param {Object} instance
 * @param {string} fieldName  The name of the accessor.
 * @param {*} fieldValue
 * @param {Object} opts used to pass through additional options for the
 * Object.defineProperty call.
 */

var createGetter = function createGetter(instance, fieldName, fieldValue) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  Object.defineProperty(instance, fieldName, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({
    get: function get() {
      return fieldValue;
    }
  }, opts));
};
/**
 * This creates a getter that calls the provided callback when invoked.
 *
 * The callback receives the `instance` argument passed through
 *
 * @param {Object} instance
 * @param {string} propertyName
 * @param {function(Object)} callBack
 * @param {Object} opts
 */

var createCallbackGetter = function createCallbackGetter(instance, propertyName, callBack) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  Object.defineProperty(instance, propertyName, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({
    get: function get() {
      return callBack(instance);
    }
  }, opts));
};
/**
 * A generic getter and setter creator for a provided instance
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {*}  initialFieldValue
 * @param {Object} opts Optional, pass through options used by
 * Object.defineProperty
 */

var createGetterAndSetter = function createGetterAndSetter(instance, fieldName, initialFieldValue) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var propertyValue = initialFieldValue;
  Object.defineProperty(instance, fieldName, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({
    get: function get() {
      return propertyValue;
    },
    set: function set(receivedValue) {
      var isPrimaryField = Object(_booleans__WEBPACK_IMPORTED_MODULE_7__["isPrimaryKeyField"])(fieldName, instance.schema);

      if (!instance.isNew && isPrimaryField) {
        return;
      }

      Object(_assertions__WEBPACK_IMPORTED_MODULE_5__["assertValidValueForPreparedField"])(fieldName, receivedValue, instance);

      if (!isPrimaryField) {
        setSaveState(instance, _constants__WEBPACK_IMPORTED_MODULE_8__["SAVE_STATE"].DIRTY);
        setFieldToPersist(instance, fieldName);
      }

      propertyValue = receivedValue;
    }
  }, opts));
};
/**
 * A getter and setter creator for an field alias.
 *
 * @param {Object} instance
 * @param {string} originalFieldName
 * @param {string} aliasFieldName
 * @param {Object} opts
 */

var createAliasGetterAndSetter = function createAliasGetterAndSetter(instance, originalFieldName, aliasFieldName) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (originalFieldName !== aliasFieldName) {
    Object.defineProperty(instance, aliasFieldName, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({
      get: function get() {
        return instance[originalFieldName];
      },
      set: function set(receivedValue) {
        return instance[originalFieldName] = receivedValue;
      }
    }, opts));
  }
};
/**
 * A getter creator for a field alias.
 *
 * @param {Object} instance
 * @param {string} originalFieldName
 * @param {string} aliasFieldName
 * @param {Object} opts
 */

var createAliasGetter = function createAliasGetter(instance, originalFieldName, aliasFieldName) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (originalFieldName !== aliasFieldName) {
    Object.defineProperty(instance, aliasFieldName, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({
      get: function get() {
        return instance[originalFieldName];
      }
    }, opts));
  }
};
/**
 * Creates a fluent setter on the provided instance for the given field name.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {Object} opts  Options for Object.defineProperty
 */

var createFluentSetter = function createFluentSetter(instance, fieldName) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.defineProperty(instance, 'set' + Object(lodash__WEBPACK_IMPORTED_MODULE_2__["upperFirst"])(fieldName), _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({
    get: function get() {
      return function (receivedValue) {
        instance[fieldName] = receivedValue;
        return instance;
      };
    }
  }, opts));
};
/**
 * Creates initial getters and setters for entities on the provided entity
 * instance using the given data.
 * @param {Object} instance
 * keys on instance.
 */

var createEntityGettersAndSetters = function createEntityGettersAndSetters(instance) {
  var primaryKeys = [];
  Object(lodash__WEBPACK_IMPORTED_MODULE_2__["forEach"])(instance.originalFieldsAndValues, function (fieldValue, fieldName) {
    var isPrimaryKey = Object(_booleans__WEBPACK_IMPORTED_MODULE_7__["isPrimaryKeyField"])(fieldName, instance.schema);
    setValidateTypeForField(instance, fieldName, fieldValue);

    if (Object(_booleans__WEBPACK_IMPORTED_MODULE_7__["isEntityField"])(fieldName, instance.schema)) {
      if (instance.isNew) {
        Object(_assertions__WEBPACK_IMPORTED_MODULE_5__["assertValidValueForPreparedField"])(fieldName, fieldValue, instance);
      } else {
        Object(_assertions__WEBPACK_IMPORTED_MODULE_5__["assertValidFieldAndValueAgainstSchema"])(instance.modelName, fieldName, fieldValue, instance);
      }

      setInitialEntityFieldsAndValues(instance, fieldName, fieldValue, isPrimaryKey);
    }

    if (fieldName === '_calculated_fields') {
      setCalculatedFieldAndValues(instance, fieldValue);
    }

    if (fieldName === '_protected') {
      populateProtectedFieldsProperty(instance, fieldValue);
    }

    if (fieldName === 'link') {
      createGetter(instance, 'link', fieldValue);
    }

    if (fieldName === '_links') {
      setResources(instance, fieldValue);
    }

    if (!instance.isNew && isPrimaryKey) {
      primaryKeys.push(fieldName);
    }
  });

  if (!instance.isNew && primaryKeys.length) {
    createPrimaryKeyFieldGetters(instance, primaryKeys);
  }

  populatePrimaryKeys(instance);
  populateMissingFields(instance);
};
/**
 * Populates the `protectedFields` property on the instance.
 *
 * @param {Object} instance
 * @param {Array} protectedFields
 */

var populateProtectedFieldsProperty = function populateProtectedFieldsProperty(instance, protectedFields) {
  // get any calculated protected fields.
  var calculatedFields = instance.originalFieldsAndValues._calculated_fields || {};

  if (calculatedFields._protected && Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isArray"])(calculatedFields._protected)) {
    protectedFields = [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(protectedFields), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(calculatedFields._protected));
  }

  createGetter(instance, 'protectedFields', protectedFields);
};
/**
 * This populates primary key fields.
 * Note that it also overrides any primary key values/properties that are
 * already set in the entity so is only processed when the instance is new.
 *
 * @param {Object} instance
 */


var populatePrimaryKeys = function populatePrimaryKeys(instance) {
  if (!instance.isNew) {
    return;
  }

  var primaryKeys = Object(_extractors__WEBPACK_IMPORTED_MODULE_6__["getPrimaryKeyFieldsFromSchema"])(instance);
  Object(lodash__WEBPACK_IMPORTED_MODULE_2__["forEach"])(primaryKeys, function (schemaProperties, schemaField) {
    // always delete and override what is existing.
    if (instance[schemaField]) {
      delete instance[schemaField];
    }

    createGetterAndSetter(instance, schemaField, cuid__WEBPACK_IMPORTED_MODULE_3___default()(), {
      configurable: true,
      enumerable: true
    });
    createAliasGetterAndSetterForField(instance, schemaField);
  });
  createPrimaryKeyFieldGetters(instance, Object(lodash__WEBPACK_IMPORTED_MODULE_2__["keys"])(primaryKeys));
};
/**
 * Sets the validate type for a field property.
 * @param {Object} instance
 * @param {string} fieldName
 * @param {*} fieldValue
 */


var setValidateTypeForField = function setValidateTypeForField(instance, fieldName, fieldValue) {
  instance[_constants__WEBPACK_IMPORTED_MODULE_8__["PRIVATE_PROPERTIES"].VALIDATE_TYPES][fieldName] = Object(_extractors__WEBPACK_IMPORTED_MODULE_6__["deriveValidateTypeForField"])(fieldName, fieldValue, instance.schema);
};
/**
 *  Populates missing fields and values using defaults provided by schema.  If
 *  schema doesn't provide a default then this will populate the field with a
 *  default value that matches the type.
 *
 * @param {Object} instance
 */


var populateMissingFields = function populateMissingFields(instance) {
  if (typeof instance.protectedFields === 'undefined') {
    populateProtectedFieldsProperty(instance, []);
  }

  if (!instance.isNew) {
    return;
  }

  Object(lodash__WEBPACK_IMPORTED_MODULE_2__["forEach"])(Object(_extractors__WEBPACK_IMPORTED_MODULE_6__["getEntityFieldsFromSchema"])(instance), function (schemaProperties, fieldName) {
    if (typeof instance[fieldName] === 'undefined' && !Object(_booleans__WEBPACK_IMPORTED_MODULE_7__["isPrimaryKeyField"])(fieldName, instance.schema)) {
      setInitialEntityFieldsAndValues(instance, fieldName, undefined);
    }
  });
};
/**
 * Returns a plain object of entity fields and values from this entity instance
 * for use in cloning the entity.
 *
 * @param {BaseEntity} instance
 *
 * @return {Object} Plain object of all field:value pairs.
 */


var forClone = function forClone(instance) {
  return Object(_extractors__WEBPACK_IMPORTED_MODULE_6__["getBaseFieldsAndValuesForCloning"])(instance);
};
/**
 * Returns a plain object of the entity fields and values from this entity
 * instance prepared for use in an update request.
 *
 * @param {Object} instance
 * @return {Object} Plain object of field:value pairs.
 */


var forUpdate = function forUpdate(instance) {
  return Object(_extractors__WEBPACK_IMPORTED_MODULE_6__["getBaseFieldsAndValuesForPersisting"])(instance);
};
/**
 * Returns a plain object of the entity fields and values from this entity
 * instance prepared for use in an insert request.
 *
 * @param {Object} instance
 * @return {Object} Plain object of field:value pairs.
 */


var forInsert = function forInsert(instance) {
  var entityValues = Object(_extractors__WEBPACK_IMPORTED_MODULE_6__["getBaseFieldsAndValuesForPersisting"])(instance, true);
  instance.primaryKeys.forEach(function (primaryKey) {
    entityValues[primaryKey] = instance[primaryKey];
  });
  return entityValues;
};
/**
 * Returns a plain object of the entity fields and values from this entity
 * instance prepared for use in either an insert or update request.  The type
 * is automatically derived from the determining whether the entity is "new" or
 * not.
 *
 * @param {Object} instance
 * @return {Object} Plain object of field:value pairs.
 */


var forPersist = function forPersist(instance) {
  if (instance.isNew) {
    return forInsert(instance);
  }

  return forUpdate(instance);
};
/**
 * Creates getters for retrieving the fields and values of the entity instance
 * for insert or update requests.
 *
 * @param {Object} instance
 */


var createPersistingGettersAndSetters = function createPersistingGettersAndSetters(instance) {
  createCallbackGetter(instance, 'forUpdate', forUpdate);
  createCallbackGetter(instance, 'forInsert', forInsert);
  createCallbackGetter(instance, 'forPersist', forPersist);
  createCallbackGetter(instance, 'forClone', forClone);
};
/**
 * Creates initial entity field accessors.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {boolean} isPrimaryKey
 */

var setInitialEntityFieldsAndValues = function setInitialEntityFieldsAndValues(instance, fieldName, fieldValue) {
  var isPrimaryKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(fieldValue)) {
    fieldValue = Object(_extractors__WEBPACK_IMPORTED_MODULE_6__["getDefaultValueForField"])(fieldName, instance.schema);
    setValidateTypeForField(instance, fieldName, fieldValue);
  }

  createRawEntityGettersSetters(instance, fieldName, Object(_extractors__WEBPACK_IMPORTED_MODULE_6__["derivePreparedValueForField"])(fieldName, fieldValue, instance), isPrimaryKey);

  if (!isPrimaryKey) {
    createRenderedGetters(instance, fieldName, Object(_extractors__WEBPACK_IMPORTED_MODULE_6__["deriveRenderedValue"])(fieldValue));
  }
};
/**
 * Creates raw entity getters and setters.  These are the properties of an
 * entity that have the values used for not only getting but also setting.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {boolean} isPrimaryKey set to true if field is the model's primary key
 */


var createRawEntityGettersSetters = function createRawEntityGettersSetters(instance, fieldName, fieldValue) {
  var isPrimaryKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var opts = {
    enumerable: true
  }; // primary key is immutable

  if (isPrimaryKey) {
    createGetter(instance, fieldName, fieldValue, opts);
    createAliasGetterForField(instance, fieldName);
  } else {
    createGetterAndSetter(instance, fieldName, fieldValue, opts);
    createFluentSetter(instance, fieldName);
    createAliasGetterAndSetterForField(instance, fieldName);
  }
};
/**
 * Creates "alias" getter for the given field name on the entity instance.
 * @param {Object} instance
 * @param {string} fieldName
 */

var createAliasGetterForField = function createAliasGetterForField(instance, fieldName) {
  createAliasesForMethod(instance, fieldName, createAliasGetter);
};
/**
 * Creates "alias" getters and setters for the given field on the entity
 * instance.
 *
 * Example: Datetime entities have a `DTT_EVT_start` field.  On the entity
 * instance, you will be able to access the value of that field via:
 * - datetime.DTT_EVT_start
 * - datetime.dttEvtStart
 * - datetime.evtStart
 * - datetime.start
 *
 * @param {Object} instance
 * @param {string} fieldName
 */

var createAliasGetterAndSetterForField = function createAliasGetterAndSetterForField(instance, fieldName) {
  createAliasesForMethod(instance, fieldName, createAliasGetterAndSetter);
};
/**
 * Creates Aliases using the provided method.
 * @param {Object} instance
 * @param {string} fieldName
 * @param {function} method
 */

var createAliasesForMethod = function createAliasesForMethod(instance, fieldName, method) {
  // camelCase getter (or setter) for full field name (eg. EVT_desc => evtDesc)
  method(instance, fieldName, Object(lodash__WEBPACK_IMPORTED_MODULE_2__["camelCase"])(fieldName)); // strip field prefixes and camelCase (if there are field prefixes for the
  // entity. (eg. EVT_desc => desc);

  if (instance.fieldPrefixes) {
    var newFieldName = ''; // Yes, its intended that if there are multiple prefixes, this could
    // end up creating multiple aliased getters (or setters)
    // (eg Datetime: DTT_EVT_start would end up with `evtStart` and `start`
    // as getter accessors).

    instance.fieldPrefixes.forEach(function (fieldPrefix) {
      newFieldName = fieldName.replace(fieldPrefix + '_', '');

      if (newFieldName !== fieldName) {
        method(instance, fieldName, Object(lodash__WEBPACK_IMPORTED_MODULE_2__["camelCase"])(newFieldName));
      }
    });
  }
};
/**
 * Returns a callback that is used in the `getRendered` field getter.
 * @param {Object} instance
 * @return {function(string): *}  A callback.
 */


var getRenderedCallback = function getRenderedCallback(instance) {
  return function (requestedFieldName) {
    return instance[requestedFieldName + 'Rendered'];
  };
};
/**
 * Returns a fieldName stripped of all possible prefixes.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @return {string} The prefix free fieldName.
 */


var removePrefixesFromField = function removePrefixesFromField(instance, fieldName) {
  var prefixesToRemove = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(instance.fieldPrefixes, function (prefix) {
    return prefix.length * -1;
  });
  var newFieldName = fieldName;
  Object(lodash__WEBPACK_IMPORTED_MODULE_2__["forEach"])(prefixesToRemove, function (prefix) {
    newFieldName = fieldName.replace(prefix, '');

    if (newFieldName !== fieldName) {
      return false;
    }
  });
  return newFieldName;
};
/**
 * This creates the getters for the rendered property of model fields.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {*}  fieldValue
 */


var createRenderedGetters = function createRenderedGetters(instance, fieldName, fieldValue) {
  createGetter(instance, Object(lodash__WEBPACK_IMPORTED_MODULE_2__["camelCase"])(removePrefixesFromField(instance, fieldName)) + 'Rendered', fieldValue);

  if (Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(instance.getRendered)) {
    createCallbackGetter(instance, 'getRendered', getRenderedCallback);
  }
};
/**
 * Callback for the `hasMultiplePrimaryKeys` getter.
 *
 * @param {Object} instance
 * @return {function(): boolean} The callback for hasMultiplePrimaryKeys getter
 */

var hasMultiplePrimaryKeysCallback = function hasMultiplePrimaryKeysCallback(instance) {
  return instance.primaryKeys.length > 1;
};
/**
 * Creates getters for primary key related data.
 *
 * @param {Object} instance
 * @param {Array} primaryKeys
 */


var createPrimaryKeyFieldGetters = function createPrimaryKeyFieldGetters(instance, primaryKeys) {
  var opts = {
    configurable: true
  };

  if (Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isArray"])(primaryKeys)) {
    createGetter(instance, 'primaryKey', primaryKeys[0], opts);
    createGetterAndSetter(instance, 'primaryKeys', primaryKeys, opts);
    createCallbackGetter(instance, 'hasMultiplePrimaryKeys', hasMultiplePrimaryKeysCallback, opts);
  }
};
/**
 * @param {Object} instance
 * @return {function(string): boolean} Returns a callback for the
 * hasCalculatedField getter
 */

var hasCalculatedFieldCallback = function hasCalculatedFieldCallback(instance) {
  return function (fieldNameToCheck) {
    return !Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(instance[fieldNameToCheck]);
  };
};
/**
 * Creates the getters for all the calculated fields and value on the entity.
 * @param {Object} instance
 * @param {Object.<string,*>}fieldsAndValues
 */


var setCalculatedFieldAndValues = function setCalculatedFieldAndValues(instance, fieldsAndValues) {
  Object(lodash__WEBPACK_IMPORTED_MODULE_2__["forEach"])(fieldsAndValues, function (calculatedFieldValue, calculatedFieldName) {
    if (calculatedFieldName !== '_protected') {
      createGetter(instance, Object(lodash__WEBPACK_IMPORTED_MODULE_2__["camelCase"])(calculatedFieldName), calculatedFieldValue);
    }
  });
  createCallbackGetter(instance, 'hasCalculatedField', hasCalculatedFieldCallback);
};
/**
 * Create getters for the various resource links on the entity.
 *
 * @param {Object} instance
 * @param {Object.<string,*>}fieldsAndValues
 */

var setResources = function setResources(instance, fieldsAndValues) {
  var relations = [];
  var relationName;
  Object(lodash__WEBPACK_IMPORTED_MODULE_2__["forEach"])(fieldsAndValues, function (resourceValue, resourceName) {
    if (resourceName === 'self') {
      createGetter(instance, 'resourceLink', resourceValue[0].href);
    } else if (resourceName === 'collection') {
      createGetter(instance, 'collectionResourceLink', resourceValue[0].href);
    } else {
      relationName = Object(_extractors__WEBPACK_IMPORTED_MODULE_6__["getRelationNameFromLink"])(resourceName);
      relations.push(relationName);
      setRelationsResource(instance, relationName + 'Resource', resourceValue);
    }
  }); //set relations getter

  createGetter(instance, 'getRelations', relations);
};
/**
 * @param {Object} instance
 * @return {function(string): Object} Returns the callback for getting a
 * relation resource
 */

var getRelationResourceCallback = function getRelationResourceCallback(instance) {
  return function (relationName) {
    return instance[relationName.replace('Resource', '')];
  };
};
/**
 * Creates getters for the relations resource object.
 *
 * @param {Object} instance
 * @param {string} relationName
 * @param {Object.<string, string>} resourceInfo
 */


var setRelationsResource = function setRelationsResource(instance, relationName, resourceInfo) {
  createGetter(instance, relationName, {
    resourceLink: resourceInfo[0].href,
    single: resourceInfo[0].single
  });

  if (Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(instance.getRelationResource)) {
    createCallbackGetter(instance, 'getRelationResource', getRelationResourceCallback);
  }
};
/**
 * Sets the internal save state to the given value when current state is
 * SAVE_STATE.clean otherwise current save state is retained.
 *
 * @param {Object} instance
 * @param {string} saveState Expected to be one of SAVE_STATE constant values.
 * @param {boolean} override Set to true when overriding the default logic for
 * setting state.  When true, the saveState is set to whatever the incoming
 * saveState value is.
 */

var setSaveState = function setSaveState(instance, saveState) {
  var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var currentState = instance[_constants__WEBPACK_IMPORTED_MODULE_8__["PRIVATE_PROPERTIES"].SAVE_STATE];

  switch (saveState) {
    case _constants__WEBPACK_IMPORTED_MODULE_8__["SAVE_STATE"].DIRTY:
    case _constants__WEBPACK_IMPORTED_MODULE_8__["SAVE_STATE"].NEW:
    case _constants__WEBPACK_IMPORTED_MODULE_8__["SAVE_STATE"].CLEAN:
      if (override) {
        instance[_constants__WEBPACK_IMPORTED_MODULE_8__["PRIVATE_PROPERTIES"].SAVE_STATE] = saveState;
        break;
      }

      instance[_constants__WEBPACK_IMPORTED_MODULE_8__["PRIVATE_PROPERTIES"].SAVE_STATE] = currentState === _constants__WEBPACK_IMPORTED_MODULE_8__["SAVE_STATE"].CLEAN ? saveState : currentState;
      break;

    default:
      throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_4__["InvalidArgument"]('Save state for entity can only be set to either ' + 'SAVE_STATE.DIRTY, SAVE_STATE.NEW or SAVE_STATE.CLEAN');
  }
};
/**
 * Add the field name to the fieldToPersistOnInsert property on the instance
 * if it exists.
 *
 * @param {Object} instance
 * @param {string} fieldName
 */

var setFieldToPersist = function setFieldToPersist(instance, fieldName) {
  if (instance.fieldsToPersistOnInsert) {
    instance.fieldsToPersistOnInsert.add(fieldName);
  }
};

/***/ }),

/***/ "./assets/src/data/model/entity-factory/extractors.js":
/*!************************************************************!*\
  !*** ./assets/src/data/model/entity-factory/extractors.js ***!
  \************************************************************/
/*! exports provided: maybeConvertToValueObject, maybeConvertFromValueObjectWithAssertions, maybeConvertFromValueObject, derivePreparedValueForField, deriveRenderedValue, getRelationNameFromLink, getBaseFieldsAndValuesForCloning, getBaseFieldsAndValuesForPersisting, getPrimaryKeyValues, getEntityFieldsFromSchema, getPrimaryKeyFieldsFromSchema, deriveDefaultValueForType, deriveTypeForField, deriveValidateTypeForField, getDefaultValueForField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maybeConvertToValueObject", function() { return maybeConvertToValueObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maybeConvertFromValueObjectWithAssertions", function() { return maybeConvertFromValueObjectWithAssertions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maybeConvertFromValueObject", function() { return maybeConvertFromValueObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "derivePreparedValueForField", function() { return derivePreparedValueForField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deriveRenderedValue", function() { return deriveRenderedValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRelationNameFromLink", function() { return getRelationNameFromLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBaseFieldsAndValuesForCloning", function() { return getBaseFieldsAndValuesForCloning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBaseFieldsAndValuesForPersisting", function() { return getBaseFieldsAndValuesForPersisting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPrimaryKeyValues", function() { return getPrimaryKeyValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntityFieldsFromSchema", function() { return getEntityFieldsFromSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPrimaryKeyFieldsFromSchema", function() { return getPrimaryKeyFieldsFromSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deriveDefaultValueForType", function() { return deriveDefaultValueForType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deriveTypeForField", function() { return deriveTypeForField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deriveValidateTypeForField", function() { return deriveValidateTypeForField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultValueForField", function() { return getDefaultValueForField; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/value-objects */ "@eventespresso/value-objects");
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _model_names__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model-names */ "./assets/src/data/model/model-names.js");
/* harmony import */ var _booleans__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./booleans */ "./assets/src/data/model/entity-factory/booleans.js");
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validators */ "./assets/src/data/model/entity-factory/validators.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/entity-factory/constants.js");
/**
 * External imports
 */


/**
 * Internal imports
 */






/**
 * This receives a field name, it's value and the schema and converts it to the
 * related value object IF the schema indicates it is of a type that there is a
 * known value object for.
 *
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {Object} schema
 * @return {DateTime|Money|*}  If this is not a value object, the original field
 * value is returned.
 */

var maybeConvertToValueObject = function maybeConvertToValueObject(fieldName, fieldValue, schema) {
  if (Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["isDateTimeField"])(fieldName, schema) && !_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__["ServerDateTime"].validateIsDateTime(fieldValue)) {
    return _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__["ServerDateTime"].fromISO(fieldValue);
  }

  if (Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["isMoneyField"])(fieldName, schema) && !Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["instanceOf"])(fieldValue, 'Money')) {
    return new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__["Money"](fieldValue, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__["SiteCurrency"]);
  } // if more VOs get added, then instead of adding more if else blocks
  // to this function and the ones below, all VO logic should be extracted
  // into some kind of  ValueObjectExtractor object that would hold all of
  // the necessary callbacks for managing the detection of VO fields and
  // conversion of data to and from the various VOs
  // plz see:
  // https://github.com/eventespresso/event-espresso-core/pull/637/files#r228690789


  return fieldValue;
};
/**
 * This converts the incoming value for a field to its equivalent "raw" value
 * from a value object if it is a value object.  Otherwise it just returns the
 * original incoming value.  This also asserts that if the provided field is
 * expected to be a value object that the incoming value IS a valid value object
 * and it is the expected instance of a value object.
 *
 * @param {string} fieldName
 * @param {*|Money|DateTime} fieldValue
 * @param {Object} schema
 * @return {string|number|*}  If the value is not a value object, returns the
 * original value
 */

var maybeConvertFromValueObjectWithAssertions = function maybeConvertFromValueObjectWithAssertions(fieldName, fieldValue, schema) {
  if (Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["isDateTimeField"])(fieldName, schema)) {
    _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__["ServerDateTime"].assertIsDateTime(fieldValue);
    fieldValue = fieldValue.toISO();
  } else if (Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["isMoneyField"])(fieldName, schema)) {
    _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__["Money"].assertMoney(fieldValue);
    fieldValue = fieldValue.toNumber();
  }

  return fieldValue;
};
/**
 * This converts the incoming value for a field to its equivalent "raw" value
 * if the incoming value  is a value object.  Otherwise it just returns the
 * original incoming value.
 *
 * @param {*|DateTime|Money}fieldValue
 * @return {*} The raw value for the value object or the original value.
 */

var maybeConvertFromValueObject = function maybeConvertFromValueObject(fieldValue) {
  if (_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__["ServerDateTime"].validateIsDateTime(fieldValue)) {
    fieldValue = fieldValue.toISO();
  } else if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["instanceOf"])(fieldValue, 'Money')) {
    fieldValue = fieldValue.toNumber();
  }

  return fieldValue;
};
/**
 * This derives the "prepared" value for the given field and value.
 *
 * "Prepared" means:
 *
 * - converting to a value object if this is a field that there are defined
 *   value objects for.
 * - retrieving the "raw" value from field values that have `raw` and `rendered`
 *   or `pretty` properties.
 *
 * @param {string} fieldName
 * @param {*}  fieldValue
 * @param {Object} instance
 * @return {DateTime|Money|*}  Returns the original incoming value if it does
 * not have a raw equivalent or is not a value object.
 */

var derivePreparedValueForField = function derivePreparedValueForField(fieldName, fieldValue, instance) {
  var validationType = Object(_validators__WEBPACK_IMPORTED_MODULE_5__["validateTypeForField"])(fieldName, instance);
  fieldValue = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(fieldValue) ? fieldValue[validationType] : fieldValue;
  return maybeConvertToValueObject(fieldName, fieldValue, instance.schema);
};
/**
 * This returns the "rendered" or "pretty" equivalent from a value if it exists
 * as a property on it.
 *
 * @param {*} value
 * @return {*}  The original value is returned if its not a plain object or if
 * it has no `rendered` or `pretty` property.  However, if it is a plain object
 * and has no pretty/rendered properties but DOES have a raw property, then that
 * is returned.
 */

var deriveRenderedValue = function deriveRenderedValue(value) {
  if (!Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(value)) {
    return value;
  }

  value = Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["hasPrettyProperty"])(value) ? value.pretty : value;
  value = Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["hasRenderedProperty"])(value) ? value.rendered : value;
  return Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["hasRawProperty"])(value) ? value.raw : value;
};
/**
 * Returns the name of a resource from the given `resourceLink`.
 *
 * eg. "https://api.eventespresso.com/registration" will return 'registration';

 * @param {string} resourceLink
 * @return {string} Returns the name of the resource from a provided resource
 * link.
 */

var getRelationNameFromLink = function getRelationNameFromLink(resourceLink) {
  return Object(_model_names__WEBPACK_IMPORTED_MODULE_3__["pluralModelName"])(Object(lodash__WEBPACK_IMPORTED_MODULE_0__["camelCase"])(Object(lodash__WEBPACK_IMPORTED_MODULE_0__["last"])(resourceLink.split('/'))));
};
/**
 * Returns a plain object containing the entity field names and values from the
 * provided entity instance.  The values are not prepared and match exactly what
 * is currently set on this entity.
 *
 * @param {BaseEntity} entityInstance
 *
 * @return {Object} A plain object
 */

var getBaseFieldsAndValuesForCloning = function getBaseFieldsAndValuesForCloning(entityInstance) {
  return Object.keys(entityInstance).reduce(function (fieldsAndValues, fieldName) {
    if (Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["isEntityField"])(fieldName, entityInstance.schema) && !Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["isPrimaryKeyField"])(fieldName, entityInstance.schema)) {
      fieldsAndValues[fieldName] = entityInstance[fieldName];
      return fieldsAndValues;
    }

    return fieldsAndValues;
  }, {});
};
/**
 * Returns a plain object containing the entity field name and values from the
 * provided entity instance
 * @param {Object} entityInstance
 * @param {boolean} forInsert  Whether to return the fields and values for
 * insert or for update.
 * @return {Object} A plain object
 */

var getBaseFieldsAndValuesForPersisting = function getBaseFieldsAndValuesForPersisting(entityInstance) {
  var forInsert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var iterator = forInsert ? Array.from(entityInstance.fieldsToPersistOnInsert.values()) : Object.keys(entityInstance);
  return iterator.reduce(function (fieldsAndValues, fieldName) {
    if (Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["isEntityField"])(fieldName, entityInstance.schema) && !Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["isPrimaryKeyField"])(fieldName, entityInstance.schema)) {
      fieldsAndValues[fieldName] = maybeConvertFromValueObject(entityInstance[fieldName]);
      return fieldsAndValues;
    }

    return fieldsAndValues;
  }, {});
};
/**
 * Returns the primary key(s) and values for the given entityInstance
 *
 * @param {Object} entityInstance
 * @return {Object} an array of values for the primary keys.
 */

var getPrimaryKeyValues = function getPrimaryKeyValues(entityInstance) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["pick"])(entityInstance, entityInstance.primaryKeys);
};
/**
 * This returns a plain object of entity fields from the schema for the entity
 * instance (schema for fields are extracted as well).
 *
 * @param {Object} entityInstance
 * @return {Object} A plain object with fields and schema properties that are
 * entity properties.
 */

var getEntityFieldsFromSchema = function getEntityFieldsFromSchema(entityInstance) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["pickBy"])(entityInstance.schema, function (fieldValue, fieldName) {
    return Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["isEntityField"])(fieldName, entityInstance.schema);
  });
};
/**
 * This returns a plain object of extracted primaryKey fields from the schema
 * for the entity instance.
 *
 * @param {Object} entityInstance
 * @return {Object} A plain object with fields and schema properties that
 * 					represent primary key fields.
 */

var getPrimaryKeyFieldsFromSchema = function getPrimaryKeyFieldsFromSchema(entityInstance) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["pickBy"])(entityInstance.schema, function (fieldValue, fieldName) {
    return Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["isPrimaryKeyField"])(fieldName, entityInstance.schema);
  });
};
/**
 * Derives the default value to use for a given type.
 *
 * @param {string} type
 * @return {*}  A value to use for the given type.
 */

var deriveDefaultValueForType = function deriveDefaultValueForType(type) {
  if (Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isArray"])(type)) {
    return type.indexOf('null') > -1 ? null : deriveDefaultValueForType(type[0]);
  }

  switch (type) {
    case 'string':
      return '';

    case 'number':
    case 'integer':
      return 0;

    case 'null':
    case 'object':
      return null;

    case 'boolean':
    case 'bool':
      return false;

    case 'date-time':
      return new Date().toISOString();
  }

  return null;
};
/**
 * Derives what `type` a field is from the schema.
 * It accounts for cases where the "type" of a field might be `date-time` or
 * where the type is an object and thus the `type` for the purposes of model
 * entities is defined by the `raw` property for the field.
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {*}  What type the filed is.
 */

var deriveTypeForField = function deriveTypeForField(fieldName, schema) {
  if (Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["isDateTimeField"])(fieldName, schema)) {
    return 'date-time';
  }

  if (schema[fieldName] && schema[fieldName].type) {
    if (schema[fieldName].type === 'object') {
      if (schema[fieldName].properties && Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["hasRawProperty"])(schema[fieldName].properties)) {
        return schema[fieldName].properties.raw.type ? schema[fieldName].properties.raw.type : null;
      }

      return null;
    }

    return schema[fieldName].type;
  }

  return null;
};
/**
 * This derives the validate type from the incoming field and value according
 * to the schema and incoming value.
 *
 * This accounts for the fact that entities may be constructed from the
 * following contexts:
 *
 * 1. Authed REST response (which could have both raw, rendered or pretty
 *    values in the field value).
 * 2. Non-authed REST response (which will not have a raw value, but could have
 *    a pretty or rendered value).  This is potentially problematic if the
 *    rendered or pretty value is of a different data type than the raw value.
 * 3. New entities built client side, which will be assumed to be prepared
 *    against the "raw" validate type.
 *
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {Object} schema
 * @return {Symbol}  The validate type for the field.
 */

var deriveValidateTypeForField = function deriveValidateTypeForField(fieldName, fieldValue, schema) {
  if (Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["hasRawProperty"])(fieldValue)) {
    return _constants__WEBPACK_IMPORTED_MODULE_6__["VALIDATE_TYPE"].RAW;
  }

  if (schema[fieldName] && schema[fieldName].type) {
    if (schema[fieldName].type === 'object' && Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(fieldValue)) {
      return Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["hasRenderedProperty"])(fieldValue) ? _constants__WEBPACK_IMPORTED_MODULE_6__["VALIDATE_TYPE"].RENDERED : _constants__WEBPACK_IMPORTED_MODULE_6__["VALIDATE_TYPE"].PRETTY;
    }
  }

  return _constants__WEBPACK_IMPORTED_MODULE_6__["VALIDATE_TYPE"].RAW;
};
/**
 * This gets the default value for a field from the provided schema.
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {*} The default value for the field from the schema or if not
 * present in the schema, a derived default value from the schema type.
 */

var getDefaultValueForField = function getDefaultValueForField(fieldName, schema) {
  if (schema[fieldName]) {
    return schema[fieldName].default ? schema[fieldName].default : deriveDefaultValueForType(schema[fieldName].type);
  }

  return null;
};

/***/ }),

/***/ "./assets/src/data/model/entity-factory/index.js":
/*!*******************************************************!*\
  !*** ./assets/src/data/model/entity-factory/index.js ***!
  \*******************************************************/
/*! exports provided: createEntityFactory, MODEL_PREFIXES, SAVE_STATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-entity */ "./assets/src/data/model/entity-factory/base-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createEntityFactory", function() { return _base_entity__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/entity-factory/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_PREFIXES", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["MODEL_PREFIXES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SAVE_STATE", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["SAVE_STATE"]; });




/***/ }),

/***/ "./assets/src/data/model/entity-factory/validators.js":
/*!************************************************************!*\
  !*** ./assets/src/data/model/entity-factory/validators.js ***!
  \************************************************************/
/*! exports provided: validateType, validateEnumType, isShallowValidValueForField, validateTypeForField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateType", function() { return validateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateEnumType", function() { return validateEnumType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isShallowValidValueForField", function() { return isShallowValidValueForField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateTypeForField", function() { return validateTypeForField; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _booleans__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./booleans */ "./assets/src/data/model/entity-factory/booleans.js");
/* harmony import */ var _extractors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extractors */ "./assets/src/data/model/entity-factory/extractors.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/entity-factory/constants.js");
/**
 * External imports
 */


/**
 * Internal Imports
 */




/**
 * Validates the incoming value for given type.  Types allowed are:
 *
 * - integer: checks if value is an integer.
 * - number: checks if value is classified as a Number primitive or object (this
 *   means `Infinity`, `-Infinity`, and `NaN` are considered valid for this type
 * - string
 * - object - this validates as a "plainObject", that is an object created by
 *   the Object constructor or one with a [[Prototype]] of null.
 * - boolean
 * - bool: (same as boolean check)
 * - null: value must explicitly be `null`
 *
 * Note: if the passed in type does not exist, then the value is considered
 * invalid.
 *
 * @param {string|Array} type  The type or types to check
 * @param {*} value  The value being validated
 * @return {boolean}  True means the value is valid for the given type.
 */

var validateType = function validateType(type, value) {
  var valid = false; // account for type definitions that are an array of allowed types.

  if (Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isArray"])(type)) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = type[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var singleType = _step.value;
        valid = validateType(singleType, value);

        if (valid) {
          break;
        }
      } // return right away because we've determined the validity of the type.

    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return valid;
  }

  switch (type) {
    case 'integer':
      valid = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isInteger"])(value);
      break;

    case 'number':
      valid = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isNumber"])(value);
      break;

    case 'string':
      valid = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isString"])(value);
      break;

    case 'object':
      valid = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(value);
      break;

    case 'boolean':
    case 'bool':
      valid = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isBoolean"])(value);
      break;

    case 'null':
      valid = value === null;
      break;
  }

  return valid;
};
/**
 * This validates enum type of values.
 *
 * This means that the value must be one of the provided array of enumValues as
 * well as being of the expected type.
 *
 * @param {string} type
 * @param {Array} enumValues
 * @param {*} value
 * @return {boolean}  True means this value is valid.
 */

var validateEnumType = function validateEnumType(type, enumValues, value) {
  return validateType(type, value) && Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isArray"])(enumValues) && enumValues.indexOf(value) > -1;
};
/**
 * This method does a shallow validation for the given value and field.
 *
 * "Shallow" here means that if the field schema is of type 'object', then the
 * validation only verifies that the value is an object.  The object contents
 * are not validated.
 *
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {Object} schema
 * @param {boolean} expectValueObjects  If true, then this flags the validator
 * to assume the value might be a value object and attempt to retrieve the raw
 * value from that value object for validation against the expected type in the
 * schema for that field.
 * @return {boolean}  True means the value is valid.
 * @throws TypeError
 * @throws InvalidDateTime
 */

var isShallowValidValueForField = function isShallowValidValueForField(fieldName, fieldValue, schema) {
  var expectValueObjects = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  // if field is a primary Key field then we override the validation so it can
  // be either string or number
  if (Object(_booleans__WEBPACK_IMPORTED_MODULE_2__["isPrimaryKeyField"])(fieldName, schema)) {
    return validateType('string', fieldValue) || validateType('number', fieldValue);
  }

  var isEnum = Object(_booleans__WEBPACK_IMPORTED_MODULE_2__["isEnumField"])(fieldName, schema);
  var isValueObject = Object(_booleans__WEBPACK_IMPORTED_MODULE_2__["isValueObjectField"])(fieldName, schema);
  fieldValue = expectValueObjects && isValueObject ? Object(_extractors__WEBPACK_IMPORTED_MODULE_3__["maybeConvertFromValueObjectWithAssertions"])(fieldName, fieldValue, schema) : fieldValue;
  fieldValue = expectValueObjects && schema[fieldName].type === 'object' && isValueObject ? {
    raw: fieldValue
  } : fieldValue;
  var isValid = isEnum ? validateEnumType(schema[fieldName].type, schema[fieldName].enum, fieldValue) : validateType(schema[fieldName].type, fieldValue); // if isEnum and not valid, then lets bail with error

  if (isEnum && !isValid) {
    throw new TypeError(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["sprintf"])('The given "%s" fieldName is not valid for the defined schema.  It must be a "%s" and it must be one of "%s". The fieldValue given was "%s"', fieldName, schema[fieldName].enum.join(), fieldValue));
  }

  return isValid;
};
/**
 * Returns what is set as the validateType for the given field and instance.
 *
 * @param {string} fieldName
 * @param {Object} instance
 * @return {string} The validation type for the given field and instance.
 */

var validateTypeForField = function validateTypeForField(fieldName, instance) {
  return instance[_constants__WEBPACK_IMPORTED_MODULE_4__["PRIVATE_PROPERTIES"].VALIDATE_TYPES][fieldName] ? instance[_constants__WEBPACK_IMPORTED_MODULE_4__["PRIVATE_PROPERTIES"].VALIDATE_TYPES][fieldName] : _constants__WEBPACK_IMPORTED_MODULE_4__["VALIDATE_TYPE"].RAW;
};

/***/ }),

/***/ "./assets/src/data/model/event/constants.js":
/*!**************************************************!*\
  !*** ./assets/src/data/model/event/constants.js ***!
  \**************************************************/
/*! exports provided: MODEL_NAME, EVENT_STATUS_ID, EVENT_STATUS_IDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return MODEL_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_STATUS_ID", function() { return EVENT_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_STATUS_IDS", function() { return EVENT_STATUS_IDS; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

var MODEL_NAME = 'event';
var EVENT_STATUS_ID = {
  SOLD_OUT: 'sold_out',
  POSTPONED: 'postponed',
  CANCELLED: 'cancelled'
};
var EVENT_STATUS_IDS = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["values"])(EVENT_STATUS_ID);

/***/ }),

/***/ "./assets/src/data/model/event/index.js":
/*!**********************************************!*\
  !*** ./assets/src/data/model/event/index.js ***!
  \**********************************************/
/*! exports provided: MODEL_NAME, EVENT_STATUS_ID, EVENT_STATUS_IDS, nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/event/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAME"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EVENT_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EVENT_STATUS_IDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_STATUS_IDS"]; });

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
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_1__);
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


var nowDateAndTime = moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()();
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
      showExpired = _ref$showExpired === void 0 ? false : _ref$showExpired,
      categorySlug = _ref.categorySlug,
      _ref$month = _ref.month,
      month = _ref$month === void 0 ? 'none' : _ref$month;
  var where = [];

  if (!showExpired) {
    where.push('where[Datetime.DTT_EVT_end**expired][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN"] + '&where[Datetime.DTT_EVT_end**expired][]=' + nowDateAndTime.local().format());
  }

  if (categorySlug) {
    where.push('where[Term_Relationship.Term_Taxonomy.Term.slug]=' + categorySlug);
  }

  if (month && month !== 'none') {
    where.push('where[Datetime.DTT_EVT_start][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN_AND_EQUAL"] + '&where[Datetime.DTT_EVT_start][]=' + moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()().month(month).startOf('month').local().format());
    where.push('where[Datetime.DTT_EVT_end][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["LESS_THAN_AND_EQUAL"] + '&where[Datetime.DTT_EVT_end][]=' + moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()().month(month).endOf('month').local().format());
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
  queryData = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
  return Object(_base__WEBPACK_IMPORTED_MODULE_4__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/index.js":
/*!****************************************!*\
  !*** ./assets/src/data/model/index.js ***!
  \****************************************/
/*! exports provided: assertEntityHasKey, assertImmutableObjectHasPath, assertIsArray, assertIsNotEmpty, assertIsMap, QUERY_ORDER_ASC, QUERY_ORDER_DESC, ALLOWED_ORDER_VALUES, GREATER_THAN, LESS_THAN, GREATER_THAN_AND_EQUAL, LESS_THAN_AND_EQUAL, getQueryString, DEFAULT_LISTS_STATE, DEFAULT_CORE_STATE, DEFAULT_SCHEMA_STATE, baseRestRoute, endpoints, getEndpoint, applyQueryString, stripBaseRouteFromUrl, createEntityFactory, MODEL_PREFIXES, SAVE_STATE, primaryKeys, valuesForCombinedPrimaryKeys, valueForPrimaryKey, getPrimaryKey, getPrimaryKeyQueryString, getEntityPrimaryKeyValues, keyEntitiesByPrimaryKeyValue, createAndKeyEntitiesByPrimaryKeyValue, MODEL_NAMES, pluralModelName, singularModelName, modelNameForQueryString, attendeeModel, checkInModel, dateTimeModel, eventModel, priceTypeModel, registrationModel, statusModel, ticketModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assertions */ "./assets/src/data/model/assertions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertEntityHasKey", function() { return _assertions__WEBPACK_IMPORTED_MODULE_0__["assertEntityHasKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertImmutableObjectHasPath", function() { return _assertions__WEBPACK_IMPORTED_MODULE_0__["assertImmutableObjectHasPath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertIsArray", function() { return _assertions__WEBPACK_IMPORTED_MODULE_0__["assertIsArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertIsNotEmpty", function() { return _assertions__WEBPACK_IMPORTED_MODULE_0__["assertIsNotEmpty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertIsMap", function() { return _assertions__WEBPACK_IMPORTED_MODULE_0__["assertIsMap"]; });

/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./assets/src/data/model/base.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_ASC", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["QUERY_ORDER_ASC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_DESC", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["QUERY_ORDER_DESC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALLOWED_ORDER_VALUES", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["ALLOWED_ORDER_VALUES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GREATER_THAN", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["GREATER_THAN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LESS_THAN", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["LESS_THAN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GREATER_THAN_AND_EQUAL", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["GREATER_THAN_AND_EQUAL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LESS_THAN_AND_EQUAL", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["LESS_THAN_AND_EQUAL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });

/* harmony import */ var _default_model_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./default-model-state */ "./assets/src/data/model/default-model-state.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LISTS_STATE", function() { return _default_model_state__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_LISTS_STATE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CORE_STATE", function() { return _default_model_state__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_CORE_STATE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SCHEMA_STATE", function() { return _default_model_state__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_SCHEMA_STATE"]; });

/* harmony import */ var _endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./endpoints */ "./assets/src/data/model/endpoints.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "baseRestRoute", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_3__["baseRestRoute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "endpoints", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_3__["endpoints"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getEndpoint", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_3__["getEndpoint"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyQueryString", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_3__["applyQueryString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stripBaseRouteFromUrl", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_3__["stripBaseRouteFromUrl"]; });

/* harmony import */ var _entity_factory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entity-factory */ "./assets/src/data/model/entity-factory/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createEntityFactory", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_4__["createEntityFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_PREFIXES", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_4__["MODEL_PREFIXES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SAVE_STATE", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_4__["SAVE_STATE"]; });

/* harmony import */ var _primary_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./primary-keys */ "./assets/src/data/model/primary-keys.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "primaryKeys", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["primaryKeys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "valuesForCombinedPrimaryKeys", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["valuesForCombinedPrimaryKeys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "valueForPrimaryKey", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["valueForPrimaryKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPrimaryKey", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["getPrimaryKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPrimaryKeyQueryString", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["getPrimaryKeyQueryString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getEntityPrimaryKeyValues", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["getEntityPrimaryKeyValues"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keyEntitiesByPrimaryKeyValue", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["keyEntitiesByPrimaryKeyValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAndKeyEntitiesByPrimaryKeyValue", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["createAndKeyEntitiesByPrimaryKeyValue"]; });

/* harmony import */ var _model_names__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./model-names */ "./assets/src/data/model/model-names.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return _model_names__WEBPACK_IMPORTED_MODULE_6__["MODEL_NAMES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pluralModelName", function() { return _model_names__WEBPACK_IMPORTED_MODULE_6__["pluralModelName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "singularModelName", function() { return _model_names__WEBPACK_IMPORTED_MODULE_6__["singularModelName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "modelNameForQueryString", function() { return _model_names__WEBPACK_IMPORTED_MODULE_6__["modelNameForQueryString"]; });

/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./models */ "./assets/src/data/model/models.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "attendeeModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["attendeeModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkInModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["checkInModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateTimeModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["dateTimeModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["eventModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "priceTypeModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["priceTypeModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registrationModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["registrationModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "statusModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["statusModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ticketModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["ticketModel"]; });










/***/ }),

/***/ "./assets/src/data/model/model-names.js":
/*!**********************************************!*\
  !*** ./assets/src/data/model/model-names.js ***!
  \**********************************************/
/*! exports provided: MODEL_NAMES, pluralModelName, singularModelName, modelNameForQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return MODEL_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pluralModelName", function() { return pluralModelName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "singularModelName", function() { return singularModelName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modelNameForQueryString", function() { return modelNameForQueryString; });
/* harmony import */ var _primary_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./primary-keys.js */ "./assets/src/data/model/primary-keys.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pluralize */ "./node_modules/pluralize/pluralize.js");
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pluralize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! memize */ "./node_modules/memize/index.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(memize__WEBPACK_IMPORTED_MODULE_3__);
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
/**
 * Used to normalize the plural form of a given model name.
 * @param {string} modelName
 * @return {string}  Ensures the given modelName is its plural form.
 */

var pluralModelName = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (modelName) {
  return pluralize__WEBPACK_IMPORTED_MODULE_2___default()(modelName);
});
/**
 * Used to normalize the singular form of a given model name.
 * @param {string} modelName
 * @return {string} Ensures the given modelName is in its singular form.
 */

var singularModelName = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (modelName) {
  return pluralize__WEBPACK_IMPORTED_MODULE_2___default.a.singular(modelName);
});
/**
 * Provides the capitalized snakecase format for the given model name typically
 * used in query strings.
 *
 * Example:
 *
 * modelNameForQueryString( 'message_template_group' );
 * // Message_Template_Group
 *
 * @param {string} modelName
 * @return {string} the formatted string.
 */

var modelNameForQueryString = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (modelName) {
  modelName = singularModelName(modelName);
  modelName = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["startCase"])(modelName);
  return modelName.replace(/\s/g, '_');
});

/***/ }),

/***/ "./assets/src/data/model/models.js":
/*!*****************************************!*\
  !*** ./assets/src/data/model/models.js ***!
  \*****************************************/
/*! exports provided: attendeeModel, checkInModel, dateTimeModel, eventModel, priceTypeModel, registrationModel, statusModel, ticketModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _attendee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attendee */ "./assets/src/data/model/attendee/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "attendeeModel", function() { return _attendee__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _checkin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkin */ "./assets/src/data/model/checkin/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "checkInModel", function() { return _checkin__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datetime */ "./assets/src/data/model/datetime/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "dateTimeModel", function() { return _datetime__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event */ "./assets/src/data/model/event/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "eventModel", function() { return _event__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _price_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./price-type */ "./assets/src/data/model/price-type/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "priceTypeModel", function() { return _price_type__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _registration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./registration */ "./assets/src/data/model/registration/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "registrationModel", function() { return _registration__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./status */ "./assets/src/data/model/status/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "statusModel", function() { return _status__WEBPACK_IMPORTED_MODULE_6__; });
/* harmony import */ var _ticket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ticket */ "./assets/src/data/model/ticket/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ticketModel", function() { return _ticket__WEBPACK_IMPORTED_MODULE_7__; });










/***/ }),

/***/ "./assets/src/data/model/price-type/constants.js":
/*!*******************************************************!*\
  !*** ./assets/src/data/model/price-type/constants.js ***!
  \*******************************************************/
/*! exports provided: MODEL_NAME, BASE_PRICE_TYPES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return MODEL_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BASE_PRICE_TYPES", function() { return BASE_PRICE_TYPES; });
var MODEL_NAME = 'price_type';
var BASE_PRICE_TYPES = {
  BASE_PRICE: 1,
  DISCOUNT: 2,
  SURCHARGE: 3,
  TAX: 4
};

/***/ }),

/***/ "./assets/src/data/model/price-type/index.js":
/*!***************************************************!*\
  !*** ./assets/src/data/model/price-type/index.js ***!
  \***************************************************/
/*! exports provided: MODEL_NAME, BASE_PRICE_TYPES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/price-type/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAME"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BASE_PRICE_TYPES", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["BASE_PRICE_TYPES"]; });



/***/ }),

/***/ "./assets/src/data/model/primary-keys.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/primary-keys.js ***!
  \***********************************************/
/*! exports provided: primaryKeys, valuesForCombinedPrimaryKeys, valueForPrimaryKey, getPrimaryKey, getPrimaryKeyQueryString, getEntityPrimaryKeyValues, keyEntitiesByPrimaryKeyValue, createAndKeyEntitiesByPrimaryKeyValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "primaryKeys", function() { return primaryKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valuesForCombinedPrimaryKeys", function() { return valuesForCombinedPrimaryKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valueForPrimaryKey", function() { return valueForPrimaryKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPrimaryKey", function() { return getPrimaryKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPrimaryKeyQueryString", function() { return getPrimaryKeyQueryString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntityPrimaryKeyValues", function() { return getEntityPrimaryKeyValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyEntitiesByPrimaryKeyValue", function() { return keyEntitiesByPrimaryKeyValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAndKeyEntitiesByPrimaryKeyValue", function() { return createAndKeyEntitiesByPrimaryKeyValue; });
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! memize */ "./node_modules/memize/index.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(memize__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assertions */ "./assets/src/data/model/assertions.js");
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
    primaryKeys = _data$paths$primary_k === void 0 ? {} : _data$paths$primary_k;
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
  Object(_assertions__WEBPACK_IMPORTED_MODULE_4__["assertIsArray"])(keys);
  var primaryKey = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["reduce"])(keys, function (result, key) {
    Object(_assertions__WEBPACK_IMPORTED_MODULE_4__["assertEntityHasKey"])(key, entity);
    return entity[result] + ':' + entity[key];
  });
  return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["trimEnd"])(primaryKey, ':');
});
/**
 * Returns the value for the given key from the provided entity.
 * This function would be used for models that have only one primary key.
 *
 * @type {memoized}
 * @return { function } The value for the key in the provided entity.
 * @throws { Exception }
 */

var valueForPrimaryKey = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (key, entity) {
  Object(_assertions__WEBPACK_IMPORTED_MODULE_4__["assertEntityHasKey"])(key, entity);
  return entity[key];
});
/**
 * Returns the primary key (or combined primary keys) from the available data.
 *
 * @type {memoized}
 * @return { function(string) }
 * @throws { Exception }
 */

var getPrimaryKey = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (modelName) {
  Object(_assertions__WEBPACK_IMPORTED_MODULE_4__["assertEntityHasKey"])(modelName, primaryKeys);
  return primaryKeys[modelName];
});
/**
 * Returns a query string for getting the entities belonging to a model for the
 * given primary key values
 *
 * @type {memoized}
 */

var getPrimaryKeyQueryString = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (modelName) {
  var keyValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var primaryKey = getPrimaryKey(modelName);
  return "[".concat(primaryKey, "][IN]=") + keyValues.join();
});
/**
 * Returns the values for the primary keys from the provided entity.
 *
 * @type {memoized}
 * @return { function }  If the model has only one primary key then the value will
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
 * @param {string} modelName
 * @param {Array} entities
 * @return {Map}  A collection indexed by the primary key values for each entity.
 * @throws {Exception}
 */

var keyEntitiesByPrimaryKeyValue = function keyEntitiesByPrimaryKeyValue(modelName) {
  var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  Object(_assertions__WEBPACK_IMPORTED_MODULE_4__["assertIsNotEmpty"])(entities, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('The provided array of entities must not be empty', 'event_espresso'));
  Object(_assertions__WEBPACK_IMPORTED_MODULE_4__["assertIsArray"])(entities);
  var mappedEntities = new Map();
  entities.forEach(function (entity) {
    mappedEntities.set(getEntityPrimaryKeyValues(modelName, entity), entity);
  });
  return mappedEntities;
};
/**
 * Creates an array of entity instances using the given factory and array
 * of entity values.
 *
 * @param {Object} factory
 * @param {Map} entities
 * @return {Map}  An array of entity instances indexed by
 * their primary key value
 */

var createAndKeyEntitiesByPrimaryKeyValue = function createAndKeyEntitiesByPrimaryKeyValue(factory, entities) {
  Object(_assertions__WEBPACK_IMPORTED_MODULE_4__["assertIsMap"])(entities, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('The provided object of entities must be a Map object', 'event_espresso'));
  entities.forEach(function (entity, entityId) {
    entities.set(entityId, factory.fromExisting(entity));
  });
  return entities;
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
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
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
      forEventId = _ref$forEventId === void 0 ? 0 : _ref$forEventId,
      _ref$forAttendeeId = _ref.forAttendeeId,
      forAttendeeId = _ref$forAttendeeId === void 0 ? 0 : _ref$forAttendeeId,
      _ref$forTransactionId = _ref.forTransactionId,
      forTransactionId = _ref$forTransactionId === void 0 ? 0 : _ref$forTransactionId,
      _ref$forTicketId = _ref.forTicketId,
      forTicketId = _ref$forTicketId === void 0 ? 0 : _ref$forTicketId,
      _ref$forStatusId = _ref.forStatusId,
      forStatusId = _ref$forStatusId === void 0 ? '' : _ref$forStatusId;
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
  queryData = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
  return Object(_base__WEBPACK_IMPORTED_MODULE_3__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/status/constants.js":
/*!***************************************************!*\
  !*** ./assets/src/data/model/status/constants.js ***!
  \***************************************************/
/*! exports provided: MODEL_NAME, STATUS_TYPE_EMAIL, STATUS_TYPE_EVENT, STATUS_TYPE_MESSAGE, STATUS_TYPE_PAYMENT, STATUS_TYPE_REGISTRATION, STATUS_TYPE_TRANSACTION, EMAIL_STATUS_ID, EVENT_STATUS_ID, MESSAGE_STATUS_ID, PAYMENT_STATUS_ID, REGISTRATION_STATUS_ID, TRANSACTION_STATUS_ID, CPT_STATUS_ID, UNKNOWN_STATUS_ID, ALL_STATUS_IDS */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPT_STATUS_ID", function() { return CPT_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNKNOWN_STATUS_ID", function() { return UNKNOWN_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_STATUS_IDS", function() { return ALL_STATUS_IDS; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


/**
 * External imports
 */

var MODEL_NAME = 'status'; // types

var STATUS_TYPE_EMAIL = 'email';
var STATUS_TYPE_EVENT = 'event';
var STATUS_TYPE_MESSAGE = 'message';
var STATUS_TYPE_PAYMENT = 'payment';
var STATUS_TYPE_REGISTRATION = 'registration';
var STATUS_TYPE_TRANSACTION = 'transaction'; // email

var EMAIL_STATUS_ID = {
  DRAFT: 'EDR',
  SENT: 'ESN',
  EXPIRED: 'EXP'
}; // event

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
}; // message

var MESSAGE_STATUS_ID = {
  DEBUG: 'MDO',
  EXECUTING: 'MEX',
  FAIL: 'MFL',
  INCOMPLETE: 'MIC',
  IDLE: 'MID',
  RESEND: 'MRS',
  RETRY: 'MRT',
  SENT: 'MSN'
}; // payment

var PAYMENT_STATUS_ID = {
  APPROVED: 'PAP',
  CANCELLED: 'PCN',
  DECLINED: 'PDC',
  FAILED: 'PFL',
  PENDING: 'PPN'
}; // registration

var REGISTRATION_STATUS_ID = {
  APPROVED: 'RAP',
  CANCELLED: 'RCN',
  DECLINED: 'RDC',
  INCOMPLETE: 'RIC',
  NOT_APPROVED: 'RNA',
  PENDING_PAYMENT: 'RPP',
  WAIT_LIST: 'RWL'
}; // transaction

var TRANSACTION_STATUS_ID = {
  ABANDONED: 'TAB',
  COMPLETE: 'TCM',
  FAILED: 'TFL',
  INCOMPLETE: 'TIN',
  OVERPAID: 'TOP'
}; // the following are not in the status database but are kept here for
// convenience
// custom post types

var CPT_STATUS_ID = {
  PUBLISH: 'publish',
  FUTURE: 'future',
  DRAFT: 'draft',
  PENDING: 'pending',
  PRIVATE: 'private',
  TRASHED: 'trash'
};
var UNKNOWN_STATUS_ID = 'unknown';
var ALL_STATUS_IDS = [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(EMAIL_STATUS_ID)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(EVENT_STATUS_ID)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(MESSAGE_STATUS_ID)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(PAYMENT_STATUS_ID)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(REGISTRATION_STATUS_ID)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(TRANSACTION_STATUS_ID)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(CPT_STATUS_ID)), [UNKNOWN_STATUS_ID]);

/***/ }),

/***/ "./assets/src/data/model/status/helpers.js":
/*!*************************************************!*\
  !*** ./assets/src/data/model/status/helpers.js ***!
  \*************************************************/
/*! exports provided: prettyStatus, prettyStatuses */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prettyStatus", function() { return prettyStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prettyStatuses", function() { return prettyStatuses; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/status/constants.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../event */ "./assets/src/data/model/event/index.js");
/* harmony import */ var _ticket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ticket */ "./assets/src/data/model/ticket/index.js");
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../datetime */ "./assets/src/data/model/datetime/index.js");
/* harmony import */ var _checkin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../checkin */ "./assets/src/data/model/checkin/index.js");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @eventespresso/value-objects */ "@eventespresso/value-objects");
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);



var _STATUS_TRANSLATION_M, _STATUS_TRANSLATION_M2, _STATUS_TRANSLATION_M3, _STATUS_TRANSLATION_M4, _STATUS_TRANSLATION_M5, _STATUS_TRANSLATION_M6, _STATUS_TRANSLATION_M7, _STATUS_TRANSLATION_M8, _STATUS_TRANSLATION_M9;

/**
 * Internal imports
 */





/**
 * External imports
 */




/**
 * Translation map for Registration statuses
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_REGISTRATION = (_STATUS_TRANSLATION_M = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M, _constants__WEBPACK_IMPORTED_MODULE_2__["REGISTRATION_STATUS_ID"].PENDING_PAYMENT, new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"](Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('pending payment', 'event_espresso'), Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('pending payments', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M, _constants__WEBPACK_IMPORTED_MODULE_2__["REGISTRATION_STATUS_ID"].APPROVED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('approved', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M, _constants__WEBPACK_IMPORTED_MODULE_2__["REGISTRATION_STATUS_ID"].NOT_APPROVED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('not approved', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M, _constants__WEBPACK_IMPORTED_MODULE_2__["REGISTRATION_STATUS_ID"].CANCELLED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('cancelled', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M, _constants__WEBPACK_IMPORTED_MODULE_2__["REGISTRATION_STATUS_ID"].INCOMPLETE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('incomplete', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M, _constants__WEBPACK_IMPORTED_MODULE_2__["REGISTRATION_STATUS_ID"].DECLINED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('declined', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M, _constants__WEBPACK_IMPORTED_MODULE_2__["REGISTRATION_STATUS_ID"].WAIT_LIST, new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"](Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('wait list', 'event_espresso'), Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('wait lists', 'event_espresso'))), _STATUS_TRANSLATION_M);
/**
 * Translation map for Transaction statuses
 * @type {{}}
 *
 */

var STATUS_TRANSLATION_MAP_TRANSACTION = (_STATUS_TRANSLATION_M2 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M2, _constants__WEBPACK_IMPORTED_MODULE_2__["TRANSACTION_STATUS_ID"].OVERPAID, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('overpaid', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M2, _constants__WEBPACK_IMPORTED_MODULE_2__["TRANSACTION_STATUS_ID"].COMPLETE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('complete', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M2, _constants__WEBPACK_IMPORTED_MODULE_2__["TRANSACTION_STATUS_ID"].INCOMPLETE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('incomplete', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M2, _constants__WEBPACK_IMPORTED_MODULE_2__["TRANSACTION_STATUS_ID"].FAILED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('failed', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M2, _constants__WEBPACK_IMPORTED_MODULE_2__["TRANSACTION_STATUS_ID"].ABANDONED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('abandoned', 'event_espresso'))), _STATUS_TRANSLATION_M2);
/**
 * Translation map for payment statuses
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_PAYMENT = (_STATUS_TRANSLATION_M3 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M3, _constants__WEBPACK_IMPORTED_MODULE_2__["PAYMENT_STATUS_ID"].APPROVED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('accepted', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M3, _constants__WEBPACK_IMPORTED_MODULE_2__["PAYMENT_STATUS_ID"].PENDING, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('pending', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M3, _constants__WEBPACK_IMPORTED_MODULE_2__["PAYMENT_STATUS_ID"].CANCELLED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('cancelled', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M3, _constants__WEBPACK_IMPORTED_MODULE_2__["PAYMENT_STATUS_ID"].DECLINED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('declined', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M3, _constants__WEBPACK_IMPORTED_MODULE_2__["PAYMENT_STATUS_ID"].FAILED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('failed', 'event_espresso'))), _STATUS_TRANSLATION_M3);
/**
 * Translation map for Message statuses
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_MESSAGE = (_STATUS_TRANSLATION_M4 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_2__["MESSAGE_STATUS_ID"].SENT, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('sent', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_2__["MESSAGE_STATUS_ID"].IDLE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('queued for sending', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_2__["MESSAGE_STATUS_ID"].FAIL, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('failed', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_2__["MESSAGE_STATUS_ID"].DEBUG, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('debug only', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_2__["MESSAGE_STATUS_ID"].EXECUTING, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('messenger is executing', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_2__["MESSAGE_STATUS_ID"].RESEND, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('queued for resending', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_2__["MESSAGE_STATUS_ID"].INCOMPLETE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('queued for generating', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_2__["MESSAGE_STATUS_ID"].RETRY, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('failed sending, can be retried', 'event_espresso'))), _STATUS_TRANSLATION_M4);
/**
 * Translation map for CPT statuses
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_CPT = (_STATUS_TRANSLATION_M5 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M5, _constants__WEBPACK_IMPORTED_MODULE_2__["CPT_STATUS_ID"].PUBLISH, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('published', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M5, _constants__WEBPACK_IMPORTED_MODULE_2__["CPT_STATUS_ID"].FUTURE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('scheduled', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M5, _constants__WEBPACK_IMPORTED_MODULE_2__["CPT_STATUS_ID"].DRAFT, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('draft', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M5, _constants__WEBPACK_IMPORTED_MODULE_2__["CPT_STATUS_ID"].PENDING, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('pending', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M5, _constants__WEBPACK_IMPORTED_MODULE_2__["CPT_STATUS_ID"].PRIVATE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('private', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M5, _constants__WEBPACK_IMPORTED_MODULE_2__["CPT_STATUS_ID"].TRASHED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('trashed', 'event_espresso'))), _STATUS_TRANSLATION_M5); // the following status maps are for model statuses that are not saved in the
// status table but for convenience have their labels retrievable via here.

/**
 * Translation map for Event Statuses
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_EVENT = (_STATUS_TRANSLATION_M6 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M6, _event__WEBPACK_IMPORTED_MODULE_3__["EVENT_STATUS_ID"].SOLD_OUT, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('sold out', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M6, _event__WEBPACK_IMPORTED_MODULE_3__["EVENT_STATUS_ID"].POSTPONED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('postponed', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M6, _event__WEBPACK_IMPORTED_MODULE_3__["EVENT_STATUS_ID"].CANCELLED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('cancelled', 'event_espresso'))), _STATUS_TRANSLATION_M6);
/**
 * Translation map for Ticket statuses
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_TICKET = (_STATUS_TRANSLATION_M7 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M7, _ticket__WEBPACK_IMPORTED_MODULE_4__["TICKET_STATUS_ID"].ARCHIVED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('archived', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M7, _ticket__WEBPACK_IMPORTED_MODULE_4__["TICKET_STATUS_ID"].EXPIRED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('expired', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M7, _ticket__WEBPACK_IMPORTED_MODULE_4__["TICKET_STATUS_ID"].SOLD_OUT, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('sold out', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M7, _ticket__WEBPACK_IMPORTED_MODULE_4__["TICKET_STATUS_ID"].PENDING, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('upcoming', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M7, _ticket__WEBPACK_IMPORTED_MODULE_4__["TICKET_STATUS_ID"].ONSALE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('on sale', 'event_espresso'))), _STATUS_TRANSLATION_M7);
/**
 * Translation map for datetime statuses
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_DATETIME = (_STATUS_TRANSLATION_M8 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M8, _datetime__WEBPACK_IMPORTED_MODULE_5__["DATETIME_STATUS_ID"].CANCELLED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('cancelled', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M8, _datetime__WEBPACK_IMPORTED_MODULE_5__["DATETIME_STATUS_ID"].SOLD_OUT, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('sold out', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M8, _datetime__WEBPACK_IMPORTED_MODULE_5__["DATETIME_STATUS_ID"].EXPIRED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('expired', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M8, _datetime__WEBPACK_IMPORTED_MODULE_5__["DATETIME_STATUS_ID"].INACTIVE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('inactive', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M8, _datetime__WEBPACK_IMPORTED_MODULE_5__["DATETIME_STATUS_ID"].UPCOMING, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('upcoming', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M8, _datetime__WEBPACK_IMPORTED_MODULE_5__["DATETIME_STATUS_ID"].ACTIVE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('active', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M8, _datetime__WEBPACK_IMPORTED_MODULE_5__["DATETIME_STATUS_ID"].POSTPONED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('postponed', 'event_espresso'))), _STATUS_TRANSLATION_M8);
/**
 * Translation map for checkin statuses
 *
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_CHECKIN = (_STATUS_TRANSLATION_M9 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M9, _checkin__WEBPACK_IMPORTED_MODULE_6__["CHECKIN_STATUS_ID"].STATUS_CHECKED_IN, new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"](Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('check-in', 'event_espresso'), Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('check-ins', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M9, _checkin__WEBPACK_IMPORTED_MODULE_6__["CHECKIN_STATUS_ID"].STATUS_CHECKED_OUT, new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"](Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('check-out', 'event_espresso'), Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('check-outs', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_STATUS_TRANSLATION_M9, _checkin__WEBPACK_IMPORTED_MODULE_6__["CHECKIN_STATUS_ID"].STATUS_CHECKED_NEVER, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('never checked in', 'event_espresso'))), _STATUS_TRANSLATION_M9);
/**
 * Combined translation map for all statuses.
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_ALL = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, STATUS_TRANSLATION_MAP_REGISTRATION, STATUS_TRANSLATION_MAP_TRANSACTION, STATUS_TRANSLATION_MAP_PAYMENT, STATUS_TRANSLATION_MAP_MESSAGE, STATUS_TRANSLATION_MAP_CPT, STATUS_TRANSLATION_MAP_EVENT, STATUS_TRANSLATION_MAP_TICKET, STATUS_TRANSLATION_MAP_DATETIME, STATUS_TRANSLATION_MAP_CHECKIN, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, _constants__WEBPACK_IMPORTED_MODULE_2__["UNKNOWN_STATUS_ID"], _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_7__["__"])('unknown', 'event_espresso'))));
/**
 * Returns the pretty status label string for the given arguments.
 *
 * @param {string} statusCode
 * @param {boolean} singular  Whether to return the singular or plural label
 * value
 * @param {(sentence|lower|upper)} schema
 * @return {string} Returns the mapped pretty label for the given status code or
 * a formatted 'unkown' string if there is no mapped value for the given code.
 */


var prettyStatus = function prettyStatus(statusCode) {
  var singular = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var schema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].FORMAT_SENTENCE_CASE;
  return STATUS_TRANSLATION_MAP_ALL[statusCode] ? STATUS_TRANSLATION_MAP_ALL[statusCode].asFormatted(singular, schema) : STATUS_TRANSLATION_MAP_ALL[_constants__WEBPACK_IMPORTED_MODULE_2__["UNKNOWN_STATUS_ID"]].asFormatted(singular, schema);
};
/**
 * Expects an array of status codes and returns an object indexed by codes with
 * values being the formatted pretty labels for each code according to the
 * provided arguments
 *
 * @param {Array} statusCodes
 * @param {boolean} singular
 * @param {(sentence|lower|upper)} schema
 * @return {Object} An object mapping status code to pretty label.
 */

var prettyStatuses = function prettyStatuses(statusCodes) {
  var singular = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var schema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_8__["Label"].FORMAT_SENTENCE_CASE;

  if (!Object(lodash__WEBPACK_IMPORTED_MODULE_9__["isArray"])(statusCodes)) {
    throw new TypeError('Expect incoming statusCodes argument' + ' to be an array');
  }

  var mappedStatuses = {};
  statusCodes.forEach(function (statusCode) {
    mappedStatuses[statusCode] = prettyStatus(statusCode, singular, schema);
  });
  return mappedStatuses;
};

/***/ }),

/***/ "./assets/src/data/model/status/index.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/status/index.js ***!
  \***********************************************/
/*! exports provided: MODEL_NAME, STATUS_TYPE_EMAIL, STATUS_TYPE_EVENT, STATUS_TYPE_MESSAGE, STATUS_TYPE_PAYMENT, STATUS_TYPE_REGISTRATION, STATUS_TYPE_TRANSACTION, EMAIL_STATUS_ID, EVENT_STATUS_ID, MESSAGE_STATUS_ID, PAYMENT_STATUS_ID, REGISTRATION_STATUS_ID, TRANSACTION_STATUS_ID, CPT_STATUS_ID, UNKNOWN_STATUS_ID, ALL_STATUS_IDS, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString, prettyStatus, prettyStatuses */
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

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CPT_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["CPT_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UNKNOWN_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["UNKNOWN_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALL_STATUS_IDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["ALL_STATUS_IDS"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/status/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });

/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./assets/src/data/model/status/helpers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "prettyStatus", function() { return _helpers__WEBPACK_IMPORTED_MODULE_2__["prettyStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "prettyStatuses", function() { return _helpers__WEBPACK_IMPORTED_MODULE_2__["prettyStatuses"]; });





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
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
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
  queryData = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
  return Object(_base__WEBPACK_IMPORTED_MODULE_3__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/ticket/constants.js":
/*!***************************************************!*\
  !*** ./assets/src/data/model/ticket/constants.js ***!
  \***************************************************/
/*! exports provided: MODEL_NAME, TICKET_STATUS_ID, TICKET_STATUS_IDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return MODEL_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TICKET_STATUS_ID", function() { return TICKET_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TICKET_STATUS_IDS", function() { return TICKET_STATUS_IDS; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

var MODEL_NAME = 'ticket';
var TICKET_STATUS_ID = {
  SOLD_OUT: 'TKS',
  EXPIRED: 'TKE',
  ARCHIVED: 'TKA',
  PENDING: 'TKP',
  ONSALE: 'TKO'
};
var TICKET_STATUS_IDS = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["values"])(TICKET_STATUS_ID);

/***/ }),

/***/ "./assets/src/data/model/ticket/index.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/ticket/index.js ***!
  \***********************************************/
/*! exports provided: MODEL_NAME, TICKET_STATUS_ID, TICKET_STATUS_IDS, nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString, isOnSale, isExpired, isSoldOut, isPending, isArchived, status, statusColorClass, getTicketStatusTextLabel, getBackgroundColorClass, getBorderColorClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/ticket/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAME"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TICKET_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["TICKET_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TICKET_STATUS_IDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["TICKET_STATUS_IDS"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/ticket/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nowDateAndTime", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["nowDateAndTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });

/* harmony import */ var _status_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./status-helper */ "./assets/src/data/model/ticket/status-helper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isOnSale", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["isOnSale"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isExpired", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["isExpired"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSoldOut", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["isSoldOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPending", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["isPending"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isArchived", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["isArchived"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "status", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["status"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "statusColorClass", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["statusColorClass"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTicketStatusTextLabel", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["getTicketStatusTextLabel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getBackgroundColorClass", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["getBackgroundColorClass"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getBorderColorClass", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["getBorderColorClass"]; });





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
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");


/**
 * External imports
 */




var nowDateAndTime = moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()();
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
      forEventId = _ref$forEventId === void 0 ? 0 : _ref$forEventId,
      _ref$forDatetimeId = _ref.forDatetimeId,
      forDatetimeId = _ref$forDatetimeId === void 0 ? 0 : _ref$forDatetimeId,
      _ref$showExpired = _ref.showExpired,
      showExpired = _ref$showExpired === void 0 ? false : _ref$showExpired,
      _ref$month = _ref.month,
      month = _ref$month === void 0 ? 'none' : _ref$month;
  var where = [];

  if (!showExpired) {
    where.push('where[TKT_end_date**expired][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN"] + '&where[TKT_end_date**expired][]=' + nowDateAndTime.local().format());
  }

  if (month && month !== 'none') {
    where.push('where[TKT_start_date][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["GREATER_THAN_AND_EQUAL"] + '&where[TKT_start_date][]=' + moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()().month(month).startOf('month').local().format());
    where.push('where[TKT_end_date][]=' + _base__WEBPACK_IMPORTED_MODULE_4__["LESS_THAN_AND_EQUAL"] + '&where[TKT_end_date][]=' + moment_timezone__WEBPACK_IMPORTED_MODULE_1___default()().month(month).endOf('month').local().format());
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
  queryData = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultQueryData.queryData, queryData);
  return Object(_base__WEBPACK_IMPORTED_MODULE_4__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/ticket/status-helper.js":
/*!*******************************************************!*\
  !*** ./assets/src/data/model/ticket/status-helper.js ***!
  \*******************************************************/
/*! exports provided: isOnSale, isExpired, isSoldOut, isPending, isArchived, status, statusColorClass, getTicketStatusTextLabel, getBackgroundColorClass, getBorderColorClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOnSale", function() { return isOnSale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isExpired", function() { return isExpired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSoldOut", function() { return isSoldOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPending", function() { return isPending; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArchived", function() { return isArchived; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "status", function() { return status; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statusColorClass", function() { return statusColorClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTicketStatusTextLabel", function() { return getTicketStatusTextLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBackgroundColorClass", function() { return getBackgroundColorClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBorderColorClass", function() { return getBorderColorClass; });
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/ticket/constants.js");
/**
 * External imports
 */


/**
 * Internal imports
 */


/**
 * @function
 * @param {Object} TicketEntity model object
 * @throws {TypeError}
 */

var assertTicketEntity = function assertTicketEntity(TicketEntity) {
  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntityOfModel"])(TicketEntity, _constants__WEBPACK_IMPORTED_MODULE_2__["MODEL_NAME"])) {
    throw new TypeError('The provided entity is not a ticket instance');
  }
};
/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {boolean} true if ticket is currently available for purchase
 */


var isOnSale = function isOnSale(TicketEntity) {
  assertTicketEntity(TicketEntity);
  return !isArchived(TicketEntity) && TicketEntity.startDate.diffNow() < 0 && TicketEntity.endDate.diffNow() > 0;
};
/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {boolean} true if ticket can no longer be purchased
 */

var isExpired = function isExpired(TicketEntity) {
  assertTicketEntity(TicketEntity);
  return TicketEntity.endDate.diffNow() < 0;
};
/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {boolean} true if tickets sold meets or exceeds available quantity
 */

var isSoldOut = function isSoldOut(TicketEntity) {
  assertTicketEntity(TicketEntity);
  var qty = TicketEntity.qty;
  return qty !== null && qty !== 'INF' && qty !== Infinity && TicketEntity.sold >= qty;
};
/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {boolean} 	true if ticket is not yet available for purchase,
 * 						but will be at some date in the future
 */

var isPending = function isPending(TicketEntity) {
  assertTicketEntity(TicketEntity);
  return !isArchived(TicketEntity) && TicketEntity.startDate.diffNow() > 0;
};
/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {boolean} true if ticket is archived
 */

var isArchived = function isArchived(TicketEntity) {
  assertTicketEntity(TicketEntity);
  return TicketEntity.deleted;
};
/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {string} status ID
 */

var status = function status(TicketEntity) {
  assertTicketEntity(TicketEntity);

  if (isArchived(TicketEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].ARCHIVED;
  }

  if (isSoldOut(TicketEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].SOLD_OUT;
  }

  if (isExpired(TicketEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].EXPIRED;
  }

  if (isPending(TicketEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].PENDING;
  }

  if (isOnSale(TicketEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].ONSALE;
  }

  return '';
};
/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {string} CSS class corresponding to the background color
 * 					for the ticket container based on the ticket status
 */

var statusColorClass = function statusColorClass(TicketEntity) {
  switch (status(TicketEntity)) {
    case _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].ONSALE:
      return 'green';

    case _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].EXPIRED:
      return 'lite-grey';

    case _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].SOLD_OUT:
      return 'gold';

    case _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].PENDING:
      return 'blue';

    case _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].ARCHIVED:
      return 'dark-grey';
  }
};
/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {string} ticket status
 */

var getTicketStatusTextLabel = function getTicketStatusTextLabel(TicketEntity) {
  var ticketStatus = null;

  switch (status(TicketEntity)) {
    case _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].SOLD_OUT:
      ticketStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('sold out', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].EXPIRED:
      ticketStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('expired', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].PENDING:
      ticketStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('pending', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].ONSALE:
      ticketStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('on sale', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].ARCHIVED:
      ticketStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('archived', 'event_espresso');
      break;
  }

  return ticketStatus;
};
/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {string}    CSS class for the background color
 */

var getBackgroundColorClass = function getBackgroundColorClass(TicketEntity) {
  return "ee-".concat(statusColorClass(TicketEntity), "-background");
};
/**
 * @function
 * @param {Object} TicketEntity model object
 * @param {string} border 'all', 'top', 'right', 'bottom', 'left'
 * @return {string}    CSS class for the background color
 */

var getBorderColorClass = function getBorderColorClass(TicketEntity) {
  var border = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
  var color = statusColorClass(TicketEntity);

  switch (border) {
    case 'all':
      return "ee-".concat(color, "-border");

    case 'top':
      return "ee-".concat(color, "-border-top");

    case 'right':
      return "ee-".concat(color, "-border-right");

    case 'bottom':
      return "ee-".concat(color, "-border-bottom");

    case 'left':
      return "ee-".concat(color, "-border-left");
  }
};

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

/***/ "./node_modules/pluralize/pluralize.js":
/*!*********************************************!*\
  !*** ./node_modules/pluralize/pluralize.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* global define */

(function (root, pluralize) {
  /* istanbul ignore else */
  if (true) {
    // Node.
    module.exports = pluralize();
  } else {}
})(this, function () {
  // Rule storage - pluralize and singularize need to be run sequentially,
  // while other rules can be optimized using an object for instant lookups.
  var pluralRules = [];
  var singularRules = [];
  var uncountables = {};
  var irregularPlurals = {};
  var irregularSingles = {};

  /**
   * Sanitize a pluralization rule to a usable regular expression.
   *
   * @param  {(RegExp|string)} rule
   * @return {RegExp}
   */
  function sanitizeRule (rule) {
    if (typeof rule === 'string') {
      return new RegExp('^' + rule + '$', 'i');
    }

    return rule;
  }

  /**
   * Pass in a word token to produce a function that can replicate the case on
   * another word.
   *
   * @param  {string}   word
   * @param  {string}   token
   * @return {Function}
   */
  function restoreCase (word, token) {
    // Tokens are an exact match.
    if (word === token) return token;

    // Upper cased words. E.g. "HELLO".
    if (word === word.toUpperCase()) return token.toUpperCase();

    // Title cased words. E.g. "Title".
    if (word[0] === word[0].toUpperCase()) {
      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
    }

    // Lower cased words. E.g. "test".
    return token.toLowerCase();
  }

  /**
   * Interpolate a regexp string.
   *
   * @param  {string} str
   * @param  {Array}  args
   * @return {string}
   */
  function interpolate (str, args) {
    return str.replace(/\$(\d{1,2})/g, function (match, index) {
      return args[index] || '';
    });
  }

  /**
   * Replace a word using a rule.
   *
   * @param  {string} word
   * @param  {Array}  rule
   * @return {string}
   */
  function replace (word, rule) {
    return word.replace(rule[0], function (match, index) {
      var result = interpolate(rule[1], arguments);

      if (match === '') {
        return restoreCase(word[index - 1], result);
      }

      return restoreCase(match, result);
    });
  }

  /**
   * Sanitize a word by passing in the word and sanitization rules.
   *
   * @param  {string}   token
   * @param  {string}   word
   * @param  {Array}    rules
   * @return {string}
   */
  function sanitizeWord (token, word, rules) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
      return word;
    }

    var len = rules.length;

    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
      var rule = rules[len];

      if (rule[0].test(word)) return replace(word, rule);
    }

    return word;
  }

  /**
   * Replace a word with the updated word.
   *
   * @param  {Object}   replaceMap
   * @param  {Object}   keepMap
   * @param  {Array}    rules
   * @return {Function}
   */
  function replaceWord (replaceMap, keepMap, rules) {
    return function (word) {
      // Get the correct token and case restoration functions.
      var token = word.toLowerCase();

      // Check against the keep object map.
      if (keepMap.hasOwnProperty(token)) {
        return restoreCase(word, token);
      }

      // Check against the replacement map for a direct word replacement.
      if (replaceMap.hasOwnProperty(token)) {
        return restoreCase(word, replaceMap[token]);
      }

      // Run all the rules against the word.
      return sanitizeWord(token, word, rules);
    };
  }

  /**
   * Check if a word is part of the map.
   */
  function checkWord (replaceMap, keepMap, rules, bool) {
    return function (word) {
      var token = word.toLowerCase();

      if (keepMap.hasOwnProperty(token)) return true;
      if (replaceMap.hasOwnProperty(token)) return false;

      return sanitizeWord(token, token, rules) === token;
    };
  }

  /**
   * Pluralize or singularize a word based on the passed in count.
   *
   * @param  {string}  word
   * @param  {number}  count
   * @param  {boolean} inclusive
   * @return {string}
   */
  function pluralize (word, count, inclusive) {
    var pluralized = count === 1
      ? pluralize.singular(word) : pluralize.plural(word);

    return (inclusive ? count + ' ' : '') + pluralized;
  }

  /**
   * Pluralize a word.
   *
   * @type {Function}
   */
  pluralize.plural = replaceWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Check if a word is plural.
   *
   * @type {Function}
   */
  pluralize.isPlural = checkWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Singularize a word.
   *
   * @type {Function}
   */
  pluralize.singular = replaceWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Check if a word is singular.
   *
   * @type {Function}
   */
  pluralize.isSingular = checkWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Add a pluralization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addPluralRule = function (rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add a singularization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addSingularRule = function (rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add an uncountable word rule.
   *
   * @param {(string|RegExp)} word
   */
  pluralize.addUncountableRule = function (word) {
    if (typeof word === 'string') {
      uncountables[word.toLowerCase()] = true;
      return;
    }

    // Set singular and plural references for the word.
    pluralize.addPluralRule(word, '$0');
    pluralize.addSingularRule(word, '$0');
  };

  /**
   * Add an irregular word definition.
   *
   * @param {string} single
   * @param {string} plural
   */
  pluralize.addIrregularRule = function (single, plural) {
    plural = plural.toLowerCase();
    single = single.toLowerCase();

    irregularSingles[single] = plural;
    irregularPlurals[plural] = single;
  };

  /**
   * Irregular rules.
   */
  [
    // Pronouns.
    ['I', 'we'],
    ['me', 'us'],
    ['he', 'they'],
    ['she', 'they'],
    ['them', 'them'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['itself', 'themselves'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['themself', 'themselves'],
    ['is', 'are'],
    ['was', 'were'],
    ['has', 'have'],
    ['this', 'these'],
    ['that', 'those'],
    // Words ending in with a consonant and `o`.
    ['echo', 'echoes'],
    ['dingo', 'dingoes'],
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus', 'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma', 'stigmata'],
    ['stoma', 'stomata'],
    ['dogma', 'dogmata'],
    ['lemma', 'lemmata'],
    ['schema', 'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox', 'oxen'],
    ['axe', 'axes'],
    ['die', 'dice'],
    ['yes', 'yeses'],
    ['foot', 'feet'],
    ['eave', 'eaves'],
    ['goose', 'geese'],
    ['tooth', 'teeth'],
    ['quiz', 'quizzes'],
    ['human', 'humans'],
    ['proof', 'proofs'],
    ['carve', 'carves'],
    ['valve', 'valves'],
    ['looey', 'looies'],
    ['thief', 'thieves'],
    ['groove', 'grooves'],
    ['pickaxe', 'pickaxes'],
    ['whiskey', 'whiskies']
  ].forEach(function (rule) {
    return pluralize.addIrregularRule(rule[0], rule[1]);
  });

  /**
   * Pluralization rules.
   */
  [
    [/s?$/i, 's'],
    [/[^\u0000-\u007F]$/i, '$0'],
    [/([^aeiou]ese)$/i, '$1'],
    [/(ax|test)is$/i, '$1es'],
    [/(alias|[^aou]us|tlas|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    [/(her|at|gr)o$/i, '$1oes'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    [/(m|l)(?:ice|ouse)$/i, '$1ice'],
    [/(pe)(?:rson|ople)$/i, '$1ople'],
    [/(child)(?:ren)?$/i, '$1ren'],
    [/eaux$/i, '$0'],
    [/m[ae]n$/i, 'men'],
    ['thou', 'you']
  ].forEach(function (rule) {
    return pluralize.addPluralRule(rule[0], rule[1]);
  });

  /**
   * Singularization rules.
   */
  [
    [/s$/i, ''],
    [/(ss)$/i, '$1'],
    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    [/ies$/i, 'y'],
    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
    [/\b(mon|smil)ies$/i, '$1ey'],
    [/(m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|(?:her|at|gr)o|ris)(?:es)?$/i, '$1'],
    [/(analy|ba|diagno|parenthe|progno|synop|the|empha|cri)(?:sis|ses)$/i, '$1sis'],
    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
    [/(test)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    [/(matr|append)ices$/i, '$1ix'],
    [/(pe)(rson|ople)$/i, '$1rson'],
    [/(child)ren$/i, '$1'],
    [/(eau)x?$/i, '$1'],
    [/men$/i, 'man']
  ].forEach(function (rule) {
    return pluralize.addSingularRule(rule[0], rule[1]);
  });

  /**
   * Uncountable rules.
   */
  [
    // Singular words with no plurals.
    'adulthood',
    'advice',
    'agenda',
    'aid',
    'alcohol',
    'ammo',
    'anime',
    'athletics',
    'audio',
    'bison',
    'blood',
    'bream',
    'buffalo',
    'butter',
    'carp',
    'cash',
    'chassis',
    'chess',
    'clothing',
    'cod',
    'commerce',
    'cooperation',
    'corps',
    'debris',
    'diabetes',
    'digestion',
    'elk',
    'energy',
    'equipment',
    'excretion',
    'expertise',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'housework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'literature',
    'machinery',
    'mackerel',
    'mail',
    'media',
    'mews',
    'moose',
    'music',
    'manga',
    'news',
    'pike',
    'plankton',
    'pliers',
    'pollution',
    'premises',
    'rain',
    'research',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'species',
    'staff',
    'swine',
    'tennis',
    'traffic',
    'transporation',
    'trout',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    // Regexes.
    /[^aeiou]ese$/i, // "chinese", "japanese"
    /deer$/i, // "deer", "reindeer"
    /fish$/i, // "fish", "blowfish", "angelfish"
    /measles$/i,
    /o[iu]s$/i, // "carnivorous"
    /pox$/i, // "chickpox", "smallpox"
    /sheep$/i
  ].forEach(pluralize.addUncountableRule);

  return pluralize;
});


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



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
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
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

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

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
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
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
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

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
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

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

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
              case REACT_PROVIDER_TYPE:
                return $$typeofType;
              default:
                return $$typeof;
            }
        }
      case REACT_LAZY_TYPE:
      case REACT_MEMO_TYPE:
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}

// AsyncMode is deprecated along with isAsyncMode
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

var hasWarnedAboutDeprecatedIsAsyncMode = false;

// AsyncMode should be deprecated
function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
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

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


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

/***/ "@eventespresso/validators":
/*!**********************************!*\
  !*** external "eejs.validators" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.validators;

/***/ }),

/***/ "@eventespresso/value-objects":
/*!************************************!*\
  !*** external "eejs.valueObjects" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.valueObjects;

/***/ }),

/***/ "@wordpress/hooks":
/*!***************************!*\
  !*** external "wp.hooks" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp.hooks;

/***/ }),

/***/ "cuid":
/*!***********************************!*\
  !*** external "eejs.vendor.cuid" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.vendor.cuid;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = lodash;

/***/ }),

/***/ "moment-timezone":
/*!*************************************!*\
  !*** external "eejs.vendor.moment" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.vendor.moment;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLltuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9hc3NlcnRpb25zLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2F0dGVuZGVlL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9hdHRlbmRlZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9hdHRlbmRlZS9xdWVyeS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9iYXNlLWRhdGUtZm9ybWF0dGVyLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvY2hlY2tpbi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvY2hlY2tpbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9jaGVja2luL3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2RhdGV0aW1lL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9mb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZGF0ZXRpbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZGF0ZXRpbWUvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZGF0ZXRpbWUvc3RhdHVzLWhlbHBlci5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kZWZhdWx0LW1vZGVsLXN0YXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VuZHBvaW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9hc3NlcnRpb25zLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2Jhc2UtZW50aXR5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2Jvb2xlYW5zLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZW50aXR5LWZhY3RvcnkvZXh0cmFjdG9ycy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS92YWxpZGF0b3JzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2V2ZW50L2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9ldmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9ldmVudC9xdWVyeS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9tb2RlbC1uYW1lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9tb2RlbHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvcHJpY2UtdHlwZS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvcHJpY2UtdHlwZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9wcmltYXJ5LWtleXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvcmVnaXN0cmF0aW9uL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvcmVnaXN0cmF0aW9uL3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3N0YXR1cy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvc3RhdHVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvc3RhdHVzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3N0YXR1cy9xdWVyeS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC90aWNrZXQvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3RpY2tldC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC90aWNrZXQvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L3N0YXR1cy1oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFNwcmVhZC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL21lbWl6ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3BsdXJhbGl6ZS9wbHVyYWxpemUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwiZWVqc1wiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwiZWVqcy5oZWxwZXJzXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzLmkxOG5cIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcImVlanMudmFsaWRhdG9yc1wiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwiZWVqcy52YWx1ZU9iamVjdHNcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcIndwLmhvb2tzXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzLnZlbmRvci5jdWlkXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcImVlanMudmVuZG9yLm1vbWVudFwiIl0sIm5hbWVzIjpbImFzc2VydEVudGl0eUhhc0tleSIsImtleSIsImVudGl0eSIsIm1lc3NhZ2UiLCJzcHJpbnRmIiwiX18iLCJoYXNPd25Qcm9wZXJ0eSIsIkV4Y2VwdGlvbiIsImFzc2VydEltbXV0YWJsZU9iamVjdEhhc1BhdGgiLCJwYXRoIiwiaW1tdXRhYmxlIiwiaGFzSW4iLCJhc3NlcnRJc0FycmF5IiwiaXRlbXMiLCJpc0FycmF5IiwiYXNzZXJ0SXNOb3RFbXB0eSIsImlzRW1wdHkiLCJhc3NlcnRJc01hcCIsIml0ZW0iLCJpc01hcCIsIk1PREVMX05BTUUiLCJvcmRlckJ5TWFwIiwiaWQiLCJsYXN0TmFtZU9ubHkiLCJmaXJzdE5hbWVPbmx5IiwiZmlyc3RUaGVuTGFzdE5hbWUiLCJsYXN0VGhlbkZpcnN0TmFtZSIsInF1ZXJ5RGF0YVR5cGVzIiwiZm9yRXZlbnRJZCIsIlByb3BUeXBlcyIsIm51bWJlciIsImZvckRhdGV0aW1lSWQiLCJmb3JUaWNrZXRJZCIsImZvclN0YXR1c0lkIiwib25lT2YiLCJSRUdJU1RSQVRJT05fU1RBVFVTX0lEUyIsImZvclJlZ2lzdHJhdGlvbklkIiwic2hvd0dyYXZhdGFyIiwiYm9vbCIsInF1ZXJ5RGF0YSIsInNoYXBlIiwibGltaXQiLCJvcmRlckJ5IiwiT2JqZWN0Iiwia2V5cyIsIm9yZGVyIiwiQUxMT1dFRF9PUkRFUl9WQUxVRVMiLCJkZWZhdWx0UXVlcnlEYXRhIiwiUVVFUllfT1JERVJfQVNDIiwibWFwT3JkZXJCeSIsImlzVW5kZWZpbmVkIiwid2hlcmVDb25kaXRpb25zIiwid2hlcmUiLCJwYXJzZUludCIsImlzTmFOIiwicHVzaCIsImluY2x1ZGVzIiwiam9pbiIsImdldFF1ZXJ5U3RyaW5nIiwiYmFzZUdldFF1ZXJ5U3RyaW5nIiwiZm9ybWF0RGF0ZXNPbkVudGl0aWVzIiwiZW50aXRpZXMiLCJlbnRpdHlEYXRlRmllbGRzIiwiZm9ybWF0IiwiZGF0ZUZvcm1hdHMiLCJsb2NhbCIsImZvcm1hdHRlZEVudGl0aWVzIiwiZm9yRWFjaCIsImZvcm1hdERhdGVzT25FbnRpdHkiLCJuZXdFbnRpdHkiLCJkYXRlRmllbGQiLCJmb3JtYXRFbnRpdGllc0RhdGVzVG9NeXNxbCIsImZvcm1hdEVudGl0eURhdGVzVG9NeXNxbCIsImZvcm1hdEVudGl0aWVzRGF0ZXNUb1NpdGUiLCJmb3JtYXRFbnRpdHlEYXRlc1RvU2l0ZSIsImNvbnZlcnRFbnRpdGllc0RhdGVzVG9Nb21lbnQiLCJjb252ZXJ0RW50aXR5RGF0ZXNUb01vbWVudCIsIlFVRVJZX09SREVSX0RFU0MiLCJHUkVBVEVSX1RIQU4iLCJlbmNvZGVVUklDb21wb25lbnQiLCJMRVNTX1RIQU4iLCJHUkVBVEVSX1RIQU5fQU5EX0VRVUFMIiwiTEVTU19USEFOX0FORF9FUVVBTCIsImRlZmF1bHRXaGVyZUNvbmRpdGlvbnMiLCJxdWVyeVBhcmFtcyIsImZpZWxkIiwicXVlcnlTdHJpbmciLCJDSEVDS0lOX1NUQVRVU19JRCIsIlNUQVRVU19DSEVDS0VEX09VVCIsIlNUQVRVU19DSEVDS0VEX0lOIiwiU1RBVFVTX0NIRUNLRURfTkVWRVIiLCJDSEVDS0lOX1NUQVRVU19JRFMiLCJ2YWx1ZXMiLCJjaGVja2luU3RhdHVzIiwib3B0aW9uc0VudGl0eU1hcCIsImRlZmF1bHQiLCJsYWJlbCIsInByZXR0eVN0YXR1cyIsInZhbHVlIiwidGltZXN0YW1wIiwiREFURVRJTUVfU1RBVFVTX0lEIiwiQUNUSVZFIiwiQ0FOQ0VMTEVEIiwiRVhQSVJFRCIsIklOQUNUSVZFIiwiUE9TVFBPTkVEIiwiU09MRF9PVVQiLCJUUkFTSEVEIiwiVVBDT01JTkciLCJEQVRFVElNRV9TVEFUVVNfSURTIiwiTUlOVVRFX0lOX1NFQ09ORFMiLCJIT1VSX0lOX1NFQ09ORFMiLCJEQVlfSU5fU0VDT05EUyIsIldFRUtfSU5fU0VDT05EUyIsIk1PTlRIX0lOX1NFQ09ORFMiLCJEQVRFX0ZJRUxEUyIsImZvcm1hdHRlcnMiLCJmb3JPd24iLCJiYXNlRm9ybWF0dGVyIiwiaW1wbGVtZW50YXRpb24iLCJmdW5jdGlvbk5hbWUiLCJpbmNvbWluZ0FyZ3MiLCJmaXJzdEFyZyIsInB1bGxBdCIsInByZXR0eURhdGVGcm9tRGF0ZVRpbWUiLCJEYXRlVGltZUVudGl0eSIsImNvbnRlbnQiLCJpc01vZGVsRW50aXR5T2ZNb2RlbCIsIkRUVF9FVlRfc3RhcnQiLCJoYXNTYW1lIiwiRFRUX0VWVF9lbmQiLCJhbGxEYXRlVGltZXNBc1N0cmluZyIsIlNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFIiwidG9Gb3JtYXQiLCJEQVRFX1RJTUVfRk9STUFUX1NJVEUiLCJUSU1FX0ZPUk1BVF9TSVRFIiwiRFRUX25hbWUiLCJub3dEYXRlQW5kVGltZSIsIm1vbWVudCIsInNob3dFeHBpcmVkIiwibW9udGgiLCJzdGFydF9kYXRlIiwiZW5kX2RhdGUiLCJzdGFydE9mIiwiZW5kT2YiLCJhc3NlcnREYXRlVGltZUVudGl0eSIsIlR5cGVFcnJvciIsImlzQWN0aXZlIiwic3RhcnQiLCJkaWZmTm93IiwiYXNTZWNvbmRzIiwiZW5kIiwiaXNFeHBpcmVkIiwiaXNSZWNlbnRseUV4cGlyZWQiLCJpc1NvbGRPdXQiLCJjYXAiLCJyZWdMaW1pdCIsIkluZmluaXR5Iiwic29sZCIsImlzVXBjb21pbmciLCJpc1RyYXNoZWQiLCJkZWxldGVkIiwic3RhdHVzIiwic3RhdHVzQ29sb3JDbGFzcyIsImdldEJhY2tncm91bmRDb2xvckNsYXNzIiwiZ2V0Qm9yZGVyQ29sb3JDbGFzcyIsImJvcmRlciIsImNvbG9yIiwibWFwVG9PYmplY3RWYWx1ZXMiLCJtb2RlbE5hbWVFbmRwb2ludHMiLCJtYXBWYWx1ZXMiLCJnZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCIsIm1lbW9pemUiLCJlbmRwb2ludHMiLCJERUZBVUxUX0xJU1RTX1NUQVRFIiwiREVGQVVMVF9DT1JFX1NUQVRFIiwicmVsYXRpb25zIiwiZGlydHkiLCJpbmRleCIsImRlbGV0ZSIsImFkZCIsInRyYXNoIiwiREVGQVVMVF9TQ0hFTUFfU1RBVEUiLCJzY2hlbWEiLCJmYWN0b3J5IiwicmVsYXRpb25FbmRwb2ludHMiLCJyZWxhdGlvblNjaGVtYSIsImRhdGEiLCJwYXRocyIsImNvbGxlY3Rpb25fZW5kcG9pbnRzIiwiYmFzZVJlc3RSb3V0ZSIsImJhc2VfcmVzdF9yb3V0ZSIsImdldEVuZHBvaW50IiwibW9kZWxOYW1lIiwiYXBwbHlRdWVyeVN0cmluZyIsInN0cmlwQmFzZVJvdXRlRnJvbVVybCIsInVybCIsInJlcGxhY2UiLCJtYXliZUFzc2VydFZhbHVlT2JqZWN0IiwiZmllbGROYW1lIiwiZmllbGRWYWx1ZSIsImlzRGF0ZVRpbWVGaWVsZCIsIkRhdGVUaW1lIiwiYXNzZXJ0SXNEYXRlVGltZSIsImlzTW9uZXlGaWVsZCIsIk1vbmV5IiwiYXNzZXJ0TW9uZXkiLCJhc3NlcnRWYWxpZFNjaGVtYSIsImlzU2NoZW1hIiwiSW52YWxpZFNjaGVtYSIsImFzc2VydFZhbGlkU2NoZW1hRmllbGRQcm9wZXJ0aWVzIiwidHlwZSIsInByb3BlcnRpZXMiLCJyYXciLCJhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZCIsImluc3RhbmNlIiwiaXNWYWxpZCIsImlzU2hhbGxvd1ZhbGlkVmFsdWVGb3JGaWVsZCIsImVudW0iLCJ2YWxpZGF0ZUVudW1UeXBlIiwidmFsaWRhdGVUeXBlIiwibWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMiLCJhc3NlcnRWYWxpZEZpZWxkQW5kVmFsdWVBZ2FpbnN0U2NoZW1hIiwidmFsaWRhdGlvblR5cGUiLCJ2YWxpZGF0ZVR5cGVGb3JGaWVsZCIsIlBSSVZBVEVfUFJPUEVSVElFUyIsIlNBVkVfU1RBVEUiLCJWQUxJREFURV9UWVBFUyIsIkJhc2VFbnRpdHkiLCJlbnRpdHlGaWVsZHNBbmRWYWx1ZXMiLCJmaWVsZFByZWZpeGVzIiwiaXNOZXciLCJDTEVBTiIsImNyZWF0ZUdldHRlciIsInNldFNhdmVTdGF0ZSIsIk5FVyIsIlNldCIsImNyZWF0ZUVudGl0eUdldHRlcnNBbmRTZXR0ZXJzIiwiY3JlYXRlUGVyc2lzdGluZ0dldHRlcnNBbmRTZXR0ZXJzIiwic2VhbCIsInNhdmVTdGF0ZSIsIkRJUlRZIiwicHJvdGVjdGVkRmllbGRzIiwibGVuZ3RoIiwiaW5kZXhPZiIsImtlZXBJZCIsImNyZWF0ZUZhY3RvcnkiLCJjcmVhdGVFbnRpdHlGYWN0b3J5IiwiJHNjaGVtYSIsImNyZWF0ZU5ldyIsImZvckNsb25lIiwibmFtZUNsYXNzIiwibmFtZSIsImV4dGVuZGVkQ2xhc3MiLCJFbnRpdHkiLCJ1cHBlckZpcnN0IiwiY2FtZWxDYXNlIiwiY2xhc3NEZWYiLCJmaWVsZHNBbmRWYWx1ZXMiLCJmcm9tRXhpc3RpbmciLCJoYXNSYXdQcm9wZXJ0eSIsImlzUGxhaW5PYmplY3QiLCJoYXNQcmV0dHlQcm9wZXJ0eSIsInByZXR0eSIsImhhc1JlbmRlcmVkUHJvcGVydHkiLCJyZW5kZXJlZCIsImhhc0Zvcm1hdFByb3BlcnR5IiwiaGFzRW51bVByb3BlcnR5IiwiaXNWYWx1ZU9iamVjdEZpZWxkIiwiaXNVVENEYXRlVGltZUZpZWxkIiwiZGF0ZVRpbWVGaWVsZE5hbWUiLCJpc1ByaW1hcnlLZXlGaWVsZCIsInByaW1hcnlfa2V5IiwiaXNSZWFkT25seSIsInJlYWRvbmx5IiwiaXNFbnRpdHlGaWVsZCIsImlzRW51bUZpZWxkIiwiU3ltYm9sIiwiVkFMSURBVEVfVFlQRSIsIlJBVyIsIlJFTkRFUkVEIiwiUFJFVFRZIiwiTU9ERUxfUFJFRklYRVMiLCJwcmVmaXhNYXAiLCJhcHBseUZpbHRlcnMiLCJhbnN3ZXIiLCJhdHRlbmRlZSIsImNoYW5nZV9sb2ciLCJjaGVja2luIiwiY291bnRyeSIsImN1cnJlbmN5IiwiY3VycmVuY3lfcGF5bWVudF9tZXRob2QiLCJkYXRldGltZSIsImRhdGV0aW1lX3RpY2tldCIsImV2ZW50IiwiZXZlbnRfbWVzc2FnZV90ZW1wbGF0ZSIsImV2ZW50X3F1ZXN0aW9uX2dyb3VwIiwiZXZlbnRfdmVudWUiLCJleHRyYV9qb2luIiwiZXh0cmFfbWV0YSIsImxpbmVfaXRlbSIsIm1lc3NhZ2VfdGVtcGxhdGUiLCJtZXNzYWdlX3RlbXBsYXRlX2dyb3VwIiwicGF5bWVudCIsInBheW1lbnRfbWV0aG9kIiwicG9zdF9tZXRhIiwicHJpY2UiLCJwcmljZV90eXBlIiwicXVlc3Rpb24iLCJxdWVzdGlvbl9ncm91cCIsInF1ZXN0aW9uX2dyb3VwX3F1ZXN0aW9uIiwicXVlc3Rpb25fb3B0aW9uIiwicmVnaXN0cmF0aW9uIiwicmVnaXN0cmF0aW9uX3BheW1lbnQiLCJzdGF0ZSIsInRlcm0iLCJ0ZXJtX3JlbGF0aW9uc2hpcCIsInRlcm1fdGF4b25vbXkiLCJ0aWNrZXQiLCJ0aWNrZXRfcHJpY2UiLCJ0aWNrZXRfdGVtcGxhdGUiLCJ0cmFuc2FjdGlvbiIsInZlbnVlIiwid3BfdXNlciIsIm9wdHMiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImNyZWF0ZUNhbGxiYWNrR2V0dGVyIiwicHJvcGVydHlOYW1lIiwiY2FsbEJhY2siLCJjcmVhdGVHZXR0ZXJBbmRTZXR0ZXIiLCJpbml0aWFsRmllbGRWYWx1ZSIsInByb3BlcnR5VmFsdWUiLCJzZXQiLCJyZWNlaXZlZFZhbHVlIiwiaXNQcmltYXJ5RmllbGQiLCJzZXRGaWVsZFRvUGVyc2lzdCIsImNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyIiwib3JpZ2luYWxGaWVsZE5hbWUiLCJhbGlhc0ZpZWxkTmFtZSIsImNyZWF0ZUFsaWFzR2V0dGVyIiwiY3JlYXRlRmx1ZW50U2V0dGVyIiwicHJpbWFyeUtleXMiLCJvcmlnaW5hbEZpZWxkc0FuZFZhbHVlcyIsImlzUHJpbWFyeUtleSIsInNldFZhbGlkYXRlVHlwZUZvckZpZWxkIiwic2V0SW5pdGlhbEVudGl0eUZpZWxkc0FuZFZhbHVlcyIsInNldENhbGN1bGF0ZWRGaWVsZEFuZFZhbHVlcyIsInBvcHVsYXRlUHJvdGVjdGVkRmllbGRzUHJvcGVydHkiLCJzZXRSZXNvdXJjZXMiLCJjcmVhdGVQcmltYXJ5S2V5RmllbGRHZXR0ZXJzIiwicG9wdWxhdGVQcmltYXJ5S2V5cyIsInBvcHVsYXRlTWlzc2luZ0ZpZWxkcyIsImNhbGN1bGF0ZWRGaWVsZHMiLCJfY2FsY3VsYXRlZF9maWVsZHMiLCJfcHJvdGVjdGVkIiwiZ2V0UHJpbWFyeUtleUZpZWxkc0Zyb21TY2hlbWEiLCJzY2hlbWFQcm9wZXJ0aWVzIiwic2NoZW1hRmllbGQiLCJjdWlkIiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyRm9yRmllbGQiLCJkZXJpdmVWYWxpZGF0ZVR5cGVGb3JGaWVsZCIsImdldEVudGl0eUZpZWxkc0Zyb21TY2hlbWEiLCJ1bmRlZmluZWQiLCJnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyIsImZvclVwZGF0ZSIsImdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JQZXJzaXN0aW5nIiwiZm9ySW5zZXJ0IiwiZW50aXR5VmFsdWVzIiwicHJpbWFyeUtleSIsImZvclBlcnNpc3QiLCJnZXREZWZhdWx0VmFsdWVGb3JGaWVsZCIsImNyZWF0ZVJhd0VudGl0eUdldHRlcnNTZXR0ZXJzIiwiZGVyaXZlUHJlcGFyZWRWYWx1ZUZvckZpZWxkIiwiY3JlYXRlUmVuZGVyZWRHZXR0ZXJzIiwiZGVyaXZlUmVuZGVyZWRWYWx1ZSIsImNyZWF0ZUFsaWFzR2V0dGVyRm9yRmllbGQiLCJjcmVhdGVBbGlhc2VzRm9yTWV0aG9kIiwibWV0aG9kIiwibmV3RmllbGROYW1lIiwiZmllbGRQcmVmaXgiLCJnZXRSZW5kZXJlZENhbGxiYWNrIiwicmVxdWVzdGVkRmllbGROYW1lIiwicmVtb3ZlUHJlZml4ZXNGcm9tRmllbGQiLCJwcmVmaXhlc1RvUmVtb3ZlIiwic29ydEJ5IiwicHJlZml4IiwiZ2V0UmVuZGVyZWQiLCJoYXNNdWx0aXBsZVByaW1hcnlLZXlzQ2FsbGJhY2siLCJoYXNDYWxjdWxhdGVkRmllbGRDYWxsYmFjayIsImZpZWxkTmFtZVRvQ2hlY2siLCJjYWxjdWxhdGVkRmllbGRWYWx1ZSIsImNhbGN1bGF0ZWRGaWVsZE5hbWUiLCJyZWxhdGlvbk5hbWUiLCJyZXNvdXJjZVZhbHVlIiwicmVzb3VyY2VOYW1lIiwiaHJlZiIsImdldFJlbGF0aW9uTmFtZUZyb21MaW5rIiwic2V0UmVsYXRpb25zUmVzb3VyY2UiLCJnZXRSZWxhdGlvblJlc291cmNlQ2FsbGJhY2siLCJyZXNvdXJjZUluZm8iLCJyZXNvdXJjZUxpbmsiLCJzaW5nbGUiLCJnZXRSZWxhdGlvblJlc291cmNlIiwib3ZlcnJpZGUiLCJjdXJyZW50U3RhdGUiLCJJbnZhbGlkQXJndW1lbnQiLCJmaWVsZHNUb1BlcnNpc3RPbkluc2VydCIsIm1heWJlQ29udmVydFRvVmFsdWVPYmplY3QiLCJ2YWxpZGF0ZUlzRGF0ZVRpbWUiLCJmcm9tSVNPIiwiaW5zdGFuY2VPZiIsIlNpdGVDdXJyZW5jeSIsInRvSVNPIiwidG9OdW1iZXIiLCJtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3QiLCJwbHVyYWxNb2RlbE5hbWUiLCJsYXN0Iiwic3BsaXQiLCJlbnRpdHlJbnN0YW5jZSIsInJlZHVjZSIsIml0ZXJhdG9yIiwiQXJyYXkiLCJmcm9tIiwiZ2V0UHJpbWFyeUtleVZhbHVlcyIsInBpY2siLCJwaWNrQnkiLCJkZXJpdmVEZWZhdWx0VmFsdWVGb3JUeXBlIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZGVyaXZlVHlwZUZvckZpZWxkIiwidmFsaWQiLCJzaW5nbGVUeXBlIiwiaXNJbnRlZ2VyIiwiaXNOdW1iZXIiLCJpc1N0cmluZyIsImlzQm9vbGVhbiIsImVudW1WYWx1ZXMiLCJleHBlY3RWYWx1ZU9iamVjdHMiLCJpc0VudW0iLCJpc1ZhbHVlT2JqZWN0IiwiRVZFTlRfU1RBVFVTX0lEIiwiRVZFTlRfU1RBVFVTX0lEUyIsImNhdGVnb3J5U2x1ZyIsInN0cmluZyIsInRpY2tldF9zdGFydCIsInRpY2tldF9lbmQiLCJNT0RFTF9OQU1FUyIsInBsdXJhbGl6ZSIsInNpbmd1bGFyTW9kZWxOYW1lIiwic2luZ3VsYXIiLCJtb2RlbE5hbWVGb3JRdWVyeVN0cmluZyIsInN0YXJ0Q2FzZSIsIkJBU0VfUFJJQ0VfVFlQRVMiLCJCQVNFX1BSSUNFIiwiRElTQ09VTlQiLCJTVVJDSEFSR0UiLCJUQVgiLCJwcmltYXJ5X2tleXMiLCJ2YWx1ZXNGb3JDb21iaW5lZFByaW1hcnlLZXlzIiwicmVzdWx0IiwidHJpbUVuZCIsInZhbHVlRm9yUHJpbWFyeUtleSIsImdldFByaW1hcnlLZXkiLCJnZXRQcmltYXJ5S2V5UXVlcnlTdHJpbmciLCJrZXlWYWx1ZXMiLCJnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzIiwia2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSIsIm1hcHBlZEVudGl0aWVzIiwiTWFwIiwiY3JlYXRlQW5kS2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSIsImVudGl0eUlkIiwic3RhdHVzTW9kZWwiLCJmb3JBdHRlbmRlZUlkIiwiZm9yVHJhbnNhY3Rpb25JZCIsInJlZ19pZCIsInJlZ19kYXRlIiwiU1RBVFVTX1RZUEVfRU1BSUwiLCJTVEFUVVNfVFlQRV9FVkVOVCIsIlNUQVRVU19UWVBFX01FU1NBR0UiLCJTVEFUVVNfVFlQRV9QQVlNRU5UIiwiU1RBVFVTX1RZUEVfUkVHSVNUUkFUSU9OIiwiU1RBVFVTX1RZUEVfVFJBTlNBQ1RJT04iLCJFTUFJTF9TVEFUVVNfSUQiLCJEUkFGVCIsIlNFTlQiLCJSRUdJU1RSQVRJT05fQ0xPU0VEIiwiREVMRVRFRCIsIkRFTklFRCIsIk5PVF9BQ1RJVkUiLCJOT1RfT1BFTiIsIk9OR09JTkciLCJSRUdJU1RSQVRJT05fT1BFTiIsIlBFTkRJTkciLCJTRUNPTkRBUlkiLCJNRVNTQUdFX1NUQVRVU19JRCIsIkRFQlVHIiwiRVhFQ1VUSU5HIiwiRkFJTCIsIklOQ09NUExFVEUiLCJJRExFIiwiUkVTRU5EIiwiUkVUUlkiLCJQQVlNRU5UX1NUQVRVU19JRCIsIkFQUFJPVkVEIiwiREVDTElORUQiLCJGQUlMRUQiLCJSRUdJU1RSQVRJT05fU1RBVFVTX0lEIiwiTk9UX0FQUFJPVkVEIiwiUEVORElOR19QQVlNRU5UIiwiV0FJVF9MSVNUIiwiVFJBTlNBQ1RJT05fU1RBVFVTX0lEIiwiQUJBTkRPTkVEIiwiQ09NUExFVEUiLCJPVkVSUEFJRCIsIkNQVF9TVEFUVVNfSUQiLCJQVUJMSVNIIiwiRlVUVVJFIiwiUFJJVkFURSIsIlVOS05PV05fU1RBVFVTX0lEIiwiQUxMX1NUQVRVU19JRFMiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX1JFR0lTVFJBVElPTiIsIkxhYmVsIiwiZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX1RSQU5TQUNUSU9OIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9QQVlNRU5UIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9NRVNTQUdFIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9DUFQiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0VWRU5UIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9USUNLRVQiLCJUSUNLRVRfU1RBVFVTX0lEIiwiQVJDSElWRUQiLCJPTlNBTEUiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0RBVEVUSU1FIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9DSEVDS0lOIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9BTEwiLCJzdGF0dXNDb2RlIiwiRk9STUFUX1NFTlRFTkNFX0NBU0UiLCJhc0Zvcm1hdHRlZCIsInByZXR0eVN0YXR1c2VzIiwic3RhdHVzQ29kZXMiLCJtYXBwZWRTdGF0dXNlcyIsInN0YXR1c1R5cGUiLCJUSUNLRVRfU1RBVFVTX0lEUyIsImFzc2VydFRpY2tldEVudGl0eSIsIlRpY2tldEVudGl0eSIsImlzT25TYWxlIiwiaXNBcmNoaXZlZCIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJxdHkiLCJpc1BlbmRpbmciLCJnZXRUaWNrZXRTdGF0dXNUZXh0TGFiZWwiLCJ0aWNrZXRTdGF0dXMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FB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TztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsSUFBcUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxVQUFVLEtBQXFDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsSUFBcUM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTSxLQUFxQyw0RkFBNEYsU0FBTTtBQUM3STtBQUNBOztBQUVBLG1CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLGdDQUFnQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5a0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLElBQXFDO0FBQ3pDLGdCQUFnQixtQkFBTyxDQUFDLDBFQUFVOztBQUVsQztBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQU8sQ0FBQyx1RkFBMkI7QUFDdEQsQ0FBQyxNQUFNLEVBSU47Ozs7Ozs7Ozs7Ozs7QUNsQkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7OztBQUliLElBQUksSUFBcUM7QUFDekM7QUFDQTs7QUFFQSw4Q0FBOEMsY0FBYzs7QUFFNUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHNGQUFzRixhQUFhO0FBQ25HO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQUE0RixlQUFlO0FBQzNHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7QUNsT2E7O0FBRWIsSUFBSSxLQUFxQyxFQUFFLEVBRTFDO0FBQ0QsbUJBQW1CLG1CQUFPLENBQUMsa0hBQStCO0FBQzFEOzs7Ozs7Ozs7Ozs7QUNOQSxzQjs7Ozs7Ozs7Ozs7QUNBQSw4Qjs7Ozs7Ozs7Ozs7QUNBQSwyQjs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSwwQjs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSx3Qjs7Ozs7Ozs7Ozs7QUNBQSxvQyIsImZpbGUiOiJlZS1tb2RlbC4wODE2ZjY4ZDE0YzdmNmIzMjY0MS5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvaW5kZXguanNcIik7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgRXhjZXB0aW9uIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgeyBzcHJpbnRmLCBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNBcnJheSwgaXNFbXB0eSwgaXNNYXAgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4ga2V5IGV4aXN0cyBpbiB0aGUgcHJvdmlkZWQgZW50aXR5IG9iamVjdC5cbiAqIFRoaXMgaXMgdXNlZCB3aGVuIGNhbGxpbmcgY29kZSB3YW50cyBhbiBleGNlcHRpb24gdG8gYmUgdGhyb3duLlxuICpcbiAqIEBwYXJhbSB7IHN0cmluZyB9IGtleVxuICogQHBhcmFtIHsgT2JqZWN0IH0gZW50aXR5XG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtZXNzYWdlXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH0gIFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHByb3ZpZGVkIGVudGl0eSBkb2VzIG5vdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGhhdmUgdGhlIGdpdmVuIGtleS5cbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydEVudGl0eUhhc0tleSA9ICgga2V5LCBlbnRpdHksIG1lc3NhZ2UgPSAnJyApID0+IHtcblx0aWYgKCBtZXNzYWdlID09PSAnJyApIHtcblx0XHRtZXNzYWdlID0gc3ByaW50Zihcblx0XHRcdF9fKFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIGVudGl0eSAoJXMpIGRvZXMgbm90IGhhdmUgdGhlIGdpdmVuIHByb3BlcnR5ICglcyknLFxuXHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdFx0KSxcblx0XHRcdGVudGl0eSxcblx0XHRcdGtleSxcblx0XHQpO1xuXHR9XG5cdGlmICggISBlbnRpdHkuaGFzT3duUHJvcGVydHkoIGtleSApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIHBhdGggaW4gdGhlIHByb3ZpZGVkIGltbXV0YWJsZSBvYmplY3QgZXhpc3RzLlxuICogVGhpcyBpcyB1c2VkIHdoZW4gY2FsbGluZyBjb2RlIHdhbnRzIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24gaWYgdGhlIGdpdmVuXG4gKiBzZWFyY2ggcGF0aCBhcnJheSBkb2VzIG5vdCBleGlzdCBpbiB0aGUgaW1tdXRhYmxlIG9iamVjdC5cbiAqXG4gKiBJZiB0aGUgaW1tdXRhYmxlIG9iamVjdCBpcyBzZXR1cCBsaWtlIHRoaXM6XG4gKlxuICogaW1tdXRhYmxlID0gSW1tdXRhYmxlLk1hcCgpLnNldCggJ2V2ZW50JywgSW1tdXRhYmxlLk1hcCgpLnNldCggMTAsIEV2ZW50ICkgKTtcbiAqXG4gKiBUaGVuIGEgdmFsaWQgc2VhcmNoYWJsZSBwYXRoIGNvdWxkIGJlIGBbICdldmVudCcsIDEwIF1gLiAgQW4gaW52YWxpZCBwYXRoXG4gKiB3b3VsZCBiZSBgWyAnZGF0ZXRpbWUnLCAxMCBdYFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGggIFNlYXJjaGFibGUgcGF0aCBmb3IgdGhlIGltbXV0YWJsZSBvamJlY3QgdG8gdmVyaWZ5LlxuICogQHBhcmFtIHtJbW11dGFibGUuTWFwfEltbXV0YWJsZS5TZXR9IGltbXV0YWJsZSAgQW4gaW1tdXRhYmxlIG9iamVjdCAoTWFwLCBTZXQsIExpc3QgZXRjKVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgQSBjdXN0b20gbWVzc2FnZSB0byB1c2UuXG4gKiBAdGhyb3dzIEV4Y2VwdGlvblxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0SW1tdXRhYmxlT2JqZWN0SGFzUGF0aCA9IChcblx0cGF0aCxcblx0aW1tdXRhYmxlLFxuXHRtZXNzYWdlID0gJydcbikgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBzcHJpbnRmKFxuXHRcdFx0X18oXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgaW1tdXRhYmxlIG9iamVjdCAoJXMpIGRvZXMgbm90IGhhdmUgdGhlIGdpdmVuIHBhdGggKCVzKScsXG5cdFx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0XHQpLFxuXHRcdFx0aW1tdXRhYmxlLFxuXHRcdFx0cGF0aCxcblx0XHQpO1xuXHR9XG5cdGlmICggISBpbW11dGFibGUuaGFzSW4oIHBhdGggKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBhcnJheS5cbiAqXG4gKiBAcGFyYW0geyp9IGl0ZW1zXG4gKiBAcGFyYW0geyBzdHJpbmcgfSAgbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9IFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBhblxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LlxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0SXNBcnJheSA9ICggaXRlbXMsIG1lc3NhZ2UgPSAnJyApID0+IHtcblx0aWYgKCBtZXNzYWdlID09PSAnJyApIHtcblx0XHRtZXNzYWdlID0gX18oICdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuIGFycmF5LicsICdldmVudF9lc3ByZXNzbycgKTtcblx0fVxuXHRpZiAoICEgaXNBcnJheSggaXRlbXMgKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGVtcHR5IG9yIG5vdC5cbiAqXG4gKiBDYWxsIHRoaXMgdmFsaWRhdG9yIHdoZW4geW91IHdhbnQgdG8gbWFrZSBzdXJlIHRoZSB2YWx1ZSBpcyBOT1QgZW1wdHkuXG4gKlxuICogQHBhcmFtIHsqfSBpdGVtc1xuICogQHBhcmFtIHsgc3RyaW5nIH0gbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9IFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGVtcHR5LlxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0SXNOb3RFbXB0eSA9ICggaXRlbXMsIG1lc3NhZ2UgPSAnJyApID0+IHtcblx0aWYgKCBtZXNzYWdlID09PSAnJyApIHtcblx0XHRtZXNzYWdlID0gX18oXG5cdFx0XHQnVGhlIHByb3ZpZGVkIGl0ZW1zIG11c3Qgbm90IGJlIGVtcHR5Jyxcblx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0KTtcblx0fVxuXHRpZiAoIGlzRW1wdHkoIGl0ZW1zICkgKSB7XG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbiggbWVzc2FnZSApO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBNYXAgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7Kn0gaXRlbVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0SXNNYXAgPSAoIGl0ZW0sIG1lc3NhZ2UgPSAnJyApID0+IHtcblx0aWYgKCBtZXNzYWdlID09PSAnJyApIHtcblx0XHRtZXNzYWdlID0gX18oXG5cdFx0XHQnVGhlIHByb3ZpZGVkIGl0ZW0gbXVzdCBiZSBhIE1hcCBvYmplY3QnLFxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdCk7XG5cdH1cblx0aWYgKCAhIGlzTWFwKCBpdGVtICkgKSB7XG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbiggbWVzc2FnZSApO1xuXHR9XG59O1xuIiwiZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAnYXR0ZW5kZWUnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9BU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxufSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCB7IFJFR0lTVFJBVElPTl9TVEFUVVNfSURTIH0gZnJvbSAnLi4vcmVnaXN0cmF0aW9uL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRpZDogJ0FUVF9JRCcsXG5cdGxhc3ROYW1lT25seTogJ0FUVF9sbmFtZScsXG5cdGZpcnN0TmFtZU9ubHk6ICdBVFRfZm5hbWUnLFxuXHRmaXJzdFRoZW5MYXN0TmFtZTogWyAnQVRUX2ZuYW1lJywgJ0FUVF9sbmFtZScgXSxcblx0bGFzdFRoZW5GaXJzdE5hbWU6IFsgJ0FUVF9sbmFtZScsICdBVFRfZm5hbWUnIF0sXG59O1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdGZvckV2ZW50SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvckRhdGV0aW1lSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclRpY2tldElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JTdGF0dXNJZDogUHJvcFR5cGVzLm9uZU9mKCBSRUdJU1RSQVRJT05fU1RBVFVTX0lEUyApLFxuXHRmb3JSZWdpc3RyYXRpb25JZDogUHJvcFR5cGVzLm51bWJlcixcblx0c2hvd0dyYXZhdGFyOiBQcm9wVHlwZXMuYm9vbCxcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIE9iamVjdC5rZXlzKCBvcmRlckJ5TWFwICkgKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdsYXN0VGhlbkZpcnN0TmFtZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0FTQyxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkXG4gKiBpbiBhIFJFU1QgcXVlcnkgZnJvbSB0aGUgY29udGV4dCBvZiBhIGF0dGVuZGVlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBcdFx0b3JkZXJCeVxuICogQHJldHVybiB7IHN0cmluZyB9IFx0UmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmdcbiAqIFx0XHRcdFx0XHRcdGZvciB0aGUgUkVTVCBxdWVyeSBmb3IgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiBhdHRlbmRlZXMgZW5kcG9pbnQgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICAgIFx0SUQgb2YgRXZlbnQgdG8gcmV0cmlldmUgYXR0ZW5kZWVzIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvckRhdGV0aW1lSWQgXHRJRCBvZiBEYXRldGltZSB0byByZXRyaWV2ZSBhdHRlbmRlZXMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yVGlja2V0SWQgXHRcdElEIG9mIFRpY2tldCB0byByZXRyaWV2ZSBhdHRlbmRlZXMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yUmVnaXN0cmF0aW9uSWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JTdGF0dXNJZCBcdFx0SUQgb2YgU3RhdHVzIHRvIHJldHJpZXZlIGF0dGVuZGVlcyBmb3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBzaG93R3JhdmF0YXIgXHRCb29sZWFuIHRvZ2dsZSBmb3Igd2hldGhlciB0byBkaXNwbGF5IHVzZXIgR3JhdmF0YXJcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgXHRUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdGZvckRhdGV0aW1lSWQgPSAwLFxuXHRmb3JUaWNrZXRJZCA9IDAsXG5cdGZvclJlZ2lzdHJhdGlvbklkID0gMCxcblx0Zm9yU3RhdHVzSWQgPSAnUkFQJyxcblx0c2hvd0dyYXZhdGFyID0gZmFsc2UsXG59ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXG5cdC8vIGVuc3VyZSB0aGF0IGVudGl0eSBJRHMgYXJlIGludGVnZXJzXG5cdGZvclJlZ2lzdHJhdGlvbklkID0gcGFyc2VJbnQoIGZvclJlZ2lzdHJhdGlvbklkLCAxMCApO1xuXHRmb3JUaWNrZXRJZCA9IHBhcnNlSW50KCBmb3JUaWNrZXRJZCwgMTAgKTtcblx0Zm9yRGF0ZXRpbWVJZCA9IHBhcnNlSW50KCBmb3JEYXRldGltZUlkLCAxMCApO1xuXHRmb3JFdmVudElkID0gcGFyc2VJbnQoIGZvckV2ZW50SWQsIDEwICk7XG5cblx0Ly8gb3JkZXIgb2YgcHJpb3JpdHkgZm9yIHByb3ZpZGVkIGFyZ3VtZW50cy5cblx0aWYgKCBmb3JSZWdpc3RyYXRpb25JZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JSZWdpc3RyYXRpb25JZCApICkge1xuXHRcdHdoZXJlLnB1c2goIGB3aGVyZVtSZWdpc3RyYXRpb24uUkVHX0lEXT0keyBmb3JSZWdpc3RyYXRpb25JZCB9YCApO1xuXHR9IGVsc2UgaWYgKCBmb3JUaWNrZXRJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JUaWNrZXRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goIGB3aGVyZVtSZWdpc3RyYXRpb24uVGlja2V0LlRLVF9JRF09JHsgZm9yVGlja2V0SWQgfWAgKTtcblx0fSBlbHNlIGlmICggZm9yRGF0ZXRpbWVJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JEYXRldGltZUlkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggYHdoZXJlW1JlZ2lzdHJhdGlvbi5UaWNrZXQuRGF0ZXRpbWUuRFRUX0lEXT0keyBmb3JEYXRldGltZUlkIH1gICk7XG5cdH0gZWxzZSBpZiAoIGZvckV2ZW50SWQgIT09IDAgJiYgISBpc05hTiggZm9yRXZlbnRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goIGB3aGVyZVtSZWdpc3RyYXRpb24uRVZUX0lEXT0keyBmb3JFdmVudElkIH1gICk7XG5cdH1cblxuXHRpZiAoIFJFR0lTVFJBVElPTl9TVEFUVVNfSURTLmluY2x1ZGVzKCBmb3JTdGF0dXNJZCApICkge1xuXHRcdHdoZXJlLnB1c2goIGB3aGVyZVtSZWdpc3RyYXRpb24uU3RhdHVzLlNUU19JRF09JHsgZm9yU3RhdHVzSWQgfWAgKTtcblx0fVxuXHRpZiAoIHNob3dHcmF2YXRhciA9PT0gdHJ1ZSApIHtcblx0XHR3aGVyZS5wdXNoKCAnY2FsY3VsYXRlPXVzZXJfYXZhdGFyJyApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCAqIGFzIGRhdGVGb3JtYXRzIGZyb20gJ0BldmVudGVzcHJlc3NvL2hlbHBlcnMnO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgb24gcHJvdmlkZWQgZW50aXRpZXMuICBEb2VzIG5vdCBtdXRhdGUgb3JpZ2luYWxcbiAqIGVudGl0aWVzLlxuICpcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXRpZXMgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgc3RyaW5nIH0gZm9ybWF0ICBUaGUgZm9ybWF0IHRvIHRyYW5zZm9ybSB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgdG8uXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICBXaGV0aGVyIG9yIG5vdCB0byBjb252ZXJ0IHRoZSBkYXRlIGZpZWxkIHZhbHVlXG4gKiAgIHRvIHRoZSBsb2NhbCB0aW1lem9uZSBmb3IgdGhlIGhvc3QuXG4gKiBAcmV0dXJuIHsgQXJyYXkgfSAgUmV0dXJucyBhIG5ldyBhcnJheSBvZiBuZXcgZW50aXRpZXMgd2l0aCB0aGUgZGF0ZSBmaWVsZFxuICogICB2YWx1ZXMgZm9ybWF0dGVkXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlc09uRW50aXRpZXMgPSAoXG5cdGVudGl0aWVzID0gW10sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0Zm9ybWF0ID0gZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9JU084NjAxLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0aWYgKCBpc0VtcHR5KCBlbnRpdGllcyApIHx8IGlzRW1wdHkoIGVudGl0eURhdGVGaWVsZHMgKSApIHtcblx0XHRyZXR1cm4gZW50aXRpZXM7XG5cdH1cblx0Y29uc3QgZm9ybWF0dGVkRW50aXRpZXMgPSBbXTtcblx0ZW50aXRpZXMuZm9yRWFjaCggKCBlbnRpdHkgKSA9PiB7XG5cdFx0Zm9ybWF0dGVkRW50aXRpZXMucHVzaCggZm9ybWF0RGF0ZXNPbkVudGl0eShcblx0XHRcdGVudGl0eSxcblx0XHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0XHRmb3JtYXQsXG5cdFx0XHRsb2NhbCxcblx0XHQpICk7XG5cdH0gKTtcblx0cmV0dXJuIGZvcm1hdHRlZEVudGl0aWVzO1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlIGZpZWxkcyBvbiB0aGUgcHJvdmlkZWQgZW50aXR5LiAgRG9lcyBub3QgbXV0YXRlIG9yaWdpbmFsXG4gKiBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gZW50aXR5ICBBbiBlbnRpdHlcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyAgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBmb3JtYXQgIFRoZSBmb3JtYXQgdG8gdHJhbnNmb3JtIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyB0by5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBPYmplY3QgfSAgUmV0dXJucyBhIG5ldyBlbnRpdHkgd2l0aCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgZm9ybWF0dGVkXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlc09uRW50aXR5ID0gKFxuXHRlbnRpdHkgPSB7fSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRmb3JtYXQgPSBkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX0lTTzg2MDEsXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRjb25zdCBuZXdFbnRpdHkgPSB7IC4uLmVudGl0eSB9O1xuXHRlbnRpdHlEYXRlRmllbGRzLmZvckVhY2goICggZGF0ZUZpZWxkICkgPT4ge1xuXHRcdGlmICggbmV3RW50aXR5WyBkYXRlRmllbGQgXSApIHtcblx0XHRcdG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0gPSBkYXRlRm9ybWF0cy5mb3JtYXREYXRlU3RyaW5nKFxuXHRcdFx0XHRuZXdFbnRpdHlbIGRhdGVGaWVsZCBdLFxuXHRcdFx0XHRmb3JtYXQsXG5cdFx0XHRcdGxvY2FsLFxuXHRcdFx0KTtcblx0XHR9XG5cdH0gKTtcblx0cmV0dXJuIG5ld0VudGl0eTtcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgdG8gbXlzcWwgZm9ybWF0IG9uIHByb3ZpZGVkIGVudGl0aWVzLiAgRG9lcyBub3RcbiAqIG11dGF0ZSBvcmlnaW5hbCBlbnRpdGllcy5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzICBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBBcnJheSB9ICBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIG5ldyBlbnRpdGllcyB3aXRoIHRoZSBkYXRlIGZpZWxkXG4gKiAgIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEVudGl0aWVzRGF0ZXNUb015c3FsID0gKFxuXHRlbnRpdGllcyA9IFtdLFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRyZXR1cm4gZm9ybWF0RGF0ZXNPbkVudGl0aWVzKFxuXHRcdGVudGl0aWVzLFxuXHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0ZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9NWVNRTCxcblx0XHRsb2NhbCxcblx0KTtcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgdG8gbXlzcWwgZm9ybWF0IG9uIHByb3ZpZGVkIGVudGl0eS4gIERvZXMgbm90XG4gKiBtdXRhdGUgb3JpZ2luYWwgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGVudGl0eSAgQW4gYXJyYXkgb2YgZW50aXR5IG9iamVjdHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyAgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICBXaGV0aGVyIG9yIG5vdCB0byBjb252ZXJ0IHRoZSBkYXRlIGZpZWxkIHZhbHVlXG4gKiAgIHRvIHRoZSBsb2NhbCB0aW1lem9uZSBmb3IgdGhlIGhvc3QuXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gIFJldHVybnMgYSBuZXcgZW50aXR5IHdpdGggdGhlIGRhdGUgZmllbGQgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RW50aXR5RGF0ZXNUb015c3FsID0gKFxuXHRlbnRpdHkgPSB7fSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0cmV0dXJuIGZvcm1hdERhdGVzT25FbnRpdHkoXG5cdFx0ZW50aXR5LFxuXHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0ZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9NWVNRTCxcblx0XHRsb2NhbCxcblx0KTtcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgdG8gdGhlIHNpdGUgZm9ybWF0IG9uIHByb3ZpZGVkIGVudGl0aWVzLiAgRG9lcyBub3RcbiAqIG11dGF0ZSBvcmlnaW5hbCBlbnRpdGllcy5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzICBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBBcnJheSB9ICBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIG5ldyBlbnRpdGllcyB3aXRoIHRoZSBkYXRlIGZpZWxkXG4gKiAgIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEVudGl0aWVzRGF0ZXNUb1NpdGUgPSAoXG5cdGVudGl0aWVzID0gW10sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0bG9jYWwgPSB0cnVlLFxuKSA9PiB7XG5cdHJldHVybiBmb3JtYXREYXRlc09uRW50aXRpZXMoXG5cdFx0ZW50aXRpZXMsXG5cdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHRkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX1NJVEUsXG5cdFx0bG9jYWwsXG5cdCk7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIHRvIHRoZSBzaXRlIGZvcm1hdCBvbiBwcm92aWRlZCBlbnRpdHkuICBEb2VzIG5vdFxuICogbXV0YXRlIG9yaWdpbmFsIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHkgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IE9iamVjdCB9ICBSZXR1cm5zIGEgbmV3IGVudGl0eSB3aXRoIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEVudGl0eURhdGVzVG9TaXRlID0gKFxuXHRlbnRpdHkgPSB7fSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0cmV0dXJuIGZvcm1hdERhdGVzT25FbnRpdHkoXG5cdFx0ZW50aXR5LFxuXHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0ZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9TSVRFLFxuXHRcdGxvY2FsLFxuXHQpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBkYXRlIGZpZWxkIHZhbHVlcyB0byBtb21lbnQgb2JqZWN0cyBmb3IgdGhlIHByb3ZpZGVkIGVudGl0aWVzLlxuICogRG9lcyBub3QgbXV0YXRlIG9yaWdpbmFsIGVudGl0aWVzLlxuICpcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXRpZXMgQW4gYXJyYXkgb2YgZW50aXR5IG9iamVjdHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEByZXR1cm4geyBBcnJheSB9IFJldHVybnMgYSBuZXcgYXJyYXkgb2YgbmV3IGVudGl0aWVzIHdpdGggdGhlIGRhdGUgZmllbGRcbiAqICAgdmFsdWVzIGNvbnZlcnRlZCB0byBtb21lbnQgb2JqZWN0cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRFbnRpdGllc0RhdGVzVG9Nb21lbnQgPSAoXG5cdGVudGl0aWVzID0gW10sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcbikgPT4ge1xuXHRpZiAoIGlzRW1wdHkoIGVudGl0aWVzICkgfHwgaXNFbXB0eSggZW50aXR5RGF0ZUZpZWxkcyApICkge1xuXHRcdHJldHVybiBlbnRpdGllcztcblx0fVxuXHRjb25zdCBmb3JtYXR0ZWRFbnRpdGllcyA9IFtdO1xuXHRlbnRpdGllcy5mb3JFYWNoKCAoIGVudGl0eSApID0+IHtcblx0XHRmb3JtYXR0ZWRFbnRpdGllcy5wdXNoKCBjb252ZXJ0RW50aXR5RGF0ZXNUb01vbWVudChcblx0XHRcdGVudGl0eSxcblx0XHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0KSApO1xuXHR9ICk7XG5cdHJldHVybiBmb3JtYXR0ZWRFbnRpdGllcztcbn07XG5cbi8qKlxuICogQ29udmVydHMgZGF0ZSBmaWVsZCB2YWx1ZXMgdG8gbW9tZW50IG9iamVjdHMgZm9yIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKiBEb2VzIG5vdCBtdXRhdGUgb3JpZ2luYWwgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGVudGl0eSBBbiBlbnRpdHkuXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gUmV0dXJucyBhIG5ldyBlbnRpdHkgd2l0aCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgY29udmVydGVkXG4gKiAgIHRvIG1vbWVudCBvYmplY3RzLlxuICovXG5leHBvcnQgY29uc3QgY29udmVydEVudGl0eURhdGVzVG9Nb21lbnQgPSAoXG5cdGVudGl0eSA9IHt9LFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG4pID0+IHtcblx0Y29uc3QgbmV3RW50aXR5ID0geyAuLi5lbnRpdHkgfTtcblx0ZW50aXR5RGF0ZUZpZWxkcy5mb3JFYWNoKCAoIGRhdGVGaWVsZCApID0+IHtcblx0XHRpZiAoIG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0gKSB7XG5cdFx0XHRuZXdFbnRpdHlbIGRhdGVGaWVsZCBdID0gZGF0ZUZvcm1hdHMuc3RyaW5nVG9Nb21lbnQoXG5cdFx0XHRcdG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0sXG5cdFx0XHQpO1xuXHRcdH1cblx0fSApO1xuXHRyZXR1cm4gbmV3RW50aXR5O1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0FycmF5LCBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBRVUVSWV9PUkRFUl9BU0MgPSAnQVNDJztcbmV4cG9ydCBjb25zdCBRVUVSWV9PUkRFUl9ERVNDID0gJ0RFU0MnO1xuZXhwb3J0IGNvbnN0IEFMTE9XRURfT1JERVJfVkFMVUVTID0gWyAnYXNjJywgJ2Rlc2MnLCAnQVNDJywgJ0RFU0MnIF07XG5leHBvcnQgY29uc3QgR1JFQVRFUl9USEFOID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPicgKTtcbmV4cG9ydCBjb25zdCBMRVNTX1RIQU4gPSBlbmNvZGVVUklDb21wb25lbnQoICc8JyApO1xuZXhwb3J0IGNvbnN0IEdSRUFURVJfVEhBTl9BTkRfRVFVQUwgPSBlbmNvZGVVUklDb21wb25lbnQoICc+PScgKTtcbmV4cG9ydCBjb25zdCBMRVNTX1RIQU5fQU5EX0VRVUFMID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPD0nICk7XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcGFyYW0geyBmdW5jdGlvbiB9IHdoZXJlQ29uZGl0aW9ucyAgQSBmdW5jdGlvbiBmb3IgcHJlcHBpbmcgdGhlIHdoZXJlXG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbmRpdGlvbnMgZnJvbSB0aGUgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgZnVuY3Rpb24gfSBtYXBPcmRlckJ5XHRcdEEgZnVuY3Rpb24gZm9yIG1hcHBpbmcgaW5jb21pbmcgb3JkZXJfYnlcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0c3RyaW5ncyB0byB0aGUgdmFsdWUgbmVlZGVkIGZvciB0aGVcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0cXVlcnlfc3RyaW5nLlxuICogQHJldHVybiB7IHN0cmluZyB9ICBcdFx0XHRcdFx0UmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoXG5cdHF1ZXJ5RGF0YSA9IHt9LFxuXHR3aGVyZUNvbmRpdGlvbnMgPSAoKSA9PiBudWxsLFxuXHRtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4gb3JkZXJCeSxcbikgPT4ge1xuXHRjb25zdCB3aGVyZSA9IHdoZXJlQ29uZGl0aW9ucyggcXVlcnlEYXRhICk7XG5cdGNvbnN0IHsgbGltaXQsIG9yZGVyLCBvcmRlckJ5LCBkZWZhdWx0V2hlcmVDb25kaXRpb25zIH0gPSBxdWVyeURhdGE7XG5cdGNvbnN0IHF1ZXJ5UGFyYW1zID0gW107XG5cdGlmICggISBpc1VuZGVmaW5lZCggbGltaXQgKSApIHtcblx0XHRxdWVyeVBhcmFtcy5wdXNoKCBgbGltaXQ9JHsgbGltaXQgfWAgKTtcblx0fVxuXHRpZiAoICEgaXNVbmRlZmluZWQoIGRlZmF1bHRXaGVyZUNvbmRpdGlvbnMgKSApIHtcblx0XHRxdWVyeVBhcmFtcy5wdXNoKFxuXHRcdFx0YGRlZmF1bHRfd2hlcmVfY29uZGl0aW9ucz0keyBkZWZhdWx0V2hlcmVDb25kaXRpb25zIH1gXG5cdFx0KTtcblx0fVxuXHRpZiAoICEgaXNVbmRlZmluZWQoIG1hcE9yZGVyQnkoIG9yZGVyQnkgKSApICkge1xuXHRcdGlmICggaXNBcnJheSggbWFwT3JkZXJCeSggb3JkZXJCeSApICkgKSB7XG5cdFx0XHRmb3IgKCBjb25zdCBmaWVsZCBvZiBtYXBPcmRlckJ5KCBvcmRlckJ5ICkgKSB7XG5cdFx0XHRcdHF1ZXJ5UGFyYW1zLnB1c2goIGBvcmRlcl9ieVskeyBmaWVsZCB9XT0keyBvcmRlciB9YCApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRxdWVyeVBhcmFtcy5wdXNoKCBgb3JkZXI9JHsgb3JkZXIgfWAgKTtcblx0XHRcdHF1ZXJ5UGFyYW1zLnB1c2goIGBvcmRlcl9ieT0keyBtYXBPcmRlckJ5KCBvcmRlckJ5ICkgfWAgKTtcblx0XHR9XG5cdH1cblx0bGV0IHF1ZXJ5U3RyaW5nID0gcXVlcnlQYXJhbXMuam9pbiggJyYnICk7XG5cdGlmICggd2hlcmUgKSB7XG5cdFx0cXVlcnlTdHJpbmcgKz0gJyYnICsgd2hlcmU7XG5cdH1cblx0cmV0dXJuIHF1ZXJ5U3RyaW5nO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdjaGVja2luJztcblxuZXhwb3J0IGNvbnN0IENIRUNLSU5fU1RBVFVTX0lEID0ge1xuXHRTVEFUVVNfQ0hFQ0tFRF9PVVQ6IGZhbHNlLFxuXHRTVEFUVVNfQ0hFQ0tFRF9JTjogdHJ1ZSxcblx0U1RBVFVTX0NIRUNLRURfTkVWRVI6IDIsXG59O1xuXG5leHBvcnQgY29uc3QgQ0hFQ0tJTl9TVEFUVVNfSURTID0gdmFsdWVzKFxuXHRDSEVDS0lOX1NUQVRVU19JRFxuKTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBwcmV0dHlTdGF0dXMgfSBmcm9tICcuLi9zdGF0dXMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcbn0gZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgKiBhcyBjaGVja2luU3RhdHVzIGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRmb3JEYXRldGltZUlkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JFdmVudElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JSZWdpc3RyYXRpb25JZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yVGlja2V0SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclN0YXR1c0lkOiBQcm9wVHlwZXMub25lT2YoIGNoZWNraW5TdGF0dXMuQ0hFQ0tJTl9TVEFUVVNfSURTICksXG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0XHQnQ0hLX0lEJyxcblx0XHRcdCdSRUdfSUQnLFxuXHRcdFx0J0NIS190aW1lc3RhbXAnLFxuXHRcdFx0J0RUVF9JRCcsXG5cdFx0XSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdH0gKSxcbn07XG5cbmV4cG9ydCBjb25zdCBvcHRpb25zRW50aXR5TWFwID0ge1xuXHRkZWZhdWx0OiAoKSA9PiB7XG5cdFx0cmV0dXJuIFtcblx0XHRcdHtcblx0XHRcdFx0bGFiZWw6IHByZXR0eVN0YXR1cyhcblx0XHRcdFx0XHRjaGVja2luU3RhdHVzLkNIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX09VVFxuXHRcdFx0XHQpLFxuXHRcdFx0XHR2YWx1ZTogY2hlY2tpblN0YXR1cy5DSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9PVVQsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJlbDogcHJldHR5U3RhdHVzKFxuXHRcdFx0XHRcdGNoZWNraW5TdGF0dXMuQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfSU5cblx0XHRcdFx0KSxcblx0XHRcdFx0dmFsdWU6IGNoZWNraW5TdGF0dXMuQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfSU4sXG5cdFx0XHR9LFxuXHRcdF07XG5cdH0sXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdDSEtfdGltZXN0YW1wJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhIHJlZ2lzdHJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0dGltZXN0YW1wOiAnQ0hLX3RpbWVzdGFtcCcsXG5cdFx0aWQ6ICdDSEtfSUQnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiByZWdpc3RyYXRpb25zIGVuZHBvaW50IHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRGF0ZXRpbWVJZCAgICBcdElEIG9mIEV2ZW50IHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRXZlbnRJZCAgICBJRCBvZiBBdHRlbmRlZSB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvclJlZ2lzdHJhdGlvbklkIElEIG9mIFRyYW5zYWN0aW9uIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yVGlja2V0SWQgXHRcdElEIG9mIFRpY2tldCB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtzdHJpbmd9IGZvclN0YXR1c0lkIFx0XHRJRCBvZiBTdGF0dXMgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgXHRUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRGF0ZXRpbWVJZCA9IDAsXG5cdGZvckV2ZW50SWQgPSAwLFxuXHRmb3JSZWdpc3RyYXRpb25JZCA9IDAsXG5cdGZvclRpY2tldElkID0gMCxcblx0Zm9yU3RhdHVzSWQgPSAnJyxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cdGZvckV2ZW50SWQgPSBwYXJzZUludCggZm9yRXZlbnRJZCwgMTAgKTtcblx0aWYgKCBmb3JFdmVudElkICE9PSAwICYmICEgaXNOYU4oIGZvckV2ZW50SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbUmVnaXN0cmF0aW9uLkVWVF9JRF09JyArIGZvckV2ZW50SWQgKTtcblx0fVxuXHRmb3JEYXRldGltZUlkID0gcGFyc2VJbnQoIGZvckRhdGV0aW1lSWQsIDEwICk7XG5cdGlmICggZm9yRGF0ZXRpbWVJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JEYXRldGltZUlkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0RUVF9JRF09JyArIGZvckRhdGV0aW1lSWQgKTtcblx0fVxuXHRmb3JSZWdpc3RyYXRpb25JZCA9IHBhcnNlSW50KCBmb3JSZWdpc3RyYXRpb25JZCwgMTAgKTtcblx0aWYgKCBmb3JSZWdpc3RyYXRpb25JZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JSZWdpc3RyYXRpb25JZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtSRUdfSURdPScgKyBmb3JSZWdpc3RyYXRpb25JZCApO1xuXHR9XG5cdGZvclRpY2tldElkID0gcGFyc2VJbnQoIGZvclRpY2tldElkLCAxMCApO1xuXHRpZiAoIGZvclRpY2tldElkICE9PSAwICYmICEgaXNOYU4oIGZvclRpY2tldElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1JlZ2lzdHJhdGlvbi5US1RfSURdPScgKyBmb3JUaWNrZXRJZCApO1xuXHR9XG5cdGlmICggZm9yU3RhdHVzSWQgIT09ICcnICYmIGZvclN0YXR1c0lkICE9PSBudWxsICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtDSEtfaW5dPScgKyBmb3JTdGF0dXNJZCApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwiaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAnZGF0ZXRpbWUnO1xuXG5leHBvcnQgY29uc3QgREFURVRJTUVfU1RBVFVTX0lEID0ge1xuXHRBQ1RJVkU6ICdEVEEnLFxuXHRDQU5DRUxMRUQ6ICdEVEMnLFxuXHRFWFBJUkVEOiAnRFRFJyxcblx0SU5BQ1RJVkU6ICdEVEknLFxuXHRQT1NUUE9ORUQ6ICdEVFAnLFxuXHRTT0xEX09VVDogJ0RUUycsXG5cdFRSQVNIRUQ6ICdEVFQnLFxuXHRVUENPTUlORzogJ0RUVScsXG59O1xuXG5leHBvcnQgY29uc3QgREFURVRJTUVfU1RBVFVTX0lEUyA9IHZhbHVlcyggREFURVRJTUVfU1RBVFVTX0lEICk7XG5cbmV4cG9ydCBjb25zdCBNSU5VVEVfSU5fU0VDT05EUyA9IDYwO1xuZXhwb3J0IGNvbnN0IEhPVVJfSU5fU0VDT05EUyA9IE1JTlVURV9JTl9TRUNPTkRTICogNjA7XG5leHBvcnQgY29uc3QgREFZX0lOX1NFQ09ORFMgPSBIT1VSX0lOX1NFQ09ORFMgKiAyNDtcbmV4cG9ydCBjb25zdCBXRUVLX0lOX1NFQ09ORFMgPSBIT1VSX0lOX1NFQ09ORFMgKiA3O1xuZXhwb3J0IGNvbnN0IE1PTlRIX0lOX1NFQ09ORFMgPSBEQVlfSU5fU0VDT05EUyAqIDMwO1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCAqIGFzIGJhc2VGb3JtYXR0ZXIgZnJvbSAnLi4vYmFzZS1kYXRlLWZvcm1hdHRlcic7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBmb3JPd24sIHB1bGxBdCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge1xuXHRUSU1FX0ZPUk1BVF9TSVRFLFxuXHREQVRFX1RJTUVfRk9STUFUX1NJVEUsXG5cdGFsbERhdGVUaW1lc0FzU3RyaW5nLFxuXHRTRVBBUkFUT1JfU1BBQ0VfREFTSF9TUEFDRSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaGVscGVycyc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEFycmF5IG9mIGZpZWxkcyB0aGF0IGhhdmUgZGF0ZSBpbmZvcm1hdGlvblxuICogQHR5cGUgeyBzdHJpbmdbXSB9XG4gKi9cbmV4cG9ydCBjb25zdCBEQVRFX0ZJRUxEUyA9IFtcblx0J0RUVF9FVlRfc3RhcnQnLFxuXHQnRFRUX0VWVF9lbmQnLFxuXTtcblxuLyoqXG4gKiBXaWxsIGhvbGQgdGhlIGR5bmFtaWNhbGx5IGdlbmVyYXRlZCBsaXN0IG9mIGZvcm1hdHRlcnMgZm9yIGRhdGVzLiAgRm9ybWF0dGVyc1xuICogYXJlIGZ1bmN0aW9ucyBkZWZpbmVkIGluIGAuLi9iYXNlLWRhdGUtZm9ybWF0dGVyYCBidXQgd3JhcHBlZCBieSBkeW5hbWljYWxseVxuICogZ2VuZXJhdGVkIGZ1bmN0aW9ucyAoY2FsbGFibGUgdmlhIHNhbWUgbmFtZSkgdGhhdCBhdXRvbWF0aWNhbGx5IHJlY2VpdmUgdGhlXG4gKiBjb3JyZWN0IGRhdGVGaWVsZHNNYXAgYXJndW1lbnQuXG4gKlxuICogRWcuICBgLi4vYmFzZS1kYXRlLWZvcm1hdHRlciBoYXNcbiAqIGZvcm1hdERhdGVzT25FbnRpdGllcyggZW50aXRpZXMsIGVudGl0eURhdGVGaWVsZHMsIGZvcm1hdCwgbG9jYWwgKTtcbiAqIFdoZW4gaW1wb3J0aW5nIGBmb3JtYXREYXRlc09uRW50aXRpZXNgIGZyb20gdGhpcyBmaWxlLCB5b3UgY2FuIGNhbGwgaXQgc2ltcGx5XG4gKiBieSBkb2luZyB0aGlzOlxuICpcbiAqIGZvcm1hdERhdGVzT25FbnRpdGllcyggZGF0ZVRpbWVPYmplY3RzLCBmb3JtYXQsIGxvY2FsICk7XG4gKlxuICogTm90aWNlIHRoYXQgaXQncyBjYWxsZWQgd2l0aG91dCB0aGUgZW50aXR5RGF0ZUZpZWxkcyBhcmd1bWVudCBiZWNhdXNlIHRoYXQnc1xuICogcHJvdmlkZWQgYnkgdGhpcyBnZW5lcmF0b3IuXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBmb3JtYXR0ZXJzID0ge307XG5cbmZvck93biggYmFzZUZvcm1hdHRlciwgKCBpbXBsZW1lbnRhdGlvbiwgZnVuY3Rpb25OYW1lICkgPT4ge1xuXHRmb3JtYXR0ZXJzWyBmdW5jdGlvbk5hbWUgXSA9ICggLi4uaW5jb21pbmdBcmdzICkgPT4ge1xuXHRcdGNvbnN0IGZpcnN0QXJnID0gcHVsbEF0KCBpbmNvbWluZ0FyZ3MsIDAgKTtcblx0XHRyZXR1cm4gaW1wbGVtZW50YXRpb24oIGZpcnN0QXJnWyAwIF0sIERBVEVfRklFTERTLCAuLi5pbmNvbWluZ0FyZ3MgKTtcblx0fTtcbn0gKTtcblxuLyoqXG4gKiBUaGlzIHdpbGwgc3BpdCBvdXQgYSBwcmV0dGlmaWVkIGxhYmVsIGZvciB0aGUgcHJvdmlkZWQgRGF0ZVRpbWUgZW50aXR5LlxuICpcbiAqIElmIHRoZXJlIGlzIGEgRFRUX25hbWUsIHRoZSBmb3JtYXQgd2lsbCBiZTpcbiAqIGBEVFRfbmFtZSAoRFRUX0VWVF9zdGFydCAtIERUVF9FVlRfZW5kKWBcbiAqXG4gKiBJZiBubyBEVFRfbmFtZSB0aGVuOlxuICogYERUVF9FVlRfc3RhcnQgLSBEVFRfRVZUX2VuZGBcbiAqXG4gKiBUaGlzIHdpbGwgYWNjb3VudCBmb3IgaWYgYm90aCBzdGFydCBhbmQgZW5kIGFyZSBpbiB0aGUgc2FtZSBkYXkgYW5kIHNpbXBseVxuICogdXNlIHRpbWUgZm9yIHRoZSBlbmQgcGFydC5cbiAqXG4gKiBAcGFyYW0geyBCYXNlRW50aXR5IH0gRGF0ZVRpbWVFbnRpdHlcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgQSBmb3JtYXR0ZWQgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcHJvdmlkZWRcbiAqICAgIERhdGVUaW1lRW50aXR5LlxuICovXG5leHBvcnQgY29uc3QgcHJldHR5RGF0ZUZyb21EYXRlVGltZSA9ICggRGF0ZVRpbWVFbnRpdHkgKSA9PiB7XG5cdGxldCBjb250ZW50ID0gJyc7XG5cdGlmICggaXNNb2RlbEVudGl0eU9mTW9kZWwoIERhdGVUaW1lRW50aXR5LCAnZGF0ZXRpbWUnICkgKSB7XG5cdFx0aWYgKCBEYXRlVGltZUVudGl0eS5EVFRfRVZUX3N0YXJ0Lmhhc1NhbWUoXG5cdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX2VuZCxcblx0XHRcdCdkYXknXG5cdFx0KSApIHtcblx0XHRcdGNvbnRlbnQgKz0gYWxsRGF0ZVRpbWVzQXNTdHJpbmcoXG5cdFx0XHRcdFNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFLFxuXHRcdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX3N0YXJ0LnRvRm9ybWF0KFxuXHRcdFx0XHRcdERBVEVfVElNRV9GT1JNQVRfU0lURVxuXHRcdFx0XHQpLFxuXHRcdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX2VuZC50b0Zvcm1hdChcblx0XHRcdFx0XHRUSU1FX0ZPUk1BVF9TSVRFXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb250ZW50ICs9IGFsbERhdGVUaW1lc0FzU3RyaW5nKFxuXHRcdFx0XHRTRVBBUkFUT1JfU1BBQ0VfREFTSF9TUEFDRSxcblx0XHRcdFx0RGF0ZVRpbWVFbnRpdHkuRFRUX0VWVF9zdGFydC50b0Zvcm1hdChcblx0XHRcdFx0XHREQVRFX1RJTUVfRk9STUFUX1NJVEVcblx0XHRcdFx0KSxcblx0XHRcdFx0RGF0ZVRpbWVFbnRpdHkuRFRUX0VWVF9lbmQudG9Gb3JtYXQoXG5cdFx0XHRcdFx0REFURV9USU1FX0ZPUk1BVF9TSVRFXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRjb250ZW50ID0gRGF0ZVRpbWVFbnRpdHkuRFRUX25hbWUgP1xuXHRcdFx0YCR7IERhdGVUaW1lRW50aXR5LkRUVF9uYW1lIH0gKCR7IGNvbnRlbnQgfSlgIDpcblx0XHRcdGNvbnRlbnQ7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtYXR0ZXJzO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG5leHBvcnQgKiBmcm9tICcuL2Zvcm1hdHRlcic7XG5leHBvcnQgKiBmcm9tICcuL3N0YXR1cy1oZWxwZXInO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfREVTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG5cdEdSRUFURVJfVEhBTixcblx0R1JFQVRFUl9USEFOX0FORF9FUVVBTCxcblx0TEVTU19USEFOX0FORF9FUVVBTCxcbn0gZnJvbSAnLi4vYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBub3dEYXRlQW5kVGltZSA9IG1vbWVudCgpO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0XHQnRFRUX25hbWUnLFxuXHRcdFx0J0RUVF9JRCcsXG5cdFx0XHQnc3RhcnRfZGF0ZScsXG5cdFx0XHQnZW5kX2RhdGUnLFxuXHRcdF0gKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHRcdHNob3dFeHBpcmVkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRtb250aDogUHJvcFR5cGVzLm1vbnRoLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0XHRzaG93RXhwaXJlZDogYm9vbGVhblxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDEwMCxcblx0XHRvcmRlckJ5OiAnc3RhcnRfZGF0ZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdFx0c2hvd0V4cGlyZWQ6IGZhbHNlLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGFuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHRzdGFydF9kYXRlOiAnRFRUX0VWVF9zdGFydCcsXG5cdFx0ZW5kX2RhdGU6ICdEVFRfRVZUX2VuZCcsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIGV2ZW50cyBlbmRwb2ludCByZXF1ZXN0IHVzaW5nIHByb3ZpZGVkXG4gKiBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRXZlbnRJZCAgSUQgZm9yIEV2ZW50IHRvIHJldHJpZXZlIGRhdGV0aW1lcyBmcm9tXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3dFeHBpcmVkICBXaGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIGV4cGlyZWQgZXZlbnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IG1vbnRoICAgICAgICAgUmV0dXJuIGV2ZW50cyBmb3IgdGhlIGdpdmVuIG1vbnRoLiAgQ2FuIGJlIGFueVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBhbnkgbW9udGggZm9ybWF0IHJlY29nbml6ZWQgYnkgbW9tZW50LlxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICBUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdHNob3dFeHBpcmVkID0gZmFsc2UsXG5cdG1vbnRoID0gJ25vbmUnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0aWYgKCAhIHNob3dFeHBpcmVkICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRFRUX0VWVF9lbmQqKmV4cGlyZWRdW109JyArIEdSRUFURVJfVEhBTiArXG5cdFx0XHQnJndoZXJlW0RUVF9FVlRfZW5kKipleHBpcmVkXVtdPScgK1xuXHRcdFx0bm93RGF0ZUFuZFRpbWUubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0aWYgKCBtb250aCAmJiBtb250aCAhPT0gJ25vbmUnICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRFRUX0VWVF9zdGFydF1bXT0nICsgR1JFQVRFUl9USEFOX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW0RUVF9FVlRfc3RhcnRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5zdGFydE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEVFRfRVZUX2VuZF1bXT0nICsgTEVTU19USEFOX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW0RUVF9FVlRfZW5kXVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuZW5kT2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRpZiAoIHBhcnNlSW50KCBmb3JFdmVudElkLCAxMCApICE9PSAwICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtFdmVudC5FVlRfSURdPScgKyBmb3JFdmVudElkICk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IERBVEVUSU1FX1NUQVRVU19JRCwgTU9ERUxfTkFNRSwgTU9OVEhfSU5fU0VDT05EUyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAqL1xuY29uc3QgYXNzZXJ0RGF0ZVRpbWVFbnRpdHkgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuXHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIERhdGVUaW1lRW50aXR5LCBNT0RFTF9OQU1FICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdCdUaGUgcHJvdmlkZWQgZW50aXR5IGlzIG5vdCBhIGRhdGV0aW1lIGluc3RhbmNlJ1xuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGV2ZW50IGRhdGUgaXMgb2NjdXJyaW5nIE5PV1xuICovXG5leHBvcnQgY29uc3QgaXNBY3RpdmUgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuXHRhc3NlcnREYXRlVGltZUVudGl0eSggRGF0ZVRpbWVFbnRpdHkgKTtcblx0cmV0dXJuIERhdGVUaW1lRW50aXR5LnN0YXJ0LmRpZmZOb3coKS5hc1NlY29uZHMoKSA8IDAgJiZcblx0XHREYXRlVGltZUVudGl0eS5lbmQuZGlmZk5vdygpLmFzU2Vjb25kcygpID4gMDtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGVuZCBkYXRlIGlzIGluIHRoZSBwYXN0XG4gKi9cbmV4cG9ydCBjb25zdCBpc0V4cGlyZWQgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuXHRhc3NlcnREYXRlVGltZUVudGl0eSggRGF0ZVRpbWVFbnRpdHkgKTtcblx0cmV0dXJuIERhdGVUaW1lRW50aXR5LmVuZC5kaWZmTm93KCkuYXNTZWNvbmRzKCkgPCAwO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZW5kIGRhdGUgaXMgaW4gdGhlIHBhc3RcbiAqL1xuZXhwb3J0IGNvbnN0IGlzUmVjZW50bHlFeHBpcmVkID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcblx0YXNzZXJ0RGF0ZVRpbWVFbnRpdHkoIERhdGVUaW1lRW50aXR5ICk7XG5cdHJldHVybiBEYXRlVGltZUVudGl0eS5lbmQuZGlmZk5vdygpLmFzU2Vjb25kcygpIDwgMCAmJlxuXHRcdERhdGVUaW1lRW50aXR5LmVuZC5kaWZmTm93KCkuYXNTZWNvbmRzKCkgPiAoIE1PTlRIX0lOX1NFQ09ORFMgKiAtMSApO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGlja2V0cyBzb2xkIG1lZXRzIG9yIGV4Y2VlZHMgcmVnaXN0cmF0aW9uIGxpbWl0XG4gKi9cbmV4cG9ydCBjb25zdCBpc1NvbGRPdXQgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuXHRhc3NlcnREYXRlVGltZUVudGl0eSggRGF0ZVRpbWVFbnRpdHkgKTtcblx0Y29uc3QgY2FwID0gRGF0ZVRpbWVFbnRpdHkucmVnTGltaXQ7XG5cdHJldHVybiAoIGNhcCAhPT0gbnVsbCAmJiBjYXAgIT09ICdJTkYnICYmIGNhcCAhPT0gSW5maW5pdHkgKSAmJlxuXHRcdERhdGVUaW1lRW50aXR5LnNvbGQgPj0gY2FwO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgc3RhcnQgZGF0ZSBpcyBpbiB0aGUgZnV0dXJlXG4gKi9cbmV4cG9ydCBjb25zdCBpc1VwY29taW5nID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcblx0YXNzZXJ0RGF0ZVRpbWVFbnRpdHkoIERhdGVUaW1lRW50aXR5ICk7XG5cdHJldHVybiBEYXRlVGltZUVudGl0eS5zdGFydC5kaWZmTm93KCkuYXNTZWNvbmRzKCkgPiAwO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGlja2V0IGlzIGFyY2hpdmVkXG4gKi9cbmV4cG9ydCBjb25zdCBpc1RyYXNoZWQgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuXHRhc3NlcnREYXRlVGltZUVudGl0eSggRGF0ZVRpbWVFbnRpdHkgKTtcblx0cmV0dXJuIERhdGVUaW1lRW50aXR5LmRlbGV0ZWQ7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuICogQHJldHVybiB7c3RyaW5nfSBzdGF0dXMgSURcbiAqL1xuZXhwb3J0IGNvbnN0IHN0YXR1cyA9ICggRGF0ZVRpbWVFbnRpdHkgKSA9PiB7XG5cdGFzc2VydERhdGVUaW1lRW50aXR5KCBEYXRlVGltZUVudGl0eSApO1xuXHRpZiAoIGlzVHJhc2hlZCggRGF0ZVRpbWVFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gREFURVRJTUVfU1RBVFVTX0lELlRSQVNIRUQ7XG5cdH1cblx0aWYgKCBpc0V4cGlyZWQoIERhdGVUaW1lRW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIERBVEVUSU1FX1NUQVRVU19JRC5FWFBJUkVEO1xuXHR9XG5cdGlmICggaXNTb2xkT3V0KCBEYXRlVGltZUVudGl0eSApICkge1xuXHRcdHJldHVybiBEQVRFVElNRV9TVEFUVVNfSUQuU09MRF9PVVQ7XG5cdH1cblx0aWYgKCBpc1VwY29taW5nKCBEYXRlVGltZUVudGl0eSApICkge1xuXHRcdHJldHVybiBEQVRFVElNRV9TVEFUVVNfSUQuVVBDT01JTkc7XG5cdH1cblx0aWYgKCBpc0FjdGl2ZSggRGF0ZVRpbWVFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gREFURVRJTUVfU1RBVFVTX0lELkFDVElWRTtcblx0fVxuXHRyZXR1cm4gREFURVRJTUVfU1RBVFVTX0lELklOQUNUSVZFO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgQ1NTIGNsYXNzIGZvciB0aGUgYmFja2dyb3VuZCBjb2xvclxuICovXG5leHBvcnQgY29uc3Qgc3RhdHVzQ29sb3JDbGFzcyA9ICggRGF0ZVRpbWVFbnRpdHkgKSA9PiB7XG5cdHN3aXRjaCAoIHN0YXR1cyggRGF0ZVRpbWVFbnRpdHkgKSApIHtcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5BQ1RJVkUgOlxuXHRcdFx0cmV0dXJuICdncmVlbic7XG5cdFx0Y2FzZSBEQVRFVElNRV9TVEFUVVNfSUQuQ0FOQ0VMTEVEIDpcblx0XHRcdHJldHVybiAncmVkJztcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5FWFBJUkVEIDpcblx0XHRcdHJldHVybiAnbGl0ZS1ncmV5Jztcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5JTkFDVElWRSA6XG5cdFx0XHRyZXR1cm4gJ2RhcmstYmx1ZSc7XG5cdFx0Y2FzZSBEQVRFVElNRV9TVEFUVVNfSUQuUE9TVFBPTkVEIDpcblx0XHRcdHJldHVybiAncHVycGxlJztcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5TT0xEX09VVCA6XG5cdFx0XHRyZXR1cm4gJ2dvbGQnO1xuXHRcdGNhc2UgREFURVRJTUVfU1RBVFVTX0lELlRSQVNIRUQgOlxuXHRcdFx0cmV0dXJuICdkYXJrLWdyZXknO1xuXHRcdGNhc2UgREFURVRJTUVfU1RBVFVTX0lELlVQQ09NSU5HIDpcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuICdibHVlJztcblx0fVxufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgQ1NTIGNsYXNzIGZvciB0aGUgYmFja2dyb3VuZCBjb2xvclxuICovXG5leHBvcnQgY29uc3QgZ2V0QmFja2dyb3VuZENvbG9yQ2xhc3MgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuXHRyZXR1cm4gYGVlLSR7IHN0YXR1c0NvbG9yQ2xhc3MoIERhdGVUaW1lRW50aXR5ICkgfS1iYWNrZ3JvdW5kYDtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gYm9yZGVyICdhbGwnLCAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J1xuICogQHJldHVybiB7c3RyaW5nfSAgICBDU1MgY2xhc3MgZm9yIHRoZSBiYWNrZ3JvdW5kIGNvbG9yXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCb3JkZXJDb2xvckNsYXNzID0gKCBEYXRlVGltZUVudGl0eSwgYm9yZGVyID0gJ2FsbCcgKSA9PiB7XG5cdGNvbnN0IGNvbG9yID0gc3RhdHVzQ29sb3JDbGFzcyggRGF0ZVRpbWVFbnRpdHkgKTtcblx0c3dpdGNoICggYm9yZGVyICkge1xuXHRcdGNhc2UgJ2FsbCc6XG5cdFx0XHRyZXR1cm4gYGVlLSR7IGNvbG9yIH0tYm9yZGVyYDtcblx0XHRjYXNlICd0b3AnOlxuXHRcdFx0cmV0dXJuIGBlZS0keyBjb2xvciB9LWJvcmRlci10b3BgO1xuXHRcdGNhc2UgJ3JpZ2h0Jzpcblx0XHRcdHJldHVybiBgZWUtJHsgY29sb3IgfS1ib3JkZXItcmlnaHRgO1xuXHRcdGNhc2UgJ2JvdHRvbSc6XG5cdFx0XHRyZXR1cm4gYGVlLSR7IGNvbG9yIH0tYm9yZGVyLWJvdHRvbWA7XG5cdFx0Y2FzZSAnbGVmdCc6XG5cdFx0XHRyZXR1cm4gYGVlLSR7IGNvbG9yIH0tYm9yZGVyLWxlZnRgO1xuXHR9XG59O1xuXG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBtYXBWYWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbWVtaXplJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgZW5kcG9pbnRzIH0gZnJvbSAnLi9lbmRwb2ludHMuanMnO1xuXG4vKipcbiAqIFJlY2VpdmVzIGFuIG9iamVjdCBtYXAgb2YgbW9kZWxOYW1lIHRvIGVuZHBvaW50IGFuZCBtYXBzIHRoYXQgdG8gYSBkZWZhdWx0XG4gKiBtYXAgb2YgbW9kZWxOYW1lIHRvIGVtcHR5IG9iamVjdC5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBtb2RlbE5hbWVFbmRwb2ludHNcbiAqIEByZXR1cm4geyBPYmplY3QgfSBBbiBvYmplY3Qgb2YgeyB7IG1vZGVsTmFtZSB9IDoge30gfVxuICovXG5jb25zdCBtYXBUb09iamVjdFZhbHVlcyA9ICggbW9kZWxOYW1lRW5kcG9pbnRzICkgPT4ge1xuXHRyZXR1cm4gbWFwVmFsdWVzKCBtb2RlbE5hbWVFbmRwb2ludHMsXG5cdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fSxcblx0KTtcbn07XG5cbmNvbnN0IGdldERlZmF1bHRNb2RlbEVudGl0aWVzT2JqZWN0ID0gbWVtb2l6ZShcblx0KCkgPT4gbWFwVG9PYmplY3RWYWx1ZXMoIGVuZHBvaW50cyApXG4pO1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBkZWZhdWx0IHN0YXRlIHRvIGJlIHVzZWQgYnkgc3RvcmVzIGNvbnRhaW5pbmcgbGlzdHMuXG4gKlxuICogQHR5cGUgeyBPYmplY3QgfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9MSVNUU19TVEFURSA9IG1hcFRvT2JqZWN0VmFsdWVzKCBlbmRwb2ludHMgKTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBzdGF0ZSB0byBiZSB1c2VkIGJ5IHRoZSBjb3JlIHN0b3JlLlxuICpcbiAqIEB0eXBlIHt7ZW50aXRpZXM6IHt9LCBlbnRpdHlJZHM6IHt9LCBkaXJ0eToge319fVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT1JFX1NUQVRFID0ge1xuXHRlbnRpdGllczoge1xuXHRcdC4uLmdldERlZmF1bHRNb2RlbEVudGl0aWVzT2JqZWN0KCksXG5cdH0sXG5cdHJlbGF0aW9uczoge30sXG5cdGRpcnR5OiB7XG5cdFx0cmVsYXRpb25zOiB7XG5cdFx0XHRpbmRleDoge30sXG5cdFx0XHRkZWxldGU6IHt9LFxuXHRcdFx0YWRkOiB7fSxcblx0XHR9LFxuXHRcdHRyYXNoOiB7fSxcblx0XHRkZWxldGU6IHt9LFxuXHR9LFxufTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBzdGF0ZSB0byBiZSB1c2VkIGJ5IHRoZSBzY2hlbWEgc3RvcmUuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9TQ0hFTUFfU1RBVEUgPSB7XG5cdHNjaGVtYToge1xuXHRcdC4uLmdldERlZmF1bHRNb2RlbEVudGl0aWVzT2JqZWN0KCksXG5cdH0sXG5cdGZhY3Rvcnk6IHtcblx0XHQuLi5nZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCgpLFxuXHR9LFxuXHRyZWxhdGlvbkVuZHBvaW50czoge1xuXHRcdC4uLmdldERlZmF1bHRNb2RlbEVudGl0aWVzT2JqZWN0KCksXG5cdH0sXG5cdHJlbGF0aW9uU2NoZW1hOiB7fSxcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgYXNzZXJ0RW50aXR5SGFzS2V5IH0gZnJvbSAnLi9hc3NlcnRpb25zJztcblxuLyoqXG4gKiBBbGwgYXZhaWxhYmxlIGVuZHBvaW50cyBleHBvc2VkIHZpYSB0aGUgZWVqcy5kYXRhIGdsb2JhbCBmcm9tIHRoZSBzZXJ2ZXIuXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5leHBvcnQgY29uc3Qge1xuXHRjb2xsZWN0aW9uX2VuZHBvaW50czogZW5kcG9pbnRzID0ge30sXG5cdGJhc2VfcmVzdF9yb3V0ZTogYmFzZVJlc3RSb3V0ZSxcbn0gPSBkYXRhLnBhdGhzO1xuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgZW5kcG9pbnQgZm9yIHRoZSBwcm92aWRlZCBtb2RlbC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lICBXaGF0IG1vZGVsIHRvIHJldHJpZXZlIHRoZSBlbmRwb2ludCBmb3IuXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICBUaGUgZW5kcG9pbnQgZm9yIHRoZSBwcm92aWRlZCBtb2RlbC5cbiAqIEB0aHJvd3Mge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVuZHBvaW50ID0gKCBtb2RlbE5hbWUgKSA9PiB7XG5cdGFzc2VydEVudGl0eUhhc0tleSggbW9kZWxOYW1lLCBlbmRwb2ludHMgKTtcblx0cmV0dXJuIGVuZHBvaW50c1sgbW9kZWxOYW1lIF07XG59O1xuXG4vKipcbiAqIEFwcGxpZXMgdGhlIHByb3ZpZGVkIHF1ZXJ5U3RyaW5nIHRvIHRoZSBlbmRwb2ludCBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lICBXaGF0IG1vZGVsIHRoZSBmaW5hbCBzdHJpbmcgaXMgZm9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5U3RyaW5nICBUaGUgcXVlcnkgYmVpbmcgYXBwZW5kZWQgdG8gdGhlIGVuZHBvaW50LlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgZmluYWwgYXNzZW1ibGVkIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGFwcGx5UXVlcnlTdHJpbmcgPSAoIG1vZGVsTmFtZSwgcXVlcnlTdHJpbmcgPSAnJyApID0+IHtcblx0cmV0dXJuIHF1ZXJ5U3RyaW5nICE9PSAnJyA/XG5cdFx0Z2V0RW5kcG9pbnQoIG1vZGVsTmFtZSApICsgJz8nICsgcXVlcnlTdHJpbmcgOlxuXHRcdGdldEVuZHBvaW50KCBtb2RlbE5hbWUgKTtcbn07XG5cbi8qKlxuICogU3RyaXBzIHRoZSBiYXNlX3Jlc3Rfcm91dGUgKGkuZS4gaHR0cHM6Ly9teXVybC5jb20vd3AtanNvbi8pIGZyb20gdGhlIHByb3ZpZGVkXG4gKiB1cmwgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIHVybCB3aXRoIHRoZSBiYXNlIHJlc3Qgcm91dGUgcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHN0cmlwQmFzZVJvdXRlRnJvbVVybCA9ICggdXJsICkgPT4ge1xuXHRyZXR1cm4gdXJsLnJlcGxhY2UoIGJhc2VSZXN0Um91dGUsICcnICk7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHNwcmludGYgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IEludmFsaWRTY2hlbWEgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcbmltcG9ydCB7IGlzU2NoZW1hIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5pbXBvcnQge1xuXHRNb25leSxcblx0U2VydmVyRGF0ZVRpbWUgYXMgRGF0ZVRpbWUsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbHVlLW9iamVjdHMnO1xuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGlzRGF0ZVRpbWVGaWVsZCxcblx0aXNNb25leUZpZWxkLFxufSBmcm9tICcuL2Jvb2xlYW5zJztcbmltcG9ydCB7XG5cdGlzU2hhbGxvd1ZhbGlkVmFsdWVGb3JGaWVsZCxcblx0dmFsaWRhdGVFbnVtVHlwZSxcblx0dmFsaWRhdGVUeXBlLFxuXHR2YWxpZGF0ZVR5cGVGb3JGaWVsZCxcbn0gZnJvbSAnLi92YWxpZGF0b3JzJztcbmltcG9ydCB7IG1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdFdpdGhBc3NlcnRpb25zIH0gZnJvbSAnLi9leHRyYWN0b3JzJztcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIGZpZWxkIHZhbHVlIGlzIGEga25vd24gdmFsdWUgb2JqZWN0LlxuICpcbiAqIE5vdGU6IHRoaXMgb25seSBhc3NlcnRzIGtub3duIHZhbHVlIG9iamVjdHMsIGlmIHRoZSB2YWx1ZSBpcyBub3QgZGV0ZWN0ZWQgYXNcbiAqIGEga25vd24gdmFsdWUgb2JqZWN0IGl0IGlzIHBhc3NlZCBiYWNrIGFzIGlzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHRocm93cyBJbnZhbGlkRGF0ZVRpbWVcbiAqIEB0aHJvd3MgVHlwZUVycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBtYXliZUFzc2VydFZhbHVlT2JqZWN0ID0gKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIHNjaGVtYSApID0+IHtcblx0aWYgKCBpc0RhdGVUaW1lRmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgKSB7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0SXNEYXRlVGltZSggZmllbGRWYWx1ZSApO1xuXHR9XG5cdGlmICggaXNNb25leUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApICkge1xuXHRcdE1vbmV5LmFzc2VydE1vbmV5KCBmaWVsZFZhbHVlICk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCBvYmplY3QgaXMgYSB2YWxpZCBtb2RlbCBzY2hlbWEgb2JqZWN0LlxuICpcbiAqIEN1cnJlbnRseSwgYW4gb2JqZWN0IGlzIGNvbnNpZGVyZWQgYSB2YWxpZCBtb2RlbCBzY2hlbWEgaWYgaXQgaGFzIGFcbiAqICdwcm9wZXJ0aWVzJyBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0geyp9IHNjaGVtYVxuICogQHRocm93cyBJbnZhbGlkU2NoZW1hXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRWYWxpZFNjaGVtYSA9ICggc2NoZW1hICkgPT4ge1xuXHRpZiAoICEgaXNTY2hlbWEoIHNjaGVtYSApICkge1xuXHRcdHRocm93IG5ldyBJbnZhbGlkU2NoZW1hKFxuXHRcdFx0J1RoaXMgaXMgYW4gaW52YWxpZCBzY2hlbWEgZm9yIGEgbW9kZWwuJyxcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgdGhhdCB0aGUgZ2l2ZW4gZmllbGQgZXhpc3RzIGluIHRoZSBwcm92aWRlZCBzY2hlbWEgYW5kIHRoZSBzaGFwZSBmb3JcbiAqIHRoZSBzY2hlbWEgZW50cnkgb24gdGhhdCBmaWVsZCBpcyBleHBlY3RlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lICBUaGUgbW9kZWwgdGhlIHNjaGVtYSBiZWxvbmdzIHRvLCB0aGlzIGlzIHVzZWQgZm9yXG4gKiBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWUgIFRoZSBmaWVsZCBiZWluZyBjaGVja2VkIGFnYWluc3QgdGhlIHNjaGVtYVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYSAgICAgVGhlIHNjaGVtYSBmb3IgdGhlIG1vZGVsIHVzZWQgZm9yIHZhbGlkYXRpb25cbiAqIEB0aHJvd3MgSW52YWxpZFNjaGVtYVxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydFZhbGlkU2NoZW1hRmllbGRQcm9wZXJ0aWVzID0gKFxuXHRtb2RlbE5hbWUsXG5cdGZpZWxkTmFtZSxcblx0c2NoZW1hLFxuKSA9PiB7XG5cdGlmICggaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0gKSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0c3ByaW50Zihcblx0XHRcdFx0J1RoZSBnaXZlbiBcIiVzXCIgZmllbGROYW1lIGRvZXMgbm90IGhhdmUgYSBkZWZpbmVkIHNjaGVtYSBmb3IgdGhlIG1vZGVsIFwiJXNcIicsXG5cdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0bW9kZWxOYW1lLFxuXHRcdFx0KSxcblx0XHQpO1xuXHR9XG5cdGlmICggc2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlID09PSAnb2JqZWN0JyApIHtcblx0XHRpZiAoIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMgKSApIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkU2NoZW1hKFxuXHRcdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHRcdCdUaGUgc2NoZW1hIGZvciB0aGUgZmllbGQgJXMgb24gdGhlIG1vZGVsICVzIGlzIG9mIHR5cGUgXCJvYmplY3RcIiBidXQgZG9lcyBub3QgaGF2ZSBhIHByb3BlcnRpZXMgcHJvcGVydHkuJyxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0bW9kZWxOYW1lXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICggaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcgKSApIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkU2NoZW1hKFxuXHRcdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHRcdCdUaGUgc2NoZW1hIGZvciB0aGUgZmllbGQgJXMgb24gdGhlIG1vZGVsICVzIGlzIG9mIHR5cGUgXCJvYmplY3RcIiBidXQgZG9lcyBub3QgaGF2ZSBhIHJhdyBwcm9wZXJ0eSBpbiBpdFxcJ3MgXCJwcm9wZXJ0aWVzXCIgcHJvcGVydHkuJyxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0bW9kZWxOYW1lXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICggaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcudHlwZSApICkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRTY2hlbWEoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBzY2hlbWEgZm9yIHRoZSBmaWVsZCAlcyBvbiB0aGUgbW9kZWwgJXMgaXMgb2YgdHlwZSBcIm9iamVjdFwiIGFuZCBoYXMgYSBwcm9wZXJ0aWVzLnJhdyBwcm9wZXJ0eSwgaG93ZXZlciB0aGVyZSBpcyBubyBcInR5cGVcIiBkZWZpbmVkIGZvciB0aGUgcmF3IHByb3BlcnR5LicsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdG1vZGVsTmFtZVxuXHRcdFx0XHQpLFxuXHRcdFx0KTtcblx0XHR9XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB0aGF0IHRoZSB2YWx1ZSBwcm92aWRlZCBmb3IgdGhlIHByZXBhcmVkIGZpZWxkIGlzIHZhbGlkIGFjY29yZGluZyB0b1xuICogdGhlIHNjaGVtYS5cbiAqXG4gKiBQcmVwYXJlZCBmaWVsZHMgYXJlOlxuICpcbiAqIC0gZmllbGRzIGhhdmluZyB2YWx1ZXMgdGhhdCBhcmUgc2V0IGFzIGEgdmFsdWUgb2JqZWN0IGFuZCBleHBlY3QgYSB2YWx1ZVxuICogICBvYmplY3Qgb24gdXBkYXRlcy9pbnNlcnRzLlxuICogLSBmaWVsZHMgdGhhdCBhcmUgdGhlIGVxdWl2YWxlbnQgYHJhd2AgdmFsdWUgd2hlbiB0aGUgZmllbGQgaW4gdGhlIHNjaGVtYSBpc1xuICogICBkZWZpbmVkIHRvIGhhdmUgcmF3IGFuZCByZW5kZXJlZC9wcmV0dHkgdmFsdWVzLlxuICpcbiAqIE5vdGU6ICBUaGlzIHZhbGlkYXRlcyBhZ2FpbnN0IHByZXBhcmVkIGZpZWxkcyB3aGljaCBtZWFucyB0aGF0OlxuICpcbiAqIC0gaWYgdGhlIHByZXBhcmVkIGZpZWxkIGhhcyBhIHZhbHVlIG9iamVjdCBhcyBpdHMgdmFsdWUsIHRoZW4gdGhhdCB2YWx1ZVxuICogICBvYmplY3QgaXMgdmFsaWRhdGVkIGJlZm9yZSBhbnkgb3RoZXIgdmFsaWRhdGlvbi5cbiAqIC0gaWYgdGhlIHByZXBhcmVkIGZpZWxkIHJlcHJlc2VudHMgYW4gb2JqZWN0IGluIHRoZSBzY2hlbWEsIHRoZW4gaXRzIHZhbHVlIGlzXG4gKiAgIHZhbGlkYXRlZCBhZ2FpbnN0IHRoZSBgcmF3YCB0eXBlIGluIHRoZSBzY2hlbWEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEB0aHJvd3MgVHlwZUVycm9yXG4gKiBAdGhyb3dzIEludmFsaWREYXRlVGltZVxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0VmFsaWRWYWx1ZUZvclByZXBhcmVkRmllbGQgPSAoXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0aW5zdGFuY2UsXG4pID0+IHtcblx0Y29uc3QgeyBzY2hlbWEgfSA9IGluc3RhbmNlO1xuXHRsZXQgaXNWYWxpZCA9IGlzU2hhbGxvd1ZhbGlkVmFsdWVGb3JGaWVsZChcblx0XHRmaWVsZE5hbWUsXG5cdFx0ZmllbGRWYWx1ZSxcblx0XHRzY2hlbWEsXG5cdCk7XG5cdGlmICggISBpc1ZhbGlkICYmIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgJiZcblx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXNcblx0KSB7XG5cdFx0aXNWYWxpZCA9IHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcuZW51bSA/XG5cdFx0XHR2YWxpZGF0ZUVudW1UeXBlKFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LnR5cGUsXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcuZW51bSxcblx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdCkgOlxuXHRcdFx0dmFsaWRhdGVUeXBlKFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LnR5cGUsXG5cdFx0XHRcdG1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdFdpdGhBc3NlcnRpb25zKFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRcdHNjaGVtYVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdGlmICggISBpc1ZhbGlkICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIGdpdmVuIFwiJTEkc1wiIGZpZWxkICBpcyBub3QgdmFsaWQgZm9yIHRoZSBkZWZpbmVkIHNjaGVtYS4gIEl0XFwncyBgcmF3YCBwcm9wZXJ0eSBWYWx1ZSAoJTIkcykgaXMgbm90IHRoZSBjb3JyZWN0IGV4cGVjdGVkIHR5cGUgKCUzJHMpLicsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy50eXBlLFxuXHRcdFx0XHQpLFxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblx0aWYgKCAhIGlzVmFsaWQgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdHNwcmludGYoXG5cdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlMSRzXCIgZmllbGRcXCdzIFZhbHVlICglMiRzKSBpcyBub3QgdmFsaWQgZm9yIHRoZSBkZWZpbmVkIHNjaGVtYSB0eXBlICglMyRzKS4nLFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSxcblx0XHRcdCksXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHZhbHVlIGZvciB0aGUgZ2l2ZW4gZmllbGQgaXMgdmFsaWQgYWNjb3JkaW5nIHRvIHRoZVxuICogc2NoZW1hLlxuICpcbiAqIFRoaXMgaXMgdXNlZCBvbiBlbnRpdHkgY29uc3RydWN0aW9uIGFuZCBkb2VzIG5vdCB2YWxpZGF0ZSBwcmVwYXJlZCBmaWVsZFxuICogdmFsdWVzIChzZWUgYXNzZXJ0IGFzc2VydFZhbGlkVmFsdWVGb3JQcmVwYXJlZEZpZWxkKS5cbiAqXG4gKiBUaGlzIG1ldGhvZCBhbHNvIGFzc2VydHMgdGhhdCB0aGUgc2NoZW1hIGhhcyB2YWxpZCBzY2hlbWEgZmllbGQgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqIEB0aHJvd3MgSW52YWxpZFNjaGVtYVxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0VmFsaWRGaWVsZEFuZFZhbHVlQWdhaW5zdFNjaGVtYSA9IChcblx0bW9kZWxOYW1lLFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdGluc3RhbmNlLFxuKSA9PiB7XG5cdGNvbnN0IHNjaGVtYSA9IGluc3RhbmNlLnNjaGVtYTtcblx0Y29uc3QgdmFsaWRhdGlvblR5cGUgPSB2YWxpZGF0ZVR5cGVGb3JGaWVsZCggZmllbGROYW1lLCBpbnN0YW5jZSApO1xuXHRhc3NlcnRWYWxpZFNjaGVtYUZpZWxkUHJvcGVydGllcyggbW9kZWxOYW1lLCBmaWVsZE5hbWUsIHNjaGVtYSApO1xuXHRsZXQgaXNWYWxpZCA9IGlzU2hhbGxvd1ZhbGlkVmFsdWVGb3JGaWVsZChcblx0XHRmaWVsZE5hbWUsXG5cdFx0ZmllbGRWYWx1ZSxcblx0XHRzY2hlbWEsXG5cdFx0ZmFsc2UsXG5cdCk7XG5cdC8vIGFjY291bnQgZm9yIGZpZWxkTmFtZSBmaWVsZFZhbHVlcyB0aGF0IGhhdmUgcHJvcGVydHkgc2NoZW1hLiBGb3IgTW9kZWxcblx0Ly8gRW50aXRpZXMsIG9ubHkgdGhlIFZBTElEQVRFX1RZUEUgcHJvcGVydHkgaXMgY2FyZWQgYWJvdXQuXG5cdGlmICggc2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlID09PSAnb2JqZWN0JyAmJlxuXHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllc1xuXHQpIHtcblx0XHRpZiAoIGlzVW5kZWZpbmVkKCBmaWVsZFZhbHVlWyB2YWxpZGF0aW9uVHlwZSBdICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlMSRzXCIgdmFsdWUgaXMgbm90IHZhbGlkIGZvciB0aGUgZGVmaW5lZCBzY2hlbWEuIEl0IG11c3QgYmUgYW4gb2JqZWN0IGFuZCBpdCBtdXN0IGhhdmUgYSBgJTIkc2Aga2V5LicsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdHZhbGlkYXRpb25UeXBlLFxuXHRcdFx0XHQpLFxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aXNWYWxpZCA9IHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllc1sgdmFsaWRhdGlvblR5cGUgXS5lbnVtID9cblx0XHRcdHZhbGlkYXRlRW51bVR5cGUoXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllc1sgdmFsaWRhdGlvblR5cGUgXS50eXBlLFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LmVudW0sXG5cdFx0XHRcdGZpZWxkVmFsdWVbIHZhbGlkYXRpb25UeXBlIF0sXG5cdFx0XHQpIDpcblx0XHRcdHZhbGlkYXRlVHlwZShcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzWyB2YWxpZGF0aW9uVHlwZSBdLnR5cGUsXG5cdFx0XHRcdGZpZWxkVmFsdWVbIHZhbGlkYXRpb25UeXBlIF1cblx0XHRcdCk7XG5cdFx0aWYgKCAhIGlzVmFsaWQgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlMSRzXCIgdmFsdWUgaXMgbm90IHZhbGlkIGZvciB0aGUgZGVmaW5lZCBzY2hlbWEuICBJdFxcJ3MgYCUyJHNgIHByb3BlcnR5IHZhbHVlICglMyRzKSBpcyBub3QgdGhlIGNvcnJlY3QgZXhwZWN0ZWQgdHlwZSAoJTQkcykuJyxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0dmFsaWRhdGlvblR5cGUsXG5cdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXNbIHZhbGlkYXRpb25UeXBlIF0udHlwZSxcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cdGlmICggISBpc1ZhbGlkICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHQnVGhlIGdpdmVuIFwiJTEkc1wiIGZpZWxkXFwncyB2YWx1ZSAoJTIkcykgaXMgbm90IHZhbGlkIGZvciB0aGUgZGVmaW5lZCBzY2hlbWEgdHlwZSAoJTMkcykuJyxcblx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUsXG5cdFx0XHQpLFxuXHRcdCk7XG5cdH1cbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNBcnJheSwgdXBwZXJGaXJzdCwgY2FtZWxDYXNlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ21lbWl6ZSc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBhc3NlcnRWYWxpZFNjaGVtYSB9IGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5pbXBvcnQge1xuXHRjcmVhdGVHZXR0ZXIsXG5cdGNyZWF0ZUVudGl0eUdldHRlcnNBbmRTZXR0ZXJzLFxuXHRjcmVhdGVQZXJzaXN0aW5nR2V0dGVyc0FuZFNldHRlcnMsXG5cdHNldFNhdmVTdGF0ZSxcbn0gZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IHtcblx0U0FWRV9TVEFURSxcblx0UFJJVkFURV9QUk9QRVJUSUVTLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQmFzZUVudGl0eSBpcyB0aGUgYmFzaWMgY2xhc3MgZm9yIGFsbCBlbnRpdGllcy4gIGNyZWF0ZUVudGl0eUZhY3RvcnkgcmV0dXJuc1xuICogYW4gaW5zdGFuY2Ugb2YgdGhpcyBhbmQgYWxsIHRoZSBnZXR0ZXJzL3NldHRlcnMgZm9yIGZpZWxkcyBldGMgYXJlXG4gKiBkeW5hbWljYWxseSBjcmVhdGVkIHZpYSB0aGUgY29uc3RydWN0b3IuXG4gKi9cbmNsYXNzIEJhc2VFbnRpdHkge1xuXHRbIFBSSVZBVEVfUFJPUEVSVElFUy5TQVZFX1NUQVRFIF0gPSBTQVZFX1NUQVRFLkNMRUFOO1xuXHRbIFBSSVZBVEVfUFJPUEVSVElFUy5WQUxJREFURV9UWVBFUyBdID0ge307XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yIGZvciBCYXNlIEVudGl0eVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBlbnRpdHlGaWVsZHNBbmRWYWx1ZXNcblx0ICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuXHQgKiBAcGFyYW0ge0FycmF5fWZpZWxkUHJlZml4ZXNcblx0ICogQHBhcmFtIHtib29sZWFufSBpc05ld1xuXHQgKi9cblx0Y29uc3RydWN0b3IoXG5cdFx0bW9kZWxOYW1lLFxuXHRcdGVudGl0eUZpZWxkc0FuZFZhbHVlcyxcblx0XHRzY2hlbWEsXG5cdFx0ZmllbGRQcmVmaXhlcyA9IFtdLFxuXHRcdGlzTmV3ID0gZmFsc2UsXG5cdCkge1xuXHRcdGFzc2VydFZhbGlkU2NoZW1hKCBzY2hlbWEgKTtcblx0XHRmaWVsZFByZWZpeGVzID0gaXNBcnJheSggZmllbGRQcmVmaXhlcyApID8gZmllbGRQcmVmaXhlcyA6IFtdO1xuXHRcdGNyZWF0ZUdldHRlciggdGhpcywgJ2ZpZWxkUHJlZml4ZXMnLCBmaWVsZFByZWZpeGVzICk7XG5cdFx0Y3JlYXRlR2V0dGVyKCB0aGlzLCAnc2NoZW1hJywgc2NoZW1hLnByb3BlcnRpZXMgKTtcblx0XHRzZXRTYXZlU3RhdGUoXG5cdFx0XHR0aGlzLFxuXHRcdFx0aXNOZXcgPyBTQVZFX1NUQVRFLk5FVyA6IFNBVkVfU1RBVEUuQ0xFQU5cblx0XHQpO1xuXHRcdGNyZWF0ZUdldHRlciggdGhpcywgJ21vZGVsTmFtZScsIG1vZGVsTmFtZSApO1xuXHRcdGNyZWF0ZUdldHRlciggdGhpcywgJ29yaWdpbmFsRmllbGRzQW5kVmFsdWVzJywgZW50aXR5RmllbGRzQW5kVmFsdWVzICk7XG5cdFx0Y3JlYXRlR2V0dGVyKFxuXHRcdFx0dGhpcyxcblx0XHRcdCdmaWVsZHNUb1BlcnNpc3RPbkluc2VydCcsXG5cdFx0XHRuZXcgU2V0KCBPYmplY3Qua2V5cyggZW50aXR5RmllbGRzQW5kVmFsdWVzICkgKVxuXHRcdCk7XG5cdFx0Y3JlYXRlRW50aXR5R2V0dGVyc0FuZFNldHRlcnMoIHRoaXMgKTtcblx0XHRjcmVhdGVQZXJzaXN0aW5nR2V0dGVyc0FuZFNldHRlcnMoIHRoaXMgKTtcblx0XHRPYmplY3Quc2VhbCggdGhpcyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBvbiB0aGUgZW50aXR5LlxuXHQgKlxuXHQgKiBTYXZlIHN0YXRlIGRlc2NyaWJlcyB3aGV0aGVyIHRoZSBlbnRpdHkgaXM6XG5cdCAqXG5cdCAqIC0gU0FWRV9TVEFURS5ORVc6IFRoZSBlbnRpdHkgaGFzIG5ldmVyIGJlZW4gcGVyc2lzdGVkIHRvIHN0b3JhZ2UuXG5cdCAqIC0gU0FWRV9TVEFURS5DTEVBTjogVGhlIGVudGl0eSBleGlzdHMgaW4gc3RvcmFnZSBhbmQgaGFzIG5vdCBiZWVuIG11dGF0ZWQuXG5cdCAqIC0gU0FWRV9TVEFURS5ESVJUWTogVGhlIGVudGl0eSBpcyBtdXRhdGVkIGFuZCBjaGFuZ2VzIGhhdmUgbm90IGJlZW5cblx0ICogcGVyc2lzdGVkIHRvIHN0b3JhZ2UuXG5cdCAqXG5cdCAqIEByZXR1cm4ge1N5bWJvbH0gIFJldHVybnMgdGhlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBmb3IgdGhlIGVudGl0eS5cblx0ICovXG5cdGdldCBzYXZlU3RhdGUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIFBSSVZBVEVfUFJPUEVSVElFUy5TQVZFX1NUQVRFIF07XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgY3VycmVudCBzYXZlIHN0YXRlIGlzIFNBVkVfU1RBVEUuTkVXXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIFNBVkVfU1RBVEUuTkVXIGlzIHRoZSBzYXZlIHN0YXRlLlxuXHQgKi9cblx0Z2V0IGlzTmV3KCkge1xuXHRcdHJldHVybiB0aGlzLnNhdmVTdGF0ZSA9PT0gU0FWRV9TVEFURS5ORVc7XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgY3VycmVudCBzYXZlIHN0YXRlIGlzIFNBVkVfU1RBVEUuRElSVFlcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgU0FWRV9TVEFURS5ESVJUWSBpcyB0aGUgc2F2ZSBzdGF0ZS5cblx0ICovXG5cdGdldCBpc0RpcnR5KCkge1xuXHRcdHJldHVybiB0aGlzLnNhdmVTdGF0ZSA9PT0gU0FWRV9TVEFURS5ESVJUWTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IHNhdmUgc3RhdGUgaXMgU0FWRV9TVEFURS5DTEVBTlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyBTQVZFX1NUQVRFLkNMRUFOIGlzIHRoZSBzYXZlIHN0YXRlLlxuXHQgKi9cblx0Z2V0IGlzQ2xlYW4oKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2F2ZVN0YXRlID09PSBTQVZFX1NUQVRFLkNMRUFOO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGVudGl0eSBoYXMgYW55IHBhc3N3b3JkIHByb3RlY3RlZCBmaWVsZHMuXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgaXQgZG9lcywgZmFsc2UgbWVhbnMgaXQgZG9lc24ndC5cblx0ICovXG5cdGdldCBpc1Bhc3N3b3JkUHJvdGVjdGVkKCkge1xuXHRcdHJldHVybiB0aGlzLnByb3RlY3RlZEZpZWxkcy5sZW5ndGggPiAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGdpdmVuIGZpZWxkTmFtZSBpcyBhIHBhc3N3b3JkIHByb3RlY3RlZCBmaWVsZC5cblx0ICogQHJldHVybiB7ZnVuY3Rpb24oc3RyaW5nKTogYm9vbGVhbn0gIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkXG5cdCAqIHRvIGNoZWNrIGlmIHRoZSBnaXZlbiBmaWVsZCBuYW1lIGlzIGEgcHJvdGVjdGVkIGZpZWxkIGluIHRoaXMgZW50aXR5LlxuXHQgKi9cblx0Z2V0IGlzRmllbGRQYXNzd29yZFByb3RlY3RlZCgpIHtcblx0XHRyZXR1cm4gKCBmaWVsZE5hbWUgKSA9PiB0aGlzLnByb3RlY3RlZEZpZWxkcy5pbmRleE9mKCBmaWVsZE5hbWUgKSA+IC0xO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVzZWQgdG8gY2xvbmUgdGhlIGN1cnJlbnQgZW50aXR5IG9iamVjdC4gIFRoaXMgcmVzdWx0cyBpbiBhbiBpbnN0YW5jZSBvZlxuXHQgKiBCYXNlRW50aXR5IHRoYXQgaXMgZXF1aXZhbGVudCBhcyB0aGlzIGN1cnJlbnQgaW5zdGFuY2UgKGV4Y2VwdCBpdCB3aWxsXG5cdCAqIGhhdmUgYSBuZXcgZ2VuZXJhdGVkIGlkKS5cblx0ICpcblx0ICogQHJldHVybiB7QmFzZUVudGl0eX0gQSBuZXcgaW5zdGFuY2Ugb2YgQmFzZUVudGl0eVxuXHQgKi9cblx0Z2V0IGNsb25lKCkge1xuXHRcdHJldHVybiAoIGtlZXBJZCA9IGZhbHNlICkgPT4ge1xuXHRcdFx0Y29uc3QgY3JlYXRlRmFjdG9yeSA9IG1lbW9pemUoICgpID0+IGNyZWF0ZUVudGl0eUZhY3RvcnkoXG5cdFx0XHRcdHRoaXMubW9kZWxOYW1lLFxuXHRcdFx0XHR7ICRzY2hlbWE6IHt9LCBwcm9wZXJ0aWVzOiB0aGlzLnNjaGVtYSB9LFxuXHRcdFx0XHR0aGlzLmZpZWxkUHJlZml4ZXNcblx0XHRcdCkgKTtcblx0XHRcdGNvbnN0IGZhY3RvcnkgPSBjcmVhdGVGYWN0b3J5KCk7XG5cdFx0XHRjb25zdCBuZXdFbnRpdHkgPSBmYWN0b3J5LmNyZWF0ZU5ldyggdGhpcy5mb3JDbG9uZSApO1xuXHRcdFx0aWYgKCBrZWVwSWQgKSB7XG5cdFx0XHRcdG5ld0VudGl0eS5pZCA9IHRoaXMuaWQ7XG5cdFx0XHRcdHNldFNhdmVTdGF0ZSggbmV3RW50aXR5LCB0aGlzLnNhdmVTdGF0ZSwgdHJ1ZSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5ld0VudGl0eTtcblx0XHR9O1xuXHR9XG5cblx0c3RhdGljIG5hbWUgPSAnQmFzZUVudGl0eSdcbn1cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgZ2l2ZXMgYSBjbGFzcyB0aGUgcHJvdmlkZWQgbmFtZVxuICogKGFuZCBvcHRpb25hbGx5IGV4dGVuZHMgdGhlIHByb3ZpZGVkIG9iamVjdCkuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGV4dGVuZGVkQ2xhc3NcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uXG4gKi9cbmNvbnN0IG5hbWVDbGFzcyA9ICggbmFtZSwgZXh0ZW5kZWRDbGFzcyApID0+IHtcblx0cmV0dXJuIGNsYXNzIGV4dGVuZHMgZXh0ZW5kZWRDbGFzcyB7XG5cdFx0c3RhdGljIGdldCBuYW1lKCkge1xuXHRcdFx0cmV0dXJuIG5hbWU7XG5cdFx0fVxuXHR9O1xufTtcblxuLyoqXG4gKiBBIGZhY3RvcnkgZm9yIGVudGl0eSBmYWN0b3JpZXMuXG4gKlxuICogQ2FsbGluZyB0aGlzIHJldHVybnMgYW4gb2JqZWN0IG9mIGZhY3RvcnkgZnVuY3Rpb25zIHRoYXQgaW5zdGFudGlhdGUgYW5cbiAqIGluc3RhbmNlIG9mIGEgbmFtZWQgRW50aXR5LiAgVGhlIG1vZGVsTmFtZSBpcyB1c2VkIGFzIHRoZSBuYW1lIGZvciB0aGUgbmV3XG4gKiBlbnRpdHkuXG4gKlxuICogVHdvIG1ldGhvZHMgYXJlIGF2YWlsYWJsZSBvbiB0aGUgb2JqZWN0IHJldHVybmVkOiBgY3JlYXRlTmV3YCBhbmRcbiAqIGBmcm9tRXhpc3RpbmdgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFRoZSBtb2RlbCBmb3IgdGhlIGVudGl0eVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYSAgICAgVGhlIHNjaGVtYSBmb3IgdGhlIG1vZGVsLiBUaGlzIGlzIHRoZSBzY2hlbWFcbiAqIHByb3ZpZGVkIGJ5IHRoZSBPUFRJT05TIGVuZHBvaW50IGZvciB0aGUgbW9kZWwuXG4gKiBAcGFyYW0ge0FycmF5fSBmaWVsZFByZWZpeGVzIEFuIGFycmF5IG9mIGZpZWxkIHByZWZpeGVzIGZvciBiYXNlIGZpZWxkcyBvblxuICogb24gdGhlIG1vZGVsIChlZy4gRXZlbnQgbW9kZWwgaGFzIGBbIEVWVCBdYCBwcmVmaXhlcyBvbiBmaWVsZHMsIERhdGV0aW1lIG1vZGVsXG4gKiBoYXMgWyBgRFRUYCwgYERUVF9FVlRgIF1cbiAqIEByZXR1cm4ge09iamVjdH0gQSBmYWN0b3J5IGZvciBpbnN0YW50aWF0aW5nIGFuIGVudGl0eSBpbnN0YW5jZS5cbiAqL1xuY29uc3QgY3JlYXRlRW50aXR5RmFjdG9yeSA9ICggbW9kZWxOYW1lLCBzY2hlbWEsIGZpZWxkUHJlZml4ZXMgPSBbXSApID0+IHtcblx0Y29uc3QgRW50aXR5ID0gbmFtZUNsYXNzKFxuXHRcdHVwcGVyRmlyc3QoIGNhbWVsQ2FzZSggbW9kZWxOYW1lICkgKSxcblx0XHRCYXNlRW50aXR5XG5cdCk7XG5cdHJldHVybiB7XG5cdFx0LyoqXG5cdFx0ICogRXhwb3NlcyBtb2RlbE5hbWUgc28gY2xpZW50IGNvZGUgY2FuIGRlcml2ZSB3aGF0IG1vZGVsIHRoaXMgZmFjdG9yeVxuXHRcdCAqIGlzIGZvciBmcm9tIGFueSBnaXZlbiBmYWN0b3J5LlxuXHRcdCAqIEB0eXBlIHN0cmluZ1xuXHRcdCAqL1xuXHRcdG1vZGVsTmFtZSxcblx0XHQvKipcblx0XHQgKiBUaGlzIGlzIHRoZSBjbGFzcyBkZWZpbml0aW9uIGZvciB0aGUgRW50aXR5LiAgVHlwaWNhbGx5IHRoaXMgaXNcblx0XHQgKiByZXRyaWV2ZWQgZm9yIHRoZSBhYmlsaXR5IHRvIGRvIGluc3RhbmNlb2YgY2hlY2tzLlxuXHRcdCAqL1xuXHRcdGNsYXNzRGVmOiBFbnRpdHksXG5cdFx0LyoqXG5cdFx0ICogVGhpcyByZXR1cm5zIGFuIGluc3RhbmNlIG9mIEVudGl0eSBmb3IgdGhlIGdpdmVuIGFyZ3VtZW50cyB3aXRoIHRoZVxuXHRcdCAqIGluZGljYXRpb24gdGhpcyBpcyBhIG5ldyBub24tcGVyc2lzdGVkIGVudGl0eS4gIFRoaXMgbWVhbnM6XG5cdFx0ICpcblx0XHQgKiAtIEFsbCBmaWVsZCB2YWx1ZXMgYXJlIHBvcHVsYXRlZCBhbmQgYW55IG5vdCBwcm92aWRlZCB3aWxsIGJlXG5cdFx0ICogICBwb3B1bGF0ZWQgd2l0aCBkZWZhdWx0IHZhbHVlcyBkZWZpbmVkIGJ5IHRoZSBzY2hlbWEuXG5cdFx0ICogLSBHZW5lcmF0ZXMgdGVtcG9yYXJ5IHVuaXF1ZSBpZHMgZm9yIHRoZSBwcmltYXJ5IGtleSBmaWVsZHMgb24gdGhlXG5cdFx0ICogICBlbnRpdHkgKHVzaW5nIGN1aWQpLlxuXHRcdCAqIC0gU2V0cyB0aGUgYGlzTmV3YCBmbGFnIHRvIHRydWUgZm9yIHRoZSBlbnRpdHkgc28gY2xpZW50IGNvZGUgaXMgYWJsZVxuXHRcdCAqICAgdG8gZGlzY292ZXIgd2hpY2ggZW50aXRpZXMgaGF2ZSBuZXZlciBiZWVuIHBlcnNpc3RlZC5cblx0XHQgKiAtIFRoaXMgZmFjdG9yeSBtZXRob2QgZXhwZWN0cyBmaWVsZHMgYW5kIHZhbHVlcyB0byBiZSBcInByZXBhcmVkXCIuXG5cdFx0ICogICBXaGF0IHRoYXQgbWVhbnMgaXMgdGhhdCBmb3IgYW55IGZpZWxkcyB0aGF0IHRoZSBzY2hlbWEgZGVzY3JpYmVkIGFzXG5cdFx0ICogICBoYXZpbmcgYSBgcmF3YCBwcm9wZXJ0eSAoaS5lLiB7IEVWVF9kZXNjOiB7IHJhdzogJ3NvbWV0aGluZycgfSB9KVxuXHRcdCAqICAgdGhlIHZhbHVlIHNob3VsZCBiZSBvZiB0aGUgY29ycmVjdCB0eXBlIGZvciB0aGF0IHJhdyBwcm9wZXJ0eSBhbmQuXG5cdFx0ICogICBUaGlzIGFsc28gbWVhbnMgaXMgdGhhdCBmb3IgYW55IGZpZWxkcyB0aGUgc2NoZW1hIGRlc2NyaWJlcyBhcyBhXG5cdFx0ICogICBkYXRlLXRpbWUgKGZvcm1hdCkgb3IgbW9uZXkgKGZvcm1hdCkgZmllbGQsIHRoZSB2YWx1ZSBpcyBleHBlY3RlZFxuXHRcdCAqICAgdG8gYmUgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgb2JqZWN0LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGZpZWxkc0FuZFZhbHVlc1xuXHRcdCAqIEByZXR1cm4ge0VudGl0eX0gYW4gaW5zdGFuY2Ugb2YgRW50aXR5XG5cdFx0ICovXG5cdFx0Y3JlYXRlTmV3OiAoIGZpZWxkc0FuZFZhbHVlcyApID0+IG5ldyBFbnRpdHkoXG5cdFx0XHRtb2RlbE5hbWUsXG5cdFx0XHRmaWVsZHNBbmRWYWx1ZXMsXG5cdFx0XHRzY2hlbWEsXG5cdFx0XHRmaWVsZFByZWZpeGVzLFxuXHRcdFx0dHJ1ZVxuXHRcdCksXG5cdFx0LyoqXG5cdFx0ICogVGhpcyByZXR1cm5zIGFuIGluc3RhbmNlIG9mIEVudGl0eSBmb3IgdGhlIGdpdmVuIGFyZ3VtZW50cyB3aXRoIHRoZVxuXHRcdCAqIGluZGljYXRpb24gdGhpcyByZXByZXNlbnRzIHRoZSBlbnRpdHkgYXMgaXMgaW4gdGhlIGRiLiAgVGhpcyBtZWFuczpcblx0XHQgKlxuXHRcdCAqIC0gQWxsIGZpZWxkIHZhbHVlcyBhcmUgTk9UIHBvcHVsYXRlZCBpZiBtaXNzaW5nIHZhbHVlcy4gIFRoaXMgaXNcblx0XHQgKiAgIGVzcGVjaWFsbHkgaW1wb3J0YW50IGZvciBjb250ZXh0cyBsaWtlIHVuYXV0aG9yaXplZCB2aWV3cyB3aGVyZVxuXHRcdCAqICAgb25seSBwYXJ0aWFsIGVudGl0aWVzIGFyZSByZXR1cm5lZCBpbiBSRVNUIHJlc3BvbnNlcy5cblx0XHQgKiAtIGlzTmV3IGZsYWcgaXMgc2V0IHRvIGZhbHNlIChhbmQgbmV2ZXIgY2hhbmdlcyBmb3IgdGhpcyBlbnRpdHkpXG5cdFx0ICogLSBUaGUgaW5jb21pbmcgdmFsdWVzIGFyZSBleHBlY3RlZCB0byBiZSBpbiB0aGUgZXhhY3Qgc2hhcGUgYXNcblx0XHQgKiAgIGRlc2NyaWJlZCBieSB0aGUgc2NoZW1hIGZvciB0aGUgZW50aXR5IG1vZGVsLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGZpZWxkc0FuZFZhbHVlc1xuXHRcdCAqIEByZXR1cm4ge0VudGl0eX0gYW4gaW5zdGFuY2Ugb2YgRW50aXR5XG5cdFx0ICovXG5cdFx0ZnJvbUV4aXN0aW5nOiAoIGZpZWxkc0FuZFZhbHVlcyApID0+IG5ldyBFbnRpdHkoXG5cdFx0XHRtb2RlbE5hbWUsXG5cdFx0XHRmaWVsZHNBbmRWYWx1ZXMsXG5cdFx0XHRzY2hlbWEsXG5cdFx0XHRmaWVsZFByZWZpeGVzXG5cdFx0KSxcblx0fTtcbn07XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFbnRpdHlGYWN0b3J5O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzUGxhaW5PYmplY3QsIGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaGFzIGEgXCJyYXdcIiBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdCBhbmQgaGFzIGEgYHJhd2AgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNSYXdQcm9wZXJ0eSA9ICggdmFsdWUgKSA9PiBpc1BsYWluT2JqZWN0KCB2YWx1ZSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHZhbHVlLnJhdyApO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBoYXMgYSBcInByZXR0eVwiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4geyp9IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYSBgcHJldHR5YCBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc1ByZXR0eVByb3BlcnR5ID0gKCB2YWx1ZSApID0+IGlzUGxhaW5PYmplY3QoIHZhbHVlICkgJiZcblx0ISBpc1VuZGVmaW5lZCggdmFsdWUucHJldHR5ICk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBhIFwicmVuZGVyZWRcIiBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdCBhbmQgaGFzIGEgYHJlbmRlcmVkYCBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc1JlbmRlcmVkUHJvcGVydHkgPSAoIHZhbHVlICkgPT4gaXNQbGFpbk9iamVjdCggdmFsdWUgKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCB2YWx1ZS5yZW5kZXJlZCApO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBoYXMgYSBcImZvcm1hdFwiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYSBgZm9ybWF0YCBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0Zvcm1hdFByb3BlcnR5ID0gKCB2YWx1ZSApID0+IGlzUGxhaW5PYmplY3QoIHZhbHVlICkgJiZcblx0ISBpc1VuZGVmaW5lZCggdmFsdWUuZm9ybWF0ICk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBhIFwiZW51bVwiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYW4gZW51bVxuICogcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNFbnVtUHJvcGVydHkgPSAoIHZhbHVlICkgPT4gaXNQbGFpbk9iamVjdCggdmFsdWUgKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCB2YWx1ZS5lbnVtICk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgXCJ2YWx1ZSBvYmplY3RcIiBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgdmFsdWUgb2JqZWN0IGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNWYWx1ZU9iamVjdEZpZWxkID0gKCBmaWVsZCwgc2NoZW1hICkgPT4ge1xuXHRyZXR1cm4gaXNEYXRlVGltZUZpZWxkKCBmaWVsZCwgc2NoZW1hICkgfHwgaXNNb25leUZpZWxkKCBmaWVsZCwgc2NoZW1hICk7XG59O1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCBpcyBhIGRhdGUtdGltZSBmaWVsZCBhY2NvcmRpbmcgdG8gdGhlXG4gKiBwcm92aWRlZCBzY2hlbWEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIGl0IGlzIGEgZGF0ZS10aW1lIGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNEYXRlVGltZUZpZWxkID0gKCBmaWVsZCwgc2NoZW1hICkgPT5cblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZCBdICkgJiZcblx0aGFzRm9ybWF0UHJvcGVydHkoIHNjaGVtYVsgZmllbGQgXSApICYmXG5cdHNjaGVtYVsgZmllbGQgXS5mb3JtYXQgPT09ICdkYXRlLXRpbWUnO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCBpcyBhIFVUQyBkYXRlLXRpbWUgZmllbGQuXG4gKlxuICogSWYgc2NoZW1hIGlzIHByb3ZpZGVkLCB0aGlzIGFsc28gY29uc2lkZXJzIHdoZXRoZXIgdGhpcyBpcyBhIGRhdGUtdGltZSBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRpbWVGaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWEgW29wdGlvbmFsXVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGlzIGlzIGEgVVRDIGZpZWxkLiAgSWYgc2NoZW1hIGlzIHByb3ZpZGVkIGl0XG4gKiBtZWFucyB0aGlzIGlzIGFsc28gYSBkYXRlLXRpbWUgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1VUQ0RhdGVUaW1lRmllbGQgPSAoIGRhdGVUaW1lRmllbGROYW1lLCBzY2hlbWEgPSBudWxsICkgPT4ge1xuXHRyZXR1cm4gc2NoZW1hICE9PSBudWxsID9cblx0XHRpc0RhdGVUaW1lRmllbGQoIGRhdGVUaW1lRmllbGROYW1lLCBzY2hlbWEgKSAmJlxuXHRcdFx0ZGF0ZVRpbWVGaWVsZE5hbWUuaW5kZXhPZiggJ19nbXQnICkgPiAwIDpcblx0XHRkYXRlVGltZUZpZWxkTmFtZS5pbmRleE9mKCAnX2dtdCcgKSA+IDA7XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgcmVwcmVzZW50cyBhIHByaW1hcnkga2V5IGZpZWxkIHVzaW5nIHRoZVxuICogcHJvdmlkZWQgc2NoZW1hLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIGEgcHJpbWFyeSBrZXkgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1ByaW1hcnlLZXlGaWVsZCA9ICggZmllbGROYW1lLCBzY2hlbWEgKSA9PlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgJiZcblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcmltYXJ5X2tleSApO1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgcmVwcmVzZW50cyBhIHJlYWRvbmx5IGZpZWxkIHVzaW5nIHRoZVxuICogcHJvdmlkZWQgc2NoZW1hLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIGEgcmVhZG9ubHkgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1JlYWRPbmx5ID0gKCBmaWVsZE5hbWUsIHNjaGVtYSApID0+XG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0gKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnJlYWRvbmx5ICkgJiZcblx0c2NoZW1hWyBmaWVsZE5hbWUgXS5yZWFkb25seTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgaXMgYSBcImVudGl0eVwiIGZpZWxkIHVzaW5nIHRoZSBwcm92aWRlZFxuICogc2NoZW1hLlxuICpcbiAqIEFuIFwiZW50aXR5XCIgZmllbGQgaXMgYW55IGZpZWxkIHRoYXQgc2F0aXNmaWVzIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiAtIGZpZWxkIGV4aXN0cyBpbiB0aGUgc2NoZW1hXG4gKiAtIGl0IGlzIG5vdCByZWFkb25seSBvciBpcyBhIHByaW1hcnkga2V5IGZpZWxkLlxuICogLSBpdCBpcyBub3QgYSB1dGMgZmllbGQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGlzIGlzIGFuIGVudGl0eSBmaWVsZFxuICovXG5leHBvcnQgY29uc3QgaXNFbnRpdHlGaWVsZCA9ICggZmllbGROYW1lLCBzY2hlbWEgKSA9PlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgJiZcblx0KCAhIGlzUmVhZE9ubHkoIGZpZWxkTmFtZSwgc2NoZW1hICkgfHxcblx0XHRpc1ByaW1hcnlLZXlGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKVxuXHQpICYmXG5cdCEgaXNVVENEYXRlVGltZUZpZWxkKCBmaWVsZE5hbWUgKSAmJlxuXHRmaWVsZE5hbWUgIT09ICdfcHJvdGVjdGVkJztcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZmllbGQgcmVwcmVzZW50cyBhIHZhbHVlIG9mIG1vbmV5IGZyb20gdGhlIHByb3ZpZGVkXG4gKiBzY2hlbWEuXG4gKlxuICogQSBmaWVsZCBpcyBhIG1vbmV5IGZpZWxkIGlmIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgc2F0aXNmaWVkOlxuICpcbiAqIC0gSXQgZXhpc3RzIGluIHRoZSBzY2hlbWFcbiAqIC0gSXQgaGFzIGEgcHJldHR5IHByb3BlcnR5XG4gKiAtIFRoZSBwcmV0dHkgcHJvcGVydHkgdmFsdWUgaGFzIGEgZm9ybWF0IHByb3BlcnR5LlxuICogLSBUaGUgZm9ybWF0IHByb3BlcnR5IGlzIGVxdWFsIHRvICdtb25leSdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGl0IGlzIGEgbW9uZXkgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc01vbmV5RmllbGQgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT5cblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcyApICYmXG5cdGhhc1ByZXR0eVByb3BlcnR5KCBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMgKSAmJlxuXHRoYXNGb3JtYXRQcm9wZXJ0eSggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnByZXR0eSApICYmXG5cdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5wcmV0dHkuZm9ybWF0ID09PSAnbW9uZXknO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBmaWVsZCBpcyBhbiBlbnVtIHR5cGUgZmllbGQgYXMgZGVmaW5lZCBpbiB0aGUgcHJvdmlkZWRcbiAqIHNjaGVtYS5cbiAqXG4gKiBOb3RlOiB0aGlzIG9ubHkgZXZhbHVhdGVzIHRoZSB0b3AtbGV2ZWwgZm9yIHRoZSBmaWVsZCBzY2hlbWEuICBJZiB0aGUgZmllbGRcbiAqIGluIHRoZSBzY2hlbWEgaXMgb2YgdHlwZSAnb2JqZWN0JyBhbmQgb25lIG9mIHRoZSBvYmplY3QgcHJvcGVydGllcyBpcyBvZiB0eXBlXG4gKiAnZW51bScgdGhpcyB3aWxsIG5vdCBjb25zaWRlciBpdCBhbiBcImVudW1cIiBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBpZiB0aGUgZmllbGQgaXMgYW4gZW51bSB0eXBlIGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNFbnVtRmllbGQgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT5cblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXSApICYmXG5cdGhhc0VudW1Qcm9wZXJ0eSggc2NoZW1hWyBmaWVsZE5hbWUgXSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0uZW51bS5sZW5ndGggKSAmJlxuXHRzY2hlbWFbIGZpZWxkTmFtZSBdLmVudW0ubGVuZ3RoID4gMDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBhcHBseUZpbHRlcnMgfSBmcm9tICdAd29yZHByZXNzL2hvb2tzJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBDb25zdGFudHMgZGVzY3JpYmluZyB0aGUgY3VycmVudCBcInNhdmUgc3RhdGVcIiBmb3IgYW4gZW50aXR5LlxuICpcbiAqIEB0eXBlIHt7Q0xFQU46IFN5bWJvbCwgTkVXOiBTeW1ib2wsIERJUlRZOiBTeW1ib2x9fVxuICovXG5leHBvcnQgY29uc3QgU0FWRV9TVEFURSA9IHtcblx0Q0xFQU46IFN5bWJvbCggJ0VudGl0eSBpcyBwZXJzaXN0ZWQuJyApLFxuXHRORVc6IFN5bWJvbCggJ0VudGl0eSBpcyBuZXcuJyApLFxuXHRESVJUWTogU3ltYm9sKCAnRXhpc3RpbmcgZW50aXR5IGhhcyBjaGFuZ2VzIGFuZCBuZWVkcyBwZXJzaXN0ZWQuJyApLFxufTtcblxuLyoqXG4gKiBWYWxpZGF0aW9uIHR5cGVzIGFyZSBmb3Igc2NoZW1hJ3MgdGhhdCBoYXZlIHZhbHVlIHZhcmlhdGlvbnMuXG4gKiBAdHlwZSB7e1JBVzogc3RyaW5nLCBSRU5ERVJFRDogc3RyaW5nLCBQUkVUVFk6IHN0cmluZ319XG4gKi9cbmV4cG9ydCBjb25zdCBWQUxJREFURV9UWVBFID0ge1xuXHRSQVc6ICdyYXcnLFxuXHRSRU5ERVJFRDogJ3JlbmRlcmVkJyxcblx0UFJFVFRZOiAncHJldHR5Jyxcbn07XG5cbi8qKlxuICogUHJpdmF0ZSBwcm9wZXJ0aWVzIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgQmFzZSBFbnRpdHkgQ2xhc3NcbiAqIEB0eXBlIHt7c2F2ZVN0YXRlOiBib29sZWFufX1cbiAqL1xuZXhwb3J0IGNvbnN0IFBSSVZBVEVfUFJPUEVSVElFUyA9IHtcblx0U0FWRV9TVEFURTogU3ltYm9sKCAnYmFzZUVudGl0eVByaXZhdGVQcm9wZXJ0aWVzU2F2ZVN0YXRlJyApLFxuXHRWQUxJREFURV9UWVBFUzogU3ltYm9sKCAnYmFzZUVudGl0eVByaXZhdGVQcm9wZXJ0aWVzVmFsaWRhdGVUeXBlcycgKSxcbn07XG5cbi8qKlxuICogSGFyZGNvZGVkIGxpc3Qgb2YgbW9kZWwgcHJlZml4ZXMgZm9yIGZpZWxkcyBvbiBtb2RlbHMuXG5cbiAqIEEgbW9kZWwgcHJlZml4IGlzIHNvbWV0aGluZyB0aGF0IFwibmFtZXNwYWNlc1wiIGEgZmllbGQgb24gYSBtb2RlbC4gIEZvclxuICogZXhhbXBsZSwgaWYgdGhlIGZpZWxkIGlzIFwiRVZUX0lEXCIsIHRoZW4gdGhlIHByZWZpeCBpcyBcIkVWVFwiOyBpZiB0aGUgZmllbGQgaXNcbiAqIFwiRFRUX0VWVF9zdGFydFwiLCB0aGVuIHRoZSBwcmVmaXhlcyBhcmUgXCJEVFRcIiwgYW5kIFwiRFRUX0VWVFwiLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgZmlsdGVyZWQgb2JqZWN0IGluZGV4ZWQgYnkgbW9kZWwgbmFtZSBhbmQgdGhlIHZhbHVlcyBhcmVcbiAqIGFuIGFycmF5IG9mIG1vZGVsIHByZWZpeGVzIGZvciB0aGF0IG1vZGVsLlxuICovXG5leHBvcnQgY29uc3QgTU9ERUxfUFJFRklYRVMgPSAoIG1vZGVsTmFtZSApID0+IHtcblx0Y29uc3QgcHJlZml4TWFwID0gYXBwbHlGaWx0ZXJzKFxuXHRcdCdGSEVFX19FTlRJVFlfRkFDVE9SWV9fQ09OU1RBTlRTX19NT0RFTF9QUkVGSVhFUycsXG5cdFx0e1xuXHRcdFx0YW5zd2VyOiBbICdBTlMnIF0sXG5cdFx0XHRhdHRlbmRlZTogWyAnQVRUJyBdLFxuXHRcdFx0Y2hhbmdlX2xvZzogWyAnTE9HJyBdLFxuXHRcdFx0Y2hlY2tpbjogWyAnQ0hLJyBdLFxuXHRcdFx0Y291bnRyeTogWyAnQ05UJyBdLFxuXHRcdFx0Y3VycmVuY3k6IFsgJ0NVUicgXSxcblx0XHRcdGN1cnJlbmN5X3BheW1lbnRfbWV0aG9kOiBbICdDUE0nIF0sXG5cdFx0XHRkYXRldGltZTogWyAnRFRUJywgJ0RUVF9FVlQnIF0sXG5cdFx0XHRkYXRldGltZV90aWNrZXQ6IFsgJ0RUSycgXSxcblx0XHRcdGV2ZW50OiBbICdFVlQnIF0sXG5cdFx0XHRldmVudF9tZXNzYWdlX3RlbXBsYXRlOiBbICdFTVQnIF0sXG5cdFx0XHRldmVudF9xdWVzdGlvbl9ncm91cDogWyAnRVFHJyBdLFxuXHRcdFx0ZXZlbnRfdmVudWU6IFsgJ0VWVicgXSxcblx0XHRcdGV4dHJhX2pvaW46IFsgJ0VYSicgXSxcblx0XHRcdGV4dHJhX21ldGE6IFsgJ0VYTScgXSxcblx0XHRcdGxpbmVfaXRlbTogWyAnTElOJyBdLFxuXHRcdFx0bWVzc2FnZTogWyAnTVNHJyBdLFxuXHRcdFx0bWVzc2FnZV90ZW1wbGF0ZTogWyAnTVRQJyBdLFxuXHRcdFx0bWVzc2FnZV90ZW1wbGF0ZV9ncm91cDogWyAnR1JQJywgJ01UUCcgXSxcblx0XHRcdHBheW1lbnQ6IFsgJ1BBWScgXSxcblx0XHRcdHBheW1lbnRfbWV0aG9kOiBbICdQTUQnIF0sXG5cdFx0XHRwb3N0X21ldGE6IFsgJ21ldGEnIF0sXG5cdFx0XHRwcmljZTogWyAnUFJDJyBdLFxuXHRcdFx0cHJpY2VfdHlwZTogWyAnUFJUJyBdLFxuXHRcdFx0cXVlc3Rpb246IFsgJ1FTVCcgXSxcblx0XHRcdHF1ZXN0aW9uX2dyb3VwOiBbICdRU0cnIF0sXG5cdFx0XHRxdWVzdGlvbl9ncm91cF9xdWVzdGlvbjogWyAnUUdRJyBdLFxuXHRcdFx0cXVlc3Rpb25fb3B0aW9uOiBbICdRU08nIF0sXG5cdFx0XHRyZWdpc3RyYXRpb246IFsgJ1JFRycgXSxcblx0XHRcdHJlZ2lzdHJhdGlvbl9wYXltZW50OiBbICdSUFknIF0sXG5cdFx0XHRzdGF0ZTogWyAnU1RBJyBdLFxuXHRcdFx0c3RhdHVzOiBbICdTVFMnIF0sXG5cdFx0XHR0ZXJtOiBbICd0ZXJtJyBdLFxuXHRcdFx0dGVybV9yZWxhdGlvbnNoaXA6IFtdLFxuXHRcdFx0dGVybV90YXhvbm9teTogWyAndGVybV90YXhvbm9teScgXSxcblx0XHRcdHRpY2tldDogWyAnVEtUJyBdLFxuXHRcdFx0dGlja2V0X3ByaWNlOiBbICdUS1AnIF0sXG5cdFx0XHR0aWNrZXRfdGVtcGxhdGU6IFsgJ1RUTScgXSxcblx0XHRcdHRyYW5zYWN0aW9uOiBbICdUWE4nIF0sXG5cdFx0XHR2ZW51ZTogWyAnVk5VJyBdLFxuXHRcdFx0d3BfdXNlcjogWyAndXNlcicgXSxcblx0XHR9ICk7XG5cdHJldHVybiAhIGlzVW5kZWZpbmVkKCBwcmVmaXhNYXBbIG1vZGVsTmFtZSBdICkgP1xuXHRcdHByZWZpeE1hcFsgbW9kZWxOYW1lIF0gOlxuXHRcdFtdO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRjYW1lbENhc2UsXG5cdHVwcGVyRmlyc3QsXG5cdGZvckVhY2gsXG5cdGlzVW5kZWZpbmVkLFxuXHRpc0FycmF5LFxuXHRrZXlzLFxuXHRzb3J0QnksXG59IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgY3VpZCBmcm9tICdjdWlkJztcbmltcG9ydCB7IEludmFsaWRBcmd1bWVudCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0YXNzZXJ0VmFsaWRGaWVsZEFuZFZhbHVlQWdhaW5zdFNjaGVtYSxcblx0YXNzZXJ0VmFsaWRWYWx1ZUZvclByZXBhcmVkRmllbGQsXG59IGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5pbXBvcnQge1xuXHRkZXJpdmVSZW5kZXJlZFZhbHVlLFxuXHRkZXJpdmVQcmVwYXJlZFZhbHVlRm9yRmllbGQsXG5cdGdldFJlbGF0aW9uTmFtZUZyb21MaW5rLFxuXHRnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyxcblx0Z2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvclBlcnNpc3RpbmcsXG5cdGdldFByaW1hcnlLZXlGaWVsZHNGcm9tU2NoZW1hLFxuXHRnZXRFbnRpdHlGaWVsZHNGcm9tU2NoZW1hLFxuXHRnZXREZWZhdWx0VmFsdWVGb3JGaWVsZCxcblx0ZGVyaXZlVmFsaWRhdGVUeXBlRm9yRmllbGQsXG59IGZyb20gJy4vZXh0cmFjdG9ycyc7XG5pbXBvcnQge1xuXHRpc0VudGl0eUZpZWxkLFxuXHRpc1ByaW1hcnlLZXlGaWVsZCxcbn0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQgeyBQUklWQVRFX1BST1BFUlRJRVMsIFNBVkVfU1RBVEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKihcbiAqIEEgZ2VuZXJpYyBnZXR0ZXIgY3JlYXRvciBmb3IgYSBwcm92aWRlZCBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWUgIFRoZSBuYW1lIG9mIHRoZSBhY2Nlc3Nvci5cbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgdXNlZCB0byBwYXNzIHRocm91Z2ggYWRkaXRpb25hbCBvcHRpb25zIGZvciB0aGVcbiAqIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBjYWxsLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlR2V0dGVyID0gKCBpbnN0YW5jZSwgZmllbGROYW1lLCBmaWVsZFZhbHVlLCBvcHRzID0ge30gKSA9PiB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggaW5zdGFuY2UsIGZpZWxkTmFtZSwge1xuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiBmaWVsZFZhbHVlO1xuXHRcdH0sXG5cdFx0Li4ub3B0cyxcblx0fSApO1xufTtcblxuLyoqXG4gKiBUaGlzIGNyZWF0ZXMgYSBnZXR0ZXIgdGhhdCBjYWxscyB0aGUgcHJvdmlkZWQgY2FsbGJhY2sgd2hlbiBpbnZva2VkLlxuICpcbiAqIFRoZSBjYWxsYmFjayByZWNlaXZlcyB0aGUgYGluc3RhbmNlYCBhcmd1bWVudCBwYXNzZWQgdGhyb3VnaFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpfSBjYWxsQmFja1xuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhbGxiYWNrR2V0dGVyID0gKFxuXHRpbnN0YW5jZSxcblx0cHJvcGVydHlOYW1lLFxuXHRjYWxsQmFjayxcblx0b3B0cyA9IHt9XG4pID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBpbnN0YW5jZSwgcHJvcGVydHlOYW1lLCB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIGNhbGxCYWNrKCBpbnN0YW5jZSApO1xuXHRcdH0sXG5cdFx0Li4ub3B0cyxcblx0fSApO1xufTtcblxuLyoqXG4gKiBBIGdlbmVyaWMgZ2V0dGVyIGFuZCBzZXR0ZXIgY3JlYXRvciBmb3IgYSBwcm92aWRlZCBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSAgaW5pdGlhbEZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIE9wdGlvbmFsLCBwYXNzIHRocm91Z2ggb3B0aW9ucyB1c2VkIGJ5XG4gKiBPYmplY3QuZGVmaW5lUHJvcGVydHlcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUdldHRlckFuZFNldHRlciA9IChcblx0aW5zdGFuY2UsXG5cdGZpZWxkTmFtZSxcblx0aW5pdGlhbEZpZWxkVmFsdWUsXG5cdG9wdHMgPSB7fSxcbikgPT4ge1xuXHRsZXQgcHJvcGVydHlWYWx1ZSA9IGluaXRpYWxGaWVsZFZhbHVlO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGluc3RhbmNlLCBmaWVsZE5hbWUsIHtcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gcHJvcGVydHlWYWx1ZTtcblx0XHR9LFxuXHRcdHNldCggcmVjZWl2ZWRWYWx1ZSApIHtcblx0XHRcdGNvbnN0IGlzUHJpbWFyeUZpZWxkID0gaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hICk7XG5cdFx0XHRpZiAoICEgaW5zdGFuY2UuaXNOZXcgJiYgaXNQcmltYXJ5RmllbGQgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGFzc2VydFZhbGlkVmFsdWVGb3JQcmVwYXJlZEZpZWxkKFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdHJlY2VpdmVkVmFsdWUsXG5cdFx0XHRcdGluc3RhbmNlXG5cdFx0XHQpO1xuXHRcdFx0aWYgKCAhIGlzUHJpbWFyeUZpZWxkICkge1xuXHRcdFx0XHRzZXRTYXZlU3RhdGUoIGluc3RhbmNlLCBTQVZFX1NUQVRFLkRJUlRZICk7XG5cdFx0XHRcdHNldEZpZWxkVG9QZXJzaXN0KCBpbnN0YW5jZSwgZmllbGROYW1lICk7XG5cdFx0XHR9XG5cdFx0XHRwcm9wZXJ0eVZhbHVlID0gcmVjZWl2ZWRWYWx1ZTtcblx0XHR9LFxuXHRcdC4uLm9wdHMsXG5cdH0gKTtcbn07XG5cbi8qKlxuICogQSBnZXR0ZXIgYW5kIHNldHRlciBjcmVhdG9yIGZvciBhbiBmaWVsZCBhbGlhcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmlnaW5hbEZpZWxkTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGFsaWFzRmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQWxpYXNHZXR0ZXJBbmRTZXR0ZXIgPSAoXG5cdGluc3RhbmNlLFxuXHRvcmlnaW5hbEZpZWxkTmFtZSxcblx0YWxpYXNGaWVsZE5hbWUsXG5cdG9wdHMgPSB7fSxcbikgPT4ge1xuXHRpZiAoIG9yaWdpbmFsRmllbGROYW1lICE9PSBhbGlhc0ZpZWxkTmFtZSApIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGluc3RhbmNlLCBhbGlhc0ZpZWxkTmFtZSwge1xuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gaW5zdGFuY2VbIG9yaWdpbmFsRmllbGROYW1lIF07XG5cdFx0XHR9LFxuXHRcdFx0c2V0KCByZWNlaXZlZFZhbHVlICkge1xuXHRcdFx0XHRyZXR1cm4gaW5zdGFuY2VbIG9yaWdpbmFsRmllbGROYW1lIF0gPSByZWNlaXZlZFZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdC4uLm9wdHMsXG5cdFx0fSApO1xuXHR9XG59O1xuXG4vKipcbiAqIEEgZ2V0dGVyIGNyZWF0b3IgZm9yIGEgZmllbGQgYWxpYXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JpZ2luYWxGaWVsZE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBhbGlhc0ZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUFsaWFzR2V0dGVyID0gKFxuXHRpbnN0YW5jZSxcblx0b3JpZ2luYWxGaWVsZE5hbWUsXG5cdGFsaWFzRmllbGROYW1lLFxuXHRvcHRzID0ge30sXG4pID0+IHtcblx0aWYgKCBvcmlnaW5hbEZpZWxkTmFtZSAhPT0gYWxpYXNGaWVsZE5hbWUgKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBpbnN0YW5jZSwgYWxpYXNGaWVsZE5hbWUsIHtcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIGluc3RhbmNlWyBvcmlnaW5hbEZpZWxkTmFtZSBdO1xuXHRcdFx0fSxcblx0XHRcdC4uLm9wdHMsXG5cdFx0fSApO1xuXHR9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmbHVlbnQgc2V0dGVyIG9uIHRoZSBwcm92aWRlZCBpbnN0YW5jZSBmb3IgdGhlIGdpdmVuIGZpZWxkIG5hbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyAgT3B0aW9ucyBmb3IgT2JqZWN0LmRlZmluZVByb3BlcnR5XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVGbHVlbnRTZXR0ZXIgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUsIG9wdHMgPSB7fSApID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBpbnN0YW5jZSwgJ3NldCcgKyB1cHBlckZpcnN0KCBmaWVsZE5hbWUgKSwge1xuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiAoIHJlY2VpdmVkVmFsdWUgKSA9PiB7XG5cdFx0XHRcdGluc3RhbmNlWyBmaWVsZE5hbWUgXSA9IHJlY2VpdmVkVmFsdWU7XG5cdFx0XHRcdHJldHVybiBpbnN0YW5jZTtcblx0XHRcdH07XG5cdFx0fSxcblx0XHQuLi5vcHRzLFxuXHR9ICk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgaW5pdGlhbCBnZXR0ZXJzIGFuZCBzZXR0ZXJzIGZvciBlbnRpdGllcyBvbiB0aGUgcHJvdmlkZWQgZW50aXR5XG4gKiBpbnN0YW5jZSB1c2luZyB0aGUgZ2l2ZW4gZGF0YS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICoga2V5cyBvbiBpbnN0YW5jZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVudGl0eUdldHRlcnNBbmRTZXR0ZXJzID0gKCBpbnN0YW5jZSApID0+IHtcblx0Y29uc3QgcHJpbWFyeUtleXMgPSBbXTtcblx0Zm9yRWFjaChcblx0XHRpbnN0YW5jZS5vcmlnaW5hbEZpZWxkc0FuZFZhbHVlcyxcblx0XHQoIGZpZWxkVmFsdWUsIGZpZWxkTmFtZSApID0+IHtcblx0XHRcdGNvbnN0IGlzUHJpbWFyeUtleSA9IGlzUHJpbWFyeUtleUZpZWxkKCBmaWVsZE5hbWUsIGluc3RhbmNlLnNjaGVtYSApO1xuXHRcdFx0c2V0VmFsaWRhdGVUeXBlRm9yRmllbGQoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUgKTtcblx0XHRcdGlmICggaXNFbnRpdHlGaWVsZCggZmllbGROYW1lLCBpbnN0YW5jZS5zY2hlbWEgKSApIHtcblx0XHRcdFx0aWYgKCBpbnN0YW5jZS5pc05ldyApIHtcblx0XHRcdFx0XHRhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZChcblx0XHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdFx0XHRpbnN0YW5jZVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YXNzZXJ0VmFsaWRGaWVsZEFuZFZhbHVlQWdhaW5zdFNjaGVtYShcblx0XHRcdFx0XHRcdGluc3RhbmNlLm1vZGVsTmFtZSxcblx0XHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdFx0XHRpbnN0YW5jZVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0c2V0SW5pdGlhbEVudGl0eUZpZWxkc0FuZFZhbHVlcyhcblx0XHRcdFx0XHRpbnN0YW5jZSxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRpc1ByaW1hcnlLZXlcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdGlmICggZmllbGROYW1lID09PSAnX2NhbGN1bGF0ZWRfZmllbGRzJyApIHtcblx0XHRcdFx0c2V0Q2FsY3VsYXRlZEZpZWxkQW5kVmFsdWVzKCBpbnN0YW5jZSwgZmllbGRWYWx1ZSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBmaWVsZE5hbWUgPT09ICdfcHJvdGVjdGVkJyApIHtcblx0XHRcdFx0cG9wdWxhdGVQcm90ZWN0ZWRGaWVsZHNQcm9wZXJ0eSggaW5zdGFuY2UsIGZpZWxkVmFsdWUgKTtcblx0XHRcdH1cblx0XHRcdGlmICggZmllbGROYW1lID09PSAnbGluaycgKSB7XG5cdFx0XHRcdGNyZWF0ZUdldHRlciggaW5zdGFuY2UsICdsaW5rJywgZmllbGRWYWx1ZSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBmaWVsZE5hbWUgPT09ICdfbGlua3MnICkge1xuXHRcdFx0XHRzZXRSZXNvdXJjZXMoIGluc3RhbmNlLCBmaWVsZFZhbHVlICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoICEgaW5zdGFuY2UuaXNOZXcgJiYgaXNQcmltYXJ5S2V5ICkge1xuXHRcdFx0XHRwcmltYXJ5S2V5cy5wdXNoKCBmaWVsZE5hbWUgKTtcblx0XHRcdH1cblx0XHR9XG5cdCk7XG5cdGlmICggISBpbnN0YW5jZS5pc05ldyAmJiBwcmltYXJ5S2V5cy5sZW5ndGggKSB7XG5cdFx0Y3JlYXRlUHJpbWFyeUtleUZpZWxkR2V0dGVycyggaW5zdGFuY2UsIHByaW1hcnlLZXlzICk7XG5cdH1cblxuXHRwb3B1bGF0ZVByaW1hcnlLZXlzKCBpbnN0YW5jZSApO1xuXHRwb3B1bGF0ZU1pc3NpbmdGaWVsZHMoIGluc3RhbmNlICk7XG59O1xuXG4vKipcbiAqIFBvcHVsYXRlcyB0aGUgYHByb3RlY3RlZEZpZWxkc2AgcHJvcGVydHkgb24gdGhlIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtBcnJheX0gcHJvdGVjdGVkRmllbGRzXG4gKi9cbmNvbnN0IHBvcHVsYXRlUHJvdGVjdGVkRmllbGRzUHJvcGVydHkgPSAoIGluc3RhbmNlLCBwcm90ZWN0ZWRGaWVsZHMgKSA9PiB7XG5cdC8vIGdldCBhbnkgY2FsY3VsYXRlZCBwcm90ZWN0ZWQgZmllbGRzLlxuXHRjb25zdCBjYWxjdWxhdGVkRmllbGRzID0gaW5zdGFuY2Vcblx0XHQub3JpZ2luYWxGaWVsZHNBbmRWYWx1ZXNcblx0XHQuX2NhbGN1bGF0ZWRfZmllbGRzIHx8IHt9O1xuXHRpZiAoXG5cdFx0Y2FsY3VsYXRlZEZpZWxkcy5fcHJvdGVjdGVkICYmXG5cdFx0aXNBcnJheSggY2FsY3VsYXRlZEZpZWxkcy5fcHJvdGVjdGVkIClcblx0KSB7XG5cdFx0cHJvdGVjdGVkRmllbGRzID0gW1xuXHRcdFx0Li4ucHJvdGVjdGVkRmllbGRzLFxuXHRcdFx0Li4uY2FsY3VsYXRlZEZpZWxkcy5fcHJvdGVjdGVkLFxuXHRcdF07XG5cdH1cblx0Y3JlYXRlR2V0dGVyKCBpbnN0YW5jZSwgJ3Byb3RlY3RlZEZpZWxkcycsIHByb3RlY3RlZEZpZWxkcyApO1xufTtcblxuLyoqXG4gKiBUaGlzIHBvcHVsYXRlcyBwcmltYXJ5IGtleSBmaWVsZHMuXG4gKiBOb3RlIHRoYXQgaXQgYWxzbyBvdmVycmlkZXMgYW55IHByaW1hcnkga2V5IHZhbHVlcy9wcm9wZXJ0aWVzIHRoYXQgYXJlXG4gKiBhbHJlYWR5IHNldCBpbiB0aGUgZW50aXR5IHNvIGlzIG9ubHkgcHJvY2Vzc2VkIHdoZW4gdGhlIGluc3RhbmNlIGlzIG5ldy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqL1xuY29uc3QgcG9wdWxhdGVQcmltYXJ5S2V5cyA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdGlmICggISBpbnN0YW5jZS5pc05ldyApIHtcblx0XHRyZXR1cm47XG5cdH1cblx0Y29uc3QgcHJpbWFyeUtleXMgPSBnZXRQcmltYXJ5S2V5RmllbGRzRnJvbVNjaGVtYSggaW5zdGFuY2UgKTtcblx0Zm9yRWFjaCggcHJpbWFyeUtleXMsIChcblx0XHRzY2hlbWFQcm9wZXJ0aWVzLFxuXHRcdHNjaGVtYUZpZWxkXG5cdCkgPT4ge1xuXHRcdC8vIGFsd2F5cyBkZWxldGUgYW5kIG92ZXJyaWRlIHdoYXQgaXMgZXhpc3RpbmcuXG5cdFx0aWYgKCBpbnN0YW5jZVsgc2NoZW1hRmllbGQgXSApIHtcblx0XHRcdGRlbGV0ZSBpbnN0YW5jZVsgc2NoZW1hRmllbGQgXTtcblx0XHR9XG5cdFx0Y3JlYXRlR2V0dGVyQW5kU2V0dGVyKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRzY2hlbWFGaWVsZCxcblx0XHRcdGN1aWQoKSxcblx0XHRcdHsgY29uZmlndXJhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlIH1cblx0XHQpO1xuXHRcdGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyRm9yRmllbGQoIGluc3RhbmNlLCBzY2hlbWFGaWVsZCApO1xuXHR9ICk7XG5cdGNyZWF0ZVByaW1hcnlLZXlGaWVsZEdldHRlcnMoXG5cdFx0aW5zdGFuY2UsXG5cdFx0a2V5cyggcHJpbWFyeUtleXMgKVxuXHQpO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSB2YWxpZGF0ZSB0eXBlIGZvciBhIGZpZWxkIHByb3BlcnR5LlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqL1xuY29uc3Qgc2V0VmFsaWRhdGVUeXBlRm9yRmllbGQgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUgKSA9PiB7XG5cdGluc3RhbmNlWyBQUklWQVRFX1BST1BFUlRJRVMuVkFMSURBVEVfVFlQRVMgXVsgZmllbGROYW1lIF0gPVxuXHRcdGRlcml2ZVZhbGlkYXRlVHlwZUZvckZpZWxkKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIGluc3RhbmNlLnNjaGVtYSApO1xufTtcblxuLyoqXG4gKiAgUG9wdWxhdGVzIG1pc3NpbmcgZmllbGRzIGFuZCB2YWx1ZXMgdXNpbmcgZGVmYXVsdHMgcHJvdmlkZWQgYnkgc2NoZW1hLiAgSWZcbiAqICBzY2hlbWEgZG9lc24ndCBwcm92aWRlIGEgZGVmYXVsdCB0aGVuIHRoaXMgd2lsbCBwb3B1bGF0ZSB0aGUgZmllbGQgd2l0aCBhXG4gKiAgZGVmYXVsdCB2YWx1ZSB0aGF0IG1hdGNoZXMgdGhlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKi9cbmNvbnN0IHBvcHVsYXRlTWlzc2luZ0ZpZWxkcyA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdGlmICggdHlwZW9mIGluc3RhbmNlLnByb3RlY3RlZEZpZWxkcyA9PT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0cG9wdWxhdGVQcm90ZWN0ZWRGaWVsZHNQcm9wZXJ0eSggaW5zdGFuY2UsIFtdICk7XG5cdH1cblx0aWYgKCAhIGluc3RhbmNlLmlzTmV3ICkge1xuXHRcdHJldHVybjtcblx0fVxuXHRmb3JFYWNoKFxuXHRcdGdldEVudGl0eUZpZWxkc0Zyb21TY2hlbWEoIGluc3RhbmNlICksXG5cdFx0KCBzY2hlbWFQcm9wZXJ0aWVzLCBmaWVsZE5hbWUgKSA9PiB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHR5cGVvZiBpbnN0YW5jZVsgZmllbGROYW1lIF0gPT09ICd1bmRlZmluZWQnICYmXG5cdFx0XHRcdCEgaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hIClcblx0XHRcdCkge1xuXHRcdFx0XHRzZXRJbml0aWFsRW50aXR5RmllbGRzQW5kVmFsdWVzKFxuXHRcdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHQpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIGVudGl0eSBmaWVsZHMgYW5kIHZhbHVlcyBmcm9tIHRoaXMgZW50aXR5IGluc3RhbmNlXG4gKiBmb3IgdXNlIGluIGNsb25pbmcgdGhlIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBQbGFpbiBvYmplY3Qgb2YgYWxsIGZpZWxkOnZhbHVlIHBhaXJzLlxuICovXG5jb25zdCBmb3JDbG9uZSA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdHJldHVybiBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyggaW5zdGFuY2UgKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHBsYWluIG9iamVjdCBvZiB0aGUgZW50aXR5IGZpZWxkcyBhbmQgdmFsdWVzIGZyb20gdGhpcyBlbnRpdHlcbiAqIGluc3RhbmNlIHByZXBhcmVkIGZvciB1c2UgaW4gYW4gdXBkYXRlIHJlcXVlc3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtPYmplY3R9IFBsYWluIG9iamVjdCBvZiBmaWVsZDp2YWx1ZSBwYWlycy5cbiAqL1xuY29uc3QgZm9yVXBkYXRlID0gKCBpbnN0YW5jZSApID0+IHtcblx0cmV0dXJuIGdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JQZXJzaXN0aW5nKCBpbnN0YW5jZSApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIHRoZSBlbnRpdHkgZmllbGRzIGFuZCB2YWx1ZXMgZnJvbSB0aGlzIGVudGl0eVxuICogaW5zdGFuY2UgcHJlcGFyZWQgZm9yIHVzZSBpbiBhbiBpbnNlcnQgcmVxdWVzdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gUGxhaW4gb2JqZWN0IG9mIGZpZWxkOnZhbHVlIHBhaXJzLlxuICovXG5jb25zdCBmb3JJbnNlcnQgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRjb25zdCBlbnRpdHlWYWx1ZXMgPSBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yUGVyc2lzdGluZyhcblx0XHRpbnN0YW5jZSxcblx0XHR0cnVlXG5cdCk7XG5cdGluc3RhbmNlLnByaW1hcnlLZXlzLmZvckVhY2goICggcHJpbWFyeUtleSApID0+IHtcblx0XHRlbnRpdHlWYWx1ZXNbIHByaW1hcnlLZXkgXSA9IGluc3RhbmNlWyBwcmltYXJ5S2V5IF07XG5cdH0gKTtcblx0cmV0dXJuIGVudGl0eVZhbHVlcztcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHBsYWluIG9iamVjdCBvZiB0aGUgZW50aXR5IGZpZWxkcyBhbmQgdmFsdWVzIGZyb20gdGhpcyBlbnRpdHlcbiAqIGluc3RhbmNlIHByZXBhcmVkIGZvciB1c2UgaW4gZWl0aGVyIGFuIGluc2VydCBvciB1cGRhdGUgcmVxdWVzdC4gIFRoZSB0eXBlXG4gKiBpcyBhdXRvbWF0aWNhbGx5IGRlcml2ZWQgZnJvbSB0aGUgZGV0ZXJtaW5pbmcgd2hldGhlciB0aGUgZW50aXR5IGlzIFwibmV3XCIgb3JcbiAqIG5vdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gUGxhaW4gb2JqZWN0IG9mIGZpZWxkOnZhbHVlIHBhaXJzLlxuICovXG5jb25zdCBmb3JQZXJzaXN0ID0gKCBpbnN0YW5jZSApID0+IHtcblx0aWYgKCBpbnN0YW5jZS5pc05ldyApIHtcblx0XHRyZXR1cm4gZm9ySW5zZXJ0KCBpbnN0YW5jZSApO1xuXHR9XG5cdHJldHVybiBmb3JVcGRhdGUoIGluc3RhbmNlICk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgZ2V0dGVycyBmb3IgcmV0cmlldmluZyB0aGUgZmllbGRzIGFuZCB2YWx1ZXMgb2YgdGhlIGVudGl0eSBpbnN0YW5jZVxuICogZm9yIGluc2VydCBvciB1cGRhdGUgcmVxdWVzdHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVQZXJzaXN0aW5nR2V0dGVyc0FuZFNldHRlcnMgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRjcmVhdGVDYWxsYmFja0dldHRlciggaW5zdGFuY2UsICdmb3JVcGRhdGUnLCBmb3JVcGRhdGUgKTtcblx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoIGluc3RhbmNlLCAnZm9ySW5zZXJ0JywgZm9ySW5zZXJ0ICk7XG5cdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKCBpbnN0YW5jZSwgJ2ZvclBlcnNpc3QnLCBmb3JQZXJzaXN0ICk7XG5cdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKCBpbnN0YW5jZSwgJ2ZvckNsb25lJywgZm9yQ2xvbmUgKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBpbml0aWFsIGVudGl0eSBmaWVsZCBhY2Nlc3NvcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNQcmltYXJ5S2V5XG4gKi9cbmNvbnN0IHNldEluaXRpYWxFbnRpdHlGaWVsZHNBbmRWYWx1ZXMgPSAoXG5cdGluc3RhbmNlLFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdGlzUHJpbWFyeUtleSA9IGZhbHNlLFxuKSA9PiB7XG5cdGlmICggaXNVbmRlZmluZWQoIGZpZWxkVmFsdWUgKSApIHtcblx0XHRmaWVsZFZhbHVlID0gZ2V0RGVmYXVsdFZhbHVlRm9yRmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hICk7XG5cdFx0c2V0VmFsaWRhdGVUeXBlRm9yRmllbGQoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUgKTtcblx0fVxuXHRjcmVhdGVSYXdFbnRpdHlHZXR0ZXJzU2V0dGVycyhcblx0XHRpbnN0YW5jZSxcblx0XHRmaWVsZE5hbWUsXG5cdFx0ZGVyaXZlUHJlcGFyZWRWYWx1ZUZvckZpZWxkKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIGluc3RhbmNlICksXG5cdFx0aXNQcmltYXJ5S2V5XG5cdCk7XG5cdGlmICggISBpc1ByaW1hcnlLZXkgKSB7XG5cdFx0Y3JlYXRlUmVuZGVyZWRHZXR0ZXJzKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRkZXJpdmVSZW5kZXJlZFZhbHVlKCBmaWVsZFZhbHVlIClcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgcmF3IGVudGl0eSBnZXR0ZXJzIGFuZCBzZXR0ZXJzLiAgVGhlc2UgYXJlIHRoZSBwcm9wZXJ0aWVzIG9mIGFuXG4gKiBlbnRpdHkgdGhhdCBoYXZlIHRoZSB2YWx1ZXMgdXNlZCBmb3Igbm90IG9ubHkgZ2V0dGluZyBidXQgYWxzbyBzZXR0aW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzUHJpbWFyeUtleSBzZXQgdG8gdHJ1ZSBpZiBmaWVsZCBpcyB0aGUgbW9kZWwncyBwcmltYXJ5IGtleVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlUmF3RW50aXR5R2V0dGVyc1NldHRlcnMgPSAoXG5cdGluc3RhbmNlLFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdGlzUHJpbWFyeUtleSA9IGZhbHNlLFxuKSA9PiB7XG5cdGNvbnN0IG9wdHMgPSB7IGVudW1lcmFibGU6IHRydWUgfTtcblx0Ly8gcHJpbWFyeSBrZXkgaXMgaW1tdXRhYmxlXG5cdGlmICggaXNQcmltYXJ5S2V5ICkge1xuXHRcdGNyZWF0ZUdldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdG9wdHNcblx0XHQpO1xuXHRcdGNyZWF0ZUFsaWFzR2V0dGVyRm9yRmllbGQoIGluc3RhbmNlLCBmaWVsZE5hbWUgKTtcblx0fSBlbHNlIHtcblx0XHRjcmVhdGVHZXR0ZXJBbmRTZXR0ZXIoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRvcHRzXG5cdFx0KTtcblx0XHRjcmVhdGVGbHVlbnRTZXR0ZXIoIGluc3RhbmNlLCBmaWVsZE5hbWUgKTtcblx0XHRjcmVhdGVBbGlhc0dldHRlckFuZFNldHRlckZvckZpZWxkKCBpbnN0YW5jZSwgZmllbGROYW1lICk7XG5cdH1cbn07XG5cbi8qKlxuICogQ3JlYXRlcyBcImFsaWFzXCIgZ2V0dGVyIGZvciB0aGUgZ2l2ZW4gZmllbGQgbmFtZSBvbiB0aGUgZW50aXR5IGluc3RhbmNlLlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBbGlhc0dldHRlckZvckZpZWxkID0gKCBpbnN0YW5jZSwgZmllbGROYW1lICkgPT4ge1xuXHRjcmVhdGVBbGlhc2VzRm9yTWV0aG9kKCBpbnN0YW5jZSwgZmllbGROYW1lLCBjcmVhdGVBbGlhc0dldHRlciApO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIFwiYWxpYXNcIiBnZXR0ZXJzIGFuZCBzZXR0ZXJzIGZvciB0aGUgZ2l2ZW4gZmllbGQgb24gdGhlIGVudGl0eVxuICogaW5zdGFuY2UuXG4gKlxuICogRXhhbXBsZTogRGF0ZXRpbWUgZW50aXRpZXMgaGF2ZSBhIGBEVFRfRVZUX3N0YXJ0YCBmaWVsZC4gIE9uIHRoZSBlbnRpdHlcbiAqIGluc3RhbmNlLCB5b3Ugd2lsbCBiZSBhYmxlIHRvIGFjY2VzcyB0aGUgdmFsdWUgb2YgdGhhdCBmaWVsZCB2aWE6XG4gKiAtIGRhdGV0aW1lLkRUVF9FVlRfc3RhcnRcbiAqIC0gZGF0ZXRpbWUuZHR0RXZ0U3RhcnRcbiAqIC0gZGF0ZXRpbWUuZXZ0U3RhcnRcbiAqIC0gZGF0ZXRpbWUuc3RhcnRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyRm9yRmllbGQgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUgKSA9PiB7XG5cdGNyZWF0ZUFsaWFzZXNGb3JNZXRob2QoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyICk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgQWxpYXNlcyB1c2luZyB0aGUgcHJvdmlkZWQgbWV0aG9kLlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2RcbiAqL1xuY29uc3QgY3JlYXRlQWxpYXNlc0Zvck1ldGhvZCA9ICggaW5zdGFuY2UsIGZpZWxkTmFtZSwgbWV0aG9kICkgPT4ge1xuXHQvLyBjYW1lbENhc2UgZ2V0dGVyIChvciBzZXR0ZXIpIGZvciBmdWxsIGZpZWxkIG5hbWUgKGVnLiBFVlRfZGVzYyA9PiBldnREZXNjKVxuXHRtZXRob2QoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGNhbWVsQ2FzZSggZmllbGROYW1lICkgKTtcblx0Ly8gc3RyaXAgZmllbGQgcHJlZml4ZXMgYW5kIGNhbWVsQ2FzZSAoaWYgdGhlcmUgYXJlIGZpZWxkIHByZWZpeGVzIGZvciB0aGVcblx0Ly8gZW50aXR5LiAoZWcuIEVWVF9kZXNjID0+IGRlc2MpO1xuXHRpZiAoIGluc3RhbmNlLmZpZWxkUHJlZml4ZXMgKSB7XG5cdFx0bGV0IG5ld0ZpZWxkTmFtZSA9ICcnO1xuXHRcdC8vIFllcywgaXRzIGludGVuZGVkIHRoYXQgaWYgdGhlcmUgYXJlIG11bHRpcGxlIHByZWZpeGVzLCB0aGlzIGNvdWxkXG5cdFx0Ly8gZW5kIHVwIGNyZWF0aW5nIG11bHRpcGxlIGFsaWFzZWQgZ2V0dGVycyAob3Igc2V0dGVycylcblx0XHQvLyAoZWcgRGF0ZXRpbWU6IERUVF9FVlRfc3RhcnQgd291bGQgZW5kIHVwIHdpdGggYGV2dFN0YXJ0YCBhbmQgYHN0YXJ0YFxuXHRcdC8vIGFzIGdldHRlciBhY2Nlc3NvcnMpLlxuXHRcdGluc3RhbmNlLmZpZWxkUHJlZml4ZXMuZm9yRWFjaCggKCBmaWVsZFByZWZpeCApID0+IHtcblx0XHRcdG5ld0ZpZWxkTmFtZSA9IGZpZWxkTmFtZS5yZXBsYWNlKCBmaWVsZFByZWZpeCArICdfJywgJycgKTtcblx0XHRcdGlmICggbmV3RmllbGROYW1lICE9PSBmaWVsZE5hbWUgKSB7XG5cdFx0XHRcdG1ldGhvZChcblx0XHRcdFx0XHRpbnN0YW5jZSxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0Y2FtZWxDYXNlKCBuZXdGaWVsZE5hbWUgKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgY2FsbGJhY2sgdGhhdCBpcyB1c2VkIGluIHRoZSBgZ2V0UmVuZGVyZWRgIGZpZWxkIGdldHRlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7ZnVuY3Rpb24oc3RyaW5nKTogKn0gIEEgY2FsbGJhY2suXG4gKi9cbmNvbnN0IGdldFJlbmRlcmVkQ2FsbGJhY2sgPSAoIGluc3RhbmNlICkgPT4gKCByZXF1ZXN0ZWRGaWVsZE5hbWUgKSA9PlxuXHRpbnN0YW5jZVsgcmVxdWVzdGVkRmllbGROYW1lICsgJ1JlbmRlcmVkJyBdO1xuXG4vKipcbiAqIFJldHVybnMgYSBmaWVsZE5hbWUgc3RyaXBwZWQgb2YgYWxsIHBvc3NpYmxlIHByZWZpeGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgcHJlZml4IGZyZWUgZmllbGROYW1lLlxuICovXG5jb25zdCByZW1vdmVQcmVmaXhlc0Zyb21GaWVsZCA9ICggaW5zdGFuY2UsIGZpZWxkTmFtZSApID0+IHtcblx0Y29uc3QgcHJlZml4ZXNUb1JlbW92ZSA9IHNvcnRCeShcblx0XHRpbnN0YW5jZS5maWVsZFByZWZpeGVzLFxuXHRcdCggcHJlZml4ICkgPT4gcHJlZml4Lmxlbmd0aCAqIC0xXG5cdCk7XG5cdGxldCBuZXdGaWVsZE5hbWUgPSBmaWVsZE5hbWU7XG5cdGZvckVhY2goIHByZWZpeGVzVG9SZW1vdmUsICggcHJlZml4ICkgPT4ge1xuXHRcdG5ld0ZpZWxkTmFtZSA9IGZpZWxkTmFtZS5yZXBsYWNlKCBwcmVmaXgsICcnICk7XG5cdFx0aWYgKCBuZXdGaWVsZE5hbWUgIT09IGZpZWxkTmFtZSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0gKTtcblx0cmV0dXJuIG5ld0ZpZWxkTmFtZTtcbn07XG5cbi8qKlxuICogVGhpcyBjcmVhdGVzIHRoZSBnZXR0ZXJzIGZvciB0aGUgcmVuZGVyZWQgcHJvcGVydHkgb2YgbW9kZWwgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSAgZmllbGRWYWx1ZVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlUmVuZGVyZWRHZXR0ZXJzID0gKCBpbnN0YW5jZSwgZmllbGROYW1lLCBmaWVsZFZhbHVlICkgPT4ge1xuXHRjcmVhdGVHZXR0ZXIoXG5cdFx0aW5zdGFuY2UsXG5cdFx0Y2FtZWxDYXNlKCByZW1vdmVQcmVmaXhlc0Zyb21GaWVsZCggaW5zdGFuY2UsIGZpZWxkTmFtZSApICkgK1xuXHRcdCdSZW5kZXJlZCcsXG5cdFx0ZmllbGRWYWx1ZVxuXHQpO1xuXHRpZiAoIGlzVW5kZWZpbmVkKCBpbnN0YW5jZS5nZXRSZW5kZXJlZCApICkge1xuXHRcdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHQnZ2V0UmVuZGVyZWQnLFxuXHRcdFx0Z2V0UmVuZGVyZWRDYWxsYmFjayxcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciB0aGUgYGhhc011bHRpcGxlUHJpbWFyeUtleXNgIGdldHRlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKCk6IGJvb2xlYW59IFRoZSBjYWxsYmFjayBmb3IgaGFzTXVsdGlwbGVQcmltYXJ5S2V5cyBnZXR0ZXJcbiAqL1xuY29uc3QgaGFzTXVsdGlwbGVQcmltYXJ5S2V5c0NhbGxiYWNrID0gKCBpbnN0YW5jZSApID0+XG5cdGluc3RhbmNlLnByaW1hcnlLZXlzLmxlbmd0aCA+IDE7XG5cbi8qKlxuICogQ3JlYXRlcyBnZXR0ZXJzIGZvciBwcmltYXJ5IGtleSByZWxhdGVkIGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge0FycmF5fSBwcmltYXJ5S2V5c1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlUHJpbWFyeUtleUZpZWxkR2V0dGVycyA9ICggaW5zdGFuY2UsIHByaW1hcnlLZXlzICkgPT4ge1xuXHRjb25zdCBvcHRzID0geyBjb25maWd1cmFibGU6IHRydWUgfTtcblx0aWYgKCBpc0FycmF5KCBwcmltYXJ5S2V5cyApICkge1xuXHRcdGNyZWF0ZUdldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0J3ByaW1hcnlLZXknLFxuXHRcdFx0cHJpbWFyeUtleXNbIDAgXSxcblx0XHRcdG9wdHNcblx0XHQpO1xuXHRcdGNyZWF0ZUdldHRlckFuZFNldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0J3ByaW1hcnlLZXlzJyxcblx0XHRcdHByaW1hcnlLZXlzLFxuXHRcdFx0b3B0c1xuXHRcdCk7XG5cdFx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdCdoYXNNdWx0aXBsZVByaW1hcnlLZXlzJyxcblx0XHRcdGhhc011bHRpcGxlUHJpbWFyeUtleXNDYWxsYmFjayxcblx0XHRcdG9wdHNcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7ZnVuY3Rpb24oc3RyaW5nKTogYm9vbGVhbn0gUmV0dXJucyBhIGNhbGxiYWNrIGZvciB0aGVcbiAqIGhhc0NhbGN1bGF0ZWRGaWVsZCBnZXR0ZXJcbiAqL1xuY29uc3QgaGFzQ2FsY3VsYXRlZEZpZWxkQ2FsbGJhY2sgPSAoIGluc3RhbmNlICkgPT5cblx0KCBmaWVsZE5hbWVUb0NoZWNrICkgPT4gISBpc1VuZGVmaW5lZCggaW5zdGFuY2VbIGZpZWxkTmFtZVRvQ2hlY2sgXSApO1xuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGdldHRlcnMgZm9yIGFsbCB0aGUgY2FsY3VsYXRlZCBmaWVsZHMgYW5kIHZhbHVlIG9uIHRoZSBlbnRpdHkuXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59ZmllbGRzQW5kVmFsdWVzXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRDYWxjdWxhdGVkRmllbGRBbmRWYWx1ZXMgPSAoIGluc3RhbmNlLCBmaWVsZHNBbmRWYWx1ZXMgKSA9PiB7XG5cdGZvckVhY2goIGZpZWxkc0FuZFZhbHVlcywgKCBjYWxjdWxhdGVkRmllbGRWYWx1ZSwgY2FsY3VsYXRlZEZpZWxkTmFtZSApID0+IHtcblx0XHRpZiAoIGNhbGN1bGF0ZWRGaWVsZE5hbWUgIT09ICdfcHJvdGVjdGVkJyApIHtcblx0XHRcdGNyZWF0ZUdldHRlcihcblx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdGNhbWVsQ2FzZSggY2FsY3VsYXRlZEZpZWxkTmFtZSApLFxuXHRcdFx0XHRjYWxjdWxhdGVkRmllbGRWYWx1ZVxuXHRcdFx0KTtcblx0XHR9XG5cdH0gKTtcblx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoXG5cdFx0aW5zdGFuY2UsXG5cdFx0J2hhc0NhbGN1bGF0ZWRGaWVsZCcsXG5cdFx0aGFzQ2FsY3VsYXRlZEZpZWxkQ2FsbGJhY2tcblx0KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGdldHRlcnMgZm9yIHRoZSB2YXJpb3VzIHJlc291cmNlIGxpbmtzIG9uIHRoZSBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fWZpZWxkc0FuZFZhbHVlc1xuICovXG5leHBvcnQgY29uc3Qgc2V0UmVzb3VyY2VzID0gKCBpbnN0YW5jZSwgZmllbGRzQW5kVmFsdWVzICkgPT4ge1xuXHRjb25zdCByZWxhdGlvbnMgPSBbXTtcblx0bGV0IHJlbGF0aW9uTmFtZTtcblx0Zm9yRWFjaCggZmllbGRzQW5kVmFsdWVzLCAoIHJlc291cmNlVmFsdWUsIHJlc291cmNlTmFtZSApID0+IHtcblx0XHRpZiAoIHJlc291cmNlTmFtZSA9PT0gJ3NlbGYnICkge1xuXHRcdFx0Y3JlYXRlR2V0dGVyKCBpbnN0YW5jZSwgJ3Jlc291cmNlTGluaycsIHJlc291cmNlVmFsdWVbIDAgXS5ocmVmICk7XG5cdFx0fSBlbHNlIGlmICggcmVzb3VyY2VOYW1lID09PSAnY29sbGVjdGlvbicgKSB7XG5cdFx0XHRjcmVhdGVHZXR0ZXIoXG5cdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHQnY29sbGVjdGlvblJlc291cmNlTGluaycsXG5cdFx0XHRcdHJlc291cmNlVmFsdWVbIDAgXS5ocmVmXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZWxhdGlvbk5hbWUgPSBnZXRSZWxhdGlvbk5hbWVGcm9tTGluayggcmVzb3VyY2VOYW1lICk7XG5cdFx0XHRyZWxhdGlvbnMucHVzaCggcmVsYXRpb25OYW1lICk7XG5cdFx0XHRzZXRSZWxhdGlvbnNSZXNvdXJjZShcblx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdHJlbGF0aW9uTmFtZSArICdSZXNvdXJjZScsXG5cdFx0XHRcdHJlc291cmNlVmFsdWVcblx0XHRcdCk7XG5cdFx0fVxuXHR9ICk7XG5cdC8vc2V0IHJlbGF0aW9ucyBnZXR0ZXJcblx0Y3JlYXRlR2V0dGVyKCBpbnN0YW5jZSwgJ2dldFJlbGF0aW9ucycsIHJlbGF0aW9ucyApO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKHN0cmluZyk6IE9iamVjdH0gUmV0dXJucyB0aGUgY2FsbGJhY2sgZm9yIGdldHRpbmcgYVxuICogcmVsYXRpb24gcmVzb3VyY2VcbiAqL1xuY29uc3QgZ2V0UmVsYXRpb25SZXNvdXJjZUNhbGxiYWNrID0gKCBpbnN0YW5jZSApID0+XG5cdCggcmVsYXRpb25OYW1lICkgPT4gaW5zdGFuY2VbIHJlbGF0aW9uTmFtZS5yZXBsYWNlKCAnUmVzb3VyY2UnLCAnJyApIF07XG5cbi8qKlxuICogQ3JlYXRlcyBnZXR0ZXJzIGZvciB0aGUgcmVsYXRpb25zIHJlc291cmNlIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsIHN0cmluZz59IHJlc291cmNlSW5mb1xuICovXG5leHBvcnQgY29uc3Qgc2V0UmVsYXRpb25zUmVzb3VyY2UgPSAoXG5cdGluc3RhbmNlLFxuXHRyZWxhdGlvbk5hbWUsXG5cdHJlc291cmNlSW5mb1xuKSA9PiB7XG5cdGNyZWF0ZUdldHRlcihcblx0XHRpbnN0YW5jZSxcblx0XHRyZWxhdGlvbk5hbWUsXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VMaW5rOiByZXNvdXJjZUluZm9bIDAgXS5ocmVmLFxuXHRcdFx0c2luZ2xlOiByZXNvdXJjZUluZm9bIDAgXS5zaW5nbGUsXG5cdFx0fVxuXHQpO1xuXHRpZiAoIGlzVW5kZWZpbmVkKCBpbnN0YW5jZS5nZXRSZWxhdGlvblJlc291cmNlICkgKSB7XG5cdFx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoIGluc3RhbmNlLFxuXHRcdFx0J2dldFJlbGF0aW9uUmVzb3VyY2UnLFxuXHRcdFx0Z2V0UmVsYXRpb25SZXNvdXJjZUNhbGxiYWNrXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBpbnRlcm5hbCBzYXZlIHN0YXRlIHRvIHRoZSBnaXZlbiB2YWx1ZSB3aGVuIGN1cnJlbnQgc3RhdGUgaXNcbiAqIFNBVkVfU1RBVEUuY2xlYW4gb3RoZXJ3aXNlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBpcyByZXRhaW5lZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBzYXZlU3RhdGUgRXhwZWN0ZWQgdG8gYmUgb25lIG9mIFNBVkVfU1RBVEUgY29uc3RhbnQgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBvdmVycmlkZSBTZXQgdG8gdHJ1ZSB3aGVuIG92ZXJyaWRpbmcgdGhlIGRlZmF1bHQgbG9naWMgZm9yXG4gKiBzZXR0aW5nIHN0YXRlLiAgV2hlbiB0cnVlLCB0aGUgc2F2ZVN0YXRlIGlzIHNldCB0byB3aGF0ZXZlciB0aGUgaW5jb21pbmdcbiAqIHNhdmVTdGF0ZSB2YWx1ZSBpcy5cbiAqL1xuZXhwb3J0IGNvbnN0IHNldFNhdmVTdGF0ZSA9ICggaW5zdGFuY2UsIHNhdmVTdGF0ZSwgb3ZlcnJpZGUgPSBmYWxzZSApID0+IHtcblx0Y29uc3QgY3VycmVudFN0YXRlID0gaW5zdGFuY2VbIFBSSVZBVEVfUFJPUEVSVElFUy5TQVZFX1NUQVRFIF07XG5cdHN3aXRjaCAoIHNhdmVTdGF0ZSApIHtcblx0XHRjYXNlIFNBVkVfU1RBVEUuRElSVFk6XG5cdFx0Y2FzZSBTQVZFX1NUQVRFLk5FVzpcblx0XHRjYXNlIFNBVkVfU1RBVEUuQ0xFQU46XG5cdFx0XHRpZiAoIG92ZXJyaWRlICkge1xuXHRcdFx0XHRpbnN0YW5jZVsgUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEUgXSA9IHNhdmVTdGF0ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpbnN0YW5jZVsgUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEUgXSA9XG5cdFx0XHRcdGN1cnJlbnRTdGF0ZSA9PT0gU0FWRV9TVEFURS5DTEVBTiA/XG5cdFx0XHRcdFx0c2F2ZVN0YXRlIDpcblx0XHRcdFx0XHRjdXJyZW50U3RhdGU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudChcblx0XHRcdFx0J1NhdmUgc3RhdGUgZm9yIGVudGl0eSBjYW4gb25seSBiZSBzZXQgdG8gZWl0aGVyICcgK1xuXHRcdFx0XHQnU0FWRV9TVEFURS5ESVJUWSwgU0FWRV9TVEFURS5ORVcgb3IgU0FWRV9TVEFURS5DTEVBTidcblx0XHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQWRkIHRoZSBmaWVsZCBuYW1lIHRvIHRoZSBmaWVsZFRvUGVyc2lzdE9uSW5zZXJ0IHByb3BlcnR5IG9uIHRoZSBpbnN0YW5jZVxuICogaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICovXG5leHBvcnQgY29uc3Qgc2V0RmllbGRUb1BlcnNpc3QgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUgKSA9PiB7XG5cdGlmICggaW5zdGFuY2UuZmllbGRzVG9QZXJzaXN0T25JbnNlcnQgKSB7XG5cdFx0aW5zdGFuY2UuZmllbGRzVG9QZXJzaXN0T25JbnNlcnQuYWRkKCBmaWVsZE5hbWUgKTtcblx0fVxufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRpc1BsYWluT2JqZWN0LFxuXHRjYW1lbENhc2UsXG5cdGxhc3QsXG5cdHBpY2ssXG5cdHBpY2tCeSxcblx0aXNBcnJheSxcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGluc3RhbmNlT2YgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdE1vbmV5LFxuXHRTaXRlQ3VycmVuY3ksXG5cdFNlcnZlckRhdGVUaW1lIGFzIERhdGVUaW1lLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWx1ZS1vYmplY3RzJztcblxuaW1wb3J0IHsgcGx1cmFsTW9kZWxOYW1lIH0gZnJvbSAnLi4vbW9kZWwtbmFtZXMnO1xuXG5pbXBvcnQge1xuXHRoYXNSYXdQcm9wZXJ0eSxcblx0aGFzUHJldHR5UHJvcGVydHksXG5cdGhhc1JlbmRlcmVkUHJvcGVydHksXG5cdGlzRGF0ZVRpbWVGaWVsZCxcblx0aXNNb25leUZpZWxkLFxuXHRpc1ByaW1hcnlLZXlGaWVsZCxcblx0aXNFbnRpdHlGaWVsZCxcbn0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQgeyB2YWxpZGF0ZVR5cGVGb3JGaWVsZCB9IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5pbXBvcnQgeyBWQUxJREFURV9UWVBFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIFRoaXMgcmVjZWl2ZXMgYSBmaWVsZCBuYW1lLCBpdCdzIHZhbHVlIGFuZCB0aGUgc2NoZW1hIGFuZCBjb252ZXJ0cyBpdCB0byB0aGVcbiAqIHJlbGF0ZWQgdmFsdWUgb2JqZWN0IElGIHRoZSBzY2hlbWEgaW5kaWNhdGVzIGl0IGlzIG9mIGEgdHlwZSB0aGF0IHRoZXJlIGlzIGFcbiAqIGtub3duIHZhbHVlIG9iamVjdCBmb3IuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtEYXRlVGltZXxNb25leXwqfSAgSWYgdGhpcyBpcyBub3QgYSB2YWx1ZSBvYmplY3QsIHRoZSBvcmlnaW5hbCBmaWVsZFxuICogdmFsdWUgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBtYXliZUNvbnZlcnRUb1ZhbHVlT2JqZWN0ID0gKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIHNjaGVtYSApID0+IHtcblx0aWYgKFxuXHRcdGlzRGF0ZVRpbWVGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSAmJlxuXHRcdCEgRGF0ZVRpbWUudmFsaWRhdGVJc0RhdGVUaW1lKCBmaWVsZFZhbHVlIClcblx0KSB7XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21JU08oIGZpZWxkVmFsdWUgKTtcblx0fVxuXHRpZiAoXG5cdFx0aXNNb25leUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApICYmXG5cdFx0ISAoIGluc3RhbmNlT2YoIGZpZWxkVmFsdWUsICdNb25leScgKSApXG5cdCkge1xuXHRcdHJldHVybiBuZXcgTW9uZXkoIGZpZWxkVmFsdWUsIFNpdGVDdXJyZW5jeSApO1xuXHR9XG5cdC8vIGlmIG1vcmUgVk9zIGdldCBhZGRlZCwgdGhlbiBpbnN0ZWFkIG9mIGFkZGluZyBtb3JlIGlmIGVsc2UgYmxvY2tzXG5cdC8vIHRvIHRoaXMgZnVuY3Rpb24gYW5kIHRoZSBvbmVzIGJlbG93LCBhbGwgVk8gbG9naWMgc2hvdWxkIGJlIGV4dHJhY3RlZFxuXHQvLyBpbnRvIHNvbWUga2luZCBvZiAgVmFsdWVPYmplY3RFeHRyYWN0b3Igb2JqZWN0IHRoYXQgd291bGQgaG9sZCBhbGwgb2Zcblx0Ly8gdGhlIG5lY2Vzc2FyeSBjYWxsYmFja3MgZm9yIG1hbmFnaW5nIHRoZSBkZXRlY3Rpb24gb2YgVk8gZmllbGRzIGFuZFxuXHQvLyBjb252ZXJzaW9uIG9mIGRhdGEgdG8gYW5kIGZyb20gdGhlIHZhcmlvdXMgVk9zXG5cdC8vIHBseiBzZWU6XG5cdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ldmVudGVzcHJlc3NvL2V2ZW50LWVzcHJlc3NvLWNvcmUvcHVsbC82MzcvZmlsZXMjcjIyODY5MDc4OVxuXHRyZXR1cm4gZmllbGRWYWx1ZTtcbn07XG5cbi8qKlxuICogVGhpcyBjb252ZXJ0cyB0aGUgaW5jb21pbmcgdmFsdWUgZm9yIGEgZmllbGQgdG8gaXRzIGVxdWl2YWxlbnQgXCJyYXdcIiB2YWx1ZVxuICogZnJvbSBhIHZhbHVlIG9iamVjdCBpZiBpdCBpcyBhIHZhbHVlIG9iamVjdC4gIE90aGVyd2lzZSBpdCBqdXN0IHJldHVybnMgdGhlXG4gKiBvcmlnaW5hbCBpbmNvbWluZyB2YWx1ZS4gIFRoaXMgYWxzbyBhc3NlcnRzIHRoYXQgaWYgdGhlIHByb3ZpZGVkIGZpZWxkIGlzXG4gKiBleHBlY3RlZCB0byBiZSBhIHZhbHVlIG9iamVjdCB0aGF0IHRoZSBpbmNvbWluZyB2YWx1ZSBJUyBhIHZhbGlkIHZhbHVlIG9iamVjdFxuICogYW5kIGl0IGlzIHRoZSBleHBlY3RlZCBpbnN0YW5jZSBvZiBhIHZhbHVlIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp8TW9uZXl8RGF0ZVRpbWV9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge3N0cmluZ3xudW1iZXJ8Kn0gIElmIHRoZSB2YWx1ZSBpcyBub3QgYSB2YWx1ZSBvYmplY3QsIHJldHVybnMgdGhlXG4gKiBvcmlnaW5hbCB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMgPSAoXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0c2NoZW1hXG4pID0+IHtcblx0aWYgKCBpc0RhdGVUaW1lRmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgKSB7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0SXNEYXRlVGltZSggZmllbGRWYWx1ZSApO1xuXHRcdGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLnRvSVNPKCk7XG5cdH0gZWxzZSBpZiAoIGlzTW9uZXlGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHRNb25leS5hc3NlcnRNb25leSggZmllbGRWYWx1ZSApO1xuXHRcdGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLnRvTnVtYmVyKCk7XG5cdH1cblx0cmV0dXJuIGZpZWxkVmFsdWU7XG59O1xuXG4vKipcbiAqIFRoaXMgY29udmVydHMgdGhlIGluY29taW5nIHZhbHVlIGZvciBhIGZpZWxkIHRvIGl0cyBlcXVpdmFsZW50IFwicmF3XCIgdmFsdWVcbiAqIGlmIHRoZSBpbmNvbWluZyB2YWx1ZSAgaXMgYSB2YWx1ZSBvYmplY3QuICBPdGhlcndpc2UgaXQganVzdCByZXR1cm5zIHRoZVxuICogb3JpZ2luYWwgaW5jb21pbmcgdmFsdWUuXG4gKlxuICogQHBhcmFtIHsqfERhdGVUaW1lfE1vbmV5fWZpZWxkVmFsdWVcbiAqIEByZXR1cm4geyp9IFRoZSByYXcgdmFsdWUgZm9yIHRoZSB2YWx1ZSBvYmplY3Qgb3IgdGhlIG9yaWdpbmFsIHZhbHVlLlxuICovXG5leHBvcnQgY29uc3QgbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0ID0gKCBmaWVsZFZhbHVlICkgPT4ge1xuXHRpZiAoIERhdGVUaW1lLnZhbGlkYXRlSXNEYXRlVGltZSggZmllbGRWYWx1ZSApICkge1xuXHRcdGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLnRvSVNPKCk7XG5cdH0gZWxzZSBpZiAoIGluc3RhbmNlT2YoIGZpZWxkVmFsdWUsICdNb25leScgKSApIHtcblx0XHRmaWVsZFZhbHVlID0gZmllbGRWYWx1ZS50b051bWJlcigpO1xuXHR9XG5cdHJldHVybiBmaWVsZFZhbHVlO1xufTtcblxuLyoqXG4gKiBUaGlzIGRlcml2ZXMgdGhlIFwicHJlcGFyZWRcIiB2YWx1ZSBmb3IgdGhlIGdpdmVuIGZpZWxkIGFuZCB2YWx1ZS5cbiAqXG4gKiBcIlByZXBhcmVkXCIgbWVhbnM6XG4gKlxuICogLSBjb252ZXJ0aW5nIHRvIGEgdmFsdWUgb2JqZWN0IGlmIHRoaXMgaXMgYSBmaWVsZCB0aGF0IHRoZXJlIGFyZSBkZWZpbmVkXG4gKiAgIHZhbHVlIG9iamVjdHMgZm9yLlxuICogLSByZXRyaWV2aW5nIHRoZSBcInJhd1wiIHZhbHVlIGZyb20gZmllbGQgdmFsdWVzIHRoYXQgaGF2ZSBgcmF3YCBhbmQgYHJlbmRlcmVkYFxuICogICBvciBgcHJldHR5YCBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gIGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7RGF0ZVRpbWV8TW9uZXl8Kn0gIFJldHVybnMgdGhlIG9yaWdpbmFsIGluY29taW5nIHZhbHVlIGlmIGl0IGRvZXNcbiAqIG5vdCBoYXZlIGEgcmF3IGVxdWl2YWxlbnQgb3IgaXMgbm90IGEgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY29uc3QgZGVyaXZlUHJlcGFyZWRWYWx1ZUZvckZpZWxkID0gKFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdGluc3RhbmNlXG4pID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvblR5cGUgPSB2YWxpZGF0ZVR5cGVGb3JGaWVsZCggZmllbGROYW1lLCBpbnN0YW5jZSApO1xuXHRmaWVsZFZhbHVlID0gaXNQbGFpbk9iamVjdCggZmllbGRWYWx1ZSApID9cblx0XHRmaWVsZFZhbHVlWyB2YWxpZGF0aW9uVHlwZSBdIDpcblx0XHRmaWVsZFZhbHVlO1xuXHRyZXR1cm4gbWF5YmVDb252ZXJ0VG9WYWx1ZU9iamVjdCggZmllbGROYW1lLCBmaWVsZFZhbHVlLCBpbnN0YW5jZS5zY2hlbWEgKTtcbn07XG5cbi8qKlxuICogVGhpcyByZXR1cm5zIHRoZSBcInJlbmRlcmVkXCIgb3IgXCJwcmV0dHlcIiBlcXVpdmFsZW50IGZyb20gYSB2YWx1ZSBpZiBpdCBleGlzdHNcbiAqIGFzIGEgcHJvcGVydHkgb24gaXQuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Kn0gIFRoZSBvcmlnaW5hbCB2YWx1ZSBpcyByZXR1cm5lZCBpZiBpdHMgbm90IGEgcGxhaW4gb2JqZWN0IG9yIGlmXG4gKiBpdCBoYXMgbm8gYHJlbmRlcmVkYCBvciBgcHJldHR5YCBwcm9wZXJ0eS4gIEhvd2V2ZXIsIGlmIGl0IGlzIGEgcGxhaW4gb2JqZWN0XG4gKiBhbmQgaGFzIG5vIHByZXR0eS9yZW5kZXJlZCBwcm9wZXJ0aWVzIGJ1dCBET0VTIGhhdmUgYSByYXcgcHJvcGVydHksIHRoZW4gdGhhdFxuICogaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBkZXJpdmVSZW5kZXJlZFZhbHVlID0gKCB2YWx1ZSApID0+IHtcblx0aWYgKCAhIGlzUGxhaW5PYmplY3QoIHZhbHVlICkgKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhbHVlID0gaGFzUHJldHR5UHJvcGVydHkoIHZhbHVlICkgPyB2YWx1ZS5wcmV0dHkgOiB2YWx1ZTtcblx0dmFsdWUgPSBoYXNSZW5kZXJlZFByb3BlcnR5KCB2YWx1ZSApID8gdmFsdWUucmVuZGVyZWQgOiB2YWx1ZTtcblx0cmV0dXJuIGhhc1Jhd1Byb3BlcnR5KCB2YWx1ZSApID8gdmFsdWUucmF3IDogdmFsdWU7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG5hbWUgb2YgYSByZXNvdXJjZSBmcm9tIHRoZSBnaXZlbiBgcmVzb3VyY2VMaW5rYC5cbiAqXG4gKiBlZy4gXCJodHRwczovL2FwaS5ldmVudGVzcHJlc3NvLmNvbS9yZWdpc3RyYXRpb25cIiB3aWxsIHJldHVybiAncmVnaXN0cmF0aW9uJztcblxuICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlTGlua1xuICogQHJldHVybiB7c3RyaW5nfSBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSByZXNvdXJjZSBmcm9tIGEgcHJvdmlkZWQgcmVzb3VyY2VcbiAqIGxpbmsuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSZWxhdGlvbk5hbWVGcm9tTGluayA9ICggcmVzb3VyY2VMaW5rICkgPT4ge1xuXHRyZXR1cm4gcGx1cmFsTW9kZWxOYW1lKCBjYW1lbENhc2UoIGxhc3QoIHJlc291cmNlTGluay5zcGxpdCggJy8nICkgKSApICk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwbGFpbiBvYmplY3QgY29udGFpbmluZyB0aGUgZW50aXR5IGZpZWxkIG5hbWVzIGFuZCB2YWx1ZXMgZnJvbSB0aGVcbiAqIHByb3ZpZGVkIGVudGl0eSBpbnN0YW5jZS4gIFRoZSB2YWx1ZXMgYXJlIG5vdCBwcmVwYXJlZCBhbmQgbWF0Y2ggZXhhY3RseSB3aGF0XG4gKiBpcyBjdXJyZW50bHkgc2V0IG9uIHRoaXMgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gZW50aXR5SW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgcGxhaW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyA9ICggZW50aXR5SW5zdGFuY2UgKSA9PiB7XG5cdHJldHVybiBPYmplY3Qua2V5cyggZW50aXR5SW5zdGFuY2UgKS5yZWR1Y2UoIChcblx0XHRmaWVsZHNBbmRWYWx1ZXMsXG5cdFx0ZmllbGROYW1lXG5cdCkgPT4ge1xuXHRcdGlmIChcblx0XHRcdGlzRW50aXR5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hICkgJiZcblx0XHRcdCEgaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hIClcblx0XHQpIHtcblx0XHRcdGZpZWxkc0FuZFZhbHVlc1sgZmllbGROYW1lIF0gPSBlbnRpdHlJbnN0YW5jZVsgZmllbGROYW1lIF07XG5cdFx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHR9LCB7fSApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGVudGl0eSBmaWVsZCBuYW1lIGFuZCB2YWx1ZXMgZnJvbSB0aGVcbiAqIHByb3ZpZGVkIGVudGl0eSBpbnN0YW5jZVxuICogQHBhcmFtIHtPYmplY3R9IGVudGl0eUluc3RhbmNlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZvckluc2VydCAgV2hldGhlciB0byByZXR1cm4gdGhlIGZpZWxkcyBhbmQgdmFsdWVzIGZvclxuICogaW5zZXJ0IG9yIGZvciB1cGRhdGUuXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgcGxhaW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yUGVyc2lzdGluZyA9IChcblx0ZW50aXR5SW5zdGFuY2UsXG5cdGZvckluc2VydCA9IGZhbHNlXG4pID0+IHtcblx0Y29uc3QgaXRlcmF0b3IgPSBmb3JJbnNlcnQgP1xuXHRcdEFycmF5LmZyb20oIGVudGl0eUluc3RhbmNlLmZpZWxkc1RvUGVyc2lzdE9uSW5zZXJ0LnZhbHVlcygpICkgOlxuXHRcdE9iamVjdC5rZXlzKCBlbnRpdHlJbnN0YW5jZSApO1xuXG5cdHJldHVybiBpdGVyYXRvci5yZWR1Y2UoIChcblx0XHRmaWVsZHNBbmRWYWx1ZXMsXG5cdFx0ZmllbGROYW1lXG5cdCkgPT4ge1xuXHRcdGlmIChcblx0XHRcdGlzRW50aXR5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hICkgJiZcblx0XHRcdCEgaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hIClcblx0XHQpIHtcblx0XHRcdGZpZWxkc0FuZFZhbHVlc1sgZmllbGROYW1lIF0gPSBtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3QoXG5cdFx0XHRcdGVudGl0eUluc3RhbmNlWyBmaWVsZE5hbWUgXSxcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHR9LCB7fSApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwcmltYXJ5IGtleShzKSBhbmQgdmFsdWVzIGZvciB0aGUgZ2l2ZW4gZW50aXR5SW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZW50aXR5SW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gYW4gYXJyYXkgb2YgdmFsdWVzIGZvciB0aGUgcHJpbWFyeSBrZXlzLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UHJpbWFyeUtleVZhbHVlcyA9ICggZW50aXR5SW5zdGFuY2UgKSA9PiBwaWNrKFxuXHRlbnRpdHlJbnN0YW5jZSxcblx0ZW50aXR5SW5zdGFuY2UucHJpbWFyeUtleXNcbik7XG5cbi8qKlxuICogVGhpcyByZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIGVudGl0eSBmaWVsZHMgZnJvbSB0aGUgc2NoZW1hIGZvciB0aGUgZW50aXR5XG4gKiBpbnN0YW5jZSAoc2NoZW1hIGZvciBmaWVsZHMgYXJlIGV4dHJhY3RlZCBhcyB3ZWxsKS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZW50aXR5SW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gQSBwbGFpbiBvYmplY3Qgd2l0aCBmaWVsZHMgYW5kIHNjaGVtYSBwcm9wZXJ0aWVzIHRoYXQgYXJlXG4gKiBlbnRpdHkgcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVudGl0eUZpZWxkc0Zyb21TY2hlbWEgPSAoIGVudGl0eUluc3RhbmNlICkgPT4gcGlja0J5KFxuXHRlbnRpdHlJbnN0YW5jZS5zY2hlbWEsXG5cdCggZmllbGRWYWx1ZSwgZmllbGROYW1lICkgPT4gaXNFbnRpdHlGaWVsZChcblx0XHRmaWVsZE5hbWUsXG5cdFx0ZW50aXR5SW5zdGFuY2Uuc2NoZW1hXG5cdClcbik7XG5cbi8qKlxuICogVGhpcyByZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIGV4dHJhY3RlZCBwcmltYXJ5S2V5IGZpZWxkcyBmcm9tIHRoZSBzY2hlbWFcbiAqIGZvciB0aGUgZW50aXR5IGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbnRpdHlJbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBBIHBsYWluIG9iamVjdCB3aXRoIGZpZWxkcyBhbmQgc2NoZW1hIHByb3BlcnRpZXMgdGhhdFxuICogXHRcdFx0XHRcdHJlcHJlc2VudCBwcmltYXJ5IGtleSBmaWVsZHMuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmltYXJ5S2V5RmllbGRzRnJvbVNjaGVtYSA9ICggZW50aXR5SW5zdGFuY2UgKSA9PiBwaWNrQnkoXG5cdGVudGl0eUluc3RhbmNlLnNjaGVtYSxcblx0KCBmaWVsZFZhbHVlLCBmaWVsZE5hbWUgKSA9PiBpc1ByaW1hcnlLZXlGaWVsZChcblx0XHRmaWVsZE5hbWUsXG5cdFx0ZW50aXR5SW5zdGFuY2Uuc2NoZW1hXG5cdClcbik7XG5cbi8qKlxuICogRGVyaXZlcyB0aGUgZGVmYXVsdCB2YWx1ZSB0byB1c2UgZm9yIGEgZ2l2ZW4gdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHJldHVybiB7Kn0gIEEgdmFsdWUgdG8gdXNlIGZvciB0aGUgZ2l2ZW4gdHlwZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlcml2ZURlZmF1bHRWYWx1ZUZvclR5cGUgPSAoIHR5cGUgKSA9PiB7XG5cdGlmICggaXNBcnJheSggdHlwZSApICkge1xuXHRcdHJldHVybiB0eXBlLmluZGV4T2YoICdudWxsJyApID4gLTEgP1xuXHRcdFx0bnVsbCA6XG5cdFx0XHRkZXJpdmVEZWZhdWx0VmFsdWVGb3JUeXBlKCB0eXBlWyAwIF0gKTtcblx0fVxuXHRzd2l0Y2ggKCB0eXBlICkge1xuXHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0Y2FzZSAnbnVtYmVyJzpcblx0XHRjYXNlICdpbnRlZ2VyJzpcblx0XHRcdHJldHVybiAwO1xuXHRcdGNhc2UgJ251bGwnOlxuXHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRjYXNlICdib29sZWFuJzpcblx0XHRjYXNlICdib29sJzpcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRjYXNlICdkYXRlLXRpbWUnOlxuXHRcdFx0cmV0dXJuICggbmV3IERhdGUoKSApLnRvSVNPU3RyaW5nKCk7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIERlcml2ZXMgd2hhdCBgdHlwZWAgYSBmaWVsZCBpcyBmcm9tIHRoZSBzY2hlbWEuXG4gKiBJdCBhY2NvdW50cyBmb3IgY2FzZXMgd2hlcmUgdGhlIFwidHlwZVwiIG9mIGEgZmllbGQgbWlnaHQgYmUgYGRhdGUtdGltZWAgb3JcbiAqIHdoZXJlIHRoZSB0eXBlIGlzIGFuIG9iamVjdCBhbmQgdGh1cyB0aGUgYHR5cGVgIGZvciB0aGUgcHVycG9zZXMgb2YgbW9kZWxcbiAqIGVudGl0aWVzIGlzIGRlZmluZWQgYnkgdGhlIGByYXdgIHByb3BlcnR5IGZvciB0aGUgZmllbGQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Kn0gIFdoYXQgdHlwZSB0aGUgZmlsZWQgaXMuXG4gKi9cbmV4cG9ydCBjb25zdCBkZXJpdmVUeXBlRm9yRmllbGQgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT4ge1xuXHRpZiAoIGlzRGF0ZVRpbWVGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHRyZXR1cm4gJ2RhdGUtdGltZSc7XG5cdH1cblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdICYmIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSApIHtcblx0XHRpZiAoIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcyAmJlxuXHRcdFx0XHRoYXNSYXdQcm9wZXJ0eSggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzIClcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy50eXBlID9cblx0XHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LnR5cGUgOlxuXHRcdFx0XHRcdG51bGw7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogVGhpcyBkZXJpdmVzIHRoZSB2YWxpZGF0ZSB0eXBlIGZyb20gdGhlIGluY29taW5nIGZpZWxkIGFuZCB2YWx1ZSBhY2NvcmRpbmdcbiAqIHRvIHRoZSBzY2hlbWEgYW5kIGluY29taW5nIHZhbHVlLlxuICpcbiAqIFRoaXMgYWNjb3VudHMgZm9yIHRoZSBmYWN0IHRoYXQgZW50aXRpZXMgbWF5IGJlIGNvbnN0cnVjdGVkIGZyb20gdGhlXG4gKiBmb2xsb3dpbmcgY29udGV4dHM6XG4gKlxuICogMS4gQXV0aGVkIFJFU1QgcmVzcG9uc2UgKHdoaWNoIGNvdWxkIGhhdmUgYm90aCByYXcsIHJlbmRlcmVkIG9yIHByZXR0eVxuICogICAgdmFsdWVzIGluIHRoZSBmaWVsZCB2YWx1ZSkuXG4gKiAyLiBOb24tYXV0aGVkIFJFU1QgcmVzcG9uc2UgKHdoaWNoIHdpbGwgbm90IGhhdmUgYSByYXcgdmFsdWUsIGJ1dCBjb3VsZCBoYXZlXG4gKiAgICBhIHByZXR0eSBvciByZW5kZXJlZCB2YWx1ZSkuICBUaGlzIGlzIHBvdGVudGlhbGx5IHByb2JsZW1hdGljIGlmIHRoZVxuICogICAgcmVuZGVyZWQgb3IgcHJldHR5IHZhbHVlIGlzIG9mIGEgZGlmZmVyZW50IGRhdGEgdHlwZSB0aGFuIHRoZSByYXcgdmFsdWUuXG4gKiAzLiBOZXcgZW50aXRpZXMgYnVpbHQgY2xpZW50IHNpZGUsIHdoaWNoIHdpbGwgYmUgYXNzdW1lZCB0byBiZSBwcmVwYXJlZFxuICogICAgYWdhaW5zdCB0aGUgXCJyYXdcIiB2YWxpZGF0ZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7U3ltYm9sfSAgVGhlIHZhbGlkYXRlIHR5cGUgZm9yIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlcml2ZVZhbGlkYXRlVHlwZUZvckZpZWxkID0gKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIHNjaGVtYSApID0+IHtcblx0aWYgKCBoYXNSYXdQcm9wZXJ0eSggZmllbGRWYWx1ZSApICkge1xuXHRcdHJldHVybiBWQUxJREFURV9UWVBFLlJBVztcblx0fVxuXHRpZiAoIHNjaGVtYVsgZmllbGROYW1lIF0gJiYgc2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlICkge1xuXHRcdGlmIChcblx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdGlzUGxhaW5PYmplY3QoIGZpZWxkVmFsdWUgKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGhhc1JlbmRlcmVkUHJvcGVydHkoIGZpZWxkVmFsdWUgKSA/XG5cdFx0XHRcdFZBTElEQVRFX1RZUEUuUkVOREVSRUQgOlxuXHRcdFx0XHRWQUxJREFURV9UWVBFLlBSRVRUWTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIFZBTElEQVRFX1RZUEUuUkFXO1xufTtcblxuLyoqXG4gKiBUaGlzIGdldHMgdGhlIGRlZmF1bHQgdmFsdWUgZm9yIGEgZmllbGQgZnJvbSB0aGUgcHJvdmlkZWQgc2NoZW1hLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4geyp9IFRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGUgZmllbGQgZnJvbSB0aGUgc2NoZW1hIG9yIGlmIG5vdFxuICogcHJlc2VudCBpbiB0aGUgc2NoZW1hLCBhIGRlcml2ZWQgZGVmYXVsdCB2YWx1ZSBmcm9tIHRoZSBzY2hlbWEgdHlwZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldERlZmF1bHRWYWx1ZUZvckZpZWxkID0gKCBmaWVsZE5hbWUsIHNjaGVtYSApID0+IHtcblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkge1xuXHRcdHJldHVybiBzY2hlbWFbIGZpZWxkTmFtZSBdLmRlZmF1bHQgP1xuXHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5kZWZhdWx0IDpcblx0XHRcdGRlcml2ZURlZmF1bHRWYWx1ZUZvclR5cGUoIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSApO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgY3JlYXRlRW50aXR5RmFjdG9yeSB9IGZyb20gJy4vYmFzZS1lbnRpdHknO1xuZXhwb3J0IHsgTU9ERUxfUFJFRklYRVMsIFNBVkVfU1RBVEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0aXNBcnJheSxcblx0aXNJbnRlZ2VyLFxuXHRpc1N0cmluZyxcblx0aXNQbGFpbk9iamVjdCxcblx0aXNCb29sZWFuLFxuXHRpc051bWJlcixcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHNwcmludGYgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcblxuLyoqXG4gKiBJbnRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzRW51bUZpZWxkLCBpc1ByaW1hcnlLZXlGaWVsZCwgaXNWYWx1ZU9iamVjdEZpZWxkIH0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQgeyBtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3RXaXRoQXNzZXJ0aW9ucyB9IGZyb20gJy4vZXh0cmFjdG9ycyc7XG5pbXBvcnQgeyBQUklWQVRFX1BST1BFUlRJRVMsIFZBTElEQVRFX1RZUEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoZSBpbmNvbWluZyB2YWx1ZSBmb3IgZ2l2ZW4gdHlwZS4gIFR5cGVzIGFsbG93ZWQgYXJlOlxuICpcbiAqIC0gaW50ZWdlcjogY2hlY2tzIGlmIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiAtIG51bWJlcjogY2hlY2tzIGlmIHZhbHVlIGlzIGNsYXNzaWZpZWQgYXMgYSBOdW1iZXIgcHJpbWl0aXZlIG9yIG9iamVjdCAodGhpc1xuICogICBtZWFucyBgSW5maW5pdHlgLCBgLUluZmluaXR5YCwgYW5kIGBOYU5gIGFyZSBjb25zaWRlcmVkIHZhbGlkIGZvciB0aGlzIHR5cGVcbiAqIC0gc3RyaW5nXG4gKiAtIG9iamVjdCAtIHRoaXMgdmFsaWRhdGVzIGFzIGEgXCJwbGFpbk9iamVjdFwiLCB0aGF0IGlzIGFuIG9iamVjdCBjcmVhdGVkIGJ5XG4gKiAgIHRoZSBPYmplY3QgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBbW1Byb3RvdHlwZV1dIG9mIG51bGwuXG4gKiAtIGJvb2xlYW5cbiAqIC0gYm9vbDogKHNhbWUgYXMgYm9vbGVhbiBjaGVjaylcbiAqIC0gbnVsbDogdmFsdWUgbXVzdCBleHBsaWNpdGx5IGJlIGBudWxsYFxuICpcbiAqIE5vdGU6IGlmIHRoZSBwYXNzZWQgaW4gdHlwZSBkb2VzIG5vdCBleGlzdCwgdGhlbiB0aGUgdmFsdWUgaXMgY29uc2lkZXJlZFxuICogaW52YWxpZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0gdHlwZSAgVGhlIHR5cGUgb3IgdHlwZXMgdG8gY2hlY2tcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgIFRoZSB2YWx1ZSBiZWluZyB2YWxpZGF0ZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoZSB2YWx1ZSBpcyB2YWxpZCBmb3IgdGhlIGdpdmVuIHR5cGUuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVR5cGUgPSAoIHR5cGUsIHZhbHVlICkgPT4ge1xuXHRsZXQgdmFsaWQgPSBmYWxzZTtcblx0Ly8gYWNjb3VudCBmb3IgdHlwZSBkZWZpbml0aW9ucyB0aGF0IGFyZSBhbiBhcnJheSBvZiBhbGxvd2VkIHR5cGVzLlxuXHRpZiAoIGlzQXJyYXkoIHR5cGUgKSApIHtcblx0XHRmb3IgKCBjb25zdCBzaW5nbGVUeXBlIG9mIHR5cGUgKSB7XG5cdFx0XHR2YWxpZCA9IHZhbGlkYXRlVHlwZSggc2luZ2xlVHlwZSwgdmFsdWUgKTtcblx0XHRcdGlmICggdmFsaWQgKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyByZXR1cm4gcmlnaHQgYXdheSBiZWNhdXNlIHdlJ3ZlIGRldGVybWluZWQgdGhlIHZhbGlkaXR5IG9mIHRoZSB0eXBlLlxuXHRcdHJldHVybiB2YWxpZDtcblx0fVxuXHRzd2l0Y2ggKCB0eXBlICkge1xuXHRcdGNhc2UgJ2ludGVnZXInOlxuXHRcdFx0dmFsaWQgPSBpc0ludGVnZXIoIHZhbHVlICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdudW1iZXInOlxuXHRcdFx0dmFsaWQgPSBpc051bWJlciggdmFsdWUgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHR2YWxpZCA9IGlzU3RyaW5nKCB2YWx1ZSApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdHZhbGlkID0gaXNQbGFpbk9iamVjdCggdmFsdWUgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2Jvb2xlYW4nOlxuXHRcdGNhc2UgJ2Jvb2wnOlxuXHRcdFx0dmFsaWQgPSBpc0Jvb2xlYW4oIHZhbHVlICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdudWxsJzpcblx0XHRcdHZhbGlkID0gdmFsdWUgPT09IG51bGw7XG5cdFx0XHRicmVhaztcblx0fVxuXHRyZXR1cm4gdmFsaWQ7XG59O1xuXG4vKipcbiAqIFRoaXMgdmFsaWRhdGVzIGVudW0gdHlwZSBvZiB2YWx1ZXMuXG4gKlxuICogVGhpcyBtZWFucyB0aGF0IHRoZSB2YWx1ZSBtdXN0IGJlIG9uZSBvZiB0aGUgcHJvdmlkZWQgYXJyYXkgb2YgZW51bVZhbHVlcyBhc1xuICogd2VsbCBhcyBiZWluZyBvZiB0aGUgZXhwZWN0ZWQgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtBcnJheX0gZW51bVZhbHVlc1xuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhpcyB2YWx1ZSBpcyB2YWxpZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRW51bVR5cGUgPSAoIHR5cGUsIGVudW1WYWx1ZXMsIHZhbHVlICkgPT4ge1xuXHRyZXR1cm4gdmFsaWRhdGVUeXBlKCB0eXBlLCB2YWx1ZSApICYmXG5cdFx0aXNBcnJheSggZW51bVZhbHVlcyApICYmXG5cdFx0ZW51bVZhbHVlcy5pbmRleE9mKCB2YWx1ZSApID4gLTE7XG59O1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGRvZXMgYSBzaGFsbG93IHZhbGlkYXRpb24gZm9yIHRoZSBnaXZlbiB2YWx1ZSBhbmQgZmllbGQuXG4gKlxuICogXCJTaGFsbG93XCIgaGVyZSBtZWFucyB0aGF0IGlmIHRoZSBmaWVsZCBzY2hlbWEgaXMgb2YgdHlwZSAnb2JqZWN0JywgdGhlbiB0aGVcbiAqIHZhbGlkYXRpb24gb25seSB2ZXJpZmllcyB0aGF0IHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuICBUaGUgb2JqZWN0IGNvbnRlbnRzXG4gKiBhcmUgbm90IHZhbGlkYXRlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhwZWN0VmFsdWVPYmplY3RzICBJZiB0cnVlLCB0aGVuIHRoaXMgZmxhZ3MgdGhlIHZhbGlkYXRvclxuICogdG8gYXNzdW1lIHRoZSB2YWx1ZSBtaWdodCBiZSBhIHZhbHVlIG9iamVjdCBhbmQgYXR0ZW1wdCB0byByZXRyaWV2ZSB0aGUgcmF3XG4gKiB2YWx1ZSBmcm9tIHRoYXQgdmFsdWUgb2JqZWN0IGZvciB2YWxpZGF0aW9uIGFnYWluc3QgdGhlIGV4cGVjdGVkIHR5cGUgaW4gdGhlXG4gKiBzY2hlbWEgZm9yIHRoYXQgZmllbGQuXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGUgdmFsdWUgaXMgdmFsaWQuXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICogQHRocm93cyBJbnZhbGlkRGF0ZVRpbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2hhbGxvd1ZhbGlkVmFsdWVGb3JGaWVsZCA9IChcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRzY2hlbWEsXG5cdGV4cGVjdFZhbHVlT2JqZWN0cyA9IHRydWVcbikgPT4ge1xuXHQvLyBpZiBmaWVsZCBpcyBhIHByaW1hcnkgS2V5IGZpZWxkIHRoZW4gd2Ugb3ZlcnJpZGUgdGhlIHZhbGlkYXRpb24gc28gaXQgY2FuXG5cdC8vIGJlIGVpdGhlciBzdHJpbmcgb3IgbnVtYmVyXG5cdGlmICggaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgKSB7XG5cdFx0cmV0dXJuIHZhbGlkYXRlVHlwZSggJ3N0cmluZycsIGZpZWxkVmFsdWUgKSB8fFxuXHRcdFx0dmFsaWRhdGVUeXBlKCAnbnVtYmVyJywgZmllbGRWYWx1ZSApO1xuXHR9XG5cdGNvbnN0IGlzRW51bSA9IGlzRW51bUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApO1xuXHRjb25zdCBpc1ZhbHVlT2JqZWN0ID0gaXNWYWx1ZU9iamVjdEZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApO1xuXHRmaWVsZFZhbHVlID0gZXhwZWN0VmFsdWVPYmplY3RzICYmIGlzVmFsdWVPYmplY3QgP1xuXHRcdG1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdFdpdGhBc3NlcnRpb25zKFxuXHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdHNjaGVtYVxuXHRcdCkgOlxuXHRcdGZpZWxkVmFsdWU7XG5cdGZpZWxkVmFsdWUgPSBleHBlY3RWYWx1ZU9iamVjdHMgJiZcblx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdGlzVmFsdWVPYmplY3QgP1xuXHRcdHsgcmF3OiBmaWVsZFZhbHVlIH0gOlxuXHRcdGZpZWxkVmFsdWU7XG5cdGNvbnN0IGlzVmFsaWQgPSBpc0VudW0gP1xuXHRcdHZhbGlkYXRlRW51bVR5cGUoXG5cdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUsXG5cdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLmVudW0sXG5cdFx0XHRmaWVsZFZhbHVlXG5cdFx0KSA6XG5cdFx0dmFsaWRhdGVUeXBlKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUsIGZpZWxkVmFsdWUgKTtcblx0Ly8gaWYgaXNFbnVtIGFuZCBub3QgdmFsaWQsIHRoZW4gbGV0cyBiYWlsIHdpdGggZXJyb3Jcblx0aWYgKCBpc0VudW0gJiYgISBpc1ZhbGlkICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHQnVGhlIGdpdmVuIFwiJXNcIiBmaWVsZE5hbWUgaXMgbm90IHZhbGlkIGZvciB0aGUgZGVmaW5lZCBzY2hlbWEuICBJdCBtdXN0IGJlIGEgXCIlc1wiIGFuZCBpdCBtdXN0IGJlIG9uZSBvZiBcIiVzXCIuIFRoZSBmaWVsZFZhbHVlIGdpdmVuIHdhcyBcIiVzXCInLFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0uZW51bS5qb2luKCksXG5cdFx0XHRcdGZpZWxkVmFsdWVcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cdHJldHVybiBpc1ZhbGlkO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoYXQgaXMgc2V0IGFzIHRoZSB2YWxpZGF0ZVR5cGUgZm9yIHRoZSBnaXZlbiBmaWVsZCBhbmQgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB2YWxpZGF0aW9uIHR5cGUgZm9yIHRoZSBnaXZlbiBmaWVsZCBhbmQgaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVR5cGVGb3JGaWVsZCA9ICggZmllbGROYW1lLCBpbnN0YW5jZSApID0+IHtcblx0cmV0dXJuIGluc3RhbmNlWyBQUklWQVRFX1BST1BFUlRJRVMuVkFMSURBVEVfVFlQRVMgXVsgZmllbGROYW1lIF0gP1xuXHRcdGluc3RhbmNlWyBQUklWQVRFX1BST1BFUlRJRVMuVkFMSURBVEVfVFlQRVMgXVsgZmllbGROYW1lIF0gOlxuXHRcdFZBTElEQVRFX1RZUEUuUkFXO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdldmVudCc7XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9TVEFUVVNfSUQgPSB7XG5cdFNPTERfT1VUOiAnc29sZF9vdXQnLFxuXHRQT1NUUE9ORUQ6ICdwb3N0cG9uZWQnLFxuXHRDQU5DRUxMRUQ6ICdjYW5jZWxsZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IEVWRU5UX1NUQVRVU19JRFMgPSB2YWx1ZXMoIEVWRU5UX1NUQVRVU19JRCApO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcblx0R1JFQVRFUl9USEFOLFxuXHRHUkVBVEVSX1RIQU5fQU5EX0VRVUFMLFxuXHRMRVNTX1RIQU5fQU5EX0VRVUFMLFxufSBmcm9tICcuLi9iYXNlJztcblxuZXhwb3J0IGNvbnN0IG5vd0RhdGVBbmRUaW1lID0gbW9tZW50KCk7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIFtcblx0XHRcdCdFVlRfbmFtZScsXG5cdFx0XHQnRVZUX0lEJyxcblx0XHRcdCdzdGFydF9kYXRlJyxcblx0XHRcdCdlbmRfZGF0ZScsXG5cdFx0XHQndGlja2V0X3N0YXJ0Jyxcblx0XHRcdCd0aWNrZXRfZW5kJyxcblx0XHRdICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0XHRzaG93RXhwaXJlZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0Y2F0ZWdvcnlTbHVnOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG1vbnRoOiBQcm9wVHlwZXMubW9udGgsXG5cdH0gKSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHRcdHNob3dFeHBpcmVkOiBib29sZWFuXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdzdGFydF9kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0XHRzaG93RXhwaXJlZDogZmFsc2UsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXJ0X2RhdGU6ICdEYXRldGltZS5EVFRfRVZUX3N0YXJ0Jyxcblx0XHRlbmRfZGF0ZTogJ0RhdGV0aW1lLkRUVF9FVlRfZW5kJyxcblx0XHR0aWNrZXRfc3RhcnQ6ICdEYXRldGltZS5UaWNrZXQuVEtUX3N0YXJ0X2RhdGUnLFxuXHRcdHRpY2tldF9lbmQ6ICdEYXRldGltZS5UaWNrZXQuVEtUX2VuZF9kYXRlJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gZXZlbnRzIGVuZHBvaW50IHJlcXVlc3QgdXNpbmcgcHJvdmlkZWRcbiAqIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0V4cGlyZWQgIFdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgZXhwaXJlZCBldmVudHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gY2F0ZWdvcnlTbHVnICBSZXR1cm4gZXZlbnRzIGZvciB0aGUgZ2l2ZW4gY2F0ZWdvcnlTbHVnXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9udGggICAgICAgICBSZXR1cm4gZXZlbnRzIGZvciB0aGUgZ2l2ZW4gbW9udGguXG4gKiBcdFx0XHRcdFx0XHRcdFx0IENhbiBiZSBhbnkgbW9udGggZm9ybWF0IHJlY29nbml6ZWQgYnkgbW9tZW50LlxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgVGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7XG5cdHNob3dFeHBpcmVkID0gZmFsc2UsXG5cdGNhdGVnb3J5U2x1Zyxcblx0bW9udGggPSAnbm9uZScsXG59ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXG5cdGlmICggISBzaG93RXhwaXJlZCApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RhdGV0aW1lLkRUVF9FVlRfZW5kKipleHBpcmVkXVtdPScgKyBHUkVBVEVSX1RIQU4gK1xuXHRcdFx0JyZ3aGVyZVtEYXRldGltZS5EVFRfRVZUX2VuZCoqZXhwaXJlZF1bXT0nICtcblx0XHRcdG5vd0RhdGVBbmRUaW1lLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmICggY2F0ZWdvcnlTbHVnICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVGVybV9SZWxhdGlvbnNoaXAuVGVybV9UYXhvbm9teS5UZXJtLnNsdWddPScgKyBjYXRlZ29yeVNsdWdcblx0XHQpO1xuXHR9XG5cdGlmICggbW9udGggJiYgbW9udGggIT09ICdub25lJyApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RhdGV0aW1lLkRUVF9FVlRfc3RhcnRdW109JyArIEdSRUFURVJfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtEYXRldGltZS5EVFRfRVZUX3N0YXJ0XVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuc3RhcnRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9lbmRdW109JyArIExFU1NfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtEYXRldGltZS5EVFRfRVZUX2VuZF1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLmVuZE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCJleHBvcnQgKiBmcm9tICcuL2Fzc2VydGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9iYXNlJztcbmV4cG9ydCAqIGZyb20gJy4vZGVmYXVsdC1tb2RlbC1zdGF0ZSc7XG5leHBvcnQgKiBmcm9tICcuL2VuZHBvaW50cyc7XG5leHBvcnQgKiBmcm9tICcuL2VudGl0eS1mYWN0b3J5JztcbmV4cG9ydCAqIGZyb20gJy4vcHJpbWFyeS1rZXlzJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWwtbmFtZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMnO1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHByaW1hcnlLZXlzIH0gZnJvbSAnLi9wcmltYXJ5LWtleXMuanMnO1xuXG4vKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsga2V5cywgc3RhcnRDYXNlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBwbHVyYWxpemUgZnJvbSAncGx1cmFsaXplJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ21lbWl6ZSc7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBtb2RlbCBuYW1lcyBjdXJyZW50bHkgZXhwb3NlZCBmb3IgUkVTVCBBUEkgcmVxdWVzdC5cbiAqL1xuZXhwb3J0IGNvbnN0IE1PREVMX05BTUVTID0ga2V5cyggcHJpbWFyeUtleXMgKTtcblxuLyoqXG4gKiBVc2VkIHRvIG5vcm1hbGl6ZSB0aGUgcGx1cmFsIGZvcm0gb2YgYSBnaXZlbiBtb2RlbCBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7c3RyaW5nfSAgRW5zdXJlcyB0aGUgZ2l2ZW4gbW9kZWxOYW1lIGlzIGl0cyBwbHVyYWwgZm9ybS5cbiAqL1xuZXhwb3J0IGNvbnN0IHBsdXJhbE1vZGVsTmFtZSA9IG1lbW9pemUoXG5cdCggbW9kZWxOYW1lICkgPT4gcGx1cmFsaXplKCBtb2RlbE5hbWUgKVxuKTtcblxuLyoqXG4gKiBVc2VkIHRvIG5vcm1hbGl6ZSB0aGUgc2luZ3VsYXIgZm9ybSBvZiBhIGdpdmVuIG1vZGVsIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEVuc3VyZXMgdGhlIGdpdmVuIG1vZGVsTmFtZSBpcyBpbiBpdHMgc2luZ3VsYXIgZm9ybS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNpbmd1bGFyTW9kZWxOYW1lID0gbWVtb2l6ZShcblx0KCBtb2RlbE5hbWUgKSA9PiBwbHVyYWxpemUuc2luZ3VsYXIoIG1vZGVsTmFtZSApXG4pO1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBjYXBpdGFsaXplZCBzbmFrZWNhc2UgZm9ybWF0IGZvciB0aGUgZ2l2ZW4gbW9kZWwgbmFtZSB0eXBpY2FsbHlcbiAqIHVzZWQgaW4gcXVlcnkgc3RyaW5ncy5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIG1vZGVsTmFtZUZvclF1ZXJ5U3RyaW5nKCAnbWVzc2FnZV90ZW1wbGF0ZV9ncm91cCcgKTtcbiAqIC8vIE1lc3NhZ2VfVGVtcGxhdGVfR3JvdXBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBmb3JtYXR0ZWQgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgbW9kZWxOYW1lRm9yUXVlcnlTdHJpbmcgPSBtZW1vaXplKFxuXHQoIG1vZGVsTmFtZSApID0+IHtcblx0XHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdFx0bW9kZWxOYW1lID0gc3RhcnRDYXNlKCBtb2RlbE5hbWUgKTtcblx0XHRyZXR1cm4gbW9kZWxOYW1lLnJlcGxhY2UoIC9cXHMvZywgJ18nICk7XG5cdH1cbik7XG4iLCJpbXBvcnQgKiBhcyBhdHRlbmRlZU1vZGVsIGZyb20gJy4vYXR0ZW5kZWUnO1xuaW1wb3J0ICogYXMgY2hlY2tJbk1vZGVsIGZyb20gJy4vY2hlY2tpbic7XG5pbXBvcnQgKiBhcyBkYXRlVGltZU1vZGVsIGZyb20gJy4vZGF0ZXRpbWUnO1xuaW1wb3J0ICogYXMgZXZlbnRNb2RlbCBmcm9tICcuL2V2ZW50JztcbmltcG9ydCAqIGFzIHByaWNlVHlwZU1vZGVsIGZyb20gJy4vcHJpY2UtdHlwZSc7XG5pbXBvcnQgKiBhcyByZWdpc3RyYXRpb25Nb2RlbCBmcm9tICcuL3JlZ2lzdHJhdGlvbic7XG5pbXBvcnQgKiBhcyBzdGF0dXNNb2RlbCBmcm9tICcuL3N0YXR1cyc7XG5pbXBvcnQgKiBhcyB0aWNrZXRNb2RlbCBmcm9tICcuL3RpY2tldCc7XG5leHBvcnQge1xuXHRhdHRlbmRlZU1vZGVsLFxuXHRjaGVja0luTW9kZWwsXG5cdGRhdGVUaW1lTW9kZWwsXG5cdGV2ZW50TW9kZWwsXG5cdHByaWNlVHlwZU1vZGVsLFxuXHRyZWdpc3RyYXRpb25Nb2RlbCxcblx0c3RhdHVzTW9kZWwsXG5cdHRpY2tldE1vZGVsLFxufTtcbiIsIlxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAncHJpY2VfdHlwZSc7XG5cbmV4cG9ydCBjb25zdCBCQVNFX1BSSUNFX1RZUEVTID0ge1xuXHRCQVNFX1BSSUNFOiAxLFxuXHRESVNDT1VOVDogMixcblx0U1VSQ0hBUkdFOiAzLFxuXHRUQVg6IDQsXG59O1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGRhdGEgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc0FycmF5LCByZWR1Y2UsIHRyaW1FbmQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbWVtaXplJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGFzc2VydEVudGl0eUhhc0tleSxcblx0YXNzZXJ0SXNBcnJheSxcblx0YXNzZXJ0SXNOb3RFbXB0eSxcblx0YXNzZXJ0SXNNYXAsXG59IGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5cbi8qKlxuICogRXhwb3NlcyBhIG1hcCBvZiBtb2RlbG5hbWUgdG8gcHJpbWFyeSBrZXkgZXhwb3NlZCBieSB0aGUgZWVqcy5kYXRhIGdsb2JhbFxuICogdmlhIHRoZSBzZXJ2ZXIuXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5leHBvcnQgY29uc3QgeyBwcmltYXJ5X2tleXM6IHByaW1hcnlLZXlzID0ge30gfSA9IGRhdGEucGF0aHM7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWVzIGZvciB0aGUgZ2l2ZW4ga2V5cyBmcm9tIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKiBUaGlzIGZ1bmN0aW9uIHdvdWxkIGJlIHVzZWQgZm9yIG1vZGVscyB0aGF0IGhhdmUgY29tYmluZWQgcHJpbWFyeSBrZXlzXG4gKiAoZGVsaXZlcmVkIGFzIGFuIGFycmF5KS5cbiAqXG4gKiBAdHlwZSB7IG1lbW9pemVkIH1cbiAqIEByZXR1cm4geyBzdHJpbmcgfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIGZvciB0aGUgdmFsdWVzLlxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCB2YWx1ZXNGb3JDb21iaW5lZFByaW1hcnlLZXlzID0gbWVtb2l6ZSggKCBrZXlzLCBlbnRpdHkgKSA9PiB7XG5cdGFzc2VydElzQXJyYXkoIGtleXMgKTtcblx0Y29uc3QgcHJpbWFyeUtleSA9IHJlZHVjZSgga2V5cywgZnVuY3Rpb24oIHJlc3VsdCwga2V5ICkge1xuXHRcdGFzc2VydEVudGl0eUhhc0tleSgga2V5LCBlbnRpdHkgKTtcblx0XHRyZXR1cm4gZW50aXR5WyByZXN1bHQgXSArICc6JyArIGVudGl0eVsga2V5IF07XG5cdH0gKTtcblx0cmV0dXJuIHRyaW1FbmQoIHByaW1hcnlLZXksICc6JyApO1xufSApO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlIGZvciB0aGUgZ2l2ZW4ga2V5IGZyb20gdGhlIHByb3ZpZGVkIGVudGl0eS5cbiAqIFRoaXMgZnVuY3Rpb24gd291bGQgYmUgdXNlZCBmb3IgbW9kZWxzIHRoYXQgaGF2ZSBvbmx5IG9uZSBwcmltYXJ5IGtleS5cbiAqXG4gKiBAdHlwZSB7bWVtb2l6ZWR9XG4gKiBAcmV0dXJuIHsgZnVuY3Rpb24gfSBUaGUgdmFsdWUgZm9yIHRoZSBrZXkgaW4gdGhlIHByb3ZpZGVkIGVudGl0eS5cbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgdmFsdWVGb3JQcmltYXJ5S2V5ID0gbWVtb2l6ZSggKCBrZXksIGVudGl0eSApID0+IHtcblx0YXNzZXJ0RW50aXR5SGFzS2V5KCBrZXksIGVudGl0eSApO1xuXHRyZXR1cm4gZW50aXR5WyBrZXkgXTtcbn0gKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwcmltYXJ5IGtleSAob3IgY29tYmluZWQgcHJpbWFyeSBrZXlzKSBmcm9tIHRoZSBhdmFpbGFibGUgZGF0YS5cbiAqXG4gKiBAdHlwZSB7bWVtb2l6ZWR9XG4gKiBAcmV0dXJuIHsgZnVuY3Rpb24oc3RyaW5nKSB9XG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFByaW1hcnlLZXkgPSBtZW1vaXplKCAoIG1vZGVsTmFtZSApID0+IHtcblx0YXNzZXJ0RW50aXR5SGFzS2V5KCBtb2RlbE5hbWUsIHByaW1hcnlLZXlzICk7XG5cdHJldHVybiBwcmltYXJ5S2V5c1sgbW9kZWxOYW1lIF07XG59ICk7XG5cbi8qKlxuICogUmV0dXJucyBhIHF1ZXJ5IHN0cmluZyBmb3IgZ2V0dGluZyB0aGUgZW50aXRpZXMgYmVsb25naW5nIHRvIGEgbW9kZWwgZm9yIHRoZVxuICogZ2l2ZW4gcHJpbWFyeSBrZXkgdmFsdWVzXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICovXG5leHBvcnQgY29uc3QgZ2V0UHJpbWFyeUtleVF1ZXJ5U3RyaW5nID0gbWVtb2l6ZShcblx0KCBtb2RlbE5hbWUsIGtleVZhbHVlcyA9IFtdICkgPT4ge1xuXHRcdGNvbnN0IHByaW1hcnlLZXkgPSBnZXRQcmltYXJ5S2V5KCBtb2RlbE5hbWUgKTtcblx0XHRyZXR1cm4gYFskeyBwcmltYXJ5S2V5IH1dW0lOXT1gICsga2V5VmFsdWVzLmpvaW4oKTtcblx0fVxuKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZXMgZm9yIHRoZSBwcmltYXJ5IGtleXMgZnJvbSB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICpcbiAqIEB0eXBlIHttZW1vaXplZH1cbiAqIEByZXR1cm4geyBmdW5jdGlvbiB9ICBJZiB0aGUgbW9kZWwgaGFzIG9ubHkgb25lIHByaW1hcnkga2V5IHRoZW4gdGhlIHZhbHVlIHdpbGxcbiAqIGJlIGEgc2ltcGxlIHN0cmluZy4gIElmIHRoZSBtb2RlbCBoYXMgY29tYmluZWQgcHJpbWFyeSBrZXlzLCB0aGVuIHRoZSB2YWx1ZVxuICogd2lsbCBiZSBhcyBzdHJpbmcgaW4gdGhlIGZvcm1hdCBgJXMuJXNgIGZvciB0aGUgcHJpbWFyeSBrZXkgdmFsdWVzLlxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzID0gbWVtb2l6ZSggKCBtb2RlbE5hbWUsIGVudGl0eSApID0+IHtcblx0Y29uc3Qga2V5cyA9IGdldFByaW1hcnlLZXkoIG1vZGVsTmFtZSApO1xuXHRyZXR1cm4gaXNBcnJheSgga2V5cyApID9cblx0XHR2YWx1ZXNGb3JDb21iaW5lZFByaW1hcnlLZXlzKCBrZXlzLCBlbnRpdHkgKSA6XG5cdFx0dmFsdWVGb3JQcmltYXJ5S2V5KCBrZXlzLCBlbnRpdHkgKTtcbn0gKTtcblxuLyoqXG4gKiBUaGlzIHJlY2VpdmVzIGFuIGFycmF5IG9mIGVudGl0aWVzIGFuZCByZXR1cm5zIGEgY29sbGVjdGlvbiBvZiB0aG9zZSBzYW1lXG4gKiBlbnRpdGllcyBpbmRleGVkIGJ5IHRoZSBwcmltYXJ5IGtleSB2YWx1ZSBmb3IgZWFjaCBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtBcnJheX0gZW50aXRpZXNcbiAqIEByZXR1cm4ge01hcH0gIEEgY29sbGVjdGlvbiBpbmRleGVkIGJ5IHRoZSBwcmltYXJ5IGtleSB2YWx1ZXMgZm9yIGVhY2ggZW50aXR5LlxuICogQHRocm93cyB7RXhjZXB0aW9ufVxuICovXG5leHBvcnQgY29uc3Qga2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSA9ICggbW9kZWxOYW1lLCBlbnRpdGllcyA9IFtdICkgPT4ge1xuXHRhc3NlcnRJc05vdEVtcHR5KFxuXHRcdGVudGl0aWVzLFxuXHRcdF9fKFxuXHRcdFx0J1RoZSBwcm92aWRlZCBhcnJheSBvZiBlbnRpdGllcyBtdXN0IG5vdCBiZSBlbXB0eScsXG5cdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdClcblx0KTtcblx0YXNzZXJ0SXNBcnJheSggZW50aXRpZXMgKTtcblxuXHRjb25zdCBtYXBwZWRFbnRpdGllcyA9IG5ldyBNYXAoKTtcblx0ZW50aXRpZXMuZm9yRWFjaCggKCBlbnRpdHkgKSA9PiB7XG5cdFx0bWFwcGVkRW50aXRpZXMuc2V0KFxuXHRcdFx0Z2V0RW50aXR5UHJpbWFyeUtleVZhbHVlcyggbW9kZWxOYW1lLCBlbnRpdHkgKSxcblx0XHRcdGVudGl0eVxuXHRcdCk7XG5cdH0gKTtcblx0cmV0dXJuIG1hcHBlZEVudGl0aWVzO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIGVudGl0eSBpbnN0YW5jZXMgdXNpbmcgdGhlIGdpdmVuIGZhY3RvcnkgYW5kIGFycmF5XG4gKiBvZiBlbnRpdHkgdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBmYWN0b3J5XG4gKiBAcGFyYW0ge01hcH0gZW50aXRpZXNcbiAqIEByZXR1cm4ge01hcH0gIEFuIGFycmF5IG9mIGVudGl0eSBpbnN0YW5jZXMgaW5kZXhlZCBieVxuICogdGhlaXIgcHJpbWFyeSBrZXkgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUFuZEtleUVudGl0aWVzQnlQcmltYXJ5S2V5VmFsdWUgPSAoXG5cdGZhY3RvcnksXG5cdGVudGl0aWVzLFxuKSA9PiB7XG5cdGFzc2VydElzTWFwKFxuXHRcdGVudGl0aWVzLFxuXHRcdF9fKFxuXHRcdFx0J1RoZSBwcm92aWRlZCBvYmplY3Qgb2YgZW50aXRpZXMgbXVzdCBiZSBhIE1hcCBvYmplY3QnLFxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHQpXG5cdCk7XG5cdGVudGl0aWVzLmZvckVhY2goICggZW50aXR5LCBlbnRpdHlJZCApID0+IHtcblx0XHRlbnRpdGllcy5zZXQoIGVudGl0eUlkLCBmYWN0b3J5LmZyb21FeGlzdGluZyggZW50aXR5ICkgKTtcblx0fSApO1xuXHRyZXR1cm4gZW50aXRpZXM7XG59O1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCAqIGFzIHN0YXR1c01vZGVsIGZyb20gJy4uL3N0YXR1cy9jb25zdGFudHMnO1xuXG4vKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAncmVnaXN0cmF0aW9uJztcblxuZXhwb3J0IGNvbnN0IFJFR0lTVFJBVElPTl9TVEFUVVNfSURTID0gdmFsdWVzKFxuXHRzdGF0dXNNb2RlbC5SRUdJU1RSQVRJT05fU1RBVFVTX0lEXG4pO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNVbmRlZmluZWQsIHZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcbn0gZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgKiBhcyBzdGF0dXNNb2RlbCBmcm9tICcuLi9zdGF0dXMvY29uc3RhbnRzJztcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRmb3JFdmVudElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JBdHRlbmRlZUlkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JUcmFuc2FjdGlvbklkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JUaWNrZXRJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yU3RhdHVzSWQ6IFByb3BUeXBlcy5vbmVPZiggdmFsdWVzKCBzdGF0dXNNb2RlbC5SRUdJU1RSQVRJT05fU1RBVFVTX0lEICkgKSxcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIFtcblx0XHRcdCdSRUdfSUQnLFxuXHRcdFx0J1JFR19kYXRlJyxcblx0XHRdICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0fSApLFxufTtcblxuZXhwb3J0IGNvbnN0IG9wdGlvbnNFbnRpdHlNYXAgPSB7XG5cdGRlZmF1bHQ6IHtcblx0XHR2YWx1ZTogJ1JFR19JRCcsXG5cdFx0bGFiZWw6ICdSRUdfY29kZScsXG5cdH0sXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdyZWdfZGF0ZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYSByZWdpc3RyYXRpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHJlZ19pZDogJ1JFR19JRCcsXG5cdFx0cmVnX2RhdGU6ICdSRUdfZGF0ZScsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIHJlZ2lzdHJhdGlvbnMgZW5kcG9pbnQgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICAgIFx0SUQgb2YgRXZlbnQgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JBdHRlbmRlZUlkICAgIElEIG9mIEF0dGVuZGVlIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yVHJhbnNhY3Rpb25JZCBJRCBvZiBUcmFuc2FjdGlvbiB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvclRpY2tldElkIFx0XHRJRCBvZiBUaWNrZXQgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JTdGF0dXNJZCBcdFx0SUQgb2YgU3RhdHVzIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgIFx0VGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7XG5cdGZvckV2ZW50SWQgPSAwLFxuXHRmb3JBdHRlbmRlZUlkID0gMCxcblx0Zm9yVHJhbnNhY3Rpb25JZCA9IDAsXG5cdGZvclRpY2tldElkID0gMCxcblx0Zm9yU3RhdHVzSWQgPSAnJyxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cdGZvckV2ZW50SWQgPSBwYXJzZUludCggZm9yRXZlbnRJZCwgMTAgKTtcblx0aWYgKCBmb3JFdmVudElkICE9PSAwICYmICEgaXNOYU4oIGZvckV2ZW50SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbRVZUX0lEXT0nICsgZm9yRXZlbnRJZCApO1xuXHR9XG5cdGZvckF0dGVuZGVlSWQgPSBwYXJzZUludCggZm9yQXR0ZW5kZWVJZCwgMTAgKTtcblx0aWYgKCBmb3JBdHRlbmRlZUlkICE9PSAwICYmICEgaXNOYU4oIGZvckF0dGVuZGVlSWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbQVRUX0lEXT0nICsgZm9yQXR0ZW5kZWVJZCApO1xuXHR9XG5cdGZvclRyYW5zYWN0aW9uSWQgPSBwYXJzZUludCggZm9yVHJhbnNhY3Rpb25JZCwgMTAgKTtcblx0aWYgKCBmb3JUcmFuc2FjdGlvbklkICE9PSAwICYmICEgaXNOYU4oIGZvclRyYW5zYWN0aW9uSWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbVFhOX0lEXT0nICsgZm9yVHJhbnNhY3Rpb25JZCApO1xuXHR9XG5cdGZvclRpY2tldElkID0gcGFyc2VJbnQoIGZvclRpY2tldElkLCAxMCApO1xuXHRpZiAoIGZvclRpY2tldElkICE9PSAwICYmICEgaXNOYU4oIGZvclRpY2tldElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1RLVF9JRF09JyArIGZvclRpY2tldElkICk7XG5cdH1cblx0aWYgKCBmb3JTdGF0dXNJZCAhPT0gJycgJiYgZm9yU3RhdHVzSWQgIT09IG51bGwgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1NUU19JRF09JyArIGZvclN0YXR1c0lkICk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAnc3RhdHVzJztcbi8vIHR5cGVzXG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfRU1BSUwgPSAnZW1haWwnO1xuZXhwb3J0IGNvbnN0IFNUQVRVU19UWVBFX0VWRU5UID0gJ2V2ZW50JztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9NRVNTQUdFID0gJ21lc3NhZ2UnO1xuZXhwb3J0IGNvbnN0IFNUQVRVU19UWVBFX1BBWU1FTlQgPSAncGF5bWVudCc7XG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfUkVHSVNUUkFUSU9OID0gJ3JlZ2lzdHJhdGlvbic7XG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfVFJBTlNBQ1RJT04gPSAndHJhbnNhY3Rpb24nO1xuLy8gZW1haWxcbmV4cG9ydCBjb25zdCBFTUFJTF9TVEFUVVNfSUQgPSB7XG5cdERSQUZUOiAnRURSJyxcblx0U0VOVDogJ0VTTicsXG5cdEVYUElSRUQ6ICdFWFAnLFxufTtcbi8vIGV2ZW50XG5leHBvcnQgY29uc3QgRVZFTlRfU1RBVFVTX0lEID0ge1xuXHRBQ1RJVkU6ICdBQ1QnLFxuXHRSRUdJU1RSQVRJT05fQ0xPU0VEOiAnQ0xTJyxcblx0REVMRVRFRDogJ0RFTCcsXG5cdERFTklFRDogJ0RFTicsXG5cdERSQUZUOiAnRFJGJyxcblx0Tk9UX0FDVElWRTogJ05BQycsXG5cdE5PVF9PUEVOOiAnTk9QJyxcblx0T05HT0lORzogJ09ORycsXG5cdFJFR0lTVFJBVElPTl9PUEVOOiAnT1BOJyxcblx0UEVORElORzogJ1BORCcsXG5cdFNFQ09OREFSWTogJ1NFQycsXG59O1xuLy8gbWVzc2FnZVxuZXhwb3J0IGNvbnN0IE1FU1NBR0VfU1RBVFVTX0lEID0ge1xuXHRERUJVRzogJ01ETycsXG5cdEVYRUNVVElORzogJ01FWCcsXG5cdEZBSUw6ICdNRkwnLFxuXHRJTkNPTVBMRVRFOiAnTUlDJyxcblx0SURMRTogJ01JRCcsXG5cdFJFU0VORDogJ01SUycsXG5cdFJFVFJZOiAnTVJUJyxcblx0U0VOVDogJ01TTicsXG59O1xuLy8gcGF5bWVudFxuZXhwb3J0IGNvbnN0IFBBWU1FTlRfU1RBVFVTX0lEID0ge1xuXHRBUFBST1ZFRDogJ1BBUCcsXG5cdENBTkNFTExFRDogJ1BDTicsXG5cdERFQ0xJTkVEOiAnUERDJyxcblx0RkFJTEVEOiAnUEZMJyxcblx0UEVORElORzogJ1BQTicsXG59O1xuLy8gcmVnaXN0cmF0aW9uXG5leHBvcnQgY29uc3QgUkVHSVNUUkFUSU9OX1NUQVRVU19JRCA9IHtcblx0QVBQUk9WRUQ6ICdSQVAnLFxuXHRDQU5DRUxMRUQ6ICdSQ04nLFxuXHRERUNMSU5FRDogJ1JEQycsXG5cdElOQ09NUExFVEU6ICdSSUMnLFxuXHROT1RfQVBQUk9WRUQ6ICdSTkEnLFxuXHRQRU5ESU5HX1BBWU1FTlQ6ICdSUFAnLFxuXHRXQUlUX0xJU1Q6ICdSV0wnLFxufTtcbi8vIHRyYW5zYWN0aW9uXG5leHBvcnQgY29uc3QgVFJBTlNBQ1RJT05fU1RBVFVTX0lEID0ge1xuXHRBQkFORE9ORUQ6ICdUQUInLFxuXHRDT01QTEVURTogJ1RDTScsXG5cdEZBSUxFRDogJ1RGTCcsXG5cdElOQ09NUExFVEU6ICdUSU4nLFxuXHRPVkVSUEFJRDogJ1RPUCcsXG59O1xuXG4vLyB0aGUgZm9sbG93aW5nIGFyZSBub3QgaW4gdGhlIHN0YXR1cyBkYXRhYmFzZSBidXQgYXJlIGtlcHQgaGVyZSBmb3Jcbi8vIGNvbnZlbmllbmNlXG5cbi8vIGN1c3RvbSBwb3N0IHR5cGVzXG5leHBvcnQgY29uc3QgQ1BUX1NUQVRVU19JRCA9IHtcblx0UFVCTElTSDogJ3B1Ymxpc2gnLFxuXHRGVVRVUkU6ICdmdXR1cmUnLFxuXHREUkFGVDogJ2RyYWZ0Jyxcblx0UEVORElORzogJ3BlbmRpbmcnLFxuXHRQUklWQVRFOiAncHJpdmF0ZScsXG5cdFRSQVNIRUQ6ICd0cmFzaCcsXG59O1xuXG5leHBvcnQgY29uc3QgVU5LTk9XTl9TVEFUVVNfSUQgPSAndW5rbm93bic7XG5cbmV4cG9ydCBjb25zdCBBTExfU1RBVFVTX0lEUyA9IFtcblx0Li4udmFsdWVzKCBFTUFJTF9TVEFUVVNfSUQgKSxcblx0Li4udmFsdWVzKCBFVkVOVF9TVEFUVVNfSUQgKSxcblx0Li4udmFsdWVzKCBNRVNTQUdFX1NUQVRVU19JRCApLFxuXHQuLi52YWx1ZXMoIFBBWU1FTlRfU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggUkVHSVNUUkFUSU9OX1NUQVRVU19JRCApLFxuXHQuLi52YWx1ZXMoIFRSQU5TQUNUSU9OX1NUQVRVU19JRCApLFxuXHQuLi52YWx1ZXMoIENQVF9TVEFUVVNfSUQgKSxcblx0VU5LTk9XTl9TVEFUVVNfSUQsXG5dO1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCAqIGFzIHN0YXR1cyBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBFVkVOVF9TVEFUVVNfSUQgfSBmcm9tICcuLi9ldmVudCc7XG5pbXBvcnQgeyBUSUNLRVRfU1RBVFVTX0lEIH0gZnJvbSAnLi4vdGlja2V0JztcbmltcG9ydCB7IERBVEVUSU1FX1NUQVRVU19JRCB9IGZyb20gJy4uL2RhdGV0aW1lJztcbmltcG9ydCB7IENIRUNLSU5fU1RBVFVTX0lEIH0gZnJvbSAnLi4vY2hlY2tpbic7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgTGFiZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWx1ZS1vYmplY3RzJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgUmVnaXN0cmF0aW9uIHN0YXR1c2VzXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfUkVHSVNUUkFUSU9OID0ge1xuXHRbIHN0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELlBFTkRJTkdfUEFZTUVOVCBdOiBuZXcgTGFiZWwoXG5cdFx0X18oICdwZW5kaW5nIHBheW1lbnQnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0X18oICdwZW5kaW5nIHBheW1lbnRzJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuQVBQUk9WRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdhcHByb3ZlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELk5PVF9BUFBST1ZFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ25vdCBhcHByb3ZlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELkNBTkNFTExFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2NhbmNlbGxlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELklOQ09NUExFVEUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdpbmNvbXBsZXRlJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuREVDTElORUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdkZWNsaW5lZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELldBSVRfTElTVCBdOiBuZXcgTGFiZWwoXG5cdFx0X18oICd3YWl0IGxpc3QnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0X18oICd3YWl0IGxpc3RzJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgVHJhbnNhY3Rpb24gc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqXG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfVFJBTlNBQ1RJT04gPSB7XG5cdFsgc3RhdHVzLlRSQU5TQUNUSU9OX1NUQVRVU19JRC5PVkVSUEFJRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ292ZXJwYWlkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlRSQU5TQUNUSU9OX1NUQVRVU19JRC5DT01QTEVURSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2NvbXBsZXRlJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlRSQU5TQUNUSU9OX1NUQVRVU19JRC5JTkNPTVBMRVRFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnaW5jb21wbGV0ZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5UUkFOU0FDVElPTl9TVEFUVVNfSUQuRkFJTEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZmFpbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlRSQU5TQUNUSU9OX1NUQVRVU19JRC5BQkFORE9ORUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdhYmFuZG9uZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBwYXltZW50IHN0YXR1c2VzXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfUEFZTUVOVCA9IHtcblx0WyBzdGF0dXMuUEFZTUVOVF9TVEFUVVNfSUQuQVBQUk9WRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdhY2NlcHRlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5QQVlNRU5UX1NUQVRVU19JRC5QRU5ESU5HIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncGVuZGluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5QQVlNRU5UX1NUQVRVU19JRC5DQU5DRUxMRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdjYW5jZWxsZWQnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdCksXG5cdFsgc3RhdHVzLlBBWU1FTlRfU1RBVFVTX0lELkRFQ0xJTkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZGVjbGluZWQnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdCksXG5cdFsgc3RhdHVzLlBBWU1FTlRfU1RBVFVTX0lELkZBSUxFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2ZhaWxlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIE1lc3NhZ2Ugc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9NRVNTQUdFID0ge1xuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5TRU5UIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnc2VudCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5JRExFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncXVldWVkIGZvciBzZW5kaW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELkZBSUwgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdmYWlsZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuREVCVUcgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdkZWJ1ZyBvbmx5JywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELkVYRUNVVElORyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ21lc3NlbmdlciBpcyBleGVjdXRpbmcnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuUkVTRU5EIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncXVldWVkIGZvciByZXNlbmRpbmcnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuSU5DT01QTEVURSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3F1ZXVlZCBmb3IgZ2VuZXJhdGluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5SRVRSWSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2ZhaWxlZCBzZW5kaW5nLCBjYW4gYmUgcmV0cmllZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIENQVCBzdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0NQVCA9IHtcblx0WyBzdGF0dXMuQ1BUX1NUQVRVU19JRC5QVUJMSVNIIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncHVibGlzaGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLkNQVF9TVEFUVVNfSUQuRlVUVVJFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnc2NoZWR1bGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLkNQVF9TVEFUVVNfSUQuRFJBRlQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdkcmFmdCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5DUFRfU1RBVFVTX0lELlBFTkRJTkcgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdwZW5kaW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLkNQVF9TVEFUVVNfSUQuUFJJVkFURSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3ByaXZhdGUnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuQ1BUX1NUQVRVU19JRC5UUkFTSEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAndHJhc2hlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLy8gdGhlIGZvbGxvd2luZyBzdGF0dXMgbWFwcyBhcmUgZm9yIG1vZGVsIHN0YXR1c2VzIHRoYXQgYXJlIG5vdCBzYXZlZCBpbiB0aGVcbi8vIHN0YXR1cyB0YWJsZSBidXQgZm9yIGNvbnZlbmllbmNlIGhhdmUgdGhlaXIgbGFiZWxzIHJldHJpZXZhYmxlIHZpYSBoZXJlLlxuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgRXZlbnQgU3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9FVkVOVCA9IHtcblx0WyBFVkVOVF9TVEFUVVNfSUQuU09MRF9PVVQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdzb2xkIG91dCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIEVWRU5UX1NUQVRVU19JRC5QT1NUUE9ORUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdwb3N0cG9uZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBFVkVOVF9TVEFUVVNfSUQuQ0FOQ0VMTEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnY2FuY2VsbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgVGlja2V0IHN0YXR1c2VzXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfVElDS0VUID0ge1xuXHRbIFRJQ0tFVF9TVEFUVVNfSUQuQVJDSElWRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdhcmNoaXZlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIFRJQ0tFVF9TVEFUVVNfSUQuRVhQSVJFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2V4cGlyZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBUSUNLRVRfU1RBVFVTX0lELlNPTERfT1VUIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnc29sZCBvdXQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBUSUNLRVRfU1RBVFVTX0lELlBFTkRJTkcgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICd1cGNvbWluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIFRJQ0tFVF9TVEFUVVNfSUQuT05TQUxFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnb24gc2FsZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIGRhdGV0aW1lIHN0YXR1c2VzXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfREFURVRJTUUgPSB7XG5cdFsgREFURVRJTUVfU1RBVFVTX0lELkNBTkNFTExFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2NhbmNlbGxlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIERBVEVUSU1FX1NUQVRVU19JRC5TT0xEX09VVCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3NvbGQgb3V0JywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgREFURVRJTUVfU1RBVFVTX0lELkVYUElSRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdleHBpcmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgREFURVRJTUVfU1RBVFVTX0lELklOQUNUSVZFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnaW5hY3RpdmUnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuVVBDT01JTkcgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICd1cGNvbWluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIERBVEVUSU1FX1NUQVRVU19JRC5BQ1RJVkUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdhY3RpdmUnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuUE9TVFBPTkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncG9zdHBvbmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgY2hlY2tpbiBzdGF0dXNlc1xuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9DSEVDS0lOID0ge1xuXHRbIENIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX0lOIF06IG5ldyBMYWJlbChcblx0XHRfXyggJ2NoZWNrLWluJywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdF9fKCAnY2hlY2staW5zJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfT1VUIF06IG5ldyBMYWJlbChcblx0XHRfXyggJ2NoZWNrLW91dCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRfXyggJ2NoZWNrLW91dHMnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBDSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9ORVZFUiBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ25ldmVyIGNoZWNrZWQgaW4nLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogQ29tYmluZWQgdHJhbnNsYXRpb24gbWFwIGZvciBhbGwgc3RhdHVzZXMuXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfQUxMID0ge1xuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX1JFR0lTVFJBVElPTixcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9UUkFOU0FDVElPTixcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9QQVlNRU5ULFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX01FU1NBR0UsXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ1BULFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX0VWRU5ULFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX1RJQ0tFVCxcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9EQVRFVElNRSxcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9DSEVDS0lOLFxuXHRbIHN0YXR1cy5VTktOT1dOX1NUQVRVU19JRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3Vua25vd24nLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcHJldHR5IHN0YXR1cyBsYWJlbCBzdHJpbmcgZm9yIHRoZSBnaXZlbiBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0YXR1c0NvZGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXIgIFdoZXRoZXIgdG8gcmV0dXJuIHRoZSBzaW5ndWxhciBvciBwbHVyYWwgbGFiZWxcbiAqIHZhbHVlXG4gKiBAcGFyYW0geyhzZW50ZW5jZXxsb3dlcnx1cHBlcil9IHNjaGVtYVxuICogQHJldHVybiB7c3RyaW5nfSBSZXR1cm5zIHRoZSBtYXBwZWQgcHJldHR5IGxhYmVsIGZvciB0aGUgZ2l2ZW4gc3RhdHVzIGNvZGUgb3JcbiAqIGEgZm9ybWF0dGVkICd1bmtvd24nIHN0cmluZyBpZiB0aGVyZSBpcyBubyBtYXBwZWQgdmFsdWUgZm9yIHRoZSBnaXZlbiBjb2RlLlxuICovXG5leHBvcnQgY29uc3QgcHJldHR5U3RhdHVzID0gKFxuXHRzdGF0dXNDb2RlLFxuXHRzaW5ndWxhciA9IHRydWUsXG5cdHNjaGVtYSA9IExhYmVsLkZPUk1BVF9TRU5URU5DRV9DQVNFXG4pID0+IHtcblx0cmV0dXJuIFNUQVRVU19UUkFOU0xBVElPTl9NQVBfQUxMWyBzdGF0dXNDb2RlIF0gP1xuXHRcdFNUQVRVU19UUkFOU0xBVElPTl9NQVBfQUxMWyBzdGF0dXNDb2RlIF0uYXNGb3JtYXR0ZWQoIHNpbmd1bGFyLCBzY2hlbWEgKSA6XG5cdFx0U1RBVFVTX1RSQU5TTEFUSU9OX01BUF9BTExbIHN0YXR1cy5VTktOT1dOX1NUQVRVU19JRCBdLmFzRm9ybWF0dGVkKFxuXHRcdFx0c2luZ3VsYXIsXG5cdFx0XHRzY2hlbWFcblx0XHQpO1xufTtcblxuLyoqXG4gKiBFeHBlY3RzIGFuIGFycmF5IG9mIHN0YXR1cyBjb2RlcyBhbmQgcmV0dXJucyBhbiBvYmplY3QgaW5kZXhlZCBieSBjb2RlcyB3aXRoXG4gKiB2YWx1ZXMgYmVpbmcgdGhlIGZvcm1hdHRlZCBwcmV0dHkgbGFiZWxzIGZvciBlYWNoIGNvZGUgYWNjb3JkaW5nIHRvIHRoZVxuICogcHJvdmlkZWQgYXJndW1lbnRzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gc3RhdHVzQ29kZXNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXJcbiAqIEBwYXJhbSB7KHNlbnRlbmNlfGxvd2VyfHVwcGVyKX0gc2NoZW1hXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCBtYXBwaW5nIHN0YXR1cyBjb2RlIHRvIHByZXR0eSBsYWJlbC5cbiAqL1xuZXhwb3J0IGNvbnN0IHByZXR0eVN0YXR1c2VzID0gKFxuXHRzdGF0dXNDb2Rlcyxcblx0c2luZ3VsYXIgPSB0cnVlLFxuXHRzY2hlbWEgPSBMYWJlbC5GT1JNQVRfU0VOVEVOQ0VfQ0FTRVxuKSA9PiB7XG5cdGlmICggISBpc0FycmF5KCBzdGF0dXNDb2RlcyApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdFeHBlY3QgaW5jb21pbmcgc3RhdHVzQ29kZXMgYXJndW1lbnQnICtcblx0XHRcdCcgdG8gYmUgYW4gYXJyYXknICk7XG5cdH1cblx0Y29uc3QgbWFwcGVkU3RhdHVzZXMgPSB7fTtcblx0c3RhdHVzQ29kZXMuZm9yRWFjaCggKCBzdGF0dXNDb2RlICkgPT4ge1xuXHRcdG1hcHBlZFN0YXR1c2VzWyBzdGF0dXNDb2RlIF0gPSBwcmV0dHlTdGF0dXMoXG5cdFx0XHRzdGF0dXNDb2RlLFxuXHRcdFx0c2luZ3VsYXIsXG5cdFx0XHRzY2hlbWFcblx0XHQpO1xuXHR9ICk7XG5cdHJldHVybiBtYXBwZWRTdGF0dXNlcztcbn07XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbmV4cG9ydCAqIGZyb20gJy4vaGVscGVycyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9BU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxufSBmcm9tICcuLi9iYXNlJztcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0fSApLFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDI1LFxuXHRcdG9yZGVyQnk6ICdzdGF0dXNDb2RlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfQVNDLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGFuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHRzdGF0dXNDb2RlOiAnU1RTX2NvZGUnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiBldmVudHMgZW5kcG9pbnQgcmVxdWVzdCB1c2luZyBwcm92aWRlZFxuICogaW5mb3JtYXRpb24uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXR1c1R5cGUgXHRJRCBmb3IgdHlwZSBvZiBTdGF0dXMgdG8gcmV0cmlldmVcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgVGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7IHN0YXR1c1R5cGUgfSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0aWYgKCBzdGF0dXNUeXBlICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtTVFNfdHlwZV09JyArIHN0YXR1c1R5cGUgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcblxuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBNT0RFTF9OQU1FID0gJ3RpY2tldCc7XG5cbmV4cG9ydCBjb25zdCBUSUNLRVRfU1RBVFVTX0lEID0ge1xuXHRTT0xEX09VVDogJ1RLUycsXG5cdEVYUElSRUQ6ICdUS0UnLFxuXHRBUkNISVZFRDogJ1RLQScsXG5cdFBFTkRJTkc6ICdUS1AnLFxuXHRPTlNBTEU6ICdUS08nLFxufTtcblxuZXhwb3J0IGNvbnN0IFRJQ0tFVF9TVEFUVVNfSURTID0gdmFsdWVzKCBUSUNLRVRfU1RBVFVTX0lEICk7XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbmV4cG9ydCAqIGZyb20gJy4vc3RhdHVzLWhlbHBlcic7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcblx0R1JFQVRFUl9USEFOLFxuXHRHUkVBVEVSX1RIQU5fQU5EX0VRVUFMLFxuXHRMRVNTX1RIQU5fQU5EX0VRVUFMLFxufSBmcm9tICcuLi9iYXNlJztcblxuZXhwb3J0IGNvbnN0IG5vd0RhdGVBbmRUaW1lID0gbW9tZW50KCk7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIFtcblx0XHRcdCdUS1RfbmFtZScsXG5cdFx0XHQnVEtUX0lEJyxcblx0XHRcdCdzdGFydF9kYXRlJyxcblx0XHRcdCdlbmRfZGF0ZScsXG5cdFx0XSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdFx0c2hvd0V4cGlyZWQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdG1vbnRoOiBQcm9wVHlwZXMubW9udGgsXG5cdH0gKSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHRcdHNob3dFeHBpcmVkOiBib29sZWFuXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdzdGFydF9kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0XHRzaG93RXhwaXJlZDogZmFsc2UsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYSB0aWNrZXQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXJ0X2RhdGU6ICdUS1Rfc3RhcnRfZGF0ZScsXG5cdFx0ZW5kX2RhdGU6ICdUS1RfZW5kX2RhdGUnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiB0aWNrZXRzIGVuZHBvaW50IHJlcXVlc3QgdXNpbmcgcHJvdmlkZWRcbiAqIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0V4cGlyZWQgXHRXaGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIGV4cGlyZWQgdGlja2V0cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb250aCAgICAgICAgICAgIFJldHVybiB0aWNrZXRzIGZvciB0aGUgZ2l2ZW4gbW9udGguIENhbiBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx0aW4gYW55IG1vbnRoIGZvcm1hdCByZWNvZ25pemVkIGJ5IG1vbWVudFxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgICAgXHRJRCBvZiBFdmVudCB0byByZXRyaWV2ZSB0aWNrZXRzIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvckRhdGV0aW1lSWQgICAgSUQgb2YgRGF0ZXRpbWUgdG8gcmV0cmlldmUgdGlja2V0cyBmb3JcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgXHRUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdGZvckRhdGV0aW1lSWQgPSAwLFxuXHRzaG93RXhwaXJlZCA9IGZhbHNlLFxuXHRtb250aCA9ICdub25lJyxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cdGlmICggISBzaG93RXhwaXJlZCApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW1RLVF9lbmRfZGF0ZSoqZXhwaXJlZF1bXT0nICsgR1JFQVRFUl9USEFOICtcblx0XHRcdCcmd2hlcmVbVEtUX2VuZF9kYXRlKipleHBpcmVkXVtdPScgK1xuXHRcdFx0bm93RGF0ZUFuZFRpbWUubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0aWYgKCBtb250aCAmJiBtb250aCAhPT0gJ25vbmUnICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVEtUX3N0YXJ0X2RhdGVdW109JyArIEdSRUFURVJfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtUS1Rfc3RhcnRfZGF0ZV1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLnN0YXJ0T2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW1RLVF9lbmRfZGF0ZV1bXT0nICsgTEVTU19USEFOX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW1RLVF9lbmRfZGF0ZV1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLmVuZE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0Zm9yRXZlbnRJZCA9IHBhcnNlSW50KCBmb3JFdmVudElkLCAxMCApO1xuXHRpZiAoIGZvckV2ZW50SWQgIT09IDAgJiYgISBpc05hTiggZm9yRXZlbnRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtEYXRldGltZS5FdmVudC5FVlRfSURdPScgKyBmb3JFdmVudElkICk7XG5cdH1cblx0Zm9yRGF0ZXRpbWVJZCA9IHBhcnNlSW50KCBmb3JEYXRldGltZUlkLCAxMCApO1xuXHRpZiAoIGZvckRhdGV0aW1lSWQgIT09IDAgJiYgISBpc05hTiggZm9yRGF0ZXRpbWVJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtEYXRldGltZS5EVFRfSURdPScgKyBmb3JEYXRldGltZUlkICk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBNT0RFTF9OQU1FLCBUSUNLRVRfU1RBVFVTX0lEIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IFRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAqL1xuY29uc3QgYXNzZXJ0VGlja2V0RW50aXR5ID0gKCBUaWNrZXRFbnRpdHkgKSA9PiB7XG5cdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbCggVGlja2V0RW50aXR5LCBNT0RFTF9OQU1FICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdCdUaGUgcHJvdmlkZWQgZW50aXR5IGlzIG5vdCBhIHRpY2tldCBpbnN0YW5jZSdcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IFRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGlja2V0IGlzIGN1cnJlbnRseSBhdmFpbGFibGUgZm9yIHB1cmNoYXNlXG4gKi9cbmV4cG9ydCBjb25zdCBpc09uU2FsZSA9ICggVGlja2V0RW50aXR5ICkgPT4ge1xuXHRhc3NlcnRUaWNrZXRFbnRpdHkoIFRpY2tldEVudGl0eSApO1xuXHRyZXR1cm4gISBpc0FyY2hpdmVkKCBUaWNrZXRFbnRpdHkgKSAmJlxuXHRcdFRpY2tldEVudGl0eS5zdGFydERhdGUuZGlmZk5vdygpIDwgMCAmJlxuXHRcdFRpY2tldEVudGl0eS5lbmREYXRlLmRpZmZOb3coKSA+IDA7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IFRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGlja2V0IGNhbiBubyBsb25nZXIgYmUgcHVyY2hhc2VkXG4gKi9cbmV4cG9ydCBjb25zdCBpc0V4cGlyZWQgPSAoIFRpY2tldEVudGl0eSApID0+IHtcblx0YXNzZXJ0VGlja2V0RW50aXR5KCBUaWNrZXRFbnRpdHkgKTtcblx0cmV0dXJuIFRpY2tldEVudGl0eS5lbmREYXRlLmRpZmZOb3coKSA8IDA7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IFRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGlja2V0cyBzb2xkIG1lZXRzIG9yIGV4Y2VlZHMgYXZhaWxhYmxlIHF1YW50aXR5XG4gKi9cbmV4cG9ydCBjb25zdCBpc1NvbGRPdXQgPSAoIFRpY2tldEVudGl0eSApID0+IHtcblx0YXNzZXJ0VGlja2V0RW50aXR5KCBUaWNrZXRFbnRpdHkgKTtcblx0Y29uc3QgcXR5ID0gVGlja2V0RW50aXR5LnF0eTtcblx0cmV0dXJuICggcXR5ICE9PSBudWxsICYmIHF0eSAhPT0gJ0lORicgJiYgcXR5ICE9PSBJbmZpbml0eSApICYmXG5cdFx0VGlja2V0RW50aXR5LnNvbGQgPj0gcXR5O1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBUaWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBcdHRydWUgaWYgdGlja2V0IGlzIG5vdCB5ZXQgYXZhaWxhYmxlIGZvciBwdXJjaGFzZSxcbiAqIFx0XHRcdFx0XHRcdGJ1dCB3aWxsIGJlIGF0IHNvbWUgZGF0ZSBpbiB0aGUgZnV0dXJlXG4gKi9cbmV4cG9ydCBjb25zdCBpc1BlbmRpbmcgPSAoIFRpY2tldEVudGl0eSApID0+IHtcblx0YXNzZXJ0VGlja2V0RW50aXR5KCBUaWNrZXRFbnRpdHkgKTtcblx0cmV0dXJuICEgaXNBcmNoaXZlZCggVGlja2V0RW50aXR5ICkgJiZcblx0XHRUaWNrZXRFbnRpdHkuc3RhcnREYXRlLmRpZmZOb3coKSA+IDA7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IFRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGlja2V0IGlzIGFyY2hpdmVkXG4gKi9cbmV4cG9ydCBjb25zdCBpc0FyY2hpdmVkID0gKCBUaWNrZXRFbnRpdHkgKSA9PiB7XG5cdGFzc2VydFRpY2tldEVudGl0eSggVGlja2V0RW50aXR5ICk7XG5cdHJldHVybiBUaWNrZXRFbnRpdHkuZGVsZXRlZDtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gVGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHJldHVybiB7c3RyaW5nfSBzdGF0dXMgSURcbiAqL1xuZXhwb3J0IGNvbnN0IHN0YXR1cyA9ICggVGlja2V0RW50aXR5ICkgPT4ge1xuXHRhc3NlcnRUaWNrZXRFbnRpdHkoIFRpY2tldEVudGl0eSApO1xuXHRpZiAoIGlzQXJjaGl2ZWQoIFRpY2tldEVudGl0eSApICkge1xuXHRcdHJldHVybiBUSUNLRVRfU1RBVFVTX0lELkFSQ0hJVkVEO1xuXHR9XG5cdGlmICggaXNTb2xkT3V0KCBUaWNrZXRFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gVElDS0VUX1NUQVRVU19JRC5TT0xEX09VVDtcblx0fVxuXHRpZiAoIGlzRXhwaXJlZCggVGlja2V0RW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIFRJQ0tFVF9TVEFUVVNfSUQuRVhQSVJFRDtcblx0fVxuXHRpZiAoIGlzUGVuZGluZyggVGlja2V0RW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIFRJQ0tFVF9TVEFUVVNfSUQuUEVORElORztcblx0fVxuXHRpZiAoIGlzT25TYWxlKCBUaWNrZXRFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gVElDS0VUX1NUQVRVU19JRC5PTlNBTEU7XG5cdH1cblx0cmV0dXJuICcnO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBUaWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9IENTUyBjbGFzcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBiYWNrZ3JvdW5kIGNvbG9yXG4gKiBcdFx0XHRcdFx0Zm9yIHRoZSB0aWNrZXQgY29udGFpbmVyIGJhc2VkIG9uIHRoZSB0aWNrZXQgc3RhdHVzXG4gKi9cbmV4cG9ydCBjb25zdCBzdGF0dXNDb2xvckNsYXNzID0gKCBUaWNrZXRFbnRpdHkgKSA9PiB7XG5cdHN3aXRjaCAoIHN0YXR1cyggVGlja2V0RW50aXR5ICkgKSB7XG5cdFx0Y2FzZSBUSUNLRVRfU1RBVFVTX0lELk9OU0FMRSA6XG5cdFx0XHRyZXR1cm4gJ2dyZWVuJztcblx0XHRjYXNlIFRJQ0tFVF9TVEFUVVNfSUQuRVhQSVJFRCA6XG5cdFx0XHRyZXR1cm4gJ2xpdGUtZ3JleSc7XG5cdFx0Y2FzZSBUSUNLRVRfU1RBVFVTX0lELlNPTERfT1VUIDpcblx0XHRcdHJldHVybiAnZ29sZCc7XG5cdFx0Y2FzZSBUSUNLRVRfU1RBVFVTX0lELlBFTkRJTkcgOlxuXHRcdFx0cmV0dXJuICdibHVlJztcblx0XHRjYXNlIFRJQ0tFVF9TVEFUVVNfSUQuQVJDSElWRUQgOlxuXHRcdFx0cmV0dXJuICdkYXJrLWdyZXknO1xuXHR9XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IFRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ30gdGlja2V0IHN0YXR1c1xuICovXG5leHBvcnQgY29uc3QgZ2V0VGlja2V0U3RhdHVzVGV4dExhYmVsID0gKCBUaWNrZXRFbnRpdHkgKSA9PiB7XG5cdGxldCB0aWNrZXRTdGF0dXMgPSBudWxsO1xuXHRzd2l0Y2ggKCBzdGF0dXMoIFRpY2tldEVudGl0eSApICkge1xuXHRcdGNhc2UgVElDS0VUX1NUQVRVU19JRC5TT0xEX09VVCA6XG5cdFx0XHR0aWNrZXRTdGF0dXMgPSBfXyggJ3NvbGQgb3V0JywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBUSUNLRVRfU1RBVFVTX0lELkVYUElSRUQgOlxuXHRcdFx0dGlja2V0U3RhdHVzID0gX18oICdleHBpcmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBUSUNLRVRfU1RBVFVTX0lELlBFTkRJTkcgOlxuXHRcdFx0dGlja2V0U3RhdHVzID0gX18oICdwZW5kaW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBUSUNLRVRfU1RBVFVTX0lELk9OU0FMRSA6XG5cdFx0XHR0aWNrZXRTdGF0dXMgPSBfXyggJ29uIHNhbGUnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFRJQ0tFVF9TVEFUVVNfSUQuQVJDSElWRUQgOlxuXHRcdFx0dGlja2V0U3RhdHVzID0gX18oICdhcmNoaXZlZCcsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHR9XG5cdHJldHVybiB0aWNrZXRTdGF0dXM7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IFRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgQ1NTIGNsYXNzIGZvciB0aGUgYmFja2dyb3VuZCBjb2xvclxuICovXG5leHBvcnQgY29uc3QgZ2V0QmFja2dyb3VuZENvbG9yQ2xhc3MgPSAoIFRpY2tldEVudGl0eSApID0+IHtcblx0cmV0dXJuIGBlZS0keyBzdGF0dXNDb2xvckNsYXNzKCBUaWNrZXRFbnRpdHkgKSB9LWJhY2tncm91bmRgO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBUaWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gYm9yZGVyICdhbGwnLCAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J1xuICogQHJldHVybiB7c3RyaW5nfSAgICBDU1MgY2xhc3MgZm9yIHRoZSBiYWNrZ3JvdW5kIGNvbG9yXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCb3JkZXJDb2xvckNsYXNzID0gKCBUaWNrZXRFbnRpdHksIGJvcmRlciA9ICdhbGwnICkgPT4ge1xuXHRjb25zdCBjb2xvciA9IHN0YXR1c0NvbG9yQ2xhc3MoIFRpY2tldEVudGl0eSApO1xuXHRzd2l0Y2ggKCBib3JkZXIgKSB7XG5cdFx0Y2FzZSAnYWxsJzpcblx0XHRcdHJldHVybiBgZWUtJHsgY29sb3IgfS1ib3JkZXJgO1xuXHRcdGNhc2UgJ3RvcCc6XG5cdFx0XHRyZXR1cm4gYGVlLSR7IGNvbG9yIH0tYm9yZGVyLXRvcGA7XG5cdFx0Y2FzZSAncmlnaHQnOlxuXHRcdFx0cmV0dXJuIGBlZS0keyBjb2xvciB9LWJvcmRlci1yaWdodGA7XG5cdFx0Y2FzZSAnYm90dG9tJzpcblx0XHRcdHJldHVybiBgZWUtJHsgY29sb3IgfS1ib3JkZXItYm90dG9tYDtcblx0XHRjYXNlICdsZWZ0Jzpcblx0XHRcdHJldHVybiBgZWUtJHsgY29sb3IgfS1ib3JkZXItbGVmdGA7XG5cdH1cbn07XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhvdXRIb2xlczsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQ7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIGFzc2VydFRoaXNJbml0aWFsaXplZCA9IHJlcXVpcmUoXCIuL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiKTtcblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjsiLCJmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZjsiLCJ2YXIgYXJyYXlXaXRob3V0SG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhvdXRIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheVwiKTtcblxudmFyIG5vbkl0ZXJhYmxlU3ByZWFkID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVTcHJlYWRcIik7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdG9Db25zdW1hYmxlQXJyYXk7IiwiZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2YyKG9iaik7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZW1pemUoIGZuLCBvcHRpb25zICkge1xuXHR2YXIgc2l6ZSA9IDAsXG5cdFx0bWF4U2l6ZSwgaGVhZCwgdGFpbDtcblxuXHRpZiAoIG9wdGlvbnMgJiYgb3B0aW9ucy5tYXhTaXplICkge1xuXHRcdG1heFNpemUgPSBvcHRpb25zLm1heFNpemU7XG5cdH1cblxuXHRmdW5jdGlvbiBtZW1vaXplZCggLyogLi4uYXJncyAqLyApIHtcblx0XHR2YXIgbm9kZSA9IGhlYWQsXG5cdFx0XHRsZW4gPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdFx0YXJncywgaTtcblxuXHRcdHNlYXJjaENhY2hlOiB3aGlsZSAoIG5vZGUgKSB7XG5cdFx0XHQvLyBQZXJmb3JtIGEgc2hhbGxvdyBlcXVhbGl0eSB0ZXN0IHRvIGNvbmZpcm0gdGhhdCB3aGV0aGVyIHRoZSBub2RlXG5cdFx0XHQvLyB1bmRlciB0ZXN0IGlzIGEgY2FuZGlkYXRlIGZvciB0aGUgYXJndW1lbnRzIHBhc3NlZC4gVHdvIGFycmF5c1xuXHRcdFx0Ly8gYXJlIHNoYWxsb3dseSBlcXVhbCBpZiB0aGVpciBsZW5ndGggbWF0Y2hlcyBhbmQgZWFjaCBlbnRyeSBpc1xuXHRcdFx0Ly8gc3RyaWN0bHkgZXF1YWwgYmV0d2VlbiB0aGUgdHdvIHNldHMuIEF2b2lkIGFic3RyYWN0aW5nIHRvIGFcblx0XHRcdC8vIGZ1bmN0aW9uIHdoaWNoIGNvdWxkIGluY3VyIGFuIGFyZ3VtZW50cyBsZWFraW5nIGRlb3B0aW1pemF0aW9uLlxuXG5cdFx0XHQvLyBDaGVjayB3aGV0aGVyIG5vZGUgYXJndW1lbnRzIG1hdGNoIGFyZ3VtZW50cyBsZW5ndGhcblx0XHRcdGlmICggbm9kZS5hcmdzLmxlbmd0aCAhPT0gYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdFx0bm9kZSA9IG5vZGUubmV4dDtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENoZWNrIHdoZXRoZXIgbm9kZSBhcmd1bWVudHMgbWF0Y2ggYXJndW1lbnRzIHZhbHVlc1xuXHRcdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0aWYgKCBub2RlLmFyZ3NbIGkgXSAhPT0gYXJndW1lbnRzWyBpIF0gKSB7XG5cdFx0XHRcdFx0bm9kZSA9IG5vZGUubmV4dDtcblx0XHRcdFx0XHRjb250aW51ZSBzZWFyY2hDYWNoZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBBdCB0aGlzIHBvaW50IHdlIGNhbiBhc3N1bWUgd2UndmUgZm91bmQgYSBtYXRjaFxuXG5cdFx0XHQvLyBTdXJmYWNlIG1hdGNoZWQgbm9kZSB0byBoZWFkIGlmIG5vdCBhbHJlYWR5XG5cdFx0XHRpZiAoIG5vZGUgIT09IGhlYWQgKSB7XG5cdFx0XHRcdC8vIEFzIHRhaWwsIHNoaWZ0IHRvIHByZXZpb3VzLiBNdXN0IG9ubHkgc2hpZnQgaWYgbm90IGFsc29cblx0XHRcdFx0Ly8gaGVhZCwgc2luY2UgaWYgYm90aCBoZWFkIGFuZCB0YWlsLCB0aGVyZSBpcyBubyBwcmV2aW91cy5cblx0XHRcdFx0aWYgKCBub2RlID09PSB0YWlsICkge1xuXHRcdFx0XHRcdHRhaWwgPSBub2RlLnByZXY7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBZGp1c3Qgc2libGluZ3MgdG8gcG9pbnQgdG8gZWFjaCBvdGhlci4gSWYgbm9kZSB3YXMgdGFpbCxcblx0XHRcdFx0Ly8gdGhpcyBhbHNvIGhhbmRsZXMgbmV3IHRhaWwncyBlbXB0eSBgbmV4dGAgYXNzaWdubWVudC5cblx0XHRcdFx0bm9kZS5wcmV2Lm5leHQgPSBub2RlLm5leHQ7XG5cdFx0XHRcdGlmICggbm9kZS5uZXh0ICkge1xuXHRcdFx0XHRcdG5vZGUubmV4dC5wcmV2ID0gbm9kZS5wcmV2O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bm9kZS5uZXh0ID0gaGVhZDtcblx0XHRcdFx0bm9kZS5wcmV2ID0gbnVsbDtcblx0XHRcdFx0aGVhZC5wcmV2ID0gbm9kZTtcblx0XHRcdFx0aGVhZCA9IG5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJldHVybiBpbW1lZGlhdGVseVxuXHRcdFx0cmV0dXJuIG5vZGUudmFsO1xuXHRcdH1cblxuXHRcdC8vIE5vIGNhY2hlZCB2YWx1ZSBmb3VuZC4gQ29udGludWUgdG8gaW5zZXJ0aW9uIHBoYXNlOlxuXG5cdFx0Ly8gQ3JlYXRlIGEgY29weSBvZiBhcmd1bWVudHMgKGF2b2lkIGxlYWtpbmcgZGVvcHRpbWl6YXRpb24pXG5cdFx0YXJncyA9IG5ldyBBcnJheSggbGVuICk7XG5cdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdGFyZ3NbIGkgXSA9IGFyZ3VtZW50c1sgaSBdO1xuXHRcdH1cblxuXHRcdG5vZGUgPSB7XG5cdFx0XHRhcmdzOiBhcmdzLFxuXG5cdFx0XHQvLyBHZW5lcmF0ZSB0aGUgcmVzdWx0IGZyb20gb3JpZ2luYWwgZnVuY3Rpb25cblx0XHRcdHZhbDogZm4uYXBwbHkoIG51bGwsIGFyZ3MgKVxuXHRcdH07XG5cblx0XHQvLyBEb24ndCBuZWVkIHRvIGNoZWNrIHdoZXRoZXIgbm9kZSBpcyBhbHJlYWR5IGhlYWQsIHNpbmNlIGl0IHdvdWxkXG5cdFx0Ly8gaGF2ZSBiZWVuIHJldHVybmVkIGFib3ZlIGFscmVhZHkgaWYgaXQgd2FzXG5cblx0XHQvLyBTaGlmdCBleGlzdGluZyBoZWFkIGRvd24gbGlzdFxuXHRcdGlmICggaGVhZCApIHtcblx0XHRcdGhlYWQucHJldiA9IG5vZGU7XG5cdFx0XHRub2RlLm5leHQgPSBoZWFkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBJZiBubyBoZWFkLCBmb2xsb3dzIHRoYXQgdGhlcmUncyBubyB0YWlsIChhdCBpbml0aWFsIG9yIHJlc2V0KVxuXHRcdFx0dGFpbCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0Ly8gVHJpbSB0YWlsIGlmIHdlJ3JlIHJlYWNoZWQgbWF4IHNpemUgYW5kIGFyZSBwZW5kaW5nIGNhY2hlIGluc2VydGlvblxuXHRcdGlmICggc2l6ZSA9PT0gbWF4U2l6ZSApIHtcblx0XHRcdHRhaWwgPSB0YWlsLnByZXY7XG5cdFx0XHR0YWlsLm5leHQgPSBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzaXplKys7XG5cdFx0fVxuXG5cdFx0aGVhZCA9IG5vZGU7XG5cblx0XHRyZXR1cm4gbm9kZS52YWw7XG5cdH1cblxuXHRtZW1vaXplZC5jbGVhciA9IGZ1bmN0aW9uKCkge1xuXHRcdGhlYWQgPSBudWxsO1xuXHRcdHRhaWwgPSBudWxsO1xuXHRcdHNpemUgPSAwO1xuXHR9O1xuXG5cdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0JyApIHtcblx0XHQvLyBDYWNoZSBpcyBub3QgZXhwb3NlZCBpbiB0aGUgcHVibGljIEFQSSwgYnV0IHVzZWQgaW4gdGVzdHMgdG8gZW5zdXJlXG5cdFx0Ly8gZXhwZWN0ZWQgbGlzdCBwcm9ncmVzc2lvblxuXHRcdG1lbW9pemVkLmdldENhY2hlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gWyBoZWFkLCB0YWlsLCBzaXplIF07XG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBtZW1vaXplZDtcbn07XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKHJvb3QsIHBsdXJhbGl6ZSkge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAodHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gTm9kZS5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHBsdXJhbGl6ZSgpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRCwgcmVnaXN0ZXJzIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBwbHVyYWxpemUoKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbC5cbiAgICByb290LnBsdXJhbGl6ZSA9IHBsdXJhbGl6ZSgpO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gIC8vIFJ1bGUgc3RvcmFnZSAtIHBsdXJhbGl6ZSBhbmQgc2luZ3VsYXJpemUgbmVlZCB0byBiZSBydW4gc2VxdWVudGlhbGx5LFxuICAvLyB3aGlsZSBvdGhlciBydWxlcyBjYW4gYmUgb3B0aW1pemVkIHVzaW5nIGFuIG9iamVjdCBmb3IgaW5zdGFudCBsb29rdXBzLlxuICB2YXIgcGx1cmFsUnVsZXMgPSBbXTtcbiAgdmFyIHNpbmd1bGFyUnVsZXMgPSBbXTtcbiAgdmFyIHVuY291bnRhYmxlcyA9IHt9O1xuICB2YXIgaXJyZWd1bGFyUGx1cmFscyA9IHt9O1xuICB2YXIgaXJyZWd1bGFyU2luZ2xlcyA9IHt9O1xuXG4gIC8qKlxuICAgKiBTYW5pdGl6ZSBhIHBsdXJhbGl6YXRpb24gcnVsZSB0byBhIHVzYWJsZSByZWd1bGFyIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSAgeyhSZWdFeHB8c3RyaW5nKX0gcnVsZVxuICAgKiBAcmV0dXJuIHtSZWdFeHB9XG4gICAqL1xuICBmdW5jdGlvbiBzYW5pdGl6ZVJ1bGUgKHJ1bGUpIHtcbiAgICBpZiAodHlwZW9mIHJ1bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyBydWxlICsgJyQnLCAnaScpO1xuICAgIH1cblxuICAgIHJldHVybiBydWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3MgaW4gYSB3b3JkIHRva2VuIHRvIHByb2R1Y2UgYSBmdW5jdGlvbiB0aGF0IGNhbiByZXBsaWNhdGUgdGhlIGNhc2Ugb25cbiAgICogYW5vdGhlciB3b3JkLlxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgd29yZFxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdG9rZW5cbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiByZXN0b3JlQ2FzZSAod29yZCwgdG9rZW4pIHtcbiAgICAvLyBUb2tlbnMgYXJlIGFuIGV4YWN0IG1hdGNoLlxuICAgIGlmICh3b3JkID09PSB0b2tlbikgcmV0dXJuIHRva2VuO1xuXG4gICAgLy8gVXBwZXIgY2FzZWQgd29yZHMuIEUuZy4gXCJIRUxMT1wiLlxuICAgIGlmICh3b3JkID09PSB3b3JkLnRvVXBwZXJDYXNlKCkpIHJldHVybiB0b2tlbi50b1VwcGVyQ2FzZSgpO1xuXG4gICAgLy8gVGl0bGUgY2FzZWQgd29yZHMuIEUuZy4gXCJUaXRsZVwiLlxuICAgIGlmICh3b3JkWzBdID09PSB3b3JkWzBdLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiB0b2tlbi5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRva2VuLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIC8vIExvd2VyIGNhc2VkIHdvcmRzLiBFLmcuIFwidGVzdFwiLlxuICAgIHJldHVybiB0b2tlbi50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVycG9sYXRlIGEgcmVnZXhwIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAgICogQHBhcmFtICB7QXJyYXl9ICBhcmdzXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIGludGVycG9sYXRlIChzdHIsIGFyZ3MpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcJChcXGR7MSwyfSkvZywgZnVuY3Rpb24gKG1hdGNoLCBpbmRleCkge1xuICAgICAgcmV0dXJuIGFyZ3NbaW5kZXhdIHx8ICcnO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgYSB3b3JkIHVzaW5nIGEgcnVsZS5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSB3b3JkXG4gICAqIEBwYXJhbSAge0FycmF5fSAgcnVsZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlICh3b3JkLCBydWxlKSB7XG4gICAgcmV0dXJuIHdvcmQucmVwbGFjZShydWxlWzBdLCBmdW5jdGlvbiAobWF0Y2gsIGluZGV4KSB7XG4gICAgICB2YXIgcmVzdWx0ID0gaW50ZXJwb2xhdGUocnVsZVsxXSwgYXJndW1lbnRzKTtcblxuICAgICAgaWYgKG1hdGNoID09PSAnJykge1xuICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2Uod29yZFtpbmRleCAtIDFdLCByZXN1bHQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdG9yZUNhc2UobWF0Y2gsIHJlc3VsdCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2FuaXRpemUgYSB3b3JkIGJ5IHBhc3NpbmcgaW4gdGhlIHdvcmQgYW5kIHNhbml0aXphdGlvbiBydWxlcy5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIHRva2VuXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB3b3JkXG4gICAqIEBwYXJhbSAge0FycmF5fSAgICBydWxlc1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBzYW5pdGl6ZVdvcmQgKHRva2VuLCB3b3JkLCBydWxlcykge1xuICAgIC8vIEVtcHR5IHN0cmluZyBvciBkb2Vzbid0IG5lZWQgZml4aW5nLlxuICAgIGlmICghdG9rZW4ubGVuZ3RoIHx8IHVuY291bnRhYmxlcy5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgIHJldHVybiB3b3JkO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBydWxlcy5sZW5ndGg7XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIHNhbml0aXphdGlvbiBydWxlcyBhbmQgdXNlIHRoZSBmaXJzdCBvbmUgdG8gbWF0Y2guXG4gICAgd2hpbGUgKGxlbi0tKSB7XG4gICAgICB2YXIgcnVsZSA9IHJ1bGVzW2xlbl07XG5cbiAgICAgIGlmIChydWxlWzBdLnRlc3Qod29yZCkpIHJldHVybiByZXBsYWNlKHdvcmQsIHJ1bGUpO1xuICAgIH1cblxuICAgIHJldHVybiB3b3JkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgYSB3b3JkIHdpdGggdGhlIHVwZGF0ZWQgd29yZC5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIHJlcGxhY2VNYXBcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIGtlZXBNYXBcbiAgICogQHBhcmFtICB7QXJyYXl9ICAgIHJ1bGVzXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVdvcmQgKHJlcGxhY2VNYXAsIGtlZXBNYXAsIHJ1bGVzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgICAvLyBHZXQgdGhlIGNvcnJlY3QgdG9rZW4gYW5kIGNhc2UgcmVzdG9yYXRpb24gZnVuY3Rpb25zLlxuICAgICAgdmFyIHRva2VuID0gd29yZC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAvLyBDaGVjayBhZ2FpbnN0IHRoZSBrZWVwIG9iamVjdCBtYXAuXG4gICAgICBpZiAoa2VlcE1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKHdvcmQsIHRva2VuKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgYWdhaW5zdCB0aGUgcmVwbGFjZW1lbnQgbWFwIGZvciBhIGRpcmVjdCB3b3JkIHJlcGxhY2VtZW50LlxuICAgICAgaWYgKHJlcGxhY2VNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3JkLCByZXBsYWNlTWFwW3Rva2VuXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biBhbGwgdGhlIHJ1bGVzIGFnYWluc3QgdGhlIHdvcmQuXG4gICAgICByZXR1cm4gc2FuaXRpemVXb3JkKHRva2VuLCB3b3JkLCBydWxlcyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHdvcmQgaXMgcGFydCBvZiB0aGUgbWFwLlxuICAgKi9cbiAgZnVuY3Rpb24gY2hlY2tXb3JkIChyZXBsYWNlTWFwLCBrZWVwTWFwLCBydWxlcywgYm9vbCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAod29yZCkge1xuICAgICAgdmFyIHRva2VuID0gd29yZC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAoa2VlcE1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHJldHVybiB0cnVlO1xuICAgICAgaWYgKHJlcGxhY2VNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHJldHVybiBzYW5pdGl6ZVdvcmQodG9rZW4sIHRva2VuLCBydWxlcykgPT09IHRva2VuO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUGx1cmFsaXplIG9yIHNpbmd1bGFyaXplIGEgd29yZCBiYXNlZCBvbiB0aGUgcGFzc2VkIGluIGNvdW50LlxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICB3b3JkXG4gICAqIEBwYXJhbSAge251bWJlcn0gIGNvdW50XG4gICAqIEBwYXJhbSAge2Jvb2xlYW59IGluY2x1c2l2ZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBwbHVyYWxpemUgKHdvcmQsIGNvdW50LCBpbmNsdXNpdmUpIHtcbiAgICB2YXIgcGx1cmFsaXplZCA9IGNvdW50ID09PSAxXG4gICAgICA/IHBsdXJhbGl6ZS5zaW5ndWxhcih3b3JkKSA6IHBsdXJhbGl6ZS5wbHVyYWwod29yZCk7XG5cbiAgICByZXR1cm4gKGluY2x1c2l2ZSA/IGNvdW50ICsgJyAnIDogJycpICsgcGx1cmFsaXplZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQbHVyYWxpemUgYSB3b3JkLlxuICAgKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBwbHVyYWxpemUucGx1cmFsID0gcmVwbGFjZVdvcmQoXG4gICAgaXJyZWd1bGFyU2luZ2xlcywgaXJyZWd1bGFyUGx1cmFscywgcGx1cmFsUnVsZXNcbiAgKTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB3b3JkIGlzIHBsdXJhbC5cbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgcGx1cmFsaXplLmlzUGx1cmFsID0gY2hlY2tXb3JkKFxuICAgIGlycmVndWxhclNpbmdsZXMsIGlycmVndWxhclBsdXJhbHMsIHBsdXJhbFJ1bGVzXG4gICk7XG5cbiAgLyoqXG4gICAqIFNpbmd1bGFyaXplIGEgd29yZC5cbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgcGx1cmFsaXplLnNpbmd1bGFyID0gcmVwbGFjZVdvcmQoXG4gICAgaXJyZWd1bGFyUGx1cmFscywgaXJyZWd1bGFyU2luZ2xlcywgc2luZ3VsYXJSdWxlc1xuICApO1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHdvcmQgaXMgc2luZ3VsYXIuXG4gICAqXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIHBsdXJhbGl6ZS5pc1Npbmd1bGFyID0gY2hlY2tXb3JkKFxuICAgIGlycmVndWxhclBsdXJhbHMsIGlycmVndWxhclNpbmdsZXMsIHNpbmd1bGFyUnVsZXNcbiAgKTtcblxuICAvKipcbiAgICogQWRkIGEgcGx1cmFsaXphdGlvbiBydWxlIHRvIHRoZSBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwKX0gcnVsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgcmVwbGFjZW1lbnRcbiAgICovXG4gIHBsdXJhbGl6ZS5hZGRQbHVyYWxSdWxlID0gZnVuY3Rpb24gKHJ1bGUsIHJlcGxhY2VtZW50KSB7XG4gICAgcGx1cmFsUnVsZXMucHVzaChbc2FuaXRpemVSdWxlKHJ1bGUpLCByZXBsYWNlbWVudF0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYSBzaW5ndWxhcml6YXRpb24gcnVsZSB0byB0aGUgY29sbGVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cCl9IHJ1bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgIHJlcGxhY2VtZW50XG4gICAqL1xuICBwbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlID0gZnVuY3Rpb24gKHJ1bGUsIHJlcGxhY2VtZW50KSB7XG4gICAgc2luZ3VsYXJSdWxlcy5wdXNoKFtzYW5pdGl6ZVJ1bGUocnVsZSksIHJlcGxhY2VtZW50XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBhbiB1bmNvdW50YWJsZSB3b3JkIHJ1bGUuXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHApfSB3b3JkXG4gICAqL1xuICBwbHVyYWxpemUuYWRkVW5jb3VudGFibGVSdWxlID0gZnVuY3Rpb24gKHdvcmQpIHtcbiAgICBpZiAodHlwZW9mIHdvcmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB1bmNvdW50YWJsZXNbd29yZC50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU2V0IHNpbmd1bGFyIGFuZCBwbHVyYWwgcmVmZXJlbmNlcyBmb3IgdGhlIHdvcmQuXG4gICAgcGx1cmFsaXplLmFkZFBsdXJhbFJ1bGUod29yZCwgJyQwJyk7XG4gICAgcGx1cmFsaXplLmFkZFNpbmd1bGFyUnVsZSh3b3JkLCAnJDAnKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGFuIGlycmVndWxhciB3b3JkIGRlZmluaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzaW5nbGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBsdXJhbFxuICAgKi9cbiAgcGx1cmFsaXplLmFkZElycmVndWxhclJ1bGUgPSBmdW5jdGlvbiAoc2luZ2xlLCBwbHVyYWwpIHtcbiAgICBwbHVyYWwgPSBwbHVyYWwudG9Mb3dlckNhc2UoKTtcbiAgICBzaW5nbGUgPSBzaW5nbGUudG9Mb3dlckNhc2UoKTtcblxuICAgIGlycmVndWxhclNpbmdsZXNbc2luZ2xlXSA9IHBsdXJhbDtcbiAgICBpcnJlZ3VsYXJQbHVyYWxzW3BsdXJhbF0gPSBzaW5nbGU7XG4gIH07XG5cbiAgLyoqXG4gICAqIElycmVndWxhciBydWxlcy5cbiAgICovXG4gIFtcbiAgICAvLyBQcm9ub3Vucy5cbiAgICBbJ0knLCAnd2UnXSxcbiAgICBbJ21lJywgJ3VzJ10sXG4gICAgWydoZScsICd0aGV5J10sXG4gICAgWydzaGUnLCAndGhleSddLFxuICAgIFsndGhlbScsICd0aGVtJ10sXG4gICAgWydteXNlbGYnLCAnb3Vyc2VsdmVzJ10sXG4gICAgWyd5b3Vyc2VsZicsICd5b3Vyc2VsdmVzJ10sXG4gICAgWydpdHNlbGYnLCAndGhlbXNlbHZlcyddLFxuICAgIFsnaGVyc2VsZicsICd0aGVtc2VsdmVzJ10sXG4gICAgWydoaW1zZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgICBbJ3RoZW1zZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgICBbJ2lzJywgJ2FyZSddLFxuICAgIFsnd2FzJywgJ3dlcmUnXSxcbiAgICBbJ2hhcycsICdoYXZlJ10sXG4gICAgWyd0aGlzJywgJ3RoZXNlJ10sXG4gICAgWyd0aGF0JywgJ3Rob3NlJ10sXG4gICAgLy8gV29yZHMgZW5kaW5nIGluIHdpdGggYSBjb25zb25hbnQgYW5kIGBvYC5cbiAgICBbJ2VjaG8nLCAnZWNob2VzJ10sXG4gICAgWydkaW5nbycsICdkaW5nb2VzJ10sXG4gICAgWyd2b2xjYW5vJywgJ3ZvbGNhbm9lcyddLFxuICAgIFsndG9ybmFkbycsICd0b3JuYWRvZXMnXSxcbiAgICBbJ3RvcnBlZG8nLCAndG9ycGVkb2VzJ10sXG4gICAgLy8gRW5kcyB3aXRoIGB1c2AuXG4gICAgWydnZW51cycsICdnZW5lcmEnXSxcbiAgICBbJ3Zpc2N1cycsICd2aXNjZXJhJ10sXG4gICAgLy8gRW5kcyB3aXRoIGBtYWAuXG4gICAgWydzdGlnbWEnLCAnc3RpZ21hdGEnXSxcbiAgICBbJ3N0b21hJywgJ3N0b21hdGEnXSxcbiAgICBbJ2RvZ21hJywgJ2RvZ21hdGEnXSxcbiAgICBbJ2xlbW1hJywgJ2xlbW1hdGEnXSxcbiAgICBbJ3NjaGVtYScsICdzY2hlbWF0YSddLFxuICAgIFsnYW5hdGhlbWEnLCAnYW5hdGhlbWF0YSddLFxuICAgIC8vIE90aGVyIGlycmVndWxhciBydWxlcy5cbiAgICBbJ294JywgJ294ZW4nXSxcbiAgICBbJ2F4ZScsICdheGVzJ10sXG4gICAgWydkaWUnLCAnZGljZSddLFxuICAgIFsneWVzJywgJ3llc2VzJ10sXG4gICAgWydmb290JywgJ2ZlZXQnXSxcbiAgICBbJ2VhdmUnLCAnZWF2ZXMnXSxcbiAgICBbJ2dvb3NlJywgJ2dlZXNlJ10sXG4gICAgWyd0b290aCcsICd0ZWV0aCddLFxuICAgIFsncXVpeicsICdxdWl6emVzJ10sXG4gICAgWydodW1hbicsICdodW1hbnMnXSxcbiAgICBbJ3Byb29mJywgJ3Byb29mcyddLFxuICAgIFsnY2FydmUnLCAnY2FydmVzJ10sXG4gICAgWyd2YWx2ZScsICd2YWx2ZXMnXSxcbiAgICBbJ2xvb2V5JywgJ2xvb2llcyddLFxuICAgIFsndGhpZWYnLCAndGhpZXZlcyddLFxuICAgIFsnZ3Jvb3ZlJywgJ2dyb292ZXMnXSxcbiAgICBbJ3BpY2theGUnLCAncGlja2F4ZXMnXSxcbiAgICBbJ3doaXNrZXknLCAnd2hpc2tpZXMnXVxuICBdLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICByZXR1cm4gcGx1cmFsaXplLmFkZElycmVndWxhclJ1bGUocnVsZVswXSwgcnVsZVsxXSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBQbHVyYWxpemF0aW9uIHJ1bGVzLlxuICAgKi9cbiAgW1xuICAgIFsvcz8kL2ksICdzJ10sXG4gICAgWy9bXlxcdTAwMDAtXFx1MDA3Rl0kL2ksICckMCddLFxuICAgIFsvKFteYWVpb3VdZXNlKSQvaSwgJyQxJ10sXG4gICAgWy8oYXh8dGVzdClpcyQvaSwgJyQxZXMnXSxcbiAgICBbLyhhbGlhc3xbXmFvdV11c3x0bGFzfGdhc3xyaXMpJC9pLCAnJDFlcyddLFxuICAgIFsvKGVbbW5ddSlzPyQvaSwgJyQxcyddLFxuICAgIFsvKFtebF1pYXN8W2FlaW91XWxhc3xbZW1qenJdYXN8W2l1XWFtKSQvaSwgJyQxJ10sXG4gICAgWy8oYWx1bW58c3lsbGFifG9jdG9wfHZpcnxyYWRpfG51Y2xlfGZ1bmd8Y2FjdHxzdGltdWx8dGVybWlufGJhY2lsbHxmb2N8dXRlcnxsb2N8c3RyYXQpKD86dXN8aSkkL2ksICckMWknXSxcbiAgICBbLyhhbHVtbnxhbGd8dmVydGVicikoPzphfGFlKSQvaSwgJyQxYWUnXSxcbiAgICBbLyhzZXJhcGh8Y2hlcnViKSg/OmltKT8kL2ksICckMWltJ10sXG4gICAgWy8oaGVyfGF0fGdyKW8kL2ksICckMW9lcyddLFxuICAgIFsvKGFnZW5kfGFkZGVuZHxtaWxsZW5uaXxkYXR8ZXh0cmVtfGJhY3Rlcml8ZGVzaWRlcmF0fHN0cmF0fGNhbmRlbGFicnxlcnJhdHxvdnxzeW1wb3NpfGN1cnJpY3VsfGF1dG9tYXR8cXVvcikoPzphfHVtKSQvaSwgJyQxYSddLFxuICAgIFsvKGFwaGVsaXxoeXBlcmJhdHxwZXJpaGVsaXxhc3luZGV0fG5vdW1lbnxwaGVub21lbnxjcml0ZXJpfG9yZ2FufHByb2xlZ29tZW58aGVkcnxhdXRvbWF0KSg/OmF8b24pJC9pLCAnJDFhJ10sXG4gICAgWy9zaXMkL2ksICdzZXMnXSxcbiAgICBbLyg/Oihrbml8d2l8bGkpZmV8KGFyfGx8ZWF8ZW98b2F8aG9vKWYpJC9pLCAnJDEkMnZlcyddLFxuICAgIFsvKFteYWVpb3V5XXxxdSl5JC9pLCAnJDFpZXMnXSxcbiAgICBbLyhbXmNoXVtpZW9dW2xuXSlleSQvaSwgJyQxaWVzJ10sXG4gICAgWy8oeHxjaHxzc3xzaHx6eikkL2ksICckMWVzJ10sXG4gICAgWy8obWF0cnxjb2R8bXVyfHNpbHx2ZXJ0fGluZHxhcHBlbmQpKD86aXh8ZXgpJC9pLCAnJDFpY2VzJ10sXG4gICAgWy8obXxsKSg/OmljZXxvdXNlKSQvaSwgJyQxaWNlJ10sXG4gICAgWy8ocGUpKD86cnNvbnxvcGxlKSQvaSwgJyQxb3BsZSddLFxuICAgIFsvKGNoaWxkKSg/OnJlbik/JC9pLCAnJDFyZW4nXSxcbiAgICBbL2VhdXgkL2ksICckMCddLFxuICAgIFsvbVthZV1uJC9pLCAnbWVuJ10sXG4gICAgWyd0aG91JywgJ3lvdSddXG4gIF0uZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgIHJldHVybiBwbHVyYWxpemUuYWRkUGx1cmFsUnVsZShydWxlWzBdLCBydWxlWzFdKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFNpbmd1bGFyaXphdGlvbiBydWxlcy5cbiAgICovXG4gIFtcbiAgICBbL3MkL2ksICcnXSxcbiAgICBbLyhzcykkL2ksICckMSddLFxuICAgIFsvKHdpfGtuaXwoPzphZnRlcnxoYWxmfGhpZ2h8bG93fG1pZHxub258bmlnaHR8W15cXHddfF4pbGkpdmVzJC9pLCAnJDFmZSddLFxuICAgIFsvKGFyfCg/OndvfFthZV0pbHxbZW9dW2FvXSl2ZXMkL2ksICckMWYnXSxcbiAgICBbL2llcyQvaSwgJ3knXSxcbiAgICBbL1xcYihbcGxdfHpvbWJ8KD86bmVja3xjcm9zcyk/dHxjb2xsfGZhZXJ8Zm9vZHxnZW58Z29vbnxncm91cHxsYXNzfHRhbGt8Z29hbHxjdXQpaWVzJC9pLCAnJDFpZSddLFxuICAgIFsvXFxiKG1vbnxzbWlsKWllcyQvaSwgJyQxZXknXSxcbiAgICBbLyhtfGwpaWNlJC9pLCAnJDFvdXNlJ10sXG4gICAgWy8oc2VyYXBofGNoZXJ1YilpbSQvaSwgJyQxJ10sXG4gICAgWy8oeHxjaHxzc3xzaHx6enx0dG98Z298Y2hvfGFsaWFzfFteYW91XXVzfHRsYXN8Z2FzfCg/OmhlcnxhdHxncilvfHJpcykoPzplcyk/JC9pLCAnJDEnXSxcbiAgICBbLyhhbmFseXxiYXxkaWFnbm98cGFyZW50aGV8cHJvZ25vfHN5bm9wfHRoZXxlbXBoYXxjcmkpKD86c2lzfHNlcykkL2ksICckMXNpcyddLFxuICAgIFsvKG1vdmllfHR3ZWx2ZXxhYnVzZXxlW21uXXUpcyQvaSwgJyQxJ10sXG4gICAgWy8odGVzdCkoPzppc3xlcykkL2ksICckMWlzJ10sXG4gICAgWy8oYWx1bW58c3lsbGFifG9jdG9wfHZpcnxyYWRpfG51Y2xlfGZ1bmd8Y2FjdHxzdGltdWx8dGVybWlufGJhY2lsbHxmb2N8dXRlcnxsb2N8c3RyYXQpKD86dXN8aSkkL2ksICckMXVzJ10sXG4gICAgWy8oYWdlbmR8YWRkZW5kfG1pbGxlbm5pfGRhdHxleHRyZW18YmFjdGVyaXxkZXNpZGVyYXR8c3RyYXR8Y2FuZGVsYWJyfGVycmF0fG92fHN5bXBvc2l8Y3VycmljdWx8cXVvcilhJC9pLCAnJDF1bSddLFxuICAgIFsvKGFwaGVsaXxoeXBlcmJhdHxwZXJpaGVsaXxhc3luZGV0fG5vdW1lbnxwaGVub21lbnxjcml0ZXJpfG9yZ2FufHByb2xlZ29tZW58aGVkcnxhdXRvbWF0KWEkL2ksICckMW9uJ10sXG4gICAgWy8oYWx1bW58YWxnfHZlcnRlYnIpYWUkL2ksICckMWEnXSxcbiAgICBbLyhjb2R8bXVyfHNpbHx2ZXJ0fGluZClpY2VzJC9pLCAnJDFleCddLFxuICAgIFsvKG1hdHJ8YXBwZW5kKWljZXMkL2ksICckMWl4J10sXG4gICAgWy8ocGUpKHJzb258b3BsZSkkL2ksICckMXJzb24nXSxcbiAgICBbLyhjaGlsZClyZW4kL2ksICckMSddLFxuICAgIFsvKGVhdSl4PyQvaSwgJyQxJ10sXG4gICAgWy9tZW4kL2ksICdtYW4nXVxuICBdLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICByZXR1cm4gcGx1cmFsaXplLmFkZFNpbmd1bGFyUnVsZShydWxlWzBdLCBydWxlWzFdKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFVuY291bnRhYmxlIHJ1bGVzLlxuICAgKi9cbiAgW1xuICAgIC8vIFNpbmd1bGFyIHdvcmRzIHdpdGggbm8gcGx1cmFscy5cbiAgICAnYWR1bHRob29kJyxcbiAgICAnYWR2aWNlJyxcbiAgICAnYWdlbmRhJyxcbiAgICAnYWlkJyxcbiAgICAnYWxjb2hvbCcsXG4gICAgJ2FtbW8nLFxuICAgICdhbmltZScsXG4gICAgJ2F0aGxldGljcycsXG4gICAgJ2F1ZGlvJyxcbiAgICAnYmlzb24nLFxuICAgICdibG9vZCcsXG4gICAgJ2JyZWFtJyxcbiAgICAnYnVmZmFsbycsXG4gICAgJ2J1dHRlcicsXG4gICAgJ2NhcnAnLFxuICAgICdjYXNoJyxcbiAgICAnY2hhc3NpcycsXG4gICAgJ2NoZXNzJyxcbiAgICAnY2xvdGhpbmcnLFxuICAgICdjb2QnLFxuICAgICdjb21tZXJjZScsXG4gICAgJ2Nvb3BlcmF0aW9uJyxcbiAgICAnY29ycHMnLFxuICAgICdkZWJyaXMnLFxuICAgICdkaWFiZXRlcycsXG4gICAgJ2RpZ2VzdGlvbicsXG4gICAgJ2VsaycsXG4gICAgJ2VuZXJneScsXG4gICAgJ2VxdWlwbWVudCcsXG4gICAgJ2V4Y3JldGlvbicsXG4gICAgJ2V4cGVydGlzZScsXG4gICAgJ2Zsb3VuZGVyJyxcbiAgICAnZnVuJyxcbiAgICAnZ2FsbG93cycsXG4gICAgJ2dhcmJhZ2UnLFxuICAgICdncmFmZml0aScsXG4gICAgJ2hlYWRxdWFydGVycycsXG4gICAgJ2hlYWx0aCcsXG4gICAgJ2hlcnBlcycsXG4gICAgJ2hpZ2hqaW5rcycsXG4gICAgJ2hvbWV3b3JrJyxcbiAgICAnaG91c2V3b3JrJyxcbiAgICAnaW5mb3JtYXRpb24nLFxuICAgICdqZWFucycsXG4gICAgJ2p1c3RpY2UnLFxuICAgICdrdWRvcycsXG4gICAgJ2xhYm91cicsXG4gICAgJ2xpdGVyYXR1cmUnLFxuICAgICdtYWNoaW5lcnknLFxuICAgICdtYWNrZXJlbCcsXG4gICAgJ21haWwnLFxuICAgICdtZWRpYScsXG4gICAgJ21ld3MnLFxuICAgICdtb29zZScsXG4gICAgJ211c2ljJyxcbiAgICAnbWFuZ2EnLFxuICAgICduZXdzJyxcbiAgICAncGlrZScsXG4gICAgJ3BsYW5rdG9uJyxcbiAgICAncGxpZXJzJyxcbiAgICAncG9sbHV0aW9uJyxcbiAgICAncHJlbWlzZXMnLFxuICAgICdyYWluJyxcbiAgICAncmVzZWFyY2gnLFxuICAgICdyaWNlJyxcbiAgICAnc2FsbW9uJyxcbiAgICAnc2Npc3NvcnMnLFxuICAgICdzZXJpZXMnLFxuICAgICdzZXdhZ2UnLFxuICAgICdzaGFtYmxlcycsXG4gICAgJ3NocmltcCcsXG4gICAgJ3NwZWNpZXMnLFxuICAgICdzdGFmZicsXG4gICAgJ3N3aW5lJyxcbiAgICAndGVubmlzJyxcbiAgICAndHJhZmZpYycsXG4gICAgJ3RyYW5zcG9yYXRpb24nLFxuICAgICd0cm91dCcsXG4gICAgJ3R1bmEnLFxuICAgICd3ZWFsdGgnLFxuICAgICd3ZWxmYXJlJyxcbiAgICAnd2hpdGluZycsXG4gICAgJ3dpbGRlYmVlc3QnLFxuICAgICd3aWxkbGlmZScsXG4gICAgJ3lvdScsXG4gICAgLy8gUmVnZXhlcy5cbiAgICAvW15hZWlvdV1lc2UkL2ksIC8vIFwiY2hpbmVzZVwiLCBcImphcGFuZXNlXCJcbiAgICAvZGVlciQvaSwgLy8gXCJkZWVyXCIsIFwicmVpbmRlZXJcIlxuICAgIC9maXNoJC9pLCAvLyBcImZpc2hcIiwgXCJibG93ZmlzaFwiLCBcImFuZ2VsZmlzaFwiXG4gICAgL21lYXNsZXMkL2ksXG4gICAgL29baXVdcyQvaSwgLy8gXCJjYXJuaXZvcm91c1wiXG4gICAgL3BveCQvaSwgLy8gXCJjaGlja3BveFwiLCBcInNtYWxscG94XCJcbiAgICAvc2hlZXAkL2lcbiAgXS5mb3JFYWNoKHBsdXJhbGl6ZS5hZGRVbmNvdW50YWJsZVJ1bGUpO1xuXG4gIHJldHVybiBwbHVyYWxpemU7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB2YXIgaGFzID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuXG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmIChoYXModHlwZVNwZWNzLCB0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBlcnIgPSBFcnJvcihcbiAgICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiAnICsgbG9jYXRpb24gKyAnIHR5cGUgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyAnICtcbiAgICAgICAgICAgICAgJ2l0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAnICsgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICsgJ2AuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yICYmICEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAnICtcbiAgICAgICAgICAgIGxvY2F0aW9uICsgJyBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJyArIHR5cGVvZiBlcnJvciArICcuICcgK1xuICAgICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArXG4gICAgICAgICAgICAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnRmFpbGVkICcgKyBsb2NhdGlvbiArICcgdHlwZTogJyArIGVycm9yLm1lc3NhZ2UgKyAoc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlc2V0cyB3YXJuaW5nIGNhY2hlIHdoZW4gdGVzdGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jaGVja1Byb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxudmFyIGhhcyA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuZnVuY3Rpb24gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBlbGVtZW50VHlwZTogY3JlYXRlRWxlbWVudFR5cGVUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgJ1VzZSBgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKClgIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAgICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICAgICAgICApO1xuICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgcHJvcCBvbiBgJyArIGNvbXBvbmVudE5hbWUgICsgJ2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlVHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFSZWFjdElzLmlzVmFsaWRFbGVtZW50VHlwZShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudCB0eXBlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnRzIHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBhcnJheSwgZ290ICcgKyBhcmd1bWVudHMubGVuZ3RoICsgJyBhcmd1bWVudHMuICcgK1xuICAgICAgICAgICAgJ0EgY29tbW9uIG1pc3Rha2UgaXMgdG8gd3JpdGUgb25lT2YoeCwgeSwgeikgaW5zdGVhZCBvZiBvbmVPZihbeCwgeSwgel0pLidcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gYXJyYXkuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzLCBmdW5jdGlvbiByZXBsYWNlcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBTdHJpbmcocHJvcFZhbHVlKSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAoaGFzKHByb3BWYWx1ZSwga2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJyArIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSArICcgYXQgaW5kZXggJyArIGkgKyAnLidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGZhbHN5IHZhbHVlIGNhbid0IGJlIGEgU3ltYm9sXG4gICAgaWYgKCFwcm9wVmFsdWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICAgIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbiAgZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gICAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbiAgLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG4gIGZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBwcm9wVmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJyArIHByb3BWYWx1ZTtcbiAgICB9XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgaXMgcG9zdGZpeGVkIHRvIGEgd2FybmluZyBhYm91dCBhbiBpbnZhbGlkIHR5cGUuXG4gIC8vIEZvciBleGFtcGxlLCBcInVuZGVmaW5lZFwiIG9yIFwib2YgdHlwZSBhcnJheVwiXG4gIGZ1bmN0aW9uIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuICdhbiAnICsgdHlwZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdyZWdleHAnOlxuICAgICAgICByZXR1cm4gJ2EgJyArIHR5cGU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuICBmdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gICAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICByZXR1cm4gQU5PTllNT1VTO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGNoZWNrUHJvcFR5cGVzO1xuICBSZWFjdFByb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGNoZWNrUHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG5cbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgZGV2ZWxvcG1lbnQgYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgdmFyIHRocm93T25EaXJlY3RBY2Nlc3MgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKShSZWFjdElzLmlzRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59IGVsc2Uge1xuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBwcm9kdWN0aW9uIGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMnKSgpO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7XG4iLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjguNlxuICogcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cblxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIChmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50LWxpa2UgdHlwZXMuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cbnZhciBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3I7XG5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG52YXIgUkVBQ1RfUE9SVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wb3J0YWwnKSA6IDB4ZWFjYTtcbnZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcbnZhciBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3RyaWN0X21vZGUnKSA6IDB4ZWFjYztcbnZhciBSRUFDVF9QUk9GSUxFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvZmlsZXInKSA6IDB4ZWFkMjtcbnZhciBSRUFDVF9QUk9WSURFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKSA6IDB4ZWFjZDtcbnZhciBSRUFDVF9DT05URVhUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb250ZXh0JykgOiAweGVhY2U7XG52YXIgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuYXN5bmNfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29uY3VycmVudF9tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJykgOiAweGVhZDA7XG52YXIgUkVBQ1RfU1VTUEVOU0VfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlJykgOiAweGVhZDE7XG52YXIgUkVBQ1RfTUVNT19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubWVtbycpIDogMHhlYWQzO1xudmFyIFJFQUNUX0xBWllfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmxhenknKSA6IDB4ZWFkNDtcblxuZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAvLyBOb3RlOiBpdHMgdHlwZW9mIG1pZ2h0IGJlIG90aGVyIHRoYW4gJ3N5bWJvbCcgb3IgJ251bWJlcicgaWYgaXQncyBhIHBvbHlmaWxsLlxuICB0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9UWVBFIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUpO1xufVxuXG4vKipcbiAqIEZvcmtlZCBmcm9tIGZianMvd2FybmluZzpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mYmpzL2Jsb2IvZTY2YmEyMGFkNWJlNDMzZWI1NDQyM2YyYjA5N2Q4MjkzMjRkOWRlNi9wYWNrYWdlcy9mYmpzL3NyYy9fX2ZvcmtzX18vd2FybmluZy5qc1xuICpcbiAqIE9ubHkgY2hhbmdlIGlzIHdlIHVzZSBjb25zb2xlLndhcm4gaW5zdGVhZCBvZiBjb25zb2xlLmVycm9yLFxuICogYW5kIGRvIG5vdGhpbmcgd2hlbiAnY29uc29sZScgaXMgbm90IHN1cHBvcnRlZC5cbiAqIFRoaXMgcmVhbGx5IHNpbXBsaWZpZXMgdGhlIGNvZGUuXG4gKiAtLS1cbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgbG93UHJpb3JpdHlXYXJuaW5nID0gZnVuY3Rpb24gKCkge307XG5cbntcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG5cbiAgbG93UHJpb3JpdHlXYXJuaW5nID0gZnVuY3Rpb24gKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bsb3dQcmlvcml0eVdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgbG93UHJpb3JpdHlXYXJuaW5nJDEgPSBsb3dQcmlvcml0eVdhcm5pbmc7XG5cbmZ1bmN0aW9uIHR5cGVPZihvYmplY3QpIHtcbiAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCkge1xuICAgIHZhciAkJHR5cGVvZiA9IG9iamVjdC4kJHR5cGVvZjtcbiAgICBzd2l0Y2ggKCQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0VMRU1FTlRfVFlQRTpcbiAgICAgICAgdmFyIHR5cGUgPSBvYmplY3QudHlwZTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX0FTWU5DX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgJCR0eXBlb2ZUeXBlID0gdHlwZSAmJiB0eXBlLiQkdHlwZW9mO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKCQkdHlwZW9mVHlwZSkge1xuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX1BST1ZJREVSX1RZUEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mVHlwZTtcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLy8gQXN5bmNNb2RlIGlzIGRlcHJlY2F0ZWQgYWxvbmcgd2l0aCBpc0FzeW5jTW9kZVxudmFyIEFzeW5jTW9kZSA9IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbnZhciBDb25jdXJyZW50TW9kZSA9IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFO1xudmFyIENvbnRleHRDb25zdW1lciA9IFJFQUNUX0NPTlRFWFRfVFlQRTtcbnZhciBDb250ZXh0UHJvdmlkZXIgPSBSRUFDVF9QUk9WSURFUl9UWVBFO1xudmFyIEVsZW1lbnQgPSBSRUFDVF9FTEVNRU5UX1RZUEU7XG52YXIgRm9yd2FyZFJlZiA9IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG52YXIgRnJhZ21lbnQgPSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xudmFyIExhenkgPSBSRUFDVF9MQVpZX1RZUEU7XG52YXIgTWVtbyA9IFJFQUNUX01FTU9fVFlQRTtcbnZhciBQb3J0YWwgPSBSRUFDVF9QT1JUQUxfVFlQRTtcbnZhciBQcm9maWxlciA9IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG52YXIgU3RyaWN0TW9kZSA9IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG52YXIgU3VzcGVuc2UgPSBSRUFDVF9TVVNQRU5TRV9UWVBFO1xuXG52YXIgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSBmYWxzZTtcblxuLy8gQXN5bmNNb2RlIHNob3VsZCBiZSBkZXByZWNhdGVkXG5mdW5jdGlvbiBpc0FzeW5jTW9kZShvYmplY3QpIHtcbiAge1xuICAgIGlmICghaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUpIHtcbiAgICAgIGhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlID0gdHJ1ZTtcbiAgICAgIGxvd1ByaW9yaXR5V2FybmluZyQxKGZhbHNlLCAnVGhlIFJlYWN0SXMuaXNBc3luY01vZGUoKSBhbGlhcyBoYXMgYmVlbiBkZXByZWNhdGVkLCAnICsgJ2FuZCB3aWxsIGJlIHJlbW92ZWQgaW4gUmVhY3QgMTcrLiBVcGRhdGUgeW91ciBjb2RlIHRvIHVzZSAnICsgJ1JlYWN0SXMuaXNDb25jdXJyZW50TW9kZSgpIGluc3RlYWQuIEl0IGhhcyB0aGUgZXhhY3Qgc2FtZSBBUEkuJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkgfHwgdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRDb25zdW1lcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05URVhUX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRQcm92aWRlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9WSURFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNGb3J3YXJkUmVmKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZyYWdtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0xhenkob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTEFaWV9UWVBFO1xufVxuZnVuY3Rpb24gaXNNZW1vKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX01FTU9fVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUG9ydGFsKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BPUlRBTF9UWVBFO1xufVxuZnVuY3Rpb24gaXNQcm9maWxlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdHJpY3RNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N1c3BlbnNlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG59XG5cbmV4cG9ydHMudHlwZU9mID0gdHlwZU9mO1xuZXhwb3J0cy5Bc3luY01vZGUgPSBBc3luY01vZGU7XG5leHBvcnRzLkNvbmN1cnJlbnRNb2RlID0gQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLkNvbnRleHRDb25zdW1lciA9IENvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuQ29udGV4dFByb3ZpZGVyID0gQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5FbGVtZW50ID0gRWxlbWVudDtcbmV4cG9ydHMuRm9yd2FyZFJlZiA9IEZvcndhcmRSZWY7XG5leHBvcnRzLkZyYWdtZW50ID0gRnJhZ21lbnQ7XG5leHBvcnRzLkxhenkgPSBMYXp5O1xuZXhwb3J0cy5NZW1vID0gTWVtbztcbmV4cG9ydHMuUG9ydGFsID0gUG9ydGFsO1xuZXhwb3J0cy5Qcm9maWxlciA9IFByb2ZpbGVyO1xuZXhwb3J0cy5TdHJpY3RNb2RlID0gU3RyaWN0TW9kZTtcbmV4cG9ydHMuU3VzcGVuc2UgPSBTdXNwZW5zZTtcbmV4cG9ydHMuaXNWYWxpZEVsZW1lbnRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlO1xuZXhwb3J0cy5pc0FzeW5jTW9kZSA9IGlzQXN5bmNNb2RlO1xuZXhwb3J0cy5pc0NvbmN1cnJlbnRNb2RlID0gaXNDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuaXNDb250ZXh0Q29uc3VtZXIgPSBpc0NvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuaXNDb250ZXh0UHJvdmlkZXIgPSBpc0NvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuaXNFbGVtZW50ID0gaXNFbGVtZW50O1xuZXhwb3J0cy5pc0ZvcndhcmRSZWYgPSBpc0ZvcndhcmRSZWY7XG5leHBvcnRzLmlzRnJhZ21lbnQgPSBpc0ZyYWdtZW50O1xuZXhwb3J0cy5pc0xhenkgPSBpc0xhenk7XG5leHBvcnRzLmlzTWVtbyA9IGlzTWVtbztcbmV4cG9ydHMuaXNQb3J0YWwgPSBpc1BvcnRhbDtcbmV4cG9ydHMuaXNQcm9maWxlciA9IGlzUHJvZmlsZXI7XG5leHBvcnRzLmlzU3RyaWN0TW9kZSA9IGlzU3RyaWN0TW9kZTtcbmV4cG9ydHMuaXNTdXNwZW5zZSA9IGlzU3VzcGVuc2U7XG4gIH0pKCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZWVqczsiLCJtb2R1bGUuZXhwb3J0cyA9IGVlanMuaGVscGVyczsiLCJtb2R1bGUuZXhwb3J0cyA9IGVlanMuaTE4bjsiLCJtb2R1bGUuZXhwb3J0cyA9IGVlanMudmFsaWRhdG9yczsiLCJtb2R1bGUuZXhwb3J0cyA9IGVlanMudmFsdWVPYmplY3RzOyIsIm1vZHVsZS5leHBvcnRzID0gd3AuaG9va3M7IiwibW9kdWxlLmV4cG9ydHMgPSBlZWpzLnZlbmRvci5jdWlkOyIsIm1vZHVsZS5leHBvcnRzID0gbG9kYXNoOyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy52ZW5kb3IubW9tZW50OyJdLCJzb3VyY2VSb290IjoiIn0=
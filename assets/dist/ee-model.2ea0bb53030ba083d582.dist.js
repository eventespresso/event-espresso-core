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
/*! exports provided: MODEL_NAME, DATETIME_STATUS_ID, DATETIME_STATUS_IDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return MODEL_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_STATUS_ID", function() { return DATETIME_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_STATUS_IDS", function() { return DATETIME_STATUS_IDS; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var MODEL_NAME = 'datetime';
var DATETIME_STATUS_ID = {
  SOLD_OUT: 'DTS',
  ACTIVE: 'DTA',
  UPCOMING: 'DTU',
  POSTPONED: 'DTP',
  CANCELLED: 'DTC',
  EXPIRED: 'DTE',
  INACTIVE: 'DTI'
};
var DATETIME_STATUS_IDS = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["values"])(DATETIME_STATUS_ID);

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
/*! exports provided: MODEL_NAME, DATETIME_STATUS_ID, DATETIME_STATUS_IDS, nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString, DATE_FIELDS, prettyDateFromDateTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/datetime/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAME", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAME"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATETIME_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["DATETIME_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATETIME_STATUS_IDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["DATETIME_STATUS_IDS"]; });

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
  relations: {
    index: {},
    entityMap: {}
  },
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
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assertions */ "./assets/src/data/model/entity-factory/assertions.js");
/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./create */ "./assets/src/data/model/entity-factory/create.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/entity-factory/constants.js");







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

var _PRIVATE_PROPERTIES$S = _constants__WEBPACK_IMPORTED_MODULE_9__["PRIVATE_PROPERTIES"].SAVE_STATE;
var _PRIVATE_PROPERTIES$V = _constants__WEBPACK_IMPORTED_MODULE_9__["PRIVATE_PROPERTIES"].VALIDATE_TYPES;

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

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(this, _PRIVATE_PROPERTIES$S, _constants__WEBPACK_IMPORTED_MODULE_9__["SAVE_STATE"].CLEAN);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(this, _PRIVATE_PROPERTIES$V, {});

    Object(_assertions__WEBPACK_IMPORTED_MODULE_7__["assertValidSchema"])(schema);
    fieldPrefixes = Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isArray"])(fieldPrefixes) ? fieldPrefixes : [];
    Object(_create__WEBPACK_IMPORTED_MODULE_8__["createGetter"])(this, 'fieldPrefixes', fieldPrefixes);
    Object(_create__WEBPACK_IMPORTED_MODULE_8__["createGetter"])(this, 'schema', schema.properties);
    Object(_create__WEBPACK_IMPORTED_MODULE_8__["setSaveState"])(this, isNew ? _constants__WEBPACK_IMPORTED_MODULE_9__["SAVE_STATE"].NEW : _constants__WEBPACK_IMPORTED_MODULE_9__["SAVE_STATE"].CLEAN);
    Object(_create__WEBPACK_IMPORTED_MODULE_8__["createGetter"])(this, 'modelName', modelName);
    Object(_create__WEBPACK_IMPORTED_MODULE_8__["createGetter"])(this, 'originalFieldsAndValues', entityFieldsAndValues);
    Object(_create__WEBPACK_IMPORTED_MODULE_8__["createGetter"])(this, 'fieldsToPersistOnInsert', new Set(Object.keys(entityFieldsAndValues)));
    Object(_create__WEBPACK_IMPORTED_MODULE_8__["createEntityGettersAndSetters"])(this);
    Object(_create__WEBPACK_IMPORTED_MODULE_8__["createPersistingGettersAndSetters"])(this);
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
      return this[_constants__WEBPACK_IMPORTED_MODULE_9__["PRIVATE_PROPERTIES"].SAVE_STATE];
    }
    /**
     * Whether the current save state is SAVE_STATE.NEW
     * @return {boolean}  True means SAVE_STATE.NEW is the save state.
     */

  }, {
    key: "isNew",
    get: function get() {
      return this.saveState === _constants__WEBPACK_IMPORTED_MODULE_9__["SAVE_STATE"].NEW;
    }
    /**
     * Whether the current save state is SAVE_STATE.DIRTY
     * @return {boolean}  True means SAVE_STATE.DIRTY is the save state.
     */

  }, {
    key: "isDirty",
    get: function get() {
      return this.saveState === _constants__WEBPACK_IMPORTED_MODULE_9__["SAVE_STATE"].DIRTY;
    }
    /**
     * Whether the current save state is SAVE_STATE.CLEAN
     * @return {boolean}  True means SAVE_STATE.CLEAN is the save state.
     */

  }, {
    key: "isClean",
    get: function get() {
      return this.saveState === _constants__WEBPACK_IMPORTED_MODULE_9__["SAVE_STATE"].CLEAN;
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
      return new BaseEntity(this.modelName, this.forClone, {
        $schema: {},
        properties: this.schema
      }, this.fieldPrefixes, true);
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
      Object(_assertions__WEBPACK_IMPORTED_MODULE_5__["assertValidValueForPreparedField"])(fieldName, receivedValue, instance);
      setSaveState(instance, _constants__WEBPACK_IMPORTED_MODULE_8__["SAVE_STATE"].DIRTY);
      setFieldToPersist(instance, fieldName);
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

    createGetter(instance, schemaField, cuid__WEBPACK_IMPORTED_MODULE_3___default()(), {
      configurable: true,
      enumerable: true
    });
    createAliasGetterForField(instance, schemaField);
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
 */

var setSaveState = function setSaveState(instance, saveState) {
  var currentState = instance[_constants__WEBPACK_IMPORTED_MODULE_8__["PRIVATE_PROPERTIES"].SAVE_STATE];

  switch (saveState) {
    case _constants__WEBPACK_IMPORTED_MODULE_8__["SAVE_STATE"].DIRTY:
    case _constants__WEBPACK_IMPORTED_MODULE_8__["SAVE_STATE"].NEW:
    case _constants__WEBPACK_IMPORTED_MODULE_8__["SAVE_STATE"].CLEAN:
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
/*! exports provided: DEFAULT_LISTS_STATE, DEFAULT_CORE_STATE, DEFAULT_SCHEMA_STATE, baseRestRoute, endpoints, getEndpoint, applyQueryString, stripBaseRouteFromUrl, primaryKeys, valuesForCombinedPrimaryKeys, valueForPrimaryKey, getPrimaryKey, getPrimaryKeyQueryString, getEntityPrimaryKeyValues, keyEntitiesByPrimaryKeyValue, createAndKeyEntitiesByPrimaryKeyValue, assertEntityHasKey, assertImmutableObjectHasPath, assertIsArray, assertIsNotEmpty, assertIsMap, MODEL_NAMES, pluralModelName, singularModelName, modelNameForQueryString, QUERY_ORDER_ASC, QUERY_ORDER_DESC, ALLOWED_ORDER_VALUES, GREATER_THAN, LESS_THAN, GREATER_THAN_AND_EQUAL, LESS_THAN_AND_EQUAL, getQueryString, checkInModel, dateTimeModel, eventModel, registrationModel, statusModel, ticketModel, attendeeModel, createEntityFactory, MODEL_PREFIXES, SAVE_STATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_model_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default-model-state */ "./assets/src/data/model/default-model-state.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LISTS_STATE", function() { return _default_model_state__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_LISTS_STATE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CORE_STATE", function() { return _default_model_state__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_CORE_STATE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SCHEMA_STATE", function() { return _default_model_state__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_SCHEMA_STATE"]; });

/* harmony import */ var _endpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endpoints */ "./assets/src/data/model/endpoints.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "baseRestRoute", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_1__["baseRestRoute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "endpoints", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_1__["endpoints"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getEndpoint", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_1__["getEndpoint"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyQueryString", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_1__["applyQueryString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stripBaseRouteFromUrl", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_1__["stripBaseRouteFromUrl"]; });

/* harmony import */ var _primary_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./primary-keys */ "./assets/src/data/model/primary-keys.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "primaryKeys", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["primaryKeys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "valuesForCombinedPrimaryKeys", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["valuesForCombinedPrimaryKeys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "valueForPrimaryKey", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["valueForPrimaryKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPrimaryKey", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["getPrimaryKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPrimaryKeyQueryString", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["getPrimaryKeyQueryString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getEntityPrimaryKeyValues", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["getEntityPrimaryKeyValues"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keyEntitiesByPrimaryKeyValue", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["keyEntitiesByPrimaryKeyValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAndKeyEntitiesByPrimaryKeyValue", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_2__["createAndKeyEntitiesByPrimaryKeyValue"]; });

/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assertions */ "./assets/src/data/model/assertions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertEntityHasKey", function() { return _assertions__WEBPACK_IMPORTED_MODULE_3__["assertEntityHasKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertImmutableObjectHasPath", function() { return _assertions__WEBPACK_IMPORTED_MODULE_3__["assertImmutableObjectHasPath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertIsArray", function() { return _assertions__WEBPACK_IMPORTED_MODULE_3__["assertIsArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertIsNotEmpty", function() { return _assertions__WEBPACK_IMPORTED_MODULE_3__["assertIsNotEmpty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertIsMap", function() { return _assertions__WEBPACK_IMPORTED_MODULE_3__["assertIsMap"]; });

/* harmony import */ var _model_names__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./model-names */ "./assets/src/data/model/model-names.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return _model_names__WEBPACK_IMPORTED_MODULE_4__["MODEL_NAMES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pluralModelName", function() { return _model_names__WEBPACK_IMPORTED_MODULE_4__["pluralModelName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "singularModelName", function() { return _model_names__WEBPACK_IMPORTED_MODULE_4__["singularModelName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "modelNameForQueryString", function() { return _model_names__WEBPACK_IMPORTED_MODULE_4__["modelNameForQueryString"]; });

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
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkInModel", function() { return _models__WEBPACK_IMPORTED_MODULE_6__["checkInModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateTimeModel", function() { return _models__WEBPACK_IMPORTED_MODULE_6__["dateTimeModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventModel", function() { return _models__WEBPACK_IMPORTED_MODULE_6__["eventModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registrationModel", function() { return _models__WEBPACK_IMPORTED_MODULE_6__["registrationModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "statusModel", function() { return _models__WEBPACK_IMPORTED_MODULE_6__["statusModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ticketModel", function() { return _models__WEBPACK_IMPORTED_MODULE_6__["ticketModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "attendeeModel", function() { return _models__WEBPACK_IMPORTED_MODULE_6__["attendeeModel"]; });

/* harmony import */ var _entity_factory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./entity-factory */ "./assets/src/data/model/entity-factory/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createEntityFactory", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_7__["createEntityFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_PREFIXES", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_7__["MODEL_PREFIXES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SAVE_STATE", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_7__["SAVE_STATE"]; });










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
/*! exports provided: checkInModel, dateTimeModel, eventModel, registrationModel, statusModel, ticketModel, attendeeModel */
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
/* harmony import */ var _checkin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./checkin */ "./assets/src/data/model/checkin/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "checkInModel", function() { return _checkin__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony import */ var _attendee__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./attendee */ "./assets/src/data/model/attendee/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "attendeeModel", function() { return _attendee__WEBPACK_IMPORTED_MODULE_6__; });









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
/*! exports provided: MODEL_NAME, TICKET_STATUS_ID, TICKET_STATUS_IDS, nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
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

/***/ "./node_modules/@babel/runtime/core-js/array/from.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/core-js/array/from.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/array/from */ "./node_modules/core-js/library/fn/array/from.js");

/***/ }),

/***/ "./node_modules/@babel/runtime/core-js/is-iterable.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/core-js/is-iterable.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/is-iterable */ "./node_modules/core-js/library/fn/is-iterable.js");

/***/ }),

/***/ "./node_modules/@babel/runtime/core-js/object/create.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/core-js/object/create.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/create */ "./node_modules/core-js/library/fn/object/create.js");

/***/ }),

/***/ "./node_modules/@babel/runtime/core-js/object/define-property.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime/core-js/object/define-property.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-property */ "./node_modules/core-js/library/fn/object/define-property.js");

/***/ }),

/***/ "./node_modules/@babel/runtime/core-js/object/get-own-property-descriptor.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/core-js/object/get-own-property-descriptor.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-descriptor */ "./node_modules/core-js/library/fn/object/get-own-property-descriptor.js");

/***/ }),

/***/ "./node_modules/@babel/runtime/core-js/object/get-own-property-symbols.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/core-js/object/get-own-property-symbols.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-symbols */ "./node_modules/core-js/library/fn/object/get-own-property-symbols.js");

/***/ }),

/***/ "./node_modules/@babel/runtime/core-js/object/get-prototype-of.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime/core-js/object/get-prototype-of.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-prototype-of */ "./node_modules/core-js/library/fn/object/get-prototype-of.js");

/***/ }),

/***/ "./node_modules/@babel/runtime/core-js/object/keys.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/core-js/object/keys.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/keys */ "./node_modules/core-js/library/fn/object/keys.js");

/***/ }),

/***/ "./node_modules/@babel/runtime/core-js/object/set-prototype-of.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime/core-js/object/set-prototype-of.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ "./node_modules/core-js/library/fn/object/set-prototype-of.js");

/***/ }),

/***/ "./node_modules/@babel/runtime/core-js/symbol.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/core-js/symbol.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol */ "./node_modules/core-js/library/fn/symbol/index.js");

/***/ }),

/***/ "./node_modules/@babel/runtime/core-js/symbol/iterator.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/core-js/symbol/iterator.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol/iterator */ "./node_modules/core-js/library/fn/symbol/iterator.js");

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
/***/ (function(module, exports, __webpack_require__) {

var _Object$defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ "./node_modules/@babel/runtime/core-js/object/define-property.js");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _Object$defineProperty(target, descriptor.key, descriptor);
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
/***/ (function(module, exports, __webpack_require__) {

var _Object$defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ "./node_modules/@babel/runtime/core-js/object/define-property.js");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _Object$defineProperty(obj, key, {
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
/***/ (function(module, exports, __webpack_require__) {

var _Object$getPrototypeOf = __webpack_require__(/*! ../core-js/object/get-prototype-of */ "./node_modules/@babel/runtime/core-js/object/get-prototype-of.js");

var _Object$setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime/core-js/object/set-prototype-of.js");

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = _Object$setPrototypeOf ? _Object$getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || _Object$getPrototypeOf(o);
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

var _Object$create = __webpack_require__(/*! ../core-js/object/create */ "./node_modules/@babel/runtime/core-js/object/create.js");

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
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
/***/ (function(module, exports, __webpack_require__) {

var _Array$from = __webpack_require__(/*! ../core-js/array/from */ "./node_modules/@babel/runtime/core-js/array/from.js");

var _isIterable = __webpack_require__(/*! ../core-js/is-iterable */ "./node_modules/@babel/runtime/core-js/is-iterable.js");

function _iterableToArray(iter) {
  if (_isIterable(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return _Array$from(iter);
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

var _Object$getOwnPropertyDescriptor = __webpack_require__(/*! ../core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime/core-js/object/get-own-property-descriptor.js");

var _Object$getOwnPropertySymbols = __webpack_require__(/*! ../core-js/object/get-own-property-symbols */ "./node_modules/@babel/runtime/core-js/object/get-own-property-symbols.js");

var _Object$keys = __webpack_require__(/*! ../core-js/object/keys */ "./node_modules/@babel/runtime/core-js/object/keys.js");

var defineProperty = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    var ownKeys = _Object$keys(source);

    if (typeof _Object$getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(_Object$getOwnPropertySymbols(source).filter(function (sym) {
        return _Object$getOwnPropertyDescriptor(source, sym).enumerable;
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
/***/ (function(module, exports, __webpack_require__) {

var _Object$setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime/core-js/object/set-prototype-of.js");

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = _Object$setPrototypeOf || function _setPrototypeOf(o, p) {
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
/***/ (function(module, exports, __webpack_require__) {

var _Symbol$iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ "./node_modules/@babel/runtime/core-js/symbol/iterator.js");

var _Symbol = __webpack_require__(/*! ../core-js/symbol */ "./node_modules/@babel/runtime/core-js/symbol.js");

function _typeof2(obj) { if (typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _Symbol === "function" && _typeof2(_Symbol$iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

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

/***/ "./node_modules/core-js/library/fn/is-iterable.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/fn/is-iterable.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/library/modules/es6.string.iterator.js");
module.exports = __webpack_require__(/*! ../modules/core.is-iterable */ "./node_modules/core-js/library/modules/core.is-iterable.js");


/***/ }),

/***/ "./node_modules/core-js/library/fn/object/create.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/create.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.create */ "./node_modules/core-js/library/modules/es6.object.create.js");
var $Object = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),

/***/ "./node_modules/core-js/library/fn/object/define-property.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/define-property.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.define-property */ "./node_modules/core-js/library/modules/es6.object.define-property.js");
var $Object = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "./node_modules/core-js/library/fn/object/get-own-property-descriptor.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/get-own-property-descriptor.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.get-own-property-descriptor */ "./node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js");
var $Object = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/library/fn/object/get-own-property-symbols.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/get-own-property-symbols.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.symbol */ "./node_modules/core-js/library/modules/es6.symbol.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/library/fn/object/get-prototype-of.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/get-prototype-of.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.get-prototype-of */ "./node_modules/core-js/library/modules/es6.object.get-prototype-of.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object.getPrototypeOf;


/***/ }),

/***/ "./node_modules/core-js/library/fn/object/keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.keys */ "./node_modules/core-js/library/modules/es6.object.keys.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object.keys;


/***/ }),

/***/ "./node_modules/core-js/library/fn/object/set-prototype-of.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/set-prototype-of.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.set-prototype-of */ "./node_modules/core-js/library/modules/es6.object.set-prototype-of.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object.setPrototypeOf;


/***/ }),

/***/ "./node_modules/core-js/library/fn/symbol/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/fn/symbol/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.symbol */ "./node_modules/core-js/library/modules/es6.symbol.js");
__webpack_require__(/*! ../../modules/es6.object.to-string */ "./node_modules/core-js/library/modules/es6.object.to-string.js");
__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ "./node_modules/core-js/library/modules/es7.symbol.async-iterator.js");
__webpack_require__(/*! ../../modules/es7.symbol.observable */ "./node_modules/core-js/library/modules/es7.symbol.observable.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Symbol;


/***/ }),

/***/ "./node_modules/core-js/library/fn/symbol/iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/fn/symbol/iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ "./node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__(/*! ../../modules/web.dom.iterable */ "./node_modules/core-js/library/modules/web.dom.iterable.js");
module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ "./node_modules/core-js/library/modules/_wks-ext.js").f('iterator');


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

var core = module.exports = { version: '2.5.7' };
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

/***/ "./node_modules/core-js/library/modules/_enum-keys.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_enum-keys.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/library/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/library/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/library/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


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

/***/ "./node_modules/core-js/library/modules/_is-array.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-array.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/library/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
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

/***/ "./node_modules/core-js/library/modules/_meta.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_meta.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/library/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


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

/***/ "./node_modules/core-js/library/modules/_object-gopd.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopd.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/library/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/library/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/library/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gopn-ext.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopn-ext.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/library/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gopn.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopn.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/library/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/library/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
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

/***/ "./node_modules/core-js/library/modules/_object-sap.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-sap.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


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

/***/ "./node_modules/core-js/library/modules/_set-proto.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-proto.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/library/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/library/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


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

/***/ "./node_modules/core-js/library/modules/_wks-define.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks-define.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/library/modules/_library.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/library/modules/_wks-ext.js");
var defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_wks-ext.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js");


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

/***/ "./node_modules/core-js/library/modules/core.is-iterable.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/core.is-iterable.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/library/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/library/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
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

/***/ "./node_modules/core-js/library/modules/es6.object.create.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.create.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/library/modules/_object-create.js") });


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.define-property.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.define-property.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js"), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js").f });


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/library/modules/_object-gopd.js").f;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/library/modules/_object-sap.js")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.get-prototype-of.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.get-prototype-of.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/library/modules/_to-object.js");
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/library/modules/_object-gpo.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/library/modules/_object-sap.js")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.keys.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.keys.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/library/modules/_to-object.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/library/modules/_object-keys.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/library/modules/_object-sap.js")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.set-prototype-of.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.set-prototype-of.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/library/modules/_set-proto.js").set });


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.to-string.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.to-string.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



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

/***/ "./node_modules/core-js/library/modules/es6.symbol.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.symbol.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/library/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/library/modules/_has.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/library/modules/_redefine.js");
var META = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/library/modules/_meta.js").KEY;
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/library/modules/_fails.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/library/modules/_shared.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/library/modules/_set-to-string-tag.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/library/modules/_uid.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/library/modules/_wks.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/library/modules/_wks-ext.js");
var wksDefine = __webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/library/modules/_wks-define.js");
var enumKeys = __webpack_require__(/*! ./_enum-keys */ "./node_modules/core-js/library/modules/_enum-keys.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/library/modules/_is-array.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/library/modules/_is-object.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/library/modules/_to-primitive.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/library/modules/_property-desc.js");
var _create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/library/modules/_object-create.js");
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/core-js/library/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/library/modules/_object-gopd.js");
var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/library/modules/_object-dp.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/library/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/library/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/library/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/library/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "./node_modules/core-js/library/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "./node_modules/core-js/library/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.symbol.async-iterator.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.symbol.async-iterator.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/library/modules/_wks-define.js")('asyncIterator');


/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.symbol.observable.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.symbol.observable.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/library/modules/_wks-define.js")('observable');


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLltuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9hc3NlcnRpb25zLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2F0dGVuZGVlL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9hdHRlbmRlZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9hdHRlbmRlZS9xdWVyeS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9iYXNlLWRhdGUtZm9ybWF0dGVyLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvY2hlY2tpbi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvY2hlY2tpbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9jaGVja2luL3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2RhdGV0aW1lL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9mb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZGF0ZXRpbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZGF0ZXRpbWUvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZGVmYXVsdC1tb2RlbC1zdGF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbmRwb2ludHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZW50aXR5LWZhY3RvcnkvYXNzZXJ0aW9ucy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9iYXNlLWVudGl0eS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9ib29sZWFucy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZW50aXR5LWZhY3RvcnkvY3JlYXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2V4dHJhY3RvcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZW50aXR5LWZhY3RvcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZW50aXR5LWZhY3RvcnkvdmFsaWRhdG9ycy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9ldmVudC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZXZlbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZXZlbnQvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvbW9kZWwtbmFtZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvbW9kZWxzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3ByaW1hcnkta2V5cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3JlZ2lzdHJhdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvc3RhdHVzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvc3RhdHVzL3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3RpY2tldC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3RpY2tldC9xdWVyeS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFNwcmVhZC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvbWVtaXplL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcGx1cmFsaXplL3BsdXJhbGl6ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcImVlanNcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcImVlanMuaGVscGVyc1wiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwiZWVqcy5pMThuXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzLnZhbGlkYXRvcnNcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcImVlanMudmFsdWVPYmplY3RzXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJ3cC5ob29rc1wiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwiZWVqcy52ZW5kb3IuY3VpZFwiIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzLnZlbmRvci5tb21lbnRcIiJdLCJuYW1lcyI6WyJhc3NlcnRFbnRpdHlIYXNLZXkiLCJrZXkiLCJlbnRpdHkiLCJtZXNzYWdlIiwic3ByaW50ZiIsIl9fIiwiaGFzT3duUHJvcGVydHkiLCJFeGNlcHRpb24iLCJhc3NlcnRJbW11dGFibGVPYmplY3RIYXNQYXRoIiwicGF0aCIsImltbXV0YWJsZSIsImhhc0luIiwiYXNzZXJ0SXNBcnJheSIsIml0ZW1zIiwiaXNBcnJheSIsImFzc2VydElzTm90RW1wdHkiLCJpc0VtcHR5IiwiYXNzZXJ0SXNNYXAiLCJpdGVtIiwiaXNNYXAiLCJNT0RFTF9OQU1FIiwib3JkZXJCeU1hcCIsImlkIiwibGFzdE5hbWVPbmx5IiwiZmlyc3ROYW1lT25seSIsImZpcnN0VGhlbkxhc3ROYW1lIiwibGFzdFRoZW5GaXJzdE5hbWUiLCJxdWVyeURhdGFUeXBlcyIsImZvckV2ZW50SWQiLCJQcm9wVHlwZXMiLCJudW1iZXIiLCJmb3JEYXRldGltZUlkIiwiZm9yVGlja2V0SWQiLCJmb3JTdGF0dXNJZCIsIm9uZU9mIiwiUkVHSVNUUkFUSU9OX1NUQVRVU19JRFMiLCJmb3JSZWdpc3RyYXRpb25JZCIsInNob3dHcmF2YXRhciIsImJvb2wiLCJxdWVyeURhdGEiLCJzaGFwZSIsImxpbWl0Iiwib3JkZXJCeSIsIk9iamVjdCIsImtleXMiLCJvcmRlciIsIkFMTE9XRURfT1JERVJfVkFMVUVTIiwiZGVmYXVsdFF1ZXJ5RGF0YSIsIlFVRVJZX09SREVSX0FTQyIsIm1hcE9yZGVyQnkiLCJpc1VuZGVmaW5lZCIsIndoZXJlQ29uZGl0aW9ucyIsIndoZXJlIiwicGFyc2VJbnQiLCJpc05hTiIsInB1c2giLCJpbmNsdWRlcyIsImpvaW4iLCJnZXRRdWVyeVN0cmluZyIsImJhc2VHZXRRdWVyeVN0cmluZyIsImZvcm1hdERhdGVzT25FbnRpdGllcyIsImVudGl0aWVzIiwiZW50aXR5RGF0ZUZpZWxkcyIsImZvcm1hdCIsImRhdGVGb3JtYXRzIiwibG9jYWwiLCJmb3JtYXR0ZWRFbnRpdGllcyIsImZvckVhY2giLCJmb3JtYXREYXRlc09uRW50aXR5IiwibmV3RW50aXR5IiwiZGF0ZUZpZWxkIiwiZm9ybWF0RW50aXRpZXNEYXRlc1RvTXlzcWwiLCJmb3JtYXRFbnRpdHlEYXRlc1RvTXlzcWwiLCJmb3JtYXRFbnRpdGllc0RhdGVzVG9TaXRlIiwiZm9ybWF0RW50aXR5RGF0ZXNUb1NpdGUiLCJjb252ZXJ0RW50aXRpZXNEYXRlc1RvTW9tZW50IiwiY29udmVydEVudGl0eURhdGVzVG9Nb21lbnQiLCJRVUVSWV9PUkRFUl9ERVNDIiwiR1JFQVRFUl9USEFOIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiTEVTU19USEFOIiwiR1JFQVRFUl9USEFOX0FORF9FUVVBTCIsIkxFU1NfVEhBTl9BTkRfRVFVQUwiLCJkZWZhdWx0V2hlcmVDb25kaXRpb25zIiwicXVlcnlQYXJhbXMiLCJmaWVsZCIsInF1ZXJ5U3RyaW5nIiwiQ0hFQ0tJTl9TVEFUVVNfSUQiLCJTVEFUVVNfQ0hFQ0tFRF9PVVQiLCJTVEFUVVNfQ0hFQ0tFRF9JTiIsIlNUQVRVU19DSEVDS0VEX05FVkVSIiwiQ0hFQ0tJTl9TVEFUVVNfSURTIiwidmFsdWVzIiwiY2hlY2tpblN0YXR1cyIsIm9wdGlvbnNFbnRpdHlNYXAiLCJkZWZhdWx0IiwibGFiZWwiLCJwcmV0dHlTdGF0dXMiLCJ2YWx1ZSIsInRpbWVzdGFtcCIsIkRBVEVUSU1FX1NUQVRVU19JRCIsIlNPTERfT1VUIiwiQUNUSVZFIiwiVVBDT01JTkciLCJQT1NUUE9ORUQiLCJDQU5DRUxMRUQiLCJFWFBJUkVEIiwiSU5BQ1RJVkUiLCJEQVRFVElNRV9TVEFUVVNfSURTIiwiREFURV9GSUVMRFMiLCJmb3JtYXR0ZXJzIiwiZm9yT3duIiwiYmFzZUZvcm1hdHRlciIsImltcGxlbWVudGF0aW9uIiwiZnVuY3Rpb25OYW1lIiwiaW5jb21pbmdBcmdzIiwiZmlyc3RBcmciLCJwdWxsQXQiLCJwcmV0dHlEYXRlRnJvbURhdGVUaW1lIiwiRGF0ZVRpbWVFbnRpdHkiLCJjb250ZW50IiwiaXNNb2RlbEVudGl0eU9mTW9kZWwiLCJEVFRfRVZUX3N0YXJ0IiwiaGFzU2FtZSIsIkRUVF9FVlRfZW5kIiwiYWxsRGF0ZVRpbWVzQXNTdHJpbmciLCJTRVBBUkFUT1JfU1BBQ0VfREFTSF9TUEFDRSIsInRvRm9ybWF0IiwiREFURV9USU1FX0ZPUk1BVF9TSVRFIiwiVElNRV9GT1JNQVRfU0lURSIsIkRUVF9uYW1lIiwibm93RGF0ZUFuZFRpbWUiLCJtb21lbnQiLCJzaG93RXhwaXJlZCIsIm1vbnRoIiwic3RhcnRfZGF0ZSIsImVuZF9kYXRlIiwic3RhcnRPZiIsImVuZE9mIiwibWFwVG9PYmplY3RWYWx1ZXMiLCJtb2RlbE5hbWVFbmRwb2ludHMiLCJtYXBWYWx1ZXMiLCJnZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCIsIm1lbW9pemUiLCJlbmRwb2ludHMiLCJERUZBVUxUX0xJU1RTX1NUQVRFIiwiREVGQVVMVF9DT1JFX1NUQVRFIiwicmVsYXRpb25zIiwiaW5kZXgiLCJlbnRpdHlNYXAiLCJkaXJ0eSIsImRlbGV0ZSIsImFkZCIsInRyYXNoIiwiREVGQVVMVF9TQ0hFTUFfU1RBVEUiLCJzY2hlbWEiLCJmYWN0b3J5IiwicmVsYXRpb25FbmRwb2ludHMiLCJyZWxhdGlvblNjaGVtYSIsImRhdGEiLCJwYXRocyIsImNvbGxlY3Rpb25fZW5kcG9pbnRzIiwiYmFzZVJlc3RSb3V0ZSIsImJhc2VfcmVzdF9yb3V0ZSIsImdldEVuZHBvaW50IiwibW9kZWxOYW1lIiwiYXBwbHlRdWVyeVN0cmluZyIsInN0cmlwQmFzZVJvdXRlRnJvbVVybCIsInVybCIsInJlcGxhY2UiLCJtYXliZUFzc2VydFZhbHVlT2JqZWN0IiwiZmllbGROYW1lIiwiZmllbGRWYWx1ZSIsImlzRGF0ZVRpbWVGaWVsZCIsIkRhdGVUaW1lIiwiYXNzZXJ0SXNEYXRlVGltZSIsImlzTW9uZXlGaWVsZCIsIk1vbmV5IiwiYXNzZXJ0TW9uZXkiLCJhc3NlcnRWYWxpZFNjaGVtYSIsImlzU2NoZW1hIiwiSW52YWxpZFNjaGVtYSIsImFzc2VydFZhbGlkU2NoZW1hRmllbGRQcm9wZXJ0aWVzIiwiVHlwZUVycm9yIiwidHlwZSIsInByb3BlcnRpZXMiLCJyYXciLCJhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZCIsImluc3RhbmNlIiwiaXNWYWxpZCIsImlzU2hhbGxvd1ZhbGlkVmFsdWVGb3JGaWVsZCIsImVudW0iLCJ2YWxpZGF0ZUVudW1UeXBlIiwidmFsaWRhdGVUeXBlIiwibWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMiLCJhc3NlcnRWYWxpZEZpZWxkQW5kVmFsdWVBZ2FpbnN0U2NoZW1hIiwidmFsaWRhdGlvblR5cGUiLCJ2YWxpZGF0ZVR5cGVGb3JGaWVsZCIsIlBSSVZBVEVfUFJPUEVSVElFUyIsIlNBVkVfU1RBVEUiLCJWQUxJREFURV9UWVBFUyIsIkJhc2VFbnRpdHkiLCJlbnRpdHlGaWVsZHNBbmRWYWx1ZXMiLCJmaWVsZFByZWZpeGVzIiwiaXNOZXciLCJDTEVBTiIsImNyZWF0ZUdldHRlciIsInNldFNhdmVTdGF0ZSIsIk5FVyIsIlNldCIsImNyZWF0ZUVudGl0eUdldHRlcnNBbmRTZXR0ZXJzIiwiY3JlYXRlUGVyc2lzdGluZ0dldHRlcnNBbmRTZXR0ZXJzIiwic2VhbCIsInNhdmVTdGF0ZSIsIkRJUlRZIiwicHJvdGVjdGVkRmllbGRzIiwibGVuZ3RoIiwiaW5kZXhPZiIsImZvckNsb25lIiwiJHNjaGVtYSIsIm5hbWVDbGFzcyIsIm5hbWUiLCJleHRlbmRlZENsYXNzIiwiY3JlYXRlRW50aXR5RmFjdG9yeSIsIkVudGl0eSIsInVwcGVyRmlyc3QiLCJjYW1lbENhc2UiLCJjbGFzc0RlZiIsImNyZWF0ZU5ldyIsImZpZWxkc0FuZFZhbHVlcyIsImZyb21FeGlzdGluZyIsImhhc1Jhd1Byb3BlcnR5IiwiaXNQbGFpbk9iamVjdCIsImhhc1ByZXR0eVByb3BlcnR5IiwicHJldHR5IiwiaGFzUmVuZGVyZWRQcm9wZXJ0eSIsInJlbmRlcmVkIiwiaGFzRm9ybWF0UHJvcGVydHkiLCJoYXNFbnVtUHJvcGVydHkiLCJpc1ZhbHVlT2JqZWN0RmllbGQiLCJpc1VUQ0RhdGVUaW1lRmllbGQiLCJkYXRlVGltZUZpZWxkTmFtZSIsImlzUHJpbWFyeUtleUZpZWxkIiwicHJpbWFyeV9rZXkiLCJpc1JlYWRPbmx5IiwicmVhZG9ubHkiLCJpc0VudGl0eUZpZWxkIiwiaXNFbnVtRmllbGQiLCJTeW1ib2wiLCJWQUxJREFURV9UWVBFIiwiUkFXIiwiUkVOREVSRUQiLCJQUkVUVFkiLCJNT0RFTF9QUkVGSVhFUyIsInByZWZpeE1hcCIsImFwcGx5RmlsdGVycyIsImFuc3dlciIsImF0dGVuZGVlIiwiY2hhbmdlX2xvZyIsImNoZWNraW4iLCJjb3VudHJ5IiwiY3VycmVuY3kiLCJjdXJyZW5jeV9wYXltZW50X21ldGhvZCIsImRhdGV0aW1lIiwiZGF0ZXRpbWVfdGlja2V0IiwiZXZlbnQiLCJldmVudF9tZXNzYWdlX3RlbXBsYXRlIiwiZXZlbnRfcXVlc3Rpb25fZ3JvdXAiLCJldmVudF92ZW51ZSIsImV4dHJhX2pvaW4iLCJleHRyYV9tZXRhIiwibGluZV9pdGVtIiwibWVzc2FnZV90ZW1wbGF0ZSIsIm1lc3NhZ2VfdGVtcGxhdGVfZ3JvdXAiLCJwYXltZW50IiwicGF5bWVudF9tZXRob2QiLCJwb3N0X21ldGEiLCJwcmljZSIsInByaWNlX3R5cGUiLCJxdWVzdGlvbiIsInF1ZXN0aW9uX2dyb3VwIiwicXVlc3Rpb25fZ3JvdXBfcXVlc3Rpb24iLCJxdWVzdGlvbl9vcHRpb24iLCJyZWdpc3RyYXRpb24iLCJyZWdpc3RyYXRpb25fcGF5bWVudCIsInN0YXRlIiwic3RhdHVzIiwidGVybSIsInRlcm1fcmVsYXRpb25zaGlwIiwidGVybV90YXhvbm9teSIsInRpY2tldCIsInRpY2tldF9wcmljZSIsInRpY2tldF90ZW1wbGF0ZSIsInRyYW5zYWN0aW9uIiwidmVudWUiLCJ3cF91c2VyIiwib3B0cyIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiY3JlYXRlQ2FsbGJhY2tHZXR0ZXIiLCJwcm9wZXJ0eU5hbWUiLCJjYWxsQmFjayIsImNyZWF0ZUdldHRlckFuZFNldHRlciIsImluaXRpYWxGaWVsZFZhbHVlIiwicHJvcGVydHlWYWx1ZSIsInNldCIsInJlY2VpdmVkVmFsdWUiLCJzZXRGaWVsZFRvUGVyc2lzdCIsImNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyIiwib3JpZ2luYWxGaWVsZE5hbWUiLCJhbGlhc0ZpZWxkTmFtZSIsImNyZWF0ZUFsaWFzR2V0dGVyIiwiY3JlYXRlRmx1ZW50U2V0dGVyIiwicHJpbWFyeUtleXMiLCJvcmlnaW5hbEZpZWxkc0FuZFZhbHVlcyIsImlzUHJpbWFyeUtleSIsInNldFZhbGlkYXRlVHlwZUZvckZpZWxkIiwic2V0SW5pdGlhbEVudGl0eUZpZWxkc0FuZFZhbHVlcyIsInNldENhbGN1bGF0ZWRGaWVsZEFuZFZhbHVlcyIsInBvcHVsYXRlUHJvdGVjdGVkRmllbGRzUHJvcGVydHkiLCJzZXRSZXNvdXJjZXMiLCJjcmVhdGVQcmltYXJ5S2V5RmllbGRHZXR0ZXJzIiwicG9wdWxhdGVQcmltYXJ5S2V5cyIsInBvcHVsYXRlTWlzc2luZ0ZpZWxkcyIsImNhbGN1bGF0ZWRGaWVsZHMiLCJfY2FsY3VsYXRlZF9maWVsZHMiLCJfcHJvdGVjdGVkIiwiZ2V0UHJpbWFyeUtleUZpZWxkc0Zyb21TY2hlbWEiLCJzY2hlbWFQcm9wZXJ0aWVzIiwic2NoZW1hRmllbGQiLCJjdWlkIiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImNyZWF0ZUFsaWFzR2V0dGVyRm9yRmllbGQiLCJkZXJpdmVWYWxpZGF0ZVR5cGVGb3JGaWVsZCIsImdldEVudGl0eUZpZWxkc0Zyb21TY2hlbWEiLCJ1bmRlZmluZWQiLCJnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyIsImZvclVwZGF0ZSIsImdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JQZXJzaXN0aW5nIiwiZm9ySW5zZXJ0IiwiZW50aXR5VmFsdWVzIiwicHJpbWFyeUtleSIsImZvclBlcnNpc3QiLCJnZXREZWZhdWx0VmFsdWVGb3JGaWVsZCIsImNyZWF0ZVJhd0VudGl0eUdldHRlcnNTZXR0ZXJzIiwiZGVyaXZlUHJlcGFyZWRWYWx1ZUZvckZpZWxkIiwiY3JlYXRlUmVuZGVyZWRHZXR0ZXJzIiwiZGVyaXZlUmVuZGVyZWRWYWx1ZSIsImNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyRm9yRmllbGQiLCJjcmVhdGVBbGlhc2VzRm9yTWV0aG9kIiwibWV0aG9kIiwibmV3RmllbGROYW1lIiwiZmllbGRQcmVmaXgiLCJnZXRSZW5kZXJlZENhbGxiYWNrIiwicmVxdWVzdGVkRmllbGROYW1lIiwicmVtb3ZlUHJlZml4ZXNGcm9tRmllbGQiLCJwcmVmaXhlc1RvUmVtb3ZlIiwic29ydEJ5IiwicHJlZml4IiwiZ2V0UmVuZGVyZWQiLCJoYXNNdWx0aXBsZVByaW1hcnlLZXlzQ2FsbGJhY2siLCJoYXNDYWxjdWxhdGVkRmllbGRDYWxsYmFjayIsImZpZWxkTmFtZVRvQ2hlY2siLCJjYWxjdWxhdGVkRmllbGRWYWx1ZSIsImNhbGN1bGF0ZWRGaWVsZE5hbWUiLCJyZWxhdGlvbk5hbWUiLCJyZXNvdXJjZVZhbHVlIiwicmVzb3VyY2VOYW1lIiwiaHJlZiIsImdldFJlbGF0aW9uTmFtZUZyb21MaW5rIiwic2V0UmVsYXRpb25zUmVzb3VyY2UiLCJnZXRSZWxhdGlvblJlc291cmNlQ2FsbGJhY2siLCJyZXNvdXJjZUluZm8iLCJyZXNvdXJjZUxpbmsiLCJzaW5nbGUiLCJnZXRSZWxhdGlvblJlc291cmNlIiwiY3VycmVudFN0YXRlIiwiSW52YWxpZEFyZ3VtZW50IiwiZmllbGRzVG9QZXJzaXN0T25JbnNlcnQiLCJtYXliZUNvbnZlcnRUb1ZhbHVlT2JqZWN0IiwidmFsaWRhdGVJc0RhdGVUaW1lIiwiZnJvbUlTTyIsImluc3RhbmNlT2YiLCJTaXRlQ3VycmVuY3kiLCJ0b0lTTyIsInRvTnVtYmVyIiwibWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0IiwicGx1cmFsTW9kZWxOYW1lIiwibGFzdCIsInNwbGl0IiwiZW50aXR5SW5zdGFuY2UiLCJyZWR1Y2UiLCJpdGVyYXRvciIsIkFycmF5IiwiZnJvbSIsImdldFByaW1hcnlLZXlWYWx1ZXMiLCJwaWNrIiwicGlja0J5IiwiZGVyaXZlRGVmYXVsdFZhbHVlRm9yVHlwZSIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImRlcml2ZVR5cGVGb3JGaWVsZCIsInZhbGlkIiwic2luZ2xlVHlwZSIsImlzSW50ZWdlciIsImlzTnVtYmVyIiwiaXNTdHJpbmciLCJpc0Jvb2xlYW4iLCJlbnVtVmFsdWVzIiwiZXhwZWN0VmFsdWVPYmplY3RzIiwiaXNFbnVtIiwiaXNWYWx1ZU9iamVjdCIsIkVWRU5UX1NUQVRVU19JRCIsIkVWRU5UX1NUQVRVU19JRFMiLCJjYXRlZ29yeVNsdWciLCJzdHJpbmciLCJ0aWNrZXRfc3RhcnQiLCJ0aWNrZXRfZW5kIiwiTU9ERUxfTkFNRVMiLCJwbHVyYWxpemUiLCJzaW5ndWxhck1vZGVsTmFtZSIsInNpbmd1bGFyIiwibW9kZWxOYW1lRm9yUXVlcnlTdHJpbmciLCJzdGFydENhc2UiLCJwcmltYXJ5X2tleXMiLCJ2YWx1ZXNGb3JDb21iaW5lZFByaW1hcnlLZXlzIiwicmVzdWx0IiwidHJpbUVuZCIsInZhbHVlRm9yUHJpbWFyeUtleSIsImdldFByaW1hcnlLZXkiLCJnZXRQcmltYXJ5S2V5UXVlcnlTdHJpbmciLCJrZXlWYWx1ZXMiLCJnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzIiwia2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSIsIm1hcHBlZEVudGl0aWVzIiwiTWFwIiwiY3JlYXRlQW5kS2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSIsImVudGl0eUlkIiwic3RhdHVzTW9kZWwiLCJmb3JBdHRlbmRlZUlkIiwiZm9yVHJhbnNhY3Rpb25JZCIsInJlZ19pZCIsInJlZ19kYXRlIiwiU1RBVFVTX1RZUEVfRU1BSUwiLCJTVEFUVVNfVFlQRV9FVkVOVCIsIlNUQVRVU19UWVBFX01FU1NBR0UiLCJTVEFUVVNfVFlQRV9QQVlNRU5UIiwiU1RBVFVTX1RZUEVfUkVHSVNUUkFUSU9OIiwiU1RBVFVTX1RZUEVfVFJBTlNBQ1RJT04iLCJFTUFJTF9TVEFUVVNfSUQiLCJEUkFGVCIsIlNFTlQiLCJSRUdJU1RSQVRJT05fQ0xPU0VEIiwiREVMRVRFRCIsIkRFTklFRCIsIk5PVF9BQ1RJVkUiLCJOT1RfT1BFTiIsIk9OR09JTkciLCJSRUdJU1RSQVRJT05fT1BFTiIsIlBFTkRJTkciLCJTRUNPTkRBUlkiLCJNRVNTQUdFX1NUQVRVU19JRCIsIkRFQlVHIiwiRVhFQ1VUSU5HIiwiRkFJTCIsIklOQ09NUExFVEUiLCJJRExFIiwiUkVTRU5EIiwiUkVUUlkiLCJQQVlNRU5UX1NUQVRVU19JRCIsIkFQUFJPVkVEIiwiREVDTElORUQiLCJGQUlMRUQiLCJSRUdJU1RSQVRJT05fU1RBVFVTX0lEIiwiTk9UX0FQUFJPVkVEIiwiUEVORElOR19QQVlNRU5UIiwiV0FJVF9MSVNUIiwiVFJBTlNBQ1RJT05fU1RBVFVTX0lEIiwiQUJBTkRPTkVEIiwiQ09NUExFVEUiLCJPVkVSUEFJRCIsIkNQVF9TVEFUVVNfSUQiLCJQVUJMSVNIIiwiRlVUVVJFIiwiUFJJVkFURSIsIlRSQVNIRUQiLCJVTktOT1dOX1NUQVRVU19JRCIsIkFMTF9TVEFUVVNfSURTIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9SRUdJU1RSQVRJT04iLCJMYWJlbCIsImZyb21TYW1lU2luZ2xlQW5kUGx1cmFsIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9UUkFOU0FDVElPTiIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfUEFZTUVOVCIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfTUVTU0FHRSIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ1BUIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9FVkVOVCIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfVElDS0VUIiwiVElDS0VUX1NUQVRVU19JRCIsIkFSQ0hJVkVEIiwiT05TQUxFIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9EQVRFVElNRSIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ0hFQ0tJTiIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQUxMIiwic3RhdHVzQ29kZSIsIkZPUk1BVF9TRU5URU5DRV9DQVNFIiwiYXNGb3JtYXR0ZWQiLCJwcmV0dHlTdGF0dXNlcyIsInN0YXR1c0NvZGVzIiwibWFwcGVkU3RhdHVzZXMiLCJzdGF0dXNUeXBlIiwiVElDS0VUX1NUQVRVU19JRFMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUFV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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN6ZUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViOztBQUVBLElBQUksSUFBcUM7QUFDekMsNkJBQTZCLG1CQUFPLENBQUMseUZBQTRCO0FBQ2pFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLE1BQU0sSUFBcUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRHQUE0RztBQUM1RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLDREQUFlOztBQUVwQywyQkFBMkIsbUJBQU8sQ0FBQyx5RkFBNEI7QUFDL0QscUJBQXFCLG1CQUFPLENBQUMscUVBQWtCOztBQUUvQzs7QUFFQSxJQUFJLElBQXFDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQzs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLDZCQUE2QjtBQUM3QixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsS0FBSztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDRCQUE0QjtBQUM1QixPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFVBQVUsS0FBcUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU0sS0FBcUMsd0ZBQXdGLFNBQU07QUFDekk7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNLEtBQXFDLDRGQUE0RixTQUFNO0FBQzdJO0FBQ0E7O0FBRUEsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZ0NBQWdDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLElBQXFDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMsdUZBQTJCO0FBQ3RELENBQUMsTUFBTSxFQUlOOzs7Ozs7Ozs7Ozs7O0FDM0JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjs7QUFFQTs7Ozs7Ozs7Ozs7O0FDWEEsc0I7Ozs7Ozs7Ozs7O0FDQUEsOEI7Ozs7Ozs7Ozs7O0FDQUEsMkI7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsMEI7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsd0I7Ozs7Ozs7Ozs7O0FDQUEsb0MiLCJmaWxlIjoiZWUtbW9kZWwuMmVhMGJiNTMwMzBiYTA4M2Q1ODIuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IEV4Y2VwdGlvbiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHsgc3ByaW50ZiwgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzQXJyYXksIGlzRW1wdHksIGlzTWFwIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIGtleSBleGlzdHMgaW4gdGhlIHByb3ZpZGVkIGVudGl0eSBvYmplY3QuXG4gKiBUaGlzIGlzIHVzZWQgd2hlbiBjYWxsaW5nIGNvZGUgd2FudHMgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93bi5cbiAqXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBrZXlcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGVudGl0eVxuICogQHBhcmFtIHsgc3RyaW5nIH0gbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9ICBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoZSBwcm92aWRlZCBlbnRpdHkgZG9lcyBub3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBoYXZlIHRoZSBnaXZlbiBrZXkuXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRFbnRpdHlIYXNLZXkgPSAoIGtleSwgZW50aXR5LCBtZXNzYWdlID0gJycgKSA9PiB7XG5cdGlmICggbWVzc2FnZSA9PT0gJycgKSB7XG5cdFx0bWVzc2FnZSA9IHNwcmludGYoXG5cdFx0XHRfXyhcblx0XHRcdFx0J1RoZSBwcm92aWRlZCBlbnRpdHkgKCVzKSBkb2VzIG5vdCBoYXZlIHRoZSBnaXZlbiBwcm9wZXJ0eSAoJXMpJyxcblx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHRcdCksXG5cdFx0XHRlbnRpdHksXG5cdFx0XHRrZXksXG5cdFx0KTtcblx0fVxuXHRpZiAoICEgZW50aXR5Lmhhc093blByb3BlcnR5KCBrZXkgKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiBwYXRoIGluIHRoZSBwcm92aWRlZCBpbW11dGFibGUgb2JqZWN0IGV4aXN0cy5cbiAqIFRoaXMgaXMgdXNlZCB3aGVuIGNhbGxpbmcgY29kZSB3YW50cyBhbiBleGNlcHRpb24gdG8gYmUgdGhyb3duIGlmIHRoZSBnaXZlblxuICogc2VhcmNoIHBhdGggYXJyYXkgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGltbXV0YWJsZSBvYmplY3QuXG4gKlxuICogSWYgdGhlIGltbXV0YWJsZSBvYmplY3QgaXMgc2V0dXAgbGlrZSB0aGlzOlxuICpcbiAqIGltbXV0YWJsZSA9IEltbXV0YWJsZS5NYXAoKS5zZXQoICdldmVudCcsIEltbXV0YWJsZS5NYXAoKS5zZXQoIDEwLCBFdmVudCApICk7XG4gKlxuICogVGhlbiBhIHZhbGlkIHNlYXJjaGFibGUgcGF0aCBjb3VsZCBiZSBgWyAnZXZlbnQnLCAxMCBdYC4gIEFuIGludmFsaWQgcGF0aFxuICogd291bGQgYmUgYFsgJ2RhdGV0aW1lJywgMTAgXWBcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYXRoICBTZWFyY2hhYmxlIHBhdGggZm9yIHRoZSBpbW11dGFibGUgb2piZWN0IHRvIHZlcmlmeS5cbiAqIEBwYXJhbSB7SW1tdXRhYmxlLk1hcHxJbW11dGFibGUuU2V0fSBpbW11dGFibGUgIEFuIGltbXV0YWJsZSBvYmplY3QgKE1hcCwgU2V0LCBMaXN0IGV0YylcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIEEgY3VzdG9tIG1lc3NhZ2UgdG8gdXNlLlxuICogQHRocm93cyBFeGNlcHRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydEltbXV0YWJsZU9iamVjdEhhc1BhdGggPSAoXG5cdHBhdGgsXG5cdGltbXV0YWJsZSxcblx0bWVzc2FnZSA9ICcnXG4pID0+IHtcblx0aWYgKCBtZXNzYWdlID09PSAnJyApIHtcblx0XHRtZXNzYWdlID0gc3ByaW50Zihcblx0XHRcdF9fKFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIGltbXV0YWJsZSBvYmplY3QgKCVzKSBkb2VzIG5vdCBoYXZlIHRoZSBnaXZlbiBwYXRoICglcyknLFxuXHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdFx0KSxcblx0XHRcdGltbXV0YWJsZSxcblx0XHRcdHBhdGgsXG5cdFx0KTtcblx0fVxuXHRpZiAoICEgaW1tdXRhYmxlLmhhc0luKCBwYXRoICkgKSB7XG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbiggbWVzc2FnZSApO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gYXJyYXkuXG4gKlxuICogQHBhcmFtIHsqfSBpdGVtc1xuICogQHBhcmFtIHsgc3RyaW5nIH0gIG1lc3NhZ2VcbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfSBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5cbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydElzQXJyYXkgPSAoIGl0ZW1zLCBtZXNzYWdlID0gJycgKSA9PiB7XG5cdGlmICggbWVzc2FnZSA9PT0gJycgKSB7XG5cdFx0bWVzc2FnZSA9IF9fKCAnVGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBhbiBhcnJheS4nLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdH1cblx0aWYgKCAhIGlzQXJyYXkoIGl0ZW1zICkgKSB7XG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbiggbWVzc2FnZSApO1xuXHR9XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBlbXB0eSBvciBub3QuXG4gKlxuICogQ2FsbCB0aGlzIHZhbGlkYXRvciB3aGVuIHlvdSB3YW50IHRvIG1ha2Ugc3VyZSB0aGUgdmFsdWUgaXMgTk9UIGVtcHR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gaXRlbXNcbiAqIEBwYXJhbSB7IHN0cmluZyB9IG1lc3NhZ2VcbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfSBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBlbXB0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydElzTm90RW1wdHkgPSAoIGl0ZW1zLCBtZXNzYWdlID0gJycgKSA9PiB7XG5cdGlmICggbWVzc2FnZSA9PT0gJycgKSB7XG5cdFx0bWVzc2FnZSA9IF9fKFxuXHRcdFx0J1RoZSBwcm92aWRlZCBpdGVtcyBtdXN0IG5vdCBiZSBlbXB0eScsXG5cdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdCk7XG5cdH1cblx0aWYgKCBpc0VtcHR5KCBpdGVtcyApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGEgTWFwIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0geyp9IGl0ZW1cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydElzTWFwID0gKCBpdGVtLCBtZXNzYWdlID0gJycgKSA9PiB7XG5cdGlmICggbWVzc2FnZSA9PT0gJycgKSB7XG5cdFx0bWVzc2FnZSA9IF9fKFxuXHRcdFx0J1RoZSBwcm92aWRlZCBpdGVtIG11c3QgYmUgYSBNYXAgb2JqZWN0Jyxcblx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHQpO1xuXHR9XG5cdGlmICggISBpc01hcCggaXRlbSApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcbiIsImV4cG9ydCBjb25zdCBNT0RFTF9OQU1FID0gJ2F0dGVuZGVlJztcbiIsImV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfQVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcbn0gZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgeyBSRUdJU1RSQVRJT05fU1RBVFVTX0lEUyB9IGZyb20gJy4uL3JlZ2lzdHJhdGlvbi9jb25zdGFudHMnO1xuXG5leHBvcnQgY29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0aWQ6ICdBVFRfSUQnLFxuXHRsYXN0TmFtZU9ubHk6ICdBVFRfbG5hbWUnLFxuXHRmaXJzdE5hbWVPbmx5OiAnQVRUX2ZuYW1lJyxcblx0Zmlyc3RUaGVuTGFzdE5hbWU6IFsgJ0FUVF9mbmFtZScsICdBVFRfbG5hbWUnIF0sXG5cdGxhc3RUaGVuRmlyc3ROYW1lOiBbICdBVFRfbG5hbWUnLCAnQVRUX2ZuYW1lJyBdLFxufTtcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRmb3JFdmVudElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JEYXRldGltZUlkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JUaWNrZXRJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yU3RhdHVzSWQ6IFByb3BUeXBlcy5vbmVPZiggUkVHSVNUUkFUSU9OX1NUQVRVU19JRFMgKSxcblx0Zm9yUmVnaXN0cmF0aW9uSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdHNob3dHcmF2YXRhcjogUHJvcFR5cGVzLmJvb2wsXG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBPYmplY3Qua2V5cyggb3JkZXJCeU1hcCApICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0fSApLFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDEwMCxcblx0XHRvcmRlckJ5OiAnbGFzdFRoZW5GaXJzdE5hbWUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9BU0MsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZFxuICogaW4gYSBSRVNUIHF1ZXJ5IGZyb20gdGhlIGNvbnRleHQgb2YgYSBhdHRlbmRlZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gXHRcdG9yZGVyQnlcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBcdFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nXG4gKiBcdFx0XHRcdFx0XHRmb3IgdGhlIFJFU1QgcXVlcnkgZm9yIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gYXR0ZW5kZWVzIGVuZHBvaW50IHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRXZlbnRJZCAgICBcdElEIG9mIEV2ZW50IHRvIHJldHJpZXZlIGF0dGVuZGVlcyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JEYXRldGltZUlkIFx0SUQgb2YgRGF0ZXRpbWUgdG8gcmV0cmlldmUgYXR0ZW5kZWVzIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvclRpY2tldElkIFx0XHRJRCBvZiBUaWNrZXQgdG8gcmV0cmlldmUgYXR0ZW5kZWVzIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvclJlZ2lzdHJhdGlvbklkXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9yU3RhdHVzSWQgXHRcdElEIG9mIFN0YXR1cyB0byByZXRyaWV2ZSBhdHRlbmRlZXMgZm9yXG4gKiBAcGFyYW0ge3N0cmluZ30gc2hvd0dyYXZhdGFyIFx0Qm9vbGVhbiB0b2dnbGUgZm9yIHdoZXRoZXIgdG8gZGlzcGxheSB1c2VyIEdyYXZhdGFyXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgIFx0VGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7XG5cdGZvckV2ZW50SWQgPSAwLFxuXHRmb3JEYXRldGltZUlkID0gMCxcblx0Zm9yVGlja2V0SWQgPSAwLFxuXHRmb3JSZWdpc3RyYXRpb25JZCA9IDAsXG5cdGZvclN0YXR1c0lkID0gJ1JBUCcsXG5cdHNob3dHcmF2YXRhciA9IGZhbHNlLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblxuXHQvLyBlbnN1cmUgdGhhdCBlbnRpdHkgSURzIGFyZSBpbnRlZ2Vyc1xuXHRmb3JSZWdpc3RyYXRpb25JZCA9IHBhcnNlSW50KCBmb3JSZWdpc3RyYXRpb25JZCwgMTAgKTtcblx0Zm9yVGlja2V0SWQgPSBwYXJzZUludCggZm9yVGlja2V0SWQsIDEwICk7XG5cdGZvckRhdGV0aW1lSWQgPSBwYXJzZUludCggZm9yRGF0ZXRpbWVJZCwgMTAgKTtcblx0Zm9yRXZlbnRJZCA9IHBhcnNlSW50KCBmb3JFdmVudElkLCAxMCApO1xuXG5cdC8vIG9yZGVyIG9mIHByaW9yaXR5IGZvciBwcm92aWRlZCBhcmd1bWVudHMuXG5cdGlmICggZm9yUmVnaXN0cmF0aW9uSWQgIT09IDAgJiYgISBpc05hTiggZm9yUmVnaXN0cmF0aW9uSWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCBgd2hlcmVbUmVnaXN0cmF0aW9uLlJFR19JRF09JHsgZm9yUmVnaXN0cmF0aW9uSWQgfWAgKTtcblx0fSBlbHNlIGlmICggZm9yVGlja2V0SWQgIT09IDAgJiYgISBpc05hTiggZm9yVGlja2V0SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCBgd2hlcmVbUmVnaXN0cmF0aW9uLlRpY2tldC5US1RfSURdPSR7IGZvclRpY2tldElkIH1gICk7XG5cdH0gZWxzZSBpZiAoIGZvckRhdGV0aW1lSWQgIT09IDAgJiYgISBpc05hTiggZm9yRGF0ZXRpbWVJZCApICkge1xuXHRcdHdoZXJlLnB1c2goIGB3aGVyZVtSZWdpc3RyYXRpb24uVGlja2V0LkRhdGV0aW1lLkRUVF9JRF09JHsgZm9yRGF0ZXRpbWVJZCB9YCApO1xuXHR9IGVsc2UgaWYgKCBmb3JFdmVudElkICE9PSAwICYmICEgaXNOYU4oIGZvckV2ZW50SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCBgd2hlcmVbUmVnaXN0cmF0aW9uLkVWVF9JRF09JHsgZm9yRXZlbnRJZCB9YCApO1xuXHR9XG5cblx0aWYgKCBSRUdJU1RSQVRJT05fU1RBVFVTX0lEUy5pbmNsdWRlcyggZm9yU3RhdHVzSWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCBgd2hlcmVbUmVnaXN0cmF0aW9uLlN0YXR1cy5TVFNfSURdPSR7IGZvclN0YXR1c0lkIH1gICk7XG5cdH1cblx0aWYgKCBzaG93R3JhdmF0YXIgPT09IHRydWUgKSB7XG5cdFx0d2hlcmUucHVzaCggJ2NhbGN1bGF0ZT11c2VyX2F2YXRhcicgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgKiBhcyBkYXRlRm9ybWF0cyBmcm9tICdAZXZlbnRlc3ByZXNzby9oZWxwZXJzJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIG9uIHByb3ZpZGVkIGVudGl0aWVzLiAgRG9lcyBub3QgbXV0YXRlIG9yaWdpbmFsXG4gKiBlbnRpdGllcy5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzICBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IHN0cmluZyB9IGZvcm1hdCAgVGhlIGZvcm1hdCB0byB0cmFuc2Zvcm0gdGhlIGRhdGUgZmllbGQgdmFsdWVzIHRvLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IEFycmF5IH0gIFJldHVybnMgYSBuZXcgYXJyYXkgb2YgbmV3IGVudGl0aWVzIHdpdGggdGhlIGRhdGUgZmllbGRcbiAqICAgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RGF0ZXNPbkVudGl0aWVzID0gKFxuXHRlbnRpdGllcyA9IFtdLFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGZvcm1hdCA9IGRhdGVGb3JtYXRzLkRBVEVfVElNRV9GT1JNQVRfSVNPODYwMSxcblx0bG9jYWwgPSB0cnVlLFxuKSA9PiB7XG5cdGlmICggaXNFbXB0eSggZW50aXRpZXMgKSB8fCBpc0VtcHR5KCBlbnRpdHlEYXRlRmllbGRzICkgKSB7XG5cdFx0cmV0dXJuIGVudGl0aWVzO1xuXHR9XG5cdGNvbnN0IGZvcm1hdHRlZEVudGl0aWVzID0gW107XG5cdGVudGl0aWVzLmZvckVhY2goICggZW50aXR5ICkgPT4ge1xuXHRcdGZvcm1hdHRlZEVudGl0aWVzLnB1c2goIGZvcm1hdERhdGVzT25FbnRpdHkoXG5cdFx0XHRlbnRpdHksXG5cdFx0XHRlbnRpdHlEYXRlRmllbGRzLFxuXHRcdFx0Zm9ybWF0LFxuXHRcdFx0bG9jYWwsXG5cdFx0KSApO1xuXHR9ICk7XG5cdHJldHVybiBmb3JtYXR0ZWRFbnRpdGllcztcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgb24gdGhlIHByb3ZpZGVkIGVudGl0eS4gIERvZXMgbm90IG11dGF0ZSBvcmlnaW5hbFxuICogZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGVudGl0eSAgQW4gZW50aXR5XG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgc3RyaW5nIH0gZm9ybWF0ICBUaGUgZm9ybWF0IHRvIHRyYW5zZm9ybSB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgdG8uXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICBXaGV0aGVyIG9yIG5vdCB0byBjb252ZXJ0IHRoZSBkYXRlIGZpZWxkIHZhbHVlXG4gKiAgIHRvIHRoZSBsb2NhbCB0aW1lem9uZSBmb3IgdGhlIGhvc3QuXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gIFJldHVybnMgYSBuZXcgZW50aXR5IHdpdGggdGhlIGRhdGUgZmllbGQgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RGF0ZXNPbkVudGl0eSA9IChcblx0ZW50aXR5ID0ge30sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0Zm9ybWF0ID0gZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9JU084NjAxLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0Y29uc3QgbmV3RW50aXR5ID0geyAuLi5lbnRpdHkgfTtcblx0ZW50aXR5RGF0ZUZpZWxkcy5mb3JFYWNoKCAoIGRhdGVGaWVsZCApID0+IHtcblx0XHRpZiAoIG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0gKSB7XG5cdFx0XHRuZXdFbnRpdHlbIGRhdGVGaWVsZCBdID0gZGF0ZUZvcm1hdHMuZm9ybWF0RGF0ZVN0cmluZyhcblx0XHRcdFx0bmV3RW50aXR5WyBkYXRlRmllbGQgXSxcblx0XHRcdFx0Zm9ybWF0LFxuXHRcdFx0XHRsb2NhbCxcblx0XHRcdCk7XG5cdFx0fVxuXHR9ICk7XG5cdHJldHVybiBuZXdFbnRpdHk7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIHRvIG15c3FsIGZvcm1hdCBvbiBwcm92aWRlZCBlbnRpdGllcy4gIERvZXMgbm90XG4gKiBtdXRhdGUgb3JpZ2luYWwgZW50aXRpZXMuXG4gKlxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdGllcyAgQW4gYXJyYXkgb2YgZW50aXR5IG9iamVjdHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyAgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICBXaGV0aGVyIG9yIG5vdCB0byBjb252ZXJ0IHRoZSBkYXRlIGZpZWxkIHZhbHVlXG4gKiAgIHRvIHRoZSBsb2NhbCB0aW1lem9uZSBmb3IgdGhlIGhvc3QuXG4gKiBAcmV0dXJuIHsgQXJyYXkgfSAgUmV0dXJucyBhIG5ldyBhcnJheSBvZiBuZXcgZW50aXRpZXMgd2l0aCB0aGUgZGF0ZSBmaWVsZFxuICogICB2YWx1ZXMgZm9ybWF0dGVkXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXRFbnRpdGllc0RhdGVzVG9NeXNxbCA9IChcblx0ZW50aXRpZXMgPSBbXSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0cmV0dXJuIGZvcm1hdERhdGVzT25FbnRpdGllcyhcblx0XHRlbnRpdGllcyxcblx0XHRlbnRpdHlEYXRlRmllbGRzLFxuXHRcdGRhdGVGb3JtYXRzLkRBVEVfVElNRV9GT1JNQVRfTVlTUUwsXG5cdFx0bG9jYWwsXG5cdCk7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIHRvIG15c3FsIGZvcm1hdCBvbiBwcm92aWRlZCBlbnRpdHkuICBEb2VzIG5vdFxuICogbXV0YXRlIG9yaWdpbmFsIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHkgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IE9iamVjdCB9ICBSZXR1cm5zIGEgbmV3IGVudGl0eSB3aXRoIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEVudGl0eURhdGVzVG9NeXNxbCA9IChcblx0ZW50aXR5ID0ge30sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0bG9jYWwgPSB0cnVlLFxuKSA9PiB7XG5cdHJldHVybiBmb3JtYXREYXRlc09uRW50aXR5KFxuXHRcdGVudGl0eSxcblx0XHRlbnRpdHlEYXRlRmllbGRzLFxuXHRcdGRhdGVGb3JtYXRzLkRBVEVfVElNRV9GT1JNQVRfTVlTUUwsXG5cdFx0bG9jYWwsXG5cdCk7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIHRvIHRoZSBzaXRlIGZvcm1hdCBvbiBwcm92aWRlZCBlbnRpdGllcy4gIERvZXMgbm90XG4gKiBtdXRhdGUgb3JpZ2luYWwgZW50aXRpZXMuXG4gKlxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdGllcyAgQW4gYXJyYXkgb2YgZW50aXR5IG9iamVjdHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyAgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICBXaGV0aGVyIG9yIG5vdCB0byBjb252ZXJ0IHRoZSBkYXRlIGZpZWxkIHZhbHVlXG4gKiAgIHRvIHRoZSBsb2NhbCB0aW1lem9uZSBmb3IgdGhlIGhvc3QuXG4gKiBAcmV0dXJuIHsgQXJyYXkgfSAgUmV0dXJucyBhIG5ldyBhcnJheSBvZiBuZXcgZW50aXRpZXMgd2l0aCB0aGUgZGF0ZSBmaWVsZFxuICogICB2YWx1ZXMgZm9ybWF0dGVkXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXRFbnRpdGllc0RhdGVzVG9TaXRlID0gKFxuXHRlbnRpdGllcyA9IFtdLFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRyZXR1cm4gZm9ybWF0RGF0ZXNPbkVudGl0aWVzKFxuXHRcdGVudGl0aWVzLFxuXHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0ZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9TSVRFLFxuXHRcdGxvY2FsLFxuXHQpO1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlIGZpZWxkcyB0byB0aGUgc2l0ZSBmb3JtYXQgb24gcHJvdmlkZWQgZW50aXR5LiAgRG9lcyBub3RcbiAqIG11dGF0ZSBvcmlnaW5hbCBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gZW50aXR5ICBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBPYmplY3QgfSAgUmV0dXJucyBhIG5ldyBlbnRpdHkgd2l0aCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgZm9ybWF0dGVkXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXRFbnRpdHlEYXRlc1RvU2l0ZSA9IChcblx0ZW50aXR5ID0ge30sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0bG9jYWwgPSB0cnVlLFxuKSA9PiB7XG5cdHJldHVybiBmb3JtYXREYXRlc09uRW50aXR5KFxuXHRcdGVudGl0eSxcblx0XHRlbnRpdHlEYXRlRmllbGRzLFxuXHRcdGRhdGVGb3JtYXRzLkRBVEVfVElNRV9GT1JNQVRfU0lURSxcblx0XHRsb2NhbCxcblx0KTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgZGF0ZSBmaWVsZCB2YWx1ZXMgdG8gbW9tZW50IG9iamVjdHMgZm9yIHRoZSBwcm92aWRlZCBlbnRpdGllcy5cbiAqIERvZXMgbm90IG11dGF0ZSBvcmlnaW5hbCBlbnRpdGllcy5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcmV0dXJuIHsgQXJyYXkgfSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIG5ldyBlbnRpdGllcyB3aXRoIHRoZSBkYXRlIGZpZWxkXG4gKiAgIHZhbHVlcyBjb252ZXJ0ZWQgdG8gbW9tZW50IG9iamVjdHMuXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0RW50aXRpZXNEYXRlc1RvTW9tZW50ID0gKFxuXHRlbnRpdGllcyA9IFtdLFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG4pID0+IHtcblx0aWYgKCBpc0VtcHR5KCBlbnRpdGllcyApIHx8IGlzRW1wdHkoIGVudGl0eURhdGVGaWVsZHMgKSApIHtcblx0XHRyZXR1cm4gZW50aXRpZXM7XG5cdH1cblx0Y29uc3QgZm9ybWF0dGVkRW50aXRpZXMgPSBbXTtcblx0ZW50aXRpZXMuZm9yRWFjaCggKCBlbnRpdHkgKSA9PiB7XG5cdFx0Zm9ybWF0dGVkRW50aXRpZXMucHVzaCggY29udmVydEVudGl0eURhdGVzVG9Nb21lbnQoXG5cdFx0XHRlbnRpdHksXG5cdFx0XHRlbnRpdHlEYXRlRmllbGRzLFxuXHRcdCkgKTtcblx0fSApO1xuXHRyZXR1cm4gZm9ybWF0dGVkRW50aXRpZXM7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGRhdGUgZmllbGQgdmFsdWVzIHRvIG1vbWVudCBvYmplY3RzIGZvciB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogRG9lcyBub3QgbXV0YXRlIG9yaWdpbmFsIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHkgQW4gZW50aXR5LlxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHJldHVybiB7IE9iamVjdCB9IFJldHVybnMgYSBuZXcgZW50aXR5IHdpdGggdGhlIGRhdGUgZmllbGQgdmFsdWVzIGNvbnZlcnRlZFxuICogICB0byBtb21lbnQgb2JqZWN0cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRFbnRpdHlEYXRlc1RvTW9tZW50ID0gKFxuXHRlbnRpdHkgPSB7fSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuKSA9PiB7XG5cdGNvbnN0IG5ld0VudGl0eSA9IHsgLi4uZW50aXR5IH07XG5cdGVudGl0eURhdGVGaWVsZHMuZm9yRWFjaCggKCBkYXRlRmllbGQgKSA9PiB7XG5cdFx0aWYgKCBuZXdFbnRpdHlbIGRhdGVGaWVsZCBdICkge1xuXHRcdFx0bmV3RW50aXR5WyBkYXRlRmllbGQgXSA9IGRhdGVGb3JtYXRzLnN0cmluZ1RvTW9tZW50KFxuXHRcdFx0XHRuZXdFbnRpdHlbIGRhdGVGaWVsZCBdLFxuXHRcdFx0KTtcblx0XHR9XG5cdH0gKTtcblx0cmV0dXJuIG5ld0VudGl0eTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNBcnJheSwgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgUVVFUllfT1JERVJfQVNDID0gJ0FTQyc7XG5leHBvcnQgY29uc3QgUVVFUllfT1JERVJfREVTQyA9ICdERVNDJztcbmV4cG9ydCBjb25zdCBBTExPV0VEX09SREVSX1ZBTFVFUyA9IFsgJ2FzYycsICdkZXNjJywgJ0FTQycsICdERVNDJyBdO1xuZXhwb3J0IGNvbnN0IEdSRUFURVJfVEhBTiA9IGVuY29kZVVSSUNvbXBvbmVudCggJz4nICk7XG5leHBvcnQgY29uc3QgTEVTU19USEFOID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPCcgKTtcbmV4cG9ydCBjb25zdCBHUkVBVEVSX1RIQU5fQU5EX0VRVUFMID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPj0nICk7XG5leHBvcnQgY29uc3QgTEVTU19USEFOX0FORF9FUVVBTCA9IGVuY29kZVVSSUNvbXBvbmVudCggJzw9JyApO1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHBhcmFtIHsgZnVuY3Rpb24gfSB3aGVyZUNvbmRpdGlvbnMgIEEgZnVuY3Rpb24gZm9yIHByZXBwaW5nIHRoZSB3aGVyZVxuICogXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25kaXRpb25zIGZyb20gdGhlIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IGZ1bmN0aW9uIH0gbWFwT3JkZXJCeVx0XHRBIGZ1bmN0aW9uIGZvciBtYXBwaW5nIGluY29taW5nIG9yZGVyX2J5XG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdHN0cmluZ3MgdG8gdGhlIHZhbHVlIG5lZWRlZCBmb3IgdGhlXG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdHF1ZXJ5X3N0cmluZy5cbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgXHRcdFx0XHRcdFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKFxuXHRxdWVyeURhdGEgPSB7fSxcblx0d2hlcmVDb25kaXRpb25zID0gKCkgPT4gbnVsbCxcblx0bWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IG9yZGVyQnksXG4pID0+IHtcblx0Y29uc3Qgd2hlcmUgPSB3aGVyZUNvbmRpdGlvbnMoIHF1ZXJ5RGF0YSApO1xuXHRjb25zdCB7IGxpbWl0LCBvcmRlciwgb3JkZXJCeSwgZGVmYXVsdFdoZXJlQ29uZGl0aW9ucyB9ID0gcXVlcnlEYXRhO1xuXHRjb25zdCBxdWVyeVBhcmFtcyA9IFtdO1xuXHRpZiAoICEgaXNVbmRlZmluZWQoIGxpbWl0ICkgKSB7XG5cdFx0cXVlcnlQYXJhbXMucHVzaCggYGxpbWl0PSR7IGxpbWl0IH1gICk7XG5cdH1cblx0aWYgKCAhIGlzVW5kZWZpbmVkKCBkZWZhdWx0V2hlcmVDb25kaXRpb25zICkgKSB7XG5cdFx0cXVlcnlQYXJhbXMucHVzaChcblx0XHRcdGBkZWZhdWx0X3doZXJlX2NvbmRpdGlvbnM9JHsgZGVmYXVsdFdoZXJlQ29uZGl0aW9ucyB9YFxuXHRcdCk7XG5cdH1cblx0aWYgKCAhIGlzVW5kZWZpbmVkKCBtYXBPcmRlckJ5KCBvcmRlckJ5ICkgKSApIHtcblx0XHRpZiAoIGlzQXJyYXkoIG1hcE9yZGVyQnkoIG9yZGVyQnkgKSApICkge1xuXHRcdFx0Zm9yICggY29uc3QgZmllbGQgb2YgbWFwT3JkZXJCeSggb3JkZXJCeSApICkge1xuXHRcdFx0XHRxdWVyeVBhcmFtcy5wdXNoKCBgb3JkZXJfYnlbJHsgZmllbGQgfV09JHsgb3JkZXIgfWAgKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cXVlcnlQYXJhbXMucHVzaCggYG9yZGVyPSR7IG9yZGVyIH1gICk7XG5cdFx0XHRxdWVyeVBhcmFtcy5wdXNoKCBgb3JkZXJfYnk9JHsgbWFwT3JkZXJCeSggb3JkZXJCeSApIH1gICk7XG5cdFx0fVxuXHR9XG5cdGxldCBxdWVyeVN0cmluZyA9IHF1ZXJ5UGFyYW1zLmpvaW4oICcmJyApO1xuXHRpZiAoIHdoZXJlICkge1xuXHRcdHF1ZXJ5U3RyaW5nICs9ICcmJyArIHdoZXJlO1xuXHR9XG5cdHJldHVybiBxdWVyeVN0cmluZztcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAnY2hlY2tpbic7XG5cbmV4cG9ydCBjb25zdCBDSEVDS0lOX1NUQVRVU19JRCA9IHtcblx0U1RBVFVTX0NIRUNLRURfT1VUOiBmYWxzZSxcblx0U1RBVFVTX0NIRUNLRURfSU46IHRydWUsXG5cdFNUQVRVU19DSEVDS0VEX05FVkVSOiAyLFxufTtcblxuZXhwb3J0IGNvbnN0IENIRUNLSU5fU1RBVFVTX0lEUyA9IHZhbHVlcyhcblx0Q0hFQ0tJTl9TVEFUVVNfSURcbik7XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgcHJldHR5U3RhdHVzIH0gZnJvbSAnLi4vc3RhdHVzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfREVTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG59IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0ICogYXMgY2hlY2tpblN0YXR1cyBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0Zm9yRGF0ZXRpbWVJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yRXZlbnRJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yUmVnaXN0cmF0aW9uSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclRpY2tldElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JTdGF0dXNJZDogUHJvcFR5cGVzLm9uZU9mKCBjaGVja2luU3RhdHVzLkNIRUNLSU5fU1RBVFVTX0lEUyApLFxuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdFx0J0NIS19JRCcsXG5cdFx0XHQnUkVHX0lEJyxcblx0XHRcdCdDSEtfdGltZXN0YW1wJyxcblx0XHRcdCdEVFRfSUQnLFxuXHRcdF0gKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHR9ICksXG59O1xuXG5leHBvcnQgY29uc3Qgb3B0aW9uc0VudGl0eU1hcCA9IHtcblx0ZGVmYXVsdDogKCkgPT4ge1xuXHRcdHJldHVybiBbXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmVsOiBwcmV0dHlTdGF0dXMoXG5cdFx0XHRcdFx0Y2hlY2tpblN0YXR1cy5DSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9PVVRcblx0XHRcdFx0KSxcblx0XHRcdFx0dmFsdWU6IGNoZWNraW5TdGF0dXMuQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfT1VULFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bGFiZWw6IHByZXR0eVN0YXR1cyhcblx0XHRcdFx0XHRjaGVja2luU3RhdHVzLkNIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX0lOXG5cdFx0XHRcdCksXG5cdFx0XHRcdHZhbHVlOiBjaGVja2luU3RhdHVzLkNIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX0lOLFxuXHRcdFx0fSxcblx0XHRdO1xuXHR9LFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDEwMCxcblx0XHRvcmRlckJ5OiAnQ0hLX3RpbWVzdGFtcCcsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYSByZWdpc3RyYXRpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHRpbWVzdGFtcDogJ0NIS190aW1lc3RhbXAnLFxuXHRcdGlkOiAnQ0hLX0lEJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gcmVnaXN0cmF0aW9ucyBlbmRwb2ludCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZvckRhdGV0aW1lSWQgICAgXHRJRCBvZiBFdmVudCB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgICAgSUQgb2YgQXR0ZW5kZWUgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JSZWdpc3RyYXRpb25JZCBJRCBvZiBUcmFuc2FjdGlvbiB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvclRpY2tldElkIFx0XHRJRCBvZiBUaWNrZXQgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JTdGF0dXNJZCBcdFx0SUQgb2YgU3RhdHVzIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgIFx0VGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7XG5cdGZvckRhdGV0aW1lSWQgPSAwLFxuXHRmb3JFdmVudElkID0gMCxcblx0Zm9yUmVnaXN0cmF0aW9uSWQgPSAwLFxuXHRmb3JUaWNrZXRJZCA9IDAsXG5cdGZvclN0YXR1c0lkID0gJycsXG59ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXHRmb3JFdmVudElkID0gcGFyc2VJbnQoIGZvckV2ZW50SWQsIDEwICk7XG5cdGlmICggZm9yRXZlbnRJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JFdmVudElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1JlZ2lzdHJhdGlvbi5FVlRfSURdPScgKyBmb3JFdmVudElkICk7XG5cdH1cblx0Zm9yRGF0ZXRpbWVJZCA9IHBhcnNlSW50KCBmb3JEYXRldGltZUlkLCAxMCApO1xuXHRpZiAoIGZvckRhdGV0aW1lSWQgIT09IDAgJiYgISBpc05hTiggZm9yRGF0ZXRpbWVJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtEVFRfSURdPScgKyBmb3JEYXRldGltZUlkICk7XG5cdH1cblx0Zm9yUmVnaXN0cmF0aW9uSWQgPSBwYXJzZUludCggZm9yUmVnaXN0cmF0aW9uSWQsIDEwICk7XG5cdGlmICggZm9yUmVnaXN0cmF0aW9uSWQgIT09IDAgJiYgISBpc05hTiggZm9yUmVnaXN0cmF0aW9uSWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbUkVHX0lEXT0nICsgZm9yUmVnaXN0cmF0aW9uSWQgKTtcblx0fVxuXHRmb3JUaWNrZXRJZCA9IHBhcnNlSW50KCBmb3JUaWNrZXRJZCwgMTAgKTtcblx0aWYgKCBmb3JUaWNrZXRJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JUaWNrZXRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtSZWdpc3RyYXRpb24uVEtUX0lEXT0nICsgZm9yVGlja2V0SWQgKTtcblx0fVxuXHRpZiAoIGZvclN0YXR1c0lkICE9PSAnJyAmJiBmb3JTdGF0dXNJZCAhPT0gbnVsbCApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbQ0hLX2luXT0nICsgZm9yU3RhdHVzSWQgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsImltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBNT0RFTF9OQU1FID0gJ2RhdGV0aW1lJztcblxuZXhwb3J0IGNvbnN0IERBVEVUSU1FX1NUQVRVU19JRCA9IHtcblx0U09MRF9PVVQ6ICdEVFMnLFxuXHRBQ1RJVkU6ICdEVEEnLFxuXHRVUENPTUlORzogJ0RUVScsXG5cdFBPU1RQT05FRDogJ0RUUCcsXG5cdENBTkNFTExFRDogJ0RUQycsXG5cdEVYUElSRUQ6ICdEVEUnLFxuXHRJTkFDVElWRTogJ0RUSScsXG59O1xuXG5leHBvcnQgY29uc3QgREFURVRJTUVfU1RBVFVTX0lEUyA9IHZhbHVlcyggREFURVRJTUVfU1RBVFVTX0lEICk7XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgYmFzZUZvcm1hdHRlciBmcm9tICcuLi9iYXNlLWRhdGUtZm9ybWF0dGVyJztcblxuLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGZvck93biwgcHVsbEF0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7XG5cdFRJTUVfRk9STUFUX1NJVEUsXG5cdERBVEVfVElNRV9GT1JNQVRfU0lURSxcblx0YWxsRGF0ZVRpbWVzQXNTdHJpbmcsXG5cdFNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby9oZWxwZXJzJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogQXJyYXkgb2YgZmllbGRzIHRoYXQgaGF2ZSBkYXRlIGluZm9ybWF0aW9uXG4gKiBAdHlwZSB7IHN0cmluZ1tdIH1cbiAqL1xuZXhwb3J0IGNvbnN0IERBVEVfRklFTERTID0gW1xuXHQnRFRUX0VWVF9zdGFydCcsXG5cdCdEVFRfRVZUX2VuZCcsXG5dO1xuXG4vKipcbiAqIFdpbGwgaG9sZCB0aGUgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGxpc3Qgb2YgZm9ybWF0dGVycyBmb3IgZGF0ZXMuICBGb3JtYXR0ZXJzXG4gKiBhcmUgZnVuY3Rpb25zIGRlZmluZWQgaW4gYC4uL2Jhc2UtZGF0ZS1mb3JtYXR0ZXJgIGJ1dCB3cmFwcGVkIGJ5IGR5bmFtaWNhbGx5XG4gKiBnZW5lcmF0ZWQgZnVuY3Rpb25zIChjYWxsYWJsZSB2aWEgc2FtZSBuYW1lKSB0aGF0IGF1dG9tYXRpY2FsbHkgcmVjZWl2ZSB0aGVcbiAqIGNvcnJlY3QgZGF0ZUZpZWxkc01hcCBhcmd1bWVudC5cbiAqXG4gKiBFZy4gIGAuLi9iYXNlLWRhdGUtZm9ybWF0dGVyIGhhc1xuICogZm9ybWF0RGF0ZXNPbkVudGl0aWVzKCBlbnRpdGllcywgZW50aXR5RGF0ZUZpZWxkcywgZm9ybWF0LCBsb2NhbCApO1xuICogV2hlbiBpbXBvcnRpbmcgYGZvcm1hdERhdGVzT25FbnRpdGllc2AgZnJvbSB0aGlzIGZpbGUsIHlvdSBjYW4gY2FsbCBpdCBzaW1wbHlcbiAqIGJ5IGRvaW5nIHRoaXM6XG4gKlxuICogZm9ybWF0RGF0ZXNPbkVudGl0aWVzKCBkYXRlVGltZU9iamVjdHMsIGZvcm1hdCwgbG9jYWwgKTtcbiAqXG4gKiBOb3RpY2UgdGhhdCBpdCdzIGNhbGxlZCB3aXRob3V0IHRoZSBlbnRpdHlEYXRlRmllbGRzIGFyZ3VtZW50IGJlY2F1c2UgdGhhdCdzXG4gKiBwcm92aWRlZCBieSB0aGlzIGdlbmVyYXRvci5cbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IGZvcm1hdHRlcnMgPSB7fTtcblxuZm9yT3duKCBiYXNlRm9ybWF0dGVyLCAoIGltcGxlbWVudGF0aW9uLCBmdW5jdGlvbk5hbWUgKSA9PiB7XG5cdGZvcm1hdHRlcnNbIGZ1bmN0aW9uTmFtZSBdID0gKCAuLi5pbmNvbWluZ0FyZ3MgKSA9PiB7XG5cdFx0Y29uc3QgZmlyc3RBcmcgPSBwdWxsQXQoIGluY29taW5nQXJncywgMCApO1xuXHRcdHJldHVybiBpbXBsZW1lbnRhdGlvbiggZmlyc3RBcmdbIDAgXSwgREFURV9GSUVMRFMsIC4uLmluY29taW5nQXJncyApO1xuXHR9O1xufSApO1xuXG4vKipcbiAqIFRoaXMgd2lsbCBzcGl0IG91dCBhIHByZXR0aWZpZWQgbGFiZWwgZm9yIHRoZSBwcm92aWRlZCBEYXRlVGltZSBlbnRpdHkuXG4gKlxuICogSWYgdGhlcmUgaXMgYSBEVFRfbmFtZSwgdGhlIGZvcm1hdCB3aWxsIGJlOlxuICogYERUVF9uYW1lIChEVFRfRVZUX3N0YXJ0IC0gRFRUX0VWVF9lbmQpYFxuICpcbiAqIElmIG5vIERUVF9uYW1lIHRoZW46XG4gKiBgRFRUX0VWVF9zdGFydCAtIERUVF9FVlRfZW5kYFxuICpcbiAqIFRoaXMgd2lsbCBhY2NvdW50IGZvciBpZiBib3RoIHN0YXJ0IGFuZCBlbmQgYXJlIGluIHRoZSBzYW1lIGRheSBhbmQgc2ltcGx5XG4gKiB1c2UgdGltZSBmb3IgdGhlIGVuZCBwYXJ0LlxuICpcbiAqIEBwYXJhbSB7IEJhc2VFbnRpdHkgfSBEYXRlVGltZUVudGl0eVxuICogQHJldHVybiB7IHN0cmluZyB9ICBBIGZvcm1hdHRlZCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBwcm92aWRlZFxuICogICAgRGF0ZVRpbWVFbnRpdHkuXG4gKi9cbmV4cG9ydCBjb25zdCBwcmV0dHlEYXRlRnJvbURhdGVUaW1lID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcblx0bGV0IGNvbnRlbnQgPSAnJztcblx0aWYgKCBpc01vZGVsRW50aXR5T2ZNb2RlbCggRGF0ZVRpbWVFbnRpdHksICdkYXRldGltZScgKSApIHtcblx0XHRpZiAoIERhdGVUaW1lRW50aXR5LkRUVF9FVlRfc3RhcnQuaGFzU2FtZShcblx0XHRcdERhdGVUaW1lRW50aXR5LkRUVF9FVlRfZW5kLFxuXHRcdFx0J2RheSdcblx0XHQpICkge1xuXHRcdFx0Y29udGVudCArPSBhbGxEYXRlVGltZXNBc1N0cmluZyhcblx0XHRcdFx0U0VQQVJBVE9SX1NQQUNFX0RBU0hfU1BBQ0UsXG5cdFx0XHRcdERhdGVUaW1lRW50aXR5LkRUVF9FVlRfc3RhcnQudG9Gb3JtYXQoXG5cdFx0XHRcdFx0REFURV9USU1FX0ZPUk1BVF9TSVRFXG5cdFx0XHRcdCksXG5cdFx0XHRcdERhdGVUaW1lRW50aXR5LkRUVF9FVlRfZW5kLnRvRm9ybWF0KFxuXHRcdFx0XHRcdFRJTUVfRk9STUFUX1NJVEVcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRlbnQgKz0gYWxsRGF0ZVRpbWVzQXNTdHJpbmcoXG5cdFx0XHRcdFNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFLFxuXHRcdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX3N0YXJ0LnRvRm9ybWF0KFxuXHRcdFx0XHRcdERBVEVfVElNRV9GT1JNQVRfU0lURVxuXHRcdFx0XHQpLFxuXHRcdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX2VuZC50b0Zvcm1hdChcblx0XHRcdFx0XHREQVRFX1RJTUVfRk9STUFUX1NJVEVcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGNvbnRlbnQgPSBEYXRlVGltZUVudGl0eS5EVFRfbmFtZSA/XG5cdFx0XHRgJHsgRGF0ZVRpbWVFbnRpdHkuRFRUX25hbWUgfSAoJHsgY29udGVudCB9KWAgOlxuXHRcdFx0Y29udGVudDtcblx0fVxuXHRyZXR1cm4gY29udGVudDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1hdHRlcnM7XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbmV4cG9ydCAqIGZyb20gJy4vZm9ybWF0dGVyJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxuXHRHUkVBVEVSX1RIQU4sXG5cdEdSRUFURVJfVEhBTl9BTkRfRVFVQUwsXG5cdExFU1NfVEhBTl9BTkRfRVFVQUwsXG59IGZyb20gJy4uL2Jhc2UnO1xuXG5leHBvcnQgY29uc3Qgbm93RGF0ZUFuZFRpbWUgPSBtb21lbnQoKTtcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdFx0J0RUVF9uYW1lJyxcblx0XHRcdCdEVFRfSUQnLFxuXHRcdFx0J3N0YXJ0X2RhdGUnLFxuXHRcdFx0J2VuZF9kYXRlJyxcblx0XHRdICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0XHRzaG93RXhwaXJlZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0bW9udGg6IFByb3BUeXBlcy5tb250aCxcblx0fSApLFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdFx0c2hvd0V4cGlyZWQ6IGJvb2xlYW5cbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ3N0YXJ0X2RhdGUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9ERVNDLFxuXHRcdHNob3dFeHBpcmVkOiBmYWxzZSxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0c3RhcnRfZGF0ZTogJ0RUVF9FVlRfc3RhcnQnLFxuXHRcdGVuZF9kYXRlOiAnRFRUX0VWVF9lbmQnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiBldmVudHMgZW5kcG9pbnQgcmVxdWVzdCB1c2luZyBwcm92aWRlZFxuICogaW5mb3JtYXRpb24uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgIElEIGZvciBFdmVudCB0byByZXRyaWV2ZSBkYXRldGltZXMgZnJvbVxuICogQHBhcmFtIHtib29sZWFufSBzaG93RXhwaXJlZCAgV2hldGhlciBvciBub3QgdG8gaW5jbHVkZSBleHBpcmVkIGV2ZW50cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb250aCAgICAgICAgIFJldHVybiBldmVudHMgZm9yIHRoZSBnaXZlbiBtb250aC4gIENhbiBiZSBhbnlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gYW55IG1vbnRoIGZvcm1hdCByZWNvZ25pemVkIGJ5IG1vbWVudC5cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgVGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7XG5cdGZvckV2ZW50SWQgPSAwLFxuXHRzaG93RXhwaXJlZCA9IGZhbHNlLFxuXHRtb250aCA9ICdub25lJyxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cdGlmICggISBzaG93RXhwaXJlZCApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RUVF9FVlRfZW5kKipleHBpcmVkXVtdPScgKyBHUkVBVEVSX1RIQU4gK1xuXHRcdFx0JyZ3aGVyZVtEVFRfRVZUX2VuZCoqZXhwaXJlZF1bXT0nICtcblx0XHRcdG5vd0RhdGVBbmRUaW1lLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmICggbW9udGggJiYgbW9udGggIT09ICdub25lJyApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RUVF9FVlRfc3RhcnRdW109JyArIEdSRUFURVJfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtEVFRfRVZUX3N0YXJ0XVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuc3RhcnRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRFRUX0VWVF9lbmRdW109JyArIExFU1NfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtEVFRfRVZUX2VuZF1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLmVuZE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0aWYgKCBwYXJzZUludCggZm9yRXZlbnRJZCwgMTAgKSAhPT0gMCApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbRXZlbnQuRVZUX0lEXT0nICsgZm9yRXZlbnRJZCApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgbWFwVmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ21lbWl6ZSc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGVuZHBvaW50cyB9IGZyb20gJy4vZW5kcG9pbnRzLmpzJztcblxuLyoqXG4gKiBSZWNlaXZlcyBhbiBvYmplY3QgbWFwIG9mIG1vZGVsTmFtZSB0byBlbmRwb2ludCBhbmQgbWFwcyB0aGF0IHRvIGEgZGVmYXVsdFxuICogbWFwIG9mIG1vZGVsTmFtZSB0byBlbXB0eSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gbW9kZWxOYW1lRW5kcG9pbnRzXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gQW4gb2JqZWN0IG9mIHsgeyBtb2RlbE5hbWUgfSA6IHt9IH1cbiAqL1xuY29uc3QgbWFwVG9PYmplY3RWYWx1ZXMgPSAoIG1vZGVsTmFtZUVuZHBvaW50cyApID0+IHtcblx0cmV0dXJuIG1hcFZhbHVlcyggbW9kZWxOYW1lRW5kcG9pbnRzLFxuXHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH0sXG5cdCk7XG59O1xuXG5jb25zdCBnZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCA9IG1lbW9pemUoXG5cdCgpID0+IG1hcFRvT2JqZWN0VmFsdWVzKCBlbmRwb2ludHMgKVxuKTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBzdGF0ZSB0byBiZSB1c2VkIGJ5IHN0b3JlcyBjb250YWluaW5nIGxpc3RzLlxuICpcbiAqIEB0eXBlIHsgT2JqZWN0IH1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTElTVFNfU1RBVEUgPSBtYXBUb09iamVjdFZhbHVlcyggZW5kcG9pbnRzICk7XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIGRlZmF1bHQgc3RhdGUgdG8gYmUgdXNlZCBieSB0aGUgY29yZSBzdG9yZS5cbiAqXG4gKiBAdHlwZSB7e2VudGl0aWVzOiB7fSwgZW50aXR5SWRzOiB7fSwgZGlydHk6IHt9fX1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09SRV9TVEFURSA9IHtcblx0ZW50aXRpZXM6IHtcblx0XHQuLi5nZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCgpLFxuXHR9LFxuXHRyZWxhdGlvbnM6IHtcblx0XHRpbmRleDoge30sXG5cdFx0ZW50aXR5TWFwOiB7fSxcblx0fSxcblx0ZGlydHk6IHtcblx0XHRyZWxhdGlvbnM6IHtcblx0XHRcdGluZGV4OiB7fSxcblx0XHRcdGRlbGV0ZToge30sXG5cdFx0XHRhZGQ6IHt9LFxuXHRcdH0sXG5cdFx0dHJhc2g6IHt9LFxuXHRcdGRlbGV0ZToge30sXG5cdH0sXG59O1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBkZWZhdWx0IHN0YXRlIHRvIGJlIHVzZWQgYnkgdGhlIHNjaGVtYSBzdG9yZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NDSEVNQV9TVEFURSA9IHtcblx0c2NoZW1hOiB7XG5cdFx0Li4uZ2V0RGVmYXVsdE1vZGVsRW50aXRpZXNPYmplY3QoKSxcblx0fSxcblx0ZmFjdG9yeToge1xuXHRcdC4uLmdldERlZmF1bHRNb2RlbEVudGl0aWVzT2JqZWN0KCksXG5cdH0sXG5cdHJlbGF0aW9uRW5kcG9pbnRzOiB7XG5cdFx0Li4uZ2V0RGVmYXVsdE1vZGVsRW50aXRpZXNPYmplY3QoKSxcblx0fSxcblx0cmVsYXRpb25TY2hlbWE6IHt9LFxufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBhc3NlcnRFbnRpdHlIYXNLZXkgfSBmcm9tICcuL2Fzc2VydGlvbnMnO1xuXG4vKipcbiAqIEFsbCBhdmFpbGFibGUgZW5kcG9pbnRzIGV4cG9zZWQgdmlhIHRoZSBlZWpzLmRhdGEgZ2xvYmFsIGZyb20gdGhlIHNlcnZlci5cbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmV4cG9ydCBjb25zdCB7XG5cdGNvbGxlY3Rpb25fZW5kcG9pbnRzOiBlbmRwb2ludHMgPSB7fSxcblx0YmFzZV9yZXN0X3JvdXRlOiBiYXNlUmVzdFJvdXRlLFxufSA9IGRhdGEucGF0aHM7XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBlbmRwb2ludCBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFdoYXQgbW9kZWwgdG8gcmV0cmlldmUgdGhlIGVuZHBvaW50IGZvci5cbiAqIEByZXR1cm4ge3N0cmluZ30gIFRoZSBlbmRwb2ludCBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsLlxuICogQHRocm93cyB7RXhjZXB0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZ2V0RW5kcG9pbnQgPSAoIG1vZGVsTmFtZSApID0+IHtcblx0YXNzZXJ0RW50aXR5SGFzS2V5KCBtb2RlbE5hbWUsIGVuZHBvaW50cyApO1xuXHRyZXR1cm4gZW5kcG9pbnRzWyBtb2RlbE5hbWUgXTtcbn07XG5cbi8qKlxuICogQXBwbGllcyB0aGUgcHJvdmlkZWQgcXVlcnlTdHJpbmcgdG8gdGhlIGVuZHBvaW50IGZvciB0aGUgcHJvdmlkZWQgbW9kZWwgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFdoYXQgbW9kZWwgdGhlIGZpbmFsIHN0cmluZyBpcyBmb3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlTdHJpbmcgIFRoZSBxdWVyeSBiZWluZyBhcHBlbmRlZCB0byB0aGUgZW5kcG9pbnQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmaW5hbCBhc3NlbWJsZWQgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgYXBwbHlRdWVyeVN0cmluZyA9ICggbW9kZWxOYW1lLCBxdWVyeVN0cmluZyA9ICcnICkgPT4ge1xuXHRyZXR1cm4gcXVlcnlTdHJpbmcgIT09ICcnID9cblx0XHRnZXRFbmRwb2ludCggbW9kZWxOYW1lICkgKyAnPycgKyBxdWVyeVN0cmluZyA6XG5cdFx0Z2V0RW5kcG9pbnQoIG1vZGVsTmFtZSApO1xufTtcblxuLyoqXG4gKiBTdHJpcHMgdGhlIGJhc2VfcmVzdF9yb3V0ZSAoaS5lLiBodHRwczovL215dXJsLmNvbS93cC1qc29uLykgZnJvbSB0aGUgcHJvdmlkZWRcbiAqIHVybCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgdXJsIHdpdGggdGhlIGJhc2UgcmVzdCByb3V0ZSByZW1vdmVkLlxuICovXG5leHBvcnQgY29uc3Qgc3RyaXBCYXNlUm91dGVGcm9tVXJsID0gKCB1cmwgKSA9PiB7XG5cdHJldHVybiB1cmwucmVwbGFjZSggYmFzZVJlc3RSb3V0ZSwgJycgKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgc3ByaW50ZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgSW52YWxpZFNjaGVtYSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHsgaXNTY2hlbWEgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcbmltcG9ydCB7XG5cdE1vbmV5LFxuXHRTZXJ2ZXJEYXRlVGltZSBhcyBEYXRlVGltZSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsdWUtb2JqZWN0cyc7XG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0aXNEYXRlVGltZUZpZWxkLFxuXHRpc01vbmV5RmllbGQsXG59IGZyb20gJy4vYm9vbGVhbnMnO1xuaW1wb3J0IHtcblx0aXNTaGFsbG93VmFsaWRWYWx1ZUZvckZpZWxkLFxuXHR2YWxpZGF0ZUVudW1UeXBlLFxuXHR2YWxpZGF0ZVR5cGUsXG5cdHZhbGlkYXRlVHlwZUZvckZpZWxkLFxufSBmcm9tICcuL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMgfSBmcm9tICcuL2V4dHJhY3RvcnMnO1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgdmFsdWUgaXMgYSBrbm93biB2YWx1ZSBvYmplY3QuXG4gKlxuICogTm90ZTogdGhpcyBvbmx5IGFzc2VydHMga25vd24gdmFsdWUgb2JqZWN0cywgaWYgdGhlIHZhbHVlIGlzIG5vdCBkZXRlY3RlZCBhc1xuICogYSBrbm93biB2YWx1ZSBvYmplY3QgaXQgaXMgcGFzc2VkIGJhY2sgYXMgaXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAdGhyb3dzIEludmFsaWREYXRlVGltZVxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IG1heWJlQXNzZXJ0VmFsdWVPYmplY3QgPSAoIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgc2NoZW1hICkgPT4ge1xuXHRpZiAoIGlzRGF0ZVRpbWVGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHREYXRlVGltZS5hc3NlcnRJc0RhdGVUaW1lKCBmaWVsZFZhbHVlICk7XG5cdH1cblx0aWYgKCBpc01vbmV5RmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0TW9uZXkoIGZpZWxkVmFsdWUgKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIG9iamVjdCBpcyBhIHZhbGlkIG1vZGVsIHNjaGVtYSBvYmplY3QuXG4gKlxuICogQ3VycmVudGx5LCBhbiBvYmplY3QgaXMgY29uc2lkZXJlZCBhIHZhbGlkIG1vZGVsIHNjaGVtYSBpZiBpdCBoYXMgYVxuICogJ3Byb3BlcnRpZXMnIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gc2NoZW1hXG4gKiBAdGhyb3dzIEludmFsaWRTY2hlbWFcbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydFZhbGlkU2NoZW1hID0gKCBzY2hlbWEgKSA9PiB7XG5cdGlmICggISBpc1NjaGVtYSggc2NoZW1hICkgKSB7XG5cdFx0dGhyb3cgbmV3IEludmFsaWRTY2hlbWEoXG5cdFx0XHQnVGhpcyBpcyBhbiBpbnZhbGlkIHNjaGVtYSBmb3IgYSBtb2RlbC4nLFxuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB0aGF0IHRoZSBnaXZlbiBmaWVsZCBleGlzdHMgaW4gdGhlIHByb3ZpZGVkIHNjaGVtYSBhbmQgdGhlIHNoYXBlIGZvclxuICogdGhlIHNjaGVtYSBlbnRyeSBvbiB0aGF0IGZpZWxkIGlzIGV4cGVjdGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFRoZSBtb2RlbCB0aGUgc2NoZW1hIGJlbG9uZ3MgdG8sIHRoaXMgaXMgdXNlZCBmb3JcbiAqIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZSAgVGhlIGZpZWxkIGJlaW5nIGNoZWNrZWQgYWdhaW5zdCB0aGUgc2NoZW1hXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hICAgICBUaGUgc2NoZW1hIGZvciB0aGUgbW9kZWwgdXNlZCBmb3IgdmFsaWRhdGlvblxuICogQHRocm93cyBJbnZhbGlkU2NoZW1hXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0VmFsaWRTY2hlbWFGaWVsZFByb3BlcnRpZXMgPSAoXG5cdG1vZGVsTmFtZSxcblx0ZmllbGROYW1lLFxuXHRzY2hlbWEsXG4pID0+IHtcblx0aWYgKCBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXSApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHQnVGhlIGdpdmVuIFwiJXNcIiBmaWVsZE5hbWUgZG9lcyBub3QgaGF2ZSBhIGRlZmluZWQgc2NoZW1hIGZvciB0aGUgbW9kZWwgXCIlc1wiJyxcblx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRtb2RlbE5hbWUsXG5cdFx0XHQpLFxuXHRcdCk7XG5cdH1cblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUgPT09ICdvYmplY3QnICkge1xuXHRcdGlmICggaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRTY2hlbWEoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBzY2hlbWEgZm9yIHRoZSBmaWVsZCAlcyBvbiB0aGUgbW9kZWwgJXMgaXMgb2YgdHlwZSBcIm9iamVjdFwiIGJ1dCBkb2VzIG5vdCBoYXZlIGEgcHJvcGVydGllcyBwcm9wZXJ0eS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRtb2RlbE5hbWVcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKCBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRTY2hlbWEoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBzY2hlbWEgZm9yIHRoZSBmaWVsZCAlcyBvbiB0aGUgbW9kZWwgJXMgaXMgb2YgdHlwZSBcIm9iamVjdFwiIGJ1dCBkb2VzIG5vdCBoYXZlIGEgcmF3IHByb3BlcnR5IGluIGl0XFwncyBcInByb3BlcnRpZXNcIiBwcm9wZXJ0eS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRtb2RlbE5hbWVcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKCBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy50eXBlICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFNjaGVtYShcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIHNjaGVtYSBmb3IgdGhlIGZpZWxkICVzIG9uIHRoZSBtb2RlbCAlcyBpcyBvZiB0eXBlIFwib2JqZWN0XCIgYW5kIGhhcyBhIHByb3BlcnRpZXMucmF3IHByb3BlcnR5LCBob3dldmVyIHRoZXJlIGlzIG5vIFwidHlwZVwiIGRlZmluZWQgZm9yIHRoZSByYXcgcHJvcGVydHkuJyxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0bW9kZWxOYW1lXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHRoYXQgdGhlIHZhbHVlIHByb3ZpZGVkIGZvciB0aGUgcHJlcGFyZWQgZmllbGQgaXMgdmFsaWQgYWNjb3JkaW5nIHRvXG4gKiB0aGUgc2NoZW1hLlxuICpcbiAqIFByZXBhcmVkIGZpZWxkcyBhcmU6XG4gKlxuICogLSBmaWVsZHMgaGF2aW5nIHZhbHVlcyB0aGF0IGFyZSBzZXQgYXMgYSB2YWx1ZSBvYmplY3QgYW5kIGV4cGVjdCBhIHZhbHVlXG4gKiAgIG9iamVjdCBvbiB1cGRhdGVzL2luc2VydHMuXG4gKiAtIGZpZWxkcyB0aGF0IGFyZSB0aGUgZXF1aXZhbGVudCBgcmF3YCB2YWx1ZSB3aGVuIHRoZSBmaWVsZCBpbiB0aGUgc2NoZW1hIGlzXG4gKiAgIGRlZmluZWQgdG8gaGF2ZSByYXcgYW5kIHJlbmRlcmVkL3ByZXR0eSB2YWx1ZXMuXG4gKlxuICogTm90ZTogIFRoaXMgdmFsaWRhdGVzIGFnYWluc3QgcHJlcGFyZWQgZmllbGRzIHdoaWNoIG1lYW5zIHRoYXQ6XG4gKlxuICogLSBpZiB0aGUgcHJlcGFyZWQgZmllbGQgaGFzIGEgdmFsdWUgb2JqZWN0IGFzIGl0cyB2YWx1ZSwgdGhlbiB0aGF0IHZhbHVlXG4gKiAgIG9iamVjdCBpcyB2YWxpZGF0ZWQgYmVmb3JlIGFueSBvdGhlciB2YWxpZGF0aW9uLlxuICogLSBpZiB0aGUgcHJlcGFyZWQgZmllbGQgcmVwcmVzZW50cyBhbiBvYmplY3QgaW4gdGhlIHNjaGVtYSwgdGhlbiBpdHMgdmFsdWUgaXNcbiAqICAgdmFsaWRhdGVkIGFnYWluc3QgdGhlIGByYXdgIHR5cGUgaW4gdGhlIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqIEB0aHJvd3MgSW52YWxpZERhdGVUaW1lXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZCA9IChcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRpbnN0YW5jZSxcbikgPT4ge1xuXHRjb25zdCB7IHNjaGVtYSB9ID0gaW5zdGFuY2U7XG5cdGxldCBpc1ZhbGlkID0gaXNTaGFsbG93VmFsaWRWYWx1ZUZvckZpZWxkKFxuXHRcdGZpZWxkTmFtZSxcblx0XHRmaWVsZFZhbHVlLFxuXHRcdHNjaGVtYSxcblx0KTtcblx0aWYgKCAhIGlzVmFsaWQgJiYgc2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlID09PSAnb2JqZWN0JyAmJlxuXHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllc1xuXHQpIHtcblx0XHRpc1ZhbGlkID0gc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy5lbnVtID9cblx0XHRcdHZhbGlkYXRlRW51bVR5cGUoXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcudHlwZSxcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy5lbnVtLFxuXHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0KSA6XG5cdFx0XHR2YWxpZGF0ZVR5cGUoXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcudHlwZSxcblx0XHRcdFx0bWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMoXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdFx0c2NoZW1hXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0aWYgKCAhIGlzVmFsaWQgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlMSRzXCIgZmllbGQgIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hLiAgSXRcXCdzIGByYXdgIHByb3BlcnR5IFZhbHVlICglMiRzKSBpcyBub3QgdGhlIGNvcnJlY3QgZXhwZWN0ZWQgdHlwZSAoJTMkcykuJyxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LnR5cGUsXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXHRpZiAoICEgaXNWYWxpZCApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0c3ByaW50Zihcblx0XHRcdFx0J1RoZSBnaXZlbiBcIiUxJHNcIiBmaWVsZFxcJ3MgVmFsdWUgKCUyJHMpIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hIHR5cGUgKCUzJHMpLicsXG5cdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlLFxuXHRcdFx0KSxcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgdmFsdWUgZm9yIHRoZSBnaXZlbiBmaWVsZCBpcyB2YWxpZCBhY2NvcmRpbmcgdG8gdGhlXG4gKiBzY2hlbWEuXG4gKlxuICogVGhpcyBpcyB1c2VkIG9uIGVudGl0eSBjb25zdHJ1Y3Rpb24gYW5kIGRvZXMgbm90IHZhbGlkYXRlIHByZXBhcmVkIGZpZWxkXG4gKiB2YWx1ZXMgKHNlZSBhc3NlcnQgYXNzZXJ0VmFsaWRWYWx1ZUZvclByZXBhcmVkRmllbGQpLlxuICpcbiAqIFRoaXMgbWV0aG9kIGFsc28gYXNzZXJ0cyB0aGF0IHRoZSBzY2hlbWEgaGFzIHZhbGlkIHNjaGVtYSBmaWVsZCBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICogQHRocm93cyBJbnZhbGlkU2NoZW1hXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRWYWxpZEZpZWxkQW5kVmFsdWVBZ2FpbnN0U2NoZW1hID0gKFxuXHRtb2RlbE5hbWUsXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0aW5zdGFuY2UsXG4pID0+IHtcblx0Y29uc3Qgc2NoZW1hID0gaW5zdGFuY2Uuc2NoZW1hO1xuXHRjb25zdCB2YWxpZGF0aW9uVHlwZSA9IHZhbGlkYXRlVHlwZUZvckZpZWxkKCBmaWVsZE5hbWUsIGluc3RhbmNlICk7XG5cdGFzc2VydFZhbGlkU2NoZW1hRmllbGRQcm9wZXJ0aWVzKCBtb2RlbE5hbWUsIGZpZWxkTmFtZSwgc2NoZW1hICk7XG5cdGxldCBpc1ZhbGlkID0gaXNTaGFsbG93VmFsaWRWYWx1ZUZvckZpZWxkKFxuXHRcdGZpZWxkTmFtZSxcblx0XHRmaWVsZFZhbHVlLFxuXHRcdHNjaGVtYSxcblx0XHRmYWxzZSxcblx0KTtcblx0Ly8gYWNjb3VudCBmb3IgZmllbGROYW1lIGZpZWxkVmFsdWVzIHRoYXQgaGF2ZSBwcm9wZXJ0eSBzY2hlbWEuIEZvciBNb2RlbFxuXHQvLyBFbnRpdGllcywgb25seSB0aGUgVkFMSURBVEVfVFlQRSBwcm9wZXJ0eSBpcyBjYXJlZCBhYm91dC5cblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUgPT09ICdvYmplY3QnICYmXG5cdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzXG5cdCkge1xuXHRcdGlmICggaXNVbmRlZmluZWQoIGZpZWxkVmFsdWVbIHZhbGlkYXRpb25UeXBlIF0gKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBnaXZlbiBcIiUxJHNcIiB2YWx1ZSBpcyBub3QgdmFsaWQgZm9yIHRoZSBkZWZpbmVkIHNjaGVtYS4gSXQgbXVzdCBiZSBhbiBvYmplY3QgYW5kIGl0IG11c3QgaGF2ZSBhIGAlMiRzYCBrZXkuJyxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0dmFsaWRhdGlvblR5cGUsXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpc1ZhbGlkID0gc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzWyB2YWxpZGF0aW9uVHlwZSBdLmVudW0gP1xuXHRcdFx0dmFsaWRhdGVFbnVtVHlwZShcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzWyB2YWxpZGF0aW9uVHlwZSBdLnR5cGUsXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcuZW51bSxcblx0XHRcdFx0ZmllbGRWYWx1ZVsgdmFsaWRhdGlvblR5cGUgXSxcblx0XHRcdCkgOlxuXHRcdFx0dmFsaWRhdGVUeXBlKFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXNbIHZhbGlkYXRpb25UeXBlIF0udHlwZSxcblx0XHRcdFx0ZmllbGRWYWx1ZVsgdmFsaWRhdGlvblR5cGUgXVxuXHRcdFx0KTtcblx0XHRpZiAoICEgaXNWYWxpZCApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBnaXZlbiBcIiUxJHNcIiB2YWx1ZSBpcyBub3QgdmFsaWQgZm9yIHRoZSBkZWZpbmVkIHNjaGVtYS4gIEl0XFwncyBgJTIkc2AgcHJvcGVydHkgdmFsdWUgKCUzJHMpIGlzIG5vdCB0aGUgY29ycmVjdCBleHBlY3RlZCB0eXBlICglNCRzKS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHR2YWxpZGF0aW9uVHlwZSxcblx0XHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllc1sgdmFsaWRhdGlvblR5cGUgXS50eXBlLFxuXHRcdFx0XHQpLFxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblx0aWYgKCAhIGlzVmFsaWQgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdHNwcmludGYoXG5cdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlMSRzXCIgZmllbGRcXCdzIHZhbHVlICglMiRzKSBpcyBub3QgdmFsaWQgZm9yIHRoZSBkZWZpbmVkIHNjaGVtYSB0eXBlICglMyRzKS4nLFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSxcblx0XHRcdCksXG5cdFx0KTtcblx0fVxufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0FycmF5LCB1cHBlckZpcnN0LCBjYW1lbENhc2UgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgYXNzZXJ0VmFsaWRTY2hlbWEgfSBmcm9tICcuL2Fzc2VydGlvbnMnO1xuaW1wb3J0IHtcblx0Y3JlYXRlR2V0dGVyLFxuXHRjcmVhdGVFbnRpdHlHZXR0ZXJzQW5kU2V0dGVycyxcblx0Y3JlYXRlUGVyc2lzdGluZ0dldHRlcnNBbmRTZXR0ZXJzLFxuXHRzZXRTYXZlU3RhdGUsXG59IGZyb20gJy4vY3JlYXRlJztcbmltcG9ydCB7XG5cdFNBVkVfU1RBVEUsXG5cdFBSSVZBVEVfUFJPUEVSVElFUyxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEJhc2VFbnRpdHkgaXMgdGhlIGJhc2ljIGNsYXNzIGZvciBhbGwgZW50aXRpZXMuICBjcmVhdGVFbnRpdHlGYWN0b3J5IHJldHVybnNcbiAqIGFuIGluc3RhbmNlIG9mIHRoaXMgYW5kIGFsbCB0aGUgZ2V0dGVycy9zZXR0ZXJzIGZvciBmaWVsZHMgZXRjIGFyZVxuICogZHluYW1pY2FsbHkgY3JlYXRlZCB2aWEgdGhlIGNvbnN0cnVjdG9yLlxuICovXG5jbGFzcyBCYXNlRW50aXR5IHtcblx0WyBQUklWQVRFX1BST1BFUlRJRVMuU0FWRV9TVEFURSBdID0gU0FWRV9TVEFURS5DTEVBTjtcblx0WyBQUklWQVRFX1BST1BFUlRJRVMuVkFMSURBVEVfVFlQRVMgXSA9IHt9O1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvciBmb3IgQmFzZSBFbnRpdHlcblx0ICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gZW50aXR5RmllbGRzQW5kVmFsdWVzXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcblx0ICogQHBhcmFtIHtBcnJheX1maWVsZFByZWZpeGVzXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNOZXdcblx0ICovXG5cdGNvbnN0cnVjdG9yKFxuXHRcdG1vZGVsTmFtZSxcblx0XHRlbnRpdHlGaWVsZHNBbmRWYWx1ZXMsXG5cdFx0c2NoZW1hLFxuXHRcdGZpZWxkUHJlZml4ZXMgPSBbXSxcblx0XHRpc05ldyA9IGZhbHNlLFxuXHQpIHtcblx0XHRhc3NlcnRWYWxpZFNjaGVtYSggc2NoZW1hICk7XG5cdFx0ZmllbGRQcmVmaXhlcyA9IGlzQXJyYXkoIGZpZWxkUHJlZml4ZXMgKSA/IGZpZWxkUHJlZml4ZXMgOiBbXTtcblx0XHRjcmVhdGVHZXR0ZXIoIHRoaXMsICdmaWVsZFByZWZpeGVzJywgZmllbGRQcmVmaXhlcyApO1xuXHRcdGNyZWF0ZUdldHRlciggdGhpcywgJ3NjaGVtYScsIHNjaGVtYS5wcm9wZXJ0aWVzICk7XG5cdFx0c2V0U2F2ZVN0YXRlKFxuXHRcdFx0dGhpcyxcblx0XHRcdGlzTmV3ID8gU0FWRV9TVEFURS5ORVcgOiBTQVZFX1NUQVRFLkNMRUFOXG5cdFx0KTtcblx0XHRjcmVhdGVHZXR0ZXIoIHRoaXMsICdtb2RlbE5hbWUnLCBtb2RlbE5hbWUgKTtcblx0XHRjcmVhdGVHZXR0ZXIoIHRoaXMsICdvcmlnaW5hbEZpZWxkc0FuZFZhbHVlcycsIGVudGl0eUZpZWxkc0FuZFZhbHVlcyApO1xuXHRcdGNyZWF0ZUdldHRlcihcblx0XHRcdHRoaXMsXG5cdFx0XHQnZmllbGRzVG9QZXJzaXN0T25JbnNlcnQnLFxuXHRcdFx0bmV3IFNldCggT2JqZWN0LmtleXMoIGVudGl0eUZpZWxkc0FuZFZhbHVlcyApIClcblx0XHQpO1xuXHRcdGNyZWF0ZUVudGl0eUdldHRlcnNBbmRTZXR0ZXJzKCB0aGlzICk7XG5cdFx0Y3JlYXRlUGVyc2lzdGluZ0dldHRlcnNBbmRTZXR0ZXJzKCB0aGlzICk7XG5cdFx0T2JqZWN0LnNlYWwoIHRoaXMgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHNhdmUgc3RhdGUgb24gdGhlIGVudGl0eS5cblx0ICpcblx0ICogU2F2ZSBzdGF0ZSBkZXNjcmliZXMgd2hldGhlciB0aGUgZW50aXR5IGlzOlxuXHQgKlxuXHQgKiAtIFNBVkVfU1RBVEUuTkVXOiBUaGUgZW50aXR5IGhhcyBuZXZlciBiZWVuIHBlcnNpc3RlZCB0byBzdG9yYWdlLlxuXHQgKiAtIFNBVkVfU1RBVEUuQ0xFQU46IFRoZSBlbnRpdHkgZXhpc3RzIGluIHN0b3JhZ2UgYW5kIGhhcyBub3QgYmVlbiBtdXRhdGVkLlxuXHQgKiAtIFNBVkVfU1RBVEUuRElSVFk6IFRoZSBlbnRpdHkgaXMgbXV0YXRlZCBhbmQgY2hhbmdlcyBoYXZlIG5vdCBiZWVuXG5cdCAqIHBlcnNpc3RlZCB0byBzdG9yYWdlLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtTeW1ib2x9ICBSZXR1cm5zIHRoZSBjdXJyZW50IHNhdmUgc3RhdGUgZm9yIHRoZSBlbnRpdHkuXG5cdCAqL1xuXHRnZXQgc2F2ZVN0YXRlKCkge1xuXHRcdHJldHVybiB0aGlzWyBQUklWQVRFX1BST1BFUlRJRVMuU0FWRV9TVEFURSBdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBpcyBTQVZFX1NUQVRFLk5FV1xuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyBTQVZFX1NUQVRFLk5FVyBpcyB0aGUgc2F2ZSBzdGF0ZS5cblx0ICovXG5cdGdldCBpc05ldygpIHtcblx0XHRyZXR1cm4gdGhpcy5zYXZlU3RhdGUgPT09IFNBVkVfU1RBVEUuTkVXO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBpcyBTQVZFX1NUQVRFLkRJUlRZXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIFNBVkVfU1RBVEUuRElSVFkgaXMgdGhlIHNhdmUgc3RhdGUuXG5cdCAqL1xuXHRnZXQgaXNEaXJ0eSgpIHtcblx0XHRyZXR1cm4gdGhpcy5zYXZlU3RhdGUgPT09IFNBVkVfU1RBVEUuRElSVFk7XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgY3VycmVudCBzYXZlIHN0YXRlIGlzIFNBVkVfU1RBVEUuQ0xFQU5cblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgU0FWRV9TVEFURS5DTEVBTiBpcyB0aGUgc2F2ZSBzdGF0ZS5cblx0ICovXG5cdGdldCBpc0NsZWFuKCkge1xuXHRcdHJldHVybiB0aGlzLnNhdmVTdGF0ZSA9PT0gU0FWRV9TVEFURS5DTEVBTjtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBlbnRpdHkgaGFzIGFueSBwYXNzd29yZCBwcm90ZWN0ZWQgZmllbGRzLlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIGl0IGRvZXMsIGZhbHNlIG1lYW5zIGl0IGRvZXNuJ3QuXG5cdCAqL1xuXHRnZXQgaXNQYXNzd29yZFByb3RlY3RlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5wcm90ZWN0ZWRGaWVsZHMubGVuZ3RoID4gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBnaXZlbiBmaWVsZE5hbWUgaXMgYSBwYXNzd29yZCBwcm90ZWN0ZWQgZmllbGQuXG5cdCAqIEByZXR1cm4ge2Z1bmN0aW9uKHN0cmluZyk6IGJvb2xlYW59ICBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZFxuXHQgKiB0byBjaGVjayBpZiB0aGUgZ2l2ZW4gZmllbGQgbmFtZSBpcyBhIHByb3RlY3RlZCBmaWVsZCBpbiB0aGlzIGVudGl0eS5cblx0ICovXG5cdGdldCBpc0ZpZWxkUGFzc3dvcmRQcm90ZWN0ZWQoKSB7XG5cdFx0cmV0dXJuICggZmllbGROYW1lICkgPT4gdGhpcy5wcm90ZWN0ZWRGaWVsZHMuaW5kZXhPZiggZmllbGROYW1lICkgPiAtMTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVc2VkIHRvIGNsb25lIHRoZSBjdXJyZW50IGVudGl0eSBvYmplY3QuICBUaGlzIHJlc3VsdHMgaW4gYW4gaW5zdGFuY2Ugb2Zcblx0ICogQmFzZUVudGl0eSB0aGF0IGlzIGVxdWl2YWxlbnQgYXMgdGhpcyBjdXJyZW50IGluc3RhbmNlIChleGNlcHQgaXQgd2lsbFxuXHQgKiBoYXZlIGEgbmV3IGdlbmVyYXRlZCBpZCkuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0Jhc2VFbnRpdHl9IEEgbmV3IGluc3RhbmNlIG9mIEJhc2VFbnRpdHlcblx0ICovXG5cdGdldCBjbG9uZSgpIHtcblx0XHRyZXR1cm4gbmV3IEJhc2VFbnRpdHkoXG5cdFx0XHR0aGlzLm1vZGVsTmFtZSxcblx0XHRcdHRoaXMuZm9yQ2xvbmUsXG5cdFx0XHR7ICRzY2hlbWE6IHt9LCBwcm9wZXJ0aWVzOiB0aGlzLnNjaGVtYSB9LFxuXHRcdFx0dGhpcy5maWVsZFByZWZpeGVzLFxuXHRcdFx0dHJ1ZVxuXHRcdCk7XG5cdH1cblxuXHRzdGF0aWMgbmFtZSA9ICdCYXNlRW50aXR5J1xufVxuXG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCBnaXZlcyBhIGNsYXNzIHRoZSBwcm92aWRlZCBuYW1lXG4gKiAoYW5kIG9wdGlvbmFsbHkgZXh0ZW5kcyB0aGUgcHJvdmlkZWQgb2JqZWN0KS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5kZWRDbGFzc1xuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb25cbiAqL1xuY29uc3QgbmFtZUNsYXNzID0gKCBuYW1lLCBleHRlbmRlZENsYXNzICkgPT4ge1xuXHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBleHRlbmRlZENsYXNzIHtcblx0XHRzdGF0aWMgZ2V0IG5hbWUoKSB7XG5cdFx0XHRyZXR1cm4gbmFtZTtcblx0XHR9XG5cdH07XG59O1xuXG4vKipcbiAqIEEgZmFjdG9yeSBmb3IgZW50aXR5IGZhY3Rvcmllcy5cbiAqXG4gKiBDYWxsaW5nIHRoaXMgcmV0dXJucyBhbiBvYmplY3Qgb2YgZmFjdG9yeSBmdW5jdGlvbnMgdGhhdCBpbnN0YW50aWF0ZSBhblxuICogaW5zdGFuY2Ugb2YgYSBuYW1lZCBFbnRpdHkuICBUaGUgbW9kZWxOYW1lIGlzIHVzZWQgYXMgdGhlIG5hbWUgZm9yIHRoZSBuZXdcbiAqIGVudGl0eS5cbiAqXG4gKiBUd28gbWV0aG9kcyBhcmUgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QgcmV0dXJuZWQ6IGBjcmVhdGVOZXdgIGFuZFxuICogYGZyb21FeGlzdGluZ2AuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgVGhlIG1vZGVsIGZvciB0aGUgZW50aXR5XG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hICAgICBUaGUgc2NoZW1hIGZvciB0aGUgbW9kZWwuIFRoaXMgaXMgdGhlIHNjaGVtYVxuICogcHJvdmlkZWQgYnkgdGhlIE9QVElPTlMgZW5kcG9pbnQgZm9yIHRoZSBtb2RlbC5cbiAqIEBwYXJhbSB7QXJyYXl9IGZpZWxkUHJlZml4ZXMgQW4gYXJyYXkgb2YgZmllbGQgcHJlZml4ZXMgZm9yIGJhc2UgZmllbGRzIG9uXG4gKiBvbiB0aGUgbW9kZWwgKGVnLiBFdmVudCBtb2RlbCBoYXMgYFsgRVZUIF1gIHByZWZpeGVzIG9uIGZpZWxkcywgRGF0ZXRpbWUgbW9kZWxcbiAqIGhhcyBbIGBEVFRgLCBgRFRUX0VWVGAgXVxuICogQHJldHVybiB7T2JqZWN0fSBBIGZhY3RvcnkgZm9yIGluc3RhbnRpYXRpbmcgYW4gZW50aXR5IGluc3RhbmNlLlxuICovXG5jb25zdCBjcmVhdGVFbnRpdHlGYWN0b3J5ID0gKCBtb2RlbE5hbWUsIHNjaGVtYSwgZmllbGRQcmVmaXhlcyA9IFtdICkgPT4ge1xuXHRjb25zdCBFbnRpdHkgPSBuYW1lQ2xhc3MoXG5cdFx0dXBwZXJGaXJzdCggY2FtZWxDYXNlKCBtb2RlbE5hbWUgKSApLFxuXHRcdEJhc2VFbnRpdHlcblx0KTtcblx0cmV0dXJuIHtcblx0XHQvKipcblx0XHQgKiBFeHBvc2VzIG1vZGVsTmFtZSBzbyBjbGllbnQgY29kZSBjYW4gZGVyaXZlIHdoYXQgbW9kZWwgdGhpcyBmYWN0b3J5XG5cdFx0ICogaXMgZm9yIGZyb20gYW55IGdpdmVuIGZhY3RvcnkuXG5cdFx0ICogQHR5cGUgc3RyaW5nXG5cdFx0ICovXG5cdFx0bW9kZWxOYW1lLFxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgdGhlIGNsYXNzIGRlZmluaXRpb24gZm9yIHRoZSBFbnRpdHkuICBUeXBpY2FsbHkgdGhpcyBpc1xuXHRcdCAqIHJldHJpZXZlZCBmb3IgdGhlIGFiaWxpdHkgdG8gZG8gaW5zdGFuY2VvZiBjaGVja3MuXG5cdFx0ICovXG5cdFx0Y2xhc3NEZWY6IEVudGl0eSxcblx0XHQvKipcblx0XHQgKiBUaGlzIHJldHVybnMgYW4gaW5zdGFuY2Ugb2YgRW50aXR5IGZvciB0aGUgZ2l2ZW4gYXJndW1lbnRzIHdpdGggdGhlXG5cdFx0ICogaW5kaWNhdGlvbiB0aGlzIGlzIGEgbmV3IG5vbi1wZXJzaXN0ZWQgZW50aXR5LiAgVGhpcyBtZWFuczpcblx0XHQgKlxuXHRcdCAqIC0gQWxsIGZpZWxkIHZhbHVlcyBhcmUgcG9wdWxhdGVkIGFuZCBhbnkgbm90IHByb3ZpZGVkIHdpbGwgYmVcblx0XHQgKiAgIHBvcHVsYXRlZCB3aXRoIGRlZmF1bHQgdmFsdWVzIGRlZmluZWQgYnkgdGhlIHNjaGVtYS5cblx0XHQgKiAtIEdlbmVyYXRlcyB0ZW1wb3JhcnkgdW5pcXVlIGlkcyBmb3IgdGhlIHByaW1hcnkga2V5IGZpZWxkcyBvbiB0aGVcblx0XHQgKiAgIGVudGl0eSAodXNpbmcgY3VpZCkuXG5cdFx0ICogLSBTZXRzIHRoZSBgaXNOZXdgIGZsYWcgdG8gdHJ1ZSBmb3IgdGhlIGVudGl0eSBzbyBjbGllbnQgY29kZSBpcyBhYmxlXG5cdFx0ICogICB0byBkaXNjb3ZlciB3aGljaCBlbnRpdGllcyBoYXZlIG5ldmVyIGJlZW4gcGVyc2lzdGVkLlxuXHRcdCAqIC0gVGhpcyBmYWN0b3J5IG1ldGhvZCBleHBlY3RzIGZpZWxkcyBhbmQgdmFsdWVzIHRvIGJlIFwicHJlcGFyZWRcIi5cblx0XHQgKiAgIFdoYXQgdGhhdCBtZWFucyBpcyB0aGF0IGZvciBhbnkgZmllbGRzIHRoYXQgdGhlIHNjaGVtYSBkZXNjcmliZWQgYXNcblx0XHQgKiAgIGhhdmluZyBhIGByYXdgIHByb3BlcnR5IChpLmUuIHsgRVZUX2Rlc2M6IHsgcmF3OiAnc29tZXRoaW5nJyB9IH0pXG5cdFx0ICogICB0aGUgdmFsdWUgc2hvdWxkIGJlIG9mIHRoZSBjb3JyZWN0IHR5cGUgZm9yIHRoYXQgcmF3IHByb3BlcnR5IGFuZC5cblx0XHQgKiAgIFRoaXMgYWxzbyBtZWFucyBpcyB0aGF0IGZvciBhbnkgZmllbGRzIHRoZSBzY2hlbWEgZGVzY3JpYmVzIGFzIGFcblx0XHQgKiAgIGRhdGUtdGltZSAoZm9ybWF0KSBvciBtb25leSAoZm9ybWF0KSBmaWVsZCwgdGhlIHZhbHVlIGlzIGV4cGVjdGVkXG5cdFx0ICogICB0byBiZSB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZSBvYmplY3QuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gZmllbGRzQW5kVmFsdWVzXG5cdFx0ICogQHJldHVybiB7RW50aXR5fSBhbiBpbnN0YW5jZSBvZiBFbnRpdHlcblx0XHQgKi9cblx0XHRjcmVhdGVOZXc6ICggZmllbGRzQW5kVmFsdWVzICkgPT4gbmV3IEVudGl0eShcblx0XHRcdG1vZGVsTmFtZSxcblx0XHRcdGZpZWxkc0FuZFZhbHVlcyxcblx0XHRcdHNjaGVtYSxcblx0XHRcdGZpZWxkUHJlZml4ZXMsXG5cdFx0XHR0cnVlXG5cdFx0KSxcblx0XHQvKipcblx0XHQgKiBUaGlzIHJldHVybnMgYW4gaW5zdGFuY2Ugb2YgRW50aXR5IGZvciB0aGUgZ2l2ZW4gYXJndW1lbnRzIHdpdGggdGhlXG5cdFx0ICogaW5kaWNhdGlvbiB0aGlzIHJlcHJlc2VudHMgdGhlIGVudGl0eSBhcyBpcyBpbiB0aGUgZGIuICBUaGlzIG1lYW5zOlxuXHRcdCAqXG5cdFx0ICogLSBBbGwgZmllbGQgdmFsdWVzIGFyZSBOT1QgcG9wdWxhdGVkIGlmIG1pc3NpbmcgdmFsdWVzLiAgVGhpcyBpc1xuXHRcdCAqICAgZXNwZWNpYWxseSBpbXBvcnRhbnQgZm9yIGNvbnRleHRzIGxpa2UgdW5hdXRob3JpemVkIHZpZXdzIHdoZXJlXG5cdFx0ICogICBvbmx5IHBhcnRpYWwgZW50aXRpZXMgYXJlIHJldHVybmVkIGluIFJFU1QgcmVzcG9uc2VzLlxuXHRcdCAqIC0gaXNOZXcgZmxhZyBpcyBzZXQgdG8gZmFsc2UgKGFuZCBuZXZlciBjaGFuZ2VzIGZvciB0aGlzIGVudGl0eSlcblx0XHQgKiAtIFRoZSBpbmNvbWluZyB2YWx1ZXMgYXJlIGV4cGVjdGVkIHRvIGJlIGluIHRoZSBleGFjdCBzaGFwZSBhc1xuXHRcdCAqICAgZGVzY3JpYmVkIGJ5IHRoZSBzY2hlbWEgZm9yIHRoZSBlbnRpdHkgbW9kZWwuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gZmllbGRzQW5kVmFsdWVzXG5cdFx0ICogQHJldHVybiB7RW50aXR5fSBhbiBpbnN0YW5jZSBvZiBFbnRpdHlcblx0XHQgKi9cblx0XHRmcm9tRXhpc3Rpbmc6ICggZmllbGRzQW5kVmFsdWVzICkgPT4gbmV3IEVudGl0eShcblx0XHRcdG1vZGVsTmFtZSxcblx0XHRcdGZpZWxkc0FuZFZhbHVlcyxcblx0XHRcdHNjaGVtYSxcblx0XHRcdGZpZWxkUHJlZml4ZXNcblx0XHQpLFxuXHR9O1xufTtcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUVudGl0eUZhY3Rvcnk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNQbGFpbk9iamVjdCwgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBoYXMgYSBcInJhd1wiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYSBgcmF3YCBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc1Jhd1Byb3BlcnR5ID0gKCB2YWx1ZSApID0+IGlzUGxhaW5PYmplY3QoIHZhbHVlICkgJiZcblx0ISBpc1VuZGVmaW5lZCggdmFsdWUucmF3ICk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBhIFwicHJldHR5XCIgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Kn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QgYW5kIGhhcyBhIGBwcmV0dHlgIHByb3BlcnR5LlxuICovXG5leHBvcnQgY29uc3QgaGFzUHJldHR5UHJvcGVydHkgPSAoIHZhbHVlICkgPT4gaXNQbGFpbk9iamVjdCggdmFsdWUgKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCB2YWx1ZS5wcmV0dHkgKTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaGFzIGEgXCJyZW5kZXJlZFwiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYSBgcmVuZGVyZWRgIHByb3BlcnR5LlxuICovXG5leHBvcnQgY29uc3QgaGFzUmVuZGVyZWRQcm9wZXJ0eSA9ICggdmFsdWUgKSA9PiBpc1BsYWluT2JqZWN0KCB2YWx1ZSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHZhbHVlLnJlbmRlcmVkICk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBhIFwiZm9ybWF0XCIgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QgYW5kIGhhcyBhIGBmb3JtYXRgIHByb3BlcnR5LlxuICovXG5leHBvcnQgY29uc3QgaGFzRm9ybWF0UHJvcGVydHkgPSAoIHZhbHVlICkgPT4gaXNQbGFpbk9iamVjdCggdmFsdWUgKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCB2YWx1ZS5mb3JtYXQgKTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaGFzIGEgXCJlbnVtXCIgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QgYW5kIGhhcyBhbiBlbnVtXG4gKiBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0VudW1Qcm9wZXJ0eSA9ICggdmFsdWUgKSA9PiBpc1BsYWluT2JqZWN0KCB2YWx1ZSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHZhbHVlLmVudW0gKTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSBcInZhbHVlIG9iamVjdFwiIGZpZWxkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSB2YWx1ZSBvYmplY3QgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1ZhbHVlT2JqZWN0RmllbGQgPSAoIGZpZWxkLCBzY2hlbWEgKSA9PiB7XG5cdHJldHVybiBpc0RhdGVUaW1lRmllbGQoIGZpZWxkLCBzY2hlbWEgKSB8fCBpc01vbmV5RmllbGQoIGZpZWxkLCBzY2hlbWEgKTtcbn07XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIGZpZWxkIGlzIGEgZGF0ZS10aW1lIGZpZWxkIGFjY29yZGluZyB0byB0aGVcbiAqIHByb3ZpZGVkIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgaXQgaXMgYSBkYXRlLXRpbWUgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0RhdGVUaW1lRmllbGQgPSAoIGZpZWxkLCBzY2hlbWEgKSA9PlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkIF0gKSAmJlxuXHRoYXNGb3JtYXRQcm9wZXJ0eSggc2NoZW1hWyBmaWVsZCBdICkgJiZcblx0c2NoZW1hWyBmaWVsZCBdLmZvcm1hdCA9PT0gJ2RhdGUtdGltZSc7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIGZpZWxkIGlzIGEgVVRDIGRhdGUtdGltZSBmaWVsZC5cbiAqXG4gKiBJZiBzY2hlbWEgaXMgcHJvdmlkZWQsIHRoaXMgYWxzbyBjb25zaWRlcnMgd2hldGhlciB0aGlzIGlzIGEgZGF0ZS10aW1lIGZpZWxkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVGltZUZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYSBbb3B0aW9uYWxdXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoaXMgaXMgYSBVVEMgZmllbGQuICBJZiBzY2hlbWEgaXMgcHJvdmlkZWQgaXRcbiAqIG1lYW5zIHRoaXMgaXMgYWxzbyBhIGRhdGUtdGltZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzVVRDRGF0ZVRpbWVGaWVsZCA9ICggZGF0ZVRpbWVGaWVsZE5hbWUsIHNjaGVtYSA9IG51bGwgKSA9PiB7XG5cdHJldHVybiBzY2hlbWEgIT09IG51bGwgP1xuXHRcdGlzRGF0ZVRpbWVGaWVsZCggZGF0ZVRpbWVGaWVsZE5hbWUsIHNjaGVtYSApICYmXG5cdFx0XHRkYXRlVGltZUZpZWxkTmFtZS5pbmRleE9mKCAnX2dtdCcgKSA+IDAgOlxuXHRcdGRhdGVUaW1lRmllbGROYW1lLmluZGV4T2YoICdfZ210JyApID4gMDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCByZXByZXNlbnRzIGEgcHJpbWFyeSBrZXkgZmllbGQgdXNpbmcgdGhlXG4gKiBwcm92aWRlZCBzY2hlbWEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgaXQgaXMgYSBwcmltYXJ5IGtleSBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzUHJpbWFyeUtleUZpZWxkID0gKCBmaWVsZE5hbWUsIHNjaGVtYSApID0+XG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0gKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnByaW1hcnlfa2V5ICk7XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCByZXByZXNlbnRzIGEgcmVhZG9ubHkgZmllbGQgdXNpbmcgdGhlXG4gKiBwcm92aWRlZCBzY2hlbWEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgaXQgaXMgYSByZWFkb25seSBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzUmVhZE9ubHkgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT5cblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0ucmVhZG9ubHkgKSAmJlxuXHRzY2hlbWFbIGZpZWxkTmFtZSBdLnJlYWRvbmx5O1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCBpcyBhIFwiZW50aXR5XCIgZmllbGQgdXNpbmcgdGhlIHByb3ZpZGVkXG4gKiBzY2hlbWEuXG4gKlxuICogQW4gXCJlbnRpdHlcIiBmaWVsZCBpcyBhbnkgZmllbGQgdGhhdCBzYXRpc2ZpZXMgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIC0gZmllbGQgZXhpc3RzIGluIHRoZSBzY2hlbWFcbiAqIC0gaXQgaXMgbm90IHJlYWRvbmx5IG9yIGlzIGEgcHJpbWFyeSBrZXkgZmllbGQuXG4gKiAtIGl0IGlzIG5vdCBhIHV0YyBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoaXMgaXMgYW4gZW50aXR5IGZpZWxkXG4gKi9cbmV4cG9ydCBjb25zdCBpc0VudGl0eUZpZWxkID0gKCBmaWVsZE5hbWUsIHNjaGVtYSApID0+XG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0gKSAmJlxuXHQoICEgaXNSZWFkT25seSggZmllbGROYW1lLCBzY2hlbWEgKSB8fFxuXHRcdGlzUHJpbWFyeUtleUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApXG5cdCkgJiZcblx0ISBpc1VUQ0RhdGVUaW1lRmllbGQoIGZpZWxkTmFtZSApICYmXG5cdGZpZWxkTmFtZSAhPT0gJ19wcm90ZWN0ZWQnO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBmaWVsZCByZXByZXNlbnRzIGEgdmFsdWUgb2YgbW9uZXkgZnJvbSB0aGUgcHJvdmlkZWRcbiAqIHNjaGVtYS5cbiAqXG4gKiBBIGZpZWxkIGlzIGEgbW9uZXkgZmllbGQgaWYgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBzYXRpc2ZpZWQ6XG4gKlxuICogLSBJdCBleGlzdHMgaW4gdGhlIHNjaGVtYVxuICogLSBJdCBoYXMgYSBwcmV0dHkgcHJvcGVydHlcbiAqIC0gVGhlIHByZXR0eSBwcm9wZXJ0eSB2YWx1ZSBoYXMgYSBmb3JtYXQgcHJvcGVydHkuXG4gKiAtIFRoZSBmb3JtYXQgcHJvcGVydHkgaXMgZXF1YWwgdG8gJ21vbmV5J1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgaXQgaXMgYSBtb25leSBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTW9uZXlGaWVsZCA9ICggZmllbGROYW1lLCBzY2hlbWEgKSA9PlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgJiZcblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzICkgJiZcblx0aGFzUHJldHR5UHJvcGVydHkoIHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcyApICYmXG5cdGhhc0Zvcm1hdFByb3BlcnR5KCBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucHJldHR5ICkgJiZcblx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnByZXR0eS5mb3JtYXQgPT09ICdtb25leSc7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGZpZWxkIGlzIGFuIGVudW0gdHlwZSBmaWVsZCBhcyBkZWZpbmVkIGluIHRoZSBwcm92aWRlZFxuICogc2NoZW1hLlxuICpcbiAqIE5vdGU6IHRoaXMgb25seSBldmFsdWF0ZXMgdGhlIHRvcC1sZXZlbCBmb3IgdGhlIGZpZWxkIHNjaGVtYS4gIElmIHRoZSBmaWVsZFxuICogaW4gdGhlIHNjaGVtYSBpcyBvZiB0eXBlICdvYmplY3QnIGFuZCBvbmUgb2YgdGhlIG9iamVjdCBwcm9wZXJ0aWVzIGlzIG9mIHR5cGVcbiAqICdlbnVtJyB0aGlzIHdpbGwgbm90IGNvbnNpZGVyIGl0IGFuIFwiZW51bVwiIGZpZWxkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIGlmIHRoZSBmaWVsZCBpcyBhbiBlbnVtIHR5cGUgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0VudW1GaWVsZCA9ICggZmllbGROYW1lLCBzY2hlbWEgKSA9PlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgJiZcblx0aGFzRW51bVByb3BlcnR5KCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgJiZcblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5lbnVtLmxlbmd0aCApICYmXG5cdHNjaGVtYVsgZmllbGROYW1lIF0uZW51bS5sZW5ndGggPiAwO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGFwcGx5RmlsdGVycyB9IGZyb20gJ0B3b3JkcHJlc3MvaG9va3MnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIENvbnN0YW50cyBkZXNjcmliaW5nIHRoZSBjdXJyZW50IFwic2F2ZSBzdGF0ZVwiIGZvciBhbiBlbnRpdHkuXG4gKlxuICogQHR5cGUge3tDTEVBTjogU3ltYm9sLCBORVc6IFN5bWJvbCwgRElSVFk6IFN5bWJvbH19XG4gKi9cbmV4cG9ydCBjb25zdCBTQVZFX1NUQVRFID0ge1xuXHRDTEVBTjogU3ltYm9sKCAnRW50aXR5IGlzIHBlcnNpc3RlZC4nICksXG5cdE5FVzogU3ltYm9sKCAnRW50aXR5IGlzIG5ldy4nICksXG5cdERJUlRZOiBTeW1ib2woICdFeGlzdGluZyBlbnRpdHkgaGFzIGNoYW5nZXMgYW5kIG5lZWRzIHBlcnNpc3RlZC4nICksXG59O1xuXG4vKipcbiAqIFZhbGlkYXRpb24gdHlwZXMgYXJlIGZvciBzY2hlbWEncyB0aGF0IGhhdmUgdmFsdWUgdmFyaWF0aW9ucy5cbiAqIEB0eXBlIHt7UkFXOiBzdHJpbmcsIFJFTkRFUkVEOiBzdHJpbmcsIFBSRVRUWTogc3RyaW5nfX1cbiAqL1xuZXhwb3J0IGNvbnN0IFZBTElEQVRFX1RZUEUgPSB7XG5cdFJBVzogJ3JhdycsXG5cdFJFTkRFUkVEOiAncmVuZGVyZWQnLFxuXHRQUkVUVFk6ICdwcmV0dHknLFxufTtcblxuLyoqXG4gKiBQcml2YXRlIHByb3BlcnRpZXMgdXNlZCBpbnRlcm5hbGx5IGJ5IHRoZSBCYXNlIEVudGl0eSBDbGFzc1xuICogQHR5cGUge3tzYXZlU3RhdGU6IGJvb2xlYW59fVxuICovXG5leHBvcnQgY29uc3QgUFJJVkFURV9QUk9QRVJUSUVTID0ge1xuXHRTQVZFX1NUQVRFOiBTeW1ib2woICdiYXNlRW50aXR5UHJpdmF0ZVByb3BlcnRpZXNTYXZlU3RhdGUnICksXG5cdFZBTElEQVRFX1RZUEVTOiBTeW1ib2woICdiYXNlRW50aXR5UHJpdmF0ZVByb3BlcnRpZXNWYWxpZGF0ZVR5cGVzJyApLFxufTtcblxuLyoqXG4gKiBIYXJkY29kZWQgbGlzdCBvZiBtb2RlbCBwcmVmaXhlcyBmb3IgZmllbGRzIG9uIG1vZGVscy5cblxuICogQSBtb2RlbCBwcmVmaXggaXMgc29tZXRoaW5nIHRoYXQgXCJuYW1lc3BhY2VzXCIgYSBmaWVsZCBvbiBhIG1vZGVsLiAgRm9yXG4gKiBleGFtcGxlLCBpZiB0aGUgZmllbGQgaXMgXCJFVlRfSURcIiwgdGhlbiB0aGUgcHJlZml4IGlzIFwiRVZUXCI7IGlmIHRoZSBmaWVsZCBpc1xuICogXCJEVFRfRVZUX3N0YXJ0XCIsIHRoZW4gdGhlIHByZWZpeGVzIGFyZSBcIkRUVFwiLCBhbmQgXCJEVFRfRVZUXCIuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge09iamVjdH0gQSBmaWx0ZXJlZCBvYmplY3QgaW5kZXhlZCBieSBtb2RlbCBuYW1lIGFuZCB0aGUgdmFsdWVzIGFyZVxuICogYW4gYXJyYXkgb2YgbW9kZWwgcHJlZml4ZXMgZm9yIHRoYXQgbW9kZWwuXG4gKi9cbmV4cG9ydCBjb25zdCBNT0RFTF9QUkVGSVhFUyA9ICggbW9kZWxOYW1lICkgPT4ge1xuXHRjb25zdCBwcmVmaXhNYXAgPSBhcHBseUZpbHRlcnMoXG5cdFx0J0ZIRUVfX0VOVElUWV9GQUNUT1JZX19DT05TVEFOVFNfX01PREVMX1BSRUZJWEVTJyxcblx0XHR7XG5cdFx0XHRhbnN3ZXI6IFsgJ0FOUycgXSxcblx0XHRcdGF0dGVuZGVlOiBbICdBVFQnIF0sXG5cdFx0XHRjaGFuZ2VfbG9nOiBbICdMT0cnIF0sXG5cdFx0XHRjaGVja2luOiBbICdDSEsnIF0sXG5cdFx0XHRjb3VudHJ5OiBbICdDTlQnIF0sXG5cdFx0XHRjdXJyZW5jeTogWyAnQ1VSJyBdLFxuXHRcdFx0Y3VycmVuY3lfcGF5bWVudF9tZXRob2Q6IFsgJ0NQTScgXSxcblx0XHRcdGRhdGV0aW1lOiBbICdEVFQnLCAnRFRUX0VWVCcgXSxcblx0XHRcdGRhdGV0aW1lX3RpY2tldDogWyAnRFRLJyBdLFxuXHRcdFx0ZXZlbnQ6IFsgJ0VWVCcgXSxcblx0XHRcdGV2ZW50X21lc3NhZ2VfdGVtcGxhdGU6IFsgJ0VNVCcgXSxcblx0XHRcdGV2ZW50X3F1ZXN0aW9uX2dyb3VwOiBbICdFUUcnIF0sXG5cdFx0XHRldmVudF92ZW51ZTogWyAnRVZWJyBdLFxuXHRcdFx0ZXh0cmFfam9pbjogWyAnRVhKJyBdLFxuXHRcdFx0ZXh0cmFfbWV0YTogWyAnRVhNJyBdLFxuXHRcdFx0bGluZV9pdGVtOiBbICdMSU4nIF0sXG5cdFx0XHRtZXNzYWdlOiBbICdNU0cnIF0sXG5cdFx0XHRtZXNzYWdlX3RlbXBsYXRlOiBbICdNVFAnIF0sXG5cdFx0XHRtZXNzYWdlX3RlbXBsYXRlX2dyb3VwOiBbICdHUlAnLCAnTVRQJyBdLFxuXHRcdFx0cGF5bWVudDogWyAnUEFZJyBdLFxuXHRcdFx0cGF5bWVudF9tZXRob2Q6IFsgJ1BNRCcgXSxcblx0XHRcdHBvc3RfbWV0YTogWyAnbWV0YScgXSxcblx0XHRcdHByaWNlOiBbICdQUkMnIF0sXG5cdFx0XHRwcmljZV90eXBlOiBbICdQUlQnIF0sXG5cdFx0XHRxdWVzdGlvbjogWyAnUVNUJyBdLFxuXHRcdFx0cXVlc3Rpb25fZ3JvdXA6IFsgJ1FTRycgXSxcblx0XHRcdHF1ZXN0aW9uX2dyb3VwX3F1ZXN0aW9uOiBbICdRR1EnIF0sXG5cdFx0XHRxdWVzdGlvbl9vcHRpb246IFsgJ1FTTycgXSxcblx0XHRcdHJlZ2lzdHJhdGlvbjogWyAnUkVHJyBdLFxuXHRcdFx0cmVnaXN0cmF0aW9uX3BheW1lbnQ6IFsgJ1JQWScgXSxcblx0XHRcdHN0YXRlOiBbICdTVEEnIF0sXG5cdFx0XHRzdGF0dXM6IFsgJ1NUUycgXSxcblx0XHRcdHRlcm06IFsgJ3Rlcm0nIF0sXG5cdFx0XHR0ZXJtX3JlbGF0aW9uc2hpcDogW10sXG5cdFx0XHR0ZXJtX3RheG9ub215OiBbICd0ZXJtX3RheG9ub215JyBdLFxuXHRcdFx0dGlja2V0OiBbICdUS1QnIF0sXG5cdFx0XHR0aWNrZXRfcHJpY2U6IFsgJ1RLUCcgXSxcblx0XHRcdHRpY2tldF90ZW1wbGF0ZTogWyAnVFRNJyBdLFxuXHRcdFx0dHJhbnNhY3Rpb246IFsgJ1RYTicgXSxcblx0XHRcdHZlbnVlOiBbICdWTlUnIF0sXG5cdFx0XHR3cF91c2VyOiBbICd1c2VyJyBdLFxuXHRcdH0gKTtcblx0cmV0dXJuICEgaXNVbmRlZmluZWQoIHByZWZpeE1hcFsgbW9kZWxOYW1lIF0gKSA/XG5cdFx0cHJlZml4TWFwWyBtb2RlbE5hbWUgXSA6XG5cdFx0W107XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGNhbWVsQ2FzZSxcblx0dXBwZXJGaXJzdCxcblx0Zm9yRWFjaCxcblx0aXNVbmRlZmluZWQsXG5cdGlzQXJyYXksXG5cdGtleXMsXG5cdHNvcnRCeSxcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjdWlkIGZyb20gJ2N1aWQnO1xuaW1wb3J0IHsgSW52YWxpZEFyZ3VtZW50IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRhc3NlcnRWYWxpZEZpZWxkQW5kVmFsdWVBZ2FpbnN0U2NoZW1hLFxuXHRhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZCxcbn0gZnJvbSAnLi9hc3NlcnRpb25zJztcbmltcG9ydCB7XG5cdGRlcml2ZVJlbmRlcmVkVmFsdWUsXG5cdGRlcml2ZVByZXBhcmVkVmFsdWVGb3JGaWVsZCxcblx0Z2V0UmVsYXRpb25OYW1lRnJvbUxpbmssXG5cdGdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JDbG9uaW5nLFxuXHRnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yUGVyc2lzdGluZyxcblx0Z2V0UHJpbWFyeUtleUZpZWxkc0Zyb21TY2hlbWEsXG5cdGdldEVudGl0eUZpZWxkc0Zyb21TY2hlbWEsXG5cdGdldERlZmF1bHRWYWx1ZUZvckZpZWxkLFxuXHRkZXJpdmVWYWxpZGF0ZVR5cGVGb3JGaWVsZCxcbn0gZnJvbSAnLi9leHRyYWN0b3JzJztcbmltcG9ydCB7XG5cdGlzRW50aXR5RmllbGQsXG5cdGlzUHJpbWFyeUtleUZpZWxkLFxufSBmcm9tICcuL2Jvb2xlYW5zJztcbmltcG9ydCB7IFBSSVZBVEVfUFJPUEVSVElFUywgU0FWRV9TVEFURSB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqKFxuICogQSBnZW5lcmljIGdldHRlciBjcmVhdG9yIGZvciBhIHByb3ZpZGVkIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZSAgVGhlIG5hbWUgb2YgdGhlIGFjY2Vzc29yLlxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyB1c2VkIHRvIHBhc3MgdGhyb3VnaCBhZGRpdGlvbmFsIG9wdGlvbnMgZm9yIHRoZVxuICogT2JqZWN0LmRlZmluZVByb3BlcnR5IGNhbGwuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVHZXR0ZXIgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIG9wdHMgPSB7fSApID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBpbnN0YW5jZSwgZmllbGROYW1lLCB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIGZpZWxkVmFsdWU7XG5cdFx0fSxcblx0XHQuLi5vcHRzLFxuXHR9ICk7XG59O1xuXG4vKipcbiAqIFRoaXMgY3JlYXRlcyBhIGdldHRlciB0aGF0IGNhbGxzIHRoZSBwcm92aWRlZCBjYWxsYmFjayB3aGVuIGludm9rZWQuXG4gKlxuICogVGhlIGNhbGxiYWNrIHJlY2VpdmVzIHRoZSBgaW5zdGFuY2VgIGFyZ3VtZW50IHBhc3NlZCB0aHJvdWdoXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCl9IGNhbGxCYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQ2FsbGJhY2tHZXR0ZXIgPSAoXG5cdGluc3RhbmNlLFxuXHRwcm9wZXJ0eU5hbWUsXG5cdGNhbGxCYWNrLFxuXHRvcHRzID0ge31cbikgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGluc3RhbmNlLCBwcm9wZXJ0eU5hbWUsIHtcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gY2FsbEJhY2soIGluc3RhbmNlICk7XG5cdFx0fSxcblx0XHQuLi5vcHRzLFxuXHR9ICk7XG59O1xuXG4vKipcbiAqIEEgZ2VuZXJpYyBnZXR0ZXIgYW5kIHNldHRlciBjcmVhdG9yIGZvciBhIHByb3ZpZGVkIGluc3RhbmNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9ICBpbml0aWFsRmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwsIHBhc3MgdGhyb3VnaCBvcHRpb25zIHVzZWQgYnlcbiAqIE9iamVjdC5kZWZpbmVQcm9wZXJ0eVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlR2V0dGVyQW5kU2V0dGVyID0gKFxuXHRpbnN0YW5jZSxcblx0ZmllbGROYW1lLFxuXHRpbml0aWFsRmllbGRWYWx1ZSxcblx0b3B0cyA9IHt9LFxuKSA9PiB7XG5cdGxldCBwcm9wZXJ0eVZhbHVlID0gaW5pdGlhbEZpZWxkVmFsdWU7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggaW5zdGFuY2UsIGZpZWxkTmFtZSwge1xuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiBwcm9wZXJ0eVZhbHVlO1xuXHRcdH0sXG5cdFx0c2V0KCByZWNlaXZlZFZhbHVlICkge1xuXHRcdFx0YXNzZXJ0VmFsaWRWYWx1ZUZvclByZXBhcmVkRmllbGQoXG5cdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0cmVjZWl2ZWRWYWx1ZSxcblx0XHRcdFx0aW5zdGFuY2Vcblx0XHRcdCk7XG5cdFx0XHRzZXRTYXZlU3RhdGUoIGluc3RhbmNlLCBTQVZFX1NUQVRFLkRJUlRZICk7XG5cdFx0XHRzZXRGaWVsZFRvUGVyc2lzdCggaW5zdGFuY2UsIGZpZWxkTmFtZSApO1xuXHRcdFx0cHJvcGVydHlWYWx1ZSA9IHJlY2VpdmVkVmFsdWU7XG5cdFx0fSxcblx0XHQuLi5vcHRzLFxuXHR9ICk7XG59O1xuXG4vKipcbiAqIEEgZ2V0dGVyIGFuZCBzZXR0ZXIgY3JlYXRvciBmb3IgYW4gZmllbGQgYWxpYXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JpZ2luYWxGaWVsZE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBhbGlhc0ZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyID0gKFxuXHRpbnN0YW5jZSxcblx0b3JpZ2luYWxGaWVsZE5hbWUsXG5cdGFsaWFzRmllbGROYW1lLFxuXHRvcHRzID0ge30sXG4pID0+IHtcblx0aWYgKCBvcmlnaW5hbEZpZWxkTmFtZSAhPT0gYWxpYXNGaWVsZE5hbWUgKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBpbnN0YW5jZSwgYWxpYXNGaWVsZE5hbWUsIHtcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIGluc3RhbmNlWyBvcmlnaW5hbEZpZWxkTmFtZSBdO1xuXHRcdFx0fSxcblx0XHRcdHNldCggcmVjZWl2ZWRWYWx1ZSApIHtcblx0XHRcdFx0cmV0dXJuIGluc3RhbmNlWyBvcmlnaW5hbEZpZWxkTmFtZSBdID0gcmVjZWl2ZWRWYWx1ZTtcblx0XHRcdH0sXG5cdFx0XHQuLi5vcHRzLFxuXHRcdH0gKTtcblx0fVxufTtcblxuLyoqXG4gKiBBIGdldHRlciBjcmVhdG9yIGZvciBhIGZpZWxkIGFsaWFzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IG9yaWdpbmFsRmllbGROYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gYWxpYXNGaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBbGlhc0dldHRlciA9IChcblx0aW5zdGFuY2UsXG5cdG9yaWdpbmFsRmllbGROYW1lLFxuXHRhbGlhc0ZpZWxkTmFtZSxcblx0b3B0cyA9IHt9LFxuKSA9PiB7XG5cdGlmICggb3JpZ2luYWxGaWVsZE5hbWUgIT09IGFsaWFzRmllbGROYW1lICkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggaW5zdGFuY2UsIGFsaWFzRmllbGROYW1lLCB7XG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHJldHVybiBpbnN0YW5jZVsgb3JpZ2luYWxGaWVsZE5hbWUgXTtcblx0XHRcdH0sXG5cdFx0XHQuLi5vcHRzLFxuXHRcdH0gKTtcblx0fVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZmx1ZW50IHNldHRlciBvbiB0aGUgcHJvdmlkZWQgaW5zdGFuY2UgZm9yIHRoZSBnaXZlbiBmaWVsZCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgIE9wdGlvbnMgZm9yIE9iamVjdC5kZWZpbmVQcm9wZXJ0eVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlRmx1ZW50U2V0dGVyID0gKCBpbnN0YW5jZSwgZmllbGROYW1lLCBvcHRzID0ge30gKSA9PiB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggaW5zdGFuY2UsICdzZXQnICsgdXBwZXJGaXJzdCggZmllbGROYW1lICksIHtcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gKCByZWNlaXZlZFZhbHVlICkgPT4ge1xuXHRcdFx0XHRpbnN0YW5jZVsgZmllbGROYW1lIF0gPSByZWNlaXZlZFZhbHVlO1xuXHRcdFx0XHRyZXR1cm4gaW5zdGFuY2U7XG5cdFx0XHR9O1xuXHRcdH0sXG5cdFx0Li4ub3B0cyxcblx0fSApO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGluaXRpYWwgZ2V0dGVycyBhbmQgc2V0dGVycyBmb3IgZW50aXRpZXMgb24gdGhlIHByb3ZpZGVkIGVudGl0eVxuICogaW5zdGFuY2UgdXNpbmcgdGhlIGdpdmVuIGRhdGEuXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIGtleXMgb24gaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVFbnRpdHlHZXR0ZXJzQW5kU2V0dGVycyA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdGNvbnN0IHByaW1hcnlLZXlzID0gW107XG5cdGZvckVhY2goXG5cdFx0aW5zdGFuY2Uub3JpZ2luYWxGaWVsZHNBbmRWYWx1ZXMsXG5cdFx0KCBmaWVsZFZhbHVlLCBmaWVsZE5hbWUgKSA9PiB7XG5cdFx0XHRjb25zdCBpc1ByaW1hcnlLZXkgPSBpc1ByaW1hcnlLZXlGaWVsZCggZmllbGROYW1lLCBpbnN0YW5jZS5zY2hlbWEgKTtcblx0XHRcdHNldFZhbGlkYXRlVHlwZUZvckZpZWxkKCBpbnN0YW5jZSwgZmllbGROYW1lLCBmaWVsZFZhbHVlICk7XG5cdFx0XHRpZiAoIGlzRW50aXR5RmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hICkgKSB7XG5cdFx0XHRcdGlmICggaW5zdGFuY2UuaXNOZXcgKSB7XG5cdFx0XHRcdFx0YXNzZXJ0VmFsaWRWYWx1ZUZvclByZXBhcmVkRmllbGQoXG5cdFx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRcdFx0aW5zdGFuY2Vcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFzc2VydFZhbGlkRmllbGRBbmRWYWx1ZUFnYWluc3RTY2hlbWEoXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5tb2RlbE5hbWUsXG5cdFx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRcdFx0aW5zdGFuY2Vcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNldEluaXRpYWxFbnRpdHlGaWVsZHNBbmRWYWx1ZXMoXG5cdFx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdFx0aXNQcmltYXJ5S2V5XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGZpZWxkTmFtZSA9PT0gJ19jYWxjdWxhdGVkX2ZpZWxkcycgKSB7XG5cdFx0XHRcdHNldENhbGN1bGF0ZWRGaWVsZEFuZFZhbHVlcyggaW5zdGFuY2UsIGZpZWxkVmFsdWUgKTtcblx0XHRcdH1cblx0XHRcdGlmICggZmllbGROYW1lID09PSAnX3Byb3RlY3RlZCcgKSB7XG5cdFx0XHRcdHBvcHVsYXRlUHJvdGVjdGVkRmllbGRzUHJvcGVydHkoIGluc3RhbmNlLCBmaWVsZFZhbHVlICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGZpZWxkTmFtZSA9PT0gJ2xpbmsnICkge1xuXHRcdFx0XHRjcmVhdGVHZXR0ZXIoIGluc3RhbmNlLCAnbGluaycsIGZpZWxkVmFsdWUgKTtcblx0XHRcdH1cblx0XHRcdGlmICggZmllbGROYW1lID09PSAnX2xpbmtzJyApIHtcblx0XHRcdFx0c2V0UmVzb3VyY2VzKCBpbnN0YW5jZSwgZmllbGRWYWx1ZSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCAhIGluc3RhbmNlLmlzTmV3ICYmIGlzUHJpbWFyeUtleSApIHtcblx0XHRcdFx0cHJpbWFyeUtleXMucHVzaCggZmllbGROYW1lICk7XG5cdFx0XHR9XG5cdFx0fVxuXHQpO1xuXHRpZiAoICEgaW5zdGFuY2UuaXNOZXcgJiYgcHJpbWFyeUtleXMubGVuZ3RoICkge1xuXHRcdGNyZWF0ZVByaW1hcnlLZXlGaWVsZEdldHRlcnMoIGluc3RhbmNlLCBwcmltYXJ5S2V5cyApO1xuXHR9XG5cblx0cG9wdWxhdGVQcmltYXJ5S2V5cyggaW5zdGFuY2UgKTtcblx0cG9wdWxhdGVNaXNzaW5nRmllbGRzKCBpbnN0YW5jZSApO1xufTtcblxuLyoqXG4gKiBQb3B1bGF0ZXMgdGhlIGBwcm90ZWN0ZWRGaWVsZHNgIHByb3BlcnR5IG9uIHRoZSBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7QXJyYXl9IHByb3RlY3RlZEZpZWxkc1xuICovXG5jb25zdCBwb3B1bGF0ZVByb3RlY3RlZEZpZWxkc1Byb3BlcnR5ID0gKCBpbnN0YW5jZSwgcHJvdGVjdGVkRmllbGRzICkgPT4ge1xuXHQvLyBnZXQgYW55IGNhbGN1bGF0ZWQgcHJvdGVjdGVkIGZpZWxkcy5cblx0Y29uc3QgY2FsY3VsYXRlZEZpZWxkcyA9IGluc3RhbmNlXG5cdFx0Lm9yaWdpbmFsRmllbGRzQW5kVmFsdWVzXG5cdFx0Ll9jYWxjdWxhdGVkX2ZpZWxkcyB8fCB7fTtcblx0aWYgKFxuXHRcdGNhbGN1bGF0ZWRGaWVsZHMuX3Byb3RlY3RlZCAmJlxuXHRcdGlzQXJyYXkoIGNhbGN1bGF0ZWRGaWVsZHMuX3Byb3RlY3RlZCApXG5cdCkge1xuXHRcdHByb3RlY3RlZEZpZWxkcyA9IFtcblx0XHRcdC4uLnByb3RlY3RlZEZpZWxkcyxcblx0XHRcdC4uLmNhbGN1bGF0ZWRGaWVsZHMuX3Byb3RlY3RlZCxcblx0XHRdO1xuXHR9XG5cdGNyZWF0ZUdldHRlciggaW5zdGFuY2UsICdwcm90ZWN0ZWRGaWVsZHMnLCBwcm90ZWN0ZWRGaWVsZHMgKTtcbn07XG5cbi8qKlxuICogVGhpcyBwb3B1bGF0ZXMgcHJpbWFyeSBrZXkgZmllbGRzLlxuICogTm90ZSB0aGF0IGl0IGFsc28gb3ZlcnJpZGVzIGFueSBwcmltYXJ5IGtleSB2YWx1ZXMvcHJvcGVydGllcyB0aGF0IGFyZVxuICogYWxyZWFkeSBzZXQgaW4gdGhlIGVudGl0eSBzbyBpcyBvbmx5IHByb2Nlc3NlZCB3aGVuIHRoZSBpbnN0YW5jZSBpcyBuZXcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKi9cbmNvbnN0IHBvcHVsYXRlUHJpbWFyeUtleXMgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRpZiAoICEgaW5zdGFuY2UuaXNOZXcgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGNvbnN0IHByaW1hcnlLZXlzID0gZ2V0UHJpbWFyeUtleUZpZWxkc0Zyb21TY2hlbWEoIGluc3RhbmNlICk7XG5cdGZvckVhY2goIHByaW1hcnlLZXlzLCAoXG5cdFx0c2NoZW1hUHJvcGVydGllcyxcblx0XHRzY2hlbWFGaWVsZFxuXHQpID0+IHtcblx0XHQvLyBhbHdheXMgZGVsZXRlIGFuZCBvdmVycmlkZSB3aGF0IGlzIGV4aXN0aW5nLlxuXHRcdGlmICggaW5zdGFuY2VbIHNjaGVtYUZpZWxkIF0gKSB7XG5cdFx0XHRkZWxldGUgaW5zdGFuY2VbIHNjaGVtYUZpZWxkIF07XG5cdFx0fVxuXHRcdGNyZWF0ZUdldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0c2NoZW1hRmllbGQsXG5cdFx0XHRjdWlkKCksXG5cdFx0XHR7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSB9XG5cdFx0KTtcblx0XHRjcmVhdGVBbGlhc0dldHRlckZvckZpZWxkKCBpbnN0YW5jZSwgc2NoZW1hRmllbGQgKTtcblx0fSApO1xuXHRjcmVhdGVQcmltYXJ5S2V5RmllbGRHZXR0ZXJzKFxuXHRcdGluc3RhbmNlLFxuXHRcdGtleXMoIHByaW1hcnlLZXlzIClcblx0KTtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgdmFsaWRhdGUgdHlwZSBmb3IgYSBmaWVsZCBwcm9wZXJ0eS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKi9cbmNvbnN0IHNldFZhbGlkYXRlVHlwZUZvckZpZWxkID0gKCBpbnN0YW5jZSwgZmllbGROYW1lLCBmaWVsZFZhbHVlICkgPT4ge1xuXHRpbnN0YW5jZVsgUFJJVkFURV9QUk9QRVJUSUVTLlZBTElEQVRFX1RZUEVTIF1bIGZpZWxkTmFtZSBdID1cblx0XHRkZXJpdmVWYWxpZGF0ZVR5cGVGb3JGaWVsZCggZmllbGROYW1lLCBmaWVsZFZhbHVlLCBpbnN0YW5jZS5zY2hlbWEgKTtcbn07XG5cbi8qKlxuICogIFBvcHVsYXRlcyBtaXNzaW5nIGZpZWxkcyBhbmQgdmFsdWVzIHVzaW5nIGRlZmF1bHRzIHByb3ZpZGVkIGJ5IHNjaGVtYS4gIElmXG4gKiAgc2NoZW1hIGRvZXNuJ3QgcHJvdmlkZSBhIGRlZmF1bHQgdGhlbiB0aGlzIHdpbGwgcG9wdWxhdGUgdGhlIGZpZWxkIHdpdGggYVxuICogIGRlZmF1bHQgdmFsdWUgdGhhdCBtYXRjaGVzIHRoZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICovXG5jb25zdCBwb3B1bGF0ZU1pc3NpbmdGaWVsZHMgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRpZiAoIHR5cGVvZiBpbnN0YW5jZS5wcm90ZWN0ZWRGaWVsZHMgPT09ICd1bmRlZmluZWQnICkge1xuXHRcdHBvcHVsYXRlUHJvdGVjdGVkRmllbGRzUHJvcGVydHkoIGluc3RhbmNlLCBbXSApO1xuXHR9XG5cdGlmICggISBpbnN0YW5jZS5pc05ldyApIHtcblx0XHRyZXR1cm47XG5cdH1cblx0Zm9yRWFjaChcblx0XHRnZXRFbnRpdHlGaWVsZHNGcm9tU2NoZW1hKCBpbnN0YW5jZSApLFxuXHRcdCggc2NoZW1hUHJvcGVydGllcywgZmllbGROYW1lICkgPT4ge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHR0eXBlb2YgaW5zdGFuY2VbIGZpZWxkTmFtZSBdID09PSAndW5kZWZpbmVkJyAmJlxuXHRcdFx0XHQhIGlzUHJpbWFyeUtleUZpZWxkKCBmaWVsZE5hbWUsIGluc3RhbmNlLnNjaGVtYSApXG5cdFx0XHQpIHtcblx0XHRcdFx0c2V0SW5pdGlhbEVudGl0eUZpZWxkc0FuZFZhbHVlcyhcblx0XHRcdFx0XHRpbnN0YW5jZSxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0KTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHBsYWluIG9iamVjdCBvZiBlbnRpdHkgZmllbGRzIGFuZCB2YWx1ZXMgZnJvbSB0aGlzIGVudGl0eSBpbnN0YW5jZVxuICogZm9yIHVzZSBpbiBjbG9uaW5nIHRoZSBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gUGxhaW4gb2JqZWN0IG9mIGFsbCBmaWVsZDp2YWx1ZSBwYWlycy5cbiAqL1xuY29uc3QgZm9yQ2xvbmUgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRyZXR1cm4gZ2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvckNsb25pbmcoIGluc3RhbmNlICk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwbGFpbiBvYmplY3Qgb2YgdGhlIGVudGl0eSBmaWVsZHMgYW5kIHZhbHVlcyBmcm9tIHRoaXMgZW50aXR5XG4gKiBpbnN0YW5jZSBwcmVwYXJlZCBmb3IgdXNlIGluIGFuIHVwZGF0ZSByZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBQbGFpbiBvYmplY3Qgb2YgZmllbGQ6dmFsdWUgcGFpcnMuXG4gKi9cbmNvbnN0IGZvclVwZGF0ZSA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdHJldHVybiBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yUGVyc2lzdGluZyggaW5zdGFuY2UgKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHBsYWluIG9iamVjdCBvZiB0aGUgZW50aXR5IGZpZWxkcyBhbmQgdmFsdWVzIGZyb20gdGhpcyBlbnRpdHlcbiAqIGluc3RhbmNlIHByZXBhcmVkIGZvciB1c2UgaW4gYW4gaW5zZXJ0IHJlcXVlc3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtPYmplY3R9IFBsYWluIG9iamVjdCBvZiBmaWVsZDp2YWx1ZSBwYWlycy5cbiAqL1xuY29uc3QgZm9ySW5zZXJ0ID0gKCBpbnN0YW5jZSApID0+IHtcblx0Y29uc3QgZW50aXR5VmFsdWVzID0gZ2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvclBlcnNpc3RpbmcoXG5cdFx0aW5zdGFuY2UsXG5cdFx0dHJ1ZVxuXHQpO1xuXHRpbnN0YW5jZS5wcmltYXJ5S2V5cy5mb3JFYWNoKCAoIHByaW1hcnlLZXkgKSA9PiB7XG5cdFx0ZW50aXR5VmFsdWVzWyBwcmltYXJ5S2V5IF0gPSBpbnN0YW5jZVsgcHJpbWFyeUtleSBdO1xuXHR9ICk7XG5cdHJldHVybiBlbnRpdHlWYWx1ZXM7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwbGFpbiBvYmplY3Qgb2YgdGhlIGVudGl0eSBmaWVsZHMgYW5kIHZhbHVlcyBmcm9tIHRoaXMgZW50aXR5XG4gKiBpbnN0YW5jZSBwcmVwYXJlZCBmb3IgdXNlIGluIGVpdGhlciBhbiBpbnNlcnQgb3IgdXBkYXRlIHJlcXVlc3QuICBUaGUgdHlwZVxuICogaXMgYXV0b21hdGljYWxseSBkZXJpdmVkIGZyb20gdGhlIGRldGVybWluaW5nIHdoZXRoZXIgdGhlIGVudGl0eSBpcyBcIm5ld1wiIG9yXG4gKiBub3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtPYmplY3R9IFBsYWluIG9iamVjdCBvZiBmaWVsZDp2YWx1ZSBwYWlycy5cbiAqL1xuY29uc3QgZm9yUGVyc2lzdCA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdGlmICggaW5zdGFuY2UuaXNOZXcgKSB7XG5cdFx0cmV0dXJuIGZvckluc2VydCggaW5zdGFuY2UgKTtcblx0fVxuXHRyZXR1cm4gZm9yVXBkYXRlKCBpbnN0YW5jZSApO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGdldHRlcnMgZm9yIHJldHJpZXZpbmcgdGhlIGZpZWxkcyBhbmQgdmFsdWVzIG9mIHRoZSBlbnRpdHkgaW5zdGFuY2VcbiAqIGZvciBpbnNlcnQgb3IgdXBkYXRlIHJlcXVlc3RzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlUGVyc2lzdGluZ0dldHRlcnNBbmRTZXR0ZXJzID0gKCBpbnN0YW5jZSApID0+IHtcblx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoIGluc3RhbmNlLCAnZm9yVXBkYXRlJywgZm9yVXBkYXRlICk7XG5cdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKCBpbnN0YW5jZSwgJ2Zvckluc2VydCcsIGZvckluc2VydCApO1xuXHRjcmVhdGVDYWxsYmFja0dldHRlciggaW5zdGFuY2UsICdmb3JQZXJzaXN0JywgZm9yUGVyc2lzdCApO1xuXHRjcmVhdGVDYWxsYmFja0dldHRlciggaW5zdGFuY2UsICdmb3JDbG9uZScsIGZvckNsb25lICk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgaW5pdGlhbCBlbnRpdHkgZmllbGQgYWNjZXNzb3JzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzUHJpbWFyeUtleVxuICovXG5jb25zdCBzZXRJbml0aWFsRW50aXR5RmllbGRzQW5kVmFsdWVzID0gKFxuXHRpbnN0YW5jZSxcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRpc1ByaW1hcnlLZXkgPSBmYWxzZSxcbikgPT4ge1xuXHRpZiAoIGlzVW5kZWZpbmVkKCBmaWVsZFZhbHVlICkgKSB7XG5cdFx0ZmllbGRWYWx1ZSA9IGdldERlZmF1bHRWYWx1ZUZvckZpZWxkKCBmaWVsZE5hbWUsIGluc3RhbmNlLnNjaGVtYSApO1xuXHRcdHNldFZhbGlkYXRlVHlwZUZvckZpZWxkKCBpbnN0YW5jZSwgZmllbGROYW1lLCBmaWVsZFZhbHVlICk7XG5cdH1cblx0Y3JlYXRlUmF3RW50aXR5R2V0dGVyc1NldHRlcnMoXG5cdFx0aW5zdGFuY2UsXG5cdFx0ZmllbGROYW1lLFxuXHRcdGRlcml2ZVByZXBhcmVkVmFsdWVGb3JGaWVsZCggZmllbGROYW1lLCBmaWVsZFZhbHVlLCBpbnN0YW5jZSApLFxuXHRcdGlzUHJpbWFyeUtleVxuXHQpO1xuXHRpZiAoICEgaXNQcmltYXJ5S2V5ICkge1xuXHRcdGNyZWF0ZVJlbmRlcmVkR2V0dGVycyhcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0ZGVyaXZlUmVuZGVyZWRWYWx1ZSggZmllbGRWYWx1ZSApXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIHJhdyBlbnRpdHkgZ2V0dGVycyBhbmQgc2V0dGVycy4gIFRoZXNlIGFyZSB0aGUgcHJvcGVydGllcyBvZiBhblxuICogZW50aXR5IHRoYXQgaGF2ZSB0aGUgdmFsdWVzIHVzZWQgZm9yIG5vdCBvbmx5IGdldHRpbmcgYnV0IGFsc28gc2V0dGluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBpc1ByaW1hcnlLZXkgc2V0IHRvIHRydWUgaWYgZmllbGQgaXMgdGhlIG1vZGVsJ3MgcHJpbWFyeSBrZXlcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVJhd0VudGl0eUdldHRlcnNTZXR0ZXJzID0gKFxuXHRpbnN0YW5jZSxcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRpc1ByaW1hcnlLZXkgPSBmYWxzZSxcbikgPT4ge1xuXHRjb25zdCBvcHRzID0geyBlbnVtZXJhYmxlOiB0cnVlIH07XG5cdC8vIHByaW1hcnkga2V5IGlzIGltbXV0YWJsZVxuXHRpZiAoIGlzUHJpbWFyeUtleSApIHtcblx0XHRjcmVhdGVHZXR0ZXIoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRvcHRzXG5cdFx0KTtcblx0XHRjcmVhdGVBbGlhc0dldHRlckZvckZpZWxkKCBpbnN0YW5jZSwgZmllbGROYW1lICk7XG5cdH0gZWxzZSB7XG5cdFx0Y3JlYXRlR2V0dGVyQW5kU2V0dGVyKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0b3B0c1xuXHRcdCk7XG5cdFx0Y3JlYXRlRmx1ZW50U2V0dGVyKCBpbnN0YW5jZSwgZmllbGROYW1lICk7XG5cdFx0Y3JlYXRlQWxpYXNHZXR0ZXJBbmRTZXR0ZXJGb3JGaWVsZCggaW5zdGFuY2UsIGZpZWxkTmFtZSApO1xuXHR9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgXCJhbGlhc1wiIGdldHRlciBmb3IgdGhlIGdpdmVuIGZpZWxkIG5hbWUgb24gdGhlIGVudGl0eSBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQWxpYXNHZXR0ZXJGb3JGaWVsZCA9ICggaW5zdGFuY2UsIGZpZWxkTmFtZSApID0+IHtcblx0Y3JlYXRlQWxpYXNlc0Zvck1ldGhvZCggaW5zdGFuY2UsIGZpZWxkTmFtZSwgY3JlYXRlQWxpYXNHZXR0ZXIgKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBcImFsaWFzXCIgZ2V0dGVycyBhbmQgc2V0dGVycyBmb3IgdGhlIGdpdmVuIGZpZWxkIG9uIHRoZSBlbnRpdHlcbiAqIGluc3RhbmNlLlxuICpcbiAqIEV4YW1wbGU6IERhdGV0aW1lIGVudGl0aWVzIGhhdmUgYSBgRFRUX0VWVF9zdGFydGAgZmllbGQuICBPbiB0aGUgZW50aXR5XG4gKiBpbnN0YW5jZSwgeW91IHdpbGwgYmUgYWJsZSB0byBhY2Nlc3MgdGhlIHZhbHVlIG9mIHRoYXQgZmllbGQgdmlhOlxuICogLSBkYXRldGltZS5EVFRfRVZUX3N0YXJ0XG4gKiAtIGRhdGV0aW1lLmR0dEV2dFN0YXJ0XG4gKiAtIGRhdGV0aW1lLmV2dFN0YXJ0XG4gKiAtIGRhdGV0aW1lLnN0YXJ0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBbGlhc0dldHRlckFuZFNldHRlckZvckZpZWxkID0gKCBpbnN0YW5jZSwgZmllbGROYW1lICkgPT4ge1xuXHRjcmVhdGVBbGlhc2VzRm9yTWV0aG9kKCBpbnN0YW5jZSwgZmllbGROYW1lLCBjcmVhdGVBbGlhc0dldHRlckFuZFNldHRlciApO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIEFsaWFzZXMgdXNpbmcgdGhlIHByb3ZpZGVkIG1ldGhvZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kXG4gKi9cbmNvbnN0IGNyZWF0ZUFsaWFzZXNGb3JNZXRob2QgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUsIG1ldGhvZCApID0+IHtcblx0Ly8gY2FtZWxDYXNlIGdldHRlciAob3Igc2V0dGVyKSBmb3IgZnVsbCBmaWVsZCBuYW1lIChlZy4gRVZUX2Rlc2MgPT4gZXZ0RGVzYylcblx0bWV0aG9kKCBpbnN0YW5jZSwgZmllbGROYW1lLCBjYW1lbENhc2UoIGZpZWxkTmFtZSApICk7XG5cdC8vIHN0cmlwIGZpZWxkIHByZWZpeGVzIGFuZCBjYW1lbENhc2UgKGlmIHRoZXJlIGFyZSBmaWVsZCBwcmVmaXhlcyBmb3IgdGhlXG5cdC8vIGVudGl0eS4gKGVnLiBFVlRfZGVzYyA9PiBkZXNjKTtcblx0aWYgKCBpbnN0YW5jZS5maWVsZFByZWZpeGVzICkge1xuXHRcdGxldCBuZXdGaWVsZE5hbWUgPSAnJztcblx0XHQvLyBZZXMsIGl0cyBpbnRlbmRlZCB0aGF0IGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBwcmVmaXhlcywgdGhpcyBjb3VsZFxuXHRcdC8vIGVuZCB1cCBjcmVhdGluZyBtdWx0aXBsZSBhbGlhc2VkIGdldHRlcnMgKG9yIHNldHRlcnMpXG5cdFx0Ly8gKGVnIERhdGV0aW1lOiBEVFRfRVZUX3N0YXJ0IHdvdWxkIGVuZCB1cCB3aXRoIGBldnRTdGFydGAgYW5kIGBzdGFydGBcblx0XHQvLyBhcyBnZXR0ZXIgYWNjZXNzb3JzKS5cblx0XHRpbnN0YW5jZS5maWVsZFByZWZpeGVzLmZvckVhY2goICggZmllbGRQcmVmaXggKSA9PiB7XG5cdFx0XHRuZXdGaWVsZE5hbWUgPSBmaWVsZE5hbWUucmVwbGFjZSggZmllbGRQcmVmaXggKyAnXycsICcnICk7XG5cdFx0XHRpZiAoIG5ld0ZpZWxkTmFtZSAhPT0gZmllbGROYW1lICkge1xuXHRcdFx0XHRtZXRob2QoXG5cdFx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdGNhbWVsQ2FzZSggbmV3RmllbGROYW1lIClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhIGNhbGxiYWNrIHRoYXQgaXMgdXNlZCBpbiB0aGUgYGdldFJlbmRlcmVkYCBmaWVsZCBnZXR0ZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKHN0cmluZyk6ICp9ICBBIGNhbGxiYWNrLlxuICovXG5jb25zdCBnZXRSZW5kZXJlZENhbGxiYWNrID0gKCBpbnN0YW5jZSApID0+ICggcmVxdWVzdGVkRmllbGROYW1lICkgPT5cblx0aW5zdGFuY2VbIHJlcXVlc3RlZEZpZWxkTmFtZSArICdSZW5kZXJlZCcgXTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgZmllbGROYW1lIHN0cmlwcGVkIG9mIGFsbCBwb3NzaWJsZSBwcmVmaXhlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHByZWZpeCBmcmVlIGZpZWxkTmFtZS5cbiAqL1xuY29uc3QgcmVtb3ZlUHJlZml4ZXNGcm9tRmllbGQgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUgKSA9PiB7XG5cdGNvbnN0IHByZWZpeGVzVG9SZW1vdmUgPSBzb3J0QnkoXG5cdFx0aW5zdGFuY2UuZmllbGRQcmVmaXhlcyxcblx0XHQoIHByZWZpeCApID0+IHByZWZpeC5sZW5ndGggKiAtMVxuXHQpO1xuXHRsZXQgbmV3RmllbGROYW1lID0gZmllbGROYW1lO1xuXHRmb3JFYWNoKCBwcmVmaXhlc1RvUmVtb3ZlLCAoIHByZWZpeCApID0+IHtcblx0XHRuZXdGaWVsZE5hbWUgPSBmaWVsZE5hbWUucmVwbGFjZSggcHJlZml4LCAnJyApO1xuXHRcdGlmICggbmV3RmllbGROYW1lICE9PSBmaWVsZE5hbWUgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9ICk7XG5cdHJldHVybiBuZXdGaWVsZE5hbWU7XG59O1xuXG4vKipcbiAqIFRoaXMgY3JlYXRlcyB0aGUgZ2V0dGVycyBmb3IgdGhlIHJlbmRlcmVkIHByb3BlcnR5IG9mIG1vZGVsIGZpZWxkcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gIGZpZWxkVmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVJlbmRlcmVkR2V0dGVycyA9ICggaW5zdGFuY2UsIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSApID0+IHtcblx0Y3JlYXRlR2V0dGVyKFxuXHRcdGluc3RhbmNlLFxuXHRcdGNhbWVsQ2FzZSggcmVtb3ZlUHJlZml4ZXNGcm9tRmllbGQoIGluc3RhbmNlLCBmaWVsZE5hbWUgKSApICtcblx0XHQnUmVuZGVyZWQnLFxuXHRcdGZpZWxkVmFsdWVcblx0KTtcblx0aWYgKCBpc1VuZGVmaW5lZCggaW5zdGFuY2UuZ2V0UmVuZGVyZWQgKSApIHtcblx0XHRjcmVhdGVDYWxsYmFja0dldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0J2dldFJlbmRlcmVkJyxcblx0XHRcdGdldFJlbmRlcmVkQ2FsbGJhY2ssXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgdGhlIGBoYXNNdWx0aXBsZVByaW1hcnlLZXlzYCBnZXR0ZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtmdW5jdGlvbigpOiBib29sZWFufSBUaGUgY2FsbGJhY2sgZm9yIGhhc011bHRpcGxlUHJpbWFyeUtleXMgZ2V0dGVyXG4gKi9cbmNvbnN0IGhhc011bHRpcGxlUHJpbWFyeUtleXNDYWxsYmFjayA9ICggaW5zdGFuY2UgKSA9PlxuXHRpbnN0YW5jZS5wcmltYXJ5S2V5cy5sZW5ndGggPiAxO1xuXG4vKipcbiAqIENyZWF0ZXMgZ2V0dGVycyBmb3IgcHJpbWFyeSBrZXkgcmVsYXRlZCBkYXRhLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtBcnJheX0gcHJpbWFyeUtleXNcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVByaW1hcnlLZXlGaWVsZEdldHRlcnMgPSAoIGluc3RhbmNlLCBwcmltYXJ5S2V5cyApID0+IHtcblx0Y29uc3Qgb3B0cyA9IHsgY29uZmlndXJhYmxlOiB0cnVlIH07XG5cdGlmICggaXNBcnJheSggcHJpbWFyeUtleXMgKSApIHtcblx0XHRjcmVhdGVHZXR0ZXIoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdCdwcmltYXJ5S2V5Jyxcblx0XHRcdHByaW1hcnlLZXlzWyAwIF0sXG5cdFx0XHRvcHRzXG5cdFx0KTtcblx0XHRjcmVhdGVHZXR0ZXJBbmRTZXR0ZXIoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdCdwcmltYXJ5S2V5cycsXG5cdFx0XHRwcmltYXJ5S2V5cyxcblx0XHRcdG9wdHNcblx0XHQpO1xuXHRcdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHQnaGFzTXVsdGlwbGVQcmltYXJ5S2V5cycsXG5cdFx0XHRoYXNNdWx0aXBsZVByaW1hcnlLZXlzQ2FsbGJhY2ssXG5cdFx0XHRvcHRzXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKHN0cmluZyk6IGJvb2xlYW59IFJldHVybnMgYSBjYWxsYmFjayBmb3IgdGhlXG4gKiBoYXNDYWxjdWxhdGVkRmllbGQgZ2V0dGVyXG4gKi9cbmNvbnN0IGhhc0NhbGN1bGF0ZWRGaWVsZENhbGxiYWNrID0gKCBpbnN0YW5jZSApID0+XG5cdCggZmllbGROYW1lVG9DaGVjayApID0+ICEgaXNVbmRlZmluZWQoIGluc3RhbmNlWyBmaWVsZE5hbWVUb0NoZWNrIF0gKTtcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBnZXR0ZXJzIGZvciBhbGwgdGhlIGNhbGN1bGF0ZWQgZmllbGRzIGFuZCB2YWx1ZSBvbiB0aGUgZW50aXR5LlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fWZpZWxkc0FuZFZhbHVlc1xuICovXG5leHBvcnQgY29uc3Qgc2V0Q2FsY3VsYXRlZEZpZWxkQW5kVmFsdWVzID0gKCBpbnN0YW5jZSwgZmllbGRzQW5kVmFsdWVzICkgPT4ge1xuXHRmb3JFYWNoKCBmaWVsZHNBbmRWYWx1ZXMsICggY2FsY3VsYXRlZEZpZWxkVmFsdWUsIGNhbGN1bGF0ZWRGaWVsZE5hbWUgKSA9PiB7XG5cdFx0aWYgKCBjYWxjdWxhdGVkRmllbGROYW1lICE9PSAnX3Byb3RlY3RlZCcgKSB7XG5cdFx0XHRjcmVhdGVHZXR0ZXIoXG5cdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHRjYW1lbENhc2UoIGNhbGN1bGF0ZWRGaWVsZE5hbWUgKSxcblx0XHRcdFx0Y2FsY3VsYXRlZEZpZWxkVmFsdWVcblx0XHRcdCk7XG5cdFx0fVxuXHR9ICk7XG5cdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKFxuXHRcdGluc3RhbmNlLFxuXHRcdCdoYXNDYWxjdWxhdGVkRmllbGQnLFxuXHRcdGhhc0NhbGN1bGF0ZWRGaWVsZENhbGxiYWNrXG5cdCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBnZXR0ZXJzIGZvciB0aGUgdmFyaW91cyByZXNvdXJjZSBsaW5rcyBvbiB0aGUgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn1maWVsZHNBbmRWYWx1ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldFJlc291cmNlcyA9ICggaW5zdGFuY2UsIGZpZWxkc0FuZFZhbHVlcyApID0+IHtcblx0Y29uc3QgcmVsYXRpb25zID0gW107XG5cdGxldCByZWxhdGlvbk5hbWU7XG5cdGZvckVhY2goIGZpZWxkc0FuZFZhbHVlcywgKCByZXNvdXJjZVZhbHVlLCByZXNvdXJjZU5hbWUgKSA9PiB7XG5cdFx0aWYgKCByZXNvdXJjZU5hbWUgPT09ICdzZWxmJyApIHtcblx0XHRcdGNyZWF0ZUdldHRlciggaW5zdGFuY2UsICdyZXNvdXJjZUxpbmsnLCByZXNvdXJjZVZhbHVlWyAwIF0uaHJlZiApO1xuXHRcdH0gZWxzZSBpZiAoIHJlc291cmNlTmFtZSA9PT0gJ2NvbGxlY3Rpb24nICkge1xuXHRcdFx0Y3JlYXRlR2V0dGVyKFxuXHRcdFx0XHRpbnN0YW5jZSxcblx0XHRcdFx0J2NvbGxlY3Rpb25SZXNvdXJjZUxpbmsnLFxuXHRcdFx0XHRyZXNvdXJjZVZhbHVlWyAwIF0uaHJlZlxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVsYXRpb25OYW1lID0gZ2V0UmVsYXRpb25OYW1lRnJvbUxpbmsoIHJlc291cmNlTmFtZSApO1xuXHRcdFx0cmVsYXRpb25zLnB1c2goIHJlbGF0aW9uTmFtZSApO1xuXHRcdFx0c2V0UmVsYXRpb25zUmVzb3VyY2UoXG5cdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHRyZWxhdGlvbk5hbWUgKyAnUmVzb3VyY2UnLFxuXHRcdFx0XHRyZXNvdXJjZVZhbHVlXG5cdFx0XHQpO1xuXHRcdH1cblx0fSApO1xuXHQvL3NldCByZWxhdGlvbnMgZ2V0dGVyXG5cdGNyZWF0ZUdldHRlciggaW5zdGFuY2UsICdnZXRSZWxhdGlvbnMnLCByZWxhdGlvbnMgKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihzdHJpbmcpOiBPYmplY3R9IFJldHVybnMgdGhlIGNhbGxiYWNrIGZvciBnZXR0aW5nIGFcbiAqIHJlbGF0aW9uIHJlc291cmNlXG4gKi9cbmNvbnN0IGdldFJlbGF0aW9uUmVzb3VyY2VDYWxsYmFjayA9ICggaW5zdGFuY2UgKSA9PlxuXHQoIHJlbGF0aW9uTmFtZSApID0+IGluc3RhbmNlWyByZWxhdGlvbk5hbWUucmVwbGFjZSggJ1Jlc291cmNlJywgJycgKSBdO1xuXG4vKipcbiAqIENyZWF0ZXMgZ2V0dGVycyBmb3IgdGhlIHJlbGF0aW9ucyByZXNvdXJjZSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCBzdHJpbmc+fSByZXNvdXJjZUluZm9cbiAqL1xuZXhwb3J0IGNvbnN0IHNldFJlbGF0aW9uc1Jlc291cmNlID0gKFxuXHRpbnN0YW5jZSxcblx0cmVsYXRpb25OYW1lLFxuXHRyZXNvdXJjZUluZm9cbikgPT4ge1xuXHRjcmVhdGVHZXR0ZXIoXG5cdFx0aW5zdGFuY2UsXG5cdFx0cmVsYXRpb25OYW1lLFxuXHRcdHtcblx0XHRcdHJlc291cmNlTGluazogcmVzb3VyY2VJbmZvWyAwIF0uaHJlZixcblx0XHRcdHNpbmdsZTogcmVzb3VyY2VJbmZvWyAwIF0uc2luZ2xlLFxuXHRcdH1cblx0KTtcblx0aWYgKCBpc1VuZGVmaW5lZCggaW5zdGFuY2UuZ2V0UmVsYXRpb25SZXNvdXJjZSApICkge1xuXHRcdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKCBpbnN0YW5jZSxcblx0XHRcdCdnZXRSZWxhdGlvblJlc291cmNlJyxcblx0XHRcdGdldFJlbGF0aW9uUmVzb3VyY2VDYWxsYmFja1xuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogU2V0cyB0aGUgaW50ZXJuYWwgc2F2ZSBzdGF0ZSB0byB0aGUgZ2l2ZW4gdmFsdWUgd2hlbiBjdXJyZW50IHN0YXRlIGlzXG4gKiBTQVZFX1NUQVRFLmNsZWFuIG90aGVyd2lzZSBjdXJyZW50IHNhdmUgc3RhdGUgaXMgcmV0YWluZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gc2F2ZVN0YXRlIEV4cGVjdGVkIHRvIGJlIG9uZSBvZiBTQVZFX1NUQVRFIGNvbnN0YW50IHZhbHVlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IHNldFNhdmVTdGF0ZSA9ICggaW5zdGFuY2UsIHNhdmVTdGF0ZSApID0+IHtcblx0Y29uc3QgY3VycmVudFN0YXRlID0gaW5zdGFuY2VbIFBSSVZBVEVfUFJPUEVSVElFUy5TQVZFX1NUQVRFIF07XG5cdHN3aXRjaCAoIHNhdmVTdGF0ZSApIHtcblx0XHRjYXNlIFNBVkVfU1RBVEUuRElSVFk6XG5cdFx0Y2FzZSBTQVZFX1NUQVRFLk5FVzpcblx0XHRjYXNlIFNBVkVfU1RBVEUuQ0xFQU46XG5cdFx0XHRpbnN0YW5jZVsgUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEUgXSA9XG5cdFx0XHRcdGN1cnJlbnRTdGF0ZSA9PT0gU0FWRV9TVEFURS5DTEVBTiA/XG5cdFx0XHRcdFx0c2F2ZVN0YXRlIDpcblx0XHRcdFx0XHRjdXJyZW50U3RhdGU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudChcblx0XHRcdFx0J1NhdmUgc3RhdGUgZm9yIGVudGl0eSBjYW4gb25seSBiZSBzZXQgdG8gZWl0aGVyICcgK1xuXHRcdFx0XHQnU0FWRV9TVEFURS5ESVJUWSwgU0FWRV9TVEFURS5ORVcgb3IgU0FWRV9TVEFURS5DTEVBTidcblx0XHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQWRkIHRoZSBmaWVsZCBuYW1lIHRvIHRoZSBmaWVsZFRvUGVyc2lzdE9uSW5zZXJ0IHByb3BlcnR5IG9uIHRoZSBpbnN0YW5jZVxuICogaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICovXG5leHBvcnQgY29uc3Qgc2V0RmllbGRUb1BlcnNpc3QgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUgKSA9PiB7XG5cdGlmICggaW5zdGFuY2UuZmllbGRzVG9QZXJzaXN0T25JbnNlcnQgKSB7XG5cdFx0aW5zdGFuY2UuZmllbGRzVG9QZXJzaXN0T25JbnNlcnQuYWRkKCBmaWVsZE5hbWUgKTtcblx0fVxufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRpc1BsYWluT2JqZWN0LFxuXHRjYW1lbENhc2UsXG5cdGxhc3QsXG5cdHBpY2ssXG5cdHBpY2tCeSxcblx0aXNBcnJheSxcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGluc3RhbmNlT2YgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdE1vbmV5LFxuXHRTaXRlQ3VycmVuY3ksXG5cdFNlcnZlckRhdGVUaW1lIGFzIERhdGVUaW1lLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWx1ZS1vYmplY3RzJztcblxuaW1wb3J0IHsgcGx1cmFsTW9kZWxOYW1lIH0gZnJvbSAnLi4vbW9kZWwtbmFtZXMnO1xuXG5pbXBvcnQge1xuXHRoYXNSYXdQcm9wZXJ0eSxcblx0aGFzUHJldHR5UHJvcGVydHksXG5cdGhhc1JlbmRlcmVkUHJvcGVydHksXG5cdGlzRGF0ZVRpbWVGaWVsZCxcblx0aXNNb25leUZpZWxkLFxuXHRpc1ByaW1hcnlLZXlGaWVsZCxcblx0aXNFbnRpdHlGaWVsZCxcbn0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQgeyB2YWxpZGF0ZVR5cGVGb3JGaWVsZCB9IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5pbXBvcnQgeyBWQUxJREFURV9UWVBFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIFRoaXMgcmVjZWl2ZXMgYSBmaWVsZCBuYW1lLCBpdCdzIHZhbHVlIGFuZCB0aGUgc2NoZW1hIGFuZCBjb252ZXJ0cyBpdCB0byB0aGVcbiAqIHJlbGF0ZWQgdmFsdWUgb2JqZWN0IElGIHRoZSBzY2hlbWEgaW5kaWNhdGVzIGl0IGlzIG9mIGEgdHlwZSB0aGF0IHRoZXJlIGlzIGFcbiAqIGtub3duIHZhbHVlIG9iamVjdCBmb3IuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtEYXRlVGltZXxNb25leXwqfSAgSWYgdGhpcyBpcyBub3QgYSB2YWx1ZSBvYmplY3QsIHRoZSBvcmlnaW5hbCBmaWVsZFxuICogdmFsdWUgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBtYXliZUNvbnZlcnRUb1ZhbHVlT2JqZWN0ID0gKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIHNjaGVtYSApID0+IHtcblx0aWYgKFxuXHRcdGlzRGF0ZVRpbWVGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSAmJlxuXHRcdCEgRGF0ZVRpbWUudmFsaWRhdGVJc0RhdGVUaW1lKCBmaWVsZFZhbHVlIClcblx0KSB7XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21JU08oIGZpZWxkVmFsdWUgKTtcblx0fVxuXHRpZiAoXG5cdFx0aXNNb25leUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApICYmXG5cdFx0ISAoIGluc3RhbmNlT2YoIGZpZWxkVmFsdWUsICdNb25leScgKSApXG5cdCkge1xuXHRcdHJldHVybiBuZXcgTW9uZXkoIGZpZWxkVmFsdWUsIFNpdGVDdXJyZW5jeSApO1xuXHR9XG5cdC8vIGlmIG1vcmUgVk9zIGdldCBhZGRlZCwgdGhlbiBpbnN0ZWFkIG9mIGFkZGluZyBtb3JlIGlmIGVsc2UgYmxvY2tzXG5cdC8vIHRvIHRoaXMgZnVuY3Rpb24gYW5kIHRoZSBvbmVzIGJlbG93LCBhbGwgVk8gbG9naWMgc2hvdWxkIGJlIGV4dHJhY3RlZFxuXHQvLyBpbnRvIHNvbWUga2luZCBvZiAgVmFsdWVPYmplY3RFeHRyYWN0b3Igb2JqZWN0IHRoYXQgd291bGQgaG9sZCBhbGwgb2Zcblx0Ly8gdGhlIG5lY2Vzc2FyeSBjYWxsYmFja3MgZm9yIG1hbmFnaW5nIHRoZSBkZXRlY3Rpb24gb2YgVk8gZmllbGRzIGFuZFxuXHQvLyBjb252ZXJzaW9uIG9mIGRhdGEgdG8gYW5kIGZyb20gdGhlIHZhcmlvdXMgVk9zXG5cdC8vIHBseiBzZWU6XG5cdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ldmVudGVzcHJlc3NvL2V2ZW50LWVzcHJlc3NvLWNvcmUvcHVsbC82MzcvZmlsZXMjcjIyODY5MDc4OVxuXHRyZXR1cm4gZmllbGRWYWx1ZTtcbn07XG5cbi8qKlxuICogVGhpcyBjb252ZXJ0cyB0aGUgaW5jb21pbmcgdmFsdWUgZm9yIGEgZmllbGQgdG8gaXRzIGVxdWl2YWxlbnQgXCJyYXdcIiB2YWx1ZVxuICogZnJvbSBhIHZhbHVlIG9iamVjdCBpZiBpdCBpcyBhIHZhbHVlIG9iamVjdC4gIE90aGVyd2lzZSBpdCBqdXN0IHJldHVybnMgdGhlXG4gKiBvcmlnaW5hbCBpbmNvbWluZyB2YWx1ZS4gIFRoaXMgYWxzbyBhc3NlcnRzIHRoYXQgaWYgdGhlIHByb3ZpZGVkIGZpZWxkIGlzXG4gKiBleHBlY3RlZCB0byBiZSBhIHZhbHVlIG9iamVjdCB0aGF0IHRoZSBpbmNvbWluZyB2YWx1ZSBJUyBhIHZhbGlkIHZhbHVlIG9iamVjdFxuICogYW5kIGl0IGlzIHRoZSBleHBlY3RlZCBpbnN0YW5jZSBvZiBhIHZhbHVlIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp8TW9uZXl8RGF0ZVRpbWV9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge3N0cmluZ3xudW1iZXJ8Kn0gIElmIHRoZSB2YWx1ZSBpcyBub3QgYSB2YWx1ZSBvYmplY3QsIHJldHVybnMgdGhlXG4gKiBvcmlnaW5hbCB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMgPSAoXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0c2NoZW1hXG4pID0+IHtcblx0aWYgKCBpc0RhdGVUaW1lRmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgKSB7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0SXNEYXRlVGltZSggZmllbGRWYWx1ZSApO1xuXHRcdGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLnRvSVNPKCk7XG5cdH0gZWxzZSBpZiAoIGlzTW9uZXlGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHRNb25leS5hc3NlcnRNb25leSggZmllbGRWYWx1ZSApO1xuXHRcdGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLnRvTnVtYmVyKCk7XG5cdH1cblx0cmV0dXJuIGZpZWxkVmFsdWU7XG59O1xuXG4vKipcbiAqIFRoaXMgY29udmVydHMgdGhlIGluY29taW5nIHZhbHVlIGZvciBhIGZpZWxkIHRvIGl0cyBlcXVpdmFsZW50IFwicmF3XCIgdmFsdWVcbiAqIGlmIHRoZSBpbmNvbWluZyB2YWx1ZSAgaXMgYSB2YWx1ZSBvYmplY3QuICBPdGhlcndpc2UgaXQganVzdCByZXR1cm5zIHRoZVxuICogb3JpZ2luYWwgaW5jb21pbmcgdmFsdWUuXG4gKlxuICogQHBhcmFtIHsqfERhdGVUaW1lfE1vbmV5fWZpZWxkVmFsdWVcbiAqIEByZXR1cm4geyp9IFRoZSByYXcgdmFsdWUgZm9yIHRoZSB2YWx1ZSBvYmplY3Qgb3IgdGhlIG9yaWdpbmFsIHZhbHVlLlxuICovXG5leHBvcnQgY29uc3QgbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0ID0gKCBmaWVsZFZhbHVlICkgPT4ge1xuXHRpZiAoIERhdGVUaW1lLnZhbGlkYXRlSXNEYXRlVGltZSggZmllbGRWYWx1ZSApICkge1xuXHRcdGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLnRvSVNPKCk7XG5cdH0gZWxzZSBpZiAoIGluc3RhbmNlT2YoIGZpZWxkVmFsdWUsICdNb25leScgKSApIHtcblx0XHRmaWVsZFZhbHVlID0gZmllbGRWYWx1ZS50b051bWJlcigpO1xuXHR9XG5cdHJldHVybiBmaWVsZFZhbHVlO1xufTtcblxuLyoqXG4gKiBUaGlzIGRlcml2ZXMgdGhlIFwicHJlcGFyZWRcIiB2YWx1ZSBmb3IgdGhlIGdpdmVuIGZpZWxkIGFuZCB2YWx1ZS5cbiAqXG4gKiBcIlByZXBhcmVkXCIgbWVhbnM6XG4gKlxuICogLSBjb252ZXJ0aW5nIHRvIGEgdmFsdWUgb2JqZWN0IGlmIHRoaXMgaXMgYSBmaWVsZCB0aGF0IHRoZXJlIGFyZSBkZWZpbmVkXG4gKiAgIHZhbHVlIG9iamVjdHMgZm9yLlxuICogLSByZXRyaWV2aW5nIHRoZSBcInJhd1wiIHZhbHVlIGZyb20gZmllbGQgdmFsdWVzIHRoYXQgaGF2ZSBgcmF3YCBhbmQgYHJlbmRlcmVkYFxuICogICBvciBgcHJldHR5YCBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gIGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7RGF0ZVRpbWV8TW9uZXl8Kn0gIFJldHVybnMgdGhlIG9yaWdpbmFsIGluY29taW5nIHZhbHVlIGlmIGl0IGRvZXNcbiAqIG5vdCBoYXZlIGEgcmF3IGVxdWl2YWxlbnQgb3IgaXMgbm90IGEgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY29uc3QgZGVyaXZlUHJlcGFyZWRWYWx1ZUZvckZpZWxkID0gKFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdGluc3RhbmNlXG4pID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvblR5cGUgPSB2YWxpZGF0ZVR5cGVGb3JGaWVsZCggZmllbGROYW1lLCBpbnN0YW5jZSApO1xuXHRmaWVsZFZhbHVlID0gaXNQbGFpbk9iamVjdCggZmllbGRWYWx1ZSApID9cblx0XHRmaWVsZFZhbHVlWyB2YWxpZGF0aW9uVHlwZSBdIDpcblx0XHRmaWVsZFZhbHVlO1xuXHRyZXR1cm4gbWF5YmVDb252ZXJ0VG9WYWx1ZU9iamVjdCggZmllbGROYW1lLCBmaWVsZFZhbHVlLCBpbnN0YW5jZS5zY2hlbWEgKTtcbn07XG5cbi8qKlxuICogVGhpcyByZXR1cm5zIHRoZSBcInJlbmRlcmVkXCIgb3IgXCJwcmV0dHlcIiBlcXVpdmFsZW50IGZyb20gYSB2YWx1ZSBpZiBpdCBleGlzdHNcbiAqIGFzIGEgcHJvcGVydHkgb24gaXQuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Kn0gIFRoZSBvcmlnaW5hbCB2YWx1ZSBpcyByZXR1cm5lZCBpZiBpdHMgbm90IGEgcGxhaW4gb2JqZWN0IG9yIGlmXG4gKiBpdCBoYXMgbm8gYHJlbmRlcmVkYCBvciBgcHJldHR5YCBwcm9wZXJ0eS4gIEhvd2V2ZXIsIGlmIGl0IGlzIGEgcGxhaW4gb2JqZWN0XG4gKiBhbmQgaGFzIG5vIHByZXR0eS9yZW5kZXJlZCBwcm9wZXJ0aWVzIGJ1dCBET0VTIGhhdmUgYSByYXcgcHJvcGVydHksIHRoZW4gdGhhdFxuICogaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBkZXJpdmVSZW5kZXJlZFZhbHVlID0gKCB2YWx1ZSApID0+IHtcblx0aWYgKCAhIGlzUGxhaW5PYmplY3QoIHZhbHVlICkgKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhbHVlID0gaGFzUHJldHR5UHJvcGVydHkoIHZhbHVlICkgPyB2YWx1ZS5wcmV0dHkgOiB2YWx1ZTtcblx0dmFsdWUgPSBoYXNSZW5kZXJlZFByb3BlcnR5KCB2YWx1ZSApID8gdmFsdWUucmVuZGVyZWQgOiB2YWx1ZTtcblx0cmV0dXJuIGhhc1Jhd1Byb3BlcnR5KCB2YWx1ZSApID8gdmFsdWUucmF3IDogdmFsdWU7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG5hbWUgb2YgYSByZXNvdXJjZSBmcm9tIHRoZSBnaXZlbiBgcmVzb3VyY2VMaW5rYC5cbiAqXG4gKiBlZy4gXCJodHRwczovL2FwaS5ldmVudGVzcHJlc3NvLmNvbS9yZWdpc3RyYXRpb25cIiB3aWxsIHJldHVybiAncmVnaXN0cmF0aW9uJztcblxuICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlTGlua1xuICogQHJldHVybiB7c3RyaW5nfSBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSByZXNvdXJjZSBmcm9tIGEgcHJvdmlkZWQgcmVzb3VyY2VcbiAqIGxpbmsuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSZWxhdGlvbk5hbWVGcm9tTGluayA9ICggcmVzb3VyY2VMaW5rICkgPT4ge1xuXHRyZXR1cm4gcGx1cmFsTW9kZWxOYW1lKCBjYW1lbENhc2UoIGxhc3QoIHJlc291cmNlTGluay5zcGxpdCggJy8nICkgKSApICk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwbGFpbiBvYmplY3QgY29udGFpbmluZyB0aGUgZW50aXR5IGZpZWxkIG5hbWVzIGFuZCB2YWx1ZXMgZnJvbSB0aGVcbiAqIHByb3ZpZGVkIGVudGl0eSBpbnN0YW5jZS4gIFRoZSB2YWx1ZXMgYXJlIG5vdCBwcmVwYXJlZCBhbmQgbWF0Y2ggZXhhY3RseSB3aGF0XG4gKiBpcyBjdXJyZW50bHkgc2V0IG9uIHRoaXMgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gZW50aXR5SW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgcGxhaW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyA9ICggZW50aXR5SW5zdGFuY2UgKSA9PiB7XG5cdHJldHVybiBPYmplY3Qua2V5cyggZW50aXR5SW5zdGFuY2UgKS5yZWR1Y2UoIChcblx0XHRmaWVsZHNBbmRWYWx1ZXMsXG5cdFx0ZmllbGROYW1lXG5cdCkgPT4ge1xuXHRcdGlmIChcblx0XHRcdGlzRW50aXR5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hICkgJiZcblx0XHRcdCEgaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hIClcblx0XHQpIHtcblx0XHRcdGZpZWxkc0FuZFZhbHVlc1sgZmllbGROYW1lIF0gPSBlbnRpdHlJbnN0YW5jZVsgZmllbGROYW1lIF07XG5cdFx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHR9LCB7fSApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGVudGl0eSBmaWVsZCBuYW1lIGFuZCB2YWx1ZXMgZnJvbSB0aGVcbiAqIHByb3ZpZGVkIGVudGl0eSBpbnN0YW5jZVxuICogQHBhcmFtIHtPYmplY3R9IGVudGl0eUluc3RhbmNlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZvckluc2VydCAgV2hldGhlciB0byByZXR1cm4gdGhlIGZpZWxkcyBhbmQgdmFsdWVzIGZvclxuICogaW5zZXJ0IG9yIGZvciB1cGRhdGUuXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgcGxhaW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yUGVyc2lzdGluZyA9IChcblx0ZW50aXR5SW5zdGFuY2UsXG5cdGZvckluc2VydCA9IGZhbHNlXG4pID0+IHtcblx0Y29uc3QgaXRlcmF0b3IgPSBmb3JJbnNlcnQgP1xuXHRcdEFycmF5LmZyb20oIGVudGl0eUluc3RhbmNlLmZpZWxkc1RvUGVyc2lzdE9uSW5zZXJ0LnZhbHVlcygpICkgOlxuXHRcdE9iamVjdC5rZXlzKCBlbnRpdHlJbnN0YW5jZSApO1xuXG5cdHJldHVybiBpdGVyYXRvci5yZWR1Y2UoIChcblx0XHRmaWVsZHNBbmRWYWx1ZXMsXG5cdFx0ZmllbGROYW1lXG5cdCkgPT4ge1xuXHRcdGlmIChcblx0XHRcdGlzRW50aXR5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hICkgJiZcblx0XHRcdCEgaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hIClcblx0XHQpIHtcblx0XHRcdGZpZWxkc0FuZFZhbHVlc1sgZmllbGROYW1lIF0gPSBtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3QoXG5cdFx0XHRcdGVudGl0eUluc3RhbmNlWyBmaWVsZE5hbWUgXSxcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHR9LCB7fSApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwcmltYXJ5IGtleShzKSBhbmQgdmFsdWVzIGZvciB0aGUgZ2l2ZW4gZW50aXR5SW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZW50aXR5SW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gYW4gYXJyYXkgb2YgdmFsdWVzIGZvciB0aGUgcHJpbWFyeSBrZXlzLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UHJpbWFyeUtleVZhbHVlcyA9ICggZW50aXR5SW5zdGFuY2UgKSA9PiBwaWNrKFxuXHRlbnRpdHlJbnN0YW5jZSxcblx0ZW50aXR5SW5zdGFuY2UucHJpbWFyeUtleXNcbik7XG5cbi8qKlxuICogVGhpcyByZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIGVudGl0eSBmaWVsZHMgZnJvbSB0aGUgc2NoZW1hIGZvciB0aGUgZW50aXR5XG4gKiBpbnN0YW5jZSAoc2NoZW1hIGZvciBmaWVsZHMgYXJlIGV4dHJhY3RlZCBhcyB3ZWxsKS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZW50aXR5SW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gQSBwbGFpbiBvYmplY3Qgd2l0aCBmaWVsZHMgYW5kIHNjaGVtYSBwcm9wZXJ0aWVzIHRoYXQgYXJlXG4gKiBlbnRpdHkgcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVudGl0eUZpZWxkc0Zyb21TY2hlbWEgPSAoIGVudGl0eUluc3RhbmNlICkgPT4gcGlja0J5KFxuXHRlbnRpdHlJbnN0YW5jZS5zY2hlbWEsXG5cdCggZmllbGRWYWx1ZSwgZmllbGROYW1lICkgPT4gaXNFbnRpdHlGaWVsZChcblx0XHRmaWVsZE5hbWUsXG5cdFx0ZW50aXR5SW5zdGFuY2Uuc2NoZW1hXG5cdClcbik7XG5cbi8qKlxuICogVGhpcyByZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIGV4dHJhY3RlZCBwcmltYXJ5S2V5IGZpZWxkcyBmcm9tIHRoZSBzY2hlbWFcbiAqIGZvciB0aGUgZW50aXR5IGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbnRpdHlJbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBBIHBsYWluIG9iamVjdCB3aXRoIGZpZWxkcyBhbmQgc2NoZW1hIHByb3BlcnRpZXMgdGhhdFxuICogXHRcdFx0XHRcdHJlcHJlc2VudCBwcmltYXJ5IGtleSBmaWVsZHMuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmltYXJ5S2V5RmllbGRzRnJvbVNjaGVtYSA9ICggZW50aXR5SW5zdGFuY2UgKSA9PiBwaWNrQnkoXG5cdGVudGl0eUluc3RhbmNlLnNjaGVtYSxcblx0KCBmaWVsZFZhbHVlLCBmaWVsZE5hbWUgKSA9PiBpc1ByaW1hcnlLZXlGaWVsZChcblx0XHRmaWVsZE5hbWUsXG5cdFx0ZW50aXR5SW5zdGFuY2Uuc2NoZW1hXG5cdClcbik7XG5cbi8qKlxuICogRGVyaXZlcyB0aGUgZGVmYXVsdCB2YWx1ZSB0byB1c2UgZm9yIGEgZ2l2ZW4gdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHJldHVybiB7Kn0gIEEgdmFsdWUgdG8gdXNlIGZvciB0aGUgZ2l2ZW4gdHlwZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlcml2ZURlZmF1bHRWYWx1ZUZvclR5cGUgPSAoIHR5cGUgKSA9PiB7XG5cdGlmICggaXNBcnJheSggdHlwZSApICkge1xuXHRcdHJldHVybiB0eXBlLmluZGV4T2YoICdudWxsJyApID4gLTEgP1xuXHRcdFx0bnVsbCA6XG5cdFx0XHRkZXJpdmVEZWZhdWx0VmFsdWVGb3JUeXBlKCB0eXBlWyAwIF0gKTtcblx0fVxuXHRzd2l0Y2ggKCB0eXBlICkge1xuXHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0Y2FzZSAnbnVtYmVyJzpcblx0XHRjYXNlICdpbnRlZ2VyJzpcblx0XHRcdHJldHVybiAwO1xuXHRcdGNhc2UgJ251bGwnOlxuXHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRjYXNlICdib29sZWFuJzpcblx0XHRjYXNlICdib29sJzpcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRjYXNlICdkYXRlLXRpbWUnOlxuXHRcdFx0cmV0dXJuICggbmV3IERhdGUoKSApLnRvSVNPU3RyaW5nKCk7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIERlcml2ZXMgd2hhdCBgdHlwZWAgYSBmaWVsZCBpcyBmcm9tIHRoZSBzY2hlbWEuXG4gKiBJdCBhY2NvdW50cyBmb3IgY2FzZXMgd2hlcmUgdGhlIFwidHlwZVwiIG9mIGEgZmllbGQgbWlnaHQgYmUgYGRhdGUtdGltZWAgb3JcbiAqIHdoZXJlIHRoZSB0eXBlIGlzIGFuIG9iamVjdCBhbmQgdGh1cyB0aGUgYHR5cGVgIGZvciB0aGUgcHVycG9zZXMgb2YgbW9kZWxcbiAqIGVudGl0aWVzIGlzIGRlZmluZWQgYnkgdGhlIGByYXdgIHByb3BlcnR5IGZvciB0aGUgZmllbGQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Kn0gIFdoYXQgdHlwZSB0aGUgZmlsZWQgaXMuXG4gKi9cbmV4cG9ydCBjb25zdCBkZXJpdmVUeXBlRm9yRmllbGQgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT4ge1xuXHRpZiAoIGlzRGF0ZVRpbWVGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHRyZXR1cm4gJ2RhdGUtdGltZSc7XG5cdH1cblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdICYmIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSApIHtcblx0XHRpZiAoIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcyAmJlxuXHRcdFx0XHRoYXNSYXdQcm9wZXJ0eSggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzIClcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy50eXBlID9cblx0XHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LnR5cGUgOlxuXHRcdFx0XHRcdG51bGw7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogVGhpcyBkZXJpdmVzIHRoZSB2YWxpZGF0ZSB0eXBlIGZyb20gdGhlIGluY29taW5nIGZpZWxkIGFuZCB2YWx1ZSBhY2NvcmRpbmdcbiAqIHRvIHRoZSBzY2hlbWEgYW5kIGluY29taW5nIHZhbHVlLlxuICpcbiAqIFRoaXMgYWNjb3VudHMgZm9yIHRoZSBmYWN0IHRoYXQgZW50aXRpZXMgbWF5IGJlIGNvbnN0cnVjdGVkIGZyb20gdGhlXG4gKiBmb2xsb3dpbmcgY29udGV4dHM6XG4gKlxuICogMS4gQXV0aGVkIFJFU1QgcmVzcG9uc2UgKHdoaWNoIGNvdWxkIGhhdmUgYm90aCByYXcsIHJlbmRlcmVkIG9yIHByZXR0eVxuICogICAgdmFsdWVzIGluIHRoZSBmaWVsZCB2YWx1ZSkuXG4gKiAyLiBOb24tYXV0aGVkIFJFU1QgcmVzcG9uc2UgKHdoaWNoIHdpbGwgbm90IGhhdmUgYSByYXcgdmFsdWUsIGJ1dCBjb3VsZCBoYXZlXG4gKiAgICBhIHByZXR0eSBvciByZW5kZXJlZCB2YWx1ZSkuICBUaGlzIGlzIHBvdGVudGlhbGx5IHByb2JsZW1hdGljIGlmIHRoZVxuICogICAgcmVuZGVyZWQgb3IgcHJldHR5IHZhbHVlIGlzIG9mIGEgZGlmZmVyZW50IGRhdGEgdHlwZSB0aGFuIHRoZSByYXcgdmFsdWUuXG4gKiAzLiBOZXcgZW50aXRpZXMgYnVpbHQgY2xpZW50IHNpZGUsIHdoaWNoIHdpbGwgYmUgYXNzdW1lZCB0byBiZSBwcmVwYXJlZFxuICogICAgYWdhaW5zdCB0aGUgXCJyYXdcIiB2YWxpZGF0ZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7U3ltYm9sfSAgVGhlIHZhbGlkYXRlIHR5cGUgZm9yIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlcml2ZVZhbGlkYXRlVHlwZUZvckZpZWxkID0gKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIHNjaGVtYSApID0+IHtcblx0aWYgKCBoYXNSYXdQcm9wZXJ0eSggZmllbGRWYWx1ZSApICkge1xuXHRcdHJldHVybiBWQUxJREFURV9UWVBFLlJBVztcblx0fVxuXHRpZiAoIHNjaGVtYVsgZmllbGROYW1lIF0gJiYgc2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlICkge1xuXHRcdGlmIChcblx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdGlzUGxhaW5PYmplY3QoIGZpZWxkVmFsdWUgKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGhhc1JlbmRlcmVkUHJvcGVydHkoIGZpZWxkVmFsdWUgKSA/XG5cdFx0XHRcdFZBTElEQVRFX1RZUEUuUkVOREVSRUQgOlxuXHRcdFx0XHRWQUxJREFURV9UWVBFLlBSRVRUWTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIFZBTElEQVRFX1RZUEUuUkFXO1xufTtcblxuLyoqXG4gKiBUaGlzIGdldHMgdGhlIGRlZmF1bHQgdmFsdWUgZm9yIGEgZmllbGQgZnJvbSB0aGUgcHJvdmlkZWQgc2NoZW1hLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4geyp9IFRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGUgZmllbGQgZnJvbSB0aGUgc2NoZW1hIG9yIGlmIG5vdFxuICogcHJlc2VudCBpbiB0aGUgc2NoZW1hLCBhIGRlcml2ZWQgZGVmYXVsdCB2YWx1ZSBmcm9tIHRoZSBzY2hlbWEgdHlwZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldERlZmF1bHRWYWx1ZUZvckZpZWxkID0gKCBmaWVsZE5hbWUsIHNjaGVtYSApID0+IHtcblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkge1xuXHRcdHJldHVybiBzY2hlbWFbIGZpZWxkTmFtZSBdLmRlZmF1bHQgP1xuXHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5kZWZhdWx0IDpcblx0XHRcdGRlcml2ZURlZmF1bHRWYWx1ZUZvclR5cGUoIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSApO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgY3JlYXRlRW50aXR5RmFjdG9yeSB9IGZyb20gJy4vYmFzZS1lbnRpdHknO1xuZXhwb3J0IHsgTU9ERUxfUFJFRklYRVMsIFNBVkVfU1RBVEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0aXNBcnJheSxcblx0aXNJbnRlZ2VyLFxuXHRpc1N0cmluZyxcblx0aXNQbGFpbk9iamVjdCxcblx0aXNCb29sZWFuLFxuXHRpc051bWJlcixcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHNwcmludGYgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcblxuLyoqXG4gKiBJbnRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzRW51bUZpZWxkLCBpc1ByaW1hcnlLZXlGaWVsZCwgaXNWYWx1ZU9iamVjdEZpZWxkIH0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQgeyBtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3RXaXRoQXNzZXJ0aW9ucyB9IGZyb20gJy4vZXh0cmFjdG9ycyc7XG5pbXBvcnQgeyBQUklWQVRFX1BST1BFUlRJRVMsIFZBTElEQVRFX1RZUEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoZSBpbmNvbWluZyB2YWx1ZSBmb3IgZ2l2ZW4gdHlwZS4gIFR5cGVzIGFsbG93ZWQgYXJlOlxuICpcbiAqIC0gaW50ZWdlcjogY2hlY2tzIGlmIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiAtIG51bWJlcjogY2hlY2tzIGlmIHZhbHVlIGlzIGNsYXNzaWZpZWQgYXMgYSBOdW1iZXIgcHJpbWl0aXZlIG9yIG9iamVjdCAodGhpc1xuICogICBtZWFucyBgSW5maW5pdHlgLCBgLUluZmluaXR5YCwgYW5kIGBOYU5gIGFyZSBjb25zaWRlcmVkIHZhbGlkIGZvciB0aGlzIHR5cGVcbiAqIC0gc3RyaW5nXG4gKiAtIG9iamVjdCAtIHRoaXMgdmFsaWRhdGVzIGFzIGEgXCJwbGFpbk9iamVjdFwiLCB0aGF0IGlzIGFuIG9iamVjdCBjcmVhdGVkIGJ5XG4gKiAgIHRoZSBPYmplY3QgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBbW1Byb3RvdHlwZV1dIG9mIG51bGwuXG4gKiAtIGJvb2xlYW5cbiAqIC0gYm9vbDogKHNhbWUgYXMgYm9vbGVhbiBjaGVjaylcbiAqIC0gbnVsbDogdmFsdWUgbXVzdCBleHBsaWNpdGx5IGJlIGBudWxsYFxuICpcbiAqIE5vdGU6IGlmIHRoZSBwYXNzZWQgaW4gdHlwZSBkb2VzIG5vdCBleGlzdCwgdGhlbiB0aGUgdmFsdWUgaXMgY29uc2lkZXJlZFxuICogaW52YWxpZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0gdHlwZSAgVGhlIHR5cGUgb3IgdHlwZXMgdG8gY2hlY2tcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgIFRoZSB2YWx1ZSBiZWluZyB2YWxpZGF0ZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoZSB2YWx1ZSBpcyB2YWxpZCBmb3IgdGhlIGdpdmVuIHR5cGUuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVR5cGUgPSAoIHR5cGUsIHZhbHVlICkgPT4ge1xuXHRsZXQgdmFsaWQgPSBmYWxzZTtcblx0Ly8gYWNjb3VudCBmb3IgdHlwZSBkZWZpbml0aW9ucyB0aGF0IGFyZSBhbiBhcnJheSBvZiBhbGxvd2VkIHR5cGVzLlxuXHRpZiAoIGlzQXJyYXkoIHR5cGUgKSApIHtcblx0XHRmb3IgKCBjb25zdCBzaW5nbGVUeXBlIG9mIHR5cGUgKSB7XG5cdFx0XHR2YWxpZCA9IHZhbGlkYXRlVHlwZSggc2luZ2xlVHlwZSwgdmFsdWUgKTtcblx0XHRcdGlmICggdmFsaWQgKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyByZXR1cm4gcmlnaHQgYXdheSBiZWNhdXNlIHdlJ3ZlIGRldGVybWluZWQgdGhlIHZhbGlkaXR5IG9mIHRoZSB0eXBlLlxuXHRcdHJldHVybiB2YWxpZDtcblx0fVxuXHRzd2l0Y2ggKCB0eXBlICkge1xuXHRcdGNhc2UgJ2ludGVnZXInOlxuXHRcdFx0dmFsaWQgPSBpc0ludGVnZXIoIHZhbHVlICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdudW1iZXInOlxuXHRcdFx0dmFsaWQgPSBpc051bWJlciggdmFsdWUgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHR2YWxpZCA9IGlzU3RyaW5nKCB2YWx1ZSApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdHZhbGlkID0gaXNQbGFpbk9iamVjdCggdmFsdWUgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2Jvb2xlYW4nOlxuXHRcdGNhc2UgJ2Jvb2wnOlxuXHRcdFx0dmFsaWQgPSBpc0Jvb2xlYW4oIHZhbHVlICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdudWxsJzpcblx0XHRcdHZhbGlkID0gdmFsdWUgPT09IG51bGw7XG5cdFx0XHRicmVhaztcblx0fVxuXHRyZXR1cm4gdmFsaWQ7XG59O1xuXG4vKipcbiAqIFRoaXMgdmFsaWRhdGVzIGVudW0gdHlwZSBvZiB2YWx1ZXMuXG4gKlxuICogVGhpcyBtZWFucyB0aGF0IHRoZSB2YWx1ZSBtdXN0IGJlIG9uZSBvZiB0aGUgcHJvdmlkZWQgYXJyYXkgb2YgZW51bVZhbHVlcyBhc1xuICogd2VsbCBhcyBiZWluZyBvZiB0aGUgZXhwZWN0ZWQgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtBcnJheX0gZW51bVZhbHVlc1xuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhpcyB2YWx1ZSBpcyB2YWxpZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRW51bVR5cGUgPSAoIHR5cGUsIGVudW1WYWx1ZXMsIHZhbHVlICkgPT4ge1xuXHRyZXR1cm4gdmFsaWRhdGVUeXBlKCB0eXBlLCB2YWx1ZSApICYmXG5cdFx0aXNBcnJheSggZW51bVZhbHVlcyApICYmXG5cdFx0ZW51bVZhbHVlcy5pbmRleE9mKCB2YWx1ZSApID4gLTE7XG59O1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGRvZXMgYSBzaGFsbG93IHZhbGlkYXRpb24gZm9yIHRoZSBnaXZlbiB2YWx1ZSBhbmQgZmllbGQuXG4gKlxuICogXCJTaGFsbG93XCIgaGVyZSBtZWFucyB0aGF0IGlmIHRoZSBmaWVsZCBzY2hlbWEgaXMgb2YgdHlwZSAnb2JqZWN0JywgdGhlbiB0aGVcbiAqIHZhbGlkYXRpb24gb25seSB2ZXJpZmllcyB0aGF0IHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuICBUaGUgb2JqZWN0IGNvbnRlbnRzXG4gKiBhcmUgbm90IHZhbGlkYXRlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhwZWN0VmFsdWVPYmplY3RzICBJZiB0cnVlLCB0aGVuIHRoaXMgZmxhZ3MgdGhlIHZhbGlkYXRvclxuICogdG8gYXNzdW1lIHRoZSB2YWx1ZSBtaWdodCBiZSBhIHZhbHVlIG9iamVjdCBhbmQgYXR0ZW1wdCB0byByZXRyaWV2ZSB0aGUgcmF3XG4gKiB2YWx1ZSBmcm9tIHRoYXQgdmFsdWUgb2JqZWN0IGZvciB2YWxpZGF0aW9uIGFnYWluc3QgdGhlIGV4cGVjdGVkIHR5cGUgaW4gdGhlXG4gKiBzY2hlbWEgZm9yIHRoYXQgZmllbGQuXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGUgdmFsdWUgaXMgdmFsaWQuXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICogQHRocm93cyBJbnZhbGlkRGF0ZVRpbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2hhbGxvd1ZhbGlkVmFsdWVGb3JGaWVsZCA9IChcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRzY2hlbWEsXG5cdGV4cGVjdFZhbHVlT2JqZWN0cyA9IHRydWVcbikgPT4ge1xuXHQvLyBpZiBmaWVsZCBpcyBhIHByaW1hcnkgS2V5IGZpZWxkIHRoZW4gd2Ugb3ZlcnJpZGUgdGhlIHZhbGlkYXRpb24gc28gaXQgY2FuXG5cdC8vIGJlIGVpdGhlciBzdHJpbmcgb3IgbnVtYmVyXG5cdGlmICggaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgKSB7XG5cdFx0cmV0dXJuIHZhbGlkYXRlVHlwZSggJ3N0cmluZycsIGZpZWxkVmFsdWUgKSB8fFxuXHRcdFx0dmFsaWRhdGVUeXBlKCAnbnVtYmVyJywgZmllbGRWYWx1ZSApO1xuXHR9XG5cdGNvbnN0IGlzRW51bSA9IGlzRW51bUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApO1xuXHRjb25zdCBpc1ZhbHVlT2JqZWN0ID0gaXNWYWx1ZU9iamVjdEZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApO1xuXHRmaWVsZFZhbHVlID0gZXhwZWN0VmFsdWVPYmplY3RzICYmIGlzVmFsdWVPYmplY3QgP1xuXHRcdG1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdFdpdGhBc3NlcnRpb25zKFxuXHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdHNjaGVtYVxuXHRcdCkgOlxuXHRcdGZpZWxkVmFsdWU7XG5cdGZpZWxkVmFsdWUgPSBleHBlY3RWYWx1ZU9iamVjdHMgJiZcblx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdGlzVmFsdWVPYmplY3QgP1xuXHRcdHsgcmF3OiBmaWVsZFZhbHVlIH0gOlxuXHRcdGZpZWxkVmFsdWU7XG5cdGNvbnN0IGlzVmFsaWQgPSBpc0VudW0gP1xuXHRcdHZhbGlkYXRlRW51bVR5cGUoXG5cdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUsXG5cdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLmVudW0sXG5cdFx0XHRmaWVsZFZhbHVlXG5cdFx0KSA6XG5cdFx0dmFsaWRhdGVUeXBlKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUsIGZpZWxkVmFsdWUgKTtcblx0Ly8gaWYgaXNFbnVtIGFuZCBub3QgdmFsaWQsIHRoZW4gbGV0cyBiYWlsIHdpdGggZXJyb3Jcblx0aWYgKCBpc0VudW0gJiYgISBpc1ZhbGlkICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHQnVGhlIGdpdmVuIFwiJXNcIiBmaWVsZE5hbWUgaXMgbm90IHZhbGlkIGZvciB0aGUgZGVmaW5lZCBzY2hlbWEuICBJdCBtdXN0IGJlIGEgXCIlc1wiIGFuZCBpdCBtdXN0IGJlIG9uZSBvZiBcIiVzXCIuIFRoZSBmaWVsZFZhbHVlIGdpdmVuIHdhcyBcIiVzXCInLFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0uZW51bS5qb2luKCksXG5cdFx0XHRcdGZpZWxkVmFsdWVcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cdHJldHVybiBpc1ZhbGlkO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoYXQgaXMgc2V0IGFzIHRoZSB2YWxpZGF0ZVR5cGUgZm9yIHRoZSBnaXZlbiBmaWVsZCBhbmQgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB2YWxpZGF0aW9uIHR5cGUgZm9yIHRoZSBnaXZlbiBmaWVsZCBhbmQgaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVR5cGVGb3JGaWVsZCA9ICggZmllbGROYW1lLCBpbnN0YW5jZSApID0+IHtcblx0cmV0dXJuIGluc3RhbmNlWyBQUklWQVRFX1BST1BFUlRJRVMuVkFMSURBVEVfVFlQRVMgXVsgZmllbGROYW1lIF0gP1xuXHRcdGluc3RhbmNlWyBQUklWQVRFX1BST1BFUlRJRVMuVkFMSURBVEVfVFlQRVMgXVsgZmllbGROYW1lIF0gOlxuXHRcdFZBTElEQVRFX1RZUEUuUkFXO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdldmVudCc7XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9TVEFUVVNfSUQgPSB7XG5cdFNPTERfT1VUOiAnc29sZF9vdXQnLFxuXHRQT1NUUE9ORUQ6ICdwb3N0cG9uZWQnLFxuXHRDQU5DRUxMRUQ6ICdjYW5jZWxsZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IEVWRU5UX1NUQVRVU19JRFMgPSB2YWx1ZXMoIEVWRU5UX1NUQVRVU19JRCApO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcblx0R1JFQVRFUl9USEFOLFxuXHRHUkVBVEVSX1RIQU5fQU5EX0VRVUFMLFxuXHRMRVNTX1RIQU5fQU5EX0VRVUFMLFxufSBmcm9tICcuLi9iYXNlJztcblxuZXhwb3J0IGNvbnN0IG5vd0RhdGVBbmRUaW1lID0gbW9tZW50KCk7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIFtcblx0XHRcdCdFVlRfbmFtZScsXG5cdFx0XHQnRVZUX0lEJyxcblx0XHRcdCdzdGFydF9kYXRlJyxcblx0XHRcdCdlbmRfZGF0ZScsXG5cdFx0XHQndGlja2V0X3N0YXJ0Jyxcblx0XHRcdCd0aWNrZXRfZW5kJyxcblx0XHRdICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0XHRzaG93RXhwaXJlZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0Y2F0ZWdvcnlTbHVnOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG1vbnRoOiBQcm9wVHlwZXMubW9udGgsXG5cdH0gKSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHRcdHNob3dFeHBpcmVkOiBib29sZWFuXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdzdGFydF9kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0XHRzaG93RXhwaXJlZDogZmFsc2UsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXJ0X2RhdGU6ICdEYXRldGltZS5EVFRfRVZUX3N0YXJ0Jyxcblx0XHRlbmRfZGF0ZTogJ0RhdGV0aW1lLkRUVF9FVlRfZW5kJyxcblx0XHR0aWNrZXRfc3RhcnQ6ICdEYXRldGltZS5UaWNrZXQuVEtUX3N0YXJ0X2RhdGUnLFxuXHRcdHRpY2tldF9lbmQ6ICdEYXRldGltZS5UaWNrZXQuVEtUX2VuZF9kYXRlJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gZXZlbnRzIGVuZHBvaW50IHJlcXVlc3QgdXNpbmcgcHJvdmlkZWRcbiAqIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0V4cGlyZWQgIFdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgZXhwaXJlZCBldmVudHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gY2F0ZWdvcnlTbHVnICBSZXR1cm4gZXZlbnRzIGZvciB0aGUgZ2l2ZW4gY2F0ZWdvcnlTbHVnXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9udGggICAgICAgICBSZXR1cm4gZXZlbnRzIGZvciB0aGUgZ2l2ZW4gbW9udGguXG4gKiBcdFx0XHRcdFx0XHRcdFx0IENhbiBiZSBhbnkgbW9udGggZm9ybWF0IHJlY29nbml6ZWQgYnkgbW9tZW50LlxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgVGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7XG5cdHNob3dFeHBpcmVkID0gZmFsc2UsXG5cdGNhdGVnb3J5U2x1Zyxcblx0bW9udGggPSAnbm9uZScsXG59ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXG5cdGlmICggISBzaG93RXhwaXJlZCApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RhdGV0aW1lLkRUVF9FVlRfZW5kKipleHBpcmVkXVtdPScgKyBHUkVBVEVSX1RIQU4gK1xuXHRcdFx0JyZ3aGVyZVtEYXRldGltZS5EVFRfRVZUX2VuZCoqZXhwaXJlZF1bXT0nICtcblx0XHRcdG5vd0RhdGVBbmRUaW1lLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmICggY2F0ZWdvcnlTbHVnICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVGVybV9SZWxhdGlvbnNoaXAuVGVybV9UYXhvbm9teS5UZXJtLnNsdWddPScgKyBjYXRlZ29yeVNsdWdcblx0XHQpO1xuXHR9XG5cdGlmICggbW9udGggJiYgbW9udGggIT09ICdub25lJyApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RhdGV0aW1lLkRUVF9FVlRfc3RhcnRdW109JyArIEdSRUFURVJfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtEYXRldGltZS5EVFRfRVZUX3N0YXJ0XVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuc3RhcnRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9lbmRdW109JyArIExFU1NfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtEYXRldGltZS5EVFRfRVZUX2VuZF1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLmVuZE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCJleHBvcnQgKiBmcm9tICcuL2RlZmF1bHQtbW9kZWwtc3RhdGUnO1xuZXhwb3J0ICogZnJvbSAnLi9lbmRwb2ludHMnO1xuZXhwb3J0ICogZnJvbSAnLi9wcmltYXJ5LWtleXMnO1xuZXhwb3J0ICogZnJvbSAnLi9hc3NlcnRpb25zJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWwtbmFtZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9iYXNlJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzJztcbmV4cG9ydCAqIGZyb20gJy4vZW50aXR5LWZhY3RvcnknO1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHByaW1hcnlLZXlzIH0gZnJvbSAnLi9wcmltYXJ5LWtleXMuanMnO1xuXG4vKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsga2V5cywgc3RhcnRDYXNlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBwbHVyYWxpemUgZnJvbSAncGx1cmFsaXplJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ21lbWl6ZSc7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBtb2RlbCBuYW1lcyBjdXJyZW50bHkgZXhwb3NlZCBmb3IgUkVTVCBBUEkgcmVxdWVzdC5cbiAqL1xuZXhwb3J0IGNvbnN0IE1PREVMX05BTUVTID0ga2V5cyggcHJpbWFyeUtleXMgKTtcblxuLyoqXG4gKiBVc2VkIHRvIG5vcm1hbGl6ZSB0aGUgcGx1cmFsIGZvcm0gb2YgYSBnaXZlbiBtb2RlbCBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7c3RyaW5nfSAgRW5zdXJlcyB0aGUgZ2l2ZW4gbW9kZWxOYW1lIGlzIGl0cyBwbHVyYWwgZm9ybS5cbiAqL1xuZXhwb3J0IGNvbnN0IHBsdXJhbE1vZGVsTmFtZSA9IG1lbW9pemUoXG5cdCggbW9kZWxOYW1lICkgPT4gcGx1cmFsaXplKCBtb2RlbE5hbWUgKVxuKTtcblxuLyoqXG4gKiBVc2VkIHRvIG5vcm1hbGl6ZSB0aGUgc2luZ3VsYXIgZm9ybSBvZiBhIGdpdmVuIG1vZGVsIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEVuc3VyZXMgdGhlIGdpdmVuIG1vZGVsTmFtZSBpcyBpbiBpdHMgc2luZ3VsYXIgZm9ybS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNpbmd1bGFyTW9kZWxOYW1lID0gbWVtb2l6ZShcblx0KCBtb2RlbE5hbWUgKSA9PiBwbHVyYWxpemUuc2luZ3VsYXIoIG1vZGVsTmFtZSApXG4pO1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBjYXBpdGFsaXplZCBzbmFrZWNhc2UgZm9ybWF0IGZvciB0aGUgZ2l2ZW4gbW9kZWwgbmFtZSB0eXBpY2FsbHlcbiAqIHVzZWQgaW4gcXVlcnkgc3RyaW5ncy5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIG1vZGVsTmFtZUZvclF1ZXJ5U3RyaW5nKCAnbWVzc2FnZV90ZW1wbGF0ZV9ncm91cCcgKTtcbiAqIC8vIE1lc3NhZ2VfVGVtcGxhdGVfR3JvdXBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBmb3JtYXR0ZWQgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgbW9kZWxOYW1lRm9yUXVlcnlTdHJpbmcgPSBtZW1vaXplKFxuXHQoIG1vZGVsTmFtZSApID0+IHtcblx0XHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdFx0bW9kZWxOYW1lID0gc3RhcnRDYXNlKCBtb2RlbE5hbWUgKTtcblx0XHRyZXR1cm4gbW9kZWxOYW1lLnJlcGxhY2UoIC9cXHMvZywgJ18nICk7XG5cdH1cbik7XG4iLCJpbXBvcnQgKiBhcyBkYXRlVGltZU1vZGVsIGZyb20gJy4vZGF0ZXRpbWUnO1xuaW1wb3J0ICogYXMgZXZlbnRNb2RlbCBmcm9tICcuL2V2ZW50JztcbmltcG9ydCAqIGFzIHJlZ2lzdHJhdGlvbk1vZGVsIGZyb20gJy4vcmVnaXN0cmF0aW9uJztcbmltcG9ydCAqIGFzIHN0YXR1c01vZGVsIGZyb20gJy4vc3RhdHVzJztcbmltcG9ydCAqIGFzIHRpY2tldE1vZGVsIGZyb20gJy4vdGlja2V0JztcbmltcG9ydCAqIGFzIGNoZWNrSW5Nb2RlbCBmcm9tICcuL2NoZWNraW4nO1xuaW1wb3J0ICogYXMgYXR0ZW5kZWVNb2RlbCBmcm9tICcuL2F0dGVuZGVlJztcbmV4cG9ydCB7XG5cdGNoZWNrSW5Nb2RlbCxcblx0ZGF0ZVRpbWVNb2RlbCxcblx0ZXZlbnRNb2RlbCxcblx0cmVnaXN0cmF0aW9uTW9kZWwsXG5cdHN0YXR1c01vZGVsLFxuXHR0aWNrZXRNb2RlbCxcblx0YXR0ZW5kZWVNb2RlbCxcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzQXJyYXksIHJlZHVjZSwgdHJpbUVuZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdtZW1pemUnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0YXNzZXJ0RW50aXR5SGFzS2V5LFxuXHRhc3NlcnRJc0FycmF5LFxuXHRhc3NlcnRJc05vdEVtcHR5LFxuXHRhc3NlcnRJc01hcCxcbn0gZnJvbSAnLi9hc3NlcnRpb25zJztcblxuLyoqXG4gKiBFeHBvc2VzIGEgbWFwIG9mIG1vZGVsbmFtZSB0byBwcmltYXJ5IGtleSBleHBvc2VkIGJ5IHRoZSBlZWpzLmRhdGEgZ2xvYmFsXG4gKiB2aWEgdGhlIHNlcnZlci5cbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmV4cG9ydCBjb25zdCB7IHByaW1hcnlfa2V5czogcHJpbWFyeUtleXMgPSB7fSB9ID0gZGF0YS5wYXRocztcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZXMgZm9yIHRoZSBnaXZlbiBrZXlzIGZyb20gdGhlIHByb3ZpZGVkIGVudGl0eS5cbiAqIFRoaXMgZnVuY3Rpb24gd291bGQgYmUgdXNlZCBmb3IgbW9kZWxzIHRoYXQgaGF2ZSBjb21iaW5lZCBwcmltYXJ5IGtleXNcbiAqIChkZWxpdmVyZWQgYXMgYW4gYXJyYXkpLlxuICpcbiAqIEB0eXBlIHsgbWVtb2l6ZWQgfVxuICogQHJldHVybiB7IHN0cmluZyB9IFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gZm9yIHRoZSB2YWx1ZXMuXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbHVlc0ZvckNvbWJpbmVkUHJpbWFyeUtleXMgPSBtZW1vaXplKCAoIGtleXMsIGVudGl0eSApID0+IHtcblx0YXNzZXJ0SXNBcnJheSgga2V5cyApO1xuXHRjb25zdCBwcmltYXJ5S2V5ID0gcmVkdWNlKCBrZXlzLCBmdW5jdGlvbiggcmVzdWx0LCBrZXkgKSB7XG5cdFx0YXNzZXJ0RW50aXR5SGFzS2V5KCBrZXksIGVudGl0eSApO1xuXHRcdHJldHVybiBlbnRpdHlbIHJlc3VsdCBdICsgJzonICsgZW50aXR5WyBrZXkgXTtcblx0fSApO1xuXHRyZXR1cm4gdHJpbUVuZCggcHJpbWFyeUtleSwgJzonICk7XG59ICk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgZm9yIHRoZSBnaXZlbiBrZXkgZnJvbSB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogVGhpcyBmdW5jdGlvbiB3b3VsZCBiZSB1c2VkIGZvciBtb2RlbHMgdGhhdCBoYXZlIG9ubHkgb25lIHByaW1hcnkga2V5LlxuICpcbiAqIEB0eXBlIHttZW1vaXplZH1cbiAqIEByZXR1cm4geyBmdW5jdGlvbiB9IFRoZSB2YWx1ZSBmb3IgdGhlIGtleSBpbiB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCB2YWx1ZUZvclByaW1hcnlLZXkgPSBtZW1vaXplKCAoIGtleSwgZW50aXR5ICkgPT4ge1xuXHRhc3NlcnRFbnRpdHlIYXNLZXkoIGtleSwgZW50aXR5ICk7XG5cdHJldHVybiBlbnRpdHlbIGtleSBdO1xufSApO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHByaW1hcnkga2V5IChvciBjb21iaW5lZCBwcmltYXJ5IGtleXMpIGZyb20gdGhlIGF2YWlsYWJsZSBkYXRhLlxuICpcbiAqIEB0eXBlIHttZW1vaXplZH1cbiAqIEByZXR1cm4geyBmdW5jdGlvbihzdHJpbmcpIH1cbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgZ2V0UHJpbWFyeUtleSA9IG1lbW9pemUoICggbW9kZWxOYW1lICkgPT4ge1xuXHRhc3NlcnRFbnRpdHlIYXNLZXkoIG1vZGVsTmFtZSwgcHJpbWFyeUtleXMgKTtcblx0cmV0dXJuIHByaW1hcnlLZXlzWyBtb2RlbE5hbWUgXTtcbn0gKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcXVlcnkgc3RyaW5nIGZvciBnZXR0aW5nIHRoZSBlbnRpdGllcyBiZWxvbmdpbmcgdG8gYSBtb2RlbCBmb3IgdGhlXG4gKiBnaXZlbiBwcmltYXJ5IGtleSB2YWx1ZXNcbiAqXG4gKiBAdHlwZSB7bWVtb2l6ZWR9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmltYXJ5S2V5UXVlcnlTdHJpbmcgPSBtZW1vaXplKFxuXHQoIG1vZGVsTmFtZSwga2V5VmFsdWVzID0gW10gKSA9PiB7XG5cdFx0Y29uc3QgcHJpbWFyeUtleSA9IGdldFByaW1hcnlLZXkoIG1vZGVsTmFtZSApO1xuXHRcdHJldHVybiBgWyR7IHByaW1hcnlLZXkgfV1bSU5dPWAgKyBrZXlWYWx1ZXMuam9pbigpO1xuXHR9XG4pO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlcyBmb3IgdGhlIHByaW1hcnkga2V5cyBmcm9tIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7IGZ1bmN0aW9uIH0gIElmIHRoZSBtb2RlbCBoYXMgb25seSBvbmUgcHJpbWFyeSBrZXkgdGhlbiB0aGUgdmFsdWUgd2lsbFxuICogYmUgYSBzaW1wbGUgc3RyaW5nLiAgSWYgdGhlIG1vZGVsIGhhcyBjb21iaW5lZCBwcmltYXJ5IGtleXMsIHRoZW4gdGhlIHZhbHVlXG4gKiB3aWxsIGJlIGFzIHN0cmluZyBpbiB0aGUgZm9ybWF0IGAlcy4lc2AgZm9yIHRoZSBwcmltYXJ5IGtleSB2YWx1ZXMuXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVudGl0eVByaW1hcnlLZXlWYWx1ZXMgPSBtZW1vaXplKCAoIG1vZGVsTmFtZSwgZW50aXR5ICkgPT4ge1xuXHRjb25zdCBrZXlzID0gZ2V0UHJpbWFyeUtleSggbW9kZWxOYW1lICk7XG5cdHJldHVybiBpc0FycmF5KCBrZXlzICkgP1xuXHRcdHZhbHVlc0ZvckNvbWJpbmVkUHJpbWFyeUtleXMoIGtleXMsIGVudGl0eSApIDpcblx0XHR2YWx1ZUZvclByaW1hcnlLZXkoIGtleXMsIGVudGl0eSApO1xufSApO1xuXG4vKipcbiAqIFRoaXMgcmVjZWl2ZXMgYW4gYXJyYXkgb2YgZW50aXRpZXMgYW5kIHJldHVybnMgYSBjb2xsZWN0aW9uIG9mIHRob3NlIHNhbWVcbiAqIGVudGl0aWVzIGluZGV4ZWQgYnkgdGhlIHByaW1hcnkga2V5IHZhbHVlIGZvciBlYWNoIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge0FycmF5fSBlbnRpdGllc1xuICogQHJldHVybiB7TWFwfSAgQSBjb2xsZWN0aW9uIGluZGV4ZWQgYnkgdGhlIHByaW1hcnkga2V5IHZhbHVlcyBmb3IgZWFjaCBlbnRpdHkuXG4gKiBAdGhyb3dzIHtFeGNlcHRpb259XG4gKi9cbmV4cG9ydCBjb25zdCBrZXlFbnRpdGllc0J5UHJpbWFyeUtleVZhbHVlID0gKCBtb2RlbE5hbWUsIGVudGl0aWVzID0gW10gKSA9PiB7XG5cdGFzc2VydElzTm90RW1wdHkoXG5cdFx0ZW50aXRpZXMsXG5cdFx0X18oXG5cdFx0XHQnVGhlIHByb3ZpZGVkIGFycmF5IG9mIGVudGl0aWVzIG11c3Qgbm90IGJlIGVtcHR5Jyxcblx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0KVxuXHQpO1xuXHRhc3NlcnRJc0FycmF5KCBlbnRpdGllcyApO1xuXG5cdGNvbnN0IG1hcHBlZEVudGl0aWVzID0gbmV3IE1hcCgpO1xuXHRlbnRpdGllcy5mb3JFYWNoKCAoIGVudGl0eSApID0+IHtcblx0XHRtYXBwZWRFbnRpdGllcy5zZXQoXG5cdFx0XHRnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzKCBtb2RlbE5hbWUsIGVudGl0eSApLFxuXHRcdFx0ZW50aXR5XG5cdFx0KTtcblx0fSApO1xuXHRyZXR1cm4gbWFwcGVkRW50aXRpZXM7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgZW50aXR5IGluc3RhbmNlcyB1c2luZyB0aGUgZ2l2ZW4gZmFjdG9yeSBhbmQgYXJyYXlcbiAqIG9mIGVudGl0eSB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGZhY3RvcnlcbiAqIEBwYXJhbSB7TWFwfSBlbnRpdGllc1xuICogQHJldHVybiB7TWFwfSAgQW4gYXJyYXkgb2YgZW50aXR5IGluc3RhbmNlcyBpbmRleGVkIGJ5XG4gKiB0aGVpciBwcmltYXJ5IGtleSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQW5kS2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSA9IChcblx0ZmFjdG9yeSxcblx0ZW50aXRpZXMsXG4pID0+IHtcblx0YXNzZXJ0SXNNYXAoXG5cdFx0ZW50aXRpZXMsXG5cdFx0X18oXG5cdFx0XHQnVGhlIHByb3ZpZGVkIG9iamVjdCBvZiBlbnRpdGllcyBtdXN0IGJlIGEgTWFwIG9iamVjdCcsXG5cdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdClcblx0KTtcblx0ZW50aXRpZXMuZm9yRWFjaCggKCBlbnRpdHksIGVudGl0eUlkICkgPT4ge1xuXHRcdGVudGl0aWVzLnNldCggZW50aXR5SWQsIGZhY3RvcnkuZnJvbUV4aXN0aW5nKCBlbnRpdHkgKSApO1xuXHR9ICk7XG5cdHJldHVybiBlbnRpdGllcztcbn07XG4iLCIvKipcbiAqIEludGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgc3RhdHVzTW9kZWwgZnJvbSAnLi4vc3RhdHVzL2NvbnN0YW50cyc7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdyZWdpc3RyYXRpb24nO1xuXG5leHBvcnQgY29uc3QgUkVHSVNUUkFUSU9OX1NUQVRVU19JRFMgPSB2YWx1ZXMoXG5cdHN0YXR1c01vZGVsLlJFR0lTVFJBVElPTl9TVEFUVVNfSURcbik7XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCwgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxufSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCAqIGFzIHN0YXR1c01vZGVsIGZyb20gJy4uL3N0YXR1cy9jb25zdGFudHMnO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdGZvckV2ZW50SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvckF0dGVuZGVlSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclRyYW5zYWN0aW9uSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclRpY2tldElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JTdGF0dXNJZDogUHJvcFR5cGVzLm9uZU9mKCB2YWx1ZXMoIHN0YXR1c01vZGVsLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQgKSApLFxuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdFx0J1JFR19JRCcsXG5cdFx0XHQnUkVHX2RhdGUnLFxuXHRcdF0gKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHR9ICksXG59O1xuXG5leHBvcnQgY29uc3Qgb3B0aW9uc0VudGl0eU1hcCA9IHtcblx0ZGVmYXVsdDoge1xuXHRcdHZhbHVlOiAnUkVHX0lEJyxcblx0XHRsYWJlbDogJ1JFR19jb2RlJyxcblx0fSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ3JlZ19kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhIHJlZ2lzdHJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0cmVnX2lkOiAnUkVHX0lEJyxcblx0XHRyZWdfZGF0ZTogJ1JFR19kYXRlJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gcmVnaXN0cmF0aW9ucyBlbmRwb2ludCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgICAgXHRJRCBvZiBFdmVudCB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvckF0dGVuZGVlSWQgICAgSUQgb2YgQXR0ZW5kZWUgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JUcmFuc2FjdGlvbklkIElEIG9mIFRyYW5zYWN0aW9uIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yVGlja2V0SWQgXHRcdElEIG9mIFRpY2tldCB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtzdHJpbmd9IGZvclN0YXR1c0lkIFx0XHRJRCBvZiBTdGF0dXMgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgXHRUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdGZvckF0dGVuZGVlSWQgPSAwLFxuXHRmb3JUcmFuc2FjdGlvbklkID0gMCxcblx0Zm9yVGlja2V0SWQgPSAwLFxuXHRmb3JTdGF0dXNJZCA9ICcnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0Zm9yRXZlbnRJZCA9IHBhcnNlSW50KCBmb3JFdmVudElkLCAxMCApO1xuXHRpZiAoIGZvckV2ZW50SWQgIT09IDAgJiYgISBpc05hTiggZm9yRXZlbnRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtFVlRfSURdPScgKyBmb3JFdmVudElkICk7XG5cdH1cblx0Zm9yQXR0ZW5kZWVJZCA9IHBhcnNlSW50KCBmb3JBdHRlbmRlZUlkLCAxMCApO1xuXHRpZiAoIGZvckF0dGVuZGVlSWQgIT09IDAgJiYgISBpc05hTiggZm9yQXR0ZW5kZWVJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtBVFRfSURdPScgKyBmb3JBdHRlbmRlZUlkICk7XG5cdH1cblx0Zm9yVHJhbnNhY3Rpb25JZCA9IHBhcnNlSW50KCBmb3JUcmFuc2FjdGlvbklkLCAxMCApO1xuXHRpZiAoIGZvclRyYW5zYWN0aW9uSWQgIT09IDAgJiYgISBpc05hTiggZm9yVHJhbnNhY3Rpb25JZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtUWE5fSURdPScgKyBmb3JUcmFuc2FjdGlvbklkICk7XG5cdH1cblx0Zm9yVGlja2V0SWQgPSBwYXJzZUludCggZm9yVGlja2V0SWQsIDEwICk7XG5cdGlmICggZm9yVGlja2V0SWQgIT09IDAgJiYgISBpc05hTiggZm9yVGlja2V0SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbVEtUX0lEXT0nICsgZm9yVGlja2V0SWQgKTtcblx0fVxuXHRpZiAoIGZvclN0YXR1c0lkICE9PSAnJyAmJiBmb3JTdGF0dXNJZCAhPT0gbnVsbCApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbU1RTX0lEXT0nICsgZm9yU3RhdHVzSWQgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdzdGF0dXMnO1xuLy8gdHlwZXNcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9FTUFJTCA9ICdlbWFpbCc7XG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfRVZFTlQgPSAnZXZlbnQnO1xuZXhwb3J0IGNvbnN0IFNUQVRVU19UWVBFX01FU1NBR0UgPSAnbWVzc2FnZSc7XG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfUEFZTUVOVCA9ICdwYXltZW50JztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9SRUdJU1RSQVRJT04gPSAncmVnaXN0cmF0aW9uJztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9UUkFOU0FDVElPTiA9ICd0cmFuc2FjdGlvbic7XG4vLyBlbWFpbFxuZXhwb3J0IGNvbnN0IEVNQUlMX1NUQVRVU19JRCA9IHtcblx0RFJBRlQ6ICdFRFInLFxuXHRTRU5UOiAnRVNOJyxcblx0RVhQSVJFRDogJ0VYUCcsXG59O1xuLy8gZXZlbnRcbmV4cG9ydCBjb25zdCBFVkVOVF9TVEFUVVNfSUQgPSB7XG5cdEFDVElWRTogJ0FDVCcsXG5cdFJFR0lTVFJBVElPTl9DTE9TRUQ6ICdDTFMnLFxuXHRERUxFVEVEOiAnREVMJyxcblx0REVOSUVEOiAnREVOJyxcblx0RFJBRlQ6ICdEUkYnLFxuXHROT1RfQUNUSVZFOiAnTkFDJyxcblx0Tk9UX09QRU46ICdOT1AnLFxuXHRPTkdPSU5HOiAnT05HJyxcblx0UkVHSVNUUkFUSU9OX09QRU46ICdPUE4nLFxuXHRQRU5ESU5HOiAnUE5EJyxcblx0U0VDT05EQVJZOiAnU0VDJyxcbn07XG4vLyBtZXNzYWdlXG5leHBvcnQgY29uc3QgTUVTU0FHRV9TVEFUVVNfSUQgPSB7XG5cdERFQlVHOiAnTURPJyxcblx0RVhFQ1VUSU5HOiAnTUVYJyxcblx0RkFJTDogJ01GTCcsXG5cdElOQ09NUExFVEU6ICdNSUMnLFxuXHRJRExFOiAnTUlEJyxcblx0UkVTRU5EOiAnTVJTJyxcblx0UkVUUlk6ICdNUlQnLFxuXHRTRU5UOiAnTVNOJyxcbn07XG4vLyBwYXltZW50XG5leHBvcnQgY29uc3QgUEFZTUVOVF9TVEFUVVNfSUQgPSB7XG5cdEFQUFJPVkVEOiAnUEFQJyxcblx0Q0FOQ0VMTEVEOiAnUENOJyxcblx0REVDTElORUQ6ICdQREMnLFxuXHRGQUlMRUQ6ICdQRkwnLFxuXHRQRU5ESU5HOiAnUFBOJyxcbn07XG4vLyByZWdpc3RyYXRpb25cbmV4cG9ydCBjb25zdCBSRUdJU1RSQVRJT05fU1RBVFVTX0lEID0ge1xuXHRBUFBST1ZFRDogJ1JBUCcsXG5cdENBTkNFTExFRDogJ1JDTicsXG5cdERFQ0xJTkVEOiAnUkRDJyxcblx0SU5DT01QTEVURTogJ1JJQycsXG5cdE5PVF9BUFBST1ZFRDogJ1JOQScsXG5cdFBFTkRJTkdfUEFZTUVOVDogJ1JQUCcsXG5cdFdBSVRfTElTVDogJ1JXTCcsXG59O1xuLy8gdHJhbnNhY3Rpb25cbmV4cG9ydCBjb25zdCBUUkFOU0FDVElPTl9TVEFUVVNfSUQgPSB7XG5cdEFCQU5ET05FRDogJ1RBQicsXG5cdENPTVBMRVRFOiAnVENNJyxcblx0RkFJTEVEOiAnVEZMJyxcblx0SU5DT01QTEVURTogJ1RJTicsXG5cdE9WRVJQQUlEOiAnVE9QJyxcbn07XG5cbi8vIHRoZSBmb2xsb3dpbmcgYXJlIG5vdCBpbiB0aGUgc3RhdHVzIGRhdGFiYXNlIGJ1dCBhcmUga2VwdCBoZXJlIGZvclxuLy8gY29udmVuaWVuY2VcblxuLy8gY3VzdG9tIHBvc3QgdHlwZXNcbmV4cG9ydCBjb25zdCBDUFRfU1RBVFVTX0lEID0ge1xuXHRQVUJMSVNIOiAncHVibGlzaCcsXG5cdEZVVFVSRTogJ2Z1dHVyZScsXG5cdERSQUZUOiAnZHJhZnQnLFxuXHRQRU5ESU5HOiAncGVuZGluZycsXG5cdFBSSVZBVEU6ICdwcml2YXRlJyxcblx0VFJBU0hFRDogJ3RyYXNoJyxcbn07XG5cbmV4cG9ydCBjb25zdCBVTktOT1dOX1NUQVRVU19JRCA9ICd1bmtub3duJztcblxuZXhwb3J0IGNvbnN0IEFMTF9TVEFUVVNfSURTID0gW1xuXHQuLi52YWx1ZXMoIEVNQUlMX1NUQVRVU19JRCApLFxuXHQuLi52YWx1ZXMoIEVWRU5UX1NUQVRVU19JRCApLFxuXHQuLi52YWx1ZXMoIE1FU1NBR0VfU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggUEFZTUVOVF9TVEFUVVNfSUQgKSxcblx0Li4udmFsdWVzKCBSRUdJU1RSQVRJT05fU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggVFJBTlNBQ1RJT05fU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggQ1BUX1NUQVRVU19JRCApLFxuXHRVTktOT1dOX1NUQVRVU19JRCxcbl07XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgc3RhdHVzIGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IEVWRU5UX1NUQVRVU19JRCB9IGZyb20gJy4uL2V2ZW50JztcbmltcG9ydCB7IFRJQ0tFVF9TVEFUVVNfSUQgfSBmcm9tICcuLi90aWNrZXQnO1xuaW1wb3J0IHsgREFURVRJTUVfU1RBVFVTX0lEIH0gZnJvbSAnLi4vZGF0ZXRpbWUnO1xuaW1wb3J0IHsgQ0hFQ0tJTl9TVEFUVVNfSUQgfSBmcm9tICcuLi9jaGVja2luJztcblxuLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbHVlLW9iamVjdHMnO1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBSZWdpc3RyYXRpb24gc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9SRUdJU1RSQVRJT04gPSB7XG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuUEVORElOR19QQVlNRU5UIF06IG5ldyBMYWJlbChcblx0XHRfXyggJ3BlbmRpbmcgcGF5bWVudCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRfXyggJ3BlbmRpbmcgcGF5bWVudHMnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5BUFBST1ZFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FwcHJvdmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuTk9UX0FQUFJPVkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnbm90IGFwcHJvdmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuQ0FOQ0VMTEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnY2FuY2VsbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuSU5DT01QTEVURSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2luY29tcGxldGUnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5ERUNMSU5FRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2RlY2xpbmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuV0FJVF9MSVNUIF06IG5ldyBMYWJlbChcblx0XHRfXyggJ3dhaXQgbGlzdCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRfXyggJ3dhaXQgbGlzdHMnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBUcmFuc2FjdGlvbiBzdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICpcbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9UUkFOU0FDVElPTiA9IHtcblx0WyBzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELk9WRVJQQUlEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnb3ZlcnBhaWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELkNPTVBMRVRFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnY29tcGxldGUnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELklOQ09NUExFVEUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdpbmNvbXBsZXRlJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlRSQU5TQUNUSU9OX1NUQVRVU19JRC5GQUlMRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdmYWlsZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELkFCQU5ET05FRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FiYW5kb25lZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIHBheW1lbnQgc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9QQVlNRU5UID0ge1xuXHRbIHN0YXR1cy5QQVlNRU5UX1NUQVRVU19JRC5BUFBST1ZFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FjY2VwdGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlBBWU1FTlRfU1RBVFVTX0lELlBFTkRJTkcgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdwZW5kaW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlBBWU1FTlRfU1RBVFVTX0lELkNBTkNFTExFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2NhbmNlbGxlZCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0KSxcblx0WyBzdGF0dXMuUEFZTUVOVF9TVEFUVVNfSUQuREVDTElORUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdkZWNsaW5lZCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0KSxcblx0WyBzdGF0dXMuUEFZTUVOVF9TVEFUVVNfSUQuRkFJTEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZmFpbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgTWVzc2FnZSBzdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX01FU1NBR0UgPSB7XG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELlNFTlQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdzZW50JywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELklETEUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdxdWV1ZWQgZm9yIHNlbmRpbmcnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuRkFJTCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2ZhaWxlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5ERUJVRyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2RlYnVnIG9ubHknLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuRVhFQ1VUSU5HIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnbWVzc2VuZ2VyIGlzIGV4ZWN1dGluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5SRVNFTkQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdxdWV1ZWQgZm9yIHJlc2VuZGluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5JTkNPTVBMRVRFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncXVldWVkIGZvciBnZW5lcmF0aW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELlJFVFJZIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZmFpbGVkIHNlbmRpbmcsIGNhbiBiZSByZXRyaWVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgQ1BUIHN0YXR1c2VzXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ1BUID0ge1xuXHRbIHN0YXR1cy5DUFRfU1RBVFVTX0lELlBVQkxJU0ggXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdwdWJsaXNoZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuQ1BUX1NUQVRVU19JRC5GVVRVUkUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdzY2hlZHVsZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuQ1BUX1NUQVRVU19JRC5EUkFGVCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2RyYWZ0JywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLkNQVF9TVEFUVVNfSUQuUEVORElORyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3BlbmRpbmcnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuQ1BUX1NUQVRVU19JRC5QUklWQVRFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncHJpdmF0ZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5DUFRfU1RBVFVTX0lELlRSQVNIRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICd0cmFzaGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vLyB0aGUgZm9sbG93aW5nIHN0YXR1cyBtYXBzIGFyZSBmb3IgbW9kZWwgc3RhdHVzZXMgdGhhdCBhcmUgbm90IHNhdmVkIGluIHRoZVxuLy8gc3RhdHVzIHRhYmxlIGJ1dCBmb3IgY29udmVuaWVuY2UgaGF2ZSB0aGVpciBsYWJlbHMgcmV0cmlldmFibGUgdmlhIGhlcmUuXG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBFdmVudCBTdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0VWRU5UID0ge1xuXHRbIEVWRU5UX1NUQVRVU19JRC5TT0xEX09VVCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3NvbGQgb3V0JywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgRVZFTlRfU1RBVFVTX0lELlBPU1RQT05FRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3Bvc3Rwb25lZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIEVWRU5UX1NUQVRVU19JRC5DQU5DRUxMRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdjYW5jZWxsZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBUaWNrZXQgc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9USUNLRVQgPSB7XG5cdFsgVElDS0VUX1NUQVRVU19JRC5BUkNISVZFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FyY2hpdmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgVElDS0VUX1NUQVRVU19JRC5FWFBJUkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZXhwaXJlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIFRJQ0tFVF9TVEFUVVNfSUQuU09MRF9PVVQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdzb2xkIG91dCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIFRJQ0tFVF9TVEFUVVNfSUQuUEVORElORyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3VwY29taW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgVElDS0VUX1NUQVRVU19JRC5PTlNBTEUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdvbiBzYWxlJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgZGF0ZXRpbWUgc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9EQVRFVElNRSA9IHtcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuQ0FOQ0VMTEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnY2FuY2VsbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgREFURVRJTUVfU1RBVFVTX0lELlNPTERfT1VUIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnc29sZCBvdXQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuRVhQSVJFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2V4cGlyZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuSU5BQ1RJVkUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdpbmFjdGl2ZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIERBVEVUSU1FX1NUQVRVU19JRC5VUENPTUlORyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3VwY29taW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgREFURVRJTUVfU1RBVFVTX0lELkFDVElWRSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FjdGl2ZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIERBVEVUSU1FX1NUQVRVU19JRC5QT1NUUE9ORUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdwb3N0cG9uZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBjaGVja2luIHN0YXR1c2VzXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0NIRUNLSU4gPSB7XG5cdFsgQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfSU4gXTogbmV3IExhYmVsKFxuXHRcdF9fKCAnY2hlY2staW4nLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0X18oICdjaGVjay1pbnMnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBDSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9PVVQgXTogbmV3IExhYmVsKFxuXHRcdF9fKCAnY2hlY2stb3V0JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdF9fKCAnY2hlY2stb3V0cycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIENIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX05FVkVSIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnbmV2ZXIgY2hlY2tlZCBpbicsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBDb21iaW5lZCB0cmFuc2xhdGlvbiBtYXAgZm9yIGFsbCBzdGF0dXNlcy5cbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9BTEwgPSB7XG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfUkVHSVNUUkFUSU9OLFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX1RSQU5TQUNUSU9OLFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX1BBWU1FTlQsXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfTUVTU0FHRSxcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9DUFQsXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfRVZFTlQsXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfVElDS0VULFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX0RBVEVUSU1FLFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX0NIRUNLSU4sXG5cdFsgc3RhdHVzLlVOS05PV05fU1RBVFVTX0lEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAndW5rbm93bicsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwcmV0dHkgc3RhdHVzIGxhYmVsIHN0cmluZyBmb3IgdGhlIGdpdmVuIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RhdHVzQ29kZVxuICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhciAgV2hldGhlciB0byByZXR1cm4gdGhlIHNpbmd1bGFyIG9yIHBsdXJhbCBsYWJlbFxuICogdmFsdWVcbiAqIEBwYXJhbSB7KHNlbnRlbmNlfGxvd2VyfHVwcGVyKX0gc2NoZW1hXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFJldHVybnMgdGhlIG1hcHBlZCBwcmV0dHkgbGFiZWwgZm9yIHRoZSBnaXZlbiBzdGF0dXMgY29kZSBvclxuICogYSBmb3JtYXR0ZWQgJ3Vua293bicgc3RyaW5nIGlmIHRoZXJlIGlzIG5vIG1hcHBlZCB2YWx1ZSBmb3IgdGhlIGdpdmVuIGNvZGUuXG4gKi9cbmV4cG9ydCBjb25zdCBwcmV0dHlTdGF0dXMgPSAoXG5cdHN0YXR1c0NvZGUsXG5cdHNpbmd1bGFyID0gdHJ1ZSxcblx0c2NoZW1hID0gTGFiZWwuRk9STUFUX1NFTlRFTkNFX0NBU0VcbikgPT4ge1xuXHRyZXR1cm4gU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9BTExbIHN0YXR1c0NvZGUgXSA/XG5cdFx0U1RBVFVTX1RSQU5TTEFUSU9OX01BUF9BTExbIHN0YXR1c0NvZGUgXS5hc0Zvcm1hdHRlZCggc2luZ3VsYXIsIHNjaGVtYSApIDpcblx0XHRTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0FMTFsgc3RhdHVzLlVOS05PV05fU1RBVFVTX0lEIF0uYXNGb3JtYXR0ZWQoXG5cdFx0XHRzaW5ndWxhcixcblx0XHRcdHNjaGVtYVxuXHRcdCk7XG59O1xuXG4vKipcbiAqIEV4cGVjdHMgYW4gYXJyYXkgb2Ygc3RhdHVzIGNvZGVzIGFuZCByZXR1cm5zIGFuIG9iamVjdCBpbmRleGVkIGJ5IGNvZGVzIHdpdGhcbiAqIHZhbHVlcyBiZWluZyB0aGUgZm9ybWF0dGVkIHByZXR0eSBsYWJlbHMgZm9yIGVhY2ggY29kZSBhY2NvcmRpbmcgdG8gdGhlXG4gKiBwcm92aWRlZCBhcmd1bWVudHNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzdGF0dXNDb2Rlc1xuICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhclxuICogQHBhcmFtIHsoc2VudGVuY2V8bG93ZXJ8dXBwZXIpfSBzY2hlbWFcbiAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IG1hcHBpbmcgc3RhdHVzIGNvZGUgdG8gcHJldHR5IGxhYmVsLlxuICovXG5leHBvcnQgY29uc3QgcHJldHR5U3RhdHVzZXMgPSAoXG5cdHN0YXR1c0NvZGVzLFxuXHRzaW5ndWxhciA9IHRydWUsXG5cdHNjaGVtYSA9IExhYmVsLkZPUk1BVF9TRU5URU5DRV9DQVNFXG4pID0+IHtcblx0aWYgKCAhIGlzQXJyYXkoIHN0YXR1c0NvZGVzICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ0V4cGVjdCBpbmNvbWluZyBzdGF0dXNDb2RlcyBhcmd1bWVudCcgK1xuXHRcdFx0JyB0byBiZSBhbiBhcnJheScgKTtcblx0fVxuXHRjb25zdCBtYXBwZWRTdGF0dXNlcyA9IHt9O1xuXHRzdGF0dXNDb2Rlcy5mb3JFYWNoKCAoIHN0YXR1c0NvZGUgKSA9PiB7XG5cdFx0bWFwcGVkU3RhdHVzZXNbIHN0YXR1c0NvZGUgXSA9IHByZXR0eVN0YXR1cyhcblx0XHRcdHN0YXR1c0NvZGUsXG5cdFx0XHRzaW5ndWxhcixcblx0XHRcdHNjaGVtYVxuXHRcdCk7XG5cdH0gKTtcblx0cmV0dXJuIG1hcHBlZFN0YXR1c2VzO1xufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9oZWxwZXJzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0FTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG59IGZyb20gJy4uL2Jhc2UnO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMjUsXG5cdFx0b3JkZXJCeTogJ3N0YXR1c0NvZGUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9BU0MsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXR1c0NvZGU6ICdTVFNfY29kZScsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIGV2ZW50cyBlbmRwb2ludCByZXF1ZXN0IHVzaW5nIHByb3ZpZGVkXG4gKiBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhdHVzVHlwZSBcdElEIGZvciB0eXBlIG9mIFN0YXR1cyB0byByZXRyaWV2ZVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICBUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHsgc3RhdHVzVHlwZSB9ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXHRpZiAoIHN0YXR1c1R5cGUgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1NUU190eXBlXT0nICsgc3RhdHVzVHlwZSApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuXG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAndGlja2V0JztcblxuZXhwb3J0IGNvbnN0IFRJQ0tFVF9TVEFUVVNfSUQgPSB7XG5cdFNPTERfT1VUOiAnVEtTJyxcblx0RVhQSVJFRDogJ1RLRScsXG5cdEFSQ0hJVkVEOiAnVEtBJyxcblx0UEVORElORzogJ1RLUCcsXG5cdE9OU0FMRTogJ1RLTycsXG59O1xuXG5leHBvcnQgY29uc3QgVElDS0VUX1NUQVRVU19JRFMgPSB2YWx1ZXMoIFRJQ0tFVF9TVEFUVVNfSUQgKTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfREVTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG5cdEdSRUFURVJfVEhBTixcblx0R1JFQVRFUl9USEFOX0FORF9FUVVBTCxcblx0TEVTU19USEFOX0FORF9FUVVBTCxcbn0gZnJvbSAnLi4vYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBub3dEYXRlQW5kVGltZSA9IG1vbWVudCgpO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0XHQnVEtUX25hbWUnLFxuXHRcdFx0J1RLVF9JRCcsXG5cdFx0XHQnc3RhcnRfZGF0ZScsXG5cdFx0XHQnZW5kX2RhdGUnLFxuXHRcdF0gKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHRcdHNob3dFeHBpcmVkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRtb250aDogUHJvcFR5cGVzLm1vbnRoLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0XHRzaG93RXhwaXJlZDogYm9vbGVhblxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDEwMCxcblx0XHRvcmRlckJ5OiAnc3RhcnRfZGF0ZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdFx0c2hvd0V4cGlyZWQ6IGZhbHNlLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGEgdGlja2V0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHRzdGFydF9kYXRlOiAnVEtUX3N0YXJ0X2RhdGUnLFxuXHRcdGVuZF9kYXRlOiAnVEtUX2VuZF9kYXRlJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gdGlja2V0cyBlbmRwb2ludCByZXF1ZXN0IHVzaW5nIHByb3ZpZGVkXG4gKiBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3dFeHBpcmVkIFx0V2hldGhlciBvciBub3QgdG8gaW5jbHVkZSBleHBpcmVkIHRpY2tldHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9udGggICAgICAgICAgICBSZXR1cm4gdGlja2V0cyBmb3IgdGhlIGdpdmVuIG1vbnRoLiBDYW4gYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdGluIGFueSBtb250aCBmb3JtYXQgcmVjb2duaXplZCBieSBtb21lbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICAgIFx0SUQgb2YgRXZlbnQgdG8gcmV0cmlldmUgdGlja2V0cyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JEYXRldGltZUlkICAgIElEIG9mIERhdGV0aW1lIHRvIHJldHJpZXZlIHRpY2tldHMgZm9yXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgIFx0VGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7XG5cdGZvckV2ZW50SWQgPSAwLFxuXHRmb3JEYXRldGltZUlkID0gMCxcblx0c2hvd0V4cGlyZWQgPSBmYWxzZSxcblx0bW9udGggPSAnbm9uZScsXG59ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXHRpZiAoICEgc2hvd0V4cGlyZWQgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtUS1RfZW5kX2RhdGUqKmV4cGlyZWRdW109JyArIEdSRUFURVJfVEhBTiArXG5cdFx0XHQnJndoZXJlW1RLVF9lbmRfZGF0ZSoqZXhwaXJlZF1bXT0nICtcblx0XHRcdG5vd0RhdGVBbmRUaW1lLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmICggbW9udGggJiYgbW9udGggIT09ICdub25lJyApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW1RLVF9zdGFydF9kYXRlXVtdPScgKyBHUkVBVEVSX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbVEtUX3N0YXJ0X2RhdGVdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5zdGFydE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtUS1RfZW5kX2RhdGVdW109JyArIExFU1NfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtUS1RfZW5kX2RhdGVdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5lbmRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGZvckV2ZW50SWQgPSBwYXJzZUludCggZm9yRXZlbnRJZCwgMTAgKTtcblx0aWYgKCBmb3JFdmVudElkICE9PSAwICYmICEgaXNOYU4oIGZvckV2ZW50SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbRGF0ZXRpbWUuRXZlbnQuRVZUX0lEXT0nICsgZm9yRXZlbnRJZCApO1xuXHR9XG5cdGZvckRhdGV0aW1lSWQgPSBwYXJzZUludCggZm9yRGF0ZXRpbWVJZCwgMTAgKTtcblx0aWYgKCBmb3JEYXRldGltZUlkICE9PSAwICYmICEgaXNOYU4oIGZvckRhdGV0aW1lSWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbRGF0ZXRpbWUuRFRUX0lEXT0nICsgZm9yRGF0ZXRpbWVJZCApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb21cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKTsiLCJmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhvdXRIb2xlczsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQ7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwidmFyIF9PYmplY3QkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblxuICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsInZhciBfT2JqZWN0JGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJ2YXIgX09iamVjdCRnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpO1xuXG52YXIgX09iamVjdCRzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpO1xuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZiA9IF9PYmplY3Qkc2V0UHJvdG90eXBlT2YgPyBfT2JqZWN0JGdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgX09iamVjdCRnZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2Y7IiwidmFyIF9PYmplY3QkY3JlYXRlID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKTtcblxudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gX09iamVjdCRjcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsInZhciBfQXJyYXkkZnJvbSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2FycmF5L2Zyb21cIik7XG5cbnZhciBfaXNJdGVyYWJsZSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2lzLWl0ZXJhYmxlXCIpO1xuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKF9pc0l0ZXJhYmxlKE9iamVjdChpdGVyKSkgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXIpID09PSBcIltvYmplY3QgQXJndW1lbnRzXVwiKSByZXR1cm4gX0FycmF5JGZyb20oaXRlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheTsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVTcHJlYWQ7IiwidmFyIF9PYmplY3QkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvclwiKTtcblxudmFyIF9PYmplY3QkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9sc1wiKTtcblxudmFyIF9PYmplY3Qka2V5cyA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9rZXlzXCIpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi9kZWZpbmVQcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcblxuICAgIHZhciBvd25LZXlzID0gX09iamVjdCRrZXlzKHNvdXJjZSk7XG5cbiAgICBpZiAodHlwZW9mIF9PYmplY3QkZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoX09iamVjdCRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gX09iamVjdCRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQ7IiwidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgPSByZXF1aXJlKFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIik7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm47IiwidmFyIF9PYmplY3Qkc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKTtcblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2YgPSBfT2JqZWN0JHNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsInZhciBhcnJheVdpdGhvdXRIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aG91dEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5XCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZFwiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90b0NvbnN1bWFibGVBcnJheTsiLCJ2YXIgX1N5bWJvbCRpdGVyYXRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9TeW1ib2wgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2xcIik7XG5cbmZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIF9TeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX1N5bWJvbCRpdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX1N5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX1N5bWJvbCAmJiBvYmogIT09IF9TeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2YyKG9iaik7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBfU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoX1N5bWJvbCRpdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX1N5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX1N5bWJvbCAmJiBvYmogIT09IF9TeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUnKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpIHtcbiAgcmV0dXJuICRPYmplY3QuY3JlYXRlKFAsIEQpO1xufTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gIHJldHVybiAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KTtcbn07XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5rZXlzO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5zZXRQcm90b3R5cGVPZjtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuU3ltYm9sO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQVJHID0gY29mKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS43JyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGluZGV4LCB2YWx1ZSkge1xuICBpZiAoaW5kZXggaW4gb2JqZWN0KSAkZGVmaW5lUHJvcGVydHkuZihvYmplY3QsIGluZGV4LCBjcmVhdGVEZXNjKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W2luZGV4XSA9IHZhbHVlO1xufTtcbiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG4iLCIvLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciByZXN1bHQgPSBnZXRLZXlzKGl0KTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIGlmIChnZXRTeW1ib2xzKSB7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KTtcbiAgICB2YXIgaXNFbnVtID0gcElFLmY7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKHN5bWJvbHMubGVuZ3RoID4gaSkgaWYgKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKSByZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGhhcyhleHBvcnRzLCBrZXkpKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuIiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07XG4iLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaCAoZSkge1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYgKHJldCAhPT0gdW5kZWZpbmVkKSBhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciAkaXRlckNyZWF0ZSA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgdHlwZW9mIEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSAhPSAnZnVuY3Rpb24nKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCJ2YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbiAoKSB7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYywgc2tpcENsb3NpbmcpIHtcbiAgaWYgKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IFs3XTtcbiAgICB2YXIgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7IGRvbmU6IHNhZmUgPSB0cnVlIH07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9uZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmUgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuIiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBnT1BOID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mO1xudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG4iLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJykuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGV4ZWMpIHtcbiAgdmFyIGZuID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldO1xuICB2YXIgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24gKCkgeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbiIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbiAoTywgcHJvdG8pIHtcbiAgYW5PYmplY3QoTyk7XG4gIGlmICghaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKSB0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbiAodGVzdCwgYnVnZ3ksIHNldCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi9fY3R4JykoRnVuY3Rpb24uY2FsbCwgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pIHtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZiAoYnVnZ3kpIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcbiIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgdGFnLCBzdGF0KSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKSBkZWYoaXQsIFRBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWcgfSk7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246IGNvcmUudmVyc2lvbixcbiAgbW9kZTogcmVxdWlyZSgnLi9fbGlicmFyeScpID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMTggRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChUT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGF0LCBwb3MpIHtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKTtcbiAgICB2YXIgaSA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBsID0gcy5sZW5ndGg7XG4gICAgdmFyIGEsIGI7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gbCkgcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcbiIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgd2tzRXh0ID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYgKG5hbWUuY2hhckF0KDApICE9ICdfJyAmJiAhKG5hbWUgaW4gJFN5bWJvbCkpIGRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHsgdmFsdWU6IHdrc0V4dC5mKG5hbWUpIH0pO1xufTtcbiIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpO1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICAgIHZhciBDID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheTtcbiAgICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIG1hcGZuID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihPKTtcbiAgICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmIChtYXBwaW5nKSBtYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmIChpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSkge1xuICAgICAgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQygpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IgKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIHN0ZXAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBraW5kID0gdGhpcy5faztcbiAgdmFyIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZiAoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpIHtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IGNyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpIH0pO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZiB9KTtcbiIsIi8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZjtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRvSU9iamVjdChpdCksIGtleSk7XG4gIH07XG59KTtcbiIsIi8vIDE5LjEuMi45IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldFByb3RvdHlwZU9mJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpIHtcbiAgICByZXR1cm4gJGdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcbiIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KSB7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcbiIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IHNldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXQgfSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBNRVRBID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWTtcbnZhciAkZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgd2tzRGVmaW5lID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpO1xudmFyIGVudW1LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzLWFycmF5Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBnT1BORXh0ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0Jyk7XG52YXIgJEdPUEQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpO1xudmFyICREUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BEID0gJEdPUEQuZjtcbnZhciBkUCA9ICREUC5mO1xudmFyIGdPUE4gPSBnT1BORXh0LmY7XG52YXIgJFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgJEpTT04gPSBnbG9iYWwuSlNPTjtcbnZhciBfc3RyaW5naWZ5ID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIEhJRERFTiA9IHdrcygnX2hpZGRlbicpO1xudmFyIFRPX1BSSU1JVElWRSA9IHdrcygndG9QcmltaXRpdmUnKTtcbnZhciBpc0VudW0gPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5Jyk7XG52YXIgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpO1xudmFyIE9QU3ltYm9scyA9IHNoYXJlZCgnb3Atc3ltYm9scycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0W1BST1RPVFlQRV07XG52YXIgVVNFX05BVElWRSA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbic7XG52YXIgUU9iamVjdCA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRQKHRoaXMsICdhJywgeyB2YWx1ZTogNyB9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uIChpdCwga2V5LCBEKSB7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZiAocHJvdG9EZXNjKSBkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmIChwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKSBkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpIHtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90bykgJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpKSB7XG4gICAgaWYgKCFELmVudW1lcmFibGUpIHtcbiAgICAgIGlmICghaGFzKGl0LCBISURERU4pKSBkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkgaXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7IGVudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpIH0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApIHtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpO1xuICB2YXIgaSA9IDA7XG4gIHZhciBsID0ga2V5cy5sZW5ndGg7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsID4gaSkgJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCkge1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSkge1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpIHtcbiAgaXQgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKSByZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYgKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSkgRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICB2YXIgbmFtZXMgPSBnT1BOKHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKSByZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgdmFyIElTX09QID0gaXQgPT09IE9iamVjdFByb3RvO1xuICB2YXIgbmFtZXMgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmIChoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpIHJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKSB0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvKSAkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZiAoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSkgdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZiAoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKSBzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXQgfSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYgKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5JykpIHtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFN5bWJvbDogJFN5bWJvbCB9KTtcblxuZm9yICh2YXIgZXM2U3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBqID0gMDsgZXM2U3ltYm9scy5sZW5ndGggPiBqOyl3a3MoZXM2U3ltYm9sc1tqKytdKTtcblxuZm9yICh2YXIgd2VsbEtub3duU3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGsgPSAwOyB3ZWxsS25vd25TeW1ib2xzLmxlbmd0aCA+IGs7KSB3a3NEZWZpbmUod2VsbEtub3duU3ltYm9sc1trKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihzeW0pIHtcbiAgICBpZiAoIWlzU3ltYm9sKHN5bSkpIHRocm93IFR5cGVFcnJvcihzeW0gKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gU3ltYm9sUmVnaXN0cnkpIGlmIChTeW1ib2xSZWdpc3RyeVtrZXldID09PSBzeW0pIHJldHVybiBrZXk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24gKCkgeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uICgpIHsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7IGE6IFMgfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KSB7XG4gICAgdmFyIGFyZ3MgPSBbaXRdO1xuICAgIHZhciBpID0gMTtcbiAgICB2YXIgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgJHJlcGxhY2VyID0gcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmICghaXNPYmplY3QocmVwbGFjZXIpICYmIGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKSByZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICBpZiAoIWlzQXJyYXkocmVwbGFjZXIpKSByZXBsYWNlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mICRyZXBsYWNlciA9PSAnZnVuY3Rpb24nKSB2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG4iLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcbiIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpO1xuIiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxudmFyIERPTUl0ZXJhYmxlcyA9ICgnQ1NTUnVsZUxpc3QsQ1NTU3R5bGVEZWNsYXJhdGlvbixDU1NWYWx1ZUxpc3QsQ2xpZW50UmVjdExpc3QsRE9NUmVjdExpc3QsRE9NU3RyaW5nTGlzdCwnICtcbiAgJ0RPTVRva2VuTGlzdCxEYXRhVHJhbnNmZXJJdGVtTGlzdCxGaWxlTGlzdCxIVE1MQWxsQ29sbGVjdGlvbixIVE1MQ29sbGVjdGlvbixIVE1MRm9ybUVsZW1lbnQsSFRNTFNlbGVjdEVsZW1lbnQsJyArXG4gICdNZWRpYUxpc3QsTWltZVR5cGVBcnJheSxOYW1lZE5vZGVNYXAsTm9kZUxpc3QsUGFpbnRSZXF1ZXN0TGlzdCxQbHVnaW4sUGx1Z2luQXJyYXksU1ZHTGVuZ3RoTGlzdCxTVkdOdW1iZXJMaXN0LCcgK1xuICAnU1ZHUGF0aFNlZ0xpc3QsU1ZHUG9pbnRMaXN0LFNWR1N0cmluZ0xpc3QsU1ZHVHJhbnNmb3JtTGlzdCxTb3VyY2VCdWZmZXJMaXN0LFN0eWxlU2hlZXRMaXN0LFRleHRUcmFja0N1ZUxpc3QsJyArXG4gICdUZXh0VHJhY2tMaXN0LFRvdWNoTGlzdCcpLnNwbGl0KCcsJyk7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgRE9NSXRlcmFibGVzLmxlbmd0aDsgaSsrKSB7XG4gIHZhciBOQU1FID0gRE9NSXRlcmFibGVzW2ldO1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXTtcbiAgdmFyIHByb3RvID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYgKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSkgaGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVtaXplKCBmbiwgb3B0aW9ucyApIHtcblx0dmFyIHNpemUgPSAwLFxuXHRcdG1heFNpemUsIGhlYWQsIHRhaWw7XG5cblx0aWYgKCBvcHRpb25zICYmIG9wdGlvbnMubWF4U2l6ZSApIHtcblx0XHRtYXhTaXplID0gb3B0aW9ucy5tYXhTaXplO1xuXHR9XG5cblx0ZnVuY3Rpb24gbWVtb2l6ZWQoIC8qIC4uLmFyZ3MgKi8gKSB7XG5cdFx0dmFyIG5vZGUgPSBoZWFkLFxuXHRcdFx0bGVuID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRcdGFyZ3MsIGk7XG5cblx0XHRzZWFyY2hDYWNoZTogd2hpbGUgKCBub2RlICkge1xuXHRcdFx0Ly8gUGVyZm9ybSBhIHNoYWxsb3cgZXF1YWxpdHkgdGVzdCB0byBjb25maXJtIHRoYXQgd2hldGhlciB0aGUgbm9kZVxuXHRcdFx0Ly8gdW5kZXIgdGVzdCBpcyBhIGNhbmRpZGF0ZSBmb3IgdGhlIGFyZ3VtZW50cyBwYXNzZWQuIFR3byBhcnJheXNcblx0XHRcdC8vIGFyZSBzaGFsbG93bHkgZXF1YWwgaWYgdGhlaXIgbGVuZ3RoIG1hdGNoZXMgYW5kIGVhY2ggZW50cnkgaXNcblx0XHRcdC8vIHN0cmljdGx5IGVxdWFsIGJldHdlZW4gdGhlIHR3byBzZXRzLiBBdm9pZCBhYnN0cmFjdGluZyB0byBhXG5cdFx0XHQvLyBmdW5jdGlvbiB3aGljaCBjb3VsZCBpbmN1ciBhbiBhcmd1bWVudHMgbGVha2luZyBkZW9wdGltaXphdGlvbi5cblxuXHRcdFx0Ly8gQ2hlY2sgd2hldGhlciBub2RlIGFyZ3VtZW50cyBtYXRjaCBhcmd1bWVudHMgbGVuZ3RoXG5cdFx0XHRpZiAoIG5vZGUuYXJncy5sZW5ndGggIT09IGFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRcdG5vZGUgPSBub2RlLm5leHQ7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDaGVjayB3aGV0aGVyIG5vZGUgYXJndW1lbnRzIG1hdGNoIGFyZ3VtZW50cyB2YWx1ZXNcblx0XHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdGlmICggbm9kZS5hcmdzWyBpIF0gIT09IGFyZ3VtZW50c1sgaSBdICkge1xuXHRcdFx0XHRcdG5vZGUgPSBub2RlLm5leHQ7XG5cdFx0XHRcdFx0Y29udGludWUgc2VhcmNoQ2FjaGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCB3ZSBjYW4gYXNzdW1lIHdlJ3ZlIGZvdW5kIGEgbWF0Y2hcblxuXHRcdFx0Ly8gU3VyZmFjZSBtYXRjaGVkIG5vZGUgdG8gaGVhZCBpZiBub3QgYWxyZWFkeVxuXHRcdFx0aWYgKCBub2RlICE9PSBoZWFkICkge1xuXHRcdFx0XHQvLyBBcyB0YWlsLCBzaGlmdCB0byBwcmV2aW91cy4gTXVzdCBvbmx5IHNoaWZ0IGlmIG5vdCBhbHNvXG5cdFx0XHRcdC8vIGhlYWQsIHNpbmNlIGlmIGJvdGggaGVhZCBhbmQgdGFpbCwgdGhlcmUgaXMgbm8gcHJldmlvdXMuXG5cdFx0XHRcdGlmICggbm9kZSA9PT0gdGFpbCApIHtcblx0XHRcdFx0XHR0YWlsID0gbm9kZS5wcmV2O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQWRqdXN0IHNpYmxpbmdzIHRvIHBvaW50IHRvIGVhY2ggb3RoZXIuIElmIG5vZGUgd2FzIHRhaWwsXG5cdFx0XHRcdC8vIHRoaXMgYWxzbyBoYW5kbGVzIG5ldyB0YWlsJ3MgZW1wdHkgYG5leHRgIGFzc2lnbm1lbnQuXG5cdFx0XHRcdG5vZGUucHJldi5uZXh0ID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRpZiAoIG5vZGUubmV4dCApIHtcblx0XHRcdFx0XHRub2RlLm5leHQucHJldiA9IG5vZGUucHJldjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG5vZGUubmV4dCA9IGhlYWQ7XG5cdFx0XHRcdG5vZGUucHJldiA9IG51bGw7XG5cdFx0XHRcdGhlYWQucHJldiA9IG5vZGU7XG5cdFx0XHRcdGhlYWQgPSBub2RlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXR1cm4gaW1tZWRpYXRlbHlcblx0XHRcdHJldHVybiBub2RlLnZhbDtcblx0XHR9XG5cblx0XHQvLyBObyBjYWNoZWQgdmFsdWUgZm91bmQuIENvbnRpbnVlIHRvIGluc2VydGlvbiBwaGFzZTpcblxuXHRcdC8vIENyZWF0ZSBhIGNvcHkgb2YgYXJndW1lbnRzIChhdm9pZCBsZWFraW5nIGRlb3B0aW1pemF0aW9uKVxuXHRcdGFyZ3MgPSBuZXcgQXJyYXkoIGxlbiApO1xuXHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRhcmdzWyBpIF0gPSBhcmd1bWVudHNbIGkgXTtcblx0XHR9XG5cblx0XHRub2RlID0ge1xuXHRcdFx0YXJnczogYXJncyxcblxuXHRcdFx0Ly8gR2VuZXJhdGUgdGhlIHJlc3VsdCBmcm9tIG9yaWdpbmFsIGZ1bmN0aW9uXG5cdFx0XHR2YWw6IGZuLmFwcGx5KCBudWxsLCBhcmdzIClcblx0XHR9O1xuXG5cdFx0Ly8gRG9uJ3QgbmVlZCB0byBjaGVjayB3aGV0aGVyIG5vZGUgaXMgYWxyZWFkeSBoZWFkLCBzaW5jZSBpdCB3b3VsZFxuXHRcdC8vIGhhdmUgYmVlbiByZXR1cm5lZCBhYm92ZSBhbHJlYWR5IGlmIGl0IHdhc1xuXG5cdFx0Ly8gU2hpZnQgZXhpc3RpbmcgaGVhZCBkb3duIGxpc3Rcblx0XHRpZiAoIGhlYWQgKSB7XG5cdFx0XHRoZWFkLnByZXYgPSBub2RlO1xuXHRcdFx0bm9kZS5uZXh0ID0gaGVhZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gSWYgbm8gaGVhZCwgZm9sbG93cyB0aGF0IHRoZXJlJ3Mgbm8gdGFpbCAoYXQgaW5pdGlhbCBvciByZXNldClcblx0XHRcdHRhaWwgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8vIFRyaW0gdGFpbCBpZiB3ZSdyZSByZWFjaGVkIG1heCBzaXplIGFuZCBhcmUgcGVuZGluZyBjYWNoZSBpbnNlcnRpb25cblx0XHRpZiAoIHNpemUgPT09IG1heFNpemUgKSB7XG5cdFx0XHR0YWlsID0gdGFpbC5wcmV2O1xuXHRcdFx0dGFpbC5uZXh0ID0gbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2l6ZSsrO1xuXHRcdH1cblxuXHRcdGhlYWQgPSBub2RlO1xuXG5cdFx0cmV0dXJuIG5vZGUudmFsO1xuXHR9XG5cblx0bWVtb2l6ZWQuY2xlYXIgPSBmdW5jdGlvbigpIHtcblx0XHRoZWFkID0gbnVsbDtcblx0XHR0YWlsID0gbnVsbDtcblx0XHRzaXplID0gMDtcblx0fTtcblxuXHRpZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcgKSB7XG5cdFx0Ly8gQ2FjaGUgaXMgbm90IGV4cG9zZWQgaW4gdGhlIHB1YmxpYyBBUEksIGJ1dCB1c2VkIGluIHRlc3RzIHRvIGVuc3VyZVxuXHRcdC8vIGV4cGVjdGVkIGxpc3QgcHJvZ3Jlc3Npb25cblx0XHRtZW1vaXplZC5nZXRDYWNoZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIFsgaGVhZCwgdGFpbCwgc2l6ZSBdO1xuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gbWVtb2l6ZWQ7XG59O1xuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uIChyb290LCBwbHVyYWxpemUpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xuICAgIC8vIE5vZGUuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBwbHVyYWxpemUoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQsIHJlZ2lzdGVycyBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcGx1cmFsaXplKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWwuXG4gICAgcm9vdC5wbHVyYWxpemUgPSBwbHVyYWxpemUoKTtcbiAgfVxufSkodGhpcywgZnVuY3Rpb24gKCkge1xuICAvLyBSdWxlIHN0b3JhZ2UgLSBwbHVyYWxpemUgYW5kIHNpbmd1bGFyaXplIG5lZWQgdG8gYmUgcnVuIHNlcXVlbnRpYWxseSxcbiAgLy8gd2hpbGUgb3RoZXIgcnVsZXMgY2FuIGJlIG9wdGltaXplZCB1c2luZyBhbiBvYmplY3QgZm9yIGluc3RhbnQgbG9va3Vwcy5cbiAgdmFyIHBsdXJhbFJ1bGVzID0gW107XG4gIHZhciBzaW5ndWxhclJ1bGVzID0gW107XG4gIHZhciB1bmNvdW50YWJsZXMgPSB7fTtcbiAgdmFyIGlycmVndWxhclBsdXJhbHMgPSB7fTtcbiAgdmFyIGlycmVndWxhclNpbmdsZXMgPSB7fTtcblxuICAvKipcbiAgICogU2FuaXRpemUgYSBwbHVyYWxpemF0aW9uIHJ1bGUgdG8gYSB1c2FibGUgcmVndWxhciBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIHsoUmVnRXhwfHN0cmluZyl9IHJ1bGVcbiAgICogQHJldHVybiB7UmVnRXhwfVxuICAgKi9cbiAgZnVuY3Rpb24gc2FuaXRpemVSdWxlIChydWxlKSB7XG4gICAgaWYgKHR5cGVvZiBydWxlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgcnVsZSArICckJywgJ2knKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcnVsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXNzIGluIGEgd29yZCB0b2tlbiB0byBwcm9kdWNlIGEgZnVuY3Rpb24gdGhhdCBjYW4gcmVwbGljYXRlIHRoZSBjYXNlIG9uXG4gICAqIGFub3RoZXIgd29yZC5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIHdvcmRcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIHRva2VuXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gcmVzdG9yZUNhc2UgKHdvcmQsIHRva2VuKSB7XG4gICAgLy8gVG9rZW5zIGFyZSBhbiBleGFjdCBtYXRjaC5cbiAgICBpZiAod29yZCA9PT0gdG9rZW4pIHJldHVybiB0b2tlbjtcblxuICAgIC8vIFVwcGVyIGNhc2VkIHdvcmRzLiBFLmcuIFwiSEVMTE9cIi5cbiAgICBpZiAod29yZCA9PT0gd29yZC50b1VwcGVyQ2FzZSgpKSByZXR1cm4gdG9rZW4udG9VcHBlckNhc2UoKTtcblxuICAgIC8vIFRpdGxlIGNhc2VkIHdvcmRzLiBFLmcuIFwiVGl0bGVcIi5cbiAgICBpZiAod29yZFswXSA9PT0gd29yZFswXS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICByZXR1cm4gdG9rZW4uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0b2tlbi5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICAvLyBMb3dlciBjYXNlZCB3b3Jkcy4gRS5nLiBcInRlc3RcIi5cbiAgICByZXR1cm4gdG9rZW4udG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcnBvbGF0ZSBhIHJlZ2V4cCBzdHJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gc3RyXG4gICAqIEBwYXJhbSAge0FycmF5fSAgYXJnc1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBpbnRlcnBvbGF0ZSAoc3RyLCBhcmdzKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXCQoXFxkezEsMn0pL2csIGZ1bmN0aW9uIChtYXRjaCwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBhcmdzW2luZGV4XSB8fCAnJztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIGEgd29yZCB1c2luZyBhIHJ1bGUuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gd29yZFxuICAgKiBAcGFyYW0gIHtBcnJheX0gIHJ1bGVcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZSAod29yZCwgcnVsZSkge1xuICAgIHJldHVybiB3b3JkLnJlcGxhY2UocnVsZVswXSwgZnVuY3Rpb24gKG1hdGNoLCBpbmRleCkge1xuICAgICAgdmFyIHJlc3VsdCA9IGludGVycG9sYXRlKHJ1bGVbMV0sIGFyZ3VtZW50cyk7XG5cbiAgICAgIGlmIChtYXRjaCA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKHdvcmRbaW5kZXggLSAxXSwgcmVzdWx0KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKG1hdGNoLCByZXN1bHQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhbml0aXplIGEgd29yZCBieSBwYXNzaW5nIGluIHRoZSB3b3JkIGFuZCBzYW5pdGl6YXRpb24gcnVsZXMuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB0b2tlblxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgd29yZFxuICAgKiBAcGFyYW0gIHtBcnJheX0gICAgcnVsZXNcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gc2FuaXRpemVXb3JkICh0b2tlbiwgd29yZCwgcnVsZXMpIHtcbiAgICAvLyBFbXB0eSBzdHJpbmcgb3IgZG9lc24ndCBuZWVkIGZpeGluZy5cbiAgICBpZiAoIXRva2VuLmxlbmd0aCB8fCB1bmNvdW50YWJsZXMuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgICByZXR1cm4gd29yZDtcbiAgICB9XG5cbiAgICB2YXIgbGVuID0gcnVsZXMubGVuZ3RoO1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBzYW5pdGl6YXRpb24gcnVsZXMgYW5kIHVzZSB0aGUgZmlyc3Qgb25lIHRvIG1hdGNoLlxuICAgIHdoaWxlIChsZW4tLSkge1xuICAgICAgdmFyIHJ1bGUgPSBydWxlc1tsZW5dO1xuXG4gICAgICBpZiAocnVsZVswXS50ZXN0KHdvcmQpKSByZXR1cm4gcmVwbGFjZSh3b3JkLCBydWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd29yZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIGEgd29yZCB3aXRoIHRoZSB1cGRhdGVkIHdvcmQuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gICByZXBsYWNlTWFwXG4gICAqIEBwYXJhbSAge09iamVjdH0gICBrZWVwTWFwXG4gICAqIEBwYXJhbSAge0FycmF5fSAgICBydWxlc1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIHJlcGxhY2VXb3JkIChyZXBsYWNlTWFwLCBrZWVwTWFwLCBydWxlcykge1xuICAgIHJldHVybiBmdW5jdGlvbiAod29yZCkge1xuICAgICAgLy8gR2V0IHRoZSBjb3JyZWN0IHRva2VuIGFuZCBjYXNlIHJlc3RvcmF0aW9uIGZ1bmN0aW9ucy5cbiAgICAgIHZhciB0b2tlbiA9IHdvcmQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgLy8gQ2hlY2sgYWdhaW5zdCB0aGUga2VlcCBvYmplY3QgbWFwLlxuICAgICAgaWYgKGtlZXBNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3JkLCB0b2tlbik7XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIGFnYWluc3QgdGhlIHJlcGxhY2VtZW50IG1hcCBmb3IgYSBkaXJlY3Qgd29yZCByZXBsYWNlbWVudC5cbiAgICAgIGlmIChyZXBsYWNlTWFwLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2Uod29yZCwgcmVwbGFjZU1hcFt0b2tlbl0pO1xuICAgICAgfVxuXG4gICAgICAvLyBSdW4gYWxsIHRoZSBydWxlcyBhZ2FpbnN0IHRoZSB3b3JkLlxuICAgICAgcmV0dXJuIHNhbml0aXplV29yZCh0b2tlbiwgd29yZCwgcnVsZXMpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB3b3JkIGlzIHBhcnQgb2YgdGhlIG1hcC5cbiAgICovXG4gIGZ1bmN0aW9uIGNoZWNrV29yZCAocmVwbGFjZU1hcCwga2VlcE1hcCwgcnVsZXMsIGJvb2wpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHdvcmQpIHtcbiAgICAgIHZhciB0b2tlbiA9IHdvcmQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgaWYgKGtlZXBNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGlmIChyZXBsYWNlTWFwLmhhc093blByb3BlcnR5KHRva2VuKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICByZXR1cm4gc2FuaXRpemVXb3JkKHRva2VuLCB0b2tlbiwgcnVsZXMpID09PSB0b2tlbjtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFBsdXJhbGl6ZSBvciBzaW5ndWxhcml6ZSBhIHdvcmQgYmFzZWQgb24gdGhlIHBhc3NlZCBpbiBjb3VudC5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgd29yZFxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBjb3VudFxuICAgKiBAcGFyYW0gIHtib29sZWFufSBpbmNsdXNpdmVcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gcGx1cmFsaXplICh3b3JkLCBjb3VudCwgaW5jbHVzaXZlKSB7XG4gICAgdmFyIHBsdXJhbGl6ZWQgPSBjb3VudCA9PT0gMVxuICAgICAgPyBwbHVyYWxpemUuc2luZ3VsYXIod29yZCkgOiBwbHVyYWxpemUucGx1cmFsKHdvcmQpO1xuXG4gICAgcmV0dXJuIChpbmNsdXNpdmUgPyBjb3VudCArICcgJyA6ICcnKSArIHBsdXJhbGl6ZWQ7XG4gIH1cblxuICAvKipcbiAgICogUGx1cmFsaXplIGEgd29yZC5cbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgcGx1cmFsaXplLnBsdXJhbCA9IHJlcGxhY2VXb3JkKFxuICAgIGlycmVndWxhclNpbmdsZXMsIGlycmVndWxhclBsdXJhbHMsIHBsdXJhbFJ1bGVzXG4gICk7XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgd29yZCBpcyBwbHVyYWwuXG4gICAqXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIHBsdXJhbGl6ZS5pc1BsdXJhbCA9IGNoZWNrV29yZChcbiAgICBpcnJlZ3VsYXJTaW5nbGVzLCBpcnJlZ3VsYXJQbHVyYWxzLCBwbHVyYWxSdWxlc1xuICApO1xuXG4gIC8qKlxuICAgKiBTaW5ndWxhcml6ZSBhIHdvcmQuXG4gICAqXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIHBsdXJhbGl6ZS5zaW5ndWxhciA9IHJlcGxhY2VXb3JkKFxuICAgIGlycmVndWxhclBsdXJhbHMsIGlycmVndWxhclNpbmdsZXMsIHNpbmd1bGFyUnVsZXNcbiAgKTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB3b3JkIGlzIHNpbmd1bGFyLlxuICAgKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBwbHVyYWxpemUuaXNTaW5ndWxhciA9IGNoZWNrV29yZChcbiAgICBpcnJlZ3VsYXJQbHVyYWxzLCBpcnJlZ3VsYXJTaW5nbGVzLCBzaW5ndWxhclJ1bGVzXG4gICk7XG5cbiAgLyoqXG4gICAqIEFkZCBhIHBsdXJhbGl6YXRpb24gcnVsZSB0byB0aGUgY29sbGVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cCl9IHJ1bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgIHJlcGxhY2VtZW50XG4gICAqL1xuICBwbHVyYWxpemUuYWRkUGx1cmFsUnVsZSA9IGZ1bmN0aW9uIChydWxlLCByZXBsYWNlbWVudCkge1xuICAgIHBsdXJhbFJ1bGVzLnB1c2goW3Nhbml0aXplUnVsZShydWxlKSwgcmVwbGFjZW1lbnRdKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGEgc2luZ3VsYXJpemF0aW9uIHJ1bGUgdG8gdGhlIGNvbGxlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHApfSBydWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICByZXBsYWNlbWVudFxuICAgKi9cbiAgcGx1cmFsaXplLmFkZFNpbmd1bGFyUnVsZSA9IGZ1bmN0aW9uIChydWxlLCByZXBsYWNlbWVudCkge1xuICAgIHNpbmd1bGFyUnVsZXMucHVzaChbc2FuaXRpemVSdWxlKHJ1bGUpLCByZXBsYWNlbWVudF0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gdW5jb3VudGFibGUgd29yZCBydWxlLlxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwKX0gd29yZFxuICAgKi9cbiAgcGx1cmFsaXplLmFkZFVuY291bnRhYmxlUnVsZSA9IGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgaWYgKHR5cGVvZiB3b3JkID09PSAnc3RyaW5nJykge1xuICAgICAgdW5jb3VudGFibGVzW3dvcmQudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNldCBzaW5ndWxhciBhbmQgcGx1cmFsIHJlZmVyZW5jZXMgZm9yIHRoZSB3b3JkLlxuICAgIHBsdXJhbGl6ZS5hZGRQbHVyYWxSdWxlKHdvcmQsICckMCcpO1xuICAgIHBsdXJhbGl6ZS5hZGRTaW5ndWxhclJ1bGUod29yZCwgJyQwJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBpcnJlZ3VsYXIgd29yZCBkZWZpbml0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2luZ2xlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwbHVyYWxcbiAgICovXG4gIHBsdXJhbGl6ZS5hZGRJcnJlZ3VsYXJSdWxlID0gZnVuY3Rpb24gKHNpbmdsZSwgcGx1cmFsKSB7XG4gICAgcGx1cmFsID0gcGx1cmFsLnRvTG93ZXJDYXNlKCk7XG4gICAgc2luZ2xlID0gc2luZ2xlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpcnJlZ3VsYXJTaW5nbGVzW3NpbmdsZV0gPSBwbHVyYWw7XG4gICAgaXJyZWd1bGFyUGx1cmFsc1twbHVyYWxdID0gc2luZ2xlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcnJlZ3VsYXIgcnVsZXMuXG4gICAqL1xuICBbXG4gICAgLy8gUHJvbm91bnMuXG4gICAgWydJJywgJ3dlJ10sXG4gICAgWydtZScsICd1cyddLFxuICAgIFsnaGUnLCAndGhleSddLFxuICAgIFsnc2hlJywgJ3RoZXknXSxcbiAgICBbJ3RoZW0nLCAndGhlbSddLFxuICAgIFsnbXlzZWxmJywgJ291cnNlbHZlcyddLFxuICAgIFsneW91cnNlbGYnLCAneW91cnNlbHZlcyddLFxuICAgIFsnaXRzZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgICBbJ2hlcnNlbGYnLCAndGhlbXNlbHZlcyddLFxuICAgIFsnaGltc2VsZicsICd0aGVtc2VsdmVzJ10sXG4gICAgWyd0aGVtc2VsZicsICd0aGVtc2VsdmVzJ10sXG4gICAgWydpcycsICdhcmUnXSxcbiAgICBbJ3dhcycsICd3ZXJlJ10sXG4gICAgWydoYXMnLCAnaGF2ZSddLFxuICAgIFsndGhpcycsICd0aGVzZSddLFxuICAgIFsndGhhdCcsICd0aG9zZSddLFxuICAgIC8vIFdvcmRzIGVuZGluZyBpbiB3aXRoIGEgY29uc29uYW50IGFuZCBgb2AuXG4gICAgWydlY2hvJywgJ2VjaG9lcyddLFxuICAgIFsnZGluZ28nLCAnZGluZ29lcyddLFxuICAgIFsndm9sY2FubycsICd2b2xjYW5vZXMnXSxcbiAgICBbJ3Rvcm5hZG8nLCAndG9ybmFkb2VzJ10sXG4gICAgWyd0b3JwZWRvJywgJ3RvcnBlZG9lcyddLFxuICAgIC8vIEVuZHMgd2l0aCBgdXNgLlxuICAgIFsnZ2VudXMnLCAnZ2VuZXJhJ10sXG4gICAgWyd2aXNjdXMnLCAndmlzY2VyYSddLFxuICAgIC8vIEVuZHMgd2l0aCBgbWFgLlxuICAgIFsnc3RpZ21hJywgJ3N0aWdtYXRhJ10sXG4gICAgWydzdG9tYScsICdzdG9tYXRhJ10sXG4gICAgWydkb2dtYScsICdkb2dtYXRhJ10sXG4gICAgWydsZW1tYScsICdsZW1tYXRhJ10sXG4gICAgWydzY2hlbWEnLCAnc2NoZW1hdGEnXSxcbiAgICBbJ2FuYXRoZW1hJywgJ2FuYXRoZW1hdGEnXSxcbiAgICAvLyBPdGhlciBpcnJlZ3VsYXIgcnVsZXMuXG4gICAgWydveCcsICdveGVuJ10sXG4gICAgWydheGUnLCAnYXhlcyddLFxuICAgIFsnZGllJywgJ2RpY2UnXSxcbiAgICBbJ3llcycsICd5ZXNlcyddLFxuICAgIFsnZm9vdCcsICdmZWV0J10sXG4gICAgWydlYXZlJywgJ2VhdmVzJ10sXG4gICAgWydnb29zZScsICdnZWVzZSddLFxuICAgIFsndG9vdGgnLCAndGVldGgnXSxcbiAgICBbJ3F1aXonLCAncXVpenplcyddLFxuICAgIFsnaHVtYW4nLCAnaHVtYW5zJ10sXG4gICAgWydwcm9vZicsICdwcm9vZnMnXSxcbiAgICBbJ2NhcnZlJywgJ2NhcnZlcyddLFxuICAgIFsndmFsdmUnLCAndmFsdmVzJ10sXG4gICAgWydsb29leScsICdsb29pZXMnXSxcbiAgICBbJ3RoaWVmJywgJ3RoaWV2ZXMnXSxcbiAgICBbJ2dyb292ZScsICdncm9vdmVzJ10sXG4gICAgWydwaWNrYXhlJywgJ3BpY2theGVzJ10sXG4gICAgWyd3aGlza2V5JywgJ3doaXNraWVzJ11cbiAgXS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgcmV0dXJuIHBsdXJhbGl6ZS5hZGRJcnJlZ3VsYXJSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xuICB9KTtcblxuICAvKipcbiAgICogUGx1cmFsaXphdGlvbiBydWxlcy5cbiAgICovXG4gIFtcbiAgICBbL3M/JC9pLCAncyddLFxuICAgIFsvW15cXHUwMDAwLVxcdTAwN0ZdJC9pLCAnJDAnXSxcbiAgICBbLyhbXmFlaW91XWVzZSkkL2ksICckMSddLFxuICAgIFsvKGF4fHRlc3QpaXMkL2ksICckMWVzJ10sXG4gICAgWy8oYWxpYXN8W15hb3VddXN8dGxhc3xnYXN8cmlzKSQvaSwgJyQxZXMnXSxcbiAgICBbLyhlW21uXXUpcz8kL2ksICckMXMnXSxcbiAgICBbLyhbXmxdaWFzfFthZWlvdV1sYXN8W2VtanpyXWFzfFtpdV1hbSkkL2ksICckMSddLFxuICAgIFsvKGFsdW1ufHN5bGxhYnxvY3RvcHx2aXJ8cmFkaXxudWNsZXxmdW5nfGNhY3R8c3RpbXVsfHRlcm1pbnxiYWNpbGx8Zm9jfHV0ZXJ8bG9jfHN0cmF0KSg/OnVzfGkpJC9pLCAnJDFpJ10sXG4gICAgWy8oYWx1bW58YWxnfHZlcnRlYnIpKD86YXxhZSkkL2ksICckMWFlJ10sXG4gICAgWy8oc2VyYXBofGNoZXJ1YikoPzppbSk/JC9pLCAnJDFpbSddLFxuICAgIFsvKGhlcnxhdHxncilvJC9pLCAnJDFvZXMnXSxcbiAgICBbLyhhZ2VuZHxhZGRlbmR8bWlsbGVubml8ZGF0fGV4dHJlbXxiYWN0ZXJpfGRlc2lkZXJhdHxzdHJhdHxjYW5kZWxhYnJ8ZXJyYXR8b3Z8c3ltcG9zaXxjdXJyaWN1bHxhdXRvbWF0fHF1b3IpKD86YXx1bSkkL2ksICckMWEnXSxcbiAgICBbLyhhcGhlbGl8aHlwZXJiYXR8cGVyaWhlbGl8YXN5bmRldHxub3VtZW58cGhlbm9tZW58Y3JpdGVyaXxvcmdhbnxwcm9sZWdvbWVufGhlZHJ8YXV0b21hdCkoPzphfG9uKSQvaSwgJyQxYSddLFxuICAgIFsvc2lzJC9pLCAnc2VzJ10sXG4gICAgWy8oPzooa25pfHdpfGxpKWZlfChhcnxsfGVhfGVvfG9hfGhvbylmKSQvaSwgJyQxJDJ2ZXMnXSxcbiAgICBbLyhbXmFlaW91eV18cXUpeSQvaSwgJyQxaWVzJ10sXG4gICAgWy8oW15jaF1baWVvXVtsbl0pZXkkL2ksICckMWllcyddLFxuICAgIFsvKHh8Y2h8c3N8c2h8enopJC9pLCAnJDFlcyddLFxuICAgIFsvKG1hdHJ8Y29kfG11cnxzaWx8dmVydHxpbmR8YXBwZW5kKSg/Oml4fGV4KSQvaSwgJyQxaWNlcyddLFxuICAgIFsvKG18bCkoPzppY2V8b3VzZSkkL2ksICckMWljZSddLFxuICAgIFsvKHBlKSg/OnJzb258b3BsZSkkL2ksICckMW9wbGUnXSxcbiAgICBbLyhjaGlsZCkoPzpyZW4pPyQvaSwgJyQxcmVuJ10sXG4gICAgWy9lYXV4JC9pLCAnJDAnXSxcbiAgICBbL21bYWVdbiQvaSwgJ21lbiddLFxuICAgIFsndGhvdScsICd5b3UnXVxuICBdLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICByZXR1cm4gcGx1cmFsaXplLmFkZFBsdXJhbFJ1bGUocnVsZVswXSwgcnVsZVsxXSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBTaW5ndWxhcml6YXRpb24gcnVsZXMuXG4gICAqL1xuICBbXG4gICAgWy9zJC9pLCAnJ10sXG4gICAgWy8oc3MpJC9pLCAnJDEnXSxcbiAgICBbLyh3aXxrbml8KD86YWZ0ZXJ8aGFsZnxoaWdofGxvd3xtaWR8bm9ufG5pZ2h0fFteXFx3XXxeKWxpKXZlcyQvaSwgJyQxZmUnXSxcbiAgICBbLyhhcnwoPzp3b3xbYWVdKWx8W2VvXVthb10pdmVzJC9pLCAnJDFmJ10sXG4gICAgWy9pZXMkL2ksICd5J10sXG4gICAgWy9cXGIoW3BsXXx6b21ifCg/Om5lY2t8Y3Jvc3MpP3R8Y29sbHxmYWVyfGZvb2R8Z2VufGdvb258Z3JvdXB8bGFzc3x0YWxrfGdvYWx8Y3V0KWllcyQvaSwgJyQxaWUnXSxcbiAgICBbL1xcYihtb258c21pbClpZXMkL2ksICckMWV5J10sXG4gICAgWy8obXxsKWljZSQvaSwgJyQxb3VzZSddLFxuICAgIFsvKHNlcmFwaHxjaGVydWIpaW0kL2ksICckMSddLFxuICAgIFsvKHh8Y2h8c3N8c2h8enp8dHRvfGdvfGNob3xhbGlhc3xbXmFvdV11c3x0bGFzfGdhc3woPzpoZXJ8YXR8Z3Ipb3xyaXMpKD86ZXMpPyQvaSwgJyQxJ10sXG4gICAgWy8oYW5hbHl8YmF8ZGlhZ25vfHBhcmVudGhlfHByb2dub3xzeW5vcHx0aGV8ZW1waGF8Y3JpKSg/OnNpc3xzZXMpJC9pLCAnJDFzaXMnXSxcbiAgICBbLyhtb3ZpZXx0d2VsdmV8YWJ1c2V8ZVttbl11KXMkL2ksICckMSddLFxuICAgIFsvKHRlc3QpKD86aXN8ZXMpJC9pLCAnJDFpcyddLFxuICAgIFsvKGFsdW1ufHN5bGxhYnxvY3RvcHx2aXJ8cmFkaXxudWNsZXxmdW5nfGNhY3R8c3RpbXVsfHRlcm1pbnxiYWNpbGx8Zm9jfHV0ZXJ8bG9jfHN0cmF0KSg/OnVzfGkpJC9pLCAnJDF1cyddLFxuICAgIFsvKGFnZW5kfGFkZGVuZHxtaWxsZW5uaXxkYXR8ZXh0cmVtfGJhY3Rlcml8ZGVzaWRlcmF0fHN0cmF0fGNhbmRlbGFicnxlcnJhdHxvdnxzeW1wb3NpfGN1cnJpY3VsfHF1b3IpYSQvaSwgJyQxdW0nXSxcbiAgICBbLyhhcGhlbGl8aHlwZXJiYXR8cGVyaWhlbGl8YXN5bmRldHxub3VtZW58cGhlbm9tZW58Y3JpdGVyaXxvcmdhbnxwcm9sZWdvbWVufGhlZHJ8YXV0b21hdClhJC9pLCAnJDFvbiddLFxuICAgIFsvKGFsdW1ufGFsZ3x2ZXJ0ZWJyKWFlJC9pLCAnJDFhJ10sXG4gICAgWy8oY29kfG11cnxzaWx8dmVydHxpbmQpaWNlcyQvaSwgJyQxZXgnXSxcbiAgICBbLyhtYXRyfGFwcGVuZClpY2VzJC9pLCAnJDFpeCddLFxuICAgIFsvKHBlKShyc29ufG9wbGUpJC9pLCAnJDFyc29uJ10sXG4gICAgWy8oY2hpbGQpcmVuJC9pLCAnJDEnXSxcbiAgICBbLyhlYXUpeD8kL2ksICckMSddLFxuICAgIFsvbWVuJC9pLCAnbWFuJ11cbiAgXS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgcmV0dXJuIHBsdXJhbGl6ZS5hZGRTaW5ndWxhclJ1bGUocnVsZVswXSwgcnVsZVsxXSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBVbmNvdW50YWJsZSBydWxlcy5cbiAgICovXG4gIFtcbiAgICAvLyBTaW5ndWxhciB3b3JkcyB3aXRoIG5vIHBsdXJhbHMuXG4gICAgJ2FkdWx0aG9vZCcsXG4gICAgJ2FkdmljZScsXG4gICAgJ2FnZW5kYScsXG4gICAgJ2FpZCcsXG4gICAgJ2FsY29ob2wnLFxuICAgICdhbW1vJyxcbiAgICAnYW5pbWUnLFxuICAgICdhdGhsZXRpY3MnLFxuICAgICdhdWRpbycsXG4gICAgJ2Jpc29uJyxcbiAgICAnYmxvb2QnLFxuICAgICdicmVhbScsXG4gICAgJ2J1ZmZhbG8nLFxuICAgICdidXR0ZXInLFxuICAgICdjYXJwJyxcbiAgICAnY2FzaCcsXG4gICAgJ2NoYXNzaXMnLFxuICAgICdjaGVzcycsXG4gICAgJ2Nsb3RoaW5nJyxcbiAgICAnY29kJyxcbiAgICAnY29tbWVyY2UnLFxuICAgICdjb29wZXJhdGlvbicsXG4gICAgJ2NvcnBzJyxcbiAgICAnZGVicmlzJyxcbiAgICAnZGlhYmV0ZXMnLFxuICAgICdkaWdlc3Rpb24nLFxuICAgICdlbGsnLFxuICAgICdlbmVyZ3knLFxuICAgICdlcXVpcG1lbnQnLFxuICAgICdleGNyZXRpb24nLFxuICAgICdleHBlcnRpc2UnLFxuICAgICdmbG91bmRlcicsXG4gICAgJ2Z1bicsXG4gICAgJ2dhbGxvd3MnLFxuICAgICdnYXJiYWdlJyxcbiAgICAnZ3JhZmZpdGknLFxuICAgICdoZWFkcXVhcnRlcnMnLFxuICAgICdoZWFsdGgnLFxuICAgICdoZXJwZXMnLFxuICAgICdoaWdoamlua3MnLFxuICAgICdob21ld29yaycsXG4gICAgJ2hvdXNld29yaycsXG4gICAgJ2luZm9ybWF0aW9uJyxcbiAgICAnamVhbnMnLFxuICAgICdqdXN0aWNlJyxcbiAgICAna3Vkb3MnLFxuICAgICdsYWJvdXInLFxuICAgICdsaXRlcmF0dXJlJyxcbiAgICAnbWFjaGluZXJ5JyxcbiAgICAnbWFja2VyZWwnLFxuICAgICdtYWlsJyxcbiAgICAnbWVkaWEnLFxuICAgICdtZXdzJyxcbiAgICAnbW9vc2UnLFxuICAgICdtdXNpYycsXG4gICAgJ21hbmdhJyxcbiAgICAnbmV3cycsXG4gICAgJ3Bpa2UnLFxuICAgICdwbGFua3RvbicsXG4gICAgJ3BsaWVycycsXG4gICAgJ3BvbGx1dGlvbicsXG4gICAgJ3ByZW1pc2VzJyxcbiAgICAncmFpbicsXG4gICAgJ3Jlc2VhcmNoJyxcbiAgICAncmljZScsXG4gICAgJ3NhbG1vbicsXG4gICAgJ3NjaXNzb3JzJyxcbiAgICAnc2VyaWVzJyxcbiAgICAnc2V3YWdlJyxcbiAgICAnc2hhbWJsZXMnLFxuICAgICdzaHJpbXAnLFxuICAgICdzcGVjaWVzJyxcbiAgICAnc3RhZmYnLFxuICAgICdzd2luZScsXG4gICAgJ3Rlbm5pcycsXG4gICAgJ3RyYWZmaWMnLFxuICAgICd0cmFuc3BvcmF0aW9uJyxcbiAgICAndHJvdXQnLFxuICAgICd0dW5hJyxcbiAgICAnd2VhbHRoJyxcbiAgICAnd2VsZmFyZScsXG4gICAgJ3doaXRpbmcnLFxuICAgICd3aWxkZWJlZXN0JyxcbiAgICAnd2lsZGxpZmUnLFxuICAgICd5b3UnLFxuICAgIC8vIFJlZ2V4ZXMuXG4gICAgL1teYWVpb3VdZXNlJC9pLCAvLyBcImNoaW5lc2VcIiwgXCJqYXBhbmVzZVwiXG4gICAgL2RlZXIkL2ksIC8vIFwiZGVlclwiLCBcInJlaW5kZWVyXCJcbiAgICAvZmlzaCQvaSwgLy8gXCJmaXNoXCIsIFwiYmxvd2Zpc2hcIiwgXCJhbmdlbGZpc2hcIlxuICAgIC9tZWFzbGVzJC9pLFxuICAgIC9vW2l1XXMkL2ksIC8vIFwiY2Fybml2b3JvdXNcIlxuICAgIC9wb3gkL2ksIC8vIFwiY2hpY2twb3hcIiwgXCJzbWFsbHBveFwiXG4gICAgL3NoZWVwJC9pXG4gIF0uZm9yRWFjaChwbHVyYWxpemUuYWRkVW5jb3VudGFibGVSdWxlKTtcblxuICByZXR1cm4gcGx1cmFsaXplO1xufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcblxuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAodHlwZVNwZWNzLmhhc093blByb3BlcnR5KHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIGVyciA9IEVycm9yKFxuICAgICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6ICcgKyBsb2NhdGlvbiArICcgdHlwZSBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7ICcgK1xuICAgICAgICAgICAgICAnaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCcgKyB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gKyAnYC4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgJiYgIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICcgK1xuICAgICAgICAgICAgbG9jYXRpb24gKyAnIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAnICsgdHlwZW9mIGVycm9yICsgJy4gJyArXG4gICAgICAgICAgICAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICtcbiAgICAgICAgICAgICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJ1xuICAgICAgICAgIClcblxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnRmFpbGVkICcgKyBsb2NhdGlvbiArICcgdHlwZTogJyArIGVycm9yLm1lc3NhZ2UgKyAoc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuZnVuY3Rpb24gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIsXG4gICAgZXhhY3Q6IGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIsXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJyArIHByb3BGdWxsTmFtZSArICdgIHByb3Agb24gYCcgKyBjb21wb25lbnROYW1lICArICdgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAnICsgZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKGNoZWNrZXIpICsgJyBhdCBpbmRleCAnICsgaSArICcuJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9ICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmXG4gICAgU3ltYm9sLmZvciAmJlxuICAgIFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSkgfHxcbiAgICAweGVhYzc7XG5cbiAgdmFyIGlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICBvYmplY3QgIT09IG51bGwgJiZcbiAgICAgIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xuICB9O1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBlZWpzOyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy5oZWxwZXJzOyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy5pMThuOyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy52YWxpZGF0b3JzOyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy52YWx1ZU9iamVjdHM7IiwibW9kdWxlLmV4cG9ydHMgPSB3cC5ob29rczsiLCJtb2R1bGUuZXhwb3J0cyA9IGVlanMudmVuZG9yLmN1aWQ7IiwibW9kdWxlLmV4cG9ydHMgPSBsb2Rhc2g7IiwibW9kdWxlLmV4cG9ydHMgPSBlZWpzLnZlbmRvci5tb21lbnQ7Il0sInNvdXJjZVJvb3QiOiIifQ==
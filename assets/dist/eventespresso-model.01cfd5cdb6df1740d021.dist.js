this["eejs"] = this["eejs"] || {}; this["eejs"]["model"] =
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
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");
/* harmony import */ var _registration_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../registration/constants */ "./assets/src/data/model/registration/constants.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  queryData = _objectSpread({}, defaultQueryData.queryData, {}, queryData);
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
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/helpers */ "@eventespresso/helpers");
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

  var newEntity = _objectSpread({}, entity);

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

  var newEntity = _objectSpread({}, entity);

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
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../status */ "./assets/src/data/model/status/index.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/checkin/constants.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  queryData = _objectSpread({}, defaultQueryData.queryData, {}, queryData);
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
/*! exports provided: MODEL_NAME, DATETIME_STATUS_ID, DATETIME_STATUS_IDS, MINUTE_IN_SECONDS, HOUR_IN_SECONDS, DAY_IN_SECONDS, WEEK_IN_SECONDS, MONTH_IN_SECONDS, nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString, DATE_FIELDS, prettyDateFromDateTime, isActive, isExpired, isRecentlyExpired, isSoldOut, isUpcoming, isTrashed, status, getBackgroundColorClass, getDateTimeStatusTextLabel */
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

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getBackgroundColorClass", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_3__["getBackgroundColorClass"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDateTimeStatusTextLabel", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_3__["getDateTimeStatusTextLabel"]; });






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
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  queryData = _objectSpread({}, defaultQueryData.queryData, {}, queryData);
  return Object(_base__WEBPACK_IMPORTED_MODULE_4__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/datetime/status-helper.js":
/*!*********************************************************!*\
  !*** ./assets/src/data/model/datetime/status-helper.js ***!
  \*********************************************************/
/*! exports provided: isActive, isExpired, isRecentlyExpired, isSoldOut, isUpcoming, isTrashed, status, getBackgroundColorClass, getDateTimeStatusTextLabel */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBackgroundColorClass", function() { return getBackgroundColorClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDateTimeStatusTextLabel", function() { return getDateTimeStatusTextLabel; });
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/datetime/constants.js");
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
  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntityOfModel"])(DateTimeEntity, _constants__WEBPACK_IMPORTED_MODULE_2__["MODEL_NAME"])) {
    throw new TypeError('The provided entity is not a datetime instance');
  }
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if event date is valid entity or archive
 */


var isValidEntityOrArchive = function isValidEntityOrArchive(DateTimeEntity, includeTrashed) {
  return includeTrashed && assertDateTimeEntity(DateTimeEntity) || !includeTrashed && !isTrashed(DateTimeEntity);
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if event date is occurring NOW
 */


var isActive = function isActive(DateTimeEntity) {
  var includeTrashed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return isValidEntityOrArchive(DateTimeEntity, includeTrashed) && DateTimeEntity.start.diffNow().asSeconds() < 0 && DateTimeEntity.end.diffNow().asSeconds() > 0;
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if end date is in the past
 */

var isExpired = function isExpired(DateTimeEntity) {
  var includeTrashed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return isValidEntityOrArchive(DateTimeEntity, includeTrashed) && DateTimeEntity.end.diffNow().asSeconds() < 0;
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if end date is in the past
 */

var isRecentlyExpired = function isRecentlyExpired(DateTimeEntity) {
  var includeTrashed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return isValidEntityOrArchive(DateTimeEntity, includeTrashed) && DateTimeEntity.end.diffNow().asSeconds() < 0 && DateTimeEntity.end.diffNow().asSeconds() > _constants__WEBPACK_IMPORTED_MODULE_2__["MONTH_IN_SECONDS"] * -1;
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if tickets sold meets or exceeds registration limit
 */

var isSoldOut = function isSoldOut(DateTimeEntity) {
  var includeTrashed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (includeTrashed && !assertDateTimeEntity(DateTimeEntity) || !includeTrashed && isTrashed(DateTimeEntity)) {
    return false;
  }

  var cap = DateTimeEntity.regLimit;
  return cap !== null && cap !== 'INF' && cap !== Infinity && cap !== -1 && DateTimeEntity.sold >= cap;
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if start date is in the future
 */

var isUpcoming = function isUpcoming(DateTimeEntity) {
  var includeTrashed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return isValidEntityOrArchive(DateTimeEntity, includeTrashed) && DateTimeEntity.start.diffNow().asSeconds() > 0;
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if date is archived
 */

var isTrashed = function isTrashed(DateTimeEntity) {
  assertDateTimeEntity(DateTimeEntity);
  return DateTimeEntity.deleted;
}; // PLZ NOTE:
// leaving the following code in because it can be used if/when we decide
// to fully support these datetime statuses which are currently defined
// on the EE_Datetime model object class but not yet used
// /**
//  * @function
//  * @param {Object} DateTimeEntity model object
//  * @return {boolean} true if date is cancelled
//  */
// export const isCancelled = ( DateTimeEntity ) => {
// 	assertDateTimeEntity( DateTimeEntity );
// 	return DateTimeEntity.cancelled;
// };
//
// /**
//  * @function
//  * @param {Object} DateTimeEntity model object
//  * @return {boolean} true if date has been postponed
//  */
// export const isPostponed = ( DateTimeEntity ) => {
// 	assertDateTimeEntity( DateTimeEntity );
// 	return DateTimeEntity.postponed;
// };

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {string} status ID
 */

var status = function status(DateTimeEntity) {
  if (isTrashed(DateTimeEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["DATETIME_STATUS_ID"].TRASHED;
  }

  if (isExpired(DateTimeEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["DATETIME_STATUS_ID"].EXPIRED;
  }

  if (isSoldOut(DateTimeEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["DATETIME_STATUS_ID"].SOLD_OUT;
  }

  if (isUpcoming(DateTimeEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["DATETIME_STATUS_ID"].UPCOMING;
  }

  if (isActive(DateTimeEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["DATETIME_STATUS_ID"].ACTIVE;
  } // PLZ SEE NOTE ABOVE
  // if ( isCancelled( DateTimeEntity ) ) {
  // 	return DATETIME_STATUS_ID.CANCELLED;
  // }
  // if ( isPostponed( DateTimeEntity ) ) {
  // 	return DATETIME_STATUS_ID.POSTPONED;
  // }


  assertDateTimeEntity(DateTimeEntity);
  return _constants__WEBPACK_IMPORTED_MODULE_2__["DATETIME_STATUS_ID"].INACTIVE;
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {string}    CSS class for the background color
 */

var getBackgroundColorClass = function getBackgroundColorClass(DateTimeEntity) {
  return "ee-status-background-color-".concat(status(DateTimeEntity));
};
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {string} date status
 */

var getDateTimeStatusTextLabel = function getDateTimeStatusTextLabel(DateTimeEntity) {
  var dateStatus = '';

  switch (status(DateTimeEntity)) {
    case _constants__WEBPACK_IMPORTED_MODULE_2__["DATETIME_STATUS_ID"].SOLD_OUT:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('sold out', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_2__["DATETIME_STATUS_ID"].EXPIRED:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('expired', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_2__["DATETIME_STATUS_ID"].UPCOMING:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('upcoming', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_2__["DATETIME_STATUS_ID"].ACTIVE:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('active', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_2__["DATETIME_STATUS_ID"].TRASHED:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('archived', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_2__["DATETIME_STATUS_ID"].CANCELLED:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('cancelled', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_2__["DATETIME_STATUS_ID"].POSTPONED:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('postponed', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_2__["DATETIME_STATUS_ID"].INACTIVE:
    default:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('inactive', 'event_espresso');
      break;
  }

  return dateStatus;
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
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! memize */ "./node_modules/memize/index.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(memize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _endpoints_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./endpoints.js */ "./assets/src/data/model/endpoints.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  entities: _objectSpread({}, getDefaultModelEntitiesObject()),
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
  schema: _objectSpread({}, getDefaultModelEntitiesObject()),
  factory: _objectSpread({}, getDefaultModelEntitiesObject()),
  relationEndpoints: _objectSpread({}, getDefaultModelEntitiesObject()),
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







var _PRIVATE_PROPERTIES$S, _PRIVATE_PROPERTIES$V;

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

_PRIVATE_PROPERTIES$S = _constants__WEBPACK_IMPORTED_MODULE_10__["PRIVATE_PROPERTIES"].SAVE_STATE;
_PRIVATE_PROPERTIES$V = _constants__WEBPACK_IMPORTED_MODULE_10__["PRIVATE_PROPERTIES"].VALIDATE_TYPES;

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
    recurrence: ['RCR'],
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
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
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



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  Object.defineProperty(instance, fieldName, _objectSpread({
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
  Object.defineProperty(instance, propertyName, _objectSpread({
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
  Object.defineProperty(instance, fieldName, _objectSpread({
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
    Object.defineProperty(instance, aliasFieldName, _objectSpread({
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
    Object.defineProperty(instance, aliasFieldName, _objectSpread({
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
  Object.defineProperty(instance, 'set' + Object(lodash__WEBPACK_IMPORTED_MODULE_2__["upperFirst"])(fieldName), _objectSpread({
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
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  queryData = _objectSpread({}, defaultQueryData.queryData, {}, queryData);
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
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");
/* harmony import */ var _status_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../status/constants */ "./assets/src/data/model/status/constants.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  queryData = _objectSpread({}, defaultQueryData.queryData, {}, queryData);
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
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/status/constants.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event */ "./assets/src/data/model/event/index.js");
/* harmony import */ var _ticket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ticket */ "./assets/src/data/model/ticket/index.js");
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../datetime */ "./assets/src/data/model/datetime/index.js");
/* harmony import */ var _checkin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../checkin */ "./assets/src/data/model/checkin/index.js");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @eventespresso/value-objects */ "@eventespresso/value-objects");
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);


var _STATUS_TRANSLATION_M, _STATUS_TRANSLATION_M2, _STATUS_TRANSLATION_M3, _STATUS_TRANSLATION_M4, _STATUS_TRANSLATION_M5, _STATUS_TRANSLATION_M6, _STATUS_TRANSLATION_M7, _STATUS_TRANSLATION_M8, _STATUS_TRANSLATION_M9;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var STATUS_TRANSLATION_MAP_REGISTRATION = (_STATUS_TRANSLATION_M = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M, _constants__WEBPACK_IMPORTED_MODULE_1__["REGISTRATION_STATUS_ID"].PENDING_PAYMENT, new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"](Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('pending payment', 'event_espresso'), Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('pending payments', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M, _constants__WEBPACK_IMPORTED_MODULE_1__["REGISTRATION_STATUS_ID"].APPROVED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('approved', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M, _constants__WEBPACK_IMPORTED_MODULE_1__["REGISTRATION_STATUS_ID"].NOT_APPROVED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('not approved', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M, _constants__WEBPACK_IMPORTED_MODULE_1__["REGISTRATION_STATUS_ID"].CANCELLED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('cancelled', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M, _constants__WEBPACK_IMPORTED_MODULE_1__["REGISTRATION_STATUS_ID"].INCOMPLETE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('incomplete', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M, _constants__WEBPACK_IMPORTED_MODULE_1__["REGISTRATION_STATUS_ID"].DECLINED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('declined', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M, _constants__WEBPACK_IMPORTED_MODULE_1__["REGISTRATION_STATUS_ID"].WAIT_LIST, new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"](Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('wait list', 'event_espresso'), Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('wait lists', 'event_espresso'))), _STATUS_TRANSLATION_M);
/**
 * Translation map for Transaction statuses
 * @type {{}}
 *
 */

var STATUS_TRANSLATION_MAP_TRANSACTION = (_STATUS_TRANSLATION_M2 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M2, _constants__WEBPACK_IMPORTED_MODULE_1__["TRANSACTION_STATUS_ID"].OVERPAID, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('overpaid', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M2, _constants__WEBPACK_IMPORTED_MODULE_1__["TRANSACTION_STATUS_ID"].COMPLETE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('complete', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M2, _constants__WEBPACK_IMPORTED_MODULE_1__["TRANSACTION_STATUS_ID"].INCOMPLETE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('incomplete', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M2, _constants__WEBPACK_IMPORTED_MODULE_1__["TRANSACTION_STATUS_ID"].FAILED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('failed', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M2, _constants__WEBPACK_IMPORTED_MODULE_1__["TRANSACTION_STATUS_ID"].ABANDONED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('abandoned', 'event_espresso'))), _STATUS_TRANSLATION_M2);
/**
 * Translation map for payment statuses
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_PAYMENT = (_STATUS_TRANSLATION_M3 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M3, _constants__WEBPACK_IMPORTED_MODULE_1__["PAYMENT_STATUS_ID"].APPROVED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('accepted', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M3, _constants__WEBPACK_IMPORTED_MODULE_1__["PAYMENT_STATUS_ID"].PENDING, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('pending', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M3, _constants__WEBPACK_IMPORTED_MODULE_1__["PAYMENT_STATUS_ID"].CANCELLED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('cancelled', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M3, _constants__WEBPACK_IMPORTED_MODULE_1__["PAYMENT_STATUS_ID"].DECLINED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('declined', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M3, _constants__WEBPACK_IMPORTED_MODULE_1__["PAYMENT_STATUS_ID"].FAILED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('failed', 'event_espresso'))), _STATUS_TRANSLATION_M3);
/**
 * Translation map for Message statuses
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_MESSAGE = (_STATUS_TRANSLATION_M4 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_1__["MESSAGE_STATUS_ID"].SENT, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('sent', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_1__["MESSAGE_STATUS_ID"].IDLE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('queued for sending', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_1__["MESSAGE_STATUS_ID"].FAIL, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('failed', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_1__["MESSAGE_STATUS_ID"].DEBUG, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('debug only', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_1__["MESSAGE_STATUS_ID"].EXECUTING, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('messenger is executing', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_1__["MESSAGE_STATUS_ID"].RESEND, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('queued for resending', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_1__["MESSAGE_STATUS_ID"].INCOMPLETE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('queued for generating', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M4, _constants__WEBPACK_IMPORTED_MODULE_1__["MESSAGE_STATUS_ID"].RETRY, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('failed sending, can be retried', 'event_espresso'))), _STATUS_TRANSLATION_M4);
/**
 * Translation map for CPT statuses
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_CPT = (_STATUS_TRANSLATION_M5 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M5, _constants__WEBPACK_IMPORTED_MODULE_1__["CPT_STATUS_ID"].PUBLISH, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('published', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M5, _constants__WEBPACK_IMPORTED_MODULE_1__["CPT_STATUS_ID"].FUTURE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('scheduled', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M5, _constants__WEBPACK_IMPORTED_MODULE_1__["CPT_STATUS_ID"].DRAFT, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('draft', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M5, _constants__WEBPACK_IMPORTED_MODULE_1__["CPT_STATUS_ID"].PENDING, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('pending', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M5, _constants__WEBPACK_IMPORTED_MODULE_1__["CPT_STATUS_ID"].PRIVATE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('private', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M5, _constants__WEBPACK_IMPORTED_MODULE_1__["CPT_STATUS_ID"].TRASHED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('trashed', 'event_espresso'))), _STATUS_TRANSLATION_M5); // the following status maps are for model statuses that are not saved in the
// status table but for convenience have their labels retrievable via here.

/**
 * Translation map for Event Statuses
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_EVENT = (_STATUS_TRANSLATION_M6 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M6, _event__WEBPACK_IMPORTED_MODULE_2__["EVENT_STATUS_ID"].SOLD_OUT, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('sold out', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M6, _event__WEBPACK_IMPORTED_MODULE_2__["EVENT_STATUS_ID"].POSTPONED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('postponed', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M6, _event__WEBPACK_IMPORTED_MODULE_2__["EVENT_STATUS_ID"].CANCELLED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('cancelled', 'event_espresso'))), _STATUS_TRANSLATION_M6);
/**
 * Translation map for Ticket statuses
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_TICKET = (_STATUS_TRANSLATION_M7 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M7, _ticket__WEBPACK_IMPORTED_MODULE_3__["TICKET_STATUS_ID"].ARCHIVED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('archived', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M7, _ticket__WEBPACK_IMPORTED_MODULE_3__["TICKET_STATUS_ID"].EXPIRED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('expired', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M7, _ticket__WEBPACK_IMPORTED_MODULE_3__["TICKET_STATUS_ID"].SOLD_OUT, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('sold out', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M7, _ticket__WEBPACK_IMPORTED_MODULE_3__["TICKET_STATUS_ID"].PENDING, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('upcoming', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M7, _ticket__WEBPACK_IMPORTED_MODULE_3__["TICKET_STATUS_ID"].ONSALE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('on sale', 'event_espresso'))), _STATUS_TRANSLATION_M7);
/**
 * Translation map for datetime statuses
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_DATETIME = (_STATUS_TRANSLATION_M8 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M8, _datetime__WEBPACK_IMPORTED_MODULE_4__["DATETIME_STATUS_ID"].CANCELLED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('cancelled', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M8, _datetime__WEBPACK_IMPORTED_MODULE_4__["DATETIME_STATUS_ID"].SOLD_OUT, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('sold out', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M8, _datetime__WEBPACK_IMPORTED_MODULE_4__["DATETIME_STATUS_ID"].EXPIRED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('expired', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M8, _datetime__WEBPACK_IMPORTED_MODULE_4__["DATETIME_STATUS_ID"].INACTIVE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('inactive', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M8, _datetime__WEBPACK_IMPORTED_MODULE_4__["DATETIME_STATUS_ID"].UPCOMING, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('upcoming', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M8, _datetime__WEBPACK_IMPORTED_MODULE_4__["DATETIME_STATUS_ID"].ACTIVE, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('active', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M8, _datetime__WEBPACK_IMPORTED_MODULE_4__["DATETIME_STATUS_ID"].POSTPONED, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('postponed', 'event_espresso'))), _STATUS_TRANSLATION_M8);
/**
 * Translation map for checkin statuses
 *
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_CHECKIN = (_STATUS_TRANSLATION_M9 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M9, _checkin__WEBPACK_IMPORTED_MODULE_5__["CHECKIN_STATUS_ID"].STATUS_CHECKED_IN, new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"](Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('check-in', 'event_espresso'), Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('check-ins', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M9, _checkin__WEBPACK_IMPORTED_MODULE_5__["CHECKIN_STATUS_ID"].STATUS_CHECKED_OUT, new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"](Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('check-out', 'event_espresso'), Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('check-outs', 'event_espresso'))), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_STATUS_TRANSLATION_M9, _checkin__WEBPACK_IMPORTED_MODULE_5__["CHECKIN_STATUS_ID"].STATUS_CHECKED_NEVER, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('never checked in', 'event_espresso'))), _STATUS_TRANSLATION_M9);
/**
 * Combined translation map for all statuses.
 * @type {{}}
 */

var STATUS_TRANSLATION_MAP_ALL = _objectSpread({}, STATUS_TRANSLATION_MAP_REGISTRATION, {}, STATUS_TRANSLATION_MAP_TRANSACTION, {}, STATUS_TRANSLATION_MAP_PAYMENT, {}, STATUS_TRANSLATION_MAP_MESSAGE, {}, STATUS_TRANSLATION_MAP_CPT, {}, STATUS_TRANSLATION_MAP_EVENT, {}, STATUS_TRANSLATION_MAP_TICKET, {}, STATUS_TRANSLATION_MAP_DATETIME, {}, STATUS_TRANSLATION_MAP_CHECKIN, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, _constants__WEBPACK_IMPORTED_MODULE_1__["UNKNOWN_STATUS_ID"], _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].fromSameSingleAndPlural(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__["__"])('unknown', 'event_espresso'))));
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
  var schema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].FORMAT_SENTENCE_CASE;
  return STATUS_TRANSLATION_MAP_ALL[statusCode] ? STATUS_TRANSLATION_MAP_ALL[statusCode].asFormatted(singular, schema) : STATUS_TRANSLATION_MAP_ALL[_constants__WEBPACK_IMPORTED_MODULE_1__["UNKNOWN_STATUS_ID"]].asFormatted(singular, schema);
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
  var schema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__["Label"].FORMAT_SENTENCE_CASE;

  if (!Object(lodash__WEBPACK_IMPORTED_MODULE_8__["isArray"])(statusCodes)) {
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
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  queryData = _objectSpread({}, defaultQueryData.queryData, {}, queryData);
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
/*! exports provided: MODEL_NAME, TICKET_STATUS_ID, TICKET_STATUS_IDS, nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString, isOnSale, isExpired, isSoldOut, isPending, isArchived, status, getTicketStatusTextLabel, getBackgroundColorClass */
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

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTicketStatusTextLabel", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["getTicketStatusTextLabel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getBackgroundColorClass", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["getBackgroundColorClass"]; });





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
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  queryData = _objectSpread({}, defaultQueryData.queryData, {}, queryData);
  return Object(_base__WEBPACK_IMPORTED_MODULE_4__["getQueryString"])(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/ticket/status-helper.js":
/*!*******************************************************!*\
  !*** ./assets/src/data/model/ticket/status-helper.js ***!
  \*******************************************************/
/*! exports provided: isOnSale, isExpired, isSoldOut, isPending, isArchived, status, getTicketStatusTextLabel, getBackgroundColorClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOnSale", function() { return isOnSale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isExpired", function() { return isExpired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSoldOut", function() { return isSoldOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPending", function() { return isPending; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArchived", function() { return isArchived; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "status", function() { return status; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTicketStatusTextLabel", function() { return getTicketStatusTextLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBackgroundColorClass", function() { return getBackgroundColorClass; });
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
 * @param {boolean} includeArchived if true will not filter out trashed entities
 * @return {boolean} true if event date is valid entity or archive
 */


var isValidEntityOrArchive = function isValidEntityOrArchive(TicketEntity, includeArchived) {
  return includeArchived && assertTicketEntity(TicketEntity) || !includeArchived && !isArchived(TicketEntity);
};
/**
 * @function
 * @param {Object} TicketEntity model object
 * @param {boolean} includeArchived if true will not filter out archived entities
 * @return {boolean} true if ticket is currently available for purchase
 */


var isOnSale = function isOnSale(TicketEntity) {
  var includeArchived = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return isValidEntityOrArchive(TicketEntity, includeArchived) && TicketEntity.startDate.diffNow() < 0 && TicketEntity.endDate.diffNow() > 0;
};
/**
 * @function
 * @param {Object} TicketEntity model object
 * @param {boolean} includeArchived if true will not filter out archived entities
 * @return {boolean} true if ticket can no longer be purchased
 */

var isExpired = function isExpired(TicketEntity) {
  var includeArchived = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return isValidEntityOrArchive(TicketEntity, includeArchived) && TicketEntity.endDate.diffNow() < 0;
};
/**
 * @function
 * @param {Object} TicketEntity model object
 * @param {boolean} includeArchived if true will not filter out archived entities
 * @return {boolean} true if tickets sold meets or exceeds available quantity
 */

var isSoldOut = function isSoldOut(TicketEntity) {
  var includeArchived = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (includeArchived && !assertTicketEntity(TicketEntity) || !includeArchived && isArchived(TicketEntity)) {
    return false;
  }

  var qty = TicketEntity.qty;
  return qty !== null && qty !== 'INF' && qty !== Infinity && qty !== -1 && TicketEntity.sold >= qty;
};
/**
 * @function
 * @param {Object} TicketEntity model object
 * @param {boolean} includeArchived if true will not filter out archived entities
 * @return {boolean} 	true if ticket is not yet available for purchase,
 * 						but will be at some date in the future
 */

var isPending = function isPending(TicketEntity) {
  var includeArchived = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return isValidEntityOrArchive(TicketEntity, includeArchived) && TicketEntity.startDate.diffNow() > 0;
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
 * @return {string} ticket status
 */

var getTicketStatusTextLabel = function getTicketStatusTextLabel(TicketEntity) {
  var ticketStatus = '';

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
  return "ee-status-background-color-".concat(status(TicketEntity));
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

    // Lower cased words. E.g. "hello".
    if (word === word.toLowerCase()) return token.toLowerCase();

    // Upper cased words. E.g. "WHISKY".
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
   * @param  {string}  word      The word to pluralize
   * @param  {number}  count     How many of the word exist
   * @param  {boolean} inclusive Whether to prefix with the number (e.g. 3 ducks)
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
    ['passerby', 'passersby']
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
    [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
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
    [/\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice'],
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
    [/\b((?:tit)?m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, '$1'],
    [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, '$1sis'],
    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
    [/(test)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
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
    'aircraft',
    'alcohol',
    'ammo',
    'analytics',
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
    'firmware',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'hardware',
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
    'mud',
    'manga',
    'news',
    'only',
    'personnel',
    'pike',
    'plankton',
    'pliers',
    'police',
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
    'software',
    'species',
    'staff',
    'swine',
    'tennis',
    'traffic',
    'transportation',
    'trout',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    /pok[eé]mon$/i,
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
/*!**********************************!*\
  !*** external {"this":["eejs"]} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]; }());

/***/ }),

/***/ "@eventespresso/helpers":
/*!********************************************!*\
  !*** external {"this":["eejs","helpers"]} ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["helpers"]; }());

/***/ }),

/***/ "@eventespresso/i18n":
/*!*****************************************!*\
  !*** external {"this":["eejs","i18n"]} ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["i18n"]; }());

/***/ }),

/***/ "@eventespresso/validators":
/*!***********************************************!*\
  !*** external {"this":["eejs","validators"]} ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["validators"]; }());

/***/ }),

/***/ "@eventespresso/value-objects":
/*!*************************************************!*\
  !*** external {"this":["eejs","valueObjects"]} ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["valueObjects"]; }());

/***/ }),

/***/ "@wordpress/hooks":
/*!****************************************!*\
  !*** external {"this":["wp","hooks"]} ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["hooks"]; }());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLm1vZGVsL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvYXNzZXJ0aW9ucy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2F0dGVuZGVlL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2F0dGVuZGVlL2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvYXR0ZW5kZWUvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9iYXNlLWRhdGUtZm9ybWF0dGVyLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvYmFzZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2NoZWNraW4vY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvY2hlY2tpbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2NoZWNraW4vcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9mb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2RhdGV0aW1lL3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZGF0ZXRpbWUvc3RhdHVzLWhlbHBlci5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2RlZmF1bHQtbW9kZWwtc3RhdGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbmRwb2ludHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9hc3NlcnRpb25zLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZW50aXR5LWZhY3RvcnkvYmFzZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9ib29sZWFucy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2V4dHJhY3RvcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L3ZhbGlkYXRvcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9ldmVudC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9ldmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2V2ZW50L3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9tb2RlbC1uYW1lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL21vZGVscy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3ByaWNlLXR5cGUvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvcHJpY2UtdHlwZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3ByaW1hcnkta2V5cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3JlZ2lzdHJhdGlvbi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvc3RhdHVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC90aWNrZXQvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L3N0YXR1cy1oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9tZW1pemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcGx1cmFsaXplL3BsdXJhbGl6ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9ub2RlX21vZHVsZXMvcmVhY3QtaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaGVscGVyc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaTE4blwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsaWRhdG9yc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsdWVPYmplY3RzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiaG9va3NcIl19Iiwid2VicGFjazovL2VlanMubW9kZWwvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZlbmRvclwiLFwiY3VpZFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmVuZG9yXCIsXCJtb21lbnRcIl19Il0sIm5hbWVzIjpbImFzc2VydEVudGl0eUhhc0tleSIsImtleSIsImVudGl0eSIsIm1lc3NhZ2UiLCJzcHJpbnRmIiwiX18iLCJoYXNPd25Qcm9wZXJ0eSIsIkV4Y2VwdGlvbiIsImFzc2VydEltbXV0YWJsZU9iamVjdEhhc1BhdGgiLCJwYXRoIiwiaW1tdXRhYmxlIiwiaGFzSW4iLCJhc3NlcnRJc0FycmF5IiwiaXRlbXMiLCJpc0FycmF5IiwiYXNzZXJ0SXNOb3RFbXB0eSIsImlzRW1wdHkiLCJhc3NlcnRJc01hcCIsIml0ZW0iLCJpc01hcCIsIk1PREVMX05BTUUiLCJvcmRlckJ5TWFwIiwiaWQiLCJsYXN0TmFtZU9ubHkiLCJmaXJzdE5hbWVPbmx5IiwiZmlyc3RUaGVuTGFzdE5hbWUiLCJsYXN0VGhlbkZpcnN0TmFtZSIsInF1ZXJ5RGF0YVR5cGVzIiwiZm9yRXZlbnRJZCIsIlByb3BUeXBlcyIsIm51bWJlciIsImZvckRhdGV0aW1lSWQiLCJmb3JUaWNrZXRJZCIsImZvclN0YXR1c0lkIiwib25lT2YiLCJSRUdJU1RSQVRJT05fU1RBVFVTX0lEUyIsImZvclJlZ2lzdHJhdGlvbklkIiwic2hvd0dyYXZhdGFyIiwiYm9vbCIsInF1ZXJ5RGF0YSIsInNoYXBlIiwibGltaXQiLCJvcmRlckJ5IiwiT2JqZWN0Iiwia2V5cyIsIm9yZGVyIiwiQUxMT1dFRF9PUkRFUl9WQUxVRVMiLCJkZWZhdWx0UXVlcnlEYXRhIiwiUVVFUllfT1JERVJfQVNDIiwibWFwT3JkZXJCeSIsImlzVW5kZWZpbmVkIiwid2hlcmVDb25kaXRpb25zIiwid2hlcmUiLCJwYXJzZUludCIsImlzTmFOIiwicHVzaCIsImluY2x1ZGVzIiwiam9pbiIsImdldFF1ZXJ5U3RyaW5nIiwiYmFzZUdldFF1ZXJ5U3RyaW5nIiwiZm9ybWF0RGF0ZXNPbkVudGl0aWVzIiwiZW50aXRpZXMiLCJlbnRpdHlEYXRlRmllbGRzIiwiZm9ybWF0IiwiZGF0ZUZvcm1hdHMiLCJsb2NhbCIsImZvcm1hdHRlZEVudGl0aWVzIiwiZm9yRWFjaCIsImZvcm1hdERhdGVzT25FbnRpdHkiLCJuZXdFbnRpdHkiLCJkYXRlRmllbGQiLCJmb3JtYXRFbnRpdGllc0RhdGVzVG9NeXNxbCIsImZvcm1hdEVudGl0eURhdGVzVG9NeXNxbCIsImZvcm1hdEVudGl0aWVzRGF0ZXNUb1NpdGUiLCJmb3JtYXRFbnRpdHlEYXRlc1RvU2l0ZSIsImNvbnZlcnRFbnRpdGllc0RhdGVzVG9Nb21lbnQiLCJjb252ZXJ0RW50aXR5RGF0ZXNUb01vbWVudCIsIlFVRVJZX09SREVSX0RFU0MiLCJHUkVBVEVSX1RIQU4iLCJlbmNvZGVVUklDb21wb25lbnQiLCJMRVNTX1RIQU4iLCJHUkVBVEVSX1RIQU5fQU5EX0VRVUFMIiwiTEVTU19USEFOX0FORF9FUVVBTCIsImRlZmF1bHRXaGVyZUNvbmRpdGlvbnMiLCJxdWVyeVBhcmFtcyIsImZpZWxkIiwicXVlcnlTdHJpbmciLCJDSEVDS0lOX1NUQVRVU19JRCIsIlNUQVRVU19DSEVDS0VEX09VVCIsIlNUQVRVU19DSEVDS0VEX0lOIiwiU1RBVFVTX0NIRUNLRURfTkVWRVIiLCJDSEVDS0lOX1NUQVRVU19JRFMiLCJ2YWx1ZXMiLCJjaGVja2luU3RhdHVzIiwib3B0aW9uc0VudGl0eU1hcCIsImRlZmF1bHQiLCJsYWJlbCIsInByZXR0eVN0YXR1cyIsInZhbHVlIiwidGltZXN0YW1wIiwiREFURVRJTUVfU1RBVFVTX0lEIiwiQUNUSVZFIiwiQ0FOQ0VMTEVEIiwiRVhQSVJFRCIsIklOQUNUSVZFIiwiUE9TVFBPTkVEIiwiU09MRF9PVVQiLCJUUkFTSEVEIiwiVVBDT01JTkciLCJEQVRFVElNRV9TVEFUVVNfSURTIiwiTUlOVVRFX0lOX1NFQ09ORFMiLCJIT1VSX0lOX1NFQ09ORFMiLCJEQVlfSU5fU0VDT05EUyIsIldFRUtfSU5fU0VDT05EUyIsIk1PTlRIX0lOX1NFQ09ORFMiLCJEQVRFX0ZJRUxEUyIsImZvcm1hdHRlcnMiLCJmb3JPd24iLCJiYXNlRm9ybWF0dGVyIiwiaW1wbGVtZW50YXRpb24iLCJmdW5jdGlvbk5hbWUiLCJpbmNvbWluZ0FyZ3MiLCJmaXJzdEFyZyIsInB1bGxBdCIsInByZXR0eURhdGVGcm9tRGF0ZVRpbWUiLCJEYXRlVGltZUVudGl0eSIsImNvbnRlbnQiLCJpc01vZGVsRW50aXR5T2ZNb2RlbCIsIkRUVF9FVlRfc3RhcnQiLCJoYXNTYW1lIiwiRFRUX0VWVF9lbmQiLCJhbGxEYXRlVGltZXNBc1N0cmluZyIsIlNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFIiwidG9Gb3JtYXQiLCJEQVRFX1RJTUVfRk9STUFUX1NJVEUiLCJUSU1FX0ZPUk1BVF9TSVRFIiwiRFRUX25hbWUiLCJub3dEYXRlQW5kVGltZSIsIm1vbWVudCIsInNob3dFeHBpcmVkIiwibW9udGgiLCJzdGFydF9kYXRlIiwiZW5kX2RhdGUiLCJzdGFydE9mIiwiZW5kT2YiLCJhc3NlcnREYXRlVGltZUVudGl0eSIsIlR5cGVFcnJvciIsImlzVmFsaWRFbnRpdHlPckFyY2hpdmUiLCJpbmNsdWRlVHJhc2hlZCIsImlzVHJhc2hlZCIsImlzQWN0aXZlIiwic3RhcnQiLCJkaWZmTm93IiwiYXNTZWNvbmRzIiwiZW5kIiwiaXNFeHBpcmVkIiwiaXNSZWNlbnRseUV4cGlyZWQiLCJpc1NvbGRPdXQiLCJjYXAiLCJyZWdMaW1pdCIsIkluZmluaXR5Iiwic29sZCIsImlzVXBjb21pbmciLCJkZWxldGVkIiwic3RhdHVzIiwiZ2V0QmFja2dyb3VuZENvbG9yQ2xhc3MiLCJnZXREYXRlVGltZVN0YXR1c1RleHRMYWJlbCIsImRhdGVTdGF0dXMiLCJtYXBUb09iamVjdFZhbHVlcyIsIm1vZGVsTmFtZUVuZHBvaW50cyIsIm1hcFZhbHVlcyIsImdldERlZmF1bHRNb2RlbEVudGl0aWVzT2JqZWN0IiwibWVtb2l6ZSIsImVuZHBvaW50cyIsIkRFRkFVTFRfTElTVFNfU1RBVEUiLCJERUZBVUxUX0NPUkVfU1RBVEUiLCJyZWxhdGlvbnMiLCJkaXJ0eSIsImluZGV4IiwiZGVsZXRlIiwiYWRkIiwidHJhc2giLCJERUZBVUxUX1NDSEVNQV9TVEFURSIsInNjaGVtYSIsImZhY3RvcnkiLCJyZWxhdGlvbkVuZHBvaW50cyIsInJlbGF0aW9uU2NoZW1hIiwiZGF0YSIsInBhdGhzIiwiY29sbGVjdGlvbl9lbmRwb2ludHMiLCJiYXNlUmVzdFJvdXRlIiwiYmFzZV9yZXN0X3JvdXRlIiwiZ2V0RW5kcG9pbnQiLCJtb2RlbE5hbWUiLCJhcHBseVF1ZXJ5U3RyaW5nIiwic3RyaXBCYXNlUm91dGVGcm9tVXJsIiwidXJsIiwicmVwbGFjZSIsIm1heWJlQXNzZXJ0VmFsdWVPYmplY3QiLCJmaWVsZE5hbWUiLCJmaWVsZFZhbHVlIiwiaXNEYXRlVGltZUZpZWxkIiwiRGF0ZVRpbWUiLCJhc3NlcnRJc0RhdGVUaW1lIiwiaXNNb25leUZpZWxkIiwiTW9uZXkiLCJhc3NlcnRNb25leSIsImFzc2VydFZhbGlkU2NoZW1hIiwiaXNTY2hlbWEiLCJJbnZhbGlkU2NoZW1hIiwiYXNzZXJ0VmFsaWRTY2hlbWFGaWVsZFByb3BlcnRpZXMiLCJ0eXBlIiwicHJvcGVydGllcyIsInJhdyIsImFzc2VydFZhbGlkVmFsdWVGb3JQcmVwYXJlZEZpZWxkIiwiaW5zdGFuY2UiLCJpc1ZhbGlkIiwiaXNTaGFsbG93VmFsaWRWYWx1ZUZvckZpZWxkIiwiZW51bSIsInZhbGlkYXRlRW51bVR5cGUiLCJ2YWxpZGF0ZVR5cGUiLCJtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3RXaXRoQXNzZXJ0aW9ucyIsImFzc2VydFZhbGlkRmllbGRBbmRWYWx1ZUFnYWluc3RTY2hlbWEiLCJ2YWxpZGF0aW9uVHlwZSIsInZhbGlkYXRlVHlwZUZvckZpZWxkIiwiUFJJVkFURV9QUk9QRVJUSUVTIiwiU0FWRV9TVEFURSIsIlZBTElEQVRFX1RZUEVTIiwiQmFzZUVudGl0eSIsImVudGl0eUZpZWxkc0FuZFZhbHVlcyIsImZpZWxkUHJlZml4ZXMiLCJpc05ldyIsIkNMRUFOIiwiY3JlYXRlR2V0dGVyIiwic2V0U2F2ZVN0YXRlIiwiTkVXIiwiU2V0IiwiY3JlYXRlRW50aXR5R2V0dGVyc0FuZFNldHRlcnMiLCJjcmVhdGVQZXJzaXN0aW5nR2V0dGVyc0FuZFNldHRlcnMiLCJzZWFsIiwic2F2ZVN0YXRlIiwiRElSVFkiLCJwcm90ZWN0ZWRGaWVsZHMiLCJsZW5ndGgiLCJpbmRleE9mIiwia2VlcElkIiwiY3JlYXRlRmFjdG9yeSIsImNyZWF0ZUVudGl0eUZhY3RvcnkiLCIkc2NoZW1hIiwiY3JlYXRlTmV3IiwiZm9yQ2xvbmUiLCJuYW1lQ2xhc3MiLCJuYW1lIiwiZXh0ZW5kZWRDbGFzcyIsIkVudGl0eSIsInVwcGVyRmlyc3QiLCJjYW1lbENhc2UiLCJjbGFzc0RlZiIsImZpZWxkc0FuZFZhbHVlcyIsImZyb21FeGlzdGluZyIsImhhc1Jhd1Byb3BlcnR5IiwiaXNQbGFpbk9iamVjdCIsImhhc1ByZXR0eVByb3BlcnR5IiwicHJldHR5IiwiaGFzUmVuZGVyZWRQcm9wZXJ0eSIsInJlbmRlcmVkIiwiaGFzRm9ybWF0UHJvcGVydHkiLCJoYXNFbnVtUHJvcGVydHkiLCJpc1ZhbHVlT2JqZWN0RmllbGQiLCJpc1VUQ0RhdGVUaW1lRmllbGQiLCJkYXRlVGltZUZpZWxkTmFtZSIsImlzUHJpbWFyeUtleUZpZWxkIiwicHJpbWFyeV9rZXkiLCJpc1JlYWRPbmx5IiwicmVhZG9ubHkiLCJpc0VudGl0eUZpZWxkIiwiaXNFbnVtRmllbGQiLCJTeW1ib2wiLCJWQUxJREFURV9UWVBFIiwiUkFXIiwiUkVOREVSRUQiLCJQUkVUVFkiLCJNT0RFTF9QUkVGSVhFUyIsInByZWZpeE1hcCIsImFwcGx5RmlsdGVycyIsImFuc3dlciIsImF0dGVuZGVlIiwiY2hhbmdlX2xvZyIsImNoZWNraW4iLCJjb3VudHJ5IiwiY3VycmVuY3kiLCJjdXJyZW5jeV9wYXltZW50X21ldGhvZCIsImRhdGV0aW1lIiwiZGF0ZXRpbWVfdGlja2V0IiwiZXZlbnQiLCJldmVudF9tZXNzYWdlX3RlbXBsYXRlIiwiZXZlbnRfcXVlc3Rpb25fZ3JvdXAiLCJldmVudF92ZW51ZSIsImV4dHJhX2pvaW4iLCJleHRyYV9tZXRhIiwibGluZV9pdGVtIiwibWVzc2FnZV90ZW1wbGF0ZSIsIm1lc3NhZ2VfdGVtcGxhdGVfZ3JvdXAiLCJwYXltZW50IiwicGF5bWVudF9tZXRob2QiLCJwb3N0X21ldGEiLCJwcmljZSIsInByaWNlX3R5cGUiLCJxdWVzdGlvbiIsInF1ZXN0aW9uX2dyb3VwIiwicXVlc3Rpb25fZ3JvdXBfcXVlc3Rpb24iLCJxdWVzdGlvbl9vcHRpb24iLCJyZWN1cnJlbmNlIiwicmVnaXN0cmF0aW9uIiwicmVnaXN0cmF0aW9uX3BheW1lbnQiLCJzdGF0ZSIsInRlcm0iLCJ0ZXJtX3JlbGF0aW9uc2hpcCIsInRlcm1fdGF4b25vbXkiLCJ0aWNrZXQiLCJ0aWNrZXRfcHJpY2UiLCJ0aWNrZXRfdGVtcGxhdGUiLCJ0cmFuc2FjdGlvbiIsInZlbnVlIiwid3BfdXNlciIsIm9wdHMiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImNyZWF0ZUNhbGxiYWNrR2V0dGVyIiwicHJvcGVydHlOYW1lIiwiY2FsbEJhY2siLCJjcmVhdGVHZXR0ZXJBbmRTZXR0ZXIiLCJpbml0aWFsRmllbGRWYWx1ZSIsInByb3BlcnR5VmFsdWUiLCJzZXQiLCJyZWNlaXZlZFZhbHVlIiwiaXNQcmltYXJ5RmllbGQiLCJzZXRGaWVsZFRvUGVyc2lzdCIsImNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyIiwib3JpZ2luYWxGaWVsZE5hbWUiLCJhbGlhc0ZpZWxkTmFtZSIsImNyZWF0ZUFsaWFzR2V0dGVyIiwiY3JlYXRlRmx1ZW50U2V0dGVyIiwicHJpbWFyeUtleXMiLCJvcmlnaW5hbEZpZWxkc0FuZFZhbHVlcyIsImlzUHJpbWFyeUtleSIsInNldFZhbGlkYXRlVHlwZUZvckZpZWxkIiwic2V0SW5pdGlhbEVudGl0eUZpZWxkc0FuZFZhbHVlcyIsInNldENhbGN1bGF0ZWRGaWVsZEFuZFZhbHVlcyIsInBvcHVsYXRlUHJvdGVjdGVkRmllbGRzUHJvcGVydHkiLCJzZXRSZXNvdXJjZXMiLCJjcmVhdGVQcmltYXJ5S2V5RmllbGRHZXR0ZXJzIiwicG9wdWxhdGVQcmltYXJ5S2V5cyIsInBvcHVsYXRlTWlzc2luZ0ZpZWxkcyIsImNhbGN1bGF0ZWRGaWVsZHMiLCJfY2FsY3VsYXRlZF9maWVsZHMiLCJfcHJvdGVjdGVkIiwiZ2V0UHJpbWFyeUtleUZpZWxkc0Zyb21TY2hlbWEiLCJzY2hlbWFQcm9wZXJ0aWVzIiwic2NoZW1hRmllbGQiLCJjdWlkIiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyRm9yRmllbGQiLCJkZXJpdmVWYWxpZGF0ZVR5cGVGb3JGaWVsZCIsImdldEVudGl0eUZpZWxkc0Zyb21TY2hlbWEiLCJ1bmRlZmluZWQiLCJnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyIsImZvclVwZGF0ZSIsImdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JQZXJzaXN0aW5nIiwiZm9ySW5zZXJ0IiwiZW50aXR5VmFsdWVzIiwicHJpbWFyeUtleSIsImZvclBlcnNpc3QiLCJnZXREZWZhdWx0VmFsdWVGb3JGaWVsZCIsImNyZWF0ZVJhd0VudGl0eUdldHRlcnNTZXR0ZXJzIiwiZGVyaXZlUHJlcGFyZWRWYWx1ZUZvckZpZWxkIiwiY3JlYXRlUmVuZGVyZWRHZXR0ZXJzIiwiZGVyaXZlUmVuZGVyZWRWYWx1ZSIsImNyZWF0ZUFsaWFzR2V0dGVyRm9yRmllbGQiLCJjcmVhdGVBbGlhc2VzRm9yTWV0aG9kIiwibWV0aG9kIiwibmV3RmllbGROYW1lIiwiZmllbGRQcmVmaXgiLCJnZXRSZW5kZXJlZENhbGxiYWNrIiwicmVxdWVzdGVkRmllbGROYW1lIiwicmVtb3ZlUHJlZml4ZXNGcm9tRmllbGQiLCJwcmVmaXhlc1RvUmVtb3ZlIiwic29ydEJ5IiwicHJlZml4IiwiZ2V0UmVuZGVyZWQiLCJoYXNNdWx0aXBsZVByaW1hcnlLZXlzQ2FsbGJhY2siLCJoYXNDYWxjdWxhdGVkRmllbGRDYWxsYmFjayIsImZpZWxkTmFtZVRvQ2hlY2siLCJjYWxjdWxhdGVkRmllbGRWYWx1ZSIsImNhbGN1bGF0ZWRGaWVsZE5hbWUiLCJyZWxhdGlvbk5hbWUiLCJyZXNvdXJjZVZhbHVlIiwicmVzb3VyY2VOYW1lIiwiaHJlZiIsImdldFJlbGF0aW9uTmFtZUZyb21MaW5rIiwic2V0UmVsYXRpb25zUmVzb3VyY2UiLCJnZXRSZWxhdGlvblJlc291cmNlQ2FsbGJhY2siLCJyZXNvdXJjZUluZm8iLCJyZXNvdXJjZUxpbmsiLCJzaW5nbGUiLCJnZXRSZWxhdGlvblJlc291cmNlIiwib3ZlcnJpZGUiLCJjdXJyZW50U3RhdGUiLCJJbnZhbGlkQXJndW1lbnQiLCJmaWVsZHNUb1BlcnNpc3RPbkluc2VydCIsIm1heWJlQ29udmVydFRvVmFsdWVPYmplY3QiLCJ2YWxpZGF0ZUlzRGF0ZVRpbWUiLCJmcm9tSVNPIiwiaW5zdGFuY2VPZiIsIlNpdGVDdXJyZW5jeSIsInRvSVNPIiwidG9OdW1iZXIiLCJtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3QiLCJwbHVyYWxNb2RlbE5hbWUiLCJsYXN0Iiwic3BsaXQiLCJlbnRpdHlJbnN0YW5jZSIsInJlZHVjZSIsIml0ZXJhdG9yIiwiQXJyYXkiLCJmcm9tIiwiZ2V0UHJpbWFyeUtleVZhbHVlcyIsInBpY2siLCJwaWNrQnkiLCJkZXJpdmVEZWZhdWx0VmFsdWVGb3JUeXBlIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZGVyaXZlVHlwZUZvckZpZWxkIiwidmFsaWQiLCJzaW5nbGVUeXBlIiwiaXNJbnRlZ2VyIiwiaXNOdW1iZXIiLCJpc1N0cmluZyIsImlzQm9vbGVhbiIsImVudW1WYWx1ZXMiLCJleHBlY3RWYWx1ZU9iamVjdHMiLCJpc0VudW0iLCJpc1ZhbHVlT2JqZWN0IiwiRVZFTlRfU1RBVFVTX0lEIiwiRVZFTlRfU1RBVFVTX0lEUyIsImNhdGVnb3J5U2x1ZyIsInN0cmluZyIsInRpY2tldF9zdGFydCIsInRpY2tldF9lbmQiLCJNT0RFTF9OQU1FUyIsInBsdXJhbGl6ZSIsInNpbmd1bGFyTW9kZWxOYW1lIiwic2luZ3VsYXIiLCJtb2RlbE5hbWVGb3JRdWVyeVN0cmluZyIsInN0YXJ0Q2FzZSIsIkJBU0VfUFJJQ0VfVFlQRVMiLCJCQVNFX1BSSUNFIiwiRElTQ09VTlQiLCJTVVJDSEFSR0UiLCJUQVgiLCJwcmltYXJ5X2tleXMiLCJ2YWx1ZXNGb3JDb21iaW5lZFByaW1hcnlLZXlzIiwicmVzdWx0IiwidHJpbUVuZCIsInZhbHVlRm9yUHJpbWFyeUtleSIsImdldFByaW1hcnlLZXkiLCJnZXRQcmltYXJ5S2V5UXVlcnlTdHJpbmciLCJrZXlWYWx1ZXMiLCJnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzIiwia2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSIsIm1hcHBlZEVudGl0aWVzIiwiTWFwIiwiY3JlYXRlQW5kS2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSIsImVudGl0eUlkIiwic3RhdHVzTW9kZWwiLCJmb3JBdHRlbmRlZUlkIiwiZm9yVHJhbnNhY3Rpb25JZCIsInJlZ19pZCIsInJlZ19kYXRlIiwiU1RBVFVTX1RZUEVfRU1BSUwiLCJTVEFUVVNfVFlQRV9FVkVOVCIsIlNUQVRVU19UWVBFX01FU1NBR0UiLCJTVEFUVVNfVFlQRV9QQVlNRU5UIiwiU1RBVFVTX1RZUEVfUkVHSVNUUkFUSU9OIiwiU1RBVFVTX1RZUEVfVFJBTlNBQ1RJT04iLCJFTUFJTF9TVEFUVVNfSUQiLCJEUkFGVCIsIlNFTlQiLCJSRUdJU1RSQVRJT05fQ0xPU0VEIiwiREVMRVRFRCIsIkRFTklFRCIsIk5PVF9BQ1RJVkUiLCJOT1RfT1BFTiIsIk9OR09JTkciLCJSRUdJU1RSQVRJT05fT1BFTiIsIlBFTkRJTkciLCJTRUNPTkRBUlkiLCJNRVNTQUdFX1NUQVRVU19JRCIsIkRFQlVHIiwiRVhFQ1VUSU5HIiwiRkFJTCIsIklOQ09NUExFVEUiLCJJRExFIiwiUkVTRU5EIiwiUkVUUlkiLCJQQVlNRU5UX1NUQVRVU19JRCIsIkFQUFJPVkVEIiwiREVDTElORUQiLCJGQUlMRUQiLCJSRUdJU1RSQVRJT05fU1RBVFVTX0lEIiwiTk9UX0FQUFJPVkVEIiwiUEVORElOR19QQVlNRU5UIiwiV0FJVF9MSVNUIiwiVFJBTlNBQ1RJT05fU1RBVFVTX0lEIiwiQUJBTkRPTkVEIiwiQ09NUExFVEUiLCJPVkVSUEFJRCIsIkNQVF9TVEFUVVNfSUQiLCJQVUJMSVNIIiwiRlVUVVJFIiwiUFJJVkFURSIsIlVOS05PV05fU1RBVFVTX0lEIiwiQUxMX1NUQVRVU19JRFMiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX1JFR0lTVFJBVElPTiIsIkxhYmVsIiwiZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX1RSQU5TQUNUSU9OIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9QQVlNRU5UIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9NRVNTQUdFIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9DUFQiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0VWRU5UIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9USUNLRVQiLCJUSUNLRVRfU1RBVFVTX0lEIiwiQVJDSElWRUQiLCJPTlNBTEUiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0RBVEVUSU1FIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9DSEVDS0lOIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9BTEwiLCJzdGF0dXNDb2RlIiwiRk9STUFUX1NFTlRFTkNFX0NBU0UiLCJhc0Zvcm1hdHRlZCIsInByZXR0eVN0YXR1c2VzIiwic3RhdHVzQ29kZXMiLCJtYXBwZWRTdGF0dXNlcyIsInN0YXR1c1R5cGUiLCJUSUNLRVRfU1RBVFVTX0lEUyIsImFzc2VydFRpY2tldEVudGl0eSIsIlRpY2tldEVudGl0eSIsImluY2x1ZGVBcmNoaXZlZCIsImlzQXJjaGl2ZWQiLCJpc09uU2FsZSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJxdHkiLCJpc1BlbmRpbmciLCJnZXRUaWNrZXRTdGF0dXNUZXh0TGFiZWwiLCJ0aWNrZXRTdGF0dXMiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FB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QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxnQkFBZ0I7QUFDN0IsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0JBQWdCO0FBQzdCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGdCQUFnQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw0QkFBNEI7QUFDNUIsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFVBQVUsS0FBcUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQ2xPYTs7QUFFYixJQUFJLEtBQXFDLEVBQUUsRUFFMUM7QUFDRCxtQkFBbUIsbUJBQU8sQ0FBQyxrSEFBK0I7QUFDMUQ7Ozs7Ozs7Ozs7OztBQ05BLGFBQWEsK0JBQStCLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBOUMsYUFBYSwwQ0FBMEMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0F6RCxhQUFhLHVDQUF1QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXRELGFBQWEsNkNBQTZDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBNUQsYUFBYSwrQ0FBK0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E5RCxhQUFhLHNDQUFzQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXJELGFBQWEsaURBQWlELEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBaEUsYUFBYSxpQ0FBaUMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0FoRCxhQUFhLG1EQUFtRCxFQUFFLEkiLCJmaWxlIjoiZXZlbnRlc3ByZXNzby1tb2RlbC4wMWNmZDVjZGI2ZGYxNzQwZDAyMS5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvaW5kZXguanNcIik7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgRXhjZXB0aW9uIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgeyBzcHJpbnRmLCBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNBcnJheSwgaXNFbXB0eSwgaXNNYXAgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4ga2V5IGV4aXN0cyBpbiB0aGUgcHJvdmlkZWQgZW50aXR5IG9iamVjdC5cbiAqIFRoaXMgaXMgdXNlZCB3aGVuIGNhbGxpbmcgY29kZSB3YW50cyBhbiBleGNlcHRpb24gdG8gYmUgdGhyb3duLlxuICpcbiAqIEBwYXJhbSB7IHN0cmluZyB9IGtleVxuICogQHBhcmFtIHsgT2JqZWN0IH0gZW50aXR5XG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtZXNzYWdlXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH0gIFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHByb3ZpZGVkIGVudGl0eSBkb2VzIG5vdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGhhdmUgdGhlIGdpdmVuIGtleS5cbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydEVudGl0eUhhc0tleSA9ICgga2V5LCBlbnRpdHksIG1lc3NhZ2UgPSAnJyApID0+IHtcblx0aWYgKCBtZXNzYWdlID09PSAnJyApIHtcblx0XHRtZXNzYWdlID0gc3ByaW50Zihcblx0XHRcdF9fKFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIGVudGl0eSAoJXMpIGRvZXMgbm90IGhhdmUgdGhlIGdpdmVuIHByb3BlcnR5ICglcyknLFxuXHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdFx0KSxcblx0XHRcdGVudGl0eSxcblx0XHRcdGtleSxcblx0XHQpO1xuXHR9XG5cdGlmICggISBlbnRpdHkuaGFzT3duUHJvcGVydHkoIGtleSApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIHBhdGggaW4gdGhlIHByb3ZpZGVkIGltbXV0YWJsZSBvYmplY3QgZXhpc3RzLlxuICogVGhpcyBpcyB1c2VkIHdoZW4gY2FsbGluZyBjb2RlIHdhbnRzIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24gaWYgdGhlIGdpdmVuXG4gKiBzZWFyY2ggcGF0aCBhcnJheSBkb2VzIG5vdCBleGlzdCBpbiB0aGUgaW1tdXRhYmxlIG9iamVjdC5cbiAqXG4gKiBJZiB0aGUgaW1tdXRhYmxlIG9iamVjdCBpcyBzZXR1cCBsaWtlIHRoaXM6XG4gKlxuICogaW1tdXRhYmxlID0gSW1tdXRhYmxlLk1hcCgpLnNldCggJ2V2ZW50JywgSW1tdXRhYmxlLk1hcCgpLnNldCggMTAsIEV2ZW50ICkgKTtcbiAqXG4gKiBUaGVuIGEgdmFsaWQgc2VhcmNoYWJsZSBwYXRoIGNvdWxkIGJlIGBbICdldmVudCcsIDEwIF1gLiAgQW4gaW52YWxpZCBwYXRoXG4gKiB3b3VsZCBiZSBgWyAnZGF0ZXRpbWUnLCAxMCBdYFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGggIFNlYXJjaGFibGUgcGF0aCBmb3IgdGhlIGltbXV0YWJsZSBvamJlY3QgdG8gdmVyaWZ5LlxuICogQHBhcmFtIHtJbW11dGFibGUuTWFwfEltbXV0YWJsZS5TZXR9IGltbXV0YWJsZSAgQW4gaW1tdXRhYmxlIG9iamVjdCAoTWFwLCBTZXQsIExpc3QgZXRjKVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgQSBjdXN0b20gbWVzc2FnZSB0byB1c2UuXG4gKiBAdGhyb3dzIEV4Y2VwdGlvblxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0SW1tdXRhYmxlT2JqZWN0SGFzUGF0aCA9IChcblx0cGF0aCxcblx0aW1tdXRhYmxlLFxuXHRtZXNzYWdlID0gJydcbikgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBzcHJpbnRmKFxuXHRcdFx0X18oXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgaW1tdXRhYmxlIG9iamVjdCAoJXMpIGRvZXMgbm90IGhhdmUgdGhlIGdpdmVuIHBhdGggKCVzKScsXG5cdFx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0XHQpLFxuXHRcdFx0aW1tdXRhYmxlLFxuXHRcdFx0cGF0aCxcblx0XHQpO1xuXHR9XG5cdGlmICggISBpbW11dGFibGUuaGFzSW4oIHBhdGggKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBhcnJheS5cbiAqXG4gKiBAcGFyYW0geyp9IGl0ZW1zXG4gKiBAcGFyYW0geyBzdHJpbmcgfSAgbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9IFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBhblxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LlxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0SXNBcnJheSA9ICggaXRlbXMsIG1lc3NhZ2UgPSAnJyApID0+IHtcblx0aWYgKCBtZXNzYWdlID09PSAnJyApIHtcblx0XHRtZXNzYWdlID0gX18oICdUaGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuIGFycmF5LicsICdldmVudF9lc3ByZXNzbycgKTtcblx0fVxuXHRpZiAoICEgaXNBcnJheSggaXRlbXMgKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGVtcHR5IG9yIG5vdC5cbiAqXG4gKiBDYWxsIHRoaXMgdmFsaWRhdG9yIHdoZW4geW91IHdhbnQgdG8gbWFrZSBzdXJlIHRoZSB2YWx1ZSBpcyBOT1QgZW1wdHkuXG4gKlxuICogQHBhcmFtIHsqfSBpdGVtc1xuICogQHBhcmFtIHsgc3RyaW5nIH0gbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9IFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGVtcHR5LlxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0SXNOb3RFbXB0eSA9ICggaXRlbXMsIG1lc3NhZ2UgPSAnJyApID0+IHtcblx0aWYgKCBtZXNzYWdlID09PSAnJyApIHtcblx0XHRtZXNzYWdlID0gX18oXG5cdFx0XHQnVGhlIHByb3ZpZGVkIGl0ZW1zIG11c3Qgbm90IGJlIGVtcHR5Jyxcblx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0KTtcblx0fVxuXHRpZiAoIGlzRW1wdHkoIGl0ZW1zICkgKSB7XG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbiggbWVzc2FnZSApO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBNYXAgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7Kn0gaXRlbVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0SXNNYXAgPSAoIGl0ZW0sIG1lc3NhZ2UgPSAnJyApID0+IHtcblx0aWYgKCBtZXNzYWdlID09PSAnJyApIHtcblx0XHRtZXNzYWdlID0gX18oXG5cdFx0XHQnVGhlIHByb3ZpZGVkIGl0ZW0gbXVzdCBiZSBhIE1hcCBvYmplY3QnLFxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdCk7XG5cdH1cblx0aWYgKCAhIGlzTWFwKCBpdGVtICkgKSB7XG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbiggbWVzc2FnZSApO1xuXHR9XG59O1xuIiwiZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAnYXR0ZW5kZWUnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9BU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxufSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCB7IFJFR0lTVFJBVElPTl9TVEFUVVNfSURTIH0gZnJvbSAnLi4vcmVnaXN0cmF0aW9uL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRpZDogJ0FUVF9JRCcsXG5cdGxhc3ROYW1lT25seTogJ0FUVF9sbmFtZScsXG5cdGZpcnN0TmFtZU9ubHk6ICdBVFRfZm5hbWUnLFxuXHRmaXJzdFRoZW5MYXN0TmFtZTogWyAnQVRUX2ZuYW1lJywgJ0FUVF9sbmFtZScgXSxcblx0bGFzdFRoZW5GaXJzdE5hbWU6IFsgJ0FUVF9sbmFtZScsICdBVFRfZm5hbWUnIF0sXG59O1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdGZvckV2ZW50SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvckRhdGV0aW1lSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclRpY2tldElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JTdGF0dXNJZDogUHJvcFR5cGVzLm9uZU9mKCBSRUdJU1RSQVRJT05fU1RBVFVTX0lEUyApLFxuXHRmb3JSZWdpc3RyYXRpb25JZDogUHJvcFR5cGVzLm51bWJlcixcblx0c2hvd0dyYXZhdGFyOiBQcm9wVHlwZXMuYm9vbCxcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIE9iamVjdC5rZXlzKCBvcmRlckJ5TWFwICkgKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdsYXN0VGhlbkZpcnN0TmFtZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0FTQyxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkXG4gKiBpbiBhIFJFU1QgcXVlcnkgZnJvbSB0aGUgY29udGV4dCBvZiBhIGF0dGVuZGVlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBcdFx0b3JkZXJCeVxuICogQHJldHVybiB7IHN0cmluZyB9IFx0UmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmdcbiAqIFx0XHRcdFx0XHRcdGZvciB0aGUgUkVTVCBxdWVyeSBmb3IgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiBhdHRlbmRlZXMgZW5kcG9pbnQgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICAgIFx0SUQgb2YgRXZlbnQgdG8gcmV0cmlldmUgYXR0ZW5kZWVzIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvckRhdGV0aW1lSWQgXHRJRCBvZiBEYXRldGltZSB0byByZXRyaWV2ZSBhdHRlbmRlZXMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yVGlja2V0SWQgXHRcdElEIG9mIFRpY2tldCB0byByZXRyaWV2ZSBhdHRlbmRlZXMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yUmVnaXN0cmF0aW9uSWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JTdGF0dXNJZCBcdFx0SUQgb2YgU3RhdHVzIHRvIHJldHJpZXZlIGF0dGVuZGVlcyBmb3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBzaG93R3JhdmF0YXIgXHRCb29sZWFuIHRvZ2dsZSBmb3Igd2hldGhlciB0byBkaXNwbGF5IHVzZXIgR3JhdmF0YXJcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgXHRUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdGZvckRhdGV0aW1lSWQgPSAwLFxuXHRmb3JUaWNrZXRJZCA9IDAsXG5cdGZvclJlZ2lzdHJhdGlvbklkID0gMCxcblx0Zm9yU3RhdHVzSWQgPSAnUkFQJyxcblx0c2hvd0dyYXZhdGFyID0gZmFsc2UsXG59ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXG5cdC8vIGVuc3VyZSB0aGF0IGVudGl0eSBJRHMgYXJlIGludGVnZXJzXG5cdGZvclJlZ2lzdHJhdGlvbklkID0gcGFyc2VJbnQoIGZvclJlZ2lzdHJhdGlvbklkLCAxMCApO1xuXHRmb3JUaWNrZXRJZCA9IHBhcnNlSW50KCBmb3JUaWNrZXRJZCwgMTAgKTtcblx0Zm9yRGF0ZXRpbWVJZCA9IHBhcnNlSW50KCBmb3JEYXRldGltZUlkLCAxMCApO1xuXHRmb3JFdmVudElkID0gcGFyc2VJbnQoIGZvckV2ZW50SWQsIDEwICk7XG5cblx0Ly8gb3JkZXIgb2YgcHJpb3JpdHkgZm9yIHByb3ZpZGVkIGFyZ3VtZW50cy5cblx0aWYgKCBmb3JSZWdpc3RyYXRpb25JZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JSZWdpc3RyYXRpb25JZCApICkge1xuXHRcdHdoZXJlLnB1c2goIGB3aGVyZVtSZWdpc3RyYXRpb24uUkVHX0lEXT0keyBmb3JSZWdpc3RyYXRpb25JZCB9YCApO1xuXHR9IGVsc2UgaWYgKCBmb3JUaWNrZXRJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JUaWNrZXRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goIGB3aGVyZVtSZWdpc3RyYXRpb24uVGlja2V0LlRLVF9JRF09JHsgZm9yVGlja2V0SWQgfWAgKTtcblx0fSBlbHNlIGlmICggZm9yRGF0ZXRpbWVJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JEYXRldGltZUlkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggYHdoZXJlW1JlZ2lzdHJhdGlvbi5UaWNrZXQuRGF0ZXRpbWUuRFRUX0lEXT0keyBmb3JEYXRldGltZUlkIH1gICk7XG5cdH0gZWxzZSBpZiAoIGZvckV2ZW50SWQgIT09IDAgJiYgISBpc05hTiggZm9yRXZlbnRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goIGB3aGVyZVtSZWdpc3RyYXRpb24uRVZUX0lEXT0keyBmb3JFdmVudElkIH1gICk7XG5cdH1cblxuXHRpZiAoIFJFR0lTVFJBVElPTl9TVEFUVVNfSURTLmluY2x1ZGVzKCBmb3JTdGF0dXNJZCApICkge1xuXHRcdHdoZXJlLnB1c2goIGB3aGVyZVtSZWdpc3RyYXRpb24uU3RhdHVzLlNUU19JRF09JHsgZm9yU3RhdHVzSWQgfWAgKTtcblx0fVxuXHRpZiAoIHNob3dHcmF2YXRhciA9PT0gdHJ1ZSApIHtcblx0XHR3aGVyZS5wdXNoKCAnY2FsY3VsYXRlPXVzZXJfYXZhdGFyJyApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCAqIGFzIGRhdGVGb3JtYXRzIGZyb20gJ0BldmVudGVzcHJlc3NvL2hlbHBlcnMnO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgb24gcHJvdmlkZWQgZW50aXRpZXMuICBEb2VzIG5vdCBtdXRhdGUgb3JpZ2luYWxcbiAqIGVudGl0aWVzLlxuICpcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXRpZXMgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgc3RyaW5nIH0gZm9ybWF0ICBUaGUgZm9ybWF0IHRvIHRyYW5zZm9ybSB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgdG8uXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICBXaGV0aGVyIG9yIG5vdCB0byBjb252ZXJ0IHRoZSBkYXRlIGZpZWxkIHZhbHVlXG4gKiAgIHRvIHRoZSBsb2NhbCB0aW1lem9uZSBmb3IgdGhlIGhvc3QuXG4gKiBAcmV0dXJuIHsgQXJyYXkgfSAgUmV0dXJucyBhIG5ldyBhcnJheSBvZiBuZXcgZW50aXRpZXMgd2l0aCB0aGUgZGF0ZSBmaWVsZFxuICogICB2YWx1ZXMgZm9ybWF0dGVkXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlc09uRW50aXRpZXMgPSAoXG5cdGVudGl0aWVzID0gW10sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0Zm9ybWF0ID0gZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9JU084NjAxLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0aWYgKCBpc0VtcHR5KCBlbnRpdGllcyApIHx8IGlzRW1wdHkoIGVudGl0eURhdGVGaWVsZHMgKSApIHtcblx0XHRyZXR1cm4gZW50aXRpZXM7XG5cdH1cblx0Y29uc3QgZm9ybWF0dGVkRW50aXRpZXMgPSBbXTtcblx0ZW50aXRpZXMuZm9yRWFjaCggKCBlbnRpdHkgKSA9PiB7XG5cdFx0Zm9ybWF0dGVkRW50aXRpZXMucHVzaCggZm9ybWF0RGF0ZXNPbkVudGl0eShcblx0XHRcdGVudGl0eSxcblx0XHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0XHRmb3JtYXQsXG5cdFx0XHRsb2NhbCxcblx0XHQpICk7XG5cdH0gKTtcblx0cmV0dXJuIGZvcm1hdHRlZEVudGl0aWVzO1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlIGZpZWxkcyBvbiB0aGUgcHJvdmlkZWQgZW50aXR5LiAgRG9lcyBub3QgbXV0YXRlIG9yaWdpbmFsXG4gKiBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gZW50aXR5ICBBbiBlbnRpdHlcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyAgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBmb3JtYXQgIFRoZSBmb3JtYXQgdG8gdHJhbnNmb3JtIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyB0by5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBPYmplY3QgfSAgUmV0dXJucyBhIG5ldyBlbnRpdHkgd2l0aCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgZm9ybWF0dGVkXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlc09uRW50aXR5ID0gKFxuXHRlbnRpdHkgPSB7fSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRmb3JtYXQgPSBkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX0lTTzg2MDEsXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRjb25zdCBuZXdFbnRpdHkgPSB7IC4uLmVudGl0eSB9O1xuXHRlbnRpdHlEYXRlRmllbGRzLmZvckVhY2goICggZGF0ZUZpZWxkICkgPT4ge1xuXHRcdGlmICggbmV3RW50aXR5WyBkYXRlRmllbGQgXSApIHtcblx0XHRcdG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0gPSBkYXRlRm9ybWF0cy5mb3JtYXREYXRlU3RyaW5nKFxuXHRcdFx0XHRuZXdFbnRpdHlbIGRhdGVGaWVsZCBdLFxuXHRcdFx0XHRmb3JtYXQsXG5cdFx0XHRcdGxvY2FsLFxuXHRcdFx0KTtcblx0XHR9XG5cdH0gKTtcblx0cmV0dXJuIG5ld0VudGl0eTtcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgdG8gbXlzcWwgZm9ybWF0IG9uIHByb3ZpZGVkIGVudGl0aWVzLiAgRG9lcyBub3RcbiAqIG11dGF0ZSBvcmlnaW5hbCBlbnRpdGllcy5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzICBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBBcnJheSB9ICBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIG5ldyBlbnRpdGllcyB3aXRoIHRoZSBkYXRlIGZpZWxkXG4gKiAgIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEVudGl0aWVzRGF0ZXNUb015c3FsID0gKFxuXHRlbnRpdGllcyA9IFtdLFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRyZXR1cm4gZm9ybWF0RGF0ZXNPbkVudGl0aWVzKFxuXHRcdGVudGl0aWVzLFxuXHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0ZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9NWVNRTCxcblx0XHRsb2NhbCxcblx0KTtcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgdG8gbXlzcWwgZm9ybWF0IG9uIHByb3ZpZGVkIGVudGl0eS4gIERvZXMgbm90XG4gKiBtdXRhdGUgb3JpZ2luYWwgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGVudGl0eSAgQW4gYXJyYXkgb2YgZW50aXR5IG9iamVjdHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyAgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICBXaGV0aGVyIG9yIG5vdCB0byBjb252ZXJ0IHRoZSBkYXRlIGZpZWxkIHZhbHVlXG4gKiAgIHRvIHRoZSBsb2NhbCB0aW1lem9uZSBmb3IgdGhlIGhvc3QuXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gIFJldHVybnMgYSBuZXcgZW50aXR5IHdpdGggdGhlIGRhdGUgZmllbGQgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RW50aXR5RGF0ZXNUb015c3FsID0gKFxuXHRlbnRpdHkgPSB7fSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0cmV0dXJuIGZvcm1hdERhdGVzT25FbnRpdHkoXG5cdFx0ZW50aXR5LFxuXHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0ZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9NWVNRTCxcblx0XHRsb2NhbCxcblx0KTtcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgdG8gdGhlIHNpdGUgZm9ybWF0IG9uIHByb3ZpZGVkIGVudGl0aWVzLiAgRG9lcyBub3RcbiAqIG11dGF0ZSBvcmlnaW5hbCBlbnRpdGllcy5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzICBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBBcnJheSB9ICBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIG5ldyBlbnRpdGllcyB3aXRoIHRoZSBkYXRlIGZpZWxkXG4gKiAgIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEVudGl0aWVzRGF0ZXNUb1NpdGUgPSAoXG5cdGVudGl0aWVzID0gW10sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0bG9jYWwgPSB0cnVlLFxuKSA9PiB7XG5cdHJldHVybiBmb3JtYXREYXRlc09uRW50aXRpZXMoXG5cdFx0ZW50aXRpZXMsXG5cdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHRkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX1NJVEUsXG5cdFx0bG9jYWwsXG5cdCk7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIHRvIHRoZSBzaXRlIGZvcm1hdCBvbiBwcm92aWRlZCBlbnRpdHkuICBEb2VzIG5vdFxuICogbXV0YXRlIG9yaWdpbmFsIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHkgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IE9iamVjdCB9ICBSZXR1cm5zIGEgbmV3IGVudGl0eSB3aXRoIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEVudGl0eURhdGVzVG9TaXRlID0gKFxuXHRlbnRpdHkgPSB7fSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0cmV0dXJuIGZvcm1hdERhdGVzT25FbnRpdHkoXG5cdFx0ZW50aXR5LFxuXHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0ZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9TSVRFLFxuXHRcdGxvY2FsLFxuXHQpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBkYXRlIGZpZWxkIHZhbHVlcyB0byBtb21lbnQgb2JqZWN0cyBmb3IgdGhlIHByb3ZpZGVkIGVudGl0aWVzLlxuICogRG9lcyBub3QgbXV0YXRlIG9yaWdpbmFsIGVudGl0aWVzLlxuICpcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXRpZXMgQW4gYXJyYXkgb2YgZW50aXR5IG9iamVjdHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEByZXR1cm4geyBBcnJheSB9IFJldHVybnMgYSBuZXcgYXJyYXkgb2YgbmV3IGVudGl0aWVzIHdpdGggdGhlIGRhdGUgZmllbGRcbiAqICAgdmFsdWVzIGNvbnZlcnRlZCB0byBtb21lbnQgb2JqZWN0cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRFbnRpdGllc0RhdGVzVG9Nb21lbnQgPSAoXG5cdGVudGl0aWVzID0gW10sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcbikgPT4ge1xuXHRpZiAoIGlzRW1wdHkoIGVudGl0aWVzICkgfHwgaXNFbXB0eSggZW50aXR5RGF0ZUZpZWxkcyApICkge1xuXHRcdHJldHVybiBlbnRpdGllcztcblx0fVxuXHRjb25zdCBmb3JtYXR0ZWRFbnRpdGllcyA9IFtdO1xuXHRlbnRpdGllcy5mb3JFYWNoKCAoIGVudGl0eSApID0+IHtcblx0XHRmb3JtYXR0ZWRFbnRpdGllcy5wdXNoKCBjb252ZXJ0RW50aXR5RGF0ZXNUb01vbWVudChcblx0XHRcdGVudGl0eSxcblx0XHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0KSApO1xuXHR9ICk7XG5cdHJldHVybiBmb3JtYXR0ZWRFbnRpdGllcztcbn07XG5cbi8qKlxuICogQ29udmVydHMgZGF0ZSBmaWVsZCB2YWx1ZXMgdG8gbW9tZW50IG9iamVjdHMgZm9yIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKiBEb2VzIG5vdCBtdXRhdGUgb3JpZ2luYWwgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGVudGl0eSBBbiBlbnRpdHkuXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gUmV0dXJucyBhIG5ldyBlbnRpdHkgd2l0aCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgY29udmVydGVkXG4gKiAgIHRvIG1vbWVudCBvYmplY3RzLlxuICovXG5leHBvcnQgY29uc3QgY29udmVydEVudGl0eURhdGVzVG9Nb21lbnQgPSAoXG5cdGVudGl0eSA9IHt9LFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG4pID0+IHtcblx0Y29uc3QgbmV3RW50aXR5ID0geyAuLi5lbnRpdHkgfTtcblx0ZW50aXR5RGF0ZUZpZWxkcy5mb3JFYWNoKCAoIGRhdGVGaWVsZCApID0+IHtcblx0XHRpZiAoIG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0gKSB7XG5cdFx0XHRuZXdFbnRpdHlbIGRhdGVGaWVsZCBdID0gZGF0ZUZvcm1hdHMuc3RyaW5nVG9Nb21lbnQoXG5cdFx0XHRcdG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0sXG5cdFx0XHQpO1xuXHRcdH1cblx0fSApO1xuXHRyZXR1cm4gbmV3RW50aXR5O1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0FycmF5LCBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBRVUVSWV9PUkRFUl9BU0MgPSAnQVNDJztcbmV4cG9ydCBjb25zdCBRVUVSWV9PUkRFUl9ERVNDID0gJ0RFU0MnO1xuZXhwb3J0IGNvbnN0IEFMTE9XRURfT1JERVJfVkFMVUVTID0gWyAnYXNjJywgJ2Rlc2MnLCAnQVNDJywgJ0RFU0MnIF07XG5leHBvcnQgY29uc3QgR1JFQVRFUl9USEFOID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPicgKTtcbmV4cG9ydCBjb25zdCBMRVNTX1RIQU4gPSBlbmNvZGVVUklDb21wb25lbnQoICc8JyApO1xuZXhwb3J0IGNvbnN0IEdSRUFURVJfVEhBTl9BTkRfRVFVQUwgPSBlbmNvZGVVUklDb21wb25lbnQoICc+PScgKTtcbmV4cG9ydCBjb25zdCBMRVNTX1RIQU5fQU5EX0VRVUFMID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPD0nICk7XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcGFyYW0geyBmdW5jdGlvbiB9IHdoZXJlQ29uZGl0aW9ucyAgQSBmdW5jdGlvbiBmb3IgcHJlcHBpbmcgdGhlIHdoZXJlXG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbmRpdGlvbnMgZnJvbSB0aGUgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgZnVuY3Rpb24gfSBtYXBPcmRlckJ5XHRcdEEgZnVuY3Rpb24gZm9yIG1hcHBpbmcgaW5jb21pbmcgb3JkZXJfYnlcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0c3RyaW5ncyB0byB0aGUgdmFsdWUgbmVlZGVkIGZvciB0aGVcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0cXVlcnlfc3RyaW5nLlxuICogQHJldHVybiB7IHN0cmluZyB9ICBcdFx0XHRcdFx0UmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoXG5cdHF1ZXJ5RGF0YSA9IHt9LFxuXHR3aGVyZUNvbmRpdGlvbnMgPSAoKSA9PiBudWxsLFxuXHRtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4gb3JkZXJCeSxcbikgPT4ge1xuXHRjb25zdCB3aGVyZSA9IHdoZXJlQ29uZGl0aW9ucyggcXVlcnlEYXRhICk7XG5cdGNvbnN0IHsgbGltaXQsIG9yZGVyLCBvcmRlckJ5LCBkZWZhdWx0V2hlcmVDb25kaXRpb25zIH0gPSBxdWVyeURhdGE7XG5cdGNvbnN0IHF1ZXJ5UGFyYW1zID0gW107XG5cdGlmICggISBpc1VuZGVmaW5lZCggbGltaXQgKSApIHtcblx0XHRxdWVyeVBhcmFtcy5wdXNoKCBgbGltaXQ9JHsgbGltaXQgfWAgKTtcblx0fVxuXHRpZiAoICEgaXNVbmRlZmluZWQoIGRlZmF1bHRXaGVyZUNvbmRpdGlvbnMgKSApIHtcblx0XHRxdWVyeVBhcmFtcy5wdXNoKFxuXHRcdFx0YGRlZmF1bHRfd2hlcmVfY29uZGl0aW9ucz0keyBkZWZhdWx0V2hlcmVDb25kaXRpb25zIH1gXG5cdFx0KTtcblx0fVxuXHRpZiAoICEgaXNVbmRlZmluZWQoIG1hcE9yZGVyQnkoIG9yZGVyQnkgKSApICkge1xuXHRcdGlmICggaXNBcnJheSggbWFwT3JkZXJCeSggb3JkZXJCeSApICkgKSB7XG5cdFx0XHRmb3IgKCBjb25zdCBmaWVsZCBvZiBtYXBPcmRlckJ5KCBvcmRlckJ5ICkgKSB7XG5cdFx0XHRcdHF1ZXJ5UGFyYW1zLnB1c2goIGBvcmRlcl9ieVskeyBmaWVsZCB9XT0keyBvcmRlciB9YCApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRxdWVyeVBhcmFtcy5wdXNoKCBgb3JkZXI9JHsgb3JkZXIgfWAgKTtcblx0XHRcdHF1ZXJ5UGFyYW1zLnB1c2goIGBvcmRlcl9ieT0keyBtYXBPcmRlckJ5KCBvcmRlckJ5ICkgfWAgKTtcblx0XHR9XG5cdH1cblx0bGV0IHF1ZXJ5U3RyaW5nID0gcXVlcnlQYXJhbXMuam9pbiggJyYnICk7XG5cdGlmICggd2hlcmUgKSB7XG5cdFx0cXVlcnlTdHJpbmcgKz0gJyYnICsgd2hlcmU7XG5cdH1cblx0cmV0dXJuIHF1ZXJ5U3RyaW5nO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdjaGVja2luJztcblxuZXhwb3J0IGNvbnN0IENIRUNLSU5fU1RBVFVTX0lEID0ge1xuXHRTVEFUVVNfQ0hFQ0tFRF9PVVQ6IGZhbHNlLFxuXHRTVEFUVVNfQ0hFQ0tFRF9JTjogdHJ1ZSxcblx0U1RBVFVTX0NIRUNLRURfTkVWRVI6IDIsXG59O1xuXG5leHBvcnQgY29uc3QgQ0hFQ0tJTl9TVEFUVVNfSURTID0gdmFsdWVzKFxuXHRDSEVDS0lOX1NUQVRVU19JRFxuKTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBwcmV0dHlTdGF0dXMgfSBmcm9tICcuLi9zdGF0dXMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcbn0gZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgKiBhcyBjaGVja2luU3RhdHVzIGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRmb3JEYXRldGltZUlkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JFdmVudElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JSZWdpc3RyYXRpb25JZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yVGlja2V0SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclN0YXR1c0lkOiBQcm9wVHlwZXMub25lT2YoIGNoZWNraW5TdGF0dXMuQ0hFQ0tJTl9TVEFUVVNfSURTICksXG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0XHQnQ0hLX0lEJyxcblx0XHRcdCdSRUdfSUQnLFxuXHRcdFx0J0NIS190aW1lc3RhbXAnLFxuXHRcdFx0J0RUVF9JRCcsXG5cdFx0XSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdH0gKSxcbn07XG5cbmV4cG9ydCBjb25zdCBvcHRpb25zRW50aXR5TWFwID0ge1xuXHRkZWZhdWx0OiAoKSA9PiB7XG5cdFx0cmV0dXJuIFtcblx0XHRcdHtcblx0XHRcdFx0bGFiZWw6IHByZXR0eVN0YXR1cyhcblx0XHRcdFx0XHRjaGVja2luU3RhdHVzLkNIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX09VVFxuXHRcdFx0XHQpLFxuXHRcdFx0XHR2YWx1ZTogY2hlY2tpblN0YXR1cy5DSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9PVVQsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJlbDogcHJldHR5U3RhdHVzKFxuXHRcdFx0XHRcdGNoZWNraW5TdGF0dXMuQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfSU5cblx0XHRcdFx0KSxcblx0XHRcdFx0dmFsdWU6IGNoZWNraW5TdGF0dXMuQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfSU4sXG5cdFx0XHR9LFxuXHRcdF07XG5cdH0sXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdDSEtfdGltZXN0YW1wJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhIHJlZ2lzdHJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0dGltZXN0YW1wOiAnQ0hLX3RpbWVzdGFtcCcsXG5cdFx0aWQ6ICdDSEtfSUQnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiByZWdpc3RyYXRpb25zIGVuZHBvaW50IHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRGF0ZXRpbWVJZCAgICBcdElEIG9mIEV2ZW50IHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRXZlbnRJZCAgICBJRCBvZiBBdHRlbmRlZSB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvclJlZ2lzdHJhdGlvbklkIElEIG9mIFRyYW5zYWN0aW9uIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yVGlja2V0SWQgXHRcdElEIG9mIFRpY2tldCB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtzdHJpbmd9IGZvclN0YXR1c0lkIFx0XHRJRCBvZiBTdGF0dXMgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgXHRUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRGF0ZXRpbWVJZCA9IDAsXG5cdGZvckV2ZW50SWQgPSAwLFxuXHRmb3JSZWdpc3RyYXRpb25JZCA9IDAsXG5cdGZvclRpY2tldElkID0gMCxcblx0Zm9yU3RhdHVzSWQgPSAnJyxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cdGZvckV2ZW50SWQgPSBwYXJzZUludCggZm9yRXZlbnRJZCwgMTAgKTtcblx0aWYgKCBmb3JFdmVudElkICE9PSAwICYmICEgaXNOYU4oIGZvckV2ZW50SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbUmVnaXN0cmF0aW9uLkVWVF9JRF09JyArIGZvckV2ZW50SWQgKTtcblx0fVxuXHRmb3JEYXRldGltZUlkID0gcGFyc2VJbnQoIGZvckRhdGV0aW1lSWQsIDEwICk7XG5cdGlmICggZm9yRGF0ZXRpbWVJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JEYXRldGltZUlkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0RUVF9JRF09JyArIGZvckRhdGV0aW1lSWQgKTtcblx0fVxuXHRmb3JSZWdpc3RyYXRpb25JZCA9IHBhcnNlSW50KCBmb3JSZWdpc3RyYXRpb25JZCwgMTAgKTtcblx0aWYgKCBmb3JSZWdpc3RyYXRpb25JZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JSZWdpc3RyYXRpb25JZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtSRUdfSURdPScgKyBmb3JSZWdpc3RyYXRpb25JZCApO1xuXHR9XG5cdGZvclRpY2tldElkID0gcGFyc2VJbnQoIGZvclRpY2tldElkLCAxMCApO1xuXHRpZiAoIGZvclRpY2tldElkICE9PSAwICYmICEgaXNOYU4oIGZvclRpY2tldElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1JlZ2lzdHJhdGlvbi5US1RfSURdPScgKyBmb3JUaWNrZXRJZCApO1xuXHR9XG5cdGlmICggZm9yU3RhdHVzSWQgIT09ICcnICYmIGZvclN0YXR1c0lkICE9PSBudWxsICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtDSEtfaW5dPScgKyBmb3JTdGF0dXNJZCApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwiaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAnZGF0ZXRpbWUnO1xuXG5leHBvcnQgY29uc3QgREFURVRJTUVfU1RBVFVTX0lEID0ge1xuXHRBQ1RJVkU6ICdEVEEnLFxuXHRDQU5DRUxMRUQ6ICdEVEMnLFxuXHRFWFBJUkVEOiAnRFRFJyxcblx0SU5BQ1RJVkU6ICdEVEknLFxuXHRQT1NUUE9ORUQ6ICdEVFAnLFxuXHRTT0xEX09VVDogJ0RUUycsXG5cdFRSQVNIRUQ6ICdEVFQnLFxuXHRVUENPTUlORzogJ0RUVScsXG59O1xuXG5leHBvcnQgY29uc3QgREFURVRJTUVfU1RBVFVTX0lEUyA9IHZhbHVlcyggREFURVRJTUVfU1RBVFVTX0lEICk7XG5cbmV4cG9ydCBjb25zdCBNSU5VVEVfSU5fU0VDT05EUyA9IDYwO1xuZXhwb3J0IGNvbnN0IEhPVVJfSU5fU0VDT05EUyA9IE1JTlVURV9JTl9TRUNPTkRTICogNjA7XG5leHBvcnQgY29uc3QgREFZX0lOX1NFQ09ORFMgPSBIT1VSX0lOX1NFQ09ORFMgKiAyNDtcbmV4cG9ydCBjb25zdCBXRUVLX0lOX1NFQ09ORFMgPSBIT1VSX0lOX1NFQ09ORFMgKiA3O1xuZXhwb3J0IGNvbnN0IE1PTlRIX0lOX1NFQ09ORFMgPSBEQVlfSU5fU0VDT05EUyAqIDMwO1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCAqIGFzIGJhc2VGb3JtYXR0ZXIgZnJvbSAnLi4vYmFzZS1kYXRlLWZvcm1hdHRlcic7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBmb3JPd24sIHB1bGxBdCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge1xuXHRUSU1FX0ZPUk1BVF9TSVRFLFxuXHREQVRFX1RJTUVfRk9STUFUX1NJVEUsXG5cdGFsbERhdGVUaW1lc0FzU3RyaW5nLFxuXHRTRVBBUkFUT1JfU1BBQ0VfREFTSF9TUEFDRSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaGVscGVycyc7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEFycmF5IG9mIGZpZWxkcyB0aGF0IGhhdmUgZGF0ZSBpbmZvcm1hdGlvblxuICogQHR5cGUgeyBzdHJpbmdbXSB9XG4gKi9cbmV4cG9ydCBjb25zdCBEQVRFX0ZJRUxEUyA9IFtcblx0J0RUVF9FVlRfc3RhcnQnLFxuXHQnRFRUX0VWVF9lbmQnLFxuXTtcblxuLyoqXG4gKiBXaWxsIGhvbGQgdGhlIGR5bmFtaWNhbGx5IGdlbmVyYXRlZCBsaXN0IG9mIGZvcm1hdHRlcnMgZm9yIGRhdGVzLiAgRm9ybWF0dGVyc1xuICogYXJlIGZ1bmN0aW9ucyBkZWZpbmVkIGluIGAuLi9iYXNlLWRhdGUtZm9ybWF0dGVyYCBidXQgd3JhcHBlZCBieSBkeW5hbWljYWxseVxuICogZ2VuZXJhdGVkIGZ1bmN0aW9ucyAoY2FsbGFibGUgdmlhIHNhbWUgbmFtZSkgdGhhdCBhdXRvbWF0aWNhbGx5IHJlY2VpdmUgdGhlXG4gKiBjb3JyZWN0IGRhdGVGaWVsZHNNYXAgYXJndW1lbnQuXG4gKlxuICogRWcuICBgLi4vYmFzZS1kYXRlLWZvcm1hdHRlciBoYXNcbiAqIGZvcm1hdERhdGVzT25FbnRpdGllcyggZW50aXRpZXMsIGVudGl0eURhdGVGaWVsZHMsIGZvcm1hdCwgbG9jYWwgKTtcbiAqIFdoZW4gaW1wb3J0aW5nIGBmb3JtYXREYXRlc09uRW50aXRpZXNgIGZyb20gdGhpcyBmaWxlLCB5b3UgY2FuIGNhbGwgaXQgc2ltcGx5XG4gKiBieSBkb2luZyB0aGlzOlxuICpcbiAqIGZvcm1hdERhdGVzT25FbnRpdGllcyggZGF0ZVRpbWVPYmplY3RzLCBmb3JtYXQsIGxvY2FsICk7XG4gKlxuICogTm90aWNlIHRoYXQgaXQncyBjYWxsZWQgd2l0aG91dCB0aGUgZW50aXR5RGF0ZUZpZWxkcyBhcmd1bWVudCBiZWNhdXNlIHRoYXQnc1xuICogcHJvdmlkZWQgYnkgdGhpcyBnZW5lcmF0b3IuXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBmb3JtYXR0ZXJzID0ge307XG5cbmZvck93biggYmFzZUZvcm1hdHRlciwgKCBpbXBsZW1lbnRhdGlvbiwgZnVuY3Rpb25OYW1lICkgPT4ge1xuXHRmb3JtYXR0ZXJzWyBmdW5jdGlvbk5hbWUgXSA9ICggLi4uaW5jb21pbmdBcmdzICkgPT4ge1xuXHRcdGNvbnN0IGZpcnN0QXJnID0gcHVsbEF0KCBpbmNvbWluZ0FyZ3MsIDAgKTtcblx0XHRyZXR1cm4gaW1wbGVtZW50YXRpb24oIGZpcnN0QXJnWyAwIF0sIERBVEVfRklFTERTLCAuLi5pbmNvbWluZ0FyZ3MgKTtcblx0fTtcbn0gKTtcblxuLyoqXG4gKiBUaGlzIHdpbGwgc3BpdCBvdXQgYSBwcmV0dGlmaWVkIGxhYmVsIGZvciB0aGUgcHJvdmlkZWQgRGF0ZVRpbWUgZW50aXR5LlxuICpcbiAqIElmIHRoZXJlIGlzIGEgRFRUX25hbWUsIHRoZSBmb3JtYXQgd2lsbCBiZTpcbiAqIGBEVFRfbmFtZSAoRFRUX0VWVF9zdGFydCAtIERUVF9FVlRfZW5kKWBcbiAqXG4gKiBJZiBubyBEVFRfbmFtZSB0aGVuOlxuICogYERUVF9FVlRfc3RhcnQgLSBEVFRfRVZUX2VuZGBcbiAqXG4gKiBUaGlzIHdpbGwgYWNjb3VudCBmb3IgaWYgYm90aCBzdGFydCBhbmQgZW5kIGFyZSBpbiB0aGUgc2FtZSBkYXkgYW5kIHNpbXBseVxuICogdXNlIHRpbWUgZm9yIHRoZSBlbmQgcGFydC5cbiAqXG4gKiBAcGFyYW0geyBCYXNlRW50aXR5IH0gRGF0ZVRpbWVFbnRpdHlcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgQSBmb3JtYXR0ZWQgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcHJvdmlkZWRcbiAqICAgIERhdGVUaW1lRW50aXR5LlxuICovXG5leHBvcnQgY29uc3QgcHJldHR5RGF0ZUZyb21EYXRlVGltZSA9ICggRGF0ZVRpbWVFbnRpdHkgKSA9PiB7XG5cdGxldCBjb250ZW50ID0gJyc7XG5cdGlmICggaXNNb2RlbEVudGl0eU9mTW9kZWwoIERhdGVUaW1lRW50aXR5LCAnZGF0ZXRpbWUnICkgKSB7XG5cdFx0aWYgKCBEYXRlVGltZUVudGl0eS5EVFRfRVZUX3N0YXJ0Lmhhc1NhbWUoXG5cdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX2VuZCxcblx0XHRcdCdkYXknXG5cdFx0KSApIHtcblx0XHRcdGNvbnRlbnQgKz0gYWxsRGF0ZVRpbWVzQXNTdHJpbmcoXG5cdFx0XHRcdFNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFLFxuXHRcdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX3N0YXJ0LnRvRm9ybWF0KFxuXHRcdFx0XHRcdERBVEVfVElNRV9GT1JNQVRfU0lURVxuXHRcdFx0XHQpLFxuXHRcdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX2VuZC50b0Zvcm1hdChcblx0XHRcdFx0XHRUSU1FX0ZPUk1BVF9TSVRFXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb250ZW50ICs9IGFsbERhdGVUaW1lc0FzU3RyaW5nKFxuXHRcdFx0XHRTRVBBUkFUT1JfU1BBQ0VfREFTSF9TUEFDRSxcblx0XHRcdFx0RGF0ZVRpbWVFbnRpdHkuRFRUX0VWVF9zdGFydC50b0Zvcm1hdChcblx0XHRcdFx0XHREQVRFX1RJTUVfRk9STUFUX1NJVEVcblx0XHRcdFx0KSxcblx0XHRcdFx0RGF0ZVRpbWVFbnRpdHkuRFRUX0VWVF9lbmQudG9Gb3JtYXQoXG5cdFx0XHRcdFx0REFURV9USU1FX0ZPUk1BVF9TSVRFXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRjb250ZW50ID0gRGF0ZVRpbWVFbnRpdHkuRFRUX25hbWUgP1xuXHRcdFx0YCR7IERhdGVUaW1lRW50aXR5LkRUVF9uYW1lIH0gKCR7IGNvbnRlbnQgfSlgIDpcblx0XHRcdGNvbnRlbnQ7XG5cdH1cblx0cmV0dXJuIGNvbnRlbnQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtYXR0ZXJzO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG5leHBvcnQgKiBmcm9tICcuL2Zvcm1hdHRlcic7XG5leHBvcnQgKiBmcm9tICcuL3N0YXR1cy1oZWxwZXInO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfREVTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG5cdEdSRUFURVJfVEhBTixcblx0R1JFQVRFUl9USEFOX0FORF9FUVVBTCxcblx0TEVTU19USEFOX0FORF9FUVVBTCxcbn0gZnJvbSAnLi4vYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBub3dEYXRlQW5kVGltZSA9IG1vbWVudCgpO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0XHQnRFRUX25hbWUnLFxuXHRcdFx0J0RUVF9JRCcsXG5cdFx0XHQnc3RhcnRfZGF0ZScsXG5cdFx0XHQnZW5kX2RhdGUnLFxuXHRcdF0gKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHRcdHNob3dFeHBpcmVkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRtb250aDogUHJvcFR5cGVzLm1vbnRoLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0XHRzaG93RXhwaXJlZDogYm9vbGVhblxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDEwMCxcblx0XHRvcmRlckJ5OiAnc3RhcnRfZGF0ZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdFx0c2hvd0V4cGlyZWQ6IGZhbHNlLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGFuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHRzdGFydF9kYXRlOiAnRFRUX0VWVF9zdGFydCcsXG5cdFx0ZW5kX2RhdGU6ICdEVFRfRVZUX2VuZCcsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIGV2ZW50cyBlbmRwb2ludCByZXF1ZXN0IHVzaW5nIHByb3ZpZGVkXG4gKiBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRXZlbnRJZCAgSUQgZm9yIEV2ZW50IHRvIHJldHJpZXZlIGRhdGV0aW1lcyBmcm9tXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3dFeHBpcmVkICBXaGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIGV4cGlyZWQgZXZlbnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IG1vbnRoICAgICAgICAgUmV0dXJuIGV2ZW50cyBmb3IgdGhlIGdpdmVuIG1vbnRoLiAgQ2FuIGJlIGFueVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBhbnkgbW9udGggZm9ybWF0IHJlY29nbml6ZWQgYnkgbW9tZW50LlxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICBUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdHNob3dFeHBpcmVkID0gZmFsc2UsXG5cdG1vbnRoID0gJ25vbmUnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0aWYgKCAhIHNob3dFeHBpcmVkICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRFRUX0VWVF9lbmQqKmV4cGlyZWRdW109JyArIEdSRUFURVJfVEhBTiArXG5cdFx0XHQnJndoZXJlW0RUVF9FVlRfZW5kKipleHBpcmVkXVtdPScgK1xuXHRcdFx0bm93RGF0ZUFuZFRpbWUubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0aWYgKCBtb250aCAmJiBtb250aCAhPT0gJ25vbmUnICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRFRUX0VWVF9zdGFydF1bXT0nICsgR1JFQVRFUl9USEFOX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW0RUVF9FVlRfc3RhcnRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5zdGFydE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEVFRfRVZUX2VuZF1bXT0nICsgTEVTU19USEFOX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW0RUVF9FVlRfZW5kXVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuZW5kT2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRpZiAoIHBhcnNlSW50KCBmb3JFdmVudElkLCAxMCApICE9PSAwICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtFdmVudC5FVlRfSURdPScgKyBmb3JFdmVudElkICk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBEQVRFVElNRV9TVEFUVVNfSUQsIE1PREVMX05BTUUsIE1PTlRIX0lOX1NFQ09ORFMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG4gKi9cbmNvbnN0IGFzc2VydERhdGVUaW1lRW50aXR5ID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcblx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBEYXRlVGltZUVudGl0eSwgTU9ERUxfTkFNRSApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHQnVGhlIHByb3ZpZGVkIGVudGl0eSBpcyBub3QgYSBkYXRldGltZSBpbnN0YW5jZSdcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlVHJhc2hlZCBpZiB0cnVlIHdpbGwgbm90IGZpbHRlciBvdXQgdHJhc2hlZCBlbnRpdGllc1xuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBldmVudCBkYXRlIGlzIHZhbGlkIGVudGl0eSBvciBhcmNoaXZlXG4gKi9cbmNvbnN0IGlzVmFsaWRFbnRpdHlPckFyY2hpdmUgPSAoIERhdGVUaW1lRW50aXR5LCBpbmNsdWRlVHJhc2hlZCApID0+IHtcblx0cmV0dXJuICggaW5jbHVkZVRyYXNoZWQgJiYgYXNzZXJ0RGF0ZVRpbWVFbnRpdHkoIERhdGVUaW1lRW50aXR5ICkgKSB8fFxuICAgICAgICAoICEgaW5jbHVkZVRyYXNoZWQgJiYgISBpc1RyYXNoZWQoIERhdGVUaW1lRW50aXR5ICkgKTtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVUcmFzaGVkIGlmIHRydWUgd2lsbCBub3QgZmlsdGVyIG91dCB0cmFzaGVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGV2ZW50IGRhdGUgaXMgb2NjdXJyaW5nIE5PV1xuICovXG5leHBvcnQgY29uc3QgaXNBY3RpdmUgPSAoIERhdGVUaW1lRW50aXR5LCBpbmNsdWRlVHJhc2hlZCA9IGZhbHNlICkgPT4ge1xuXHRyZXR1cm4gaXNWYWxpZEVudGl0eU9yQXJjaGl2ZSggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkICkgJiZcblx0RGF0ZVRpbWVFbnRpdHkuc3RhcnQuZGlmZk5vdygpLmFzU2Vjb25kcygpIDwgMCAmJlxuXHREYXRlVGltZUVudGl0eS5lbmQuZGlmZk5vdygpLmFzU2Vjb25kcygpID4gMDtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVUcmFzaGVkIGlmIHRydWUgd2lsbCBub3QgZmlsdGVyIG91dCB0cmFzaGVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGVuZCBkYXRlIGlzIGluIHRoZSBwYXN0XG4gKi9cbmV4cG9ydCBjb25zdCBpc0V4cGlyZWQgPSAoIERhdGVUaW1lRW50aXR5LCBpbmNsdWRlVHJhc2hlZCA9IGZhbHNlICkgPT4ge1xuXHRyZXR1cm4gaXNWYWxpZEVudGl0eU9yQXJjaGl2ZSggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkICkgJiZcblx0RGF0ZVRpbWVFbnRpdHkuZW5kLmRpZmZOb3coKS5hc1NlY29uZHMoKSA8IDA7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlVHJhc2hlZCBpZiB0cnVlIHdpbGwgbm90IGZpbHRlciBvdXQgdHJhc2hlZCBlbnRpdGllc1xuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBlbmQgZGF0ZSBpcyBpbiB0aGUgcGFzdFxuICovXG5leHBvcnQgY29uc3QgaXNSZWNlbnRseUV4cGlyZWQgPSAoIERhdGVUaW1lRW50aXR5LCBpbmNsdWRlVHJhc2hlZCA9IGZhbHNlICkgPT4ge1xuXHRyZXR1cm4gaXNWYWxpZEVudGl0eU9yQXJjaGl2ZSggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkICkgJiZcblx0RGF0ZVRpbWVFbnRpdHkuZW5kLmRpZmZOb3coKS5hc1NlY29uZHMoKSA8IDAgJiZcblx0RGF0ZVRpbWVFbnRpdHkuZW5kLmRpZmZOb3coKS5hc1NlY29uZHMoKSA+ICggTU9OVEhfSU5fU0VDT05EUyAqIC0xICk7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlVHJhc2hlZCBpZiB0cnVlIHdpbGwgbm90IGZpbHRlciBvdXQgdHJhc2hlZCBlbnRpdGllc1xuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aWNrZXRzIHNvbGQgbWVldHMgb3IgZXhjZWVkcyByZWdpc3RyYXRpb24gbGltaXRcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU29sZE91dCA9ICggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkID0gZmFsc2UgKSA9PiB7XG5cdGlmIChcblx0XHQoIGluY2x1ZGVUcmFzaGVkICYmICEgYXNzZXJ0RGF0ZVRpbWVFbnRpdHkoIERhdGVUaW1lRW50aXR5ICkgKSB8fFxuXHRcdCggISBpbmNsdWRlVHJhc2hlZCAmJiBpc1RyYXNoZWQoIERhdGVUaW1lRW50aXR5ICkgKVxuXHQpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Y29uc3QgY2FwID0gRGF0ZVRpbWVFbnRpdHkucmVnTGltaXQ7XG5cdHJldHVybiAoIGNhcCAhPT0gbnVsbCAmJiBjYXAgIT09ICdJTkYnICYmIGNhcCAhPT0gSW5maW5pdHkgJiYgY2FwICE9PSAtMSApICYmXG5cdFx0RGF0ZVRpbWVFbnRpdHkuc29sZCA+PSBjYXA7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlVHJhc2hlZCBpZiB0cnVlIHdpbGwgbm90IGZpbHRlciBvdXQgdHJhc2hlZCBlbnRpdGllc1xuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBzdGFydCBkYXRlIGlzIGluIHRoZSBmdXR1cmVcbiAqL1xuZXhwb3J0IGNvbnN0IGlzVXBjb21pbmcgPSAoIERhdGVUaW1lRW50aXR5LCBpbmNsdWRlVHJhc2hlZCA9IGZhbHNlICkgPT4ge1xuXHRyZXR1cm4gaXNWYWxpZEVudGl0eU9yQXJjaGl2ZSggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkICkgJiZcblx0RGF0ZVRpbWVFbnRpdHkuc3RhcnQuZGlmZk5vdygpLmFzU2Vjb25kcygpID4gMDtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGRhdGUgaXMgYXJjaGl2ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGlzVHJhc2hlZCA9ICggRGF0ZVRpbWVFbnRpdHkgKSA9PiB7XG5cdGFzc2VydERhdGVUaW1lRW50aXR5KCBEYXRlVGltZUVudGl0eSApO1xuXHRyZXR1cm4gRGF0ZVRpbWVFbnRpdHkuZGVsZXRlZDtcbn07XG5cbi8vIFBMWiBOT1RFOlxuLy8gbGVhdmluZyB0aGUgZm9sbG93aW5nIGNvZGUgaW4gYmVjYXVzZSBpdCBjYW4gYmUgdXNlZCBpZi93aGVuIHdlIGRlY2lkZVxuLy8gdG8gZnVsbHkgc3VwcG9ydCB0aGVzZSBkYXRldGltZSBzdGF0dXNlcyB3aGljaCBhcmUgY3VycmVudGx5IGRlZmluZWRcbi8vIG9uIHRoZSBFRV9EYXRldGltZSBtb2RlbCBvYmplY3QgY2xhc3MgYnV0IG5vdCB5ZXQgdXNlZFxuXG4vLyAvKipcbi8vICAqIEBmdW5jdGlvblxuLy8gICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuLy8gICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBkYXRlIGlzIGNhbmNlbGxlZFxuLy8gICovXG4vLyBleHBvcnQgY29uc3QgaXNDYW5jZWxsZWQgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuLy8gXHRhc3NlcnREYXRlVGltZUVudGl0eSggRGF0ZVRpbWVFbnRpdHkgKTtcbi8vIFx0cmV0dXJuIERhdGVUaW1lRW50aXR5LmNhbmNlbGxlZDtcbi8vIH07XG4vL1xuLy8gLyoqXG4vLyAgKiBAZnVuY3Rpb25cbi8vICAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3Rcbi8vICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZGF0ZSBoYXMgYmVlbiBwb3N0cG9uZWRcbi8vICAqL1xuLy8gZXhwb3J0IGNvbnN0IGlzUG9zdHBvbmVkID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcbi8vIFx0YXNzZXJ0RGF0ZVRpbWVFbnRpdHkoIERhdGVUaW1lRW50aXR5ICk7XG4vLyBcdHJldHVybiBEYXRlVGltZUVudGl0eS5wb3N0cG9uZWQ7XG4vLyB9O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuICogQHJldHVybiB7c3RyaW5nfSBzdGF0dXMgSURcbiAqL1xuZXhwb3J0IGNvbnN0IHN0YXR1cyA9ICggRGF0ZVRpbWVFbnRpdHkgKSA9PiB7XG5cdGlmICggaXNUcmFzaGVkKCBEYXRlVGltZUVudGl0eSApICkge1xuXHRcdHJldHVybiBEQVRFVElNRV9TVEFUVVNfSUQuVFJBU0hFRDtcblx0fVxuXHRpZiAoIGlzRXhwaXJlZCggRGF0ZVRpbWVFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gREFURVRJTUVfU1RBVFVTX0lELkVYUElSRUQ7XG5cdH1cblx0aWYgKCBpc1NvbGRPdXQoIERhdGVUaW1lRW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIERBVEVUSU1FX1NUQVRVU19JRC5TT0xEX09VVDtcblx0fVxuXHRpZiAoIGlzVXBjb21pbmcoIERhdGVUaW1lRW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIERBVEVUSU1FX1NUQVRVU19JRC5VUENPTUlORztcblx0fVxuXHRpZiAoIGlzQWN0aXZlKCBEYXRlVGltZUVudGl0eSApICkge1xuXHRcdHJldHVybiBEQVRFVElNRV9TVEFUVVNfSUQuQUNUSVZFO1xuXHR9XG5cdC8vIFBMWiBTRUUgTk9URSBBQk9WRVxuXHQvLyBpZiAoIGlzQ2FuY2VsbGVkKCBEYXRlVGltZUVudGl0eSApICkge1xuXHQvLyBcdHJldHVybiBEQVRFVElNRV9TVEFUVVNfSUQuQ0FOQ0VMTEVEO1xuXHQvLyB9XG5cdC8vIGlmICggaXNQb3N0cG9uZWQoIERhdGVUaW1lRW50aXR5ICkgKSB7XG5cdC8vIFx0cmV0dXJuIERBVEVUSU1FX1NUQVRVU19JRC5QT1NUUE9ORUQ7XG5cdC8vIH1cblx0YXNzZXJ0RGF0ZVRpbWVFbnRpdHkoIERhdGVUaW1lRW50aXR5ICk7XG5cdHJldHVybiBEQVRFVElNRV9TVEFUVVNfSUQuSU5BQ1RJVkU7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuICogQHJldHVybiB7c3RyaW5nfSAgICBDU1MgY2xhc3MgZm9yIHRoZSBiYWNrZ3JvdW5kIGNvbG9yXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCYWNrZ3JvdW5kQ29sb3JDbGFzcyA9ICggRGF0ZVRpbWVFbnRpdHkgKSA9PiB7XG5cdHJldHVybiBgZWUtc3RhdHVzLWJhY2tncm91bmQtY29sb3ItJHsgc3RhdHVzKCBEYXRlVGltZUVudGl0eSApIH1gO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ30gZGF0ZSBzdGF0dXNcbiAqL1xuZXhwb3J0IGNvbnN0IGdldERhdGVUaW1lU3RhdHVzVGV4dExhYmVsID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcblx0bGV0IGRhdGVTdGF0dXMgPSAnJztcblx0c3dpdGNoICggc3RhdHVzKCBEYXRlVGltZUVudGl0eSApICkge1xuXHRcdGNhc2UgREFURVRJTUVfU1RBVFVTX0lELlNPTERfT1VUIDpcblx0XHRcdGRhdGVTdGF0dXMgPSBfXyggJ3NvbGQgb3V0JywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBEQVRFVElNRV9TVEFUVVNfSUQuRVhQSVJFRCA6XG5cdFx0XHRkYXRlU3RhdHVzID0gX18oICdleHBpcmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBEQVRFVElNRV9TVEFUVVNfSUQuVVBDT01JTkcgOlxuXHRcdFx0ZGF0ZVN0YXR1cyA9IF9fKCAndXBjb21pbmcnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5BQ1RJVkUgOlxuXHRcdFx0ZGF0ZVN0YXR1cyA9IF9fKCAnYWN0aXZlJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBEQVRFVElNRV9TVEFUVVNfSUQuVFJBU0hFRCA6XG5cdFx0XHRkYXRlU3RhdHVzID0gX18oICdhcmNoaXZlZCcsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgREFURVRJTUVfU1RBVFVTX0lELkNBTkNFTExFRCA6XG5cdFx0XHRkYXRlU3RhdHVzID0gX18oICdjYW5jZWxsZWQnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5QT1NUUE9ORUQgOlxuXHRcdFx0ZGF0ZVN0YXR1cyA9IF9fKCAncG9zdHBvbmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBEQVRFVElNRV9TVEFUVVNfSUQuSU5BQ1RJVkUgOlxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRkYXRlU3RhdHVzID0gX18oICdpbmFjdGl2ZScsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHR9XG5cdHJldHVybiBkYXRlU3RhdHVzO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IG1hcFZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdtZW1pemUnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBlbmRwb2ludHMgfSBmcm9tICcuL2VuZHBvaW50cy5qcyc7XG5cbi8qKlxuICogUmVjZWl2ZXMgYW4gb2JqZWN0IG1hcCBvZiBtb2RlbE5hbWUgdG8gZW5kcG9pbnQgYW5kIG1hcHMgdGhhdCB0byBhIGRlZmF1bHRcbiAqIG1hcCBvZiBtb2RlbE5hbWUgdG8gZW1wdHkgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IG1vZGVsTmFtZUVuZHBvaW50c1xuICogQHJldHVybiB7IE9iamVjdCB9IEFuIG9iamVjdCBvZiB7IHsgbW9kZWxOYW1lIH0gOiB7fSB9XG4gKi9cbmNvbnN0IG1hcFRvT2JqZWN0VmFsdWVzID0gKCBtb2RlbE5hbWVFbmRwb2ludHMgKSA9PiB7XG5cdHJldHVybiBtYXBWYWx1ZXMoIG1vZGVsTmFtZUVuZHBvaW50cyxcblx0XHRmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9LFxuXHQpO1xufTtcblxuY29uc3QgZ2V0RGVmYXVsdE1vZGVsRW50aXRpZXNPYmplY3QgPSBtZW1vaXplKFxuXHQoKSA9PiBtYXBUb09iamVjdFZhbHVlcyggZW5kcG9pbnRzIClcbik7XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIGRlZmF1bHQgc3RhdGUgdG8gYmUgdXNlZCBieSBzdG9yZXMgY29udGFpbmluZyBsaXN0cy5cbiAqXG4gKiBAdHlwZSB7IE9iamVjdCB9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xJU1RTX1NUQVRFID0gbWFwVG9PYmplY3RWYWx1ZXMoIGVuZHBvaW50cyApO1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBkZWZhdWx0IHN0YXRlIHRvIGJlIHVzZWQgYnkgdGhlIGNvcmUgc3RvcmUuXG4gKlxuICogQHR5cGUge3tlbnRpdGllczoge30sIGVudGl0eUlkczoge30sIGRpcnR5OiB7fX19XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPUkVfU1RBVEUgPSB7XG5cdGVudGl0aWVzOiB7XG5cdFx0Li4uZ2V0RGVmYXVsdE1vZGVsRW50aXRpZXNPYmplY3QoKSxcblx0fSxcblx0cmVsYXRpb25zOiB7fSxcblx0ZGlydHk6IHtcblx0XHRyZWxhdGlvbnM6IHtcblx0XHRcdGluZGV4OiB7fSxcblx0XHRcdGRlbGV0ZToge30sXG5cdFx0XHRhZGQ6IHt9LFxuXHRcdH0sXG5cdFx0dHJhc2g6IHt9LFxuXHRcdGRlbGV0ZToge30sXG5cdH0sXG59O1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBkZWZhdWx0IHN0YXRlIHRvIGJlIHVzZWQgYnkgdGhlIHNjaGVtYSBzdG9yZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NDSEVNQV9TVEFURSA9IHtcblx0c2NoZW1hOiB7XG5cdFx0Li4uZ2V0RGVmYXVsdE1vZGVsRW50aXRpZXNPYmplY3QoKSxcblx0fSxcblx0ZmFjdG9yeToge1xuXHRcdC4uLmdldERlZmF1bHRNb2RlbEVudGl0aWVzT2JqZWN0KCksXG5cdH0sXG5cdHJlbGF0aW9uRW5kcG9pbnRzOiB7XG5cdFx0Li4uZ2V0RGVmYXVsdE1vZGVsRW50aXRpZXNPYmplY3QoKSxcblx0fSxcblx0cmVsYXRpb25TY2hlbWE6IHt9LFxufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBhc3NlcnRFbnRpdHlIYXNLZXkgfSBmcm9tICcuL2Fzc2VydGlvbnMnO1xuXG4vKipcbiAqIEFsbCBhdmFpbGFibGUgZW5kcG9pbnRzIGV4cG9zZWQgdmlhIHRoZSBlZWpzLmRhdGEgZ2xvYmFsIGZyb20gdGhlIHNlcnZlci5cbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmV4cG9ydCBjb25zdCB7XG5cdGNvbGxlY3Rpb25fZW5kcG9pbnRzOiBlbmRwb2ludHMgPSB7fSxcblx0YmFzZV9yZXN0X3JvdXRlOiBiYXNlUmVzdFJvdXRlLFxufSA9IGRhdGEucGF0aHM7XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBlbmRwb2ludCBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFdoYXQgbW9kZWwgdG8gcmV0cmlldmUgdGhlIGVuZHBvaW50IGZvci5cbiAqIEByZXR1cm4ge3N0cmluZ30gIFRoZSBlbmRwb2ludCBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsLlxuICogQHRocm93cyB7RXhjZXB0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZ2V0RW5kcG9pbnQgPSAoIG1vZGVsTmFtZSApID0+IHtcblx0YXNzZXJ0RW50aXR5SGFzS2V5KCBtb2RlbE5hbWUsIGVuZHBvaW50cyApO1xuXHRyZXR1cm4gZW5kcG9pbnRzWyBtb2RlbE5hbWUgXTtcbn07XG5cbi8qKlxuICogQXBwbGllcyB0aGUgcHJvdmlkZWQgcXVlcnlTdHJpbmcgdG8gdGhlIGVuZHBvaW50IGZvciB0aGUgcHJvdmlkZWQgbW9kZWwgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFdoYXQgbW9kZWwgdGhlIGZpbmFsIHN0cmluZyBpcyBmb3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlTdHJpbmcgIFRoZSBxdWVyeSBiZWluZyBhcHBlbmRlZCB0byB0aGUgZW5kcG9pbnQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmaW5hbCBhc3NlbWJsZWQgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgYXBwbHlRdWVyeVN0cmluZyA9ICggbW9kZWxOYW1lLCBxdWVyeVN0cmluZyA9ICcnICkgPT4ge1xuXHRyZXR1cm4gcXVlcnlTdHJpbmcgIT09ICcnID9cblx0XHRnZXRFbmRwb2ludCggbW9kZWxOYW1lICkgKyAnPycgKyBxdWVyeVN0cmluZyA6XG5cdFx0Z2V0RW5kcG9pbnQoIG1vZGVsTmFtZSApO1xufTtcblxuLyoqXG4gKiBTdHJpcHMgdGhlIGJhc2VfcmVzdF9yb3V0ZSAoaS5lLiBodHRwczovL215dXJsLmNvbS93cC1qc29uLykgZnJvbSB0aGUgcHJvdmlkZWRcbiAqIHVybCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgdXJsIHdpdGggdGhlIGJhc2UgcmVzdCByb3V0ZSByZW1vdmVkLlxuICovXG5leHBvcnQgY29uc3Qgc3RyaXBCYXNlUm91dGVGcm9tVXJsID0gKCB1cmwgKSA9PiB7XG5cdHJldHVybiB1cmwucmVwbGFjZSggYmFzZVJlc3RSb3V0ZSwgJycgKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgc3ByaW50ZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgSW52YWxpZFNjaGVtYSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHsgaXNTY2hlbWEgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcbmltcG9ydCB7XG5cdE1vbmV5LFxuXHRTZXJ2ZXJEYXRlVGltZSBhcyBEYXRlVGltZSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsdWUtb2JqZWN0cyc7XG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0aXNEYXRlVGltZUZpZWxkLFxuXHRpc01vbmV5RmllbGQsXG59IGZyb20gJy4vYm9vbGVhbnMnO1xuaW1wb3J0IHtcblx0aXNTaGFsbG93VmFsaWRWYWx1ZUZvckZpZWxkLFxuXHR2YWxpZGF0ZUVudW1UeXBlLFxuXHR2YWxpZGF0ZVR5cGUsXG5cdHZhbGlkYXRlVHlwZUZvckZpZWxkLFxufSBmcm9tICcuL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMgfSBmcm9tICcuL2V4dHJhY3RvcnMnO1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgdmFsdWUgaXMgYSBrbm93biB2YWx1ZSBvYmplY3QuXG4gKlxuICogTm90ZTogdGhpcyBvbmx5IGFzc2VydHMga25vd24gdmFsdWUgb2JqZWN0cywgaWYgdGhlIHZhbHVlIGlzIG5vdCBkZXRlY3RlZCBhc1xuICogYSBrbm93biB2YWx1ZSBvYmplY3QgaXQgaXMgcGFzc2VkIGJhY2sgYXMgaXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAdGhyb3dzIEludmFsaWREYXRlVGltZVxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IG1heWJlQXNzZXJ0VmFsdWVPYmplY3QgPSAoIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgc2NoZW1hICkgPT4ge1xuXHRpZiAoIGlzRGF0ZVRpbWVGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHREYXRlVGltZS5hc3NlcnRJc0RhdGVUaW1lKCBmaWVsZFZhbHVlICk7XG5cdH1cblx0aWYgKCBpc01vbmV5RmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0TW9uZXkoIGZpZWxkVmFsdWUgKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIG9iamVjdCBpcyBhIHZhbGlkIG1vZGVsIHNjaGVtYSBvYmplY3QuXG4gKlxuICogQ3VycmVudGx5LCBhbiBvYmplY3QgaXMgY29uc2lkZXJlZCBhIHZhbGlkIG1vZGVsIHNjaGVtYSBpZiBpdCBoYXMgYVxuICogJ3Byb3BlcnRpZXMnIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gc2NoZW1hXG4gKiBAdGhyb3dzIEludmFsaWRTY2hlbWFcbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydFZhbGlkU2NoZW1hID0gKCBzY2hlbWEgKSA9PiB7XG5cdGlmICggISBpc1NjaGVtYSggc2NoZW1hICkgKSB7XG5cdFx0dGhyb3cgbmV3IEludmFsaWRTY2hlbWEoXG5cdFx0XHQnVGhpcyBpcyBhbiBpbnZhbGlkIHNjaGVtYSBmb3IgYSBtb2RlbC4nLFxuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB0aGF0IHRoZSBnaXZlbiBmaWVsZCBleGlzdHMgaW4gdGhlIHByb3ZpZGVkIHNjaGVtYSBhbmQgdGhlIHNoYXBlIGZvclxuICogdGhlIHNjaGVtYSBlbnRyeSBvbiB0aGF0IGZpZWxkIGlzIGV4cGVjdGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFRoZSBtb2RlbCB0aGUgc2NoZW1hIGJlbG9uZ3MgdG8sIHRoaXMgaXMgdXNlZCBmb3JcbiAqIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZSAgVGhlIGZpZWxkIGJlaW5nIGNoZWNrZWQgYWdhaW5zdCB0aGUgc2NoZW1hXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hICAgICBUaGUgc2NoZW1hIGZvciB0aGUgbW9kZWwgdXNlZCBmb3IgdmFsaWRhdGlvblxuICogQHRocm93cyBJbnZhbGlkU2NoZW1hXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0VmFsaWRTY2hlbWFGaWVsZFByb3BlcnRpZXMgPSAoXG5cdG1vZGVsTmFtZSxcblx0ZmllbGROYW1lLFxuXHRzY2hlbWEsXG4pID0+IHtcblx0aWYgKCBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXSApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHQnVGhlIGdpdmVuIFwiJXNcIiBmaWVsZE5hbWUgZG9lcyBub3QgaGF2ZSBhIGRlZmluZWQgc2NoZW1hIGZvciB0aGUgbW9kZWwgXCIlc1wiJyxcblx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRtb2RlbE5hbWUsXG5cdFx0XHQpLFxuXHRcdCk7XG5cdH1cblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUgPT09ICdvYmplY3QnICkge1xuXHRcdGlmICggaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRTY2hlbWEoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBzY2hlbWEgZm9yIHRoZSBmaWVsZCAlcyBvbiB0aGUgbW9kZWwgJXMgaXMgb2YgdHlwZSBcIm9iamVjdFwiIGJ1dCBkb2VzIG5vdCBoYXZlIGEgcHJvcGVydGllcyBwcm9wZXJ0eS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRtb2RlbE5hbWVcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKCBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRTY2hlbWEoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBzY2hlbWEgZm9yIHRoZSBmaWVsZCAlcyBvbiB0aGUgbW9kZWwgJXMgaXMgb2YgdHlwZSBcIm9iamVjdFwiIGJ1dCBkb2VzIG5vdCBoYXZlIGEgcmF3IHByb3BlcnR5IGluIGl0XFwncyBcInByb3BlcnRpZXNcIiBwcm9wZXJ0eS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRtb2RlbE5hbWVcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKCBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy50eXBlICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFNjaGVtYShcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIHNjaGVtYSBmb3IgdGhlIGZpZWxkICVzIG9uIHRoZSBtb2RlbCAlcyBpcyBvZiB0eXBlIFwib2JqZWN0XCIgYW5kIGhhcyBhIHByb3BlcnRpZXMucmF3IHByb3BlcnR5LCBob3dldmVyIHRoZXJlIGlzIG5vIFwidHlwZVwiIGRlZmluZWQgZm9yIHRoZSByYXcgcHJvcGVydHkuJyxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0bW9kZWxOYW1lXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHRoYXQgdGhlIHZhbHVlIHByb3ZpZGVkIGZvciB0aGUgcHJlcGFyZWQgZmllbGQgaXMgdmFsaWQgYWNjb3JkaW5nIHRvXG4gKiB0aGUgc2NoZW1hLlxuICpcbiAqIFByZXBhcmVkIGZpZWxkcyBhcmU6XG4gKlxuICogLSBmaWVsZHMgaGF2aW5nIHZhbHVlcyB0aGF0IGFyZSBzZXQgYXMgYSB2YWx1ZSBvYmplY3QgYW5kIGV4cGVjdCBhIHZhbHVlXG4gKiAgIG9iamVjdCBvbiB1cGRhdGVzL2luc2VydHMuXG4gKiAtIGZpZWxkcyB0aGF0IGFyZSB0aGUgZXF1aXZhbGVudCBgcmF3YCB2YWx1ZSB3aGVuIHRoZSBmaWVsZCBpbiB0aGUgc2NoZW1hIGlzXG4gKiAgIGRlZmluZWQgdG8gaGF2ZSByYXcgYW5kIHJlbmRlcmVkL3ByZXR0eSB2YWx1ZXMuXG4gKlxuICogTm90ZTogIFRoaXMgdmFsaWRhdGVzIGFnYWluc3QgcHJlcGFyZWQgZmllbGRzIHdoaWNoIG1lYW5zIHRoYXQ6XG4gKlxuICogLSBpZiB0aGUgcHJlcGFyZWQgZmllbGQgaGFzIGEgdmFsdWUgb2JqZWN0IGFzIGl0cyB2YWx1ZSwgdGhlbiB0aGF0IHZhbHVlXG4gKiAgIG9iamVjdCBpcyB2YWxpZGF0ZWQgYmVmb3JlIGFueSBvdGhlciB2YWxpZGF0aW9uLlxuICogLSBpZiB0aGUgcHJlcGFyZWQgZmllbGQgcmVwcmVzZW50cyBhbiBvYmplY3QgaW4gdGhlIHNjaGVtYSwgdGhlbiBpdHMgdmFsdWUgaXNcbiAqICAgdmFsaWRhdGVkIGFnYWluc3QgdGhlIGByYXdgIHR5cGUgaW4gdGhlIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqIEB0aHJvd3MgSW52YWxpZERhdGVUaW1lXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZCA9IChcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRpbnN0YW5jZSxcbikgPT4ge1xuXHRjb25zdCB7IHNjaGVtYSB9ID0gaW5zdGFuY2U7XG5cdGxldCBpc1ZhbGlkID0gaXNTaGFsbG93VmFsaWRWYWx1ZUZvckZpZWxkKFxuXHRcdGZpZWxkTmFtZSxcblx0XHRmaWVsZFZhbHVlLFxuXHRcdHNjaGVtYSxcblx0KTtcblx0aWYgKCAhIGlzVmFsaWQgJiYgc2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlID09PSAnb2JqZWN0JyAmJlxuXHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllc1xuXHQpIHtcblx0XHRpc1ZhbGlkID0gc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy5lbnVtID9cblx0XHRcdHZhbGlkYXRlRW51bVR5cGUoXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcudHlwZSxcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy5lbnVtLFxuXHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0KSA6XG5cdFx0XHR2YWxpZGF0ZVR5cGUoXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcudHlwZSxcblx0XHRcdFx0bWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMoXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdFx0c2NoZW1hXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0aWYgKCAhIGlzVmFsaWQgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlMSRzXCIgZmllbGQgIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hLiAgSXRcXCdzIGByYXdgIHByb3BlcnR5IFZhbHVlICglMiRzKSBpcyBub3QgdGhlIGNvcnJlY3QgZXhwZWN0ZWQgdHlwZSAoJTMkcykuJyxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LnR5cGUsXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXHRpZiAoICEgaXNWYWxpZCApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0c3ByaW50Zihcblx0XHRcdFx0J1RoZSBnaXZlbiBcIiUxJHNcIiBmaWVsZFxcJ3MgVmFsdWUgKCUyJHMpIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hIHR5cGUgKCUzJHMpLicsXG5cdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlLFxuXHRcdFx0KSxcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgdmFsdWUgZm9yIHRoZSBnaXZlbiBmaWVsZCBpcyB2YWxpZCBhY2NvcmRpbmcgdG8gdGhlXG4gKiBzY2hlbWEuXG4gKlxuICogVGhpcyBpcyB1c2VkIG9uIGVudGl0eSBjb25zdHJ1Y3Rpb24gYW5kIGRvZXMgbm90IHZhbGlkYXRlIHByZXBhcmVkIGZpZWxkXG4gKiB2YWx1ZXMgKHNlZSBhc3NlcnQgYXNzZXJ0VmFsaWRWYWx1ZUZvclByZXBhcmVkRmllbGQpLlxuICpcbiAqIFRoaXMgbWV0aG9kIGFsc28gYXNzZXJ0cyB0aGF0IHRoZSBzY2hlbWEgaGFzIHZhbGlkIHNjaGVtYSBmaWVsZCBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICogQHRocm93cyBJbnZhbGlkU2NoZW1hXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRWYWxpZEZpZWxkQW5kVmFsdWVBZ2FpbnN0U2NoZW1hID0gKFxuXHRtb2RlbE5hbWUsXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0aW5zdGFuY2UsXG4pID0+IHtcblx0Y29uc3Qgc2NoZW1hID0gaW5zdGFuY2Uuc2NoZW1hO1xuXHRjb25zdCB2YWxpZGF0aW9uVHlwZSA9IHZhbGlkYXRlVHlwZUZvckZpZWxkKCBmaWVsZE5hbWUsIGluc3RhbmNlICk7XG5cdGFzc2VydFZhbGlkU2NoZW1hRmllbGRQcm9wZXJ0aWVzKCBtb2RlbE5hbWUsIGZpZWxkTmFtZSwgc2NoZW1hICk7XG5cdGxldCBpc1ZhbGlkID0gaXNTaGFsbG93VmFsaWRWYWx1ZUZvckZpZWxkKFxuXHRcdGZpZWxkTmFtZSxcblx0XHRmaWVsZFZhbHVlLFxuXHRcdHNjaGVtYSxcblx0XHRmYWxzZSxcblx0KTtcblx0Ly8gYWNjb3VudCBmb3IgZmllbGROYW1lIGZpZWxkVmFsdWVzIHRoYXQgaGF2ZSBwcm9wZXJ0eSBzY2hlbWEuIEZvciBNb2RlbFxuXHQvLyBFbnRpdGllcywgb25seSB0aGUgVkFMSURBVEVfVFlQRSBwcm9wZXJ0eSBpcyBjYXJlZCBhYm91dC5cblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUgPT09ICdvYmplY3QnICYmXG5cdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzXG5cdCkge1xuXHRcdGlmICggaXNVbmRlZmluZWQoIGZpZWxkVmFsdWVbIHZhbGlkYXRpb25UeXBlIF0gKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBnaXZlbiBcIiUxJHNcIiB2YWx1ZSBpcyBub3QgdmFsaWQgZm9yIHRoZSBkZWZpbmVkIHNjaGVtYS4gSXQgbXVzdCBiZSBhbiBvYmplY3QgYW5kIGl0IG11c3QgaGF2ZSBhIGAlMiRzYCBrZXkuJyxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0dmFsaWRhdGlvblR5cGUsXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpc1ZhbGlkID0gc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzWyB2YWxpZGF0aW9uVHlwZSBdLmVudW0gP1xuXHRcdFx0dmFsaWRhdGVFbnVtVHlwZShcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzWyB2YWxpZGF0aW9uVHlwZSBdLnR5cGUsXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcuZW51bSxcblx0XHRcdFx0ZmllbGRWYWx1ZVsgdmFsaWRhdGlvblR5cGUgXSxcblx0XHRcdCkgOlxuXHRcdFx0dmFsaWRhdGVUeXBlKFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXNbIHZhbGlkYXRpb25UeXBlIF0udHlwZSxcblx0XHRcdFx0ZmllbGRWYWx1ZVsgdmFsaWRhdGlvblR5cGUgXVxuXHRcdFx0KTtcblx0XHRpZiAoICEgaXNWYWxpZCApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBnaXZlbiBcIiUxJHNcIiB2YWx1ZSBpcyBub3QgdmFsaWQgZm9yIHRoZSBkZWZpbmVkIHNjaGVtYS4gIEl0XFwncyBgJTIkc2AgcHJvcGVydHkgdmFsdWUgKCUzJHMpIGlzIG5vdCB0aGUgY29ycmVjdCBleHBlY3RlZCB0eXBlICglNCRzKS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHR2YWxpZGF0aW9uVHlwZSxcblx0XHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllc1sgdmFsaWRhdGlvblR5cGUgXS50eXBlLFxuXHRcdFx0XHQpLFxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblx0aWYgKCAhIGlzVmFsaWQgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdHNwcmludGYoXG5cdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlMSRzXCIgZmllbGRcXCdzIHZhbHVlICglMiRzKSBpcyBub3QgdmFsaWQgZm9yIHRoZSBkZWZpbmVkIHNjaGVtYSB0eXBlICglMyRzKS4nLFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSxcblx0XHRcdCksXG5cdFx0KTtcblx0fVxufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0FycmF5LCB1cHBlckZpcnN0LCBjYW1lbENhc2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbWVtaXplJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGFzc2VydFZhbGlkU2NoZW1hIH0gZnJvbSAnLi9hc3NlcnRpb25zJztcbmltcG9ydCB7XG5cdGNyZWF0ZUdldHRlcixcblx0Y3JlYXRlRW50aXR5R2V0dGVyc0FuZFNldHRlcnMsXG5cdGNyZWF0ZVBlcnNpc3RpbmdHZXR0ZXJzQW5kU2V0dGVycyxcblx0c2V0U2F2ZVN0YXRlLFxufSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQge1xuXHRTQVZFX1NUQVRFLFxuXHRQUklWQVRFX1BST1BFUlRJRVMsXG59IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBCYXNlRW50aXR5IGlzIHRoZSBiYXNpYyBjbGFzcyBmb3IgYWxsIGVudGl0aWVzLiAgY3JlYXRlRW50aXR5RmFjdG9yeSByZXR1cm5zXG4gKiBhbiBpbnN0YW5jZSBvZiB0aGlzIGFuZCBhbGwgdGhlIGdldHRlcnMvc2V0dGVycyBmb3IgZmllbGRzIGV0YyBhcmVcbiAqIGR5bmFtaWNhbGx5IGNyZWF0ZWQgdmlhIHRoZSBjb25zdHJ1Y3Rvci5cbiAqL1xuY2xhc3MgQmFzZUVudGl0eSB7XG5cdFsgUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEUgXSA9IFNBVkVfU1RBVEUuQ0xFQU47XG5cdFsgUFJJVkFURV9QUk9QRVJUSUVTLlZBTElEQVRFX1RZUEVTIF0gPSB7fTtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3IgZm9yIEJhc2UgRW50aXR5XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcblx0ICogQHBhcmFtIHtPYmplY3R9IGVudGl0eUZpZWxkc0FuZFZhbHVlc1xuXHQgKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG5cdCAqIEBwYXJhbSB7QXJyYXl9ZmllbGRQcmVmaXhlc1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGlzTmV3XG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRtb2RlbE5hbWUsXG5cdFx0ZW50aXR5RmllbGRzQW5kVmFsdWVzLFxuXHRcdHNjaGVtYSxcblx0XHRmaWVsZFByZWZpeGVzID0gW10sXG5cdFx0aXNOZXcgPSBmYWxzZSxcblx0KSB7XG5cdFx0YXNzZXJ0VmFsaWRTY2hlbWEoIHNjaGVtYSApO1xuXHRcdGZpZWxkUHJlZml4ZXMgPSBpc0FycmF5KCBmaWVsZFByZWZpeGVzICkgPyBmaWVsZFByZWZpeGVzIDogW107XG5cdFx0Y3JlYXRlR2V0dGVyKCB0aGlzLCAnZmllbGRQcmVmaXhlcycsIGZpZWxkUHJlZml4ZXMgKTtcblx0XHRjcmVhdGVHZXR0ZXIoIHRoaXMsICdzY2hlbWEnLCBzY2hlbWEucHJvcGVydGllcyApO1xuXHRcdHNldFNhdmVTdGF0ZShcblx0XHRcdHRoaXMsXG5cdFx0XHRpc05ldyA/IFNBVkVfU1RBVEUuTkVXIDogU0FWRV9TVEFURS5DTEVBTlxuXHRcdCk7XG5cdFx0Y3JlYXRlR2V0dGVyKCB0aGlzLCAnbW9kZWxOYW1lJywgbW9kZWxOYW1lICk7XG5cdFx0Y3JlYXRlR2V0dGVyKCB0aGlzLCAnb3JpZ2luYWxGaWVsZHNBbmRWYWx1ZXMnLCBlbnRpdHlGaWVsZHNBbmRWYWx1ZXMgKTtcblx0XHRjcmVhdGVHZXR0ZXIoXG5cdFx0XHR0aGlzLFxuXHRcdFx0J2ZpZWxkc1RvUGVyc2lzdE9uSW5zZXJ0Jyxcblx0XHRcdG5ldyBTZXQoIE9iamVjdC5rZXlzKCBlbnRpdHlGaWVsZHNBbmRWYWx1ZXMgKSApXG5cdFx0KTtcblx0XHRjcmVhdGVFbnRpdHlHZXR0ZXJzQW5kU2V0dGVycyggdGhpcyApO1xuXHRcdGNyZWF0ZVBlcnNpc3RpbmdHZXR0ZXJzQW5kU2V0dGVycyggdGhpcyApO1xuXHRcdE9iamVjdC5zZWFsKCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgY3VycmVudCBzYXZlIHN0YXRlIG9uIHRoZSBlbnRpdHkuXG5cdCAqXG5cdCAqIFNhdmUgc3RhdGUgZGVzY3JpYmVzIHdoZXRoZXIgdGhlIGVudGl0eSBpczpcblx0ICpcblx0ICogLSBTQVZFX1NUQVRFLk5FVzogVGhlIGVudGl0eSBoYXMgbmV2ZXIgYmVlbiBwZXJzaXN0ZWQgdG8gc3RvcmFnZS5cblx0ICogLSBTQVZFX1NUQVRFLkNMRUFOOiBUaGUgZW50aXR5IGV4aXN0cyBpbiBzdG9yYWdlIGFuZCBoYXMgbm90IGJlZW4gbXV0YXRlZC5cblx0ICogLSBTQVZFX1NUQVRFLkRJUlRZOiBUaGUgZW50aXR5IGlzIG11dGF0ZWQgYW5kIGNoYW5nZXMgaGF2ZSBub3QgYmVlblxuXHQgKiBwZXJzaXN0ZWQgdG8gc3RvcmFnZS5cblx0ICpcblx0ICogQHJldHVybiB7U3ltYm9sfSAgUmV0dXJucyB0aGUgY3VycmVudCBzYXZlIHN0YXRlIGZvciB0aGUgZW50aXR5LlxuXHQgKi9cblx0Z2V0IHNhdmVTdGF0ZSgpIHtcblx0XHRyZXR1cm4gdGhpc1sgUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEUgXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IHNhdmUgc3RhdGUgaXMgU0FWRV9TVEFURS5ORVdcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgU0FWRV9TVEFURS5ORVcgaXMgdGhlIHNhdmUgc3RhdGUuXG5cdCAqL1xuXHRnZXQgaXNOZXcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2F2ZVN0YXRlID09PSBTQVZFX1NUQVRFLk5FVztcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IHNhdmUgc3RhdGUgaXMgU0FWRV9TVEFURS5ESVJUWVxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyBTQVZFX1NUQVRFLkRJUlRZIGlzIHRoZSBzYXZlIHN0YXRlLlxuXHQgKi9cblx0Z2V0IGlzRGlydHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2F2ZVN0YXRlID09PSBTQVZFX1NUQVRFLkRJUlRZO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBpcyBTQVZFX1NUQVRFLkNMRUFOXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIFNBVkVfU1RBVEUuQ0xFQU4gaXMgdGhlIHNhdmUgc3RhdGUuXG5cdCAqL1xuXHRnZXQgaXNDbGVhbigpIHtcblx0XHRyZXR1cm4gdGhpcy5zYXZlU3RhdGUgPT09IFNBVkVfU1RBVEUuQ0xFQU47XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgZW50aXR5IGhhcyBhbnkgcGFzc3dvcmQgcHJvdGVjdGVkIGZpZWxkcy5cblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyBpdCBkb2VzLCBmYWxzZSBtZWFucyBpdCBkb2Vzbid0LlxuXHQgKi9cblx0Z2V0IGlzUGFzc3dvcmRQcm90ZWN0ZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvdGVjdGVkRmllbGRzLmxlbmd0aCA+IDA7XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgZ2l2ZW4gZmllbGROYW1lIGlzIGEgcGFzc3dvcmQgcHJvdGVjdGVkIGZpZWxkLlxuXHQgKiBAcmV0dXJuIHtmdW5jdGlvbihzdHJpbmcpOiBib29sZWFufSAgUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWRcblx0ICogdG8gY2hlY2sgaWYgdGhlIGdpdmVuIGZpZWxkIG5hbWUgaXMgYSBwcm90ZWN0ZWQgZmllbGQgaW4gdGhpcyBlbnRpdHkuXG5cdCAqL1xuXHRnZXQgaXNGaWVsZFBhc3N3b3JkUHJvdGVjdGVkKCkge1xuXHRcdHJldHVybiAoIGZpZWxkTmFtZSApID0+IHRoaXMucHJvdGVjdGVkRmllbGRzLmluZGV4T2YoIGZpZWxkTmFtZSApID4gLTE7XG5cdH1cblxuXHQvKipcblx0ICogVXNlZCB0byBjbG9uZSB0aGUgY3VycmVudCBlbnRpdHkgb2JqZWN0LiAgVGhpcyByZXN1bHRzIGluIGFuIGluc3RhbmNlIG9mXG5cdCAqIEJhc2VFbnRpdHkgdGhhdCBpcyBlcXVpdmFsZW50IGFzIHRoaXMgY3VycmVudCBpbnN0YW5jZSAoZXhjZXB0IGl0IHdpbGxcblx0ICogaGF2ZSBhIG5ldyBnZW5lcmF0ZWQgaWQpLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtCYXNlRW50aXR5fSBBIG5ldyBpbnN0YW5jZSBvZiBCYXNlRW50aXR5XG5cdCAqL1xuXHRnZXQgY2xvbmUoKSB7XG5cdFx0cmV0dXJuICgga2VlcElkID0gZmFsc2UgKSA9PiB7XG5cdFx0XHRjb25zdCBjcmVhdGVGYWN0b3J5ID0gbWVtb2l6ZSggKCkgPT4gY3JlYXRlRW50aXR5RmFjdG9yeShcblx0XHRcdFx0dGhpcy5tb2RlbE5hbWUsXG5cdFx0XHRcdHsgJHNjaGVtYToge30sIHByb3BlcnRpZXM6IHRoaXMuc2NoZW1hIH0sXG5cdFx0XHRcdHRoaXMuZmllbGRQcmVmaXhlc1xuXHRcdFx0KSApO1xuXHRcdFx0Y29uc3QgZmFjdG9yeSA9IGNyZWF0ZUZhY3RvcnkoKTtcblx0XHRcdGNvbnN0IG5ld0VudGl0eSA9IGZhY3RvcnkuY3JlYXRlTmV3KCB0aGlzLmZvckNsb25lICk7XG5cdFx0XHRpZiAoIGtlZXBJZCApIHtcblx0XHRcdFx0bmV3RW50aXR5LmlkID0gdGhpcy5pZDtcblx0XHRcdFx0c2V0U2F2ZVN0YXRlKCBuZXdFbnRpdHksIHRoaXMuc2F2ZVN0YXRlLCB0cnVlICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3RW50aXR5O1xuXHRcdH07XG5cdH1cblxuXHRzdGF0aWMgbmFtZSA9ICdCYXNlRW50aXR5J1xufVxuXG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCBnaXZlcyBhIGNsYXNzIHRoZSBwcm92aWRlZCBuYW1lXG4gKiAoYW5kIG9wdGlvbmFsbHkgZXh0ZW5kcyB0aGUgcHJvdmlkZWQgb2JqZWN0KS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5kZWRDbGFzc1xuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb25cbiAqL1xuY29uc3QgbmFtZUNsYXNzID0gKCBuYW1lLCBleHRlbmRlZENsYXNzICkgPT4ge1xuXHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBleHRlbmRlZENsYXNzIHtcblx0XHRzdGF0aWMgZ2V0IG5hbWUoKSB7XG5cdFx0XHRyZXR1cm4gbmFtZTtcblx0XHR9XG5cdH07XG59O1xuXG4vKipcbiAqIEEgZmFjdG9yeSBmb3IgZW50aXR5IGZhY3Rvcmllcy5cbiAqXG4gKiBDYWxsaW5nIHRoaXMgcmV0dXJucyBhbiBvYmplY3Qgb2YgZmFjdG9yeSBmdW5jdGlvbnMgdGhhdCBpbnN0YW50aWF0ZSBhblxuICogaW5zdGFuY2Ugb2YgYSBuYW1lZCBFbnRpdHkuICBUaGUgbW9kZWxOYW1lIGlzIHVzZWQgYXMgdGhlIG5hbWUgZm9yIHRoZSBuZXdcbiAqIGVudGl0eS5cbiAqXG4gKiBUd28gbWV0aG9kcyBhcmUgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QgcmV0dXJuZWQ6IGBjcmVhdGVOZXdgIGFuZFxuICogYGZyb21FeGlzdGluZ2AuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgVGhlIG1vZGVsIGZvciB0aGUgZW50aXR5XG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hICAgICBUaGUgc2NoZW1hIGZvciB0aGUgbW9kZWwuIFRoaXMgaXMgdGhlIHNjaGVtYVxuICogcHJvdmlkZWQgYnkgdGhlIE9QVElPTlMgZW5kcG9pbnQgZm9yIHRoZSBtb2RlbC5cbiAqIEBwYXJhbSB7QXJyYXl9IGZpZWxkUHJlZml4ZXMgQW4gYXJyYXkgb2YgZmllbGQgcHJlZml4ZXMgZm9yIGJhc2UgZmllbGRzIG9uXG4gKiBvbiB0aGUgbW9kZWwgKGVnLiBFdmVudCBtb2RlbCBoYXMgYFsgRVZUIF1gIHByZWZpeGVzIG9uIGZpZWxkcywgRGF0ZXRpbWUgbW9kZWxcbiAqIGhhcyBbIGBEVFRgLCBgRFRUX0VWVGAgXVxuICogQHJldHVybiB7T2JqZWN0fSBBIGZhY3RvcnkgZm9yIGluc3RhbnRpYXRpbmcgYW4gZW50aXR5IGluc3RhbmNlLlxuICovXG5jb25zdCBjcmVhdGVFbnRpdHlGYWN0b3J5ID0gKCBtb2RlbE5hbWUsIHNjaGVtYSwgZmllbGRQcmVmaXhlcyA9IFtdICkgPT4ge1xuXHRjb25zdCBFbnRpdHkgPSBuYW1lQ2xhc3MoXG5cdFx0dXBwZXJGaXJzdCggY2FtZWxDYXNlKCBtb2RlbE5hbWUgKSApLFxuXHRcdEJhc2VFbnRpdHlcblx0KTtcblx0cmV0dXJuIHtcblx0XHQvKipcblx0XHQgKiBFeHBvc2VzIG1vZGVsTmFtZSBzbyBjbGllbnQgY29kZSBjYW4gZGVyaXZlIHdoYXQgbW9kZWwgdGhpcyBmYWN0b3J5XG5cdFx0ICogaXMgZm9yIGZyb20gYW55IGdpdmVuIGZhY3RvcnkuXG5cdFx0ICogQHR5cGUgc3RyaW5nXG5cdFx0ICovXG5cdFx0bW9kZWxOYW1lLFxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgdGhlIGNsYXNzIGRlZmluaXRpb24gZm9yIHRoZSBFbnRpdHkuICBUeXBpY2FsbHkgdGhpcyBpc1xuXHRcdCAqIHJldHJpZXZlZCBmb3IgdGhlIGFiaWxpdHkgdG8gZG8gaW5zdGFuY2VvZiBjaGVja3MuXG5cdFx0ICovXG5cdFx0Y2xhc3NEZWY6IEVudGl0eSxcblx0XHQvKipcblx0XHQgKiBUaGlzIHJldHVybnMgYW4gaW5zdGFuY2Ugb2YgRW50aXR5IGZvciB0aGUgZ2l2ZW4gYXJndW1lbnRzIHdpdGggdGhlXG5cdFx0ICogaW5kaWNhdGlvbiB0aGlzIGlzIGEgbmV3IG5vbi1wZXJzaXN0ZWQgZW50aXR5LiAgVGhpcyBtZWFuczpcblx0XHQgKlxuXHRcdCAqIC0gQWxsIGZpZWxkIHZhbHVlcyBhcmUgcG9wdWxhdGVkIGFuZCBhbnkgbm90IHByb3ZpZGVkIHdpbGwgYmVcblx0XHQgKiAgIHBvcHVsYXRlZCB3aXRoIGRlZmF1bHQgdmFsdWVzIGRlZmluZWQgYnkgdGhlIHNjaGVtYS5cblx0XHQgKiAtIEdlbmVyYXRlcyB0ZW1wb3JhcnkgdW5pcXVlIGlkcyBmb3IgdGhlIHByaW1hcnkga2V5IGZpZWxkcyBvbiB0aGVcblx0XHQgKiAgIGVudGl0eSAodXNpbmcgY3VpZCkuXG5cdFx0ICogLSBTZXRzIHRoZSBgaXNOZXdgIGZsYWcgdG8gdHJ1ZSBmb3IgdGhlIGVudGl0eSBzbyBjbGllbnQgY29kZSBpcyBhYmxlXG5cdFx0ICogICB0byBkaXNjb3ZlciB3aGljaCBlbnRpdGllcyBoYXZlIG5ldmVyIGJlZW4gcGVyc2lzdGVkLlxuXHRcdCAqIC0gVGhpcyBmYWN0b3J5IG1ldGhvZCBleHBlY3RzIGZpZWxkcyBhbmQgdmFsdWVzIHRvIGJlIFwicHJlcGFyZWRcIi5cblx0XHQgKiAgIFdoYXQgdGhhdCBtZWFucyBpcyB0aGF0IGZvciBhbnkgZmllbGRzIHRoYXQgdGhlIHNjaGVtYSBkZXNjcmliZWQgYXNcblx0XHQgKiAgIGhhdmluZyBhIGByYXdgIHByb3BlcnR5IChpLmUuIHsgRVZUX2Rlc2M6IHsgcmF3OiAnc29tZXRoaW5nJyB9IH0pXG5cdFx0ICogICB0aGUgdmFsdWUgc2hvdWxkIGJlIG9mIHRoZSBjb3JyZWN0IHR5cGUgZm9yIHRoYXQgcmF3IHByb3BlcnR5IGFuZC5cblx0XHQgKiAgIFRoaXMgYWxzbyBtZWFucyBpcyB0aGF0IGZvciBhbnkgZmllbGRzIHRoZSBzY2hlbWEgZGVzY3JpYmVzIGFzIGFcblx0XHQgKiAgIGRhdGUtdGltZSAoZm9ybWF0KSBvciBtb25leSAoZm9ybWF0KSBmaWVsZCwgdGhlIHZhbHVlIGlzIGV4cGVjdGVkXG5cdFx0ICogICB0byBiZSB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZSBvYmplY3QuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gZmllbGRzQW5kVmFsdWVzXG5cdFx0ICogQHJldHVybiB7RW50aXR5fSBhbiBpbnN0YW5jZSBvZiBFbnRpdHlcblx0XHQgKi9cblx0XHRjcmVhdGVOZXc6ICggZmllbGRzQW5kVmFsdWVzICkgPT4gbmV3IEVudGl0eShcblx0XHRcdG1vZGVsTmFtZSxcblx0XHRcdGZpZWxkc0FuZFZhbHVlcyxcblx0XHRcdHNjaGVtYSxcblx0XHRcdGZpZWxkUHJlZml4ZXMsXG5cdFx0XHR0cnVlXG5cdFx0KSxcblx0XHQvKipcblx0XHQgKiBUaGlzIHJldHVybnMgYW4gaW5zdGFuY2Ugb2YgRW50aXR5IGZvciB0aGUgZ2l2ZW4gYXJndW1lbnRzIHdpdGggdGhlXG5cdFx0ICogaW5kaWNhdGlvbiB0aGlzIHJlcHJlc2VudHMgdGhlIGVudGl0eSBhcyBpcyBpbiB0aGUgZGIuICBUaGlzIG1lYW5zOlxuXHRcdCAqXG5cdFx0ICogLSBBbGwgZmllbGQgdmFsdWVzIGFyZSBOT1QgcG9wdWxhdGVkIGlmIG1pc3NpbmcgdmFsdWVzLiAgVGhpcyBpc1xuXHRcdCAqICAgZXNwZWNpYWxseSBpbXBvcnRhbnQgZm9yIGNvbnRleHRzIGxpa2UgdW5hdXRob3JpemVkIHZpZXdzIHdoZXJlXG5cdFx0ICogICBvbmx5IHBhcnRpYWwgZW50aXRpZXMgYXJlIHJldHVybmVkIGluIFJFU1QgcmVzcG9uc2VzLlxuXHRcdCAqIC0gaXNOZXcgZmxhZyBpcyBzZXQgdG8gZmFsc2UgKGFuZCBuZXZlciBjaGFuZ2VzIGZvciB0aGlzIGVudGl0eSlcblx0XHQgKiAtIFRoZSBpbmNvbWluZyB2YWx1ZXMgYXJlIGV4cGVjdGVkIHRvIGJlIGluIHRoZSBleGFjdCBzaGFwZSBhc1xuXHRcdCAqICAgZGVzY3JpYmVkIGJ5IHRoZSBzY2hlbWEgZm9yIHRoZSBlbnRpdHkgbW9kZWwuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gZmllbGRzQW5kVmFsdWVzXG5cdFx0ICogQHJldHVybiB7RW50aXR5fSBhbiBpbnN0YW5jZSBvZiBFbnRpdHlcblx0XHQgKi9cblx0XHRmcm9tRXhpc3Rpbmc6ICggZmllbGRzQW5kVmFsdWVzICkgPT4gbmV3IEVudGl0eShcblx0XHRcdG1vZGVsTmFtZSxcblx0XHRcdGZpZWxkc0FuZFZhbHVlcyxcblx0XHRcdHNjaGVtYSxcblx0XHRcdGZpZWxkUHJlZml4ZXNcblx0XHQpLFxuXHR9O1xufTtcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUVudGl0eUZhY3Rvcnk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNQbGFpbk9iamVjdCwgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBoYXMgYSBcInJhd1wiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYSBgcmF3YCBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc1Jhd1Byb3BlcnR5ID0gKCB2YWx1ZSApID0+IGlzUGxhaW5PYmplY3QoIHZhbHVlICkgJiZcblx0ISBpc1VuZGVmaW5lZCggdmFsdWUucmF3ICk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBhIFwicHJldHR5XCIgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Kn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QgYW5kIGhhcyBhIGBwcmV0dHlgIHByb3BlcnR5LlxuICovXG5leHBvcnQgY29uc3QgaGFzUHJldHR5UHJvcGVydHkgPSAoIHZhbHVlICkgPT4gaXNQbGFpbk9iamVjdCggdmFsdWUgKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCB2YWx1ZS5wcmV0dHkgKTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaGFzIGEgXCJyZW5kZXJlZFwiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYSBgcmVuZGVyZWRgIHByb3BlcnR5LlxuICovXG5leHBvcnQgY29uc3QgaGFzUmVuZGVyZWRQcm9wZXJ0eSA9ICggdmFsdWUgKSA9PiBpc1BsYWluT2JqZWN0KCB2YWx1ZSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHZhbHVlLnJlbmRlcmVkICk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBhIFwiZm9ybWF0XCIgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QgYW5kIGhhcyBhIGBmb3JtYXRgIHByb3BlcnR5LlxuICovXG5leHBvcnQgY29uc3QgaGFzRm9ybWF0UHJvcGVydHkgPSAoIHZhbHVlICkgPT4gaXNQbGFpbk9iamVjdCggdmFsdWUgKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCB2YWx1ZS5mb3JtYXQgKTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaGFzIGEgXCJlbnVtXCIgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QgYW5kIGhhcyBhbiBlbnVtXG4gKiBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0VudW1Qcm9wZXJ0eSA9ICggdmFsdWUgKSA9PiBpc1BsYWluT2JqZWN0KCB2YWx1ZSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHZhbHVlLmVudW0gKTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSBcInZhbHVlIG9iamVjdFwiIGZpZWxkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSB2YWx1ZSBvYmplY3QgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1ZhbHVlT2JqZWN0RmllbGQgPSAoIGZpZWxkLCBzY2hlbWEgKSA9PiB7XG5cdHJldHVybiBpc0RhdGVUaW1lRmllbGQoIGZpZWxkLCBzY2hlbWEgKSB8fCBpc01vbmV5RmllbGQoIGZpZWxkLCBzY2hlbWEgKTtcbn07XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIGZpZWxkIGlzIGEgZGF0ZS10aW1lIGZpZWxkIGFjY29yZGluZyB0byB0aGVcbiAqIHByb3ZpZGVkIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgaXQgaXMgYSBkYXRlLXRpbWUgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0RhdGVUaW1lRmllbGQgPSAoIGZpZWxkLCBzY2hlbWEgKSA9PlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkIF0gKSAmJlxuXHRoYXNGb3JtYXRQcm9wZXJ0eSggc2NoZW1hWyBmaWVsZCBdICkgJiZcblx0c2NoZW1hWyBmaWVsZCBdLmZvcm1hdCA9PT0gJ2RhdGUtdGltZSc7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIGZpZWxkIGlzIGEgVVRDIGRhdGUtdGltZSBmaWVsZC5cbiAqXG4gKiBJZiBzY2hlbWEgaXMgcHJvdmlkZWQsIHRoaXMgYWxzbyBjb25zaWRlcnMgd2hldGhlciB0aGlzIGlzIGEgZGF0ZS10aW1lIGZpZWxkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVGltZUZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYSBbb3B0aW9uYWxdXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoaXMgaXMgYSBVVEMgZmllbGQuICBJZiBzY2hlbWEgaXMgcHJvdmlkZWQgaXRcbiAqIG1lYW5zIHRoaXMgaXMgYWxzbyBhIGRhdGUtdGltZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzVVRDRGF0ZVRpbWVGaWVsZCA9ICggZGF0ZVRpbWVGaWVsZE5hbWUsIHNjaGVtYSA9IG51bGwgKSA9PiB7XG5cdHJldHVybiBzY2hlbWEgIT09IG51bGwgP1xuXHRcdGlzRGF0ZVRpbWVGaWVsZCggZGF0ZVRpbWVGaWVsZE5hbWUsIHNjaGVtYSApICYmXG5cdFx0XHRkYXRlVGltZUZpZWxkTmFtZS5pbmRleE9mKCAnX2dtdCcgKSA+IDAgOlxuXHRcdGRhdGVUaW1lRmllbGROYW1lLmluZGV4T2YoICdfZ210JyApID4gMDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCByZXByZXNlbnRzIGEgcHJpbWFyeSBrZXkgZmllbGQgdXNpbmcgdGhlXG4gKiBwcm92aWRlZCBzY2hlbWEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgaXQgaXMgYSBwcmltYXJ5IGtleSBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzUHJpbWFyeUtleUZpZWxkID0gKCBmaWVsZE5hbWUsIHNjaGVtYSApID0+XG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0gKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnByaW1hcnlfa2V5ICk7XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCByZXByZXNlbnRzIGEgcmVhZG9ubHkgZmllbGQgdXNpbmcgdGhlXG4gKiBwcm92aWRlZCBzY2hlbWEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgaXQgaXMgYSByZWFkb25seSBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzUmVhZE9ubHkgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT5cblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0ucmVhZG9ubHkgKSAmJlxuXHRzY2hlbWFbIGZpZWxkTmFtZSBdLnJlYWRvbmx5O1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCBpcyBhIFwiZW50aXR5XCIgZmllbGQgdXNpbmcgdGhlIHByb3ZpZGVkXG4gKiBzY2hlbWEuXG4gKlxuICogQW4gXCJlbnRpdHlcIiBmaWVsZCBpcyBhbnkgZmllbGQgdGhhdCBzYXRpc2ZpZXMgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIC0gZmllbGQgZXhpc3RzIGluIHRoZSBzY2hlbWFcbiAqIC0gaXQgaXMgbm90IHJlYWRvbmx5IG9yIGlzIGEgcHJpbWFyeSBrZXkgZmllbGQuXG4gKiAtIGl0IGlzIG5vdCBhIHV0YyBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoaXMgaXMgYW4gZW50aXR5IGZpZWxkXG4gKi9cbmV4cG9ydCBjb25zdCBpc0VudGl0eUZpZWxkID0gKCBmaWVsZE5hbWUsIHNjaGVtYSApID0+XG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0gKSAmJlxuXHQoICEgaXNSZWFkT25seSggZmllbGROYW1lLCBzY2hlbWEgKSB8fFxuXHRcdGlzUHJpbWFyeUtleUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApXG5cdCkgJiZcblx0ISBpc1VUQ0RhdGVUaW1lRmllbGQoIGZpZWxkTmFtZSApICYmXG5cdGZpZWxkTmFtZSAhPT0gJ19wcm90ZWN0ZWQnO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBmaWVsZCByZXByZXNlbnRzIGEgdmFsdWUgb2YgbW9uZXkgZnJvbSB0aGUgcHJvdmlkZWRcbiAqIHNjaGVtYS5cbiAqXG4gKiBBIGZpZWxkIGlzIGEgbW9uZXkgZmllbGQgaWYgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBzYXRpc2ZpZWQ6XG4gKlxuICogLSBJdCBleGlzdHMgaW4gdGhlIHNjaGVtYVxuICogLSBJdCBoYXMgYSBwcmV0dHkgcHJvcGVydHlcbiAqIC0gVGhlIHByZXR0eSBwcm9wZXJ0eSB2YWx1ZSBoYXMgYSBmb3JtYXQgcHJvcGVydHkuXG4gKiAtIFRoZSBmb3JtYXQgcHJvcGVydHkgaXMgZXF1YWwgdG8gJ21vbmV5J1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgaXQgaXMgYSBtb25leSBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTW9uZXlGaWVsZCA9ICggZmllbGROYW1lLCBzY2hlbWEgKSA9PlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgJiZcblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzICkgJiZcblx0aGFzUHJldHR5UHJvcGVydHkoIHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcyApICYmXG5cdGhhc0Zvcm1hdFByb3BlcnR5KCBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucHJldHR5ICkgJiZcblx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnByZXR0eS5mb3JtYXQgPT09ICdtb25leSc7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGZpZWxkIGlzIGFuIGVudW0gdHlwZSBmaWVsZCBhcyBkZWZpbmVkIGluIHRoZSBwcm92aWRlZFxuICogc2NoZW1hLlxuICpcbiAqIE5vdGU6IHRoaXMgb25seSBldmFsdWF0ZXMgdGhlIHRvcC1sZXZlbCBmb3IgdGhlIGZpZWxkIHNjaGVtYS4gIElmIHRoZSBmaWVsZFxuICogaW4gdGhlIHNjaGVtYSBpcyBvZiB0eXBlICdvYmplY3QnIGFuZCBvbmUgb2YgdGhlIG9iamVjdCBwcm9wZXJ0aWVzIGlzIG9mIHR5cGVcbiAqICdlbnVtJyB0aGlzIHdpbGwgbm90IGNvbnNpZGVyIGl0IGFuIFwiZW51bVwiIGZpZWxkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIGlmIHRoZSBmaWVsZCBpcyBhbiBlbnVtIHR5cGUgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0VudW1GaWVsZCA9ICggZmllbGROYW1lLCBzY2hlbWEgKSA9PlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgJiZcblx0aGFzRW51bVByb3BlcnR5KCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgJiZcblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5lbnVtLmxlbmd0aCApICYmXG5cdHNjaGVtYVsgZmllbGROYW1lIF0uZW51bS5sZW5ndGggPiAwO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGFwcGx5RmlsdGVycyB9IGZyb20gJ0B3b3JkcHJlc3MvaG9va3MnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIENvbnN0YW50cyBkZXNjcmliaW5nIHRoZSBjdXJyZW50IFwic2F2ZSBzdGF0ZVwiIGZvciBhbiBlbnRpdHkuXG4gKlxuICogQHR5cGUge3tDTEVBTjogU3ltYm9sLCBORVc6IFN5bWJvbCwgRElSVFk6IFN5bWJvbH19XG4gKi9cbmV4cG9ydCBjb25zdCBTQVZFX1NUQVRFID0ge1xuXHRDTEVBTjogU3ltYm9sKCAnRW50aXR5IGlzIHBlcnNpc3RlZC4nICksXG5cdE5FVzogU3ltYm9sKCAnRW50aXR5IGlzIG5ldy4nICksXG5cdERJUlRZOiBTeW1ib2woICdFeGlzdGluZyBlbnRpdHkgaGFzIGNoYW5nZXMgYW5kIG5lZWRzIHBlcnNpc3RlZC4nICksXG59O1xuXG4vKipcbiAqIFZhbGlkYXRpb24gdHlwZXMgYXJlIGZvciBzY2hlbWEncyB0aGF0IGhhdmUgdmFsdWUgdmFyaWF0aW9ucy5cbiAqIEB0eXBlIHt7UkFXOiBzdHJpbmcsIFJFTkRFUkVEOiBzdHJpbmcsIFBSRVRUWTogc3RyaW5nfX1cbiAqL1xuZXhwb3J0IGNvbnN0IFZBTElEQVRFX1RZUEUgPSB7XG5cdFJBVzogJ3JhdycsXG5cdFJFTkRFUkVEOiAncmVuZGVyZWQnLFxuXHRQUkVUVFk6ICdwcmV0dHknLFxufTtcblxuLyoqXG4gKiBQcml2YXRlIHByb3BlcnRpZXMgdXNlZCBpbnRlcm5hbGx5IGJ5IHRoZSBCYXNlIEVudGl0eSBDbGFzc1xuICogQHR5cGUge3tzYXZlU3RhdGU6IGJvb2xlYW59fVxuICovXG5leHBvcnQgY29uc3QgUFJJVkFURV9QUk9QRVJUSUVTID0ge1xuXHRTQVZFX1NUQVRFOiBTeW1ib2woICdiYXNlRW50aXR5UHJpdmF0ZVByb3BlcnRpZXNTYXZlU3RhdGUnICksXG5cdFZBTElEQVRFX1RZUEVTOiBTeW1ib2woICdiYXNlRW50aXR5UHJpdmF0ZVByb3BlcnRpZXNWYWxpZGF0ZVR5cGVzJyApLFxufTtcblxuLyoqXG4gKiBIYXJkY29kZWQgbGlzdCBvZiBtb2RlbCBwcmVmaXhlcyBmb3IgZmllbGRzIG9uIG1vZGVscy5cblxuICogQSBtb2RlbCBwcmVmaXggaXMgc29tZXRoaW5nIHRoYXQgXCJuYW1lc3BhY2VzXCIgYSBmaWVsZCBvbiBhIG1vZGVsLiAgRm9yXG4gKiBleGFtcGxlLCBpZiB0aGUgZmllbGQgaXMgXCJFVlRfSURcIiwgdGhlbiB0aGUgcHJlZml4IGlzIFwiRVZUXCI7IGlmIHRoZSBmaWVsZCBpc1xuICogXCJEVFRfRVZUX3N0YXJ0XCIsIHRoZW4gdGhlIHByZWZpeGVzIGFyZSBcIkRUVFwiLCBhbmQgXCJEVFRfRVZUXCIuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge09iamVjdH0gQSBmaWx0ZXJlZCBvYmplY3QgaW5kZXhlZCBieSBtb2RlbCBuYW1lIGFuZCB0aGUgdmFsdWVzIGFyZVxuICogYW4gYXJyYXkgb2YgbW9kZWwgcHJlZml4ZXMgZm9yIHRoYXQgbW9kZWwuXG4gKi9cbmV4cG9ydCBjb25zdCBNT0RFTF9QUkVGSVhFUyA9ICggbW9kZWxOYW1lICkgPT4ge1xuXHRjb25zdCBwcmVmaXhNYXAgPSBhcHBseUZpbHRlcnMoXG5cdFx0J0ZIRUVfX0VOVElUWV9GQUNUT1JZX19DT05TVEFOVFNfX01PREVMX1BSRUZJWEVTJyxcblx0XHR7XG5cdFx0XHRhbnN3ZXI6IFsgJ0FOUycgXSxcblx0XHRcdGF0dGVuZGVlOiBbICdBVFQnIF0sXG5cdFx0XHRjaGFuZ2VfbG9nOiBbICdMT0cnIF0sXG5cdFx0XHRjaGVja2luOiBbICdDSEsnIF0sXG5cdFx0XHRjb3VudHJ5OiBbICdDTlQnIF0sXG5cdFx0XHRjdXJyZW5jeTogWyAnQ1VSJyBdLFxuXHRcdFx0Y3VycmVuY3lfcGF5bWVudF9tZXRob2Q6IFsgJ0NQTScgXSxcblx0XHRcdGRhdGV0aW1lOiBbICdEVFQnLCAnRFRUX0VWVCcgXSxcblx0XHRcdGRhdGV0aW1lX3RpY2tldDogWyAnRFRLJyBdLFxuXHRcdFx0ZXZlbnQ6IFsgJ0VWVCcgXSxcblx0XHRcdGV2ZW50X21lc3NhZ2VfdGVtcGxhdGU6IFsgJ0VNVCcgXSxcblx0XHRcdGV2ZW50X3F1ZXN0aW9uX2dyb3VwOiBbICdFUUcnIF0sXG5cdFx0XHRldmVudF92ZW51ZTogWyAnRVZWJyBdLFxuXHRcdFx0ZXh0cmFfam9pbjogWyAnRVhKJyBdLFxuXHRcdFx0ZXh0cmFfbWV0YTogWyAnRVhNJyBdLFxuXHRcdFx0bGluZV9pdGVtOiBbICdMSU4nIF0sXG5cdFx0XHRtZXNzYWdlOiBbICdNU0cnIF0sXG5cdFx0XHRtZXNzYWdlX3RlbXBsYXRlOiBbICdNVFAnIF0sXG5cdFx0XHRtZXNzYWdlX3RlbXBsYXRlX2dyb3VwOiBbICdHUlAnLCAnTVRQJyBdLFxuXHRcdFx0cGF5bWVudDogWyAnUEFZJyBdLFxuXHRcdFx0cGF5bWVudF9tZXRob2Q6IFsgJ1BNRCcgXSxcblx0XHRcdHBvc3RfbWV0YTogWyAnbWV0YScgXSxcblx0XHRcdHByaWNlOiBbICdQUkMnIF0sXG5cdFx0XHRwcmljZV90eXBlOiBbICdQUlQnIF0sXG5cdFx0XHRxdWVzdGlvbjogWyAnUVNUJyBdLFxuXHRcdFx0cXVlc3Rpb25fZ3JvdXA6IFsgJ1FTRycgXSxcblx0XHRcdHF1ZXN0aW9uX2dyb3VwX3F1ZXN0aW9uOiBbICdRR1EnIF0sXG5cdFx0XHRxdWVzdGlvbl9vcHRpb246IFsgJ1FTTycgXSxcblx0XHRcdHJlY3VycmVuY2U6IFsgJ1JDUicgXSxcblx0XHRcdHJlZ2lzdHJhdGlvbjogWyAnUkVHJyBdLFxuXHRcdFx0cmVnaXN0cmF0aW9uX3BheW1lbnQ6IFsgJ1JQWScgXSxcblx0XHRcdHN0YXRlOiBbICdTVEEnIF0sXG5cdFx0XHRzdGF0dXM6IFsgJ1NUUycgXSxcblx0XHRcdHRlcm06IFsgJ3Rlcm0nIF0sXG5cdFx0XHR0ZXJtX3JlbGF0aW9uc2hpcDogW10sXG5cdFx0XHR0ZXJtX3RheG9ub215OiBbICd0ZXJtX3RheG9ub215JyBdLFxuXHRcdFx0dGlja2V0OiBbICdUS1QnIF0sXG5cdFx0XHR0aWNrZXRfcHJpY2U6IFsgJ1RLUCcgXSxcblx0XHRcdHRpY2tldF90ZW1wbGF0ZTogWyAnVFRNJyBdLFxuXHRcdFx0dHJhbnNhY3Rpb246IFsgJ1RYTicgXSxcblx0XHRcdHZlbnVlOiBbICdWTlUnIF0sXG5cdFx0XHR3cF91c2VyOiBbICd1c2VyJyBdLFxuXHRcdH0gKTtcblx0cmV0dXJuICEgaXNVbmRlZmluZWQoIHByZWZpeE1hcFsgbW9kZWxOYW1lIF0gKSA/XG5cdFx0cHJlZml4TWFwWyBtb2RlbE5hbWUgXSA6XG5cdFx0W107XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGNhbWVsQ2FzZSxcblx0dXBwZXJGaXJzdCxcblx0Zm9yRWFjaCxcblx0aXNVbmRlZmluZWQsXG5cdGlzQXJyYXksXG5cdGtleXMsXG5cdHNvcnRCeSxcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjdWlkIGZyb20gJ2N1aWQnO1xuaW1wb3J0IHsgSW52YWxpZEFyZ3VtZW50IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRhc3NlcnRWYWxpZEZpZWxkQW5kVmFsdWVBZ2FpbnN0U2NoZW1hLFxuXHRhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZCxcbn0gZnJvbSAnLi9hc3NlcnRpb25zJztcbmltcG9ydCB7XG5cdGRlcml2ZVJlbmRlcmVkVmFsdWUsXG5cdGRlcml2ZVByZXBhcmVkVmFsdWVGb3JGaWVsZCxcblx0Z2V0UmVsYXRpb25OYW1lRnJvbUxpbmssXG5cdGdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JDbG9uaW5nLFxuXHRnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yUGVyc2lzdGluZyxcblx0Z2V0UHJpbWFyeUtleUZpZWxkc0Zyb21TY2hlbWEsXG5cdGdldEVudGl0eUZpZWxkc0Zyb21TY2hlbWEsXG5cdGdldERlZmF1bHRWYWx1ZUZvckZpZWxkLFxuXHRkZXJpdmVWYWxpZGF0ZVR5cGVGb3JGaWVsZCxcbn0gZnJvbSAnLi9leHRyYWN0b3JzJztcbmltcG9ydCB7XG5cdGlzRW50aXR5RmllbGQsXG5cdGlzUHJpbWFyeUtleUZpZWxkLFxufSBmcm9tICcuL2Jvb2xlYW5zJztcbmltcG9ydCB7IFBSSVZBVEVfUFJPUEVSVElFUywgU0FWRV9TVEFURSB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqKFxuICogQSBnZW5lcmljIGdldHRlciBjcmVhdG9yIGZvciBhIHByb3ZpZGVkIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZSAgVGhlIG5hbWUgb2YgdGhlIGFjY2Vzc29yLlxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyB1c2VkIHRvIHBhc3MgdGhyb3VnaCBhZGRpdGlvbmFsIG9wdGlvbnMgZm9yIHRoZVxuICogT2JqZWN0LmRlZmluZVByb3BlcnR5IGNhbGwuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVHZXR0ZXIgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIG9wdHMgPSB7fSApID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBpbnN0YW5jZSwgZmllbGROYW1lLCB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIGZpZWxkVmFsdWU7XG5cdFx0fSxcblx0XHQuLi5vcHRzLFxuXHR9ICk7XG59O1xuXG4vKipcbiAqIFRoaXMgY3JlYXRlcyBhIGdldHRlciB0aGF0IGNhbGxzIHRoZSBwcm92aWRlZCBjYWxsYmFjayB3aGVuIGludm9rZWQuXG4gKlxuICogVGhlIGNhbGxiYWNrIHJlY2VpdmVzIHRoZSBgaW5zdGFuY2VgIGFyZ3VtZW50IHBhc3NlZCB0aHJvdWdoXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCl9IGNhbGxCYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQ2FsbGJhY2tHZXR0ZXIgPSAoXG5cdGluc3RhbmNlLFxuXHRwcm9wZXJ0eU5hbWUsXG5cdGNhbGxCYWNrLFxuXHRvcHRzID0ge31cbikgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGluc3RhbmNlLCBwcm9wZXJ0eU5hbWUsIHtcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gY2FsbEJhY2soIGluc3RhbmNlICk7XG5cdFx0fSxcblx0XHQuLi5vcHRzLFxuXHR9ICk7XG59O1xuXG4vKipcbiAqIEEgZ2VuZXJpYyBnZXR0ZXIgYW5kIHNldHRlciBjcmVhdG9yIGZvciBhIHByb3ZpZGVkIGluc3RhbmNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9ICBpbml0aWFsRmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwsIHBhc3MgdGhyb3VnaCBvcHRpb25zIHVzZWQgYnlcbiAqIE9iamVjdC5kZWZpbmVQcm9wZXJ0eVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlR2V0dGVyQW5kU2V0dGVyID0gKFxuXHRpbnN0YW5jZSxcblx0ZmllbGROYW1lLFxuXHRpbml0aWFsRmllbGRWYWx1ZSxcblx0b3B0cyA9IHt9LFxuKSA9PiB7XG5cdGxldCBwcm9wZXJ0eVZhbHVlID0gaW5pdGlhbEZpZWxkVmFsdWU7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggaW5zdGFuY2UsIGZpZWxkTmFtZSwge1xuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiBwcm9wZXJ0eVZhbHVlO1xuXHRcdH0sXG5cdFx0c2V0KCByZWNlaXZlZFZhbHVlICkge1xuXHRcdFx0Y29uc3QgaXNQcmltYXJ5RmllbGQgPSBpc1ByaW1hcnlLZXlGaWVsZCggZmllbGROYW1lLCBpbnN0YW5jZS5zY2hlbWEgKTtcblx0XHRcdGlmICggISBpbnN0YW5jZS5pc05ldyAmJiBpc1ByaW1hcnlGaWVsZCApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0YXNzZXJ0VmFsaWRWYWx1ZUZvclByZXBhcmVkRmllbGQoXG5cdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0cmVjZWl2ZWRWYWx1ZSxcblx0XHRcdFx0aW5zdGFuY2Vcblx0XHRcdCk7XG5cdFx0XHRpZiAoICEgaXNQcmltYXJ5RmllbGQgKSB7XG5cdFx0XHRcdHNldFNhdmVTdGF0ZSggaW5zdGFuY2UsIFNBVkVfU1RBVEUuRElSVFkgKTtcblx0XHRcdFx0c2V0RmllbGRUb1BlcnNpc3QoIGluc3RhbmNlLCBmaWVsZE5hbWUgKTtcblx0XHRcdH1cblx0XHRcdHByb3BlcnR5VmFsdWUgPSByZWNlaXZlZFZhbHVlO1xuXHRcdH0sXG5cdFx0Li4ub3B0cyxcblx0fSApO1xufTtcblxuLyoqXG4gKiBBIGdldHRlciBhbmQgc2V0dGVyIGNyZWF0b3IgZm9yIGFuIGZpZWxkIGFsaWFzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IG9yaWdpbmFsRmllbGROYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gYWxpYXNGaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBbGlhc0dldHRlckFuZFNldHRlciA9IChcblx0aW5zdGFuY2UsXG5cdG9yaWdpbmFsRmllbGROYW1lLFxuXHRhbGlhc0ZpZWxkTmFtZSxcblx0b3B0cyA9IHt9LFxuKSA9PiB7XG5cdGlmICggb3JpZ2luYWxGaWVsZE5hbWUgIT09IGFsaWFzRmllbGROYW1lICkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggaW5zdGFuY2UsIGFsaWFzRmllbGROYW1lLCB7XG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHJldHVybiBpbnN0YW5jZVsgb3JpZ2luYWxGaWVsZE5hbWUgXTtcblx0XHRcdH0sXG5cdFx0XHRzZXQoIHJlY2VpdmVkVmFsdWUgKSB7XG5cdFx0XHRcdHJldHVybiBpbnN0YW5jZVsgb3JpZ2luYWxGaWVsZE5hbWUgXSA9IHJlY2VpdmVkVmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0Li4ub3B0cyxcblx0XHR9ICk7XG5cdH1cbn07XG5cbi8qKlxuICogQSBnZXR0ZXIgY3JlYXRvciBmb3IgYSBmaWVsZCBhbGlhcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmlnaW5hbEZpZWxkTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGFsaWFzRmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQWxpYXNHZXR0ZXIgPSAoXG5cdGluc3RhbmNlLFxuXHRvcmlnaW5hbEZpZWxkTmFtZSxcblx0YWxpYXNGaWVsZE5hbWUsXG5cdG9wdHMgPSB7fSxcbikgPT4ge1xuXHRpZiAoIG9yaWdpbmFsRmllbGROYW1lICE9PSBhbGlhc0ZpZWxkTmFtZSApIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGluc3RhbmNlLCBhbGlhc0ZpZWxkTmFtZSwge1xuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gaW5zdGFuY2VbIG9yaWdpbmFsRmllbGROYW1lIF07XG5cdFx0XHR9LFxuXHRcdFx0Li4ub3B0cyxcblx0XHR9ICk7XG5cdH1cbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZsdWVudCBzZXR0ZXIgb24gdGhlIHByb3ZpZGVkIGluc3RhbmNlIGZvciB0aGUgZ2l2ZW4gZmllbGQgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzICBPcHRpb25zIGZvciBPYmplY3QuZGVmaW5lUHJvcGVydHlcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUZsdWVudFNldHRlciA9ICggaW5zdGFuY2UsIGZpZWxkTmFtZSwgb3B0cyA9IHt9ICkgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGluc3RhbmNlLCAnc2V0JyArIHVwcGVyRmlyc3QoIGZpZWxkTmFtZSApLCB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuICggcmVjZWl2ZWRWYWx1ZSApID0+IHtcblx0XHRcdFx0aW5zdGFuY2VbIGZpZWxkTmFtZSBdID0gcmVjZWl2ZWRWYWx1ZTtcblx0XHRcdFx0cmV0dXJuIGluc3RhbmNlO1xuXHRcdFx0fTtcblx0XHR9LFxuXHRcdC4uLm9wdHMsXG5cdH0gKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBpbml0aWFsIGdldHRlcnMgYW5kIHNldHRlcnMgZm9yIGVudGl0aWVzIG9uIHRoZSBwcm92aWRlZCBlbnRpdHlcbiAqIGluc3RhbmNlIHVzaW5nIHRoZSBnaXZlbiBkYXRhLlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBrZXlzIG9uIGluc3RhbmNlLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlRW50aXR5R2V0dGVyc0FuZFNldHRlcnMgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRjb25zdCBwcmltYXJ5S2V5cyA9IFtdO1xuXHRmb3JFYWNoKFxuXHRcdGluc3RhbmNlLm9yaWdpbmFsRmllbGRzQW5kVmFsdWVzLFxuXHRcdCggZmllbGRWYWx1ZSwgZmllbGROYW1lICkgPT4ge1xuXHRcdFx0Y29uc3QgaXNQcmltYXJ5S2V5ID0gaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hICk7XG5cdFx0XHRzZXRWYWxpZGF0ZVR5cGVGb3JGaWVsZCggaW5zdGFuY2UsIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSApO1xuXHRcdFx0aWYgKCBpc0VudGl0eUZpZWxkKCBmaWVsZE5hbWUsIGluc3RhbmNlLnNjaGVtYSApICkge1xuXHRcdFx0XHRpZiAoIGluc3RhbmNlLmlzTmV3ICkge1xuXHRcdFx0XHRcdGFzc2VydFZhbGlkVmFsdWVGb3JQcmVwYXJlZEZpZWxkKFxuXHRcdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRcdGluc3RhbmNlXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhc3NlcnRWYWxpZEZpZWxkQW5kVmFsdWVBZ2FpbnN0U2NoZW1hKFxuXHRcdFx0XHRcdFx0aW5zdGFuY2UubW9kZWxOYW1lLFxuXHRcdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRcdGluc3RhbmNlXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzZXRJbml0aWFsRW50aXR5RmllbGRzQW5kVmFsdWVzKFxuXHRcdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRcdGlzUHJpbWFyeUtleVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBmaWVsZE5hbWUgPT09ICdfY2FsY3VsYXRlZF9maWVsZHMnICkge1xuXHRcdFx0XHRzZXRDYWxjdWxhdGVkRmllbGRBbmRWYWx1ZXMoIGluc3RhbmNlLCBmaWVsZFZhbHVlICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGZpZWxkTmFtZSA9PT0gJ19wcm90ZWN0ZWQnICkge1xuXHRcdFx0XHRwb3B1bGF0ZVByb3RlY3RlZEZpZWxkc1Byb3BlcnR5KCBpbnN0YW5jZSwgZmllbGRWYWx1ZSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBmaWVsZE5hbWUgPT09ICdsaW5rJyApIHtcblx0XHRcdFx0Y3JlYXRlR2V0dGVyKCBpbnN0YW5jZSwgJ2xpbmsnLCBmaWVsZFZhbHVlICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGZpZWxkTmFtZSA9PT0gJ19saW5rcycgKSB7XG5cdFx0XHRcdHNldFJlc291cmNlcyggaW5zdGFuY2UsIGZpZWxkVmFsdWUgKTtcblx0XHRcdH1cblx0XHRcdGlmICggISBpbnN0YW5jZS5pc05ldyAmJiBpc1ByaW1hcnlLZXkgKSB7XG5cdFx0XHRcdHByaW1hcnlLZXlzLnB1c2goIGZpZWxkTmFtZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0KTtcblx0aWYgKCAhIGluc3RhbmNlLmlzTmV3ICYmIHByaW1hcnlLZXlzLmxlbmd0aCApIHtcblx0XHRjcmVhdGVQcmltYXJ5S2V5RmllbGRHZXR0ZXJzKCBpbnN0YW5jZSwgcHJpbWFyeUtleXMgKTtcblx0fVxuXG5cdHBvcHVsYXRlUHJpbWFyeUtleXMoIGluc3RhbmNlICk7XG5cdHBvcHVsYXRlTWlzc2luZ0ZpZWxkcyggaW5zdGFuY2UgKTtcbn07XG5cbi8qKlxuICogUG9wdWxhdGVzIHRoZSBgcHJvdGVjdGVkRmllbGRzYCBwcm9wZXJ0eSBvbiB0aGUgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge0FycmF5fSBwcm90ZWN0ZWRGaWVsZHNcbiAqL1xuY29uc3QgcG9wdWxhdGVQcm90ZWN0ZWRGaWVsZHNQcm9wZXJ0eSA9ICggaW5zdGFuY2UsIHByb3RlY3RlZEZpZWxkcyApID0+IHtcblx0Ly8gZ2V0IGFueSBjYWxjdWxhdGVkIHByb3RlY3RlZCBmaWVsZHMuXG5cdGNvbnN0IGNhbGN1bGF0ZWRGaWVsZHMgPSBpbnN0YW5jZVxuXHRcdC5vcmlnaW5hbEZpZWxkc0FuZFZhbHVlc1xuXHRcdC5fY2FsY3VsYXRlZF9maWVsZHMgfHwge307XG5cdGlmIChcblx0XHRjYWxjdWxhdGVkRmllbGRzLl9wcm90ZWN0ZWQgJiZcblx0XHRpc0FycmF5KCBjYWxjdWxhdGVkRmllbGRzLl9wcm90ZWN0ZWQgKVxuXHQpIHtcblx0XHRwcm90ZWN0ZWRGaWVsZHMgPSBbXG5cdFx0XHQuLi5wcm90ZWN0ZWRGaWVsZHMsXG5cdFx0XHQuLi5jYWxjdWxhdGVkRmllbGRzLl9wcm90ZWN0ZWQsXG5cdFx0XTtcblx0fVxuXHRjcmVhdGVHZXR0ZXIoIGluc3RhbmNlLCAncHJvdGVjdGVkRmllbGRzJywgcHJvdGVjdGVkRmllbGRzICk7XG59O1xuXG4vKipcbiAqIFRoaXMgcG9wdWxhdGVzIHByaW1hcnkga2V5IGZpZWxkcy5cbiAqIE5vdGUgdGhhdCBpdCBhbHNvIG92ZXJyaWRlcyBhbnkgcHJpbWFyeSBrZXkgdmFsdWVzL3Byb3BlcnRpZXMgdGhhdCBhcmVcbiAqIGFscmVhZHkgc2V0IGluIHRoZSBlbnRpdHkgc28gaXMgb25seSBwcm9jZXNzZWQgd2hlbiB0aGUgaW5zdGFuY2UgaXMgbmV3LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICovXG5jb25zdCBwb3B1bGF0ZVByaW1hcnlLZXlzID0gKCBpbnN0YW5jZSApID0+IHtcblx0aWYgKCAhIGluc3RhbmNlLmlzTmV3ICkge1xuXHRcdHJldHVybjtcblx0fVxuXHRjb25zdCBwcmltYXJ5S2V5cyA9IGdldFByaW1hcnlLZXlGaWVsZHNGcm9tU2NoZW1hKCBpbnN0YW5jZSApO1xuXHRmb3JFYWNoKCBwcmltYXJ5S2V5cywgKFxuXHRcdHNjaGVtYVByb3BlcnRpZXMsXG5cdFx0c2NoZW1hRmllbGRcblx0KSA9PiB7XG5cdFx0Ly8gYWx3YXlzIGRlbGV0ZSBhbmQgb3ZlcnJpZGUgd2hhdCBpcyBleGlzdGluZy5cblx0XHRpZiAoIGluc3RhbmNlWyBzY2hlbWFGaWVsZCBdICkge1xuXHRcdFx0ZGVsZXRlIGluc3RhbmNlWyBzY2hlbWFGaWVsZCBdO1xuXHRcdH1cblx0XHRjcmVhdGVHZXR0ZXJBbmRTZXR0ZXIoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdHNjaGVtYUZpZWxkLFxuXHRcdFx0Y3VpZCgpLFxuXHRcdFx0eyBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IHRydWUgfVxuXHRcdCk7XG5cdFx0Y3JlYXRlQWxpYXNHZXR0ZXJBbmRTZXR0ZXJGb3JGaWVsZCggaW5zdGFuY2UsIHNjaGVtYUZpZWxkICk7XG5cdH0gKTtcblx0Y3JlYXRlUHJpbWFyeUtleUZpZWxkR2V0dGVycyhcblx0XHRpbnN0YW5jZSxcblx0XHRrZXlzKCBwcmltYXJ5S2V5cyApXG5cdCk7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHZhbGlkYXRlIHR5cGUgZm9yIGEgZmllbGQgcHJvcGVydHkuXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICovXG5jb25zdCBzZXRWYWxpZGF0ZVR5cGVGb3JGaWVsZCA9ICggaW5zdGFuY2UsIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSApID0+IHtcblx0aW5zdGFuY2VbIFBSSVZBVEVfUFJPUEVSVElFUy5WQUxJREFURV9UWVBFUyBdWyBmaWVsZE5hbWUgXSA9XG5cdFx0ZGVyaXZlVmFsaWRhdGVUeXBlRm9yRmllbGQoIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgaW5zdGFuY2Uuc2NoZW1hICk7XG59O1xuXG4vKipcbiAqICBQb3B1bGF0ZXMgbWlzc2luZyBmaWVsZHMgYW5kIHZhbHVlcyB1c2luZyBkZWZhdWx0cyBwcm92aWRlZCBieSBzY2hlbWEuICBJZlxuICogIHNjaGVtYSBkb2Vzbid0IHByb3ZpZGUgYSBkZWZhdWx0IHRoZW4gdGhpcyB3aWxsIHBvcHVsYXRlIHRoZSBmaWVsZCB3aXRoIGFcbiAqICBkZWZhdWx0IHZhbHVlIHRoYXQgbWF0Y2hlcyB0aGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqL1xuY29uc3QgcG9wdWxhdGVNaXNzaW5nRmllbGRzID0gKCBpbnN0YW5jZSApID0+IHtcblx0aWYgKCB0eXBlb2YgaW5zdGFuY2UucHJvdGVjdGVkRmllbGRzID09PSAndW5kZWZpbmVkJyApIHtcblx0XHRwb3B1bGF0ZVByb3RlY3RlZEZpZWxkc1Byb3BlcnR5KCBpbnN0YW5jZSwgW10gKTtcblx0fVxuXHRpZiAoICEgaW5zdGFuY2UuaXNOZXcgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGZvckVhY2goXG5cdFx0Z2V0RW50aXR5RmllbGRzRnJvbVNjaGVtYSggaW5zdGFuY2UgKSxcblx0XHQoIHNjaGVtYVByb3BlcnRpZXMsIGZpZWxkTmFtZSApID0+IHtcblx0XHRcdGlmIChcblx0XHRcdFx0dHlwZW9mIGluc3RhbmNlWyBmaWVsZE5hbWUgXSA9PT0gJ3VuZGVmaW5lZCcgJiZcblx0XHRcdFx0ISBpc1ByaW1hcnlLZXlGaWVsZCggZmllbGROYW1lLCBpbnN0YW5jZS5zY2hlbWEgKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNldEluaXRpYWxFbnRpdHlGaWVsZHNBbmRWYWx1ZXMoXG5cdFx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwbGFpbiBvYmplY3Qgb2YgZW50aXR5IGZpZWxkcyBhbmQgdmFsdWVzIGZyb20gdGhpcyBlbnRpdHkgaW5zdGFuY2VcbiAqIGZvciB1c2UgaW4gY2xvbmluZyB0aGUgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IFBsYWluIG9iamVjdCBvZiBhbGwgZmllbGQ6dmFsdWUgcGFpcnMuXG4gKi9cbmNvbnN0IGZvckNsb25lID0gKCBpbnN0YW5jZSApID0+IHtcblx0cmV0dXJuIGdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JDbG9uaW5nKCBpbnN0YW5jZSApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIHRoZSBlbnRpdHkgZmllbGRzIGFuZCB2YWx1ZXMgZnJvbSB0aGlzIGVudGl0eVxuICogaW5zdGFuY2UgcHJlcGFyZWQgZm9yIHVzZSBpbiBhbiB1cGRhdGUgcmVxdWVzdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gUGxhaW4gb2JqZWN0IG9mIGZpZWxkOnZhbHVlIHBhaXJzLlxuICovXG5jb25zdCBmb3JVcGRhdGUgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRyZXR1cm4gZ2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvclBlcnNpc3RpbmcoIGluc3RhbmNlICk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwbGFpbiBvYmplY3Qgb2YgdGhlIGVudGl0eSBmaWVsZHMgYW5kIHZhbHVlcyBmcm9tIHRoaXMgZW50aXR5XG4gKiBpbnN0YW5jZSBwcmVwYXJlZCBmb3IgdXNlIGluIGFuIGluc2VydCByZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBQbGFpbiBvYmplY3Qgb2YgZmllbGQ6dmFsdWUgcGFpcnMuXG4gKi9cbmNvbnN0IGZvckluc2VydCA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdGNvbnN0IGVudGl0eVZhbHVlcyA9IGdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JQZXJzaXN0aW5nKFxuXHRcdGluc3RhbmNlLFxuXHRcdHRydWVcblx0KTtcblx0aW5zdGFuY2UucHJpbWFyeUtleXMuZm9yRWFjaCggKCBwcmltYXJ5S2V5ICkgPT4ge1xuXHRcdGVudGl0eVZhbHVlc1sgcHJpbWFyeUtleSBdID0gaW5zdGFuY2VbIHByaW1hcnlLZXkgXTtcblx0fSApO1xuXHRyZXR1cm4gZW50aXR5VmFsdWVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIHRoZSBlbnRpdHkgZmllbGRzIGFuZCB2YWx1ZXMgZnJvbSB0aGlzIGVudGl0eVxuICogaW5zdGFuY2UgcHJlcGFyZWQgZm9yIHVzZSBpbiBlaXRoZXIgYW4gaW5zZXJ0IG9yIHVwZGF0ZSByZXF1ZXN0LiAgVGhlIHR5cGVcbiAqIGlzIGF1dG9tYXRpY2FsbHkgZGVyaXZlZCBmcm9tIHRoZSBkZXRlcm1pbmluZyB3aGV0aGVyIHRoZSBlbnRpdHkgaXMgXCJuZXdcIiBvclxuICogbm90LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBQbGFpbiBvYmplY3Qgb2YgZmllbGQ6dmFsdWUgcGFpcnMuXG4gKi9cbmNvbnN0IGZvclBlcnNpc3QgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRpZiAoIGluc3RhbmNlLmlzTmV3ICkge1xuXHRcdHJldHVybiBmb3JJbnNlcnQoIGluc3RhbmNlICk7XG5cdH1cblx0cmV0dXJuIGZvclVwZGF0ZSggaW5zdGFuY2UgKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBnZXR0ZXJzIGZvciByZXRyaWV2aW5nIHRoZSBmaWVsZHMgYW5kIHZhbHVlcyBvZiB0aGUgZW50aXR5IGluc3RhbmNlXG4gKiBmb3IgaW5zZXJ0IG9yIHVwZGF0ZSByZXF1ZXN0cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVBlcnNpc3RpbmdHZXR0ZXJzQW5kU2V0dGVycyA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKCBpbnN0YW5jZSwgJ2ZvclVwZGF0ZScsIGZvclVwZGF0ZSApO1xuXHRjcmVhdGVDYWxsYmFja0dldHRlciggaW5zdGFuY2UsICdmb3JJbnNlcnQnLCBmb3JJbnNlcnQgKTtcblx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoIGluc3RhbmNlLCAnZm9yUGVyc2lzdCcsIGZvclBlcnNpc3QgKTtcblx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoIGluc3RhbmNlLCAnZm9yQ2xvbmUnLCBmb3JDbG9uZSApO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGluaXRpYWwgZW50aXR5IGZpZWxkIGFjY2Vzc29ycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBpc1ByaW1hcnlLZXlcbiAqL1xuY29uc3Qgc2V0SW5pdGlhbEVudGl0eUZpZWxkc0FuZFZhbHVlcyA9IChcblx0aW5zdGFuY2UsXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0aXNQcmltYXJ5S2V5ID0gZmFsc2UsXG4pID0+IHtcblx0aWYgKCBpc1VuZGVmaW5lZCggZmllbGRWYWx1ZSApICkge1xuXHRcdGZpZWxkVmFsdWUgPSBnZXREZWZhdWx0VmFsdWVGb3JGaWVsZCggZmllbGROYW1lLCBpbnN0YW5jZS5zY2hlbWEgKTtcblx0XHRzZXRWYWxpZGF0ZVR5cGVGb3JGaWVsZCggaW5zdGFuY2UsIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSApO1xuXHR9XG5cdGNyZWF0ZVJhd0VudGl0eUdldHRlcnNTZXR0ZXJzKFxuXHRcdGluc3RhbmNlLFxuXHRcdGZpZWxkTmFtZSxcblx0XHRkZXJpdmVQcmVwYXJlZFZhbHVlRm9yRmllbGQoIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgaW5zdGFuY2UgKSxcblx0XHRpc1ByaW1hcnlLZXlcblx0KTtcblx0aWYgKCAhIGlzUHJpbWFyeUtleSApIHtcblx0XHRjcmVhdGVSZW5kZXJlZEdldHRlcnMoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdGRlcml2ZVJlbmRlcmVkVmFsdWUoIGZpZWxkVmFsdWUgKVxuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQ3JlYXRlcyByYXcgZW50aXR5IGdldHRlcnMgYW5kIHNldHRlcnMuICBUaGVzZSBhcmUgdGhlIHByb3BlcnRpZXMgb2YgYW5cbiAqIGVudGl0eSB0aGF0IGhhdmUgdGhlIHZhbHVlcyB1c2VkIGZvciBub3Qgb25seSBnZXR0aW5nIGJ1dCBhbHNvIHNldHRpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNQcmltYXJ5S2V5IHNldCB0byB0cnVlIGlmIGZpZWxkIGlzIHRoZSBtb2RlbCdzIHByaW1hcnkga2V5XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVSYXdFbnRpdHlHZXR0ZXJzU2V0dGVycyA9IChcblx0aW5zdGFuY2UsXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0aXNQcmltYXJ5S2V5ID0gZmFsc2UsXG4pID0+IHtcblx0Y29uc3Qgb3B0cyA9IHsgZW51bWVyYWJsZTogdHJ1ZSB9O1xuXHQvLyBwcmltYXJ5IGtleSBpcyBpbW11dGFibGVcblx0aWYgKCBpc1ByaW1hcnlLZXkgKSB7XG5cdFx0Y3JlYXRlR2V0dGVyKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0b3B0c1xuXHRcdCk7XG5cdFx0Y3JlYXRlQWxpYXNHZXR0ZXJGb3JGaWVsZCggaW5zdGFuY2UsIGZpZWxkTmFtZSApO1xuXHR9IGVsc2Uge1xuXHRcdGNyZWF0ZUdldHRlckFuZFNldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdG9wdHNcblx0XHQpO1xuXHRcdGNyZWF0ZUZsdWVudFNldHRlciggaW5zdGFuY2UsIGZpZWxkTmFtZSApO1xuXHRcdGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyRm9yRmllbGQoIGluc3RhbmNlLCBmaWVsZE5hbWUgKTtcblx0fVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIFwiYWxpYXNcIiBnZXR0ZXIgZm9yIHRoZSBnaXZlbiBmaWVsZCBuYW1lIG9uIHRoZSBlbnRpdHkgaW5zdGFuY2UuXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUFsaWFzR2V0dGVyRm9yRmllbGQgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUgKSA9PiB7XG5cdGNyZWF0ZUFsaWFzZXNGb3JNZXRob2QoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGNyZWF0ZUFsaWFzR2V0dGVyICk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgXCJhbGlhc1wiIGdldHRlcnMgYW5kIHNldHRlcnMgZm9yIHRoZSBnaXZlbiBmaWVsZCBvbiB0aGUgZW50aXR5XG4gKiBpbnN0YW5jZS5cbiAqXG4gKiBFeGFtcGxlOiBEYXRldGltZSBlbnRpdGllcyBoYXZlIGEgYERUVF9FVlRfc3RhcnRgIGZpZWxkLiAgT24gdGhlIGVudGl0eVxuICogaW5zdGFuY2UsIHlvdSB3aWxsIGJlIGFibGUgdG8gYWNjZXNzIHRoZSB2YWx1ZSBvZiB0aGF0IGZpZWxkIHZpYTpcbiAqIC0gZGF0ZXRpbWUuRFRUX0VWVF9zdGFydFxuICogLSBkYXRldGltZS5kdHRFdnRTdGFydFxuICogLSBkYXRldGltZS5ldnRTdGFydFxuICogLSBkYXRldGltZS5zdGFydFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQWxpYXNHZXR0ZXJBbmRTZXR0ZXJGb3JGaWVsZCA9ICggaW5zdGFuY2UsIGZpZWxkTmFtZSApID0+IHtcblx0Y3JlYXRlQWxpYXNlc0Zvck1ldGhvZCggaW5zdGFuY2UsIGZpZWxkTmFtZSwgY3JlYXRlQWxpYXNHZXR0ZXJBbmRTZXR0ZXIgKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBBbGlhc2VzIHVzaW5nIHRoZSBwcm92aWRlZCBtZXRob2QuXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG1ldGhvZFxuICovXG5jb25zdCBjcmVhdGVBbGlhc2VzRm9yTWV0aG9kID0gKCBpbnN0YW5jZSwgZmllbGROYW1lLCBtZXRob2QgKSA9PiB7XG5cdC8vIGNhbWVsQ2FzZSBnZXR0ZXIgKG9yIHNldHRlcikgZm9yIGZ1bGwgZmllbGQgbmFtZSAoZWcuIEVWVF9kZXNjID0+IGV2dERlc2MpXG5cdG1ldGhvZCggaW5zdGFuY2UsIGZpZWxkTmFtZSwgY2FtZWxDYXNlKCBmaWVsZE5hbWUgKSApO1xuXHQvLyBzdHJpcCBmaWVsZCBwcmVmaXhlcyBhbmQgY2FtZWxDYXNlIChpZiB0aGVyZSBhcmUgZmllbGQgcHJlZml4ZXMgZm9yIHRoZVxuXHQvLyBlbnRpdHkuIChlZy4gRVZUX2Rlc2MgPT4gZGVzYyk7XG5cdGlmICggaW5zdGFuY2UuZmllbGRQcmVmaXhlcyApIHtcblx0XHRsZXQgbmV3RmllbGROYW1lID0gJyc7XG5cdFx0Ly8gWWVzLCBpdHMgaW50ZW5kZWQgdGhhdCBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgcHJlZml4ZXMsIHRoaXMgY291bGRcblx0XHQvLyBlbmQgdXAgY3JlYXRpbmcgbXVsdGlwbGUgYWxpYXNlZCBnZXR0ZXJzIChvciBzZXR0ZXJzKVxuXHRcdC8vIChlZyBEYXRldGltZTogRFRUX0VWVF9zdGFydCB3b3VsZCBlbmQgdXAgd2l0aCBgZXZ0U3RhcnRgIGFuZCBgc3RhcnRgXG5cdFx0Ly8gYXMgZ2V0dGVyIGFjY2Vzc29ycykuXG5cdFx0aW5zdGFuY2UuZmllbGRQcmVmaXhlcy5mb3JFYWNoKCAoIGZpZWxkUHJlZml4ICkgPT4ge1xuXHRcdFx0bmV3RmllbGROYW1lID0gZmllbGROYW1lLnJlcGxhY2UoIGZpZWxkUHJlZml4ICsgJ18nLCAnJyApO1xuXHRcdFx0aWYgKCBuZXdGaWVsZE5hbWUgIT09IGZpZWxkTmFtZSApIHtcblx0XHRcdFx0bWV0aG9kKFxuXHRcdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRjYW1lbENhc2UoIG5ld0ZpZWxkTmFtZSApXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBjYWxsYmFjayB0aGF0IGlzIHVzZWQgaW4gdGhlIGBnZXRSZW5kZXJlZGAgZmllbGQgZ2V0dGVyLlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihzdHJpbmcpOiAqfSAgQSBjYWxsYmFjay5cbiAqL1xuY29uc3QgZ2V0UmVuZGVyZWRDYWxsYmFjayA9ICggaW5zdGFuY2UgKSA9PiAoIHJlcXVlc3RlZEZpZWxkTmFtZSApID0+XG5cdGluc3RhbmNlWyByZXF1ZXN0ZWRGaWVsZE5hbWUgKyAnUmVuZGVyZWQnIF07XG5cbi8qKlxuICogUmV0dXJucyBhIGZpZWxkTmFtZSBzdHJpcHBlZCBvZiBhbGwgcG9zc2libGUgcHJlZml4ZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBwcmVmaXggZnJlZSBmaWVsZE5hbWUuXG4gKi9cbmNvbnN0IHJlbW92ZVByZWZpeGVzRnJvbUZpZWxkID0gKCBpbnN0YW5jZSwgZmllbGROYW1lICkgPT4ge1xuXHRjb25zdCBwcmVmaXhlc1RvUmVtb3ZlID0gc29ydEJ5KFxuXHRcdGluc3RhbmNlLmZpZWxkUHJlZml4ZXMsXG5cdFx0KCBwcmVmaXggKSA9PiBwcmVmaXgubGVuZ3RoICogLTFcblx0KTtcblx0bGV0IG5ld0ZpZWxkTmFtZSA9IGZpZWxkTmFtZTtcblx0Zm9yRWFjaCggcHJlZml4ZXNUb1JlbW92ZSwgKCBwcmVmaXggKSA9PiB7XG5cdFx0bmV3RmllbGROYW1lID0gZmllbGROYW1lLnJlcGxhY2UoIHByZWZpeCwgJycgKTtcblx0XHRpZiAoIG5ld0ZpZWxkTmFtZSAhPT0gZmllbGROYW1lICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fSApO1xuXHRyZXR1cm4gbmV3RmllbGROYW1lO1xufTtcblxuLyoqXG4gKiBUaGlzIGNyZWF0ZXMgdGhlIGdldHRlcnMgZm9yIHRoZSByZW5kZXJlZCBwcm9wZXJ0eSBvZiBtb2RlbCBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9ICBmaWVsZFZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVSZW5kZXJlZEdldHRlcnMgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUgKSA9PiB7XG5cdGNyZWF0ZUdldHRlcihcblx0XHRpbnN0YW5jZSxcblx0XHRjYW1lbENhc2UoIHJlbW92ZVByZWZpeGVzRnJvbUZpZWxkKCBpbnN0YW5jZSwgZmllbGROYW1lICkgKSArXG5cdFx0J1JlbmRlcmVkJyxcblx0XHRmaWVsZFZhbHVlXG5cdCk7XG5cdGlmICggaXNVbmRlZmluZWQoIGluc3RhbmNlLmdldFJlbmRlcmVkICkgKSB7XG5cdFx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdCdnZXRSZW5kZXJlZCcsXG5cdFx0XHRnZXRSZW5kZXJlZENhbGxiYWNrLFxuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHRoZSBgaGFzTXVsdGlwbGVQcmltYXJ5S2V5c2AgZ2V0dGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7ZnVuY3Rpb24oKTogYm9vbGVhbn0gVGhlIGNhbGxiYWNrIGZvciBoYXNNdWx0aXBsZVByaW1hcnlLZXlzIGdldHRlclxuICovXG5jb25zdCBoYXNNdWx0aXBsZVByaW1hcnlLZXlzQ2FsbGJhY2sgPSAoIGluc3RhbmNlICkgPT5cblx0aW5zdGFuY2UucHJpbWFyeUtleXMubGVuZ3RoID4gMTtcblxuLyoqXG4gKiBDcmVhdGVzIGdldHRlcnMgZm9yIHByaW1hcnkga2V5IHJlbGF0ZWQgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7QXJyYXl9IHByaW1hcnlLZXlzXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVQcmltYXJ5S2V5RmllbGRHZXR0ZXJzID0gKCBpbnN0YW5jZSwgcHJpbWFyeUtleXMgKSA9PiB7XG5cdGNvbnN0IG9wdHMgPSB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9O1xuXHRpZiAoIGlzQXJyYXkoIHByaW1hcnlLZXlzICkgKSB7XG5cdFx0Y3JlYXRlR2V0dGVyKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHQncHJpbWFyeUtleScsXG5cdFx0XHRwcmltYXJ5S2V5c1sgMCBdLFxuXHRcdFx0b3B0c1xuXHRcdCk7XG5cdFx0Y3JlYXRlR2V0dGVyQW5kU2V0dGVyKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHQncHJpbWFyeUtleXMnLFxuXHRcdFx0cHJpbWFyeUtleXMsXG5cdFx0XHRvcHRzXG5cdFx0KTtcblx0XHRjcmVhdGVDYWxsYmFja0dldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0J2hhc011bHRpcGxlUHJpbWFyeUtleXMnLFxuXHRcdFx0aGFzTXVsdGlwbGVQcmltYXJ5S2V5c0NhbGxiYWNrLFxuXHRcdFx0b3B0c1xuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihzdHJpbmcpOiBib29sZWFufSBSZXR1cm5zIGEgY2FsbGJhY2sgZm9yIHRoZVxuICogaGFzQ2FsY3VsYXRlZEZpZWxkIGdldHRlclxuICovXG5jb25zdCBoYXNDYWxjdWxhdGVkRmllbGRDYWxsYmFjayA9ICggaW5zdGFuY2UgKSA9PlxuXHQoIGZpZWxkTmFtZVRvQ2hlY2sgKSA9PiAhIGlzVW5kZWZpbmVkKCBpbnN0YW5jZVsgZmllbGROYW1lVG9DaGVjayBdICk7XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgZ2V0dGVycyBmb3IgYWxsIHRoZSBjYWxjdWxhdGVkIGZpZWxkcyBhbmQgdmFsdWUgb24gdGhlIGVudGl0eS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn1maWVsZHNBbmRWYWx1ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldENhbGN1bGF0ZWRGaWVsZEFuZFZhbHVlcyA9ICggaW5zdGFuY2UsIGZpZWxkc0FuZFZhbHVlcyApID0+IHtcblx0Zm9yRWFjaCggZmllbGRzQW5kVmFsdWVzLCAoIGNhbGN1bGF0ZWRGaWVsZFZhbHVlLCBjYWxjdWxhdGVkRmllbGROYW1lICkgPT4ge1xuXHRcdGlmICggY2FsY3VsYXRlZEZpZWxkTmFtZSAhPT0gJ19wcm90ZWN0ZWQnICkge1xuXHRcdFx0Y3JlYXRlR2V0dGVyKFxuXHRcdFx0XHRpbnN0YW5jZSxcblx0XHRcdFx0Y2FtZWxDYXNlKCBjYWxjdWxhdGVkRmllbGROYW1lICksXG5cdFx0XHRcdGNhbGN1bGF0ZWRGaWVsZFZhbHVlXG5cdFx0XHQpO1xuXHRcdH1cblx0fSApO1xuXHRjcmVhdGVDYWxsYmFja0dldHRlcihcblx0XHRpbnN0YW5jZSxcblx0XHQnaGFzQ2FsY3VsYXRlZEZpZWxkJyxcblx0XHRoYXNDYWxjdWxhdGVkRmllbGRDYWxsYmFja1xuXHQpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgZ2V0dGVycyBmb3IgdGhlIHZhcmlvdXMgcmVzb3VyY2UgbGlua3Mgb24gdGhlIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59ZmllbGRzQW5kVmFsdWVzXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRSZXNvdXJjZXMgPSAoIGluc3RhbmNlLCBmaWVsZHNBbmRWYWx1ZXMgKSA9PiB7XG5cdGNvbnN0IHJlbGF0aW9ucyA9IFtdO1xuXHRsZXQgcmVsYXRpb25OYW1lO1xuXHRmb3JFYWNoKCBmaWVsZHNBbmRWYWx1ZXMsICggcmVzb3VyY2VWYWx1ZSwgcmVzb3VyY2VOYW1lICkgPT4ge1xuXHRcdGlmICggcmVzb3VyY2VOYW1lID09PSAnc2VsZicgKSB7XG5cdFx0XHRjcmVhdGVHZXR0ZXIoIGluc3RhbmNlLCAncmVzb3VyY2VMaW5rJywgcmVzb3VyY2VWYWx1ZVsgMCBdLmhyZWYgKTtcblx0XHR9IGVsc2UgaWYgKCByZXNvdXJjZU5hbWUgPT09ICdjb2xsZWN0aW9uJyApIHtcblx0XHRcdGNyZWF0ZUdldHRlcihcblx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdCdjb2xsZWN0aW9uUmVzb3VyY2VMaW5rJyxcblx0XHRcdFx0cmVzb3VyY2VWYWx1ZVsgMCBdLmhyZWZcblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbGF0aW9uTmFtZSA9IGdldFJlbGF0aW9uTmFtZUZyb21MaW5rKCByZXNvdXJjZU5hbWUgKTtcblx0XHRcdHJlbGF0aW9ucy5wdXNoKCByZWxhdGlvbk5hbWUgKTtcblx0XHRcdHNldFJlbGF0aW9uc1Jlc291cmNlKFxuXHRcdFx0XHRpbnN0YW5jZSxcblx0XHRcdFx0cmVsYXRpb25OYW1lICsgJ1Jlc291cmNlJyxcblx0XHRcdFx0cmVzb3VyY2VWYWx1ZVxuXHRcdFx0KTtcblx0XHR9XG5cdH0gKTtcblx0Ly9zZXQgcmVsYXRpb25zIGdldHRlclxuXHRjcmVhdGVHZXR0ZXIoIGluc3RhbmNlLCAnZ2V0UmVsYXRpb25zJywgcmVsYXRpb25zICk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7ZnVuY3Rpb24oc3RyaW5nKTogT2JqZWN0fSBSZXR1cm5zIHRoZSBjYWxsYmFjayBmb3IgZ2V0dGluZyBhXG4gKiByZWxhdGlvbiByZXNvdXJjZVxuICovXG5jb25zdCBnZXRSZWxhdGlvblJlc291cmNlQ2FsbGJhY2sgPSAoIGluc3RhbmNlICkgPT5cblx0KCByZWxhdGlvbk5hbWUgKSA9PiBpbnN0YW5jZVsgcmVsYXRpb25OYW1lLnJlcGxhY2UoICdSZXNvdXJjZScsICcnICkgXTtcblxuLyoqXG4gKiBDcmVhdGVzIGdldHRlcnMgZm9yIHRoZSByZWxhdGlvbnMgcmVzb3VyY2Ugb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywgc3RyaW5nPn0gcmVzb3VyY2VJbmZvXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRSZWxhdGlvbnNSZXNvdXJjZSA9IChcblx0aW5zdGFuY2UsXG5cdHJlbGF0aW9uTmFtZSxcblx0cmVzb3VyY2VJbmZvXG4pID0+IHtcblx0Y3JlYXRlR2V0dGVyKFxuXHRcdGluc3RhbmNlLFxuXHRcdHJlbGF0aW9uTmFtZSxcblx0XHR7XG5cdFx0XHRyZXNvdXJjZUxpbms6IHJlc291cmNlSW5mb1sgMCBdLmhyZWYsXG5cdFx0XHRzaW5nbGU6IHJlc291cmNlSW5mb1sgMCBdLnNpbmdsZSxcblx0XHR9XG5cdCk7XG5cdGlmICggaXNVbmRlZmluZWQoIGluc3RhbmNlLmdldFJlbGF0aW9uUmVzb3VyY2UgKSApIHtcblx0XHRjcmVhdGVDYWxsYmFja0dldHRlciggaW5zdGFuY2UsXG5cdFx0XHQnZ2V0UmVsYXRpb25SZXNvdXJjZScsXG5cdFx0XHRnZXRSZWxhdGlvblJlc291cmNlQ2FsbGJhY2tcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGludGVybmFsIHNhdmUgc3RhdGUgdG8gdGhlIGdpdmVuIHZhbHVlIHdoZW4gY3VycmVudCBzdGF0ZSBpc1xuICogU0FWRV9TVEFURS5jbGVhbiBvdGhlcndpc2UgY3VycmVudCBzYXZlIHN0YXRlIGlzIHJldGFpbmVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IHNhdmVTdGF0ZSBFeHBlY3RlZCB0byBiZSBvbmUgb2YgU0FWRV9TVEFURSBjb25zdGFudCB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG92ZXJyaWRlIFNldCB0byB0cnVlIHdoZW4gb3ZlcnJpZGluZyB0aGUgZGVmYXVsdCBsb2dpYyBmb3JcbiAqIHNldHRpbmcgc3RhdGUuICBXaGVuIHRydWUsIHRoZSBzYXZlU3RhdGUgaXMgc2V0IHRvIHdoYXRldmVyIHRoZSBpbmNvbWluZ1xuICogc2F2ZVN0YXRlIHZhbHVlIGlzLlxuICovXG5leHBvcnQgY29uc3Qgc2V0U2F2ZVN0YXRlID0gKCBpbnN0YW5jZSwgc2F2ZVN0YXRlLCBvdmVycmlkZSA9IGZhbHNlICkgPT4ge1xuXHRjb25zdCBjdXJyZW50U3RhdGUgPSBpbnN0YW5jZVsgUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEUgXTtcblx0c3dpdGNoICggc2F2ZVN0YXRlICkge1xuXHRcdGNhc2UgU0FWRV9TVEFURS5ESVJUWTpcblx0XHRjYXNlIFNBVkVfU1RBVEUuTkVXOlxuXHRcdGNhc2UgU0FWRV9TVEFURS5DTEVBTjpcblx0XHRcdGlmICggb3ZlcnJpZGUgKSB7XG5cdFx0XHRcdGluc3RhbmNlWyBQUklWQVRFX1BST1BFUlRJRVMuU0FWRV9TVEFURSBdID0gc2F2ZVN0YXRlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGluc3RhbmNlWyBQUklWQVRFX1BST1BFUlRJRVMuU0FWRV9TVEFURSBdID1cblx0XHRcdFx0Y3VycmVudFN0YXRlID09PSBTQVZFX1NUQVRFLkNMRUFOID9cblx0XHRcdFx0XHRzYXZlU3RhdGUgOlxuXHRcdFx0XHRcdGN1cnJlbnRTdGF0ZTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50KFxuXHRcdFx0XHQnU2F2ZSBzdGF0ZSBmb3IgZW50aXR5IGNhbiBvbmx5IGJlIHNldCB0byBlaXRoZXIgJyArXG5cdFx0XHRcdCdTQVZFX1NUQVRFLkRJUlRZLCBTQVZFX1NUQVRFLk5FVyBvciBTQVZFX1NUQVRFLkNMRUFOJ1xuXHRcdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBBZGQgdGhlIGZpZWxkIG5hbWUgdG8gdGhlIGZpZWxkVG9QZXJzaXN0T25JbnNlcnQgcHJvcGVydHkgb24gdGhlIGluc3RhbmNlXG4gKiBpZiBpdCBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRGaWVsZFRvUGVyc2lzdCA9ICggaW5zdGFuY2UsIGZpZWxkTmFtZSApID0+IHtcblx0aWYgKCBpbnN0YW5jZS5maWVsZHNUb1BlcnNpc3RPbkluc2VydCApIHtcblx0XHRpbnN0YW5jZS5maWVsZHNUb1BlcnNpc3RPbkluc2VydC5hZGQoIGZpZWxkTmFtZSApO1xuXHR9XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGlzUGxhaW5PYmplY3QsXG5cdGNhbWVsQ2FzZSxcblx0bGFzdCxcblx0cGljayxcblx0cGlja0J5LFxuXHRpc0FycmF5LFxufSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaW5zdGFuY2VPZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0TW9uZXksXG5cdFNpdGVDdXJyZW5jeSxcblx0U2VydmVyRGF0ZVRpbWUgYXMgRGF0ZVRpbWUsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbHVlLW9iamVjdHMnO1xuXG5pbXBvcnQgeyBwbHVyYWxNb2RlbE5hbWUgfSBmcm9tICcuLi9tb2RlbC1uYW1lcyc7XG5cbmltcG9ydCB7XG5cdGhhc1Jhd1Byb3BlcnR5LFxuXHRoYXNQcmV0dHlQcm9wZXJ0eSxcblx0aGFzUmVuZGVyZWRQcm9wZXJ0eSxcblx0aXNEYXRlVGltZUZpZWxkLFxuXHRpc01vbmV5RmllbGQsXG5cdGlzUHJpbWFyeUtleUZpZWxkLFxuXHRpc0VudGl0eUZpZWxkLFxufSBmcm9tICcuL2Jvb2xlYW5zJztcbmltcG9ydCB7IHZhbGlkYXRlVHlwZUZvckZpZWxkIH0gZnJvbSAnLi92YWxpZGF0b3JzJztcbmltcG9ydCB7IFZBTElEQVRFX1RZUEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogVGhpcyByZWNlaXZlcyBhIGZpZWxkIG5hbWUsIGl0J3MgdmFsdWUgYW5kIHRoZSBzY2hlbWEgYW5kIGNvbnZlcnRzIGl0IHRvIHRoZVxuICogcmVsYXRlZCB2YWx1ZSBvYmplY3QgSUYgdGhlIHNjaGVtYSBpbmRpY2F0ZXMgaXQgaXMgb2YgYSB0eXBlIHRoYXQgdGhlcmUgaXMgYVxuICoga25vd24gdmFsdWUgb2JqZWN0IGZvci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge0RhdGVUaW1lfE1vbmV5fCp9ICBJZiB0aGlzIGlzIG5vdCBhIHZhbHVlIG9iamVjdCwgdGhlIG9yaWdpbmFsIGZpZWxkXG4gKiB2YWx1ZSBpcyByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGNvbnN0IG1heWJlQ29udmVydFRvVmFsdWVPYmplY3QgPSAoIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgc2NoZW1hICkgPT4ge1xuXHRpZiAoXG5cdFx0aXNEYXRlVGltZUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApICYmXG5cdFx0ISBEYXRlVGltZS52YWxpZGF0ZUlzRGF0ZVRpbWUoIGZpZWxkVmFsdWUgKVxuXHQpIHtcblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbUlTTyggZmllbGRWYWx1ZSApO1xuXHR9XG5cdGlmIChcblx0XHRpc01vbmV5RmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgJiZcblx0XHQhICggaW5zdGFuY2VPZiggZmllbGRWYWx1ZSwgJ01vbmV5JyApIClcblx0KSB7XG5cdFx0cmV0dXJuIG5ldyBNb25leSggZmllbGRWYWx1ZSwgU2l0ZUN1cnJlbmN5ICk7XG5cdH1cblx0Ly8gaWYgbW9yZSBWT3MgZ2V0IGFkZGVkLCB0aGVuIGluc3RlYWQgb2YgYWRkaW5nIG1vcmUgaWYgZWxzZSBibG9ja3Ncblx0Ly8gdG8gdGhpcyBmdW5jdGlvbiBhbmQgdGhlIG9uZXMgYmVsb3csIGFsbCBWTyBsb2dpYyBzaG91bGQgYmUgZXh0cmFjdGVkXG5cdC8vIGludG8gc29tZSBraW5kIG9mICBWYWx1ZU9iamVjdEV4dHJhY3RvciBvYmplY3QgdGhhdCB3b3VsZCBob2xkIGFsbCBvZlxuXHQvLyB0aGUgbmVjZXNzYXJ5IGNhbGxiYWNrcyBmb3IgbWFuYWdpbmcgdGhlIGRldGVjdGlvbiBvZiBWTyBmaWVsZHMgYW5kXG5cdC8vIGNvbnZlcnNpb24gb2YgZGF0YSB0byBhbmQgZnJvbSB0aGUgdmFyaW91cyBWT3Ncblx0Ly8gcGx6IHNlZTpcblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2V2ZW50ZXNwcmVzc28vZXZlbnQtZXNwcmVzc28tY29yZS9wdWxsLzYzNy9maWxlcyNyMjI4NjkwNzg5XG5cdHJldHVybiBmaWVsZFZhbHVlO1xufTtcblxuLyoqXG4gKiBUaGlzIGNvbnZlcnRzIHRoZSBpbmNvbWluZyB2YWx1ZSBmb3IgYSBmaWVsZCB0byBpdHMgZXF1aXZhbGVudCBcInJhd1wiIHZhbHVlXG4gKiBmcm9tIGEgdmFsdWUgb2JqZWN0IGlmIGl0IGlzIGEgdmFsdWUgb2JqZWN0LiAgT3RoZXJ3aXNlIGl0IGp1c3QgcmV0dXJucyB0aGVcbiAqIG9yaWdpbmFsIGluY29taW5nIHZhbHVlLiAgVGhpcyBhbHNvIGFzc2VydHMgdGhhdCBpZiB0aGUgcHJvdmlkZWQgZmllbGQgaXNcbiAqIGV4cGVjdGVkIHRvIGJlIGEgdmFsdWUgb2JqZWN0IHRoYXQgdGhlIGluY29taW5nIHZhbHVlIElTIGEgdmFsaWQgdmFsdWUgb2JqZWN0XG4gKiBhbmQgaXQgaXMgdGhlIGV4cGVjdGVkIGluc3RhbmNlIG9mIGEgdmFsdWUgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7KnxNb25leXxEYXRlVGltZX0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7c3RyaW5nfG51bWJlcnwqfSAgSWYgdGhlIHZhbHVlIGlzIG5vdCBhIHZhbHVlIG9iamVjdCwgcmV0dXJucyB0aGVcbiAqIG9yaWdpbmFsIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3RXaXRoQXNzZXJ0aW9ucyA9IChcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRzY2hlbWFcbikgPT4ge1xuXHRpZiAoIGlzRGF0ZVRpbWVGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHREYXRlVGltZS5hc3NlcnRJc0RhdGVUaW1lKCBmaWVsZFZhbHVlICk7XG5cdFx0ZmllbGRWYWx1ZSA9IGZpZWxkVmFsdWUudG9JU08oKTtcblx0fSBlbHNlIGlmICggaXNNb25leUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApICkge1xuXHRcdE1vbmV5LmFzc2VydE1vbmV5KCBmaWVsZFZhbHVlICk7XG5cdFx0ZmllbGRWYWx1ZSA9IGZpZWxkVmFsdWUudG9OdW1iZXIoKTtcblx0fVxuXHRyZXR1cm4gZmllbGRWYWx1ZTtcbn07XG5cbi8qKlxuICogVGhpcyBjb252ZXJ0cyB0aGUgaW5jb21pbmcgdmFsdWUgZm9yIGEgZmllbGQgdG8gaXRzIGVxdWl2YWxlbnQgXCJyYXdcIiB2YWx1ZVxuICogaWYgdGhlIGluY29taW5nIHZhbHVlICBpcyBhIHZhbHVlIG9iamVjdC4gIE90aGVyd2lzZSBpdCBqdXN0IHJldHVybnMgdGhlXG4gKiBvcmlnaW5hbCBpbmNvbWluZyB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0geyp8RGF0ZVRpbWV8TW9uZXl9ZmllbGRWYWx1ZVxuICogQHJldHVybiB7Kn0gVGhlIHJhdyB2YWx1ZSBmb3IgdGhlIHZhbHVlIG9iamVjdCBvciB0aGUgb3JpZ2luYWwgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3QgPSAoIGZpZWxkVmFsdWUgKSA9PiB7XG5cdGlmICggRGF0ZVRpbWUudmFsaWRhdGVJc0RhdGVUaW1lKCBmaWVsZFZhbHVlICkgKSB7XG5cdFx0ZmllbGRWYWx1ZSA9IGZpZWxkVmFsdWUudG9JU08oKTtcblx0fSBlbHNlIGlmICggaW5zdGFuY2VPZiggZmllbGRWYWx1ZSwgJ01vbmV5JyApICkge1xuXHRcdGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLnRvTnVtYmVyKCk7XG5cdH1cblx0cmV0dXJuIGZpZWxkVmFsdWU7XG59O1xuXG4vKipcbiAqIFRoaXMgZGVyaXZlcyB0aGUgXCJwcmVwYXJlZFwiIHZhbHVlIGZvciB0aGUgZ2l2ZW4gZmllbGQgYW5kIHZhbHVlLlxuICpcbiAqIFwiUHJlcGFyZWRcIiBtZWFuczpcbiAqXG4gKiAtIGNvbnZlcnRpbmcgdG8gYSB2YWx1ZSBvYmplY3QgaWYgdGhpcyBpcyBhIGZpZWxkIHRoYXQgdGhlcmUgYXJlIGRlZmluZWRcbiAqICAgdmFsdWUgb2JqZWN0cyBmb3IuXG4gKiAtIHJldHJpZXZpbmcgdGhlIFwicmF3XCIgdmFsdWUgZnJvbSBmaWVsZCB2YWx1ZXMgdGhhdCBoYXZlIGByYXdgIGFuZCBgcmVuZGVyZWRgXG4gKiAgIG9yIGBwcmV0dHlgIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSAgZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtEYXRlVGltZXxNb25leXwqfSAgUmV0dXJucyB0aGUgb3JpZ2luYWwgaW5jb21pbmcgdmFsdWUgaWYgaXQgZG9lc1xuICogbm90IGhhdmUgYSByYXcgZXF1aXZhbGVudCBvciBpcyBub3QgYSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBkZXJpdmVQcmVwYXJlZFZhbHVlRm9yRmllbGQgPSAoXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0aW5zdGFuY2VcbikgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uVHlwZSA9IHZhbGlkYXRlVHlwZUZvckZpZWxkKCBmaWVsZE5hbWUsIGluc3RhbmNlICk7XG5cdGZpZWxkVmFsdWUgPSBpc1BsYWluT2JqZWN0KCBmaWVsZFZhbHVlICkgP1xuXHRcdGZpZWxkVmFsdWVbIHZhbGlkYXRpb25UeXBlIF0gOlxuXHRcdGZpZWxkVmFsdWU7XG5cdHJldHVybiBtYXliZUNvbnZlcnRUb1ZhbHVlT2JqZWN0KCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIGluc3RhbmNlLnNjaGVtYSApO1xufTtcblxuLyoqXG4gKiBUaGlzIHJldHVybnMgdGhlIFwicmVuZGVyZWRcIiBvciBcInByZXR0eVwiIGVxdWl2YWxlbnQgZnJvbSBhIHZhbHVlIGlmIGl0IGV4aXN0c1xuICogYXMgYSBwcm9wZXJ0eSBvbiBpdC5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHsqfSAgVGhlIG9yaWdpbmFsIHZhbHVlIGlzIHJldHVybmVkIGlmIGl0cyBub3QgYSBwbGFpbiBvYmplY3Qgb3IgaWZcbiAqIGl0IGhhcyBubyBgcmVuZGVyZWRgIG9yIGBwcmV0dHlgIHByb3BlcnR5LiAgSG93ZXZlciwgaWYgaXQgaXMgYSBwbGFpbiBvYmplY3RcbiAqIGFuZCBoYXMgbm8gcHJldHR5L3JlbmRlcmVkIHByb3BlcnRpZXMgYnV0IERPRVMgaGF2ZSBhIHJhdyBwcm9wZXJ0eSwgdGhlbiB0aGF0XG4gKiBpcyByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlcml2ZVJlbmRlcmVkVmFsdWUgPSAoIHZhbHVlICkgPT4ge1xuXHRpZiAoICEgaXNQbGFpbk9iamVjdCggdmFsdWUgKSApIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFsdWUgPSBoYXNQcmV0dHlQcm9wZXJ0eSggdmFsdWUgKSA/IHZhbHVlLnByZXR0eSA6IHZhbHVlO1xuXHR2YWx1ZSA9IGhhc1JlbmRlcmVkUHJvcGVydHkoIHZhbHVlICkgPyB2YWx1ZS5yZW5kZXJlZCA6IHZhbHVlO1xuXHRyZXR1cm4gaGFzUmF3UHJvcGVydHkoIHZhbHVlICkgPyB2YWx1ZS5yYXcgOiB2YWx1ZTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbmFtZSBvZiBhIHJlc291cmNlIGZyb20gdGhlIGdpdmVuIGByZXNvdXJjZUxpbmtgLlxuICpcbiAqIGVnLiBcImh0dHBzOi8vYXBpLmV2ZW50ZXNwcmVzc28uY29tL3JlZ2lzdHJhdGlvblwiIHdpbGwgcmV0dXJuICdyZWdpc3RyYXRpb24nO1xuXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VMaW5rXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHJlc291cmNlIGZyb20gYSBwcm92aWRlZCByZXNvdXJjZVxuICogbGluay5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFJlbGF0aW9uTmFtZUZyb21MaW5rID0gKCByZXNvdXJjZUxpbmsgKSA9PiB7XG5cdHJldHVybiBwbHVyYWxNb2RlbE5hbWUoIGNhbWVsQ2FzZSggbGFzdCggcmVzb3VyY2VMaW5rLnNwbGl0KCAnLycgKSApICkgKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHBsYWluIG9iamVjdCBjb250YWluaW5nIHRoZSBlbnRpdHkgZmllbGQgbmFtZXMgYW5kIHZhbHVlcyBmcm9tIHRoZVxuICogcHJvdmlkZWQgZW50aXR5IGluc3RhbmNlLiAgVGhlIHZhbHVlcyBhcmUgbm90IHByZXBhcmVkIGFuZCBtYXRjaCBleGFjdGx5IHdoYXRcbiAqIGlzIGN1cnJlbnRseSBzZXQgb24gdGhpcyBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBlbnRpdHlJbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gQSBwbGFpbiBvYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JDbG9uaW5nID0gKCBlbnRpdHlJbnN0YW5jZSApID0+IHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKCBlbnRpdHlJbnN0YW5jZSApLnJlZHVjZSggKFxuXHRcdGZpZWxkc0FuZFZhbHVlcyxcblx0XHRmaWVsZE5hbWVcblx0KSA9PiB7XG5cdFx0aWYgKFxuXHRcdFx0aXNFbnRpdHlGaWVsZCggZmllbGROYW1lLCBlbnRpdHlJbnN0YW5jZS5zY2hlbWEgKSAmJlxuXHRcdFx0ISBpc1ByaW1hcnlLZXlGaWVsZCggZmllbGROYW1lLCBlbnRpdHlJbnN0YW5jZS5zY2hlbWEgKVxuXHRcdCkge1xuXHRcdFx0ZmllbGRzQW5kVmFsdWVzWyBmaWVsZE5hbWUgXSA9IGVudGl0eUluc3RhbmNlWyBmaWVsZE5hbWUgXTtcblx0XHRcdHJldHVybiBmaWVsZHNBbmRWYWx1ZXM7XG5cdFx0fVxuXHRcdHJldHVybiBmaWVsZHNBbmRWYWx1ZXM7XG5cdH0sIHt9ICk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwbGFpbiBvYmplY3QgY29udGFpbmluZyB0aGUgZW50aXR5IGZpZWxkIG5hbWUgYW5kIHZhbHVlcyBmcm9tIHRoZVxuICogcHJvdmlkZWQgZW50aXR5IGluc3RhbmNlXG4gKiBAcGFyYW0ge09iamVjdH0gZW50aXR5SW5zdGFuY2VcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9ySW5zZXJ0ICBXaGV0aGVyIHRvIHJldHVybiB0aGUgZmllbGRzIGFuZCB2YWx1ZXMgZm9yXG4gKiBpbnNlcnQgb3IgZm9yIHVwZGF0ZS5cbiAqIEByZXR1cm4ge09iamVjdH0gQSBwbGFpbiBvYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JQZXJzaXN0aW5nID0gKFxuXHRlbnRpdHlJbnN0YW5jZSxcblx0Zm9ySW5zZXJ0ID0gZmFsc2VcbikgPT4ge1xuXHRjb25zdCBpdGVyYXRvciA9IGZvckluc2VydCA/XG5cdFx0QXJyYXkuZnJvbSggZW50aXR5SW5zdGFuY2UuZmllbGRzVG9QZXJzaXN0T25JbnNlcnQudmFsdWVzKCkgKSA6XG5cdFx0T2JqZWN0LmtleXMoIGVudGl0eUluc3RhbmNlICk7XG5cblx0cmV0dXJuIGl0ZXJhdG9yLnJlZHVjZSggKFxuXHRcdGZpZWxkc0FuZFZhbHVlcyxcblx0XHRmaWVsZE5hbWVcblx0KSA9PiB7XG5cdFx0aWYgKFxuXHRcdFx0aXNFbnRpdHlGaWVsZCggZmllbGROYW1lLCBlbnRpdHlJbnN0YW5jZS5zY2hlbWEgKSAmJlxuXHRcdFx0ISBpc1ByaW1hcnlLZXlGaWVsZCggZmllbGROYW1lLCBlbnRpdHlJbnN0YW5jZS5zY2hlbWEgKVxuXHRcdCkge1xuXHRcdFx0ZmllbGRzQW5kVmFsdWVzWyBmaWVsZE5hbWUgXSA9IG1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdChcblx0XHRcdFx0ZW50aXR5SW5zdGFuY2VbIGZpZWxkTmFtZSBdLFxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBmaWVsZHNBbmRWYWx1ZXM7XG5cdFx0fVxuXHRcdHJldHVybiBmaWVsZHNBbmRWYWx1ZXM7XG5cdH0sIHt9ICk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHByaW1hcnkga2V5KHMpIGFuZCB2YWx1ZXMgZm9yIHRoZSBnaXZlbiBlbnRpdHlJbnN0YW5jZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbnRpdHlJbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBhbiBhcnJheSBvZiB2YWx1ZXMgZm9yIHRoZSBwcmltYXJ5IGtleXMuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmltYXJ5S2V5VmFsdWVzID0gKCBlbnRpdHlJbnN0YW5jZSApID0+IHBpY2soXG5cdGVudGl0eUluc3RhbmNlLFxuXHRlbnRpdHlJbnN0YW5jZS5wcmltYXJ5S2V5c1xuKTtcblxuLyoqXG4gKiBUaGlzIHJldHVybnMgYSBwbGFpbiBvYmplY3Qgb2YgZW50aXR5IGZpZWxkcyBmcm9tIHRoZSBzY2hlbWEgZm9yIHRoZSBlbnRpdHlcbiAqIGluc3RhbmNlIChzY2hlbWEgZm9yIGZpZWxkcyBhcmUgZXh0cmFjdGVkIGFzIHdlbGwpLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbnRpdHlJbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBBIHBsYWluIG9iamVjdCB3aXRoIGZpZWxkcyBhbmQgc2NoZW1hIHByb3BlcnRpZXMgdGhhdCBhcmVcbiAqIGVudGl0eSBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgY29uc3QgZ2V0RW50aXR5RmllbGRzRnJvbVNjaGVtYSA9ICggZW50aXR5SW5zdGFuY2UgKSA9PiBwaWNrQnkoXG5cdGVudGl0eUluc3RhbmNlLnNjaGVtYSxcblx0KCBmaWVsZFZhbHVlLCBmaWVsZE5hbWUgKSA9PiBpc0VudGl0eUZpZWxkKFxuXHRcdGZpZWxkTmFtZSxcblx0XHRlbnRpdHlJbnN0YW5jZS5zY2hlbWFcblx0KVxuKTtcblxuLyoqXG4gKiBUaGlzIHJldHVybnMgYSBwbGFpbiBvYmplY3Qgb2YgZXh0cmFjdGVkIHByaW1hcnlLZXkgZmllbGRzIGZyb20gdGhlIHNjaGVtYVxuICogZm9yIHRoZSBlbnRpdHkgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVudGl0eUluc3RhbmNlXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgcGxhaW4gb2JqZWN0IHdpdGggZmllbGRzIGFuZCBzY2hlbWEgcHJvcGVydGllcyB0aGF0XG4gKiBcdFx0XHRcdFx0cmVwcmVzZW50IHByaW1hcnkga2V5IGZpZWxkcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFByaW1hcnlLZXlGaWVsZHNGcm9tU2NoZW1hID0gKCBlbnRpdHlJbnN0YW5jZSApID0+IHBpY2tCeShcblx0ZW50aXR5SW5zdGFuY2Uuc2NoZW1hLFxuXHQoIGZpZWxkVmFsdWUsIGZpZWxkTmFtZSApID0+IGlzUHJpbWFyeUtleUZpZWxkKFxuXHRcdGZpZWxkTmFtZSxcblx0XHRlbnRpdHlJbnN0YW5jZS5zY2hlbWFcblx0KVxuKTtcblxuLyoqXG4gKiBEZXJpdmVzIHRoZSBkZWZhdWx0IHZhbHVlIHRvIHVzZSBmb3IgYSBnaXZlbiB0eXBlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHsqfSAgQSB2YWx1ZSB0byB1c2UgZm9yIHRoZSBnaXZlbiB0eXBlLlxuICovXG5leHBvcnQgY29uc3QgZGVyaXZlRGVmYXVsdFZhbHVlRm9yVHlwZSA9ICggdHlwZSApID0+IHtcblx0aWYgKCBpc0FycmF5KCB0eXBlICkgKSB7XG5cdFx0cmV0dXJuIHR5cGUuaW5kZXhPZiggJ251bGwnICkgPiAtMSA/XG5cdFx0XHRudWxsIDpcblx0XHRcdGRlcml2ZURlZmF1bHRWYWx1ZUZvclR5cGUoIHR5cGVbIDAgXSApO1xuXHR9XG5cdHN3aXRjaCAoIHR5cGUgKSB7XG5cdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdHJldHVybiAnJztcblx0XHRjYXNlICdudW1iZXInOlxuXHRcdGNhc2UgJ2ludGVnZXInOlxuXHRcdFx0cmV0dXJuIDA7XG5cdFx0Y2FzZSAnbnVsbCc6XG5cdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdGNhc2UgJ2Jvb2xlYW4nOlxuXHRcdGNhc2UgJ2Jvb2wnOlxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdGNhc2UgJ2RhdGUtdGltZSc6XG5cdFx0XHRyZXR1cm4gKCBuZXcgRGF0ZSgpICkudG9JU09TdHJpbmcoKTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogRGVyaXZlcyB3aGF0IGB0eXBlYCBhIGZpZWxkIGlzIGZyb20gdGhlIHNjaGVtYS5cbiAqIEl0IGFjY291bnRzIGZvciBjYXNlcyB3aGVyZSB0aGUgXCJ0eXBlXCIgb2YgYSBmaWVsZCBtaWdodCBiZSBgZGF0ZS10aW1lYCBvclxuICogd2hlcmUgdGhlIHR5cGUgaXMgYW4gb2JqZWN0IGFuZCB0aHVzIHRoZSBgdHlwZWAgZm9yIHRoZSBwdXJwb3NlcyBvZiBtb2RlbFxuICogZW50aXRpZXMgaXMgZGVmaW5lZCBieSB0aGUgYHJhd2AgcHJvcGVydHkgZm9yIHRoZSBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHsqfSAgV2hhdCB0eXBlIHRoZSBmaWxlZCBpcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlcml2ZVR5cGVGb3JGaWVsZCA9ICggZmllbGROYW1lLCBzY2hlbWEgKSA9PiB7XG5cdGlmICggaXNEYXRlVGltZUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApICkge1xuXHRcdHJldHVybiAnZGF0ZS10aW1lJztcblx0fVxuXHRpZiAoIHNjaGVtYVsgZmllbGROYW1lIF0gJiYgc2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlICkge1xuXHRcdGlmICggc2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlID09PSAnb2JqZWN0JyApIHtcblx0XHRcdGlmIChcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzICYmXG5cdFx0XHRcdGhhc1Jhd1Byb3BlcnR5KCBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMgKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LnR5cGUgP1xuXHRcdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcudHlwZSA6XG5cdFx0XHRcdFx0bnVsbDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gc2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBUaGlzIGRlcml2ZXMgdGhlIHZhbGlkYXRlIHR5cGUgZnJvbSB0aGUgaW5jb21pbmcgZmllbGQgYW5kIHZhbHVlIGFjY29yZGluZ1xuICogdG8gdGhlIHNjaGVtYSBhbmQgaW5jb21pbmcgdmFsdWUuXG4gKlxuICogVGhpcyBhY2NvdW50cyBmb3IgdGhlIGZhY3QgdGhhdCBlbnRpdGllcyBtYXkgYmUgY29uc3RydWN0ZWQgZnJvbSB0aGVcbiAqIGZvbGxvd2luZyBjb250ZXh0czpcbiAqXG4gKiAxLiBBdXRoZWQgUkVTVCByZXNwb25zZSAod2hpY2ggY291bGQgaGF2ZSBib3RoIHJhdywgcmVuZGVyZWQgb3IgcHJldHR5XG4gKiAgICB2YWx1ZXMgaW4gdGhlIGZpZWxkIHZhbHVlKS5cbiAqIDIuIE5vbi1hdXRoZWQgUkVTVCByZXNwb25zZSAod2hpY2ggd2lsbCBub3QgaGF2ZSBhIHJhdyB2YWx1ZSwgYnV0IGNvdWxkIGhhdmVcbiAqICAgIGEgcHJldHR5IG9yIHJlbmRlcmVkIHZhbHVlKS4gIFRoaXMgaXMgcG90ZW50aWFsbHkgcHJvYmxlbWF0aWMgaWYgdGhlXG4gKiAgICByZW5kZXJlZCBvciBwcmV0dHkgdmFsdWUgaXMgb2YgYSBkaWZmZXJlbnQgZGF0YSB0eXBlIHRoYW4gdGhlIHJhdyB2YWx1ZS5cbiAqIDMuIE5ldyBlbnRpdGllcyBidWlsdCBjbGllbnQgc2lkZSwgd2hpY2ggd2lsbCBiZSBhc3N1bWVkIHRvIGJlIHByZXBhcmVkXG4gKiAgICBhZ2FpbnN0IHRoZSBcInJhd1wiIHZhbGlkYXRlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtTeW1ib2x9ICBUaGUgdmFsaWRhdGUgdHlwZSBmb3IgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgZGVyaXZlVmFsaWRhdGVUeXBlRm9yRmllbGQgPSAoIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgc2NoZW1hICkgPT4ge1xuXHRpZiAoIGhhc1Jhd1Byb3BlcnR5KCBmaWVsZFZhbHVlICkgKSB7XG5cdFx0cmV0dXJuIFZBTElEQVRFX1RZUEUuUkFXO1xuXHR9XG5cdGlmICggc2NoZW1hWyBmaWVsZE5hbWUgXSAmJiBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUgKSB7XG5cdFx0aWYgKFxuXHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0aXNQbGFpbk9iamVjdCggZmllbGRWYWx1ZSApXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gaGFzUmVuZGVyZWRQcm9wZXJ0eSggZmllbGRWYWx1ZSApID9cblx0XHRcdFx0VkFMSURBVEVfVFlQRS5SRU5ERVJFRCA6XG5cdFx0XHRcdFZBTElEQVRFX1RZUEUuUFJFVFRZO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gVkFMSURBVEVfVFlQRS5SQVc7XG59O1xuXG4vKipcbiAqIFRoaXMgZ2V0cyB0aGUgZGVmYXVsdCB2YWx1ZSBmb3IgYSBmaWVsZCBmcm9tIHRoZSBwcm92aWRlZCBzY2hlbWEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Kn0gVGhlIGRlZmF1bHQgdmFsdWUgZm9yIHRoZSBmaWVsZCBmcm9tIHRoZSBzY2hlbWEgb3IgaWYgbm90XG4gKiBwcmVzZW50IGluIHRoZSBzY2hlbWEsIGEgZGVyaXZlZCBkZWZhdWx0IHZhbHVlIGZyb20gdGhlIHNjaGVtYSB0eXBlLlxuICovXG5leHBvcnQgY29uc3QgZ2V0RGVmYXVsdFZhbHVlRm9yRmllbGQgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT4ge1xuXHRpZiAoIHNjaGVtYVsgZmllbGROYW1lIF0gKSB7XG5cdFx0cmV0dXJuIHNjaGVtYVsgZmllbGROYW1lIF0uZGVmYXVsdCA/XG5cdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLmRlZmF1bHQgOlxuXHRcdFx0ZGVyaXZlRGVmYXVsdFZhbHVlRm9yVHlwZSggc2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlICk7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBjcmVhdGVFbnRpdHlGYWN0b3J5IH0gZnJvbSAnLi9iYXNlLWVudGl0eSc7XG5leHBvcnQgeyBNT0RFTF9QUkVGSVhFUywgU0FWRV9TVEFURSB9IGZyb20gJy4vY29uc3RhbnRzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRpc0FycmF5LFxuXHRpc0ludGVnZXIsXG5cdGlzU3RyaW5nLFxuXHRpc1BsYWluT2JqZWN0LFxuXHRpc0Jvb2xlYW4sXG5cdGlzTnVtYmVyLFxufSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgc3ByaW50ZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuXG4vKipcbiAqIEludGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNFbnVtRmllbGQsIGlzUHJpbWFyeUtleUZpZWxkLCBpc1ZhbHVlT2JqZWN0RmllbGQgfSBmcm9tICcuL2Jvb2xlYW5zJztcbmltcG9ydCB7IG1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdFdpdGhBc3NlcnRpb25zIH0gZnJvbSAnLi9leHRyYWN0b3JzJztcbmltcG9ydCB7IFBSSVZBVEVfUFJPUEVSVElFUywgVkFMSURBVEVfVFlQRSB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhlIGluY29taW5nIHZhbHVlIGZvciBnaXZlbiB0eXBlLiAgVHlwZXMgYWxsb3dlZCBhcmU6XG4gKlxuICogLSBpbnRlZ2VyOiBjaGVja3MgaWYgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIC0gbnVtYmVyOiBjaGVja3MgaWYgdmFsdWUgaXMgY2xhc3NpZmllZCBhcyBhIE51bWJlciBwcmltaXRpdmUgb3Igb2JqZWN0ICh0aGlzXG4gKiAgIG1lYW5zIGBJbmZpbml0eWAsIGAtSW5maW5pdHlgLCBhbmQgYE5hTmAgYXJlIGNvbnNpZGVyZWQgdmFsaWQgZm9yIHRoaXMgdHlwZVxuICogLSBzdHJpbmdcbiAqIC0gb2JqZWN0IC0gdGhpcyB2YWxpZGF0ZXMgYXMgYSBcInBsYWluT2JqZWN0XCIsIHRoYXQgaXMgYW4gb2JqZWN0IGNyZWF0ZWQgYnlcbiAqICAgdGhlIE9iamVjdCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIFtbUHJvdG90eXBlXV0gb2YgbnVsbC5cbiAqIC0gYm9vbGVhblxuICogLSBib29sOiAoc2FtZSBhcyBib29sZWFuIGNoZWNrKVxuICogLSBudWxsOiB2YWx1ZSBtdXN0IGV4cGxpY2l0bHkgYmUgYG51bGxgXG4gKlxuICogTm90ZTogaWYgdGhlIHBhc3NlZCBpbiB0eXBlIGRvZXMgbm90IGV4aXN0LCB0aGVuIHRoZSB2YWx1ZSBpcyBjb25zaWRlcmVkXG4gKiBpbnZhbGlkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSB0eXBlICBUaGUgdHlwZSBvciB0eXBlcyB0byBjaGVja1xuICogQHBhcmFtIHsqfSB2YWx1ZSAgVGhlIHZhbHVlIGJlaW5nIHZhbGlkYXRlZFxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhlIHZhbHVlIGlzIHZhbGlkIGZvciB0aGUgZ2l2ZW4gdHlwZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlVHlwZSA9ICggdHlwZSwgdmFsdWUgKSA9PiB7XG5cdGxldCB2YWxpZCA9IGZhbHNlO1xuXHQvLyBhY2NvdW50IGZvciB0eXBlIGRlZmluaXRpb25zIHRoYXQgYXJlIGFuIGFycmF5IG9mIGFsbG93ZWQgdHlwZXMuXG5cdGlmICggaXNBcnJheSggdHlwZSApICkge1xuXHRcdGZvciAoIGNvbnN0IHNpbmdsZVR5cGUgb2YgdHlwZSApIHtcblx0XHRcdHZhbGlkID0gdmFsaWRhdGVUeXBlKCBzaW5nbGVUeXBlLCB2YWx1ZSApO1xuXHRcdFx0aWYgKCB2YWxpZCApIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIHJldHVybiByaWdodCBhd2F5IGJlY2F1c2Ugd2UndmUgZGV0ZXJtaW5lZCB0aGUgdmFsaWRpdHkgb2YgdGhlIHR5cGUuXG5cdFx0cmV0dXJuIHZhbGlkO1xuXHR9XG5cdHN3aXRjaCAoIHR5cGUgKSB7XG5cdFx0Y2FzZSAnaW50ZWdlcic6XG5cdFx0XHR2YWxpZCA9IGlzSW50ZWdlciggdmFsdWUgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ251bWJlcic6XG5cdFx0XHR2YWxpZCA9IGlzTnVtYmVyKCB2YWx1ZSApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdHZhbGlkID0gaXNTdHJpbmcoIHZhbHVlICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0dmFsaWQgPSBpc1BsYWluT2JqZWN0KCB2YWx1ZSApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnYm9vbGVhbic6XG5cdFx0Y2FzZSAnYm9vbCc6XG5cdFx0XHR2YWxpZCA9IGlzQm9vbGVhbiggdmFsdWUgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ251bGwnOlxuXHRcdFx0dmFsaWQgPSB2YWx1ZSA9PT0gbnVsbDtcblx0XHRcdGJyZWFrO1xuXHR9XG5cdHJldHVybiB2YWxpZDtcbn07XG5cbi8qKlxuICogVGhpcyB2YWxpZGF0ZXMgZW51bSB0eXBlIG9mIHZhbHVlcy5cbiAqXG4gKiBUaGlzIG1lYW5zIHRoYXQgdGhlIHZhbHVlIG11c3QgYmUgb25lIG9mIHRoZSBwcm92aWRlZCBhcnJheSBvZiBlbnVtVmFsdWVzIGFzXG4gKiB3ZWxsIGFzIGJlaW5nIG9mIHRoZSBleHBlY3RlZCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0FycmF5fSBlbnVtVmFsdWVzXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGlzIHZhbHVlIGlzIHZhbGlkLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFbnVtVHlwZSA9ICggdHlwZSwgZW51bVZhbHVlcywgdmFsdWUgKSA9PiB7XG5cdHJldHVybiB2YWxpZGF0ZVR5cGUoIHR5cGUsIHZhbHVlICkgJiZcblx0XHRpc0FycmF5KCBlbnVtVmFsdWVzICkgJiZcblx0XHRlbnVtVmFsdWVzLmluZGV4T2YoIHZhbHVlICkgPiAtMTtcbn07XG5cbi8qKlxuICogVGhpcyBtZXRob2QgZG9lcyBhIHNoYWxsb3cgdmFsaWRhdGlvbiBmb3IgdGhlIGdpdmVuIHZhbHVlIGFuZCBmaWVsZC5cbiAqXG4gKiBcIlNoYWxsb3dcIiBoZXJlIG1lYW5zIHRoYXQgaWYgdGhlIGZpZWxkIHNjaGVtYSBpcyBvZiB0eXBlICdvYmplY3QnLCB0aGVuIHRoZVxuICogdmFsaWRhdGlvbiBvbmx5IHZlcmlmaWVzIHRoYXQgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC4gIFRoZSBvYmplY3QgY29udGVudHNcbiAqIGFyZSBub3QgdmFsaWRhdGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHBhcmFtIHtib29sZWFufSBleHBlY3RWYWx1ZU9iamVjdHMgIElmIHRydWUsIHRoZW4gdGhpcyBmbGFncyB0aGUgdmFsaWRhdG9yXG4gKiB0byBhc3N1bWUgdGhlIHZhbHVlIG1pZ2h0IGJlIGEgdmFsdWUgb2JqZWN0IGFuZCBhdHRlbXB0IHRvIHJldHJpZXZlIHRoZSByYXdcbiAqIHZhbHVlIGZyb20gdGhhdCB2YWx1ZSBvYmplY3QgZm9yIHZhbGlkYXRpb24gYWdhaW5zdCB0aGUgZXhwZWN0ZWQgdHlwZSBpbiB0aGVcbiAqIHNjaGVtYSBmb3IgdGhhdCBmaWVsZC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoZSB2YWx1ZSBpcyB2YWxpZC5cbiAqIEB0aHJvd3MgVHlwZUVycm9yXG4gKiBAdGhyb3dzIEludmFsaWREYXRlVGltZVxuICovXG5leHBvcnQgY29uc3QgaXNTaGFsbG93VmFsaWRWYWx1ZUZvckZpZWxkID0gKFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdHNjaGVtYSxcblx0ZXhwZWN0VmFsdWVPYmplY3RzID0gdHJ1ZVxuKSA9PiB7XG5cdC8vIGlmIGZpZWxkIGlzIGEgcHJpbWFyeSBLZXkgZmllbGQgdGhlbiB3ZSBvdmVycmlkZSB0aGUgdmFsaWRhdGlvbiBzbyBpdCBjYW5cblx0Ly8gYmUgZWl0aGVyIHN0cmluZyBvciBudW1iZXJcblx0aWYgKCBpc1ByaW1hcnlLZXlGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHRyZXR1cm4gdmFsaWRhdGVUeXBlKCAnc3RyaW5nJywgZmllbGRWYWx1ZSApIHx8XG5cdFx0XHR2YWxpZGF0ZVR5cGUoICdudW1iZXInLCBmaWVsZFZhbHVlICk7XG5cdH1cblx0Y29uc3QgaXNFbnVtID0gaXNFbnVtRmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICk7XG5cdGNvbnN0IGlzVmFsdWVPYmplY3QgPSBpc1ZhbHVlT2JqZWN0RmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICk7XG5cdGZpZWxkVmFsdWUgPSBleHBlY3RWYWx1ZU9iamVjdHMgJiYgaXNWYWx1ZU9iamVjdCA/XG5cdFx0bWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMoXG5cdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0c2NoZW1hXG5cdFx0KSA6XG5cdFx0ZmllbGRWYWx1ZTtcblx0ZmllbGRWYWx1ZSA9IGV4cGVjdFZhbHVlT2JqZWN0cyAmJlxuXHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0aXNWYWx1ZU9iamVjdCA/XG5cdFx0eyByYXc6IGZpZWxkVmFsdWUgfSA6XG5cdFx0ZmllbGRWYWx1ZTtcblx0Y29uc3QgaXNWYWxpZCA9IGlzRW51bSA/XG5cdFx0dmFsaWRhdGVFbnVtVHlwZShcblx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSxcblx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0uZW51bSxcblx0XHRcdGZpZWxkVmFsdWVcblx0XHQpIDpcblx0XHR2YWxpZGF0ZVR5cGUoIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSwgZmllbGRWYWx1ZSApO1xuXHQvLyBpZiBpc0VudW0gYW5kIG5vdCB2YWxpZCwgdGhlbiBsZXRzIGJhaWwgd2l0aCBlcnJvclxuXHRpZiAoIGlzRW51bSAmJiAhIGlzVmFsaWQgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdHNwcmludGYoXG5cdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlc1wiIGZpZWxkTmFtZSBpcyBub3QgdmFsaWQgZm9yIHRoZSBkZWZpbmVkIHNjaGVtYS4gIEl0IG11c3QgYmUgYSBcIiVzXCIgYW5kIGl0IG11c3QgYmUgb25lIG9mIFwiJXNcIi4gVGhlIGZpZWxkVmFsdWUgZ2l2ZW4gd2FzIFwiJXNcIicsXG5cdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5lbnVtLmpvaW4oKSxcblx0XHRcdFx0ZmllbGRWYWx1ZVxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIGlzVmFsaWQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hhdCBpcyBzZXQgYXMgdGhlIHZhbGlkYXRlVHlwZSBmb3IgdGhlIGdpdmVuIGZpZWxkIGFuZCBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHZhbGlkYXRpb24gdHlwZSBmb3IgdGhlIGdpdmVuIGZpZWxkIGFuZCBpbnN0YW5jZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlVHlwZUZvckZpZWxkID0gKCBmaWVsZE5hbWUsIGluc3RhbmNlICkgPT4ge1xuXHRyZXR1cm4gaW5zdGFuY2VbIFBSSVZBVEVfUFJPUEVSVElFUy5WQUxJREFURV9UWVBFUyBdWyBmaWVsZE5hbWUgXSA/XG5cdFx0aW5zdGFuY2VbIFBSSVZBVEVfUFJPUEVSVElFUy5WQUxJREFURV9UWVBFUyBdWyBmaWVsZE5hbWUgXSA6XG5cdFx0VkFMSURBVEVfVFlQRS5SQVc7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBNT0RFTF9OQU1FID0gJ2V2ZW50JztcblxuZXhwb3J0IGNvbnN0IEVWRU5UX1NUQVRVU19JRCA9IHtcblx0U09MRF9PVVQ6ICdzb2xkX291dCcsXG5cdFBPU1RQT05FRDogJ3Bvc3Rwb25lZCcsXG5cdENBTkNFTExFRDogJ2NhbmNlbGxlZCcsXG59O1xuXG5leHBvcnQgY29uc3QgRVZFTlRfU1RBVFVTX0lEUyA9IHZhbHVlcyggRVZFTlRfU1RBVFVTX0lEICk7XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbiIsIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxuXHRHUkVBVEVSX1RIQU4sXG5cdEdSRUFURVJfVEhBTl9BTkRfRVFVQUwsXG5cdExFU1NfVEhBTl9BTkRfRVFVQUwsXG59IGZyb20gJy4uL2Jhc2UnO1xuXG5leHBvcnQgY29uc3Qgbm93RGF0ZUFuZFRpbWUgPSBtb21lbnQoKTtcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdFx0J0VWVF9uYW1lJyxcblx0XHRcdCdFVlRfSUQnLFxuXHRcdFx0J3N0YXJ0X2RhdGUnLFxuXHRcdFx0J2VuZF9kYXRlJyxcblx0XHRcdCd0aWNrZXRfc3RhcnQnLFxuXHRcdFx0J3RpY2tldF9lbmQnLFxuXHRcdF0gKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHRcdHNob3dFeHBpcmVkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRjYXRlZ29yeVNsdWc6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0bW9udGg6IFByb3BUeXBlcy5tb250aCxcblx0fSApLFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdFx0c2hvd0V4cGlyZWQ6IGJvb2xlYW5cbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ3N0YXJ0X2RhdGUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9ERVNDLFxuXHRcdHNob3dFeHBpcmVkOiBmYWxzZSxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0c3RhcnRfZGF0ZTogJ0RhdGV0aW1lLkRUVF9FVlRfc3RhcnQnLFxuXHRcdGVuZF9kYXRlOiAnRGF0ZXRpbWUuRFRUX0VWVF9lbmQnLFxuXHRcdHRpY2tldF9zdGFydDogJ0RhdGV0aW1lLlRpY2tldC5US1Rfc3RhcnRfZGF0ZScsXG5cdFx0dGlja2V0X2VuZDogJ0RhdGV0aW1lLlRpY2tldC5US1RfZW5kX2RhdGUnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiBldmVudHMgZW5kcG9pbnQgcmVxdWVzdCB1c2luZyBwcm92aWRlZFxuICogaW5mb3JtYXRpb24uXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBzaG93RXhwaXJlZCAgV2hldGhlciBvciBub3QgdG8gaW5jbHVkZSBleHBpcmVkIGV2ZW50cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjYXRlZ29yeVNsdWcgIFJldHVybiBldmVudHMgZm9yIHRoZSBnaXZlbiBjYXRlZ29yeVNsdWdcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb250aCAgICAgICAgIFJldHVybiBldmVudHMgZm9yIHRoZSBnaXZlbiBtb250aC5cbiAqIFx0XHRcdFx0XHRcdFx0XHQgQ2FuIGJlIGFueSBtb250aCBmb3JtYXQgcmVjb2duaXplZCBieSBtb21lbnQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICBUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0c2hvd0V4cGlyZWQgPSBmYWxzZSxcblx0Y2F0ZWdvcnlTbHVnLFxuXHRtb250aCA9ICdub25lJyxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cblx0aWYgKCAhIHNob3dFeHBpcmVkICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9lbmQqKmV4cGlyZWRdW109JyArIEdSRUFURVJfVEhBTiArXG5cdFx0XHQnJndoZXJlW0RhdGV0aW1lLkRUVF9FVlRfZW5kKipleHBpcmVkXVtdPScgK1xuXHRcdFx0bm93RGF0ZUFuZFRpbWUubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0aWYgKCBjYXRlZ29yeVNsdWcgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtUZXJtX1JlbGF0aW9uc2hpcC5UZXJtX1RheG9ub215LlRlcm0uc2x1Z109JyArIGNhdGVnb3J5U2x1Z1xuXHRcdCk7XG5cdH1cblx0aWYgKCBtb250aCAmJiBtb250aCAhPT0gJ25vbmUnICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9zdGFydF1bXT0nICsgR1JFQVRFUl9USEFOX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW0RhdGV0aW1lLkRUVF9FVlRfc3RhcnRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5zdGFydE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEYXRldGltZS5EVFRfRVZUX2VuZF1bXT0nICsgTEVTU19USEFOX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW0RhdGV0aW1lLkRUVF9FVlRfZW5kXVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuZW5kT2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL2Jhc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9kZWZhdWx0LW1vZGVsLXN0YXRlJztcbmV4cG9ydCAqIGZyb20gJy4vZW5kcG9pbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vZW50aXR5LWZhY3RvcnknO1xuZXhwb3J0ICogZnJvbSAnLi9wcmltYXJ5LWtleXMnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbC1uYW1lcyc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscyc7XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgcHJpbWFyeUtleXMgfSBmcm9tICcuL3ByaW1hcnkta2V5cy5qcyc7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBrZXlzLCBzdGFydENhc2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHBsdXJhbGl6ZSBmcm9tICdwbHVyYWxpemUnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbWVtaXplJztcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIG1vZGVsIG5hbWVzIGN1cnJlbnRseSBleHBvc2VkIGZvciBSRVNUIEFQSSByZXF1ZXN0LlxuICovXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRVMgPSBrZXlzKCBwcmltYXJ5S2V5cyApO1xuXG4vKipcbiAqIFVzZWQgdG8gbm9ybWFsaXplIHRoZSBwbHVyYWwgZm9ybSBvZiBhIGdpdmVuIG1vZGVsIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICBFbnN1cmVzIHRoZSBnaXZlbiBtb2RlbE5hbWUgaXMgaXRzIHBsdXJhbCBmb3JtLlxuICovXG5leHBvcnQgY29uc3QgcGx1cmFsTW9kZWxOYW1lID0gbWVtb2l6ZShcblx0KCBtb2RlbE5hbWUgKSA9PiBwbHVyYWxpemUoIG1vZGVsTmFtZSApXG4pO1xuXG4vKipcbiAqIFVzZWQgdG8gbm9ybWFsaXplIHRoZSBzaW5ndWxhciBmb3JtIG9mIGEgZ2l2ZW4gbW9kZWwgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge3N0cmluZ30gRW5zdXJlcyB0aGUgZ2l2ZW4gbW9kZWxOYW1lIGlzIGluIGl0cyBzaW5ndWxhciBmb3JtLlxuICovXG5leHBvcnQgY29uc3Qgc2luZ3VsYXJNb2RlbE5hbWUgPSBtZW1vaXplKFxuXHQoIG1vZGVsTmFtZSApID0+IHBsdXJhbGl6ZS5zaW5ndWxhciggbW9kZWxOYW1lIClcbik7XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIGNhcGl0YWxpemVkIHNuYWtlY2FzZSBmb3JtYXQgZm9yIHRoZSBnaXZlbiBtb2RlbCBuYW1lIHR5cGljYWxseVxuICogdXNlZCBpbiBxdWVyeSBzdHJpbmdzLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogbW9kZWxOYW1lRm9yUXVlcnlTdHJpbmcoICdtZXNzYWdlX3RlbXBsYXRlX2dyb3VwJyApO1xuICogLy8gTWVzc2FnZV9UZW1wbGF0ZV9Hcm91cFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGZvcm1hdHRlZCBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBtb2RlbE5hbWVGb3JRdWVyeVN0cmluZyA9IG1lbW9pemUoXG5cdCggbW9kZWxOYW1lICkgPT4ge1xuXHRcdG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKTtcblx0XHRtb2RlbE5hbWUgPSBzdGFydENhc2UoIG1vZGVsTmFtZSApO1xuXHRcdHJldHVybiBtb2RlbE5hbWUucmVwbGFjZSggL1xccy9nLCAnXycgKTtcblx0fVxuKTtcbiIsImltcG9ydCAqIGFzIGF0dGVuZGVlTW9kZWwgZnJvbSAnLi9hdHRlbmRlZSc7XG5pbXBvcnQgKiBhcyBjaGVja0luTW9kZWwgZnJvbSAnLi9jaGVja2luJztcbmltcG9ydCAqIGFzIGRhdGVUaW1lTW9kZWwgZnJvbSAnLi9kYXRldGltZSc7XG5pbXBvcnQgKiBhcyBldmVudE1vZGVsIGZyb20gJy4vZXZlbnQnO1xuaW1wb3J0ICogYXMgcHJpY2VUeXBlTW9kZWwgZnJvbSAnLi9wcmljZS10eXBlJztcbmltcG9ydCAqIGFzIHJlZ2lzdHJhdGlvbk1vZGVsIGZyb20gJy4vcmVnaXN0cmF0aW9uJztcbmltcG9ydCAqIGFzIHN0YXR1c01vZGVsIGZyb20gJy4vc3RhdHVzJztcbmltcG9ydCAqIGFzIHRpY2tldE1vZGVsIGZyb20gJy4vdGlja2V0JztcbmV4cG9ydCB7XG5cdGF0dGVuZGVlTW9kZWwsXG5cdGNoZWNrSW5Nb2RlbCxcblx0ZGF0ZVRpbWVNb2RlbCxcblx0ZXZlbnRNb2RlbCxcblx0cHJpY2VUeXBlTW9kZWwsXG5cdHJlZ2lzdHJhdGlvbk1vZGVsLFxuXHRzdGF0dXNNb2RlbCxcblx0dGlja2V0TW9kZWwsXG59O1xuIiwiXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdwcmljZV90eXBlJztcblxuZXhwb3J0IGNvbnN0IEJBU0VfUFJJQ0VfVFlQRVMgPSB7XG5cdEJBU0VfUFJJQ0U6IDEsXG5cdERJU0NPVU5UOiAyLFxuXHRTVVJDSEFSR0U6IDMsXG5cdFRBWDogNCxcbn07XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzQXJyYXksIHJlZHVjZSwgdHJpbUVuZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdtZW1pemUnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0YXNzZXJ0RW50aXR5SGFzS2V5LFxuXHRhc3NlcnRJc0FycmF5LFxuXHRhc3NlcnRJc05vdEVtcHR5LFxuXHRhc3NlcnRJc01hcCxcbn0gZnJvbSAnLi9hc3NlcnRpb25zJztcblxuLyoqXG4gKiBFeHBvc2VzIGEgbWFwIG9mIG1vZGVsbmFtZSB0byBwcmltYXJ5IGtleSBleHBvc2VkIGJ5IHRoZSBlZWpzLmRhdGEgZ2xvYmFsXG4gKiB2aWEgdGhlIHNlcnZlci5cbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmV4cG9ydCBjb25zdCB7IHByaW1hcnlfa2V5czogcHJpbWFyeUtleXMgPSB7fSB9ID0gZGF0YS5wYXRocztcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZXMgZm9yIHRoZSBnaXZlbiBrZXlzIGZyb20gdGhlIHByb3ZpZGVkIGVudGl0eS5cbiAqIFRoaXMgZnVuY3Rpb24gd291bGQgYmUgdXNlZCBmb3IgbW9kZWxzIHRoYXQgaGF2ZSBjb21iaW5lZCBwcmltYXJ5IGtleXNcbiAqIChkZWxpdmVyZWQgYXMgYW4gYXJyYXkpLlxuICpcbiAqIEB0eXBlIHsgbWVtb2l6ZWQgfVxuICogQHJldHVybiB7IHN0cmluZyB9IFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gZm9yIHRoZSB2YWx1ZXMuXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbHVlc0ZvckNvbWJpbmVkUHJpbWFyeUtleXMgPSBtZW1vaXplKCAoIGtleXMsIGVudGl0eSApID0+IHtcblx0YXNzZXJ0SXNBcnJheSgga2V5cyApO1xuXHRjb25zdCBwcmltYXJ5S2V5ID0gcmVkdWNlKCBrZXlzLCBmdW5jdGlvbiggcmVzdWx0LCBrZXkgKSB7XG5cdFx0YXNzZXJ0RW50aXR5SGFzS2V5KCBrZXksIGVudGl0eSApO1xuXHRcdHJldHVybiBlbnRpdHlbIHJlc3VsdCBdICsgJzonICsgZW50aXR5WyBrZXkgXTtcblx0fSApO1xuXHRyZXR1cm4gdHJpbUVuZCggcHJpbWFyeUtleSwgJzonICk7XG59ICk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgZm9yIHRoZSBnaXZlbiBrZXkgZnJvbSB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogVGhpcyBmdW5jdGlvbiB3b3VsZCBiZSB1c2VkIGZvciBtb2RlbHMgdGhhdCBoYXZlIG9ubHkgb25lIHByaW1hcnkga2V5LlxuICpcbiAqIEB0eXBlIHttZW1vaXplZH1cbiAqIEByZXR1cm4geyBmdW5jdGlvbiB9IFRoZSB2YWx1ZSBmb3IgdGhlIGtleSBpbiB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCB2YWx1ZUZvclByaW1hcnlLZXkgPSBtZW1vaXplKCAoIGtleSwgZW50aXR5ICkgPT4ge1xuXHRhc3NlcnRFbnRpdHlIYXNLZXkoIGtleSwgZW50aXR5ICk7XG5cdHJldHVybiBlbnRpdHlbIGtleSBdO1xufSApO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHByaW1hcnkga2V5IChvciBjb21iaW5lZCBwcmltYXJ5IGtleXMpIGZyb20gdGhlIGF2YWlsYWJsZSBkYXRhLlxuICpcbiAqIEB0eXBlIHttZW1vaXplZH1cbiAqIEByZXR1cm4geyBmdW5jdGlvbihzdHJpbmcpIH1cbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgZ2V0UHJpbWFyeUtleSA9IG1lbW9pemUoICggbW9kZWxOYW1lICkgPT4ge1xuXHRhc3NlcnRFbnRpdHlIYXNLZXkoIG1vZGVsTmFtZSwgcHJpbWFyeUtleXMgKTtcblx0cmV0dXJuIHByaW1hcnlLZXlzWyBtb2RlbE5hbWUgXTtcbn0gKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcXVlcnkgc3RyaW5nIGZvciBnZXR0aW5nIHRoZSBlbnRpdGllcyBiZWxvbmdpbmcgdG8gYSBtb2RlbCBmb3IgdGhlXG4gKiBnaXZlbiBwcmltYXJ5IGtleSB2YWx1ZXNcbiAqXG4gKiBAdHlwZSB7bWVtb2l6ZWR9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmltYXJ5S2V5UXVlcnlTdHJpbmcgPSBtZW1vaXplKFxuXHQoIG1vZGVsTmFtZSwga2V5VmFsdWVzID0gW10gKSA9PiB7XG5cdFx0Y29uc3QgcHJpbWFyeUtleSA9IGdldFByaW1hcnlLZXkoIG1vZGVsTmFtZSApO1xuXHRcdHJldHVybiBgWyR7IHByaW1hcnlLZXkgfV1bSU5dPWAgKyBrZXlWYWx1ZXMuam9pbigpO1xuXHR9XG4pO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlcyBmb3IgdGhlIHByaW1hcnkga2V5cyBmcm9tIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7IGZ1bmN0aW9uIH0gIElmIHRoZSBtb2RlbCBoYXMgb25seSBvbmUgcHJpbWFyeSBrZXkgdGhlbiB0aGUgdmFsdWUgd2lsbFxuICogYmUgYSBzaW1wbGUgc3RyaW5nLiAgSWYgdGhlIG1vZGVsIGhhcyBjb21iaW5lZCBwcmltYXJ5IGtleXMsIHRoZW4gdGhlIHZhbHVlXG4gKiB3aWxsIGJlIGFzIHN0cmluZyBpbiB0aGUgZm9ybWF0IGAlcy4lc2AgZm9yIHRoZSBwcmltYXJ5IGtleSB2YWx1ZXMuXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVudGl0eVByaW1hcnlLZXlWYWx1ZXMgPSBtZW1vaXplKCAoIG1vZGVsTmFtZSwgZW50aXR5ICkgPT4ge1xuXHRjb25zdCBrZXlzID0gZ2V0UHJpbWFyeUtleSggbW9kZWxOYW1lICk7XG5cdHJldHVybiBpc0FycmF5KCBrZXlzICkgP1xuXHRcdHZhbHVlc0ZvckNvbWJpbmVkUHJpbWFyeUtleXMoIGtleXMsIGVudGl0eSApIDpcblx0XHR2YWx1ZUZvclByaW1hcnlLZXkoIGtleXMsIGVudGl0eSApO1xufSApO1xuXG4vKipcbiAqIFRoaXMgcmVjZWl2ZXMgYW4gYXJyYXkgb2YgZW50aXRpZXMgYW5kIHJldHVybnMgYSBjb2xsZWN0aW9uIG9mIHRob3NlIHNhbWVcbiAqIGVudGl0aWVzIGluZGV4ZWQgYnkgdGhlIHByaW1hcnkga2V5IHZhbHVlIGZvciBlYWNoIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge0FycmF5fSBlbnRpdGllc1xuICogQHJldHVybiB7TWFwfSAgQSBjb2xsZWN0aW9uIGluZGV4ZWQgYnkgdGhlIHByaW1hcnkga2V5IHZhbHVlcyBmb3IgZWFjaCBlbnRpdHkuXG4gKiBAdGhyb3dzIHtFeGNlcHRpb259XG4gKi9cbmV4cG9ydCBjb25zdCBrZXlFbnRpdGllc0J5UHJpbWFyeUtleVZhbHVlID0gKCBtb2RlbE5hbWUsIGVudGl0aWVzID0gW10gKSA9PiB7XG5cdGFzc2VydElzTm90RW1wdHkoXG5cdFx0ZW50aXRpZXMsXG5cdFx0X18oXG5cdFx0XHQnVGhlIHByb3ZpZGVkIGFycmF5IG9mIGVudGl0aWVzIG11c3Qgbm90IGJlIGVtcHR5Jyxcblx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0KVxuXHQpO1xuXHRhc3NlcnRJc0FycmF5KCBlbnRpdGllcyApO1xuXG5cdGNvbnN0IG1hcHBlZEVudGl0aWVzID0gbmV3IE1hcCgpO1xuXHRlbnRpdGllcy5mb3JFYWNoKCAoIGVudGl0eSApID0+IHtcblx0XHRtYXBwZWRFbnRpdGllcy5zZXQoXG5cdFx0XHRnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzKCBtb2RlbE5hbWUsIGVudGl0eSApLFxuXHRcdFx0ZW50aXR5XG5cdFx0KTtcblx0fSApO1xuXHRyZXR1cm4gbWFwcGVkRW50aXRpZXM7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgZW50aXR5IGluc3RhbmNlcyB1c2luZyB0aGUgZ2l2ZW4gZmFjdG9yeSBhbmQgYXJyYXlcbiAqIG9mIGVudGl0eSB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGZhY3RvcnlcbiAqIEBwYXJhbSB7TWFwfSBlbnRpdGllc1xuICogQHJldHVybiB7TWFwfSAgQW4gYXJyYXkgb2YgZW50aXR5IGluc3RhbmNlcyBpbmRleGVkIGJ5XG4gKiB0aGVpciBwcmltYXJ5IGtleSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQW5kS2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSA9IChcblx0ZmFjdG9yeSxcblx0ZW50aXRpZXMsXG4pID0+IHtcblx0YXNzZXJ0SXNNYXAoXG5cdFx0ZW50aXRpZXMsXG5cdFx0X18oXG5cdFx0XHQnVGhlIHByb3ZpZGVkIG9iamVjdCBvZiBlbnRpdGllcyBtdXN0IGJlIGEgTWFwIG9iamVjdCcsXG5cdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdClcblx0KTtcblx0ZW50aXRpZXMuZm9yRWFjaCggKCBlbnRpdHksIGVudGl0eUlkICkgPT4ge1xuXHRcdGVudGl0aWVzLnNldCggZW50aXR5SWQsIGZhY3RvcnkuZnJvbUV4aXN0aW5nKCBlbnRpdHkgKSApO1xuXHR9ICk7XG5cdHJldHVybiBlbnRpdGllcztcbn07XG4iLCIvKipcbiAqIEludGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgc3RhdHVzTW9kZWwgZnJvbSAnLi4vc3RhdHVzL2NvbnN0YW50cyc7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdyZWdpc3RyYXRpb24nO1xuXG5leHBvcnQgY29uc3QgUkVHSVNUUkFUSU9OX1NUQVRVU19JRFMgPSB2YWx1ZXMoXG5cdHN0YXR1c01vZGVsLlJFR0lTVFJBVElPTl9TVEFUVVNfSURcbik7XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCwgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxufSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCAqIGFzIHN0YXR1c01vZGVsIGZyb20gJy4uL3N0YXR1cy9jb25zdGFudHMnO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdGZvckV2ZW50SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvckF0dGVuZGVlSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclRyYW5zYWN0aW9uSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclRpY2tldElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JTdGF0dXNJZDogUHJvcFR5cGVzLm9uZU9mKCB2YWx1ZXMoIHN0YXR1c01vZGVsLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQgKSApLFxuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdFx0J1JFR19JRCcsXG5cdFx0XHQnUkVHX2RhdGUnLFxuXHRcdF0gKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHR9ICksXG59O1xuXG5leHBvcnQgY29uc3Qgb3B0aW9uc0VudGl0eU1hcCA9IHtcblx0ZGVmYXVsdDoge1xuXHRcdHZhbHVlOiAnUkVHX0lEJyxcblx0XHRsYWJlbDogJ1JFR19jb2RlJyxcblx0fSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ3JlZ19kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhIHJlZ2lzdHJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0cmVnX2lkOiAnUkVHX0lEJyxcblx0XHRyZWdfZGF0ZTogJ1JFR19kYXRlJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gcmVnaXN0cmF0aW9ucyBlbmRwb2ludCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgICAgXHRJRCBvZiBFdmVudCB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvckF0dGVuZGVlSWQgICAgSUQgb2YgQXR0ZW5kZWUgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JUcmFuc2FjdGlvbklkIElEIG9mIFRyYW5zYWN0aW9uIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yVGlja2V0SWQgXHRcdElEIG9mIFRpY2tldCB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtzdHJpbmd9IGZvclN0YXR1c0lkIFx0XHRJRCBvZiBTdGF0dXMgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgXHRUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdGZvckF0dGVuZGVlSWQgPSAwLFxuXHRmb3JUcmFuc2FjdGlvbklkID0gMCxcblx0Zm9yVGlja2V0SWQgPSAwLFxuXHRmb3JTdGF0dXNJZCA9ICcnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0Zm9yRXZlbnRJZCA9IHBhcnNlSW50KCBmb3JFdmVudElkLCAxMCApO1xuXHRpZiAoIGZvckV2ZW50SWQgIT09IDAgJiYgISBpc05hTiggZm9yRXZlbnRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtFVlRfSURdPScgKyBmb3JFdmVudElkICk7XG5cdH1cblx0Zm9yQXR0ZW5kZWVJZCA9IHBhcnNlSW50KCBmb3JBdHRlbmRlZUlkLCAxMCApO1xuXHRpZiAoIGZvckF0dGVuZGVlSWQgIT09IDAgJiYgISBpc05hTiggZm9yQXR0ZW5kZWVJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtBVFRfSURdPScgKyBmb3JBdHRlbmRlZUlkICk7XG5cdH1cblx0Zm9yVHJhbnNhY3Rpb25JZCA9IHBhcnNlSW50KCBmb3JUcmFuc2FjdGlvbklkLCAxMCApO1xuXHRpZiAoIGZvclRyYW5zYWN0aW9uSWQgIT09IDAgJiYgISBpc05hTiggZm9yVHJhbnNhY3Rpb25JZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtUWE5fSURdPScgKyBmb3JUcmFuc2FjdGlvbklkICk7XG5cdH1cblx0Zm9yVGlja2V0SWQgPSBwYXJzZUludCggZm9yVGlja2V0SWQsIDEwICk7XG5cdGlmICggZm9yVGlja2V0SWQgIT09IDAgJiYgISBpc05hTiggZm9yVGlja2V0SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbVEtUX0lEXT0nICsgZm9yVGlja2V0SWQgKTtcblx0fVxuXHRpZiAoIGZvclN0YXR1c0lkICE9PSAnJyAmJiBmb3JTdGF0dXNJZCAhPT0gbnVsbCApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbU1RTX0lEXT0nICsgZm9yU3RhdHVzSWQgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdzdGF0dXMnO1xuLy8gdHlwZXNcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9FTUFJTCA9ICdlbWFpbCc7XG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfRVZFTlQgPSAnZXZlbnQnO1xuZXhwb3J0IGNvbnN0IFNUQVRVU19UWVBFX01FU1NBR0UgPSAnbWVzc2FnZSc7XG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfUEFZTUVOVCA9ICdwYXltZW50JztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9SRUdJU1RSQVRJT04gPSAncmVnaXN0cmF0aW9uJztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9UUkFOU0FDVElPTiA9ICd0cmFuc2FjdGlvbic7XG4vLyBlbWFpbFxuZXhwb3J0IGNvbnN0IEVNQUlMX1NUQVRVU19JRCA9IHtcblx0RFJBRlQ6ICdFRFInLFxuXHRTRU5UOiAnRVNOJyxcblx0RVhQSVJFRDogJ0VYUCcsXG59O1xuLy8gZXZlbnRcbmV4cG9ydCBjb25zdCBFVkVOVF9TVEFUVVNfSUQgPSB7XG5cdEFDVElWRTogJ0FDVCcsXG5cdFJFR0lTVFJBVElPTl9DTE9TRUQ6ICdDTFMnLFxuXHRERUxFVEVEOiAnREVMJyxcblx0REVOSUVEOiAnREVOJyxcblx0RFJBRlQ6ICdEUkYnLFxuXHROT1RfQUNUSVZFOiAnTkFDJyxcblx0Tk9UX09QRU46ICdOT1AnLFxuXHRPTkdPSU5HOiAnT05HJyxcblx0UkVHSVNUUkFUSU9OX09QRU46ICdPUE4nLFxuXHRQRU5ESU5HOiAnUE5EJyxcblx0U0VDT05EQVJZOiAnU0VDJyxcbn07XG4vLyBtZXNzYWdlXG5leHBvcnQgY29uc3QgTUVTU0FHRV9TVEFUVVNfSUQgPSB7XG5cdERFQlVHOiAnTURPJyxcblx0RVhFQ1VUSU5HOiAnTUVYJyxcblx0RkFJTDogJ01GTCcsXG5cdElOQ09NUExFVEU6ICdNSUMnLFxuXHRJRExFOiAnTUlEJyxcblx0UkVTRU5EOiAnTVJTJyxcblx0UkVUUlk6ICdNUlQnLFxuXHRTRU5UOiAnTVNOJyxcbn07XG4vLyBwYXltZW50XG5leHBvcnQgY29uc3QgUEFZTUVOVF9TVEFUVVNfSUQgPSB7XG5cdEFQUFJPVkVEOiAnUEFQJyxcblx0Q0FOQ0VMTEVEOiAnUENOJyxcblx0REVDTElORUQ6ICdQREMnLFxuXHRGQUlMRUQ6ICdQRkwnLFxuXHRQRU5ESU5HOiAnUFBOJyxcbn07XG4vLyByZWdpc3RyYXRpb25cbmV4cG9ydCBjb25zdCBSRUdJU1RSQVRJT05fU1RBVFVTX0lEID0ge1xuXHRBUFBST1ZFRDogJ1JBUCcsXG5cdENBTkNFTExFRDogJ1JDTicsXG5cdERFQ0xJTkVEOiAnUkRDJyxcblx0SU5DT01QTEVURTogJ1JJQycsXG5cdE5PVF9BUFBST1ZFRDogJ1JOQScsXG5cdFBFTkRJTkdfUEFZTUVOVDogJ1JQUCcsXG5cdFdBSVRfTElTVDogJ1JXTCcsXG59O1xuLy8gdHJhbnNhY3Rpb25cbmV4cG9ydCBjb25zdCBUUkFOU0FDVElPTl9TVEFUVVNfSUQgPSB7XG5cdEFCQU5ET05FRDogJ1RBQicsXG5cdENPTVBMRVRFOiAnVENNJyxcblx0RkFJTEVEOiAnVEZMJyxcblx0SU5DT01QTEVURTogJ1RJTicsXG5cdE9WRVJQQUlEOiAnVE9QJyxcbn07XG5cbi8vIHRoZSBmb2xsb3dpbmcgYXJlIG5vdCBpbiB0aGUgc3RhdHVzIGRhdGFiYXNlIGJ1dCBhcmUga2VwdCBoZXJlIGZvclxuLy8gY29udmVuaWVuY2VcblxuLy8gY3VzdG9tIHBvc3QgdHlwZXNcbmV4cG9ydCBjb25zdCBDUFRfU1RBVFVTX0lEID0ge1xuXHRQVUJMSVNIOiAncHVibGlzaCcsXG5cdEZVVFVSRTogJ2Z1dHVyZScsXG5cdERSQUZUOiAnZHJhZnQnLFxuXHRQRU5ESU5HOiAncGVuZGluZycsXG5cdFBSSVZBVEU6ICdwcml2YXRlJyxcblx0VFJBU0hFRDogJ3RyYXNoJyxcbn07XG5cbmV4cG9ydCBjb25zdCBVTktOT1dOX1NUQVRVU19JRCA9ICd1bmtub3duJztcblxuZXhwb3J0IGNvbnN0IEFMTF9TVEFUVVNfSURTID0gW1xuXHQuLi52YWx1ZXMoIEVNQUlMX1NUQVRVU19JRCApLFxuXHQuLi52YWx1ZXMoIEVWRU5UX1NUQVRVU19JRCApLFxuXHQuLi52YWx1ZXMoIE1FU1NBR0VfU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggUEFZTUVOVF9TVEFUVVNfSUQgKSxcblx0Li4udmFsdWVzKCBSRUdJU1RSQVRJT05fU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggVFJBTlNBQ1RJT05fU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggQ1BUX1NUQVRVU19JRCApLFxuXHRVTktOT1dOX1NUQVRVU19JRCxcbl07XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgc3RhdHVzIGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IEVWRU5UX1NUQVRVU19JRCB9IGZyb20gJy4uL2V2ZW50JztcbmltcG9ydCB7IFRJQ0tFVF9TVEFUVVNfSUQgfSBmcm9tICcuLi90aWNrZXQnO1xuaW1wb3J0IHsgREFURVRJTUVfU1RBVFVTX0lEIH0gZnJvbSAnLi4vZGF0ZXRpbWUnO1xuaW1wb3J0IHsgQ0hFQ0tJTl9TVEFUVVNfSUQgfSBmcm9tICcuLi9jaGVja2luJztcblxuLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbHVlLW9iamVjdHMnO1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBSZWdpc3RyYXRpb24gc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9SRUdJU1RSQVRJT04gPSB7XG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuUEVORElOR19QQVlNRU5UIF06IG5ldyBMYWJlbChcblx0XHRfXyggJ3BlbmRpbmcgcGF5bWVudCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRfXyggJ3BlbmRpbmcgcGF5bWVudHMnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5BUFBST1ZFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FwcHJvdmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuTk9UX0FQUFJPVkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnbm90IGFwcHJvdmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuQ0FOQ0VMTEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnY2FuY2VsbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuSU5DT01QTEVURSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2luY29tcGxldGUnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5ERUNMSU5FRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2RlY2xpbmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuV0FJVF9MSVNUIF06IG5ldyBMYWJlbChcblx0XHRfXyggJ3dhaXQgbGlzdCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRfXyggJ3dhaXQgbGlzdHMnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBUcmFuc2FjdGlvbiBzdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICpcbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9UUkFOU0FDVElPTiA9IHtcblx0WyBzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELk9WRVJQQUlEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnb3ZlcnBhaWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELkNPTVBMRVRFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnY29tcGxldGUnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELklOQ09NUExFVEUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdpbmNvbXBsZXRlJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlRSQU5TQUNUSU9OX1NUQVRVU19JRC5GQUlMRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdmYWlsZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELkFCQU5ET05FRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FiYW5kb25lZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIHBheW1lbnQgc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9QQVlNRU5UID0ge1xuXHRbIHN0YXR1cy5QQVlNRU5UX1NUQVRVU19JRC5BUFBST1ZFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FjY2VwdGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlBBWU1FTlRfU1RBVFVTX0lELlBFTkRJTkcgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdwZW5kaW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlBBWU1FTlRfU1RBVFVTX0lELkNBTkNFTExFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2NhbmNlbGxlZCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0KSxcblx0WyBzdGF0dXMuUEFZTUVOVF9TVEFUVVNfSUQuREVDTElORUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdkZWNsaW5lZCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0KSxcblx0WyBzdGF0dXMuUEFZTUVOVF9TVEFUVVNfSUQuRkFJTEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZmFpbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgTWVzc2FnZSBzdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX01FU1NBR0UgPSB7XG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELlNFTlQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdzZW50JywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELklETEUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdxdWV1ZWQgZm9yIHNlbmRpbmcnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuRkFJTCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2ZhaWxlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5ERUJVRyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2RlYnVnIG9ubHknLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuRVhFQ1VUSU5HIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnbWVzc2VuZ2VyIGlzIGV4ZWN1dGluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5SRVNFTkQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdxdWV1ZWQgZm9yIHJlc2VuZGluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5JTkNPTVBMRVRFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncXVldWVkIGZvciBnZW5lcmF0aW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELlJFVFJZIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZmFpbGVkIHNlbmRpbmcsIGNhbiBiZSByZXRyaWVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgQ1BUIHN0YXR1c2VzXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ1BUID0ge1xuXHRbIHN0YXR1cy5DUFRfU1RBVFVTX0lELlBVQkxJU0ggXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdwdWJsaXNoZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuQ1BUX1NUQVRVU19JRC5GVVRVUkUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdzY2hlZHVsZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuQ1BUX1NUQVRVU19JRC5EUkFGVCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2RyYWZ0JywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLkNQVF9TVEFUVVNfSUQuUEVORElORyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3BlbmRpbmcnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuQ1BUX1NUQVRVU19JRC5QUklWQVRFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncHJpdmF0ZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5DUFRfU1RBVFVTX0lELlRSQVNIRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICd0cmFzaGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vLyB0aGUgZm9sbG93aW5nIHN0YXR1cyBtYXBzIGFyZSBmb3IgbW9kZWwgc3RhdHVzZXMgdGhhdCBhcmUgbm90IHNhdmVkIGluIHRoZVxuLy8gc3RhdHVzIHRhYmxlIGJ1dCBmb3IgY29udmVuaWVuY2UgaGF2ZSB0aGVpciBsYWJlbHMgcmV0cmlldmFibGUgdmlhIGhlcmUuXG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBFdmVudCBTdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0VWRU5UID0ge1xuXHRbIEVWRU5UX1NUQVRVU19JRC5TT0xEX09VVCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3NvbGQgb3V0JywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgRVZFTlRfU1RBVFVTX0lELlBPU1RQT05FRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3Bvc3Rwb25lZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIEVWRU5UX1NUQVRVU19JRC5DQU5DRUxMRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdjYW5jZWxsZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBUaWNrZXQgc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9USUNLRVQgPSB7XG5cdFsgVElDS0VUX1NUQVRVU19JRC5BUkNISVZFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FyY2hpdmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgVElDS0VUX1NUQVRVU19JRC5FWFBJUkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZXhwaXJlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIFRJQ0tFVF9TVEFUVVNfSUQuU09MRF9PVVQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdzb2xkIG91dCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIFRJQ0tFVF9TVEFUVVNfSUQuUEVORElORyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3VwY29taW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgVElDS0VUX1NUQVRVU19JRC5PTlNBTEUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdvbiBzYWxlJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgZGF0ZXRpbWUgc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9EQVRFVElNRSA9IHtcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuQ0FOQ0VMTEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnY2FuY2VsbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgREFURVRJTUVfU1RBVFVTX0lELlNPTERfT1VUIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnc29sZCBvdXQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuRVhQSVJFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2V4cGlyZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuSU5BQ1RJVkUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdpbmFjdGl2ZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIERBVEVUSU1FX1NUQVRVU19JRC5VUENPTUlORyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3VwY29taW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgREFURVRJTUVfU1RBVFVTX0lELkFDVElWRSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FjdGl2ZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIERBVEVUSU1FX1NUQVRVU19JRC5QT1NUUE9ORUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdwb3N0cG9uZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBjaGVja2luIHN0YXR1c2VzXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0NIRUNLSU4gPSB7XG5cdFsgQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfSU4gXTogbmV3IExhYmVsKFxuXHRcdF9fKCAnY2hlY2staW4nLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0X18oICdjaGVjay1pbnMnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBDSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9PVVQgXTogbmV3IExhYmVsKFxuXHRcdF9fKCAnY2hlY2stb3V0JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdF9fKCAnY2hlY2stb3V0cycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIENIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX05FVkVSIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnbmV2ZXIgY2hlY2tlZCBpbicsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBDb21iaW5lZCB0cmFuc2xhdGlvbiBtYXAgZm9yIGFsbCBzdGF0dXNlcy5cbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9BTEwgPSB7XG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfUkVHSVNUUkFUSU9OLFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX1RSQU5TQUNUSU9OLFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX1BBWU1FTlQsXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfTUVTU0FHRSxcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9DUFQsXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfRVZFTlQsXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfVElDS0VULFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX0RBVEVUSU1FLFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX0NIRUNLSU4sXG5cdFsgc3RhdHVzLlVOS05PV05fU1RBVFVTX0lEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAndW5rbm93bicsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwcmV0dHkgc3RhdHVzIGxhYmVsIHN0cmluZyBmb3IgdGhlIGdpdmVuIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RhdHVzQ29kZVxuICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhciAgV2hldGhlciB0byByZXR1cm4gdGhlIHNpbmd1bGFyIG9yIHBsdXJhbCBsYWJlbFxuICogdmFsdWVcbiAqIEBwYXJhbSB7KHNlbnRlbmNlfGxvd2VyfHVwcGVyKX0gc2NoZW1hXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFJldHVybnMgdGhlIG1hcHBlZCBwcmV0dHkgbGFiZWwgZm9yIHRoZSBnaXZlbiBzdGF0dXMgY29kZSBvclxuICogYSBmb3JtYXR0ZWQgJ3Vua293bicgc3RyaW5nIGlmIHRoZXJlIGlzIG5vIG1hcHBlZCB2YWx1ZSBmb3IgdGhlIGdpdmVuIGNvZGUuXG4gKi9cbmV4cG9ydCBjb25zdCBwcmV0dHlTdGF0dXMgPSAoXG5cdHN0YXR1c0NvZGUsXG5cdHNpbmd1bGFyID0gdHJ1ZSxcblx0c2NoZW1hID0gTGFiZWwuRk9STUFUX1NFTlRFTkNFX0NBU0VcbikgPT4ge1xuXHRyZXR1cm4gU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9BTExbIHN0YXR1c0NvZGUgXSA/XG5cdFx0U1RBVFVTX1RSQU5TTEFUSU9OX01BUF9BTExbIHN0YXR1c0NvZGUgXS5hc0Zvcm1hdHRlZCggc2luZ3VsYXIsIHNjaGVtYSApIDpcblx0XHRTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0FMTFsgc3RhdHVzLlVOS05PV05fU1RBVFVTX0lEIF0uYXNGb3JtYXR0ZWQoXG5cdFx0XHRzaW5ndWxhcixcblx0XHRcdHNjaGVtYVxuXHRcdCk7XG59O1xuXG4vKipcbiAqIEV4cGVjdHMgYW4gYXJyYXkgb2Ygc3RhdHVzIGNvZGVzIGFuZCByZXR1cm5zIGFuIG9iamVjdCBpbmRleGVkIGJ5IGNvZGVzIHdpdGhcbiAqIHZhbHVlcyBiZWluZyB0aGUgZm9ybWF0dGVkIHByZXR0eSBsYWJlbHMgZm9yIGVhY2ggY29kZSBhY2NvcmRpbmcgdG8gdGhlXG4gKiBwcm92aWRlZCBhcmd1bWVudHNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzdGF0dXNDb2Rlc1xuICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhclxuICogQHBhcmFtIHsoc2VudGVuY2V8bG93ZXJ8dXBwZXIpfSBzY2hlbWFcbiAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IG1hcHBpbmcgc3RhdHVzIGNvZGUgdG8gcHJldHR5IGxhYmVsLlxuICovXG5leHBvcnQgY29uc3QgcHJldHR5U3RhdHVzZXMgPSAoXG5cdHN0YXR1c0NvZGVzLFxuXHRzaW5ndWxhciA9IHRydWUsXG5cdHNjaGVtYSA9IExhYmVsLkZPUk1BVF9TRU5URU5DRV9DQVNFXG4pID0+IHtcblx0aWYgKCAhIGlzQXJyYXkoIHN0YXR1c0NvZGVzICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ0V4cGVjdCBpbmNvbWluZyBzdGF0dXNDb2RlcyBhcmd1bWVudCcgK1xuXHRcdFx0JyB0byBiZSBhbiBhcnJheScgKTtcblx0fVxuXHRjb25zdCBtYXBwZWRTdGF0dXNlcyA9IHt9O1xuXHRzdGF0dXNDb2Rlcy5mb3JFYWNoKCAoIHN0YXR1c0NvZGUgKSA9PiB7XG5cdFx0bWFwcGVkU3RhdHVzZXNbIHN0YXR1c0NvZGUgXSA9IHByZXR0eVN0YXR1cyhcblx0XHRcdHN0YXR1c0NvZGUsXG5cdFx0XHRzaW5ndWxhcixcblx0XHRcdHNjaGVtYVxuXHRcdCk7XG5cdH0gKTtcblx0cmV0dXJuIG1hcHBlZFN0YXR1c2VzO1xufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9oZWxwZXJzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0FTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG59IGZyb20gJy4uL2Jhc2UnO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMjUsXG5cdFx0b3JkZXJCeTogJ3N0YXR1c0NvZGUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9BU0MsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXR1c0NvZGU6ICdTVFNfY29kZScsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIGV2ZW50cyBlbmRwb2ludCByZXF1ZXN0IHVzaW5nIHByb3ZpZGVkXG4gKiBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhdHVzVHlwZSBcdElEIGZvciB0eXBlIG9mIFN0YXR1cyB0byByZXRyaWV2ZVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICBUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHsgc3RhdHVzVHlwZSB9ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXHRpZiAoIHN0YXR1c1R5cGUgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1NUU190eXBlXT0nICsgc3RhdHVzVHlwZSApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuXG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAndGlja2V0JztcblxuZXhwb3J0IGNvbnN0IFRJQ0tFVF9TVEFUVVNfSUQgPSB7XG5cdFNPTERfT1VUOiAnVEtTJyxcblx0RVhQSVJFRDogJ1RLRScsXG5cdEFSQ0hJVkVEOiAnVEtBJyxcblx0UEVORElORzogJ1RLUCcsXG5cdE9OU0FMRTogJ1RLTycsXG59O1xuXG5leHBvcnQgY29uc3QgVElDS0VUX1NUQVRVU19JRFMgPSB2YWx1ZXMoIFRJQ0tFVF9TVEFUVVNfSUQgKTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9zdGF0dXMtaGVscGVyJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxuXHRHUkVBVEVSX1RIQU4sXG5cdEdSRUFURVJfVEhBTl9BTkRfRVFVQUwsXG5cdExFU1NfVEhBTl9BTkRfRVFVQUwsXG59IGZyb20gJy4uL2Jhc2UnO1xuXG5leHBvcnQgY29uc3Qgbm93RGF0ZUFuZFRpbWUgPSBtb21lbnQoKTtcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdFx0J1RLVF9uYW1lJyxcblx0XHRcdCdUS1RfSUQnLFxuXHRcdFx0J3N0YXJ0X2RhdGUnLFxuXHRcdFx0J2VuZF9kYXRlJyxcblx0XHRdICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0XHRzaG93RXhwaXJlZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0bW9udGg6IFByb3BUeXBlcy5tb250aCxcblx0fSApLFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdFx0c2hvd0V4cGlyZWQ6IGJvb2xlYW5cbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ3N0YXJ0X2RhdGUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9ERVNDLFxuXHRcdHNob3dFeHBpcmVkOiBmYWxzZSxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhIHRpY2tldC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0c3RhcnRfZGF0ZTogJ1RLVF9zdGFydF9kYXRlJyxcblx0XHRlbmRfZGF0ZTogJ1RLVF9lbmRfZGF0ZScsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIHRpY2tldHMgZW5kcG9pbnQgcmVxdWVzdCB1c2luZyBwcm92aWRlZFxuICogaW5mb3JtYXRpb24uXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBzaG93RXhwaXJlZCBcdFdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgZXhwaXJlZCB0aWNrZXRzLlxuICogQHBhcmFtIHtzdHJpbmd9IG1vbnRoICAgICAgICAgICAgUmV0dXJuIHRpY2tldHMgZm9yIHRoZSBnaXZlbiBtb250aC4gQ2FuIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHRpbiBhbnkgbW9udGggZm9ybWF0IHJlY29nbml6ZWQgYnkgbW9tZW50XG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRXZlbnRJZCAgICBcdElEIG9mIEV2ZW50IHRvIHJldHJpZXZlIHRpY2tldHMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRGF0ZXRpbWVJZCAgICBJRCBvZiBEYXRldGltZSB0byByZXRyaWV2ZSB0aWNrZXRzIGZvclxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICBcdFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICgge1xuXHRmb3JFdmVudElkID0gMCxcblx0Zm9yRGF0ZXRpbWVJZCA9IDAsXG5cdHNob3dFeHBpcmVkID0gZmFsc2UsXG5cdG1vbnRoID0gJ25vbmUnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0aWYgKCAhIHNob3dFeHBpcmVkICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVEtUX2VuZF9kYXRlKipleHBpcmVkXVtdPScgKyBHUkVBVEVSX1RIQU4gK1xuXHRcdFx0JyZ3aGVyZVtUS1RfZW5kX2RhdGUqKmV4cGlyZWRdW109JyArXG5cdFx0XHRub3dEYXRlQW5kVGltZS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRpZiAoIG1vbnRoICYmIG1vbnRoICE9PSAnbm9uZScgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtUS1Rfc3RhcnRfZGF0ZV1bXT0nICsgR1JFQVRFUl9USEFOX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW1RLVF9zdGFydF9kYXRlXVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuc3RhcnRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVEtUX2VuZF9kYXRlXVtdPScgKyBMRVNTX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbVEtUX2VuZF9kYXRlXVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuZW5kT2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRmb3JFdmVudElkID0gcGFyc2VJbnQoIGZvckV2ZW50SWQsIDEwICk7XG5cdGlmICggZm9yRXZlbnRJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JFdmVudElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0RhdGV0aW1lLkV2ZW50LkVWVF9JRF09JyArIGZvckV2ZW50SWQgKTtcblx0fVxuXHRmb3JEYXRldGltZUlkID0gcGFyc2VJbnQoIGZvckRhdGV0aW1lSWQsIDEwICk7XG5cdGlmICggZm9yRGF0ZXRpbWVJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JEYXRldGltZUlkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0RhdGV0aW1lLkRUVF9JRF09JyArIGZvckRhdGV0aW1lSWQgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IE1PREVMX05BTUUsIFRJQ0tFVF9TVEFUVVNfSUQgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gVGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHRocm93cyB7VHlwZUVycm9yfVxuICovXG5jb25zdCBhc3NlcnRUaWNrZXRFbnRpdHkgPSAoIFRpY2tldEVudGl0eSApID0+IHtcblx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBUaWNrZXRFbnRpdHksIE1PREVMX05BTUUgKSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0J1RoZSBwcm92aWRlZCBlbnRpdHkgaXMgbm90IGEgdGlja2V0IGluc3RhbmNlJ1xuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gVGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQXJjaGl2ZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IHRyYXNoZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZXZlbnQgZGF0ZSBpcyB2YWxpZCBlbnRpdHkgb3IgYXJjaGl2ZVxuICovXG5jb25zdCBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlID0gKCBUaWNrZXRFbnRpdHksIGluY2x1ZGVBcmNoaXZlZCApID0+IHtcblx0cmV0dXJuICggaW5jbHVkZUFyY2hpdmVkICYmIGFzc2VydFRpY2tldEVudGl0eSggVGlja2V0RW50aXR5ICkgKSB8fFxuICAgICAgICAoICEgaW5jbHVkZUFyY2hpdmVkICYmICEgaXNBcmNoaXZlZCggVGlja2V0RW50aXR5ICkgKTtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gVGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQXJjaGl2ZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IGFyY2hpdmVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRpY2tldCBpcyBjdXJyZW50bHkgYXZhaWxhYmxlIGZvciBwdXJjaGFzZVxuICovXG5leHBvcnQgY29uc3QgaXNPblNhbGUgPSAoIFRpY2tldEVudGl0eSwgaW5jbHVkZUFyY2hpdmVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCBUaWNrZXRFbnRpdHksIGluY2x1ZGVBcmNoaXZlZCApICYmXG5cdFRpY2tldEVudGl0eS5zdGFydERhdGUuZGlmZk5vdygpIDwgMCAmJlxuXHRUaWNrZXRFbnRpdHkuZW5kRGF0ZS5kaWZmTm93KCkgPiAwO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBUaWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVBcmNoaXZlZCBpZiB0cnVlIHdpbGwgbm90IGZpbHRlciBvdXQgYXJjaGl2ZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGlja2V0IGNhbiBubyBsb25nZXIgYmUgcHVyY2hhc2VkXG4gKi9cbmV4cG9ydCBjb25zdCBpc0V4cGlyZWQgPSAoIFRpY2tldEVudGl0eSwgaW5jbHVkZUFyY2hpdmVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCBUaWNrZXRFbnRpdHksIGluY2x1ZGVBcmNoaXZlZCApICYmXG5cdFRpY2tldEVudGl0eS5lbmREYXRlLmRpZmZOb3coKSA8IDA7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IFRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZUFyY2hpdmVkIGlmIHRydWUgd2lsbCBub3QgZmlsdGVyIG91dCBhcmNoaXZlZCBlbnRpdGllc1xuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aWNrZXRzIHNvbGQgbWVldHMgb3IgZXhjZWVkcyBhdmFpbGFibGUgcXVhbnRpdHlcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU29sZE91dCA9ICggVGlja2V0RW50aXR5LCBpbmNsdWRlQXJjaGl2ZWQgPSBmYWxzZSApID0+IHtcblx0aWYgKFxuXHRcdCggaW5jbHVkZUFyY2hpdmVkICYmICEgYXNzZXJ0VGlja2V0RW50aXR5KCBUaWNrZXRFbnRpdHkgKSApIHx8XG5cdFx0KCAhIGluY2x1ZGVBcmNoaXZlZCAmJiBpc0FyY2hpdmVkKCBUaWNrZXRFbnRpdHkgKSApXG5cdCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCBxdHkgPSBUaWNrZXRFbnRpdHkucXR5O1xuXHRyZXR1cm4gKCBxdHkgIT09IG51bGwgJiYgcXR5ICE9PSAnSU5GJyAmJiBxdHkgIT09IEluZmluaXR5ICYmIHF0eSAhPT0gLTEgKSAmJlxuXHRcdFRpY2tldEVudGl0eS5zb2xkID49IHF0eTtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gVGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQXJjaGl2ZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IGFyY2hpdmVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSBcdHRydWUgaWYgdGlja2V0IGlzIG5vdCB5ZXQgYXZhaWxhYmxlIGZvciBwdXJjaGFzZSxcbiAqIFx0XHRcdFx0XHRcdGJ1dCB3aWxsIGJlIGF0IHNvbWUgZGF0ZSBpbiB0aGUgZnV0dXJlXG4gKi9cbmV4cG9ydCBjb25zdCBpc1BlbmRpbmcgPSAoIFRpY2tldEVudGl0eSwgaW5jbHVkZUFyY2hpdmVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCBUaWNrZXRFbnRpdHksIGluY2x1ZGVBcmNoaXZlZCApICYmXG5cdFRpY2tldEVudGl0eS5zdGFydERhdGUuZGlmZk5vdygpID4gMDtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gVGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aWNrZXQgaXMgYXJjaGl2ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGlzQXJjaGl2ZWQgPSAoIFRpY2tldEVudGl0eSApID0+IHtcblx0YXNzZXJ0VGlja2V0RW50aXR5KCBUaWNrZXRFbnRpdHkgKTtcblx0cmV0dXJuIFRpY2tldEVudGl0eS5kZWxldGVkO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBUaWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9IHN0YXR1cyBJRFxuICovXG5leHBvcnQgY29uc3Qgc3RhdHVzID0gKCBUaWNrZXRFbnRpdHkgKSA9PiB7XG5cdGlmICggaXNBcmNoaXZlZCggVGlja2V0RW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIFRJQ0tFVF9TVEFUVVNfSUQuQVJDSElWRUQ7XG5cdH1cblx0aWYgKCBpc1NvbGRPdXQoIFRpY2tldEVudGl0eSApICkge1xuXHRcdHJldHVybiBUSUNLRVRfU1RBVFVTX0lELlNPTERfT1VUO1xuXHR9XG5cdGlmICggaXNFeHBpcmVkKCBUaWNrZXRFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gVElDS0VUX1NUQVRVU19JRC5FWFBJUkVEO1xuXHR9XG5cdGlmICggaXNQZW5kaW5nKCBUaWNrZXRFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gVElDS0VUX1NUQVRVU19JRC5QRU5ESU5HO1xuXHR9XG5cdGlmICggaXNPblNhbGUoIFRpY2tldEVudGl0eSApICkge1xuXHRcdHJldHVybiBUSUNLRVRfU1RBVFVTX0lELk9OU0FMRTtcblx0fVxuXHRyZXR1cm4gJyc7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IFRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ30gdGlja2V0IHN0YXR1c1xuICovXG5leHBvcnQgY29uc3QgZ2V0VGlja2V0U3RhdHVzVGV4dExhYmVsID0gKCBUaWNrZXRFbnRpdHkgKSA9PiB7XG5cdGxldCB0aWNrZXRTdGF0dXMgPSAnJztcblx0c3dpdGNoICggc3RhdHVzKCBUaWNrZXRFbnRpdHkgKSApIHtcblx0XHRjYXNlIFRJQ0tFVF9TVEFUVVNfSUQuU09MRF9PVVQgOlxuXHRcdFx0dGlja2V0U3RhdHVzID0gX18oICdzb2xkIG91dCcsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVElDS0VUX1NUQVRVU19JRC5FWFBJUkVEIDpcblx0XHRcdHRpY2tldFN0YXR1cyA9IF9fKCAnZXhwaXJlZCcsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVElDS0VUX1NUQVRVU19JRC5QRU5ESU5HIDpcblx0XHRcdHRpY2tldFN0YXR1cyA9IF9fKCAncGVuZGluZycsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVElDS0VUX1NUQVRVU19JRC5PTlNBTEUgOlxuXHRcdFx0dGlja2V0U3RhdHVzID0gX18oICdvbiBzYWxlJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBUSUNLRVRfU1RBVFVTX0lELkFSQ0hJVkVEIDpcblx0XHRcdHRpY2tldFN0YXR1cyA9IF9fKCAnYXJjaGl2ZWQnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0fVxuXHRyZXR1cm4gdGlja2V0U3RhdHVzO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBUaWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgIENTUyBjbGFzcyBmb3IgdGhlIGJhY2tncm91bmQgY29sb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEJhY2tncm91bmRDb2xvckNsYXNzID0gKCBUaWNrZXRFbnRpdHkgKSA9PiB7XG5cdHJldHVybiBgZWUtc3RhdHVzLWJhY2tncm91bmQtY29sb3ItJHsgc3RhdHVzKCBUaWNrZXRFbnRpdHkgKSB9YDtcbn07XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhvdXRIb2xlczsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQ7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsInZhciBhcnJheVdpdGhvdXRIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aG91dEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5XCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZFwiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90b0NvbnN1bWFibGVBcnJheTsiLCJmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZjIob2JqKTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lbWl6ZSggZm4sIG9wdGlvbnMgKSB7XG5cdHZhciBzaXplID0gMCxcblx0XHRtYXhTaXplLCBoZWFkLCB0YWlsO1xuXG5cdGlmICggb3B0aW9ucyAmJiBvcHRpb25zLm1heFNpemUgKSB7XG5cdFx0bWF4U2l6ZSA9IG9wdGlvbnMubWF4U2l6ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIG1lbW9pemVkKCAvKiAuLi5hcmdzICovICkge1xuXHRcdHZhciBub2RlID0gaGVhZCxcblx0XHRcdGxlbiA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0XHRhcmdzLCBpO1xuXG5cdFx0c2VhcmNoQ2FjaGU6IHdoaWxlICggbm9kZSApIHtcblx0XHRcdC8vIFBlcmZvcm0gYSBzaGFsbG93IGVxdWFsaXR5IHRlc3QgdG8gY29uZmlybSB0aGF0IHdoZXRoZXIgdGhlIG5vZGVcblx0XHRcdC8vIHVuZGVyIHRlc3QgaXMgYSBjYW5kaWRhdGUgZm9yIHRoZSBhcmd1bWVudHMgcGFzc2VkLiBUd28gYXJyYXlzXG5cdFx0XHQvLyBhcmUgc2hhbGxvd2x5IGVxdWFsIGlmIHRoZWlyIGxlbmd0aCBtYXRjaGVzIGFuZCBlYWNoIGVudHJ5IGlzXG5cdFx0XHQvLyBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuIHRoZSB0d28gc2V0cy4gQXZvaWQgYWJzdHJhY3RpbmcgdG8gYVxuXHRcdFx0Ly8gZnVuY3Rpb24gd2hpY2ggY291bGQgaW5jdXIgYW4gYXJndW1lbnRzIGxlYWtpbmcgZGVvcHRpbWl6YXRpb24uXG5cblx0XHRcdC8vIENoZWNrIHdoZXRoZXIgbm9kZSBhcmd1bWVudHMgbWF0Y2ggYXJndW1lbnRzIGxlbmd0aFxuXHRcdFx0aWYgKCBub2RlLmFyZ3MubGVuZ3RoICE9PSBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgd2hldGhlciBub2RlIGFyZ3VtZW50cyBtYXRjaCBhcmd1bWVudHMgdmFsdWVzXG5cdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRpZiAoIG5vZGUuYXJnc1sgaSBdICE9PSBhcmd1bWVudHNbIGkgXSApIHtcblx0XHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRcdGNvbnRpbnVlIHNlYXJjaENhY2hlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQgd2UgY2FuIGFzc3VtZSB3ZSd2ZSBmb3VuZCBhIG1hdGNoXG5cblx0XHRcdC8vIFN1cmZhY2UgbWF0Y2hlZCBub2RlIHRvIGhlYWQgaWYgbm90IGFscmVhZHlcblx0XHRcdGlmICggbm9kZSAhPT0gaGVhZCApIHtcblx0XHRcdFx0Ly8gQXMgdGFpbCwgc2hpZnQgdG8gcHJldmlvdXMuIE11c3Qgb25seSBzaGlmdCBpZiBub3QgYWxzb1xuXHRcdFx0XHQvLyBoZWFkLCBzaW5jZSBpZiBib3RoIGhlYWQgYW5kIHRhaWwsIHRoZXJlIGlzIG5vIHByZXZpb3VzLlxuXHRcdFx0XHRpZiAoIG5vZGUgPT09IHRhaWwgKSB7XG5cdFx0XHRcdFx0dGFpbCA9IG5vZGUucHJldjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkanVzdCBzaWJsaW5ncyB0byBwb2ludCB0byBlYWNoIG90aGVyLiBJZiBub2RlIHdhcyB0YWlsLFxuXHRcdFx0XHQvLyB0aGlzIGFsc28gaGFuZGxlcyBuZXcgdGFpbCdzIGVtcHR5IGBuZXh0YCBhc3NpZ25tZW50LlxuXHRcdFx0XHRub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcblx0XHRcdFx0aWYgKCBub2RlLm5leHQgKSB7XG5cdFx0XHRcdFx0bm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRub2RlLm5leHQgPSBoZWFkO1xuXHRcdFx0XHRub2RlLnByZXYgPSBudWxsO1xuXHRcdFx0XHRoZWFkLnByZXYgPSBub2RlO1xuXHRcdFx0XHRoZWFkID0gbm9kZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV0dXJuIGltbWVkaWF0ZWx5XG5cdFx0XHRyZXR1cm4gbm9kZS52YWw7XG5cdFx0fVxuXG5cdFx0Ly8gTm8gY2FjaGVkIHZhbHVlIGZvdW5kLiBDb250aW51ZSB0byBpbnNlcnRpb24gcGhhc2U6XG5cblx0XHQvLyBDcmVhdGUgYSBjb3B5IG9mIGFyZ3VtZW50cyAoYXZvaWQgbGVha2luZyBkZW9wdGltaXphdGlvbilcblx0XHRhcmdzID0gbmV3IEFycmF5KCBsZW4gKTtcblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0YXJnc1sgaSBdID0gYXJndW1lbnRzWyBpIF07XG5cdFx0fVxuXG5cdFx0bm9kZSA9IHtcblx0XHRcdGFyZ3M6IGFyZ3MsXG5cblx0XHRcdC8vIEdlbmVyYXRlIHRoZSByZXN1bHQgZnJvbSBvcmlnaW5hbCBmdW5jdGlvblxuXHRcdFx0dmFsOiBmbi5hcHBseSggbnVsbCwgYXJncyApXG5cdFx0fTtcblxuXHRcdC8vIERvbid0IG5lZWQgdG8gY2hlY2sgd2hldGhlciBub2RlIGlzIGFscmVhZHkgaGVhZCwgc2luY2UgaXQgd291bGRcblx0XHQvLyBoYXZlIGJlZW4gcmV0dXJuZWQgYWJvdmUgYWxyZWFkeSBpZiBpdCB3YXNcblxuXHRcdC8vIFNoaWZ0IGV4aXN0aW5nIGhlYWQgZG93biBsaXN0XG5cdFx0aWYgKCBoZWFkICkge1xuXHRcdFx0aGVhZC5wcmV2ID0gbm9kZTtcblx0XHRcdG5vZGUubmV4dCA9IGhlYWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIElmIG5vIGhlYWQsIGZvbGxvd3MgdGhhdCB0aGVyZSdzIG5vIHRhaWwgKGF0IGluaXRpYWwgb3IgcmVzZXQpXG5cdFx0XHR0YWlsID0gbm9kZTtcblx0XHR9XG5cblx0XHQvLyBUcmltIHRhaWwgaWYgd2UncmUgcmVhY2hlZCBtYXggc2l6ZSBhbmQgYXJlIHBlbmRpbmcgY2FjaGUgaW5zZXJ0aW9uXG5cdFx0aWYgKCBzaXplID09PSBtYXhTaXplICkge1xuXHRcdFx0dGFpbCA9IHRhaWwucHJldjtcblx0XHRcdHRhaWwubmV4dCA9IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNpemUrKztcblx0XHR9XG5cblx0XHRoZWFkID0gbm9kZTtcblxuXHRcdHJldHVybiBub2RlLnZhbDtcblx0fVxuXG5cdG1lbW9pemVkLmNsZWFyID0gZnVuY3Rpb24oKSB7XG5cdFx0aGVhZCA9IG51bGw7XG5cdFx0dGFpbCA9IG51bGw7XG5cdFx0c2l6ZSA9IDA7XG5cdH07XG5cblx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnICkge1xuXHRcdC8vIENhY2hlIGlzIG5vdCBleHBvc2VkIGluIHRoZSBwdWJsaWMgQVBJLCBidXQgdXNlZCBpbiB0ZXN0cyB0byBlbnN1cmVcblx0XHQvLyBleHBlY3RlZCBsaXN0IHByb2dyZXNzaW9uXG5cdFx0bWVtb2l6ZWQuZ2V0Q2FjaGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBbIGhlYWQsIHRhaWwsIHNpemUgXTtcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIG1lbW9pemVkO1xufTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIvKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAocm9vdCwgcGx1cmFsaXplKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICh0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBOb2RlLlxuICAgIG1vZHVsZS5leHBvcnRzID0gcGx1cmFsaXplKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELCByZWdpc3RlcnMgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHBsdXJhbGl6ZSgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsLlxuICAgIHJvb3QucGx1cmFsaXplID0gcGx1cmFsaXplKCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgLy8gUnVsZSBzdG9yYWdlIC0gcGx1cmFsaXplIGFuZCBzaW5ndWxhcml6ZSBuZWVkIHRvIGJlIHJ1biBzZXF1ZW50aWFsbHksXG4gIC8vIHdoaWxlIG90aGVyIHJ1bGVzIGNhbiBiZSBvcHRpbWl6ZWQgdXNpbmcgYW4gb2JqZWN0IGZvciBpbnN0YW50IGxvb2t1cHMuXG4gIHZhciBwbHVyYWxSdWxlcyA9IFtdO1xuICB2YXIgc2luZ3VsYXJSdWxlcyA9IFtdO1xuICB2YXIgdW5jb3VudGFibGVzID0ge307XG4gIHZhciBpcnJlZ3VsYXJQbHVyYWxzID0ge307XG4gIHZhciBpcnJlZ3VsYXJTaW5nbGVzID0ge307XG5cbiAgLyoqXG4gICAqIFNhbml0aXplIGEgcGx1cmFsaXphdGlvbiBydWxlIHRvIGEgdXNhYmxlIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtICB7KFJlZ0V4cHxzdHJpbmcpfSBydWxlXG4gICAqIEByZXR1cm4ge1JlZ0V4cH1cbiAgICovXG4gIGZ1bmN0aW9uIHNhbml0aXplUnVsZSAocnVsZSkge1xuICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHJ1bGUgKyAnJCcsICdpJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJ1bGU7XG4gIH1cblxuICAvKipcbiAgICogUGFzcyBpbiBhIHdvcmQgdG9rZW4gdG8gcHJvZHVjZSBhIGZ1bmN0aW9uIHRoYXQgY2FuIHJlcGxpY2F0ZSB0aGUgY2FzZSBvblxuICAgKiBhbm90aGVyIHdvcmQuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB3b3JkXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB0b2tlblxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIHJlc3RvcmVDYXNlICh3b3JkLCB0b2tlbikge1xuICAgIC8vIFRva2VucyBhcmUgYW4gZXhhY3QgbWF0Y2guXG4gICAgaWYgKHdvcmQgPT09IHRva2VuKSByZXR1cm4gdG9rZW47XG5cbiAgICAvLyBMb3dlciBjYXNlZCB3b3Jkcy4gRS5nLiBcImhlbGxvXCIuXG4gICAgaWYgKHdvcmQgPT09IHdvcmQudG9Mb3dlckNhc2UoKSkgcmV0dXJuIHRva2VuLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyBVcHBlciBjYXNlZCB3b3Jkcy4gRS5nLiBcIldISVNLWVwiLlxuICAgIGlmICh3b3JkID09PSB3b3JkLnRvVXBwZXJDYXNlKCkpIHJldHVybiB0b2tlbi50b1VwcGVyQ2FzZSgpO1xuXG4gICAgLy8gVGl0bGUgY2FzZWQgd29yZHMuIEUuZy4gXCJUaXRsZVwiLlxuICAgIGlmICh3b3JkWzBdID09PSB3b3JkWzBdLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiB0b2tlbi5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRva2VuLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIC8vIExvd2VyIGNhc2VkIHdvcmRzLiBFLmcuIFwidGVzdFwiLlxuICAgIHJldHVybiB0b2tlbi50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVycG9sYXRlIGEgcmVnZXhwIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAgICogQHBhcmFtICB7QXJyYXl9ICBhcmdzXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIGludGVycG9sYXRlIChzdHIsIGFyZ3MpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcJChcXGR7MSwyfSkvZywgZnVuY3Rpb24gKG1hdGNoLCBpbmRleCkge1xuICAgICAgcmV0dXJuIGFyZ3NbaW5kZXhdIHx8ICcnO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgYSB3b3JkIHVzaW5nIGEgcnVsZS5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSB3b3JkXG4gICAqIEBwYXJhbSAge0FycmF5fSAgcnVsZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlICh3b3JkLCBydWxlKSB7XG4gICAgcmV0dXJuIHdvcmQucmVwbGFjZShydWxlWzBdLCBmdW5jdGlvbiAobWF0Y2gsIGluZGV4KSB7XG4gICAgICB2YXIgcmVzdWx0ID0gaW50ZXJwb2xhdGUocnVsZVsxXSwgYXJndW1lbnRzKTtcblxuICAgICAgaWYgKG1hdGNoID09PSAnJykge1xuICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2Uod29yZFtpbmRleCAtIDFdLCByZXN1bHQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdG9yZUNhc2UobWF0Y2gsIHJlc3VsdCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2FuaXRpemUgYSB3b3JkIGJ5IHBhc3NpbmcgaW4gdGhlIHdvcmQgYW5kIHNhbml0aXphdGlvbiBydWxlcy5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIHRva2VuXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB3b3JkXG4gICAqIEBwYXJhbSAge0FycmF5fSAgICBydWxlc1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBzYW5pdGl6ZVdvcmQgKHRva2VuLCB3b3JkLCBydWxlcykge1xuICAgIC8vIEVtcHR5IHN0cmluZyBvciBkb2Vzbid0IG5lZWQgZml4aW5nLlxuICAgIGlmICghdG9rZW4ubGVuZ3RoIHx8IHVuY291bnRhYmxlcy5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgIHJldHVybiB3b3JkO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBydWxlcy5sZW5ndGg7XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIHNhbml0aXphdGlvbiBydWxlcyBhbmQgdXNlIHRoZSBmaXJzdCBvbmUgdG8gbWF0Y2guXG4gICAgd2hpbGUgKGxlbi0tKSB7XG4gICAgICB2YXIgcnVsZSA9IHJ1bGVzW2xlbl07XG5cbiAgICAgIGlmIChydWxlWzBdLnRlc3Qod29yZCkpIHJldHVybiByZXBsYWNlKHdvcmQsIHJ1bGUpO1xuICAgIH1cblxuICAgIHJldHVybiB3b3JkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgYSB3b3JkIHdpdGggdGhlIHVwZGF0ZWQgd29yZC5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIHJlcGxhY2VNYXBcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIGtlZXBNYXBcbiAgICogQHBhcmFtICB7QXJyYXl9ICAgIHJ1bGVzXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVdvcmQgKHJlcGxhY2VNYXAsIGtlZXBNYXAsIHJ1bGVzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgICAvLyBHZXQgdGhlIGNvcnJlY3QgdG9rZW4gYW5kIGNhc2UgcmVzdG9yYXRpb24gZnVuY3Rpb25zLlxuICAgICAgdmFyIHRva2VuID0gd29yZC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAvLyBDaGVjayBhZ2FpbnN0IHRoZSBrZWVwIG9iamVjdCBtYXAuXG4gICAgICBpZiAoa2VlcE1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKHdvcmQsIHRva2VuKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgYWdhaW5zdCB0aGUgcmVwbGFjZW1lbnQgbWFwIGZvciBhIGRpcmVjdCB3b3JkIHJlcGxhY2VtZW50LlxuICAgICAgaWYgKHJlcGxhY2VNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3JkLCByZXBsYWNlTWFwW3Rva2VuXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biBhbGwgdGhlIHJ1bGVzIGFnYWluc3QgdGhlIHdvcmQuXG4gICAgICByZXR1cm4gc2FuaXRpemVXb3JkKHRva2VuLCB3b3JkLCBydWxlcyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHdvcmQgaXMgcGFydCBvZiB0aGUgbWFwLlxuICAgKi9cbiAgZnVuY3Rpb24gY2hlY2tXb3JkIChyZXBsYWNlTWFwLCBrZWVwTWFwLCBydWxlcywgYm9vbCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAod29yZCkge1xuICAgICAgdmFyIHRva2VuID0gd29yZC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAoa2VlcE1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHJldHVybiB0cnVlO1xuICAgICAgaWYgKHJlcGxhY2VNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHJldHVybiBzYW5pdGl6ZVdvcmQodG9rZW4sIHRva2VuLCBydWxlcykgPT09IHRva2VuO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUGx1cmFsaXplIG9yIHNpbmd1bGFyaXplIGEgd29yZCBiYXNlZCBvbiB0aGUgcGFzc2VkIGluIGNvdW50LlxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICB3b3JkICAgICAgVGhlIHdvcmQgdG8gcGx1cmFsaXplXG4gICAqIEBwYXJhbSAge251bWJlcn0gIGNvdW50ICAgICBIb3cgbWFueSBvZiB0aGUgd29yZCBleGlzdFxuICAgKiBAcGFyYW0gIHtib29sZWFufSBpbmNsdXNpdmUgV2hldGhlciB0byBwcmVmaXggd2l0aCB0aGUgbnVtYmVyIChlLmcuIDMgZHVja3MpXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIHBsdXJhbGl6ZSAod29yZCwgY291bnQsIGluY2x1c2l2ZSkge1xuICAgIHZhciBwbHVyYWxpemVkID0gY291bnQgPT09IDFcbiAgICAgID8gcGx1cmFsaXplLnNpbmd1bGFyKHdvcmQpIDogcGx1cmFsaXplLnBsdXJhbCh3b3JkKTtcblxuICAgIHJldHVybiAoaW5jbHVzaXZlID8gY291bnQgKyAnICcgOiAnJykgKyBwbHVyYWxpemVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsdXJhbGl6ZSBhIHdvcmQuXG4gICAqXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIHBsdXJhbGl6ZS5wbHVyYWwgPSByZXBsYWNlV29yZChcbiAgICBpcnJlZ3VsYXJTaW5nbGVzLCBpcnJlZ3VsYXJQbHVyYWxzLCBwbHVyYWxSdWxlc1xuICApO1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHdvcmQgaXMgcGx1cmFsLlxuICAgKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBwbHVyYWxpemUuaXNQbHVyYWwgPSBjaGVja1dvcmQoXG4gICAgaXJyZWd1bGFyU2luZ2xlcywgaXJyZWd1bGFyUGx1cmFscywgcGx1cmFsUnVsZXNcbiAgKTtcblxuICAvKipcbiAgICogU2luZ3VsYXJpemUgYSB3b3JkLlxuICAgKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBwbHVyYWxpemUuc2luZ3VsYXIgPSByZXBsYWNlV29yZChcbiAgICBpcnJlZ3VsYXJQbHVyYWxzLCBpcnJlZ3VsYXJTaW5nbGVzLCBzaW5ndWxhclJ1bGVzXG4gICk7XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgd29yZCBpcyBzaW5ndWxhci5cbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgcGx1cmFsaXplLmlzU2luZ3VsYXIgPSBjaGVja1dvcmQoXG4gICAgaXJyZWd1bGFyUGx1cmFscywgaXJyZWd1bGFyU2luZ2xlcywgc2luZ3VsYXJSdWxlc1xuICApO1xuXG4gIC8qKlxuICAgKiBBZGQgYSBwbHVyYWxpemF0aW9uIHJ1bGUgdG8gdGhlIGNvbGxlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHApfSBydWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICByZXBsYWNlbWVudFxuICAgKi9cbiAgcGx1cmFsaXplLmFkZFBsdXJhbFJ1bGUgPSBmdW5jdGlvbiAocnVsZSwgcmVwbGFjZW1lbnQpIHtcbiAgICBwbHVyYWxSdWxlcy5wdXNoKFtzYW5pdGl6ZVJ1bGUocnVsZSksIHJlcGxhY2VtZW50XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBhIHNpbmd1bGFyaXphdGlvbiBydWxlIHRvIHRoZSBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwKX0gcnVsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgcmVwbGFjZW1lbnRcbiAgICovXG4gIHBsdXJhbGl6ZS5hZGRTaW5ndWxhclJ1bGUgPSBmdW5jdGlvbiAocnVsZSwgcmVwbGFjZW1lbnQpIHtcbiAgICBzaW5ndWxhclJ1bGVzLnB1c2goW3Nhbml0aXplUnVsZShydWxlKSwgcmVwbGFjZW1lbnRdKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGFuIHVuY291bnRhYmxlIHdvcmQgcnVsZS5cbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cCl9IHdvcmRcbiAgICovXG4gIHBsdXJhbGl6ZS5hZGRVbmNvdW50YWJsZVJ1bGUgPSBmdW5jdGlvbiAod29yZCkge1xuICAgIGlmICh0eXBlb2Ygd29yZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHVuY291bnRhYmxlc1t3b3JkLnRvTG93ZXJDYXNlKCldID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTZXQgc2luZ3VsYXIgYW5kIHBsdXJhbCByZWZlcmVuY2VzIGZvciB0aGUgd29yZC5cbiAgICBwbHVyYWxpemUuYWRkUGx1cmFsUnVsZSh3b3JkLCAnJDAnKTtcbiAgICBwbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlKHdvcmQsICckMCcpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gaXJyZWd1bGFyIHdvcmQgZGVmaW5pdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNpbmdsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGx1cmFsXG4gICAqL1xuICBwbHVyYWxpemUuYWRkSXJyZWd1bGFyUnVsZSA9IGZ1bmN0aW9uIChzaW5nbGUsIHBsdXJhbCkge1xuICAgIHBsdXJhbCA9IHBsdXJhbC50b0xvd2VyQ2FzZSgpO1xuICAgIHNpbmdsZSA9IHNpbmdsZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaXJyZWd1bGFyU2luZ2xlc1tzaW5nbGVdID0gcGx1cmFsO1xuICAgIGlycmVndWxhclBsdXJhbHNbcGx1cmFsXSA9IHNpbmdsZTtcbiAgfTtcblxuICAvKipcbiAgICogSXJyZWd1bGFyIHJ1bGVzLlxuICAgKi9cbiAgW1xuICAgIC8vIFByb25vdW5zLlxuICAgIFsnSScsICd3ZSddLFxuICAgIFsnbWUnLCAndXMnXSxcbiAgICBbJ2hlJywgJ3RoZXknXSxcbiAgICBbJ3NoZScsICd0aGV5J10sXG4gICAgWyd0aGVtJywgJ3RoZW0nXSxcbiAgICBbJ215c2VsZicsICdvdXJzZWx2ZXMnXSxcbiAgICBbJ3lvdXJzZWxmJywgJ3lvdXJzZWx2ZXMnXSxcbiAgICBbJ2l0c2VsZicsICd0aGVtc2VsdmVzJ10sXG4gICAgWydoZXJzZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgICBbJ2hpbXNlbGYnLCAndGhlbXNlbHZlcyddLFxuICAgIFsndGhlbXNlbGYnLCAndGhlbXNlbHZlcyddLFxuICAgIFsnaXMnLCAnYXJlJ10sXG4gICAgWyd3YXMnLCAnd2VyZSddLFxuICAgIFsnaGFzJywgJ2hhdmUnXSxcbiAgICBbJ3RoaXMnLCAndGhlc2UnXSxcbiAgICBbJ3RoYXQnLCAndGhvc2UnXSxcbiAgICAvLyBXb3JkcyBlbmRpbmcgaW4gd2l0aCBhIGNvbnNvbmFudCBhbmQgYG9gLlxuICAgIFsnZWNobycsICdlY2hvZXMnXSxcbiAgICBbJ2RpbmdvJywgJ2RpbmdvZXMnXSxcbiAgICBbJ3ZvbGNhbm8nLCAndm9sY2Fub2VzJ10sXG4gICAgWyd0b3JuYWRvJywgJ3Rvcm5hZG9lcyddLFxuICAgIFsndG9ycGVkbycsICd0b3JwZWRvZXMnXSxcbiAgICAvLyBFbmRzIHdpdGggYHVzYC5cbiAgICBbJ2dlbnVzJywgJ2dlbmVyYSddLFxuICAgIFsndmlzY3VzJywgJ3Zpc2NlcmEnXSxcbiAgICAvLyBFbmRzIHdpdGggYG1hYC5cbiAgICBbJ3N0aWdtYScsICdzdGlnbWF0YSddLFxuICAgIFsnc3RvbWEnLCAnc3RvbWF0YSddLFxuICAgIFsnZG9nbWEnLCAnZG9nbWF0YSddLFxuICAgIFsnbGVtbWEnLCAnbGVtbWF0YSddLFxuICAgIFsnc2NoZW1hJywgJ3NjaGVtYXRhJ10sXG4gICAgWydhbmF0aGVtYScsICdhbmF0aGVtYXRhJ10sXG4gICAgLy8gT3RoZXIgaXJyZWd1bGFyIHJ1bGVzLlxuICAgIFsnb3gnLCAnb3hlbiddLFxuICAgIFsnYXhlJywgJ2F4ZXMnXSxcbiAgICBbJ2RpZScsICdkaWNlJ10sXG4gICAgWyd5ZXMnLCAneWVzZXMnXSxcbiAgICBbJ2Zvb3QnLCAnZmVldCddLFxuICAgIFsnZWF2ZScsICdlYXZlcyddLFxuICAgIFsnZ29vc2UnLCAnZ2Vlc2UnXSxcbiAgICBbJ3Rvb3RoJywgJ3RlZXRoJ10sXG4gICAgWydxdWl6JywgJ3F1aXp6ZXMnXSxcbiAgICBbJ2h1bWFuJywgJ2h1bWFucyddLFxuICAgIFsncHJvb2YnLCAncHJvb2ZzJ10sXG4gICAgWydjYXJ2ZScsICdjYXJ2ZXMnXSxcbiAgICBbJ3ZhbHZlJywgJ3ZhbHZlcyddLFxuICAgIFsnbG9vZXknLCAnbG9vaWVzJ10sXG4gICAgWyd0aGllZicsICd0aGlldmVzJ10sXG4gICAgWydncm9vdmUnLCAnZ3Jvb3ZlcyddLFxuICAgIFsncGlja2F4ZScsICdwaWNrYXhlcyddLFxuICAgIFsncGFzc2VyYnknLCAncGFzc2Vyc2J5J11cbiAgXS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgcmV0dXJuIHBsdXJhbGl6ZS5hZGRJcnJlZ3VsYXJSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xuICB9KTtcblxuICAvKipcbiAgICogUGx1cmFsaXphdGlvbiBydWxlcy5cbiAgICovXG4gIFtcbiAgICBbL3M/JC9pLCAncyddLFxuICAgIFsvW15cXHUwMDAwLVxcdTAwN0ZdJC9pLCAnJDAnXSxcbiAgICBbLyhbXmFlaW91XWVzZSkkL2ksICckMSddLFxuICAgIFsvKGF4fHRlc3QpaXMkL2ksICckMWVzJ10sXG4gICAgWy8oYWxpYXN8W15hb3VddXN8dFtsbV1hc3xnYXN8cmlzKSQvaSwgJyQxZXMnXSxcbiAgICBbLyhlW21uXXUpcz8kL2ksICckMXMnXSxcbiAgICBbLyhbXmxdaWFzfFthZWlvdV1sYXN8W2VqenJdYXN8W2l1XWFtKSQvaSwgJyQxJ10sXG4gICAgWy8oYWx1bW58c3lsbGFifHZpcnxyYWRpfG51Y2xlfGZ1bmd8Y2FjdHxzdGltdWx8dGVybWlufGJhY2lsbHxmb2N8dXRlcnxsb2N8c3RyYXQpKD86dXN8aSkkL2ksICckMWknXSxcbiAgICBbLyhhbHVtbnxhbGd8dmVydGVicikoPzphfGFlKSQvaSwgJyQxYWUnXSxcbiAgICBbLyhzZXJhcGh8Y2hlcnViKSg/OmltKT8kL2ksICckMWltJ10sXG4gICAgWy8oaGVyfGF0fGdyKW8kL2ksICckMW9lcyddLFxuICAgIFsvKGFnZW5kfGFkZGVuZHxtaWxsZW5uaXxkYXR8ZXh0cmVtfGJhY3Rlcml8ZGVzaWRlcmF0fHN0cmF0fGNhbmRlbGFicnxlcnJhdHxvdnxzeW1wb3NpfGN1cnJpY3VsfGF1dG9tYXR8cXVvcikoPzphfHVtKSQvaSwgJyQxYSddLFxuICAgIFsvKGFwaGVsaXxoeXBlcmJhdHxwZXJpaGVsaXxhc3luZGV0fG5vdW1lbnxwaGVub21lbnxjcml0ZXJpfG9yZ2FufHByb2xlZ29tZW58aGVkcnxhdXRvbWF0KSg/OmF8b24pJC9pLCAnJDFhJ10sXG4gICAgWy9zaXMkL2ksICdzZXMnXSxcbiAgICBbLyg/Oihrbml8d2l8bGkpZmV8KGFyfGx8ZWF8ZW98b2F8aG9vKWYpJC9pLCAnJDEkMnZlcyddLFxuICAgIFsvKFteYWVpb3V5XXxxdSl5JC9pLCAnJDFpZXMnXSxcbiAgICBbLyhbXmNoXVtpZW9dW2xuXSlleSQvaSwgJyQxaWVzJ10sXG4gICAgWy8oeHxjaHxzc3xzaHx6eikkL2ksICckMWVzJ10sXG4gICAgWy8obWF0cnxjb2R8bXVyfHNpbHx2ZXJ0fGluZHxhcHBlbmQpKD86aXh8ZXgpJC9pLCAnJDFpY2VzJ10sXG4gICAgWy9cXGIoKD86dGl0KT9tfGwpKD86aWNlfG91c2UpJC9pLCAnJDFpY2UnXSxcbiAgICBbLyhwZSkoPzpyc29ufG9wbGUpJC9pLCAnJDFvcGxlJ10sXG4gICAgWy8oY2hpbGQpKD86cmVuKT8kL2ksICckMXJlbiddLFxuICAgIFsvZWF1eCQvaSwgJyQwJ10sXG4gICAgWy9tW2FlXW4kL2ksICdtZW4nXSxcbiAgICBbJ3Rob3UnLCAneW91J11cbiAgXS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgcmV0dXJuIHBsdXJhbGl6ZS5hZGRQbHVyYWxSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xuICB9KTtcblxuICAvKipcbiAgICogU2luZ3VsYXJpemF0aW9uIHJ1bGVzLlxuICAgKi9cbiAgW1xuICAgIFsvcyQvaSwgJyddLFxuICAgIFsvKHNzKSQvaSwgJyQxJ10sXG4gICAgWy8od2l8a25pfCg/OmFmdGVyfGhhbGZ8aGlnaHxsb3d8bWlkfG5vbnxuaWdodHxbXlxcd118XilsaSl2ZXMkL2ksICckMWZlJ10sXG4gICAgWy8oYXJ8KD86d298W2FlXSlsfFtlb11bYW9dKXZlcyQvaSwgJyQxZiddLFxuICAgIFsvaWVzJC9pLCAneSddLFxuICAgIFsvXFxiKFtwbF18em9tYnwoPzpuZWNrfGNyb3NzKT90fGNvbGx8ZmFlcnxmb29kfGdlbnxnb29ufGdyb3VwfGxhc3N8dGFsa3xnb2FsfGN1dClpZXMkL2ksICckMWllJ10sXG4gICAgWy9cXGIobW9ufHNtaWwpaWVzJC9pLCAnJDFleSddLFxuICAgIFsvXFxiKCg/OnRpdCk/bXxsKWljZSQvaSwgJyQxb3VzZSddLFxuICAgIFsvKHNlcmFwaHxjaGVydWIpaW0kL2ksICckMSddLFxuICAgIFsvKHh8Y2h8c3N8c2h8enp8dHRvfGdvfGNob3xhbGlhc3xbXmFvdV11c3x0W2xtXWFzfGdhc3woPzpoZXJ8YXR8Z3Ipb3xbYWVpb3VdcmlzKSg/OmVzKT8kL2ksICckMSddLFxuICAgIFsvKGFuYWx5fGRpYWdub3xwYXJlbnRoZXxwcm9nbm98c3lub3B8dGhlfGVtcGhhfGNyaXxuZSkoPzpzaXN8c2VzKSQvaSwgJyQxc2lzJ10sXG4gICAgWy8obW92aWV8dHdlbHZlfGFidXNlfGVbbW5ddSlzJC9pLCAnJDEnXSxcbiAgICBbLyh0ZXN0KSg/OmlzfGVzKSQvaSwgJyQxaXMnXSxcbiAgICBbLyhhbHVtbnxzeWxsYWJ8dmlyfHJhZGl8bnVjbGV8ZnVuZ3xjYWN0fHN0aW11bHx0ZXJtaW58YmFjaWxsfGZvY3x1dGVyfGxvY3xzdHJhdCkoPzp1c3xpKSQvaSwgJyQxdXMnXSxcbiAgICBbLyhhZ2VuZHxhZGRlbmR8bWlsbGVubml8ZGF0fGV4dHJlbXxiYWN0ZXJpfGRlc2lkZXJhdHxzdHJhdHxjYW5kZWxhYnJ8ZXJyYXR8b3Z8c3ltcG9zaXxjdXJyaWN1bHxxdW9yKWEkL2ksICckMXVtJ10sXG4gICAgWy8oYXBoZWxpfGh5cGVyYmF0fHBlcmloZWxpfGFzeW5kZXR8bm91bWVufHBoZW5vbWVufGNyaXRlcml8b3JnYW58cHJvbGVnb21lbnxoZWRyfGF1dG9tYXQpYSQvaSwgJyQxb24nXSxcbiAgICBbLyhhbHVtbnxhbGd8dmVydGVicilhZSQvaSwgJyQxYSddLFxuICAgIFsvKGNvZHxtdXJ8c2lsfHZlcnR8aW5kKWljZXMkL2ksICckMWV4J10sXG4gICAgWy8obWF0cnxhcHBlbmQpaWNlcyQvaSwgJyQxaXgnXSxcbiAgICBbLyhwZSkocnNvbnxvcGxlKSQvaSwgJyQxcnNvbiddLFxuICAgIFsvKGNoaWxkKXJlbiQvaSwgJyQxJ10sXG4gICAgWy8oZWF1KXg/JC9pLCAnJDEnXSxcbiAgICBbL21lbiQvaSwgJ21hbiddXG4gIF0uZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgIHJldHVybiBwbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xuICB9KTtcblxuICAvKipcbiAgICogVW5jb3VudGFibGUgcnVsZXMuXG4gICAqL1xuICBbXG4gICAgLy8gU2luZ3VsYXIgd29yZHMgd2l0aCBubyBwbHVyYWxzLlxuICAgICdhZHVsdGhvb2QnLFxuICAgICdhZHZpY2UnLFxuICAgICdhZ2VuZGEnLFxuICAgICdhaWQnLFxuICAgICdhaXJjcmFmdCcsXG4gICAgJ2FsY29ob2wnLFxuICAgICdhbW1vJyxcbiAgICAnYW5hbHl0aWNzJyxcbiAgICAnYW5pbWUnLFxuICAgICdhdGhsZXRpY3MnLFxuICAgICdhdWRpbycsXG4gICAgJ2Jpc29uJyxcbiAgICAnYmxvb2QnLFxuICAgICdicmVhbScsXG4gICAgJ2J1ZmZhbG8nLFxuICAgICdidXR0ZXInLFxuICAgICdjYXJwJyxcbiAgICAnY2FzaCcsXG4gICAgJ2NoYXNzaXMnLFxuICAgICdjaGVzcycsXG4gICAgJ2Nsb3RoaW5nJyxcbiAgICAnY29kJyxcbiAgICAnY29tbWVyY2UnLFxuICAgICdjb29wZXJhdGlvbicsXG4gICAgJ2NvcnBzJyxcbiAgICAnZGVicmlzJyxcbiAgICAnZGlhYmV0ZXMnLFxuICAgICdkaWdlc3Rpb24nLFxuICAgICdlbGsnLFxuICAgICdlbmVyZ3knLFxuICAgICdlcXVpcG1lbnQnLFxuICAgICdleGNyZXRpb24nLFxuICAgICdleHBlcnRpc2UnLFxuICAgICdmaXJtd2FyZScsXG4gICAgJ2Zsb3VuZGVyJyxcbiAgICAnZnVuJyxcbiAgICAnZ2FsbG93cycsXG4gICAgJ2dhcmJhZ2UnLFxuICAgICdncmFmZml0aScsXG4gICAgJ2hhcmR3YXJlJyxcbiAgICAnaGVhZHF1YXJ0ZXJzJyxcbiAgICAnaGVhbHRoJyxcbiAgICAnaGVycGVzJyxcbiAgICAnaGlnaGppbmtzJyxcbiAgICAnaG9tZXdvcmsnLFxuICAgICdob3VzZXdvcmsnLFxuICAgICdpbmZvcm1hdGlvbicsXG4gICAgJ2plYW5zJyxcbiAgICAnanVzdGljZScsXG4gICAgJ2t1ZG9zJyxcbiAgICAnbGFib3VyJyxcbiAgICAnbGl0ZXJhdHVyZScsXG4gICAgJ21hY2hpbmVyeScsXG4gICAgJ21hY2tlcmVsJyxcbiAgICAnbWFpbCcsXG4gICAgJ21lZGlhJyxcbiAgICAnbWV3cycsXG4gICAgJ21vb3NlJyxcbiAgICAnbXVzaWMnLFxuICAgICdtdWQnLFxuICAgICdtYW5nYScsXG4gICAgJ25ld3MnLFxuICAgICdvbmx5JyxcbiAgICAncGVyc29ubmVsJyxcbiAgICAncGlrZScsXG4gICAgJ3BsYW5rdG9uJyxcbiAgICAncGxpZXJzJyxcbiAgICAncG9saWNlJyxcbiAgICAncG9sbHV0aW9uJyxcbiAgICAncHJlbWlzZXMnLFxuICAgICdyYWluJyxcbiAgICAncmVzZWFyY2gnLFxuICAgICdyaWNlJyxcbiAgICAnc2FsbW9uJyxcbiAgICAnc2Npc3NvcnMnLFxuICAgICdzZXJpZXMnLFxuICAgICdzZXdhZ2UnLFxuICAgICdzaGFtYmxlcycsXG4gICAgJ3NocmltcCcsXG4gICAgJ3NvZnR3YXJlJyxcbiAgICAnc3BlY2llcycsXG4gICAgJ3N0YWZmJyxcbiAgICAnc3dpbmUnLFxuICAgICd0ZW5uaXMnLFxuICAgICd0cmFmZmljJyxcbiAgICAndHJhbnNwb3J0YXRpb24nLFxuICAgICd0cm91dCcsXG4gICAgJ3R1bmEnLFxuICAgICd3ZWFsdGgnLFxuICAgICd3ZWxmYXJlJyxcbiAgICAnd2hpdGluZycsXG4gICAgJ3dpbGRlYmVlc3QnLFxuICAgICd3aWxkbGlmZScsXG4gICAgJ3lvdScsXG4gICAgL3Bva1tlw6ldbW9uJC9pLFxuICAgIC8vIFJlZ2V4ZXMuXG4gICAgL1teYWVpb3VdZXNlJC9pLCAvLyBcImNoaW5lc2VcIiwgXCJqYXBhbmVzZVwiXG4gICAgL2RlZXIkL2ksIC8vIFwiZGVlclwiLCBcInJlaW5kZWVyXCJcbiAgICAvZmlzaCQvaSwgLy8gXCJmaXNoXCIsIFwiYmxvd2Zpc2hcIiwgXCJhbmdlbGZpc2hcIlxuICAgIC9tZWFzbGVzJC9pLFxuICAgIC9vW2l1XXMkL2ksIC8vIFwiY2Fybml2b3JvdXNcIlxuICAgIC9wb3gkL2ksIC8vIFwiY2hpY2twb3hcIiwgXCJzbWFsbHBveFwiXG4gICAgL3NoZWVwJC9pXG4gIF0uZm9yRWFjaChwbHVyYWxpemUuYWRkVW5jb3VudGFibGVSdWxlKTtcblxuICByZXR1cm4gcGx1cmFsaXplO1xufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbiAgdmFyIGhhcyA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcblxuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAoaGFzKHR5cGVTcGVjcywgdHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpZiAodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YXIgZXJyID0gRXJyb3IoXG4gICAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogJyArIGxvY2F0aW9uICsgJyB0eXBlIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgJyArXG4gICAgICAgICAgICAgICdpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJyArIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSArICdgLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciAmJiAhKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJyArXG4gICAgICAgICAgICBsb2NhdGlvbiArICcgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICcgKyB0eXBlb2YgZXJyb3IgKyAnLiAnICtcbiAgICAgICAgICAgICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgK1xuICAgICAgICAgICAgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ZhaWxlZCAnICsgbG9jYXRpb24gKyAnIHR5cGU6ICcgKyBlcnJvci5tZXNzYWdlICsgKHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXNldHMgd2FybmluZyBjYWNoZSB3aGVuIHRlc3RpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2hlY2tQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbnZhciBoYXMgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgZWxlbWVudFR5cGU6IGNyZWF0ZUVsZW1lbnRUeXBlVHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIsXG4gICAgZXhhY3Q6IGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIsXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJyArIHByb3BGdWxsTmFtZSArICdgIHByb3Agb24gYCcgKyBjb21wb25lbnROYW1lICArICdgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZVR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghUmVhY3RJcy5pc1ZhbGlkRWxlbWVudFR5cGUocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQgdHlwZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50cyBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gYXJyYXksIGdvdCAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgYXJndW1lbnRzLiAnICtcbiAgICAgICAgICAgICdBIGNvbW1vbiBtaXN0YWtlIGlzIHRvIHdyaXRlIG9uZU9mKHgsIHksIHopIGluc3RlYWQgb2Ygb25lT2YoW3gsIHksIHpdKS4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGFycmF5LicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcywgZnVuY3Rpb24gcmVwbGFjZXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgU3RyaW5nKHByb3BWYWx1ZSkgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKGhhcyhwcm9wVmFsdWUsIGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZS4gRXhwZWN0ZWQgYW4gYXJyYXkgb2YgY2hlY2sgZnVuY3Rpb25zLCBidXQgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkICcgKyBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcoY2hlY2tlcikgKyAnIGF0IGluZGV4ICcgKyBpICsgJy4nXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgYWxsIGtleXMgaW4gY2FzZSBzb21lIGFyZSByZXF1aXJlZCBidXQgbWlzc2luZyBmcm9tXG4gICAgICAvLyBwcm9wcy5cbiAgICAgIHZhciBhbGxLZXlzID0gYXNzaWduKHt9LCBwcm9wc1twcm9wTmFtZV0sIHNoYXBlVHlwZXMpO1xuICAgICAgZm9yICh2YXIga2V5IGluIGFsbEtleXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgICAgICAgICdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBrZXkgYCcgKyBrZXkgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nICtcbiAgICAgICAgICAgICdcXG5CYWQgb2JqZWN0OiAnICsgSlNPTi5zdHJpbmdpZnkocHJvcHNbcHJvcE5hbWVdLCBudWxsLCAnICAnKSArXG4gICAgICAgICAgICAnXFxuVmFsaWQga2V5czogJyArICBKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhzaGFwZVR5cGVzKSwgbnVsbCwgJyAgJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gICAgLy8gTmF0aXZlIFN5bWJvbC5cbiAgICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBmYWxzeSB2YWx1ZSBjYW4ndCBiZSBhIFN5bWJvbFxuICAgIGlmICghcHJvcFZhbHVlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGUgPSBjaGVja1Byb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZTtcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoUmVhY3RJcy5pc0VsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuIiwiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi44LjZcbiAqIHJlYWN0LWlzLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG52YXIgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yO1xuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIDogMHhlYWM3O1xudmFyIFJFQUNUX1BPUlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucG9ydGFsJykgOiAweGVhY2E7XG52YXIgUkVBQ1RfRlJBR01FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZyYWdtZW50JykgOiAweGVhY2I7XG52YXIgUkVBQ1RfU1RSSUNUX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN0cmljdF9tb2RlJykgOiAweGVhY2M7XG52YXIgUkVBQ1RfUFJPRklMRVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb2ZpbGVyJykgOiAweGVhZDI7XG52YXIgUkVBQ1RfUFJPVklERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb3ZpZGVyJykgOiAweGVhY2Q7XG52YXIgUkVBQ1RfQ09OVEVYVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29udGV4dCcpIDogMHhlYWNlO1xudmFyIFJFQUNUX0FTWU5DX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmFzeW5jX21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbmN1cnJlbnRfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpIDogMHhlYWQwO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpIDogMHhlYWQxO1xudmFyIFJFQUNUX01FTU9fVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0Lm1lbW8nKSA6IDB4ZWFkMztcbnZhciBSRUFDVF9MQVpZX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5sYXp5JykgOiAweGVhZDQ7XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgfHxcbiAgLy8gTm90ZTogaXRzIHR5cGVvZiBtaWdodCBiZSBvdGhlciB0aGFuICdzeW1ib2wnIG9yICdudW1iZXInIGlmIGl0J3MgYSBwb2x5ZmlsbC5cbiAgdHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSB8fCB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCAmJiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTEFaWV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9QUk9WSURFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0NPTlRFWFRfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFKTtcbn1cblxuLyoqXG4gKiBGb3JrZWQgZnJvbSBmYmpzL3dhcm5pbmc6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmJqcy9ibG9iL2U2NmJhMjBhZDViZTQzM2ViNTQ0MjNmMmIwOTdkODI5MzI0ZDlkZTYvcGFja2FnZXMvZmJqcy9zcmMvX19mb3Jrc19fL3dhcm5pbmcuanNcbiAqXG4gKiBPbmx5IGNoYW5nZSBpcyB3ZSB1c2UgY29uc29sZS53YXJuIGluc3RlYWQgb2YgY29uc29sZS5lcnJvcixcbiAqIGFuZCBkbyBub3RoaW5nIHdoZW4gJ2NvbnNvbGUnIGlzIG5vdCBzdXBwb3J0ZWQuXG4gKiBUaGlzIHJlYWxseSBzaW1wbGlmaWVzIHRoZSBjb2RlLlxuICogLS0tXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIGxvd1ByaW9yaXR5V2FybmluZyA9IGZ1bmN0aW9uICgpIHt9O1xuXG57XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xuXG4gIGxvd1ByaW9yaXR5V2FybmluZyA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgbG93UHJpb3JpdHlXYXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxudmFyIGxvd1ByaW9yaXR5V2FybmluZyQxID0gbG93UHJpb3JpdHlXYXJuaW5nO1xuXG5mdW5jdGlvbiB0eXBlT2Yob2JqZWN0KSB7XG4gIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwpIHtcbiAgICB2YXIgJCR0eXBlb2YgPSBvYmplY3QuJCR0eXBlb2Y7XG4gICAgc3dpdGNoICgkJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9FTEVNRU5UX1RZUEU6XG4gICAgICAgIHZhciB0eXBlID0gb2JqZWN0LnR5cGU7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgY2FzZSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0ZSQUdNRU5UX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1RSSUNUX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFyICQkdHlwZW9mVHlwZSA9IHR5cGUgJiYgdHlwZS4kJHR5cGVvZjtcblxuICAgICAgICAgICAgc3dpdGNoICgkJHR5cGVvZlR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9QUk9WSURFUl9UWVBFOlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZlR5cGU7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgICAgcmV0dXJuICQkdHlwZW9mO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8vIEFzeW5jTW9kZSBpcyBkZXByZWNhdGVkIGFsb25nIHdpdGggaXNBc3luY01vZGVcbnZhciBBc3luY01vZGUgPSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG52YXIgQ29uY3VycmVudE1vZGUgPSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbnZhciBDb250ZXh0Q29uc3VtZXIgPSBSRUFDVF9DT05URVhUX1RZUEU7XG52YXIgQ29udGV4dFByb3ZpZGVyID0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbnZhciBFbGVtZW50ID0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xudmFyIEZvcndhcmRSZWYgPSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xudmFyIEZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbnZhciBMYXp5ID0gUkVBQ1RfTEFaWV9UWVBFO1xudmFyIE1lbW8gPSBSRUFDVF9NRU1PX1RZUEU7XG52YXIgUG9ydGFsID0gUkVBQ1RfUE9SVEFMX1RZUEU7XG52YXIgUHJvZmlsZXIgPSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xudmFyIFN0cmljdE1vZGUgPSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xudmFyIFN1c3BlbnNlID0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcblxudmFyIGhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlID0gZmFsc2U7XG5cbi8vIEFzeW5jTW9kZSBzaG91bGQgYmUgZGVwcmVjYXRlZFxuZnVuY3Rpb24gaXNBc3luY01vZGUob2JqZWN0KSB7XG4gIHtcbiAgICBpZiAoIWhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlKSB7XG4gICAgICBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IHRydWU7XG4gICAgICBsb3dQcmlvcml0eVdhcm5pbmckMShmYWxzZSwgJ1RoZSBSZWFjdElzLmlzQXN5bmNNb2RlKCkgYWxpYXMgaGFzIGJlZW4gZGVwcmVjYXRlZCwgJyArICdhbmQgd2lsbCBiZSByZW1vdmVkIGluIFJlYWN0IDE3Ky4gVXBkYXRlIHlvdXIgY29kZSB0byB1c2UgJyArICdSZWFjdElzLmlzQ29uY3VycmVudE1vZGUoKSBpbnN0ZWFkLiBJdCBoYXMgdGhlIGV4YWN0IHNhbWUgQVBJLicpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHx8IHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb250ZXh0Q29uc3VtZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb250ZXh0UHJvdmlkZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRWxlbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRm9yd2FyZFJlZihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xufVxuZnVuY3Rpb24gaXNGcmFnbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNMYXp5KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0xBWllfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTWVtbyhvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9NRU1PX1RZUEU7XG59XG5mdW5jdGlvbiBpc1BvcnRhbChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QT1JUQUxfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUHJvZmlsZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3RyaWN0TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdXNwZW5zZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9TVVNQRU5TRV9UWVBFO1xufVxuXG5leHBvcnRzLnR5cGVPZiA9IHR5cGVPZjtcbmV4cG9ydHMuQXN5bmNNb2RlID0gQXN5bmNNb2RlO1xuZXhwb3J0cy5Db25jdXJyZW50TW9kZSA9IENvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5Db250ZXh0Q29uc3VtZXIgPSBDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLkNvbnRleHRQcm92aWRlciA9IENvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuRWxlbWVudCA9IEVsZW1lbnQ7XG5leHBvcnRzLkZvcndhcmRSZWYgPSBGb3J3YXJkUmVmO1xuZXhwb3J0cy5GcmFnbWVudCA9IEZyYWdtZW50O1xuZXhwb3J0cy5MYXp5ID0gTGF6eTtcbmV4cG9ydHMuTWVtbyA9IE1lbW87XG5leHBvcnRzLlBvcnRhbCA9IFBvcnRhbDtcbmV4cG9ydHMuUHJvZmlsZXIgPSBQcm9maWxlcjtcbmV4cG9ydHMuU3RyaWN0TW9kZSA9IFN0cmljdE1vZGU7XG5leHBvcnRzLlN1c3BlbnNlID0gU3VzcGVuc2U7XG5leHBvcnRzLmlzVmFsaWRFbGVtZW50VHlwZSA9IGlzVmFsaWRFbGVtZW50VHlwZTtcbmV4cG9ydHMuaXNBc3luY01vZGUgPSBpc0FzeW5jTW9kZTtcbmV4cG9ydHMuaXNDb25jdXJyZW50TW9kZSA9IGlzQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLmlzQ29udGV4dENvbnN1bWVyID0gaXNDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLmlzQ29udGV4dFByb3ZpZGVyID0gaXNDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLmlzRWxlbWVudCA9IGlzRWxlbWVudDtcbmV4cG9ydHMuaXNGb3J3YXJkUmVmID0gaXNGb3J3YXJkUmVmO1xuZXhwb3J0cy5pc0ZyYWdtZW50ID0gaXNGcmFnbWVudDtcbmV4cG9ydHMuaXNMYXp5ID0gaXNMYXp5O1xuZXhwb3J0cy5pc01lbW8gPSBpc01lbW87XG5leHBvcnRzLmlzUG9ydGFsID0gaXNQb3J0YWw7XG5leHBvcnRzLmlzUHJvZmlsZXIgPSBpc1Byb2ZpbGVyO1xuZXhwb3J0cy5pc1N0cmljdE1vZGUgPSBpc1N0cmljdE1vZGU7XG5leHBvcnRzLmlzU3VzcGVuc2UgPSBpc1N1c3BlbnNlO1xuICB9KSgpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWlzLnByb2R1Y3Rpb24ubWluLmpzJyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzJyk7XG59XG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1wiaGVscGVyc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJpMThuXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZhbGlkYXRvcnNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsdWVPYmplY3RzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJob29rc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ2ZW5kb3JcIl1bXCJjdWlkXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibG9kYXNoXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZlbmRvclwiXVtcIm1vbWVudFwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9
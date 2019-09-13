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
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/datetime/constants.js");
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
  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__["isModelEntityOfModel"])(DateTimeEntity, _constants__WEBPACK_IMPORTED_MODULE_3__["MODEL_NAME"])) {
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
  return isValidEntityOrArchive(DateTimeEntity, includeTrashed) && DateTimeEntity.end.diffNow().asSeconds() < 0 && DateTimeEntity.end.diffNow().asSeconds() > _constants__WEBPACK_IMPORTED_MODULE_3__["MONTH_IN_SECONDS"] * -1;
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
  cap = Object(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_1__["parseInfinity"])(cap, true);
  return cap !== Infinity && DateTimeEntity.sold >= cap;
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
    return _constants__WEBPACK_IMPORTED_MODULE_3__["DATETIME_STATUS_ID"].TRASHED;
  }

  if (isExpired(DateTimeEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_3__["DATETIME_STATUS_ID"].EXPIRED;
  }

  if (isSoldOut(DateTimeEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_3__["DATETIME_STATUS_ID"].SOLD_OUT;
  }

  if (isUpcoming(DateTimeEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_3__["DATETIME_STATUS_ID"].UPCOMING;
  }

  if (isActive(DateTimeEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_3__["DATETIME_STATUS_ID"].ACTIVE;
  } // PLZ SEE NOTE ABOVE
  // if ( isCancelled( DateTimeEntity ) ) {
  // 	return DATETIME_STATUS_ID.CANCELLED;
  // }
  // if ( isPostponed( DateTimeEntity ) ) {
  // 	return DATETIME_STATUS_ID.POSTPONED;
  // }


  assertDateTimeEntity(DateTimeEntity);
  return _constants__WEBPACK_IMPORTED_MODULE_3__["DATETIME_STATUS_ID"].INACTIVE;
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
    case _constants__WEBPACK_IMPORTED_MODULE_3__["DATETIME_STATUS_ID"].SOLD_OUT:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('sold out', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_3__["DATETIME_STATUS_ID"].EXPIRED:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('expired', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_3__["DATETIME_STATUS_ID"].UPCOMING:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('upcoming', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_3__["DATETIME_STATUS_ID"].ACTIVE:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('active', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_3__["DATETIME_STATUS_ID"].TRASHED:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('archived', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_3__["DATETIME_STATUS_ID"].CANCELLED:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('cancelled', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_3__["DATETIME_STATUS_ID"].POSTPONED:
      dateStatus = Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('postponed', 'event_espresso');
      break;

    case _constants__WEBPACK_IMPORTED_MODULE_3__["DATETIME_STATUS_ID"].INACTIVE:
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
/*! exports provided: BaseEntity, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseEntity", function() { return BaseEntity; });
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
   *
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
   * @return {symbol}  Returns the current save state for the entity.
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(BaseEntity, [{
    key: "saveState",
    get: function get() {
      return this[_constants__WEBPACK_IMPORTED_MODULE_10__["PRIVATE_PROPERTIES"].SAVE_STATE];
    }
    /**
     * Whether the current save state is SAVE_STATE.NEW
     *
     * @return {boolean}  True means SAVE_STATE.NEW is the save state.
     */

  }, {
    key: "isNew",
    get: function get() {
      return this.saveState === _constants__WEBPACK_IMPORTED_MODULE_10__["SAVE_STATE"].NEW;
    }
    /**
     * Whether the current save state is SAVE_STATE.DIRTY
     *
     * @return {boolean}  True means SAVE_STATE.DIRTY is the save state.
     */

  }, {
    key: "isDirty",
    get: function get() {
      return this.saveState === _constants__WEBPACK_IMPORTED_MODULE_10__["SAVE_STATE"].DIRTY;
    }
    /**
     * Whether the current save state is SAVE_STATE.CLEAN
     *
     * @return {boolean}  True means SAVE_STATE.CLEAN is the save state.
     */

  }, {
    key: "isClean",
    get: function get() {
      return this.saveState === _constants__WEBPACK_IMPORTED_MODULE_10__["SAVE_STATE"].CLEAN;
    }
    /**
     * Whether the entity has any password protected fields.
     *
     * @return {boolean} True means it does, false means it doesn't.
     */

  }, {
    key: "isPasswordProtected",
    get: function get() {
      return this.protectedFields.length > 0;
    }
    /**
     * Whether the given fieldName is a password protected field.
     *
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
     * @return {Function} callback that returns a new instance of BaseEntity
     */

  }, {
    key: "clone",
    get: function get() {
      var _this2 = this;

      /**
       * @param {boolean} keepId
       * @return {BaseEntity} A new instance of BaseEntity
       */
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
 *
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
     *
     * @type {string}
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
     * @return {Object} an instance of Entity
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
     * @return {Object} an instance of Entity
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
/*! exports provided: BaseEntity, createEntityFactory, MODEL_PREFIXES, SAVE_STATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-entity */ "./assets/src/data/model/entity-factory/base-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseEntity", function() { return _base_entity__WEBPACK_IMPORTED_MODULE_0__["BaseEntity"]; });

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
/*! exports provided: assertEntityHasKey, assertImmutableObjectHasPath, assertIsArray, assertIsNotEmpty, assertIsMap, QUERY_ORDER_ASC, QUERY_ORDER_DESC, ALLOWED_ORDER_VALUES, GREATER_THAN, LESS_THAN, GREATER_THAN_AND_EQUAL, LESS_THAN_AND_EQUAL, getQueryString, DEFAULT_LISTS_STATE, DEFAULT_CORE_STATE, DEFAULT_SCHEMA_STATE, baseRestRoute, endpoints, getEndpoint, applyQueryString, stripBaseRouteFromUrl, BaseEntity, createEntityFactory, MODEL_PREFIXES, SAVE_STATE, primaryKeys, valuesForCombinedPrimaryKeys, valueForPrimaryKey, getPrimaryKey, getPrimaryKeyQueryString, getEntityPrimaryKeyValues, keyEntitiesByPrimaryKeyValue, createAndKeyEntitiesByPrimaryKeyValue, MODEL_NAMES, pluralModelName, singularModelName, modelNameForQueryString, attendeeModel, checkInModel, dateTimeModel, eventModel, priceTypeModel, registrationModel, statusModel, ticketModel */
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
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseEntity", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_4__["BaseEntity"]; });

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
/*! exports provided: attendeeModel, checkInModel, dateTimeModel, eventModel, priceTypeModel, registrationModel, statusModel, ticketModel, BaseEntity, createEntityFactory, MODEL_PREFIXES, SAVE_STATE */
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
/* harmony import */ var _entity_factory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./entity-factory */ "./assets/src/data/model/entity-factory/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseEntity", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_8__["BaseEntity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createEntityFactory", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_8__["createEntityFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_PREFIXES", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_8__["MODEL_PREFIXES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SAVE_STATE", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_8__["SAVE_STATE"]; });












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
 * @param {Object} ticketEntity model object
 * @throws {TypeError}
 */

var assertTicketEntity = function assertTicketEntity(ticketEntity) {
  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntityOfModel"])(ticketEntity, _constants__WEBPACK_IMPORTED_MODULE_2__["MODEL_NAME"])) {
    throw new TypeError('The provided entity is not a ticket instance');
  }
};
/**
 * @function
 * @param {Object} ticketEntity model object
 * @param {boolean} includeArchived if true will not filter out trashed entities
 * @return {boolean} true if event date is valid entity or archive
 */


var isValidEntityOrArchive = function isValidEntityOrArchive(ticketEntity, includeArchived) {
  return includeArchived && assertTicketEntity(ticketEntity) || !includeArchived && !isArchived(ticketEntity);
};
/**
 * @function
 * @param {Object} ticketEntity model object
 * @param {boolean} includeArchived if true will not filter out archived entities
 * @return {boolean} true if ticket is currently available for purchase
 */


var isOnSale = function isOnSale(ticketEntity) {
  var includeArchived = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return isValidEntityOrArchive(ticketEntity, includeArchived) && ticketEntity.startDate.diffNow() < 0 && ticketEntity.endDate.diffNow() > 0;
};
/**
 * @function
 * @param {Object} ticketEntity model object
 * @param {boolean} includeArchived if true will not filter out archived entities
 * @return {boolean} true if ticket can no longer be purchased
 */

var isExpired = function isExpired(ticketEntity) {
  var includeArchived = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return isValidEntityOrArchive(ticketEntity, includeArchived) && ticketEntity.endDate.diffNow() < 0;
};
/**
 * @function
 * @param {Object} ticketEntity model object
 * @param {boolean} includeArchived if true will not filter out archived entities
 * @return {boolean} true if tickets sold meets or exceeds available quantity
 */

var isSoldOut = function isSoldOut(ticketEntity) {
  var includeArchived = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (includeArchived && !assertTicketEntity(ticketEntity) || !includeArchived && isArchived(ticketEntity)) {
    return false;
  }

  var qty = ticketEntity.qty;
  return qty !== null && qty !== 'INF' && qty !== Infinity && qty !== -1 && ticketEntity.sold >= qty;
};
/**
 * @function
 * @param {Object} ticketEntity model object
 * @param {boolean} includeArchived if true will not filter out archived entities
 * @return {boolean} 	true if ticket is not yet available for purchase,
 * 						but will be at some date in the future
 */

var isPending = function isPending(ticketEntity) {
  var includeArchived = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return isValidEntityOrArchive(ticketEntity, includeArchived) && ticketEntity.startDate.diffNow() > 0;
};
/**
 * @function
 * @param {Object} ticketEntity model object
 * @return {boolean} true if ticket is archived
 */

var isArchived = function isArchived(ticketEntity) {
  assertTicketEntity(ticketEntity);
  return ticketEntity.deleted;
};
/**
 * @function
 * @param {Object} ticketEntity model object
 * @return {string} status ID
 */

var status = function status(ticketEntity) {
  if (isArchived(ticketEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].ARCHIVED;
  }

  if (isSoldOut(ticketEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].SOLD_OUT;
  }

  if (isExpired(ticketEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].EXPIRED;
  }

  if (isPending(ticketEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].PENDING;
  }

  if (isOnSale(ticketEntity)) {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["TICKET_STATUS_ID"].ONSALE;
  }

  return '';
};
/**
 * @function
 * @param {Object} ticketEntity model object
 * @return {string} ticket status
 */

var getTicketStatusTextLabel = function getTicketStatusTextLabel(ticketEntity) {
  var ticketStatus = '';

  switch (status(ticketEntity)) {
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
 * @param {Object} ticketEntity model object
 * @return {string}    CSS class for the background color
 */

var getBackgroundColorClass = function getBackgroundColorClass(ticketEntity) {
  return "ee-status-background-color-".concat(status(ticketEntity));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLm1vZGVsL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvYXNzZXJ0aW9ucy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2F0dGVuZGVlL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2F0dGVuZGVlL2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvYXR0ZW5kZWUvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9iYXNlLWRhdGUtZm9ybWF0dGVyLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvYmFzZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2NoZWNraW4vY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvY2hlY2tpbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2NoZWNraW4vcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9mb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2RhdGV0aW1lL3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZGF0ZXRpbWUvc3RhdHVzLWhlbHBlci5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2RlZmF1bHQtbW9kZWwtc3RhdGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbmRwb2ludHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9hc3NlcnRpb25zLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZW50aXR5LWZhY3RvcnkvYmFzZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9ib29sZWFucy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2V4dHJhY3RvcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L3ZhbGlkYXRvcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9ldmVudC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9ldmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2V2ZW50L3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9tb2RlbC1uYW1lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL21vZGVscy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3ByaWNlLXR5cGUvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvcHJpY2UtdHlwZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3ByaW1hcnkta2V5cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3JlZ2lzdHJhdGlvbi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvc3RhdHVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC90aWNrZXQvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L3N0YXR1cy1oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9tZW1pemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcGx1cmFsaXplL3BsdXJhbGl6ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9ub2RlX21vZHVsZXMvcmVhY3QtaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaGVscGVyc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaTE4blwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsaWRhdG9yc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsdWVPYmplY3RzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiaG9va3NcIl19Iiwid2VicGFjazovL2VlanMubW9kZWwvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZlbmRvclwiLFwiY3VpZFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmVuZG9yXCIsXCJtb21lbnRcIl19Il0sIm5hbWVzIjpbImFzc2VydEVudGl0eUhhc0tleSIsImtleSIsImVudGl0eSIsIm1lc3NhZ2UiLCJzcHJpbnRmIiwiX18iLCJoYXNPd25Qcm9wZXJ0eSIsIkV4Y2VwdGlvbiIsImFzc2VydEltbXV0YWJsZU9iamVjdEhhc1BhdGgiLCJwYXRoIiwiaW1tdXRhYmxlIiwiaGFzSW4iLCJhc3NlcnRJc0FycmF5IiwiaXRlbXMiLCJpc0FycmF5IiwiYXNzZXJ0SXNOb3RFbXB0eSIsImlzRW1wdHkiLCJhc3NlcnRJc01hcCIsIml0ZW0iLCJpc01hcCIsIk1PREVMX05BTUUiLCJvcmRlckJ5TWFwIiwiaWQiLCJsYXN0TmFtZU9ubHkiLCJmaXJzdE5hbWVPbmx5IiwiZmlyc3RUaGVuTGFzdE5hbWUiLCJsYXN0VGhlbkZpcnN0TmFtZSIsInF1ZXJ5RGF0YVR5cGVzIiwiZm9yRXZlbnRJZCIsIlByb3BUeXBlcyIsIm51bWJlciIsImZvckRhdGV0aW1lSWQiLCJmb3JUaWNrZXRJZCIsImZvclN0YXR1c0lkIiwib25lT2YiLCJSRUdJU1RSQVRJT05fU1RBVFVTX0lEUyIsImZvclJlZ2lzdHJhdGlvbklkIiwic2hvd0dyYXZhdGFyIiwiYm9vbCIsInF1ZXJ5RGF0YSIsInNoYXBlIiwibGltaXQiLCJvcmRlckJ5IiwiT2JqZWN0Iiwia2V5cyIsIm9yZGVyIiwiQUxMT1dFRF9PUkRFUl9WQUxVRVMiLCJkZWZhdWx0UXVlcnlEYXRhIiwiUVVFUllfT1JERVJfQVNDIiwibWFwT3JkZXJCeSIsImlzVW5kZWZpbmVkIiwid2hlcmVDb25kaXRpb25zIiwid2hlcmUiLCJwYXJzZUludCIsImlzTmFOIiwicHVzaCIsImluY2x1ZGVzIiwiam9pbiIsImdldFF1ZXJ5U3RyaW5nIiwiYmFzZUdldFF1ZXJ5U3RyaW5nIiwiZm9ybWF0RGF0ZXNPbkVudGl0aWVzIiwiZW50aXRpZXMiLCJlbnRpdHlEYXRlRmllbGRzIiwiZm9ybWF0IiwiZGF0ZUZvcm1hdHMiLCJsb2NhbCIsImZvcm1hdHRlZEVudGl0aWVzIiwiZm9yRWFjaCIsImZvcm1hdERhdGVzT25FbnRpdHkiLCJuZXdFbnRpdHkiLCJkYXRlRmllbGQiLCJmb3JtYXRFbnRpdGllc0RhdGVzVG9NeXNxbCIsImZvcm1hdEVudGl0eURhdGVzVG9NeXNxbCIsImZvcm1hdEVudGl0aWVzRGF0ZXNUb1NpdGUiLCJmb3JtYXRFbnRpdHlEYXRlc1RvU2l0ZSIsImNvbnZlcnRFbnRpdGllc0RhdGVzVG9Nb21lbnQiLCJjb252ZXJ0RW50aXR5RGF0ZXNUb01vbWVudCIsIlFVRVJZX09SREVSX0RFU0MiLCJHUkVBVEVSX1RIQU4iLCJlbmNvZGVVUklDb21wb25lbnQiLCJMRVNTX1RIQU4iLCJHUkVBVEVSX1RIQU5fQU5EX0VRVUFMIiwiTEVTU19USEFOX0FORF9FUVVBTCIsImRlZmF1bHRXaGVyZUNvbmRpdGlvbnMiLCJxdWVyeVBhcmFtcyIsImZpZWxkIiwicXVlcnlTdHJpbmciLCJDSEVDS0lOX1NUQVRVU19JRCIsIlNUQVRVU19DSEVDS0VEX09VVCIsIlNUQVRVU19DSEVDS0VEX0lOIiwiU1RBVFVTX0NIRUNLRURfTkVWRVIiLCJDSEVDS0lOX1NUQVRVU19JRFMiLCJ2YWx1ZXMiLCJjaGVja2luU3RhdHVzIiwib3B0aW9uc0VudGl0eU1hcCIsImRlZmF1bHQiLCJsYWJlbCIsInByZXR0eVN0YXR1cyIsInZhbHVlIiwidGltZXN0YW1wIiwiREFURVRJTUVfU1RBVFVTX0lEIiwiQUNUSVZFIiwiQ0FOQ0VMTEVEIiwiRVhQSVJFRCIsIklOQUNUSVZFIiwiUE9TVFBPTkVEIiwiU09MRF9PVVQiLCJUUkFTSEVEIiwiVVBDT01JTkciLCJEQVRFVElNRV9TVEFUVVNfSURTIiwiTUlOVVRFX0lOX1NFQ09ORFMiLCJIT1VSX0lOX1NFQ09ORFMiLCJEQVlfSU5fU0VDT05EUyIsIldFRUtfSU5fU0VDT05EUyIsIk1PTlRIX0lOX1NFQ09ORFMiLCJEQVRFX0ZJRUxEUyIsImZvcm1hdHRlcnMiLCJmb3JPd24iLCJiYXNlRm9ybWF0dGVyIiwiaW1wbGVtZW50YXRpb24iLCJmdW5jdGlvbk5hbWUiLCJpbmNvbWluZ0FyZ3MiLCJmaXJzdEFyZyIsInB1bGxBdCIsInByZXR0eURhdGVGcm9tRGF0ZVRpbWUiLCJEYXRlVGltZUVudGl0eSIsImNvbnRlbnQiLCJpc01vZGVsRW50aXR5T2ZNb2RlbCIsIkRUVF9FVlRfc3RhcnQiLCJoYXNTYW1lIiwiRFRUX0VWVF9lbmQiLCJhbGxEYXRlVGltZXNBc1N0cmluZyIsIlNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFIiwidG9Gb3JtYXQiLCJEQVRFX1RJTUVfRk9STUFUX1NJVEUiLCJUSU1FX0ZPUk1BVF9TSVRFIiwiRFRUX25hbWUiLCJub3dEYXRlQW5kVGltZSIsIm1vbWVudCIsInNob3dFeHBpcmVkIiwibW9udGgiLCJzdGFydF9kYXRlIiwiZW5kX2RhdGUiLCJzdGFydE9mIiwiZW5kT2YiLCJhc3NlcnREYXRlVGltZUVudGl0eSIsIlR5cGVFcnJvciIsImlzVmFsaWRFbnRpdHlPckFyY2hpdmUiLCJpbmNsdWRlVHJhc2hlZCIsImlzVHJhc2hlZCIsImlzQWN0aXZlIiwic3RhcnQiLCJkaWZmTm93IiwiYXNTZWNvbmRzIiwiZW5kIiwiaXNFeHBpcmVkIiwiaXNSZWNlbnRseUV4cGlyZWQiLCJpc1NvbGRPdXQiLCJjYXAiLCJyZWdMaW1pdCIsInBhcnNlSW5maW5pdHkiLCJJbmZpbml0eSIsInNvbGQiLCJpc1VwY29taW5nIiwiZGVsZXRlZCIsInN0YXR1cyIsImdldEJhY2tncm91bmRDb2xvckNsYXNzIiwiZ2V0RGF0ZVRpbWVTdGF0dXNUZXh0TGFiZWwiLCJkYXRlU3RhdHVzIiwibWFwVG9PYmplY3RWYWx1ZXMiLCJtb2RlbE5hbWVFbmRwb2ludHMiLCJtYXBWYWx1ZXMiLCJnZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCIsIm1lbW9pemUiLCJlbmRwb2ludHMiLCJERUZBVUxUX0xJU1RTX1NUQVRFIiwiREVGQVVMVF9DT1JFX1NUQVRFIiwicmVsYXRpb25zIiwiZGlydHkiLCJpbmRleCIsImRlbGV0ZSIsImFkZCIsInRyYXNoIiwiREVGQVVMVF9TQ0hFTUFfU1RBVEUiLCJzY2hlbWEiLCJmYWN0b3J5IiwicmVsYXRpb25FbmRwb2ludHMiLCJyZWxhdGlvblNjaGVtYSIsImRhdGEiLCJwYXRocyIsImNvbGxlY3Rpb25fZW5kcG9pbnRzIiwiYmFzZVJlc3RSb3V0ZSIsImJhc2VfcmVzdF9yb3V0ZSIsImdldEVuZHBvaW50IiwibW9kZWxOYW1lIiwiYXBwbHlRdWVyeVN0cmluZyIsInN0cmlwQmFzZVJvdXRlRnJvbVVybCIsInVybCIsInJlcGxhY2UiLCJtYXliZUFzc2VydFZhbHVlT2JqZWN0IiwiZmllbGROYW1lIiwiZmllbGRWYWx1ZSIsImlzRGF0ZVRpbWVGaWVsZCIsIkRhdGVUaW1lIiwiYXNzZXJ0SXNEYXRlVGltZSIsImlzTW9uZXlGaWVsZCIsIk1vbmV5IiwiYXNzZXJ0TW9uZXkiLCJhc3NlcnRWYWxpZFNjaGVtYSIsImlzU2NoZW1hIiwiSW52YWxpZFNjaGVtYSIsImFzc2VydFZhbGlkU2NoZW1hRmllbGRQcm9wZXJ0aWVzIiwidHlwZSIsInByb3BlcnRpZXMiLCJyYXciLCJhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZCIsImluc3RhbmNlIiwiaXNWYWxpZCIsImlzU2hhbGxvd1ZhbGlkVmFsdWVGb3JGaWVsZCIsImVudW0iLCJ2YWxpZGF0ZUVudW1UeXBlIiwidmFsaWRhdGVUeXBlIiwibWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMiLCJhc3NlcnRWYWxpZEZpZWxkQW5kVmFsdWVBZ2FpbnN0U2NoZW1hIiwidmFsaWRhdGlvblR5cGUiLCJ2YWxpZGF0ZVR5cGVGb3JGaWVsZCIsIlBSSVZBVEVfUFJPUEVSVElFUyIsIlNBVkVfU1RBVEUiLCJWQUxJREFURV9UWVBFUyIsIkJhc2VFbnRpdHkiLCJlbnRpdHlGaWVsZHNBbmRWYWx1ZXMiLCJmaWVsZFByZWZpeGVzIiwiaXNOZXciLCJDTEVBTiIsImNyZWF0ZUdldHRlciIsInNldFNhdmVTdGF0ZSIsIk5FVyIsIlNldCIsImNyZWF0ZUVudGl0eUdldHRlcnNBbmRTZXR0ZXJzIiwiY3JlYXRlUGVyc2lzdGluZ0dldHRlcnNBbmRTZXR0ZXJzIiwic2VhbCIsInNhdmVTdGF0ZSIsIkRJUlRZIiwicHJvdGVjdGVkRmllbGRzIiwibGVuZ3RoIiwiaW5kZXhPZiIsImtlZXBJZCIsImNyZWF0ZUZhY3RvcnkiLCJjcmVhdGVFbnRpdHlGYWN0b3J5IiwiJHNjaGVtYSIsImNyZWF0ZU5ldyIsImZvckNsb25lIiwibmFtZUNsYXNzIiwibmFtZSIsImV4dGVuZGVkQ2xhc3MiLCJFbnRpdHkiLCJ1cHBlckZpcnN0IiwiY2FtZWxDYXNlIiwiY2xhc3NEZWYiLCJmaWVsZHNBbmRWYWx1ZXMiLCJmcm9tRXhpc3RpbmciLCJoYXNSYXdQcm9wZXJ0eSIsImlzUGxhaW5PYmplY3QiLCJoYXNQcmV0dHlQcm9wZXJ0eSIsInByZXR0eSIsImhhc1JlbmRlcmVkUHJvcGVydHkiLCJyZW5kZXJlZCIsImhhc0Zvcm1hdFByb3BlcnR5IiwiaGFzRW51bVByb3BlcnR5IiwiaXNWYWx1ZU9iamVjdEZpZWxkIiwiaXNVVENEYXRlVGltZUZpZWxkIiwiZGF0ZVRpbWVGaWVsZE5hbWUiLCJpc1ByaW1hcnlLZXlGaWVsZCIsInByaW1hcnlfa2V5IiwiaXNSZWFkT25seSIsInJlYWRvbmx5IiwiaXNFbnRpdHlGaWVsZCIsImlzRW51bUZpZWxkIiwiU3ltYm9sIiwiVkFMSURBVEVfVFlQRSIsIlJBVyIsIlJFTkRFUkVEIiwiUFJFVFRZIiwiTU9ERUxfUFJFRklYRVMiLCJwcmVmaXhNYXAiLCJhcHBseUZpbHRlcnMiLCJhbnN3ZXIiLCJhdHRlbmRlZSIsImNoYW5nZV9sb2ciLCJjaGVja2luIiwiY291bnRyeSIsImN1cnJlbmN5IiwiY3VycmVuY3lfcGF5bWVudF9tZXRob2QiLCJkYXRldGltZSIsImRhdGV0aW1lX3RpY2tldCIsImV2ZW50IiwiZXZlbnRfbWVzc2FnZV90ZW1wbGF0ZSIsImV2ZW50X3F1ZXN0aW9uX2dyb3VwIiwiZXZlbnRfdmVudWUiLCJleHRyYV9qb2luIiwiZXh0cmFfbWV0YSIsImxpbmVfaXRlbSIsIm1lc3NhZ2VfdGVtcGxhdGUiLCJtZXNzYWdlX3RlbXBsYXRlX2dyb3VwIiwicGF5bWVudCIsInBheW1lbnRfbWV0aG9kIiwicG9zdF9tZXRhIiwicHJpY2UiLCJwcmljZV90eXBlIiwicXVlc3Rpb24iLCJxdWVzdGlvbl9ncm91cCIsInF1ZXN0aW9uX2dyb3VwX3F1ZXN0aW9uIiwicXVlc3Rpb25fb3B0aW9uIiwicmVjdXJyZW5jZSIsInJlZ2lzdHJhdGlvbiIsInJlZ2lzdHJhdGlvbl9wYXltZW50Iiwic3RhdGUiLCJ0ZXJtIiwidGVybV9yZWxhdGlvbnNoaXAiLCJ0ZXJtX3RheG9ub215IiwidGlja2V0IiwidGlja2V0X3ByaWNlIiwidGlja2V0X3RlbXBsYXRlIiwidHJhbnNhY3Rpb24iLCJ2ZW51ZSIsIndwX3VzZXIiLCJvcHRzIiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJjcmVhdGVDYWxsYmFja0dldHRlciIsInByb3BlcnR5TmFtZSIsImNhbGxCYWNrIiwiY3JlYXRlR2V0dGVyQW5kU2V0dGVyIiwiaW5pdGlhbEZpZWxkVmFsdWUiLCJwcm9wZXJ0eVZhbHVlIiwic2V0IiwicmVjZWl2ZWRWYWx1ZSIsImlzUHJpbWFyeUZpZWxkIiwic2V0RmllbGRUb1BlcnNpc3QiLCJjcmVhdGVBbGlhc0dldHRlckFuZFNldHRlciIsIm9yaWdpbmFsRmllbGROYW1lIiwiYWxpYXNGaWVsZE5hbWUiLCJjcmVhdGVBbGlhc0dldHRlciIsImNyZWF0ZUZsdWVudFNldHRlciIsInByaW1hcnlLZXlzIiwib3JpZ2luYWxGaWVsZHNBbmRWYWx1ZXMiLCJpc1ByaW1hcnlLZXkiLCJzZXRWYWxpZGF0ZVR5cGVGb3JGaWVsZCIsInNldEluaXRpYWxFbnRpdHlGaWVsZHNBbmRWYWx1ZXMiLCJzZXRDYWxjdWxhdGVkRmllbGRBbmRWYWx1ZXMiLCJwb3B1bGF0ZVByb3RlY3RlZEZpZWxkc1Byb3BlcnR5Iiwic2V0UmVzb3VyY2VzIiwiY3JlYXRlUHJpbWFyeUtleUZpZWxkR2V0dGVycyIsInBvcHVsYXRlUHJpbWFyeUtleXMiLCJwb3B1bGF0ZU1pc3NpbmdGaWVsZHMiLCJjYWxjdWxhdGVkRmllbGRzIiwiX2NhbGN1bGF0ZWRfZmllbGRzIiwiX3Byb3RlY3RlZCIsImdldFByaW1hcnlLZXlGaWVsZHNGcm9tU2NoZW1hIiwic2NoZW1hUHJvcGVydGllcyIsInNjaGVtYUZpZWxkIiwiY3VpZCIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJjcmVhdGVBbGlhc0dldHRlckFuZFNldHRlckZvckZpZWxkIiwiZGVyaXZlVmFsaWRhdGVUeXBlRm9yRmllbGQiLCJnZXRFbnRpdHlGaWVsZHNGcm9tU2NoZW1hIiwidW5kZWZpbmVkIiwiZ2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvckNsb25pbmciLCJmb3JVcGRhdGUiLCJnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yUGVyc2lzdGluZyIsImZvckluc2VydCIsImVudGl0eVZhbHVlcyIsInByaW1hcnlLZXkiLCJmb3JQZXJzaXN0IiwiZ2V0RGVmYXVsdFZhbHVlRm9yRmllbGQiLCJjcmVhdGVSYXdFbnRpdHlHZXR0ZXJzU2V0dGVycyIsImRlcml2ZVByZXBhcmVkVmFsdWVGb3JGaWVsZCIsImNyZWF0ZVJlbmRlcmVkR2V0dGVycyIsImRlcml2ZVJlbmRlcmVkVmFsdWUiLCJjcmVhdGVBbGlhc0dldHRlckZvckZpZWxkIiwiY3JlYXRlQWxpYXNlc0Zvck1ldGhvZCIsIm1ldGhvZCIsIm5ld0ZpZWxkTmFtZSIsImZpZWxkUHJlZml4IiwiZ2V0UmVuZGVyZWRDYWxsYmFjayIsInJlcXVlc3RlZEZpZWxkTmFtZSIsInJlbW92ZVByZWZpeGVzRnJvbUZpZWxkIiwicHJlZml4ZXNUb1JlbW92ZSIsInNvcnRCeSIsInByZWZpeCIsImdldFJlbmRlcmVkIiwiaGFzTXVsdGlwbGVQcmltYXJ5S2V5c0NhbGxiYWNrIiwiaGFzQ2FsY3VsYXRlZEZpZWxkQ2FsbGJhY2siLCJmaWVsZE5hbWVUb0NoZWNrIiwiY2FsY3VsYXRlZEZpZWxkVmFsdWUiLCJjYWxjdWxhdGVkRmllbGROYW1lIiwicmVsYXRpb25OYW1lIiwicmVzb3VyY2VWYWx1ZSIsInJlc291cmNlTmFtZSIsImhyZWYiLCJnZXRSZWxhdGlvbk5hbWVGcm9tTGluayIsInNldFJlbGF0aW9uc1Jlc291cmNlIiwiZ2V0UmVsYXRpb25SZXNvdXJjZUNhbGxiYWNrIiwicmVzb3VyY2VJbmZvIiwicmVzb3VyY2VMaW5rIiwic2luZ2xlIiwiZ2V0UmVsYXRpb25SZXNvdXJjZSIsIm92ZXJyaWRlIiwiY3VycmVudFN0YXRlIiwiSW52YWxpZEFyZ3VtZW50IiwiZmllbGRzVG9QZXJzaXN0T25JbnNlcnQiLCJtYXliZUNvbnZlcnRUb1ZhbHVlT2JqZWN0IiwidmFsaWRhdGVJc0RhdGVUaW1lIiwiZnJvbUlTTyIsImluc3RhbmNlT2YiLCJTaXRlQ3VycmVuY3kiLCJ0b0lTTyIsInRvTnVtYmVyIiwibWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0IiwicGx1cmFsTW9kZWxOYW1lIiwibGFzdCIsInNwbGl0IiwiZW50aXR5SW5zdGFuY2UiLCJyZWR1Y2UiLCJpdGVyYXRvciIsIkFycmF5IiwiZnJvbSIsImdldFByaW1hcnlLZXlWYWx1ZXMiLCJwaWNrIiwicGlja0J5IiwiZGVyaXZlRGVmYXVsdFZhbHVlRm9yVHlwZSIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImRlcml2ZVR5cGVGb3JGaWVsZCIsInZhbGlkIiwic2luZ2xlVHlwZSIsImlzSW50ZWdlciIsImlzTnVtYmVyIiwiaXNTdHJpbmciLCJpc0Jvb2xlYW4iLCJlbnVtVmFsdWVzIiwiZXhwZWN0VmFsdWVPYmplY3RzIiwiaXNFbnVtIiwiaXNWYWx1ZU9iamVjdCIsIkVWRU5UX1NUQVRVU19JRCIsIkVWRU5UX1NUQVRVU19JRFMiLCJjYXRlZ29yeVNsdWciLCJzdHJpbmciLCJ0aWNrZXRfc3RhcnQiLCJ0aWNrZXRfZW5kIiwiTU9ERUxfTkFNRVMiLCJwbHVyYWxpemUiLCJzaW5ndWxhck1vZGVsTmFtZSIsInNpbmd1bGFyIiwibW9kZWxOYW1lRm9yUXVlcnlTdHJpbmciLCJzdGFydENhc2UiLCJCQVNFX1BSSUNFX1RZUEVTIiwiQkFTRV9QUklDRSIsIkRJU0NPVU5UIiwiU1VSQ0hBUkdFIiwiVEFYIiwicHJpbWFyeV9rZXlzIiwidmFsdWVzRm9yQ29tYmluZWRQcmltYXJ5S2V5cyIsInJlc3VsdCIsInRyaW1FbmQiLCJ2YWx1ZUZvclByaW1hcnlLZXkiLCJnZXRQcmltYXJ5S2V5IiwiZ2V0UHJpbWFyeUtleVF1ZXJ5U3RyaW5nIiwia2V5VmFsdWVzIiwiZ2V0RW50aXR5UHJpbWFyeUtleVZhbHVlcyIsImtleUVudGl0aWVzQnlQcmltYXJ5S2V5VmFsdWUiLCJtYXBwZWRFbnRpdGllcyIsIk1hcCIsImNyZWF0ZUFuZEtleUVudGl0aWVzQnlQcmltYXJ5S2V5VmFsdWUiLCJlbnRpdHlJZCIsInN0YXR1c01vZGVsIiwiZm9yQXR0ZW5kZWVJZCIsImZvclRyYW5zYWN0aW9uSWQiLCJyZWdfaWQiLCJyZWdfZGF0ZSIsIlNUQVRVU19UWVBFX0VNQUlMIiwiU1RBVFVTX1RZUEVfRVZFTlQiLCJTVEFUVVNfVFlQRV9NRVNTQUdFIiwiU1RBVFVTX1RZUEVfUEFZTUVOVCIsIlNUQVRVU19UWVBFX1JFR0lTVFJBVElPTiIsIlNUQVRVU19UWVBFX1RSQU5TQUNUSU9OIiwiRU1BSUxfU1RBVFVTX0lEIiwiRFJBRlQiLCJTRU5UIiwiUkVHSVNUUkFUSU9OX0NMT1NFRCIsIkRFTEVURUQiLCJERU5JRUQiLCJOT1RfQUNUSVZFIiwiTk9UX09QRU4iLCJPTkdPSU5HIiwiUkVHSVNUUkFUSU9OX09QRU4iLCJQRU5ESU5HIiwiU0VDT05EQVJZIiwiTUVTU0FHRV9TVEFUVVNfSUQiLCJERUJVRyIsIkVYRUNVVElORyIsIkZBSUwiLCJJTkNPTVBMRVRFIiwiSURMRSIsIlJFU0VORCIsIlJFVFJZIiwiUEFZTUVOVF9TVEFUVVNfSUQiLCJBUFBST1ZFRCIsIkRFQ0xJTkVEIiwiRkFJTEVEIiwiUkVHSVNUUkFUSU9OX1NUQVRVU19JRCIsIk5PVF9BUFBST1ZFRCIsIlBFTkRJTkdfUEFZTUVOVCIsIldBSVRfTElTVCIsIlRSQU5TQUNUSU9OX1NUQVRVU19JRCIsIkFCQU5ET05FRCIsIkNPTVBMRVRFIiwiT1ZFUlBBSUQiLCJDUFRfU1RBVFVTX0lEIiwiUFVCTElTSCIsIkZVVFVSRSIsIlBSSVZBVEUiLCJVTktOT1dOX1NUQVRVU19JRCIsIkFMTF9TVEFUVVNfSURTIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9SRUdJU1RSQVRJT04iLCJMYWJlbCIsImZyb21TYW1lU2luZ2xlQW5kUGx1cmFsIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9UUkFOU0FDVElPTiIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfUEFZTUVOVCIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfTUVTU0FHRSIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ1BUIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9FVkVOVCIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfVElDS0VUIiwiVElDS0VUX1NUQVRVU19JRCIsIkFSQ0hJVkVEIiwiT05TQUxFIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9EQVRFVElNRSIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ0hFQ0tJTiIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQUxMIiwic3RhdHVzQ29kZSIsIkZPUk1BVF9TRU5URU5DRV9DQVNFIiwiYXNGb3JtYXR0ZWQiLCJwcmV0dHlTdGF0dXNlcyIsInN0YXR1c0NvZGVzIiwibWFwcGVkU3RhdHVzZXMiLCJzdGF0dXNUeXBlIiwiVElDS0VUX1NUQVRVU19JRFMiLCJhc3NlcnRUaWNrZXRFbnRpdHkiLCJ0aWNrZXRFbnRpdHkiLCJpbmNsdWRlQXJjaGl2ZWQiLCJpc0FyY2hpdmVkIiwiaXNPblNhbGUiLCJzdGFydERhdGUiLCJlbmREYXRlIiwicXR5IiwiaXNQZW5kaW5nIiwiZ2V0VGlja2V0U3RhdHVzVGV4dExhYmVsIiwidGlja2V0U3RhdHVzIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztR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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3RmRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7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Z0M7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LEk7Ozs7Ozs7Ozs7O0FDQWhELGFBQWEsbURBQW1ELEVBQUUsSSIsImZpbGUiOiJldmVudGVzcHJlc3NvLW1vZGVsLjc4ZWM3NDhlY2NkYWM5MDlkYTE2LmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9pbmRleC5qc1wiKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBFeGNlcHRpb24gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcbmltcG9ydCB7IHNwcmludGYsIF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc0FycmF5LCBpc0VtcHR5LCBpc01hcCB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiBrZXkgZXhpc3RzIGluIHRoZSBwcm92aWRlZCBlbnRpdHkgb2JqZWN0LlxuICogVGhpcyBpcyB1c2VkIHdoZW4gY2FsbGluZyBjb2RlIHdhbnRzIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24uXG4gKlxuICogQHBhcmFtIHsgc3RyaW5nIH0ga2V5XG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHlcbiAqIEBwYXJhbSB7IHN0cmluZyB9IG1lc3NhZ2VcbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfSAgVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgcHJvdmlkZWQgZW50aXR5IGRvZXMgbm90XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgaGF2ZSB0aGUgZ2l2ZW4ga2V5LlxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0RW50aXR5SGFzS2V5ID0gKCBrZXksIGVudGl0eSwgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBzcHJpbnRmKFxuXHRcdFx0X18oXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgZW50aXR5ICglcykgZG9lcyBub3QgaGF2ZSB0aGUgZ2l2ZW4gcHJvcGVydHkgKCVzKScsXG5cdFx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0XHQpLFxuXHRcdFx0ZW50aXR5LFxuXHRcdFx0a2V5LFxuXHRcdCk7XG5cdH1cblx0aWYgKCAhIGVudGl0eS5oYXNPd25Qcm9wZXJ0eSgga2V5ICkgKSB7XG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbiggbWVzc2FnZSApO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gcGF0aCBpbiB0aGUgcHJvdmlkZWQgaW1tdXRhYmxlIG9iamVjdCBleGlzdHMuXG4gKiBUaGlzIGlzIHVzZWQgd2hlbiBjYWxsaW5nIGNvZGUgd2FudHMgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93biBpZiB0aGUgZ2l2ZW5cbiAqIHNlYXJjaCBwYXRoIGFycmF5IGRvZXMgbm90IGV4aXN0IGluIHRoZSBpbW11dGFibGUgb2JqZWN0LlxuICpcbiAqIElmIHRoZSBpbW11dGFibGUgb2JqZWN0IGlzIHNldHVwIGxpa2UgdGhpczpcbiAqXG4gKiBpbW11dGFibGUgPSBJbW11dGFibGUuTWFwKCkuc2V0KCAnZXZlbnQnLCBJbW11dGFibGUuTWFwKCkuc2V0KCAxMCwgRXZlbnQgKSApO1xuICpcbiAqIFRoZW4gYSB2YWxpZCBzZWFyY2hhYmxlIHBhdGggY291bGQgYmUgYFsgJ2V2ZW50JywgMTAgXWAuICBBbiBpbnZhbGlkIHBhdGhcbiAqIHdvdWxkIGJlIGBbICdkYXRldGltZScsIDEwIF1gXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGF0aCAgU2VhcmNoYWJsZSBwYXRoIGZvciB0aGUgaW1tdXRhYmxlIG9qYmVjdCB0byB2ZXJpZnkuXG4gKiBAcGFyYW0ge0ltbXV0YWJsZS5NYXB8SW1tdXRhYmxlLlNldH0gaW1tdXRhYmxlICBBbiBpbW11dGFibGUgb2JqZWN0IChNYXAsIFNldCwgTGlzdCBldGMpXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBBIGN1c3RvbSBtZXNzYWdlIHRvIHVzZS5cbiAqIEB0aHJvd3MgRXhjZXB0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRJbW11dGFibGVPYmplY3RIYXNQYXRoID0gKFxuXHRwYXRoLFxuXHRpbW11dGFibGUsXG5cdG1lc3NhZ2UgPSAnJ1xuKSA9PiB7XG5cdGlmICggbWVzc2FnZSA9PT0gJycgKSB7XG5cdFx0bWVzc2FnZSA9IHNwcmludGYoXG5cdFx0XHRfXyhcblx0XHRcdFx0J1RoZSBwcm92aWRlZCBpbW11dGFibGUgb2JqZWN0ICglcykgZG9lcyBub3QgaGF2ZSB0aGUgZ2l2ZW4gcGF0aCAoJXMpJyxcblx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHRcdCksXG5cdFx0XHRpbW11dGFibGUsXG5cdFx0XHRwYXRoLFxuXHRcdCk7XG5cdH1cblx0aWYgKCAhIGltbXV0YWJsZS5oYXNJbiggcGF0aCApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7Kn0gaXRlbXNcbiAqIEBwYXJhbSB7IHN0cmluZyB9ICBtZXNzYWdlXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH0gVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkuXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRJc0FycmF5ID0gKCBpdGVtcywgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBfXyggJ1RoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYW4gYXJyYXkuJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHR9XG5cdGlmICggISBpc0FycmF5KCBpdGVtcyApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgZW1wdHkgb3Igbm90LlxuICpcbiAqIENhbGwgdGhpcyB2YWxpZGF0b3Igd2hlbiB5b3Ugd2FudCB0byBtYWtlIHN1cmUgdGhlIHZhbHVlIGlzIE5PVCBlbXB0eS5cbiAqXG4gKiBAcGFyYW0geyp9IGl0ZW1zXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtZXNzYWdlXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH0gVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgZW1wdHkuXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRJc05vdEVtcHR5ID0gKCBpdGVtcywgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBfXyhcblx0XHRcdCdUaGUgcHJvdmlkZWQgaXRlbXMgbXVzdCBub3QgYmUgZW1wdHknLFxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHQpO1xuXHR9XG5cdGlmICggaXNFbXB0eSggaXRlbXMgKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIE1hcCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHsqfSBpdGVtXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRJc01hcCA9ICggaXRlbSwgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBfXyhcblx0XHRcdCdUaGUgcHJvdmlkZWQgaXRlbSBtdXN0IGJlIGEgTWFwIG9iamVjdCcsXG5cdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0KTtcblx0fVxuXHRpZiAoICEgaXNNYXAoIGl0ZW0gKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG4iLCJleHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdhdHRlbmRlZSc7XG4iLCJleHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbmV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0FTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG59IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IHsgUkVHSVNUUkFUSU9OX1NUQVRVU19JRFMgfSBmcm9tICcuLi9yZWdpc3RyYXRpb24vY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdGlkOiAnQVRUX0lEJyxcblx0bGFzdE5hbWVPbmx5OiAnQVRUX2xuYW1lJyxcblx0Zmlyc3ROYW1lT25seTogJ0FUVF9mbmFtZScsXG5cdGZpcnN0VGhlbkxhc3ROYW1lOiBbICdBVFRfZm5hbWUnLCAnQVRUX2xuYW1lJyBdLFxuXHRsYXN0VGhlbkZpcnN0TmFtZTogWyAnQVRUX2xuYW1lJywgJ0FUVF9mbmFtZScgXSxcbn07XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0Zm9yRXZlbnRJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yRGF0ZXRpbWVJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yVGlja2V0SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclN0YXR1c0lkOiBQcm9wVHlwZXMub25lT2YoIFJFR0lTVFJBVElPTl9TVEFUVVNfSURTICksXG5cdGZvclJlZ2lzdHJhdGlvbklkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRzaG93R3JhdmF0YXI6IFByb3BUeXBlcy5ib29sLFxuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggT2JqZWN0LmtleXMoIG9yZGVyQnlNYXAgKSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdH0gKSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ2xhc3RUaGVuRmlyc3ROYW1lJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfQVNDLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWRcbiAqIGluIGEgUkVTVCBxdWVyeSBmcm9tIHRoZSBjb250ZXh0IG9mIGEgYXR0ZW5kZWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFx0XHRvcmRlckJ5XG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gXHRSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZ1xuICogXHRcdFx0XHRcdFx0Zm9yIHRoZSBSRVNUIHF1ZXJ5IGZvciB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIGF0dGVuZGVlcyBlbmRwb2ludCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgICAgXHRJRCBvZiBFdmVudCB0byByZXRyaWV2ZSBhdHRlbmRlZXMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRGF0ZXRpbWVJZCBcdElEIG9mIERhdGV0aW1lIHRvIHJldHJpZXZlIGF0dGVuZGVlcyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JUaWNrZXRJZCBcdFx0SUQgb2YgVGlja2V0IHRvIHJldHJpZXZlIGF0dGVuZGVlcyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JSZWdpc3RyYXRpb25JZFxuICogQHBhcmFtIHtzdHJpbmd9IGZvclN0YXR1c0lkIFx0XHRJRCBvZiBTdGF0dXMgdG8gcmV0cmlldmUgYXR0ZW5kZWVzIGZvclxuICogQHBhcmFtIHtzdHJpbmd9IHNob3dHcmF2YXRhciBcdEJvb2xlYW4gdG9nZ2xlIGZvciB3aGV0aGVyIHRvIGRpc3BsYXkgdXNlciBHcmF2YXRhclxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICBcdFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICgge1xuXHRmb3JFdmVudElkID0gMCxcblx0Zm9yRGF0ZXRpbWVJZCA9IDAsXG5cdGZvclRpY2tldElkID0gMCxcblx0Zm9yUmVnaXN0cmF0aW9uSWQgPSAwLFxuXHRmb3JTdGF0dXNJZCA9ICdSQVAnLFxuXHRzaG93R3JhdmF0YXIgPSBmYWxzZSxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cblx0Ly8gZW5zdXJlIHRoYXQgZW50aXR5IElEcyBhcmUgaW50ZWdlcnNcblx0Zm9yUmVnaXN0cmF0aW9uSWQgPSBwYXJzZUludCggZm9yUmVnaXN0cmF0aW9uSWQsIDEwICk7XG5cdGZvclRpY2tldElkID0gcGFyc2VJbnQoIGZvclRpY2tldElkLCAxMCApO1xuXHRmb3JEYXRldGltZUlkID0gcGFyc2VJbnQoIGZvckRhdGV0aW1lSWQsIDEwICk7XG5cdGZvckV2ZW50SWQgPSBwYXJzZUludCggZm9yRXZlbnRJZCwgMTAgKTtcblxuXHQvLyBvcmRlciBvZiBwcmlvcml0eSBmb3IgcHJvdmlkZWQgYXJndW1lbnRzLlxuXHRpZiAoIGZvclJlZ2lzdHJhdGlvbklkICE9PSAwICYmICEgaXNOYU4oIGZvclJlZ2lzdHJhdGlvbklkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggYHdoZXJlW1JlZ2lzdHJhdGlvbi5SRUdfSURdPSR7IGZvclJlZ2lzdHJhdGlvbklkIH1gICk7XG5cdH0gZWxzZSBpZiAoIGZvclRpY2tldElkICE9PSAwICYmICEgaXNOYU4oIGZvclRpY2tldElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggYHdoZXJlW1JlZ2lzdHJhdGlvbi5UaWNrZXQuVEtUX0lEXT0keyBmb3JUaWNrZXRJZCB9YCApO1xuXHR9IGVsc2UgaWYgKCBmb3JEYXRldGltZUlkICE9PSAwICYmICEgaXNOYU4oIGZvckRhdGV0aW1lSWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCBgd2hlcmVbUmVnaXN0cmF0aW9uLlRpY2tldC5EYXRldGltZS5EVFRfSURdPSR7IGZvckRhdGV0aW1lSWQgfWAgKTtcblx0fSBlbHNlIGlmICggZm9yRXZlbnRJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JFdmVudElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggYHdoZXJlW1JlZ2lzdHJhdGlvbi5FVlRfSURdPSR7IGZvckV2ZW50SWQgfWAgKTtcblx0fVxuXG5cdGlmICggUkVHSVNUUkFUSU9OX1NUQVRVU19JRFMuaW5jbHVkZXMoIGZvclN0YXR1c0lkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggYHdoZXJlW1JlZ2lzdHJhdGlvbi5TdGF0dXMuU1RTX0lEXT0keyBmb3JTdGF0dXNJZCB9YCApO1xuXHR9XG5cdGlmICggc2hvd0dyYXZhdGFyID09PSB0cnVlICkge1xuXHRcdHdoZXJlLnB1c2goICdjYWxjdWxhdGU9dXNlcl9hdmF0YXInICk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgZGF0ZUZvcm1hdHMgZnJvbSAnQGV2ZW50ZXNwcmVzc28vaGVscGVycyc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlIGZpZWxkcyBvbiBwcm92aWRlZCBlbnRpdGllcy4gIERvZXMgbm90IG11dGF0ZSBvcmlnaW5hbFxuICogZW50aXRpZXMuXG4gKlxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdGllcyAgQW4gYXJyYXkgb2YgZW50aXR5IG9iamVjdHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyAgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBmb3JtYXQgIFRoZSBmb3JtYXQgdG8gdHJhbnNmb3JtIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyB0by5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBBcnJheSB9ICBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIG5ldyBlbnRpdGllcyB3aXRoIHRoZSBkYXRlIGZpZWxkXG4gKiAgIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdERhdGVzT25FbnRpdGllcyA9IChcblx0ZW50aXRpZXMgPSBbXSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRmb3JtYXQgPSBkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX0lTTzg2MDEsXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRpZiAoIGlzRW1wdHkoIGVudGl0aWVzICkgfHwgaXNFbXB0eSggZW50aXR5RGF0ZUZpZWxkcyApICkge1xuXHRcdHJldHVybiBlbnRpdGllcztcblx0fVxuXHRjb25zdCBmb3JtYXR0ZWRFbnRpdGllcyA9IFtdO1xuXHRlbnRpdGllcy5mb3JFYWNoKCAoIGVudGl0eSApID0+IHtcblx0XHRmb3JtYXR0ZWRFbnRpdGllcy5wdXNoKCBmb3JtYXREYXRlc09uRW50aXR5KFxuXHRcdFx0ZW50aXR5LFxuXHRcdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHRcdGZvcm1hdCxcblx0XHRcdGxvY2FsLFxuXHRcdCkgKTtcblx0fSApO1xuXHRyZXR1cm4gZm9ybWF0dGVkRW50aXRpZXM7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIG9uIHRoZSBwcm92aWRlZCBlbnRpdHkuICBEb2VzIG5vdCBtdXRhdGUgb3JpZ2luYWxcbiAqIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHkgIEFuIGVudGl0eVxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IHN0cmluZyB9IGZvcm1hdCAgVGhlIGZvcm1hdCB0byB0cmFuc2Zvcm0gdGhlIGRhdGUgZmllbGQgdmFsdWVzIHRvLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IE9iamVjdCB9ICBSZXR1cm5zIGEgbmV3IGVudGl0eSB3aXRoIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdERhdGVzT25FbnRpdHkgPSAoXG5cdGVudGl0eSA9IHt9LFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGZvcm1hdCA9IGRhdGVGb3JtYXRzLkRBVEVfVElNRV9GT1JNQVRfSVNPODYwMSxcblx0bG9jYWwgPSB0cnVlLFxuKSA9PiB7XG5cdGNvbnN0IG5ld0VudGl0eSA9IHsgLi4uZW50aXR5IH07XG5cdGVudGl0eURhdGVGaWVsZHMuZm9yRWFjaCggKCBkYXRlRmllbGQgKSA9PiB7XG5cdFx0aWYgKCBuZXdFbnRpdHlbIGRhdGVGaWVsZCBdICkge1xuXHRcdFx0bmV3RW50aXR5WyBkYXRlRmllbGQgXSA9IGRhdGVGb3JtYXRzLmZvcm1hdERhdGVTdHJpbmcoXG5cdFx0XHRcdG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0sXG5cdFx0XHRcdGZvcm1hdCxcblx0XHRcdFx0bG9jYWwsXG5cdFx0XHQpO1xuXHRcdH1cblx0fSApO1xuXHRyZXR1cm4gbmV3RW50aXR5O1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlIGZpZWxkcyB0byBteXNxbCBmb3JtYXQgb24gcHJvdmlkZWQgZW50aXRpZXMuICBEb2VzIG5vdFxuICogbXV0YXRlIG9yaWdpbmFsIGVudGl0aWVzLlxuICpcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXRpZXMgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IEFycmF5IH0gIFJldHVybnMgYSBuZXcgYXJyYXkgb2YgbmV3IGVudGl0aWVzIHdpdGggdGhlIGRhdGUgZmllbGRcbiAqICAgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RW50aXRpZXNEYXRlc1RvTXlzcWwgPSAoXG5cdGVudGl0aWVzID0gW10sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0bG9jYWwgPSB0cnVlLFxuKSA9PiB7XG5cdHJldHVybiBmb3JtYXREYXRlc09uRW50aXRpZXMoXG5cdFx0ZW50aXRpZXMsXG5cdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHRkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX01ZU1FMLFxuXHRcdGxvY2FsLFxuXHQpO1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlIGZpZWxkcyB0byBteXNxbCBmb3JtYXQgb24gcHJvdmlkZWQgZW50aXR5LiAgRG9lcyBub3RcbiAqIG11dGF0ZSBvcmlnaW5hbCBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gZW50aXR5ICBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBPYmplY3QgfSAgUmV0dXJucyBhIG5ldyBlbnRpdHkgd2l0aCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgZm9ybWF0dGVkXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXRFbnRpdHlEYXRlc1RvTXlzcWwgPSAoXG5cdGVudGl0eSA9IHt9LFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRyZXR1cm4gZm9ybWF0RGF0ZXNPbkVudGl0eShcblx0XHRlbnRpdHksXG5cdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHRkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX01ZU1FMLFxuXHRcdGxvY2FsLFxuXHQpO1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlIGZpZWxkcyB0byB0aGUgc2l0ZSBmb3JtYXQgb24gcHJvdmlkZWQgZW50aXRpZXMuICBEb2VzIG5vdFxuICogbXV0YXRlIG9yaWdpbmFsIGVudGl0aWVzLlxuICpcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXRpZXMgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IEFycmF5IH0gIFJldHVybnMgYSBuZXcgYXJyYXkgb2YgbmV3IGVudGl0aWVzIHdpdGggdGhlIGRhdGUgZmllbGRcbiAqICAgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RW50aXRpZXNEYXRlc1RvU2l0ZSA9IChcblx0ZW50aXRpZXMgPSBbXSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0cmV0dXJuIGZvcm1hdERhdGVzT25FbnRpdGllcyhcblx0XHRlbnRpdGllcyxcblx0XHRlbnRpdHlEYXRlRmllbGRzLFxuXHRcdGRhdGVGb3JtYXRzLkRBVEVfVElNRV9GT1JNQVRfU0lURSxcblx0XHRsb2NhbCxcblx0KTtcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgdG8gdGhlIHNpdGUgZm9ybWF0IG9uIHByb3ZpZGVkIGVudGl0eS4gIERvZXMgbm90XG4gKiBtdXRhdGUgb3JpZ2luYWwgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGVudGl0eSAgQW4gYXJyYXkgb2YgZW50aXR5IG9iamVjdHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyAgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICBXaGV0aGVyIG9yIG5vdCB0byBjb252ZXJ0IHRoZSBkYXRlIGZpZWxkIHZhbHVlXG4gKiAgIHRvIHRoZSBsb2NhbCB0aW1lem9uZSBmb3IgdGhlIGhvc3QuXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gIFJldHVybnMgYSBuZXcgZW50aXR5IHdpdGggdGhlIGRhdGUgZmllbGQgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RW50aXR5RGF0ZXNUb1NpdGUgPSAoXG5cdGVudGl0eSA9IHt9LFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRyZXR1cm4gZm9ybWF0RGF0ZXNPbkVudGl0eShcblx0XHRlbnRpdHksXG5cdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHRkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX1NJVEUsXG5cdFx0bG9jYWwsXG5cdCk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGRhdGUgZmllbGQgdmFsdWVzIHRvIG1vbWVudCBvYmplY3RzIGZvciB0aGUgcHJvdmlkZWQgZW50aXRpZXMuXG4gKiBEb2VzIG5vdCBtdXRhdGUgb3JpZ2luYWwgZW50aXRpZXMuXG4gKlxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdGllcyBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHJldHVybiB7IEFycmF5IH0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiBuZXcgZW50aXRpZXMgd2l0aCB0aGUgZGF0ZSBmaWVsZFxuICogICB2YWx1ZXMgY29udmVydGVkIHRvIG1vbWVudCBvYmplY3RzLlxuICovXG5leHBvcnQgY29uc3QgY29udmVydEVudGl0aWVzRGF0ZXNUb01vbWVudCA9IChcblx0ZW50aXRpZXMgPSBbXSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuKSA9PiB7XG5cdGlmICggaXNFbXB0eSggZW50aXRpZXMgKSB8fCBpc0VtcHR5KCBlbnRpdHlEYXRlRmllbGRzICkgKSB7XG5cdFx0cmV0dXJuIGVudGl0aWVzO1xuXHR9XG5cdGNvbnN0IGZvcm1hdHRlZEVudGl0aWVzID0gW107XG5cdGVudGl0aWVzLmZvckVhY2goICggZW50aXR5ICkgPT4ge1xuXHRcdGZvcm1hdHRlZEVudGl0aWVzLnB1c2goIGNvbnZlcnRFbnRpdHlEYXRlc1RvTW9tZW50KFxuXHRcdFx0ZW50aXR5LFxuXHRcdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHQpICk7XG5cdH0gKTtcblx0cmV0dXJuIGZvcm1hdHRlZEVudGl0aWVzO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBkYXRlIGZpZWxkIHZhbHVlcyB0byBtb21lbnQgb2JqZWN0cyBmb3IgdGhlIHByb3ZpZGVkIGVudGl0eS5cbiAqIERvZXMgbm90IG11dGF0ZSBvcmlnaW5hbCBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gZW50aXR5IEFuIGVudGl0eS5cbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEByZXR1cm4geyBPYmplY3QgfSBSZXR1cm5zIGEgbmV3IGVudGl0eSB3aXRoIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyBjb252ZXJ0ZWRcbiAqICAgdG8gbW9tZW50IG9iamVjdHMuXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0RW50aXR5RGF0ZXNUb01vbWVudCA9IChcblx0ZW50aXR5ID0ge30sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcbikgPT4ge1xuXHRjb25zdCBuZXdFbnRpdHkgPSB7IC4uLmVudGl0eSB9O1xuXHRlbnRpdHlEYXRlRmllbGRzLmZvckVhY2goICggZGF0ZUZpZWxkICkgPT4ge1xuXHRcdGlmICggbmV3RW50aXR5WyBkYXRlRmllbGQgXSApIHtcblx0XHRcdG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0gPSBkYXRlRm9ybWF0cy5zdHJpbmdUb01vbWVudChcblx0XHRcdFx0bmV3RW50aXR5WyBkYXRlRmllbGQgXSxcblx0XHRcdCk7XG5cdFx0fVxuXHR9ICk7XG5cdHJldHVybiBuZXdFbnRpdHk7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzQXJyYXksIGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IFFVRVJZX09SREVSX0FTQyA9ICdBU0MnO1xuZXhwb3J0IGNvbnN0IFFVRVJZX09SREVSX0RFU0MgPSAnREVTQyc7XG5leHBvcnQgY29uc3QgQUxMT1dFRF9PUkRFUl9WQUxVRVMgPSBbICdhc2MnLCAnZGVzYycsICdBU0MnLCAnREVTQycgXTtcbmV4cG9ydCBjb25zdCBHUkVBVEVSX1RIQU4gPSBlbmNvZGVVUklDb21wb25lbnQoICc+JyApO1xuZXhwb3J0IGNvbnN0IExFU1NfVEhBTiA9IGVuY29kZVVSSUNvbXBvbmVudCggJzwnICk7XG5leHBvcnQgY29uc3QgR1JFQVRFUl9USEFOX0FORF9FUVVBTCA9IGVuY29kZVVSSUNvbXBvbmVudCggJz49JyApO1xuZXhwb3J0IGNvbnN0IExFU1NfVEhBTl9BTkRfRVFVQUwgPSBlbmNvZGVVUklDb21wb25lbnQoICc8PScgKTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEBwYXJhbSB7IGZ1bmN0aW9uIH0gd2hlcmVDb25kaXRpb25zICBBIGZ1bmN0aW9uIGZvciBwcmVwcGluZyB0aGUgd2hlcmVcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uZGl0aW9ucyBmcm9tIHRoZSBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBmdW5jdGlvbiB9IG1hcE9yZGVyQnlcdFx0QSBmdW5jdGlvbiBmb3IgbWFwcGluZyBpbmNvbWluZyBvcmRlcl9ieVxuICogXHRcdFx0XHRcdFx0XHRcdFx0XHRzdHJpbmdzIHRvIHRoZSB2YWx1ZSBuZWVkZWQgZm9yIHRoZVxuICogXHRcdFx0XHRcdFx0XHRcdFx0XHRxdWVyeV9zdHJpbmcuXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFx0XHRcdFx0XHRSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9IChcblx0cXVlcnlEYXRhID0ge30sXG5cdHdoZXJlQ29uZGl0aW9ucyA9ICgpID0+IG51bGwsXG5cdG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiBvcmRlckJ5LFxuKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gd2hlcmVDb25kaXRpb25zKCBxdWVyeURhdGEgKTtcblx0Y29uc3QgeyBsaW1pdCwgb3JkZXIsIG9yZGVyQnksIGRlZmF1bHRXaGVyZUNvbmRpdGlvbnMgfSA9IHF1ZXJ5RGF0YTtcblx0Y29uc3QgcXVlcnlQYXJhbXMgPSBbXTtcblx0aWYgKCAhIGlzVW5kZWZpbmVkKCBsaW1pdCApICkge1xuXHRcdHF1ZXJ5UGFyYW1zLnB1c2goIGBsaW1pdD0keyBsaW1pdCB9YCApO1xuXHR9XG5cdGlmICggISBpc1VuZGVmaW5lZCggZGVmYXVsdFdoZXJlQ29uZGl0aW9ucyApICkge1xuXHRcdHF1ZXJ5UGFyYW1zLnB1c2goXG5cdFx0XHRgZGVmYXVsdF93aGVyZV9jb25kaXRpb25zPSR7IGRlZmF1bHRXaGVyZUNvbmRpdGlvbnMgfWBcblx0XHQpO1xuXHR9XG5cdGlmICggISBpc1VuZGVmaW5lZCggbWFwT3JkZXJCeSggb3JkZXJCeSApICkgKSB7XG5cdFx0aWYgKCBpc0FycmF5KCBtYXBPcmRlckJ5KCBvcmRlckJ5ICkgKSApIHtcblx0XHRcdGZvciAoIGNvbnN0IGZpZWxkIG9mIG1hcE9yZGVyQnkoIG9yZGVyQnkgKSApIHtcblx0XHRcdFx0cXVlcnlQYXJhbXMucHVzaCggYG9yZGVyX2J5WyR7IGZpZWxkIH1dPSR7IG9yZGVyIH1gICk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHF1ZXJ5UGFyYW1zLnB1c2goIGBvcmRlcj0keyBvcmRlciB9YCApO1xuXHRcdFx0cXVlcnlQYXJhbXMucHVzaCggYG9yZGVyX2J5PSR7IG1hcE9yZGVyQnkoIG9yZGVyQnkgKSB9YCApO1xuXHRcdH1cblx0fVxuXHRsZXQgcXVlcnlTdHJpbmcgPSBxdWVyeVBhcmFtcy5qb2luKCAnJicgKTtcblx0aWYgKCB3aGVyZSApIHtcblx0XHRxdWVyeVN0cmluZyArPSAnJicgKyB3aGVyZTtcblx0fVxuXHRyZXR1cm4gcXVlcnlTdHJpbmc7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBNT0RFTF9OQU1FID0gJ2NoZWNraW4nO1xuXG5leHBvcnQgY29uc3QgQ0hFQ0tJTl9TVEFUVVNfSUQgPSB7XG5cdFNUQVRVU19DSEVDS0VEX09VVDogZmFsc2UsXG5cdFNUQVRVU19DSEVDS0VEX0lOOiB0cnVlLFxuXHRTVEFUVVNfQ0hFQ0tFRF9ORVZFUjogMixcbn07XG5cbmV4cG9ydCBjb25zdCBDSEVDS0lOX1NUQVRVU19JRFMgPSB2YWx1ZXMoXG5cdENIRUNLSU5fU1RBVFVTX0lEXG4pO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHByZXR0eVN0YXR1cyB9IGZyb20gJy4uL3N0YXR1cyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxufSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCAqIGFzIGNoZWNraW5TdGF0dXMgZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdGZvckRhdGV0aW1lSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvckV2ZW50SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclJlZ2lzdHJhdGlvbklkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JUaWNrZXRJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yU3RhdHVzSWQ6IFByb3BUeXBlcy5vbmVPZiggY2hlY2tpblN0YXR1cy5DSEVDS0lOX1NUQVRVU19JRFMgKSxcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIFtcblx0XHRcdCdDSEtfSUQnLFxuXHRcdFx0J1JFR19JRCcsXG5cdFx0XHQnQ0hLX3RpbWVzdGFtcCcsXG5cdFx0XHQnRFRUX0lEJyxcblx0XHRdICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0fSApLFxufTtcblxuZXhwb3J0IGNvbnN0IG9wdGlvbnNFbnRpdHlNYXAgPSB7XG5cdGRlZmF1bHQ6ICgpID0+IHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0e1xuXHRcdFx0XHRsYWJlbDogcHJldHR5U3RhdHVzKFxuXHRcdFx0XHRcdGNoZWNraW5TdGF0dXMuQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfT1VUXG5cdFx0XHRcdCksXG5cdFx0XHRcdHZhbHVlOiBjaGVja2luU3RhdHVzLkNIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX09VVCxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmVsOiBwcmV0dHlTdGF0dXMoXG5cdFx0XHRcdFx0Y2hlY2tpblN0YXR1cy5DSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9JTlxuXHRcdFx0XHQpLFxuXHRcdFx0XHR2YWx1ZTogY2hlY2tpblN0YXR1cy5DSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9JTixcblx0XHRcdH0sXG5cdFx0XTtcblx0fSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ0NIS190aW1lc3RhbXAnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9ERVNDLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGEgcmVnaXN0cmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHR0aW1lc3RhbXA6ICdDSEtfdGltZXN0YW1wJyxcblx0XHRpZDogJ0NIS19JRCcsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIHJlZ2lzdHJhdGlvbnMgZW5kcG9pbnQgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JEYXRldGltZUlkICAgIFx0SUQgb2YgRXZlbnQgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICAgIElEIG9mIEF0dGVuZGVlIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yUmVnaXN0cmF0aW9uSWQgSUQgb2YgVHJhbnNhY3Rpb24gdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JUaWNrZXRJZCBcdFx0SUQgb2YgVGlja2V0IHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9yU3RhdHVzSWQgXHRcdElEIG9mIFN0YXR1cyB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICBcdFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICgge1xuXHRmb3JEYXRldGltZUlkID0gMCxcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdGZvclJlZ2lzdHJhdGlvbklkID0gMCxcblx0Zm9yVGlja2V0SWQgPSAwLFxuXHRmb3JTdGF0dXNJZCA9ICcnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0Zm9yRXZlbnRJZCA9IHBhcnNlSW50KCBmb3JFdmVudElkLCAxMCApO1xuXHRpZiAoIGZvckV2ZW50SWQgIT09IDAgJiYgISBpc05hTiggZm9yRXZlbnRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtSZWdpc3RyYXRpb24uRVZUX0lEXT0nICsgZm9yRXZlbnRJZCApO1xuXHR9XG5cdGZvckRhdGV0aW1lSWQgPSBwYXJzZUludCggZm9yRGF0ZXRpbWVJZCwgMTAgKTtcblx0aWYgKCBmb3JEYXRldGltZUlkICE9PSAwICYmICEgaXNOYU4oIGZvckRhdGV0aW1lSWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbRFRUX0lEXT0nICsgZm9yRGF0ZXRpbWVJZCApO1xuXHR9XG5cdGZvclJlZ2lzdHJhdGlvbklkID0gcGFyc2VJbnQoIGZvclJlZ2lzdHJhdGlvbklkLCAxMCApO1xuXHRpZiAoIGZvclJlZ2lzdHJhdGlvbklkICE9PSAwICYmICEgaXNOYU4oIGZvclJlZ2lzdHJhdGlvbklkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1JFR19JRF09JyArIGZvclJlZ2lzdHJhdGlvbklkICk7XG5cdH1cblx0Zm9yVGlja2V0SWQgPSBwYXJzZUludCggZm9yVGlja2V0SWQsIDEwICk7XG5cdGlmICggZm9yVGlja2V0SWQgIT09IDAgJiYgISBpc05hTiggZm9yVGlja2V0SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbUmVnaXN0cmF0aW9uLlRLVF9JRF09JyArIGZvclRpY2tldElkICk7XG5cdH1cblx0aWYgKCBmb3JTdGF0dXNJZCAhPT0gJycgJiYgZm9yU3RhdHVzSWQgIT09IG51bGwgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0NIS19pbl09JyArIGZvclN0YXR1c0lkICk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCJpbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdkYXRldGltZSc7XG5cbmV4cG9ydCBjb25zdCBEQVRFVElNRV9TVEFUVVNfSUQgPSB7XG5cdEFDVElWRTogJ0RUQScsXG5cdENBTkNFTExFRDogJ0RUQycsXG5cdEVYUElSRUQ6ICdEVEUnLFxuXHRJTkFDVElWRTogJ0RUSScsXG5cdFBPU1RQT05FRDogJ0RUUCcsXG5cdFNPTERfT1VUOiAnRFRTJyxcblx0VFJBU0hFRDogJ0RUVCcsXG5cdFVQQ09NSU5HOiAnRFRVJyxcbn07XG5cbmV4cG9ydCBjb25zdCBEQVRFVElNRV9TVEFUVVNfSURTID0gdmFsdWVzKCBEQVRFVElNRV9TVEFUVVNfSUQgKTtcblxuZXhwb3J0IGNvbnN0IE1JTlVURV9JTl9TRUNPTkRTID0gNjA7XG5leHBvcnQgY29uc3QgSE9VUl9JTl9TRUNPTkRTID0gTUlOVVRFX0lOX1NFQ09ORFMgKiA2MDtcbmV4cG9ydCBjb25zdCBEQVlfSU5fU0VDT05EUyA9IEhPVVJfSU5fU0VDT05EUyAqIDI0O1xuZXhwb3J0IGNvbnN0IFdFRUtfSU5fU0VDT05EUyA9IEhPVVJfSU5fU0VDT05EUyAqIDc7XG5leHBvcnQgY29uc3QgTU9OVEhfSU5fU0VDT05EUyA9IERBWV9JTl9TRUNPTkRTICogMzA7XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgYmFzZUZvcm1hdHRlciBmcm9tICcuLi9iYXNlLWRhdGUtZm9ybWF0dGVyJztcblxuLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGZvck93biwgcHVsbEF0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7XG5cdFRJTUVfRk9STUFUX1NJVEUsXG5cdERBVEVfVElNRV9GT1JNQVRfU0lURSxcblx0YWxsRGF0ZVRpbWVzQXNTdHJpbmcsXG5cdFNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby9oZWxwZXJzJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogQXJyYXkgb2YgZmllbGRzIHRoYXQgaGF2ZSBkYXRlIGluZm9ybWF0aW9uXG4gKiBAdHlwZSB7IHN0cmluZ1tdIH1cbiAqL1xuZXhwb3J0IGNvbnN0IERBVEVfRklFTERTID0gW1xuXHQnRFRUX0VWVF9zdGFydCcsXG5cdCdEVFRfRVZUX2VuZCcsXG5dO1xuXG4vKipcbiAqIFdpbGwgaG9sZCB0aGUgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGxpc3Qgb2YgZm9ybWF0dGVycyBmb3IgZGF0ZXMuICBGb3JtYXR0ZXJzXG4gKiBhcmUgZnVuY3Rpb25zIGRlZmluZWQgaW4gYC4uL2Jhc2UtZGF0ZS1mb3JtYXR0ZXJgIGJ1dCB3cmFwcGVkIGJ5IGR5bmFtaWNhbGx5XG4gKiBnZW5lcmF0ZWQgZnVuY3Rpb25zIChjYWxsYWJsZSB2aWEgc2FtZSBuYW1lKSB0aGF0IGF1dG9tYXRpY2FsbHkgcmVjZWl2ZSB0aGVcbiAqIGNvcnJlY3QgZGF0ZUZpZWxkc01hcCBhcmd1bWVudC5cbiAqXG4gKiBFZy4gIGAuLi9iYXNlLWRhdGUtZm9ybWF0dGVyIGhhc1xuICogZm9ybWF0RGF0ZXNPbkVudGl0aWVzKCBlbnRpdGllcywgZW50aXR5RGF0ZUZpZWxkcywgZm9ybWF0LCBsb2NhbCApO1xuICogV2hlbiBpbXBvcnRpbmcgYGZvcm1hdERhdGVzT25FbnRpdGllc2AgZnJvbSB0aGlzIGZpbGUsIHlvdSBjYW4gY2FsbCBpdCBzaW1wbHlcbiAqIGJ5IGRvaW5nIHRoaXM6XG4gKlxuICogZm9ybWF0RGF0ZXNPbkVudGl0aWVzKCBkYXRlVGltZU9iamVjdHMsIGZvcm1hdCwgbG9jYWwgKTtcbiAqXG4gKiBOb3RpY2UgdGhhdCBpdCdzIGNhbGxlZCB3aXRob3V0IHRoZSBlbnRpdHlEYXRlRmllbGRzIGFyZ3VtZW50IGJlY2F1c2UgdGhhdCdzXG4gKiBwcm92aWRlZCBieSB0aGlzIGdlbmVyYXRvci5cbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IGZvcm1hdHRlcnMgPSB7fTtcblxuZm9yT3duKCBiYXNlRm9ybWF0dGVyLCAoIGltcGxlbWVudGF0aW9uLCBmdW5jdGlvbk5hbWUgKSA9PiB7XG5cdGZvcm1hdHRlcnNbIGZ1bmN0aW9uTmFtZSBdID0gKCAuLi5pbmNvbWluZ0FyZ3MgKSA9PiB7XG5cdFx0Y29uc3QgZmlyc3RBcmcgPSBwdWxsQXQoIGluY29taW5nQXJncywgMCApO1xuXHRcdHJldHVybiBpbXBsZW1lbnRhdGlvbiggZmlyc3RBcmdbIDAgXSwgREFURV9GSUVMRFMsIC4uLmluY29taW5nQXJncyApO1xuXHR9O1xufSApO1xuXG4vKipcbiAqIFRoaXMgd2lsbCBzcGl0IG91dCBhIHByZXR0aWZpZWQgbGFiZWwgZm9yIHRoZSBwcm92aWRlZCBEYXRlVGltZSBlbnRpdHkuXG4gKlxuICogSWYgdGhlcmUgaXMgYSBEVFRfbmFtZSwgdGhlIGZvcm1hdCB3aWxsIGJlOlxuICogYERUVF9uYW1lIChEVFRfRVZUX3N0YXJ0IC0gRFRUX0VWVF9lbmQpYFxuICpcbiAqIElmIG5vIERUVF9uYW1lIHRoZW46XG4gKiBgRFRUX0VWVF9zdGFydCAtIERUVF9FVlRfZW5kYFxuICpcbiAqIFRoaXMgd2lsbCBhY2NvdW50IGZvciBpZiBib3RoIHN0YXJ0IGFuZCBlbmQgYXJlIGluIHRoZSBzYW1lIGRheSBhbmQgc2ltcGx5XG4gKiB1c2UgdGltZSBmb3IgdGhlIGVuZCBwYXJ0LlxuICpcbiAqIEBwYXJhbSB7IEJhc2VFbnRpdHkgfSBEYXRlVGltZUVudGl0eVxuICogQHJldHVybiB7IHN0cmluZyB9ICBBIGZvcm1hdHRlZCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBwcm92aWRlZFxuICogICAgRGF0ZVRpbWVFbnRpdHkuXG4gKi9cbmV4cG9ydCBjb25zdCBwcmV0dHlEYXRlRnJvbURhdGVUaW1lID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcblx0bGV0IGNvbnRlbnQgPSAnJztcblx0aWYgKCBpc01vZGVsRW50aXR5T2ZNb2RlbCggRGF0ZVRpbWVFbnRpdHksICdkYXRldGltZScgKSApIHtcblx0XHRpZiAoIERhdGVUaW1lRW50aXR5LkRUVF9FVlRfc3RhcnQuaGFzU2FtZShcblx0XHRcdERhdGVUaW1lRW50aXR5LkRUVF9FVlRfZW5kLFxuXHRcdFx0J2RheSdcblx0XHQpICkge1xuXHRcdFx0Y29udGVudCArPSBhbGxEYXRlVGltZXNBc1N0cmluZyhcblx0XHRcdFx0U0VQQVJBVE9SX1NQQUNFX0RBU0hfU1BBQ0UsXG5cdFx0XHRcdERhdGVUaW1lRW50aXR5LkRUVF9FVlRfc3RhcnQudG9Gb3JtYXQoXG5cdFx0XHRcdFx0REFURV9USU1FX0ZPUk1BVF9TSVRFXG5cdFx0XHRcdCksXG5cdFx0XHRcdERhdGVUaW1lRW50aXR5LkRUVF9FVlRfZW5kLnRvRm9ybWF0KFxuXHRcdFx0XHRcdFRJTUVfRk9STUFUX1NJVEVcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRlbnQgKz0gYWxsRGF0ZVRpbWVzQXNTdHJpbmcoXG5cdFx0XHRcdFNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFLFxuXHRcdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX3N0YXJ0LnRvRm9ybWF0KFxuXHRcdFx0XHRcdERBVEVfVElNRV9GT1JNQVRfU0lURVxuXHRcdFx0XHQpLFxuXHRcdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX2VuZC50b0Zvcm1hdChcblx0XHRcdFx0XHREQVRFX1RJTUVfRk9STUFUX1NJVEVcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGNvbnRlbnQgPSBEYXRlVGltZUVudGl0eS5EVFRfbmFtZSA/XG5cdFx0XHRgJHsgRGF0ZVRpbWVFbnRpdHkuRFRUX25hbWUgfSAoJHsgY29udGVudCB9KWAgOlxuXHRcdFx0Y29udGVudDtcblx0fVxuXHRyZXR1cm4gY29udGVudDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1hdHRlcnM7XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbmV4cG9ydCAqIGZyb20gJy4vZm9ybWF0dGVyJztcbmV4cG9ydCAqIGZyb20gJy4vc3RhdHVzLWhlbHBlcic7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcblx0R1JFQVRFUl9USEFOLFxuXHRHUkVBVEVSX1RIQU5fQU5EX0VRVUFMLFxuXHRMRVNTX1RIQU5fQU5EX0VRVUFMLFxufSBmcm9tICcuLi9iYXNlJztcblxuZXhwb3J0IGNvbnN0IG5vd0RhdGVBbmRUaW1lID0gbW9tZW50KCk7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIFtcblx0XHRcdCdEVFRfbmFtZScsXG5cdFx0XHQnRFRUX0lEJyxcblx0XHRcdCdzdGFydF9kYXRlJyxcblx0XHRcdCdlbmRfZGF0ZScsXG5cdFx0XSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdFx0c2hvd0V4cGlyZWQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdG1vbnRoOiBQcm9wVHlwZXMubW9udGgsXG5cdH0gKSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHRcdHNob3dFeHBpcmVkOiBib29sZWFuXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdzdGFydF9kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0XHRzaG93RXhwaXJlZDogZmFsc2UsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXJ0X2RhdGU6ICdEVFRfRVZUX3N0YXJ0Jyxcblx0XHRlbmRfZGF0ZTogJ0RUVF9FVlRfZW5kJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gZXZlbnRzIGVuZHBvaW50IHJlcXVlc3QgdXNpbmcgcHJvdmlkZWRcbiAqIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICBJRCBmb3IgRXZlbnQgdG8gcmV0cmlldmUgZGF0ZXRpbWVzIGZyb21cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0V4cGlyZWQgIFdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgZXhwaXJlZCBldmVudHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9udGggICAgICAgICBSZXR1cm4gZXZlbnRzIGZvciB0aGUgZ2l2ZW4gbW9udGguICBDYW4gYmUgYW55XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIGFueSBtb250aCBmb3JtYXQgcmVjb2duaXplZCBieSBtb21lbnQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgIFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICgge1xuXHRmb3JFdmVudElkID0gMCxcblx0c2hvd0V4cGlyZWQgPSBmYWxzZSxcblx0bW9udGggPSAnbm9uZScsXG59ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXHRpZiAoICEgc2hvd0V4cGlyZWQgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEVFRfRVZUX2VuZCoqZXhwaXJlZF1bXT0nICsgR1JFQVRFUl9USEFOICtcblx0XHRcdCcmd2hlcmVbRFRUX0VWVF9lbmQqKmV4cGlyZWRdW109JyArXG5cdFx0XHRub3dEYXRlQW5kVGltZS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRpZiAoIG1vbnRoICYmIG1vbnRoICE9PSAnbm9uZScgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEVFRfRVZUX3N0YXJ0XVtdPScgKyBHUkVBVEVSX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbRFRUX0VWVF9zdGFydF1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLnN0YXJ0T2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RUVF9FVlRfZW5kXVtdPScgKyBMRVNTX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbRFRUX0VWVF9lbmRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5lbmRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmICggcGFyc2VJbnQoIGZvckV2ZW50SWQsIDEwICkgIT09IDAgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0V2ZW50LkVWVF9JRF09JyArIGZvckV2ZW50SWQgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgcGFyc2VJbmZpbml0eSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IERBVEVUSU1FX1NUQVRVU19JRCwgTU9ERUxfTkFNRSwgTU9OVEhfSU5fU0VDT05EUyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAqL1xuY29uc3QgYXNzZXJ0RGF0ZVRpbWVFbnRpdHkgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuXHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIERhdGVUaW1lRW50aXR5LCBNT0RFTF9OQU1FICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdCdUaGUgcHJvdmlkZWQgZW50aXR5IGlzIG5vdCBhIGRhdGV0aW1lIGluc3RhbmNlJ1xuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVUcmFzaGVkIGlmIHRydWUgd2lsbCBub3QgZmlsdGVyIG91dCB0cmFzaGVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGV2ZW50IGRhdGUgaXMgdmFsaWQgZW50aXR5IG9yIGFyY2hpdmVcbiAqL1xuY29uc3QgaXNWYWxpZEVudGl0eU9yQXJjaGl2ZSA9ICggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkICkgPT4ge1xuXHRyZXR1cm4gKCBpbmNsdWRlVHJhc2hlZCAmJiBhc3NlcnREYXRlVGltZUVudGl0eSggRGF0ZVRpbWVFbnRpdHkgKSApIHx8XG4gICAgICAgICggISBpbmNsdWRlVHJhc2hlZCAmJiAhIGlzVHJhc2hlZCggRGF0ZVRpbWVFbnRpdHkgKSApO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZVRyYXNoZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IHRyYXNoZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZXZlbnQgZGF0ZSBpcyBvY2N1cnJpbmcgTk9XXG4gKi9cbmV4cG9ydCBjb25zdCBpc0FjdGl2ZSA9ICggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgKSAmJlxuXHREYXRlVGltZUVudGl0eS5zdGFydC5kaWZmTm93KCkuYXNTZWNvbmRzKCkgPCAwICYmXG5cdERhdGVUaW1lRW50aXR5LmVuZC5kaWZmTm93KCkuYXNTZWNvbmRzKCkgPiAwO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZVRyYXNoZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IHRyYXNoZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZW5kIGRhdGUgaXMgaW4gdGhlIHBhc3RcbiAqL1xuZXhwb3J0IGNvbnN0IGlzRXhwaXJlZCA9ICggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgKSAmJlxuXHREYXRlVGltZUVudGl0eS5lbmQuZGlmZk5vdygpLmFzU2Vjb25kcygpIDwgMDtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVUcmFzaGVkIGlmIHRydWUgd2lsbCBub3QgZmlsdGVyIG91dCB0cmFzaGVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGVuZCBkYXRlIGlzIGluIHRoZSBwYXN0XG4gKi9cbmV4cG9ydCBjb25zdCBpc1JlY2VudGx5RXhwaXJlZCA9ICggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgKSAmJlxuXHREYXRlVGltZUVudGl0eS5lbmQuZGlmZk5vdygpLmFzU2Vjb25kcygpIDwgMCAmJlxuXHREYXRlVGltZUVudGl0eS5lbmQuZGlmZk5vdygpLmFzU2Vjb25kcygpID4gKCBNT05USF9JTl9TRUNPTkRTICogLTEgKTtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVUcmFzaGVkIGlmIHRydWUgd2lsbCBub3QgZmlsdGVyIG91dCB0cmFzaGVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRpY2tldHMgc29sZCBtZWV0cyBvciBleGNlZWRzIHJlZ2lzdHJhdGlvbiBsaW1pdFxuICovXG5leHBvcnQgY29uc3QgaXNTb2xkT3V0ID0gKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgPSBmYWxzZSApID0+IHtcblx0aWYgKFxuXHRcdCggaW5jbHVkZVRyYXNoZWQgJiYgISBhc3NlcnREYXRlVGltZUVudGl0eSggRGF0ZVRpbWVFbnRpdHkgKSApIHx8XG5cdFx0KCAhIGluY2x1ZGVUcmFzaGVkICYmIGlzVHJhc2hlZCggRGF0ZVRpbWVFbnRpdHkgKSApXG5cdCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRsZXQgY2FwID0gRGF0ZVRpbWVFbnRpdHkucmVnTGltaXQ7XG5cdGNhcCA9IHBhcnNlSW5maW5pdHkoIGNhcCwgdHJ1ZSApO1xuXHRyZXR1cm4gY2FwICE9PSBJbmZpbml0eSAmJiBEYXRlVGltZUVudGl0eS5zb2xkID49IGNhcDtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVUcmFzaGVkIGlmIHRydWUgd2lsbCBub3QgZmlsdGVyIG91dCB0cmFzaGVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHN0YXJ0IGRhdGUgaXMgaW4gdGhlIGZ1dHVyZVxuICovXG5leHBvcnQgY29uc3QgaXNVcGNvbWluZyA9ICggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgKSAmJlxuXHREYXRlVGltZUVudGl0eS5zdGFydC5kaWZmTm93KCkuYXNTZWNvbmRzKCkgPiAwO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZGF0ZSBpcyBhcmNoaXZlZFxuICovXG5leHBvcnQgY29uc3QgaXNUcmFzaGVkID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcblx0YXNzZXJ0RGF0ZVRpbWVFbnRpdHkoIERhdGVUaW1lRW50aXR5ICk7XG5cdHJldHVybiBEYXRlVGltZUVudGl0eS5kZWxldGVkO1xufTtcblxuLy8gUExaIE5PVEU6XG4vLyBsZWF2aW5nIHRoZSBmb2xsb3dpbmcgY29kZSBpbiBiZWNhdXNlIGl0IGNhbiBiZSB1c2VkIGlmL3doZW4gd2UgZGVjaWRlXG4vLyB0byBmdWxseSBzdXBwb3J0IHRoZXNlIGRhdGV0aW1lIHN0YXR1c2VzIHdoaWNoIGFyZSBjdXJyZW50bHkgZGVmaW5lZFxuLy8gb24gdGhlIEVFX0RhdGV0aW1lIG1vZGVsIG9iamVjdCBjbGFzcyBidXQgbm90IHlldCB1c2VkXG5cbi8vIC8qKlxuLy8gICogQGZ1bmN0aW9uXG4vLyAgKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4vLyAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGRhdGUgaXMgY2FuY2VsbGVkXG4vLyAgKi9cbi8vIGV4cG9ydCBjb25zdCBpc0NhbmNlbGxlZCA9ICggRGF0ZVRpbWVFbnRpdHkgKSA9PiB7XG4vLyBcdGFzc2VydERhdGVUaW1lRW50aXR5KCBEYXRlVGltZUVudGl0eSApO1xuLy8gXHRyZXR1cm4gRGF0ZVRpbWVFbnRpdHkuY2FuY2VsbGVkO1xuLy8gfTtcbi8vXG4vLyAvKipcbi8vICAqIEBmdW5jdGlvblxuLy8gICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuLy8gICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBkYXRlIGhhcyBiZWVuIHBvc3Rwb25lZFxuLy8gICovXG4vLyBleHBvcnQgY29uc3QgaXNQb3N0cG9uZWQgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuLy8gXHRhc3NlcnREYXRlVGltZUVudGl0eSggRGF0ZVRpbWVFbnRpdHkgKTtcbi8vIFx0cmV0dXJuIERhdGVUaW1lRW50aXR5LnBvc3Rwb25lZDtcbi8vIH07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9IHN0YXR1cyBJRFxuICovXG5leHBvcnQgY29uc3Qgc3RhdHVzID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcblx0aWYgKCBpc1RyYXNoZWQoIERhdGVUaW1lRW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIERBVEVUSU1FX1NUQVRVU19JRC5UUkFTSEVEO1xuXHR9XG5cdGlmICggaXNFeHBpcmVkKCBEYXRlVGltZUVudGl0eSApICkge1xuXHRcdHJldHVybiBEQVRFVElNRV9TVEFUVVNfSUQuRVhQSVJFRDtcblx0fVxuXHRpZiAoIGlzU29sZE91dCggRGF0ZVRpbWVFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gREFURVRJTUVfU1RBVFVTX0lELlNPTERfT1VUO1xuXHR9XG5cdGlmICggaXNVcGNvbWluZyggRGF0ZVRpbWVFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gREFURVRJTUVfU1RBVFVTX0lELlVQQ09NSU5HO1xuXHR9XG5cdGlmICggaXNBY3RpdmUoIERhdGVUaW1lRW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIERBVEVUSU1FX1NUQVRVU19JRC5BQ1RJVkU7XG5cdH1cblx0Ly8gUExaIFNFRSBOT1RFIEFCT1ZFXG5cdC8vIGlmICggaXNDYW5jZWxsZWQoIERhdGVUaW1lRW50aXR5ICkgKSB7XG5cdC8vIFx0cmV0dXJuIERBVEVUSU1FX1NUQVRVU19JRC5DQU5DRUxMRUQ7XG5cdC8vIH1cblx0Ly8gaWYgKCBpc1Bvc3Rwb25lZCggRGF0ZVRpbWVFbnRpdHkgKSApIHtcblx0Ly8gXHRyZXR1cm4gREFURVRJTUVfU1RBVFVTX0lELlBPU1RQT05FRDtcblx0Ly8gfVxuXHRhc3NlcnREYXRlVGltZUVudGl0eSggRGF0ZVRpbWVFbnRpdHkgKTtcblx0cmV0dXJuIERBVEVUSU1FX1NUQVRVU19JRC5JTkFDVElWRTtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgIENTUyBjbGFzcyBmb3IgdGhlIGJhY2tncm91bmQgY29sb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEJhY2tncm91bmRDb2xvckNsYXNzID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcblx0cmV0dXJuIGBlZS1zdGF0dXMtYmFja2dyb3VuZC1jb2xvci0keyBzdGF0dXMoIERhdGVUaW1lRW50aXR5ICkgfWA7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuICogQHJldHVybiB7c3RyaW5nfSBkYXRlIHN0YXR1c1xuICovXG5leHBvcnQgY29uc3QgZ2V0RGF0ZVRpbWVTdGF0dXNUZXh0TGFiZWwgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuXHRsZXQgZGF0ZVN0YXR1cyA9ICcnO1xuXHRzd2l0Y2ggKCBzdGF0dXMoIERhdGVUaW1lRW50aXR5ICkgKSB7XG5cdFx0Y2FzZSBEQVRFVElNRV9TVEFUVVNfSUQuU09MRF9PVVQgOlxuXHRcdFx0ZGF0ZVN0YXR1cyA9IF9fKCAnc29sZCBvdXQnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5FWFBJUkVEIDpcblx0XHRcdGRhdGVTdGF0dXMgPSBfXyggJ2V4cGlyZWQnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5VUENPTUlORyA6XG5cdFx0XHRkYXRlU3RhdHVzID0gX18oICd1cGNvbWluZycsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgREFURVRJTUVfU1RBVFVTX0lELkFDVElWRSA6XG5cdFx0XHRkYXRlU3RhdHVzID0gX18oICdhY3RpdmUnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5UUkFTSEVEIDpcblx0XHRcdGRhdGVTdGF0dXMgPSBfXyggJ2FyY2hpdmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBEQVRFVElNRV9TVEFUVVNfSUQuQ0FOQ0VMTEVEIDpcblx0XHRcdGRhdGVTdGF0dXMgPSBfXyggJ2NhbmNlbGxlZCcsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgREFURVRJTUVfU1RBVFVTX0lELlBPU1RQT05FRCA6XG5cdFx0XHRkYXRlU3RhdHVzID0gX18oICdwb3N0cG9uZWQnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5JTkFDVElWRSA6XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGRhdGVTdGF0dXMgPSBfXyggJ2luYWN0aXZlJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdH1cblx0cmV0dXJuIGRhdGVTdGF0dXM7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgbWFwVmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ21lbWl6ZSc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGVuZHBvaW50cyB9IGZyb20gJy4vZW5kcG9pbnRzLmpzJztcblxuLyoqXG4gKiBSZWNlaXZlcyBhbiBvYmplY3QgbWFwIG9mIG1vZGVsTmFtZSB0byBlbmRwb2ludCBhbmQgbWFwcyB0aGF0IHRvIGEgZGVmYXVsdFxuICogbWFwIG9mIG1vZGVsTmFtZSB0byBlbXB0eSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gbW9kZWxOYW1lRW5kcG9pbnRzXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gQW4gb2JqZWN0IG9mIHsgeyBtb2RlbE5hbWUgfSA6IHt9IH1cbiAqL1xuY29uc3QgbWFwVG9PYmplY3RWYWx1ZXMgPSAoIG1vZGVsTmFtZUVuZHBvaW50cyApID0+IHtcblx0cmV0dXJuIG1hcFZhbHVlcyggbW9kZWxOYW1lRW5kcG9pbnRzLFxuXHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH0sXG5cdCk7XG59O1xuXG5jb25zdCBnZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCA9IG1lbW9pemUoXG5cdCgpID0+IG1hcFRvT2JqZWN0VmFsdWVzKCBlbmRwb2ludHMgKVxuKTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBzdGF0ZSB0byBiZSB1c2VkIGJ5IHN0b3JlcyBjb250YWluaW5nIGxpc3RzLlxuICpcbiAqIEB0eXBlIHsgT2JqZWN0IH1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTElTVFNfU1RBVEUgPSBtYXBUb09iamVjdFZhbHVlcyggZW5kcG9pbnRzICk7XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIGRlZmF1bHQgc3RhdGUgdG8gYmUgdXNlZCBieSB0aGUgY29yZSBzdG9yZS5cbiAqXG4gKiBAdHlwZSB7e2VudGl0aWVzOiB7fSwgZW50aXR5SWRzOiB7fSwgZGlydHk6IHt9fX1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09SRV9TVEFURSA9IHtcblx0ZW50aXRpZXM6IHtcblx0XHQuLi5nZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCgpLFxuXHR9LFxuXHRyZWxhdGlvbnM6IHt9LFxuXHRkaXJ0eToge1xuXHRcdHJlbGF0aW9uczoge1xuXHRcdFx0aW5kZXg6IHt9LFxuXHRcdFx0ZGVsZXRlOiB7fSxcblx0XHRcdGFkZDoge30sXG5cdFx0fSxcblx0XHR0cmFzaDoge30sXG5cdFx0ZGVsZXRlOiB7fSxcblx0fSxcbn07XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIGRlZmF1bHQgc3RhdGUgdG8gYmUgdXNlZCBieSB0aGUgc2NoZW1hIHN0b3JlLlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0NIRU1BX1NUQVRFID0ge1xuXHRzY2hlbWE6IHtcblx0XHQuLi5nZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCgpLFxuXHR9LFxuXHRmYWN0b3J5OiB7XG5cdFx0Li4uZ2V0RGVmYXVsdE1vZGVsRW50aXRpZXNPYmplY3QoKSxcblx0fSxcblx0cmVsYXRpb25FbmRwb2ludHM6IHtcblx0XHQuLi5nZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCgpLFxuXHR9LFxuXHRyZWxhdGlvblNjaGVtYToge30sXG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGRhdGEgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGFzc2VydEVudGl0eUhhc0tleSB9IGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5cbi8qKlxuICogQWxsIGF2YWlsYWJsZSBlbmRwb2ludHMgZXhwb3NlZCB2aWEgdGhlIGVlanMuZGF0YSBnbG9iYWwgZnJvbSB0aGUgc2VydmVyLlxuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0IGNvbnN0IHtcblx0Y29sbGVjdGlvbl9lbmRwb2ludHM6IGVuZHBvaW50cyA9IHt9LFxuXHRiYXNlX3Jlc3Rfcm91dGU6IGJhc2VSZXN0Um91dGUsXG59ID0gZGF0YS5wYXRocztcblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGVuZHBvaW50IGZvciB0aGUgcHJvdmlkZWQgbW9kZWwuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgV2hhdCBtb2RlbCB0byByZXRyaWV2ZSB0aGUgZW5kcG9pbnQgZm9yLlxuICogQHJldHVybiB7c3RyaW5nfSAgVGhlIGVuZHBvaW50IGZvciB0aGUgcHJvdmlkZWQgbW9kZWwuXG4gKiBAdGhyb3dzIHtFeGNlcHRpb259XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRFbmRwb2ludCA9ICggbW9kZWxOYW1lICkgPT4ge1xuXHRhc3NlcnRFbnRpdHlIYXNLZXkoIG1vZGVsTmFtZSwgZW5kcG9pbnRzICk7XG5cdHJldHVybiBlbmRwb2ludHNbIG1vZGVsTmFtZSBdO1xufTtcblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBwcm92aWRlZCBxdWVyeVN0cmluZyB0byB0aGUgZW5kcG9pbnQgZm9yIHRoZSBwcm92aWRlZCBtb2RlbCBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgV2hhdCBtb2RlbCB0aGUgZmluYWwgc3RyaW5nIGlzIGZvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVN0cmluZyAgVGhlIHF1ZXJ5IGJlaW5nIGFwcGVuZGVkIHRvIHRoZSBlbmRwb2ludC5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGZpbmFsIGFzc2VtYmxlZCBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBhcHBseVF1ZXJ5U3RyaW5nID0gKCBtb2RlbE5hbWUsIHF1ZXJ5U3RyaW5nID0gJycgKSA9PiB7XG5cdHJldHVybiBxdWVyeVN0cmluZyAhPT0gJycgP1xuXHRcdGdldEVuZHBvaW50KCBtb2RlbE5hbWUgKSArICc/JyArIHF1ZXJ5U3RyaW5nIDpcblx0XHRnZXRFbmRwb2ludCggbW9kZWxOYW1lICk7XG59O1xuXG4vKipcbiAqIFN0cmlwcyB0aGUgYmFzZV9yZXN0X3JvdXRlIChpLmUuIGh0dHBzOi8vbXl1cmwuY29tL3dwLWpzb24vKSBmcm9tIHRoZSBwcm92aWRlZFxuICogdXJsIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSB1cmwgd2l0aCB0aGUgYmFzZSByZXN0IHJvdXRlIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBzdHJpcEJhc2VSb3V0ZUZyb21VcmwgPSAoIHVybCApID0+IHtcblx0cmV0dXJuIHVybC5yZXBsYWNlKCBiYXNlUmVzdFJvdXRlLCAnJyApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBzcHJpbnRmIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBJbnZhbGlkU2NoZW1hIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgeyBpc1NjaGVtYSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHtcblx0TW9uZXksXG5cdFNlcnZlckRhdGVUaW1lIGFzIERhdGVUaW1lLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWx1ZS1vYmplY3RzJztcbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRpc0RhdGVUaW1lRmllbGQsXG5cdGlzTW9uZXlGaWVsZCxcbn0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQge1xuXHRpc1NoYWxsb3dWYWxpZFZhbHVlRm9yRmllbGQsXG5cdHZhbGlkYXRlRW51bVR5cGUsXG5cdHZhbGlkYXRlVHlwZSxcblx0dmFsaWRhdGVUeXBlRm9yRmllbGQsXG59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5pbXBvcnQgeyBtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3RXaXRoQXNzZXJ0aW9ucyB9IGZyb20gJy4vZXh0cmFjdG9ycyc7XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCB2YWx1ZSBpcyBhIGtub3duIHZhbHVlIG9iamVjdC5cbiAqXG4gKiBOb3RlOiB0aGlzIG9ubHkgYXNzZXJ0cyBrbm93biB2YWx1ZSBvYmplY3RzLCBpZiB0aGUgdmFsdWUgaXMgbm90IGRldGVjdGVkIGFzXG4gKiBhIGtub3duIHZhbHVlIG9iamVjdCBpdCBpcyBwYXNzZWQgYmFjayBhcyBpcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEB0aHJvd3MgSW52YWxpZERhdGVUaW1lXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICovXG5leHBvcnQgY29uc3QgbWF5YmVBc3NlcnRWYWx1ZU9iamVjdCA9ICggZmllbGROYW1lLCBmaWVsZFZhbHVlLCBzY2hlbWEgKSA9PiB7XG5cdGlmICggaXNEYXRlVGltZUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApICkge1xuXHRcdERhdGVUaW1lLmFzc2VydElzRGF0ZVRpbWUoIGZpZWxkVmFsdWUgKTtcblx0fVxuXHRpZiAoIGlzTW9uZXlGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHRNb25leS5hc3NlcnRNb25leSggZmllbGRWYWx1ZSApO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgb2JqZWN0IGlzIGEgdmFsaWQgbW9kZWwgc2NoZW1hIG9iamVjdC5cbiAqXG4gKiBDdXJyZW50bHksIGFuIG9iamVjdCBpcyBjb25zaWRlcmVkIGEgdmFsaWQgbW9kZWwgc2NoZW1hIGlmIGl0IGhhcyBhXG4gKiAncHJvcGVydGllcycgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHsqfSBzY2hlbWFcbiAqIEB0aHJvd3MgSW52YWxpZFNjaGVtYVxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0VmFsaWRTY2hlbWEgPSAoIHNjaGVtYSApID0+IHtcblx0aWYgKCAhIGlzU2NoZW1hKCBzY2hlbWEgKSApIHtcblx0XHR0aHJvdyBuZXcgSW52YWxpZFNjaGVtYShcblx0XHRcdCdUaGlzIGlzIGFuIGludmFsaWQgc2NoZW1hIGZvciBhIG1vZGVsLicsXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHRoYXQgdGhlIGdpdmVuIGZpZWxkIGV4aXN0cyBpbiB0aGUgcHJvdmlkZWQgc2NoZW1hIGFuZCB0aGUgc2hhcGUgZm9yXG4gKiB0aGUgc2NoZW1hIGVudHJ5IG9uIHRoYXQgZmllbGQgaXMgZXhwZWN0ZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgVGhlIG1vZGVsIHRoZSBzY2hlbWEgYmVsb25ncyB0bywgdGhpcyBpcyB1c2VkIGZvclxuICogZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lICBUaGUgZmllbGQgYmVpbmcgY2hlY2tlZCBhZ2FpbnN0IHRoZSBzY2hlbWFcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWEgICAgIFRoZSBzY2hlbWEgZm9yIHRoZSBtb2RlbCB1c2VkIGZvciB2YWxpZGF0aW9uXG4gKiBAdGhyb3dzIEludmFsaWRTY2hlbWFcbiAqIEB0aHJvd3MgVHlwZUVycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRWYWxpZFNjaGVtYUZpZWxkUHJvcGVydGllcyA9IChcblx0bW9kZWxOYW1lLFxuXHRmaWVsZE5hbWUsXG5cdHNjaGVtYSxcbikgPT4ge1xuXHRpZiAoIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdHNwcmludGYoXG5cdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlc1wiIGZpZWxkTmFtZSBkb2VzIG5vdCBoYXZlIGEgZGVmaW5lZCBzY2hlbWEgZm9yIHRoZSBtb2RlbCBcIiVzXCInLFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdG1vZGVsTmFtZSxcblx0XHRcdCksXG5cdFx0KTtcblx0fVxuXHRpZiAoIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0aWYgKCBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFNjaGVtYShcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIHNjaGVtYSBmb3IgdGhlIGZpZWxkICVzIG9uIHRoZSBtb2RlbCAlcyBpcyBvZiB0eXBlIFwib2JqZWN0XCIgYnV0IGRvZXMgbm90IGhhdmUgYSBwcm9wZXJ0aWVzIHByb3BlcnR5LicsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdG1vZGVsTmFtZVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3ICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFNjaGVtYShcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIHNjaGVtYSBmb3IgdGhlIGZpZWxkICVzIG9uIHRoZSBtb2RlbCAlcyBpcyBvZiB0eXBlIFwib2JqZWN0XCIgYnV0IGRvZXMgbm90IGhhdmUgYSByYXcgcHJvcGVydHkgaW4gaXRcXCdzIFwicHJvcGVydGllc1wiIHByb3BlcnR5LicsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdG1vZGVsTmFtZVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LnR5cGUgKSApIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkU2NoZW1hKFxuXHRcdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHRcdCdUaGUgc2NoZW1hIGZvciB0aGUgZmllbGQgJXMgb24gdGhlIG1vZGVsICVzIGlzIG9mIHR5cGUgXCJvYmplY3RcIiBhbmQgaGFzIGEgcHJvcGVydGllcy5yYXcgcHJvcGVydHksIGhvd2V2ZXIgdGhlcmUgaXMgbm8gXCJ0eXBlXCIgZGVmaW5lZCBmb3IgdGhlIHJhdyBwcm9wZXJ0eS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRtb2RlbE5hbWVcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgdGhhdCB0aGUgdmFsdWUgcHJvdmlkZWQgZm9yIHRoZSBwcmVwYXJlZCBmaWVsZCBpcyB2YWxpZCBhY2NvcmRpbmcgdG9cbiAqIHRoZSBzY2hlbWEuXG4gKlxuICogUHJlcGFyZWQgZmllbGRzIGFyZTpcbiAqXG4gKiAtIGZpZWxkcyBoYXZpbmcgdmFsdWVzIHRoYXQgYXJlIHNldCBhcyBhIHZhbHVlIG9iamVjdCBhbmQgZXhwZWN0IGEgdmFsdWVcbiAqICAgb2JqZWN0IG9uIHVwZGF0ZXMvaW5zZXJ0cy5cbiAqIC0gZmllbGRzIHRoYXQgYXJlIHRoZSBlcXVpdmFsZW50IGByYXdgIHZhbHVlIHdoZW4gdGhlIGZpZWxkIGluIHRoZSBzY2hlbWEgaXNcbiAqICAgZGVmaW5lZCB0byBoYXZlIHJhdyBhbmQgcmVuZGVyZWQvcHJldHR5IHZhbHVlcy5cbiAqXG4gKiBOb3RlOiAgVGhpcyB2YWxpZGF0ZXMgYWdhaW5zdCBwcmVwYXJlZCBmaWVsZHMgd2hpY2ggbWVhbnMgdGhhdDpcbiAqXG4gKiAtIGlmIHRoZSBwcmVwYXJlZCBmaWVsZCBoYXMgYSB2YWx1ZSBvYmplY3QgYXMgaXRzIHZhbHVlLCB0aGVuIHRoYXQgdmFsdWVcbiAqICAgb2JqZWN0IGlzIHZhbGlkYXRlZCBiZWZvcmUgYW55IG90aGVyIHZhbGlkYXRpb24uXG4gKiAtIGlmIHRoZSBwcmVwYXJlZCBmaWVsZCByZXByZXNlbnRzIGFuIG9iamVjdCBpbiB0aGUgc2NoZW1hLCB0aGVuIGl0cyB2YWx1ZSBpc1xuICogICB2YWxpZGF0ZWQgYWdhaW5zdCB0aGUgYHJhd2AgdHlwZSBpbiB0aGUgc2NoZW1hLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICogQHRocm93cyBJbnZhbGlkRGF0ZVRpbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydFZhbGlkVmFsdWVGb3JQcmVwYXJlZEZpZWxkID0gKFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdGluc3RhbmNlLFxuKSA9PiB7XG5cdGNvbnN0IHsgc2NoZW1hIH0gPSBpbnN0YW5jZTtcblx0bGV0IGlzVmFsaWQgPSBpc1NoYWxsb3dWYWxpZFZhbHVlRm9yRmllbGQoXG5cdFx0ZmllbGROYW1lLFxuXHRcdGZpZWxkVmFsdWUsXG5cdFx0c2NoZW1hLFxuXHQpO1xuXHRpZiAoICEgaXNWYWxpZCAmJiBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUgPT09ICdvYmplY3QnICYmXG5cdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzXG5cdCkge1xuXHRcdGlzVmFsaWQgPSBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LmVudW0gP1xuXHRcdFx0dmFsaWRhdGVFbnVtVHlwZShcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy50eXBlLFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LmVudW0sXG5cdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHQpIDpcblx0XHRcdHZhbGlkYXRlVHlwZShcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy50eXBlLFxuXHRcdFx0XHRtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3RXaXRoQXNzZXJ0aW9ucyhcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRzY2hlbWFcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHRpZiAoICEgaXNWYWxpZCApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBnaXZlbiBcIiUxJHNcIiBmaWVsZCAgaXMgbm90IHZhbGlkIGZvciB0aGUgZGVmaW5lZCBzY2hlbWEuICBJdFxcJ3MgYHJhd2AgcHJvcGVydHkgVmFsdWUgKCUyJHMpIGlzIG5vdCB0aGUgY29ycmVjdCBleHBlY3RlZCB0eXBlICglMyRzKS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcudHlwZSxcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cdGlmICggISBpc1ZhbGlkICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHQnVGhlIGdpdmVuIFwiJTEkc1wiIGZpZWxkXFwncyBWYWx1ZSAoJTIkcykgaXMgbm90IHZhbGlkIGZvciB0aGUgZGVmaW5lZCBzY2hlbWEgdHlwZSAoJTMkcykuJyxcblx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUsXG5cdFx0XHQpLFxuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSB2YWx1ZSBmb3IgdGhlIGdpdmVuIGZpZWxkIGlzIHZhbGlkIGFjY29yZGluZyB0byB0aGVcbiAqIHNjaGVtYS5cbiAqXG4gKiBUaGlzIGlzIHVzZWQgb24gZW50aXR5IGNvbnN0cnVjdGlvbiBhbmQgZG9lcyBub3QgdmFsaWRhdGUgcHJlcGFyZWQgZmllbGRcbiAqIHZhbHVlcyAoc2VlIGFzc2VydCBhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZCkuXG4gKlxuICogVGhpcyBtZXRob2QgYWxzbyBhc3NlcnRzIHRoYXQgdGhlIHNjaGVtYSBoYXMgdmFsaWQgc2NoZW1hIGZpZWxkIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEB0aHJvd3MgVHlwZUVycm9yXG4gKiBAdGhyb3dzIEludmFsaWRTY2hlbWFcbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydFZhbGlkRmllbGRBbmRWYWx1ZUFnYWluc3RTY2hlbWEgPSAoXG5cdG1vZGVsTmFtZSxcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRpbnN0YW5jZSxcbikgPT4ge1xuXHRjb25zdCBzY2hlbWEgPSBpbnN0YW5jZS5zY2hlbWE7XG5cdGNvbnN0IHZhbGlkYXRpb25UeXBlID0gdmFsaWRhdGVUeXBlRm9yRmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2UgKTtcblx0YXNzZXJ0VmFsaWRTY2hlbWFGaWVsZFByb3BlcnRpZXMoIG1vZGVsTmFtZSwgZmllbGROYW1lLCBzY2hlbWEgKTtcblx0bGV0IGlzVmFsaWQgPSBpc1NoYWxsb3dWYWxpZFZhbHVlRm9yRmllbGQoXG5cdFx0ZmllbGROYW1lLFxuXHRcdGZpZWxkVmFsdWUsXG5cdFx0c2NoZW1hLFxuXHRcdGZhbHNlLFxuXHQpO1xuXHQvLyBhY2NvdW50IGZvciBmaWVsZE5hbWUgZmllbGRWYWx1ZXMgdGhhdCBoYXZlIHByb3BlcnR5IHNjaGVtYS4gRm9yIE1vZGVsXG5cdC8vIEVudGl0aWVzLCBvbmx5IHRoZSBWQUxJREFURV9UWVBFIHByb3BlcnR5IGlzIGNhcmVkIGFib3V0LlxuXHRpZiAoIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgJiZcblx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXNcblx0KSB7XG5cdFx0aWYgKCBpc1VuZGVmaW5lZCggZmllbGRWYWx1ZVsgdmFsaWRhdGlvblR5cGUgXSApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIGdpdmVuIFwiJTEkc1wiIHZhbHVlIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hLiBJdCBtdXN0IGJlIGFuIG9iamVjdCBhbmQgaXQgbXVzdCBoYXZlIGEgYCUyJHNgIGtleS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHR2YWxpZGF0aW9uVHlwZSxcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlzVmFsaWQgPSBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXNbIHZhbGlkYXRpb25UeXBlIF0uZW51bSA/XG5cdFx0XHR2YWxpZGF0ZUVudW1UeXBlKFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXNbIHZhbGlkYXRpb25UeXBlIF0udHlwZSxcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy5lbnVtLFxuXHRcdFx0XHRmaWVsZFZhbHVlWyB2YWxpZGF0aW9uVHlwZSBdLFxuXHRcdFx0KSA6XG5cdFx0XHR2YWxpZGF0ZVR5cGUoXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllc1sgdmFsaWRhdGlvblR5cGUgXS50eXBlLFxuXHRcdFx0XHRmaWVsZFZhbHVlWyB2YWxpZGF0aW9uVHlwZSBdXG5cdFx0XHQpO1xuXHRcdGlmICggISBpc1ZhbGlkICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIGdpdmVuIFwiJTEkc1wiIHZhbHVlIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hLiAgSXRcXCdzIGAlMiRzYCBwcm9wZXJ0eSB2YWx1ZSAoJTMkcykgaXMgbm90IHRoZSBjb3JyZWN0IGV4cGVjdGVkIHR5cGUgKCU0JHMpLicsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdHZhbGlkYXRpb25UeXBlLFxuXHRcdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzWyB2YWxpZGF0aW9uVHlwZSBdLnR5cGUsXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXHRpZiAoICEgaXNWYWxpZCApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0c3ByaW50Zihcblx0XHRcdFx0J1RoZSBnaXZlbiBcIiUxJHNcIiBmaWVsZFxcJ3MgdmFsdWUgKCUyJHMpIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hIHR5cGUgKCUzJHMpLicsXG5cdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlLFxuXHRcdFx0KSxcblx0XHQpO1xuXHR9XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzQXJyYXksIHVwcGVyRmlyc3QsIGNhbWVsQ2FzZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdtZW1pemUnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgYXNzZXJ0VmFsaWRTY2hlbWEgfSBmcm9tICcuL2Fzc2VydGlvbnMnO1xuaW1wb3J0IHtcblx0Y3JlYXRlR2V0dGVyLFxuXHRjcmVhdGVFbnRpdHlHZXR0ZXJzQW5kU2V0dGVycyxcblx0Y3JlYXRlUGVyc2lzdGluZ0dldHRlcnNBbmRTZXR0ZXJzLFxuXHRzZXRTYXZlU3RhdGUsXG59IGZyb20gJy4vY3JlYXRlJztcbmltcG9ydCB7XG5cdFNBVkVfU1RBVEUsXG5cdFBSSVZBVEVfUFJPUEVSVElFUyxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEJhc2VFbnRpdHkgaXMgdGhlIGJhc2ljIGNsYXNzIGZvciBhbGwgZW50aXRpZXMuICBjcmVhdGVFbnRpdHlGYWN0b3J5IHJldHVybnNcbiAqIGFuIGluc3RhbmNlIG9mIHRoaXMgYW5kIGFsbCB0aGUgZ2V0dGVycy9zZXR0ZXJzIGZvciBmaWVsZHMgZXRjIGFyZVxuICogZHluYW1pY2FsbHkgY3JlYXRlZCB2aWEgdGhlIGNvbnN0cnVjdG9yLlxuICovXG5leHBvcnQgY2xhc3MgQmFzZUVudGl0eSB7XG5cdFsgUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEUgXSA9IFNBVkVfU1RBVEUuQ0xFQU47XG5cdFsgUFJJVkFURV9QUk9QRVJUSUVTLlZBTElEQVRFX1RZUEVTIF0gPSB7fTtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3IgZm9yIEJhc2UgRW50aXR5XG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcblx0ICogQHBhcmFtIHtPYmplY3R9IGVudGl0eUZpZWxkc0FuZFZhbHVlc1xuXHQgKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG5cdCAqIEBwYXJhbSB7QXJyYXl9ZmllbGRQcmVmaXhlc1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGlzTmV3XG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRtb2RlbE5hbWUsXG5cdFx0ZW50aXR5RmllbGRzQW5kVmFsdWVzLFxuXHRcdHNjaGVtYSxcblx0XHRmaWVsZFByZWZpeGVzID0gW10sXG5cdFx0aXNOZXcgPSBmYWxzZSxcblx0KSB7XG5cdFx0YXNzZXJ0VmFsaWRTY2hlbWEoIHNjaGVtYSApO1xuXHRcdGZpZWxkUHJlZml4ZXMgPSBpc0FycmF5KCBmaWVsZFByZWZpeGVzICkgPyBmaWVsZFByZWZpeGVzIDogW107XG5cdFx0Y3JlYXRlR2V0dGVyKCB0aGlzLCAnZmllbGRQcmVmaXhlcycsIGZpZWxkUHJlZml4ZXMgKTtcblx0XHRjcmVhdGVHZXR0ZXIoIHRoaXMsICdzY2hlbWEnLCBzY2hlbWEucHJvcGVydGllcyApO1xuXHRcdHNldFNhdmVTdGF0ZShcblx0XHRcdHRoaXMsXG5cdFx0XHRpc05ldyA/IFNBVkVfU1RBVEUuTkVXIDogU0FWRV9TVEFURS5DTEVBTlxuXHRcdCk7XG5cdFx0Y3JlYXRlR2V0dGVyKCB0aGlzLCAnbW9kZWxOYW1lJywgbW9kZWxOYW1lICk7XG5cdFx0Y3JlYXRlR2V0dGVyKCB0aGlzLCAnb3JpZ2luYWxGaWVsZHNBbmRWYWx1ZXMnLCBlbnRpdHlGaWVsZHNBbmRWYWx1ZXMgKTtcblx0XHRjcmVhdGVHZXR0ZXIoXG5cdFx0XHR0aGlzLFxuXHRcdFx0J2ZpZWxkc1RvUGVyc2lzdE9uSW5zZXJ0Jyxcblx0XHRcdG5ldyBTZXQoIE9iamVjdC5rZXlzKCBlbnRpdHlGaWVsZHNBbmRWYWx1ZXMgKSApXG5cdFx0KTtcblx0XHRjcmVhdGVFbnRpdHlHZXR0ZXJzQW5kU2V0dGVycyggdGhpcyApO1xuXHRcdGNyZWF0ZVBlcnNpc3RpbmdHZXR0ZXJzQW5kU2V0dGVycyggdGhpcyApO1xuXHRcdE9iamVjdC5zZWFsKCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgY3VycmVudCBzYXZlIHN0YXRlIG9uIHRoZSBlbnRpdHkuXG5cdCAqXG5cdCAqIFNhdmUgc3RhdGUgZGVzY3JpYmVzIHdoZXRoZXIgdGhlIGVudGl0eSBpczpcblx0ICpcblx0ICogLSBTQVZFX1NUQVRFLk5FVzogVGhlIGVudGl0eSBoYXMgbmV2ZXIgYmVlbiBwZXJzaXN0ZWQgdG8gc3RvcmFnZS5cblx0ICogLSBTQVZFX1NUQVRFLkNMRUFOOiBUaGUgZW50aXR5IGV4aXN0cyBpbiBzdG9yYWdlIGFuZCBoYXMgbm90IGJlZW4gbXV0YXRlZC5cblx0ICogLSBTQVZFX1NUQVRFLkRJUlRZOiBUaGUgZW50aXR5IGlzIG11dGF0ZWQgYW5kIGNoYW5nZXMgaGF2ZSBub3QgYmVlblxuXHQgKiBwZXJzaXN0ZWQgdG8gc3RvcmFnZS5cblx0ICpcblx0ICogQHJldHVybiB7c3ltYm9sfSAgUmV0dXJucyB0aGUgY3VycmVudCBzYXZlIHN0YXRlIGZvciB0aGUgZW50aXR5LlxuXHQgKi9cblx0Z2V0IHNhdmVTdGF0ZSgpIHtcblx0XHRyZXR1cm4gdGhpc1sgUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEUgXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IHNhdmUgc3RhdGUgaXMgU0FWRV9TVEFURS5ORVdcblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgU0FWRV9TVEFURS5ORVcgaXMgdGhlIHNhdmUgc3RhdGUuXG5cdCAqL1xuXHRnZXQgaXNOZXcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2F2ZVN0YXRlID09PSBTQVZFX1NUQVRFLk5FVztcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IHNhdmUgc3RhdGUgaXMgU0FWRV9TVEFURS5ESVJUWVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyBTQVZFX1NUQVRFLkRJUlRZIGlzIHRoZSBzYXZlIHN0YXRlLlxuXHQgKi9cblx0Z2V0IGlzRGlydHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2F2ZVN0YXRlID09PSBTQVZFX1NUQVRFLkRJUlRZO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBpcyBTQVZFX1NUQVRFLkNMRUFOXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIFNBVkVfU1RBVEUuQ0xFQU4gaXMgdGhlIHNhdmUgc3RhdGUuXG5cdCAqL1xuXHRnZXQgaXNDbGVhbigpIHtcblx0XHRyZXR1cm4gdGhpcy5zYXZlU3RhdGUgPT09IFNBVkVfU1RBVEUuQ0xFQU47XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgZW50aXR5IGhhcyBhbnkgcGFzc3dvcmQgcHJvdGVjdGVkIGZpZWxkcy5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyBpdCBkb2VzLCBmYWxzZSBtZWFucyBpdCBkb2Vzbid0LlxuXHQgKi9cblx0Z2V0IGlzUGFzc3dvcmRQcm90ZWN0ZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvdGVjdGVkRmllbGRzLmxlbmd0aCA+IDA7XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgZ2l2ZW4gZmllbGROYW1lIGlzIGEgcGFzc3dvcmQgcHJvdGVjdGVkIGZpZWxkLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtmdW5jdGlvbihzdHJpbmcpOiBib29sZWFufSAgUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWRcblx0ICogdG8gY2hlY2sgaWYgdGhlIGdpdmVuIGZpZWxkIG5hbWUgaXMgYSBwcm90ZWN0ZWQgZmllbGQgaW4gdGhpcyBlbnRpdHkuXG5cdCAqL1xuXHRnZXQgaXNGaWVsZFBhc3N3b3JkUHJvdGVjdGVkKCkge1xuXHRcdHJldHVybiAoIGZpZWxkTmFtZSApID0+IHRoaXMucHJvdGVjdGVkRmllbGRzLmluZGV4T2YoIGZpZWxkTmFtZSApID4gLTE7XG5cdH1cblxuXHQvKipcblx0ICogVXNlZCB0byBjbG9uZSB0aGUgY3VycmVudCBlbnRpdHkgb2JqZWN0LiAgVGhpcyByZXN1bHRzIGluIGFuIGluc3RhbmNlIG9mXG5cdCAqIEJhc2VFbnRpdHkgdGhhdCBpcyBlcXVpdmFsZW50IGFzIHRoaXMgY3VycmVudCBpbnN0YW5jZSAoZXhjZXB0IGl0IHdpbGxcblx0ICogaGF2ZSBhIG5ldyBnZW5lcmF0ZWQgaWQpLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn0gY2FsbGJhY2sgdGhhdCByZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIEJhc2VFbnRpdHlcblx0ICovXG5cdGdldCBjbG9uZSgpIHtcblx0XHQvKipcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGtlZXBJZFxuXHRcdCAqIEByZXR1cm4ge0Jhc2VFbnRpdHl9IEEgbmV3IGluc3RhbmNlIG9mIEJhc2VFbnRpdHlcblx0XHQgKi9cblx0XHRyZXR1cm4gKCBrZWVwSWQgPSBmYWxzZSApID0+IHtcblx0XHRcdGNvbnN0IGNyZWF0ZUZhY3RvcnkgPSBtZW1vaXplKCAoKSA9PiBjcmVhdGVFbnRpdHlGYWN0b3J5KFxuXHRcdFx0XHR0aGlzLm1vZGVsTmFtZSxcblx0XHRcdFx0eyAkc2NoZW1hOiB7fSwgcHJvcGVydGllczogdGhpcy5zY2hlbWEgfSxcblx0XHRcdFx0dGhpcy5maWVsZFByZWZpeGVzXG5cdFx0XHQpICk7XG5cdFx0XHRjb25zdCBmYWN0b3J5ID0gY3JlYXRlRmFjdG9yeSgpO1xuXHRcdFx0Y29uc3QgbmV3RW50aXR5ID0gZmFjdG9yeS5jcmVhdGVOZXcoIHRoaXMuZm9yQ2xvbmUgKTtcblx0XHRcdGlmICgga2VlcElkICkge1xuXHRcdFx0XHRuZXdFbnRpdHkuaWQgPSB0aGlzLmlkO1xuXHRcdFx0XHRzZXRTYXZlU3RhdGUoIG5ld0VudGl0eSwgdGhpcy5zYXZlU3RhdGUsIHRydWUgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdFbnRpdHk7XG5cdFx0fTtcblx0fVxuXG5cdHN0YXRpYyBuYW1lID0gJ0Jhc2VFbnRpdHknXG59XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IGdpdmVzIGEgY2xhc3MgdGhlIHByb3ZpZGVkIG5hbWVcbiAqIChhbmQgb3B0aW9uYWxseSBleHRlbmRzIHRoZSBwcm92aWRlZCBvYmplY3QpLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5kZWRDbGFzc1xuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb25cbiAqL1xuY29uc3QgbmFtZUNsYXNzID0gKCBuYW1lLCBleHRlbmRlZENsYXNzICkgPT4ge1xuXHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBleHRlbmRlZENsYXNzIHtcblx0XHRzdGF0aWMgZ2V0IG5hbWUoKSB7XG5cdFx0XHRyZXR1cm4gbmFtZTtcblx0XHR9XG5cdH07XG59O1xuXG4vKipcbiAqIEEgZmFjdG9yeSBmb3IgZW50aXR5IGZhY3Rvcmllcy5cbiAqXG4gKiBDYWxsaW5nIHRoaXMgcmV0dXJucyBhbiBvYmplY3Qgb2YgZmFjdG9yeSBmdW5jdGlvbnMgdGhhdCBpbnN0YW50aWF0ZSBhblxuICogaW5zdGFuY2Ugb2YgYSBuYW1lZCBFbnRpdHkuICBUaGUgbW9kZWxOYW1lIGlzIHVzZWQgYXMgdGhlIG5hbWUgZm9yIHRoZSBuZXdcbiAqIGVudGl0eS5cbiAqXG4gKiBUd28gbWV0aG9kcyBhcmUgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QgcmV0dXJuZWQ6IGBjcmVhdGVOZXdgIGFuZFxuICogYGZyb21FeGlzdGluZ2AuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgVGhlIG1vZGVsIGZvciB0aGUgZW50aXR5XG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hICAgICBUaGUgc2NoZW1hIGZvciB0aGUgbW9kZWwuIFRoaXMgaXMgdGhlIHNjaGVtYVxuICogcHJvdmlkZWQgYnkgdGhlIE9QVElPTlMgZW5kcG9pbnQgZm9yIHRoZSBtb2RlbC5cbiAqIEBwYXJhbSB7QXJyYXl9IGZpZWxkUHJlZml4ZXMgQW4gYXJyYXkgb2YgZmllbGQgcHJlZml4ZXMgZm9yIGJhc2UgZmllbGRzIG9uXG4gKiBvbiB0aGUgbW9kZWwgKGVnLiBFdmVudCBtb2RlbCBoYXMgYFsgRVZUIF1gIHByZWZpeGVzIG9uIGZpZWxkcywgRGF0ZXRpbWUgbW9kZWxcbiAqIGhhcyBbIGBEVFRgLCBgRFRUX0VWVGAgXVxuICogQHJldHVybiB7T2JqZWN0fSBBIGZhY3RvcnkgZm9yIGluc3RhbnRpYXRpbmcgYW4gZW50aXR5IGluc3RhbmNlLlxuICovXG5jb25zdCBjcmVhdGVFbnRpdHlGYWN0b3J5ID0gKCBtb2RlbE5hbWUsIHNjaGVtYSwgZmllbGRQcmVmaXhlcyA9IFtdICkgPT4ge1xuXHRjb25zdCBFbnRpdHkgPSBuYW1lQ2xhc3MoXG5cdFx0dXBwZXJGaXJzdCggY2FtZWxDYXNlKCBtb2RlbE5hbWUgKSApLFxuXHRcdEJhc2VFbnRpdHlcblx0KTtcblx0cmV0dXJuIHtcblx0XHQvKipcblx0XHQgKiBFeHBvc2VzIG1vZGVsTmFtZSBzbyBjbGllbnQgY29kZSBjYW4gZGVyaXZlIHdoYXQgbW9kZWwgdGhpcyBmYWN0b3J5XG5cdFx0ICogaXMgZm9yIGZyb20gYW55IGdpdmVuIGZhY3RvcnkuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdG1vZGVsTmFtZSxcblx0XHQvKipcblx0XHQgKiBUaGlzIGlzIHRoZSBjbGFzcyBkZWZpbml0aW9uIGZvciB0aGUgRW50aXR5LiAgVHlwaWNhbGx5IHRoaXMgaXNcblx0XHQgKiByZXRyaWV2ZWQgZm9yIHRoZSBhYmlsaXR5IHRvIGRvIGluc3RhbmNlb2YgY2hlY2tzLlxuXHRcdCAqL1xuXHRcdGNsYXNzRGVmOiBFbnRpdHksXG5cdFx0LyoqXG5cdFx0ICogVGhpcyByZXR1cm5zIGFuIGluc3RhbmNlIG9mIEVudGl0eSBmb3IgdGhlIGdpdmVuIGFyZ3VtZW50cyB3aXRoIHRoZVxuXHRcdCAqIGluZGljYXRpb24gdGhpcyBpcyBhIG5ldyBub24tcGVyc2lzdGVkIGVudGl0eS4gIFRoaXMgbWVhbnM6XG5cdFx0ICpcblx0XHQgKiAtIEFsbCBmaWVsZCB2YWx1ZXMgYXJlIHBvcHVsYXRlZCBhbmQgYW55IG5vdCBwcm92aWRlZCB3aWxsIGJlXG5cdFx0ICogICBwb3B1bGF0ZWQgd2l0aCBkZWZhdWx0IHZhbHVlcyBkZWZpbmVkIGJ5IHRoZSBzY2hlbWEuXG5cdFx0ICogLSBHZW5lcmF0ZXMgdGVtcG9yYXJ5IHVuaXF1ZSBpZHMgZm9yIHRoZSBwcmltYXJ5IGtleSBmaWVsZHMgb24gdGhlXG5cdFx0ICogICBlbnRpdHkgKHVzaW5nIGN1aWQpLlxuXHRcdCAqIC0gU2V0cyB0aGUgYGlzTmV3YCBmbGFnIHRvIHRydWUgZm9yIHRoZSBlbnRpdHkgc28gY2xpZW50IGNvZGUgaXMgYWJsZVxuXHRcdCAqICAgdG8gZGlzY292ZXIgd2hpY2ggZW50aXRpZXMgaGF2ZSBuZXZlciBiZWVuIHBlcnNpc3RlZC5cblx0XHQgKiAtIFRoaXMgZmFjdG9yeSBtZXRob2QgZXhwZWN0cyBmaWVsZHMgYW5kIHZhbHVlcyB0byBiZSBcInByZXBhcmVkXCIuXG5cdFx0ICogICBXaGF0IHRoYXQgbWVhbnMgaXMgdGhhdCBmb3IgYW55IGZpZWxkcyB0aGF0IHRoZSBzY2hlbWEgZGVzY3JpYmVkIGFzXG5cdFx0ICogICBoYXZpbmcgYSBgcmF3YCBwcm9wZXJ0eSAoaS5lLiB7IEVWVF9kZXNjOiB7IHJhdzogJ3NvbWV0aGluZycgfSB9KVxuXHRcdCAqICAgdGhlIHZhbHVlIHNob3VsZCBiZSBvZiB0aGUgY29ycmVjdCB0eXBlIGZvciB0aGF0IHJhdyBwcm9wZXJ0eSBhbmQuXG5cdFx0ICogICBUaGlzIGFsc28gbWVhbnMgaXMgdGhhdCBmb3IgYW55IGZpZWxkcyB0aGUgc2NoZW1hIGRlc2NyaWJlcyBhcyBhXG5cdFx0ICogICBkYXRlLXRpbWUgKGZvcm1hdCkgb3IgbW9uZXkgKGZvcm1hdCkgZmllbGQsIHRoZSB2YWx1ZSBpcyBleHBlY3RlZFxuXHRcdCAqICAgdG8gYmUgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgb2JqZWN0LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGZpZWxkc0FuZFZhbHVlc1xuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gYW4gaW5zdGFuY2Ugb2YgRW50aXR5XG5cdFx0ICovXG5cdFx0Y3JlYXRlTmV3OiAoIGZpZWxkc0FuZFZhbHVlcyApID0+IG5ldyBFbnRpdHkoXG5cdFx0XHRtb2RlbE5hbWUsXG5cdFx0XHRmaWVsZHNBbmRWYWx1ZXMsXG5cdFx0XHRzY2hlbWEsXG5cdFx0XHRmaWVsZFByZWZpeGVzLFxuXHRcdFx0dHJ1ZVxuXHRcdCksXG5cdFx0LyoqXG5cdFx0ICogVGhpcyByZXR1cm5zIGFuIGluc3RhbmNlIG9mIEVudGl0eSBmb3IgdGhlIGdpdmVuIGFyZ3VtZW50cyB3aXRoIHRoZVxuXHRcdCAqIGluZGljYXRpb24gdGhpcyByZXByZXNlbnRzIHRoZSBlbnRpdHkgYXMgaXMgaW4gdGhlIGRiLiAgVGhpcyBtZWFuczpcblx0XHQgKlxuXHRcdCAqIC0gQWxsIGZpZWxkIHZhbHVlcyBhcmUgTk9UIHBvcHVsYXRlZCBpZiBtaXNzaW5nIHZhbHVlcy4gIFRoaXMgaXNcblx0XHQgKiAgIGVzcGVjaWFsbHkgaW1wb3J0YW50IGZvciBjb250ZXh0cyBsaWtlIHVuYXV0aG9yaXplZCB2aWV3cyB3aGVyZVxuXHRcdCAqICAgb25seSBwYXJ0aWFsIGVudGl0aWVzIGFyZSByZXR1cm5lZCBpbiBSRVNUIHJlc3BvbnNlcy5cblx0XHQgKiAtIGlzTmV3IGZsYWcgaXMgc2V0IHRvIGZhbHNlIChhbmQgbmV2ZXIgY2hhbmdlcyBmb3IgdGhpcyBlbnRpdHkpXG5cdFx0ICogLSBUaGUgaW5jb21pbmcgdmFsdWVzIGFyZSBleHBlY3RlZCB0byBiZSBpbiB0aGUgZXhhY3Qgc2hhcGUgYXNcblx0XHQgKiAgIGRlc2NyaWJlZCBieSB0aGUgc2NoZW1hIGZvciB0aGUgZW50aXR5IG1vZGVsLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGZpZWxkc0FuZFZhbHVlc1xuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gYW4gaW5zdGFuY2Ugb2YgRW50aXR5XG5cdFx0ICovXG5cdFx0ZnJvbUV4aXN0aW5nOiAoIGZpZWxkc0FuZFZhbHVlcyApID0+IG5ldyBFbnRpdHkoXG5cdFx0XHRtb2RlbE5hbWUsXG5cdFx0XHRmaWVsZHNBbmRWYWx1ZXMsXG5cdFx0XHRzY2hlbWEsXG5cdFx0XHRmaWVsZFByZWZpeGVzXG5cdFx0KSxcblx0fTtcbn07XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFbnRpdHlGYWN0b3J5O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzUGxhaW5PYmplY3QsIGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaGFzIGEgXCJyYXdcIiBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdCBhbmQgaGFzIGEgYHJhd2AgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNSYXdQcm9wZXJ0eSA9ICggdmFsdWUgKSA9PiBpc1BsYWluT2JqZWN0KCB2YWx1ZSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHZhbHVlLnJhdyApO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBoYXMgYSBcInByZXR0eVwiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4geyp9IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYSBgcHJldHR5YCBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc1ByZXR0eVByb3BlcnR5ID0gKCB2YWx1ZSApID0+IGlzUGxhaW5PYmplY3QoIHZhbHVlICkgJiZcblx0ISBpc1VuZGVmaW5lZCggdmFsdWUucHJldHR5ICk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBhIFwicmVuZGVyZWRcIiBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdCBhbmQgaGFzIGEgYHJlbmRlcmVkYCBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc1JlbmRlcmVkUHJvcGVydHkgPSAoIHZhbHVlICkgPT4gaXNQbGFpbk9iamVjdCggdmFsdWUgKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCB2YWx1ZS5yZW5kZXJlZCApO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBoYXMgYSBcImZvcm1hdFwiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYSBgZm9ybWF0YCBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0Zvcm1hdFByb3BlcnR5ID0gKCB2YWx1ZSApID0+IGlzUGxhaW5PYmplY3QoIHZhbHVlICkgJiZcblx0ISBpc1VuZGVmaW5lZCggdmFsdWUuZm9ybWF0ICk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBhIFwiZW51bVwiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYW4gZW51bVxuICogcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNFbnVtUHJvcGVydHkgPSAoIHZhbHVlICkgPT4gaXNQbGFpbk9iamVjdCggdmFsdWUgKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCB2YWx1ZS5lbnVtICk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgXCJ2YWx1ZSBvYmplY3RcIiBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgdmFsdWUgb2JqZWN0IGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNWYWx1ZU9iamVjdEZpZWxkID0gKCBmaWVsZCwgc2NoZW1hICkgPT4ge1xuXHRyZXR1cm4gaXNEYXRlVGltZUZpZWxkKCBmaWVsZCwgc2NoZW1hICkgfHwgaXNNb25leUZpZWxkKCBmaWVsZCwgc2NoZW1hICk7XG59O1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCBpcyBhIGRhdGUtdGltZSBmaWVsZCBhY2NvcmRpbmcgdG8gdGhlXG4gKiBwcm92aWRlZCBzY2hlbWEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIGl0IGlzIGEgZGF0ZS10aW1lIGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNEYXRlVGltZUZpZWxkID0gKCBmaWVsZCwgc2NoZW1hICkgPT5cblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZCBdICkgJiZcblx0aGFzRm9ybWF0UHJvcGVydHkoIHNjaGVtYVsgZmllbGQgXSApICYmXG5cdHNjaGVtYVsgZmllbGQgXS5mb3JtYXQgPT09ICdkYXRlLXRpbWUnO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCBpcyBhIFVUQyBkYXRlLXRpbWUgZmllbGQuXG4gKlxuICogSWYgc2NoZW1hIGlzIHByb3ZpZGVkLCB0aGlzIGFsc28gY29uc2lkZXJzIHdoZXRoZXIgdGhpcyBpcyBhIGRhdGUtdGltZSBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRpbWVGaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWEgW29wdGlvbmFsXVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGlzIGlzIGEgVVRDIGZpZWxkLiAgSWYgc2NoZW1hIGlzIHByb3ZpZGVkIGl0XG4gKiBtZWFucyB0aGlzIGlzIGFsc28gYSBkYXRlLXRpbWUgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1VUQ0RhdGVUaW1lRmllbGQgPSAoIGRhdGVUaW1lRmllbGROYW1lLCBzY2hlbWEgPSBudWxsICkgPT4ge1xuXHRyZXR1cm4gc2NoZW1hICE9PSBudWxsID9cblx0XHRpc0RhdGVUaW1lRmllbGQoIGRhdGVUaW1lRmllbGROYW1lLCBzY2hlbWEgKSAmJlxuXHRcdFx0ZGF0ZVRpbWVGaWVsZE5hbWUuaW5kZXhPZiggJ19nbXQnICkgPiAwIDpcblx0XHRkYXRlVGltZUZpZWxkTmFtZS5pbmRleE9mKCAnX2dtdCcgKSA+IDA7XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgcmVwcmVzZW50cyBhIHByaW1hcnkga2V5IGZpZWxkIHVzaW5nIHRoZVxuICogcHJvdmlkZWQgc2NoZW1hLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIGEgcHJpbWFyeSBrZXkgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1ByaW1hcnlLZXlGaWVsZCA9ICggZmllbGROYW1lLCBzY2hlbWEgKSA9PlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgJiZcblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcmltYXJ5X2tleSApO1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgcmVwcmVzZW50cyBhIHJlYWRvbmx5IGZpZWxkIHVzaW5nIHRoZVxuICogcHJvdmlkZWQgc2NoZW1hLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIGEgcmVhZG9ubHkgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1JlYWRPbmx5ID0gKCBmaWVsZE5hbWUsIHNjaGVtYSApID0+XG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0gKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnJlYWRvbmx5ICkgJiZcblx0c2NoZW1hWyBmaWVsZE5hbWUgXS5yZWFkb25seTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgaXMgYSBcImVudGl0eVwiIGZpZWxkIHVzaW5nIHRoZSBwcm92aWRlZFxuICogc2NoZW1hLlxuICpcbiAqIEFuIFwiZW50aXR5XCIgZmllbGQgaXMgYW55IGZpZWxkIHRoYXQgc2F0aXNmaWVzIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiAtIGZpZWxkIGV4aXN0cyBpbiB0aGUgc2NoZW1hXG4gKiAtIGl0IGlzIG5vdCByZWFkb25seSBvciBpcyBhIHByaW1hcnkga2V5IGZpZWxkLlxuICogLSBpdCBpcyBub3QgYSB1dGMgZmllbGQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGlzIGlzIGFuIGVudGl0eSBmaWVsZFxuICovXG5leHBvcnQgY29uc3QgaXNFbnRpdHlGaWVsZCA9ICggZmllbGROYW1lLCBzY2hlbWEgKSA9PlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgJiZcblx0KCAhIGlzUmVhZE9ubHkoIGZpZWxkTmFtZSwgc2NoZW1hICkgfHxcblx0XHRpc1ByaW1hcnlLZXlGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKVxuXHQpICYmXG5cdCEgaXNVVENEYXRlVGltZUZpZWxkKCBmaWVsZE5hbWUgKSAmJlxuXHRmaWVsZE5hbWUgIT09ICdfcHJvdGVjdGVkJztcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZmllbGQgcmVwcmVzZW50cyBhIHZhbHVlIG9mIG1vbmV5IGZyb20gdGhlIHByb3ZpZGVkXG4gKiBzY2hlbWEuXG4gKlxuICogQSBmaWVsZCBpcyBhIG1vbmV5IGZpZWxkIGlmIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgc2F0aXNmaWVkOlxuICpcbiAqIC0gSXQgZXhpc3RzIGluIHRoZSBzY2hlbWFcbiAqIC0gSXQgaGFzIGEgcHJldHR5IHByb3BlcnR5XG4gKiAtIFRoZSBwcmV0dHkgcHJvcGVydHkgdmFsdWUgaGFzIGEgZm9ybWF0IHByb3BlcnR5LlxuICogLSBUaGUgZm9ybWF0IHByb3BlcnR5IGlzIGVxdWFsIHRvICdtb25leSdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGl0IGlzIGEgbW9uZXkgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc01vbmV5RmllbGQgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT5cblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcyApICYmXG5cdGhhc1ByZXR0eVByb3BlcnR5KCBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMgKSAmJlxuXHRoYXNGb3JtYXRQcm9wZXJ0eSggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnByZXR0eSApICYmXG5cdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5wcmV0dHkuZm9ybWF0ID09PSAnbW9uZXknO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBmaWVsZCBpcyBhbiBlbnVtIHR5cGUgZmllbGQgYXMgZGVmaW5lZCBpbiB0aGUgcHJvdmlkZWRcbiAqIHNjaGVtYS5cbiAqXG4gKiBOb3RlOiB0aGlzIG9ubHkgZXZhbHVhdGVzIHRoZSB0b3AtbGV2ZWwgZm9yIHRoZSBmaWVsZCBzY2hlbWEuICBJZiB0aGUgZmllbGRcbiAqIGluIHRoZSBzY2hlbWEgaXMgb2YgdHlwZSAnb2JqZWN0JyBhbmQgb25lIG9mIHRoZSBvYmplY3QgcHJvcGVydGllcyBpcyBvZiB0eXBlXG4gKiAnZW51bScgdGhpcyB3aWxsIG5vdCBjb25zaWRlciBpdCBhbiBcImVudW1cIiBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBpZiB0aGUgZmllbGQgaXMgYW4gZW51bSB0eXBlIGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNFbnVtRmllbGQgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT5cblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXSApICYmXG5cdGhhc0VudW1Qcm9wZXJ0eSggc2NoZW1hWyBmaWVsZE5hbWUgXSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0uZW51bS5sZW5ndGggKSAmJlxuXHRzY2hlbWFbIGZpZWxkTmFtZSBdLmVudW0ubGVuZ3RoID4gMDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBhcHBseUZpbHRlcnMgfSBmcm9tICdAd29yZHByZXNzL2hvb2tzJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBDb25zdGFudHMgZGVzY3JpYmluZyB0aGUgY3VycmVudCBcInNhdmUgc3RhdGVcIiBmb3IgYW4gZW50aXR5LlxuICpcbiAqIEB0eXBlIHt7Q0xFQU46IFN5bWJvbCwgTkVXOiBTeW1ib2wsIERJUlRZOiBTeW1ib2x9fVxuICovXG5leHBvcnQgY29uc3QgU0FWRV9TVEFURSA9IHtcblx0Q0xFQU46IFN5bWJvbCggJ0VudGl0eSBpcyBwZXJzaXN0ZWQuJyApLFxuXHRORVc6IFN5bWJvbCggJ0VudGl0eSBpcyBuZXcuJyApLFxuXHRESVJUWTogU3ltYm9sKCAnRXhpc3RpbmcgZW50aXR5IGhhcyBjaGFuZ2VzIGFuZCBuZWVkcyBwZXJzaXN0ZWQuJyApLFxufTtcblxuLyoqXG4gKiBWYWxpZGF0aW9uIHR5cGVzIGFyZSBmb3Igc2NoZW1hJ3MgdGhhdCBoYXZlIHZhbHVlIHZhcmlhdGlvbnMuXG4gKiBAdHlwZSB7e1JBVzogc3RyaW5nLCBSRU5ERVJFRDogc3RyaW5nLCBQUkVUVFk6IHN0cmluZ319XG4gKi9cbmV4cG9ydCBjb25zdCBWQUxJREFURV9UWVBFID0ge1xuXHRSQVc6ICdyYXcnLFxuXHRSRU5ERVJFRDogJ3JlbmRlcmVkJyxcblx0UFJFVFRZOiAncHJldHR5Jyxcbn07XG5cbi8qKlxuICogUHJpdmF0ZSBwcm9wZXJ0aWVzIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgQmFzZSBFbnRpdHkgQ2xhc3NcbiAqIEB0eXBlIHt7c2F2ZVN0YXRlOiBib29sZWFufX1cbiAqL1xuZXhwb3J0IGNvbnN0IFBSSVZBVEVfUFJPUEVSVElFUyA9IHtcblx0U0FWRV9TVEFURTogU3ltYm9sKCAnYmFzZUVudGl0eVByaXZhdGVQcm9wZXJ0aWVzU2F2ZVN0YXRlJyApLFxuXHRWQUxJREFURV9UWVBFUzogU3ltYm9sKCAnYmFzZUVudGl0eVByaXZhdGVQcm9wZXJ0aWVzVmFsaWRhdGVUeXBlcycgKSxcbn07XG5cbi8qKlxuICogSGFyZGNvZGVkIGxpc3Qgb2YgbW9kZWwgcHJlZml4ZXMgZm9yIGZpZWxkcyBvbiBtb2RlbHMuXG5cbiAqIEEgbW9kZWwgcHJlZml4IGlzIHNvbWV0aGluZyB0aGF0IFwibmFtZXNwYWNlc1wiIGEgZmllbGQgb24gYSBtb2RlbC4gIEZvclxuICogZXhhbXBsZSwgaWYgdGhlIGZpZWxkIGlzIFwiRVZUX0lEXCIsIHRoZW4gdGhlIHByZWZpeCBpcyBcIkVWVFwiOyBpZiB0aGUgZmllbGQgaXNcbiAqIFwiRFRUX0VWVF9zdGFydFwiLCB0aGVuIHRoZSBwcmVmaXhlcyBhcmUgXCJEVFRcIiwgYW5kIFwiRFRUX0VWVFwiLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgZmlsdGVyZWQgb2JqZWN0IGluZGV4ZWQgYnkgbW9kZWwgbmFtZSBhbmQgdGhlIHZhbHVlcyBhcmVcbiAqIGFuIGFycmF5IG9mIG1vZGVsIHByZWZpeGVzIGZvciB0aGF0IG1vZGVsLlxuICovXG5leHBvcnQgY29uc3QgTU9ERUxfUFJFRklYRVMgPSAoIG1vZGVsTmFtZSApID0+IHtcblx0Y29uc3QgcHJlZml4TWFwID0gYXBwbHlGaWx0ZXJzKFxuXHRcdCdGSEVFX19FTlRJVFlfRkFDVE9SWV9fQ09OU1RBTlRTX19NT0RFTF9QUkVGSVhFUycsXG5cdFx0e1xuXHRcdFx0YW5zd2VyOiBbICdBTlMnIF0sXG5cdFx0XHRhdHRlbmRlZTogWyAnQVRUJyBdLFxuXHRcdFx0Y2hhbmdlX2xvZzogWyAnTE9HJyBdLFxuXHRcdFx0Y2hlY2tpbjogWyAnQ0hLJyBdLFxuXHRcdFx0Y291bnRyeTogWyAnQ05UJyBdLFxuXHRcdFx0Y3VycmVuY3k6IFsgJ0NVUicgXSxcblx0XHRcdGN1cnJlbmN5X3BheW1lbnRfbWV0aG9kOiBbICdDUE0nIF0sXG5cdFx0XHRkYXRldGltZTogWyAnRFRUJywgJ0RUVF9FVlQnIF0sXG5cdFx0XHRkYXRldGltZV90aWNrZXQ6IFsgJ0RUSycgXSxcblx0XHRcdGV2ZW50OiBbICdFVlQnIF0sXG5cdFx0XHRldmVudF9tZXNzYWdlX3RlbXBsYXRlOiBbICdFTVQnIF0sXG5cdFx0XHRldmVudF9xdWVzdGlvbl9ncm91cDogWyAnRVFHJyBdLFxuXHRcdFx0ZXZlbnRfdmVudWU6IFsgJ0VWVicgXSxcblx0XHRcdGV4dHJhX2pvaW46IFsgJ0VYSicgXSxcblx0XHRcdGV4dHJhX21ldGE6IFsgJ0VYTScgXSxcblx0XHRcdGxpbmVfaXRlbTogWyAnTElOJyBdLFxuXHRcdFx0bWVzc2FnZTogWyAnTVNHJyBdLFxuXHRcdFx0bWVzc2FnZV90ZW1wbGF0ZTogWyAnTVRQJyBdLFxuXHRcdFx0bWVzc2FnZV90ZW1wbGF0ZV9ncm91cDogWyAnR1JQJywgJ01UUCcgXSxcblx0XHRcdHBheW1lbnQ6IFsgJ1BBWScgXSxcblx0XHRcdHBheW1lbnRfbWV0aG9kOiBbICdQTUQnIF0sXG5cdFx0XHRwb3N0X21ldGE6IFsgJ21ldGEnIF0sXG5cdFx0XHRwcmljZTogWyAnUFJDJyBdLFxuXHRcdFx0cHJpY2VfdHlwZTogWyAnUFJUJyBdLFxuXHRcdFx0cXVlc3Rpb246IFsgJ1FTVCcgXSxcblx0XHRcdHF1ZXN0aW9uX2dyb3VwOiBbICdRU0cnIF0sXG5cdFx0XHRxdWVzdGlvbl9ncm91cF9xdWVzdGlvbjogWyAnUUdRJyBdLFxuXHRcdFx0cXVlc3Rpb25fb3B0aW9uOiBbICdRU08nIF0sXG5cdFx0XHRyZWN1cnJlbmNlOiBbICdSQ1InIF0sXG5cdFx0XHRyZWdpc3RyYXRpb246IFsgJ1JFRycgXSxcblx0XHRcdHJlZ2lzdHJhdGlvbl9wYXltZW50OiBbICdSUFknIF0sXG5cdFx0XHRzdGF0ZTogWyAnU1RBJyBdLFxuXHRcdFx0c3RhdHVzOiBbICdTVFMnIF0sXG5cdFx0XHR0ZXJtOiBbICd0ZXJtJyBdLFxuXHRcdFx0dGVybV9yZWxhdGlvbnNoaXA6IFtdLFxuXHRcdFx0dGVybV90YXhvbm9teTogWyAndGVybV90YXhvbm9teScgXSxcblx0XHRcdHRpY2tldDogWyAnVEtUJyBdLFxuXHRcdFx0dGlja2V0X3ByaWNlOiBbICdUS1AnIF0sXG5cdFx0XHR0aWNrZXRfdGVtcGxhdGU6IFsgJ1RUTScgXSxcblx0XHRcdHRyYW5zYWN0aW9uOiBbICdUWE4nIF0sXG5cdFx0XHR2ZW51ZTogWyAnVk5VJyBdLFxuXHRcdFx0d3BfdXNlcjogWyAndXNlcicgXSxcblx0XHR9ICk7XG5cdHJldHVybiAhIGlzVW5kZWZpbmVkKCBwcmVmaXhNYXBbIG1vZGVsTmFtZSBdICkgP1xuXHRcdHByZWZpeE1hcFsgbW9kZWxOYW1lIF0gOlxuXHRcdFtdO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRjYW1lbENhc2UsXG5cdHVwcGVyRmlyc3QsXG5cdGZvckVhY2gsXG5cdGlzVW5kZWZpbmVkLFxuXHRpc0FycmF5LFxuXHRrZXlzLFxuXHRzb3J0QnksXG59IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgY3VpZCBmcm9tICdjdWlkJztcbmltcG9ydCB7IEludmFsaWRBcmd1bWVudCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0YXNzZXJ0VmFsaWRGaWVsZEFuZFZhbHVlQWdhaW5zdFNjaGVtYSxcblx0YXNzZXJ0VmFsaWRWYWx1ZUZvclByZXBhcmVkRmllbGQsXG59IGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5pbXBvcnQge1xuXHRkZXJpdmVSZW5kZXJlZFZhbHVlLFxuXHRkZXJpdmVQcmVwYXJlZFZhbHVlRm9yRmllbGQsXG5cdGdldFJlbGF0aW9uTmFtZUZyb21MaW5rLFxuXHRnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyxcblx0Z2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvclBlcnNpc3RpbmcsXG5cdGdldFByaW1hcnlLZXlGaWVsZHNGcm9tU2NoZW1hLFxuXHRnZXRFbnRpdHlGaWVsZHNGcm9tU2NoZW1hLFxuXHRnZXREZWZhdWx0VmFsdWVGb3JGaWVsZCxcblx0ZGVyaXZlVmFsaWRhdGVUeXBlRm9yRmllbGQsXG59IGZyb20gJy4vZXh0cmFjdG9ycyc7XG5pbXBvcnQge1xuXHRpc0VudGl0eUZpZWxkLFxuXHRpc1ByaW1hcnlLZXlGaWVsZCxcbn0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQgeyBQUklWQVRFX1BST1BFUlRJRVMsIFNBVkVfU1RBVEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKihcbiAqIEEgZ2VuZXJpYyBnZXR0ZXIgY3JlYXRvciBmb3IgYSBwcm92aWRlZCBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWUgIFRoZSBuYW1lIG9mIHRoZSBhY2Nlc3Nvci5cbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgdXNlZCB0byBwYXNzIHRocm91Z2ggYWRkaXRpb25hbCBvcHRpb25zIGZvciB0aGVcbiAqIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBjYWxsLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlR2V0dGVyID0gKCBpbnN0YW5jZSwgZmllbGROYW1lLCBmaWVsZFZhbHVlLCBvcHRzID0ge30gKSA9PiB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggaW5zdGFuY2UsIGZpZWxkTmFtZSwge1xuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiBmaWVsZFZhbHVlO1xuXHRcdH0sXG5cdFx0Li4ub3B0cyxcblx0fSApO1xufTtcblxuLyoqXG4gKiBUaGlzIGNyZWF0ZXMgYSBnZXR0ZXIgdGhhdCBjYWxscyB0aGUgcHJvdmlkZWQgY2FsbGJhY2sgd2hlbiBpbnZva2VkLlxuICpcbiAqIFRoZSBjYWxsYmFjayByZWNlaXZlcyB0aGUgYGluc3RhbmNlYCBhcmd1bWVudCBwYXNzZWQgdGhyb3VnaFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpfSBjYWxsQmFja1xuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhbGxiYWNrR2V0dGVyID0gKFxuXHRpbnN0YW5jZSxcblx0cHJvcGVydHlOYW1lLFxuXHRjYWxsQmFjayxcblx0b3B0cyA9IHt9XG4pID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBpbnN0YW5jZSwgcHJvcGVydHlOYW1lLCB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIGNhbGxCYWNrKCBpbnN0YW5jZSApO1xuXHRcdH0sXG5cdFx0Li4ub3B0cyxcblx0fSApO1xufTtcblxuLyoqXG4gKiBBIGdlbmVyaWMgZ2V0dGVyIGFuZCBzZXR0ZXIgY3JlYXRvciBmb3IgYSBwcm92aWRlZCBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSAgaW5pdGlhbEZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIE9wdGlvbmFsLCBwYXNzIHRocm91Z2ggb3B0aW9ucyB1c2VkIGJ5XG4gKiBPYmplY3QuZGVmaW5lUHJvcGVydHlcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUdldHRlckFuZFNldHRlciA9IChcblx0aW5zdGFuY2UsXG5cdGZpZWxkTmFtZSxcblx0aW5pdGlhbEZpZWxkVmFsdWUsXG5cdG9wdHMgPSB7fSxcbikgPT4ge1xuXHRsZXQgcHJvcGVydHlWYWx1ZSA9IGluaXRpYWxGaWVsZFZhbHVlO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGluc3RhbmNlLCBmaWVsZE5hbWUsIHtcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gcHJvcGVydHlWYWx1ZTtcblx0XHR9LFxuXHRcdHNldCggcmVjZWl2ZWRWYWx1ZSApIHtcblx0XHRcdGNvbnN0IGlzUHJpbWFyeUZpZWxkID0gaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hICk7XG5cdFx0XHRpZiAoICEgaW5zdGFuY2UuaXNOZXcgJiYgaXNQcmltYXJ5RmllbGQgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGFzc2VydFZhbGlkVmFsdWVGb3JQcmVwYXJlZEZpZWxkKFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdHJlY2VpdmVkVmFsdWUsXG5cdFx0XHRcdGluc3RhbmNlXG5cdFx0XHQpO1xuXHRcdFx0aWYgKCAhIGlzUHJpbWFyeUZpZWxkICkge1xuXHRcdFx0XHRzZXRTYXZlU3RhdGUoIGluc3RhbmNlLCBTQVZFX1NUQVRFLkRJUlRZICk7XG5cdFx0XHRcdHNldEZpZWxkVG9QZXJzaXN0KCBpbnN0YW5jZSwgZmllbGROYW1lICk7XG5cdFx0XHR9XG5cdFx0XHRwcm9wZXJ0eVZhbHVlID0gcmVjZWl2ZWRWYWx1ZTtcblx0XHR9LFxuXHRcdC4uLm9wdHMsXG5cdH0gKTtcbn07XG5cbi8qKlxuICogQSBnZXR0ZXIgYW5kIHNldHRlciBjcmVhdG9yIGZvciBhbiBmaWVsZCBhbGlhcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmlnaW5hbEZpZWxkTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGFsaWFzRmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQWxpYXNHZXR0ZXJBbmRTZXR0ZXIgPSAoXG5cdGluc3RhbmNlLFxuXHRvcmlnaW5hbEZpZWxkTmFtZSxcblx0YWxpYXNGaWVsZE5hbWUsXG5cdG9wdHMgPSB7fSxcbikgPT4ge1xuXHRpZiAoIG9yaWdpbmFsRmllbGROYW1lICE9PSBhbGlhc0ZpZWxkTmFtZSApIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGluc3RhbmNlLCBhbGlhc0ZpZWxkTmFtZSwge1xuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gaW5zdGFuY2VbIG9yaWdpbmFsRmllbGROYW1lIF07XG5cdFx0XHR9LFxuXHRcdFx0c2V0KCByZWNlaXZlZFZhbHVlICkge1xuXHRcdFx0XHRyZXR1cm4gaW5zdGFuY2VbIG9yaWdpbmFsRmllbGROYW1lIF0gPSByZWNlaXZlZFZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdC4uLm9wdHMsXG5cdFx0fSApO1xuXHR9XG59O1xuXG4vKipcbiAqIEEgZ2V0dGVyIGNyZWF0b3IgZm9yIGEgZmllbGQgYWxpYXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JpZ2luYWxGaWVsZE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBhbGlhc0ZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUFsaWFzR2V0dGVyID0gKFxuXHRpbnN0YW5jZSxcblx0b3JpZ2luYWxGaWVsZE5hbWUsXG5cdGFsaWFzRmllbGROYW1lLFxuXHRvcHRzID0ge30sXG4pID0+IHtcblx0aWYgKCBvcmlnaW5hbEZpZWxkTmFtZSAhPT0gYWxpYXNGaWVsZE5hbWUgKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBpbnN0YW5jZSwgYWxpYXNGaWVsZE5hbWUsIHtcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIGluc3RhbmNlWyBvcmlnaW5hbEZpZWxkTmFtZSBdO1xuXHRcdFx0fSxcblx0XHRcdC4uLm9wdHMsXG5cdFx0fSApO1xuXHR9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmbHVlbnQgc2V0dGVyIG9uIHRoZSBwcm92aWRlZCBpbnN0YW5jZSBmb3IgdGhlIGdpdmVuIGZpZWxkIG5hbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyAgT3B0aW9ucyBmb3IgT2JqZWN0LmRlZmluZVByb3BlcnR5XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVGbHVlbnRTZXR0ZXIgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUsIG9wdHMgPSB7fSApID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBpbnN0YW5jZSwgJ3NldCcgKyB1cHBlckZpcnN0KCBmaWVsZE5hbWUgKSwge1xuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiAoIHJlY2VpdmVkVmFsdWUgKSA9PiB7XG5cdFx0XHRcdGluc3RhbmNlWyBmaWVsZE5hbWUgXSA9IHJlY2VpdmVkVmFsdWU7XG5cdFx0XHRcdHJldHVybiBpbnN0YW5jZTtcblx0XHRcdH07XG5cdFx0fSxcblx0XHQuLi5vcHRzLFxuXHR9ICk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgaW5pdGlhbCBnZXR0ZXJzIGFuZCBzZXR0ZXJzIGZvciBlbnRpdGllcyBvbiB0aGUgcHJvdmlkZWQgZW50aXR5XG4gKiBpbnN0YW5jZSB1c2luZyB0aGUgZ2l2ZW4gZGF0YS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICoga2V5cyBvbiBpbnN0YW5jZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVudGl0eUdldHRlcnNBbmRTZXR0ZXJzID0gKCBpbnN0YW5jZSApID0+IHtcblx0Y29uc3QgcHJpbWFyeUtleXMgPSBbXTtcblx0Zm9yRWFjaChcblx0XHRpbnN0YW5jZS5vcmlnaW5hbEZpZWxkc0FuZFZhbHVlcyxcblx0XHQoIGZpZWxkVmFsdWUsIGZpZWxkTmFtZSApID0+IHtcblx0XHRcdGNvbnN0IGlzUHJpbWFyeUtleSA9IGlzUHJpbWFyeUtleUZpZWxkKCBmaWVsZE5hbWUsIGluc3RhbmNlLnNjaGVtYSApO1xuXHRcdFx0c2V0VmFsaWRhdGVUeXBlRm9yRmllbGQoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUgKTtcblx0XHRcdGlmICggaXNFbnRpdHlGaWVsZCggZmllbGROYW1lLCBpbnN0YW5jZS5zY2hlbWEgKSApIHtcblx0XHRcdFx0aWYgKCBpbnN0YW5jZS5pc05ldyApIHtcblx0XHRcdFx0XHRhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZChcblx0XHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdFx0XHRpbnN0YW5jZVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YXNzZXJ0VmFsaWRGaWVsZEFuZFZhbHVlQWdhaW5zdFNjaGVtYShcblx0XHRcdFx0XHRcdGluc3RhbmNlLm1vZGVsTmFtZSxcblx0XHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdFx0XHRpbnN0YW5jZVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0c2V0SW5pdGlhbEVudGl0eUZpZWxkc0FuZFZhbHVlcyhcblx0XHRcdFx0XHRpbnN0YW5jZSxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRpc1ByaW1hcnlLZXlcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdGlmICggZmllbGROYW1lID09PSAnX2NhbGN1bGF0ZWRfZmllbGRzJyApIHtcblx0XHRcdFx0c2V0Q2FsY3VsYXRlZEZpZWxkQW5kVmFsdWVzKCBpbnN0YW5jZSwgZmllbGRWYWx1ZSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBmaWVsZE5hbWUgPT09ICdfcHJvdGVjdGVkJyApIHtcblx0XHRcdFx0cG9wdWxhdGVQcm90ZWN0ZWRGaWVsZHNQcm9wZXJ0eSggaW5zdGFuY2UsIGZpZWxkVmFsdWUgKTtcblx0XHRcdH1cblx0XHRcdGlmICggZmllbGROYW1lID09PSAnbGluaycgKSB7XG5cdFx0XHRcdGNyZWF0ZUdldHRlciggaW5zdGFuY2UsICdsaW5rJywgZmllbGRWYWx1ZSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBmaWVsZE5hbWUgPT09ICdfbGlua3MnICkge1xuXHRcdFx0XHRzZXRSZXNvdXJjZXMoIGluc3RhbmNlLCBmaWVsZFZhbHVlICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoICEgaW5zdGFuY2UuaXNOZXcgJiYgaXNQcmltYXJ5S2V5ICkge1xuXHRcdFx0XHRwcmltYXJ5S2V5cy5wdXNoKCBmaWVsZE5hbWUgKTtcblx0XHRcdH1cblx0XHR9XG5cdCk7XG5cdGlmICggISBpbnN0YW5jZS5pc05ldyAmJiBwcmltYXJ5S2V5cy5sZW5ndGggKSB7XG5cdFx0Y3JlYXRlUHJpbWFyeUtleUZpZWxkR2V0dGVycyggaW5zdGFuY2UsIHByaW1hcnlLZXlzICk7XG5cdH1cblxuXHRwb3B1bGF0ZVByaW1hcnlLZXlzKCBpbnN0YW5jZSApO1xuXHRwb3B1bGF0ZU1pc3NpbmdGaWVsZHMoIGluc3RhbmNlICk7XG59O1xuXG4vKipcbiAqIFBvcHVsYXRlcyB0aGUgYHByb3RlY3RlZEZpZWxkc2AgcHJvcGVydHkgb24gdGhlIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtBcnJheX0gcHJvdGVjdGVkRmllbGRzXG4gKi9cbmNvbnN0IHBvcHVsYXRlUHJvdGVjdGVkRmllbGRzUHJvcGVydHkgPSAoIGluc3RhbmNlLCBwcm90ZWN0ZWRGaWVsZHMgKSA9PiB7XG5cdC8vIGdldCBhbnkgY2FsY3VsYXRlZCBwcm90ZWN0ZWQgZmllbGRzLlxuXHRjb25zdCBjYWxjdWxhdGVkRmllbGRzID0gaW5zdGFuY2Vcblx0XHQub3JpZ2luYWxGaWVsZHNBbmRWYWx1ZXNcblx0XHQuX2NhbGN1bGF0ZWRfZmllbGRzIHx8IHt9O1xuXHRpZiAoXG5cdFx0Y2FsY3VsYXRlZEZpZWxkcy5fcHJvdGVjdGVkICYmXG5cdFx0aXNBcnJheSggY2FsY3VsYXRlZEZpZWxkcy5fcHJvdGVjdGVkIClcblx0KSB7XG5cdFx0cHJvdGVjdGVkRmllbGRzID0gW1xuXHRcdFx0Li4ucHJvdGVjdGVkRmllbGRzLFxuXHRcdFx0Li4uY2FsY3VsYXRlZEZpZWxkcy5fcHJvdGVjdGVkLFxuXHRcdF07XG5cdH1cblx0Y3JlYXRlR2V0dGVyKCBpbnN0YW5jZSwgJ3Byb3RlY3RlZEZpZWxkcycsIHByb3RlY3RlZEZpZWxkcyApO1xufTtcblxuLyoqXG4gKiBUaGlzIHBvcHVsYXRlcyBwcmltYXJ5IGtleSBmaWVsZHMuXG4gKiBOb3RlIHRoYXQgaXQgYWxzbyBvdmVycmlkZXMgYW55IHByaW1hcnkga2V5IHZhbHVlcy9wcm9wZXJ0aWVzIHRoYXQgYXJlXG4gKiBhbHJlYWR5IHNldCBpbiB0aGUgZW50aXR5IHNvIGlzIG9ubHkgcHJvY2Vzc2VkIHdoZW4gdGhlIGluc3RhbmNlIGlzIG5ldy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqL1xuY29uc3QgcG9wdWxhdGVQcmltYXJ5S2V5cyA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdGlmICggISBpbnN0YW5jZS5pc05ldyApIHtcblx0XHRyZXR1cm47XG5cdH1cblx0Y29uc3QgcHJpbWFyeUtleXMgPSBnZXRQcmltYXJ5S2V5RmllbGRzRnJvbVNjaGVtYSggaW5zdGFuY2UgKTtcblx0Zm9yRWFjaCggcHJpbWFyeUtleXMsIChcblx0XHRzY2hlbWFQcm9wZXJ0aWVzLFxuXHRcdHNjaGVtYUZpZWxkXG5cdCkgPT4ge1xuXHRcdC8vIGFsd2F5cyBkZWxldGUgYW5kIG92ZXJyaWRlIHdoYXQgaXMgZXhpc3RpbmcuXG5cdFx0aWYgKCBpbnN0YW5jZVsgc2NoZW1hRmllbGQgXSApIHtcblx0XHRcdGRlbGV0ZSBpbnN0YW5jZVsgc2NoZW1hRmllbGQgXTtcblx0XHR9XG5cdFx0Y3JlYXRlR2V0dGVyQW5kU2V0dGVyKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRzY2hlbWFGaWVsZCxcblx0XHRcdGN1aWQoKSxcblx0XHRcdHsgY29uZmlndXJhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlIH1cblx0XHQpO1xuXHRcdGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyRm9yRmllbGQoIGluc3RhbmNlLCBzY2hlbWFGaWVsZCApO1xuXHR9ICk7XG5cdGNyZWF0ZVByaW1hcnlLZXlGaWVsZEdldHRlcnMoXG5cdFx0aW5zdGFuY2UsXG5cdFx0a2V5cyggcHJpbWFyeUtleXMgKVxuXHQpO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSB2YWxpZGF0ZSB0eXBlIGZvciBhIGZpZWxkIHByb3BlcnR5LlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqL1xuY29uc3Qgc2V0VmFsaWRhdGVUeXBlRm9yRmllbGQgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUgKSA9PiB7XG5cdGluc3RhbmNlWyBQUklWQVRFX1BST1BFUlRJRVMuVkFMSURBVEVfVFlQRVMgXVsgZmllbGROYW1lIF0gPVxuXHRcdGRlcml2ZVZhbGlkYXRlVHlwZUZvckZpZWxkKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIGluc3RhbmNlLnNjaGVtYSApO1xufTtcblxuLyoqXG4gKiAgUG9wdWxhdGVzIG1pc3NpbmcgZmllbGRzIGFuZCB2YWx1ZXMgdXNpbmcgZGVmYXVsdHMgcHJvdmlkZWQgYnkgc2NoZW1hLiAgSWZcbiAqICBzY2hlbWEgZG9lc24ndCBwcm92aWRlIGEgZGVmYXVsdCB0aGVuIHRoaXMgd2lsbCBwb3B1bGF0ZSB0aGUgZmllbGQgd2l0aCBhXG4gKiAgZGVmYXVsdCB2YWx1ZSB0aGF0IG1hdGNoZXMgdGhlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKi9cbmNvbnN0IHBvcHVsYXRlTWlzc2luZ0ZpZWxkcyA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdGlmICggdHlwZW9mIGluc3RhbmNlLnByb3RlY3RlZEZpZWxkcyA9PT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0cG9wdWxhdGVQcm90ZWN0ZWRGaWVsZHNQcm9wZXJ0eSggaW5zdGFuY2UsIFtdICk7XG5cdH1cblx0aWYgKCAhIGluc3RhbmNlLmlzTmV3ICkge1xuXHRcdHJldHVybjtcblx0fVxuXHRmb3JFYWNoKFxuXHRcdGdldEVudGl0eUZpZWxkc0Zyb21TY2hlbWEoIGluc3RhbmNlICksXG5cdFx0KCBzY2hlbWFQcm9wZXJ0aWVzLCBmaWVsZE5hbWUgKSA9PiB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHR5cGVvZiBpbnN0YW5jZVsgZmllbGROYW1lIF0gPT09ICd1bmRlZmluZWQnICYmXG5cdFx0XHRcdCEgaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hIClcblx0XHRcdCkge1xuXHRcdFx0XHRzZXRJbml0aWFsRW50aXR5RmllbGRzQW5kVmFsdWVzKFxuXHRcdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHQpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIGVudGl0eSBmaWVsZHMgYW5kIHZhbHVlcyBmcm9tIHRoaXMgZW50aXR5IGluc3RhbmNlXG4gKiBmb3IgdXNlIGluIGNsb25pbmcgdGhlIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBQbGFpbiBvYmplY3Qgb2YgYWxsIGZpZWxkOnZhbHVlIHBhaXJzLlxuICovXG5jb25zdCBmb3JDbG9uZSA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdHJldHVybiBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyggaW5zdGFuY2UgKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHBsYWluIG9iamVjdCBvZiB0aGUgZW50aXR5IGZpZWxkcyBhbmQgdmFsdWVzIGZyb20gdGhpcyBlbnRpdHlcbiAqIGluc3RhbmNlIHByZXBhcmVkIGZvciB1c2UgaW4gYW4gdXBkYXRlIHJlcXVlc3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtPYmplY3R9IFBsYWluIG9iamVjdCBvZiBmaWVsZDp2YWx1ZSBwYWlycy5cbiAqL1xuY29uc3QgZm9yVXBkYXRlID0gKCBpbnN0YW5jZSApID0+IHtcblx0cmV0dXJuIGdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JQZXJzaXN0aW5nKCBpbnN0YW5jZSApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIHRoZSBlbnRpdHkgZmllbGRzIGFuZCB2YWx1ZXMgZnJvbSB0aGlzIGVudGl0eVxuICogaW5zdGFuY2UgcHJlcGFyZWQgZm9yIHVzZSBpbiBhbiBpbnNlcnQgcmVxdWVzdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gUGxhaW4gb2JqZWN0IG9mIGZpZWxkOnZhbHVlIHBhaXJzLlxuICovXG5jb25zdCBmb3JJbnNlcnQgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRjb25zdCBlbnRpdHlWYWx1ZXMgPSBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yUGVyc2lzdGluZyhcblx0XHRpbnN0YW5jZSxcblx0XHR0cnVlXG5cdCk7XG5cdGluc3RhbmNlLnByaW1hcnlLZXlzLmZvckVhY2goICggcHJpbWFyeUtleSApID0+IHtcblx0XHRlbnRpdHlWYWx1ZXNbIHByaW1hcnlLZXkgXSA9IGluc3RhbmNlWyBwcmltYXJ5S2V5IF07XG5cdH0gKTtcblx0cmV0dXJuIGVudGl0eVZhbHVlcztcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHBsYWluIG9iamVjdCBvZiB0aGUgZW50aXR5IGZpZWxkcyBhbmQgdmFsdWVzIGZyb20gdGhpcyBlbnRpdHlcbiAqIGluc3RhbmNlIHByZXBhcmVkIGZvciB1c2UgaW4gZWl0aGVyIGFuIGluc2VydCBvciB1cGRhdGUgcmVxdWVzdC4gIFRoZSB0eXBlXG4gKiBpcyBhdXRvbWF0aWNhbGx5IGRlcml2ZWQgZnJvbSB0aGUgZGV0ZXJtaW5pbmcgd2hldGhlciB0aGUgZW50aXR5IGlzIFwibmV3XCIgb3JcbiAqIG5vdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gUGxhaW4gb2JqZWN0IG9mIGZpZWxkOnZhbHVlIHBhaXJzLlxuICovXG5jb25zdCBmb3JQZXJzaXN0ID0gKCBpbnN0YW5jZSApID0+IHtcblx0aWYgKCBpbnN0YW5jZS5pc05ldyApIHtcblx0XHRyZXR1cm4gZm9ySW5zZXJ0KCBpbnN0YW5jZSApO1xuXHR9XG5cdHJldHVybiBmb3JVcGRhdGUoIGluc3RhbmNlICk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgZ2V0dGVycyBmb3IgcmV0cmlldmluZyB0aGUgZmllbGRzIGFuZCB2YWx1ZXMgb2YgdGhlIGVudGl0eSBpbnN0YW5jZVxuICogZm9yIGluc2VydCBvciB1cGRhdGUgcmVxdWVzdHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVQZXJzaXN0aW5nR2V0dGVyc0FuZFNldHRlcnMgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRjcmVhdGVDYWxsYmFja0dldHRlciggaW5zdGFuY2UsICdmb3JVcGRhdGUnLCBmb3JVcGRhdGUgKTtcblx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoIGluc3RhbmNlLCAnZm9ySW5zZXJ0JywgZm9ySW5zZXJ0ICk7XG5cdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKCBpbnN0YW5jZSwgJ2ZvclBlcnNpc3QnLCBmb3JQZXJzaXN0ICk7XG5cdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKCBpbnN0YW5jZSwgJ2ZvckNsb25lJywgZm9yQ2xvbmUgKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBpbml0aWFsIGVudGl0eSBmaWVsZCBhY2Nlc3NvcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNQcmltYXJ5S2V5XG4gKi9cbmNvbnN0IHNldEluaXRpYWxFbnRpdHlGaWVsZHNBbmRWYWx1ZXMgPSAoXG5cdGluc3RhbmNlLFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdGlzUHJpbWFyeUtleSA9IGZhbHNlLFxuKSA9PiB7XG5cdGlmICggaXNVbmRlZmluZWQoIGZpZWxkVmFsdWUgKSApIHtcblx0XHRmaWVsZFZhbHVlID0gZ2V0RGVmYXVsdFZhbHVlRm9yRmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hICk7XG5cdFx0c2V0VmFsaWRhdGVUeXBlRm9yRmllbGQoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUgKTtcblx0fVxuXHRjcmVhdGVSYXdFbnRpdHlHZXR0ZXJzU2V0dGVycyhcblx0XHRpbnN0YW5jZSxcblx0XHRmaWVsZE5hbWUsXG5cdFx0ZGVyaXZlUHJlcGFyZWRWYWx1ZUZvckZpZWxkKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIGluc3RhbmNlICksXG5cdFx0aXNQcmltYXJ5S2V5XG5cdCk7XG5cdGlmICggISBpc1ByaW1hcnlLZXkgKSB7XG5cdFx0Y3JlYXRlUmVuZGVyZWRHZXR0ZXJzKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRkZXJpdmVSZW5kZXJlZFZhbHVlKCBmaWVsZFZhbHVlIClcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgcmF3IGVudGl0eSBnZXR0ZXJzIGFuZCBzZXR0ZXJzLiAgVGhlc2UgYXJlIHRoZSBwcm9wZXJ0aWVzIG9mIGFuXG4gKiBlbnRpdHkgdGhhdCBoYXZlIHRoZSB2YWx1ZXMgdXNlZCBmb3Igbm90IG9ubHkgZ2V0dGluZyBidXQgYWxzbyBzZXR0aW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzUHJpbWFyeUtleSBzZXQgdG8gdHJ1ZSBpZiBmaWVsZCBpcyB0aGUgbW9kZWwncyBwcmltYXJ5IGtleVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlUmF3RW50aXR5R2V0dGVyc1NldHRlcnMgPSAoXG5cdGluc3RhbmNlLFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdGlzUHJpbWFyeUtleSA9IGZhbHNlLFxuKSA9PiB7XG5cdGNvbnN0IG9wdHMgPSB7IGVudW1lcmFibGU6IHRydWUgfTtcblx0Ly8gcHJpbWFyeSBrZXkgaXMgaW1tdXRhYmxlXG5cdGlmICggaXNQcmltYXJ5S2V5ICkge1xuXHRcdGNyZWF0ZUdldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdG9wdHNcblx0XHQpO1xuXHRcdGNyZWF0ZUFsaWFzR2V0dGVyRm9yRmllbGQoIGluc3RhbmNlLCBmaWVsZE5hbWUgKTtcblx0fSBlbHNlIHtcblx0XHRjcmVhdGVHZXR0ZXJBbmRTZXR0ZXIoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRvcHRzXG5cdFx0KTtcblx0XHRjcmVhdGVGbHVlbnRTZXR0ZXIoIGluc3RhbmNlLCBmaWVsZE5hbWUgKTtcblx0XHRjcmVhdGVBbGlhc0dldHRlckFuZFNldHRlckZvckZpZWxkKCBpbnN0YW5jZSwgZmllbGROYW1lICk7XG5cdH1cbn07XG5cbi8qKlxuICogQ3JlYXRlcyBcImFsaWFzXCIgZ2V0dGVyIGZvciB0aGUgZ2l2ZW4gZmllbGQgbmFtZSBvbiB0aGUgZW50aXR5IGluc3RhbmNlLlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBbGlhc0dldHRlckZvckZpZWxkID0gKCBpbnN0YW5jZSwgZmllbGROYW1lICkgPT4ge1xuXHRjcmVhdGVBbGlhc2VzRm9yTWV0aG9kKCBpbnN0YW5jZSwgZmllbGROYW1lLCBjcmVhdGVBbGlhc0dldHRlciApO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIFwiYWxpYXNcIiBnZXR0ZXJzIGFuZCBzZXR0ZXJzIGZvciB0aGUgZ2l2ZW4gZmllbGQgb24gdGhlIGVudGl0eVxuICogaW5zdGFuY2UuXG4gKlxuICogRXhhbXBsZTogRGF0ZXRpbWUgZW50aXRpZXMgaGF2ZSBhIGBEVFRfRVZUX3N0YXJ0YCBmaWVsZC4gIE9uIHRoZSBlbnRpdHlcbiAqIGluc3RhbmNlLCB5b3Ugd2lsbCBiZSBhYmxlIHRvIGFjY2VzcyB0aGUgdmFsdWUgb2YgdGhhdCBmaWVsZCB2aWE6XG4gKiAtIGRhdGV0aW1lLkRUVF9FVlRfc3RhcnRcbiAqIC0gZGF0ZXRpbWUuZHR0RXZ0U3RhcnRcbiAqIC0gZGF0ZXRpbWUuZXZ0U3RhcnRcbiAqIC0gZGF0ZXRpbWUuc3RhcnRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyRm9yRmllbGQgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUgKSA9PiB7XG5cdGNyZWF0ZUFsaWFzZXNGb3JNZXRob2QoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyICk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgQWxpYXNlcyB1c2luZyB0aGUgcHJvdmlkZWQgbWV0aG9kLlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2RcbiAqL1xuY29uc3QgY3JlYXRlQWxpYXNlc0Zvck1ldGhvZCA9ICggaW5zdGFuY2UsIGZpZWxkTmFtZSwgbWV0aG9kICkgPT4ge1xuXHQvLyBjYW1lbENhc2UgZ2V0dGVyIChvciBzZXR0ZXIpIGZvciBmdWxsIGZpZWxkIG5hbWUgKGVnLiBFVlRfZGVzYyA9PiBldnREZXNjKVxuXHRtZXRob2QoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGNhbWVsQ2FzZSggZmllbGROYW1lICkgKTtcblx0Ly8gc3RyaXAgZmllbGQgcHJlZml4ZXMgYW5kIGNhbWVsQ2FzZSAoaWYgdGhlcmUgYXJlIGZpZWxkIHByZWZpeGVzIGZvciB0aGVcblx0Ly8gZW50aXR5LiAoZWcuIEVWVF9kZXNjID0+IGRlc2MpO1xuXHRpZiAoIGluc3RhbmNlLmZpZWxkUHJlZml4ZXMgKSB7XG5cdFx0bGV0IG5ld0ZpZWxkTmFtZSA9ICcnO1xuXHRcdC8vIFllcywgaXRzIGludGVuZGVkIHRoYXQgaWYgdGhlcmUgYXJlIG11bHRpcGxlIHByZWZpeGVzLCB0aGlzIGNvdWxkXG5cdFx0Ly8gZW5kIHVwIGNyZWF0aW5nIG11bHRpcGxlIGFsaWFzZWQgZ2V0dGVycyAob3Igc2V0dGVycylcblx0XHQvLyAoZWcgRGF0ZXRpbWU6IERUVF9FVlRfc3RhcnQgd291bGQgZW5kIHVwIHdpdGggYGV2dFN0YXJ0YCBhbmQgYHN0YXJ0YFxuXHRcdC8vIGFzIGdldHRlciBhY2Nlc3NvcnMpLlxuXHRcdGluc3RhbmNlLmZpZWxkUHJlZml4ZXMuZm9yRWFjaCggKCBmaWVsZFByZWZpeCApID0+IHtcblx0XHRcdG5ld0ZpZWxkTmFtZSA9IGZpZWxkTmFtZS5yZXBsYWNlKCBmaWVsZFByZWZpeCArICdfJywgJycgKTtcblx0XHRcdGlmICggbmV3RmllbGROYW1lICE9PSBmaWVsZE5hbWUgKSB7XG5cdFx0XHRcdG1ldGhvZChcblx0XHRcdFx0XHRpbnN0YW5jZSxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0Y2FtZWxDYXNlKCBuZXdGaWVsZE5hbWUgKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgY2FsbGJhY2sgdGhhdCBpcyB1c2VkIGluIHRoZSBgZ2V0UmVuZGVyZWRgIGZpZWxkIGdldHRlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7ZnVuY3Rpb24oc3RyaW5nKTogKn0gIEEgY2FsbGJhY2suXG4gKi9cbmNvbnN0IGdldFJlbmRlcmVkQ2FsbGJhY2sgPSAoIGluc3RhbmNlICkgPT4gKCByZXF1ZXN0ZWRGaWVsZE5hbWUgKSA9PlxuXHRpbnN0YW5jZVsgcmVxdWVzdGVkRmllbGROYW1lICsgJ1JlbmRlcmVkJyBdO1xuXG4vKipcbiAqIFJldHVybnMgYSBmaWVsZE5hbWUgc3RyaXBwZWQgb2YgYWxsIHBvc3NpYmxlIHByZWZpeGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgcHJlZml4IGZyZWUgZmllbGROYW1lLlxuICovXG5jb25zdCByZW1vdmVQcmVmaXhlc0Zyb21GaWVsZCA9ICggaW5zdGFuY2UsIGZpZWxkTmFtZSApID0+IHtcblx0Y29uc3QgcHJlZml4ZXNUb1JlbW92ZSA9IHNvcnRCeShcblx0XHRpbnN0YW5jZS5maWVsZFByZWZpeGVzLFxuXHRcdCggcHJlZml4ICkgPT4gcHJlZml4Lmxlbmd0aCAqIC0xXG5cdCk7XG5cdGxldCBuZXdGaWVsZE5hbWUgPSBmaWVsZE5hbWU7XG5cdGZvckVhY2goIHByZWZpeGVzVG9SZW1vdmUsICggcHJlZml4ICkgPT4ge1xuXHRcdG5ld0ZpZWxkTmFtZSA9IGZpZWxkTmFtZS5yZXBsYWNlKCBwcmVmaXgsICcnICk7XG5cdFx0aWYgKCBuZXdGaWVsZE5hbWUgIT09IGZpZWxkTmFtZSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0gKTtcblx0cmV0dXJuIG5ld0ZpZWxkTmFtZTtcbn07XG5cbi8qKlxuICogVGhpcyBjcmVhdGVzIHRoZSBnZXR0ZXJzIGZvciB0aGUgcmVuZGVyZWQgcHJvcGVydHkgb2YgbW9kZWwgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSAgZmllbGRWYWx1ZVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlUmVuZGVyZWRHZXR0ZXJzID0gKCBpbnN0YW5jZSwgZmllbGROYW1lLCBmaWVsZFZhbHVlICkgPT4ge1xuXHRjcmVhdGVHZXR0ZXIoXG5cdFx0aW5zdGFuY2UsXG5cdFx0Y2FtZWxDYXNlKCByZW1vdmVQcmVmaXhlc0Zyb21GaWVsZCggaW5zdGFuY2UsIGZpZWxkTmFtZSApICkgK1xuXHRcdCdSZW5kZXJlZCcsXG5cdFx0ZmllbGRWYWx1ZVxuXHQpO1xuXHRpZiAoIGlzVW5kZWZpbmVkKCBpbnN0YW5jZS5nZXRSZW5kZXJlZCApICkge1xuXHRcdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHQnZ2V0UmVuZGVyZWQnLFxuXHRcdFx0Z2V0UmVuZGVyZWRDYWxsYmFjayxcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciB0aGUgYGhhc011bHRpcGxlUHJpbWFyeUtleXNgIGdldHRlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKCk6IGJvb2xlYW59IFRoZSBjYWxsYmFjayBmb3IgaGFzTXVsdGlwbGVQcmltYXJ5S2V5cyBnZXR0ZXJcbiAqL1xuY29uc3QgaGFzTXVsdGlwbGVQcmltYXJ5S2V5c0NhbGxiYWNrID0gKCBpbnN0YW5jZSApID0+XG5cdGluc3RhbmNlLnByaW1hcnlLZXlzLmxlbmd0aCA+IDE7XG5cbi8qKlxuICogQ3JlYXRlcyBnZXR0ZXJzIGZvciBwcmltYXJ5IGtleSByZWxhdGVkIGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge0FycmF5fSBwcmltYXJ5S2V5c1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlUHJpbWFyeUtleUZpZWxkR2V0dGVycyA9ICggaW5zdGFuY2UsIHByaW1hcnlLZXlzICkgPT4ge1xuXHRjb25zdCBvcHRzID0geyBjb25maWd1cmFibGU6IHRydWUgfTtcblx0aWYgKCBpc0FycmF5KCBwcmltYXJ5S2V5cyApICkge1xuXHRcdGNyZWF0ZUdldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0J3ByaW1hcnlLZXknLFxuXHRcdFx0cHJpbWFyeUtleXNbIDAgXSxcblx0XHRcdG9wdHNcblx0XHQpO1xuXHRcdGNyZWF0ZUdldHRlckFuZFNldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0J3ByaW1hcnlLZXlzJyxcblx0XHRcdHByaW1hcnlLZXlzLFxuXHRcdFx0b3B0c1xuXHRcdCk7XG5cdFx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdCdoYXNNdWx0aXBsZVByaW1hcnlLZXlzJyxcblx0XHRcdGhhc011bHRpcGxlUHJpbWFyeUtleXNDYWxsYmFjayxcblx0XHRcdG9wdHNcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7ZnVuY3Rpb24oc3RyaW5nKTogYm9vbGVhbn0gUmV0dXJucyBhIGNhbGxiYWNrIGZvciB0aGVcbiAqIGhhc0NhbGN1bGF0ZWRGaWVsZCBnZXR0ZXJcbiAqL1xuY29uc3QgaGFzQ2FsY3VsYXRlZEZpZWxkQ2FsbGJhY2sgPSAoIGluc3RhbmNlICkgPT5cblx0KCBmaWVsZE5hbWVUb0NoZWNrICkgPT4gISBpc1VuZGVmaW5lZCggaW5zdGFuY2VbIGZpZWxkTmFtZVRvQ2hlY2sgXSApO1xuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGdldHRlcnMgZm9yIGFsbCB0aGUgY2FsY3VsYXRlZCBmaWVsZHMgYW5kIHZhbHVlIG9uIHRoZSBlbnRpdHkuXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59ZmllbGRzQW5kVmFsdWVzXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRDYWxjdWxhdGVkRmllbGRBbmRWYWx1ZXMgPSAoIGluc3RhbmNlLCBmaWVsZHNBbmRWYWx1ZXMgKSA9PiB7XG5cdGZvckVhY2goIGZpZWxkc0FuZFZhbHVlcywgKCBjYWxjdWxhdGVkRmllbGRWYWx1ZSwgY2FsY3VsYXRlZEZpZWxkTmFtZSApID0+IHtcblx0XHRpZiAoIGNhbGN1bGF0ZWRGaWVsZE5hbWUgIT09ICdfcHJvdGVjdGVkJyApIHtcblx0XHRcdGNyZWF0ZUdldHRlcihcblx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdGNhbWVsQ2FzZSggY2FsY3VsYXRlZEZpZWxkTmFtZSApLFxuXHRcdFx0XHRjYWxjdWxhdGVkRmllbGRWYWx1ZVxuXHRcdFx0KTtcblx0XHR9XG5cdH0gKTtcblx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoXG5cdFx0aW5zdGFuY2UsXG5cdFx0J2hhc0NhbGN1bGF0ZWRGaWVsZCcsXG5cdFx0aGFzQ2FsY3VsYXRlZEZpZWxkQ2FsbGJhY2tcblx0KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGdldHRlcnMgZm9yIHRoZSB2YXJpb3VzIHJlc291cmNlIGxpbmtzIG9uIHRoZSBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fWZpZWxkc0FuZFZhbHVlc1xuICovXG5leHBvcnQgY29uc3Qgc2V0UmVzb3VyY2VzID0gKCBpbnN0YW5jZSwgZmllbGRzQW5kVmFsdWVzICkgPT4ge1xuXHRjb25zdCByZWxhdGlvbnMgPSBbXTtcblx0bGV0IHJlbGF0aW9uTmFtZTtcblx0Zm9yRWFjaCggZmllbGRzQW5kVmFsdWVzLCAoIHJlc291cmNlVmFsdWUsIHJlc291cmNlTmFtZSApID0+IHtcblx0XHRpZiAoIHJlc291cmNlTmFtZSA9PT0gJ3NlbGYnICkge1xuXHRcdFx0Y3JlYXRlR2V0dGVyKCBpbnN0YW5jZSwgJ3Jlc291cmNlTGluaycsIHJlc291cmNlVmFsdWVbIDAgXS5ocmVmICk7XG5cdFx0fSBlbHNlIGlmICggcmVzb3VyY2VOYW1lID09PSAnY29sbGVjdGlvbicgKSB7XG5cdFx0XHRjcmVhdGVHZXR0ZXIoXG5cdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHQnY29sbGVjdGlvblJlc291cmNlTGluaycsXG5cdFx0XHRcdHJlc291cmNlVmFsdWVbIDAgXS5ocmVmXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZWxhdGlvbk5hbWUgPSBnZXRSZWxhdGlvbk5hbWVGcm9tTGluayggcmVzb3VyY2VOYW1lICk7XG5cdFx0XHRyZWxhdGlvbnMucHVzaCggcmVsYXRpb25OYW1lICk7XG5cdFx0XHRzZXRSZWxhdGlvbnNSZXNvdXJjZShcblx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdHJlbGF0aW9uTmFtZSArICdSZXNvdXJjZScsXG5cdFx0XHRcdHJlc291cmNlVmFsdWVcblx0XHRcdCk7XG5cdFx0fVxuXHR9ICk7XG5cdC8vc2V0IHJlbGF0aW9ucyBnZXR0ZXJcblx0Y3JlYXRlR2V0dGVyKCBpbnN0YW5jZSwgJ2dldFJlbGF0aW9ucycsIHJlbGF0aW9ucyApO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKHN0cmluZyk6IE9iamVjdH0gUmV0dXJucyB0aGUgY2FsbGJhY2sgZm9yIGdldHRpbmcgYVxuICogcmVsYXRpb24gcmVzb3VyY2VcbiAqL1xuY29uc3QgZ2V0UmVsYXRpb25SZXNvdXJjZUNhbGxiYWNrID0gKCBpbnN0YW5jZSApID0+XG5cdCggcmVsYXRpb25OYW1lICkgPT4gaW5zdGFuY2VbIHJlbGF0aW9uTmFtZS5yZXBsYWNlKCAnUmVzb3VyY2UnLCAnJyApIF07XG5cbi8qKlxuICogQ3JlYXRlcyBnZXR0ZXJzIGZvciB0aGUgcmVsYXRpb25zIHJlc291cmNlIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsIHN0cmluZz59IHJlc291cmNlSW5mb1xuICovXG5leHBvcnQgY29uc3Qgc2V0UmVsYXRpb25zUmVzb3VyY2UgPSAoXG5cdGluc3RhbmNlLFxuXHRyZWxhdGlvbk5hbWUsXG5cdHJlc291cmNlSW5mb1xuKSA9PiB7XG5cdGNyZWF0ZUdldHRlcihcblx0XHRpbnN0YW5jZSxcblx0XHRyZWxhdGlvbk5hbWUsXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VMaW5rOiByZXNvdXJjZUluZm9bIDAgXS5ocmVmLFxuXHRcdFx0c2luZ2xlOiByZXNvdXJjZUluZm9bIDAgXS5zaW5nbGUsXG5cdFx0fVxuXHQpO1xuXHRpZiAoIGlzVW5kZWZpbmVkKCBpbnN0YW5jZS5nZXRSZWxhdGlvblJlc291cmNlICkgKSB7XG5cdFx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoIGluc3RhbmNlLFxuXHRcdFx0J2dldFJlbGF0aW9uUmVzb3VyY2UnLFxuXHRcdFx0Z2V0UmVsYXRpb25SZXNvdXJjZUNhbGxiYWNrXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBpbnRlcm5hbCBzYXZlIHN0YXRlIHRvIHRoZSBnaXZlbiB2YWx1ZSB3aGVuIGN1cnJlbnQgc3RhdGUgaXNcbiAqIFNBVkVfU1RBVEUuY2xlYW4gb3RoZXJ3aXNlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBpcyByZXRhaW5lZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBzYXZlU3RhdGUgRXhwZWN0ZWQgdG8gYmUgb25lIG9mIFNBVkVfU1RBVEUgY29uc3RhbnQgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBvdmVycmlkZSBTZXQgdG8gdHJ1ZSB3aGVuIG92ZXJyaWRpbmcgdGhlIGRlZmF1bHQgbG9naWMgZm9yXG4gKiBzZXR0aW5nIHN0YXRlLiAgV2hlbiB0cnVlLCB0aGUgc2F2ZVN0YXRlIGlzIHNldCB0byB3aGF0ZXZlciB0aGUgaW5jb21pbmdcbiAqIHNhdmVTdGF0ZSB2YWx1ZSBpcy5cbiAqL1xuZXhwb3J0IGNvbnN0IHNldFNhdmVTdGF0ZSA9ICggaW5zdGFuY2UsIHNhdmVTdGF0ZSwgb3ZlcnJpZGUgPSBmYWxzZSApID0+IHtcblx0Y29uc3QgY3VycmVudFN0YXRlID0gaW5zdGFuY2VbIFBSSVZBVEVfUFJPUEVSVElFUy5TQVZFX1NUQVRFIF07XG5cdHN3aXRjaCAoIHNhdmVTdGF0ZSApIHtcblx0XHRjYXNlIFNBVkVfU1RBVEUuRElSVFk6XG5cdFx0Y2FzZSBTQVZFX1NUQVRFLk5FVzpcblx0XHRjYXNlIFNBVkVfU1RBVEUuQ0xFQU46XG5cdFx0XHRpZiAoIG92ZXJyaWRlICkge1xuXHRcdFx0XHRpbnN0YW5jZVsgUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEUgXSA9IHNhdmVTdGF0ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpbnN0YW5jZVsgUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEUgXSA9XG5cdFx0XHRcdGN1cnJlbnRTdGF0ZSA9PT0gU0FWRV9TVEFURS5DTEVBTiA/XG5cdFx0XHRcdFx0c2F2ZVN0YXRlIDpcblx0XHRcdFx0XHRjdXJyZW50U3RhdGU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudChcblx0XHRcdFx0J1NhdmUgc3RhdGUgZm9yIGVudGl0eSBjYW4gb25seSBiZSBzZXQgdG8gZWl0aGVyICcgK1xuXHRcdFx0XHQnU0FWRV9TVEFURS5ESVJUWSwgU0FWRV9TVEFURS5ORVcgb3IgU0FWRV9TVEFURS5DTEVBTidcblx0XHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQWRkIHRoZSBmaWVsZCBuYW1lIHRvIHRoZSBmaWVsZFRvUGVyc2lzdE9uSW5zZXJ0IHByb3BlcnR5IG9uIHRoZSBpbnN0YW5jZVxuICogaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICovXG5leHBvcnQgY29uc3Qgc2V0RmllbGRUb1BlcnNpc3QgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUgKSA9PiB7XG5cdGlmICggaW5zdGFuY2UuZmllbGRzVG9QZXJzaXN0T25JbnNlcnQgKSB7XG5cdFx0aW5zdGFuY2UuZmllbGRzVG9QZXJzaXN0T25JbnNlcnQuYWRkKCBmaWVsZE5hbWUgKTtcblx0fVxufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRpc1BsYWluT2JqZWN0LFxuXHRjYW1lbENhc2UsXG5cdGxhc3QsXG5cdHBpY2ssXG5cdHBpY2tCeSxcblx0aXNBcnJheSxcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGluc3RhbmNlT2YgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdE1vbmV5LFxuXHRTaXRlQ3VycmVuY3ksXG5cdFNlcnZlckRhdGVUaW1lIGFzIERhdGVUaW1lLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWx1ZS1vYmplY3RzJztcblxuaW1wb3J0IHsgcGx1cmFsTW9kZWxOYW1lIH0gZnJvbSAnLi4vbW9kZWwtbmFtZXMnO1xuXG5pbXBvcnQge1xuXHRoYXNSYXdQcm9wZXJ0eSxcblx0aGFzUHJldHR5UHJvcGVydHksXG5cdGhhc1JlbmRlcmVkUHJvcGVydHksXG5cdGlzRGF0ZVRpbWVGaWVsZCxcblx0aXNNb25leUZpZWxkLFxuXHRpc1ByaW1hcnlLZXlGaWVsZCxcblx0aXNFbnRpdHlGaWVsZCxcbn0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQgeyB2YWxpZGF0ZVR5cGVGb3JGaWVsZCB9IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5pbXBvcnQgeyBWQUxJREFURV9UWVBFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIFRoaXMgcmVjZWl2ZXMgYSBmaWVsZCBuYW1lLCBpdCdzIHZhbHVlIGFuZCB0aGUgc2NoZW1hIGFuZCBjb252ZXJ0cyBpdCB0byB0aGVcbiAqIHJlbGF0ZWQgdmFsdWUgb2JqZWN0IElGIHRoZSBzY2hlbWEgaW5kaWNhdGVzIGl0IGlzIG9mIGEgdHlwZSB0aGF0IHRoZXJlIGlzIGFcbiAqIGtub3duIHZhbHVlIG9iamVjdCBmb3IuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtEYXRlVGltZXxNb25leXwqfSAgSWYgdGhpcyBpcyBub3QgYSB2YWx1ZSBvYmplY3QsIHRoZSBvcmlnaW5hbCBmaWVsZFxuICogdmFsdWUgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBtYXliZUNvbnZlcnRUb1ZhbHVlT2JqZWN0ID0gKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIHNjaGVtYSApID0+IHtcblx0aWYgKFxuXHRcdGlzRGF0ZVRpbWVGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSAmJlxuXHRcdCEgRGF0ZVRpbWUudmFsaWRhdGVJc0RhdGVUaW1lKCBmaWVsZFZhbHVlIClcblx0KSB7XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21JU08oIGZpZWxkVmFsdWUgKTtcblx0fVxuXHRpZiAoXG5cdFx0aXNNb25leUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApICYmXG5cdFx0ISAoIGluc3RhbmNlT2YoIGZpZWxkVmFsdWUsICdNb25leScgKSApXG5cdCkge1xuXHRcdHJldHVybiBuZXcgTW9uZXkoIGZpZWxkVmFsdWUsIFNpdGVDdXJyZW5jeSApO1xuXHR9XG5cdC8vIGlmIG1vcmUgVk9zIGdldCBhZGRlZCwgdGhlbiBpbnN0ZWFkIG9mIGFkZGluZyBtb3JlIGlmIGVsc2UgYmxvY2tzXG5cdC8vIHRvIHRoaXMgZnVuY3Rpb24gYW5kIHRoZSBvbmVzIGJlbG93LCBhbGwgVk8gbG9naWMgc2hvdWxkIGJlIGV4dHJhY3RlZFxuXHQvLyBpbnRvIHNvbWUga2luZCBvZiAgVmFsdWVPYmplY3RFeHRyYWN0b3Igb2JqZWN0IHRoYXQgd291bGQgaG9sZCBhbGwgb2Zcblx0Ly8gdGhlIG5lY2Vzc2FyeSBjYWxsYmFja3MgZm9yIG1hbmFnaW5nIHRoZSBkZXRlY3Rpb24gb2YgVk8gZmllbGRzIGFuZFxuXHQvLyBjb252ZXJzaW9uIG9mIGRhdGEgdG8gYW5kIGZyb20gdGhlIHZhcmlvdXMgVk9zXG5cdC8vIHBseiBzZWU6XG5cdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ldmVudGVzcHJlc3NvL2V2ZW50LWVzcHJlc3NvLWNvcmUvcHVsbC82MzcvZmlsZXMjcjIyODY5MDc4OVxuXHRyZXR1cm4gZmllbGRWYWx1ZTtcbn07XG5cbi8qKlxuICogVGhpcyBjb252ZXJ0cyB0aGUgaW5jb21pbmcgdmFsdWUgZm9yIGEgZmllbGQgdG8gaXRzIGVxdWl2YWxlbnQgXCJyYXdcIiB2YWx1ZVxuICogZnJvbSBhIHZhbHVlIG9iamVjdCBpZiBpdCBpcyBhIHZhbHVlIG9iamVjdC4gIE90aGVyd2lzZSBpdCBqdXN0IHJldHVybnMgdGhlXG4gKiBvcmlnaW5hbCBpbmNvbWluZyB2YWx1ZS4gIFRoaXMgYWxzbyBhc3NlcnRzIHRoYXQgaWYgdGhlIHByb3ZpZGVkIGZpZWxkIGlzXG4gKiBleHBlY3RlZCB0byBiZSBhIHZhbHVlIG9iamVjdCB0aGF0IHRoZSBpbmNvbWluZyB2YWx1ZSBJUyBhIHZhbGlkIHZhbHVlIG9iamVjdFxuICogYW5kIGl0IGlzIHRoZSBleHBlY3RlZCBpbnN0YW5jZSBvZiBhIHZhbHVlIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp8TW9uZXl8RGF0ZVRpbWV9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge3N0cmluZ3xudW1iZXJ8Kn0gIElmIHRoZSB2YWx1ZSBpcyBub3QgYSB2YWx1ZSBvYmplY3QsIHJldHVybnMgdGhlXG4gKiBvcmlnaW5hbCB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMgPSAoXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0c2NoZW1hXG4pID0+IHtcblx0aWYgKCBpc0RhdGVUaW1lRmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgKSB7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0SXNEYXRlVGltZSggZmllbGRWYWx1ZSApO1xuXHRcdGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLnRvSVNPKCk7XG5cdH0gZWxzZSBpZiAoIGlzTW9uZXlGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHRNb25leS5hc3NlcnRNb25leSggZmllbGRWYWx1ZSApO1xuXHRcdGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLnRvTnVtYmVyKCk7XG5cdH1cblx0cmV0dXJuIGZpZWxkVmFsdWU7XG59O1xuXG4vKipcbiAqIFRoaXMgY29udmVydHMgdGhlIGluY29taW5nIHZhbHVlIGZvciBhIGZpZWxkIHRvIGl0cyBlcXVpdmFsZW50IFwicmF3XCIgdmFsdWVcbiAqIGlmIHRoZSBpbmNvbWluZyB2YWx1ZSAgaXMgYSB2YWx1ZSBvYmplY3QuICBPdGhlcndpc2UgaXQganVzdCByZXR1cm5zIHRoZVxuICogb3JpZ2luYWwgaW5jb21pbmcgdmFsdWUuXG4gKlxuICogQHBhcmFtIHsqfERhdGVUaW1lfE1vbmV5fWZpZWxkVmFsdWVcbiAqIEByZXR1cm4geyp9IFRoZSByYXcgdmFsdWUgZm9yIHRoZSB2YWx1ZSBvYmplY3Qgb3IgdGhlIG9yaWdpbmFsIHZhbHVlLlxuICovXG5leHBvcnQgY29uc3QgbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0ID0gKCBmaWVsZFZhbHVlICkgPT4ge1xuXHRpZiAoIERhdGVUaW1lLnZhbGlkYXRlSXNEYXRlVGltZSggZmllbGRWYWx1ZSApICkge1xuXHRcdGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLnRvSVNPKCk7XG5cdH0gZWxzZSBpZiAoIGluc3RhbmNlT2YoIGZpZWxkVmFsdWUsICdNb25leScgKSApIHtcblx0XHRmaWVsZFZhbHVlID0gZmllbGRWYWx1ZS50b051bWJlcigpO1xuXHR9XG5cdHJldHVybiBmaWVsZFZhbHVlO1xufTtcblxuLyoqXG4gKiBUaGlzIGRlcml2ZXMgdGhlIFwicHJlcGFyZWRcIiB2YWx1ZSBmb3IgdGhlIGdpdmVuIGZpZWxkIGFuZCB2YWx1ZS5cbiAqXG4gKiBcIlByZXBhcmVkXCIgbWVhbnM6XG4gKlxuICogLSBjb252ZXJ0aW5nIHRvIGEgdmFsdWUgb2JqZWN0IGlmIHRoaXMgaXMgYSBmaWVsZCB0aGF0IHRoZXJlIGFyZSBkZWZpbmVkXG4gKiAgIHZhbHVlIG9iamVjdHMgZm9yLlxuICogLSByZXRyaWV2aW5nIHRoZSBcInJhd1wiIHZhbHVlIGZyb20gZmllbGQgdmFsdWVzIHRoYXQgaGF2ZSBgcmF3YCBhbmQgYHJlbmRlcmVkYFxuICogICBvciBgcHJldHR5YCBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gIGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7RGF0ZVRpbWV8TW9uZXl8Kn0gIFJldHVybnMgdGhlIG9yaWdpbmFsIGluY29taW5nIHZhbHVlIGlmIGl0IGRvZXNcbiAqIG5vdCBoYXZlIGEgcmF3IGVxdWl2YWxlbnQgb3IgaXMgbm90IGEgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY29uc3QgZGVyaXZlUHJlcGFyZWRWYWx1ZUZvckZpZWxkID0gKFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdGluc3RhbmNlXG4pID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvblR5cGUgPSB2YWxpZGF0ZVR5cGVGb3JGaWVsZCggZmllbGROYW1lLCBpbnN0YW5jZSApO1xuXHRmaWVsZFZhbHVlID0gaXNQbGFpbk9iamVjdCggZmllbGRWYWx1ZSApID9cblx0XHRmaWVsZFZhbHVlWyB2YWxpZGF0aW9uVHlwZSBdIDpcblx0XHRmaWVsZFZhbHVlO1xuXHRyZXR1cm4gbWF5YmVDb252ZXJ0VG9WYWx1ZU9iamVjdCggZmllbGROYW1lLCBmaWVsZFZhbHVlLCBpbnN0YW5jZS5zY2hlbWEgKTtcbn07XG5cbi8qKlxuICogVGhpcyByZXR1cm5zIHRoZSBcInJlbmRlcmVkXCIgb3IgXCJwcmV0dHlcIiBlcXVpdmFsZW50IGZyb20gYSB2YWx1ZSBpZiBpdCBleGlzdHNcbiAqIGFzIGEgcHJvcGVydHkgb24gaXQuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Kn0gIFRoZSBvcmlnaW5hbCB2YWx1ZSBpcyByZXR1cm5lZCBpZiBpdHMgbm90IGEgcGxhaW4gb2JqZWN0IG9yIGlmXG4gKiBpdCBoYXMgbm8gYHJlbmRlcmVkYCBvciBgcHJldHR5YCBwcm9wZXJ0eS4gIEhvd2V2ZXIsIGlmIGl0IGlzIGEgcGxhaW4gb2JqZWN0XG4gKiBhbmQgaGFzIG5vIHByZXR0eS9yZW5kZXJlZCBwcm9wZXJ0aWVzIGJ1dCBET0VTIGhhdmUgYSByYXcgcHJvcGVydHksIHRoZW4gdGhhdFxuICogaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBkZXJpdmVSZW5kZXJlZFZhbHVlID0gKCB2YWx1ZSApID0+IHtcblx0aWYgKCAhIGlzUGxhaW5PYmplY3QoIHZhbHVlICkgKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhbHVlID0gaGFzUHJldHR5UHJvcGVydHkoIHZhbHVlICkgPyB2YWx1ZS5wcmV0dHkgOiB2YWx1ZTtcblx0dmFsdWUgPSBoYXNSZW5kZXJlZFByb3BlcnR5KCB2YWx1ZSApID8gdmFsdWUucmVuZGVyZWQgOiB2YWx1ZTtcblx0cmV0dXJuIGhhc1Jhd1Byb3BlcnR5KCB2YWx1ZSApID8gdmFsdWUucmF3IDogdmFsdWU7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG5hbWUgb2YgYSByZXNvdXJjZSBmcm9tIHRoZSBnaXZlbiBgcmVzb3VyY2VMaW5rYC5cbiAqXG4gKiBlZy4gXCJodHRwczovL2FwaS5ldmVudGVzcHJlc3NvLmNvbS9yZWdpc3RyYXRpb25cIiB3aWxsIHJldHVybiAncmVnaXN0cmF0aW9uJztcblxuICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlTGlua1xuICogQHJldHVybiB7c3RyaW5nfSBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSByZXNvdXJjZSBmcm9tIGEgcHJvdmlkZWQgcmVzb3VyY2VcbiAqIGxpbmsuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSZWxhdGlvbk5hbWVGcm9tTGluayA9ICggcmVzb3VyY2VMaW5rICkgPT4ge1xuXHRyZXR1cm4gcGx1cmFsTW9kZWxOYW1lKCBjYW1lbENhc2UoIGxhc3QoIHJlc291cmNlTGluay5zcGxpdCggJy8nICkgKSApICk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwbGFpbiBvYmplY3QgY29udGFpbmluZyB0aGUgZW50aXR5IGZpZWxkIG5hbWVzIGFuZCB2YWx1ZXMgZnJvbSB0aGVcbiAqIHByb3ZpZGVkIGVudGl0eSBpbnN0YW5jZS4gIFRoZSB2YWx1ZXMgYXJlIG5vdCBwcmVwYXJlZCBhbmQgbWF0Y2ggZXhhY3RseSB3aGF0XG4gKiBpcyBjdXJyZW50bHkgc2V0IG9uIHRoaXMgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gZW50aXR5SW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgcGxhaW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyA9ICggZW50aXR5SW5zdGFuY2UgKSA9PiB7XG5cdHJldHVybiBPYmplY3Qua2V5cyggZW50aXR5SW5zdGFuY2UgKS5yZWR1Y2UoIChcblx0XHRmaWVsZHNBbmRWYWx1ZXMsXG5cdFx0ZmllbGROYW1lXG5cdCkgPT4ge1xuXHRcdGlmIChcblx0XHRcdGlzRW50aXR5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hICkgJiZcblx0XHRcdCEgaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hIClcblx0XHQpIHtcblx0XHRcdGZpZWxkc0FuZFZhbHVlc1sgZmllbGROYW1lIF0gPSBlbnRpdHlJbnN0YW5jZVsgZmllbGROYW1lIF07XG5cdFx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHR9LCB7fSApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGVudGl0eSBmaWVsZCBuYW1lIGFuZCB2YWx1ZXMgZnJvbSB0aGVcbiAqIHByb3ZpZGVkIGVudGl0eSBpbnN0YW5jZVxuICogQHBhcmFtIHtPYmplY3R9IGVudGl0eUluc3RhbmNlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZvckluc2VydCAgV2hldGhlciB0byByZXR1cm4gdGhlIGZpZWxkcyBhbmQgdmFsdWVzIGZvclxuICogaW5zZXJ0IG9yIGZvciB1cGRhdGUuXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgcGxhaW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yUGVyc2lzdGluZyA9IChcblx0ZW50aXR5SW5zdGFuY2UsXG5cdGZvckluc2VydCA9IGZhbHNlXG4pID0+IHtcblx0Y29uc3QgaXRlcmF0b3IgPSBmb3JJbnNlcnQgP1xuXHRcdEFycmF5LmZyb20oIGVudGl0eUluc3RhbmNlLmZpZWxkc1RvUGVyc2lzdE9uSW5zZXJ0LnZhbHVlcygpICkgOlxuXHRcdE9iamVjdC5rZXlzKCBlbnRpdHlJbnN0YW5jZSApO1xuXG5cdHJldHVybiBpdGVyYXRvci5yZWR1Y2UoIChcblx0XHRmaWVsZHNBbmRWYWx1ZXMsXG5cdFx0ZmllbGROYW1lXG5cdCkgPT4ge1xuXHRcdGlmIChcblx0XHRcdGlzRW50aXR5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hICkgJiZcblx0XHRcdCEgaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hIClcblx0XHQpIHtcblx0XHRcdGZpZWxkc0FuZFZhbHVlc1sgZmllbGROYW1lIF0gPSBtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3QoXG5cdFx0XHRcdGVudGl0eUluc3RhbmNlWyBmaWVsZE5hbWUgXSxcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHR9LCB7fSApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwcmltYXJ5IGtleShzKSBhbmQgdmFsdWVzIGZvciB0aGUgZ2l2ZW4gZW50aXR5SW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZW50aXR5SW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gYW4gYXJyYXkgb2YgdmFsdWVzIGZvciB0aGUgcHJpbWFyeSBrZXlzLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UHJpbWFyeUtleVZhbHVlcyA9ICggZW50aXR5SW5zdGFuY2UgKSA9PiBwaWNrKFxuXHRlbnRpdHlJbnN0YW5jZSxcblx0ZW50aXR5SW5zdGFuY2UucHJpbWFyeUtleXNcbik7XG5cbi8qKlxuICogVGhpcyByZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIGVudGl0eSBmaWVsZHMgZnJvbSB0aGUgc2NoZW1hIGZvciB0aGUgZW50aXR5XG4gKiBpbnN0YW5jZSAoc2NoZW1hIGZvciBmaWVsZHMgYXJlIGV4dHJhY3RlZCBhcyB3ZWxsKS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZW50aXR5SW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gQSBwbGFpbiBvYmplY3Qgd2l0aCBmaWVsZHMgYW5kIHNjaGVtYSBwcm9wZXJ0aWVzIHRoYXQgYXJlXG4gKiBlbnRpdHkgcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVudGl0eUZpZWxkc0Zyb21TY2hlbWEgPSAoIGVudGl0eUluc3RhbmNlICkgPT4gcGlja0J5KFxuXHRlbnRpdHlJbnN0YW5jZS5zY2hlbWEsXG5cdCggZmllbGRWYWx1ZSwgZmllbGROYW1lICkgPT4gaXNFbnRpdHlGaWVsZChcblx0XHRmaWVsZE5hbWUsXG5cdFx0ZW50aXR5SW5zdGFuY2Uuc2NoZW1hXG5cdClcbik7XG5cbi8qKlxuICogVGhpcyByZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIGV4dHJhY3RlZCBwcmltYXJ5S2V5IGZpZWxkcyBmcm9tIHRoZSBzY2hlbWFcbiAqIGZvciB0aGUgZW50aXR5IGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbnRpdHlJbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBBIHBsYWluIG9iamVjdCB3aXRoIGZpZWxkcyBhbmQgc2NoZW1hIHByb3BlcnRpZXMgdGhhdFxuICogXHRcdFx0XHRcdHJlcHJlc2VudCBwcmltYXJ5IGtleSBmaWVsZHMuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmltYXJ5S2V5RmllbGRzRnJvbVNjaGVtYSA9ICggZW50aXR5SW5zdGFuY2UgKSA9PiBwaWNrQnkoXG5cdGVudGl0eUluc3RhbmNlLnNjaGVtYSxcblx0KCBmaWVsZFZhbHVlLCBmaWVsZE5hbWUgKSA9PiBpc1ByaW1hcnlLZXlGaWVsZChcblx0XHRmaWVsZE5hbWUsXG5cdFx0ZW50aXR5SW5zdGFuY2Uuc2NoZW1hXG5cdClcbik7XG5cbi8qKlxuICogRGVyaXZlcyB0aGUgZGVmYXVsdCB2YWx1ZSB0byB1c2UgZm9yIGEgZ2l2ZW4gdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHJldHVybiB7Kn0gIEEgdmFsdWUgdG8gdXNlIGZvciB0aGUgZ2l2ZW4gdHlwZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlcml2ZURlZmF1bHRWYWx1ZUZvclR5cGUgPSAoIHR5cGUgKSA9PiB7XG5cdGlmICggaXNBcnJheSggdHlwZSApICkge1xuXHRcdHJldHVybiB0eXBlLmluZGV4T2YoICdudWxsJyApID4gLTEgP1xuXHRcdFx0bnVsbCA6XG5cdFx0XHRkZXJpdmVEZWZhdWx0VmFsdWVGb3JUeXBlKCB0eXBlWyAwIF0gKTtcblx0fVxuXHRzd2l0Y2ggKCB0eXBlICkge1xuXHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0Y2FzZSAnbnVtYmVyJzpcblx0XHRjYXNlICdpbnRlZ2VyJzpcblx0XHRcdHJldHVybiAwO1xuXHRcdGNhc2UgJ251bGwnOlxuXHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRjYXNlICdib29sZWFuJzpcblx0XHRjYXNlICdib29sJzpcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRjYXNlICdkYXRlLXRpbWUnOlxuXHRcdFx0cmV0dXJuICggbmV3IERhdGUoKSApLnRvSVNPU3RyaW5nKCk7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIERlcml2ZXMgd2hhdCBgdHlwZWAgYSBmaWVsZCBpcyBmcm9tIHRoZSBzY2hlbWEuXG4gKiBJdCBhY2NvdW50cyBmb3IgY2FzZXMgd2hlcmUgdGhlIFwidHlwZVwiIG9mIGEgZmllbGQgbWlnaHQgYmUgYGRhdGUtdGltZWAgb3JcbiAqIHdoZXJlIHRoZSB0eXBlIGlzIGFuIG9iamVjdCBhbmQgdGh1cyB0aGUgYHR5cGVgIGZvciB0aGUgcHVycG9zZXMgb2YgbW9kZWxcbiAqIGVudGl0aWVzIGlzIGRlZmluZWQgYnkgdGhlIGByYXdgIHByb3BlcnR5IGZvciB0aGUgZmllbGQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Kn0gIFdoYXQgdHlwZSB0aGUgZmlsZWQgaXMuXG4gKi9cbmV4cG9ydCBjb25zdCBkZXJpdmVUeXBlRm9yRmllbGQgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT4ge1xuXHRpZiAoIGlzRGF0ZVRpbWVGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHRyZXR1cm4gJ2RhdGUtdGltZSc7XG5cdH1cblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdICYmIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSApIHtcblx0XHRpZiAoIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcyAmJlxuXHRcdFx0XHRoYXNSYXdQcm9wZXJ0eSggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzIClcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy50eXBlID9cblx0XHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LnR5cGUgOlxuXHRcdFx0XHRcdG51bGw7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogVGhpcyBkZXJpdmVzIHRoZSB2YWxpZGF0ZSB0eXBlIGZyb20gdGhlIGluY29taW5nIGZpZWxkIGFuZCB2YWx1ZSBhY2NvcmRpbmdcbiAqIHRvIHRoZSBzY2hlbWEgYW5kIGluY29taW5nIHZhbHVlLlxuICpcbiAqIFRoaXMgYWNjb3VudHMgZm9yIHRoZSBmYWN0IHRoYXQgZW50aXRpZXMgbWF5IGJlIGNvbnN0cnVjdGVkIGZyb20gdGhlXG4gKiBmb2xsb3dpbmcgY29udGV4dHM6XG4gKlxuICogMS4gQXV0aGVkIFJFU1QgcmVzcG9uc2UgKHdoaWNoIGNvdWxkIGhhdmUgYm90aCByYXcsIHJlbmRlcmVkIG9yIHByZXR0eVxuICogICAgdmFsdWVzIGluIHRoZSBmaWVsZCB2YWx1ZSkuXG4gKiAyLiBOb24tYXV0aGVkIFJFU1QgcmVzcG9uc2UgKHdoaWNoIHdpbGwgbm90IGhhdmUgYSByYXcgdmFsdWUsIGJ1dCBjb3VsZCBoYXZlXG4gKiAgICBhIHByZXR0eSBvciByZW5kZXJlZCB2YWx1ZSkuICBUaGlzIGlzIHBvdGVudGlhbGx5IHByb2JsZW1hdGljIGlmIHRoZVxuICogICAgcmVuZGVyZWQgb3IgcHJldHR5IHZhbHVlIGlzIG9mIGEgZGlmZmVyZW50IGRhdGEgdHlwZSB0aGFuIHRoZSByYXcgdmFsdWUuXG4gKiAzLiBOZXcgZW50aXRpZXMgYnVpbHQgY2xpZW50IHNpZGUsIHdoaWNoIHdpbGwgYmUgYXNzdW1lZCB0byBiZSBwcmVwYXJlZFxuICogICAgYWdhaW5zdCB0aGUgXCJyYXdcIiB2YWxpZGF0ZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7U3ltYm9sfSAgVGhlIHZhbGlkYXRlIHR5cGUgZm9yIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlcml2ZVZhbGlkYXRlVHlwZUZvckZpZWxkID0gKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIHNjaGVtYSApID0+IHtcblx0aWYgKCBoYXNSYXdQcm9wZXJ0eSggZmllbGRWYWx1ZSApICkge1xuXHRcdHJldHVybiBWQUxJREFURV9UWVBFLlJBVztcblx0fVxuXHRpZiAoIHNjaGVtYVsgZmllbGROYW1lIF0gJiYgc2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlICkge1xuXHRcdGlmIChcblx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdGlzUGxhaW5PYmplY3QoIGZpZWxkVmFsdWUgKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGhhc1JlbmRlcmVkUHJvcGVydHkoIGZpZWxkVmFsdWUgKSA/XG5cdFx0XHRcdFZBTElEQVRFX1RZUEUuUkVOREVSRUQgOlxuXHRcdFx0XHRWQUxJREFURV9UWVBFLlBSRVRUWTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIFZBTElEQVRFX1RZUEUuUkFXO1xufTtcblxuLyoqXG4gKiBUaGlzIGdldHMgdGhlIGRlZmF1bHQgdmFsdWUgZm9yIGEgZmllbGQgZnJvbSB0aGUgcHJvdmlkZWQgc2NoZW1hLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4geyp9IFRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGUgZmllbGQgZnJvbSB0aGUgc2NoZW1hIG9yIGlmIG5vdFxuICogcHJlc2VudCBpbiB0aGUgc2NoZW1hLCBhIGRlcml2ZWQgZGVmYXVsdCB2YWx1ZSBmcm9tIHRoZSBzY2hlbWEgdHlwZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldERlZmF1bHRWYWx1ZUZvckZpZWxkID0gKCBmaWVsZE5hbWUsIHNjaGVtYSApID0+IHtcblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkge1xuXHRcdHJldHVybiBzY2hlbWFbIGZpZWxkTmFtZSBdLmRlZmF1bHQgP1xuXHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5kZWZhdWx0IDpcblx0XHRcdGRlcml2ZURlZmF1bHRWYWx1ZUZvclR5cGUoIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSApO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcbiIsImV4cG9ydCB7IEJhc2VFbnRpdHksIGRlZmF1bHQgYXMgY3JlYXRlRW50aXR5RmFjdG9yeSB9IGZyb20gJy4vYmFzZS1lbnRpdHknO1xuZXhwb3J0IHsgTU9ERUxfUFJFRklYRVMsIFNBVkVfU1RBVEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0aXNBcnJheSxcblx0aXNJbnRlZ2VyLFxuXHRpc1N0cmluZyxcblx0aXNQbGFpbk9iamVjdCxcblx0aXNCb29sZWFuLFxuXHRpc051bWJlcixcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHNwcmludGYgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcblxuLyoqXG4gKiBJbnRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzRW51bUZpZWxkLCBpc1ByaW1hcnlLZXlGaWVsZCwgaXNWYWx1ZU9iamVjdEZpZWxkIH0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQgeyBtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3RXaXRoQXNzZXJ0aW9ucyB9IGZyb20gJy4vZXh0cmFjdG9ycyc7XG5pbXBvcnQgeyBQUklWQVRFX1BST1BFUlRJRVMsIFZBTElEQVRFX1RZUEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoZSBpbmNvbWluZyB2YWx1ZSBmb3IgZ2l2ZW4gdHlwZS4gIFR5cGVzIGFsbG93ZWQgYXJlOlxuICpcbiAqIC0gaW50ZWdlcjogY2hlY2tzIGlmIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiAtIG51bWJlcjogY2hlY2tzIGlmIHZhbHVlIGlzIGNsYXNzaWZpZWQgYXMgYSBOdW1iZXIgcHJpbWl0aXZlIG9yIG9iamVjdCAodGhpc1xuICogICBtZWFucyBgSW5maW5pdHlgLCBgLUluZmluaXR5YCwgYW5kIGBOYU5gIGFyZSBjb25zaWRlcmVkIHZhbGlkIGZvciB0aGlzIHR5cGVcbiAqIC0gc3RyaW5nXG4gKiAtIG9iamVjdCAtIHRoaXMgdmFsaWRhdGVzIGFzIGEgXCJwbGFpbk9iamVjdFwiLCB0aGF0IGlzIGFuIG9iamVjdCBjcmVhdGVkIGJ5XG4gKiAgIHRoZSBPYmplY3QgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBbW1Byb3RvdHlwZV1dIG9mIG51bGwuXG4gKiAtIGJvb2xlYW5cbiAqIC0gYm9vbDogKHNhbWUgYXMgYm9vbGVhbiBjaGVjaylcbiAqIC0gbnVsbDogdmFsdWUgbXVzdCBleHBsaWNpdGx5IGJlIGBudWxsYFxuICpcbiAqIE5vdGU6IGlmIHRoZSBwYXNzZWQgaW4gdHlwZSBkb2VzIG5vdCBleGlzdCwgdGhlbiB0aGUgdmFsdWUgaXMgY29uc2lkZXJlZFxuICogaW52YWxpZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0gdHlwZSAgVGhlIHR5cGUgb3IgdHlwZXMgdG8gY2hlY2tcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgIFRoZSB2YWx1ZSBiZWluZyB2YWxpZGF0ZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoZSB2YWx1ZSBpcyB2YWxpZCBmb3IgdGhlIGdpdmVuIHR5cGUuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVR5cGUgPSAoIHR5cGUsIHZhbHVlICkgPT4ge1xuXHRsZXQgdmFsaWQgPSBmYWxzZTtcblx0Ly8gYWNjb3VudCBmb3IgdHlwZSBkZWZpbml0aW9ucyB0aGF0IGFyZSBhbiBhcnJheSBvZiBhbGxvd2VkIHR5cGVzLlxuXHRpZiAoIGlzQXJyYXkoIHR5cGUgKSApIHtcblx0XHRmb3IgKCBjb25zdCBzaW5nbGVUeXBlIG9mIHR5cGUgKSB7XG5cdFx0XHR2YWxpZCA9IHZhbGlkYXRlVHlwZSggc2luZ2xlVHlwZSwgdmFsdWUgKTtcblx0XHRcdGlmICggdmFsaWQgKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyByZXR1cm4gcmlnaHQgYXdheSBiZWNhdXNlIHdlJ3ZlIGRldGVybWluZWQgdGhlIHZhbGlkaXR5IG9mIHRoZSB0eXBlLlxuXHRcdHJldHVybiB2YWxpZDtcblx0fVxuXHRzd2l0Y2ggKCB0eXBlICkge1xuXHRcdGNhc2UgJ2ludGVnZXInOlxuXHRcdFx0dmFsaWQgPSBpc0ludGVnZXIoIHZhbHVlICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdudW1iZXInOlxuXHRcdFx0dmFsaWQgPSBpc051bWJlciggdmFsdWUgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHR2YWxpZCA9IGlzU3RyaW5nKCB2YWx1ZSApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdHZhbGlkID0gaXNQbGFpbk9iamVjdCggdmFsdWUgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2Jvb2xlYW4nOlxuXHRcdGNhc2UgJ2Jvb2wnOlxuXHRcdFx0dmFsaWQgPSBpc0Jvb2xlYW4oIHZhbHVlICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdudWxsJzpcblx0XHRcdHZhbGlkID0gdmFsdWUgPT09IG51bGw7XG5cdFx0XHRicmVhaztcblx0fVxuXHRyZXR1cm4gdmFsaWQ7XG59O1xuXG4vKipcbiAqIFRoaXMgdmFsaWRhdGVzIGVudW0gdHlwZSBvZiB2YWx1ZXMuXG4gKlxuICogVGhpcyBtZWFucyB0aGF0IHRoZSB2YWx1ZSBtdXN0IGJlIG9uZSBvZiB0aGUgcHJvdmlkZWQgYXJyYXkgb2YgZW51bVZhbHVlcyBhc1xuICogd2VsbCBhcyBiZWluZyBvZiB0aGUgZXhwZWN0ZWQgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtBcnJheX0gZW51bVZhbHVlc1xuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhpcyB2YWx1ZSBpcyB2YWxpZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRW51bVR5cGUgPSAoIHR5cGUsIGVudW1WYWx1ZXMsIHZhbHVlICkgPT4ge1xuXHRyZXR1cm4gdmFsaWRhdGVUeXBlKCB0eXBlLCB2YWx1ZSApICYmXG5cdFx0aXNBcnJheSggZW51bVZhbHVlcyApICYmXG5cdFx0ZW51bVZhbHVlcy5pbmRleE9mKCB2YWx1ZSApID4gLTE7XG59O1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGRvZXMgYSBzaGFsbG93IHZhbGlkYXRpb24gZm9yIHRoZSBnaXZlbiB2YWx1ZSBhbmQgZmllbGQuXG4gKlxuICogXCJTaGFsbG93XCIgaGVyZSBtZWFucyB0aGF0IGlmIHRoZSBmaWVsZCBzY2hlbWEgaXMgb2YgdHlwZSAnb2JqZWN0JywgdGhlbiB0aGVcbiAqIHZhbGlkYXRpb24gb25seSB2ZXJpZmllcyB0aGF0IHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuICBUaGUgb2JqZWN0IGNvbnRlbnRzXG4gKiBhcmUgbm90IHZhbGlkYXRlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhwZWN0VmFsdWVPYmplY3RzICBJZiB0cnVlLCB0aGVuIHRoaXMgZmxhZ3MgdGhlIHZhbGlkYXRvclxuICogdG8gYXNzdW1lIHRoZSB2YWx1ZSBtaWdodCBiZSBhIHZhbHVlIG9iamVjdCBhbmQgYXR0ZW1wdCB0byByZXRyaWV2ZSB0aGUgcmF3XG4gKiB2YWx1ZSBmcm9tIHRoYXQgdmFsdWUgb2JqZWN0IGZvciB2YWxpZGF0aW9uIGFnYWluc3QgdGhlIGV4cGVjdGVkIHR5cGUgaW4gdGhlXG4gKiBzY2hlbWEgZm9yIHRoYXQgZmllbGQuXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGUgdmFsdWUgaXMgdmFsaWQuXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICogQHRocm93cyBJbnZhbGlkRGF0ZVRpbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2hhbGxvd1ZhbGlkVmFsdWVGb3JGaWVsZCA9IChcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRzY2hlbWEsXG5cdGV4cGVjdFZhbHVlT2JqZWN0cyA9IHRydWVcbikgPT4ge1xuXHQvLyBpZiBmaWVsZCBpcyBhIHByaW1hcnkgS2V5IGZpZWxkIHRoZW4gd2Ugb3ZlcnJpZGUgdGhlIHZhbGlkYXRpb24gc28gaXQgY2FuXG5cdC8vIGJlIGVpdGhlciBzdHJpbmcgb3IgbnVtYmVyXG5cdGlmICggaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgKSB7XG5cdFx0cmV0dXJuIHZhbGlkYXRlVHlwZSggJ3N0cmluZycsIGZpZWxkVmFsdWUgKSB8fFxuXHRcdFx0dmFsaWRhdGVUeXBlKCAnbnVtYmVyJywgZmllbGRWYWx1ZSApO1xuXHR9XG5cdGNvbnN0IGlzRW51bSA9IGlzRW51bUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApO1xuXHRjb25zdCBpc1ZhbHVlT2JqZWN0ID0gaXNWYWx1ZU9iamVjdEZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApO1xuXHRmaWVsZFZhbHVlID0gZXhwZWN0VmFsdWVPYmplY3RzICYmIGlzVmFsdWVPYmplY3QgP1xuXHRcdG1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdFdpdGhBc3NlcnRpb25zKFxuXHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdHNjaGVtYVxuXHRcdCkgOlxuXHRcdGZpZWxkVmFsdWU7XG5cdGZpZWxkVmFsdWUgPSBleHBlY3RWYWx1ZU9iamVjdHMgJiZcblx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdGlzVmFsdWVPYmplY3QgP1xuXHRcdHsgcmF3OiBmaWVsZFZhbHVlIH0gOlxuXHRcdGZpZWxkVmFsdWU7XG5cdGNvbnN0IGlzVmFsaWQgPSBpc0VudW0gP1xuXHRcdHZhbGlkYXRlRW51bVR5cGUoXG5cdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUsXG5cdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLmVudW0sXG5cdFx0XHRmaWVsZFZhbHVlXG5cdFx0KSA6XG5cdFx0dmFsaWRhdGVUeXBlKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUsIGZpZWxkVmFsdWUgKTtcblx0Ly8gaWYgaXNFbnVtIGFuZCBub3QgdmFsaWQsIHRoZW4gbGV0cyBiYWlsIHdpdGggZXJyb3Jcblx0aWYgKCBpc0VudW0gJiYgISBpc1ZhbGlkICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHQnVGhlIGdpdmVuIFwiJXNcIiBmaWVsZE5hbWUgaXMgbm90IHZhbGlkIGZvciB0aGUgZGVmaW5lZCBzY2hlbWEuICBJdCBtdXN0IGJlIGEgXCIlc1wiIGFuZCBpdCBtdXN0IGJlIG9uZSBvZiBcIiVzXCIuIFRoZSBmaWVsZFZhbHVlIGdpdmVuIHdhcyBcIiVzXCInLFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0uZW51bS5qb2luKCksXG5cdFx0XHRcdGZpZWxkVmFsdWVcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cdHJldHVybiBpc1ZhbGlkO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoYXQgaXMgc2V0IGFzIHRoZSB2YWxpZGF0ZVR5cGUgZm9yIHRoZSBnaXZlbiBmaWVsZCBhbmQgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB2YWxpZGF0aW9uIHR5cGUgZm9yIHRoZSBnaXZlbiBmaWVsZCBhbmQgaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVR5cGVGb3JGaWVsZCA9ICggZmllbGROYW1lLCBpbnN0YW5jZSApID0+IHtcblx0cmV0dXJuIGluc3RhbmNlWyBQUklWQVRFX1BST1BFUlRJRVMuVkFMSURBVEVfVFlQRVMgXVsgZmllbGROYW1lIF0gP1xuXHRcdGluc3RhbmNlWyBQUklWQVRFX1BST1BFUlRJRVMuVkFMSURBVEVfVFlQRVMgXVsgZmllbGROYW1lIF0gOlxuXHRcdFZBTElEQVRFX1RZUEUuUkFXO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdldmVudCc7XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9TVEFUVVNfSUQgPSB7XG5cdFNPTERfT1VUOiAnc29sZF9vdXQnLFxuXHRQT1NUUE9ORUQ6ICdwb3N0cG9uZWQnLFxuXHRDQU5DRUxMRUQ6ICdjYW5jZWxsZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IEVWRU5UX1NUQVRVU19JRFMgPSB2YWx1ZXMoIEVWRU5UX1NUQVRVU19JRCApO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcblx0R1JFQVRFUl9USEFOLFxuXHRHUkVBVEVSX1RIQU5fQU5EX0VRVUFMLFxuXHRMRVNTX1RIQU5fQU5EX0VRVUFMLFxufSBmcm9tICcuLi9iYXNlJztcblxuZXhwb3J0IGNvbnN0IG5vd0RhdGVBbmRUaW1lID0gbW9tZW50KCk7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIFtcblx0XHRcdCdFVlRfbmFtZScsXG5cdFx0XHQnRVZUX0lEJyxcblx0XHRcdCdzdGFydF9kYXRlJyxcblx0XHRcdCdlbmRfZGF0ZScsXG5cdFx0XHQndGlja2V0X3N0YXJ0Jyxcblx0XHRcdCd0aWNrZXRfZW5kJyxcblx0XHRdICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0XHRzaG93RXhwaXJlZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0Y2F0ZWdvcnlTbHVnOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG1vbnRoOiBQcm9wVHlwZXMubW9udGgsXG5cdH0gKSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHRcdHNob3dFeHBpcmVkOiBib29sZWFuXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdzdGFydF9kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0XHRzaG93RXhwaXJlZDogZmFsc2UsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXJ0X2RhdGU6ICdEYXRldGltZS5EVFRfRVZUX3N0YXJ0Jyxcblx0XHRlbmRfZGF0ZTogJ0RhdGV0aW1lLkRUVF9FVlRfZW5kJyxcblx0XHR0aWNrZXRfc3RhcnQ6ICdEYXRldGltZS5UaWNrZXQuVEtUX3N0YXJ0X2RhdGUnLFxuXHRcdHRpY2tldF9lbmQ6ICdEYXRldGltZS5UaWNrZXQuVEtUX2VuZF9kYXRlJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gZXZlbnRzIGVuZHBvaW50IHJlcXVlc3QgdXNpbmcgcHJvdmlkZWRcbiAqIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0V4cGlyZWQgIFdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgZXhwaXJlZCBldmVudHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gY2F0ZWdvcnlTbHVnICBSZXR1cm4gZXZlbnRzIGZvciB0aGUgZ2l2ZW4gY2F0ZWdvcnlTbHVnXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9udGggICAgICAgICBSZXR1cm4gZXZlbnRzIGZvciB0aGUgZ2l2ZW4gbW9udGguXG4gKiBcdFx0XHRcdFx0XHRcdFx0IENhbiBiZSBhbnkgbW9udGggZm9ybWF0IHJlY29nbml6ZWQgYnkgbW9tZW50LlxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgVGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7XG5cdHNob3dFeHBpcmVkID0gZmFsc2UsXG5cdGNhdGVnb3J5U2x1Zyxcblx0bW9udGggPSAnbm9uZScsXG59ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXG5cdGlmICggISBzaG93RXhwaXJlZCApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RhdGV0aW1lLkRUVF9FVlRfZW5kKipleHBpcmVkXVtdPScgKyBHUkVBVEVSX1RIQU4gK1xuXHRcdFx0JyZ3aGVyZVtEYXRldGltZS5EVFRfRVZUX2VuZCoqZXhwaXJlZF1bXT0nICtcblx0XHRcdG5vd0RhdGVBbmRUaW1lLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmICggY2F0ZWdvcnlTbHVnICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVGVybV9SZWxhdGlvbnNoaXAuVGVybV9UYXhvbm9teS5UZXJtLnNsdWddPScgKyBjYXRlZ29yeVNsdWdcblx0XHQpO1xuXHR9XG5cdGlmICggbW9udGggJiYgbW9udGggIT09ICdub25lJyApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RhdGV0aW1lLkRUVF9FVlRfc3RhcnRdW109JyArIEdSRUFURVJfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtEYXRldGltZS5EVFRfRVZUX3N0YXJ0XVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuc3RhcnRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9lbmRdW109JyArIExFU1NfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtEYXRldGltZS5EVFRfRVZUX2VuZF1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLmVuZE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCJleHBvcnQgKiBmcm9tICcuL2Fzc2VydGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9iYXNlJztcbmV4cG9ydCAqIGZyb20gJy4vZGVmYXVsdC1tb2RlbC1zdGF0ZSc7XG5leHBvcnQgKiBmcm9tICcuL2VuZHBvaW50cyc7XG5leHBvcnQgKiBmcm9tICcuL2VudGl0eS1mYWN0b3J5JztcbmV4cG9ydCAqIGZyb20gJy4vcHJpbWFyeS1rZXlzJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWwtbmFtZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMnO1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHByaW1hcnlLZXlzIH0gZnJvbSAnLi9wcmltYXJ5LWtleXMuanMnO1xuXG4vKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsga2V5cywgc3RhcnRDYXNlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBwbHVyYWxpemUgZnJvbSAncGx1cmFsaXplJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ21lbWl6ZSc7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBtb2RlbCBuYW1lcyBjdXJyZW50bHkgZXhwb3NlZCBmb3IgUkVTVCBBUEkgcmVxdWVzdC5cbiAqL1xuZXhwb3J0IGNvbnN0IE1PREVMX05BTUVTID0ga2V5cyggcHJpbWFyeUtleXMgKTtcblxuLyoqXG4gKiBVc2VkIHRvIG5vcm1hbGl6ZSB0aGUgcGx1cmFsIGZvcm0gb2YgYSBnaXZlbiBtb2RlbCBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7c3RyaW5nfSAgRW5zdXJlcyB0aGUgZ2l2ZW4gbW9kZWxOYW1lIGlzIGl0cyBwbHVyYWwgZm9ybS5cbiAqL1xuZXhwb3J0IGNvbnN0IHBsdXJhbE1vZGVsTmFtZSA9IG1lbW9pemUoXG5cdCggbW9kZWxOYW1lICkgPT4gcGx1cmFsaXplKCBtb2RlbE5hbWUgKVxuKTtcblxuLyoqXG4gKiBVc2VkIHRvIG5vcm1hbGl6ZSB0aGUgc2luZ3VsYXIgZm9ybSBvZiBhIGdpdmVuIG1vZGVsIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEVuc3VyZXMgdGhlIGdpdmVuIG1vZGVsTmFtZSBpcyBpbiBpdHMgc2luZ3VsYXIgZm9ybS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNpbmd1bGFyTW9kZWxOYW1lID0gbWVtb2l6ZShcblx0KCBtb2RlbE5hbWUgKSA9PiBwbHVyYWxpemUuc2luZ3VsYXIoIG1vZGVsTmFtZSApXG4pO1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBjYXBpdGFsaXplZCBzbmFrZWNhc2UgZm9ybWF0IGZvciB0aGUgZ2l2ZW4gbW9kZWwgbmFtZSB0eXBpY2FsbHlcbiAqIHVzZWQgaW4gcXVlcnkgc3RyaW5ncy5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIG1vZGVsTmFtZUZvclF1ZXJ5U3RyaW5nKCAnbWVzc2FnZV90ZW1wbGF0ZV9ncm91cCcgKTtcbiAqIC8vIE1lc3NhZ2VfVGVtcGxhdGVfR3JvdXBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBmb3JtYXR0ZWQgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgbW9kZWxOYW1lRm9yUXVlcnlTdHJpbmcgPSBtZW1vaXplKFxuXHQoIG1vZGVsTmFtZSApID0+IHtcblx0XHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdFx0bW9kZWxOYW1lID0gc3RhcnRDYXNlKCBtb2RlbE5hbWUgKTtcblx0XHRyZXR1cm4gbW9kZWxOYW1lLnJlcGxhY2UoIC9cXHMvZywgJ18nICk7XG5cdH1cbik7XG4iLCJpbXBvcnQgKiBhcyBhdHRlbmRlZU1vZGVsIGZyb20gJy4vYXR0ZW5kZWUnO1xuaW1wb3J0ICogYXMgY2hlY2tJbk1vZGVsIGZyb20gJy4vY2hlY2tpbic7XG5pbXBvcnQgKiBhcyBkYXRlVGltZU1vZGVsIGZyb20gJy4vZGF0ZXRpbWUnO1xuaW1wb3J0ICogYXMgZXZlbnRNb2RlbCBmcm9tICcuL2V2ZW50JztcbmltcG9ydCAqIGFzIHByaWNlVHlwZU1vZGVsIGZyb20gJy4vcHJpY2UtdHlwZSc7XG5pbXBvcnQgKiBhcyByZWdpc3RyYXRpb25Nb2RlbCBmcm9tICcuL3JlZ2lzdHJhdGlvbic7XG5pbXBvcnQgKiBhcyBzdGF0dXNNb2RlbCBmcm9tICcuL3N0YXR1cyc7XG5pbXBvcnQgKiBhcyB0aWNrZXRNb2RlbCBmcm9tICcuL3RpY2tldCc7XG5leHBvcnQge1xuXHRhdHRlbmRlZU1vZGVsLFxuXHRjaGVja0luTW9kZWwsXG5cdGRhdGVUaW1lTW9kZWwsXG5cdGV2ZW50TW9kZWwsXG5cdHByaWNlVHlwZU1vZGVsLFxuXHRyZWdpc3RyYXRpb25Nb2RlbCxcblx0c3RhdHVzTW9kZWwsXG5cdHRpY2tldE1vZGVsLFxufTtcbmV4cG9ydCAqIGZyb20gJy4vZW50aXR5LWZhY3RvcnknO1xuIiwiXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdwcmljZV90eXBlJztcblxuZXhwb3J0IGNvbnN0IEJBU0VfUFJJQ0VfVFlQRVMgPSB7XG5cdEJBU0VfUFJJQ0U6IDEsXG5cdERJU0NPVU5UOiAyLFxuXHRTVVJDSEFSR0U6IDMsXG5cdFRBWDogNCxcbn07XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzQXJyYXksIHJlZHVjZSwgdHJpbUVuZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdtZW1pemUnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0YXNzZXJ0RW50aXR5SGFzS2V5LFxuXHRhc3NlcnRJc0FycmF5LFxuXHRhc3NlcnRJc05vdEVtcHR5LFxuXHRhc3NlcnRJc01hcCxcbn0gZnJvbSAnLi9hc3NlcnRpb25zJztcblxuLyoqXG4gKiBFeHBvc2VzIGEgbWFwIG9mIG1vZGVsbmFtZSB0byBwcmltYXJ5IGtleSBleHBvc2VkIGJ5IHRoZSBlZWpzLmRhdGEgZ2xvYmFsXG4gKiB2aWEgdGhlIHNlcnZlci5cbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmV4cG9ydCBjb25zdCB7IHByaW1hcnlfa2V5czogcHJpbWFyeUtleXMgPSB7fSB9ID0gZGF0YS5wYXRocztcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZXMgZm9yIHRoZSBnaXZlbiBrZXlzIGZyb20gdGhlIHByb3ZpZGVkIGVudGl0eS5cbiAqIFRoaXMgZnVuY3Rpb24gd291bGQgYmUgdXNlZCBmb3IgbW9kZWxzIHRoYXQgaGF2ZSBjb21iaW5lZCBwcmltYXJ5IGtleXNcbiAqIChkZWxpdmVyZWQgYXMgYW4gYXJyYXkpLlxuICpcbiAqIEB0eXBlIHsgbWVtb2l6ZWQgfVxuICogQHJldHVybiB7IHN0cmluZyB9IFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gZm9yIHRoZSB2YWx1ZXMuXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbHVlc0ZvckNvbWJpbmVkUHJpbWFyeUtleXMgPSBtZW1vaXplKCAoIGtleXMsIGVudGl0eSApID0+IHtcblx0YXNzZXJ0SXNBcnJheSgga2V5cyApO1xuXHRjb25zdCBwcmltYXJ5S2V5ID0gcmVkdWNlKCBrZXlzLCBmdW5jdGlvbiggcmVzdWx0LCBrZXkgKSB7XG5cdFx0YXNzZXJ0RW50aXR5SGFzS2V5KCBrZXksIGVudGl0eSApO1xuXHRcdHJldHVybiBlbnRpdHlbIHJlc3VsdCBdICsgJzonICsgZW50aXR5WyBrZXkgXTtcblx0fSApO1xuXHRyZXR1cm4gdHJpbUVuZCggcHJpbWFyeUtleSwgJzonICk7XG59ICk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgZm9yIHRoZSBnaXZlbiBrZXkgZnJvbSB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogVGhpcyBmdW5jdGlvbiB3b3VsZCBiZSB1c2VkIGZvciBtb2RlbHMgdGhhdCBoYXZlIG9ubHkgb25lIHByaW1hcnkga2V5LlxuICpcbiAqIEB0eXBlIHttZW1vaXplZH1cbiAqIEByZXR1cm4geyBmdW5jdGlvbiB9IFRoZSB2YWx1ZSBmb3IgdGhlIGtleSBpbiB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCB2YWx1ZUZvclByaW1hcnlLZXkgPSBtZW1vaXplKCAoIGtleSwgZW50aXR5ICkgPT4ge1xuXHRhc3NlcnRFbnRpdHlIYXNLZXkoIGtleSwgZW50aXR5ICk7XG5cdHJldHVybiBlbnRpdHlbIGtleSBdO1xufSApO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHByaW1hcnkga2V5IChvciBjb21iaW5lZCBwcmltYXJ5IGtleXMpIGZyb20gdGhlIGF2YWlsYWJsZSBkYXRhLlxuICpcbiAqIEB0eXBlIHttZW1vaXplZH1cbiAqIEByZXR1cm4geyBmdW5jdGlvbihzdHJpbmcpIH1cbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgZ2V0UHJpbWFyeUtleSA9IG1lbW9pemUoICggbW9kZWxOYW1lICkgPT4ge1xuXHRhc3NlcnRFbnRpdHlIYXNLZXkoIG1vZGVsTmFtZSwgcHJpbWFyeUtleXMgKTtcblx0cmV0dXJuIHByaW1hcnlLZXlzWyBtb2RlbE5hbWUgXTtcbn0gKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcXVlcnkgc3RyaW5nIGZvciBnZXR0aW5nIHRoZSBlbnRpdGllcyBiZWxvbmdpbmcgdG8gYSBtb2RlbCBmb3IgdGhlXG4gKiBnaXZlbiBwcmltYXJ5IGtleSB2YWx1ZXNcbiAqXG4gKiBAdHlwZSB7bWVtb2l6ZWR9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmltYXJ5S2V5UXVlcnlTdHJpbmcgPSBtZW1vaXplKFxuXHQoIG1vZGVsTmFtZSwga2V5VmFsdWVzID0gW10gKSA9PiB7XG5cdFx0Y29uc3QgcHJpbWFyeUtleSA9IGdldFByaW1hcnlLZXkoIG1vZGVsTmFtZSApO1xuXHRcdHJldHVybiBgWyR7IHByaW1hcnlLZXkgfV1bSU5dPWAgKyBrZXlWYWx1ZXMuam9pbigpO1xuXHR9XG4pO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlcyBmb3IgdGhlIHByaW1hcnkga2V5cyBmcm9tIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7IGZ1bmN0aW9uIH0gIElmIHRoZSBtb2RlbCBoYXMgb25seSBvbmUgcHJpbWFyeSBrZXkgdGhlbiB0aGUgdmFsdWUgd2lsbFxuICogYmUgYSBzaW1wbGUgc3RyaW5nLiAgSWYgdGhlIG1vZGVsIGhhcyBjb21iaW5lZCBwcmltYXJ5IGtleXMsIHRoZW4gdGhlIHZhbHVlXG4gKiB3aWxsIGJlIGFzIHN0cmluZyBpbiB0aGUgZm9ybWF0IGAlcy4lc2AgZm9yIHRoZSBwcmltYXJ5IGtleSB2YWx1ZXMuXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVudGl0eVByaW1hcnlLZXlWYWx1ZXMgPSBtZW1vaXplKCAoIG1vZGVsTmFtZSwgZW50aXR5ICkgPT4ge1xuXHRjb25zdCBrZXlzID0gZ2V0UHJpbWFyeUtleSggbW9kZWxOYW1lICk7XG5cdHJldHVybiBpc0FycmF5KCBrZXlzICkgP1xuXHRcdHZhbHVlc0ZvckNvbWJpbmVkUHJpbWFyeUtleXMoIGtleXMsIGVudGl0eSApIDpcblx0XHR2YWx1ZUZvclByaW1hcnlLZXkoIGtleXMsIGVudGl0eSApO1xufSApO1xuXG4vKipcbiAqIFRoaXMgcmVjZWl2ZXMgYW4gYXJyYXkgb2YgZW50aXRpZXMgYW5kIHJldHVybnMgYSBjb2xsZWN0aW9uIG9mIHRob3NlIHNhbWVcbiAqIGVudGl0aWVzIGluZGV4ZWQgYnkgdGhlIHByaW1hcnkga2V5IHZhbHVlIGZvciBlYWNoIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge0FycmF5fSBlbnRpdGllc1xuICogQHJldHVybiB7TWFwfSAgQSBjb2xsZWN0aW9uIGluZGV4ZWQgYnkgdGhlIHByaW1hcnkga2V5IHZhbHVlcyBmb3IgZWFjaCBlbnRpdHkuXG4gKiBAdGhyb3dzIHtFeGNlcHRpb259XG4gKi9cbmV4cG9ydCBjb25zdCBrZXlFbnRpdGllc0J5UHJpbWFyeUtleVZhbHVlID0gKCBtb2RlbE5hbWUsIGVudGl0aWVzID0gW10gKSA9PiB7XG5cdGFzc2VydElzTm90RW1wdHkoXG5cdFx0ZW50aXRpZXMsXG5cdFx0X18oXG5cdFx0XHQnVGhlIHByb3ZpZGVkIGFycmF5IG9mIGVudGl0aWVzIG11c3Qgbm90IGJlIGVtcHR5Jyxcblx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0KVxuXHQpO1xuXHRhc3NlcnRJc0FycmF5KCBlbnRpdGllcyApO1xuXG5cdGNvbnN0IG1hcHBlZEVudGl0aWVzID0gbmV3IE1hcCgpO1xuXHRlbnRpdGllcy5mb3JFYWNoKCAoIGVudGl0eSApID0+IHtcblx0XHRtYXBwZWRFbnRpdGllcy5zZXQoXG5cdFx0XHRnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzKCBtb2RlbE5hbWUsIGVudGl0eSApLFxuXHRcdFx0ZW50aXR5XG5cdFx0KTtcblx0fSApO1xuXHRyZXR1cm4gbWFwcGVkRW50aXRpZXM7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgZW50aXR5IGluc3RhbmNlcyB1c2luZyB0aGUgZ2l2ZW4gZmFjdG9yeSBhbmQgYXJyYXlcbiAqIG9mIGVudGl0eSB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGZhY3RvcnlcbiAqIEBwYXJhbSB7TWFwfSBlbnRpdGllc1xuICogQHJldHVybiB7TWFwfSAgQW4gYXJyYXkgb2YgZW50aXR5IGluc3RhbmNlcyBpbmRleGVkIGJ5XG4gKiB0aGVpciBwcmltYXJ5IGtleSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQW5kS2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSA9IChcblx0ZmFjdG9yeSxcblx0ZW50aXRpZXMsXG4pID0+IHtcblx0YXNzZXJ0SXNNYXAoXG5cdFx0ZW50aXRpZXMsXG5cdFx0X18oXG5cdFx0XHQnVGhlIHByb3ZpZGVkIG9iamVjdCBvZiBlbnRpdGllcyBtdXN0IGJlIGEgTWFwIG9iamVjdCcsXG5cdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdClcblx0KTtcblx0ZW50aXRpZXMuZm9yRWFjaCggKCBlbnRpdHksIGVudGl0eUlkICkgPT4ge1xuXHRcdGVudGl0aWVzLnNldCggZW50aXR5SWQsIGZhY3RvcnkuZnJvbUV4aXN0aW5nKCBlbnRpdHkgKSApO1xuXHR9ICk7XG5cdHJldHVybiBlbnRpdGllcztcbn07XG4iLCIvKipcbiAqIEludGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgc3RhdHVzTW9kZWwgZnJvbSAnLi4vc3RhdHVzL2NvbnN0YW50cyc7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdyZWdpc3RyYXRpb24nO1xuXG5leHBvcnQgY29uc3QgUkVHSVNUUkFUSU9OX1NUQVRVU19JRFMgPSB2YWx1ZXMoXG5cdHN0YXR1c01vZGVsLlJFR0lTVFJBVElPTl9TVEFUVVNfSURcbik7XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCwgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxufSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCAqIGFzIHN0YXR1c01vZGVsIGZyb20gJy4uL3N0YXR1cy9jb25zdGFudHMnO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdGZvckV2ZW50SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvckF0dGVuZGVlSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclRyYW5zYWN0aW9uSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclRpY2tldElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JTdGF0dXNJZDogUHJvcFR5cGVzLm9uZU9mKCB2YWx1ZXMoIHN0YXR1c01vZGVsLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQgKSApLFxuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdFx0J1JFR19JRCcsXG5cdFx0XHQnUkVHX2RhdGUnLFxuXHRcdF0gKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHR9ICksXG59O1xuXG5leHBvcnQgY29uc3Qgb3B0aW9uc0VudGl0eU1hcCA9IHtcblx0ZGVmYXVsdDoge1xuXHRcdHZhbHVlOiAnUkVHX0lEJyxcblx0XHRsYWJlbDogJ1JFR19jb2RlJyxcblx0fSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ3JlZ19kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhIHJlZ2lzdHJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0cmVnX2lkOiAnUkVHX0lEJyxcblx0XHRyZWdfZGF0ZTogJ1JFR19kYXRlJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gcmVnaXN0cmF0aW9ucyBlbmRwb2ludCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgICAgXHRJRCBvZiBFdmVudCB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvckF0dGVuZGVlSWQgICAgSUQgb2YgQXR0ZW5kZWUgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JUcmFuc2FjdGlvbklkIElEIG9mIFRyYW5zYWN0aW9uIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yVGlja2V0SWQgXHRcdElEIG9mIFRpY2tldCB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtzdHJpbmd9IGZvclN0YXR1c0lkIFx0XHRJRCBvZiBTdGF0dXMgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgXHRUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdGZvckF0dGVuZGVlSWQgPSAwLFxuXHRmb3JUcmFuc2FjdGlvbklkID0gMCxcblx0Zm9yVGlja2V0SWQgPSAwLFxuXHRmb3JTdGF0dXNJZCA9ICcnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0Zm9yRXZlbnRJZCA9IHBhcnNlSW50KCBmb3JFdmVudElkLCAxMCApO1xuXHRpZiAoIGZvckV2ZW50SWQgIT09IDAgJiYgISBpc05hTiggZm9yRXZlbnRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtFVlRfSURdPScgKyBmb3JFdmVudElkICk7XG5cdH1cblx0Zm9yQXR0ZW5kZWVJZCA9IHBhcnNlSW50KCBmb3JBdHRlbmRlZUlkLCAxMCApO1xuXHRpZiAoIGZvckF0dGVuZGVlSWQgIT09IDAgJiYgISBpc05hTiggZm9yQXR0ZW5kZWVJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtBVFRfSURdPScgKyBmb3JBdHRlbmRlZUlkICk7XG5cdH1cblx0Zm9yVHJhbnNhY3Rpb25JZCA9IHBhcnNlSW50KCBmb3JUcmFuc2FjdGlvbklkLCAxMCApO1xuXHRpZiAoIGZvclRyYW5zYWN0aW9uSWQgIT09IDAgJiYgISBpc05hTiggZm9yVHJhbnNhY3Rpb25JZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtUWE5fSURdPScgKyBmb3JUcmFuc2FjdGlvbklkICk7XG5cdH1cblx0Zm9yVGlja2V0SWQgPSBwYXJzZUludCggZm9yVGlja2V0SWQsIDEwICk7XG5cdGlmICggZm9yVGlja2V0SWQgIT09IDAgJiYgISBpc05hTiggZm9yVGlja2V0SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbVEtUX0lEXT0nICsgZm9yVGlja2V0SWQgKTtcblx0fVxuXHRpZiAoIGZvclN0YXR1c0lkICE9PSAnJyAmJiBmb3JTdGF0dXNJZCAhPT0gbnVsbCApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbU1RTX0lEXT0nICsgZm9yU3RhdHVzSWQgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdzdGF0dXMnO1xuLy8gdHlwZXNcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9FTUFJTCA9ICdlbWFpbCc7XG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfRVZFTlQgPSAnZXZlbnQnO1xuZXhwb3J0IGNvbnN0IFNUQVRVU19UWVBFX01FU1NBR0UgPSAnbWVzc2FnZSc7XG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfUEFZTUVOVCA9ICdwYXltZW50JztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9SRUdJU1RSQVRJT04gPSAncmVnaXN0cmF0aW9uJztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9UUkFOU0FDVElPTiA9ICd0cmFuc2FjdGlvbic7XG4vLyBlbWFpbFxuZXhwb3J0IGNvbnN0IEVNQUlMX1NUQVRVU19JRCA9IHtcblx0RFJBRlQ6ICdFRFInLFxuXHRTRU5UOiAnRVNOJyxcblx0RVhQSVJFRDogJ0VYUCcsXG59O1xuLy8gZXZlbnRcbmV4cG9ydCBjb25zdCBFVkVOVF9TVEFUVVNfSUQgPSB7XG5cdEFDVElWRTogJ0FDVCcsXG5cdFJFR0lTVFJBVElPTl9DTE9TRUQ6ICdDTFMnLFxuXHRERUxFVEVEOiAnREVMJyxcblx0REVOSUVEOiAnREVOJyxcblx0RFJBRlQ6ICdEUkYnLFxuXHROT1RfQUNUSVZFOiAnTkFDJyxcblx0Tk9UX09QRU46ICdOT1AnLFxuXHRPTkdPSU5HOiAnT05HJyxcblx0UkVHSVNUUkFUSU9OX09QRU46ICdPUE4nLFxuXHRQRU5ESU5HOiAnUE5EJyxcblx0U0VDT05EQVJZOiAnU0VDJyxcbn07XG4vLyBtZXNzYWdlXG5leHBvcnQgY29uc3QgTUVTU0FHRV9TVEFUVVNfSUQgPSB7XG5cdERFQlVHOiAnTURPJyxcblx0RVhFQ1VUSU5HOiAnTUVYJyxcblx0RkFJTDogJ01GTCcsXG5cdElOQ09NUExFVEU6ICdNSUMnLFxuXHRJRExFOiAnTUlEJyxcblx0UkVTRU5EOiAnTVJTJyxcblx0UkVUUlk6ICdNUlQnLFxuXHRTRU5UOiAnTVNOJyxcbn07XG4vLyBwYXltZW50XG5leHBvcnQgY29uc3QgUEFZTUVOVF9TVEFUVVNfSUQgPSB7XG5cdEFQUFJPVkVEOiAnUEFQJyxcblx0Q0FOQ0VMTEVEOiAnUENOJyxcblx0REVDTElORUQ6ICdQREMnLFxuXHRGQUlMRUQ6ICdQRkwnLFxuXHRQRU5ESU5HOiAnUFBOJyxcbn07XG4vLyByZWdpc3RyYXRpb25cbmV4cG9ydCBjb25zdCBSRUdJU1RSQVRJT05fU1RBVFVTX0lEID0ge1xuXHRBUFBST1ZFRDogJ1JBUCcsXG5cdENBTkNFTExFRDogJ1JDTicsXG5cdERFQ0xJTkVEOiAnUkRDJyxcblx0SU5DT01QTEVURTogJ1JJQycsXG5cdE5PVF9BUFBST1ZFRDogJ1JOQScsXG5cdFBFTkRJTkdfUEFZTUVOVDogJ1JQUCcsXG5cdFdBSVRfTElTVDogJ1JXTCcsXG59O1xuLy8gdHJhbnNhY3Rpb25cbmV4cG9ydCBjb25zdCBUUkFOU0FDVElPTl9TVEFUVVNfSUQgPSB7XG5cdEFCQU5ET05FRDogJ1RBQicsXG5cdENPTVBMRVRFOiAnVENNJyxcblx0RkFJTEVEOiAnVEZMJyxcblx0SU5DT01QTEVURTogJ1RJTicsXG5cdE9WRVJQQUlEOiAnVE9QJyxcbn07XG5cbi8vIHRoZSBmb2xsb3dpbmcgYXJlIG5vdCBpbiB0aGUgc3RhdHVzIGRhdGFiYXNlIGJ1dCBhcmUga2VwdCBoZXJlIGZvclxuLy8gY29udmVuaWVuY2VcblxuLy8gY3VzdG9tIHBvc3QgdHlwZXNcbmV4cG9ydCBjb25zdCBDUFRfU1RBVFVTX0lEID0ge1xuXHRQVUJMSVNIOiAncHVibGlzaCcsXG5cdEZVVFVSRTogJ2Z1dHVyZScsXG5cdERSQUZUOiAnZHJhZnQnLFxuXHRQRU5ESU5HOiAncGVuZGluZycsXG5cdFBSSVZBVEU6ICdwcml2YXRlJyxcblx0VFJBU0hFRDogJ3RyYXNoJyxcbn07XG5cbmV4cG9ydCBjb25zdCBVTktOT1dOX1NUQVRVU19JRCA9ICd1bmtub3duJztcblxuZXhwb3J0IGNvbnN0IEFMTF9TVEFUVVNfSURTID0gW1xuXHQuLi52YWx1ZXMoIEVNQUlMX1NUQVRVU19JRCApLFxuXHQuLi52YWx1ZXMoIEVWRU5UX1NUQVRVU19JRCApLFxuXHQuLi52YWx1ZXMoIE1FU1NBR0VfU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggUEFZTUVOVF9TVEFUVVNfSUQgKSxcblx0Li4udmFsdWVzKCBSRUdJU1RSQVRJT05fU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggVFJBTlNBQ1RJT05fU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggQ1BUX1NUQVRVU19JRCApLFxuXHRVTktOT1dOX1NUQVRVU19JRCxcbl07XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgc3RhdHVzIGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IEVWRU5UX1NUQVRVU19JRCB9IGZyb20gJy4uL2V2ZW50JztcbmltcG9ydCB7IFRJQ0tFVF9TVEFUVVNfSUQgfSBmcm9tICcuLi90aWNrZXQnO1xuaW1wb3J0IHsgREFURVRJTUVfU1RBVFVTX0lEIH0gZnJvbSAnLi4vZGF0ZXRpbWUnO1xuaW1wb3J0IHsgQ0hFQ0tJTl9TVEFUVVNfSUQgfSBmcm9tICcuLi9jaGVja2luJztcblxuLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbHVlLW9iamVjdHMnO1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBSZWdpc3RyYXRpb24gc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9SRUdJU1RSQVRJT04gPSB7XG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuUEVORElOR19QQVlNRU5UIF06IG5ldyBMYWJlbChcblx0XHRfXyggJ3BlbmRpbmcgcGF5bWVudCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRfXyggJ3BlbmRpbmcgcGF5bWVudHMnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5BUFBST1ZFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FwcHJvdmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuTk9UX0FQUFJPVkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnbm90IGFwcHJvdmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuQ0FOQ0VMTEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnY2FuY2VsbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuSU5DT01QTEVURSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2luY29tcGxldGUnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5ERUNMSU5FRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2RlY2xpbmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuV0FJVF9MSVNUIF06IG5ldyBMYWJlbChcblx0XHRfXyggJ3dhaXQgbGlzdCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRfXyggJ3dhaXQgbGlzdHMnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBUcmFuc2FjdGlvbiBzdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICpcbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9UUkFOU0FDVElPTiA9IHtcblx0WyBzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELk9WRVJQQUlEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnb3ZlcnBhaWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELkNPTVBMRVRFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnY29tcGxldGUnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELklOQ09NUExFVEUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdpbmNvbXBsZXRlJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlRSQU5TQUNUSU9OX1NUQVRVU19JRC5GQUlMRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdmYWlsZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELkFCQU5ET05FRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FiYW5kb25lZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIHBheW1lbnQgc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9QQVlNRU5UID0ge1xuXHRbIHN0YXR1cy5QQVlNRU5UX1NUQVRVU19JRC5BUFBST1ZFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FjY2VwdGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlBBWU1FTlRfU1RBVFVTX0lELlBFTkRJTkcgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdwZW5kaW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlBBWU1FTlRfU1RBVFVTX0lELkNBTkNFTExFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2NhbmNlbGxlZCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0KSxcblx0WyBzdGF0dXMuUEFZTUVOVF9TVEFUVVNfSUQuREVDTElORUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdkZWNsaW5lZCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0KSxcblx0WyBzdGF0dXMuUEFZTUVOVF9TVEFUVVNfSUQuRkFJTEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZmFpbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgTWVzc2FnZSBzdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX01FU1NBR0UgPSB7XG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELlNFTlQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdzZW50JywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELklETEUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdxdWV1ZWQgZm9yIHNlbmRpbmcnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuRkFJTCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2ZhaWxlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5ERUJVRyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2RlYnVnIG9ubHknLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuRVhFQ1VUSU5HIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnbWVzc2VuZ2VyIGlzIGV4ZWN1dGluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5SRVNFTkQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdxdWV1ZWQgZm9yIHJlc2VuZGluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5JTkNPTVBMRVRFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncXVldWVkIGZvciBnZW5lcmF0aW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELlJFVFJZIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZmFpbGVkIHNlbmRpbmcsIGNhbiBiZSByZXRyaWVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgQ1BUIHN0YXR1c2VzXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ1BUID0ge1xuXHRbIHN0YXR1cy5DUFRfU1RBVFVTX0lELlBVQkxJU0ggXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdwdWJsaXNoZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuQ1BUX1NUQVRVU19JRC5GVVRVUkUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdzY2hlZHVsZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuQ1BUX1NUQVRVU19JRC5EUkFGVCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2RyYWZ0JywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLkNQVF9TVEFUVVNfSUQuUEVORElORyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3BlbmRpbmcnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuQ1BUX1NUQVRVU19JRC5QUklWQVRFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncHJpdmF0ZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5DUFRfU1RBVFVTX0lELlRSQVNIRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICd0cmFzaGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vLyB0aGUgZm9sbG93aW5nIHN0YXR1cyBtYXBzIGFyZSBmb3IgbW9kZWwgc3RhdHVzZXMgdGhhdCBhcmUgbm90IHNhdmVkIGluIHRoZVxuLy8gc3RhdHVzIHRhYmxlIGJ1dCBmb3IgY29udmVuaWVuY2UgaGF2ZSB0aGVpciBsYWJlbHMgcmV0cmlldmFibGUgdmlhIGhlcmUuXG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBFdmVudCBTdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0VWRU5UID0ge1xuXHRbIEVWRU5UX1NUQVRVU19JRC5TT0xEX09VVCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3NvbGQgb3V0JywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgRVZFTlRfU1RBVFVTX0lELlBPU1RQT05FRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3Bvc3Rwb25lZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIEVWRU5UX1NUQVRVU19JRC5DQU5DRUxMRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdjYW5jZWxsZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBUaWNrZXQgc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9USUNLRVQgPSB7XG5cdFsgVElDS0VUX1NUQVRVU19JRC5BUkNISVZFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FyY2hpdmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgVElDS0VUX1NUQVRVU19JRC5FWFBJUkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZXhwaXJlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIFRJQ0tFVF9TVEFUVVNfSUQuU09MRF9PVVQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdzb2xkIG91dCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIFRJQ0tFVF9TVEFUVVNfSUQuUEVORElORyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3VwY29taW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgVElDS0VUX1NUQVRVU19JRC5PTlNBTEUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdvbiBzYWxlJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgZGF0ZXRpbWUgc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9EQVRFVElNRSA9IHtcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuQ0FOQ0VMTEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnY2FuY2VsbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgREFURVRJTUVfU1RBVFVTX0lELlNPTERfT1VUIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnc29sZCBvdXQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuRVhQSVJFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2V4cGlyZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuSU5BQ1RJVkUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdpbmFjdGl2ZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIERBVEVUSU1FX1NUQVRVU19JRC5VUENPTUlORyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3VwY29taW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgREFURVRJTUVfU1RBVFVTX0lELkFDVElWRSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2FjdGl2ZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIERBVEVUSU1FX1NUQVRVU19JRC5QT1NUUE9ORUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdwb3N0cG9uZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBjaGVja2luIHN0YXR1c2VzXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0NIRUNLSU4gPSB7XG5cdFsgQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfSU4gXTogbmV3IExhYmVsKFxuXHRcdF9fKCAnY2hlY2staW4nLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0X18oICdjaGVjay1pbnMnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBDSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9PVVQgXTogbmV3IExhYmVsKFxuXHRcdF9fKCAnY2hlY2stb3V0JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdF9fKCAnY2hlY2stb3V0cycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIENIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX05FVkVSIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnbmV2ZXIgY2hlY2tlZCBpbicsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBDb21iaW5lZCB0cmFuc2xhdGlvbiBtYXAgZm9yIGFsbCBzdGF0dXNlcy5cbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9BTEwgPSB7XG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfUkVHSVNUUkFUSU9OLFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX1RSQU5TQUNUSU9OLFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX1BBWU1FTlQsXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfTUVTU0FHRSxcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9DUFQsXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfRVZFTlQsXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfVElDS0VULFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX0RBVEVUSU1FLFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX0NIRUNLSU4sXG5cdFsgc3RhdHVzLlVOS05PV05fU1RBVFVTX0lEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAndW5rbm93bicsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwcmV0dHkgc3RhdHVzIGxhYmVsIHN0cmluZyBmb3IgdGhlIGdpdmVuIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RhdHVzQ29kZVxuICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhciAgV2hldGhlciB0byByZXR1cm4gdGhlIHNpbmd1bGFyIG9yIHBsdXJhbCBsYWJlbFxuICogdmFsdWVcbiAqIEBwYXJhbSB7KHNlbnRlbmNlfGxvd2VyfHVwcGVyKX0gc2NoZW1hXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFJldHVybnMgdGhlIG1hcHBlZCBwcmV0dHkgbGFiZWwgZm9yIHRoZSBnaXZlbiBzdGF0dXMgY29kZSBvclxuICogYSBmb3JtYXR0ZWQgJ3Vua293bicgc3RyaW5nIGlmIHRoZXJlIGlzIG5vIG1hcHBlZCB2YWx1ZSBmb3IgdGhlIGdpdmVuIGNvZGUuXG4gKi9cbmV4cG9ydCBjb25zdCBwcmV0dHlTdGF0dXMgPSAoXG5cdHN0YXR1c0NvZGUsXG5cdHNpbmd1bGFyID0gdHJ1ZSxcblx0c2NoZW1hID0gTGFiZWwuRk9STUFUX1NFTlRFTkNFX0NBU0VcbikgPT4ge1xuXHRyZXR1cm4gU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9BTExbIHN0YXR1c0NvZGUgXSA/XG5cdFx0U1RBVFVTX1RSQU5TTEFUSU9OX01BUF9BTExbIHN0YXR1c0NvZGUgXS5hc0Zvcm1hdHRlZCggc2luZ3VsYXIsIHNjaGVtYSApIDpcblx0XHRTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0FMTFsgc3RhdHVzLlVOS05PV05fU1RBVFVTX0lEIF0uYXNGb3JtYXR0ZWQoXG5cdFx0XHRzaW5ndWxhcixcblx0XHRcdHNjaGVtYVxuXHRcdCk7XG59O1xuXG4vKipcbiAqIEV4cGVjdHMgYW4gYXJyYXkgb2Ygc3RhdHVzIGNvZGVzIGFuZCByZXR1cm5zIGFuIG9iamVjdCBpbmRleGVkIGJ5IGNvZGVzIHdpdGhcbiAqIHZhbHVlcyBiZWluZyB0aGUgZm9ybWF0dGVkIHByZXR0eSBsYWJlbHMgZm9yIGVhY2ggY29kZSBhY2NvcmRpbmcgdG8gdGhlXG4gKiBwcm92aWRlZCBhcmd1bWVudHNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzdGF0dXNDb2Rlc1xuICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhclxuICogQHBhcmFtIHsoc2VudGVuY2V8bG93ZXJ8dXBwZXIpfSBzY2hlbWFcbiAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IG1hcHBpbmcgc3RhdHVzIGNvZGUgdG8gcHJldHR5IGxhYmVsLlxuICovXG5leHBvcnQgY29uc3QgcHJldHR5U3RhdHVzZXMgPSAoXG5cdHN0YXR1c0NvZGVzLFxuXHRzaW5ndWxhciA9IHRydWUsXG5cdHNjaGVtYSA9IExhYmVsLkZPUk1BVF9TRU5URU5DRV9DQVNFXG4pID0+IHtcblx0aWYgKCAhIGlzQXJyYXkoIHN0YXR1c0NvZGVzICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ0V4cGVjdCBpbmNvbWluZyBzdGF0dXNDb2RlcyBhcmd1bWVudCcgK1xuXHRcdFx0JyB0byBiZSBhbiBhcnJheScgKTtcblx0fVxuXHRjb25zdCBtYXBwZWRTdGF0dXNlcyA9IHt9O1xuXHRzdGF0dXNDb2Rlcy5mb3JFYWNoKCAoIHN0YXR1c0NvZGUgKSA9PiB7XG5cdFx0bWFwcGVkU3RhdHVzZXNbIHN0YXR1c0NvZGUgXSA9IHByZXR0eVN0YXR1cyhcblx0XHRcdHN0YXR1c0NvZGUsXG5cdFx0XHRzaW5ndWxhcixcblx0XHRcdHNjaGVtYVxuXHRcdCk7XG5cdH0gKTtcblx0cmV0dXJuIG1hcHBlZFN0YXR1c2VzO1xufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9oZWxwZXJzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0FTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG59IGZyb20gJy4uL2Jhc2UnO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMjUsXG5cdFx0b3JkZXJCeTogJ3N0YXR1c0NvZGUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9BU0MsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXR1c0NvZGU6ICdTVFNfY29kZScsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIGV2ZW50cyBlbmRwb2ludCByZXF1ZXN0IHVzaW5nIHByb3ZpZGVkXG4gKiBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhdHVzVHlwZSBcdElEIGZvciB0eXBlIG9mIFN0YXR1cyB0byByZXRyaWV2ZVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICBUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHsgc3RhdHVzVHlwZSB9ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXHRpZiAoIHN0YXR1c1R5cGUgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1NUU190eXBlXT0nICsgc3RhdHVzVHlwZSApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuXG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAndGlja2V0JztcblxuZXhwb3J0IGNvbnN0IFRJQ0tFVF9TVEFUVVNfSUQgPSB7XG5cdFNPTERfT1VUOiAnVEtTJyxcblx0RVhQSVJFRDogJ1RLRScsXG5cdEFSQ0hJVkVEOiAnVEtBJyxcblx0UEVORElORzogJ1RLUCcsXG5cdE9OU0FMRTogJ1RLTycsXG59O1xuXG5leHBvcnQgY29uc3QgVElDS0VUX1NUQVRVU19JRFMgPSB2YWx1ZXMoIFRJQ0tFVF9TVEFUVVNfSUQgKTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9zdGF0dXMtaGVscGVyJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxuXHRHUkVBVEVSX1RIQU4sXG5cdEdSRUFURVJfVEhBTl9BTkRfRVFVQUwsXG5cdExFU1NfVEhBTl9BTkRfRVFVQUwsXG59IGZyb20gJy4uL2Jhc2UnO1xuXG5leHBvcnQgY29uc3Qgbm93RGF0ZUFuZFRpbWUgPSBtb21lbnQoKTtcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdFx0J1RLVF9uYW1lJyxcblx0XHRcdCdUS1RfSUQnLFxuXHRcdFx0J3N0YXJ0X2RhdGUnLFxuXHRcdFx0J2VuZF9kYXRlJyxcblx0XHRdICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0XHRzaG93RXhwaXJlZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0bW9udGg6IFByb3BUeXBlcy5tb250aCxcblx0fSApLFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdFx0c2hvd0V4cGlyZWQ6IGJvb2xlYW5cbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ3N0YXJ0X2RhdGUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9ERVNDLFxuXHRcdHNob3dFeHBpcmVkOiBmYWxzZSxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhIHRpY2tldC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0c3RhcnRfZGF0ZTogJ1RLVF9zdGFydF9kYXRlJyxcblx0XHRlbmRfZGF0ZTogJ1RLVF9lbmRfZGF0ZScsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIHRpY2tldHMgZW5kcG9pbnQgcmVxdWVzdCB1c2luZyBwcm92aWRlZFxuICogaW5mb3JtYXRpb24uXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBzaG93RXhwaXJlZCBcdFdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgZXhwaXJlZCB0aWNrZXRzLlxuICogQHBhcmFtIHtzdHJpbmd9IG1vbnRoICAgICAgICAgICAgUmV0dXJuIHRpY2tldHMgZm9yIHRoZSBnaXZlbiBtb250aC4gQ2FuIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHRpbiBhbnkgbW9udGggZm9ybWF0IHJlY29nbml6ZWQgYnkgbW9tZW50XG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRXZlbnRJZCAgICBcdElEIG9mIEV2ZW50IHRvIHJldHJpZXZlIHRpY2tldHMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRGF0ZXRpbWVJZCAgICBJRCBvZiBEYXRldGltZSB0byByZXRyaWV2ZSB0aWNrZXRzIGZvclxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICBcdFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICgge1xuXHRmb3JFdmVudElkID0gMCxcblx0Zm9yRGF0ZXRpbWVJZCA9IDAsXG5cdHNob3dFeHBpcmVkID0gZmFsc2UsXG5cdG1vbnRoID0gJ25vbmUnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0aWYgKCAhIHNob3dFeHBpcmVkICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVEtUX2VuZF9kYXRlKipleHBpcmVkXVtdPScgKyBHUkVBVEVSX1RIQU4gK1xuXHRcdFx0JyZ3aGVyZVtUS1RfZW5kX2RhdGUqKmV4cGlyZWRdW109JyArXG5cdFx0XHRub3dEYXRlQW5kVGltZS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRpZiAoIG1vbnRoICYmIG1vbnRoICE9PSAnbm9uZScgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtUS1Rfc3RhcnRfZGF0ZV1bXT0nICsgR1JFQVRFUl9USEFOX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW1RLVF9zdGFydF9kYXRlXVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuc3RhcnRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVEtUX2VuZF9kYXRlXVtdPScgKyBMRVNTX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbVEtUX2VuZF9kYXRlXVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuZW5kT2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRmb3JFdmVudElkID0gcGFyc2VJbnQoIGZvckV2ZW50SWQsIDEwICk7XG5cdGlmICggZm9yRXZlbnRJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JFdmVudElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0RhdGV0aW1lLkV2ZW50LkVWVF9JRF09JyArIGZvckV2ZW50SWQgKTtcblx0fVxuXHRmb3JEYXRldGltZUlkID0gcGFyc2VJbnQoIGZvckRhdGV0aW1lSWQsIDEwICk7XG5cdGlmICggZm9yRGF0ZXRpbWVJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JEYXRldGltZUlkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0RhdGV0aW1lLkRUVF9JRF09JyArIGZvckRhdGV0aW1lSWQgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IE1PREVMX05BTUUsIFRJQ0tFVF9TVEFUVVNfSUQgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHRocm93cyB7VHlwZUVycm9yfVxuICovXG5jb25zdCBhc3NlcnRUaWNrZXRFbnRpdHkgPSAoIHRpY2tldEVudGl0eSApID0+IHtcblx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCB0aWNrZXRFbnRpdHksIE1PREVMX05BTUUgKSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0J1RoZSBwcm92aWRlZCBlbnRpdHkgaXMgbm90IGEgdGlja2V0IGluc3RhbmNlJ1xuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQXJjaGl2ZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IHRyYXNoZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZXZlbnQgZGF0ZSBpcyB2YWxpZCBlbnRpdHkgb3IgYXJjaGl2ZVxuICovXG5jb25zdCBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlID0gKCB0aWNrZXRFbnRpdHksIGluY2x1ZGVBcmNoaXZlZCApID0+IHtcblx0cmV0dXJuICggaW5jbHVkZUFyY2hpdmVkICYmIGFzc2VydFRpY2tldEVudGl0eSggdGlja2V0RW50aXR5ICkgKSB8fFxuICAgICAgICAoICEgaW5jbHVkZUFyY2hpdmVkICYmICEgaXNBcmNoaXZlZCggdGlja2V0RW50aXR5ICkgKTtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQXJjaGl2ZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IGFyY2hpdmVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRpY2tldCBpcyBjdXJyZW50bHkgYXZhaWxhYmxlIGZvciBwdXJjaGFzZVxuICovXG5leHBvcnQgY29uc3QgaXNPblNhbGUgPSAoIHRpY2tldEVudGl0eSwgaW5jbHVkZUFyY2hpdmVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCB0aWNrZXRFbnRpdHksIGluY2x1ZGVBcmNoaXZlZCApICYmXG5cdHRpY2tldEVudGl0eS5zdGFydERhdGUuZGlmZk5vdygpIDwgMCAmJlxuXHR0aWNrZXRFbnRpdHkuZW5kRGF0ZS5kaWZmTm93KCkgPiAwO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVBcmNoaXZlZCBpZiB0cnVlIHdpbGwgbm90IGZpbHRlciBvdXQgYXJjaGl2ZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGlja2V0IGNhbiBubyBsb25nZXIgYmUgcHVyY2hhc2VkXG4gKi9cbmV4cG9ydCBjb25zdCBpc0V4cGlyZWQgPSAoIHRpY2tldEVudGl0eSwgaW5jbHVkZUFyY2hpdmVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCB0aWNrZXRFbnRpdHksIGluY2x1ZGVBcmNoaXZlZCApICYmXG5cdHRpY2tldEVudGl0eS5lbmREYXRlLmRpZmZOb3coKSA8IDA7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZUFyY2hpdmVkIGlmIHRydWUgd2lsbCBub3QgZmlsdGVyIG91dCBhcmNoaXZlZCBlbnRpdGllc1xuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aWNrZXRzIHNvbGQgbWVldHMgb3IgZXhjZWVkcyBhdmFpbGFibGUgcXVhbnRpdHlcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU29sZE91dCA9ICggdGlja2V0RW50aXR5LCBpbmNsdWRlQXJjaGl2ZWQgPSBmYWxzZSApID0+IHtcblx0aWYgKFxuXHRcdCggaW5jbHVkZUFyY2hpdmVkICYmICEgYXNzZXJ0VGlja2V0RW50aXR5KCB0aWNrZXRFbnRpdHkgKSApIHx8XG5cdFx0KCAhIGluY2x1ZGVBcmNoaXZlZCAmJiBpc0FyY2hpdmVkKCB0aWNrZXRFbnRpdHkgKSApXG5cdCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRjb25zdCBxdHkgPSB0aWNrZXRFbnRpdHkucXR5O1xuXHRyZXR1cm4gKCBxdHkgIT09IG51bGwgJiYgcXR5ICE9PSAnSU5GJyAmJiBxdHkgIT09IEluZmluaXR5ICYmIHF0eSAhPT0gLTEgKSAmJlxuXHRcdHRpY2tldEVudGl0eS5zb2xkID49IHF0eTtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQXJjaGl2ZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IGFyY2hpdmVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSBcdHRydWUgaWYgdGlja2V0IGlzIG5vdCB5ZXQgYXZhaWxhYmxlIGZvciBwdXJjaGFzZSxcbiAqIFx0XHRcdFx0XHRcdGJ1dCB3aWxsIGJlIGF0IHNvbWUgZGF0ZSBpbiB0aGUgZnV0dXJlXG4gKi9cbmV4cG9ydCBjb25zdCBpc1BlbmRpbmcgPSAoIHRpY2tldEVudGl0eSwgaW5jbHVkZUFyY2hpdmVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCB0aWNrZXRFbnRpdHksIGluY2x1ZGVBcmNoaXZlZCApICYmXG5cdHRpY2tldEVudGl0eS5zdGFydERhdGUuZGlmZk5vdygpID4gMDtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aWNrZXQgaXMgYXJjaGl2ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGlzQXJjaGl2ZWQgPSAoIHRpY2tldEVudGl0eSApID0+IHtcblx0YXNzZXJ0VGlja2V0RW50aXR5KCB0aWNrZXRFbnRpdHkgKTtcblx0cmV0dXJuIHRpY2tldEVudGl0eS5kZWxldGVkO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9IHN0YXR1cyBJRFxuICovXG5leHBvcnQgY29uc3Qgc3RhdHVzID0gKCB0aWNrZXRFbnRpdHkgKSA9PiB7XG5cdGlmICggaXNBcmNoaXZlZCggdGlja2V0RW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIFRJQ0tFVF9TVEFUVVNfSUQuQVJDSElWRUQ7XG5cdH1cblx0aWYgKCBpc1NvbGRPdXQoIHRpY2tldEVudGl0eSApICkge1xuXHRcdHJldHVybiBUSUNLRVRfU1RBVFVTX0lELlNPTERfT1VUO1xuXHR9XG5cdGlmICggaXNFeHBpcmVkKCB0aWNrZXRFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gVElDS0VUX1NUQVRVU19JRC5FWFBJUkVEO1xuXHR9XG5cdGlmICggaXNQZW5kaW5nKCB0aWNrZXRFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gVElDS0VUX1NUQVRVU19JRC5QRU5ESU5HO1xuXHR9XG5cdGlmICggaXNPblNhbGUoIHRpY2tldEVudGl0eSApICkge1xuXHRcdHJldHVybiBUSUNLRVRfU1RBVFVTX0lELk9OU0FMRTtcblx0fVxuXHRyZXR1cm4gJyc7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ30gdGlja2V0IHN0YXR1c1xuICovXG5leHBvcnQgY29uc3QgZ2V0VGlja2V0U3RhdHVzVGV4dExhYmVsID0gKCB0aWNrZXRFbnRpdHkgKSA9PiB7XG5cdGxldCB0aWNrZXRTdGF0dXMgPSAnJztcblx0c3dpdGNoICggc3RhdHVzKCB0aWNrZXRFbnRpdHkgKSApIHtcblx0XHRjYXNlIFRJQ0tFVF9TVEFUVVNfSUQuU09MRF9PVVQgOlxuXHRcdFx0dGlja2V0U3RhdHVzID0gX18oICdzb2xkIG91dCcsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVElDS0VUX1NUQVRVU19JRC5FWFBJUkVEIDpcblx0XHRcdHRpY2tldFN0YXR1cyA9IF9fKCAnZXhwaXJlZCcsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVElDS0VUX1NUQVRVU19JRC5QRU5ESU5HIDpcblx0XHRcdHRpY2tldFN0YXR1cyA9IF9fKCAncGVuZGluZycsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVElDS0VUX1NUQVRVU19JRC5PTlNBTEUgOlxuXHRcdFx0dGlja2V0U3RhdHVzID0gX18oICdvbiBzYWxlJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBUSUNLRVRfU1RBVFVTX0lELkFSQ0hJVkVEIDpcblx0XHRcdHRpY2tldFN0YXR1cyA9IF9fKCAnYXJjaGl2ZWQnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0fVxuXHRyZXR1cm4gdGlja2V0U3RhdHVzO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgIENTUyBjbGFzcyBmb3IgdGhlIGJhY2tncm91bmQgY29sb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEJhY2tncm91bmRDb2xvckNsYXNzID0gKCB0aWNrZXRFbnRpdHkgKSA9PiB7XG5cdHJldHVybiBgZWUtc3RhdHVzLWJhY2tncm91bmQtY29sb3ItJHsgc3RhdHVzKCB0aWNrZXRFbnRpdHkgKSB9YDtcbn07XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhvdXRIb2xlczsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQ7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsInZhciBhcnJheVdpdGhvdXRIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aG91dEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5XCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZFwiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90b0NvbnN1bWFibGVBcnJheTsiLCJmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZjIob2JqKTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lbWl6ZSggZm4sIG9wdGlvbnMgKSB7XG5cdHZhciBzaXplID0gMCxcblx0XHRtYXhTaXplLCBoZWFkLCB0YWlsO1xuXG5cdGlmICggb3B0aW9ucyAmJiBvcHRpb25zLm1heFNpemUgKSB7XG5cdFx0bWF4U2l6ZSA9IG9wdGlvbnMubWF4U2l6ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIG1lbW9pemVkKCAvKiAuLi5hcmdzICovICkge1xuXHRcdHZhciBub2RlID0gaGVhZCxcblx0XHRcdGxlbiA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0XHRhcmdzLCBpO1xuXG5cdFx0c2VhcmNoQ2FjaGU6IHdoaWxlICggbm9kZSApIHtcblx0XHRcdC8vIFBlcmZvcm0gYSBzaGFsbG93IGVxdWFsaXR5IHRlc3QgdG8gY29uZmlybSB0aGF0IHdoZXRoZXIgdGhlIG5vZGVcblx0XHRcdC8vIHVuZGVyIHRlc3QgaXMgYSBjYW5kaWRhdGUgZm9yIHRoZSBhcmd1bWVudHMgcGFzc2VkLiBUd28gYXJyYXlzXG5cdFx0XHQvLyBhcmUgc2hhbGxvd2x5IGVxdWFsIGlmIHRoZWlyIGxlbmd0aCBtYXRjaGVzIGFuZCBlYWNoIGVudHJ5IGlzXG5cdFx0XHQvLyBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuIHRoZSB0d28gc2V0cy4gQXZvaWQgYWJzdHJhY3RpbmcgdG8gYVxuXHRcdFx0Ly8gZnVuY3Rpb24gd2hpY2ggY291bGQgaW5jdXIgYW4gYXJndW1lbnRzIGxlYWtpbmcgZGVvcHRpbWl6YXRpb24uXG5cblx0XHRcdC8vIENoZWNrIHdoZXRoZXIgbm9kZSBhcmd1bWVudHMgbWF0Y2ggYXJndW1lbnRzIGxlbmd0aFxuXHRcdFx0aWYgKCBub2RlLmFyZ3MubGVuZ3RoICE9PSBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgd2hldGhlciBub2RlIGFyZ3VtZW50cyBtYXRjaCBhcmd1bWVudHMgdmFsdWVzXG5cdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRpZiAoIG5vZGUuYXJnc1sgaSBdICE9PSBhcmd1bWVudHNbIGkgXSApIHtcblx0XHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRcdGNvbnRpbnVlIHNlYXJjaENhY2hlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQgd2UgY2FuIGFzc3VtZSB3ZSd2ZSBmb3VuZCBhIG1hdGNoXG5cblx0XHRcdC8vIFN1cmZhY2UgbWF0Y2hlZCBub2RlIHRvIGhlYWQgaWYgbm90IGFscmVhZHlcblx0XHRcdGlmICggbm9kZSAhPT0gaGVhZCApIHtcblx0XHRcdFx0Ly8gQXMgdGFpbCwgc2hpZnQgdG8gcHJldmlvdXMuIE11c3Qgb25seSBzaGlmdCBpZiBub3QgYWxzb1xuXHRcdFx0XHQvLyBoZWFkLCBzaW5jZSBpZiBib3RoIGhlYWQgYW5kIHRhaWwsIHRoZXJlIGlzIG5vIHByZXZpb3VzLlxuXHRcdFx0XHRpZiAoIG5vZGUgPT09IHRhaWwgKSB7XG5cdFx0XHRcdFx0dGFpbCA9IG5vZGUucHJldjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkanVzdCBzaWJsaW5ncyB0byBwb2ludCB0byBlYWNoIG90aGVyLiBJZiBub2RlIHdhcyB0YWlsLFxuXHRcdFx0XHQvLyB0aGlzIGFsc28gaGFuZGxlcyBuZXcgdGFpbCdzIGVtcHR5IGBuZXh0YCBhc3NpZ25tZW50LlxuXHRcdFx0XHRub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcblx0XHRcdFx0aWYgKCBub2RlLm5leHQgKSB7XG5cdFx0XHRcdFx0bm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRub2RlLm5leHQgPSBoZWFkO1xuXHRcdFx0XHRub2RlLnByZXYgPSBudWxsO1xuXHRcdFx0XHRoZWFkLnByZXYgPSBub2RlO1xuXHRcdFx0XHRoZWFkID0gbm9kZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV0dXJuIGltbWVkaWF0ZWx5XG5cdFx0XHRyZXR1cm4gbm9kZS52YWw7XG5cdFx0fVxuXG5cdFx0Ly8gTm8gY2FjaGVkIHZhbHVlIGZvdW5kLiBDb250aW51ZSB0byBpbnNlcnRpb24gcGhhc2U6XG5cblx0XHQvLyBDcmVhdGUgYSBjb3B5IG9mIGFyZ3VtZW50cyAoYXZvaWQgbGVha2luZyBkZW9wdGltaXphdGlvbilcblx0XHRhcmdzID0gbmV3IEFycmF5KCBsZW4gKTtcblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0YXJnc1sgaSBdID0gYXJndW1lbnRzWyBpIF07XG5cdFx0fVxuXG5cdFx0bm9kZSA9IHtcblx0XHRcdGFyZ3M6IGFyZ3MsXG5cblx0XHRcdC8vIEdlbmVyYXRlIHRoZSByZXN1bHQgZnJvbSBvcmlnaW5hbCBmdW5jdGlvblxuXHRcdFx0dmFsOiBmbi5hcHBseSggbnVsbCwgYXJncyApXG5cdFx0fTtcblxuXHRcdC8vIERvbid0IG5lZWQgdG8gY2hlY2sgd2hldGhlciBub2RlIGlzIGFscmVhZHkgaGVhZCwgc2luY2UgaXQgd291bGRcblx0XHQvLyBoYXZlIGJlZW4gcmV0dXJuZWQgYWJvdmUgYWxyZWFkeSBpZiBpdCB3YXNcblxuXHRcdC8vIFNoaWZ0IGV4aXN0aW5nIGhlYWQgZG93biBsaXN0XG5cdFx0aWYgKCBoZWFkICkge1xuXHRcdFx0aGVhZC5wcmV2ID0gbm9kZTtcblx0XHRcdG5vZGUubmV4dCA9IGhlYWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIElmIG5vIGhlYWQsIGZvbGxvd3MgdGhhdCB0aGVyZSdzIG5vIHRhaWwgKGF0IGluaXRpYWwgb3IgcmVzZXQpXG5cdFx0XHR0YWlsID0gbm9kZTtcblx0XHR9XG5cblx0XHQvLyBUcmltIHRhaWwgaWYgd2UncmUgcmVhY2hlZCBtYXggc2l6ZSBhbmQgYXJlIHBlbmRpbmcgY2FjaGUgaW5zZXJ0aW9uXG5cdFx0aWYgKCBzaXplID09PSBtYXhTaXplICkge1xuXHRcdFx0dGFpbCA9IHRhaWwucHJldjtcblx0XHRcdHRhaWwubmV4dCA9IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNpemUrKztcblx0XHR9XG5cblx0XHRoZWFkID0gbm9kZTtcblxuXHRcdHJldHVybiBub2RlLnZhbDtcblx0fVxuXG5cdG1lbW9pemVkLmNsZWFyID0gZnVuY3Rpb24oKSB7XG5cdFx0aGVhZCA9IG51bGw7XG5cdFx0dGFpbCA9IG51bGw7XG5cdFx0c2l6ZSA9IDA7XG5cdH07XG5cblx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnICkge1xuXHRcdC8vIENhY2hlIGlzIG5vdCBleHBvc2VkIGluIHRoZSBwdWJsaWMgQVBJLCBidXQgdXNlZCBpbiB0ZXN0cyB0byBlbnN1cmVcblx0XHQvLyBleHBlY3RlZCBsaXN0IHByb2dyZXNzaW9uXG5cdFx0bWVtb2l6ZWQuZ2V0Q2FjaGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBbIGhlYWQsIHRhaWwsIHNpemUgXTtcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIG1lbW9pemVkO1xufTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIvKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAocm9vdCwgcGx1cmFsaXplKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICh0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBOb2RlLlxuICAgIG1vZHVsZS5leHBvcnRzID0gcGx1cmFsaXplKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELCByZWdpc3RlcnMgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHBsdXJhbGl6ZSgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsLlxuICAgIHJvb3QucGx1cmFsaXplID0gcGx1cmFsaXplKCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgLy8gUnVsZSBzdG9yYWdlIC0gcGx1cmFsaXplIGFuZCBzaW5ndWxhcml6ZSBuZWVkIHRvIGJlIHJ1biBzZXF1ZW50aWFsbHksXG4gIC8vIHdoaWxlIG90aGVyIHJ1bGVzIGNhbiBiZSBvcHRpbWl6ZWQgdXNpbmcgYW4gb2JqZWN0IGZvciBpbnN0YW50IGxvb2t1cHMuXG4gIHZhciBwbHVyYWxSdWxlcyA9IFtdO1xuICB2YXIgc2luZ3VsYXJSdWxlcyA9IFtdO1xuICB2YXIgdW5jb3VudGFibGVzID0ge307XG4gIHZhciBpcnJlZ3VsYXJQbHVyYWxzID0ge307XG4gIHZhciBpcnJlZ3VsYXJTaW5nbGVzID0ge307XG5cbiAgLyoqXG4gICAqIFNhbml0aXplIGEgcGx1cmFsaXphdGlvbiBydWxlIHRvIGEgdXNhYmxlIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtICB7KFJlZ0V4cHxzdHJpbmcpfSBydWxlXG4gICAqIEByZXR1cm4ge1JlZ0V4cH1cbiAgICovXG4gIGZ1bmN0aW9uIHNhbml0aXplUnVsZSAocnVsZSkge1xuICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHJ1bGUgKyAnJCcsICdpJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJ1bGU7XG4gIH1cblxuICAvKipcbiAgICogUGFzcyBpbiBhIHdvcmQgdG9rZW4gdG8gcHJvZHVjZSBhIGZ1bmN0aW9uIHRoYXQgY2FuIHJlcGxpY2F0ZSB0aGUgY2FzZSBvblxuICAgKiBhbm90aGVyIHdvcmQuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB3b3JkXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB0b2tlblxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIHJlc3RvcmVDYXNlICh3b3JkLCB0b2tlbikge1xuICAgIC8vIFRva2VucyBhcmUgYW4gZXhhY3QgbWF0Y2guXG4gICAgaWYgKHdvcmQgPT09IHRva2VuKSByZXR1cm4gdG9rZW47XG5cbiAgICAvLyBMb3dlciBjYXNlZCB3b3Jkcy4gRS5nLiBcImhlbGxvXCIuXG4gICAgaWYgKHdvcmQgPT09IHdvcmQudG9Mb3dlckNhc2UoKSkgcmV0dXJuIHRva2VuLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyBVcHBlciBjYXNlZCB3b3Jkcy4gRS5nLiBcIldISVNLWVwiLlxuICAgIGlmICh3b3JkID09PSB3b3JkLnRvVXBwZXJDYXNlKCkpIHJldHVybiB0b2tlbi50b1VwcGVyQ2FzZSgpO1xuXG4gICAgLy8gVGl0bGUgY2FzZWQgd29yZHMuIEUuZy4gXCJUaXRsZVwiLlxuICAgIGlmICh3b3JkWzBdID09PSB3b3JkWzBdLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiB0b2tlbi5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRva2VuLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIC8vIExvd2VyIGNhc2VkIHdvcmRzLiBFLmcuIFwidGVzdFwiLlxuICAgIHJldHVybiB0b2tlbi50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVycG9sYXRlIGEgcmVnZXhwIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAgICogQHBhcmFtICB7QXJyYXl9ICBhcmdzXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIGludGVycG9sYXRlIChzdHIsIGFyZ3MpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcJChcXGR7MSwyfSkvZywgZnVuY3Rpb24gKG1hdGNoLCBpbmRleCkge1xuICAgICAgcmV0dXJuIGFyZ3NbaW5kZXhdIHx8ICcnO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgYSB3b3JkIHVzaW5nIGEgcnVsZS5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSB3b3JkXG4gICAqIEBwYXJhbSAge0FycmF5fSAgcnVsZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlICh3b3JkLCBydWxlKSB7XG4gICAgcmV0dXJuIHdvcmQucmVwbGFjZShydWxlWzBdLCBmdW5jdGlvbiAobWF0Y2gsIGluZGV4KSB7XG4gICAgICB2YXIgcmVzdWx0ID0gaW50ZXJwb2xhdGUocnVsZVsxXSwgYXJndW1lbnRzKTtcblxuICAgICAgaWYgKG1hdGNoID09PSAnJykge1xuICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2Uod29yZFtpbmRleCAtIDFdLCByZXN1bHQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdG9yZUNhc2UobWF0Y2gsIHJlc3VsdCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2FuaXRpemUgYSB3b3JkIGJ5IHBhc3NpbmcgaW4gdGhlIHdvcmQgYW5kIHNhbml0aXphdGlvbiBydWxlcy5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIHRva2VuXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB3b3JkXG4gICAqIEBwYXJhbSAge0FycmF5fSAgICBydWxlc1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBzYW5pdGl6ZVdvcmQgKHRva2VuLCB3b3JkLCBydWxlcykge1xuICAgIC8vIEVtcHR5IHN0cmluZyBvciBkb2Vzbid0IG5lZWQgZml4aW5nLlxuICAgIGlmICghdG9rZW4ubGVuZ3RoIHx8IHVuY291bnRhYmxlcy5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgIHJldHVybiB3b3JkO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBydWxlcy5sZW5ndGg7XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIHNhbml0aXphdGlvbiBydWxlcyBhbmQgdXNlIHRoZSBmaXJzdCBvbmUgdG8gbWF0Y2guXG4gICAgd2hpbGUgKGxlbi0tKSB7XG4gICAgICB2YXIgcnVsZSA9IHJ1bGVzW2xlbl07XG5cbiAgICAgIGlmIChydWxlWzBdLnRlc3Qod29yZCkpIHJldHVybiByZXBsYWNlKHdvcmQsIHJ1bGUpO1xuICAgIH1cblxuICAgIHJldHVybiB3b3JkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgYSB3b3JkIHdpdGggdGhlIHVwZGF0ZWQgd29yZC5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIHJlcGxhY2VNYXBcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIGtlZXBNYXBcbiAgICogQHBhcmFtICB7QXJyYXl9ICAgIHJ1bGVzXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVdvcmQgKHJlcGxhY2VNYXAsIGtlZXBNYXAsIHJ1bGVzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgICAvLyBHZXQgdGhlIGNvcnJlY3QgdG9rZW4gYW5kIGNhc2UgcmVzdG9yYXRpb24gZnVuY3Rpb25zLlxuICAgICAgdmFyIHRva2VuID0gd29yZC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAvLyBDaGVjayBhZ2FpbnN0IHRoZSBrZWVwIG9iamVjdCBtYXAuXG4gICAgICBpZiAoa2VlcE1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKHdvcmQsIHRva2VuKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgYWdhaW5zdCB0aGUgcmVwbGFjZW1lbnQgbWFwIGZvciBhIGRpcmVjdCB3b3JkIHJlcGxhY2VtZW50LlxuICAgICAgaWYgKHJlcGxhY2VNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3JkLCByZXBsYWNlTWFwW3Rva2VuXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biBhbGwgdGhlIHJ1bGVzIGFnYWluc3QgdGhlIHdvcmQuXG4gICAgICByZXR1cm4gc2FuaXRpemVXb3JkKHRva2VuLCB3b3JkLCBydWxlcyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHdvcmQgaXMgcGFydCBvZiB0aGUgbWFwLlxuICAgKi9cbiAgZnVuY3Rpb24gY2hlY2tXb3JkIChyZXBsYWNlTWFwLCBrZWVwTWFwLCBydWxlcywgYm9vbCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAod29yZCkge1xuICAgICAgdmFyIHRva2VuID0gd29yZC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAoa2VlcE1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHJldHVybiB0cnVlO1xuICAgICAgaWYgKHJlcGxhY2VNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHJldHVybiBzYW5pdGl6ZVdvcmQodG9rZW4sIHRva2VuLCBydWxlcykgPT09IHRva2VuO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUGx1cmFsaXplIG9yIHNpbmd1bGFyaXplIGEgd29yZCBiYXNlZCBvbiB0aGUgcGFzc2VkIGluIGNvdW50LlxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICB3b3JkICAgICAgVGhlIHdvcmQgdG8gcGx1cmFsaXplXG4gICAqIEBwYXJhbSAge251bWJlcn0gIGNvdW50ICAgICBIb3cgbWFueSBvZiB0aGUgd29yZCBleGlzdFxuICAgKiBAcGFyYW0gIHtib29sZWFufSBpbmNsdXNpdmUgV2hldGhlciB0byBwcmVmaXggd2l0aCB0aGUgbnVtYmVyIChlLmcuIDMgZHVja3MpXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIHBsdXJhbGl6ZSAod29yZCwgY291bnQsIGluY2x1c2l2ZSkge1xuICAgIHZhciBwbHVyYWxpemVkID0gY291bnQgPT09IDFcbiAgICAgID8gcGx1cmFsaXplLnNpbmd1bGFyKHdvcmQpIDogcGx1cmFsaXplLnBsdXJhbCh3b3JkKTtcblxuICAgIHJldHVybiAoaW5jbHVzaXZlID8gY291bnQgKyAnICcgOiAnJykgKyBwbHVyYWxpemVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsdXJhbGl6ZSBhIHdvcmQuXG4gICAqXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIHBsdXJhbGl6ZS5wbHVyYWwgPSByZXBsYWNlV29yZChcbiAgICBpcnJlZ3VsYXJTaW5nbGVzLCBpcnJlZ3VsYXJQbHVyYWxzLCBwbHVyYWxSdWxlc1xuICApO1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHdvcmQgaXMgcGx1cmFsLlxuICAgKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBwbHVyYWxpemUuaXNQbHVyYWwgPSBjaGVja1dvcmQoXG4gICAgaXJyZWd1bGFyU2luZ2xlcywgaXJyZWd1bGFyUGx1cmFscywgcGx1cmFsUnVsZXNcbiAgKTtcblxuICAvKipcbiAgICogU2luZ3VsYXJpemUgYSB3b3JkLlxuICAgKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBwbHVyYWxpemUuc2luZ3VsYXIgPSByZXBsYWNlV29yZChcbiAgICBpcnJlZ3VsYXJQbHVyYWxzLCBpcnJlZ3VsYXJTaW5nbGVzLCBzaW5ndWxhclJ1bGVzXG4gICk7XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgd29yZCBpcyBzaW5ndWxhci5cbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgcGx1cmFsaXplLmlzU2luZ3VsYXIgPSBjaGVja1dvcmQoXG4gICAgaXJyZWd1bGFyUGx1cmFscywgaXJyZWd1bGFyU2luZ2xlcywgc2luZ3VsYXJSdWxlc1xuICApO1xuXG4gIC8qKlxuICAgKiBBZGQgYSBwbHVyYWxpemF0aW9uIHJ1bGUgdG8gdGhlIGNvbGxlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHApfSBydWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICByZXBsYWNlbWVudFxuICAgKi9cbiAgcGx1cmFsaXplLmFkZFBsdXJhbFJ1bGUgPSBmdW5jdGlvbiAocnVsZSwgcmVwbGFjZW1lbnQpIHtcbiAgICBwbHVyYWxSdWxlcy5wdXNoKFtzYW5pdGl6ZVJ1bGUocnVsZSksIHJlcGxhY2VtZW50XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBhIHNpbmd1bGFyaXphdGlvbiBydWxlIHRvIHRoZSBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwKX0gcnVsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgcmVwbGFjZW1lbnRcbiAgICovXG4gIHBsdXJhbGl6ZS5hZGRTaW5ndWxhclJ1bGUgPSBmdW5jdGlvbiAocnVsZSwgcmVwbGFjZW1lbnQpIHtcbiAgICBzaW5ndWxhclJ1bGVzLnB1c2goW3Nhbml0aXplUnVsZShydWxlKSwgcmVwbGFjZW1lbnRdKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGFuIHVuY291bnRhYmxlIHdvcmQgcnVsZS5cbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cCl9IHdvcmRcbiAgICovXG4gIHBsdXJhbGl6ZS5hZGRVbmNvdW50YWJsZVJ1bGUgPSBmdW5jdGlvbiAod29yZCkge1xuICAgIGlmICh0eXBlb2Ygd29yZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHVuY291bnRhYmxlc1t3b3JkLnRvTG93ZXJDYXNlKCldID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTZXQgc2luZ3VsYXIgYW5kIHBsdXJhbCByZWZlcmVuY2VzIGZvciB0aGUgd29yZC5cbiAgICBwbHVyYWxpemUuYWRkUGx1cmFsUnVsZSh3b3JkLCAnJDAnKTtcbiAgICBwbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlKHdvcmQsICckMCcpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gaXJyZWd1bGFyIHdvcmQgZGVmaW5pdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNpbmdsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGx1cmFsXG4gICAqL1xuICBwbHVyYWxpemUuYWRkSXJyZWd1bGFyUnVsZSA9IGZ1bmN0aW9uIChzaW5nbGUsIHBsdXJhbCkge1xuICAgIHBsdXJhbCA9IHBsdXJhbC50b0xvd2VyQ2FzZSgpO1xuICAgIHNpbmdsZSA9IHNpbmdsZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaXJyZWd1bGFyU2luZ2xlc1tzaW5nbGVdID0gcGx1cmFsO1xuICAgIGlycmVndWxhclBsdXJhbHNbcGx1cmFsXSA9IHNpbmdsZTtcbiAgfTtcblxuICAvKipcbiAgICogSXJyZWd1bGFyIHJ1bGVzLlxuICAgKi9cbiAgW1xuICAgIC8vIFByb25vdW5zLlxuICAgIFsnSScsICd3ZSddLFxuICAgIFsnbWUnLCAndXMnXSxcbiAgICBbJ2hlJywgJ3RoZXknXSxcbiAgICBbJ3NoZScsICd0aGV5J10sXG4gICAgWyd0aGVtJywgJ3RoZW0nXSxcbiAgICBbJ215c2VsZicsICdvdXJzZWx2ZXMnXSxcbiAgICBbJ3lvdXJzZWxmJywgJ3lvdXJzZWx2ZXMnXSxcbiAgICBbJ2l0c2VsZicsICd0aGVtc2VsdmVzJ10sXG4gICAgWydoZXJzZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgICBbJ2hpbXNlbGYnLCAndGhlbXNlbHZlcyddLFxuICAgIFsndGhlbXNlbGYnLCAndGhlbXNlbHZlcyddLFxuICAgIFsnaXMnLCAnYXJlJ10sXG4gICAgWyd3YXMnLCAnd2VyZSddLFxuICAgIFsnaGFzJywgJ2hhdmUnXSxcbiAgICBbJ3RoaXMnLCAndGhlc2UnXSxcbiAgICBbJ3RoYXQnLCAndGhvc2UnXSxcbiAgICAvLyBXb3JkcyBlbmRpbmcgaW4gd2l0aCBhIGNvbnNvbmFudCBhbmQgYG9gLlxuICAgIFsnZWNobycsICdlY2hvZXMnXSxcbiAgICBbJ2RpbmdvJywgJ2RpbmdvZXMnXSxcbiAgICBbJ3ZvbGNhbm8nLCAndm9sY2Fub2VzJ10sXG4gICAgWyd0b3JuYWRvJywgJ3Rvcm5hZG9lcyddLFxuICAgIFsndG9ycGVkbycsICd0b3JwZWRvZXMnXSxcbiAgICAvLyBFbmRzIHdpdGggYHVzYC5cbiAgICBbJ2dlbnVzJywgJ2dlbmVyYSddLFxuICAgIFsndmlzY3VzJywgJ3Zpc2NlcmEnXSxcbiAgICAvLyBFbmRzIHdpdGggYG1hYC5cbiAgICBbJ3N0aWdtYScsICdzdGlnbWF0YSddLFxuICAgIFsnc3RvbWEnLCAnc3RvbWF0YSddLFxuICAgIFsnZG9nbWEnLCAnZG9nbWF0YSddLFxuICAgIFsnbGVtbWEnLCAnbGVtbWF0YSddLFxuICAgIFsnc2NoZW1hJywgJ3NjaGVtYXRhJ10sXG4gICAgWydhbmF0aGVtYScsICdhbmF0aGVtYXRhJ10sXG4gICAgLy8gT3RoZXIgaXJyZWd1bGFyIHJ1bGVzLlxuICAgIFsnb3gnLCAnb3hlbiddLFxuICAgIFsnYXhlJywgJ2F4ZXMnXSxcbiAgICBbJ2RpZScsICdkaWNlJ10sXG4gICAgWyd5ZXMnLCAneWVzZXMnXSxcbiAgICBbJ2Zvb3QnLCAnZmVldCddLFxuICAgIFsnZWF2ZScsICdlYXZlcyddLFxuICAgIFsnZ29vc2UnLCAnZ2Vlc2UnXSxcbiAgICBbJ3Rvb3RoJywgJ3RlZXRoJ10sXG4gICAgWydxdWl6JywgJ3F1aXp6ZXMnXSxcbiAgICBbJ2h1bWFuJywgJ2h1bWFucyddLFxuICAgIFsncHJvb2YnLCAncHJvb2ZzJ10sXG4gICAgWydjYXJ2ZScsICdjYXJ2ZXMnXSxcbiAgICBbJ3ZhbHZlJywgJ3ZhbHZlcyddLFxuICAgIFsnbG9vZXknLCAnbG9vaWVzJ10sXG4gICAgWyd0aGllZicsICd0aGlldmVzJ10sXG4gICAgWydncm9vdmUnLCAnZ3Jvb3ZlcyddLFxuICAgIFsncGlja2F4ZScsICdwaWNrYXhlcyddLFxuICAgIFsncGFzc2VyYnknLCAncGFzc2Vyc2J5J11cbiAgXS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgcmV0dXJuIHBsdXJhbGl6ZS5hZGRJcnJlZ3VsYXJSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xuICB9KTtcblxuICAvKipcbiAgICogUGx1cmFsaXphdGlvbiBydWxlcy5cbiAgICovXG4gIFtcbiAgICBbL3M/JC9pLCAncyddLFxuICAgIFsvW15cXHUwMDAwLVxcdTAwN0ZdJC9pLCAnJDAnXSxcbiAgICBbLyhbXmFlaW91XWVzZSkkL2ksICckMSddLFxuICAgIFsvKGF4fHRlc3QpaXMkL2ksICckMWVzJ10sXG4gICAgWy8oYWxpYXN8W15hb3VddXN8dFtsbV1hc3xnYXN8cmlzKSQvaSwgJyQxZXMnXSxcbiAgICBbLyhlW21uXXUpcz8kL2ksICckMXMnXSxcbiAgICBbLyhbXmxdaWFzfFthZWlvdV1sYXN8W2VqenJdYXN8W2l1XWFtKSQvaSwgJyQxJ10sXG4gICAgWy8oYWx1bW58c3lsbGFifHZpcnxyYWRpfG51Y2xlfGZ1bmd8Y2FjdHxzdGltdWx8dGVybWlufGJhY2lsbHxmb2N8dXRlcnxsb2N8c3RyYXQpKD86dXN8aSkkL2ksICckMWknXSxcbiAgICBbLyhhbHVtbnxhbGd8dmVydGVicikoPzphfGFlKSQvaSwgJyQxYWUnXSxcbiAgICBbLyhzZXJhcGh8Y2hlcnViKSg/OmltKT8kL2ksICckMWltJ10sXG4gICAgWy8oaGVyfGF0fGdyKW8kL2ksICckMW9lcyddLFxuICAgIFsvKGFnZW5kfGFkZGVuZHxtaWxsZW5uaXxkYXR8ZXh0cmVtfGJhY3Rlcml8ZGVzaWRlcmF0fHN0cmF0fGNhbmRlbGFicnxlcnJhdHxvdnxzeW1wb3NpfGN1cnJpY3VsfGF1dG9tYXR8cXVvcikoPzphfHVtKSQvaSwgJyQxYSddLFxuICAgIFsvKGFwaGVsaXxoeXBlcmJhdHxwZXJpaGVsaXxhc3luZGV0fG5vdW1lbnxwaGVub21lbnxjcml0ZXJpfG9yZ2FufHByb2xlZ29tZW58aGVkcnxhdXRvbWF0KSg/OmF8b24pJC9pLCAnJDFhJ10sXG4gICAgWy9zaXMkL2ksICdzZXMnXSxcbiAgICBbLyg/Oihrbml8d2l8bGkpZmV8KGFyfGx8ZWF8ZW98b2F8aG9vKWYpJC9pLCAnJDEkMnZlcyddLFxuICAgIFsvKFteYWVpb3V5XXxxdSl5JC9pLCAnJDFpZXMnXSxcbiAgICBbLyhbXmNoXVtpZW9dW2xuXSlleSQvaSwgJyQxaWVzJ10sXG4gICAgWy8oeHxjaHxzc3xzaHx6eikkL2ksICckMWVzJ10sXG4gICAgWy8obWF0cnxjb2R8bXVyfHNpbHx2ZXJ0fGluZHxhcHBlbmQpKD86aXh8ZXgpJC9pLCAnJDFpY2VzJ10sXG4gICAgWy9cXGIoKD86dGl0KT9tfGwpKD86aWNlfG91c2UpJC9pLCAnJDFpY2UnXSxcbiAgICBbLyhwZSkoPzpyc29ufG9wbGUpJC9pLCAnJDFvcGxlJ10sXG4gICAgWy8oY2hpbGQpKD86cmVuKT8kL2ksICckMXJlbiddLFxuICAgIFsvZWF1eCQvaSwgJyQwJ10sXG4gICAgWy9tW2FlXW4kL2ksICdtZW4nXSxcbiAgICBbJ3Rob3UnLCAneW91J11cbiAgXS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgcmV0dXJuIHBsdXJhbGl6ZS5hZGRQbHVyYWxSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xuICB9KTtcblxuICAvKipcbiAgICogU2luZ3VsYXJpemF0aW9uIHJ1bGVzLlxuICAgKi9cbiAgW1xuICAgIFsvcyQvaSwgJyddLFxuICAgIFsvKHNzKSQvaSwgJyQxJ10sXG4gICAgWy8od2l8a25pfCg/OmFmdGVyfGhhbGZ8aGlnaHxsb3d8bWlkfG5vbnxuaWdodHxbXlxcd118XilsaSl2ZXMkL2ksICckMWZlJ10sXG4gICAgWy8oYXJ8KD86d298W2FlXSlsfFtlb11bYW9dKXZlcyQvaSwgJyQxZiddLFxuICAgIFsvaWVzJC9pLCAneSddLFxuICAgIFsvXFxiKFtwbF18em9tYnwoPzpuZWNrfGNyb3NzKT90fGNvbGx8ZmFlcnxmb29kfGdlbnxnb29ufGdyb3VwfGxhc3N8dGFsa3xnb2FsfGN1dClpZXMkL2ksICckMWllJ10sXG4gICAgWy9cXGIobW9ufHNtaWwpaWVzJC9pLCAnJDFleSddLFxuICAgIFsvXFxiKCg/OnRpdCk/bXxsKWljZSQvaSwgJyQxb3VzZSddLFxuICAgIFsvKHNlcmFwaHxjaGVydWIpaW0kL2ksICckMSddLFxuICAgIFsvKHh8Y2h8c3N8c2h8enp8dHRvfGdvfGNob3xhbGlhc3xbXmFvdV11c3x0W2xtXWFzfGdhc3woPzpoZXJ8YXR8Z3Ipb3xbYWVpb3VdcmlzKSg/OmVzKT8kL2ksICckMSddLFxuICAgIFsvKGFuYWx5fGRpYWdub3xwYXJlbnRoZXxwcm9nbm98c3lub3B8dGhlfGVtcGhhfGNyaXxuZSkoPzpzaXN8c2VzKSQvaSwgJyQxc2lzJ10sXG4gICAgWy8obW92aWV8dHdlbHZlfGFidXNlfGVbbW5ddSlzJC9pLCAnJDEnXSxcbiAgICBbLyh0ZXN0KSg/OmlzfGVzKSQvaSwgJyQxaXMnXSxcbiAgICBbLyhhbHVtbnxzeWxsYWJ8dmlyfHJhZGl8bnVjbGV8ZnVuZ3xjYWN0fHN0aW11bHx0ZXJtaW58YmFjaWxsfGZvY3x1dGVyfGxvY3xzdHJhdCkoPzp1c3xpKSQvaSwgJyQxdXMnXSxcbiAgICBbLyhhZ2VuZHxhZGRlbmR8bWlsbGVubml8ZGF0fGV4dHJlbXxiYWN0ZXJpfGRlc2lkZXJhdHxzdHJhdHxjYW5kZWxhYnJ8ZXJyYXR8b3Z8c3ltcG9zaXxjdXJyaWN1bHxxdW9yKWEkL2ksICckMXVtJ10sXG4gICAgWy8oYXBoZWxpfGh5cGVyYmF0fHBlcmloZWxpfGFzeW5kZXR8bm91bWVufHBoZW5vbWVufGNyaXRlcml8b3JnYW58cHJvbGVnb21lbnxoZWRyfGF1dG9tYXQpYSQvaSwgJyQxb24nXSxcbiAgICBbLyhhbHVtbnxhbGd8dmVydGVicilhZSQvaSwgJyQxYSddLFxuICAgIFsvKGNvZHxtdXJ8c2lsfHZlcnR8aW5kKWljZXMkL2ksICckMWV4J10sXG4gICAgWy8obWF0cnxhcHBlbmQpaWNlcyQvaSwgJyQxaXgnXSxcbiAgICBbLyhwZSkocnNvbnxvcGxlKSQvaSwgJyQxcnNvbiddLFxuICAgIFsvKGNoaWxkKXJlbiQvaSwgJyQxJ10sXG4gICAgWy8oZWF1KXg/JC9pLCAnJDEnXSxcbiAgICBbL21lbiQvaSwgJ21hbiddXG4gIF0uZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgIHJldHVybiBwbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xuICB9KTtcblxuICAvKipcbiAgICogVW5jb3VudGFibGUgcnVsZXMuXG4gICAqL1xuICBbXG4gICAgLy8gU2luZ3VsYXIgd29yZHMgd2l0aCBubyBwbHVyYWxzLlxuICAgICdhZHVsdGhvb2QnLFxuICAgICdhZHZpY2UnLFxuICAgICdhZ2VuZGEnLFxuICAgICdhaWQnLFxuICAgICdhaXJjcmFmdCcsXG4gICAgJ2FsY29ob2wnLFxuICAgICdhbW1vJyxcbiAgICAnYW5hbHl0aWNzJyxcbiAgICAnYW5pbWUnLFxuICAgICdhdGhsZXRpY3MnLFxuICAgICdhdWRpbycsXG4gICAgJ2Jpc29uJyxcbiAgICAnYmxvb2QnLFxuICAgICdicmVhbScsXG4gICAgJ2J1ZmZhbG8nLFxuICAgICdidXR0ZXInLFxuICAgICdjYXJwJyxcbiAgICAnY2FzaCcsXG4gICAgJ2NoYXNzaXMnLFxuICAgICdjaGVzcycsXG4gICAgJ2Nsb3RoaW5nJyxcbiAgICAnY29kJyxcbiAgICAnY29tbWVyY2UnLFxuICAgICdjb29wZXJhdGlvbicsXG4gICAgJ2NvcnBzJyxcbiAgICAnZGVicmlzJyxcbiAgICAnZGlhYmV0ZXMnLFxuICAgICdkaWdlc3Rpb24nLFxuICAgICdlbGsnLFxuICAgICdlbmVyZ3knLFxuICAgICdlcXVpcG1lbnQnLFxuICAgICdleGNyZXRpb24nLFxuICAgICdleHBlcnRpc2UnLFxuICAgICdmaXJtd2FyZScsXG4gICAgJ2Zsb3VuZGVyJyxcbiAgICAnZnVuJyxcbiAgICAnZ2FsbG93cycsXG4gICAgJ2dhcmJhZ2UnLFxuICAgICdncmFmZml0aScsXG4gICAgJ2hhcmR3YXJlJyxcbiAgICAnaGVhZHF1YXJ0ZXJzJyxcbiAgICAnaGVhbHRoJyxcbiAgICAnaGVycGVzJyxcbiAgICAnaGlnaGppbmtzJyxcbiAgICAnaG9tZXdvcmsnLFxuICAgICdob3VzZXdvcmsnLFxuICAgICdpbmZvcm1hdGlvbicsXG4gICAgJ2plYW5zJyxcbiAgICAnanVzdGljZScsXG4gICAgJ2t1ZG9zJyxcbiAgICAnbGFib3VyJyxcbiAgICAnbGl0ZXJhdHVyZScsXG4gICAgJ21hY2hpbmVyeScsXG4gICAgJ21hY2tlcmVsJyxcbiAgICAnbWFpbCcsXG4gICAgJ21lZGlhJyxcbiAgICAnbWV3cycsXG4gICAgJ21vb3NlJyxcbiAgICAnbXVzaWMnLFxuICAgICdtdWQnLFxuICAgICdtYW5nYScsXG4gICAgJ25ld3MnLFxuICAgICdvbmx5JyxcbiAgICAncGVyc29ubmVsJyxcbiAgICAncGlrZScsXG4gICAgJ3BsYW5rdG9uJyxcbiAgICAncGxpZXJzJyxcbiAgICAncG9saWNlJyxcbiAgICAncG9sbHV0aW9uJyxcbiAgICAncHJlbWlzZXMnLFxuICAgICdyYWluJyxcbiAgICAncmVzZWFyY2gnLFxuICAgICdyaWNlJyxcbiAgICAnc2FsbW9uJyxcbiAgICAnc2Npc3NvcnMnLFxuICAgICdzZXJpZXMnLFxuICAgICdzZXdhZ2UnLFxuICAgICdzaGFtYmxlcycsXG4gICAgJ3NocmltcCcsXG4gICAgJ3NvZnR3YXJlJyxcbiAgICAnc3BlY2llcycsXG4gICAgJ3N0YWZmJyxcbiAgICAnc3dpbmUnLFxuICAgICd0ZW5uaXMnLFxuICAgICd0cmFmZmljJyxcbiAgICAndHJhbnNwb3J0YXRpb24nLFxuICAgICd0cm91dCcsXG4gICAgJ3R1bmEnLFxuICAgICd3ZWFsdGgnLFxuICAgICd3ZWxmYXJlJyxcbiAgICAnd2hpdGluZycsXG4gICAgJ3dpbGRlYmVlc3QnLFxuICAgICd3aWxkbGlmZScsXG4gICAgJ3lvdScsXG4gICAgL3Bva1tlw6ldbW9uJC9pLFxuICAgIC8vIFJlZ2V4ZXMuXG4gICAgL1teYWVpb3VdZXNlJC9pLCAvLyBcImNoaW5lc2VcIiwgXCJqYXBhbmVzZVwiXG4gICAgL2RlZXIkL2ksIC8vIFwiZGVlclwiLCBcInJlaW5kZWVyXCJcbiAgICAvZmlzaCQvaSwgLy8gXCJmaXNoXCIsIFwiYmxvd2Zpc2hcIiwgXCJhbmdlbGZpc2hcIlxuICAgIC9tZWFzbGVzJC9pLFxuICAgIC9vW2l1XXMkL2ksIC8vIFwiY2Fybml2b3JvdXNcIlxuICAgIC9wb3gkL2ksIC8vIFwiY2hpY2twb3hcIiwgXCJzbWFsbHBveFwiXG4gICAgL3NoZWVwJC9pXG4gIF0uZm9yRWFjaChwbHVyYWxpemUuYWRkVW5jb3VudGFibGVSdWxlKTtcblxuICByZXR1cm4gcGx1cmFsaXplO1xufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbiAgdmFyIGhhcyA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcblxuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAoaGFzKHR5cGVTcGVjcywgdHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpZiAodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YXIgZXJyID0gRXJyb3IoXG4gICAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogJyArIGxvY2F0aW9uICsgJyB0eXBlIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgJyArXG4gICAgICAgICAgICAgICdpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJyArIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSArICdgLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciAmJiAhKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJyArXG4gICAgICAgICAgICBsb2NhdGlvbiArICcgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICcgKyB0eXBlb2YgZXJyb3IgKyAnLiAnICtcbiAgICAgICAgICAgICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgK1xuICAgICAgICAgICAgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ZhaWxlZCAnICsgbG9jYXRpb24gKyAnIHR5cGU6ICcgKyBlcnJvci5tZXNzYWdlICsgKHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXNldHMgd2FybmluZyBjYWNoZSB3aGVuIHRlc3RpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2hlY2tQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbnZhciBoYXMgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgZWxlbWVudFR5cGU6IGNyZWF0ZUVsZW1lbnRUeXBlVHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIsXG4gICAgZXhhY3Q6IGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIsXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJyArIHByb3BGdWxsTmFtZSArICdgIHByb3Agb24gYCcgKyBjb21wb25lbnROYW1lICArICdgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZVR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghUmVhY3RJcy5pc1ZhbGlkRWxlbWVudFR5cGUocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQgdHlwZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50cyBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gYXJyYXksIGdvdCAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgYXJndW1lbnRzLiAnICtcbiAgICAgICAgICAgICdBIGNvbW1vbiBtaXN0YWtlIGlzIHRvIHdyaXRlIG9uZU9mKHgsIHksIHopIGluc3RlYWQgb2Ygb25lT2YoW3gsIHksIHpdKS4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGFycmF5LicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcywgZnVuY3Rpb24gcmVwbGFjZXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgU3RyaW5nKHByb3BWYWx1ZSkgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKGhhcyhwcm9wVmFsdWUsIGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZS4gRXhwZWN0ZWQgYW4gYXJyYXkgb2YgY2hlY2sgZnVuY3Rpb25zLCBidXQgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkICcgKyBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcoY2hlY2tlcikgKyAnIGF0IGluZGV4ICcgKyBpICsgJy4nXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgYWxsIGtleXMgaW4gY2FzZSBzb21lIGFyZSByZXF1aXJlZCBidXQgbWlzc2luZyBmcm9tXG4gICAgICAvLyBwcm9wcy5cbiAgICAgIHZhciBhbGxLZXlzID0gYXNzaWduKHt9LCBwcm9wc1twcm9wTmFtZV0sIHNoYXBlVHlwZXMpO1xuICAgICAgZm9yICh2YXIga2V5IGluIGFsbEtleXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgICAgICAgICdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBrZXkgYCcgKyBrZXkgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nICtcbiAgICAgICAgICAgICdcXG5CYWQgb2JqZWN0OiAnICsgSlNPTi5zdHJpbmdpZnkocHJvcHNbcHJvcE5hbWVdLCBudWxsLCAnICAnKSArXG4gICAgICAgICAgICAnXFxuVmFsaWQga2V5czogJyArICBKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhzaGFwZVR5cGVzKSwgbnVsbCwgJyAgJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gICAgLy8gTmF0aXZlIFN5bWJvbC5cbiAgICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBmYWxzeSB2YWx1ZSBjYW4ndCBiZSBhIFN5bWJvbFxuICAgIGlmICghcHJvcFZhbHVlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGUgPSBjaGVja1Byb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZTtcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoUmVhY3RJcy5pc0VsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuIiwiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi44LjZcbiAqIHJlYWN0LWlzLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG52YXIgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yO1xuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIDogMHhlYWM3O1xudmFyIFJFQUNUX1BPUlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucG9ydGFsJykgOiAweGVhY2E7XG52YXIgUkVBQ1RfRlJBR01FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZyYWdtZW50JykgOiAweGVhY2I7XG52YXIgUkVBQ1RfU1RSSUNUX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN0cmljdF9tb2RlJykgOiAweGVhY2M7XG52YXIgUkVBQ1RfUFJPRklMRVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb2ZpbGVyJykgOiAweGVhZDI7XG52YXIgUkVBQ1RfUFJPVklERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb3ZpZGVyJykgOiAweGVhY2Q7XG52YXIgUkVBQ1RfQ09OVEVYVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29udGV4dCcpIDogMHhlYWNlO1xudmFyIFJFQUNUX0FTWU5DX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmFzeW5jX21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbmN1cnJlbnRfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpIDogMHhlYWQwO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpIDogMHhlYWQxO1xudmFyIFJFQUNUX01FTU9fVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0Lm1lbW8nKSA6IDB4ZWFkMztcbnZhciBSRUFDVF9MQVpZX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5sYXp5JykgOiAweGVhZDQ7XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgfHxcbiAgLy8gTm90ZTogaXRzIHR5cGVvZiBtaWdodCBiZSBvdGhlciB0aGFuICdzeW1ib2wnIG9yICdudW1iZXInIGlmIGl0J3MgYSBwb2x5ZmlsbC5cbiAgdHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSB8fCB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCAmJiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTEFaWV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9QUk9WSURFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0NPTlRFWFRfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFKTtcbn1cblxuLyoqXG4gKiBGb3JrZWQgZnJvbSBmYmpzL3dhcm5pbmc6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmJqcy9ibG9iL2U2NmJhMjBhZDViZTQzM2ViNTQ0MjNmMmIwOTdkODI5MzI0ZDlkZTYvcGFja2FnZXMvZmJqcy9zcmMvX19mb3Jrc19fL3dhcm5pbmcuanNcbiAqXG4gKiBPbmx5IGNoYW5nZSBpcyB3ZSB1c2UgY29uc29sZS53YXJuIGluc3RlYWQgb2YgY29uc29sZS5lcnJvcixcbiAqIGFuZCBkbyBub3RoaW5nIHdoZW4gJ2NvbnNvbGUnIGlzIG5vdCBzdXBwb3J0ZWQuXG4gKiBUaGlzIHJlYWxseSBzaW1wbGlmaWVzIHRoZSBjb2RlLlxuICogLS0tXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIGxvd1ByaW9yaXR5V2FybmluZyA9IGZ1bmN0aW9uICgpIHt9O1xuXG57XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xuXG4gIGxvd1ByaW9yaXR5V2FybmluZyA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgbG93UHJpb3JpdHlXYXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxudmFyIGxvd1ByaW9yaXR5V2FybmluZyQxID0gbG93UHJpb3JpdHlXYXJuaW5nO1xuXG5mdW5jdGlvbiB0eXBlT2Yob2JqZWN0KSB7XG4gIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwpIHtcbiAgICB2YXIgJCR0eXBlb2YgPSBvYmplY3QuJCR0eXBlb2Y7XG4gICAgc3dpdGNoICgkJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9FTEVNRU5UX1RZUEU6XG4gICAgICAgIHZhciB0eXBlID0gb2JqZWN0LnR5cGU7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgY2FzZSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0ZSQUdNRU5UX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1RSSUNUX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFyICQkdHlwZW9mVHlwZSA9IHR5cGUgJiYgdHlwZS4kJHR5cGVvZjtcblxuICAgICAgICAgICAgc3dpdGNoICgkJHR5cGVvZlR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9QUk9WSURFUl9UWVBFOlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZlR5cGU7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgICAgcmV0dXJuICQkdHlwZW9mO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8vIEFzeW5jTW9kZSBpcyBkZXByZWNhdGVkIGFsb25nIHdpdGggaXNBc3luY01vZGVcbnZhciBBc3luY01vZGUgPSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG52YXIgQ29uY3VycmVudE1vZGUgPSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbnZhciBDb250ZXh0Q29uc3VtZXIgPSBSRUFDVF9DT05URVhUX1RZUEU7XG52YXIgQ29udGV4dFByb3ZpZGVyID0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbnZhciBFbGVtZW50ID0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xudmFyIEZvcndhcmRSZWYgPSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xudmFyIEZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbnZhciBMYXp5ID0gUkVBQ1RfTEFaWV9UWVBFO1xudmFyIE1lbW8gPSBSRUFDVF9NRU1PX1RZUEU7XG52YXIgUG9ydGFsID0gUkVBQ1RfUE9SVEFMX1RZUEU7XG52YXIgUHJvZmlsZXIgPSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xudmFyIFN0cmljdE1vZGUgPSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xudmFyIFN1c3BlbnNlID0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcblxudmFyIGhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlID0gZmFsc2U7XG5cbi8vIEFzeW5jTW9kZSBzaG91bGQgYmUgZGVwcmVjYXRlZFxuZnVuY3Rpb24gaXNBc3luY01vZGUob2JqZWN0KSB7XG4gIHtcbiAgICBpZiAoIWhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlKSB7XG4gICAgICBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IHRydWU7XG4gICAgICBsb3dQcmlvcml0eVdhcm5pbmckMShmYWxzZSwgJ1RoZSBSZWFjdElzLmlzQXN5bmNNb2RlKCkgYWxpYXMgaGFzIGJlZW4gZGVwcmVjYXRlZCwgJyArICdhbmQgd2lsbCBiZSByZW1vdmVkIGluIFJlYWN0IDE3Ky4gVXBkYXRlIHlvdXIgY29kZSB0byB1c2UgJyArICdSZWFjdElzLmlzQ29uY3VycmVudE1vZGUoKSBpbnN0ZWFkLiBJdCBoYXMgdGhlIGV4YWN0IHNhbWUgQVBJLicpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHx8IHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb250ZXh0Q29uc3VtZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb250ZXh0UHJvdmlkZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRWxlbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRm9yd2FyZFJlZihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xufVxuZnVuY3Rpb24gaXNGcmFnbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNMYXp5KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0xBWllfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTWVtbyhvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9NRU1PX1RZUEU7XG59XG5mdW5jdGlvbiBpc1BvcnRhbChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QT1JUQUxfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUHJvZmlsZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3RyaWN0TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdXNwZW5zZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9TVVNQRU5TRV9UWVBFO1xufVxuXG5leHBvcnRzLnR5cGVPZiA9IHR5cGVPZjtcbmV4cG9ydHMuQXN5bmNNb2RlID0gQXN5bmNNb2RlO1xuZXhwb3J0cy5Db25jdXJyZW50TW9kZSA9IENvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5Db250ZXh0Q29uc3VtZXIgPSBDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLkNvbnRleHRQcm92aWRlciA9IENvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuRWxlbWVudCA9IEVsZW1lbnQ7XG5leHBvcnRzLkZvcndhcmRSZWYgPSBGb3J3YXJkUmVmO1xuZXhwb3J0cy5GcmFnbWVudCA9IEZyYWdtZW50O1xuZXhwb3J0cy5MYXp5ID0gTGF6eTtcbmV4cG9ydHMuTWVtbyA9IE1lbW87XG5leHBvcnRzLlBvcnRhbCA9IFBvcnRhbDtcbmV4cG9ydHMuUHJvZmlsZXIgPSBQcm9maWxlcjtcbmV4cG9ydHMuU3RyaWN0TW9kZSA9IFN0cmljdE1vZGU7XG5leHBvcnRzLlN1c3BlbnNlID0gU3VzcGVuc2U7XG5leHBvcnRzLmlzVmFsaWRFbGVtZW50VHlwZSA9IGlzVmFsaWRFbGVtZW50VHlwZTtcbmV4cG9ydHMuaXNBc3luY01vZGUgPSBpc0FzeW5jTW9kZTtcbmV4cG9ydHMuaXNDb25jdXJyZW50TW9kZSA9IGlzQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLmlzQ29udGV4dENvbnN1bWVyID0gaXNDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLmlzQ29udGV4dFByb3ZpZGVyID0gaXNDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLmlzRWxlbWVudCA9IGlzRWxlbWVudDtcbmV4cG9ydHMuaXNGb3J3YXJkUmVmID0gaXNGb3J3YXJkUmVmO1xuZXhwb3J0cy5pc0ZyYWdtZW50ID0gaXNGcmFnbWVudDtcbmV4cG9ydHMuaXNMYXp5ID0gaXNMYXp5O1xuZXhwb3J0cy5pc01lbW8gPSBpc01lbW87XG5leHBvcnRzLmlzUG9ydGFsID0gaXNQb3J0YWw7XG5leHBvcnRzLmlzUHJvZmlsZXIgPSBpc1Byb2ZpbGVyO1xuZXhwb3J0cy5pc1N0cmljdE1vZGUgPSBpc1N0cmljdE1vZGU7XG5leHBvcnRzLmlzU3VzcGVuc2UgPSBpc1N1c3BlbnNlO1xuICB9KSgpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWlzLnByb2R1Y3Rpb24ubWluLmpzJyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzJyk7XG59XG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1wiaGVscGVyc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJpMThuXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZhbGlkYXRvcnNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsdWVPYmplY3RzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJob29rc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ2ZW5kb3JcIl1bXCJjdWlkXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibG9kYXNoXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZlbmRvclwiXVtcIm1vbWVudFwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9
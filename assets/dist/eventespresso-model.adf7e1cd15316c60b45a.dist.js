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
/* harmony import */ var _utils_parse_infinity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/parse-infinity */ "./assets/src/utils/parse-infinity.js");
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
  cap = Object(_utils_parse_infinity__WEBPACK_IMPORTED_MODULE_3__["default"])(cap, true);
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
 *
 * @param {string} modelName  What model the final string is for.
 * @param {string} queryString  The query being appended to the endpoint.
 * @return {string} The final assembled query string.
 */

var applyQueryString = function applyQueryString(modelName) {
  var queryString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return queryString !== '' ? getEndpoint(modelName) + '?' + queryString : getEndpoint(modelName);
};
/**
 * Strips the base_rest_route (i.e. https://myurl.com/wp-json/) from the
 * provided url string.
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
    datetime: ['DTT_EVT', 'DTT'],
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
/*! exports provided: createGetter, createCallbackGetter, createGetterAndSetter, createAliasGetterAndSetter, createAliasGetter, createEntityGettersAndSetters, createPersistingGettersAndSetters, createRawEntityGettersSetters, createAliasGetterForField, createAliasGetterAndSetterForField, createRenderedGetters, createPrimaryKeyFieldGetters, setCalculatedFieldAndValues, setResources, setRelationsResource, setSaveState, setFieldToPersist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGetter", function() { return createGetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCallbackGetter", function() { return createCallbackGetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGetterAndSetter", function() { return createGetterAndSetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAliasGetterAndSetter", function() { return createAliasGetterAndSetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAliasGetter", function() { return createAliasGetter; });
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
 * Creates initial getters and setters for entities on the provided entity
 * instance using the given data.
 *
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
 *
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
    createAliasGetterAndSetterForField(instance, fieldName);
  }
};
/**
 * Creates "alias" getter for the given field name on the entity instance.
 *
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
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {Function} method
 */

var createAliasesForMethod = function createAliasesForMethod(instance, fieldName, method) {
  // strip field prefixes and camelCase (if there are field prefixes for the
  // entity. (eg. EVT_desc => desc and DTT_EVT_start => start);
  if (instance.fieldPrefixes) {
    var newFieldName = fieldName;
    instance.fieldPrefixes.forEach(function (fieldPrefix) {
      newFieldName = newFieldName.replace(fieldPrefix + '_', '');
    });

    if (newFieldName !== fieldName) {
      method(instance, fieldName, Object(lodash__WEBPACK_IMPORTED_MODULE_2__["camelCase"])(newFieldName));
    }
  }
};
/**
 * Returns a callback that is used in the `getRendered` field getter.
 *
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
 *
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
 * @throws {TypeError}
 */

var maybeConvertFromValueObjectWithAssertions = function maybeConvertFromValueObjectWithAssertions(fieldName, fieldValue, schema) {
  if (Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["isDateTimeField"])(fieldName, schema)) {
    try {
      _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__["ServerDateTime"].assertIsDateTime(fieldValue);
    } catch (error) {
      throw new TypeError('The following error was thrown when trying to convert the "' + fieldName + '" DateTime field to an ISO string: ' + error);
    }

    fieldValue = fieldValue.toISO();
  } else if (Object(_booleans__WEBPACK_IMPORTED_MODULE_4__["isMoneyField"])(fieldName, schema)) {
    try {
      _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__["Money"].assertMoney(fieldValue);
    } catch (error) {
      throw new TypeError('The following error was thrown when trying to convert the "' + fieldName + '" Money field to a number: ' + error);
    }

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
 *
 * @param {string} modelName
 * @return {string}  Ensures the given modelName is its plural form.
 */

var pluralModelName = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (modelName) {
  return pluralize__WEBPACK_IMPORTED_MODULE_2___default()(modelName).toLowerCase();
});
/**
 * Used to normalize the singular form of a given model name.
 *
 * @param {string} modelName
 * @return {string} Ensures the given modelName is in its singular form.
 */

var singularModelName = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (modelName) {
  return pluralize__WEBPACK_IMPORTED_MODULE_2___default.a.singular(modelName).toLowerCase();
});
/**
 * Provides the capitalized Snake_Case format for the given model name
 * typically used in query strings.
 *
 * Example:
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
/* harmony import */ var _utils_parse_infinity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/parse-infinity */ "./assets/src/utils/parse-infinity.js");
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
  qty = Object(_utils_parse_infinity__WEBPACK_IMPORTED_MODULE_3__["default"])(qty, true);
  return qty !== Infinity && ticketEntity.sold >= qty;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLm1vZGVsL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvYXNzZXJ0aW9ucy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2F0dGVuZGVlL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2F0dGVuZGVlL2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvYXR0ZW5kZWUvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9iYXNlLWRhdGUtZm9ybWF0dGVyLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvYmFzZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2NoZWNraW4vY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvY2hlY2tpbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2NoZWNraW4vcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9mb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2RhdGV0aW1lL3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZGF0ZXRpbWUvc3RhdHVzLWhlbHBlci5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2RlZmF1bHQtbW9kZWwtc3RhdGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbmRwb2ludHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9hc3NlcnRpb25zLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZW50aXR5LWZhY3RvcnkvYmFzZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9ib29sZWFucy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2V4dHJhY3RvcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L3ZhbGlkYXRvcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9ldmVudC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9ldmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2V2ZW50L3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9tb2RlbC1uYW1lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL21vZGVscy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3ByaWNlLXR5cGUvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvcHJpY2UtdHlwZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3ByaW1hcnkta2V5cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3JlZ2lzdHJhdGlvbi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvc3RhdHVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC90aWNrZXQvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L3N0YXR1cy1oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvdXRpbHMvcGFyc2UtaW5maW5pdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9tZW1pemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcGx1cmFsaXplL3BsdXJhbGl6ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9ub2RlX21vZHVsZXMvcmVhY3QtaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaGVscGVyc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaTE4blwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsaWRhdG9yc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsdWVPYmplY3RzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiaG9va3NcIl19Iiwid2VicGFjazovL2VlanMubW9kZWwvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZlbmRvclwiLFwiY3VpZFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmVuZG9yXCIsXCJtb21lbnRcIl19Il0sIm5hbWVzIjpbImFzc2VydEVudGl0eUhhc0tleSIsImtleSIsImVudGl0eSIsIm1lc3NhZ2UiLCJzcHJpbnRmIiwiX18iLCJoYXNPd25Qcm9wZXJ0eSIsIkV4Y2VwdGlvbiIsImFzc2VydEltbXV0YWJsZU9iamVjdEhhc1BhdGgiLCJwYXRoIiwiaW1tdXRhYmxlIiwiaGFzSW4iLCJhc3NlcnRJc0FycmF5IiwiaXRlbXMiLCJpc0FycmF5IiwiYXNzZXJ0SXNOb3RFbXB0eSIsImlzRW1wdHkiLCJhc3NlcnRJc01hcCIsIml0ZW0iLCJpc01hcCIsIk1PREVMX05BTUUiLCJvcmRlckJ5TWFwIiwiaWQiLCJsYXN0TmFtZU9ubHkiLCJmaXJzdE5hbWVPbmx5IiwiZmlyc3RUaGVuTGFzdE5hbWUiLCJsYXN0VGhlbkZpcnN0TmFtZSIsInF1ZXJ5RGF0YVR5cGVzIiwiZm9yRXZlbnRJZCIsIlByb3BUeXBlcyIsIm51bWJlciIsImZvckRhdGV0aW1lSWQiLCJmb3JUaWNrZXRJZCIsImZvclN0YXR1c0lkIiwib25lT2YiLCJSRUdJU1RSQVRJT05fU1RBVFVTX0lEUyIsImZvclJlZ2lzdHJhdGlvbklkIiwic2hvd0dyYXZhdGFyIiwiYm9vbCIsInF1ZXJ5RGF0YSIsInNoYXBlIiwibGltaXQiLCJvcmRlckJ5IiwiT2JqZWN0Iiwia2V5cyIsIm9yZGVyIiwiQUxMT1dFRF9PUkRFUl9WQUxVRVMiLCJkZWZhdWx0UXVlcnlEYXRhIiwiUVVFUllfT1JERVJfQVNDIiwibWFwT3JkZXJCeSIsImlzVW5kZWZpbmVkIiwid2hlcmVDb25kaXRpb25zIiwid2hlcmUiLCJwYXJzZUludCIsImlzTmFOIiwicHVzaCIsImluY2x1ZGVzIiwiam9pbiIsImdldFF1ZXJ5U3RyaW5nIiwiYmFzZUdldFF1ZXJ5U3RyaW5nIiwiZm9ybWF0RGF0ZXNPbkVudGl0aWVzIiwiZW50aXRpZXMiLCJlbnRpdHlEYXRlRmllbGRzIiwiZm9ybWF0IiwiZGF0ZUZvcm1hdHMiLCJsb2NhbCIsImZvcm1hdHRlZEVudGl0aWVzIiwiZm9yRWFjaCIsImZvcm1hdERhdGVzT25FbnRpdHkiLCJuZXdFbnRpdHkiLCJkYXRlRmllbGQiLCJmb3JtYXRFbnRpdGllc0RhdGVzVG9NeXNxbCIsImZvcm1hdEVudGl0eURhdGVzVG9NeXNxbCIsImZvcm1hdEVudGl0aWVzRGF0ZXNUb1NpdGUiLCJmb3JtYXRFbnRpdHlEYXRlc1RvU2l0ZSIsImNvbnZlcnRFbnRpdGllc0RhdGVzVG9Nb21lbnQiLCJjb252ZXJ0RW50aXR5RGF0ZXNUb01vbWVudCIsIlFVRVJZX09SREVSX0RFU0MiLCJHUkVBVEVSX1RIQU4iLCJlbmNvZGVVUklDb21wb25lbnQiLCJMRVNTX1RIQU4iLCJHUkVBVEVSX1RIQU5fQU5EX0VRVUFMIiwiTEVTU19USEFOX0FORF9FUVVBTCIsImRlZmF1bHRXaGVyZUNvbmRpdGlvbnMiLCJxdWVyeVBhcmFtcyIsImZpZWxkIiwicXVlcnlTdHJpbmciLCJDSEVDS0lOX1NUQVRVU19JRCIsIlNUQVRVU19DSEVDS0VEX09VVCIsIlNUQVRVU19DSEVDS0VEX0lOIiwiU1RBVFVTX0NIRUNLRURfTkVWRVIiLCJDSEVDS0lOX1NUQVRVU19JRFMiLCJ2YWx1ZXMiLCJjaGVja2luU3RhdHVzIiwib3B0aW9uc0VudGl0eU1hcCIsImRlZmF1bHQiLCJsYWJlbCIsInByZXR0eVN0YXR1cyIsInZhbHVlIiwidGltZXN0YW1wIiwiREFURVRJTUVfU1RBVFVTX0lEIiwiQUNUSVZFIiwiQ0FOQ0VMTEVEIiwiRVhQSVJFRCIsIklOQUNUSVZFIiwiUE9TVFBPTkVEIiwiU09MRF9PVVQiLCJUUkFTSEVEIiwiVVBDT01JTkciLCJEQVRFVElNRV9TVEFUVVNfSURTIiwiTUlOVVRFX0lOX1NFQ09ORFMiLCJIT1VSX0lOX1NFQ09ORFMiLCJEQVlfSU5fU0VDT05EUyIsIldFRUtfSU5fU0VDT05EUyIsIk1PTlRIX0lOX1NFQ09ORFMiLCJEQVRFX0ZJRUxEUyIsImZvcm1hdHRlcnMiLCJmb3JPd24iLCJiYXNlRm9ybWF0dGVyIiwiaW1wbGVtZW50YXRpb24iLCJmdW5jdGlvbk5hbWUiLCJpbmNvbWluZ0FyZ3MiLCJmaXJzdEFyZyIsInB1bGxBdCIsInByZXR0eURhdGVGcm9tRGF0ZVRpbWUiLCJEYXRlVGltZUVudGl0eSIsImNvbnRlbnQiLCJpc01vZGVsRW50aXR5T2ZNb2RlbCIsIkRUVF9FVlRfc3RhcnQiLCJoYXNTYW1lIiwiRFRUX0VWVF9lbmQiLCJhbGxEYXRlVGltZXNBc1N0cmluZyIsIlNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFIiwidG9Gb3JtYXQiLCJEQVRFX1RJTUVfRk9STUFUX1NJVEUiLCJUSU1FX0ZPUk1BVF9TSVRFIiwiRFRUX25hbWUiLCJub3dEYXRlQW5kVGltZSIsIm1vbWVudCIsInNob3dFeHBpcmVkIiwibW9udGgiLCJzdGFydF9kYXRlIiwiZW5kX2RhdGUiLCJzdGFydE9mIiwiZW5kT2YiLCJhc3NlcnREYXRlVGltZUVudGl0eSIsIlR5cGVFcnJvciIsImlzVmFsaWRFbnRpdHlPckFyY2hpdmUiLCJpbmNsdWRlVHJhc2hlZCIsImlzVHJhc2hlZCIsImlzQWN0aXZlIiwic3RhcnQiLCJkaWZmTm93IiwiYXNTZWNvbmRzIiwiZW5kIiwiaXNFeHBpcmVkIiwiaXNSZWNlbnRseUV4cGlyZWQiLCJpc1NvbGRPdXQiLCJjYXAiLCJyZWdMaW1pdCIsInBhcnNlSW5maW5pdHkiLCJJbmZpbml0eSIsInNvbGQiLCJpc1VwY29taW5nIiwiZGVsZXRlZCIsInN0YXR1cyIsImdldEJhY2tncm91bmRDb2xvckNsYXNzIiwiZ2V0RGF0ZVRpbWVTdGF0dXNUZXh0TGFiZWwiLCJkYXRlU3RhdHVzIiwibWFwVG9PYmplY3RWYWx1ZXMiLCJtb2RlbE5hbWVFbmRwb2ludHMiLCJtYXBWYWx1ZXMiLCJnZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCIsIm1lbW9pemUiLCJlbmRwb2ludHMiLCJERUZBVUxUX0xJU1RTX1NUQVRFIiwiREVGQVVMVF9DT1JFX1NUQVRFIiwicmVsYXRpb25zIiwiZGlydHkiLCJpbmRleCIsImRlbGV0ZSIsImFkZCIsInRyYXNoIiwiREVGQVVMVF9TQ0hFTUFfU1RBVEUiLCJzY2hlbWEiLCJmYWN0b3J5IiwicmVsYXRpb25FbmRwb2ludHMiLCJyZWxhdGlvblNjaGVtYSIsImRhdGEiLCJwYXRocyIsImNvbGxlY3Rpb25fZW5kcG9pbnRzIiwiYmFzZVJlc3RSb3V0ZSIsImJhc2VfcmVzdF9yb3V0ZSIsImdldEVuZHBvaW50IiwibW9kZWxOYW1lIiwiYXBwbHlRdWVyeVN0cmluZyIsInN0cmlwQmFzZVJvdXRlRnJvbVVybCIsInVybCIsInJlcGxhY2UiLCJtYXliZUFzc2VydFZhbHVlT2JqZWN0IiwiZmllbGROYW1lIiwiZmllbGRWYWx1ZSIsImlzRGF0ZVRpbWVGaWVsZCIsIkRhdGVUaW1lIiwiYXNzZXJ0SXNEYXRlVGltZSIsImlzTW9uZXlGaWVsZCIsIk1vbmV5IiwiYXNzZXJ0TW9uZXkiLCJhc3NlcnRWYWxpZFNjaGVtYSIsImlzU2NoZW1hIiwiSW52YWxpZFNjaGVtYSIsImFzc2VydFZhbGlkU2NoZW1hRmllbGRQcm9wZXJ0aWVzIiwidHlwZSIsInByb3BlcnRpZXMiLCJyYXciLCJhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZCIsImluc3RhbmNlIiwiaXNWYWxpZCIsImlzU2hhbGxvd1ZhbGlkVmFsdWVGb3JGaWVsZCIsImVudW0iLCJ2YWxpZGF0ZUVudW1UeXBlIiwidmFsaWRhdGVUeXBlIiwibWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMiLCJhc3NlcnRWYWxpZEZpZWxkQW5kVmFsdWVBZ2FpbnN0U2NoZW1hIiwidmFsaWRhdGlvblR5cGUiLCJ2YWxpZGF0ZVR5cGVGb3JGaWVsZCIsIlBSSVZBVEVfUFJPUEVSVElFUyIsIlNBVkVfU1RBVEUiLCJWQUxJREFURV9UWVBFUyIsIkJhc2VFbnRpdHkiLCJlbnRpdHlGaWVsZHNBbmRWYWx1ZXMiLCJmaWVsZFByZWZpeGVzIiwiaXNOZXciLCJDTEVBTiIsImNyZWF0ZUdldHRlciIsInNldFNhdmVTdGF0ZSIsIk5FVyIsIlNldCIsImNyZWF0ZUVudGl0eUdldHRlcnNBbmRTZXR0ZXJzIiwiY3JlYXRlUGVyc2lzdGluZ0dldHRlcnNBbmRTZXR0ZXJzIiwic2VhbCIsInNhdmVTdGF0ZSIsIkRJUlRZIiwicHJvdGVjdGVkRmllbGRzIiwibGVuZ3RoIiwiaW5kZXhPZiIsImtlZXBJZCIsImNyZWF0ZUZhY3RvcnkiLCJjcmVhdGVFbnRpdHlGYWN0b3J5IiwiJHNjaGVtYSIsImNyZWF0ZU5ldyIsImZvckNsb25lIiwibmFtZUNsYXNzIiwibmFtZSIsImV4dGVuZGVkQ2xhc3MiLCJFbnRpdHkiLCJ1cHBlckZpcnN0IiwiY2FtZWxDYXNlIiwiY2xhc3NEZWYiLCJmaWVsZHNBbmRWYWx1ZXMiLCJmcm9tRXhpc3RpbmciLCJoYXNSYXdQcm9wZXJ0eSIsImlzUGxhaW5PYmplY3QiLCJoYXNQcmV0dHlQcm9wZXJ0eSIsInByZXR0eSIsImhhc1JlbmRlcmVkUHJvcGVydHkiLCJyZW5kZXJlZCIsImhhc0Zvcm1hdFByb3BlcnR5IiwiaGFzRW51bVByb3BlcnR5IiwiaXNWYWx1ZU9iamVjdEZpZWxkIiwiaXNVVENEYXRlVGltZUZpZWxkIiwiZGF0ZVRpbWVGaWVsZE5hbWUiLCJpc1ByaW1hcnlLZXlGaWVsZCIsInByaW1hcnlfa2V5IiwiaXNSZWFkT25seSIsInJlYWRvbmx5IiwiaXNFbnRpdHlGaWVsZCIsImlzRW51bUZpZWxkIiwiU3ltYm9sIiwiVkFMSURBVEVfVFlQRSIsIlJBVyIsIlJFTkRFUkVEIiwiUFJFVFRZIiwiTU9ERUxfUFJFRklYRVMiLCJwcmVmaXhNYXAiLCJhcHBseUZpbHRlcnMiLCJhbnN3ZXIiLCJhdHRlbmRlZSIsImNoYW5nZV9sb2ciLCJjaGVja2luIiwiY291bnRyeSIsImN1cnJlbmN5IiwiY3VycmVuY3lfcGF5bWVudF9tZXRob2QiLCJkYXRldGltZSIsImRhdGV0aW1lX3RpY2tldCIsImV2ZW50IiwiZXZlbnRfbWVzc2FnZV90ZW1wbGF0ZSIsImV2ZW50X3F1ZXN0aW9uX2dyb3VwIiwiZXZlbnRfdmVudWUiLCJleHRyYV9qb2luIiwiZXh0cmFfbWV0YSIsImxpbmVfaXRlbSIsIm1lc3NhZ2VfdGVtcGxhdGUiLCJtZXNzYWdlX3RlbXBsYXRlX2dyb3VwIiwicGF5bWVudCIsInBheW1lbnRfbWV0aG9kIiwicG9zdF9tZXRhIiwicHJpY2UiLCJwcmljZV90eXBlIiwicXVlc3Rpb24iLCJxdWVzdGlvbl9ncm91cCIsInF1ZXN0aW9uX2dyb3VwX3F1ZXN0aW9uIiwicXVlc3Rpb25fb3B0aW9uIiwicmVjdXJyZW5jZSIsInJlZ2lzdHJhdGlvbiIsInJlZ2lzdHJhdGlvbl9wYXltZW50Iiwic3RhdGUiLCJ0ZXJtIiwidGVybV9yZWxhdGlvbnNoaXAiLCJ0ZXJtX3RheG9ub215IiwidGlja2V0IiwidGlja2V0X3ByaWNlIiwidGlja2V0X3RlbXBsYXRlIiwidHJhbnNhY3Rpb24iLCJ2ZW51ZSIsIndwX3VzZXIiLCJvcHRzIiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJjcmVhdGVDYWxsYmFja0dldHRlciIsInByb3BlcnR5TmFtZSIsImNhbGxCYWNrIiwiY3JlYXRlR2V0dGVyQW5kU2V0dGVyIiwiaW5pdGlhbEZpZWxkVmFsdWUiLCJwcm9wZXJ0eVZhbHVlIiwic2V0IiwicmVjZWl2ZWRWYWx1ZSIsImlzUHJpbWFyeUZpZWxkIiwic2V0RmllbGRUb1BlcnNpc3QiLCJjcmVhdGVBbGlhc0dldHRlckFuZFNldHRlciIsIm9yaWdpbmFsRmllbGROYW1lIiwiYWxpYXNGaWVsZE5hbWUiLCJjcmVhdGVBbGlhc0dldHRlciIsInByaW1hcnlLZXlzIiwib3JpZ2luYWxGaWVsZHNBbmRWYWx1ZXMiLCJpc1ByaW1hcnlLZXkiLCJzZXRWYWxpZGF0ZVR5cGVGb3JGaWVsZCIsInNldEluaXRpYWxFbnRpdHlGaWVsZHNBbmRWYWx1ZXMiLCJzZXRDYWxjdWxhdGVkRmllbGRBbmRWYWx1ZXMiLCJwb3B1bGF0ZVByb3RlY3RlZEZpZWxkc1Byb3BlcnR5Iiwic2V0UmVzb3VyY2VzIiwiY3JlYXRlUHJpbWFyeUtleUZpZWxkR2V0dGVycyIsInBvcHVsYXRlUHJpbWFyeUtleXMiLCJwb3B1bGF0ZU1pc3NpbmdGaWVsZHMiLCJjYWxjdWxhdGVkRmllbGRzIiwiX2NhbGN1bGF0ZWRfZmllbGRzIiwiX3Byb3RlY3RlZCIsImdldFByaW1hcnlLZXlGaWVsZHNGcm9tU2NoZW1hIiwic2NoZW1hUHJvcGVydGllcyIsInNjaGVtYUZpZWxkIiwiY3VpZCIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJjcmVhdGVBbGlhc0dldHRlckFuZFNldHRlckZvckZpZWxkIiwiZGVyaXZlVmFsaWRhdGVUeXBlRm9yRmllbGQiLCJnZXRFbnRpdHlGaWVsZHNGcm9tU2NoZW1hIiwidW5kZWZpbmVkIiwiZ2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvckNsb25pbmciLCJmb3JVcGRhdGUiLCJnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yUGVyc2lzdGluZyIsImZvckluc2VydCIsImVudGl0eVZhbHVlcyIsInByaW1hcnlLZXkiLCJmb3JQZXJzaXN0IiwiZ2V0RGVmYXVsdFZhbHVlRm9yRmllbGQiLCJjcmVhdGVSYXdFbnRpdHlHZXR0ZXJzU2V0dGVycyIsImRlcml2ZVByZXBhcmVkVmFsdWVGb3JGaWVsZCIsImNyZWF0ZUFsaWFzR2V0dGVyRm9yRmllbGQiLCJjcmVhdGVBbGlhc2VzRm9yTWV0aG9kIiwibWV0aG9kIiwibmV3RmllbGROYW1lIiwiZmllbGRQcmVmaXgiLCJnZXRSZW5kZXJlZENhbGxiYWNrIiwicmVxdWVzdGVkRmllbGROYW1lIiwicmVtb3ZlUHJlZml4ZXNGcm9tRmllbGQiLCJwcmVmaXhlc1RvUmVtb3ZlIiwic29ydEJ5IiwicHJlZml4IiwiY3JlYXRlUmVuZGVyZWRHZXR0ZXJzIiwiZ2V0UmVuZGVyZWQiLCJoYXNNdWx0aXBsZVByaW1hcnlLZXlzQ2FsbGJhY2siLCJoYXNDYWxjdWxhdGVkRmllbGRDYWxsYmFjayIsImZpZWxkTmFtZVRvQ2hlY2siLCJjYWxjdWxhdGVkRmllbGRWYWx1ZSIsImNhbGN1bGF0ZWRGaWVsZE5hbWUiLCJyZWxhdGlvbk5hbWUiLCJyZXNvdXJjZVZhbHVlIiwicmVzb3VyY2VOYW1lIiwiaHJlZiIsImdldFJlbGF0aW9uTmFtZUZyb21MaW5rIiwic2V0UmVsYXRpb25zUmVzb3VyY2UiLCJnZXRSZWxhdGlvblJlc291cmNlQ2FsbGJhY2siLCJyZXNvdXJjZUluZm8iLCJyZXNvdXJjZUxpbmsiLCJzaW5nbGUiLCJnZXRSZWxhdGlvblJlc291cmNlIiwib3ZlcnJpZGUiLCJjdXJyZW50U3RhdGUiLCJJbnZhbGlkQXJndW1lbnQiLCJmaWVsZHNUb1BlcnNpc3RPbkluc2VydCIsIm1heWJlQ29udmVydFRvVmFsdWVPYmplY3QiLCJ2YWxpZGF0ZUlzRGF0ZVRpbWUiLCJmcm9tSVNPIiwiaW5zdGFuY2VPZiIsIlNpdGVDdXJyZW5jeSIsImVycm9yIiwidG9JU08iLCJ0b051bWJlciIsIm1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdCIsImRlcml2ZVJlbmRlcmVkVmFsdWUiLCJwbHVyYWxNb2RlbE5hbWUiLCJsYXN0Iiwic3BsaXQiLCJlbnRpdHlJbnN0YW5jZSIsInJlZHVjZSIsIml0ZXJhdG9yIiwiQXJyYXkiLCJmcm9tIiwiZ2V0UHJpbWFyeUtleVZhbHVlcyIsInBpY2siLCJwaWNrQnkiLCJkZXJpdmVEZWZhdWx0VmFsdWVGb3JUeXBlIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZGVyaXZlVHlwZUZvckZpZWxkIiwidmFsaWQiLCJzaW5nbGVUeXBlIiwiaXNJbnRlZ2VyIiwiaXNOdW1iZXIiLCJpc1N0cmluZyIsImlzQm9vbGVhbiIsImVudW1WYWx1ZXMiLCJleHBlY3RWYWx1ZU9iamVjdHMiLCJpc0VudW0iLCJpc1ZhbHVlT2JqZWN0IiwiRVZFTlRfU1RBVFVTX0lEIiwiRVZFTlRfU1RBVFVTX0lEUyIsImNhdGVnb3J5U2x1ZyIsInN0cmluZyIsInRpY2tldF9zdGFydCIsInRpY2tldF9lbmQiLCJNT0RFTF9OQU1FUyIsInBsdXJhbGl6ZSIsInRvTG93ZXJDYXNlIiwic2luZ3VsYXJNb2RlbE5hbWUiLCJzaW5ndWxhciIsIm1vZGVsTmFtZUZvclF1ZXJ5U3RyaW5nIiwic3RhcnRDYXNlIiwiQkFTRV9QUklDRV9UWVBFUyIsIkJBU0VfUFJJQ0UiLCJESVNDT1VOVCIsIlNVUkNIQVJHRSIsIlRBWCIsInByaW1hcnlfa2V5cyIsInZhbHVlc0ZvckNvbWJpbmVkUHJpbWFyeUtleXMiLCJyZXN1bHQiLCJ0cmltRW5kIiwidmFsdWVGb3JQcmltYXJ5S2V5IiwiZ2V0UHJpbWFyeUtleSIsImdldFByaW1hcnlLZXlRdWVyeVN0cmluZyIsImtleVZhbHVlcyIsImdldEVudGl0eVByaW1hcnlLZXlWYWx1ZXMiLCJrZXlFbnRpdGllc0J5UHJpbWFyeUtleVZhbHVlIiwibWFwcGVkRW50aXRpZXMiLCJNYXAiLCJjcmVhdGVBbmRLZXlFbnRpdGllc0J5UHJpbWFyeUtleVZhbHVlIiwiZW50aXR5SWQiLCJzdGF0dXNNb2RlbCIsImZvckF0dGVuZGVlSWQiLCJmb3JUcmFuc2FjdGlvbklkIiwicmVnX2lkIiwicmVnX2RhdGUiLCJTVEFUVVNfVFlQRV9FTUFJTCIsIlNUQVRVU19UWVBFX0VWRU5UIiwiU1RBVFVTX1RZUEVfTUVTU0FHRSIsIlNUQVRVU19UWVBFX1BBWU1FTlQiLCJTVEFUVVNfVFlQRV9SRUdJU1RSQVRJT04iLCJTVEFUVVNfVFlQRV9UUkFOU0FDVElPTiIsIkVNQUlMX1NUQVRVU19JRCIsIkRSQUZUIiwiU0VOVCIsIlJFR0lTVFJBVElPTl9DTE9TRUQiLCJERUxFVEVEIiwiREVOSUVEIiwiTk9UX0FDVElWRSIsIk5PVF9PUEVOIiwiT05HT0lORyIsIlJFR0lTVFJBVElPTl9PUEVOIiwiUEVORElORyIsIlNFQ09OREFSWSIsIk1FU1NBR0VfU1RBVFVTX0lEIiwiREVCVUciLCJFWEVDVVRJTkciLCJGQUlMIiwiSU5DT01QTEVURSIsIklETEUiLCJSRVNFTkQiLCJSRVRSWSIsIlBBWU1FTlRfU1RBVFVTX0lEIiwiQVBQUk9WRUQiLCJERUNMSU5FRCIsIkZBSUxFRCIsIlJFR0lTVFJBVElPTl9TVEFUVVNfSUQiLCJOT1RfQVBQUk9WRUQiLCJQRU5ESU5HX1BBWU1FTlQiLCJXQUlUX0xJU1QiLCJUUkFOU0FDVElPTl9TVEFUVVNfSUQiLCJBQkFORE9ORUQiLCJDT01QTEVURSIsIk9WRVJQQUlEIiwiQ1BUX1NUQVRVU19JRCIsIlBVQkxJU0giLCJGVVRVUkUiLCJQUklWQVRFIiwiVU5LTk9XTl9TVEFUVVNfSUQiLCJBTExfU1RBVFVTX0lEUyIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfUkVHSVNUUkFUSU9OIiwiTGFiZWwiLCJmcm9tU2FtZVNpbmdsZUFuZFBsdXJhbCIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfVFJBTlNBQ1RJT04iLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX1BBWU1FTlQiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX01FU1NBR0UiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0NQVCIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfRVZFTlQiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX1RJQ0tFVCIsIlRJQ0tFVF9TVEFUVVNfSUQiLCJBUkNISVZFRCIsIk9OU0FMRSIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfREFURVRJTUUiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0NIRUNLSU4iLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0FMTCIsInN0YXR1c0NvZGUiLCJGT1JNQVRfU0VOVEVOQ0VfQ0FTRSIsImFzRm9ybWF0dGVkIiwicHJldHR5U3RhdHVzZXMiLCJzdGF0dXNDb2RlcyIsIm1hcHBlZFN0YXR1c2VzIiwic3RhdHVzVHlwZSIsIlRJQ0tFVF9TVEFUVVNfSURTIiwiYXNzZXJ0VGlja2V0RW50aXR5IiwidGlja2V0RW50aXR5IiwiaW5jbHVkZUFyY2hpdmVkIiwiaXNBcmNoaXZlZCIsImlzT25TYWxlIiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsInF0eSIsImlzUGVuZGluZyIsImdldFRpY2tldFN0YXR1c1RleHRMYWJlbCIsInRpY2tldFN0YXR1cyIsImFzSW50IiwiZm9yRGIiLCJyZXByZXNlbnRzSW5maW5pdHkiLCJpc05pbCIsInByb3BzIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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O0FBQ0EsYUFBYSxnQkFBZ0I7QUFDN0IsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0JBQWdCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0EsU0FBUztBQUNULDRCQUE0QjtBQUM1QixPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLElBQXFDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsVUFBVSxLQUFxQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7Ozs7QUFJYixJQUFJLElBQXFDO0FBQ3pDO0FBQ0E7O0FBRUEsOENBQThDLGNBQWM7O0FBRTVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxzRkFBc0YsYUFBYTtBQUNuRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RkFBNEYsZUFBZTtBQUMzRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7O0FDbE9hOztBQUViLElBQUksS0FBcUMsRUFBRSxFQUUxQztBQUNELG1CQUFtQixtQkFBTyxDQUFDLGtIQUErQjtBQUMxRDs7Ozs7Ozs7Ozs7O0FDTkEsYUFBYSwrQkFBK0IsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E5QyxhQUFhLDBDQUEwQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXpELGFBQWEsdUNBQXVDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdEQsYUFBYSw2Q0FBNkMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E1RCxhQUFhLCtDQUErQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTlELGFBQWEsc0NBQXNDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBckQsYUFBYSxpREFBaUQsRUFBRSxJOzs7Ozs7Ozs7OztBQ0FoRSxhQUFhLGlDQUFpQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQWhELGFBQWEsbURBQW1ELEVBQUUsSSIsImZpbGUiOiJldmVudGVzcHJlc3NvLW1vZGVsLmFkZjdlMWNkMTUzMTZjNjBiNDVhLmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9pbmRleC5qc1wiKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBFeGNlcHRpb24gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcbmltcG9ydCB7IHNwcmludGYsIF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc0FycmF5LCBpc0VtcHR5LCBpc01hcCB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiBrZXkgZXhpc3RzIGluIHRoZSBwcm92aWRlZCBlbnRpdHkgb2JqZWN0LlxuICogVGhpcyBpcyB1c2VkIHdoZW4gY2FsbGluZyBjb2RlIHdhbnRzIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24uXG4gKlxuICogQHBhcmFtIHsgc3RyaW5nIH0ga2V5XG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHlcbiAqIEBwYXJhbSB7IHN0cmluZyB9IG1lc3NhZ2VcbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfSAgVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgcHJvdmlkZWQgZW50aXR5IGRvZXMgbm90XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgaGF2ZSB0aGUgZ2l2ZW4ga2V5LlxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0RW50aXR5SGFzS2V5ID0gKCBrZXksIGVudGl0eSwgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBzcHJpbnRmKFxuXHRcdFx0X18oXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgZW50aXR5ICglcykgZG9lcyBub3QgaGF2ZSB0aGUgZ2l2ZW4gcHJvcGVydHkgKCVzKScsXG5cdFx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0XHQpLFxuXHRcdFx0ZW50aXR5LFxuXHRcdFx0a2V5LFxuXHRcdCk7XG5cdH1cblx0aWYgKCAhIGVudGl0eS5oYXNPd25Qcm9wZXJ0eSgga2V5ICkgKSB7XG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbiggbWVzc2FnZSApO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gcGF0aCBpbiB0aGUgcHJvdmlkZWQgaW1tdXRhYmxlIG9iamVjdCBleGlzdHMuXG4gKiBUaGlzIGlzIHVzZWQgd2hlbiBjYWxsaW5nIGNvZGUgd2FudHMgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93biBpZiB0aGUgZ2l2ZW5cbiAqIHNlYXJjaCBwYXRoIGFycmF5IGRvZXMgbm90IGV4aXN0IGluIHRoZSBpbW11dGFibGUgb2JqZWN0LlxuICpcbiAqIElmIHRoZSBpbW11dGFibGUgb2JqZWN0IGlzIHNldHVwIGxpa2UgdGhpczpcbiAqXG4gKiBpbW11dGFibGUgPSBJbW11dGFibGUuTWFwKCkuc2V0KCAnZXZlbnQnLCBJbW11dGFibGUuTWFwKCkuc2V0KCAxMCwgRXZlbnQgKSApO1xuICpcbiAqIFRoZW4gYSB2YWxpZCBzZWFyY2hhYmxlIHBhdGggY291bGQgYmUgYFsgJ2V2ZW50JywgMTAgXWAuICBBbiBpbnZhbGlkIHBhdGhcbiAqIHdvdWxkIGJlIGBbICdkYXRldGltZScsIDEwIF1gXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGF0aCAgU2VhcmNoYWJsZSBwYXRoIGZvciB0aGUgaW1tdXRhYmxlIG9qYmVjdCB0byB2ZXJpZnkuXG4gKiBAcGFyYW0ge0ltbXV0YWJsZS5NYXB8SW1tdXRhYmxlLlNldH0gaW1tdXRhYmxlICBBbiBpbW11dGFibGUgb2JqZWN0IChNYXAsIFNldCwgTGlzdCBldGMpXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBBIGN1c3RvbSBtZXNzYWdlIHRvIHVzZS5cbiAqIEB0aHJvd3MgRXhjZXB0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRJbW11dGFibGVPYmplY3RIYXNQYXRoID0gKFxuXHRwYXRoLFxuXHRpbW11dGFibGUsXG5cdG1lc3NhZ2UgPSAnJ1xuKSA9PiB7XG5cdGlmICggbWVzc2FnZSA9PT0gJycgKSB7XG5cdFx0bWVzc2FnZSA9IHNwcmludGYoXG5cdFx0XHRfXyhcblx0XHRcdFx0J1RoZSBwcm92aWRlZCBpbW11dGFibGUgb2JqZWN0ICglcykgZG9lcyBub3QgaGF2ZSB0aGUgZ2l2ZW4gcGF0aCAoJXMpJyxcblx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHRcdCksXG5cdFx0XHRpbW11dGFibGUsXG5cdFx0XHRwYXRoLFxuXHRcdCk7XG5cdH1cblx0aWYgKCAhIGltbXV0YWJsZS5oYXNJbiggcGF0aCApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7Kn0gaXRlbXNcbiAqIEBwYXJhbSB7IHN0cmluZyB9ICBtZXNzYWdlXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH0gVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkuXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRJc0FycmF5ID0gKCBpdGVtcywgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBfXyggJ1RoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYW4gYXJyYXkuJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHR9XG5cdGlmICggISBpc0FycmF5KCBpdGVtcyApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgZW1wdHkgb3Igbm90LlxuICpcbiAqIENhbGwgdGhpcyB2YWxpZGF0b3Igd2hlbiB5b3Ugd2FudCB0byBtYWtlIHN1cmUgdGhlIHZhbHVlIGlzIE5PVCBlbXB0eS5cbiAqXG4gKiBAcGFyYW0geyp9IGl0ZW1zXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtZXNzYWdlXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH0gVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgZW1wdHkuXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRJc05vdEVtcHR5ID0gKCBpdGVtcywgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBfXyhcblx0XHRcdCdUaGUgcHJvdmlkZWQgaXRlbXMgbXVzdCBub3QgYmUgZW1wdHknLFxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHQpO1xuXHR9XG5cdGlmICggaXNFbXB0eSggaXRlbXMgKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIE1hcCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHsqfSBpdGVtXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRJc01hcCA9ICggaXRlbSwgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBfXyhcblx0XHRcdCdUaGUgcHJvdmlkZWQgaXRlbSBtdXN0IGJlIGEgTWFwIG9iamVjdCcsXG5cdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0KTtcblx0fVxuXHRpZiAoICEgaXNNYXAoIGl0ZW0gKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG4iLCJleHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdhdHRlbmRlZSc7XG4iLCJleHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbmV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0FTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG59IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IHsgUkVHSVNUUkFUSU9OX1NUQVRVU19JRFMgfSBmcm9tICcuLi9yZWdpc3RyYXRpb24vY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdGlkOiAnQVRUX0lEJyxcblx0bGFzdE5hbWVPbmx5OiAnQVRUX2xuYW1lJyxcblx0Zmlyc3ROYW1lT25seTogJ0FUVF9mbmFtZScsXG5cdGZpcnN0VGhlbkxhc3ROYW1lOiBbICdBVFRfZm5hbWUnLCAnQVRUX2xuYW1lJyBdLFxuXHRsYXN0VGhlbkZpcnN0TmFtZTogWyAnQVRUX2xuYW1lJywgJ0FUVF9mbmFtZScgXSxcbn07XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0Zm9yRXZlbnRJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yRGF0ZXRpbWVJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yVGlja2V0SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclN0YXR1c0lkOiBQcm9wVHlwZXMub25lT2YoIFJFR0lTVFJBVElPTl9TVEFUVVNfSURTICksXG5cdGZvclJlZ2lzdHJhdGlvbklkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRzaG93R3JhdmF0YXI6IFByb3BUeXBlcy5ib29sLFxuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggT2JqZWN0LmtleXMoIG9yZGVyQnlNYXAgKSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdH0gKSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ2xhc3RUaGVuRmlyc3ROYW1lJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfQVNDLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWRcbiAqIGluIGEgUkVTVCBxdWVyeSBmcm9tIHRoZSBjb250ZXh0IG9mIGEgYXR0ZW5kZWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFx0XHRvcmRlckJ5XG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gXHRSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZ1xuICogXHRcdFx0XHRcdFx0Zm9yIHRoZSBSRVNUIHF1ZXJ5IGZvciB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIGF0dGVuZGVlcyBlbmRwb2ludCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgICAgXHRJRCBvZiBFdmVudCB0byByZXRyaWV2ZSBhdHRlbmRlZXMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRGF0ZXRpbWVJZCBcdElEIG9mIERhdGV0aW1lIHRvIHJldHJpZXZlIGF0dGVuZGVlcyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JUaWNrZXRJZCBcdFx0SUQgb2YgVGlja2V0IHRvIHJldHJpZXZlIGF0dGVuZGVlcyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JSZWdpc3RyYXRpb25JZFxuICogQHBhcmFtIHtzdHJpbmd9IGZvclN0YXR1c0lkIFx0XHRJRCBvZiBTdGF0dXMgdG8gcmV0cmlldmUgYXR0ZW5kZWVzIGZvclxuICogQHBhcmFtIHtzdHJpbmd9IHNob3dHcmF2YXRhciBcdEJvb2xlYW4gdG9nZ2xlIGZvciB3aGV0aGVyIHRvIGRpc3BsYXkgdXNlciBHcmF2YXRhclxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICBcdFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICgge1xuXHRmb3JFdmVudElkID0gMCxcblx0Zm9yRGF0ZXRpbWVJZCA9IDAsXG5cdGZvclRpY2tldElkID0gMCxcblx0Zm9yUmVnaXN0cmF0aW9uSWQgPSAwLFxuXHRmb3JTdGF0dXNJZCA9ICdSQVAnLFxuXHRzaG93R3JhdmF0YXIgPSBmYWxzZSxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cblx0Ly8gZW5zdXJlIHRoYXQgZW50aXR5IElEcyBhcmUgaW50ZWdlcnNcblx0Zm9yUmVnaXN0cmF0aW9uSWQgPSBwYXJzZUludCggZm9yUmVnaXN0cmF0aW9uSWQsIDEwICk7XG5cdGZvclRpY2tldElkID0gcGFyc2VJbnQoIGZvclRpY2tldElkLCAxMCApO1xuXHRmb3JEYXRldGltZUlkID0gcGFyc2VJbnQoIGZvckRhdGV0aW1lSWQsIDEwICk7XG5cdGZvckV2ZW50SWQgPSBwYXJzZUludCggZm9yRXZlbnRJZCwgMTAgKTtcblxuXHQvLyBvcmRlciBvZiBwcmlvcml0eSBmb3IgcHJvdmlkZWQgYXJndW1lbnRzLlxuXHRpZiAoIGZvclJlZ2lzdHJhdGlvbklkICE9PSAwICYmICEgaXNOYU4oIGZvclJlZ2lzdHJhdGlvbklkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggYHdoZXJlW1JlZ2lzdHJhdGlvbi5SRUdfSURdPSR7IGZvclJlZ2lzdHJhdGlvbklkIH1gICk7XG5cdH0gZWxzZSBpZiAoIGZvclRpY2tldElkICE9PSAwICYmICEgaXNOYU4oIGZvclRpY2tldElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggYHdoZXJlW1JlZ2lzdHJhdGlvbi5UaWNrZXQuVEtUX0lEXT0keyBmb3JUaWNrZXRJZCB9YCApO1xuXHR9IGVsc2UgaWYgKCBmb3JEYXRldGltZUlkICE9PSAwICYmICEgaXNOYU4oIGZvckRhdGV0aW1lSWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCBgd2hlcmVbUmVnaXN0cmF0aW9uLlRpY2tldC5EYXRldGltZS5EVFRfSURdPSR7IGZvckRhdGV0aW1lSWQgfWAgKTtcblx0fSBlbHNlIGlmICggZm9yRXZlbnRJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JFdmVudElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggYHdoZXJlW1JlZ2lzdHJhdGlvbi5FVlRfSURdPSR7IGZvckV2ZW50SWQgfWAgKTtcblx0fVxuXG5cdGlmICggUkVHSVNUUkFUSU9OX1NUQVRVU19JRFMuaW5jbHVkZXMoIGZvclN0YXR1c0lkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggYHdoZXJlW1JlZ2lzdHJhdGlvbi5TdGF0dXMuU1RTX0lEXT0keyBmb3JTdGF0dXNJZCB9YCApO1xuXHR9XG5cdGlmICggc2hvd0dyYXZhdGFyID09PSB0cnVlICkge1xuXHRcdHdoZXJlLnB1c2goICdjYWxjdWxhdGU9dXNlcl9hdmF0YXInICk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgZGF0ZUZvcm1hdHMgZnJvbSAnQGV2ZW50ZXNwcmVzc28vaGVscGVycyc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlIGZpZWxkcyBvbiBwcm92aWRlZCBlbnRpdGllcy4gIERvZXMgbm90IG11dGF0ZSBvcmlnaW5hbFxuICogZW50aXRpZXMuXG4gKlxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdGllcyAgQW4gYXJyYXkgb2YgZW50aXR5IG9iamVjdHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyAgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBmb3JtYXQgIFRoZSBmb3JtYXQgdG8gdHJhbnNmb3JtIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyB0by5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBBcnJheSB9ICBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIG5ldyBlbnRpdGllcyB3aXRoIHRoZSBkYXRlIGZpZWxkXG4gKiAgIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdERhdGVzT25FbnRpdGllcyA9IChcblx0ZW50aXRpZXMgPSBbXSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRmb3JtYXQgPSBkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX0lTTzg2MDEsXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRpZiAoIGlzRW1wdHkoIGVudGl0aWVzICkgfHwgaXNFbXB0eSggZW50aXR5RGF0ZUZpZWxkcyApICkge1xuXHRcdHJldHVybiBlbnRpdGllcztcblx0fVxuXHRjb25zdCBmb3JtYXR0ZWRFbnRpdGllcyA9IFtdO1xuXHRlbnRpdGllcy5mb3JFYWNoKCAoIGVudGl0eSApID0+IHtcblx0XHRmb3JtYXR0ZWRFbnRpdGllcy5wdXNoKCBmb3JtYXREYXRlc09uRW50aXR5KFxuXHRcdFx0ZW50aXR5LFxuXHRcdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHRcdGZvcm1hdCxcblx0XHRcdGxvY2FsLFxuXHRcdCkgKTtcblx0fSApO1xuXHRyZXR1cm4gZm9ybWF0dGVkRW50aXRpZXM7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIG9uIHRoZSBwcm92aWRlZCBlbnRpdHkuICBEb2VzIG5vdCBtdXRhdGUgb3JpZ2luYWxcbiAqIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHkgIEFuIGVudGl0eVxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IHN0cmluZyB9IGZvcm1hdCAgVGhlIGZvcm1hdCB0byB0cmFuc2Zvcm0gdGhlIGRhdGUgZmllbGQgdmFsdWVzIHRvLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IE9iamVjdCB9ICBSZXR1cm5zIGEgbmV3IGVudGl0eSB3aXRoIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdERhdGVzT25FbnRpdHkgPSAoXG5cdGVudGl0eSA9IHt9LFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGZvcm1hdCA9IGRhdGVGb3JtYXRzLkRBVEVfVElNRV9GT1JNQVRfSVNPODYwMSxcblx0bG9jYWwgPSB0cnVlLFxuKSA9PiB7XG5cdGNvbnN0IG5ld0VudGl0eSA9IHsgLi4uZW50aXR5IH07XG5cdGVudGl0eURhdGVGaWVsZHMuZm9yRWFjaCggKCBkYXRlRmllbGQgKSA9PiB7XG5cdFx0aWYgKCBuZXdFbnRpdHlbIGRhdGVGaWVsZCBdICkge1xuXHRcdFx0bmV3RW50aXR5WyBkYXRlRmllbGQgXSA9IGRhdGVGb3JtYXRzLmZvcm1hdERhdGVTdHJpbmcoXG5cdFx0XHRcdG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0sXG5cdFx0XHRcdGZvcm1hdCxcblx0XHRcdFx0bG9jYWwsXG5cdFx0XHQpO1xuXHRcdH1cblx0fSApO1xuXHRyZXR1cm4gbmV3RW50aXR5O1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlIGZpZWxkcyB0byBteXNxbCBmb3JtYXQgb24gcHJvdmlkZWQgZW50aXRpZXMuICBEb2VzIG5vdFxuICogbXV0YXRlIG9yaWdpbmFsIGVudGl0aWVzLlxuICpcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXRpZXMgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IEFycmF5IH0gIFJldHVybnMgYSBuZXcgYXJyYXkgb2YgbmV3IGVudGl0aWVzIHdpdGggdGhlIGRhdGUgZmllbGRcbiAqICAgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RW50aXRpZXNEYXRlc1RvTXlzcWwgPSAoXG5cdGVudGl0aWVzID0gW10sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0bG9jYWwgPSB0cnVlLFxuKSA9PiB7XG5cdHJldHVybiBmb3JtYXREYXRlc09uRW50aXRpZXMoXG5cdFx0ZW50aXRpZXMsXG5cdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHRkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX01ZU1FMLFxuXHRcdGxvY2FsLFxuXHQpO1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlIGZpZWxkcyB0byBteXNxbCBmb3JtYXQgb24gcHJvdmlkZWQgZW50aXR5LiAgRG9lcyBub3RcbiAqIG11dGF0ZSBvcmlnaW5hbCBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gZW50aXR5ICBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBPYmplY3QgfSAgUmV0dXJucyBhIG5ldyBlbnRpdHkgd2l0aCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgZm9ybWF0dGVkXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXRFbnRpdHlEYXRlc1RvTXlzcWwgPSAoXG5cdGVudGl0eSA9IHt9LFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRyZXR1cm4gZm9ybWF0RGF0ZXNPbkVudGl0eShcblx0XHRlbnRpdHksXG5cdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHRkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX01ZU1FMLFxuXHRcdGxvY2FsLFxuXHQpO1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlIGZpZWxkcyB0byB0aGUgc2l0ZSBmb3JtYXQgb24gcHJvdmlkZWQgZW50aXRpZXMuICBEb2VzIG5vdFxuICogbXV0YXRlIG9yaWdpbmFsIGVudGl0aWVzLlxuICpcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXRpZXMgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IEFycmF5IH0gIFJldHVybnMgYSBuZXcgYXJyYXkgb2YgbmV3IGVudGl0aWVzIHdpdGggdGhlIGRhdGUgZmllbGRcbiAqICAgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RW50aXRpZXNEYXRlc1RvU2l0ZSA9IChcblx0ZW50aXRpZXMgPSBbXSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0cmV0dXJuIGZvcm1hdERhdGVzT25FbnRpdGllcyhcblx0XHRlbnRpdGllcyxcblx0XHRlbnRpdHlEYXRlRmllbGRzLFxuXHRcdGRhdGVGb3JtYXRzLkRBVEVfVElNRV9GT1JNQVRfU0lURSxcblx0XHRsb2NhbCxcblx0KTtcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgdG8gdGhlIHNpdGUgZm9ybWF0IG9uIHByb3ZpZGVkIGVudGl0eS4gIERvZXMgbm90XG4gKiBtdXRhdGUgb3JpZ2luYWwgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGVudGl0eSAgQW4gYXJyYXkgb2YgZW50aXR5IG9iamVjdHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyAgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICBXaGV0aGVyIG9yIG5vdCB0byBjb252ZXJ0IHRoZSBkYXRlIGZpZWxkIHZhbHVlXG4gKiAgIHRvIHRoZSBsb2NhbCB0aW1lem9uZSBmb3IgdGhlIGhvc3QuXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gIFJldHVybnMgYSBuZXcgZW50aXR5IHdpdGggdGhlIGRhdGUgZmllbGQgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RW50aXR5RGF0ZXNUb1NpdGUgPSAoXG5cdGVudGl0eSA9IHt9LFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRyZXR1cm4gZm9ybWF0RGF0ZXNPbkVudGl0eShcblx0XHRlbnRpdHksXG5cdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHRkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX1NJVEUsXG5cdFx0bG9jYWwsXG5cdCk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGRhdGUgZmllbGQgdmFsdWVzIHRvIG1vbWVudCBvYmplY3RzIGZvciB0aGUgcHJvdmlkZWQgZW50aXRpZXMuXG4gKiBEb2VzIG5vdCBtdXRhdGUgb3JpZ2luYWwgZW50aXRpZXMuXG4gKlxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdGllcyBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHJldHVybiB7IEFycmF5IH0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiBuZXcgZW50aXRpZXMgd2l0aCB0aGUgZGF0ZSBmaWVsZFxuICogICB2YWx1ZXMgY29udmVydGVkIHRvIG1vbWVudCBvYmplY3RzLlxuICovXG5leHBvcnQgY29uc3QgY29udmVydEVudGl0aWVzRGF0ZXNUb01vbWVudCA9IChcblx0ZW50aXRpZXMgPSBbXSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuKSA9PiB7XG5cdGlmICggaXNFbXB0eSggZW50aXRpZXMgKSB8fCBpc0VtcHR5KCBlbnRpdHlEYXRlRmllbGRzICkgKSB7XG5cdFx0cmV0dXJuIGVudGl0aWVzO1xuXHR9XG5cdGNvbnN0IGZvcm1hdHRlZEVudGl0aWVzID0gW107XG5cdGVudGl0aWVzLmZvckVhY2goICggZW50aXR5ICkgPT4ge1xuXHRcdGZvcm1hdHRlZEVudGl0aWVzLnB1c2goIGNvbnZlcnRFbnRpdHlEYXRlc1RvTW9tZW50KFxuXHRcdFx0ZW50aXR5LFxuXHRcdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHQpICk7XG5cdH0gKTtcblx0cmV0dXJuIGZvcm1hdHRlZEVudGl0aWVzO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBkYXRlIGZpZWxkIHZhbHVlcyB0byBtb21lbnQgb2JqZWN0cyBmb3IgdGhlIHByb3ZpZGVkIGVudGl0eS5cbiAqIERvZXMgbm90IG11dGF0ZSBvcmlnaW5hbCBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gZW50aXR5IEFuIGVudGl0eS5cbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEByZXR1cm4geyBPYmplY3QgfSBSZXR1cm5zIGEgbmV3IGVudGl0eSB3aXRoIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyBjb252ZXJ0ZWRcbiAqICAgdG8gbW9tZW50IG9iamVjdHMuXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0RW50aXR5RGF0ZXNUb01vbWVudCA9IChcblx0ZW50aXR5ID0ge30sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcbikgPT4ge1xuXHRjb25zdCBuZXdFbnRpdHkgPSB7IC4uLmVudGl0eSB9O1xuXHRlbnRpdHlEYXRlRmllbGRzLmZvckVhY2goICggZGF0ZUZpZWxkICkgPT4ge1xuXHRcdGlmICggbmV3RW50aXR5WyBkYXRlRmllbGQgXSApIHtcblx0XHRcdG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0gPSBkYXRlRm9ybWF0cy5zdHJpbmdUb01vbWVudChcblx0XHRcdFx0bmV3RW50aXR5WyBkYXRlRmllbGQgXSxcblx0XHRcdCk7XG5cdFx0fVxuXHR9ICk7XG5cdHJldHVybiBuZXdFbnRpdHk7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzQXJyYXksIGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IFFVRVJZX09SREVSX0FTQyA9ICdBU0MnO1xuZXhwb3J0IGNvbnN0IFFVRVJZX09SREVSX0RFU0MgPSAnREVTQyc7XG5leHBvcnQgY29uc3QgQUxMT1dFRF9PUkRFUl9WQUxVRVMgPSBbICdhc2MnLCAnZGVzYycsICdBU0MnLCAnREVTQycgXTtcbmV4cG9ydCBjb25zdCBHUkVBVEVSX1RIQU4gPSBlbmNvZGVVUklDb21wb25lbnQoICc+JyApO1xuZXhwb3J0IGNvbnN0IExFU1NfVEhBTiA9IGVuY29kZVVSSUNvbXBvbmVudCggJzwnICk7XG5leHBvcnQgY29uc3QgR1JFQVRFUl9USEFOX0FORF9FUVVBTCA9IGVuY29kZVVSSUNvbXBvbmVudCggJz49JyApO1xuZXhwb3J0IGNvbnN0IExFU1NfVEhBTl9BTkRfRVFVQUwgPSBlbmNvZGVVUklDb21wb25lbnQoICc8PScgKTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEBwYXJhbSB7IGZ1bmN0aW9uIH0gd2hlcmVDb25kaXRpb25zICBBIGZ1bmN0aW9uIGZvciBwcmVwcGluZyB0aGUgd2hlcmVcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uZGl0aW9ucyBmcm9tIHRoZSBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBmdW5jdGlvbiB9IG1hcE9yZGVyQnlcdFx0QSBmdW5jdGlvbiBmb3IgbWFwcGluZyBpbmNvbWluZyBvcmRlcl9ieVxuICogXHRcdFx0XHRcdFx0XHRcdFx0XHRzdHJpbmdzIHRvIHRoZSB2YWx1ZSBuZWVkZWQgZm9yIHRoZVxuICogXHRcdFx0XHRcdFx0XHRcdFx0XHRxdWVyeV9zdHJpbmcuXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFx0XHRcdFx0XHRSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9IChcblx0cXVlcnlEYXRhID0ge30sXG5cdHdoZXJlQ29uZGl0aW9ucyA9ICgpID0+IG51bGwsXG5cdG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiBvcmRlckJ5LFxuKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gd2hlcmVDb25kaXRpb25zKCBxdWVyeURhdGEgKTtcblx0Y29uc3QgeyBsaW1pdCwgb3JkZXIsIG9yZGVyQnksIGRlZmF1bHRXaGVyZUNvbmRpdGlvbnMgfSA9IHF1ZXJ5RGF0YTtcblx0Y29uc3QgcXVlcnlQYXJhbXMgPSBbXTtcblx0aWYgKCAhIGlzVW5kZWZpbmVkKCBsaW1pdCApICkge1xuXHRcdHF1ZXJ5UGFyYW1zLnB1c2goIGBsaW1pdD0keyBsaW1pdCB9YCApO1xuXHR9XG5cdGlmICggISBpc1VuZGVmaW5lZCggZGVmYXVsdFdoZXJlQ29uZGl0aW9ucyApICkge1xuXHRcdHF1ZXJ5UGFyYW1zLnB1c2goXG5cdFx0XHRgZGVmYXVsdF93aGVyZV9jb25kaXRpb25zPSR7IGRlZmF1bHRXaGVyZUNvbmRpdGlvbnMgfWBcblx0XHQpO1xuXHR9XG5cdGlmICggISBpc1VuZGVmaW5lZCggbWFwT3JkZXJCeSggb3JkZXJCeSApICkgKSB7XG5cdFx0aWYgKCBpc0FycmF5KCBtYXBPcmRlckJ5KCBvcmRlckJ5ICkgKSApIHtcblx0XHRcdGZvciAoIGNvbnN0IGZpZWxkIG9mIG1hcE9yZGVyQnkoIG9yZGVyQnkgKSApIHtcblx0XHRcdFx0cXVlcnlQYXJhbXMucHVzaCggYG9yZGVyX2J5WyR7IGZpZWxkIH1dPSR7IG9yZGVyIH1gICk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHF1ZXJ5UGFyYW1zLnB1c2goIGBvcmRlcj0keyBvcmRlciB9YCApO1xuXHRcdFx0cXVlcnlQYXJhbXMucHVzaCggYG9yZGVyX2J5PSR7IG1hcE9yZGVyQnkoIG9yZGVyQnkgKSB9YCApO1xuXHRcdH1cblx0fVxuXHRsZXQgcXVlcnlTdHJpbmcgPSBxdWVyeVBhcmFtcy5qb2luKCAnJicgKTtcblx0aWYgKCB3aGVyZSApIHtcblx0XHRxdWVyeVN0cmluZyArPSAnJicgKyB3aGVyZTtcblx0fVxuXHRyZXR1cm4gcXVlcnlTdHJpbmc7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBNT0RFTF9OQU1FID0gJ2NoZWNraW4nO1xuXG5leHBvcnQgY29uc3QgQ0hFQ0tJTl9TVEFUVVNfSUQgPSB7XG5cdFNUQVRVU19DSEVDS0VEX09VVDogZmFsc2UsXG5cdFNUQVRVU19DSEVDS0VEX0lOOiB0cnVlLFxuXHRTVEFUVVNfQ0hFQ0tFRF9ORVZFUjogMixcbn07XG5cbmV4cG9ydCBjb25zdCBDSEVDS0lOX1NUQVRVU19JRFMgPSB2YWx1ZXMoXG5cdENIRUNLSU5fU1RBVFVTX0lEXG4pO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHByZXR0eVN0YXR1cyB9IGZyb20gJy4uL3N0YXR1cyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxufSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCAqIGFzIGNoZWNraW5TdGF0dXMgZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdGZvckRhdGV0aW1lSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvckV2ZW50SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclJlZ2lzdHJhdGlvbklkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JUaWNrZXRJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yU3RhdHVzSWQ6IFByb3BUeXBlcy5vbmVPZiggY2hlY2tpblN0YXR1cy5DSEVDS0lOX1NUQVRVU19JRFMgKSxcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIFtcblx0XHRcdCdDSEtfSUQnLFxuXHRcdFx0J1JFR19JRCcsXG5cdFx0XHQnQ0hLX3RpbWVzdGFtcCcsXG5cdFx0XHQnRFRUX0lEJyxcblx0XHRdICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0fSApLFxufTtcblxuZXhwb3J0IGNvbnN0IG9wdGlvbnNFbnRpdHlNYXAgPSB7XG5cdGRlZmF1bHQ6ICgpID0+IHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0e1xuXHRcdFx0XHRsYWJlbDogcHJldHR5U3RhdHVzKFxuXHRcdFx0XHRcdGNoZWNraW5TdGF0dXMuQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfT1VUXG5cdFx0XHRcdCksXG5cdFx0XHRcdHZhbHVlOiBjaGVja2luU3RhdHVzLkNIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX09VVCxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGxhYmVsOiBwcmV0dHlTdGF0dXMoXG5cdFx0XHRcdFx0Y2hlY2tpblN0YXR1cy5DSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9JTlxuXHRcdFx0XHQpLFxuXHRcdFx0XHR2YWx1ZTogY2hlY2tpblN0YXR1cy5DSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9JTixcblx0XHRcdH0sXG5cdFx0XTtcblx0fSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ0NIS190aW1lc3RhbXAnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9ERVNDLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGEgcmVnaXN0cmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHR0aW1lc3RhbXA6ICdDSEtfdGltZXN0YW1wJyxcblx0XHRpZDogJ0NIS19JRCcsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIHJlZ2lzdHJhdGlvbnMgZW5kcG9pbnQgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JEYXRldGltZUlkICAgIFx0SUQgb2YgRXZlbnQgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICAgIElEIG9mIEF0dGVuZGVlIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yUmVnaXN0cmF0aW9uSWQgSUQgb2YgVHJhbnNhY3Rpb24gdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JUaWNrZXRJZCBcdFx0SUQgb2YgVGlja2V0IHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9yU3RhdHVzSWQgXHRcdElEIG9mIFN0YXR1cyB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICBcdFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICgge1xuXHRmb3JEYXRldGltZUlkID0gMCxcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdGZvclJlZ2lzdHJhdGlvbklkID0gMCxcblx0Zm9yVGlja2V0SWQgPSAwLFxuXHRmb3JTdGF0dXNJZCA9ICcnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0Zm9yRXZlbnRJZCA9IHBhcnNlSW50KCBmb3JFdmVudElkLCAxMCApO1xuXHRpZiAoIGZvckV2ZW50SWQgIT09IDAgJiYgISBpc05hTiggZm9yRXZlbnRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtSZWdpc3RyYXRpb24uRVZUX0lEXT0nICsgZm9yRXZlbnRJZCApO1xuXHR9XG5cdGZvckRhdGV0aW1lSWQgPSBwYXJzZUludCggZm9yRGF0ZXRpbWVJZCwgMTAgKTtcblx0aWYgKCBmb3JEYXRldGltZUlkICE9PSAwICYmICEgaXNOYU4oIGZvckRhdGV0aW1lSWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbRFRUX0lEXT0nICsgZm9yRGF0ZXRpbWVJZCApO1xuXHR9XG5cdGZvclJlZ2lzdHJhdGlvbklkID0gcGFyc2VJbnQoIGZvclJlZ2lzdHJhdGlvbklkLCAxMCApO1xuXHRpZiAoIGZvclJlZ2lzdHJhdGlvbklkICE9PSAwICYmICEgaXNOYU4oIGZvclJlZ2lzdHJhdGlvbklkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1JFR19JRF09JyArIGZvclJlZ2lzdHJhdGlvbklkICk7XG5cdH1cblx0Zm9yVGlja2V0SWQgPSBwYXJzZUludCggZm9yVGlja2V0SWQsIDEwICk7XG5cdGlmICggZm9yVGlja2V0SWQgIT09IDAgJiYgISBpc05hTiggZm9yVGlja2V0SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbUmVnaXN0cmF0aW9uLlRLVF9JRF09JyArIGZvclRpY2tldElkICk7XG5cdH1cblx0aWYgKCBmb3JTdGF0dXNJZCAhPT0gJycgJiYgZm9yU3RhdHVzSWQgIT09IG51bGwgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0NIS19pbl09JyArIGZvclN0YXR1c0lkICk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCJpbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdkYXRldGltZSc7XG5cbmV4cG9ydCBjb25zdCBEQVRFVElNRV9TVEFUVVNfSUQgPSB7XG5cdEFDVElWRTogJ0RUQScsXG5cdENBTkNFTExFRDogJ0RUQycsXG5cdEVYUElSRUQ6ICdEVEUnLFxuXHRJTkFDVElWRTogJ0RUSScsXG5cdFBPU1RQT05FRDogJ0RUUCcsXG5cdFNPTERfT1VUOiAnRFRTJyxcblx0VFJBU0hFRDogJ0RUVCcsXG5cdFVQQ09NSU5HOiAnRFRVJyxcbn07XG5cbmV4cG9ydCBjb25zdCBEQVRFVElNRV9TVEFUVVNfSURTID0gdmFsdWVzKCBEQVRFVElNRV9TVEFUVVNfSUQgKTtcblxuZXhwb3J0IGNvbnN0IE1JTlVURV9JTl9TRUNPTkRTID0gNjA7XG5leHBvcnQgY29uc3QgSE9VUl9JTl9TRUNPTkRTID0gTUlOVVRFX0lOX1NFQ09ORFMgKiA2MDtcbmV4cG9ydCBjb25zdCBEQVlfSU5fU0VDT05EUyA9IEhPVVJfSU5fU0VDT05EUyAqIDI0O1xuZXhwb3J0IGNvbnN0IFdFRUtfSU5fU0VDT05EUyA9IEhPVVJfSU5fU0VDT05EUyAqIDc7XG5leHBvcnQgY29uc3QgTU9OVEhfSU5fU0VDT05EUyA9IERBWV9JTl9TRUNPTkRTICogMzA7XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgYmFzZUZvcm1hdHRlciBmcm9tICcuLi9iYXNlLWRhdGUtZm9ybWF0dGVyJztcblxuLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGZvck93biwgcHVsbEF0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7XG5cdFRJTUVfRk9STUFUX1NJVEUsXG5cdERBVEVfVElNRV9GT1JNQVRfU0lURSxcblx0YWxsRGF0ZVRpbWVzQXNTdHJpbmcsXG5cdFNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby9oZWxwZXJzJztcbmltcG9ydCB7IGlzTW9kZWxFbnRpdHlPZk1vZGVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogQXJyYXkgb2YgZmllbGRzIHRoYXQgaGF2ZSBkYXRlIGluZm9ybWF0aW9uXG4gKiBAdHlwZSB7IHN0cmluZ1tdIH1cbiAqL1xuZXhwb3J0IGNvbnN0IERBVEVfRklFTERTID0gW1xuXHQnRFRUX0VWVF9zdGFydCcsXG5cdCdEVFRfRVZUX2VuZCcsXG5dO1xuXG4vKipcbiAqIFdpbGwgaG9sZCB0aGUgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGxpc3Qgb2YgZm9ybWF0dGVycyBmb3IgZGF0ZXMuICBGb3JtYXR0ZXJzXG4gKiBhcmUgZnVuY3Rpb25zIGRlZmluZWQgaW4gYC4uL2Jhc2UtZGF0ZS1mb3JtYXR0ZXJgIGJ1dCB3cmFwcGVkIGJ5IGR5bmFtaWNhbGx5XG4gKiBnZW5lcmF0ZWQgZnVuY3Rpb25zIChjYWxsYWJsZSB2aWEgc2FtZSBuYW1lKSB0aGF0IGF1dG9tYXRpY2FsbHkgcmVjZWl2ZSB0aGVcbiAqIGNvcnJlY3QgZGF0ZUZpZWxkc01hcCBhcmd1bWVudC5cbiAqXG4gKiBFZy4gIGAuLi9iYXNlLWRhdGUtZm9ybWF0dGVyIGhhc1xuICogZm9ybWF0RGF0ZXNPbkVudGl0aWVzKCBlbnRpdGllcywgZW50aXR5RGF0ZUZpZWxkcywgZm9ybWF0LCBsb2NhbCApO1xuICogV2hlbiBpbXBvcnRpbmcgYGZvcm1hdERhdGVzT25FbnRpdGllc2AgZnJvbSB0aGlzIGZpbGUsIHlvdSBjYW4gY2FsbCBpdCBzaW1wbHlcbiAqIGJ5IGRvaW5nIHRoaXM6XG4gKlxuICogZm9ybWF0RGF0ZXNPbkVudGl0aWVzKCBkYXRlVGltZU9iamVjdHMsIGZvcm1hdCwgbG9jYWwgKTtcbiAqXG4gKiBOb3RpY2UgdGhhdCBpdCdzIGNhbGxlZCB3aXRob3V0IHRoZSBlbnRpdHlEYXRlRmllbGRzIGFyZ3VtZW50IGJlY2F1c2UgdGhhdCdzXG4gKiBwcm92aWRlZCBieSB0aGlzIGdlbmVyYXRvci5cbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IGZvcm1hdHRlcnMgPSB7fTtcblxuZm9yT3duKCBiYXNlRm9ybWF0dGVyLCAoIGltcGxlbWVudGF0aW9uLCBmdW5jdGlvbk5hbWUgKSA9PiB7XG5cdGZvcm1hdHRlcnNbIGZ1bmN0aW9uTmFtZSBdID0gKCAuLi5pbmNvbWluZ0FyZ3MgKSA9PiB7XG5cdFx0Y29uc3QgZmlyc3RBcmcgPSBwdWxsQXQoIGluY29taW5nQXJncywgMCApO1xuXHRcdHJldHVybiBpbXBsZW1lbnRhdGlvbiggZmlyc3RBcmdbIDAgXSwgREFURV9GSUVMRFMsIC4uLmluY29taW5nQXJncyApO1xuXHR9O1xufSApO1xuXG4vKipcbiAqIFRoaXMgd2lsbCBzcGl0IG91dCBhIHByZXR0aWZpZWQgbGFiZWwgZm9yIHRoZSBwcm92aWRlZCBEYXRlVGltZSBlbnRpdHkuXG4gKlxuICogSWYgdGhlcmUgaXMgYSBEVFRfbmFtZSwgdGhlIGZvcm1hdCB3aWxsIGJlOlxuICogYERUVF9uYW1lIChEVFRfRVZUX3N0YXJ0IC0gRFRUX0VWVF9lbmQpYFxuICpcbiAqIElmIG5vIERUVF9uYW1lIHRoZW46XG4gKiBgRFRUX0VWVF9zdGFydCAtIERUVF9FVlRfZW5kYFxuICpcbiAqIFRoaXMgd2lsbCBhY2NvdW50IGZvciBpZiBib3RoIHN0YXJ0IGFuZCBlbmQgYXJlIGluIHRoZSBzYW1lIGRheSBhbmQgc2ltcGx5XG4gKiB1c2UgdGltZSBmb3IgdGhlIGVuZCBwYXJ0LlxuICpcbiAqIEBwYXJhbSB7IEJhc2VFbnRpdHkgfSBEYXRlVGltZUVudGl0eVxuICogQHJldHVybiB7IHN0cmluZyB9ICBBIGZvcm1hdHRlZCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBwcm92aWRlZFxuICogICAgRGF0ZVRpbWVFbnRpdHkuXG4gKi9cbmV4cG9ydCBjb25zdCBwcmV0dHlEYXRlRnJvbURhdGVUaW1lID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcblx0bGV0IGNvbnRlbnQgPSAnJztcblx0aWYgKCBpc01vZGVsRW50aXR5T2ZNb2RlbCggRGF0ZVRpbWVFbnRpdHksICdkYXRldGltZScgKSApIHtcblx0XHRpZiAoIERhdGVUaW1lRW50aXR5LkRUVF9FVlRfc3RhcnQuaGFzU2FtZShcblx0XHRcdERhdGVUaW1lRW50aXR5LkRUVF9FVlRfZW5kLFxuXHRcdFx0J2RheSdcblx0XHQpICkge1xuXHRcdFx0Y29udGVudCArPSBhbGxEYXRlVGltZXNBc1N0cmluZyhcblx0XHRcdFx0U0VQQVJBVE9SX1NQQUNFX0RBU0hfU1BBQ0UsXG5cdFx0XHRcdERhdGVUaW1lRW50aXR5LkRUVF9FVlRfc3RhcnQudG9Gb3JtYXQoXG5cdFx0XHRcdFx0REFURV9USU1FX0ZPUk1BVF9TSVRFXG5cdFx0XHRcdCksXG5cdFx0XHRcdERhdGVUaW1lRW50aXR5LkRUVF9FVlRfZW5kLnRvRm9ybWF0KFxuXHRcdFx0XHRcdFRJTUVfRk9STUFUX1NJVEVcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRlbnQgKz0gYWxsRGF0ZVRpbWVzQXNTdHJpbmcoXG5cdFx0XHRcdFNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFLFxuXHRcdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX3N0YXJ0LnRvRm9ybWF0KFxuXHRcdFx0XHRcdERBVEVfVElNRV9GT1JNQVRfU0lURVxuXHRcdFx0XHQpLFxuXHRcdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX2VuZC50b0Zvcm1hdChcblx0XHRcdFx0XHREQVRFX1RJTUVfRk9STUFUX1NJVEVcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGNvbnRlbnQgPSBEYXRlVGltZUVudGl0eS5EVFRfbmFtZSA/XG5cdFx0XHRgJHsgRGF0ZVRpbWVFbnRpdHkuRFRUX25hbWUgfSAoJHsgY29udGVudCB9KWAgOlxuXHRcdFx0Y29udGVudDtcblx0fVxuXHRyZXR1cm4gY29udGVudDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1hdHRlcnM7XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbmV4cG9ydCAqIGZyb20gJy4vZm9ybWF0dGVyJztcbmV4cG9ydCAqIGZyb20gJy4vc3RhdHVzLWhlbHBlcic7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcblx0R1JFQVRFUl9USEFOLFxuXHRHUkVBVEVSX1RIQU5fQU5EX0VRVUFMLFxuXHRMRVNTX1RIQU5fQU5EX0VRVUFMLFxufSBmcm9tICcuLi9iYXNlJztcblxuZXhwb3J0IGNvbnN0IG5vd0RhdGVBbmRUaW1lID0gbW9tZW50KCk7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIFtcblx0XHRcdCdEVFRfbmFtZScsXG5cdFx0XHQnRFRUX0lEJyxcblx0XHRcdCdzdGFydF9kYXRlJyxcblx0XHRcdCdlbmRfZGF0ZScsXG5cdFx0XSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdFx0c2hvd0V4cGlyZWQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdG1vbnRoOiBQcm9wVHlwZXMubW9udGgsXG5cdH0gKSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHRcdHNob3dFeHBpcmVkOiBib29sZWFuXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdzdGFydF9kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0XHRzaG93RXhwaXJlZDogZmFsc2UsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXJ0X2RhdGU6ICdEVFRfRVZUX3N0YXJ0Jyxcblx0XHRlbmRfZGF0ZTogJ0RUVF9FVlRfZW5kJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gZXZlbnRzIGVuZHBvaW50IHJlcXVlc3QgdXNpbmcgcHJvdmlkZWRcbiAqIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICBJRCBmb3IgRXZlbnQgdG8gcmV0cmlldmUgZGF0ZXRpbWVzIGZyb21cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0V4cGlyZWQgIFdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgZXhwaXJlZCBldmVudHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9udGggICAgICAgICBSZXR1cm4gZXZlbnRzIGZvciB0aGUgZ2l2ZW4gbW9udGguICBDYW4gYmUgYW55XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIGFueSBtb250aCBmb3JtYXQgcmVjb2duaXplZCBieSBtb21lbnQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgIFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICgge1xuXHRmb3JFdmVudElkID0gMCxcblx0c2hvd0V4cGlyZWQgPSBmYWxzZSxcblx0bW9udGggPSAnbm9uZScsXG59ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXHRpZiAoICEgc2hvd0V4cGlyZWQgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEVFRfRVZUX2VuZCoqZXhwaXJlZF1bXT0nICsgR1JFQVRFUl9USEFOICtcblx0XHRcdCcmd2hlcmVbRFRUX0VWVF9lbmQqKmV4cGlyZWRdW109JyArXG5cdFx0XHRub3dEYXRlQW5kVGltZS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRpZiAoIG1vbnRoICYmIG1vbnRoICE9PSAnbm9uZScgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEVFRfRVZUX3N0YXJ0XVtdPScgKyBHUkVBVEVSX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbRFRUX0VWVF9zdGFydF1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLnN0YXJ0T2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RUVF9FVlRfZW5kXVtdPScgKyBMRVNTX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbRFRUX0VWVF9lbmRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5lbmRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmICggcGFyc2VJbnQoIGZvckV2ZW50SWQsIDEwICkgIT09IDAgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0V2ZW50LkVWVF9JRF09JyArIGZvckV2ZW50SWQgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IERBVEVUSU1FX1NUQVRVU19JRCwgTU9ERUxfTkFNRSwgTU9OVEhfSU5fU0VDT05EUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBwYXJzZUluZmluaXR5IGZyb20gJy4uLy4uLy4uL3V0aWxzL3BhcnNlLWluZmluaXR5JztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAqL1xuY29uc3QgYXNzZXJ0RGF0ZVRpbWVFbnRpdHkgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuXHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIERhdGVUaW1lRW50aXR5LCBNT0RFTF9OQU1FICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdCdUaGUgcHJvdmlkZWQgZW50aXR5IGlzIG5vdCBhIGRhdGV0aW1lIGluc3RhbmNlJ1xuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVUcmFzaGVkIGlmIHRydWUgd2lsbCBub3QgZmlsdGVyIG91dCB0cmFzaGVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGV2ZW50IGRhdGUgaXMgdmFsaWQgZW50aXR5IG9yIGFyY2hpdmVcbiAqL1xuY29uc3QgaXNWYWxpZEVudGl0eU9yQXJjaGl2ZSA9ICggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkICkgPT4ge1xuXHRyZXR1cm4gKCBpbmNsdWRlVHJhc2hlZCAmJiBhc3NlcnREYXRlVGltZUVudGl0eSggRGF0ZVRpbWVFbnRpdHkgKSApIHx8XG4gICAgICAgICggISBpbmNsdWRlVHJhc2hlZCAmJiAhIGlzVHJhc2hlZCggRGF0ZVRpbWVFbnRpdHkgKSApO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZVRyYXNoZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IHRyYXNoZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZXZlbnQgZGF0ZSBpcyBvY2N1cnJpbmcgTk9XXG4gKi9cbmV4cG9ydCBjb25zdCBpc0FjdGl2ZSA9ICggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgKSAmJlxuXHREYXRlVGltZUVudGl0eS5zdGFydC5kaWZmTm93KCkuYXNTZWNvbmRzKCkgPCAwICYmXG5cdERhdGVUaW1lRW50aXR5LmVuZC5kaWZmTm93KCkuYXNTZWNvbmRzKCkgPiAwO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZVRyYXNoZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IHRyYXNoZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZW5kIGRhdGUgaXMgaW4gdGhlIHBhc3RcbiAqL1xuZXhwb3J0IGNvbnN0IGlzRXhwaXJlZCA9ICggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgKSAmJlxuXHREYXRlVGltZUVudGl0eS5lbmQuZGlmZk5vdygpLmFzU2Vjb25kcygpIDwgMDtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVUcmFzaGVkIGlmIHRydWUgd2lsbCBub3QgZmlsdGVyIG91dCB0cmFzaGVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGVuZCBkYXRlIGlzIGluIHRoZSBwYXN0XG4gKi9cbmV4cG9ydCBjb25zdCBpc1JlY2VudGx5RXhwaXJlZCA9ICggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgKSAmJlxuXHREYXRlVGltZUVudGl0eS5lbmQuZGlmZk5vdygpLmFzU2Vjb25kcygpIDwgMCAmJlxuXHREYXRlVGltZUVudGl0eS5lbmQuZGlmZk5vdygpLmFzU2Vjb25kcygpID4gKCBNT05USF9JTl9TRUNPTkRTICogLTEgKTtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVUcmFzaGVkIGlmIHRydWUgd2lsbCBub3QgZmlsdGVyIG91dCB0cmFzaGVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRpY2tldHMgc29sZCBtZWV0cyBvciBleGNlZWRzIHJlZ2lzdHJhdGlvbiBsaW1pdFxuICovXG5leHBvcnQgY29uc3QgaXNTb2xkT3V0ID0gKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgPSBmYWxzZSApID0+IHtcblx0aWYgKFxuXHRcdCggaW5jbHVkZVRyYXNoZWQgJiYgISBhc3NlcnREYXRlVGltZUVudGl0eSggRGF0ZVRpbWVFbnRpdHkgKSApIHx8XG5cdFx0KCAhIGluY2x1ZGVUcmFzaGVkICYmIGlzVHJhc2hlZCggRGF0ZVRpbWVFbnRpdHkgKSApXG5cdCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRsZXQgY2FwID0gRGF0ZVRpbWVFbnRpdHkucmVnTGltaXQ7XG5cdGNhcCA9IHBhcnNlSW5maW5pdHkoIGNhcCwgdHJ1ZSApO1xuXHRyZXR1cm4gY2FwICE9PSBJbmZpbml0eSAmJiBEYXRlVGltZUVudGl0eS5zb2xkID49IGNhcDtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVUcmFzaGVkIGlmIHRydWUgd2lsbCBub3QgZmlsdGVyIG91dCB0cmFzaGVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHN0YXJ0IGRhdGUgaXMgaW4gdGhlIGZ1dHVyZVxuICovXG5leHBvcnQgY29uc3QgaXNVcGNvbWluZyA9ICggRGF0ZVRpbWVFbnRpdHksIGluY2x1ZGVUcmFzaGVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgKSAmJlxuXHREYXRlVGltZUVudGl0eS5zdGFydC5kaWZmTm93KCkuYXNTZWNvbmRzKCkgPiAwO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZGF0ZSBpcyBhcmNoaXZlZFxuICovXG5leHBvcnQgY29uc3QgaXNUcmFzaGVkID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcblx0YXNzZXJ0RGF0ZVRpbWVFbnRpdHkoIERhdGVUaW1lRW50aXR5ICk7XG5cdHJldHVybiBEYXRlVGltZUVudGl0eS5kZWxldGVkO1xufTtcblxuLy8gUExaIE5PVEU6XG4vLyBsZWF2aW5nIHRoZSBmb2xsb3dpbmcgY29kZSBpbiBiZWNhdXNlIGl0IGNhbiBiZSB1c2VkIGlmL3doZW4gd2UgZGVjaWRlXG4vLyB0byBmdWxseSBzdXBwb3J0IHRoZXNlIGRhdGV0aW1lIHN0YXR1c2VzIHdoaWNoIGFyZSBjdXJyZW50bHkgZGVmaW5lZFxuLy8gb24gdGhlIEVFX0RhdGV0aW1lIG1vZGVsIG9iamVjdCBjbGFzcyBidXQgbm90IHlldCB1c2VkXG5cbi8vIC8qKlxuLy8gICogQGZ1bmN0aW9uXG4vLyAgKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4vLyAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGRhdGUgaXMgY2FuY2VsbGVkXG4vLyAgKi9cbi8vIGV4cG9ydCBjb25zdCBpc0NhbmNlbGxlZCA9ICggRGF0ZVRpbWVFbnRpdHkgKSA9PiB7XG4vLyBcdGFzc2VydERhdGVUaW1lRW50aXR5KCBEYXRlVGltZUVudGl0eSApO1xuLy8gXHRyZXR1cm4gRGF0ZVRpbWVFbnRpdHkuY2FuY2VsbGVkO1xuLy8gfTtcbi8vXG4vLyAvKipcbi8vICAqIEBmdW5jdGlvblxuLy8gICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuLy8gICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBkYXRlIGhhcyBiZWVuIHBvc3Rwb25lZFxuLy8gICovXG4vLyBleHBvcnQgY29uc3QgaXNQb3N0cG9uZWQgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuLy8gXHRhc3NlcnREYXRlVGltZUVudGl0eSggRGF0ZVRpbWVFbnRpdHkgKTtcbi8vIFx0cmV0dXJuIERhdGVUaW1lRW50aXR5LnBvc3Rwb25lZDtcbi8vIH07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9IHN0YXR1cyBJRFxuICovXG5leHBvcnQgY29uc3Qgc3RhdHVzID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcblx0aWYgKCBpc1RyYXNoZWQoIERhdGVUaW1lRW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIERBVEVUSU1FX1NUQVRVU19JRC5UUkFTSEVEO1xuXHR9XG5cdGlmICggaXNFeHBpcmVkKCBEYXRlVGltZUVudGl0eSApICkge1xuXHRcdHJldHVybiBEQVRFVElNRV9TVEFUVVNfSUQuRVhQSVJFRDtcblx0fVxuXHRpZiAoIGlzU29sZE91dCggRGF0ZVRpbWVFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gREFURVRJTUVfU1RBVFVTX0lELlNPTERfT1VUO1xuXHR9XG5cdGlmICggaXNVcGNvbWluZyggRGF0ZVRpbWVFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gREFURVRJTUVfU1RBVFVTX0lELlVQQ09NSU5HO1xuXHR9XG5cdGlmICggaXNBY3RpdmUoIERhdGVUaW1lRW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIERBVEVUSU1FX1NUQVRVU19JRC5BQ1RJVkU7XG5cdH1cblx0Ly8gUExaIFNFRSBOT1RFIEFCT1ZFXG5cdC8vIGlmICggaXNDYW5jZWxsZWQoIERhdGVUaW1lRW50aXR5ICkgKSB7XG5cdC8vIFx0cmV0dXJuIERBVEVUSU1FX1NUQVRVU19JRC5DQU5DRUxMRUQ7XG5cdC8vIH1cblx0Ly8gaWYgKCBpc1Bvc3Rwb25lZCggRGF0ZVRpbWVFbnRpdHkgKSApIHtcblx0Ly8gXHRyZXR1cm4gREFURVRJTUVfU1RBVFVTX0lELlBPU1RQT05FRDtcblx0Ly8gfVxuXHRhc3NlcnREYXRlVGltZUVudGl0eSggRGF0ZVRpbWVFbnRpdHkgKTtcblx0cmV0dXJuIERBVEVUSU1FX1NUQVRVU19JRC5JTkFDVElWRTtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgIENTUyBjbGFzcyBmb3IgdGhlIGJhY2tncm91bmQgY29sb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEJhY2tncm91bmRDb2xvckNsYXNzID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcblx0cmV0dXJuIGBlZS1zdGF0dXMtYmFja2dyb3VuZC1jb2xvci0keyBzdGF0dXMoIERhdGVUaW1lRW50aXR5ICkgfWA7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuICogQHJldHVybiB7c3RyaW5nfSBkYXRlIHN0YXR1c1xuICovXG5leHBvcnQgY29uc3QgZ2V0RGF0ZVRpbWVTdGF0dXNUZXh0TGFiZWwgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuXHRsZXQgZGF0ZVN0YXR1cyA9ICcnO1xuXHRzd2l0Y2ggKCBzdGF0dXMoIERhdGVUaW1lRW50aXR5ICkgKSB7XG5cdFx0Y2FzZSBEQVRFVElNRV9TVEFUVVNfSUQuU09MRF9PVVQgOlxuXHRcdFx0ZGF0ZVN0YXR1cyA9IF9fKCAnc29sZCBvdXQnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5FWFBJUkVEIDpcblx0XHRcdGRhdGVTdGF0dXMgPSBfXyggJ2V4cGlyZWQnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5VUENPTUlORyA6XG5cdFx0XHRkYXRlU3RhdHVzID0gX18oICd1cGNvbWluZycsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgREFURVRJTUVfU1RBVFVTX0lELkFDVElWRSA6XG5cdFx0XHRkYXRlU3RhdHVzID0gX18oICdhY3RpdmUnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5UUkFTSEVEIDpcblx0XHRcdGRhdGVTdGF0dXMgPSBfXyggJ2FyY2hpdmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBEQVRFVElNRV9TVEFUVVNfSUQuQ0FOQ0VMTEVEIDpcblx0XHRcdGRhdGVTdGF0dXMgPSBfXyggJ2NhbmNlbGxlZCcsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgREFURVRJTUVfU1RBVFVTX0lELlBPU1RQT05FRCA6XG5cdFx0XHRkYXRlU3RhdHVzID0gX18oICdwb3N0cG9uZWQnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5JTkFDVElWRSA6XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGRhdGVTdGF0dXMgPSBfXyggJ2luYWN0aXZlJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdH1cblx0cmV0dXJuIGRhdGVTdGF0dXM7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgbWFwVmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ21lbWl6ZSc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGVuZHBvaW50cyB9IGZyb20gJy4vZW5kcG9pbnRzLmpzJztcblxuLyoqXG4gKiBSZWNlaXZlcyBhbiBvYmplY3QgbWFwIG9mIG1vZGVsTmFtZSB0byBlbmRwb2ludCBhbmQgbWFwcyB0aGF0IHRvIGEgZGVmYXVsdFxuICogbWFwIG9mIG1vZGVsTmFtZSB0byBlbXB0eSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gbW9kZWxOYW1lRW5kcG9pbnRzXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gQW4gb2JqZWN0IG9mIHsgeyBtb2RlbE5hbWUgfSA6IHt9IH1cbiAqL1xuY29uc3QgbWFwVG9PYmplY3RWYWx1ZXMgPSAoIG1vZGVsTmFtZUVuZHBvaW50cyApID0+IHtcblx0cmV0dXJuIG1hcFZhbHVlcyggbW9kZWxOYW1lRW5kcG9pbnRzLFxuXHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH0sXG5cdCk7XG59O1xuXG5jb25zdCBnZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCA9IG1lbW9pemUoXG5cdCgpID0+IG1hcFRvT2JqZWN0VmFsdWVzKCBlbmRwb2ludHMgKVxuKTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBzdGF0ZSB0byBiZSB1c2VkIGJ5IHN0b3JlcyBjb250YWluaW5nIGxpc3RzLlxuICpcbiAqIEB0eXBlIHsgT2JqZWN0IH1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTElTVFNfU1RBVEUgPSBtYXBUb09iamVjdFZhbHVlcyggZW5kcG9pbnRzICk7XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIGRlZmF1bHQgc3RhdGUgdG8gYmUgdXNlZCBieSB0aGUgY29yZSBzdG9yZS5cbiAqXG4gKiBAdHlwZSB7e2VudGl0aWVzOiB7fSwgZW50aXR5SWRzOiB7fSwgZGlydHk6IHt9fX1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09SRV9TVEFURSA9IHtcblx0ZW50aXRpZXM6IHtcblx0XHQuLi5nZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCgpLFxuXHR9LFxuXHRyZWxhdGlvbnM6IHt9LFxuXHRkaXJ0eToge1xuXHRcdHJlbGF0aW9uczoge1xuXHRcdFx0aW5kZXg6IHt9LFxuXHRcdFx0ZGVsZXRlOiB7fSxcblx0XHRcdGFkZDoge30sXG5cdFx0fSxcblx0XHR0cmFzaDoge30sXG5cdFx0ZGVsZXRlOiB7fSxcblx0fSxcbn07XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIGRlZmF1bHQgc3RhdGUgdG8gYmUgdXNlZCBieSB0aGUgc2NoZW1hIHN0b3JlLlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0NIRU1BX1NUQVRFID0ge1xuXHRzY2hlbWE6IHtcblx0XHQuLi5nZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCgpLFxuXHR9LFxuXHRmYWN0b3J5OiB7XG5cdFx0Li4uZ2V0RGVmYXVsdE1vZGVsRW50aXRpZXNPYmplY3QoKSxcblx0fSxcblx0cmVsYXRpb25FbmRwb2ludHM6IHtcblx0XHQuLi5nZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCgpLFxuXHR9LFxuXHRyZWxhdGlvblNjaGVtYToge30sXG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGRhdGEgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGFzc2VydEVudGl0eUhhc0tleSB9IGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5cbi8qKlxuICogQWxsIGF2YWlsYWJsZSBlbmRwb2ludHMgZXhwb3NlZCB2aWEgdGhlIGVlanMuZGF0YSBnbG9iYWwgZnJvbSB0aGUgc2VydmVyLlxuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0IGNvbnN0IHtcblx0Y29sbGVjdGlvbl9lbmRwb2ludHM6IGVuZHBvaW50cyA9IHt9LFxuXHRiYXNlX3Jlc3Rfcm91dGU6IGJhc2VSZXN0Um91dGUsXG59ID0gZGF0YS5wYXRocztcblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGVuZHBvaW50IGZvciB0aGUgcHJvdmlkZWQgbW9kZWwuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgV2hhdCBtb2RlbCB0byByZXRyaWV2ZSB0aGUgZW5kcG9pbnQgZm9yLlxuICogQHJldHVybiB7c3RyaW5nfSAgVGhlIGVuZHBvaW50IGZvciB0aGUgcHJvdmlkZWQgbW9kZWwuXG4gKiBAdGhyb3dzIHtFeGNlcHRpb259XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRFbmRwb2ludCA9ICggbW9kZWxOYW1lICkgPT4ge1xuXHRhc3NlcnRFbnRpdHlIYXNLZXkoIG1vZGVsTmFtZSwgZW5kcG9pbnRzICk7XG5cdHJldHVybiBlbmRwb2ludHNbIG1vZGVsTmFtZSBdO1xufTtcblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBwcm92aWRlZCBxdWVyeVN0cmluZyB0byB0aGUgZW5kcG9pbnQgZm9yIHRoZSBwcm92aWRlZCBtb2RlbCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFdoYXQgbW9kZWwgdGhlIGZpbmFsIHN0cmluZyBpcyBmb3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlTdHJpbmcgIFRoZSBxdWVyeSBiZWluZyBhcHBlbmRlZCB0byB0aGUgZW5kcG9pbnQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmaW5hbCBhc3NlbWJsZWQgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgYXBwbHlRdWVyeVN0cmluZyA9ICggbW9kZWxOYW1lLCBxdWVyeVN0cmluZyA9ICcnICkgPT4ge1xuXHRyZXR1cm4gcXVlcnlTdHJpbmcgIT09ICcnID9cblx0XHRnZXRFbmRwb2ludCggbW9kZWxOYW1lICkgKyAnPycgKyBxdWVyeVN0cmluZyA6XG5cdFx0Z2V0RW5kcG9pbnQoIG1vZGVsTmFtZSApO1xufTtcblxuLyoqXG4gKiBTdHJpcHMgdGhlIGJhc2VfcmVzdF9yb3V0ZSAoaS5lLiBodHRwczovL215dXJsLmNvbS93cC1qc29uLykgZnJvbSB0aGVcbiAqIHByb3ZpZGVkIHVybCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgdXJsIHdpdGggdGhlIGJhc2UgcmVzdCByb3V0ZSByZW1vdmVkLlxuICovXG5leHBvcnQgY29uc3Qgc3RyaXBCYXNlUm91dGVGcm9tVXJsID0gKCB1cmwgKSA9PiB7XG5cdHJldHVybiB1cmwucmVwbGFjZSggYmFzZVJlc3RSb3V0ZSwgJycgKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgc3ByaW50ZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgSW52YWxpZFNjaGVtYSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHsgaXNTY2hlbWEgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcbmltcG9ydCB7XG5cdE1vbmV5LFxuXHRTZXJ2ZXJEYXRlVGltZSBhcyBEYXRlVGltZSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsdWUtb2JqZWN0cyc7XG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0aXNEYXRlVGltZUZpZWxkLFxuXHRpc01vbmV5RmllbGQsXG59IGZyb20gJy4vYm9vbGVhbnMnO1xuaW1wb3J0IHtcblx0aXNTaGFsbG93VmFsaWRWYWx1ZUZvckZpZWxkLFxuXHR2YWxpZGF0ZUVudW1UeXBlLFxuXHR2YWxpZGF0ZVR5cGUsXG5cdHZhbGlkYXRlVHlwZUZvckZpZWxkLFxufSBmcm9tICcuL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMgfSBmcm9tICcuL2V4dHJhY3RvcnMnO1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgdmFsdWUgaXMgYSBrbm93biB2YWx1ZSBvYmplY3QuXG4gKlxuICogTm90ZTogdGhpcyBvbmx5IGFzc2VydHMga25vd24gdmFsdWUgb2JqZWN0cywgaWYgdGhlIHZhbHVlIGlzIG5vdCBkZXRlY3RlZCBhc1xuICogYSBrbm93biB2YWx1ZSBvYmplY3QgaXQgaXMgcGFzc2VkIGJhY2sgYXMgaXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAdGhyb3dzIEludmFsaWREYXRlVGltZVxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IG1heWJlQXNzZXJ0VmFsdWVPYmplY3QgPSAoIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgc2NoZW1hICkgPT4ge1xuXHRpZiAoIGlzRGF0ZVRpbWVGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHREYXRlVGltZS5hc3NlcnRJc0RhdGVUaW1lKCBmaWVsZFZhbHVlICk7XG5cdH1cblx0aWYgKCBpc01vbmV5RmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgKSB7XG5cdFx0TW9uZXkuYXNzZXJ0TW9uZXkoIGZpZWxkVmFsdWUgKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIG9iamVjdCBpcyBhIHZhbGlkIG1vZGVsIHNjaGVtYSBvYmplY3QuXG4gKlxuICogQ3VycmVudGx5LCBhbiBvYmplY3QgaXMgY29uc2lkZXJlZCBhIHZhbGlkIG1vZGVsIHNjaGVtYSBpZiBpdCBoYXMgYVxuICogJ3Byb3BlcnRpZXMnIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gc2NoZW1hXG4gKiBAdGhyb3dzIEludmFsaWRTY2hlbWFcbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydFZhbGlkU2NoZW1hID0gKCBzY2hlbWEgKSA9PiB7XG5cdGlmICggISBpc1NjaGVtYSggc2NoZW1hICkgKSB7XG5cdFx0dGhyb3cgbmV3IEludmFsaWRTY2hlbWEoXG5cdFx0XHQnVGhpcyBpcyBhbiBpbnZhbGlkIHNjaGVtYSBmb3IgYSBtb2RlbC4nLFxuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB0aGF0IHRoZSBnaXZlbiBmaWVsZCBleGlzdHMgaW4gdGhlIHByb3ZpZGVkIHNjaGVtYSBhbmQgdGhlIHNoYXBlIGZvclxuICogdGhlIHNjaGVtYSBlbnRyeSBvbiB0aGF0IGZpZWxkIGlzIGV4cGVjdGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFRoZSBtb2RlbCB0aGUgc2NoZW1hIGJlbG9uZ3MgdG8sIHRoaXMgaXMgdXNlZCBmb3JcbiAqIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZSAgVGhlIGZpZWxkIGJlaW5nIGNoZWNrZWQgYWdhaW5zdCB0aGUgc2NoZW1hXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hICAgICBUaGUgc2NoZW1hIGZvciB0aGUgbW9kZWwgdXNlZCBmb3IgdmFsaWRhdGlvblxuICogQHRocm93cyBJbnZhbGlkU2NoZW1hXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0VmFsaWRTY2hlbWFGaWVsZFByb3BlcnRpZXMgPSAoXG5cdG1vZGVsTmFtZSxcblx0ZmllbGROYW1lLFxuXHRzY2hlbWEsXG4pID0+IHtcblx0aWYgKCBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXSApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHQnVGhlIGdpdmVuIFwiJXNcIiBmaWVsZE5hbWUgZG9lcyBub3QgaGF2ZSBhIGRlZmluZWQgc2NoZW1hIGZvciB0aGUgbW9kZWwgXCIlc1wiJyxcblx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRtb2RlbE5hbWUsXG5cdFx0XHQpLFxuXHRcdCk7XG5cdH1cblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUgPT09ICdvYmplY3QnICkge1xuXHRcdGlmICggaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRTY2hlbWEoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBzY2hlbWEgZm9yIHRoZSBmaWVsZCAlcyBvbiB0aGUgbW9kZWwgJXMgaXMgb2YgdHlwZSBcIm9iamVjdFwiIGJ1dCBkb2VzIG5vdCBoYXZlIGEgcHJvcGVydGllcyBwcm9wZXJ0eS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRtb2RlbE5hbWVcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKCBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdyApICkge1xuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRTY2hlbWEoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBzY2hlbWEgZm9yIHRoZSBmaWVsZCAlcyBvbiB0aGUgbW9kZWwgJXMgaXMgb2YgdHlwZSBcIm9iamVjdFwiIGJ1dCBkb2VzIG5vdCBoYXZlIGEgcmF3IHByb3BlcnR5IGluIGl0XFwncyBcInByb3BlcnRpZXNcIiBwcm9wZXJ0eS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRtb2RlbE5hbWVcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKCBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy50eXBlICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFNjaGVtYShcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIHNjaGVtYSBmb3IgdGhlIGZpZWxkICVzIG9uIHRoZSBtb2RlbCAlcyBpcyBvZiB0eXBlIFwib2JqZWN0XCIgYW5kIGhhcyBhIHByb3BlcnRpZXMucmF3IHByb3BlcnR5LCBob3dldmVyIHRoZXJlIGlzIG5vIFwidHlwZVwiIGRlZmluZWQgZm9yIHRoZSByYXcgcHJvcGVydHkuJyxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0bW9kZWxOYW1lXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHRoYXQgdGhlIHZhbHVlIHByb3ZpZGVkIGZvciB0aGUgcHJlcGFyZWQgZmllbGQgaXMgdmFsaWQgYWNjb3JkaW5nIHRvXG4gKiB0aGUgc2NoZW1hLlxuICpcbiAqIFByZXBhcmVkIGZpZWxkcyBhcmU6XG4gKlxuICogLSBmaWVsZHMgaGF2aW5nIHZhbHVlcyB0aGF0IGFyZSBzZXQgYXMgYSB2YWx1ZSBvYmplY3QgYW5kIGV4cGVjdCBhIHZhbHVlXG4gKiAgIG9iamVjdCBvbiB1cGRhdGVzL2luc2VydHMuXG4gKiAtIGZpZWxkcyB0aGF0IGFyZSB0aGUgZXF1aXZhbGVudCBgcmF3YCB2YWx1ZSB3aGVuIHRoZSBmaWVsZCBpbiB0aGUgc2NoZW1hIGlzXG4gKiAgIGRlZmluZWQgdG8gaGF2ZSByYXcgYW5kIHJlbmRlcmVkL3ByZXR0eSB2YWx1ZXMuXG4gKlxuICogTm90ZTogIFRoaXMgdmFsaWRhdGVzIGFnYWluc3QgcHJlcGFyZWQgZmllbGRzIHdoaWNoIG1lYW5zIHRoYXQ6XG4gKlxuICogLSBpZiB0aGUgcHJlcGFyZWQgZmllbGQgaGFzIGEgdmFsdWUgb2JqZWN0IGFzIGl0cyB2YWx1ZSwgdGhlbiB0aGF0IHZhbHVlXG4gKiAgIG9iamVjdCBpcyB2YWxpZGF0ZWQgYmVmb3JlIGFueSBvdGhlciB2YWxpZGF0aW9uLlxuICogLSBpZiB0aGUgcHJlcGFyZWQgZmllbGQgcmVwcmVzZW50cyBhbiBvYmplY3QgaW4gdGhlIHNjaGVtYSwgdGhlbiBpdHMgdmFsdWUgaXNcbiAqICAgdmFsaWRhdGVkIGFnYWluc3QgdGhlIGByYXdgIHR5cGUgaW4gdGhlIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqIEB0aHJvd3MgSW52YWxpZERhdGVUaW1lXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZCA9IChcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRpbnN0YW5jZSxcbikgPT4ge1xuXHRjb25zdCB7IHNjaGVtYSB9ID0gaW5zdGFuY2U7XG5cdGxldCBpc1ZhbGlkID0gaXNTaGFsbG93VmFsaWRWYWx1ZUZvckZpZWxkKFxuXHRcdGZpZWxkTmFtZSxcblx0XHRmaWVsZFZhbHVlLFxuXHRcdHNjaGVtYSxcblx0KTtcblx0aWYgKCAhIGlzVmFsaWQgJiYgc2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlID09PSAnb2JqZWN0JyAmJlxuXHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllc1xuXHQpIHtcblx0XHRpc1ZhbGlkID0gc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy5lbnVtID9cblx0XHRcdHZhbGlkYXRlRW51bVR5cGUoXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcudHlwZSxcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy5lbnVtLFxuXHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0KSA6XG5cdFx0XHR2YWxpZGF0ZVR5cGUoXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcudHlwZSxcblx0XHRcdFx0bWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMoXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdFx0c2NoZW1hXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0aWYgKCAhIGlzVmFsaWQgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlMSRzXCIgZmllbGQgIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hLiAgSXRcXCdzIGByYXdgIHByb3BlcnR5IFZhbHVlICglMiRzKSBpcyBub3QgdGhlIGNvcnJlY3QgZXhwZWN0ZWQgdHlwZSAoJTMkcykuJyxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LnR5cGUsXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXHRpZiAoICEgaXNWYWxpZCApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0c3ByaW50Zihcblx0XHRcdFx0J1RoZSBnaXZlbiBcIiUxJHNcIiBmaWVsZFxcJ3MgVmFsdWUgKCUyJHMpIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hIHR5cGUgKCUzJHMpLicsXG5cdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlLFxuXHRcdFx0KSxcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgdmFsdWUgZm9yIHRoZSBnaXZlbiBmaWVsZCBpcyB2YWxpZCBhY2NvcmRpbmcgdG8gdGhlXG4gKiBzY2hlbWEuXG4gKlxuICogVGhpcyBpcyB1c2VkIG9uIGVudGl0eSBjb25zdHJ1Y3Rpb24gYW5kIGRvZXMgbm90IHZhbGlkYXRlIHByZXBhcmVkIGZpZWxkXG4gKiB2YWx1ZXMgKHNlZSBhc3NlcnQgYXNzZXJ0VmFsaWRWYWx1ZUZvclByZXBhcmVkRmllbGQpLlxuICpcbiAqIFRoaXMgbWV0aG9kIGFsc28gYXNzZXJ0cyB0aGF0IHRoZSBzY2hlbWEgaGFzIHZhbGlkIHNjaGVtYSBmaWVsZCBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICogQHRocm93cyBJbnZhbGlkU2NoZW1hXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRWYWxpZEZpZWxkQW5kVmFsdWVBZ2FpbnN0U2NoZW1hID0gKFxuXHRtb2RlbE5hbWUsXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0aW5zdGFuY2UsXG4pID0+IHtcblx0Y29uc3Qgc2NoZW1hID0gaW5zdGFuY2Uuc2NoZW1hO1xuXHRjb25zdCB2YWxpZGF0aW9uVHlwZSA9IHZhbGlkYXRlVHlwZUZvckZpZWxkKCBmaWVsZE5hbWUsIGluc3RhbmNlICk7XG5cdGFzc2VydFZhbGlkU2NoZW1hRmllbGRQcm9wZXJ0aWVzKCBtb2RlbE5hbWUsIGZpZWxkTmFtZSwgc2NoZW1hICk7XG5cdGxldCBpc1ZhbGlkID0gaXNTaGFsbG93VmFsaWRWYWx1ZUZvckZpZWxkKFxuXHRcdGZpZWxkTmFtZSxcblx0XHRmaWVsZFZhbHVlLFxuXHRcdHNjaGVtYSxcblx0XHRmYWxzZSxcblx0KTtcblx0Ly8gYWNjb3VudCBmb3IgZmllbGROYW1lIGZpZWxkVmFsdWVzIHRoYXQgaGF2ZSBwcm9wZXJ0eSBzY2hlbWEuIEZvciBNb2RlbFxuXHQvLyBFbnRpdGllcywgb25seSB0aGUgVkFMSURBVEVfVFlQRSBwcm9wZXJ0eSBpcyBjYXJlZCBhYm91dC5cblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUgPT09ICdvYmplY3QnICYmXG5cdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzXG5cdCkge1xuXHRcdGlmICggaXNVbmRlZmluZWQoIGZpZWxkVmFsdWVbIHZhbGlkYXRpb25UeXBlIF0gKSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBnaXZlbiBcIiUxJHNcIiB2YWx1ZSBpcyBub3QgdmFsaWQgZm9yIHRoZSBkZWZpbmVkIHNjaGVtYS4gSXQgbXVzdCBiZSBhbiBvYmplY3QgYW5kIGl0IG11c3QgaGF2ZSBhIGAlMiRzYCBrZXkuJyxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0dmFsaWRhdGlvblR5cGUsXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpc1ZhbGlkID0gc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzWyB2YWxpZGF0aW9uVHlwZSBdLmVudW0gP1xuXHRcdFx0dmFsaWRhdGVFbnVtVHlwZShcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzWyB2YWxpZGF0aW9uVHlwZSBdLnR5cGUsXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcuZW51bSxcblx0XHRcdFx0ZmllbGRWYWx1ZVsgdmFsaWRhdGlvblR5cGUgXSxcblx0XHRcdCkgOlxuXHRcdFx0dmFsaWRhdGVUeXBlKFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXNbIHZhbGlkYXRpb25UeXBlIF0udHlwZSxcblx0XHRcdFx0ZmllbGRWYWx1ZVsgdmFsaWRhdGlvblR5cGUgXVxuXHRcdFx0KTtcblx0XHRpZiAoICEgaXNWYWxpZCApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBnaXZlbiBcIiUxJHNcIiB2YWx1ZSBpcyBub3QgdmFsaWQgZm9yIHRoZSBkZWZpbmVkIHNjaGVtYS4gIEl0XFwncyBgJTIkc2AgcHJvcGVydHkgdmFsdWUgKCUzJHMpIGlzIG5vdCB0aGUgY29ycmVjdCBleHBlY3RlZCB0eXBlICglNCRzKS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHR2YWxpZGF0aW9uVHlwZSxcblx0XHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllc1sgdmFsaWRhdGlvblR5cGUgXS50eXBlLFxuXHRcdFx0XHQpLFxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblx0aWYgKCAhIGlzVmFsaWQgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdHNwcmludGYoXG5cdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlMSRzXCIgZmllbGRcXCdzIHZhbHVlICglMiRzKSBpcyBub3QgdmFsaWQgZm9yIHRoZSBkZWZpbmVkIHNjaGVtYSB0eXBlICglMyRzKS4nLFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSxcblx0XHRcdCksXG5cdFx0KTtcblx0fVxufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0FycmF5LCB1cHBlckZpcnN0LCBjYW1lbENhc2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbWVtaXplJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGFzc2VydFZhbGlkU2NoZW1hIH0gZnJvbSAnLi9hc3NlcnRpb25zJztcbmltcG9ydCB7XG5cdGNyZWF0ZUdldHRlcixcblx0Y3JlYXRlRW50aXR5R2V0dGVyc0FuZFNldHRlcnMsXG5cdGNyZWF0ZVBlcnNpc3RpbmdHZXR0ZXJzQW5kU2V0dGVycyxcblx0c2V0U2F2ZVN0YXRlLFxufSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQge1xuXHRTQVZFX1NUQVRFLFxuXHRQUklWQVRFX1BST1BFUlRJRVMsXG59IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBCYXNlRW50aXR5IGlzIHRoZSBiYXNpYyBjbGFzcyBmb3IgYWxsIGVudGl0aWVzLiAgY3JlYXRlRW50aXR5RmFjdG9yeSByZXR1cm5zXG4gKiBhbiBpbnN0YW5jZSBvZiB0aGlzIGFuZCBhbGwgdGhlIGdldHRlcnMvc2V0dGVycyBmb3IgZmllbGRzIGV0YyBhcmVcbiAqIGR5bmFtaWNhbGx5IGNyZWF0ZWQgdmlhIHRoZSBjb25zdHJ1Y3Rvci5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhc2VFbnRpdHkge1xuXHRbIFBSSVZBVEVfUFJPUEVSVElFUy5TQVZFX1NUQVRFIF0gPSBTQVZFX1NUQVRFLkNMRUFOO1xuXHRbIFBSSVZBVEVfUFJPUEVSVElFUy5WQUxJREFURV9UWVBFUyBdID0ge307XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yIGZvciBCYXNlIEVudGl0eVxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBlbnRpdHlGaWVsZHNBbmRWYWx1ZXNcblx0ICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuXHQgKiBAcGFyYW0ge0FycmF5fWZpZWxkUHJlZml4ZXNcblx0ICogQHBhcmFtIHtib29sZWFufSBpc05ld1xuXHQgKi9cblx0Y29uc3RydWN0b3IoXG5cdFx0bW9kZWxOYW1lLFxuXHRcdGVudGl0eUZpZWxkc0FuZFZhbHVlcyxcblx0XHRzY2hlbWEsXG5cdFx0ZmllbGRQcmVmaXhlcyA9IFtdLFxuXHRcdGlzTmV3ID0gZmFsc2UsXG5cdCkge1xuXHRcdGFzc2VydFZhbGlkU2NoZW1hKCBzY2hlbWEgKTtcblx0XHRmaWVsZFByZWZpeGVzID0gaXNBcnJheSggZmllbGRQcmVmaXhlcyApID8gZmllbGRQcmVmaXhlcyA6IFtdO1xuXHRcdGNyZWF0ZUdldHRlciggdGhpcywgJ2ZpZWxkUHJlZml4ZXMnLCBmaWVsZFByZWZpeGVzICk7XG5cdFx0Y3JlYXRlR2V0dGVyKCB0aGlzLCAnc2NoZW1hJywgc2NoZW1hLnByb3BlcnRpZXMgKTtcblx0XHRzZXRTYXZlU3RhdGUoXG5cdFx0XHR0aGlzLFxuXHRcdFx0aXNOZXcgPyBTQVZFX1NUQVRFLk5FVyA6IFNBVkVfU1RBVEUuQ0xFQU5cblx0XHQpO1xuXHRcdGNyZWF0ZUdldHRlciggdGhpcywgJ21vZGVsTmFtZScsIG1vZGVsTmFtZSApO1xuXHRcdGNyZWF0ZUdldHRlciggdGhpcywgJ29yaWdpbmFsRmllbGRzQW5kVmFsdWVzJywgZW50aXR5RmllbGRzQW5kVmFsdWVzICk7XG5cdFx0Y3JlYXRlR2V0dGVyKFxuXHRcdFx0dGhpcyxcblx0XHRcdCdmaWVsZHNUb1BlcnNpc3RPbkluc2VydCcsXG5cdFx0XHRuZXcgU2V0KCBPYmplY3Qua2V5cyggZW50aXR5RmllbGRzQW5kVmFsdWVzICkgKVxuXHRcdCk7XG5cdFx0Y3JlYXRlRW50aXR5R2V0dGVyc0FuZFNldHRlcnMoIHRoaXMgKTtcblx0XHRjcmVhdGVQZXJzaXN0aW5nR2V0dGVyc0FuZFNldHRlcnMoIHRoaXMgKTtcblx0XHRPYmplY3Quc2VhbCggdGhpcyApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBvbiB0aGUgZW50aXR5LlxuXHQgKlxuXHQgKiBTYXZlIHN0YXRlIGRlc2NyaWJlcyB3aGV0aGVyIHRoZSBlbnRpdHkgaXM6XG5cdCAqXG5cdCAqIC0gU0FWRV9TVEFURS5ORVc6IFRoZSBlbnRpdHkgaGFzIG5ldmVyIGJlZW4gcGVyc2lzdGVkIHRvIHN0b3JhZ2UuXG5cdCAqIC0gU0FWRV9TVEFURS5DTEVBTjogVGhlIGVudGl0eSBleGlzdHMgaW4gc3RvcmFnZSBhbmQgaGFzIG5vdCBiZWVuIG11dGF0ZWQuXG5cdCAqIC0gU0FWRV9TVEFURS5ESVJUWTogVGhlIGVudGl0eSBpcyBtdXRhdGVkIGFuZCBjaGFuZ2VzIGhhdmUgbm90IGJlZW5cblx0ICogcGVyc2lzdGVkIHRvIHN0b3JhZ2UuXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N5bWJvbH0gIFJldHVybnMgdGhlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBmb3IgdGhlIGVudGl0eS5cblx0ICovXG5cdGdldCBzYXZlU3RhdGUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbIFBSSVZBVEVfUFJPUEVSVElFUy5TQVZFX1NUQVRFIF07XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgY3VycmVudCBzYXZlIHN0YXRlIGlzIFNBVkVfU1RBVEUuTkVXXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIFNBVkVfU1RBVEUuTkVXIGlzIHRoZSBzYXZlIHN0YXRlLlxuXHQgKi9cblx0Z2V0IGlzTmV3KCkge1xuXHRcdHJldHVybiB0aGlzLnNhdmVTdGF0ZSA9PT0gU0FWRV9TVEFURS5ORVc7XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgY3VycmVudCBzYXZlIHN0YXRlIGlzIFNBVkVfU1RBVEUuRElSVFlcblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgU0FWRV9TVEFURS5ESVJUWSBpcyB0aGUgc2F2ZSBzdGF0ZS5cblx0ICovXG5cdGdldCBpc0RpcnR5KCkge1xuXHRcdHJldHVybiB0aGlzLnNhdmVTdGF0ZSA9PT0gU0FWRV9TVEFURS5ESVJUWTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IHNhdmUgc3RhdGUgaXMgU0FWRV9TVEFURS5DTEVBTlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyBTQVZFX1NUQVRFLkNMRUFOIGlzIHRoZSBzYXZlIHN0YXRlLlxuXHQgKi9cblx0Z2V0IGlzQ2xlYW4oKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2F2ZVN0YXRlID09PSBTQVZFX1NUQVRFLkNMRUFOO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGVudGl0eSBoYXMgYW55IHBhc3N3b3JkIHByb3RlY3RlZCBmaWVsZHMuXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgaXQgZG9lcywgZmFsc2UgbWVhbnMgaXQgZG9lc24ndC5cblx0ICovXG5cdGdldCBpc1Bhc3N3b3JkUHJvdGVjdGVkKCkge1xuXHRcdHJldHVybiB0aGlzLnByb3RlY3RlZEZpZWxkcy5sZW5ndGggPiAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGdpdmVuIGZpZWxkTmFtZSBpcyBhIHBhc3N3b3JkIHByb3RlY3RlZCBmaWVsZC5cblx0ICpcblx0ICogQHJldHVybiB7ZnVuY3Rpb24oc3RyaW5nKTogYm9vbGVhbn0gIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkXG5cdCAqIHRvIGNoZWNrIGlmIHRoZSBnaXZlbiBmaWVsZCBuYW1lIGlzIGEgcHJvdGVjdGVkIGZpZWxkIGluIHRoaXMgZW50aXR5LlxuXHQgKi9cblx0Z2V0IGlzRmllbGRQYXNzd29yZFByb3RlY3RlZCgpIHtcblx0XHRyZXR1cm4gKCBmaWVsZE5hbWUgKSA9PiB0aGlzLnByb3RlY3RlZEZpZWxkcy5pbmRleE9mKCBmaWVsZE5hbWUgKSA+IC0xO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVzZWQgdG8gY2xvbmUgdGhlIGN1cnJlbnQgZW50aXR5IG9iamVjdC4gIFRoaXMgcmVzdWx0cyBpbiBhbiBpbnN0YW5jZSBvZlxuXHQgKiBCYXNlRW50aXR5IHRoYXQgaXMgZXF1aXZhbGVudCBhcyB0aGlzIGN1cnJlbnQgaW5zdGFuY2UgKGV4Y2VwdCBpdCB3aWxsXG5cdCAqIGhhdmUgYSBuZXcgZ2VuZXJhdGVkIGlkKS5cblx0ICpcblx0ICogQHJldHVybiB7RnVuY3Rpb259IGNhbGxiYWNrIHRoYXQgcmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiBCYXNlRW50aXR5XG5cdCAqL1xuXHRnZXQgY2xvbmUoKSB7XG5cdFx0LyoqXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBrZWVwSWRcblx0XHQgKiBAcmV0dXJuIHtCYXNlRW50aXR5fSBBIG5ldyBpbnN0YW5jZSBvZiBCYXNlRW50aXR5XG5cdFx0ICovXG5cdFx0cmV0dXJuICgga2VlcElkID0gZmFsc2UgKSA9PiB7XG5cdFx0XHRjb25zdCBjcmVhdGVGYWN0b3J5ID0gbWVtb2l6ZSggKCkgPT4gY3JlYXRlRW50aXR5RmFjdG9yeShcblx0XHRcdFx0dGhpcy5tb2RlbE5hbWUsXG5cdFx0XHRcdHsgJHNjaGVtYToge30sIHByb3BlcnRpZXM6IHRoaXMuc2NoZW1hIH0sXG5cdFx0XHRcdHRoaXMuZmllbGRQcmVmaXhlc1xuXHRcdFx0KSApO1xuXHRcdFx0Y29uc3QgZmFjdG9yeSA9IGNyZWF0ZUZhY3RvcnkoKTtcblx0XHRcdGNvbnN0IG5ld0VudGl0eSA9IGZhY3RvcnkuY3JlYXRlTmV3KCB0aGlzLmZvckNsb25lICk7XG5cdFx0XHRpZiAoIGtlZXBJZCApIHtcblx0XHRcdFx0bmV3RW50aXR5LmlkID0gdGhpcy5pZDtcblx0XHRcdFx0c2V0U2F2ZVN0YXRlKCBuZXdFbnRpdHksIHRoaXMuc2F2ZVN0YXRlLCB0cnVlICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3RW50aXR5O1xuXHRcdH07XG5cdH1cblxuXHRzdGF0aWMgbmFtZSA9ICdCYXNlRW50aXR5J1xufVxuXG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCBnaXZlcyBhIGNsYXNzIHRoZSBwcm92aWRlZCBuYW1lXG4gKiAoYW5kIG9wdGlvbmFsbHkgZXh0ZW5kcyB0aGUgcHJvdmlkZWQgb2JqZWN0KS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGV4dGVuZGVkQ2xhc3NcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uXG4gKi9cbmNvbnN0IG5hbWVDbGFzcyA9ICggbmFtZSwgZXh0ZW5kZWRDbGFzcyApID0+IHtcblx0cmV0dXJuIGNsYXNzIGV4dGVuZHMgZXh0ZW5kZWRDbGFzcyB7XG5cdFx0c3RhdGljIGdldCBuYW1lKCkge1xuXHRcdFx0cmV0dXJuIG5hbWU7XG5cdFx0fVxuXHR9O1xufTtcblxuLyoqXG4gKiBBIGZhY3RvcnkgZm9yIGVudGl0eSBmYWN0b3JpZXMuXG4gKlxuICogQ2FsbGluZyB0aGlzIHJldHVybnMgYW4gb2JqZWN0IG9mIGZhY3RvcnkgZnVuY3Rpb25zIHRoYXQgaW5zdGFudGlhdGUgYW5cbiAqIGluc3RhbmNlIG9mIGEgbmFtZWQgRW50aXR5LiAgVGhlIG1vZGVsTmFtZSBpcyB1c2VkIGFzIHRoZSBuYW1lIGZvciB0aGUgbmV3XG4gKiBlbnRpdHkuXG4gKlxuICogVHdvIG1ldGhvZHMgYXJlIGF2YWlsYWJsZSBvbiB0aGUgb2JqZWN0IHJldHVybmVkOiBgY3JlYXRlTmV3YCBhbmRcbiAqIGBmcm9tRXhpc3RpbmdgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFRoZSBtb2RlbCBmb3IgdGhlIGVudGl0eVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYSAgICAgVGhlIHNjaGVtYSBmb3IgdGhlIG1vZGVsLiBUaGlzIGlzIHRoZSBzY2hlbWFcbiAqIHByb3ZpZGVkIGJ5IHRoZSBPUFRJT05TIGVuZHBvaW50IGZvciB0aGUgbW9kZWwuXG4gKiBAcGFyYW0ge0FycmF5fSBmaWVsZFByZWZpeGVzIEFuIGFycmF5IG9mIGZpZWxkIHByZWZpeGVzIGZvciBiYXNlIGZpZWxkcyBvblxuICogb24gdGhlIG1vZGVsIChlZy4gRXZlbnQgbW9kZWwgaGFzIGBbIEVWVCBdYCBwcmVmaXhlcyBvbiBmaWVsZHMsIERhdGV0aW1lIG1vZGVsXG4gKiBoYXMgWyBgRFRUYCwgYERUVF9FVlRgIF1cbiAqIEByZXR1cm4ge09iamVjdH0gQSBmYWN0b3J5IGZvciBpbnN0YW50aWF0aW5nIGFuIGVudGl0eSBpbnN0YW5jZS5cbiAqL1xuY29uc3QgY3JlYXRlRW50aXR5RmFjdG9yeSA9ICggbW9kZWxOYW1lLCBzY2hlbWEsIGZpZWxkUHJlZml4ZXMgPSBbXSApID0+IHtcblx0Y29uc3QgRW50aXR5ID0gbmFtZUNsYXNzKFxuXHRcdHVwcGVyRmlyc3QoIGNhbWVsQ2FzZSggbW9kZWxOYW1lICkgKSxcblx0XHRCYXNlRW50aXR5XG5cdCk7XG5cdHJldHVybiB7XG5cdFx0LyoqXG5cdFx0ICogRXhwb3NlcyBtb2RlbE5hbWUgc28gY2xpZW50IGNvZGUgY2FuIGRlcml2ZSB3aGF0IG1vZGVsIHRoaXMgZmFjdG9yeVxuXHRcdCAqIGlzIGZvciBmcm9tIGFueSBnaXZlbiBmYWN0b3J5LlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZ31cblx0XHQgKi9cblx0XHRtb2RlbE5hbWUsXG5cdFx0LyoqXG5cdFx0ICogVGhpcyBpcyB0aGUgY2xhc3MgZGVmaW5pdGlvbiBmb3IgdGhlIEVudGl0eS4gIFR5cGljYWxseSB0aGlzIGlzXG5cdFx0ICogcmV0cmlldmVkIGZvciB0aGUgYWJpbGl0eSB0byBkbyBpbnN0YW5jZW9mIGNoZWNrcy5cblx0XHQgKi9cblx0XHRjbGFzc0RlZjogRW50aXR5LFxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgcmV0dXJucyBhbiBpbnN0YW5jZSBvZiBFbnRpdHkgZm9yIHRoZSBnaXZlbiBhcmd1bWVudHMgd2l0aCB0aGVcblx0XHQgKiBpbmRpY2F0aW9uIHRoaXMgaXMgYSBuZXcgbm9uLXBlcnNpc3RlZCBlbnRpdHkuICBUaGlzIG1lYW5zOlxuXHRcdCAqXG5cdFx0ICogLSBBbGwgZmllbGQgdmFsdWVzIGFyZSBwb3B1bGF0ZWQgYW5kIGFueSBub3QgcHJvdmlkZWQgd2lsbCBiZVxuXHRcdCAqICAgcG9wdWxhdGVkIHdpdGggZGVmYXVsdCB2YWx1ZXMgZGVmaW5lZCBieSB0aGUgc2NoZW1hLlxuXHRcdCAqIC0gR2VuZXJhdGVzIHRlbXBvcmFyeSB1bmlxdWUgaWRzIGZvciB0aGUgcHJpbWFyeSBrZXkgZmllbGRzIG9uIHRoZVxuXHRcdCAqICAgZW50aXR5ICh1c2luZyBjdWlkKS5cblx0XHQgKiAtIFNldHMgdGhlIGBpc05ld2AgZmxhZyB0byB0cnVlIGZvciB0aGUgZW50aXR5IHNvIGNsaWVudCBjb2RlIGlzIGFibGVcblx0XHQgKiAgIHRvIGRpc2NvdmVyIHdoaWNoIGVudGl0aWVzIGhhdmUgbmV2ZXIgYmVlbiBwZXJzaXN0ZWQuXG5cdFx0ICogLSBUaGlzIGZhY3RvcnkgbWV0aG9kIGV4cGVjdHMgZmllbGRzIGFuZCB2YWx1ZXMgdG8gYmUgXCJwcmVwYXJlZFwiLlxuXHRcdCAqICAgV2hhdCB0aGF0IG1lYW5zIGlzIHRoYXQgZm9yIGFueSBmaWVsZHMgdGhhdCB0aGUgc2NoZW1hIGRlc2NyaWJlZCBhc1xuXHRcdCAqICAgaGF2aW5nIGEgYHJhd2AgcHJvcGVydHkgKGkuZS4geyBFVlRfZGVzYzogeyByYXc6ICdzb21ldGhpbmcnIH0gfSlcblx0XHQgKiAgIHRoZSB2YWx1ZSBzaG91bGQgYmUgb2YgdGhlIGNvcnJlY3QgdHlwZSBmb3IgdGhhdCByYXcgcHJvcGVydHkgYW5kLlxuXHRcdCAqICAgVGhpcyBhbHNvIG1lYW5zIGlzIHRoYXQgZm9yIGFueSBmaWVsZHMgdGhlIHNjaGVtYSBkZXNjcmliZXMgYXMgYVxuXHRcdCAqICAgZGF0ZS10aW1lIChmb3JtYXQpIG9yIG1vbmV5IChmb3JtYXQpIGZpZWxkLCB0aGUgdmFsdWUgaXMgZXhwZWN0ZWRcblx0XHQgKiAgIHRvIGJlIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIG9iamVjdC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBmaWVsZHNBbmRWYWx1ZXNcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IGFuIGluc3RhbmNlIG9mIEVudGl0eVxuXHRcdCAqL1xuXHRcdGNyZWF0ZU5ldzogKCBmaWVsZHNBbmRWYWx1ZXMgKSA9PiBuZXcgRW50aXR5KFxuXHRcdFx0bW9kZWxOYW1lLFxuXHRcdFx0ZmllbGRzQW5kVmFsdWVzLFxuXHRcdFx0c2NoZW1hLFxuXHRcdFx0ZmllbGRQcmVmaXhlcyxcblx0XHRcdHRydWVcblx0XHQpLFxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgcmV0dXJucyBhbiBpbnN0YW5jZSBvZiBFbnRpdHkgZm9yIHRoZSBnaXZlbiBhcmd1bWVudHMgd2l0aCB0aGVcblx0XHQgKiBpbmRpY2F0aW9uIHRoaXMgcmVwcmVzZW50cyB0aGUgZW50aXR5IGFzIGlzIGluIHRoZSBkYi4gIFRoaXMgbWVhbnM6XG5cdFx0ICpcblx0XHQgKiAtIEFsbCBmaWVsZCB2YWx1ZXMgYXJlIE5PVCBwb3B1bGF0ZWQgaWYgbWlzc2luZyB2YWx1ZXMuICBUaGlzIGlzXG5cdFx0ICogICBlc3BlY2lhbGx5IGltcG9ydGFudCBmb3IgY29udGV4dHMgbGlrZSB1bmF1dGhvcml6ZWQgdmlld3Mgd2hlcmVcblx0XHQgKiAgIG9ubHkgcGFydGlhbCBlbnRpdGllcyBhcmUgcmV0dXJuZWQgaW4gUkVTVCByZXNwb25zZXMuXG5cdFx0ICogLSBpc05ldyBmbGFnIGlzIHNldCB0byBmYWxzZSAoYW5kIG5ldmVyIGNoYW5nZXMgZm9yIHRoaXMgZW50aXR5KVxuXHRcdCAqIC0gVGhlIGluY29taW5nIHZhbHVlcyBhcmUgZXhwZWN0ZWQgdG8gYmUgaW4gdGhlIGV4YWN0IHNoYXBlIGFzXG5cdFx0ICogICBkZXNjcmliZWQgYnkgdGhlIHNjaGVtYSBmb3IgdGhlIGVudGl0eSBtb2RlbC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBmaWVsZHNBbmRWYWx1ZXNcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IGFuIGluc3RhbmNlIG9mIEVudGl0eVxuXHRcdCAqL1xuXHRcdGZyb21FeGlzdGluZzogKCBmaWVsZHNBbmRWYWx1ZXMgKSA9PiBuZXcgRW50aXR5KFxuXHRcdFx0bW9kZWxOYW1lLFxuXHRcdFx0ZmllbGRzQW5kVmFsdWVzLFxuXHRcdFx0c2NoZW1hLFxuXHRcdFx0ZmllbGRQcmVmaXhlc1xuXHRcdCksXG5cdH07XG59O1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRW50aXR5RmFjdG9yeTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1BsYWluT2JqZWN0LCBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBhIFwicmF3XCIgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QgYW5kIGhhcyBhIGByYXdgIHByb3BlcnR5LlxuICovXG5leHBvcnQgY29uc3QgaGFzUmF3UHJvcGVydHkgPSAoIHZhbHVlICkgPT4gaXNQbGFpbk9iamVjdCggdmFsdWUgKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCB2YWx1ZS5yYXcgKTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaGFzIGEgXCJwcmV0dHlcIiBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHsqfSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdCBhbmQgaGFzIGEgYHByZXR0eWAgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNQcmV0dHlQcm9wZXJ0eSA9ICggdmFsdWUgKSA9PiBpc1BsYWluT2JqZWN0KCB2YWx1ZSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHZhbHVlLnByZXR0eSApO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBoYXMgYSBcInJlbmRlcmVkXCIgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QgYW5kIGhhcyBhIGByZW5kZXJlZGAgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNSZW5kZXJlZFByb3BlcnR5ID0gKCB2YWx1ZSApID0+IGlzUGxhaW5PYmplY3QoIHZhbHVlICkgJiZcblx0ISBpc1VuZGVmaW5lZCggdmFsdWUucmVuZGVyZWQgKTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaGFzIGEgXCJmb3JtYXRcIiBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdCBhbmQgaGFzIGEgYGZvcm1hdGAgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNGb3JtYXRQcm9wZXJ0eSA9ICggdmFsdWUgKSA9PiBpc1BsYWluT2JqZWN0KCB2YWx1ZSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHZhbHVlLmZvcm1hdCApO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBoYXMgYSBcImVudW1cIiBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdCBhbmQgaGFzIGFuIGVudW1cbiAqIHByb3BlcnR5LlxuICovXG5leHBvcnQgY29uc3QgaGFzRW51bVByb3BlcnR5ID0gKCB2YWx1ZSApID0+IGlzUGxhaW5PYmplY3QoIHZhbHVlICkgJiZcblx0ISBpc1VuZGVmaW5lZCggdmFsdWUuZW51bSApO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIFwidmFsdWUgb2JqZWN0XCIgZmllbGQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHZhbHVlIG9iamVjdCBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzVmFsdWVPYmplY3RGaWVsZCA9ICggZmllbGQsIHNjaGVtYSApID0+IHtcblx0cmV0dXJuIGlzRGF0ZVRpbWVGaWVsZCggZmllbGQsIHNjaGVtYSApIHx8IGlzTW9uZXlGaWVsZCggZmllbGQsIHNjaGVtYSApO1xufTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgaXMgYSBkYXRlLXRpbWUgZmllbGQgYWNjb3JkaW5nIHRvIHRoZVxuICogcHJvdmlkZWQgc2NoZW1hLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyBpdCBpcyBhIGRhdGUtdGltZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzRGF0ZVRpbWVGaWVsZCA9ICggZmllbGQsIHNjaGVtYSApID0+XG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGQgXSApICYmXG5cdGhhc0Zvcm1hdFByb3BlcnR5KCBzY2hlbWFbIGZpZWxkIF0gKSAmJlxuXHRzY2hlbWFbIGZpZWxkIF0uZm9ybWF0ID09PSAnZGF0ZS10aW1lJztcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgaXMgYSBVVEMgZGF0ZS10aW1lIGZpZWxkLlxuICpcbiAqIElmIHNjaGVtYSBpcyBwcm92aWRlZCwgdGhpcyBhbHNvIGNvbnNpZGVycyB3aGV0aGVyIHRoaXMgaXMgYSBkYXRlLXRpbWUgZmllbGQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUaW1lRmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hIFtvcHRpb25hbF1cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhpcyBpcyBhIFVUQyBmaWVsZC4gIElmIHNjaGVtYSBpcyBwcm92aWRlZCBpdFxuICogbWVhbnMgdGhpcyBpcyBhbHNvIGEgZGF0ZS10aW1lIGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNVVENEYXRlVGltZUZpZWxkID0gKCBkYXRlVGltZUZpZWxkTmFtZSwgc2NoZW1hID0gbnVsbCApID0+IHtcblx0cmV0dXJuIHNjaGVtYSAhPT0gbnVsbCA/XG5cdFx0aXNEYXRlVGltZUZpZWxkKCBkYXRlVGltZUZpZWxkTmFtZSwgc2NoZW1hICkgJiZcblx0XHRcdGRhdGVUaW1lRmllbGROYW1lLmluZGV4T2YoICdfZ210JyApID4gMCA6XG5cdFx0ZGF0ZVRpbWVGaWVsZE5hbWUuaW5kZXhPZiggJ19nbXQnICkgPiAwO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIGZpZWxkIHJlcHJlc2VudHMgYSBwcmltYXJ5IGtleSBmaWVsZCB1c2luZyB0aGVcbiAqIHByb3ZpZGVkIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyBpdCBpcyBhIHByaW1hcnkga2V5IGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNQcmltYXJ5S2V5RmllbGQgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT5cblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0ucHJpbWFyeV9rZXkgKTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIGZpZWxkIHJlcHJlc2VudHMgYSByZWFkb25seSBmaWVsZCB1c2luZyB0aGVcbiAqIHByb3ZpZGVkIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyBpdCBpcyBhIHJlYWRvbmx5IGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNSZWFkT25seSA9ICggZmllbGROYW1lLCBzY2hlbWEgKSA9PlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgJiZcblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5yZWFkb25seSApICYmXG5cdHNjaGVtYVsgZmllbGROYW1lIF0ucmVhZG9ubHk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIGZpZWxkIGlzIGEgXCJlbnRpdHlcIiBmaWVsZCB1c2luZyB0aGUgcHJvdmlkZWRcbiAqIHNjaGVtYS5cbiAqXG4gKiBBbiBcImVudGl0eVwiIGZpZWxkIGlzIGFueSBmaWVsZCB0aGF0IHNhdGlzZmllcyB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogLSBmaWVsZCBleGlzdHMgaW4gdGhlIHNjaGVtYVxuICogLSBpdCBpcyBub3QgcmVhZG9ubHkgb3IgaXMgYSBwcmltYXJ5IGtleSBmaWVsZC5cbiAqIC0gaXQgaXMgbm90IGEgdXRjIGZpZWxkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhpcyBpcyBhbiBlbnRpdHkgZmllbGRcbiAqL1xuZXhwb3J0IGNvbnN0IGlzRW50aXR5RmllbGQgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT5cblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXSApICYmXG5cdCggISBpc1JlYWRPbmx5KCBmaWVsZE5hbWUsIHNjaGVtYSApIHx8XG5cdFx0aXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hIClcblx0KSAmJlxuXHQhIGlzVVRDRGF0ZVRpbWVGaWVsZCggZmllbGROYW1lICkgJiZcblx0ZmllbGROYW1lICE9PSAnX3Byb3RlY3RlZCc7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGZpZWxkIHJlcHJlc2VudHMgYSB2YWx1ZSBvZiBtb25leSBmcm9tIHRoZSBwcm92aWRlZFxuICogc2NoZW1hLlxuICpcbiAqIEEgZmllbGQgaXMgYSBtb25leSBmaWVsZCBpZiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIHNhdGlzZmllZDpcbiAqXG4gKiAtIEl0IGV4aXN0cyBpbiB0aGUgc2NoZW1hXG4gKiAtIEl0IGhhcyBhIHByZXR0eSBwcm9wZXJ0eVxuICogLSBUaGUgcHJldHR5IHByb3BlcnR5IHZhbHVlIGhhcyBhIGZvcm1hdCBwcm9wZXJ0eS5cbiAqIC0gVGhlIGZvcm1hdCBwcm9wZXJ0eSBpcyBlcXVhbCB0byAnbW9uZXknXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBpdCBpcyBhIG1vbmV5IGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNNb25leUZpZWxkID0gKCBmaWVsZE5hbWUsIHNjaGVtYSApID0+XG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0gKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMgKSAmJlxuXHRoYXNQcmV0dHlQcm9wZXJ0eSggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzICkgJiZcblx0aGFzRm9ybWF0UHJvcGVydHkoIHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5wcmV0dHkgKSAmJlxuXHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucHJldHR5LmZvcm1hdCA9PT0gJ21vbmV5JztcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZmllbGQgaXMgYW4gZW51bSB0eXBlIGZpZWxkIGFzIGRlZmluZWQgaW4gdGhlIHByb3ZpZGVkXG4gKiBzY2hlbWEuXG4gKlxuICogTm90ZTogdGhpcyBvbmx5IGV2YWx1YXRlcyB0aGUgdG9wLWxldmVsIGZvciB0aGUgZmllbGQgc2NoZW1hLiAgSWYgdGhlIGZpZWxkXG4gKiBpbiB0aGUgc2NoZW1hIGlzIG9mIHR5cGUgJ29iamVjdCcgYW5kIG9uZSBvZiB0aGUgb2JqZWN0IHByb3BlcnRpZXMgaXMgb2YgdHlwZVxuICogJ2VudW0nIHRoaXMgd2lsbCBub3QgY29uc2lkZXIgaXQgYW4gXCJlbnVtXCIgZmllbGQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgaWYgdGhlIGZpZWxkIGlzIGFuIGVudW0gdHlwZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzRW51bUZpZWxkID0gKCBmaWVsZE5hbWUsIHNjaGVtYSApID0+XG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0gKSAmJlxuXHRoYXNFbnVtUHJvcGVydHkoIHNjaGVtYVsgZmllbGROYW1lIF0gKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdLmVudW0ubGVuZ3RoICkgJiZcblx0c2NoZW1hWyBmaWVsZE5hbWUgXS5lbnVtLmxlbmd0aCA+IDA7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgYXBwbHlGaWx0ZXJzIH0gZnJvbSAnQHdvcmRwcmVzcy9ob29rcyc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogQ29uc3RhbnRzIGRlc2NyaWJpbmcgdGhlIGN1cnJlbnQgXCJzYXZlIHN0YXRlXCIgZm9yIGFuIGVudGl0eS5cbiAqXG4gKiBAdHlwZSB7e0NMRUFOOiBTeW1ib2wsIE5FVzogU3ltYm9sLCBESVJUWTogU3ltYm9sfX1cbiAqL1xuZXhwb3J0IGNvbnN0IFNBVkVfU1RBVEUgPSB7XG5cdENMRUFOOiBTeW1ib2woICdFbnRpdHkgaXMgcGVyc2lzdGVkLicgKSxcblx0TkVXOiBTeW1ib2woICdFbnRpdHkgaXMgbmV3LicgKSxcblx0RElSVFk6IFN5bWJvbCggJ0V4aXN0aW5nIGVudGl0eSBoYXMgY2hhbmdlcyBhbmQgbmVlZHMgcGVyc2lzdGVkLicgKSxcbn07XG5cbi8qKlxuICogVmFsaWRhdGlvbiB0eXBlcyBhcmUgZm9yIHNjaGVtYSdzIHRoYXQgaGF2ZSB2YWx1ZSB2YXJpYXRpb25zLlxuICogQHR5cGUge3tSQVc6IHN0cmluZywgUkVOREVSRUQ6IHN0cmluZywgUFJFVFRZOiBzdHJpbmd9fVxuICovXG5leHBvcnQgY29uc3QgVkFMSURBVEVfVFlQRSA9IHtcblx0UkFXOiAncmF3Jyxcblx0UkVOREVSRUQ6ICdyZW5kZXJlZCcsXG5cdFBSRVRUWTogJ3ByZXR0eScsXG59O1xuXG4vKipcbiAqIFByaXZhdGUgcHJvcGVydGllcyB1c2VkIGludGVybmFsbHkgYnkgdGhlIEJhc2UgRW50aXR5IENsYXNzXG4gKiBAdHlwZSB7e3NhdmVTdGF0ZTogYm9vbGVhbn19XG4gKi9cbmV4cG9ydCBjb25zdCBQUklWQVRFX1BST1BFUlRJRVMgPSB7XG5cdFNBVkVfU1RBVEU6IFN5bWJvbCggJ2Jhc2VFbnRpdHlQcml2YXRlUHJvcGVydGllc1NhdmVTdGF0ZScgKSxcblx0VkFMSURBVEVfVFlQRVM6IFN5bWJvbCggJ2Jhc2VFbnRpdHlQcml2YXRlUHJvcGVydGllc1ZhbGlkYXRlVHlwZXMnICksXG59O1xuXG4vKipcbiAqIEhhcmRjb2RlZCBsaXN0IG9mIG1vZGVsIHByZWZpeGVzIGZvciBmaWVsZHMgb24gbW9kZWxzLlxuXG4gKiBBIG1vZGVsIHByZWZpeCBpcyBzb21ldGhpbmcgdGhhdCBcIm5hbWVzcGFjZXNcIiBhIGZpZWxkIG9uIGEgbW9kZWwuICBGb3JcbiAqIGV4YW1wbGUsIGlmIHRoZSBmaWVsZCBpcyBcIkVWVF9JRFwiLCB0aGVuIHRoZSBwcmVmaXggaXMgXCJFVlRcIjsgaWYgdGhlIGZpZWxkIGlzXG4gKiBcIkRUVF9FVlRfc3RhcnRcIiwgdGhlbiB0aGUgcHJlZml4ZXMgYXJlIFwiRFRUXCIsIGFuZCBcIkRUVF9FVlRcIi5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7T2JqZWN0fSBBIGZpbHRlcmVkIG9iamVjdCBpbmRleGVkIGJ5IG1vZGVsIG5hbWUgYW5kIHRoZSB2YWx1ZXMgYXJlXG4gKiBhbiBhcnJheSBvZiBtb2RlbCBwcmVmaXhlcyBmb3IgdGhhdCBtb2RlbC5cbiAqL1xuZXhwb3J0IGNvbnN0IE1PREVMX1BSRUZJWEVTID0gKCBtb2RlbE5hbWUgKSA9PiB7XG5cdGNvbnN0IHByZWZpeE1hcCA9IGFwcGx5RmlsdGVycyhcblx0XHQnRkhFRV9fRU5USVRZX0ZBQ1RPUllfX0NPTlNUQU5UU19fTU9ERUxfUFJFRklYRVMnLFxuXHRcdHtcblx0XHRcdGFuc3dlcjogWyAnQU5TJyBdLFxuXHRcdFx0YXR0ZW5kZWU6IFsgJ0FUVCcgXSxcblx0XHRcdGNoYW5nZV9sb2c6IFsgJ0xPRycgXSxcblx0XHRcdGNoZWNraW46IFsgJ0NISycgXSxcblx0XHRcdGNvdW50cnk6IFsgJ0NOVCcgXSxcblx0XHRcdGN1cnJlbmN5OiBbICdDVVInIF0sXG5cdFx0XHRjdXJyZW5jeV9wYXltZW50X21ldGhvZDogWyAnQ1BNJyBdLFxuXHRcdFx0ZGF0ZXRpbWU6IFsgJ0RUVF9FVlQnLCAnRFRUJyBdLFxuXHRcdFx0ZGF0ZXRpbWVfdGlja2V0OiBbICdEVEsnIF0sXG5cdFx0XHRldmVudDogWyAnRVZUJyBdLFxuXHRcdFx0ZXZlbnRfbWVzc2FnZV90ZW1wbGF0ZTogWyAnRU1UJyBdLFxuXHRcdFx0ZXZlbnRfcXVlc3Rpb25fZ3JvdXA6IFsgJ0VRRycgXSxcblx0XHRcdGV2ZW50X3ZlbnVlOiBbICdFVlYnIF0sXG5cdFx0XHRleHRyYV9qb2luOiBbICdFWEonIF0sXG5cdFx0XHRleHRyYV9tZXRhOiBbICdFWE0nIF0sXG5cdFx0XHRsaW5lX2l0ZW06IFsgJ0xJTicgXSxcblx0XHRcdG1lc3NhZ2U6IFsgJ01TRycgXSxcblx0XHRcdG1lc3NhZ2VfdGVtcGxhdGU6IFsgJ01UUCcgXSxcblx0XHRcdG1lc3NhZ2VfdGVtcGxhdGVfZ3JvdXA6IFsgJ0dSUCcsICdNVFAnIF0sXG5cdFx0XHRwYXltZW50OiBbICdQQVknIF0sXG5cdFx0XHRwYXltZW50X21ldGhvZDogWyAnUE1EJyBdLFxuXHRcdFx0cG9zdF9tZXRhOiBbICdtZXRhJyBdLFxuXHRcdFx0cHJpY2U6IFsgJ1BSQycgXSxcblx0XHRcdHByaWNlX3R5cGU6IFsgJ1BSVCcgXSxcblx0XHRcdHF1ZXN0aW9uOiBbICdRU1QnIF0sXG5cdFx0XHRxdWVzdGlvbl9ncm91cDogWyAnUVNHJyBdLFxuXHRcdFx0cXVlc3Rpb25fZ3JvdXBfcXVlc3Rpb246IFsgJ1FHUScgXSxcblx0XHRcdHF1ZXN0aW9uX29wdGlvbjogWyAnUVNPJyBdLFxuXHRcdFx0cmVjdXJyZW5jZTogWyAnUkNSJyBdLFxuXHRcdFx0cmVnaXN0cmF0aW9uOiBbICdSRUcnIF0sXG5cdFx0XHRyZWdpc3RyYXRpb25fcGF5bWVudDogWyAnUlBZJyBdLFxuXHRcdFx0c3RhdGU6IFsgJ1NUQScgXSxcblx0XHRcdHN0YXR1czogWyAnU1RTJyBdLFxuXHRcdFx0dGVybTogWyAndGVybScgXSxcblx0XHRcdHRlcm1fcmVsYXRpb25zaGlwOiBbXSxcblx0XHRcdHRlcm1fdGF4b25vbXk6IFsgJ3Rlcm1fdGF4b25vbXknIF0sXG5cdFx0XHR0aWNrZXQ6IFsgJ1RLVCcgXSxcblx0XHRcdHRpY2tldF9wcmljZTogWyAnVEtQJyBdLFxuXHRcdFx0dGlja2V0X3RlbXBsYXRlOiBbICdUVE0nIF0sXG5cdFx0XHR0cmFuc2FjdGlvbjogWyAnVFhOJyBdLFxuXHRcdFx0dmVudWU6IFsgJ1ZOVScgXSxcblx0XHRcdHdwX3VzZXI6IFsgJ3VzZXInIF0sXG5cdFx0fSApO1xuXHRyZXR1cm4gISBpc1VuZGVmaW5lZCggcHJlZml4TWFwWyBtb2RlbE5hbWUgXSApID9cblx0XHRwcmVmaXhNYXBbIG1vZGVsTmFtZSBdIDpcblx0XHRbXTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0Y2FtZWxDYXNlLFxuXHRmb3JFYWNoLFxuXHRpc1VuZGVmaW5lZCxcblx0aXNBcnJheSxcblx0a2V5cyxcblx0c29ydEJ5LFxufSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGN1aWQgZnJvbSAnY3VpZCc7XG5pbXBvcnQgeyBJbnZhbGlkQXJndW1lbnQgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGFzc2VydFZhbGlkRmllbGRBbmRWYWx1ZUFnYWluc3RTY2hlbWEsXG5cdGFzc2VydFZhbGlkVmFsdWVGb3JQcmVwYXJlZEZpZWxkLFxufSBmcm9tICcuL2Fzc2VydGlvbnMnO1xuaW1wb3J0IHtcblx0ZGVyaXZlUHJlcGFyZWRWYWx1ZUZvckZpZWxkLFxuXHRnZXRSZWxhdGlvbk5hbWVGcm9tTGluayxcblx0Z2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvckNsb25pbmcsXG5cdGdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JQZXJzaXN0aW5nLFxuXHRnZXRQcmltYXJ5S2V5RmllbGRzRnJvbVNjaGVtYSxcblx0Z2V0RW50aXR5RmllbGRzRnJvbVNjaGVtYSxcblx0Z2V0RGVmYXVsdFZhbHVlRm9yRmllbGQsXG5cdGRlcml2ZVZhbGlkYXRlVHlwZUZvckZpZWxkLFxufSBmcm9tICcuL2V4dHJhY3RvcnMnO1xuaW1wb3J0IHtcblx0aXNFbnRpdHlGaWVsZCxcblx0aXNQcmltYXJ5S2V5RmllbGQsXG59IGZyb20gJy4vYm9vbGVhbnMnO1xuaW1wb3J0IHsgUFJJVkFURV9QUk9QRVJUSUVTLCBTQVZFX1NUQVRFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKiooXG4gKiBBIGdlbmVyaWMgZ2V0dGVyIGNyZWF0b3IgZm9yIGEgcHJvdmlkZWQgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lICBUaGUgbmFtZSBvZiB0aGUgYWNjZXNzb3IuXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIHVzZWQgdG8gcGFzcyB0aHJvdWdoIGFkZGl0aW9uYWwgb3B0aW9ucyBmb3IgdGhlXG4gKiBPYmplY3QuZGVmaW5lUHJvcGVydHkgY2FsbC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUdldHRlciA9ICggaW5zdGFuY2UsIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgb3B0cyA9IHt9ICkgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGluc3RhbmNlLCBmaWVsZE5hbWUsIHtcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gZmllbGRWYWx1ZTtcblx0XHR9LFxuXHRcdC4uLm9wdHMsXG5cdH0gKTtcbn07XG5cbi8qKlxuICogVGhpcyBjcmVhdGVzIGEgZ2V0dGVyIHRoYXQgY2FsbHMgdGhlIHByb3ZpZGVkIGNhbGxiYWNrIHdoZW4gaW52b2tlZC5cbiAqXG4gKiBUaGUgY2FsbGJhY2sgcmVjZWl2ZXMgdGhlIGBpbnN0YW5jZWAgYXJndW1lbnQgcGFzc2VkIHRocm91Z2hcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KX0gY2FsbEJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVDYWxsYmFja0dldHRlciA9IChcblx0aW5zdGFuY2UsXG5cdHByb3BlcnR5TmFtZSxcblx0Y2FsbEJhY2ssXG5cdG9wdHMgPSB7fVxuKSA9PiB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggaW5zdGFuY2UsIHByb3BlcnR5TmFtZSwge1xuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiBjYWxsQmFjayggaW5zdGFuY2UgKTtcblx0XHR9LFxuXHRcdC4uLm9wdHMsXG5cdH0gKTtcbn07XG5cbi8qKlxuICogQSBnZW5lcmljIGdldHRlciBhbmQgc2V0dGVyIGNyZWF0b3IgZm9yIGEgcHJvdmlkZWQgaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gIGluaXRpYWxGaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25hbCwgcGFzcyB0aHJvdWdoIG9wdGlvbnMgdXNlZCBieVxuICogT2JqZWN0LmRlZmluZVByb3BlcnR5XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVHZXR0ZXJBbmRTZXR0ZXIgPSAoXG5cdGluc3RhbmNlLFxuXHRmaWVsZE5hbWUsXG5cdGluaXRpYWxGaWVsZFZhbHVlLFxuXHRvcHRzID0ge30sXG4pID0+IHtcblx0bGV0IHByb3BlcnR5VmFsdWUgPSBpbml0aWFsRmllbGRWYWx1ZTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBpbnN0YW5jZSwgZmllbGROYW1lLCB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIHByb3BlcnR5VmFsdWU7XG5cdFx0fSxcblx0XHRzZXQoIHJlY2VpdmVkVmFsdWUgKSB7XG5cdFx0XHRjb25zdCBpc1ByaW1hcnlGaWVsZCA9IGlzUHJpbWFyeUtleUZpZWxkKCBmaWVsZE5hbWUsIGluc3RhbmNlLnNjaGVtYSApO1xuXHRcdFx0aWYgKCAhIGluc3RhbmNlLmlzTmV3ICYmIGlzUHJpbWFyeUZpZWxkICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZChcblx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRyZWNlaXZlZFZhbHVlLFxuXHRcdFx0XHRpbnN0YW5jZVxuXHRcdFx0KTtcblx0XHRcdGlmICggISBpc1ByaW1hcnlGaWVsZCApIHtcblx0XHRcdFx0c2V0U2F2ZVN0YXRlKCBpbnN0YW5jZSwgU0FWRV9TVEFURS5ESVJUWSApO1xuXHRcdFx0XHRzZXRGaWVsZFRvUGVyc2lzdCggaW5zdGFuY2UsIGZpZWxkTmFtZSApO1xuXHRcdFx0fVxuXHRcdFx0cHJvcGVydHlWYWx1ZSA9IHJlY2VpdmVkVmFsdWU7XG5cdFx0fSxcblx0XHQuLi5vcHRzLFxuXHR9ICk7XG59O1xuXG4vKipcbiAqIEEgZ2V0dGVyIGFuZCBzZXR0ZXIgY3JlYXRvciBmb3IgYW4gZmllbGQgYWxpYXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JpZ2luYWxGaWVsZE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBhbGlhc0ZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyID0gKFxuXHRpbnN0YW5jZSxcblx0b3JpZ2luYWxGaWVsZE5hbWUsXG5cdGFsaWFzRmllbGROYW1lLFxuXHRvcHRzID0ge30sXG4pID0+IHtcblx0aWYgKCBvcmlnaW5hbEZpZWxkTmFtZSAhPT0gYWxpYXNGaWVsZE5hbWUgKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBpbnN0YW5jZSwgYWxpYXNGaWVsZE5hbWUsIHtcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIGluc3RhbmNlWyBvcmlnaW5hbEZpZWxkTmFtZSBdO1xuXHRcdFx0fSxcblx0XHRcdHNldCggcmVjZWl2ZWRWYWx1ZSApIHtcblx0XHRcdFx0cmV0dXJuIGluc3RhbmNlWyBvcmlnaW5hbEZpZWxkTmFtZSBdID0gcmVjZWl2ZWRWYWx1ZTtcblx0XHRcdH0sXG5cdFx0XHQuLi5vcHRzLFxuXHRcdH0gKTtcblx0fVxufTtcblxuLyoqXG4gKiBBIGdldHRlciBjcmVhdG9yIGZvciBhIGZpZWxkIGFsaWFzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IG9yaWdpbmFsRmllbGROYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gYWxpYXNGaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBbGlhc0dldHRlciA9IChcblx0aW5zdGFuY2UsXG5cdG9yaWdpbmFsRmllbGROYW1lLFxuXHRhbGlhc0ZpZWxkTmFtZSxcblx0b3B0cyA9IHt9LFxuKSA9PiB7XG5cdGlmICggb3JpZ2luYWxGaWVsZE5hbWUgIT09IGFsaWFzRmllbGROYW1lICkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggaW5zdGFuY2UsIGFsaWFzRmllbGROYW1lLCB7XG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHJldHVybiBpbnN0YW5jZVsgb3JpZ2luYWxGaWVsZE5hbWUgXTtcblx0XHRcdH0sXG5cdFx0XHQuLi5vcHRzLFxuXHRcdH0gKTtcblx0fVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIGluaXRpYWwgZ2V0dGVycyBhbmQgc2V0dGVycyBmb3IgZW50aXRpZXMgb24gdGhlIHByb3ZpZGVkIGVudGl0eVxuICogaW5zdGFuY2UgdXNpbmcgdGhlIGdpdmVuIGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBrZXlzIG9uIGluc3RhbmNlLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlRW50aXR5R2V0dGVyc0FuZFNldHRlcnMgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRjb25zdCBwcmltYXJ5S2V5cyA9IFtdO1xuXHRmb3JFYWNoKFxuXHRcdGluc3RhbmNlLm9yaWdpbmFsRmllbGRzQW5kVmFsdWVzLFxuXHRcdCggZmllbGRWYWx1ZSwgZmllbGROYW1lICkgPT4ge1xuXHRcdFx0Y29uc3QgaXNQcmltYXJ5S2V5ID0gaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hICk7XG5cdFx0XHRzZXRWYWxpZGF0ZVR5cGVGb3JGaWVsZCggaW5zdGFuY2UsIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSApO1xuXHRcdFx0aWYgKCBpc0VudGl0eUZpZWxkKCBmaWVsZE5hbWUsIGluc3RhbmNlLnNjaGVtYSApICkge1xuXHRcdFx0XHRpZiAoIGluc3RhbmNlLmlzTmV3ICkge1xuXHRcdFx0XHRcdGFzc2VydFZhbGlkVmFsdWVGb3JQcmVwYXJlZEZpZWxkKFxuXHRcdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRcdGluc3RhbmNlXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhc3NlcnRWYWxpZEZpZWxkQW5kVmFsdWVBZ2FpbnN0U2NoZW1hKFxuXHRcdFx0XHRcdFx0aW5zdGFuY2UubW9kZWxOYW1lLFxuXHRcdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRcdGluc3RhbmNlXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzZXRJbml0aWFsRW50aXR5RmllbGRzQW5kVmFsdWVzKFxuXHRcdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRcdGlzUHJpbWFyeUtleVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBmaWVsZE5hbWUgPT09ICdfY2FsY3VsYXRlZF9maWVsZHMnICkge1xuXHRcdFx0XHRzZXRDYWxjdWxhdGVkRmllbGRBbmRWYWx1ZXMoIGluc3RhbmNlLCBmaWVsZFZhbHVlICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGZpZWxkTmFtZSA9PT0gJ19wcm90ZWN0ZWQnICkge1xuXHRcdFx0XHRwb3B1bGF0ZVByb3RlY3RlZEZpZWxkc1Byb3BlcnR5KCBpbnN0YW5jZSwgZmllbGRWYWx1ZSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBmaWVsZE5hbWUgPT09ICdsaW5rJyApIHtcblx0XHRcdFx0Y3JlYXRlR2V0dGVyKCBpbnN0YW5jZSwgJ2xpbmsnLCBmaWVsZFZhbHVlICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGZpZWxkTmFtZSA9PT0gJ19saW5rcycgKSB7XG5cdFx0XHRcdHNldFJlc291cmNlcyggaW5zdGFuY2UsIGZpZWxkVmFsdWUgKTtcblx0XHRcdH1cblx0XHRcdGlmICggISBpbnN0YW5jZS5pc05ldyAmJiBpc1ByaW1hcnlLZXkgKSB7XG5cdFx0XHRcdHByaW1hcnlLZXlzLnB1c2goIGZpZWxkTmFtZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0KTtcblx0aWYgKCAhIGluc3RhbmNlLmlzTmV3ICYmIHByaW1hcnlLZXlzLmxlbmd0aCApIHtcblx0XHRjcmVhdGVQcmltYXJ5S2V5RmllbGRHZXR0ZXJzKCBpbnN0YW5jZSwgcHJpbWFyeUtleXMgKTtcblx0fVxuXG5cdHBvcHVsYXRlUHJpbWFyeUtleXMoIGluc3RhbmNlICk7XG5cdHBvcHVsYXRlTWlzc2luZ0ZpZWxkcyggaW5zdGFuY2UgKTtcbn07XG5cbi8qKlxuICogUG9wdWxhdGVzIHRoZSBgcHJvdGVjdGVkRmllbGRzYCBwcm9wZXJ0eSBvbiB0aGUgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge0FycmF5fSBwcm90ZWN0ZWRGaWVsZHNcbiAqL1xuY29uc3QgcG9wdWxhdGVQcm90ZWN0ZWRGaWVsZHNQcm9wZXJ0eSA9ICggaW5zdGFuY2UsIHByb3RlY3RlZEZpZWxkcyApID0+IHtcblx0Ly8gZ2V0IGFueSBjYWxjdWxhdGVkIHByb3RlY3RlZCBmaWVsZHMuXG5cdGNvbnN0IGNhbGN1bGF0ZWRGaWVsZHMgPSBpbnN0YW5jZVxuXHRcdC5vcmlnaW5hbEZpZWxkc0FuZFZhbHVlc1xuXHRcdC5fY2FsY3VsYXRlZF9maWVsZHMgfHwge307XG5cdGlmIChcblx0XHRjYWxjdWxhdGVkRmllbGRzLl9wcm90ZWN0ZWQgJiZcblx0XHRpc0FycmF5KCBjYWxjdWxhdGVkRmllbGRzLl9wcm90ZWN0ZWQgKVxuXHQpIHtcblx0XHRwcm90ZWN0ZWRGaWVsZHMgPSBbXG5cdFx0XHQuLi5wcm90ZWN0ZWRGaWVsZHMsXG5cdFx0XHQuLi5jYWxjdWxhdGVkRmllbGRzLl9wcm90ZWN0ZWQsXG5cdFx0XTtcblx0fVxuXHRjcmVhdGVHZXR0ZXIoIGluc3RhbmNlLCAncHJvdGVjdGVkRmllbGRzJywgcHJvdGVjdGVkRmllbGRzICk7XG59O1xuXG4vKipcbiAqIFRoaXMgcG9wdWxhdGVzIHByaW1hcnkga2V5IGZpZWxkcy5cbiAqIE5vdGUgdGhhdCBpdCBhbHNvIG92ZXJyaWRlcyBhbnkgcHJpbWFyeSBrZXkgdmFsdWVzL3Byb3BlcnRpZXMgdGhhdCBhcmVcbiAqIGFscmVhZHkgc2V0IGluIHRoZSBlbnRpdHkgc28gaXMgb25seSBwcm9jZXNzZWQgd2hlbiB0aGUgaW5zdGFuY2UgaXMgbmV3LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICovXG5jb25zdCBwb3B1bGF0ZVByaW1hcnlLZXlzID0gKCBpbnN0YW5jZSApID0+IHtcblx0aWYgKCAhIGluc3RhbmNlLmlzTmV3ICkge1xuXHRcdHJldHVybjtcblx0fVxuXHRjb25zdCBwcmltYXJ5S2V5cyA9IGdldFByaW1hcnlLZXlGaWVsZHNGcm9tU2NoZW1hKCBpbnN0YW5jZSApO1xuXHRmb3JFYWNoKCBwcmltYXJ5S2V5cywgKFxuXHRcdHNjaGVtYVByb3BlcnRpZXMsXG5cdFx0c2NoZW1hRmllbGRcblx0KSA9PiB7XG5cdFx0Ly8gYWx3YXlzIGRlbGV0ZSBhbmQgb3ZlcnJpZGUgd2hhdCBpcyBleGlzdGluZy5cblx0XHRpZiAoIGluc3RhbmNlWyBzY2hlbWFGaWVsZCBdICkge1xuXHRcdFx0ZGVsZXRlIGluc3RhbmNlWyBzY2hlbWFGaWVsZCBdO1xuXHRcdH1cblx0XHRjcmVhdGVHZXR0ZXJBbmRTZXR0ZXIoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdHNjaGVtYUZpZWxkLFxuXHRcdFx0Y3VpZCgpLFxuXHRcdFx0eyBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IHRydWUgfVxuXHRcdCk7XG5cdFx0Y3JlYXRlQWxpYXNHZXR0ZXJBbmRTZXR0ZXJGb3JGaWVsZCggaW5zdGFuY2UsIHNjaGVtYUZpZWxkICk7XG5cdH0gKTtcblx0Y3JlYXRlUHJpbWFyeUtleUZpZWxkR2V0dGVycyhcblx0XHRpbnN0YW5jZSxcblx0XHRrZXlzKCBwcmltYXJ5S2V5cyApXG5cdCk7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHZhbGlkYXRlIHR5cGUgZm9yIGEgZmllbGQgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqL1xuY29uc3Qgc2V0VmFsaWRhdGVUeXBlRm9yRmllbGQgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUgKSA9PiB7XG5cdGluc3RhbmNlWyBQUklWQVRFX1BST1BFUlRJRVMuVkFMSURBVEVfVFlQRVMgXVsgZmllbGROYW1lIF0gPVxuXHRcdGRlcml2ZVZhbGlkYXRlVHlwZUZvckZpZWxkKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIGluc3RhbmNlLnNjaGVtYSApO1xufTtcblxuLyoqXG4gKiAgUG9wdWxhdGVzIG1pc3NpbmcgZmllbGRzIGFuZCB2YWx1ZXMgdXNpbmcgZGVmYXVsdHMgcHJvdmlkZWQgYnkgc2NoZW1hLiAgSWZcbiAqICBzY2hlbWEgZG9lc24ndCBwcm92aWRlIGEgZGVmYXVsdCB0aGVuIHRoaXMgd2lsbCBwb3B1bGF0ZSB0aGUgZmllbGQgd2l0aCBhXG4gKiAgZGVmYXVsdCB2YWx1ZSB0aGF0IG1hdGNoZXMgdGhlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKi9cbmNvbnN0IHBvcHVsYXRlTWlzc2luZ0ZpZWxkcyA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdGlmICggdHlwZW9mIGluc3RhbmNlLnByb3RlY3RlZEZpZWxkcyA9PT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0cG9wdWxhdGVQcm90ZWN0ZWRGaWVsZHNQcm9wZXJ0eSggaW5zdGFuY2UsIFtdICk7XG5cdH1cblx0aWYgKCAhIGluc3RhbmNlLmlzTmV3ICkge1xuXHRcdHJldHVybjtcblx0fVxuXHRmb3JFYWNoKFxuXHRcdGdldEVudGl0eUZpZWxkc0Zyb21TY2hlbWEoIGluc3RhbmNlICksXG5cdFx0KCBzY2hlbWFQcm9wZXJ0aWVzLCBmaWVsZE5hbWUgKSA9PiB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHR5cGVvZiBpbnN0YW5jZVsgZmllbGROYW1lIF0gPT09ICd1bmRlZmluZWQnICYmXG5cdFx0XHRcdCEgaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hIClcblx0XHRcdCkge1xuXHRcdFx0XHRzZXRJbml0aWFsRW50aXR5RmllbGRzQW5kVmFsdWVzKFxuXHRcdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHQpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIGVudGl0eSBmaWVsZHMgYW5kIHZhbHVlcyBmcm9tIHRoaXMgZW50aXR5IGluc3RhbmNlXG4gKiBmb3IgdXNlIGluIGNsb25pbmcgdGhlIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBQbGFpbiBvYmplY3Qgb2YgYWxsIGZpZWxkOnZhbHVlIHBhaXJzLlxuICovXG5jb25zdCBmb3JDbG9uZSA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdHJldHVybiBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyggaW5zdGFuY2UgKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHBsYWluIG9iamVjdCBvZiB0aGUgZW50aXR5IGZpZWxkcyBhbmQgdmFsdWVzIGZyb20gdGhpcyBlbnRpdHlcbiAqIGluc3RhbmNlIHByZXBhcmVkIGZvciB1c2UgaW4gYW4gdXBkYXRlIHJlcXVlc3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtPYmplY3R9IFBsYWluIG9iamVjdCBvZiBmaWVsZDp2YWx1ZSBwYWlycy5cbiAqL1xuY29uc3QgZm9yVXBkYXRlID0gKCBpbnN0YW5jZSApID0+IHtcblx0cmV0dXJuIGdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JQZXJzaXN0aW5nKCBpbnN0YW5jZSApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIHRoZSBlbnRpdHkgZmllbGRzIGFuZCB2YWx1ZXMgZnJvbSB0aGlzIGVudGl0eVxuICogaW5zdGFuY2UgcHJlcGFyZWQgZm9yIHVzZSBpbiBhbiBpbnNlcnQgcmVxdWVzdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gUGxhaW4gb2JqZWN0IG9mIGZpZWxkOnZhbHVlIHBhaXJzLlxuICovXG5jb25zdCBmb3JJbnNlcnQgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRjb25zdCBlbnRpdHlWYWx1ZXMgPSBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yUGVyc2lzdGluZyhcblx0XHRpbnN0YW5jZSxcblx0XHR0cnVlXG5cdCk7XG5cdGluc3RhbmNlLnByaW1hcnlLZXlzLmZvckVhY2goICggcHJpbWFyeUtleSApID0+IHtcblx0XHRlbnRpdHlWYWx1ZXNbIHByaW1hcnlLZXkgXSA9IGluc3RhbmNlWyBwcmltYXJ5S2V5IF07XG5cdH0gKTtcblx0cmV0dXJuIGVudGl0eVZhbHVlcztcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHBsYWluIG9iamVjdCBvZiB0aGUgZW50aXR5IGZpZWxkcyBhbmQgdmFsdWVzIGZyb20gdGhpcyBlbnRpdHlcbiAqIGluc3RhbmNlIHByZXBhcmVkIGZvciB1c2UgaW4gZWl0aGVyIGFuIGluc2VydCBvciB1cGRhdGUgcmVxdWVzdC4gIFRoZSB0eXBlXG4gKiBpcyBhdXRvbWF0aWNhbGx5IGRlcml2ZWQgZnJvbSB0aGUgZGV0ZXJtaW5pbmcgd2hldGhlciB0aGUgZW50aXR5IGlzIFwibmV3XCIgb3JcbiAqIG5vdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gUGxhaW4gb2JqZWN0IG9mIGZpZWxkOnZhbHVlIHBhaXJzLlxuICovXG5jb25zdCBmb3JQZXJzaXN0ID0gKCBpbnN0YW5jZSApID0+IHtcblx0aWYgKCBpbnN0YW5jZS5pc05ldyApIHtcblx0XHRyZXR1cm4gZm9ySW5zZXJ0KCBpbnN0YW5jZSApO1xuXHR9XG5cdHJldHVybiBmb3JVcGRhdGUoIGluc3RhbmNlICk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgZ2V0dGVycyBmb3IgcmV0cmlldmluZyB0aGUgZmllbGRzIGFuZCB2YWx1ZXMgb2YgdGhlIGVudGl0eSBpbnN0YW5jZVxuICogZm9yIGluc2VydCBvciB1cGRhdGUgcmVxdWVzdHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVQZXJzaXN0aW5nR2V0dGVyc0FuZFNldHRlcnMgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRjcmVhdGVDYWxsYmFja0dldHRlciggaW5zdGFuY2UsICdmb3JVcGRhdGUnLCBmb3JVcGRhdGUgKTtcblx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoIGluc3RhbmNlLCAnZm9ySW5zZXJ0JywgZm9ySW5zZXJ0ICk7XG5cdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKCBpbnN0YW5jZSwgJ2ZvclBlcnNpc3QnLCBmb3JQZXJzaXN0ICk7XG5cdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKCBpbnN0YW5jZSwgJ2ZvckNsb25lJywgZm9yQ2xvbmUgKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBpbml0aWFsIGVudGl0eSBmaWVsZCBhY2Nlc3NvcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNQcmltYXJ5S2V5XG4gKi9cbmNvbnN0IHNldEluaXRpYWxFbnRpdHlGaWVsZHNBbmRWYWx1ZXMgPSAoXG5cdGluc3RhbmNlLFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdGlzUHJpbWFyeUtleSA9IGZhbHNlLFxuKSA9PiB7XG5cdGlmICggaXNVbmRlZmluZWQoIGZpZWxkVmFsdWUgKSApIHtcblx0XHRmaWVsZFZhbHVlID0gZ2V0RGVmYXVsdFZhbHVlRm9yRmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hICk7XG5cdFx0c2V0VmFsaWRhdGVUeXBlRm9yRmllbGQoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUgKTtcblx0fVxuXHRjcmVhdGVSYXdFbnRpdHlHZXR0ZXJzU2V0dGVycyhcblx0XHRpbnN0YW5jZSxcblx0XHRmaWVsZE5hbWUsXG5cdFx0ZGVyaXZlUHJlcGFyZWRWYWx1ZUZvckZpZWxkKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIGluc3RhbmNlICksXG5cdFx0aXNQcmltYXJ5S2V5XG5cdCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgcmF3IGVudGl0eSBnZXR0ZXJzIGFuZCBzZXR0ZXJzLiAgVGhlc2UgYXJlIHRoZSBwcm9wZXJ0aWVzIG9mIGFuXG4gKiBlbnRpdHkgdGhhdCBoYXZlIHRoZSB2YWx1ZXMgdXNlZCBmb3Igbm90IG9ubHkgZ2V0dGluZyBidXQgYWxzbyBzZXR0aW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzUHJpbWFyeUtleSBzZXQgdG8gdHJ1ZSBpZiBmaWVsZCBpcyB0aGUgbW9kZWwncyBwcmltYXJ5IGtleVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlUmF3RW50aXR5R2V0dGVyc1NldHRlcnMgPSAoXG5cdGluc3RhbmNlLFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdGlzUHJpbWFyeUtleSA9IGZhbHNlLFxuKSA9PiB7XG5cdGNvbnN0IG9wdHMgPSB7IGVudW1lcmFibGU6IHRydWUgfTtcblx0Ly8gcHJpbWFyeSBrZXkgaXMgaW1tdXRhYmxlXG5cdGlmICggaXNQcmltYXJ5S2V5ICkge1xuXHRcdGNyZWF0ZUdldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdG9wdHNcblx0XHQpO1xuXHRcdGNyZWF0ZUFsaWFzR2V0dGVyRm9yRmllbGQoIGluc3RhbmNlLCBmaWVsZE5hbWUgKTtcblx0fSBlbHNlIHtcblx0XHRjcmVhdGVHZXR0ZXJBbmRTZXR0ZXIoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRvcHRzXG5cdFx0KTtcblx0XHRjcmVhdGVBbGlhc0dldHRlckFuZFNldHRlckZvckZpZWxkKCBpbnN0YW5jZSwgZmllbGROYW1lICk7XG5cdH1cbn07XG5cbi8qKlxuICogQ3JlYXRlcyBcImFsaWFzXCIgZ2V0dGVyIGZvciB0aGUgZ2l2ZW4gZmllbGQgbmFtZSBvbiB0aGUgZW50aXR5IGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQWxpYXNHZXR0ZXJGb3JGaWVsZCA9ICggaW5zdGFuY2UsIGZpZWxkTmFtZSApID0+IHtcblx0Y3JlYXRlQWxpYXNlc0Zvck1ldGhvZCggaW5zdGFuY2UsIGZpZWxkTmFtZSwgY3JlYXRlQWxpYXNHZXR0ZXIgKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBcImFsaWFzXCIgZ2V0dGVycyBhbmQgc2V0dGVycyBmb3IgdGhlIGdpdmVuIGZpZWxkIG9uIHRoZSBlbnRpdHlcbiAqIGluc3RhbmNlLlxuICpcbiAqIEV4YW1wbGU6IERhdGV0aW1lIGVudGl0aWVzIGhhdmUgYSBgRFRUX0VWVF9zdGFydGAgZmllbGQuICBPbiB0aGUgZW50aXR5XG4gKiBpbnN0YW5jZSwgeW91IHdpbGwgYmUgYWJsZSB0byBhY2Nlc3MgdGhlIHZhbHVlIG9mIHRoYXQgZmllbGQgdmlhOlxuICogLSBkYXRldGltZS5EVFRfRVZUX3N0YXJ0XG4gKiAtIGRhdGV0aW1lLmR0dEV2dFN0YXJ0XG4gKiAtIGRhdGV0aW1lLmV2dFN0YXJ0XG4gKiAtIGRhdGV0aW1lLnN0YXJ0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBbGlhc0dldHRlckFuZFNldHRlckZvckZpZWxkID0gKCBpbnN0YW5jZSwgZmllbGROYW1lICkgPT4ge1xuXHRjcmVhdGVBbGlhc2VzRm9yTWV0aG9kKCBpbnN0YW5jZSwgZmllbGROYW1lLCBjcmVhdGVBbGlhc0dldHRlckFuZFNldHRlciApO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIEFsaWFzZXMgdXNpbmcgdGhlIHByb3ZpZGVkIG1ldGhvZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZFxuICovXG5jb25zdCBjcmVhdGVBbGlhc2VzRm9yTWV0aG9kID0gKCBpbnN0YW5jZSwgZmllbGROYW1lLCBtZXRob2QgKSA9PiB7XG5cdC8vIHN0cmlwIGZpZWxkIHByZWZpeGVzIGFuZCBjYW1lbENhc2UgKGlmIHRoZXJlIGFyZSBmaWVsZCBwcmVmaXhlcyBmb3IgdGhlXG5cdC8vIGVudGl0eS4gKGVnLiBFVlRfZGVzYyA9PiBkZXNjIGFuZCBEVFRfRVZUX3N0YXJ0ID0+IHN0YXJ0KTtcblx0aWYgKCBpbnN0YW5jZS5maWVsZFByZWZpeGVzICkge1xuXHRcdGxldCBuZXdGaWVsZE5hbWUgPSBmaWVsZE5hbWU7XG5cblx0XHRpbnN0YW5jZS5maWVsZFByZWZpeGVzLmZvckVhY2goICggZmllbGRQcmVmaXggKSA9PiB7XG5cdFx0XHRuZXdGaWVsZE5hbWUgPSBuZXdGaWVsZE5hbWUucmVwbGFjZSggZmllbGRQcmVmaXggKyAnXycsICcnICk7XG5cdFx0fSApO1xuXHRcdGlmICggbmV3RmllbGROYW1lICE9PSBmaWVsZE5hbWUgKSB7XG5cdFx0XHRtZXRob2QoXG5cdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdGNhbWVsQ2FzZSggbmV3RmllbGROYW1lIClcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBjYWxsYmFjayB0aGF0IGlzIHVzZWQgaW4gdGhlIGBnZXRSZW5kZXJlZGAgZmllbGQgZ2V0dGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7ZnVuY3Rpb24oc3RyaW5nKTogKn0gIEEgY2FsbGJhY2suXG4gKi9cbmNvbnN0IGdldFJlbmRlcmVkQ2FsbGJhY2sgPSAoIGluc3RhbmNlICkgPT4gKCByZXF1ZXN0ZWRGaWVsZE5hbWUgKSA9PlxuXHRpbnN0YW5jZVsgcmVxdWVzdGVkRmllbGROYW1lICsgJ1JlbmRlcmVkJyBdO1xuXG4vKipcbiAqIFJldHVybnMgYSBmaWVsZE5hbWUgc3RyaXBwZWQgb2YgYWxsIHBvc3NpYmxlIHByZWZpeGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgcHJlZml4IGZyZWUgZmllbGROYW1lLlxuICovXG5jb25zdCByZW1vdmVQcmVmaXhlc0Zyb21GaWVsZCA9ICggaW5zdGFuY2UsIGZpZWxkTmFtZSApID0+IHtcblx0Y29uc3QgcHJlZml4ZXNUb1JlbW92ZSA9IHNvcnRCeShcblx0XHRpbnN0YW5jZS5maWVsZFByZWZpeGVzLFxuXHRcdCggcHJlZml4ICkgPT4gcHJlZml4Lmxlbmd0aCAqIC0xXG5cdCk7XG5cdGxldCBuZXdGaWVsZE5hbWUgPSBmaWVsZE5hbWU7XG5cdGZvckVhY2goIHByZWZpeGVzVG9SZW1vdmUsICggcHJlZml4ICkgPT4ge1xuXHRcdG5ld0ZpZWxkTmFtZSA9IGZpZWxkTmFtZS5yZXBsYWNlKCBwcmVmaXgsICcnICk7XG5cdFx0aWYgKCBuZXdGaWVsZE5hbWUgIT09IGZpZWxkTmFtZSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0gKTtcblx0cmV0dXJuIG5ld0ZpZWxkTmFtZTtcbn07XG5cbi8qKlxuICogVGhpcyBjcmVhdGVzIHRoZSBnZXR0ZXJzIGZvciB0aGUgcmVuZGVyZWQgcHJvcGVydHkgb2YgbW9kZWwgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSAgZmllbGRWYWx1ZVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlUmVuZGVyZWRHZXR0ZXJzID0gKCBpbnN0YW5jZSwgZmllbGROYW1lLCBmaWVsZFZhbHVlICkgPT4ge1xuXHRjcmVhdGVHZXR0ZXIoXG5cdFx0aW5zdGFuY2UsXG5cdFx0Y2FtZWxDYXNlKCByZW1vdmVQcmVmaXhlc0Zyb21GaWVsZCggaW5zdGFuY2UsIGZpZWxkTmFtZSApICkgK1xuXHRcdCdSZW5kZXJlZCcsXG5cdFx0ZmllbGRWYWx1ZVxuXHQpO1xuXHRpZiAoIGlzVW5kZWZpbmVkKCBpbnN0YW5jZS5nZXRSZW5kZXJlZCApICkge1xuXHRcdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHQnZ2V0UmVuZGVyZWQnLFxuXHRcdFx0Z2V0UmVuZGVyZWRDYWxsYmFjayxcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciB0aGUgYGhhc011bHRpcGxlUHJpbWFyeUtleXNgIGdldHRlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKCk6IGJvb2xlYW59IFRoZSBjYWxsYmFjayBmb3IgaGFzTXVsdGlwbGVQcmltYXJ5S2V5cyBnZXR0ZXJcbiAqL1xuY29uc3QgaGFzTXVsdGlwbGVQcmltYXJ5S2V5c0NhbGxiYWNrID0gKCBpbnN0YW5jZSApID0+XG5cdGluc3RhbmNlLnByaW1hcnlLZXlzLmxlbmd0aCA+IDE7XG5cbi8qKlxuICogQ3JlYXRlcyBnZXR0ZXJzIGZvciBwcmltYXJ5IGtleSByZWxhdGVkIGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge0FycmF5fSBwcmltYXJ5S2V5c1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlUHJpbWFyeUtleUZpZWxkR2V0dGVycyA9ICggaW5zdGFuY2UsIHByaW1hcnlLZXlzICkgPT4ge1xuXHRjb25zdCBvcHRzID0geyBjb25maWd1cmFibGU6IHRydWUgfTtcblx0aWYgKCBpc0FycmF5KCBwcmltYXJ5S2V5cyApICkge1xuXHRcdGNyZWF0ZUdldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0J3ByaW1hcnlLZXknLFxuXHRcdFx0cHJpbWFyeUtleXNbIDAgXSxcblx0XHRcdG9wdHNcblx0XHQpO1xuXHRcdGNyZWF0ZUdldHRlckFuZFNldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0J3ByaW1hcnlLZXlzJyxcblx0XHRcdHByaW1hcnlLZXlzLFxuXHRcdFx0b3B0c1xuXHRcdCk7XG5cdFx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdCdoYXNNdWx0aXBsZVByaW1hcnlLZXlzJyxcblx0XHRcdGhhc011bHRpcGxlUHJpbWFyeUtleXNDYWxsYmFjayxcblx0XHRcdG9wdHNcblx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7ZnVuY3Rpb24oc3RyaW5nKTogYm9vbGVhbn0gUmV0dXJucyBhIGNhbGxiYWNrIGZvciB0aGVcbiAqIGhhc0NhbGN1bGF0ZWRGaWVsZCBnZXR0ZXJcbiAqL1xuY29uc3QgaGFzQ2FsY3VsYXRlZEZpZWxkQ2FsbGJhY2sgPSAoIGluc3RhbmNlICkgPT5cblx0KCBmaWVsZE5hbWVUb0NoZWNrICkgPT4gISBpc1VuZGVmaW5lZCggaW5zdGFuY2VbIGZpZWxkTmFtZVRvQ2hlY2sgXSApO1xuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGdldHRlcnMgZm9yIGFsbCB0aGUgY2FsY3VsYXRlZCBmaWVsZHMgYW5kIHZhbHVlIG9uIHRoZSBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fWZpZWxkc0FuZFZhbHVlc1xuICovXG5leHBvcnQgY29uc3Qgc2V0Q2FsY3VsYXRlZEZpZWxkQW5kVmFsdWVzID0gKCBpbnN0YW5jZSwgZmllbGRzQW5kVmFsdWVzICkgPT4ge1xuXHRmb3JFYWNoKCBmaWVsZHNBbmRWYWx1ZXMsICggY2FsY3VsYXRlZEZpZWxkVmFsdWUsIGNhbGN1bGF0ZWRGaWVsZE5hbWUgKSA9PiB7XG5cdFx0aWYgKCBjYWxjdWxhdGVkRmllbGROYW1lICE9PSAnX3Byb3RlY3RlZCcgKSB7XG5cdFx0XHRjcmVhdGVHZXR0ZXIoXG5cdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHRjYW1lbENhc2UoIGNhbGN1bGF0ZWRGaWVsZE5hbWUgKSxcblx0XHRcdFx0Y2FsY3VsYXRlZEZpZWxkVmFsdWVcblx0XHRcdCk7XG5cdFx0fVxuXHR9ICk7XG5cdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKFxuXHRcdGluc3RhbmNlLFxuXHRcdCdoYXNDYWxjdWxhdGVkRmllbGQnLFxuXHRcdGhhc0NhbGN1bGF0ZWRGaWVsZENhbGxiYWNrXG5cdCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBnZXR0ZXJzIGZvciB0aGUgdmFyaW91cyByZXNvdXJjZSBsaW5rcyBvbiB0aGUgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn1maWVsZHNBbmRWYWx1ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldFJlc291cmNlcyA9ICggaW5zdGFuY2UsIGZpZWxkc0FuZFZhbHVlcyApID0+IHtcblx0Y29uc3QgcmVsYXRpb25zID0gW107XG5cdGxldCByZWxhdGlvbk5hbWU7XG5cdGZvckVhY2goIGZpZWxkc0FuZFZhbHVlcywgKCByZXNvdXJjZVZhbHVlLCByZXNvdXJjZU5hbWUgKSA9PiB7XG5cdFx0aWYgKCByZXNvdXJjZU5hbWUgPT09ICdzZWxmJyApIHtcblx0XHRcdGNyZWF0ZUdldHRlciggaW5zdGFuY2UsICdyZXNvdXJjZUxpbmsnLCByZXNvdXJjZVZhbHVlWyAwIF0uaHJlZiApO1xuXHRcdH0gZWxzZSBpZiAoIHJlc291cmNlTmFtZSA9PT0gJ2NvbGxlY3Rpb24nICkge1xuXHRcdFx0Y3JlYXRlR2V0dGVyKFxuXHRcdFx0XHRpbnN0YW5jZSxcblx0XHRcdFx0J2NvbGxlY3Rpb25SZXNvdXJjZUxpbmsnLFxuXHRcdFx0XHRyZXNvdXJjZVZhbHVlWyAwIF0uaHJlZlxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVsYXRpb25OYW1lID0gZ2V0UmVsYXRpb25OYW1lRnJvbUxpbmsoIHJlc291cmNlTmFtZSApO1xuXHRcdFx0cmVsYXRpb25zLnB1c2goIHJlbGF0aW9uTmFtZSApO1xuXHRcdFx0c2V0UmVsYXRpb25zUmVzb3VyY2UoXG5cdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHRyZWxhdGlvbk5hbWUgKyAnUmVzb3VyY2UnLFxuXHRcdFx0XHRyZXNvdXJjZVZhbHVlXG5cdFx0XHQpO1xuXHRcdH1cblx0fSApO1xuXHQvL3NldCByZWxhdGlvbnMgZ2V0dGVyXG5cdGNyZWF0ZUdldHRlciggaW5zdGFuY2UsICdnZXRSZWxhdGlvbnMnLCByZWxhdGlvbnMgKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihzdHJpbmcpOiBPYmplY3R9IFJldHVybnMgdGhlIGNhbGxiYWNrIGZvciBnZXR0aW5nIGFcbiAqIHJlbGF0aW9uIHJlc291cmNlXG4gKi9cbmNvbnN0IGdldFJlbGF0aW9uUmVzb3VyY2VDYWxsYmFjayA9ICggaW5zdGFuY2UgKSA9PlxuXHQoIHJlbGF0aW9uTmFtZSApID0+IGluc3RhbmNlWyByZWxhdGlvbk5hbWUucmVwbGFjZSggJ1Jlc291cmNlJywgJycgKSBdO1xuXG4vKipcbiAqIENyZWF0ZXMgZ2V0dGVycyBmb3IgdGhlIHJlbGF0aW9ucyByZXNvdXJjZSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCBzdHJpbmc+fSByZXNvdXJjZUluZm9cbiAqL1xuZXhwb3J0IGNvbnN0IHNldFJlbGF0aW9uc1Jlc291cmNlID0gKFxuXHRpbnN0YW5jZSxcblx0cmVsYXRpb25OYW1lLFxuXHRyZXNvdXJjZUluZm9cbikgPT4ge1xuXHRjcmVhdGVHZXR0ZXIoXG5cdFx0aW5zdGFuY2UsXG5cdFx0cmVsYXRpb25OYW1lLFxuXHRcdHtcblx0XHRcdHJlc291cmNlTGluazogcmVzb3VyY2VJbmZvWyAwIF0uaHJlZixcblx0XHRcdHNpbmdsZTogcmVzb3VyY2VJbmZvWyAwIF0uc2luZ2xlLFxuXHRcdH1cblx0KTtcblx0aWYgKCBpc1VuZGVmaW5lZCggaW5zdGFuY2UuZ2V0UmVsYXRpb25SZXNvdXJjZSApICkge1xuXHRcdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKCBpbnN0YW5jZSxcblx0XHRcdCdnZXRSZWxhdGlvblJlc291cmNlJyxcblx0XHRcdGdldFJlbGF0aW9uUmVzb3VyY2VDYWxsYmFja1xuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogU2V0cyB0aGUgaW50ZXJuYWwgc2F2ZSBzdGF0ZSB0byB0aGUgZ2l2ZW4gdmFsdWUgd2hlbiBjdXJyZW50IHN0YXRlIGlzXG4gKiBTQVZFX1NUQVRFLmNsZWFuIG90aGVyd2lzZSBjdXJyZW50IHNhdmUgc3RhdGUgaXMgcmV0YWluZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gc2F2ZVN0YXRlIEV4cGVjdGVkIHRvIGJlIG9uZSBvZiBTQVZFX1NUQVRFIGNvbnN0YW50IHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3ZlcnJpZGUgU2V0IHRvIHRydWUgd2hlbiBvdmVycmlkaW5nIHRoZSBkZWZhdWx0IGxvZ2ljIGZvclxuICogc2V0dGluZyBzdGF0ZS4gIFdoZW4gdHJ1ZSwgdGhlIHNhdmVTdGF0ZSBpcyBzZXQgdG8gd2hhdGV2ZXIgdGhlIGluY29taW5nXG4gKiBzYXZlU3RhdGUgdmFsdWUgaXMuXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRTYXZlU3RhdGUgPSAoIGluc3RhbmNlLCBzYXZlU3RhdGUsIG92ZXJyaWRlID0gZmFsc2UgKSA9PiB7XG5cdGNvbnN0IGN1cnJlbnRTdGF0ZSA9IGluc3RhbmNlWyBQUklWQVRFX1BST1BFUlRJRVMuU0FWRV9TVEFURSBdO1xuXHRzd2l0Y2ggKCBzYXZlU3RhdGUgKSB7XG5cdFx0Y2FzZSBTQVZFX1NUQVRFLkRJUlRZOlxuXHRcdGNhc2UgU0FWRV9TVEFURS5ORVc6XG5cdFx0Y2FzZSBTQVZFX1NUQVRFLkNMRUFOOlxuXHRcdFx0aWYgKCBvdmVycmlkZSApIHtcblx0XHRcdFx0aW5zdGFuY2VbIFBSSVZBVEVfUFJPUEVSVElFUy5TQVZFX1NUQVRFIF0gPSBzYXZlU3RhdGU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aW5zdGFuY2VbIFBSSVZBVEVfUFJPUEVSVElFUy5TQVZFX1NUQVRFIF0gPVxuXHRcdFx0XHRjdXJyZW50U3RhdGUgPT09IFNBVkVfU1RBVEUuQ0xFQU4gP1xuXHRcdFx0XHRcdHNhdmVTdGF0ZSA6XG5cdFx0XHRcdFx0Y3VycmVudFN0YXRlO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnQoXG5cdFx0XHRcdCdTYXZlIHN0YXRlIGZvciBlbnRpdHkgY2FuIG9ubHkgYmUgc2V0IHRvIGVpdGhlciAnICtcblx0XHRcdFx0J1NBVkVfU1RBVEUuRElSVFksIFNBVkVfU1RBVEUuTkVXIG9yIFNBVkVfU1RBVEUuQ0xFQU4nXG5cdFx0XHQpO1xuXHR9XG59O1xuXG4vKipcbiAqIEFkZCB0aGUgZmllbGQgbmFtZSB0byB0aGUgZmllbGRUb1BlcnNpc3RPbkluc2VydCBwcm9wZXJ0eSBvbiB0aGUgaW5zdGFuY2VcbiAqIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEZpZWxkVG9QZXJzaXN0ID0gKCBpbnN0YW5jZSwgZmllbGROYW1lICkgPT4ge1xuXHRpZiAoIGluc3RhbmNlLmZpZWxkc1RvUGVyc2lzdE9uSW5zZXJ0ICkge1xuXHRcdGluc3RhbmNlLmZpZWxkc1RvUGVyc2lzdE9uSW5zZXJ0LmFkZCggZmllbGROYW1lICk7XG5cdH1cbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0aXNQbGFpbk9iamVjdCxcblx0Y2FtZWxDYXNlLFxuXHRsYXN0LFxuXHRwaWNrLFxuXHRwaWNrQnksXG5cdGlzQXJyYXksXG59IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpbnN0YW5jZU9mIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRNb25leSxcblx0U2l0ZUN1cnJlbmN5LFxuXHRTZXJ2ZXJEYXRlVGltZSBhcyBEYXRlVGltZSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsdWUtb2JqZWN0cyc7XG5cbmltcG9ydCB7IHBsdXJhbE1vZGVsTmFtZSB9IGZyb20gJy4uL21vZGVsLW5hbWVzJztcblxuaW1wb3J0IHtcblx0aGFzUmF3UHJvcGVydHksXG5cdGhhc1ByZXR0eVByb3BlcnR5LFxuXHRoYXNSZW5kZXJlZFByb3BlcnR5LFxuXHRpc0RhdGVUaW1lRmllbGQsXG5cdGlzTW9uZXlGaWVsZCxcblx0aXNQcmltYXJ5S2V5RmllbGQsXG5cdGlzRW50aXR5RmllbGQsXG59IGZyb20gJy4vYm9vbGVhbnMnO1xuaW1wb3J0IHsgdmFsaWRhdGVUeXBlRm9yRmllbGQgfSBmcm9tICcuL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgVkFMSURBVEVfVFlQRSB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBUaGlzIHJlY2VpdmVzIGEgZmllbGQgbmFtZSwgaXQncyB2YWx1ZSBhbmQgdGhlIHNjaGVtYSBhbmQgY29udmVydHMgaXQgdG8gdGhlXG4gKiByZWxhdGVkIHZhbHVlIG9iamVjdCBJRiB0aGUgc2NoZW1hIGluZGljYXRlcyBpdCBpcyBvZiBhIHR5cGUgdGhhdCB0aGVyZSBpcyBhXG4gKiBrbm93biB2YWx1ZSBvYmplY3QgZm9yLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7RGF0ZVRpbWV8TW9uZXl8Kn0gIElmIHRoaXMgaXMgbm90IGEgdmFsdWUgb2JqZWN0LCB0aGUgb3JpZ2luYWwgZmllbGRcbiAqIHZhbHVlIGlzIHJldHVybmVkLlxuICovXG5leHBvcnQgY29uc3QgbWF5YmVDb252ZXJ0VG9WYWx1ZU9iamVjdCA9ICggZmllbGROYW1lLCBmaWVsZFZhbHVlLCBzY2hlbWEgKSA9PiB7XG5cdGlmIChcblx0XHRpc0RhdGVUaW1lRmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgJiZcblx0XHQhIERhdGVUaW1lLnZhbGlkYXRlSXNEYXRlVGltZSggZmllbGRWYWx1ZSApXG5cdCkge1xuXHRcdHJldHVybiBEYXRlVGltZS5mcm9tSVNPKCBmaWVsZFZhbHVlICk7XG5cdH1cblx0aWYgKFxuXHRcdGlzTW9uZXlGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSAmJlxuXHRcdCEgKCBpbnN0YW5jZU9mKCBmaWVsZFZhbHVlLCAnTW9uZXknICkgKVxuXHQpIHtcblx0XHRyZXR1cm4gbmV3IE1vbmV5KCBmaWVsZFZhbHVlLCBTaXRlQ3VycmVuY3kgKTtcblx0fVxuXHQvLyBpZiBtb3JlIFZPcyBnZXQgYWRkZWQsIHRoZW4gaW5zdGVhZCBvZiBhZGRpbmcgbW9yZSBpZiBlbHNlIGJsb2Nrc1xuXHQvLyB0byB0aGlzIGZ1bmN0aW9uIGFuZCB0aGUgb25lcyBiZWxvdywgYWxsIFZPIGxvZ2ljIHNob3VsZCBiZSBleHRyYWN0ZWRcblx0Ly8gaW50byBzb21lIGtpbmQgb2YgIFZhbHVlT2JqZWN0RXh0cmFjdG9yIG9iamVjdCB0aGF0IHdvdWxkIGhvbGQgYWxsIG9mXG5cdC8vIHRoZSBuZWNlc3NhcnkgY2FsbGJhY2tzIGZvciBtYW5hZ2luZyB0aGUgZGV0ZWN0aW9uIG9mIFZPIGZpZWxkcyBhbmRcblx0Ly8gY29udmVyc2lvbiBvZiBkYXRhIHRvIGFuZCBmcm9tIHRoZSB2YXJpb3VzIFZPc1xuXHQvLyBwbHogc2VlOlxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vZXZlbnRlc3ByZXNzby9ldmVudC1lc3ByZXNzby1jb3JlL3B1bGwvNjM3L2ZpbGVzI3IyMjg2OTA3ODlcblx0cmV0dXJuIGZpZWxkVmFsdWU7XG59O1xuXG4vKipcbiAqIFRoaXMgY29udmVydHMgdGhlIGluY29taW5nIHZhbHVlIGZvciBhIGZpZWxkIHRvIGl0cyBlcXVpdmFsZW50IFwicmF3XCIgdmFsdWVcbiAqIGZyb20gYSB2YWx1ZSBvYmplY3QgaWYgaXQgaXMgYSB2YWx1ZSBvYmplY3QuICBPdGhlcndpc2UgaXQganVzdCByZXR1cm5zIHRoZVxuICogb3JpZ2luYWwgaW5jb21pbmcgdmFsdWUuICBUaGlzIGFsc28gYXNzZXJ0cyB0aGF0IGlmIHRoZSBwcm92aWRlZCBmaWVsZCBpc1xuICogZXhwZWN0ZWQgdG8gYmUgYSB2YWx1ZSBvYmplY3QgdGhhdCB0aGUgaW5jb21pbmcgdmFsdWUgSVMgYSB2YWxpZCB2YWx1ZSBvYmplY3RcbiAqIGFuZCBpdCBpcyB0aGUgZXhwZWN0ZWQgaW5zdGFuY2Ugb2YgYSB2YWx1ZSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfE1vbmV5fERhdGVUaW1lfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtzdHJpbmd8bnVtYmVyfCp9ICBJZiB0aGUgdmFsdWUgaXMgbm90IGEgdmFsdWUgb2JqZWN0LCByZXR1cm5zIHRoZVxuICogb3JpZ2luYWwgdmFsdWVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAqL1xuZXhwb3J0IGNvbnN0IG1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdFdpdGhBc3NlcnRpb25zID0gKFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdHNjaGVtYVxuKSA9PiB7XG5cdGlmICggaXNEYXRlVGltZUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApICkge1xuXHRcdHRyeSB7XG5cdFx0XHREYXRlVGltZS5hc3NlcnRJc0RhdGVUaW1lKCBmaWVsZFZhbHVlICk7XG5cdFx0fSBjYXRjaCAoIGVycm9yICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBmb2xsb3dpbmcgZXJyb3Igd2FzIHRocm93biB3aGVuIHRyeWluZyB0byBjb252ZXJ0IHRoZSBcIicgK1xuXHRcdFx0XHRmaWVsZE5hbWUgKyAnXCIgRGF0ZVRpbWUgZmllbGQgdG8gYW4gSVNPIHN0cmluZzogJyArIGVycm9yXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRmaWVsZFZhbHVlID0gZmllbGRWYWx1ZS50b0lTTygpO1xuXHR9IGVsc2UgaWYgKCBpc01vbmV5RmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgKSB7XG5cdFx0dHJ5IHtcblx0XHRcdE1vbmV5LmFzc2VydE1vbmV5KCBmaWVsZFZhbHVlICk7XG5cdFx0fSBjYXRjaCAoIGVycm9yICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J1RoZSBmb2xsb3dpbmcgZXJyb3Igd2FzIHRocm93biB3aGVuIHRyeWluZyB0byBjb252ZXJ0IHRoZSBcIicgK1xuXHRcdFx0XHRmaWVsZE5hbWUgKyAnXCIgTW9uZXkgZmllbGQgdG8gYSBudW1iZXI6ICcgKyBlcnJvclxuXHRcdFx0KTtcblx0XHR9XG5cdFx0ZmllbGRWYWx1ZSA9IGZpZWxkVmFsdWUudG9OdW1iZXIoKTtcblx0fVxuXHRyZXR1cm4gZmllbGRWYWx1ZTtcbn07XG5cbi8qKlxuICogVGhpcyBjb252ZXJ0cyB0aGUgaW5jb21pbmcgdmFsdWUgZm9yIGEgZmllbGQgdG8gaXRzIGVxdWl2YWxlbnQgXCJyYXdcIiB2YWx1ZVxuICogaWYgdGhlIGluY29taW5nIHZhbHVlICBpcyBhIHZhbHVlIG9iamVjdC4gIE90aGVyd2lzZSBpdCBqdXN0IHJldHVybnMgdGhlXG4gKiBvcmlnaW5hbCBpbmNvbWluZyB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0geyp8RGF0ZVRpbWV8TW9uZXl9ZmllbGRWYWx1ZVxuICogQHJldHVybiB7Kn0gVGhlIHJhdyB2YWx1ZSBmb3IgdGhlIHZhbHVlIG9iamVjdCBvciB0aGUgb3JpZ2luYWwgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3QgPSAoIGZpZWxkVmFsdWUgKSA9PiB7XG5cdGlmICggRGF0ZVRpbWUudmFsaWRhdGVJc0RhdGVUaW1lKCBmaWVsZFZhbHVlICkgKSB7XG5cdFx0ZmllbGRWYWx1ZSA9IGZpZWxkVmFsdWUudG9JU08oKTtcblx0fSBlbHNlIGlmICggaW5zdGFuY2VPZiggZmllbGRWYWx1ZSwgJ01vbmV5JyApICkge1xuXHRcdGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLnRvTnVtYmVyKCk7XG5cdH1cblx0cmV0dXJuIGZpZWxkVmFsdWU7XG59O1xuXG4vKipcbiAqIFRoaXMgZGVyaXZlcyB0aGUgXCJwcmVwYXJlZFwiIHZhbHVlIGZvciB0aGUgZ2l2ZW4gZmllbGQgYW5kIHZhbHVlLlxuICpcbiAqIFwiUHJlcGFyZWRcIiBtZWFuczpcbiAqXG4gKiAtIGNvbnZlcnRpbmcgdG8gYSB2YWx1ZSBvYmplY3QgaWYgdGhpcyBpcyBhIGZpZWxkIHRoYXQgdGhlcmUgYXJlIGRlZmluZWRcbiAqICAgdmFsdWUgb2JqZWN0cyBmb3IuXG4gKiAtIHJldHJpZXZpbmcgdGhlIFwicmF3XCIgdmFsdWUgZnJvbSBmaWVsZCB2YWx1ZXMgdGhhdCBoYXZlIGByYXdgIGFuZCBgcmVuZGVyZWRgXG4gKiAgIG9yIGBwcmV0dHlgIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSAgZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtEYXRlVGltZXxNb25leXwqfSAgUmV0dXJucyB0aGUgb3JpZ2luYWwgaW5jb21pbmcgdmFsdWUgaWYgaXQgZG9lc1xuICogbm90IGhhdmUgYSByYXcgZXF1aXZhbGVudCBvciBpcyBub3QgYSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBkZXJpdmVQcmVwYXJlZFZhbHVlRm9yRmllbGQgPSAoXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0aW5zdGFuY2VcbikgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uVHlwZSA9IHZhbGlkYXRlVHlwZUZvckZpZWxkKCBmaWVsZE5hbWUsIGluc3RhbmNlICk7XG5cdGZpZWxkVmFsdWUgPSBpc1BsYWluT2JqZWN0KCBmaWVsZFZhbHVlICkgP1xuXHRcdGZpZWxkVmFsdWVbIHZhbGlkYXRpb25UeXBlIF0gOlxuXHRcdGZpZWxkVmFsdWU7XG5cdHJldHVybiBtYXliZUNvbnZlcnRUb1ZhbHVlT2JqZWN0KCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIGluc3RhbmNlLnNjaGVtYSApO1xufTtcblxuLyoqXG4gKiBUaGlzIHJldHVybnMgdGhlIFwicmVuZGVyZWRcIiBvciBcInByZXR0eVwiIGVxdWl2YWxlbnQgZnJvbSBhIHZhbHVlIGlmIGl0IGV4aXN0c1xuICogYXMgYSBwcm9wZXJ0eSBvbiBpdC5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHsqfSAgVGhlIG9yaWdpbmFsIHZhbHVlIGlzIHJldHVybmVkIGlmIGl0cyBub3QgYSBwbGFpbiBvYmplY3Qgb3IgaWZcbiAqIGl0IGhhcyBubyBgcmVuZGVyZWRgIG9yIGBwcmV0dHlgIHByb3BlcnR5LiAgSG93ZXZlciwgaWYgaXQgaXMgYSBwbGFpbiBvYmplY3RcbiAqIGFuZCBoYXMgbm8gcHJldHR5L3JlbmRlcmVkIHByb3BlcnRpZXMgYnV0IERPRVMgaGF2ZSBhIHJhdyBwcm9wZXJ0eSwgdGhlbiB0aGF0XG4gKiBpcyByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlcml2ZVJlbmRlcmVkVmFsdWUgPSAoIHZhbHVlICkgPT4ge1xuXHRpZiAoICEgaXNQbGFpbk9iamVjdCggdmFsdWUgKSApIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFsdWUgPSBoYXNQcmV0dHlQcm9wZXJ0eSggdmFsdWUgKSA/IHZhbHVlLnByZXR0eSA6IHZhbHVlO1xuXHR2YWx1ZSA9IGhhc1JlbmRlcmVkUHJvcGVydHkoIHZhbHVlICkgPyB2YWx1ZS5yZW5kZXJlZCA6IHZhbHVlO1xuXHRyZXR1cm4gaGFzUmF3UHJvcGVydHkoIHZhbHVlICkgPyB2YWx1ZS5yYXcgOiB2YWx1ZTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbmFtZSBvZiBhIHJlc291cmNlIGZyb20gdGhlIGdpdmVuIGByZXNvdXJjZUxpbmtgLlxuICpcbiAqIGVnLiBcImh0dHBzOi8vYXBpLmV2ZW50ZXNwcmVzc28uY29tL3JlZ2lzdHJhdGlvblwiIHdpbGwgcmV0dXJuICdyZWdpc3RyYXRpb24nO1xuXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VMaW5rXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHJlc291cmNlIGZyb20gYSBwcm92aWRlZCByZXNvdXJjZVxuICogbGluay5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFJlbGF0aW9uTmFtZUZyb21MaW5rID0gKCByZXNvdXJjZUxpbmsgKSA9PiB7XG5cdHJldHVybiBwbHVyYWxNb2RlbE5hbWUoIGNhbWVsQ2FzZSggbGFzdCggcmVzb3VyY2VMaW5rLnNwbGl0KCAnLycgKSApICkgKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHBsYWluIG9iamVjdCBjb250YWluaW5nIHRoZSBlbnRpdHkgZmllbGQgbmFtZXMgYW5kIHZhbHVlcyBmcm9tIHRoZVxuICogcHJvdmlkZWQgZW50aXR5IGluc3RhbmNlLiAgVGhlIHZhbHVlcyBhcmUgbm90IHByZXBhcmVkIGFuZCBtYXRjaCBleGFjdGx5IHdoYXRcbiAqIGlzIGN1cnJlbnRseSBzZXQgb24gdGhpcyBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHtCYXNlRW50aXR5fSBlbnRpdHlJbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBBIHBsYWluIG9iamVjdFxuICovXG5leHBvcnQgY29uc3QgZ2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvckNsb25pbmcgPSAoIGVudGl0eUluc3RhbmNlICkgPT4ge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMoIGVudGl0eUluc3RhbmNlICkucmVkdWNlKCAoXG5cdFx0ZmllbGRzQW5kVmFsdWVzLFxuXHRcdGZpZWxkTmFtZVxuXHQpID0+IHtcblx0XHRpZiAoXG5cdFx0XHRpc0VudGl0eUZpZWxkKCBmaWVsZE5hbWUsIGVudGl0eUluc3RhbmNlLnNjaGVtYSApICYmXG5cdFx0XHQhIGlzUHJpbWFyeUtleUZpZWxkKCBmaWVsZE5hbWUsIGVudGl0eUluc3RhbmNlLnNjaGVtYSApXG5cdFx0KSB7XG5cdFx0XHRmaWVsZHNBbmRWYWx1ZXNbIGZpZWxkTmFtZSBdID0gZW50aXR5SW5zdGFuY2VbIGZpZWxkTmFtZSBdO1xuXHRcdFx0cmV0dXJuIGZpZWxkc0FuZFZhbHVlcztcblx0XHR9XG5cdFx0cmV0dXJuIGZpZWxkc0FuZFZhbHVlcztcblx0fSwge30gKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHBsYWluIG9iamVjdCBjb250YWluaW5nIHRoZSBlbnRpdHkgZmllbGQgbmFtZSBhbmQgdmFsdWVzIGZyb20gdGhlXG4gKiBwcm92aWRlZCBlbnRpdHkgaW5zdGFuY2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbnRpdHlJbnN0YW5jZVxuICogQHBhcmFtIHtib29sZWFufSBmb3JJbnNlcnQgIFdoZXRoZXIgdG8gcmV0dXJuIHRoZSBmaWVsZHMgYW5kIHZhbHVlcyBmb3JcbiAqIGluc2VydCBvciBmb3IgdXBkYXRlLlxuICogQHJldHVybiB7T2JqZWN0fSBBIHBsYWluIG9iamVjdFxuICovXG5leHBvcnQgY29uc3QgZ2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvclBlcnNpc3RpbmcgPSAoXG5cdGVudGl0eUluc3RhbmNlLFxuXHRmb3JJbnNlcnQgPSBmYWxzZVxuKSA9PiB7XG5cdGNvbnN0IGl0ZXJhdG9yID0gZm9ySW5zZXJ0ID9cblx0XHRBcnJheS5mcm9tKCBlbnRpdHlJbnN0YW5jZS5maWVsZHNUb1BlcnNpc3RPbkluc2VydC52YWx1ZXMoKSApIDpcblx0XHRPYmplY3Qua2V5cyggZW50aXR5SW5zdGFuY2UgKTtcblxuXHRyZXR1cm4gaXRlcmF0b3IucmVkdWNlKCAoXG5cdFx0ZmllbGRzQW5kVmFsdWVzLFxuXHRcdGZpZWxkTmFtZVxuXHQpID0+IHtcblx0XHRpZiAoXG5cdFx0XHRpc0VudGl0eUZpZWxkKCBmaWVsZE5hbWUsIGVudGl0eUluc3RhbmNlLnNjaGVtYSApICYmXG5cdFx0XHQhIGlzUHJpbWFyeUtleUZpZWxkKCBmaWVsZE5hbWUsIGVudGl0eUluc3RhbmNlLnNjaGVtYSApXG5cdFx0KSB7XG5cdFx0XHRmaWVsZHNBbmRWYWx1ZXNbIGZpZWxkTmFtZSBdID0gbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0KFxuXHRcdFx0XHRlbnRpdHlJbnN0YW5jZVsgZmllbGROYW1lIF0sXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIGZpZWxkc0FuZFZhbHVlcztcblx0XHR9XG5cdFx0cmV0dXJuIGZpZWxkc0FuZFZhbHVlcztcblx0fSwge30gKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcHJpbWFyeSBrZXkocykgYW5kIHZhbHVlcyBmb3IgdGhlIGdpdmVuIGVudGl0eUluc3RhbmNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVudGl0eUluc3RhbmNlXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFuIGFycmF5IG9mIHZhbHVlcyBmb3IgdGhlIHByaW1hcnkga2V5cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFByaW1hcnlLZXlWYWx1ZXMgPSAoIGVudGl0eUluc3RhbmNlICkgPT4gcGljayhcblx0ZW50aXR5SW5zdGFuY2UsXG5cdGVudGl0eUluc3RhbmNlLnByaW1hcnlLZXlzXG4pO1xuXG4vKipcbiAqIFRoaXMgcmV0dXJucyBhIHBsYWluIG9iamVjdCBvZiBlbnRpdHkgZmllbGRzIGZyb20gdGhlIHNjaGVtYSBmb3IgdGhlIGVudGl0eVxuICogaW5zdGFuY2UgKHNjaGVtYSBmb3IgZmllbGRzIGFyZSBleHRyYWN0ZWQgYXMgd2VsbCkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVudGl0eUluc3RhbmNlXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgcGxhaW4gb2JqZWN0IHdpdGggZmllbGRzIGFuZCBzY2hlbWEgcHJvcGVydGllcyB0aGF0IGFyZVxuICogZW50aXR5IHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRFbnRpdHlGaWVsZHNGcm9tU2NoZW1hID0gKCBlbnRpdHlJbnN0YW5jZSApID0+IHBpY2tCeShcblx0ZW50aXR5SW5zdGFuY2Uuc2NoZW1hLFxuXHQoIGZpZWxkVmFsdWUsIGZpZWxkTmFtZSApID0+IGlzRW50aXR5RmllbGQoXG5cdFx0ZmllbGROYW1lLFxuXHRcdGVudGl0eUluc3RhbmNlLnNjaGVtYVxuXHQpXG4pO1xuXG4vKipcbiAqIFRoaXMgcmV0dXJucyBhIHBsYWluIG9iamVjdCBvZiBleHRyYWN0ZWQgcHJpbWFyeUtleSBmaWVsZHMgZnJvbSB0aGUgc2NoZW1hXG4gKiBmb3IgdGhlIGVudGl0eSBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZW50aXR5SW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gQSBwbGFpbiBvYmplY3Qgd2l0aCBmaWVsZHMgYW5kIHNjaGVtYSBwcm9wZXJ0aWVzIHRoYXRcbiAqIFx0XHRcdFx0XHRyZXByZXNlbnQgcHJpbWFyeSBrZXkgZmllbGRzLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UHJpbWFyeUtleUZpZWxkc0Zyb21TY2hlbWEgPSAoIGVudGl0eUluc3RhbmNlICkgPT4gcGlja0J5KFxuXHRlbnRpdHlJbnN0YW5jZS5zY2hlbWEsXG5cdCggZmllbGRWYWx1ZSwgZmllbGROYW1lICkgPT4gaXNQcmltYXJ5S2V5RmllbGQoXG5cdFx0ZmllbGROYW1lLFxuXHRcdGVudGl0eUluc3RhbmNlLnNjaGVtYVxuXHQpXG4pO1xuXG4vKipcbiAqIERlcml2ZXMgdGhlIGRlZmF1bHQgdmFsdWUgdG8gdXNlIGZvciBhIGdpdmVuIHR5cGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEByZXR1cm4geyp9ICBBIHZhbHVlIHRvIHVzZSBmb3IgdGhlIGdpdmVuIHR5cGUuXG4gKi9cbmV4cG9ydCBjb25zdCBkZXJpdmVEZWZhdWx0VmFsdWVGb3JUeXBlID0gKCB0eXBlICkgPT4ge1xuXHRpZiAoIGlzQXJyYXkoIHR5cGUgKSApIHtcblx0XHRyZXR1cm4gdHlwZS5pbmRleE9mKCAnbnVsbCcgKSA+IC0xID9cblx0XHRcdG51bGwgOlxuXHRcdFx0ZGVyaXZlRGVmYXVsdFZhbHVlRm9yVHlwZSggdHlwZVsgMCBdICk7XG5cdH1cblx0c3dpdGNoICggdHlwZSApIHtcblx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0cmV0dXJuICcnO1xuXHRcdGNhc2UgJ251bWJlcic6XG5cdFx0Y2FzZSAnaW50ZWdlcic6XG5cdFx0XHRyZXR1cm4gMDtcblx0XHRjYXNlICdudWxsJzpcblx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0Y2FzZSAnYm9vbGVhbic6XG5cdFx0Y2FzZSAnYm9vbCc6XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0Y2FzZSAnZGF0ZS10aW1lJzpcblx0XHRcdHJldHVybiAoIG5ldyBEYXRlKCkgKS50b0lTT1N0cmluZygpO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBEZXJpdmVzIHdoYXQgYHR5cGVgIGEgZmllbGQgaXMgZnJvbSB0aGUgc2NoZW1hLlxuICogSXQgYWNjb3VudHMgZm9yIGNhc2VzIHdoZXJlIHRoZSBcInR5cGVcIiBvZiBhIGZpZWxkIG1pZ2h0IGJlIGBkYXRlLXRpbWVgIG9yXG4gKiB3aGVyZSB0aGUgdHlwZSBpcyBhbiBvYmplY3QgYW5kIHRodXMgdGhlIGB0eXBlYCBmb3IgdGhlIHB1cnBvc2VzIG9mIG1vZGVsXG4gKiBlbnRpdGllcyBpcyBkZWZpbmVkIGJ5IHRoZSBgcmF3YCBwcm9wZXJ0eSBmb3IgdGhlIGZpZWxkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4geyp9ICBXaGF0IHR5cGUgdGhlIGZpbGVkIGlzLlxuICovXG5leHBvcnQgY29uc3QgZGVyaXZlVHlwZUZvckZpZWxkID0gKCBmaWVsZE5hbWUsIHNjaGVtYSApID0+IHtcblx0aWYgKCBpc0RhdGVUaW1lRmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgKSB7XG5cdFx0cmV0dXJuICdkYXRlLXRpbWUnO1xuXHR9XG5cdGlmICggc2NoZW1hWyBmaWVsZE5hbWUgXSAmJiBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUgKSB7XG5cdFx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUgPT09ICdvYmplY3QnICkge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMgJiZcblx0XHRcdFx0aGFzUmF3UHJvcGVydHkoIHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcyApXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuIHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcudHlwZSA/XG5cdFx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy50eXBlIDpcblx0XHRcdFx0XHRudWxsO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdHJldHVybiBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGU7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIFRoaXMgZGVyaXZlcyB0aGUgdmFsaWRhdGUgdHlwZSBmcm9tIHRoZSBpbmNvbWluZyBmaWVsZCBhbmQgdmFsdWUgYWNjb3JkaW5nXG4gKiB0byB0aGUgc2NoZW1hIGFuZCBpbmNvbWluZyB2YWx1ZS5cbiAqXG4gKiBUaGlzIGFjY291bnRzIGZvciB0aGUgZmFjdCB0aGF0IGVudGl0aWVzIG1heSBiZSBjb25zdHJ1Y3RlZCBmcm9tIHRoZVxuICogZm9sbG93aW5nIGNvbnRleHRzOlxuICpcbiAqIDEuIEF1dGhlZCBSRVNUIHJlc3BvbnNlICh3aGljaCBjb3VsZCBoYXZlIGJvdGggcmF3LCByZW5kZXJlZCBvciBwcmV0dHlcbiAqICAgIHZhbHVlcyBpbiB0aGUgZmllbGQgdmFsdWUpLlxuICogMi4gTm9uLWF1dGhlZCBSRVNUIHJlc3BvbnNlICh3aGljaCB3aWxsIG5vdCBoYXZlIGEgcmF3IHZhbHVlLCBidXQgY291bGQgaGF2ZVxuICogICAgYSBwcmV0dHkgb3IgcmVuZGVyZWQgdmFsdWUpLiAgVGhpcyBpcyBwb3RlbnRpYWxseSBwcm9ibGVtYXRpYyBpZiB0aGVcbiAqICAgIHJlbmRlcmVkIG9yIHByZXR0eSB2YWx1ZSBpcyBvZiBhIGRpZmZlcmVudCBkYXRhIHR5cGUgdGhhbiB0aGUgcmF3IHZhbHVlLlxuICogMy4gTmV3IGVudGl0aWVzIGJ1aWx0IGNsaWVudCBzaWRlLCB3aGljaCB3aWxsIGJlIGFzc3VtZWQgdG8gYmUgcHJlcGFyZWRcbiAqICAgIGFnYWluc3QgdGhlIFwicmF3XCIgdmFsaWRhdGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge1N5bWJvbH0gIFRoZSB2YWxpZGF0ZSB0eXBlIGZvciB0aGUgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBkZXJpdmVWYWxpZGF0ZVR5cGVGb3JGaWVsZCA9ICggZmllbGROYW1lLCBmaWVsZFZhbHVlLCBzY2hlbWEgKSA9PiB7XG5cdGlmICggaGFzUmF3UHJvcGVydHkoIGZpZWxkVmFsdWUgKSApIHtcblx0XHRyZXR1cm4gVkFMSURBVEVfVFlQRS5SQVc7XG5cdH1cblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdICYmIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSApIHtcblx0XHRpZiAoXG5cdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUgPT09ICdvYmplY3QnICYmXG5cdFx0XHRpc1BsYWluT2JqZWN0KCBmaWVsZFZhbHVlIClcblx0XHQpIHtcblx0XHRcdHJldHVybiBoYXNSZW5kZXJlZFByb3BlcnR5KCBmaWVsZFZhbHVlICkgP1xuXHRcdFx0XHRWQUxJREFURV9UWVBFLlJFTkRFUkVEIDpcblx0XHRcdFx0VkFMSURBVEVfVFlQRS5QUkVUVFk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBWQUxJREFURV9UWVBFLlJBVztcbn07XG5cbi8qKlxuICogVGhpcyBnZXRzIHRoZSBkZWZhdWx0IHZhbHVlIGZvciBhIGZpZWxkIGZyb20gdGhlIHByb3ZpZGVkIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHsqfSBUaGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlIGZpZWxkIGZyb20gdGhlIHNjaGVtYSBvciBpZiBub3RcbiAqIHByZXNlbnQgaW4gdGhlIHNjaGVtYSwgYSBkZXJpdmVkIGRlZmF1bHQgdmFsdWUgZnJvbSB0aGUgc2NoZW1hIHR5cGUuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXREZWZhdWx0VmFsdWVGb3JGaWVsZCA9ICggZmllbGROYW1lLCBzY2hlbWEgKSA9PiB7XG5cdGlmICggc2NoZW1hWyBmaWVsZE5hbWUgXSApIHtcblx0XHRyZXR1cm4gc2NoZW1hWyBmaWVsZE5hbWUgXS5kZWZhdWx0ID9cblx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0uZGVmYXVsdCA6XG5cdFx0XHRkZXJpdmVEZWZhdWx0VmFsdWVGb3JUeXBlKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUgKTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG4iLCJleHBvcnQgeyBCYXNlRW50aXR5LCBkZWZhdWx0IGFzIGNyZWF0ZUVudGl0eUZhY3RvcnkgfSBmcm9tICcuL2Jhc2UtZW50aXR5JztcbmV4cG9ydCB7IE1PREVMX1BSRUZJWEVTLCBTQVZFX1NUQVRFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGlzQXJyYXksXG5cdGlzSW50ZWdlcixcblx0aXNTdHJpbmcsXG5cdGlzUGxhaW5PYmplY3QsXG5cdGlzQm9vbGVhbixcblx0aXNOdW1iZXIsXG59IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBzcHJpbnRmIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5cbi8qKlxuICogSW50ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0VudW1GaWVsZCwgaXNQcmltYXJ5S2V5RmllbGQsIGlzVmFsdWVPYmplY3RGaWVsZCB9IGZyb20gJy4vYm9vbGVhbnMnO1xuaW1wb3J0IHsgbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMgfSBmcm9tICcuL2V4dHJhY3RvcnMnO1xuaW1wb3J0IHsgUFJJVkFURV9QUk9QRVJUSUVTLCBWQUxJREFURV9UWVBFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGUgaW5jb21pbmcgdmFsdWUgZm9yIGdpdmVuIHR5cGUuICBUeXBlcyBhbGxvd2VkIGFyZTpcbiAqXG4gKiAtIGludGVnZXI6IGNoZWNrcyBpZiB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogLSBudW1iZXI6IGNoZWNrcyBpZiB2YWx1ZSBpcyBjbGFzc2lmaWVkIGFzIGEgTnVtYmVyIHByaW1pdGl2ZSBvciBvYmplY3QgKHRoaXNcbiAqICAgbWVhbnMgYEluZmluaXR5YCwgYC1JbmZpbml0eWAsIGFuZCBgTmFOYCBhcmUgY29uc2lkZXJlZCB2YWxpZCBmb3IgdGhpcyB0eXBlXG4gKiAtIHN0cmluZ1xuICogLSBvYmplY3QgLSB0aGlzIHZhbGlkYXRlcyBhcyBhIFwicGxhaW5PYmplY3RcIiwgdGhhdCBpcyBhbiBvYmplY3QgY3JlYXRlZCBieVxuICogICB0aGUgT2JqZWN0IGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgW1tQcm90b3R5cGVdXSBvZiBudWxsLlxuICogLSBib29sZWFuXG4gKiAtIGJvb2w6IChzYW1lIGFzIGJvb2xlYW4gY2hlY2spXG4gKiAtIG51bGw6IHZhbHVlIG11c3QgZXhwbGljaXRseSBiZSBgbnVsbGBcbiAqXG4gKiBOb3RlOiBpZiB0aGUgcGFzc2VkIGluIHR5cGUgZG9lcyBub3QgZXhpc3QsIHRoZW4gdGhlIHZhbHVlIGlzIGNvbnNpZGVyZWRcbiAqIGludmFsaWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IHR5cGUgIFRoZSB0eXBlIG9yIHR5cGVzIHRvIGNoZWNrXG4gKiBAcGFyYW0geyp9IHZhbHVlICBUaGUgdmFsdWUgYmVpbmcgdmFsaWRhdGVkXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGUgdmFsdWUgaXMgdmFsaWQgZm9yIHRoZSBnaXZlbiB0eXBlLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVUeXBlID0gKCB0eXBlLCB2YWx1ZSApID0+IHtcblx0bGV0IHZhbGlkID0gZmFsc2U7XG5cdC8vIGFjY291bnQgZm9yIHR5cGUgZGVmaW5pdGlvbnMgdGhhdCBhcmUgYW4gYXJyYXkgb2YgYWxsb3dlZCB0eXBlcy5cblx0aWYgKCBpc0FycmF5KCB0eXBlICkgKSB7XG5cdFx0Zm9yICggY29uc3Qgc2luZ2xlVHlwZSBvZiB0eXBlICkge1xuXHRcdFx0dmFsaWQgPSB2YWxpZGF0ZVR5cGUoIHNpbmdsZVR5cGUsIHZhbHVlICk7XG5cdFx0XHRpZiAoIHZhbGlkICkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gcmV0dXJuIHJpZ2h0IGF3YXkgYmVjYXVzZSB3ZSd2ZSBkZXRlcm1pbmVkIHRoZSB2YWxpZGl0eSBvZiB0aGUgdHlwZS5cblx0XHRyZXR1cm4gdmFsaWQ7XG5cdH1cblx0c3dpdGNoICggdHlwZSApIHtcblx0XHRjYXNlICdpbnRlZ2VyJzpcblx0XHRcdHZhbGlkID0gaXNJbnRlZ2VyKCB2YWx1ZSApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnbnVtYmVyJzpcblx0XHRcdHZhbGlkID0gaXNOdW1iZXIoIHZhbHVlICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0dmFsaWQgPSBpc1N0cmluZyggdmFsdWUgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHR2YWxpZCA9IGlzUGxhaW5PYmplY3QoIHZhbHVlICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdib29sZWFuJzpcblx0XHRjYXNlICdib29sJzpcblx0XHRcdHZhbGlkID0gaXNCb29sZWFuKCB2YWx1ZSApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnbnVsbCc6XG5cdFx0XHR2YWxpZCA9IHZhbHVlID09PSBudWxsO1xuXHRcdFx0YnJlYWs7XG5cdH1cblx0cmV0dXJuIHZhbGlkO1xufTtcblxuLyoqXG4gKiBUaGlzIHZhbGlkYXRlcyBlbnVtIHR5cGUgb2YgdmFsdWVzLlxuICpcbiAqIFRoaXMgbWVhbnMgdGhhdCB0aGUgdmFsdWUgbXVzdCBiZSBvbmUgb2YgdGhlIHByb3ZpZGVkIGFycmF5IG9mIGVudW1WYWx1ZXMgYXNcbiAqIHdlbGwgYXMgYmVpbmcgb2YgdGhlIGV4cGVjdGVkIHR5cGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7QXJyYXl9IGVudW1WYWx1ZXNcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoaXMgdmFsdWUgaXMgdmFsaWQuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVudW1UeXBlID0gKCB0eXBlLCBlbnVtVmFsdWVzLCB2YWx1ZSApID0+IHtcblx0cmV0dXJuIHZhbGlkYXRlVHlwZSggdHlwZSwgdmFsdWUgKSAmJlxuXHRcdGlzQXJyYXkoIGVudW1WYWx1ZXMgKSAmJlxuXHRcdGVudW1WYWx1ZXMuaW5kZXhPZiggdmFsdWUgKSA+IC0xO1xufTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBkb2VzIGEgc2hhbGxvdyB2YWxpZGF0aW9uIGZvciB0aGUgZ2l2ZW4gdmFsdWUgYW5kIGZpZWxkLlxuICpcbiAqIFwiU2hhbGxvd1wiIGhlcmUgbWVhbnMgdGhhdCBpZiB0aGUgZmllbGQgc2NoZW1hIGlzIG9mIHR5cGUgJ29iamVjdCcsIHRoZW4gdGhlXG4gKiB2YWxpZGF0aW9uIG9ubHkgdmVyaWZpZXMgdGhhdCB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LiAgVGhlIG9iamVjdCBjb250ZW50c1xuICogYXJlIG5vdCB2YWxpZGF0ZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGV4cGVjdFZhbHVlT2JqZWN0cyAgSWYgdHJ1ZSwgdGhlbiB0aGlzIGZsYWdzIHRoZSB2YWxpZGF0b3JcbiAqIHRvIGFzc3VtZSB0aGUgdmFsdWUgbWlnaHQgYmUgYSB2YWx1ZSBvYmplY3QgYW5kIGF0dGVtcHQgdG8gcmV0cmlldmUgdGhlIHJhd1xuICogdmFsdWUgZnJvbSB0aGF0IHZhbHVlIG9iamVjdCBmb3IgdmFsaWRhdGlvbiBhZ2FpbnN0IHRoZSBleHBlY3RlZCB0eXBlIGluIHRoZVxuICogc2NoZW1hIGZvciB0aGF0IGZpZWxkLlxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhlIHZhbHVlIGlzIHZhbGlkLlxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqIEB0aHJvd3MgSW52YWxpZERhdGVUaW1lXG4gKi9cbmV4cG9ydCBjb25zdCBpc1NoYWxsb3dWYWxpZFZhbHVlRm9yRmllbGQgPSAoXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0c2NoZW1hLFxuXHRleHBlY3RWYWx1ZU9iamVjdHMgPSB0cnVlXG4pID0+IHtcblx0Ly8gaWYgZmllbGQgaXMgYSBwcmltYXJ5IEtleSBmaWVsZCB0aGVuIHdlIG92ZXJyaWRlIHRoZSB2YWxpZGF0aW9uIHNvIGl0IGNhblxuXHQvLyBiZSBlaXRoZXIgc3RyaW5nIG9yIG51bWJlclxuXHRpZiAoIGlzUHJpbWFyeUtleUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApICkge1xuXHRcdHJldHVybiB2YWxpZGF0ZVR5cGUoICdzdHJpbmcnLCBmaWVsZFZhbHVlICkgfHxcblx0XHRcdHZhbGlkYXRlVHlwZSggJ251bWJlcicsIGZpZWxkVmFsdWUgKTtcblx0fVxuXHRjb25zdCBpc0VudW0gPSBpc0VudW1GaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKTtcblx0Y29uc3QgaXNWYWx1ZU9iamVjdCA9IGlzVmFsdWVPYmplY3RGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKTtcblx0ZmllbGRWYWx1ZSA9IGV4cGVjdFZhbHVlT2JqZWN0cyAmJiBpc1ZhbHVlT2JqZWN0ID9cblx0XHRtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3RXaXRoQXNzZXJ0aW9ucyhcblx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRzY2hlbWFcblx0XHQpIDpcblx0XHRmaWVsZFZhbHVlO1xuXHRmaWVsZFZhbHVlID0gZXhwZWN0VmFsdWVPYmplY3RzICYmXG5cdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUgPT09ICdvYmplY3QnICYmXG5cdFx0XHRpc1ZhbHVlT2JqZWN0ID9cblx0XHR7IHJhdzogZmllbGRWYWx1ZSB9IDpcblx0XHRmaWVsZFZhbHVlO1xuXHRjb25zdCBpc1ZhbGlkID0gaXNFbnVtID9cblx0XHR2YWxpZGF0ZUVudW1UeXBlKFxuXHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlLFxuXHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5lbnVtLFxuXHRcdFx0ZmllbGRWYWx1ZVxuXHRcdCkgOlxuXHRcdHZhbGlkYXRlVHlwZSggc2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlLCBmaWVsZFZhbHVlICk7XG5cdC8vIGlmIGlzRW51bSBhbmQgbm90IHZhbGlkLCB0aGVuIGxldHMgYmFpbCB3aXRoIGVycm9yXG5cdGlmICggaXNFbnVtICYmICEgaXNWYWxpZCApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0c3ByaW50Zihcblx0XHRcdFx0J1RoZSBnaXZlbiBcIiVzXCIgZmllbGROYW1lIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hLiAgSXQgbXVzdCBiZSBhIFwiJXNcIiBhbmQgaXQgbXVzdCBiZSBvbmUgb2YgXCIlc1wiLiBUaGUgZmllbGRWYWx1ZSBnaXZlbiB3YXMgXCIlc1wiJyxcblx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLmVudW0uam9pbigpLFxuXHRcdFx0XHRmaWVsZFZhbHVlXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gaXNWYWxpZDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGF0IGlzIHNldCBhcyB0aGUgdmFsaWRhdGVUeXBlIGZvciB0aGUgZ2l2ZW4gZmllbGQgYW5kIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgdmFsaWRhdGlvbiB0eXBlIGZvciB0aGUgZ2l2ZW4gZmllbGQgYW5kIGluc3RhbmNlLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVUeXBlRm9yRmllbGQgPSAoIGZpZWxkTmFtZSwgaW5zdGFuY2UgKSA9PiB7XG5cdHJldHVybiBpbnN0YW5jZVsgUFJJVkFURV9QUk9QRVJUSUVTLlZBTElEQVRFX1RZUEVTIF1bIGZpZWxkTmFtZSBdID9cblx0XHRpbnN0YW5jZVsgUFJJVkFURV9QUk9QRVJUSUVTLlZBTElEQVRFX1RZUEVTIF1bIGZpZWxkTmFtZSBdIDpcblx0XHRWQUxJREFURV9UWVBFLlJBVztcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAnZXZlbnQnO1xuXG5leHBvcnQgY29uc3QgRVZFTlRfU1RBVFVTX0lEID0ge1xuXHRTT0xEX09VVDogJ3NvbGRfb3V0Jyxcblx0UE9TVFBPTkVEOiAncG9zdHBvbmVkJyxcblx0Q0FOQ0VMTEVEOiAnY2FuY2VsbGVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9TVEFUVVNfSURTID0gdmFsdWVzKCBFVkVOVF9TVEFUVVNfSUQgKTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfREVTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG5cdEdSRUFURVJfVEhBTixcblx0R1JFQVRFUl9USEFOX0FORF9FUVVBTCxcblx0TEVTU19USEFOX0FORF9FUVVBTCxcbn0gZnJvbSAnLi4vYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBub3dEYXRlQW5kVGltZSA9IG1vbWVudCgpO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0XHQnRVZUX25hbWUnLFxuXHRcdFx0J0VWVF9JRCcsXG5cdFx0XHQnc3RhcnRfZGF0ZScsXG5cdFx0XHQnZW5kX2RhdGUnLFxuXHRcdFx0J3RpY2tldF9zdGFydCcsXG5cdFx0XHQndGlja2V0X2VuZCcsXG5cdFx0XSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdFx0c2hvd0V4cGlyZWQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdGNhdGVnb3J5U2x1ZzogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRtb250aDogUHJvcFR5cGVzLm1vbnRoLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0XHRzaG93RXhwaXJlZDogYm9vbGVhblxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDEwMCxcblx0XHRvcmRlckJ5OiAnc3RhcnRfZGF0ZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdFx0c2hvd0V4cGlyZWQ6IGZhbHNlLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGFuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHRzdGFydF9kYXRlOiAnRGF0ZXRpbWUuRFRUX0VWVF9zdGFydCcsXG5cdFx0ZW5kX2RhdGU6ICdEYXRldGltZS5EVFRfRVZUX2VuZCcsXG5cdFx0dGlja2V0X3N0YXJ0OiAnRGF0ZXRpbWUuVGlja2V0LlRLVF9zdGFydF9kYXRlJyxcblx0XHR0aWNrZXRfZW5kOiAnRGF0ZXRpbWUuVGlja2V0LlRLVF9lbmRfZGF0ZScsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIGV2ZW50cyBlbmRwb2ludCByZXF1ZXN0IHVzaW5nIHByb3ZpZGVkXG4gKiBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3dFeHBpcmVkICBXaGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIGV4cGlyZWQgZXZlbnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IGNhdGVnb3J5U2x1ZyAgUmV0dXJuIGV2ZW50cyBmb3IgdGhlIGdpdmVuIGNhdGVnb3J5U2x1Z1xuICogQHBhcmFtIHtzdHJpbmd9IG1vbnRoICAgICAgICAgUmV0dXJuIGV2ZW50cyBmb3IgdGhlIGdpdmVuIG1vbnRoLlxuICogXHRcdFx0XHRcdFx0XHRcdCBDYW4gYmUgYW55IG1vbnRoIGZvcm1hdCByZWNvZ25pemVkIGJ5IG1vbWVudC5cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgIFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICgge1xuXHRzaG93RXhwaXJlZCA9IGZhbHNlLFxuXHRjYXRlZ29yeVNsdWcsXG5cdG1vbnRoID0gJ25vbmUnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblxuXHRpZiAoICEgc2hvd0V4cGlyZWQgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEYXRldGltZS5EVFRfRVZUX2VuZCoqZXhwaXJlZF1bXT0nICsgR1JFQVRFUl9USEFOICtcblx0XHRcdCcmd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9lbmQqKmV4cGlyZWRdW109JyArXG5cdFx0XHRub3dEYXRlQW5kVGltZS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRpZiAoIGNhdGVnb3J5U2x1ZyApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW1Rlcm1fUmVsYXRpb25zaGlwLlRlcm1fVGF4b25vbXkuVGVybS5zbHVnXT0nICsgY2F0ZWdvcnlTbHVnXG5cdFx0KTtcblx0fVxuXHRpZiAoIG1vbnRoICYmIG1vbnRoICE9PSAnbm9uZScgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEYXRldGltZS5EVFRfRVZUX3N0YXJ0XVtdPScgKyBHUkVBVEVSX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9zdGFydF1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLnN0YXJ0T2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RhdGV0aW1lLkRUVF9FVlRfZW5kXVtdPScgKyBMRVNTX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9lbmRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5lbmRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwiZXhwb3J0ICogZnJvbSAnLi9hc3NlcnRpb25zJztcbmV4cG9ydCAqIGZyb20gJy4vYmFzZSc7XG5leHBvcnQgKiBmcm9tICcuL2RlZmF1bHQtbW9kZWwtc3RhdGUnO1xuZXhwb3J0ICogZnJvbSAnLi9lbmRwb2ludHMnO1xuZXhwb3J0ICogZnJvbSAnLi9lbnRpdHktZmFjdG9yeSc7XG5leHBvcnQgKiBmcm9tICcuL3ByaW1hcnkta2V5cyc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVsLW5hbWVzJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzJztcbiIsIi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBwcmltYXJ5S2V5cyB9IGZyb20gJy4vcHJpbWFyeS1rZXlzLmpzJztcblxuLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGtleXMsIHN0YXJ0Q2FzZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcGx1cmFsaXplIGZyb20gJ3BsdXJhbGl6ZSc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdtZW1pemUnO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgbW9kZWwgbmFtZXMgY3VycmVudGx5IGV4cG9zZWQgZm9yIFJFU1QgQVBJIHJlcXVlc3QuXG4gKi9cbmV4cG9ydCBjb25zdCBNT0RFTF9OQU1FUyA9IGtleXMoIHByaW1hcnlLZXlzICk7XG5cbi8qKlxuICogVXNlZCB0byBub3JtYWxpemUgdGhlIHBsdXJhbCBmb3JtIG9mIGEgZ2l2ZW4gbW9kZWwgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICBFbnN1cmVzIHRoZSBnaXZlbiBtb2RlbE5hbWUgaXMgaXRzIHBsdXJhbCBmb3JtLlxuICovXG5leHBvcnQgY29uc3QgcGx1cmFsTW9kZWxOYW1lID0gbWVtb2l6ZShcblx0KCBtb2RlbE5hbWUgKSA9PiBwbHVyYWxpemUoIG1vZGVsTmFtZSApLnRvTG93ZXJDYXNlKClcbik7XG5cbi8qKlxuICogVXNlZCB0byBub3JtYWxpemUgdGhlIHNpbmd1bGFyIGZvcm0gb2YgYSBnaXZlbiBtb2RlbCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge3N0cmluZ30gRW5zdXJlcyB0aGUgZ2l2ZW4gbW9kZWxOYW1lIGlzIGluIGl0cyBzaW5ndWxhciBmb3JtLlxuICovXG5leHBvcnQgY29uc3Qgc2luZ3VsYXJNb2RlbE5hbWUgPSBtZW1vaXplKFxuXHQoIG1vZGVsTmFtZSApID0+IHBsdXJhbGl6ZS5zaW5ndWxhciggbW9kZWxOYW1lICkudG9Mb3dlckNhc2UoKVxuKTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgY2FwaXRhbGl6ZWQgU25ha2VfQ2FzZSBmb3JtYXQgZm9yIHRoZSBnaXZlbiBtb2RlbCBuYW1lXG4gKiB0eXBpY2FsbHkgdXNlZCBpbiBxdWVyeSBzdHJpbmdzLlxuICpcbiAqIEV4YW1wbGU6XG4gKiBtb2RlbE5hbWVGb3JRdWVyeVN0cmluZyggJ21lc3NhZ2VfdGVtcGxhdGVfZ3JvdXAnICk7XG4gKiAvLyBNZXNzYWdlX1RlbXBsYXRlX0dyb3VwXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgZm9ybWF0dGVkIHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IG1vZGVsTmFtZUZvclF1ZXJ5U3RyaW5nID0gbWVtb2l6ZShcblx0KCBtb2RlbE5hbWUgKSA9PiB7XG5cdFx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRcdG1vZGVsTmFtZSA9IHN0YXJ0Q2FzZSggbW9kZWxOYW1lICk7XG5cdFx0cmV0dXJuIG1vZGVsTmFtZS5yZXBsYWNlKCAvXFxzL2csICdfJyApO1xuXHR9XG4pO1xuIiwiaW1wb3J0ICogYXMgYXR0ZW5kZWVNb2RlbCBmcm9tICcuL2F0dGVuZGVlJztcbmltcG9ydCAqIGFzIGNoZWNrSW5Nb2RlbCBmcm9tICcuL2NoZWNraW4nO1xuaW1wb3J0ICogYXMgZGF0ZVRpbWVNb2RlbCBmcm9tICcuL2RhdGV0aW1lJztcbmltcG9ydCAqIGFzIGV2ZW50TW9kZWwgZnJvbSAnLi9ldmVudCc7XG5pbXBvcnQgKiBhcyBwcmljZVR5cGVNb2RlbCBmcm9tICcuL3ByaWNlLXR5cGUnO1xuaW1wb3J0ICogYXMgcmVnaXN0cmF0aW9uTW9kZWwgZnJvbSAnLi9yZWdpc3RyYXRpb24nO1xuaW1wb3J0ICogYXMgc3RhdHVzTW9kZWwgZnJvbSAnLi9zdGF0dXMnO1xuaW1wb3J0ICogYXMgdGlja2V0TW9kZWwgZnJvbSAnLi90aWNrZXQnO1xuZXhwb3J0IHtcblx0YXR0ZW5kZWVNb2RlbCxcblx0Y2hlY2tJbk1vZGVsLFxuXHRkYXRlVGltZU1vZGVsLFxuXHRldmVudE1vZGVsLFxuXHRwcmljZVR5cGVNb2RlbCxcblx0cmVnaXN0cmF0aW9uTW9kZWwsXG5cdHN0YXR1c01vZGVsLFxuXHR0aWNrZXRNb2RlbCxcbn07XG4iLCJcbmV4cG9ydCBjb25zdCBNT0RFTF9OQU1FID0gJ3ByaWNlX3R5cGUnO1xuXG5leHBvcnQgY29uc3QgQkFTRV9QUklDRV9UWVBFUyA9IHtcblx0QkFTRV9QUklDRTogMSxcblx0RElTQ09VTlQ6IDIsXG5cdFNVUkNIQVJHRTogMyxcblx0VEFYOiA0LFxufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNBcnJheSwgcmVkdWNlLCB0cmltRW5kIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ21lbWl6ZSc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRhc3NlcnRFbnRpdHlIYXNLZXksXG5cdGFzc2VydElzQXJyYXksXG5cdGFzc2VydElzTm90RW1wdHksXG5cdGFzc2VydElzTWFwLFxufSBmcm9tICcuL2Fzc2VydGlvbnMnO1xuXG4vKipcbiAqIEV4cG9zZXMgYSBtYXAgb2YgbW9kZWxuYW1lIHRvIHByaW1hcnkga2V5IGV4cG9zZWQgYnkgdGhlIGVlanMuZGF0YSBnbG9iYWxcbiAqIHZpYSB0aGUgc2VydmVyLlxuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0IGNvbnN0IHsgcHJpbWFyeV9rZXlzOiBwcmltYXJ5S2V5cyA9IHt9IH0gPSBkYXRhLnBhdGhzO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlcyBmb3IgdGhlIGdpdmVuIGtleXMgZnJvbSB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogVGhpcyBmdW5jdGlvbiB3b3VsZCBiZSB1c2VkIGZvciBtb2RlbHMgdGhhdCBoYXZlIGNvbWJpbmVkIHByaW1hcnkga2V5c1xuICogKGRlbGl2ZXJlZCBhcyBhbiBhcnJheSkuXG4gKlxuICogQHR5cGUgeyBtZW1vaXplZCB9XG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBmb3IgdGhlIHZhbHVlcy5cbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgdmFsdWVzRm9yQ29tYmluZWRQcmltYXJ5S2V5cyA9IG1lbW9pemUoICgga2V5cywgZW50aXR5ICkgPT4ge1xuXHRhc3NlcnRJc0FycmF5KCBrZXlzICk7XG5cdGNvbnN0IHByaW1hcnlLZXkgPSByZWR1Y2UoIGtleXMsIGZ1bmN0aW9uKCByZXN1bHQsIGtleSApIHtcblx0XHRhc3NlcnRFbnRpdHlIYXNLZXkoIGtleSwgZW50aXR5ICk7XG5cdFx0cmV0dXJuIGVudGl0eVsgcmVzdWx0IF0gKyAnOicgKyBlbnRpdHlbIGtleSBdO1xuXHR9ICk7XG5cdHJldHVybiB0cmltRW5kKCBwcmltYXJ5S2V5LCAnOicgKTtcbn0gKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBmb3IgdGhlIGdpdmVuIGtleSBmcm9tIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKiBUaGlzIGZ1bmN0aW9uIHdvdWxkIGJlIHVzZWQgZm9yIG1vZGVscyB0aGF0IGhhdmUgb25seSBvbmUgcHJpbWFyeSBrZXkuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7IGZ1bmN0aW9uIH0gVGhlIHZhbHVlIGZvciB0aGUga2V5IGluIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbHVlRm9yUHJpbWFyeUtleSA9IG1lbW9pemUoICgga2V5LCBlbnRpdHkgKSA9PiB7XG5cdGFzc2VydEVudGl0eUhhc0tleSgga2V5LCBlbnRpdHkgKTtcblx0cmV0dXJuIGVudGl0eVsga2V5IF07XG59ICk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcHJpbWFyeSBrZXkgKG9yIGNvbWJpbmVkIHByaW1hcnkga2V5cykgZnJvbSB0aGUgYXZhaWxhYmxlIGRhdGEuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7IGZ1bmN0aW9uKHN0cmluZykgfVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmltYXJ5S2V5ID0gbWVtb2l6ZSggKCBtb2RlbE5hbWUgKSA9PiB7XG5cdGFzc2VydEVudGl0eUhhc0tleSggbW9kZWxOYW1lLCBwcmltYXJ5S2V5cyApO1xuXHRyZXR1cm4gcHJpbWFyeUtleXNbIG1vZGVsTmFtZSBdO1xufSApO1xuXG4vKipcbiAqIFJldHVybnMgYSBxdWVyeSBzdHJpbmcgZm9yIGdldHRpbmcgdGhlIGVudGl0aWVzIGJlbG9uZ2luZyB0byBhIG1vZGVsIGZvciB0aGVcbiAqIGdpdmVuIHByaW1hcnkga2V5IHZhbHVlc1xuICpcbiAqIEB0eXBlIHttZW1vaXplZH1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFByaW1hcnlLZXlRdWVyeVN0cmluZyA9IG1lbW9pemUoXG5cdCggbW9kZWxOYW1lLCBrZXlWYWx1ZXMgPSBbXSApID0+IHtcblx0XHRjb25zdCBwcmltYXJ5S2V5ID0gZ2V0UHJpbWFyeUtleSggbW9kZWxOYW1lICk7XG5cdFx0cmV0dXJuIGBbJHsgcHJpbWFyeUtleSB9XVtJTl09YCArIGtleVZhbHVlcy5qb2luKCk7XG5cdH1cbik7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWVzIGZvciB0aGUgcHJpbWFyeSBrZXlzIGZyb20gdGhlIHByb3ZpZGVkIGVudGl0eS5cbiAqXG4gKiBAdHlwZSB7bWVtb2l6ZWR9XG4gKiBAcmV0dXJuIHsgZnVuY3Rpb24gfSAgSWYgdGhlIG1vZGVsIGhhcyBvbmx5IG9uZSBwcmltYXJ5IGtleSB0aGVuIHRoZSB2YWx1ZSB3aWxsXG4gKiBiZSBhIHNpbXBsZSBzdHJpbmcuICBJZiB0aGUgbW9kZWwgaGFzIGNvbWJpbmVkIHByaW1hcnkga2V5cywgdGhlbiB0aGUgdmFsdWVcbiAqIHdpbGwgYmUgYXMgc3RyaW5nIGluIHRoZSBmb3JtYXQgYCVzLiVzYCBmb3IgdGhlIHByaW1hcnkga2V5IHZhbHVlcy5cbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgZ2V0RW50aXR5UHJpbWFyeUtleVZhbHVlcyA9IG1lbW9pemUoICggbW9kZWxOYW1lLCBlbnRpdHkgKSA9PiB7XG5cdGNvbnN0IGtleXMgPSBnZXRQcmltYXJ5S2V5KCBtb2RlbE5hbWUgKTtcblx0cmV0dXJuIGlzQXJyYXkoIGtleXMgKSA/XG5cdFx0dmFsdWVzRm9yQ29tYmluZWRQcmltYXJ5S2V5cygga2V5cywgZW50aXR5ICkgOlxuXHRcdHZhbHVlRm9yUHJpbWFyeUtleSgga2V5cywgZW50aXR5ICk7XG59ICk7XG5cbi8qKlxuICogVGhpcyByZWNlaXZlcyBhbiBhcnJheSBvZiBlbnRpdGllcyBhbmQgcmV0dXJucyBhIGNvbGxlY3Rpb24gb2YgdGhvc2Ugc2FtZVxuICogZW50aXRpZXMgaW5kZXhlZCBieSB0aGUgcHJpbWFyeSBrZXkgdmFsdWUgZm9yIGVhY2ggZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7QXJyYXl9IGVudGl0aWVzXG4gKiBAcmV0dXJuIHtNYXB9ICBBIGNvbGxlY3Rpb24gaW5kZXhlZCBieSB0aGUgcHJpbWFyeSBrZXkgdmFsdWVzIGZvciBlYWNoIGVudGl0eS5cbiAqIEB0aHJvd3Mge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGtleUVudGl0aWVzQnlQcmltYXJ5S2V5VmFsdWUgPSAoIG1vZGVsTmFtZSwgZW50aXRpZXMgPSBbXSApID0+IHtcblx0YXNzZXJ0SXNOb3RFbXB0eShcblx0XHRlbnRpdGllcyxcblx0XHRfXyhcblx0XHRcdCdUaGUgcHJvdmlkZWQgYXJyYXkgb2YgZW50aXRpZXMgbXVzdCBub3QgYmUgZW1wdHknLFxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHQpXG5cdCk7XG5cdGFzc2VydElzQXJyYXkoIGVudGl0aWVzICk7XG5cblx0Y29uc3QgbWFwcGVkRW50aXRpZXMgPSBuZXcgTWFwKCk7XG5cdGVudGl0aWVzLmZvckVhY2goICggZW50aXR5ICkgPT4ge1xuXHRcdG1hcHBlZEVudGl0aWVzLnNldChcblx0XHRcdGdldEVudGl0eVByaW1hcnlLZXlWYWx1ZXMoIG1vZGVsTmFtZSwgZW50aXR5ICksXG5cdFx0XHRlbnRpdHlcblx0XHQpO1xuXHR9ICk7XG5cdHJldHVybiBtYXBwZWRFbnRpdGllcztcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBlbnRpdHkgaW5zdGFuY2VzIHVzaW5nIHRoZSBnaXZlbiBmYWN0b3J5IGFuZCBhcnJheVxuICogb2YgZW50aXR5IHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZmFjdG9yeVxuICogQHBhcmFtIHtNYXB9IGVudGl0aWVzXG4gKiBAcmV0dXJuIHtNYXB9ICBBbiBhcnJheSBvZiBlbnRpdHkgaW5zdGFuY2VzIGluZGV4ZWQgYnlcbiAqIHRoZWlyIHByaW1hcnkga2V5IHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBbmRLZXlFbnRpdGllc0J5UHJpbWFyeUtleVZhbHVlID0gKFxuXHRmYWN0b3J5LFxuXHRlbnRpdGllcyxcbikgPT4ge1xuXHRhc3NlcnRJc01hcChcblx0XHRlbnRpdGllcyxcblx0XHRfXyhcblx0XHRcdCdUaGUgcHJvdmlkZWQgb2JqZWN0IG9mIGVudGl0aWVzIG11c3QgYmUgYSBNYXAgb2JqZWN0Jyxcblx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0KVxuXHQpO1xuXHRlbnRpdGllcy5mb3JFYWNoKCAoIGVudGl0eSwgZW50aXR5SWQgKSA9PiB7XG5cdFx0ZW50aXRpZXMuc2V0KCBlbnRpdHlJZCwgZmFjdG9yeS5mcm9tRXhpc3RpbmcoIGVudGl0eSApICk7XG5cdH0gKTtcblx0cmV0dXJuIGVudGl0aWVzO1xufTtcbiIsIi8qKlxuICogSW50ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgKiBhcyBzdGF0dXNNb2RlbCBmcm9tICcuLi9zdGF0dXMvY29uc3RhbnRzJztcblxuLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBNT0RFTF9OQU1FID0gJ3JlZ2lzdHJhdGlvbic7XG5cbmV4cG9ydCBjb25zdCBSRUdJU1RSQVRJT05fU1RBVFVTX0lEUyA9IHZhbHVlcyhcblx0c3RhdHVzTW9kZWwuUkVHSVNUUkFUSU9OX1NUQVRVU19JRFxuKTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzVW5kZWZpbmVkLCB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfREVTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG59IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0ICogYXMgc3RhdHVzTW9kZWwgZnJvbSAnLi4vc3RhdHVzL2NvbnN0YW50cyc7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0Zm9yRXZlbnRJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yQXR0ZW5kZWVJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yVHJhbnNhY3Rpb25JZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yVGlja2V0SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclN0YXR1c0lkOiBQcm9wVHlwZXMub25lT2YoIHZhbHVlcyggc3RhdHVzTW9kZWwuUkVHSVNUUkFUSU9OX1NUQVRVU19JRCApICksXG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0XHQnUkVHX0lEJyxcblx0XHRcdCdSRUdfZGF0ZScsXG5cdFx0XSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdH0gKSxcbn07XG5cbmV4cG9ydCBjb25zdCBvcHRpb25zRW50aXR5TWFwID0ge1xuXHRkZWZhdWx0OiB7XG5cdFx0dmFsdWU6ICdSRUdfSUQnLFxuXHRcdGxhYmVsOiAnUkVHX2NvZGUnLFxuXHR9LFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDEwMCxcblx0XHRvcmRlckJ5OiAncmVnX2RhdGUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9ERVNDLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGEgcmVnaXN0cmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHRyZWdfaWQ6ICdSRUdfSUQnLFxuXHRcdHJlZ19kYXRlOiAnUkVHX2RhdGUnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiByZWdpc3RyYXRpb25zIGVuZHBvaW50IHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRXZlbnRJZCAgICBcdElEIG9mIEV2ZW50IHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yQXR0ZW5kZWVJZCAgICBJRCBvZiBBdHRlbmRlZSB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvclRyYW5zYWN0aW9uSWQgSUQgb2YgVHJhbnNhY3Rpb24gdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JUaWNrZXRJZCBcdFx0SUQgb2YgVGlja2V0IHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9yU3RhdHVzSWQgXHRcdElEIG9mIFN0YXR1cyB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICBcdFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICgge1xuXHRmb3JFdmVudElkID0gMCxcblx0Zm9yQXR0ZW5kZWVJZCA9IDAsXG5cdGZvclRyYW5zYWN0aW9uSWQgPSAwLFxuXHRmb3JUaWNrZXRJZCA9IDAsXG5cdGZvclN0YXR1c0lkID0gJycsXG59ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXHRmb3JFdmVudElkID0gcGFyc2VJbnQoIGZvckV2ZW50SWQsIDEwICk7XG5cdGlmICggZm9yRXZlbnRJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JFdmVudElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0VWVF9JRF09JyArIGZvckV2ZW50SWQgKTtcblx0fVxuXHRmb3JBdHRlbmRlZUlkID0gcGFyc2VJbnQoIGZvckF0dGVuZGVlSWQsIDEwICk7XG5cdGlmICggZm9yQXR0ZW5kZWVJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JBdHRlbmRlZUlkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0FUVF9JRF09JyArIGZvckF0dGVuZGVlSWQgKTtcblx0fVxuXHRmb3JUcmFuc2FjdGlvbklkID0gcGFyc2VJbnQoIGZvclRyYW5zYWN0aW9uSWQsIDEwICk7XG5cdGlmICggZm9yVHJhbnNhY3Rpb25JZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JUcmFuc2FjdGlvbklkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1RYTl9JRF09JyArIGZvclRyYW5zYWN0aW9uSWQgKTtcblx0fVxuXHRmb3JUaWNrZXRJZCA9IHBhcnNlSW50KCBmb3JUaWNrZXRJZCwgMTAgKTtcblx0aWYgKCBmb3JUaWNrZXRJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JUaWNrZXRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtUS1RfSURdPScgKyBmb3JUaWNrZXRJZCApO1xuXHR9XG5cdGlmICggZm9yU3RhdHVzSWQgIT09ICcnICYmIGZvclN0YXR1c0lkICE9PSBudWxsICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtTVFNfSURdPScgKyBmb3JTdGF0dXNJZCApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBNT0RFTF9OQU1FID0gJ3N0YXR1cyc7XG4vLyB0eXBlc1xuZXhwb3J0IGNvbnN0IFNUQVRVU19UWVBFX0VNQUlMID0gJ2VtYWlsJztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9FVkVOVCA9ICdldmVudCc7XG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfTUVTU0FHRSA9ICdtZXNzYWdlJztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9QQVlNRU5UID0gJ3BheW1lbnQnO1xuZXhwb3J0IGNvbnN0IFNUQVRVU19UWVBFX1JFR0lTVFJBVElPTiA9ICdyZWdpc3RyYXRpb24nO1xuZXhwb3J0IGNvbnN0IFNUQVRVU19UWVBFX1RSQU5TQUNUSU9OID0gJ3RyYW5zYWN0aW9uJztcbi8vIGVtYWlsXG5leHBvcnQgY29uc3QgRU1BSUxfU1RBVFVTX0lEID0ge1xuXHREUkFGVDogJ0VEUicsXG5cdFNFTlQ6ICdFU04nLFxuXHRFWFBJUkVEOiAnRVhQJyxcbn07XG4vLyBldmVudFxuZXhwb3J0IGNvbnN0IEVWRU5UX1NUQVRVU19JRCA9IHtcblx0QUNUSVZFOiAnQUNUJyxcblx0UkVHSVNUUkFUSU9OX0NMT1NFRDogJ0NMUycsXG5cdERFTEVURUQ6ICdERUwnLFxuXHRERU5JRUQ6ICdERU4nLFxuXHREUkFGVDogJ0RSRicsXG5cdE5PVF9BQ1RJVkU6ICdOQUMnLFxuXHROT1RfT1BFTjogJ05PUCcsXG5cdE9OR09JTkc6ICdPTkcnLFxuXHRSRUdJU1RSQVRJT05fT1BFTjogJ09QTicsXG5cdFBFTkRJTkc6ICdQTkQnLFxuXHRTRUNPTkRBUlk6ICdTRUMnLFxufTtcbi8vIG1lc3NhZ2VcbmV4cG9ydCBjb25zdCBNRVNTQUdFX1NUQVRVU19JRCA9IHtcblx0REVCVUc6ICdNRE8nLFxuXHRFWEVDVVRJTkc6ICdNRVgnLFxuXHRGQUlMOiAnTUZMJyxcblx0SU5DT01QTEVURTogJ01JQycsXG5cdElETEU6ICdNSUQnLFxuXHRSRVNFTkQ6ICdNUlMnLFxuXHRSRVRSWTogJ01SVCcsXG5cdFNFTlQ6ICdNU04nLFxufTtcbi8vIHBheW1lbnRcbmV4cG9ydCBjb25zdCBQQVlNRU5UX1NUQVRVU19JRCA9IHtcblx0QVBQUk9WRUQ6ICdQQVAnLFxuXHRDQU5DRUxMRUQ6ICdQQ04nLFxuXHRERUNMSU5FRDogJ1BEQycsXG5cdEZBSUxFRDogJ1BGTCcsXG5cdFBFTkRJTkc6ICdQUE4nLFxufTtcbi8vIHJlZ2lzdHJhdGlvblxuZXhwb3J0IGNvbnN0IFJFR0lTVFJBVElPTl9TVEFUVVNfSUQgPSB7XG5cdEFQUFJPVkVEOiAnUkFQJyxcblx0Q0FOQ0VMTEVEOiAnUkNOJyxcblx0REVDTElORUQ6ICdSREMnLFxuXHRJTkNPTVBMRVRFOiAnUklDJyxcblx0Tk9UX0FQUFJPVkVEOiAnUk5BJyxcblx0UEVORElOR19QQVlNRU5UOiAnUlBQJyxcblx0V0FJVF9MSVNUOiAnUldMJyxcbn07XG4vLyB0cmFuc2FjdGlvblxuZXhwb3J0IGNvbnN0IFRSQU5TQUNUSU9OX1NUQVRVU19JRCA9IHtcblx0QUJBTkRPTkVEOiAnVEFCJyxcblx0Q09NUExFVEU6ICdUQ00nLFxuXHRGQUlMRUQ6ICdURkwnLFxuXHRJTkNPTVBMRVRFOiAnVElOJyxcblx0T1ZFUlBBSUQ6ICdUT1AnLFxufTtcblxuLy8gdGhlIGZvbGxvd2luZyBhcmUgbm90IGluIHRoZSBzdGF0dXMgZGF0YWJhc2UgYnV0IGFyZSBrZXB0IGhlcmUgZm9yXG4vLyBjb252ZW5pZW5jZVxuXG4vLyBjdXN0b20gcG9zdCB0eXBlc1xuZXhwb3J0IGNvbnN0IENQVF9TVEFUVVNfSUQgPSB7XG5cdFBVQkxJU0g6ICdwdWJsaXNoJyxcblx0RlVUVVJFOiAnZnV0dXJlJyxcblx0RFJBRlQ6ICdkcmFmdCcsXG5cdFBFTkRJTkc6ICdwZW5kaW5nJyxcblx0UFJJVkFURTogJ3ByaXZhdGUnLFxuXHRUUkFTSEVEOiAndHJhc2gnLFxufTtcblxuZXhwb3J0IGNvbnN0IFVOS05PV05fU1RBVFVTX0lEID0gJ3Vua25vd24nO1xuXG5leHBvcnQgY29uc3QgQUxMX1NUQVRVU19JRFMgPSBbXG5cdC4uLnZhbHVlcyggRU1BSUxfU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggRVZFTlRfU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggTUVTU0FHRV9TVEFUVVNfSUQgKSxcblx0Li4udmFsdWVzKCBQQVlNRU5UX1NUQVRVU19JRCApLFxuXHQuLi52YWx1ZXMoIFJFR0lTVFJBVElPTl9TVEFUVVNfSUQgKSxcblx0Li4udmFsdWVzKCBUUkFOU0FDVElPTl9TVEFUVVNfSUQgKSxcblx0Li4udmFsdWVzKCBDUFRfU1RBVFVTX0lEICksXG5cdFVOS05PV05fU1RBVFVTX0lELFxuXTtcbiIsIi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgKiBhcyBzdGF0dXMgZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgRVZFTlRfU1RBVFVTX0lEIH0gZnJvbSAnLi4vZXZlbnQnO1xuaW1wb3J0IHsgVElDS0VUX1NUQVRVU19JRCB9IGZyb20gJy4uL3RpY2tldCc7XG5pbXBvcnQgeyBEQVRFVElNRV9TVEFUVVNfSUQgfSBmcm9tICcuLi9kYXRldGltZSc7XG5pbXBvcnQgeyBDSEVDS0lOX1NUQVRVU19JRCB9IGZyb20gJy4uL2NoZWNraW4nO1xuXG4vKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IExhYmVsIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsdWUtb2JqZWN0cyc7XG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIFJlZ2lzdHJhdGlvbiBzdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX1JFR0lTVFJBVElPTiA9IHtcblx0WyBzdGF0dXMuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5QRU5ESU5HX1BBWU1FTlQgXTogbmV3IExhYmVsKFxuXHRcdF9fKCAncGVuZGluZyBwYXltZW50JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdF9fKCAncGVuZGluZyBwYXltZW50cycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELkFQUFJPVkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnYXBwcm92ZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5OT1RfQVBQUk9WRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdub3QgYXBwcm92ZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5DQU5DRUxMRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdjYW5jZWxsZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5JTkNPTVBMRVRFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnaW5jb21wbGV0ZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELkRFQ0xJTkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZGVjbGluZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5XQUlUX0xJU1QgXTogbmV3IExhYmVsKFxuXHRcdF9fKCAnd2FpdCBsaXN0JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdF9fKCAnd2FpdCBsaXN0cycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIFRyYW5zYWN0aW9uIHN0YXR1c2VzXG4gKiBAdHlwZSB7e319XG4gKlxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX1RSQU5TQUNUSU9OID0ge1xuXHRbIHN0YXR1cy5UUkFOU0FDVElPTl9TVEFUVVNfSUQuT1ZFUlBBSUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdvdmVycGFpZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5UUkFOU0FDVElPTl9TVEFUVVNfSUQuQ09NUExFVEUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdjb21wbGV0ZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5UUkFOU0FDVElPTl9TVEFUVVNfSUQuSU5DT01QTEVURSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2luY29tcGxldGUnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELkZBSUxFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2ZhaWxlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5UUkFOU0FDVElPTl9TVEFUVVNfSUQuQUJBTkRPTkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnYWJhbmRvbmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgcGF5bWVudCBzdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX1BBWU1FTlQgPSB7XG5cdFsgc3RhdHVzLlBBWU1FTlRfU1RBVFVTX0lELkFQUFJPVkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnYWNjZXB0ZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuUEFZTUVOVF9TVEFUVVNfSUQuUEVORElORyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3BlbmRpbmcnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuUEFZTUVOVF9TVEFUVVNfSUQuQ0FOQ0VMTEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnY2FuY2VsbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHQpLFxuXHRbIHN0YXR1cy5QQVlNRU5UX1NUQVRVU19JRC5ERUNMSU5FRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2RlY2xpbmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHQpLFxuXHRbIHN0YXR1cy5QQVlNRU5UX1NUQVRVU19JRC5GQUlMRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdmYWlsZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBNZXNzYWdlIHN0YXR1c2VzXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfTUVTU0FHRSA9IHtcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuU0VOVCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3NlbnQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuSURMRSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3F1ZXVlZCBmb3Igc2VuZGluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5GQUlMIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZmFpbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELkRFQlVHIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZGVidWcgb25seScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5FWEVDVVRJTkcgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdtZXNzZW5nZXIgaXMgZXhlY3V0aW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELlJFU0VORCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3F1ZXVlZCBmb3IgcmVzZW5kaW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELklOQ09NUExFVEUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdxdWV1ZWQgZm9yIGdlbmVyYXRpbmcnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuUkVUUlkgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdmYWlsZWQgc2VuZGluZywgY2FuIGJlIHJldHJpZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBDUFQgc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9DUFQgPSB7XG5cdFsgc3RhdHVzLkNQVF9TVEFUVVNfSUQuUFVCTElTSCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3B1Ymxpc2hlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5DUFRfU1RBVFVTX0lELkZVVFVSRSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3NjaGVkdWxlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5DUFRfU1RBVFVTX0lELkRSQUZUIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZHJhZnQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuQ1BUX1NUQVRVU19JRC5QRU5ESU5HIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncGVuZGluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5DUFRfU1RBVFVTX0lELlBSSVZBVEUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdwcml2YXRlJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLkNQVF9TVEFUVVNfSUQuVFJBU0hFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3RyYXNoZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8vIHRoZSBmb2xsb3dpbmcgc3RhdHVzIG1hcHMgYXJlIGZvciBtb2RlbCBzdGF0dXNlcyB0aGF0IGFyZSBub3Qgc2F2ZWQgaW4gdGhlXG4vLyBzdGF0dXMgdGFibGUgYnV0IGZvciBjb252ZW5pZW5jZSBoYXZlIHRoZWlyIGxhYmVscyByZXRyaWV2YWJsZSB2aWEgaGVyZS5cblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIEV2ZW50IFN0YXR1c2VzXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfRVZFTlQgPSB7XG5cdFsgRVZFTlRfU1RBVFVTX0lELlNPTERfT1VUIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnc29sZCBvdXQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBFVkVOVF9TVEFUVVNfSUQuUE9TVFBPTkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncG9zdHBvbmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgRVZFTlRfU1RBVFVTX0lELkNBTkNFTExFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2NhbmNlbGxlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIFRpY2tldCBzdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX1RJQ0tFVCA9IHtcblx0WyBUSUNLRVRfU1RBVFVTX0lELkFSQ0hJVkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnYXJjaGl2ZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBUSUNLRVRfU1RBVFVTX0lELkVYUElSRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdleHBpcmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgVElDS0VUX1NUQVRVU19JRC5TT0xEX09VVCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3NvbGQgb3V0JywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgVElDS0VUX1NUQVRVU19JRC5QRU5ESU5HIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAndXBjb21pbmcnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBUSUNLRVRfU1RBVFVTX0lELk9OU0FMRSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ29uIHNhbGUnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBkYXRldGltZSBzdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0RBVEVUSU1FID0ge1xuXHRbIERBVEVUSU1FX1NUQVRVU19JRC5DQU5DRUxMRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdjYW5jZWxsZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuU09MRF9PVVQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdzb2xkIG91dCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIERBVEVUSU1FX1NUQVRVU19JRC5FWFBJUkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZXhwaXJlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIERBVEVUSU1FX1NUQVRVU19JRC5JTkFDVElWRSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2luYWN0aXZlJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgREFURVRJTUVfU1RBVFVTX0lELlVQQ09NSU5HIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAndXBjb21pbmcnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuQUNUSVZFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnYWN0aXZlJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgREFURVRJTUVfU1RBVFVTX0lELlBPU1RQT05FRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3Bvc3Rwb25lZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIGNoZWNraW4gc3RhdHVzZXNcbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ0hFQ0tJTiA9IHtcblx0WyBDSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9JTiBdOiBuZXcgTGFiZWwoXG5cdFx0X18oICdjaGVjay1pbicsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRfXyggJ2NoZWNrLWlucycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIENIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX09VVCBdOiBuZXcgTGFiZWwoXG5cdFx0X18oICdjaGVjay1vdXQnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0X18oICdjaGVjay1vdXRzJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfTkVWRVIgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICduZXZlciBjaGVja2VkIGluJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIENvbWJpbmVkIHRyYW5zbGF0aW9uIG1hcCBmb3IgYWxsIHN0YXR1c2VzLlxuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0FMTCA9IHtcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9SRUdJU1RSQVRJT04sXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfVFJBTlNBQ1RJT04sXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfUEFZTUVOVCxcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9NRVNTQUdFLFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX0NQVCxcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9FVkVOVCxcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9USUNLRVQsXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfREFURVRJTUUsXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ0hFQ0tJTixcblx0WyBzdGF0dXMuVU5LTk9XTl9TVEFUVVNfSUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICd1bmtub3duJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHByZXR0eSBzdGF0dXMgbGFiZWwgc3RyaW5nIGZvciB0aGUgZ2l2ZW4gYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0dXNDb2RlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNpbmd1bGFyICBXaGV0aGVyIHRvIHJldHVybiB0aGUgc2luZ3VsYXIgb3IgcGx1cmFsIGxhYmVsXG4gKiB2YWx1ZVxuICogQHBhcmFtIHsoc2VudGVuY2V8bG93ZXJ8dXBwZXIpfSBzY2hlbWFcbiAqIEByZXR1cm4ge3N0cmluZ30gUmV0dXJucyB0aGUgbWFwcGVkIHByZXR0eSBsYWJlbCBmb3IgdGhlIGdpdmVuIHN0YXR1cyBjb2RlIG9yXG4gKiBhIGZvcm1hdHRlZCAndW5rb3duJyBzdHJpbmcgaWYgdGhlcmUgaXMgbm8gbWFwcGVkIHZhbHVlIGZvciB0aGUgZ2l2ZW4gY29kZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHByZXR0eVN0YXR1cyA9IChcblx0c3RhdHVzQ29kZSxcblx0c2luZ3VsYXIgPSB0cnVlLFxuXHRzY2hlbWEgPSBMYWJlbC5GT1JNQVRfU0VOVEVOQ0VfQ0FTRVxuKSA9PiB7XG5cdHJldHVybiBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0FMTFsgc3RhdHVzQ29kZSBdID9cblx0XHRTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0FMTFsgc3RhdHVzQ29kZSBdLmFzRm9ybWF0dGVkKCBzaW5ndWxhciwgc2NoZW1hICkgOlxuXHRcdFNUQVRVU19UUkFOU0xBVElPTl9NQVBfQUxMWyBzdGF0dXMuVU5LTk9XTl9TVEFUVVNfSUQgXS5hc0Zvcm1hdHRlZChcblx0XHRcdHNpbmd1bGFyLFxuXHRcdFx0c2NoZW1hXG5cdFx0KTtcbn07XG5cbi8qKlxuICogRXhwZWN0cyBhbiBhcnJheSBvZiBzdGF0dXMgY29kZXMgYW5kIHJldHVybnMgYW4gb2JqZWN0IGluZGV4ZWQgYnkgY29kZXMgd2l0aFxuICogdmFsdWVzIGJlaW5nIHRoZSBmb3JtYXR0ZWQgcHJldHR5IGxhYmVscyBmb3IgZWFjaCBjb2RlIGFjY29yZGluZyB0byB0aGVcbiAqIHByb3ZpZGVkIGFyZ3VtZW50c1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHN0YXR1c0NvZGVzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNpbmd1bGFyXG4gKiBAcGFyYW0geyhzZW50ZW5jZXxsb3dlcnx1cHBlcil9IHNjaGVtYVxuICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3QgbWFwcGluZyBzdGF0dXMgY29kZSB0byBwcmV0dHkgbGFiZWwuXG4gKi9cbmV4cG9ydCBjb25zdCBwcmV0dHlTdGF0dXNlcyA9IChcblx0c3RhdHVzQ29kZXMsXG5cdHNpbmd1bGFyID0gdHJ1ZSxcblx0c2NoZW1hID0gTGFiZWwuRk9STUFUX1NFTlRFTkNFX0NBU0VcbikgPT4ge1xuXHRpZiAoICEgaXNBcnJheSggc3RhdHVzQ29kZXMgKSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnRXhwZWN0IGluY29taW5nIHN0YXR1c0NvZGVzIGFyZ3VtZW50JyArXG5cdFx0XHQnIHRvIGJlIGFuIGFycmF5JyApO1xuXHR9XG5cdGNvbnN0IG1hcHBlZFN0YXR1c2VzID0ge307XG5cdHN0YXR1c0NvZGVzLmZvckVhY2goICggc3RhdHVzQ29kZSApID0+IHtcblx0XHRtYXBwZWRTdGF0dXNlc1sgc3RhdHVzQ29kZSBdID0gcHJldHR5U3RhdHVzKFxuXHRcdFx0c3RhdHVzQ29kZSxcblx0XHRcdHNpbmd1bGFyLFxuXHRcdFx0c2NoZW1hXG5cdFx0KTtcblx0fSApO1xuXHRyZXR1cm4gbWFwcGVkU3RhdHVzZXM7XG59O1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG5leHBvcnQgKiBmcm9tICcuL2hlbHBlcnMnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfQVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcbn0gZnJvbSAnLi4vYmFzZSc7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdH0gKSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAyNSxcblx0XHRvcmRlckJ5OiAnc3RhdHVzQ29kZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0FTQyxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0c3RhdHVzQ29kZTogJ1NUU19jb2RlJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gZXZlbnRzIGVuZHBvaW50IHJlcXVlc3QgdXNpbmcgcHJvdmlkZWRcbiAqIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGF0dXNUeXBlIFx0SUQgZm9yIHR5cGUgb2YgU3RhdHVzIHRvIHJldHJpZXZlXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgIFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICggeyBzdGF0dXNUeXBlIH0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cdGlmICggc3RhdHVzVHlwZSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbU1RTX3R5cGVdPScgKyBzdGF0dXNUeXBlICk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG5cbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICd0aWNrZXQnO1xuXG5leHBvcnQgY29uc3QgVElDS0VUX1NUQVRVU19JRCA9IHtcblx0U09MRF9PVVQ6ICdUS1MnLFxuXHRFWFBJUkVEOiAnVEtFJyxcblx0QVJDSElWRUQ6ICdUS0EnLFxuXHRQRU5ESU5HOiAnVEtQJyxcblx0T05TQUxFOiAnVEtPJyxcbn07XG5cbmV4cG9ydCBjb25zdCBUSUNLRVRfU1RBVFVTX0lEUyA9IHZhbHVlcyggVElDS0VUX1NUQVRVU19JRCApO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG5leHBvcnQgKiBmcm9tICcuL3N0YXR1cy1oZWxwZXInO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfREVTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG5cdEdSRUFURVJfVEhBTixcblx0R1JFQVRFUl9USEFOX0FORF9FUVVBTCxcblx0TEVTU19USEFOX0FORF9FUVVBTCxcbn0gZnJvbSAnLi4vYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBub3dEYXRlQW5kVGltZSA9IG1vbWVudCgpO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0XHQnVEtUX25hbWUnLFxuXHRcdFx0J1RLVF9JRCcsXG5cdFx0XHQnc3RhcnRfZGF0ZScsXG5cdFx0XHQnZW5kX2RhdGUnLFxuXHRcdF0gKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHRcdHNob3dFeHBpcmVkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRtb250aDogUHJvcFR5cGVzLm1vbnRoLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0XHRzaG93RXhwaXJlZDogYm9vbGVhblxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDEwMCxcblx0XHRvcmRlckJ5OiAnc3RhcnRfZGF0ZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdFx0c2hvd0V4cGlyZWQ6IGZhbHNlLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGEgdGlja2V0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHRzdGFydF9kYXRlOiAnVEtUX3N0YXJ0X2RhdGUnLFxuXHRcdGVuZF9kYXRlOiAnVEtUX2VuZF9kYXRlJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKCBvcmRlckJ5TWFwWyBvcmRlckJ5IF0gKSA/XG5cdFx0b3JkZXJCeSA6XG5cdFx0b3JkZXJCeU1hcFsgb3JkZXJCeSBdO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gdGlja2V0cyBlbmRwb2ludCByZXF1ZXN0IHVzaW5nIHByb3ZpZGVkXG4gKiBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3dFeHBpcmVkIFx0V2hldGhlciBvciBub3QgdG8gaW5jbHVkZSBleHBpcmVkIHRpY2tldHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9udGggICAgICAgICAgICBSZXR1cm4gdGlja2V0cyBmb3IgdGhlIGdpdmVuIG1vbnRoLiBDYW4gYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdGluIGFueSBtb250aCBmb3JtYXQgcmVjb2duaXplZCBieSBtb21lbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICAgIFx0SUQgb2YgRXZlbnQgdG8gcmV0cmlldmUgdGlja2V0cyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JEYXRldGltZUlkICAgIElEIG9mIERhdGV0aW1lIHRvIHJldHJpZXZlIHRpY2tldHMgZm9yXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgIFx0VGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7XG5cdGZvckV2ZW50SWQgPSAwLFxuXHRmb3JEYXRldGltZUlkID0gMCxcblx0c2hvd0V4cGlyZWQgPSBmYWxzZSxcblx0bW9udGggPSAnbm9uZScsXG59ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXHRpZiAoICEgc2hvd0V4cGlyZWQgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtUS1RfZW5kX2RhdGUqKmV4cGlyZWRdW109JyArIEdSRUFURVJfVEhBTiArXG5cdFx0XHQnJndoZXJlW1RLVF9lbmRfZGF0ZSoqZXhwaXJlZF1bXT0nICtcblx0XHRcdG5vd0RhdGVBbmRUaW1lLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmICggbW9udGggJiYgbW9udGggIT09ICdub25lJyApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW1RLVF9zdGFydF9kYXRlXVtdPScgKyBHUkVBVEVSX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbVEtUX3N0YXJ0X2RhdGVdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5zdGFydE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtUS1RfZW5kX2RhdGVdW109JyArIExFU1NfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtUS1RfZW5kX2RhdGVdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5lbmRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGZvckV2ZW50SWQgPSBwYXJzZUludCggZm9yRXZlbnRJZCwgMTAgKTtcblx0aWYgKCBmb3JFdmVudElkICE9PSAwICYmICEgaXNOYU4oIGZvckV2ZW50SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbRGF0ZXRpbWUuRXZlbnQuRVZUX0lEXT0nICsgZm9yRXZlbnRJZCApO1xuXHR9XG5cdGZvckRhdGV0aW1lSWQgPSBwYXJzZUludCggZm9yRGF0ZXRpbWVJZCwgMTAgKTtcblx0aWYgKCBmb3JEYXRldGltZUlkICE9PSAwICYmICEgaXNOYU4oIGZvckRhdGV0aW1lSWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbRGF0ZXRpbWUuRFRUX0lEXT0nICsgZm9yRGF0ZXRpbWVJZCApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgTU9ERUxfTkFNRSwgVElDS0VUX1NUQVRVU19JRCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBwYXJzZUluZmluaXR5IGZyb20gJy4uLy4uLy4uL3V0aWxzL3BhcnNlLWluZmluaXR5JztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG4gKi9cbmNvbnN0IGFzc2VydFRpY2tldEVudGl0eSA9ICggdGlja2V0RW50aXR5ICkgPT4ge1xuXHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldEVudGl0eSwgTU9ERUxfTkFNRSApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHQnVGhlIHByb3ZpZGVkIGVudGl0eSBpcyBub3QgYSB0aWNrZXQgaW5zdGFuY2UnXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVBcmNoaXZlZCBpZiB0cnVlIHdpbGwgbm90IGZpbHRlciBvdXQgdHJhc2hlZCBlbnRpdGllc1xuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBldmVudCBkYXRlIGlzIHZhbGlkIGVudGl0eSBvciBhcmNoaXZlXG4gKi9cbmNvbnN0IGlzVmFsaWRFbnRpdHlPckFyY2hpdmUgPSAoIHRpY2tldEVudGl0eSwgaW5jbHVkZUFyY2hpdmVkICkgPT4ge1xuXHRyZXR1cm4gKCBpbmNsdWRlQXJjaGl2ZWQgJiYgYXNzZXJ0VGlja2V0RW50aXR5KCB0aWNrZXRFbnRpdHkgKSApIHx8XG4gICAgICAgICggISBpbmNsdWRlQXJjaGl2ZWQgJiYgISBpc0FyY2hpdmVkKCB0aWNrZXRFbnRpdHkgKSApO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVBcmNoaXZlZCBpZiB0cnVlIHdpbGwgbm90IGZpbHRlciBvdXQgYXJjaGl2ZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGlja2V0IGlzIGN1cnJlbnRseSBhdmFpbGFibGUgZm9yIHB1cmNoYXNlXG4gKi9cbmV4cG9ydCBjb25zdCBpc09uU2FsZSA9ICggdGlja2V0RW50aXR5LCBpbmNsdWRlQXJjaGl2ZWQgPSBmYWxzZSApID0+IHtcblx0cmV0dXJuIGlzVmFsaWRFbnRpdHlPckFyY2hpdmUoIHRpY2tldEVudGl0eSwgaW5jbHVkZUFyY2hpdmVkICkgJiZcblx0dGlja2V0RW50aXR5LnN0YXJ0RGF0ZS5kaWZmTm93KCkgPCAwICYmXG5cdHRpY2tldEVudGl0eS5lbmREYXRlLmRpZmZOb3coKSA+IDA7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZUFyY2hpdmVkIGlmIHRydWUgd2lsbCBub3QgZmlsdGVyIG91dCBhcmNoaXZlZCBlbnRpdGllc1xuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aWNrZXQgY2FuIG5vIGxvbmdlciBiZSBwdXJjaGFzZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGlzRXhwaXJlZCA9ICggdGlja2V0RW50aXR5LCBpbmNsdWRlQXJjaGl2ZWQgPSBmYWxzZSApID0+IHtcblx0cmV0dXJuIGlzVmFsaWRFbnRpdHlPckFyY2hpdmUoIHRpY2tldEVudGl0eSwgaW5jbHVkZUFyY2hpdmVkICkgJiZcblx0dGlja2V0RW50aXR5LmVuZERhdGUuZGlmZk5vdygpIDwgMDtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQXJjaGl2ZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IGFyY2hpdmVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRpY2tldHMgc29sZCBtZWV0cyBvciBleGNlZWRzIGF2YWlsYWJsZSBxdWFudGl0eVxuICovXG5leHBvcnQgY29uc3QgaXNTb2xkT3V0ID0gKCB0aWNrZXRFbnRpdHksIGluY2x1ZGVBcmNoaXZlZCA9IGZhbHNlICkgPT4ge1xuXHRpZiAoXG5cdFx0KCBpbmNsdWRlQXJjaGl2ZWQgJiYgISBhc3NlcnRUaWNrZXRFbnRpdHkoIHRpY2tldEVudGl0eSApICkgfHxcblx0XHQoICEgaW5jbHVkZUFyY2hpdmVkICYmIGlzQXJjaGl2ZWQoIHRpY2tldEVudGl0eSApIClcblx0KSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGxldCBxdHkgPSB0aWNrZXRFbnRpdHkucXR5O1xuXHRxdHkgPSBwYXJzZUluZmluaXR5KCBxdHksIHRydWUgKTtcblx0cmV0dXJuIHF0eSAhPT0gSW5maW5pdHkgJiYgdGlja2V0RW50aXR5LnNvbGQgPj0gcXR5O1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVBcmNoaXZlZCBpZiB0cnVlIHdpbGwgbm90IGZpbHRlciBvdXQgYXJjaGl2ZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFx0dHJ1ZSBpZiB0aWNrZXQgaXMgbm90IHlldCBhdmFpbGFibGUgZm9yIHB1cmNoYXNlLFxuICogXHRcdFx0XHRcdFx0YnV0IHdpbGwgYmUgYXQgc29tZSBkYXRlIGluIHRoZSBmdXR1cmVcbiAqL1xuZXhwb3J0IGNvbnN0IGlzUGVuZGluZyA9ICggdGlja2V0RW50aXR5LCBpbmNsdWRlQXJjaGl2ZWQgPSBmYWxzZSApID0+IHtcblx0cmV0dXJuIGlzVmFsaWRFbnRpdHlPckFyY2hpdmUoIHRpY2tldEVudGl0eSwgaW5jbHVkZUFyY2hpdmVkICkgJiZcblx0dGlja2V0RW50aXR5LnN0YXJ0RGF0ZS5kaWZmTm93KCkgPiAwO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRpY2tldCBpcyBhcmNoaXZlZFxuICovXG5leHBvcnQgY29uc3QgaXNBcmNoaXZlZCA9ICggdGlja2V0RW50aXR5ICkgPT4ge1xuXHRhc3NlcnRUaWNrZXRFbnRpdHkoIHRpY2tldEVudGl0eSApO1xuXHRyZXR1cm4gdGlja2V0RW50aXR5LmRlbGV0ZWQ7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ30gc3RhdHVzIElEXG4gKi9cbmV4cG9ydCBjb25zdCBzdGF0dXMgPSAoIHRpY2tldEVudGl0eSApID0+IHtcblx0aWYgKCBpc0FyY2hpdmVkKCB0aWNrZXRFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gVElDS0VUX1NUQVRVU19JRC5BUkNISVZFRDtcblx0fVxuXHRpZiAoIGlzU29sZE91dCggdGlja2V0RW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIFRJQ0tFVF9TVEFUVVNfSUQuU09MRF9PVVQ7XG5cdH1cblx0aWYgKCBpc0V4cGlyZWQoIHRpY2tldEVudGl0eSApICkge1xuXHRcdHJldHVybiBUSUNLRVRfU1RBVFVTX0lELkVYUElSRUQ7XG5cdH1cblx0aWYgKCBpc1BlbmRpbmcoIHRpY2tldEVudGl0eSApICkge1xuXHRcdHJldHVybiBUSUNLRVRfU1RBVFVTX0lELlBFTkRJTkc7XG5cdH1cblx0aWYgKCBpc09uU2FsZSggdGlja2V0RW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIFRJQ0tFVF9TVEFUVVNfSUQuT05TQUxFO1xuXHR9XG5cdHJldHVybiAnJztcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHJldHVybiB7c3RyaW5nfSB0aWNrZXQgc3RhdHVzXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUaWNrZXRTdGF0dXNUZXh0TGFiZWwgPSAoIHRpY2tldEVudGl0eSApID0+IHtcblx0bGV0IHRpY2tldFN0YXR1cyA9ICcnO1xuXHRzd2l0Y2ggKCBzdGF0dXMoIHRpY2tldEVudGl0eSApICkge1xuXHRcdGNhc2UgVElDS0VUX1NUQVRVU19JRC5TT0xEX09VVCA6XG5cdFx0XHR0aWNrZXRTdGF0dXMgPSBfXyggJ3NvbGQgb3V0JywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBUSUNLRVRfU1RBVFVTX0lELkVYUElSRUQgOlxuXHRcdFx0dGlja2V0U3RhdHVzID0gX18oICdleHBpcmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBUSUNLRVRfU1RBVFVTX0lELlBFTkRJTkcgOlxuXHRcdFx0dGlja2V0U3RhdHVzID0gX18oICdwZW5kaW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBUSUNLRVRfU1RBVFVTX0lELk9OU0FMRSA6XG5cdFx0XHR0aWNrZXRTdGF0dXMgPSBfXyggJ29uIHNhbGUnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFRJQ0tFVF9TVEFUVVNfSUQuQVJDSElWRUQgOlxuXHRcdFx0dGlja2V0U3RhdHVzID0gX18oICdhcmNoaXZlZCcsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHR9XG5cdHJldHVybiB0aWNrZXRTdGF0dXM7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgQ1NTIGNsYXNzIGZvciB0aGUgYmFja2dyb3VuZCBjb2xvclxuICovXG5leHBvcnQgY29uc3QgZ2V0QmFja2dyb3VuZENvbG9yQ2xhc3MgPSAoIHRpY2tldEVudGl0eSApID0+IHtcblx0cmV0dXJuIGBlZS1zdGF0dXMtYmFja2dyb3VuZC1jb2xvci0keyBzdGF0dXMoIHRpY2tldEVudGl0eSApIH1gO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc05pbCB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogY29udmVydHMgaW5maW5pdGUgdmFsdWVzIHRvIG51bGwgZm9yIHVzZSBpbiBmb3Jtc1xuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudWxsfG51bWJlcnxzdHJpbmd9IG51bWJlclxuICogQHBhcmFtIHtib29sZWFufSBhc0ludFxuICogQHBhcmFtIHtib29sZWFufSBmb3JEYlxuICogQHJldHVybiB7bnVtYmVyfSBjb252ZXJ0ZWQgaW5maW5pdGUgdmFsdWVcbiAqL1xuY29uc3QgcGFyc2VJbmZpbml0eSA9ICggbnVtYmVyLCBhc0ludCA9IGZhbHNlLCBmb3JEYiA9IGZhbHNlICkgPT4ge1xuXHQvLyByZXR1cm5zIHRydWUgZm9yIGFueSBwb3NzaWJsZSB2YWx1ZSB0aGF0IGNvdWxkIHJlcHJlc2VudCBpbmZpbml0eVxuXHRjb25zdCByZXByZXNlbnRzSW5maW5pdHkgPSAoIHZhbHVlICkgPT5cblx0XHR2YWx1ZSA9PT0gLTEgfHxcblx0XHR2YWx1ZSA9PT0gJycgfHxcblx0XHR2YWx1ZSA9PT0gJ0lORicgfHxcblx0XHR2YWx1ZSA9PT0gSW5maW5pdHkgfHxcblx0XHRpc05pbCggdmFsdWUgKTtcblx0bnVtYmVyID0gcmVwcmVzZW50c0luZmluaXR5KCBudW1iZXIgKSB8fCAoXG5cdFx0bnVtYmVyLnR5cGUgJiZcblx0XHRudW1iZXIudHlwZS5uYW1lID09PSAnSW5maW5pdHlTeW1ib2wnICYmXG5cdFx0cmVwcmVzZW50c0luZmluaXR5KCBudW1iZXIucHJvcHMudmFsdWUgKVxuXHQpID9cblx0XHRJbmZpbml0eSA6XG5cdFx0bnVtYmVyO1xuXHRudW1iZXIgPSBudW1iZXIgIT09IEluZmluaXR5ICYmIGFzSW50ID8gcGFyc2VJbnQoIG51bWJlciwgMTAgKSA6IG51bWJlcjtcblx0Ly8gbm90IGluZmluaXR5IE9SIGlzIGluZmluaXR5IGJ1dCBub3QgZm9yIGRiXG5cdG51bWJlciA9IG51bWJlciAhPT0gSW5maW5pdHkgfHwgKCBudW1iZXIgPT09IEluZmluaXR5ICYmICEgZm9yRGIgKSA/XG5cdFx0bnVtYmVyIDpcblx0XHQtMTtcblx0cmV0dXJuIG51bWJlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlSW5maW5pdHk7XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhvdXRIb2xlczsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQ7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsInZhciBhcnJheVdpdGhvdXRIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aG91dEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5XCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZFwiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90b0NvbnN1bWFibGVBcnJheTsiLCJmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZjIob2JqKTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lbWl6ZSggZm4sIG9wdGlvbnMgKSB7XG5cdHZhciBzaXplID0gMCxcblx0XHRtYXhTaXplLCBoZWFkLCB0YWlsO1xuXG5cdGlmICggb3B0aW9ucyAmJiBvcHRpb25zLm1heFNpemUgKSB7XG5cdFx0bWF4U2l6ZSA9IG9wdGlvbnMubWF4U2l6ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIG1lbW9pemVkKCAvKiAuLi5hcmdzICovICkge1xuXHRcdHZhciBub2RlID0gaGVhZCxcblx0XHRcdGxlbiA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0XHRhcmdzLCBpO1xuXG5cdFx0c2VhcmNoQ2FjaGU6IHdoaWxlICggbm9kZSApIHtcblx0XHRcdC8vIFBlcmZvcm0gYSBzaGFsbG93IGVxdWFsaXR5IHRlc3QgdG8gY29uZmlybSB0aGF0IHdoZXRoZXIgdGhlIG5vZGVcblx0XHRcdC8vIHVuZGVyIHRlc3QgaXMgYSBjYW5kaWRhdGUgZm9yIHRoZSBhcmd1bWVudHMgcGFzc2VkLiBUd28gYXJyYXlzXG5cdFx0XHQvLyBhcmUgc2hhbGxvd2x5IGVxdWFsIGlmIHRoZWlyIGxlbmd0aCBtYXRjaGVzIGFuZCBlYWNoIGVudHJ5IGlzXG5cdFx0XHQvLyBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuIHRoZSB0d28gc2V0cy4gQXZvaWQgYWJzdHJhY3RpbmcgdG8gYVxuXHRcdFx0Ly8gZnVuY3Rpb24gd2hpY2ggY291bGQgaW5jdXIgYW4gYXJndW1lbnRzIGxlYWtpbmcgZGVvcHRpbWl6YXRpb24uXG5cblx0XHRcdC8vIENoZWNrIHdoZXRoZXIgbm9kZSBhcmd1bWVudHMgbWF0Y2ggYXJndW1lbnRzIGxlbmd0aFxuXHRcdFx0aWYgKCBub2RlLmFyZ3MubGVuZ3RoICE9PSBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgd2hldGhlciBub2RlIGFyZ3VtZW50cyBtYXRjaCBhcmd1bWVudHMgdmFsdWVzXG5cdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRpZiAoIG5vZGUuYXJnc1sgaSBdICE9PSBhcmd1bWVudHNbIGkgXSApIHtcblx0XHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRcdGNvbnRpbnVlIHNlYXJjaENhY2hlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQgd2UgY2FuIGFzc3VtZSB3ZSd2ZSBmb3VuZCBhIG1hdGNoXG5cblx0XHRcdC8vIFN1cmZhY2UgbWF0Y2hlZCBub2RlIHRvIGhlYWQgaWYgbm90IGFscmVhZHlcblx0XHRcdGlmICggbm9kZSAhPT0gaGVhZCApIHtcblx0XHRcdFx0Ly8gQXMgdGFpbCwgc2hpZnQgdG8gcHJldmlvdXMuIE11c3Qgb25seSBzaGlmdCBpZiBub3QgYWxzb1xuXHRcdFx0XHQvLyBoZWFkLCBzaW5jZSBpZiBib3RoIGhlYWQgYW5kIHRhaWwsIHRoZXJlIGlzIG5vIHByZXZpb3VzLlxuXHRcdFx0XHRpZiAoIG5vZGUgPT09IHRhaWwgKSB7XG5cdFx0XHRcdFx0dGFpbCA9IG5vZGUucHJldjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkanVzdCBzaWJsaW5ncyB0byBwb2ludCB0byBlYWNoIG90aGVyLiBJZiBub2RlIHdhcyB0YWlsLFxuXHRcdFx0XHQvLyB0aGlzIGFsc28gaGFuZGxlcyBuZXcgdGFpbCdzIGVtcHR5IGBuZXh0YCBhc3NpZ25tZW50LlxuXHRcdFx0XHRub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcblx0XHRcdFx0aWYgKCBub2RlLm5leHQgKSB7XG5cdFx0XHRcdFx0bm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRub2RlLm5leHQgPSBoZWFkO1xuXHRcdFx0XHRub2RlLnByZXYgPSBudWxsO1xuXHRcdFx0XHRoZWFkLnByZXYgPSBub2RlO1xuXHRcdFx0XHRoZWFkID0gbm9kZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV0dXJuIGltbWVkaWF0ZWx5XG5cdFx0XHRyZXR1cm4gbm9kZS52YWw7XG5cdFx0fVxuXG5cdFx0Ly8gTm8gY2FjaGVkIHZhbHVlIGZvdW5kLiBDb250aW51ZSB0byBpbnNlcnRpb24gcGhhc2U6XG5cblx0XHQvLyBDcmVhdGUgYSBjb3B5IG9mIGFyZ3VtZW50cyAoYXZvaWQgbGVha2luZyBkZW9wdGltaXphdGlvbilcblx0XHRhcmdzID0gbmV3IEFycmF5KCBsZW4gKTtcblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0YXJnc1sgaSBdID0gYXJndW1lbnRzWyBpIF07XG5cdFx0fVxuXG5cdFx0bm9kZSA9IHtcblx0XHRcdGFyZ3M6IGFyZ3MsXG5cblx0XHRcdC8vIEdlbmVyYXRlIHRoZSByZXN1bHQgZnJvbSBvcmlnaW5hbCBmdW5jdGlvblxuXHRcdFx0dmFsOiBmbi5hcHBseSggbnVsbCwgYXJncyApXG5cdFx0fTtcblxuXHRcdC8vIERvbid0IG5lZWQgdG8gY2hlY2sgd2hldGhlciBub2RlIGlzIGFscmVhZHkgaGVhZCwgc2luY2UgaXQgd291bGRcblx0XHQvLyBoYXZlIGJlZW4gcmV0dXJuZWQgYWJvdmUgYWxyZWFkeSBpZiBpdCB3YXNcblxuXHRcdC8vIFNoaWZ0IGV4aXN0aW5nIGhlYWQgZG93biBsaXN0XG5cdFx0aWYgKCBoZWFkICkge1xuXHRcdFx0aGVhZC5wcmV2ID0gbm9kZTtcblx0XHRcdG5vZGUubmV4dCA9IGhlYWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIElmIG5vIGhlYWQsIGZvbGxvd3MgdGhhdCB0aGVyZSdzIG5vIHRhaWwgKGF0IGluaXRpYWwgb3IgcmVzZXQpXG5cdFx0XHR0YWlsID0gbm9kZTtcblx0XHR9XG5cblx0XHQvLyBUcmltIHRhaWwgaWYgd2UncmUgcmVhY2hlZCBtYXggc2l6ZSBhbmQgYXJlIHBlbmRpbmcgY2FjaGUgaW5zZXJ0aW9uXG5cdFx0aWYgKCBzaXplID09PSBtYXhTaXplICkge1xuXHRcdFx0dGFpbCA9IHRhaWwucHJldjtcblx0XHRcdHRhaWwubmV4dCA9IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNpemUrKztcblx0XHR9XG5cblx0XHRoZWFkID0gbm9kZTtcblxuXHRcdHJldHVybiBub2RlLnZhbDtcblx0fVxuXG5cdG1lbW9pemVkLmNsZWFyID0gZnVuY3Rpb24oKSB7XG5cdFx0aGVhZCA9IG51bGw7XG5cdFx0dGFpbCA9IG51bGw7XG5cdFx0c2l6ZSA9IDA7XG5cdH07XG5cblx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnICkge1xuXHRcdC8vIENhY2hlIGlzIG5vdCBleHBvc2VkIGluIHRoZSBwdWJsaWMgQVBJLCBidXQgdXNlZCBpbiB0ZXN0cyB0byBlbnN1cmVcblx0XHQvLyBleHBlY3RlZCBsaXN0IHByb2dyZXNzaW9uXG5cdFx0bWVtb2l6ZWQuZ2V0Q2FjaGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBbIGhlYWQsIHRhaWwsIHNpemUgXTtcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIG1lbW9pemVkO1xufTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIvKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAocm9vdCwgcGx1cmFsaXplKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICh0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBOb2RlLlxuICAgIG1vZHVsZS5leHBvcnRzID0gcGx1cmFsaXplKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELCByZWdpc3RlcnMgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHBsdXJhbGl6ZSgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsLlxuICAgIHJvb3QucGx1cmFsaXplID0gcGx1cmFsaXplKCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgLy8gUnVsZSBzdG9yYWdlIC0gcGx1cmFsaXplIGFuZCBzaW5ndWxhcml6ZSBuZWVkIHRvIGJlIHJ1biBzZXF1ZW50aWFsbHksXG4gIC8vIHdoaWxlIG90aGVyIHJ1bGVzIGNhbiBiZSBvcHRpbWl6ZWQgdXNpbmcgYW4gb2JqZWN0IGZvciBpbnN0YW50IGxvb2t1cHMuXG4gIHZhciBwbHVyYWxSdWxlcyA9IFtdO1xuICB2YXIgc2luZ3VsYXJSdWxlcyA9IFtdO1xuICB2YXIgdW5jb3VudGFibGVzID0ge307XG4gIHZhciBpcnJlZ3VsYXJQbHVyYWxzID0ge307XG4gIHZhciBpcnJlZ3VsYXJTaW5nbGVzID0ge307XG5cbiAgLyoqXG4gICAqIFNhbml0aXplIGEgcGx1cmFsaXphdGlvbiBydWxlIHRvIGEgdXNhYmxlIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtICB7KFJlZ0V4cHxzdHJpbmcpfSBydWxlXG4gICAqIEByZXR1cm4ge1JlZ0V4cH1cbiAgICovXG4gIGZ1bmN0aW9uIHNhbml0aXplUnVsZSAocnVsZSkge1xuICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHJ1bGUgKyAnJCcsICdpJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJ1bGU7XG4gIH1cblxuICAvKipcbiAgICogUGFzcyBpbiBhIHdvcmQgdG9rZW4gdG8gcHJvZHVjZSBhIGZ1bmN0aW9uIHRoYXQgY2FuIHJlcGxpY2F0ZSB0aGUgY2FzZSBvblxuICAgKiBhbm90aGVyIHdvcmQuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB3b3JkXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB0b2tlblxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIHJlc3RvcmVDYXNlICh3b3JkLCB0b2tlbikge1xuICAgIC8vIFRva2VucyBhcmUgYW4gZXhhY3QgbWF0Y2guXG4gICAgaWYgKHdvcmQgPT09IHRva2VuKSByZXR1cm4gdG9rZW47XG5cbiAgICAvLyBMb3dlciBjYXNlZCB3b3Jkcy4gRS5nLiBcImhlbGxvXCIuXG4gICAgaWYgKHdvcmQgPT09IHdvcmQudG9Mb3dlckNhc2UoKSkgcmV0dXJuIHRva2VuLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyBVcHBlciBjYXNlZCB3b3Jkcy4gRS5nLiBcIldISVNLWVwiLlxuICAgIGlmICh3b3JkID09PSB3b3JkLnRvVXBwZXJDYXNlKCkpIHJldHVybiB0b2tlbi50b1VwcGVyQ2FzZSgpO1xuXG4gICAgLy8gVGl0bGUgY2FzZWQgd29yZHMuIEUuZy4gXCJUaXRsZVwiLlxuICAgIGlmICh3b3JkWzBdID09PSB3b3JkWzBdLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiB0b2tlbi5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRva2VuLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIC8vIExvd2VyIGNhc2VkIHdvcmRzLiBFLmcuIFwidGVzdFwiLlxuICAgIHJldHVybiB0b2tlbi50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVycG9sYXRlIGEgcmVnZXhwIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAgICogQHBhcmFtICB7QXJyYXl9ICBhcmdzXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIGludGVycG9sYXRlIChzdHIsIGFyZ3MpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcJChcXGR7MSwyfSkvZywgZnVuY3Rpb24gKG1hdGNoLCBpbmRleCkge1xuICAgICAgcmV0dXJuIGFyZ3NbaW5kZXhdIHx8ICcnO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgYSB3b3JkIHVzaW5nIGEgcnVsZS5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSB3b3JkXG4gICAqIEBwYXJhbSAge0FycmF5fSAgcnVsZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlICh3b3JkLCBydWxlKSB7XG4gICAgcmV0dXJuIHdvcmQucmVwbGFjZShydWxlWzBdLCBmdW5jdGlvbiAobWF0Y2gsIGluZGV4KSB7XG4gICAgICB2YXIgcmVzdWx0ID0gaW50ZXJwb2xhdGUocnVsZVsxXSwgYXJndW1lbnRzKTtcblxuICAgICAgaWYgKG1hdGNoID09PSAnJykge1xuICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2Uod29yZFtpbmRleCAtIDFdLCByZXN1bHQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdG9yZUNhc2UobWF0Y2gsIHJlc3VsdCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2FuaXRpemUgYSB3b3JkIGJ5IHBhc3NpbmcgaW4gdGhlIHdvcmQgYW5kIHNhbml0aXphdGlvbiBydWxlcy5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIHRva2VuXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB3b3JkXG4gICAqIEBwYXJhbSAge0FycmF5fSAgICBydWxlc1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBzYW5pdGl6ZVdvcmQgKHRva2VuLCB3b3JkLCBydWxlcykge1xuICAgIC8vIEVtcHR5IHN0cmluZyBvciBkb2Vzbid0IG5lZWQgZml4aW5nLlxuICAgIGlmICghdG9rZW4ubGVuZ3RoIHx8IHVuY291bnRhYmxlcy5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgIHJldHVybiB3b3JkO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBydWxlcy5sZW5ndGg7XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIHNhbml0aXphdGlvbiBydWxlcyBhbmQgdXNlIHRoZSBmaXJzdCBvbmUgdG8gbWF0Y2guXG4gICAgd2hpbGUgKGxlbi0tKSB7XG4gICAgICB2YXIgcnVsZSA9IHJ1bGVzW2xlbl07XG5cbiAgICAgIGlmIChydWxlWzBdLnRlc3Qod29yZCkpIHJldHVybiByZXBsYWNlKHdvcmQsIHJ1bGUpO1xuICAgIH1cblxuICAgIHJldHVybiB3b3JkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgYSB3b3JkIHdpdGggdGhlIHVwZGF0ZWQgd29yZC5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIHJlcGxhY2VNYXBcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIGtlZXBNYXBcbiAgICogQHBhcmFtICB7QXJyYXl9ICAgIHJ1bGVzXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVdvcmQgKHJlcGxhY2VNYXAsIGtlZXBNYXAsIHJ1bGVzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgICAvLyBHZXQgdGhlIGNvcnJlY3QgdG9rZW4gYW5kIGNhc2UgcmVzdG9yYXRpb24gZnVuY3Rpb25zLlxuICAgICAgdmFyIHRva2VuID0gd29yZC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAvLyBDaGVjayBhZ2FpbnN0IHRoZSBrZWVwIG9iamVjdCBtYXAuXG4gICAgICBpZiAoa2VlcE1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKHdvcmQsIHRva2VuKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgYWdhaW5zdCB0aGUgcmVwbGFjZW1lbnQgbWFwIGZvciBhIGRpcmVjdCB3b3JkIHJlcGxhY2VtZW50LlxuICAgICAgaWYgKHJlcGxhY2VNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3JkLCByZXBsYWNlTWFwW3Rva2VuXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biBhbGwgdGhlIHJ1bGVzIGFnYWluc3QgdGhlIHdvcmQuXG4gICAgICByZXR1cm4gc2FuaXRpemVXb3JkKHRva2VuLCB3b3JkLCBydWxlcyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHdvcmQgaXMgcGFydCBvZiB0aGUgbWFwLlxuICAgKi9cbiAgZnVuY3Rpb24gY2hlY2tXb3JkIChyZXBsYWNlTWFwLCBrZWVwTWFwLCBydWxlcywgYm9vbCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAod29yZCkge1xuICAgICAgdmFyIHRva2VuID0gd29yZC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAoa2VlcE1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHJldHVybiB0cnVlO1xuICAgICAgaWYgKHJlcGxhY2VNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHJldHVybiBzYW5pdGl6ZVdvcmQodG9rZW4sIHRva2VuLCBydWxlcykgPT09IHRva2VuO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUGx1cmFsaXplIG9yIHNpbmd1bGFyaXplIGEgd29yZCBiYXNlZCBvbiB0aGUgcGFzc2VkIGluIGNvdW50LlxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICB3b3JkICAgICAgVGhlIHdvcmQgdG8gcGx1cmFsaXplXG4gICAqIEBwYXJhbSAge251bWJlcn0gIGNvdW50ICAgICBIb3cgbWFueSBvZiB0aGUgd29yZCBleGlzdFxuICAgKiBAcGFyYW0gIHtib29sZWFufSBpbmNsdXNpdmUgV2hldGhlciB0byBwcmVmaXggd2l0aCB0aGUgbnVtYmVyIChlLmcuIDMgZHVja3MpXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIHBsdXJhbGl6ZSAod29yZCwgY291bnQsIGluY2x1c2l2ZSkge1xuICAgIHZhciBwbHVyYWxpemVkID0gY291bnQgPT09IDFcbiAgICAgID8gcGx1cmFsaXplLnNpbmd1bGFyKHdvcmQpIDogcGx1cmFsaXplLnBsdXJhbCh3b3JkKTtcblxuICAgIHJldHVybiAoaW5jbHVzaXZlID8gY291bnQgKyAnICcgOiAnJykgKyBwbHVyYWxpemVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsdXJhbGl6ZSBhIHdvcmQuXG4gICAqXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIHBsdXJhbGl6ZS5wbHVyYWwgPSByZXBsYWNlV29yZChcbiAgICBpcnJlZ3VsYXJTaW5nbGVzLCBpcnJlZ3VsYXJQbHVyYWxzLCBwbHVyYWxSdWxlc1xuICApO1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHdvcmQgaXMgcGx1cmFsLlxuICAgKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBwbHVyYWxpemUuaXNQbHVyYWwgPSBjaGVja1dvcmQoXG4gICAgaXJyZWd1bGFyU2luZ2xlcywgaXJyZWd1bGFyUGx1cmFscywgcGx1cmFsUnVsZXNcbiAgKTtcblxuICAvKipcbiAgICogU2luZ3VsYXJpemUgYSB3b3JkLlxuICAgKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBwbHVyYWxpemUuc2luZ3VsYXIgPSByZXBsYWNlV29yZChcbiAgICBpcnJlZ3VsYXJQbHVyYWxzLCBpcnJlZ3VsYXJTaW5nbGVzLCBzaW5ndWxhclJ1bGVzXG4gICk7XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgd29yZCBpcyBzaW5ndWxhci5cbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgcGx1cmFsaXplLmlzU2luZ3VsYXIgPSBjaGVja1dvcmQoXG4gICAgaXJyZWd1bGFyUGx1cmFscywgaXJyZWd1bGFyU2luZ2xlcywgc2luZ3VsYXJSdWxlc1xuICApO1xuXG4gIC8qKlxuICAgKiBBZGQgYSBwbHVyYWxpemF0aW9uIHJ1bGUgdG8gdGhlIGNvbGxlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHApfSBydWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICByZXBsYWNlbWVudFxuICAgKi9cbiAgcGx1cmFsaXplLmFkZFBsdXJhbFJ1bGUgPSBmdW5jdGlvbiAocnVsZSwgcmVwbGFjZW1lbnQpIHtcbiAgICBwbHVyYWxSdWxlcy5wdXNoKFtzYW5pdGl6ZVJ1bGUocnVsZSksIHJlcGxhY2VtZW50XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBhIHNpbmd1bGFyaXphdGlvbiBydWxlIHRvIHRoZSBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwKX0gcnVsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgcmVwbGFjZW1lbnRcbiAgICovXG4gIHBsdXJhbGl6ZS5hZGRTaW5ndWxhclJ1bGUgPSBmdW5jdGlvbiAocnVsZSwgcmVwbGFjZW1lbnQpIHtcbiAgICBzaW5ndWxhclJ1bGVzLnB1c2goW3Nhbml0aXplUnVsZShydWxlKSwgcmVwbGFjZW1lbnRdKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGFuIHVuY291bnRhYmxlIHdvcmQgcnVsZS5cbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cCl9IHdvcmRcbiAgICovXG4gIHBsdXJhbGl6ZS5hZGRVbmNvdW50YWJsZVJ1bGUgPSBmdW5jdGlvbiAod29yZCkge1xuICAgIGlmICh0eXBlb2Ygd29yZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHVuY291bnRhYmxlc1t3b3JkLnRvTG93ZXJDYXNlKCldID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTZXQgc2luZ3VsYXIgYW5kIHBsdXJhbCByZWZlcmVuY2VzIGZvciB0aGUgd29yZC5cbiAgICBwbHVyYWxpemUuYWRkUGx1cmFsUnVsZSh3b3JkLCAnJDAnKTtcbiAgICBwbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlKHdvcmQsICckMCcpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gaXJyZWd1bGFyIHdvcmQgZGVmaW5pdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNpbmdsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGx1cmFsXG4gICAqL1xuICBwbHVyYWxpemUuYWRkSXJyZWd1bGFyUnVsZSA9IGZ1bmN0aW9uIChzaW5nbGUsIHBsdXJhbCkge1xuICAgIHBsdXJhbCA9IHBsdXJhbC50b0xvd2VyQ2FzZSgpO1xuICAgIHNpbmdsZSA9IHNpbmdsZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaXJyZWd1bGFyU2luZ2xlc1tzaW5nbGVdID0gcGx1cmFsO1xuICAgIGlycmVndWxhclBsdXJhbHNbcGx1cmFsXSA9IHNpbmdsZTtcbiAgfTtcblxuICAvKipcbiAgICogSXJyZWd1bGFyIHJ1bGVzLlxuICAgKi9cbiAgW1xuICAgIC8vIFByb25vdW5zLlxuICAgIFsnSScsICd3ZSddLFxuICAgIFsnbWUnLCAndXMnXSxcbiAgICBbJ2hlJywgJ3RoZXknXSxcbiAgICBbJ3NoZScsICd0aGV5J10sXG4gICAgWyd0aGVtJywgJ3RoZW0nXSxcbiAgICBbJ215c2VsZicsICdvdXJzZWx2ZXMnXSxcbiAgICBbJ3lvdXJzZWxmJywgJ3lvdXJzZWx2ZXMnXSxcbiAgICBbJ2l0c2VsZicsICd0aGVtc2VsdmVzJ10sXG4gICAgWydoZXJzZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgICBbJ2hpbXNlbGYnLCAndGhlbXNlbHZlcyddLFxuICAgIFsndGhlbXNlbGYnLCAndGhlbXNlbHZlcyddLFxuICAgIFsnaXMnLCAnYXJlJ10sXG4gICAgWyd3YXMnLCAnd2VyZSddLFxuICAgIFsnaGFzJywgJ2hhdmUnXSxcbiAgICBbJ3RoaXMnLCAndGhlc2UnXSxcbiAgICBbJ3RoYXQnLCAndGhvc2UnXSxcbiAgICAvLyBXb3JkcyBlbmRpbmcgaW4gd2l0aCBhIGNvbnNvbmFudCBhbmQgYG9gLlxuICAgIFsnZWNobycsICdlY2hvZXMnXSxcbiAgICBbJ2RpbmdvJywgJ2RpbmdvZXMnXSxcbiAgICBbJ3ZvbGNhbm8nLCAndm9sY2Fub2VzJ10sXG4gICAgWyd0b3JuYWRvJywgJ3Rvcm5hZG9lcyddLFxuICAgIFsndG9ycGVkbycsICd0b3JwZWRvZXMnXSxcbiAgICAvLyBFbmRzIHdpdGggYHVzYC5cbiAgICBbJ2dlbnVzJywgJ2dlbmVyYSddLFxuICAgIFsndmlzY3VzJywgJ3Zpc2NlcmEnXSxcbiAgICAvLyBFbmRzIHdpdGggYG1hYC5cbiAgICBbJ3N0aWdtYScsICdzdGlnbWF0YSddLFxuICAgIFsnc3RvbWEnLCAnc3RvbWF0YSddLFxuICAgIFsnZG9nbWEnLCAnZG9nbWF0YSddLFxuICAgIFsnbGVtbWEnLCAnbGVtbWF0YSddLFxuICAgIFsnc2NoZW1hJywgJ3NjaGVtYXRhJ10sXG4gICAgWydhbmF0aGVtYScsICdhbmF0aGVtYXRhJ10sXG4gICAgLy8gT3RoZXIgaXJyZWd1bGFyIHJ1bGVzLlxuICAgIFsnb3gnLCAnb3hlbiddLFxuICAgIFsnYXhlJywgJ2F4ZXMnXSxcbiAgICBbJ2RpZScsICdkaWNlJ10sXG4gICAgWyd5ZXMnLCAneWVzZXMnXSxcbiAgICBbJ2Zvb3QnLCAnZmVldCddLFxuICAgIFsnZWF2ZScsICdlYXZlcyddLFxuICAgIFsnZ29vc2UnLCAnZ2Vlc2UnXSxcbiAgICBbJ3Rvb3RoJywgJ3RlZXRoJ10sXG4gICAgWydxdWl6JywgJ3F1aXp6ZXMnXSxcbiAgICBbJ2h1bWFuJywgJ2h1bWFucyddLFxuICAgIFsncHJvb2YnLCAncHJvb2ZzJ10sXG4gICAgWydjYXJ2ZScsICdjYXJ2ZXMnXSxcbiAgICBbJ3ZhbHZlJywgJ3ZhbHZlcyddLFxuICAgIFsnbG9vZXknLCAnbG9vaWVzJ10sXG4gICAgWyd0aGllZicsICd0aGlldmVzJ10sXG4gICAgWydncm9vdmUnLCAnZ3Jvb3ZlcyddLFxuICAgIFsncGlja2F4ZScsICdwaWNrYXhlcyddLFxuICAgIFsncGFzc2VyYnknLCAncGFzc2Vyc2J5J11cbiAgXS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgcmV0dXJuIHBsdXJhbGl6ZS5hZGRJcnJlZ3VsYXJSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xuICB9KTtcblxuICAvKipcbiAgICogUGx1cmFsaXphdGlvbiBydWxlcy5cbiAgICovXG4gIFtcbiAgICBbL3M/JC9pLCAncyddLFxuICAgIFsvW15cXHUwMDAwLVxcdTAwN0ZdJC9pLCAnJDAnXSxcbiAgICBbLyhbXmFlaW91XWVzZSkkL2ksICckMSddLFxuICAgIFsvKGF4fHRlc3QpaXMkL2ksICckMWVzJ10sXG4gICAgWy8oYWxpYXN8W15hb3VddXN8dFtsbV1hc3xnYXN8cmlzKSQvaSwgJyQxZXMnXSxcbiAgICBbLyhlW21uXXUpcz8kL2ksICckMXMnXSxcbiAgICBbLyhbXmxdaWFzfFthZWlvdV1sYXN8W2VqenJdYXN8W2l1XWFtKSQvaSwgJyQxJ10sXG4gICAgWy8oYWx1bW58c3lsbGFifHZpcnxyYWRpfG51Y2xlfGZ1bmd8Y2FjdHxzdGltdWx8dGVybWlufGJhY2lsbHxmb2N8dXRlcnxsb2N8c3RyYXQpKD86dXN8aSkkL2ksICckMWknXSxcbiAgICBbLyhhbHVtbnxhbGd8dmVydGVicikoPzphfGFlKSQvaSwgJyQxYWUnXSxcbiAgICBbLyhzZXJhcGh8Y2hlcnViKSg/OmltKT8kL2ksICckMWltJ10sXG4gICAgWy8oaGVyfGF0fGdyKW8kL2ksICckMW9lcyddLFxuICAgIFsvKGFnZW5kfGFkZGVuZHxtaWxsZW5uaXxkYXR8ZXh0cmVtfGJhY3Rlcml8ZGVzaWRlcmF0fHN0cmF0fGNhbmRlbGFicnxlcnJhdHxvdnxzeW1wb3NpfGN1cnJpY3VsfGF1dG9tYXR8cXVvcikoPzphfHVtKSQvaSwgJyQxYSddLFxuICAgIFsvKGFwaGVsaXxoeXBlcmJhdHxwZXJpaGVsaXxhc3luZGV0fG5vdW1lbnxwaGVub21lbnxjcml0ZXJpfG9yZ2FufHByb2xlZ29tZW58aGVkcnxhdXRvbWF0KSg/OmF8b24pJC9pLCAnJDFhJ10sXG4gICAgWy9zaXMkL2ksICdzZXMnXSxcbiAgICBbLyg/Oihrbml8d2l8bGkpZmV8KGFyfGx8ZWF8ZW98b2F8aG9vKWYpJC9pLCAnJDEkMnZlcyddLFxuICAgIFsvKFteYWVpb3V5XXxxdSl5JC9pLCAnJDFpZXMnXSxcbiAgICBbLyhbXmNoXVtpZW9dW2xuXSlleSQvaSwgJyQxaWVzJ10sXG4gICAgWy8oeHxjaHxzc3xzaHx6eikkL2ksICckMWVzJ10sXG4gICAgWy8obWF0cnxjb2R8bXVyfHNpbHx2ZXJ0fGluZHxhcHBlbmQpKD86aXh8ZXgpJC9pLCAnJDFpY2VzJ10sXG4gICAgWy9cXGIoKD86dGl0KT9tfGwpKD86aWNlfG91c2UpJC9pLCAnJDFpY2UnXSxcbiAgICBbLyhwZSkoPzpyc29ufG9wbGUpJC9pLCAnJDFvcGxlJ10sXG4gICAgWy8oY2hpbGQpKD86cmVuKT8kL2ksICckMXJlbiddLFxuICAgIFsvZWF1eCQvaSwgJyQwJ10sXG4gICAgWy9tW2FlXW4kL2ksICdtZW4nXSxcbiAgICBbJ3Rob3UnLCAneW91J11cbiAgXS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgcmV0dXJuIHBsdXJhbGl6ZS5hZGRQbHVyYWxSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xuICB9KTtcblxuICAvKipcbiAgICogU2luZ3VsYXJpemF0aW9uIHJ1bGVzLlxuICAgKi9cbiAgW1xuICAgIFsvcyQvaSwgJyddLFxuICAgIFsvKHNzKSQvaSwgJyQxJ10sXG4gICAgWy8od2l8a25pfCg/OmFmdGVyfGhhbGZ8aGlnaHxsb3d8bWlkfG5vbnxuaWdodHxbXlxcd118XilsaSl2ZXMkL2ksICckMWZlJ10sXG4gICAgWy8oYXJ8KD86d298W2FlXSlsfFtlb11bYW9dKXZlcyQvaSwgJyQxZiddLFxuICAgIFsvaWVzJC9pLCAneSddLFxuICAgIFsvXFxiKFtwbF18em9tYnwoPzpuZWNrfGNyb3NzKT90fGNvbGx8ZmFlcnxmb29kfGdlbnxnb29ufGdyb3VwfGxhc3N8dGFsa3xnb2FsfGN1dClpZXMkL2ksICckMWllJ10sXG4gICAgWy9cXGIobW9ufHNtaWwpaWVzJC9pLCAnJDFleSddLFxuICAgIFsvXFxiKCg/OnRpdCk/bXxsKWljZSQvaSwgJyQxb3VzZSddLFxuICAgIFsvKHNlcmFwaHxjaGVydWIpaW0kL2ksICckMSddLFxuICAgIFsvKHh8Y2h8c3N8c2h8enp8dHRvfGdvfGNob3xhbGlhc3xbXmFvdV11c3x0W2xtXWFzfGdhc3woPzpoZXJ8YXR8Z3Ipb3xbYWVpb3VdcmlzKSg/OmVzKT8kL2ksICckMSddLFxuICAgIFsvKGFuYWx5fGRpYWdub3xwYXJlbnRoZXxwcm9nbm98c3lub3B8dGhlfGVtcGhhfGNyaXxuZSkoPzpzaXN8c2VzKSQvaSwgJyQxc2lzJ10sXG4gICAgWy8obW92aWV8dHdlbHZlfGFidXNlfGVbbW5ddSlzJC9pLCAnJDEnXSxcbiAgICBbLyh0ZXN0KSg/OmlzfGVzKSQvaSwgJyQxaXMnXSxcbiAgICBbLyhhbHVtbnxzeWxsYWJ8dmlyfHJhZGl8bnVjbGV8ZnVuZ3xjYWN0fHN0aW11bHx0ZXJtaW58YmFjaWxsfGZvY3x1dGVyfGxvY3xzdHJhdCkoPzp1c3xpKSQvaSwgJyQxdXMnXSxcbiAgICBbLyhhZ2VuZHxhZGRlbmR8bWlsbGVubml8ZGF0fGV4dHJlbXxiYWN0ZXJpfGRlc2lkZXJhdHxzdHJhdHxjYW5kZWxhYnJ8ZXJyYXR8b3Z8c3ltcG9zaXxjdXJyaWN1bHxxdW9yKWEkL2ksICckMXVtJ10sXG4gICAgWy8oYXBoZWxpfGh5cGVyYmF0fHBlcmloZWxpfGFzeW5kZXR8bm91bWVufHBoZW5vbWVufGNyaXRlcml8b3JnYW58cHJvbGVnb21lbnxoZWRyfGF1dG9tYXQpYSQvaSwgJyQxb24nXSxcbiAgICBbLyhhbHVtbnxhbGd8dmVydGVicilhZSQvaSwgJyQxYSddLFxuICAgIFsvKGNvZHxtdXJ8c2lsfHZlcnR8aW5kKWljZXMkL2ksICckMWV4J10sXG4gICAgWy8obWF0cnxhcHBlbmQpaWNlcyQvaSwgJyQxaXgnXSxcbiAgICBbLyhwZSkocnNvbnxvcGxlKSQvaSwgJyQxcnNvbiddLFxuICAgIFsvKGNoaWxkKXJlbiQvaSwgJyQxJ10sXG4gICAgWy8oZWF1KXg/JC9pLCAnJDEnXSxcbiAgICBbL21lbiQvaSwgJ21hbiddXG4gIF0uZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgIHJldHVybiBwbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xuICB9KTtcblxuICAvKipcbiAgICogVW5jb3VudGFibGUgcnVsZXMuXG4gICAqL1xuICBbXG4gICAgLy8gU2luZ3VsYXIgd29yZHMgd2l0aCBubyBwbHVyYWxzLlxuICAgICdhZHVsdGhvb2QnLFxuICAgICdhZHZpY2UnLFxuICAgICdhZ2VuZGEnLFxuICAgICdhaWQnLFxuICAgICdhaXJjcmFmdCcsXG4gICAgJ2FsY29ob2wnLFxuICAgICdhbW1vJyxcbiAgICAnYW5hbHl0aWNzJyxcbiAgICAnYW5pbWUnLFxuICAgICdhdGhsZXRpY3MnLFxuICAgICdhdWRpbycsXG4gICAgJ2Jpc29uJyxcbiAgICAnYmxvb2QnLFxuICAgICdicmVhbScsXG4gICAgJ2J1ZmZhbG8nLFxuICAgICdidXR0ZXInLFxuICAgICdjYXJwJyxcbiAgICAnY2FzaCcsXG4gICAgJ2NoYXNzaXMnLFxuICAgICdjaGVzcycsXG4gICAgJ2Nsb3RoaW5nJyxcbiAgICAnY29kJyxcbiAgICAnY29tbWVyY2UnLFxuICAgICdjb29wZXJhdGlvbicsXG4gICAgJ2NvcnBzJyxcbiAgICAnZGVicmlzJyxcbiAgICAnZGlhYmV0ZXMnLFxuICAgICdkaWdlc3Rpb24nLFxuICAgICdlbGsnLFxuICAgICdlbmVyZ3knLFxuICAgICdlcXVpcG1lbnQnLFxuICAgICdleGNyZXRpb24nLFxuICAgICdleHBlcnRpc2UnLFxuICAgICdmaXJtd2FyZScsXG4gICAgJ2Zsb3VuZGVyJyxcbiAgICAnZnVuJyxcbiAgICAnZ2FsbG93cycsXG4gICAgJ2dhcmJhZ2UnLFxuICAgICdncmFmZml0aScsXG4gICAgJ2hhcmR3YXJlJyxcbiAgICAnaGVhZHF1YXJ0ZXJzJyxcbiAgICAnaGVhbHRoJyxcbiAgICAnaGVycGVzJyxcbiAgICAnaGlnaGppbmtzJyxcbiAgICAnaG9tZXdvcmsnLFxuICAgICdob3VzZXdvcmsnLFxuICAgICdpbmZvcm1hdGlvbicsXG4gICAgJ2plYW5zJyxcbiAgICAnanVzdGljZScsXG4gICAgJ2t1ZG9zJyxcbiAgICAnbGFib3VyJyxcbiAgICAnbGl0ZXJhdHVyZScsXG4gICAgJ21hY2hpbmVyeScsXG4gICAgJ21hY2tlcmVsJyxcbiAgICAnbWFpbCcsXG4gICAgJ21lZGlhJyxcbiAgICAnbWV3cycsXG4gICAgJ21vb3NlJyxcbiAgICAnbXVzaWMnLFxuICAgICdtdWQnLFxuICAgICdtYW5nYScsXG4gICAgJ25ld3MnLFxuICAgICdvbmx5JyxcbiAgICAncGVyc29ubmVsJyxcbiAgICAncGlrZScsXG4gICAgJ3BsYW5rdG9uJyxcbiAgICAncGxpZXJzJyxcbiAgICAncG9saWNlJyxcbiAgICAncG9sbHV0aW9uJyxcbiAgICAncHJlbWlzZXMnLFxuICAgICdyYWluJyxcbiAgICAncmVzZWFyY2gnLFxuICAgICdyaWNlJyxcbiAgICAnc2FsbW9uJyxcbiAgICAnc2Npc3NvcnMnLFxuICAgICdzZXJpZXMnLFxuICAgICdzZXdhZ2UnLFxuICAgICdzaGFtYmxlcycsXG4gICAgJ3NocmltcCcsXG4gICAgJ3NvZnR3YXJlJyxcbiAgICAnc3BlY2llcycsXG4gICAgJ3N0YWZmJyxcbiAgICAnc3dpbmUnLFxuICAgICd0ZW5uaXMnLFxuICAgICd0cmFmZmljJyxcbiAgICAndHJhbnNwb3J0YXRpb24nLFxuICAgICd0cm91dCcsXG4gICAgJ3R1bmEnLFxuICAgICd3ZWFsdGgnLFxuICAgICd3ZWxmYXJlJyxcbiAgICAnd2hpdGluZycsXG4gICAgJ3dpbGRlYmVlc3QnLFxuICAgICd3aWxkbGlmZScsXG4gICAgJ3lvdScsXG4gICAgL3Bva1tlw6ldbW9uJC9pLFxuICAgIC8vIFJlZ2V4ZXMuXG4gICAgL1teYWVpb3VdZXNlJC9pLCAvLyBcImNoaW5lc2VcIiwgXCJqYXBhbmVzZVwiXG4gICAgL2RlZXIkL2ksIC8vIFwiZGVlclwiLCBcInJlaW5kZWVyXCJcbiAgICAvZmlzaCQvaSwgLy8gXCJmaXNoXCIsIFwiYmxvd2Zpc2hcIiwgXCJhbmdlbGZpc2hcIlxuICAgIC9tZWFzbGVzJC9pLFxuICAgIC9vW2l1XXMkL2ksIC8vIFwiY2Fybml2b3JvdXNcIlxuICAgIC9wb3gkL2ksIC8vIFwiY2hpY2twb3hcIiwgXCJzbWFsbHBveFwiXG4gICAgL3NoZWVwJC9pXG4gIF0uZm9yRWFjaChwbHVyYWxpemUuYWRkVW5jb3VudGFibGVSdWxlKTtcblxuICByZXR1cm4gcGx1cmFsaXplO1xufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbiAgdmFyIGhhcyA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcblxuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAoaGFzKHR5cGVTcGVjcywgdHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpZiAodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YXIgZXJyID0gRXJyb3IoXG4gICAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogJyArIGxvY2F0aW9uICsgJyB0eXBlIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgJyArXG4gICAgICAgICAgICAgICdpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJyArIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSArICdgLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciAmJiAhKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJyArXG4gICAgICAgICAgICBsb2NhdGlvbiArICcgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICcgKyB0eXBlb2YgZXJyb3IgKyAnLiAnICtcbiAgICAgICAgICAgICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgK1xuICAgICAgICAgICAgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ZhaWxlZCAnICsgbG9jYXRpb24gKyAnIHR5cGU6ICcgKyBlcnJvci5tZXNzYWdlICsgKHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXNldHMgd2FybmluZyBjYWNoZSB3aGVuIHRlc3RpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2hlY2tQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbnZhciBoYXMgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgZWxlbWVudFR5cGU6IGNyZWF0ZUVsZW1lbnRUeXBlVHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIsXG4gICAgZXhhY3Q6IGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIsXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJyArIHByb3BGdWxsTmFtZSArICdgIHByb3Agb24gYCcgKyBjb21wb25lbnROYW1lICArICdgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZVR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghUmVhY3RJcy5pc1ZhbGlkRWxlbWVudFR5cGUocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQgdHlwZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50cyBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gYXJyYXksIGdvdCAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgYXJndW1lbnRzLiAnICtcbiAgICAgICAgICAgICdBIGNvbW1vbiBtaXN0YWtlIGlzIHRvIHdyaXRlIG9uZU9mKHgsIHksIHopIGluc3RlYWQgb2Ygb25lT2YoW3gsIHksIHpdKS4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGFycmF5LicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcywgZnVuY3Rpb24gcmVwbGFjZXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgU3RyaW5nKHByb3BWYWx1ZSkgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKGhhcyhwcm9wVmFsdWUsIGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZS4gRXhwZWN0ZWQgYW4gYXJyYXkgb2YgY2hlY2sgZnVuY3Rpb25zLCBidXQgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkICcgKyBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcoY2hlY2tlcikgKyAnIGF0IGluZGV4ICcgKyBpICsgJy4nXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgYWxsIGtleXMgaW4gY2FzZSBzb21lIGFyZSByZXF1aXJlZCBidXQgbWlzc2luZyBmcm9tXG4gICAgICAvLyBwcm9wcy5cbiAgICAgIHZhciBhbGxLZXlzID0gYXNzaWduKHt9LCBwcm9wc1twcm9wTmFtZV0sIHNoYXBlVHlwZXMpO1xuICAgICAgZm9yICh2YXIga2V5IGluIGFsbEtleXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgICAgICAgICdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBrZXkgYCcgKyBrZXkgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nICtcbiAgICAgICAgICAgICdcXG5CYWQgb2JqZWN0OiAnICsgSlNPTi5zdHJpbmdpZnkocHJvcHNbcHJvcE5hbWVdLCBudWxsLCAnICAnKSArXG4gICAgICAgICAgICAnXFxuVmFsaWQga2V5czogJyArICBKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhzaGFwZVR5cGVzKSwgbnVsbCwgJyAgJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gICAgLy8gTmF0aXZlIFN5bWJvbC5cbiAgICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBmYWxzeSB2YWx1ZSBjYW4ndCBiZSBhIFN5bWJvbFxuICAgIGlmICghcHJvcFZhbHVlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGUgPSBjaGVja1Byb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZTtcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoUmVhY3RJcy5pc0VsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuIiwiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi44LjZcbiAqIHJlYWN0LWlzLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG52YXIgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yO1xuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIDogMHhlYWM3O1xudmFyIFJFQUNUX1BPUlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucG9ydGFsJykgOiAweGVhY2E7XG52YXIgUkVBQ1RfRlJBR01FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZyYWdtZW50JykgOiAweGVhY2I7XG52YXIgUkVBQ1RfU1RSSUNUX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN0cmljdF9tb2RlJykgOiAweGVhY2M7XG52YXIgUkVBQ1RfUFJPRklMRVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb2ZpbGVyJykgOiAweGVhZDI7XG52YXIgUkVBQ1RfUFJPVklERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb3ZpZGVyJykgOiAweGVhY2Q7XG52YXIgUkVBQ1RfQ09OVEVYVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29udGV4dCcpIDogMHhlYWNlO1xudmFyIFJFQUNUX0FTWU5DX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmFzeW5jX21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbmN1cnJlbnRfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpIDogMHhlYWQwO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpIDogMHhlYWQxO1xudmFyIFJFQUNUX01FTU9fVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0Lm1lbW8nKSA6IDB4ZWFkMztcbnZhciBSRUFDVF9MQVpZX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5sYXp5JykgOiAweGVhZDQ7XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgfHxcbiAgLy8gTm90ZTogaXRzIHR5cGVvZiBtaWdodCBiZSBvdGhlciB0aGFuICdzeW1ib2wnIG9yICdudW1iZXInIGlmIGl0J3MgYSBwb2x5ZmlsbC5cbiAgdHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSB8fCB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCAmJiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTEFaWV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9QUk9WSURFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0NPTlRFWFRfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFKTtcbn1cblxuLyoqXG4gKiBGb3JrZWQgZnJvbSBmYmpzL3dhcm5pbmc6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmJqcy9ibG9iL2U2NmJhMjBhZDViZTQzM2ViNTQ0MjNmMmIwOTdkODI5MzI0ZDlkZTYvcGFja2FnZXMvZmJqcy9zcmMvX19mb3Jrc19fL3dhcm5pbmcuanNcbiAqXG4gKiBPbmx5IGNoYW5nZSBpcyB3ZSB1c2UgY29uc29sZS53YXJuIGluc3RlYWQgb2YgY29uc29sZS5lcnJvcixcbiAqIGFuZCBkbyBub3RoaW5nIHdoZW4gJ2NvbnNvbGUnIGlzIG5vdCBzdXBwb3J0ZWQuXG4gKiBUaGlzIHJlYWxseSBzaW1wbGlmaWVzIHRoZSBjb2RlLlxuICogLS0tXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIGxvd1ByaW9yaXR5V2FybmluZyA9IGZ1bmN0aW9uICgpIHt9O1xuXG57XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xuXG4gIGxvd1ByaW9yaXR5V2FybmluZyA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgbG93UHJpb3JpdHlXYXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxudmFyIGxvd1ByaW9yaXR5V2FybmluZyQxID0gbG93UHJpb3JpdHlXYXJuaW5nO1xuXG5mdW5jdGlvbiB0eXBlT2Yob2JqZWN0KSB7XG4gIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwpIHtcbiAgICB2YXIgJCR0eXBlb2YgPSBvYmplY3QuJCR0eXBlb2Y7XG4gICAgc3dpdGNoICgkJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9FTEVNRU5UX1RZUEU6XG4gICAgICAgIHZhciB0eXBlID0gb2JqZWN0LnR5cGU7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgY2FzZSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0ZSQUdNRU5UX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1RSSUNUX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFyICQkdHlwZW9mVHlwZSA9IHR5cGUgJiYgdHlwZS4kJHR5cGVvZjtcblxuICAgICAgICAgICAgc3dpdGNoICgkJHR5cGVvZlR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9QUk9WSURFUl9UWVBFOlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZlR5cGU7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgICAgcmV0dXJuICQkdHlwZW9mO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8vIEFzeW5jTW9kZSBpcyBkZXByZWNhdGVkIGFsb25nIHdpdGggaXNBc3luY01vZGVcbnZhciBBc3luY01vZGUgPSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG52YXIgQ29uY3VycmVudE1vZGUgPSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbnZhciBDb250ZXh0Q29uc3VtZXIgPSBSRUFDVF9DT05URVhUX1RZUEU7XG52YXIgQ29udGV4dFByb3ZpZGVyID0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbnZhciBFbGVtZW50ID0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xudmFyIEZvcndhcmRSZWYgPSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xudmFyIEZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbnZhciBMYXp5ID0gUkVBQ1RfTEFaWV9UWVBFO1xudmFyIE1lbW8gPSBSRUFDVF9NRU1PX1RZUEU7XG52YXIgUG9ydGFsID0gUkVBQ1RfUE9SVEFMX1RZUEU7XG52YXIgUHJvZmlsZXIgPSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xudmFyIFN0cmljdE1vZGUgPSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xudmFyIFN1c3BlbnNlID0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcblxudmFyIGhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlID0gZmFsc2U7XG5cbi8vIEFzeW5jTW9kZSBzaG91bGQgYmUgZGVwcmVjYXRlZFxuZnVuY3Rpb24gaXNBc3luY01vZGUob2JqZWN0KSB7XG4gIHtcbiAgICBpZiAoIWhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlKSB7XG4gICAgICBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IHRydWU7XG4gICAgICBsb3dQcmlvcml0eVdhcm5pbmckMShmYWxzZSwgJ1RoZSBSZWFjdElzLmlzQXN5bmNNb2RlKCkgYWxpYXMgaGFzIGJlZW4gZGVwcmVjYXRlZCwgJyArICdhbmQgd2lsbCBiZSByZW1vdmVkIGluIFJlYWN0IDE3Ky4gVXBkYXRlIHlvdXIgY29kZSB0byB1c2UgJyArICdSZWFjdElzLmlzQ29uY3VycmVudE1vZGUoKSBpbnN0ZWFkLiBJdCBoYXMgdGhlIGV4YWN0IHNhbWUgQVBJLicpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHx8IHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb250ZXh0Q29uc3VtZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb250ZXh0UHJvdmlkZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRWxlbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRm9yd2FyZFJlZihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xufVxuZnVuY3Rpb24gaXNGcmFnbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNMYXp5KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0xBWllfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTWVtbyhvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9NRU1PX1RZUEU7XG59XG5mdW5jdGlvbiBpc1BvcnRhbChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QT1JUQUxfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUHJvZmlsZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3RyaWN0TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdXNwZW5zZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9TVVNQRU5TRV9UWVBFO1xufVxuXG5leHBvcnRzLnR5cGVPZiA9IHR5cGVPZjtcbmV4cG9ydHMuQXN5bmNNb2RlID0gQXN5bmNNb2RlO1xuZXhwb3J0cy5Db25jdXJyZW50TW9kZSA9IENvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5Db250ZXh0Q29uc3VtZXIgPSBDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLkNvbnRleHRQcm92aWRlciA9IENvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuRWxlbWVudCA9IEVsZW1lbnQ7XG5leHBvcnRzLkZvcndhcmRSZWYgPSBGb3J3YXJkUmVmO1xuZXhwb3J0cy5GcmFnbWVudCA9IEZyYWdtZW50O1xuZXhwb3J0cy5MYXp5ID0gTGF6eTtcbmV4cG9ydHMuTWVtbyA9IE1lbW87XG5leHBvcnRzLlBvcnRhbCA9IFBvcnRhbDtcbmV4cG9ydHMuUHJvZmlsZXIgPSBQcm9maWxlcjtcbmV4cG9ydHMuU3RyaWN0TW9kZSA9IFN0cmljdE1vZGU7XG5leHBvcnRzLlN1c3BlbnNlID0gU3VzcGVuc2U7XG5leHBvcnRzLmlzVmFsaWRFbGVtZW50VHlwZSA9IGlzVmFsaWRFbGVtZW50VHlwZTtcbmV4cG9ydHMuaXNBc3luY01vZGUgPSBpc0FzeW5jTW9kZTtcbmV4cG9ydHMuaXNDb25jdXJyZW50TW9kZSA9IGlzQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLmlzQ29udGV4dENvbnN1bWVyID0gaXNDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLmlzQ29udGV4dFByb3ZpZGVyID0gaXNDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLmlzRWxlbWVudCA9IGlzRWxlbWVudDtcbmV4cG9ydHMuaXNGb3J3YXJkUmVmID0gaXNGb3J3YXJkUmVmO1xuZXhwb3J0cy5pc0ZyYWdtZW50ID0gaXNGcmFnbWVudDtcbmV4cG9ydHMuaXNMYXp5ID0gaXNMYXp5O1xuZXhwb3J0cy5pc01lbW8gPSBpc01lbW87XG5leHBvcnRzLmlzUG9ydGFsID0gaXNQb3J0YWw7XG5leHBvcnRzLmlzUHJvZmlsZXIgPSBpc1Byb2ZpbGVyO1xuZXhwb3J0cy5pc1N0cmljdE1vZGUgPSBpc1N0cmljdE1vZGU7XG5leHBvcnRzLmlzU3VzcGVuc2UgPSBpc1N1c3BlbnNlO1xuICB9KSgpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWlzLnByb2R1Y3Rpb24ubWluLmpzJyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzJyk7XG59XG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1wiaGVscGVyc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJpMThuXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZhbGlkYXRvcnNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsdWVPYmplY3RzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJob29rc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ2ZW5kb3JcIl1bXCJjdWlkXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibG9kYXNoXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZlbmRvclwiXVtcIm1vbWVudFwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9
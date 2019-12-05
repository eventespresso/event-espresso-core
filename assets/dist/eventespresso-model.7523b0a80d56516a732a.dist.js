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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/ZZZ/data/model/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/ZZZ/data/model/assertions.js":
/*!*********************************************!*\
  !*** ./assets/ZZZ/data/model/assertions.js ***!
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

/***/ "./assets/ZZZ/data/model/attendee/constants.js":
/*!*****************************************************!*\
  !*** ./assets/ZZZ/data/model/attendee/constants.js ***!
  \*****************************************************/
/*! exports provided: MODEL_NAMES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return MODEL_NAMES; });
var MODEL_NAMES = {
  MODEL: 'attendee',
  RELATION: 'attendees'
};

/***/ }),

/***/ "./assets/ZZZ/data/model/attendee/index.js":
/*!*************************************************!*\
  !*** ./assets/ZZZ/data/model/attendee/index.js ***!
  \*************************************************/
/*! exports provided: orderByMap, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString, MODEL_NAMES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query */ "./assets/ZZZ/data/model/attendee/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "orderByMap", function() { return _query__WEBPACK_IMPORTED_MODULE_0__["orderByMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_0__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_0__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_0__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_0__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_0__["getQueryString"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/attendee/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["MODEL_NAMES"]; });




/***/ }),

/***/ "./assets/ZZZ/data/model/attendee/query.js":
/*!*************************************************!*\
  !*** ./assets/ZZZ/data/model/attendee/query.js ***!
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
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base */ "./assets/ZZZ/data/model/base.js");
/* harmony import */ var _registration_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../registration/constants */ "./assets/ZZZ/data/model/registration/constants.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/***/ "./assets/ZZZ/data/model/base-date-formatter.js":
/*!******************************************************!*\
  !*** ./assets/ZZZ/data/model/base-date-formatter.js ***!
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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/***/ "./assets/ZZZ/data/model/base.js":
/*!***************************************!*\
  !*** ./assets/ZZZ/data/model/base.js ***!
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

/***/ "./assets/ZZZ/data/model/checkin/constants.js":
/*!****************************************************!*\
  !*** ./assets/ZZZ/data/model/checkin/constants.js ***!
  \****************************************************/
/*! exports provided: MODEL_NAMES, CHECKIN_STATUS_ID, CHECKIN_STATUS_IDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return MODEL_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECKIN_STATUS_ID", function() { return CHECKIN_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECKIN_STATUS_IDS", function() { return CHECKIN_STATUS_IDS; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

var MODEL_NAMES = {
  MODEL: 'checkin',
  RELATION: 'checkins'
};
var CHECKIN_STATUS_ID = {
  STATUS_CHECKED_OUT: false,
  STATUS_CHECKED_IN: true,
  STATUS_CHECKED_NEVER: 2
};
var CHECKIN_STATUS_IDS = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["values"])(CHECKIN_STATUS_ID);

/***/ }),

/***/ "./assets/ZZZ/data/model/checkin/index.js":
/*!************************************************!*\
  !*** ./assets/ZZZ/data/model/checkin/index.js ***!
  \************************************************/
/*! exports provided: MODEL_NAMES, CHECKIN_STATUS_ID, CHECKIN_STATUS_IDS, queryDataTypes, optionsEntityMap, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/checkin/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAMES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CHECKIN_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["CHECKIN_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CHECKIN_STATUS_IDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["CHECKIN_STATUS_IDS"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/ZZZ/data/model/checkin/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "optionsEntityMap", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["optionsEntityMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });




/***/ }),

/***/ "./assets/ZZZ/data/model/checkin/query.js":
/*!************************************************!*\
  !*** ./assets/ZZZ/data/model/checkin/query.js ***!
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
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../status */ "./assets/ZZZ/data/model/status/index.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/ZZZ/data/model/base.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/checkin/constants.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/***/ "./assets/ZZZ/data/model/datetime/constants.js":
/*!*****************************************************!*\
  !*** ./assets/ZZZ/data/model/datetime/constants.js ***!
  \*****************************************************/
/*! exports provided: MODEL_NAMES, DATETIME_STATUS_ID, DATETIME_STATUS_IDS, MINUTE_IN_SECONDS, HOUR_IN_SECONDS, DAY_IN_SECONDS, WEEK_IN_SECONDS, MONTH_IN_SECONDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return MODEL_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_STATUS_ID", function() { return DATETIME_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_STATUS_IDS", function() { return DATETIME_STATUS_IDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MINUTE_IN_SECONDS", function() { return MINUTE_IN_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOUR_IN_SECONDS", function() { return HOUR_IN_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DAY_IN_SECONDS", function() { return DAY_IN_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEEK_IN_SECONDS", function() { return WEEK_IN_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTH_IN_SECONDS", function() { return MONTH_IN_SECONDS; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var MODEL_NAMES = {
  MODEL: 'datetime',
  RELATION: 'datetimes'
};
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

/***/ "./assets/ZZZ/data/model/datetime/formatter.js":
/*!*****************************************************!*\
  !*** ./assets/ZZZ/data/model/datetime/formatter.js ***!
  \*****************************************************/
/*! exports provided: DATE_FIELDS, prettyDateFromDateTime, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_FIELDS", function() { return DATE_FIELDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prettyDateFromDateTime", function() { return prettyDateFromDateTime; });
/* harmony import */ var _base_date_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base-date-formatter */ "./assets/ZZZ/data/model/base-date-formatter.js");
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

/***/ "./assets/ZZZ/data/model/datetime/index.js":
/*!*************************************************!*\
  !*** ./assets/ZZZ/data/model/datetime/index.js ***!
  \*************************************************/
/*! exports provided: MODEL_NAMES, DATETIME_STATUS_ID, DATETIME_STATUS_IDS, MINUTE_IN_SECONDS, HOUR_IN_SECONDS, DAY_IN_SECONDS, WEEK_IN_SECONDS, MONTH_IN_SECONDS, nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString, DATE_FIELDS, prettyDateFromDateTime, isActive, isExpired, isRecentlyExpired, isSoldOut, isUpcoming, isTrashed, status, getBackgroundColorClass, getDateTimeStatusTextLabel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/datetime/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAMES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATETIME_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["DATETIME_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATETIME_STATUS_IDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["DATETIME_STATUS_IDS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MINUTE_IN_SECONDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MINUTE_IN_SECONDS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HOUR_IN_SECONDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["HOUR_IN_SECONDS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DAY_IN_SECONDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["DAY_IN_SECONDS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WEEK_IN_SECONDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["WEEK_IN_SECONDS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MONTH_IN_SECONDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MONTH_IN_SECONDS"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/ZZZ/data/model/datetime/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nowDateAndTime", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["nowDateAndTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });

/* harmony import */ var _formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formatter */ "./assets/ZZZ/data/model/datetime/formatter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATE_FIELDS", function() { return _formatter__WEBPACK_IMPORTED_MODULE_2__["DATE_FIELDS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "prettyDateFromDateTime", function() { return _formatter__WEBPACK_IMPORTED_MODULE_2__["prettyDateFromDateTime"]; });

/* harmony import */ var _status_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./status-helper */ "./assets/ZZZ/data/model/datetime/status-helper.js");
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

/***/ "./assets/ZZZ/data/model/datetime/query.js":
/*!*************************************************!*\
  !*** ./assets/ZZZ/data/model/datetime/query.js ***!
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
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/ZZZ/data/model/base.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/***/ "./assets/ZZZ/data/model/datetime/status-helper.js":
/*!*********************************************************!*\
  !*** ./assets/ZZZ/data/model/datetime/status-helper.js ***!
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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/datetime/constants.js");
/* harmony import */ var _utils_parse_infinity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/parse-infinity */ "./assets/ZZZ/utils/parse-infinity.js");
/**
 * External imports
 */


/**
 * Internal imports
 */



var MODEL = _constants__WEBPACK_IMPORTED_MODULE_2__["MODEL_NAMES"].MODEL;
/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @throws {TypeError}
 */

var assertDateTimeEntity = function assertDateTimeEntity(DateTimeEntity) {
  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntityOfModel"])(DateTimeEntity, MODEL)) {
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

/***/ "./assets/ZZZ/data/model/default-model-state.js":
/*!******************************************************!*\
  !*** ./assets/ZZZ/data/model/default-model-state.js ***!
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
/* harmony import */ var _endpoints_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./endpoints.js */ "./assets/ZZZ/data/model/endpoints.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/***/ "./assets/ZZZ/data/model/endpoints.js":
/*!********************************************!*\
  !*** ./assets/ZZZ/data/model/endpoints.js ***!
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
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertions */ "./assets/ZZZ/data/model/assertions.js");
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

/***/ "./assets/ZZZ/data/model/entity-factory/assertions.js":
/*!************************************************************!*\
  !*** ./assets/ZZZ/data/model/entity-factory/assertions.js ***!
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
/* harmony import */ var _booleans__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./booleans */ "./assets/ZZZ/data/model/entity-factory/booleans.js");
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validators */ "./assets/ZZZ/data/model/entity-factory/validators.js");
/* harmony import */ var _extractors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./extractors */ "./assets/ZZZ/data/model/entity-factory/extractors.js");
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

/***/ "./assets/ZZZ/data/model/entity-factory/base-entity.js":
/*!*************************************************************!*\
  !*** ./assets/ZZZ/data/model/entity-factory/base-entity.js ***!
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
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assertions */ "./assets/ZZZ/data/model/entity-factory/assertions.js");
/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./create */ "./assets/ZZZ/data/model/entity-factory/create.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/entity-factory/constants.js");







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

/***/ "./assets/ZZZ/data/model/entity-factory/booleans.js":
/*!**********************************************************!*\
  !*** ./assets/ZZZ/data/model/entity-factory/booleans.js ***!
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

/***/ "./assets/ZZZ/data/model/entity-factory/constants.js":
/*!***********************************************************!*\
  !*** ./assets/ZZZ/data/model/entity-factory/constants.js ***!
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

/***/ "./assets/ZZZ/data/model/entity-factory/create.js":
/*!********************************************************!*\
  !*** ./assets/ZZZ/data/model/entity-factory/create.js ***!
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
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assertions */ "./assets/ZZZ/data/model/entity-factory/assertions.js");
/* harmony import */ var _extractors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./extractors */ "./assets/ZZZ/data/model/entity-factory/extractors.js");
/* harmony import */ var _booleans__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./booleans */ "./assets/ZZZ/data/model/entity-factory/booleans.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/entity-factory/constants.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/***/ "./assets/ZZZ/data/model/entity-factory/extractors.js":
/*!************************************************************!*\
  !*** ./assets/ZZZ/data/model/entity-factory/extractors.js ***!
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
/* harmony import */ var _model_names__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model-names */ "./assets/ZZZ/data/model/model-names.js");
/* harmony import */ var _booleans__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./booleans */ "./assets/ZZZ/data/model/entity-factory/booleans.js");
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validators */ "./assets/ZZZ/data/model/entity-factory/validators.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/entity-factory/constants.js");
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

/***/ "./assets/ZZZ/data/model/entity-factory/index.js":
/*!*******************************************************!*\
  !*** ./assets/ZZZ/data/model/entity-factory/index.js ***!
  \*******************************************************/
/*! exports provided: BaseEntity, createEntityFactory, MODEL_PREFIXES, SAVE_STATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-entity */ "./assets/ZZZ/data/model/entity-factory/base-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseEntity", function() { return _base_entity__WEBPACK_IMPORTED_MODULE_0__["BaseEntity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createEntityFactory", function() { return _base_entity__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/entity-factory/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_PREFIXES", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["MODEL_PREFIXES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SAVE_STATE", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["SAVE_STATE"]; });




/***/ }),

/***/ "./assets/ZZZ/data/model/entity-factory/validators.js":
/*!************************************************************!*\
  !*** ./assets/ZZZ/data/model/entity-factory/validators.js ***!
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
/* harmony import */ var _booleans__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./booleans */ "./assets/ZZZ/data/model/entity-factory/booleans.js");
/* harmony import */ var _extractors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extractors */ "./assets/ZZZ/data/model/entity-factory/extractors.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/entity-factory/constants.js");
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

/***/ "./assets/ZZZ/data/model/event/constants.js":
/*!**************************************************!*\
  !*** ./assets/ZZZ/data/model/event/constants.js ***!
  \**************************************************/
/*! exports provided: MODEL_NAMES, EVENT_STATUS_ID, EVENT_STATUS_IDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return MODEL_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_STATUS_ID", function() { return EVENT_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_STATUS_IDS", function() { return EVENT_STATUS_IDS; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

var MODEL_NAMES = {
  MODEL: 'event',
  RELATION: 'events'
};
var EVENT_STATUS_ID = {
  SOLD_OUT: 'sold_out',
  POSTPONED: 'postponed',
  CANCELLED: 'cancelled'
};
var EVENT_STATUS_IDS = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["values"])(EVENT_STATUS_ID);

/***/ }),

/***/ "./assets/ZZZ/data/model/event/index.js":
/*!**********************************************!*\
  !*** ./assets/ZZZ/data/model/event/index.js ***!
  \**********************************************/
/*! exports provided: MODEL_NAMES, EVENT_STATUS_ID, EVENT_STATUS_IDS, nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/event/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAMES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EVENT_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EVENT_STATUS_IDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["EVENT_STATUS_IDS"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/ZZZ/data/model/event/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nowDateAndTime", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["nowDateAndTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });




/***/ }),

/***/ "./assets/ZZZ/data/model/event/query.js":
/*!**********************************************!*\
  !*** ./assets/ZZZ/data/model/event/query.js ***!
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
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/ZZZ/data/model/base.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/***/ "./assets/ZZZ/data/model/index.js":
/*!****************************************!*\
  !*** ./assets/ZZZ/data/model/index.js ***!
  \****************************************/
/*! exports provided: assertEntityHasKey, assertImmutableObjectHasPath, assertIsArray, assertIsNotEmpty, assertIsMap, QUERY_ORDER_ASC, QUERY_ORDER_DESC, ALLOWED_ORDER_VALUES, GREATER_THAN, LESS_THAN, GREATER_THAN_AND_EQUAL, LESS_THAN_AND_EQUAL, getQueryString, DEFAULT_LISTS_STATE, DEFAULT_CORE_STATE, DEFAULT_SCHEMA_STATE, baseRestRoute, endpoints, getEndpoint, applyQueryString, stripBaseRouteFromUrl, BaseEntity, createEntityFactory, MODEL_PREFIXES, SAVE_STATE, primaryKeys, valuesForCombinedPrimaryKeys, valueForPrimaryKey, getPrimaryKey, getPrimaryKeyQueryString, getEntityPrimaryKeyValues, keyEntitiesByPrimaryKeyValue, createAndKeyEntitiesByPrimaryKeyValue, MODEL_NAMES, pluralModelName, singularModelName, modelNameForQueryString, attendeeModel, checkInModel, dateTimeModel, eventModel, priceTypeModel, registrationModel, statusModel, ticketModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assertions */ "./assets/ZZZ/data/model/assertions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertEntityHasKey", function() { return _assertions__WEBPACK_IMPORTED_MODULE_0__["assertEntityHasKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertImmutableObjectHasPath", function() { return _assertions__WEBPACK_IMPORTED_MODULE_0__["assertImmutableObjectHasPath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertIsArray", function() { return _assertions__WEBPACK_IMPORTED_MODULE_0__["assertIsArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertIsNotEmpty", function() { return _assertions__WEBPACK_IMPORTED_MODULE_0__["assertIsNotEmpty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assertIsMap", function() { return _assertions__WEBPACK_IMPORTED_MODULE_0__["assertIsMap"]; });

/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./assets/ZZZ/data/model/base.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_ASC", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["QUERY_ORDER_ASC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QUERY_ORDER_DESC", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["QUERY_ORDER_DESC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALLOWED_ORDER_VALUES", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["ALLOWED_ORDER_VALUES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GREATER_THAN", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["GREATER_THAN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LESS_THAN", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["LESS_THAN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GREATER_THAN_AND_EQUAL", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["GREATER_THAN_AND_EQUAL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LESS_THAN_AND_EQUAL", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["LESS_THAN_AND_EQUAL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _base__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });

/* harmony import */ var _default_model_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./default-model-state */ "./assets/ZZZ/data/model/default-model-state.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LISTS_STATE", function() { return _default_model_state__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_LISTS_STATE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CORE_STATE", function() { return _default_model_state__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_CORE_STATE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SCHEMA_STATE", function() { return _default_model_state__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_SCHEMA_STATE"]; });

/* harmony import */ var _endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./endpoints */ "./assets/ZZZ/data/model/endpoints.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "baseRestRoute", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_3__["baseRestRoute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "endpoints", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_3__["endpoints"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getEndpoint", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_3__["getEndpoint"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyQueryString", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_3__["applyQueryString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stripBaseRouteFromUrl", function() { return _endpoints__WEBPACK_IMPORTED_MODULE_3__["stripBaseRouteFromUrl"]; });

/* harmony import */ var _entity_factory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entity-factory */ "./assets/ZZZ/data/model/entity-factory/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseEntity", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_4__["BaseEntity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createEntityFactory", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_4__["createEntityFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_PREFIXES", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_4__["MODEL_PREFIXES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SAVE_STATE", function() { return _entity_factory__WEBPACK_IMPORTED_MODULE_4__["SAVE_STATE"]; });

/* harmony import */ var _primary_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./primary-keys */ "./assets/ZZZ/data/model/primary-keys.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "primaryKeys", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["primaryKeys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "valuesForCombinedPrimaryKeys", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["valuesForCombinedPrimaryKeys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "valueForPrimaryKey", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["valueForPrimaryKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPrimaryKey", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["getPrimaryKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPrimaryKeyQueryString", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["getPrimaryKeyQueryString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getEntityPrimaryKeyValues", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["getEntityPrimaryKeyValues"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keyEntitiesByPrimaryKeyValue", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["keyEntitiesByPrimaryKeyValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAndKeyEntitiesByPrimaryKeyValue", function() { return _primary_keys__WEBPACK_IMPORTED_MODULE_5__["createAndKeyEntitiesByPrimaryKeyValue"]; });

/* harmony import */ var _model_names__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./model-names */ "./assets/ZZZ/data/model/model-names.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return _model_names__WEBPACK_IMPORTED_MODULE_6__["MODEL_NAMES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pluralModelName", function() { return _model_names__WEBPACK_IMPORTED_MODULE_6__["pluralModelName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "singularModelName", function() { return _model_names__WEBPACK_IMPORTED_MODULE_6__["singularModelName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "modelNameForQueryString", function() { return _model_names__WEBPACK_IMPORTED_MODULE_6__["modelNameForQueryString"]; });

/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./models */ "./assets/ZZZ/data/model/models.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "attendeeModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["attendeeModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkInModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["checkInModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateTimeModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["dateTimeModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["eventModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "priceTypeModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["priceTypeModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registrationModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["registrationModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "statusModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["statusModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ticketModel", function() { return _models__WEBPACK_IMPORTED_MODULE_7__["ticketModel"]; });










/***/ }),

/***/ "./assets/ZZZ/data/model/model-names.js":
/*!**********************************************!*\
  !*** ./assets/ZZZ/data/model/model-names.js ***!
  \**********************************************/
/*! exports provided: MODEL_NAMES, pluralModelName, singularModelName, modelNameForQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return MODEL_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pluralModelName", function() { return pluralModelName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "singularModelName", function() { return singularModelName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modelNameForQueryString", function() { return modelNameForQueryString; });
/* harmony import */ var _primary_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./primary-keys.js */ "./assets/ZZZ/data/model/primary-keys.js");
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
  return pluralize__WEBPACK_IMPORTED_MODULE_2___default()(modelName);
});
/**
 * Used to normalize the singular form of a given model name.
 *
 * @param {string} modelName
 * @return {string} Ensures the given modelName is in its singular form.
 */

var singularModelName = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (modelName) {
  return pluralize__WEBPACK_IMPORTED_MODULE_2___default.a.singular(modelName);
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

/***/ "./assets/ZZZ/data/model/models.js":
/*!*****************************************!*\
  !*** ./assets/ZZZ/data/model/models.js ***!
  \*****************************************/
/*! exports provided: attendeeModel, checkInModel, dateTimeModel, eventModel, priceTypeModel, registrationModel, statusModel, ticketModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _attendee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attendee */ "./assets/ZZZ/data/model/attendee/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "attendeeModel", function() { return _attendee__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _checkin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkin */ "./assets/ZZZ/data/model/checkin/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "checkInModel", function() { return _checkin__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datetime */ "./assets/ZZZ/data/model/datetime/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "dateTimeModel", function() { return _datetime__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event */ "./assets/ZZZ/data/model/event/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "eventModel", function() { return _event__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _price_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./price-type */ "./assets/ZZZ/data/model/price-type/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "priceTypeModel", function() { return _price_type__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _registration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./registration */ "./assets/ZZZ/data/model/registration/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "registrationModel", function() { return _registration__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./status */ "./assets/ZZZ/data/model/status/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "statusModel", function() { return _status__WEBPACK_IMPORTED_MODULE_6__; });
/* harmony import */ var _ticket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ticket */ "./assets/ZZZ/data/model/ticket/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ticketModel", function() { return _ticket__WEBPACK_IMPORTED_MODULE_7__; });










/***/ }),

/***/ "./assets/ZZZ/data/model/price-type/constants.js":
/*!*******************************************************!*\
  !*** ./assets/ZZZ/data/model/price-type/constants.js ***!
  \*******************************************************/
/*! exports provided: MODEL_NAMES, BASE_PRICE_TYPES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return MODEL_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BASE_PRICE_TYPES", function() { return BASE_PRICE_TYPES; });
var MODEL_NAMES = {
  MODEL: 'price_type',
  RELATION: 'price_types'
};
var BASE_PRICE_TYPES = {
  BASE_PRICE: 1,
  DISCOUNT: 2,
  SURCHARGE: 3,
  TAX: 4
};

/***/ }),

/***/ "./assets/ZZZ/data/model/price-type/index.js":
/*!***************************************************!*\
  !*** ./assets/ZZZ/data/model/price-type/index.js ***!
  \***************************************************/
/*! exports provided: MODEL_NAMES, BASE_PRICE_TYPES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/price-type/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAMES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BASE_PRICE_TYPES", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["BASE_PRICE_TYPES"]; });



/***/ }),

/***/ "./assets/ZZZ/data/model/primary-keys.js":
/*!***********************************************!*\
  !*** ./assets/ZZZ/data/model/primary-keys.js ***!
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
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assertions */ "./assets/ZZZ/data/model/assertions.js");
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

/***/ "./assets/ZZZ/data/model/registration/constants.js":
/*!*********************************************************!*\
  !*** ./assets/ZZZ/data/model/registration/constants.js ***!
  \*********************************************************/
/*! exports provided: MODEL_NAMES, REGISTRATION_STATUS_IDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return MODEL_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGISTRATION_STATUS_IDS", function() { return REGISTRATION_STATUS_IDS; });
/* harmony import */ var _status_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../status/constants */ "./assets/ZZZ/data/model/status/constants.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Internal Imports
 */

/**
 * External imports
 */


var MODEL_NAMES = {
  MODEL: 'registration',
  RELATION: 'registrations'
};
var REGISTRATION_STATUS_IDS = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(_status_constants__WEBPACK_IMPORTED_MODULE_0__["REGISTRATION_STATUS_ID"]);

/***/ }),

/***/ "./assets/ZZZ/data/model/registration/index.js":
/*!*****************************************************!*\
  !*** ./assets/ZZZ/data/model/registration/index.js ***!
  \*****************************************************/
/*! exports provided: MODEL_NAMES, REGISTRATION_STATUS_IDS, queryDataTypes, optionsEntityMap, defaultQueryData, mapOrderBy, whereConditions, getQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/registration/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAMES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "REGISTRATION_STATUS_IDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["REGISTRATION_STATUS_IDS"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/ZZZ/data/model/registration/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "optionsEntityMap", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["optionsEntityMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });




/***/ }),

/***/ "./assets/ZZZ/data/model/registration/query.js":
/*!*****************************************************!*\
  !*** ./assets/ZZZ/data/model/registration/query.js ***!
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
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base */ "./assets/ZZZ/data/model/base.js");
/* harmony import */ var _status_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../status/constants */ "./assets/ZZZ/data/model/status/constants.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/***/ "./assets/ZZZ/data/model/status/constants.js":
/*!***************************************************!*\
  !*** ./assets/ZZZ/data/model/status/constants.js ***!
  \***************************************************/
/*! exports provided: MODEL_NAMES, STATUS_TYPE_EMAIL, STATUS_TYPE_EVENT, STATUS_TYPE_MESSAGE, STATUS_TYPE_PAYMENT, STATUS_TYPE_REGISTRATION, STATUS_TYPE_TRANSACTION, EMAIL_STATUS_ID, MESSAGE_STATUS_ID, PAYMENT_STATUS_ID, REGISTRATION_STATUS_ID, TRANSACTION_STATUS_ID, CPT_STATUS_ID, UNKNOWN_STATUS_ID, ALL_STATUS_IDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return MODEL_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_EMAIL", function() { return STATUS_TYPE_EMAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_EVENT", function() { return STATUS_TYPE_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_MESSAGE", function() { return STATUS_TYPE_MESSAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_PAYMENT", function() { return STATUS_TYPE_PAYMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_REGISTRATION", function() { return STATUS_TYPE_REGISTRATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_TRANSACTION", function() { return STATUS_TYPE_TRANSACTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMAIL_STATUS_ID", function() { return EMAIL_STATUS_ID; });
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

var MODEL_NAMES = {
  MODEL: 'status',
  RELATION: 'statuses'
}; // types

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
var ALL_STATUS_IDS = [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(EMAIL_STATUS_ID)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(MESSAGE_STATUS_ID)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(PAYMENT_STATUS_ID)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(REGISTRATION_STATUS_ID)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(TRANSACTION_STATUS_ID)), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["values"])(CPT_STATUS_ID)), [UNKNOWN_STATUS_ID]);

/***/ }),

/***/ "./assets/ZZZ/data/model/status/helpers.js":
/*!*************************************************!*\
  !*** ./assets/ZZZ/data/model/status/helpers.js ***!
  \*************************************************/
/*! exports provided: prettyStatus, prettyStatuses */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prettyStatus", function() { return prettyStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prettyStatuses", function() { return prettyStatuses; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/status/constants.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event */ "./assets/ZZZ/data/model/event/index.js");
/* harmony import */ var _ticket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ticket */ "./assets/ZZZ/data/model/ticket/index.js");
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../datetime */ "./assets/ZZZ/data/model/datetime/index.js");
/* harmony import */ var _checkin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../checkin */ "./assets/ZZZ/data/model/checkin/index.js");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @eventespresso/value-objects */ "@eventespresso/value-objects");
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);


var _STATUS_TRANSLATION_M, _STATUS_TRANSLATION_M2, _STATUS_TRANSLATION_M3, _STATUS_TRANSLATION_M4, _STATUS_TRANSLATION_M5, _STATUS_TRANSLATION_M6, _STATUS_TRANSLATION_M7, _STATUS_TRANSLATION_M8, _STATUS_TRANSLATION_M9;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/***/ "./assets/ZZZ/data/model/status/index.js":
/*!***********************************************!*\
  !*** ./assets/ZZZ/data/model/status/index.js ***!
  \***********************************************/
/*! exports provided: MODEL_NAMES, STATUS_TYPE_EMAIL, STATUS_TYPE_EVENT, STATUS_TYPE_MESSAGE, STATUS_TYPE_PAYMENT, STATUS_TYPE_REGISTRATION, STATUS_TYPE_TRANSACTION, EMAIL_STATUS_ID, MESSAGE_STATUS_ID, PAYMENT_STATUS_ID, REGISTRATION_STATUS_ID, TRANSACTION_STATUS_ID, CPT_STATUS_ID, UNKNOWN_STATUS_ID, ALL_STATUS_IDS, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString, prettyStatus, prettyStatuses */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/status/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAMES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_EMAIL", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["STATUS_TYPE_EMAIL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_EVENT", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["STATUS_TYPE_EVENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_MESSAGE", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["STATUS_TYPE_MESSAGE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_PAYMENT", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["STATUS_TYPE_PAYMENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_REGISTRATION", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["STATUS_TYPE_REGISTRATION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "STATUS_TYPE_TRANSACTION", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["STATUS_TYPE_TRANSACTION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EMAIL_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["EMAIL_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MESSAGE_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MESSAGE_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PAYMENT_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["PAYMENT_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "REGISTRATION_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["REGISTRATION_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TRANSACTION_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["TRANSACTION_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CPT_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["CPT_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UNKNOWN_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["UNKNOWN_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALL_STATUS_IDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["ALL_STATUS_IDS"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/ZZZ/data/model/status/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });

/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./assets/ZZZ/data/model/status/helpers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "prettyStatus", function() { return _helpers__WEBPACK_IMPORTED_MODULE_2__["prettyStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "prettyStatuses", function() { return _helpers__WEBPACK_IMPORTED_MODULE_2__["prettyStatuses"]; });





/***/ }),

/***/ "./assets/ZZZ/data/model/status/query.js":
/*!***********************************************!*\
  !*** ./assets/ZZZ/data/model/status/query.js ***!
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
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base */ "./assets/ZZZ/data/model/base.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/***/ "./assets/ZZZ/data/model/ticket/constants.js":
/*!***************************************************!*\
  !*** ./assets/ZZZ/data/model/ticket/constants.js ***!
  \***************************************************/
/*! exports provided: MODEL_NAMES, TICKET_STATUS_ID, TICKET_STATUS_IDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return MODEL_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TICKET_STATUS_ID", function() { return TICKET_STATUS_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TICKET_STATUS_IDS", function() { return TICKET_STATUS_IDS; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

var MODEL_NAMES = {
  MODEL: 'ticket',
  RELATION: 'tickets'
};
var TICKET_STATUS_ID = {
  SOLD_OUT: 'TKS',
  EXPIRED: 'TKE',
  ARCHIVED: 'TKA',
  PENDING: 'TKP',
  ONSALE: 'TKO'
};
var TICKET_STATUS_IDS = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["values"])(TICKET_STATUS_ID);

/***/ }),

/***/ "./assets/ZZZ/data/model/ticket/index.js":
/*!***********************************************!*\
  !*** ./assets/ZZZ/data/model/ticket/index.js ***!
  \***********************************************/
/*! exports provided: MODEL_NAMES, TICKET_STATUS_ID, TICKET_STATUS_IDS, nowDateAndTime, queryDataTypes, defaultQueryData, mapOrderBy, whereConditions, getQueryString, isOnSale, isExpired, isSoldOut, isPending, isArchived, status, getTicketStatusTextLabel, getBackgroundColorClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/ticket/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODEL_NAMES", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAMES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TICKET_STATUS_ID", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["TICKET_STATUS_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TICKET_STATUS_IDS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["TICKET_STATUS_IDS"]; });

/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/ZZZ/data/model/ticket/query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nowDateAndTime", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["nowDateAndTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryDataTypes", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["queryDataTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultQueryData", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["defaultQueryData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapOrderBy", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["mapOrderBy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereConditions", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["whereConditions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getQueryString", function() { return _query__WEBPACK_IMPORTED_MODULE_1__["getQueryString"]; });

/* harmony import */ var _status_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./status-helper */ "./assets/ZZZ/data/model/ticket/status-helper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isOnSale", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["isOnSale"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isExpired", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["isExpired"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSoldOut", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["isSoldOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPending", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["isPending"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isArchived", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["isArchived"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "status", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["status"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTicketStatusTextLabel", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["getTicketStatusTextLabel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getBackgroundColorClass", function() { return _status_helper__WEBPACK_IMPORTED_MODULE_2__["getBackgroundColorClass"]; });





/***/ }),

/***/ "./assets/ZZZ/data/model/ticket/query.js":
/*!***********************************************!*\
  !*** ./assets/ZZZ/data/model/ticket/query.js ***!
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
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base */ "./assets/ZZZ/data/model/base.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/***/ "./assets/ZZZ/data/model/ticket/status-helper.js":
/*!*******************************************************!*\
  !*** ./assets/ZZZ/data/model/ticket/status-helper.js ***!
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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./assets/ZZZ/data/model/ticket/constants.js");
/* harmony import */ var _utils_parse_infinity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/parse-infinity */ "./assets/ZZZ/utils/parse-infinity.js");
/**
 * External imports
 */


/**
 * Internal imports
 */



var MODEL = _constants__WEBPACK_IMPORTED_MODULE_2__["MODEL_NAMES"].MODEL;
/**
 * @function
 * @param {Object} ticketEntity model object
 * @throws {TypeError}
 */

var assertTicketEntity = function assertTicketEntity(ticketEntity) {
  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntityOfModel"])(ticketEntity, MODEL)) {
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

/***/ "./assets/ZZZ/utils/parse-infinity.js":
/*!********************************************!*\
  !*** ./assets/ZZZ/utils/parse-infinity.js ***!
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
    return value < 0 || value === '' || value === 'INF' || value === Infinity || Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isNil"])(value);
  };

  if (number && number.type && number.type.name === 'InfinitySymbol') {
    number = number.props.value;
  }

  number = representsInfinity(number) ? Infinity : number;
  number = number !== Infinity && asInt ? parseInt(number, 10) : number;

  if (isNaN(number)) {
    number = asInt ? -1 : Infinity;
  } // If infinity and for db


  if (number === Infinity && forDb) {
    number = -1;
  }

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



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
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
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

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

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.12.0
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
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE);
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
var lowPriorityWarningWithoutStack = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
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

  lowPriorityWarningWithoutStack = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(void 0, [format].concat(args));
    }
  };
}

var lowPriorityWarningWithoutStack$1 = lowPriorityWarningWithoutStack;

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
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

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
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarningWithoutStack$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
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

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLm1vZGVsL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvWlpaL2RhdGEvbW9kZWwvYXNzZXJ0aW9ucy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL2F0dGVuZGVlL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL2F0dGVuZGVlL2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvWlpaL2RhdGEvbW9kZWwvYXR0ZW5kZWUvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9iYXNlLWRhdGUtZm9ybWF0dGVyLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvWlpaL2RhdGEvbW9kZWwvYmFzZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL2NoZWNraW4vY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvWlpaL2RhdGEvbW9kZWwvY2hlY2tpbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL2NoZWNraW4vcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9kYXRldGltZS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9kYXRldGltZS9mb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9kYXRldGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL2RhdGV0aW1lL3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvWlpaL2RhdGEvbW9kZWwvZGF0ZXRpbWUvc3RhdHVzLWhlbHBlci5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL2RlZmF1bHQtbW9kZWwtc3RhdGUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9lbmRwb2ludHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9hc3NlcnRpb25zLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvWlpaL2RhdGEvbW9kZWwvZW50aXR5LWZhY3RvcnkvYmFzZS1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9ib29sZWFucy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2V4dHJhY3RvcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L3ZhbGlkYXRvcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9ldmVudC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9ldmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL2V2ZW50L3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvWlpaL2RhdGEvbW9kZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9tb2RlbC1uYW1lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL21vZGVscy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL3ByaWNlLXR5cGUvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvWlpaL2RhdGEvbW9kZWwvcHJpY2UtdHlwZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL3ByaW1hcnkta2V5cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL1paWi9kYXRhL21vZGVsL3JlZ2lzdHJhdGlvbi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9zdGF0dXMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvWlpaL2RhdGEvbW9kZWwvc3RhdHVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9zdGF0dXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9zdGF0dXMvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC90aWNrZXQvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvWlpaL2RhdGEvbW9kZWwvdGlja2V0L2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvWlpaL2RhdGEvbW9kZWwvdGlja2V0L3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvWlpaL2RhdGEvbW9kZWwvdGlja2V0L3N0YXR1cy1oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9aWlovdXRpbHMvcGFyc2UtaW5maW5pdHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9tZW1pemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcGx1cmFsaXplL3BsdXJhbGl6ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaGVscGVyc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaTE4blwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsaWRhdG9yc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmFsdWVPYmplY3RzXCJdfSIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiaG9va3NcIl19Iiwid2VicGFjazovL2VlanMubW9kZWwvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZlbmRvclwiLFwiY3VpZFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwidmVuZG9yXCIsXCJtb21lbnRcIl19Il0sIm5hbWVzIjpbImFzc2VydEVudGl0eUhhc0tleSIsImtleSIsImVudGl0eSIsIm1lc3NhZ2UiLCJzcHJpbnRmIiwiX18iLCJoYXNPd25Qcm9wZXJ0eSIsIkV4Y2VwdGlvbiIsImFzc2VydEltbXV0YWJsZU9iamVjdEhhc1BhdGgiLCJwYXRoIiwiaW1tdXRhYmxlIiwiaGFzSW4iLCJhc3NlcnRJc0FycmF5IiwiaXRlbXMiLCJpc0FycmF5IiwiYXNzZXJ0SXNOb3RFbXB0eSIsImlzRW1wdHkiLCJhc3NlcnRJc01hcCIsIml0ZW0iLCJpc01hcCIsIk1PREVMX05BTUVTIiwiTU9ERUwiLCJSRUxBVElPTiIsIm9yZGVyQnlNYXAiLCJpZCIsImxhc3ROYW1lT25seSIsImZpcnN0TmFtZU9ubHkiLCJmaXJzdFRoZW5MYXN0TmFtZSIsImxhc3RUaGVuRmlyc3ROYW1lIiwicXVlcnlEYXRhVHlwZXMiLCJmb3JFdmVudElkIiwiUHJvcFR5cGVzIiwibnVtYmVyIiwiZm9yRGF0ZXRpbWVJZCIsImZvclRpY2tldElkIiwiZm9yU3RhdHVzSWQiLCJvbmVPZiIsIlJFR0lTVFJBVElPTl9TVEFUVVNfSURTIiwiZm9yUmVnaXN0cmF0aW9uSWQiLCJzaG93R3JhdmF0YXIiLCJib29sIiwicXVlcnlEYXRhIiwic2hhcGUiLCJsaW1pdCIsIm9yZGVyQnkiLCJPYmplY3QiLCJrZXlzIiwib3JkZXIiLCJBTExPV0VEX09SREVSX1ZBTFVFUyIsImRlZmF1bHRRdWVyeURhdGEiLCJRVUVSWV9PUkRFUl9BU0MiLCJtYXBPcmRlckJ5IiwiaXNVbmRlZmluZWQiLCJ3aGVyZUNvbmRpdGlvbnMiLCJ3aGVyZSIsInBhcnNlSW50IiwiaXNOYU4iLCJwdXNoIiwiaW5jbHVkZXMiLCJqb2luIiwiZ2V0UXVlcnlTdHJpbmciLCJiYXNlR2V0UXVlcnlTdHJpbmciLCJmb3JtYXREYXRlc09uRW50aXRpZXMiLCJlbnRpdGllcyIsImVudGl0eURhdGVGaWVsZHMiLCJmb3JtYXQiLCJkYXRlRm9ybWF0cyIsImxvY2FsIiwiZm9ybWF0dGVkRW50aXRpZXMiLCJmb3JFYWNoIiwiZm9ybWF0RGF0ZXNPbkVudGl0eSIsIm5ld0VudGl0eSIsImRhdGVGaWVsZCIsImZvcm1hdEVudGl0aWVzRGF0ZXNUb015c3FsIiwiZm9ybWF0RW50aXR5RGF0ZXNUb015c3FsIiwiZm9ybWF0RW50aXRpZXNEYXRlc1RvU2l0ZSIsImZvcm1hdEVudGl0eURhdGVzVG9TaXRlIiwiY29udmVydEVudGl0aWVzRGF0ZXNUb01vbWVudCIsImNvbnZlcnRFbnRpdHlEYXRlc1RvTW9tZW50IiwiUVVFUllfT1JERVJfREVTQyIsIkdSRUFURVJfVEhBTiIsImVuY29kZVVSSUNvbXBvbmVudCIsIkxFU1NfVEhBTiIsIkdSRUFURVJfVEhBTl9BTkRfRVFVQUwiLCJMRVNTX1RIQU5fQU5EX0VRVUFMIiwiZGVmYXVsdFdoZXJlQ29uZGl0aW9ucyIsInF1ZXJ5UGFyYW1zIiwiZmllbGQiLCJxdWVyeVN0cmluZyIsIkNIRUNLSU5fU1RBVFVTX0lEIiwiU1RBVFVTX0NIRUNLRURfT1VUIiwiU1RBVFVTX0NIRUNLRURfSU4iLCJTVEFUVVNfQ0hFQ0tFRF9ORVZFUiIsIkNIRUNLSU5fU1RBVFVTX0lEUyIsInZhbHVlcyIsImNoZWNraW5TdGF0dXMiLCJvcHRpb25zRW50aXR5TWFwIiwiZGVmYXVsdCIsImxhYmVsIiwicHJldHR5U3RhdHVzIiwidmFsdWUiLCJ0aW1lc3RhbXAiLCJEQVRFVElNRV9TVEFUVVNfSUQiLCJBQ1RJVkUiLCJDQU5DRUxMRUQiLCJFWFBJUkVEIiwiSU5BQ1RJVkUiLCJQT1NUUE9ORUQiLCJTT0xEX09VVCIsIlRSQVNIRUQiLCJVUENPTUlORyIsIkRBVEVUSU1FX1NUQVRVU19JRFMiLCJNSU5VVEVfSU5fU0VDT05EUyIsIkhPVVJfSU5fU0VDT05EUyIsIkRBWV9JTl9TRUNPTkRTIiwiV0VFS19JTl9TRUNPTkRTIiwiTU9OVEhfSU5fU0VDT05EUyIsIkRBVEVfRklFTERTIiwiZm9ybWF0dGVycyIsImZvck93biIsImJhc2VGb3JtYXR0ZXIiLCJpbXBsZW1lbnRhdGlvbiIsImZ1bmN0aW9uTmFtZSIsImluY29taW5nQXJncyIsImZpcnN0QXJnIiwicHVsbEF0IiwicHJldHR5RGF0ZUZyb21EYXRlVGltZSIsIkRhdGVUaW1lRW50aXR5IiwiY29udGVudCIsImlzTW9kZWxFbnRpdHlPZk1vZGVsIiwiRFRUX0VWVF9zdGFydCIsImhhc1NhbWUiLCJEVFRfRVZUX2VuZCIsImFsbERhdGVUaW1lc0FzU3RyaW5nIiwiU0VQQVJBVE9SX1NQQUNFX0RBU0hfU1BBQ0UiLCJ0b0Zvcm1hdCIsIkRBVEVfVElNRV9GT1JNQVRfU0lURSIsIlRJTUVfRk9STUFUX1NJVEUiLCJEVFRfbmFtZSIsIm5vd0RhdGVBbmRUaW1lIiwibW9tZW50Iiwic2hvd0V4cGlyZWQiLCJtb250aCIsInN0YXJ0X2RhdGUiLCJlbmRfZGF0ZSIsInN0YXJ0T2YiLCJlbmRPZiIsImFzc2VydERhdGVUaW1lRW50aXR5IiwiVHlwZUVycm9yIiwiaXNWYWxpZEVudGl0eU9yQXJjaGl2ZSIsImluY2x1ZGVUcmFzaGVkIiwiaXNUcmFzaGVkIiwiaXNBY3RpdmUiLCJzdGFydCIsImRpZmZOb3ciLCJhc1NlY29uZHMiLCJlbmQiLCJpc0V4cGlyZWQiLCJpc1JlY2VudGx5RXhwaXJlZCIsImlzU29sZE91dCIsImNhcCIsInJlZ0xpbWl0IiwicGFyc2VJbmZpbml0eSIsIkluZmluaXR5Iiwic29sZCIsImlzVXBjb21pbmciLCJkZWxldGVkIiwic3RhdHVzIiwiZ2V0QmFja2dyb3VuZENvbG9yQ2xhc3MiLCJnZXREYXRlVGltZVN0YXR1c1RleHRMYWJlbCIsImRhdGVTdGF0dXMiLCJtYXBUb09iamVjdFZhbHVlcyIsIm1vZGVsTmFtZUVuZHBvaW50cyIsIm1hcFZhbHVlcyIsImdldERlZmF1bHRNb2RlbEVudGl0aWVzT2JqZWN0IiwibWVtb2l6ZSIsImVuZHBvaW50cyIsIkRFRkFVTFRfTElTVFNfU1RBVEUiLCJERUZBVUxUX0NPUkVfU1RBVEUiLCJyZWxhdGlvbnMiLCJkaXJ0eSIsImluZGV4IiwiZGVsZXRlIiwiYWRkIiwidHJhc2giLCJERUZBVUxUX1NDSEVNQV9TVEFURSIsInNjaGVtYSIsImZhY3RvcnkiLCJyZWxhdGlvbkVuZHBvaW50cyIsInJlbGF0aW9uU2NoZW1hIiwiZGF0YSIsInBhdGhzIiwiY29sbGVjdGlvbl9lbmRwb2ludHMiLCJiYXNlUmVzdFJvdXRlIiwiYmFzZV9yZXN0X3JvdXRlIiwiZ2V0RW5kcG9pbnQiLCJtb2RlbE5hbWUiLCJhcHBseVF1ZXJ5U3RyaW5nIiwic3RyaXBCYXNlUm91dGVGcm9tVXJsIiwidXJsIiwicmVwbGFjZSIsIm1heWJlQXNzZXJ0VmFsdWVPYmplY3QiLCJmaWVsZE5hbWUiLCJmaWVsZFZhbHVlIiwiaXNEYXRlVGltZUZpZWxkIiwiRGF0ZVRpbWUiLCJhc3NlcnRJc0RhdGVUaW1lIiwiaXNNb25leUZpZWxkIiwiTW9uZXkiLCJhc3NlcnRNb25leSIsImFzc2VydFZhbGlkU2NoZW1hIiwiaXNTY2hlbWEiLCJJbnZhbGlkU2NoZW1hIiwiYXNzZXJ0VmFsaWRTY2hlbWFGaWVsZFByb3BlcnRpZXMiLCJ0eXBlIiwicHJvcGVydGllcyIsInJhdyIsImFzc2VydFZhbGlkVmFsdWVGb3JQcmVwYXJlZEZpZWxkIiwiaW5zdGFuY2UiLCJpc1ZhbGlkIiwiaXNTaGFsbG93VmFsaWRWYWx1ZUZvckZpZWxkIiwiZW51bSIsInZhbGlkYXRlRW51bVR5cGUiLCJ2YWxpZGF0ZVR5cGUiLCJtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3RXaXRoQXNzZXJ0aW9ucyIsImFzc2VydFZhbGlkRmllbGRBbmRWYWx1ZUFnYWluc3RTY2hlbWEiLCJ2YWxpZGF0aW9uVHlwZSIsInZhbGlkYXRlVHlwZUZvckZpZWxkIiwiUFJJVkFURV9QUk9QRVJUSUVTIiwiU0FWRV9TVEFURSIsIlZBTElEQVRFX1RZUEVTIiwiQmFzZUVudGl0eSIsImVudGl0eUZpZWxkc0FuZFZhbHVlcyIsImZpZWxkUHJlZml4ZXMiLCJpc05ldyIsIkNMRUFOIiwiY3JlYXRlR2V0dGVyIiwic2V0U2F2ZVN0YXRlIiwiTkVXIiwiU2V0IiwiY3JlYXRlRW50aXR5R2V0dGVyc0FuZFNldHRlcnMiLCJjcmVhdGVQZXJzaXN0aW5nR2V0dGVyc0FuZFNldHRlcnMiLCJzZWFsIiwic2F2ZVN0YXRlIiwiRElSVFkiLCJwcm90ZWN0ZWRGaWVsZHMiLCJsZW5ndGgiLCJpbmRleE9mIiwia2VlcElkIiwiY3JlYXRlRmFjdG9yeSIsImNyZWF0ZUVudGl0eUZhY3RvcnkiLCIkc2NoZW1hIiwiY3JlYXRlTmV3IiwiZm9yQ2xvbmUiLCJuYW1lQ2xhc3MiLCJuYW1lIiwiZXh0ZW5kZWRDbGFzcyIsIkVudGl0eSIsInVwcGVyRmlyc3QiLCJjYW1lbENhc2UiLCJjbGFzc0RlZiIsImZpZWxkc0FuZFZhbHVlcyIsImZyb21FeGlzdGluZyIsImhhc1Jhd1Byb3BlcnR5IiwiaXNQbGFpbk9iamVjdCIsImhhc1ByZXR0eVByb3BlcnR5IiwicHJldHR5IiwiaGFzUmVuZGVyZWRQcm9wZXJ0eSIsInJlbmRlcmVkIiwiaGFzRm9ybWF0UHJvcGVydHkiLCJoYXNFbnVtUHJvcGVydHkiLCJpc1ZhbHVlT2JqZWN0RmllbGQiLCJpc1VUQ0RhdGVUaW1lRmllbGQiLCJkYXRlVGltZUZpZWxkTmFtZSIsImlzUHJpbWFyeUtleUZpZWxkIiwicHJpbWFyeV9rZXkiLCJpc1JlYWRPbmx5IiwicmVhZG9ubHkiLCJpc0VudGl0eUZpZWxkIiwiaXNFbnVtRmllbGQiLCJTeW1ib2wiLCJWQUxJREFURV9UWVBFIiwiUkFXIiwiUkVOREVSRUQiLCJQUkVUVFkiLCJNT0RFTF9QUkVGSVhFUyIsInByZWZpeE1hcCIsImFwcGx5RmlsdGVycyIsImFuc3dlciIsImF0dGVuZGVlIiwiY2hhbmdlX2xvZyIsImNoZWNraW4iLCJjb3VudHJ5IiwiY3VycmVuY3kiLCJjdXJyZW5jeV9wYXltZW50X21ldGhvZCIsImRhdGV0aW1lIiwiZGF0ZXRpbWVfdGlja2V0IiwiZXZlbnQiLCJldmVudF9tZXNzYWdlX3RlbXBsYXRlIiwiZXZlbnRfcXVlc3Rpb25fZ3JvdXAiLCJldmVudF92ZW51ZSIsImV4dHJhX2pvaW4iLCJleHRyYV9tZXRhIiwibGluZV9pdGVtIiwibWVzc2FnZV90ZW1wbGF0ZSIsIm1lc3NhZ2VfdGVtcGxhdGVfZ3JvdXAiLCJwYXltZW50IiwicGF5bWVudF9tZXRob2QiLCJwb3N0X21ldGEiLCJwcmljZSIsInByaWNlX3R5cGUiLCJxdWVzdGlvbiIsInF1ZXN0aW9uX2dyb3VwIiwicXVlc3Rpb25fZ3JvdXBfcXVlc3Rpb24iLCJxdWVzdGlvbl9vcHRpb24iLCJyZWN1cnJlbmNlIiwicmVnaXN0cmF0aW9uIiwicmVnaXN0cmF0aW9uX3BheW1lbnQiLCJzdGF0ZSIsInRlcm0iLCJ0ZXJtX3JlbGF0aW9uc2hpcCIsInRlcm1fdGF4b25vbXkiLCJ0aWNrZXQiLCJ0aWNrZXRfcHJpY2UiLCJ0aWNrZXRfdGVtcGxhdGUiLCJ0cmFuc2FjdGlvbiIsInZlbnVlIiwid3BfdXNlciIsIm9wdHMiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImNyZWF0ZUNhbGxiYWNrR2V0dGVyIiwicHJvcGVydHlOYW1lIiwiY2FsbEJhY2siLCJjcmVhdGVHZXR0ZXJBbmRTZXR0ZXIiLCJpbml0aWFsRmllbGRWYWx1ZSIsInByb3BlcnR5VmFsdWUiLCJzZXQiLCJyZWNlaXZlZFZhbHVlIiwiaXNQcmltYXJ5RmllbGQiLCJzZXRGaWVsZFRvUGVyc2lzdCIsImNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyIiwib3JpZ2luYWxGaWVsZE5hbWUiLCJhbGlhc0ZpZWxkTmFtZSIsImNyZWF0ZUFsaWFzR2V0dGVyIiwicHJpbWFyeUtleXMiLCJvcmlnaW5hbEZpZWxkc0FuZFZhbHVlcyIsImlzUHJpbWFyeUtleSIsInNldFZhbGlkYXRlVHlwZUZvckZpZWxkIiwic2V0SW5pdGlhbEVudGl0eUZpZWxkc0FuZFZhbHVlcyIsInNldENhbGN1bGF0ZWRGaWVsZEFuZFZhbHVlcyIsInBvcHVsYXRlUHJvdGVjdGVkRmllbGRzUHJvcGVydHkiLCJzZXRSZXNvdXJjZXMiLCJjcmVhdGVQcmltYXJ5S2V5RmllbGRHZXR0ZXJzIiwicG9wdWxhdGVQcmltYXJ5S2V5cyIsInBvcHVsYXRlTWlzc2luZ0ZpZWxkcyIsImNhbGN1bGF0ZWRGaWVsZHMiLCJfY2FsY3VsYXRlZF9maWVsZHMiLCJfcHJvdGVjdGVkIiwiZ2V0UHJpbWFyeUtleUZpZWxkc0Zyb21TY2hlbWEiLCJzY2hlbWFQcm9wZXJ0aWVzIiwic2NoZW1hRmllbGQiLCJjdWlkIiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyRm9yRmllbGQiLCJkZXJpdmVWYWxpZGF0ZVR5cGVGb3JGaWVsZCIsImdldEVudGl0eUZpZWxkc0Zyb21TY2hlbWEiLCJ1bmRlZmluZWQiLCJnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyIsImZvclVwZGF0ZSIsImdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JQZXJzaXN0aW5nIiwiZm9ySW5zZXJ0IiwiZW50aXR5VmFsdWVzIiwicHJpbWFyeUtleSIsImZvclBlcnNpc3QiLCJnZXREZWZhdWx0VmFsdWVGb3JGaWVsZCIsImNyZWF0ZVJhd0VudGl0eUdldHRlcnNTZXR0ZXJzIiwiZGVyaXZlUHJlcGFyZWRWYWx1ZUZvckZpZWxkIiwiY3JlYXRlQWxpYXNHZXR0ZXJGb3JGaWVsZCIsImNyZWF0ZUFsaWFzZXNGb3JNZXRob2QiLCJtZXRob2QiLCJuZXdGaWVsZE5hbWUiLCJmaWVsZFByZWZpeCIsImdldFJlbmRlcmVkQ2FsbGJhY2siLCJyZXF1ZXN0ZWRGaWVsZE5hbWUiLCJyZW1vdmVQcmVmaXhlc0Zyb21GaWVsZCIsInByZWZpeGVzVG9SZW1vdmUiLCJzb3J0QnkiLCJwcmVmaXgiLCJjcmVhdGVSZW5kZXJlZEdldHRlcnMiLCJnZXRSZW5kZXJlZCIsImhhc011bHRpcGxlUHJpbWFyeUtleXNDYWxsYmFjayIsImhhc0NhbGN1bGF0ZWRGaWVsZENhbGxiYWNrIiwiZmllbGROYW1lVG9DaGVjayIsImNhbGN1bGF0ZWRGaWVsZFZhbHVlIiwiY2FsY3VsYXRlZEZpZWxkTmFtZSIsInJlbGF0aW9uTmFtZSIsInJlc291cmNlVmFsdWUiLCJyZXNvdXJjZU5hbWUiLCJocmVmIiwiZ2V0UmVsYXRpb25OYW1lRnJvbUxpbmsiLCJzZXRSZWxhdGlvbnNSZXNvdXJjZSIsImdldFJlbGF0aW9uUmVzb3VyY2VDYWxsYmFjayIsInJlc291cmNlSW5mbyIsInJlc291cmNlTGluayIsInNpbmdsZSIsImdldFJlbGF0aW9uUmVzb3VyY2UiLCJvdmVycmlkZSIsImN1cnJlbnRTdGF0ZSIsIkludmFsaWRBcmd1bWVudCIsImZpZWxkc1RvUGVyc2lzdE9uSW5zZXJ0IiwibWF5YmVDb252ZXJ0VG9WYWx1ZU9iamVjdCIsInZhbGlkYXRlSXNEYXRlVGltZSIsImZyb21JU08iLCJpbnN0YW5jZU9mIiwiU2l0ZUN1cnJlbmN5IiwiZXJyb3IiLCJ0b0lTTyIsInRvTnVtYmVyIiwibWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0IiwiZGVyaXZlUmVuZGVyZWRWYWx1ZSIsInBsdXJhbE1vZGVsTmFtZSIsImxhc3QiLCJzcGxpdCIsImVudGl0eUluc3RhbmNlIiwicmVkdWNlIiwiaXRlcmF0b3IiLCJBcnJheSIsImZyb20iLCJnZXRQcmltYXJ5S2V5VmFsdWVzIiwicGljayIsInBpY2tCeSIsImRlcml2ZURlZmF1bHRWYWx1ZUZvclR5cGUiLCJEYXRlIiwidG9JU09TdHJpbmciLCJkZXJpdmVUeXBlRm9yRmllbGQiLCJ2YWxpZCIsInNpbmdsZVR5cGUiLCJpc0ludGVnZXIiLCJpc051bWJlciIsImlzU3RyaW5nIiwiaXNCb29sZWFuIiwiZW51bVZhbHVlcyIsImV4cGVjdFZhbHVlT2JqZWN0cyIsImlzRW51bSIsImlzVmFsdWVPYmplY3QiLCJFVkVOVF9TVEFUVVNfSUQiLCJFVkVOVF9TVEFUVVNfSURTIiwiY2F0ZWdvcnlTbHVnIiwic3RyaW5nIiwidGlja2V0X3N0YXJ0IiwidGlja2V0X2VuZCIsInBsdXJhbGl6ZSIsInNpbmd1bGFyTW9kZWxOYW1lIiwic2luZ3VsYXIiLCJtb2RlbE5hbWVGb3JRdWVyeVN0cmluZyIsInN0YXJ0Q2FzZSIsIkJBU0VfUFJJQ0VfVFlQRVMiLCJCQVNFX1BSSUNFIiwiRElTQ09VTlQiLCJTVVJDSEFSR0UiLCJUQVgiLCJwcmltYXJ5X2tleXMiLCJ2YWx1ZXNGb3JDb21iaW5lZFByaW1hcnlLZXlzIiwicmVzdWx0IiwidHJpbUVuZCIsInZhbHVlRm9yUHJpbWFyeUtleSIsImdldFByaW1hcnlLZXkiLCJnZXRQcmltYXJ5S2V5UXVlcnlTdHJpbmciLCJrZXlWYWx1ZXMiLCJnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzIiwia2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSIsIm1hcHBlZEVudGl0aWVzIiwiTWFwIiwiY3JlYXRlQW5kS2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSIsImVudGl0eUlkIiwic3RhdHVzTW9kZWwiLCJmb3JBdHRlbmRlZUlkIiwiZm9yVHJhbnNhY3Rpb25JZCIsInJlZ19pZCIsInJlZ19kYXRlIiwiU1RBVFVTX1RZUEVfRU1BSUwiLCJTVEFUVVNfVFlQRV9FVkVOVCIsIlNUQVRVU19UWVBFX01FU1NBR0UiLCJTVEFUVVNfVFlQRV9QQVlNRU5UIiwiU1RBVFVTX1RZUEVfUkVHSVNUUkFUSU9OIiwiU1RBVFVTX1RZUEVfVFJBTlNBQ1RJT04iLCJFTUFJTF9TVEFUVVNfSUQiLCJEUkFGVCIsIlNFTlQiLCJNRVNTQUdFX1NUQVRVU19JRCIsIkRFQlVHIiwiRVhFQ1VUSU5HIiwiRkFJTCIsIklOQ09NUExFVEUiLCJJRExFIiwiUkVTRU5EIiwiUkVUUlkiLCJQQVlNRU5UX1NUQVRVU19JRCIsIkFQUFJPVkVEIiwiREVDTElORUQiLCJGQUlMRUQiLCJQRU5ESU5HIiwiUkVHSVNUUkFUSU9OX1NUQVRVU19JRCIsIk5PVF9BUFBST1ZFRCIsIlBFTkRJTkdfUEFZTUVOVCIsIldBSVRfTElTVCIsIlRSQU5TQUNUSU9OX1NUQVRVU19JRCIsIkFCQU5ET05FRCIsIkNPTVBMRVRFIiwiT1ZFUlBBSUQiLCJDUFRfU1RBVFVTX0lEIiwiUFVCTElTSCIsIkZVVFVSRSIsIlBSSVZBVEUiLCJVTktOT1dOX1NUQVRVU19JRCIsIkFMTF9TVEFUVVNfSURTIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9SRUdJU1RSQVRJT04iLCJMYWJlbCIsImZyb21TYW1lU2luZ2xlQW5kUGx1cmFsIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9UUkFOU0FDVElPTiIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfUEFZTUVOVCIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfTUVTU0FHRSIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ1BUIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9FVkVOVCIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfVElDS0VUIiwiVElDS0VUX1NUQVRVU19JRCIsIkFSQ0hJVkVEIiwiT05TQUxFIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9EQVRFVElNRSIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ0hFQ0tJTiIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQUxMIiwic3RhdHVzQ29kZSIsIkZPUk1BVF9TRU5URU5DRV9DQVNFIiwiYXNGb3JtYXR0ZWQiLCJwcmV0dHlTdGF0dXNlcyIsInN0YXR1c0NvZGVzIiwibWFwcGVkU3RhdHVzZXMiLCJzdGF0dXNUeXBlIiwiVElDS0VUX1NUQVRVU19JRFMiLCJhc3NlcnRUaWNrZXRFbnRpdHkiLCJ0aWNrZXRFbnRpdHkiLCJpbmNsdWRlQXJjaGl2ZWQiLCJpc0FyY2hpdmVkIiwiaXNPblNhbGUiLCJzdGFydERhdGUiLCJlbmREYXRlIiwicXR5IiwiaXNQZW5kaW5nIiwiZ2V0VGlja2V0U3RhdHVzVGV4dExhYmVsIiwidGlja2V0U3RhdHVzIiwiYXNJbnQiLCJmb3JEYiIsInJlcHJlc2VudHNJbmZpbml0eSIsImlzTmlsIiwicHJvcHMiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFp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Z0JBQWdCO0FBQzdCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGdCQUFnQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDVCw0QkFBNEI7QUFDNUIsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFVBQVUsS0FBcUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOzs7O0FBSWIsSUFBSSxJQUFxQztBQUN6QztBQUNBOztBQUVBLDhDQUE4QyxjQUFjOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEU7QUFDMUU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEZBQTBGLGFBQWE7QUFDdkc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0dBQWdHLGVBQWU7QUFDL0c7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEOztBQUVoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7O0FDM09hOztBQUViLElBQUksS0FBcUMsRUFBRSxFQUUxQztBQUNELG1CQUFtQixtQkFBTyxDQUFDLDBGQUErQjtBQUMxRDs7Ozs7Ozs7Ozs7O0FDTkEsYUFBYSwrQkFBK0IsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E5QyxhQUFhLDBDQUEwQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXpELGFBQWEsdUNBQXVDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdEQsYUFBYSw2Q0FBNkMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E1RCxhQUFhLCtDQUErQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQTlELGFBQWEsc0NBQXNDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBckQsYUFBYSxpREFBaUQsRUFBRSxJOzs7Ozs7Ozs7OztBQ0FoRSxhQUFhLGlDQUFpQyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQWhELGFBQWEsbURBQW1ELEVBQUUsSSIsImZpbGUiOiJldmVudGVzcHJlc3NvLW1vZGVsLjc1MjNiMGE4MGQ1NjUxNmE3MzJhLmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9aWlovZGF0YS9tb2RlbC9pbmRleC5qc1wiKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBFeGNlcHRpb24gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcbmltcG9ydCB7IHNwcmludGYsIF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc0FycmF5LCBpc0VtcHR5LCBpc01hcCB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiBrZXkgZXhpc3RzIGluIHRoZSBwcm92aWRlZCBlbnRpdHkgb2JqZWN0LlxuICogVGhpcyBpcyB1c2VkIHdoZW4gY2FsbGluZyBjb2RlIHdhbnRzIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24uXG4gKlxuICogQHBhcmFtIHsgc3RyaW5nIH0ga2V5XG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHlcbiAqIEBwYXJhbSB7IHN0cmluZyB9IG1lc3NhZ2VcbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfSAgVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgcHJvdmlkZWQgZW50aXR5IGRvZXMgbm90XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgaGF2ZSB0aGUgZ2l2ZW4ga2V5LlxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0RW50aXR5SGFzS2V5ID0gKCBrZXksIGVudGl0eSwgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBzcHJpbnRmKFxuXHRcdFx0X18oXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgZW50aXR5ICglcykgZG9lcyBub3QgaGF2ZSB0aGUgZ2l2ZW4gcHJvcGVydHkgKCVzKScsXG5cdFx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0XHQpLFxuXHRcdFx0ZW50aXR5LFxuXHRcdFx0a2V5LFxuXHRcdCk7XG5cdH1cblx0aWYgKCAhIGVudGl0eS5oYXNPd25Qcm9wZXJ0eSgga2V5ICkgKSB7XG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbiggbWVzc2FnZSApO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gcGF0aCBpbiB0aGUgcHJvdmlkZWQgaW1tdXRhYmxlIG9iamVjdCBleGlzdHMuXG4gKiBUaGlzIGlzIHVzZWQgd2hlbiBjYWxsaW5nIGNvZGUgd2FudHMgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93biBpZiB0aGUgZ2l2ZW5cbiAqIHNlYXJjaCBwYXRoIGFycmF5IGRvZXMgbm90IGV4aXN0IGluIHRoZSBpbW11dGFibGUgb2JqZWN0LlxuICpcbiAqIElmIHRoZSBpbW11dGFibGUgb2JqZWN0IGlzIHNldHVwIGxpa2UgdGhpczpcbiAqXG4gKiBpbW11dGFibGUgPSBJbW11dGFibGUuTWFwKCkuc2V0KCAnZXZlbnQnLCBJbW11dGFibGUuTWFwKCkuc2V0KCAxMCwgRXZlbnQgKSApO1xuICpcbiAqIFRoZW4gYSB2YWxpZCBzZWFyY2hhYmxlIHBhdGggY291bGQgYmUgYFsgJ2V2ZW50JywgMTAgXWAuICBBbiBpbnZhbGlkIHBhdGhcbiAqIHdvdWxkIGJlIGBbICdkYXRldGltZScsIDEwIF1gXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGF0aCAgU2VhcmNoYWJsZSBwYXRoIGZvciB0aGUgaW1tdXRhYmxlIG9qYmVjdCB0byB2ZXJpZnkuXG4gKiBAcGFyYW0ge0ltbXV0YWJsZS5NYXB8SW1tdXRhYmxlLlNldH0gaW1tdXRhYmxlICBBbiBpbW11dGFibGUgb2JqZWN0IChNYXAsIFNldCwgTGlzdCBldGMpXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBBIGN1c3RvbSBtZXNzYWdlIHRvIHVzZS5cbiAqIEB0aHJvd3MgRXhjZXB0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRJbW11dGFibGVPYmplY3RIYXNQYXRoID0gKFxuXHRwYXRoLFxuXHRpbW11dGFibGUsXG5cdG1lc3NhZ2UgPSAnJ1xuKSA9PiB7XG5cdGlmICggbWVzc2FnZSA9PT0gJycgKSB7XG5cdFx0bWVzc2FnZSA9IHNwcmludGYoXG5cdFx0XHRfXyhcblx0XHRcdFx0J1RoZSBwcm92aWRlZCBpbW11dGFibGUgb2JqZWN0ICglcykgZG9lcyBub3QgaGF2ZSB0aGUgZ2l2ZW4gcGF0aCAoJXMpJyxcblx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHRcdCksXG5cdFx0XHRpbW11dGFibGUsXG5cdFx0XHRwYXRoLFxuXHRcdCk7XG5cdH1cblx0aWYgKCAhIGltbXV0YWJsZS5oYXNJbiggcGF0aCApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7Kn0gaXRlbXNcbiAqIEBwYXJhbSB7IHN0cmluZyB9ICBtZXNzYWdlXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH0gVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgbm90IGFuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkuXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRJc0FycmF5ID0gKCBpdGVtcywgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBfXyggJ1RoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYW4gYXJyYXkuJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHR9XG5cdGlmICggISBpc0FycmF5KCBpdGVtcyApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgZW1wdHkgb3Igbm90LlxuICpcbiAqIENhbGwgdGhpcyB2YWxpZGF0b3Igd2hlbiB5b3Ugd2FudCB0byBtYWtlIHN1cmUgdGhlIHZhbHVlIGlzIE5PVCBlbXB0eS5cbiAqXG4gKiBAcGFyYW0geyp9IGl0ZW1zXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtZXNzYWdlXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH0gVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgZW1wdHkuXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRJc05vdEVtcHR5ID0gKCBpdGVtcywgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBfXyhcblx0XHRcdCdUaGUgcHJvdmlkZWQgaXRlbXMgbXVzdCBub3QgYmUgZW1wdHknLFxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHQpO1xuXHR9XG5cdGlmICggaXNFbXB0eSggaXRlbXMgKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIE1hcCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHsqfSBpdGVtXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRJc01hcCA9ICggaXRlbSwgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBfXyhcblx0XHRcdCdUaGUgcHJvdmlkZWQgaXRlbSBtdXN0IGJlIGEgTWFwIG9iamVjdCcsXG5cdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0KTtcblx0fVxuXHRpZiAoICEgaXNNYXAoIGl0ZW0gKSApIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKCBtZXNzYWdlICk7XG5cdH1cbn07XG4iLCJleHBvcnQgY29uc3QgTU9ERUxfTkFNRVMgPSB7XG5cdE1PREVMOiAnYXR0ZW5kZWUnLFxuXHRSRUxBVElPTjogJ2F0dGVuZGVlcycsXG59O1xuIiwiZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG5leHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9BU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxufSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCB7IFJFR0lTVFJBVElPTl9TVEFUVVNfSURTIH0gZnJvbSAnLi4vcmVnaXN0cmF0aW9uL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRpZDogJ0FUVF9JRCcsXG5cdGxhc3ROYW1lT25seTogJ0FUVF9sbmFtZScsXG5cdGZpcnN0TmFtZU9ubHk6ICdBVFRfZm5hbWUnLFxuXHRmaXJzdFRoZW5MYXN0TmFtZTogWyAnQVRUX2ZuYW1lJywgJ0FUVF9sbmFtZScgXSxcblx0bGFzdFRoZW5GaXJzdE5hbWU6IFsgJ0FUVF9sbmFtZScsICdBVFRfZm5hbWUnIF0sXG59O1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdGZvckV2ZW50SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvckRhdGV0aW1lSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclRpY2tldElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JTdGF0dXNJZDogUHJvcFR5cGVzLm9uZU9mKCBSRUdJU1RSQVRJT05fU1RBVFVTX0lEUyApLFxuXHRmb3JSZWdpc3RyYXRpb25JZDogUHJvcFR5cGVzLm51bWJlcixcblx0c2hvd0dyYXZhdGFyOiBQcm9wVHlwZXMuYm9vbCxcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIE9iamVjdC5rZXlzKCBvcmRlckJ5TWFwICkgKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdsYXN0VGhlbkZpcnN0TmFtZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0FTQyxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkXG4gKiBpbiBhIFJFU1QgcXVlcnkgZnJvbSB0aGUgY29udGV4dCBvZiBhIGF0dGVuZGVlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBcdFx0b3JkZXJCeVxuICogQHJldHVybiB7IHN0cmluZyB9IFx0UmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmdcbiAqIFx0XHRcdFx0XHRcdGZvciB0aGUgUkVTVCBxdWVyeSBmb3IgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiBhdHRlbmRlZXMgZW5kcG9pbnQgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICAgIFx0SUQgb2YgRXZlbnQgdG8gcmV0cmlldmUgYXR0ZW5kZWVzIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvckRhdGV0aW1lSWQgXHRJRCBvZiBEYXRldGltZSB0byByZXRyaWV2ZSBhdHRlbmRlZXMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yVGlja2V0SWQgXHRcdElEIG9mIFRpY2tldCB0byByZXRyaWV2ZSBhdHRlbmRlZXMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yUmVnaXN0cmF0aW9uSWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JTdGF0dXNJZCBcdFx0SUQgb2YgU3RhdHVzIHRvIHJldHJpZXZlIGF0dGVuZGVlcyBmb3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBzaG93R3JhdmF0YXIgXHRCb29sZWFuIHRvZ2dsZSBmb3Igd2hldGhlciB0byBkaXNwbGF5IHVzZXIgR3JhdmF0YXJcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgXHRUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdGZvckRhdGV0aW1lSWQgPSAwLFxuXHRmb3JUaWNrZXRJZCA9IDAsXG5cdGZvclJlZ2lzdHJhdGlvbklkID0gMCxcblx0Zm9yU3RhdHVzSWQgPSAnUkFQJyxcblx0c2hvd0dyYXZhdGFyID0gZmFsc2UsXG59ICkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXG5cdC8vIGVuc3VyZSB0aGF0IGVudGl0eSBJRHMgYXJlIGludGVnZXJzXG5cdGZvclJlZ2lzdHJhdGlvbklkID0gcGFyc2VJbnQoIGZvclJlZ2lzdHJhdGlvbklkLCAxMCApO1xuXHRmb3JUaWNrZXRJZCA9IHBhcnNlSW50KCBmb3JUaWNrZXRJZCwgMTAgKTtcblx0Zm9yRGF0ZXRpbWVJZCA9IHBhcnNlSW50KCBmb3JEYXRldGltZUlkLCAxMCApO1xuXHRmb3JFdmVudElkID0gcGFyc2VJbnQoIGZvckV2ZW50SWQsIDEwICk7XG5cblx0Ly8gb3JkZXIgb2YgcHJpb3JpdHkgZm9yIHByb3ZpZGVkIGFyZ3VtZW50cy5cblx0aWYgKCBmb3JSZWdpc3RyYXRpb25JZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JSZWdpc3RyYXRpb25JZCApICkge1xuXHRcdHdoZXJlLnB1c2goIGB3aGVyZVtSZWdpc3RyYXRpb24uUkVHX0lEXT0keyBmb3JSZWdpc3RyYXRpb25JZCB9YCApO1xuXHR9IGVsc2UgaWYgKCBmb3JUaWNrZXRJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JUaWNrZXRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goIGB3aGVyZVtSZWdpc3RyYXRpb24uVGlja2V0LlRLVF9JRF09JHsgZm9yVGlja2V0SWQgfWAgKTtcblx0fSBlbHNlIGlmICggZm9yRGF0ZXRpbWVJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JEYXRldGltZUlkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggYHdoZXJlW1JlZ2lzdHJhdGlvbi5UaWNrZXQuRGF0ZXRpbWUuRFRUX0lEXT0keyBmb3JEYXRldGltZUlkIH1gICk7XG5cdH0gZWxzZSBpZiAoIGZvckV2ZW50SWQgIT09IDAgJiYgISBpc05hTiggZm9yRXZlbnRJZCApICkge1xuXHRcdHdoZXJlLnB1c2goIGB3aGVyZVtSZWdpc3RyYXRpb24uRVZUX0lEXT0keyBmb3JFdmVudElkIH1gICk7XG5cdH1cblxuXHRpZiAoIFJFR0lTVFJBVElPTl9TVEFUVVNfSURTLmluY2x1ZGVzKCBmb3JTdGF0dXNJZCApICkge1xuXHRcdHdoZXJlLnB1c2goIGB3aGVyZVtSZWdpc3RyYXRpb24uU3RhdHVzLlNUU19JRF09JHsgZm9yU3RhdHVzSWQgfWAgKTtcblx0fVxuXHRpZiAoIHNob3dHcmF2YXRhciA9PT0gdHJ1ZSApIHtcblx0XHR3aGVyZS5wdXNoKCAnY2FsY3VsYXRlPXVzZXJfYXZhdGFyJyApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCAqIGFzIGRhdGVGb3JtYXRzIGZyb20gJ0BldmVudGVzcHJlc3NvL2hlbHBlcnMnO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgb24gcHJvdmlkZWQgZW50aXRpZXMuICBEb2VzIG5vdCBtdXRhdGUgb3JpZ2luYWxcbiAqIGVudGl0aWVzLlxuICpcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXRpZXMgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgc3RyaW5nIH0gZm9ybWF0ICBUaGUgZm9ybWF0IHRvIHRyYW5zZm9ybSB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgdG8uXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICBXaGV0aGVyIG9yIG5vdCB0byBjb252ZXJ0IHRoZSBkYXRlIGZpZWxkIHZhbHVlXG4gKiAgIHRvIHRoZSBsb2NhbCB0aW1lem9uZSBmb3IgdGhlIGhvc3QuXG4gKiBAcmV0dXJuIHsgQXJyYXkgfSAgUmV0dXJucyBhIG5ldyBhcnJheSBvZiBuZXcgZW50aXRpZXMgd2l0aCB0aGUgZGF0ZSBmaWVsZFxuICogICB2YWx1ZXMgZm9ybWF0dGVkXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlc09uRW50aXRpZXMgPSAoXG5cdGVudGl0aWVzID0gW10sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0Zm9ybWF0ID0gZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9JU084NjAxLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0aWYgKCBpc0VtcHR5KCBlbnRpdGllcyApIHx8IGlzRW1wdHkoIGVudGl0eURhdGVGaWVsZHMgKSApIHtcblx0XHRyZXR1cm4gZW50aXRpZXM7XG5cdH1cblx0Y29uc3QgZm9ybWF0dGVkRW50aXRpZXMgPSBbXTtcblx0ZW50aXRpZXMuZm9yRWFjaCggKCBlbnRpdHkgKSA9PiB7XG5cdFx0Zm9ybWF0dGVkRW50aXRpZXMucHVzaCggZm9ybWF0RGF0ZXNPbkVudGl0eShcblx0XHRcdGVudGl0eSxcblx0XHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0XHRmb3JtYXQsXG5cdFx0XHRsb2NhbCxcblx0XHQpICk7XG5cdH0gKTtcblx0cmV0dXJuIGZvcm1hdHRlZEVudGl0aWVzO1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlIGZpZWxkcyBvbiB0aGUgcHJvdmlkZWQgZW50aXR5LiAgRG9lcyBub3QgbXV0YXRlIG9yaWdpbmFsXG4gKiBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gZW50aXR5ICBBbiBlbnRpdHlcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyAgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBmb3JtYXQgIFRoZSBmb3JtYXQgdG8gdHJhbnNmb3JtIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyB0by5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBPYmplY3QgfSAgUmV0dXJucyBhIG5ldyBlbnRpdHkgd2l0aCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgZm9ybWF0dGVkXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXREYXRlc09uRW50aXR5ID0gKFxuXHRlbnRpdHkgPSB7fSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRmb3JtYXQgPSBkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX0lTTzg2MDEsXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRjb25zdCBuZXdFbnRpdHkgPSB7IC4uLmVudGl0eSB9O1xuXHRlbnRpdHlEYXRlRmllbGRzLmZvckVhY2goICggZGF0ZUZpZWxkICkgPT4ge1xuXHRcdGlmICggbmV3RW50aXR5WyBkYXRlRmllbGQgXSApIHtcblx0XHRcdG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0gPSBkYXRlRm9ybWF0cy5mb3JtYXREYXRlU3RyaW5nKFxuXHRcdFx0XHRuZXdFbnRpdHlbIGRhdGVGaWVsZCBdLFxuXHRcdFx0XHRmb3JtYXQsXG5cdFx0XHRcdGxvY2FsLFxuXHRcdFx0KTtcblx0XHR9XG5cdH0gKTtcblx0cmV0dXJuIG5ld0VudGl0eTtcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgdG8gbXlzcWwgZm9ybWF0IG9uIHByb3ZpZGVkIGVudGl0aWVzLiAgRG9lcyBub3RcbiAqIG11dGF0ZSBvcmlnaW5hbCBlbnRpdGllcy5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzICBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBBcnJheSB9ICBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIG5ldyBlbnRpdGllcyB3aXRoIHRoZSBkYXRlIGZpZWxkXG4gKiAgIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEVudGl0aWVzRGF0ZXNUb015c3FsID0gKFxuXHRlbnRpdGllcyA9IFtdLFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGxvY2FsID0gdHJ1ZSxcbikgPT4ge1xuXHRyZXR1cm4gZm9ybWF0RGF0ZXNPbkVudGl0aWVzKFxuXHRcdGVudGl0aWVzLFxuXHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0ZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9NWVNRTCxcblx0XHRsb2NhbCxcblx0KTtcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgdG8gbXlzcWwgZm9ybWF0IG9uIHByb3ZpZGVkIGVudGl0eS4gIERvZXMgbm90XG4gKiBtdXRhdGUgb3JpZ2luYWwgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGVudGl0eSAgQW4gYXJyYXkgb2YgZW50aXR5IG9iamVjdHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyAgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcGFyYW0geyBib29sZWFuIH0gbG9jYWwgICAgICBXaGV0aGVyIG9yIG5vdCB0byBjb252ZXJ0IHRoZSBkYXRlIGZpZWxkIHZhbHVlXG4gKiAgIHRvIHRoZSBsb2NhbCB0aW1lem9uZSBmb3IgdGhlIGhvc3QuXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gIFJldHVybnMgYSBuZXcgZW50aXR5IHdpdGggdGhlIGRhdGUgZmllbGQgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RW50aXR5RGF0ZXNUb015c3FsID0gKFxuXHRlbnRpdHkgPSB7fSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0cmV0dXJuIGZvcm1hdERhdGVzT25FbnRpdHkoXG5cdFx0ZW50aXR5LFxuXHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0ZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9NWVNRTCxcblx0XHRsb2NhbCxcblx0KTtcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgdG8gdGhlIHNpdGUgZm9ybWF0IG9uIHByb3ZpZGVkIGVudGl0aWVzLiAgRG9lcyBub3RcbiAqIG11dGF0ZSBvcmlnaW5hbCBlbnRpdGllcy5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzICBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBBcnJheSB9ICBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIG5ldyBlbnRpdGllcyB3aXRoIHRoZSBkYXRlIGZpZWxkXG4gKiAgIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEVudGl0aWVzRGF0ZXNUb1NpdGUgPSAoXG5cdGVudGl0aWVzID0gW10sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0bG9jYWwgPSB0cnVlLFxuKSA9PiB7XG5cdHJldHVybiBmb3JtYXREYXRlc09uRW50aXRpZXMoXG5cdFx0ZW50aXRpZXMsXG5cdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHRkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX1NJVEUsXG5cdFx0bG9jYWwsXG5cdCk7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIHRvIHRoZSBzaXRlIGZvcm1hdCBvbiBwcm92aWRlZCBlbnRpdHkuICBEb2VzIG5vdFxuICogbXV0YXRlIG9yaWdpbmFsIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHkgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IE9iamVjdCB9ICBSZXR1cm5zIGEgbmV3IGVudGl0eSB3aXRoIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEVudGl0eURhdGVzVG9TaXRlID0gKFxuXHRlbnRpdHkgPSB7fSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRsb2NhbCA9IHRydWUsXG4pID0+IHtcblx0cmV0dXJuIGZvcm1hdERhdGVzT25FbnRpdHkoXG5cdFx0ZW50aXR5LFxuXHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0ZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9TSVRFLFxuXHRcdGxvY2FsLFxuXHQpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBkYXRlIGZpZWxkIHZhbHVlcyB0byBtb21lbnQgb2JqZWN0cyBmb3IgdGhlIHByb3ZpZGVkIGVudGl0aWVzLlxuICogRG9lcyBub3QgbXV0YXRlIG9yaWdpbmFsIGVudGl0aWVzLlxuICpcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXRpZXMgQW4gYXJyYXkgb2YgZW50aXR5IG9iamVjdHNcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXR5RGF0ZUZpZWxkcyBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEByZXR1cm4geyBBcnJheSB9IFJldHVybnMgYSBuZXcgYXJyYXkgb2YgbmV3IGVudGl0aWVzIHdpdGggdGhlIGRhdGUgZmllbGRcbiAqICAgdmFsdWVzIGNvbnZlcnRlZCB0byBtb21lbnQgb2JqZWN0cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRFbnRpdGllc0RhdGVzVG9Nb21lbnQgPSAoXG5cdGVudGl0aWVzID0gW10sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcbikgPT4ge1xuXHRpZiAoIGlzRW1wdHkoIGVudGl0aWVzICkgfHwgaXNFbXB0eSggZW50aXR5RGF0ZUZpZWxkcyApICkge1xuXHRcdHJldHVybiBlbnRpdGllcztcblx0fVxuXHRjb25zdCBmb3JtYXR0ZWRFbnRpdGllcyA9IFtdO1xuXHRlbnRpdGllcy5mb3JFYWNoKCAoIGVudGl0eSApID0+IHtcblx0XHRmb3JtYXR0ZWRFbnRpdGllcy5wdXNoKCBjb252ZXJ0RW50aXR5RGF0ZXNUb01vbWVudChcblx0XHRcdGVudGl0eSxcblx0XHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0KSApO1xuXHR9ICk7XG5cdHJldHVybiBmb3JtYXR0ZWRFbnRpdGllcztcbn07XG5cbi8qKlxuICogQ29udmVydHMgZGF0ZSBmaWVsZCB2YWx1ZXMgdG8gbW9tZW50IG9iamVjdHMgZm9yIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKiBEb2VzIG5vdCBtdXRhdGUgb3JpZ2luYWwgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGVudGl0eSBBbiBlbnRpdHkuXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gUmV0dXJucyBhIG5ldyBlbnRpdHkgd2l0aCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZXMgY29udmVydGVkXG4gKiAgIHRvIG1vbWVudCBvYmplY3RzLlxuICovXG5leHBvcnQgY29uc3QgY29udmVydEVudGl0eURhdGVzVG9Nb21lbnQgPSAoXG5cdGVudGl0eSA9IHt9LFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG4pID0+IHtcblx0Y29uc3QgbmV3RW50aXR5ID0geyAuLi5lbnRpdHkgfTtcblx0ZW50aXR5RGF0ZUZpZWxkcy5mb3JFYWNoKCAoIGRhdGVGaWVsZCApID0+IHtcblx0XHRpZiAoIG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0gKSB7XG5cdFx0XHRuZXdFbnRpdHlbIGRhdGVGaWVsZCBdID0gZGF0ZUZvcm1hdHMuc3RyaW5nVG9Nb21lbnQoXG5cdFx0XHRcdG5ld0VudGl0eVsgZGF0ZUZpZWxkIF0sXG5cdFx0XHQpO1xuXHRcdH1cblx0fSApO1xuXHRyZXR1cm4gbmV3RW50aXR5O1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0FycmF5LCBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBRVUVSWV9PUkRFUl9BU0MgPSAnQVNDJztcbmV4cG9ydCBjb25zdCBRVUVSWV9PUkRFUl9ERVNDID0gJ0RFU0MnO1xuZXhwb3J0IGNvbnN0IEFMTE9XRURfT1JERVJfVkFMVUVTID0gWyAnYXNjJywgJ2Rlc2MnLCAnQVNDJywgJ0RFU0MnIF07XG5leHBvcnQgY29uc3QgR1JFQVRFUl9USEFOID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPicgKTtcbmV4cG9ydCBjb25zdCBMRVNTX1RIQU4gPSBlbmNvZGVVUklDb21wb25lbnQoICc8JyApO1xuZXhwb3J0IGNvbnN0IEdSRUFURVJfVEhBTl9BTkRfRVFVQUwgPSBlbmNvZGVVUklDb21wb25lbnQoICc+PScgKTtcbmV4cG9ydCBjb25zdCBMRVNTX1RIQU5fQU5EX0VRVUFMID0gZW5jb2RlVVJJQ29tcG9uZW50KCAnPD0nICk7XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcGFyYW0geyBmdW5jdGlvbiB9IHdoZXJlQ29uZGl0aW9ucyAgQSBmdW5jdGlvbiBmb3IgcHJlcHBpbmcgdGhlIHdoZXJlXG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbmRpdGlvbnMgZnJvbSB0aGUgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgZnVuY3Rpb24gfSBtYXBPcmRlckJ5XHRcdEEgZnVuY3Rpb24gZm9yIG1hcHBpbmcgaW5jb21pbmcgb3JkZXJfYnlcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0c3RyaW5ncyB0byB0aGUgdmFsdWUgbmVlZGVkIGZvciB0aGVcbiAqIFx0XHRcdFx0XHRcdFx0XHRcdFx0cXVlcnlfc3RyaW5nLlxuICogQHJldHVybiB7IHN0cmluZyB9ICBcdFx0XHRcdFx0UmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoXG5cdHF1ZXJ5RGF0YSA9IHt9LFxuXHR3aGVyZUNvbmRpdGlvbnMgPSAoKSA9PiBudWxsLFxuXHRtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4gb3JkZXJCeSxcbikgPT4ge1xuXHRjb25zdCB3aGVyZSA9IHdoZXJlQ29uZGl0aW9ucyggcXVlcnlEYXRhICk7XG5cdGNvbnN0IHsgbGltaXQsIG9yZGVyLCBvcmRlckJ5LCBkZWZhdWx0V2hlcmVDb25kaXRpb25zIH0gPSBxdWVyeURhdGE7XG5cdGNvbnN0IHF1ZXJ5UGFyYW1zID0gW107XG5cdGlmICggISBpc1VuZGVmaW5lZCggbGltaXQgKSApIHtcblx0XHRxdWVyeVBhcmFtcy5wdXNoKCBgbGltaXQ9JHsgbGltaXQgfWAgKTtcblx0fVxuXHRpZiAoICEgaXNVbmRlZmluZWQoIGRlZmF1bHRXaGVyZUNvbmRpdGlvbnMgKSApIHtcblx0XHRxdWVyeVBhcmFtcy5wdXNoKFxuXHRcdFx0YGRlZmF1bHRfd2hlcmVfY29uZGl0aW9ucz0keyBkZWZhdWx0V2hlcmVDb25kaXRpb25zIH1gXG5cdFx0KTtcblx0fVxuXHRpZiAoICEgaXNVbmRlZmluZWQoIG1hcE9yZGVyQnkoIG9yZGVyQnkgKSApICkge1xuXHRcdGlmICggaXNBcnJheSggbWFwT3JkZXJCeSggb3JkZXJCeSApICkgKSB7XG5cdFx0XHRmb3IgKCBjb25zdCBmaWVsZCBvZiBtYXBPcmRlckJ5KCBvcmRlckJ5ICkgKSB7XG5cdFx0XHRcdHF1ZXJ5UGFyYW1zLnB1c2goIGBvcmRlcl9ieVskeyBmaWVsZCB9XT0keyBvcmRlciB9YCApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRxdWVyeVBhcmFtcy5wdXNoKCBgb3JkZXI9JHsgb3JkZXIgfWAgKTtcblx0XHRcdHF1ZXJ5UGFyYW1zLnB1c2goIGBvcmRlcl9ieT0keyBtYXBPcmRlckJ5KCBvcmRlckJ5ICkgfWAgKTtcblx0XHR9XG5cdH1cblx0bGV0IHF1ZXJ5U3RyaW5nID0gcXVlcnlQYXJhbXMuam9pbiggJyYnICk7XG5cdGlmICggd2hlcmUgKSB7XG5cdFx0cXVlcnlTdHJpbmcgKz0gJyYnICsgd2hlcmU7XG5cdH1cblx0cmV0dXJuIHF1ZXJ5U3RyaW5nO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRVMgPSB7XG5cdE1PREVMOiAnY2hlY2tpbicsXG5cdFJFTEFUSU9OOiAnY2hlY2tpbnMnLFxufTtcblxuZXhwb3J0IGNvbnN0IENIRUNLSU5fU1RBVFVTX0lEID0ge1xuXHRTVEFUVVNfQ0hFQ0tFRF9PVVQ6IGZhbHNlLFxuXHRTVEFUVVNfQ0hFQ0tFRF9JTjogdHJ1ZSxcblx0U1RBVFVTX0NIRUNLRURfTkVWRVI6IDIsXG59O1xuXG5leHBvcnQgY29uc3QgQ0hFQ0tJTl9TVEFUVVNfSURTID0gdmFsdWVzKFxuXHRDSEVDS0lOX1NUQVRVU19JRFxuKTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBwcmV0dHlTdGF0dXMgfSBmcm9tICcuLi9zdGF0dXMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcbn0gZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgKiBhcyBjaGVja2luU3RhdHVzIGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRmb3JEYXRldGltZUlkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JFdmVudElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JSZWdpc3RyYXRpb25JZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yVGlja2V0SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclN0YXR1c0lkOiBQcm9wVHlwZXMub25lT2YoIGNoZWNraW5TdGF0dXMuQ0hFQ0tJTl9TVEFUVVNfSURTICksXG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0XHQnQ0hLX0lEJyxcblx0XHRcdCdSRUdfSUQnLFxuXHRcdFx0J0NIS190aW1lc3RhbXAnLFxuXHRcdFx0J0RUVF9JRCcsXG5cdFx0XSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdH0gKSxcbn07XG5cbmV4cG9ydCBjb25zdCBvcHRpb25zRW50aXR5TWFwID0ge1xuXHRkZWZhdWx0OiAoKSA9PiB7XG5cdFx0cmV0dXJuIFtcblx0XHRcdHtcblx0XHRcdFx0bGFiZWw6IHByZXR0eVN0YXR1cyhcblx0XHRcdFx0XHRjaGVja2luU3RhdHVzLkNIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX09VVFxuXHRcdFx0XHQpLFxuXHRcdFx0XHR2YWx1ZTogY2hlY2tpblN0YXR1cy5DSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9PVVQsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJlbDogcHJldHR5U3RhdHVzKFxuXHRcdFx0XHRcdGNoZWNraW5TdGF0dXMuQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfSU5cblx0XHRcdFx0KSxcblx0XHRcdFx0dmFsdWU6IGNoZWNraW5TdGF0dXMuQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfSU4sXG5cdFx0XHR9LFxuXHRcdF07XG5cdH0sXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdDSEtfdGltZXN0YW1wJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhIHJlZ2lzdHJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0dGltZXN0YW1wOiAnQ0hLX3RpbWVzdGFtcCcsXG5cdFx0aWQ6ICdDSEtfSUQnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiByZWdpc3RyYXRpb25zIGVuZHBvaW50IHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRGF0ZXRpbWVJZCAgICBcdElEIG9mIEV2ZW50IHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRXZlbnRJZCAgICBJRCBvZiBBdHRlbmRlZSB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvclJlZ2lzdHJhdGlvbklkIElEIG9mIFRyYW5zYWN0aW9uIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yVGlja2V0SWQgXHRcdElEIG9mIFRpY2tldCB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtzdHJpbmd9IGZvclN0YXR1c0lkIFx0XHRJRCBvZiBTdGF0dXMgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgXHRUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoIHtcblx0Zm9yRGF0ZXRpbWVJZCA9IDAsXG5cdGZvckV2ZW50SWQgPSAwLFxuXHRmb3JSZWdpc3RyYXRpb25JZCA9IDAsXG5cdGZvclRpY2tldElkID0gMCxcblx0Zm9yU3RhdHVzSWQgPSAnJyxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cdGZvckV2ZW50SWQgPSBwYXJzZUludCggZm9yRXZlbnRJZCwgMTAgKTtcblx0aWYgKCBmb3JFdmVudElkICE9PSAwICYmICEgaXNOYU4oIGZvckV2ZW50SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbUmVnaXN0cmF0aW9uLkVWVF9JRF09JyArIGZvckV2ZW50SWQgKTtcblx0fVxuXHRmb3JEYXRldGltZUlkID0gcGFyc2VJbnQoIGZvckRhdGV0aW1lSWQsIDEwICk7XG5cdGlmICggZm9yRGF0ZXRpbWVJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JEYXRldGltZUlkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0RUVF9JRF09JyArIGZvckRhdGV0aW1lSWQgKTtcblx0fVxuXHRmb3JSZWdpc3RyYXRpb25JZCA9IHBhcnNlSW50KCBmb3JSZWdpc3RyYXRpb25JZCwgMTAgKTtcblx0aWYgKCBmb3JSZWdpc3RyYXRpb25JZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JSZWdpc3RyYXRpb25JZCApICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtSRUdfSURdPScgKyBmb3JSZWdpc3RyYXRpb25JZCApO1xuXHR9XG5cdGZvclRpY2tldElkID0gcGFyc2VJbnQoIGZvclRpY2tldElkLCAxMCApO1xuXHRpZiAoIGZvclRpY2tldElkICE9PSAwICYmICEgaXNOYU4oIGZvclRpY2tldElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1JlZ2lzdHJhdGlvbi5US1RfSURdPScgKyBmb3JUaWNrZXRJZCApO1xuXHR9XG5cdGlmICggZm9yU3RhdHVzSWQgIT09ICcnICYmIGZvclN0YXR1c0lkICE9PSBudWxsICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtDSEtfaW5dPScgKyBmb3JTdGF0dXNJZCApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwiaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUVTID0ge1xuXHRNT0RFTDogJ2RhdGV0aW1lJyxcblx0UkVMQVRJT046ICdkYXRldGltZXMnLFxufTtcblxuZXhwb3J0IGNvbnN0IERBVEVUSU1FX1NUQVRVU19JRCA9IHtcblx0QUNUSVZFOiAnRFRBJyxcblx0Q0FOQ0VMTEVEOiAnRFRDJyxcblx0RVhQSVJFRDogJ0RURScsXG5cdElOQUNUSVZFOiAnRFRJJyxcblx0UE9TVFBPTkVEOiAnRFRQJyxcblx0U09MRF9PVVQ6ICdEVFMnLFxuXHRUUkFTSEVEOiAnRFRUJyxcblx0VVBDT01JTkc6ICdEVFUnLFxufTtcblxuZXhwb3J0IGNvbnN0IERBVEVUSU1FX1NUQVRVU19JRFMgPSB2YWx1ZXMoIERBVEVUSU1FX1NUQVRVU19JRCApO1xuXG5leHBvcnQgY29uc3QgTUlOVVRFX0lOX1NFQ09ORFMgPSA2MDtcbmV4cG9ydCBjb25zdCBIT1VSX0lOX1NFQ09ORFMgPSBNSU5VVEVfSU5fU0VDT05EUyAqIDYwO1xuZXhwb3J0IGNvbnN0IERBWV9JTl9TRUNPTkRTID0gSE9VUl9JTl9TRUNPTkRTICogMjQ7XG5leHBvcnQgY29uc3QgV0VFS19JTl9TRUNPTkRTID0gSE9VUl9JTl9TRUNPTkRTICogNztcbmV4cG9ydCBjb25zdCBNT05USF9JTl9TRUNPTkRTID0gREFZX0lOX1NFQ09ORFMgKiAzMDtcbiIsIi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgKiBhcyBiYXNlRm9ybWF0dGVyIGZyb20gJy4uL2Jhc2UtZGF0ZS1mb3JtYXR0ZXInO1xuXG4vKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgZm9yT3duLCBwdWxsQXQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtcblx0VElNRV9GT1JNQVRfU0lURSxcblx0REFURV9USU1FX0ZPUk1BVF9TSVRFLFxuXHRhbGxEYXRlVGltZXNBc1N0cmluZyxcblx0U0VQQVJBVE9SX1NQQUNFX0RBU0hfU1BBQ0UsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL2hlbHBlcnMnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBBcnJheSBvZiBmaWVsZHMgdGhhdCBoYXZlIGRhdGUgaW5mb3JtYXRpb25cbiAqIEB0eXBlIHsgc3RyaW5nW10gfVxuICovXG5leHBvcnQgY29uc3QgREFURV9GSUVMRFMgPSBbXG5cdCdEVFRfRVZUX3N0YXJ0Jyxcblx0J0RUVF9FVlRfZW5kJyxcbl07XG5cbi8qKlxuICogV2lsbCBob2xkIHRoZSBkeW5hbWljYWxseSBnZW5lcmF0ZWQgbGlzdCBvZiBmb3JtYXR0ZXJzIGZvciBkYXRlcy4gIEZvcm1hdHRlcnNcbiAqIGFyZSBmdW5jdGlvbnMgZGVmaW5lZCBpbiBgLi4vYmFzZS1kYXRlLWZvcm1hdHRlcmAgYnV0IHdyYXBwZWQgYnkgZHluYW1pY2FsbHlcbiAqIGdlbmVyYXRlZCBmdW5jdGlvbnMgKGNhbGxhYmxlIHZpYSBzYW1lIG5hbWUpIHRoYXQgYXV0b21hdGljYWxseSByZWNlaXZlIHRoZVxuICogY29ycmVjdCBkYXRlRmllbGRzTWFwIGFyZ3VtZW50LlxuICpcbiAqIEVnLiAgYC4uL2Jhc2UtZGF0ZS1mb3JtYXR0ZXIgaGFzXG4gKiBmb3JtYXREYXRlc09uRW50aXRpZXMoIGVudGl0aWVzLCBlbnRpdHlEYXRlRmllbGRzLCBmb3JtYXQsIGxvY2FsICk7XG4gKiBXaGVuIGltcG9ydGluZyBgZm9ybWF0RGF0ZXNPbkVudGl0aWVzYCBmcm9tIHRoaXMgZmlsZSwgeW91IGNhbiBjYWxsIGl0IHNpbXBseVxuICogYnkgZG9pbmcgdGhpczpcbiAqXG4gKiBmb3JtYXREYXRlc09uRW50aXRpZXMoIGRhdGVUaW1lT2JqZWN0cywgZm9ybWF0LCBsb2NhbCApO1xuICpcbiAqIE5vdGljZSB0aGF0IGl0J3MgY2FsbGVkIHdpdGhvdXQgdGhlIGVudGl0eURhdGVGaWVsZHMgYXJndW1lbnQgYmVjYXVzZSB0aGF0J3NcbiAqIHByb3ZpZGVkIGJ5IHRoaXMgZ2VuZXJhdG9yLlxuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgZm9ybWF0dGVycyA9IHt9O1xuXG5mb3JPd24oIGJhc2VGb3JtYXR0ZXIsICggaW1wbGVtZW50YXRpb24sIGZ1bmN0aW9uTmFtZSApID0+IHtcblx0Zm9ybWF0dGVyc1sgZnVuY3Rpb25OYW1lIF0gPSAoIC4uLmluY29taW5nQXJncyApID0+IHtcblx0XHRjb25zdCBmaXJzdEFyZyA9IHB1bGxBdCggaW5jb21pbmdBcmdzLCAwICk7XG5cdFx0cmV0dXJuIGltcGxlbWVudGF0aW9uKCBmaXJzdEFyZ1sgMCBdLCBEQVRFX0ZJRUxEUywgLi4uaW5jb21pbmdBcmdzICk7XG5cdH07XG59ICk7XG5cbi8qKlxuICogVGhpcyB3aWxsIHNwaXQgb3V0IGEgcHJldHRpZmllZCBsYWJlbCBmb3IgdGhlIHByb3ZpZGVkIERhdGVUaW1lIGVudGl0eS5cbiAqXG4gKiBJZiB0aGVyZSBpcyBhIERUVF9uYW1lLCB0aGUgZm9ybWF0IHdpbGwgYmU6XG4gKiBgRFRUX25hbWUgKERUVF9FVlRfc3RhcnQgLSBEVFRfRVZUX2VuZClgXG4gKlxuICogSWYgbm8gRFRUX25hbWUgdGhlbjpcbiAqIGBEVFRfRVZUX3N0YXJ0IC0gRFRUX0VWVF9lbmRgXG4gKlxuICogVGhpcyB3aWxsIGFjY291bnQgZm9yIGlmIGJvdGggc3RhcnQgYW5kIGVuZCBhcmUgaW4gdGhlIHNhbWUgZGF5IGFuZCBzaW1wbHlcbiAqIHVzZSB0aW1lIGZvciB0aGUgZW5kIHBhcnQuXG4gKlxuICogQHBhcmFtIHsgQmFzZUVudGl0eSB9IERhdGVUaW1lRW50aXR5XG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIEEgZm9ybWF0dGVkIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHByb3ZpZGVkXG4gKiAgICBEYXRlVGltZUVudGl0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IHByZXR0eURhdGVGcm9tRGF0ZVRpbWUgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuXHRsZXQgY29udGVudCA9ICcnO1xuXHRpZiAoIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBEYXRlVGltZUVudGl0eSwgJ2RhdGV0aW1lJyApICkge1xuXHRcdGlmICggRGF0ZVRpbWVFbnRpdHkuRFRUX0VWVF9zdGFydC5oYXNTYW1lKFxuXHRcdFx0RGF0ZVRpbWVFbnRpdHkuRFRUX0VWVF9lbmQsXG5cdFx0XHQnZGF5J1xuXHRcdCkgKSB7XG5cdFx0XHRjb250ZW50ICs9IGFsbERhdGVUaW1lc0FzU3RyaW5nKFxuXHRcdFx0XHRTRVBBUkFUT1JfU1BBQ0VfREFTSF9TUEFDRSxcblx0XHRcdFx0RGF0ZVRpbWVFbnRpdHkuRFRUX0VWVF9zdGFydC50b0Zvcm1hdChcblx0XHRcdFx0XHREQVRFX1RJTUVfRk9STUFUX1NJVEVcblx0XHRcdFx0KSxcblx0XHRcdFx0RGF0ZVRpbWVFbnRpdHkuRFRUX0VWVF9lbmQudG9Gb3JtYXQoXG5cdFx0XHRcdFx0VElNRV9GT1JNQVRfU0lURVxuXHRcdFx0XHQpLFxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29udGVudCArPSBhbGxEYXRlVGltZXNBc1N0cmluZyhcblx0XHRcdFx0U0VQQVJBVE9SX1NQQUNFX0RBU0hfU1BBQ0UsXG5cdFx0XHRcdERhdGVUaW1lRW50aXR5LkRUVF9FVlRfc3RhcnQudG9Gb3JtYXQoXG5cdFx0XHRcdFx0REFURV9USU1FX0ZPUk1BVF9TSVRFXG5cdFx0XHRcdCksXG5cdFx0XHRcdERhdGVUaW1lRW50aXR5LkRUVF9FVlRfZW5kLnRvRm9ybWF0KFxuXHRcdFx0XHRcdERBVEVfVElNRV9GT1JNQVRfU0lURVxuXHRcdFx0XHQpLFxuXHRcdFx0KTtcblx0XHR9XG5cdFx0Y29udGVudCA9IERhdGVUaW1lRW50aXR5LkRUVF9uYW1lID9cblx0XHRcdGAkeyBEYXRlVGltZUVudGl0eS5EVFRfbmFtZSB9ICgkeyBjb250ZW50IH0pYCA6XG5cdFx0XHRjb250ZW50O1xuXHR9XG5cdHJldHVybiBjb250ZW50O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZm9ybWF0dGVycztcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9mb3JtYXR0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9zdGF0dXMtaGVscGVyJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxuXHRHUkVBVEVSX1RIQU4sXG5cdEdSRUFURVJfVEhBTl9BTkRfRVFVQUwsXG5cdExFU1NfVEhBTl9BTkRfRVFVQUwsXG59IGZyb20gJy4uL2Jhc2UnO1xuXG5leHBvcnQgY29uc3Qgbm93RGF0ZUFuZFRpbWUgPSBtb21lbnQoKTtcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdFx0J0RUVF9uYW1lJyxcblx0XHRcdCdEVFRfSUQnLFxuXHRcdFx0J3N0YXJ0X2RhdGUnLFxuXHRcdFx0J2VuZF9kYXRlJyxcblx0XHRdICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0XHRzaG93RXhwaXJlZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0bW9udGg6IFByb3BUeXBlcy5tb250aCxcblx0fSApLFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdFx0c2hvd0V4cGlyZWQ6IGJvb2xlYW5cbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ3N0YXJ0X2RhdGUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9ERVNDLFxuXHRcdHNob3dFeHBpcmVkOiBmYWxzZSxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0c3RhcnRfZGF0ZTogJ0RUVF9FVlRfc3RhcnQnLFxuXHRcdGVuZF9kYXRlOiAnRFRUX0VWVF9lbmQnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiBldmVudHMgZW5kcG9pbnQgcmVxdWVzdCB1c2luZyBwcm92aWRlZFxuICogaW5mb3JtYXRpb24uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgIElEIGZvciBFdmVudCB0byByZXRyaWV2ZSBkYXRldGltZXMgZnJvbVxuICogQHBhcmFtIHtib29sZWFufSBzaG93RXhwaXJlZCAgV2hldGhlciBvciBub3QgdG8gaW5jbHVkZSBleHBpcmVkIGV2ZW50cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb250aCAgICAgICAgIFJldHVybiBldmVudHMgZm9yIHRoZSBnaXZlbiBtb250aC4gIENhbiBiZSBhbnlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gYW55IG1vbnRoIGZvcm1hdCByZWNvZ25pemVkIGJ5IG1vbWVudC5cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgVGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7XG5cdGZvckV2ZW50SWQgPSAwLFxuXHRzaG93RXhwaXJlZCA9IGZhbHNlLFxuXHRtb250aCA9ICdub25lJyxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cdGlmICggISBzaG93RXhwaXJlZCApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RUVF9FVlRfZW5kKipleHBpcmVkXVtdPScgKyBHUkVBVEVSX1RIQU4gK1xuXHRcdFx0JyZ3aGVyZVtEVFRfRVZUX2VuZCoqZXhwaXJlZF1bXT0nICtcblx0XHRcdG5vd0RhdGVBbmRUaW1lLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmICggbW9udGggJiYgbW9udGggIT09ICdub25lJyApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RUVF9FVlRfc3RhcnRdW109JyArIEdSRUFURVJfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtEVFRfRVZUX3N0YXJ0XVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuc3RhcnRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRFRUX0VWVF9lbmRdW109JyArIExFU1NfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0JyZ3aGVyZVtEVFRfRVZUX2VuZF1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLmVuZE9mKCAnbW9udGgnICkubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0aWYgKCBwYXJzZUludCggZm9yRXZlbnRJZCwgMTAgKSAhPT0gMCApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbRXZlbnQuRVZUX0lEXT0nICsgZm9yRXZlbnRJZCApO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc01vZGVsRW50aXR5T2ZNb2RlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgREFURVRJTUVfU1RBVFVTX0lELCBNT0RFTF9OQU1FUywgTU9OVEhfSU5fU0VDT05EUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBwYXJzZUluZmluaXR5IGZyb20gJy4uLy4uLy4uL3V0aWxzL3BhcnNlLWluZmluaXR5JztcblxuY29uc3QgeyBNT0RFTCB9ID0gTU9ERUxfTkFNRVM7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG4gKi9cbmNvbnN0IGFzc2VydERhdGVUaW1lRW50aXR5ID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcblx0aWYgKCAhIGlzTW9kZWxFbnRpdHlPZk1vZGVsKCBEYXRlVGltZUVudGl0eSwgTU9ERUwgKSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0J1RoZSBwcm92aWRlZCBlbnRpdHkgaXMgbm90IGEgZGF0ZXRpbWUgaW5zdGFuY2UnXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZVRyYXNoZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IHRyYXNoZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZXZlbnQgZGF0ZSBpcyB2YWxpZCBlbnRpdHkgb3IgYXJjaGl2ZVxuICovXG5jb25zdCBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlID0gKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgKSA9PiB7XG5cdHJldHVybiAoIGluY2x1ZGVUcmFzaGVkICYmIGFzc2VydERhdGVUaW1lRW50aXR5KCBEYXRlVGltZUVudGl0eSApICkgfHxcbiAgICAgICAgKCAhIGluY2x1ZGVUcmFzaGVkICYmICEgaXNUcmFzaGVkKCBEYXRlVGltZUVudGl0eSApICk7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlVHJhc2hlZCBpZiB0cnVlIHdpbGwgbm90IGZpbHRlciBvdXQgdHJhc2hlZCBlbnRpdGllc1xuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBldmVudCBkYXRlIGlzIG9jY3VycmluZyBOT1dcbiAqL1xuZXhwb3J0IGNvbnN0IGlzQWN0aXZlID0gKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgPSBmYWxzZSApID0+IHtcblx0cmV0dXJuIGlzVmFsaWRFbnRpdHlPckFyY2hpdmUoIERhdGVUaW1lRW50aXR5LCBpbmNsdWRlVHJhc2hlZCApICYmXG5cdERhdGVUaW1lRW50aXR5LnN0YXJ0LmRpZmZOb3coKS5hc1NlY29uZHMoKSA8IDAgJiZcblx0RGF0ZVRpbWVFbnRpdHkuZW5kLmRpZmZOb3coKS5hc1NlY29uZHMoKSA+IDA7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlVHJhc2hlZCBpZiB0cnVlIHdpbGwgbm90IGZpbHRlciBvdXQgdHJhc2hlZCBlbnRpdGllc1xuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBlbmQgZGF0ZSBpcyBpbiB0aGUgcGFzdFxuICovXG5leHBvcnQgY29uc3QgaXNFeHBpcmVkID0gKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgPSBmYWxzZSApID0+IHtcblx0cmV0dXJuIGlzVmFsaWRFbnRpdHlPckFyY2hpdmUoIERhdGVUaW1lRW50aXR5LCBpbmNsdWRlVHJhc2hlZCApICYmXG5cdERhdGVUaW1lRW50aXR5LmVuZC5kaWZmTm93KCkuYXNTZWNvbmRzKCkgPCAwO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZVRyYXNoZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IHRyYXNoZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZW5kIGRhdGUgaXMgaW4gdGhlIHBhc3RcbiAqL1xuZXhwb3J0IGNvbnN0IGlzUmVjZW50bHlFeHBpcmVkID0gKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgPSBmYWxzZSApID0+IHtcblx0cmV0dXJuIGlzVmFsaWRFbnRpdHlPckFyY2hpdmUoIERhdGVUaW1lRW50aXR5LCBpbmNsdWRlVHJhc2hlZCApICYmXG5cdERhdGVUaW1lRW50aXR5LmVuZC5kaWZmTm93KCkuYXNTZWNvbmRzKCkgPCAwICYmXG5cdERhdGVUaW1lRW50aXR5LmVuZC5kaWZmTm93KCkuYXNTZWNvbmRzKCkgPiAoIE1PTlRIX0lOX1NFQ09ORFMgKiAtMSApO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZVRyYXNoZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IHRyYXNoZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGlja2V0cyBzb2xkIG1lZXRzIG9yIGV4Y2VlZHMgcmVnaXN0cmF0aW9uIGxpbWl0XG4gKi9cbmV4cG9ydCBjb25zdCBpc1NvbGRPdXQgPSAoIERhdGVUaW1lRW50aXR5LCBpbmNsdWRlVHJhc2hlZCA9IGZhbHNlICkgPT4ge1xuXHRpZiAoXG5cdFx0KCBpbmNsdWRlVHJhc2hlZCAmJiAhIGFzc2VydERhdGVUaW1lRW50aXR5KCBEYXRlVGltZUVudGl0eSApICkgfHxcblx0XHQoICEgaW5jbHVkZVRyYXNoZWQgJiYgaXNUcmFzaGVkKCBEYXRlVGltZUVudGl0eSApIClcblx0KSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGxldCBjYXAgPSBEYXRlVGltZUVudGl0eS5yZWdMaW1pdDtcblx0Y2FwID0gcGFyc2VJbmZpbml0eSggY2FwLCB0cnVlICk7XG5cdHJldHVybiBjYXAgIT09IEluZmluaXR5ICYmIERhdGVUaW1lRW50aXR5LnNvbGQgPj0gY2FwO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZVRyYXNoZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IHRyYXNoZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgc3RhcnQgZGF0ZSBpcyBpbiB0aGUgZnV0dXJlXG4gKi9cbmV4cG9ydCBjb25zdCBpc1VwY29taW5nID0gKCBEYXRlVGltZUVudGl0eSwgaW5jbHVkZVRyYXNoZWQgPSBmYWxzZSApID0+IHtcblx0cmV0dXJuIGlzVmFsaWRFbnRpdHlPckFyY2hpdmUoIERhdGVUaW1lRW50aXR5LCBpbmNsdWRlVHJhc2hlZCApICYmXG5cdERhdGVUaW1lRW50aXR5LnN0YXJ0LmRpZmZOb3coKS5hc1NlY29uZHMoKSA+IDA7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IERhdGVUaW1lRW50aXR5IG1vZGVsIG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBkYXRlIGlzIGFyY2hpdmVkXG4gKi9cbmV4cG9ydCBjb25zdCBpc1RyYXNoZWQgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuXHRhc3NlcnREYXRlVGltZUVudGl0eSggRGF0ZVRpbWVFbnRpdHkgKTtcblx0cmV0dXJuIERhdGVUaW1lRW50aXR5LmRlbGV0ZWQ7XG59O1xuXG4vLyBQTFogTk9URTpcbi8vIGxlYXZpbmcgdGhlIGZvbGxvd2luZyBjb2RlIGluIGJlY2F1c2UgaXQgY2FuIGJlIHVzZWQgaWYvd2hlbiB3ZSBkZWNpZGVcbi8vIHRvIGZ1bGx5IHN1cHBvcnQgdGhlc2UgZGF0ZXRpbWUgc3RhdHVzZXMgd2hpY2ggYXJlIGN1cnJlbnRseSBkZWZpbmVkXG4vLyBvbiB0aGUgRUVfRGF0ZXRpbWUgbW9kZWwgb2JqZWN0IGNsYXNzIGJ1dCBub3QgeWV0IHVzZWRcblxuLy8gLyoqXG4vLyAgKiBAZnVuY3Rpb25cbi8vICAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3Rcbi8vICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZGF0ZSBpcyBjYW5jZWxsZWRcbi8vICAqL1xuLy8gZXhwb3J0IGNvbnN0IGlzQ2FuY2VsbGVkID0gKCBEYXRlVGltZUVudGl0eSApID0+IHtcbi8vIFx0YXNzZXJ0RGF0ZVRpbWVFbnRpdHkoIERhdGVUaW1lRW50aXR5ICk7XG4vLyBcdHJldHVybiBEYXRlVGltZUVudGl0eS5jYW5jZWxsZWQ7XG4vLyB9O1xuLy9cbi8vIC8qKlxuLy8gICogQGZ1bmN0aW9uXG4vLyAgKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4vLyAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGRhdGUgaGFzIGJlZW4gcG9zdHBvbmVkXG4vLyAgKi9cbi8vIGV4cG9ydCBjb25zdCBpc1Bvc3Rwb25lZCA9ICggRGF0ZVRpbWVFbnRpdHkgKSA9PiB7XG4vLyBcdGFzc2VydERhdGVUaW1lRW50aXR5KCBEYXRlVGltZUVudGl0eSApO1xuLy8gXHRyZXR1cm4gRGF0ZVRpbWVFbnRpdHkucG9zdHBvbmVkO1xuLy8gfTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ30gc3RhdHVzIElEXG4gKi9cbmV4cG9ydCBjb25zdCBzdGF0dXMgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuXHRpZiAoIGlzVHJhc2hlZCggRGF0ZVRpbWVFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gREFURVRJTUVfU1RBVFVTX0lELlRSQVNIRUQ7XG5cdH1cblx0aWYgKCBpc0V4cGlyZWQoIERhdGVUaW1lRW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIERBVEVUSU1FX1NUQVRVU19JRC5FWFBJUkVEO1xuXHR9XG5cdGlmICggaXNTb2xkT3V0KCBEYXRlVGltZUVudGl0eSApICkge1xuXHRcdHJldHVybiBEQVRFVElNRV9TVEFUVVNfSUQuU09MRF9PVVQ7XG5cdH1cblx0aWYgKCBpc1VwY29taW5nKCBEYXRlVGltZUVudGl0eSApICkge1xuXHRcdHJldHVybiBEQVRFVElNRV9TVEFUVVNfSUQuVVBDT01JTkc7XG5cdH1cblx0aWYgKCBpc0FjdGl2ZSggRGF0ZVRpbWVFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gREFURVRJTUVfU1RBVFVTX0lELkFDVElWRTtcblx0fVxuXHQvLyBQTFogU0VFIE5PVEUgQUJPVkVcblx0Ly8gaWYgKCBpc0NhbmNlbGxlZCggRGF0ZVRpbWVFbnRpdHkgKSApIHtcblx0Ly8gXHRyZXR1cm4gREFURVRJTUVfU1RBVFVTX0lELkNBTkNFTExFRDtcblx0Ly8gfVxuXHQvLyBpZiAoIGlzUG9zdHBvbmVkKCBEYXRlVGltZUVudGl0eSApICkge1xuXHQvLyBcdHJldHVybiBEQVRFVElNRV9TVEFUVVNfSUQuUE9TVFBPTkVEO1xuXHQvLyB9XG5cdGFzc2VydERhdGVUaW1lRW50aXR5KCBEYXRlVGltZUVudGl0eSApO1xuXHRyZXR1cm4gREFURVRJTUVfU1RBVFVTX0lELklOQUNUSVZFO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBEYXRlVGltZUVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgQ1NTIGNsYXNzIGZvciB0aGUgYmFja2dyb3VuZCBjb2xvclxuICovXG5leHBvcnQgY29uc3QgZ2V0QmFja2dyb3VuZENvbG9yQ2xhc3MgPSAoIERhdGVUaW1lRW50aXR5ICkgPT4ge1xuXHRyZXR1cm4gYGVlLXN0YXR1cy1iYWNrZ3JvdW5kLWNvbG9yLSR7IHN0YXR1cyggRGF0ZVRpbWVFbnRpdHkgKSB9YDtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gRGF0ZVRpbWVFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9IGRhdGUgc3RhdHVzXG4gKi9cbmV4cG9ydCBjb25zdCBnZXREYXRlVGltZVN0YXR1c1RleHRMYWJlbCA9ICggRGF0ZVRpbWVFbnRpdHkgKSA9PiB7XG5cdGxldCBkYXRlU3RhdHVzID0gJyc7XG5cdHN3aXRjaCAoIHN0YXR1cyggRGF0ZVRpbWVFbnRpdHkgKSApIHtcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5TT0xEX09VVCA6XG5cdFx0XHRkYXRlU3RhdHVzID0gX18oICdzb2xkIG91dCcsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgREFURVRJTUVfU1RBVFVTX0lELkVYUElSRUQgOlxuXHRcdFx0ZGF0ZVN0YXR1cyA9IF9fKCAnZXhwaXJlZCcsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgREFURVRJTUVfU1RBVFVTX0lELlVQQ09NSU5HIDpcblx0XHRcdGRhdGVTdGF0dXMgPSBfXyggJ3VwY29taW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBEQVRFVElNRV9TVEFUVVNfSUQuQUNUSVZFIDpcblx0XHRcdGRhdGVTdGF0dXMgPSBfXyggJ2FjdGl2ZScsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgREFURVRJTUVfU1RBVFVTX0lELlRSQVNIRUQgOlxuXHRcdFx0ZGF0ZVN0YXR1cyA9IF9fKCAnYXJjaGl2ZWQnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIERBVEVUSU1FX1NUQVRVU19JRC5DQU5DRUxMRUQgOlxuXHRcdFx0ZGF0ZVN0YXR1cyA9IF9fKCAnY2FuY2VsbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBEQVRFVElNRV9TVEFUVVNfSUQuUE9TVFBPTkVEIDpcblx0XHRcdGRhdGVTdGF0dXMgPSBfXyggJ3Bvc3Rwb25lZCcsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgREFURVRJTUVfU1RBVFVTX0lELklOQUNUSVZFIDpcblx0XHRkZWZhdWx0OlxuXHRcdFx0ZGF0ZVN0YXR1cyA9IF9fKCAnaW5hY3RpdmUnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0fVxuXHRyZXR1cm4gZGF0ZVN0YXR1cztcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBtYXBWYWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbWVtaXplJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgZW5kcG9pbnRzIH0gZnJvbSAnLi9lbmRwb2ludHMuanMnO1xuXG4vKipcbiAqIFJlY2VpdmVzIGFuIG9iamVjdCBtYXAgb2YgbW9kZWxOYW1lIHRvIGVuZHBvaW50IGFuZCBtYXBzIHRoYXQgdG8gYSBkZWZhdWx0XG4gKiBtYXAgb2YgbW9kZWxOYW1lIHRvIGVtcHR5IG9iamVjdC5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBtb2RlbE5hbWVFbmRwb2ludHNcbiAqIEByZXR1cm4geyBPYmplY3QgfSBBbiBvYmplY3Qgb2YgeyB7IG1vZGVsTmFtZSB9IDoge30gfVxuICovXG5jb25zdCBtYXBUb09iamVjdFZhbHVlcyA9ICggbW9kZWxOYW1lRW5kcG9pbnRzICkgPT4ge1xuXHRyZXR1cm4gbWFwVmFsdWVzKCBtb2RlbE5hbWVFbmRwb2ludHMsXG5cdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fSxcblx0KTtcbn07XG5cbmNvbnN0IGdldERlZmF1bHRNb2RlbEVudGl0aWVzT2JqZWN0ID0gbWVtb2l6ZShcblx0KCkgPT4gbWFwVG9PYmplY3RWYWx1ZXMoIGVuZHBvaW50cyApXG4pO1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBkZWZhdWx0IHN0YXRlIHRvIGJlIHVzZWQgYnkgc3RvcmVzIGNvbnRhaW5pbmcgbGlzdHMuXG4gKlxuICogQHR5cGUgeyBPYmplY3QgfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9MSVNUU19TVEFURSA9IG1hcFRvT2JqZWN0VmFsdWVzKCBlbmRwb2ludHMgKTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBzdGF0ZSB0byBiZSB1c2VkIGJ5IHRoZSBjb3JlIHN0b3JlLlxuICpcbiAqIEB0eXBlIHt7ZW50aXRpZXM6IHt9LCBlbnRpdHlJZHM6IHt9LCBkaXJ0eToge319fVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT1JFX1NUQVRFID0ge1xuXHRlbnRpdGllczoge1xuXHRcdC4uLmdldERlZmF1bHRNb2RlbEVudGl0aWVzT2JqZWN0KCksXG5cdH0sXG5cdHJlbGF0aW9uczoge30sXG5cdGRpcnR5OiB7XG5cdFx0cmVsYXRpb25zOiB7XG5cdFx0XHRpbmRleDoge30sXG5cdFx0XHRkZWxldGU6IHt9LFxuXHRcdFx0YWRkOiB7fSxcblx0XHR9LFxuXHRcdHRyYXNoOiB7fSxcblx0XHRkZWxldGU6IHt9LFxuXHR9LFxufTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBzdGF0ZSB0byBiZSB1c2VkIGJ5IHRoZSBzY2hlbWEgc3RvcmUuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9TQ0hFTUFfU1RBVEUgPSB7XG5cdHNjaGVtYToge1xuXHRcdC4uLmdldERlZmF1bHRNb2RlbEVudGl0aWVzT2JqZWN0KCksXG5cdH0sXG5cdGZhY3Rvcnk6IHtcblx0XHQuLi5nZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCgpLFxuXHR9LFxuXHRyZWxhdGlvbkVuZHBvaW50czoge1xuXHRcdC4uLmdldERlZmF1bHRNb2RlbEVudGl0aWVzT2JqZWN0KCksXG5cdH0sXG5cdHJlbGF0aW9uU2NoZW1hOiB7fSxcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgYXNzZXJ0RW50aXR5SGFzS2V5IH0gZnJvbSAnLi9hc3NlcnRpb25zJztcblxuLyoqXG4gKiBBbGwgYXZhaWxhYmxlIGVuZHBvaW50cyBleHBvc2VkIHZpYSB0aGUgZWVqcy5kYXRhIGdsb2JhbCBmcm9tIHRoZSBzZXJ2ZXIuXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5leHBvcnQgY29uc3Qge1xuXHRjb2xsZWN0aW9uX2VuZHBvaW50czogZW5kcG9pbnRzID0ge30sXG5cdGJhc2VfcmVzdF9yb3V0ZTogYmFzZVJlc3RSb3V0ZSxcbn0gPSBkYXRhLnBhdGhzO1xuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgZW5kcG9pbnQgZm9yIHRoZSBwcm92aWRlZCBtb2RlbC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lICBXaGF0IG1vZGVsIHRvIHJldHJpZXZlIHRoZSBlbmRwb2ludCBmb3IuXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICBUaGUgZW5kcG9pbnQgZm9yIHRoZSBwcm92aWRlZCBtb2RlbC5cbiAqIEB0aHJvd3Mge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVuZHBvaW50ID0gKCBtb2RlbE5hbWUgKSA9PiB7XG5cdGFzc2VydEVudGl0eUhhc0tleSggbW9kZWxOYW1lLCBlbmRwb2ludHMgKTtcblx0cmV0dXJuIGVuZHBvaW50c1sgbW9kZWxOYW1lIF07XG59O1xuXG4vKipcbiAqIEFwcGxpZXMgdGhlIHByb3ZpZGVkIHF1ZXJ5U3RyaW5nIHRvIHRoZSBlbmRwb2ludCBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsIG5hbWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgV2hhdCBtb2RlbCB0aGUgZmluYWwgc3RyaW5nIGlzIGZvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVN0cmluZyAgVGhlIHF1ZXJ5IGJlaW5nIGFwcGVuZGVkIHRvIHRoZSBlbmRwb2ludC5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGZpbmFsIGFzc2VtYmxlZCBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBhcHBseVF1ZXJ5U3RyaW5nID0gKCBtb2RlbE5hbWUsIHF1ZXJ5U3RyaW5nID0gJycgKSA9PiB7XG5cdHJldHVybiBxdWVyeVN0cmluZyAhPT0gJycgP1xuXHRcdGdldEVuZHBvaW50KCBtb2RlbE5hbWUgKSArICc/JyArIHF1ZXJ5U3RyaW5nIDpcblx0XHRnZXRFbmRwb2ludCggbW9kZWxOYW1lICk7XG59O1xuXG4vKipcbiAqIFN0cmlwcyB0aGUgYmFzZV9yZXN0X3JvdXRlIChpLmUuIGh0dHBzOi8vbXl1cmwuY29tL3dwLWpzb24vKSBmcm9tIHRoZVxuICogcHJvdmlkZWQgdXJsIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSB1cmwgd2l0aCB0aGUgYmFzZSByZXN0IHJvdXRlIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBzdHJpcEJhc2VSb3V0ZUZyb21VcmwgPSAoIHVybCApID0+IHtcblx0cmV0dXJuIHVybC5yZXBsYWNlKCBiYXNlUmVzdFJvdXRlLCAnJyApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBzcHJpbnRmIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBJbnZhbGlkU2NoZW1hIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgeyBpc1NjaGVtYSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHtcblx0TW9uZXksXG5cdFNlcnZlckRhdGVUaW1lIGFzIERhdGVUaW1lLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWx1ZS1vYmplY3RzJztcbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRpc0RhdGVUaW1lRmllbGQsXG5cdGlzTW9uZXlGaWVsZCxcbn0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQge1xuXHRpc1NoYWxsb3dWYWxpZFZhbHVlRm9yRmllbGQsXG5cdHZhbGlkYXRlRW51bVR5cGUsXG5cdHZhbGlkYXRlVHlwZSxcblx0dmFsaWRhdGVUeXBlRm9yRmllbGQsXG59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5pbXBvcnQgeyBtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3RXaXRoQXNzZXJ0aW9ucyB9IGZyb20gJy4vZXh0cmFjdG9ycyc7XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCB2YWx1ZSBpcyBhIGtub3duIHZhbHVlIG9iamVjdC5cbiAqXG4gKiBOb3RlOiB0aGlzIG9ubHkgYXNzZXJ0cyBrbm93biB2YWx1ZSBvYmplY3RzLCBpZiB0aGUgdmFsdWUgaXMgbm90IGRldGVjdGVkIGFzXG4gKiBhIGtub3duIHZhbHVlIG9iamVjdCBpdCBpcyBwYXNzZWQgYmFjayBhcyBpcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEB0aHJvd3MgSW52YWxpZERhdGVUaW1lXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICovXG5leHBvcnQgY29uc3QgbWF5YmVBc3NlcnRWYWx1ZU9iamVjdCA9ICggZmllbGROYW1lLCBmaWVsZFZhbHVlLCBzY2hlbWEgKSA9PiB7XG5cdGlmICggaXNEYXRlVGltZUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApICkge1xuXHRcdERhdGVUaW1lLmFzc2VydElzRGF0ZVRpbWUoIGZpZWxkVmFsdWUgKTtcblx0fVxuXHRpZiAoIGlzTW9uZXlGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHRNb25leS5hc3NlcnRNb25leSggZmllbGRWYWx1ZSApO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgb2JqZWN0IGlzIGEgdmFsaWQgbW9kZWwgc2NoZW1hIG9iamVjdC5cbiAqXG4gKiBDdXJyZW50bHksIGFuIG9iamVjdCBpcyBjb25zaWRlcmVkIGEgdmFsaWQgbW9kZWwgc2NoZW1hIGlmIGl0IGhhcyBhXG4gKiAncHJvcGVydGllcycgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHsqfSBzY2hlbWFcbiAqIEB0aHJvd3MgSW52YWxpZFNjaGVtYVxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0VmFsaWRTY2hlbWEgPSAoIHNjaGVtYSApID0+IHtcblx0aWYgKCAhIGlzU2NoZW1hKCBzY2hlbWEgKSApIHtcblx0XHR0aHJvdyBuZXcgSW52YWxpZFNjaGVtYShcblx0XHRcdCdUaGlzIGlzIGFuIGludmFsaWQgc2NoZW1hIGZvciBhIG1vZGVsLicsXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHRoYXQgdGhlIGdpdmVuIGZpZWxkIGV4aXN0cyBpbiB0aGUgcHJvdmlkZWQgc2NoZW1hIGFuZCB0aGUgc2hhcGUgZm9yXG4gKiB0aGUgc2NoZW1hIGVudHJ5IG9uIHRoYXQgZmllbGQgaXMgZXhwZWN0ZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgVGhlIG1vZGVsIHRoZSBzY2hlbWEgYmVsb25ncyB0bywgdGhpcyBpcyB1c2VkIGZvclxuICogZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lICBUaGUgZmllbGQgYmVpbmcgY2hlY2tlZCBhZ2FpbnN0IHRoZSBzY2hlbWFcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWEgICAgIFRoZSBzY2hlbWEgZm9yIHRoZSBtb2RlbCB1c2VkIGZvciB2YWxpZGF0aW9uXG4gKiBAdGhyb3dzIEludmFsaWRTY2hlbWFcbiAqIEB0aHJvd3MgVHlwZUVycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRWYWxpZFNjaGVtYUZpZWxkUHJvcGVydGllcyA9IChcblx0bW9kZWxOYW1lLFxuXHRmaWVsZE5hbWUsXG5cdHNjaGVtYSxcbikgPT4ge1xuXHRpZiAoIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdHNwcmludGYoXG5cdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlc1wiIGZpZWxkTmFtZSBkb2VzIG5vdCBoYXZlIGEgZGVmaW5lZCBzY2hlbWEgZm9yIHRoZSBtb2RlbCBcIiVzXCInLFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdG1vZGVsTmFtZSxcblx0XHRcdCksXG5cdFx0KTtcblx0fVxuXHRpZiAoIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0aWYgKCBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFNjaGVtYShcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIHNjaGVtYSBmb3IgdGhlIGZpZWxkICVzIG9uIHRoZSBtb2RlbCAlcyBpcyBvZiB0eXBlIFwib2JqZWN0XCIgYnV0IGRvZXMgbm90IGhhdmUgYSBwcm9wZXJ0aWVzIHByb3BlcnR5LicsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdG1vZGVsTmFtZVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3ICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFNjaGVtYShcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIHNjaGVtYSBmb3IgdGhlIGZpZWxkICVzIG9uIHRoZSBtb2RlbCAlcyBpcyBvZiB0eXBlIFwib2JqZWN0XCIgYnV0IGRvZXMgbm90IGhhdmUgYSByYXcgcHJvcGVydHkgaW4gaXRcXCdzIFwicHJvcGVydGllc1wiIHByb3BlcnR5LicsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdG1vZGVsTmFtZVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LnR5cGUgKSApIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkU2NoZW1hKFxuXHRcdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHRcdCdUaGUgc2NoZW1hIGZvciB0aGUgZmllbGQgJXMgb24gdGhlIG1vZGVsICVzIGlzIG9mIHR5cGUgXCJvYmplY3RcIiBhbmQgaGFzIGEgcHJvcGVydGllcy5yYXcgcHJvcGVydHksIGhvd2V2ZXIgdGhlcmUgaXMgbm8gXCJ0eXBlXCIgZGVmaW5lZCBmb3IgdGhlIHJhdyBwcm9wZXJ0eS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRtb2RlbE5hbWVcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgdGhhdCB0aGUgdmFsdWUgcHJvdmlkZWQgZm9yIHRoZSBwcmVwYXJlZCBmaWVsZCBpcyB2YWxpZCBhY2NvcmRpbmcgdG9cbiAqIHRoZSBzY2hlbWEuXG4gKlxuICogUHJlcGFyZWQgZmllbGRzIGFyZTpcbiAqXG4gKiAtIGZpZWxkcyBoYXZpbmcgdmFsdWVzIHRoYXQgYXJlIHNldCBhcyBhIHZhbHVlIG9iamVjdCBhbmQgZXhwZWN0IGEgdmFsdWVcbiAqICAgb2JqZWN0IG9uIHVwZGF0ZXMvaW5zZXJ0cy5cbiAqIC0gZmllbGRzIHRoYXQgYXJlIHRoZSBlcXVpdmFsZW50IGByYXdgIHZhbHVlIHdoZW4gdGhlIGZpZWxkIGluIHRoZSBzY2hlbWEgaXNcbiAqICAgZGVmaW5lZCB0byBoYXZlIHJhdyBhbmQgcmVuZGVyZWQvcHJldHR5IHZhbHVlcy5cbiAqXG4gKiBOb3RlOiAgVGhpcyB2YWxpZGF0ZXMgYWdhaW5zdCBwcmVwYXJlZCBmaWVsZHMgd2hpY2ggbWVhbnMgdGhhdDpcbiAqXG4gKiAtIGlmIHRoZSBwcmVwYXJlZCBmaWVsZCBoYXMgYSB2YWx1ZSBvYmplY3QgYXMgaXRzIHZhbHVlLCB0aGVuIHRoYXQgdmFsdWVcbiAqICAgb2JqZWN0IGlzIHZhbGlkYXRlZCBiZWZvcmUgYW55IG90aGVyIHZhbGlkYXRpb24uXG4gKiAtIGlmIHRoZSBwcmVwYXJlZCBmaWVsZCByZXByZXNlbnRzIGFuIG9iamVjdCBpbiB0aGUgc2NoZW1hLCB0aGVuIGl0cyB2YWx1ZSBpc1xuICogICB2YWxpZGF0ZWQgYWdhaW5zdCB0aGUgYHJhd2AgdHlwZSBpbiB0aGUgc2NoZW1hLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICogQHRocm93cyBJbnZhbGlkRGF0ZVRpbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydFZhbGlkVmFsdWVGb3JQcmVwYXJlZEZpZWxkID0gKFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdGluc3RhbmNlLFxuKSA9PiB7XG5cdGNvbnN0IHsgc2NoZW1hIH0gPSBpbnN0YW5jZTtcblx0bGV0IGlzVmFsaWQgPSBpc1NoYWxsb3dWYWxpZFZhbHVlRm9yRmllbGQoXG5cdFx0ZmllbGROYW1lLFxuXHRcdGZpZWxkVmFsdWUsXG5cdFx0c2NoZW1hLFxuXHQpO1xuXHRpZiAoICEgaXNWYWxpZCAmJiBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUgPT09ICdvYmplY3QnICYmXG5cdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzXG5cdCkge1xuXHRcdGlzVmFsaWQgPSBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LmVudW0gP1xuXHRcdFx0dmFsaWRhdGVFbnVtVHlwZShcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy50eXBlLFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LmVudW0sXG5cdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHQpIDpcblx0XHRcdHZhbGlkYXRlVHlwZShcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy50eXBlLFxuXHRcdFx0XHRtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3RXaXRoQXNzZXJ0aW9ucyhcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRzY2hlbWFcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHRpZiAoICEgaXNWYWxpZCApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdHNwcmludGYoXG5cdFx0XHRcdFx0J1RoZSBnaXZlbiBcIiUxJHNcIiBmaWVsZCAgaXMgbm90IHZhbGlkIGZvciB0aGUgZGVmaW5lZCBzY2hlbWEuICBJdFxcJ3MgYHJhd2AgcHJvcGVydHkgVmFsdWUgKCUyJHMpIGlzIG5vdCB0aGUgY29ycmVjdCBleHBlY3RlZCB0eXBlICglMyRzKS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5yYXcudHlwZSxcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cdGlmICggISBpc1ZhbGlkICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHQnVGhlIGdpdmVuIFwiJTEkc1wiIGZpZWxkXFwncyBWYWx1ZSAoJTIkcykgaXMgbm90IHZhbGlkIGZvciB0aGUgZGVmaW5lZCBzY2hlbWEgdHlwZSAoJTMkcykuJyxcblx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUsXG5cdFx0XHQpLFxuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSB2YWx1ZSBmb3IgdGhlIGdpdmVuIGZpZWxkIGlzIHZhbGlkIGFjY29yZGluZyB0byB0aGVcbiAqIHNjaGVtYS5cbiAqXG4gKiBUaGlzIGlzIHVzZWQgb24gZW50aXR5IGNvbnN0cnVjdGlvbiBhbmQgZG9lcyBub3QgdmFsaWRhdGUgcHJlcGFyZWQgZmllbGRcbiAqIHZhbHVlcyAoc2VlIGFzc2VydCBhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZCkuXG4gKlxuICogVGhpcyBtZXRob2QgYWxzbyBhc3NlcnRzIHRoYXQgdGhlIHNjaGVtYSBoYXMgdmFsaWQgc2NoZW1hIGZpZWxkIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEB0aHJvd3MgVHlwZUVycm9yXG4gKiBAdGhyb3dzIEludmFsaWRTY2hlbWFcbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydFZhbGlkRmllbGRBbmRWYWx1ZUFnYWluc3RTY2hlbWEgPSAoXG5cdG1vZGVsTmFtZSxcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRpbnN0YW5jZSxcbikgPT4ge1xuXHRjb25zdCBzY2hlbWEgPSBpbnN0YW5jZS5zY2hlbWE7XG5cdGNvbnN0IHZhbGlkYXRpb25UeXBlID0gdmFsaWRhdGVUeXBlRm9yRmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2UgKTtcblx0YXNzZXJ0VmFsaWRTY2hlbWFGaWVsZFByb3BlcnRpZXMoIG1vZGVsTmFtZSwgZmllbGROYW1lLCBzY2hlbWEgKTtcblx0bGV0IGlzVmFsaWQgPSBpc1NoYWxsb3dWYWxpZFZhbHVlRm9yRmllbGQoXG5cdFx0ZmllbGROYW1lLFxuXHRcdGZpZWxkVmFsdWUsXG5cdFx0c2NoZW1hLFxuXHRcdGZhbHNlLFxuXHQpO1xuXHQvLyBhY2NvdW50IGZvciBmaWVsZE5hbWUgZmllbGRWYWx1ZXMgdGhhdCBoYXZlIHByb3BlcnR5IHNjaGVtYS4gRm9yIE1vZGVsXG5cdC8vIEVudGl0aWVzLCBvbmx5IHRoZSBWQUxJREFURV9UWVBFIHByb3BlcnR5IGlzIGNhcmVkIGFib3V0LlxuXHRpZiAoIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgJiZcblx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXNcblx0KSB7XG5cdFx0aWYgKCBpc1VuZGVmaW5lZCggZmllbGRWYWx1ZVsgdmFsaWRhdGlvblR5cGUgXSApICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIGdpdmVuIFwiJTEkc1wiIHZhbHVlIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hLiBJdCBtdXN0IGJlIGFuIG9iamVjdCBhbmQgaXQgbXVzdCBoYXZlIGEgYCUyJHNgIGtleS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHR2YWxpZGF0aW9uVHlwZSxcblx0XHRcdFx0KSxcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlzVmFsaWQgPSBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXNbIHZhbGlkYXRpb25UeXBlIF0uZW51bSA/XG5cdFx0XHR2YWxpZGF0ZUVudW1UeXBlKFxuXHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXNbIHZhbGlkYXRpb25UeXBlIF0udHlwZSxcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy5lbnVtLFxuXHRcdFx0XHRmaWVsZFZhbHVlWyB2YWxpZGF0aW9uVHlwZSBdLFxuXHRcdFx0KSA6XG5cdFx0XHR2YWxpZGF0ZVR5cGUoXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllc1sgdmFsaWRhdGlvblR5cGUgXS50eXBlLFxuXHRcdFx0XHRmaWVsZFZhbHVlWyB2YWxpZGF0aW9uVHlwZSBdXG5cdFx0XHQpO1xuXHRcdGlmICggISBpc1ZhbGlkICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIGdpdmVuIFwiJTEkc1wiIHZhbHVlIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hLiAgSXRcXCdzIGAlMiRzYCBwcm9wZXJ0eSB2YWx1ZSAoJTMkcykgaXMgbm90IHRoZSBjb3JyZWN0IGV4cGVjdGVkIHR5cGUgKCU0JHMpLicsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdHZhbGlkYXRpb25UeXBlLFxuXHRcdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzWyB2YWxpZGF0aW9uVHlwZSBdLnR5cGUsXG5cdFx0XHRcdCksXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXHRpZiAoICEgaXNWYWxpZCApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0c3ByaW50Zihcblx0XHRcdFx0J1RoZSBnaXZlbiBcIiUxJHNcIiBmaWVsZFxcJ3MgdmFsdWUgKCUyJHMpIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hIHR5cGUgKCUzJHMpLicsXG5cdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlLFxuXHRcdFx0KSxcblx0XHQpO1xuXHR9XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzQXJyYXksIHVwcGVyRmlyc3QsIGNhbWVsQ2FzZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdtZW1pemUnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgYXNzZXJ0VmFsaWRTY2hlbWEgfSBmcm9tICcuL2Fzc2VydGlvbnMnO1xuaW1wb3J0IHtcblx0Y3JlYXRlR2V0dGVyLFxuXHRjcmVhdGVFbnRpdHlHZXR0ZXJzQW5kU2V0dGVycyxcblx0Y3JlYXRlUGVyc2lzdGluZ0dldHRlcnNBbmRTZXR0ZXJzLFxuXHRzZXRTYXZlU3RhdGUsXG59IGZyb20gJy4vY3JlYXRlJztcbmltcG9ydCB7XG5cdFNBVkVfU1RBVEUsXG5cdFBSSVZBVEVfUFJPUEVSVElFUyxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEJhc2VFbnRpdHkgaXMgdGhlIGJhc2ljIGNsYXNzIGZvciBhbGwgZW50aXRpZXMuICBjcmVhdGVFbnRpdHlGYWN0b3J5IHJldHVybnNcbiAqIGFuIGluc3RhbmNlIG9mIHRoaXMgYW5kIGFsbCB0aGUgZ2V0dGVycy9zZXR0ZXJzIGZvciBmaWVsZHMgZXRjIGFyZVxuICogZHluYW1pY2FsbHkgY3JlYXRlZCB2aWEgdGhlIGNvbnN0cnVjdG9yLlxuICovXG5leHBvcnQgY2xhc3MgQmFzZUVudGl0eSB7XG5cdFsgUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEUgXSA9IFNBVkVfU1RBVEUuQ0xFQU47XG5cdFsgUFJJVkFURV9QUk9QRVJUSUVTLlZBTElEQVRFX1RZUEVTIF0gPSB7fTtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3IgZm9yIEJhc2UgRW50aXR5XG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcblx0ICogQHBhcmFtIHtPYmplY3R9IGVudGl0eUZpZWxkc0FuZFZhbHVlc1xuXHQgKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG5cdCAqIEBwYXJhbSB7QXJyYXl9ZmllbGRQcmVmaXhlc1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGlzTmV3XG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRtb2RlbE5hbWUsXG5cdFx0ZW50aXR5RmllbGRzQW5kVmFsdWVzLFxuXHRcdHNjaGVtYSxcblx0XHRmaWVsZFByZWZpeGVzID0gW10sXG5cdFx0aXNOZXcgPSBmYWxzZSxcblx0KSB7XG5cdFx0YXNzZXJ0VmFsaWRTY2hlbWEoIHNjaGVtYSApO1xuXHRcdGZpZWxkUHJlZml4ZXMgPSBpc0FycmF5KCBmaWVsZFByZWZpeGVzICkgPyBmaWVsZFByZWZpeGVzIDogW107XG5cdFx0Y3JlYXRlR2V0dGVyKCB0aGlzLCAnZmllbGRQcmVmaXhlcycsIGZpZWxkUHJlZml4ZXMgKTtcblx0XHRjcmVhdGVHZXR0ZXIoIHRoaXMsICdzY2hlbWEnLCBzY2hlbWEucHJvcGVydGllcyApO1xuXHRcdHNldFNhdmVTdGF0ZShcblx0XHRcdHRoaXMsXG5cdFx0XHRpc05ldyA/IFNBVkVfU1RBVEUuTkVXIDogU0FWRV9TVEFURS5DTEVBTlxuXHRcdCk7XG5cdFx0Y3JlYXRlR2V0dGVyKCB0aGlzLCAnbW9kZWxOYW1lJywgbW9kZWxOYW1lICk7XG5cdFx0Y3JlYXRlR2V0dGVyKCB0aGlzLCAnb3JpZ2luYWxGaWVsZHNBbmRWYWx1ZXMnLCBlbnRpdHlGaWVsZHNBbmRWYWx1ZXMgKTtcblx0XHRjcmVhdGVHZXR0ZXIoXG5cdFx0XHR0aGlzLFxuXHRcdFx0J2ZpZWxkc1RvUGVyc2lzdE9uSW5zZXJ0Jyxcblx0XHRcdG5ldyBTZXQoIE9iamVjdC5rZXlzKCBlbnRpdHlGaWVsZHNBbmRWYWx1ZXMgKSApXG5cdFx0KTtcblx0XHRjcmVhdGVFbnRpdHlHZXR0ZXJzQW5kU2V0dGVycyggdGhpcyApO1xuXHRcdGNyZWF0ZVBlcnNpc3RpbmdHZXR0ZXJzQW5kU2V0dGVycyggdGhpcyApO1xuXHRcdE9iamVjdC5zZWFsKCB0aGlzICk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgY3VycmVudCBzYXZlIHN0YXRlIG9uIHRoZSBlbnRpdHkuXG5cdCAqXG5cdCAqIFNhdmUgc3RhdGUgZGVzY3JpYmVzIHdoZXRoZXIgdGhlIGVudGl0eSBpczpcblx0ICpcblx0ICogLSBTQVZFX1NUQVRFLk5FVzogVGhlIGVudGl0eSBoYXMgbmV2ZXIgYmVlbiBwZXJzaXN0ZWQgdG8gc3RvcmFnZS5cblx0ICogLSBTQVZFX1NUQVRFLkNMRUFOOiBUaGUgZW50aXR5IGV4aXN0cyBpbiBzdG9yYWdlIGFuZCBoYXMgbm90IGJlZW4gbXV0YXRlZC5cblx0ICogLSBTQVZFX1NUQVRFLkRJUlRZOiBUaGUgZW50aXR5IGlzIG11dGF0ZWQgYW5kIGNoYW5nZXMgaGF2ZSBub3QgYmVlblxuXHQgKiBwZXJzaXN0ZWQgdG8gc3RvcmFnZS5cblx0ICpcblx0ICogQHJldHVybiB7c3ltYm9sfSAgUmV0dXJucyB0aGUgY3VycmVudCBzYXZlIHN0YXRlIGZvciB0aGUgZW50aXR5LlxuXHQgKi9cblx0Z2V0IHNhdmVTdGF0ZSgpIHtcblx0XHRyZXR1cm4gdGhpc1sgUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEUgXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IHNhdmUgc3RhdGUgaXMgU0FWRV9TVEFURS5ORVdcblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgU0FWRV9TVEFURS5ORVcgaXMgdGhlIHNhdmUgc3RhdGUuXG5cdCAqL1xuXHRnZXQgaXNOZXcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2F2ZVN0YXRlID09PSBTQVZFX1NUQVRFLk5FVztcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBjdXJyZW50IHNhdmUgc3RhdGUgaXMgU0FWRV9TVEFURS5ESVJUWVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyBTQVZFX1NUQVRFLkRJUlRZIGlzIHRoZSBzYXZlIHN0YXRlLlxuXHQgKi9cblx0Z2V0IGlzRGlydHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2F2ZVN0YXRlID09PSBTQVZFX1NUQVRFLkRJUlRZO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBpcyBTQVZFX1NUQVRFLkNMRUFOXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIFNBVkVfU1RBVEUuQ0xFQU4gaXMgdGhlIHNhdmUgc3RhdGUuXG5cdCAqL1xuXHRnZXQgaXNDbGVhbigpIHtcblx0XHRyZXR1cm4gdGhpcy5zYXZlU3RhdGUgPT09IFNBVkVfU1RBVEUuQ0xFQU47XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgZW50aXR5IGhhcyBhbnkgcGFzc3dvcmQgcHJvdGVjdGVkIGZpZWxkcy5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyBpdCBkb2VzLCBmYWxzZSBtZWFucyBpdCBkb2Vzbid0LlxuXHQgKi9cblx0Z2V0IGlzUGFzc3dvcmRQcm90ZWN0ZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvdGVjdGVkRmllbGRzLmxlbmd0aCA+IDA7XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgZ2l2ZW4gZmllbGROYW1lIGlzIGEgcGFzc3dvcmQgcHJvdGVjdGVkIGZpZWxkLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtmdW5jdGlvbihzdHJpbmcpOiBib29sZWFufSAgUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWRcblx0ICogdG8gY2hlY2sgaWYgdGhlIGdpdmVuIGZpZWxkIG5hbWUgaXMgYSBwcm90ZWN0ZWQgZmllbGQgaW4gdGhpcyBlbnRpdHkuXG5cdCAqL1xuXHRnZXQgaXNGaWVsZFBhc3N3b3JkUHJvdGVjdGVkKCkge1xuXHRcdHJldHVybiAoIGZpZWxkTmFtZSApID0+IHRoaXMucHJvdGVjdGVkRmllbGRzLmluZGV4T2YoIGZpZWxkTmFtZSApID4gLTE7XG5cdH1cblxuXHQvKipcblx0ICogVXNlZCB0byBjbG9uZSB0aGUgY3VycmVudCBlbnRpdHkgb2JqZWN0LiAgVGhpcyByZXN1bHRzIGluIGFuIGluc3RhbmNlIG9mXG5cdCAqIEJhc2VFbnRpdHkgdGhhdCBpcyBlcXVpdmFsZW50IGFzIHRoaXMgY3VycmVudCBpbnN0YW5jZSAoZXhjZXB0IGl0IHdpbGxcblx0ICogaGF2ZSBhIG5ldyBnZW5lcmF0ZWQgaWQpLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtGdW5jdGlvbn0gY2FsbGJhY2sgdGhhdCByZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIEJhc2VFbnRpdHlcblx0ICovXG5cdGdldCBjbG9uZSgpIHtcblx0XHQvKipcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGtlZXBJZFxuXHRcdCAqIEByZXR1cm4ge0Jhc2VFbnRpdHl9IEEgbmV3IGluc3RhbmNlIG9mIEJhc2VFbnRpdHlcblx0XHQgKi9cblx0XHRyZXR1cm4gKCBrZWVwSWQgPSBmYWxzZSApID0+IHtcblx0XHRcdGNvbnN0IGNyZWF0ZUZhY3RvcnkgPSBtZW1vaXplKCAoKSA9PiBjcmVhdGVFbnRpdHlGYWN0b3J5KFxuXHRcdFx0XHR0aGlzLm1vZGVsTmFtZSxcblx0XHRcdFx0eyAkc2NoZW1hOiB7fSwgcHJvcGVydGllczogdGhpcy5zY2hlbWEgfSxcblx0XHRcdFx0dGhpcy5maWVsZFByZWZpeGVzXG5cdFx0XHQpICk7XG5cdFx0XHRjb25zdCBmYWN0b3J5ID0gY3JlYXRlRmFjdG9yeSgpO1xuXHRcdFx0Y29uc3QgbmV3RW50aXR5ID0gZmFjdG9yeS5jcmVhdGVOZXcoIHRoaXMuZm9yQ2xvbmUgKTtcblx0XHRcdGlmICgga2VlcElkICkge1xuXHRcdFx0XHRuZXdFbnRpdHkuaWQgPSB0aGlzLmlkO1xuXHRcdFx0XHRzZXRTYXZlU3RhdGUoIG5ld0VudGl0eSwgdGhpcy5zYXZlU3RhdGUsIHRydWUgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdFbnRpdHk7XG5cdFx0fTtcblx0fVxuXG5cdHN0YXRpYyBuYW1lID0gJ0Jhc2VFbnRpdHknXG59XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IGdpdmVzIGEgY2xhc3MgdGhlIHByb3ZpZGVkIG5hbWVcbiAqIChhbmQgb3B0aW9uYWxseSBleHRlbmRzIHRoZSBwcm92aWRlZCBvYmplY3QpLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5kZWRDbGFzc1xuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb25cbiAqL1xuY29uc3QgbmFtZUNsYXNzID0gKCBuYW1lLCBleHRlbmRlZENsYXNzICkgPT4ge1xuXHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBleHRlbmRlZENsYXNzIHtcblx0XHRzdGF0aWMgZ2V0IG5hbWUoKSB7XG5cdFx0XHRyZXR1cm4gbmFtZTtcblx0XHR9XG5cdH07XG59O1xuXG4vKipcbiAqIEEgZmFjdG9yeSBmb3IgZW50aXR5IGZhY3Rvcmllcy5cbiAqXG4gKiBDYWxsaW5nIHRoaXMgcmV0dXJucyBhbiBvYmplY3Qgb2YgZmFjdG9yeSBmdW5jdGlvbnMgdGhhdCBpbnN0YW50aWF0ZSBhblxuICogaW5zdGFuY2Ugb2YgYSBuYW1lZCBFbnRpdHkuICBUaGUgbW9kZWxOYW1lIGlzIHVzZWQgYXMgdGhlIG5hbWUgZm9yIHRoZSBuZXdcbiAqIGVudGl0eS5cbiAqXG4gKiBUd28gbWV0aG9kcyBhcmUgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QgcmV0dXJuZWQ6IGBjcmVhdGVOZXdgIGFuZFxuICogYGZyb21FeGlzdGluZ2AuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgVGhlIG1vZGVsIGZvciB0aGUgZW50aXR5XG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hICAgICBUaGUgc2NoZW1hIGZvciB0aGUgbW9kZWwuIFRoaXMgaXMgdGhlIHNjaGVtYVxuICogcHJvdmlkZWQgYnkgdGhlIE9QVElPTlMgZW5kcG9pbnQgZm9yIHRoZSBtb2RlbC5cbiAqIEBwYXJhbSB7QXJyYXl9IGZpZWxkUHJlZml4ZXMgQW4gYXJyYXkgb2YgZmllbGQgcHJlZml4ZXMgZm9yIGJhc2UgZmllbGRzIG9uXG4gKiBvbiB0aGUgbW9kZWwgKGVnLiBFdmVudCBtb2RlbCBoYXMgYFsgRVZUIF1gIHByZWZpeGVzIG9uIGZpZWxkcywgRGF0ZXRpbWUgbW9kZWxcbiAqIGhhcyBbIGBEVFRgLCBgRFRUX0VWVGAgXVxuICogQHJldHVybiB7T2JqZWN0fSBBIGZhY3RvcnkgZm9yIGluc3RhbnRpYXRpbmcgYW4gZW50aXR5IGluc3RhbmNlLlxuICovXG5jb25zdCBjcmVhdGVFbnRpdHlGYWN0b3J5ID0gKCBtb2RlbE5hbWUsIHNjaGVtYSwgZmllbGRQcmVmaXhlcyA9IFtdICkgPT4ge1xuXHRjb25zdCBFbnRpdHkgPSBuYW1lQ2xhc3MoXG5cdFx0dXBwZXJGaXJzdCggY2FtZWxDYXNlKCBtb2RlbE5hbWUgKSApLFxuXHRcdEJhc2VFbnRpdHlcblx0KTtcblx0cmV0dXJuIHtcblx0XHQvKipcblx0XHQgKiBFeHBvc2VzIG1vZGVsTmFtZSBzbyBjbGllbnQgY29kZSBjYW4gZGVyaXZlIHdoYXQgbW9kZWwgdGhpcyBmYWN0b3J5XG5cdFx0ICogaXMgZm9yIGZyb20gYW55IGdpdmVuIGZhY3RvcnkuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdG1vZGVsTmFtZSxcblx0XHQvKipcblx0XHQgKiBUaGlzIGlzIHRoZSBjbGFzcyBkZWZpbml0aW9uIGZvciB0aGUgRW50aXR5LiAgVHlwaWNhbGx5IHRoaXMgaXNcblx0XHQgKiByZXRyaWV2ZWQgZm9yIHRoZSBhYmlsaXR5IHRvIGRvIGluc3RhbmNlb2YgY2hlY2tzLlxuXHRcdCAqL1xuXHRcdGNsYXNzRGVmOiBFbnRpdHksXG5cdFx0LyoqXG5cdFx0ICogVGhpcyByZXR1cm5zIGFuIGluc3RhbmNlIG9mIEVudGl0eSBmb3IgdGhlIGdpdmVuIGFyZ3VtZW50cyB3aXRoIHRoZVxuXHRcdCAqIGluZGljYXRpb24gdGhpcyBpcyBhIG5ldyBub24tcGVyc2lzdGVkIGVudGl0eS4gIFRoaXMgbWVhbnM6XG5cdFx0ICpcblx0XHQgKiAtIEFsbCBmaWVsZCB2YWx1ZXMgYXJlIHBvcHVsYXRlZCBhbmQgYW55IG5vdCBwcm92aWRlZCB3aWxsIGJlXG5cdFx0ICogICBwb3B1bGF0ZWQgd2l0aCBkZWZhdWx0IHZhbHVlcyBkZWZpbmVkIGJ5IHRoZSBzY2hlbWEuXG5cdFx0ICogLSBHZW5lcmF0ZXMgdGVtcG9yYXJ5IHVuaXF1ZSBpZHMgZm9yIHRoZSBwcmltYXJ5IGtleSBmaWVsZHMgb24gdGhlXG5cdFx0ICogICBlbnRpdHkgKHVzaW5nIGN1aWQpLlxuXHRcdCAqIC0gU2V0cyB0aGUgYGlzTmV3YCBmbGFnIHRvIHRydWUgZm9yIHRoZSBlbnRpdHkgc28gY2xpZW50IGNvZGUgaXMgYWJsZVxuXHRcdCAqICAgdG8gZGlzY292ZXIgd2hpY2ggZW50aXRpZXMgaGF2ZSBuZXZlciBiZWVuIHBlcnNpc3RlZC5cblx0XHQgKiAtIFRoaXMgZmFjdG9yeSBtZXRob2QgZXhwZWN0cyBmaWVsZHMgYW5kIHZhbHVlcyB0byBiZSBcInByZXBhcmVkXCIuXG5cdFx0ICogICBXaGF0IHRoYXQgbWVhbnMgaXMgdGhhdCBmb3IgYW55IGZpZWxkcyB0aGF0IHRoZSBzY2hlbWEgZGVzY3JpYmVkIGFzXG5cdFx0ICogICBoYXZpbmcgYSBgcmF3YCBwcm9wZXJ0eSAoaS5lLiB7IEVWVF9kZXNjOiB7IHJhdzogJ3NvbWV0aGluZycgfSB9KVxuXHRcdCAqICAgdGhlIHZhbHVlIHNob3VsZCBiZSBvZiB0aGUgY29ycmVjdCB0eXBlIGZvciB0aGF0IHJhdyBwcm9wZXJ0eSBhbmQuXG5cdFx0ICogICBUaGlzIGFsc28gbWVhbnMgaXMgdGhhdCBmb3IgYW55IGZpZWxkcyB0aGUgc2NoZW1hIGRlc2NyaWJlcyBhcyBhXG5cdFx0ICogICBkYXRlLXRpbWUgKGZvcm1hdCkgb3IgbW9uZXkgKGZvcm1hdCkgZmllbGQsIHRoZSB2YWx1ZSBpcyBleHBlY3RlZFxuXHRcdCAqICAgdG8gYmUgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgb2JqZWN0LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGZpZWxkc0FuZFZhbHVlc1xuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gYW4gaW5zdGFuY2Ugb2YgRW50aXR5XG5cdFx0ICovXG5cdFx0Y3JlYXRlTmV3OiAoIGZpZWxkc0FuZFZhbHVlcyApID0+IG5ldyBFbnRpdHkoXG5cdFx0XHRtb2RlbE5hbWUsXG5cdFx0XHRmaWVsZHNBbmRWYWx1ZXMsXG5cdFx0XHRzY2hlbWEsXG5cdFx0XHRmaWVsZFByZWZpeGVzLFxuXHRcdFx0dHJ1ZVxuXHRcdCksXG5cdFx0LyoqXG5cdFx0ICogVGhpcyByZXR1cm5zIGFuIGluc3RhbmNlIG9mIEVudGl0eSBmb3IgdGhlIGdpdmVuIGFyZ3VtZW50cyB3aXRoIHRoZVxuXHRcdCAqIGluZGljYXRpb24gdGhpcyByZXByZXNlbnRzIHRoZSBlbnRpdHkgYXMgaXMgaW4gdGhlIGRiLiAgVGhpcyBtZWFuczpcblx0XHQgKlxuXHRcdCAqIC0gQWxsIGZpZWxkIHZhbHVlcyBhcmUgTk9UIHBvcHVsYXRlZCBpZiBtaXNzaW5nIHZhbHVlcy4gIFRoaXMgaXNcblx0XHQgKiAgIGVzcGVjaWFsbHkgaW1wb3J0YW50IGZvciBjb250ZXh0cyBsaWtlIHVuYXV0aG9yaXplZCB2aWV3cyB3aGVyZVxuXHRcdCAqICAgb25seSBwYXJ0aWFsIGVudGl0aWVzIGFyZSByZXR1cm5lZCBpbiBSRVNUIHJlc3BvbnNlcy5cblx0XHQgKiAtIGlzTmV3IGZsYWcgaXMgc2V0IHRvIGZhbHNlIChhbmQgbmV2ZXIgY2hhbmdlcyBmb3IgdGhpcyBlbnRpdHkpXG5cdFx0ICogLSBUaGUgaW5jb21pbmcgdmFsdWVzIGFyZSBleHBlY3RlZCB0byBiZSBpbiB0aGUgZXhhY3Qgc2hhcGUgYXNcblx0XHQgKiAgIGRlc2NyaWJlZCBieSB0aGUgc2NoZW1hIGZvciB0aGUgZW50aXR5IG1vZGVsLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGZpZWxkc0FuZFZhbHVlc1xuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gYW4gaW5zdGFuY2Ugb2YgRW50aXR5XG5cdFx0ICovXG5cdFx0ZnJvbUV4aXN0aW5nOiAoIGZpZWxkc0FuZFZhbHVlcyApID0+IG5ldyBFbnRpdHkoXG5cdFx0XHRtb2RlbE5hbWUsXG5cdFx0XHRmaWVsZHNBbmRWYWx1ZXMsXG5cdFx0XHRzY2hlbWEsXG5cdFx0XHRmaWVsZFByZWZpeGVzXG5cdFx0KSxcblx0fTtcbn07XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFbnRpdHlGYWN0b3J5O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzUGxhaW5PYmplY3QsIGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaGFzIGEgXCJyYXdcIiBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdCBhbmQgaGFzIGEgYHJhd2AgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNSYXdQcm9wZXJ0eSA9ICggdmFsdWUgKSA9PiBpc1BsYWluT2JqZWN0KCB2YWx1ZSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHZhbHVlLnJhdyApO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBoYXMgYSBcInByZXR0eVwiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4geyp9IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYSBgcHJldHR5YCBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc1ByZXR0eVByb3BlcnR5ID0gKCB2YWx1ZSApID0+IGlzUGxhaW5PYmplY3QoIHZhbHVlICkgJiZcblx0ISBpc1VuZGVmaW5lZCggdmFsdWUucHJldHR5ICk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBhIFwicmVuZGVyZWRcIiBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdCBhbmQgaGFzIGEgYHJlbmRlcmVkYCBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc1JlbmRlcmVkUHJvcGVydHkgPSAoIHZhbHVlICkgPT4gaXNQbGFpbk9iamVjdCggdmFsdWUgKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCB2YWx1ZS5yZW5kZXJlZCApO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBoYXMgYSBcImZvcm1hdFwiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYSBgZm9ybWF0YCBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0Zvcm1hdFByb3BlcnR5ID0gKCB2YWx1ZSApID0+IGlzUGxhaW5PYmplY3QoIHZhbHVlICkgJiZcblx0ISBpc1VuZGVmaW5lZCggdmFsdWUuZm9ybWF0ICk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBhIFwiZW51bVwiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYW4gZW51bVxuICogcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNFbnVtUHJvcGVydHkgPSAoIHZhbHVlICkgPT4gaXNQbGFpbk9iamVjdCggdmFsdWUgKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCB2YWx1ZS5lbnVtICk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgXCJ2YWx1ZSBvYmplY3RcIiBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgdmFsdWUgb2JqZWN0IGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNWYWx1ZU9iamVjdEZpZWxkID0gKCBmaWVsZCwgc2NoZW1hICkgPT4ge1xuXHRyZXR1cm4gaXNEYXRlVGltZUZpZWxkKCBmaWVsZCwgc2NoZW1hICkgfHwgaXNNb25leUZpZWxkKCBmaWVsZCwgc2NoZW1hICk7XG59O1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCBpcyBhIGRhdGUtdGltZSBmaWVsZCBhY2NvcmRpbmcgdG8gdGhlXG4gKiBwcm92aWRlZCBzY2hlbWEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIGl0IGlzIGEgZGF0ZS10aW1lIGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNEYXRlVGltZUZpZWxkID0gKCBmaWVsZCwgc2NoZW1hICkgPT5cblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZCBdICkgJiZcblx0aGFzRm9ybWF0UHJvcGVydHkoIHNjaGVtYVsgZmllbGQgXSApICYmXG5cdHNjaGVtYVsgZmllbGQgXS5mb3JtYXQgPT09ICdkYXRlLXRpbWUnO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCBpcyBhIFVUQyBkYXRlLXRpbWUgZmllbGQuXG4gKlxuICogSWYgc2NoZW1hIGlzIHByb3ZpZGVkLCB0aGlzIGFsc28gY29uc2lkZXJzIHdoZXRoZXIgdGhpcyBpcyBhIGRhdGUtdGltZSBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRpbWVGaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWEgW29wdGlvbmFsXVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGlzIGlzIGEgVVRDIGZpZWxkLiAgSWYgc2NoZW1hIGlzIHByb3ZpZGVkIGl0XG4gKiBtZWFucyB0aGlzIGlzIGFsc28gYSBkYXRlLXRpbWUgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1VUQ0RhdGVUaW1lRmllbGQgPSAoIGRhdGVUaW1lRmllbGROYW1lLCBzY2hlbWEgPSBudWxsICkgPT4ge1xuXHRyZXR1cm4gc2NoZW1hICE9PSBudWxsID9cblx0XHRpc0RhdGVUaW1lRmllbGQoIGRhdGVUaW1lRmllbGROYW1lLCBzY2hlbWEgKSAmJlxuXHRcdFx0ZGF0ZVRpbWVGaWVsZE5hbWUuaW5kZXhPZiggJ19nbXQnICkgPiAwIDpcblx0XHRkYXRlVGltZUZpZWxkTmFtZS5pbmRleE9mKCAnX2dtdCcgKSA+IDA7XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgcmVwcmVzZW50cyBhIHByaW1hcnkga2V5IGZpZWxkIHVzaW5nIHRoZVxuICogcHJvdmlkZWQgc2NoZW1hLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIGEgcHJpbWFyeSBrZXkgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1ByaW1hcnlLZXlGaWVsZCA9ICggZmllbGROYW1lLCBzY2hlbWEgKSA9PlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgJiZcblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcmltYXJ5X2tleSApO1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgcmVwcmVzZW50cyBhIHJlYWRvbmx5IGZpZWxkIHVzaW5nIHRoZVxuICogcHJvdmlkZWQgc2NoZW1hLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIGEgcmVhZG9ubHkgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1JlYWRPbmx5ID0gKCBmaWVsZE5hbWUsIHNjaGVtYSApID0+XG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0gKSAmJlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnJlYWRvbmx5ICkgJiZcblx0c2NoZW1hWyBmaWVsZE5hbWUgXS5yZWFkb25seTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgaXMgYSBcImVudGl0eVwiIGZpZWxkIHVzaW5nIHRoZSBwcm92aWRlZFxuICogc2NoZW1hLlxuICpcbiAqIEFuIFwiZW50aXR5XCIgZmllbGQgaXMgYW55IGZpZWxkIHRoYXQgc2F0aXNmaWVzIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiAtIGZpZWxkIGV4aXN0cyBpbiB0aGUgc2NoZW1hXG4gKiAtIGl0IGlzIG5vdCByZWFkb25seSBvciBpcyBhIHByaW1hcnkga2V5IGZpZWxkLlxuICogLSBpdCBpcyBub3QgYSB1dGMgZmllbGQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGlzIGlzIGFuIGVudGl0eSBmaWVsZFxuICovXG5leHBvcnQgY29uc3QgaXNFbnRpdHlGaWVsZCA9ICggZmllbGROYW1lLCBzY2hlbWEgKSA9PlxuXHQhIGlzVW5kZWZpbmVkKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkgJiZcblx0KCAhIGlzUmVhZE9ubHkoIGZpZWxkTmFtZSwgc2NoZW1hICkgfHxcblx0XHRpc1ByaW1hcnlLZXlGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKVxuXHQpICYmXG5cdCEgaXNVVENEYXRlVGltZUZpZWxkKCBmaWVsZE5hbWUgKSAmJlxuXHRmaWVsZE5hbWUgIT09ICdfcHJvdGVjdGVkJztcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZmllbGQgcmVwcmVzZW50cyBhIHZhbHVlIG9mIG1vbmV5IGZyb20gdGhlIHByb3ZpZGVkXG4gKiBzY2hlbWEuXG4gKlxuICogQSBmaWVsZCBpcyBhIG1vbmV5IGZpZWxkIGlmIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgc2F0aXNmaWVkOlxuICpcbiAqIC0gSXQgZXhpc3RzIGluIHRoZSBzY2hlbWFcbiAqIC0gSXQgaGFzIGEgcHJldHR5IHByb3BlcnR5XG4gKiAtIFRoZSBwcmV0dHkgcHJvcGVydHkgdmFsdWUgaGFzIGEgZm9ybWF0IHByb3BlcnR5LlxuICogLSBUaGUgZm9ybWF0IHByb3BlcnR5IGlzIGVxdWFsIHRvICdtb25leSdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGl0IGlzIGEgbW9uZXkgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc01vbmV5RmllbGQgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT5cblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcyApICYmXG5cdGhhc1ByZXR0eVByb3BlcnR5KCBzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMgKSAmJlxuXHRoYXNGb3JtYXRQcm9wZXJ0eSggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnByZXR0eSApICYmXG5cdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcy5wcmV0dHkuZm9ybWF0ID09PSAnbW9uZXknO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBmaWVsZCBpcyBhbiBlbnVtIHR5cGUgZmllbGQgYXMgZGVmaW5lZCBpbiB0aGUgcHJvdmlkZWRcbiAqIHNjaGVtYS5cbiAqXG4gKiBOb3RlOiB0aGlzIG9ubHkgZXZhbHVhdGVzIHRoZSB0b3AtbGV2ZWwgZm9yIHRoZSBmaWVsZCBzY2hlbWEuICBJZiB0aGUgZmllbGRcbiAqIGluIHRoZSBzY2hlbWEgaXMgb2YgdHlwZSAnb2JqZWN0JyBhbmQgb25lIG9mIHRoZSBvYmplY3QgcHJvcGVydGllcyBpcyBvZiB0eXBlXG4gKiAnZW51bScgdGhpcyB3aWxsIG5vdCBjb25zaWRlciBpdCBhbiBcImVudW1cIiBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBpZiB0aGUgZmllbGQgaXMgYW4gZW51bSB0eXBlIGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNFbnVtRmllbGQgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT5cblx0ISBpc1VuZGVmaW5lZCggc2NoZW1hWyBmaWVsZE5hbWUgXSApICYmXG5cdGhhc0VudW1Qcm9wZXJ0eSggc2NoZW1hWyBmaWVsZE5hbWUgXSApICYmXG5cdCEgaXNVbmRlZmluZWQoIHNjaGVtYVsgZmllbGROYW1lIF0uZW51bS5sZW5ndGggKSAmJlxuXHRzY2hlbWFbIGZpZWxkTmFtZSBdLmVudW0ubGVuZ3RoID4gMDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBhcHBseUZpbHRlcnMgfSBmcm9tICdAd29yZHByZXNzL2hvb2tzJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBDb25zdGFudHMgZGVzY3JpYmluZyB0aGUgY3VycmVudCBcInNhdmUgc3RhdGVcIiBmb3IgYW4gZW50aXR5LlxuICpcbiAqIEB0eXBlIHt7Q0xFQU46IFN5bWJvbCwgTkVXOiBTeW1ib2wsIERJUlRZOiBTeW1ib2x9fVxuICovXG5leHBvcnQgY29uc3QgU0FWRV9TVEFURSA9IHtcblx0Q0xFQU46IFN5bWJvbCggJ0VudGl0eSBpcyBwZXJzaXN0ZWQuJyApLFxuXHRORVc6IFN5bWJvbCggJ0VudGl0eSBpcyBuZXcuJyApLFxuXHRESVJUWTogU3ltYm9sKCAnRXhpc3RpbmcgZW50aXR5IGhhcyBjaGFuZ2VzIGFuZCBuZWVkcyBwZXJzaXN0ZWQuJyApLFxufTtcblxuLyoqXG4gKiBWYWxpZGF0aW9uIHR5cGVzIGFyZSBmb3Igc2NoZW1hJ3MgdGhhdCBoYXZlIHZhbHVlIHZhcmlhdGlvbnMuXG4gKiBAdHlwZSB7e1JBVzogc3RyaW5nLCBSRU5ERVJFRDogc3RyaW5nLCBQUkVUVFk6IHN0cmluZ319XG4gKi9cbmV4cG9ydCBjb25zdCBWQUxJREFURV9UWVBFID0ge1xuXHRSQVc6ICdyYXcnLFxuXHRSRU5ERVJFRDogJ3JlbmRlcmVkJyxcblx0UFJFVFRZOiAncHJldHR5Jyxcbn07XG5cbi8qKlxuICogUHJpdmF0ZSBwcm9wZXJ0aWVzIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgQmFzZSBFbnRpdHkgQ2xhc3NcbiAqIEB0eXBlIHt7c2F2ZVN0YXRlOiBib29sZWFufX1cbiAqL1xuZXhwb3J0IGNvbnN0IFBSSVZBVEVfUFJPUEVSVElFUyA9IHtcblx0U0FWRV9TVEFURTogU3ltYm9sKCAnYmFzZUVudGl0eVByaXZhdGVQcm9wZXJ0aWVzU2F2ZVN0YXRlJyApLFxuXHRWQUxJREFURV9UWVBFUzogU3ltYm9sKCAnYmFzZUVudGl0eVByaXZhdGVQcm9wZXJ0aWVzVmFsaWRhdGVUeXBlcycgKSxcbn07XG5cbi8qKlxuICogSGFyZGNvZGVkIGxpc3Qgb2YgbW9kZWwgcHJlZml4ZXMgZm9yIGZpZWxkcyBvbiBtb2RlbHMuXG5cbiAqIEEgbW9kZWwgcHJlZml4IGlzIHNvbWV0aGluZyB0aGF0IFwibmFtZXNwYWNlc1wiIGEgZmllbGQgb24gYSBtb2RlbC4gIEZvclxuICogZXhhbXBsZSwgaWYgdGhlIGZpZWxkIGlzIFwiRVZUX0lEXCIsIHRoZW4gdGhlIHByZWZpeCBpcyBcIkVWVFwiOyBpZiB0aGUgZmllbGQgaXNcbiAqIFwiRFRUX0VWVF9zdGFydFwiLCB0aGVuIHRoZSBwcmVmaXhlcyBhcmUgXCJEVFRcIiwgYW5kIFwiRFRUX0VWVFwiLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgZmlsdGVyZWQgb2JqZWN0IGluZGV4ZWQgYnkgbW9kZWwgbmFtZSBhbmQgdGhlIHZhbHVlcyBhcmVcbiAqIGFuIGFycmF5IG9mIG1vZGVsIHByZWZpeGVzIGZvciB0aGF0IG1vZGVsLlxuICovXG5leHBvcnQgY29uc3QgTU9ERUxfUFJFRklYRVMgPSAoIG1vZGVsTmFtZSApID0+IHtcblx0Y29uc3QgcHJlZml4TWFwID0gYXBwbHlGaWx0ZXJzKFxuXHRcdCdGSEVFX19FTlRJVFlfRkFDVE9SWV9fQ09OU1RBTlRTX19NT0RFTF9QUkVGSVhFUycsXG5cdFx0e1xuXHRcdFx0YW5zd2VyOiBbICdBTlMnIF0sXG5cdFx0XHRhdHRlbmRlZTogWyAnQVRUJyBdLFxuXHRcdFx0Y2hhbmdlX2xvZzogWyAnTE9HJyBdLFxuXHRcdFx0Y2hlY2tpbjogWyAnQ0hLJyBdLFxuXHRcdFx0Y291bnRyeTogWyAnQ05UJyBdLFxuXHRcdFx0Y3VycmVuY3k6IFsgJ0NVUicgXSxcblx0XHRcdGN1cnJlbmN5X3BheW1lbnRfbWV0aG9kOiBbICdDUE0nIF0sXG5cdFx0XHRkYXRldGltZTogWyAnRFRUX0VWVCcsICdEVFQnIF0sXG5cdFx0XHRkYXRldGltZV90aWNrZXQ6IFsgJ0RUSycgXSxcblx0XHRcdGV2ZW50OiBbICdFVlQnIF0sXG5cdFx0XHRldmVudF9tZXNzYWdlX3RlbXBsYXRlOiBbICdFTVQnIF0sXG5cdFx0XHRldmVudF9xdWVzdGlvbl9ncm91cDogWyAnRVFHJyBdLFxuXHRcdFx0ZXZlbnRfdmVudWU6IFsgJ0VWVicgXSxcblx0XHRcdGV4dHJhX2pvaW46IFsgJ0VYSicgXSxcblx0XHRcdGV4dHJhX21ldGE6IFsgJ0VYTScgXSxcblx0XHRcdGxpbmVfaXRlbTogWyAnTElOJyBdLFxuXHRcdFx0bWVzc2FnZTogWyAnTVNHJyBdLFxuXHRcdFx0bWVzc2FnZV90ZW1wbGF0ZTogWyAnTVRQJyBdLFxuXHRcdFx0bWVzc2FnZV90ZW1wbGF0ZV9ncm91cDogWyAnR1JQJywgJ01UUCcgXSxcblx0XHRcdHBheW1lbnQ6IFsgJ1BBWScgXSxcblx0XHRcdHBheW1lbnRfbWV0aG9kOiBbICdQTUQnIF0sXG5cdFx0XHRwb3N0X21ldGE6IFsgJ21ldGEnIF0sXG5cdFx0XHRwcmljZTogWyAnUFJDJyBdLFxuXHRcdFx0cHJpY2VfdHlwZTogWyAnUFJUJyBdLFxuXHRcdFx0cXVlc3Rpb246IFsgJ1FTVCcgXSxcblx0XHRcdHF1ZXN0aW9uX2dyb3VwOiBbICdRU0cnIF0sXG5cdFx0XHRxdWVzdGlvbl9ncm91cF9xdWVzdGlvbjogWyAnUUdRJyBdLFxuXHRcdFx0cXVlc3Rpb25fb3B0aW9uOiBbICdRU08nIF0sXG5cdFx0XHRyZWN1cnJlbmNlOiBbICdSQ1InIF0sXG5cdFx0XHRyZWdpc3RyYXRpb246IFsgJ1JFRycgXSxcblx0XHRcdHJlZ2lzdHJhdGlvbl9wYXltZW50OiBbICdSUFknIF0sXG5cdFx0XHRzdGF0ZTogWyAnU1RBJyBdLFxuXHRcdFx0c3RhdHVzOiBbICdTVFMnIF0sXG5cdFx0XHR0ZXJtOiBbICd0ZXJtJyBdLFxuXHRcdFx0dGVybV9yZWxhdGlvbnNoaXA6IFtdLFxuXHRcdFx0dGVybV90YXhvbm9teTogWyAndGVybV90YXhvbm9teScgXSxcblx0XHRcdHRpY2tldDogWyAnVEtUJyBdLFxuXHRcdFx0dGlja2V0X3ByaWNlOiBbICdUS1AnIF0sXG5cdFx0XHR0aWNrZXRfdGVtcGxhdGU6IFsgJ1RUTScgXSxcblx0XHRcdHRyYW5zYWN0aW9uOiBbICdUWE4nIF0sXG5cdFx0XHR2ZW51ZTogWyAnVk5VJyBdLFxuXHRcdFx0d3BfdXNlcjogWyAndXNlcicgXSxcblx0XHR9ICk7XG5cdHJldHVybiAhIGlzVW5kZWZpbmVkKCBwcmVmaXhNYXBbIG1vZGVsTmFtZSBdICkgP1xuXHRcdHByZWZpeE1hcFsgbW9kZWxOYW1lIF0gOlxuXHRcdFtdO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRjYW1lbENhc2UsXG5cdGZvckVhY2gsXG5cdGlzVW5kZWZpbmVkLFxuXHRpc0FycmF5LFxuXHRrZXlzLFxuXHRzb3J0QnksXG59IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgY3VpZCBmcm9tICdjdWlkJztcbmltcG9ydCB7IEludmFsaWRBcmd1bWVudCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0YXNzZXJ0VmFsaWRGaWVsZEFuZFZhbHVlQWdhaW5zdFNjaGVtYSxcblx0YXNzZXJ0VmFsaWRWYWx1ZUZvclByZXBhcmVkRmllbGQsXG59IGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5pbXBvcnQge1xuXHRkZXJpdmVQcmVwYXJlZFZhbHVlRm9yRmllbGQsXG5cdGdldFJlbGF0aW9uTmFtZUZyb21MaW5rLFxuXHRnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyxcblx0Z2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvclBlcnNpc3RpbmcsXG5cdGdldFByaW1hcnlLZXlGaWVsZHNGcm9tU2NoZW1hLFxuXHRnZXRFbnRpdHlGaWVsZHNGcm9tU2NoZW1hLFxuXHRnZXREZWZhdWx0VmFsdWVGb3JGaWVsZCxcblx0ZGVyaXZlVmFsaWRhdGVUeXBlRm9yRmllbGQsXG59IGZyb20gJy4vZXh0cmFjdG9ycyc7XG5pbXBvcnQge1xuXHRpc0VudGl0eUZpZWxkLFxuXHRpc1ByaW1hcnlLZXlGaWVsZCxcbn0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQgeyBQUklWQVRFX1BST1BFUlRJRVMsIFNBVkVfU1RBVEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKihcbiAqIEEgZ2VuZXJpYyBnZXR0ZXIgY3JlYXRvciBmb3IgYSBwcm92aWRlZCBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWUgIFRoZSBuYW1lIG9mIHRoZSBhY2Nlc3Nvci5cbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgdXNlZCB0byBwYXNzIHRocm91Z2ggYWRkaXRpb25hbCBvcHRpb25zIGZvciB0aGVcbiAqIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBjYWxsLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlR2V0dGVyID0gKCBpbnN0YW5jZSwgZmllbGROYW1lLCBmaWVsZFZhbHVlLCBvcHRzID0ge30gKSA9PiB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggaW5zdGFuY2UsIGZpZWxkTmFtZSwge1xuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiBmaWVsZFZhbHVlO1xuXHRcdH0sXG5cdFx0Li4ub3B0cyxcblx0fSApO1xufTtcblxuLyoqXG4gKiBUaGlzIGNyZWF0ZXMgYSBnZXR0ZXIgdGhhdCBjYWxscyB0aGUgcHJvdmlkZWQgY2FsbGJhY2sgd2hlbiBpbnZva2VkLlxuICpcbiAqIFRoZSBjYWxsYmFjayByZWNlaXZlcyB0aGUgYGluc3RhbmNlYCBhcmd1bWVudCBwYXNzZWQgdGhyb3VnaFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpfSBjYWxsQmFja1xuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhbGxiYWNrR2V0dGVyID0gKFxuXHRpbnN0YW5jZSxcblx0cHJvcGVydHlOYW1lLFxuXHRjYWxsQmFjayxcblx0b3B0cyA9IHt9XG4pID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBpbnN0YW5jZSwgcHJvcGVydHlOYW1lLCB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIGNhbGxCYWNrKCBpbnN0YW5jZSApO1xuXHRcdH0sXG5cdFx0Li4ub3B0cyxcblx0fSApO1xufTtcblxuLyoqXG4gKiBBIGdlbmVyaWMgZ2V0dGVyIGFuZCBzZXR0ZXIgY3JlYXRvciBmb3IgYSBwcm92aWRlZCBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSAgaW5pdGlhbEZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIE9wdGlvbmFsLCBwYXNzIHRocm91Z2ggb3B0aW9ucyB1c2VkIGJ5XG4gKiBPYmplY3QuZGVmaW5lUHJvcGVydHlcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUdldHRlckFuZFNldHRlciA9IChcblx0aW5zdGFuY2UsXG5cdGZpZWxkTmFtZSxcblx0aW5pdGlhbEZpZWxkVmFsdWUsXG5cdG9wdHMgPSB7fSxcbikgPT4ge1xuXHRsZXQgcHJvcGVydHlWYWx1ZSA9IGluaXRpYWxGaWVsZFZhbHVlO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGluc3RhbmNlLCBmaWVsZE5hbWUsIHtcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gcHJvcGVydHlWYWx1ZTtcblx0XHR9LFxuXHRcdHNldCggcmVjZWl2ZWRWYWx1ZSApIHtcblx0XHRcdGNvbnN0IGlzUHJpbWFyeUZpZWxkID0gaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hICk7XG5cdFx0XHRpZiAoICEgaW5zdGFuY2UuaXNOZXcgJiYgaXNQcmltYXJ5RmllbGQgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGFzc2VydFZhbGlkVmFsdWVGb3JQcmVwYXJlZEZpZWxkKFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdHJlY2VpdmVkVmFsdWUsXG5cdFx0XHRcdGluc3RhbmNlXG5cdFx0XHQpO1xuXHRcdFx0aWYgKCAhIGlzUHJpbWFyeUZpZWxkICkge1xuXHRcdFx0XHRzZXRTYXZlU3RhdGUoIGluc3RhbmNlLCBTQVZFX1NUQVRFLkRJUlRZICk7XG5cdFx0XHRcdHNldEZpZWxkVG9QZXJzaXN0KCBpbnN0YW5jZSwgZmllbGROYW1lICk7XG5cdFx0XHR9XG5cdFx0XHRwcm9wZXJ0eVZhbHVlID0gcmVjZWl2ZWRWYWx1ZTtcblx0XHR9LFxuXHRcdC4uLm9wdHMsXG5cdH0gKTtcbn07XG5cbi8qKlxuICogQSBnZXR0ZXIgYW5kIHNldHRlciBjcmVhdG9yIGZvciBhbiBmaWVsZCBhbGlhcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmlnaW5hbEZpZWxkTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGFsaWFzRmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQWxpYXNHZXR0ZXJBbmRTZXR0ZXIgPSAoXG5cdGluc3RhbmNlLFxuXHRvcmlnaW5hbEZpZWxkTmFtZSxcblx0YWxpYXNGaWVsZE5hbWUsXG5cdG9wdHMgPSB7fSxcbikgPT4ge1xuXHRpZiAoIG9yaWdpbmFsRmllbGROYW1lICE9PSBhbGlhc0ZpZWxkTmFtZSApIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIGluc3RhbmNlLCBhbGlhc0ZpZWxkTmFtZSwge1xuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gaW5zdGFuY2VbIG9yaWdpbmFsRmllbGROYW1lIF07XG5cdFx0XHR9LFxuXHRcdFx0c2V0KCByZWNlaXZlZFZhbHVlICkge1xuXHRcdFx0XHRyZXR1cm4gaW5zdGFuY2VbIG9yaWdpbmFsRmllbGROYW1lIF0gPSByZWNlaXZlZFZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdC4uLm9wdHMsXG5cdFx0fSApO1xuXHR9XG59O1xuXG4vKipcbiAqIEEgZ2V0dGVyIGNyZWF0b3IgZm9yIGEgZmllbGQgYWxpYXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JpZ2luYWxGaWVsZE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBhbGlhc0ZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUFsaWFzR2V0dGVyID0gKFxuXHRpbnN0YW5jZSxcblx0b3JpZ2luYWxGaWVsZE5hbWUsXG5cdGFsaWFzRmllbGROYW1lLFxuXHRvcHRzID0ge30sXG4pID0+IHtcblx0aWYgKCBvcmlnaW5hbEZpZWxkTmFtZSAhPT0gYWxpYXNGaWVsZE5hbWUgKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBpbnN0YW5jZSwgYWxpYXNGaWVsZE5hbWUsIHtcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIGluc3RhbmNlWyBvcmlnaW5hbEZpZWxkTmFtZSBdO1xuXHRcdFx0fSxcblx0XHRcdC4uLm9wdHMsXG5cdFx0fSApO1xuXHR9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgaW5pdGlhbCBnZXR0ZXJzIGFuZCBzZXR0ZXJzIGZvciBlbnRpdGllcyBvbiB0aGUgcHJvdmlkZWQgZW50aXR5XG4gKiBpbnN0YW5jZSB1c2luZyB0aGUgZ2l2ZW4gZGF0YS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIGtleXMgb24gaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVFbnRpdHlHZXR0ZXJzQW5kU2V0dGVycyA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdGNvbnN0IHByaW1hcnlLZXlzID0gW107XG5cdGZvckVhY2goXG5cdFx0aW5zdGFuY2Uub3JpZ2luYWxGaWVsZHNBbmRWYWx1ZXMsXG5cdFx0KCBmaWVsZFZhbHVlLCBmaWVsZE5hbWUgKSA9PiB7XG5cdFx0XHRjb25zdCBpc1ByaW1hcnlLZXkgPSBpc1ByaW1hcnlLZXlGaWVsZCggZmllbGROYW1lLCBpbnN0YW5jZS5zY2hlbWEgKTtcblx0XHRcdHNldFZhbGlkYXRlVHlwZUZvckZpZWxkKCBpbnN0YW5jZSwgZmllbGROYW1lLCBmaWVsZFZhbHVlICk7XG5cdFx0XHRpZiAoIGlzRW50aXR5RmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hICkgKSB7XG5cdFx0XHRcdGlmICggaW5zdGFuY2UuaXNOZXcgKSB7XG5cdFx0XHRcdFx0YXNzZXJ0VmFsaWRWYWx1ZUZvclByZXBhcmVkRmllbGQoXG5cdFx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRcdFx0aW5zdGFuY2Vcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFzc2VydFZhbGlkRmllbGRBbmRWYWx1ZUFnYWluc3RTY2hlbWEoXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5tb2RlbE5hbWUsXG5cdFx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRcdFx0aW5zdGFuY2Vcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNldEluaXRpYWxFbnRpdHlGaWVsZHNBbmRWYWx1ZXMoXG5cdFx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdFx0aXNQcmltYXJ5S2V5XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGZpZWxkTmFtZSA9PT0gJ19jYWxjdWxhdGVkX2ZpZWxkcycgKSB7XG5cdFx0XHRcdHNldENhbGN1bGF0ZWRGaWVsZEFuZFZhbHVlcyggaW5zdGFuY2UsIGZpZWxkVmFsdWUgKTtcblx0XHRcdH1cblx0XHRcdGlmICggZmllbGROYW1lID09PSAnX3Byb3RlY3RlZCcgKSB7XG5cdFx0XHRcdHBvcHVsYXRlUHJvdGVjdGVkRmllbGRzUHJvcGVydHkoIGluc3RhbmNlLCBmaWVsZFZhbHVlICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGZpZWxkTmFtZSA9PT0gJ2xpbmsnICkge1xuXHRcdFx0XHRjcmVhdGVHZXR0ZXIoIGluc3RhbmNlLCAnbGluaycsIGZpZWxkVmFsdWUgKTtcblx0XHRcdH1cblx0XHRcdGlmICggZmllbGROYW1lID09PSAnX2xpbmtzJyApIHtcblx0XHRcdFx0c2V0UmVzb3VyY2VzKCBpbnN0YW5jZSwgZmllbGRWYWx1ZSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCAhIGluc3RhbmNlLmlzTmV3ICYmIGlzUHJpbWFyeUtleSApIHtcblx0XHRcdFx0cHJpbWFyeUtleXMucHVzaCggZmllbGROYW1lICk7XG5cdFx0XHR9XG5cdFx0fVxuXHQpO1xuXHRpZiAoICEgaW5zdGFuY2UuaXNOZXcgJiYgcHJpbWFyeUtleXMubGVuZ3RoICkge1xuXHRcdGNyZWF0ZVByaW1hcnlLZXlGaWVsZEdldHRlcnMoIGluc3RhbmNlLCBwcmltYXJ5S2V5cyApO1xuXHR9XG5cblx0cG9wdWxhdGVQcmltYXJ5S2V5cyggaW5zdGFuY2UgKTtcblx0cG9wdWxhdGVNaXNzaW5nRmllbGRzKCBpbnN0YW5jZSApO1xufTtcblxuLyoqXG4gKiBQb3B1bGF0ZXMgdGhlIGBwcm90ZWN0ZWRGaWVsZHNgIHByb3BlcnR5IG9uIHRoZSBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7QXJyYXl9IHByb3RlY3RlZEZpZWxkc1xuICovXG5jb25zdCBwb3B1bGF0ZVByb3RlY3RlZEZpZWxkc1Byb3BlcnR5ID0gKCBpbnN0YW5jZSwgcHJvdGVjdGVkRmllbGRzICkgPT4ge1xuXHQvLyBnZXQgYW55IGNhbGN1bGF0ZWQgcHJvdGVjdGVkIGZpZWxkcy5cblx0Y29uc3QgY2FsY3VsYXRlZEZpZWxkcyA9IGluc3RhbmNlXG5cdFx0Lm9yaWdpbmFsRmllbGRzQW5kVmFsdWVzXG5cdFx0Ll9jYWxjdWxhdGVkX2ZpZWxkcyB8fCB7fTtcblx0aWYgKFxuXHRcdGNhbGN1bGF0ZWRGaWVsZHMuX3Byb3RlY3RlZCAmJlxuXHRcdGlzQXJyYXkoIGNhbGN1bGF0ZWRGaWVsZHMuX3Byb3RlY3RlZCApXG5cdCkge1xuXHRcdHByb3RlY3RlZEZpZWxkcyA9IFtcblx0XHRcdC4uLnByb3RlY3RlZEZpZWxkcyxcblx0XHRcdC4uLmNhbGN1bGF0ZWRGaWVsZHMuX3Byb3RlY3RlZCxcblx0XHRdO1xuXHR9XG5cdGNyZWF0ZUdldHRlciggaW5zdGFuY2UsICdwcm90ZWN0ZWRGaWVsZHMnLCBwcm90ZWN0ZWRGaWVsZHMgKTtcbn07XG5cbi8qKlxuICogVGhpcyBwb3B1bGF0ZXMgcHJpbWFyeSBrZXkgZmllbGRzLlxuICogTm90ZSB0aGF0IGl0IGFsc28gb3ZlcnJpZGVzIGFueSBwcmltYXJ5IGtleSB2YWx1ZXMvcHJvcGVydGllcyB0aGF0IGFyZVxuICogYWxyZWFkeSBzZXQgaW4gdGhlIGVudGl0eSBzbyBpcyBvbmx5IHByb2Nlc3NlZCB3aGVuIHRoZSBpbnN0YW5jZSBpcyBuZXcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKi9cbmNvbnN0IHBvcHVsYXRlUHJpbWFyeUtleXMgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRpZiAoICEgaW5zdGFuY2UuaXNOZXcgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGNvbnN0IHByaW1hcnlLZXlzID0gZ2V0UHJpbWFyeUtleUZpZWxkc0Zyb21TY2hlbWEoIGluc3RhbmNlICk7XG5cdGZvckVhY2goIHByaW1hcnlLZXlzLCAoXG5cdFx0c2NoZW1hUHJvcGVydGllcyxcblx0XHRzY2hlbWFGaWVsZFxuXHQpID0+IHtcblx0XHQvLyBhbHdheXMgZGVsZXRlIGFuZCBvdmVycmlkZSB3aGF0IGlzIGV4aXN0aW5nLlxuXHRcdGlmICggaW5zdGFuY2VbIHNjaGVtYUZpZWxkIF0gKSB7XG5cdFx0XHRkZWxldGUgaW5zdGFuY2VbIHNjaGVtYUZpZWxkIF07XG5cdFx0fVxuXHRcdGNyZWF0ZUdldHRlckFuZFNldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0c2NoZW1hRmllbGQsXG5cdFx0XHRjdWlkKCksXG5cdFx0XHR7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSB9XG5cdFx0KTtcblx0XHRjcmVhdGVBbGlhc0dldHRlckFuZFNldHRlckZvckZpZWxkKCBpbnN0YW5jZSwgc2NoZW1hRmllbGQgKTtcblx0fSApO1xuXHRjcmVhdGVQcmltYXJ5S2V5RmllbGRHZXR0ZXJzKFxuXHRcdGluc3RhbmNlLFxuXHRcdGtleXMoIHByaW1hcnlLZXlzIClcblx0KTtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgdmFsaWRhdGUgdHlwZSBmb3IgYSBmaWVsZCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICovXG5jb25zdCBzZXRWYWxpZGF0ZVR5cGVGb3JGaWVsZCA9ICggaW5zdGFuY2UsIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSApID0+IHtcblx0aW5zdGFuY2VbIFBSSVZBVEVfUFJPUEVSVElFUy5WQUxJREFURV9UWVBFUyBdWyBmaWVsZE5hbWUgXSA9XG5cdFx0ZGVyaXZlVmFsaWRhdGVUeXBlRm9yRmllbGQoIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgaW5zdGFuY2Uuc2NoZW1hICk7XG59O1xuXG4vKipcbiAqICBQb3B1bGF0ZXMgbWlzc2luZyBmaWVsZHMgYW5kIHZhbHVlcyB1c2luZyBkZWZhdWx0cyBwcm92aWRlZCBieSBzY2hlbWEuICBJZlxuICogIHNjaGVtYSBkb2Vzbid0IHByb3ZpZGUgYSBkZWZhdWx0IHRoZW4gdGhpcyB3aWxsIHBvcHVsYXRlIHRoZSBmaWVsZCB3aXRoIGFcbiAqICBkZWZhdWx0IHZhbHVlIHRoYXQgbWF0Y2hlcyB0aGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqL1xuY29uc3QgcG9wdWxhdGVNaXNzaW5nRmllbGRzID0gKCBpbnN0YW5jZSApID0+IHtcblx0aWYgKCB0eXBlb2YgaW5zdGFuY2UucHJvdGVjdGVkRmllbGRzID09PSAndW5kZWZpbmVkJyApIHtcblx0XHRwb3B1bGF0ZVByb3RlY3RlZEZpZWxkc1Byb3BlcnR5KCBpbnN0YW5jZSwgW10gKTtcblx0fVxuXHRpZiAoICEgaW5zdGFuY2UuaXNOZXcgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGZvckVhY2goXG5cdFx0Z2V0RW50aXR5RmllbGRzRnJvbVNjaGVtYSggaW5zdGFuY2UgKSxcblx0XHQoIHNjaGVtYVByb3BlcnRpZXMsIGZpZWxkTmFtZSApID0+IHtcblx0XHRcdGlmIChcblx0XHRcdFx0dHlwZW9mIGluc3RhbmNlWyBmaWVsZE5hbWUgXSA9PT0gJ3VuZGVmaW5lZCcgJiZcblx0XHRcdFx0ISBpc1ByaW1hcnlLZXlGaWVsZCggZmllbGROYW1lLCBpbnN0YW5jZS5zY2hlbWEgKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNldEluaXRpYWxFbnRpdHlGaWVsZHNBbmRWYWx1ZXMoXG5cdFx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwbGFpbiBvYmplY3Qgb2YgZW50aXR5IGZpZWxkcyBhbmQgdmFsdWVzIGZyb20gdGhpcyBlbnRpdHkgaW5zdGFuY2VcbiAqIGZvciB1c2UgaW4gY2xvbmluZyB0aGUgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IFBsYWluIG9iamVjdCBvZiBhbGwgZmllbGQ6dmFsdWUgcGFpcnMuXG4gKi9cbmNvbnN0IGZvckNsb25lID0gKCBpbnN0YW5jZSApID0+IHtcblx0cmV0dXJuIGdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JDbG9uaW5nKCBpbnN0YW5jZSApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIHRoZSBlbnRpdHkgZmllbGRzIGFuZCB2YWx1ZXMgZnJvbSB0aGlzIGVudGl0eVxuICogaW5zdGFuY2UgcHJlcGFyZWQgZm9yIHVzZSBpbiBhbiB1cGRhdGUgcmVxdWVzdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gUGxhaW4gb2JqZWN0IG9mIGZpZWxkOnZhbHVlIHBhaXJzLlxuICovXG5jb25zdCBmb3JVcGRhdGUgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRyZXR1cm4gZ2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvclBlcnNpc3RpbmcoIGluc3RhbmNlICk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwbGFpbiBvYmplY3Qgb2YgdGhlIGVudGl0eSBmaWVsZHMgYW5kIHZhbHVlcyBmcm9tIHRoaXMgZW50aXR5XG4gKiBpbnN0YW5jZSBwcmVwYXJlZCBmb3IgdXNlIGluIGFuIGluc2VydCByZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBQbGFpbiBvYmplY3Qgb2YgZmllbGQ6dmFsdWUgcGFpcnMuXG4gKi9cbmNvbnN0IGZvckluc2VydCA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdGNvbnN0IGVudGl0eVZhbHVlcyA9IGdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JQZXJzaXN0aW5nKFxuXHRcdGluc3RhbmNlLFxuXHRcdHRydWVcblx0KTtcblx0aW5zdGFuY2UucHJpbWFyeUtleXMuZm9yRWFjaCggKCBwcmltYXJ5S2V5ICkgPT4ge1xuXHRcdGVudGl0eVZhbHVlc1sgcHJpbWFyeUtleSBdID0gaW5zdGFuY2VbIHByaW1hcnlLZXkgXTtcblx0fSApO1xuXHRyZXR1cm4gZW50aXR5VmFsdWVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIHRoZSBlbnRpdHkgZmllbGRzIGFuZCB2YWx1ZXMgZnJvbSB0aGlzIGVudGl0eVxuICogaW5zdGFuY2UgcHJlcGFyZWQgZm9yIHVzZSBpbiBlaXRoZXIgYW4gaW5zZXJ0IG9yIHVwZGF0ZSByZXF1ZXN0LiAgVGhlIHR5cGVcbiAqIGlzIGF1dG9tYXRpY2FsbHkgZGVyaXZlZCBmcm9tIHRoZSBkZXRlcm1pbmluZyB3aGV0aGVyIHRoZSBlbnRpdHkgaXMgXCJuZXdcIiBvclxuICogbm90LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBQbGFpbiBvYmplY3Qgb2YgZmllbGQ6dmFsdWUgcGFpcnMuXG4gKi9cbmNvbnN0IGZvclBlcnNpc3QgPSAoIGluc3RhbmNlICkgPT4ge1xuXHRpZiAoIGluc3RhbmNlLmlzTmV3ICkge1xuXHRcdHJldHVybiBmb3JJbnNlcnQoIGluc3RhbmNlICk7XG5cdH1cblx0cmV0dXJuIGZvclVwZGF0ZSggaW5zdGFuY2UgKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBnZXR0ZXJzIGZvciByZXRyaWV2aW5nIHRoZSBmaWVsZHMgYW5kIHZhbHVlcyBvZiB0aGUgZW50aXR5IGluc3RhbmNlXG4gKiBmb3IgaW5zZXJ0IG9yIHVwZGF0ZSByZXF1ZXN0cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVBlcnNpc3RpbmdHZXR0ZXJzQW5kU2V0dGVycyA9ICggaW5zdGFuY2UgKSA9PiB7XG5cdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKCBpbnN0YW5jZSwgJ2ZvclVwZGF0ZScsIGZvclVwZGF0ZSApO1xuXHRjcmVhdGVDYWxsYmFja0dldHRlciggaW5zdGFuY2UsICdmb3JJbnNlcnQnLCBmb3JJbnNlcnQgKTtcblx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoIGluc3RhbmNlLCAnZm9yUGVyc2lzdCcsIGZvclBlcnNpc3QgKTtcblx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoIGluc3RhbmNlLCAnZm9yQ2xvbmUnLCBmb3JDbG9uZSApO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGluaXRpYWwgZW50aXR5IGZpZWxkIGFjY2Vzc29ycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBpc1ByaW1hcnlLZXlcbiAqL1xuY29uc3Qgc2V0SW5pdGlhbEVudGl0eUZpZWxkc0FuZFZhbHVlcyA9IChcblx0aW5zdGFuY2UsXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0aXNQcmltYXJ5S2V5ID0gZmFsc2UsXG4pID0+IHtcblx0aWYgKCBpc1VuZGVmaW5lZCggZmllbGRWYWx1ZSApICkge1xuXHRcdGZpZWxkVmFsdWUgPSBnZXREZWZhdWx0VmFsdWVGb3JGaWVsZCggZmllbGROYW1lLCBpbnN0YW5jZS5zY2hlbWEgKTtcblx0XHRzZXRWYWxpZGF0ZVR5cGVGb3JGaWVsZCggaW5zdGFuY2UsIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSApO1xuXHR9XG5cdGNyZWF0ZVJhd0VudGl0eUdldHRlcnNTZXR0ZXJzKFxuXHRcdGluc3RhbmNlLFxuXHRcdGZpZWxkTmFtZSxcblx0XHRkZXJpdmVQcmVwYXJlZFZhbHVlRm9yRmllbGQoIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgaW5zdGFuY2UgKSxcblx0XHRpc1ByaW1hcnlLZXlcblx0KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyByYXcgZW50aXR5IGdldHRlcnMgYW5kIHNldHRlcnMuICBUaGVzZSBhcmUgdGhlIHByb3BlcnRpZXMgb2YgYW5cbiAqIGVudGl0eSB0aGF0IGhhdmUgdGhlIHZhbHVlcyB1c2VkIGZvciBub3Qgb25seSBnZXR0aW5nIGJ1dCBhbHNvIHNldHRpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNQcmltYXJ5S2V5IHNldCB0byB0cnVlIGlmIGZpZWxkIGlzIHRoZSBtb2RlbCdzIHByaW1hcnkga2V5XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVSYXdFbnRpdHlHZXR0ZXJzU2V0dGVycyA9IChcblx0aW5zdGFuY2UsXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0aXNQcmltYXJ5S2V5ID0gZmFsc2UsXG4pID0+IHtcblx0Y29uc3Qgb3B0cyA9IHsgZW51bWVyYWJsZTogdHJ1ZSB9O1xuXHQvLyBwcmltYXJ5IGtleSBpcyBpbW11dGFibGVcblx0aWYgKCBpc1ByaW1hcnlLZXkgKSB7XG5cdFx0Y3JlYXRlR2V0dGVyKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0b3B0c1xuXHRcdCk7XG5cdFx0Y3JlYXRlQWxpYXNHZXR0ZXJGb3JGaWVsZCggaW5zdGFuY2UsIGZpZWxkTmFtZSApO1xuXHR9IGVsc2Uge1xuXHRcdGNyZWF0ZUdldHRlckFuZFNldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdG9wdHNcblx0XHQpO1xuXHRcdGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyRm9yRmllbGQoIGluc3RhbmNlLCBmaWVsZE5hbWUgKTtcblx0fVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIFwiYWxpYXNcIiBnZXR0ZXIgZm9yIHRoZSBnaXZlbiBmaWVsZCBuYW1lIG9uIHRoZSBlbnRpdHkgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBbGlhc0dldHRlckZvckZpZWxkID0gKCBpbnN0YW5jZSwgZmllbGROYW1lICkgPT4ge1xuXHRjcmVhdGVBbGlhc2VzRm9yTWV0aG9kKCBpbnN0YW5jZSwgZmllbGROYW1lLCBjcmVhdGVBbGlhc0dldHRlciApO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIFwiYWxpYXNcIiBnZXR0ZXJzIGFuZCBzZXR0ZXJzIGZvciB0aGUgZ2l2ZW4gZmllbGQgb24gdGhlIGVudGl0eVxuICogaW5zdGFuY2UuXG4gKlxuICogRXhhbXBsZTogRGF0ZXRpbWUgZW50aXRpZXMgaGF2ZSBhIGBEVFRfRVZUX3N0YXJ0YCBmaWVsZC4gIE9uIHRoZSBlbnRpdHlcbiAqIGluc3RhbmNlLCB5b3Ugd2lsbCBiZSBhYmxlIHRvIGFjY2VzcyB0aGUgdmFsdWUgb2YgdGhhdCBmaWVsZCB2aWE6XG4gKiAtIGRhdGV0aW1lLkRUVF9FVlRfc3RhcnRcbiAqIC0gZGF0ZXRpbWUuZHR0RXZ0U3RhcnRcbiAqIC0gZGF0ZXRpbWUuZXZ0U3RhcnRcbiAqIC0gZGF0ZXRpbWUuc3RhcnRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyRm9yRmllbGQgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUgKSA9PiB7XG5cdGNyZWF0ZUFsaWFzZXNGb3JNZXRob2QoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyICk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgQWxpYXNlcyB1c2luZyB0aGUgcHJvdmlkZWQgbWV0aG9kLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kXG4gKi9cbmNvbnN0IGNyZWF0ZUFsaWFzZXNGb3JNZXRob2QgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUsIG1ldGhvZCApID0+IHtcblx0Ly8gc3RyaXAgZmllbGQgcHJlZml4ZXMgYW5kIGNhbWVsQ2FzZSAoaWYgdGhlcmUgYXJlIGZpZWxkIHByZWZpeGVzIGZvciB0aGVcblx0Ly8gZW50aXR5LiAoZWcuIEVWVF9kZXNjID0+IGRlc2MgYW5kIERUVF9FVlRfc3RhcnQgPT4gc3RhcnQpO1xuXHRpZiAoIGluc3RhbmNlLmZpZWxkUHJlZml4ZXMgKSB7XG5cdFx0bGV0IG5ld0ZpZWxkTmFtZSA9IGZpZWxkTmFtZTtcblxuXHRcdGluc3RhbmNlLmZpZWxkUHJlZml4ZXMuZm9yRWFjaCggKCBmaWVsZFByZWZpeCApID0+IHtcblx0XHRcdG5ld0ZpZWxkTmFtZSA9IG5ld0ZpZWxkTmFtZS5yZXBsYWNlKCBmaWVsZFByZWZpeCArICdfJywgJycgKTtcblx0XHR9ICk7XG5cdFx0aWYgKCBuZXdGaWVsZE5hbWUgIT09IGZpZWxkTmFtZSApIHtcblx0XHRcdG1ldGhvZChcblx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0Y2FtZWxDYXNlKCBuZXdGaWVsZE5hbWUgKVxuXHRcdFx0KTtcblx0XHR9XG5cdH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhIGNhbGxiYWNrIHRoYXQgaXMgdXNlZCBpbiB0aGUgYGdldFJlbmRlcmVkYCBmaWVsZCBnZXR0ZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihzdHJpbmcpOiAqfSAgQSBjYWxsYmFjay5cbiAqL1xuY29uc3QgZ2V0UmVuZGVyZWRDYWxsYmFjayA9ICggaW5zdGFuY2UgKSA9PiAoIHJlcXVlc3RlZEZpZWxkTmFtZSApID0+XG5cdGluc3RhbmNlWyByZXF1ZXN0ZWRGaWVsZE5hbWUgKyAnUmVuZGVyZWQnIF07XG5cbi8qKlxuICogUmV0dXJucyBhIGZpZWxkTmFtZSBzdHJpcHBlZCBvZiBhbGwgcG9zc2libGUgcHJlZml4ZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBwcmVmaXggZnJlZSBmaWVsZE5hbWUuXG4gKi9cbmNvbnN0IHJlbW92ZVByZWZpeGVzRnJvbUZpZWxkID0gKCBpbnN0YW5jZSwgZmllbGROYW1lICkgPT4ge1xuXHRjb25zdCBwcmVmaXhlc1RvUmVtb3ZlID0gc29ydEJ5KFxuXHRcdGluc3RhbmNlLmZpZWxkUHJlZml4ZXMsXG5cdFx0KCBwcmVmaXggKSA9PiBwcmVmaXgubGVuZ3RoICogLTFcblx0KTtcblx0bGV0IG5ld0ZpZWxkTmFtZSA9IGZpZWxkTmFtZTtcblx0Zm9yRWFjaCggcHJlZml4ZXNUb1JlbW92ZSwgKCBwcmVmaXggKSA9PiB7XG5cdFx0bmV3RmllbGROYW1lID0gZmllbGROYW1lLnJlcGxhY2UoIHByZWZpeCwgJycgKTtcblx0XHRpZiAoIG5ld0ZpZWxkTmFtZSAhPT0gZmllbGROYW1lICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fSApO1xuXHRyZXR1cm4gbmV3RmllbGROYW1lO1xufTtcblxuLyoqXG4gKiBUaGlzIGNyZWF0ZXMgdGhlIGdldHRlcnMgZm9yIHRoZSByZW5kZXJlZCBwcm9wZXJ0eSBvZiBtb2RlbCBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9ICBmaWVsZFZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVSZW5kZXJlZEdldHRlcnMgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUgKSA9PiB7XG5cdGNyZWF0ZUdldHRlcihcblx0XHRpbnN0YW5jZSxcblx0XHRjYW1lbENhc2UoIHJlbW92ZVByZWZpeGVzRnJvbUZpZWxkKCBpbnN0YW5jZSwgZmllbGROYW1lICkgKSArXG5cdFx0J1JlbmRlcmVkJyxcblx0XHRmaWVsZFZhbHVlXG5cdCk7XG5cdGlmICggaXNVbmRlZmluZWQoIGluc3RhbmNlLmdldFJlbmRlcmVkICkgKSB7XG5cdFx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdCdnZXRSZW5kZXJlZCcsXG5cdFx0XHRnZXRSZW5kZXJlZENhbGxiYWNrLFxuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHRoZSBgaGFzTXVsdGlwbGVQcmltYXJ5S2V5c2AgZ2V0dGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7ZnVuY3Rpb24oKTogYm9vbGVhbn0gVGhlIGNhbGxiYWNrIGZvciBoYXNNdWx0aXBsZVByaW1hcnlLZXlzIGdldHRlclxuICovXG5jb25zdCBoYXNNdWx0aXBsZVByaW1hcnlLZXlzQ2FsbGJhY2sgPSAoIGluc3RhbmNlICkgPT5cblx0aW5zdGFuY2UucHJpbWFyeUtleXMubGVuZ3RoID4gMTtcblxuLyoqXG4gKiBDcmVhdGVzIGdldHRlcnMgZm9yIHByaW1hcnkga2V5IHJlbGF0ZWQgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7QXJyYXl9IHByaW1hcnlLZXlzXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVQcmltYXJ5S2V5RmllbGRHZXR0ZXJzID0gKCBpbnN0YW5jZSwgcHJpbWFyeUtleXMgKSA9PiB7XG5cdGNvbnN0IG9wdHMgPSB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9O1xuXHRpZiAoIGlzQXJyYXkoIHByaW1hcnlLZXlzICkgKSB7XG5cdFx0Y3JlYXRlR2V0dGVyKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHQncHJpbWFyeUtleScsXG5cdFx0XHRwcmltYXJ5S2V5c1sgMCBdLFxuXHRcdFx0b3B0c1xuXHRcdCk7XG5cdFx0Y3JlYXRlR2V0dGVyQW5kU2V0dGVyKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHQncHJpbWFyeUtleXMnLFxuXHRcdFx0cHJpbWFyeUtleXMsXG5cdFx0XHRvcHRzXG5cdFx0KTtcblx0XHRjcmVhdGVDYWxsYmFja0dldHRlcihcblx0XHRcdGluc3RhbmNlLFxuXHRcdFx0J2hhc011bHRpcGxlUHJpbWFyeUtleXMnLFxuXHRcdFx0aGFzTXVsdGlwbGVQcmltYXJ5S2V5c0NhbGxiYWNrLFxuXHRcdFx0b3B0c1xuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihzdHJpbmcpOiBib29sZWFufSBSZXR1cm5zIGEgY2FsbGJhY2sgZm9yIHRoZVxuICogaGFzQ2FsY3VsYXRlZEZpZWxkIGdldHRlclxuICovXG5jb25zdCBoYXNDYWxjdWxhdGVkRmllbGRDYWxsYmFjayA9ICggaW5zdGFuY2UgKSA9PlxuXHQoIGZpZWxkTmFtZVRvQ2hlY2sgKSA9PiAhIGlzVW5kZWZpbmVkKCBpbnN0YW5jZVsgZmllbGROYW1lVG9DaGVjayBdICk7XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgZ2V0dGVycyBmb3IgYWxsIHRoZSBjYWxjdWxhdGVkIGZpZWxkcyBhbmQgdmFsdWUgb24gdGhlIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59ZmllbGRzQW5kVmFsdWVzXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRDYWxjdWxhdGVkRmllbGRBbmRWYWx1ZXMgPSAoIGluc3RhbmNlLCBmaWVsZHNBbmRWYWx1ZXMgKSA9PiB7XG5cdGZvckVhY2goIGZpZWxkc0FuZFZhbHVlcywgKCBjYWxjdWxhdGVkRmllbGRWYWx1ZSwgY2FsY3VsYXRlZEZpZWxkTmFtZSApID0+IHtcblx0XHRpZiAoIGNhbGN1bGF0ZWRGaWVsZE5hbWUgIT09ICdfcHJvdGVjdGVkJyApIHtcblx0XHRcdGNyZWF0ZUdldHRlcihcblx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdGNhbWVsQ2FzZSggY2FsY3VsYXRlZEZpZWxkTmFtZSApLFxuXHRcdFx0XHRjYWxjdWxhdGVkRmllbGRWYWx1ZVxuXHRcdFx0KTtcblx0XHR9XG5cdH0gKTtcblx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoXG5cdFx0aW5zdGFuY2UsXG5cdFx0J2hhc0NhbGN1bGF0ZWRGaWVsZCcsXG5cdFx0aGFzQ2FsY3VsYXRlZEZpZWxkQ2FsbGJhY2tcblx0KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGdldHRlcnMgZm9yIHRoZSB2YXJpb3VzIHJlc291cmNlIGxpbmtzIG9uIHRoZSBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fWZpZWxkc0FuZFZhbHVlc1xuICovXG5leHBvcnQgY29uc3Qgc2V0UmVzb3VyY2VzID0gKCBpbnN0YW5jZSwgZmllbGRzQW5kVmFsdWVzICkgPT4ge1xuXHRjb25zdCByZWxhdGlvbnMgPSBbXTtcblx0bGV0IHJlbGF0aW9uTmFtZTtcblx0Zm9yRWFjaCggZmllbGRzQW5kVmFsdWVzLCAoIHJlc291cmNlVmFsdWUsIHJlc291cmNlTmFtZSApID0+IHtcblx0XHRpZiAoIHJlc291cmNlTmFtZSA9PT0gJ3NlbGYnICkge1xuXHRcdFx0Y3JlYXRlR2V0dGVyKCBpbnN0YW5jZSwgJ3Jlc291cmNlTGluaycsIHJlc291cmNlVmFsdWVbIDAgXS5ocmVmICk7XG5cdFx0fSBlbHNlIGlmICggcmVzb3VyY2VOYW1lID09PSAnY29sbGVjdGlvbicgKSB7XG5cdFx0XHRjcmVhdGVHZXR0ZXIoXG5cdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHQnY29sbGVjdGlvblJlc291cmNlTGluaycsXG5cdFx0XHRcdHJlc291cmNlVmFsdWVbIDAgXS5ocmVmXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZWxhdGlvbk5hbWUgPSBnZXRSZWxhdGlvbk5hbWVGcm9tTGluayggcmVzb3VyY2VOYW1lICk7XG5cdFx0XHRyZWxhdGlvbnMucHVzaCggcmVsYXRpb25OYW1lICk7XG5cdFx0XHRzZXRSZWxhdGlvbnNSZXNvdXJjZShcblx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdHJlbGF0aW9uTmFtZSArICdSZXNvdXJjZScsXG5cdFx0XHRcdHJlc291cmNlVmFsdWVcblx0XHRcdCk7XG5cdFx0fVxuXHR9ICk7XG5cdC8vc2V0IHJlbGF0aW9ucyBnZXR0ZXJcblx0Y3JlYXRlR2V0dGVyKCBpbnN0YW5jZSwgJ2dldFJlbGF0aW9ucycsIHJlbGF0aW9ucyApO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKHN0cmluZyk6IE9iamVjdH0gUmV0dXJucyB0aGUgY2FsbGJhY2sgZm9yIGdldHRpbmcgYVxuICogcmVsYXRpb24gcmVzb3VyY2VcbiAqL1xuY29uc3QgZ2V0UmVsYXRpb25SZXNvdXJjZUNhbGxiYWNrID0gKCBpbnN0YW5jZSApID0+XG5cdCggcmVsYXRpb25OYW1lICkgPT4gaW5zdGFuY2VbIHJlbGF0aW9uTmFtZS5yZXBsYWNlKCAnUmVzb3VyY2UnLCAnJyApIF07XG5cbi8qKlxuICogQ3JlYXRlcyBnZXR0ZXJzIGZvciB0aGUgcmVsYXRpb25zIHJlc291cmNlIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsIHN0cmluZz59IHJlc291cmNlSW5mb1xuICovXG5leHBvcnQgY29uc3Qgc2V0UmVsYXRpb25zUmVzb3VyY2UgPSAoXG5cdGluc3RhbmNlLFxuXHRyZWxhdGlvbk5hbWUsXG5cdHJlc291cmNlSW5mb1xuKSA9PiB7XG5cdGNyZWF0ZUdldHRlcihcblx0XHRpbnN0YW5jZSxcblx0XHRyZWxhdGlvbk5hbWUsXG5cdFx0e1xuXHRcdFx0cmVzb3VyY2VMaW5rOiByZXNvdXJjZUluZm9bIDAgXS5ocmVmLFxuXHRcdFx0c2luZ2xlOiByZXNvdXJjZUluZm9bIDAgXS5zaW5nbGUsXG5cdFx0fVxuXHQpO1xuXHRpZiAoIGlzVW5kZWZpbmVkKCBpbnN0YW5jZS5nZXRSZWxhdGlvblJlc291cmNlICkgKSB7XG5cdFx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoIGluc3RhbmNlLFxuXHRcdFx0J2dldFJlbGF0aW9uUmVzb3VyY2UnLFxuXHRcdFx0Z2V0UmVsYXRpb25SZXNvdXJjZUNhbGxiYWNrXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBpbnRlcm5hbCBzYXZlIHN0YXRlIHRvIHRoZSBnaXZlbiB2YWx1ZSB3aGVuIGN1cnJlbnQgc3RhdGUgaXNcbiAqIFNBVkVfU1RBVEUuY2xlYW4gb3RoZXJ3aXNlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBpcyByZXRhaW5lZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBzYXZlU3RhdGUgRXhwZWN0ZWQgdG8gYmUgb25lIG9mIFNBVkVfU1RBVEUgY29uc3RhbnQgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBvdmVycmlkZSBTZXQgdG8gdHJ1ZSB3aGVuIG92ZXJyaWRpbmcgdGhlIGRlZmF1bHQgbG9naWMgZm9yXG4gKiBzZXR0aW5nIHN0YXRlLiAgV2hlbiB0cnVlLCB0aGUgc2F2ZVN0YXRlIGlzIHNldCB0byB3aGF0ZXZlciB0aGUgaW5jb21pbmdcbiAqIHNhdmVTdGF0ZSB2YWx1ZSBpcy5cbiAqL1xuZXhwb3J0IGNvbnN0IHNldFNhdmVTdGF0ZSA9ICggaW5zdGFuY2UsIHNhdmVTdGF0ZSwgb3ZlcnJpZGUgPSBmYWxzZSApID0+IHtcblx0Y29uc3QgY3VycmVudFN0YXRlID0gaW5zdGFuY2VbIFBSSVZBVEVfUFJPUEVSVElFUy5TQVZFX1NUQVRFIF07XG5cdHN3aXRjaCAoIHNhdmVTdGF0ZSApIHtcblx0XHRjYXNlIFNBVkVfU1RBVEUuRElSVFk6XG5cdFx0Y2FzZSBTQVZFX1NUQVRFLk5FVzpcblx0XHRjYXNlIFNBVkVfU1RBVEUuQ0xFQU46XG5cdFx0XHRpZiAoIG92ZXJyaWRlICkge1xuXHRcdFx0XHRpbnN0YW5jZVsgUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEUgXSA9IHNhdmVTdGF0ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpbnN0YW5jZVsgUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEUgXSA9XG5cdFx0XHRcdGN1cnJlbnRTdGF0ZSA9PT0gU0FWRV9TVEFURS5DTEVBTiA/XG5cdFx0XHRcdFx0c2F2ZVN0YXRlIDpcblx0XHRcdFx0XHRjdXJyZW50U3RhdGU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudChcblx0XHRcdFx0J1NhdmUgc3RhdGUgZm9yIGVudGl0eSBjYW4gb25seSBiZSBzZXQgdG8gZWl0aGVyICcgK1xuXHRcdFx0XHQnU0FWRV9TVEFURS5ESVJUWSwgU0FWRV9TVEFURS5ORVcgb3IgU0FWRV9TVEFURS5DTEVBTidcblx0XHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQWRkIHRoZSBmaWVsZCBuYW1lIHRvIHRoZSBmaWVsZFRvUGVyc2lzdE9uSW5zZXJ0IHByb3BlcnR5IG9uIHRoZSBpbnN0YW5jZVxuICogaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICovXG5leHBvcnQgY29uc3Qgc2V0RmllbGRUb1BlcnNpc3QgPSAoIGluc3RhbmNlLCBmaWVsZE5hbWUgKSA9PiB7XG5cdGlmICggaW5zdGFuY2UuZmllbGRzVG9QZXJzaXN0T25JbnNlcnQgKSB7XG5cdFx0aW5zdGFuY2UuZmllbGRzVG9QZXJzaXN0T25JbnNlcnQuYWRkKCBmaWVsZE5hbWUgKTtcblx0fVxufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRpc1BsYWluT2JqZWN0LFxuXHRjYW1lbENhc2UsXG5cdGxhc3QsXG5cdHBpY2ssXG5cdHBpY2tCeSxcblx0aXNBcnJheSxcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGluc3RhbmNlT2YgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdE1vbmV5LFxuXHRTaXRlQ3VycmVuY3ksXG5cdFNlcnZlckRhdGVUaW1lIGFzIERhdGVUaW1lLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWx1ZS1vYmplY3RzJztcblxuaW1wb3J0IHsgcGx1cmFsTW9kZWxOYW1lIH0gZnJvbSAnLi4vbW9kZWwtbmFtZXMnO1xuXG5pbXBvcnQge1xuXHRoYXNSYXdQcm9wZXJ0eSxcblx0aGFzUHJldHR5UHJvcGVydHksXG5cdGhhc1JlbmRlcmVkUHJvcGVydHksXG5cdGlzRGF0ZVRpbWVGaWVsZCxcblx0aXNNb25leUZpZWxkLFxuXHRpc1ByaW1hcnlLZXlGaWVsZCxcblx0aXNFbnRpdHlGaWVsZCxcbn0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQgeyB2YWxpZGF0ZVR5cGVGb3JGaWVsZCB9IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5pbXBvcnQgeyBWQUxJREFURV9UWVBFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIFRoaXMgcmVjZWl2ZXMgYSBmaWVsZCBuYW1lLCBpdCdzIHZhbHVlIGFuZCB0aGUgc2NoZW1hIGFuZCBjb252ZXJ0cyBpdCB0byB0aGVcbiAqIHJlbGF0ZWQgdmFsdWUgb2JqZWN0IElGIHRoZSBzY2hlbWEgaW5kaWNhdGVzIGl0IGlzIG9mIGEgdHlwZSB0aGF0IHRoZXJlIGlzIGFcbiAqIGtub3duIHZhbHVlIG9iamVjdCBmb3IuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtEYXRlVGltZXxNb25leXwqfSAgSWYgdGhpcyBpcyBub3QgYSB2YWx1ZSBvYmplY3QsIHRoZSBvcmlnaW5hbCBmaWVsZFxuICogdmFsdWUgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBtYXliZUNvbnZlcnRUb1ZhbHVlT2JqZWN0ID0gKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIHNjaGVtYSApID0+IHtcblx0aWYgKFxuXHRcdGlzRGF0ZVRpbWVGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSAmJlxuXHRcdCEgRGF0ZVRpbWUudmFsaWRhdGVJc0RhdGVUaW1lKCBmaWVsZFZhbHVlIClcblx0KSB7XG5cdFx0cmV0dXJuIERhdGVUaW1lLmZyb21JU08oIGZpZWxkVmFsdWUgKTtcblx0fVxuXHRpZiAoXG5cdFx0aXNNb25leUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApICYmXG5cdFx0ISAoIGluc3RhbmNlT2YoIGZpZWxkVmFsdWUsICdNb25leScgKSApXG5cdCkge1xuXHRcdHJldHVybiBuZXcgTW9uZXkoIGZpZWxkVmFsdWUsIFNpdGVDdXJyZW5jeSApO1xuXHR9XG5cdC8vIGlmIG1vcmUgVk9zIGdldCBhZGRlZCwgdGhlbiBpbnN0ZWFkIG9mIGFkZGluZyBtb3JlIGlmIGVsc2UgYmxvY2tzXG5cdC8vIHRvIHRoaXMgZnVuY3Rpb24gYW5kIHRoZSBvbmVzIGJlbG93LCBhbGwgVk8gbG9naWMgc2hvdWxkIGJlIGV4dHJhY3RlZFxuXHQvLyBpbnRvIHNvbWUga2luZCBvZiAgVmFsdWVPYmplY3RFeHRyYWN0b3Igb2JqZWN0IHRoYXQgd291bGQgaG9sZCBhbGwgb2Zcblx0Ly8gdGhlIG5lY2Vzc2FyeSBjYWxsYmFja3MgZm9yIG1hbmFnaW5nIHRoZSBkZXRlY3Rpb24gb2YgVk8gZmllbGRzIGFuZFxuXHQvLyBjb252ZXJzaW9uIG9mIGRhdGEgdG8gYW5kIGZyb20gdGhlIHZhcmlvdXMgVk9zXG5cdC8vIHBseiBzZWU6XG5cdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ldmVudGVzcHJlc3NvL2V2ZW50LWVzcHJlc3NvLWNvcmUvcHVsbC82MzcvZmlsZXMjcjIyODY5MDc4OVxuXHRyZXR1cm4gZmllbGRWYWx1ZTtcbn07XG5cbi8qKlxuICogVGhpcyBjb252ZXJ0cyB0aGUgaW5jb21pbmcgdmFsdWUgZm9yIGEgZmllbGQgdG8gaXRzIGVxdWl2YWxlbnQgXCJyYXdcIiB2YWx1ZVxuICogZnJvbSBhIHZhbHVlIG9iamVjdCBpZiBpdCBpcyBhIHZhbHVlIG9iamVjdC4gIE90aGVyd2lzZSBpdCBqdXN0IHJldHVybnMgdGhlXG4gKiBvcmlnaW5hbCBpbmNvbWluZyB2YWx1ZS4gIFRoaXMgYWxzbyBhc3NlcnRzIHRoYXQgaWYgdGhlIHByb3ZpZGVkIGZpZWxkIGlzXG4gKiBleHBlY3RlZCB0byBiZSBhIHZhbHVlIG9iamVjdCB0aGF0IHRoZSBpbmNvbWluZyB2YWx1ZSBJUyBhIHZhbGlkIHZhbHVlIG9iamVjdFxuICogYW5kIGl0IGlzIHRoZSBleHBlY3RlZCBpbnN0YW5jZSBvZiBhIHZhbHVlIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp8TW9uZXl8RGF0ZVRpbWV9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge3N0cmluZ3xudW1iZXJ8Kn0gIElmIHRoZSB2YWx1ZSBpcyBub3QgYSB2YWx1ZSBvYmplY3QsIHJldHVybnMgdGhlXG4gKiBvcmlnaW5hbCB2YWx1ZVxuICogQHRocm93cyB7VHlwZUVycm9yfVxuICovXG5leHBvcnQgY29uc3QgbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMgPSAoXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0c2NoZW1hXG4pID0+IHtcblx0aWYgKCBpc0RhdGVUaW1lRmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgKSB7XG5cdFx0dHJ5IHtcblx0XHRcdERhdGVUaW1lLmFzc2VydElzRGF0ZVRpbWUoIGZpZWxkVmFsdWUgKTtcblx0XHR9IGNhdGNoICggZXJyb3IgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGZvbGxvd2luZyBlcnJvciB3YXMgdGhyb3duIHdoZW4gdHJ5aW5nIHRvIGNvbnZlcnQgdGhlIFwiJyArXG5cdFx0XHRcdGZpZWxkTmFtZSArICdcIiBEYXRlVGltZSBmaWVsZCB0byBhbiBJU08gc3RyaW5nOiAnICsgZXJyb3Jcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGZpZWxkVmFsdWUgPSBmaWVsZFZhbHVlLnRvSVNPKCk7XG5cdH0gZWxzZSBpZiAoIGlzTW9uZXlGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHR0cnkge1xuXHRcdFx0TW9uZXkuYXNzZXJ0TW9uZXkoIGZpZWxkVmFsdWUgKTtcblx0XHR9IGNhdGNoICggZXJyb3IgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGZvbGxvd2luZyBlcnJvciB3YXMgdGhyb3duIHdoZW4gdHJ5aW5nIHRvIGNvbnZlcnQgdGhlIFwiJyArXG5cdFx0XHRcdGZpZWxkTmFtZSArICdcIiBNb25leSBmaWVsZCB0byBhIG51bWJlcjogJyArIGVycm9yXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRmaWVsZFZhbHVlID0gZmllbGRWYWx1ZS50b051bWJlcigpO1xuXHR9XG5cdHJldHVybiBmaWVsZFZhbHVlO1xufTtcblxuLyoqXG4gKiBUaGlzIGNvbnZlcnRzIHRoZSBpbmNvbWluZyB2YWx1ZSBmb3IgYSBmaWVsZCB0byBpdHMgZXF1aXZhbGVudCBcInJhd1wiIHZhbHVlXG4gKiBpZiB0aGUgaW5jb21pbmcgdmFsdWUgIGlzIGEgdmFsdWUgb2JqZWN0LiAgT3RoZXJ3aXNlIGl0IGp1c3QgcmV0dXJucyB0aGVcbiAqIG9yaWdpbmFsIGluY29taW5nIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7KnxEYXRlVGltZXxNb25leX1maWVsZFZhbHVlXG4gKiBAcmV0dXJuIHsqfSBUaGUgcmF3IHZhbHVlIGZvciB0aGUgdmFsdWUgb2JqZWN0IG9yIHRoZSBvcmlnaW5hbCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IG1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdCA9ICggZmllbGRWYWx1ZSApID0+IHtcblx0aWYgKCBEYXRlVGltZS52YWxpZGF0ZUlzRGF0ZVRpbWUoIGZpZWxkVmFsdWUgKSApIHtcblx0XHRmaWVsZFZhbHVlID0gZmllbGRWYWx1ZS50b0lTTygpO1xuXHR9IGVsc2UgaWYgKCBpbnN0YW5jZU9mKCBmaWVsZFZhbHVlLCAnTW9uZXknICkgKSB7XG5cdFx0ZmllbGRWYWx1ZSA9IGZpZWxkVmFsdWUudG9OdW1iZXIoKTtcblx0fVxuXHRyZXR1cm4gZmllbGRWYWx1ZTtcbn07XG5cbi8qKlxuICogVGhpcyBkZXJpdmVzIHRoZSBcInByZXBhcmVkXCIgdmFsdWUgZm9yIHRoZSBnaXZlbiBmaWVsZCBhbmQgdmFsdWUuXG4gKlxuICogXCJQcmVwYXJlZFwiIG1lYW5zOlxuICpcbiAqIC0gY29udmVydGluZyB0byBhIHZhbHVlIG9iamVjdCBpZiB0aGlzIGlzIGEgZmllbGQgdGhhdCB0aGVyZSBhcmUgZGVmaW5lZFxuICogICB2YWx1ZSBvYmplY3RzIGZvci5cbiAqIC0gcmV0cmlldmluZyB0aGUgXCJyYXdcIiB2YWx1ZSBmcm9tIGZpZWxkIHZhbHVlcyB0aGF0IGhhdmUgYHJhd2AgYW5kIGByZW5kZXJlZGBcbiAqICAgb3IgYHByZXR0eWAgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9ICBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge0RhdGVUaW1lfE1vbmV5fCp9ICBSZXR1cm5zIHRoZSBvcmlnaW5hbCBpbmNvbWluZyB2YWx1ZSBpZiBpdCBkb2VzXG4gKiBub3QgaGF2ZSBhIHJhdyBlcXVpdmFsZW50IG9yIGlzIG5vdCBhIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlcml2ZVByZXBhcmVkVmFsdWVGb3JGaWVsZCA9IChcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRpbnN0YW5jZVxuKSA9PiB7XG5cdGNvbnN0IHZhbGlkYXRpb25UeXBlID0gdmFsaWRhdGVUeXBlRm9yRmllbGQoIGZpZWxkTmFtZSwgaW5zdGFuY2UgKTtcblx0ZmllbGRWYWx1ZSA9IGlzUGxhaW5PYmplY3QoIGZpZWxkVmFsdWUgKSA/XG5cdFx0ZmllbGRWYWx1ZVsgdmFsaWRhdGlvblR5cGUgXSA6XG5cdFx0ZmllbGRWYWx1ZTtcblx0cmV0dXJuIG1heWJlQ29udmVydFRvVmFsdWVPYmplY3QoIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgaW5zdGFuY2Uuc2NoZW1hICk7XG59O1xuXG4vKipcbiAqIFRoaXMgcmV0dXJucyB0aGUgXCJyZW5kZXJlZFwiIG9yIFwicHJldHR5XCIgZXF1aXZhbGVudCBmcm9tIGEgdmFsdWUgaWYgaXQgZXhpc3RzXG4gKiBhcyBhIHByb3BlcnR5IG9uIGl0LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4geyp9ICBUaGUgb3JpZ2luYWwgdmFsdWUgaXMgcmV0dXJuZWQgaWYgaXRzIG5vdCBhIHBsYWluIG9iamVjdCBvciBpZlxuICogaXQgaGFzIG5vIGByZW5kZXJlZGAgb3IgYHByZXR0eWAgcHJvcGVydHkuICBIb3dldmVyLCBpZiBpdCBpcyBhIHBsYWluIG9iamVjdFxuICogYW5kIGhhcyBubyBwcmV0dHkvcmVuZGVyZWQgcHJvcGVydGllcyBidXQgRE9FUyBoYXZlIGEgcmF3IHByb3BlcnR5LCB0aGVuIHRoYXRcbiAqIGlzIHJldHVybmVkLlxuICovXG5leHBvcnQgY29uc3QgZGVyaXZlUmVuZGVyZWRWYWx1ZSA9ICggdmFsdWUgKSA9PiB7XG5cdGlmICggISBpc1BsYWluT2JqZWN0KCB2YWx1ZSApICkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXHR2YWx1ZSA9IGhhc1ByZXR0eVByb3BlcnR5KCB2YWx1ZSApID8gdmFsdWUucHJldHR5IDogdmFsdWU7XG5cdHZhbHVlID0gaGFzUmVuZGVyZWRQcm9wZXJ0eSggdmFsdWUgKSA/IHZhbHVlLnJlbmRlcmVkIDogdmFsdWU7XG5cdHJldHVybiBoYXNSYXdQcm9wZXJ0eSggdmFsdWUgKSA/IHZhbHVlLnJhdyA6IHZhbHVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBuYW1lIG9mIGEgcmVzb3VyY2UgZnJvbSB0aGUgZ2l2ZW4gYHJlc291cmNlTGlua2AuXG4gKlxuICogZWcuIFwiaHR0cHM6Ly9hcGkuZXZlbnRlc3ByZXNzby5jb20vcmVnaXN0cmF0aW9uXCIgd2lsbCByZXR1cm4gJ3JlZ2lzdHJhdGlvbic7XG5cbiAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUxpbmtcbiAqIEByZXR1cm4ge3N0cmluZ30gUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgcmVzb3VyY2UgZnJvbSBhIHByb3ZpZGVkIHJlc291cmNlXG4gKiBsaW5rLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UmVsYXRpb25OYW1lRnJvbUxpbmsgPSAoIHJlc291cmNlTGluayApID0+IHtcblx0cmV0dXJuIHBsdXJhbE1vZGVsTmFtZSggY2FtZWxDYXNlKCBsYXN0KCByZXNvdXJjZUxpbmsuc3BsaXQoICcvJyApICkgKSApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGVudGl0eSBmaWVsZCBuYW1lcyBhbmQgdmFsdWVzIGZyb20gdGhlXG4gKiBwcm92aWRlZCBlbnRpdHkgaW5zdGFuY2UuICBUaGUgdmFsdWVzIGFyZSBub3QgcHJlcGFyZWQgYW5kIG1hdGNoIGV4YWN0bHkgd2hhdFxuICogaXMgY3VycmVudGx5IHNldCBvbiB0aGlzIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGVudGl0eUluc3RhbmNlXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgcGxhaW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyA9ICggZW50aXR5SW5zdGFuY2UgKSA9PiB7XG5cdHJldHVybiBPYmplY3Qua2V5cyggZW50aXR5SW5zdGFuY2UgKS5yZWR1Y2UoIChcblx0XHRmaWVsZHNBbmRWYWx1ZXMsXG5cdFx0ZmllbGROYW1lXG5cdCkgPT4ge1xuXHRcdGlmIChcblx0XHRcdGlzRW50aXR5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hICkgJiZcblx0XHRcdCEgaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hIClcblx0XHQpIHtcblx0XHRcdGZpZWxkc0FuZFZhbHVlc1sgZmllbGROYW1lIF0gPSBlbnRpdHlJbnN0YW5jZVsgZmllbGROYW1lIF07XG5cdFx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHR9LCB7fSApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGVudGl0eSBmaWVsZCBuYW1lIGFuZCB2YWx1ZXMgZnJvbSB0aGVcbiAqIHByb3ZpZGVkIGVudGl0eSBpbnN0YW5jZVxuICogQHBhcmFtIHtPYmplY3R9IGVudGl0eUluc3RhbmNlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZvckluc2VydCAgV2hldGhlciB0byByZXR1cm4gdGhlIGZpZWxkcyBhbmQgdmFsdWVzIGZvclxuICogaW5zZXJ0IG9yIGZvciB1cGRhdGUuXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgcGxhaW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yUGVyc2lzdGluZyA9IChcblx0ZW50aXR5SW5zdGFuY2UsXG5cdGZvckluc2VydCA9IGZhbHNlXG4pID0+IHtcblx0Y29uc3QgaXRlcmF0b3IgPSBmb3JJbnNlcnQgP1xuXHRcdEFycmF5LmZyb20oIGVudGl0eUluc3RhbmNlLmZpZWxkc1RvUGVyc2lzdE9uSW5zZXJ0LnZhbHVlcygpICkgOlxuXHRcdE9iamVjdC5rZXlzKCBlbnRpdHlJbnN0YW5jZSApO1xuXG5cdHJldHVybiBpdGVyYXRvci5yZWR1Y2UoIChcblx0XHRmaWVsZHNBbmRWYWx1ZXMsXG5cdFx0ZmllbGROYW1lXG5cdCkgPT4ge1xuXHRcdGlmIChcblx0XHRcdGlzRW50aXR5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hICkgJiZcblx0XHRcdCEgaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hIClcblx0XHQpIHtcblx0XHRcdGZpZWxkc0FuZFZhbHVlc1sgZmllbGROYW1lIF0gPSBtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3QoXG5cdFx0XHRcdGVudGl0eUluc3RhbmNlWyBmaWVsZE5hbWUgXSxcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGRzQW5kVmFsdWVzO1xuXHR9LCB7fSApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwcmltYXJ5IGtleShzKSBhbmQgdmFsdWVzIGZvciB0aGUgZ2l2ZW4gZW50aXR5SW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZW50aXR5SW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gYW4gYXJyYXkgb2YgdmFsdWVzIGZvciB0aGUgcHJpbWFyeSBrZXlzLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UHJpbWFyeUtleVZhbHVlcyA9ICggZW50aXR5SW5zdGFuY2UgKSA9PiBwaWNrKFxuXHRlbnRpdHlJbnN0YW5jZSxcblx0ZW50aXR5SW5zdGFuY2UucHJpbWFyeUtleXNcbik7XG5cbi8qKlxuICogVGhpcyByZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIGVudGl0eSBmaWVsZHMgZnJvbSB0aGUgc2NoZW1hIGZvciB0aGUgZW50aXR5XG4gKiBpbnN0YW5jZSAoc2NoZW1hIGZvciBmaWVsZHMgYXJlIGV4dHJhY3RlZCBhcyB3ZWxsKS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZW50aXR5SW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gQSBwbGFpbiBvYmplY3Qgd2l0aCBmaWVsZHMgYW5kIHNjaGVtYSBwcm9wZXJ0aWVzIHRoYXQgYXJlXG4gKiBlbnRpdHkgcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVudGl0eUZpZWxkc0Zyb21TY2hlbWEgPSAoIGVudGl0eUluc3RhbmNlICkgPT4gcGlja0J5KFxuXHRlbnRpdHlJbnN0YW5jZS5zY2hlbWEsXG5cdCggZmllbGRWYWx1ZSwgZmllbGROYW1lICkgPT4gaXNFbnRpdHlGaWVsZChcblx0XHRmaWVsZE5hbWUsXG5cdFx0ZW50aXR5SW5zdGFuY2Uuc2NoZW1hXG5cdClcbik7XG5cbi8qKlxuICogVGhpcyByZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIGV4dHJhY3RlZCBwcmltYXJ5S2V5IGZpZWxkcyBmcm9tIHRoZSBzY2hlbWFcbiAqIGZvciB0aGUgZW50aXR5IGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbnRpdHlJbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBBIHBsYWluIG9iamVjdCB3aXRoIGZpZWxkcyBhbmQgc2NoZW1hIHByb3BlcnRpZXMgdGhhdFxuICogXHRcdFx0XHRcdHJlcHJlc2VudCBwcmltYXJ5IGtleSBmaWVsZHMuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmltYXJ5S2V5RmllbGRzRnJvbVNjaGVtYSA9ICggZW50aXR5SW5zdGFuY2UgKSA9PiBwaWNrQnkoXG5cdGVudGl0eUluc3RhbmNlLnNjaGVtYSxcblx0KCBmaWVsZFZhbHVlLCBmaWVsZE5hbWUgKSA9PiBpc1ByaW1hcnlLZXlGaWVsZChcblx0XHRmaWVsZE5hbWUsXG5cdFx0ZW50aXR5SW5zdGFuY2Uuc2NoZW1hXG5cdClcbik7XG5cbi8qKlxuICogRGVyaXZlcyB0aGUgZGVmYXVsdCB2YWx1ZSB0byB1c2UgZm9yIGEgZ2l2ZW4gdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHJldHVybiB7Kn0gIEEgdmFsdWUgdG8gdXNlIGZvciB0aGUgZ2l2ZW4gdHlwZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlcml2ZURlZmF1bHRWYWx1ZUZvclR5cGUgPSAoIHR5cGUgKSA9PiB7XG5cdGlmICggaXNBcnJheSggdHlwZSApICkge1xuXHRcdHJldHVybiB0eXBlLmluZGV4T2YoICdudWxsJyApID4gLTEgP1xuXHRcdFx0bnVsbCA6XG5cdFx0XHRkZXJpdmVEZWZhdWx0VmFsdWVGb3JUeXBlKCB0eXBlWyAwIF0gKTtcblx0fVxuXHRzd2l0Y2ggKCB0eXBlICkge1xuXHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0Y2FzZSAnbnVtYmVyJzpcblx0XHRjYXNlICdpbnRlZ2VyJzpcblx0XHRcdHJldHVybiAwO1xuXHRcdGNhc2UgJ251bGwnOlxuXHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRjYXNlICdib29sZWFuJzpcblx0XHRjYXNlICdib29sJzpcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRjYXNlICdkYXRlLXRpbWUnOlxuXHRcdFx0cmV0dXJuICggbmV3IERhdGUoKSApLnRvSVNPU3RyaW5nKCk7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIERlcml2ZXMgd2hhdCBgdHlwZWAgYSBmaWVsZCBpcyBmcm9tIHRoZSBzY2hlbWEuXG4gKiBJdCBhY2NvdW50cyBmb3IgY2FzZXMgd2hlcmUgdGhlIFwidHlwZVwiIG9mIGEgZmllbGQgbWlnaHQgYmUgYGRhdGUtdGltZWAgb3JcbiAqIHdoZXJlIHRoZSB0eXBlIGlzIGFuIG9iamVjdCBhbmQgdGh1cyB0aGUgYHR5cGVgIGZvciB0aGUgcHVycG9zZXMgb2YgbW9kZWxcbiAqIGVudGl0aWVzIGlzIGRlZmluZWQgYnkgdGhlIGByYXdgIHByb3BlcnR5IGZvciB0aGUgZmllbGQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Kn0gIFdoYXQgdHlwZSB0aGUgZmlsZWQgaXMuXG4gKi9cbmV4cG9ydCBjb25zdCBkZXJpdmVUeXBlRm9yRmllbGQgPSAoIGZpZWxkTmFtZSwgc2NoZW1hICkgPT4ge1xuXHRpZiAoIGlzRGF0ZVRpbWVGaWVsZCggZmllbGROYW1lLCBzY2hlbWEgKSApIHtcblx0XHRyZXR1cm4gJ2RhdGUtdGltZSc7XG5cdH1cblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdICYmIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSApIHtcblx0XHRpZiAoIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0ucHJvcGVydGllcyAmJlxuXHRcdFx0XHRoYXNSYXdQcm9wZXJ0eSggc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzIClcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gc2NoZW1hWyBmaWVsZE5hbWUgXS5wcm9wZXJ0aWVzLnJhdy50eXBlID9cblx0XHRcdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnByb3BlcnRpZXMucmF3LnR5cGUgOlxuXHRcdFx0XHRcdG51bGw7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogVGhpcyBkZXJpdmVzIHRoZSB2YWxpZGF0ZSB0eXBlIGZyb20gdGhlIGluY29taW5nIGZpZWxkIGFuZCB2YWx1ZSBhY2NvcmRpbmdcbiAqIHRvIHRoZSBzY2hlbWEgYW5kIGluY29taW5nIHZhbHVlLlxuICpcbiAqIFRoaXMgYWNjb3VudHMgZm9yIHRoZSBmYWN0IHRoYXQgZW50aXRpZXMgbWF5IGJlIGNvbnN0cnVjdGVkIGZyb20gdGhlXG4gKiBmb2xsb3dpbmcgY29udGV4dHM6XG4gKlxuICogMS4gQXV0aGVkIFJFU1QgcmVzcG9uc2UgKHdoaWNoIGNvdWxkIGhhdmUgYm90aCByYXcsIHJlbmRlcmVkIG9yIHByZXR0eVxuICogICAgdmFsdWVzIGluIHRoZSBmaWVsZCB2YWx1ZSkuXG4gKiAyLiBOb24tYXV0aGVkIFJFU1QgcmVzcG9uc2UgKHdoaWNoIHdpbGwgbm90IGhhdmUgYSByYXcgdmFsdWUsIGJ1dCBjb3VsZCBoYXZlXG4gKiAgICBhIHByZXR0eSBvciByZW5kZXJlZCB2YWx1ZSkuICBUaGlzIGlzIHBvdGVudGlhbGx5IHByb2JsZW1hdGljIGlmIHRoZVxuICogICAgcmVuZGVyZWQgb3IgcHJldHR5IHZhbHVlIGlzIG9mIGEgZGlmZmVyZW50IGRhdGEgdHlwZSB0aGFuIHRoZSByYXcgdmFsdWUuXG4gKiAzLiBOZXcgZW50aXRpZXMgYnVpbHQgY2xpZW50IHNpZGUsIHdoaWNoIHdpbGwgYmUgYXNzdW1lZCB0byBiZSBwcmVwYXJlZFxuICogICAgYWdhaW5zdCB0aGUgXCJyYXdcIiB2YWxpZGF0ZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7U3ltYm9sfSAgVGhlIHZhbGlkYXRlIHR5cGUgZm9yIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlcml2ZVZhbGlkYXRlVHlwZUZvckZpZWxkID0gKCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIHNjaGVtYSApID0+IHtcblx0aWYgKCBoYXNSYXdQcm9wZXJ0eSggZmllbGRWYWx1ZSApICkge1xuXHRcdHJldHVybiBWQUxJREFURV9UWVBFLlJBVztcblx0fVxuXHRpZiAoIHNjaGVtYVsgZmllbGROYW1lIF0gJiYgc2NoZW1hWyBmaWVsZE5hbWUgXS50eXBlICkge1xuXHRcdGlmIChcblx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdGlzUGxhaW5PYmplY3QoIGZpZWxkVmFsdWUgKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGhhc1JlbmRlcmVkUHJvcGVydHkoIGZpZWxkVmFsdWUgKSA/XG5cdFx0XHRcdFZBTElEQVRFX1RZUEUuUkVOREVSRUQgOlxuXHRcdFx0XHRWQUxJREFURV9UWVBFLlBSRVRUWTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIFZBTElEQVRFX1RZUEUuUkFXO1xufTtcblxuLyoqXG4gKiBUaGlzIGdldHMgdGhlIGRlZmF1bHQgdmFsdWUgZm9yIGEgZmllbGQgZnJvbSB0aGUgcHJvdmlkZWQgc2NoZW1hLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4geyp9IFRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGUgZmllbGQgZnJvbSB0aGUgc2NoZW1hIG9yIGlmIG5vdFxuICogcHJlc2VudCBpbiB0aGUgc2NoZW1hLCBhIGRlcml2ZWQgZGVmYXVsdCB2YWx1ZSBmcm9tIHRoZSBzY2hlbWEgdHlwZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldERlZmF1bHRWYWx1ZUZvckZpZWxkID0gKCBmaWVsZE5hbWUsIHNjaGVtYSApID0+IHtcblx0aWYgKCBzY2hlbWFbIGZpZWxkTmFtZSBdICkge1xuXHRcdHJldHVybiBzY2hlbWFbIGZpZWxkTmFtZSBdLmRlZmF1bHQgP1xuXHRcdFx0c2NoZW1hWyBmaWVsZE5hbWUgXS5kZWZhdWx0IDpcblx0XHRcdGRlcml2ZURlZmF1bHRWYWx1ZUZvclR5cGUoIHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSApO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcbiIsImV4cG9ydCB7IEJhc2VFbnRpdHksIGRlZmF1bHQgYXMgY3JlYXRlRW50aXR5RmFjdG9yeSB9IGZyb20gJy4vYmFzZS1lbnRpdHknO1xuZXhwb3J0IHsgTU9ERUxfUFJFRklYRVMsIFNBVkVfU1RBVEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0aXNBcnJheSxcblx0aXNJbnRlZ2VyLFxuXHRpc1N0cmluZyxcblx0aXNQbGFpbk9iamVjdCxcblx0aXNCb29sZWFuLFxuXHRpc051bWJlcixcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHNwcmludGYgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcblxuLyoqXG4gKiBJbnRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzRW51bUZpZWxkLCBpc1ByaW1hcnlLZXlGaWVsZCwgaXNWYWx1ZU9iamVjdEZpZWxkIH0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQgeyBtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3RXaXRoQXNzZXJ0aW9ucyB9IGZyb20gJy4vZXh0cmFjdG9ycyc7XG5pbXBvcnQgeyBQUklWQVRFX1BST1BFUlRJRVMsIFZBTElEQVRFX1RZUEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoZSBpbmNvbWluZyB2YWx1ZSBmb3IgZ2l2ZW4gdHlwZS4gIFR5cGVzIGFsbG93ZWQgYXJlOlxuICpcbiAqIC0gaW50ZWdlcjogY2hlY2tzIGlmIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiAtIG51bWJlcjogY2hlY2tzIGlmIHZhbHVlIGlzIGNsYXNzaWZpZWQgYXMgYSBOdW1iZXIgcHJpbWl0aXZlIG9yIG9iamVjdCAodGhpc1xuICogICBtZWFucyBgSW5maW5pdHlgLCBgLUluZmluaXR5YCwgYW5kIGBOYU5gIGFyZSBjb25zaWRlcmVkIHZhbGlkIGZvciB0aGlzIHR5cGVcbiAqIC0gc3RyaW5nXG4gKiAtIG9iamVjdCAtIHRoaXMgdmFsaWRhdGVzIGFzIGEgXCJwbGFpbk9iamVjdFwiLCB0aGF0IGlzIGFuIG9iamVjdCBjcmVhdGVkIGJ5XG4gKiAgIHRoZSBPYmplY3QgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBbW1Byb3RvdHlwZV1dIG9mIG51bGwuXG4gKiAtIGJvb2xlYW5cbiAqIC0gYm9vbDogKHNhbWUgYXMgYm9vbGVhbiBjaGVjaylcbiAqIC0gbnVsbDogdmFsdWUgbXVzdCBleHBsaWNpdGx5IGJlIGBudWxsYFxuICpcbiAqIE5vdGU6IGlmIHRoZSBwYXNzZWQgaW4gdHlwZSBkb2VzIG5vdCBleGlzdCwgdGhlbiB0aGUgdmFsdWUgaXMgY29uc2lkZXJlZFxuICogaW52YWxpZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0gdHlwZSAgVGhlIHR5cGUgb3IgdHlwZXMgdG8gY2hlY2tcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgIFRoZSB2YWx1ZSBiZWluZyB2YWxpZGF0ZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoZSB2YWx1ZSBpcyB2YWxpZCBmb3IgdGhlIGdpdmVuIHR5cGUuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVR5cGUgPSAoIHR5cGUsIHZhbHVlICkgPT4ge1xuXHRsZXQgdmFsaWQgPSBmYWxzZTtcblx0Ly8gYWNjb3VudCBmb3IgdHlwZSBkZWZpbml0aW9ucyB0aGF0IGFyZSBhbiBhcnJheSBvZiBhbGxvd2VkIHR5cGVzLlxuXHRpZiAoIGlzQXJyYXkoIHR5cGUgKSApIHtcblx0XHRmb3IgKCBjb25zdCBzaW5nbGVUeXBlIG9mIHR5cGUgKSB7XG5cdFx0XHR2YWxpZCA9IHZhbGlkYXRlVHlwZSggc2luZ2xlVHlwZSwgdmFsdWUgKTtcblx0XHRcdGlmICggdmFsaWQgKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyByZXR1cm4gcmlnaHQgYXdheSBiZWNhdXNlIHdlJ3ZlIGRldGVybWluZWQgdGhlIHZhbGlkaXR5IG9mIHRoZSB0eXBlLlxuXHRcdHJldHVybiB2YWxpZDtcblx0fVxuXHRzd2l0Y2ggKCB0eXBlICkge1xuXHRcdGNhc2UgJ2ludGVnZXInOlxuXHRcdFx0dmFsaWQgPSBpc0ludGVnZXIoIHZhbHVlICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdudW1iZXInOlxuXHRcdFx0dmFsaWQgPSBpc051bWJlciggdmFsdWUgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHR2YWxpZCA9IGlzU3RyaW5nKCB2YWx1ZSApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdHZhbGlkID0gaXNQbGFpbk9iamVjdCggdmFsdWUgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2Jvb2xlYW4nOlxuXHRcdGNhc2UgJ2Jvb2wnOlxuXHRcdFx0dmFsaWQgPSBpc0Jvb2xlYW4oIHZhbHVlICk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdudWxsJzpcblx0XHRcdHZhbGlkID0gdmFsdWUgPT09IG51bGw7XG5cdFx0XHRicmVhaztcblx0fVxuXHRyZXR1cm4gdmFsaWQ7XG59O1xuXG4vKipcbiAqIFRoaXMgdmFsaWRhdGVzIGVudW0gdHlwZSBvZiB2YWx1ZXMuXG4gKlxuICogVGhpcyBtZWFucyB0aGF0IHRoZSB2YWx1ZSBtdXN0IGJlIG9uZSBvZiB0aGUgcHJvdmlkZWQgYXJyYXkgb2YgZW51bVZhbHVlcyBhc1xuICogd2VsbCBhcyBiZWluZyBvZiB0aGUgZXhwZWN0ZWQgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtBcnJheX0gZW51bVZhbHVlc1xuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhpcyB2YWx1ZSBpcyB2YWxpZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRW51bVR5cGUgPSAoIHR5cGUsIGVudW1WYWx1ZXMsIHZhbHVlICkgPT4ge1xuXHRyZXR1cm4gdmFsaWRhdGVUeXBlKCB0eXBlLCB2YWx1ZSApICYmXG5cdFx0aXNBcnJheSggZW51bVZhbHVlcyApICYmXG5cdFx0ZW51bVZhbHVlcy5pbmRleE9mKCB2YWx1ZSApID4gLTE7XG59O1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGRvZXMgYSBzaGFsbG93IHZhbGlkYXRpb24gZm9yIHRoZSBnaXZlbiB2YWx1ZSBhbmQgZmllbGQuXG4gKlxuICogXCJTaGFsbG93XCIgaGVyZSBtZWFucyB0aGF0IGlmIHRoZSBmaWVsZCBzY2hlbWEgaXMgb2YgdHlwZSAnb2JqZWN0JywgdGhlbiB0aGVcbiAqIHZhbGlkYXRpb24gb25seSB2ZXJpZmllcyB0aGF0IHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuICBUaGUgb2JqZWN0IGNvbnRlbnRzXG4gKiBhcmUgbm90IHZhbGlkYXRlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhwZWN0VmFsdWVPYmplY3RzICBJZiB0cnVlLCB0aGVuIHRoaXMgZmxhZ3MgdGhlIHZhbGlkYXRvclxuICogdG8gYXNzdW1lIHRoZSB2YWx1ZSBtaWdodCBiZSBhIHZhbHVlIG9iamVjdCBhbmQgYXR0ZW1wdCB0byByZXRyaWV2ZSB0aGUgcmF3XG4gKiB2YWx1ZSBmcm9tIHRoYXQgdmFsdWUgb2JqZWN0IGZvciB2YWxpZGF0aW9uIGFnYWluc3QgdGhlIGV4cGVjdGVkIHR5cGUgaW4gdGhlXG4gKiBzY2hlbWEgZm9yIHRoYXQgZmllbGQuXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGUgdmFsdWUgaXMgdmFsaWQuXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICogQHRocm93cyBJbnZhbGlkRGF0ZVRpbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2hhbGxvd1ZhbGlkVmFsdWVGb3JGaWVsZCA9IChcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRzY2hlbWEsXG5cdGV4cGVjdFZhbHVlT2JqZWN0cyA9IHRydWVcbikgPT4ge1xuXHQvLyBpZiBmaWVsZCBpcyBhIHByaW1hcnkgS2V5IGZpZWxkIHRoZW4gd2Ugb3ZlcnJpZGUgdGhlIHZhbGlkYXRpb24gc28gaXQgY2FuXG5cdC8vIGJlIGVpdGhlciBzdHJpbmcgb3IgbnVtYmVyXG5cdGlmICggaXNQcmltYXJ5S2V5RmllbGQoIGZpZWxkTmFtZSwgc2NoZW1hICkgKSB7XG5cdFx0cmV0dXJuIHZhbGlkYXRlVHlwZSggJ3N0cmluZycsIGZpZWxkVmFsdWUgKSB8fFxuXHRcdFx0dmFsaWRhdGVUeXBlKCAnbnVtYmVyJywgZmllbGRWYWx1ZSApO1xuXHR9XG5cdGNvbnN0IGlzRW51bSA9IGlzRW51bUZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApO1xuXHRjb25zdCBpc1ZhbHVlT2JqZWN0ID0gaXNWYWx1ZU9iamVjdEZpZWxkKCBmaWVsZE5hbWUsIHNjaGVtYSApO1xuXHRmaWVsZFZhbHVlID0gZXhwZWN0VmFsdWVPYmplY3RzICYmIGlzVmFsdWVPYmplY3QgP1xuXHRcdG1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdFdpdGhBc3NlcnRpb25zKFxuXHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdHNjaGVtYVxuXHRcdCkgOlxuXHRcdGZpZWxkVmFsdWU7XG5cdGZpZWxkVmFsdWUgPSBleHBlY3RWYWx1ZU9iamVjdHMgJiZcblx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0udHlwZSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdGlzVmFsdWVPYmplY3QgP1xuXHRcdHsgcmF3OiBmaWVsZFZhbHVlIH0gOlxuXHRcdGZpZWxkVmFsdWU7XG5cdGNvbnN0IGlzVmFsaWQgPSBpc0VudW0gP1xuXHRcdHZhbGlkYXRlRW51bVR5cGUoXG5cdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUsXG5cdFx0XHRzY2hlbWFbIGZpZWxkTmFtZSBdLmVudW0sXG5cdFx0XHRmaWVsZFZhbHVlXG5cdFx0KSA6XG5cdFx0dmFsaWRhdGVUeXBlKCBzY2hlbWFbIGZpZWxkTmFtZSBdLnR5cGUsIGZpZWxkVmFsdWUgKTtcblx0Ly8gaWYgaXNFbnVtIGFuZCBub3QgdmFsaWQsIHRoZW4gbGV0cyBiYWlsIHdpdGggZXJyb3Jcblx0aWYgKCBpc0VudW0gJiYgISBpc1ZhbGlkICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHQnVGhlIGdpdmVuIFwiJXNcIiBmaWVsZE5hbWUgaXMgbm90IHZhbGlkIGZvciB0aGUgZGVmaW5lZCBzY2hlbWEuICBJdCBtdXN0IGJlIGEgXCIlc1wiIGFuZCBpdCBtdXN0IGJlIG9uZSBvZiBcIiVzXCIuIFRoZSBmaWVsZFZhbHVlIGdpdmVuIHdhcyBcIiVzXCInLFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdHNjaGVtYVsgZmllbGROYW1lIF0uZW51bS5qb2luKCksXG5cdFx0XHRcdGZpZWxkVmFsdWVcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cdHJldHVybiBpc1ZhbGlkO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoYXQgaXMgc2V0IGFzIHRoZSB2YWxpZGF0ZVR5cGUgZm9yIHRoZSBnaXZlbiBmaWVsZCBhbmQgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB2YWxpZGF0aW9uIHR5cGUgZm9yIHRoZSBnaXZlbiBmaWVsZCBhbmQgaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVR5cGVGb3JGaWVsZCA9ICggZmllbGROYW1lLCBpbnN0YW5jZSApID0+IHtcblx0cmV0dXJuIGluc3RhbmNlWyBQUklWQVRFX1BST1BFUlRJRVMuVkFMSURBVEVfVFlQRVMgXVsgZmllbGROYW1lIF0gP1xuXHRcdGluc3RhbmNlWyBQUklWQVRFX1BST1BFUlRJRVMuVkFMSURBVEVfVFlQRVMgXVsgZmllbGROYW1lIF0gOlxuXHRcdFZBTElEQVRFX1RZUEUuUkFXO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRVMgPSB7XG5cdE1PREVMOiAnZXZlbnQnLFxuXHRSRUxBVElPTjogJ2V2ZW50cycsXG59O1xuXG5leHBvcnQgY29uc3QgRVZFTlRfU1RBVFVTX0lEID0ge1xuXHRTT0xEX09VVDogJ3NvbGRfb3V0Jyxcblx0UE9TVFBPTkVEOiAncG9zdHBvbmVkJyxcblx0Q0FOQ0VMTEVEOiAnY2FuY2VsbGVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9TVEFUVVNfSURTID0gdmFsdWVzKCBFVkVOVF9TVEFUVVNfSUQgKTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfREVTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG5cdEdSRUFURVJfVEhBTixcblx0R1JFQVRFUl9USEFOX0FORF9FUVVBTCxcblx0TEVTU19USEFOX0FORF9FUVVBTCxcbn0gZnJvbSAnLi4vYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBub3dEYXRlQW5kVGltZSA9IG1vbWVudCgpO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0XHQnRVZUX25hbWUnLFxuXHRcdFx0J0VWVF9JRCcsXG5cdFx0XHQnc3RhcnRfZGF0ZScsXG5cdFx0XHQnZW5kX2RhdGUnLFxuXHRcdFx0J3RpY2tldF9zdGFydCcsXG5cdFx0XHQndGlja2V0X2VuZCcsXG5cdFx0XSApLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoIEFMTE9XRURfT1JERVJfVkFMVUVTICksXG5cdFx0c2hvd0V4cGlyZWQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdGNhdGVnb3J5U2x1ZzogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRtb250aDogUHJvcFR5cGVzLm1vbnRoLFxuXHR9ICksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0XHRzaG93RXhwaXJlZDogYm9vbGVhblxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDEwMCxcblx0XHRvcmRlckJ5OiAnc3RhcnRfZGF0ZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdFx0c2hvd0V4cGlyZWQ6IGZhbHNlLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGFuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHRzdGFydF9kYXRlOiAnRGF0ZXRpbWUuRFRUX0VWVF9zdGFydCcsXG5cdFx0ZW5kX2RhdGU6ICdEYXRldGltZS5EVFRfRVZUX2VuZCcsXG5cdFx0dGlja2V0X3N0YXJ0OiAnRGF0ZXRpbWUuVGlja2V0LlRLVF9zdGFydF9kYXRlJyxcblx0XHR0aWNrZXRfZW5kOiAnRGF0ZXRpbWUuVGlja2V0LlRLVF9lbmRfZGF0ZScsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIGV2ZW50cyBlbmRwb2ludCByZXF1ZXN0IHVzaW5nIHByb3ZpZGVkXG4gKiBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3dFeHBpcmVkICBXaGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIGV4cGlyZWQgZXZlbnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IGNhdGVnb3J5U2x1ZyAgUmV0dXJuIGV2ZW50cyBmb3IgdGhlIGdpdmVuIGNhdGVnb3J5U2x1Z1xuICogQHBhcmFtIHtzdHJpbmd9IG1vbnRoICAgICAgICAgUmV0dXJuIGV2ZW50cyBmb3IgdGhlIGdpdmVuIG1vbnRoLlxuICogXHRcdFx0XHRcdFx0XHRcdCBDYW4gYmUgYW55IG1vbnRoIGZvcm1hdCByZWNvZ25pemVkIGJ5IG1vbWVudC5cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgIFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICgge1xuXHRzaG93RXhwaXJlZCA9IGZhbHNlLFxuXHRjYXRlZ29yeVNsdWcsXG5cdG1vbnRoID0gJ25vbmUnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblxuXHRpZiAoICEgc2hvd0V4cGlyZWQgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEYXRldGltZS5EVFRfRVZUX2VuZCoqZXhwaXJlZF1bXT0nICsgR1JFQVRFUl9USEFOICtcblx0XHRcdCcmd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9lbmQqKmV4cGlyZWRdW109JyArXG5cdFx0XHRub3dEYXRlQW5kVGltZS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRpZiAoIGNhdGVnb3J5U2x1ZyApIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW1Rlcm1fUmVsYXRpb25zaGlwLlRlcm1fVGF4b25vbXkuVGVybS5zbHVnXT0nICsgY2F0ZWdvcnlTbHVnXG5cdFx0KTtcblx0fVxuXHRpZiAoIG1vbnRoICYmIG1vbnRoICE9PSAnbm9uZScgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEYXRldGltZS5EVFRfRVZUX3N0YXJ0XVtdPScgKyBHUkVBVEVSX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9zdGFydF1bXT0nICtcblx0XHRcdG1vbWVudCgpLm1vbnRoKCBtb250aCApLnN0YXJ0T2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RhdGV0aW1lLkRUVF9FVlRfZW5kXVtdPScgKyBMRVNTX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9lbmRdW109JyArXG5cdFx0XHRtb21lbnQoKS5tb250aCggbW9udGggKS5lbmRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCAnJicgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKCBxdWVyeURhdGEgPSB7fSApID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcoIHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5ICk7XG59O1xuIiwiZXhwb3J0ICogZnJvbSAnLi9hc3NlcnRpb25zJztcbmV4cG9ydCAqIGZyb20gJy4vYmFzZSc7XG5leHBvcnQgKiBmcm9tICcuL2RlZmF1bHQtbW9kZWwtc3RhdGUnO1xuZXhwb3J0ICogZnJvbSAnLi9lbmRwb2ludHMnO1xuZXhwb3J0ICogZnJvbSAnLi9lbnRpdHktZmFjdG9yeSc7XG5leHBvcnQgKiBmcm9tICcuL3ByaW1hcnkta2V5cyc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVsLW5hbWVzJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzJztcbiIsIi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBwcmltYXJ5S2V5cyB9IGZyb20gJy4vcHJpbWFyeS1rZXlzLmpzJztcblxuLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGtleXMsIHN0YXJ0Q2FzZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcGx1cmFsaXplIGZyb20gJ3BsdXJhbGl6ZSc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdtZW1pemUnO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgbW9kZWwgbmFtZXMgY3VycmVudGx5IGV4cG9zZWQgZm9yIFJFU1QgQVBJIHJlcXVlc3QuXG4gKi9cbmV4cG9ydCBjb25zdCBNT0RFTF9OQU1FUyA9IGtleXMoIHByaW1hcnlLZXlzICk7XG5cbi8qKlxuICogVXNlZCB0byBub3JtYWxpemUgdGhlIHBsdXJhbCBmb3JtIG9mIGEgZ2l2ZW4gbW9kZWwgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICBFbnN1cmVzIHRoZSBnaXZlbiBtb2RlbE5hbWUgaXMgaXRzIHBsdXJhbCBmb3JtLlxuICovXG5leHBvcnQgY29uc3QgcGx1cmFsTW9kZWxOYW1lID0gbWVtb2l6ZShcblx0KCBtb2RlbE5hbWUgKSA9PiBwbHVyYWxpemUoIG1vZGVsTmFtZSApXG4pO1xuXG4vKipcbiAqIFVzZWQgdG8gbm9ybWFsaXplIHRoZSBzaW5ndWxhciBmb3JtIG9mIGEgZ2l2ZW4gbW9kZWwgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEVuc3VyZXMgdGhlIGdpdmVuIG1vZGVsTmFtZSBpcyBpbiBpdHMgc2luZ3VsYXIgZm9ybS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNpbmd1bGFyTW9kZWxOYW1lID0gbWVtb2l6ZShcblx0KCBtb2RlbE5hbWUgKSA9PiBwbHVyYWxpemUuc2luZ3VsYXIoIG1vZGVsTmFtZSApXG4pO1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBjYXBpdGFsaXplZCBTbmFrZV9DYXNlIGZvcm1hdCBmb3IgdGhlIGdpdmVuIG1vZGVsIG5hbWVcbiAqIHR5cGljYWxseSB1c2VkIGluIHF1ZXJ5IHN0cmluZ3MuXG4gKlxuICogRXhhbXBsZTpcbiAqIG1vZGVsTmFtZUZvclF1ZXJ5U3RyaW5nKCAnbWVzc2FnZV90ZW1wbGF0ZV9ncm91cCcgKTtcbiAqIC8vIE1lc3NhZ2VfVGVtcGxhdGVfR3JvdXBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBmb3JtYXR0ZWQgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgbW9kZWxOYW1lRm9yUXVlcnlTdHJpbmcgPSBtZW1vaXplKFxuXHQoIG1vZGVsTmFtZSApID0+IHtcblx0XHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdFx0bW9kZWxOYW1lID0gc3RhcnRDYXNlKCBtb2RlbE5hbWUgKTtcblx0XHRyZXR1cm4gbW9kZWxOYW1lLnJlcGxhY2UoIC9cXHMvZywgJ18nICk7XG5cdH1cbik7XG4iLCJpbXBvcnQgKiBhcyBhdHRlbmRlZU1vZGVsIGZyb20gJy4vYXR0ZW5kZWUnO1xuaW1wb3J0ICogYXMgY2hlY2tJbk1vZGVsIGZyb20gJy4vY2hlY2tpbic7XG5pbXBvcnQgKiBhcyBkYXRlVGltZU1vZGVsIGZyb20gJy4vZGF0ZXRpbWUnO1xuaW1wb3J0ICogYXMgZXZlbnRNb2RlbCBmcm9tICcuL2V2ZW50JztcbmltcG9ydCAqIGFzIHByaWNlVHlwZU1vZGVsIGZyb20gJy4vcHJpY2UtdHlwZSc7XG5pbXBvcnQgKiBhcyByZWdpc3RyYXRpb25Nb2RlbCBmcm9tICcuL3JlZ2lzdHJhdGlvbic7XG5pbXBvcnQgKiBhcyBzdGF0dXNNb2RlbCBmcm9tICcuL3N0YXR1cyc7XG5pbXBvcnQgKiBhcyB0aWNrZXRNb2RlbCBmcm9tICcuL3RpY2tldCc7XG5leHBvcnQge1xuXHRhdHRlbmRlZU1vZGVsLFxuXHRjaGVja0luTW9kZWwsXG5cdGRhdGVUaW1lTW9kZWwsXG5cdGV2ZW50TW9kZWwsXG5cdHByaWNlVHlwZU1vZGVsLFxuXHRyZWdpc3RyYXRpb25Nb2RlbCxcblx0c3RhdHVzTW9kZWwsXG5cdHRpY2tldE1vZGVsLFxufTtcbiIsImV4cG9ydCBjb25zdCBNT0RFTF9OQU1FUyA9IHtcblx0TU9ERUw6ICdwcmljZV90eXBlJyxcblx0UkVMQVRJT046ICdwcmljZV90eXBlcycsXG59O1xuXG5leHBvcnQgY29uc3QgQkFTRV9QUklDRV9UWVBFUyA9IHtcblx0QkFTRV9QUklDRTogMSxcblx0RElTQ09VTlQ6IDIsXG5cdFNVUkNIQVJHRTogMyxcblx0VEFYOiA0LFxufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNBcnJheSwgcmVkdWNlLCB0cmltRW5kIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ21lbWl6ZSc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRhc3NlcnRFbnRpdHlIYXNLZXksXG5cdGFzc2VydElzQXJyYXksXG5cdGFzc2VydElzTm90RW1wdHksXG5cdGFzc2VydElzTWFwLFxufSBmcm9tICcuL2Fzc2VydGlvbnMnO1xuXG4vKipcbiAqIEV4cG9zZXMgYSBtYXAgb2YgbW9kZWxuYW1lIHRvIHByaW1hcnkga2V5IGV4cG9zZWQgYnkgdGhlIGVlanMuZGF0YSBnbG9iYWxcbiAqIHZpYSB0aGUgc2VydmVyLlxuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0IGNvbnN0IHsgcHJpbWFyeV9rZXlzOiBwcmltYXJ5S2V5cyA9IHt9IH0gPSBkYXRhLnBhdGhzO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlcyBmb3IgdGhlIGdpdmVuIGtleXMgZnJvbSB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogVGhpcyBmdW5jdGlvbiB3b3VsZCBiZSB1c2VkIGZvciBtb2RlbHMgdGhhdCBoYXZlIGNvbWJpbmVkIHByaW1hcnkga2V5c1xuICogKGRlbGl2ZXJlZCBhcyBhbiBhcnJheSkuXG4gKlxuICogQHR5cGUgeyBtZW1vaXplZCB9XG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBmb3IgdGhlIHZhbHVlcy5cbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgdmFsdWVzRm9yQ29tYmluZWRQcmltYXJ5S2V5cyA9IG1lbW9pemUoICgga2V5cywgZW50aXR5ICkgPT4ge1xuXHRhc3NlcnRJc0FycmF5KCBrZXlzICk7XG5cdGNvbnN0IHByaW1hcnlLZXkgPSByZWR1Y2UoIGtleXMsIGZ1bmN0aW9uKCByZXN1bHQsIGtleSApIHtcblx0XHRhc3NlcnRFbnRpdHlIYXNLZXkoIGtleSwgZW50aXR5ICk7XG5cdFx0cmV0dXJuIGVudGl0eVsgcmVzdWx0IF0gKyAnOicgKyBlbnRpdHlbIGtleSBdO1xuXHR9ICk7XG5cdHJldHVybiB0cmltRW5kKCBwcmltYXJ5S2V5LCAnOicgKTtcbn0gKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBmb3IgdGhlIGdpdmVuIGtleSBmcm9tIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKiBUaGlzIGZ1bmN0aW9uIHdvdWxkIGJlIHVzZWQgZm9yIG1vZGVscyB0aGF0IGhhdmUgb25seSBvbmUgcHJpbWFyeSBrZXkuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7IGZ1bmN0aW9uIH0gVGhlIHZhbHVlIGZvciB0aGUga2V5IGluIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbHVlRm9yUHJpbWFyeUtleSA9IG1lbW9pemUoICgga2V5LCBlbnRpdHkgKSA9PiB7XG5cdGFzc2VydEVudGl0eUhhc0tleSgga2V5LCBlbnRpdHkgKTtcblx0cmV0dXJuIGVudGl0eVsga2V5IF07XG59ICk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcHJpbWFyeSBrZXkgKG9yIGNvbWJpbmVkIHByaW1hcnkga2V5cykgZnJvbSB0aGUgYXZhaWxhYmxlIGRhdGEuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7IGZ1bmN0aW9uKHN0cmluZykgfVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmltYXJ5S2V5ID0gbWVtb2l6ZSggKCBtb2RlbE5hbWUgKSA9PiB7XG5cdGFzc2VydEVudGl0eUhhc0tleSggbW9kZWxOYW1lLCBwcmltYXJ5S2V5cyApO1xuXHRyZXR1cm4gcHJpbWFyeUtleXNbIG1vZGVsTmFtZSBdO1xufSApO1xuXG4vKipcbiAqIFJldHVybnMgYSBxdWVyeSBzdHJpbmcgZm9yIGdldHRpbmcgdGhlIGVudGl0aWVzIGJlbG9uZ2luZyB0byBhIG1vZGVsIGZvciB0aGVcbiAqIGdpdmVuIHByaW1hcnkga2V5IHZhbHVlc1xuICpcbiAqIEB0eXBlIHttZW1vaXplZH1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFByaW1hcnlLZXlRdWVyeVN0cmluZyA9IG1lbW9pemUoXG5cdCggbW9kZWxOYW1lLCBrZXlWYWx1ZXMgPSBbXSApID0+IHtcblx0XHRjb25zdCBwcmltYXJ5S2V5ID0gZ2V0UHJpbWFyeUtleSggbW9kZWxOYW1lICk7XG5cdFx0cmV0dXJuIGBbJHsgcHJpbWFyeUtleSB9XVtJTl09YCArIGtleVZhbHVlcy5qb2luKCk7XG5cdH1cbik7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWVzIGZvciB0aGUgcHJpbWFyeSBrZXlzIGZyb20gdGhlIHByb3ZpZGVkIGVudGl0eS5cbiAqXG4gKiBAdHlwZSB7bWVtb2l6ZWR9XG4gKiBAcmV0dXJuIHsgZnVuY3Rpb24gfSAgSWYgdGhlIG1vZGVsIGhhcyBvbmx5IG9uZSBwcmltYXJ5IGtleSB0aGVuIHRoZSB2YWx1ZSB3aWxsXG4gKiBiZSBhIHNpbXBsZSBzdHJpbmcuICBJZiB0aGUgbW9kZWwgaGFzIGNvbWJpbmVkIHByaW1hcnkga2V5cywgdGhlbiB0aGUgdmFsdWVcbiAqIHdpbGwgYmUgYXMgc3RyaW5nIGluIHRoZSBmb3JtYXQgYCVzLiVzYCBmb3IgdGhlIHByaW1hcnkga2V5IHZhbHVlcy5cbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgZ2V0RW50aXR5UHJpbWFyeUtleVZhbHVlcyA9IG1lbW9pemUoICggbW9kZWxOYW1lLCBlbnRpdHkgKSA9PiB7XG5cdGNvbnN0IGtleXMgPSBnZXRQcmltYXJ5S2V5KCBtb2RlbE5hbWUgKTtcblx0cmV0dXJuIGlzQXJyYXkoIGtleXMgKSA/XG5cdFx0dmFsdWVzRm9yQ29tYmluZWRQcmltYXJ5S2V5cygga2V5cywgZW50aXR5ICkgOlxuXHRcdHZhbHVlRm9yUHJpbWFyeUtleSgga2V5cywgZW50aXR5ICk7XG59ICk7XG5cbi8qKlxuICogVGhpcyByZWNlaXZlcyBhbiBhcnJheSBvZiBlbnRpdGllcyBhbmQgcmV0dXJucyBhIGNvbGxlY3Rpb24gb2YgdGhvc2Ugc2FtZVxuICogZW50aXRpZXMgaW5kZXhlZCBieSB0aGUgcHJpbWFyeSBrZXkgdmFsdWUgZm9yIGVhY2ggZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7QXJyYXl9IGVudGl0aWVzXG4gKiBAcmV0dXJuIHtNYXB9ICBBIGNvbGxlY3Rpb24gaW5kZXhlZCBieSB0aGUgcHJpbWFyeSBrZXkgdmFsdWVzIGZvciBlYWNoIGVudGl0eS5cbiAqIEB0aHJvd3Mge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGtleUVudGl0aWVzQnlQcmltYXJ5S2V5VmFsdWUgPSAoIG1vZGVsTmFtZSwgZW50aXRpZXMgPSBbXSApID0+IHtcblx0YXNzZXJ0SXNOb3RFbXB0eShcblx0XHRlbnRpdGllcyxcblx0XHRfXyhcblx0XHRcdCdUaGUgcHJvdmlkZWQgYXJyYXkgb2YgZW50aXRpZXMgbXVzdCBub3QgYmUgZW1wdHknLFxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0XHQpXG5cdCk7XG5cdGFzc2VydElzQXJyYXkoIGVudGl0aWVzICk7XG5cblx0Y29uc3QgbWFwcGVkRW50aXRpZXMgPSBuZXcgTWFwKCk7XG5cdGVudGl0aWVzLmZvckVhY2goICggZW50aXR5ICkgPT4ge1xuXHRcdG1hcHBlZEVudGl0aWVzLnNldChcblx0XHRcdGdldEVudGl0eVByaW1hcnlLZXlWYWx1ZXMoIG1vZGVsTmFtZSwgZW50aXR5ICksXG5cdFx0XHRlbnRpdHlcblx0XHQpO1xuXHR9ICk7XG5cdHJldHVybiBtYXBwZWRFbnRpdGllcztcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBlbnRpdHkgaW5zdGFuY2VzIHVzaW5nIHRoZSBnaXZlbiBmYWN0b3J5IGFuZCBhcnJheVxuICogb2YgZW50aXR5IHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZmFjdG9yeVxuICogQHBhcmFtIHtNYXB9IGVudGl0aWVzXG4gKiBAcmV0dXJuIHtNYXB9ICBBbiBhcnJheSBvZiBlbnRpdHkgaW5zdGFuY2VzIGluZGV4ZWQgYnlcbiAqIHRoZWlyIHByaW1hcnkga2V5IHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBbmRLZXlFbnRpdGllc0J5UHJpbWFyeUtleVZhbHVlID0gKFxuXHRmYWN0b3J5LFxuXHRlbnRpdGllcyxcbikgPT4ge1xuXHRhc3NlcnRJc01hcChcblx0XHRlbnRpdGllcyxcblx0XHRfXyhcblx0XHRcdCdUaGUgcHJvdmlkZWQgb2JqZWN0IG9mIGVudGl0aWVzIG11c3QgYmUgYSBNYXAgb2JqZWN0Jyxcblx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0KVxuXHQpO1xuXHRlbnRpdGllcy5mb3JFYWNoKCAoIGVudGl0eSwgZW50aXR5SWQgKSA9PiB7XG5cdFx0ZW50aXRpZXMuc2V0KCBlbnRpdHlJZCwgZmFjdG9yeS5mcm9tRXhpc3RpbmcoIGVudGl0eSApICk7XG5cdH0gKTtcblx0cmV0dXJuIGVudGl0aWVzO1xufTtcbiIsIi8qKlxuICogSW50ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgKiBhcyBzdGF0dXNNb2RlbCBmcm9tICcuLi9zdGF0dXMvY29uc3RhbnRzJztcblxuLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBNT0RFTF9OQU1FUyA9IHtcblx0TU9ERUw6ICdyZWdpc3RyYXRpb24nLFxuXHRSRUxBVElPTjogJ3JlZ2lzdHJhdGlvbnMnLFxufTtcblxuZXhwb3J0IGNvbnN0IFJFR0lTVFJBVElPTl9TVEFUVVNfSURTID0gdmFsdWVzKFxuXHRzdGF0dXNNb2RlbC5SRUdJU1RSQVRJT05fU1RBVFVTX0lEXG4pO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNVbmRlZmluZWQsIHZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcbn0gZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgKiBhcyBzdGF0dXNNb2RlbCBmcm9tICcuLi9zdGF0dXMvY29uc3RhbnRzJztcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRmb3JFdmVudElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JBdHRlbmRlZUlkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JUcmFuc2FjdGlvbklkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JUaWNrZXRJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yU3RhdHVzSWQ6IFByb3BUeXBlcy5vbmVPZiggdmFsdWVzKCBzdGF0dXNNb2RlbC5SRUdJU1RSQVRJT05fU1RBVFVTX0lEICkgKSxcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoIHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoIFtcblx0XHRcdCdSRUdfSUQnLFxuXHRcdFx0J1JFR19kYXRlJyxcblx0XHRdICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0fSApLFxufTtcblxuZXhwb3J0IGNvbnN0IG9wdGlvbnNFbnRpdHlNYXAgPSB7XG5cdGRlZmF1bHQ6IHtcblx0XHR2YWx1ZTogJ1JFR19JRCcsXG5cdFx0bGFiZWw6ICdSRUdfY29kZScsXG5cdH0sXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdyZWdfZGF0ZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYSByZWdpc3RyYXRpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKCBvcmRlckJ5ICkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHJlZ19pZDogJ1JFR19JRCcsXG5cdFx0cmVnX2RhdGU6ICdSRUdfZGF0ZScsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIHJlZ2lzdHJhdGlvbnMgZW5kcG9pbnQgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICAgIFx0SUQgb2YgRXZlbnQgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JBdHRlbmRlZUlkICAgIElEIG9mIEF0dGVuZGVlIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yVHJhbnNhY3Rpb25JZCBJRCBvZiBUcmFuc2FjdGlvbiB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvclRpY2tldElkIFx0XHRJRCBvZiBUaWNrZXQgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JTdGF0dXNJZCBcdFx0SUQgb2YgU3RhdHVzIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgIFx0VGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7XG5cdGZvckV2ZW50SWQgPSAwLFxuXHRmb3JBdHRlbmRlZUlkID0gMCxcblx0Zm9yVHJhbnNhY3Rpb25JZCA9IDAsXG5cdGZvclRpY2tldElkID0gMCxcblx0Zm9yU3RhdHVzSWQgPSAnJyxcbn0gKSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cdGZvckV2ZW50SWQgPSBwYXJzZUludCggZm9yRXZlbnRJZCwgMTAgKTtcblx0aWYgKCBmb3JFdmVudElkICE9PSAwICYmICEgaXNOYU4oIGZvckV2ZW50SWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbRVZUX0lEXT0nICsgZm9yRXZlbnRJZCApO1xuXHR9XG5cdGZvckF0dGVuZGVlSWQgPSBwYXJzZUludCggZm9yQXR0ZW5kZWVJZCwgMTAgKTtcblx0aWYgKCBmb3JBdHRlbmRlZUlkICE9PSAwICYmICEgaXNOYU4oIGZvckF0dGVuZGVlSWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbQVRUX0lEXT0nICsgZm9yQXR0ZW5kZWVJZCApO1xuXHR9XG5cdGZvclRyYW5zYWN0aW9uSWQgPSBwYXJzZUludCggZm9yVHJhbnNhY3Rpb25JZCwgMTAgKTtcblx0aWYgKCBmb3JUcmFuc2FjdGlvbklkICE9PSAwICYmICEgaXNOYU4oIGZvclRyYW5zYWN0aW9uSWQgKSApIHtcblx0XHR3aGVyZS5wdXNoKCAnd2hlcmVbVFhOX0lEXT0nICsgZm9yVHJhbnNhY3Rpb25JZCApO1xuXHR9XG5cdGZvclRpY2tldElkID0gcGFyc2VJbnQoIGZvclRpY2tldElkLCAxMCApO1xuXHRpZiAoIGZvclRpY2tldElkICE9PSAwICYmICEgaXNOYU4oIGZvclRpY2tldElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1RLVF9JRF09JyArIGZvclRpY2tldElkICk7XG5cdH1cblx0aWYgKCBmb3JTdGF0dXNJZCAhPT0gJycgJiYgZm9yU3RhdHVzSWQgIT09IG51bGwgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW1NUU19JRF09JyArIGZvclN0YXR1c0lkICk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oICcmJyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoIHF1ZXJ5RGF0YSA9IHt9ICkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkgKTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUVTID0ge1xuXHRNT0RFTDogJ3N0YXR1cycsXG5cdFJFTEFUSU9OOiAnc3RhdHVzZXMnLFxufTtcblxuLy8gdHlwZXNcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9FTUFJTCA9ICdlbWFpbCc7XG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfRVZFTlQgPSAnZXZlbnQnO1xuZXhwb3J0IGNvbnN0IFNUQVRVU19UWVBFX01FU1NBR0UgPSAnbWVzc2FnZSc7XG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfUEFZTUVOVCA9ICdwYXltZW50JztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9SRUdJU1RSQVRJT04gPSAncmVnaXN0cmF0aW9uJztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9UUkFOU0FDVElPTiA9ICd0cmFuc2FjdGlvbic7XG4vLyBlbWFpbFxuZXhwb3J0IGNvbnN0IEVNQUlMX1NUQVRVU19JRCA9IHtcblx0RFJBRlQ6ICdFRFInLFxuXHRTRU5UOiAnRVNOJyxcblx0RVhQSVJFRDogJ0VYUCcsXG59O1xuLy8gbWVzc2FnZVxuZXhwb3J0IGNvbnN0IE1FU1NBR0VfU1RBVFVTX0lEID0ge1xuXHRERUJVRzogJ01ETycsXG5cdEVYRUNVVElORzogJ01FWCcsXG5cdEZBSUw6ICdNRkwnLFxuXHRJTkNPTVBMRVRFOiAnTUlDJyxcblx0SURMRTogJ01JRCcsXG5cdFJFU0VORDogJ01SUycsXG5cdFJFVFJZOiAnTVJUJyxcblx0U0VOVDogJ01TTicsXG59O1xuLy8gcGF5bWVudFxuZXhwb3J0IGNvbnN0IFBBWU1FTlRfU1RBVFVTX0lEID0ge1xuXHRBUFBST1ZFRDogJ1BBUCcsXG5cdENBTkNFTExFRDogJ1BDTicsXG5cdERFQ0xJTkVEOiAnUERDJyxcblx0RkFJTEVEOiAnUEZMJyxcblx0UEVORElORzogJ1BQTicsXG59O1xuLy8gcmVnaXN0cmF0aW9uXG5leHBvcnQgY29uc3QgUkVHSVNUUkFUSU9OX1NUQVRVU19JRCA9IHtcblx0QVBQUk9WRUQ6ICdSQVAnLFxuXHRDQU5DRUxMRUQ6ICdSQ04nLFxuXHRERUNMSU5FRDogJ1JEQycsXG5cdElOQ09NUExFVEU6ICdSSUMnLFxuXHROT1RfQVBQUk9WRUQ6ICdSTkEnLFxuXHRQRU5ESU5HX1BBWU1FTlQ6ICdSUFAnLFxuXHRXQUlUX0xJU1Q6ICdSV0wnLFxufTtcbi8vIHRyYW5zYWN0aW9uXG5leHBvcnQgY29uc3QgVFJBTlNBQ1RJT05fU1RBVFVTX0lEID0ge1xuXHRBQkFORE9ORUQ6ICdUQUInLFxuXHRDT01QTEVURTogJ1RDTScsXG5cdEZBSUxFRDogJ1RGTCcsXG5cdElOQ09NUExFVEU6ICdUSU4nLFxuXHRPVkVSUEFJRDogJ1RPUCcsXG59O1xuXG4vLyB0aGUgZm9sbG93aW5nIGFyZSBub3QgaW4gdGhlIHN0YXR1cyBkYXRhYmFzZSBidXQgYXJlIGtlcHQgaGVyZSBmb3Jcbi8vIGNvbnZlbmllbmNlXG5cbi8vIGN1c3RvbSBwb3N0IHR5cGVzXG5leHBvcnQgY29uc3QgQ1BUX1NUQVRVU19JRCA9IHtcblx0UFVCTElTSDogJ3B1Ymxpc2gnLFxuXHRGVVRVUkU6ICdmdXR1cmUnLFxuXHREUkFGVDogJ2RyYWZ0Jyxcblx0UEVORElORzogJ3BlbmRpbmcnLFxuXHRQUklWQVRFOiAncHJpdmF0ZScsXG5cdFRSQVNIRUQ6ICd0cmFzaCcsXG59O1xuXG5leHBvcnQgY29uc3QgVU5LTk9XTl9TVEFUVVNfSUQgPSAndW5rbm93bic7XG5cbmV4cG9ydCBjb25zdCBBTExfU1RBVFVTX0lEUyA9IFtcblx0Li4udmFsdWVzKCBFTUFJTF9TVEFUVVNfSUQgKSxcblx0Li4udmFsdWVzKCBNRVNTQUdFX1NUQVRVU19JRCApLFxuXHQuLi52YWx1ZXMoIFBBWU1FTlRfU1RBVFVTX0lEICksXG5cdC4uLnZhbHVlcyggUkVHSVNUUkFUSU9OX1NUQVRVU19JRCApLFxuXHQuLi52YWx1ZXMoIFRSQU5TQUNUSU9OX1NUQVRVU19JRCApLFxuXHQuLi52YWx1ZXMoIENQVF9TVEFUVVNfSUQgKSxcblx0VU5LTk9XTl9TVEFUVVNfSUQsXG5dO1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCAqIGFzIHN0YXR1cyBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBFVkVOVF9TVEFUVVNfSUQgfSBmcm9tICcuLi9ldmVudCc7XG5pbXBvcnQgeyBUSUNLRVRfU1RBVFVTX0lEIH0gZnJvbSAnLi4vdGlja2V0JztcbmltcG9ydCB7IERBVEVUSU1FX1NUQVRVU19JRCB9IGZyb20gJy4uL2RhdGV0aW1lJztcbmltcG9ydCB7IENIRUNLSU5fU1RBVFVTX0lEIH0gZnJvbSAnLi4vY2hlY2tpbic7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgTGFiZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWx1ZS1vYmplY3RzJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgUmVnaXN0cmF0aW9uIHN0YXR1c2VzXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfUkVHSVNUUkFUSU9OID0ge1xuXHRbIHN0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELlBFTkRJTkdfUEFZTUVOVCBdOiBuZXcgTGFiZWwoXG5cdFx0X18oICdwZW5kaW5nIHBheW1lbnQnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0X18oICdwZW5kaW5nIHBheW1lbnRzJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuQVBQUk9WRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdhcHByb3ZlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELk5PVF9BUFBST1ZFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ25vdCBhcHByb3ZlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELkNBTkNFTExFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2NhbmNlbGxlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELklOQ09NUExFVEUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdpbmNvbXBsZXRlJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuREVDTElORUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdkZWNsaW5lZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELldBSVRfTElTVCBdOiBuZXcgTGFiZWwoXG5cdFx0X18oICd3YWl0IGxpc3QnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0X18oICd3YWl0IGxpc3RzJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgVHJhbnNhY3Rpb24gc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqXG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfVFJBTlNBQ1RJT04gPSB7XG5cdFsgc3RhdHVzLlRSQU5TQUNUSU9OX1NUQVRVU19JRC5PVkVSUEFJRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ292ZXJwYWlkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlRSQU5TQUNUSU9OX1NUQVRVU19JRC5DT01QTEVURSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2NvbXBsZXRlJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlRSQU5TQUNUSU9OX1NUQVRVU19JRC5JTkNPTVBMRVRFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnaW5jb21wbGV0ZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5UUkFOU0FDVElPTl9TVEFUVVNfSUQuRkFJTEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZmFpbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLlRSQU5TQUNUSU9OX1NUQVRVU19JRC5BQkFORE9ORUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdhYmFuZG9uZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBwYXltZW50IHN0YXR1c2VzXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfUEFZTUVOVCA9IHtcblx0WyBzdGF0dXMuUEFZTUVOVF9TVEFUVVNfSUQuQVBQUk9WRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdhY2NlcHRlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5QQVlNRU5UX1NUQVRVU19JRC5QRU5ESU5HIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncGVuZGluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5QQVlNRU5UX1NUQVRVU19JRC5DQU5DRUxMRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdjYW5jZWxsZWQnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdCksXG5cdFsgc3RhdHVzLlBBWU1FTlRfU1RBVFVTX0lELkRFQ0xJTkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnZGVjbGluZWQnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdCksXG5cdFsgc3RhdHVzLlBBWU1FTlRfU1RBVFVTX0lELkZBSUxFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2ZhaWxlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIE1lc3NhZ2Ugc3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9NRVNTQUdFID0ge1xuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5TRU5UIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnc2VudCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5JRExFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncXVldWVkIGZvciBzZW5kaW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELkZBSUwgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdmYWlsZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuREVCVUcgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdkZWJ1ZyBvbmx5JywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELkVYRUNVVElORyBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ21lc3NlbmdlciBpcyBleGVjdXRpbmcnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuUkVTRU5EIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncXVldWVkIGZvciByZXNlbmRpbmcnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuSU5DT01QTEVURSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3F1ZXVlZCBmb3IgZ2VuZXJhdGluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5SRVRSWSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2ZhaWxlZCBzZW5kaW5nLCBjYW4gYmUgcmV0cmllZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIENQVCBzdGF0dXNlc1xuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0NQVCA9IHtcblx0WyBzdGF0dXMuQ1BUX1NUQVRVU19JRC5QVUJMSVNIIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncHVibGlzaGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLkNQVF9TVEFUVVNfSUQuRlVUVVJFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnc2NoZWR1bGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLkNQVF9TVEFUVVNfSUQuRFJBRlQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdkcmFmdCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIHN0YXR1cy5DUFRfU1RBVFVTX0lELlBFTkRJTkcgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdwZW5kaW5nJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgc3RhdHVzLkNQVF9TVEFUVVNfSUQuUFJJVkFURSBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3ByaXZhdGUnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBzdGF0dXMuQ1BUX1NUQVRVU19JRC5UUkFTSEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAndHJhc2hlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLy8gdGhlIGZvbGxvd2luZyBzdGF0dXMgbWFwcyBhcmUgZm9yIG1vZGVsIHN0YXR1c2VzIHRoYXQgYXJlIG5vdCBzYXZlZCBpbiB0aGVcbi8vIHN0YXR1cyB0YWJsZSBidXQgZm9yIGNvbnZlbmllbmNlIGhhdmUgdGhlaXIgbGFiZWxzIHJldHJpZXZhYmxlIHZpYSBoZXJlLlxuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgRXZlbnQgU3RhdHVzZXNcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9FVkVOVCA9IHtcblx0WyBFVkVOVF9TVEFUVVNfSUQuU09MRF9PVVQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdzb2xkIG91dCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIEVWRU5UX1NUQVRVU19JRC5QT1NUUE9ORUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdwb3N0cG9uZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBFVkVOVF9TVEFUVVNfSUQuQ0FOQ0VMTEVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnY2FuY2VsbGVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgVGlja2V0IHN0YXR1c2VzXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfVElDS0VUID0ge1xuXHRbIFRJQ0tFVF9TVEFUVVNfSUQuQVJDSElWRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdhcmNoaXZlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIFRJQ0tFVF9TVEFUVVNfSUQuRVhQSVJFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2V4cGlyZWQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBUSUNLRVRfU1RBVFVTX0lELlNPTERfT1VUIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnc29sZCBvdXQnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBUSUNLRVRfU1RBVFVTX0lELlBFTkRJTkcgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICd1cGNvbWluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIFRJQ0tFVF9TVEFUVVNfSUQuT05TQUxFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnb24gc2FsZScsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIGRhdGV0aW1lIHN0YXR1c2VzXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfREFURVRJTUUgPSB7XG5cdFsgREFURVRJTUVfU1RBVFVTX0lELkNBTkNFTExFRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ2NhbmNlbGxlZCcsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIERBVEVUSU1FX1NUQVRVU19JRC5TT0xEX09VVCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3NvbGQgb3V0JywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgREFURVRJTUVfU1RBVFVTX0lELkVYUElSRUQgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdleHBpcmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgREFURVRJTUVfU1RBVFVTX0lELklOQUNUSVZFIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAnaW5hY3RpdmUnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuVVBDT01JTkcgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICd1cGNvbWluZycsICdldmVudF9lc3ByZXNzbycgKVxuXHQpLFxuXHRbIERBVEVUSU1FX1NUQVRVU19JRC5BQ1RJVkUgXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oICdhY3RpdmUnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBEQVRFVElNRV9TVEFUVVNfSUQuUE9TVFBPTkVEIF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCAncG9zdHBvbmVkJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgY2hlY2tpbiBzdGF0dXNlc1xuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9DSEVDS0lOID0ge1xuXHRbIENIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX0lOIF06IG5ldyBMYWJlbChcblx0XHRfXyggJ2NoZWNrLWluJywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdF9fKCAnY2hlY2staW5zJywgJ2V2ZW50X2VzcHJlc3NvJyApXG5cdCksXG5cdFsgQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfT1VUIF06IG5ldyBMYWJlbChcblx0XHRfXyggJ2NoZWNrLW91dCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRfXyggJ2NoZWNrLW91dHMnLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcblx0WyBDSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9ORVZFUiBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ25ldmVyIGNoZWNrZWQgaW4nLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogQ29tYmluZWQgdHJhbnNsYXRpb24gbWFwIGZvciBhbGwgc3RhdHVzZXMuXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfQUxMID0ge1xuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX1JFR0lTVFJBVElPTixcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9UUkFOU0FDVElPTixcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9QQVlNRU5ULFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX01FU1NBR0UsXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ1BULFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX0VWRU5ULFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX1RJQ0tFVCxcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9EQVRFVElNRSxcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9DSEVDS0lOLFxuXHRbIHN0YXR1cy5VTktOT1dOX1NUQVRVU19JRCBdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXyggJ3Vua25vd24nLCAnZXZlbnRfZXNwcmVzc28nIClcblx0KSxcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcHJldHR5IHN0YXR1cyBsYWJlbCBzdHJpbmcgZm9yIHRoZSBnaXZlbiBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0YXR1c0NvZGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXIgIFdoZXRoZXIgdG8gcmV0dXJuIHRoZSBzaW5ndWxhciBvciBwbHVyYWwgbGFiZWxcbiAqIHZhbHVlXG4gKiBAcGFyYW0geyhzZW50ZW5jZXxsb3dlcnx1cHBlcil9IHNjaGVtYVxuICogQHJldHVybiB7c3RyaW5nfSBSZXR1cm5zIHRoZSBtYXBwZWQgcHJldHR5IGxhYmVsIGZvciB0aGUgZ2l2ZW4gc3RhdHVzIGNvZGUgb3JcbiAqIGEgZm9ybWF0dGVkICd1bmtvd24nIHN0cmluZyBpZiB0aGVyZSBpcyBubyBtYXBwZWQgdmFsdWUgZm9yIHRoZSBnaXZlbiBjb2RlLlxuICovXG5leHBvcnQgY29uc3QgcHJldHR5U3RhdHVzID0gKFxuXHRzdGF0dXNDb2RlLFxuXHRzaW5ndWxhciA9IHRydWUsXG5cdHNjaGVtYSA9IExhYmVsLkZPUk1BVF9TRU5URU5DRV9DQVNFXG4pID0+IHtcblx0cmV0dXJuIFNUQVRVU19UUkFOU0xBVElPTl9NQVBfQUxMWyBzdGF0dXNDb2RlIF0gP1xuXHRcdFNUQVRVU19UUkFOU0xBVElPTl9NQVBfQUxMWyBzdGF0dXNDb2RlIF0uYXNGb3JtYXR0ZWQoIHNpbmd1bGFyLCBzY2hlbWEgKSA6XG5cdFx0U1RBVFVTX1RSQU5TTEFUSU9OX01BUF9BTExbIHN0YXR1cy5VTktOT1dOX1NUQVRVU19JRCBdLmFzRm9ybWF0dGVkKFxuXHRcdFx0c2luZ3VsYXIsXG5cdFx0XHRzY2hlbWFcblx0XHQpO1xufTtcblxuLyoqXG4gKiBFeHBlY3RzIGFuIGFycmF5IG9mIHN0YXR1cyBjb2RlcyBhbmQgcmV0dXJucyBhbiBvYmplY3QgaW5kZXhlZCBieSBjb2RlcyB3aXRoXG4gKiB2YWx1ZXMgYmVpbmcgdGhlIGZvcm1hdHRlZCBwcmV0dHkgbGFiZWxzIGZvciBlYWNoIGNvZGUgYWNjb3JkaW5nIHRvIHRoZVxuICogcHJvdmlkZWQgYXJndW1lbnRzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gc3RhdHVzQ29kZXNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXJcbiAqIEBwYXJhbSB7KHNlbnRlbmNlfGxvd2VyfHVwcGVyKX0gc2NoZW1hXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCBtYXBwaW5nIHN0YXR1cyBjb2RlIHRvIHByZXR0eSBsYWJlbC5cbiAqL1xuZXhwb3J0IGNvbnN0IHByZXR0eVN0YXR1c2VzID0gKFxuXHRzdGF0dXNDb2Rlcyxcblx0c2luZ3VsYXIgPSB0cnVlLFxuXHRzY2hlbWEgPSBMYWJlbC5GT1JNQVRfU0VOVEVOQ0VfQ0FTRVxuKSA9PiB7XG5cdGlmICggISBpc0FycmF5KCBzdGF0dXNDb2RlcyApICkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdFeHBlY3QgaW5jb21pbmcgc3RhdHVzQ29kZXMgYXJndW1lbnQnICtcblx0XHRcdCcgdG8gYmUgYW4gYXJyYXknICk7XG5cdH1cblx0Y29uc3QgbWFwcGVkU3RhdHVzZXMgPSB7fTtcblx0c3RhdHVzQ29kZXMuZm9yRWFjaCggKCBzdGF0dXNDb2RlICkgPT4ge1xuXHRcdG1hcHBlZFN0YXR1c2VzWyBzdGF0dXNDb2RlIF0gPSBwcmV0dHlTdGF0dXMoXG5cdFx0XHRzdGF0dXNDb2RlLFxuXHRcdFx0c2luZ3VsYXIsXG5cdFx0XHRzY2hlbWFcblx0XHQpO1xuXHR9ICk7XG5cdHJldHVybiBtYXBwZWRTdGF0dXNlcztcbn07XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbmV4cG9ydCAqIGZyb20gJy4vaGVscGVycyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9BU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxufSBmcm9tICcuLi9iYXNlJztcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0fSApLFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDI1LFxuXHRcdG9yZGVyQnk6ICdzdGF0dXNDb2RlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfQVNDLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGFuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9ICggb3JkZXJCeSApID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHRzdGF0dXNDb2RlOiAnU1RTX2NvZGUnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQoIG9yZGVyQnlNYXBbIG9yZGVyQnkgXSApID9cblx0XHRvcmRlckJ5IDpcblx0XHRvcmRlckJ5TWFwWyBvcmRlckJ5IF07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiBldmVudHMgZW5kcG9pbnQgcmVxdWVzdCB1c2luZyBwcm92aWRlZFxuICogaW5mb3JtYXRpb24uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXR1c1R5cGUgXHRJRCBmb3IgdHlwZSBvZiBTdGF0dXMgdG8gcmV0cmlldmVcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgVGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKCB7IHN0YXR1c1R5cGUgfSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0aWYgKCBzdGF0dXNUeXBlICkge1xuXHRcdHdoZXJlLnB1c2goICd3aGVyZVtTVFNfdHlwZV09JyArIHN0YXR1c1R5cGUgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcblxuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBNT0RFTF9OQU1FUyA9IHtcblx0TU9ERUw6ICd0aWNrZXQnLFxuXHRSRUxBVElPTjogJ3RpY2tldHMnLFxufTtcblxuZXhwb3J0IGNvbnN0IFRJQ0tFVF9TVEFUVVNfSUQgPSB7XG5cdFNPTERfT1VUOiAnVEtTJyxcblx0RVhQSVJFRDogJ1RLRScsXG5cdEFSQ0hJVkVEOiAnVEtBJyxcblx0UEVORElORzogJ1RLUCcsXG5cdE9OU0FMRTogJ1RLTycsXG59O1xuXG5leHBvcnQgY29uc3QgVElDS0VUX1NUQVRVU19JRFMgPSB2YWx1ZXMoIFRJQ0tFVF9TVEFUVVNfSUQgKTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9zdGF0dXMtaGVscGVyJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxuXHRHUkVBVEVSX1RIQU4sXG5cdEdSRUFURVJfVEhBTl9BTkRfRVFVQUwsXG5cdExFU1NfVEhBTl9BTkRfRVFVQUwsXG59IGZyb20gJy4uL2Jhc2UnO1xuXG5leHBvcnQgY29uc3Qgbm93RGF0ZUFuZFRpbWUgPSBtb21lbnQoKTtcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSgge1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZiggW1xuXHRcdFx0J1RLVF9uYW1lJyxcblx0XHRcdCdUS1RfSUQnLFxuXHRcdFx0J3N0YXJ0X2RhdGUnLFxuXHRcdFx0J2VuZF9kYXRlJyxcblx0XHRdICksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZiggQUxMT1dFRF9PUkRFUl9WQUxVRVMgKSxcblx0XHRzaG93RXhwaXJlZDogUHJvcFR5cGVzLmJvb2wsXG5cdFx0bW9udGg6IFByb3BUeXBlcy5tb250aCxcblx0fSApLFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdFx0c2hvd0V4cGlyZWQ6IGJvb2xlYW5cbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ3N0YXJ0X2RhdGUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9ERVNDLFxuXHRcdHNob3dFeHBpcmVkOiBmYWxzZSxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhIHRpY2tldC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0c3RhcnRfZGF0ZTogJ1RLVF9zdGFydF9kYXRlJyxcblx0XHRlbmRfZGF0ZTogJ1RLVF9lbmRfZGF0ZScsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZCggb3JkZXJCeU1hcFsgb3JkZXJCeSBdICkgP1xuXHRcdG9yZGVyQnkgOlxuXHRcdG9yZGVyQnlNYXBbIG9yZGVyQnkgXTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIHRpY2tldHMgZW5kcG9pbnQgcmVxdWVzdCB1c2luZyBwcm92aWRlZFxuICogaW5mb3JtYXRpb24uXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBzaG93RXhwaXJlZCBcdFdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgZXhwaXJlZCB0aWNrZXRzLlxuICogQHBhcmFtIHtzdHJpbmd9IG1vbnRoICAgICAgICAgICAgUmV0dXJuIHRpY2tldHMgZm9yIHRoZSBnaXZlbiBtb250aC4gQ2FuIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHRpbiBhbnkgbW9udGggZm9ybWF0IHJlY29nbml6ZWQgYnkgbW9tZW50XG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRXZlbnRJZCAgICBcdElEIG9mIEV2ZW50IHRvIHJldHJpZXZlIHRpY2tldHMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRGF0ZXRpbWVJZCAgICBJRCBvZiBEYXRldGltZSB0byByZXRyaWV2ZSB0aWNrZXRzIGZvclxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICBcdFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICgge1xuXHRmb3JFdmVudElkID0gMCxcblx0Zm9yRGF0ZXRpbWVJZCA9IDAsXG5cdHNob3dFeHBpcmVkID0gZmFsc2UsXG5cdG1vbnRoID0gJ25vbmUnLFxufSApID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0aWYgKCAhIHNob3dFeHBpcmVkICkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVEtUX2VuZF9kYXRlKipleHBpcmVkXVtdPScgKyBHUkVBVEVSX1RIQU4gK1xuXHRcdFx0JyZ3aGVyZVtUS1RfZW5kX2RhdGUqKmV4cGlyZWRdW109JyArXG5cdFx0XHRub3dEYXRlQW5kVGltZS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRpZiAoIG1vbnRoICYmIG1vbnRoICE9PSAnbm9uZScgKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtUS1Rfc3RhcnRfZGF0ZV1bXT0nICsgR1JFQVRFUl9USEFOX0FORF9FUVVBTCArXG5cdFx0XHQnJndoZXJlW1RLVF9zdGFydF9kYXRlXVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuc3RhcnRPZiggJ21vbnRoJyApLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVEtUX2VuZF9kYXRlXVtdPScgKyBMRVNTX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdCcmd2hlcmVbVEtUX2VuZF9kYXRlXVtdPScgK1xuXHRcdFx0bW9tZW50KCkubW9udGgoIG1vbnRoICkuZW5kT2YoICdtb250aCcgKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRmb3JFdmVudElkID0gcGFyc2VJbnQoIGZvckV2ZW50SWQsIDEwICk7XG5cdGlmICggZm9yRXZlbnRJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JFdmVudElkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0RhdGV0aW1lLkV2ZW50LkVWVF9JRF09JyArIGZvckV2ZW50SWQgKTtcblx0fVxuXHRmb3JEYXRldGltZUlkID0gcGFyc2VJbnQoIGZvckRhdGV0aW1lSWQsIDEwICk7XG5cdGlmICggZm9yRGF0ZXRpbWVJZCAhPT0gMCAmJiAhIGlzTmFOKCBmb3JEYXRldGltZUlkICkgKSB7XG5cdFx0d2hlcmUucHVzaCggJ3doZXJlW0RhdGV0aW1lLkRUVF9JRF09JyArIGZvckRhdGV0aW1lSWQgKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbiggJyYnICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9ICggcXVlcnlEYXRhID0ge30gKSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKCBxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IE1PREVMX05BTUVTLCBUSUNLRVRfU1RBVFVTX0lEIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHBhcnNlSW5maW5pdHkgZnJvbSAnLi4vLi4vLi4vdXRpbHMvcGFyc2UtaW5maW5pdHknO1xuXG5jb25zdCB7IE1PREVMIH0gPSBNT0RFTF9OQU1FUztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG4gKi9cbmNvbnN0IGFzc2VydFRpY2tldEVudGl0eSA9ICggdGlja2V0RW50aXR5ICkgPT4ge1xuXHRpZiAoICEgaXNNb2RlbEVudGl0eU9mTW9kZWwoIHRpY2tldEVudGl0eSwgTU9ERUwgKSApIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0J1RoZSBwcm92aWRlZCBlbnRpdHkgaXMgbm90IGEgdGlja2V0IGluc3RhbmNlJ1xuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQXJjaGl2ZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IHRyYXNoZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgZXZlbnQgZGF0ZSBpcyB2YWxpZCBlbnRpdHkgb3IgYXJjaGl2ZVxuICovXG5jb25zdCBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlID0gKCB0aWNrZXRFbnRpdHksIGluY2x1ZGVBcmNoaXZlZCApID0+IHtcblx0cmV0dXJuICggaW5jbHVkZUFyY2hpdmVkICYmIGFzc2VydFRpY2tldEVudGl0eSggdGlja2V0RW50aXR5ICkgKSB8fFxuICAgICAgICAoICEgaW5jbHVkZUFyY2hpdmVkICYmICEgaXNBcmNoaXZlZCggdGlja2V0RW50aXR5ICkgKTtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQXJjaGl2ZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IGFyY2hpdmVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRpY2tldCBpcyBjdXJyZW50bHkgYXZhaWxhYmxlIGZvciBwdXJjaGFzZVxuICovXG5leHBvcnQgY29uc3QgaXNPblNhbGUgPSAoIHRpY2tldEVudGl0eSwgaW5jbHVkZUFyY2hpdmVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCB0aWNrZXRFbnRpdHksIGluY2x1ZGVBcmNoaXZlZCApICYmXG5cdHRpY2tldEVudGl0eS5zdGFydERhdGUuZGlmZk5vdygpIDwgMCAmJlxuXHR0aWNrZXRFbnRpdHkuZW5kRGF0ZS5kaWZmTm93KCkgPiAwO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVBcmNoaXZlZCBpZiB0cnVlIHdpbGwgbm90IGZpbHRlciBvdXQgYXJjaGl2ZWQgZW50aXRpZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGlja2V0IGNhbiBubyBsb25nZXIgYmUgcHVyY2hhc2VkXG4gKi9cbmV4cG9ydCBjb25zdCBpc0V4cGlyZWQgPSAoIHRpY2tldEVudGl0eSwgaW5jbHVkZUFyY2hpdmVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCB0aWNrZXRFbnRpdHksIGluY2x1ZGVBcmNoaXZlZCApICYmXG5cdHRpY2tldEVudGl0eS5lbmREYXRlLmRpZmZOb3coKSA8IDA7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZUFyY2hpdmVkIGlmIHRydWUgd2lsbCBub3QgZmlsdGVyIG91dCBhcmNoaXZlZCBlbnRpdGllc1xuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aWNrZXRzIHNvbGQgbWVldHMgb3IgZXhjZWVkcyBhdmFpbGFibGUgcXVhbnRpdHlcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU29sZE91dCA9ICggdGlja2V0RW50aXR5LCBpbmNsdWRlQXJjaGl2ZWQgPSBmYWxzZSApID0+IHtcblx0aWYgKFxuXHRcdCggaW5jbHVkZUFyY2hpdmVkICYmICEgYXNzZXJ0VGlja2V0RW50aXR5KCB0aWNrZXRFbnRpdHkgKSApIHx8XG5cdFx0KCAhIGluY2x1ZGVBcmNoaXZlZCAmJiBpc0FyY2hpdmVkKCB0aWNrZXRFbnRpdHkgKSApXG5cdCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRsZXQgcXR5ID0gdGlja2V0RW50aXR5LnF0eTtcblx0cXR5ID0gcGFyc2VJbmZpbml0eSggcXR5LCB0cnVlICk7XG5cdHJldHVybiBxdHkgIT09IEluZmluaXR5ICYmIHRpY2tldEVudGl0eS5zb2xkID49IHF0eTtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQXJjaGl2ZWQgaWYgdHJ1ZSB3aWxsIG5vdCBmaWx0ZXIgb3V0IGFyY2hpdmVkIGVudGl0aWVzXG4gKiBAcmV0dXJuIHtib29sZWFufSBcdHRydWUgaWYgdGlja2V0IGlzIG5vdCB5ZXQgYXZhaWxhYmxlIGZvciBwdXJjaGFzZSxcbiAqIFx0XHRcdFx0XHRcdGJ1dCB3aWxsIGJlIGF0IHNvbWUgZGF0ZSBpbiB0aGUgZnV0dXJlXG4gKi9cbmV4cG9ydCBjb25zdCBpc1BlbmRpbmcgPSAoIHRpY2tldEVudGl0eSwgaW5jbHVkZUFyY2hpdmVkID0gZmFsc2UgKSA9PiB7XG5cdHJldHVybiBpc1ZhbGlkRW50aXR5T3JBcmNoaXZlKCB0aWNrZXRFbnRpdHksIGluY2x1ZGVBcmNoaXZlZCApICYmXG5cdHRpY2tldEVudGl0eS5zdGFydERhdGUuZGlmZk5vdygpID4gMDtcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdGlja2V0RW50aXR5IG1vZGVsIG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aWNrZXQgaXMgYXJjaGl2ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGlzQXJjaGl2ZWQgPSAoIHRpY2tldEVudGl0eSApID0+IHtcblx0YXNzZXJ0VGlja2V0RW50aXR5KCB0aWNrZXRFbnRpdHkgKTtcblx0cmV0dXJuIHRpY2tldEVudGl0eS5kZWxldGVkO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9IHN0YXR1cyBJRFxuICovXG5leHBvcnQgY29uc3Qgc3RhdHVzID0gKCB0aWNrZXRFbnRpdHkgKSA9PiB7XG5cdGlmICggaXNBcmNoaXZlZCggdGlja2V0RW50aXR5ICkgKSB7XG5cdFx0cmV0dXJuIFRJQ0tFVF9TVEFUVVNfSUQuQVJDSElWRUQ7XG5cdH1cblx0aWYgKCBpc1NvbGRPdXQoIHRpY2tldEVudGl0eSApICkge1xuXHRcdHJldHVybiBUSUNLRVRfU1RBVFVTX0lELlNPTERfT1VUO1xuXHR9XG5cdGlmICggaXNFeHBpcmVkKCB0aWNrZXRFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gVElDS0VUX1NUQVRVU19JRC5FWFBJUkVEO1xuXHR9XG5cdGlmICggaXNQZW5kaW5nKCB0aWNrZXRFbnRpdHkgKSApIHtcblx0XHRyZXR1cm4gVElDS0VUX1NUQVRVU19JRC5QRU5ESU5HO1xuXHR9XG5cdGlmICggaXNPblNhbGUoIHRpY2tldEVudGl0eSApICkge1xuXHRcdHJldHVybiBUSUNLRVRfU1RBVFVTX0lELk9OU0FMRTtcblx0fVxuXHRyZXR1cm4gJyc7XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHRpY2tldEVudGl0eSBtb2RlbCBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ30gdGlja2V0IHN0YXR1c1xuICovXG5leHBvcnQgY29uc3QgZ2V0VGlja2V0U3RhdHVzVGV4dExhYmVsID0gKCB0aWNrZXRFbnRpdHkgKSA9PiB7XG5cdGxldCB0aWNrZXRTdGF0dXMgPSAnJztcblx0c3dpdGNoICggc3RhdHVzKCB0aWNrZXRFbnRpdHkgKSApIHtcblx0XHRjYXNlIFRJQ0tFVF9TVEFUVVNfSUQuU09MRF9PVVQgOlxuXHRcdFx0dGlja2V0U3RhdHVzID0gX18oICdzb2xkIG91dCcsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVElDS0VUX1NUQVRVU19JRC5FWFBJUkVEIDpcblx0XHRcdHRpY2tldFN0YXR1cyA9IF9fKCAnZXhwaXJlZCcsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVElDS0VUX1NUQVRVU19JRC5QRU5ESU5HIDpcblx0XHRcdHRpY2tldFN0YXR1cyA9IF9fKCAncGVuZGluZycsICdldmVudF9lc3ByZXNzbycgKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVElDS0VUX1NUQVRVU19JRC5PTlNBTEUgOlxuXHRcdFx0dGlja2V0U3RhdHVzID0gX18oICdvbiBzYWxlJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBUSUNLRVRfU1RBVFVTX0lELkFSQ0hJVkVEIDpcblx0XHRcdHRpY2tldFN0YXR1cyA9IF9fKCAnYXJjaGl2ZWQnLCAnZXZlbnRfZXNwcmVzc28nICk7XG5cdFx0XHRicmVhaztcblx0fVxuXHRyZXR1cm4gdGlja2V0U3RhdHVzO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aWNrZXRFbnRpdHkgbW9kZWwgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgIENTUyBjbGFzcyBmb3IgdGhlIGJhY2tncm91bmQgY29sb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEJhY2tncm91bmRDb2xvckNsYXNzID0gKCB0aWNrZXRFbnRpdHkgKSA9PiB7XG5cdHJldHVybiBgZWUtc3RhdHVzLWJhY2tncm91bmQtY29sb3ItJHsgc3RhdHVzKCB0aWNrZXRFbnRpdHkgKSB9YDtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNOaWwgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIGNvbnZlcnRzIGluZmluaXRlIHZhbHVlcyB0byBudWxsIGZvciB1c2UgaW4gZm9ybXNcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVsbHxudW1iZXJ8c3RyaW5nfSBudW1iZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXNJbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9yRGJcbiAqIEByZXR1cm4ge251bWJlcn0gY29udmVydGVkIGluZmluaXRlIHZhbHVlXG4gKi9cbmNvbnN0IHBhcnNlSW5maW5pdHkgPSAoIG51bWJlciwgYXNJbnQgPSBmYWxzZSwgZm9yRGIgPSBmYWxzZSApID0+IHtcblx0Ly8gcmV0dXJucyB0cnVlIGZvciBhbnkgcG9zc2libGUgdmFsdWUgdGhhdCBjb3VsZCByZXByZXNlbnQgaW5maW5pdHlcblx0Y29uc3QgcmVwcmVzZW50c0luZmluaXR5ID0gKCB2YWx1ZSApID0+XG5cdFx0dmFsdWUgPCAwIHx8XG5cdFx0dmFsdWUgPT09ICcnIHx8XG5cdFx0dmFsdWUgPT09ICdJTkYnIHx8XG5cdFx0dmFsdWUgPT09IEluZmluaXR5IHx8XG5cdFx0aXNOaWwoIHZhbHVlICk7XG5cblx0aWYgKCBudW1iZXIgJiYgbnVtYmVyLnR5cGUgJiYgbnVtYmVyLnR5cGUubmFtZSA9PT0gJ0luZmluaXR5U3ltYm9sJyApIHtcblx0XHRudW1iZXIgPSBudW1iZXIucHJvcHMudmFsdWU7XG5cdH1cblxuXHRudW1iZXIgPSByZXByZXNlbnRzSW5maW5pdHkoIG51bWJlciApID8gSW5maW5pdHkgOiBudW1iZXI7XG5cdG51bWJlciA9IG51bWJlciAhPT0gSW5maW5pdHkgJiYgYXNJbnQgPyBwYXJzZUludCggbnVtYmVyLCAxMCApIDogbnVtYmVyO1xuXG5cdGlmICggaXNOYU4oIG51bWJlciApICkge1xuXHRcdG51bWJlciA9IGFzSW50ID8gLTEgOiBJbmZpbml0eTtcblx0fVxuXHQvLyBJZiBpbmZpbml0eSBhbmQgZm9yIGRiXG5cdGlmICggbnVtYmVyID09PSBJbmZpbml0eSAmJiBmb3JEYiApIHtcblx0XHRudW1iZXIgPSAtMTtcblx0fVxuXHRyZXR1cm4gbnVtYmVyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGFyc2VJbmZpbml0eTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aG91dEhvbGVzOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2Y7IiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVyKSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIikgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheTsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVTcHJlYWQ7IiwidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgPSByZXF1aXJlKFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIik7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm47IiwiZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2Y7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVtaXplKCBmbiwgb3B0aW9ucyApIHtcblx0dmFyIHNpemUgPSAwLFxuXHRcdG1heFNpemUsIGhlYWQsIHRhaWw7XG5cblx0aWYgKCBvcHRpb25zICYmIG9wdGlvbnMubWF4U2l6ZSApIHtcblx0XHRtYXhTaXplID0gb3B0aW9ucy5tYXhTaXplO1xuXHR9XG5cblx0ZnVuY3Rpb24gbWVtb2l6ZWQoIC8qIC4uLmFyZ3MgKi8gKSB7XG5cdFx0dmFyIG5vZGUgPSBoZWFkLFxuXHRcdFx0bGVuID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRcdGFyZ3MsIGk7XG5cblx0XHRzZWFyY2hDYWNoZTogd2hpbGUgKCBub2RlICkge1xuXHRcdFx0Ly8gUGVyZm9ybSBhIHNoYWxsb3cgZXF1YWxpdHkgdGVzdCB0byBjb25maXJtIHRoYXQgd2hldGhlciB0aGUgbm9kZVxuXHRcdFx0Ly8gdW5kZXIgdGVzdCBpcyBhIGNhbmRpZGF0ZSBmb3IgdGhlIGFyZ3VtZW50cyBwYXNzZWQuIFR3byBhcnJheXNcblx0XHRcdC8vIGFyZSBzaGFsbG93bHkgZXF1YWwgaWYgdGhlaXIgbGVuZ3RoIG1hdGNoZXMgYW5kIGVhY2ggZW50cnkgaXNcblx0XHRcdC8vIHN0cmljdGx5IGVxdWFsIGJldHdlZW4gdGhlIHR3byBzZXRzLiBBdm9pZCBhYnN0cmFjdGluZyB0byBhXG5cdFx0XHQvLyBmdW5jdGlvbiB3aGljaCBjb3VsZCBpbmN1ciBhbiBhcmd1bWVudHMgbGVha2luZyBkZW9wdGltaXphdGlvbi5cblxuXHRcdFx0Ly8gQ2hlY2sgd2hldGhlciBub2RlIGFyZ3VtZW50cyBtYXRjaCBhcmd1bWVudHMgbGVuZ3RoXG5cdFx0XHRpZiAoIG5vZGUuYXJncy5sZW5ndGggIT09IGFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRcdG5vZGUgPSBub2RlLm5leHQ7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDaGVjayB3aGV0aGVyIG5vZGUgYXJndW1lbnRzIG1hdGNoIGFyZ3VtZW50cyB2YWx1ZXNcblx0XHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdGlmICggbm9kZS5hcmdzWyBpIF0gIT09IGFyZ3VtZW50c1sgaSBdICkge1xuXHRcdFx0XHRcdG5vZGUgPSBub2RlLm5leHQ7XG5cdFx0XHRcdFx0Y29udGludWUgc2VhcmNoQ2FjaGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCB3ZSBjYW4gYXNzdW1lIHdlJ3ZlIGZvdW5kIGEgbWF0Y2hcblxuXHRcdFx0Ly8gU3VyZmFjZSBtYXRjaGVkIG5vZGUgdG8gaGVhZCBpZiBub3QgYWxyZWFkeVxuXHRcdFx0aWYgKCBub2RlICE9PSBoZWFkICkge1xuXHRcdFx0XHQvLyBBcyB0YWlsLCBzaGlmdCB0byBwcmV2aW91cy4gTXVzdCBvbmx5IHNoaWZ0IGlmIG5vdCBhbHNvXG5cdFx0XHRcdC8vIGhlYWQsIHNpbmNlIGlmIGJvdGggaGVhZCBhbmQgdGFpbCwgdGhlcmUgaXMgbm8gcHJldmlvdXMuXG5cdFx0XHRcdGlmICggbm9kZSA9PT0gdGFpbCApIHtcblx0XHRcdFx0XHR0YWlsID0gbm9kZS5wcmV2O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQWRqdXN0IHNpYmxpbmdzIHRvIHBvaW50IHRvIGVhY2ggb3RoZXIuIElmIG5vZGUgd2FzIHRhaWwsXG5cdFx0XHRcdC8vIHRoaXMgYWxzbyBoYW5kbGVzIG5ldyB0YWlsJ3MgZW1wdHkgYG5leHRgIGFzc2lnbm1lbnQuXG5cdFx0XHRcdG5vZGUucHJldi5uZXh0ID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRpZiAoIG5vZGUubmV4dCApIHtcblx0XHRcdFx0XHRub2RlLm5leHQucHJldiA9IG5vZGUucHJldjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG5vZGUubmV4dCA9IGhlYWQ7XG5cdFx0XHRcdG5vZGUucHJldiA9IG51bGw7XG5cdFx0XHRcdGhlYWQucHJldiA9IG5vZGU7XG5cdFx0XHRcdGhlYWQgPSBub2RlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXR1cm4gaW1tZWRpYXRlbHlcblx0XHRcdHJldHVybiBub2RlLnZhbDtcblx0XHR9XG5cblx0XHQvLyBObyBjYWNoZWQgdmFsdWUgZm91bmQuIENvbnRpbnVlIHRvIGluc2VydGlvbiBwaGFzZTpcblxuXHRcdC8vIENyZWF0ZSBhIGNvcHkgb2YgYXJndW1lbnRzIChhdm9pZCBsZWFraW5nIGRlb3B0aW1pemF0aW9uKVxuXHRcdGFyZ3MgPSBuZXcgQXJyYXkoIGxlbiApO1xuXHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRhcmdzWyBpIF0gPSBhcmd1bWVudHNbIGkgXTtcblx0XHR9XG5cblx0XHRub2RlID0ge1xuXHRcdFx0YXJnczogYXJncyxcblxuXHRcdFx0Ly8gR2VuZXJhdGUgdGhlIHJlc3VsdCBmcm9tIG9yaWdpbmFsIGZ1bmN0aW9uXG5cdFx0XHR2YWw6IGZuLmFwcGx5KCBudWxsLCBhcmdzIClcblx0XHR9O1xuXG5cdFx0Ly8gRG9uJ3QgbmVlZCB0byBjaGVjayB3aGV0aGVyIG5vZGUgaXMgYWxyZWFkeSBoZWFkLCBzaW5jZSBpdCB3b3VsZFxuXHRcdC8vIGhhdmUgYmVlbiByZXR1cm5lZCBhYm92ZSBhbHJlYWR5IGlmIGl0IHdhc1xuXG5cdFx0Ly8gU2hpZnQgZXhpc3RpbmcgaGVhZCBkb3duIGxpc3Rcblx0XHRpZiAoIGhlYWQgKSB7XG5cdFx0XHRoZWFkLnByZXYgPSBub2RlO1xuXHRcdFx0bm9kZS5uZXh0ID0gaGVhZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gSWYgbm8gaGVhZCwgZm9sbG93cyB0aGF0IHRoZXJlJ3Mgbm8gdGFpbCAoYXQgaW5pdGlhbCBvciByZXNldClcblx0XHRcdHRhaWwgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8vIFRyaW0gdGFpbCBpZiB3ZSdyZSByZWFjaGVkIG1heCBzaXplIGFuZCBhcmUgcGVuZGluZyBjYWNoZSBpbnNlcnRpb25cblx0XHRpZiAoIHNpemUgPT09IG1heFNpemUgKSB7XG5cdFx0XHR0YWlsID0gdGFpbC5wcmV2O1xuXHRcdFx0dGFpbC5uZXh0ID0gbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2l6ZSsrO1xuXHRcdH1cblxuXHRcdGhlYWQgPSBub2RlO1xuXG5cdFx0cmV0dXJuIG5vZGUudmFsO1xuXHR9XG5cblx0bWVtb2l6ZWQuY2xlYXIgPSBmdW5jdGlvbigpIHtcblx0XHRoZWFkID0gbnVsbDtcblx0XHR0YWlsID0gbnVsbDtcblx0XHRzaXplID0gMDtcblx0fTtcblxuXHRpZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcgKSB7XG5cdFx0Ly8gQ2FjaGUgaXMgbm90IGV4cG9zZWQgaW4gdGhlIHB1YmxpYyBBUEksIGJ1dCB1c2VkIGluIHRlc3RzIHRvIGVuc3VyZVxuXHRcdC8vIGV4cGVjdGVkIGxpc3QgcHJvZ3Jlc3Npb25cblx0XHRtZW1vaXplZC5nZXRDYWNoZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIFsgaGVhZCwgdGFpbCwgc2l6ZSBdO1xuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gbWVtb2l6ZWQ7XG59O1xuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uIChyb290LCBwbHVyYWxpemUpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xuICAgIC8vIE5vZGUuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBwbHVyYWxpemUoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQsIHJlZ2lzdGVycyBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcGx1cmFsaXplKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWwuXG4gICAgcm9vdC5wbHVyYWxpemUgPSBwbHVyYWxpemUoKTtcbiAgfVxufSkodGhpcywgZnVuY3Rpb24gKCkge1xuICAvLyBSdWxlIHN0b3JhZ2UgLSBwbHVyYWxpemUgYW5kIHNpbmd1bGFyaXplIG5lZWQgdG8gYmUgcnVuIHNlcXVlbnRpYWxseSxcbiAgLy8gd2hpbGUgb3RoZXIgcnVsZXMgY2FuIGJlIG9wdGltaXplZCB1c2luZyBhbiBvYmplY3QgZm9yIGluc3RhbnQgbG9va3Vwcy5cbiAgdmFyIHBsdXJhbFJ1bGVzID0gW107XG4gIHZhciBzaW5ndWxhclJ1bGVzID0gW107XG4gIHZhciB1bmNvdW50YWJsZXMgPSB7fTtcbiAgdmFyIGlycmVndWxhclBsdXJhbHMgPSB7fTtcbiAgdmFyIGlycmVndWxhclNpbmdsZXMgPSB7fTtcblxuICAvKipcbiAgICogU2FuaXRpemUgYSBwbHVyYWxpemF0aW9uIHJ1bGUgdG8gYSB1c2FibGUgcmVndWxhciBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIHsoUmVnRXhwfHN0cmluZyl9IHJ1bGVcbiAgICogQHJldHVybiB7UmVnRXhwfVxuICAgKi9cbiAgZnVuY3Rpb24gc2FuaXRpemVSdWxlIChydWxlKSB7XG4gICAgaWYgKHR5cGVvZiBydWxlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgcnVsZSArICckJywgJ2knKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcnVsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXNzIGluIGEgd29yZCB0b2tlbiB0byBwcm9kdWNlIGEgZnVuY3Rpb24gdGhhdCBjYW4gcmVwbGljYXRlIHRoZSBjYXNlIG9uXG4gICAqIGFub3RoZXIgd29yZC5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIHdvcmRcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIHRva2VuXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gcmVzdG9yZUNhc2UgKHdvcmQsIHRva2VuKSB7XG4gICAgLy8gVG9rZW5zIGFyZSBhbiBleGFjdCBtYXRjaC5cbiAgICBpZiAod29yZCA9PT0gdG9rZW4pIHJldHVybiB0b2tlbjtcblxuICAgIC8vIExvd2VyIGNhc2VkIHdvcmRzLiBFLmcuIFwiaGVsbG9cIi5cbiAgICBpZiAod29yZCA9PT0gd29yZC50b0xvd2VyQ2FzZSgpKSByZXR1cm4gdG9rZW4udG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIFVwcGVyIGNhc2VkIHdvcmRzLiBFLmcuIFwiV0hJU0tZXCIuXG4gICAgaWYgKHdvcmQgPT09IHdvcmQudG9VcHBlckNhc2UoKSkgcmV0dXJuIHRva2VuLnRvVXBwZXJDYXNlKCk7XG5cbiAgICAvLyBUaXRsZSBjYXNlZCB3b3Jkcy4gRS5nLiBcIlRpdGxlXCIuXG4gICAgaWYgKHdvcmRbMF0gPT09IHdvcmRbMF0udG9VcHBlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIHRva2VuLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdG9rZW4uc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLy8gTG93ZXIgY2FzZWQgd29yZHMuIEUuZy4gXCJ0ZXN0XCIuXG4gICAgcmV0dXJuIHRva2VuLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJwb2xhdGUgYSByZWdleHAgc3RyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICAgKiBAcGFyYW0gIHtBcnJheX0gIGFyZ3NcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gaW50ZXJwb2xhdGUgKHN0ciwgYXJncykge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFwkKFxcZHsxLDJ9KS9nLCBmdW5jdGlvbiAobWF0Y2gsIGluZGV4KSB7XG4gICAgICByZXR1cm4gYXJnc1tpbmRleF0gfHwgJyc7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBhIHdvcmQgdXNpbmcgYSBydWxlLlxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHdvcmRcbiAgICogQHBhcmFtICB7QXJyYXl9ICBydWxlXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIHJlcGxhY2UgKHdvcmQsIHJ1bGUpIHtcbiAgICByZXR1cm4gd29yZC5yZXBsYWNlKHJ1bGVbMF0sIGZ1bmN0aW9uIChtYXRjaCwgaW5kZXgpIHtcbiAgICAgIHZhciByZXN1bHQgPSBpbnRlcnBvbGF0ZShydWxlWzFdLCBhcmd1bWVudHMpO1xuXG4gICAgICBpZiAobWF0Y2ggPT09ICcnKSB7XG4gICAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3JkW2luZGV4IC0gMV0sIHJlc3VsdCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN0b3JlQ2FzZShtYXRjaCwgcmVzdWx0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYW5pdGl6ZSBhIHdvcmQgYnkgcGFzc2luZyBpbiB0aGUgd29yZCBhbmQgc2FuaXRpemF0aW9uIHJ1bGVzLlxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdG9rZW5cbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIHdvcmRcbiAgICogQHBhcmFtICB7QXJyYXl9ICAgIHJ1bGVzXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIHNhbml0aXplV29yZCAodG9rZW4sIHdvcmQsIHJ1bGVzKSB7XG4gICAgLy8gRW1wdHkgc3RyaW5nIG9yIGRvZXNuJ3QgbmVlZCBmaXhpbmcuXG4gICAgaWYgKCF0b2tlbi5sZW5ndGggfHwgdW5jb3VudGFibGVzLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuICAgICAgcmV0dXJuIHdvcmQ7XG4gICAgfVxuXG4gICAgdmFyIGxlbiA9IHJ1bGVzLmxlbmd0aDtcblxuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgc2FuaXRpemF0aW9uIHJ1bGVzIGFuZCB1c2UgdGhlIGZpcnN0IG9uZSB0byBtYXRjaC5cbiAgICB3aGlsZSAobGVuLS0pIHtcbiAgICAgIHZhciBydWxlID0gcnVsZXNbbGVuXTtcblxuICAgICAgaWYgKHJ1bGVbMF0udGVzdCh3b3JkKSkgcmV0dXJuIHJlcGxhY2Uod29yZCwgcnVsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdvcmQ7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBhIHdvcmQgd2l0aCB0aGUgdXBkYXRlZCB3b3JkLlxuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgcmVwbGFjZU1hcFxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAga2VlcE1hcFxuICAgKiBAcGFyYW0gIHtBcnJheX0gICAgcnVsZXNcbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlV29yZCAocmVwbGFjZU1hcCwga2VlcE1hcCwgcnVsZXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHdvcmQpIHtcbiAgICAgIC8vIEdldCB0aGUgY29ycmVjdCB0b2tlbiBhbmQgY2FzZSByZXN0b3JhdGlvbiBmdW5jdGlvbnMuXG4gICAgICB2YXIgdG9rZW4gPSB3b3JkLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIC8vIENoZWNrIGFnYWluc3QgdGhlIGtlZXAgb2JqZWN0IG1hcC5cbiAgICAgIGlmIChrZWVwTWFwLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2Uod29yZCwgdG9rZW4pO1xuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayBhZ2FpbnN0IHRoZSByZXBsYWNlbWVudCBtYXAgZm9yIGEgZGlyZWN0IHdvcmQgcmVwbGFjZW1lbnQuXG4gICAgICBpZiAocmVwbGFjZU1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKHdvcmQsIHJlcGxhY2VNYXBbdG9rZW5dKTtcbiAgICAgIH1cblxuICAgICAgLy8gUnVuIGFsbCB0aGUgcnVsZXMgYWdhaW5zdCB0aGUgd29yZC5cbiAgICAgIHJldHVybiBzYW5pdGl6ZVdvcmQodG9rZW4sIHdvcmQsIHJ1bGVzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgd29yZCBpcyBwYXJ0IG9mIHRoZSBtYXAuXG4gICAqL1xuICBmdW5jdGlvbiBjaGVja1dvcmQgKHJlcGxhY2VNYXAsIGtlZXBNYXAsIHJ1bGVzLCBib29sKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgICB2YXIgdG9rZW4gPSB3b3JkLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGlmIChrZWVwTWFwLmhhc093blByb3BlcnR5KHRva2VuKSkgcmV0dXJuIHRydWU7XG4gICAgICBpZiAocmVwbGFjZU1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHJldHVybiBmYWxzZTtcblxuICAgICAgcmV0dXJuIHNhbml0aXplV29yZCh0b2tlbiwgdG9rZW4sIHJ1bGVzKSA9PT0gdG9rZW47XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQbHVyYWxpemUgb3Igc2luZ3VsYXJpemUgYSB3b3JkIGJhc2VkIG9uIHRoZSBwYXNzZWQgaW4gY291bnQuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gIHdvcmQgICAgICBUaGUgd29yZCB0byBwbHVyYWxpemVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgY291bnQgICAgIEhvdyBtYW55IG9mIHRoZSB3b3JkIGV4aXN0XG4gICAqIEBwYXJhbSAge2Jvb2xlYW59IGluY2x1c2l2ZSBXaGV0aGVyIHRvIHByZWZpeCB3aXRoIHRoZSBudW1iZXIgKGUuZy4gMyBkdWNrcylcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gcGx1cmFsaXplICh3b3JkLCBjb3VudCwgaW5jbHVzaXZlKSB7XG4gICAgdmFyIHBsdXJhbGl6ZWQgPSBjb3VudCA9PT0gMVxuICAgICAgPyBwbHVyYWxpemUuc2luZ3VsYXIod29yZCkgOiBwbHVyYWxpemUucGx1cmFsKHdvcmQpO1xuXG4gICAgcmV0dXJuIChpbmNsdXNpdmUgPyBjb3VudCArICcgJyA6ICcnKSArIHBsdXJhbGl6ZWQ7XG4gIH1cblxuICAvKipcbiAgICogUGx1cmFsaXplIGEgd29yZC5cbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgcGx1cmFsaXplLnBsdXJhbCA9IHJlcGxhY2VXb3JkKFxuICAgIGlycmVndWxhclNpbmdsZXMsIGlycmVndWxhclBsdXJhbHMsIHBsdXJhbFJ1bGVzXG4gICk7XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgd29yZCBpcyBwbHVyYWwuXG4gICAqXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIHBsdXJhbGl6ZS5pc1BsdXJhbCA9IGNoZWNrV29yZChcbiAgICBpcnJlZ3VsYXJTaW5nbGVzLCBpcnJlZ3VsYXJQbHVyYWxzLCBwbHVyYWxSdWxlc1xuICApO1xuXG4gIC8qKlxuICAgKiBTaW5ndWxhcml6ZSBhIHdvcmQuXG4gICAqXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIHBsdXJhbGl6ZS5zaW5ndWxhciA9IHJlcGxhY2VXb3JkKFxuICAgIGlycmVndWxhclBsdXJhbHMsIGlycmVndWxhclNpbmdsZXMsIHNpbmd1bGFyUnVsZXNcbiAgKTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB3b3JkIGlzIHNpbmd1bGFyLlxuICAgKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBwbHVyYWxpemUuaXNTaW5ndWxhciA9IGNoZWNrV29yZChcbiAgICBpcnJlZ3VsYXJQbHVyYWxzLCBpcnJlZ3VsYXJTaW5nbGVzLCBzaW5ndWxhclJ1bGVzXG4gICk7XG5cbiAgLyoqXG4gICAqIEFkZCBhIHBsdXJhbGl6YXRpb24gcnVsZSB0byB0aGUgY29sbGVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cCl9IHJ1bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgIHJlcGxhY2VtZW50XG4gICAqL1xuICBwbHVyYWxpemUuYWRkUGx1cmFsUnVsZSA9IGZ1bmN0aW9uIChydWxlLCByZXBsYWNlbWVudCkge1xuICAgIHBsdXJhbFJ1bGVzLnB1c2goW3Nhbml0aXplUnVsZShydWxlKSwgcmVwbGFjZW1lbnRdKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGEgc2luZ3VsYXJpemF0aW9uIHJ1bGUgdG8gdGhlIGNvbGxlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHApfSBydWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICByZXBsYWNlbWVudFxuICAgKi9cbiAgcGx1cmFsaXplLmFkZFNpbmd1bGFyUnVsZSA9IGZ1bmN0aW9uIChydWxlLCByZXBsYWNlbWVudCkge1xuICAgIHNpbmd1bGFyUnVsZXMucHVzaChbc2FuaXRpemVSdWxlKHJ1bGUpLCByZXBsYWNlbWVudF0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gdW5jb3VudGFibGUgd29yZCBydWxlLlxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwKX0gd29yZFxuICAgKi9cbiAgcGx1cmFsaXplLmFkZFVuY291bnRhYmxlUnVsZSA9IGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgaWYgKHR5cGVvZiB3b3JkID09PSAnc3RyaW5nJykge1xuICAgICAgdW5jb3VudGFibGVzW3dvcmQudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNldCBzaW5ndWxhciBhbmQgcGx1cmFsIHJlZmVyZW5jZXMgZm9yIHRoZSB3b3JkLlxuICAgIHBsdXJhbGl6ZS5hZGRQbHVyYWxSdWxlKHdvcmQsICckMCcpO1xuICAgIHBsdXJhbGl6ZS5hZGRTaW5ndWxhclJ1bGUod29yZCwgJyQwJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBpcnJlZ3VsYXIgd29yZCBkZWZpbml0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2luZ2xlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwbHVyYWxcbiAgICovXG4gIHBsdXJhbGl6ZS5hZGRJcnJlZ3VsYXJSdWxlID0gZnVuY3Rpb24gKHNpbmdsZSwgcGx1cmFsKSB7XG4gICAgcGx1cmFsID0gcGx1cmFsLnRvTG93ZXJDYXNlKCk7XG4gICAgc2luZ2xlID0gc2luZ2xlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpcnJlZ3VsYXJTaW5nbGVzW3NpbmdsZV0gPSBwbHVyYWw7XG4gICAgaXJyZWd1bGFyUGx1cmFsc1twbHVyYWxdID0gc2luZ2xlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcnJlZ3VsYXIgcnVsZXMuXG4gICAqL1xuICBbXG4gICAgLy8gUHJvbm91bnMuXG4gICAgWydJJywgJ3dlJ10sXG4gICAgWydtZScsICd1cyddLFxuICAgIFsnaGUnLCAndGhleSddLFxuICAgIFsnc2hlJywgJ3RoZXknXSxcbiAgICBbJ3RoZW0nLCAndGhlbSddLFxuICAgIFsnbXlzZWxmJywgJ291cnNlbHZlcyddLFxuICAgIFsneW91cnNlbGYnLCAneW91cnNlbHZlcyddLFxuICAgIFsnaXRzZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgICBbJ2hlcnNlbGYnLCAndGhlbXNlbHZlcyddLFxuICAgIFsnaGltc2VsZicsICd0aGVtc2VsdmVzJ10sXG4gICAgWyd0aGVtc2VsZicsICd0aGVtc2VsdmVzJ10sXG4gICAgWydpcycsICdhcmUnXSxcbiAgICBbJ3dhcycsICd3ZXJlJ10sXG4gICAgWydoYXMnLCAnaGF2ZSddLFxuICAgIFsndGhpcycsICd0aGVzZSddLFxuICAgIFsndGhhdCcsICd0aG9zZSddLFxuICAgIC8vIFdvcmRzIGVuZGluZyBpbiB3aXRoIGEgY29uc29uYW50IGFuZCBgb2AuXG4gICAgWydlY2hvJywgJ2VjaG9lcyddLFxuICAgIFsnZGluZ28nLCAnZGluZ29lcyddLFxuICAgIFsndm9sY2FubycsICd2b2xjYW5vZXMnXSxcbiAgICBbJ3Rvcm5hZG8nLCAndG9ybmFkb2VzJ10sXG4gICAgWyd0b3JwZWRvJywgJ3RvcnBlZG9lcyddLFxuICAgIC8vIEVuZHMgd2l0aCBgdXNgLlxuICAgIFsnZ2VudXMnLCAnZ2VuZXJhJ10sXG4gICAgWyd2aXNjdXMnLCAndmlzY2VyYSddLFxuICAgIC8vIEVuZHMgd2l0aCBgbWFgLlxuICAgIFsnc3RpZ21hJywgJ3N0aWdtYXRhJ10sXG4gICAgWydzdG9tYScsICdzdG9tYXRhJ10sXG4gICAgWydkb2dtYScsICdkb2dtYXRhJ10sXG4gICAgWydsZW1tYScsICdsZW1tYXRhJ10sXG4gICAgWydzY2hlbWEnLCAnc2NoZW1hdGEnXSxcbiAgICBbJ2FuYXRoZW1hJywgJ2FuYXRoZW1hdGEnXSxcbiAgICAvLyBPdGhlciBpcnJlZ3VsYXIgcnVsZXMuXG4gICAgWydveCcsICdveGVuJ10sXG4gICAgWydheGUnLCAnYXhlcyddLFxuICAgIFsnZGllJywgJ2RpY2UnXSxcbiAgICBbJ3llcycsICd5ZXNlcyddLFxuICAgIFsnZm9vdCcsICdmZWV0J10sXG4gICAgWydlYXZlJywgJ2VhdmVzJ10sXG4gICAgWydnb29zZScsICdnZWVzZSddLFxuICAgIFsndG9vdGgnLCAndGVldGgnXSxcbiAgICBbJ3F1aXonLCAncXVpenplcyddLFxuICAgIFsnaHVtYW4nLCAnaHVtYW5zJ10sXG4gICAgWydwcm9vZicsICdwcm9vZnMnXSxcbiAgICBbJ2NhcnZlJywgJ2NhcnZlcyddLFxuICAgIFsndmFsdmUnLCAndmFsdmVzJ10sXG4gICAgWydsb29leScsICdsb29pZXMnXSxcbiAgICBbJ3RoaWVmJywgJ3RoaWV2ZXMnXSxcbiAgICBbJ2dyb292ZScsICdncm9vdmVzJ10sXG4gICAgWydwaWNrYXhlJywgJ3BpY2theGVzJ10sXG4gICAgWydwYXNzZXJieScsICdwYXNzZXJzYnknXVxuICBdLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICByZXR1cm4gcGx1cmFsaXplLmFkZElycmVndWxhclJ1bGUocnVsZVswXSwgcnVsZVsxXSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBQbHVyYWxpemF0aW9uIHJ1bGVzLlxuICAgKi9cbiAgW1xuICAgIFsvcz8kL2ksICdzJ10sXG4gICAgWy9bXlxcdTAwMDAtXFx1MDA3Rl0kL2ksICckMCddLFxuICAgIFsvKFteYWVpb3VdZXNlKSQvaSwgJyQxJ10sXG4gICAgWy8oYXh8dGVzdClpcyQvaSwgJyQxZXMnXSxcbiAgICBbLyhhbGlhc3xbXmFvdV11c3x0W2xtXWFzfGdhc3xyaXMpJC9pLCAnJDFlcyddLFxuICAgIFsvKGVbbW5ddSlzPyQvaSwgJyQxcyddLFxuICAgIFsvKFtebF1pYXN8W2FlaW91XWxhc3xbZWp6cl1hc3xbaXVdYW0pJC9pLCAnJDEnXSxcbiAgICBbLyhhbHVtbnxzeWxsYWJ8dmlyfHJhZGl8bnVjbGV8ZnVuZ3xjYWN0fHN0aW11bHx0ZXJtaW58YmFjaWxsfGZvY3x1dGVyfGxvY3xzdHJhdCkoPzp1c3xpKSQvaSwgJyQxaSddLFxuICAgIFsvKGFsdW1ufGFsZ3x2ZXJ0ZWJyKSg/OmF8YWUpJC9pLCAnJDFhZSddLFxuICAgIFsvKHNlcmFwaHxjaGVydWIpKD86aW0pPyQvaSwgJyQxaW0nXSxcbiAgICBbLyhoZXJ8YXR8Z3IpbyQvaSwgJyQxb2VzJ10sXG4gICAgWy8oYWdlbmR8YWRkZW5kfG1pbGxlbm5pfGRhdHxleHRyZW18YmFjdGVyaXxkZXNpZGVyYXR8c3RyYXR8Y2FuZGVsYWJyfGVycmF0fG92fHN5bXBvc2l8Y3VycmljdWx8YXV0b21hdHxxdW9yKSg/OmF8dW0pJC9pLCAnJDFhJ10sXG4gICAgWy8oYXBoZWxpfGh5cGVyYmF0fHBlcmloZWxpfGFzeW5kZXR8bm91bWVufHBoZW5vbWVufGNyaXRlcml8b3JnYW58cHJvbGVnb21lbnxoZWRyfGF1dG9tYXQpKD86YXxvbikkL2ksICckMWEnXSxcbiAgICBbL3NpcyQvaSwgJ3NlcyddLFxuICAgIFsvKD86KGtuaXx3aXxsaSlmZXwoYXJ8bHxlYXxlb3xvYXxob28pZikkL2ksICckMSQydmVzJ10sXG4gICAgWy8oW15hZWlvdXldfHF1KXkkL2ksICckMWllcyddLFxuICAgIFsvKFteY2hdW2llb11bbG5dKWV5JC9pLCAnJDFpZXMnXSxcbiAgICBbLyh4fGNofHNzfHNofHp6KSQvaSwgJyQxZXMnXSxcbiAgICBbLyhtYXRyfGNvZHxtdXJ8c2lsfHZlcnR8aW5kfGFwcGVuZCkoPzppeHxleCkkL2ksICckMWljZXMnXSxcbiAgICBbL1xcYigoPzp0aXQpP218bCkoPzppY2V8b3VzZSkkL2ksICckMWljZSddLFxuICAgIFsvKHBlKSg/OnJzb258b3BsZSkkL2ksICckMW9wbGUnXSxcbiAgICBbLyhjaGlsZCkoPzpyZW4pPyQvaSwgJyQxcmVuJ10sXG4gICAgWy9lYXV4JC9pLCAnJDAnXSxcbiAgICBbL21bYWVdbiQvaSwgJ21lbiddLFxuICAgIFsndGhvdScsICd5b3UnXVxuICBdLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICByZXR1cm4gcGx1cmFsaXplLmFkZFBsdXJhbFJ1bGUocnVsZVswXSwgcnVsZVsxXSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBTaW5ndWxhcml6YXRpb24gcnVsZXMuXG4gICAqL1xuICBbXG4gICAgWy9zJC9pLCAnJ10sXG4gICAgWy8oc3MpJC9pLCAnJDEnXSxcbiAgICBbLyh3aXxrbml8KD86YWZ0ZXJ8aGFsZnxoaWdofGxvd3xtaWR8bm9ufG5pZ2h0fFteXFx3XXxeKWxpKXZlcyQvaSwgJyQxZmUnXSxcbiAgICBbLyhhcnwoPzp3b3xbYWVdKWx8W2VvXVthb10pdmVzJC9pLCAnJDFmJ10sXG4gICAgWy9pZXMkL2ksICd5J10sXG4gICAgWy9cXGIoW3BsXXx6b21ifCg/Om5lY2t8Y3Jvc3MpP3R8Y29sbHxmYWVyfGZvb2R8Z2VufGdvb258Z3JvdXB8bGFzc3x0YWxrfGdvYWx8Y3V0KWllcyQvaSwgJyQxaWUnXSxcbiAgICBbL1xcYihtb258c21pbClpZXMkL2ksICckMWV5J10sXG4gICAgWy9cXGIoKD86dGl0KT9tfGwpaWNlJC9pLCAnJDFvdXNlJ10sXG4gICAgWy8oc2VyYXBofGNoZXJ1YilpbSQvaSwgJyQxJ10sXG4gICAgWy8oeHxjaHxzc3xzaHx6enx0dG98Z298Y2hvfGFsaWFzfFteYW91XXVzfHRbbG1dYXN8Z2FzfCg/OmhlcnxhdHxncilvfFthZWlvdV1yaXMpKD86ZXMpPyQvaSwgJyQxJ10sXG4gICAgWy8oYW5hbHl8ZGlhZ25vfHBhcmVudGhlfHByb2dub3xzeW5vcHx0aGV8ZW1waGF8Y3JpfG5lKSg/OnNpc3xzZXMpJC9pLCAnJDFzaXMnXSxcbiAgICBbLyhtb3ZpZXx0d2VsdmV8YWJ1c2V8ZVttbl11KXMkL2ksICckMSddLFxuICAgIFsvKHRlc3QpKD86aXN8ZXMpJC9pLCAnJDFpcyddLFxuICAgIFsvKGFsdW1ufHN5bGxhYnx2aXJ8cmFkaXxudWNsZXxmdW5nfGNhY3R8c3RpbXVsfHRlcm1pbnxiYWNpbGx8Zm9jfHV0ZXJ8bG9jfHN0cmF0KSg/OnVzfGkpJC9pLCAnJDF1cyddLFxuICAgIFsvKGFnZW5kfGFkZGVuZHxtaWxsZW5uaXxkYXR8ZXh0cmVtfGJhY3Rlcml8ZGVzaWRlcmF0fHN0cmF0fGNhbmRlbGFicnxlcnJhdHxvdnxzeW1wb3NpfGN1cnJpY3VsfHF1b3IpYSQvaSwgJyQxdW0nXSxcbiAgICBbLyhhcGhlbGl8aHlwZXJiYXR8cGVyaWhlbGl8YXN5bmRldHxub3VtZW58cGhlbm9tZW58Y3JpdGVyaXxvcmdhbnxwcm9sZWdvbWVufGhlZHJ8YXV0b21hdClhJC9pLCAnJDFvbiddLFxuICAgIFsvKGFsdW1ufGFsZ3x2ZXJ0ZWJyKWFlJC9pLCAnJDFhJ10sXG4gICAgWy8oY29kfG11cnxzaWx8dmVydHxpbmQpaWNlcyQvaSwgJyQxZXgnXSxcbiAgICBbLyhtYXRyfGFwcGVuZClpY2VzJC9pLCAnJDFpeCddLFxuICAgIFsvKHBlKShyc29ufG9wbGUpJC9pLCAnJDFyc29uJ10sXG4gICAgWy8oY2hpbGQpcmVuJC9pLCAnJDEnXSxcbiAgICBbLyhlYXUpeD8kL2ksICckMSddLFxuICAgIFsvbWVuJC9pLCAnbWFuJ11cbiAgXS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgcmV0dXJuIHBsdXJhbGl6ZS5hZGRTaW5ndWxhclJ1bGUocnVsZVswXSwgcnVsZVsxXSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBVbmNvdW50YWJsZSBydWxlcy5cbiAgICovXG4gIFtcbiAgICAvLyBTaW5ndWxhciB3b3JkcyB3aXRoIG5vIHBsdXJhbHMuXG4gICAgJ2FkdWx0aG9vZCcsXG4gICAgJ2FkdmljZScsXG4gICAgJ2FnZW5kYScsXG4gICAgJ2FpZCcsXG4gICAgJ2FpcmNyYWZ0JyxcbiAgICAnYWxjb2hvbCcsXG4gICAgJ2FtbW8nLFxuICAgICdhbmFseXRpY3MnLFxuICAgICdhbmltZScsXG4gICAgJ2F0aGxldGljcycsXG4gICAgJ2F1ZGlvJyxcbiAgICAnYmlzb24nLFxuICAgICdibG9vZCcsXG4gICAgJ2JyZWFtJyxcbiAgICAnYnVmZmFsbycsXG4gICAgJ2J1dHRlcicsXG4gICAgJ2NhcnAnLFxuICAgICdjYXNoJyxcbiAgICAnY2hhc3NpcycsXG4gICAgJ2NoZXNzJyxcbiAgICAnY2xvdGhpbmcnLFxuICAgICdjb2QnLFxuICAgICdjb21tZXJjZScsXG4gICAgJ2Nvb3BlcmF0aW9uJyxcbiAgICAnY29ycHMnLFxuICAgICdkZWJyaXMnLFxuICAgICdkaWFiZXRlcycsXG4gICAgJ2RpZ2VzdGlvbicsXG4gICAgJ2VsaycsXG4gICAgJ2VuZXJneScsXG4gICAgJ2VxdWlwbWVudCcsXG4gICAgJ2V4Y3JldGlvbicsXG4gICAgJ2V4cGVydGlzZScsXG4gICAgJ2Zpcm13YXJlJyxcbiAgICAnZmxvdW5kZXInLFxuICAgICdmdW4nLFxuICAgICdnYWxsb3dzJyxcbiAgICAnZ2FyYmFnZScsXG4gICAgJ2dyYWZmaXRpJyxcbiAgICAnaGFyZHdhcmUnLFxuICAgICdoZWFkcXVhcnRlcnMnLFxuICAgICdoZWFsdGgnLFxuICAgICdoZXJwZXMnLFxuICAgICdoaWdoamlua3MnLFxuICAgICdob21ld29yaycsXG4gICAgJ2hvdXNld29yaycsXG4gICAgJ2luZm9ybWF0aW9uJyxcbiAgICAnamVhbnMnLFxuICAgICdqdXN0aWNlJyxcbiAgICAna3Vkb3MnLFxuICAgICdsYWJvdXInLFxuICAgICdsaXRlcmF0dXJlJyxcbiAgICAnbWFjaGluZXJ5JyxcbiAgICAnbWFja2VyZWwnLFxuICAgICdtYWlsJyxcbiAgICAnbWVkaWEnLFxuICAgICdtZXdzJyxcbiAgICAnbW9vc2UnLFxuICAgICdtdXNpYycsXG4gICAgJ211ZCcsXG4gICAgJ21hbmdhJyxcbiAgICAnbmV3cycsXG4gICAgJ29ubHknLFxuICAgICdwZXJzb25uZWwnLFxuICAgICdwaWtlJyxcbiAgICAncGxhbmt0b24nLFxuICAgICdwbGllcnMnLFxuICAgICdwb2xpY2UnLFxuICAgICdwb2xsdXRpb24nLFxuICAgICdwcmVtaXNlcycsXG4gICAgJ3JhaW4nLFxuICAgICdyZXNlYXJjaCcsXG4gICAgJ3JpY2UnLFxuICAgICdzYWxtb24nLFxuICAgICdzY2lzc29ycycsXG4gICAgJ3NlcmllcycsXG4gICAgJ3Nld2FnZScsXG4gICAgJ3NoYW1ibGVzJyxcbiAgICAnc2hyaW1wJyxcbiAgICAnc29mdHdhcmUnLFxuICAgICdzcGVjaWVzJyxcbiAgICAnc3RhZmYnLFxuICAgICdzd2luZScsXG4gICAgJ3Rlbm5pcycsXG4gICAgJ3RyYWZmaWMnLFxuICAgICd0cmFuc3BvcnRhdGlvbicsXG4gICAgJ3Ryb3V0JyxcbiAgICAndHVuYScsXG4gICAgJ3dlYWx0aCcsXG4gICAgJ3dlbGZhcmUnLFxuICAgICd3aGl0aW5nJyxcbiAgICAnd2lsZGViZWVzdCcsXG4gICAgJ3dpbGRsaWZlJyxcbiAgICAneW91JyxcbiAgICAvcG9rW2XDqV1tb24kL2ksXG4gICAgLy8gUmVnZXhlcy5cbiAgICAvW15hZWlvdV1lc2UkL2ksIC8vIFwiY2hpbmVzZVwiLCBcImphcGFuZXNlXCJcbiAgICAvZGVlciQvaSwgLy8gXCJkZWVyXCIsIFwicmVpbmRlZXJcIlxuICAgIC9maXNoJC9pLCAvLyBcImZpc2hcIiwgXCJibG93ZmlzaFwiLCBcImFuZ2VsZmlzaFwiXG4gICAgL21lYXNsZXMkL2ksXG4gICAgL29baXVdcyQvaSwgLy8gXCJjYXJuaXZvcm91c1wiXG4gICAgL3BveCQvaSwgLy8gXCJjaGlja3BveFwiLCBcInNtYWxscG94XCJcbiAgICAvc2hlZXAkL2lcbiAgXS5mb3JFYWNoKHBsdXJhbGl6ZS5hZGRVbmNvdW50YWJsZVJ1bGUpO1xuXG4gIHJldHVybiBwbHVyYWxpemU7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB2YXIgaGFzID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuXG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmIChoYXModHlwZVNwZWNzLCB0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBlcnIgPSBFcnJvcihcbiAgICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiAnICsgbG9jYXRpb24gKyAnIHR5cGUgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyAnICtcbiAgICAgICAgICAgICAgJ2l0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAnICsgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICsgJ2AuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yICYmICEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAnICtcbiAgICAgICAgICAgIGxvY2F0aW9uICsgJyBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJyArIHR5cGVvZiBlcnJvciArICcuICcgK1xuICAgICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArXG4gICAgICAgICAgICAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnRmFpbGVkICcgKyBsb2NhdGlvbiArICcgdHlwZTogJyArIGVycm9yLm1lc3NhZ2UgKyAoc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlc2V0cyB3YXJuaW5nIGNhY2hlIHdoZW4gdGVzdGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jaGVja1Byb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxudmFyIGhhcyA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuZnVuY3Rpb24gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBlbGVtZW50VHlwZTogY3JlYXRlRWxlbWVudFR5cGVUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgJ1VzZSBgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKClgIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAgICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICAgICAgICApO1xuICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgcHJvcCBvbiBgJyArIGNvbXBvbmVudE5hbWUgICsgJ2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlVHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFSZWFjdElzLmlzVmFsaWRFbGVtZW50VHlwZShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudCB0eXBlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnRzIHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBhcnJheSwgZ290ICcgKyBhcmd1bWVudHMubGVuZ3RoICsgJyBhcmd1bWVudHMuICcgK1xuICAgICAgICAgICAgJ0EgY29tbW9uIG1pc3Rha2UgaXMgdG8gd3JpdGUgb25lT2YoeCwgeSwgeikgaW5zdGVhZCBvZiBvbmVPZihbeCwgeSwgel0pLidcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gYXJyYXkuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzLCBmdW5jdGlvbiByZXBsYWNlcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBTdHJpbmcocHJvcFZhbHVlKSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAoaGFzKHByb3BWYWx1ZSwga2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJyArIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSArICcgYXQgaW5kZXggJyArIGkgKyAnLidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGZhbHN5IHZhbHVlIGNhbid0IGJlIGEgU3ltYm9sXG4gICAgaWYgKCFwcm9wVmFsdWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICAgIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbiAgZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gICAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbiAgLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG4gIGZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBwcm9wVmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJyArIHByb3BWYWx1ZTtcbiAgICB9XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgaXMgcG9zdGZpeGVkIHRvIGEgd2FybmluZyBhYm91dCBhbiBpbnZhbGlkIHR5cGUuXG4gIC8vIEZvciBleGFtcGxlLCBcInVuZGVmaW5lZFwiIG9yIFwib2YgdHlwZSBhcnJheVwiXG4gIGZ1bmN0aW9uIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuICdhbiAnICsgdHlwZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdyZWdleHAnOlxuICAgICAgICByZXR1cm4gJ2EgJyArIHR5cGU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuICBmdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gICAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICByZXR1cm4gQU5PTllNT1VTO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGNoZWNrUHJvcFR5cGVzO1xuICBSZWFjdFByb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGNoZWNrUHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG5cbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgZGV2ZWxvcG1lbnQgYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgdmFyIHRocm93T25EaXJlY3RBY2Nlc3MgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKShSZWFjdElzLmlzRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59IGVsc2Uge1xuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBwcm9kdWN0aW9uIGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMnKSgpO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7XG4iLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjEyLjBcbiAqIHJlYWN0LWlzLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG52YXIgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yO1xudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTsgLy8gVE9ETzogV2UgZG9uJ3QgdXNlIEFzeW5jTW9kZSBvciBDb25jdXJyZW50TW9kZSBhbnltb3JlLiBUaGV5IHdlcmUgdGVtcG9yYXJ5XG4vLyAodW5zdGFibGUpIEFQSXMgdGhhdCBoYXZlIGJlZW4gcmVtb3ZlZC4gQ2FuIHdlIHJlbW92ZSB0aGUgc3ltYm9scz9cblxudmFyIFJFQUNUX0FTWU5DX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmFzeW5jX21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbmN1cnJlbnRfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpIDogMHhlYWQwO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpIDogMHhlYWQxO1xudmFyIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlX2xpc3QnKSA6IDB4ZWFkODtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0O1xudmFyIFJFQUNUX0ZVTkRBTUVOVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mdW5kYW1lbnRhbCcpIDogMHhlYWQ1O1xudmFyIFJFQUNUX1JFU1BPTkRFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucmVzcG9uZGVyJykgOiAweGVhZDY7XG52YXIgUkVBQ1RfU0NPUEVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnNjb3BlJykgOiAweGVhZDc7XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgLy8gTm90ZTogaXRzIHR5cGVvZiBtaWdodCBiZSBvdGhlciB0aGFuICdzeW1ib2wnIG9yICdudW1iZXInIGlmIGl0J3MgYSBwb2x5ZmlsbC5cbiAgdHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1JFU1BPTkRFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1NDT1BFX1RZUEUpO1xufVxuXG4vKipcbiAqIEZvcmtlZCBmcm9tIGZianMvd2FybmluZzpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mYmpzL2Jsb2IvZTY2YmEyMGFkNWJlNDMzZWI1NDQyM2YyYjA5N2Q4MjkzMjRkOWRlNi9wYWNrYWdlcy9mYmpzL3NyYy9fX2ZvcmtzX18vd2FybmluZy5qc1xuICpcbiAqIE9ubHkgY2hhbmdlIGlzIHdlIHVzZSBjb25zb2xlLndhcm4gaW5zdGVhZCBvZiBjb25zb2xlLmVycm9yLFxuICogYW5kIGRvIG5vdGhpbmcgd2hlbiAnY29uc29sZScgaXMgbm90IHN1cHBvcnRlZC5cbiAqIFRoaXMgcmVhbGx5IHNpbXBsaWZpZXMgdGhlIGNvZGUuXG4gKiAtLS1cbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xudmFyIGxvd1ByaW9yaXR5V2FybmluZ1dpdGhvdXRTdGFjayA9IGZ1bmN0aW9uICgpIHt9O1xuXG57XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG5cbiAgbG93UHJpb3JpdHlXYXJuaW5nV2l0aG91dFN0YWNrID0gZnVuY3Rpb24gKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bsb3dQcmlvcml0eVdhcm5pbmdXaXRob3V0U3RhY2soY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZy5hcHBseSh2b2lkIDAsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgbG93UHJpb3JpdHlXYXJuaW5nV2l0aG91dFN0YWNrJDEgPSBsb3dQcmlvcml0eVdhcm5pbmdXaXRob3V0U3RhY2s7XG5cbmZ1bmN0aW9uIHR5cGVPZihvYmplY3QpIHtcbiAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCkge1xuICAgIHZhciAkJHR5cGVvZiA9IG9iamVjdC4kJHR5cGVvZjtcblxuICAgIHN3aXRjaCAoJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICB2YXIgdHlwZSA9IG9iamVjdC50eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFyICQkdHlwZW9mVHlwZSA9IHR5cGUgJiYgdHlwZS4kJHR5cGVvZjtcblxuICAgICAgICAgICAgc3dpdGNoICgkJHR5cGVvZlR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX1BST1ZJREVSX1RZUEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mVHlwZTtcblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufSAvLyBBc3luY01vZGUgaXMgZGVwcmVjYXRlZCBhbG9uZyB3aXRoIGlzQXN5bmNNb2RlXG5cbnZhciBBc3luY01vZGUgPSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG52YXIgQ29uY3VycmVudE1vZGUgPSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbnZhciBDb250ZXh0Q29uc3VtZXIgPSBSRUFDVF9DT05URVhUX1RZUEU7XG52YXIgQ29udGV4dFByb3ZpZGVyID0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbnZhciBFbGVtZW50ID0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xudmFyIEZvcndhcmRSZWYgPSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xudmFyIEZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbnZhciBMYXp5ID0gUkVBQ1RfTEFaWV9UWVBFO1xudmFyIE1lbW8gPSBSRUFDVF9NRU1PX1RZUEU7XG52YXIgUG9ydGFsID0gUkVBQ1RfUE9SVEFMX1RZUEU7XG52YXIgUHJvZmlsZXIgPSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xudmFyIFN0cmljdE1vZGUgPSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xudmFyIFN1c3BlbnNlID0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbnZhciBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IGZhbHNlOyAvLyBBc3luY01vZGUgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcblxuZnVuY3Rpb24gaXNBc3luY01vZGUob2JqZWN0KSB7XG4gIHtcbiAgICBpZiAoIWhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlKSB7XG4gICAgICBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IHRydWU7XG4gICAgICBsb3dQcmlvcml0eVdhcm5pbmdXaXRob3V0U3RhY2skMShmYWxzZSwgJ1RoZSBSZWFjdElzLmlzQXN5bmNNb2RlKCkgYWxpYXMgaGFzIGJlZW4gZGVwcmVjYXRlZCwgJyArICdhbmQgd2lsbCBiZSByZW1vdmVkIGluIFJlYWN0IDE3Ky4gVXBkYXRlIHlvdXIgY29kZSB0byB1c2UgJyArICdSZWFjdElzLmlzQ29uY3VycmVudE1vZGUoKSBpbnN0ZWFkLiBJdCBoYXMgdGhlIGV4YWN0IHNhbWUgQVBJLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkgfHwgdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRDb25zdW1lcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05URVhUX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRQcm92aWRlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9WSURFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNGb3J3YXJkUmVmKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZyYWdtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0xhenkob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTEFaWV9UWVBFO1xufVxuZnVuY3Rpb24gaXNNZW1vKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX01FTU9fVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUG9ydGFsKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BPUlRBTF9UWVBFO1xufVxuZnVuY3Rpb24gaXNQcm9maWxlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdHJpY3RNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N1c3BlbnNlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG59XG5cbmV4cG9ydHMudHlwZU9mID0gdHlwZU9mO1xuZXhwb3J0cy5Bc3luY01vZGUgPSBBc3luY01vZGU7XG5leHBvcnRzLkNvbmN1cnJlbnRNb2RlID0gQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLkNvbnRleHRDb25zdW1lciA9IENvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuQ29udGV4dFByb3ZpZGVyID0gQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5FbGVtZW50ID0gRWxlbWVudDtcbmV4cG9ydHMuRm9yd2FyZFJlZiA9IEZvcndhcmRSZWY7XG5leHBvcnRzLkZyYWdtZW50ID0gRnJhZ21lbnQ7XG5leHBvcnRzLkxhenkgPSBMYXp5O1xuZXhwb3J0cy5NZW1vID0gTWVtbztcbmV4cG9ydHMuUG9ydGFsID0gUG9ydGFsO1xuZXhwb3J0cy5Qcm9maWxlciA9IFByb2ZpbGVyO1xuZXhwb3J0cy5TdHJpY3RNb2RlID0gU3RyaWN0TW9kZTtcbmV4cG9ydHMuU3VzcGVuc2UgPSBTdXNwZW5zZTtcbmV4cG9ydHMuaXNWYWxpZEVsZW1lbnRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlO1xuZXhwb3J0cy5pc0FzeW5jTW9kZSA9IGlzQXN5bmNNb2RlO1xuZXhwb3J0cy5pc0NvbmN1cnJlbnRNb2RlID0gaXNDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuaXNDb250ZXh0Q29uc3VtZXIgPSBpc0NvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuaXNDb250ZXh0UHJvdmlkZXIgPSBpc0NvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuaXNFbGVtZW50ID0gaXNFbGVtZW50O1xuZXhwb3J0cy5pc0ZvcndhcmRSZWYgPSBpc0ZvcndhcmRSZWY7XG5leHBvcnRzLmlzRnJhZ21lbnQgPSBpc0ZyYWdtZW50O1xuZXhwb3J0cy5pc0xhenkgPSBpc0xhenk7XG5leHBvcnRzLmlzTWVtbyA9IGlzTWVtbztcbmV4cG9ydHMuaXNQb3J0YWwgPSBpc1BvcnRhbDtcbmV4cG9ydHMuaXNQcm9maWxlciA9IGlzUHJvZmlsZXI7XG5leHBvcnRzLmlzU3RyaWN0TW9kZSA9IGlzU3RyaWN0TW9kZTtcbmV4cG9ydHMuaXNTdXNwZW5zZSA9IGlzU3VzcGVuc2U7XG4gIH0pKCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJoZWxwZXJzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcImkxOG5cIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsaWRhdG9yc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ2YWx1ZU9iamVjdHNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJ3cFwiXVtcImhvb2tzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZlbmRvclwiXVtcImN1aWRcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJsb2Rhc2hcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmVuZG9yXCJdW1wibW9tZW50XCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
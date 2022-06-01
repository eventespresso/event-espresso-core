/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/data/model/assertions.js":
/*!*********************************************!*\
  !*** ./assets/src/data/model/assertions.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assertEntityHasKey": function() { return /* binding */ assertEntityHasKey; },
/* harmony export */   "assertImmutableObjectHasPath": function() { return /* binding */ assertImmutableObjectHasPath; },
/* harmony export */   "assertIsArray": function() { return /* binding */ assertIsArray; },
/* harmony export */   "assertIsMap": function() { return /* binding */ assertIsMap; },
/* harmony export */   "assertIsNotEmpty": function() { return /* binding */ assertIsNotEmpty; }
/* harmony export */ });
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

const assertEntityHasKey = function (key, entity) {
  let message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (message === '') {
    message = (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The provided entity (%s) does not have the given property (%s)', 'event_espresso'), entity, key);
  }

  if (!entity.hasOwnProperty(key)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__.Exception(message);
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

const assertImmutableObjectHasPath = function (path, immutable) {
  let message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (message === '') {
    message = (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The provided immutable object (%s) does not have the given path (%s)', 'event_espresso'), immutable, path);
  }

  if (!immutable.hasIn(path)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__.Exception(message);
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

const assertIsArray = function (items) {
  let message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (message === '') {
    message = (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The provided value is not an array.', 'event_espresso');
  }

  if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isArray)(items)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__.Exception(message);
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

const assertIsNotEmpty = function (items) {
  let message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (message === '') {
    message = (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The provided items must not be empty', 'event_espresso');
  }

  if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(items)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__.Exception(message);
  }
};
/**
 * Asserts whether the given value is a Map object.
 *
 * @param {*} item
 * @param {string} message
 * @throws { Exception }
 */

const assertIsMap = function (item) {
  let message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (message === '') {
    message = (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The provided item must be a Map object', 'event_espresso');
  }

  if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isMap)(item)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__.Exception(message);
  }
};

/***/ }),

/***/ "./assets/src/data/model/attendee/constants.js":
/*!*****************************************************!*\
  !*** ./assets/src/data/model/attendee/constants.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MODEL_NAME": function() { return /* binding */ MODEL_NAME; }
/* harmony export */ });
const MODEL_NAME = 'attendee';

/***/ }),

/***/ "./assets/src/data/model/attendee/index.js":
/*!*************************************************!*\
  !*** ./assets/src/data/model/attendee/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MODEL_NAME": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.MODEL_NAME; },
/* harmony export */   "defaultQueryData": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_0__.defaultQueryData; },
/* harmony export */   "getQueryString": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_0__.getQueryString; },
/* harmony export */   "mapOrderBy": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_0__.mapOrderBy; },
/* harmony export */   "orderByMap": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_0__.orderByMap; },
/* harmony export */   "queryDataTypes": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_0__.queryDataTypes; },
/* harmony export */   "whereConditions": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_0__.whereConditions; }
/* harmony export */ });
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/attendee/query.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/attendee/constants.js");



/***/ }),

/***/ "./assets/src/data/model/attendee/query.js":
/*!*************************************************!*\
  !*** ./assets/src/data/model/attendee/query.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultQueryData": function() { return /* binding */ defaultQueryData; },
/* harmony export */   "getQueryString": function() { return /* binding */ getQueryString; },
/* harmony export */   "mapOrderBy": function() { return /* binding */ mapOrderBy; },
/* harmony export */   "orderByMap": function() { return /* binding */ orderByMap; },
/* harmony export */   "queryDataTypes": function() { return /* binding */ queryDataTypes; },
/* harmony export */   "whereConditions": function() { return /* binding */ whereConditions; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");
/* harmony import */ var _registration_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../registration/constants */ "./assets/src/data/model/registration/constants.js");
/**
 * External imports
 */




const orderByMap = {
  id: 'ATT_ID',
  lastNameOnly: 'ATT_lname',
  firstNameOnly: 'ATT_fname',
  firstThenLastName: ['ATT_fname', 'ATT_lname'],
  lastThenFirstName: ['ATT_lname', 'ATT_fname']
};
/**
 * Described attributes for this model
 *
 * @type {{attributes: *}}
 */

const queryDataTypes = {
  forEventId: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
  forDatetimeId: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
  forTicketId: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
  forStatusId: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf(_registration_constants__WEBPACK_IMPORTED_MODULE_2__.REGISTRATION_STATUS_IDS),
  forRegistrationId: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
  showGravatar: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  queryData: prop_types__WEBPACK_IMPORTED_MODULE_3___default().shape({
    limit: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
    orderBy: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf(Object.keys(orderByMap)),
    order: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf(_base__WEBPACK_IMPORTED_MODULE_1__.ALLOWED_ORDER_VALUES)
  })
};
/**
 * Default attributes for this model
 *
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

const defaultQueryData = {
  queryData: {
    limit: 100,
    orderBy: 'lastThenFirstName',
    order: _base__WEBPACK_IMPORTED_MODULE_1__.QUERY_ORDER_ASC
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

const mapOrderBy = orderBy => {
  return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
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

const whereConditions = _ref => {
  let {
    forEventId = 0,
    forDatetimeId = 0,
    forTicketId = 0,
    forRegistrationId = 0,
    forStatusId = 'RAP',
    showGravatar = false
  } = _ref;
  const where = []; // ensure that entity IDs are integers

  forRegistrationId = parseInt(forRegistrationId, 10);
  forTicketId = parseInt(forTicketId, 10);
  forDatetimeId = parseInt(forDatetimeId, 10);
  forEventId = parseInt(forEventId, 10); // order of priority for provided arguments.

  if (forRegistrationId !== 0 && !isNaN(forRegistrationId)) {
    where.push(`where[Registration.REG_ID]=${forRegistrationId}`);
  } else if (forTicketId !== 0 && !isNaN(forTicketId)) {
    where.push(`where[Registration.Ticket.TKT_ID]=${forTicketId}`);
  } else if (forDatetimeId !== 0 && !isNaN(forDatetimeId)) {
    where.push(`where[Registration.Ticket.Datetime.DTT_ID]=${forDatetimeId}`);
  } else if (forEventId !== 0 && !isNaN(forEventId)) {
    where.push(`where[Registration.EVT_ID]=${forEventId}`);
  }

  if (_registration_constants__WEBPACK_IMPORTED_MODULE_2__.REGISTRATION_STATUS_IDS.includes(forStatusId)) {
    where.push(`where[Registration.Status.STS_ID]=${forStatusId}`);
  }

  if (showGravatar === true) {
    where.push('calculate=user_avatar');
  }

  return where.join('&');
};
/**
 * Return a query string for use by a REST request given a set of queryData.
 *
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */

const getQueryString = function () {
  let queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  queryData = { ...defaultQueryData.queryData,
    ...queryData
  };
  return (0,_base__WEBPACK_IMPORTED_MODULE_1__.getQueryString)(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/base-date-formatter.js":
/*!******************************************************!*\
  !*** ./assets/src/data/model/base-date-formatter.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertEntitiesDatesToMoment": function() { return /* binding */ convertEntitiesDatesToMoment; },
/* harmony export */   "convertEntityDatesToMoment": function() { return /* binding */ convertEntityDatesToMoment; },
/* harmony export */   "formatDatesOnEntities": function() { return /* binding */ formatDatesOnEntities; },
/* harmony export */   "formatDatesOnEntity": function() { return /* binding */ formatDatesOnEntity; },
/* harmony export */   "formatEntitiesDatesToMysql": function() { return /* binding */ formatEntitiesDatesToMysql; },
/* harmony export */   "formatEntitiesDatesToSite": function() { return /* binding */ formatEntitiesDatesToSite; },
/* harmony export */   "formatEntityDatesToMysql": function() { return /* binding */ formatEntityDatesToMysql; },
/* harmony export */   "formatEntityDatesToSite": function() { return /* binding */ formatEntityDatesToSite; }
/* harmony export */ });
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/helpers */ "@eventespresso/helpers");
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
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

const formatDatesOnEntities = function () {
  let entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_0__.DATE_TIME_FORMAT_ISO8601;
  let local = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(entities) || (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(entityDateFields)) {
    return entities;
  }

  const formattedEntities = [];
  entities.forEach(entity => {
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

const formatDatesOnEntity = function () {
  let entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_0__.DATE_TIME_FORMAT_ISO8601;
  let local = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  const newEntity = { ...entity
  };
  entityDateFields.forEach(dateField => {
    if (newEntity[dateField]) {
      newEntity[dateField] = _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_0__.formatDateString(newEntity[dateField], format, local);
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

const formatEntitiesDatesToMysql = function () {
  let entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let local = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return formatDatesOnEntities(entities, entityDateFields, _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_0__.DATE_TIME_FORMAT_MYSQL, local);
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

const formatEntityDatesToMysql = function () {
  let entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let local = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return formatDatesOnEntity(entity, entityDateFields, _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_0__.DATE_TIME_FORMAT_MYSQL, local);
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

const formatEntitiesDatesToSite = function () {
  let entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let local = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return formatDatesOnEntities(entities, entityDateFields, _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_0__.DATE_TIME_FORMAT_SITE, local);
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

const formatEntityDatesToSite = function () {
  let entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let local = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return formatDatesOnEntity(entity, entityDateFields, _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_0__.DATE_TIME_FORMAT_SITE, local);
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

const convertEntitiesDatesToMoment = function () {
  let entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(entities) || (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(entityDateFields)) {
    return entities;
  }

  const formattedEntities = [];
  entities.forEach(entity => {
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

const convertEntityDatesToMoment = function () {
  let entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let entityDateFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  const newEntity = { ...entity
  };
  entityDateFields.forEach(dateField => {
    if (newEntity[dateField]) {
      newEntity[dateField] = _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_0__.stringToMoment(newEntity[dateField]);
    }
  });
  return newEntity;
};

/***/ }),

/***/ "./assets/src/data/model/base.js":
/*!***************************************!*\
  !*** ./assets/src/data/model/base.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALLOWED_ORDER_VALUES": function() { return /* binding */ ALLOWED_ORDER_VALUES; },
/* harmony export */   "GREATER_THAN": function() { return /* binding */ GREATER_THAN; },
/* harmony export */   "GREATER_THAN_AND_EQUAL": function() { return /* binding */ GREATER_THAN_AND_EQUAL; },
/* harmony export */   "LESS_THAN": function() { return /* binding */ LESS_THAN; },
/* harmony export */   "LESS_THAN_AND_EQUAL": function() { return /* binding */ LESS_THAN_AND_EQUAL; },
/* harmony export */   "QUERY_ORDER_ASC": function() { return /* binding */ QUERY_ORDER_ASC; },
/* harmony export */   "QUERY_ORDER_DESC": function() { return /* binding */ QUERY_ORDER_DESC; },
/* harmony export */   "getQueryString": function() { return /* binding */ getQueryString; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

const QUERY_ORDER_ASC = 'ASC';
const QUERY_ORDER_DESC = 'DESC';
const ALLOWED_ORDER_VALUES = ['asc', 'desc', 'ASC', 'DESC'];
const GREATER_THAN = encodeURIComponent('>');
const LESS_THAN = encodeURIComponent('<');
const GREATER_THAN_AND_EQUAL = encodeURIComponent('>=');
const LESS_THAN_AND_EQUAL = encodeURIComponent('<=');
/**
 * Return a query string for use by a REST request given a set of queryData.
 *
 * @param { Object } queryData
 * @param {Function} whereConditions  A function for prepping the where
 * 										conditions from the queryData.
 * @param {Function} mapOrderBy		A function for mapping incoming order_by
 * 										strings to the value needed for the
 * 										query_string.
 * @return { string }  					Returns the query string.
 */

const getQueryString = function () {
  let queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let whereConditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => null;
  let mapOrderBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : orderBy => orderBy;
  const where = whereConditions(queryData);
  const {
    limit,
    order,
    orderBy,
    defaultWhereConditions
  } = queryData;
  const queryParams = [];

  if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(limit)) {
    queryParams.push(`limit=${limit}`);
  }

  if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(defaultWhereConditions)) {
    queryParams.push(`default_where_conditions=${defaultWhereConditions}`);
  }

  if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(mapOrderBy(orderBy))) {
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isArray)(mapOrderBy(orderBy))) {
      for (const field of mapOrderBy(orderBy)) {
        queryParams.push(`order_by[${field}]=${order}`);
      }
    } else {
      queryParams.push(`order=${order}`);
      queryParams.push(`order_by=${mapOrderBy(orderBy)}`);
    }
  }

  let queryString = queryParams.join('&');

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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHECKIN_STATUS_ID": function() { return /* binding */ CHECKIN_STATUS_ID; },
/* harmony export */   "CHECKIN_STATUS_IDS": function() { return /* binding */ CHECKIN_STATUS_IDS; },
/* harmony export */   "MODEL_NAME": function() { return /* binding */ MODEL_NAME; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

const MODEL_NAME = 'checkin';
const CHECKIN_STATUS_ID = {
  STATUS_CHECKED_OUT: false,
  STATUS_CHECKED_IN: true,
  STATUS_CHECKED_NEVER: 2
};
const CHECKIN_STATUS_IDS = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.values)(CHECKIN_STATUS_ID);

/***/ }),

/***/ "./assets/src/data/model/checkin/index.js":
/*!************************************************!*\
  !*** ./assets/src/data/model/checkin/index.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHECKIN_STATUS_ID": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.CHECKIN_STATUS_ID; },
/* harmony export */   "CHECKIN_STATUS_IDS": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.CHECKIN_STATUS_IDS; },
/* harmony export */   "MODEL_NAME": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.MODEL_NAME; },
/* harmony export */   "defaultQueryData": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.defaultQueryData; },
/* harmony export */   "getQueryString": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.getQueryString; },
/* harmony export */   "mapOrderBy": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.mapOrderBy; },
/* harmony export */   "optionsEntityMap": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.optionsEntityMap; },
/* harmony export */   "queryDataTypes": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.queryDataTypes; },
/* harmony export */   "whereConditions": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.whereConditions; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/checkin/constants.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/checkin/query.js");



/***/ }),

/***/ "./assets/src/data/model/checkin/query.js":
/*!************************************************!*\
  !*** ./assets/src/data/model/checkin/query.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultQueryData": function() { return /* binding */ defaultQueryData; },
/* harmony export */   "getQueryString": function() { return /* binding */ getQueryString; },
/* harmony export */   "mapOrderBy": function() { return /* binding */ mapOrderBy; },
/* harmony export */   "optionsEntityMap": function() { return /* binding */ optionsEntityMap; },
/* harmony export */   "queryDataTypes": function() { return /* binding */ queryDataTypes; },
/* harmony export */   "whereConditions": function() { return /* binding */ whereConditions; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../status */ "./assets/src/data/model/status/index.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/checkin/constants.js");
/**
 * External imports
 */



/**
 * Internal imports
 */



/**
 * Described attributes for this model
 *
 * @type {{attributes: *}}
 */

const queryDataTypes = {
  forDatetimeId: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().number),
  forEventId: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().number),
  forRegistrationId: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().number),
  forTicketId: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().number),
  forStatusId: prop_types__WEBPACK_IMPORTED_MODULE_4___default().oneOf(_constants__WEBPACK_IMPORTED_MODULE_3__.CHECKIN_STATUS_IDS),
  queryData: prop_types__WEBPACK_IMPORTED_MODULE_4___default().shape({
    limit: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().number),
    orderBy: prop_types__WEBPACK_IMPORTED_MODULE_4___default().oneOf(['CHK_ID', 'REG_ID', 'CHK_timestamp', 'DTT_ID']),
    order: prop_types__WEBPACK_IMPORTED_MODULE_4___default().oneOf(_base__WEBPACK_IMPORTED_MODULE_2__.ALLOWED_ORDER_VALUES)
  })
};
const optionsEntityMap = {
  default: () => {
    return [{
      label: (0,_status__WEBPACK_IMPORTED_MODULE_1__.prettyStatus)(_constants__WEBPACK_IMPORTED_MODULE_3__.CHECKIN_STATUS_ID.STATUS_CHECKED_OUT),
      value: _constants__WEBPACK_IMPORTED_MODULE_3__.CHECKIN_STATUS_ID.STATUS_CHECKED_OUT
    }, {
      label: (0,_status__WEBPACK_IMPORTED_MODULE_1__.prettyStatus)(_constants__WEBPACK_IMPORTED_MODULE_3__.CHECKIN_STATUS_ID.STATUS_CHECKED_IN),
      value: _constants__WEBPACK_IMPORTED_MODULE_3__.CHECKIN_STATUS_ID.STATUS_CHECKED_IN
    }];
  }
};
/**
 * Default attributes for this model
 *
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

const defaultQueryData = {
  queryData: {
    limit: 100,
    orderBy: 'CHK_timestamp',
    order: _base__WEBPACK_IMPORTED_MODULE_2__.QUERY_ORDER_DESC
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

const mapOrderBy = orderBy => {
  const orderByMap = {
    timestamp: 'CHK_timestamp',
    id: 'CHK_ID'
  };
  return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
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

const whereConditions = _ref => {
  let {
    forDatetimeId = 0,
    forEventId = 0,
    forRegistrationId = 0,
    forTicketId = 0,
    forStatusId = ''
  } = _ref;
  const where = [];
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
 *
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */

const getQueryString = function () {
  let queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  queryData = { ...defaultQueryData.queryData,
    ...queryData
  };
  return (0,_base__WEBPACK_IMPORTED_MODULE_2__.getQueryString)(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/datetime/constants.js":
/*!*****************************************************!*\
  !*** ./assets/src/data/model/datetime/constants.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DATETIME_STATUS_ID": function() { return /* binding */ DATETIME_STATUS_ID; },
/* harmony export */   "DATETIME_STATUS_IDS": function() { return /* binding */ DATETIME_STATUS_IDS; },
/* harmony export */   "MODEL_NAME": function() { return /* binding */ MODEL_NAME; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

const MODEL_NAME = 'datetime';
const DATETIME_STATUS_ID = {
  SOLD_OUT: 'DTS',
  ACTIVE: 'DTA',
  UPCOMING: 'DTU',
  POSTPONED: 'DTP',
  CANCELLED: 'DTC',
  EXPIRED: 'DTE',
  INACTIVE: 'DTI'
};
const DATETIME_STATUS_IDS = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.values)(DATETIME_STATUS_ID);

/***/ }),

/***/ "./assets/src/data/model/datetime/formatter.js":
/*!*****************************************************!*\
  !*** ./assets/src/data/model/datetime/formatter.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DATE_FIELDS": function() { return /* binding */ DATE_FIELDS; },
/* harmony export */   "prettyDateFromDateTime": function() { return /* binding */ prettyDateFromDateTime; }
/* harmony export */ });
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
 *
 * @type { string[] }
 */

const DATE_FIELDS = ['DTT_EVT_start', 'DTT_EVT_end'];
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

const formatters = {};
(0,lodash__WEBPACK_IMPORTED_MODULE_1__.forOwn)(_base_date_formatter__WEBPACK_IMPORTED_MODULE_0__, (implementation, functionName) => {
  formatters[functionName] = function () {
    for (var _len = arguments.length, incomingArgs = new Array(_len), _key = 0; _key < _len; _key++) {
      incomingArgs[_key] = arguments[_key];
    }

    const firstArg = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.pullAt)(incomingArgs, 0);
    return implementation(firstArg[0], DATE_FIELDS, ...incomingArgs);
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

const prettyDateFromDateTime = DateTimeEntity => {
  let content = '';

  if ((0,_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__.isModelEntityOfModel)(DateTimeEntity, 'datetime')) {
    if (DateTimeEntity.DTT_EVT_start.hasSame(DateTimeEntity.DTT_EVT_end, 'day')) {
      content += (0,_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__.allDateTimesAsString)(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__.SEPARATOR_SPACE_DASH_SPACE, DateTimeEntity.DTT_EVT_start.toFormat(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__.DATE_TIME_FORMAT_SITE), DateTimeEntity.DTT_EVT_end.toFormat(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__.TIME_FORMAT_SITE));
    } else {
      content += (0,_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__.allDateTimesAsString)(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__.SEPARATOR_SPACE_DASH_SPACE, DateTimeEntity.DTT_EVT_start.toFormat(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__.DATE_TIME_FORMAT_SITE), DateTimeEntity.DTT_EVT_end.toFormat(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__.DATE_TIME_FORMAT_SITE));
    }

    content = DateTimeEntity.DTT_name ? `${DateTimeEntity.DTT_name} (${content})` : content;
  }

  return content;
};
/* harmony default export */ __webpack_exports__["default"] = (formatters);

/***/ }),

/***/ "./assets/src/data/model/datetime/index.js":
/*!*************************************************!*\
  !*** ./assets/src/data/model/datetime/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DATETIME_STATUS_ID": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.DATETIME_STATUS_ID; },
/* harmony export */   "DATETIME_STATUS_IDS": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.DATETIME_STATUS_IDS; },
/* harmony export */   "DATE_FIELDS": function() { return /* reexport safe */ _formatter__WEBPACK_IMPORTED_MODULE_2__.DATE_FIELDS; },
/* harmony export */   "MODEL_NAME": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.MODEL_NAME; },
/* harmony export */   "defaultQueryData": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.defaultQueryData; },
/* harmony export */   "getQueryString": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.getQueryString; },
/* harmony export */   "mapOrderBy": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.mapOrderBy; },
/* harmony export */   "nowDateAndTime": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.nowDateAndTime; },
/* harmony export */   "prettyDateFromDateTime": function() { return /* reexport safe */ _formatter__WEBPACK_IMPORTED_MODULE_2__.prettyDateFromDateTime; },
/* harmony export */   "queryDataTypes": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.queryDataTypes; },
/* harmony export */   "whereConditions": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.whereConditions; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/datetime/constants.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/datetime/query.js");
/* harmony import */ var _formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formatter */ "./assets/src/data/model/datetime/formatter.js");




/***/ }),

/***/ "./assets/src/data/model/datetime/query.js":
/*!*************************************************!*\
  !*** ./assets/src/data/model/datetime/query.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultQueryData": function() { return /* binding */ defaultQueryData; },
/* harmony export */   "getQueryString": function() { return /* binding */ getQueryString; },
/* harmony export */   "mapOrderBy": function() { return /* binding */ mapOrderBy; },
/* harmony export */   "nowDateAndTime": function() { return /* binding */ nowDateAndTime; },
/* harmony export */   "queryDataTypes": function() { return /* binding */ queryDataTypes; },
/* harmony export */   "whereConditions": function() { return /* binding */ whereConditions; }
/* harmony export */ });
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");
/**
 * External imports
 */



/**
 * Internal dependencies
 */


const nowDateAndTime = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()();
/**
 * Described attributes for this model
 *
 * @type {{attributes: *}}
 */

const queryDataTypes = {
  queryData: prop_types__WEBPACK_IMPORTED_MODULE_3___default().shape({
    limit: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
    orderBy: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf(['DTT_name', 'DTT_ID', 'start_date', 'end_date']),
    order: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf(_base__WEBPACK_IMPORTED_MODULE_2__.ALLOWED_ORDER_VALUES),
    showExpired: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
    month: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().month)
  })
};
/**
 * Default attributes for this model
 *
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

const defaultQueryData = {
  queryData: {
    limit: 100,
    orderBy: 'start_date',
    order: _base__WEBPACK_IMPORTED_MODULE_2__.QUERY_ORDER_DESC,
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

const mapOrderBy = orderBy => {
  const orderByMap = {
    start_date: 'DTT_EVT_start',
    end_date: 'DTT_EVT_end'
  };
  return (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
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

const whereConditions = _ref => {
  let {
    forEventId = 0,
    showExpired = false,
    month = 'none'
  } = _ref;
  const where = [];

  if (!showExpired) {
    where.push('where[DTT_EVT_end**expired][]=' + _base__WEBPACK_IMPORTED_MODULE_2__.GREATER_THAN + '&where[DTT_EVT_end**expired][]=' + nowDateAndTime.local().format());
  }

  if (month && month !== 'none') {
    where.push('where[DTT_EVT_start][]=' + _base__WEBPACK_IMPORTED_MODULE_2__.GREATER_THAN_AND_EQUAL + '&where[DTT_EVT_start][]=' + moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().month(month).startOf('month').local().format());
    where.push('where[DTT_EVT_end][]=' + _base__WEBPACK_IMPORTED_MODULE_2__.LESS_THAN_AND_EQUAL + '&where[DTT_EVT_end][]=' + moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().month(month).endOf('month').local().format());
  }

  if (parseInt(forEventId, 10) !== 0) {
    where.push('where[Event.EVT_ID]=' + forEventId);
  }

  return where.join('&');
};
/**
 * Return a query string for use by a REST request given a set of queryData.
 *
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */

const getQueryString = function () {
  let queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  queryData = { ...defaultQueryData.queryData,
    ...queryData
  };
  return (0,_base__WEBPACK_IMPORTED_MODULE_2__.getQueryString)(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/default-model-state.js":
/*!******************************************************!*\
  !*** ./assets/src/data/model/default-model-state.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_CORE_STATE": function() { return /* binding */ DEFAULT_CORE_STATE; },
/* harmony export */   "DEFAULT_LISTS_STATE": function() { return /* binding */ DEFAULT_LISTS_STATE; },
/* harmony export */   "DEFAULT_SCHEMA_STATE": function() { return /* binding */ DEFAULT_SCHEMA_STATE; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! memize */ "./node_modules/memize/index.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(memize__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _endpoints_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./endpoints.js */ "./assets/src/data/model/endpoints.js");
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

const mapToObjectValues = modelNameEndpoints => {
  return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.mapValues)(modelNameEndpoints, function () {
    return {};
  });
};

const getDefaultModelEntitiesObject = memize__WEBPACK_IMPORTED_MODULE_1___default()(() => mapToObjectValues(_endpoints_js__WEBPACK_IMPORTED_MODULE_2__.endpoints));
/**
 * Provides the default state to be used by stores containing lists.
 *
 * @type { Object }
 */

const DEFAULT_LISTS_STATE = mapToObjectValues(_endpoints_js__WEBPACK_IMPORTED_MODULE_2__.endpoints);
/**
 * Provides the default state to be used by the core store.
 *
 * @type {{entities: {}, entityIds: {}, dirty: {}}}
 */

const DEFAULT_CORE_STATE = {
  entities: { ...getDefaultModelEntitiesObject()
  },
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
 *
 * @type {Object}
 */

const DEFAULT_SCHEMA_STATE = {
  schema: { ...getDefaultModelEntitiesObject()
  },
  factory: { ...getDefaultModelEntitiesObject()
  },
  relationEndpoints: { ...getDefaultModelEntitiesObject()
  },
  relationSchema: {}
};

/***/ }),

/***/ "./assets/src/data/model/endpoints.js":
/*!********************************************!*\
  !*** ./assets/src/data/model/endpoints.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyQueryString": function() { return /* binding */ applyQueryString; },
/* harmony export */   "baseRestRoute": function() { return /* binding */ baseRestRoute; },
/* harmony export */   "endpoints": function() { return /* binding */ endpoints; },
/* harmony export */   "getEndpoint": function() { return /* binding */ getEndpoint; },
/* harmony export */   "stripBaseRouteFromUrl": function() { return /* binding */ stripBaseRouteFromUrl; }
/* harmony export */ });
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

const {
  collection_endpoints: endpoints = {},
  base_rest_route: baseRestRoute
} = _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__.data.paths;
/**
 * Retrieves the endpoint for the provided model.
 *
 * @param {string} modelName  What model to retrieve the endpoint for.
 * @return {string}  The endpoint for the provided model.
 * @throws {Exception}
 */

const getEndpoint = modelName => {
  (0,_assertions__WEBPACK_IMPORTED_MODULE_1__.assertEntityHasKey)(modelName, endpoints);
  return endpoints[modelName];
};
/**
 * Applies the provided queryString to the endpoint for the provided model name.
 *
 * @param {string} modelName  What model the final string is for.
 * @param {string} queryString  The query being appended to the endpoint.
 * @return {string} The final assembled query string.
 */

const applyQueryString = function (modelName) {
  let queryString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return queryString !== '' ? getEndpoint(modelName) + '?' + queryString : getEndpoint(modelName);
};
/**
 * Strips the base_rest_route (i.e. https://myurl.com/wp-json/) from the provided
 * url string.
 *
 * @param {string} url
 * @return {string} the url with the base rest route removed.
 */

const stripBaseRouteFromUrl = url => {
  return url.replace(baseRestRoute, '');
};

/***/ }),

/***/ "./assets/src/data/model/entity-factory/assertions.js":
/*!************************************************************!*\
  !*** ./assets/src/data/model/entity-factory/assertions.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assertValidFieldAndValueAgainstSchema": function() { return /* binding */ assertValidFieldAndValueAgainstSchema; },
/* harmony export */   "assertValidSchema": function() { return /* binding */ assertValidSchema; },
/* harmony export */   "assertValidSchemaFieldProperties": function() { return /* binding */ assertValidSchemaFieldProperties; },
/* harmony export */   "assertValidValueForPreparedField": function() { return /* binding */ assertValidValueForPreparedField; },
/* harmony export */   "maybeAssertValueObject": function() { return /* binding */ maybeAssertValueObject; }
/* harmony export */ });
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

const maybeAssertValueObject = (fieldName, fieldValue, schema) => {
  if ((0,_booleans__WEBPACK_IMPORTED_MODULE_5__.isDateTimeField)(fieldName, schema)) {
    _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_4__.ServerDateTime.assertIsDateTime(fieldValue);
  }

  if ((0,_booleans__WEBPACK_IMPORTED_MODULE_5__.isMoneyField)(fieldName, schema)) {
    _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_4__.Money.assertMoney(fieldValue);
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

const assertValidSchema = schema => {
  if (!(0,_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__.isSchema)(schema)) {
    throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__.InvalidSchema('This is an invalid schema for a model.');
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

const assertValidSchemaFieldProperties = (modelName, fieldName, schema) => {
  if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(schema[fieldName])) {
    throw new TypeError((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)('The given "%s" fieldName does not have a defined schema for the model "%s"', fieldName, modelName));
  }

  if (schema[fieldName].type === 'object') {
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(schema[fieldName].properties)) {
      throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__.InvalidSchema((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)('The schema for the field %s on the model %s is of type "object" but does not have a properties property.', fieldName, modelName));
    }

    if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(schema[fieldName].properties.raw)) {
      throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__.InvalidSchema((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)('The schema for the field %s on the model %s is of type "object" but does not have a raw property in it\'s "properties" property.', fieldName, modelName));
    }

    if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(schema[fieldName].properties.raw.type)) {
      throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__.InvalidSchema((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)('The schema for the field %s on the model %s is of type "object" and has a properties.raw property, however there is no "type" defined for the raw property.', fieldName, modelName));
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

const assertValidValueForPreparedField = (fieldName, fieldValue, instance) => {
  const {
    schema
  } = instance;
  let isValid = (0,_validators__WEBPACK_IMPORTED_MODULE_6__.isShallowValidValueForField)(fieldName, fieldValue, schema);

  if (!isValid && schema[fieldName].type === 'object' && schema[fieldName].properties) {
    isValid = schema[fieldName].properties.raw.enum ? (0,_validators__WEBPACK_IMPORTED_MODULE_6__.validateEnumType)(schema[fieldName].properties.raw.type, schema[fieldName].properties.raw.enum, fieldValue) : (0,_validators__WEBPACK_IMPORTED_MODULE_6__.validateType)(schema[fieldName].properties.raw.type, (0,_extractors__WEBPACK_IMPORTED_MODULE_7__.maybeConvertFromValueObjectWithAssertions)(fieldName, fieldValue, schema));

    if (!isValid) {
      throw new TypeError((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)('The given "%1$s" field  is not valid for the defined schema.  It\'s `raw` property Value (%2$s) is not the correct expected type (%3$s).', fieldName, fieldValue, schema[fieldName].properties.raw.type));
    }
  }

  if (!isValid) {
    throw new TypeError((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)('The given "%1$s" field\'s Value (%2$s) is not valid for the defined schema type (%3$s).', fieldName, fieldValue, schema[fieldName].type));
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

const assertValidFieldAndValueAgainstSchema = (modelName, fieldName, fieldValue, instance) => {
  const schema = instance.schema;
  const validationType = (0,_validators__WEBPACK_IMPORTED_MODULE_6__.validateTypeForField)(fieldName, instance);
  assertValidSchemaFieldProperties(modelName, fieldName, schema);
  let isValid = (0,_validators__WEBPACK_IMPORTED_MODULE_6__.isShallowValidValueForField)(fieldName, fieldValue, schema, false); // account for fieldName fieldValues that have property schema. For Model
  // Entities, only the VALIDATE_TYPE property is cared about.

  if (schema[fieldName].type === 'object' && schema[fieldName].properties) {
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(fieldValue[validationType])) {
      throw new TypeError((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)('The given "%1$s" value is not valid for the defined schema. It must be an object and it must have a `%2$s` key.', fieldName, validationType));
    }

    isValid = schema[fieldName].properties[validationType].enum ? (0,_validators__WEBPACK_IMPORTED_MODULE_6__.validateEnumType)(schema[fieldName].properties[validationType].type, schema[fieldName].properties.raw.enum, fieldValue[validationType]) : (0,_validators__WEBPACK_IMPORTED_MODULE_6__.validateType)(schema[fieldName].properties[validationType].type, fieldValue[validationType]);

    if (!isValid) {
      throw new TypeError((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)('The given "%1$s" value is not valid for the defined schema.  It\'s `%2$s` property value (%3$s) is not the correct expected type (%4$s).', fieldName, validationType, fieldValue, schema[fieldName].properties[validationType].type));
    }
  }

  if (!isValid) {
    throw new TypeError((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)('The given "%1$s" field\'s value (%2$s) is not valid for the defined schema type (%3$s).', fieldName, fieldValue, schema[fieldName].type));
  }
};

/***/ }),

/***/ "./assets/src/data/model/entity-factory/base-entity.js":
/*!*************************************************************!*\
  !*** ./assets/src/data/model/entity-factory/base-entity.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! memize */ "./node_modules/memize/index.js");
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(memize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assertions */ "./assets/src/data/model/entity-factory/assertions.js");
/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./create */ "./assets/src/data/model/entity-factory/create.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/entity-factory/constants.js");


let _PRIVATE_PROPERTIES$S, _PRIVATE_PROPERTIES$V;

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

_PRIVATE_PROPERTIES$S = _constants__WEBPACK_IMPORTED_MODULE_5__.PRIVATE_PROPERTIES.SAVE_STATE;
_PRIVATE_PROPERTIES$V = _constants__WEBPACK_IMPORTED_MODULE_5__.PRIVATE_PROPERTIES.VALIDATE_TYPES;

class BaseEntity {
  /**
   * Constructor for Base Entity
   *
   * @param {string} modelName
   * @param {Object} entityFieldsAndValues
   * @param {Object} schema
   * @param {Array}fieldPrefixes
   * @param {boolean} isNew
   */
  constructor(modelName, entityFieldsAndValues, schema) {
    let fieldPrefixes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    let isNew = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _PRIVATE_PROPERTIES$S, _constants__WEBPACK_IMPORTED_MODULE_5__.SAVE_STATE.CLEAN);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _PRIVATE_PROPERTIES$V, {});

    (0,_assertions__WEBPACK_IMPORTED_MODULE_3__.assertValidSchema)(schema);
    fieldPrefixes = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isArray)(fieldPrefixes) ? fieldPrefixes : [];
    (0,_create__WEBPACK_IMPORTED_MODULE_4__.createGetter)(this, 'fieldPrefixes', fieldPrefixes);
    (0,_create__WEBPACK_IMPORTED_MODULE_4__.createGetter)(this, 'schema', schema.properties);
    (0,_create__WEBPACK_IMPORTED_MODULE_4__.setSaveState)(this, isNew ? _constants__WEBPACK_IMPORTED_MODULE_5__.SAVE_STATE.NEW : _constants__WEBPACK_IMPORTED_MODULE_5__.SAVE_STATE.CLEAN);
    (0,_create__WEBPACK_IMPORTED_MODULE_4__.createGetter)(this, 'modelName', modelName);
    (0,_create__WEBPACK_IMPORTED_MODULE_4__.createGetter)(this, 'originalFieldsAndValues', entityFieldsAndValues);
    (0,_create__WEBPACK_IMPORTED_MODULE_4__.createGetter)(this, 'fieldsToPersistOnInsert', new Set(Object.keys(entityFieldsAndValues)));
    (0,_create__WEBPACK_IMPORTED_MODULE_4__.createEntityGettersAndSetters)(this);
    (0,_create__WEBPACK_IMPORTED_MODULE_4__.createPersistingGettersAndSetters)(this);
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


  get saveState() {
    return this[_constants__WEBPACK_IMPORTED_MODULE_5__.PRIVATE_PROPERTIES.SAVE_STATE];
  }
  /**
   * Whether the current save state is SAVE_STATE.NEW
   *
   * @return {boolean}  True means SAVE_STATE.NEW is the save state.
   */


  get isNew() {
    return this.saveState === _constants__WEBPACK_IMPORTED_MODULE_5__.SAVE_STATE.NEW;
  }
  /**
   * Whether the current save state is SAVE_STATE.DIRTY
   *
   * @return {boolean}  True means SAVE_STATE.DIRTY is the save state.
   */


  get isDirty() {
    return this.saveState === _constants__WEBPACK_IMPORTED_MODULE_5__.SAVE_STATE.DIRTY;
  }
  /**
   * Whether the current save state is SAVE_STATE.CLEAN
   *
   * @return {boolean}  True means SAVE_STATE.CLEAN is the save state.
   */


  get isClean() {
    return this.saveState === _constants__WEBPACK_IMPORTED_MODULE_5__.SAVE_STATE.CLEAN;
  }
  /**
   * Whether the entity has any password protected fields.
   *
   * @return {boolean} True means it does, false means it doesn't.
   */


  get isPasswordProtected() {
    return this.protectedFields.length > 0;
  }
  /**
   * Whether the given fieldName is a password protected field.
   *
   * @return {function(string): boolean}  Returns a function that can be used
   * to check if the given field name is a protected field in this entity.
   */


  get isFieldPasswordProtected() {
    return fieldName => this.protectedFields.indexOf(fieldName) > -1;
  }
  /**
   * Used to clone the current entity object.  This results in an instance of
   * BaseEntity that is equivalent as this current instance (except it will
   * have a new generated id).
   *
   * @return {BaseEntity} A new instance of BaseEntity
   */


  get clone() {
    var _this = this;

    return function () {
      let keepId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      const createFactory = memize__WEBPACK_IMPORTED_MODULE_2___default()(() => createEntityFactory(_this.modelName, {
        $schema: {},
        properties: _this.schema
      }, _this.fieldPrefixes));
      const factory = createFactory();
      const newEntity = factory.createNew(_this.forClone);

      if (keepId) {
        newEntity.id = _this.id;
        (0,_create__WEBPACK_IMPORTED_MODULE_4__.setSaveState)(newEntity, _this.saveState, true);
      }

      return newEntity;
    };
  }

}
/**
 * A function that gives a class the provided name
 * (and optionally extends the provided object).
 *
 * @param {string} name
 * @param {Object} extendedClass
 * @return {Function} A function
 */


(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(BaseEntity, "name", 'BaseEntity');

const nameClass = (name, extendedClass) => {
  return class extends extendedClass {
    static get name() {
      return name;
    }

  };
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


const createEntityFactory = function (modelName, schema) {
  let fieldPrefixes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  const Entity = nameClass((0,lodash__WEBPACK_IMPORTED_MODULE_1__.upperFirst)((0,lodash__WEBPACK_IMPORTED_MODULE_1__.camelCase)(modelName)), BaseEntity);
  return {
    /**
     * Exposes modelName so client code can derive what model this factory
     * is for from any given factory.
     *
     * @type string
     */
    modelName,

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
    createNew: fieldsAndValues => new Entity(modelName, fieldsAndValues, schema, fieldPrefixes, true),

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
    fromExisting: fieldsAndValues => new Entity(modelName, fieldsAndValues, schema, fieldPrefixes)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (createEntityFactory);

/***/ }),

/***/ "./assets/src/data/model/entity-factory/booleans.js":
/*!**********************************************************!*\
  !*** ./assets/src/data/model/entity-factory/booleans.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasEnumProperty": function() { return /* binding */ hasEnumProperty; },
/* harmony export */   "hasFormatProperty": function() { return /* binding */ hasFormatProperty; },
/* harmony export */   "hasPrettyProperty": function() { return /* binding */ hasPrettyProperty; },
/* harmony export */   "hasRawProperty": function() { return /* binding */ hasRawProperty; },
/* harmony export */   "hasRenderedProperty": function() { return /* binding */ hasRenderedProperty; },
/* harmony export */   "isDateTimeField": function() { return /* binding */ isDateTimeField; },
/* harmony export */   "isEntityField": function() { return /* binding */ isEntityField; },
/* harmony export */   "isEnumField": function() { return /* binding */ isEnumField; },
/* harmony export */   "isMoneyField": function() { return /* binding */ isMoneyField; },
/* harmony export */   "isPrimaryKeyField": function() { return /* binding */ isPrimaryKeyField; },
/* harmony export */   "isReadOnly": function() { return /* binding */ isReadOnly; },
/* harmony export */   "isUTCDateTimeField": function() { return /* binding */ isUTCDateTimeField; },
/* harmony export */   "isValueObjectField": function() { return /* binding */ isValueObjectField; }
/* harmony export */ });
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

const hasRawProperty = value => (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value) && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(value.raw);
/**
 * Indicates whether the provided value has a "pretty" property.
 *
 * @param {*} value
 * @return {*} True if the value is a plain object and has a `pretty` property.
 */

const hasPrettyProperty = value => (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value) && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(value.pretty);
/**
 * Indicates whether the provided value has a "rendered" property.
 *
 * @param {*} value
 * @return {boolean} True if the value is a plain object and has a `rendered` property.
 */

const hasRenderedProperty = value => (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value) && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(value.rendered);
/**
 * Indicates whether the provided value has a "format" property.
 *
 * @param {*} value
 * @return {boolean} True if the value is a plain object and has a `format` property.
 */

const hasFormatProperty = value => (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value) && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(value.format);
/**
 * Indicates whether the provided value has a "enum" property.
 *
 * @param {*} value
 * @return {boolean} True if the value is a plain object and has an enum
 * property.
 */

const hasEnumProperty = value => (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value) && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(value.enum);
/**
 * Indicates whether the provided value is a "value object" field.
 *
 * @param {string} field
 * @param {Object} schema
 * @return {boolean} True if the value is a value object field.
 */

const isValueObjectField = (field, schema) => {
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

const isDateTimeField = (field, schema) => !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(schema[field]) && hasFormatProperty(schema[field]) && schema[field].format === 'date-time';
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

const isUTCDateTimeField = function (dateTimeFieldName) {
  let schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
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

const isPrimaryKeyField = (fieldName, schema) => !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(schema[fieldName]) && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(schema[fieldName].primary_key);
/**
 * Returns whether the provided field represents a readonly field using the
 * provided schema.
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {boolean}  True means it is a readonly field.
 */

const isReadOnly = (fieldName, schema) => !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(schema[fieldName]) && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(schema[fieldName].readonly) && schema[fieldName].readonly;
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

const isEntityField = (fieldName, schema) => !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(schema[fieldName]) && (!isReadOnly(fieldName, schema) || isPrimaryKeyField(fieldName, schema)) && !isUTCDateTimeField(fieldName) && fieldName !== '_protected';
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

const isMoneyField = (fieldName, schema) => !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(schema[fieldName]) && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(schema[fieldName].properties) && hasPrettyProperty(schema[fieldName].properties) && hasFormatProperty(schema[fieldName].properties.pretty) && schema[fieldName].properties.pretty.format === 'money';
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

const isEnumField = (fieldName, schema) => !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(schema[fieldName]) && hasEnumProperty(schema[fieldName]) && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(schema[fieldName].enum.length) && schema[fieldName].enum.length > 0;

/***/ }),

/***/ "./assets/src/data/model/entity-factory/constants.js":
/*!***********************************************************!*\
  !*** ./assets/src/data/model/entity-factory/constants.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MODEL_PREFIXES": function() { return /* binding */ MODEL_PREFIXES; },
/* harmony export */   "PRIVATE_PROPERTIES": function() { return /* binding */ PRIVATE_PROPERTIES; },
/* harmony export */   "SAVE_STATE": function() { return /* binding */ SAVE_STATE; },
/* harmony export */   "VALIDATE_TYPE": function() { return /* binding */ VALIDATE_TYPE; }
/* harmony export */ });
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
 * @type {{CLEAN: symbol, NEW: symbol, DIRTY: symbol}}
 */

const SAVE_STATE = {
  CLEAN: Symbol('Entity is persisted.'),
  NEW: Symbol('Entity is new.'),
  DIRTY: Symbol('Existing entity has changes and needs persisted.')
};
/**
 * Validation types are for schema's that have value variations.
 *
 * @type {{RAW: string, RENDERED: string, PRETTY: string}}
 */

const VALIDATE_TYPE = {
  RAW: 'raw',
  RENDERED: 'rendered',
  PRETTY: 'pretty'
};
/**
 * Private properties used internally by the Base Entity Class
 *
 * @type {{saveState: boolean}}
 */

const PRIVATE_PROPERTIES = {
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

const MODEL_PREFIXES = modelName => {
  const prefixMap = (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.applyFilters)('FHEE__ENTITY_FACTORY__CONSTANTS__MODEL_PREFIXES', {
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
  return !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(prefixMap[modelName]) ? prefixMap[modelName] : [];
};

/***/ }),

/***/ "./assets/src/data/model/entity-factory/create.js":
/*!********************************************************!*\
  !*** ./assets/src/data/model/entity-factory/create.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAliasGetter": function() { return /* binding */ createAliasGetter; },
/* harmony export */   "createAliasGetterAndSetter": function() { return /* binding */ createAliasGetterAndSetter; },
/* harmony export */   "createAliasGetterAndSetterForField": function() { return /* binding */ createAliasGetterAndSetterForField; },
/* harmony export */   "createAliasGetterForField": function() { return /* binding */ createAliasGetterForField; },
/* harmony export */   "createCallbackGetter": function() { return /* binding */ createCallbackGetter; },
/* harmony export */   "createEntityGettersAndSetters": function() { return /* binding */ createEntityGettersAndSetters; },
/* harmony export */   "createFluentSetter": function() { return /* binding */ createFluentSetter; },
/* harmony export */   "createGetter": function() { return /* binding */ createGetter; },
/* harmony export */   "createGetterAndSetter": function() { return /* binding */ createGetterAndSetter; },
/* harmony export */   "createPersistingGettersAndSetters": function() { return /* binding */ createPersistingGettersAndSetters; },
/* harmony export */   "createPrimaryKeyFieldGetters": function() { return /* binding */ createPrimaryKeyFieldGetters; },
/* harmony export */   "createRawEntityGettersSetters": function() { return /* binding */ createRawEntityGettersSetters; },
/* harmony export */   "createRenderedGetters": function() { return /* binding */ createRenderedGetters; },
/* harmony export */   "setCalculatedFieldAndValues": function() { return /* binding */ setCalculatedFieldAndValues; },
/* harmony export */   "setFieldToPersist": function() { return /* binding */ setFieldToPersist; },
/* harmony export */   "setRelationsResource": function() { return /* binding */ setRelationsResource; },
/* harmony export */   "setResources": function() { return /* binding */ setResources; },
/* harmony export */   "setSaveState": function() { return /* binding */ setSaveState; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cuid */ "cuid");
/* harmony import */ var cuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cuid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assertions */ "./assets/src/data/model/entity-factory/assertions.js");
/* harmony import */ var _extractors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./extractors */ "./assets/src/data/model/entity-factory/extractors.js");
/* harmony import */ var _booleans__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./booleans */ "./assets/src/data/model/entity-factory/booleans.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/entity-factory/constants.js");
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

const createGetter = function (instance, fieldName, fieldValue) {
  let opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  Object.defineProperty(instance, fieldName, {
    get() {
      return fieldValue;
    },

    ...opts
  });
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

const createCallbackGetter = function (instance, propertyName, callBack) {
  let opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  Object.defineProperty(instance, propertyName, {
    get() {
      return callBack(instance);
    },

    ...opts
  });
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

const createGetterAndSetter = function (instance, fieldName, initialFieldValue) {
  let opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  let propertyValue = initialFieldValue;
  Object.defineProperty(instance, fieldName, {
    get() {
      return propertyValue;
    },

    set(receivedValue) {
      const isPrimaryField = (0,_booleans__WEBPACK_IMPORTED_MODULE_5__.isPrimaryKeyField)(fieldName, instance.schema);

      if (!instance.isNew && isPrimaryField) {
        return;
      }

      (0,_assertions__WEBPACK_IMPORTED_MODULE_3__.assertValidValueForPreparedField)(fieldName, receivedValue, instance);

      if (!isPrimaryField) {
        setSaveState(instance, _constants__WEBPACK_IMPORTED_MODULE_6__.SAVE_STATE.DIRTY);
        setFieldToPersist(instance, fieldName);
      }

      propertyValue = receivedValue;
    },

    ...opts
  });
};
/**
 * A getter and setter creator for an field alias.
 *
 * @param {Object} instance
 * @param {string} originalFieldName
 * @param {string} aliasFieldName
 * @param {Object} opts
 */

const createAliasGetterAndSetter = function (instance, originalFieldName, aliasFieldName) {
  let opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (originalFieldName !== aliasFieldName) {
    Object.defineProperty(instance, aliasFieldName, {
      get() {
        return instance[originalFieldName];
      },

      set(receivedValue) {
        return instance[originalFieldName] = receivedValue;
      },

      ...opts
    });
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

const createAliasGetter = function (instance, originalFieldName, aliasFieldName) {
  let opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (originalFieldName !== aliasFieldName) {
    Object.defineProperty(instance, aliasFieldName, {
      get() {
        return instance[originalFieldName];
      },

      ...opts
    });
  }
};
/**
 * Creates a fluent setter on the provided instance for the given field name.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {Object} opts  Options for Object.defineProperty
 */

const createFluentSetter = function (instance, fieldName) {
  let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.defineProperty(instance, 'set' + (0,lodash__WEBPACK_IMPORTED_MODULE_0__.upperFirst)(fieldName), {
    get() {
      return receivedValue => {
        instance[fieldName] = receivedValue;
        return instance;
      };
    },

    ...opts
  });
};
/**
 * Creates initial getters and setters for entities on the provided entity
 * instance using the given data.
 *
 * @param {Object} instance
 * keys on instance.
 */

const createEntityGettersAndSetters = instance => {
  const primaryKeys = [];
  (0,lodash__WEBPACK_IMPORTED_MODULE_0__.forEach)(instance.originalFieldsAndValues, (fieldValue, fieldName) => {
    const isPrimaryKey = (0,_booleans__WEBPACK_IMPORTED_MODULE_5__.isPrimaryKeyField)(fieldName, instance.schema);
    setValidateTypeForField(instance, fieldName, fieldValue);

    if ((0,_booleans__WEBPACK_IMPORTED_MODULE_5__.isEntityField)(fieldName, instance.schema)) {
      if (instance.isNew) {
        (0,_assertions__WEBPACK_IMPORTED_MODULE_3__.assertValidValueForPreparedField)(fieldName, fieldValue, instance);
      } else {
        (0,_assertions__WEBPACK_IMPORTED_MODULE_3__.assertValidFieldAndValueAgainstSchema)(instance.modelName, fieldName, fieldValue, instance);
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

const populateProtectedFieldsProperty = (instance, protectedFields) => {
  // get any calculated protected fields.
  const calculatedFields = instance.originalFieldsAndValues._calculated_fields || {};

  if (calculatedFields._protected && (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isArray)(calculatedFields._protected)) {
    protectedFields = [...protectedFields, ...calculatedFields._protected];
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


const populatePrimaryKeys = instance => {
  if (!instance.isNew) {
    return;
  }

  const primaryKeys = (0,_extractors__WEBPACK_IMPORTED_MODULE_4__.getPrimaryKeyFieldsFromSchema)(instance);
  (0,lodash__WEBPACK_IMPORTED_MODULE_0__.forEach)(primaryKeys, (schemaProperties, schemaField) => {
    // always delete and override what is existing.
    if (instance[schemaField]) {
      delete instance[schemaField];
    }

    createGetterAndSetter(instance, schemaField, cuid__WEBPACK_IMPORTED_MODULE_1___default()(), {
      configurable: true,
      enumerable: true
    });
    createAliasGetterAndSetterForField(instance, schemaField);
  });
  createPrimaryKeyFieldGetters(instance, (0,lodash__WEBPACK_IMPORTED_MODULE_0__.keys)(primaryKeys));
};
/**
 * Sets the validate type for a field property.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {*} fieldValue
 */


const setValidateTypeForField = (instance, fieldName, fieldValue) => {
  instance[_constants__WEBPACK_IMPORTED_MODULE_6__.PRIVATE_PROPERTIES.VALIDATE_TYPES][fieldName] = (0,_extractors__WEBPACK_IMPORTED_MODULE_4__.deriveValidateTypeForField)(fieldName, fieldValue, instance.schema);
};
/**
 *  Populates missing fields and values using defaults provided by schema.  If
 *  schema doesn't provide a default then this will populate the field with a
 *  default value that matches the type.
 *
 * @param {Object} instance
 */


const populateMissingFields = instance => {
  if (typeof instance.protectedFields === 'undefined') {
    populateProtectedFieldsProperty(instance, []);
  }

  if (!instance.isNew) {
    return;
  }

  (0,lodash__WEBPACK_IMPORTED_MODULE_0__.forEach)((0,_extractors__WEBPACK_IMPORTED_MODULE_4__.getEntityFieldsFromSchema)(instance), (schemaProperties, fieldName) => {
    if (typeof instance[fieldName] === 'undefined' && !(0,_booleans__WEBPACK_IMPORTED_MODULE_5__.isPrimaryKeyField)(fieldName, instance.schema)) {
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


const forClone = instance => {
  return (0,_extractors__WEBPACK_IMPORTED_MODULE_4__.getBaseFieldsAndValuesForCloning)(instance);
};
/**
 * Returns a plain object of the entity fields and values from this entity
 * instance prepared for use in an update request.
 *
 * @param {Object} instance
 * @return {Object} Plain object of field:value pairs.
 */


const forUpdate = instance => {
  return (0,_extractors__WEBPACK_IMPORTED_MODULE_4__.getBaseFieldsAndValuesForPersisting)(instance);
};
/**
 * Returns a plain object of the entity fields and values from this entity
 * instance prepared for use in an insert request.
 *
 * @param {Object} instance
 * @return {Object} Plain object of field:value pairs.
 */


const forInsert = instance => {
  const entityValues = (0,_extractors__WEBPACK_IMPORTED_MODULE_4__.getBaseFieldsAndValuesForPersisting)(instance, true);
  instance.primaryKeys.forEach(primaryKey => {
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


const forPersist = instance => {
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


const createPersistingGettersAndSetters = instance => {
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

const setInitialEntityFieldsAndValues = function (instance, fieldName, fieldValue) {
  let isPrimaryKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(fieldValue)) {
    fieldValue = (0,_extractors__WEBPACK_IMPORTED_MODULE_4__.getDefaultValueForField)(fieldName, instance.schema);
    setValidateTypeForField(instance, fieldName, fieldValue);
  }

  createRawEntityGettersSetters(instance, fieldName, (0,_extractors__WEBPACK_IMPORTED_MODULE_4__.derivePreparedValueForField)(fieldName, fieldValue, instance), isPrimaryKey);

  if (!isPrimaryKey) {
    createRenderedGetters(instance, fieldName, (0,_extractors__WEBPACK_IMPORTED_MODULE_4__.deriveRenderedValue)(fieldValue));
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


const createRawEntityGettersSetters = function (instance, fieldName, fieldValue) {
  let isPrimaryKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  const opts = {
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
 *
 * @param {Object} instance
 * @param {string} fieldName
 */

const createAliasGetterForField = (instance, fieldName) => {
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

const createAliasGetterAndSetterForField = (instance, fieldName) => {
  createAliasesForMethod(instance, fieldName, createAliasGetterAndSetter);
};
/**
 * Creates Aliases using the provided method.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {Function} method
 */

const createAliasesForMethod = (instance, fieldName, method) => {
  // camelCase getter (or setter) for full field name (eg. EVT_desc => evtDesc)
  method(instance, fieldName, (0,lodash__WEBPACK_IMPORTED_MODULE_0__.camelCase)(fieldName)); // strip field prefixes and camelCase (if there are field prefixes for the
  // entity. (eg. EVT_desc => desc);

  if (instance.fieldPrefixes) {
    let newFieldName = ''; // Yes, its intended that if there are multiple prefixes, this could
    // end up creating multiple aliased getters (or setters)
    // (eg Datetime: DTT_EVT_start would end up with `evtStart` and `start`
    // as getter accessors).

    instance.fieldPrefixes.forEach(fieldPrefix => {
      newFieldName = fieldName.replace(fieldPrefix + '_', '');

      if (newFieldName !== fieldName) {
        method(instance, fieldName, (0,lodash__WEBPACK_IMPORTED_MODULE_0__.camelCase)(newFieldName));
      }
    });
  }
};
/**
 * Returns a callback that is used in the `getRendered` field getter.
 *
 * @param {Object} instance
 * @return {function(string): *}  A callback.
 */


const getRenderedCallback = instance => requestedFieldName => instance[requestedFieldName + 'Rendered'];
/**
 * Returns a fieldName stripped of all possible prefixes.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @return {string} The prefix free fieldName.
 */


const removePrefixesFromField = (instance, fieldName) => {
  const prefixesToRemove = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.sortBy)(instance.fieldPrefixes, prefix => prefix.length * -1);
  let newFieldName = fieldName;
  (0,lodash__WEBPACK_IMPORTED_MODULE_0__.forEach)(prefixesToRemove, prefix => {
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


const createRenderedGetters = (instance, fieldName, fieldValue) => {
  createGetter(instance, (0,lodash__WEBPACK_IMPORTED_MODULE_0__.camelCase)(removePrefixesFromField(instance, fieldName)) + 'Rendered', fieldValue);

  if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(instance.getRendered)) {
    createCallbackGetter(instance, 'getRendered', getRenderedCallback);
  }
};
/**
 * Callback for the `hasMultiplePrimaryKeys` getter.
 *
 * @param {Object} instance
 * @return {function(): boolean} The callback for hasMultiplePrimaryKeys getter
 */

const hasMultiplePrimaryKeysCallback = instance => instance.primaryKeys.length > 1;
/**
 * Creates getters for primary key related data.
 *
 * @param {Object} instance
 * @param {Array} primaryKeys
 */


const createPrimaryKeyFieldGetters = (instance, primaryKeys) => {
  const opts = {
    configurable: true
  };

  if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isArray)(primaryKeys)) {
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

const hasCalculatedFieldCallback = instance => fieldNameToCheck => !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(instance[fieldNameToCheck]);
/**
 * Creates the getters for all the calculated fields and value on the entity.
 *
 * @param {Object} instance
 * @param {Object.<string,*>}fieldsAndValues
 */


const setCalculatedFieldAndValues = (instance, fieldsAndValues) => {
  (0,lodash__WEBPACK_IMPORTED_MODULE_0__.forEach)(fieldsAndValues, (calculatedFieldValue, calculatedFieldName) => {
    if (calculatedFieldName !== '_protected') {
      createGetter(instance, (0,lodash__WEBPACK_IMPORTED_MODULE_0__.camelCase)(calculatedFieldName), calculatedFieldValue);
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

const setResources = (instance, fieldsAndValues) => {
  const relations = [];
  let relationName;
  (0,lodash__WEBPACK_IMPORTED_MODULE_0__.forEach)(fieldsAndValues, (resourceValue, resourceName) => {
    if (resourceName === 'self') {
      createGetter(instance, 'resourceLink', resourceValue[0].href);
    } else if (resourceName === 'collection') {
      createGetter(instance, 'collectionResourceLink', resourceValue[0].href);
    } else {
      relationName = (0,_extractors__WEBPACK_IMPORTED_MODULE_4__.getRelationNameFromLink)(resourceName);
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

const getRelationResourceCallback = instance => relationName => instance[relationName.replace('Resource', '')];
/**
 * Creates getters for the relations resource object.
 *
 * @param {Object} instance
 * @param {string} relationName
 * @param {Object.<string, string>} resourceInfo
 */


const setRelationsResource = (instance, relationName, resourceInfo) => {
  createGetter(instance, relationName, {
    resourceLink: resourceInfo[0].href,
    single: resourceInfo[0].single
  });

  if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(instance.getRelationResource)) {
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

const setSaveState = function (instance, saveState) {
  let override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const currentState = instance[_constants__WEBPACK_IMPORTED_MODULE_6__.PRIVATE_PROPERTIES.SAVE_STATE];

  switch (saveState) {
    case _constants__WEBPACK_IMPORTED_MODULE_6__.SAVE_STATE.DIRTY:
    case _constants__WEBPACK_IMPORTED_MODULE_6__.SAVE_STATE.NEW:
    case _constants__WEBPACK_IMPORTED_MODULE_6__.SAVE_STATE.CLEAN:
      if (override) {
        instance[_constants__WEBPACK_IMPORTED_MODULE_6__.PRIVATE_PROPERTIES.SAVE_STATE] = saveState;
        break;
      }

      instance[_constants__WEBPACK_IMPORTED_MODULE_6__.PRIVATE_PROPERTIES.SAVE_STATE] = currentState === _constants__WEBPACK_IMPORTED_MODULE_6__.SAVE_STATE.CLEAN ? saveState : currentState;
      break;

    default:
      throw new _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_2__.InvalidArgument('Save state for entity can only be set to either ' + 'SAVE_STATE.DIRTY, SAVE_STATE.NEW or SAVE_STATE.CLEAN');
  }
};
/**
 * Add the field name to the fieldToPersistOnInsert property on the instance
 * if it exists.
 *
 * @param {Object} instance
 * @param {string} fieldName
 */

const setFieldToPersist = (instance, fieldName) => {
  if (instance.fieldsToPersistOnInsert) {
    instance.fieldsToPersistOnInsert.add(fieldName);
  }
};

/***/ }),

/***/ "./assets/src/data/model/entity-factory/extractors.js":
/*!************************************************************!*\
  !*** ./assets/src/data/model/entity-factory/extractors.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deriveDefaultValueForType": function() { return /* binding */ deriveDefaultValueForType; },
/* harmony export */   "derivePreparedValueForField": function() { return /* binding */ derivePreparedValueForField; },
/* harmony export */   "deriveRenderedValue": function() { return /* binding */ deriveRenderedValue; },
/* harmony export */   "deriveTypeForField": function() { return /* binding */ deriveTypeForField; },
/* harmony export */   "deriveValidateTypeForField": function() { return /* binding */ deriveValidateTypeForField; },
/* harmony export */   "getBaseFieldsAndValuesForCloning": function() { return /* binding */ getBaseFieldsAndValuesForCloning; },
/* harmony export */   "getBaseFieldsAndValuesForPersisting": function() { return /* binding */ getBaseFieldsAndValuesForPersisting; },
/* harmony export */   "getDefaultValueForField": function() { return /* binding */ getDefaultValueForField; },
/* harmony export */   "getEntityFieldsFromSchema": function() { return /* binding */ getEntityFieldsFromSchema; },
/* harmony export */   "getPrimaryKeyFieldsFromSchema": function() { return /* binding */ getPrimaryKeyFieldsFromSchema; },
/* harmony export */   "getPrimaryKeyValues": function() { return /* binding */ getPrimaryKeyValues; },
/* harmony export */   "getRelationNameFromLink": function() { return /* binding */ getRelationNameFromLink; },
/* harmony export */   "maybeConvertFromValueObject": function() { return /* binding */ maybeConvertFromValueObject; },
/* harmony export */   "maybeConvertFromValueObjectWithAssertions": function() { return /* binding */ maybeConvertFromValueObjectWithAssertions; },
/* harmony export */   "maybeConvertToValueObject": function() { return /* binding */ maybeConvertToValueObject; }
/* harmony export */ });
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

const maybeConvertToValueObject = (fieldName, fieldValue, schema) => {
  if ((0,_booleans__WEBPACK_IMPORTED_MODULE_4__.isDateTimeField)(fieldName, schema) && !_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__.ServerDateTime.validateIsDateTime(fieldValue)) {
    return _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__.ServerDateTime.fromISO(fieldValue);
  }

  if ((0,_booleans__WEBPACK_IMPORTED_MODULE_4__.isMoneyField)(fieldName, schema) && !(0,_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__.instanceOf)(fieldValue, 'Money')) {
    return new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__.Money(fieldValue, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__.SiteCurrency);
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

const maybeConvertFromValueObjectWithAssertions = (fieldName, fieldValue, schema) => {
  if ((0,_booleans__WEBPACK_IMPORTED_MODULE_4__.isDateTimeField)(fieldName, schema)) {
    _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__.ServerDateTime.assertIsDateTime(fieldValue);
    fieldValue = fieldValue.toISO();
  } else if ((0,_booleans__WEBPACK_IMPORTED_MODULE_4__.isMoneyField)(fieldName, schema)) {
    _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__.Money.assertMoney(fieldValue);
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

const maybeConvertFromValueObject = fieldValue => {
  if (_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_2__.ServerDateTime.validateIsDateTime(fieldValue)) {
    fieldValue = fieldValue.toISO();
  } else if ((0,_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__.instanceOf)(fieldValue, 'Money')) {
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

const derivePreparedValueForField = (fieldName, fieldValue, instance) => {
  const validationType = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateTypeForField)(fieldName, instance);
  fieldValue = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(fieldValue) ? fieldValue[validationType] : fieldValue;
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

const deriveRenderedValue = value => {
  if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value)) {
    return value;
  }

  value = (0,_booleans__WEBPACK_IMPORTED_MODULE_4__.hasPrettyProperty)(value) ? value.pretty : value;
  value = (0,_booleans__WEBPACK_IMPORTED_MODULE_4__.hasRenderedProperty)(value) ? value.rendered : value;
  return (0,_booleans__WEBPACK_IMPORTED_MODULE_4__.hasRawProperty)(value) ? value.raw : value;
};
/**
 * Returns the name of a resource from the given `resourceLink`.
 *
 * eg. "https://api.eventespresso.com/registration" will return 'registration';
 
 * @param {string} resourceLink
 * @return {string} Returns the name of the resource from a provided resource
 * link.
 */

const getRelationNameFromLink = resourceLink => {
  return (0,_model_names__WEBPACK_IMPORTED_MODULE_3__.pluralModelName)((0,lodash__WEBPACK_IMPORTED_MODULE_0__.camelCase)((0,lodash__WEBPACK_IMPORTED_MODULE_0__.last)(resourceLink.split('/'))));
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

const getBaseFieldsAndValuesForCloning = entityInstance => {
  return Object.keys(entityInstance).reduce((fieldsAndValues, fieldName) => {
    if ((0,_booleans__WEBPACK_IMPORTED_MODULE_4__.isEntityField)(fieldName, entityInstance.schema) && !(0,_booleans__WEBPACK_IMPORTED_MODULE_4__.isPrimaryKeyField)(fieldName, entityInstance.schema)) {
      fieldsAndValues[fieldName] = entityInstance[fieldName];
      return fieldsAndValues;
    }

    return fieldsAndValues;
  }, {});
};
/**
 * Returns a plain object containing the entity field name and values from the
 * provided entity instance
 *
 * @param {Object} entityInstance
 * @param {boolean} forInsert  Whether to return the fields and values for
 * insert or for update.
 * @return {Object} A plain object
 */

const getBaseFieldsAndValuesForPersisting = function (entityInstance) {
  let forInsert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const iterator = forInsert ? Array.from(entityInstance.fieldsToPersistOnInsert.values()) : Object.keys(entityInstance);
  return iterator.reduce((fieldsAndValues, fieldName) => {
    if ((0,_booleans__WEBPACK_IMPORTED_MODULE_4__.isEntityField)(fieldName, entityInstance.schema) && !(0,_booleans__WEBPACK_IMPORTED_MODULE_4__.isPrimaryKeyField)(fieldName, entityInstance.schema)) {
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

const getPrimaryKeyValues = entityInstance => (0,lodash__WEBPACK_IMPORTED_MODULE_0__.pick)(entityInstance, entityInstance.primaryKeys);
/**
 * This returns a plain object of entity fields from the schema for the entity
 * instance (schema for fields are extracted as well).
 *
 * @param {Object} entityInstance
 * @return {Object} A plain object with fields and schema properties that are
 * entity properties.
 */

const getEntityFieldsFromSchema = entityInstance => (0,lodash__WEBPACK_IMPORTED_MODULE_0__.pickBy)(entityInstance.schema, (fieldValue, fieldName) => (0,_booleans__WEBPACK_IMPORTED_MODULE_4__.isEntityField)(fieldName, entityInstance.schema));
/**
 * This returns a plain object of extracted primaryKey fields from the schema
 * for the entity instance.
 *
 * @param {Object} entityInstance
 * @return {Object} A plain object with fields and schema properties that
 * 					represent primary key fields.
 */

const getPrimaryKeyFieldsFromSchema = entityInstance => (0,lodash__WEBPACK_IMPORTED_MODULE_0__.pickBy)(entityInstance.schema, (fieldValue, fieldName) => (0,_booleans__WEBPACK_IMPORTED_MODULE_4__.isPrimaryKeyField)(fieldName, entityInstance.schema));
/**
 * Derives the default value to use for a given type.
 *
 * @param {string} type
 * @return {*}  A value to use for the given type.
 */

const deriveDefaultValueForType = type => {
  if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isArray)(type)) {
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

const deriveTypeForField = (fieldName, schema) => {
  if ((0,_booleans__WEBPACK_IMPORTED_MODULE_4__.isDateTimeField)(fieldName, schema)) {
    return 'date-time';
  }

  if (schema[fieldName] && schema[fieldName].type) {
    if (schema[fieldName].type === 'object') {
      if (schema[fieldName].properties && (0,_booleans__WEBPACK_IMPORTED_MODULE_4__.hasRawProperty)(schema[fieldName].properties)) {
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
 * @return {symbol}  The validate type for the field.
 */

const deriveValidateTypeForField = (fieldName, fieldValue, schema) => {
  if ((0,_booleans__WEBPACK_IMPORTED_MODULE_4__.hasRawProperty)(fieldValue)) {
    return _constants__WEBPACK_IMPORTED_MODULE_6__.VALIDATE_TYPE.RAW;
  }

  if (schema[fieldName] && schema[fieldName].type) {
    if (schema[fieldName].type === 'object' && (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(fieldValue)) {
      return (0,_booleans__WEBPACK_IMPORTED_MODULE_4__.hasRenderedProperty)(fieldValue) ? _constants__WEBPACK_IMPORTED_MODULE_6__.VALIDATE_TYPE.RENDERED : _constants__WEBPACK_IMPORTED_MODULE_6__.VALIDATE_TYPE.PRETTY;
    }
  }

  return _constants__WEBPACK_IMPORTED_MODULE_6__.VALIDATE_TYPE.RAW;
};
/**
 * This gets the default value for a field from the provided schema.
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {*} The default value for the field from the schema or if not
 * present in the schema, a derived default value from the schema type.
 */

const getDefaultValueForField = (fieldName, schema) => {
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MODEL_PREFIXES": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.MODEL_PREFIXES; },
/* harmony export */   "SAVE_STATE": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.SAVE_STATE; },
/* harmony export */   "createEntityFactory": function() { return /* reexport safe */ _base_entity__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _base_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-entity */ "./assets/src/data/model/entity-factory/base-entity.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/entity-factory/constants.js");



/***/ }),

/***/ "./assets/src/data/model/entity-factory/validators.js":
/*!************************************************************!*\
  !*** ./assets/src/data/model/entity-factory/validators.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isShallowValidValueForField": function() { return /* binding */ isShallowValidValueForField; },
/* harmony export */   "validateEnumType": function() { return /* binding */ validateEnumType; },
/* harmony export */   "validateType": function() { return /* binding */ validateType; },
/* harmony export */   "validateTypeForField": function() { return /* binding */ validateTypeForField; }
/* harmony export */ });
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

const validateType = (type, value) => {
  let valid = false; // account for type definitions that are an array of allowed types.

  if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isArray)(type)) {
    for (const singleType of type) {
      valid = validateType(singleType, value);

      if (valid) {
        break;
      }
    } // return right away because we've determined the validity of the type.


    return valid;
  }

  switch (type) {
    case 'integer':
      valid = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isInteger)(value);
      break;

    case 'number':
      valid = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNumber)(value);
      break;

    case 'string':
      valid = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isString)(value);
      break;

    case 'object':
      valid = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(value);
      break;

    case 'boolean':
    case 'bool':
      valid = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isBoolean)(value);
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

const validateEnumType = (type, enumValues, value) => {
  return validateType(type, value) && (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isArray)(enumValues) && enumValues.indexOf(value) > -1;
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

const isShallowValidValueForField = function (fieldName, fieldValue, schema) {
  let expectValueObjects = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  // if field is a primary Key field then we override the validation so it can
  // be either string or number
  if ((0,_booleans__WEBPACK_IMPORTED_MODULE_2__.isPrimaryKeyField)(fieldName, schema)) {
    return validateType('string', fieldValue) || validateType('number', fieldValue);
  }

  const isEnum = (0,_booleans__WEBPACK_IMPORTED_MODULE_2__.isEnumField)(fieldName, schema);
  const isValueObject = (0,_booleans__WEBPACK_IMPORTED_MODULE_2__.isValueObjectField)(fieldName, schema);
  fieldValue = expectValueObjects && isValueObject ? (0,_extractors__WEBPACK_IMPORTED_MODULE_3__.maybeConvertFromValueObjectWithAssertions)(fieldName, fieldValue, schema) : fieldValue;
  fieldValue = expectValueObjects && schema[fieldName].type === 'object' && isValueObject ? {
    raw: fieldValue
  } : fieldValue;
  const isValid = isEnum ? validateEnumType(schema[fieldName].type, schema[fieldName].enum, fieldValue) : validateType(schema[fieldName].type, fieldValue); // if isEnum and not valid, then lets bail with error

  if (isEnum && !isValid) {
    throw new TypeError((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)('The given "%s" fieldName is not valid for the defined schema.  It must be a "%s" and it must be one of "%s". The fieldValue given was "%s"', fieldName, schema[fieldName].enum.join(), fieldValue));
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

const validateTypeForField = (fieldName, instance) => {
  return instance[_constants__WEBPACK_IMPORTED_MODULE_4__.PRIVATE_PROPERTIES.VALIDATE_TYPES][fieldName] ? instance[_constants__WEBPACK_IMPORTED_MODULE_4__.PRIVATE_PROPERTIES.VALIDATE_TYPES][fieldName] : _constants__WEBPACK_IMPORTED_MODULE_4__.VALIDATE_TYPE.RAW;
};

/***/ }),

/***/ "./assets/src/data/model/event/constants.js":
/*!**************************************************!*\
  !*** ./assets/src/data/model/event/constants.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EVENT_STATUS_ID": function() { return /* binding */ EVENT_STATUS_ID; },
/* harmony export */   "EVENT_STATUS_IDS": function() { return /* binding */ EVENT_STATUS_IDS; },
/* harmony export */   "MODEL_NAME": function() { return /* binding */ MODEL_NAME; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

const MODEL_NAME = 'event';
const EVENT_STATUS_ID = {
  SOLD_OUT: 'sold_out',
  POSTPONED: 'postponed',
  CANCELLED: 'cancelled'
};
const EVENT_STATUS_IDS = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.values)(EVENT_STATUS_ID);

/***/ }),

/***/ "./assets/src/data/model/event/index.js":
/*!**********************************************!*\
  !*** ./assets/src/data/model/event/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EVENT_STATUS_ID": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_STATUS_ID; },
/* harmony export */   "EVENT_STATUS_IDS": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_STATUS_IDS; },
/* harmony export */   "MODEL_NAME": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.MODEL_NAME; },
/* harmony export */   "defaultQueryData": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.defaultQueryData; },
/* harmony export */   "getQueryString": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.getQueryString; },
/* harmony export */   "mapOrderBy": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.mapOrderBy; },
/* harmony export */   "nowDateAndTime": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.nowDateAndTime; },
/* harmony export */   "queryDataTypes": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.queryDataTypes; },
/* harmony export */   "whereConditions": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.whereConditions; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/event/constants.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/event/query.js");



/***/ }),

/***/ "./assets/src/data/model/event/query.js":
/*!**********************************************!*\
  !*** ./assets/src/data/model/event/query.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultQueryData": function() { return /* binding */ defaultQueryData; },
/* harmony export */   "getQueryString": function() { return /* binding */ getQueryString; },
/* harmony export */   "mapOrderBy": function() { return /* binding */ mapOrderBy; },
/* harmony export */   "nowDateAndTime": function() { return /* binding */ nowDateAndTime; },
/* harmony export */   "queryDataTypes": function() { return /* binding */ queryDataTypes; },
/* harmony export */   "whereConditions": function() { return /* binding */ whereConditions; }
/* harmony export */ });
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");
/**
 * External dependencies
 */



/**
 * Internal imports
 */


const nowDateAndTime = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()();
/**
 * Described attributes for this model
 *
 * @type {{attributes: *}}
 */

const queryDataTypes = {
  queryData: prop_types__WEBPACK_IMPORTED_MODULE_3___default().shape({
    limit: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
    orderBy: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf(['EVT_name', 'EVT_ID', 'start_date', 'end_date', 'ticket_start', 'ticket_end']),
    order: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf(_base__WEBPACK_IMPORTED_MODULE_2__.ALLOWED_ORDER_VALUES),
    showExpired: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
    categorySlug: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
    month: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().month)
  })
};
/**
 * Default attributes for this model
 *
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

const defaultQueryData = {
  queryData: {
    limit: 100,
    orderBy: 'start_date',
    order: _base__WEBPACK_IMPORTED_MODULE_2__.QUERY_ORDER_DESC,
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

const mapOrderBy = orderBy => {
  const orderByMap = {
    start_date: 'Datetime.DTT_EVT_start',
    end_date: 'Datetime.DTT_EVT_end',
    ticket_start: 'Datetime.Ticket.TKT_start_date',
    ticket_end: 'Datetime.Ticket.TKT_end_date'
  };
  return (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
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

const whereConditions = _ref => {
  let {
    showExpired = false,
    categorySlug,
    month = 'none'
  } = _ref;
  const where = [];

  if (!showExpired) {
    where.push('where[Datetime.DTT_EVT_end**expired][]=' + _base__WEBPACK_IMPORTED_MODULE_2__.GREATER_THAN + '&where[Datetime.DTT_EVT_end**expired][]=' + nowDateAndTime.local().format());
  }

  if (categorySlug) {
    where.push('where[Term_Relationship.Term_Taxonomy.Term.slug]=' + categorySlug);
  }

  if (month && month !== 'none') {
    where.push('where[Datetime.DTT_EVT_start][]=' + _base__WEBPACK_IMPORTED_MODULE_2__.GREATER_THAN_AND_EQUAL + '&where[Datetime.DTT_EVT_start][]=' + moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().month(month).startOf('month').local().format());
    where.push('where[Datetime.DTT_EVT_end][]=' + _base__WEBPACK_IMPORTED_MODULE_2__.LESS_THAN_AND_EQUAL + '&where[Datetime.DTT_EVT_end][]=' + moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().month(month).endOf('month').local().format());
  }

  return where.join('&');
};
/**
 * Return a query string for use by a REST request given a set of queryData.
 *
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */

const getQueryString = function () {
  let queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  queryData = { ...defaultQueryData.queryData,
    ...queryData
  };
  return (0,_base__WEBPACK_IMPORTED_MODULE_2__.getQueryString)(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/model-names.js":
/*!**********************************************!*\
  !*** ./assets/src/data/model/model-names.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MODEL_NAMES": function() { return /* binding */ MODEL_NAMES; },
/* harmony export */   "modelNameForQueryString": function() { return /* binding */ modelNameForQueryString; },
/* harmony export */   "pluralModelName": function() { return /* binding */ pluralModelName; },
/* harmony export */   "singularModelName": function() { return /* binding */ singularModelName; }
/* harmony export */ });
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

const MODEL_NAMES = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.keys)(_primary_keys_js__WEBPACK_IMPORTED_MODULE_0__.primaryKeys);
/**
 * Used to normalize the plural form of a given model name.
 *
 * @param {string} modelName
 * @return {string}  Ensures the given modelName is its plural form.
 */

const pluralModelName = memize__WEBPACK_IMPORTED_MODULE_3___default()(modelName => pluralize__WEBPACK_IMPORTED_MODULE_2___default()(modelName));
/**
 * Used to normalize the singular form of a given model name.
 *
 * @param {string} modelName
 * @return {string} Ensures the given modelName is in its singular form.
 */

const singularModelName = memize__WEBPACK_IMPORTED_MODULE_3___default()(modelName => pluralize__WEBPACK_IMPORTED_MODULE_2___default().singular(modelName));
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

const modelNameForQueryString = memize__WEBPACK_IMPORTED_MODULE_3___default()(modelName => {
  modelName = singularModelName(modelName);
  modelName = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.startCase)(modelName);
  return modelName.replace(/\s/g, '_');
});

/***/ }),

/***/ "./assets/src/data/model/models.js":
/*!*****************************************!*\
  !*** ./assets/src/data/model/models.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attendeeModel": function() { return /* reexport module object */ _attendee__WEBPACK_IMPORTED_MODULE_6__; },
/* harmony export */   "checkInModel": function() { return /* reexport module object */ _checkin__WEBPACK_IMPORTED_MODULE_5__; },
/* harmony export */   "dateTimeModel": function() { return /* reexport module object */ _datetime__WEBPACK_IMPORTED_MODULE_0__; },
/* harmony export */   "eventModel": function() { return /* reexport module object */ _event__WEBPACK_IMPORTED_MODULE_1__; },
/* harmony export */   "registrationModel": function() { return /* reexport module object */ _registration__WEBPACK_IMPORTED_MODULE_2__; },
/* harmony export */   "statusModel": function() { return /* reexport module object */ _status__WEBPACK_IMPORTED_MODULE_3__; },
/* harmony export */   "ticketModel": function() { return /* reexport module object */ _ticket__WEBPACK_IMPORTED_MODULE_4__; }
/* harmony export */ });
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datetime */ "./assets/src/data/model/datetime/index.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event */ "./assets/src/data/model/event/index.js");
/* harmony import */ var _registration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./registration */ "./assets/src/data/model/registration/index.js");
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./status */ "./assets/src/data/model/status/index.js");
/* harmony import */ var _ticket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ticket */ "./assets/src/data/model/ticket/index.js");
/* harmony import */ var _checkin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./checkin */ "./assets/src/data/model/checkin/index.js");
/* harmony import */ var _attendee__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./attendee */ "./assets/src/data/model/attendee/index.js");









/***/ }),

/***/ "./assets/src/data/model/primary-keys.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/primary-keys.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAndKeyEntitiesByPrimaryKeyValue": function() { return /* binding */ createAndKeyEntitiesByPrimaryKeyValue; },
/* harmony export */   "getEntityPrimaryKeyValues": function() { return /* binding */ getEntityPrimaryKeyValues; },
/* harmony export */   "getPrimaryKey": function() { return /* binding */ getPrimaryKey; },
/* harmony export */   "getPrimaryKeyQueryString": function() { return /* binding */ getPrimaryKeyQueryString; },
/* harmony export */   "keyEntitiesByPrimaryKeyValue": function() { return /* binding */ keyEntitiesByPrimaryKeyValue; },
/* harmony export */   "primaryKeys": function() { return /* binding */ primaryKeys; },
/* harmony export */   "valueForPrimaryKey": function() { return /* binding */ valueForPrimaryKey; },
/* harmony export */   "valuesForCombinedPrimaryKeys": function() { return /* binding */ valuesForCombinedPrimaryKeys; }
/* harmony export */ });
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

const {
  primary_keys: primaryKeys = {}
} = _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_0__.data.paths;
/**
 * Returns the values for the given keys from the provided entity.
 * This function would be used for models that have combined primary keys
 * (delivered as an array).
 *
 * @type { memoized }
 * @return { string } The string representation for the values.
 * @throws { Exception }
 */

const valuesForCombinedPrimaryKeys = memize__WEBPACK_IMPORTED_MODULE_3___default()((keys, entity) => {
  (0,_assertions__WEBPACK_IMPORTED_MODULE_4__.assertIsArray)(keys);
  const primaryKey = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.reduce)(keys, function (result, key) {
    (0,_assertions__WEBPACK_IMPORTED_MODULE_4__.assertEntityHasKey)(key, entity);
    return entity[result] + ':' + entity[key];
  });
  return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.trimEnd)(primaryKey, ':');
});
/**
 * Returns the value for the given key from the provided entity.
 * This function would be used for models that have only one primary key.
 *
 * @type {memoized}
 * @return {Function} The value for the key in the provided entity.
 * @throws { Exception }
 */

const valueForPrimaryKey = memize__WEBPACK_IMPORTED_MODULE_3___default()((key, entity) => {
  (0,_assertions__WEBPACK_IMPORTED_MODULE_4__.assertEntityHasKey)(key, entity);
  return entity[key];
});
/**
 * Returns the primary key (or combined primary keys) from the available data.
 *
 * @type {memoized}
 * @return { function(string) }
 * @throws { Exception }
 */

const getPrimaryKey = memize__WEBPACK_IMPORTED_MODULE_3___default()(modelName => {
  (0,_assertions__WEBPACK_IMPORTED_MODULE_4__.assertEntityHasKey)(modelName, primaryKeys);
  return primaryKeys[modelName];
});
/**
 * Returns a query string for getting the entities belonging to a model for the
 * given primary key values
 *
 * @type {memoized}
 */

const getPrimaryKeyQueryString = memize__WEBPACK_IMPORTED_MODULE_3___default()(function (modelName) {
  let keyValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  const primaryKey = getPrimaryKey(modelName);
  return `[${primaryKey}][IN]=` + keyValues.join();
});
/**
 * Returns the values for the primary keys from the provided entity.
 *
 * @type {memoized}
 * @return {Function}  If the model has only one primary key then the value will
 * be a simple string.  If the model has combined primary keys, then the value
 * will be as string in the format `%s.%s` for the primary key values.
 * @throws { Exception }
 */

const getEntityPrimaryKeyValues = memize__WEBPACK_IMPORTED_MODULE_3___default()((modelName, entity) => {
  const keys = getPrimaryKey(modelName);
  return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isArray)(keys) ? valuesForCombinedPrimaryKeys(keys, entity) : valueForPrimaryKey(keys, entity);
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

const keyEntitiesByPrimaryKeyValue = function (modelName) {
  let entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  (0,_assertions__WEBPACK_IMPORTED_MODULE_4__.assertIsNotEmpty)(entities, (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The provided array of entities must not be empty', 'event_espresso'));
  (0,_assertions__WEBPACK_IMPORTED_MODULE_4__.assertIsArray)(entities);
  const mappedEntities = new Map();
  entities.forEach(entity => {
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

const createAndKeyEntitiesByPrimaryKeyValue = (factory, entities) => {
  (0,_assertions__WEBPACK_IMPORTED_MODULE_4__.assertIsMap)(entities, (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The provided object of entities must be a Map object', 'event_espresso'));
  entities.forEach((entity, entityId) => {
    entities.set(entityId, factory.fromExisting(entity));
  });
  return entities;
};

/***/ }),

/***/ "./assets/src/data/model/registration/constants.js":
/*!*********************************************************!*\
  !*** ./assets/src/data/model/registration/constants.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MODEL_NAME": function() { return /* binding */ MODEL_NAME; },
/* harmony export */   "REGISTRATION_STATUS_IDS": function() { return /* binding */ REGISTRATION_STATUS_IDS; }
/* harmony export */ });
/* harmony import */ var _status_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../status/constants */ "./assets/src/data/model/status/constants.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Internal Imports
 */

/**
 * External imports
 */


const MODEL_NAME = 'registration';
const REGISTRATION_STATUS_IDS = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.values)(_status_constants__WEBPACK_IMPORTED_MODULE_0__.REGISTRATION_STATUS_ID);

/***/ }),

/***/ "./assets/src/data/model/registration/index.js":
/*!*****************************************************!*\
  !*** ./assets/src/data/model/registration/index.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MODEL_NAME": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.MODEL_NAME; },
/* harmony export */   "REGISTRATION_STATUS_IDS": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.REGISTRATION_STATUS_IDS; },
/* harmony export */   "defaultQueryData": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.defaultQueryData; },
/* harmony export */   "getQueryString": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.getQueryString; },
/* harmony export */   "mapOrderBy": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.mapOrderBy; },
/* harmony export */   "optionsEntityMap": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.optionsEntityMap; },
/* harmony export */   "queryDataTypes": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.queryDataTypes; },
/* harmony export */   "whereConditions": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.whereConditions; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/registration/constants.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/registration/query.js");



/***/ }),

/***/ "./assets/src/data/model/registration/query.js":
/*!*****************************************************!*\
  !*** ./assets/src/data/model/registration/query.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultQueryData": function() { return /* binding */ defaultQueryData; },
/* harmony export */   "getQueryString": function() { return /* binding */ getQueryString; },
/* harmony export */   "mapOrderBy": function() { return /* binding */ mapOrderBy; },
/* harmony export */   "optionsEntityMap": function() { return /* binding */ optionsEntityMap; },
/* harmony export */   "queryDataTypes": function() { return /* binding */ queryDataTypes; },
/* harmony export */   "whereConditions": function() { return /* binding */ whereConditions; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");
/* harmony import */ var _status_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../status/constants */ "./assets/src/data/model/status/constants.js");
/**
 * External imports
 */


/**
 * Internal imports
 */



/**
 * Described attributes for this model
 *
 * @type {{attributes: *}}
 */

const queryDataTypes = {
  forEventId: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
  forAttendeeId: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
  forTransactionId: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
  forTicketId: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
  forStatusId: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf((0,lodash__WEBPACK_IMPORTED_MODULE_0__.values)(_status_constants__WEBPACK_IMPORTED_MODULE_2__.REGISTRATION_STATUS_ID)),
  queryData: prop_types__WEBPACK_IMPORTED_MODULE_3___default().shape({
    limit: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
    orderBy: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf(['REG_ID', 'REG_date']),
    order: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf(_base__WEBPACK_IMPORTED_MODULE_1__.ALLOWED_ORDER_VALUES)
  })
};
const optionsEntityMap = {
  default: {
    value: 'REG_ID',
    label: 'REG_code'
  }
};
/**
 * Default attributes for this model
 *
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

const defaultQueryData = {
  queryData: {
    limit: 100,
    orderBy: 'reg_date',
    order: _base__WEBPACK_IMPORTED_MODULE_1__.QUERY_ORDER_DESC
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

const mapOrderBy = orderBy => {
  const orderByMap = {
    reg_id: 'REG_ID',
    reg_date: 'REG_date'
  };
  return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
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

const whereConditions = _ref => {
  let {
    forEventId = 0,
    forAttendeeId = 0,
    forTransactionId = 0,
    forTicketId = 0,
    forStatusId = ''
  } = _ref;
  const where = [];
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
 *
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */

const getQueryString = function () {
  let queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  queryData = { ...defaultQueryData.queryData,
    ...queryData
  };
  return (0,_base__WEBPACK_IMPORTED_MODULE_1__.getQueryString)(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/status/constants.js":
/*!***************************************************!*\
  !*** ./assets/src/data/model/status/constants.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALL_STATUS_IDS": function() { return /* binding */ ALL_STATUS_IDS; },
/* harmony export */   "CPT_STATUS_ID": function() { return /* binding */ CPT_STATUS_ID; },
/* harmony export */   "EMAIL_STATUS_ID": function() { return /* binding */ EMAIL_STATUS_ID; },
/* harmony export */   "EVENT_STATUS_ID": function() { return /* binding */ EVENT_STATUS_ID; },
/* harmony export */   "MESSAGE_STATUS_ID": function() { return /* binding */ MESSAGE_STATUS_ID; },
/* harmony export */   "MODEL_NAME": function() { return /* binding */ MODEL_NAME; },
/* harmony export */   "PAYMENT_STATUS_ID": function() { return /* binding */ PAYMENT_STATUS_ID; },
/* harmony export */   "REGISTRATION_STATUS_ID": function() { return /* binding */ REGISTRATION_STATUS_ID; },
/* harmony export */   "STATUS_TYPE_EMAIL": function() { return /* binding */ STATUS_TYPE_EMAIL; },
/* harmony export */   "STATUS_TYPE_EVENT": function() { return /* binding */ STATUS_TYPE_EVENT; },
/* harmony export */   "STATUS_TYPE_MESSAGE": function() { return /* binding */ STATUS_TYPE_MESSAGE; },
/* harmony export */   "STATUS_TYPE_PAYMENT": function() { return /* binding */ STATUS_TYPE_PAYMENT; },
/* harmony export */   "STATUS_TYPE_REGISTRATION": function() { return /* binding */ STATUS_TYPE_REGISTRATION; },
/* harmony export */   "STATUS_TYPE_TRANSACTION": function() { return /* binding */ STATUS_TYPE_TRANSACTION; },
/* harmony export */   "TRANSACTION_STATUS_ID": function() { return /* binding */ TRANSACTION_STATUS_ID; },
/* harmony export */   "UNKNOWN_STATUS_ID": function() { return /* binding */ UNKNOWN_STATUS_ID; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

const MODEL_NAME = 'status'; // types

const STATUS_TYPE_EMAIL = 'email';
const STATUS_TYPE_EVENT = 'event';
const STATUS_TYPE_MESSAGE = 'message';
const STATUS_TYPE_PAYMENT = 'payment';
const STATUS_TYPE_REGISTRATION = 'registration';
const STATUS_TYPE_TRANSACTION = 'transaction'; // email

const EMAIL_STATUS_ID = {
  DRAFT: 'EDR',
  SENT: 'ESN',
  EXPIRED: 'EXP'
}; // event

const EVENT_STATUS_ID = {
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

const MESSAGE_STATUS_ID = {
  DEBUG: 'MDO',
  EXECUTING: 'MEX',
  FAIL: 'MFL',
  INCOMPLETE: 'MIC',
  IDLE: 'MID',
  RESEND: 'MRS',
  RETRY: 'MRT',
  SENT: 'MSN'
}; // payment

const PAYMENT_STATUS_ID = {
  APPROVED: 'PAP',
  CANCELLED: 'PCN',
  DECLINED: 'PDC',
  FAILED: 'PFL',
  PENDING: 'PPN'
}; // registration

const REGISTRATION_STATUS_ID = {
  APPROVED: 'RAP',
  CANCELLED: 'RCN',
  DECLINED: 'RDC',
  INCOMPLETE: 'RIC',
  NOT_APPROVED: 'RNA',
  PENDING_PAYMENT: 'RPP',
  WAIT_LIST: 'RWL'
}; // transaction

const TRANSACTION_STATUS_ID = {
  ABANDONED: 'TAB',
  COMPLETE: 'TCM',
  FAILED: 'TFL',
  INCOMPLETE: 'TIN',
  OVERPAID: 'TOP'
}; // the following are not in the status database but are kept here for
// convenience
// custom post types

const CPT_STATUS_ID = {
  PUBLISH: 'publish',
  FUTURE: 'future',
  DRAFT: 'draft',
  PENDING: 'pending',
  PRIVATE: 'private',
  TRASHED: 'trash'
};
const UNKNOWN_STATUS_ID = 'unknown';
const ALL_STATUS_IDS = [...(0,lodash__WEBPACK_IMPORTED_MODULE_0__.values)(EMAIL_STATUS_ID), ...(0,lodash__WEBPACK_IMPORTED_MODULE_0__.values)(EVENT_STATUS_ID), ...(0,lodash__WEBPACK_IMPORTED_MODULE_0__.values)(MESSAGE_STATUS_ID), ...(0,lodash__WEBPACK_IMPORTED_MODULE_0__.values)(PAYMENT_STATUS_ID), ...(0,lodash__WEBPACK_IMPORTED_MODULE_0__.values)(REGISTRATION_STATUS_ID), ...(0,lodash__WEBPACK_IMPORTED_MODULE_0__.values)(TRANSACTION_STATUS_ID), ...(0,lodash__WEBPACK_IMPORTED_MODULE_0__.values)(CPT_STATUS_ID), UNKNOWN_STATUS_ID];

/***/ }),

/***/ "./assets/src/data/model/status/helpers.js":
/*!*************************************************!*\
  !*** ./assets/src/data/model/status/helpers.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prettyStatus": function() { return /* binding */ prettyStatus; },
/* harmony export */   "prettyStatuses": function() { return /* binding */ prettyStatuses; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/status/constants.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../event */ "./assets/src/data/model/event/index.js");
/* harmony import */ var _ticket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ticket */ "./assets/src/data/model/ticket/index.js");
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../datetime */ "./assets/src/data/model/datetime/index.js");
/* harmony import */ var _checkin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../checkin */ "./assets/src/data/model/checkin/index.js");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/value-objects */ "@eventespresso/value-objects");
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/**
 * Internal imports
 */





/**
 * External imports
 */




/**
 * Translation map for Registration statuses
 *
 * @type {{}}
 */

const STATUS_TRANSLATION_MAP_REGISTRATION = {
  [_constants__WEBPACK_IMPORTED_MODULE_0__.REGISTRATION_STATUS_ID.PENDING_PAYMENT]: new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('pending payment', 'event_espresso'), (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('pending payments', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.REGISTRATION_STATUS_ID.APPROVED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('approved', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.REGISTRATION_STATUS_ID.NOT_APPROVED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('not approved', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.REGISTRATION_STATUS_ID.CANCELLED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('cancelled', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.REGISTRATION_STATUS_ID.INCOMPLETE]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('incomplete', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.REGISTRATION_STATUS_ID.DECLINED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('declined', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.REGISTRATION_STATUS_ID.WAIT_LIST]: new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('wait list', 'event_espresso'), (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('wait lists', 'event_espresso'))
};
/**
 * Translation map for Transaction statuses
 *
 * @type {{}}
 *
 */

const STATUS_TRANSLATION_MAP_TRANSACTION = {
  [_constants__WEBPACK_IMPORTED_MODULE_0__.TRANSACTION_STATUS_ID.OVERPAID]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('overpaid', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.TRANSACTION_STATUS_ID.COMPLETE]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('complete', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.TRANSACTION_STATUS_ID.INCOMPLETE]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('incomplete', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.TRANSACTION_STATUS_ID.FAILED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('failed', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.TRANSACTION_STATUS_ID.ABANDONED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('abandoned', 'event_espresso'))
};
/**
 * Translation map for payment statuses
 *
 * @type {{}}
 */

const STATUS_TRANSLATION_MAP_PAYMENT = {
  [_constants__WEBPACK_IMPORTED_MODULE_0__.PAYMENT_STATUS_ID.APPROVED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('accepted', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.PAYMENT_STATUS_ID.PENDING]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('pending', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.PAYMENT_STATUS_ID.CANCELLED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('cancelled', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.PAYMENT_STATUS_ID.DECLINED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('declined', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.PAYMENT_STATUS_ID.FAILED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('failed', 'event_espresso'))
};
/**
 * Translation map for Message statuses
 *
 * @type {{}}
 */

const STATUS_TRANSLATION_MAP_MESSAGE = {
  [_constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_STATUS_ID.SENT]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('sent', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_STATUS_ID.IDLE]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('queued for sending', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_STATUS_ID.FAIL]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('failed', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_STATUS_ID.DEBUG]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('debug only', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_STATUS_ID.EXECUTING]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('messenger is executing', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_STATUS_ID.RESEND]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('queued for resending', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_STATUS_ID.INCOMPLETE]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('queued for generating', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_STATUS_ID.RETRY]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('failed sending, can be retried', 'event_espresso'))
};
/**
 * Translation map for CPT statuses
 *
 * @type {{}}
 */

const STATUS_TRANSLATION_MAP_CPT = {
  [_constants__WEBPACK_IMPORTED_MODULE_0__.CPT_STATUS_ID.PUBLISH]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('published', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.CPT_STATUS_ID.FUTURE]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('scheduled', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.CPT_STATUS_ID.DRAFT]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('draft', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.CPT_STATUS_ID.PENDING]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('pending', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.CPT_STATUS_ID.PRIVATE]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('private', 'event_espresso')),
  [_constants__WEBPACK_IMPORTED_MODULE_0__.CPT_STATUS_ID.TRASHED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('trashed', 'event_espresso'))
}; // the following status maps are for model statuses that are not saved in the
// status table but for convenience have their labels retrievable via here.

/**
 * Translation map for Event Statuses
 *
 * @type {{}}
 */

const STATUS_TRANSLATION_MAP_EVENT = {
  [_event__WEBPACK_IMPORTED_MODULE_1__.EVENT_STATUS_ID.SOLD_OUT]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('sold out', 'event_espresso')),
  [_event__WEBPACK_IMPORTED_MODULE_1__.EVENT_STATUS_ID.POSTPONED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('postponed', 'event_espresso')),
  [_event__WEBPACK_IMPORTED_MODULE_1__.EVENT_STATUS_ID.CANCELLED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('cancelled', 'event_espresso'))
};
/**
 * Translation map for Ticket statuses
 *
 * @type {{}}
 */

const STATUS_TRANSLATION_MAP_TICKET = {
  [_ticket__WEBPACK_IMPORTED_MODULE_2__.TICKET_STATUS_ID.ARCHIVED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('archived', 'event_espresso')),
  [_ticket__WEBPACK_IMPORTED_MODULE_2__.TICKET_STATUS_ID.EXPIRED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('expired', 'event_espresso')),
  [_ticket__WEBPACK_IMPORTED_MODULE_2__.TICKET_STATUS_ID.SOLD_OUT]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('sold out', 'event_espresso')),
  [_ticket__WEBPACK_IMPORTED_MODULE_2__.TICKET_STATUS_ID.PENDING]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('upcoming', 'event_espresso')),
  [_ticket__WEBPACK_IMPORTED_MODULE_2__.TICKET_STATUS_ID.ONSALE]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('on sale', 'event_espresso'))
};
/**
 * Translation map for datetime statuses
 *
 * @type {{}}
 */

const STATUS_TRANSLATION_MAP_DATETIME = {
  [_datetime__WEBPACK_IMPORTED_MODULE_3__.DATETIME_STATUS_ID.CANCELLED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('cancelled', 'event_espresso')),
  [_datetime__WEBPACK_IMPORTED_MODULE_3__.DATETIME_STATUS_ID.SOLD_OUT]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('sold out', 'event_espresso')),
  [_datetime__WEBPACK_IMPORTED_MODULE_3__.DATETIME_STATUS_ID.EXPIRED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('expired', 'event_espresso')),
  [_datetime__WEBPACK_IMPORTED_MODULE_3__.DATETIME_STATUS_ID.INACTIVE]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('inactive', 'event_espresso')),
  [_datetime__WEBPACK_IMPORTED_MODULE_3__.DATETIME_STATUS_ID.UPCOMING]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('upcoming', 'event_espresso')),
  [_datetime__WEBPACK_IMPORTED_MODULE_3__.DATETIME_STATUS_ID.ACTIVE]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('active', 'event_espresso')),
  [_datetime__WEBPACK_IMPORTED_MODULE_3__.DATETIME_STATUS_ID.POSTPONED]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('postponed', 'event_espresso'))
};
/**
 * Translation map for checkin statuses
 *
 * @type {{}}
 */

const STATUS_TRANSLATION_MAP_CHECKIN = {
  [_checkin__WEBPACK_IMPORTED_MODULE_4__.CHECKIN_STATUS_ID.STATUS_CHECKED_IN]: new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('check-in', 'event_espresso'), (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('check-ins', 'event_espresso')),
  [_checkin__WEBPACK_IMPORTED_MODULE_4__.CHECKIN_STATUS_ID.STATUS_CHECKED_OUT]: new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('check-out', 'event_espresso'), (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('check-outs', 'event_espresso')),
  [_checkin__WEBPACK_IMPORTED_MODULE_4__.CHECKIN_STATUS_ID.STATUS_CHECKED_NEVER]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('never checked in', 'event_espresso'))
};
/**
 * Combined translation map for all statuses.
 *
 * @type {{}}
 */

const STATUS_TRANSLATION_MAP_ALL = { ...STATUS_TRANSLATION_MAP_REGISTRATION,
  ...STATUS_TRANSLATION_MAP_TRANSACTION,
  ...STATUS_TRANSLATION_MAP_PAYMENT,
  ...STATUS_TRANSLATION_MAP_MESSAGE,
  ...STATUS_TRANSLATION_MAP_CPT,
  ...STATUS_TRANSLATION_MAP_EVENT,
  ...STATUS_TRANSLATION_MAP_TICKET,
  ...STATUS_TRANSLATION_MAP_DATETIME,
  ...STATUS_TRANSLATION_MAP_CHECKIN,
  [_constants__WEBPACK_IMPORTED_MODULE_0__.UNKNOWN_STATUS_ID]: _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.fromSameSingleAndPlural((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('unknown', 'event_espresso'))
};
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

const prettyStatus = function (statusCode) {
  let singular = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  let schema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.FORMAT_SENTENCE_CASE;
  return STATUS_TRANSLATION_MAP_ALL[statusCode] ? STATUS_TRANSLATION_MAP_ALL[statusCode].asFormatted(singular, schema) : STATUS_TRANSLATION_MAP_ALL[_constants__WEBPACK_IMPORTED_MODULE_0__.UNKNOWN_STATUS_ID].asFormatted(singular, schema);
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

const prettyStatuses = function (statusCodes) {
  let singular = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  let schema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_6__.Label.FORMAT_SENTENCE_CASE;

  if (!(0,lodash__WEBPACK_IMPORTED_MODULE_7__.isArray)(statusCodes)) {
    throw new TypeError('Expect incoming statusCodes argument' + ' to be an array');
  }

  const mappedStatuses = {};
  statusCodes.forEach(statusCode => {
    mappedStatuses[statusCode] = prettyStatus(statusCode, singular, schema);
  });
  return mappedStatuses;
};

/***/ }),

/***/ "./assets/src/data/model/status/index.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/status/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALL_STATUS_IDS": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.ALL_STATUS_IDS; },
/* harmony export */   "CPT_STATUS_ID": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.CPT_STATUS_ID; },
/* harmony export */   "EMAIL_STATUS_ID": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.EMAIL_STATUS_ID; },
/* harmony export */   "EVENT_STATUS_ID": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_STATUS_ID; },
/* harmony export */   "MESSAGE_STATUS_ID": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGE_STATUS_ID; },
/* harmony export */   "MODEL_NAME": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.MODEL_NAME; },
/* harmony export */   "PAYMENT_STATUS_ID": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.PAYMENT_STATUS_ID; },
/* harmony export */   "REGISTRATION_STATUS_ID": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.REGISTRATION_STATUS_ID; },
/* harmony export */   "STATUS_TYPE_EMAIL": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.STATUS_TYPE_EMAIL; },
/* harmony export */   "STATUS_TYPE_EVENT": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.STATUS_TYPE_EVENT; },
/* harmony export */   "STATUS_TYPE_MESSAGE": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.STATUS_TYPE_MESSAGE; },
/* harmony export */   "STATUS_TYPE_PAYMENT": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.STATUS_TYPE_PAYMENT; },
/* harmony export */   "STATUS_TYPE_REGISTRATION": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.STATUS_TYPE_REGISTRATION; },
/* harmony export */   "STATUS_TYPE_TRANSACTION": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.STATUS_TYPE_TRANSACTION; },
/* harmony export */   "TRANSACTION_STATUS_ID": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.TRANSACTION_STATUS_ID; },
/* harmony export */   "UNKNOWN_STATUS_ID": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.UNKNOWN_STATUS_ID; },
/* harmony export */   "defaultQueryData": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.defaultQueryData; },
/* harmony export */   "getQueryString": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.getQueryString; },
/* harmony export */   "mapOrderBy": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.mapOrderBy; },
/* harmony export */   "prettyStatus": function() { return /* reexport safe */ _helpers__WEBPACK_IMPORTED_MODULE_2__.prettyStatus; },
/* harmony export */   "prettyStatuses": function() { return /* reexport safe */ _helpers__WEBPACK_IMPORTED_MODULE_2__.prettyStatuses; },
/* harmony export */   "queryDataTypes": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.queryDataTypes; },
/* harmony export */   "whereConditions": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.whereConditions; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/status/constants.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/status/query.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./assets/src/data/model/status/helpers.js");




/***/ }),

/***/ "./assets/src/data/model/status/query.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/status/query.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultQueryData": function() { return /* binding */ defaultQueryData; },
/* harmony export */   "getQueryString": function() { return /* binding */ getQueryString; },
/* harmony export */   "mapOrderBy": function() { return /* binding */ mapOrderBy; },
/* harmony export */   "queryDataTypes": function() { return /* binding */ queryDataTypes; },
/* harmony export */   "whereConditions": function() { return /* binding */ whereConditions; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");
/**
 * External imports
 */


/**
 * Internal dependencies
 */


/**
 * Described attributes for this model
 *
 * @type {{attributes: *}}
 */

const queryDataTypes = {
  queryData: prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({
    limit: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
    orderBy: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    order: prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOf(_base__WEBPACK_IMPORTED_MODULE_1__.ALLOWED_ORDER_VALUES)
  })
};
/**
 * Default attributes for this model
 *
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

const defaultQueryData = {
  queryData: {
    limit: 25,
    orderBy: 'statusCode',
    order: _base__WEBPACK_IMPORTED_MODULE_1__.QUERY_ORDER_ASC
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

const mapOrderBy = orderBy => {
  const orderByMap = {
    statusCode: 'STS_code'
  };
  return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
};
/**
 * Builds where conditions for an events endpoint request using provided
 * information.
 *
 * @param {number} statusType 	ID for type of Status to retrieve
 * @return {string}             The assembled where conditions.
 */

const whereConditions = _ref => {
  let {
    statusType
  } = _ref;
  const where = [];

  if (statusType) {
    where.push('where[STS_type]=' + statusType);
  }

  return where.join('&');
};
/**
 * Return a query string for use by a REST request given a set of queryData.
 *
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */

const getQueryString = function () {
  let queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  queryData = { ...defaultQueryData.queryData,
    ...queryData
  };
  return (0,_base__WEBPACK_IMPORTED_MODULE_1__.getQueryString)(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./assets/src/data/model/ticket/constants.js":
/*!***************************************************!*\
  !*** ./assets/src/data/model/ticket/constants.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MODEL_NAME": function() { return /* binding */ MODEL_NAME; },
/* harmony export */   "TICKET_STATUS_ID": function() { return /* binding */ TICKET_STATUS_ID; },
/* harmony export */   "TICKET_STATUS_IDS": function() { return /* binding */ TICKET_STATUS_IDS; }
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

const MODEL_NAME = 'ticket';
const TICKET_STATUS_ID = {
  SOLD_OUT: 'TKS',
  EXPIRED: 'TKE',
  ARCHIVED: 'TKA',
  PENDING: 'TKP',
  ONSALE: 'TKO'
};
const TICKET_STATUS_IDS = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.values)(TICKET_STATUS_ID);

/***/ }),

/***/ "./assets/src/data/model/ticket/index.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/ticket/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MODEL_NAME": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.MODEL_NAME; },
/* harmony export */   "TICKET_STATUS_ID": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.TICKET_STATUS_ID; },
/* harmony export */   "TICKET_STATUS_IDS": function() { return /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.TICKET_STATUS_IDS; },
/* harmony export */   "defaultQueryData": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.defaultQueryData; },
/* harmony export */   "getQueryString": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.getQueryString; },
/* harmony export */   "mapOrderBy": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.mapOrderBy; },
/* harmony export */   "nowDateAndTime": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.nowDateAndTime; },
/* harmony export */   "queryDataTypes": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.queryDataTypes; },
/* harmony export */   "whereConditions": function() { return /* reexport safe */ _query__WEBPACK_IMPORTED_MODULE_1__.whereConditions; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/src/data/model/ticket/constants.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./assets/src/data/model/ticket/query.js");



/***/ }),

/***/ "./assets/src/data/model/ticket/query.js":
/*!***********************************************!*\
  !*** ./assets/src/data/model/ticket/query.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultQueryData": function() { return /* binding */ defaultQueryData; },
/* harmony export */   "getQueryString": function() { return /* binding */ getQueryString; },
/* harmony export */   "mapOrderBy": function() { return /* binding */ mapOrderBy; },
/* harmony export */   "nowDateAndTime": function() { return /* binding */ nowDateAndTime; },
/* harmony export */   "queryDataTypes": function() { return /* binding */ queryDataTypes; },
/* harmony export */   "whereConditions": function() { return /* binding */ whereConditions; }
/* harmony export */ });
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment-timezone */ "moment-timezone");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ "./assets/src/data/model/base.js");
/**
 * External imports
 */




const nowDateAndTime = moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()();
/**
 * Described attributes for this model
 *
 * @type {{attributes: *}}
 */

const queryDataTypes = {
  queryData: prop_types__WEBPACK_IMPORTED_MODULE_3___default().shape({
    limit: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
    orderBy: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf(['TKT_name', 'TKT_ID', 'start_date', 'end_date']),
    order: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf(_base__WEBPACK_IMPORTED_MODULE_2__.ALLOWED_ORDER_VALUES),
    showExpired: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
    month: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().month)
  })
};
/**
 * Default attributes for this model
 *
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

const defaultQueryData = {
  queryData: {
    limit: 100,
    orderBy: 'start_date',
    order: _base__WEBPACK_IMPORTED_MODULE_2__.QUERY_ORDER_DESC,
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

const mapOrderBy = orderBy => {
  const orderByMap = {
    start_date: 'TKT_start_date',
    end_date: 'TKT_end_date'
  };
  return (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(orderByMap[orderBy]) ? orderBy : orderByMap[orderBy];
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

const whereConditions = _ref => {
  let {
    forEventId = 0,
    forDatetimeId = 0,
    showExpired = false,
    month = 'none'
  } = _ref;
  const where = [];

  if (!showExpired) {
    where.push('where[TKT_end_date**expired][]=' + _base__WEBPACK_IMPORTED_MODULE_2__.GREATER_THAN + '&where[TKT_end_date**expired][]=' + nowDateAndTime.local().format());
  }

  if (month && month !== 'none') {
    where.push('where[TKT_start_date][]=' + _base__WEBPACK_IMPORTED_MODULE_2__.GREATER_THAN_AND_EQUAL + '&where[TKT_start_date][]=' + moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().month(month).startOf('month').local().format());
    where.push('where[TKT_end_date][]=' + _base__WEBPACK_IMPORTED_MODULE_2__.LESS_THAN_AND_EQUAL + '&where[TKT_end_date][]=' + moment_timezone__WEBPACK_IMPORTED_MODULE_0___default()().month(month).endOf('month').local().format());
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
 *
 * @param { Object } queryData
 * @return { string }  Returns the query string.
 */

const getQueryString = function () {
  let queryData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  queryData = { ...defaultQueryData.queryData,
    ...queryData
  };
  return (0,_base__WEBPACK_IMPORTED_MODULE_2__.getQueryString)(queryData, whereConditions, mapOrderBy);
};

/***/ }),

/***/ "./node_modules/memize/index.js":
/*!**************************************!*\
  !*** ./node_modules/memize/index.js ***!
  \**************************************/
/***/ (function(module) {

/**
 * Memize options object.
 *
 * @typedef MemizeOptions
 *
 * @property {number} [maxSize] Maximum size of the cache.
 */

/**
 * Internal cache entry.
 *
 * @typedef MemizeCacheNode
 *
 * @property {?MemizeCacheNode|undefined} [prev] Previous node.
 * @property {?MemizeCacheNode|undefined} [next] Next node.
 * @property {Array<*>}                   args   Function arguments for cache
 *                                               entry.
 * @property {*}                          val    Function result.
 */

/**
 * Properties of the enhanced function for controlling cache.
 *
 * @typedef MemizeMemoizedFunction
 *
 * @property {()=>void} clear Clear the cache.
 */

/**
 * Accepts a function to be memoized, and returns a new memoized function, with
 * optional options.
 *
 * @template {Function} F
 *
 * @param {F}             fn        Function to memoize.
 * @param {MemizeOptions} [options] Options object.
 *
 * @return {F & MemizeMemoizedFunction} Memoized function.
 */
function memize( fn, options ) {
	var size = 0;

	/** @type {?MemizeCacheNode|undefined} */
	var head;

	/** @type {?MemizeCacheNode|undefined} */
	var tail;

	options = options || {};

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
				/** @type {MemizeCacheNode} */ ( node.prev ).next = node.next;
				if ( node.next ) {
					node.next.prev = node.prev;
				}

				node.next = head;
				node.prev = null;
				/** @type {MemizeCacheNode} */ ( head ).prev = node;
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
			val: fn.apply( null, args ),
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
		if ( size === /** @type {MemizeOptions} */ ( options ).maxSize ) {
			tail = /** @type {MemizeCacheNode} */ ( tail ).prev;
			/** @type {MemizeCacheNode} */ ( tail ).next = null;
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

	// Ignore reason: There's not a clear solution to create an intersection of
	// the function with additional properties, where the goal is to retain the
	// function signature of the incoming argument and add control properties
	// on the return value.

	// @ts-ignore
	return memoized;
}

module.exports = memize;


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ (function(module) {

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
/***/ (function(module) {

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
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

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
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

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
    } catch (x) { /**/ }
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
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
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
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

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
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
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
    bigint: createPrimitiveTypeChecker('bigint'),
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
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
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
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
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

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
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
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
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
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
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

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
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
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
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
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
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
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

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
/***/ (function(module) {

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

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ (function(module) {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
/** @license React v16.13.1
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
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

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
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
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
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "@eventespresso/helpers":
/*!***********************************!*\
  !*** external ["eejs","helpers"] ***!
  \***********************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"]["helpers"];

/***/ }),

/***/ "@eventespresso/i18n":
/*!********************************!*\
  !*** external ["eejs","i18n"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"]["i18n"];

/***/ }),

/***/ "@eventespresso/validators":
/*!**************************************!*\
  !*** external ["eejs","validators"] ***!
  \**************************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"]["validators"];

/***/ }),

/***/ "@eventespresso/value-objects":
/*!****************************************!*\
  !*** external ["eejs","valueObjects"] ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"]["valueObjects"];

/***/ }),

/***/ "cuid":
/*!*****************************************!*\
  !*** external ["eejs","vendor","cuid"] ***!
  \*****************************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"]["vendor"]["cuid"];

/***/ }),

/***/ "moment-timezone":
/*!*******************************************!*\
  !*** external ["eejs","vendor","moment"] ***!
  \*******************************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"]["vendor"]["moment"];

/***/ }),

/***/ "@eventespresso/eejs":
/*!*************************!*\
  !*** external ["eejs"] ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _defineProperty; }
/* harmony export */ });
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!****************************************!*\
  !*** ./assets/src/data/model/index.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALLOWED_ORDER_VALUES": function() { return /* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_5__.ALLOWED_ORDER_VALUES; },
/* harmony export */   "DEFAULT_CORE_STATE": function() { return /* reexport safe */ _default_model_state__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_CORE_STATE; },
/* harmony export */   "DEFAULT_LISTS_STATE": function() { return /* reexport safe */ _default_model_state__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_LISTS_STATE; },
/* harmony export */   "DEFAULT_SCHEMA_STATE": function() { return /* reexport safe */ _default_model_state__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_SCHEMA_STATE; },
/* harmony export */   "GREATER_THAN": function() { return /* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_5__.GREATER_THAN; },
/* harmony export */   "GREATER_THAN_AND_EQUAL": function() { return /* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_5__.GREATER_THAN_AND_EQUAL; },
/* harmony export */   "LESS_THAN": function() { return /* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_5__.LESS_THAN; },
/* harmony export */   "LESS_THAN_AND_EQUAL": function() { return /* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_5__.LESS_THAN_AND_EQUAL; },
/* harmony export */   "MODEL_NAMES": function() { return /* reexport safe */ _model_names__WEBPACK_IMPORTED_MODULE_4__.MODEL_NAMES; },
/* harmony export */   "MODEL_PREFIXES": function() { return /* reexport safe */ _entity_factory__WEBPACK_IMPORTED_MODULE_7__.MODEL_PREFIXES; },
/* harmony export */   "QUERY_ORDER_ASC": function() { return /* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_5__.QUERY_ORDER_ASC; },
/* harmony export */   "QUERY_ORDER_DESC": function() { return /* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_5__.QUERY_ORDER_DESC; },
/* harmony export */   "SAVE_STATE": function() { return /* reexport safe */ _entity_factory__WEBPACK_IMPORTED_MODULE_7__.SAVE_STATE; },
/* harmony export */   "applyQueryString": function() { return /* reexport safe */ _endpoints__WEBPACK_IMPORTED_MODULE_1__.applyQueryString; },
/* harmony export */   "assertEntityHasKey": function() { return /* reexport safe */ _assertions__WEBPACK_IMPORTED_MODULE_3__.assertEntityHasKey; },
/* harmony export */   "assertImmutableObjectHasPath": function() { return /* reexport safe */ _assertions__WEBPACK_IMPORTED_MODULE_3__.assertImmutableObjectHasPath; },
/* harmony export */   "assertIsArray": function() { return /* reexport safe */ _assertions__WEBPACK_IMPORTED_MODULE_3__.assertIsArray; },
/* harmony export */   "assertIsMap": function() { return /* reexport safe */ _assertions__WEBPACK_IMPORTED_MODULE_3__.assertIsMap; },
/* harmony export */   "assertIsNotEmpty": function() { return /* reexport safe */ _assertions__WEBPACK_IMPORTED_MODULE_3__.assertIsNotEmpty; },
/* harmony export */   "attendeeModel": function() { return /* reexport safe */ _models__WEBPACK_IMPORTED_MODULE_6__.attendeeModel; },
/* harmony export */   "baseRestRoute": function() { return /* reexport safe */ _endpoints__WEBPACK_IMPORTED_MODULE_1__.baseRestRoute; },
/* harmony export */   "checkInModel": function() { return /* reexport safe */ _models__WEBPACK_IMPORTED_MODULE_6__.checkInModel; },
/* harmony export */   "createAndKeyEntitiesByPrimaryKeyValue": function() { return /* reexport safe */ _primary_keys__WEBPACK_IMPORTED_MODULE_2__.createAndKeyEntitiesByPrimaryKeyValue; },
/* harmony export */   "createEntityFactory": function() { return /* reexport safe */ _entity_factory__WEBPACK_IMPORTED_MODULE_7__.createEntityFactory; },
/* harmony export */   "dateTimeModel": function() { return /* reexport safe */ _models__WEBPACK_IMPORTED_MODULE_6__.dateTimeModel; },
/* harmony export */   "endpoints": function() { return /* reexport safe */ _endpoints__WEBPACK_IMPORTED_MODULE_1__.endpoints; },
/* harmony export */   "eventModel": function() { return /* reexport safe */ _models__WEBPACK_IMPORTED_MODULE_6__.eventModel; },
/* harmony export */   "getEndpoint": function() { return /* reexport safe */ _endpoints__WEBPACK_IMPORTED_MODULE_1__.getEndpoint; },
/* harmony export */   "getEntityPrimaryKeyValues": function() { return /* reexport safe */ _primary_keys__WEBPACK_IMPORTED_MODULE_2__.getEntityPrimaryKeyValues; },
/* harmony export */   "getPrimaryKey": function() { return /* reexport safe */ _primary_keys__WEBPACK_IMPORTED_MODULE_2__.getPrimaryKey; },
/* harmony export */   "getPrimaryKeyQueryString": function() { return /* reexport safe */ _primary_keys__WEBPACK_IMPORTED_MODULE_2__.getPrimaryKeyQueryString; },
/* harmony export */   "getQueryString": function() { return /* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_5__.getQueryString; },
/* harmony export */   "keyEntitiesByPrimaryKeyValue": function() { return /* reexport safe */ _primary_keys__WEBPACK_IMPORTED_MODULE_2__.keyEntitiesByPrimaryKeyValue; },
/* harmony export */   "modelNameForQueryString": function() { return /* reexport safe */ _model_names__WEBPACK_IMPORTED_MODULE_4__.modelNameForQueryString; },
/* harmony export */   "pluralModelName": function() { return /* reexport safe */ _model_names__WEBPACK_IMPORTED_MODULE_4__.pluralModelName; },
/* harmony export */   "primaryKeys": function() { return /* reexport safe */ _primary_keys__WEBPACK_IMPORTED_MODULE_2__.primaryKeys; },
/* harmony export */   "registrationModel": function() { return /* reexport safe */ _models__WEBPACK_IMPORTED_MODULE_6__.registrationModel; },
/* harmony export */   "singularModelName": function() { return /* reexport safe */ _model_names__WEBPACK_IMPORTED_MODULE_4__.singularModelName; },
/* harmony export */   "statusModel": function() { return /* reexport safe */ _models__WEBPACK_IMPORTED_MODULE_6__.statusModel; },
/* harmony export */   "stripBaseRouteFromUrl": function() { return /* reexport safe */ _endpoints__WEBPACK_IMPORTED_MODULE_1__.stripBaseRouteFromUrl; },
/* harmony export */   "ticketModel": function() { return /* reexport safe */ _models__WEBPACK_IMPORTED_MODULE_6__.ticketModel; },
/* harmony export */   "valueForPrimaryKey": function() { return /* reexport safe */ _primary_keys__WEBPACK_IMPORTED_MODULE_2__.valueForPrimaryKey; },
/* harmony export */   "valuesForCombinedPrimaryKeys": function() { return /* reexport safe */ _primary_keys__WEBPACK_IMPORTED_MODULE_2__.valuesForCombinedPrimaryKeys; }
/* harmony export */ });
/* harmony import */ var _default_model_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default-model-state */ "./assets/src/data/model/default-model-state.js");
/* harmony import */ var _endpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endpoints */ "./assets/src/data/model/endpoints.js");
/* harmony import */ var _primary_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./primary-keys */ "./assets/src/data/model/primary-keys.js");
/* harmony import */ var _assertions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assertions */ "./assets/src/data/model/assertions.js");
/* harmony import */ var _model_names__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./model-names */ "./assets/src/data/model/model-names.js");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base */ "./assets/src/data/model/base.js");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./models */ "./assets/src/data/model/models.js");
/* harmony import */ var _entity_factory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./entity-factory */ "./assets/src/data/model/entity-factory/index.js");








}();
(this.eejs = this.eejs || {}).model = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRlc3ByZXNzby1tb2RlbC5hOWJiYzZlZTk1MmI5MTg2MjczMC5kaXN0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1NLGtCQUFrQixHQUFHLFVBQUNDLEdBQUQsRUFBTUMsTUFBTixFQUErQjtFQUFBLElBQWpCQyxPQUFpQix1RUFBUCxFQUFPOztFQUNoRSxJQUFJQSxPQUFPLEtBQUssRUFBaEIsRUFBb0I7SUFDbkJBLE9BQU8sR0FBR1IsNERBQU8sQ0FDaEJDLHVEQUFFLENBQ0QsZ0VBREMsRUFFRCxnQkFGQyxDQURjLEVBS2hCTSxNQUxnQixFQU1oQkQsR0FOZ0IsQ0FBakI7RUFRQTs7RUFDRCxJQUFJLENBQUNDLE1BQU0sQ0FBQ0UsY0FBUCxDQUFzQkgsR0FBdEIsQ0FBTCxFQUFpQztJQUNoQyxNQUFNLElBQUlQLDBEQUFKLENBQWNTLE9BQWQsQ0FBTjtFQUNBO0FBQ0QsQ0FkTTtBQWdCUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1FLDRCQUE0QixHQUFHLFVBQUNDLElBQUQsRUFBT0MsU0FBUCxFQUFtQztFQUFBLElBQWpCSixPQUFpQix1RUFBUCxFQUFPOztFQUM5RSxJQUFJQSxPQUFPLEtBQUssRUFBaEIsRUFBb0I7SUFDbkJBLE9BQU8sR0FBR1IsNERBQU8sQ0FDaEJDLHVEQUFFLENBQ0Qsc0VBREMsRUFFRCxnQkFGQyxDQURjLEVBS2hCVyxTQUxnQixFQU1oQkQsSUFOZ0IsQ0FBakI7RUFRQTs7RUFDRCxJQUFJLENBQUNDLFNBQVMsQ0FBQ0MsS0FBVixDQUFnQkYsSUFBaEIsQ0FBTCxFQUE0QjtJQUMzQixNQUFNLElBQUlaLDBEQUFKLENBQWNTLE9BQWQsQ0FBTjtFQUNBO0FBQ0QsQ0FkTTtBQWdCUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1NLGFBQWEsR0FBRyxVQUFDQyxLQUFELEVBQXlCO0VBQUEsSUFBakJQLE9BQWlCLHVFQUFQLEVBQU87O0VBQ3JELElBQUlBLE9BQU8sS0FBSyxFQUFoQixFQUFvQjtJQUNuQkEsT0FBTyxHQUFHUCx1REFBRSxDQUFDLHFDQUFELEVBQXdDLGdCQUF4QyxDQUFaO0VBQ0E7O0VBQ0QsSUFBSSxDQUFDQywrQ0FBTyxDQUFDYSxLQUFELENBQVosRUFBcUI7SUFDcEIsTUFBTSxJQUFJaEIsMERBQUosQ0FBY1MsT0FBZCxDQUFOO0VBQ0E7QUFDRCxDQVBNO0FBU1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1RLGdCQUFnQixHQUFHLFVBQUNELEtBQUQsRUFBeUI7RUFBQSxJQUFqQlAsT0FBaUIsdUVBQVAsRUFBTzs7RUFDeEQsSUFBSUEsT0FBTyxLQUFLLEVBQWhCLEVBQW9CO0lBQ25CQSxPQUFPLEdBQUdQLHVEQUFFLENBQUMsc0NBQUQsRUFBeUMsZ0JBQXpDLENBQVo7RUFDQTs7RUFDRCxJQUFJRSwrQ0FBTyxDQUFDWSxLQUFELENBQVgsRUFBb0I7SUFDbkIsTUFBTSxJQUFJaEIsMERBQUosQ0FBY1MsT0FBZCxDQUFOO0VBQ0E7QUFDRCxDQVBNO0FBU1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTVMsV0FBVyxHQUFHLFVBQUNDLElBQUQsRUFBd0I7RUFBQSxJQUFqQlYsT0FBaUIsdUVBQVAsRUFBTzs7RUFDbEQsSUFBSUEsT0FBTyxLQUFLLEVBQWhCLEVBQW9CO0lBQ25CQSxPQUFPLEdBQUdQLHVEQUFFLENBQ1gsd0NBRFcsRUFFWCxnQkFGVyxDQUFaO0VBSUE7O0VBQ0QsSUFBSSxDQUFDRyw2Q0FBSyxDQUFDYyxJQUFELENBQVYsRUFBa0I7SUFDakIsTUFBTSxJQUFJbkIsMERBQUosQ0FBY1MsT0FBZCxDQUFOO0VBQ0E7QUFDRCxDQVZNOzs7Ozs7Ozs7Ozs7Ozs7QUM1R0EsTUFBTVcsVUFBVSxHQUFHLFVBQW5COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFLQTtBQUVPLE1BQU1RLFVBQVUsR0FBRztFQUN6QkMsRUFBRSxFQUFFLFFBRHFCO0VBRXpCQyxZQUFZLEVBQUUsV0FGVztFQUd6QkMsYUFBYSxFQUFFLFdBSFU7RUFJekJDLGlCQUFpQixFQUFFLENBQUMsV0FBRCxFQUFjLFdBQWQsQ0FKTTtFQUt6QkMsaUJBQWlCLEVBQUUsQ0FBQyxXQUFELEVBQWMsV0FBZDtBQUxNLENBQW5CO0FBUVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNQyxjQUFjLEdBQUc7RUFDN0JDLFVBQVUsRUFBRWIsMERBRGlCO0VBRTdCZSxhQUFhLEVBQUVmLDBEQUZjO0VBRzdCZ0IsV0FBVyxFQUFFaEIsMERBSGdCO0VBSTdCaUIsV0FBVyxFQUFFakIsdURBQUEsQ0FBZ0JLLDRFQUFoQixDQUpnQjtFQUs3QmMsaUJBQWlCLEVBQUVuQiwwREFMVTtFQU03Qm9CLFlBQVksRUFBRXBCLHdEQU5lO0VBTzdCc0IsU0FBUyxFQUFFdEIsdURBQUEsQ0FBZ0I7SUFDMUJ3QixLQUFLLEVBQUV4QiwwREFEbUI7SUFFMUJ5QixPQUFPLEVBQUV6Qix1REFBQSxDQUFnQjBCLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZckIsVUFBWixDQUFoQixDQUZpQjtJQUcxQnNCLEtBQUssRUFBRTVCLHVEQUFBLENBQWdCSSx1REFBaEI7RUFIbUIsQ0FBaEI7QUFQa0IsQ0FBdkI7QUFjUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNeUIsZ0JBQWdCLEdBQUc7RUFDL0JQLFNBQVMsRUFBRTtJQUNWRSxLQUFLLEVBQUUsR0FERztJQUVWQyxPQUFPLEVBQUUsbUJBRkM7SUFHVkcsS0FBSyxFQUFFekIsa0RBQWVBO0VBSFo7QUFEb0IsQ0FBekI7QUFRUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU0yQixVQUFVLEdBQUlMLE9BQUQsSUFBYTtFQUN0QyxPQUFPMUIsbURBQVcsQ0FBQ08sVUFBVSxDQUFDbUIsT0FBRCxDQUFYLENBQVgsR0FBbUNBLE9BQW5DLEdBQTZDbkIsVUFBVSxDQUFDbUIsT0FBRCxDQUE5RDtBQUNBLENBRk07QUFJUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1NLGVBQWUsR0FBRyxRQU96QjtFQUFBLElBUDBCO0lBQy9CbEIsVUFBVSxHQUFHLENBRGtCO0lBRS9CRSxhQUFhLEdBQUcsQ0FGZTtJQUcvQkMsV0FBVyxHQUFHLENBSGlCO0lBSS9CRyxpQkFBaUIsR0FBRyxDQUpXO0lBSy9CRixXQUFXLEdBQUcsS0FMaUI7SUFNL0JHLFlBQVksR0FBRztFQU5nQixDQU8xQjtFQUNMLE1BQU1ZLEtBQUssR0FBRyxFQUFkLENBREssQ0FHTDs7RUFDQWIsaUJBQWlCLEdBQUdjLFFBQVEsQ0FBQ2QsaUJBQUQsRUFBb0IsRUFBcEIsQ0FBNUI7RUFDQUgsV0FBVyxHQUFHaUIsUUFBUSxDQUFDakIsV0FBRCxFQUFjLEVBQWQsQ0FBdEI7RUFDQUQsYUFBYSxHQUFHa0IsUUFBUSxDQUFDbEIsYUFBRCxFQUFnQixFQUFoQixDQUF4QjtFQUNBRixVQUFVLEdBQUdvQixRQUFRLENBQUNwQixVQUFELEVBQWEsRUFBYixDQUFyQixDQVBLLENBU0w7O0VBQ0EsSUFBSU0saUJBQWlCLEtBQUssQ0FBdEIsSUFBMkIsQ0FBQ2UsS0FBSyxDQUFDZixpQkFBRCxDQUFyQyxFQUEwRDtJQUN6RGEsS0FBSyxDQUFDRyxJQUFOLENBQVksOEJBQTZCaEIsaUJBQWtCLEVBQTNEO0VBQ0EsQ0FGRCxNQUVPLElBQUlILFdBQVcsS0FBSyxDQUFoQixJQUFxQixDQUFDa0IsS0FBSyxDQUFDbEIsV0FBRCxDQUEvQixFQUE4QztJQUNwRGdCLEtBQUssQ0FBQ0csSUFBTixDQUFZLHFDQUFvQ25CLFdBQVksRUFBNUQ7RUFDQSxDQUZNLE1BRUEsSUFBSUQsYUFBYSxLQUFLLENBQWxCLElBQXVCLENBQUNtQixLQUFLLENBQUNuQixhQUFELENBQWpDLEVBQWtEO0lBQ3hEaUIsS0FBSyxDQUFDRyxJQUFOLENBQ0UsOENBQTZDcEIsYUFBYyxFQUQ3RDtFQUdBLENBSk0sTUFJQSxJQUFJRixVQUFVLEtBQUssQ0FBZixJQUFvQixDQUFDcUIsS0FBSyxDQUFDckIsVUFBRCxDQUE5QixFQUE0QztJQUNsRG1CLEtBQUssQ0FBQ0csSUFBTixDQUFZLDhCQUE2QnRCLFVBQVcsRUFBcEQ7RUFDQTs7RUFFRCxJQUFJUixxRkFBQSxDQUFpQ1ksV0FBakMsQ0FBSixFQUFtRDtJQUNsRGUsS0FBSyxDQUFDRyxJQUFOLENBQVkscUNBQW9DbEIsV0FBWSxFQUE1RDtFQUNBOztFQUNELElBQUlHLFlBQVksS0FBSyxJQUFyQixFQUEyQjtJQUMxQlksS0FBSyxDQUFDRyxJQUFOLENBQVcsdUJBQVg7RUFDQTs7RUFDRCxPQUFPSCxLQUFLLENBQUNLLElBQU4sQ0FBVyxHQUFYLENBQVA7QUFDQSxDQXBDTTtBQXNDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTXBDLGNBQWMsR0FBRyxZQUFvQjtFQUFBLElBQW5CcUIsU0FBbUIsdUVBQVAsRUFBTztFQUNqREEsU0FBUyxHQUFHLEVBQUUsR0FBR08sZ0JBQWdCLENBQUNQLFNBQXRCO0lBQWlDLEdBQUdBO0VBQXBDLENBQVo7RUFDQSxPQUFPcEIscURBQWtCLENBQUNvQixTQUFELEVBQVlTLGVBQVosRUFBNkJELFVBQTdCLENBQXpCO0FBQ0EsQ0FITTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1TLHFCQUFxQixHQUFHLFlBS2hDO0VBQUEsSUFKSkMsUUFJSSx1RUFKTyxFQUlQO0VBQUEsSUFISkMsZ0JBR0ksdUVBSGUsRUFHZjtFQUFBLElBRkpDLE1BRUksdUVBRktKLDRFQUVMO0VBQUEsSUFESk0sS0FDSSx1RUFESSxJQUNKOztFQUNKLElBQUk5RCwrQ0FBTyxDQUFDMEQsUUFBRCxDQUFQLElBQXFCMUQsK0NBQU8sQ0FBQzJELGdCQUFELENBQWhDLEVBQW9EO0lBQ25ELE9BQU9ELFFBQVA7RUFDQTs7RUFDRCxNQUFNSyxpQkFBaUIsR0FBRyxFQUExQjtFQUNBTCxRQUFRLENBQUNNLE9BQVQsQ0FBa0I1RCxNQUFELElBQVk7SUFDNUIyRCxpQkFBaUIsQ0FBQ1YsSUFBbEIsQ0FDQ1ksbUJBQW1CLENBQUM3RCxNQUFELEVBQVN1RCxnQkFBVCxFQUEyQkMsTUFBM0IsRUFBbUNFLEtBQW5DLENBRHBCO0VBR0EsQ0FKRDtFQUtBLE9BQU9DLGlCQUFQO0FBQ0EsQ0FoQk07QUFrQlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1FLG1CQUFtQixHQUFHLFlBSzlCO0VBQUEsSUFKSjdELE1BSUksdUVBSkssRUFJTDtFQUFBLElBSEp1RCxnQkFHSSx1RUFIZSxFQUdmO0VBQUEsSUFGSkMsTUFFSSx1RUFGS0osNEVBRUw7RUFBQSxJQURKTSxLQUNJLHVFQURJLElBQ0o7RUFDSixNQUFNSSxTQUFTLEdBQUcsRUFBRSxHQUFHOUQ7RUFBTCxDQUFsQjtFQUNBdUQsZ0JBQWdCLENBQUNLLE9BQWpCLENBQTBCRyxTQUFELElBQWU7SUFDdkMsSUFBSUQsU0FBUyxDQUFDQyxTQUFELENBQWIsRUFBMEI7TUFDekJELFNBQVMsQ0FBQ0MsU0FBRCxDQUFULEdBQXVCWCxvRUFBQSxDQUN0QlUsU0FBUyxDQUFDQyxTQUFELENBRGEsRUFFdEJQLE1BRnNCLEVBR3RCRSxLQUhzQixDQUF2QjtJQUtBO0VBQ0QsQ0FSRDtFQVNBLE9BQU9JLFNBQVA7QUFDQSxDQWpCTTtBQW1CUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTUcsMEJBQTBCLEdBQUcsWUFJckM7RUFBQSxJQUhKWCxRQUdJLHVFQUhPLEVBR1A7RUFBQSxJQUZKQyxnQkFFSSx1RUFGZSxFQUVmO0VBQUEsSUFESkcsS0FDSSx1RUFESSxJQUNKO0VBQ0osT0FBT0wscUJBQXFCLENBQzNCQyxRQUQyQixFQUUzQkMsZ0JBRjJCLEVBRzNCSCwwRUFIMkIsRUFJM0JNLEtBSjJCLENBQTVCO0FBTUEsQ0FYTTtBQWFQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTVMsd0JBQXdCLEdBQUcsWUFJbkM7RUFBQSxJQUhKbkUsTUFHSSx1RUFISyxFQUdMO0VBQUEsSUFGSnVELGdCQUVJLHVFQUZlLEVBRWY7RUFBQSxJQURKRyxLQUNJLHVFQURJLElBQ0o7RUFDSixPQUFPRyxtQkFBbUIsQ0FDekI3RCxNQUR5QixFQUV6QnVELGdCQUZ5QixFQUd6QkgsMEVBSHlCLEVBSXpCTSxLQUp5QixDQUExQjtBQU1BLENBWE07QUFhUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTVUseUJBQXlCLEdBQUcsWUFJcEM7RUFBQSxJQUhKZCxRQUdJLHVFQUhPLEVBR1A7RUFBQSxJQUZKQyxnQkFFSSx1RUFGZSxFQUVmO0VBQUEsSUFESkcsS0FDSSx1RUFESSxJQUNKO0VBQ0osT0FBT0wscUJBQXFCLENBQzNCQyxRQUQyQixFQUUzQkMsZ0JBRjJCLEVBRzNCSCx5RUFIMkIsRUFJM0JNLEtBSjJCLENBQTVCO0FBTUEsQ0FYTTtBQWFQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTVksdUJBQXVCLEdBQUcsWUFJbEM7RUFBQSxJQUhKdEUsTUFHSSx1RUFISyxFQUdMO0VBQUEsSUFGSnVELGdCQUVJLHVFQUZlLEVBRWY7RUFBQSxJQURKRyxLQUNJLHVFQURJLElBQ0o7RUFDSixPQUFPRyxtQkFBbUIsQ0FDekI3RCxNQUR5QixFQUV6QnVELGdCQUZ5QixFQUd6QkgseUVBSHlCLEVBSXpCTSxLQUp5QixDQUExQjtBQU1BLENBWE07QUFhUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNYSw0QkFBNEIsR0FBRyxZQUd2QztFQUFBLElBRkpqQixRQUVJLHVFQUZPLEVBRVA7RUFBQSxJQURKQyxnQkFDSSx1RUFEZSxFQUNmOztFQUNKLElBQUkzRCwrQ0FBTyxDQUFDMEQsUUFBRCxDQUFQLElBQXFCMUQsK0NBQU8sQ0FBQzJELGdCQUFELENBQWhDLEVBQW9EO0lBQ25ELE9BQU9ELFFBQVA7RUFDQTs7RUFDRCxNQUFNSyxpQkFBaUIsR0FBRyxFQUExQjtFQUNBTCxRQUFRLENBQUNNLE9BQVQsQ0FBa0I1RCxNQUFELElBQVk7SUFDNUIyRCxpQkFBaUIsQ0FBQ1YsSUFBbEIsQ0FDQ3VCLDBCQUEwQixDQUFDeEUsTUFBRCxFQUFTdUQsZ0JBQVQsQ0FEM0I7RUFHQSxDQUpEO0VBS0EsT0FBT0ksaUJBQVA7QUFDQSxDQWRNO0FBZ0JQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1hLDBCQUEwQixHQUFHLFlBR3JDO0VBQUEsSUFGSnhFLE1BRUksdUVBRkssRUFFTDtFQUFBLElBREp1RCxnQkFDSSx1RUFEZSxFQUNmO0VBQ0osTUFBTU8sU0FBUyxHQUFHLEVBQUUsR0FBRzlEO0VBQUwsQ0FBbEI7RUFDQXVELGdCQUFnQixDQUFDSyxPQUFqQixDQUEwQkcsU0FBRCxJQUFlO0lBQ3ZDLElBQUlELFNBQVMsQ0FBQ0MsU0FBRCxDQUFiLEVBQTBCO01BQ3pCRCxTQUFTLENBQUNDLFNBQUQsQ0FBVCxHQUF1Qlgsa0VBQUEsQ0FDdEJVLFNBQVMsQ0FBQ0MsU0FBRCxDQURhLENBQXZCO0lBR0E7RUFDRCxDQU5EO0VBT0EsT0FBT0QsU0FBUDtBQUNBLENBYk07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFNUDtBQUNBO0FBQ0E7QUFDQTtBQUVPLE1BQU03QyxlQUFlLEdBQUcsS0FBeEI7QUFDQSxNQUFNeUQsZ0JBQWdCLEdBQUcsTUFBekI7QUFDQSxNQUFNeEQsb0JBQW9CLEdBQUcsQ0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixLQUFoQixFQUF1QixNQUF2QixDQUE3QjtBQUNBLE1BQU15RCxZQUFZLEdBQUdDLGtCQUFrQixDQUFDLEdBQUQsQ0FBdkM7QUFDQSxNQUFNQyxTQUFTLEdBQUdELGtCQUFrQixDQUFDLEdBQUQsQ0FBcEM7QUFDQSxNQUFNRSxzQkFBc0IsR0FBR0Ysa0JBQWtCLENBQUMsSUFBRCxDQUFqRDtBQUNBLE1BQU1HLG1CQUFtQixHQUFHSCxrQkFBa0IsQ0FBQyxJQUFELENBQTlDO0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNN0QsY0FBYyxHQUFHLFlBSXpCO0VBQUEsSUFISnFCLFNBR0ksdUVBSFEsRUFHUjtFQUFBLElBRkpTLGVBRUksdUVBRmMsTUFBTSxJQUVwQjtFQUFBLElBREpELFVBQ0ksdUVBRFVMLE9BQUQsSUFBYUEsT0FDdEI7RUFDSixNQUFNTyxLQUFLLEdBQUdELGVBQWUsQ0FBQ1QsU0FBRCxDQUE3QjtFQUNBLE1BQU07SUFBRUUsS0FBRjtJQUFTSSxLQUFUO0lBQWdCSCxPQUFoQjtJQUF5QnlDO0VBQXpCLElBQW9ENUMsU0FBMUQ7RUFDQSxNQUFNNkMsV0FBVyxHQUFHLEVBQXBCOztFQUNBLElBQUksQ0FBQ3BFLG1EQUFXLENBQUN5QixLQUFELENBQWhCLEVBQXlCO0lBQ3hCMkMsV0FBVyxDQUFDaEMsSUFBWixDQUFrQixTQUFRWCxLQUFNLEVBQWhDO0VBQ0E7O0VBQ0QsSUFBSSxDQUFDekIsbURBQVcsQ0FBQ21FLHNCQUFELENBQWhCLEVBQTBDO0lBQ3pDQyxXQUFXLENBQUNoQyxJQUFaLENBQWtCLDRCQUEyQitCLHNCQUF1QixFQUFwRTtFQUNBOztFQUNELElBQUksQ0FBQ25FLG1EQUFXLENBQUMrQixVQUFVLENBQUNMLE9BQUQsQ0FBWCxDQUFoQixFQUF1QztJQUN0QyxJQUFJNUMsK0NBQU8sQ0FBQ2lELFVBQVUsQ0FBQ0wsT0FBRCxDQUFYLENBQVgsRUFBa0M7TUFDakMsS0FBSyxNQUFNMkMsS0FBWCxJQUFvQnRDLFVBQVUsQ0FBQ0wsT0FBRCxDQUE5QixFQUF5QztRQUN4QzBDLFdBQVcsQ0FBQ2hDLElBQVosQ0FBa0IsWUFBV2lDLEtBQU0sS0FBSXhDLEtBQU0sRUFBN0M7TUFDQTtJQUNELENBSkQsTUFJTztNQUNOdUMsV0FBVyxDQUFDaEMsSUFBWixDQUFrQixTQUFRUCxLQUFNLEVBQWhDO01BQ0F1QyxXQUFXLENBQUNoQyxJQUFaLENBQWtCLFlBQVdMLFVBQVUsQ0FBQ0wsT0FBRCxDQUFVLEVBQWpEO0lBQ0E7RUFDRDs7RUFDRCxJQUFJNEMsV0FBVyxHQUFHRixXQUFXLENBQUM5QixJQUFaLENBQWlCLEdBQWpCLENBQWxCOztFQUNBLElBQUlMLEtBQUosRUFBVztJQUNWcUMsV0FBVyxJQUFJLE1BQU1yQyxLQUFyQjtFQUNBOztFQUNELE9BQU9xQyxXQUFQO0FBQ0EsQ0E3Qk07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QlA7QUFDQTtBQUNBO0FBQ0E7QUFFTyxNQUFNdkUsVUFBVSxHQUFHLFNBQW5CO0FBRUEsTUFBTXlFLGlCQUFpQixHQUFHO0VBQ2hDQyxrQkFBa0IsRUFBRSxLQURZO0VBRWhDQyxpQkFBaUIsRUFBRSxJQUZhO0VBR2hDQyxvQkFBb0IsRUFBRTtBQUhVLENBQTFCO0FBTUEsTUFBTUMsa0JBQWtCLEdBQUdMLDhDQUFNLENBQUNDLGlCQUFELENBQWpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYlA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFLQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTTNELGNBQWMsR0FBRztFQUM3QkcsYUFBYSxFQUFFZiwwREFEYztFQUU3QmEsVUFBVSxFQUFFYiwwREFGaUI7RUFHN0JtQixpQkFBaUIsRUFBRW5CLDBEQUhVO0VBSTdCZ0IsV0FBVyxFQUFFaEIsMERBSmdCO0VBSzdCaUIsV0FBVyxFQUFFakIsdURBQUEsQ0FBZ0I2RSwwREFBaEIsQ0FMZ0I7RUFNN0J2RCxTQUFTLEVBQUV0Qix1REFBQSxDQUFnQjtJQUMxQndCLEtBQUssRUFBRXhCLDBEQURtQjtJQUUxQnlCLE9BQU8sRUFBRXpCLHVEQUFBLENBQWdCLENBQ3hCLFFBRHdCLEVBRXhCLFFBRndCLEVBR3hCLGVBSHdCLEVBSXhCLFFBSndCLENBQWhCLENBRmlCO0lBUTFCNEIsS0FBSyxFQUFFNUIsdURBQUEsQ0FBZ0JJLHVEQUFoQjtFQVJtQixDQUFoQjtBQU5rQixDQUF2QjtBQWtCQSxNQUFNMEUsZ0JBQWdCLEdBQUc7RUFDL0JDLE9BQU8sRUFBRSxNQUFNO0lBQ2QsT0FBTyxDQUNOO01BQ0NDLEtBQUssRUFBRUoscURBQVksQ0FDbEJDLDRFQURrQixDQURwQjtNQUlDSSxLQUFLLEVBQUVKLDRFQUFrREw7SUFKMUQsQ0FETSxFQU9OO01BQ0NRLEtBQUssRUFBRUoscURBQVksQ0FDbEJDLDJFQURrQixDQURwQjtNQUlDSSxLQUFLLEVBQUVKLDJFQUFpREo7SUFKekQsQ0FQTSxDQUFQO0VBY0E7QUFoQjhCLENBQXpCO0FBbUJQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU01QyxnQkFBZ0IsR0FBRztFQUMvQlAsU0FBUyxFQUFFO0lBQ1ZFLEtBQUssRUFBRSxHQURHO0lBRVZDLE9BQU8sRUFBRSxlQUZDO0lBR1ZHLEtBQUssRUFBRWdDLG1EQUFnQkE7RUFIYjtBQURvQixDQUF6QjtBQVFQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNOUIsVUFBVSxHQUFJTCxPQUFELElBQWE7RUFDdEMsTUFBTW5CLFVBQVUsR0FBRztJQUNsQjRFLFNBQVMsRUFBRSxlQURPO0lBRWxCM0UsRUFBRSxFQUFFO0VBRmMsQ0FBbkI7RUFJQSxPQUFPUixtREFBVyxDQUFDTyxVQUFVLENBQUNtQixPQUFELENBQVgsQ0FBWCxHQUFtQ0EsT0FBbkMsR0FBNkNuQixVQUFVLENBQUNtQixPQUFELENBQTlEO0FBQ0EsQ0FOTTtBQVFQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1NLGVBQWUsR0FBRyxRQU16QjtFQUFBLElBTjBCO0lBQy9CaEIsYUFBYSxHQUFHLENBRGU7SUFFL0JGLFVBQVUsR0FBRyxDQUZrQjtJQUcvQk0saUJBQWlCLEdBQUcsQ0FIVztJQUkvQkgsV0FBVyxHQUFHLENBSmlCO0lBSy9CQyxXQUFXLEdBQUc7RUFMaUIsQ0FNMUI7RUFDTCxNQUFNZSxLQUFLLEdBQUcsRUFBZDtFQUNBbkIsVUFBVSxHQUFHb0IsUUFBUSxDQUFDcEIsVUFBRCxFQUFhLEVBQWIsQ0FBckI7O0VBQ0EsSUFBSUEsVUFBVSxLQUFLLENBQWYsSUFBb0IsQ0FBQ3FCLEtBQUssQ0FBQ3JCLFVBQUQsQ0FBOUIsRUFBNEM7SUFDM0NtQixLQUFLLENBQUNHLElBQU4sQ0FBVyxnQ0FBZ0N0QixVQUEzQztFQUNBOztFQUNERSxhQUFhLEdBQUdrQixRQUFRLENBQUNsQixhQUFELEVBQWdCLEVBQWhCLENBQXhCOztFQUNBLElBQUlBLGFBQWEsS0FBSyxDQUFsQixJQUF1QixDQUFDbUIsS0FBSyxDQUFDbkIsYUFBRCxDQUFqQyxFQUFrRDtJQUNqRGlCLEtBQUssQ0FBQ0csSUFBTixDQUFXLG1CQUFtQnBCLGFBQTlCO0VBQ0E7O0VBQ0RJLGlCQUFpQixHQUFHYyxRQUFRLENBQUNkLGlCQUFELEVBQW9CLEVBQXBCLENBQTVCOztFQUNBLElBQUlBLGlCQUFpQixLQUFLLENBQXRCLElBQTJCLENBQUNlLEtBQUssQ0FBQ2YsaUJBQUQsQ0FBckMsRUFBMEQ7SUFDekRhLEtBQUssQ0FBQ0csSUFBTixDQUFXLG1CQUFtQmhCLGlCQUE5QjtFQUNBOztFQUNESCxXQUFXLEdBQUdpQixRQUFRLENBQUNqQixXQUFELEVBQWMsRUFBZCxDQUF0Qjs7RUFDQSxJQUFJQSxXQUFXLEtBQUssQ0FBaEIsSUFBcUIsQ0FBQ2tCLEtBQUssQ0FBQ2xCLFdBQUQsQ0FBL0IsRUFBOEM7SUFDN0NnQixLQUFLLENBQUNHLElBQU4sQ0FBVyxnQ0FBZ0NuQixXQUEzQztFQUNBOztFQUNELElBQUlDLFdBQVcsS0FBSyxFQUFoQixJQUFzQkEsV0FBVyxLQUFLLElBQTFDLEVBQWdEO0lBQy9DZSxLQUFLLENBQUNHLElBQU4sQ0FBVyxtQkFBbUJsQixXQUE5QjtFQUNBOztFQUNELE9BQU9lLEtBQUssQ0FBQ0ssSUFBTixDQUFXLEdBQVgsQ0FBUDtBQUNBLENBNUJNO0FBOEJQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNcEMsY0FBYyxHQUFHLFlBQW9CO0VBQUEsSUFBbkJxQixTQUFtQix1RUFBUCxFQUFPO0VBQ2pEQSxTQUFTLEdBQUcsRUFBRSxHQUFHTyxnQkFBZ0IsQ0FBQ1AsU0FBdEI7SUFBaUMsR0FBR0E7RUFBcEMsQ0FBWjtFQUNBLE9BQU9wQixxREFBa0IsQ0FBQ29CLFNBQUQsRUFBWVMsZUFBWixFQUE2QkQsVUFBN0IsQ0FBekI7QUFDQSxDQUhNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0lQO0FBRU8sTUFBTWhDLFVBQVUsR0FBRyxVQUFuQjtBQUVBLE1BQU1xRixrQkFBa0IsR0FBRztFQUNqQ0MsUUFBUSxFQUFFLEtBRHVCO0VBRWpDQyxNQUFNLEVBQUUsS0FGeUI7RUFHakNDLFFBQVEsRUFBRSxLQUh1QjtFQUlqQ0MsU0FBUyxFQUFFLEtBSnNCO0VBS2pDQyxTQUFTLEVBQUUsS0FMc0I7RUFNakNDLE9BQU8sRUFBRSxLQU53QjtFQU9qQ0MsUUFBUSxFQUFFO0FBUHVCLENBQTNCO0FBVUEsTUFBTUMsbUJBQW1CLEdBQUdyQiw4Q0FBTSxDQUFDYSxrQkFBRCxDQUFsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkUDtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBTUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1nQixXQUFXLEdBQUcsQ0FBQyxlQUFELEVBQWtCLGFBQWxCLENBQXBCO0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLE1BQU1DLFVBQVUsR0FBRyxFQUFuQjtBQUVBUCw4Q0FBTSxDQUFDRCxpREFBRCxFQUFnQixDQUFDUyxjQUFELEVBQWlCQyxZQUFqQixLQUFrQztFQUN2REYsVUFBVSxDQUFDRSxZQUFELENBQVYsR0FBMkIsWUFBcUI7SUFBQSxrQ0FBakJDLFlBQWlCO01BQWpCQSxZQUFpQjtJQUFBOztJQUMvQyxNQUFNQyxRQUFRLEdBQUdWLDhDQUFNLENBQUNTLFlBQUQsRUFBZSxDQUFmLENBQXZCO0lBQ0EsT0FBT0YsY0FBYyxDQUFDRyxRQUFRLENBQUMsQ0FBRCxDQUFULEVBQWNMLFdBQWQsRUFBMkIsR0FBR0ksWUFBOUIsQ0FBckI7RUFDQSxDQUhEO0FBSUEsQ0FMSyxDQUFOO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTUUsc0JBQXNCLEdBQUlDLGNBQUQsSUFBb0I7RUFDekQsSUFBSUMsT0FBTyxHQUFHLEVBQWQ7O0VBQ0EsSUFBSVQsK0VBQW9CLENBQUNRLGNBQUQsRUFBaUIsVUFBakIsQ0FBeEIsRUFBc0Q7SUFDckQsSUFDQ0EsY0FBYyxDQUFDRSxhQUFmLENBQTZCQyxPQUE3QixDQUNDSCxjQUFjLENBQUNJLFdBRGhCLEVBRUMsS0FGRCxDQURELEVBS0U7TUFDREgsT0FBTyxJQUFJWCw0RUFBb0IsQ0FDOUJDLDhFQUQ4QixFQUU5QlMsY0FBYyxDQUFDRSxhQUFmLENBQTZCRyxRQUE3QixDQUFzQ3hELHlFQUF0QyxDQUY4QixFQUc5Qm1ELGNBQWMsQ0FBQ0ksV0FBZixDQUEyQkMsUUFBM0IsQ0FBb0NoQixvRUFBcEMsQ0FIOEIsQ0FBL0I7SUFLQSxDQVhELE1BV087TUFDTlksT0FBTyxJQUFJWCw0RUFBb0IsQ0FDOUJDLDhFQUQ4QixFQUU5QlMsY0FBYyxDQUFDRSxhQUFmLENBQTZCRyxRQUE3QixDQUFzQ3hELHlFQUF0QyxDQUY4QixFQUc5Qm1ELGNBQWMsQ0FBQ0ksV0FBZixDQUEyQkMsUUFBM0IsQ0FBb0N4RCx5RUFBcEMsQ0FIOEIsQ0FBL0I7SUFLQTs7SUFDRG9ELE9BQU8sR0FBR0QsY0FBYyxDQUFDTSxRQUFmLEdBQ04sR0FBRU4sY0FBYyxDQUFDTSxRQUFTLEtBQUlMLE9BQVEsR0FEaEMsR0FFUEEsT0FGSDtFQUdBOztFQUNELE9BQU9BLE9BQVA7QUFDQSxDQTFCTTtBQTRCUCwrREFBZVAsVUFBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9GQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBU08sTUFBTWMsY0FBYyxHQUFHRCxzREFBTSxFQUE3QjtBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTXJHLGNBQWMsR0FBRztFQUM3QlUsU0FBUyxFQUFFdEIsdURBQUEsQ0FBZ0I7SUFDMUJ3QixLQUFLLEVBQUV4QiwwREFEbUI7SUFFMUJ5QixPQUFPLEVBQUV6Qix1REFBQSxDQUFnQixDQUN4QixVQUR3QixFQUV4QixRQUZ3QixFQUd4QixZQUh3QixFQUl4QixVQUp3QixDQUFoQixDQUZpQjtJQVExQjRCLEtBQUssRUFBRTVCLHVEQUFBLENBQWdCSSx1REFBaEIsQ0FSbUI7SUFTMUIrRyxXQUFXLEVBQUVuSCx3REFUYTtJQVUxQm9ILEtBQUssRUFBRXBILHlEQUFlb0g7RUFWSSxDQUFoQjtBQURrQixDQUF2QjtBQWVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTXZGLGdCQUFnQixHQUFHO0VBQy9CUCxTQUFTLEVBQUU7SUFDVkUsS0FBSyxFQUFFLEdBREc7SUFFVkMsT0FBTyxFQUFFLFlBRkM7SUFHVkcsS0FBSyxFQUFFZ0MsbURBSEc7SUFJVnVELFdBQVcsRUFBRTtFQUpIO0FBRG9CLENBQXpCO0FBU1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1yRixVQUFVLEdBQUlMLE9BQUQsSUFBYTtFQUN0QyxNQUFNbkIsVUFBVSxHQUFHO0lBQ2xCK0csVUFBVSxFQUFFLGVBRE07SUFFbEJDLFFBQVEsRUFBRTtFQUZRLENBQW5CO0VBSUEsT0FBT3ZILG1EQUFXLENBQUNPLFVBQVUsQ0FBQ21CLE9BQUQsQ0FBWCxDQUFYLEdBQW1DQSxPQUFuQyxHQUE2Q25CLFVBQVUsQ0FBQ21CLE9BQUQsQ0FBOUQ7QUFDQSxDQU5NO0FBUVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTU0sZUFBZSxHQUFHLFFBSXpCO0VBQUEsSUFKMEI7SUFDL0JsQixVQUFVLEdBQUcsQ0FEa0I7SUFFL0JzRyxXQUFXLEdBQUcsS0FGaUI7SUFHL0JDLEtBQUssR0FBRztFQUh1QixDQUkxQjtFQUNMLE1BQU1wRixLQUFLLEdBQUcsRUFBZDs7RUFDQSxJQUFJLENBQUNtRixXQUFMLEVBQWtCO0lBQ2pCbkYsS0FBSyxDQUFDRyxJQUFOLENBQ0MsbUNBQ0MwQiwrQ0FERCxHQUVDLGlDQUZELEdBR0NxRCxjQUFjLENBQUN0RSxLQUFmLEdBQXVCRixNQUF2QixFQUpGO0VBTUE7O0VBQ0QsSUFBSTBFLEtBQUssSUFBSUEsS0FBSyxLQUFLLE1BQXZCLEVBQStCO0lBQzlCcEYsS0FBSyxDQUFDRyxJQUFOLENBQ0MsNEJBQ0M2Qix5REFERCxHQUVDLDBCQUZELEdBR0NpRCxzREFBTSxHQUFHRyxLQUFULENBQWVBLEtBQWYsRUFBc0JHLE9BQXRCLENBQThCLE9BQTlCLEVBQXVDM0UsS0FBdkMsR0FBK0NGLE1BQS9DLEVBSkY7SUFNQVYsS0FBSyxDQUFDRyxJQUFOLENBQ0MsMEJBQ0M4QixzREFERCxHQUVDLHdCQUZELEdBR0NnRCxzREFBTSxHQUFHRyxLQUFULENBQWVBLEtBQWYsRUFBc0JJLEtBQXRCLENBQTRCLE9BQTVCLEVBQXFDNUUsS0FBckMsR0FBNkNGLE1BQTdDLEVBSkY7RUFNQTs7RUFDRCxJQUFJVCxRQUFRLENBQUNwQixVQUFELEVBQWEsRUFBYixDQUFSLEtBQTZCLENBQWpDLEVBQW9DO0lBQ25DbUIsS0FBSyxDQUFDRyxJQUFOLENBQVcseUJBQXlCdEIsVUFBcEM7RUFDQTs7RUFDRCxPQUFPbUIsS0FBSyxDQUFDSyxJQUFOLENBQVcsR0FBWCxDQUFQO0FBQ0EsQ0FoQ007QUFrQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1wQyxjQUFjLEdBQUcsWUFBb0I7RUFBQSxJQUFuQnFCLFNBQW1CLHVFQUFQLEVBQU87RUFDakRBLFNBQVMsR0FBRyxFQUFFLEdBQUdPLGdCQUFnQixDQUFDUCxTQUF0QjtJQUFpQyxHQUFHQTtFQUFwQyxDQUFaO0VBQ0EsT0FBT3BCLHFEQUFrQixDQUFDb0IsU0FBRCxFQUFZUyxlQUFaLEVBQTZCRCxVQUE3QixDQUF6QjtBQUNBLENBSE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLE1BQU04RixpQkFBaUIsR0FBSUMsa0JBQUQsSUFBd0I7RUFDakQsT0FBT0osaURBQVMsQ0FBQ0ksa0JBQUQsRUFBcUIsWUFBWTtJQUNoRCxPQUFPLEVBQVA7RUFDQSxDQUZlLENBQWhCO0FBR0EsQ0FKRDs7QUFNQSxNQUFNQyw2QkFBNkIsR0FBR0osNkNBQU8sQ0FBQyxNQUM3Q0UsaUJBQWlCLENBQUNELG9EQUFELENBRDJCLENBQTdDO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNSSxtQkFBbUIsR0FBR0gsaUJBQWlCLENBQUNELG9EQUFELENBQTdDO0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNSyxrQkFBa0IsR0FBRztFQUNqQ3hGLFFBQVEsRUFBRSxFQUNULEdBQUdzRiw2QkFBNkI7RUFEdkIsQ0FEdUI7RUFJakNHLFNBQVMsRUFBRSxFQUpzQjtFQUtqQ0MsS0FBSyxFQUFFO0lBQ05ELFNBQVMsRUFBRTtNQUNWRSxLQUFLLEVBQUUsRUFERztNQUVWQyxNQUFNLEVBQUUsRUFGRTtNQUdWQyxHQUFHLEVBQUU7SUFISyxDQURMO0lBTU5DLEtBQUssRUFBRSxFQU5EO0lBT05GLE1BQU0sRUFBRTtFQVBGO0FBTDBCLENBQTNCO0FBZ0JQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTUcsb0JBQW9CLEdBQUc7RUFDbkNDLE1BQU0sRUFBRSxFQUNQLEdBQUdWLDZCQUE2QjtFQUR6QixDQUQyQjtFQUluQ1csT0FBTyxFQUFFLEVBQ1IsR0FBR1gsNkJBQTZCO0VBRHhCLENBSjBCO0VBT25DWSxpQkFBaUIsRUFBRSxFQUNsQixHQUFHWiw2QkFBNkI7RUFEZCxDQVBnQjtFQVVuQ2EsY0FBYyxFQUFFO0FBVm1CLENBQTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RQO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNO0VBQ1pFLG9CQUFvQixFQUFFbEIsU0FBUyxHQUFHLEVBRHRCO0VBRVptQixlQUFlLEVBQUVDO0FBRkwsSUFHVEgsMkRBSEc7QUFLUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNSyxXQUFXLEdBQUlDLFNBQUQsSUFBZTtFQUN6Q2xLLCtEQUFrQixDQUFDa0ssU0FBRCxFQUFZdkIsU0FBWixDQUFsQjtFQUNBLE9BQU9BLFNBQVMsQ0FBQ3VCLFNBQUQsQ0FBaEI7QUFDQSxDQUhNO0FBS1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTUMsZ0JBQWdCLEdBQUcsVUFBQ0QsU0FBRCxFQUFpQztFQUFBLElBQXJCN0UsV0FBcUIsdUVBQVAsRUFBTztFQUNoRSxPQUFPQSxXQUFXLEtBQUssRUFBaEIsR0FDSjRFLFdBQVcsQ0FBQ0MsU0FBRCxDQUFYLEdBQXlCLEdBQXpCLEdBQStCN0UsV0FEM0IsR0FFSjRFLFdBQVcsQ0FBQ0MsU0FBRCxDQUZkO0FBR0EsQ0FKTTtBQU1QO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1FLHFCQUFxQixHQUFJQyxHQUFELElBQVM7RUFDN0MsT0FBT0EsR0FBRyxDQUFDQyxPQUFKLENBQVlQLGFBQVosRUFBMkIsRUFBM0IsQ0FBUDtBQUNBLENBRk07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcERQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQU1BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1vQixzQkFBc0IsR0FBRyxDQUFDQyxTQUFELEVBQVlDLFVBQVosRUFBd0I3QixNQUF4QixLQUFtQztFQUN4RSxJQUFJb0IsMERBQWUsQ0FBQ1EsU0FBRCxFQUFZNUIsTUFBWixDQUFuQixFQUF3QztJQUN2Q21CLHlGQUFBLENBQTBCVSxVQUExQjtFQUNBOztFQUNELElBQUlSLHVEQUFZLENBQUNPLFNBQUQsRUFBWTVCLE1BQVosQ0FBaEIsRUFBcUM7SUFDcENpQiwyRUFBQSxDQUFrQlksVUFBbEI7RUFDQTtBQUNELENBUE07QUFTUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTUcsaUJBQWlCLEdBQUloQyxNQUFELElBQVk7RUFDNUMsSUFBSSxDQUFDZ0IsbUVBQVEsQ0FBQ2hCLE1BQUQsQ0FBYixFQUF1QjtJQUN0QixNQUFNLElBQUllLDhEQUFKLENBQWtCLHdDQUFsQixDQUFOO0VBQ0E7QUFDRCxDQUpNO0FBTVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNa0IsZ0NBQWdDLEdBQUcsQ0FDL0N2QixTQUQrQyxFQUUvQ2tCLFNBRitDLEVBRy9DNUIsTUFIK0MsS0FJM0M7RUFDSixJQUFJekksbURBQVcsQ0FBQ3lJLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBUCxDQUFmLEVBQW9DO0lBQ25DLE1BQU0sSUFBSU0sU0FBSixDQUNML0wsNERBQU8sQ0FDTiw0RUFETSxFQUVOeUwsU0FGTSxFQUdObEIsU0FITSxDQURGLENBQU47RUFPQTs7RUFDRCxJQUFJVixNQUFNLENBQUM0QixTQUFELENBQU4sQ0FBa0JPLElBQWxCLEtBQTJCLFFBQS9CLEVBQXlDO0lBQ3hDLElBQUk1SyxtREFBVyxDQUFDeUksTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCUSxVQUFuQixDQUFmLEVBQStDO01BQzlDLE1BQU0sSUFBSXJCLDhEQUFKLENBQ0w1Syw0REFBTyxDQUNOLDBHQURNLEVBRU55TCxTQUZNLEVBR05sQixTQUhNLENBREYsQ0FBTjtJQU9BOztJQUNELElBQUluSixtREFBVyxDQUFDeUksTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCUSxVQUFsQixDQUE2QkMsR0FBOUIsQ0FBZixFQUFtRDtNQUNsRCxNQUFNLElBQUl0Qiw4REFBSixDQUNMNUssNERBQU8sQ0FDTixrSUFETSxFQUVOeUwsU0FGTSxFQUdObEIsU0FITSxDQURGLENBQU47SUFPQTs7SUFDRCxJQUFJbkosbURBQVcsQ0FBQ3lJLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBTixDQUFrQlEsVUFBbEIsQ0FBNkJDLEdBQTdCLENBQWlDRixJQUFsQyxDQUFmLEVBQXdEO01BQ3ZELE1BQU0sSUFBSXBCLDhEQUFKLENBQ0w1Syw0REFBTyxDQUNOLDZKQURNLEVBRU55TCxTQUZNLEVBR05sQixTQUhNLENBREYsQ0FBTjtJQU9BO0VBQ0Q7QUFDRCxDQTNDTTtBQTZDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTTRCLGdDQUFnQyxHQUFHLENBQy9DVixTQUQrQyxFQUUvQ0MsVUFGK0MsRUFHL0NVLFFBSCtDLEtBSTNDO0VBQ0osTUFBTTtJQUFFdkM7RUFBRixJQUFhdUMsUUFBbkI7RUFDQSxJQUFJQyxPQUFPLEdBQUdsQix3RUFBMkIsQ0FBQ00sU0FBRCxFQUFZQyxVQUFaLEVBQXdCN0IsTUFBeEIsQ0FBekM7O0VBQ0EsSUFDQyxDQUFDd0MsT0FBRCxJQUNBeEMsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCTyxJQUFsQixLQUEyQixRQUQzQixJQUVBbkMsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCUSxVQUhuQixFQUlFO0lBQ0RJLE9BQU8sR0FBR3hDLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBTixDQUFrQlEsVUFBbEIsQ0FBNkJDLEdBQTdCLENBQWlDSSxJQUFqQyxHQUNQbEIsNkRBQWdCLENBQ2hCdkIsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCUSxVQUFsQixDQUE2QkMsR0FBN0IsQ0FBaUNGLElBRGpCLEVBRWhCbkMsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCUSxVQUFsQixDQUE2QkMsR0FBN0IsQ0FBaUNJLElBRmpCLEVBR2hCWixVQUhnQixDQURULEdBTVBMLHlEQUFZLENBQ1p4QixNQUFNLENBQUM0QixTQUFELENBQU4sQ0FBa0JRLFVBQWxCLENBQTZCQyxHQUE3QixDQUFpQ0YsSUFEckIsRUFFWlQsc0ZBQXlDLENBQ3hDRSxTQUR3QyxFQUV4Q0MsVUFGd0MsRUFHeEM3QixNQUh3QyxDQUY3QixDQU5mOztJQWNBLElBQUksQ0FBQ3dDLE9BQUwsRUFBYztNQUNiLE1BQU0sSUFBSU4sU0FBSixDQUNML0wsNERBQU8sQ0FDTiwwSUFETSxFQUVOeUwsU0FGTSxFQUdOQyxVQUhNLEVBSU43QixNQUFNLENBQUM0QixTQUFELENBQU4sQ0FBa0JRLFVBQWxCLENBQTZCQyxHQUE3QixDQUFpQ0YsSUFKM0IsQ0FERixDQUFOO0lBUUE7RUFDRDs7RUFDRCxJQUFJLENBQUNLLE9BQUwsRUFBYztJQUNiLE1BQU0sSUFBSU4sU0FBSixDQUNML0wsNERBQU8sQ0FDTix5RkFETSxFQUVOeUwsU0FGTSxFQUdOQyxVQUhNLEVBSU43QixNQUFNLENBQUM0QixTQUFELENBQU4sQ0FBa0JPLElBSlosQ0FERixDQUFOO0VBUUE7QUFDRCxDQS9DTTtBQWlEUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNTyxxQ0FBcUMsR0FBRyxDQUNwRGhDLFNBRG9ELEVBRXBEa0IsU0FGb0QsRUFHcERDLFVBSG9ELEVBSXBEVSxRQUpvRCxLQUtoRDtFQUNKLE1BQU12QyxNQUFNLEdBQUd1QyxRQUFRLENBQUN2QyxNQUF4QjtFQUNBLE1BQU0yQyxjQUFjLEdBQUdsQixpRUFBb0IsQ0FBQ0csU0FBRCxFQUFZVyxRQUFaLENBQTNDO0VBQ0FOLGdDQUFnQyxDQUFDdkIsU0FBRCxFQUFZa0IsU0FBWixFQUF1QjVCLE1BQXZCLENBQWhDO0VBQ0EsSUFBSXdDLE9BQU8sR0FBR2xCLHdFQUEyQixDQUN4Q00sU0FEd0MsRUFFeENDLFVBRndDLEVBR3hDN0IsTUFId0MsRUFJeEMsS0FKd0MsQ0FBekMsQ0FKSSxDQVVKO0VBQ0E7O0VBQ0EsSUFBSUEsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCTyxJQUFsQixLQUEyQixRQUEzQixJQUF1Q25DLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBTixDQUFrQlEsVUFBN0QsRUFBeUU7SUFDeEUsSUFBSTdLLG1EQUFXLENBQUNzSyxVQUFVLENBQUNjLGNBQUQsQ0FBWCxDQUFmLEVBQTZDO01BQzVDLE1BQU0sSUFBSVQsU0FBSixDQUNML0wsNERBQU8sQ0FDTixpSEFETSxFQUVOeUwsU0FGTSxFQUdOZSxjQUhNLENBREYsQ0FBTjtJQU9BOztJQUNESCxPQUFPLEdBQUd4QyxNQUFNLENBQUM0QixTQUFELENBQU4sQ0FBa0JRLFVBQWxCLENBQTZCTyxjQUE3QixFQUE2Q0YsSUFBN0MsR0FDUGxCLDZEQUFnQixDQUNoQnZCLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBTixDQUFrQlEsVUFBbEIsQ0FBNkJPLGNBQTdCLEVBQTZDUixJQUQ3QixFQUVoQm5DLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBTixDQUFrQlEsVUFBbEIsQ0FBNkJDLEdBQTdCLENBQWlDSSxJQUZqQixFQUdoQlosVUFBVSxDQUFDYyxjQUFELENBSE0sQ0FEVCxHQU1QbkIseURBQVksQ0FDWnhCLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBTixDQUFrQlEsVUFBbEIsQ0FBNkJPLGNBQTdCLEVBQTZDUixJQURqQyxFQUVaTixVQUFVLENBQUNjLGNBQUQsQ0FGRSxDQU5mOztJQVVBLElBQUksQ0FBQ0gsT0FBTCxFQUFjO01BQ2IsTUFBTSxJQUFJTixTQUFKLENBQ0wvTCw0REFBTyxDQUNOLDBJQURNLEVBRU55TCxTQUZNLEVBR05lLGNBSE0sRUFJTmQsVUFKTSxFQUtON0IsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCUSxVQUFsQixDQUE2Qk8sY0FBN0IsRUFBNkNSLElBTHZDLENBREYsQ0FBTjtJQVNBO0VBQ0Q7O0VBQ0QsSUFBSSxDQUFDSyxPQUFMLEVBQWM7SUFDYixNQUFNLElBQUlOLFNBQUosQ0FDTC9MLDREQUFPLENBQ04seUZBRE0sRUFFTnlMLFNBRk0sRUFHTkMsVUFITSxFQUlON0IsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCTyxJQUpaLENBREYsQ0FBTjtFQVFBO0FBQ0QsQ0EzRE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVNUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFNQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O3dCQUVFZ0I7d0JBQ0FBOztBQUZGLE1BQU1FLFVBQU4sQ0FBaUI7RUFJaEI7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0NDLFdBQVcsQ0FDVjVDLFNBRFUsRUFFVjZDLHFCQUZVLEVBR1Z2RCxNQUhVLEVBTVQ7SUFBQSxJQUZEd0QsYUFFQyx1RUFGZSxFQUVmO0lBQUEsSUFEREMsS0FDQyx1RUFETyxLQUNQOztJQUFBLCtHQWxCZ0NQLHdEQWtCaEM7O0lBQUEsK0dBakJvQyxFQWlCcEM7O0lBQ0RsQiw4REFBaUIsQ0FBQ2hDLE1BQUQsQ0FBakI7SUFDQXdELGFBQWEsR0FBR25OLCtDQUFPLENBQUNtTixhQUFELENBQVAsR0FBeUJBLGFBQXpCLEdBQXlDLEVBQXpEO0lBQ0FWLHFEQUFZLENBQUMsSUFBRCxFQUFPLGVBQVAsRUFBd0JVLGFBQXhCLENBQVo7SUFDQVYscURBQVksQ0FBQyxJQUFELEVBQU8sUUFBUCxFQUFpQjlDLE1BQU0sQ0FBQ29DLFVBQXhCLENBQVo7SUFDQWEscURBQVksQ0FBQyxJQUFELEVBQU9RLEtBQUssR0FBR1Asc0RBQUgsR0FBb0JBLHdEQUFoQyxDQUFaO0lBQ0FKLHFEQUFZLENBQUMsSUFBRCxFQUFPLFdBQVAsRUFBb0JwQyxTQUFwQixDQUFaO0lBQ0FvQyxxREFBWSxDQUFDLElBQUQsRUFBTyx5QkFBUCxFQUFrQ1MscUJBQWxDLENBQVo7SUFDQVQscURBQVksQ0FDWCxJQURXLEVBRVgseUJBRlcsRUFHWCxJQUFJYyxHQUFKLENBQVExSyxNQUFNLENBQUNDLElBQVAsQ0FBWW9LLHFCQUFaLENBQVIsQ0FIVyxDQUFaO0lBS0FSLHNFQUE2QixDQUFDLElBQUQsQ0FBN0I7SUFDQUMsMEVBQWlDLENBQUMsSUFBRCxDQUFqQztJQUNBOUosTUFBTSxDQUFDMkssSUFBUCxDQUFZLElBQVo7RUFDQTtFQUVEO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0VBQ2MsSUFBVEMsU0FBUyxHQUFHO0lBQ2YsT0FBTyxLQUFLWCxxRUFBTCxDQUFQO0VBQ0E7RUFFRDtBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7RUFDVSxJQUFMTSxLQUFLLEdBQUc7SUFDWCxPQUFPLEtBQUtLLFNBQUwsS0FBbUJaLHNEQUExQjtFQUNBO0VBRUQ7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7O0VBQ1ksSUFBUGEsT0FBTyxHQUFHO0lBQ2IsT0FBTyxLQUFLRCxTQUFMLEtBQW1CWix3REFBMUI7RUFDQTtFQUVEO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7OztFQUNZLElBQVBlLE9BQU8sR0FBRztJQUNiLE9BQU8sS0FBS0gsU0FBTCxLQUFtQlosd0RBQTFCO0VBQ0E7RUFFRDtBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7RUFDd0IsSUFBbkJnQixtQkFBbUIsR0FBRztJQUN6QixPQUFPLEtBQUtDLGVBQUwsQ0FBcUJDLE1BQXJCLEdBQThCLENBQXJDO0VBQ0E7RUFFRDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztFQUM2QixJQUF4QkMsd0JBQXdCLEdBQUc7SUFDOUIsT0FBUXpDLFNBQUQsSUFBZSxLQUFLdUMsZUFBTCxDQUFxQkcsT0FBckIsQ0FBNkIxQyxTQUE3QixJQUEwQyxDQUFDLENBQWpFO0VBQ0E7RUFFRDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0VBQ1UsSUFBTDJDLEtBQUssR0FBRztJQUFBOztJQUNYLE9BQU8sWUFBb0I7TUFBQSxJQUFuQkMsTUFBbUIsdUVBQVYsS0FBVTtNQUMxQixNQUFNQyxhQUFhLEdBQUd2Riw2Q0FBTyxDQUFDLE1BQzdCd0YsbUJBQW1CLENBQ2xCLEtBQUksQ0FBQ2hFLFNBRGEsRUFFbEI7UUFBRWlFLE9BQU8sRUFBRSxFQUFYO1FBQWV2QyxVQUFVLEVBQUUsS0FBSSxDQUFDcEM7TUFBaEMsQ0FGa0IsRUFHbEIsS0FBSSxDQUFDd0QsYUFIYSxDQURTLENBQTdCO01BT0EsTUFBTXZELE9BQU8sR0FBR3dFLGFBQWEsRUFBN0I7TUFDQSxNQUFNakssU0FBUyxHQUFHeUYsT0FBTyxDQUFDMkUsU0FBUixDQUFrQixLQUFJLENBQUNDLFFBQXZCLENBQWxCOztNQUNBLElBQUlMLE1BQUosRUFBWTtRQUNYaEssU0FBUyxDQUFDekMsRUFBVixHQUFlLEtBQUksQ0FBQ0EsRUFBcEI7UUFDQWtMLHFEQUFZLENBQUN6SSxTQUFELEVBQVksS0FBSSxDQUFDc0osU0FBakIsRUFBNEIsSUFBNUIsQ0FBWjtNQUNBOztNQUNELE9BQU90SixTQUFQO0lBQ0EsQ0FmRDtFQWdCQTs7QUEzSGU7QUFnSWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztrRkF2SU02SSxvQkE2SFM7O0FBV2YsTUFBTXlCLFNBQVMsR0FBRyxDQUFDQyxJQUFELEVBQU9DLGFBQVAsS0FBeUI7RUFDMUMsT0FBTyxjQUFjQSxhQUFkLENBQTRCO0lBQ25CLFdBQUpELElBQUksR0FBRztNQUNqQixPQUFPQSxJQUFQO0lBQ0E7O0VBSGlDLENBQW5DO0FBS0EsQ0FORDtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsTUFBTUwsbUJBQW1CLEdBQUcsVUFBQ2hFLFNBQUQsRUFBWVYsTUFBWixFQUEyQztFQUFBLElBQXZCd0QsYUFBdUIsdUVBQVAsRUFBTztFQUN0RSxNQUFNeUIsTUFBTSxHQUFHSCxTQUFTLENBQUNsQyxrREFBVSxDQUFDQyxpREFBUyxDQUFDbkMsU0FBRCxDQUFWLENBQVgsRUFBbUMyQyxVQUFuQyxDQUF4QjtFQUNBLE9BQU87SUFDTjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDRTNDLFNBUE07O0lBUU47QUFDRjtBQUNBO0FBQ0E7SUFDRXdFLFFBQVEsRUFBRUQsTUFaSjs7SUFhTjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDRUwsU0FBUyxFQUFHTyxlQUFELElBQ1YsSUFBSUYsTUFBSixDQUFXdkUsU0FBWCxFQUFzQnlFLGVBQXRCLEVBQXVDbkYsTUFBdkMsRUFBK0N3RCxhQUEvQyxFQUE4RCxJQUE5RCxDQW5DSzs7SUFvQ047QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNFNEIsWUFBWSxFQUFHRCxlQUFELElBQ2IsSUFBSUYsTUFBSixDQUFXdkUsU0FBWCxFQUFzQnlFLGVBQXRCLEVBQXVDbkYsTUFBdkMsRUFBK0N3RCxhQUEvQztFQW5ESyxDQUFQO0FBcURBLENBdkREOztBQXdEQSwrREFBZWtCLG1CQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pQQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNWSxjQUFjLEdBQUk3SSxLQUFELElBQzdCNEkscURBQWEsQ0FBQzVJLEtBQUQsQ0FBYixJQUF3QixDQUFDbEYsbURBQVcsQ0FBQ2tGLEtBQUssQ0FBQzRGLEdBQVAsQ0FEOUI7QUFHUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTWtELGlCQUFpQixHQUFJOUksS0FBRCxJQUNoQzRJLHFEQUFhLENBQUM1SSxLQUFELENBQWIsSUFBd0IsQ0FBQ2xGLG1EQUFXLENBQUNrRixLQUFLLENBQUMrSSxNQUFQLENBRDlCO0FBR1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1DLG1CQUFtQixHQUFJaEosS0FBRCxJQUNsQzRJLHFEQUFhLENBQUM1SSxLQUFELENBQWIsSUFBd0IsQ0FBQ2xGLG1EQUFXLENBQUNrRixLQUFLLENBQUNpSixRQUFQLENBRDlCO0FBR1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1DLGlCQUFpQixHQUFJbEosS0FBRCxJQUNoQzRJLHFEQUFhLENBQUM1SSxLQUFELENBQWIsSUFBd0IsQ0FBQ2xGLG1EQUFXLENBQUNrRixLQUFLLENBQUN2QyxNQUFQLENBRDlCO0FBR1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTTBMLGVBQWUsR0FBSW5KLEtBQUQsSUFDOUI0SSxxREFBYSxDQUFDNUksS0FBRCxDQUFiLElBQXdCLENBQUNsRixtREFBVyxDQUFDa0YsS0FBSyxDQUFDZ0csSUFBUCxDQUQ5QjtBQUdQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1vRCxrQkFBa0IsR0FBRyxDQUFDakssS0FBRCxFQUFRb0UsTUFBUixLQUFtQjtFQUNwRCxPQUFPb0IsZUFBZSxDQUFDeEYsS0FBRCxFQUFRb0UsTUFBUixDQUFmLElBQWtDcUIsWUFBWSxDQUFDekYsS0FBRCxFQUFRb0UsTUFBUixDQUFyRDtBQUNBLENBRk07QUFJUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1vQixlQUFlLEdBQUcsQ0FBQ3hGLEtBQUQsRUFBUW9FLE1BQVIsS0FDOUIsQ0FBQ3pJLG1EQUFXLENBQUN5SSxNQUFNLENBQUNwRSxLQUFELENBQVAsQ0FBWixJQUNBK0osaUJBQWlCLENBQUMzRixNQUFNLENBQUNwRSxLQUFELENBQVAsQ0FEakIsSUFFQW9FLE1BQU0sQ0FBQ3BFLEtBQUQsQ0FBTixDQUFjMUIsTUFBZCxLQUF5QixXQUhuQjtBQUtQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU00TCxrQkFBa0IsR0FBRyxVQUFDQyxpQkFBRCxFQUFzQztFQUFBLElBQWxCL0YsTUFBa0IsdUVBQVQsSUFBUztFQUN2RSxPQUFPQSxNQUFNLEtBQUssSUFBWCxHQUNKb0IsZUFBZSxDQUFDMkUsaUJBQUQsRUFBb0IvRixNQUFwQixDQUFmLElBQ0ErRixpQkFBaUIsQ0FBQ3pCLE9BQWxCLENBQTBCLE1BQTFCLElBQW9DLENBRmhDLEdBR0p5QixpQkFBaUIsQ0FBQ3pCLE9BQWxCLENBQTBCLE1BQTFCLElBQW9DLENBSHZDO0FBSUEsQ0FMTTtBQU9QO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTTBCLGlCQUFpQixHQUFHLENBQUNwRSxTQUFELEVBQVk1QixNQUFaLEtBQ2hDLENBQUN6SSxtREFBVyxDQUFDeUksTUFBTSxDQUFDNEIsU0FBRCxDQUFQLENBQVosSUFDQSxDQUFDckssbURBQVcsQ0FBQ3lJLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBTixDQUFrQnFFLFdBQW5CLENBRk47QUFJUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1DLFVBQVUsR0FBRyxDQUFDdEUsU0FBRCxFQUFZNUIsTUFBWixLQUN6QixDQUFDekksbURBQVcsQ0FBQ3lJLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBUCxDQUFaLElBQ0EsQ0FBQ3JLLG1EQUFXLENBQUN5SSxNQUFNLENBQUM0QixTQUFELENBQU4sQ0FBa0J1RSxRQUFuQixDQURaLElBRUFuRyxNQUFNLENBQUM0QixTQUFELENBQU4sQ0FBa0J1RSxRQUhaO0FBS1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNQyxhQUFhLEdBQUcsQ0FBQ3hFLFNBQUQsRUFBWTVCLE1BQVosS0FDNUIsQ0FBQ3pJLG1EQUFXLENBQUN5SSxNQUFNLENBQUM0QixTQUFELENBQVAsQ0FBWixLQUNDLENBQUNzRSxVQUFVLENBQUN0RSxTQUFELEVBQVk1QixNQUFaLENBQVgsSUFBa0NnRyxpQkFBaUIsQ0FBQ3BFLFNBQUQsRUFBWTVCLE1BQVosQ0FEcEQsS0FFQSxDQUFDOEYsa0JBQWtCLENBQUNsRSxTQUFELENBRm5CLElBR0FBLFNBQVMsS0FBSyxZQUpSO0FBTVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1QLFlBQVksR0FBRyxDQUFDTyxTQUFELEVBQVk1QixNQUFaLEtBQzNCLENBQUN6SSxtREFBVyxDQUFDeUksTUFBTSxDQUFDNEIsU0FBRCxDQUFQLENBQVosSUFDQSxDQUFDckssbURBQVcsQ0FBQ3lJLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBTixDQUFrQlEsVUFBbkIsQ0FEWixJQUVBbUQsaUJBQWlCLENBQUN2RixNQUFNLENBQUM0QixTQUFELENBQU4sQ0FBa0JRLFVBQW5CLENBRmpCLElBR0F1RCxpQkFBaUIsQ0FBQzNGLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBTixDQUFrQlEsVUFBbEIsQ0FBNkJvRCxNQUE5QixDQUhqQixJQUlBeEYsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCUSxVQUFsQixDQUE2Qm9ELE1BQTdCLENBQW9DdEwsTUFBcEMsS0FBK0MsT0FMekM7QUFPUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTW1NLFdBQVcsR0FBRyxDQUFDekUsU0FBRCxFQUFZNUIsTUFBWixLQUMxQixDQUFDekksbURBQVcsQ0FBQ3lJLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBUCxDQUFaLElBQ0FnRSxlQUFlLENBQUM1RixNQUFNLENBQUM0QixTQUFELENBQVAsQ0FEZixJQUVBLENBQUNySyxtREFBVyxDQUFDeUksTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCYSxJQUFsQixDQUF1QjJCLE1BQXhCLENBRlosSUFHQXBFLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBTixDQUFrQmEsSUFBbEIsQ0FBdUIyQixNQUF2QixHQUFnQyxDQUoxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNLUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNbEIsVUFBVSxHQUFHO0VBQ3pCUSxLQUFLLEVBQUU2QyxNQUFNLENBQUMsc0JBQUQsQ0FEWTtFQUV6QjVDLEdBQUcsRUFBRTRDLE1BQU0sQ0FBQyxnQkFBRCxDQUZjO0VBR3pCdkMsS0FBSyxFQUFFdUMsTUFBTSxDQUFDLGtEQUFEO0FBSFksQ0FBbkI7QUFNUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1DLGFBQWEsR0FBRztFQUM1QkMsR0FBRyxFQUFFLEtBRHVCO0VBRTVCQyxRQUFRLEVBQUUsVUFGa0I7RUFHNUJDLE1BQU0sRUFBRTtBQUhvQixDQUF0QjtBQU1QO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTXhELGtCQUFrQixHQUFHO0VBQ2pDRCxVQUFVLEVBQUVxRCxNQUFNLENBQUMsc0NBQUQsQ0FEZTtFQUVqQ25ELGNBQWMsRUFBRW1ELE1BQU0sQ0FBQywwQ0FBRDtBQUZXLENBQTNCO0FBS1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNSyxjQUFjLEdBQUlsRyxTQUFELElBQWU7RUFDNUMsTUFBTW1HLFNBQVMsR0FBR1AsOERBQVksQ0FDN0IsaURBRDZCLEVBRTdCO0lBQ0NRLE1BQU0sRUFBRSxDQUFDLEtBQUQsQ0FEVDtJQUVDQyxRQUFRLEVBQUUsQ0FBQyxLQUFELENBRlg7SUFHQ0MsVUFBVSxFQUFFLENBQUMsS0FBRCxDQUhiO0lBSUNDLE9BQU8sRUFBRSxDQUFDLEtBQUQsQ0FKVjtJQUtDQyxPQUFPLEVBQUUsQ0FBQyxLQUFELENBTFY7SUFNQ0MsUUFBUSxFQUFFLENBQUMsS0FBRCxDQU5YO0lBT0NDLHVCQUF1QixFQUFFLENBQUMsS0FBRCxDQVAxQjtJQVFDQyxRQUFRLEVBQUUsQ0FBQyxLQUFELEVBQVEsU0FBUixDQVJYO0lBU0NDLGVBQWUsRUFBRSxDQUFDLEtBQUQsQ0FUbEI7SUFVQ0MsS0FBSyxFQUFFLENBQUMsS0FBRCxDQVZSO0lBV0NDLHNCQUFzQixFQUFFLENBQUMsS0FBRCxDQVh6QjtJQVlDQyxvQkFBb0IsRUFBRSxDQUFDLEtBQUQsQ0FadkI7SUFhQ0MsV0FBVyxFQUFFLENBQUMsS0FBRCxDQWJkO0lBY0NDLFVBQVUsRUFBRSxDQUFDLEtBQUQsQ0FkYjtJQWVDQyxVQUFVLEVBQUUsQ0FBQyxLQUFELENBZmI7SUFnQkNDLFNBQVMsRUFBRSxDQUFDLEtBQUQsQ0FoQlo7SUFpQkNsUixPQUFPLEVBQUUsQ0FBQyxLQUFELENBakJWO0lBa0JDbVIsZ0JBQWdCLEVBQUUsQ0FBQyxLQUFELENBbEJuQjtJQW1CQ0Msc0JBQXNCLEVBQUUsQ0FBQyxLQUFELEVBQVEsS0FBUixDQW5CekI7SUFvQkNDLE9BQU8sRUFBRSxDQUFDLEtBQUQsQ0FwQlY7SUFxQkNDLGNBQWMsRUFBRSxDQUFDLEtBQUQsQ0FyQmpCO0lBc0JDQyxTQUFTLEVBQUUsQ0FBQyxNQUFELENBdEJaO0lBdUJDQyxLQUFLLEVBQUUsQ0FBQyxLQUFELENBdkJSO0lBd0JDQyxVQUFVLEVBQUUsQ0FBQyxLQUFELENBeEJiO0lBeUJDQyxRQUFRLEVBQUUsQ0FBQyxLQUFELENBekJYO0lBMEJDQyxjQUFjLEVBQUUsQ0FBQyxLQUFELENBMUJqQjtJQTJCQ0MsdUJBQXVCLEVBQUUsQ0FBQyxLQUFELENBM0IxQjtJQTRCQ0MsZUFBZSxFQUFFLENBQUMsS0FBRCxDQTVCbEI7SUE2QkNDLFlBQVksRUFBRSxDQUFDLEtBQUQsQ0E3QmY7SUE4QkNDLG9CQUFvQixFQUFFLENBQUMsS0FBRCxDQTlCdkI7SUErQkNDLEtBQUssRUFBRSxDQUFDLEtBQUQsQ0EvQlI7SUFnQ0NDLE1BQU0sRUFBRSxDQUFDLEtBQUQsQ0FoQ1Q7SUFpQ0NDLElBQUksRUFBRSxDQUFDLE1BQUQsQ0FqQ1A7SUFrQ0NDLGlCQUFpQixFQUFFLEVBbENwQjtJQW1DQ0MsYUFBYSxFQUFFLENBQUMsZUFBRCxDQW5DaEI7SUFvQ0NDLE1BQU0sRUFBRSxDQUFDLEtBQUQsQ0FwQ1Q7SUFxQ0NDLFlBQVksRUFBRSxDQUFDLEtBQUQsQ0FyQ2Y7SUFzQ0NDLGVBQWUsRUFBRSxDQUFDLEtBQUQsQ0F0Q2xCO0lBdUNDQyxXQUFXLEVBQUUsQ0FBQyxLQUFELENBdkNkO0lBd0NDQyxLQUFLLEVBQUUsQ0FBQyxLQUFELENBeENSO0lBeUNDQyxPQUFPLEVBQUUsQ0FBQyxNQUFEO0VBekNWLENBRjZCLENBQTlCO0VBOENBLE9BQU8sQ0FBQzlSLG1EQUFXLENBQUNzUCxTQUFTLENBQUNuRyxTQUFELENBQVYsQ0FBWixHQUFxQ21HLFNBQVMsQ0FBQ25HLFNBQUQsQ0FBOUMsR0FBNEQsRUFBbkU7QUFDQSxDQWhETTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakRQO0FBQ0E7QUFDQTtBQUNBO0FBU0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUlBO0FBV0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNb0MsWUFBWSxHQUFHLFVBQUNQLFFBQUQsRUFBV1gsU0FBWCxFQUFzQkMsVUFBdEIsRUFBZ0Q7RUFBQSxJQUFkcUksSUFBYyx1RUFBUCxFQUFPO0VBQzNFaFIsTUFBTSxDQUFDaVIsY0FBUCxDQUFzQjVILFFBQXRCLEVBQWdDWCxTQUFoQyxFQUEyQztJQUMxQ3dJLEdBQUcsR0FBRztNQUNMLE9BQU92SSxVQUFQO0lBQ0EsQ0FIeUM7O0lBSTFDLEdBQUdxSTtFQUp1QyxDQUEzQztBQU1BLENBUE07QUFTUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNRyxvQkFBb0IsR0FBRyxVQUNuQzlILFFBRG1DLEVBRW5DK0gsWUFGbUMsRUFHbkNDLFFBSG1DLEVBSy9CO0VBQUEsSUFESkwsSUFDSSx1RUFERyxFQUNIO0VBQ0poUixNQUFNLENBQUNpUixjQUFQLENBQXNCNUgsUUFBdEIsRUFBZ0MrSCxZQUFoQyxFQUE4QztJQUM3Q0YsR0FBRyxHQUFHO01BQ0wsT0FBT0csUUFBUSxDQUFDaEksUUFBRCxDQUFmO0lBQ0EsQ0FINEM7O0lBSTdDLEdBQUcySDtFQUowQyxDQUE5QztBQU1BLENBWk07QUFjUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTU0scUJBQXFCLEdBQUcsVUFDcENqSSxRQURvQyxFQUVwQ1gsU0FGb0MsRUFHcEM2SSxpQkFIb0MsRUFLaEM7RUFBQSxJQURKUCxJQUNJLHVFQURHLEVBQ0g7RUFDSixJQUFJUSxhQUFhLEdBQUdELGlCQUFwQjtFQUNBdlIsTUFBTSxDQUFDaVIsY0FBUCxDQUFzQjVILFFBQXRCLEVBQWdDWCxTQUFoQyxFQUEyQztJQUMxQ3dJLEdBQUcsR0FBRztNQUNMLE9BQU9NLGFBQVA7SUFDQSxDQUh5Qzs7SUFJMUNDLEdBQUcsQ0FBQ0MsYUFBRCxFQUFnQjtNQUNsQixNQUFNQyxjQUFjLEdBQUc3RSw0REFBaUIsQ0FDdkNwRSxTQUR1QyxFQUV2Q1csUUFBUSxDQUFDdkMsTUFGOEIsQ0FBeEM7O01BSUEsSUFBSSxDQUFDdUMsUUFBUSxDQUFDa0IsS0FBVixJQUFtQm9ILGNBQXZCLEVBQXVDO1FBQ3RDO01BQ0E7O01BQ0R2SSw2RUFBZ0MsQ0FDL0JWLFNBRCtCLEVBRS9CZ0osYUFGK0IsRUFHL0JySSxRQUgrQixDQUFoQzs7TUFLQSxJQUFJLENBQUNzSSxjQUFMLEVBQXFCO1FBQ3BCNUgsWUFBWSxDQUFDVixRQUFELEVBQVdXLHdEQUFYLENBQVo7UUFDQTRILGlCQUFpQixDQUFDdkksUUFBRCxFQUFXWCxTQUFYLENBQWpCO01BQ0E7O01BQ0Q4SSxhQUFhLEdBQUdFLGFBQWhCO0lBQ0EsQ0F0QnlDOztJQXVCMUMsR0FBR1Y7RUF2QnVDLENBQTNDO0FBeUJBLENBaENNO0FBa0NQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTWEsMEJBQTBCLEdBQUcsVUFDekN4SSxRQUR5QyxFQUV6Q3lJLGlCQUZ5QyxFQUd6Q0MsY0FIeUMsRUFLckM7RUFBQSxJQURKZixJQUNJLHVFQURHLEVBQ0g7O0VBQ0osSUFBSWMsaUJBQWlCLEtBQUtDLGNBQTFCLEVBQTBDO0lBQ3pDL1IsTUFBTSxDQUFDaVIsY0FBUCxDQUFzQjVILFFBQXRCLEVBQWdDMEksY0FBaEMsRUFBZ0Q7TUFDL0NiLEdBQUcsR0FBRztRQUNMLE9BQU83SCxRQUFRLENBQUN5SSxpQkFBRCxDQUFmO01BQ0EsQ0FIOEM7O01BSS9DTCxHQUFHLENBQUNDLGFBQUQsRUFBZ0I7UUFDbEIsT0FBUXJJLFFBQVEsQ0FBQ3lJLGlCQUFELENBQVIsR0FBOEJKLGFBQXRDO01BQ0EsQ0FOOEM7O01BTy9DLEdBQUdWO0lBUDRDLENBQWhEO0VBU0E7QUFDRCxDQWpCTTtBQW1CUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1nQixpQkFBaUIsR0FBRyxVQUNoQzNJLFFBRGdDLEVBRWhDeUksaUJBRmdDLEVBR2hDQyxjQUhnQyxFQUs1QjtFQUFBLElBREpmLElBQ0ksdUVBREcsRUFDSDs7RUFDSixJQUFJYyxpQkFBaUIsS0FBS0MsY0FBMUIsRUFBMEM7SUFDekMvUixNQUFNLENBQUNpUixjQUFQLENBQXNCNUgsUUFBdEIsRUFBZ0MwSSxjQUFoQyxFQUFnRDtNQUMvQ2IsR0FBRyxHQUFHO1FBQ0wsT0FBTzdILFFBQVEsQ0FBQ3lJLGlCQUFELENBQWY7TUFDQSxDQUg4Qzs7TUFJL0MsR0FBR2Q7SUFKNEMsQ0FBaEQ7RUFNQTtBQUNELENBZE07QUFnQlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTWlCLGtCQUFrQixHQUFHLFVBQUM1SSxRQUFELEVBQVdYLFNBQVgsRUFBb0M7RUFBQSxJQUFkc0ksSUFBYyx1RUFBUCxFQUFPO0VBQ3JFaFIsTUFBTSxDQUFDaVIsY0FBUCxDQUFzQjVILFFBQXRCLEVBQWdDLFFBQVFLLGtEQUFVLENBQUNoQixTQUFELENBQWxELEVBQStEO0lBQzlEd0ksR0FBRyxHQUFHO01BQ0wsT0FBUVEsYUFBRCxJQUFtQjtRQUN6QnJJLFFBQVEsQ0FBQ1gsU0FBRCxDQUFSLEdBQXNCZ0osYUFBdEI7UUFDQSxPQUFPckksUUFBUDtNQUNBLENBSEQ7SUFJQSxDQU42RDs7SUFPOUQsR0FBRzJIO0VBUDJELENBQS9EO0FBU0EsQ0FWTTtBQVlQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1uSCw2QkFBNkIsR0FBSVIsUUFBRCxJQUFjO0VBQzFELE1BQU02SSxXQUFXLEdBQUcsRUFBcEI7RUFDQTlRLCtDQUFPLENBQUNpSSxRQUFRLENBQUM4SSx1QkFBVixFQUFtQyxDQUFDeEosVUFBRCxFQUFhRCxTQUFiLEtBQTJCO0lBQ3BFLE1BQU0wSixZQUFZLEdBQUd0Riw0REFBaUIsQ0FBQ3BFLFNBQUQsRUFBWVcsUUFBUSxDQUFDdkMsTUFBckIsQ0FBdEM7SUFDQXVMLHVCQUF1QixDQUFDaEosUUFBRCxFQUFXWCxTQUFYLEVBQXNCQyxVQUF0QixDQUF2Qjs7SUFDQSxJQUFJdUUsd0RBQWEsQ0FBQ3hFLFNBQUQsRUFBWVcsUUFBUSxDQUFDdkMsTUFBckIsQ0FBakIsRUFBK0M7TUFDOUMsSUFBSXVDLFFBQVEsQ0FBQ2tCLEtBQWIsRUFBb0I7UUFDbkJuQiw2RUFBZ0MsQ0FDL0JWLFNBRCtCLEVBRS9CQyxVQUYrQixFQUcvQlUsUUFIK0IsQ0FBaEM7TUFLQSxDQU5ELE1BTU87UUFDTkcsa0ZBQXFDLENBQ3BDSCxRQUFRLENBQUM3QixTQUQyQixFQUVwQ2tCLFNBRm9DLEVBR3BDQyxVQUhvQyxFQUlwQ1UsUUFKb0MsQ0FBckM7TUFNQTs7TUFDRGlKLCtCQUErQixDQUM5QmpKLFFBRDhCLEVBRTlCWCxTQUY4QixFQUc5QkMsVUFIOEIsRUFJOUJ5SixZQUo4QixDQUEvQjtJQU1BOztJQUNELElBQUkxSixTQUFTLEtBQUssb0JBQWxCLEVBQXdDO01BQ3ZDNkosMkJBQTJCLENBQUNsSixRQUFELEVBQVdWLFVBQVgsQ0FBM0I7SUFDQTs7SUFDRCxJQUFJRCxTQUFTLEtBQUssWUFBbEIsRUFBZ0M7TUFDL0I4SiwrQkFBK0IsQ0FBQ25KLFFBQUQsRUFBV1YsVUFBWCxDQUEvQjtJQUNBOztJQUNELElBQUlELFNBQVMsS0FBSyxNQUFsQixFQUEwQjtNQUN6QmtCLFlBQVksQ0FBQ1AsUUFBRCxFQUFXLE1BQVgsRUFBbUJWLFVBQW5CLENBQVo7SUFDQTs7SUFDRCxJQUFJRCxTQUFTLEtBQUssUUFBbEIsRUFBNEI7TUFDM0IrSixZQUFZLENBQUNwSixRQUFELEVBQVdWLFVBQVgsQ0FBWjtJQUNBOztJQUNELElBQUksQ0FBQ1UsUUFBUSxDQUFDa0IsS0FBVixJQUFtQjZILFlBQXZCLEVBQXFDO01BQ3BDRixXQUFXLENBQUN6UixJQUFaLENBQWlCaUksU0FBakI7SUFDQTtFQUNELENBeENNLENBQVA7O0VBeUNBLElBQUksQ0FBQ1csUUFBUSxDQUFDa0IsS0FBVixJQUFtQjJILFdBQVcsQ0FBQ2hILE1BQW5DLEVBQTJDO0lBQzFDd0gsNEJBQTRCLENBQUNySixRQUFELEVBQVc2SSxXQUFYLENBQTVCO0VBQ0E7O0VBRURTLG1CQUFtQixDQUFDdEosUUFBRCxDQUFuQjtFQUNBdUoscUJBQXFCLENBQUN2SixRQUFELENBQXJCO0FBQ0EsQ0FqRE07QUFtRFA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLE1BQU1tSiwrQkFBK0IsR0FBRyxDQUFDbkosUUFBRCxFQUFXNEIsZUFBWCxLQUErQjtFQUN0RTtFQUNBLE1BQU00SCxnQkFBZ0IsR0FDckJ4SixRQUFRLENBQUM4SSx1QkFBVCxDQUFpQ1csa0JBQWpDLElBQXVELEVBRHhEOztFQUVBLElBQUlELGdCQUFnQixDQUFDRSxVQUFqQixJQUErQjVWLCtDQUFPLENBQUMwVixnQkFBZ0IsQ0FBQ0UsVUFBbEIsQ0FBMUMsRUFBeUU7SUFDeEU5SCxlQUFlLEdBQUcsQ0FBQyxHQUFHQSxlQUFKLEVBQXFCLEdBQUc0SCxnQkFBZ0IsQ0FBQ0UsVUFBekMsQ0FBbEI7RUFDQTs7RUFDRG5KLFlBQVksQ0FBQ1AsUUFBRCxFQUFXLGlCQUFYLEVBQThCNEIsZUFBOUIsQ0FBWjtBQUNBLENBUkQ7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsTUFBTTBILG1CQUFtQixHQUFJdEosUUFBRCxJQUFjO0VBQ3pDLElBQUksQ0FBQ0EsUUFBUSxDQUFDa0IsS0FBZCxFQUFxQjtJQUNwQjtFQUNBOztFQUNELE1BQU0ySCxXQUFXLEdBQUd0QiwwRUFBNkIsQ0FBQ3ZILFFBQUQsQ0FBakQ7RUFDQWpJLCtDQUFPLENBQUM4USxXQUFELEVBQWMsQ0FBQ2MsZ0JBQUQsRUFBbUJDLFdBQW5CLEtBQW1DO0lBQ3ZEO0lBQ0EsSUFBSTVKLFFBQVEsQ0FBQzRKLFdBQUQsQ0FBWixFQUEyQjtNQUMxQixPQUFPNUosUUFBUSxDQUFDNEosV0FBRCxDQUFmO0lBQ0E7O0lBQ0QzQixxQkFBcUIsQ0FBQ2pJLFFBQUQsRUFBVzRKLFdBQVgsRUFBd0I1QywyQ0FBSSxFQUE1QixFQUFnQztNQUNwRDZDLFlBQVksRUFBRSxJQURzQztNQUVwREMsVUFBVSxFQUFFO0lBRndDLENBQWhDLENBQXJCO0lBSUFDLGtDQUFrQyxDQUFDL0osUUFBRCxFQUFXNEosV0FBWCxDQUFsQztFQUNBLENBVk0sQ0FBUDtFQVdBUCw0QkFBNEIsQ0FBQ3JKLFFBQUQsRUFBV3BKLDRDQUFJLENBQUNpUyxXQUFELENBQWYsQ0FBNUI7QUFDQSxDQWpCRDtBQW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsTUFBTUcsdUJBQXVCLEdBQUcsQ0FBQ2hKLFFBQUQsRUFBV1gsU0FBWCxFQUFzQkMsVUFBdEIsS0FBcUM7RUFDcEVVLFFBQVEsQ0FBQ1kseUVBQUQsQ0FBUixDQUE0Q3ZCLFNBQTVDLElBQ0NxSSx1RUFBMEIsQ0FBQ3JJLFNBQUQsRUFBWUMsVUFBWixFQUF3QlUsUUFBUSxDQUFDdkMsTUFBakMsQ0FEM0I7QUFFQSxDQUhEO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLE1BQU04TCxxQkFBcUIsR0FBSXZKLFFBQUQsSUFBYztFQUMzQyxJQUFJLE9BQU9BLFFBQVEsQ0FBQzRCLGVBQWhCLEtBQW9DLFdBQXhDLEVBQXFEO0lBQ3BEdUgsK0JBQStCLENBQUNuSixRQUFELEVBQVcsRUFBWCxDQUEvQjtFQUNBOztFQUNELElBQUksQ0FBQ0EsUUFBUSxDQUFDa0IsS0FBZCxFQUFxQjtJQUNwQjtFQUNBOztFQUNEbkosK0NBQU8sQ0FDTnlQLHNFQUF5QixDQUFDeEgsUUFBRCxDQURuQixFQUVOLENBQUMySixnQkFBRCxFQUFtQnRLLFNBQW5CLEtBQWlDO0lBQ2hDLElBQ0MsT0FBT1csUUFBUSxDQUFDWCxTQUFELENBQWYsS0FBK0IsV0FBL0IsSUFDQSxDQUFDb0UsNERBQWlCLENBQUNwRSxTQUFELEVBQVlXLFFBQVEsQ0FBQ3ZDLE1BQXJCLENBRm5CLEVBR0U7TUFDRHdMLCtCQUErQixDQUFDakosUUFBRCxFQUFXWCxTQUFYLEVBQXNCMkssU0FBdEIsQ0FBL0I7SUFDQTtFQUNELENBVEssQ0FBUDtBQVdBLENBbEJEO0FBb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLE1BQU0xSCxRQUFRLEdBQUl0QyxRQUFELElBQWM7RUFDOUIsT0FBT3FILDZFQUFnQyxDQUFDckgsUUFBRCxDQUF2QztBQUNBLENBRkQ7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsTUFBTWlLLFNBQVMsR0FBSWpLLFFBQUQsSUFBYztFQUMvQixPQUFPc0gsZ0ZBQW1DLENBQUN0SCxRQUFELENBQTFDO0FBQ0EsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxNQUFNa0ssU0FBUyxHQUFJbEssUUFBRCxJQUFjO0VBQy9CLE1BQU1tSyxZQUFZLEdBQUc3QyxnRkFBbUMsQ0FBQ3RILFFBQUQsRUFBVyxJQUFYLENBQXhEO0VBQ0FBLFFBQVEsQ0FBQzZJLFdBQVQsQ0FBcUI5USxPQUFyQixDQUE4QnFTLFVBQUQsSUFBZ0I7SUFDNUNELFlBQVksQ0FBQ0MsVUFBRCxDQUFaLEdBQTJCcEssUUFBUSxDQUFDb0ssVUFBRCxDQUFuQztFQUNBLENBRkQ7RUFHQSxPQUFPRCxZQUFQO0FBQ0EsQ0FORDtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsTUFBTUUsVUFBVSxHQUFJckssUUFBRCxJQUFjO0VBQ2hDLElBQUlBLFFBQVEsQ0FBQ2tCLEtBQWIsRUFBb0I7SUFDbkIsT0FBT2dKLFNBQVMsQ0FBQ2xLLFFBQUQsQ0FBaEI7RUFDQTs7RUFDRCxPQUFPaUssU0FBUyxDQUFDakssUUFBRCxDQUFoQjtBQUNBLENBTEQ7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLE1BQU1TLGlDQUFpQyxHQUFJVCxRQUFELElBQWM7RUFDOUQ4SCxvQkFBb0IsQ0FBQzlILFFBQUQsRUFBVyxXQUFYLEVBQXdCaUssU0FBeEIsQ0FBcEI7RUFDQW5DLG9CQUFvQixDQUFDOUgsUUFBRCxFQUFXLFdBQVgsRUFBd0JrSyxTQUF4QixDQUFwQjtFQUNBcEMsb0JBQW9CLENBQUM5SCxRQUFELEVBQVcsWUFBWCxFQUF5QnFLLFVBQXpCLENBQXBCO0VBQ0F2QyxvQkFBb0IsQ0FBQzlILFFBQUQsRUFBVyxVQUFYLEVBQXVCc0MsUUFBdkIsQ0FBcEI7QUFDQSxDQUxNO0FBT1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxNQUFNMkcsK0JBQStCLEdBQUcsVUFDdkNqSixRQUR1QyxFQUV2Q1gsU0FGdUMsRUFHdkNDLFVBSHVDLEVBS25DO0VBQUEsSUFESnlKLFlBQ0ksdUVBRFcsS0FDWDs7RUFDSixJQUFJL1QsbURBQVcsQ0FBQ3NLLFVBQUQsQ0FBZixFQUE2QjtJQUM1QkEsVUFBVSxHQUFHbUksb0VBQXVCLENBQUNwSSxTQUFELEVBQVlXLFFBQVEsQ0FBQ3ZDLE1BQXJCLENBQXBDO0lBQ0F1TCx1QkFBdUIsQ0FBQ2hKLFFBQUQsRUFBV1gsU0FBWCxFQUFzQkMsVUFBdEIsQ0FBdkI7RUFDQTs7RUFDRGdMLDZCQUE2QixDQUM1QnRLLFFBRDRCLEVBRTVCWCxTQUY0QixFQUc1QjhILHdFQUEyQixDQUFDOUgsU0FBRCxFQUFZQyxVQUFaLEVBQXdCVSxRQUF4QixDQUhDLEVBSTVCK0ksWUFKNEIsQ0FBN0I7O0VBTUEsSUFBSSxDQUFDQSxZQUFMLEVBQW1CO0lBQ2xCd0IscUJBQXFCLENBQ3BCdkssUUFEb0IsRUFFcEJYLFNBRm9CLEVBR3BCNkgsZ0VBQW1CLENBQUM1SCxVQUFELENBSEMsQ0FBckI7RUFLQTtBQUNELENBdkJEO0FBeUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sTUFBTWdMLDZCQUE2QixHQUFHLFVBQzVDdEssUUFENEMsRUFFNUNYLFNBRjRDLEVBRzVDQyxVQUg0QyxFQUt4QztFQUFBLElBREp5SixZQUNJLHVFQURXLEtBQ1g7RUFDSixNQUFNcEIsSUFBSSxHQUFHO0lBQUVtQyxVQUFVLEVBQUU7RUFBZCxDQUFiLENBREksQ0FFSjs7RUFDQSxJQUFJZixZQUFKLEVBQWtCO0lBQ2pCeEksWUFBWSxDQUFDUCxRQUFELEVBQVdYLFNBQVgsRUFBc0JDLFVBQXRCLEVBQWtDcUksSUFBbEMsQ0FBWjtJQUNBNkMseUJBQXlCLENBQUN4SyxRQUFELEVBQVdYLFNBQVgsQ0FBekI7RUFDQSxDQUhELE1BR087SUFDTjRJLHFCQUFxQixDQUFDakksUUFBRCxFQUFXWCxTQUFYLEVBQXNCQyxVQUF0QixFQUFrQ3FJLElBQWxDLENBQXJCO0lBQ0FpQixrQkFBa0IsQ0FBQzVJLFFBQUQsRUFBV1gsU0FBWCxDQUFsQjtJQUNBMEssa0NBQWtDLENBQUMvSixRQUFELEVBQVdYLFNBQVgsQ0FBbEM7RUFDQTtBQUNELENBaEJNO0FBa0JQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNbUwseUJBQXlCLEdBQUcsQ0FBQ3hLLFFBQUQsRUFBV1gsU0FBWCxLQUF5QjtFQUNqRW9MLHNCQUFzQixDQUFDekssUUFBRCxFQUFXWCxTQUFYLEVBQXNCc0osaUJBQXRCLENBQXRCO0FBQ0EsQ0FGTTtBQUlQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTW9CLGtDQUFrQyxHQUFHLENBQUMvSixRQUFELEVBQVdYLFNBQVgsS0FBeUI7RUFDMUVvTCxzQkFBc0IsQ0FBQ3pLLFFBQUQsRUFBV1gsU0FBWCxFQUFzQm1KLDBCQUF0QixDQUF0QjtBQUNBLENBRk07QUFJUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxNQUFNaUMsc0JBQXNCLEdBQUcsQ0FBQ3pLLFFBQUQsRUFBV1gsU0FBWCxFQUFzQnFMLE1BQXRCLEtBQWlDO0VBQy9EO0VBQ0FBLE1BQU0sQ0FBQzFLLFFBQUQsRUFBV1gsU0FBWCxFQUFzQmlCLGlEQUFTLENBQUNqQixTQUFELENBQS9CLENBQU4sQ0FGK0QsQ0FHL0Q7RUFDQTs7RUFDQSxJQUFJVyxRQUFRLENBQUNpQixhQUFiLEVBQTRCO0lBQzNCLElBQUkwSixZQUFZLEdBQUcsRUFBbkIsQ0FEMkIsQ0FFM0I7SUFDQTtJQUNBO0lBQ0E7O0lBQ0EzSyxRQUFRLENBQUNpQixhQUFULENBQXVCbEosT0FBdkIsQ0FBZ0M2UyxXQUFELElBQWlCO01BQy9DRCxZQUFZLEdBQUd0TCxTQUFTLENBQUNkLE9BQVYsQ0FBa0JxTSxXQUFXLEdBQUcsR0FBaEMsRUFBcUMsRUFBckMsQ0FBZjs7TUFDQSxJQUFJRCxZQUFZLEtBQUt0TCxTQUFyQixFQUFnQztRQUMvQnFMLE1BQU0sQ0FBQzFLLFFBQUQsRUFBV1gsU0FBWCxFQUFzQmlCLGlEQUFTLENBQUNxSyxZQUFELENBQS9CLENBQU47TUFDQTtJQUNELENBTEQ7RUFNQTtBQUNELENBbEJEO0FBb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsTUFBTUUsbUJBQW1CLEdBQUk3SyxRQUFELElBQWU4SyxrQkFBRCxJQUN6QzlLLFFBQVEsQ0FBQzhLLGtCQUFrQixHQUFHLFVBQXRCLENBRFQ7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsTUFBTUMsdUJBQXVCLEdBQUcsQ0FBQy9LLFFBQUQsRUFBV1gsU0FBWCxLQUF5QjtFQUN4RCxNQUFNMkwsZ0JBQWdCLEdBQUdqRSw4Q0FBTSxDQUM5Qi9HLFFBQVEsQ0FBQ2lCLGFBRHFCLEVBRTdCZ0ssTUFBRCxJQUFZQSxNQUFNLENBQUNwSixNQUFQLEdBQWdCLENBQUMsQ0FGQyxDQUEvQjtFQUlBLElBQUk4SSxZQUFZLEdBQUd0TCxTQUFuQjtFQUNBdEgsK0NBQU8sQ0FBQ2lULGdCQUFELEVBQW9CQyxNQUFELElBQVk7SUFDckNOLFlBQVksR0FBR3RMLFNBQVMsQ0FBQ2QsT0FBVixDQUFrQjBNLE1BQWxCLEVBQTBCLEVBQTFCLENBQWY7O0lBQ0EsSUFBSU4sWUFBWSxLQUFLdEwsU0FBckIsRUFBZ0M7TUFDL0IsT0FBTyxLQUFQO0lBQ0E7RUFDRCxDQUxNLENBQVA7RUFNQSxPQUFPc0wsWUFBUDtBQUNBLENBYkQ7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sTUFBTUoscUJBQXFCLEdBQUcsQ0FBQ3ZLLFFBQUQsRUFBV1gsU0FBWCxFQUFzQkMsVUFBdEIsS0FBcUM7RUFDekVpQixZQUFZLENBQ1hQLFFBRFcsRUFFWE0saURBQVMsQ0FBQ3lLLHVCQUF1QixDQUFDL0ssUUFBRCxFQUFXWCxTQUFYLENBQXhCLENBQVQsR0FBMEQsVUFGL0MsRUFHWEMsVUFIVyxDQUFaOztFQUtBLElBQUl0SyxtREFBVyxDQUFDZ0wsUUFBUSxDQUFDa0wsV0FBVixDQUFmLEVBQXVDO0lBQ3RDcEQsb0JBQW9CLENBQUM5SCxRQUFELEVBQVcsYUFBWCxFQUEwQjZLLG1CQUExQixDQUFwQjtFQUNBO0FBQ0QsQ0FUTTtBQVdQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxNQUFNTSw4QkFBOEIsR0FBSW5MLFFBQUQsSUFDdENBLFFBQVEsQ0FBQzZJLFdBQVQsQ0FBcUJoSCxNQUFyQixHQUE4QixDQUQvQjtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sTUFBTXdILDRCQUE0QixHQUFHLENBQUNySixRQUFELEVBQVc2SSxXQUFYLEtBQTJCO0VBQ3RFLE1BQU1sQixJQUFJLEdBQUc7SUFBRWtDLFlBQVksRUFBRTtFQUFoQixDQUFiOztFQUNBLElBQUkvViwrQ0FBTyxDQUFDK1UsV0FBRCxDQUFYLEVBQTBCO0lBQ3pCdEksWUFBWSxDQUFDUCxRQUFELEVBQVcsWUFBWCxFQUF5QjZJLFdBQVcsQ0FBQyxDQUFELENBQXBDLEVBQXlDbEIsSUFBekMsQ0FBWjtJQUNBTSxxQkFBcUIsQ0FBQ2pJLFFBQUQsRUFBVyxhQUFYLEVBQTBCNkksV0FBMUIsRUFBdUNsQixJQUF2QyxDQUFyQjtJQUNBRyxvQkFBb0IsQ0FDbkI5SCxRQURtQixFQUVuQix3QkFGbUIsRUFHbkJtTCw4QkFIbUIsRUFJbkJ4RCxJQUptQixDQUFwQjtFQU1BO0FBQ0QsQ0FaTTtBQWNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsTUFBTXlELDBCQUEwQixHQUFJcEwsUUFBRCxJQUFlcUwsZ0JBQUQsSUFDaEQsQ0FBQ3JXLG1EQUFXLENBQUNnTCxRQUFRLENBQUNxTCxnQkFBRCxDQUFULENBRGI7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLE1BQU1uQywyQkFBMkIsR0FBRyxDQUFDbEosUUFBRCxFQUFXNEMsZUFBWCxLQUErQjtFQUN6RTdLLCtDQUFPLENBQUM2SyxlQUFELEVBQWtCLENBQUMwSSxvQkFBRCxFQUF1QkMsbUJBQXZCLEtBQStDO0lBQ3ZFLElBQUlBLG1CQUFtQixLQUFLLFlBQTVCLEVBQTBDO01BQ3pDaEwsWUFBWSxDQUNYUCxRQURXLEVBRVhNLGlEQUFTLENBQUNpTCxtQkFBRCxDQUZFLEVBR1hELG9CQUhXLENBQVo7SUFLQTtFQUNELENBUk0sQ0FBUDtFQVNBeEQsb0JBQW9CLENBQ25COUgsUUFEbUIsRUFFbkIsb0JBRm1CLEVBR25Cb0wsMEJBSG1CLENBQXBCO0FBS0EsQ0FmTTtBQWlCUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTWhDLFlBQVksR0FBRyxDQUFDcEosUUFBRCxFQUFXNEMsZUFBWCxLQUErQjtFQUMxRCxNQUFNMUYsU0FBUyxHQUFHLEVBQWxCO0VBQ0EsSUFBSXNPLFlBQUo7RUFDQXpULCtDQUFPLENBQUM2SyxlQUFELEVBQWtCLENBQUM2SSxhQUFELEVBQWdCQyxZQUFoQixLQUFpQztJQUN6RCxJQUFJQSxZQUFZLEtBQUssTUFBckIsRUFBNkI7TUFDNUJuTCxZQUFZLENBQUNQLFFBQUQsRUFBVyxjQUFYLEVBQTJCeUwsYUFBYSxDQUFDLENBQUQsQ0FBYixDQUFpQkUsSUFBNUMsQ0FBWjtJQUNBLENBRkQsTUFFTyxJQUFJRCxZQUFZLEtBQUssWUFBckIsRUFBbUM7TUFDekNuTCxZQUFZLENBQ1hQLFFBRFcsRUFFWCx3QkFGVyxFQUdYeUwsYUFBYSxDQUFDLENBQUQsQ0FBYixDQUFpQkUsSUFITixDQUFaO0lBS0EsQ0FOTSxNQU1BO01BQ05ILFlBQVksR0FBR3BFLG9FQUF1QixDQUFDc0UsWUFBRCxDQUF0QztNQUNBeE8sU0FBUyxDQUFDOUYsSUFBVixDQUFlb1UsWUFBZjtNQUNBSSxvQkFBb0IsQ0FDbkI1TCxRQURtQixFQUVuQndMLFlBQVksR0FBRyxVQUZJLEVBR25CQyxhQUhtQixDQUFwQjtJQUtBO0VBQ0QsQ0FsQk0sQ0FBUCxDQUgwRCxDQXNCMUQ7O0VBQ0FsTCxZQUFZLENBQUNQLFFBQUQsRUFBVyxjQUFYLEVBQTJCOUMsU0FBM0IsQ0FBWjtBQUNBLENBeEJNO0FBMEJQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsTUFBTTJPLDJCQUEyQixHQUFJN0wsUUFBRCxJQUFld0wsWUFBRCxJQUNqRHhMLFFBQVEsQ0FBQ3dMLFlBQVksQ0FBQ2pOLE9BQWIsQ0FBcUIsVUFBckIsRUFBaUMsRUFBakMsQ0FBRCxDQURUO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLE1BQU1xTixvQkFBb0IsR0FBRyxDQUFDNUwsUUFBRCxFQUFXd0wsWUFBWCxFQUF5Qk0sWUFBekIsS0FBMEM7RUFDN0V2TCxZQUFZLENBQUNQLFFBQUQsRUFBV3dMLFlBQVgsRUFBeUI7SUFDcENPLFlBQVksRUFBRUQsWUFBWSxDQUFDLENBQUQsQ0FBWixDQUFnQkgsSUFETTtJQUVwQ0ssTUFBTSxFQUFFRixZQUFZLENBQUMsQ0FBRCxDQUFaLENBQWdCRTtFQUZZLENBQXpCLENBQVo7O0VBSUEsSUFBSWhYLG1EQUFXLENBQUNnTCxRQUFRLENBQUNpTSxtQkFBVixDQUFmLEVBQStDO0lBQzlDbkUsb0JBQW9CLENBQ25COUgsUUFEbUIsRUFFbkIscUJBRm1CLEVBR25CNkwsMkJBSG1CLENBQXBCO0VBS0E7QUFDRCxDQVpNO0FBY1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTW5MLFlBQVksR0FBRyxVQUFDVixRQUFELEVBQVd1QixTQUFYLEVBQTJDO0VBQUEsSUFBckIySyxRQUFxQix1RUFBVixLQUFVO0VBQ3RFLE1BQU1DLFlBQVksR0FBR25NLFFBQVEsQ0FBQ1kscUVBQUQsQ0FBN0I7O0VBQ0EsUUFBUVcsU0FBUjtJQUNDLEtBQUtaLHdEQUFMO0lBQ0EsS0FBS0Esc0RBQUw7SUFDQSxLQUFLQSx3REFBTDtNQUNDLElBQUl1TCxRQUFKLEVBQWM7UUFDYmxNLFFBQVEsQ0FBQ1kscUVBQUQsQ0FBUixHQUEwQ1csU0FBMUM7UUFDQTtNQUNBOztNQUNEdkIsUUFBUSxDQUFDWSxxRUFBRCxDQUFSLEdBQ0N1TCxZQUFZLEtBQUt4TCx3REFBakIsR0FBb0NZLFNBQXBDLEdBQWdENEssWUFEakQ7TUFFQTs7SUFDRDtNQUNDLE1BQU0sSUFBSWxGLGdFQUFKLENBQ0wscURBQ0Msc0RBRkksQ0FBTjtFQVpGO0FBaUJBLENBbkJNO0FBcUJQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1zQixpQkFBaUIsR0FBRyxDQUFDdkksUUFBRCxFQUFXWCxTQUFYLEtBQXlCO0VBQ3pELElBQUlXLFFBQVEsQ0FBQ29NLHVCQUFiLEVBQXNDO0lBQ3JDcE0sUUFBUSxDQUFDb00sdUJBQVQsQ0FBaUM5TyxHQUFqQyxDQUFxQytCLFNBQXJDO0VBQ0E7QUFDRCxDQUpNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNodEJQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFNQTtBQUVBO0FBU0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTXNOLHlCQUF5QixHQUFHLENBQUN0TixTQUFELEVBQVlDLFVBQVosRUFBd0I3QixNQUF4QixLQUFtQztFQUMzRSxJQUNDb0IsMERBQWUsQ0FBQ1EsU0FBRCxFQUFZNUIsTUFBWixDQUFmLElBQ0EsQ0FBQ21CLDJGQUFBLENBQTRCVSxVQUE1QixDQUZGLEVBR0U7SUFDRCxPQUFPVixnRkFBQSxDQUFpQlUsVUFBakIsQ0FBUDtFQUNBOztFQUNELElBQUlSLHVEQUFZLENBQUNPLFNBQUQsRUFBWTVCLE1BQVosQ0FBWixJQUFtQyxDQUFDK08scUVBQVUsQ0FBQ2xOLFVBQUQsRUFBYSxPQUFiLENBQWxELEVBQXlFO0lBQ3hFLE9BQU8sSUFBSVosK0RBQUosQ0FBVVksVUFBVixFQUFzQm1OLHNFQUF0QixDQUFQO0VBQ0EsQ0FUMEUsQ0FVM0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztFQUNBLE9BQU9uTixVQUFQO0FBQ0EsQ0FsQk07QUFvQlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTUgseUNBQXlDLEdBQUcsQ0FDeERFLFNBRHdELEVBRXhEQyxVQUZ3RCxFQUd4RDdCLE1BSHdELEtBSXBEO0VBQ0osSUFBSW9CLDBEQUFlLENBQUNRLFNBQUQsRUFBWTVCLE1BQVosQ0FBbkIsRUFBd0M7SUFDdkNtQix5RkFBQSxDQUEwQlUsVUFBMUI7SUFDQUEsVUFBVSxHQUFHQSxVQUFVLENBQUN3TixLQUFYLEVBQWI7RUFDQSxDQUhELE1BR08sSUFBSWhPLHVEQUFZLENBQUNPLFNBQUQsRUFBWTVCLE1BQVosQ0FBaEIsRUFBcUM7SUFDM0NpQiwyRUFBQSxDQUFrQlksVUFBbEI7SUFDQUEsVUFBVSxHQUFHQSxVQUFVLENBQUN5TixRQUFYLEVBQWI7RUFDQTs7RUFDRCxPQUFPek4sVUFBUDtBQUNBLENBYk07QUFlUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU0wTiwyQkFBMkIsR0FBSTFOLFVBQUQsSUFBZ0I7RUFDMUQsSUFBSVYsMkZBQUEsQ0FBNEJVLFVBQTVCLENBQUosRUFBNkM7SUFDNUNBLFVBQVUsR0FBR0EsVUFBVSxDQUFDd04sS0FBWCxFQUFiO0VBQ0EsQ0FGRCxNQUVPLElBQUlOLHFFQUFVLENBQUNsTixVQUFELEVBQWEsT0FBYixDQUFkLEVBQXFDO0lBQzNDQSxVQUFVLEdBQUdBLFVBQVUsQ0FBQ3lOLFFBQVgsRUFBYjtFQUNBOztFQUNELE9BQU96TixVQUFQO0FBQ0EsQ0FQTTtBQVNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU02SCwyQkFBMkIsR0FBRyxDQUMxQzlILFNBRDBDLEVBRTFDQyxVQUYwQyxFQUcxQ1UsUUFIMEMsS0FJdEM7RUFDSixNQUFNSSxjQUFjLEdBQUdsQixpRUFBb0IsQ0FBQ0csU0FBRCxFQUFZVyxRQUFaLENBQTNDO0VBQ0FWLFVBQVUsR0FBR3dELHFEQUFhLENBQUN4RCxVQUFELENBQWIsR0FDVkEsVUFBVSxDQUFDYyxjQUFELENBREEsR0FFVmQsVUFGSDtFQUdBLE9BQU9xTix5QkFBeUIsQ0FBQ3ROLFNBQUQsRUFBWUMsVUFBWixFQUF3QlUsUUFBUSxDQUFDdkMsTUFBakMsQ0FBaEM7QUFDQSxDQVZNO0FBWVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTXlKLG1CQUFtQixHQUFJaE4sS0FBRCxJQUFXO0VBQzdDLElBQUksQ0FBQzRJLHFEQUFhLENBQUM1SSxLQUFELENBQWxCLEVBQTJCO0lBQzFCLE9BQU9BLEtBQVA7RUFDQTs7RUFDREEsS0FBSyxHQUFHOEksNERBQWlCLENBQUM5SSxLQUFELENBQWpCLEdBQTJCQSxLQUFLLENBQUMrSSxNQUFqQyxHQUEwQy9JLEtBQWxEO0VBQ0FBLEtBQUssR0FBR2dKLDhEQUFtQixDQUFDaEosS0FBRCxDQUFuQixHQUE2QkEsS0FBSyxDQUFDaUosUUFBbkMsR0FBOENqSixLQUF0RDtFQUNBLE9BQU82SSx5REFBYyxDQUFDN0ksS0FBRCxDQUFkLEdBQXdCQSxLQUFLLENBQUM0RixHQUE5QixHQUFvQzVGLEtBQTNDO0FBQ0EsQ0FQTTtBQVNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNa04sdUJBQXVCLEdBQUkyRSxZQUFELElBQWtCO0VBQ3hELE9BQU9XLDZEQUFlLENBQUNwTSxpREFBUyxDQUFDK0wsNENBQUksQ0FBQ04sWUFBWSxDQUFDa0IsS0FBYixDQUFtQixHQUFuQixDQUFELENBQUwsQ0FBVixDQUF0QjtBQUNBLENBRk07QUFJUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTTVGLGdDQUFnQyxHQUFJNkYsY0FBRCxJQUFvQjtFQUNuRSxPQUFPdlcsTUFBTSxDQUFDQyxJQUFQLENBQVlzVyxjQUFaLEVBQTRCQyxNQUE1QixDQUFtQyxDQUFDdkssZUFBRCxFQUFrQnZELFNBQWxCLEtBQWdDO0lBQ3pFLElBQ0N3RSx3REFBYSxDQUFDeEUsU0FBRCxFQUFZNk4sY0FBYyxDQUFDelAsTUFBM0IsQ0FBYixJQUNBLENBQUNnRyw0REFBaUIsQ0FBQ3BFLFNBQUQsRUFBWTZOLGNBQWMsQ0FBQ3pQLE1BQTNCLENBRm5CLEVBR0U7TUFDRG1GLGVBQWUsQ0FBQ3ZELFNBQUQsQ0FBZixHQUE2QjZOLGNBQWMsQ0FBQzdOLFNBQUQsQ0FBM0M7TUFDQSxPQUFPdUQsZUFBUDtJQUNBOztJQUNELE9BQU9BLGVBQVA7RUFDQSxDQVRNLEVBU0osRUFUSSxDQUFQO0FBVUEsQ0FYTTtBQWFQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNMEUsbUNBQW1DLEdBQUcsVUFDbEQ0RixjQURrRCxFQUc5QztFQUFBLElBREpoRCxTQUNJLHVFQURRLEtBQ1I7RUFDSixNQUFNa0QsUUFBUSxHQUFHbEQsU0FBUyxHQUN2Qm1ELEtBQUssQ0FBQ0MsSUFBTixDQUFXSixjQUFjLENBQUNkLHVCQUFmLENBQXVDN1MsTUFBdkMsRUFBWCxDQUR1QixHQUV2QjVDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZc1csY0FBWixDQUZIO0VBSUEsT0FBT0UsUUFBUSxDQUFDRCxNQUFULENBQWdCLENBQUN2SyxlQUFELEVBQWtCdkQsU0FBbEIsS0FBZ0M7SUFDdEQsSUFDQ3dFLHdEQUFhLENBQUN4RSxTQUFELEVBQVk2TixjQUFjLENBQUN6UCxNQUEzQixDQUFiLElBQ0EsQ0FBQ2dHLDREQUFpQixDQUFDcEUsU0FBRCxFQUFZNk4sY0FBYyxDQUFDelAsTUFBM0IsQ0FGbkIsRUFHRTtNQUNEbUYsZUFBZSxDQUFDdkQsU0FBRCxDQUFmLEdBQTZCMk4sMkJBQTJCLENBQ3ZERSxjQUFjLENBQUM3TixTQUFELENBRHlDLENBQXhEO01BR0EsT0FBT3VELGVBQVA7SUFDQTs7SUFDRCxPQUFPQSxlQUFQO0VBQ0EsQ0FYTSxFQVdKLEVBWEksQ0FBUDtBQVlBLENBcEJNO0FBc0JQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNMkssbUJBQW1CLEdBQUlMLGNBQUQsSUFDbENaLDRDQUFJLENBQUNZLGNBQUQsRUFBaUJBLGNBQWMsQ0FBQ3JFLFdBQWhDLENBREU7QUFHUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1yQix5QkFBeUIsR0FBSTBGLGNBQUQsSUFDeENYLDhDQUFNLENBQUNXLGNBQWMsQ0FBQ3pQLE1BQWhCLEVBQXdCLENBQUM2QixVQUFELEVBQWFELFNBQWIsS0FDN0J3RSx3REFBYSxDQUFDeEUsU0FBRCxFQUFZNk4sY0FBYyxDQUFDelAsTUFBM0IsQ0FEUixDQURBO0FBS1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNOEosNkJBQTZCLEdBQUkyRixjQUFELElBQzVDWCw4Q0FBTSxDQUFDVyxjQUFjLENBQUN6UCxNQUFoQixFQUF3QixDQUFDNkIsVUFBRCxFQUFhRCxTQUFiLEtBQzdCb0UsNERBQWlCLENBQUNwRSxTQUFELEVBQVk2TixjQUFjLENBQUN6UCxNQUEzQixDQURaLENBREE7QUFLUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTStQLHlCQUF5QixHQUFJNU4sSUFBRCxJQUFVO0VBQ2xELElBQUk5TCwrQ0FBTyxDQUFDOEwsSUFBRCxDQUFYLEVBQW1CO0lBQ2xCLE9BQU9BLElBQUksQ0FBQ21DLE9BQUwsQ0FBYSxNQUFiLElBQXVCLENBQUMsQ0FBeEIsR0FDSixJQURJLEdBRUp5TCx5QkFBeUIsQ0FBQzVOLElBQUksQ0FBQyxDQUFELENBQUwsQ0FGNUI7RUFHQTs7RUFDRCxRQUFRQSxJQUFSO0lBQ0MsS0FBSyxRQUFMO01BQ0MsT0FBTyxFQUFQOztJQUNELEtBQUssUUFBTDtJQUNBLEtBQUssU0FBTDtNQUNDLE9BQU8sQ0FBUDs7SUFDRCxLQUFLLE1BQUw7SUFDQSxLQUFLLFFBQUw7TUFDQyxPQUFPLElBQVA7O0lBQ0QsS0FBSyxTQUFMO0lBQ0EsS0FBSyxNQUFMO01BQ0MsT0FBTyxLQUFQOztJQUNELEtBQUssV0FBTDtNQUNDLE9BQU8sSUFBSTZOLElBQUosR0FBV0MsV0FBWCxFQUFQO0VBYkY7O0VBZUEsT0FBTyxJQUFQO0FBQ0EsQ0F0Qk07QUF3QlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTUMsa0JBQWtCLEdBQUcsQ0FBQ3RPLFNBQUQsRUFBWTVCLE1BQVosS0FBdUI7RUFDeEQsSUFBSW9CLDBEQUFlLENBQUNRLFNBQUQsRUFBWTVCLE1BQVosQ0FBbkIsRUFBd0M7SUFDdkMsT0FBTyxXQUFQO0VBQ0E7O0VBQ0QsSUFBSUEsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLElBQXFCNUIsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCTyxJQUEzQyxFQUFpRDtJQUNoRCxJQUFJbkMsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCTyxJQUFsQixLQUEyQixRQUEvQixFQUF5QztNQUN4QyxJQUNDbkMsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCUSxVQUFsQixJQUNBa0QseURBQWMsQ0FBQ3RGLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBTixDQUFrQlEsVUFBbkIsQ0FGZixFQUdFO1FBQ0QsT0FBT3BDLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBTixDQUFrQlEsVUFBbEIsQ0FBNkJDLEdBQTdCLENBQWlDRixJQUFqQyxHQUNKbkMsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCUSxVQUFsQixDQUE2QkMsR0FBN0IsQ0FBaUNGLElBRDdCLEdBRUosSUFGSDtNQUdBOztNQUNELE9BQU8sSUFBUDtJQUNBOztJQUNELE9BQU9uQyxNQUFNLENBQUM0QixTQUFELENBQU4sQ0FBa0JPLElBQXpCO0VBQ0E7O0VBQ0QsT0FBTyxJQUFQO0FBQ0EsQ0FuQk07QUFxQlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNOEgsMEJBQTBCLEdBQUcsQ0FBQ3JJLFNBQUQsRUFBWUMsVUFBWixFQUF3QjdCLE1BQXhCLEtBQW1DO0VBQzVFLElBQUlzRix5REFBYyxDQUFDekQsVUFBRCxDQUFsQixFQUFnQztJQUMvQixPQUFPMkUseURBQVA7RUFDQTs7RUFDRCxJQUFJeEcsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLElBQXFCNUIsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCTyxJQUEzQyxFQUFpRDtJQUNoRCxJQUFJbkMsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCTyxJQUFsQixLQUEyQixRQUEzQixJQUF1Q2tELHFEQUFhLENBQUN4RCxVQUFELENBQXhELEVBQXNFO01BQ3JFLE9BQU80RCw4REFBbUIsQ0FBQzVELFVBQUQsQ0FBbkIsR0FDSjJFLDhEQURJLEdBRUpBLDREQUZIO0lBR0E7RUFDRDs7RUFDRCxPQUFPQSx5REFBUDtBQUNBLENBWk07QUFjUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU13RCx1QkFBdUIsR0FBRyxDQUFDcEksU0FBRCxFQUFZNUIsTUFBWixLQUF1QjtFQUM3RCxJQUFJQSxNQUFNLENBQUM0QixTQUFELENBQVYsRUFBdUI7SUFDdEIsT0FBTzVCLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBTixDQUFrQnJGLE9BQWxCLEdBQ0p5RCxNQUFNLENBQUM0QixTQUFELENBQU4sQ0FBa0JyRixPQURkLEdBRUp3VCx5QkFBeUIsQ0FBQy9QLE1BQU0sQ0FBQzRCLFNBQUQsQ0FBTixDQUFrQk8sSUFBbkIsQ0FGNUI7RUFHQTs7RUFDRCxPQUFPLElBQVA7QUFDQSxDQVBNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcFdQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBUUE7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNWCxZQUFZLEdBQUcsQ0FBQ1csSUFBRCxFQUFPMUYsS0FBUCxLQUFpQjtFQUM1QyxJQUFJOFQsS0FBSyxHQUFHLEtBQVosQ0FENEMsQ0FFNUM7O0VBQ0EsSUFBSWxhLCtDQUFPLENBQUM4TCxJQUFELENBQVgsRUFBbUI7SUFDbEIsS0FBSyxNQUFNcU8sVUFBWCxJQUF5QnJPLElBQXpCLEVBQStCO01BQzlCb08sS0FBSyxHQUFHL08sWUFBWSxDQUFDZ1AsVUFBRCxFQUFhL1QsS0FBYixDQUFwQjs7TUFDQSxJQUFJOFQsS0FBSixFQUFXO1FBQ1Y7TUFDQTtJQUNELENBTmlCLENBT2xCOzs7SUFDQSxPQUFPQSxLQUFQO0VBQ0E7O0VBQ0QsUUFBUXBPLElBQVI7SUFDQyxLQUFLLFNBQUw7TUFDQ29PLEtBQUssR0FBR0osaURBQVMsQ0FBQzFULEtBQUQsQ0FBakI7TUFDQTs7SUFDRCxLQUFLLFFBQUw7TUFDQzhULEtBQUssR0FBR0QsZ0RBQVEsQ0FBQzdULEtBQUQsQ0FBaEI7TUFDQTs7SUFDRCxLQUFLLFFBQUw7TUFDQzhULEtBQUssR0FBR0gsZ0RBQVEsQ0FBQzNULEtBQUQsQ0FBaEI7TUFDQTs7SUFDRCxLQUFLLFFBQUw7TUFDQzhULEtBQUssR0FBR2xMLHFEQUFhLENBQUM1SSxLQUFELENBQXJCO01BQ0E7O0lBQ0QsS0FBSyxTQUFMO0lBQ0EsS0FBSyxNQUFMO01BQ0M4VCxLQUFLLEdBQUdGLGlEQUFTLENBQUM1VCxLQUFELENBQWpCO01BQ0E7O0lBQ0QsS0FBSyxNQUFMO01BQ0M4VCxLQUFLLEdBQUc5VCxLQUFLLEtBQUssSUFBbEI7TUFDQTtFQW5CRjs7RUFxQkEsT0FBTzhULEtBQVA7QUFDQSxDQW5DTTtBQXFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1oUCxnQkFBZ0IsR0FBRyxDQUFDWSxJQUFELEVBQU9zTyxVQUFQLEVBQW1CaFUsS0FBbkIsS0FBNkI7RUFDNUQsT0FDQytFLFlBQVksQ0FBQ1csSUFBRCxFQUFPMUYsS0FBUCxDQUFaLElBQ0FwRywrQ0FBTyxDQUFDb2EsVUFBRCxDQURQLElBRUFBLFVBQVUsQ0FBQ25NLE9BQVgsQ0FBbUI3SCxLQUFuQixJQUE0QixDQUFDLENBSDlCO0FBS0EsQ0FOTTtBQVFQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNNkUsMkJBQTJCLEdBQUcsVUFDMUNNLFNBRDBDLEVBRTFDQyxVQUYwQyxFQUcxQzdCLE1BSDBDLEVBS3RDO0VBQUEsSUFESjBRLGtCQUNJLHVFQURpQixJQUNqQjs7RUFDSjtFQUNBO0VBQ0EsSUFBSTFLLDREQUFpQixDQUFDcEUsU0FBRCxFQUFZNUIsTUFBWixDQUFyQixFQUEwQztJQUN6QyxPQUNDd0IsWUFBWSxDQUFDLFFBQUQsRUFBV0ssVUFBWCxDQUFaLElBQ0FMLFlBQVksQ0FBQyxRQUFELEVBQVdLLFVBQVgsQ0FGYjtFQUlBOztFQUNELE1BQU04TyxNQUFNLEdBQUd0SyxzREFBVyxDQUFDekUsU0FBRCxFQUFZNUIsTUFBWixDQUExQjtFQUNBLE1BQU00USxhQUFhLEdBQUcvSyw2REFBa0IsQ0FBQ2pFLFNBQUQsRUFBWTVCLE1BQVosQ0FBeEM7RUFDQTZCLFVBQVUsR0FDVDZPLGtCQUFrQixJQUFJRSxhQUF0QixHQUNHbFAsc0ZBQXlDLENBQ3pDRSxTQUR5QyxFQUV6Q0MsVUFGeUMsRUFHekM3QixNQUh5QyxDQUQ1QyxHQU1HNkIsVUFQSjtFQVFBQSxVQUFVLEdBQ1Q2TyxrQkFBa0IsSUFDbEIxUSxNQUFNLENBQUM0QixTQUFELENBQU4sQ0FBa0JPLElBQWxCLEtBQTJCLFFBRDNCLElBRUF5TyxhQUZBLEdBR0c7SUFBRXZPLEdBQUcsRUFBRVI7RUFBUCxDQUhILEdBSUdBLFVBTEo7RUFNQSxNQUFNVyxPQUFPLEdBQUdtTyxNQUFNLEdBQ25CcFAsZ0JBQWdCLENBQ2hCdkIsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCTyxJQURGLEVBRWhCbkMsTUFBTSxDQUFDNEIsU0FBRCxDQUFOLENBQWtCYSxJQUZGLEVBR2hCWixVQUhnQixDQURHLEdBTW5CTCxZQUFZLENBQUN4QixNQUFNLENBQUM0QixTQUFELENBQU4sQ0FBa0JPLElBQW5CLEVBQXlCTixVQUF6QixDQU5mLENBekJJLENBZ0NKOztFQUNBLElBQUk4TyxNQUFNLElBQUksQ0FBQ25PLE9BQWYsRUFBd0I7SUFDdkIsTUFBTSxJQUFJTixTQUFKLENBQ0wvTCw0REFBTyxDQUNOLDRJQURNLEVBRU55TCxTQUZNLEVBR041QixNQUFNLENBQUM0QixTQUFELENBQU4sQ0FBa0JhLElBQWxCLENBQXVCNUksSUFBdkIsRUFITSxFQUlOZ0ksVUFKTSxDQURGLENBQU47RUFRQTs7RUFDRCxPQUFPVyxPQUFQO0FBQ0EsQ0FqRE07QUFtRFA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTWYsb0JBQW9CLEdBQUcsQ0FBQ0csU0FBRCxFQUFZVyxRQUFaLEtBQXlCO0VBQzVELE9BQU9BLFFBQVEsQ0FBQ1kseUVBQUQsQ0FBUixDQUE0Q3ZCLFNBQTVDLElBQ0pXLFFBQVEsQ0FBQ1kseUVBQUQsQ0FBUixDQUE0Q3ZCLFNBQTVDLENBREksR0FFSjRFLHlEQUZIO0FBR0EsQ0FKTTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVLUDtBQUNBO0FBQ0E7QUFDQTtBQUVPLE1BQU1sUCxVQUFVLEdBQUcsT0FBbkI7QUFFQSxNQUFNdVosZUFBZSxHQUFHO0VBQzlCalUsUUFBUSxFQUFFLFVBRG9CO0VBRTlCRyxTQUFTLEVBQUUsV0FGbUI7RUFHOUJDLFNBQVMsRUFBRTtBQUhtQixDQUF4QjtBQU1BLE1BQU04VCxnQkFBZ0IsR0FBR2hWLDhDQUFNLENBQUMrVSxlQUFELENBQS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYlA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFTTyxNQUFNblMsY0FBYyxHQUFHRCxzREFBTSxFQUE3QjtBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTXJHLGNBQWMsR0FBRztFQUM3QlUsU0FBUyxFQUFFdEIsdURBQUEsQ0FBZ0I7SUFDMUJ3QixLQUFLLEVBQUV4QiwwREFEbUI7SUFFMUJ5QixPQUFPLEVBQUV6Qix1REFBQSxDQUFnQixDQUN4QixVQUR3QixFQUV4QixRQUZ3QixFQUd4QixZQUh3QixFQUl4QixVQUp3QixFQUt4QixjQUx3QixFQU14QixZQU53QixDQUFoQixDQUZpQjtJQVUxQjRCLEtBQUssRUFBRTVCLHVEQUFBLENBQWdCSSx1REFBaEIsQ0FWbUI7SUFXMUIrRyxXQUFXLEVBQUVuSCx3REFYYTtJQVkxQnVaLFlBQVksRUFBRXZaLDBEQVpZO0lBYTFCb0gsS0FBSyxFQUFFcEgseURBQWVvSDtFQWJJLENBQWhCO0FBRGtCLENBQXZCO0FBa0JQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTXZGLGdCQUFnQixHQUFHO0VBQy9CUCxTQUFTLEVBQUU7SUFDVkUsS0FBSyxFQUFFLEdBREc7SUFFVkMsT0FBTyxFQUFFLFlBRkM7SUFHVkcsS0FBSyxFQUFFZ0MsbURBSEc7SUFJVnVELFdBQVcsRUFBRTtFQUpIO0FBRG9CLENBQXpCO0FBU1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1yRixVQUFVLEdBQUlMLE9BQUQsSUFBYTtFQUN0QyxNQUFNbkIsVUFBVSxHQUFHO0lBQ2xCK0csVUFBVSxFQUFFLHdCQURNO0lBRWxCQyxRQUFRLEVBQUUsc0JBRlE7SUFHbEJtUyxZQUFZLEVBQUUsZ0NBSEk7SUFJbEJDLFVBQVUsRUFBRTtFQUpNLENBQW5CO0VBTUEsT0FBTzNaLG1EQUFXLENBQUNPLFVBQVUsQ0FBQ21CLE9BQUQsQ0FBWCxDQUFYLEdBQW1DQSxPQUFuQyxHQUE2Q25CLFVBQVUsQ0FBQ21CLE9BQUQsQ0FBOUQ7QUFDQSxDQVJNO0FBVVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTU0sZUFBZSxHQUFHLFFBSXpCO0VBQUEsSUFKMEI7SUFDL0JvRixXQUFXLEdBQUcsS0FEaUI7SUFFL0JvUyxZQUYrQjtJQUcvQm5TLEtBQUssR0FBRztFQUh1QixDQUkxQjtFQUNMLE1BQU1wRixLQUFLLEdBQUcsRUFBZDs7RUFFQSxJQUFJLENBQUNtRixXQUFMLEVBQWtCO0lBQ2pCbkYsS0FBSyxDQUFDRyxJQUFOLENBQ0MsNENBQ0MwQiwrQ0FERCxHQUVDLDBDQUZELEdBR0NxRCxjQUFjLENBQUN0RSxLQUFmLEdBQXVCRixNQUF2QixFQUpGO0VBTUE7O0VBQ0QsSUFBSTZXLFlBQUosRUFBa0I7SUFDakJ2WCxLQUFLLENBQUNHLElBQU4sQ0FDQyxzREFBc0RvWCxZQUR2RDtFQUdBOztFQUNELElBQUluUyxLQUFLLElBQUlBLEtBQUssS0FBSyxNQUF2QixFQUErQjtJQUM5QnBGLEtBQUssQ0FBQ0csSUFBTixDQUNDLHFDQUNDNkIseURBREQsR0FFQyxtQ0FGRCxHQUdDaUQsc0RBQU0sR0FBR0csS0FBVCxDQUFlQSxLQUFmLEVBQXNCRyxPQUF0QixDQUE4QixPQUE5QixFQUF1QzNFLEtBQXZDLEdBQStDRixNQUEvQyxFQUpGO0lBTUFWLEtBQUssQ0FBQ0csSUFBTixDQUNDLG1DQUNDOEIsc0RBREQsR0FFQyxpQ0FGRCxHQUdDZ0Qsc0RBQU0sR0FBR0csS0FBVCxDQUFlQSxLQUFmLEVBQXNCSSxLQUF0QixDQUE0QixPQUE1QixFQUFxQzVFLEtBQXJDLEdBQTZDRixNQUE3QyxFQUpGO0VBTUE7O0VBQ0QsT0FBT1YsS0FBSyxDQUFDSyxJQUFOLENBQVcsR0FBWCxDQUFQO0FBQ0EsQ0FuQ007QUFxQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1wQyxjQUFjLEdBQUcsWUFBb0I7RUFBQSxJQUFuQnFCLFNBQW1CLHVFQUFQLEVBQU87RUFDakRBLFNBQVMsR0FBRyxFQUFFLEdBQUdPLGdCQUFnQixDQUFDUCxTQUF0QjtJQUFpQyxHQUFHQTtFQUFwQyxDQUFaO0VBQ0EsT0FBT3BCLHFEQUFrQixDQUFDb0IsU0FBRCxFQUFZUyxlQUFaLEVBQTZCRCxVQUE3QixDQUF6QjtBQUNBLENBSE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzSVA7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNPLE1BQU0rWCxXQUFXLEdBQUdsWSw0Q0FBSSxDQUFDaVMseURBQUQsQ0FBeEI7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTTZELGVBQWUsR0FBRy9QLDZDQUFPLENBQUV3QixTQUFELElBQWUwUSxnREFBUyxDQUFDMVEsU0FBRCxDQUF6QixDQUEvQjtBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNNFEsaUJBQWlCLEdBQUdwUyw2Q0FBTyxDQUFFd0IsU0FBRCxJQUN4QzBRLHlEQUFBLENBQW1CMVEsU0FBbkIsQ0FEdUMsQ0FBakM7QUFJUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTThRLHVCQUF1QixHQUFHdFMsNkNBQU8sQ0FBRXdCLFNBQUQsSUFBZTtFQUM3REEsU0FBUyxHQUFHNFEsaUJBQWlCLENBQUM1USxTQUFELENBQTdCO0VBQ0FBLFNBQVMsR0FBR3lRLGlEQUFTLENBQUN6USxTQUFELENBQXJCO0VBQ0EsT0FBT0EsU0FBUyxDQUFDSSxPQUFWLENBQWtCLEtBQWxCLEVBQXlCLEdBQXpCLENBQVA7QUFDQSxDQUo2QyxDQUF2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9DUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNO0VBQUVtUixZQUFZLEVBQUU3RyxXQUFXLEdBQUc7QUFBOUIsSUFBcUNoTCwyREFBM0M7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTThSLDRCQUE0QixHQUFHaFQsNkNBQU8sQ0FBQyxDQUFDL0YsSUFBRCxFQUFPekMsTUFBUCxLQUFrQjtFQUNyRU8sMERBQWEsQ0FBQ2tDLElBQUQsQ0FBYjtFQUNBLE1BQU13VCxVQUFVLEdBQUcrQyw4Q0FBTSxDQUFDdlcsSUFBRCxFQUFPLFVBQVVnWixNQUFWLEVBQWtCMWIsR0FBbEIsRUFBdUI7SUFDdERELCtEQUFrQixDQUFDQyxHQUFELEVBQU1DLE1BQU4sQ0FBbEI7SUFDQSxPQUFPQSxNQUFNLENBQUN5YixNQUFELENBQU4sR0FBaUIsR0FBakIsR0FBdUJ6YixNQUFNLENBQUNELEdBQUQsQ0FBcEM7RUFDQSxDQUh3QixDQUF6QjtFQUlBLE9BQU91YiwrQ0FBTyxDQUFDckYsVUFBRCxFQUFhLEdBQWIsQ0FBZDtBQUNBLENBUGtELENBQTVDO0FBU1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNeUYsa0JBQWtCLEdBQUdsVCw2Q0FBTyxDQUFDLENBQUN6SSxHQUFELEVBQU1DLE1BQU4sS0FBaUI7RUFDMURGLCtEQUFrQixDQUFDQyxHQUFELEVBQU1DLE1BQU4sQ0FBbEI7RUFDQSxPQUFPQSxNQUFNLENBQUNELEdBQUQsQ0FBYjtBQUNBLENBSHdDLENBQWxDO0FBS1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTTRiLGFBQWEsR0FBR25ULDZDQUFPLENBQUV3QixTQUFELElBQWU7RUFDbkRsSywrREFBa0IsQ0FBQ2tLLFNBQUQsRUFBWTBLLFdBQVosQ0FBbEI7RUFDQSxPQUFPQSxXQUFXLENBQUMxSyxTQUFELENBQWxCO0FBQ0EsQ0FIbUMsQ0FBN0I7QUFLUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTTRSLHdCQUF3QixHQUFHcFQsNkNBQU8sQ0FBQyxVQUFDd0IsU0FBRCxFQUErQjtFQUFBLElBQW5CNlIsU0FBbUIsdUVBQVAsRUFBTztFQUM5RSxNQUFNNUYsVUFBVSxHQUFHMEYsYUFBYSxDQUFDM1IsU0FBRCxDQUFoQztFQUNBLE9BQVEsSUFBR2lNLFVBQVcsUUFBZixHQUF5QjRGLFNBQVMsQ0FBQzFZLElBQVYsRUFBaEM7QUFDQSxDQUg4QyxDQUF4QztBQUtQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNMlkseUJBQXlCLEdBQUd0VCw2Q0FBTyxDQUFDLENBQUN3QixTQUFELEVBQVloSyxNQUFaLEtBQXVCO0VBQ3ZFLE1BQU15QyxJQUFJLEdBQUdrWixhQUFhLENBQUMzUixTQUFELENBQTFCO0VBQ0EsT0FBT3JLLCtDQUFPLENBQUM4QyxJQUFELENBQVAsR0FDSitZLDRCQUE0QixDQUFDL1ksSUFBRCxFQUFPekMsTUFBUCxDQUR4QixHQUVKMGIsa0JBQWtCLENBQUNqWixJQUFELEVBQU96QyxNQUFQLENBRnJCO0FBR0EsQ0FMK0MsQ0FBekM7QUFPUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTStiLDRCQUE0QixHQUFHLFVBQUMvUixTQUFELEVBQThCO0VBQUEsSUFBbEIxRyxRQUFrQix1RUFBUCxFQUFPO0VBQ3pFN0MsNkRBQWdCLENBQ2Y2QyxRQURlLEVBRWY1RCx1REFBRSxDQUFDLGtEQUFELEVBQXFELGdCQUFyRCxDQUZhLENBQWhCO0VBSUFhLDBEQUFhLENBQUMrQyxRQUFELENBQWI7RUFFQSxNQUFNMFksY0FBYyxHQUFHLElBQUlDLEdBQUosRUFBdkI7RUFDQTNZLFFBQVEsQ0FBQ00sT0FBVCxDQUFrQjVELE1BQUQsSUFBWTtJQUM1QmdjLGNBQWMsQ0FBQy9ILEdBQWYsQ0FDQzZILHlCQUF5QixDQUFDOVIsU0FBRCxFQUFZaEssTUFBWixDQUQxQixFQUVDQSxNQUZEO0VBSUEsQ0FMRDtFQU1BLE9BQU9nYyxjQUFQO0FBQ0EsQ0FmTTtBQWlCUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTUUscUNBQXFDLEdBQUcsQ0FBQzNTLE9BQUQsRUFBVWpHLFFBQVYsS0FBdUI7RUFDM0U1Qyx3REFBVyxDQUNWNEMsUUFEVSxFQUVWNUQsdURBQUUsQ0FDRCxzREFEQyxFQUVELGdCQUZDLENBRlEsQ0FBWDtFQU9BNEQsUUFBUSxDQUFDTSxPQUFULENBQWlCLENBQUM1RCxNQUFELEVBQVNtYyxRQUFULEtBQXNCO0lBQ3RDN1ksUUFBUSxDQUFDMlEsR0FBVCxDQUFha0ksUUFBYixFQUF1QjVTLE9BQU8sQ0FBQ21GLFlBQVIsQ0FBcUIxTyxNQUFyQixDQUF2QjtFQUNBLENBRkQ7RUFHQSxPQUFPc0QsUUFBUDtBQUNBLENBWk07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSVA7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFFTyxNQUFNMUMsVUFBVSxHQUFHLGNBQW5CO0FBRUEsTUFBTU8sdUJBQXVCLEdBQUdpRSw4Q0FBTSxDQUM1QzhWLHFFQUQ0QyxDQUF0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWlA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFLQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTXhaLGNBQWMsR0FBRztFQUM3QkMsVUFBVSxFQUFFYiwwREFEaUI7RUFFN0J1YixhQUFhLEVBQUV2YiwwREFGYztFQUc3QndiLGdCQUFnQixFQUFFeGIsMERBSFc7RUFJN0JnQixXQUFXLEVBQUVoQiwwREFKZ0I7RUFLN0JpQixXQUFXLEVBQUVqQix1REFBQSxDQUFnQnNFLDhDQUFNLENBQUM4VixxRUFBRCxDQUF0QixDQUxnQjtFQU03QjlZLFNBQVMsRUFBRXRCLHVEQUFBLENBQWdCO0lBQzFCd0IsS0FBSyxFQUFFeEIsMERBRG1CO0lBRTFCeUIsT0FBTyxFQUFFekIsdURBQUEsQ0FBZ0IsQ0FBQyxRQUFELEVBQVcsVUFBWCxDQUFoQixDQUZpQjtJQUcxQjRCLEtBQUssRUFBRTVCLHVEQUFBLENBQWdCSSx1REFBaEI7RUFIbUIsQ0FBaEI7QUFOa0IsQ0FBdkI7QUFhQSxNQUFNMEUsZ0JBQWdCLEdBQUc7RUFDL0JDLE9BQU8sRUFBRTtJQUNSRSxLQUFLLEVBQUUsUUFEQztJQUVSRCxLQUFLLEVBQUU7RUFGQztBQURzQixDQUF6QjtBQU9QO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1uRCxnQkFBZ0IsR0FBRztFQUMvQlAsU0FBUyxFQUFFO0lBQ1ZFLEtBQUssRUFBRSxHQURHO0lBRVZDLE9BQU8sRUFBRSxVQUZDO0lBR1ZHLEtBQUssRUFBRWdDLG1EQUFnQkE7RUFIYjtBQURvQixDQUF6QjtBQVFQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNOUIsVUFBVSxHQUFJTCxPQUFELElBQWE7RUFDdEMsTUFBTW5CLFVBQVUsR0FBRztJQUNsQm1iLE1BQU0sRUFBRSxRQURVO0lBRWxCQyxRQUFRLEVBQUU7RUFGUSxDQUFuQjtFQUlBLE9BQU8zYixtREFBVyxDQUFDTyxVQUFVLENBQUNtQixPQUFELENBQVgsQ0FBWCxHQUFtQ0EsT0FBbkMsR0FBNkNuQixVQUFVLENBQUNtQixPQUFELENBQTlEO0FBQ0EsQ0FOTTtBQVFQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1NLGVBQWUsR0FBRyxRQU16QjtFQUFBLElBTjBCO0lBQy9CbEIsVUFBVSxHQUFHLENBRGtCO0lBRS9CMGEsYUFBYSxHQUFHLENBRmU7SUFHL0JDLGdCQUFnQixHQUFHLENBSFk7SUFJL0J4YSxXQUFXLEdBQUcsQ0FKaUI7SUFLL0JDLFdBQVcsR0FBRztFQUxpQixDQU0xQjtFQUNMLE1BQU1lLEtBQUssR0FBRyxFQUFkO0VBQ0FuQixVQUFVLEdBQUdvQixRQUFRLENBQUNwQixVQUFELEVBQWEsRUFBYixDQUFyQjs7RUFDQSxJQUFJQSxVQUFVLEtBQUssQ0FBZixJQUFvQixDQUFDcUIsS0FBSyxDQUFDckIsVUFBRCxDQUE5QixFQUE0QztJQUMzQ21CLEtBQUssQ0FBQ0csSUFBTixDQUFXLG1CQUFtQnRCLFVBQTlCO0VBQ0E7O0VBQ0QwYSxhQUFhLEdBQUd0WixRQUFRLENBQUNzWixhQUFELEVBQWdCLEVBQWhCLENBQXhCOztFQUNBLElBQUlBLGFBQWEsS0FBSyxDQUFsQixJQUF1QixDQUFDclosS0FBSyxDQUFDcVosYUFBRCxDQUFqQyxFQUFrRDtJQUNqRHZaLEtBQUssQ0FBQ0csSUFBTixDQUFXLG1CQUFtQm9aLGFBQTlCO0VBQ0E7O0VBQ0RDLGdCQUFnQixHQUFHdlosUUFBUSxDQUFDdVosZ0JBQUQsRUFBbUIsRUFBbkIsQ0FBM0I7O0VBQ0EsSUFBSUEsZ0JBQWdCLEtBQUssQ0FBckIsSUFBMEIsQ0FBQ3RaLEtBQUssQ0FBQ3NaLGdCQUFELENBQXBDLEVBQXdEO0lBQ3ZEeFosS0FBSyxDQUFDRyxJQUFOLENBQVcsbUJBQW1CcVosZ0JBQTlCO0VBQ0E7O0VBQ0R4YSxXQUFXLEdBQUdpQixRQUFRLENBQUNqQixXQUFELEVBQWMsRUFBZCxDQUF0Qjs7RUFDQSxJQUFJQSxXQUFXLEtBQUssQ0FBaEIsSUFBcUIsQ0FBQ2tCLEtBQUssQ0FBQ2xCLFdBQUQsQ0FBL0IsRUFBOEM7SUFDN0NnQixLQUFLLENBQUNHLElBQU4sQ0FBVyxtQkFBbUJuQixXQUE5QjtFQUNBOztFQUNELElBQUlDLFdBQVcsS0FBSyxFQUFoQixJQUFzQkEsV0FBVyxLQUFLLElBQTFDLEVBQWdEO0lBQy9DZSxLQUFLLENBQUNHLElBQU4sQ0FBVyxtQkFBbUJsQixXQUE5QjtFQUNBOztFQUNELE9BQU9lLEtBQUssQ0FBQ0ssSUFBTixDQUFXLEdBQVgsQ0FBUDtBQUNBLENBNUJNO0FBOEJQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNcEMsY0FBYyxHQUFHLFlBQW9CO0VBQUEsSUFBbkJxQixTQUFtQix1RUFBUCxFQUFPO0VBQ2pEQSxTQUFTLEdBQUcsRUFBRSxHQUFHTyxnQkFBZ0IsQ0FBQ1AsU0FBdEI7SUFBaUMsR0FBR0E7RUFBcEMsQ0FBWjtFQUNBLE9BQU9wQixxREFBa0IsQ0FBQ29CLFNBQUQsRUFBWVMsZUFBWixFQUE2QkQsVUFBN0IsQ0FBekI7QUFDQSxDQUhNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdIUDtBQUNBO0FBQ0E7QUFDQTtBQUVPLE1BQU1oQyxVQUFVLEdBQUcsUUFBbkIsRUFDUDs7QUFDTyxNQUFNNmIsaUJBQWlCLEdBQUcsT0FBMUI7QUFDQSxNQUFNQyxpQkFBaUIsR0FBRyxPQUExQjtBQUNBLE1BQU1DLG1CQUFtQixHQUFHLFNBQTVCO0FBQ0EsTUFBTUMsbUJBQW1CLEdBQUcsU0FBNUI7QUFDQSxNQUFNQyx3QkFBd0IsR0FBRyxjQUFqQztBQUNBLE1BQU1DLHVCQUF1QixHQUFHLGFBQWhDLEVBQ1A7O0FBQ08sTUFBTUMsZUFBZSxHQUFHO0VBQzlCQyxLQUFLLEVBQUUsS0FEdUI7RUFFOUJDLElBQUksRUFBRSxLQUZ3QjtFQUc5QjFXLE9BQU8sRUFBRTtBQUhxQixDQUF4QixFQUtQOztBQUNPLE1BQU00VCxlQUFlLEdBQUc7RUFDOUJoVSxNQUFNLEVBQUUsS0FEc0I7RUFFOUIrVyxtQkFBbUIsRUFBRSxLQUZTO0VBRzlCQyxPQUFPLEVBQUUsS0FIcUI7RUFJOUJDLE1BQU0sRUFBRSxLQUpzQjtFQUs5QkosS0FBSyxFQUFFLEtBTHVCO0VBTTlCSyxVQUFVLEVBQUUsS0FOa0I7RUFPOUJDLFFBQVEsRUFBRSxLQVBvQjtFQVE5QkMsT0FBTyxFQUFFLEtBUnFCO0VBUzlCQyxpQkFBaUIsRUFBRSxLQVRXO0VBVTlCQyxPQUFPLEVBQUUsS0FWcUI7RUFXOUJDLFNBQVMsRUFBRTtBQVhtQixDQUF4QixFQWFQOztBQUNPLE1BQU1DLGlCQUFpQixHQUFHO0VBQ2hDQyxLQUFLLEVBQUUsS0FEeUI7RUFFaENDLFNBQVMsRUFBRSxLQUZxQjtFQUdoQ0MsSUFBSSxFQUFFLEtBSDBCO0VBSWhDQyxVQUFVLEVBQUUsS0FKb0I7RUFLaENDLElBQUksRUFBRSxLQUwwQjtFQU1oQ0MsTUFBTSxFQUFFLEtBTndCO0VBT2hDQyxLQUFLLEVBQUUsS0FQeUI7RUFRaENqQixJQUFJLEVBQUU7QUFSMEIsQ0FBMUIsRUFVUDs7QUFDTyxNQUFNa0IsaUJBQWlCLEdBQUc7RUFDaENDLFFBQVEsRUFBRSxLQURzQjtFQUVoQzlYLFNBQVMsRUFBRSxLQUZxQjtFQUdoQytYLFFBQVEsRUFBRSxLQUhzQjtFQUloQ0MsTUFBTSxFQUFFLEtBSndCO0VBS2hDYixPQUFPLEVBQUU7QUFMdUIsQ0FBMUIsRUFPUDs7QUFDTyxNQUFNckIsc0JBQXNCLEdBQUc7RUFDckNnQyxRQUFRLEVBQUUsS0FEMkI7RUFFckM5WCxTQUFTLEVBQUUsS0FGMEI7RUFHckMrWCxRQUFRLEVBQUUsS0FIMkI7RUFJckNOLFVBQVUsRUFBRSxLQUp5QjtFQUtyQ1EsWUFBWSxFQUFFLEtBTHVCO0VBTXJDQyxlQUFlLEVBQUUsS0FOb0I7RUFPckNDLFNBQVMsRUFBRTtBQVAwQixDQUEvQixFQVNQOztBQUNPLE1BQU1DLHFCQUFxQixHQUFHO0VBQ3BDQyxTQUFTLEVBQUUsS0FEeUI7RUFFcENDLFFBQVEsRUFBRSxLQUYwQjtFQUdwQ04sTUFBTSxFQUFFLEtBSDRCO0VBSXBDUCxVQUFVLEVBQUUsS0FKd0I7RUFLcENjLFFBQVEsRUFBRTtBQUwwQixDQUE5QixFQVFQO0FBQ0E7QUFFQTs7QUFDTyxNQUFNQyxhQUFhLEdBQUc7RUFDNUJDLE9BQU8sRUFBRSxTQURtQjtFQUU1QkMsTUFBTSxFQUFFLFFBRm9CO0VBRzVCaEMsS0FBSyxFQUFFLE9BSHFCO0VBSTVCUyxPQUFPLEVBQUUsU0FKbUI7RUFLNUJ3QixPQUFPLEVBQUUsU0FMbUI7RUFNNUJDLE9BQU8sRUFBRTtBQU5tQixDQUF0QjtBQVNBLE1BQU1DLGlCQUFpQixHQUFHLFNBQTFCO0FBRUEsTUFBTUMsY0FBYyxHQUFHLENBQzdCLEdBQUdoYSw4Q0FBTSxDQUFDMlgsZUFBRCxDQURvQixFQUU3QixHQUFHM1gsOENBQU0sQ0FBQytVLGVBQUQsQ0FGb0IsRUFHN0IsR0FBRy9VLDhDQUFNLENBQUN1WSxpQkFBRCxDQUhvQixFQUk3QixHQUFHdlksOENBQU0sQ0FBQytZLGlCQUFELENBSm9CLEVBSzdCLEdBQUcvWSw4Q0FBTSxDQUFDZ1gsc0JBQUQsQ0FMb0IsRUFNN0IsR0FBR2hYLDhDQUFNLENBQUNzWixxQkFBRCxDQU5vQixFQU83QixHQUFHdFosOENBQU0sQ0FBQzBaLGFBQUQsQ0FQb0IsRUFRN0JLLGlCQVI2QixDQUF2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEZQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxNQUFNSSxtQ0FBbUMsR0FBRztFQUMzQyxDQUFDck4sOEVBQUQsR0FBaUQsSUFBSW9OLCtEQUFKLENBQ2hENWYsdURBQUUsQ0FBQyxpQkFBRCxFQUFvQixnQkFBcEIsQ0FEOEMsRUFFaERBLHVEQUFFLENBQUMsa0JBQUQsRUFBcUIsZ0JBQXJCLENBRjhDLENBRE47RUFLM0MsQ0FBQ3dTLHVFQUFELEdBQTBDb04sdUZBQUEsQ0FDekM1Zix1REFBRSxDQUFDLFVBQUQsRUFBYSxnQkFBYixDQUR1QyxDQUxDO0VBUTNDLENBQUN3UywyRUFBRCxHQUE4Q29OLHVGQUFBLENBQzdDNWYsdURBQUUsQ0FBQyxjQUFELEVBQWlCLGdCQUFqQixDQUQyQyxDQVJIO0VBVzNDLENBQUN3Uyx3RUFBRCxHQUEyQ29OLHVGQUFBLENBQzFDNWYsdURBQUUsQ0FBQyxXQUFELEVBQWMsZ0JBQWQsQ0FEd0MsQ0FYQTtFQWMzQyxDQUFDd1MseUVBQUQsR0FBNENvTix1RkFBQSxDQUMzQzVmLHVEQUFFLENBQUMsWUFBRCxFQUFlLGdCQUFmLENBRHlDLENBZEQ7RUFpQjNDLENBQUN3Uyx1RUFBRCxHQUEwQ29OLHVGQUFBLENBQ3pDNWYsdURBQUUsQ0FBQyxVQUFELEVBQWEsZ0JBQWIsQ0FEdUMsQ0FqQkM7RUFvQjNDLENBQUN3Uyx3RUFBRCxHQUEyQyxJQUFJb04sK0RBQUosQ0FDMUM1Zix1REFBRSxDQUFDLFdBQUQsRUFBYyxnQkFBZCxDQUR3QyxFQUUxQ0EsdURBQUUsQ0FBQyxZQUFELEVBQWUsZ0JBQWYsQ0FGd0M7QUFwQkEsQ0FBNUM7QUEwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLE1BQU0rZixrQ0FBa0MsR0FBRztFQUMxQyxDQUFDdk4sc0VBQUQsR0FBeUNvTix1RkFBQSxDQUN4QzVmLHVEQUFFLENBQUMsVUFBRCxFQUFhLGdCQUFiLENBRHNDLENBREM7RUFJMUMsQ0FBQ3dTLHNFQUFELEdBQXlDb04sdUZBQUEsQ0FDeEM1Zix1REFBRSxDQUFDLFVBQUQsRUFBYSxnQkFBYixDQURzQyxDQUpDO0VBTzFDLENBQUN3Uyx3RUFBRCxHQUEyQ29OLHVGQUFBLENBQzFDNWYsdURBQUUsQ0FBQyxZQUFELEVBQWUsZ0JBQWYsQ0FEd0MsQ0FQRDtFQVUxQyxDQUFDd1Msb0VBQUQsR0FBdUNvTix1RkFBQSxDQUN0QzVmLHVEQUFFLENBQUMsUUFBRCxFQUFXLGdCQUFYLENBRG9DLENBVkc7RUFhMUMsQ0FBQ3dTLHVFQUFELEdBQTBDb04sdUZBQUEsQ0FDekM1Zix1REFBRSxDQUFDLFdBQUQsRUFBYyxnQkFBZCxDQUR1QztBQWJBLENBQTNDO0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsTUFBTWdnQiw4QkFBOEIsR0FBRztFQUN0QyxDQUFDeE4sa0VBQUQsR0FBcUNvTix1RkFBQSxDQUNwQzVmLHVEQUFFLENBQUMsVUFBRCxFQUFhLGdCQUFiLENBRGtDLENBREM7RUFJdEMsQ0FBQ3dTLGlFQUFELEdBQW9Db04sdUZBQUEsQ0FDbkM1Zix1REFBRSxDQUFDLFNBQUQsRUFBWSxnQkFBWixDQURpQyxDQUpFO0VBT3RDLENBQUN3UyxtRUFBRCxHQUFzQ29OLHVGQUFBLENBQ3JDNWYsdURBQUUsQ0FBQyxXQUFELEVBQWMsZ0JBQWQsQ0FEbUMsQ0FQQTtFQVV0QyxDQUFDd1Msa0VBQUQsR0FBcUNvTix1RkFBQSxDQUNwQzVmLHVEQUFFLENBQUMsVUFBRCxFQUFhLGdCQUFiLENBRGtDLENBVkM7RUFhdEMsQ0FBQ3dTLGdFQUFELEdBQW1Db04sdUZBQUEsQ0FDbEM1Zix1REFBRSxDQUFDLFFBQUQsRUFBVyxnQkFBWCxDQURnQztBQWJHLENBQXZDO0FBa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsTUFBTWlnQiw4QkFBOEIsR0FBRztFQUN0QyxDQUFDek4sOERBQUQsR0FBaUNvTix1RkFBQSxDQUNoQzVmLHVEQUFFLENBQUMsTUFBRCxFQUFTLGdCQUFULENBRDhCLENBREs7RUFJdEMsQ0FBQ3dTLDhEQUFELEdBQWlDb04sdUZBQUEsQ0FDaEM1Zix1REFBRSxDQUFDLG9CQUFELEVBQXVCLGdCQUF2QixDQUQ4QixDQUpLO0VBT3RDLENBQUN3Uyw4REFBRCxHQUFpQ29OLHVGQUFBLENBQ2hDNWYsdURBQUUsQ0FBQyxRQUFELEVBQVcsZ0JBQVgsQ0FEOEIsQ0FQSztFQVV0QyxDQUFDd1MsK0RBQUQsR0FBa0NvTix1RkFBQSxDQUNqQzVmLHVEQUFFLENBQUMsWUFBRCxFQUFlLGdCQUFmLENBRCtCLENBVkk7RUFhdEMsQ0FBQ3dTLG1FQUFELEdBQXNDb04sdUZBQUEsQ0FDckM1Zix1REFBRSxDQUFDLHdCQUFELEVBQTJCLGdCQUEzQixDQURtQyxDQWJBO0VBZ0J0QyxDQUFDd1MsZ0VBQUQsR0FBbUNvTix1RkFBQSxDQUNsQzVmLHVEQUFFLENBQUMsc0JBQUQsRUFBeUIsZ0JBQXpCLENBRGdDLENBaEJHO0VBbUJ0QyxDQUFDd1Msb0VBQUQsR0FBdUNvTix1RkFBQSxDQUN0QzVmLHVEQUFFLENBQUMsdUJBQUQsRUFBMEIsZ0JBQTFCLENBRG9DLENBbkJEO0VBc0J0QyxDQUFDd1MsK0RBQUQsR0FBa0NvTix1RkFBQSxDQUNqQzVmLHVEQUFFLENBQUMsZ0NBQUQsRUFBbUMsZ0JBQW5DLENBRCtCO0FBdEJJLENBQXZDO0FBMkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsTUFBTWtnQiwwQkFBMEIsR0FBRztFQUNsQyxDQUFDMU4sNkRBQUQsR0FBZ0NvTix1RkFBQSxDQUMvQjVmLHVEQUFFLENBQUMsV0FBRCxFQUFjLGdCQUFkLENBRDZCLENBREU7RUFJbEMsQ0FBQ3dTLDREQUFELEdBQStCb04sdUZBQUEsQ0FDOUI1Zix1REFBRSxDQUFDLFdBQUQsRUFBYyxnQkFBZCxDQUQ0QixDQUpHO0VBT2xDLENBQUN3UywyREFBRCxHQUE4Qm9OLHVGQUFBLENBQzdCNWYsdURBQUUsQ0FBQyxPQUFELEVBQVUsZ0JBQVYsQ0FEMkIsQ0FQSTtFQVVsQyxDQUFDd1MsNkRBQUQsR0FBZ0NvTix1RkFBQSxDQUMvQjVmLHVEQUFFLENBQUMsU0FBRCxFQUFZLGdCQUFaLENBRDZCLENBVkU7RUFhbEMsQ0FBQ3dTLDZEQUFELEdBQWdDb04sdUZBQUEsQ0FDL0I1Zix1REFBRSxDQUFDLFNBQUQsRUFBWSxnQkFBWixDQUQ2QixDQWJFO0VBZ0JsQyxDQUFDd1MsNkRBQUQsR0FBZ0NvTix1RkFBQSxDQUMvQjVmLHVEQUFFLENBQUMsU0FBRCxFQUFZLGdCQUFaLENBRDZCO0FBaEJFLENBQW5DLEVBcUJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxNQUFNbWdCLDRCQUE0QixHQUFHO0VBQ3BDLENBQUMxRiw0REFBRCxHQUE0Qm1GLHVGQUFBLENBQzNCNWYsdURBQUUsQ0FBQyxVQUFELEVBQWEsZ0JBQWIsQ0FEeUIsQ0FEUTtFQUlwQyxDQUFDeWEsNkRBQUQsR0FBNkJtRix1RkFBQSxDQUM1QjVmLHVEQUFFLENBQUMsV0FBRCxFQUFjLGdCQUFkLENBRDBCLENBSk87RUFPcEMsQ0FBQ3lhLDZEQUFELEdBQTZCbUYsdUZBQUEsQ0FDNUI1Zix1REFBRSxDQUFDLFdBQUQsRUFBYyxnQkFBZCxDQUQwQjtBQVBPLENBQXJDO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxNQUFNb2dCLDZCQUE2QixHQUFHO0VBQ3JDLENBQUNULDhEQUFELEdBQTZCQyx1RkFBQSxDQUM1QjVmLHVEQUFFLENBQUMsVUFBRCxFQUFhLGdCQUFiLENBRDBCLENBRFE7RUFJckMsQ0FBQzJmLDZEQUFELEdBQTRCQyx1RkFBQSxDQUMzQjVmLHVEQUFFLENBQUMsU0FBRCxFQUFZLGdCQUFaLENBRHlCLENBSlM7RUFPckMsQ0FBQzJmLDhEQUFELEdBQTZCQyx1RkFBQSxDQUM1QjVmLHVEQUFFLENBQUMsVUFBRCxFQUFhLGdCQUFiLENBRDBCLENBUFE7RUFVckMsQ0FBQzJmLDZEQUFELEdBQTRCQyx1RkFBQSxDQUMzQjVmLHVEQUFFLENBQUMsVUFBRCxFQUFhLGdCQUFiLENBRHlCLENBVlM7RUFhckMsQ0FBQzJmLDREQUFELEdBQTJCQyx1RkFBQSxDQUMxQjVmLHVEQUFFLENBQUMsU0FBRCxFQUFZLGdCQUFaLENBRHdCO0FBYlUsQ0FBdEM7QUFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxNQUFNdWdCLCtCQUErQixHQUFHO0VBQ3ZDLENBQUNoYSxtRUFBRCxHQUFnQ3FaLHVGQUFBLENBQy9CNWYsdURBQUUsQ0FBQyxXQUFELEVBQWMsZ0JBQWQsQ0FENkIsQ0FETztFQUl2QyxDQUFDdUcsa0VBQUQsR0FBK0JxWix1RkFBQSxDQUM5QjVmLHVEQUFFLENBQUMsVUFBRCxFQUFhLGdCQUFiLENBRDRCLENBSlE7RUFPdkMsQ0FBQ3VHLGlFQUFELEdBQThCcVosdUZBQUEsQ0FDN0I1Zix1REFBRSxDQUFDLFNBQUQsRUFBWSxnQkFBWixDQUQyQixDQVBTO0VBVXZDLENBQUN1RyxrRUFBRCxHQUErQnFaLHVGQUFBLENBQzlCNWYsdURBQUUsQ0FBQyxVQUFELEVBQWEsZ0JBQWIsQ0FENEIsQ0FWUTtFQWF2QyxDQUFDdUcsa0VBQUQsR0FBK0JxWix1RkFBQSxDQUM5QjVmLHVEQUFFLENBQUMsVUFBRCxFQUFhLGdCQUFiLENBRDRCLENBYlE7RUFnQnZDLENBQUN1RyxnRUFBRCxHQUE2QnFaLHVGQUFBLENBQzVCNWYsdURBQUUsQ0FBQyxRQUFELEVBQVcsZ0JBQVgsQ0FEMEIsQ0FoQlU7RUFtQnZDLENBQUN1RyxtRUFBRCxHQUFnQ3FaLHVGQUFBLENBQy9CNWYsdURBQUUsQ0FBQyxXQUFELEVBQWMsZ0JBQWQsQ0FENkI7QUFuQk8sQ0FBeEM7QUF3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxNQUFNd2dCLDhCQUE4QixHQUFHO0VBQ3RDLENBQUM3YSx5RUFBRCxHQUF1QyxJQUFJaWEsK0RBQUosQ0FDdEM1Zix1REFBRSxDQUFDLFVBQUQsRUFBYSxnQkFBYixDQURvQyxFQUV0Q0EsdURBQUUsQ0FBQyxXQUFELEVBQWMsZ0JBQWQsQ0FGb0MsQ0FERDtFQUt0QyxDQUFDMkYsMEVBQUQsR0FBd0MsSUFBSWlhLCtEQUFKLENBQ3ZDNWYsdURBQUUsQ0FBQyxXQUFELEVBQWMsZ0JBQWQsQ0FEcUMsRUFFdkNBLHVEQUFFLENBQUMsWUFBRCxFQUFlLGdCQUFmLENBRnFDLENBTEY7RUFTdEMsQ0FBQzJGLDRFQUFELEdBQTBDaWEsdUZBQUEsQ0FDekM1Zix1REFBRSxDQUFDLGtCQUFELEVBQXFCLGdCQUFyQixDQUR1QztBQVRKLENBQXZDO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxNQUFNeWdCLDBCQUEwQixHQUFHLEVBQ2xDLEdBQUdaLG1DQUQrQjtFQUVsQyxHQUFHRSxrQ0FGK0I7RUFHbEMsR0FBR0MsOEJBSCtCO0VBSWxDLEdBQUdDLDhCQUorQjtFQUtsQyxHQUFHQywwQkFMK0I7RUFNbEMsR0FBR0MsNEJBTitCO0VBT2xDLEdBQUdDLDZCQVArQjtFQVFsQyxHQUFHRywrQkFSK0I7RUFTbEMsR0FBR0MsOEJBVCtCO0VBVWxDLENBQUNoTyx5REFBRCxHQUE0Qm9OLHVGQUFBLENBQzNCNWYsdURBQUUsQ0FBQyxTQUFELEVBQVksZ0JBQVosQ0FEeUI7QUFWTSxDQUFuQztBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU1nRyxZQUFZLEdBQUcsVUFDM0IwYSxVQUQyQixFQUl2QjtFQUFBLElBRkp2RixRQUVJLHVFQUZPLElBRVA7RUFBQSxJQURKdlIsTUFDSSx1RUFES2dXLG9GQUNMO0VBQ0osT0FBT2EsMEJBQTBCLENBQUNDLFVBQUQsQ0FBMUIsR0FDSkQsMEJBQTBCLENBQUNDLFVBQUQsQ0FBMUIsQ0FBdUNFLFdBQXZDLENBQW1EekYsUUFBbkQsRUFBNkR2UixNQUE3RCxDQURJLEdBRUo2VywwQkFBMEIsQ0FBQ2pPLHlEQUFELENBQTFCLENBQXFEb08sV0FBckQsQ0FDQXpGLFFBREEsRUFFQXZSLE1BRkEsQ0FGSDtBQU1BLENBWE07QUFhUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNaVgsY0FBYyxHQUFHLFVBQzdCQyxXQUQ2QixFQUl6QjtFQUFBLElBRkozRixRQUVJLHVFQUZPLElBRVA7RUFBQSxJQURKdlIsTUFDSSx1RUFES2dXLG9GQUNMOztFQUNKLElBQUksQ0FBQzNmLCtDQUFPLENBQUM2Z0IsV0FBRCxDQUFaLEVBQTJCO0lBQzFCLE1BQU0sSUFBSWhWLFNBQUosQ0FDTCx5Q0FBeUMsaUJBRHBDLENBQU47RUFHQTs7RUFDRCxNQUFNaVYsY0FBYyxHQUFHLEVBQXZCO0VBQ0FELFdBQVcsQ0FBQzVjLE9BQVosQ0FBcUJ3YyxVQUFELElBQWdCO0lBQ25DSyxjQUFjLENBQUNMLFVBQUQsQ0FBZCxHQUE2QjFhLFlBQVksQ0FBQzBhLFVBQUQsRUFBYXZGLFFBQWIsRUFBdUJ2UixNQUF2QixDQUF6QztFQUNBLENBRkQ7RUFHQSxPQUFPbVgsY0FBUDtBQUNBLENBZk07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4U1A7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU0vZSxjQUFjLEdBQUc7RUFDN0JVLFNBQVMsRUFBRXRCLHVEQUFBLENBQWdCO0lBQzFCd0IsS0FBSyxFQUFFeEIsMERBRG1CO0lBRTFCeUIsT0FBTyxFQUFFekIsMERBRmlCO0lBRzFCNEIsS0FBSyxFQUFFNUIsdURBQUEsQ0FBZ0JJLHVEQUFoQjtFQUhtQixDQUFoQjtBQURrQixDQUF2QjtBQVFQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU15QixnQkFBZ0IsR0FBRztFQUMvQlAsU0FBUyxFQUFFO0lBQ1ZFLEtBQUssRUFBRSxFQURHO0lBRVZDLE9BQU8sRUFBRSxZQUZDO0lBR1ZHLEtBQUssRUFBRXpCLGtEQUFlQTtFQUhaO0FBRG9CLENBQXpCO0FBUVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLE1BQU0yQixVQUFVLEdBQUlMLE9BQUQsSUFBYTtFQUN0QyxNQUFNbkIsVUFBVSxHQUFHO0lBQ2xCZ2YsVUFBVSxFQUFFO0VBRE0sQ0FBbkI7RUFHQSxPQUFPdmYsbURBQVcsQ0FBQ08sVUFBVSxDQUFDbUIsT0FBRCxDQUFYLENBQVgsR0FBbUNBLE9BQW5DLEdBQTZDbkIsVUFBVSxDQUFDbUIsT0FBRCxDQUE5RDtBQUNBLENBTE07QUFPUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNTSxlQUFlLEdBQUcsUUFBb0I7RUFBQSxJQUFuQjtJQUFFNmQ7RUFBRixDQUFtQjtFQUNsRCxNQUFNNWQsS0FBSyxHQUFHLEVBQWQ7O0VBQ0EsSUFBSTRkLFVBQUosRUFBZ0I7SUFDZjVkLEtBQUssQ0FBQ0csSUFBTixDQUFXLHFCQUFxQnlkLFVBQWhDO0VBQ0E7O0VBQ0QsT0FBTzVkLEtBQUssQ0FBQ0ssSUFBTixDQUFXLEdBQVgsQ0FBUDtBQUNBLENBTk07QUFRUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTXBDLGNBQWMsR0FBRyxZQUFvQjtFQUFBLElBQW5CcUIsU0FBbUIsdUVBQVAsRUFBTztFQUNqREEsU0FBUyxHQUFHLEVBQUUsR0FBR08sZ0JBQWdCLENBQUNQLFNBQXRCO0lBQWlDLEdBQUdBO0VBQXBDLENBQVo7RUFDQSxPQUFPcEIscURBQWtCLENBQUNvQixTQUFELEVBQVlTLGVBQVosRUFBNkJELFVBQTdCLENBQXpCO0FBQ0EsQ0FITTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RGUDtBQUNBO0FBQ0E7QUFDQTtBQUVPLE1BQU1oQyxVQUFVLEdBQUcsUUFBbkI7QUFFQSxNQUFNeWUsZ0JBQWdCLEdBQUc7RUFDL0JuWixRQUFRLEVBQUUsS0FEcUI7RUFFL0JLLE9BQU8sRUFBRSxLQUZzQjtFQUcvQndaLFFBQVEsRUFBRSxLQUhxQjtFQUkvQnRDLE9BQU8sRUFBRSxLQUpzQjtFQUsvQnVDLE1BQU0sRUFBRTtBQUx1QixDQUF6QjtBQVFBLE1BQU1XLGlCQUFpQixHQUFHdmIsOENBQU0sQ0FBQ2lhLGdCQUFELENBQWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZlA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQVNPLE1BQU1yWCxjQUFjLEdBQUdELHNEQUFNLEVBQTdCO0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNckcsY0FBYyxHQUFHO0VBQzdCVSxTQUFTLEVBQUV0Qix1REFBQSxDQUFnQjtJQUMxQndCLEtBQUssRUFBRXhCLDBEQURtQjtJQUUxQnlCLE9BQU8sRUFBRXpCLHVEQUFBLENBQWdCLENBQ3hCLFVBRHdCLEVBRXhCLFFBRndCLEVBR3hCLFlBSHdCLEVBSXhCLFVBSndCLENBQWhCLENBRmlCO0lBUTFCNEIsS0FBSyxFQUFFNUIsdURBQUEsQ0FBZ0JJLHVEQUFoQixDQVJtQjtJQVMxQitHLFdBQVcsRUFBRW5ILHdEQVRhO0lBVTFCb0gsS0FBSyxFQUFFcEgseURBQWVvSDtFQVZJLENBQWhCO0FBRGtCLENBQXZCO0FBZVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNdkYsZ0JBQWdCLEdBQUc7RUFDL0JQLFNBQVMsRUFBRTtJQUNWRSxLQUFLLEVBQUUsR0FERztJQUVWQyxPQUFPLEVBQUUsWUFGQztJQUdWRyxLQUFLLEVBQUVnQyxtREFIRztJQUlWdUQsV0FBVyxFQUFFO0VBSkg7QUFEb0IsQ0FBekI7QUFTUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTXJGLFVBQVUsR0FBSUwsT0FBRCxJQUFhO0VBQ3RDLE1BQU1uQixVQUFVLEdBQUc7SUFDbEIrRyxVQUFVLEVBQUUsZ0JBRE07SUFFbEJDLFFBQVEsRUFBRTtFQUZRLENBQW5CO0VBSUEsT0FBT3ZILG1EQUFXLENBQUNPLFVBQVUsQ0FBQ21CLE9BQUQsQ0FBWCxDQUFYLEdBQW1DQSxPQUFuQyxHQUE2Q25CLFVBQVUsQ0FBQ21CLE9BQUQsQ0FBOUQ7QUFDQSxDQU5NO0FBUVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxNQUFNTSxlQUFlLEdBQUcsUUFLekI7RUFBQSxJQUwwQjtJQUMvQmxCLFVBQVUsR0FBRyxDQURrQjtJQUUvQkUsYUFBYSxHQUFHLENBRmU7SUFHL0JvRyxXQUFXLEdBQUcsS0FIaUI7SUFJL0JDLEtBQUssR0FBRztFQUp1QixDQUsxQjtFQUNMLE1BQU1wRixLQUFLLEdBQUcsRUFBZDs7RUFDQSxJQUFJLENBQUNtRixXQUFMLEVBQWtCO0lBQ2pCbkYsS0FBSyxDQUFDRyxJQUFOLENBQ0Msb0NBQ0MwQiwrQ0FERCxHQUVDLGtDQUZELEdBR0NxRCxjQUFjLENBQUN0RSxLQUFmLEdBQXVCRixNQUF2QixFQUpGO0VBTUE7O0VBQ0QsSUFBSTBFLEtBQUssSUFBSUEsS0FBSyxLQUFLLE1BQXZCLEVBQStCO0lBQzlCcEYsS0FBSyxDQUFDRyxJQUFOLENBQ0MsNkJBQ0M2Qix5REFERCxHQUVDLDJCQUZELEdBR0NpRCxzREFBTSxHQUFHRyxLQUFULENBQWVBLEtBQWYsRUFBc0JHLE9BQXRCLENBQThCLE9BQTlCLEVBQXVDM0UsS0FBdkMsR0FBK0NGLE1BQS9DLEVBSkY7SUFNQVYsS0FBSyxDQUFDRyxJQUFOLENBQ0MsMkJBQ0M4QixzREFERCxHQUVDLHlCQUZELEdBR0NnRCxzREFBTSxHQUFHRyxLQUFULENBQWVBLEtBQWYsRUFBc0JJLEtBQXRCLENBQTRCLE9BQTVCLEVBQXFDNUUsS0FBckMsR0FBNkNGLE1BQTdDLEVBSkY7RUFNQTs7RUFDRDdCLFVBQVUsR0FBR29CLFFBQVEsQ0FBQ3BCLFVBQUQsRUFBYSxFQUFiLENBQXJCOztFQUNBLElBQUlBLFVBQVUsS0FBSyxDQUFmLElBQW9CLENBQUNxQixLQUFLLENBQUNyQixVQUFELENBQTlCLEVBQTRDO0lBQzNDbUIsS0FBSyxDQUFDRyxJQUFOLENBQVcsa0NBQWtDdEIsVUFBN0M7RUFDQTs7RUFDREUsYUFBYSxHQUFHa0IsUUFBUSxDQUFDbEIsYUFBRCxFQUFnQixFQUFoQixDQUF4Qjs7RUFDQSxJQUFJQSxhQUFhLEtBQUssQ0FBbEIsSUFBdUIsQ0FBQ21CLEtBQUssQ0FBQ25CLGFBQUQsQ0FBakMsRUFBa0Q7SUFDakRpQixLQUFLLENBQUNHLElBQU4sQ0FBVyw0QkFBNEJwQixhQUF2QztFQUNBOztFQUNELE9BQU9pQixLQUFLLENBQUNLLElBQU4sQ0FBVyxHQUFYLENBQVA7QUFDQSxDQXRDTTtBQXdDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTXBDLGNBQWMsR0FBRyxZQUFvQjtFQUFBLElBQW5CcUIsU0FBbUIsdUVBQVAsRUFBTztFQUNqREEsU0FBUyxHQUFHLEVBQUUsR0FBR08sZ0JBQWdCLENBQUNQLFNBQXRCO0lBQWlDLEdBQUdBO0VBQXBDLENBQVo7RUFDQSxPQUFPcEIscURBQWtCLENBQUNvQixTQUFELEVBQVlTLGVBQVosRUFBNkJELFVBQTdCLENBQXpCO0FBQ0EsQ0FITTs7Ozs7Ozs7OztBQ3ZJUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRCQUE0QjtBQUMxQyxjQUFjLDRCQUE0QjtBQUMxQyxjQUFjLDRCQUE0QjtBQUMxQztBQUNBLGNBQWMsNEJBQTRCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFVBQVU7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFVBQVU7QUFDeEI7QUFDQSxXQUFXLGVBQWU7QUFDMUIsV0FBVyxlQUFlO0FBQzFCO0FBQ0EsWUFBWSw0QkFBNEI7QUFDeEM7QUFDQTtBQUNBOztBQUVBLFlBQVksNEJBQTRCO0FBQ3hDOztBQUVBLFlBQVksNEJBQTRCO0FBQ3hDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsZUFBZTtBQUMxQyxxQkFBcUIsaUJBQWlCO0FBQ3RDLGNBQWMsaUJBQWlCO0FBQy9CLElBQUk7QUFDSjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLEtBQStCLEdBQUcsRUFNdEM7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ3pGQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTSxJQUEwRjtBQUNoRztBQUNBO0FBQ0EsSUFBSSxLQUFLLEVBUU47QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxpQkFBaUI7QUFDL0IsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsVUFBVTtBQUN4QixjQUFjLFVBQVU7QUFDeEIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjO0FBQ2Q7QUFDQTtBQUNBLDhCQUE4QixJQUFJO0FBQ2xDO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFVBQVU7QUFDeEIsY0FBYyxVQUFVO0FBQ3hCLGNBQWMsVUFBVTtBQUN4QixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxVQUFVO0FBQ3hCLGNBQWMsVUFBVTtBQUN4QixjQUFjLFVBQVU7QUFDeEIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBUztBQUN2QixjQUFjLFNBQVM7QUFDdkIsY0FBYyxTQUFTO0FBQ3ZCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QixhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QixhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLElBQXFDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsU0FBUyxLQUFxQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHNCQUFzQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsSUFBcUM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsMkJBQTJCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBOztBQUVB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Ozs7Ozs7OztBQ3BMYTs7QUFFYixJQUFJLEtBQXFDLEVBQUUsRUFFMUMsQ0FBQztBQUNGLEVBQUUsd0pBQXlEO0FBQzNEOzs7Ozs7Ozs7Ozs7QUNOQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvYXNzZXJ0aW9ucy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2F0dGVuZGVlL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2F0dGVuZGVlL2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvYXR0ZW5kZWUvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9iYXNlLWRhdGUtZm9ybWF0dGVyLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvYmFzZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2NoZWNraW4vY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvY2hlY2tpbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2NoZWNraW4vcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9mb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9kYXRldGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2RhdGV0aW1lL3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZGVmYXVsdC1tb2RlbC1zdGF0ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VuZHBvaW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2Fzc2VydGlvbnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9lbnRpdHktZmFjdG9yeS9iYXNlLWVudGl0eS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2Jvb2xlYW5zLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZW50aXR5LWZhY3RvcnkvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZW50aXR5LWZhY3RvcnkvY3JlYXRlLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZW50aXR5LWZhY3RvcnkvZXh0cmFjdG9ycy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VudGl0eS1mYWN0b3J5L2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZW50aXR5LWZhY3RvcnkvdmFsaWRhdG9ycy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2V2ZW50L2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2V2ZW50L2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvZXZlbnQvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9tb2RlbC1uYW1lcy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL21vZGVscy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3ByaW1hcnkta2V5cy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3JlZ2lzdHJhdGlvbi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9yZWdpc3RyYXRpb24vcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvc3RhdHVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC9zdGF0dXMvcXVlcnkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL2Fzc2V0cy9zcmMvZGF0YS9tb2RlbC90aWNrZXQvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdGlja2V0L3F1ZXJ5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvbWVtaXplL2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL3BsdXJhbGl6ZS9wbHVyYWxpemUuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzIiwid2VicGFjazovL2VlanMubW9kZWwvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL2hhcy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvZXh0ZXJuYWwgd2luZG93IFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB3aW5kb3cgW1wiZWVqc1wiLFwiaGVscGVyc1wiXSIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsL2V4dGVybmFsIHdpbmRvdyBbXCJlZWpzXCIsXCJpMThuXCJdIiwid2VicGFjazovL2VlanMubW9kZWwvZXh0ZXJuYWwgd2luZG93IFtcImVlanNcIixcInZhbGlkYXRvcnNcIl0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC9leHRlcm5hbCB3aW5kb3cgW1wiZWVqc1wiLFwidmFsdWVPYmplY3RzXCJdIiwid2VicGFjazovL2VlanMubW9kZWwvZXh0ZXJuYWwgd2luZG93IFtcImVlanNcIixcInZlbmRvclwiLFwiY3VpZFwiXSIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsL2V4dGVybmFsIHdpbmRvdyBbXCJlZWpzXCIsXCJ2ZW5kb3JcIixcIm1vbWVudFwiXSIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsL2V4dGVybmFsIHdpbmRvdyBbXCJlZWpzXCJdIiwid2VicGFjazovL2VlanMubW9kZWwvZXh0ZXJuYWwgd2luZG93IFtcIndwXCIsXCJob29rc1wiXSIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2VlanMubW9kZWwvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VlanMubW9kZWwvLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IEV4Y2VwdGlvbiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHsgc3ByaW50ZiwgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzQXJyYXksIGlzRW1wdHksIGlzTWFwIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIGtleSBleGlzdHMgaW4gdGhlIHByb3ZpZGVkIGVudGl0eSBvYmplY3QuXG4gKiBUaGlzIGlzIHVzZWQgd2hlbiBjYWxsaW5nIGNvZGUgd2FudHMgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93bi5cbiAqXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBrZXlcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGVudGl0eVxuICogQHBhcmFtIHsgc3RyaW5nIH0gbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9ICBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoZSBwcm92aWRlZCBlbnRpdHkgZG9lcyBub3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBoYXZlIHRoZSBnaXZlbiBrZXkuXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRFbnRpdHlIYXNLZXkgPSAoa2V5LCBlbnRpdHksIG1lc3NhZ2UgPSAnJykgPT4ge1xuXHRpZiAobWVzc2FnZSA9PT0gJycpIHtcblx0XHRtZXNzYWdlID0gc3ByaW50Zihcblx0XHRcdF9fKFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIGVudGl0eSAoJXMpIGRvZXMgbm90IGhhdmUgdGhlIGdpdmVuIHByb3BlcnR5ICglcyknLFxuXHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHQpLFxuXHRcdFx0ZW50aXR5LFxuXHRcdFx0a2V5XG5cdFx0KTtcblx0fVxuXHRpZiAoIWVudGl0eS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbihtZXNzYWdlKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIHBhdGggaW4gdGhlIHByb3ZpZGVkIGltbXV0YWJsZSBvYmplY3QgZXhpc3RzLlxuICogVGhpcyBpcyB1c2VkIHdoZW4gY2FsbGluZyBjb2RlIHdhbnRzIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24gaWYgdGhlIGdpdmVuXG4gKiBzZWFyY2ggcGF0aCBhcnJheSBkb2VzIG5vdCBleGlzdCBpbiB0aGUgaW1tdXRhYmxlIG9iamVjdC5cbiAqXG4gKiBJZiB0aGUgaW1tdXRhYmxlIG9iamVjdCBpcyBzZXR1cCBsaWtlIHRoaXM6XG4gKlxuICogaW1tdXRhYmxlID0gSW1tdXRhYmxlLk1hcCgpLnNldCggJ2V2ZW50JywgSW1tdXRhYmxlLk1hcCgpLnNldCggMTAsIEV2ZW50ICkgKTtcbiAqXG4gKiBUaGVuIGEgdmFsaWQgc2VhcmNoYWJsZSBwYXRoIGNvdWxkIGJlIGBbICdldmVudCcsIDEwIF1gLiAgQW4gaW52YWxpZCBwYXRoXG4gKiB3b3VsZCBiZSBgWyAnZGF0ZXRpbWUnLCAxMCBdYFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGggIFNlYXJjaGFibGUgcGF0aCBmb3IgdGhlIGltbXV0YWJsZSBvamJlY3QgdG8gdmVyaWZ5LlxuICogQHBhcmFtIHtJbW11dGFibGUuTWFwfEltbXV0YWJsZS5TZXR9IGltbXV0YWJsZSAgQW4gaW1tdXRhYmxlIG9iamVjdCAoTWFwLCBTZXQsIExpc3QgZXRjKVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgQSBjdXN0b20gbWVzc2FnZSB0byB1c2UuXG4gKiBAdGhyb3dzIEV4Y2VwdGlvblxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0SW1tdXRhYmxlT2JqZWN0SGFzUGF0aCA9IChwYXRoLCBpbW11dGFibGUsIG1lc3NhZ2UgPSAnJykgPT4ge1xuXHRpZiAobWVzc2FnZSA9PT0gJycpIHtcblx0XHRtZXNzYWdlID0gc3ByaW50Zihcblx0XHRcdF9fKFxuXHRcdFx0XHQnVGhlIHByb3ZpZGVkIGltbXV0YWJsZSBvYmplY3QgKCVzKSBkb2VzIG5vdCBoYXZlIHRoZSBnaXZlbiBwYXRoICglcyknLFxuXHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHQpLFxuXHRcdFx0aW1tdXRhYmxlLFxuXHRcdFx0cGF0aFxuXHRcdCk7XG5cdH1cblx0aWYgKCFpbW11dGFibGUuaGFzSW4ocGF0aCkpIHtcblx0XHR0aHJvdyBuZXcgRXhjZXB0aW9uKG1lc3NhZ2UpO1xuXHR9XG59O1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gYXJyYXkuXG4gKlxuICogQHBhcmFtIHsqfSBpdGVtc1xuICogQHBhcmFtIHsgc3RyaW5nIH0gIG1lc3NhZ2VcbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfSBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5cbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydElzQXJyYXkgPSAoaXRlbXMsIG1lc3NhZ2UgPSAnJykgPT4ge1xuXHRpZiAobWVzc2FnZSA9PT0gJycpIHtcblx0XHRtZXNzYWdlID0gX18oJ1RoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYW4gYXJyYXkuJywgJ2V2ZW50X2VzcHJlc3NvJyk7XG5cdH1cblx0aWYgKCFpc0FycmF5KGl0ZW1zKSkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24obWVzc2FnZSk7XG5cdH1cbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGVtcHR5IG9yIG5vdC5cbiAqXG4gKiBDYWxsIHRoaXMgdmFsaWRhdG9yIHdoZW4geW91IHdhbnQgdG8gbWFrZSBzdXJlIHRoZSB2YWx1ZSBpcyBOT1QgZW1wdHkuXG4gKlxuICogQHBhcmFtIHsqfSBpdGVtc1xuICogQHBhcmFtIHsgc3RyaW5nIH0gbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9IFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGVtcHR5LlxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0SXNOb3RFbXB0eSA9IChpdGVtcywgbWVzc2FnZSA9ICcnKSA9PiB7XG5cdGlmIChtZXNzYWdlID09PSAnJykge1xuXHRcdG1lc3NhZ2UgPSBfXygnVGhlIHByb3ZpZGVkIGl0ZW1zIG11c3Qgbm90IGJlIGVtcHR5JywgJ2V2ZW50X2VzcHJlc3NvJyk7XG5cdH1cblx0aWYgKGlzRW1wdHkoaXRlbXMpKSB7XG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbihtZXNzYWdlKTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGEgTWFwIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0geyp9IGl0ZW1cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGFzc2VydElzTWFwID0gKGl0ZW0sIG1lc3NhZ2UgPSAnJykgPT4ge1xuXHRpZiAobWVzc2FnZSA9PT0gJycpIHtcblx0XHRtZXNzYWdlID0gX18oXG5cdFx0XHQnVGhlIHByb3ZpZGVkIGl0ZW0gbXVzdCBiZSBhIE1hcCBvYmplY3QnLFxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdCk7XG5cdH1cblx0aWYgKCFpc01hcChpdGVtKSkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24obWVzc2FnZSk7XG5cdH1cbn07XG4iLCJleHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdhdHRlbmRlZSc7XG4iLCJleHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbmV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0FTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG59IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IHsgUkVHSVNUUkFUSU9OX1NUQVRVU19JRFMgfSBmcm9tICcuLi9yZWdpc3RyYXRpb24vY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdGlkOiAnQVRUX0lEJyxcblx0bGFzdE5hbWVPbmx5OiAnQVRUX2xuYW1lJyxcblx0Zmlyc3ROYW1lT25seTogJ0FUVF9mbmFtZScsXG5cdGZpcnN0VGhlbkxhc3ROYW1lOiBbJ0FUVF9mbmFtZScsICdBVFRfbG5hbWUnXSxcblx0bGFzdFRoZW5GaXJzdE5hbWU6IFsnQVRUX2xuYW1lJywgJ0FUVF9mbmFtZSddLFxufTtcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICpcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0Zm9yRXZlbnRJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yRGF0ZXRpbWVJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yVGlja2V0SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclN0YXR1c0lkOiBQcm9wVHlwZXMub25lT2YoUkVHSVNUUkFUSU9OX1NUQVRVU19JRFMpLFxuXHRmb3JSZWdpc3RyYXRpb25JZDogUHJvcFR5cGVzLm51bWJlcixcblx0c2hvd0dyYXZhdGFyOiBQcm9wVHlwZXMuYm9vbCxcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhvcmRlckJ5TWFwKSksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZihBTExPV0VEX09SREVSX1ZBTFVFUyksXG5cdH0pLFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ2xhc3RUaGVuRmlyc3ROYW1lJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfQVNDLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWRcbiAqIGluIGEgUkVTVCBxdWVyeSBmcm9tIHRoZSBjb250ZXh0IG9mIGEgYXR0ZW5kZWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFx0XHRvcmRlckJ5XG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gXHRSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZ1xuICogXHRcdFx0XHRcdFx0Zm9yIHRoZSBSRVNUIHF1ZXJ5IGZvciB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAob3JkZXJCeSkgPT4ge1xuXHRyZXR1cm4gaXNVbmRlZmluZWQob3JkZXJCeU1hcFtvcmRlckJ5XSkgPyBvcmRlckJ5IDogb3JkZXJCeU1hcFtvcmRlckJ5XTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIGF0dGVuZGVlcyBlbmRwb2ludCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgICAgXHRJRCBvZiBFdmVudCB0byByZXRyaWV2ZSBhdHRlbmRlZXMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yRGF0ZXRpbWVJZCBcdElEIG9mIERhdGV0aW1lIHRvIHJldHJpZXZlIGF0dGVuZGVlcyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JUaWNrZXRJZCBcdFx0SUQgb2YgVGlja2V0IHRvIHJldHJpZXZlIGF0dGVuZGVlcyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JSZWdpc3RyYXRpb25JZFxuICogQHBhcmFtIHtzdHJpbmd9IGZvclN0YXR1c0lkIFx0XHRJRCBvZiBTdGF0dXMgdG8gcmV0cmlldmUgYXR0ZW5kZWVzIGZvclxuICogQHBhcmFtIHtzdHJpbmd9IHNob3dHcmF2YXRhciBcdEJvb2xlYW4gdG9nZ2xlIGZvciB3aGV0aGVyIHRvIGRpc3BsYXkgdXNlciBHcmF2YXRhclxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICBcdFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICh7XG5cdGZvckV2ZW50SWQgPSAwLFxuXHRmb3JEYXRldGltZUlkID0gMCxcblx0Zm9yVGlja2V0SWQgPSAwLFxuXHRmb3JSZWdpc3RyYXRpb25JZCA9IDAsXG5cdGZvclN0YXR1c0lkID0gJ1JBUCcsXG5cdHNob3dHcmF2YXRhciA9IGZhbHNlLFxufSkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXG5cdC8vIGVuc3VyZSB0aGF0IGVudGl0eSBJRHMgYXJlIGludGVnZXJzXG5cdGZvclJlZ2lzdHJhdGlvbklkID0gcGFyc2VJbnQoZm9yUmVnaXN0cmF0aW9uSWQsIDEwKTtcblx0Zm9yVGlja2V0SWQgPSBwYXJzZUludChmb3JUaWNrZXRJZCwgMTApO1xuXHRmb3JEYXRldGltZUlkID0gcGFyc2VJbnQoZm9yRGF0ZXRpbWVJZCwgMTApO1xuXHRmb3JFdmVudElkID0gcGFyc2VJbnQoZm9yRXZlbnRJZCwgMTApO1xuXG5cdC8vIG9yZGVyIG9mIHByaW9yaXR5IGZvciBwcm92aWRlZCBhcmd1bWVudHMuXG5cdGlmIChmb3JSZWdpc3RyYXRpb25JZCAhPT0gMCAmJiAhaXNOYU4oZm9yUmVnaXN0cmF0aW9uSWQpKSB7XG5cdFx0d2hlcmUucHVzaChgd2hlcmVbUmVnaXN0cmF0aW9uLlJFR19JRF09JHtmb3JSZWdpc3RyYXRpb25JZH1gKTtcblx0fSBlbHNlIGlmIChmb3JUaWNrZXRJZCAhPT0gMCAmJiAhaXNOYU4oZm9yVGlja2V0SWQpKSB7XG5cdFx0d2hlcmUucHVzaChgd2hlcmVbUmVnaXN0cmF0aW9uLlRpY2tldC5US1RfSURdPSR7Zm9yVGlja2V0SWR9YCk7XG5cdH0gZWxzZSBpZiAoZm9yRGF0ZXRpbWVJZCAhPT0gMCAmJiAhaXNOYU4oZm9yRGF0ZXRpbWVJZCkpIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0YHdoZXJlW1JlZ2lzdHJhdGlvbi5UaWNrZXQuRGF0ZXRpbWUuRFRUX0lEXT0ke2ZvckRhdGV0aW1lSWR9YFxuXHRcdCk7XG5cdH0gZWxzZSBpZiAoZm9yRXZlbnRJZCAhPT0gMCAmJiAhaXNOYU4oZm9yRXZlbnRJZCkpIHtcblx0XHR3aGVyZS5wdXNoKGB3aGVyZVtSZWdpc3RyYXRpb24uRVZUX0lEXT0ke2ZvckV2ZW50SWR9YCk7XG5cdH1cblxuXHRpZiAoUkVHSVNUUkFUSU9OX1NUQVRVU19JRFMuaW5jbHVkZXMoZm9yU3RhdHVzSWQpKSB7XG5cdFx0d2hlcmUucHVzaChgd2hlcmVbUmVnaXN0cmF0aW9uLlN0YXR1cy5TVFNfSURdPSR7Zm9yU3RhdHVzSWR9YCk7XG5cdH1cblx0aWYgKHNob3dHcmF2YXRhciA9PT0gdHJ1ZSkge1xuXHRcdHdoZXJlLnB1c2goJ2NhbGN1bGF0ZT11c2VyX2F2YXRhcicpO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCcmJyk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAocXVlcnlEYXRhID0ge30pID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcocXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkpO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgKiBhcyBkYXRlRm9ybWF0cyBmcm9tICdAZXZlbnRlc3ByZXNzby9oZWxwZXJzJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIG9uIHByb3ZpZGVkIGVudGl0aWVzLiAgRG9lcyBub3QgbXV0YXRlIG9yaWdpbmFsXG4gKiBlbnRpdGllcy5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzICBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IHN0cmluZyB9IGZvcm1hdCAgVGhlIGZvcm1hdCB0byB0cmFuc2Zvcm0gdGhlIGRhdGUgZmllbGQgdmFsdWVzIHRvLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IEFycmF5IH0gIFJldHVybnMgYSBuZXcgYXJyYXkgb2YgbmV3IGVudGl0aWVzIHdpdGggdGhlIGRhdGUgZmllbGRcbiAqICAgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RGF0ZXNPbkVudGl0aWVzID0gKFxuXHRlbnRpdGllcyA9IFtdLFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGZvcm1hdCA9IGRhdGVGb3JtYXRzLkRBVEVfVElNRV9GT1JNQVRfSVNPODYwMSxcblx0bG9jYWwgPSB0cnVlXG4pID0+IHtcblx0aWYgKGlzRW1wdHkoZW50aXRpZXMpIHx8IGlzRW1wdHkoZW50aXR5RGF0ZUZpZWxkcykpIHtcblx0XHRyZXR1cm4gZW50aXRpZXM7XG5cdH1cblx0Y29uc3QgZm9ybWF0dGVkRW50aXRpZXMgPSBbXTtcblx0ZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5KSA9PiB7XG5cdFx0Zm9ybWF0dGVkRW50aXRpZXMucHVzaChcblx0XHRcdGZvcm1hdERhdGVzT25FbnRpdHkoZW50aXR5LCBlbnRpdHlEYXRlRmllbGRzLCBmb3JtYXQsIGxvY2FsKVxuXHRcdCk7XG5cdH0pO1xuXHRyZXR1cm4gZm9ybWF0dGVkRW50aXRpZXM7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIG9uIHRoZSBwcm92aWRlZCBlbnRpdHkuICBEb2VzIG5vdCBtdXRhdGUgb3JpZ2luYWxcbiAqIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHkgIEFuIGVudGl0eVxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IHN0cmluZyB9IGZvcm1hdCAgVGhlIGZvcm1hdCB0byB0cmFuc2Zvcm0gdGhlIGRhdGUgZmllbGQgdmFsdWVzIHRvLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IE9iamVjdCB9ICBSZXR1cm5zIGEgbmV3IGVudGl0eSB3aXRoIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdERhdGVzT25FbnRpdHkgPSAoXG5cdGVudGl0eSA9IHt9LFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGZvcm1hdCA9IGRhdGVGb3JtYXRzLkRBVEVfVElNRV9GT1JNQVRfSVNPODYwMSxcblx0bG9jYWwgPSB0cnVlXG4pID0+IHtcblx0Y29uc3QgbmV3RW50aXR5ID0geyAuLi5lbnRpdHkgfTtcblx0ZW50aXR5RGF0ZUZpZWxkcy5mb3JFYWNoKChkYXRlRmllbGQpID0+IHtcblx0XHRpZiAobmV3RW50aXR5W2RhdGVGaWVsZF0pIHtcblx0XHRcdG5ld0VudGl0eVtkYXRlRmllbGRdID0gZGF0ZUZvcm1hdHMuZm9ybWF0RGF0ZVN0cmluZyhcblx0XHRcdFx0bmV3RW50aXR5W2RhdGVGaWVsZF0sXG5cdFx0XHRcdGZvcm1hdCxcblx0XHRcdFx0bG9jYWxcblx0XHRcdCk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIG5ld0VudGl0eTtcbn07XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZGF0ZSBmaWVsZHMgdG8gbXlzcWwgZm9ybWF0IG9uIHByb3ZpZGVkIGVudGl0aWVzLiAgRG9lcyBub3RcbiAqIG11dGF0ZSBvcmlnaW5hbCBlbnRpdGllcy5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzICBBbiBhcnJheSBvZiBlbnRpdHkgb2JqZWN0c1xuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzICBBbiBhcnJheSBvZiBmaWVsZCBuYW1lcyB0aGF0IGFyZSBkYXRlXG4gKiAgIGZpZWxkcy5cbiAqIEBwYXJhbSB7IGJvb2xlYW4gfSBsb2NhbCAgICAgIFdoZXRoZXIgb3Igbm90IHRvIGNvbnZlcnQgdGhlIGRhdGUgZmllbGQgdmFsdWVcbiAqICAgdG8gdGhlIGxvY2FsIHRpbWV6b25lIGZvciB0aGUgaG9zdC5cbiAqIEByZXR1cm4geyBBcnJheSB9ICBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIG5ldyBlbnRpdGllcyB3aXRoIHRoZSBkYXRlIGZpZWxkXG4gKiAgIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEVudGl0aWVzRGF0ZXNUb015c3FsID0gKFxuXHRlbnRpdGllcyA9IFtdLFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW10sXG5cdGxvY2FsID0gdHJ1ZVxuKSA9PiB7XG5cdHJldHVybiBmb3JtYXREYXRlc09uRW50aXRpZXMoXG5cdFx0ZW50aXRpZXMsXG5cdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHRkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX01ZU1FMLFxuXHRcdGxvY2FsXG5cdCk7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIHRvIG15c3FsIGZvcm1hdCBvbiBwcm92aWRlZCBlbnRpdHkuICBEb2VzIG5vdFxuICogbXV0YXRlIG9yaWdpbmFsIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHkgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IE9iamVjdCB9ICBSZXR1cm5zIGEgbmV3IGVudGl0eSB3aXRoIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEVudGl0eURhdGVzVG9NeXNxbCA9IChcblx0ZW50aXR5ID0ge30sXG5cdGVudGl0eURhdGVGaWVsZHMgPSBbXSxcblx0bG9jYWwgPSB0cnVlXG4pID0+IHtcblx0cmV0dXJuIGZvcm1hdERhdGVzT25FbnRpdHkoXG5cdFx0ZW50aXR5LFxuXHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0ZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9NWVNRTCxcblx0XHRsb2NhbFxuXHQpO1xufTtcblxuLyoqXG4gKiBGb3JtYXRzIHRoZSBkYXRlIGZpZWxkcyB0byB0aGUgc2l0ZSBmb3JtYXQgb24gcHJvdmlkZWQgZW50aXRpZXMuICBEb2VzIG5vdFxuICogbXV0YXRlIG9yaWdpbmFsIGVudGl0aWVzLlxuICpcbiAqIEBwYXJhbSB7IEFycmF5IH0gZW50aXRpZXMgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IEFycmF5IH0gIFJldHVybnMgYSBuZXcgYXJyYXkgb2YgbmV3IGVudGl0aWVzIHdpdGggdGhlIGRhdGUgZmllbGRcbiAqICAgdmFsdWVzIGZvcm1hdHRlZFxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0RW50aXRpZXNEYXRlc1RvU2l0ZSA9IChcblx0ZW50aXRpZXMgPSBbXSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRsb2NhbCA9IHRydWVcbikgPT4ge1xuXHRyZXR1cm4gZm9ybWF0RGF0ZXNPbkVudGl0aWVzKFxuXHRcdGVudGl0aWVzLFxuXHRcdGVudGl0eURhdGVGaWVsZHMsXG5cdFx0ZGF0ZUZvcm1hdHMuREFURV9USU1FX0ZPUk1BVF9TSVRFLFxuXHRcdGxvY2FsXG5cdCk7XG59O1xuXG4vKipcbiAqIEZvcm1hdHMgdGhlIGRhdGUgZmllbGRzIHRvIHRoZSBzaXRlIGZvcm1hdCBvbiBwcm92aWRlZCBlbnRpdHkuICBEb2VzIG5vdFxuICogbXV0YXRlIG9yaWdpbmFsIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHkgIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHBhcmFtIHsgYm9vbGVhbiB9IGxvY2FsICAgICAgV2hldGhlciBvciBub3QgdG8gY29udmVydCB0aGUgZGF0ZSBmaWVsZCB2YWx1ZVxuICogICB0byB0aGUgbG9jYWwgdGltZXpvbmUgZm9yIHRoZSBob3N0LlxuICogQHJldHVybiB7IE9iamVjdCB9ICBSZXR1cm5zIGEgbmV3IGVudGl0eSB3aXRoIHRoZSBkYXRlIGZpZWxkIHZhbHVlcyBmb3JtYXR0ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEVudGl0eURhdGVzVG9TaXRlID0gKFxuXHRlbnRpdHkgPSB7fSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdLFxuXHRsb2NhbCA9IHRydWVcbikgPT4ge1xuXHRyZXR1cm4gZm9ybWF0RGF0ZXNPbkVudGl0eShcblx0XHRlbnRpdHksXG5cdFx0ZW50aXR5RGF0ZUZpZWxkcyxcblx0XHRkYXRlRm9ybWF0cy5EQVRFX1RJTUVfRk9STUFUX1NJVEUsXG5cdFx0bG9jYWxcblx0KTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgZGF0ZSBmaWVsZCB2YWx1ZXMgdG8gbW9tZW50IG9iamVjdHMgZm9yIHRoZSBwcm92aWRlZCBlbnRpdGllcy5cbiAqIERvZXMgbm90IG11dGF0ZSBvcmlnaW5hbCBlbnRpdGllcy5cbiAqXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzIEFuIGFycmF5IG9mIGVudGl0eSBvYmplY3RzXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0eURhdGVGaWVsZHMgQW4gYXJyYXkgb2YgZmllbGQgbmFtZXMgdGhhdCBhcmUgZGF0ZVxuICogICBmaWVsZHMuXG4gKiBAcmV0dXJuIHsgQXJyYXkgfSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIG5ldyBlbnRpdGllcyB3aXRoIHRoZSBkYXRlIGZpZWxkXG4gKiAgIHZhbHVlcyBjb252ZXJ0ZWQgdG8gbW9tZW50IG9iamVjdHMuXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0RW50aXRpZXNEYXRlc1RvTW9tZW50ID0gKFxuXHRlbnRpdGllcyA9IFtdLFxuXHRlbnRpdHlEYXRlRmllbGRzID0gW11cbikgPT4ge1xuXHRpZiAoaXNFbXB0eShlbnRpdGllcykgfHwgaXNFbXB0eShlbnRpdHlEYXRlRmllbGRzKSkge1xuXHRcdHJldHVybiBlbnRpdGllcztcblx0fVxuXHRjb25zdCBmb3JtYXR0ZWRFbnRpdGllcyA9IFtdO1xuXHRlbnRpdGllcy5mb3JFYWNoKChlbnRpdHkpID0+IHtcblx0XHRmb3JtYXR0ZWRFbnRpdGllcy5wdXNoKFxuXHRcdFx0Y29udmVydEVudGl0eURhdGVzVG9Nb21lbnQoZW50aXR5LCBlbnRpdHlEYXRlRmllbGRzKVxuXHRcdCk7XG5cdH0pO1xuXHRyZXR1cm4gZm9ybWF0dGVkRW50aXRpZXM7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGRhdGUgZmllbGQgdmFsdWVzIHRvIG1vbWVudCBvYmplY3RzIGZvciB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogRG9lcyBub3QgbXV0YXRlIG9yaWdpbmFsIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBlbnRpdHkgQW4gZW50aXR5LlxuICogQHBhcmFtIHsgQXJyYXkgfSBlbnRpdHlEYXRlRmllbGRzIEFuIGFycmF5IG9mIGZpZWxkIG5hbWVzIHRoYXQgYXJlIGRhdGVcbiAqICAgZmllbGRzLlxuICogQHJldHVybiB7IE9iamVjdCB9IFJldHVybnMgYSBuZXcgZW50aXR5IHdpdGggdGhlIGRhdGUgZmllbGQgdmFsdWVzIGNvbnZlcnRlZFxuICogICB0byBtb21lbnQgb2JqZWN0cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRFbnRpdHlEYXRlc1RvTW9tZW50ID0gKFxuXHRlbnRpdHkgPSB7fSxcblx0ZW50aXR5RGF0ZUZpZWxkcyA9IFtdXG4pID0+IHtcblx0Y29uc3QgbmV3RW50aXR5ID0geyAuLi5lbnRpdHkgfTtcblx0ZW50aXR5RGF0ZUZpZWxkcy5mb3JFYWNoKChkYXRlRmllbGQpID0+IHtcblx0XHRpZiAobmV3RW50aXR5W2RhdGVGaWVsZF0pIHtcblx0XHRcdG5ld0VudGl0eVtkYXRlRmllbGRdID0gZGF0ZUZvcm1hdHMuc3RyaW5nVG9Nb21lbnQoXG5cdFx0XHRcdG5ld0VudGl0eVtkYXRlRmllbGRdXG5cdFx0XHQpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBuZXdFbnRpdHk7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzQXJyYXksIGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IFFVRVJZX09SREVSX0FTQyA9ICdBU0MnO1xuZXhwb3J0IGNvbnN0IFFVRVJZX09SREVSX0RFU0MgPSAnREVTQyc7XG5leHBvcnQgY29uc3QgQUxMT1dFRF9PUkRFUl9WQUxVRVMgPSBbJ2FzYycsICdkZXNjJywgJ0FTQycsICdERVNDJ107XG5leHBvcnQgY29uc3QgR1JFQVRFUl9USEFOID0gZW5jb2RlVVJJQ29tcG9uZW50KCc+Jyk7XG5leHBvcnQgY29uc3QgTEVTU19USEFOID0gZW5jb2RlVVJJQ29tcG9uZW50KCc8Jyk7XG5leHBvcnQgY29uc3QgR1JFQVRFUl9USEFOX0FORF9FUVVBTCA9IGVuY29kZVVSSUNvbXBvbmVudCgnPj0nKTtcbmV4cG9ydCBjb25zdCBMRVNTX1RIQU5fQU5EX0VRVUFMID0gZW5jb2RlVVJJQ29tcG9uZW50KCc8PScpO1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHdoZXJlQ29uZGl0aW9ucyAgQSBmdW5jdGlvbiBmb3IgcHJlcHBpbmcgdGhlIHdoZXJlXG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbmRpdGlvbnMgZnJvbSB0aGUgcXVlcnlEYXRhLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWFwT3JkZXJCeVx0XHRBIGZ1bmN0aW9uIGZvciBtYXBwaW5nIGluY29taW5nIG9yZGVyX2J5XG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdHN0cmluZ3MgdG8gdGhlIHZhbHVlIG5lZWRlZCBmb3IgdGhlXG4gKiBcdFx0XHRcdFx0XHRcdFx0XHRcdHF1ZXJ5X3N0cmluZy5cbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgXHRcdFx0XHRcdFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKFxuXHRxdWVyeURhdGEgPSB7fSxcblx0d2hlcmVDb25kaXRpb25zID0gKCkgPT4gbnVsbCxcblx0bWFwT3JkZXJCeSA9IChvcmRlckJ5KSA9PiBvcmRlckJ5XG4pID0+IHtcblx0Y29uc3Qgd2hlcmUgPSB3aGVyZUNvbmRpdGlvbnMocXVlcnlEYXRhKTtcblx0Y29uc3QgeyBsaW1pdCwgb3JkZXIsIG9yZGVyQnksIGRlZmF1bHRXaGVyZUNvbmRpdGlvbnMgfSA9IHF1ZXJ5RGF0YTtcblx0Y29uc3QgcXVlcnlQYXJhbXMgPSBbXTtcblx0aWYgKCFpc1VuZGVmaW5lZChsaW1pdCkpIHtcblx0XHRxdWVyeVBhcmFtcy5wdXNoKGBsaW1pdD0ke2xpbWl0fWApO1xuXHR9XG5cdGlmICghaXNVbmRlZmluZWQoZGVmYXVsdFdoZXJlQ29uZGl0aW9ucykpIHtcblx0XHRxdWVyeVBhcmFtcy5wdXNoKGBkZWZhdWx0X3doZXJlX2NvbmRpdGlvbnM9JHtkZWZhdWx0V2hlcmVDb25kaXRpb25zfWApO1xuXHR9XG5cdGlmICghaXNVbmRlZmluZWQobWFwT3JkZXJCeShvcmRlckJ5KSkpIHtcblx0XHRpZiAoaXNBcnJheShtYXBPcmRlckJ5KG9yZGVyQnkpKSkge1xuXHRcdFx0Zm9yIChjb25zdCBmaWVsZCBvZiBtYXBPcmRlckJ5KG9yZGVyQnkpKSB7XG5cdFx0XHRcdHF1ZXJ5UGFyYW1zLnB1c2goYG9yZGVyX2J5WyR7ZmllbGR9XT0ke29yZGVyfWApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRxdWVyeVBhcmFtcy5wdXNoKGBvcmRlcj0ke29yZGVyfWApO1xuXHRcdFx0cXVlcnlQYXJhbXMucHVzaChgb3JkZXJfYnk9JHttYXBPcmRlckJ5KG9yZGVyQnkpfWApO1xuXHRcdH1cblx0fVxuXHRsZXQgcXVlcnlTdHJpbmcgPSBxdWVyeVBhcmFtcy5qb2luKCcmJyk7XG5cdGlmICh3aGVyZSkge1xuXHRcdHF1ZXJ5U3RyaW5nICs9ICcmJyArIHdoZXJlO1xuXHR9XG5cdHJldHVybiBxdWVyeVN0cmluZztcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAnY2hlY2tpbic7XG5cbmV4cG9ydCBjb25zdCBDSEVDS0lOX1NUQVRVU19JRCA9IHtcblx0U1RBVFVTX0NIRUNLRURfT1VUOiBmYWxzZSxcblx0U1RBVFVTX0NIRUNLRURfSU46IHRydWUsXG5cdFNUQVRVU19DSEVDS0VEX05FVkVSOiAyLFxufTtcblxuZXhwb3J0IGNvbnN0IENIRUNLSU5fU1RBVFVTX0lEUyA9IHZhbHVlcyhDSEVDS0lOX1NUQVRVU19JRCk7XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgcHJldHR5U3RhdHVzIH0gZnJvbSAnLi4vc3RhdHVzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfREVTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG59IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0ICogYXMgY2hlY2tpblN0YXR1cyBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdGZvckRhdGV0aW1lSWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvckV2ZW50SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclJlZ2lzdHJhdGlvbklkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRmb3JUaWNrZXRJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yU3RhdHVzSWQ6IFByb3BUeXBlcy5vbmVPZihjaGVja2luU3RhdHVzLkNIRUNLSU5fU1RBVFVTX0lEUyksXG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoW1xuXHRcdFx0J0NIS19JRCcsXG5cdFx0XHQnUkVHX0lEJyxcblx0XHRcdCdDSEtfdGltZXN0YW1wJyxcblx0XHRcdCdEVFRfSUQnLFxuXHRcdF0pLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoQUxMT1dFRF9PUkRFUl9WQUxVRVMpLFxuXHR9KSxcbn07XG5cbmV4cG9ydCBjb25zdCBvcHRpb25zRW50aXR5TWFwID0ge1xuXHRkZWZhdWx0OiAoKSA9PiB7XG5cdFx0cmV0dXJuIFtcblx0XHRcdHtcblx0XHRcdFx0bGFiZWw6IHByZXR0eVN0YXR1cyhcblx0XHRcdFx0XHRjaGVja2luU3RhdHVzLkNIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX09VVFxuXHRcdFx0XHQpLFxuXHRcdFx0XHR2YWx1ZTogY2hlY2tpblN0YXR1cy5DSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9PVVQsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRsYWJlbDogcHJldHR5U3RhdHVzKFxuXHRcdFx0XHRcdGNoZWNraW5TdGF0dXMuQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfSU5cblx0XHRcdFx0KSxcblx0XHRcdFx0dmFsdWU6IGNoZWNraW5TdGF0dXMuQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfSU4sXG5cdFx0XHR9LFxuXHRcdF07XG5cdH0sXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICpcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDEwMCxcblx0XHRvcmRlckJ5OiAnQ0hLX3RpbWVzdGFtcCcsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYSByZWdpc3RyYXRpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKG9yZGVyQnkpID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHR0aW1lc3RhbXA6ICdDSEtfdGltZXN0YW1wJyxcblx0XHRpZDogJ0NIS19JRCcsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZChvcmRlckJ5TWFwW29yZGVyQnldKSA/IG9yZGVyQnkgOiBvcmRlckJ5TWFwW29yZGVyQnldO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gcmVnaXN0cmF0aW9ucyBlbmRwb2ludCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZvckRhdGV0aW1lSWQgICAgXHRJRCBvZiBFdmVudCB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvckV2ZW50SWQgICAgSUQgb2YgQXR0ZW5kZWUgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JSZWdpc3RyYXRpb25JZCBJRCBvZiBUcmFuc2FjdGlvbiB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvclRpY2tldElkIFx0XHRJRCBvZiBUaWNrZXQgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JTdGF0dXNJZCBcdFx0SUQgb2YgU3RhdHVzIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgIFx0VGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKHtcblx0Zm9yRGF0ZXRpbWVJZCA9IDAsXG5cdGZvckV2ZW50SWQgPSAwLFxuXHRmb3JSZWdpc3RyYXRpb25JZCA9IDAsXG5cdGZvclRpY2tldElkID0gMCxcblx0Zm9yU3RhdHVzSWQgPSAnJyxcbn0pID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0Zm9yRXZlbnRJZCA9IHBhcnNlSW50KGZvckV2ZW50SWQsIDEwKTtcblx0aWYgKGZvckV2ZW50SWQgIT09IDAgJiYgIWlzTmFOKGZvckV2ZW50SWQpKSB7XG5cdFx0d2hlcmUucHVzaCgnd2hlcmVbUmVnaXN0cmF0aW9uLkVWVF9JRF09JyArIGZvckV2ZW50SWQpO1xuXHR9XG5cdGZvckRhdGV0aW1lSWQgPSBwYXJzZUludChmb3JEYXRldGltZUlkLCAxMCk7XG5cdGlmIChmb3JEYXRldGltZUlkICE9PSAwICYmICFpc05hTihmb3JEYXRldGltZUlkKSkge1xuXHRcdHdoZXJlLnB1c2goJ3doZXJlW0RUVF9JRF09JyArIGZvckRhdGV0aW1lSWQpO1xuXHR9XG5cdGZvclJlZ2lzdHJhdGlvbklkID0gcGFyc2VJbnQoZm9yUmVnaXN0cmF0aW9uSWQsIDEwKTtcblx0aWYgKGZvclJlZ2lzdHJhdGlvbklkICE9PSAwICYmICFpc05hTihmb3JSZWdpc3RyYXRpb25JZCkpIHtcblx0XHR3aGVyZS5wdXNoKCd3aGVyZVtSRUdfSURdPScgKyBmb3JSZWdpc3RyYXRpb25JZCk7XG5cdH1cblx0Zm9yVGlja2V0SWQgPSBwYXJzZUludChmb3JUaWNrZXRJZCwgMTApO1xuXHRpZiAoZm9yVGlja2V0SWQgIT09IDAgJiYgIWlzTmFOKGZvclRpY2tldElkKSkge1xuXHRcdHdoZXJlLnB1c2goJ3doZXJlW1JlZ2lzdHJhdGlvbi5US1RfSURdPScgKyBmb3JUaWNrZXRJZCk7XG5cdH1cblx0aWYgKGZvclN0YXR1c0lkICE9PSAnJyAmJiBmb3JTdGF0dXNJZCAhPT0gbnVsbCkge1xuXHRcdHdoZXJlLnB1c2goJ3doZXJlW0NIS19pbl09JyArIGZvclN0YXR1c0lkKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbignJicpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKHF1ZXJ5RGF0YSA9IHt9KSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5KTtcbn07XG4iLCJpbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgTU9ERUxfTkFNRSA9ICdkYXRldGltZSc7XG5cbmV4cG9ydCBjb25zdCBEQVRFVElNRV9TVEFUVVNfSUQgPSB7XG5cdFNPTERfT1VUOiAnRFRTJyxcblx0QUNUSVZFOiAnRFRBJyxcblx0VVBDT01JTkc6ICdEVFUnLFxuXHRQT1NUUE9ORUQ6ICdEVFAnLFxuXHRDQU5DRUxMRUQ6ICdEVEMnLFxuXHRFWFBJUkVEOiAnRFRFJyxcblx0SU5BQ1RJVkU6ICdEVEknLFxufTtcblxuZXhwb3J0IGNvbnN0IERBVEVUSU1FX1NUQVRVU19JRFMgPSB2YWx1ZXMoREFURVRJTUVfU1RBVFVTX0lEKTtcbiIsIi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgKiBhcyBiYXNlRm9ybWF0dGVyIGZyb20gJy4uL2Jhc2UtZGF0ZS1mb3JtYXR0ZXInO1xuXG4vKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgZm9yT3duLCBwdWxsQXQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtcblx0VElNRV9GT1JNQVRfU0lURSxcblx0REFURV9USU1FX0ZPUk1BVF9TSVRFLFxuXHRhbGxEYXRlVGltZXNBc1N0cmluZyxcblx0U0VQQVJBVE9SX1NQQUNFX0RBU0hfU1BBQ0UsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL2hlbHBlcnMnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBBcnJheSBvZiBmaWVsZHMgdGhhdCBoYXZlIGRhdGUgaW5mb3JtYXRpb25cbiAqXG4gKiBAdHlwZSB7IHN0cmluZ1tdIH1cbiAqL1xuZXhwb3J0IGNvbnN0IERBVEVfRklFTERTID0gWydEVFRfRVZUX3N0YXJ0JywgJ0RUVF9FVlRfZW5kJ107XG5cbi8qKlxuICogV2lsbCBob2xkIHRoZSBkeW5hbWljYWxseSBnZW5lcmF0ZWQgbGlzdCBvZiBmb3JtYXR0ZXJzIGZvciBkYXRlcy4gIEZvcm1hdHRlcnNcbiAqIGFyZSBmdW5jdGlvbnMgZGVmaW5lZCBpbiBgLi4vYmFzZS1kYXRlLWZvcm1hdHRlcmAgYnV0IHdyYXBwZWQgYnkgZHluYW1pY2FsbHlcbiAqIGdlbmVyYXRlZCBmdW5jdGlvbnMgKGNhbGxhYmxlIHZpYSBzYW1lIG5hbWUpIHRoYXQgYXV0b21hdGljYWxseSByZWNlaXZlIHRoZVxuICogY29ycmVjdCBkYXRlRmllbGRzTWFwIGFyZ3VtZW50LlxuICpcbiAqIEVnLiAgYC4uL2Jhc2UtZGF0ZS1mb3JtYXR0ZXIgaGFzXG4gKiBmb3JtYXREYXRlc09uRW50aXRpZXMoIGVudGl0aWVzLCBlbnRpdHlEYXRlRmllbGRzLCBmb3JtYXQsIGxvY2FsICk7XG4gKiBXaGVuIGltcG9ydGluZyBgZm9ybWF0RGF0ZXNPbkVudGl0aWVzYCBmcm9tIHRoaXMgZmlsZSwgeW91IGNhbiBjYWxsIGl0IHNpbXBseVxuICogYnkgZG9pbmcgdGhpczpcbiAqXG4gKiBmb3JtYXREYXRlc09uRW50aXRpZXMoIGRhdGVUaW1lT2JqZWN0cywgZm9ybWF0LCBsb2NhbCApO1xuICpcbiAqIE5vdGljZSB0aGF0IGl0J3MgY2FsbGVkIHdpdGhvdXQgdGhlIGVudGl0eURhdGVGaWVsZHMgYXJndW1lbnQgYmVjYXVzZSB0aGF0J3NcbiAqIHByb3ZpZGVkIGJ5IHRoaXMgZ2VuZXJhdG9yLlxuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgZm9ybWF0dGVycyA9IHt9O1xuXG5mb3JPd24oYmFzZUZvcm1hdHRlciwgKGltcGxlbWVudGF0aW9uLCBmdW5jdGlvbk5hbWUpID0+IHtcblx0Zm9ybWF0dGVyc1tmdW5jdGlvbk5hbWVdID0gKC4uLmluY29taW5nQXJncykgPT4ge1xuXHRcdGNvbnN0IGZpcnN0QXJnID0gcHVsbEF0KGluY29taW5nQXJncywgMCk7XG5cdFx0cmV0dXJuIGltcGxlbWVudGF0aW9uKGZpcnN0QXJnWzBdLCBEQVRFX0ZJRUxEUywgLi4uaW5jb21pbmdBcmdzKTtcblx0fTtcbn0pO1xuXG4vKipcbiAqIFRoaXMgd2lsbCBzcGl0IG91dCBhIHByZXR0aWZpZWQgbGFiZWwgZm9yIHRoZSBwcm92aWRlZCBEYXRlVGltZSBlbnRpdHkuXG4gKlxuICogSWYgdGhlcmUgaXMgYSBEVFRfbmFtZSwgdGhlIGZvcm1hdCB3aWxsIGJlOlxuICogYERUVF9uYW1lIChEVFRfRVZUX3N0YXJ0IC0gRFRUX0VWVF9lbmQpYFxuICpcbiAqIElmIG5vIERUVF9uYW1lIHRoZW46XG4gKiBgRFRUX0VWVF9zdGFydCAtIERUVF9FVlRfZW5kYFxuICpcbiAqIFRoaXMgd2lsbCBhY2NvdW50IGZvciBpZiBib3RoIHN0YXJ0IGFuZCBlbmQgYXJlIGluIHRoZSBzYW1lIGRheSBhbmQgc2ltcGx5XG4gKiB1c2UgdGltZSBmb3IgdGhlIGVuZCBwYXJ0LlxuICpcbiAqIEBwYXJhbSB7IEJhc2VFbnRpdHkgfSBEYXRlVGltZUVudGl0eVxuICogQHJldHVybiB7IHN0cmluZyB9ICBBIGZvcm1hdHRlZCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBwcm92aWRlZFxuICogICAgRGF0ZVRpbWVFbnRpdHkuXG4gKi9cbmV4cG9ydCBjb25zdCBwcmV0dHlEYXRlRnJvbURhdGVUaW1lID0gKERhdGVUaW1lRW50aXR5KSA9PiB7XG5cdGxldCBjb250ZW50ID0gJyc7XG5cdGlmIChpc01vZGVsRW50aXR5T2ZNb2RlbChEYXRlVGltZUVudGl0eSwgJ2RhdGV0aW1lJykpIHtcblx0XHRpZiAoXG5cdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX3N0YXJ0Lmhhc1NhbWUoXG5cdFx0XHRcdERhdGVUaW1lRW50aXR5LkRUVF9FVlRfZW5kLFxuXHRcdFx0XHQnZGF5J1xuXHRcdFx0KVxuXHRcdCkge1xuXHRcdFx0Y29udGVudCArPSBhbGxEYXRlVGltZXNBc1N0cmluZyhcblx0XHRcdFx0U0VQQVJBVE9SX1NQQUNFX0RBU0hfU1BBQ0UsXG5cdFx0XHRcdERhdGVUaW1lRW50aXR5LkRUVF9FVlRfc3RhcnQudG9Gb3JtYXQoREFURV9USU1FX0ZPUk1BVF9TSVRFKSxcblx0XHRcdFx0RGF0ZVRpbWVFbnRpdHkuRFRUX0VWVF9lbmQudG9Gb3JtYXQoVElNRV9GT1JNQVRfU0lURSlcblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRlbnQgKz0gYWxsRGF0ZVRpbWVzQXNTdHJpbmcoXG5cdFx0XHRcdFNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFLFxuXHRcdFx0XHREYXRlVGltZUVudGl0eS5EVFRfRVZUX3N0YXJ0LnRvRm9ybWF0KERBVEVfVElNRV9GT1JNQVRfU0lURSksXG5cdFx0XHRcdERhdGVUaW1lRW50aXR5LkRUVF9FVlRfZW5kLnRvRm9ybWF0KERBVEVfVElNRV9GT1JNQVRfU0lURSlcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGNvbnRlbnQgPSBEYXRlVGltZUVudGl0eS5EVFRfbmFtZVxuXHRcdFx0PyBgJHtEYXRlVGltZUVudGl0eS5EVFRfbmFtZX0gKCR7Y29udGVudH0pYFxuXHRcdFx0OiBjb250ZW50O1xuXHR9XG5cdHJldHVybiBjb250ZW50O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZm9ybWF0dGVycztcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9mb3JtYXR0ZXInO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7XG5cdGdldFF1ZXJ5U3RyaW5nIGFzIGJhc2VHZXRRdWVyeVN0cmluZyxcblx0UVVFUllfT1JERVJfREVTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG5cdEdSRUFURVJfVEhBTixcblx0R1JFQVRFUl9USEFOX0FORF9FUVVBTCxcblx0TEVTU19USEFOX0FORF9FUVVBTCxcbn0gZnJvbSAnLi4vYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBub3dEYXRlQW5kVGltZSA9IG1vbWVudCgpO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKlxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKFtcblx0XHRcdCdEVFRfbmFtZScsXG5cdFx0XHQnRFRUX0lEJyxcblx0XHRcdCdzdGFydF9kYXRlJyxcblx0XHRcdCdlbmRfZGF0ZScsXG5cdFx0XSksXG5cdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZihBTExPV0VEX09SREVSX1ZBTFVFUyksXG5cdFx0c2hvd0V4cGlyZWQ6IFByb3BUeXBlcy5ib29sLFxuXHRcdG1vbnRoOiBQcm9wVHlwZXMubW9udGgsXG5cdH0pLFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqXG4gKiBAdHlwZSB7XG4gKiBcdHtcbiAqIFx0XHRhdHRyaWJ1dGVzOiB7XG4gKiBcdFx0XHRsaW1pdDogbnVtYmVyLFxuICogXHRcdFx0b3JkZXJCeTogc3RyaW5nLFxuICogXHRcdFx0b3JkZXI6IHN0cmluZyxcbiAqICAgXHRcdHNob3dFeHBpcmVkOiBib29sZWFuXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdzdGFydF9kYXRlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfREVTQyxcblx0XHRzaG93RXhwaXJlZDogZmFsc2UsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKG9yZGVyQnkpID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHRzdGFydF9kYXRlOiAnRFRUX0VWVF9zdGFydCcsXG5cdFx0ZW5kX2RhdGU6ICdEVFRfRVZUX2VuZCcsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZChvcmRlckJ5TWFwW29yZGVyQnldKSA/IG9yZGVyQnkgOiBvcmRlckJ5TWFwW29yZGVyQnldO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gZXZlbnRzIGVuZHBvaW50IHJlcXVlc3QgdXNpbmcgcHJvdmlkZWRcbiAqIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICBJRCBmb3IgRXZlbnQgdG8gcmV0cmlldmUgZGF0ZXRpbWVzIGZyb21cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0V4cGlyZWQgIFdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgZXhwaXJlZCBldmVudHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9udGggICAgICAgICBSZXR1cm4gZXZlbnRzIGZvciB0aGUgZ2l2ZW4gbW9udGguICBDYW4gYmUgYW55XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIGFueSBtb250aCBmb3JtYXQgcmVjb2duaXplZCBieSBtb21lbnQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgIFRoZSBhc3NlbWJsZWQgd2hlcmUgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9ICh7XG5cdGZvckV2ZW50SWQgPSAwLFxuXHRzaG93RXhwaXJlZCA9IGZhbHNlLFxuXHRtb250aCA9ICdub25lJyxcbn0pID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0aWYgKCFzaG93RXhwaXJlZCkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRFRUX0VWVF9lbmQqKmV4cGlyZWRdW109JyArXG5cdFx0XHRcdEdSRUFURVJfVEhBTiArXG5cdFx0XHRcdCcmd2hlcmVbRFRUX0VWVF9lbmQqKmV4cGlyZWRdW109JyArXG5cdFx0XHRcdG5vd0RhdGVBbmRUaW1lLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmIChtb250aCAmJiBtb250aCAhPT0gJ25vbmUnKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtEVFRfRVZUX3N0YXJ0XVtdPScgK1xuXHRcdFx0XHRHUkVBVEVSX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdFx0JyZ3aGVyZVtEVFRfRVZUX3N0YXJ0XVtdPScgK1xuXHRcdFx0XHRtb21lbnQoKS5tb250aChtb250aCkuc3RhcnRPZignbW9udGgnKS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RUVF9FVlRfZW5kXVtdPScgK1xuXHRcdFx0XHRMRVNTX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdFx0JyZ3aGVyZVtEVFRfRVZUX2VuZF1bXT0nICtcblx0XHRcdFx0bW9tZW50KCkubW9udGgobW9udGgpLmVuZE9mKCdtb250aCcpLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGlmIChwYXJzZUludChmb3JFdmVudElkLCAxMCkgIT09IDApIHtcblx0XHR3aGVyZS5wdXNoKCd3aGVyZVtFdmVudC5FVlRfSURdPScgKyBmb3JFdmVudElkKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbignJicpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKHF1ZXJ5RGF0YSA9IHt9KSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5KTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBtYXBWYWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbWVtaXplJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgZW5kcG9pbnRzIH0gZnJvbSAnLi9lbmRwb2ludHMuanMnO1xuXG4vKipcbiAqIFJlY2VpdmVzIGFuIG9iamVjdCBtYXAgb2YgbW9kZWxOYW1lIHRvIGVuZHBvaW50IGFuZCBtYXBzIHRoYXQgdG8gYSBkZWZhdWx0XG4gKiBtYXAgb2YgbW9kZWxOYW1lIHRvIGVtcHR5IG9iamVjdC5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBtb2RlbE5hbWVFbmRwb2ludHNcbiAqIEByZXR1cm4geyBPYmplY3QgfSBBbiBvYmplY3Qgb2YgeyB7IG1vZGVsTmFtZSB9IDoge30gfVxuICovXG5jb25zdCBtYXBUb09iamVjdFZhbHVlcyA9IChtb2RlbE5hbWVFbmRwb2ludHMpID0+IHtcblx0cmV0dXJuIG1hcFZhbHVlcyhtb2RlbE5hbWVFbmRwb2ludHMsIGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge307XG5cdH0pO1xufTtcblxuY29uc3QgZ2V0RGVmYXVsdE1vZGVsRW50aXRpZXNPYmplY3QgPSBtZW1vaXplKCgpID0+XG5cdG1hcFRvT2JqZWN0VmFsdWVzKGVuZHBvaW50cylcbik7XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIGRlZmF1bHQgc3RhdGUgdG8gYmUgdXNlZCBieSBzdG9yZXMgY29udGFpbmluZyBsaXN0cy5cbiAqXG4gKiBAdHlwZSB7IE9iamVjdCB9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xJU1RTX1NUQVRFID0gbWFwVG9PYmplY3RWYWx1ZXMoZW5kcG9pbnRzKTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBzdGF0ZSB0byBiZSB1c2VkIGJ5IHRoZSBjb3JlIHN0b3JlLlxuICpcbiAqIEB0eXBlIHt7ZW50aXRpZXM6IHt9LCBlbnRpdHlJZHM6IHt9LCBkaXJ0eToge319fVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT1JFX1NUQVRFID0ge1xuXHRlbnRpdGllczoge1xuXHRcdC4uLmdldERlZmF1bHRNb2RlbEVudGl0aWVzT2JqZWN0KCksXG5cdH0sXG5cdHJlbGF0aW9uczoge30sXG5cdGRpcnR5OiB7XG5cdFx0cmVsYXRpb25zOiB7XG5cdFx0XHRpbmRleDoge30sXG5cdFx0XHRkZWxldGU6IHt9LFxuXHRcdFx0YWRkOiB7fSxcblx0XHR9LFxuXHRcdHRyYXNoOiB7fSxcblx0XHRkZWxldGU6IHt9LFxuXHR9LFxufTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBzdGF0ZSB0byBiZSB1c2VkIGJ5IHRoZSBzY2hlbWEgc3RvcmUuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0NIRU1BX1NUQVRFID0ge1xuXHRzY2hlbWE6IHtcblx0XHQuLi5nZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCgpLFxuXHR9LFxuXHRmYWN0b3J5OiB7XG5cdFx0Li4uZ2V0RGVmYXVsdE1vZGVsRW50aXRpZXNPYmplY3QoKSxcblx0fSxcblx0cmVsYXRpb25FbmRwb2ludHM6IHtcblx0XHQuLi5nZXREZWZhdWx0TW9kZWxFbnRpdGllc09iamVjdCgpLFxuXHR9LFxuXHRyZWxhdGlvblNjaGVtYToge30sXG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGRhdGEgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGFzc2VydEVudGl0eUhhc0tleSB9IGZyb20gJy4vYXNzZXJ0aW9ucyc7XG5cbi8qKlxuICogQWxsIGF2YWlsYWJsZSBlbmRwb2ludHMgZXhwb3NlZCB2aWEgdGhlIGVlanMuZGF0YSBnbG9iYWwgZnJvbSB0aGUgc2VydmVyLlxuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0IGNvbnN0IHtcblx0Y29sbGVjdGlvbl9lbmRwb2ludHM6IGVuZHBvaW50cyA9IHt9LFxuXHRiYXNlX3Jlc3Rfcm91dGU6IGJhc2VSZXN0Um91dGUsXG59ID0gZGF0YS5wYXRocztcblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGVuZHBvaW50IGZvciB0aGUgcHJvdmlkZWQgbW9kZWwuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgV2hhdCBtb2RlbCB0byByZXRyaWV2ZSB0aGUgZW5kcG9pbnQgZm9yLlxuICogQHJldHVybiB7c3RyaW5nfSAgVGhlIGVuZHBvaW50IGZvciB0aGUgcHJvdmlkZWQgbW9kZWwuXG4gKiBAdGhyb3dzIHtFeGNlcHRpb259XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRFbmRwb2ludCA9IChtb2RlbE5hbWUpID0+IHtcblx0YXNzZXJ0RW50aXR5SGFzS2V5KG1vZGVsTmFtZSwgZW5kcG9pbnRzKTtcblx0cmV0dXJuIGVuZHBvaW50c1ttb2RlbE5hbWVdO1xufTtcblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBwcm92aWRlZCBxdWVyeVN0cmluZyB0byB0aGUgZW5kcG9pbnQgZm9yIHRoZSBwcm92aWRlZCBtb2RlbCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFdoYXQgbW9kZWwgdGhlIGZpbmFsIHN0cmluZyBpcyBmb3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlTdHJpbmcgIFRoZSBxdWVyeSBiZWluZyBhcHBlbmRlZCB0byB0aGUgZW5kcG9pbnQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmaW5hbCBhc3NlbWJsZWQgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgYXBwbHlRdWVyeVN0cmluZyA9IChtb2RlbE5hbWUsIHF1ZXJ5U3RyaW5nID0gJycpID0+IHtcblx0cmV0dXJuIHF1ZXJ5U3RyaW5nICE9PSAnJ1xuXHRcdD8gZ2V0RW5kcG9pbnQobW9kZWxOYW1lKSArICc/JyArIHF1ZXJ5U3RyaW5nXG5cdFx0OiBnZXRFbmRwb2ludChtb2RlbE5hbWUpO1xufTtcblxuLyoqXG4gKiBTdHJpcHMgdGhlIGJhc2VfcmVzdF9yb3V0ZSAoaS5lLiBodHRwczovL215dXJsLmNvbS93cC1qc29uLykgZnJvbSB0aGUgcHJvdmlkZWRcbiAqIHVybCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgdXJsIHdpdGggdGhlIGJhc2UgcmVzdCByb3V0ZSByZW1vdmVkLlxuICovXG5leHBvcnQgY29uc3Qgc3RyaXBCYXNlUm91dGVGcm9tVXJsID0gKHVybCkgPT4ge1xuXHRyZXR1cm4gdXJsLnJlcGxhY2UoYmFzZVJlc3RSb3V0ZSwgJycpO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBzcHJpbnRmIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBJbnZhbGlkU2NoZW1hIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgeyBpc1NjaGVtYSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHtcblx0TW9uZXksXG5cdFNlcnZlckRhdGVUaW1lIGFzIERhdGVUaW1lLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWx1ZS1vYmplY3RzJztcbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0RhdGVUaW1lRmllbGQsIGlzTW9uZXlGaWVsZCB9IGZyb20gJy4vYm9vbGVhbnMnO1xuaW1wb3J0IHtcblx0aXNTaGFsbG93VmFsaWRWYWx1ZUZvckZpZWxkLFxuXHR2YWxpZGF0ZUVudW1UeXBlLFxuXHR2YWxpZGF0ZVR5cGUsXG5cdHZhbGlkYXRlVHlwZUZvckZpZWxkLFxufSBmcm9tICcuL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMgfSBmcm9tICcuL2V4dHJhY3RvcnMnO1xuXG4vKipcbiAqIEFzc2VydHMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgdmFsdWUgaXMgYSBrbm93biB2YWx1ZSBvYmplY3QuXG4gKlxuICogTm90ZTogdGhpcyBvbmx5IGFzc2VydHMga25vd24gdmFsdWUgb2JqZWN0cywgaWYgdGhlIHZhbHVlIGlzIG5vdCBkZXRlY3RlZCBhc1xuICogYSBrbm93biB2YWx1ZSBvYmplY3QgaXQgaXMgcGFzc2VkIGJhY2sgYXMgaXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAdGhyb3dzIEludmFsaWREYXRlVGltZVxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IG1heWJlQXNzZXJ0VmFsdWVPYmplY3QgPSAoZmllbGROYW1lLCBmaWVsZFZhbHVlLCBzY2hlbWEpID0+IHtcblx0aWYgKGlzRGF0ZVRpbWVGaWVsZChmaWVsZE5hbWUsIHNjaGVtYSkpIHtcblx0XHREYXRlVGltZS5hc3NlcnRJc0RhdGVUaW1lKGZpZWxkVmFsdWUpO1xuXHR9XG5cdGlmIChpc01vbmV5RmllbGQoZmllbGROYW1lLCBzY2hlbWEpKSB7XG5cdFx0TW9uZXkuYXNzZXJ0TW9uZXkoZmllbGRWYWx1ZSk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB3aGV0aGVyIHRoZSBwcm92aWRlZCBvYmplY3QgaXMgYSB2YWxpZCBtb2RlbCBzY2hlbWEgb2JqZWN0LlxuICpcbiAqIEN1cnJlbnRseSwgYW4gb2JqZWN0IGlzIGNvbnNpZGVyZWQgYSB2YWxpZCBtb2RlbCBzY2hlbWEgaWYgaXQgaGFzIGFcbiAqICdwcm9wZXJ0aWVzJyBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0geyp9IHNjaGVtYVxuICogQHRocm93cyBJbnZhbGlkU2NoZW1hXG4gKi9cbmV4cG9ydCBjb25zdCBhc3NlcnRWYWxpZFNjaGVtYSA9IChzY2hlbWEpID0+IHtcblx0aWYgKCFpc1NjaGVtYShzY2hlbWEpKSB7XG5cdFx0dGhyb3cgbmV3IEludmFsaWRTY2hlbWEoJ1RoaXMgaXMgYW4gaW52YWxpZCBzY2hlbWEgZm9yIGEgbW9kZWwuJyk7XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB0aGF0IHRoZSBnaXZlbiBmaWVsZCBleGlzdHMgaW4gdGhlIHByb3ZpZGVkIHNjaGVtYSBhbmQgdGhlIHNoYXBlIGZvclxuICogdGhlIHNjaGVtYSBlbnRyeSBvbiB0aGF0IGZpZWxkIGlzIGV4cGVjdGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFRoZSBtb2RlbCB0aGUgc2NoZW1hIGJlbG9uZ3MgdG8sIHRoaXMgaXMgdXNlZCBmb3JcbiAqIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZSAgVGhlIGZpZWxkIGJlaW5nIGNoZWNrZWQgYWdhaW5zdCB0aGUgc2NoZW1hXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hICAgICBUaGUgc2NoZW1hIGZvciB0aGUgbW9kZWwgdXNlZCBmb3IgdmFsaWRhdGlvblxuICogQHRocm93cyBJbnZhbGlkU2NoZW1hXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0VmFsaWRTY2hlbWFGaWVsZFByb3BlcnRpZXMgPSAoXG5cdG1vZGVsTmFtZSxcblx0ZmllbGROYW1lLFxuXHRzY2hlbWFcbikgPT4ge1xuXHRpZiAoaXNVbmRlZmluZWQoc2NoZW1hW2ZpZWxkTmFtZV0pKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdHNwcmludGYoXG5cdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlc1wiIGZpZWxkTmFtZSBkb2VzIG5vdCBoYXZlIGEgZGVmaW5lZCBzY2hlbWEgZm9yIHRoZSBtb2RlbCBcIiVzXCInLFxuXHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdG1vZGVsTmFtZVxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblx0aWYgKHNjaGVtYVtmaWVsZE5hbWVdLnR5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0aWYgKGlzVW5kZWZpbmVkKHNjaGVtYVtmaWVsZE5hbWVdLnByb3BlcnRpZXMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFNjaGVtYShcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIHNjaGVtYSBmb3IgdGhlIGZpZWxkICVzIG9uIHRoZSBtb2RlbCAlcyBpcyBvZiB0eXBlIFwib2JqZWN0XCIgYnV0IGRvZXMgbm90IGhhdmUgYSBwcm9wZXJ0aWVzIHByb3BlcnR5LicsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdG1vZGVsTmFtZVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoaXNVbmRlZmluZWQoc2NoZW1hW2ZpZWxkTmFtZV0ucHJvcGVydGllcy5yYXcpKSB7XG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFNjaGVtYShcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIHNjaGVtYSBmb3IgdGhlIGZpZWxkICVzIG9uIHRoZSBtb2RlbCAlcyBpcyBvZiB0eXBlIFwib2JqZWN0XCIgYnV0IGRvZXMgbm90IGhhdmUgYSByYXcgcHJvcGVydHkgaW4gaXRcXCdzIFwicHJvcGVydGllc1wiIHByb3BlcnR5LicsXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdG1vZGVsTmFtZVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoaXNVbmRlZmluZWQoc2NoZW1hW2ZpZWxkTmFtZV0ucHJvcGVydGllcy5yYXcudHlwZSkpIHtcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkU2NoZW1hKFxuXHRcdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHRcdCdUaGUgc2NoZW1hIGZvciB0aGUgZmllbGQgJXMgb24gdGhlIG1vZGVsICVzIGlzIG9mIHR5cGUgXCJvYmplY3RcIiBhbmQgaGFzIGEgcHJvcGVydGllcy5yYXcgcHJvcGVydHksIGhvd2V2ZXIgdGhlcmUgaXMgbm8gXCJ0eXBlXCIgZGVmaW5lZCBmb3IgdGhlIHJhdyBwcm9wZXJ0eS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRtb2RlbE5hbWVcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdH1cbn07XG5cbi8qKlxuICogQXNzZXJ0cyB0aGF0IHRoZSB2YWx1ZSBwcm92aWRlZCBmb3IgdGhlIHByZXBhcmVkIGZpZWxkIGlzIHZhbGlkIGFjY29yZGluZyB0b1xuICogdGhlIHNjaGVtYS5cbiAqXG4gKiBQcmVwYXJlZCBmaWVsZHMgYXJlOlxuICpcbiAqIC0gZmllbGRzIGhhdmluZyB2YWx1ZXMgdGhhdCBhcmUgc2V0IGFzIGEgdmFsdWUgb2JqZWN0IGFuZCBleHBlY3QgYSB2YWx1ZVxuICogICBvYmplY3Qgb24gdXBkYXRlcy9pbnNlcnRzLlxuICogLSBmaWVsZHMgdGhhdCBhcmUgdGhlIGVxdWl2YWxlbnQgYHJhd2AgdmFsdWUgd2hlbiB0aGUgZmllbGQgaW4gdGhlIHNjaGVtYSBpc1xuICogICBkZWZpbmVkIHRvIGhhdmUgcmF3IGFuZCByZW5kZXJlZC9wcmV0dHkgdmFsdWVzLlxuICpcbiAqIE5vdGU6ICBUaGlzIHZhbGlkYXRlcyBhZ2FpbnN0IHByZXBhcmVkIGZpZWxkcyB3aGljaCBtZWFucyB0aGF0OlxuICpcbiAqIC0gaWYgdGhlIHByZXBhcmVkIGZpZWxkIGhhcyBhIHZhbHVlIG9iamVjdCBhcyBpdHMgdmFsdWUsIHRoZW4gdGhhdCB2YWx1ZVxuICogICBvYmplY3QgaXMgdmFsaWRhdGVkIGJlZm9yZSBhbnkgb3RoZXIgdmFsaWRhdGlvbi5cbiAqIC0gaWYgdGhlIHByZXBhcmVkIGZpZWxkIHJlcHJlc2VudHMgYW4gb2JqZWN0IGluIHRoZSBzY2hlbWEsIHRoZW4gaXRzIHZhbHVlIGlzXG4gKiAgIHZhbGlkYXRlZCBhZ2FpbnN0IHRoZSBgcmF3YCB0eXBlIGluIHRoZSBzY2hlbWEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEB0aHJvd3MgVHlwZUVycm9yXG4gKiBAdGhyb3dzIEludmFsaWREYXRlVGltZVxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0VmFsaWRWYWx1ZUZvclByZXBhcmVkRmllbGQgPSAoXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0aW5zdGFuY2VcbikgPT4ge1xuXHRjb25zdCB7IHNjaGVtYSB9ID0gaW5zdGFuY2U7XG5cdGxldCBpc1ZhbGlkID0gaXNTaGFsbG93VmFsaWRWYWx1ZUZvckZpZWxkKGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgc2NoZW1hKTtcblx0aWYgKFxuXHRcdCFpc1ZhbGlkICYmXG5cdFx0c2NoZW1hW2ZpZWxkTmFtZV0udHlwZSA9PT0gJ29iamVjdCcgJiZcblx0XHRzY2hlbWFbZmllbGROYW1lXS5wcm9wZXJ0aWVzXG5cdCkge1xuXHRcdGlzVmFsaWQgPSBzY2hlbWFbZmllbGROYW1lXS5wcm9wZXJ0aWVzLnJhdy5lbnVtXG5cdFx0XHQ/IHZhbGlkYXRlRW51bVR5cGUoXG5cdFx0XHRcdFx0c2NoZW1hW2ZpZWxkTmFtZV0ucHJvcGVydGllcy5yYXcudHlwZSxcblx0XHRcdFx0XHRzY2hlbWFbZmllbGROYW1lXS5wcm9wZXJ0aWVzLnJhdy5lbnVtLFxuXHRcdFx0XHRcdGZpZWxkVmFsdWVcblx0XHRcdCAgKVxuXHRcdFx0OiB2YWxpZGF0ZVR5cGUoXG5cdFx0XHRcdFx0c2NoZW1hW2ZpZWxkTmFtZV0ucHJvcGVydGllcy5yYXcudHlwZSxcblx0XHRcdFx0XHRtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3RXaXRoQXNzZXJ0aW9ucyhcblx0XHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdFx0XHRzY2hlbWFcblx0XHRcdFx0XHQpXG5cdFx0XHQgICk7XG5cdFx0aWYgKCFpc1ZhbGlkKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlMSRzXCIgZmllbGQgIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hLiAgSXRcXCdzIGByYXdgIHByb3BlcnR5IFZhbHVlICglMiRzKSBpcyBub3QgdGhlIGNvcnJlY3QgZXhwZWN0ZWQgdHlwZSAoJTMkcykuJyxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRzY2hlbWFbZmllbGROYW1lXS5wcm9wZXJ0aWVzLnJhdy50eXBlXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cdGlmICghaXNWYWxpZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHQnVGhlIGdpdmVuIFwiJTEkc1wiIGZpZWxkXFwncyBWYWx1ZSAoJTIkcykgaXMgbm90IHZhbGlkIGZvciB0aGUgZGVmaW5lZCBzY2hlbWEgdHlwZSAoJTMkcykuJyxcblx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRzY2hlbWFbZmllbGROYW1lXS50eXBlXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBBc3NlcnRzIHdoZXRoZXIgdGhlIHZhbHVlIGZvciB0aGUgZ2l2ZW4gZmllbGQgaXMgdmFsaWQgYWNjb3JkaW5nIHRvIHRoZVxuICogc2NoZW1hLlxuICpcbiAqIFRoaXMgaXMgdXNlZCBvbiBlbnRpdHkgY29uc3RydWN0aW9uIGFuZCBkb2VzIG5vdCB2YWxpZGF0ZSBwcmVwYXJlZCBmaWVsZFxuICogdmFsdWVzIChzZWUgYXNzZXJ0IGFzc2VydFZhbGlkVmFsdWVGb3JQcmVwYXJlZEZpZWxkKS5cbiAqXG4gKiBUaGlzIG1ldGhvZCBhbHNvIGFzc2VydHMgdGhhdCB0aGUgc2NoZW1hIGhhcyB2YWxpZCBzY2hlbWEgZmllbGQgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHRocm93cyBUeXBlRXJyb3JcbiAqIEB0aHJvd3MgSW52YWxpZFNjaGVtYVxuICovXG5leHBvcnQgY29uc3QgYXNzZXJ0VmFsaWRGaWVsZEFuZFZhbHVlQWdhaW5zdFNjaGVtYSA9IChcblx0bW9kZWxOYW1lLFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdGluc3RhbmNlXG4pID0+IHtcblx0Y29uc3Qgc2NoZW1hID0gaW5zdGFuY2Uuc2NoZW1hO1xuXHRjb25zdCB2YWxpZGF0aW9uVHlwZSA9IHZhbGlkYXRlVHlwZUZvckZpZWxkKGZpZWxkTmFtZSwgaW5zdGFuY2UpO1xuXHRhc3NlcnRWYWxpZFNjaGVtYUZpZWxkUHJvcGVydGllcyhtb2RlbE5hbWUsIGZpZWxkTmFtZSwgc2NoZW1hKTtcblx0bGV0IGlzVmFsaWQgPSBpc1NoYWxsb3dWYWxpZFZhbHVlRm9yRmllbGQoXG5cdFx0ZmllbGROYW1lLFxuXHRcdGZpZWxkVmFsdWUsXG5cdFx0c2NoZW1hLFxuXHRcdGZhbHNlXG5cdCk7XG5cdC8vIGFjY291bnQgZm9yIGZpZWxkTmFtZSBmaWVsZFZhbHVlcyB0aGF0IGhhdmUgcHJvcGVydHkgc2NoZW1hLiBGb3IgTW9kZWxcblx0Ly8gRW50aXRpZXMsIG9ubHkgdGhlIFZBTElEQVRFX1RZUEUgcHJvcGVydHkgaXMgY2FyZWQgYWJvdXQuXG5cdGlmIChzY2hlbWFbZmllbGROYW1lXS50eXBlID09PSAnb2JqZWN0JyAmJiBzY2hlbWFbZmllbGROYW1lXS5wcm9wZXJ0aWVzKSB7XG5cdFx0aWYgKGlzVW5kZWZpbmVkKGZpZWxkVmFsdWVbdmFsaWRhdGlvblR5cGVdKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0c3ByaW50Zihcblx0XHRcdFx0XHQnVGhlIGdpdmVuIFwiJTEkc1wiIHZhbHVlIGlzIG5vdCB2YWxpZCBmb3IgdGhlIGRlZmluZWQgc2NoZW1hLiBJdCBtdXN0IGJlIGFuIG9iamVjdCBhbmQgaXQgbXVzdCBoYXZlIGEgYCUyJHNgIGtleS4nLFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHR2YWxpZGF0aW9uVHlwZVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpc1ZhbGlkID0gc2NoZW1hW2ZpZWxkTmFtZV0ucHJvcGVydGllc1t2YWxpZGF0aW9uVHlwZV0uZW51bVxuXHRcdFx0PyB2YWxpZGF0ZUVudW1UeXBlKFxuXHRcdFx0XHRcdHNjaGVtYVtmaWVsZE5hbWVdLnByb3BlcnRpZXNbdmFsaWRhdGlvblR5cGVdLnR5cGUsXG5cdFx0XHRcdFx0c2NoZW1hW2ZpZWxkTmFtZV0ucHJvcGVydGllcy5yYXcuZW51bSxcblx0XHRcdFx0XHRmaWVsZFZhbHVlW3ZhbGlkYXRpb25UeXBlXVxuXHRcdFx0ICApXG5cdFx0XHQ6IHZhbGlkYXRlVHlwZShcblx0XHRcdFx0XHRzY2hlbWFbZmllbGROYW1lXS5wcm9wZXJ0aWVzW3ZhbGlkYXRpb25UeXBlXS50eXBlLFxuXHRcdFx0XHRcdGZpZWxkVmFsdWVbdmFsaWRhdGlvblR5cGVdXG5cdFx0XHQgICk7XG5cdFx0aWYgKCFpc1ZhbGlkKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlMSRzXCIgdmFsdWUgaXMgbm90IHZhbGlkIGZvciB0aGUgZGVmaW5lZCBzY2hlbWEuICBJdFxcJ3MgYCUyJHNgIHByb3BlcnR5IHZhbHVlICglMyRzKSBpcyBub3QgdGhlIGNvcnJlY3QgZXhwZWN0ZWQgdHlwZSAoJTQkcykuJyxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0dmFsaWRhdGlvblR5cGUsXG5cdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRzY2hlbWFbZmllbGROYW1lXS5wcm9wZXJ0aWVzW3ZhbGlkYXRpb25UeXBlXS50eXBlXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cdGlmICghaXNWYWxpZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRzcHJpbnRmKFxuXHRcdFx0XHQnVGhlIGdpdmVuIFwiJTEkc1wiIGZpZWxkXFwncyB2YWx1ZSAoJTIkcykgaXMgbm90IHZhbGlkIGZvciB0aGUgZGVmaW5lZCBzY2hlbWEgdHlwZSAoJTMkcykuJyxcblx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRzY2hlbWFbZmllbGROYW1lXS50eXBlXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0FycmF5LCB1cHBlckZpcnN0LCBjYW1lbENhc2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbWVtaXplJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGFzc2VydFZhbGlkU2NoZW1hIH0gZnJvbSAnLi9hc3NlcnRpb25zJztcbmltcG9ydCB7XG5cdGNyZWF0ZUdldHRlcixcblx0Y3JlYXRlRW50aXR5R2V0dGVyc0FuZFNldHRlcnMsXG5cdGNyZWF0ZVBlcnNpc3RpbmdHZXR0ZXJzQW5kU2V0dGVycyxcblx0c2V0U2F2ZVN0YXRlLFxufSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgeyBTQVZFX1NUQVRFLCBQUklWQVRFX1BST1BFUlRJRVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQmFzZUVudGl0eSBpcyB0aGUgYmFzaWMgY2xhc3MgZm9yIGFsbCBlbnRpdGllcy4gIGNyZWF0ZUVudGl0eUZhY3RvcnkgcmV0dXJuc1xuICogYW4gaW5zdGFuY2Ugb2YgdGhpcyBhbmQgYWxsIHRoZSBnZXR0ZXJzL3NldHRlcnMgZm9yIGZpZWxkcyBldGMgYXJlXG4gKiBkeW5hbWljYWxseSBjcmVhdGVkIHZpYSB0aGUgY29uc3RydWN0b3IuXG4gKi9cbmNsYXNzIEJhc2VFbnRpdHkge1xuXHRbUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEVdID0gU0FWRV9TVEFURS5DTEVBTjtcblx0W1BSSVZBVEVfUFJPUEVSVElFUy5WQUxJREFURV9UWVBFU10gPSB7fTtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3IgZm9yIEJhc2UgRW50aXR5XG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcblx0ICogQHBhcmFtIHtPYmplY3R9IGVudGl0eUZpZWxkc0FuZFZhbHVlc1xuXHQgKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG5cdCAqIEBwYXJhbSB7QXJyYXl9ZmllbGRQcmVmaXhlc1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGlzTmV3XG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRtb2RlbE5hbWUsXG5cdFx0ZW50aXR5RmllbGRzQW5kVmFsdWVzLFxuXHRcdHNjaGVtYSxcblx0XHRmaWVsZFByZWZpeGVzID0gW10sXG5cdFx0aXNOZXcgPSBmYWxzZVxuXHQpIHtcblx0XHRhc3NlcnRWYWxpZFNjaGVtYShzY2hlbWEpO1xuXHRcdGZpZWxkUHJlZml4ZXMgPSBpc0FycmF5KGZpZWxkUHJlZml4ZXMpID8gZmllbGRQcmVmaXhlcyA6IFtdO1xuXHRcdGNyZWF0ZUdldHRlcih0aGlzLCAnZmllbGRQcmVmaXhlcycsIGZpZWxkUHJlZml4ZXMpO1xuXHRcdGNyZWF0ZUdldHRlcih0aGlzLCAnc2NoZW1hJywgc2NoZW1hLnByb3BlcnRpZXMpO1xuXHRcdHNldFNhdmVTdGF0ZSh0aGlzLCBpc05ldyA/IFNBVkVfU1RBVEUuTkVXIDogU0FWRV9TVEFURS5DTEVBTik7XG5cdFx0Y3JlYXRlR2V0dGVyKHRoaXMsICdtb2RlbE5hbWUnLCBtb2RlbE5hbWUpO1xuXHRcdGNyZWF0ZUdldHRlcih0aGlzLCAnb3JpZ2luYWxGaWVsZHNBbmRWYWx1ZXMnLCBlbnRpdHlGaWVsZHNBbmRWYWx1ZXMpO1xuXHRcdGNyZWF0ZUdldHRlcihcblx0XHRcdHRoaXMsXG5cdFx0XHQnZmllbGRzVG9QZXJzaXN0T25JbnNlcnQnLFxuXHRcdFx0bmV3IFNldChPYmplY3Qua2V5cyhlbnRpdHlGaWVsZHNBbmRWYWx1ZXMpKVxuXHRcdCk7XG5cdFx0Y3JlYXRlRW50aXR5R2V0dGVyc0FuZFNldHRlcnModGhpcyk7XG5cdFx0Y3JlYXRlUGVyc2lzdGluZ0dldHRlcnNBbmRTZXR0ZXJzKHRoaXMpO1xuXHRcdE9iamVjdC5zZWFsKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBvbiB0aGUgZW50aXR5LlxuXHQgKlxuXHQgKiBTYXZlIHN0YXRlIGRlc2NyaWJlcyB3aGV0aGVyIHRoZSBlbnRpdHkgaXM6XG5cdCAqXG5cdCAqIC0gU0FWRV9TVEFURS5ORVc6IFRoZSBlbnRpdHkgaGFzIG5ldmVyIGJlZW4gcGVyc2lzdGVkIHRvIHN0b3JhZ2UuXG5cdCAqIC0gU0FWRV9TVEFURS5DTEVBTjogVGhlIGVudGl0eSBleGlzdHMgaW4gc3RvcmFnZSBhbmQgaGFzIG5vdCBiZWVuIG11dGF0ZWQuXG5cdCAqIC0gU0FWRV9TVEFURS5ESVJUWTogVGhlIGVudGl0eSBpcyBtdXRhdGVkIGFuZCBjaGFuZ2VzIGhhdmUgbm90IGJlZW5cblx0ICogcGVyc2lzdGVkIHRvIHN0b3JhZ2UuXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N5bWJvbH0gIFJldHVybnMgdGhlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBmb3IgdGhlIGVudGl0eS5cblx0ICovXG5cdGdldCBzYXZlU3RhdGUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbUFJJVkFURV9QUk9QRVJUSUVTLlNBVkVfU1RBVEVdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBpcyBTQVZFX1NUQVRFLk5FV1xuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyBTQVZFX1NUQVRFLk5FVyBpcyB0aGUgc2F2ZSBzdGF0ZS5cblx0ICovXG5cdGdldCBpc05ldygpIHtcblx0XHRyZXR1cm4gdGhpcy5zYXZlU3RhdGUgPT09IFNBVkVfU1RBVEUuTkVXO1xuXHR9XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgdGhlIGN1cnJlbnQgc2F2ZSBzdGF0ZSBpcyBTQVZFX1NUQVRFLkRJUlRZXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIFNBVkVfU1RBVEUuRElSVFkgaXMgdGhlIHNhdmUgc3RhdGUuXG5cdCAqL1xuXHRnZXQgaXNEaXJ0eSgpIHtcblx0XHRyZXR1cm4gdGhpcy5zYXZlU3RhdGUgPT09IFNBVkVfU1RBVEUuRElSVFk7XG5cdH1cblxuXHQvKipcblx0ICogV2hldGhlciB0aGUgY3VycmVudCBzYXZlIHN0YXRlIGlzIFNBVkVfU1RBVEUuQ0xFQU5cblx0ICpcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgU0FWRV9TVEFURS5DTEVBTiBpcyB0aGUgc2F2ZSBzdGF0ZS5cblx0ICovXG5cdGdldCBpc0NsZWFuKCkge1xuXHRcdHJldHVybiB0aGlzLnNhdmVTdGF0ZSA9PT0gU0FWRV9TVEFURS5DTEVBTjtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBlbnRpdHkgaGFzIGFueSBwYXNzd29yZCBwcm90ZWN0ZWQgZmllbGRzLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIGl0IGRvZXMsIGZhbHNlIG1lYW5zIGl0IGRvZXNuJ3QuXG5cdCAqL1xuXHRnZXQgaXNQYXNzd29yZFByb3RlY3RlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5wcm90ZWN0ZWRGaWVsZHMubGVuZ3RoID4gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIHRoZSBnaXZlbiBmaWVsZE5hbWUgaXMgYSBwYXNzd29yZCBwcm90ZWN0ZWQgZmllbGQuXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Z1bmN0aW9uKHN0cmluZyk6IGJvb2xlYW59ICBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZFxuXHQgKiB0byBjaGVjayBpZiB0aGUgZ2l2ZW4gZmllbGQgbmFtZSBpcyBhIHByb3RlY3RlZCBmaWVsZCBpbiB0aGlzIGVudGl0eS5cblx0ICovXG5cdGdldCBpc0ZpZWxkUGFzc3dvcmRQcm90ZWN0ZWQoKSB7XG5cdFx0cmV0dXJuIChmaWVsZE5hbWUpID0+IHRoaXMucHJvdGVjdGVkRmllbGRzLmluZGV4T2YoZmllbGROYW1lKSA+IC0xO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVzZWQgdG8gY2xvbmUgdGhlIGN1cnJlbnQgZW50aXR5IG9iamVjdC4gIFRoaXMgcmVzdWx0cyBpbiBhbiBpbnN0YW5jZSBvZlxuXHQgKiBCYXNlRW50aXR5IHRoYXQgaXMgZXF1aXZhbGVudCBhcyB0aGlzIGN1cnJlbnQgaW5zdGFuY2UgKGV4Y2VwdCBpdCB3aWxsXG5cdCAqIGhhdmUgYSBuZXcgZ2VuZXJhdGVkIGlkKS5cblx0ICpcblx0ICogQHJldHVybiB7QmFzZUVudGl0eX0gQSBuZXcgaW5zdGFuY2Ugb2YgQmFzZUVudGl0eVxuXHQgKi9cblx0Z2V0IGNsb25lKCkge1xuXHRcdHJldHVybiAoa2VlcElkID0gZmFsc2UpID0+IHtcblx0XHRcdGNvbnN0IGNyZWF0ZUZhY3RvcnkgPSBtZW1vaXplKCgpID0+XG5cdFx0XHRcdGNyZWF0ZUVudGl0eUZhY3RvcnkoXG5cdFx0XHRcdFx0dGhpcy5tb2RlbE5hbWUsXG5cdFx0XHRcdFx0eyAkc2NoZW1hOiB7fSwgcHJvcGVydGllczogdGhpcy5zY2hlbWEgfSxcblx0XHRcdFx0XHR0aGlzLmZpZWxkUHJlZml4ZXNcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IGZhY3RvcnkgPSBjcmVhdGVGYWN0b3J5KCk7XG5cdFx0XHRjb25zdCBuZXdFbnRpdHkgPSBmYWN0b3J5LmNyZWF0ZU5ldyh0aGlzLmZvckNsb25lKTtcblx0XHRcdGlmIChrZWVwSWQpIHtcblx0XHRcdFx0bmV3RW50aXR5LmlkID0gdGhpcy5pZDtcblx0XHRcdFx0c2V0U2F2ZVN0YXRlKG5ld0VudGl0eSwgdGhpcy5zYXZlU3RhdGUsIHRydWUpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5ld0VudGl0eTtcblx0XHR9O1xuXHR9XG5cblx0c3RhdGljIG5hbWUgPSAnQmFzZUVudGl0eSc7XG59XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IGdpdmVzIGEgY2xhc3MgdGhlIHByb3ZpZGVkIG5hbWVcbiAqIChhbmQgb3B0aW9uYWxseSBleHRlbmRzIHRoZSBwcm92aWRlZCBvYmplY3QpLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5kZWRDbGFzc1xuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb25cbiAqL1xuY29uc3QgbmFtZUNsYXNzID0gKG5hbWUsIGV4dGVuZGVkQ2xhc3MpID0+IHtcblx0cmV0dXJuIGNsYXNzIGV4dGVuZHMgZXh0ZW5kZWRDbGFzcyB7XG5cdFx0c3RhdGljIGdldCBuYW1lKCkge1xuXHRcdFx0cmV0dXJuIG5hbWU7XG5cdFx0fVxuXHR9O1xufTtcblxuLyoqXG4gKiBBIGZhY3RvcnkgZm9yIGVudGl0eSBmYWN0b3JpZXMuXG4gKlxuICogQ2FsbGluZyB0aGlzIHJldHVybnMgYW4gb2JqZWN0IG9mIGZhY3RvcnkgZnVuY3Rpb25zIHRoYXQgaW5zdGFudGlhdGUgYW5cbiAqIGluc3RhbmNlIG9mIGEgbmFtZWQgRW50aXR5LiAgVGhlIG1vZGVsTmFtZSBpcyB1c2VkIGFzIHRoZSBuYW1lIGZvciB0aGUgbmV3XG4gKiBlbnRpdHkuXG4gKlxuICogVHdvIG1ldGhvZHMgYXJlIGF2YWlsYWJsZSBvbiB0aGUgb2JqZWN0IHJldHVybmVkOiBgY3JlYXRlTmV3YCBhbmRcbiAqIGBmcm9tRXhpc3RpbmdgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFRoZSBtb2RlbCBmb3IgdGhlIGVudGl0eVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYSAgICAgVGhlIHNjaGVtYSBmb3IgdGhlIG1vZGVsLiBUaGlzIGlzIHRoZSBzY2hlbWFcbiAqIHByb3ZpZGVkIGJ5IHRoZSBPUFRJT05TIGVuZHBvaW50IGZvciB0aGUgbW9kZWwuXG4gKiBAcGFyYW0ge0FycmF5fSBmaWVsZFByZWZpeGVzIEFuIGFycmF5IG9mIGZpZWxkIHByZWZpeGVzIGZvciBiYXNlIGZpZWxkcyBvblxuICogb24gdGhlIG1vZGVsIChlZy4gRXZlbnQgbW9kZWwgaGFzIGBbIEVWVCBdYCBwcmVmaXhlcyBvbiBmaWVsZHMsIERhdGV0aW1lIG1vZGVsXG4gKiBoYXMgWyBgRFRUYCwgYERUVF9FVlRgIF1cbiAqIEByZXR1cm4ge09iamVjdH0gQSBmYWN0b3J5IGZvciBpbnN0YW50aWF0aW5nIGFuIGVudGl0eSBpbnN0YW5jZS5cbiAqL1xuY29uc3QgY3JlYXRlRW50aXR5RmFjdG9yeSA9IChtb2RlbE5hbWUsIHNjaGVtYSwgZmllbGRQcmVmaXhlcyA9IFtdKSA9PiB7XG5cdGNvbnN0IEVudGl0eSA9IG5hbWVDbGFzcyh1cHBlckZpcnN0KGNhbWVsQ2FzZShtb2RlbE5hbWUpKSwgQmFzZUVudGl0eSk7XG5cdHJldHVybiB7XG5cdFx0LyoqXG5cdFx0ICogRXhwb3NlcyBtb2RlbE5hbWUgc28gY2xpZW50IGNvZGUgY2FuIGRlcml2ZSB3aGF0IG1vZGVsIHRoaXMgZmFjdG9yeVxuXHRcdCAqIGlzIGZvciBmcm9tIGFueSBnaXZlbiBmYWN0b3J5LlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgc3RyaW5nXG5cdFx0ICovXG5cdFx0bW9kZWxOYW1lLFxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgdGhlIGNsYXNzIGRlZmluaXRpb24gZm9yIHRoZSBFbnRpdHkuICBUeXBpY2FsbHkgdGhpcyBpc1xuXHRcdCAqIHJldHJpZXZlZCBmb3IgdGhlIGFiaWxpdHkgdG8gZG8gaW5zdGFuY2VvZiBjaGVja3MuXG5cdFx0ICovXG5cdFx0Y2xhc3NEZWY6IEVudGl0eSxcblx0XHQvKipcblx0XHQgKiBUaGlzIHJldHVybnMgYW4gaW5zdGFuY2Ugb2YgRW50aXR5IGZvciB0aGUgZ2l2ZW4gYXJndW1lbnRzIHdpdGggdGhlXG5cdFx0ICogaW5kaWNhdGlvbiB0aGlzIGlzIGEgbmV3IG5vbi1wZXJzaXN0ZWQgZW50aXR5LiAgVGhpcyBtZWFuczpcblx0XHQgKlxuXHRcdCAqIC0gQWxsIGZpZWxkIHZhbHVlcyBhcmUgcG9wdWxhdGVkIGFuZCBhbnkgbm90IHByb3ZpZGVkIHdpbGwgYmVcblx0XHQgKiAgIHBvcHVsYXRlZCB3aXRoIGRlZmF1bHQgdmFsdWVzIGRlZmluZWQgYnkgdGhlIHNjaGVtYS5cblx0XHQgKiAtIEdlbmVyYXRlcyB0ZW1wb3JhcnkgdW5pcXVlIGlkcyBmb3IgdGhlIHByaW1hcnkga2V5IGZpZWxkcyBvbiB0aGVcblx0XHQgKiAgIGVudGl0eSAodXNpbmcgY3VpZCkuXG5cdFx0ICogLSBTZXRzIHRoZSBgaXNOZXdgIGZsYWcgdG8gdHJ1ZSBmb3IgdGhlIGVudGl0eSBzbyBjbGllbnQgY29kZSBpcyBhYmxlXG5cdFx0ICogICB0byBkaXNjb3ZlciB3aGljaCBlbnRpdGllcyBoYXZlIG5ldmVyIGJlZW4gcGVyc2lzdGVkLlxuXHRcdCAqIC0gVGhpcyBmYWN0b3J5IG1ldGhvZCBleHBlY3RzIGZpZWxkcyBhbmQgdmFsdWVzIHRvIGJlIFwicHJlcGFyZWRcIi5cblx0XHQgKiAgIFdoYXQgdGhhdCBtZWFucyBpcyB0aGF0IGZvciBhbnkgZmllbGRzIHRoYXQgdGhlIHNjaGVtYSBkZXNjcmliZWQgYXNcblx0XHQgKiAgIGhhdmluZyBhIGByYXdgIHByb3BlcnR5IChpLmUuIHsgRVZUX2Rlc2M6IHsgcmF3OiAnc29tZXRoaW5nJyB9IH0pXG5cdFx0ICogICB0aGUgdmFsdWUgc2hvdWxkIGJlIG9mIHRoZSBjb3JyZWN0IHR5cGUgZm9yIHRoYXQgcmF3IHByb3BlcnR5IGFuZC5cblx0XHQgKiAgIFRoaXMgYWxzbyBtZWFucyBpcyB0aGF0IGZvciBhbnkgZmllbGRzIHRoZSBzY2hlbWEgZGVzY3JpYmVzIGFzIGFcblx0XHQgKiAgIGRhdGUtdGltZSAoZm9ybWF0KSBvciBtb25leSAoZm9ybWF0KSBmaWVsZCwgdGhlIHZhbHVlIGlzIGV4cGVjdGVkXG5cdFx0ICogICB0byBiZSB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZSBvYmplY3QuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gZmllbGRzQW5kVmFsdWVzXG5cdFx0ICogQHJldHVybiB7RW50aXR5fSBhbiBpbnN0YW5jZSBvZiBFbnRpdHlcblx0XHQgKi9cblx0XHRjcmVhdGVOZXc6IChmaWVsZHNBbmRWYWx1ZXMpID0+XG5cdFx0XHRuZXcgRW50aXR5KG1vZGVsTmFtZSwgZmllbGRzQW5kVmFsdWVzLCBzY2hlbWEsIGZpZWxkUHJlZml4ZXMsIHRydWUpLFxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgcmV0dXJucyBhbiBpbnN0YW5jZSBvZiBFbnRpdHkgZm9yIHRoZSBnaXZlbiBhcmd1bWVudHMgd2l0aCB0aGVcblx0XHQgKiBpbmRpY2F0aW9uIHRoaXMgcmVwcmVzZW50cyB0aGUgZW50aXR5IGFzIGlzIGluIHRoZSBkYi4gIFRoaXMgbWVhbnM6XG5cdFx0ICpcblx0XHQgKiAtIEFsbCBmaWVsZCB2YWx1ZXMgYXJlIE5PVCBwb3B1bGF0ZWQgaWYgbWlzc2luZyB2YWx1ZXMuICBUaGlzIGlzXG5cdFx0ICogICBlc3BlY2lhbGx5IGltcG9ydGFudCBmb3IgY29udGV4dHMgbGlrZSB1bmF1dGhvcml6ZWQgdmlld3Mgd2hlcmVcblx0XHQgKiAgIG9ubHkgcGFydGlhbCBlbnRpdGllcyBhcmUgcmV0dXJuZWQgaW4gUkVTVCByZXNwb25zZXMuXG5cdFx0ICogLSBpc05ldyBmbGFnIGlzIHNldCB0byBmYWxzZSAoYW5kIG5ldmVyIGNoYW5nZXMgZm9yIHRoaXMgZW50aXR5KVxuXHRcdCAqIC0gVGhlIGluY29taW5nIHZhbHVlcyBhcmUgZXhwZWN0ZWQgdG8gYmUgaW4gdGhlIGV4YWN0IHNoYXBlIGFzXG5cdFx0ICogICBkZXNjcmliZWQgYnkgdGhlIHNjaGVtYSBmb3IgdGhlIGVudGl0eSBtb2RlbC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBmaWVsZHNBbmRWYWx1ZXNcblx0XHQgKiBAcmV0dXJuIHtFbnRpdHl9IGFuIGluc3RhbmNlIG9mIEVudGl0eVxuXHRcdCAqL1xuXHRcdGZyb21FeGlzdGluZzogKGZpZWxkc0FuZFZhbHVlcykgPT5cblx0XHRcdG5ldyBFbnRpdHkobW9kZWxOYW1lLCBmaWVsZHNBbmRWYWx1ZXMsIHNjaGVtYSwgZmllbGRQcmVmaXhlcyksXG5cdH07XG59O1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRW50aXR5RmFjdG9yeTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1BsYWluT2JqZWN0LCBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBhIFwicmF3XCIgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QgYW5kIGhhcyBhIGByYXdgIHByb3BlcnR5LlxuICovXG5leHBvcnQgY29uc3QgaGFzUmF3UHJvcGVydHkgPSAodmFsdWUpID0+XG5cdGlzUGxhaW5PYmplY3QodmFsdWUpICYmICFpc1VuZGVmaW5lZCh2YWx1ZS5yYXcpO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBoYXMgYSBcInByZXR0eVwiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4geyp9IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYSBgcHJldHR5YCBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc1ByZXR0eVByb3BlcnR5ID0gKHZhbHVlKSA9PlxuXHRpc1BsYWluT2JqZWN0KHZhbHVlKSAmJiAhaXNVbmRlZmluZWQodmFsdWUucHJldHR5KTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaGFzIGEgXCJyZW5kZXJlZFwiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYSBgcmVuZGVyZWRgIHByb3BlcnR5LlxuICovXG5leHBvcnQgY29uc3QgaGFzUmVuZGVyZWRQcm9wZXJ0eSA9ICh2YWx1ZSkgPT5cblx0aXNQbGFpbk9iamVjdCh2YWx1ZSkgJiYgIWlzVW5kZWZpbmVkKHZhbHVlLnJlbmRlcmVkKTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaGFzIGEgXCJmb3JtYXRcIiBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdCBhbmQgaGFzIGEgYGZvcm1hdGAgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNGb3JtYXRQcm9wZXJ0eSA9ICh2YWx1ZSkgPT5cblx0aXNQbGFpbk9iamVjdCh2YWx1ZSkgJiYgIWlzVW5kZWZpbmVkKHZhbHVlLmZvcm1hdCk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBhIFwiZW51bVwiIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0IGFuZCBoYXMgYW4gZW51bVxuICogcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNFbnVtUHJvcGVydHkgPSAodmFsdWUpID0+XG5cdGlzUGxhaW5PYmplY3QodmFsdWUpICYmICFpc1VuZGVmaW5lZCh2YWx1ZS5lbnVtKTtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYSBcInZhbHVlIG9iamVjdFwiIGZpZWxkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSB2YWx1ZSBvYmplY3QgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1ZhbHVlT2JqZWN0RmllbGQgPSAoZmllbGQsIHNjaGVtYSkgPT4ge1xuXHRyZXR1cm4gaXNEYXRlVGltZUZpZWxkKGZpZWxkLCBzY2hlbWEpIHx8IGlzTW9uZXlGaWVsZChmaWVsZCwgc2NoZW1hKTtcbn07XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHByb3ZpZGVkIGZpZWxkIGlzIGEgZGF0ZS10aW1lIGZpZWxkIGFjY29yZGluZyB0byB0aGVcbiAqIHByb3ZpZGVkIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgaXQgaXMgYSBkYXRlLXRpbWUgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0RhdGVUaW1lRmllbGQgPSAoZmllbGQsIHNjaGVtYSkgPT5cblx0IWlzVW5kZWZpbmVkKHNjaGVtYVtmaWVsZF0pICYmXG5cdGhhc0Zvcm1hdFByb3BlcnR5KHNjaGVtYVtmaWVsZF0pICYmXG5cdHNjaGVtYVtmaWVsZF0uZm9ybWF0ID09PSAnZGF0ZS10aW1lJztcblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgZmllbGQgaXMgYSBVVEMgZGF0ZS10aW1lIGZpZWxkLlxuICpcbiAqIElmIHNjaGVtYSBpcyBwcm92aWRlZCwgdGhpcyBhbHNvIGNvbnNpZGVycyB3aGV0aGVyIHRoaXMgaXMgYSBkYXRlLXRpbWUgZmllbGQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUaW1lRmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hIFtvcHRpb25hbF1cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhpcyBpcyBhIFVUQyBmaWVsZC4gIElmIHNjaGVtYSBpcyBwcm92aWRlZCBpdFxuICogbWVhbnMgdGhpcyBpcyBhbHNvIGEgZGF0ZS10aW1lIGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNVVENEYXRlVGltZUZpZWxkID0gKGRhdGVUaW1lRmllbGROYW1lLCBzY2hlbWEgPSBudWxsKSA9PiB7XG5cdHJldHVybiBzY2hlbWEgIT09IG51bGxcblx0XHQ/IGlzRGF0ZVRpbWVGaWVsZChkYXRlVGltZUZpZWxkTmFtZSwgc2NoZW1hKSAmJlxuXHRcdFx0XHRkYXRlVGltZUZpZWxkTmFtZS5pbmRleE9mKCdfZ210JykgPiAwXG5cdFx0OiBkYXRlVGltZUZpZWxkTmFtZS5pbmRleE9mKCdfZ210JykgPiAwO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIGZpZWxkIHJlcHJlc2VudHMgYSBwcmltYXJ5IGtleSBmaWVsZCB1c2luZyB0aGVcbiAqIHByb3ZpZGVkIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyBpdCBpcyBhIHByaW1hcnkga2V5IGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNQcmltYXJ5S2V5RmllbGQgPSAoZmllbGROYW1lLCBzY2hlbWEpID0+XG5cdCFpc1VuZGVmaW5lZChzY2hlbWFbZmllbGROYW1lXSkgJiZcblx0IWlzVW5kZWZpbmVkKHNjaGVtYVtmaWVsZE5hbWVdLnByaW1hcnlfa2V5KTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIGZpZWxkIHJlcHJlc2VudHMgYSByZWFkb25seSBmaWVsZCB1c2luZyB0aGVcbiAqIHByb3ZpZGVkIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyBpdCBpcyBhIHJlYWRvbmx5IGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNSZWFkT25seSA9IChmaWVsZE5hbWUsIHNjaGVtYSkgPT5cblx0IWlzVW5kZWZpbmVkKHNjaGVtYVtmaWVsZE5hbWVdKSAmJlxuXHQhaXNVbmRlZmluZWQoc2NoZW1hW2ZpZWxkTmFtZV0ucmVhZG9ubHkpICYmXG5cdHNjaGVtYVtmaWVsZE5hbWVdLnJlYWRvbmx5O1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwcm92aWRlZCBmaWVsZCBpcyBhIFwiZW50aXR5XCIgZmllbGQgdXNpbmcgdGhlIHByb3ZpZGVkXG4gKiBzY2hlbWEuXG4gKlxuICogQW4gXCJlbnRpdHlcIiBmaWVsZCBpcyBhbnkgZmllbGQgdGhhdCBzYXRpc2ZpZXMgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIC0gZmllbGQgZXhpc3RzIGluIHRoZSBzY2hlbWFcbiAqIC0gaXQgaXMgbm90IHJlYWRvbmx5IG9yIGlzIGEgcHJpbWFyeSBrZXkgZmllbGQuXG4gKiAtIGl0IGlzIG5vdCBhIHV0YyBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoaXMgaXMgYW4gZW50aXR5IGZpZWxkXG4gKi9cbmV4cG9ydCBjb25zdCBpc0VudGl0eUZpZWxkID0gKGZpZWxkTmFtZSwgc2NoZW1hKSA9PlxuXHQhaXNVbmRlZmluZWQoc2NoZW1hW2ZpZWxkTmFtZV0pICYmXG5cdCghaXNSZWFkT25seShmaWVsZE5hbWUsIHNjaGVtYSkgfHwgaXNQcmltYXJ5S2V5RmllbGQoZmllbGROYW1lLCBzY2hlbWEpKSAmJlxuXHQhaXNVVENEYXRlVGltZUZpZWxkKGZpZWxkTmFtZSkgJiZcblx0ZmllbGROYW1lICE9PSAnX3Byb3RlY3RlZCc7XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGZpZWxkIHJlcHJlc2VudHMgYSB2YWx1ZSBvZiBtb25leSBmcm9tIHRoZSBwcm92aWRlZFxuICogc2NoZW1hLlxuICpcbiAqIEEgZmllbGQgaXMgYSBtb25leSBmaWVsZCBpZiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIHNhdGlzZmllZDpcbiAqXG4gKiAtIEl0IGV4aXN0cyBpbiB0aGUgc2NoZW1hXG4gKiAtIEl0IGhhcyBhIHByZXR0eSBwcm9wZXJ0eVxuICogLSBUaGUgcHJldHR5IHByb3BlcnR5IHZhbHVlIGhhcyBhIGZvcm1hdCBwcm9wZXJ0eS5cbiAqIC0gVGhlIGZvcm1hdCBwcm9wZXJ0eSBpcyBlcXVhbCB0byAnbW9uZXknXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBpdCBpcyBhIG1vbmV5IGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNNb25leUZpZWxkID0gKGZpZWxkTmFtZSwgc2NoZW1hKSA9PlxuXHQhaXNVbmRlZmluZWQoc2NoZW1hW2ZpZWxkTmFtZV0pICYmXG5cdCFpc1VuZGVmaW5lZChzY2hlbWFbZmllbGROYW1lXS5wcm9wZXJ0aWVzKSAmJlxuXHRoYXNQcmV0dHlQcm9wZXJ0eShzY2hlbWFbZmllbGROYW1lXS5wcm9wZXJ0aWVzKSAmJlxuXHRoYXNGb3JtYXRQcm9wZXJ0eShzY2hlbWFbZmllbGROYW1lXS5wcm9wZXJ0aWVzLnByZXR0eSkgJiZcblx0c2NoZW1hW2ZpZWxkTmFtZV0ucHJvcGVydGllcy5wcmV0dHkuZm9ybWF0ID09PSAnbW9uZXknO1xuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBmaWVsZCBpcyBhbiBlbnVtIHR5cGUgZmllbGQgYXMgZGVmaW5lZCBpbiB0aGUgcHJvdmlkZWRcbiAqIHNjaGVtYS5cbiAqXG4gKiBOb3RlOiB0aGlzIG9ubHkgZXZhbHVhdGVzIHRoZSB0b3AtbGV2ZWwgZm9yIHRoZSBmaWVsZCBzY2hlbWEuICBJZiB0aGUgZmllbGRcbiAqIGluIHRoZSBzY2hlbWEgaXMgb2YgdHlwZSAnb2JqZWN0JyBhbmQgb25lIG9mIHRoZSBvYmplY3QgcHJvcGVydGllcyBpcyBvZiB0eXBlXG4gKiAnZW51bScgdGhpcyB3aWxsIG5vdCBjb25zaWRlciBpdCBhbiBcImVudW1cIiBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBpZiB0aGUgZmllbGQgaXMgYW4gZW51bSB0eXBlIGZpZWxkLlxuICovXG5leHBvcnQgY29uc3QgaXNFbnVtRmllbGQgPSAoZmllbGROYW1lLCBzY2hlbWEpID0+XG5cdCFpc1VuZGVmaW5lZChzY2hlbWFbZmllbGROYW1lXSkgJiZcblx0aGFzRW51bVByb3BlcnR5KHNjaGVtYVtmaWVsZE5hbWVdKSAmJlxuXHQhaXNVbmRlZmluZWQoc2NoZW1hW2ZpZWxkTmFtZV0uZW51bS5sZW5ndGgpICYmXG5cdHNjaGVtYVtmaWVsZE5hbWVdLmVudW0ubGVuZ3RoID4gMDtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBhcHBseUZpbHRlcnMgfSBmcm9tICdAd29yZHByZXNzL2hvb2tzJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBDb25zdGFudHMgZGVzY3JpYmluZyB0aGUgY3VycmVudCBcInNhdmUgc3RhdGVcIiBmb3IgYW4gZW50aXR5LlxuICpcbiAqIEB0eXBlIHt7Q0xFQU46IHN5bWJvbCwgTkVXOiBzeW1ib2wsIERJUlRZOiBzeW1ib2x9fVxuICovXG5leHBvcnQgY29uc3QgU0FWRV9TVEFURSA9IHtcblx0Q0xFQU46IFN5bWJvbCgnRW50aXR5IGlzIHBlcnNpc3RlZC4nKSxcblx0TkVXOiBTeW1ib2woJ0VudGl0eSBpcyBuZXcuJyksXG5cdERJUlRZOiBTeW1ib2woJ0V4aXN0aW5nIGVudGl0eSBoYXMgY2hhbmdlcyBhbmQgbmVlZHMgcGVyc2lzdGVkLicpLFxufTtcblxuLyoqXG4gKiBWYWxpZGF0aW9uIHR5cGVzIGFyZSBmb3Igc2NoZW1hJ3MgdGhhdCBoYXZlIHZhbHVlIHZhcmlhdGlvbnMuXG4gKlxuICogQHR5cGUge3tSQVc6IHN0cmluZywgUkVOREVSRUQ6IHN0cmluZywgUFJFVFRZOiBzdHJpbmd9fVxuICovXG5leHBvcnQgY29uc3QgVkFMSURBVEVfVFlQRSA9IHtcblx0UkFXOiAncmF3Jyxcblx0UkVOREVSRUQ6ICdyZW5kZXJlZCcsXG5cdFBSRVRUWTogJ3ByZXR0eScsXG59O1xuXG4vKipcbiAqIFByaXZhdGUgcHJvcGVydGllcyB1c2VkIGludGVybmFsbHkgYnkgdGhlIEJhc2UgRW50aXR5IENsYXNzXG4gKlxuICogQHR5cGUge3tzYXZlU3RhdGU6IGJvb2xlYW59fVxuICovXG5leHBvcnQgY29uc3QgUFJJVkFURV9QUk9QRVJUSUVTID0ge1xuXHRTQVZFX1NUQVRFOiBTeW1ib2woJ2Jhc2VFbnRpdHlQcml2YXRlUHJvcGVydGllc1NhdmVTdGF0ZScpLFxuXHRWQUxJREFURV9UWVBFUzogU3ltYm9sKCdiYXNlRW50aXR5UHJpdmF0ZVByb3BlcnRpZXNWYWxpZGF0ZVR5cGVzJyksXG59O1xuXG4vKipcbiAqIEhhcmRjb2RlZCBsaXN0IG9mIG1vZGVsIHByZWZpeGVzIGZvciBmaWVsZHMgb24gbW9kZWxzLlxuIFxuICogQSBtb2RlbCBwcmVmaXggaXMgc29tZXRoaW5nIHRoYXQgXCJuYW1lc3BhY2VzXCIgYSBmaWVsZCBvbiBhIG1vZGVsLiAgRm9yXG4gKiBleGFtcGxlLCBpZiB0aGUgZmllbGQgaXMgXCJFVlRfSURcIiwgdGhlbiB0aGUgcHJlZml4IGlzIFwiRVZUXCI7IGlmIHRoZSBmaWVsZCBpc1xuICogXCJEVFRfRVZUX3N0YXJ0XCIsIHRoZW4gdGhlIHByZWZpeGVzIGFyZSBcIkRUVFwiLCBhbmQgXCJEVFRfRVZUXCIuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge09iamVjdH0gQSBmaWx0ZXJlZCBvYmplY3QgaW5kZXhlZCBieSBtb2RlbCBuYW1lIGFuZCB0aGUgdmFsdWVzIGFyZVxuICogYW4gYXJyYXkgb2YgbW9kZWwgcHJlZml4ZXMgZm9yIHRoYXQgbW9kZWwuXG4gKi9cbmV4cG9ydCBjb25zdCBNT0RFTF9QUkVGSVhFUyA9IChtb2RlbE5hbWUpID0+IHtcblx0Y29uc3QgcHJlZml4TWFwID0gYXBwbHlGaWx0ZXJzKFxuXHRcdCdGSEVFX19FTlRJVFlfRkFDVE9SWV9fQ09OU1RBTlRTX19NT0RFTF9QUkVGSVhFUycsXG5cdFx0e1xuXHRcdFx0YW5zd2VyOiBbJ0FOUyddLFxuXHRcdFx0YXR0ZW5kZWU6IFsnQVRUJ10sXG5cdFx0XHRjaGFuZ2VfbG9nOiBbJ0xPRyddLFxuXHRcdFx0Y2hlY2tpbjogWydDSEsnXSxcblx0XHRcdGNvdW50cnk6IFsnQ05UJ10sXG5cdFx0XHRjdXJyZW5jeTogWydDVVInXSxcblx0XHRcdGN1cnJlbmN5X3BheW1lbnRfbWV0aG9kOiBbJ0NQTSddLFxuXHRcdFx0ZGF0ZXRpbWU6IFsnRFRUJywgJ0RUVF9FVlQnXSxcblx0XHRcdGRhdGV0aW1lX3RpY2tldDogWydEVEsnXSxcblx0XHRcdGV2ZW50OiBbJ0VWVCddLFxuXHRcdFx0ZXZlbnRfbWVzc2FnZV90ZW1wbGF0ZTogWydFTVQnXSxcblx0XHRcdGV2ZW50X3F1ZXN0aW9uX2dyb3VwOiBbJ0VRRyddLFxuXHRcdFx0ZXZlbnRfdmVudWU6IFsnRVZWJ10sXG5cdFx0XHRleHRyYV9qb2luOiBbJ0VYSiddLFxuXHRcdFx0ZXh0cmFfbWV0YTogWydFWE0nXSxcblx0XHRcdGxpbmVfaXRlbTogWydMSU4nXSxcblx0XHRcdG1lc3NhZ2U6IFsnTVNHJ10sXG5cdFx0XHRtZXNzYWdlX3RlbXBsYXRlOiBbJ01UUCddLFxuXHRcdFx0bWVzc2FnZV90ZW1wbGF0ZV9ncm91cDogWydHUlAnLCAnTVRQJ10sXG5cdFx0XHRwYXltZW50OiBbJ1BBWSddLFxuXHRcdFx0cGF5bWVudF9tZXRob2Q6IFsnUE1EJ10sXG5cdFx0XHRwb3N0X21ldGE6IFsnbWV0YSddLFxuXHRcdFx0cHJpY2U6IFsnUFJDJ10sXG5cdFx0XHRwcmljZV90eXBlOiBbJ1BSVCddLFxuXHRcdFx0cXVlc3Rpb246IFsnUVNUJ10sXG5cdFx0XHRxdWVzdGlvbl9ncm91cDogWydRU0cnXSxcblx0XHRcdHF1ZXN0aW9uX2dyb3VwX3F1ZXN0aW9uOiBbJ1FHUSddLFxuXHRcdFx0cXVlc3Rpb25fb3B0aW9uOiBbJ1FTTyddLFxuXHRcdFx0cmVnaXN0cmF0aW9uOiBbJ1JFRyddLFxuXHRcdFx0cmVnaXN0cmF0aW9uX3BheW1lbnQ6IFsnUlBZJ10sXG5cdFx0XHRzdGF0ZTogWydTVEEnXSxcblx0XHRcdHN0YXR1czogWydTVFMnXSxcblx0XHRcdHRlcm06IFsndGVybSddLFxuXHRcdFx0dGVybV9yZWxhdGlvbnNoaXA6IFtdLFxuXHRcdFx0dGVybV90YXhvbm9teTogWyd0ZXJtX3RheG9ub215J10sXG5cdFx0XHR0aWNrZXQ6IFsnVEtUJ10sXG5cdFx0XHR0aWNrZXRfcHJpY2U6IFsnVEtQJ10sXG5cdFx0XHR0aWNrZXRfdGVtcGxhdGU6IFsnVFRNJ10sXG5cdFx0XHR0cmFuc2FjdGlvbjogWydUWE4nXSxcblx0XHRcdHZlbnVlOiBbJ1ZOVSddLFxuXHRcdFx0d3BfdXNlcjogWyd1c2VyJ10sXG5cdFx0fVxuXHQpO1xuXHRyZXR1cm4gIWlzVW5kZWZpbmVkKHByZWZpeE1hcFttb2RlbE5hbWVdKSA/IHByZWZpeE1hcFttb2RlbE5hbWVdIDogW107XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGNhbWVsQ2FzZSxcblx0dXBwZXJGaXJzdCxcblx0Zm9yRWFjaCxcblx0aXNVbmRlZmluZWQsXG5cdGlzQXJyYXksXG5cdGtleXMsXG5cdHNvcnRCeSxcbn0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjdWlkIGZyb20gJ2N1aWQnO1xuaW1wb3J0IHsgSW52YWxpZEFyZ3VtZW50IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRhc3NlcnRWYWxpZEZpZWxkQW5kVmFsdWVBZ2FpbnN0U2NoZW1hLFxuXHRhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZCxcbn0gZnJvbSAnLi9hc3NlcnRpb25zJztcbmltcG9ydCB7XG5cdGRlcml2ZVJlbmRlcmVkVmFsdWUsXG5cdGRlcml2ZVByZXBhcmVkVmFsdWVGb3JGaWVsZCxcblx0Z2V0UmVsYXRpb25OYW1lRnJvbUxpbmssXG5cdGdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JDbG9uaW5nLFxuXHRnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yUGVyc2lzdGluZyxcblx0Z2V0UHJpbWFyeUtleUZpZWxkc0Zyb21TY2hlbWEsXG5cdGdldEVudGl0eUZpZWxkc0Zyb21TY2hlbWEsXG5cdGdldERlZmF1bHRWYWx1ZUZvckZpZWxkLFxuXHRkZXJpdmVWYWxpZGF0ZVR5cGVGb3JGaWVsZCxcbn0gZnJvbSAnLi9leHRyYWN0b3JzJztcbmltcG9ydCB7IGlzRW50aXR5RmllbGQsIGlzUHJpbWFyeUtleUZpZWxkIH0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQgeyBQUklWQVRFX1BST1BFUlRJRVMsIFNBVkVfU1RBVEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKihcbiAqIEEgZ2VuZXJpYyBnZXR0ZXIgY3JlYXRvciBmb3IgYSBwcm92aWRlZCBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWUgIFRoZSBuYW1lIG9mIHRoZSBhY2Nlc3Nvci5cbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgdXNlZCB0byBwYXNzIHRocm91Z2ggYWRkaXRpb25hbCBvcHRpb25zIGZvciB0aGVcbiAqIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBjYWxsLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlR2V0dGVyID0gKGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIG9wdHMgPSB7fSkgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoaW5zdGFuY2UsIGZpZWxkTmFtZSwge1xuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiBmaWVsZFZhbHVlO1xuXHRcdH0sXG5cdFx0Li4ub3B0cyxcblx0fSk7XG59O1xuXG4vKipcbiAqIFRoaXMgY3JlYXRlcyBhIGdldHRlciB0aGF0IGNhbGxzIHRoZSBwcm92aWRlZCBjYWxsYmFjayB3aGVuIGludm9rZWQuXG4gKlxuICogVGhlIGNhbGxiYWNrIHJlY2VpdmVzIHRoZSBgaW5zdGFuY2VgIGFyZ3VtZW50IHBhc3NlZCB0aHJvdWdoXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCl9IGNhbGxCYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQ2FsbGJhY2tHZXR0ZXIgPSAoXG5cdGluc3RhbmNlLFxuXHRwcm9wZXJ0eU5hbWUsXG5cdGNhbGxCYWNrLFxuXHRvcHRzID0ge31cbikgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoaW5zdGFuY2UsIHByb3BlcnR5TmFtZSwge1xuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiBjYWxsQmFjayhpbnN0YW5jZSk7XG5cdFx0fSxcblx0XHQuLi5vcHRzLFxuXHR9KTtcbn07XG5cbi8qKlxuICogQSBnZW5lcmljIGdldHRlciBhbmQgc2V0dGVyIGNyZWF0b3IgZm9yIGEgcHJvdmlkZWQgaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gIGluaXRpYWxGaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25hbCwgcGFzcyB0aHJvdWdoIG9wdGlvbnMgdXNlZCBieVxuICogT2JqZWN0LmRlZmluZVByb3BlcnR5XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVHZXR0ZXJBbmRTZXR0ZXIgPSAoXG5cdGluc3RhbmNlLFxuXHRmaWVsZE5hbWUsXG5cdGluaXRpYWxGaWVsZFZhbHVlLFxuXHRvcHRzID0ge31cbikgPT4ge1xuXHRsZXQgcHJvcGVydHlWYWx1ZSA9IGluaXRpYWxGaWVsZFZhbHVlO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoaW5zdGFuY2UsIGZpZWxkTmFtZSwge1xuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiBwcm9wZXJ0eVZhbHVlO1xuXHRcdH0sXG5cdFx0c2V0KHJlY2VpdmVkVmFsdWUpIHtcblx0XHRcdGNvbnN0IGlzUHJpbWFyeUZpZWxkID0gaXNQcmltYXJ5S2V5RmllbGQoXG5cdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0aW5zdGFuY2Uuc2NoZW1hXG5cdFx0XHQpO1xuXHRcdFx0aWYgKCFpbnN0YW5jZS5pc05ldyAmJiBpc1ByaW1hcnlGaWVsZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRhc3NlcnRWYWxpZFZhbHVlRm9yUHJlcGFyZWRGaWVsZChcblx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRyZWNlaXZlZFZhbHVlLFxuXHRcdFx0XHRpbnN0YW5jZVxuXHRcdFx0KTtcblx0XHRcdGlmICghaXNQcmltYXJ5RmllbGQpIHtcblx0XHRcdFx0c2V0U2F2ZVN0YXRlKGluc3RhbmNlLCBTQVZFX1NUQVRFLkRJUlRZKTtcblx0XHRcdFx0c2V0RmllbGRUb1BlcnNpc3QoaW5zdGFuY2UsIGZpZWxkTmFtZSk7XG5cdFx0XHR9XG5cdFx0XHRwcm9wZXJ0eVZhbHVlID0gcmVjZWl2ZWRWYWx1ZTtcblx0XHR9LFxuXHRcdC4uLm9wdHMsXG5cdH0pO1xufTtcblxuLyoqXG4gKiBBIGdldHRlciBhbmQgc2V0dGVyIGNyZWF0b3IgZm9yIGFuIGZpZWxkIGFsaWFzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IG9yaWdpbmFsRmllbGROYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gYWxpYXNGaWVsZE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBbGlhc0dldHRlckFuZFNldHRlciA9IChcblx0aW5zdGFuY2UsXG5cdG9yaWdpbmFsRmllbGROYW1lLFxuXHRhbGlhc0ZpZWxkTmFtZSxcblx0b3B0cyA9IHt9XG4pID0+IHtcblx0aWYgKG9yaWdpbmFsRmllbGROYW1lICE9PSBhbGlhc0ZpZWxkTmFtZSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpbnN0YW5jZSwgYWxpYXNGaWVsZE5hbWUsIHtcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIGluc3RhbmNlW29yaWdpbmFsRmllbGROYW1lXTtcblx0XHRcdH0sXG5cdFx0XHRzZXQocmVjZWl2ZWRWYWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gKGluc3RhbmNlW29yaWdpbmFsRmllbGROYW1lXSA9IHJlY2VpdmVkVmFsdWUpO1xuXHRcdFx0fSxcblx0XHRcdC4uLm9wdHMsXG5cdFx0fSk7XG5cdH1cbn07XG5cbi8qKlxuICogQSBnZXR0ZXIgY3JlYXRvciBmb3IgYSBmaWVsZCBhbGlhcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmlnaW5hbEZpZWxkTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGFsaWFzRmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQWxpYXNHZXR0ZXIgPSAoXG5cdGluc3RhbmNlLFxuXHRvcmlnaW5hbEZpZWxkTmFtZSxcblx0YWxpYXNGaWVsZE5hbWUsXG5cdG9wdHMgPSB7fVxuKSA9PiB7XG5cdGlmIChvcmlnaW5hbEZpZWxkTmFtZSAhPT0gYWxpYXNGaWVsZE5hbWUpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoaW5zdGFuY2UsIGFsaWFzRmllbGROYW1lLCB7XG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHJldHVybiBpbnN0YW5jZVtvcmlnaW5hbEZpZWxkTmFtZV07XG5cdFx0XHR9LFxuXHRcdFx0Li4ub3B0cyxcblx0XHR9KTtcblx0fVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZmx1ZW50IHNldHRlciBvbiB0aGUgcHJvdmlkZWQgaW5zdGFuY2UgZm9yIHRoZSBnaXZlbiBmaWVsZCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgIE9wdGlvbnMgZm9yIE9iamVjdC5kZWZpbmVQcm9wZXJ0eVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlRmx1ZW50U2V0dGVyID0gKGluc3RhbmNlLCBmaWVsZE5hbWUsIG9wdHMgPSB7fSkgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoaW5zdGFuY2UsICdzZXQnICsgdXBwZXJGaXJzdChmaWVsZE5hbWUpLCB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIChyZWNlaXZlZFZhbHVlKSA9PiB7XG5cdFx0XHRcdGluc3RhbmNlW2ZpZWxkTmFtZV0gPSByZWNlaXZlZFZhbHVlO1xuXHRcdFx0XHRyZXR1cm4gaW5zdGFuY2U7XG5cdFx0XHR9O1xuXHRcdH0sXG5cdFx0Li4ub3B0cyxcblx0fSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgaW5pdGlhbCBnZXR0ZXJzIGFuZCBzZXR0ZXJzIGZvciBlbnRpdGllcyBvbiB0aGUgcHJvdmlkZWQgZW50aXR5XG4gKiBpbnN0YW5jZSB1c2luZyB0aGUgZ2l2ZW4gZGF0YS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIGtleXMgb24gaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVFbnRpdHlHZXR0ZXJzQW5kU2V0dGVycyA9IChpbnN0YW5jZSkgPT4ge1xuXHRjb25zdCBwcmltYXJ5S2V5cyA9IFtdO1xuXHRmb3JFYWNoKGluc3RhbmNlLm9yaWdpbmFsRmllbGRzQW5kVmFsdWVzLCAoZmllbGRWYWx1ZSwgZmllbGROYW1lKSA9PiB7XG5cdFx0Y29uc3QgaXNQcmltYXJ5S2V5ID0gaXNQcmltYXJ5S2V5RmllbGQoZmllbGROYW1lLCBpbnN0YW5jZS5zY2hlbWEpO1xuXHRcdHNldFZhbGlkYXRlVHlwZUZvckZpZWxkKGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUpO1xuXHRcdGlmIChpc0VudGl0eUZpZWxkKGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hKSkge1xuXHRcdFx0aWYgKGluc3RhbmNlLmlzTmV3KSB7XG5cdFx0XHRcdGFzc2VydFZhbGlkVmFsdWVGb3JQcmVwYXJlZEZpZWxkKFxuXHRcdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0XHRmaWVsZFZhbHVlLFxuXHRcdFx0XHRcdGluc3RhbmNlXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhc3NlcnRWYWxpZEZpZWxkQW5kVmFsdWVBZ2FpbnN0U2NoZW1hKFxuXHRcdFx0XHRcdGluc3RhbmNlLm1vZGVsTmFtZSxcblx0XHRcdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0XHRpbnN0YW5jZVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0c2V0SW5pdGlhbEVudGl0eUZpZWxkc0FuZFZhbHVlcyhcblx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0ZmllbGRWYWx1ZSxcblx0XHRcdFx0aXNQcmltYXJ5S2V5XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoZmllbGROYW1lID09PSAnX2NhbGN1bGF0ZWRfZmllbGRzJykge1xuXHRcdFx0c2V0Q2FsY3VsYXRlZEZpZWxkQW5kVmFsdWVzKGluc3RhbmNlLCBmaWVsZFZhbHVlKTtcblx0XHR9XG5cdFx0aWYgKGZpZWxkTmFtZSA9PT0gJ19wcm90ZWN0ZWQnKSB7XG5cdFx0XHRwb3B1bGF0ZVByb3RlY3RlZEZpZWxkc1Byb3BlcnR5KGluc3RhbmNlLCBmaWVsZFZhbHVlKTtcblx0XHR9XG5cdFx0aWYgKGZpZWxkTmFtZSA9PT0gJ2xpbmsnKSB7XG5cdFx0XHRjcmVhdGVHZXR0ZXIoaW5zdGFuY2UsICdsaW5rJywgZmllbGRWYWx1ZSk7XG5cdFx0fVxuXHRcdGlmIChmaWVsZE5hbWUgPT09ICdfbGlua3MnKSB7XG5cdFx0XHRzZXRSZXNvdXJjZXMoaW5zdGFuY2UsIGZpZWxkVmFsdWUpO1xuXHRcdH1cblx0XHRpZiAoIWluc3RhbmNlLmlzTmV3ICYmIGlzUHJpbWFyeUtleSkge1xuXHRcdFx0cHJpbWFyeUtleXMucHVzaChmaWVsZE5hbWUpO1xuXHRcdH1cblx0fSk7XG5cdGlmICghaW5zdGFuY2UuaXNOZXcgJiYgcHJpbWFyeUtleXMubGVuZ3RoKSB7XG5cdFx0Y3JlYXRlUHJpbWFyeUtleUZpZWxkR2V0dGVycyhpbnN0YW5jZSwgcHJpbWFyeUtleXMpO1xuXHR9XG5cblx0cG9wdWxhdGVQcmltYXJ5S2V5cyhpbnN0YW5jZSk7XG5cdHBvcHVsYXRlTWlzc2luZ0ZpZWxkcyhpbnN0YW5jZSk7XG59O1xuXG4vKipcbiAqIFBvcHVsYXRlcyB0aGUgYHByb3RlY3RlZEZpZWxkc2AgcHJvcGVydHkgb24gdGhlIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtBcnJheX0gcHJvdGVjdGVkRmllbGRzXG4gKi9cbmNvbnN0IHBvcHVsYXRlUHJvdGVjdGVkRmllbGRzUHJvcGVydHkgPSAoaW5zdGFuY2UsIHByb3RlY3RlZEZpZWxkcykgPT4ge1xuXHQvLyBnZXQgYW55IGNhbGN1bGF0ZWQgcHJvdGVjdGVkIGZpZWxkcy5cblx0Y29uc3QgY2FsY3VsYXRlZEZpZWxkcyA9XG5cdFx0aW5zdGFuY2Uub3JpZ2luYWxGaWVsZHNBbmRWYWx1ZXMuX2NhbGN1bGF0ZWRfZmllbGRzIHx8IHt9O1xuXHRpZiAoY2FsY3VsYXRlZEZpZWxkcy5fcHJvdGVjdGVkICYmIGlzQXJyYXkoY2FsY3VsYXRlZEZpZWxkcy5fcHJvdGVjdGVkKSkge1xuXHRcdHByb3RlY3RlZEZpZWxkcyA9IFsuLi5wcm90ZWN0ZWRGaWVsZHMsIC4uLmNhbGN1bGF0ZWRGaWVsZHMuX3Byb3RlY3RlZF07XG5cdH1cblx0Y3JlYXRlR2V0dGVyKGluc3RhbmNlLCAncHJvdGVjdGVkRmllbGRzJywgcHJvdGVjdGVkRmllbGRzKTtcbn07XG5cbi8qKlxuICogVGhpcyBwb3B1bGF0ZXMgcHJpbWFyeSBrZXkgZmllbGRzLlxuICogTm90ZSB0aGF0IGl0IGFsc28gb3ZlcnJpZGVzIGFueSBwcmltYXJ5IGtleSB2YWx1ZXMvcHJvcGVydGllcyB0aGF0IGFyZVxuICogYWxyZWFkeSBzZXQgaW4gdGhlIGVudGl0eSBzbyBpcyBvbmx5IHByb2Nlc3NlZCB3aGVuIHRoZSBpbnN0YW5jZSBpcyBuZXcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKi9cbmNvbnN0IHBvcHVsYXRlUHJpbWFyeUtleXMgPSAoaW5zdGFuY2UpID0+IHtcblx0aWYgKCFpbnN0YW5jZS5pc05ldykge1xuXHRcdHJldHVybjtcblx0fVxuXHRjb25zdCBwcmltYXJ5S2V5cyA9IGdldFByaW1hcnlLZXlGaWVsZHNGcm9tU2NoZW1hKGluc3RhbmNlKTtcblx0Zm9yRWFjaChwcmltYXJ5S2V5cywgKHNjaGVtYVByb3BlcnRpZXMsIHNjaGVtYUZpZWxkKSA9PiB7XG5cdFx0Ly8gYWx3YXlzIGRlbGV0ZSBhbmQgb3ZlcnJpZGUgd2hhdCBpcyBleGlzdGluZy5cblx0XHRpZiAoaW5zdGFuY2Vbc2NoZW1hRmllbGRdKSB7XG5cdFx0XHRkZWxldGUgaW5zdGFuY2Vbc2NoZW1hRmllbGRdO1xuXHRcdH1cblx0XHRjcmVhdGVHZXR0ZXJBbmRTZXR0ZXIoaW5zdGFuY2UsIHNjaGVtYUZpZWxkLCBjdWlkKCksIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0fSk7XG5cdFx0Y3JlYXRlQWxpYXNHZXR0ZXJBbmRTZXR0ZXJGb3JGaWVsZChpbnN0YW5jZSwgc2NoZW1hRmllbGQpO1xuXHR9KTtcblx0Y3JlYXRlUHJpbWFyeUtleUZpZWxkR2V0dGVycyhpbnN0YW5jZSwga2V5cyhwcmltYXJ5S2V5cykpO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSB2YWxpZGF0ZSB0eXBlIGZvciBhIGZpZWxkIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKi9cbmNvbnN0IHNldFZhbGlkYXRlVHlwZUZvckZpZWxkID0gKGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUpID0+IHtcblx0aW5zdGFuY2VbUFJJVkFURV9QUk9QRVJUSUVTLlZBTElEQVRFX1RZUEVTXVtmaWVsZE5hbWVdID1cblx0XHRkZXJpdmVWYWxpZGF0ZVR5cGVGb3JGaWVsZChmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIGluc3RhbmNlLnNjaGVtYSk7XG59O1xuXG4vKipcbiAqICBQb3B1bGF0ZXMgbWlzc2luZyBmaWVsZHMgYW5kIHZhbHVlcyB1c2luZyBkZWZhdWx0cyBwcm92aWRlZCBieSBzY2hlbWEuICBJZlxuICogIHNjaGVtYSBkb2Vzbid0IHByb3ZpZGUgYSBkZWZhdWx0IHRoZW4gdGhpcyB3aWxsIHBvcHVsYXRlIHRoZSBmaWVsZCB3aXRoIGFcbiAqICBkZWZhdWx0IHZhbHVlIHRoYXQgbWF0Y2hlcyB0aGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqL1xuY29uc3QgcG9wdWxhdGVNaXNzaW5nRmllbGRzID0gKGluc3RhbmNlKSA9PiB7XG5cdGlmICh0eXBlb2YgaW5zdGFuY2UucHJvdGVjdGVkRmllbGRzID09PSAndW5kZWZpbmVkJykge1xuXHRcdHBvcHVsYXRlUHJvdGVjdGVkRmllbGRzUHJvcGVydHkoaW5zdGFuY2UsIFtdKTtcblx0fVxuXHRpZiAoIWluc3RhbmNlLmlzTmV3KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGZvckVhY2goXG5cdFx0Z2V0RW50aXR5RmllbGRzRnJvbVNjaGVtYShpbnN0YW5jZSksXG5cdFx0KHNjaGVtYVByb3BlcnRpZXMsIGZpZWxkTmFtZSkgPT4ge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHR0eXBlb2YgaW5zdGFuY2VbZmllbGROYW1lXSA9PT0gJ3VuZGVmaW5lZCcgJiZcblx0XHRcdFx0IWlzUHJpbWFyeUtleUZpZWxkKGZpZWxkTmFtZSwgaW5zdGFuY2Uuc2NoZW1hKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNldEluaXRpYWxFbnRpdHlGaWVsZHNBbmRWYWx1ZXMoaW5zdGFuY2UsIGZpZWxkTmFtZSwgdW5kZWZpbmVkKTtcblx0XHRcdH1cblx0XHR9XG5cdCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwbGFpbiBvYmplY3Qgb2YgZW50aXR5IGZpZWxkcyBhbmQgdmFsdWVzIGZyb20gdGhpcyBlbnRpdHkgaW5zdGFuY2VcbiAqIGZvciB1c2UgaW4gY2xvbmluZyB0aGUgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IFBsYWluIG9iamVjdCBvZiBhbGwgZmllbGQ6dmFsdWUgcGFpcnMuXG4gKi9cbmNvbnN0IGZvckNsb25lID0gKGluc3RhbmNlKSA9PiB7XG5cdHJldHVybiBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyhpbnN0YW5jZSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwbGFpbiBvYmplY3Qgb2YgdGhlIGVudGl0eSBmaWVsZHMgYW5kIHZhbHVlcyBmcm9tIHRoaXMgZW50aXR5XG4gKiBpbnN0YW5jZSBwcmVwYXJlZCBmb3IgdXNlIGluIGFuIHVwZGF0ZSByZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBQbGFpbiBvYmplY3Qgb2YgZmllbGQ6dmFsdWUgcGFpcnMuXG4gKi9cbmNvbnN0IGZvclVwZGF0ZSA9IChpbnN0YW5jZSkgPT4ge1xuXHRyZXR1cm4gZ2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvclBlcnNpc3RpbmcoaW5zdGFuY2UpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIHRoZSBlbnRpdHkgZmllbGRzIGFuZCB2YWx1ZXMgZnJvbSB0aGlzIGVudGl0eVxuICogaW5zdGFuY2UgcHJlcGFyZWQgZm9yIHVzZSBpbiBhbiBpbnNlcnQgcmVxdWVzdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gUGxhaW4gb2JqZWN0IG9mIGZpZWxkOnZhbHVlIHBhaXJzLlxuICovXG5jb25zdCBmb3JJbnNlcnQgPSAoaW5zdGFuY2UpID0+IHtcblx0Y29uc3QgZW50aXR5VmFsdWVzID0gZ2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvclBlcnNpc3RpbmcoaW5zdGFuY2UsIHRydWUpO1xuXHRpbnN0YW5jZS5wcmltYXJ5S2V5cy5mb3JFYWNoKChwcmltYXJ5S2V5KSA9PiB7XG5cdFx0ZW50aXR5VmFsdWVzW3ByaW1hcnlLZXldID0gaW5zdGFuY2VbcHJpbWFyeUtleV07XG5cdH0pO1xuXHRyZXR1cm4gZW50aXR5VmFsdWVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIHRoZSBlbnRpdHkgZmllbGRzIGFuZCB2YWx1ZXMgZnJvbSB0aGlzIGVudGl0eVxuICogaW5zdGFuY2UgcHJlcGFyZWQgZm9yIHVzZSBpbiBlaXRoZXIgYW4gaW5zZXJ0IG9yIHVwZGF0ZSByZXF1ZXN0LiAgVGhlIHR5cGVcbiAqIGlzIGF1dG9tYXRpY2FsbHkgZGVyaXZlZCBmcm9tIHRoZSBkZXRlcm1pbmluZyB3aGV0aGVyIHRoZSBlbnRpdHkgaXMgXCJuZXdcIiBvclxuICogbm90LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBQbGFpbiBvYmplY3Qgb2YgZmllbGQ6dmFsdWUgcGFpcnMuXG4gKi9cbmNvbnN0IGZvclBlcnNpc3QgPSAoaW5zdGFuY2UpID0+IHtcblx0aWYgKGluc3RhbmNlLmlzTmV3KSB7XG5cdFx0cmV0dXJuIGZvckluc2VydChpbnN0YW5jZSk7XG5cdH1cblx0cmV0dXJuIGZvclVwZGF0ZShpbnN0YW5jZSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgZ2V0dGVycyBmb3IgcmV0cmlldmluZyB0aGUgZmllbGRzIGFuZCB2YWx1ZXMgb2YgdGhlIGVudGl0eSBpbnN0YW5jZVxuICogZm9yIGluc2VydCBvciB1cGRhdGUgcmVxdWVzdHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVQZXJzaXN0aW5nR2V0dGVyc0FuZFNldHRlcnMgPSAoaW5zdGFuY2UpID0+IHtcblx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoaW5zdGFuY2UsICdmb3JVcGRhdGUnLCBmb3JVcGRhdGUpO1xuXHRjcmVhdGVDYWxsYmFja0dldHRlcihpbnN0YW5jZSwgJ2Zvckluc2VydCcsIGZvckluc2VydCk7XG5cdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKGluc3RhbmNlLCAnZm9yUGVyc2lzdCcsIGZvclBlcnNpc3QpO1xuXHRjcmVhdGVDYWxsYmFja0dldHRlcihpbnN0YW5jZSwgJ2ZvckNsb25lJywgZm9yQ2xvbmUpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGluaXRpYWwgZW50aXR5IGZpZWxkIGFjY2Vzc29ycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBpc1ByaW1hcnlLZXlcbiAqL1xuY29uc3Qgc2V0SW5pdGlhbEVudGl0eUZpZWxkc0FuZFZhbHVlcyA9IChcblx0aW5zdGFuY2UsXG5cdGZpZWxkTmFtZSxcblx0ZmllbGRWYWx1ZSxcblx0aXNQcmltYXJ5S2V5ID0gZmFsc2VcbikgPT4ge1xuXHRpZiAoaXNVbmRlZmluZWQoZmllbGRWYWx1ZSkpIHtcblx0XHRmaWVsZFZhbHVlID0gZ2V0RGVmYXVsdFZhbHVlRm9yRmllbGQoZmllbGROYW1lLCBpbnN0YW5jZS5zY2hlbWEpO1xuXHRcdHNldFZhbGlkYXRlVHlwZUZvckZpZWxkKGluc3RhbmNlLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUpO1xuXHR9XG5cdGNyZWF0ZVJhd0VudGl0eUdldHRlcnNTZXR0ZXJzKFxuXHRcdGluc3RhbmNlLFxuXHRcdGZpZWxkTmFtZSxcblx0XHRkZXJpdmVQcmVwYXJlZFZhbHVlRm9yRmllbGQoZmllbGROYW1lLCBmaWVsZFZhbHVlLCBpbnN0YW5jZSksXG5cdFx0aXNQcmltYXJ5S2V5XG5cdCk7XG5cdGlmICghaXNQcmltYXJ5S2V5KSB7XG5cdFx0Y3JlYXRlUmVuZGVyZWRHZXR0ZXJzKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRmaWVsZE5hbWUsXG5cdFx0XHRkZXJpdmVSZW5kZXJlZFZhbHVlKGZpZWxkVmFsdWUpXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIHJhdyBlbnRpdHkgZ2V0dGVycyBhbmQgc2V0dGVycy4gIFRoZXNlIGFyZSB0aGUgcHJvcGVydGllcyBvZiBhblxuICogZW50aXR5IHRoYXQgaGF2ZSB0aGUgdmFsdWVzIHVzZWQgZm9yIG5vdCBvbmx5IGdldHRpbmcgYnV0IGFsc28gc2V0dGluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRWYWx1ZVxuICogQHBhcmFtIHtib29sZWFufSBpc1ByaW1hcnlLZXkgc2V0IHRvIHRydWUgaWYgZmllbGQgaXMgdGhlIG1vZGVsJ3MgcHJpbWFyeSBrZXlcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVJhd0VudGl0eUdldHRlcnNTZXR0ZXJzID0gKFxuXHRpbnN0YW5jZSxcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRpc1ByaW1hcnlLZXkgPSBmYWxzZVxuKSA9PiB7XG5cdGNvbnN0IG9wdHMgPSB7IGVudW1lcmFibGU6IHRydWUgfTtcblx0Ly8gcHJpbWFyeSBrZXkgaXMgaW1tdXRhYmxlXG5cdGlmIChpc1ByaW1hcnlLZXkpIHtcblx0XHRjcmVhdGVHZXR0ZXIoaW5zdGFuY2UsIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgb3B0cyk7XG5cdFx0Y3JlYXRlQWxpYXNHZXR0ZXJGb3JGaWVsZChpbnN0YW5jZSwgZmllbGROYW1lKTtcblx0fSBlbHNlIHtcblx0XHRjcmVhdGVHZXR0ZXJBbmRTZXR0ZXIoaW5zdGFuY2UsIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgb3B0cyk7XG5cdFx0Y3JlYXRlRmx1ZW50U2V0dGVyKGluc3RhbmNlLCBmaWVsZE5hbWUpO1xuXHRcdGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyRm9yRmllbGQoaW5zdGFuY2UsIGZpZWxkTmFtZSk7XG5cdH1cbn07XG5cbi8qKlxuICogQ3JlYXRlcyBcImFsaWFzXCIgZ2V0dGVyIGZvciB0aGUgZ2l2ZW4gZmllbGQgbmFtZSBvbiB0aGUgZW50aXR5IGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQWxpYXNHZXR0ZXJGb3JGaWVsZCA9IChpbnN0YW5jZSwgZmllbGROYW1lKSA9PiB7XG5cdGNyZWF0ZUFsaWFzZXNGb3JNZXRob2QoaW5zdGFuY2UsIGZpZWxkTmFtZSwgY3JlYXRlQWxpYXNHZXR0ZXIpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIFwiYWxpYXNcIiBnZXR0ZXJzIGFuZCBzZXR0ZXJzIGZvciB0aGUgZ2l2ZW4gZmllbGQgb24gdGhlIGVudGl0eVxuICogaW5zdGFuY2UuXG4gKlxuICogRXhhbXBsZTogRGF0ZXRpbWUgZW50aXRpZXMgaGF2ZSBhIGBEVFRfRVZUX3N0YXJ0YCBmaWVsZC4gIE9uIHRoZSBlbnRpdHlcbiAqIGluc3RhbmNlLCB5b3Ugd2lsbCBiZSBhYmxlIHRvIGFjY2VzcyB0aGUgdmFsdWUgb2YgdGhhdCBmaWVsZCB2aWE6XG4gKiAtIGRhdGV0aW1lLkRUVF9FVlRfc3RhcnRcbiAqIC0gZGF0ZXRpbWUuZHR0RXZ0U3RhcnRcbiAqIC0gZGF0ZXRpbWUuZXZ0U3RhcnRcbiAqIC0gZGF0ZXRpbWUuc3RhcnRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyRm9yRmllbGQgPSAoaW5zdGFuY2UsIGZpZWxkTmFtZSkgPT4ge1xuXHRjcmVhdGVBbGlhc2VzRm9yTWV0aG9kKGluc3RhbmNlLCBmaWVsZE5hbWUsIGNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBBbGlhc2VzIHVzaW5nIHRoZSBwcm92aWRlZCBtZXRob2QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2RcbiAqL1xuY29uc3QgY3JlYXRlQWxpYXNlc0Zvck1ldGhvZCA9IChpbnN0YW5jZSwgZmllbGROYW1lLCBtZXRob2QpID0+IHtcblx0Ly8gY2FtZWxDYXNlIGdldHRlciAob3Igc2V0dGVyKSBmb3IgZnVsbCBmaWVsZCBuYW1lIChlZy4gRVZUX2Rlc2MgPT4gZXZ0RGVzYylcblx0bWV0aG9kKGluc3RhbmNlLCBmaWVsZE5hbWUsIGNhbWVsQ2FzZShmaWVsZE5hbWUpKTtcblx0Ly8gc3RyaXAgZmllbGQgcHJlZml4ZXMgYW5kIGNhbWVsQ2FzZSAoaWYgdGhlcmUgYXJlIGZpZWxkIHByZWZpeGVzIGZvciB0aGVcblx0Ly8gZW50aXR5LiAoZWcuIEVWVF9kZXNjID0+IGRlc2MpO1xuXHRpZiAoaW5zdGFuY2UuZmllbGRQcmVmaXhlcykge1xuXHRcdGxldCBuZXdGaWVsZE5hbWUgPSAnJztcblx0XHQvLyBZZXMsIGl0cyBpbnRlbmRlZCB0aGF0IGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBwcmVmaXhlcywgdGhpcyBjb3VsZFxuXHRcdC8vIGVuZCB1cCBjcmVhdGluZyBtdWx0aXBsZSBhbGlhc2VkIGdldHRlcnMgKG9yIHNldHRlcnMpXG5cdFx0Ly8gKGVnIERhdGV0aW1lOiBEVFRfRVZUX3N0YXJ0IHdvdWxkIGVuZCB1cCB3aXRoIGBldnRTdGFydGAgYW5kIGBzdGFydGBcblx0XHQvLyBhcyBnZXR0ZXIgYWNjZXNzb3JzKS5cblx0XHRpbnN0YW5jZS5maWVsZFByZWZpeGVzLmZvckVhY2goKGZpZWxkUHJlZml4KSA9PiB7XG5cdFx0XHRuZXdGaWVsZE5hbWUgPSBmaWVsZE5hbWUucmVwbGFjZShmaWVsZFByZWZpeCArICdfJywgJycpO1xuXHRcdFx0aWYgKG5ld0ZpZWxkTmFtZSAhPT0gZmllbGROYW1lKSB7XG5cdFx0XHRcdG1ldGhvZChpbnN0YW5jZSwgZmllbGROYW1lLCBjYW1lbENhc2UobmV3RmllbGROYW1lKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhIGNhbGxiYWNrIHRoYXQgaXMgdXNlZCBpbiB0aGUgYGdldFJlbmRlcmVkYCBmaWVsZCBnZXR0ZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihzdHJpbmcpOiAqfSAgQSBjYWxsYmFjay5cbiAqL1xuY29uc3QgZ2V0UmVuZGVyZWRDYWxsYmFjayA9IChpbnN0YW5jZSkgPT4gKHJlcXVlc3RlZEZpZWxkTmFtZSkgPT5cblx0aW5zdGFuY2VbcmVxdWVzdGVkRmllbGROYW1lICsgJ1JlbmRlcmVkJ107XG5cbi8qKlxuICogUmV0dXJucyBhIGZpZWxkTmFtZSBzdHJpcHBlZCBvZiBhbGwgcG9zc2libGUgcHJlZml4ZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBwcmVmaXggZnJlZSBmaWVsZE5hbWUuXG4gKi9cbmNvbnN0IHJlbW92ZVByZWZpeGVzRnJvbUZpZWxkID0gKGluc3RhbmNlLCBmaWVsZE5hbWUpID0+IHtcblx0Y29uc3QgcHJlZml4ZXNUb1JlbW92ZSA9IHNvcnRCeShcblx0XHRpbnN0YW5jZS5maWVsZFByZWZpeGVzLFxuXHRcdChwcmVmaXgpID0+IHByZWZpeC5sZW5ndGggKiAtMVxuXHQpO1xuXHRsZXQgbmV3RmllbGROYW1lID0gZmllbGROYW1lO1xuXHRmb3JFYWNoKHByZWZpeGVzVG9SZW1vdmUsIChwcmVmaXgpID0+IHtcblx0XHRuZXdGaWVsZE5hbWUgPSBmaWVsZE5hbWUucmVwbGFjZShwcmVmaXgsICcnKTtcblx0XHRpZiAobmV3RmllbGROYW1lICE9PSBmaWVsZE5hbWUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gbmV3RmllbGROYW1lO1xufTtcblxuLyoqXG4gKiBUaGlzIGNyZWF0ZXMgdGhlIGdldHRlcnMgZm9yIHRoZSByZW5kZXJlZCBwcm9wZXJ0eSBvZiBtb2RlbCBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9ICBmaWVsZFZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVSZW5kZXJlZEdldHRlcnMgPSAoaW5zdGFuY2UsIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSkgPT4ge1xuXHRjcmVhdGVHZXR0ZXIoXG5cdFx0aW5zdGFuY2UsXG5cdFx0Y2FtZWxDYXNlKHJlbW92ZVByZWZpeGVzRnJvbUZpZWxkKGluc3RhbmNlLCBmaWVsZE5hbWUpKSArICdSZW5kZXJlZCcsXG5cdFx0ZmllbGRWYWx1ZVxuXHQpO1xuXHRpZiAoaXNVbmRlZmluZWQoaW5zdGFuY2UuZ2V0UmVuZGVyZWQpKSB7XG5cdFx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoaW5zdGFuY2UsICdnZXRSZW5kZXJlZCcsIGdldFJlbmRlcmVkQ2FsbGJhY2spO1xuXHR9XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciB0aGUgYGhhc011bHRpcGxlUHJpbWFyeUtleXNgIGdldHRlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKCk6IGJvb2xlYW59IFRoZSBjYWxsYmFjayBmb3IgaGFzTXVsdGlwbGVQcmltYXJ5S2V5cyBnZXR0ZXJcbiAqL1xuY29uc3QgaGFzTXVsdGlwbGVQcmltYXJ5S2V5c0NhbGxiYWNrID0gKGluc3RhbmNlKSA9PlxuXHRpbnN0YW5jZS5wcmltYXJ5S2V5cy5sZW5ndGggPiAxO1xuXG4vKipcbiAqIENyZWF0ZXMgZ2V0dGVycyBmb3IgcHJpbWFyeSBrZXkgcmVsYXRlZCBkYXRhLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtBcnJheX0gcHJpbWFyeUtleXNcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVByaW1hcnlLZXlGaWVsZEdldHRlcnMgPSAoaW5zdGFuY2UsIHByaW1hcnlLZXlzKSA9PiB7XG5cdGNvbnN0IG9wdHMgPSB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9O1xuXHRpZiAoaXNBcnJheShwcmltYXJ5S2V5cykpIHtcblx0XHRjcmVhdGVHZXR0ZXIoaW5zdGFuY2UsICdwcmltYXJ5S2V5JywgcHJpbWFyeUtleXNbMF0sIG9wdHMpO1xuXHRcdGNyZWF0ZUdldHRlckFuZFNldHRlcihpbnN0YW5jZSwgJ3ByaW1hcnlLZXlzJywgcHJpbWFyeUtleXMsIG9wdHMpO1xuXHRcdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHQnaGFzTXVsdGlwbGVQcmltYXJ5S2V5cycsXG5cdFx0XHRoYXNNdWx0aXBsZVByaW1hcnlLZXlzQ2FsbGJhY2ssXG5cdFx0XHRvcHRzXG5cdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKHN0cmluZyk6IGJvb2xlYW59IFJldHVybnMgYSBjYWxsYmFjayBmb3IgdGhlXG4gKiBoYXNDYWxjdWxhdGVkRmllbGQgZ2V0dGVyXG4gKi9cbmNvbnN0IGhhc0NhbGN1bGF0ZWRGaWVsZENhbGxiYWNrID0gKGluc3RhbmNlKSA9PiAoZmllbGROYW1lVG9DaGVjaykgPT5cblx0IWlzVW5kZWZpbmVkKGluc3RhbmNlW2ZpZWxkTmFtZVRvQ2hlY2tdKTtcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBnZXR0ZXJzIGZvciBhbGwgdGhlIGNhbGN1bGF0ZWQgZmllbGRzIGFuZCB2YWx1ZSBvbiB0aGUgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn1maWVsZHNBbmRWYWx1ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldENhbGN1bGF0ZWRGaWVsZEFuZFZhbHVlcyA9IChpbnN0YW5jZSwgZmllbGRzQW5kVmFsdWVzKSA9PiB7XG5cdGZvckVhY2goZmllbGRzQW5kVmFsdWVzLCAoY2FsY3VsYXRlZEZpZWxkVmFsdWUsIGNhbGN1bGF0ZWRGaWVsZE5hbWUpID0+IHtcblx0XHRpZiAoY2FsY3VsYXRlZEZpZWxkTmFtZSAhPT0gJ19wcm90ZWN0ZWQnKSB7XG5cdFx0XHRjcmVhdGVHZXR0ZXIoXG5cdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHRjYW1lbENhc2UoY2FsY3VsYXRlZEZpZWxkTmFtZSksXG5cdFx0XHRcdGNhbGN1bGF0ZWRGaWVsZFZhbHVlXG5cdFx0XHQpO1xuXHRcdH1cblx0fSk7XG5cdGNyZWF0ZUNhbGxiYWNrR2V0dGVyKFxuXHRcdGluc3RhbmNlLFxuXHRcdCdoYXNDYWxjdWxhdGVkRmllbGQnLFxuXHRcdGhhc0NhbGN1bGF0ZWRGaWVsZENhbGxiYWNrXG5cdCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBnZXR0ZXJzIGZvciB0aGUgdmFyaW91cyByZXNvdXJjZSBsaW5rcyBvbiB0aGUgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn1maWVsZHNBbmRWYWx1ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldFJlc291cmNlcyA9IChpbnN0YW5jZSwgZmllbGRzQW5kVmFsdWVzKSA9PiB7XG5cdGNvbnN0IHJlbGF0aW9ucyA9IFtdO1xuXHRsZXQgcmVsYXRpb25OYW1lO1xuXHRmb3JFYWNoKGZpZWxkc0FuZFZhbHVlcywgKHJlc291cmNlVmFsdWUsIHJlc291cmNlTmFtZSkgPT4ge1xuXHRcdGlmIChyZXNvdXJjZU5hbWUgPT09ICdzZWxmJykge1xuXHRcdFx0Y3JlYXRlR2V0dGVyKGluc3RhbmNlLCAncmVzb3VyY2VMaW5rJywgcmVzb3VyY2VWYWx1ZVswXS5ocmVmKTtcblx0XHR9IGVsc2UgaWYgKHJlc291cmNlTmFtZSA9PT0gJ2NvbGxlY3Rpb24nKSB7XG5cdFx0XHRjcmVhdGVHZXR0ZXIoXG5cdFx0XHRcdGluc3RhbmNlLFxuXHRcdFx0XHQnY29sbGVjdGlvblJlc291cmNlTGluaycsXG5cdFx0XHRcdHJlc291cmNlVmFsdWVbMF0uaHJlZlxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVsYXRpb25OYW1lID0gZ2V0UmVsYXRpb25OYW1lRnJvbUxpbmsocmVzb3VyY2VOYW1lKTtcblx0XHRcdHJlbGF0aW9ucy5wdXNoKHJlbGF0aW9uTmFtZSk7XG5cdFx0XHRzZXRSZWxhdGlvbnNSZXNvdXJjZShcblx0XHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRcdHJlbGF0aW9uTmFtZSArICdSZXNvdXJjZScsXG5cdFx0XHRcdHJlc291cmNlVmFsdWVcblx0XHRcdCk7XG5cdFx0fVxuXHR9KTtcblx0Ly9zZXQgcmVsYXRpb25zIGdldHRlclxuXHRjcmVhdGVHZXR0ZXIoaW5zdGFuY2UsICdnZXRSZWxhdGlvbnMnLCByZWxhdGlvbnMpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKHN0cmluZyk6IE9iamVjdH0gUmV0dXJucyB0aGUgY2FsbGJhY2sgZm9yIGdldHRpbmcgYVxuICogcmVsYXRpb24gcmVzb3VyY2VcbiAqL1xuY29uc3QgZ2V0UmVsYXRpb25SZXNvdXJjZUNhbGxiYWNrID0gKGluc3RhbmNlKSA9PiAocmVsYXRpb25OYW1lKSA9PlxuXHRpbnN0YW5jZVtyZWxhdGlvbk5hbWUucmVwbGFjZSgnUmVzb3VyY2UnLCAnJyldO1xuXG4vKipcbiAqIENyZWF0ZXMgZ2V0dGVycyBmb3IgdGhlIHJlbGF0aW9ucyByZXNvdXJjZSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCBzdHJpbmc+fSByZXNvdXJjZUluZm9cbiAqL1xuZXhwb3J0IGNvbnN0IHNldFJlbGF0aW9uc1Jlc291cmNlID0gKGluc3RhbmNlLCByZWxhdGlvbk5hbWUsIHJlc291cmNlSW5mbykgPT4ge1xuXHRjcmVhdGVHZXR0ZXIoaW5zdGFuY2UsIHJlbGF0aW9uTmFtZSwge1xuXHRcdHJlc291cmNlTGluazogcmVzb3VyY2VJbmZvWzBdLmhyZWYsXG5cdFx0c2luZ2xlOiByZXNvdXJjZUluZm9bMF0uc2luZ2xlLFxuXHR9KTtcblx0aWYgKGlzVW5kZWZpbmVkKGluc3RhbmNlLmdldFJlbGF0aW9uUmVzb3VyY2UpKSB7XG5cdFx0Y3JlYXRlQ2FsbGJhY2tHZXR0ZXIoXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdCdnZXRSZWxhdGlvblJlc291cmNlJyxcblx0XHRcdGdldFJlbGF0aW9uUmVzb3VyY2VDYWxsYmFja1xuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogU2V0cyB0aGUgaW50ZXJuYWwgc2F2ZSBzdGF0ZSB0byB0aGUgZ2l2ZW4gdmFsdWUgd2hlbiBjdXJyZW50IHN0YXRlIGlzXG4gKiBTQVZFX1NUQVRFLmNsZWFuIG90aGVyd2lzZSBjdXJyZW50IHNhdmUgc3RhdGUgaXMgcmV0YWluZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gc2F2ZVN0YXRlIEV4cGVjdGVkIHRvIGJlIG9uZSBvZiBTQVZFX1NUQVRFIGNvbnN0YW50IHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3ZlcnJpZGUgU2V0IHRvIHRydWUgd2hlbiBvdmVycmlkaW5nIHRoZSBkZWZhdWx0IGxvZ2ljIGZvclxuICogc2V0dGluZyBzdGF0ZS4gIFdoZW4gdHJ1ZSwgdGhlIHNhdmVTdGF0ZSBpcyBzZXQgdG8gd2hhdGV2ZXIgdGhlIGluY29taW5nXG4gKiBzYXZlU3RhdGUgdmFsdWUgaXMuXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRTYXZlU3RhdGUgPSAoaW5zdGFuY2UsIHNhdmVTdGF0ZSwgb3ZlcnJpZGUgPSBmYWxzZSkgPT4ge1xuXHRjb25zdCBjdXJyZW50U3RhdGUgPSBpbnN0YW5jZVtQUklWQVRFX1BST1BFUlRJRVMuU0FWRV9TVEFURV07XG5cdHN3aXRjaCAoc2F2ZVN0YXRlKSB7XG5cdFx0Y2FzZSBTQVZFX1NUQVRFLkRJUlRZOlxuXHRcdGNhc2UgU0FWRV9TVEFURS5ORVc6XG5cdFx0Y2FzZSBTQVZFX1NUQVRFLkNMRUFOOlxuXHRcdFx0aWYgKG92ZXJyaWRlKSB7XG5cdFx0XHRcdGluc3RhbmNlW1BSSVZBVEVfUFJPUEVSVElFUy5TQVZFX1NUQVRFXSA9IHNhdmVTdGF0ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpbnN0YW5jZVtQUklWQVRFX1BST1BFUlRJRVMuU0FWRV9TVEFURV0gPVxuXHRcdFx0XHRjdXJyZW50U3RhdGUgPT09IFNBVkVfU1RBVEUuQ0xFQU4gPyBzYXZlU3RhdGUgOiBjdXJyZW50U3RhdGU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRBcmd1bWVudChcblx0XHRcdFx0J1NhdmUgc3RhdGUgZm9yIGVudGl0eSBjYW4gb25seSBiZSBzZXQgdG8gZWl0aGVyICcgK1xuXHRcdFx0XHRcdCdTQVZFX1NUQVRFLkRJUlRZLCBTQVZFX1NUQVRFLk5FVyBvciBTQVZFX1NUQVRFLkNMRUFOJ1xuXHRcdFx0KTtcblx0fVxufTtcblxuLyoqXG4gKiBBZGQgdGhlIGZpZWxkIG5hbWUgdG8gdGhlIGZpZWxkVG9QZXJzaXN0T25JbnNlcnQgcHJvcGVydHkgb24gdGhlIGluc3RhbmNlXG4gKiBpZiBpdCBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRGaWVsZFRvUGVyc2lzdCA9IChpbnN0YW5jZSwgZmllbGROYW1lKSA9PiB7XG5cdGlmIChpbnN0YW5jZS5maWVsZHNUb1BlcnNpc3RPbkluc2VydCkge1xuXHRcdGluc3RhbmNlLmZpZWxkc1RvUGVyc2lzdE9uSW5zZXJ0LmFkZChmaWVsZE5hbWUpO1xuXHR9XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzUGxhaW5PYmplY3QsIGNhbWVsQ2FzZSwgbGFzdCwgcGljaywgcGlja0J5LCBpc0FycmF5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGluc3RhbmNlT2YgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdE1vbmV5LFxuXHRTaXRlQ3VycmVuY3ksXG5cdFNlcnZlckRhdGVUaW1lIGFzIERhdGVUaW1lLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWx1ZS1vYmplY3RzJztcblxuaW1wb3J0IHsgcGx1cmFsTW9kZWxOYW1lIH0gZnJvbSAnLi4vbW9kZWwtbmFtZXMnO1xuXG5pbXBvcnQge1xuXHRoYXNSYXdQcm9wZXJ0eSxcblx0aGFzUHJldHR5UHJvcGVydHksXG5cdGhhc1JlbmRlcmVkUHJvcGVydHksXG5cdGlzRGF0ZVRpbWVGaWVsZCxcblx0aXNNb25leUZpZWxkLFxuXHRpc1ByaW1hcnlLZXlGaWVsZCxcblx0aXNFbnRpdHlGaWVsZCxcbn0gZnJvbSAnLi9ib29sZWFucyc7XG5pbXBvcnQgeyB2YWxpZGF0ZVR5cGVGb3JGaWVsZCB9IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5pbXBvcnQgeyBWQUxJREFURV9UWVBFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIFRoaXMgcmVjZWl2ZXMgYSBmaWVsZCBuYW1lLCBpdCdzIHZhbHVlIGFuZCB0aGUgc2NoZW1hIGFuZCBjb252ZXJ0cyBpdCB0byB0aGVcbiAqIHJlbGF0ZWQgdmFsdWUgb2JqZWN0IElGIHRoZSBzY2hlbWEgaW5kaWNhdGVzIGl0IGlzIG9mIGEgdHlwZSB0aGF0IHRoZXJlIGlzIGFcbiAqIGtub3duIHZhbHVlIG9iamVjdCBmb3IuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtEYXRlVGltZXxNb25leXwqfSAgSWYgdGhpcyBpcyBub3QgYSB2YWx1ZSBvYmplY3QsIHRoZSBvcmlnaW5hbCBmaWVsZFxuICogdmFsdWUgaXMgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBtYXliZUNvbnZlcnRUb1ZhbHVlT2JqZWN0ID0gKGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgc2NoZW1hKSA9PiB7XG5cdGlmIChcblx0XHRpc0RhdGVUaW1lRmllbGQoZmllbGROYW1lLCBzY2hlbWEpICYmXG5cdFx0IURhdGVUaW1lLnZhbGlkYXRlSXNEYXRlVGltZShmaWVsZFZhbHVlKVxuXHQpIHtcblx0XHRyZXR1cm4gRGF0ZVRpbWUuZnJvbUlTTyhmaWVsZFZhbHVlKTtcblx0fVxuXHRpZiAoaXNNb25leUZpZWxkKGZpZWxkTmFtZSwgc2NoZW1hKSAmJiAhaW5zdGFuY2VPZihmaWVsZFZhbHVlLCAnTW9uZXknKSkge1xuXHRcdHJldHVybiBuZXcgTW9uZXkoZmllbGRWYWx1ZSwgU2l0ZUN1cnJlbmN5KTtcblx0fVxuXHQvLyBpZiBtb3JlIFZPcyBnZXQgYWRkZWQsIHRoZW4gaW5zdGVhZCBvZiBhZGRpbmcgbW9yZSBpZiBlbHNlIGJsb2Nrc1xuXHQvLyB0byB0aGlzIGZ1bmN0aW9uIGFuZCB0aGUgb25lcyBiZWxvdywgYWxsIFZPIGxvZ2ljIHNob3VsZCBiZSBleHRyYWN0ZWRcblx0Ly8gaW50byBzb21lIGtpbmQgb2YgIFZhbHVlT2JqZWN0RXh0cmFjdG9yIG9iamVjdCB0aGF0IHdvdWxkIGhvbGQgYWxsIG9mXG5cdC8vIHRoZSBuZWNlc3NhcnkgY2FsbGJhY2tzIGZvciBtYW5hZ2luZyB0aGUgZGV0ZWN0aW9uIG9mIFZPIGZpZWxkcyBhbmRcblx0Ly8gY29udmVyc2lvbiBvZiBkYXRhIHRvIGFuZCBmcm9tIHRoZSB2YXJpb3VzIFZPc1xuXHQvLyBwbHogc2VlOlxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vZXZlbnRlc3ByZXNzby9ldmVudC1lc3ByZXNzby1jb3JlL3B1bGwvNjM3L2ZpbGVzI3IyMjg2OTA3ODlcblx0cmV0dXJuIGZpZWxkVmFsdWU7XG59O1xuXG4vKipcbiAqIFRoaXMgY29udmVydHMgdGhlIGluY29taW5nIHZhbHVlIGZvciBhIGZpZWxkIHRvIGl0cyBlcXVpdmFsZW50IFwicmF3XCIgdmFsdWVcbiAqIGZyb20gYSB2YWx1ZSBvYmplY3QgaWYgaXQgaXMgYSB2YWx1ZSBvYmplY3QuICBPdGhlcndpc2UgaXQganVzdCByZXR1cm5zIHRoZVxuICogb3JpZ2luYWwgaW5jb21pbmcgdmFsdWUuICBUaGlzIGFsc28gYXNzZXJ0cyB0aGF0IGlmIHRoZSBwcm92aWRlZCBmaWVsZCBpc1xuICogZXhwZWN0ZWQgdG8gYmUgYSB2YWx1ZSBvYmplY3QgdGhhdCB0aGUgaW5jb21pbmcgdmFsdWUgSVMgYSB2YWxpZCB2YWx1ZSBvYmplY3RcbiAqIGFuZCBpdCBpcyB0aGUgZXhwZWN0ZWQgaW5zdGFuY2Ugb2YgYSB2YWx1ZSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHsqfE1vbmV5fERhdGVUaW1lfSBmaWVsZFZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtzdHJpbmd8bnVtYmVyfCp9ICBJZiB0aGUgdmFsdWUgaXMgbm90IGEgdmFsdWUgb2JqZWN0LCByZXR1cm5zIHRoZVxuICogb3JpZ2luYWwgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IG1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdFdpdGhBc3NlcnRpb25zID0gKFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdHNjaGVtYVxuKSA9PiB7XG5cdGlmIChpc0RhdGVUaW1lRmllbGQoZmllbGROYW1lLCBzY2hlbWEpKSB7XG5cdFx0RGF0ZVRpbWUuYXNzZXJ0SXNEYXRlVGltZShmaWVsZFZhbHVlKTtcblx0XHRmaWVsZFZhbHVlID0gZmllbGRWYWx1ZS50b0lTTygpO1xuXHR9IGVsc2UgaWYgKGlzTW9uZXlGaWVsZChmaWVsZE5hbWUsIHNjaGVtYSkpIHtcblx0XHRNb25leS5hc3NlcnRNb25leShmaWVsZFZhbHVlKTtcblx0XHRmaWVsZFZhbHVlID0gZmllbGRWYWx1ZS50b051bWJlcigpO1xuXHR9XG5cdHJldHVybiBmaWVsZFZhbHVlO1xufTtcblxuLyoqXG4gKiBUaGlzIGNvbnZlcnRzIHRoZSBpbmNvbWluZyB2YWx1ZSBmb3IgYSBmaWVsZCB0byBpdHMgZXF1aXZhbGVudCBcInJhd1wiIHZhbHVlXG4gKiBpZiB0aGUgaW5jb21pbmcgdmFsdWUgIGlzIGEgdmFsdWUgb2JqZWN0LiAgT3RoZXJ3aXNlIGl0IGp1c3QgcmV0dXJucyB0aGVcbiAqIG9yaWdpbmFsIGluY29taW5nIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7KnxEYXRlVGltZXxNb25leX1maWVsZFZhbHVlXG4gKiBAcmV0dXJuIHsqfSBUaGUgcmF3IHZhbHVlIGZvciB0aGUgdmFsdWUgb2JqZWN0IG9yIHRoZSBvcmlnaW5hbCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IG1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdCA9IChmaWVsZFZhbHVlKSA9PiB7XG5cdGlmIChEYXRlVGltZS52YWxpZGF0ZUlzRGF0ZVRpbWUoZmllbGRWYWx1ZSkpIHtcblx0XHRmaWVsZFZhbHVlID0gZmllbGRWYWx1ZS50b0lTTygpO1xuXHR9IGVsc2UgaWYgKGluc3RhbmNlT2YoZmllbGRWYWx1ZSwgJ01vbmV5JykpIHtcblx0XHRmaWVsZFZhbHVlID0gZmllbGRWYWx1ZS50b051bWJlcigpO1xuXHR9XG5cdHJldHVybiBmaWVsZFZhbHVlO1xufTtcblxuLyoqXG4gKiBUaGlzIGRlcml2ZXMgdGhlIFwicHJlcGFyZWRcIiB2YWx1ZSBmb3IgdGhlIGdpdmVuIGZpZWxkIGFuZCB2YWx1ZS5cbiAqXG4gKiBcIlByZXBhcmVkXCIgbWVhbnM6XG4gKlxuICogLSBjb252ZXJ0aW5nIHRvIGEgdmFsdWUgb2JqZWN0IGlmIHRoaXMgaXMgYSBmaWVsZCB0aGF0IHRoZXJlIGFyZSBkZWZpbmVkXG4gKiAgIHZhbHVlIG9iamVjdHMgZm9yLlxuICogLSByZXRyaWV2aW5nIHRoZSBcInJhd1wiIHZhbHVlIGZyb20gZmllbGQgdmFsdWVzIHRoYXQgaGF2ZSBgcmF3YCBhbmQgYHJlbmRlcmVkYFxuICogICBvciBgcHJldHR5YCBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWVcbiAqIEBwYXJhbSB7Kn0gIGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZVxuICogQHJldHVybiB7RGF0ZVRpbWV8TW9uZXl8Kn0gIFJldHVybnMgdGhlIG9yaWdpbmFsIGluY29taW5nIHZhbHVlIGlmIGl0IGRvZXNcbiAqIG5vdCBoYXZlIGEgcmF3IGVxdWl2YWxlbnQgb3IgaXMgbm90IGEgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY29uc3QgZGVyaXZlUHJlcGFyZWRWYWx1ZUZvckZpZWxkID0gKFxuXHRmaWVsZE5hbWUsXG5cdGZpZWxkVmFsdWUsXG5cdGluc3RhbmNlXG4pID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvblR5cGUgPSB2YWxpZGF0ZVR5cGVGb3JGaWVsZChmaWVsZE5hbWUsIGluc3RhbmNlKTtcblx0ZmllbGRWYWx1ZSA9IGlzUGxhaW5PYmplY3QoZmllbGRWYWx1ZSlcblx0XHQ/IGZpZWxkVmFsdWVbdmFsaWRhdGlvblR5cGVdXG5cdFx0OiBmaWVsZFZhbHVlO1xuXHRyZXR1cm4gbWF5YmVDb252ZXJ0VG9WYWx1ZU9iamVjdChmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIGluc3RhbmNlLnNjaGVtYSk7XG59O1xuXG4vKipcbiAqIFRoaXMgcmV0dXJucyB0aGUgXCJyZW5kZXJlZFwiIG9yIFwicHJldHR5XCIgZXF1aXZhbGVudCBmcm9tIGEgdmFsdWUgaWYgaXQgZXhpc3RzXG4gKiBhcyBhIHByb3BlcnR5IG9uIGl0LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4geyp9ICBUaGUgb3JpZ2luYWwgdmFsdWUgaXMgcmV0dXJuZWQgaWYgaXRzIG5vdCBhIHBsYWluIG9iamVjdCBvciBpZlxuICogaXQgaGFzIG5vIGByZW5kZXJlZGAgb3IgYHByZXR0eWAgcHJvcGVydHkuICBIb3dldmVyLCBpZiBpdCBpcyBhIHBsYWluIG9iamVjdFxuICogYW5kIGhhcyBubyBwcmV0dHkvcmVuZGVyZWQgcHJvcGVydGllcyBidXQgRE9FUyBoYXZlIGEgcmF3IHByb3BlcnR5LCB0aGVuIHRoYXRcbiAqIGlzIHJldHVybmVkLlxuICovXG5leHBvcnQgY29uc3QgZGVyaXZlUmVuZGVyZWRWYWx1ZSA9ICh2YWx1ZSkgPT4ge1xuXHRpZiAoIWlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhbHVlID0gaGFzUHJldHR5UHJvcGVydHkodmFsdWUpID8gdmFsdWUucHJldHR5IDogdmFsdWU7XG5cdHZhbHVlID0gaGFzUmVuZGVyZWRQcm9wZXJ0eSh2YWx1ZSkgPyB2YWx1ZS5yZW5kZXJlZCA6IHZhbHVlO1xuXHRyZXR1cm4gaGFzUmF3UHJvcGVydHkodmFsdWUpID8gdmFsdWUucmF3IDogdmFsdWU7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG5hbWUgb2YgYSByZXNvdXJjZSBmcm9tIHRoZSBnaXZlbiBgcmVzb3VyY2VMaW5rYC5cbiAqXG4gKiBlZy4gXCJodHRwczovL2FwaS5ldmVudGVzcHJlc3NvLmNvbS9yZWdpc3RyYXRpb25cIiB3aWxsIHJldHVybiAncmVnaXN0cmF0aW9uJztcbiBcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUxpbmtcbiAqIEByZXR1cm4ge3N0cmluZ30gUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgcmVzb3VyY2UgZnJvbSBhIHByb3ZpZGVkIHJlc291cmNlXG4gKiBsaW5rLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UmVsYXRpb25OYW1lRnJvbUxpbmsgPSAocmVzb3VyY2VMaW5rKSA9PiB7XG5cdHJldHVybiBwbHVyYWxNb2RlbE5hbWUoY2FtZWxDYXNlKGxhc3QocmVzb3VyY2VMaW5rLnNwbGl0KCcvJykpKSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwbGFpbiBvYmplY3QgY29udGFpbmluZyB0aGUgZW50aXR5IGZpZWxkIG5hbWVzIGFuZCB2YWx1ZXMgZnJvbSB0aGVcbiAqIHByb3ZpZGVkIGVudGl0eSBpbnN0YW5jZS4gIFRoZSB2YWx1ZXMgYXJlIG5vdCBwcmVwYXJlZCBhbmQgbWF0Y2ggZXhhY3RseSB3aGF0XG4gKiBpcyBjdXJyZW50bHkgc2V0IG9uIHRoaXMgZW50aXR5LlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eX0gZW50aXR5SW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgcGxhaW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyA9IChlbnRpdHlJbnN0YW5jZSkgPT4ge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMoZW50aXR5SW5zdGFuY2UpLnJlZHVjZSgoZmllbGRzQW5kVmFsdWVzLCBmaWVsZE5hbWUpID0+IHtcblx0XHRpZiAoXG5cdFx0XHRpc0VudGl0eUZpZWxkKGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hKSAmJlxuXHRcdFx0IWlzUHJpbWFyeUtleUZpZWxkKGZpZWxkTmFtZSwgZW50aXR5SW5zdGFuY2Uuc2NoZW1hKVxuXHRcdCkge1xuXHRcdFx0ZmllbGRzQW5kVmFsdWVzW2ZpZWxkTmFtZV0gPSBlbnRpdHlJbnN0YW5jZVtmaWVsZE5hbWVdO1xuXHRcdFx0cmV0dXJuIGZpZWxkc0FuZFZhbHVlcztcblx0XHR9XG5cdFx0cmV0dXJuIGZpZWxkc0FuZFZhbHVlcztcblx0fSwge30pO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGVudGl0eSBmaWVsZCBuYW1lIGFuZCB2YWx1ZXMgZnJvbSB0aGVcbiAqIHByb3ZpZGVkIGVudGl0eSBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbnRpdHlJbnN0YW5jZVxuICogQHBhcmFtIHtib29sZWFufSBmb3JJbnNlcnQgIFdoZXRoZXIgdG8gcmV0dXJuIHRoZSBmaWVsZHMgYW5kIHZhbHVlcyBmb3JcbiAqIGluc2VydCBvciBmb3IgdXBkYXRlLlxuICogQHJldHVybiB7T2JqZWN0fSBBIHBsYWluIG9iamVjdFxuICovXG5leHBvcnQgY29uc3QgZ2V0QmFzZUZpZWxkc0FuZFZhbHVlc0ZvclBlcnNpc3RpbmcgPSAoXG5cdGVudGl0eUluc3RhbmNlLFxuXHRmb3JJbnNlcnQgPSBmYWxzZVxuKSA9PiB7XG5cdGNvbnN0IGl0ZXJhdG9yID0gZm9ySW5zZXJ0XG5cdFx0PyBBcnJheS5mcm9tKGVudGl0eUluc3RhbmNlLmZpZWxkc1RvUGVyc2lzdE9uSW5zZXJ0LnZhbHVlcygpKVxuXHRcdDogT2JqZWN0LmtleXMoZW50aXR5SW5zdGFuY2UpO1xuXG5cdHJldHVybiBpdGVyYXRvci5yZWR1Y2UoKGZpZWxkc0FuZFZhbHVlcywgZmllbGROYW1lKSA9PiB7XG5cdFx0aWYgKFxuXHRcdFx0aXNFbnRpdHlGaWVsZChmaWVsZE5hbWUsIGVudGl0eUluc3RhbmNlLnNjaGVtYSkgJiZcblx0XHRcdCFpc1ByaW1hcnlLZXlGaWVsZChmaWVsZE5hbWUsIGVudGl0eUluc3RhbmNlLnNjaGVtYSlcblx0XHQpIHtcblx0XHRcdGZpZWxkc0FuZFZhbHVlc1tmaWVsZE5hbWVdID0gbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0KFxuXHRcdFx0XHRlbnRpdHlJbnN0YW5jZVtmaWVsZE5hbWVdXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIGZpZWxkc0FuZFZhbHVlcztcblx0XHR9XG5cdFx0cmV0dXJuIGZpZWxkc0FuZFZhbHVlcztcblx0fSwge30pO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwcmltYXJ5IGtleShzKSBhbmQgdmFsdWVzIGZvciB0aGUgZ2l2ZW4gZW50aXR5SW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZW50aXR5SW5zdGFuY2VcbiAqIEByZXR1cm4ge09iamVjdH0gYW4gYXJyYXkgb2YgdmFsdWVzIGZvciB0aGUgcHJpbWFyeSBrZXlzLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UHJpbWFyeUtleVZhbHVlcyA9IChlbnRpdHlJbnN0YW5jZSkgPT5cblx0cGljayhlbnRpdHlJbnN0YW5jZSwgZW50aXR5SW5zdGFuY2UucHJpbWFyeUtleXMpO1xuXG4vKipcbiAqIFRoaXMgcmV0dXJucyBhIHBsYWluIG9iamVjdCBvZiBlbnRpdHkgZmllbGRzIGZyb20gdGhlIHNjaGVtYSBmb3IgdGhlIGVudGl0eVxuICogaW5zdGFuY2UgKHNjaGVtYSBmb3IgZmllbGRzIGFyZSBleHRyYWN0ZWQgYXMgd2VsbCkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVudGl0eUluc3RhbmNlXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgcGxhaW4gb2JqZWN0IHdpdGggZmllbGRzIGFuZCBzY2hlbWEgcHJvcGVydGllcyB0aGF0IGFyZVxuICogZW50aXR5IHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRFbnRpdHlGaWVsZHNGcm9tU2NoZW1hID0gKGVudGl0eUluc3RhbmNlKSA9PlxuXHRwaWNrQnkoZW50aXR5SW5zdGFuY2Uuc2NoZW1hLCAoZmllbGRWYWx1ZSwgZmllbGROYW1lKSA9PlxuXHRcdGlzRW50aXR5RmllbGQoZmllbGROYW1lLCBlbnRpdHlJbnN0YW5jZS5zY2hlbWEpXG5cdCk7XG5cbi8qKlxuICogVGhpcyByZXR1cm5zIGEgcGxhaW4gb2JqZWN0IG9mIGV4dHJhY3RlZCBwcmltYXJ5S2V5IGZpZWxkcyBmcm9tIHRoZSBzY2hlbWFcbiAqIGZvciB0aGUgZW50aXR5IGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbnRpdHlJbnN0YW5jZVxuICogQHJldHVybiB7T2JqZWN0fSBBIHBsYWluIG9iamVjdCB3aXRoIGZpZWxkcyBhbmQgc2NoZW1hIHByb3BlcnRpZXMgdGhhdFxuICogXHRcdFx0XHRcdHJlcHJlc2VudCBwcmltYXJ5IGtleSBmaWVsZHMuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmltYXJ5S2V5RmllbGRzRnJvbVNjaGVtYSA9IChlbnRpdHlJbnN0YW5jZSkgPT5cblx0cGlja0J5KGVudGl0eUluc3RhbmNlLnNjaGVtYSwgKGZpZWxkVmFsdWUsIGZpZWxkTmFtZSkgPT5cblx0XHRpc1ByaW1hcnlLZXlGaWVsZChmaWVsZE5hbWUsIGVudGl0eUluc3RhbmNlLnNjaGVtYSlcblx0KTtcblxuLyoqXG4gKiBEZXJpdmVzIHRoZSBkZWZhdWx0IHZhbHVlIHRvIHVzZSBmb3IgYSBnaXZlbiB0eXBlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHsqfSAgQSB2YWx1ZSB0byB1c2UgZm9yIHRoZSBnaXZlbiB0eXBlLlxuICovXG5leHBvcnQgY29uc3QgZGVyaXZlRGVmYXVsdFZhbHVlRm9yVHlwZSA9ICh0eXBlKSA9PiB7XG5cdGlmIChpc0FycmF5KHR5cGUpKSB7XG5cdFx0cmV0dXJuIHR5cGUuaW5kZXhPZignbnVsbCcpID4gLTFcblx0XHRcdD8gbnVsbFxuXHRcdFx0OiBkZXJpdmVEZWZhdWx0VmFsdWVGb3JUeXBlKHR5cGVbMF0pO1xuXHR9XG5cdHN3aXRjaCAodHlwZSkge1xuXHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0Y2FzZSAnbnVtYmVyJzpcblx0XHRjYXNlICdpbnRlZ2VyJzpcblx0XHRcdHJldHVybiAwO1xuXHRcdGNhc2UgJ251bGwnOlxuXHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRjYXNlICdib29sZWFuJzpcblx0XHRjYXNlICdib29sJzpcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRjYXNlICdkYXRlLXRpbWUnOlxuXHRcdFx0cmV0dXJuIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogRGVyaXZlcyB3aGF0IGB0eXBlYCBhIGZpZWxkIGlzIGZyb20gdGhlIHNjaGVtYS5cbiAqIEl0IGFjY291bnRzIGZvciBjYXNlcyB3aGVyZSB0aGUgXCJ0eXBlXCIgb2YgYSBmaWVsZCBtaWdodCBiZSBgZGF0ZS10aW1lYCBvclxuICogd2hlcmUgdGhlIHR5cGUgaXMgYW4gb2JqZWN0IGFuZCB0aHVzIHRoZSBgdHlwZWAgZm9yIHRoZSBwdXJwb3NlcyBvZiBtb2RlbFxuICogZW50aXRpZXMgaXMgZGVmaW5lZCBieSB0aGUgYHJhd2AgcHJvcGVydHkgZm9yIHRoZSBmaWVsZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHsqfSAgV2hhdCB0eXBlIHRoZSBmaWxlZCBpcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlcml2ZVR5cGVGb3JGaWVsZCA9IChmaWVsZE5hbWUsIHNjaGVtYSkgPT4ge1xuXHRpZiAoaXNEYXRlVGltZUZpZWxkKGZpZWxkTmFtZSwgc2NoZW1hKSkge1xuXHRcdHJldHVybiAnZGF0ZS10aW1lJztcblx0fVxuXHRpZiAoc2NoZW1hW2ZpZWxkTmFtZV0gJiYgc2NoZW1hW2ZpZWxkTmFtZV0udHlwZSkge1xuXHRcdGlmIChzY2hlbWFbZmllbGROYW1lXS50eXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRzY2hlbWFbZmllbGROYW1lXS5wcm9wZXJ0aWVzICYmXG5cdFx0XHRcdGhhc1Jhd1Byb3BlcnR5KHNjaGVtYVtmaWVsZE5hbWVdLnByb3BlcnRpZXMpXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuIHNjaGVtYVtmaWVsZE5hbWVdLnByb3BlcnRpZXMucmF3LnR5cGVcblx0XHRcdFx0XHQ/IHNjaGVtYVtmaWVsZE5hbWVdLnByb3BlcnRpZXMucmF3LnR5cGVcblx0XHRcdFx0XHQ6IG51bGw7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIHNjaGVtYVtmaWVsZE5hbWVdLnR5cGU7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIFRoaXMgZGVyaXZlcyB0aGUgdmFsaWRhdGUgdHlwZSBmcm9tIHRoZSBpbmNvbWluZyBmaWVsZCBhbmQgdmFsdWUgYWNjb3JkaW5nXG4gKiB0byB0aGUgc2NoZW1hIGFuZCBpbmNvbWluZyB2YWx1ZS5cbiAqXG4gKiBUaGlzIGFjY291bnRzIGZvciB0aGUgZmFjdCB0aGF0IGVudGl0aWVzIG1heSBiZSBjb25zdHJ1Y3RlZCBmcm9tIHRoZVxuICogZm9sbG93aW5nIGNvbnRleHRzOlxuICpcbiAqIDEuIEF1dGhlZCBSRVNUIHJlc3BvbnNlICh3aGljaCBjb3VsZCBoYXZlIGJvdGggcmF3LCByZW5kZXJlZCBvciBwcmV0dHlcbiAqICAgIHZhbHVlcyBpbiB0aGUgZmllbGQgdmFsdWUpLlxuICogMi4gTm9uLWF1dGhlZCBSRVNUIHJlc3BvbnNlICh3aGljaCB3aWxsIG5vdCBoYXZlIGEgcmF3IHZhbHVlLCBidXQgY291bGQgaGF2ZVxuICogICAgYSBwcmV0dHkgb3IgcmVuZGVyZWQgdmFsdWUpLiAgVGhpcyBpcyBwb3RlbnRpYWxseSBwcm9ibGVtYXRpYyBpZiB0aGVcbiAqICAgIHJlbmRlcmVkIG9yIHByZXR0eSB2YWx1ZSBpcyBvZiBhIGRpZmZlcmVudCBkYXRhIHR5cGUgdGhhbiB0aGUgcmF3IHZhbHVlLlxuICogMy4gTmV3IGVudGl0aWVzIGJ1aWx0IGNsaWVudCBzaWRlLCB3aGljaCB3aWxsIGJlIGFzc3VtZWQgdG8gYmUgcHJlcGFyZWRcbiAqICAgIGFnYWluc3QgdGhlIFwicmF3XCIgdmFsaWRhdGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge3N5bWJvbH0gIFRoZSB2YWxpZGF0ZSB0eXBlIGZvciB0aGUgZmllbGQuXG4gKi9cbmV4cG9ydCBjb25zdCBkZXJpdmVWYWxpZGF0ZVR5cGVGb3JGaWVsZCA9IChmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIHNjaGVtYSkgPT4ge1xuXHRpZiAoaGFzUmF3UHJvcGVydHkoZmllbGRWYWx1ZSkpIHtcblx0XHRyZXR1cm4gVkFMSURBVEVfVFlQRS5SQVc7XG5cdH1cblx0aWYgKHNjaGVtYVtmaWVsZE5hbWVdICYmIHNjaGVtYVtmaWVsZE5hbWVdLnR5cGUpIHtcblx0XHRpZiAoc2NoZW1hW2ZpZWxkTmFtZV0udHlwZSA9PT0gJ29iamVjdCcgJiYgaXNQbGFpbk9iamVjdChmaWVsZFZhbHVlKSkge1xuXHRcdFx0cmV0dXJuIGhhc1JlbmRlcmVkUHJvcGVydHkoZmllbGRWYWx1ZSlcblx0XHRcdFx0PyBWQUxJREFURV9UWVBFLlJFTkRFUkVEXG5cdFx0XHRcdDogVkFMSURBVEVfVFlQRS5QUkVUVFk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBWQUxJREFURV9UWVBFLlJBVztcbn07XG5cbi8qKlxuICogVGhpcyBnZXRzIHRoZSBkZWZhdWx0IHZhbHVlIGZvciBhIGZpZWxkIGZyb20gdGhlIHByb3ZpZGVkIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHsqfSBUaGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlIGZpZWxkIGZyb20gdGhlIHNjaGVtYSBvciBpZiBub3RcbiAqIHByZXNlbnQgaW4gdGhlIHNjaGVtYSwgYSBkZXJpdmVkIGRlZmF1bHQgdmFsdWUgZnJvbSB0aGUgc2NoZW1hIHR5cGUuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXREZWZhdWx0VmFsdWVGb3JGaWVsZCA9IChmaWVsZE5hbWUsIHNjaGVtYSkgPT4ge1xuXHRpZiAoc2NoZW1hW2ZpZWxkTmFtZV0pIHtcblx0XHRyZXR1cm4gc2NoZW1hW2ZpZWxkTmFtZV0uZGVmYXVsdFxuXHRcdFx0PyBzY2hlbWFbZmllbGROYW1lXS5kZWZhdWx0XG5cdFx0XHQ6IGRlcml2ZURlZmF1bHRWYWx1ZUZvclR5cGUoc2NoZW1hW2ZpZWxkTmFtZV0udHlwZSk7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBjcmVhdGVFbnRpdHlGYWN0b3J5IH0gZnJvbSAnLi9iYXNlLWVudGl0eSc7XG5leHBvcnQgeyBNT0RFTF9QUkVGSVhFUywgU0FWRV9TVEFURSB9IGZyb20gJy4vY29uc3RhbnRzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRpc0FycmF5LFxuXHRpc0ludGVnZXIsXG5cdGlzU3RyaW5nLFxuXHRpc1BsYWluT2JqZWN0LFxuXHRpc0Jvb2xlYW4sXG5cdGlzTnVtYmVyLFxufSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgc3ByaW50ZiB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuXG4vKipcbiAqIEludGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNFbnVtRmllbGQsIGlzUHJpbWFyeUtleUZpZWxkLCBpc1ZhbHVlT2JqZWN0RmllbGQgfSBmcm9tICcuL2Jvb2xlYW5zJztcbmltcG9ydCB7IG1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdFdpdGhBc3NlcnRpb25zIH0gZnJvbSAnLi9leHRyYWN0b3JzJztcbmltcG9ydCB7IFBSSVZBVEVfUFJPUEVSVElFUywgVkFMSURBVEVfVFlQRSB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhlIGluY29taW5nIHZhbHVlIGZvciBnaXZlbiB0eXBlLiAgVHlwZXMgYWxsb3dlZCBhcmU6XG4gKlxuICogLSBpbnRlZ2VyOiBjaGVja3MgaWYgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIC0gbnVtYmVyOiBjaGVja3MgaWYgdmFsdWUgaXMgY2xhc3NpZmllZCBhcyBhIE51bWJlciBwcmltaXRpdmUgb3Igb2JqZWN0ICh0aGlzXG4gKiAgIG1lYW5zIGBJbmZpbml0eWAsIGAtSW5maW5pdHlgLCBhbmQgYE5hTmAgYXJlIGNvbnNpZGVyZWQgdmFsaWQgZm9yIHRoaXMgdHlwZVxuICogLSBzdHJpbmdcbiAqIC0gb2JqZWN0IC0gdGhpcyB2YWxpZGF0ZXMgYXMgYSBcInBsYWluT2JqZWN0XCIsIHRoYXQgaXMgYW4gb2JqZWN0IGNyZWF0ZWQgYnlcbiAqICAgdGhlIE9iamVjdCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIFtbUHJvdG90eXBlXV0gb2YgbnVsbC5cbiAqIC0gYm9vbGVhblxuICogLSBib29sOiAoc2FtZSBhcyBib29sZWFuIGNoZWNrKVxuICogLSBudWxsOiB2YWx1ZSBtdXN0IGV4cGxpY2l0bHkgYmUgYG51bGxgXG4gKlxuICogTm90ZTogaWYgdGhlIHBhc3NlZCBpbiB0eXBlIGRvZXMgbm90IGV4aXN0LCB0aGVuIHRoZSB2YWx1ZSBpcyBjb25zaWRlcmVkXG4gKiBpbnZhbGlkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSB0eXBlICBUaGUgdHlwZSBvciB0eXBlcyB0byBjaGVja1xuICogQHBhcmFtIHsqfSB2YWx1ZSAgVGhlIHZhbHVlIGJlaW5nIHZhbGlkYXRlZFxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhlIHZhbHVlIGlzIHZhbGlkIGZvciB0aGUgZ2l2ZW4gdHlwZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlVHlwZSA9ICh0eXBlLCB2YWx1ZSkgPT4ge1xuXHRsZXQgdmFsaWQgPSBmYWxzZTtcblx0Ly8gYWNjb3VudCBmb3IgdHlwZSBkZWZpbml0aW9ucyB0aGF0IGFyZSBhbiBhcnJheSBvZiBhbGxvd2VkIHR5cGVzLlxuXHRpZiAoaXNBcnJheSh0eXBlKSkge1xuXHRcdGZvciAoY29uc3Qgc2luZ2xlVHlwZSBvZiB0eXBlKSB7XG5cdFx0XHR2YWxpZCA9IHZhbGlkYXRlVHlwZShzaW5nbGVUeXBlLCB2YWx1ZSk7XG5cdFx0XHRpZiAodmFsaWQpIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIHJldHVybiByaWdodCBhd2F5IGJlY2F1c2Ugd2UndmUgZGV0ZXJtaW5lZCB0aGUgdmFsaWRpdHkgb2YgdGhlIHR5cGUuXG5cdFx0cmV0dXJuIHZhbGlkO1xuXHR9XG5cdHN3aXRjaCAodHlwZSkge1xuXHRcdGNhc2UgJ2ludGVnZXInOlxuXHRcdFx0dmFsaWQgPSBpc0ludGVnZXIodmFsdWUpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnbnVtYmVyJzpcblx0XHRcdHZhbGlkID0gaXNOdW1iZXIodmFsdWUpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdHZhbGlkID0gaXNTdHJpbmcodmFsdWUpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdHZhbGlkID0gaXNQbGFpbk9iamVjdCh2YWx1ZSk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdib29sZWFuJzpcblx0XHRjYXNlICdib29sJzpcblx0XHRcdHZhbGlkID0gaXNCb29sZWFuKHZhbHVlKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ251bGwnOlxuXHRcdFx0dmFsaWQgPSB2YWx1ZSA9PT0gbnVsbDtcblx0XHRcdGJyZWFrO1xuXHR9XG5cdHJldHVybiB2YWxpZDtcbn07XG5cbi8qKlxuICogVGhpcyB2YWxpZGF0ZXMgZW51bSB0eXBlIG9mIHZhbHVlcy5cbiAqXG4gKiBUaGlzIG1lYW5zIHRoYXQgdGhlIHZhbHVlIG11c3QgYmUgb25lIG9mIHRoZSBwcm92aWRlZCBhcnJheSBvZiBlbnVtVmFsdWVzIGFzXG4gKiB3ZWxsIGFzIGJlaW5nIG9mIHRoZSBleHBlY3RlZCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0FycmF5fSBlbnVtVmFsdWVzXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGlzIHZhbHVlIGlzIHZhbGlkLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFbnVtVHlwZSA9ICh0eXBlLCBlbnVtVmFsdWVzLCB2YWx1ZSkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdHZhbGlkYXRlVHlwZSh0eXBlLCB2YWx1ZSkgJiZcblx0XHRpc0FycmF5KGVudW1WYWx1ZXMpICYmXG5cdFx0ZW51bVZhbHVlcy5pbmRleE9mKHZhbHVlKSA+IC0xXG5cdCk7XG59O1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGRvZXMgYSBzaGFsbG93IHZhbGlkYXRpb24gZm9yIHRoZSBnaXZlbiB2YWx1ZSBhbmQgZmllbGQuXG4gKlxuICogXCJTaGFsbG93XCIgaGVyZSBtZWFucyB0aGF0IGlmIHRoZSBmaWVsZCBzY2hlbWEgaXMgb2YgdHlwZSAnb2JqZWN0JywgdGhlbiB0aGVcbiAqIHZhbGlkYXRpb24gb25seSB2ZXJpZmllcyB0aGF0IHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuICBUaGUgb2JqZWN0IGNvbnRlbnRzXG4gKiBhcmUgbm90IHZhbGlkYXRlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGROYW1lXG4gKiBAcGFyYW0geyp9IGZpZWxkVmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhwZWN0VmFsdWVPYmplY3RzICBJZiB0cnVlLCB0aGVuIHRoaXMgZmxhZ3MgdGhlIHZhbGlkYXRvclxuICogdG8gYXNzdW1lIHRoZSB2YWx1ZSBtaWdodCBiZSBhIHZhbHVlIG9iamVjdCBhbmQgYXR0ZW1wdCB0byByZXRyaWV2ZSB0aGUgcmF3XG4gKiB2YWx1ZSBmcm9tIHRoYXQgdmFsdWUgb2JqZWN0IGZvciB2YWxpZGF0aW9uIGFnYWluc3QgdGhlIGV4cGVjdGVkIHR5cGUgaW4gdGhlXG4gKiBzY2hlbWEgZm9yIHRoYXQgZmllbGQuXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyB0aGUgdmFsdWUgaXMgdmFsaWQuXG4gKiBAdGhyb3dzIFR5cGVFcnJvclxuICogQHRocm93cyBJbnZhbGlkRGF0ZVRpbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2hhbGxvd1ZhbGlkVmFsdWVGb3JGaWVsZCA9IChcblx0ZmllbGROYW1lLFxuXHRmaWVsZFZhbHVlLFxuXHRzY2hlbWEsXG5cdGV4cGVjdFZhbHVlT2JqZWN0cyA9IHRydWVcbikgPT4ge1xuXHQvLyBpZiBmaWVsZCBpcyBhIHByaW1hcnkgS2V5IGZpZWxkIHRoZW4gd2Ugb3ZlcnJpZGUgdGhlIHZhbGlkYXRpb24gc28gaXQgY2FuXG5cdC8vIGJlIGVpdGhlciBzdHJpbmcgb3IgbnVtYmVyXG5cdGlmIChpc1ByaW1hcnlLZXlGaWVsZChmaWVsZE5hbWUsIHNjaGVtYSkpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dmFsaWRhdGVUeXBlKCdzdHJpbmcnLCBmaWVsZFZhbHVlKSB8fFxuXHRcdFx0dmFsaWRhdGVUeXBlKCdudW1iZXInLCBmaWVsZFZhbHVlKVxuXHRcdCk7XG5cdH1cblx0Y29uc3QgaXNFbnVtID0gaXNFbnVtRmllbGQoZmllbGROYW1lLCBzY2hlbWEpO1xuXHRjb25zdCBpc1ZhbHVlT2JqZWN0ID0gaXNWYWx1ZU9iamVjdEZpZWxkKGZpZWxkTmFtZSwgc2NoZW1hKTtcblx0ZmllbGRWYWx1ZSA9XG5cdFx0ZXhwZWN0VmFsdWVPYmplY3RzICYmIGlzVmFsdWVPYmplY3Rcblx0XHRcdD8gbWF5YmVDb252ZXJ0RnJvbVZhbHVlT2JqZWN0V2l0aEFzc2VydGlvbnMoXG5cdFx0XHRcdFx0ZmllbGROYW1lLFxuXHRcdFx0XHRcdGZpZWxkVmFsdWUsXG5cdFx0XHRcdFx0c2NoZW1hXG5cdFx0XHQgIClcblx0XHRcdDogZmllbGRWYWx1ZTtcblx0ZmllbGRWYWx1ZSA9XG5cdFx0ZXhwZWN0VmFsdWVPYmplY3RzICYmXG5cdFx0c2NoZW1hW2ZpZWxkTmFtZV0udHlwZSA9PT0gJ29iamVjdCcgJiZcblx0XHRpc1ZhbHVlT2JqZWN0XG5cdFx0XHQ/IHsgcmF3OiBmaWVsZFZhbHVlIH1cblx0XHRcdDogZmllbGRWYWx1ZTtcblx0Y29uc3QgaXNWYWxpZCA9IGlzRW51bVxuXHRcdD8gdmFsaWRhdGVFbnVtVHlwZShcblx0XHRcdFx0c2NoZW1hW2ZpZWxkTmFtZV0udHlwZSxcblx0XHRcdFx0c2NoZW1hW2ZpZWxkTmFtZV0uZW51bSxcblx0XHRcdFx0ZmllbGRWYWx1ZVxuXHRcdCAgKVxuXHRcdDogdmFsaWRhdGVUeXBlKHNjaGVtYVtmaWVsZE5hbWVdLnR5cGUsIGZpZWxkVmFsdWUpO1xuXHQvLyBpZiBpc0VudW0gYW5kIG5vdCB2YWxpZCwgdGhlbiBsZXRzIGJhaWwgd2l0aCBlcnJvclxuXHRpZiAoaXNFbnVtICYmICFpc1ZhbGlkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdHNwcmludGYoXG5cdFx0XHRcdCdUaGUgZ2l2ZW4gXCIlc1wiIGZpZWxkTmFtZSBpcyBub3QgdmFsaWQgZm9yIHRoZSBkZWZpbmVkIHNjaGVtYS4gIEl0IG11c3QgYmUgYSBcIiVzXCIgYW5kIGl0IG11c3QgYmUgb25lIG9mIFwiJXNcIi4gVGhlIGZpZWxkVmFsdWUgZ2l2ZW4gd2FzIFwiJXNcIicsXG5cdFx0XHRcdGZpZWxkTmFtZSxcblx0XHRcdFx0c2NoZW1hW2ZpZWxkTmFtZV0uZW51bS5qb2luKCksXG5cdFx0XHRcdGZpZWxkVmFsdWVcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cdHJldHVybiBpc1ZhbGlkO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoYXQgaXMgc2V0IGFzIHRoZSB2YWxpZGF0ZVR5cGUgZm9yIHRoZSBnaXZlbiBmaWVsZCBhbmQgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB2YWxpZGF0aW9uIHR5cGUgZm9yIHRoZSBnaXZlbiBmaWVsZCBhbmQgaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVR5cGVGb3JGaWVsZCA9IChmaWVsZE5hbWUsIGluc3RhbmNlKSA9PiB7XG5cdHJldHVybiBpbnN0YW5jZVtQUklWQVRFX1BST1BFUlRJRVMuVkFMSURBVEVfVFlQRVNdW2ZpZWxkTmFtZV1cblx0XHQ/IGluc3RhbmNlW1BSSVZBVEVfUFJPUEVSVElFUy5WQUxJREFURV9UWVBFU11bZmllbGROYW1lXVxuXHRcdDogVkFMSURBVEVfVFlQRS5SQVc7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBNT0RFTF9OQU1FID0gJ2V2ZW50JztcblxuZXhwb3J0IGNvbnN0IEVWRU5UX1NUQVRVU19JRCA9IHtcblx0U09MRF9PVVQ6ICdzb2xkX291dCcsXG5cdFBPU1RQT05FRDogJ3Bvc3Rwb25lZCcsXG5cdENBTkNFTExFRDogJ2NhbmNlbGxlZCcsXG59O1xuXG5leHBvcnQgY29uc3QgRVZFTlRfU1RBVFVTX0lEUyA9IHZhbHVlcyhFVkVOVF9TVEFUVVNfSUQpO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcblx0R1JFQVRFUl9USEFOLFxuXHRHUkVBVEVSX1RIQU5fQU5EX0VRVUFMLFxuXHRMRVNTX1RIQU5fQU5EX0VRVUFMLFxufSBmcm9tICcuLi9iYXNlJztcblxuZXhwb3J0IGNvbnN0IG5vd0RhdGVBbmRUaW1lID0gbW9tZW50KCk7XG5cbi8qKlxuICogRGVzY3JpYmVkIGF0dHJpYnV0ZXMgZm9yIHRoaXMgbW9kZWxcbiAqXG4gKiBAdHlwZSB7e2F0dHJpYnV0ZXM6ICp9fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlEYXRhVHlwZXMgPSB7XG5cdHF1ZXJ5RGF0YTogUHJvcFR5cGVzLnNoYXBlKHtcblx0XHRsaW1pdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRvcmRlckJ5OiBQcm9wVHlwZXMub25lT2YoW1xuXHRcdFx0J0VWVF9uYW1lJyxcblx0XHRcdCdFVlRfSUQnLFxuXHRcdFx0J3N0YXJ0X2RhdGUnLFxuXHRcdFx0J2VuZF9kYXRlJyxcblx0XHRcdCd0aWNrZXRfc3RhcnQnLFxuXHRcdFx0J3RpY2tldF9lbmQnLFxuXHRcdF0pLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoQUxMT1dFRF9PUkRFUl9WQUxVRVMpLFxuXHRcdHNob3dFeHBpcmVkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRjYXRlZ29yeVNsdWc6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0bW9udGg6IFByb3BUeXBlcy5tb250aCxcblx0fSksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICpcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdFx0c2hvd0V4cGlyZWQ6IGJvb2xlYW5cbiAqICAgXHR9XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRRdWVyeURhdGEgPSB7XG5cdHF1ZXJ5RGF0YToge1xuXHRcdGxpbWl0OiAxMDAsXG5cdFx0b3JkZXJCeTogJ3N0YXJ0X2RhdGUnLFxuXHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9ERVNDLFxuXHRcdHNob3dFeHBpcmVkOiBmYWxzZSxcblx0fSxcbn07XG5cbi8qKlxuICogVXNlZCB0byBtYXAgYW4gb3JkZXJCeSBzdHJpbmcgdG8gdGhlIGFjdHVhbCB2YWx1ZSB1c2VkIGluIGEgUkVTVCBxdWVyeSBmcm9tXG4gKiB0aGUgY29udGV4dCBvZiBhbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJCeVxuICpcbiAqIEByZXR1cm4geyBzdHJpbmcgfSBSZXR1cm5zIGFuIGFjdHVhbCBvcmRlckJ5IHN0cmluZyBmb3IgdGhlIFJFU1QgcXVlcnkgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQgYWxpYXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcE9yZGVyQnkgPSAob3JkZXJCeSkgPT4ge1xuXHRjb25zdCBvcmRlckJ5TWFwID0ge1xuXHRcdHN0YXJ0X2RhdGU6ICdEYXRldGltZS5EVFRfRVZUX3N0YXJ0Jyxcblx0XHRlbmRfZGF0ZTogJ0RhdGV0aW1lLkRUVF9FVlRfZW5kJyxcblx0XHR0aWNrZXRfc3RhcnQ6ICdEYXRldGltZS5UaWNrZXQuVEtUX3N0YXJ0X2RhdGUnLFxuXHRcdHRpY2tldF9lbmQ6ICdEYXRldGltZS5UaWNrZXQuVEtUX2VuZF9kYXRlJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKG9yZGVyQnlNYXBbb3JkZXJCeV0pID8gb3JkZXJCeSA6IG9yZGVyQnlNYXBbb3JkZXJCeV07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiBldmVudHMgZW5kcG9pbnQgcmVxdWVzdCB1c2luZyBwcm92aWRlZFxuICogaW5mb3JtYXRpb24uXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBzaG93RXhwaXJlZCAgV2hldGhlciBvciBub3QgdG8gaW5jbHVkZSBleHBpcmVkIGV2ZW50cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjYXRlZ29yeVNsdWcgIFJldHVybiBldmVudHMgZm9yIHRoZSBnaXZlbiBjYXRlZ29yeVNsdWdcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb250aCAgICAgICAgIFJldHVybiBldmVudHMgZm9yIHRoZSBnaXZlbiBtb250aC5cbiAqIFx0XHRcdFx0XHRcdFx0XHQgQ2FuIGJlIGFueSBtb250aCBmb3JtYXQgcmVjb2duaXplZCBieSBtb21lbnQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICBUaGUgYXNzZW1ibGVkIHdoZXJlIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSAoe1xuXHRzaG93RXhwaXJlZCA9IGZhbHNlLFxuXHRjYXRlZ29yeVNsdWcsXG5cdG1vbnRoID0gJ25vbmUnLFxufSkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXG5cdGlmICghc2hvd0V4cGlyZWQpIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RhdGV0aW1lLkRUVF9FVlRfZW5kKipleHBpcmVkXVtdPScgK1xuXHRcdFx0XHRHUkVBVEVSX1RIQU4gK1xuXHRcdFx0XHQnJndoZXJlW0RhdGV0aW1lLkRUVF9FVlRfZW5kKipleHBpcmVkXVtdPScgK1xuXHRcdFx0XHRub3dEYXRlQW5kVGltZS5sb2NhbCgpLmZvcm1hdCgpXG5cdFx0KTtcblx0fVxuXHRpZiAoY2F0ZWdvcnlTbHVnKSB7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtUZXJtX1JlbGF0aW9uc2hpcC5UZXJtX1RheG9ub215LlRlcm0uc2x1Z109JyArIGNhdGVnb3J5U2x1Z1xuXHRcdCk7XG5cdH1cblx0aWYgKG1vbnRoICYmIG1vbnRoICE9PSAnbm9uZScpIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW0RhdGV0aW1lLkRUVF9FVlRfc3RhcnRdW109JyArXG5cdFx0XHRcdEdSRUFURVJfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0XHQnJndoZXJlW0RhdGV0aW1lLkRUVF9FVlRfc3RhcnRdW109JyArXG5cdFx0XHRcdG1vbWVudCgpLm1vbnRoKG1vbnRoKS5zdGFydE9mKCdtb250aCcpLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbRGF0ZXRpbWUuRFRUX0VWVF9lbmRdW109JyArXG5cdFx0XHRcdExFU1NfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0XHQnJndoZXJlW0RhdGV0aW1lLkRUVF9FVlRfZW5kXVtdPScgK1xuXHRcdFx0XHRtb21lbnQoKS5tb250aChtb250aCkuZW5kT2YoJ21vbnRoJykubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oJyYnKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9IChxdWVyeURhdGEgPSB7fSkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyhxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSk7XG59O1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHByaW1hcnlLZXlzIH0gZnJvbSAnLi9wcmltYXJ5LWtleXMuanMnO1xuXG4vKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsga2V5cywgc3RhcnRDYXNlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBwbHVyYWxpemUgZnJvbSAncGx1cmFsaXplJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ21lbWl6ZSc7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBtb2RlbCBuYW1lcyBjdXJyZW50bHkgZXhwb3NlZCBmb3IgUkVTVCBBUEkgcmVxdWVzdC5cbiAqL1xuZXhwb3J0IGNvbnN0IE1PREVMX05BTUVTID0ga2V5cyhwcmltYXJ5S2V5cyk7XG5cbi8qKlxuICogVXNlZCB0byBub3JtYWxpemUgdGhlIHBsdXJhbCBmb3JtIG9mIGEgZ2l2ZW4gbW9kZWwgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICBFbnN1cmVzIHRoZSBnaXZlbiBtb2RlbE5hbWUgaXMgaXRzIHBsdXJhbCBmb3JtLlxuICovXG5leHBvcnQgY29uc3QgcGx1cmFsTW9kZWxOYW1lID0gbWVtb2l6ZSgobW9kZWxOYW1lKSA9PiBwbHVyYWxpemUobW9kZWxOYW1lKSk7XG5cbi8qKlxuICogVXNlZCB0byBub3JtYWxpemUgdGhlIHNpbmd1bGFyIGZvcm0gb2YgYSBnaXZlbiBtb2RlbCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge3N0cmluZ30gRW5zdXJlcyB0aGUgZ2l2ZW4gbW9kZWxOYW1lIGlzIGluIGl0cyBzaW5ndWxhciBmb3JtLlxuICovXG5leHBvcnQgY29uc3Qgc2luZ3VsYXJNb2RlbE5hbWUgPSBtZW1vaXplKChtb2RlbE5hbWUpID0+XG5cdHBsdXJhbGl6ZS5zaW5ndWxhcihtb2RlbE5hbWUpXG4pO1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBjYXBpdGFsaXplZCBzbmFrZWNhc2UgZm9ybWF0IGZvciB0aGUgZ2l2ZW4gbW9kZWwgbmFtZSB0eXBpY2FsbHlcbiAqIHVzZWQgaW4gcXVlcnkgc3RyaW5ncy5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIG1vZGVsTmFtZUZvclF1ZXJ5U3RyaW5nKCAnbWVzc2FnZV90ZW1wbGF0ZV9ncm91cCcgKTtcbiAqIC8vIE1lc3NhZ2VfVGVtcGxhdGVfR3JvdXBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBmb3JtYXR0ZWQgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgbW9kZWxOYW1lRm9yUXVlcnlTdHJpbmcgPSBtZW1vaXplKChtb2RlbE5hbWUpID0+IHtcblx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUobW9kZWxOYW1lKTtcblx0bW9kZWxOYW1lID0gc3RhcnRDYXNlKG1vZGVsTmFtZSk7XG5cdHJldHVybiBtb2RlbE5hbWUucmVwbGFjZSgvXFxzL2csICdfJyk7XG59KTtcbiIsImltcG9ydCAqIGFzIGRhdGVUaW1lTW9kZWwgZnJvbSAnLi9kYXRldGltZSc7XG5pbXBvcnQgKiBhcyBldmVudE1vZGVsIGZyb20gJy4vZXZlbnQnO1xuaW1wb3J0ICogYXMgcmVnaXN0cmF0aW9uTW9kZWwgZnJvbSAnLi9yZWdpc3RyYXRpb24nO1xuaW1wb3J0ICogYXMgc3RhdHVzTW9kZWwgZnJvbSAnLi9zdGF0dXMnO1xuaW1wb3J0ICogYXMgdGlja2V0TW9kZWwgZnJvbSAnLi90aWNrZXQnO1xuaW1wb3J0ICogYXMgY2hlY2tJbk1vZGVsIGZyb20gJy4vY2hlY2tpbic7XG5pbXBvcnQgKiBhcyBhdHRlbmRlZU1vZGVsIGZyb20gJy4vYXR0ZW5kZWUnO1xuZXhwb3J0IHtcblx0Y2hlY2tJbk1vZGVsLFxuXHRkYXRlVGltZU1vZGVsLFxuXHRldmVudE1vZGVsLFxuXHRyZWdpc3RyYXRpb25Nb2RlbCxcblx0c3RhdHVzTW9kZWwsXG5cdHRpY2tldE1vZGVsLFxuXHRhdHRlbmRlZU1vZGVsLFxufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHsgaXNBcnJheSwgcmVkdWNlLCB0cmltRW5kIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBtZW1vaXplIGZyb20gJ21lbWl6ZSc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRhc3NlcnRFbnRpdHlIYXNLZXksXG5cdGFzc2VydElzQXJyYXksXG5cdGFzc2VydElzTm90RW1wdHksXG5cdGFzc2VydElzTWFwLFxufSBmcm9tICcuL2Fzc2VydGlvbnMnO1xuXG4vKipcbiAqIEV4cG9zZXMgYSBtYXAgb2YgbW9kZWxuYW1lIHRvIHByaW1hcnkga2V5IGV4cG9zZWQgYnkgdGhlIGVlanMuZGF0YSBnbG9iYWxcbiAqIHZpYSB0aGUgc2VydmVyLlxuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0IGNvbnN0IHsgcHJpbWFyeV9rZXlzOiBwcmltYXJ5S2V5cyA9IHt9IH0gPSBkYXRhLnBhdGhzO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlcyBmb3IgdGhlIGdpdmVuIGtleXMgZnJvbSB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogVGhpcyBmdW5jdGlvbiB3b3VsZCBiZSB1c2VkIGZvciBtb2RlbHMgdGhhdCBoYXZlIGNvbWJpbmVkIHByaW1hcnkga2V5c1xuICogKGRlbGl2ZXJlZCBhcyBhbiBhcnJheSkuXG4gKlxuICogQHR5cGUgeyBtZW1vaXplZCB9XG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBmb3IgdGhlIHZhbHVlcy5cbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgdmFsdWVzRm9yQ29tYmluZWRQcmltYXJ5S2V5cyA9IG1lbW9pemUoKGtleXMsIGVudGl0eSkgPT4ge1xuXHRhc3NlcnRJc0FycmF5KGtleXMpO1xuXHRjb25zdCBwcmltYXJ5S2V5ID0gcmVkdWNlKGtleXMsIGZ1bmN0aW9uIChyZXN1bHQsIGtleSkge1xuXHRcdGFzc2VydEVudGl0eUhhc0tleShrZXksIGVudGl0eSk7XG5cdFx0cmV0dXJuIGVudGl0eVtyZXN1bHRdICsgJzonICsgZW50aXR5W2tleV07XG5cdH0pO1xuXHRyZXR1cm4gdHJpbUVuZChwcmltYXJ5S2V5LCAnOicpO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgZm9yIHRoZSBnaXZlbiBrZXkgZnJvbSB0aGUgcHJvdmlkZWQgZW50aXR5LlxuICogVGhpcyBmdW5jdGlvbiB3b3VsZCBiZSB1c2VkIGZvciBtb2RlbHMgdGhhdCBoYXZlIG9ubHkgb25lIHByaW1hcnkga2V5LlxuICpcbiAqIEB0eXBlIHttZW1vaXplZH1cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgdmFsdWUgZm9yIHRoZSBrZXkgaW4gdGhlIHByb3ZpZGVkIGVudGl0eS5cbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgdmFsdWVGb3JQcmltYXJ5S2V5ID0gbWVtb2l6ZSgoa2V5LCBlbnRpdHkpID0+IHtcblx0YXNzZXJ0RW50aXR5SGFzS2V5KGtleSwgZW50aXR5KTtcblx0cmV0dXJuIGVudGl0eVtrZXldO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcHJpbWFyeSBrZXkgKG9yIGNvbWJpbmVkIHByaW1hcnkga2V5cykgZnJvbSB0aGUgYXZhaWxhYmxlIGRhdGEuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7IGZ1bmN0aW9uKHN0cmluZykgfVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmltYXJ5S2V5ID0gbWVtb2l6ZSgobW9kZWxOYW1lKSA9PiB7XG5cdGFzc2VydEVudGl0eUhhc0tleShtb2RlbE5hbWUsIHByaW1hcnlLZXlzKTtcblx0cmV0dXJuIHByaW1hcnlLZXlzW21vZGVsTmFtZV07XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcXVlcnkgc3RyaW5nIGZvciBnZXR0aW5nIHRoZSBlbnRpdGllcyBiZWxvbmdpbmcgdG8gYSBtb2RlbCBmb3IgdGhlXG4gKiBnaXZlbiBwcmltYXJ5IGtleSB2YWx1ZXNcbiAqXG4gKiBAdHlwZSB7bWVtb2l6ZWR9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQcmltYXJ5S2V5UXVlcnlTdHJpbmcgPSBtZW1vaXplKChtb2RlbE5hbWUsIGtleVZhbHVlcyA9IFtdKSA9PiB7XG5cdGNvbnN0IHByaW1hcnlLZXkgPSBnZXRQcmltYXJ5S2V5KG1vZGVsTmFtZSk7XG5cdHJldHVybiBgWyR7cHJpbWFyeUtleX1dW0lOXT1gICsga2V5VmFsdWVzLmpvaW4oKTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlcyBmb3IgdGhlIHByaW1hcnkga2V5cyBmcm9tIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7RnVuY3Rpb259ICBJZiB0aGUgbW9kZWwgaGFzIG9ubHkgb25lIHByaW1hcnkga2V5IHRoZW4gdGhlIHZhbHVlIHdpbGxcbiAqIGJlIGEgc2ltcGxlIHN0cmluZy4gIElmIHRoZSBtb2RlbCBoYXMgY29tYmluZWQgcHJpbWFyeSBrZXlzLCB0aGVuIHRoZSB2YWx1ZVxuICogd2lsbCBiZSBhcyBzdHJpbmcgaW4gdGhlIGZvcm1hdCBgJXMuJXNgIGZvciB0aGUgcHJpbWFyeSBrZXkgdmFsdWVzLlxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzID0gbWVtb2l6ZSgobW9kZWxOYW1lLCBlbnRpdHkpID0+IHtcblx0Y29uc3Qga2V5cyA9IGdldFByaW1hcnlLZXkobW9kZWxOYW1lKTtcblx0cmV0dXJuIGlzQXJyYXkoa2V5cylcblx0XHQ/IHZhbHVlc0ZvckNvbWJpbmVkUHJpbWFyeUtleXMoa2V5cywgZW50aXR5KVxuXHRcdDogdmFsdWVGb3JQcmltYXJ5S2V5KGtleXMsIGVudGl0eSk7XG59KTtcblxuLyoqXG4gKiBUaGlzIHJlY2VpdmVzIGFuIGFycmF5IG9mIGVudGl0aWVzIGFuZCByZXR1cm5zIGEgY29sbGVjdGlvbiBvZiB0aG9zZSBzYW1lXG4gKiBlbnRpdGllcyBpbmRleGVkIGJ5IHRoZSBwcmltYXJ5IGtleSB2YWx1ZSBmb3IgZWFjaCBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtBcnJheX0gZW50aXRpZXNcbiAqIEByZXR1cm4ge01hcH0gIEEgY29sbGVjdGlvbiBpbmRleGVkIGJ5IHRoZSBwcmltYXJ5IGtleSB2YWx1ZXMgZm9yIGVhY2ggZW50aXR5LlxuICogQHRocm93cyB7RXhjZXB0aW9ufVxuICovXG5leHBvcnQgY29uc3Qga2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSA9IChtb2RlbE5hbWUsIGVudGl0aWVzID0gW10pID0+IHtcblx0YXNzZXJ0SXNOb3RFbXB0eShcblx0XHRlbnRpdGllcyxcblx0XHRfXygnVGhlIHByb3ZpZGVkIGFycmF5IG9mIGVudGl0aWVzIG11c3Qgbm90IGJlIGVtcHR5JywgJ2V2ZW50X2VzcHJlc3NvJylcblx0KTtcblx0YXNzZXJ0SXNBcnJheShlbnRpdGllcyk7XG5cblx0Y29uc3QgbWFwcGVkRW50aXRpZXMgPSBuZXcgTWFwKCk7XG5cdGVudGl0aWVzLmZvckVhY2goKGVudGl0eSkgPT4ge1xuXHRcdG1hcHBlZEVudGl0aWVzLnNldChcblx0XHRcdGdldEVudGl0eVByaW1hcnlLZXlWYWx1ZXMobW9kZWxOYW1lLCBlbnRpdHkpLFxuXHRcdFx0ZW50aXR5XG5cdFx0KTtcblx0fSk7XG5cdHJldHVybiBtYXBwZWRFbnRpdGllcztcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBlbnRpdHkgaW5zdGFuY2VzIHVzaW5nIHRoZSBnaXZlbiBmYWN0b3J5IGFuZCBhcnJheVxuICogb2YgZW50aXR5IHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZmFjdG9yeVxuICogQHBhcmFtIHtNYXB9IGVudGl0aWVzXG4gKiBAcmV0dXJuIHtNYXB9ICBBbiBhcnJheSBvZiBlbnRpdHkgaW5zdGFuY2VzIGluZGV4ZWQgYnlcbiAqIHRoZWlyIHByaW1hcnkga2V5IHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBbmRLZXlFbnRpdGllc0J5UHJpbWFyeUtleVZhbHVlID0gKGZhY3RvcnksIGVudGl0aWVzKSA9PiB7XG5cdGFzc2VydElzTWFwKFxuXHRcdGVudGl0aWVzLFxuXHRcdF9fKFxuXHRcdFx0J1RoZSBwcm92aWRlZCBvYmplY3Qgb2YgZW50aXRpZXMgbXVzdCBiZSBhIE1hcCBvYmplY3QnLFxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdClcblx0KTtcblx0ZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5LCBlbnRpdHlJZCkgPT4ge1xuXHRcdGVudGl0aWVzLnNldChlbnRpdHlJZCwgZmFjdG9yeS5mcm9tRXhpc3RpbmcoZW50aXR5KSk7XG5cdH0pO1xuXHRyZXR1cm4gZW50aXRpZXM7XG59O1xuIiwiLyoqXG4gKiBJbnRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCAqIGFzIHN0YXR1c01vZGVsIGZyb20gJy4uL3N0YXR1cy9jb25zdGFudHMnO1xuXG4vKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAncmVnaXN0cmF0aW9uJztcblxuZXhwb3J0IGNvbnN0IFJFR0lTVFJBVElPTl9TVEFUVVNfSURTID0gdmFsdWVzKFxuXHRzdGF0dXNNb2RlbC5SRUdJU1RSQVRJT05fU1RBVFVTX0lEXG4pO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9xdWVyeSc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNVbmRlZmluZWQsIHZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0Z2V0UXVlcnlTdHJpbmcgYXMgYmFzZUdldFF1ZXJ5U3RyaW5nLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcbn0gZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgKiBhcyBzdGF0dXNNb2RlbCBmcm9tICcuLi9zdGF0dXMvY29uc3RhbnRzJztcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICpcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0Zm9yRXZlbnRJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yQXR0ZW5kZWVJZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yVHJhbnNhY3Rpb25JZDogUHJvcFR5cGVzLm51bWJlcixcblx0Zm9yVGlja2V0SWQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGZvclN0YXR1c0lkOiBQcm9wVHlwZXMub25lT2YodmFsdWVzKHN0YXR1c01vZGVsLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQpKSxcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZihbJ1JFR19JRCcsICdSRUdfZGF0ZSddKSxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKEFMTE9XRURfT1JERVJfVkFMVUVTKSxcblx0fSksXG59O1xuXG5leHBvcnQgY29uc3Qgb3B0aW9uc0VudGl0eU1hcCA9IHtcblx0ZGVmYXVsdDoge1xuXHRcdHZhbHVlOiAnUkVHX0lEJyxcblx0XHRsYWJlbDogJ1JFR19jb2RlJyxcblx0fSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKlxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0fVxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRxdWVyeURhdGE6IHtcblx0XHRsaW1pdDogMTAwLFxuXHRcdG9yZGVyQnk6ICdyZWdfZGF0ZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdH0sXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gbWFwIGFuIG9yZGVyQnkgc3RyaW5nIHRvIHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpbiBhIFJFU1QgcXVlcnkgZnJvbVxuICogdGhlIGNvbnRleHQgb2YgYSByZWdpc3RyYXRpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcbiAqXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gUmV0dXJucyBhbiBhY3R1YWwgb3JkZXJCeSBzdHJpbmcgZm9yIHRoZSBSRVNUIHF1ZXJ5IGZvclxuICogICAgICAgICAgICAgICAgICAgICAgdGhlIHByb3ZpZGVkIGFsaWFzXG4gKi9cbmV4cG9ydCBjb25zdCBtYXBPcmRlckJ5ID0gKG9yZGVyQnkpID0+IHtcblx0Y29uc3Qgb3JkZXJCeU1hcCA9IHtcblx0XHRyZWdfaWQ6ICdSRUdfSUQnLFxuXHRcdHJlZ19kYXRlOiAnUkVHX2RhdGUnLFxuXHR9O1xuXHRyZXR1cm4gaXNVbmRlZmluZWQob3JkZXJCeU1hcFtvcmRlckJ5XSkgPyBvcmRlckJ5IDogb3JkZXJCeU1hcFtvcmRlckJ5XTtcbn07XG5cbi8qKlxuICogQnVpbGRzIHdoZXJlIGNvbmRpdGlvbnMgZm9yIGFuIHJlZ2lzdHJhdGlvbnMgZW5kcG9pbnQgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICAgIFx0SUQgb2YgRXZlbnQgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JBdHRlbmRlZUlkICAgIElEIG9mIEF0dGVuZGVlIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcGFyYW0ge251bWJlcn0gZm9yVHJhbnNhY3Rpb25JZCBJRCBvZiBUcmFuc2FjdGlvbiB0byByZXRyaWV2ZSByZWdpc3RyYXRpb25zIGZvclxuICogQHBhcmFtIHtudW1iZXJ9IGZvclRpY2tldElkIFx0XHRJRCBvZiBUaWNrZXQgdG8gcmV0cmlldmUgcmVnaXN0cmF0aW9ucyBmb3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JTdGF0dXNJZCBcdFx0SUQgb2YgU3RhdHVzIHRvIHJldHJpZXZlIHJlZ2lzdHJhdGlvbnMgZm9yXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgIFx0VGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdGZvckF0dGVuZGVlSWQgPSAwLFxuXHRmb3JUcmFuc2FjdGlvbklkID0gMCxcblx0Zm9yVGlja2V0SWQgPSAwLFxuXHRmb3JTdGF0dXNJZCA9ICcnLFxufSkgPT4ge1xuXHRjb25zdCB3aGVyZSA9IFtdO1xuXHRmb3JFdmVudElkID0gcGFyc2VJbnQoZm9yRXZlbnRJZCwgMTApO1xuXHRpZiAoZm9yRXZlbnRJZCAhPT0gMCAmJiAhaXNOYU4oZm9yRXZlbnRJZCkpIHtcblx0XHR3aGVyZS5wdXNoKCd3aGVyZVtFVlRfSURdPScgKyBmb3JFdmVudElkKTtcblx0fVxuXHRmb3JBdHRlbmRlZUlkID0gcGFyc2VJbnQoZm9yQXR0ZW5kZWVJZCwgMTApO1xuXHRpZiAoZm9yQXR0ZW5kZWVJZCAhPT0gMCAmJiAhaXNOYU4oZm9yQXR0ZW5kZWVJZCkpIHtcblx0XHR3aGVyZS5wdXNoKCd3aGVyZVtBVFRfSURdPScgKyBmb3JBdHRlbmRlZUlkKTtcblx0fVxuXHRmb3JUcmFuc2FjdGlvbklkID0gcGFyc2VJbnQoZm9yVHJhbnNhY3Rpb25JZCwgMTApO1xuXHRpZiAoZm9yVHJhbnNhY3Rpb25JZCAhPT0gMCAmJiAhaXNOYU4oZm9yVHJhbnNhY3Rpb25JZCkpIHtcblx0XHR3aGVyZS5wdXNoKCd3aGVyZVtUWE5fSURdPScgKyBmb3JUcmFuc2FjdGlvbklkKTtcblx0fVxuXHRmb3JUaWNrZXRJZCA9IHBhcnNlSW50KGZvclRpY2tldElkLCAxMCk7XG5cdGlmIChmb3JUaWNrZXRJZCAhPT0gMCAmJiAhaXNOYU4oZm9yVGlja2V0SWQpKSB7XG5cdFx0d2hlcmUucHVzaCgnd2hlcmVbVEtUX0lEXT0nICsgZm9yVGlja2V0SWQpO1xuXHR9XG5cdGlmIChmb3JTdGF0dXNJZCAhPT0gJycgJiYgZm9yU3RhdHVzSWQgIT09IG51bGwpIHtcblx0XHR3aGVyZS5wdXNoKCd3aGVyZVtTVFNfSURdPScgKyBmb3JTdGF0dXNJZCk7XG5cdH1cblx0cmV0dXJuIHdoZXJlLmpvaW4oJyYnKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgcXVlcnkgc3RyaW5nIGZvciB1c2UgYnkgYSBSRVNUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2YgcXVlcnlEYXRhLlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHF1ZXJ5RGF0YVxuICogQHJldHVybiB7IHN0cmluZyB9ICBSZXR1cm5zIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVN0cmluZyA9IChxdWVyeURhdGEgPSB7fSkgPT4ge1xuXHRxdWVyeURhdGEgPSB7IC4uLmRlZmF1bHRRdWVyeURhdGEucXVlcnlEYXRhLCAuLi5xdWVyeURhdGEgfTtcblx0cmV0dXJuIGJhc2VHZXRRdWVyeVN0cmluZyhxdWVyeURhdGEsIHdoZXJlQ29uZGl0aW9ucywgbWFwT3JkZXJCeSk7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBjb25zdCBNT0RFTF9OQU1FID0gJ3N0YXR1cyc7XG4vLyB0eXBlc1xuZXhwb3J0IGNvbnN0IFNUQVRVU19UWVBFX0VNQUlMID0gJ2VtYWlsJztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9FVkVOVCA9ICdldmVudCc7XG5leHBvcnQgY29uc3QgU1RBVFVTX1RZUEVfTUVTU0FHRSA9ICdtZXNzYWdlJztcbmV4cG9ydCBjb25zdCBTVEFUVVNfVFlQRV9QQVlNRU5UID0gJ3BheW1lbnQnO1xuZXhwb3J0IGNvbnN0IFNUQVRVU19UWVBFX1JFR0lTVFJBVElPTiA9ICdyZWdpc3RyYXRpb24nO1xuZXhwb3J0IGNvbnN0IFNUQVRVU19UWVBFX1RSQU5TQUNUSU9OID0gJ3RyYW5zYWN0aW9uJztcbi8vIGVtYWlsXG5leHBvcnQgY29uc3QgRU1BSUxfU1RBVFVTX0lEID0ge1xuXHREUkFGVDogJ0VEUicsXG5cdFNFTlQ6ICdFU04nLFxuXHRFWFBJUkVEOiAnRVhQJyxcbn07XG4vLyBldmVudFxuZXhwb3J0IGNvbnN0IEVWRU5UX1NUQVRVU19JRCA9IHtcblx0QUNUSVZFOiAnQUNUJyxcblx0UkVHSVNUUkFUSU9OX0NMT1NFRDogJ0NMUycsXG5cdERFTEVURUQ6ICdERUwnLFxuXHRERU5JRUQ6ICdERU4nLFxuXHREUkFGVDogJ0RSRicsXG5cdE5PVF9BQ1RJVkU6ICdOQUMnLFxuXHROT1RfT1BFTjogJ05PUCcsXG5cdE9OR09JTkc6ICdPTkcnLFxuXHRSRUdJU1RSQVRJT05fT1BFTjogJ09QTicsXG5cdFBFTkRJTkc6ICdQTkQnLFxuXHRTRUNPTkRBUlk6ICdTRUMnLFxufTtcbi8vIG1lc3NhZ2VcbmV4cG9ydCBjb25zdCBNRVNTQUdFX1NUQVRVU19JRCA9IHtcblx0REVCVUc6ICdNRE8nLFxuXHRFWEVDVVRJTkc6ICdNRVgnLFxuXHRGQUlMOiAnTUZMJyxcblx0SU5DT01QTEVURTogJ01JQycsXG5cdElETEU6ICdNSUQnLFxuXHRSRVNFTkQ6ICdNUlMnLFxuXHRSRVRSWTogJ01SVCcsXG5cdFNFTlQ6ICdNU04nLFxufTtcbi8vIHBheW1lbnRcbmV4cG9ydCBjb25zdCBQQVlNRU5UX1NUQVRVU19JRCA9IHtcblx0QVBQUk9WRUQ6ICdQQVAnLFxuXHRDQU5DRUxMRUQ6ICdQQ04nLFxuXHRERUNMSU5FRDogJ1BEQycsXG5cdEZBSUxFRDogJ1BGTCcsXG5cdFBFTkRJTkc6ICdQUE4nLFxufTtcbi8vIHJlZ2lzdHJhdGlvblxuZXhwb3J0IGNvbnN0IFJFR0lTVFJBVElPTl9TVEFUVVNfSUQgPSB7XG5cdEFQUFJPVkVEOiAnUkFQJyxcblx0Q0FOQ0VMTEVEOiAnUkNOJyxcblx0REVDTElORUQ6ICdSREMnLFxuXHRJTkNPTVBMRVRFOiAnUklDJyxcblx0Tk9UX0FQUFJPVkVEOiAnUk5BJyxcblx0UEVORElOR19QQVlNRU5UOiAnUlBQJyxcblx0V0FJVF9MSVNUOiAnUldMJyxcbn07XG4vLyB0cmFuc2FjdGlvblxuZXhwb3J0IGNvbnN0IFRSQU5TQUNUSU9OX1NUQVRVU19JRCA9IHtcblx0QUJBTkRPTkVEOiAnVEFCJyxcblx0Q09NUExFVEU6ICdUQ00nLFxuXHRGQUlMRUQ6ICdURkwnLFxuXHRJTkNPTVBMRVRFOiAnVElOJyxcblx0T1ZFUlBBSUQ6ICdUT1AnLFxufTtcblxuLy8gdGhlIGZvbGxvd2luZyBhcmUgbm90IGluIHRoZSBzdGF0dXMgZGF0YWJhc2UgYnV0IGFyZSBrZXB0IGhlcmUgZm9yXG4vLyBjb252ZW5pZW5jZVxuXG4vLyBjdXN0b20gcG9zdCB0eXBlc1xuZXhwb3J0IGNvbnN0IENQVF9TVEFUVVNfSUQgPSB7XG5cdFBVQkxJU0g6ICdwdWJsaXNoJyxcblx0RlVUVVJFOiAnZnV0dXJlJyxcblx0RFJBRlQ6ICdkcmFmdCcsXG5cdFBFTkRJTkc6ICdwZW5kaW5nJyxcblx0UFJJVkFURTogJ3ByaXZhdGUnLFxuXHRUUkFTSEVEOiAndHJhc2gnLFxufTtcblxuZXhwb3J0IGNvbnN0IFVOS05PV05fU1RBVFVTX0lEID0gJ3Vua25vd24nO1xuXG5leHBvcnQgY29uc3QgQUxMX1NUQVRVU19JRFMgPSBbXG5cdC4uLnZhbHVlcyhFTUFJTF9TVEFUVVNfSUQpLFxuXHQuLi52YWx1ZXMoRVZFTlRfU1RBVFVTX0lEKSxcblx0Li4udmFsdWVzKE1FU1NBR0VfU1RBVFVTX0lEKSxcblx0Li4udmFsdWVzKFBBWU1FTlRfU1RBVFVTX0lEKSxcblx0Li4udmFsdWVzKFJFR0lTVFJBVElPTl9TVEFUVVNfSUQpLFxuXHQuLi52YWx1ZXMoVFJBTlNBQ1RJT05fU1RBVFVTX0lEKSxcblx0Li4udmFsdWVzKENQVF9TVEFUVVNfSUQpLFxuXHRVTktOT1dOX1NUQVRVU19JRCxcbl07XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0ICogYXMgc3RhdHVzIGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IEVWRU5UX1NUQVRVU19JRCB9IGZyb20gJy4uL2V2ZW50JztcbmltcG9ydCB7IFRJQ0tFVF9TVEFUVVNfSUQgfSBmcm9tICcuLi90aWNrZXQnO1xuaW1wb3J0IHsgREFURVRJTUVfU1RBVFVTX0lEIH0gZnJvbSAnLi4vZGF0ZXRpbWUnO1xuaW1wb3J0IHsgQ0hFQ0tJTl9TVEFUVVNfSUQgfSBmcm9tICcuLi9jaGVja2luJztcblxuLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbHVlLW9iamVjdHMnO1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBSZWdpc3RyYXRpb24gc3RhdHVzZXNcbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfUkVHSVNUUkFUSU9OID0ge1xuXHRbc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuUEVORElOR19QQVlNRU5UXTogbmV3IExhYmVsKFxuXHRcdF9fKCdwZW5kaW5nIHBheW1lbnQnLCAnZXZlbnRfZXNwcmVzc28nKSxcblx0XHRfXygncGVuZGluZyBwYXltZW50cycsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG5cdFtzdGF0dXMuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5BUFBST1ZFRF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCdhcHByb3ZlZCcsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG5cdFtzdGF0dXMuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5OT1RfQVBQUk9WRURdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXygnbm90IGFwcHJvdmVkJywgJ2V2ZW50X2VzcHJlc3NvJylcblx0KSxcblx0W3N0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELkNBTkNFTExFRF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCdjYW5jZWxsZWQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbc3RhdHVzLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuSU5DT01QTEVURV06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCdpbmNvbXBsZXRlJywgJ2V2ZW50X2VzcHJlc3NvJylcblx0KSxcblx0W3N0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELkRFQ0xJTkVEXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ2RlY2xpbmVkJywgJ2V2ZW50X2VzcHJlc3NvJylcblx0KSxcblx0W3N0YXR1cy5SRUdJU1RSQVRJT05fU1RBVFVTX0lELldBSVRfTElTVF06IG5ldyBMYWJlbChcblx0XHRfXygnd2FpdCBsaXN0JywgJ2V2ZW50X2VzcHJlc3NvJyksXG5cdFx0X18oJ3dhaXQgbGlzdHMnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIFRyYW5zYWN0aW9uIHN0YXR1c2VzXG4gKlxuICogQHR5cGUge3t9fVxuICpcbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9UUkFOU0FDVElPTiA9IHtcblx0W3N0YXR1cy5UUkFOU0FDVElPTl9TVEFUVVNfSUQuT1ZFUlBBSURdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXygnb3ZlcnBhaWQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbc3RhdHVzLlRSQU5TQUNUSU9OX1NUQVRVU19JRC5DT01QTEVURV06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCdjb21wbGV0ZScsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG5cdFtzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELklOQ09NUExFVEVdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXygnaW5jb21wbGV0ZScsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG5cdFtzdGF0dXMuVFJBTlNBQ1RJT05fU1RBVFVTX0lELkZBSUxFRF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCdmYWlsZWQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbc3RhdHVzLlRSQU5TQUNUSU9OX1NUQVRVU19JRC5BQkFORE9ORURdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXygnYWJhbmRvbmVkJywgJ2V2ZW50X2VzcHJlc3NvJylcblx0KSxcbn07XG5cbi8qKlxuICogVHJhbnNsYXRpb24gbWFwIGZvciBwYXltZW50IHN0YXR1c2VzXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX1BBWU1FTlQgPSB7XG5cdFtzdGF0dXMuUEFZTUVOVF9TVEFUVVNfSUQuQVBQUk9WRURdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXygnYWNjZXB0ZWQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbc3RhdHVzLlBBWU1FTlRfU1RBVFVTX0lELlBFTkRJTkddOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXygncGVuZGluZycsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG5cdFtzdGF0dXMuUEFZTUVOVF9TVEFUVVNfSUQuQ0FOQ0VMTEVEXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ2NhbmNlbGxlZCcsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG5cdFtzdGF0dXMuUEFZTUVOVF9TVEFUVVNfSUQuREVDTElORURdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXygnZGVjbGluZWQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbc3RhdHVzLlBBWU1FTlRfU1RBVFVTX0lELkZBSUxFRF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCdmYWlsZWQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIE1lc3NhZ2Ugc3RhdHVzZXNcbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfTUVTU0FHRSA9IHtcblx0W3N0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5TRU5UXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ3NlbnQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELklETEVdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXygncXVldWVkIGZvciBzZW5kaW5nJywgJ2V2ZW50X2VzcHJlc3NvJylcblx0KSxcblx0W3N0YXR1cy5NRVNTQUdFX1NUQVRVU19JRC5GQUlMXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ2ZhaWxlZCcsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG5cdFtzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuREVCVUddOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXygnZGVidWcgb25seScsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG5cdFtzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuRVhFQ1VUSU5HXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ21lc3NlbmdlciBpcyBleGVjdXRpbmcnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELlJFU0VORF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCdxdWV1ZWQgZm9yIHJlc2VuZGluZycsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG5cdFtzdGF0dXMuTUVTU0FHRV9TVEFUVVNfSUQuSU5DT01QTEVURV06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCdxdWV1ZWQgZm9yIGdlbmVyYXRpbmcnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbc3RhdHVzLk1FU1NBR0VfU1RBVFVTX0lELlJFVFJZXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ2ZhaWxlZCBzZW5kaW5nLCBjYW4gYmUgcmV0cmllZCcsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgQ1BUIHN0YXR1c2VzXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0NQVCA9IHtcblx0W3N0YXR1cy5DUFRfU1RBVFVTX0lELlBVQkxJU0hdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXygncHVibGlzaGVkJywgJ2V2ZW50X2VzcHJlc3NvJylcblx0KSxcblx0W3N0YXR1cy5DUFRfU1RBVFVTX0lELkZVVFVSRV06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCdzY2hlZHVsZWQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbc3RhdHVzLkNQVF9TVEFUVVNfSUQuRFJBRlRdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXygnZHJhZnQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbc3RhdHVzLkNQVF9TVEFUVVNfSUQuUEVORElOR106IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCdwZW5kaW5nJywgJ2V2ZW50X2VzcHJlc3NvJylcblx0KSxcblx0W3N0YXR1cy5DUFRfU1RBVFVTX0lELlBSSVZBVEVdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXygncHJpdmF0ZScsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG5cdFtzdGF0dXMuQ1BUX1NUQVRVU19JRC5UUkFTSEVEXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ3RyYXNoZWQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxufTtcblxuLy8gdGhlIGZvbGxvd2luZyBzdGF0dXMgbWFwcyBhcmUgZm9yIG1vZGVsIHN0YXR1c2VzIHRoYXQgYXJlIG5vdCBzYXZlZCBpbiB0aGVcbi8vIHN0YXR1cyB0YWJsZSBidXQgZm9yIGNvbnZlbmllbmNlIGhhdmUgdGhlaXIgbGFiZWxzIHJldHJpZXZhYmxlIHZpYSBoZXJlLlxuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgRXZlbnQgU3RhdHVzZXNcbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfRVZFTlQgPSB7XG5cdFtFVkVOVF9TVEFUVVNfSUQuU09MRF9PVVRdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXygnc29sZCBvdXQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbRVZFTlRfU1RBVFVTX0lELlBPU1RQT05FRF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCdwb3N0cG9uZWQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbRVZFTlRfU1RBVFVTX0lELkNBTkNFTExFRF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCdjYW5jZWxsZWQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIFRpY2tldCBzdGF0dXNlc1xuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9USUNLRVQgPSB7XG5cdFtUSUNLRVRfU1RBVFVTX0lELkFSQ0hJVkVEXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ2FyY2hpdmVkJywgJ2V2ZW50X2VzcHJlc3NvJylcblx0KSxcblx0W1RJQ0tFVF9TVEFUVVNfSUQuRVhQSVJFRF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCdleHBpcmVkJywgJ2V2ZW50X2VzcHJlc3NvJylcblx0KSxcblx0W1RJQ0tFVF9TVEFUVVNfSUQuU09MRF9PVVRdOiBMYWJlbC5mcm9tU2FtZVNpbmdsZUFuZFBsdXJhbChcblx0XHRfXygnc29sZCBvdXQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbVElDS0VUX1NUQVRVU19JRC5QRU5ESU5HXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ3VwY29taW5nJywgJ2V2ZW50X2VzcHJlc3NvJylcblx0KSxcblx0W1RJQ0tFVF9TVEFUVVNfSUQuT05TQUxFXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ29uIHNhbGUnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGlvbiBtYXAgZm9yIGRhdGV0aW1lIHN0YXR1c2VzXG4gKlxuICogQHR5cGUge3t9fVxuICovXG5jb25zdCBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0RBVEVUSU1FID0ge1xuXHRbREFURVRJTUVfU1RBVFVTX0lELkNBTkNFTExFRF06IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCdjYW5jZWxsZWQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbREFURVRJTUVfU1RBVFVTX0lELlNPTERfT1VUXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ3NvbGQgb3V0JywgJ2V2ZW50X2VzcHJlc3NvJylcblx0KSxcblx0W0RBVEVUSU1FX1NUQVRVU19JRC5FWFBJUkVEXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ2V4cGlyZWQnLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxuXHRbREFURVRJTUVfU1RBVFVTX0lELklOQUNUSVZFXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ2luYWN0aXZlJywgJ2V2ZW50X2VzcHJlc3NvJylcblx0KSxcblx0W0RBVEVUSU1FX1NUQVRVU19JRC5VUENPTUlOR106IExhYmVsLmZyb21TYW1lU2luZ2xlQW5kUGx1cmFsKFxuXHRcdF9fKCd1cGNvbWluZycsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG5cdFtEQVRFVElNRV9TVEFUVVNfSUQuQUNUSVZFXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ2FjdGl2ZScsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG5cdFtEQVRFVElNRV9TVEFUVVNfSUQuUE9TVFBPTkVEXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ3Bvc3Rwb25lZCcsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG59O1xuXG4vKipcbiAqIFRyYW5zbGF0aW9uIG1hcCBmb3IgY2hlY2tpbiBzdGF0dXNlc1xuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuY29uc3QgU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9DSEVDS0lOID0ge1xuXHRbQ0hFQ0tJTl9TVEFUVVNfSUQuU1RBVFVTX0NIRUNLRURfSU5dOiBuZXcgTGFiZWwoXG5cdFx0X18oJ2NoZWNrLWluJywgJ2V2ZW50X2VzcHJlc3NvJyksXG5cdFx0X18oJ2NoZWNrLWlucycsICdldmVudF9lc3ByZXNzbycpXG5cdCksXG5cdFtDSEVDS0lOX1NUQVRVU19JRC5TVEFUVVNfQ0hFQ0tFRF9PVVRdOiBuZXcgTGFiZWwoXG5cdFx0X18oJ2NoZWNrLW91dCcsICdldmVudF9lc3ByZXNzbycpLFxuXHRcdF9fKCdjaGVjay1vdXRzJywgJ2V2ZW50X2VzcHJlc3NvJylcblx0KSxcblx0W0NIRUNLSU5fU1RBVFVTX0lELlNUQVRVU19DSEVDS0VEX05FVkVSXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ25ldmVyIGNoZWNrZWQgaW4nLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxufTtcblxuLyoqXG4gKiBDb21iaW5lZCB0cmFuc2xhdGlvbiBtYXAgZm9yIGFsbCBzdGF0dXNlcy5cbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfQUxMID0ge1xuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX1JFR0lTVFJBVElPTixcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9UUkFOU0FDVElPTixcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9QQVlNRU5ULFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX01FU1NBR0UsXG5cdC4uLlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ1BULFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX0VWRU5ULFxuXHQuLi5TVEFUVVNfVFJBTlNMQVRJT05fTUFQX1RJQ0tFVCxcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9EQVRFVElNRSxcblx0Li4uU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9DSEVDS0lOLFxuXHRbc3RhdHVzLlVOS05PV05fU1RBVFVTX0lEXTogTGFiZWwuZnJvbVNhbWVTaW5nbGVBbmRQbHVyYWwoXG5cdFx0X18oJ3Vua25vd24nLCAnZXZlbnRfZXNwcmVzc28nKVxuXHQpLFxufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwcmV0dHkgc3RhdHVzIGxhYmVsIHN0cmluZyBmb3IgdGhlIGdpdmVuIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RhdHVzQ29kZVxuICogQHBhcmFtIHtib29sZWFufSBzaW5ndWxhciAgV2hldGhlciB0byByZXR1cm4gdGhlIHNpbmd1bGFyIG9yIHBsdXJhbCBsYWJlbFxuICogdmFsdWVcbiAqIEBwYXJhbSB7KHNlbnRlbmNlfGxvd2VyfHVwcGVyKX0gc2NoZW1hXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFJldHVybnMgdGhlIG1hcHBlZCBwcmV0dHkgbGFiZWwgZm9yIHRoZSBnaXZlbiBzdGF0dXMgY29kZSBvclxuICogYSBmb3JtYXR0ZWQgJ3Vua293bicgc3RyaW5nIGlmIHRoZXJlIGlzIG5vIG1hcHBlZCB2YWx1ZSBmb3IgdGhlIGdpdmVuIGNvZGUuXG4gKi9cbmV4cG9ydCBjb25zdCBwcmV0dHlTdGF0dXMgPSAoXG5cdHN0YXR1c0NvZGUsXG5cdHNpbmd1bGFyID0gdHJ1ZSxcblx0c2NoZW1hID0gTGFiZWwuRk9STUFUX1NFTlRFTkNFX0NBU0VcbikgPT4ge1xuXHRyZXR1cm4gU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9BTExbc3RhdHVzQ29kZV1cblx0XHQ/IFNUQVRVU19UUkFOU0xBVElPTl9NQVBfQUxMW3N0YXR1c0NvZGVdLmFzRm9ybWF0dGVkKHNpbmd1bGFyLCBzY2hlbWEpXG5cdFx0OiBTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0FMTFtzdGF0dXMuVU5LTk9XTl9TVEFUVVNfSURdLmFzRm9ybWF0dGVkKFxuXHRcdFx0XHRzaW5ndWxhcixcblx0XHRcdFx0c2NoZW1hXG5cdFx0ICApO1xufTtcblxuLyoqXG4gKiBFeHBlY3RzIGFuIGFycmF5IG9mIHN0YXR1cyBjb2RlcyBhbmQgcmV0dXJucyBhbiBvYmplY3QgaW5kZXhlZCBieSBjb2RlcyB3aXRoXG4gKiB2YWx1ZXMgYmVpbmcgdGhlIGZvcm1hdHRlZCBwcmV0dHkgbGFiZWxzIGZvciBlYWNoIGNvZGUgYWNjb3JkaW5nIHRvIHRoZVxuICogcHJvdmlkZWQgYXJndW1lbnRzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gc3RhdHVzQ29kZXNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2luZ3VsYXJcbiAqIEBwYXJhbSB7KHNlbnRlbmNlfGxvd2VyfHVwcGVyKX0gc2NoZW1hXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCBtYXBwaW5nIHN0YXR1cyBjb2RlIHRvIHByZXR0eSBsYWJlbC5cbiAqL1xuZXhwb3J0IGNvbnN0IHByZXR0eVN0YXR1c2VzID0gKFxuXHRzdGF0dXNDb2Rlcyxcblx0c2luZ3VsYXIgPSB0cnVlLFxuXHRzY2hlbWEgPSBMYWJlbC5GT1JNQVRfU0VOVEVOQ0VfQ0FTRVxuKSA9PiB7XG5cdGlmICghaXNBcnJheShzdGF0dXNDb2RlcykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0J0V4cGVjdCBpbmNvbWluZyBzdGF0dXNDb2RlcyBhcmd1bWVudCcgKyAnIHRvIGJlIGFuIGFycmF5J1xuXHRcdCk7XG5cdH1cblx0Y29uc3QgbWFwcGVkU3RhdHVzZXMgPSB7fTtcblx0c3RhdHVzQ29kZXMuZm9yRWFjaCgoc3RhdHVzQ29kZSkgPT4ge1xuXHRcdG1hcHBlZFN0YXR1c2VzW3N0YXR1c0NvZGVdID0gcHJldHR5U3RhdHVzKHN0YXR1c0NvZGUsIHNpbmd1bGFyLCBzY2hlbWEpO1xuXHR9KTtcblx0cmV0dXJuIG1hcHBlZFN0YXR1c2VzO1xufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vcXVlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9oZWxwZXJzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0FTQyxcblx0QUxMT1dFRF9PUkRFUl9WQUxVRVMsXG59IGZyb20gJy4uL2Jhc2UnO1xuXG4vKipcbiAqIERlc2NyaWJlZCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKlxuICogQHR5cGUge3thdHRyaWJ1dGVzOiAqfX1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5RGF0YVR5cGVzID0ge1xuXHRxdWVyeURhdGE6IFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0bGltaXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0b3JkZXJCeTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKEFMTE9XRURfT1JERVJfVkFMVUVTKSxcblx0fSksXG59O1xuXG4vKipcbiAqIERlZmF1bHQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICpcbiAqIEB0eXBlIHtcbiAqIFx0e1xuICogXHRcdGF0dHJpYnV0ZXM6IHtcbiAqIFx0XHRcdGxpbWl0OiBudW1iZXIsXG4gKiBcdFx0XHRvcmRlckJ5OiBzdHJpbmcsXG4gKiBcdFx0XHRvcmRlcjogc3RyaW5nLFxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDI1LFxuXHRcdG9yZGVyQnk6ICdzdGF0dXNDb2RlJyxcblx0XHRvcmRlcjogUVVFUllfT1JERVJfQVNDLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGFuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9IChvcmRlckJ5KSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0c3RhdHVzQ29kZTogJ1NUU19jb2RlJyxcblx0fTtcblx0cmV0dXJuIGlzVW5kZWZpbmVkKG9yZGVyQnlNYXBbb3JkZXJCeV0pID8gb3JkZXJCeSA6IG9yZGVyQnlNYXBbb3JkZXJCeV07XG59O1xuXG4vKipcbiAqIEJ1aWxkcyB3aGVyZSBjb25kaXRpb25zIGZvciBhbiBldmVudHMgZW5kcG9pbnQgcmVxdWVzdCB1c2luZyBwcm92aWRlZFxuICogaW5mb3JtYXRpb24uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXR1c1R5cGUgXHRJRCBmb3IgdHlwZSBvZiBTdGF0dXMgdG8gcmV0cmlldmVcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgVGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKHsgc3RhdHVzVHlwZSB9KSA9PiB7XG5cdGNvbnN0IHdoZXJlID0gW107XG5cdGlmIChzdGF0dXNUeXBlKSB7XG5cdFx0d2hlcmUucHVzaCgnd2hlcmVbU1RTX3R5cGVdPScgKyBzdGF0dXNUeXBlKTtcblx0fVxuXHRyZXR1cm4gd2hlcmUuam9pbignJicpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBxdWVyeSBzdHJpbmcgZm9yIHVzZSBieSBhIFJFU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBxdWVyeURhdGEuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gcXVlcnlEYXRhXG4gKiBAcmV0dXJuIHsgc3RyaW5nIH0gIFJldHVybnMgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5U3RyaW5nID0gKHF1ZXJ5RGF0YSA9IHt9KSA9PiB7XG5cdHF1ZXJ5RGF0YSA9IHsgLi4uZGVmYXVsdFF1ZXJ5RGF0YS5xdWVyeURhdGEsIC4uLnF1ZXJ5RGF0YSB9O1xuXHRyZXR1cm4gYmFzZUdldFF1ZXJ5U3RyaW5nKHF1ZXJ5RGF0YSwgd2hlcmVDb25kaXRpb25zLCBtYXBPcmRlckJ5KTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IE1PREVMX05BTUUgPSAndGlja2V0JztcblxuZXhwb3J0IGNvbnN0IFRJQ0tFVF9TVEFUVVNfSUQgPSB7XG5cdFNPTERfT1VUOiAnVEtTJyxcblx0RVhQSVJFRDogJ1RLRScsXG5cdEFSQ0hJVkVEOiAnVEtBJyxcblx0UEVORElORzogJ1RLUCcsXG5cdE9OU0FMRTogJ1RLTycsXG59O1xuXG5leHBvcnQgY29uc3QgVElDS0VUX1NUQVRVU19JRFMgPSB2YWx1ZXMoVElDS0VUX1NUQVRVU19JRCk7XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5JztcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQge1xuXHRnZXRRdWVyeVN0cmluZyBhcyBiYXNlR2V0UXVlcnlTdHJpbmcsXG5cdFFVRVJZX09SREVSX0RFU0MsXG5cdEFMTE9XRURfT1JERVJfVkFMVUVTLFxuXHRHUkVBVEVSX1RIQU4sXG5cdEdSRUFURVJfVEhBTl9BTkRfRVFVQUwsXG5cdExFU1NfVEhBTl9BTkRfRVFVQUwsXG59IGZyb20gJy4uL2Jhc2UnO1xuXG5leHBvcnQgY29uc3Qgbm93RGF0ZUFuZFRpbWUgPSBtb21lbnQoKTtcblxuLyoqXG4gKiBEZXNjcmliZWQgYXR0cmlidXRlcyBmb3IgdGhpcyBtb2RlbFxuICpcbiAqIEB0eXBlIHt7YXR0cmlidXRlczogKn19XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeURhdGFUeXBlcyA9IHtcblx0cXVlcnlEYXRhOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdG9yZGVyQnk6IFByb3BUeXBlcy5vbmVPZihbXG5cdFx0XHQnVEtUX25hbWUnLFxuXHRcdFx0J1RLVF9JRCcsXG5cdFx0XHQnc3RhcnRfZGF0ZScsXG5cdFx0XHQnZW5kX2RhdGUnLFxuXHRcdF0pLFxuXHRcdG9yZGVyOiBQcm9wVHlwZXMub25lT2YoQUxMT1dFRF9PUkRFUl9WQUxVRVMpLFxuXHRcdHNob3dFeHBpcmVkOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRtb250aDogUHJvcFR5cGVzLm1vbnRoLFxuXHR9KSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBhdHRyaWJ1dGVzIGZvciB0aGlzIG1vZGVsXG4gKlxuICogQHR5cGUge1xuICogXHR7XG4gKiBcdFx0YXR0cmlidXRlczoge1xuICogXHRcdFx0bGltaXQ6IG51bWJlcixcbiAqIFx0XHRcdG9yZGVyQnk6IHN0cmluZyxcbiAqIFx0XHRcdG9yZGVyOiBzdHJpbmcsXG4gKiAgIFx0XHRzaG93RXhwaXJlZDogYm9vbGVhblxuICogICBcdH1cbiAqICAgfVxuICogfVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFF1ZXJ5RGF0YSA9IHtcblx0cXVlcnlEYXRhOiB7XG5cdFx0bGltaXQ6IDEwMCxcblx0XHRvcmRlckJ5OiAnc3RhcnRfZGF0ZScsXG5cdFx0b3JkZXI6IFFVRVJZX09SREVSX0RFU0MsXG5cdFx0c2hvd0V4cGlyZWQ6IGZhbHNlLFxuXHR9LFxufTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hcCBhbiBvcmRlckJ5IHN0cmluZyB0byB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaW4gYSBSRVNUIHF1ZXJ5IGZyb21cbiAqIHRoZSBjb250ZXh0IG9mIGEgdGlja2V0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG4gKlxuICogQHJldHVybiB7IHN0cmluZyB9IFJldHVybnMgYW4gYWN0dWFsIG9yZGVyQnkgc3RyaW5nIGZvciB0aGUgUkVTVCBxdWVyeSBmb3JcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBhbGlhc1xuICovXG5leHBvcnQgY29uc3QgbWFwT3JkZXJCeSA9IChvcmRlckJ5KSA9PiB7XG5cdGNvbnN0IG9yZGVyQnlNYXAgPSB7XG5cdFx0c3RhcnRfZGF0ZTogJ1RLVF9zdGFydF9kYXRlJyxcblx0XHRlbmRfZGF0ZTogJ1RLVF9lbmRfZGF0ZScsXG5cdH07XG5cdHJldHVybiBpc1VuZGVmaW5lZChvcmRlckJ5TWFwW29yZGVyQnldKSA/IG9yZGVyQnkgOiBvcmRlckJ5TWFwW29yZGVyQnldO1xufTtcblxuLyoqXG4gKiBCdWlsZHMgd2hlcmUgY29uZGl0aW9ucyBmb3IgYW4gdGlja2V0cyBlbmRwb2ludCByZXF1ZXN0IHVzaW5nIHByb3ZpZGVkXG4gKiBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3dFeHBpcmVkIFx0V2hldGhlciBvciBub3QgdG8gaW5jbHVkZSBleHBpcmVkIHRpY2tldHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9udGggICAgICAgICAgICBSZXR1cm4gdGlja2V0cyBmb3IgdGhlIGdpdmVuIG1vbnRoLiBDYW4gYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdGluIGFueSBtb250aCBmb3JtYXQgcmVjb2duaXplZCBieSBtb21lbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JFdmVudElkICAgIFx0SUQgb2YgRXZlbnQgdG8gcmV0cmlldmUgdGlja2V0cyBmb3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3JEYXRldGltZUlkICAgIElEIG9mIERhdGV0aW1lIHRvIHJldHJpZXZlIHRpY2tldHMgZm9yXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgIFx0VGhlIGFzc2VtYmxlZCB3aGVyZSBjb25kaXRpb25zLlxuICovXG5leHBvcnQgY29uc3Qgd2hlcmVDb25kaXRpb25zID0gKHtcblx0Zm9yRXZlbnRJZCA9IDAsXG5cdGZvckRhdGV0aW1lSWQgPSAwLFxuXHRzaG93RXhwaXJlZCA9IGZhbHNlLFxuXHRtb250aCA9ICdub25lJyxcbn0pID0+IHtcblx0Y29uc3Qgd2hlcmUgPSBbXTtcblx0aWYgKCFzaG93RXhwaXJlZCkge1xuXHRcdHdoZXJlLnB1c2goXG5cdFx0XHQnd2hlcmVbVEtUX2VuZF9kYXRlKipleHBpcmVkXVtdPScgK1xuXHRcdFx0XHRHUkVBVEVSX1RIQU4gK1xuXHRcdFx0XHQnJndoZXJlW1RLVF9lbmRfZGF0ZSoqZXhwaXJlZF1bXT0nICtcblx0XHRcdFx0bm93RGF0ZUFuZFRpbWUubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdH1cblx0aWYgKG1vbnRoICYmIG1vbnRoICE9PSAnbm9uZScpIHtcblx0XHR3aGVyZS5wdXNoKFxuXHRcdFx0J3doZXJlW1RLVF9zdGFydF9kYXRlXVtdPScgK1xuXHRcdFx0XHRHUkVBVEVSX1RIQU5fQU5EX0VRVUFMICtcblx0XHRcdFx0JyZ3aGVyZVtUS1Rfc3RhcnRfZGF0ZV1bXT0nICtcblx0XHRcdFx0bW9tZW50KCkubW9udGgobW9udGgpLnN0YXJ0T2YoJ21vbnRoJykubG9jYWwoKS5mb3JtYXQoKVxuXHRcdCk7XG5cdFx0d2hlcmUucHVzaChcblx0XHRcdCd3aGVyZVtUS1RfZW5kX2RhdGVdW109JyArXG5cdFx0XHRcdExFU1NfVEhBTl9BTkRfRVFVQUwgK1xuXHRcdFx0XHQnJndoZXJlW1RLVF9lbmRfZGF0ZV1bXT0nICtcblx0XHRcdFx0bW9tZW50KCkubW9udGgobW9udGgpLmVuZE9mKCdtb250aCcpLmxvY2FsKCkuZm9ybWF0KClcblx0XHQpO1xuXHR9XG5cdGZvckV2ZW50SWQgPSBwYXJzZUludChmb3JFdmVudElkLCAxMCk7XG5cdGlmIChmb3JFdmVudElkICE9PSAwICYmICFpc05hTihmb3JFdmVudElkKSkge1xuXHRcdHdoZXJlLnB1c2goJ3doZXJlW0RhdGV0aW1lLkV2ZW50LkVWVF9JRF09JyArIGZvckV2ZW50SWQpO1xuXHR9XG5cdGZvckRhdGV0aW1lSWQgPSBwYXJzZUludChmb3JEYXRldGltZUlkLCAxMCk7XG5cdGlmIChmb3JEYXRldGltZUlkICE9PSAwICYmICFpc05hTihmb3JEYXRldGltZUlkKSkge1xuXHRcdHdoZXJlLnB1c2goJ3doZXJlW0RhdGV0aW1lLkRUVF9JRF09JyArIGZvckRhdGV0aW1lSWQpO1xuXHR9XG5cdHJldHVybiB3aGVyZS5qb2luKCcmJyk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHF1ZXJ5IHN0cmluZyBmb3IgdXNlIGJ5IGEgUkVTVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIHF1ZXJ5RGF0YS5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBxdWVyeURhdGFcbiAqIEByZXR1cm4geyBzdHJpbmcgfSAgUmV0dXJucyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAocXVlcnlEYXRhID0ge30pID0+IHtcblx0cXVlcnlEYXRhID0geyAuLi5kZWZhdWx0UXVlcnlEYXRhLnF1ZXJ5RGF0YSwgLi4ucXVlcnlEYXRhIH07XG5cdHJldHVybiBiYXNlR2V0UXVlcnlTdHJpbmcocXVlcnlEYXRhLCB3aGVyZUNvbmRpdGlvbnMsIG1hcE9yZGVyQnkpO1xufTtcbiIsIi8qKlxuICogTWVtaXplIG9wdGlvbnMgb2JqZWN0LlxuICpcbiAqIEB0eXBlZGVmIE1lbWl6ZU9wdGlvbnNcbiAqXG4gKiBAcHJvcGVydHkge251bWJlcn0gW21heFNpemVdIE1heGltdW0gc2l6ZSBvZiB0aGUgY2FjaGUuXG4gKi9cblxuLyoqXG4gKiBJbnRlcm5hbCBjYWNoZSBlbnRyeS5cbiAqXG4gKiBAdHlwZWRlZiBNZW1pemVDYWNoZU5vZGVcbiAqXG4gKiBAcHJvcGVydHkgez9NZW1pemVDYWNoZU5vZGV8dW5kZWZpbmVkfSBbcHJldl0gUHJldmlvdXMgbm9kZS5cbiAqIEBwcm9wZXJ0eSB7P01lbWl6ZUNhY2hlTm9kZXx1bmRlZmluZWR9IFtuZXh0XSBOZXh0IG5vZGUuXG4gKiBAcHJvcGVydHkge0FycmF5PCo+fSAgICAgICAgICAgICAgICAgICBhcmdzICAgRnVuY3Rpb24gYXJndW1lbnRzIGZvciBjYWNoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LlxuICogQHByb3BlcnR5IHsqfSAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsICAgIEZ1bmN0aW9uIHJlc3VsdC5cbiAqL1xuXG4vKipcbiAqIFByb3BlcnRpZXMgb2YgdGhlIGVuaGFuY2VkIGZ1bmN0aW9uIGZvciBjb250cm9sbGluZyBjYWNoZS5cbiAqXG4gKiBAdHlwZWRlZiBNZW1pemVNZW1vaXplZEZ1bmN0aW9uXG4gKlxuICogQHByb3BlcnR5IHsoKT0+dm9pZH0gY2xlYXIgQ2xlYXIgdGhlIGNhY2hlLlxuICovXG5cbi8qKlxuICogQWNjZXB0cyBhIGZ1bmN0aW9uIHRvIGJlIG1lbW9pemVkLCBhbmQgcmV0dXJucyBhIG5ldyBtZW1vaXplZCBmdW5jdGlvbiwgd2l0aFxuICogb3B0aW9uYWwgb3B0aW9ucy5cbiAqXG4gKiBAdGVtcGxhdGUge0Z1bmN0aW9ufSBGXG4gKlxuICogQHBhcmFtIHtGfSAgICAgICAgICAgICBmbiAgICAgICAgRnVuY3Rpb24gdG8gbWVtb2l6ZS5cbiAqIEBwYXJhbSB7TWVtaXplT3B0aW9uc30gW29wdGlvbnNdIE9wdGlvbnMgb2JqZWN0LlxuICpcbiAqIEByZXR1cm4ge0YgJiBNZW1pemVNZW1vaXplZEZ1bmN0aW9ufSBNZW1vaXplZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWVtaXplKCBmbiwgb3B0aW9ucyApIHtcblx0dmFyIHNpemUgPSAwO1xuXG5cdC8qKiBAdHlwZSB7P01lbWl6ZUNhY2hlTm9kZXx1bmRlZmluZWR9ICovXG5cdHZhciBoZWFkO1xuXG5cdC8qKiBAdHlwZSB7P01lbWl6ZUNhY2hlTm9kZXx1bmRlZmluZWR9ICovXG5cdHZhciB0YWlsO1xuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdGZ1bmN0aW9uIG1lbW9pemVkKCAvKiAuLi5hcmdzICovICkge1xuXHRcdHZhciBub2RlID0gaGVhZCxcblx0XHRcdGxlbiA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0XHRhcmdzLCBpO1xuXG5cdFx0c2VhcmNoQ2FjaGU6IHdoaWxlICggbm9kZSApIHtcblx0XHRcdC8vIFBlcmZvcm0gYSBzaGFsbG93IGVxdWFsaXR5IHRlc3QgdG8gY29uZmlybSB0aGF0IHdoZXRoZXIgdGhlIG5vZGVcblx0XHRcdC8vIHVuZGVyIHRlc3QgaXMgYSBjYW5kaWRhdGUgZm9yIHRoZSBhcmd1bWVudHMgcGFzc2VkLiBUd28gYXJyYXlzXG5cdFx0XHQvLyBhcmUgc2hhbGxvd2x5IGVxdWFsIGlmIHRoZWlyIGxlbmd0aCBtYXRjaGVzIGFuZCBlYWNoIGVudHJ5IGlzXG5cdFx0XHQvLyBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuIHRoZSB0d28gc2V0cy4gQXZvaWQgYWJzdHJhY3RpbmcgdG8gYVxuXHRcdFx0Ly8gZnVuY3Rpb24gd2hpY2ggY291bGQgaW5jdXIgYW4gYXJndW1lbnRzIGxlYWtpbmcgZGVvcHRpbWl6YXRpb24uXG5cblx0XHRcdC8vIENoZWNrIHdoZXRoZXIgbm9kZSBhcmd1bWVudHMgbWF0Y2ggYXJndW1lbnRzIGxlbmd0aFxuXHRcdFx0aWYgKCBub2RlLmFyZ3MubGVuZ3RoICE9PSBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgd2hldGhlciBub2RlIGFyZ3VtZW50cyBtYXRjaCBhcmd1bWVudHMgdmFsdWVzXG5cdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRpZiAoIG5vZGUuYXJnc1sgaSBdICE9PSBhcmd1bWVudHNbIGkgXSApIHtcblx0XHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRcdGNvbnRpbnVlIHNlYXJjaENhY2hlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQgd2UgY2FuIGFzc3VtZSB3ZSd2ZSBmb3VuZCBhIG1hdGNoXG5cblx0XHRcdC8vIFN1cmZhY2UgbWF0Y2hlZCBub2RlIHRvIGhlYWQgaWYgbm90IGFscmVhZHlcblx0XHRcdGlmICggbm9kZSAhPT0gaGVhZCApIHtcblx0XHRcdFx0Ly8gQXMgdGFpbCwgc2hpZnQgdG8gcHJldmlvdXMuIE11c3Qgb25seSBzaGlmdCBpZiBub3QgYWxzb1xuXHRcdFx0XHQvLyBoZWFkLCBzaW5jZSBpZiBib3RoIGhlYWQgYW5kIHRhaWwsIHRoZXJlIGlzIG5vIHByZXZpb3VzLlxuXHRcdFx0XHRpZiAoIG5vZGUgPT09IHRhaWwgKSB7XG5cdFx0XHRcdFx0dGFpbCA9IG5vZGUucHJldjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkanVzdCBzaWJsaW5ncyB0byBwb2ludCB0byBlYWNoIG90aGVyLiBJZiBub2RlIHdhcyB0YWlsLFxuXHRcdFx0XHQvLyB0aGlzIGFsc28gaGFuZGxlcyBuZXcgdGFpbCdzIGVtcHR5IGBuZXh0YCBhc3NpZ25tZW50LlxuXHRcdFx0XHQvKiogQHR5cGUge01lbWl6ZUNhY2hlTm9kZX0gKi8gKCBub2RlLnByZXYgKS5uZXh0ID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRpZiAoIG5vZGUubmV4dCApIHtcblx0XHRcdFx0XHRub2RlLm5leHQucHJldiA9IG5vZGUucHJldjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG5vZGUubmV4dCA9IGhlYWQ7XG5cdFx0XHRcdG5vZGUucHJldiA9IG51bGw7XG5cdFx0XHRcdC8qKiBAdHlwZSB7TWVtaXplQ2FjaGVOb2RlfSAqLyAoIGhlYWQgKS5wcmV2ID0gbm9kZTtcblx0XHRcdFx0aGVhZCA9IG5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJldHVybiBpbW1lZGlhdGVseVxuXHRcdFx0cmV0dXJuIG5vZGUudmFsO1xuXHRcdH1cblxuXHRcdC8vIE5vIGNhY2hlZCB2YWx1ZSBmb3VuZC4gQ29udGludWUgdG8gaW5zZXJ0aW9uIHBoYXNlOlxuXG5cdFx0Ly8gQ3JlYXRlIGEgY29weSBvZiBhcmd1bWVudHMgKGF2b2lkIGxlYWtpbmcgZGVvcHRpbWl6YXRpb24pXG5cdFx0YXJncyA9IG5ldyBBcnJheSggbGVuICk7XG5cdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdGFyZ3NbIGkgXSA9IGFyZ3VtZW50c1sgaSBdO1xuXHRcdH1cblxuXHRcdG5vZGUgPSB7XG5cdFx0XHRhcmdzOiBhcmdzLFxuXG5cdFx0XHQvLyBHZW5lcmF0ZSB0aGUgcmVzdWx0IGZyb20gb3JpZ2luYWwgZnVuY3Rpb25cblx0XHRcdHZhbDogZm4uYXBwbHkoIG51bGwsIGFyZ3MgKSxcblx0XHR9O1xuXG5cdFx0Ly8gRG9uJ3QgbmVlZCB0byBjaGVjayB3aGV0aGVyIG5vZGUgaXMgYWxyZWFkeSBoZWFkLCBzaW5jZSBpdCB3b3VsZFxuXHRcdC8vIGhhdmUgYmVlbiByZXR1cm5lZCBhYm92ZSBhbHJlYWR5IGlmIGl0IHdhc1xuXG5cdFx0Ly8gU2hpZnQgZXhpc3RpbmcgaGVhZCBkb3duIGxpc3Rcblx0XHRpZiAoIGhlYWQgKSB7XG5cdFx0XHRoZWFkLnByZXYgPSBub2RlO1xuXHRcdFx0bm9kZS5uZXh0ID0gaGVhZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gSWYgbm8gaGVhZCwgZm9sbG93cyB0aGF0IHRoZXJlJ3Mgbm8gdGFpbCAoYXQgaW5pdGlhbCBvciByZXNldClcblx0XHRcdHRhaWwgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8vIFRyaW0gdGFpbCBpZiB3ZSdyZSByZWFjaGVkIG1heCBzaXplIGFuZCBhcmUgcGVuZGluZyBjYWNoZSBpbnNlcnRpb25cblx0XHRpZiAoIHNpemUgPT09IC8qKiBAdHlwZSB7TWVtaXplT3B0aW9uc30gKi8gKCBvcHRpb25zICkubWF4U2l6ZSApIHtcblx0XHRcdHRhaWwgPSAvKiogQHR5cGUge01lbWl6ZUNhY2hlTm9kZX0gKi8gKCB0YWlsICkucHJldjtcblx0XHRcdC8qKiBAdHlwZSB7TWVtaXplQ2FjaGVOb2RlfSAqLyAoIHRhaWwgKS5uZXh0ID0gbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2l6ZSsrO1xuXHRcdH1cblxuXHRcdGhlYWQgPSBub2RlO1xuXG5cdFx0cmV0dXJuIG5vZGUudmFsO1xuXHR9XG5cblx0bWVtb2l6ZWQuY2xlYXIgPSBmdW5jdGlvbigpIHtcblx0XHRoZWFkID0gbnVsbDtcblx0XHR0YWlsID0gbnVsbDtcblx0XHRzaXplID0gMDtcblx0fTtcblxuXHRpZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcgKSB7XG5cdFx0Ly8gQ2FjaGUgaXMgbm90IGV4cG9zZWQgaW4gdGhlIHB1YmxpYyBBUEksIGJ1dCB1c2VkIGluIHRlc3RzIHRvIGVuc3VyZVxuXHRcdC8vIGV4cGVjdGVkIGxpc3QgcHJvZ3Jlc3Npb25cblx0XHRtZW1vaXplZC5nZXRDYWNoZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIFsgaGVhZCwgdGFpbCwgc2l6ZSBdO1xuXHRcdH07XG5cdH1cblxuXHQvLyBJZ25vcmUgcmVhc29uOiBUaGVyZSdzIG5vdCBhIGNsZWFyIHNvbHV0aW9uIHRvIGNyZWF0ZSBhbiBpbnRlcnNlY3Rpb24gb2Zcblx0Ly8gdGhlIGZ1bmN0aW9uIHdpdGggYWRkaXRpb25hbCBwcm9wZXJ0aWVzLCB3aGVyZSB0aGUgZ29hbCBpcyB0byByZXRhaW4gdGhlXG5cdC8vIGZ1bmN0aW9uIHNpZ25hdHVyZSBvZiB0aGUgaW5jb21pbmcgYXJndW1lbnQgYW5kIGFkZCBjb250cm9sIHByb3BlcnRpZXNcblx0Ly8gb24gdGhlIHJldHVybiB2YWx1ZS5cblxuXHQvLyBAdHMtaWdub3JlXG5cdHJldHVybiBtZW1vaXplZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZW1pemU7XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKHJvb3QsIHBsdXJhbGl6ZSkge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAodHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gTm9kZS5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHBsdXJhbGl6ZSgpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRCwgcmVnaXN0ZXJzIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBwbHVyYWxpemUoKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbC5cbiAgICByb290LnBsdXJhbGl6ZSA9IHBsdXJhbGl6ZSgpO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gIC8vIFJ1bGUgc3RvcmFnZSAtIHBsdXJhbGl6ZSBhbmQgc2luZ3VsYXJpemUgbmVlZCB0byBiZSBydW4gc2VxdWVudGlhbGx5LFxuICAvLyB3aGlsZSBvdGhlciBydWxlcyBjYW4gYmUgb3B0aW1pemVkIHVzaW5nIGFuIG9iamVjdCBmb3IgaW5zdGFudCBsb29rdXBzLlxuICB2YXIgcGx1cmFsUnVsZXMgPSBbXTtcbiAgdmFyIHNpbmd1bGFyUnVsZXMgPSBbXTtcbiAgdmFyIHVuY291bnRhYmxlcyA9IHt9O1xuICB2YXIgaXJyZWd1bGFyUGx1cmFscyA9IHt9O1xuICB2YXIgaXJyZWd1bGFyU2luZ2xlcyA9IHt9O1xuXG4gIC8qKlxuICAgKiBTYW5pdGl6ZSBhIHBsdXJhbGl6YXRpb24gcnVsZSB0byBhIHVzYWJsZSByZWd1bGFyIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSAgeyhSZWdFeHB8c3RyaW5nKX0gcnVsZVxuICAgKiBAcmV0dXJuIHtSZWdFeHB9XG4gICAqL1xuICBmdW5jdGlvbiBzYW5pdGl6ZVJ1bGUgKHJ1bGUpIHtcbiAgICBpZiAodHlwZW9mIHJ1bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyBydWxlICsgJyQnLCAnaScpO1xuICAgIH1cblxuICAgIHJldHVybiBydWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3MgaW4gYSB3b3JkIHRva2VuIHRvIHByb2R1Y2UgYSBmdW5jdGlvbiB0aGF0IGNhbiByZXBsaWNhdGUgdGhlIGNhc2Ugb25cbiAgICogYW5vdGhlciB3b3JkLlxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgd29yZFxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdG9rZW5cbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiByZXN0b3JlQ2FzZSAod29yZCwgdG9rZW4pIHtcbiAgICAvLyBUb2tlbnMgYXJlIGFuIGV4YWN0IG1hdGNoLlxuICAgIGlmICh3b3JkID09PSB0b2tlbikgcmV0dXJuIHRva2VuO1xuXG4gICAgLy8gTG93ZXIgY2FzZWQgd29yZHMuIEUuZy4gXCJoZWxsb1wiLlxuICAgIGlmICh3b3JkID09PSB3b3JkLnRvTG93ZXJDYXNlKCkpIHJldHVybiB0b2tlbi50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gVXBwZXIgY2FzZWQgd29yZHMuIEUuZy4gXCJXSElTS1lcIi5cbiAgICBpZiAod29yZCA9PT0gd29yZC50b1VwcGVyQ2FzZSgpKSByZXR1cm4gdG9rZW4udG9VcHBlckNhc2UoKTtcblxuICAgIC8vIFRpdGxlIGNhc2VkIHdvcmRzLiBFLmcuIFwiVGl0bGVcIi5cbiAgICBpZiAod29yZFswXSA9PT0gd29yZFswXS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICByZXR1cm4gdG9rZW4uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0b2tlbi5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICAvLyBMb3dlciBjYXNlZCB3b3Jkcy4gRS5nLiBcInRlc3RcIi5cbiAgICByZXR1cm4gdG9rZW4udG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcnBvbGF0ZSBhIHJlZ2V4cCBzdHJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gc3RyXG4gICAqIEBwYXJhbSAge0FycmF5fSAgYXJnc1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBpbnRlcnBvbGF0ZSAoc3RyLCBhcmdzKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXCQoXFxkezEsMn0pL2csIGZ1bmN0aW9uIChtYXRjaCwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBhcmdzW2luZGV4XSB8fCAnJztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIGEgd29yZCB1c2luZyBhIHJ1bGUuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gd29yZFxuICAgKiBAcGFyYW0gIHtBcnJheX0gIHJ1bGVcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZSAod29yZCwgcnVsZSkge1xuICAgIHJldHVybiB3b3JkLnJlcGxhY2UocnVsZVswXSwgZnVuY3Rpb24gKG1hdGNoLCBpbmRleCkge1xuICAgICAgdmFyIHJlc3VsdCA9IGludGVycG9sYXRlKHJ1bGVbMV0sIGFyZ3VtZW50cyk7XG5cbiAgICAgIGlmIChtYXRjaCA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKHdvcmRbaW5kZXggLSAxXSwgcmVzdWx0KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKG1hdGNoLCByZXN1bHQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhbml0aXplIGEgd29yZCBieSBwYXNzaW5nIGluIHRoZSB3b3JkIGFuZCBzYW5pdGl6YXRpb24gcnVsZXMuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB0b2tlblxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgd29yZFxuICAgKiBAcGFyYW0gIHtBcnJheX0gICAgcnVsZXNcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gc2FuaXRpemVXb3JkICh0b2tlbiwgd29yZCwgcnVsZXMpIHtcbiAgICAvLyBFbXB0eSBzdHJpbmcgb3IgZG9lc24ndCBuZWVkIGZpeGluZy5cbiAgICBpZiAoIXRva2VuLmxlbmd0aCB8fCB1bmNvdW50YWJsZXMuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgICByZXR1cm4gd29yZDtcbiAgICB9XG5cbiAgICB2YXIgbGVuID0gcnVsZXMubGVuZ3RoO1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBzYW5pdGl6YXRpb24gcnVsZXMgYW5kIHVzZSB0aGUgZmlyc3Qgb25lIHRvIG1hdGNoLlxuICAgIHdoaWxlIChsZW4tLSkge1xuICAgICAgdmFyIHJ1bGUgPSBydWxlc1tsZW5dO1xuXG4gICAgICBpZiAocnVsZVswXS50ZXN0KHdvcmQpKSByZXR1cm4gcmVwbGFjZSh3b3JkLCBydWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd29yZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIGEgd29yZCB3aXRoIHRoZSB1cGRhdGVkIHdvcmQuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gICByZXBsYWNlTWFwXG4gICAqIEBwYXJhbSAge09iamVjdH0gICBrZWVwTWFwXG4gICAqIEBwYXJhbSAge0FycmF5fSAgICBydWxlc1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIHJlcGxhY2VXb3JkIChyZXBsYWNlTWFwLCBrZWVwTWFwLCBydWxlcykge1xuICAgIHJldHVybiBmdW5jdGlvbiAod29yZCkge1xuICAgICAgLy8gR2V0IHRoZSBjb3JyZWN0IHRva2VuIGFuZCBjYXNlIHJlc3RvcmF0aW9uIGZ1bmN0aW9ucy5cbiAgICAgIHZhciB0b2tlbiA9IHdvcmQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgLy8gQ2hlY2sgYWdhaW5zdCB0aGUga2VlcCBvYmplY3QgbWFwLlxuICAgICAgaWYgKGtlZXBNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3JkLCB0b2tlbik7XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIGFnYWluc3QgdGhlIHJlcGxhY2VtZW50IG1hcCBmb3IgYSBkaXJlY3Qgd29yZCByZXBsYWNlbWVudC5cbiAgICAgIGlmIChyZXBsYWNlTWFwLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2Uod29yZCwgcmVwbGFjZU1hcFt0b2tlbl0pO1xuICAgICAgfVxuXG4gICAgICAvLyBSdW4gYWxsIHRoZSBydWxlcyBhZ2FpbnN0IHRoZSB3b3JkLlxuICAgICAgcmV0dXJuIHNhbml0aXplV29yZCh0b2tlbiwgd29yZCwgcnVsZXMpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB3b3JkIGlzIHBhcnQgb2YgdGhlIG1hcC5cbiAgICovXG4gIGZ1bmN0aW9uIGNoZWNrV29yZCAocmVwbGFjZU1hcCwga2VlcE1hcCwgcnVsZXMsIGJvb2wpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHdvcmQpIHtcbiAgICAgIHZhciB0b2tlbiA9IHdvcmQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgaWYgKGtlZXBNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGlmIChyZXBsYWNlTWFwLmhhc093blByb3BlcnR5KHRva2VuKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICByZXR1cm4gc2FuaXRpemVXb3JkKHRva2VuLCB0b2tlbiwgcnVsZXMpID09PSB0b2tlbjtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFBsdXJhbGl6ZSBvciBzaW5ndWxhcml6ZSBhIHdvcmQgYmFzZWQgb24gdGhlIHBhc3NlZCBpbiBjb3VudC5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgd29yZCAgICAgIFRoZSB3b3JkIHRvIHBsdXJhbGl6ZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBjb3VudCAgICAgSG93IG1hbnkgb2YgdGhlIHdvcmQgZXhpc3RcbiAgICogQHBhcmFtICB7Ym9vbGVhbn0gaW5jbHVzaXZlIFdoZXRoZXIgdG8gcHJlZml4IHdpdGggdGhlIG51bWJlciAoZS5nLiAzIGR1Y2tzKVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBwbHVyYWxpemUgKHdvcmQsIGNvdW50LCBpbmNsdXNpdmUpIHtcbiAgICB2YXIgcGx1cmFsaXplZCA9IGNvdW50ID09PSAxXG4gICAgICA/IHBsdXJhbGl6ZS5zaW5ndWxhcih3b3JkKSA6IHBsdXJhbGl6ZS5wbHVyYWwod29yZCk7XG5cbiAgICByZXR1cm4gKGluY2x1c2l2ZSA/IGNvdW50ICsgJyAnIDogJycpICsgcGx1cmFsaXplZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQbHVyYWxpemUgYSB3b3JkLlxuICAgKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBwbHVyYWxpemUucGx1cmFsID0gcmVwbGFjZVdvcmQoXG4gICAgaXJyZWd1bGFyU2luZ2xlcywgaXJyZWd1bGFyUGx1cmFscywgcGx1cmFsUnVsZXNcbiAgKTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB3b3JkIGlzIHBsdXJhbC5cbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgcGx1cmFsaXplLmlzUGx1cmFsID0gY2hlY2tXb3JkKFxuICAgIGlycmVndWxhclNpbmdsZXMsIGlycmVndWxhclBsdXJhbHMsIHBsdXJhbFJ1bGVzXG4gICk7XG5cbiAgLyoqXG4gICAqIFNpbmd1bGFyaXplIGEgd29yZC5cbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgcGx1cmFsaXplLnNpbmd1bGFyID0gcmVwbGFjZVdvcmQoXG4gICAgaXJyZWd1bGFyUGx1cmFscywgaXJyZWd1bGFyU2luZ2xlcywgc2luZ3VsYXJSdWxlc1xuICApO1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHdvcmQgaXMgc2luZ3VsYXIuXG4gICAqXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIHBsdXJhbGl6ZS5pc1Npbmd1bGFyID0gY2hlY2tXb3JkKFxuICAgIGlycmVndWxhclBsdXJhbHMsIGlycmVndWxhclNpbmdsZXMsIHNpbmd1bGFyUnVsZXNcbiAgKTtcblxuICAvKipcbiAgICogQWRkIGEgcGx1cmFsaXphdGlvbiBydWxlIHRvIHRoZSBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwKX0gcnVsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgcmVwbGFjZW1lbnRcbiAgICovXG4gIHBsdXJhbGl6ZS5hZGRQbHVyYWxSdWxlID0gZnVuY3Rpb24gKHJ1bGUsIHJlcGxhY2VtZW50KSB7XG4gICAgcGx1cmFsUnVsZXMucHVzaChbc2FuaXRpemVSdWxlKHJ1bGUpLCByZXBsYWNlbWVudF0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYSBzaW5ndWxhcml6YXRpb24gcnVsZSB0byB0aGUgY29sbGVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cCl9IHJ1bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgIHJlcGxhY2VtZW50XG4gICAqL1xuICBwbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlID0gZnVuY3Rpb24gKHJ1bGUsIHJlcGxhY2VtZW50KSB7XG4gICAgc2luZ3VsYXJSdWxlcy5wdXNoKFtzYW5pdGl6ZVJ1bGUocnVsZSksIHJlcGxhY2VtZW50XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBhbiB1bmNvdW50YWJsZSB3b3JkIHJ1bGUuXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHApfSB3b3JkXG4gICAqL1xuICBwbHVyYWxpemUuYWRkVW5jb3VudGFibGVSdWxlID0gZnVuY3Rpb24gKHdvcmQpIHtcbiAgICBpZiAodHlwZW9mIHdvcmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB1bmNvdW50YWJsZXNbd29yZC50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU2V0IHNpbmd1bGFyIGFuZCBwbHVyYWwgcmVmZXJlbmNlcyBmb3IgdGhlIHdvcmQuXG4gICAgcGx1cmFsaXplLmFkZFBsdXJhbFJ1bGUod29yZCwgJyQwJyk7XG4gICAgcGx1cmFsaXplLmFkZFNpbmd1bGFyUnVsZSh3b3JkLCAnJDAnKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGFuIGlycmVndWxhciB3b3JkIGRlZmluaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzaW5nbGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBsdXJhbFxuICAgKi9cbiAgcGx1cmFsaXplLmFkZElycmVndWxhclJ1bGUgPSBmdW5jdGlvbiAoc2luZ2xlLCBwbHVyYWwpIHtcbiAgICBwbHVyYWwgPSBwbHVyYWwudG9Mb3dlckNhc2UoKTtcbiAgICBzaW5nbGUgPSBzaW5nbGUudG9Mb3dlckNhc2UoKTtcblxuICAgIGlycmVndWxhclNpbmdsZXNbc2luZ2xlXSA9IHBsdXJhbDtcbiAgICBpcnJlZ3VsYXJQbHVyYWxzW3BsdXJhbF0gPSBzaW5nbGU7XG4gIH07XG5cbiAgLyoqXG4gICAqIElycmVndWxhciBydWxlcy5cbiAgICovXG4gIFtcbiAgICAvLyBQcm9ub3Vucy5cbiAgICBbJ0knLCAnd2UnXSxcbiAgICBbJ21lJywgJ3VzJ10sXG4gICAgWydoZScsICd0aGV5J10sXG4gICAgWydzaGUnLCAndGhleSddLFxuICAgIFsndGhlbScsICd0aGVtJ10sXG4gICAgWydteXNlbGYnLCAnb3Vyc2VsdmVzJ10sXG4gICAgWyd5b3Vyc2VsZicsICd5b3Vyc2VsdmVzJ10sXG4gICAgWydpdHNlbGYnLCAndGhlbXNlbHZlcyddLFxuICAgIFsnaGVyc2VsZicsICd0aGVtc2VsdmVzJ10sXG4gICAgWydoaW1zZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgICBbJ3RoZW1zZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgICBbJ2lzJywgJ2FyZSddLFxuICAgIFsnd2FzJywgJ3dlcmUnXSxcbiAgICBbJ2hhcycsICdoYXZlJ10sXG4gICAgWyd0aGlzJywgJ3RoZXNlJ10sXG4gICAgWyd0aGF0JywgJ3Rob3NlJ10sXG4gICAgLy8gV29yZHMgZW5kaW5nIGluIHdpdGggYSBjb25zb25hbnQgYW5kIGBvYC5cbiAgICBbJ2VjaG8nLCAnZWNob2VzJ10sXG4gICAgWydkaW5nbycsICdkaW5nb2VzJ10sXG4gICAgWyd2b2xjYW5vJywgJ3ZvbGNhbm9lcyddLFxuICAgIFsndG9ybmFkbycsICd0b3JuYWRvZXMnXSxcbiAgICBbJ3RvcnBlZG8nLCAndG9ycGVkb2VzJ10sXG4gICAgLy8gRW5kcyB3aXRoIGB1c2AuXG4gICAgWydnZW51cycsICdnZW5lcmEnXSxcbiAgICBbJ3Zpc2N1cycsICd2aXNjZXJhJ10sXG4gICAgLy8gRW5kcyB3aXRoIGBtYWAuXG4gICAgWydzdGlnbWEnLCAnc3RpZ21hdGEnXSxcbiAgICBbJ3N0b21hJywgJ3N0b21hdGEnXSxcbiAgICBbJ2RvZ21hJywgJ2RvZ21hdGEnXSxcbiAgICBbJ2xlbW1hJywgJ2xlbW1hdGEnXSxcbiAgICBbJ3NjaGVtYScsICdzY2hlbWF0YSddLFxuICAgIFsnYW5hdGhlbWEnLCAnYW5hdGhlbWF0YSddLFxuICAgIC8vIE90aGVyIGlycmVndWxhciBydWxlcy5cbiAgICBbJ294JywgJ294ZW4nXSxcbiAgICBbJ2F4ZScsICdheGVzJ10sXG4gICAgWydkaWUnLCAnZGljZSddLFxuICAgIFsneWVzJywgJ3llc2VzJ10sXG4gICAgWydmb290JywgJ2ZlZXQnXSxcbiAgICBbJ2VhdmUnLCAnZWF2ZXMnXSxcbiAgICBbJ2dvb3NlJywgJ2dlZXNlJ10sXG4gICAgWyd0b290aCcsICd0ZWV0aCddLFxuICAgIFsncXVpeicsICdxdWl6emVzJ10sXG4gICAgWydodW1hbicsICdodW1hbnMnXSxcbiAgICBbJ3Byb29mJywgJ3Byb29mcyddLFxuICAgIFsnY2FydmUnLCAnY2FydmVzJ10sXG4gICAgWyd2YWx2ZScsICd2YWx2ZXMnXSxcbiAgICBbJ2xvb2V5JywgJ2xvb2llcyddLFxuICAgIFsndGhpZWYnLCAndGhpZXZlcyddLFxuICAgIFsnZ3Jvb3ZlJywgJ2dyb292ZXMnXSxcbiAgICBbJ3BpY2theGUnLCAncGlja2F4ZXMnXSxcbiAgICBbJ3Bhc3NlcmJ5JywgJ3Bhc3NlcnNieSddXG4gIF0uZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgIHJldHVybiBwbHVyYWxpemUuYWRkSXJyZWd1bGFyUnVsZShydWxlWzBdLCBydWxlWzFdKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFBsdXJhbGl6YXRpb24gcnVsZXMuXG4gICAqL1xuICBbXG4gICAgWy9zPyQvaSwgJ3MnXSxcbiAgICBbL1teXFx1MDAwMC1cXHUwMDdGXSQvaSwgJyQwJ10sXG4gICAgWy8oW15hZWlvdV1lc2UpJC9pLCAnJDEnXSxcbiAgICBbLyhheHx0ZXN0KWlzJC9pLCAnJDFlcyddLFxuICAgIFsvKGFsaWFzfFteYW91XXVzfHRbbG1dYXN8Z2FzfHJpcykkL2ksICckMWVzJ10sXG4gICAgWy8oZVttbl11KXM/JC9pLCAnJDFzJ10sXG4gICAgWy8oW15sXWlhc3xbYWVpb3VdbGFzfFtlanpyXWFzfFtpdV1hbSkkL2ksICckMSddLFxuICAgIFsvKGFsdW1ufHN5bGxhYnx2aXJ8cmFkaXxudWNsZXxmdW5nfGNhY3R8c3RpbXVsfHRlcm1pbnxiYWNpbGx8Zm9jfHV0ZXJ8bG9jfHN0cmF0KSg/OnVzfGkpJC9pLCAnJDFpJ10sXG4gICAgWy8oYWx1bW58YWxnfHZlcnRlYnIpKD86YXxhZSkkL2ksICckMWFlJ10sXG4gICAgWy8oc2VyYXBofGNoZXJ1YikoPzppbSk/JC9pLCAnJDFpbSddLFxuICAgIFsvKGhlcnxhdHxncilvJC9pLCAnJDFvZXMnXSxcbiAgICBbLyhhZ2VuZHxhZGRlbmR8bWlsbGVubml8ZGF0fGV4dHJlbXxiYWN0ZXJpfGRlc2lkZXJhdHxzdHJhdHxjYW5kZWxhYnJ8ZXJyYXR8b3Z8c3ltcG9zaXxjdXJyaWN1bHxhdXRvbWF0fHF1b3IpKD86YXx1bSkkL2ksICckMWEnXSxcbiAgICBbLyhhcGhlbGl8aHlwZXJiYXR8cGVyaWhlbGl8YXN5bmRldHxub3VtZW58cGhlbm9tZW58Y3JpdGVyaXxvcmdhbnxwcm9sZWdvbWVufGhlZHJ8YXV0b21hdCkoPzphfG9uKSQvaSwgJyQxYSddLFxuICAgIFsvc2lzJC9pLCAnc2VzJ10sXG4gICAgWy8oPzooa25pfHdpfGxpKWZlfChhcnxsfGVhfGVvfG9hfGhvbylmKSQvaSwgJyQxJDJ2ZXMnXSxcbiAgICBbLyhbXmFlaW91eV18cXUpeSQvaSwgJyQxaWVzJ10sXG4gICAgWy8oW15jaF1baWVvXVtsbl0pZXkkL2ksICckMWllcyddLFxuICAgIFsvKHh8Y2h8c3N8c2h8enopJC9pLCAnJDFlcyddLFxuICAgIFsvKG1hdHJ8Y29kfG11cnxzaWx8dmVydHxpbmR8YXBwZW5kKSg/Oml4fGV4KSQvaSwgJyQxaWNlcyddLFxuICAgIFsvXFxiKCg/OnRpdCk/bXxsKSg/OmljZXxvdXNlKSQvaSwgJyQxaWNlJ10sXG4gICAgWy8ocGUpKD86cnNvbnxvcGxlKSQvaSwgJyQxb3BsZSddLFxuICAgIFsvKGNoaWxkKSg/OnJlbik/JC9pLCAnJDFyZW4nXSxcbiAgICBbL2VhdXgkL2ksICckMCddLFxuICAgIFsvbVthZV1uJC9pLCAnbWVuJ10sXG4gICAgWyd0aG91JywgJ3lvdSddXG4gIF0uZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgIHJldHVybiBwbHVyYWxpemUuYWRkUGx1cmFsUnVsZShydWxlWzBdLCBydWxlWzFdKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFNpbmd1bGFyaXphdGlvbiBydWxlcy5cbiAgICovXG4gIFtcbiAgICBbL3MkL2ksICcnXSxcbiAgICBbLyhzcykkL2ksICckMSddLFxuICAgIFsvKHdpfGtuaXwoPzphZnRlcnxoYWxmfGhpZ2h8bG93fG1pZHxub258bmlnaHR8W15cXHddfF4pbGkpdmVzJC9pLCAnJDFmZSddLFxuICAgIFsvKGFyfCg/OndvfFthZV0pbHxbZW9dW2FvXSl2ZXMkL2ksICckMWYnXSxcbiAgICBbL2llcyQvaSwgJ3knXSxcbiAgICBbL1xcYihbcGxdfHpvbWJ8KD86bmVja3xjcm9zcyk/dHxjb2xsfGZhZXJ8Zm9vZHxnZW58Z29vbnxncm91cHxsYXNzfHRhbGt8Z29hbHxjdXQpaWVzJC9pLCAnJDFpZSddLFxuICAgIFsvXFxiKG1vbnxzbWlsKWllcyQvaSwgJyQxZXknXSxcbiAgICBbL1xcYigoPzp0aXQpP218bClpY2UkL2ksICckMW91c2UnXSxcbiAgICBbLyhzZXJhcGh8Y2hlcnViKWltJC9pLCAnJDEnXSxcbiAgICBbLyh4fGNofHNzfHNofHp6fHR0b3xnb3xjaG98YWxpYXN8W15hb3VddXN8dFtsbV1hc3xnYXN8KD86aGVyfGF0fGdyKW98W2FlaW91XXJpcykoPzplcyk/JC9pLCAnJDEnXSxcbiAgICBbLyhhbmFseXxkaWFnbm98cGFyZW50aGV8cHJvZ25vfHN5bm9wfHRoZXxlbXBoYXxjcml8bmUpKD86c2lzfHNlcykkL2ksICckMXNpcyddLFxuICAgIFsvKG1vdmllfHR3ZWx2ZXxhYnVzZXxlW21uXXUpcyQvaSwgJyQxJ10sXG4gICAgWy8odGVzdCkoPzppc3xlcykkL2ksICckMWlzJ10sXG4gICAgWy8oYWx1bW58c3lsbGFifHZpcnxyYWRpfG51Y2xlfGZ1bmd8Y2FjdHxzdGltdWx8dGVybWlufGJhY2lsbHxmb2N8dXRlcnxsb2N8c3RyYXQpKD86dXN8aSkkL2ksICckMXVzJ10sXG4gICAgWy8oYWdlbmR8YWRkZW5kfG1pbGxlbm5pfGRhdHxleHRyZW18YmFjdGVyaXxkZXNpZGVyYXR8c3RyYXR8Y2FuZGVsYWJyfGVycmF0fG92fHN5bXBvc2l8Y3VycmljdWx8cXVvcilhJC9pLCAnJDF1bSddLFxuICAgIFsvKGFwaGVsaXxoeXBlcmJhdHxwZXJpaGVsaXxhc3luZGV0fG5vdW1lbnxwaGVub21lbnxjcml0ZXJpfG9yZ2FufHByb2xlZ29tZW58aGVkcnxhdXRvbWF0KWEkL2ksICckMW9uJ10sXG4gICAgWy8oYWx1bW58YWxnfHZlcnRlYnIpYWUkL2ksICckMWEnXSxcbiAgICBbLyhjb2R8bXVyfHNpbHx2ZXJ0fGluZClpY2VzJC9pLCAnJDFleCddLFxuICAgIFsvKG1hdHJ8YXBwZW5kKWljZXMkL2ksICckMWl4J10sXG4gICAgWy8ocGUpKHJzb258b3BsZSkkL2ksICckMXJzb24nXSxcbiAgICBbLyhjaGlsZClyZW4kL2ksICckMSddLFxuICAgIFsvKGVhdSl4PyQvaSwgJyQxJ10sXG4gICAgWy9tZW4kL2ksICdtYW4nXVxuICBdLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICByZXR1cm4gcGx1cmFsaXplLmFkZFNpbmd1bGFyUnVsZShydWxlWzBdLCBydWxlWzFdKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFVuY291bnRhYmxlIHJ1bGVzLlxuICAgKi9cbiAgW1xuICAgIC8vIFNpbmd1bGFyIHdvcmRzIHdpdGggbm8gcGx1cmFscy5cbiAgICAnYWR1bHRob29kJyxcbiAgICAnYWR2aWNlJyxcbiAgICAnYWdlbmRhJyxcbiAgICAnYWlkJyxcbiAgICAnYWlyY3JhZnQnLFxuICAgICdhbGNvaG9sJyxcbiAgICAnYW1tbycsXG4gICAgJ2FuYWx5dGljcycsXG4gICAgJ2FuaW1lJyxcbiAgICAnYXRobGV0aWNzJyxcbiAgICAnYXVkaW8nLFxuICAgICdiaXNvbicsXG4gICAgJ2Jsb29kJyxcbiAgICAnYnJlYW0nLFxuICAgICdidWZmYWxvJyxcbiAgICAnYnV0dGVyJyxcbiAgICAnY2FycCcsXG4gICAgJ2Nhc2gnLFxuICAgICdjaGFzc2lzJyxcbiAgICAnY2hlc3MnLFxuICAgICdjbG90aGluZycsXG4gICAgJ2NvZCcsXG4gICAgJ2NvbW1lcmNlJyxcbiAgICAnY29vcGVyYXRpb24nLFxuICAgICdjb3JwcycsXG4gICAgJ2RlYnJpcycsXG4gICAgJ2RpYWJldGVzJyxcbiAgICAnZGlnZXN0aW9uJyxcbiAgICAnZWxrJyxcbiAgICAnZW5lcmd5JyxcbiAgICAnZXF1aXBtZW50JyxcbiAgICAnZXhjcmV0aW9uJyxcbiAgICAnZXhwZXJ0aXNlJyxcbiAgICAnZmlybXdhcmUnLFxuICAgICdmbG91bmRlcicsXG4gICAgJ2Z1bicsXG4gICAgJ2dhbGxvd3MnLFxuICAgICdnYXJiYWdlJyxcbiAgICAnZ3JhZmZpdGknLFxuICAgICdoYXJkd2FyZScsXG4gICAgJ2hlYWRxdWFydGVycycsXG4gICAgJ2hlYWx0aCcsXG4gICAgJ2hlcnBlcycsXG4gICAgJ2hpZ2hqaW5rcycsXG4gICAgJ2hvbWV3b3JrJyxcbiAgICAnaG91c2V3b3JrJyxcbiAgICAnaW5mb3JtYXRpb24nLFxuICAgICdqZWFucycsXG4gICAgJ2p1c3RpY2UnLFxuICAgICdrdWRvcycsXG4gICAgJ2xhYm91cicsXG4gICAgJ2xpdGVyYXR1cmUnLFxuICAgICdtYWNoaW5lcnknLFxuICAgICdtYWNrZXJlbCcsXG4gICAgJ21haWwnLFxuICAgICdtZWRpYScsXG4gICAgJ21ld3MnLFxuICAgICdtb29zZScsXG4gICAgJ211c2ljJyxcbiAgICAnbXVkJyxcbiAgICAnbWFuZ2EnLFxuICAgICduZXdzJyxcbiAgICAnb25seScsXG4gICAgJ3BlcnNvbm5lbCcsXG4gICAgJ3Bpa2UnLFxuICAgICdwbGFua3RvbicsXG4gICAgJ3BsaWVycycsXG4gICAgJ3BvbGljZScsXG4gICAgJ3BvbGx1dGlvbicsXG4gICAgJ3ByZW1pc2VzJyxcbiAgICAncmFpbicsXG4gICAgJ3Jlc2VhcmNoJyxcbiAgICAncmljZScsXG4gICAgJ3NhbG1vbicsXG4gICAgJ3NjaXNzb3JzJyxcbiAgICAnc2VyaWVzJyxcbiAgICAnc2V3YWdlJyxcbiAgICAnc2hhbWJsZXMnLFxuICAgICdzaHJpbXAnLFxuICAgICdzb2Z0d2FyZScsXG4gICAgJ3NwZWNpZXMnLFxuICAgICdzdGFmZicsXG4gICAgJ3N3aW5lJyxcbiAgICAndGVubmlzJyxcbiAgICAndHJhZmZpYycsXG4gICAgJ3RyYW5zcG9ydGF0aW9uJyxcbiAgICAndHJvdXQnLFxuICAgICd0dW5hJyxcbiAgICAnd2VhbHRoJyxcbiAgICAnd2VsZmFyZScsXG4gICAgJ3doaXRpbmcnLFxuICAgICd3aWxkZWJlZXN0JyxcbiAgICAnd2lsZGxpZmUnLFxuICAgICd5b3UnLFxuICAgIC9wb2tbZcOpXW1vbiQvaSxcbiAgICAvLyBSZWdleGVzLlxuICAgIC9bXmFlaW91XWVzZSQvaSwgLy8gXCJjaGluZXNlXCIsIFwiamFwYW5lc2VcIlxuICAgIC9kZWVyJC9pLCAvLyBcImRlZXJcIiwgXCJyZWluZGVlclwiXG4gICAgL2Zpc2gkL2ksIC8vIFwiZmlzaFwiLCBcImJsb3dmaXNoXCIsIFwiYW5nZWxmaXNoXCJcbiAgICAvbWVhc2xlcyQvaSxcbiAgICAvb1tpdV1zJC9pLCAvLyBcImNhcm5pdm9yb3VzXCJcbiAgICAvcG94JC9pLCAvLyBcImNoaWNrcG94XCIsIFwic21hbGxwb3hcIlxuICAgIC9zaGVlcCQvaVxuICBdLmZvckVhY2gocGx1cmFsaXplLmFkZFVuY291bnRhYmxlUnVsZSk7XG5cbiAgcmV0dXJuIHBsdXJhbGl6ZTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG4gIHZhciBoYXMgPSByZXF1aXJlKCcuL2xpYi9oYXMnKTtcblxuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkgeyAvKiovIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAoaGFzKHR5cGVTcGVjcywgdHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpZiAodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YXIgZXJyID0gRXJyb3IoXG4gICAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogJyArIGxvY2F0aW9uICsgJyB0eXBlIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgJyArXG4gICAgICAgICAgICAgICdpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJyArIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSArICdgLicgK1xuICAgICAgICAgICAgICAnVGhpcyBvZnRlbiBoYXBwZW5zIGJlY2F1c2Ugb2YgdHlwb3Mgc3VjaCBhcyBgUHJvcFR5cGVzLmZ1bmN0aW9uYCBpbnN0ZWFkIG9mIGBQcm9wVHlwZXMuZnVuY2AuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yICYmICEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAnICtcbiAgICAgICAgICAgIGxvY2F0aW9uICsgJyBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJyArIHR5cGVvZiBlcnJvciArICcuICcgK1xuICAgICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArXG4gICAgICAgICAgICAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnRmFpbGVkICcgKyBsb2NhdGlvbiArICcgdHlwZTogJyArIGVycm9yLm1lc3NhZ2UgKyAoc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlc2V0cyB3YXJuaW5nIGNhY2hlIHdoZW4gdGVzdGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jaGVja1Byb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL2xpYi9oYXMnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG5mdW5jdGlvbiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJpZ2ludDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2JpZ2ludCcpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGVsZW1lbnRUeXBlOiBjcmVhdGVFbGVtZW50VHlwZVR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyLFxuICAgIGV4YWN0OiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyLFxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlLCBkYXRhKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhICYmIHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyA/IGRhdGE6IHt9O1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJyArIHByb3BGdWxsTmFtZSArICdgIHByb3Agb24gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpLFxuICAgICAgICAgIHtleHBlY3RlZFR5cGU6IGV4cGVjdGVkVHlwZX1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlVHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFSZWFjdElzLmlzVmFsaWRFbGVtZW50VHlwZShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudCB0eXBlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnRzIHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBhcnJheSwgZ290ICcgKyBhcmd1bWVudHMubGVuZ3RoICsgJyBhcmd1bWVudHMuICcgK1xuICAgICAgICAgICAgJ0EgY29tbW9uIG1pc3Rha2UgaXMgdG8gd3JpdGUgb25lT2YoeCwgeSwgeikgaW5zdGVhZCBvZiBvbmVPZihbeCwgeSwgel0pLidcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gYXJyYXkuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzLCBmdW5jdGlvbiByZXBsYWNlcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBTdHJpbmcocHJvcFZhbHVlKSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAoaGFzKHByb3BWYWx1ZSwga2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJyArIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSArICcgYXQgaW5kZXggJyArIGkgKyAnLidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgZXhwZWN0ZWRUeXBlcyA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgICAgdmFyIGNoZWNrZXJSZXN1bHQgPSBjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoY2hlY2tlclJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoZWNrZXJSZXN1bHQuZGF0YSAmJiBoYXMoY2hlY2tlclJlc3VsdC5kYXRhLCAnZXhwZWN0ZWRUeXBlJykpIHtcbiAgICAgICAgICBleHBlY3RlZFR5cGVzLnB1c2goY2hlY2tlclJlc3VsdC5kYXRhLmV4cGVjdGVkVHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBleHBlY3RlZFR5cGVzTWVzc2FnZSA9IChleHBlY3RlZFR5cGVzLmxlbmd0aCA+IDApID8gJywgZXhwZWN0ZWQgb25lIG9mIHR5cGUgWycgKyBleHBlY3RlZFR5cGVzLmpvaW4oJywgJykgKyAnXSc6ICcnO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCcgKyBleHBlY3RlZFR5cGVzTWVzc2FnZSArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52YWxpZFZhbGlkYXRvckVycm9yKGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIGtleSwgdHlwZSkge1xuICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogJyArIGxvY2F0aW9uICsgJyB0eXBlIGAnICsgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5ICsgJ2AgaXMgaW52YWxpZDsgJyArXG4gICAgICAnaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCcgKyB0eXBlICsgJ2AuJ1xuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRWYWxpZGF0b3JFcnJvcihjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBrZXksIGdldFByZWNpc2VUeXBlKGNoZWNrZXIpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbSBwcm9wcy5cbiAgICAgIHZhciBhbGxLZXlzID0gYXNzaWduKHt9LCBwcm9wc1twcm9wTmFtZV0sIHNoYXBlVHlwZXMpO1xuICAgICAgZm9yICh2YXIga2V5IGluIGFsbEtleXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmIChoYXMoc2hhcGVUeXBlcywga2V5KSAmJiB0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkVmFsaWRhdG9yRXJyb3IoY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwga2V5LCBnZXRQcmVjaXNlVHlwZShjaGVja2VyKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gZmFsc3kgdmFsdWUgY2FuJ3QgYmUgYSBTeW1ib2xcbiAgICBpZiAoIXByb3BWYWx1ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlID0gY2hlY2tQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGU7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKFJlYWN0SXMuaXNFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiIsIm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuIiwiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi4xMy4xXG4gKiByZWFjdC1pcy5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG52YXIgUkVBQ1RfUE9SVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wb3J0YWwnKSA6IDB4ZWFjYTtcbnZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcbnZhciBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3RyaWN0X21vZGUnKSA6IDB4ZWFjYztcbnZhciBSRUFDVF9QUk9GSUxFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvZmlsZXInKSA6IDB4ZWFkMjtcbnZhciBSRUFDVF9QUk9WSURFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKSA6IDB4ZWFjZDtcbnZhciBSRUFDVF9DT05URVhUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb250ZXh0JykgOiAweGVhY2U7IC8vIFRPRE86IFdlIGRvbid0IHVzZSBBc3luY01vZGUgb3IgQ29uY3VycmVudE1vZGUgYW55bW9yZS4gVGhleSB3ZXJlIHRlbXBvcmFyeVxuLy8gKHVuc3RhYmxlKSBBUElzIHRoYXQgaGF2ZSBiZWVuIHJlbW92ZWQuIENhbiB3ZSByZW1vdmUgdGhlIHN5bWJvbHM/XG5cbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb25jdXJyZW50X21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKSA6IDB4ZWFkMDtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbnZhciBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZV9saXN0JykgOiAweGVhZDg7XG52YXIgUkVBQ1RfTUVNT19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubWVtbycpIDogMHhlYWQzO1xudmFyIFJFQUNUX0xBWllfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmxhenknKSA6IDB4ZWFkNDtcbnZhciBSRUFDVF9CTE9DS19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuYmxvY2snKSA6IDB4ZWFkOTtcbnZhciBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnVuZGFtZW50YWwnKSA6IDB4ZWFkNTtcbnZhciBSRUFDVF9SRVNQT05ERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnJlc3BvbmRlcicpIDogMHhlYWQ2O1xudmFyIFJFQUNUX1NDT1BFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zY29wZScpIDogMHhlYWQ3O1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9SRVNQT05ERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9TQ09QRV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0JMT0NLX1RZUEUpO1xufVxuXG5mdW5jdGlvbiB0eXBlT2Yob2JqZWN0KSB7XG4gIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwpIHtcbiAgICB2YXIgJCR0eXBlb2YgPSBvYmplY3QuJCR0eXBlb2Y7XG5cbiAgICBzd2l0Y2ggKCQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0VMRU1FTlRfVFlQRTpcbiAgICAgICAgdmFyIHR5cGUgPSBvYmplY3QudHlwZTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX0FTWU5DX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciAkJHR5cGVvZlR5cGUgPSB0eXBlICYmIHR5cGUuJCR0eXBlb2Y7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9QUk9WSURFUl9UWVBFOlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZlR5cGU7XG5cbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn0gLy8gQXN5bmNNb2RlIGlzIGRlcHJlY2F0ZWQgYWxvbmcgd2l0aCBpc0FzeW5jTW9kZVxuXG52YXIgQXN5bmNNb2RlID0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xudmFyIENvbmN1cnJlbnRNb2RlID0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG52YXIgQ29udGV4dENvbnN1bWVyID0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xudmFyIENvbnRleHRQcm92aWRlciA9IFJFQUNUX1BST1ZJREVSX1RZUEU7XG52YXIgRWxlbWVudCA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcbnZhciBGb3J3YXJkUmVmID0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbnZhciBGcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG52YXIgTGF6eSA9IFJFQUNUX0xBWllfVFlQRTtcbnZhciBNZW1vID0gUkVBQ1RfTUVNT19UWVBFO1xudmFyIFBvcnRhbCA9IFJFQUNUX1BPUlRBTF9UWVBFO1xudmFyIFByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbnZhciBTdHJpY3RNb2RlID0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbnZhciBTdXNwZW5zZSA9IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG52YXIgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSBmYWxzZTsgLy8gQXN5bmNNb2RlIHNob3VsZCBiZSBkZXByZWNhdGVkXG5cbmZ1bmN0aW9uIGlzQXN5bmNNb2RlKG9iamVjdCkge1xuICB7XG4gICAgaWYgKCFoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSkge1xuICAgICAgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSB0cnVlOyAvLyBVc2luZyBjb25zb2xlWyd3YXJuJ10gdG8gZXZhZGUgQmFiZWwgYW5kIEVTTGludFxuXG4gICAgICBjb25zb2xlWyd3YXJuJ10oJ1RoZSBSZWFjdElzLmlzQXN5bmNNb2RlKCkgYWxpYXMgaGFzIGJlZW4gZGVwcmVjYXRlZCwgJyArICdhbmQgd2lsbCBiZSByZW1vdmVkIGluIFJlYWN0IDE3Ky4gVXBkYXRlIHlvdXIgY29kZSB0byB1c2UgJyArICdSZWFjdElzLmlzQ29uY3VycmVudE1vZGUoKSBpbnN0ZWFkLiBJdCBoYXMgdGhlIGV4YWN0IHNhbWUgQVBJLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkgfHwgdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRDb25zdW1lcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05URVhUX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRQcm92aWRlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9WSURFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNGb3J3YXJkUmVmKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZyYWdtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0xhenkob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTEFaWV9UWVBFO1xufVxuZnVuY3Rpb24gaXNNZW1vKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX01FTU9fVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUG9ydGFsKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BPUlRBTF9UWVBFO1xufVxuZnVuY3Rpb24gaXNQcm9maWxlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdHJpY3RNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N1c3BlbnNlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG59XG5cbmV4cG9ydHMuQXN5bmNNb2RlID0gQXN5bmNNb2RlO1xuZXhwb3J0cy5Db25jdXJyZW50TW9kZSA9IENvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5Db250ZXh0Q29uc3VtZXIgPSBDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLkNvbnRleHRQcm92aWRlciA9IENvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuRWxlbWVudCA9IEVsZW1lbnQ7XG5leHBvcnRzLkZvcndhcmRSZWYgPSBGb3J3YXJkUmVmO1xuZXhwb3J0cy5GcmFnbWVudCA9IEZyYWdtZW50O1xuZXhwb3J0cy5MYXp5ID0gTGF6eTtcbmV4cG9ydHMuTWVtbyA9IE1lbW87XG5leHBvcnRzLlBvcnRhbCA9IFBvcnRhbDtcbmV4cG9ydHMuUHJvZmlsZXIgPSBQcm9maWxlcjtcbmV4cG9ydHMuU3RyaWN0TW9kZSA9IFN0cmljdE1vZGU7XG5leHBvcnRzLlN1c3BlbnNlID0gU3VzcGVuc2U7XG5leHBvcnRzLmlzQXN5bmNNb2RlID0gaXNBc3luY01vZGU7XG5leHBvcnRzLmlzQ29uY3VycmVudE1vZGUgPSBpc0NvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lciA9IGlzQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlciA9IGlzQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzRm9yd2FyZFJlZiA9IGlzRm9yd2FyZFJlZjtcbmV4cG9ydHMuaXNGcmFnbWVudCA9IGlzRnJhZ21lbnQ7XG5leHBvcnRzLmlzTGF6eSA9IGlzTGF6eTtcbmV4cG9ydHMuaXNNZW1vID0gaXNNZW1vO1xuZXhwb3J0cy5pc1BvcnRhbCA9IGlzUG9ydGFsO1xuZXhwb3J0cy5pc1Byb2ZpbGVyID0gaXNQcm9maWxlcjtcbmV4cG9ydHMuaXNTdHJpY3RNb2RlID0gaXNTdHJpY3RNb2RlO1xuZXhwb3J0cy5pc1N1c3BlbnNlID0gaXNTdXNwZW5zZTtcbmV4cG9ydHMuaXNWYWxpZEVsZW1lbnRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlO1xuZXhwb3J0cy50eXBlT2YgPSB0eXBlT2Y7XG4gIH0pKCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wibG9kYXNoXCJdOyIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wiZWVqc1wiXVtcImhlbHBlcnNcIl07IiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJlZWpzXCJdW1wiaTE4blwiXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImVlanNcIl1bXCJ2YWxpZGF0b3JzXCJdOyIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wiZWVqc1wiXVtcInZhbHVlT2JqZWN0c1wiXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImVlanNcIl1bXCJ2ZW5kb3JcIl1bXCJjdWlkXCJdOyIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wiZWVqc1wiXVtcInZlbmRvclwiXVtcIm1vbWVudFwiXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImVlanNcIl07IiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJ3cFwiXVtcImhvb2tzXCJdOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgKiBmcm9tICcuL2RlZmF1bHQtbW9kZWwtc3RhdGUnO1xuZXhwb3J0ICogZnJvbSAnLi9lbmRwb2ludHMnO1xuZXhwb3J0ICogZnJvbSAnLi9wcmltYXJ5LWtleXMnO1xuZXhwb3J0ICogZnJvbSAnLi9hc3NlcnRpb25zJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWwtbmFtZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9iYXNlJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzJztcbmV4cG9ydCAqIGZyb20gJy4vZW50aXR5LWZhY3RvcnknO1xuIl0sIm5hbWVzIjpbIkV4Y2VwdGlvbiIsInNwcmludGYiLCJfXyIsImlzQXJyYXkiLCJpc0VtcHR5IiwiaXNNYXAiLCJhc3NlcnRFbnRpdHlIYXNLZXkiLCJrZXkiLCJlbnRpdHkiLCJtZXNzYWdlIiwiaGFzT3duUHJvcGVydHkiLCJhc3NlcnRJbW11dGFibGVPYmplY3RIYXNQYXRoIiwicGF0aCIsImltbXV0YWJsZSIsImhhc0luIiwiYXNzZXJ0SXNBcnJheSIsIml0ZW1zIiwiYXNzZXJ0SXNOb3RFbXB0eSIsImFzc2VydElzTWFwIiwiaXRlbSIsIk1PREVMX05BTUUiLCJpc1VuZGVmaW5lZCIsIlByb3BUeXBlcyIsImdldFF1ZXJ5U3RyaW5nIiwiYmFzZUdldFF1ZXJ5U3RyaW5nIiwiUVVFUllfT1JERVJfQVNDIiwiQUxMT1dFRF9PUkRFUl9WQUxVRVMiLCJSRUdJU1RSQVRJT05fU1RBVFVTX0lEUyIsIm9yZGVyQnlNYXAiLCJpZCIsImxhc3ROYW1lT25seSIsImZpcnN0TmFtZU9ubHkiLCJmaXJzdFRoZW5MYXN0TmFtZSIsImxhc3RUaGVuRmlyc3ROYW1lIiwicXVlcnlEYXRhVHlwZXMiLCJmb3JFdmVudElkIiwibnVtYmVyIiwiZm9yRGF0ZXRpbWVJZCIsImZvclRpY2tldElkIiwiZm9yU3RhdHVzSWQiLCJvbmVPZiIsImZvclJlZ2lzdHJhdGlvbklkIiwic2hvd0dyYXZhdGFyIiwiYm9vbCIsInF1ZXJ5RGF0YSIsInNoYXBlIiwibGltaXQiLCJvcmRlckJ5IiwiT2JqZWN0Iiwia2V5cyIsIm9yZGVyIiwiZGVmYXVsdFF1ZXJ5RGF0YSIsIm1hcE9yZGVyQnkiLCJ3aGVyZUNvbmRpdGlvbnMiLCJ3aGVyZSIsInBhcnNlSW50IiwiaXNOYU4iLCJwdXNoIiwiaW5jbHVkZXMiLCJqb2luIiwiZGF0ZUZvcm1hdHMiLCJmb3JtYXREYXRlc09uRW50aXRpZXMiLCJlbnRpdGllcyIsImVudGl0eURhdGVGaWVsZHMiLCJmb3JtYXQiLCJEQVRFX1RJTUVfRk9STUFUX0lTTzg2MDEiLCJsb2NhbCIsImZvcm1hdHRlZEVudGl0aWVzIiwiZm9yRWFjaCIsImZvcm1hdERhdGVzT25FbnRpdHkiLCJuZXdFbnRpdHkiLCJkYXRlRmllbGQiLCJmb3JtYXREYXRlU3RyaW5nIiwiZm9ybWF0RW50aXRpZXNEYXRlc1RvTXlzcWwiLCJEQVRFX1RJTUVfRk9STUFUX01ZU1FMIiwiZm9ybWF0RW50aXR5RGF0ZXNUb015c3FsIiwiZm9ybWF0RW50aXRpZXNEYXRlc1RvU2l0ZSIsIkRBVEVfVElNRV9GT1JNQVRfU0lURSIsImZvcm1hdEVudGl0eURhdGVzVG9TaXRlIiwiY29udmVydEVudGl0aWVzRGF0ZXNUb01vbWVudCIsImNvbnZlcnRFbnRpdHlEYXRlc1RvTW9tZW50Iiwic3RyaW5nVG9Nb21lbnQiLCJRVUVSWV9PUkRFUl9ERVNDIiwiR1JFQVRFUl9USEFOIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiTEVTU19USEFOIiwiR1JFQVRFUl9USEFOX0FORF9FUVVBTCIsIkxFU1NfVEhBTl9BTkRfRVFVQUwiLCJkZWZhdWx0V2hlcmVDb25kaXRpb25zIiwicXVlcnlQYXJhbXMiLCJmaWVsZCIsInF1ZXJ5U3RyaW5nIiwidmFsdWVzIiwiQ0hFQ0tJTl9TVEFUVVNfSUQiLCJTVEFUVVNfQ0hFQ0tFRF9PVVQiLCJTVEFUVVNfQ0hFQ0tFRF9JTiIsIlNUQVRVU19DSEVDS0VEX05FVkVSIiwiQ0hFQ0tJTl9TVEFUVVNfSURTIiwicHJldHR5U3RhdHVzIiwiY2hlY2tpblN0YXR1cyIsIm9wdGlvbnNFbnRpdHlNYXAiLCJkZWZhdWx0IiwibGFiZWwiLCJ2YWx1ZSIsInRpbWVzdGFtcCIsIkRBVEVUSU1FX1NUQVRVU19JRCIsIlNPTERfT1VUIiwiQUNUSVZFIiwiVVBDT01JTkciLCJQT1NUUE9ORUQiLCJDQU5DRUxMRUQiLCJFWFBJUkVEIiwiSU5BQ1RJVkUiLCJEQVRFVElNRV9TVEFUVVNfSURTIiwiYmFzZUZvcm1hdHRlciIsImZvck93biIsInB1bGxBdCIsIlRJTUVfRk9STUFUX1NJVEUiLCJhbGxEYXRlVGltZXNBc1N0cmluZyIsIlNFUEFSQVRPUl9TUEFDRV9EQVNIX1NQQUNFIiwiaXNNb2RlbEVudGl0eU9mTW9kZWwiLCJEQVRFX0ZJRUxEUyIsImZvcm1hdHRlcnMiLCJpbXBsZW1lbnRhdGlvbiIsImZ1bmN0aW9uTmFtZSIsImluY29taW5nQXJncyIsImZpcnN0QXJnIiwicHJldHR5RGF0ZUZyb21EYXRlVGltZSIsIkRhdGVUaW1lRW50aXR5IiwiY29udGVudCIsIkRUVF9FVlRfc3RhcnQiLCJoYXNTYW1lIiwiRFRUX0VWVF9lbmQiLCJ0b0Zvcm1hdCIsIkRUVF9uYW1lIiwibW9tZW50Iiwibm93RGF0ZUFuZFRpbWUiLCJzaG93RXhwaXJlZCIsIm1vbnRoIiwic3RhcnRfZGF0ZSIsImVuZF9kYXRlIiwic3RhcnRPZiIsImVuZE9mIiwibWFwVmFsdWVzIiwibWVtb2l6ZSIsImVuZHBvaW50cyIsIm1hcFRvT2JqZWN0VmFsdWVzIiwibW9kZWxOYW1lRW5kcG9pbnRzIiwiZ2V0RGVmYXVsdE1vZGVsRW50aXRpZXNPYmplY3QiLCJERUZBVUxUX0xJU1RTX1NUQVRFIiwiREVGQVVMVF9DT1JFX1NUQVRFIiwicmVsYXRpb25zIiwiZGlydHkiLCJpbmRleCIsImRlbGV0ZSIsImFkZCIsInRyYXNoIiwiREVGQVVMVF9TQ0hFTUFfU1RBVEUiLCJzY2hlbWEiLCJmYWN0b3J5IiwicmVsYXRpb25FbmRwb2ludHMiLCJyZWxhdGlvblNjaGVtYSIsImRhdGEiLCJjb2xsZWN0aW9uX2VuZHBvaW50cyIsImJhc2VfcmVzdF9yb3V0ZSIsImJhc2VSZXN0Um91dGUiLCJwYXRocyIsImdldEVuZHBvaW50IiwibW9kZWxOYW1lIiwiYXBwbHlRdWVyeVN0cmluZyIsInN0cmlwQmFzZVJvdXRlRnJvbVVybCIsInVybCIsInJlcGxhY2UiLCJJbnZhbGlkU2NoZW1hIiwiaXNTY2hlbWEiLCJNb25leSIsIlNlcnZlckRhdGVUaW1lIiwiRGF0ZVRpbWUiLCJpc0RhdGVUaW1lRmllbGQiLCJpc01vbmV5RmllbGQiLCJpc1NoYWxsb3dWYWxpZFZhbHVlRm9yRmllbGQiLCJ2YWxpZGF0ZUVudW1UeXBlIiwidmFsaWRhdGVUeXBlIiwidmFsaWRhdGVUeXBlRm9yRmllbGQiLCJtYXliZUNvbnZlcnRGcm9tVmFsdWVPYmplY3RXaXRoQXNzZXJ0aW9ucyIsIm1heWJlQXNzZXJ0VmFsdWVPYmplY3QiLCJmaWVsZE5hbWUiLCJmaWVsZFZhbHVlIiwiYXNzZXJ0SXNEYXRlVGltZSIsImFzc2VydE1vbmV5IiwiYXNzZXJ0VmFsaWRTY2hlbWEiLCJhc3NlcnRWYWxpZFNjaGVtYUZpZWxkUHJvcGVydGllcyIsIlR5cGVFcnJvciIsInR5cGUiLCJwcm9wZXJ0aWVzIiwicmF3IiwiYXNzZXJ0VmFsaWRWYWx1ZUZvclByZXBhcmVkRmllbGQiLCJpbnN0YW5jZSIsImlzVmFsaWQiLCJlbnVtIiwiYXNzZXJ0VmFsaWRGaWVsZEFuZFZhbHVlQWdhaW5zdFNjaGVtYSIsInZhbGlkYXRpb25UeXBlIiwidXBwZXJGaXJzdCIsImNhbWVsQ2FzZSIsImNyZWF0ZUdldHRlciIsImNyZWF0ZUVudGl0eUdldHRlcnNBbmRTZXR0ZXJzIiwiY3JlYXRlUGVyc2lzdGluZ0dldHRlcnNBbmRTZXR0ZXJzIiwic2V0U2F2ZVN0YXRlIiwiU0FWRV9TVEFURSIsIlBSSVZBVEVfUFJPUEVSVElFUyIsIlZBTElEQVRFX1RZUEVTIiwiQmFzZUVudGl0eSIsImNvbnN0cnVjdG9yIiwiZW50aXR5RmllbGRzQW5kVmFsdWVzIiwiZmllbGRQcmVmaXhlcyIsImlzTmV3IiwiQ0xFQU4iLCJORVciLCJTZXQiLCJzZWFsIiwic2F2ZVN0YXRlIiwiaXNEaXJ0eSIsIkRJUlRZIiwiaXNDbGVhbiIsImlzUGFzc3dvcmRQcm90ZWN0ZWQiLCJwcm90ZWN0ZWRGaWVsZHMiLCJsZW5ndGgiLCJpc0ZpZWxkUGFzc3dvcmRQcm90ZWN0ZWQiLCJpbmRleE9mIiwiY2xvbmUiLCJrZWVwSWQiLCJjcmVhdGVGYWN0b3J5IiwiY3JlYXRlRW50aXR5RmFjdG9yeSIsIiRzY2hlbWEiLCJjcmVhdGVOZXciLCJmb3JDbG9uZSIsIm5hbWVDbGFzcyIsIm5hbWUiLCJleHRlbmRlZENsYXNzIiwiRW50aXR5IiwiY2xhc3NEZWYiLCJmaWVsZHNBbmRWYWx1ZXMiLCJmcm9tRXhpc3RpbmciLCJpc1BsYWluT2JqZWN0IiwiaGFzUmF3UHJvcGVydHkiLCJoYXNQcmV0dHlQcm9wZXJ0eSIsInByZXR0eSIsImhhc1JlbmRlcmVkUHJvcGVydHkiLCJyZW5kZXJlZCIsImhhc0Zvcm1hdFByb3BlcnR5IiwiaGFzRW51bVByb3BlcnR5IiwiaXNWYWx1ZU9iamVjdEZpZWxkIiwiaXNVVENEYXRlVGltZUZpZWxkIiwiZGF0ZVRpbWVGaWVsZE5hbWUiLCJpc1ByaW1hcnlLZXlGaWVsZCIsInByaW1hcnlfa2V5IiwiaXNSZWFkT25seSIsInJlYWRvbmx5IiwiaXNFbnRpdHlGaWVsZCIsImlzRW51bUZpZWxkIiwiYXBwbHlGaWx0ZXJzIiwiU3ltYm9sIiwiVkFMSURBVEVfVFlQRSIsIlJBVyIsIlJFTkRFUkVEIiwiUFJFVFRZIiwiTU9ERUxfUFJFRklYRVMiLCJwcmVmaXhNYXAiLCJhbnN3ZXIiLCJhdHRlbmRlZSIsImNoYW5nZV9sb2ciLCJjaGVja2luIiwiY291bnRyeSIsImN1cnJlbmN5IiwiY3VycmVuY3lfcGF5bWVudF9tZXRob2QiLCJkYXRldGltZSIsImRhdGV0aW1lX3RpY2tldCIsImV2ZW50IiwiZXZlbnRfbWVzc2FnZV90ZW1wbGF0ZSIsImV2ZW50X3F1ZXN0aW9uX2dyb3VwIiwiZXZlbnRfdmVudWUiLCJleHRyYV9qb2luIiwiZXh0cmFfbWV0YSIsImxpbmVfaXRlbSIsIm1lc3NhZ2VfdGVtcGxhdGUiLCJtZXNzYWdlX3RlbXBsYXRlX2dyb3VwIiwicGF5bWVudCIsInBheW1lbnRfbWV0aG9kIiwicG9zdF9tZXRhIiwicHJpY2UiLCJwcmljZV90eXBlIiwicXVlc3Rpb24iLCJxdWVzdGlvbl9ncm91cCIsInF1ZXN0aW9uX2dyb3VwX3F1ZXN0aW9uIiwicXVlc3Rpb25fb3B0aW9uIiwicmVnaXN0cmF0aW9uIiwicmVnaXN0cmF0aW9uX3BheW1lbnQiLCJzdGF0ZSIsInN0YXR1cyIsInRlcm0iLCJ0ZXJtX3JlbGF0aW9uc2hpcCIsInRlcm1fdGF4b25vbXkiLCJ0aWNrZXQiLCJ0aWNrZXRfcHJpY2UiLCJ0aWNrZXRfdGVtcGxhdGUiLCJ0cmFuc2FjdGlvbiIsInZlbnVlIiwid3BfdXNlciIsInNvcnRCeSIsImN1aWQiLCJJbnZhbGlkQXJndW1lbnQiLCJkZXJpdmVSZW5kZXJlZFZhbHVlIiwiZGVyaXZlUHJlcGFyZWRWYWx1ZUZvckZpZWxkIiwiZ2V0UmVsYXRpb25OYW1lRnJvbUxpbmsiLCJnZXRCYXNlRmllbGRzQW5kVmFsdWVzRm9yQ2xvbmluZyIsImdldEJhc2VGaWVsZHNBbmRWYWx1ZXNGb3JQZXJzaXN0aW5nIiwiZ2V0UHJpbWFyeUtleUZpZWxkc0Zyb21TY2hlbWEiLCJnZXRFbnRpdHlGaWVsZHNGcm9tU2NoZW1hIiwiZ2V0RGVmYXVsdFZhbHVlRm9yRmllbGQiLCJkZXJpdmVWYWxpZGF0ZVR5cGVGb3JGaWVsZCIsIm9wdHMiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImNyZWF0ZUNhbGxiYWNrR2V0dGVyIiwicHJvcGVydHlOYW1lIiwiY2FsbEJhY2siLCJjcmVhdGVHZXR0ZXJBbmRTZXR0ZXIiLCJpbml0aWFsRmllbGRWYWx1ZSIsInByb3BlcnR5VmFsdWUiLCJzZXQiLCJyZWNlaXZlZFZhbHVlIiwiaXNQcmltYXJ5RmllbGQiLCJzZXRGaWVsZFRvUGVyc2lzdCIsImNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyIiwib3JpZ2luYWxGaWVsZE5hbWUiLCJhbGlhc0ZpZWxkTmFtZSIsImNyZWF0ZUFsaWFzR2V0dGVyIiwiY3JlYXRlRmx1ZW50U2V0dGVyIiwicHJpbWFyeUtleXMiLCJvcmlnaW5hbEZpZWxkc0FuZFZhbHVlcyIsImlzUHJpbWFyeUtleSIsInNldFZhbGlkYXRlVHlwZUZvckZpZWxkIiwic2V0SW5pdGlhbEVudGl0eUZpZWxkc0FuZFZhbHVlcyIsInNldENhbGN1bGF0ZWRGaWVsZEFuZFZhbHVlcyIsInBvcHVsYXRlUHJvdGVjdGVkRmllbGRzUHJvcGVydHkiLCJzZXRSZXNvdXJjZXMiLCJjcmVhdGVQcmltYXJ5S2V5RmllbGRHZXR0ZXJzIiwicG9wdWxhdGVQcmltYXJ5S2V5cyIsInBvcHVsYXRlTWlzc2luZ0ZpZWxkcyIsImNhbGN1bGF0ZWRGaWVsZHMiLCJfY2FsY3VsYXRlZF9maWVsZHMiLCJfcHJvdGVjdGVkIiwic2NoZW1hUHJvcGVydGllcyIsInNjaGVtYUZpZWxkIiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImNyZWF0ZUFsaWFzR2V0dGVyQW5kU2V0dGVyRm9yRmllbGQiLCJ1bmRlZmluZWQiLCJmb3JVcGRhdGUiLCJmb3JJbnNlcnQiLCJlbnRpdHlWYWx1ZXMiLCJwcmltYXJ5S2V5IiwiZm9yUGVyc2lzdCIsImNyZWF0ZVJhd0VudGl0eUdldHRlcnNTZXR0ZXJzIiwiY3JlYXRlUmVuZGVyZWRHZXR0ZXJzIiwiY3JlYXRlQWxpYXNHZXR0ZXJGb3JGaWVsZCIsImNyZWF0ZUFsaWFzZXNGb3JNZXRob2QiLCJtZXRob2QiLCJuZXdGaWVsZE5hbWUiLCJmaWVsZFByZWZpeCIsImdldFJlbmRlcmVkQ2FsbGJhY2siLCJyZXF1ZXN0ZWRGaWVsZE5hbWUiLCJyZW1vdmVQcmVmaXhlc0Zyb21GaWVsZCIsInByZWZpeGVzVG9SZW1vdmUiLCJwcmVmaXgiLCJnZXRSZW5kZXJlZCIsImhhc011bHRpcGxlUHJpbWFyeUtleXNDYWxsYmFjayIsImhhc0NhbGN1bGF0ZWRGaWVsZENhbGxiYWNrIiwiZmllbGROYW1lVG9DaGVjayIsImNhbGN1bGF0ZWRGaWVsZFZhbHVlIiwiY2FsY3VsYXRlZEZpZWxkTmFtZSIsInJlbGF0aW9uTmFtZSIsInJlc291cmNlVmFsdWUiLCJyZXNvdXJjZU5hbWUiLCJocmVmIiwic2V0UmVsYXRpb25zUmVzb3VyY2UiLCJnZXRSZWxhdGlvblJlc291cmNlQ2FsbGJhY2siLCJyZXNvdXJjZUluZm8iLCJyZXNvdXJjZUxpbmsiLCJzaW5nbGUiLCJnZXRSZWxhdGlvblJlc291cmNlIiwib3ZlcnJpZGUiLCJjdXJyZW50U3RhdGUiLCJmaWVsZHNUb1BlcnNpc3RPbkluc2VydCIsImxhc3QiLCJwaWNrIiwicGlja0J5IiwiaW5zdGFuY2VPZiIsIlNpdGVDdXJyZW5jeSIsInBsdXJhbE1vZGVsTmFtZSIsIm1heWJlQ29udmVydFRvVmFsdWVPYmplY3QiLCJ2YWxpZGF0ZUlzRGF0ZVRpbWUiLCJmcm9tSVNPIiwidG9JU08iLCJ0b051bWJlciIsIm1heWJlQ29udmVydEZyb21WYWx1ZU9iamVjdCIsInNwbGl0IiwiZW50aXR5SW5zdGFuY2UiLCJyZWR1Y2UiLCJpdGVyYXRvciIsIkFycmF5IiwiZnJvbSIsImdldFByaW1hcnlLZXlWYWx1ZXMiLCJkZXJpdmVEZWZhdWx0VmFsdWVGb3JUeXBlIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZGVyaXZlVHlwZUZvckZpZWxkIiwiaXNJbnRlZ2VyIiwiaXNTdHJpbmciLCJpc0Jvb2xlYW4iLCJpc051bWJlciIsInZhbGlkIiwic2luZ2xlVHlwZSIsImVudW1WYWx1ZXMiLCJleHBlY3RWYWx1ZU9iamVjdHMiLCJpc0VudW0iLCJpc1ZhbHVlT2JqZWN0IiwiRVZFTlRfU1RBVFVTX0lEIiwiRVZFTlRfU1RBVFVTX0lEUyIsImNhdGVnb3J5U2x1ZyIsInN0cmluZyIsInRpY2tldF9zdGFydCIsInRpY2tldF9lbmQiLCJzdGFydENhc2UiLCJwbHVyYWxpemUiLCJNT0RFTF9OQU1FUyIsInNpbmd1bGFyTW9kZWxOYW1lIiwic2luZ3VsYXIiLCJtb2RlbE5hbWVGb3JRdWVyeVN0cmluZyIsImRhdGVUaW1lTW9kZWwiLCJldmVudE1vZGVsIiwicmVnaXN0cmF0aW9uTW9kZWwiLCJzdGF0dXNNb2RlbCIsInRpY2tldE1vZGVsIiwiY2hlY2tJbk1vZGVsIiwiYXR0ZW5kZWVNb2RlbCIsInRyaW1FbmQiLCJwcmltYXJ5X2tleXMiLCJ2YWx1ZXNGb3JDb21iaW5lZFByaW1hcnlLZXlzIiwicmVzdWx0IiwidmFsdWVGb3JQcmltYXJ5S2V5IiwiZ2V0UHJpbWFyeUtleSIsImdldFByaW1hcnlLZXlRdWVyeVN0cmluZyIsImtleVZhbHVlcyIsImdldEVudGl0eVByaW1hcnlLZXlWYWx1ZXMiLCJrZXlFbnRpdGllc0J5UHJpbWFyeUtleVZhbHVlIiwibWFwcGVkRW50aXRpZXMiLCJNYXAiLCJjcmVhdGVBbmRLZXlFbnRpdGllc0J5UHJpbWFyeUtleVZhbHVlIiwiZW50aXR5SWQiLCJSRUdJU1RSQVRJT05fU1RBVFVTX0lEIiwiZm9yQXR0ZW5kZWVJZCIsImZvclRyYW5zYWN0aW9uSWQiLCJyZWdfaWQiLCJyZWdfZGF0ZSIsIlNUQVRVU19UWVBFX0VNQUlMIiwiU1RBVFVTX1RZUEVfRVZFTlQiLCJTVEFUVVNfVFlQRV9NRVNTQUdFIiwiU1RBVFVTX1RZUEVfUEFZTUVOVCIsIlNUQVRVU19UWVBFX1JFR0lTVFJBVElPTiIsIlNUQVRVU19UWVBFX1RSQU5TQUNUSU9OIiwiRU1BSUxfU1RBVFVTX0lEIiwiRFJBRlQiLCJTRU5UIiwiUkVHSVNUUkFUSU9OX0NMT1NFRCIsIkRFTEVURUQiLCJERU5JRUQiLCJOT1RfQUNUSVZFIiwiTk9UX09QRU4iLCJPTkdPSU5HIiwiUkVHSVNUUkFUSU9OX09QRU4iLCJQRU5ESU5HIiwiU0VDT05EQVJZIiwiTUVTU0FHRV9TVEFUVVNfSUQiLCJERUJVRyIsIkVYRUNVVElORyIsIkZBSUwiLCJJTkNPTVBMRVRFIiwiSURMRSIsIlJFU0VORCIsIlJFVFJZIiwiUEFZTUVOVF9TVEFUVVNfSUQiLCJBUFBST1ZFRCIsIkRFQ0xJTkVEIiwiRkFJTEVEIiwiTk9UX0FQUFJPVkVEIiwiUEVORElOR19QQVlNRU5UIiwiV0FJVF9MSVNUIiwiVFJBTlNBQ1RJT05fU1RBVFVTX0lEIiwiQUJBTkRPTkVEIiwiQ09NUExFVEUiLCJPVkVSUEFJRCIsIkNQVF9TVEFUVVNfSUQiLCJQVUJMSVNIIiwiRlVUVVJFIiwiUFJJVkFURSIsIlRSQVNIRUQiLCJVTktOT1dOX1NUQVRVU19JRCIsIkFMTF9TVEFUVVNfSURTIiwiVElDS0VUX1NUQVRVU19JRCIsIkxhYmVsIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9SRUdJU1RSQVRJT04iLCJmcm9tU2FtZVNpbmdsZUFuZFBsdXJhbCIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfVFJBTlNBQ1RJT04iLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX1BBWU1FTlQiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX01FU1NBR0UiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX0NQVCIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfRVZFTlQiLCJTVEFUVVNfVFJBTlNMQVRJT05fTUFQX1RJQ0tFVCIsIkFSQ0hJVkVEIiwiT05TQUxFIiwiU1RBVFVTX1RSQU5TTEFUSU9OX01BUF9EQVRFVElNRSIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQ0hFQ0tJTiIsIlNUQVRVU19UUkFOU0xBVElPTl9NQVBfQUxMIiwic3RhdHVzQ29kZSIsIkZPUk1BVF9TRU5URU5DRV9DQVNFIiwiYXNGb3JtYXR0ZWQiLCJwcmV0dHlTdGF0dXNlcyIsInN0YXR1c0NvZGVzIiwibWFwcGVkU3RhdHVzZXMiLCJzdGF0dXNUeXBlIiwiVElDS0VUX1NUQVRVU19JRFMiXSwic291cmNlUm9vdCI6IiJ9
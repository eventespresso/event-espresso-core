(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["data-stores"],{

/***/ "./assets/src/data/eventespresso/core/actions.js":
/*!*******************************************************!*\
  !*** ./assets/src/data/eventespresso/core/actions.js ***!
  \*******************************************************/
/*! exports provided: receiveEntityRecords, cleanEntityById, cleanEntities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveEntityRecords", function() { return receiveEntityRecords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanEntityById", function() { return cleanEntityById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanEntities", function() { return cleanEntities; });
/**
 * Returns an action object used to update the store with the provided entities.
 *
 * @param { string } modelName
 * @param { Array } entities
 * @return {{type: string, modelName: string, dirty: boolean, entities: Array}}
 *            Object for action
 */
function receiveEntityRecords(modelName) {
  var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return {
    type: 'RECEIVE_ENTITY_RECORDS',
    modelName: modelName,
    entities: entities
  };
}

/**
 * Returns an action object used to update the entity with the given id in the
 * store so that it is considered "clean" not dirty (sets dirty flag to false).
 * Typically, this will get used by save/persist to server actions.
 *
 * @param { string } modelName
 * @param { number } entityId
 * @return {{type: string, modelName: *, entityId: *}}
 * 			Object for action.
 */
function cleanEntityById(modelName, entityId) {
  return {
    type: 'CLEAN_ENTITY',
    modelName: modelName,
    entityId: entityId
  };
}

/**
 * Returns an action object used to update the given entities in the store so
 * that they are considered "clean" not dirty (sets dirty flag to false).
 * Typically, this will get used by save/persist to server actions.
 *
 * @param { string } modelName
 * @param { Array } entities
 * @return {{type: string, modelName: *, entities: Array}}
 * 			Object for action.
 */
function cleanEntities(modelName) {
  var entities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return {
    type: 'CLEAN_ENTITIES',
    modelName: modelName,
    entities: entities
  };
}

/***/ }),

/***/ "./assets/src/data/eventespresso/core/index.js":
/*!*****************************************************!*\
  !*** ./assets/src/data/eventespresso/core/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers */ "./assets/src/data/eventespresso/core/reducers.js");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectors */ "./assets/src/data/eventespresso/core/selectors.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions */ "./assets/src/data/eventespresso/core/actions.js");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */




/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["registerStore"])('eventespresso/core', {
  reducer: _reducers__WEBPACK_IMPORTED_MODULE_1__["default"],
  actions: _actions__WEBPACK_IMPORTED_MODULE_3__,
  selectors: _selectors__WEBPACK_IMPORTED_MODULE_2__
}));

/***/ }),

/***/ "./assets/src/data/eventespresso/core/reducers.js":
/*!********************************************************!*\
  !*** ./assets/src/data/eventespresso/core/reducers.js ***!
  \********************************************************/
/*! exports provided: cleanEntities, cleanEntityById, receiveEntityRecords, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanEntities", function() { return cleanEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanEntityById", function() { return cleanEntityById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveEntityRecords", function() { return receiveEntityRecords; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_is_shallow_equal_objects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/is-shallow-equal/objects */ "./node_modules/@wordpress/is-shallow-equal/objects.js");
/* harmony import */ var _wordpress_is_shallow_equal_objects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_is_shallow_equal_objects__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/eejs */ "@eventespresso/eejs");
/* harmony import */ var _eventespresso_eejs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../model */ "./assets/src/data/model/index.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * External dependencies
 */





/**
 * Internal dependencies
 */


/**
 * Returns an array of dirty entity ids from the provided entities.
 *
 * @param { string } modelName
 * @param { Object } state
 * @param { Array } entities
 * @return { Array }  Returns an array.
 */
var getDirtyEntityIds = function getDirtyEntityIds(modelName, state, entities) {
	var dirty = [];
	var id = void 0;
	entities.forEach(function (entity) {
		// dirty if not equal
		id = Object(_model__WEBPACK_IMPORTED_MODULE_4__["getEntityPrimaryKeyValues"])(modelName, entity);
		if (state.entities.hasOwnProperty(modelName) && state.entities[modelName].hasOwnProperty(id) && !_wordpress_is_shallow_equal_objects__WEBPACK_IMPORTED_MODULE_1___default()(entity, state.entities[modelName][id])) {
			dirty.push(String(id));
		}
	});
	return dirty;
};

/**
 * This reducer sets the dirty property to false for all entity records matching
 * given entities in the state.  Entities themselves are NOT updated.
 *
 * Typically this would be used to flush the dirty state after multiple entities
 * have been persisted to the server.
 *
 * @param { Object } state
 * @param { Object } action
 * @return { Object }  The new state if dirty state is flushed and the original
 *                       state if not.
 */
function cleanEntities() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _model__WEBPACK_IMPORTED_MODULE_4__["DEFAULT_CORE_STATE"];
	var action = arguments[1];
	var type = action.type,
	    modelName = action.modelName,
	    _action$entities = action.entities,
	    incomingEntities = _action$entities === undefined ? [] : _action$entities;

	if (type === 'CLEAN_ENTITIES' && state.dirty.hasOwnProperty(modelName)) {
		var entityIds = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["map"])(incomingEntities, function (entity) {
			return String(Object(_model__WEBPACK_IMPORTED_MODULE_4__["getEntityPrimaryKeyValues"])(modelName, entity));
		});
		return _extends({}, state, {
			dirty: _extends({}, state.dirty, _defineProperty({}, modelName, [].concat(_toConsumableArray(Object(lodash__WEBPACK_IMPORTED_MODULE_0__["difference"])(state.dirty[modelName], entityIds)))))
		});
	}
	return state;
}

/**
 * This reducer sets the dirty property to false for the entity record in the
 * state matching the provided entityId in the action object.
 *
 * @param { Object } state
 * @param { Object } action
 * @return { Object }  The new state if the entity record is flushed and the
 *                       original state if not.
 */
function cleanEntityById() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _model__WEBPACK_IMPORTED_MODULE_4__["DEFAULT_CORE_STATE"];
	var action = arguments[1];
	var type = action.type,
	    modelName = action.modelName,
	    entityId = action.entityId;

	if (type === 'CLEAN_ENTITY' && state.dirty.hasOwnProperty(modelName) && state.entities.hasOwnProperty(modelName) && state.entities[modelName].hasOwnProperty(entityId)) {
		return _extends({}, state, {
			dirty: _extends({}, state.dirty, _defineProperty({}, modelName, [].concat(_toConsumableArray(Object(lodash__WEBPACK_IMPORTED_MODULE_0__["without"])(state.dirty[modelName], String(entityId))))))

		});
	}
	return state;
}

/**
 * Receives entities and adds them to or updates them in the state.
 *
 * Any new entity entities are simply added.  Any entities matching existing
 * entities in the state are updated and if any properties of that entity differ
 * from what's already in the state the record is marked dirty.
 *
 * @param { Object } state
 * @param { Object } action
 * @return {*}  Returns original state if no additions or updates are done.
 *                Returns new state if additions or updates are done.
 */
function receiveEntityRecords() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _model__WEBPACK_IMPORTED_MODULE_4__["DEFAULT_CORE_STATE"];
	var action = arguments[1];
	var type = action.type,
	    modelName = action.modelName,
	    _action$entities2 = action.entities,
	    incomingEntities = _action$entities2 === undefined ? [] : _action$entities2;

	if (type === 'RECEIVE_ENTITY_RECORDS' && state.entities.hasOwnProperty(modelName)) {
		var entities = Object(_model__WEBPACK_IMPORTED_MODULE_4__["keyEntitiesByPrimaryKeyValue"])(modelName, incomingEntities);
		var dirty = getDirtyEntityIds(modelName, state, incomingEntities);
		return _extends({}, state, {
			entities: _extends({}, state.entities, _defineProperty({}, modelName, _extends({}, state.entities[modelName], entities))),
			entityIds: _extends({}, state.entityIds, _defineProperty({}, modelName, Object(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_3__["mergeAndDeDuplicateArrays"])(state.entityIds[modelName], Object(lodash__WEBPACK_IMPORTED_MODULE_0__["keys"])(entities)))),
			dirty: _extends({}, state.dirty, _defineProperty({}, modelName, Object(_eventespresso_eejs__WEBPACK_IMPORTED_MODULE_3__["mergeAndDeDuplicateArrays"])(state.dirty[modelName], dirty)))
		});
	}
	return state;
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["combineReducers"])(cleanEntities, cleanEntityById, receiveEntityRecords));

/***/ }),

/***/ "./assets/src/data/eventespresso/core/selectors.js":
/*!*********************************************************!*\
  !*** ./assets/src/data/eventespresso/core/selectors.js ***!
  \*********************************************************/
/*! exports provided: isEntityDirty, getEntityRecordsForModel, getEntitiesForModel, getEntityById */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEntityDirty", function() { return isEntityDirty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntityRecordsForModel", function() { return getEntityRecordsForModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntitiesForModel", function() { return getEntitiesForModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntityById", function() { return getEntityById; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */


/**
 * Returns whether the entity in the state for the given id is dirty.
 * If there is no entity in the state for the provided id then the value
 * returned will be false.
 * @param { Object } state
 * @param { string } modelName
 * @param { number } entityId
 * @return {boolean} True means the entity is dirty, false it is not.
 */
function isEntityDirty(state, modelName, entityId) {
  return state.dirty.hasOwnProperty(modelName) && state.dirty[modelName].indexOf(String(entityId)) > -1;
}

/**
 * Return all entity records currently found in the state for the given model.
 *
 * @param { Object } state
 * @param { string } modelName
 * @return {null|{}} If there are no records then null is returned.  Otherwise
 * a collection object indexed by primary key values for the entity records is
 * returned.
 */
function getEntityRecordsForModel(state, modelName) {
  return state.entities[modelName] ? state.entities[modelName] : null;
}

/**
 * Returns all entities for the given model in state.
 *
 * This differs from getEntityRecordsForModel in that this returns the entity
 * objects in an array as opposed to a collection indexed by entity primary key.
 *
 * @param { Object } state
 * @param { string } modelName
 * @return {null|{}} This differs from getEntityRecordsForModel in that it
 *   will return an array of entities only. If there are no entities available
 *   in the state then null is returned.
 */
function getEntitiesForModel(state, modelName) {
  return state.entities[modelName] ? Object(lodash__WEBPACK_IMPORTED_MODULE_0__["values"])(state.entities[modelName]) : null;
}

/**
 * Returns just the entity (if it exists in the state) for the given entityId.
 * @param { Object } state
 * @param { string } modelName
 * @param { number } entityId
 * @return {null|{}} Returns the entity object.
 */
function getEntityById(state, modelName, entityId) {
  return state.entities[modelName] && state.entities[modelName][entityId] ? state.entities[modelName][entityId] : null;
}

/***/ }),

/***/ "./assets/src/data/eventespresso/lists/actions.js":
/*!********************************************************!*\
  !*** ./assets/src/data/eventespresso/lists/actions.js ***!
  \********************************************************/
/*! exports provided: setRequested, receiveResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRequested", function() { return setRequested; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveResponse", function() { return receiveResponse; });
/**
 * Returns an action object used in signalling that the request for a given
 * model and query string has been made.
 *
 * @param { string } modelName
 * @param { string } queryString  Results are stored indexed by the query string
 *                                generating them.
 * @return {{type: string, modelName: string, queryString: string}} Object
 *                    for action.
 */
function setRequested(modelName, queryString) {
  return {
    type: 'SET_REQUESTED',
    modelName: modelName,
    queryString: queryString
  };
}

/**
 * Returns an action object used in updating the store with the provided items
 * retrieved from a request using the given querystring.
 *
 * @param { string } modelName
 * @param { string } queryString  Results are stored indexed by the query
 *   string
 *                                generating them.
 * @param { Array } items         Items returned from the query.
 * @return {{type: string, modelName: string, queryString: string, items:
 *   Array}} Object for action.
 */
function receiveResponse(modelName, queryString) {
  var items = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  return {
    type: 'RECEIVE_LIST',
    modelName: modelName,
    queryString: queryString,
    items: items
  };
}

/***/ }),

/***/ "./assets/src/data/eventespresso/lists/index.js":
/*!******************************************************!*\
  !*** ./assets/src/data/eventespresso/lists/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers */ "./assets/src/data/eventespresso/lists/reducers.js");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectors */ "./assets/src/data/eventespresso/lists/selectors.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions */ "./assets/src/data/eventespresso/lists/actions.js");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolvers */ "./assets/src/data/eventespresso/lists/resolvers.js");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */





/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["registerStore"])('eventespresso/lists', {
  reducers: _reducers__WEBPACK_IMPORTED_MODULE_1__["default"],
  actions: _actions__WEBPACK_IMPORTED_MODULE_3__,
  selectors: _selectors__WEBPACK_IMPORTED_MODULE_2__,
  resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_4__
}));

/***/ }),

/***/ "./assets/src/data/eventespresso/lists/reducers.js":
/*!*********************************************************!*\
  !*** ./assets/src/data/eventespresso/lists/reducers.js ***!
  \*********************************************************/
/*! exports provided: listItems, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listItems", function() { return listItems; });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model */ "./assets/src/data/model/index.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Internal dependencies
 */


/**
 * Reducer managing item list state.
 *
 * @param {Object} state  Current state.
 * @param {Object} action	Dispatched action.
 * @return {Object}	Updated state.
 */
function listItems() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _model__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_LISTS_STATE"];
	var action = arguments[1];
	var type = action.type,
	    modelName = action.modelName,
	    queryString = action.queryString,
	    _action$items = action.items,
	    items = _action$items === undefined ? [] : _action$items;

	switch (type) {
		case 'SET_REQUESTED':
			if (!state[modelName] || state[modelName].hasOwnProperty(queryString)) {
				return state;
			}
			return _extends({}, state, _defineProperty({}, modelName, _defineProperty({}, queryString, null)));
		case 'RECEIVE_LIST':
			return _extends({}, state, _defineProperty({}, modelName, _defineProperty({}, queryString, items)));
	}
	return state;
}

/* harmony default export */ __webpack_exports__["default"] = (listItems);

/***/ }),

/***/ "./assets/src/data/eventespresso/lists/resolvers.js":
/*!**********************************************************!*\
  !*** ./assets/src/data/eventespresso/lists/resolvers.js ***!
  \**********************************************************/
/*! exports provided: getItems, getEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getItems", function() { return getItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEvents", function() { return getEvents; });
/* harmony import */ var _wordpress_api_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-request */ "@wordpress/api-request");
/* harmony import */ var _wordpress_api_request__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_request__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./assets/src/data/eventespresso/lists/actions.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../model */ "./assets/src/data/model/index.js");
var _asyncGenerator = function () { function AwaitValue(value) { this.value = value; } function AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; if (value instanceof AwaitValue) { Promise.resolve(value.value).then(function (arg) { resume("next", arg); }, function (arg) { resume("throw", arg); }); } else { settle(result.done ? "return" : "normal", result.value); } } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } } if (typeof Symbol === "function" && Symbol.asyncIterator) { AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; } AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); }; AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); }; AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); }; return { wrap: function wrap(fn) { return function () { return new AsyncGenerator(fn.apply(this, arguments)); }; }, await: function _await(value) { return new AwaitValue(value); } }; }();

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */



/**
 * Resolver for generic items returned from an endpoint.
 *
 * @param {Object} state  Data in state.
 * @param {string} modelName  The name of the model the items are for.
 * @param {string} queryString  Additional query string parameters passed on to
 *   the REST request.
 */
var getItems = function () {
  var _ref = _asyncGenerator.wrap( /*#__PURE__*/regeneratorRuntime.mark(function _callee(state, modelName, queryString) {
    var items;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(state[modelName] && state[modelName].hasOwnProperty(queryString) && state[modelName][queryString] !== null)) {
              _context.next = 3;
              break;
            }

            _context.next = 3;
            return Object(_actions__WEBPACK_IMPORTED_MODULE_1__["receiveResponse"])(modelName, queryString, state[modelName][queryString]);

          case 3:
            _context.next = 5;
            return Object(_actions__WEBPACK_IMPORTED_MODULE_1__["setRequested"])(modelName, queryString);

          case 5:
            _context.next = 7;
            return _asyncGenerator.await(_wordpress_api_request__WEBPACK_IMPORTED_MODULE_0___default()({
              path: Object(_model__WEBPACK_IMPORTED_MODULE_2__["applyQueryString"])(modelName, queryString)
            }));

          case 7:
            items = _context.sent;
            _context.next = 10;
            return Object(_actions__WEBPACK_IMPORTED_MODULE_1__["receiveResponse"])(modelName, queryString, items);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getItems(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Resolver for event entities.
 *
 * @param {Object} state Data in state.
 * @param {string} queryString Additional query string parameters passed on to
 *   the REST request.
 * @return {IterableIterator<*>} A async iterable.
 */
function getEvents(state, queryString) {
  return getItems(state, 'event', queryString);
}

/***/ }),

/***/ "./assets/src/data/eventespresso/lists/selectors.js":
/*!**********************************************************!*\
  !*** ./assets/src/data/eventespresso/lists/selectors.js ***!
  \**********************************************************/
/*! exports provided: getItems, isRequestingItems, getEvents, isRequestingEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getItems", function() { return getItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRequestingItems", function() { return isRequestingItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEvents", function() { return getEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRequestingEvents", function() { return isRequestingEvents; });
/**
 * Returns all the items for the given modelName and queryString
 *
 * @param {Object} state Data state.
 * @param {string} modelName The model the items are being retrieved for.
 * @param {string} queryString The query string for retrieving the items.
 * @return {Array} Returns an array of items for the given model and query.
 */
function getItems(state, modelName, queryString) {
  return state[modelName] && state[modelName][queryString] ? state[modelName][queryString] : [];
}

/**
 * Returns whether the items for the given model name and query string are being
 * requested.
 *
 * @param {Object} state Data state.
 * @param {string} modelName  The model the itesm are being requested for.
 * @param {string} queryString The query string for the request
 * @return {boolean} Whether items are being requested or not.
 */
function isRequestingItems(state, modelName, queryString) {
  if (state[modelName] && state[modelName][queryString]) {
    return state[modelName][queryString] === null;
  }
  return true;
}

/**
 * Selector specific to events.
 *
 * @param {Object} state  Data state.
 * @param {string} queryString The query string for the request
 * @return {Array} An array of event entities for the given model and query.
 */
function getEvents(state, queryString) {
  return getItems(state, 'event', queryString);
}

/**
 * Selector specific to events for checking if requesting events.
 *
 * @param {Object} state Data state.
 * @param {string} queryString The query string for the request
 * @return {boolean} Whether items are being requested or not.
 */
function isRequestingEvents(state, queryString) {
  return isRequestingItems(state, 'event', queryString);
}

/***/ }),

/***/ "./assets/src/data/index.js":
/*!**********************************!*\
  !*** ./assets/src/data/index.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventespresso_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventespresso/core */ "./assets/src/data/eventespresso/core/index.js");
/* harmony import */ var _eventespresso_lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventespresso/lists */ "./assets/src/data/eventespresso/lists/index.js");
/**
 * Register stores
 */



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
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _endpoints_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endpoints.js */ "./assets/src/data/model/endpoints.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["mapValues"])(modelNameEndpoints, function () {
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
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["mapValues"])(modelNameEndpoints, function () {
    return {};
  });
};

/**
 * Provides the default state to be used by stores containing lists.
 *
 * @type { Object }
 */
var DEFAULT_LISTS_STATE = mapToArrayValues(_endpoints_js__WEBPACK_IMPORTED_MODULE_1__["endpoints"]);

/**
 * Provides the default state to be used by the core store.
 *
 * @type {{entities: {}, entityIds: {}, dirty: {}}}
 */
var DEFAULT_CORE_STATE = {
  entities: _extends({}, mapToObjectValues(_endpoints_js__WEBPACK_IMPORTED_MODULE_1__["endpoints"])),
  entityIds: _extends({}, DEFAULT_LISTS_STATE),
  dirty: _extends({}, DEFAULT_LISTS_STATE)
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

/***/ "./assets/src/data/model/index.js":
/*!****************************************!*\
  !*** ./assets/src/data/model/index.js ***!
  \****************************************/
/*! exports provided: DEFAULT_LISTS_STATE, DEFAULT_CORE_STATE, endpoints, getEndpoint, applyQueryString, primaryKeys, valuesForCombinedPrimaryKeys, valueForPrimaryKey, getPrimaryKey, getEntityPrimaryKeyValues, keyEntitiesByPrimaryKeyValue */
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
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
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
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
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

/***/ "./node_modules/@wordpress/is-shallow-equal/objects.js":
/*!*************************************************************!*\
  !*** ./node_modules/@wordpress/is-shallow-equal/objects.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = Object.keys;

/**
 * Returns true if the two objects are shallow equal, or false otherwise.
 *
 * @param {Object} a First object to compare.
 * @param {Object} b Second object to compare.
 *
 * @return {Boolean} Whether the two objects are shallow equal.
 */
function isShallowEqualObjects( a, b ) {
	var aKeys, bKeys, i, key;

	if ( a === b ) {
		return true;
	}

	aKeys = keys( a );
	bKeys = keys( b );

	if ( aKeys.length !== bKeys.length ) {
		return false;
	}

	i = 0;

	while ( i < aKeys.length ) {
		key = aKeys[ i ];
		if ( a[ key ] !== b[ key ] ) {
			return false;
		}

		i++;
	}

	return true;
};

module.exports = isShallowEqualObjects;


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

/***/ 4:
/*!****************************************!*\
  !*** multi ./assets/src/data/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./assets/src/data/index.js */"./assets/src/data/index.js");


/***/ }),

/***/ "@eventespresso/eejs":
/*!***********************!*\
  !*** external "eejs" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs;

/***/ }),

/***/ "@eventespresso/i18n":
/*!****************************!*\
  !*** external "eejs.i18n" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.i18n;

/***/ }),

/***/ "@wordpress/api-request":
/*!*********************************************!*\
  !*** external {"this":["wp","apiRequest"]} ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),

/***/ "@wordpress/data":
/*!***************************************!*\
  !*** external {"this":["wp","data"]} ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ })

},[[4,"manifest","reactVendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9jb3JlL2FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9kYXRhL2V2ZW50ZXNwcmVzc28vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9jb3JlL3JlZHVjZXJzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvZGF0YS9ldmVudGVzcHJlc3NvL2NvcmUvc2VsZWN0b3JzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvZGF0YS9ldmVudGVzcHJlc3NvL2xpc3RzL2FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9kYXRhL2V2ZW50ZXNwcmVzc28vbGlzdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9kYXRhL2V2ZW50ZXNwcmVzc28vbGlzdHMvcmVkdWNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9kYXRhL2V2ZW50ZXNwcmVzc28vbGlzdHMvcmVzb2x2ZXJzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvZGF0YS9ldmVudGVzcHJlc3NvL2xpc3RzL3NlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3JjL2RhdGEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2RlZmF1bHQtbW9kZWwtc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL2VuZHBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9kYXRhL21vZGVsL3ByaW1hcnkta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3JjL2RhdGEvbW9kZWwvdmFsaWRhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdvcmRwcmVzcy9pcy1zaGFsbG93LWVxdWFsL29iamVjdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21lbWl6ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlZWpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZWVqcy5pMThuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiYXBpUmVxdWVzdFwiXX0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiZGF0YVwiXX0iXSwibmFtZXMiOlsicmVjZWl2ZUVudGl0eVJlY29yZHMiLCJtb2RlbE5hbWUiLCJlbnRpdGllcyIsInR5cGUiLCJjbGVhbkVudGl0eUJ5SWQiLCJlbnRpdHlJZCIsImNsZWFuRW50aXRpZXMiLCJyZWdpc3RlclN0b3JlIiwicmVkdWNlciIsImFjdGlvbnMiLCJzZWxlY3RvcnMiLCJnZXREaXJ0eUVudGl0eUlkcyIsInN0YXRlIiwiZGlydHkiLCJpZCIsImZvckVhY2giLCJlbnRpdHkiLCJnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzIiwiaGFzT3duUHJvcGVydHkiLCJpc1NoYWxsb3dFcXVhbCIsInB1c2giLCJTdHJpbmciLCJhY3Rpb24iLCJpbmNvbWluZ0VudGl0aWVzIiwiZW50aXR5SWRzIiwibWFwIiwiZGlmZmVyZW5jZSIsIndpdGhvdXQiLCJrZXlFbnRpdGllc0J5UHJpbWFyeUtleVZhbHVlIiwibWVyZ2VBbmREZUR1cGxpY2F0ZUFycmF5cyIsImtleXMiLCJjb21iaW5lUmVkdWNlcnMiLCJpc0VudGl0eURpcnR5IiwiaW5kZXhPZiIsImdldEVudGl0eVJlY29yZHNGb3JNb2RlbCIsImdldEVudGl0aWVzRm9yTW9kZWwiLCJ2YWx1ZXMiLCJnZXRFbnRpdHlCeUlkIiwic2V0UmVxdWVzdGVkIiwicXVlcnlTdHJpbmciLCJyZWNlaXZlUmVzcG9uc2UiLCJpdGVtcyIsInJlZHVjZXJzIiwicmVzb2x2ZXJzIiwibGlzdEl0ZW1zIiwiYXBpUmVxdWVzdCIsInBhdGgiLCJhcHBseVF1ZXJ5U3RyaW5nIiwiZ2V0SXRlbXMiLCJnZXRFdmVudHMiLCJpc1JlcXVlc3RpbmdJdGVtcyIsImlzUmVxdWVzdGluZ0V2ZW50cyIsIm1hcFRvQXJyYXlWYWx1ZXMiLCJtYXBWYWx1ZXMiLCJtb2RlbE5hbWVFbmRwb2ludHMiLCJtYXBUb09iamVjdFZhbHVlcyIsIkRFRkFVTFRfTElTVFNfU1RBVEUiLCJERUZBVUxUX0NPUkVfU1RBVEUiLCJkYXRhIiwicGF0aHMiLCJjb2xsZWN0aW9uX2VuZHBvaW50cyIsImVuZHBvaW50cyIsImdldEVuZHBvaW50IiwidmFsaWRhdGVFbnRpdHlIYXNLZXkiLCJwcmltYXJ5X2tleXMiLCJwcmltYXJ5S2V5cyIsInZhbHVlc0ZvckNvbWJpbmVkUHJpbWFyeUtleXMiLCJtZW1vaXplIiwidmFsaWRhdGVJc0FycmF5IiwicHJpbWFyeUtleSIsInJlZHVjZSIsInJlc3VsdCIsImtleSIsInRyaW1FbmQiLCJ2YWx1ZUZvclByaW1hcnlLZXkiLCJnZXRQcmltYXJ5S2V5IiwiaXNBcnJheSIsInZhbGlkYXRlSXNOb3RFbXB0eSIsIl9fIiwia2V5QnkiLCJtZXNzYWdlIiwic3ByaW50ZiIsImlzRW1wdHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBOzs7Ozs7OztBQVFPLFNBQVNBLG9CQUFULENBQStCQyxTQUEvQixFQUEwRDtBQUFBLE1BQWhCQyxRQUFnQix1RUFBTCxFQUFLOztBQUNoRSxTQUFPO0FBQ05DLFVBQU0sd0JBREE7QUFFTkYsd0JBRk07QUFHTkM7QUFITSxHQUFQO0FBS0E7O0FBRUQ7Ozs7Ozs7Ozs7QUFVTyxTQUFTRSxlQUFULENBQTBCSCxTQUExQixFQUFxQ0ksUUFBckMsRUFBZ0Q7QUFDdEQsU0FBTztBQUNORixVQUFNLGNBREE7QUFFTkYsd0JBRk07QUFHTkk7QUFITSxHQUFQO0FBS0E7O0FBRUQ7Ozs7Ozs7Ozs7QUFVTyxTQUFTQyxhQUFULENBQXdCTCxTQUF4QixFQUFtRDtB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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBTUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEhBLHNCOzs7Ozs7Ozs7OztBQ0FBLDJCOzs7Ozs7Ozs7OztBQ0FBLDJCOzs7Ozs7Ozs7OztBQ0FBLDJCIiwiZmlsZSI6ImVlLWRhdGEtc3RvcmVzLjRkYzk3MGM1MjFhOTI2ZGFjMTMzLmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJldHVybnMgYW4gYWN0aW9uIG9iamVjdCB1c2VkIHRvIHVwZGF0ZSB0aGUgc3RvcmUgd2l0aCB0aGUgcHJvdmlkZWQgZW50aXRpZXMuXG4gKlxuICogQHBhcmFtIHsgc3RyaW5nIH0gbW9kZWxOYW1lXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzXG4gKiBAcmV0dXJuIHt7dHlwZTogc3RyaW5nLCBtb2RlbE5hbWU6IHN0cmluZywgZGlydHk6IGJvb2xlYW4sIGVudGl0aWVzOiBBcnJheX19XG4gKiAgICAgICAgICAgIE9iamVjdCBmb3IgYWN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWNlaXZlRW50aXR5UmVjb3JkcyggbW9kZWxOYW1lLCBlbnRpdGllcyA9IFtdICkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6ICdSRUNFSVZFX0VOVElUWV9SRUNPUkRTJyxcblx0XHRtb2RlbE5hbWUsXG5cdFx0ZW50aXRpZXMsXG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhY3Rpb24gb2JqZWN0IHVzZWQgdG8gdXBkYXRlIHRoZSBlbnRpdHkgd2l0aCB0aGUgZ2l2ZW4gaWQgaW4gdGhlXG4gKiBzdG9yZSBzbyB0aGF0IGl0IGlzIGNvbnNpZGVyZWQgXCJjbGVhblwiIG5vdCBkaXJ0eSAoc2V0cyBkaXJ0eSBmbGFnIHRvIGZhbHNlKS5cbiAqIFR5cGljYWxseSwgdGhpcyB3aWxsIGdldCB1c2VkIGJ5IHNhdmUvcGVyc2lzdCB0byBzZXJ2ZXIgYWN0aW9ucy5cbiAqXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7IG51bWJlciB9IGVudGl0eUlkXG4gKiBAcmV0dXJuIHt7dHlwZTogc3RyaW5nLCBtb2RlbE5hbWU6ICosIGVudGl0eUlkOiAqfX1cbiAqIFx0XHRcdE9iamVjdCBmb3IgYWN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5FbnRpdHlCeUlkKCBtb2RlbE5hbWUsIGVudGl0eUlkICkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6ICdDTEVBTl9FTlRJVFknLFxuXHRcdG1vZGVsTmFtZSxcblx0XHRlbnRpdHlJZCxcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFjdGlvbiBvYmplY3QgdXNlZCB0byB1cGRhdGUgdGhlIGdpdmVuIGVudGl0aWVzIGluIHRoZSBzdG9yZSBzb1xuICogdGhhdCB0aGV5IGFyZSBjb25zaWRlcmVkIFwiY2xlYW5cIiBub3QgZGlydHkgKHNldHMgZGlydHkgZmxhZyB0byBmYWxzZSkuXG4gKiBUeXBpY2FsbHksIHRoaXMgd2lsbCBnZXQgdXNlZCBieSBzYXZlL3BlcnNpc3QgdG8gc2VydmVyIGFjdGlvbnMuXG4gKlxuICogQHBhcmFtIHsgc3RyaW5nIH0gbW9kZWxOYW1lXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzXG4gKiBAcmV0dXJuIHt7dHlwZTogc3RyaW5nLCBtb2RlbE5hbWU6ICosIGVudGl0aWVzOiBBcnJheX19XG4gKiBcdFx0XHRPYmplY3QgZm9yIGFjdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuRW50aXRpZXMoIG1vZGVsTmFtZSwgZW50aXRpZXMgPSBbXSApIHtcblx0cmV0dXJuIHtcblx0XHR0eXBlOiAnQ0xFQU5fRU5USVRJRVMnLFxuXHRcdG1vZGVsTmFtZSxcblx0XHRlbnRpdGllcyxcblx0fTtcbn1cbiIsIi8qKlxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyByZWdpc3RlclN0b3JlIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHJlZHVjZXIgZnJvbSAnLi9yZWR1Y2Vycyc7XG5pbXBvcnQgKiBhcyBzZWxlY3RvcnMgZnJvbSAnLi9zZWxlY3RvcnMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCByZWdpc3RlclN0b3JlKCAnZXZlbnRlc3ByZXNzby9jb3JlJywge1xuXHRyZWR1Y2VyLFxuXHRhY3Rpb25zLFxuXHRzZWxlY3RvcnMsXG59ICk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBtYXAsIGtleXMsIGRpZmZlcmVuY2UsIHdpdGhvdXQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGlzU2hhbGxvd0VxdWFsIGZyb20gJ0B3b3JkcHJlc3MvaXMtc2hhbGxvdy1lcXVhbC9vYmplY3RzJztcbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBtZXJnZUFuZERlRHVwbGljYXRlQXJyYXlzIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7XG5cdERFRkFVTFRfQ09SRV9TVEFURSxcblx0Z2V0RW50aXR5UHJpbWFyeUtleVZhbHVlcyxcblx0a2V5RW50aXRpZXNCeVByaW1hcnlLZXlWYWx1ZSxcbn0gZnJvbSAnLi4vLi4vbW9kZWwnO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgZGlydHkgZW50aXR5IGlkcyBmcm9tIHRoZSBwcm92aWRlZCBlbnRpdGllcy5cbiAqXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHN0YXRlXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzXG4gKiBAcmV0dXJuIHsgQXJyYXkgfSAgUmV0dXJucyBhbiBhcnJheS5cbiAqL1xuY29uc3QgZ2V0RGlydHlFbnRpdHlJZHMgPSAoIG1vZGVsTmFtZSwgc3RhdGUsIGVudGl0aWVzICkgPT4ge1xuXHRjb25zdCBkaXJ0eSA9IFtdO1xuXHRsZXQgaWQ7XG5cdGVudGl0aWVzLmZvckVhY2goIGZ1bmN0aW9uKCBlbnRpdHkgKSB7XG5cdFx0Ly8gZGlydHkgaWYgbm90IGVxdWFsXG5cdFx0aWQgPSBnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzKCBtb2RlbE5hbWUsIGVudGl0eSApO1xuXHRcdGlmICggc3RhdGUuZW50aXRpZXMuaGFzT3duUHJvcGVydHkoIG1vZGVsTmFtZSApICYmXG5cdFx0XHRzdGF0ZS5lbnRpdGllc1sgbW9kZWxOYW1lIF0uaGFzT3duUHJvcGVydHkoIGlkICkgJiZcblx0XHRcdCEgaXNTaGFsbG93RXF1YWwoIGVudGl0eSwgc3RhdGUuZW50aXRpZXNbIG1vZGVsTmFtZSBdWyBpZCBdIClcblx0XHQpIHtcblx0XHRcdGRpcnR5LnB1c2goIFN0cmluZyggaWQgKSApO1xuXHRcdH1cblx0fSApO1xuXHRyZXR1cm4gZGlydHk7XG59O1xuXG4vKipcbiAqIFRoaXMgcmVkdWNlciBzZXRzIHRoZSBkaXJ0eSBwcm9wZXJ0eSB0byBmYWxzZSBmb3IgYWxsIGVudGl0eSByZWNvcmRzIG1hdGNoaW5nXG4gKiBnaXZlbiBlbnRpdGllcyBpbiB0aGUgc3RhdGUuICBFbnRpdGllcyB0aGVtc2VsdmVzIGFyZSBOT1QgdXBkYXRlZC5cbiAqXG4gKiBUeXBpY2FsbHkgdGhpcyB3b3VsZCBiZSB1c2VkIHRvIGZsdXNoIHRoZSBkaXJ0eSBzdGF0ZSBhZnRlciBtdWx0aXBsZSBlbnRpdGllc1xuICogaGF2ZSBiZWVuIHBlcnNpc3RlZCB0byB0aGUgc2VydmVyLlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHN0YXRlXG4gKiBAcGFyYW0geyBPYmplY3QgfSBhY3Rpb25cbiAqIEByZXR1cm4geyBPYmplY3QgfSAgVGhlIG5ldyBzdGF0ZSBpZiBkaXJ0eSBzdGF0ZSBpcyBmbHVzaGVkIGFuZCB0aGUgb3JpZ2luYWxcbiAqICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSBpZiBub3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhbkVudGl0aWVzKCBzdGF0ZSA9IERFRkFVTFRfQ09SRV9TVEFURSwgYWN0aW9uICkge1xuXHRjb25zdCB7IHR5cGUsIG1vZGVsTmFtZSwgZW50aXRpZXM6IGluY29taW5nRW50aXRpZXMgPSBbXSB9ID0gYWN0aW9uO1xuXHRpZiAoIHR5cGUgPT09ICdDTEVBTl9FTlRJVElFUycgJiZcblx0XHRzdGF0ZS5kaXJ0eS5oYXNPd25Qcm9wZXJ0eSggbW9kZWxOYW1lICkgKSB7XG5cdFx0Y29uc3QgZW50aXR5SWRzID0gbWFwKFxuXHRcdFx0aW5jb21pbmdFbnRpdGllcyxcblx0XHRcdGZ1bmN0aW9uKCBlbnRpdHkgKSB7XG5cdFx0XHRcdHJldHVybiBTdHJpbmcoIGdldEVudGl0eVByaW1hcnlLZXlWYWx1ZXMoIG1vZGVsTmFtZSwgZW50aXR5ICkgKTtcblx0XHRcdH0sXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRkaXJ0eToge1xuXHRcdFx0XHQuLi5zdGF0ZS5kaXJ0eSxcblx0XHRcdFx0WyBtb2RlbE5hbWUgXTogW1xuXHRcdFx0XHRcdC4uLmRpZmZlcmVuY2UoIHN0YXRlLmRpcnR5WyBtb2RlbE5hbWUgXSwgZW50aXR5SWRzICksXG5cdFx0XHRcdF0sXG5cdFx0XHR9LFxuXHRcdH07XG5cdH1cblx0cmV0dXJuIHN0YXRlO1xufVxuXG4vKipcbiAqIFRoaXMgcmVkdWNlciBzZXRzIHRoZSBkaXJ0eSBwcm9wZXJ0eSB0byBmYWxzZSBmb3IgdGhlIGVudGl0eSByZWNvcmQgaW4gdGhlXG4gKiBzdGF0ZSBtYXRjaGluZyB0aGUgcHJvdmlkZWQgZW50aXR5SWQgaW4gdGhlIGFjdGlvbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gc3RhdGVcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGFjdGlvblxuICogQHJldHVybiB7IE9iamVjdCB9ICBUaGUgbmV3IHN0YXRlIGlmIHRoZSBlbnRpdHkgcmVjb3JkIGlzIGZsdXNoZWQgYW5kIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsIHN0YXRlIGlmIG5vdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuRW50aXR5QnlJZCggc3RhdGUgPSBERUZBVUxUX0NPUkVfU1RBVEUsIGFjdGlvbiApIHtcblx0Y29uc3QgeyB0eXBlLCBtb2RlbE5hbWUsIGVudGl0eUlkIH0gPSBhY3Rpb247XG5cdGlmICggdHlwZSA9PT0gJ0NMRUFOX0VOVElUWScgJiZcblx0XHRzdGF0ZS5kaXJ0eS5oYXNPd25Qcm9wZXJ0eSggbW9kZWxOYW1lICkgJiZcblx0XHRzdGF0ZS5lbnRpdGllcy5oYXNPd25Qcm9wZXJ0eSggbW9kZWxOYW1lICkgJiZcblx0XHRzdGF0ZS5lbnRpdGllc1sgbW9kZWxOYW1lIF0uaGFzT3duUHJvcGVydHkoIGVudGl0eUlkIClcblx0KSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0ZGlydHk6IHtcblx0XHRcdFx0Li4uc3RhdGUuZGlydHksXG5cdFx0XHRcdFsgbW9kZWxOYW1lIF06IFtcblx0XHRcdFx0XHQuLi53aXRob3V0KCBzdGF0ZS5kaXJ0eVsgbW9kZWxOYW1lIF0sIFN0cmluZyggZW50aXR5SWQgKSApLFxuXHRcdFx0XHRdLFxuXHRcdFx0fVxuXHRcdFx0LFxuXHRcdH07XG5cdH1cblx0cmV0dXJuIHN0YXRlO1xufVxuXG4vKipcbiAqIFJlY2VpdmVzIGVudGl0aWVzIGFuZCBhZGRzIHRoZW0gdG8gb3IgdXBkYXRlcyB0aGVtIGluIHRoZSBzdGF0ZS5cbiAqXG4gKiBBbnkgbmV3IGVudGl0eSBlbnRpdGllcyBhcmUgc2ltcGx5IGFkZGVkLiAgQW55IGVudGl0aWVzIG1hdGNoaW5nIGV4aXN0aW5nXG4gKiBlbnRpdGllcyBpbiB0aGUgc3RhdGUgYXJlIHVwZGF0ZWQgYW5kIGlmIGFueSBwcm9wZXJ0aWVzIG9mIHRoYXQgZW50aXR5IGRpZmZlclxuICogZnJvbSB3aGF0J3MgYWxyZWFkeSBpbiB0aGUgc3RhdGUgdGhlIHJlY29yZCBpcyBtYXJrZWQgZGlydHkuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gc3RhdGVcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGFjdGlvblxuICogQHJldHVybiB7Kn0gIFJldHVybnMgb3JpZ2luYWwgc3RhdGUgaWYgbm8gYWRkaXRpb25zIG9yIHVwZGF0ZXMgYXJlIGRvbmUuXG4gKiAgICAgICAgICAgICAgICBSZXR1cm5zIG5ldyBzdGF0ZSBpZiBhZGRpdGlvbnMgb3IgdXBkYXRlcyBhcmUgZG9uZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY2VpdmVFbnRpdHlSZWNvcmRzKCBzdGF0ZSA9IERFRkFVTFRfQ09SRV9TVEFURSwgYWN0aW9uICkge1xuXHRjb25zdCB7IHR5cGUsIG1vZGVsTmFtZSwgZW50aXRpZXM6IGluY29taW5nRW50aXRpZXMgPSBbXSB9ID0gYWN0aW9uO1xuXHRpZiAoIHR5cGUgPT09ICdSRUNFSVZFX0VOVElUWV9SRUNPUkRTJyAmJlxuXHRcdHN0YXRlLmVudGl0aWVzLmhhc093blByb3BlcnR5KCBtb2RlbE5hbWUgKSApIHtcblx0XHRjb25zdCBlbnRpdGllcyA9IGtleUVudGl0aWVzQnlQcmltYXJ5S2V5VmFsdWUoIG1vZGVsTmFtZSxcblx0XHRcdGluY29taW5nRW50aXRpZXMsXG5cdFx0KTtcblx0XHRjb25zdCBkaXJ0eSA9IGdldERpcnR5RW50aXR5SWRzKCBtb2RlbE5hbWUsIHN0YXRlLCBpbmNvbWluZ0VudGl0aWVzICk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0ZW50aXRpZXM6IHtcblx0XHRcdFx0Li4uc3RhdGUuZW50aXRpZXMsXG5cdFx0XHRcdFsgbW9kZWxOYW1lIF06IHtcblx0XHRcdFx0XHQuLi5zdGF0ZS5lbnRpdGllc1sgbW9kZWxOYW1lIF0sXG5cdFx0XHRcdFx0Li4uZW50aXRpZXMsXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0ZW50aXR5SWRzOiB7XG5cdFx0XHRcdC4uLnN0YXRlLmVudGl0eUlkcyxcblx0XHRcdFx0WyBtb2RlbE5hbWUgXTogbWVyZ2VBbmREZUR1cGxpY2F0ZUFycmF5cyhcblx0XHRcdFx0XHRzdGF0ZS5lbnRpdHlJZHNbIG1vZGVsTmFtZSBdLFxuXHRcdFx0XHRcdGtleXMoIGVudGl0aWVzICksXG5cdFx0XHRcdCksXG5cdFx0XHR9LFxuXHRcdFx0ZGlydHk6IHtcblx0XHRcdFx0Li4uc3RhdGUuZGlydHksXG5cdFx0XHRcdFsgbW9kZWxOYW1lIF06IG1lcmdlQW5kRGVEdXBsaWNhdGVBcnJheXMoXG5cdFx0XHRcdFx0c3RhdGUuZGlydHlbIG1vZGVsTmFtZSBdLFxuXHRcdFx0XHRcdGRpcnR5LFxuXHRcdFx0XHQpLFxuXHRcdFx0fSxcblx0XHR9O1xuXHR9XG5cdHJldHVybiBzdGF0ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKFxuXHRjbGVhbkVudGl0aWVzLFxuXHRjbGVhbkVudGl0eUJ5SWQsXG5cdHJlY2VpdmVFbnRpdHlSZWNvcmRzLFxuKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgZW50aXR5IGluIHRoZSBzdGF0ZSBmb3IgdGhlIGdpdmVuIGlkIGlzIGRpcnR5LlxuICogSWYgdGhlcmUgaXMgbm8gZW50aXR5IGluIHRoZSBzdGF0ZSBmb3IgdGhlIHByb3ZpZGVkIGlkIHRoZW4gdGhlIHZhbHVlXG4gKiByZXR1cm5lZCB3aWxsIGJlIGZhbHNlLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gc3RhdGVcbiAqIEBwYXJhbSB7IHN0cmluZyB9IG1vZGVsTmFtZVxuICogQHBhcmFtIHsgbnVtYmVyIH0gZW50aXR5SWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhlIGVudGl0eSBpcyBkaXJ0eSwgZmFsc2UgaXQgaXMgbm90LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbnRpdHlEaXJ0eSggc3RhdGUsIG1vZGVsTmFtZSwgZW50aXR5SWQgKSB7XG5cdHJldHVybiBzdGF0ZS5kaXJ0eS5oYXNPd25Qcm9wZXJ0eSggbW9kZWxOYW1lICkgJiZcblx0XHRzdGF0ZS5kaXJ0eVsgbW9kZWxOYW1lIF0uaW5kZXhPZiggU3RyaW5nKCBlbnRpdHlJZCApICkgPiAtMTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYWxsIGVudGl0eSByZWNvcmRzIGN1cnJlbnRseSBmb3VuZCBpbiB0aGUgc3RhdGUgZm9yIHRoZSBnaXZlbiBtb2RlbC5cbiAqXG4gKiBAcGFyYW0geyBPYmplY3QgfSBzdGF0ZVxuICogQHBhcmFtIHsgc3RyaW5nIH0gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtudWxsfHt9fSBJZiB0aGVyZSBhcmUgbm8gcmVjb3JkcyB0aGVuIG51bGwgaXMgcmV0dXJuZWQuICBPdGhlcndpc2VcbiAqIGEgY29sbGVjdGlvbiBvYmplY3QgaW5kZXhlZCBieSBwcmltYXJ5IGtleSB2YWx1ZXMgZm9yIHRoZSBlbnRpdHkgcmVjb3JkcyBpc1xuICogcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnRpdHlSZWNvcmRzRm9yTW9kZWwoIHN0YXRlLCBtb2RlbE5hbWUgKSB7XG5cdHJldHVybiBzdGF0ZS5lbnRpdGllc1sgbW9kZWxOYW1lIF0gP1xuXHRcdHN0YXRlLmVudGl0aWVzWyBtb2RlbE5hbWUgXSA6XG5cdFx0bnVsbDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFsbCBlbnRpdGllcyBmb3IgdGhlIGdpdmVuIG1vZGVsIGluIHN0YXRlLlxuICpcbiAqIFRoaXMgZGlmZmVycyBmcm9tIGdldEVudGl0eVJlY29yZHNGb3JNb2RlbCBpbiB0aGF0IHRoaXMgcmV0dXJucyB0aGUgZW50aXR5XG4gKiBvYmplY3RzIGluIGFuIGFycmF5IGFzIG9wcG9zZWQgdG8gYSBjb2xsZWN0aW9uIGluZGV4ZWQgYnkgZW50aXR5IHByaW1hcnkga2V5LlxuICpcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHN0YXRlXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge251bGx8e319IFRoaXMgZGlmZmVycyBmcm9tIGdldEVudGl0eVJlY29yZHNGb3JNb2RlbCBpbiB0aGF0IGl0XG4gKiAgIHdpbGwgcmV0dXJuIGFuIGFycmF5IG9mIGVudGl0aWVzIG9ubHkuIElmIHRoZXJlIGFyZSBubyBlbnRpdGllcyBhdmFpbGFibGVcbiAqICAgaW4gdGhlIHN0YXRlIHRoZW4gbnVsbCBpcyByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVudGl0aWVzRm9yTW9kZWwoIHN0YXRlLCBtb2RlbE5hbWUgKSB7XG5cdHJldHVybiBzdGF0ZS5lbnRpdGllc1sgbW9kZWxOYW1lIF0gP1xuXHRcdHZhbHVlcyggc3RhdGUuZW50aXRpZXNbIG1vZGVsTmFtZSBdICkgOlxuXHRcdG51bGw7XG59XG5cbi8qKlxuICogUmV0dXJucyBqdXN0IHRoZSBlbnRpdHkgKGlmIGl0IGV4aXN0cyBpbiB0aGUgc3RhdGUpIGZvciB0aGUgZ2l2ZW4gZW50aXR5SWQuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBzdGF0ZVxuICogQHBhcmFtIHsgc3RyaW5nIH0gbW9kZWxOYW1lXG4gKiBAcGFyYW0geyBudW1iZXIgfSBlbnRpdHlJZFxuICogQHJldHVybiB7bnVsbHx7fX0gUmV0dXJucyB0aGUgZW50aXR5IG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVudGl0eUJ5SWQoIHN0YXRlLCBtb2RlbE5hbWUsIGVudGl0eUlkICkge1xuXHRyZXR1cm4gc3RhdGUuZW50aXRpZXNbIG1vZGVsTmFtZSBdICYmIHN0YXRlLmVudGl0aWVzWyBtb2RlbE5hbWUgXVsgZW50aXR5SWQgXSA/XG5cdFx0c3RhdGUuZW50aXRpZXNbIG1vZGVsTmFtZSBdWyBlbnRpdHlJZCBdIDpcblx0XHRudWxsO1xufVxuIiwiLyoqXG4gKiBSZXR1cm5zIGFuIGFjdGlvbiBvYmplY3QgdXNlZCBpbiBzaWduYWxsaW5nIHRoYXQgdGhlIHJlcXVlc3QgZm9yIGEgZ2l2ZW5cbiAqIG1vZGVsIGFuZCBxdWVyeSBzdHJpbmcgaGFzIGJlZW4gbWFkZS5cbiAqXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7IHN0cmluZyB9IHF1ZXJ5U3RyaW5nICBSZXN1bHRzIGFyZSBzdG9yZWQgaW5kZXhlZCBieSB0aGUgcXVlcnkgc3RyaW5nXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGluZyB0aGVtLlxuICogQHJldHVybiB7e3R5cGU6IHN0cmluZywgbW9kZWxOYW1lOiBzdHJpbmcsIHF1ZXJ5U3RyaW5nOiBzdHJpbmd9fSBPYmplY3RcbiAqICAgICAgICAgICAgICAgICAgICBmb3IgYWN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0UmVxdWVzdGVkKCBtb2RlbE5hbWUsIHF1ZXJ5U3RyaW5nICkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6ICdTRVRfUkVRVUVTVEVEJyxcblx0XHRtb2RlbE5hbWUsXG5cdFx0cXVlcnlTdHJpbmcsXG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhY3Rpb24gb2JqZWN0IHVzZWQgaW4gdXBkYXRpbmcgdGhlIHN0b3JlIHdpdGggdGhlIHByb3ZpZGVkIGl0ZW1zXG4gKiByZXRyaWV2ZWQgZnJvbSBhIHJlcXVlc3QgdXNpbmcgdGhlIGdpdmVuIHF1ZXJ5c3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7IHN0cmluZyB9IG1vZGVsTmFtZVxuICogQHBhcmFtIHsgc3RyaW5nIH0gcXVlcnlTdHJpbmcgIFJlc3VsdHMgYXJlIHN0b3JlZCBpbmRleGVkIGJ5IHRoZSBxdWVyeVxuICogICBzdHJpbmdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0aW5nIHRoZW0uXG4gKiBAcGFyYW0geyBBcnJheSB9IGl0ZW1zICAgICAgICAgSXRlbXMgcmV0dXJuZWQgZnJvbSB0aGUgcXVlcnkuXG4gKiBAcmV0dXJuIHt7dHlwZTogc3RyaW5nLCBtb2RlbE5hbWU6IHN0cmluZywgcXVlcnlTdHJpbmc6IHN0cmluZywgaXRlbXM6XG4gKiAgIEFycmF5fX0gT2JqZWN0IGZvciBhY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWNlaXZlUmVzcG9uc2UoIG1vZGVsTmFtZSwgcXVlcnlTdHJpbmcsIGl0ZW1zID0gW10gKSB7XG5cdHJldHVybiB7XG5cdFx0dHlwZTogJ1JFQ0VJVkVfTElTVCcsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdHF1ZXJ5U3RyaW5nLFxuXHRcdGl0ZW1zLFxuXHR9O1xufVxuIiwiLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHJlZ2lzdGVyU3RvcmUgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgcmVkdWNlcnMgZnJvbSAnLi9yZWR1Y2Vycyc7XG5pbXBvcnQgKiBhcyBzZWxlY3RvcnMgZnJvbSAnLi9zZWxlY3RvcnMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuL2FjdGlvbnMnO1xuaW1wb3J0ICogYXMgcmVzb2x2ZXJzIGZyb20gJy4vcmVzb2x2ZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0ZXJTdG9yZSggJ2V2ZW50ZXNwcmVzc28vbGlzdHMnLCB7XG5cdHJlZHVjZXJzLFxuXHRhY3Rpb25zLFxuXHRzZWxlY3RvcnMsXG5cdHJlc29sdmVycyxcbn0gKTtcbiIsIi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IERFRkFVTFRfTElTVFNfU1RBVEUgfSBmcm9tICcuLi8uLi9tb2RlbCc7XG5cbi8qKlxuICogUmVkdWNlciBtYW5hZ2luZyBpdGVtIGxpc3Qgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlICBDdXJyZW50IHN0YXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblx0RGlzcGF0Y2hlZCBhY3Rpb24uXG4gKiBAcmV0dXJuIHtPYmplY3R9XHRVcGRhdGVkIHN0YXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbGlzdEl0ZW1zKCBzdGF0ZSA9IERFRkFVTFRfTElTVFNfU1RBVEUsIGFjdGlvbiApIHtcblx0Y29uc3QgeyB0eXBlLCBtb2RlbE5hbWUsIHF1ZXJ5U3RyaW5nLCBpdGVtcyA9IFtdIH0gPSBhY3Rpb247XG5cdHN3aXRjaCAoIHR5cGUgKSB7XG5cdFx0Y2FzZSAnU0VUX1JFUVVFU1RFRCc6XG5cdFx0XHRpZiAoICEgc3RhdGVbIG1vZGVsTmFtZSBdIHx8IHN0YXRlWyBtb2RlbE5hbWUgXS5oYXNPd25Qcm9wZXJ0eSggcXVlcnlTdHJpbmcgKSApIHtcblx0XHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRcdFsgbW9kZWxOYW1lIF06IHtcblx0XHRcdFx0XHRbIHF1ZXJ5U3RyaW5nIF06IG51bGwsXG5cdFx0XHRcdH0sXG5cdFx0XHR9O1xuXHRcdGNhc2UgJ1JFQ0VJVkVfTElTVCc6XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHQuLi5zdGF0ZSxcblx0XHRcdFx0WyBtb2RlbE5hbWUgXToge1xuXHRcdFx0XHRcdFsgcXVlcnlTdHJpbmcgXTogaXRlbXMsXG5cdFx0XHRcdH0sXG5cdFx0XHR9O1xuXHR9XG5cdHJldHVybiBzdGF0ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdEl0ZW1zO1xuIiwiLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBhcGlSZXF1ZXN0IGZyb20gJ0B3b3JkcHJlc3MvYXBpLXJlcXVlc3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBzZXRSZXF1ZXN0ZWQsIHJlY2VpdmVSZXNwb25zZSB9IGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgeyBhcHBseVF1ZXJ5U3RyaW5nIH0gZnJvbSAnLi4vLi4vbW9kZWwnO1xuXG4vKipcbiAqIFJlc29sdmVyIGZvciBnZW5lcmljIGl0ZW1zIHJldHVybmVkIGZyb20gYW4gZW5kcG9pbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlICBEYXRhIGluIHN0YXRlLlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHRoZSBpdGVtcyBhcmUgZm9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5U3RyaW5nICBBZGRpdGlvbmFsIHF1ZXJ5IHN0cmluZyBwYXJhbWV0ZXJzIHBhc3NlZCBvbiB0b1xuICogICB0aGUgUkVTVCByZXF1ZXN0LlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gKiBnZXRJdGVtcyggc3RhdGUsIG1vZGVsTmFtZSwgcXVlcnlTdHJpbmcgKSB7XG5cdGlmICggc3RhdGVbIG1vZGVsTmFtZSBdICYmXG5cdFx0c3RhdGVbIG1vZGVsTmFtZSBdLmhhc093blByb3BlcnR5KCBxdWVyeVN0cmluZyApICYmXG5cdFx0c3RhdGVbIG1vZGVsTmFtZSBdWyBxdWVyeVN0cmluZyBdICE9PSBudWxsXG5cdCkge1xuXHRcdHlpZWxkIHJlY2VpdmVSZXNwb25zZSggbW9kZWxOYW1lLFxuXHRcdFx0cXVlcnlTdHJpbmcsXG5cdFx0XHRzdGF0ZVsgbW9kZWxOYW1lIF1bIHF1ZXJ5U3RyaW5nIF0sXG5cdFx0KTtcblx0fVxuXHR5aWVsZCBzZXRSZXF1ZXN0ZWQoIG1vZGVsTmFtZSwgcXVlcnlTdHJpbmcgKTtcblx0Y29uc3QgaXRlbXMgPSBhd2FpdCBhcGlSZXF1ZXN0KCB7XG5cdFx0cGF0aDogYXBwbHlRdWVyeVN0cmluZyggbW9kZWxOYW1lLFxuXHRcdFx0cXVlcnlTdHJpbmcsXG5cdFx0KSxcblx0fSApO1xuXHR5aWVsZCByZWNlaXZlUmVzcG9uc2UoIG1vZGVsTmFtZSwgcXVlcnlTdHJpbmcsIGl0ZW1zICk7XG59XG5cbi8qKlxuICogUmVzb2x2ZXIgZm9yIGV2ZW50IGVudGl0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBEYXRhIGluIHN0YXRlLlxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5U3RyaW5nIEFkZGl0aW9uYWwgcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnMgcGFzc2VkIG9uIHRvXG4gKiAgIHRoZSBSRVNUIHJlcXVlc3QuXG4gKiBAcmV0dXJuIHtJdGVyYWJsZUl0ZXJhdG9yPCo+fSBBIGFzeW5jIGl0ZXJhYmxlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXZlbnRzKCBzdGF0ZSwgcXVlcnlTdHJpbmcgKSB7XG5cdHJldHVybiBnZXRJdGVtcyggc3RhdGUsICdldmVudCcsIHF1ZXJ5U3RyaW5nICk7XG59XG4iLCIvKipcbiAqIFJldHVybnMgYWxsIHRoZSBpdGVtcyBmb3IgdGhlIGdpdmVuIG1vZGVsTmFtZSBhbmQgcXVlcnlTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgRGF0YSBzdGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgVGhlIG1vZGVsIHRoZSBpdGVtcyBhcmUgYmVpbmcgcmV0cmlldmVkIGZvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVN0cmluZyBUaGUgcXVlcnkgc3RyaW5nIGZvciByZXRyaWV2aW5nIHRoZSBpdGVtcy5cbiAqIEByZXR1cm4ge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGl0ZW1zIGZvciB0aGUgZ2l2ZW4gbW9kZWwgYW5kIHF1ZXJ5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXRlbXMoIHN0YXRlLCBtb2RlbE5hbWUsIHF1ZXJ5U3RyaW5nICkge1xuXHRyZXR1cm4gc3RhdGVbIG1vZGVsTmFtZSBdICYmIHN0YXRlWyBtb2RlbE5hbWUgXVsgcXVlcnlTdHJpbmcgXSA/XG5cdFx0c3RhdGVbIG1vZGVsTmFtZSBdWyBxdWVyeVN0cmluZyBdIDpcblx0XHRbXTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhlIGl0ZW1zIGZvciB0aGUgZ2l2ZW4gbW9kZWwgbmFtZSBhbmQgcXVlcnkgc3RyaW5nIGFyZSBiZWluZ1xuICogcmVxdWVzdGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBEYXRhIHN0YXRlLlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgVGhlIG1vZGVsIHRoZSBpdGVzbSBhcmUgYmVpbmcgcmVxdWVzdGVkIGZvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVN0cmluZyBUaGUgcXVlcnkgc3RyaW5nIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBpdGVtcyBhcmUgYmVpbmcgcmVxdWVzdGVkIG9yIG5vdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUmVxdWVzdGluZ0l0ZW1zKCBzdGF0ZSwgbW9kZWxOYW1lLCBxdWVyeVN0cmluZyApIHtcblx0aWYgKCBzdGF0ZVsgbW9kZWxOYW1lIF0gJiYgc3RhdGVbIG1vZGVsTmFtZSBdWyBxdWVyeVN0cmluZyBdICkge1xuXHRcdHJldHVybiBzdGF0ZVsgbW9kZWxOYW1lIF1bIHF1ZXJ5U3RyaW5nIF0gPT09IG51bGw7XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogU2VsZWN0b3Igc3BlY2lmaWMgdG8gZXZlbnRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAgRGF0YSBzdGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVN0cmluZyBUaGUgcXVlcnkgc3RyaW5nIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIGV2ZW50IGVudGl0aWVzIGZvciB0aGUgZ2l2ZW4gbW9kZWwgYW5kIHF1ZXJ5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXZlbnRzKCBzdGF0ZSwgcXVlcnlTdHJpbmcgKSB7XG5cdHJldHVybiBnZXRJdGVtcyggc3RhdGUsICdldmVudCcsIHF1ZXJ5U3RyaW5nICk7XG59XG5cbi8qKlxuICogU2VsZWN0b3Igc3BlY2lmaWMgdG8gZXZlbnRzIGZvciBjaGVja2luZyBpZiByZXF1ZXN0aW5nIGV2ZW50cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgRGF0YSBzdGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVN0cmluZyBUaGUgcXVlcnkgc3RyaW5nIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBpdGVtcyBhcmUgYmVpbmcgcmVxdWVzdGVkIG9yIG5vdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUmVxdWVzdGluZ0V2ZW50cyggc3RhdGUsIHF1ZXJ5U3RyaW5nICkge1xuXHRyZXR1cm4gaXNSZXF1ZXN0aW5nSXRlbXMoIHN0YXRlLCAnZXZlbnQnLCBxdWVyeVN0cmluZyApO1xufVxuIiwiLyoqXG4gKiBSZWdpc3RlciBzdG9yZXNcbiAqL1xuaW1wb3J0ICcuL2V2ZW50ZXNwcmVzc28vY29yZSc7XG5pbXBvcnQgJy4vZXZlbnRlc3ByZXNzby9saXN0cyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBtYXBWYWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBlbmRwb2ludHMgfSBmcm9tICcuL2VuZHBvaW50cy5qcyc7XG5cbi8qKlxuICogUmVjZWl2ZXMgYW4gb2JqZWN0IG1hcCBvZiBtb2RlbE5hbWUgdG8gZW5kcG9pbnQgYW5kIG1hcHMgdGhhdCB0byBhIGRlZmF1bHRcbiAqIG1hcCBvZiBtb2RlbE5hbWUgdG8gZW1wdHkgYXJyYXkuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gbW9kZWxOYW1lRW5kcG9pbnRzXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gQW4gb2JqZWN0IG9mIHsgeyBtb2RlbE5hbWUgfSA6IFtdIH1cbiAqL1xuY29uc3QgbWFwVG9BcnJheVZhbHVlcyA9IG1vZGVsTmFtZUVuZHBvaW50cyA9PiB7XG5cdHJldHVybiBtYXBWYWx1ZXMoIG1vZGVsTmFtZUVuZHBvaW50cyxcblx0XHRmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9LFxuXHQpO1xufTtcblxuLyoqXG4gKiBSZWNlaXZlcyBhbiBvYmplY3QgbWFwIG9mIG1vZGVsTmFtZSB0byBlbmRwb2ludCBhbmQgbWFwcyB0aGF0IHRvIGEgZGVmYXVsdFxuICogbWFwIG9mIG1vZGVsTmFtZSB0byBlbXB0eSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHsgT2JqZWN0IH0gbW9kZWxOYW1lRW5kcG9pbnRzXG4gKiBAcmV0dXJuIHsgT2JqZWN0IH0gQW4gb2JqZWN0IG9mIHsgeyBtb2RlbE5hbWUgfSA6IHt9IH1cbiAqL1xuY29uc3QgbWFwVG9PYmplY3RWYWx1ZXMgPSBtb2RlbE5hbWVFbmRwb2ludHMgPT4ge1xuXHRyZXR1cm4gbWFwVmFsdWVzKCBtb2RlbE5hbWVFbmRwb2ludHMsXG5cdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fSxcblx0KTtcbn07XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIGRlZmF1bHQgc3RhdGUgdG8gYmUgdXNlZCBieSBzdG9yZXMgY29udGFpbmluZyBsaXN0cy5cbiAqXG4gKiBAdHlwZSB7IE9iamVjdCB9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xJU1RTX1NUQVRFID0gbWFwVG9BcnJheVZhbHVlcyggZW5kcG9pbnRzICk7XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIGRlZmF1bHQgc3RhdGUgdG8gYmUgdXNlZCBieSB0aGUgY29yZSBzdG9yZS5cbiAqXG4gKiBAdHlwZSB7e2VudGl0aWVzOiB7fSwgZW50aXR5SWRzOiB7fSwgZGlydHk6IHt9fX1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09SRV9TVEFURSA9IHtcblx0ZW50aXRpZXM6IHtcblx0XHQuLi5tYXBUb09iamVjdFZhbHVlcyggZW5kcG9pbnRzICksXG5cdH0sXG5cdGVudGl0eUlkczoge1xuXHRcdC4uLkRFRkFVTFRfTElTVFNfU1RBVEUsXG5cdH0sXG5cdGRpcnR5OiB7XG5cdFx0Li4uREVGQVVMVF9MSVNUU19TVEFURSxcblx0fSxcbn07XG5cbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWVqcyc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB2YWxpZGF0ZUVudGl0eUhhc0tleSB9IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogQWxsIGF2YWlsYWJsZSBlbmRwb2ludHMgZXhwb3NlZCB2aWEgdGhlIGVlanMuZGF0YSBnbG9iYWwgZnJvbSB0aGUgc2VydmVyLlxuICpcbiAqIEB0eXBlIHt7fX1cbiAqL1xuZXhwb3J0IGNvbnN0IHsgY29sbGVjdGlvbl9lbmRwb2ludHM6IGVuZHBvaW50cyA9IHt9IH0gPSBkYXRhLnBhdGhzO1xuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgZW5kcG9pbnQgZm9yIHRoZSBwcm92aWRlZCBtb2RlbC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lICBXaGF0IG1vZGVsIHRvIHJldHJpZXZlIHRoZSBlbmRwb2ludCBmb3IuXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICBUaGUgZW5kcG9pbnQgZm9yIHRoZSBwcm92aWRlZCBtb2RlbC5cbiAqIEB0aHJvd3Mge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVuZHBvaW50ID0gKCBtb2RlbE5hbWUgKSA9PiB7XG5cdHZhbGlkYXRlRW50aXR5SGFzS2V5KCBtb2RlbE5hbWUsIGVuZHBvaW50cyApO1xuXHRyZXR1cm4gZW5kcG9pbnRzWyBtb2RlbE5hbWUgXTtcbn07XG5cbi8qKlxuICogQXBwbGllcyB0aGUgcHJvdmlkZWQgcXVlcnlTdHJpbmcgdG8gdGhlIGVuZHBvaW50IGZvciB0aGUgcHJvdmlkZWQgbW9kZWwgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWUgIFdoYXQgbW9kZWwgdGhlIGZpbmFsIHN0cmluZyBpcyBmb3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlTdHJpbmcgIFRoZSBxdWVyeSBiZWluZyBhcHBlbmRlZCB0byB0aGUgZW5kcG9pbnQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmaW5hbCBhc3NlbWJsZWQgcXVlcnkgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgYXBwbHlRdWVyeVN0cmluZyA9ICggbW9kZWxOYW1lLCBxdWVyeVN0cmluZyApID0+IHtcblx0cmV0dXJuIGdldEVuZHBvaW50KCBtb2RlbE5hbWUgKSArICc/JyArIHF1ZXJ5U3RyaW5nO1xufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vZGVmYXVsdC1tb2RlbC1zdGF0ZSc7XG5leHBvcnQgKiBmcm9tICcuL2VuZHBvaW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3ByaW1hcnkta2V5cyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2VlanMnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcbmltcG9ydCB7IGlzQXJyYXksIHJlZHVjZSwgdHJpbUVuZCwga2V5QnkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbWVtaXplJztcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdHZhbGlkYXRlRW50aXR5SGFzS2V5LFxuXHR2YWxpZGF0ZUlzQXJyYXksXG5cdHZhbGlkYXRlSXNOb3RFbXB0eSxcbn0gZnJvbSAnLi92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBFeHBvc2VzIGEgbWFwIG9mIG1vZGVsbmFtZSB0byBwcmltYXJ5IGtleSBleHBvc2VkIGJ5IHRoZSBlZWpzLmRhdGEgZ2xvYmFsXG4gKiB2aWEgdGhlIHNlcnZlci5cbiAqXG4gKiBAdHlwZSB7e319XG4gKi9cbmV4cG9ydCBjb25zdCB7IHByaW1hcnlfa2V5czogcHJpbWFyeUtleXMgPSB7fSB9ID0gZGF0YS5wYXRocztcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZXMgZm9yIHRoZSBnaXZlbiBrZXlzIGZyb20gdGhlIHByb3ZpZGVkIGVudGl0eS5cbiAqIFRoaXMgZnVuY3Rpb24gd291bGQgYmUgdXNlZCBmb3IgbW9kZWxzIHRoYXQgaGF2ZSBjb21iaW5lZCBwcmltYXJ5IGtleXNcbiAqIChkZWxpdmVyZWQgYXMgYW4gYXJyYXkpLlxuICpcbiAqIEB0eXBlIHsgbWVtb2l6ZWQgfVxuICogQHJldHVybiB7IHN0cmluZyB9IFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gZm9yIHRoZSB2YWx1ZXMuXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbHVlc0ZvckNvbWJpbmVkUHJpbWFyeUtleXMgPSBtZW1vaXplKCAoIGtleXMsIGVudGl0eSApID0+IHtcblx0dmFsaWRhdGVJc0FycmF5KCBrZXlzICk7XG5cdGNvbnN0IHByaW1hcnlLZXkgPSByZWR1Y2UoIGtleXMsIGZ1bmN0aW9uKCByZXN1bHQsIGtleSApIHtcblx0XHR2YWxpZGF0ZUVudGl0eUhhc0tleSgga2V5LCBlbnRpdHkgKTtcblx0XHRyZXR1cm4gZW50aXR5WyByZXN1bHQgXSArICc6JyArIGVudGl0eVsga2V5IF07XG5cdH0gKTtcblx0cmV0dXJuIHRyaW1FbmQoIHByaW1hcnlLZXksICc6JyApO1xufSApO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlIGZvciB0aGUgZ2l2ZW4ga2V5IGZyb20gdGhlIHByb3ZpZGVkIGVudGl0eS5cbiAqIFRoaXMgZnVuY3Rpb24gd291bGQgYmUgdXNlZCBmb3IgbW9kZWxzIHRoYXQgaGF2ZSBvbmx5IG9uZSBwcmltYXJ5IGtleS5cbiAqXG4gKiBAdHlwZSB7bWVtb2l6ZWR9XG4gKiBAcmV0dXJuIHsgbnVtYmVyIH0gVGhlIHZhbHVlIGZvciB0aGUga2V5IGluIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbHVlRm9yUHJpbWFyeUtleSA9IG1lbW9pemUoICgga2V5LCBlbnRpdHkgKSA9PiB7XG5cdHZhbGlkYXRlRW50aXR5SGFzS2V5KCBrZXksIGVudGl0eSApO1xuXHRyZXR1cm4gZW50aXR5WyBrZXkgXTtcbn0gKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwcmltYXJ5IGtleSAob3IgY29tYmluZWQgcHJpbWFyeSBrZXlzKSBmcm9tIHRoZSBhdmFpbGFibGUgZGF0YS5cbiAqXG4gKiBAdHlwZSB7bWVtb2l6ZWR9XG4gKiBAcmV0dXJuIHsgc3RyaW5nfEFycmF5IH1cbiAqIEB0aHJvd3MgeyBFeGNlcHRpb24gfVxuICovXG5leHBvcnQgY29uc3QgZ2V0UHJpbWFyeUtleSA9IG1lbW9pemUoICggbW9kZWxOYW1lICkgPT4ge1xuXHR2YWxpZGF0ZUVudGl0eUhhc0tleSggbW9kZWxOYW1lLCBwcmltYXJ5S2V5cyApO1xuXHRyZXR1cm4gcHJpbWFyeUtleXNbIG1vZGVsTmFtZSBdO1xufSApO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlcyBmb3IgdGhlIHByaW1hcnkga2V5cyBmcm9tIHRoZSBwcm92aWRlZCBlbnRpdHkuXG4gKlxuICogQHR5cGUge21lbW9pemVkfVxuICogQHJldHVybiB7IHN0cmluZyB9ICBJZiB0aGUgbW9kZWwgaGFzIG9ubHkgb25lIHByaW1hcnkga2V5IHRoZW4gdGhlIHZhbHVlIHdpbGxcbiAqIGJlIGEgc2ltcGxlIHN0cmluZy4gIElmIHRoZSBtb2RlbCBoYXMgY29tYmluZWQgcHJpbWFyeSBrZXlzLCB0aGVuIHRoZSB2YWx1ZVxuICogd2lsbCBiZSBhcyBzdHJpbmcgaW4gdGhlIGZvcm1hdCBgJXMuJXNgIGZvciB0aGUgcHJpbWFyeSBrZXkgdmFsdWVzLlxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRFbnRpdHlQcmltYXJ5S2V5VmFsdWVzID0gbWVtb2l6ZSggKCBtb2RlbE5hbWUsIGVudGl0eSApID0+IHtcblx0Y29uc3Qga2V5cyA9IGdldFByaW1hcnlLZXkoIG1vZGVsTmFtZSApO1xuXHRyZXR1cm4gaXNBcnJheSgga2V5cyApID9cblx0XHR2YWx1ZXNGb3JDb21iaW5lZFByaW1hcnlLZXlzKCBrZXlzLCBlbnRpdHkgKSA6XG5cdFx0dmFsdWVGb3JQcmltYXJ5S2V5KCBrZXlzLCBlbnRpdHkgKTtcbn0gKTtcblxuLyoqXG4gKiBUaGlzIHJlY2VpdmVzIGFuIGFycmF5IG9mIGVudGl0aWVzIGFuZCByZXR1cm5zIGEgY29sbGVjdGlvbiBvZiB0aG9zZSBzYW1lXG4gKiBlbnRpdGllcyBpbmRleGVkIGJ5IHRoZSBwcmltYXJ5IGtleSB2YWx1ZSBmb3IgZWFjaCBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHsgc3RyaW5nIH0gbW9kZWxOYW1lXG4gKiBAcGFyYW0geyBBcnJheSB9IGVudGl0aWVzXG4gKiBAcmV0dXJuIHsqfSAgQSBjb2xsZWN0aW9uIGluZGV4ZWQgYnkgdGhlIHByaW1hcnkga2V5IHZhbHVlcyBmb3IgZWFjaCBlbnRpdHkuXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGtleUVudGl0aWVzQnlQcmltYXJ5S2V5VmFsdWUgPSAoIG1vZGVsTmFtZSwgZW50aXRpZXMgPSBbXSApID0+IHtcblx0dmFsaWRhdGVJc05vdEVtcHR5KFxuXHRcdGVudGl0aWVzLFxuXHRcdF9fKFxuXHRcdFx0J1RoZSBwcm92aWRlZCBhcnJheSBvZiBlbnRpdGllcyBtdXN0IG5vdCBiZSBlbXB0eScsXG5cdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdClcblx0KTtcblx0dmFsaWRhdGVJc0FycmF5KCBlbnRpdGllcyApO1xuXHRyZXR1cm4ga2V5QnkoIGVudGl0aWVzLCBmdW5jdGlvbiggZW50aXR5ICkge1xuXHRcdHJldHVybiBTdHJpbmcoIGdldEVudGl0eVByaW1hcnlLZXlWYWx1ZXMoIG1vZGVsTmFtZSwgZW50aXR5ICkgKTtcblx0fSApO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBFeGNlcHRpb24gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZWpzJztcbmltcG9ydCB7IHNwcmludGYsIF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQgeyBpc0FycmF5LCBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4ga2V5IGV4aXN0cyBpbiB0aGUgcHJvdmlkZWQgZW50aXR5IG9iamVjdC5cbiAqIFRoaXMgaXMgdXNlZCB3aGVuIGNhbGxpbmcgY29kZSB3YW50cyBhbiBleGNlcHRpb24gdG8gYmUgdGhyb3duLlxuICpcbiAqIEBwYXJhbSB7IHN0cmluZyB9IGtleVxuICogQHBhcmFtIHsgT2JqZWN0IH0gZW50aXR5XG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtZXNzYWdlXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH0gIFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHByb3ZpZGVkIGVudGl0eSBkb2VzIG5vdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGhhdmUgdGhlIGdpdmVuIGtleS5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRW50aXR5SGFzS2V5ID0gKCBrZXksIGVudGl0eSwgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBzcHJpbnRmKFxuXHRcdFx0X18oXG5cdFx0XHRcdCdUaGUgcHJvdmlkZWQgZW50aXR5ICglcykgZG9lcyBub3QgaGF2ZSB0aGUgZ2l2ZW4gcHJvcGVydHkgKCVzKScsXG5cdFx0XHRcdCdldmVudF9lc3ByZXNzbycsXG5cdFx0XHQpLFxuXHRcdFx0ZW50aXR5LFxuXHRcdFx0a2V5LFxuXHRcdCk7XG5cdH1cblx0aWYgKCAhIGVudGl0eS5oYXNPd25Qcm9wZXJ0eSgga2V5ICkgKSB7XG5cdFx0dGhyb3cgbmV3IEV4Y2VwdGlvbiggbWVzc2FnZSApO1xuXHR9XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBhcnJheS5cbiAqXG4gKiBAcGFyYW0geyp9IGl0ZW1zXG4gKiBAcGFyYW0geyBzdHJpbmcgfSAgbWVzc2FnZVxuICogQHRocm93cyB7IEV4Y2VwdGlvbiB9IFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBhblxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVJc0FycmF5ID0gKCBpdGVtcywgbWVzc2FnZSA9ICcnICkgPT4ge1xuXHRpZiAoIG1lc3NhZ2UgPT09ICcnICkge1xuXHRcdG1lc3NhZ2UgPSBfXyggJ1RoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3QgYW4gYXJyYXkuJywgJ2V2ZW50X2VzcHJlc3NvJyApO1xuXHR9XG5cdGlmICggISBpc0FycmF5KCBpdGVtcyApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgZW1wdHkgb3Igbm90LlxuICpcbiAqIENhbGwgdGhpcyB2YWxpZGF0b3Igd2hlbiB5b3Ugd2FudCB0byBtYWtlIHN1cmUgdGhlIHZhbHVlIGlzIE5PVCBlbXB0eS5cbiAqXG4gKiBAcGFyYW0geyp9IGl0ZW1zXG4gKiBAcGFyYW0geyBzdHJpbmcgfSBtZXNzYWdlXG4gKiBAdGhyb3dzIHsgRXhjZXB0aW9uIH0gVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgZW1wdHkuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUlzTm90RW1wdHkgPSAoIGl0ZW1zLCBtZXNzYWdlID0gJycgKSA9PiB7XG5cdGlmICggbWVzc2FnZSA9PT0gJycgKSB7XG5cdFx0bWVzc2FnZSA9IF9fKFxuXHRcdFx0J1RoZSBwcm92aWRlZCBpdGVtcyBtdXN0IG5vdCBiZSBlbXB0eScsXG5cdFx0XHQnZXZlbnRfZXNwcmVzc28nLFxuXHRcdCk7XG5cdH1cblx0aWYgKCBpc0VtcHR5KCBpdGVtcyApICkge1xuXHRcdHRocm93IG5ldyBFeGNlcHRpb24oIG1lc3NhZ2UgKTtcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSBPYmplY3Qua2V5cztcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBvYmplY3RzIGFyZSBzaGFsbG93IGVxdWFsLCBvciBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgRmlyc3Qgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gYiBTZWNvbmQgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn0gV2hldGhlciB0aGUgdHdvIG9iamVjdHMgYXJlIHNoYWxsb3cgZXF1YWwuXG4gKi9cbmZ1bmN0aW9uIGlzU2hhbGxvd0VxdWFsT2JqZWN0cyggYSwgYiApIHtcblx0dmFyIGFLZXlzLCBiS2V5cywgaSwga2V5O1xuXG5cdGlmICggYSA9PT0gYiApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGFLZXlzID0ga2V5cyggYSApO1xuXHRiS2V5cyA9IGtleXMoIGIgKTtcblxuXHRpZiAoIGFLZXlzLmxlbmd0aCAhPT0gYktleXMubGVuZ3RoICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGkgPSAwO1xuXG5cdHdoaWxlICggaSA8IGFLZXlzLmxlbmd0aCApIHtcblx0XHRrZXkgPSBhS2V5c1sgaSBdO1xuXHRcdGlmICggYVsga2V5IF0gIT09IGJbIGtleSBdICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGkrKztcblx0fVxuXG5cdHJldHVybiB0cnVlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc1NoYWxsb3dFcXVhbE9iamVjdHM7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lbWl6ZSggZm4sIG9wdGlvbnMgKSB7XG5cdHZhciBzaXplID0gMCxcblx0XHRtYXhTaXplLCBoZWFkLCB0YWlsO1xuXG5cdGlmICggb3B0aW9ucyAmJiBvcHRpb25zLm1heFNpemUgKSB7XG5cdFx0bWF4U2l6ZSA9IG9wdGlvbnMubWF4U2l6ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIG1lbW9pemVkKCAvKiAuLi5hcmdzICovICkge1xuXHRcdHZhciBub2RlID0gaGVhZCxcblx0XHRcdGxlbiA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0XHRhcmdzLCBpO1xuXG5cdFx0c2VhcmNoQ2FjaGU6IHdoaWxlICggbm9kZSApIHtcblx0XHRcdC8vIFBlcmZvcm0gYSBzaGFsbG93IGVxdWFsaXR5IHRlc3QgdG8gY29uZmlybSB0aGF0IHdoZXRoZXIgdGhlIG5vZGVcblx0XHRcdC8vIHVuZGVyIHRlc3QgaXMgYSBjYW5kaWRhdGUgZm9yIHRoZSBhcmd1bWVudHMgcGFzc2VkLiBUd28gYXJyYXlzXG5cdFx0XHQvLyBhcmUgc2hhbGxvd2x5IGVxdWFsIGlmIHRoZWlyIGxlbmd0aCBtYXRjaGVzIGFuZCBlYWNoIGVudHJ5IGlzXG5cdFx0XHQvLyBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuIHRoZSB0d28gc2V0cy4gQXZvaWQgYWJzdHJhY3RpbmcgdG8gYVxuXHRcdFx0Ly8gZnVuY3Rpb24gd2hpY2ggY291bGQgaW5jdXIgYW4gYXJndW1lbnRzIGxlYWtpbmcgZGVvcHRpbWl6YXRpb24uXG5cblx0XHRcdC8vIENoZWNrIHdoZXRoZXIgbm9kZSBhcmd1bWVudHMgbWF0Y2ggYXJndW1lbnRzIGxlbmd0aFxuXHRcdFx0aWYgKCBub2RlLmFyZ3MubGVuZ3RoICE9PSBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgd2hldGhlciBub2RlIGFyZ3VtZW50cyBtYXRjaCBhcmd1bWVudHMgdmFsdWVzXG5cdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRpZiAoIG5vZGUuYXJnc1sgaSBdICE9PSBhcmd1bWVudHNbIGkgXSApIHtcblx0XHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRcdGNvbnRpbnVlIHNlYXJjaENhY2hlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQgd2UgY2FuIGFzc3VtZSB3ZSd2ZSBmb3VuZCBhIG1hdGNoXG5cblx0XHRcdC8vIFN1cmZhY2UgbWF0Y2hlZCBub2RlIHRvIGhlYWQgaWYgbm90IGFscmVhZHlcblx0XHRcdGlmICggbm9kZSAhPT0gaGVhZCApIHtcblx0XHRcdFx0Ly8gQXMgdGFpbCwgc2hpZnQgdG8gcHJldmlvdXMuIE11c3Qgb25seSBzaGlmdCBpZiBub3QgYWxzb1xuXHRcdFx0XHQvLyBoZWFkLCBzaW5jZSBpZiBib3RoIGhlYWQgYW5kIHRhaWwsIHRoZXJlIGlzIG5vIHByZXZpb3VzLlxuXHRcdFx0XHRpZiAoIG5vZGUgPT09IHRhaWwgKSB7XG5cdFx0XHRcdFx0dGFpbCA9IG5vZGUucHJldjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkanVzdCBzaWJsaW5ncyB0byBwb2ludCB0byBlYWNoIG90aGVyLiBJZiBub2RlIHdhcyB0YWlsLFxuXHRcdFx0XHQvLyB0aGlzIGFsc28gaGFuZGxlcyBuZXcgdGFpbCdzIGVtcHR5IGBuZXh0YCBhc3NpZ25tZW50LlxuXHRcdFx0XHRub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcblx0XHRcdFx0aWYgKCBub2RlLm5leHQgKSB7XG5cdFx0XHRcdFx0bm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRub2RlLm5leHQgPSBoZWFkO1xuXHRcdFx0XHRub2RlLnByZXYgPSBudWxsO1xuXHRcdFx0XHRoZWFkLnByZXYgPSBub2RlO1xuXHRcdFx0XHRoZWFkID0gbm9kZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV0dXJuIGltbWVkaWF0ZWx5XG5cdFx0XHRyZXR1cm4gbm9kZS52YWw7XG5cdFx0fVxuXG5cdFx0Ly8gTm8gY2FjaGVkIHZhbHVlIGZvdW5kLiBDb250aW51ZSB0byBpbnNlcnRpb24gcGhhc2U6XG5cblx0XHQvLyBDcmVhdGUgYSBjb3B5IG9mIGFyZ3VtZW50cyAoYXZvaWQgbGVha2luZyBkZW9wdGltaXphdGlvbilcblx0XHRhcmdzID0gbmV3IEFycmF5KCBsZW4gKTtcblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0YXJnc1sgaSBdID0gYXJndW1lbnRzWyBpIF07XG5cdFx0fVxuXG5cdFx0bm9kZSA9IHtcblx0XHRcdGFyZ3M6IGFyZ3MsXG5cblx0XHRcdC8vIEdlbmVyYXRlIHRoZSByZXN1bHQgZnJvbSBvcmlnaW5hbCBmdW5jdGlvblxuXHRcdFx0dmFsOiBmbi5hcHBseSggbnVsbCwgYXJncyApXG5cdFx0fTtcblxuXHRcdC8vIERvbid0IG5lZWQgdG8gY2hlY2sgd2hldGhlciBub2RlIGlzIGFscmVhZHkgaGVhZCwgc2luY2UgaXQgd291bGRcblx0XHQvLyBoYXZlIGJlZW4gcmV0dXJuZWQgYWJvdmUgYWxyZWFkeSBpZiBpdCB3YXNcblxuXHRcdC8vIFNoaWZ0IGV4aXN0aW5nIGhlYWQgZG93biBsaXN0XG5cdFx0aWYgKCBoZWFkICkge1xuXHRcdFx0aGVhZC5wcmV2ID0gbm9kZTtcblx0XHRcdG5vZGUubmV4dCA9IGhlYWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIElmIG5vIGhlYWQsIGZvbGxvd3MgdGhhdCB0aGVyZSdzIG5vIHRhaWwgKGF0IGluaXRpYWwgb3IgcmVzZXQpXG5cdFx0XHR0YWlsID0gbm9kZTtcblx0XHR9XG5cblx0XHQvLyBUcmltIHRhaWwgaWYgd2UncmUgcmVhY2hlZCBtYXggc2l6ZSBhbmQgYXJlIHBlbmRpbmcgY2FjaGUgaW5zZXJ0aW9uXG5cdFx0aWYgKCBzaXplID09PSBtYXhTaXplICkge1xuXHRcdFx0dGFpbCA9IHRhaWwucHJldjtcblx0XHRcdHRhaWwubmV4dCA9IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNpemUrKztcblx0XHR9XG5cblx0XHRoZWFkID0gbm9kZTtcblxuXHRcdHJldHVybiBub2RlLnZhbDtcblx0fVxuXG5cdG1lbW9pemVkLmNsZWFyID0gZnVuY3Rpb24oKSB7XG5cdFx0aGVhZCA9IG51bGw7XG5cdFx0dGFpbCA9IG51bGw7XG5cdFx0c2l6ZSA9IDA7XG5cdH07XG5cblx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnICkge1xuXHRcdC8vIENhY2hlIGlzIG5vdCBleHBvc2VkIGluIHRoZSBwdWJsaWMgQVBJLCBidXQgdXNlZCBpbiB0ZXN0cyB0byBlbnN1cmVcblx0XHQvLyBleHBlY3RlZCBsaXN0IHByb2dyZXNzaW9uXG5cdFx0bWVtb2l6ZWQuZ2V0Q2FjaGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBbIGhlYWQsIHRhaWwsIHNpemUgXTtcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIG1lbW9pemVkO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZWVqczsiLCJtb2R1bGUuZXhwb3J0cyA9IGVlanMuaTE4bjsiLCJtb2R1bGUuZXhwb3J0cyA9IHVuZGVmaW5lZDsiLCJtb2R1bGUuZXhwb3J0cyA9IHVuZGVmaW5lZDsiXSwic291cmNlUm9vdCI6IiJ9
this["eejs"] = this["eejs"] || {}; this["eejs"]["modelSchema"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/data/eventespresso/schema/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/data/eventespresso/base-controls.js":
/*!********************************************************!*\
  !*** ./assets/src/data/eventespresso/base-controls.js ***!
  \********************************************************/
/*! exports provided: fetch, select, resolveSelect, dispatch, resolveDispatch, resolveGetEntityByIdForIds, resolveGetRelatedEntities, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return select; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveSelect", function() { return resolveSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return dispatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveDispatch", function() { return resolveDispatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveGetEntityByIdForIds", function() { return resolveGetEntityByIdForIds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveGetRelatedEntities", function() { return resolveGetRelatedEntities; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/model */ "@eventespresso/model");
/* harmony import */ var _eventespresso_model__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_model__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _core_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/constants */ "./assets/src/data/eventespresso/core/constants.js");




/**
 * External imports
 */



/**
 * Internal imports
 */


/**
 * Returns the action object for a fetch control.
 *
 * @param {Object} request
 * @return {{
 *      type: string,
 *      request: Object
 * }}
 * An action object
 */

function fetch(request) {
  return {
    type: 'FETCH_FROM_API',
    request: request
  };
}
/**
 * Returns the action object for a select control.
 *
 * @param {string} reducerKey
 * @param {string} selectorName
 * @param {...Array|boolean|number|Object|string} args
 * @return {{
 *      type: string,
 *      reducerKey: string,
 *      selectorName: string,
 *      args: ...Array|boolean|number|Object|string
 * }}
 * Returns an action object.
 */

function select(reducerKey, selectorName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return {
    type: 'SELECT',
    reducerKey: reducerKey,
    selectorName: selectorName,
    args: args
  };
}
/**
 * Returns the action object for resolving a selector that has a resolver.
 *
 * @param {string} reducerKey
 * @param {string} selectorName
 * @param {...Array|boolean|number|Object|string} args
 * @return {Object} An action object.
 */

function resolveSelect(reducerKey, selectorName) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return {
    type: 'RESOLVE_SELECT',
    reducerKey: reducerKey,
    selectorName: selectorName,
    args: args
  };
}
/**
 * Returns the action object for a dispatch control.
 *
 * @param {string} reducerKey
 * @param {string} dispatchName
 * @param {...Array|boolean|number|Object|string} args
 * @return {{
 *      type: string,
 *      reducerKey: string,
 *      dispatchName: string,
 *      args: ...Array|boolean|number|Object|string
 * }}
 * An action object
 */

function dispatch(reducerKey, dispatchName) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    args[_key3 - 2] = arguments[_key3];
  }

  return {
    type: 'DISPATCH',
    reducerKey: reducerKey,
    dispatchName: dispatchName,
    args: args
  };
}
/**
 * Returns the action object for a resolve dispatch control
 *
 * @param {string} reducerKey
 * @param {string} dispatchName
 * @param {...Array|boolean|number|Object|string} args
 * @return {Object} The action object.
 */

function resolveDispatch(reducerKey, dispatchName) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
    args[_key4 - 2] = arguments[_key4];
  }

  return {
    type: 'RESOLVE_DISPATCH',
    reducerKey: reducerKey,
    dispatchName: dispatchName,
    args: args
  };
}
/**
 * Returns the action object for resolving the getEntityById selector
 * for all the given ids on the given model
 *
 * @param {string} modelName
 * @param {Array} entityIds
 * @return {Object} An action object
 */

function resolveGetEntityByIdForIds(modelName, entityIds) {
  return {
    type: 'RESOLVE_GET_ENTITY_BY_ID_FOR_IDS',
    modelName: modelName,
    entityIds: entityIds
  };
}
/**
 * Returns the action object for resolving the getRelatedEntities selector
 * on the eventespresso/core store for the given arguments.
 *
 * @param {BaseEntity|Object} entity
 * @param {Map} relationEntities
 * @param {Array<number>} relationIds
 * @return {Object} An action object
 */

function resolveGetRelatedEntities(entity, relationEntities, relationIds) {
  return {
    type: 'RESOLVE_GET_RELATED_ENTITIES',
    entity: entity,
    relationEntities: relationEntities,
    relationIds: relationIds
  };
}
var controls = {
  FETCH_FROM_API: function FETCH_FROM_API(_ref) {
    var request = _ref.request;
    // return {};
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()(request);
  },
  SELECT: function SELECT(_ref2) {
    var _selectData;

    var reducerKey = _ref2.reducerKey,
        selectorName = _ref2.selectorName,
        args = _ref2.args;
    return (_selectData = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__["select"])(reducerKey))[selectorName].apply(_selectData, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(args));
  },
  DISPATCH: function DISPATCH(_ref3) {
    var _dispatchData;

    var reducerKey = _ref3.reducerKey,
        dispatchName = _ref3.dispatchName,
        args = _ref3.args;
    return (_dispatchData = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__["dispatch"])(reducerKey))[dispatchName].apply(_dispatchData, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(args));
  },
  RESOLVE_DISPATCH: function () {
    var _RESOLVE_DISPATCH = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(_ref4) {
      var _dispatchData2;

      var reducerKey, dispatchName, args;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              reducerKey = _ref4.reducerKey, dispatchName = _ref4.dispatchName, args = _ref4.args;
              _context.next = 3;
              return (_dispatchData2 = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__["dispatch"])(reducerKey))[dispatchName].apply(_dispatchData2, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(args));

            case 3:
              return _context.abrupt("return", _context.sent);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function RESOLVE_DISPATCH(_x) {
      return _RESOLVE_DISPATCH.apply(this, arguments);
    }

    return RESOLVE_DISPATCH;
  }(),
  RESOLVE_SELECT: function RESOLVE_SELECT(_ref5) {
    var reducerKey = _ref5.reducerKey,
        selectorName = _ref5.selectorName,
        args = _ref5.args;
    return new Promise(function (resolve) {
      var hasFinished = function hasFinished() {
        return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__["select"])('core/data').hasFinishedResolution(reducerKey, selectorName, args);
      };

      var getResult = function getResult() {
        return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__["select"])(reducerKey)[selectorName].apply(null, args);
      }; // trigger the selector (to trigger the resolver)


      var result = getResult();

      if (hasFinished()) {
        return resolve(result);
      }

      var unsubscribe = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__["subscribe"])(function () {
        if (hasFinished()) {
          unsubscribe();
          resolve(getResult());
        }
      });
    });
  },
  RESOLVE_GET_ENTITY_BY_ID_FOR_IDS: function RESOLVE_GET_ENTITY_BY_ID_FOR_IDS(_ref6) {
    var modelName = _ref6.modelName,
        entityIds = _ref6.entityIds;

    while (entityIds.length > 0) {
      Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__["dispatch"])('core/data', 'finishResolution', _core_constants__WEBPACK_IMPORTED_MODULE_6__["REDUCER_KEY"], 'getEntityById', [modelName, entityIds.pop()]);
    }
  },
  RESOLVE_GET_RELATED_ENTITIES: function RESOLVE_GET_RELATED_ENTITIES(_ref7) {
    var entity = _ref7.entity,
        relationEntities = _ref7.relationEntities,
        relationIds = _ref7.relationIds;

    while (relationIds.length > 0) {
      var relationEntity = relationEntities.get(relationIds.pop());

      if (relationEntity) {
        Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__["dispatch"])('core/data', 'finishResolution', _core_constants__WEBPACK_IMPORTED_MODULE_6__["REDUCER_KEY"], 'getRelatedEntities', [relationEntity, Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_5__["pluralModelName"])(entity.modelName)]);
      }
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (controls);

/***/ }),

/***/ "./assets/src/data/eventespresso/base-model.js":
/*!*****************************************************!*\
  !*** ./assets/src/data/eventespresso/base-model.js ***!
  \*****************************************************/
/*! exports provided: getMethodName, keepExistingEntitiesInObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMethodName", function() { return getMethodName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keepExistingEntitiesInObject", function() { return keepExistingEntitiesInObject; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pluralize */ "./node_modules/pluralize/pluralize.js");
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pluralize__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/helpers */ "@eventespresso/helpers");
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__);
/**
 * External dependencies
 */



/**
 * A helper for getting a method name.
 * @param {string} modelName
 * @param {string} suffix
 * @param {string} prefix
 * @param {boolean} usePlural
 * @return {string} Returns a name for a method.
 */

var getMethodName = function getMethodName(modelName) {
  var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
  var usePlural = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  modelName = usePlural ? pluralize__WEBPACK_IMPORTED_MODULE_1___default()(modelName) : modelName;
  return prefix + Object(lodash__WEBPACK_IMPORTED_MODULE_0__["upperFirst"])(Object(lodash__WEBPACK_IMPORTED_MODULE_0__["camelCase"])(modelName + Object(lodash__WEBPACK_IMPORTED_MODULE_0__["upperFirst"])(suffix)));
};
/**
 * Given a collection of existing entities and a collection of incoming
 * entities, this returns a merged object with preference given to common
 * entities from the existingEntities collection.
 *
 * Incoming collections can be Maps or plain objects.
 *
 * Note if incomingEntities is a Map, the ORDER of the map will be preserved
 * even if the values of entities in the map are replaced by values from
 * existing entities.
 *
 * @param {Map|Object} existingEntities
 * @param {Map|Object} incomingEntities
 * @return {Map} A new collection of entities. Note if existing entities came in
 * as a plain object, this returns a Map.
 */

var keepExistingEntitiesInObject = function keepExistingEntitiesInObject(existingEntities, incomingEntities) {
  var getExistingOrDefaultEntity = function getExistingOrDefaultEntity(defaultEntity, entityId) {
    if (Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isMap"])(existingEntities) && existingEntities.has(entityId)) {
      return existingEntities.get(entityId);
    }

    return existingEntities[entityId] || defaultEntity;
  };

  var reduceCallback = function reduceCallback(mapped, entity, entityId) {
    entityId = normalizeEntityId(entityId);
    mapped.set(entityId, getExistingOrDefaultEntity(entity, entityId));
    return mapped;
  };

  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isMap"])(incomingEntities) ? Object(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_2__["mapReducer"])(incomingEntities, reduceCallback, new Map()) : Object(lodash__WEBPACK_IMPORTED_MODULE_0__["reduce"])(incomingEntities, reduceCallback, new Map());
};
/**
 * This normalizes numeric values to integer numbers and leaves non numeric
 * values alone.
 *
 * @param {*} entityId
 * @return {*} Normalized value
 */

var normalizeEntityId = function normalizeEntityId(entityId) {
  var originalId = entityId;
  entityId = parseInt(entityId, 10);
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isNaN"])(entityId) ? originalId : entityId;
};

/***/ }),

/***/ "./assets/src/data/eventespresso/base-selectors.js":
/*!*********************************************************!*\
  !*** ./assets/src/data/eventespresso/base-selectors.js ***!
  \*********************************************************/
/*! exports provided: isResolving, hasFinishedResolving */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isResolving", function() { return isResolving; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasFinishedResolving", function() { return hasFinishedResolving; });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External dependencies
 */

/**
 * Invokes the selector for whether a given selectorName in a given registered
 * reducer store is in the midst of resolving.
 * @param {string} reducerKey
 * @param {string} selectorName
 * @param {*[]} args
 * @return {boolean}  Whether resolution is in progress.
 */

var isResolving = function isResolving(reducerKey, selectorName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["select"])('core/data').isResolving(reducerKey, selectorName, args);
};
/**
 * Invokes the selector for whether a given selectorName in a given registered
 * reducer store has finished resolving.
 *
 * @param {string} reducerKey
 * @param {string} selectorName
 * @param {*[]} args
 * @return {boolean} Whether resolution has completed.
 */

var hasFinishedResolving = function hasFinishedResolving(reducerKey, selectorName) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["select"])('core/data').hasFinishedResolution(reducerKey, selectorName, args);
};

/***/ }),

/***/ "./assets/src/data/eventespresso/core/constants.js":
/*!*********************************************************!*\
  !*** ./assets/src/data/eventespresso/core/constants.js ***!
  \*********************************************************/
/*! exports provided: REDUCER_KEY, TYPE_QUEUE_RELATION_DELETE, TYPE_QUEUE_RELATION_ADD */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REDUCER_KEY", function() { return REDUCER_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE_QUEUE_RELATION_DELETE", function() { return TYPE_QUEUE_RELATION_DELETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE_QUEUE_RELATION_ADD", function() { return TYPE_QUEUE_RELATION_ADD; });
var REDUCER_KEY = 'eventespresso/core';
var TYPE_QUEUE_RELATION_DELETE = 'delete';
var TYPE_QUEUE_RELATION_ADD = 'add';

/***/ }),

/***/ "./assets/src/data/eventespresso/schema/action-types.js":
/*!**************************************************************!*\
  !*** ./assets/src/data/eventespresso/schema/action-types.js ***!
  \**************************************************************/
/*! exports provided: ACTION_TYPES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
var ACTION_TYPES = {
  RECEIVE_SCHEMA_RECORD: 'RECEIVE_SCHEMA_RECORD',
  RECEIVE_FACTORY_FOR_MODEL: 'RECEIVE_FACTORY_FOR_MODEL',
  RECEIVE_RELATION_ENDPOINT_FOR_MODEL_ENTITY: 'RECEIVE_RELATION_ENDPOINT_FOR_MODEL_ENTITY',
  RECEIVE_RELATION_SCHEMA: 'RECEIVE_RELATION_SCHEMA'
};

/***/ }),

/***/ "./assets/src/data/eventespresso/schema/actions.js":
/*!*********************************************************!*\
  !*** ./assets/src/data/eventespresso/schema/actions.js ***!
  \*********************************************************/
/*! exports provided: receiveSchemaForModel, receiveSchemaForModelAndResolve, receiveFactoryForModel, receiveFactoryForModelAndResolve, receiveRelationEndpointForModelEntity, receiveRelationSchema, receiveRelationSchemaAndResolve */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveSchemaForModel", function() { return receiveSchemaForModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveSchemaForModelAndResolve", function() { return receiveSchemaForModelAndResolve; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveFactoryForModel", function() { return receiveFactoryForModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveFactoryForModelAndResolve", function() { return receiveFactoryForModelAndResolve; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveRelationEndpointForModelEntity", function() { return receiveRelationEndpointForModelEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveRelationSchema", function() { return receiveRelationSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveRelationSchemaAndResolve", function() { return receiveRelationSchemaAndResolve; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./action-types */ "./assets/src/data/eventespresso/schema/action-types.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./assets/src/data/eventespresso/schema/constants.js");
/* harmony import */ var _base_controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base-controls */ "./assets/src/data/eventespresso/base-controls.js");


var _marked =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(receiveSchemaForModelAndResolve),
    _marked2 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(receiveFactoryForModelAndResolve),
    _marked3 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(receiveRelationSchemaAndResolve);

/**
 * Internal imports
 */



/**
 * Returns an action object used to update the store with the provided schema
 * for the provided modelName.
 *
 * @param {string} modelName
 * @param {Object} schema
 * @return {{type: string, modelName: *, schema}}  The action object.
 */

function receiveSchemaForModel(modelName) {
  var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    type: _action_types__WEBPACK_IMPORTED_MODULE_1__["ACTION_TYPES"].RECEIVE_SCHEMA_RECORD,
    modelName: modelName,
    schema: schema
  };
}
function receiveSchemaForModelAndResolve(modelName) {
  var schema,
      _args = arguments;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function receiveSchemaForModelAndResolve$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          schema = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          _context.next = 3;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_3__["dispatch"])(_constants__WEBPACK_IMPORTED_MODULE_2__["REDUCER_KEY"], 'receiveSchemaForModel', modelName, schema);

        case 3:
          _context.next = 5;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_3__["dispatch"])('core/data', 'finishResolution', _constants__WEBPACK_IMPORTED_MODULE_2__["REDUCER_KEY"], 'getSchemaForModel', [modelName.toLowerCase()]);

        case 5:
          return _context.abrupt("return", schema);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * Returns an action object used to update the store with the provided model
 * entity factory for the provided modelName.
 *
 * @param {string} modelName
 * @param {Object} factory
 * @return {{type: string, modelName: string, factory: Object}} An action
 * object.
 */

function receiveFactoryForModel(modelName) {
  var factory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    type: _action_types__WEBPACK_IMPORTED_MODULE_1__["ACTION_TYPES"].RECEIVE_FACTORY_FOR_MODEL,
    modelName: modelName,
    factory: factory
  };
}
function receiveFactoryForModelAndResolve(modelName) {
  var factory,
      _args2 = arguments;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function receiveFactoryForModelAndResolve$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          factory = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          _context2.next = 3;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_3__["dispatch"])(_constants__WEBPACK_IMPORTED_MODULE_2__["REDUCER_KEY"], 'receiveFactoryForModel', modelName, factory);

        case 3:
          _context2.next = 5;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_3__["dispatch"])('core/data', 'finishResolution', _constants__WEBPACK_IMPORTED_MODULE_2__["REDUCER_KEY"], 'getFactoryForModel', [modelName.toLowerCase()]);

        case 5:
          return _context2.abrupt("return", factory);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
/**
 * Returns an action object used to update the store with the provided relation
 * endpoint for the model and id, and its relations.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {string} relationName
 * @param {string} endpoint
 * @return {
 * 	{
 * 		modelName: *,
 * 		endpoint: *,
 * 		relationName: *,
 * 		entityId: *,
 * 		type: string
 * 	}
 * } An action object.
 */

function receiveRelationEndpointForModelEntity(modelName, entityId, relationName, endpoint) {
  return {
    type: _action_types__WEBPACK_IMPORTED_MODULE_1__["ACTION_TYPES"].RECEIVE_RELATION_ENDPOINT_FOR_MODEL_ENTITY,
    modelName: modelName,
    entityId: entityId,
    relationName: relationName,
    endpoint: endpoint
  };
}
function receiveRelationSchema(modelName, relationName, relationSchema) {
  return {
    type: _action_types__WEBPACK_IMPORTED_MODULE_1__["ACTION_TYPES"].RECEIVE_RELATION_SCHEMA,
    modelName: modelName,
    relationName: relationName,
    relationSchema: relationSchema
  };
}
function receiveRelationSchemaAndResolve(modelName, relationName, relationSchema) {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function receiveRelationSchemaAndResolve$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_3__["dispatch"])(_constants__WEBPACK_IMPORTED_MODULE_2__["REDUCER_KEY"], 'receiveRelationSchema', modelName, relationName, relationSchema);

        case 2:
          _context3.next = 4;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_3__["dispatch"])('core/data', 'finishResolution', _constants__WEBPACK_IMPORTED_MODULE_2__["REDUCER_KEY"], 'getRelationSchema', [modelName.toLowerCase(), relationName]);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}

/***/ }),

/***/ "./assets/src/data/eventespresso/schema/constants.js":
/*!***********************************************************!*\
  !*** ./assets/src/data/eventespresso/schema/constants.js ***!
  \***********************************************************/
/*! exports provided: REDUCER_KEY, JOIN_RELATION_TYPES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REDUCER_KEY", function() { return REDUCER_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JOIN_RELATION_TYPES", function() { return JOIN_RELATION_TYPES; });
/**
 * Identifier key for this store reducer.
 * @type {string}
 */
var REDUCER_KEY = 'eventespresso/schema';
var JOIN_RELATION_TYPES = ['EE_HABTM_Relation', 'EE_HABTM_Any_Relation'];

/***/ }),

/***/ "./assets/src/data/eventespresso/schema/index.js":
/*!*******************************************************!*\
  !*** ./assets/src/data/eventespresso/schema/index.js ***!
  \*******************************************************/
/*! exports provided: default, SCHEMA_KEY, hydrateRelationSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCHEMA_KEY", function() { return SCHEMA_KEY; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./assets/src/data/eventespresso/schema/constants.js");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectors */ "./assets/src/data/eventespresso/schema/selectors.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions */ "./assets/src/data/eventespresso/schema/actions.js");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resolvers */ "./assets/src/data/eventespresso/schema/resolvers.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./reducers */ "./assets/src/data/eventespresso/schema/reducers.js");
/* harmony import */ var _base_controls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../base-controls */ "./assets/src/data/eventespresso/base-controls.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./model */ "./assets/src/data/eventespresso/schema/model.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hydrateRelationSchema", function() { return _resolvers__WEBPACK_IMPORTED_MODULE_5__["hydrateRelationSchema"]; });



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */








/**
 * Creates specific model entity selectors (getFactoryForEvent etc)
 *
 * @type {Object<Function>}
 */

var entitySelectors = Object(_model__WEBPACK_IMPORTED_MODULE_8__["createEntitySelectors"])(_selectors__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Creates specific model entity resolvers (getFactoryForEvent etc)
 *
 * @type {Object<Function>}
 */

var entityResolvers = Object(_model__WEBPACK_IMPORTED_MODULE_8__["createEntityResolvers"])(_resolvers__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Registration of store for eventespresso/schema.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__["registerStore"])(_constants__WEBPACK_IMPORTED_MODULE_2__["REDUCER_KEY"], {
  reducer: _reducers__WEBPACK_IMPORTED_MODULE_6__["default"],
  actions: _actions__WEBPACK_IMPORTED_MODULE_4__,
  controls: _base_controls__WEBPACK_IMPORTED_MODULE_7__["default"],
  selectors: _objectSpread({}, _selectors__WEBPACK_IMPORTED_MODULE_3__, {}, entitySelectors),
  resolvers: _objectSpread({}, _resolvers__WEBPACK_IMPORTED_MODULE_5__, {}, entityResolvers)
}));
var SCHEMA_KEY = _constants__WEBPACK_IMPORTED_MODULE_2__["REDUCER_KEY"];


/***/ }),

/***/ "./assets/src/data/eventespresso/schema/model.js":
/*!*******************************************************!*\
  !*** ./assets/src/data/eventespresso/schema/model.js ***!
  \*******************************************************/
/*! exports provided: createEntitySelectors, createEntityResolvers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntitySelectors", function() { return createEntitySelectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntityResolvers", function() { return createEntityResolvers; });
/* harmony import */ var _eventespresso_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @eventespresso/model */ "@eventespresso/model");
/* harmony import */ var _eventespresso_model__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_model__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base-model */ "./assets/src/data/eventespresso/base-model.js");
/* harmony import */ var _base_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base-selectors */ "./assets/src/data/eventespresso/base-selectors.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./assets/src/data/eventespresso/schema/constants.js");
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */




/**
 * Creates selectors for each registered model name wrapping the generic source
 * selectors.
 *
 * @param {Object<function>} source
 * @return {Object<function>} All the generated selectors for each model.
 */

var createEntitySelectors = function createEntitySelectors(source) {
  return _eventespresso_model__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAMES"].reduce(function (selectors, modelName) {
    var schemaMethodName = Object(_base_model__WEBPACK_IMPORTED_MODULE_1__["getMethodName"])(modelName, 'schema', 'get');
    var factoryMethodName = Object(_base_model__WEBPACK_IMPORTED_MODULE_1__["getMethodName"])(modelName, 'factory', 'get');

    selectors[schemaMethodName] = function (state) {
      return source.getSchemaForModel(state, modelName);
    };

    selectors[Object(_base_model__WEBPACK_IMPORTED_MODULE_1__["getMethodName"])(modelName, 'schema', 'isRequesting')] = function () {
      return Object(_base_selectors__WEBPACK_IMPORTED_MODULE_2__["isResolving"])(_constants__WEBPACK_IMPORTED_MODULE_3__["REDUCER_KEY"], schemaMethodName);
    };

    selectors[factoryMethodName] = function (state) {
      return source.getFactoryForModel(state, modelName);
    };

    selectors[Object(_base_model__WEBPACK_IMPORTED_MODULE_1__["getMethodName"])(modelName, 'factory', 'isRequesting')] = function () {
      return Object(_base_selectors__WEBPACK_IMPORTED_MODULE_2__["isResolving"])(_constants__WEBPACK_IMPORTED_MODULE_3__["REDUCER_KEY"], factoryMethodName);
    };

    return selectors;
  }, {});
};
/**
 * Creates resolvers for each registered model name wrapping the generic source
 * resolvers.
 *
 * @param {Object<function>} source
 * @return {Object<function>} All the generated resolvers for each model.
 */

var createEntityResolvers = function createEntityResolvers(source) {
  return _eventespresso_model__WEBPACK_IMPORTED_MODULE_0__["MODEL_NAMES"].reduce(function (resolvers, modelName) {
    resolvers[Object(_base_model__WEBPACK_IMPORTED_MODULE_1__["getMethodName"])(modelName, 'schema', 'get')] = function () {
      return source.getSchemaForModel(modelName);
    };

    resolvers[Object(_base_model__WEBPACK_IMPORTED_MODULE_1__["getMethodName"])(modelName, 'factory', 'get')] = function () {
      return source.getFactoryForModel(modelName);
    };

    return resolvers;
  }, {});
};

/***/ }),

/***/ "./assets/src/data/eventespresso/schema/reducers.js":
/*!**********************************************************!*\
  !*** ./assets/src/data/eventespresso/schema/reducers.js ***!
  \**********************************************************/
/*! exports provided: receiveSchema, receiveFactory, receiveRelationEndpointForEntity, receiveRelationSchema, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveSchema", function() { return receiveSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveFactory", function() { return receiveFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveRelationEndpointForEntity", function() { return receiveRelationEndpointForEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveRelationSchema", function() { return receiveRelationSchema; });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/helpers */ "@eventespresso/helpers");
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/model */ "@eventespresso/model");
/* harmony import */ var _eventespresso_model__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.es.js");
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/is-shallow-equal */ "@wordpress/is-shallow-equal");
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./action-types */ "./assets/src/data/eventespresso/schema/action-types.js");
/**
 * External dependencies
 */






/**
 * Internal imports
 */

 // setup initial state objects

var DEFAULT_STATE_SCHEMA = Object(immutable__WEBPACK_IMPORTED_MODULE_4__["fromJS"])(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_SCHEMA_STATE"].schema);
var DEFAULT_STATE_FACTORY = Object(immutable__WEBPACK_IMPORTED_MODULE_4__["fromJS"])(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_SCHEMA_STATE"].factory);
var DEFAULT_STATE_ENDPOINTS = Object(immutable__WEBPACK_IMPORTED_MODULE_4__["fromJS"])(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_SCHEMA_STATE"].relationEndpoints);
var DEFAULT_STATE_RELATIONS = Object(immutable__WEBPACK_IMPORTED_MODULE_4__["fromJS"])(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_SCHEMA_STATE"].relationSchema);
/**
 * Reducer for a model schema.
 *
 * @param {Map} state
 * @param {Object} action
 * @return {Map} The new (or original) state.
 */

var receiveSchema = function receiveSchema() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE_SCHEMA;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  try {
    if (action.type === _action_types__WEBPACK_IMPORTED_MODULE_6__["ACTION_TYPES"].RECEIVE_SCHEMA_RECORD) {
      var modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(action.modelName);

      if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__["isSchemaResponseOfModel"])(action.schema, modelName)) {
        return state.set(modelName, action.schema);
      }
    }
  } catch (e) {
    return state;
  }

  return state;
};
/**
 * Reducer for a model factory
 *
 * @param {Map} state
 * @param {Object} action
 * @return {Map} the new (or original) state.
 */

var receiveFactory = function receiveFactory() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE_FACTORY;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  try {
    if (action.type === _action_types__WEBPACK_IMPORTED_MODULE_6__["ACTION_TYPES"].RECEIVE_FACTORY_FOR_MODEL) {
      var modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(action.modelName);

      if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_3__["isModelEntityFactoryOfModel"])(action.factory, modelName)) {
        return state.set(modelName, action.factory);
      }
    }
  } catch (e) {
    return state;
  }

  return state;
};
/**
 * Reducer for relation endpoints.
 *
 * @param {Map}state
 * @param {Object} action
 * @return {Map} New or original state.
 */

var receiveRelationEndpointForEntity = function receiveRelationEndpointForEntity() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE_ENDPOINTS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  try {
    if (action.type === _action_types__WEBPACK_IMPORTED_MODULE_6__["ACTION_TYPES"].RECEIVE_RELATION_ENDPOINT_FOR_MODEL_ENTITY) {
      var modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(action.modelName);
      var relationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(action.relationName);
      return state.setIn([modelName, Object(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_1__["normalizeEntityId"])(action.entityId), relationName], action.endpoint);
    }
  } catch (e) {
    return state;
  }

  return state;
};
/**
 * Reducer for relation schema
 *
 * @param {Map} state
 * @param {Object} action
 * @return {Map} New or original state
 */

var receiveRelationSchema = function receiveRelationSchema() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE_RELATIONS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === _action_types__WEBPACK_IMPORTED_MODULE_6__["ACTION_TYPES"].RECEIVE_RELATION_SCHEMA) {
    var modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(action.modelName);
    var relationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(action.relationName);

    if (_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_5___default()(state.getIn([modelName, relationName], {}), action.relationSchema)) {
      return state;
    }

    return state.setIn([modelName, relationName], action.relationSchema);
  }

  return state;
};
/**
 * Be aware that the root state is a plain object but each slice ('schema',
 * 'factory', 'relationEndpoints') is an immutable Map.
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  schema: receiveSchema,
  factory: receiveFactory,
  relationEndpoints: receiveRelationEndpointForEntity,
  relationSchema: receiveRelationSchema
}));

/***/ }),

/***/ "./assets/src/data/eventespresso/schema/resolvers.js":
/*!***********************************************************!*\
  !*** ./assets/src/data/eventespresso/schema/resolvers.js ***!
  \***********************************************************/
/*! exports provided: getSchemaForModel, getFactoryForModel, getRelationEndpointForEntityId, getRelationPrimaryKeyString, getRelationResponseType, hasJoinTableRelation, getRelationType, hydrateRelationSchema, getRelationSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSchemaForModel", function() { return getSchemaForModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFactoryForModel", function() { return getFactoryForModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRelationEndpointForEntityId", function() { return getRelationEndpointForEntityId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRelationPrimaryKeyString", function() { return getRelationPrimaryKeyString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRelationResponseType", function() { return getRelationResponseType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasJoinTableRelation", function() { return hasJoinTableRelation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRelationType", function() { return getRelationType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hydrateRelationSchema", function() { return hydrateRelationSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRelationSchema", function() { return getRelationSchema; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/model */ "@eventespresso/model");
/* harmony import */ var _eventespresso_model__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions */ "./assets/src/data/eventespresso/schema/actions.js");
/* harmony import */ var _base_controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../base-controls */ "./assets/src/data/eventespresso/base-controls.js");
/* harmony import */ var _core_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/constants */ "./assets/src/data/eventespresso/core/constants.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constants */ "./assets/src/data/eventespresso/schema/constants.js");


var _marked =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getSchemaForModel),
    _marked2 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getFactoryForModel),
    _marked3 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getRelationEndpointForEntityId),
    _marked4 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getRelationPrimaryKeyString),
    _marked5 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getRelationResponseType),
    _marked6 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(hasJoinTableRelation),
    _marked7 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getRelationType),
    _marked8 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(hydrateRelationSchema),
    _marked9 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getRelationSchema);

/**
 * External dependencies
 */



/**
 * Internal dependencies
 */





/**
 * A resolver for getting the schema for a given model name.
 *
 * @param {string} modelName
 * @return {Object} Retrieved schema.
 */

function getSchemaForModel(modelName) {
  var path, schema;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getSchemaForModel$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          path = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["getEndpoint"])(Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName));
          _context.next = 3;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_5__["fetch"])({
            path: path,
            method: 'OPTIONS'
          });

        case 3:
          schema = _context.sent;
          return _context.delegateYield(Object(_actions__WEBPACK_IMPORTED_MODULE_4__["receiveSchemaForModelAndResolve"])(modelName, schema), "t0", 5);

        case 5:
          return _context.abrupt("return", schema);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * A resolver for getting the model entity factory for a given model name.
 *
 * @param {string} modelName
 * @param {Object} schema
 * @return {Object|null} retrieved factory
 */

function getFactoryForModel(modelName) {
  var schema,
      factory,
      _args2 = arguments;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getFactoryForModel$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          schema = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};

          if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isSchemaResponseOfModel"])(schema, modelName)) {
            _context2.next = 7;
            break;
          }

          _context2.next = 4;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_5__["resolveSelect"])(_constants__WEBPACK_IMPORTED_MODULE_7__["REDUCER_KEY"], 'getSchemaForModel', modelName);

        case 4:
          schema = _context2.sent;

          if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isSchemaResponseOfModel"])(schema, modelName)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", null);

        case 7:
          factory = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["createEntityFactory"])(modelName, schema.schema, Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["MODEL_PREFIXES"])(modelName));
          return _context2.delegateYield(Object(_actions__WEBPACK_IMPORTED_MODULE_4__["receiveFactoryForModelAndResolve"])(modelName, factory), "t0", 9);

        case 9:
          return _context2.abrupt("return", factory);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
/**
 * A resolver for getting the relation endpoint for a given model, it's id, and
 * the requested relation.
 *
 * The EE REST api names relations according to whether they there are singular
 * or plural relations on a given model (eg. Registrations have one event
 * relation, but Events can have multiple datetimes).  This means the only way
 * to derive an accurate endpoint for a given relation request on an entity is
 * to retrieve the entity from the resource and derive the endpoint from the
 * links in the response.
 *
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {string} relationModelName
 * @return {IterableIterator<*>|string} A generator or the derived endpoint.
 */

function getRelationEndpointForEntityId(modelName, entityId, relationModelName) {
  var entity, pluralRelationName, endpoint, path, response, links, baseRelationPath;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getRelationEndpointForEntityId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_5__["resolveSelect"])(_core_constants__WEBPACK_IMPORTED_MODULE_6__["REDUCER_KEY"], 'getEntityById', modelName, entityId);

        case 2:
          entity = _context3.sent;
          relationModelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationModelName);
          pluralRelationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["pluralModelName"])(relationModelName);
          endpoint = '';

          if (!(Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_1__["isModelEntity"])(entity) && entity[pluralRelationName + 'Resource'])) {
            _context3.next = 10;
            break;
          }

          endpoint = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["stripBaseRouteFromUrl"])(entity[pluralRelationName + 'Resource'].resourceLink);
          _context3.next = 20;
          break;

        case 10:
          path = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["getEndpoint"])(modelName) + '/' + entityId;
          _context3.next = 13;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_5__["fetch"])({
            path: path
          });

        case 13:
          response = _context3.sent;

          if (response._links) {
            _context3.next = 16;
            break;
          }

          return _context3.abrupt("return", '');

        case 16:
          links = response._links || {};
          baseRelationPath = 'https://api.eventespresso.com/';
          endpoint = links[baseRelationPath + relationModelName] || '';
          endpoint = endpoint === '' && links[baseRelationPath + pluralRelationName] || endpoint;

        case 20:
          if (!endpoint) {
            _context3.next = 23;
            break;
          }

          _context3.next = 23;
          return Object(_actions__WEBPACK_IMPORTED_MODULE_4__["receiveRelationEndpointForModelEntity"])(modelName, entityId, relationModelName, endpoint);

        case 23:
          return _context3.abrupt("return", endpoint);

        case 24:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}
/**
 * A resolver for getting the primary key string to use in a query for the given
 * model and relation. This considers the join type for the relation.
 *
 * @see the `getRelationPrimaryKeyString` selector for example.
 *
 * @param {string} modelName
 * @param {string} relationName
 * @return {string} The primary key string to use or an empty string if relation
 * type could not be determined.
 */

function getRelationPrimaryKeyString(modelName, relationName) {
  var relationType, relationPrimaryKey;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getRelationPrimaryKeyString$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // normalize
          modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName);
          relationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationName);
          _context4.next = 4;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_5__["resolveSelect"])(_constants__WEBPACK_IMPORTED_MODULE_7__["REDUCER_KEY"], 'getRelationType', modelName, relationName);

        case 4:
          relationType = _context4.sent;

          if (!(relationType === '')) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", '');

        case 7:
          relationPrimaryKey = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["getPrimaryKey"])(relationName);
          return _context4.abrupt("return", relationType === 'EE_Belongs_To_Relation' ? relationPrimaryKey : "".concat(Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["modelNameForQueryString"])(relationName), ".").concat(relationPrimaryKey));

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}
/**
 * A resolver for returning what the expected response type is for the given
 * relation.
 *
 * @param {string} modelName  The model the relation is for.
 * @param {string} relationName The model name the relation is to.
 * @return {string} The type of the relation.
 */

function getRelationResponseType(modelName, relationName) {
  var relationSchema;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getRelationResponseType$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName);
          relationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationName);
          _context5.next = 4;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_5__["resolveSelect"])(_constants__WEBPACK_IMPORTED_MODULE_7__["REDUCER_KEY"], 'getRelationSchema', modelName, relationName);

        case 4:
          relationSchema = _context5.sent;
          return _context5.abrupt("return", relationSchema !== null ? relationSchema.type : '');

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}
/**
 * A resolver for returning whether the given modelName and relationName have
 * a join table for representing their relation.
 *
 * @param {string} modelName
 * @param {string} relationName
 * @return {boolean}  True means there is a join table, false means there isn't.
 */

function hasJoinTableRelation(modelName, relationName) {
  var relationType;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function hasJoinTableRelation$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName);
          relationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationName);
          _context6.next = 4;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_5__["resolveSelect"])(_constants__WEBPACK_IMPORTED_MODULE_7__["REDUCER_KEY"], 'getRelationType', modelName, relationName);

        case 4:
          relationType = _context6.sent;
          return _context6.abrupt("return", _constants__WEBPACK_IMPORTED_MODULE_7__["JOIN_RELATION_TYPES"].indexOf(relationType) > -1);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}
/**
 * A resolver for getting the relation type describing the relation between
 * modelName and relationName
 *
 * @param {string} modelName
 * @param {string} relationName
 * @return {string}  The relation type to describe the relation
 */

function getRelationType(modelName, relationName) {
  var relationSchema;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getRelationType$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName);
          relationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationName);
          _context7.next = 4;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_5__["resolveSelect"])(_constants__WEBPACK_IMPORTED_MODULE_7__["REDUCER_KEY"], 'getRelationSchema', modelName, relationName);

        case 4:
          relationSchema = _context7.sent;
          return _context7.abrupt("return", relationSchema !== null ? relationSchema.relation_type : '');

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7);
}
/**
 * A resolver for retrieving the relation schema from the server for the given
 * modelName and relationName.
 *
 * @param {Object} schema
 * @param {string} modelName
 * @param {string} relationName
 * @throws Error
 */

function hydrateRelationSchema(schema, modelName, relationName) {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function hydrateRelationSchema$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName);
          relationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationName);
          _context8.next = 4;
          return Object(_actions__WEBPACK_IMPORTED_MODULE_4__["receiveRelationSchemaAndResolve"])(modelName, relationName, schema);

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8);
}
/**
 * A resolver for retrieving the relation schema from the server for the given
 * modelName and relationName.
 *
 * @param {string} modelName
 * @param {string} relationName
 * @throws Error
 */

function getRelationSchema(modelName, relationName) {
  var schema, pluralRelationName, typeSchema;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getRelationSchema$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName);
          _context9.next = 3;
          return Object(_base_controls__WEBPACK_IMPORTED_MODULE_5__["resolveSelect"])(_constants__WEBPACK_IMPORTED_MODULE_7__["REDUCER_KEY"], 'getSchemaForModel', modelName);

        case 3:
          schema = _context9.sent;

          if (!(schema === null)) {
            _context9.next = 6;
            break;
          }

          throw new Error('The ' + modelName + ' does not have a schema');

        case 6:
          relationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationName);
          pluralRelationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["pluralModelName"])(relationName); // is there a schema for plural relation name?

          typeSchema = schema.hasOwnProperty('schema') && schema.schema.hasOwnProperty('properties') ? schema.schema.properties[pluralRelationName] : null;
          typeSchema = typeSchema === null && !Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isUndefined"])(schema.schema.properties[relationName]) ? schema.schema.properties[relationName] : typeSchema;

          if (!(typeSchema === null)) {
            _context9.next = 12;
            break;
          }

          throw new Error('There is no relation for ' + relationName + ' on the ' + 'model ' + modelName);

        case 12:
          _context9.next = 14;
          return Object(_actions__WEBPACK_IMPORTED_MODULE_4__["receiveRelationSchema"])(modelName, relationName, typeSchema);

        case 14:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9);
}

/***/ }),

/***/ "./assets/src/data/eventespresso/schema/selectors.js":
/*!***********************************************************!*\
  !*** ./assets/src/data/eventespresso/schema/selectors.js ***!
  \***********************************************************/
/*! exports provided: getSchemaForModel, isRequestingSchemaForModel, hasResolvedSchemaForModel, getFactoryForModel, isRequestingFactoryForModel, hasResolvedFactoryForModel, getRelationEndpointForEntityId, isRequestingRelationEndpointForEntityId, getRelationPrimaryKeyString, getRelationResponseType, hasJoinTableRelation, getRelationType, getRelationSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSchemaForModel", function() { return getSchemaForModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRequestingSchemaForModel", function() { return isRequestingSchemaForModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasResolvedSchemaForModel", function() { return hasResolvedSchemaForModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFactoryForModel", function() { return getFactoryForModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRequestingFactoryForModel", function() { return isRequestingFactoryForModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasResolvedFactoryForModel", function() { return hasResolvedFactoryForModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRelationEndpointForEntityId", function() { return getRelationEndpointForEntityId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRequestingRelationEndpointForEntityId", function() { return isRequestingRelationEndpointForEntityId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRelationPrimaryKeyString", function() { return getRelationPrimaryKeyString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRelationResponseType", function() { return getRelationResponseType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasJoinTableRelation", function() { return hasJoinTableRelation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRelationType", function() { return getRelationType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRelationSchema", function() { return getRelationSchema; });
/* harmony import */ var _base_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base-selectors */ "./assets/src/data/eventespresso/base-selectors.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./assets/src/data/eventespresso/schema/constants.js");
/* harmony import */ var _eventespresso_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/model */ "@eventespresso/model");
/* harmony import */ var _eventespresso_model__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @eventespresso/helpers */ "@eventespresso/helpers");
/* harmony import */ var _eventespresso_helpers__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.es.js");
/* harmony import */ var rememo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rememo */ "./node_modules/rememo/es/rememo.js");
/**
 * Internal dependencies
 */


/**
 * External imports
 */





/**
 * Selector for returning the schema object for a given model name from the
 * state.
 * @param {Object} state
 * @param {string} modelName
 * @return {Object} The schema object or null if it doesn't exist.
 */

function getSchemaForModel(state, modelName) {
  return state.schema.get(Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName), null);
}
/**
 * Selector for returning whether the schema is being requested or not for the
 * given model name.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {boolean}  True means its being requested.
 */

function isRequestingSchemaForModel(state, modelName) {
  return Object(_base_selectors__WEBPACK_IMPORTED_MODULE_0__["isResolving"])(_constants__WEBPACK_IMPORTED_MODULE_1__["REDUCER_KEY"], 'getSchemaForModel', Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName));
}
/**
 * Selector for returning whether the schema has been resolved or not for the
 * given model name.
 * @param {Object} state
 * @param {string} modelName
 * @return {boolean} True means that the schema has finished resolving for this
 * model name.
 */

function hasResolvedSchemaForModel(state, modelName) {
  return Object(_base_selectors__WEBPACK_IMPORTED_MODULE_0__["hasFinishedResolving"])(_constants__WEBPACK_IMPORTED_MODULE_1__["REDUCER_KEY"], 'getSchemaForModel', Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName));
}
/**
 * Selector for returning the model entity factory object for a given
 * model name from the state.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {Object} Returns the model entity factory or null if it doesn't
 * exist.
 */

function getFactoryForModel(state, modelName) {
  var factory = state.factory.get(Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName), null);
  return !(factory instanceof immutable__WEBPACK_IMPORTED_MODULE_4__["Map"]) ? factory : null;
}
/**
 * Selector for returning whether the model entity factory is being requested
 * or not for the given model name from the state.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {boolean}  True means it is being requested.
 */

function isRequestingFactoryForModel(state, modelName) {
  return Object(_base_selectors__WEBPACK_IMPORTED_MODULE_0__["isResolving"])(_constants__WEBPACK_IMPORTED_MODULE_1__["REDUCER_KEY"], 'getFactoryForModel', Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName));
}
/**
 * Selector for returning whether the factory has been resolved or not for the
 * given model name.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {boolean} True means that the factory has finished resolving for this
 * model name.
 */

function hasResolvedFactoryForModel(state, modelName) {
  return Object(_base_selectors__WEBPACK_IMPORTED_MODULE_0__["hasFinishedResolving"])(_constants__WEBPACK_IMPORTED_MODULE_1__["REDUCER_KEY"], 'getFactoryForModel', Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName));
}
/**
 * Return the relation endpoint for the given model, entity id and relation.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {number|string} entityId
 * @param {string} relationModelName
 * @return {string} Returns the relation endpoint if available or an empty
 * string.
 */

function getRelationEndpointForEntityId(state, modelName, entityId, relationModelName) {
  modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName);
  relationModelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationModelName);
  entityId = Object(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_3__["normalizeEntityId"])(entityId);
  return state.relationEndpoints.getIn([modelName, entityId, relationModelName]) || '';
}
/**
 * Selector for returning whether the relation endpoint is being requested
 * or not for the given model name, entity id, and relation from the state.
 * @param {Object} state
 * @param {string} modelName
 * @param {number|string} entityId
 * @param {string} relationModelName
 * @return {boolean}  True means it is being requested.
 */

function isRequestingRelationEndpointForEntityId(state, modelName, entityId, relationModelName) {
  modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName);
  entityId = Object(_eventespresso_helpers__WEBPACK_IMPORTED_MODULE_3__["normalizeEntityId"])(entityId);
  relationModelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationModelName);
  return Object(_base_selectors__WEBPACK_IMPORTED_MODULE_0__["isResolving"])(_constants__WEBPACK_IMPORTED_MODULE_1__["REDUCER_KEY"], 'getRelationEndpointForEntityId', modelName, entityId, relationModelName);
}
/**
 * Selector for returning the primary key string to use in a query for the given
 * model and relation.  This considers the join type for the relation.
 *
 * For example:  If you were doing a query to get the registrations related to an
 * attendee, you would need the string to use for the `REG_ID` primary key in
 * the query.  Since the join type for registrations to attendees is
 * EE_Has_Many_Relation, then the query string would need to be
 * `Registration.REG_ID`.  If however you were getting the attendee related
 * to a registration, then the join type for attendees on registrations is
 * EE_Belongs_To_Relation, in which case the attendee primary key would be
 * `ATT_ID` (the registration table has the foreign key on it).
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {string} relationName
 *
 * @return {string} The primary key string to use or an empty string if relation
 * type could not be determined.
 */

var getRelationPrimaryKeyString = Object(rememo__WEBPACK_IMPORTED_MODULE_5__["default"])(function (state, modelName, relationName) {
  modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName);
  relationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationName);
  var relationType = getRelationType(state, modelName, relationName);

  if (relationType === '') {
    return '';
  }

  var relationPrimaryKey = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["getPrimaryKey"])(relationName);
  return relationType === 'EE_Belongs_To_Relation' ? relationPrimaryKey : "".concat(Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["modelNameForQueryString"])(relationName), ".").concat(relationPrimaryKey);
}, function (state, modelName, relationName) {
  modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName);
  relationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationName);
  return [state.relationSchema.getIn([modelName, relationName], '')];
});
/**
 * Selector returning the relation response type for the given relation.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {string} relationName
 * @return {string} The type for the relation returned for the given model and
 * relation.
 */

var getRelationResponseType = function getRelationResponseType(state, modelName, relationName) {
  modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName);
  relationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationName);
  var relationSchema = getRelationSchema(state, modelName, relationName);
  return relationSchema !== null ? relationSchema.type : '';
};
/**
 * Selector returning whether the relation between the given model name and
 * relation name has a join table.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {string} relationName
 * @return {boolean} True means there is a join table, false means there isn't.
 */

var hasJoinTableRelation = function hasJoinTableRelation(state, modelName, relationName) {
  modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName);
  relationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationName);
  var relationType = getRelationType(state, modelName, relationName);
  return _constants__WEBPACK_IMPORTED_MODULE_1__["JOIN_RELATION_TYPES"].indexOf(relationType) > -1;
};
/**
 * Selector returning the relation type describing the relation between the
 * given model name and relation name.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {string} relationName
 * @return {string}  The relation type (eg. "EE_HABTM_Relation")
 */

var getRelationType = function getRelationType(state, modelName, relationName) {
  modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName);
  relationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationName);
  var relationSchema = getRelationSchema(state, modelName, relationName);
  return relationSchema !== null ? relationSchema.relation_type : '';
};
/**
 * Selector returning the relation schema describing the relation between the
 * given model name and relation name.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {string} relationName
 * @return {Object|null} An object or null if there is no relation schema.
 */

var getRelationSchema = function getRelationSchema(state, modelName, relationName) {
  modelName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName);
  relationName = Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(relationName);
  return state.relationSchema.getIn([modelName, relationName], null);
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

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

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

/***/ "./node_modules/immutable/dist/immutable.es.js":
/*!*****************************************************!*\
  !*** ./node_modules/immutable/dist/immutable.es.js ***!
  \*****************************************************/
/*! exports provided: default, version, Collection, Iterable, Seq, Map, OrderedMap, List, Stack, Set, OrderedSet, Record, Range, Repeat, is, fromJS, hash, isImmutable, isCollection, isKeyed, isIndexed, isAssociative, isOrdered, isValueObject, get, getIn, has, hasIn, merge, mergeDeep, mergeWith, mergeDeepWith, remove, removeIn, set, setIn, update, updateIn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collection", function() { return Collection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Iterable", function() { return Iterable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Seq", function() { return Seq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return Map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderedMap", function() { return OrderedMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "List", function() { return List; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stack", function() { return Stack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Set", function() { return Set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderedSet", function() { return OrderedSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Record", function() { return Record; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Repeat", function() { return Repeat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromJS", function() { return fromJS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hash", function() { return hash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isImmutable", function() { return isImmutable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCollection", function() { return isCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKeyed", function() { return isKeyed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIndexed", function() { return isIndexed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAssociative", function() { return isAssociative; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOrdered", function() { return isOrdered; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValueObject", function() { return isValueObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIn", function() { return getIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has", function() { return has; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasIn", function() { return hasIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeDeep", function() { return mergeDeep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeWith", function() { return mergeWith$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeDeepWith", function() { return mergeDeepWith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeIn", function() { return removeIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setIn", function() { return setIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateIn", function() { return updateIn; });
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Used for setting prototype methods that IE8 chokes on.
var DELETE = 'delete';

// Constants describing the size of trie nodes.
var SHIFT = 5; // Resulted in best performance after ______?
var SIZE = 1 << SHIFT;
var MASK = SIZE - 1;

// A consistent shared value representing "not set" which equals nothing other
// than itself, and nothing that could be provided externally.
var NOT_SET = {};

// Boolean references, Rough equivalent of `bool &`.
function MakeRef() {
  return { value: false };
}

function SetRef(ref) {
  if (ref) {
    ref.value = true;
  }
}

// A function which returns a value representing an "owner" for transient writes
// to tries. The return value will only ever equal itself, and will not equal
// the return of any subsequent call of this function.
function OwnerID() {}

function ensureSize(iter) {
  if (iter.size === undefined) {
    iter.size = iter.__iterate(returnTrue);
  }
  return iter.size;
}

function wrapIndex(iter, index) {
  // This implements "is array index" which the ECMAString spec defines as:
  //
  //     A String property name P is an array index if and only if
  //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
  //     to 2^32−1.
  //
  // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
  if (typeof index !== 'number') {
    var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
    if ('' + uint32Index !== index || uint32Index === 4294967295) {
      return NaN;
    }
    index = uint32Index;
  }
  return index < 0 ? ensureSize(iter) + index : index;
}

function returnTrue() {
  return true;
}

function wholeSlice(begin, end, size) {
  return (
    ((begin === 0 && !isNeg(begin)) ||
      (size !== undefined && begin <= -size)) &&
    (end === undefined || (size !== undefined && end >= size))
  );
}

function resolveBegin(begin, size) {
  return resolveIndex(begin, size, 0);
}

function resolveEnd(end, size) {
  return resolveIndex(end, size, size);
}

function resolveIndex(index, size, defaultIndex) {
  // Sanitize indices using this shorthand for ToInt32(argument)
  // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
  return index === undefined
    ? defaultIndex
    : isNeg(index)
      ? size === Infinity
        ? size
        : Math.max(0, size + index) | 0
      : size === undefined || size === index
        ? index
        : Math.min(size, index) | 0;
}

function isNeg(value) {
  // Account for -0 which is negative, but not less than 0.
  return value < 0 || (value === 0 && 1 / value === -Infinity);
}

// Note: value is unchanged to not break immutable-devtools.
var IS_COLLECTION_SYMBOL = '@@__IMMUTABLE_ITERABLE__@@';

function isCollection(maybeCollection) {
  return Boolean(maybeCollection && maybeCollection[IS_COLLECTION_SYMBOL]);
}

var IS_KEYED_SYMBOL = '@@__IMMUTABLE_KEYED__@@';

function isKeyed(maybeKeyed) {
  return Boolean(maybeKeyed && maybeKeyed[IS_KEYED_SYMBOL]);
}

var IS_INDEXED_SYMBOL = '@@__IMMUTABLE_INDEXED__@@';

function isIndexed(maybeIndexed) {
  return Boolean(maybeIndexed && maybeIndexed[IS_INDEXED_SYMBOL]);
}

function isAssociative(maybeAssociative) {
  return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
}

var Collection = function Collection(value) {
  return isCollection(value) ? value : Seq(value);
};

var KeyedCollection = /*@__PURE__*/(function (Collection) {
  function KeyedCollection(value) {
    return isKeyed(value) ? value : KeyedSeq(value);
  }

  if ( Collection ) KeyedCollection.__proto__ = Collection;
  KeyedCollection.prototype = Object.create( Collection && Collection.prototype );
  KeyedCollection.prototype.constructor = KeyedCollection;

  return KeyedCollection;
}(Collection));

var IndexedCollection = /*@__PURE__*/(function (Collection) {
  function IndexedCollection(value) {
    return isIndexed(value) ? value : IndexedSeq(value);
  }

  if ( Collection ) IndexedCollection.__proto__ = Collection;
  IndexedCollection.prototype = Object.create( Collection && Collection.prototype );
  IndexedCollection.prototype.constructor = IndexedCollection;

  return IndexedCollection;
}(Collection));

var SetCollection = /*@__PURE__*/(function (Collection) {
  function SetCollection(value) {
    return isCollection(value) && !isAssociative(value) ? value : SetSeq(value);
  }

  if ( Collection ) SetCollection.__proto__ = Collection;
  SetCollection.prototype = Object.create( Collection && Collection.prototype );
  SetCollection.prototype.constructor = SetCollection;

  return SetCollection;
}(Collection));

Collection.Keyed = KeyedCollection;
Collection.Indexed = IndexedCollection;
Collection.Set = SetCollection;

var IS_SEQ_SYMBOL = '@@__IMMUTABLE_SEQ__@@';

function isSeq(maybeSeq) {
  return Boolean(maybeSeq && maybeSeq[IS_SEQ_SYMBOL]);
}

var IS_RECORD_SYMBOL = '@@__IMMUTABLE_RECORD__@@';

function isRecord(maybeRecord) {
  return Boolean(maybeRecord && maybeRecord[IS_RECORD_SYMBOL]);
}

function isImmutable(maybeImmutable) {
  return isCollection(maybeImmutable) || isRecord(maybeImmutable);
}

var IS_ORDERED_SYMBOL = '@@__IMMUTABLE_ORDERED__@@';

function isOrdered(maybeOrdered) {
  return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
}

var ITERATE_KEYS = 0;
var ITERATE_VALUES = 1;
var ITERATE_ENTRIES = 2;

var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;

var Iterator = function Iterator(next) {
  this.next = next;
};

Iterator.prototype.toString = function toString () {
  return '[Iterator]';
};

Iterator.KEYS = ITERATE_KEYS;
Iterator.VALUES = ITERATE_VALUES;
Iterator.ENTRIES = ITERATE_ENTRIES;

Iterator.prototype.inspect = Iterator.prototype.toSource = function() {
  return this.toString();
};
Iterator.prototype[ITERATOR_SYMBOL] = function() {
  return this;
};

function iteratorValue(type, k, v, iteratorResult) {
  var value = type === 0 ? k : type === 1 ? v : [k, v];
  iteratorResult
    ? (iteratorResult.value = value)
    : (iteratorResult = {
        value: value,
        done: false,
      });
  return iteratorResult;
}

function iteratorDone() {
  return { value: undefined, done: true };
}

function hasIterator(maybeIterable) {
  return !!getIteratorFn(maybeIterable);
}

function isIterator(maybeIterator) {
  return maybeIterator && typeof maybeIterator.next === 'function';
}

function getIterator(iterable) {
  var iteratorFn = getIteratorFn(iterable);
  return iteratorFn && iteratorFn.call(iterable);
}

function getIteratorFn(iterable) {
  var iteratorFn =
    iterable &&
    ((REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
      iterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

function isArrayLike(value) {
  if (Array.isArray(value) || typeof value === 'string') {
    return true;
  }

  return (
    value &&
    typeof value === 'object' &&
    Number.isInteger(value.length) &&
    value.length >= 0 &&
    (value.length === 0
      ? // Only {length: 0} is considered Array-like.
        Object.keys(value).length === 1
      : // An object is only Array-like if it has a property where the last value
        // in the array-like may be found (which could be undefined).
        value.hasOwnProperty(value.length - 1))
  );
}

var Seq = /*@__PURE__*/(function (Collection$$1) {
  function Seq(value) {
    return value === null || value === undefined
      ? emptySequence()
      : isImmutable(value)
        ? value.toSeq()
        : seqFromValue(value);
  }

  if ( Collection$$1 ) Seq.__proto__ = Collection$$1;
  Seq.prototype = Object.create( Collection$$1 && Collection$$1.prototype );
  Seq.prototype.constructor = Seq;

  Seq.prototype.toSeq = function toSeq () {
    return this;
  };

  Seq.prototype.toString = function toString () {
    return this.__toString('Seq {', '}');
  };

  Seq.prototype.cacheResult = function cacheResult () {
    if (!this._cache && this.__iterateUncached) {
      this._cache = this.entrySeq().toArray();
      this.size = this._cache.length;
    }
    return this;
  };

  // abstract __iterateUncached(fn, reverse)

  Seq.prototype.__iterate = function __iterate (fn, reverse) {
    var cache = this._cache;
    if (cache) {
      var size = cache.length;
      var i = 0;
      while (i !== size) {
        var entry = cache[reverse ? size - ++i : i++];
        if (fn(entry[1], entry[0], this) === false) {
          break;
        }
      }
      return i;
    }
    return this.__iterateUncached(fn, reverse);
  };

  // abstract __iteratorUncached(type, reverse)

  Seq.prototype.__iterator = function __iterator (type, reverse) {
    var cache = this._cache;
    if (cache) {
      var size = cache.length;
      var i = 0;
      return new Iterator(function () {
        if (i === size) {
          return iteratorDone();
        }
        var entry = cache[reverse ? size - ++i : i++];
        return iteratorValue(type, entry[0], entry[1]);
      });
    }
    return this.__iteratorUncached(type, reverse);
  };

  return Seq;
}(Collection));

var KeyedSeq = /*@__PURE__*/(function (Seq) {
  function KeyedSeq(value) {
    return value === null || value === undefined
      ? emptySequence().toKeyedSeq()
      : isCollection(value)
        ? isKeyed(value)
          ? value.toSeq()
          : value.fromEntrySeq()
        : isRecord(value)
          ? value.toSeq()
          : keyedSeqFromValue(value);
  }

  if ( Seq ) KeyedSeq.__proto__ = Seq;
  KeyedSeq.prototype = Object.create( Seq && Seq.prototype );
  KeyedSeq.prototype.constructor = KeyedSeq;

  KeyedSeq.prototype.toKeyedSeq = function toKeyedSeq () {
    return this;
  };

  return KeyedSeq;
}(Seq));

var IndexedSeq = /*@__PURE__*/(function (Seq) {
  function IndexedSeq(value) {
    return value === null || value === undefined
      ? emptySequence()
      : isCollection(value)
        ? isKeyed(value)
          ? value.entrySeq()
          : value.toIndexedSeq()
        : isRecord(value)
          ? value.toSeq().entrySeq()
          : indexedSeqFromValue(value);
  }

  if ( Seq ) IndexedSeq.__proto__ = Seq;
  IndexedSeq.prototype = Object.create( Seq && Seq.prototype );
  IndexedSeq.prototype.constructor = IndexedSeq;

  IndexedSeq.of = function of (/*...values*/) {
    return IndexedSeq(arguments);
  };

  IndexedSeq.prototype.toIndexedSeq = function toIndexedSeq () {
    return this;
  };

  IndexedSeq.prototype.toString = function toString () {
    return this.__toString('Seq [', ']');
  };

  return IndexedSeq;
}(Seq));

var SetSeq = /*@__PURE__*/(function (Seq) {
  function SetSeq(value) {
    return (isCollection(value) && !isAssociative(value)
      ? value
      : IndexedSeq(value)
    ).toSetSeq();
  }

  if ( Seq ) SetSeq.__proto__ = Seq;
  SetSeq.prototype = Object.create( Seq && Seq.prototype );
  SetSeq.prototype.constructor = SetSeq;

  SetSeq.of = function of (/*...values*/) {
    return SetSeq(arguments);
  };

  SetSeq.prototype.toSetSeq = function toSetSeq () {
    return this;
  };

  return SetSeq;
}(Seq));

Seq.isSeq = isSeq;
Seq.Keyed = KeyedSeq;
Seq.Set = SetSeq;
Seq.Indexed = IndexedSeq;

Seq.prototype[IS_SEQ_SYMBOL] = true;

// #pragma Root Sequences

var ArraySeq = /*@__PURE__*/(function (IndexedSeq) {
  function ArraySeq(array) {
    this._array = array;
    this.size = array.length;
  }

  if ( IndexedSeq ) ArraySeq.__proto__ = IndexedSeq;
  ArraySeq.prototype = Object.create( IndexedSeq && IndexedSeq.prototype );
  ArraySeq.prototype.constructor = ArraySeq;

  ArraySeq.prototype.get = function get (index, notSetValue) {
    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
  };

  ArraySeq.prototype.__iterate = function __iterate (fn, reverse) {
    var array = this._array;
    var size = array.length;
    var i = 0;
    while (i !== size) {
      var ii = reverse ? size - ++i : i++;
      if (fn(array[ii], ii, this) === false) {
        break;
      }
    }
    return i;
  };

  ArraySeq.prototype.__iterator = function __iterator (type, reverse) {
    var array = this._array;
    var size = array.length;
    var i = 0;
    return new Iterator(function () {
      if (i === size) {
        return iteratorDone();
      }
      var ii = reverse ? size - ++i : i++;
      return iteratorValue(type, ii, array[ii]);
    });
  };

  return ArraySeq;
}(IndexedSeq));

var ObjectSeq = /*@__PURE__*/(function (KeyedSeq) {
  function ObjectSeq(object) {
    var keys = Object.keys(object);
    this._object = object;
    this._keys = keys;
    this.size = keys.length;
  }

  if ( KeyedSeq ) ObjectSeq.__proto__ = KeyedSeq;
  ObjectSeq.prototype = Object.create( KeyedSeq && KeyedSeq.prototype );
  ObjectSeq.prototype.constructor = ObjectSeq;

  ObjectSeq.prototype.get = function get (key, notSetValue) {
    if (notSetValue !== undefined && !this.has(key)) {
      return notSetValue;
    }
    return this._object[key];
  };

  ObjectSeq.prototype.has = function has (key) {
    return hasOwnProperty.call(this._object, key);
  };

  ObjectSeq.prototype.__iterate = function __iterate (fn, reverse) {
    var object = this._object;
    var keys = this._keys;
    var size = keys.length;
    var i = 0;
    while (i !== size) {
      var key = keys[reverse ? size - ++i : i++];
      if (fn(object[key], key, this) === false) {
        break;
      }
    }
    return i;
  };

  ObjectSeq.prototype.__iterator = function __iterator (type, reverse) {
    var object = this._object;
    var keys = this._keys;
    var size = keys.length;
    var i = 0;
    return new Iterator(function () {
      if (i === size) {
        return iteratorDone();
      }
      var key = keys[reverse ? size - ++i : i++];
      return iteratorValue(type, key, object[key]);
    });
  };

  return ObjectSeq;
}(KeyedSeq));
ObjectSeq.prototype[IS_ORDERED_SYMBOL] = true;

var CollectionSeq = /*@__PURE__*/(function (IndexedSeq) {
  function CollectionSeq(collection) {
    this._collection = collection;
    this.size = collection.length || collection.size;
  }

  if ( IndexedSeq ) CollectionSeq.__proto__ = IndexedSeq;
  CollectionSeq.prototype = Object.create( IndexedSeq && IndexedSeq.prototype );
  CollectionSeq.prototype.constructor = CollectionSeq;

  CollectionSeq.prototype.__iterateUncached = function __iterateUncached (fn, reverse) {
    if (reverse) {
      return this.cacheResult().__iterate(fn, reverse);
    }
    var collection = this._collection;
    var iterator = getIterator(collection);
    var iterations = 0;
    if (isIterator(iterator)) {
      var step;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
    }
    return iterations;
  };

  CollectionSeq.prototype.__iteratorUncached = function __iteratorUncached (type, reverse) {
    if (reverse) {
      return this.cacheResult().__iterator(type, reverse);
    }
    var collection = this._collection;
    var iterator = getIterator(collection);
    if (!isIterator(iterator)) {
      return new Iterator(iteratorDone);
    }
    var iterations = 0;
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, iterations++, step.value);
    });
  };

  return CollectionSeq;
}(IndexedSeq));

// # pragma Helper functions

var EMPTY_SEQ;

function emptySequence() {
  return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
}

function keyedSeqFromValue(value) {
  var seq = Array.isArray(value)
    ? new ArraySeq(value)
    : hasIterator(value)
      ? new CollectionSeq(value)
      : undefined;
  if (seq) {
    return seq.fromEntrySeq();
  }
  if (typeof value === 'object') {
    return new ObjectSeq(value);
  }
  throw new TypeError(
    'Expected Array or collection object of [k, v] entries, or keyed object: ' +
      value
  );
}

function indexedSeqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return seq;
  }
  throw new TypeError(
    'Expected Array or collection object of values: ' + value
  );
}

function seqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return seq;
  }
  if (typeof value === 'object') {
    return new ObjectSeq(value);
  }
  throw new TypeError(
    'Expected Array or collection object of values, or keyed object: ' + value
  );
}

function maybeIndexedSeqFromValue(value) {
  return isArrayLike(value)
    ? new ArraySeq(value)
    : hasIterator(value)
      ? new CollectionSeq(value)
      : undefined;
}

var IS_MAP_SYMBOL = '@@__IMMUTABLE_MAP__@@';

function isMap(maybeMap) {
  return Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);
}

function isOrderedMap(maybeOrderedMap) {
  return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
}

function isValueObject(maybeValue) {
  return Boolean(
    maybeValue &&
      typeof maybeValue.equals === 'function' &&
      typeof maybeValue.hashCode === 'function'
  );
}

/**
 * An extension of the "same-value" algorithm as [described for use by ES6 Map
 * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
 *
 * NaN is considered the same as NaN, however -0 and 0 are considered the same
 * value, which is different from the algorithm described by
 * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
 *
 * This is extended further to allow Objects to describe the values they
 * represent, by way of `valueOf` or `equals` (and `hashCode`).
 *
 * Note: because of this extension, the key equality of Immutable.Map and the
 * value equality of Immutable.Set will differ from ES6 Map and Set.
 *
 * ### Defining custom values
 *
 * The easiest way to describe the value an object represents is by implementing
 * `valueOf`. For example, `Date` represents a value by returning a unix
 * timestamp for `valueOf`:
 *
 *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
 *     var date2 = new Date(1234567890000);
 *     date1.valueOf(); // 1234567890000
 *     assert( date1 !== date2 );
 *     assert( Immutable.is( date1, date2 ) );
 *
 * Note: overriding `valueOf` may have other implications if you use this object
 * where JavaScript expects a primitive, such as implicit string coercion.
 *
 * For more complex types, especially collections, implementing `valueOf` may
 * not be performant. An alternative is to implement `equals` and `hashCode`.
 *
 * `equals` takes another object, presumably of similar type, and returns true
 * if it is equal. Equality is symmetrical, so the same result should be
 * returned if this and the argument are flipped.
 *
 *     assert( a.equals(b) === b.equals(a) );
 *
 * `hashCode` returns a 32bit integer number representing the object which will
 * be used to determine how to store the value object in a Map or Set. You must
 * provide both or neither methods, one must not exist without the other.
 *
 * Also, an important relationship between these methods must be upheld: if two
 * values are equal, they *must* return the same hashCode. If the values are not
 * equal, they might have the same hashCode; this is called a hash collision,
 * and while undesirable for performance reasons, it is acceptable.
 *
 *     if (a.equals(b)) {
 *       assert( a.hashCode() === b.hashCode() );
 *     }
 *
 * All Immutable collections are Value Objects: they implement `equals()`
 * and `hashCode()`.
 */
function is(valueA, valueB) {
  if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
    return true;
  }
  if (!valueA || !valueB) {
    return false;
  }
  if (
    typeof valueA.valueOf === 'function' &&
    typeof valueB.valueOf === 'function'
  ) {
    valueA = valueA.valueOf();
    valueB = valueB.valueOf();
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
  }
  return !!(
    isValueObject(valueA) &&
    isValueObject(valueB) &&
    valueA.equals(valueB)
  );
}

var imul =
  typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2
    ? Math.imul
    : function imul(a, b) {
        a |= 0; // int
        b |= 0; // int
        var c = a & 0xffff;
        var d = b & 0xffff;
        // Shift by 0 fixes the sign on the high part.
        return (c * d + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0)) | 0; // int
      };

// v8 has an optimization for storing 31-bit signed numbers.
// Values which have either 00 or 11 as the high order bits qualify.
// This function drops the highest order bit in a signed number, maintaining
// the sign bit.
function smi(i32) {
  return ((i32 >>> 1) & 0x40000000) | (i32 & 0xbfffffff);
}

var defaultValueOf = Object.prototype.valueOf;

function hash(o) {
  switch (typeof o) {
    case 'boolean':
      // The hash values for built-in constants are a 1 value for each 5-byte
      // shift region expect for the first, which encodes the value. This
      // reduces the odds of a hash collision for these common values.
      return o ? 0x42108421 : 0x42108420;
    case 'number':
      return hashNumber(o);
    case 'string':
      return o.length > STRING_HASH_CACHE_MIN_STRLEN
        ? cachedHashString(o)
        : hashString(o);
    case 'object':
    case 'function':
      if (o === null) {
        return 0x42108422;
      }
      if (typeof o.hashCode === 'function') {
        // Drop any high bits from accidentally long hash codes.
        return smi(o.hashCode(o));
      }
      if (o.valueOf !== defaultValueOf && typeof o.valueOf === 'function') {
        o = o.valueOf(o);
      }
      return hashJSObj(o);
    case 'undefined':
      return 0x42108423;
    default:
      if (typeof o.toString === 'function') {
        return hashString(o.toString());
      }
      throw new Error('Value type ' + typeof o + ' cannot be hashed.');
  }
}

// Compress arbitrarily large numbers into smi hashes.
function hashNumber(n) {
  if (n !== n || n === Infinity) {
    return 0;
  }
  var hash = n | 0;
  if (hash !== n) {
    hash ^= n * 0xffffffff;
  }
  while (n > 0xffffffff) {
    n /= 0xffffffff;
    hash ^= n;
  }
  return smi(hash);
}

function cachedHashString(string) {
  var hashed = stringHashCache[string];
  if (hashed === undefined) {
    hashed = hashString(string);
    if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
      STRING_HASH_CACHE_SIZE = 0;
      stringHashCache = {};
    }
    STRING_HASH_CACHE_SIZE++;
    stringHashCache[string] = hashed;
  }
  return hashed;
}

// http://jsperf.com/hashing-strings
function hashString(string) {
  // This is the hash from JVM
  // The hash code for a string is computed as
  // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
  // where s[i] is the ith character of the string and n is the length of
  // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
  // (exclusive) by dropping high bits.
  var hashed = 0;
  for (var ii = 0; ii < string.length; ii++) {
    hashed = (31 * hashed + string.charCodeAt(ii)) | 0;
  }
  return smi(hashed);
}

function hashJSObj(obj) {
  var hashed;
  if (usingWeakMap) {
    hashed = weakMap.get(obj);
    if (hashed !== undefined) {
      return hashed;
    }
  }

  hashed = obj[UID_HASH_KEY];
  if (hashed !== undefined) {
    return hashed;
  }

  if (!canDefineProperty) {
    hashed = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
    if (hashed !== undefined) {
      return hashed;
    }

    hashed = getIENodeHash(obj);
    if (hashed !== undefined) {
      return hashed;
    }
  }

  hashed = ++objHashUID;
  if (objHashUID & 0x40000000) {
    objHashUID = 0;
  }

  if (usingWeakMap) {
    weakMap.set(obj, hashed);
  } else if (isExtensible !== undefined && isExtensible(obj) === false) {
    throw new Error('Non-extensible objects are not allowed as keys.');
  } else if (canDefineProperty) {
    Object.defineProperty(obj, UID_HASH_KEY, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: hashed,
    });
  } else if (
    obj.propertyIsEnumerable !== undefined &&
    obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable
  ) {
    // Since we can't define a non-enumerable property on the object
    // we'll hijack one of the less-used non-enumerable properties to
    // save our hash on it. Since this is a function it will not show up in
    // `JSON.stringify` which is what we want.
    obj.propertyIsEnumerable = function() {
      return this.constructor.prototype.propertyIsEnumerable.apply(
        this,
        arguments
      );
    };
    obj.propertyIsEnumerable[UID_HASH_KEY] = hashed;
  } else if (obj.nodeType !== undefined) {
    // At this point we couldn't get the IE `uniqueID` to use as a hash
    // and we couldn't use a non-enumerable property to exploit the
    // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
    // itself.
    obj[UID_HASH_KEY] = hashed;
  } else {
    throw new Error('Unable to set a non-enumerable property on object.');
  }

  return hashed;
}

// Get references to ES5 object methods.
var isExtensible = Object.isExtensible;

// True if Object.defineProperty works as expected. IE8 fails this test.
var canDefineProperty = (function() {
  try {
    Object.defineProperty({}, '@', {});
    return true;
  } catch (e) {
    return false;
  }
})();

// IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
// and avoid memory leaks from the IE cloneNode bug.
function getIENodeHash(node) {
  if (node && node.nodeType > 0) {
    switch (node.nodeType) {
      case 1: // Element
        return node.uniqueID;
      case 9: // Document
        return node.documentElement && node.documentElement.uniqueID;
    }
  }
}

// If possible, use a WeakMap.
var usingWeakMap = typeof WeakMap === 'function';
var weakMap;
if (usingWeakMap) {
  weakMap = new WeakMap();
}

var objHashUID = 0;

var UID_HASH_KEY = '__immutablehash__';
if (typeof Symbol === 'function') {
  UID_HASH_KEY = Symbol(UID_HASH_KEY);
}

var STRING_HASH_CACHE_MIN_STRLEN = 16;
var STRING_HASH_CACHE_MAX_SIZE = 255;
var STRING_HASH_CACHE_SIZE = 0;
var stringHashCache = {};

var ToKeyedSequence = /*@__PURE__*/(function (KeyedSeq$$1) {
  function ToKeyedSequence(indexed, useKeys) {
    this._iter = indexed;
    this._useKeys = useKeys;
    this.size = indexed.size;
  }

  if ( KeyedSeq$$1 ) ToKeyedSequence.__proto__ = KeyedSeq$$1;
  ToKeyedSequence.prototype = Object.create( KeyedSeq$$1 && KeyedSeq$$1.prototype );
  ToKeyedSequence.prototype.constructor = ToKeyedSequence;

  ToKeyedSequence.prototype.get = function get (key, notSetValue) {
    return this._iter.get(key, notSetValue);
  };

  ToKeyedSequence.prototype.has = function has (key) {
    return this._iter.has(key);
  };

  ToKeyedSequence.prototype.valueSeq = function valueSeq () {
    return this._iter.valueSeq();
  };

  ToKeyedSequence.prototype.reverse = function reverse () {
    var this$1 = this;

    var reversedSequence = reverseFactory(this, true);
    if (!this._useKeys) {
      reversedSequence.valueSeq = function () { return this$1._iter.toSeq().reverse(); };
    }
    return reversedSequence;
  };

  ToKeyedSequence.prototype.map = function map (mapper, context) {
    var this$1 = this;

    var mappedSequence = mapFactory(this, mapper, context);
    if (!this._useKeys) {
      mappedSequence.valueSeq = function () { return this$1._iter.toSeq().map(mapper, context); };
    }
    return mappedSequence;
  };

  ToKeyedSequence.prototype.__iterate = function __iterate (fn, reverse) {
    var this$1 = this;

    return this._iter.__iterate(function (v, k) { return fn(v, k, this$1); }, reverse);
  };

  ToKeyedSequence.prototype.__iterator = function __iterator (type, reverse) {
    return this._iter.__iterator(type, reverse);
  };

  return ToKeyedSequence;
}(KeyedSeq));
ToKeyedSequence.prototype[IS_ORDERED_SYMBOL] = true;

var ToIndexedSequence = /*@__PURE__*/(function (IndexedSeq$$1) {
  function ToIndexedSequence(iter) {
    this._iter = iter;
    this.size = iter.size;
  }

  if ( IndexedSeq$$1 ) ToIndexedSequence.__proto__ = IndexedSeq$$1;
  ToIndexedSequence.prototype = Object.create( IndexedSeq$$1 && IndexedSeq$$1.prototype );
  ToIndexedSequence.prototype.constructor = ToIndexedSequence;

  ToIndexedSequence.prototype.includes = function includes (value) {
    return this._iter.includes(value);
  };

  ToIndexedSequence.prototype.__iterate = function __iterate (fn, reverse) {
    var this$1 = this;

    var i = 0;
    reverse && ensureSize(this);
    return this._iter.__iterate(
      function (v) { return fn(v, reverse ? this$1.size - ++i : i++, this$1); },
      reverse
    );
  };

  ToIndexedSequence.prototype.__iterator = function __iterator (type, reverse) {
    var this$1 = this;

    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    var i = 0;
    reverse && ensureSize(this);
    return new Iterator(function () {
      var step = iterator.next();
      return step.done
        ? step
        : iteratorValue(
            type,
            reverse ? this$1.size - ++i : i++,
            step.value,
            step
          );
    });
  };

  return ToIndexedSequence;
}(IndexedSeq));

var ToSetSequence = /*@__PURE__*/(function (SetSeq$$1) {
  function ToSetSequence(iter) {
    this._iter = iter;
    this.size = iter.size;
  }

  if ( SetSeq$$1 ) ToSetSequence.__proto__ = SetSeq$$1;
  ToSetSequence.prototype = Object.create( SetSeq$$1 && SetSeq$$1.prototype );
  ToSetSequence.prototype.constructor = ToSetSequence;

  ToSetSequence.prototype.has = function has (key) {
    return this._iter.includes(key);
  };

  ToSetSequence.prototype.__iterate = function __iterate (fn, reverse) {
    var this$1 = this;

    return this._iter.__iterate(function (v) { return fn(v, v, this$1); }, reverse);
  };

  ToSetSequence.prototype.__iterator = function __iterator (type, reverse) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    return new Iterator(function () {
      var step = iterator.next();
      return step.done
        ? step
        : iteratorValue(type, step.value, step.value, step);
    });
  };

  return ToSetSequence;
}(SetSeq));

var FromEntriesSequence = /*@__PURE__*/(function (KeyedSeq$$1) {
  function FromEntriesSequence(entries) {
    this._iter = entries;
    this.size = entries.size;
  }

  if ( KeyedSeq$$1 ) FromEntriesSequence.__proto__ = KeyedSeq$$1;
  FromEntriesSequence.prototype = Object.create( KeyedSeq$$1 && KeyedSeq$$1.prototype );
  FromEntriesSequence.prototype.constructor = FromEntriesSequence;

  FromEntriesSequence.prototype.entrySeq = function entrySeq () {
    return this._iter.toSeq();
  };

  FromEntriesSequence.prototype.__iterate = function __iterate (fn, reverse) {
    var this$1 = this;

    return this._iter.__iterate(function (entry) {
      // Check if entry exists first so array access doesn't throw for holes
      // in the parent iteration.
      if (entry) {
        validateEntry(entry);
        var indexedCollection = isCollection(entry);
        return fn(
          indexedCollection ? entry.get(1) : entry[1],
          indexedCollection ? entry.get(0) : entry[0],
          this$1
        );
      }
    }, reverse);
  };

  FromEntriesSequence.prototype.__iterator = function __iterator (type, reverse) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    return new Iterator(function () {
      while (true) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedCollection = isCollection(entry);
          return iteratorValue(
            type,
            indexedCollection ? entry.get(0) : entry[0],
            indexedCollection ? entry.get(1) : entry[1],
            step
          );
        }
      }
    });
  };

  return FromEntriesSequence;
}(KeyedSeq));

ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;

function flipFactory(collection) {
  var flipSequence = makeSequence(collection);
  flipSequence._iter = collection;
  flipSequence.size = collection.size;
  flipSequence.flip = function () { return collection; };
  flipSequence.reverse = function() {
    var reversedSequence = collection.reverse.apply(this); // super.reverse()
    reversedSequence.flip = function () { return collection.reverse(); };
    return reversedSequence;
  };
  flipSequence.has = function (key) { return collection.includes(key); };
  flipSequence.includes = function (key) { return collection.has(key); };
  flipSequence.cacheResult = cacheResultThrough;
  flipSequence.__iterateUncached = function(fn, reverse) {
    var this$1 = this;

    return collection.__iterate(function (v, k) { return fn(k, v, this$1) !== false; }, reverse);
  };
  flipSequence.__iteratorUncached = function(type, reverse) {
    if (type === ITERATE_ENTRIES) {
      var iterator = collection.__iterator(type, reverse);
      return new Iterator(function () {
        var step = iterator.next();
        if (!step.done) {
          var k = step.value[0];
          step.value[0] = step.value[1];
          step.value[1] = k;
        }
        return step;
      });
    }
    return collection.__iterator(
      type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
      reverse
    );
  };
  return flipSequence;
}

function mapFactory(collection, mapper, context) {
  var mappedSequence = makeSequence(collection);
  mappedSequence.size = collection.size;
  mappedSequence.has = function (key) { return collection.has(key); };
  mappedSequence.get = function (key, notSetValue) {
    var v = collection.get(key, NOT_SET);
    return v === NOT_SET
      ? notSetValue
      : mapper.call(context, v, key, collection);
  };
  mappedSequence.__iterateUncached = function(fn, reverse) {
    var this$1 = this;

    return collection.__iterate(
      function (v, k, c) { return fn(mapper.call(context, v, k, c), k, this$1) !== false; },
      reverse
    );
  };
  mappedSequence.__iteratorUncached = function(type, reverse) {
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
    return new Iterator(function () {
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      var key = entry[0];
      return iteratorValue(
        type,
        key,
        mapper.call(context, entry[1], key, collection),
        step
      );
    });
  };
  return mappedSequence;
}

function reverseFactory(collection, useKeys) {
  var this$1 = this;

  var reversedSequence = makeSequence(collection);
  reversedSequence._iter = collection;
  reversedSequence.size = collection.size;
  reversedSequence.reverse = function () { return collection; };
  if (collection.flip) {
    reversedSequence.flip = function() {
      var flipSequence = flipFactory(collection);
      flipSequence.reverse = function () { return collection.flip(); };
      return flipSequence;
    };
  }
  reversedSequence.get = function (key, notSetValue) { return collection.get(useKeys ? key : -1 - key, notSetValue); };
  reversedSequence.has = function (key) { return collection.has(useKeys ? key : -1 - key); };
  reversedSequence.includes = function (value) { return collection.includes(value); };
  reversedSequence.cacheResult = cacheResultThrough;
  reversedSequence.__iterate = function(fn, reverse) {
    var this$1 = this;

    var i = 0;
    reverse && ensureSize(collection);
    return collection.__iterate(
      function (v, k) { return fn(v, useKeys ? k : reverse ? this$1.size - ++i : i++, this$1); },
      !reverse
    );
  };
  reversedSequence.__iterator = function (type, reverse) {
    var i = 0;
    reverse && ensureSize(collection);
    var iterator = collection.__iterator(ITERATE_ENTRIES, !reverse);
    return new Iterator(function () {
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      return iteratorValue(
        type,
        useKeys ? entry[0] : reverse ? this$1.size - ++i : i++,
        entry[1],
        step
      );
    });
  };
  return reversedSequence;
}

function filterFactory(collection, predicate, context, useKeys) {
  var filterSequence = makeSequence(collection);
  if (useKeys) {
    filterSequence.has = function (key) {
      var v = collection.get(key, NOT_SET);
      return v !== NOT_SET && !!predicate.call(context, v, key, collection);
    };
    filterSequence.get = function (key, notSetValue) {
      var v = collection.get(key, NOT_SET);
      return v !== NOT_SET && predicate.call(context, v, key, collection)
        ? v
        : notSetValue;
    };
  }
  filterSequence.__iterateUncached = function(fn, reverse) {
    var this$1 = this;

    var iterations = 0;
    collection.__iterate(function (v, k, c) {
      if (predicate.call(context, v, k, c)) {
        iterations++;
        return fn(v, useKeys ? k : iterations - 1, this$1);
      }
    }, reverse);
    return iterations;
  };
  filterSequence.__iteratorUncached = function(type, reverse) {
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
    var iterations = 0;
    return new Iterator(function () {
      while (true) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        var value = entry[1];
        if (predicate.call(context, value, key, collection)) {
          return iteratorValue(type, useKeys ? key : iterations++, value, step);
        }
      }
    });
  };
  return filterSequence;
}

function countByFactory(collection, grouper, context) {
  var groups = Map().asMutable();
  collection.__iterate(function (v, k) {
    groups.update(grouper.call(context, v, k, collection), 0, function (a) { return a + 1; });
  });
  return groups.asImmutable();
}

function groupByFactory(collection, grouper, context) {
  var isKeyedIter = isKeyed(collection);
  var groups = (isOrdered(collection) ? OrderedMap() : Map()).asMutable();
  collection.__iterate(function (v, k) {
    groups.update(
      grouper.call(context, v, k, collection),
      function (a) { return ((a = a || []), a.push(isKeyedIter ? [k, v] : v), a); }
    );
  });
  var coerce = collectionClass(collection);
  return groups.map(function (arr) { return reify(collection, coerce(arr)); }).asImmutable();
}

function sliceFactory(collection, begin, end, useKeys) {
  var originalSize = collection.size;

  if (wholeSlice(begin, end, originalSize)) {
    return collection;
  }

  var resolvedBegin = resolveBegin(begin, originalSize);
  var resolvedEnd = resolveEnd(end, originalSize);

  // begin or end will be NaN if they were provided as negative numbers and
  // this collection's size is unknown. In that case, cache first so there is
  // a known size and these do not resolve to NaN.
  if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
    return sliceFactory(collection.toSeq().cacheResult(), begin, end, useKeys);
  }

  // Note: resolvedEnd is undefined when the original sequence's length is
  // unknown and this slice did not supply an end and should contain all
  // elements after resolvedBegin.
  // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
  var resolvedSize = resolvedEnd - resolvedBegin;
  var sliceSize;
  if (resolvedSize === resolvedSize) {
    sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
  }

  var sliceSeq = makeSequence(collection);

  // If collection.size is undefined, the size of the realized sliceSeq is
  // unknown at this point unless the number of items to slice is 0
  sliceSeq.size =
    sliceSize === 0 ? sliceSize : (collection.size && sliceSize) || undefined;

  if (!useKeys && isSeq(collection) && sliceSize >= 0) {
    sliceSeq.get = function(index, notSetValue) {
      index = wrapIndex(this, index);
      return index >= 0 && index < sliceSize
        ? collection.get(index + resolvedBegin, notSetValue)
        : notSetValue;
    };
  }

  sliceSeq.__iterateUncached = function(fn, reverse) {
    var this$1 = this;

    if (sliceSize === 0) {
      return 0;
    }
    if (reverse) {
      return this.cacheResult().__iterate(fn, reverse);
    }
    var skipped = 0;
    var isSkipping = true;
    var iterations = 0;
    collection.__iterate(function (v, k) {
      if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
        iterations++;
        return (
          fn(v, useKeys ? k : iterations - 1, this$1) !== false &&
          iterations !== sliceSize
        );
      }
    });
    return iterations;
  };

  sliceSeq.__iteratorUncached = function(type, reverse) {
    if (sliceSize !== 0 && reverse) {
      return this.cacheResult().__iterator(type, reverse);
    }
    // Don't bother instantiating parent iterator if taking 0.
    if (sliceSize === 0) {
      return new Iterator(iteratorDone);
    }
    var iterator = collection.__iterator(type, reverse);
    var skipped = 0;
    var iterations = 0;
    return new Iterator(function () {
      while (skipped++ < resolvedBegin) {
        iterator.next();
      }
      if (++iterations > sliceSize) {
        return iteratorDone();
      }
      var step = iterator.next();
      if (useKeys || type === ITERATE_VALUES || step.done) {
        return step;
      }
      if (type === ITERATE_KEYS) {
        return iteratorValue(type, iterations - 1, undefined, step);
      }
      return iteratorValue(type, iterations - 1, step.value[1], step);
    });
  };

  return sliceSeq;
}

function takeWhileFactory(collection, predicate, context) {
  var takeSequence = makeSequence(collection);
  takeSequence.__iterateUncached = function(fn, reverse) {
    var this$1 = this;

    if (reverse) {
      return this.cacheResult().__iterate(fn, reverse);
    }
    var iterations = 0;
    collection.__iterate(
      function (v, k, c) { return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$1); }
    );
    return iterations;
  };
  takeSequence.__iteratorUncached = function(type, reverse) {
    var this$1 = this;

    if (reverse) {
      return this.cacheResult().__iterator(type, reverse);
    }
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
    var iterating = true;
    return new Iterator(function () {
      if (!iterating) {
        return iteratorDone();
      }
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      var k = entry[0];
      var v = entry[1];
      if (!predicate.call(context, v, k, this$1)) {
        iterating = false;
        return iteratorDone();
      }
      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
    });
  };
  return takeSequence;
}

function skipWhileFactory(collection, predicate, context, useKeys) {
  var skipSequence = makeSequence(collection);
  skipSequence.__iterateUncached = function(fn, reverse) {
    var this$1 = this;

    if (reverse) {
      return this.cacheResult().__iterate(fn, reverse);
    }
    var isSkipping = true;
    var iterations = 0;
    collection.__iterate(function (v, k, c) {
      if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
        iterations++;
        return fn(v, useKeys ? k : iterations - 1, this$1);
      }
    });
    return iterations;
  };
  skipSequence.__iteratorUncached = function(type, reverse) {
    var this$1 = this;

    if (reverse) {
      return this.cacheResult().__iterator(type, reverse);
    }
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
    var skipping = true;
    var iterations = 0;
    return new Iterator(function () {
      var step;
      var k;
      var v;
      do {
        step = iterator.next();
        if (step.done) {
          if (useKeys || type === ITERATE_VALUES) {
            return step;
          }
          if (type === ITERATE_KEYS) {
            return iteratorValue(type, iterations++, undefined, step);
          }
          return iteratorValue(type, iterations++, step.value[1], step);
        }
        var entry = step.value;
        k = entry[0];
        v = entry[1];
        skipping && (skipping = predicate.call(context, v, k, this$1));
      } while (skipping);
      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
    });
  };
  return skipSequence;
}

function concatFactory(collection, values) {
  var isKeyedCollection = isKeyed(collection);
  var iters = [collection]
    .concat(values)
    .map(function (v) {
      if (!isCollection(v)) {
        v = isKeyedCollection
          ? keyedSeqFromValue(v)
          : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
      } else if (isKeyedCollection) {
        v = KeyedCollection(v);
      }
      return v;
    })
    .filter(function (v) { return v.size !== 0; });

  if (iters.length === 0) {
    return collection;
  }

  if (iters.length === 1) {
    var singleton = iters[0];
    if (
      singleton === collection ||
      (isKeyedCollection && isKeyed(singleton)) ||
      (isIndexed(collection) && isIndexed(singleton))
    ) {
      return singleton;
    }
  }

  var concatSeq = new ArraySeq(iters);
  if (isKeyedCollection) {
    concatSeq = concatSeq.toKeyedSeq();
  } else if (!isIndexed(collection)) {
    concatSeq = concatSeq.toSetSeq();
  }
  concatSeq = concatSeq.flatten(true);
  concatSeq.size = iters.reduce(function (sum, seq) {
    if (sum !== undefined) {
      var size = seq.size;
      if (size !== undefined) {
        return sum + size;
      }
    }
  }, 0);
  return concatSeq;
}

function flattenFactory(collection, depth, useKeys) {
  var flatSequence = makeSequence(collection);
  flatSequence.__iterateUncached = function(fn, reverse) {
    if (reverse) {
      return this.cacheResult().__iterate(fn, reverse);
    }
    var iterations = 0;
    var stopped = false;
    function flatDeep(iter, currentDepth) {
      iter.__iterate(function (v, k) {
        if ((!depth || currentDepth < depth) && isCollection(v)) {
          flatDeep(v, currentDepth + 1);
        } else {
          iterations++;
          if (fn(v, useKeys ? k : iterations - 1, flatSequence) === false) {
            stopped = true;
          }
        }
        return !stopped;
      }, reverse);
    }
    flatDeep(collection, 0);
    return iterations;
  };
  flatSequence.__iteratorUncached = function(type, reverse) {
    if (reverse) {
      return this.cacheResult().__iterator(type, reverse);
    }
    var iterator = collection.__iterator(type, reverse);
    var stack = [];
    var iterations = 0;
    return new Iterator(function () {
      while (iterator) {
        var step = iterator.next();
        if (step.done !== false) {
          iterator = stack.pop();
          continue;
        }
        var v = step.value;
        if (type === ITERATE_ENTRIES) {
          v = v[1];
        }
        if ((!depth || stack.length < depth) && isCollection(v)) {
          stack.push(iterator);
          iterator = v.__iterator(type, reverse);
        } else {
          return useKeys ? step : iteratorValue(type, iterations++, v, step);
        }
      }
      return iteratorDone();
    });
  };
  return flatSequence;
}

function flatMapFactory(collection, mapper, context) {
  var coerce = collectionClass(collection);
  return collection
    .toSeq()
    .map(function (v, k) { return coerce(mapper.call(context, v, k, collection)); })
    .flatten(true);
}

function interposeFactory(collection, separator) {
  var interposedSequence = makeSequence(collection);
  interposedSequence.size = collection.size && collection.size * 2 - 1;
  interposedSequence.__iterateUncached = function(fn, reverse) {
    var this$1 = this;

    var iterations = 0;
    collection.__iterate(
      function (v) { return (!iterations || fn(separator, iterations++, this$1) !== false) &&
        fn(v, iterations++, this$1) !== false; },
      reverse
    );
    return iterations;
  };
  interposedSequence.__iteratorUncached = function(type, reverse) {
    var iterator = collection.__iterator(ITERATE_VALUES, reverse);
    var iterations = 0;
    var step;
    return new Iterator(function () {
      if (!step || iterations % 2) {
        step = iterator.next();
        if (step.done) {
          return step;
        }
      }
      return iterations % 2
        ? iteratorValue(type, iterations++, separator)
        : iteratorValue(type, iterations++, step.value, step);
    });
  };
  return interposedSequence;
}

function sortFactory(collection, comparator, mapper) {
  if (!comparator) {
    comparator = defaultComparator;
  }
  var isKeyedCollection = isKeyed(collection);
  var index = 0;
  var entries = collection
    .toSeq()
    .map(function (v, k) { return [k, v, index++, mapper ? mapper(v, k, collection) : v]; })
    .valueSeq()
    .toArray();
  entries.sort(function (a, b) { return comparator(a[3], b[3]) || a[2] - b[2]; }).forEach(
    isKeyedCollection
      ? function (v, i) {
          entries[i].length = 2;
        }
      : function (v, i) {
          entries[i] = v[1];
        }
  );
  return isKeyedCollection
    ? KeyedSeq(entries)
    : isIndexed(collection)
      ? IndexedSeq(entries)
      : SetSeq(entries);
}

function maxFactory(collection, comparator, mapper) {
  if (!comparator) {
    comparator = defaultComparator;
  }
  if (mapper) {
    var entry = collection
      .toSeq()
      .map(function (v, k) { return [v, mapper(v, k, collection)]; })
      .reduce(function (a, b) { return (maxCompare(comparator, a[1], b[1]) ? b : a); });
    return entry && entry[0];
  }
  return collection.reduce(function (a, b) { return (maxCompare(comparator, a, b) ? b : a); });
}

function maxCompare(comparator, a, b) {
  var comp = comparator(b, a);
  // b is considered the new max if the comparator declares them equal, but
  // they are not equal and b is in fact a nullish value.
  return (
    (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) ||
    comp > 0
  );
}

function zipWithFactory(keyIter, zipper, iters, zipAll) {
  var zipSequence = makeSequence(keyIter);
  var sizes = new ArraySeq(iters).map(function (i) { return i.size; });
  zipSequence.size = zipAll ? sizes.max() : sizes.min();
  // Note: this a generic base implementation of __iterate in terms of
  // __iterator which may be more generically useful in the future.
  zipSequence.__iterate = function(fn, reverse) {
    /* generic:
    var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
    var step;
    var iterations = 0;
    while (!(step = iterator.next()).done) {
      iterations++;
      if (fn(step.value[1], step.value[0], this) === false) {
        break;
      }
    }
    return iterations;
    */
    // indexed:
    var iterator = this.__iterator(ITERATE_VALUES, reverse);
    var step;
    var iterations = 0;
    while (!(step = iterator.next()).done) {
      if (fn(step.value, iterations++, this) === false) {
        break;
      }
    }
    return iterations;
  };
  zipSequence.__iteratorUncached = function(type, reverse) {
    var iterators = iters.map(
      function (i) { return ((i = Collection(i)), getIterator(reverse ? i.reverse() : i)); }
    );
    var iterations = 0;
    var isDone = false;
    return new Iterator(function () {
      var steps;
      if (!isDone) {
        steps = iterators.map(function (i) { return i.next(); });
        isDone = zipAll ? steps.every(function (s) { return s.done; }) : steps.some(function (s) { return s.done; });
      }
      if (isDone) {
        return iteratorDone();
      }
      return iteratorValue(
        type,
        iterations++,
        zipper.apply(null, steps.map(function (s) { return s.value; }))
      );
    });
  };
  return zipSequence;
}

// #pragma Helper Functions

function reify(iter, seq) {
  return iter === seq ? iter : isSeq(iter) ? seq : iter.constructor(seq);
}

function validateEntry(entry) {
  if (entry !== Object(entry)) {
    throw new TypeError('Expected [K, V] tuple: ' + entry);
  }
}

function collectionClass(collection) {
  return isKeyed(collection)
    ? KeyedCollection
    : isIndexed(collection)
      ? IndexedCollection
      : SetCollection;
}

function makeSequence(collection) {
  return Object.create(
    (isKeyed(collection)
      ? KeyedSeq
      : isIndexed(collection)
        ? IndexedSeq
        : SetSeq
    ).prototype
  );
}

function cacheResultThrough() {
  if (this._iter.cacheResult) {
    this._iter.cacheResult();
    this.size = this._iter.size;
    return this;
  }
  return Seq.prototype.cacheResult.call(this);
}

function defaultComparator(a, b) {
  if (a === undefined && b === undefined) {
    return 0;
  }

  if (a === undefined) {
    return 1;
  }

  if (b === undefined) {
    return -1;
  }

  return a > b ? 1 : a < b ? -1 : 0;
}

// http://jsperf.com/copy-array-inline
function arrCopy(arr, offset) {
  offset = offset || 0;
  var len = Math.max(0, arr.length - offset);
  var newArr = new Array(len);
  for (var ii = 0; ii < len; ii++) {
    newArr[ii] = arr[ii + offset];
  }
  return newArr;
}

function invariant(condition, error) {
  if (!condition) { throw new Error(error); }
}

function assertNotInfinite(size) {
  invariant(
    size !== Infinity,
    'Cannot perform this action with an infinite size.'
  );
}

function coerceKeyPath(keyPath) {
  if (isArrayLike(keyPath) && typeof keyPath !== 'string') {
    return keyPath;
  }
  if (isOrdered(keyPath)) {
    return keyPath.toArray();
  }
  throw new TypeError(
    'Invalid keyPath: expected Ordered Collection or Array: ' + keyPath
  );
}

function isPlainObj(value) {
  return (
    value &&
    (typeof value.constructor !== 'function' ||
      value.constructor.name === 'Object')
  );
}

/**
 * Returns true if the value is a potentially-persistent data structure, either
 * provided by Immutable.js or a plain Array or Object.
 */
function isDataStructure(value) {
  return (
    typeof value === 'object' &&
    (isImmutable(value) || Array.isArray(value) || isPlainObj(value))
  );
}

/**
 * Converts a value to a string, adding quotes if a string was provided.
 */
function quoteString(value) {
  try {
    return typeof value === 'string' ? JSON.stringify(value) : String(value);
  } catch (_ignoreError) {
    return JSON.stringify(value);
  }
}

function has(collection, key) {
  return isImmutable(collection)
    ? collection.has(key)
    : isDataStructure(collection) && hasOwnProperty.call(collection, key);
}

function get(collection, key, notSetValue) {
  return isImmutable(collection)
    ? collection.get(key, notSetValue)
    : !has(collection, key)
      ? notSetValue
      : typeof collection.get === 'function'
        ? collection.get(key)
        : collection[key];
}

function shallowCopy(from) {
  if (Array.isArray(from)) {
    return arrCopy(from);
  }
  var to = {};
  for (var key in from) {
    if (hasOwnProperty.call(from, key)) {
      to[key] = from[key];
    }
  }
  return to;
}

function remove(collection, key) {
  if (!isDataStructure(collection)) {
    throw new TypeError(
      'Cannot update non-data-structure value: ' + collection
    );
  }
  if (isImmutable(collection)) {
    if (!collection.remove) {
      throw new TypeError(
        'Cannot update immutable value without .remove() method: ' + collection
      );
    }
    return collection.remove(key);
  }
  if (!hasOwnProperty.call(collection, key)) {
    return collection;
  }
  var collectionCopy = shallowCopy(collection);
  if (Array.isArray(collectionCopy)) {
    collectionCopy.splice(key, 1);
  } else {
    delete collectionCopy[key];
  }
  return collectionCopy;
}

function set(collection, key, value) {
  if (!isDataStructure(collection)) {
    throw new TypeError(
      'Cannot update non-data-structure value: ' + collection
    );
  }
  if (isImmutable(collection)) {
    if (!collection.set) {
      throw new TypeError(
        'Cannot update immutable value without .set() method: ' + collection
      );
    }
    return collection.set(key, value);
  }
  if (hasOwnProperty.call(collection, key) && value === collection[key]) {
    return collection;
  }
  var collectionCopy = shallowCopy(collection);
  collectionCopy[key] = value;
  return collectionCopy;
}

function updateIn(collection, keyPath, notSetValue, updater) {
  if (!updater) {
    updater = notSetValue;
    notSetValue = undefined;
  }
  var updatedValue = updateInDeeply(
    isImmutable(collection),
    collection,
    coerceKeyPath(keyPath),
    0,
    notSetValue,
    updater
  );
  return updatedValue === NOT_SET ? notSetValue : updatedValue;
}

function updateInDeeply(
  inImmutable,
  existing,
  keyPath,
  i,
  notSetValue,
  updater
) {
  var wasNotSet = existing === NOT_SET;
  if (i === keyPath.length) {
    var existingValue = wasNotSet ? notSetValue : existing;
    var newValue = updater(existingValue);
    return newValue === existingValue ? existing : newValue;
  }
  if (!wasNotSet && !isDataStructure(existing)) {
    throw new TypeError(
      'Cannot update within non-data-structure value in path [' +
        keyPath.slice(0, i).map(quoteString) +
        ']: ' +
        existing
    );
  }
  var key = keyPath[i];
  var nextExisting = wasNotSet ? NOT_SET : get(existing, key, NOT_SET);
  var nextUpdated = updateInDeeply(
    nextExisting === NOT_SET ? inImmutable : isImmutable(nextExisting),
    nextExisting,
    keyPath,
    i + 1,
    notSetValue,
    updater
  );
  return nextUpdated === nextExisting
    ? existing
    : nextUpdated === NOT_SET
      ? remove(existing, key)
      : set(
          wasNotSet ? (inImmutable ? emptyMap() : {}) : existing,
          key,
          nextUpdated
        );
}

function setIn(collection, keyPath, value) {
  return updateIn(collection, keyPath, NOT_SET, function () { return value; });
}

function setIn$1(keyPath, v) {
  return setIn(this, keyPath, v);
}

function removeIn(collection, keyPath) {
  return updateIn(collection, keyPath, function () { return NOT_SET; });
}

function deleteIn(keyPath) {
  return removeIn(this, keyPath);
}

function update(collection, key, notSetValue, updater) {
  return updateIn(collection, [key], notSetValue, updater);
}

function update$1(key, notSetValue, updater) {
  return arguments.length === 1
    ? key(this)
    : update(this, key, notSetValue, updater);
}

function updateIn$1(keyPath, notSetValue, updater) {
  return updateIn(this, keyPath, notSetValue, updater);
}

function merge() {
  var iters = [], len = arguments.length;
  while ( len-- ) iters[ len ] = arguments[ len ];

  return mergeIntoKeyedWith(this, iters);
}

function mergeWith(merger) {
  var iters = [], len = arguments.length - 1;
  while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

  if (typeof merger !== 'function') {
    throw new TypeError('Invalid merger function: ' + merger);
  }
  return mergeIntoKeyedWith(this, iters, merger);
}

function mergeIntoKeyedWith(collection, collections, merger) {
  var iters = [];
  for (var ii = 0; ii < collections.length; ii++) {
    var collection$1 = KeyedCollection(collections[ii]);
    if (collection$1.size !== 0) {
      iters.push(collection$1);
    }
  }
  if (iters.length === 0) {
    return collection;
  }
  if (
    collection.toSeq().size === 0 &&
    !collection.__ownerID &&
    iters.length === 1
  ) {
    return collection.constructor(iters[0]);
  }
  return collection.withMutations(function (collection) {
    var mergeIntoCollection = merger
      ? function (value, key) {
          update(
            collection,
            key,
            NOT_SET,
            function (oldVal) { return (oldVal === NOT_SET ? value : merger(oldVal, value, key)); }
          );
        }
      : function (value, key) {
          collection.set(key, value);
        };
    for (var ii = 0; ii < iters.length; ii++) {
      iters[ii].forEach(mergeIntoCollection);
    }
  });
}

function merge$1(collection) {
  var sources = [], len = arguments.length - 1;
  while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

  return mergeWithSources(collection, sources);
}

function mergeWith$1(merger, collection) {
  var sources = [], len = arguments.length - 2;
  while ( len-- > 0 ) sources[ len ] = arguments[ len + 2 ];

  return mergeWithSources(collection, sources, merger);
}

function mergeDeep(collection) {
  var sources = [], len = arguments.length - 1;
  while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

  return mergeDeepWithSources(collection, sources);
}

function mergeDeepWith(merger, collection) {
  var sources = [], len = arguments.length - 2;
  while ( len-- > 0 ) sources[ len ] = arguments[ len + 2 ];

  return mergeDeepWithSources(collection, sources, merger);
}

function mergeDeepWithSources(collection, sources, merger) {
  return mergeWithSources(collection, sources, deepMergerWith(merger));
}

function mergeWithSources(collection, sources, merger) {
  if (!isDataStructure(collection)) {
    throw new TypeError(
      'Cannot merge into non-data-structure value: ' + collection
    );
  }
  if (isImmutable(collection)) {
    return typeof merger === 'function' && collection.mergeWith
      ? collection.mergeWith.apply(collection, [ merger ].concat( sources ))
      : collection.merge
        ? collection.merge.apply(collection, sources)
        : collection.concat.apply(collection, sources);
  }
  var isArray = Array.isArray(collection);
  var merged = collection;
  var Collection$$1 = isArray ? IndexedCollection : KeyedCollection;
  var mergeItem = isArray
    ? function (value) {
        // Copy on write
        if (merged === collection) {
          merged = shallowCopy(merged);
        }
        merged.push(value);
      }
    : function (value, key) {
        var hasVal = hasOwnProperty.call(merged, key);
        var nextVal =
          hasVal && merger ? merger(merged[key], value, key) : value;
        if (!hasVal || nextVal !== merged[key]) {
          // Copy on write
          if (merged === collection) {
            merged = shallowCopy(merged);
          }
          merged[key] = nextVal;
        }
      };
  for (var i = 0; i < sources.length; i++) {
    Collection$$1(sources[i]).forEach(mergeItem);
  }
  return merged;
}

function deepMergerWith(merger) {
  function deepMerger(oldValue, newValue, key) {
    return isDataStructure(oldValue) && isDataStructure(newValue)
      ? mergeWithSources(oldValue, [newValue], deepMerger)
      : merger
        ? merger(oldValue, newValue, key)
        : newValue;
  }
  return deepMerger;
}

function mergeDeep$1() {
  var iters = [], len = arguments.length;
  while ( len-- ) iters[ len ] = arguments[ len ];

  return mergeDeepWithSources(this, iters);
}

function mergeDeepWith$1(merger) {
  var iters = [], len = arguments.length - 1;
  while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

  return mergeDeepWithSources(this, iters, merger);
}

function mergeIn(keyPath) {
  var iters = [], len = arguments.length - 1;
  while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

  return updateIn(this, keyPath, emptyMap(), function (m) { return mergeWithSources(m, iters); });
}

function mergeDeepIn(keyPath) {
  var iters = [], len = arguments.length - 1;
  while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

  return updateIn(this, keyPath, emptyMap(), function (m) { return mergeDeepWithSources(m, iters); }
  );
}

function withMutations(fn) {
  var mutable = this.asMutable();
  fn(mutable);
  return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
}

function asMutable() {
  return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
}

function asImmutable() {
  return this.__ensureOwner();
}

function wasAltered() {
  return this.__altered;
}

var Map = /*@__PURE__*/(function (KeyedCollection$$1) {
  function Map(value) {
    return value === null || value === undefined
      ? emptyMap()
      : isMap(value) && !isOrdered(value)
        ? value
        : emptyMap().withMutations(function (map) {
            var iter = KeyedCollection$$1(value);
            assertNotInfinite(iter.size);
            iter.forEach(function (v, k) { return map.set(k, v); });
          });
  }

  if ( KeyedCollection$$1 ) Map.__proto__ = KeyedCollection$$1;
  Map.prototype = Object.create( KeyedCollection$$1 && KeyedCollection$$1.prototype );
  Map.prototype.constructor = Map;

  Map.of = function of () {
    var keyValues = [], len = arguments.length;
    while ( len-- ) keyValues[ len ] = arguments[ len ];

    return emptyMap().withMutations(function (map) {
      for (var i = 0; i < keyValues.length; i += 2) {
        if (i + 1 >= keyValues.length) {
          throw new Error('Missing value for key: ' + keyValues[i]);
        }
        map.set(keyValues[i], keyValues[i + 1]);
      }
    });
  };

  Map.prototype.toString = function toString () {
    return this.__toString('Map {', '}');
  };

  // @pragma Access

  Map.prototype.get = function get (k, notSetValue) {
    return this._root
      ? this._root.get(0, undefined, k, notSetValue)
      : notSetValue;
  };

  // @pragma Modification

  Map.prototype.set = function set (k, v) {
    return updateMap(this, k, v);
  };

  Map.prototype.remove = function remove (k) {
    return updateMap(this, k, NOT_SET);
  };

  Map.prototype.deleteAll = function deleteAll (keys) {
    var collection = Collection(keys);

    if (collection.size === 0) {
      return this;
    }

    return this.withMutations(function (map) {
      collection.forEach(function (key) { return map.remove(key); });
    });
  };

  Map.prototype.clear = function clear () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._root = null;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyMap();
  };

  // @pragma Composition

  Map.prototype.sort = function sort (comparator) {
    // Late binding
    return OrderedMap(sortFactory(this, comparator));
  };

  Map.prototype.sortBy = function sortBy (mapper, comparator) {
    // Late binding
    return OrderedMap(sortFactory(this, comparator, mapper));
  };

  Map.prototype.map = function map (mapper, context) {
    return this.withMutations(function (map) {
      map.forEach(function (value, key) {
        map.set(key, mapper.call(context, value, key, map));
      });
    });
  };

  // @pragma Mutability

  Map.prototype.__iterator = function __iterator (type, reverse) {
    return new MapIterator(this, type, reverse);
  };

  Map.prototype.__iterate = function __iterate (fn, reverse) {
    var this$1 = this;

    var iterations = 0;
    this._root &&
      this._root.iterate(function (entry) {
        iterations++;
        return fn(entry[1], entry[0], this$1);
      }, reverse);
    return iterations;
  };

  Map.prototype.__ensureOwner = function __ensureOwner (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      if (this.size === 0) {
        return emptyMap();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeMap(this.size, this._root, ownerID, this.__hash);
  };

  return Map;
}(KeyedCollection));

Map.isMap = isMap;

var MapPrototype = Map.prototype;
MapPrototype[IS_MAP_SYMBOL] = true;
MapPrototype[DELETE] = MapPrototype.remove;
MapPrototype.removeAll = MapPrototype.deleteAll;
MapPrototype.setIn = setIn$1;
MapPrototype.removeIn = MapPrototype.deleteIn = deleteIn;
MapPrototype.update = update$1;
MapPrototype.updateIn = updateIn$1;
MapPrototype.merge = MapPrototype.concat = merge;
MapPrototype.mergeWith = mergeWith;
MapPrototype.mergeDeep = mergeDeep$1;
MapPrototype.mergeDeepWith = mergeDeepWith$1;
MapPrototype.mergeIn = mergeIn;
MapPrototype.mergeDeepIn = mergeDeepIn;
MapPrototype.withMutations = withMutations;
MapPrototype.wasAltered = wasAltered;
MapPrototype.asImmutable = asImmutable;
MapPrototype['@@transducer/init'] = MapPrototype.asMutable = asMutable;
MapPrototype['@@transducer/step'] = function(result, arr) {
  return result.set(arr[0], arr[1]);
};
MapPrototype['@@transducer/result'] = function(obj) {
  return obj.asImmutable();
};

// #pragma Trie Nodes

var ArrayMapNode = function ArrayMapNode(ownerID, entries) {
  this.ownerID = ownerID;
  this.entries = entries;
};

ArrayMapNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
  var entries = this.entries;
  for (var ii = 0, len = entries.length; ii < len; ii++) {
    if (is(key, entries[ii][0])) {
      return entries[ii][1];
    }
  }
  return notSetValue;
};

ArrayMapNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  var removed = value === NOT_SET;

  var entries = this.entries;
  var idx = 0;
  var len = entries.length;
  for (; idx < len; idx++) {
    if (is(key, entries[idx][0])) {
      break;
    }
  }
  var exists = idx < len;

  if (exists ? entries[idx][1] === value : removed) {
    return this;
  }

  SetRef(didAlter);
  (removed || !exists) && SetRef(didChangeSize);

  if (removed && entries.length === 1) {
    return; // undefined
  }

  if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
    return createNodes(ownerID, entries, key, value);
  }

  var isEditable = ownerID && ownerID === this.ownerID;
  var newEntries = isEditable ? entries : arrCopy(entries);

  if (exists) {
    if (removed) {
      idx === len - 1
        ? newEntries.pop()
        : (newEntries[idx] = newEntries.pop());
    } else {
      newEntries[idx] = [key, value];
    }
  } else {
    newEntries.push([key, value]);
  }

  if (isEditable) {
    this.entries = newEntries;
    return this;
  }

  return new ArrayMapNode(ownerID, newEntries);
};

var BitmapIndexedNode = function BitmapIndexedNode(ownerID, bitmap, nodes) {
  this.ownerID = ownerID;
  this.bitmap = bitmap;
  this.nodes = nodes;
};

BitmapIndexedNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
  if (keyHash === undefined) {
    keyHash = hash(key);
  }
  var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
  var bitmap = this.bitmap;
  return (bitmap & bit) === 0
    ? notSetValue
    : this.nodes[popCount(bitmap & (bit - 1))].get(
        shift + SHIFT,
        keyHash,
        key,
        notSetValue
      );
};

BitmapIndexedNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (keyHash === undefined) {
    keyHash = hash(key);
  }
  var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var bit = 1 << keyHashFrag;
  var bitmap = this.bitmap;
  var exists = (bitmap & bit) !== 0;

  if (!exists && value === NOT_SET) {
    return this;
  }

  var idx = popCount(bitmap & (bit - 1));
  var nodes = this.nodes;
  var node = exists ? nodes[idx] : undefined;
  var newNode = updateNode(
    node,
    ownerID,
    shift + SHIFT,
    keyHash,
    key,
    value,
    didChangeSize,
    didAlter
  );

  if (newNode === node) {
    return this;
  }

  if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
    return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
  }

  if (
    exists &&
    !newNode &&
    nodes.length === 2 &&
    isLeafNode(nodes[idx ^ 1])
  ) {
    return nodes[idx ^ 1];
  }

  if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
    return newNode;
  }

  var isEditable = ownerID && ownerID === this.ownerID;
  var newBitmap = exists ? (newNode ? bitmap : bitmap ^ bit) : bitmap | bit;
  var newNodes = exists
    ? newNode
      ? setAt(nodes, idx, newNode, isEditable)
      : spliceOut(nodes, idx, isEditable)
    : spliceIn(nodes, idx, newNode, isEditable);

  if (isEditable) {
    this.bitmap = newBitmap;
    this.nodes = newNodes;
    return this;
  }

  return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
};

var HashArrayMapNode = function HashArrayMapNode(ownerID, count, nodes) {
  this.ownerID = ownerID;
  this.count = count;
  this.nodes = nodes;
};

HashArrayMapNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
  if (keyHash === undefined) {
    keyHash = hash(key);
  }
  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var node = this.nodes[idx];
  return node
    ? node.get(shift + SHIFT, keyHash, key, notSetValue)
    : notSetValue;
};

HashArrayMapNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (keyHash === undefined) {
    keyHash = hash(key);
  }
  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var removed = value === NOT_SET;
  var nodes = this.nodes;
  var node = nodes[idx];

  if (removed && !node) {
    return this;
  }

  var newNode = updateNode(
    node,
    ownerID,
    shift + SHIFT,
    keyHash,
    key,
    value,
    didChangeSize,
    didAlter
  );
  if (newNode === node) {
    return this;
  }

  var newCount = this.count;
  if (!node) {
    newCount++;
  } else if (!newNode) {
    newCount--;
    if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
      return packNodes(ownerID, nodes, newCount, idx);
    }
  }

  var isEditable = ownerID && ownerID === this.ownerID;
  var newNodes = setAt(nodes, idx, newNode, isEditable);

  if (isEditable) {
    this.count = newCount;
    this.nodes = newNodes;
    return this;
  }

  return new HashArrayMapNode(ownerID, newCount, newNodes);
};

var HashCollisionNode = function HashCollisionNode(ownerID, keyHash, entries) {
  this.ownerID = ownerID;
  this.keyHash = keyHash;
  this.entries = entries;
};

HashCollisionNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
  var entries = this.entries;
  for (var ii = 0, len = entries.length; ii < len; ii++) {
    if (is(key, entries[ii][0])) {
      return entries[ii][1];
    }
  }
  return notSetValue;
};

HashCollisionNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (keyHash === undefined) {
    keyHash = hash(key);
  }

  var removed = value === NOT_SET;

  if (keyHash !== this.keyHash) {
    if (removed) {
      return this;
    }
    SetRef(didAlter);
    SetRef(didChangeSize);
    return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
  }

  var entries = this.entries;
  var idx = 0;
  var len = entries.length;
  for (; idx < len; idx++) {
    if (is(key, entries[idx][0])) {
      break;
    }
  }
  var exists = idx < len;

  if (exists ? entries[idx][1] === value : removed) {
    return this;
  }

  SetRef(didAlter);
  (removed || !exists) && SetRef(didChangeSize);

  if (removed && len === 2) {
    return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
  }

  var isEditable = ownerID && ownerID === this.ownerID;
  var newEntries = isEditable ? entries : arrCopy(entries);

  if (exists) {
    if (removed) {
      idx === len - 1
        ? newEntries.pop()
        : (newEntries[idx] = newEntries.pop());
    } else {
      newEntries[idx] = [key, value];
    }
  } else {
    newEntries.push([key, value]);
  }

  if (isEditable) {
    this.entries = newEntries;
    return this;
  }

  return new HashCollisionNode(ownerID, this.keyHash, newEntries);
};

var ValueNode = function ValueNode(ownerID, keyHash, entry) {
  this.ownerID = ownerID;
  this.keyHash = keyHash;
  this.entry = entry;
};

ValueNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
  return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
};

ValueNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  var removed = value === NOT_SET;
  var keyMatch = is(key, this.entry[0]);
  if (keyMatch ? value === this.entry[1] : removed) {
    return this;
  }

  SetRef(didAlter);

  if (removed) {
    SetRef(didChangeSize);
    return; // undefined
  }

  if (keyMatch) {
    if (ownerID && ownerID === this.ownerID) {
      this.entry[1] = value;
      return this;
    }
    return new ValueNode(ownerID, this.keyHash, [key, value]);
  }

  SetRef(didChangeSize);
  return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
};

// #pragma Iterators

ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(
  fn,
  reverse
) {
  var entries = this.entries;
  for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
    if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
      return false;
    }
  }
};

BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(
  fn,
  reverse
) {
  var nodes = this.nodes;
  for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
    var node = nodes[reverse ? maxIndex - ii : ii];
    if (node && node.iterate(fn, reverse) === false) {
      return false;
    }
  }
};

// eslint-disable-next-line no-unused-vars
ValueNode.prototype.iterate = function(fn, reverse) {
  return fn(this.entry);
};

var MapIterator = /*@__PURE__*/(function (Iterator$$1) {
  function MapIterator(map, type, reverse) {
    this._type = type;
    this._reverse = reverse;
    this._stack = map._root && mapIteratorFrame(map._root);
  }

  if ( Iterator$$1 ) MapIterator.__proto__ = Iterator$$1;
  MapIterator.prototype = Object.create( Iterator$$1 && Iterator$$1.prototype );
  MapIterator.prototype.constructor = MapIterator;

  MapIterator.prototype.next = function next () {
    var type = this._type;
    var stack = this._stack;
    while (stack) {
      var node = stack.node;
      var index = stack.index++;
      var maxIndex = (void 0);
      if (node.entry) {
        if (index === 0) {
          return mapIteratorValue(type, node.entry);
        }
      } else if (node.entries) {
        maxIndex = node.entries.length - 1;
        if (index <= maxIndex) {
          return mapIteratorValue(
            type,
            node.entries[this._reverse ? maxIndex - index : index]
          );
        }
      } else {
        maxIndex = node.nodes.length - 1;
        if (index <= maxIndex) {
          var subNode = node.nodes[this._reverse ? maxIndex - index : index];
          if (subNode) {
            if (subNode.entry) {
              return mapIteratorValue(type, subNode.entry);
            }
            stack = this._stack = mapIteratorFrame(subNode, stack);
          }
          continue;
        }
      }
      stack = this._stack = this._stack.__prev;
    }
    return iteratorDone();
  };

  return MapIterator;
}(Iterator));

function mapIteratorValue(type, entry) {
  return iteratorValue(type, entry[0], entry[1]);
}

function mapIteratorFrame(node, prev) {
  return {
    node: node,
    index: 0,
    __prev: prev,
  };
}

function makeMap(size, root, ownerID, hash$$1) {
  var map = Object.create(MapPrototype);
  map.size = size;
  map._root = root;
  map.__ownerID = ownerID;
  map.__hash = hash$$1;
  map.__altered = false;
  return map;
}

var EMPTY_MAP;
function emptyMap() {
  return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
}

function updateMap(map, k, v) {
  var newRoot;
  var newSize;
  if (!map._root) {
    if (v === NOT_SET) {
      return map;
    }
    newSize = 1;
    newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
  } else {
    var didChangeSize = MakeRef();
    var didAlter = MakeRef();
    newRoot = updateNode(
      map._root,
      map.__ownerID,
      0,
      undefined,
      k,
      v,
      didChangeSize,
      didAlter
    );
    if (!didAlter.value) {
      return map;
    }
    newSize = map.size + (didChangeSize.value ? (v === NOT_SET ? -1 : 1) : 0);
  }
  if (map.__ownerID) {
    map.size = newSize;
    map._root = newRoot;
    map.__hash = undefined;
    map.__altered = true;
    return map;
  }
  return newRoot ? makeMap(newSize, newRoot) : emptyMap();
}

function updateNode(
  node,
  ownerID,
  shift,
  keyHash,
  key,
  value,
  didChangeSize,
  didAlter
) {
  if (!node) {
    if (value === NOT_SET) {
      return node;
    }
    SetRef(didAlter);
    SetRef(didChangeSize);
    return new ValueNode(ownerID, keyHash, [key, value]);
  }
  return node.update(
    ownerID,
    shift,
    keyHash,
    key,
    value,
    didChangeSize,
    didAlter
  );
}

function isLeafNode(node) {
  return (
    node.constructor === ValueNode || node.constructor === HashCollisionNode
  );
}

function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
  if (node.keyHash === keyHash) {
    return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
  }

  var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
  var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

  var newNode;
  var nodes =
    idx1 === idx2
      ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)]
      : ((newNode = new ValueNode(ownerID, keyHash, entry)),
        idx1 < idx2 ? [node, newNode] : [newNode, node]);

  return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
}

function createNodes(ownerID, entries, key, value) {
  if (!ownerID) {
    ownerID = new OwnerID();
  }
  var node = new ValueNode(ownerID, hash(key), [key, value]);
  for (var ii = 0; ii < entries.length; ii++) {
    var entry = entries[ii];
    node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
  }
  return node;
}

function packNodes(ownerID, nodes, count, excluding) {
  var bitmap = 0;
  var packedII = 0;
  var packedNodes = new Array(count);
  for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
    var node = nodes[ii];
    if (node !== undefined && ii !== excluding) {
      bitmap |= bit;
      packedNodes[packedII++] = node;
    }
  }
  return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
}

function expandNodes(ownerID, nodes, bitmap, including, node) {
  var count = 0;
  var expandedNodes = new Array(SIZE);
  for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
    expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
  }
  expandedNodes[including] = node;
  return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
}

function popCount(x) {
  x -= (x >> 1) & 0x55555555;
  x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
  x = (x + (x >> 4)) & 0x0f0f0f0f;
  x += x >> 8;
  x += x >> 16;
  return x & 0x7f;
}

function setAt(array, idx, val, canEdit) {
  var newArray = canEdit ? array : arrCopy(array);
  newArray[idx] = val;
  return newArray;
}

function spliceIn(array, idx, val, canEdit) {
  var newLen = array.length + 1;
  if (canEdit && idx + 1 === newLen) {
    array[idx] = val;
    return array;
  }
  var newArray = new Array(newLen);
  var after = 0;
  for (var ii = 0; ii < newLen; ii++) {
    if (ii === idx) {
      newArray[ii] = val;
      after = -1;
    } else {
      newArray[ii] = array[ii + after];
    }
  }
  return newArray;
}

function spliceOut(array, idx, canEdit) {
  var newLen = array.length - 1;
  if (canEdit && idx === newLen) {
    array.pop();
    return array;
  }
  var newArray = new Array(newLen);
  var after = 0;
  for (var ii = 0; ii < newLen; ii++) {
    if (ii === idx) {
      after = 1;
    }
    newArray[ii] = array[ii + after];
  }
  return newArray;
}

var MAX_ARRAY_MAP_SIZE = SIZE / 4;
var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

var IS_LIST_SYMBOL = '@@__IMMUTABLE_LIST__@@';

function isList(maybeList) {
  return Boolean(maybeList && maybeList[IS_LIST_SYMBOL]);
}

var List = /*@__PURE__*/(function (IndexedCollection$$1) {
  function List(value) {
    var empty = emptyList();
    if (value === null || value === undefined) {
      return empty;
    }
    if (isList(value)) {
      return value;
    }
    var iter = IndexedCollection$$1(value);
    var size = iter.size;
    if (size === 0) {
      return empty;
    }
    assertNotInfinite(size);
    if (size > 0 && size < SIZE) {
      return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
    }
    return empty.withMutations(function (list) {
      list.setSize(size);
      iter.forEach(function (v, i) { return list.set(i, v); });
    });
  }

  if ( IndexedCollection$$1 ) List.__proto__ = IndexedCollection$$1;
  List.prototype = Object.create( IndexedCollection$$1 && IndexedCollection$$1.prototype );
  List.prototype.constructor = List;

  List.of = function of (/*...values*/) {
    return this(arguments);
  };

  List.prototype.toString = function toString () {
    return this.__toString('List [', ']');
  };

  // @pragma Access

  List.prototype.get = function get (index, notSetValue) {
    index = wrapIndex(this, index);
    if (index >= 0 && index < this.size) {
      index += this._origin;
      var node = listNodeFor(this, index);
      return node && node.array[index & MASK];
    }
    return notSetValue;
  };

  // @pragma Modification

  List.prototype.set = function set (index, value) {
    return updateList(this, index, value);
  };

  List.prototype.remove = function remove (index) {
    return !this.has(index)
      ? this
      : index === 0
        ? this.shift()
        : index === this.size - 1
          ? this.pop()
          : this.splice(index, 1);
  };

  List.prototype.insert = function insert (index, value) {
    return this.splice(index, 0, value);
  };

  List.prototype.clear = function clear () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = this._origin = this._capacity = 0;
      this._level = SHIFT;
      this._root = this._tail = null;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyList();
  };

  List.prototype.push = function push (/*...values*/) {
    var values = arguments;
    var oldSize = this.size;
    return this.withMutations(function (list) {
      setListBounds(list, 0, oldSize + values.length);
      for (var ii = 0; ii < values.length; ii++) {
        list.set(oldSize + ii, values[ii]);
      }
    });
  };

  List.prototype.pop = function pop () {
    return setListBounds(this, 0, -1);
  };

  List.prototype.unshift = function unshift (/*...values*/) {
    var values = arguments;
    return this.withMutations(function (list) {
      setListBounds(list, -values.length);
      for (var ii = 0; ii < values.length; ii++) {
        list.set(ii, values[ii]);
      }
    });
  };

  List.prototype.shift = function shift () {
    return setListBounds(this, 1);
  };

  // @pragma Composition

  List.prototype.concat = function concat (/*...collections*/) {
    var arguments$1 = arguments;

    var seqs = [];
    for (var i = 0; i < arguments.length; i++) {
      var argument = arguments$1[i];
      var seq = IndexedCollection$$1(
        typeof argument !== 'string' && hasIterator(argument)
          ? argument
          : [argument]
      );
      if (seq.size !== 0) {
        seqs.push(seq);
      }
    }
    if (seqs.length === 0) {
      return this;
    }
    if (this.size === 0 && !this.__ownerID && seqs.length === 1) {
      return this.constructor(seqs[0]);
    }
    return this.withMutations(function (list) {
      seqs.forEach(function (seq) { return seq.forEach(function (value) { return list.push(value); }); });
    });
  };

  List.prototype.setSize = function setSize (size) {
    return setListBounds(this, 0, size);
  };

  List.prototype.map = function map (mapper, context) {
    var this$1 = this;

    return this.withMutations(function (list) {
      for (var i = 0; i < this$1.size; i++) {
        list.set(i, mapper.call(context, list.get(i), i, list));
      }
    });
  };

  // @pragma Iteration

  List.prototype.slice = function slice (begin, end) {
    var size = this.size;
    if (wholeSlice(begin, end, size)) {
      return this;
    }
    return setListBounds(
      this,
      resolveBegin(begin, size),
      resolveEnd(end, size)
    );
  };

  List.prototype.__iterator = function __iterator (type, reverse) {
    var index = reverse ? this.size : 0;
    var values = iterateList(this, reverse);
    return new Iterator(function () {
      var value = values();
      return value === DONE
        ? iteratorDone()
        : iteratorValue(type, reverse ? --index : index++, value);
    });
  };

  List.prototype.__iterate = function __iterate (fn, reverse) {
    var index = reverse ? this.size : 0;
    var values = iterateList(this, reverse);
    var value;
    while ((value = values()) !== DONE) {
      if (fn(value, reverse ? --index : index++, this) === false) {
        break;
      }
    }
    return index;
  };

  List.prototype.__ensureOwner = function __ensureOwner (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      if (this.size === 0) {
        return emptyList();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeList(
      this._origin,
      this._capacity,
      this._level,
      this._root,
      this._tail,
      ownerID,
      this.__hash
    );
  };

  return List;
}(IndexedCollection));

List.isList = isList;

var ListPrototype = List.prototype;
ListPrototype[IS_LIST_SYMBOL] = true;
ListPrototype[DELETE] = ListPrototype.remove;
ListPrototype.merge = ListPrototype.concat;
ListPrototype.setIn = setIn$1;
ListPrototype.deleteIn = ListPrototype.removeIn = deleteIn;
ListPrototype.update = update$1;
ListPrototype.updateIn = updateIn$1;
ListPrototype.mergeIn = mergeIn;
ListPrototype.mergeDeepIn = mergeDeepIn;
ListPrototype.withMutations = withMutations;
ListPrototype.wasAltered = wasAltered;
ListPrototype.asImmutable = asImmutable;
ListPrototype['@@transducer/init'] = ListPrototype.asMutable = asMutable;
ListPrototype['@@transducer/step'] = function(result, arr) {
  return result.push(arr);
};
ListPrototype['@@transducer/result'] = function(obj) {
  return obj.asImmutable();
};

var VNode = function VNode(array, ownerID) {
  this.array = array;
  this.ownerID = ownerID;
};

// TODO: seems like these methods are very similar

VNode.prototype.removeBefore = function removeBefore (ownerID, level, index) {
  if (index === level ? 1 << level : this.array.length === 0) {
    return this;
  }
  var originIndex = (index >>> level) & MASK;
  if (originIndex >= this.array.length) {
    return new VNode([], ownerID);
  }
  var removingFirst = originIndex === 0;
  var newChild;
  if (level > 0) {
    var oldChild = this.array[originIndex];
    newChild =
      oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
    if (newChild === oldChild && removingFirst) {
      return this;
    }
  }
  if (removingFirst && !newChild) {
    return this;
  }
  var editable = editableVNode(this, ownerID);
  if (!removingFirst) {
    for (var ii = 0; ii < originIndex; ii++) {
      editable.array[ii] = undefined;
    }
  }
  if (newChild) {
    editable.array[originIndex] = newChild;
  }
  return editable;
};

VNode.prototype.removeAfter = function removeAfter (ownerID, level, index) {
  if (index === (level ? 1 << level : 0) || this.array.length === 0) {
    return this;
  }
  var sizeIndex = ((index - 1) >>> level) & MASK;
  if (sizeIndex >= this.array.length) {
    return this;
  }

  var newChild;
  if (level > 0) {
    var oldChild = this.array[sizeIndex];
    newChild =
      oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
    if (newChild === oldChild && sizeIndex === this.array.length - 1) {
      return this;
    }
  }

  var editable = editableVNode(this, ownerID);
  editable.array.splice(sizeIndex + 1);
  if (newChild) {
    editable.array[sizeIndex] = newChild;
  }
  return editable;
};

var DONE = {};

function iterateList(list, reverse) {
  var left = list._origin;
  var right = list._capacity;
  var tailPos = getTailOffset(right);
  var tail = list._tail;

  return iterateNodeOrLeaf(list._root, list._level, 0);

  function iterateNodeOrLeaf(node, level, offset) {
    return level === 0
      ? iterateLeaf(node, offset)
      : iterateNode(node, level, offset);
  }

  function iterateLeaf(node, offset) {
    var array = offset === tailPos ? tail && tail.array : node && node.array;
    var from = offset > left ? 0 : left - offset;
    var to = right - offset;
    if (to > SIZE) {
      to = SIZE;
    }
    return function () {
      if (from === to) {
        return DONE;
      }
      var idx = reverse ? --to : from++;
      return array && array[idx];
    };
  }

  function iterateNode(node, level, offset) {
    var values;
    var array = node && node.array;
    var from = offset > left ? 0 : (left - offset) >> level;
    var to = ((right - offset) >> level) + 1;
    if (to > SIZE) {
      to = SIZE;
    }
    return function () {
      while (true) {
        if (values) {
          var value = values();
          if (value !== DONE) {
            return value;
          }
          values = null;
        }
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        values = iterateNodeOrLeaf(
          array && array[idx],
          level - SHIFT,
          offset + (idx << level)
        );
      }
    };
  }
}

function makeList(origin, capacity, level, root, tail, ownerID, hash) {
  var list = Object.create(ListPrototype);
  list.size = capacity - origin;
  list._origin = origin;
  list._capacity = capacity;
  list._level = level;
  list._root = root;
  list._tail = tail;
  list.__ownerID = ownerID;
  list.__hash = hash;
  list.__altered = false;
  return list;
}

var EMPTY_LIST;
function emptyList() {
  return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
}

function updateList(list, index, value) {
  index = wrapIndex(list, index);

  if (index !== index) {
    return list;
  }

  if (index >= list.size || index < 0) {
    return list.withMutations(function (list) {
      index < 0
        ? setListBounds(list, index).set(0, value)
        : setListBounds(list, 0, index + 1).set(index, value);
    });
  }

  index += list._origin;

  var newTail = list._tail;
  var newRoot = list._root;
  var didAlter = MakeRef();
  if (index >= getTailOffset(list._capacity)) {
    newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
  } else {
    newRoot = updateVNode(
      newRoot,
      list.__ownerID,
      list._level,
      index,
      value,
      didAlter
    );
  }

  if (!didAlter.value) {
    return list;
  }

  if (list.__ownerID) {
    list._root = newRoot;
    list._tail = newTail;
    list.__hash = undefined;
    list.__altered = true;
    return list;
  }
  return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
}

function updateVNode(node, ownerID, level, index, value, didAlter) {
  var idx = (index >>> level) & MASK;
  var nodeHas = node && idx < node.array.length;
  if (!nodeHas && value === undefined) {
    return node;
  }

  var newNode;

  if (level > 0) {
    var lowerNode = node && node.array[idx];
    var newLowerNode = updateVNode(
      lowerNode,
      ownerID,
      level - SHIFT,
      index,
      value,
      didAlter
    );
    if (newLowerNode === lowerNode) {
      return node;
    }
    newNode = editableVNode(node, ownerID);
    newNode.array[idx] = newLowerNode;
    return newNode;
  }

  if (nodeHas && node.array[idx] === value) {
    return node;
  }

  if (didAlter) {
    SetRef(didAlter);
  }

  newNode = editableVNode(node, ownerID);
  if (value === undefined && idx === newNode.array.length - 1) {
    newNode.array.pop();
  } else {
    newNode.array[idx] = value;
  }
  return newNode;
}

function editableVNode(node, ownerID) {
  if (ownerID && node && ownerID === node.ownerID) {
    return node;
  }
  return new VNode(node ? node.array.slice() : [], ownerID);
}

function listNodeFor(list, rawIndex) {
  if (rawIndex >= getTailOffset(list._capacity)) {
    return list._tail;
  }
  if (rawIndex < 1 << (list._level + SHIFT)) {
    var node = list._root;
    var level = list._level;
    while (node && level > 0) {
      node = node.array[(rawIndex >>> level) & MASK];
      level -= SHIFT;
    }
    return node;
  }
}

function setListBounds(list, begin, end) {
  // Sanitize begin & end using this shorthand for ToInt32(argument)
  // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
  if (begin !== undefined) {
    begin |= 0;
  }
  if (end !== undefined) {
    end |= 0;
  }
  var owner = list.__ownerID || new OwnerID();
  var oldOrigin = list._origin;
  var oldCapacity = list._capacity;
  var newOrigin = oldOrigin + begin;
  var newCapacity =
    end === undefined
      ? oldCapacity
      : end < 0
        ? oldCapacity + end
        : oldOrigin + end;
  if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
    return list;
  }

  // If it's going to end after it starts, it's empty.
  if (newOrigin >= newCapacity) {
    return list.clear();
  }

  var newLevel = list._level;
  var newRoot = list._root;

  // New origin might need creating a higher root.
  var offsetShift = 0;
  while (newOrigin + offsetShift < 0) {
    newRoot = new VNode(
      newRoot && newRoot.array.length ? [undefined, newRoot] : [],
      owner
    );
    newLevel += SHIFT;
    offsetShift += 1 << newLevel;
  }
  if (offsetShift) {
    newOrigin += offsetShift;
    oldOrigin += offsetShift;
    newCapacity += offsetShift;
    oldCapacity += offsetShift;
  }

  var oldTailOffset = getTailOffset(oldCapacity);
  var newTailOffset = getTailOffset(newCapacity);

  // New size might need creating a higher root.
  while (newTailOffset >= 1 << (newLevel + SHIFT)) {
    newRoot = new VNode(
      newRoot && newRoot.array.length ? [newRoot] : [],
      owner
    );
    newLevel += SHIFT;
  }

  // Locate or create the new tail.
  var oldTail = list._tail;
  var newTail =
    newTailOffset < oldTailOffset
      ? listNodeFor(list, newCapacity - 1)
      : newTailOffset > oldTailOffset
        ? new VNode([], owner)
        : oldTail;

  // Merge Tail into tree.
  if (
    oldTail &&
    newTailOffset > oldTailOffset &&
    newOrigin < oldCapacity &&
    oldTail.array.length
  ) {
    newRoot = editableVNode(newRoot, owner);
    var node = newRoot;
    for (var level = newLevel; level > SHIFT; level -= SHIFT) {
      var idx = (oldTailOffset >>> level) & MASK;
      node = node.array[idx] = editableVNode(node.array[idx], owner);
    }
    node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
  }

  // If the size has been reduced, there's a chance the tail needs to be trimmed.
  if (newCapacity < oldCapacity) {
    newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
  }

  // If the new origin is within the tail, then we do not need a root.
  if (newOrigin >= newTailOffset) {
    newOrigin -= newTailOffset;
    newCapacity -= newTailOffset;
    newLevel = SHIFT;
    newRoot = null;
    newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

    // Otherwise, if the root has been trimmed, garbage collect.
  } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
    offsetShift = 0;

    // Identify the new top root node of the subtree of the old root.
    while (newRoot) {
      var beginIndex = (newOrigin >>> newLevel) & MASK;
      if ((beginIndex !== newTailOffset >>> newLevel) & MASK) {
        break;
      }
      if (beginIndex) {
        offsetShift += (1 << newLevel) * beginIndex;
      }
      newLevel -= SHIFT;
      newRoot = newRoot.array[beginIndex];
    }

    // Trim the new sides of the new root.
    if (newRoot && newOrigin > oldOrigin) {
      newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
    }
    if (newRoot && newTailOffset < oldTailOffset) {
      newRoot = newRoot.removeAfter(
        owner,
        newLevel,
        newTailOffset - offsetShift
      );
    }
    if (offsetShift) {
      newOrigin -= offsetShift;
      newCapacity -= offsetShift;
    }
  }

  if (list.__ownerID) {
    list.size = newCapacity - newOrigin;
    list._origin = newOrigin;
    list._capacity = newCapacity;
    list._level = newLevel;
    list._root = newRoot;
    list._tail = newTail;
    list.__hash = undefined;
    list.__altered = true;
    return list;
  }
  return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
}

function getTailOffset(size) {
  return size < SIZE ? 0 : ((size - 1) >>> SHIFT) << SHIFT;
}

var OrderedMap = /*@__PURE__*/(function (Map$$1) {
  function OrderedMap(value) {
    return value === null || value === undefined
      ? emptyOrderedMap()
      : isOrderedMap(value)
        ? value
        : emptyOrderedMap().withMutations(function (map) {
            var iter = KeyedCollection(value);
            assertNotInfinite(iter.size);
            iter.forEach(function (v, k) { return map.set(k, v); });
          });
  }

  if ( Map$$1 ) OrderedMap.__proto__ = Map$$1;
  OrderedMap.prototype = Object.create( Map$$1 && Map$$1.prototype );
  OrderedMap.prototype.constructor = OrderedMap;

  OrderedMap.of = function of (/*...values*/) {
    return this(arguments);
  };

  OrderedMap.prototype.toString = function toString () {
    return this.__toString('OrderedMap {', '}');
  };

  // @pragma Access

  OrderedMap.prototype.get = function get (k, notSetValue) {
    var index = this._map.get(k);
    return index !== undefined ? this._list.get(index)[1] : notSetValue;
  };

  // @pragma Modification

  OrderedMap.prototype.clear = function clear () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._map.clear();
      this._list.clear();
      return this;
    }
    return emptyOrderedMap();
  };

  OrderedMap.prototype.set = function set (k, v) {
    return updateOrderedMap(this, k, v);
  };

  OrderedMap.prototype.remove = function remove (k) {
    return updateOrderedMap(this, k, NOT_SET);
  };

  OrderedMap.prototype.wasAltered = function wasAltered () {
    return this._map.wasAltered() || this._list.wasAltered();
  };

  OrderedMap.prototype.__iterate = function __iterate (fn, reverse) {
    var this$1 = this;

    return this._list.__iterate(
      function (entry) { return entry && fn(entry[1], entry[0], this$1); },
      reverse
    );
  };

  OrderedMap.prototype.__iterator = function __iterator (type, reverse) {
    return this._list.fromEntrySeq().__iterator(type, reverse);
  };

  OrderedMap.prototype.__ensureOwner = function __ensureOwner (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    var newList = this._list.__ensureOwner(ownerID);
    if (!ownerID) {
      if (this.size === 0) {
        return emptyOrderedMap();
      }
      this.__ownerID = ownerID;
      this._map = newMap;
      this._list = newList;
      return this;
    }
    return makeOrderedMap(newMap, newList, ownerID, this.__hash);
  };

  return OrderedMap;
}(Map));

OrderedMap.isOrderedMap = isOrderedMap;

OrderedMap.prototype[IS_ORDERED_SYMBOL] = true;
OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;

function makeOrderedMap(map, list, ownerID, hash) {
  var omap = Object.create(OrderedMap.prototype);
  omap.size = map ? map.size : 0;
  omap._map = map;
  omap._list = list;
  omap.__ownerID = ownerID;
  omap.__hash = hash;
  return omap;
}

var EMPTY_ORDERED_MAP;
function emptyOrderedMap() {
  return (
    EMPTY_ORDERED_MAP ||
    (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()))
  );
}

function updateOrderedMap(omap, k, v) {
  var map = omap._map;
  var list = omap._list;
  var i = map.get(k);
  var has = i !== undefined;
  var newMap;
  var newList;
  if (v === NOT_SET) {
    // removed
    if (!has) {
      return omap;
    }
    if (list.size >= SIZE && list.size >= map.size * 2) {
      newList = list.filter(function (entry, idx) { return entry !== undefined && i !== idx; });
      newMap = newList
        .toKeyedSeq()
        .map(function (entry) { return entry[0]; })
        .flip()
        .toMap();
      if (omap.__ownerID) {
        newMap.__ownerID = newList.__ownerID = omap.__ownerID;
      }
    } else {
      newMap = map.remove(k);
      newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
    }
  } else if (has) {
    if (v === list.get(i)[1]) {
      return omap;
    }
    newMap = map;
    newList = list.set(i, [k, v]);
  } else {
    newMap = map.set(k, list.size);
    newList = list.set(list.size, [k, v]);
  }
  if (omap.__ownerID) {
    omap.size = newMap.size;
    omap._map = newMap;
    omap._list = newList;
    omap.__hash = undefined;
    return omap;
  }
  return makeOrderedMap(newMap, newList);
}

var IS_STACK_SYMBOL = '@@__IMMUTABLE_STACK__@@';

function isStack(maybeStack) {
  return Boolean(maybeStack && maybeStack[IS_STACK_SYMBOL]);
}

var Stack = /*@__PURE__*/(function (IndexedCollection$$1) {
  function Stack(value) {
    return value === null || value === undefined
      ? emptyStack()
      : isStack(value)
        ? value
        : emptyStack().pushAll(value);
  }

  if ( IndexedCollection$$1 ) Stack.__proto__ = IndexedCollection$$1;
  Stack.prototype = Object.create( IndexedCollection$$1 && IndexedCollection$$1.prototype );
  Stack.prototype.constructor = Stack;

  Stack.of = function of (/*...values*/) {
    return this(arguments);
  };

  Stack.prototype.toString = function toString () {
    return this.__toString('Stack [', ']');
  };

  // @pragma Access

  Stack.prototype.get = function get (index, notSetValue) {
    var head = this._head;
    index = wrapIndex(this, index);
    while (head && index--) {
      head = head.next;
    }
    return head ? head.value : notSetValue;
  };

  Stack.prototype.peek = function peek () {
    return this._head && this._head.value;
  };

  // @pragma Modification

  Stack.prototype.push = function push (/*...values*/) {
    var arguments$1 = arguments;

    if (arguments.length === 0) {
      return this;
    }
    var newSize = this.size + arguments.length;
    var head = this._head;
    for (var ii = arguments.length - 1; ii >= 0; ii--) {
      head = {
        value: arguments$1[ii],
        next: head,
      };
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  Stack.prototype.pushAll = function pushAll (iter) {
    iter = IndexedCollection$$1(iter);
    if (iter.size === 0) {
      return this;
    }
    if (this.size === 0 && isStack(iter)) {
      return iter;
    }
    assertNotInfinite(iter.size);
    var newSize = this.size;
    var head = this._head;
    iter.__iterate(function (value) {
      newSize++;
      head = {
        value: value,
        next: head,
      };
    }, /* reverse */ true);
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  Stack.prototype.pop = function pop () {
    return this.slice(1);
  };

  Stack.prototype.clear = function clear () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._head = undefined;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyStack();
  };

  Stack.prototype.slice = function slice (begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    var resolvedBegin = resolveBegin(begin, this.size);
    var resolvedEnd = resolveEnd(end, this.size);
    if (resolvedEnd !== this.size) {
      // super.slice(begin, end);
      return IndexedCollection$$1.prototype.slice.call(this, begin, end);
    }
    var newSize = this.size - resolvedBegin;
    var head = this._head;
    while (resolvedBegin--) {
      head = head.next;
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  // @pragma Mutability

  Stack.prototype.__ensureOwner = function __ensureOwner (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      if (this.size === 0) {
        return emptyStack();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeStack(this.size, this._head, ownerID, this.__hash);
  };

  // @pragma Iteration

  Stack.prototype.__iterate = function __iterate (fn, reverse) {
    var this$1 = this;

    if (reverse) {
      return new ArraySeq(this.toArray()).__iterate(
        function (v, k) { return fn(v, k, this$1); },
        reverse
      );
    }
    var iterations = 0;
    var node = this._head;
    while (node) {
      if (fn(node.value, iterations++, this) === false) {
        break;
      }
      node = node.next;
    }
    return iterations;
  };

  Stack.prototype.__iterator = function __iterator (type, reverse) {
    if (reverse) {
      return new ArraySeq(this.toArray()).__iterator(type, reverse);
    }
    var iterations = 0;
    var node = this._head;
    return new Iterator(function () {
      if (node) {
        var value = node.value;
        node = node.next;
        return iteratorValue(type, iterations++, value);
      }
      return iteratorDone();
    });
  };

  return Stack;
}(IndexedCollection));

Stack.isStack = isStack;

var StackPrototype = Stack.prototype;
StackPrototype[IS_STACK_SYMBOL] = true;
StackPrototype.shift = StackPrototype.pop;
StackPrototype.unshift = StackPrototype.push;
StackPrototype.unshiftAll = StackPrototype.pushAll;
StackPrototype.withMutations = withMutations;
StackPrototype.wasAltered = wasAltered;
StackPrototype.asImmutable = asImmutable;
StackPrototype['@@transducer/init'] = StackPrototype.asMutable = asMutable;
StackPrototype['@@transducer/step'] = function(result, arr) {
  return result.unshift(arr);
};
StackPrototype['@@transducer/result'] = function(obj) {
  return obj.asImmutable();
};

function makeStack(size, head, ownerID, hash) {
  var map = Object.create(StackPrototype);
  map.size = size;
  map._head = head;
  map.__ownerID = ownerID;
  map.__hash = hash;
  map.__altered = false;
  return map;
}

var EMPTY_STACK;
function emptyStack() {
  return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
}

var IS_SET_SYMBOL = '@@__IMMUTABLE_SET__@@';

function isSet(maybeSet) {
  return Boolean(maybeSet && maybeSet[IS_SET_SYMBOL]);
}

function isOrderedSet(maybeOrderedSet) {
  return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
}

function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (
    !isCollection(b) ||
    (a.size !== undefined && b.size !== undefined && a.size !== b.size) ||
    (a.__hash !== undefined &&
      b.__hash !== undefined &&
      a.__hash !== b.__hash) ||
    isKeyed(a) !== isKeyed(b) ||
    isIndexed(a) !== isIndexed(b) ||
    isOrdered(a) !== isOrdered(b)
  ) {
    return false;
  }

  if (a.size === 0 && b.size === 0) {
    return true;
  }

  var notAssociative = !isAssociative(a);

  if (isOrdered(a)) {
    var entries = a.entries();
    return (
      b.every(function (v, k) {
        var entry = entries.next().value;
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) && entries.next().done
    );
  }

  var flipped = false;

  if (a.size === undefined) {
    if (b.size === undefined) {
      if (typeof a.cacheResult === 'function') {
        a.cacheResult();
      }
    } else {
      flipped = true;
      var _ = a;
      a = b;
      b = _;
    }
  }

  var allEqual = true;
  var bSize = b.__iterate(function (v, k) {
    if (
      notAssociative
        ? !a.has(v)
        : flipped
          ? !is(v, a.get(k, NOT_SET))
          : !is(a.get(k, NOT_SET), v)
    ) {
      allEqual = false;
      return false;
    }
  });

  return allEqual && a.size === bSize;
}

/**
 * Contributes additional methods to a constructor
 */
function mixin(ctor, methods) {
  var keyCopier = function (key) {
    ctor.prototype[key] = methods[key];
  };
  Object.keys(methods).forEach(keyCopier);
  Object.getOwnPropertySymbols &&
    Object.getOwnPropertySymbols(methods).forEach(keyCopier);
  return ctor;
}

function toJS(value) {
  if (!value || typeof value !== 'object') {
    return value;
  }
  if (!isCollection(value)) {
    if (!isDataStructure(value)) {
      return value;
    }
    value = Seq(value);
  }
  if (isKeyed(value)) {
    var result$1 = {};
    value.__iterate(function (v, k) {
      result$1[k] = toJS(v);
    });
    return result$1;
  }
  var result = [];
  value.__iterate(function (v) {
    result.push(toJS(v));
  });
  return result;
}

var Set = /*@__PURE__*/(function (SetCollection$$1) {
  function Set(value) {
    return value === null || value === undefined
      ? emptySet()
      : isSet(value) && !isOrdered(value)
        ? value
        : emptySet().withMutations(function (set) {
            var iter = SetCollection$$1(value);
            assertNotInfinite(iter.size);
            iter.forEach(function (v) { return set.add(v); });
          });
  }

  if ( SetCollection$$1 ) Set.__proto__ = SetCollection$$1;
  Set.prototype = Object.create( SetCollection$$1 && SetCollection$$1.prototype );
  Set.prototype.constructor = Set;

  Set.of = function of (/*...values*/) {
    return this(arguments);
  };

  Set.fromKeys = function fromKeys (value) {
    return this(KeyedCollection(value).keySeq());
  };

  Set.intersect = function intersect (sets) {
    sets = Collection(sets).toArray();
    return sets.length
      ? SetPrototype.intersect.apply(Set(sets.pop()), sets)
      : emptySet();
  };

  Set.union = function union (sets) {
    sets = Collection(sets).toArray();
    return sets.length
      ? SetPrototype.union.apply(Set(sets.pop()), sets)
      : emptySet();
  };

  Set.prototype.toString = function toString () {
    return this.__toString('Set {', '}');
  };

  // @pragma Access

  Set.prototype.has = function has (value) {
    return this._map.has(value);
  };

  // @pragma Modification

  Set.prototype.add = function add (value) {
    return updateSet(this, this._map.set(value, value));
  };

  Set.prototype.remove = function remove (value) {
    return updateSet(this, this._map.remove(value));
  };

  Set.prototype.clear = function clear () {
    return updateSet(this, this._map.clear());
  };

  // @pragma Composition

  Set.prototype.map = function map (mapper, context) {
    var this$1 = this;

    var removes = [];
    var adds = [];
    this.forEach(function (value) {
      var mapped = mapper.call(context, value, value, this$1);
      if (mapped !== value) {
        removes.push(value);
        adds.push(mapped);
      }
    });
    return this.withMutations(function (set) {
      removes.forEach(function (value) { return set.remove(value); });
      adds.forEach(function (value) { return set.add(value); });
    });
  };

  Set.prototype.union = function union () {
    var iters = [], len = arguments.length;
    while ( len-- ) iters[ len ] = arguments[ len ];

    iters = iters.filter(function (x) { return x.size !== 0; });
    if (iters.length === 0) {
      return this;
    }
    if (this.size === 0 && !this.__ownerID && iters.length === 1) {
      return this.constructor(iters[0]);
    }
    return this.withMutations(function (set) {
      for (var ii = 0; ii < iters.length; ii++) {
        SetCollection$$1(iters[ii]).forEach(function (value) { return set.add(value); });
      }
    });
  };

  Set.prototype.intersect = function intersect () {
    var iters = [], len = arguments.length;
    while ( len-- ) iters[ len ] = arguments[ len ];

    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function (iter) { return SetCollection$$1(iter); });
    var toRemove = [];
    this.forEach(function (value) {
      if (!iters.every(function (iter) { return iter.includes(value); })) {
        toRemove.push(value);
      }
    });
    return this.withMutations(function (set) {
      toRemove.forEach(function (value) {
        set.remove(value);
      });
    });
  };

  Set.prototype.subtract = function subtract () {
    var iters = [], len = arguments.length;
    while ( len-- ) iters[ len ] = arguments[ len ];

    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function (iter) { return SetCollection$$1(iter); });
    var toRemove = [];
    this.forEach(function (value) {
      if (iters.some(function (iter) { return iter.includes(value); })) {
        toRemove.push(value);
      }
    });
    return this.withMutations(function (set) {
      toRemove.forEach(function (value) {
        set.remove(value);
      });
    });
  };

  Set.prototype.sort = function sort (comparator) {
    // Late binding
    return OrderedSet(sortFactory(this, comparator));
  };

  Set.prototype.sortBy = function sortBy (mapper, comparator) {
    // Late binding
    return OrderedSet(sortFactory(this, comparator, mapper));
  };

  Set.prototype.wasAltered = function wasAltered () {
    return this._map.wasAltered();
  };

  Set.prototype.__iterate = function __iterate (fn, reverse) {
    var this$1 = this;

    return this._map.__iterate(function (k) { return fn(k, k, this$1); }, reverse);
  };

  Set.prototype.__iterator = function __iterator (type, reverse) {
    return this._map.__iterator(type, reverse);
  };

  Set.prototype.__ensureOwner = function __ensureOwner (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    if (!ownerID) {
      if (this.size === 0) {
        return this.__empty();
      }
      this.__ownerID = ownerID;
      this._map = newMap;
      return this;
    }
    return this.__make(newMap, ownerID);
  };

  return Set;
}(SetCollection));

Set.isSet = isSet;

var SetPrototype = Set.prototype;
SetPrototype[IS_SET_SYMBOL] = true;
SetPrototype[DELETE] = SetPrototype.remove;
SetPrototype.merge = SetPrototype.concat = SetPrototype.union;
SetPrototype.withMutations = withMutations;
SetPrototype.asImmutable = asImmutable;
SetPrototype['@@transducer/init'] = SetPrototype.asMutable = asMutable;
SetPrototype['@@transducer/step'] = function(result, arr) {
  return result.add(arr);
};
SetPrototype['@@transducer/result'] = function(obj) {
  return obj.asImmutable();
};

SetPrototype.__empty = emptySet;
SetPrototype.__make = makeSet;

function updateSet(set, newMap) {
  if (set.__ownerID) {
    set.size = newMap.size;
    set._map = newMap;
    return set;
  }
  return newMap === set._map
    ? set
    : newMap.size === 0
      ? set.__empty()
      : set.__make(newMap);
}

function makeSet(map, ownerID) {
  var set = Object.create(SetPrototype);
  set.size = map ? map.size : 0;
  set._map = map;
  set.__ownerID = ownerID;
  return set;
}

var EMPTY_SET;
function emptySet() {
  return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
}

/**
 * Returns a lazy seq of nums from start (inclusive) to end
 * (exclusive), by step, where start defaults to 0, step to 1, and end to
 * infinity. When start is equal to end, returns empty list.
 */
var Range = /*@__PURE__*/(function (IndexedSeq$$1) {
  function Range(start, end, step) {
    if (!(this instanceof Range)) {
      return new Range(start, end, step);
    }
    invariant(step !== 0, 'Cannot step a Range by 0');
    start = start || 0;
    if (end === undefined) {
      end = Infinity;
    }
    step = step === undefined ? 1 : Math.abs(step);
    if (end < start) {
      step = -step;
    }
    this._start = start;
    this._end = end;
    this._step = step;
    this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
    if (this.size === 0) {
      if (EMPTY_RANGE) {
        return EMPTY_RANGE;
      }
      EMPTY_RANGE = this;
    }
  }

  if ( IndexedSeq$$1 ) Range.__proto__ = IndexedSeq$$1;
  Range.prototype = Object.create( IndexedSeq$$1 && IndexedSeq$$1.prototype );
  Range.prototype.constructor = Range;

  Range.prototype.toString = function toString () {
    if (this.size === 0) {
      return 'Range []';
    }
    return (
      'Range [ ' +
      this._start +
      '...' +
      this._end +
      (this._step !== 1 ? ' by ' + this._step : '') +
      ' ]'
    );
  };

  Range.prototype.get = function get (index, notSetValue) {
    return this.has(index)
      ? this._start + wrapIndex(this, index) * this._step
      : notSetValue;
  };

  Range.prototype.includes = function includes (searchValue) {
    var possibleIndex = (searchValue - this._start) / this._step;
    return (
      possibleIndex >= 0 &&
      possibleIndex < this.size &&
      possibleIndex === Math.floor(possibleIndex)
    );
  };

  Range.prototype.slice = function slice (begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    begin = resolveBegin(begin, this.size);
    end = resolveEnd(end, this.size);
    if (end <= begin) {
      return new Range(0, 0);
    }
    return new Range(
      this.get(begin, this._end),
      this.get(end, this._end),
      this._step
    );
  };

  Range.prototype.indexOf = function indexOf (searchValue) {
    var offsetValue = searchValue - this._start;
    if (offsetValue % this._step === 0) {
      var index = offsetValue / this._step;
      if (index >= 0 && index < this.size) {
        return index;
      }
    }
    return -1;
  };

  Range.prototype.lastIndexOf = function lastIndexOf (searchValue) {
    return this.indexOf(searchValue);
  };

  Range.prototype.__iterate = function __iterate (fn, reverse) {
    var size = this.size;
    var step = this._step;
    var value = reverse ? this._start + (size - 1) * step : this._start;
    var i = 0;
    while (i !== size) {
      if (fn(value, reverse ? size - ++i : i++, this) === false) {
        break;
      }
      value += reverse ? -step : step;
    }
    return i;
  };

  Range.prototype.__iterator = function __iterator (type, reverse) {
    var size = this.size;
    var step = this._step;
    var value = reverse ? this._start + (size - 1) * step : this._start;
    var i = 0;
    return new Iterator(function () {
      if (i === size) {
        return iteratorDone();
      }
      var v = value;
      value += reverse ? -step : step;
      return iteratorValue(type, reverse ? size - ++i : i++, v);
    });
  };

  Range.prototype.equals = function equals (other) {
    return other instanceof Range
      ? this._start === other._start &&
          this._end === other._end &&
          this._step === other._step
      : deepEqual(this, other);
  };

  return Range;
}(IndexedSeq));

var EMPTY_RANGE;

function getIn(collection, searchKeyPath, notSetValue) {
  var keyPath = coerceKeyPath(searchKeyPath);
  var i = 0;
  while (i !== keyPath.length) {
    collection = get(collection, keyPath[i++], NOT_SET);
    if (collection === NOT_SET) {
      return notSetValue;
    }
  }
  return collection;
}

function getIn$1(searchKeyPath, notSetValue) {
  return getIn(this, searchKeyPath, notSetValue);
}

function hasIn(collection, keyPath) {
  return getIn(collection, keyPath, NOT_SET) !== NOT_SET;
}

function hasIn$1(searchKeyPath) {
  return hasIn(this, searchKeyPath);
}

function toObject() {
  assertNotInfinite(this.size);
  var object = {};
  this.__iterate(function (v, k) {
    object[k] = v;
  });
  return object;
}

// Note: all of these methods are deprecated.
Collection.isIterable = isCollection;
Collection.isKeyed = isKeyed;
Collection.isIndexed = isIndexed;
Collection.isAssociative = isAssociative;
Collection.isOrdered = isOrdered;

Collection.Iterator = Iterator;

mixin(Collection, {
  // ### Conversion to other types

  toArray: function toArray() {
    assertNotInfinite(this.size);
    var array = new Array(this.size || 0);
    var useTuples = isKeyed(this);
    var i = 0;
    this.__iterate(function (v, k) {
      // Keyed collections produce an array of tuples.
      array[i++] = useTuples ? [k, v] : v;
    });
    return array;
  },

  toIndexedSeq: function toIndexedSeq() {
    return new ToIndexedSequence(this);
  },

  toJS: function toJS$1() {
    return toJS(this);
  },

  toKeyedSeq: function toKeyedSeq() {
    return new ToKeyedSequence(this, true);
  },

  toMap: function toMap() {
    // Use Late Binding here to solve the circular dependency.
    return Map(this.toKeyedSeq());
  },

  toObject: toObject,

  toOrderedMap: function toOrderedMap() {
    // Use Late Binding here to solve the circular dependency.
    return OrderedMap(this.toKeyedSeq());
  },

  toOrderedSet: function toOrderedSet() {
    // Use Late Binding here to solve the circular dependency.
    return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
  },

  toSet: function toSet() {
    // Use Late Binding here to solve the circular dependency.
    return Set(isKeyed(this) ? this.valueSeq() : this);
  },

  toSetSeq: function toSetSeq() {
    return new ToSetSequence(this);
  },

  toSeq: function toSeq() {
    return isIndexed(this)
      ? this.toIndexedSeq()
      : isKeyed(this)
        ? this.toKeyedSeq()
        : this.toSetSeq();
  },

  toStack: function toStack() {
    // Use Late Binding here to solve the circular dependency.
    return Stack(isKeyed(this) ? this.valueSeq() : this);
  },

  toList: function toList() {
    // Use Late Binding here to solve the circular dependency.
    return List(isKeyed(this) ? this.valueSeq() : this);
  },

  // ### Common JavaScript methods and properties

  toString: function toString() {
    return '[Collection]';
  },

  __toString: function __toString(head, tail) {
    if (this.size === 0) {
      return head + tail;
    }
    return (
      head +
      ' ' +
      this.toSeq()
        .map(this.__toStringMapper)
        .join(', ') +
      ' ' +
      tail
    );
  },

  // ### ES6 Collection methods (ES6 Array and Map)

  concat: function concat() {
    var values = [], len = arguments.length;
    while ( len-- ) values[ len ] = arguments[ len ];

    return reify(this, concatFactory(this, values));
  },

  includes: function includes(searchValue) {
    return this.some(function (value) { return is(value, searchValue); });
  },

  entries: function entries() {
    return this.__iterator(ITERATE_ENTRIES);
  },

  every: function every(predicate, context) {
    assertNotInfinite(this.size);
    var returnValue = true;
    this.__iterate(function (v, k, c) {
      if (!predicate.call(context, v, k, c)) {
        returnValue = false;
        return false;
      }
    });
    return returnValue;
  },

  filter: function filter(predicate, context) {
    return reify(this, filterFactory(this, predicate, context, true));
  },

  find: function find(predicate, context, notSetValue) {
    var entry = this.findEntry(predicate, context);
    return entry ? entry[1] : notSetValue;
  },

  forEach: function forEach(sideEffect, context) {
    assertNotInfinite(this.size);
    return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
  },

  join: function join(separator) {
    assertNotInfinite(this.size);
    separator = separator !== undefined ? '' + separator : ',';
    var joined = '';
    var isFirst = true;
    this.__iterate(function (v) {
      isFirst ? (isFirst = false) : (joined += separator);
      joined += v !== null && v !== undefined ? v.toString() : '';
    });
    return joined;
  },

  keys: function keys() {
    return this.__iterator(ITERATE_KEYS);
  },

  map: function map(mapper, context) {
    return reify(this, mapFactory(this, mapper, context));
  },

  reduce: function reduce$1(reducer, initialReduction, context) {
    return reduce(
      this,
      reducer,
      initialReduction,
      context,
      arguments.length < 2,
      false
    );
  },

  reduceRight: function reduceRight(reducer, initialReduction, context) {
    return reduce(
      this,
      reducer,
      initialReduction,
      context,
      arguments.length < 2,
      true
    );
  },

  reverse: function reverse() {
    return reify(this, reverseFactory(this, true));
  },

  slice: function slice(begin, end) {
    return reify(this, sliceFactory(this, begin, end, true));
  },

  some: function some(predicate, context) {
    return !this.every(not(predicate), context);
  },

  sort: function sort(comparator) {
    return reify(this, sortFactory(this, comparator));
  },

  values: function values() {
    return this.__iterator(ITERATE_VALUES);
  },

  // ### More sequential methods

  butLast: function butLast() {
    return this.slice(0, -1);
  },

  isEmpty: function isEmpty() {
    return this.size !== undefined ? this.size === 0 : !this.some(function () { return true; });
  },

  count: function count(predicate, context) {
    return ensureSize(
      predicate ? this.toSeq().filter(predicate, context) : this
    );
  },

  countBy: function countBy(grouper, context) {
    return countByFactory(this, grouper, context);
  },

  equals: function equals(other) {
    return deepEqual(this, other);
  },

  entrySeq: function entrySeq() {
    var collection = this;
    if (collection._cache) {
      // We cache as an entries array, so we can just return the cache!
      return new ArraySeq(collection._cache);
    }
    var entriesSequence = collection
      .toSeq()
      .map(entryMapper)
      .toIndexedSeq();
    entriesSequence.fromEntrySeq = function () { return collection.toSeq(); };
    return entriesSequence;
  },

  filterNot: function filterNot(predicate, context) {
    return this.filter(not(predicate), context);
  },

  findEntry: function findEntry(predicate, context, notSetValue) {
    var found = notSetValue;
    this.__iterate(function (v, k, c) {
      if (predicate.call(context, v, k, c)) {
        found = [k, v];
        return false;
      }
    });
    return found;
  },

  findKey: function findKey(predicate, context) {
    var entry = this.findEntry(predicate, context);
    return entry && entry[0];
  },

  findLast: function findLast(predicate, context, notSetValue) {
    return this.toKeyedSeq()
      .reverse()
      .find(predicate, context, notSetValue);
  },

  findLastEntry: function findLastEntry(predicate, context, notSetValue) {
    return this.toKeyedSeq()
      .reverse()
      .findEntry(predicate, context, notSetValue);
  },

  findLastKey: function findLastKey(predicate, context) {
    return this.toKeyedSeq()
      .reverse()
      .findKey(predicate, context);
  },

  first: function first(notSetValue) {
    return this.find(returnTrue, null, notSetValue);
  },

  flatMap: function flatMap(mapper, context) {
    return reify(this, flatMapFactory(this, mapper, context));
  },

  flatten: function flatten(depth) {
    return reify(this, flattenFactory(this, depth, true));
  },

  fromEntrySeq: function fromEntrySeq() {
    return new FromEntriesSequence(this);
  },

  get: function get(searchKey, notSetValue) {
    return this.find(function (_, key) { return is(key, searchKey); }, undefined, notSetValue);
  },

  getIn: getIn$1,

  groupBy: function groupBy(grouper, context) {
    return groupByFactory(this, grouper, context);
  },

  has: function has(searchKey) {
    return this.get(searchKey, NOT_SET) !== NOT_SET;
  },

  hasIn: hasIn$1,

  isSubset: function isSubset(iter) {
    iter = typeof iter.includes === 'function' ? iter : Collection(iter);
    return this.every(function (value) { return iter.includes(value); });
  },

  isSuperset: function isSuperset(iter) {
    iter = typeof iter.isSubset === 'function' ? iter : Collection(iter);
    return iter.isSubset(this);
  },

  keyOf: function keyOf(searchValue) {
    return this.findKey(function (value) { return is(value, searchValue); });
  },

  keySeq: function keySeq() {
    return this.toSeq()
      .map(keyMapper)
      .toIndexedSeq();
  },

  last: function last(notSetValue) {
    return this.toSeq()
      .reverse()
      .first(notSetValue);
  },

  lastKeyOf: function lastKeyOf(searchValue) {
    return this.toKeyedSeq()
      .reverse()
      .keyOf(searchValue);
  },

  max: function max(comparator) {
    return maxFactory(this, comparator);
  },

  maxBy: function maxBy(mapper, comparator) {
    return maxFactory(this, comparator, mapper);
  },

  min: function min(comparator) {
    return maxFactory(
      this,
      comparator ? neg(comparator) : defaultNegComparator
    );
  },

  minBy: function minBy(mapper, comparator) {
    return maxFactory(
      this,
      comparator ? neg(comparator) : defaultNegComparator,
      mapper
    );
  },

  rest: function rest() {
    return this.slice(1);
  },

  skip: function skip(amount) {
    return amount === 0 ? this : this.slice(Math.max(0, amount));
  },

  skipLast: function skipLast(amount) {
    return amount === 0 ? this : this.slice(0, -Math.max(0, amount));
  },

  skipWhile: function skipWhile(predicate, context) {
    return reify(this, skipWhileFactory(this, predicate, context, true));
  },

  skipUntil: function skipUntil(predicate, context) {
    return this.skipWhile(not(predicate), context);
  },

  sortBy: function sortBy(mapper, comparator) {
    return reify(this, sortFactory(this, comparator, mapper));
  },

  take: function take(amount) {
    return this.slice(0, Math.max(0, amount));
  },

  takeLast: function takeLast(amount) {
    return this.slice(-Math.max(0, amount));
  },

  takeWhile: function takeWhile(predicate, context) {
    return reify(this, takeWhileFactory(this, predicate, context));
  },

  takeUntil: function takeUntil(predicate, context) {
    return this.takeWhile(not(predicate), context);
  },

  update: function update(fn) {
    return fn(this);
  },

  valueSeq: function valueSeq() {
    return this.toIndexedSeq();
  },

  // ### Hashable Object

  hashCode: function hashCode() {
    return this.__hash || (this.__hash = hashCollection(this));
  },

  // ### Internal

  // abstract __iterate(fn, reverse)

  // abstract __iterator(type, reverse)
});

var CollectionPrototype = Collection.prototype;
CollectionPrototype[IS_COLLECTION_SYMBOL] = true;
CollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.values;
CollectionPrototype.toJSON = CollectionPrototype.toArray;
CollectionPrototype.__toStringMapper = quoteString;
CollectionPrototype.inspect = CollectionPrototype.toSource = function() {
  return this.toString();
};
CollectionPrototype.chain = CollectionPrototype.flatMap;
CollectionPrototype.contains = CollectionPrototype.includes;

mixin(KeyedCollection, {
  // ### More sequential methods

  flip: function flip() {
    return reify(this, flipFactory(this));
  },

  mapEntries: function mapEntries(mapper, context) {
    var this$1 = this;

    var iterations = 0;
    return reify(
      this,
      this.toSeq()
        .map(function (v, k) { return mapper.call(context, [k, v], iterations++, this$1); })
        .fromEntrySeq()
    );
  },

  mapKeys: function mapKeys(mapper, context) {
    var this$1 = this;

    return reify(
      this,
      this.toSeq()
        .flip()
        .map(function (k, v) { return mapper.call(context, k, v, this$1); })
        .flip()
    );
  },
});

var KeyedCollectionPrototype = KeyedCollection.prototype;
KeyedCollectionPrototype[IS_KEYED_SYMBOL] = true;
KeyedCollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.entries;
KeyedCollectionPrototype.toJSON = toObject;
KeyedCollectionPrototype.__toStringMapper = function (v, k) { return quoteString(k) + ': ' + quoteString(v); };

mixin(IndexedCollection, {
  // ### Conversion to other types

  toKeyedSeq: function toKeyedSeq() {
    return new ToKeyedSequence(this, false);
  },

  // ### ES6 Collection methods (ES6 Array and Map)

  filter: function filter(predicate, context) {
    return reify(this, filterFactory(this, predicate, context, false));
  },

  findIndex: function findIndex(predicate, context) {
    var entry = this.findEntry(predicate, context);
    return entry ? entry[0] : -1;
  },

  indexOf: function indexOf(searchValue) {
    var key = this.keyOf(searchValue);
    return key === undefined ? -1 : key;
  },

  lastIndexOf: function lastIndexOf(searchValue) {
    var key = this.lastKeyOf(searchValue);
    return key === undefined ? -1 : key;
  },

  reverse: function reverse() {
    return reify(this, reverseFactory(this, false));
  },

  slice: function slice(begin, end) {
    return reify(this, sliceFactory(this, begin, end, false));
  },

  splice: function splice(index, removeNum /*, ...values*/) {
    var numArgs = arguments.length;
    removeNum = Math.max(removeNum || 0, 0);
    if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
      return this;
    }
    // If index is negative, it should resolve relative to the size of the
    // collection. However size may be expensive to compute if not cached, so
    // only call count() if the number is in fact negative.
    index = resolveBegin(index, index < 0 ? this.count() : this.size);
    var spliced = this.slice(0, index);
    return reify(
      this,
      numArgs === 1
        ? spliced
        : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
    );
  },

  // ### More collection methods

  findLastIndex: function findLastIndex(predicate, context) {
    var entry = this.findLastEntry(predicate, context);
    return entry ? entry[0] : -1;
  },

  first: function first(notSetValue) {
    return this.get(0, notSetValue);
  },

  flatten: function flatten(depth) {
    return reify(this, flattenFactory(this, depth, false));
  },

  get: function get(index, notSetValue) {
    index = wrapIndex(this, index);
    return index < 0 ||
      (this.size === Infinity || (this.size !== undefined && index > this.size))
      ? notSetValue
      : this.find(function (_, key) { return key === index; }, undefined, notSetValue);
  },

  has: function has(index) {
    index = wrapIndex(this, index);
    return (
      index >= 0 &&
      (this.size !== undefined
        ? this.size === Infinity || index < this.size
        : this.indexOf(index) !== -1)
    );
  },

  interpose: function interpose(separator) {
    return reify(this, interposeFactory(this, separator));
  },

  interleave: function interleave(/*...collections*/) {
    var collections = [this].concat(arrCopy(arguments));
    var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, collections);
    var interleaved = zipped.flatten(true);
    if (zipped.size) {
      interleaved.size = zipped.size * collections.length;
    }
    return reify(this, interleaved);
  },

  keySeq: function keySeq() {
    return Range(0, this.size);
  },

  last: function last(notSetValue) {
    return this.get(-1, notSetValue);
  },

  skipWhile: function skipWhile(predicate, context) {
    return reify(this, skipWhileFactory(this, predicate, context, false));
  },

  zip: function zip(/*, ...collections */) {
    var collections = [this].concat(arrCopy(arguments));
    return reify(this, zipWithFactory(this, defaultZipper, collections));
  },

  zipAll: function zipAll(/*, ...collections */) {
    var collections = [this].concat(arrCopy(arguments));
    return reify(this, zipWithFactory(this, defaultZipper, collections, true));
  },

  zipWith: function zipWith(zipper /*, ...collections */) {
    var collections = arrCopy(arguments);
    collections[0] = this;
    return reify(this, zipWithFactory(this, zipper, collections));
  },
});

var IndexedCollectionPrototype = IndexedCollection.prototype;
IndexedCollectionPrototype[IS_INDEXED_SYMBOL] = true;
IndexedCollectionPrototype[IS_ORDERED_SYMBOL] = true;

mixin(SetCollection, {
  // ### ES6 Collection methods (ES6 Array and Map)

  get: function get(value, notSetValue) {
    return this.has(value) ? value : notSetValue;
  },

  includes: function includes(value) {
    return this.has(value);
  },

  // ### More sequential methods

  keySeq: function keySeq() {
    return this.valueSeq();
  },
});

SetCollection.prototype.has = CollectionPrototype.includes;
SetCollection.prototype.contains = SetCollection.prototype.includes;

// Mixin subclasses

mixin(KeyedSeq, KeyedCollection.prototype);
mixin(IndexedSeq, IndexedCollection.prototype);
mixin(SetSeq, SetCollection.prototype);

// #pragma Helper functions

function reduce(collection, reducer, reduction, context, useFirst, reverse) {
  assertNotInfinite(collection.size);
  collection.__iterate(function (v, k, c) {
    if (useFirst) {
      useFirst = false;
      reduction = v;
    } else {
      reduction = reducer.call(context, reduction, v, k, c);
    }
  }, reverse);
  return reduction;
}

function keyMapper(v, k) {
  return k;
}

function entryMapper(v, k) {
  return [k, v];
}

function not(predicate) {
  return function() {
    return !predicate.apply(this, arguments);
  };
}

function neg(predicate) {
  return function() {
    return -predicate.apply(this, arguments);
  };
}

function defaultZipper() {
  return arrCopy(arguments);
}

function defaultNegComparator(a, b) {
  return a < b ? 1 : a > b ? -1 : 0;
}

function hashCollection(collection) {
  if (collection.size === Infinity) {
    return 0;
  }
  var ordered = isOrdered(collection);
  var keyed = isKeyed(collection);
  var h = ordered ? 1 : 0;
  var size = collection.__iterate(
    keyed
      ? ordered
        ? function (v, k) {
            h = (31 * h + hashMerge(hash(v), hash(k))) | 0;
          }
        : function (v, k) {
            h = (h + hashMerge(hash(v), hash(k))) | 0;
          }
      : ordered
        ? function (v) {
            h = (31 * h + hash(v)) | 0;
          }
        : function (v) {
            h = (h + hash(v)) | 0;
          }
  );
  return murmurHashOfSize(size, h);
}

function murmurHashOfSize(size, h) {
  h = imul(h, 0xcc9e2d51);
  h = imul((h << 15) | (h >>> -15), 0x1b873593);
  h = imul((h << 13) | (h >>> -13), 5);
  h = ((h + 0xe6546b64) | 0) ^ size;
  h = imul(h ^ (h >>> 16), 0x85ebca6b);
  h = imul(h ^ (h >>> 13), 0xc2b2ae35);
  h = smi(h ^ (h >>> 16));
  return h;
}

function hashMerge(a, b) {
  return (a ^ (b + 0x9e3779b9 + (a << 6) + (a >> 2))) | 0; // int
}

var OrderedSet = /*@__PURE__*/(function (Set$$1) {
  function OrderedSet(value) {
    return value === null || value === undefined
      ? emptyOrderedSet()
      : isOrderedSet(value)
        ? value
        : emptyOrderedSet().withMutations(function (set) {
            var iter = SetCollection(value);
            assertNotInfinite(iter.size);
            iter.forEach(function (v) { return set.add(v); });
          });
  }

  if ( Set$$1 ) OrderedSet.__proto__ = Set$$1;
  OrderedSet.prototype = Object.create( Set$$1 && Set$$1.prototype );
  OrderedSet.prototype.constructor = OrderedSet;

  OrderedSet.of = function of (/*...values*/) {
    return this(arguments);
  };

  OrderedSet.fromKeys = function fromKeys (value) {
    return this(KeyedCollection(value).keySeq());
  };

  OrderedSet.prototype.toString = function toString () {
    return this.__toString('OrderedSet {', '}');
  };

  return OrderedSet;
}(Set));

OrderedSet.isOrderedSet = isOrderedSet;

var OrderedSetPrototype = OrderedSet.prototype;
OrderedSetPrototype[IS_ORDERED_SYMBOL] = true;
OrderedSetPrototype.zip = IndexedCollectionPrototype.zip;
OrderedSetPrototype.zipWith = IndexedCollectionPrototype.zipWith;

OrderedSetPrototype.__empty = emptyOrderedSet;
OrderedSetPrototype.__make = makeOrderedSet;

function makeOrderedSet(map, ownerID) {
  var set = Object.create(OrderedSetPrototype);
  set.size = map ? map.size : 0;
  set._map = map;
  set.__ownerID = ownerID;
  return set;
}

var EMPTY_ORDERED_SET;
function emptyOrderedSet() {
  return (
    EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()))
  );
}

var Record = function Record(defaultValues, name) {
  var hasInitialized;

  var RecordType = function Record(values) {
    var this$1 = this;

    if (values instanceof RecordType) {
      return values;
    }
    if (!(this instanceof RecordType)) {
      return new RecordType(values);
    }
    if (!hasInitialized) {
      hasInitialized = true;
      var keys = Object.keys(defaultValues);
      var indices = (RecordTypePrototype._indices = {});
      // Deprecated: left to attempt not to break any external code which
      // relies on a ._name property existing on record instances.
      // Use Record.getDescriptiveName() instead
      RecordTypePrototype._name = name;
      RecordTypePrototype._keys = keys;
      RecordTypePrototype._defaultValues = defaultValues;
      for (var i = 0; i < keys.length; i++) {
        var propName = keys[i];
        indices[propName] = i;
        if (RecordTypePrototype[propName]) {
          /* eslint-disable no-console */
          typeof console === 'object' &&
            console.warn &&
            console.warn(
              'Cannot define ' +
                recordName(this) +
                ' with property "' +
                propName +
                '" since that property name is part of the Record API.'
            );
          /* eslint-enable no-console */
        } else {
          setProp(RecordTypePrototype, propName);
        }
      }
    }
    this.__ownerID = undefined;
    this._values = List().withMutations(function (l) {
      l.setSize(this$1._keys.length);
      KeyedCollection(values).forEach(function (v, k) {
        l.set(this$1._indices[k], v === this$1._defaultValues[k] ? undefined : v);
      });
    });
  };

  var RecordTypePrototype = (RecordType.prototype = Object.create(
    RecordPrototype
  ));
  RecordTypePrototype.constructor = RecordType;

  if (name) {
    RecordType.displayName = name;
  }

  return RecordType;
};

Record.prototype.toString = function toString () {
  var str = recordName(this) + ' { ';
  var keys = this._keys;
  var k;
  for (var i = 0, l = keys.length; i !== l; i++) {
    k = keys[i];
    str += (i ? ', ' : '') + k + ': ' + quoteString(this.get(k));
  }
  return str + ' }';
};

Record.prototype.equals = function equals (other) {
  return (
    this === other ||
    (other &&
      this._keys === other._keys &&
      recordSeq(this).equals(recordSeq(other)))
  );
};

Record.prototype.hashCode = function hashCode () {
  return recordSeq(this).hashCode();
};

// @pragma Access

Record.prototype.has = function has (k) {
  return this._indices.hasOwnProperty(k);
};

Record.prototype.get = function get (k, notSetValue) {
  if (!this.has(k)) {
    return notSetValue;
  }
  var index = this._indices[k];
  var value = this._values.get(index);
  return value === undefined ? this._defaultValues[k] : value;
};

// @pragma Modification

Record.prototype.set = function set (k, v) {
  if (this.has(k)) {
    var newValues = this._values.set(
      this._indices[k],
      v === this._defaultValues[k] ? undefined : v
    );
    if (newValues !== this._values && !this.__ownerID) {
      return makeRecord(this, newValues);
    }
  }
  return this;
};

Record.prototype.remove = function remove (k) {
  return this.set(k);
};

Record.prototype.clear = function clear () {
  var newValues = this._values.clear().setSize(this._keys.length);
  return this.__ownerID ? this : makeRecord(this, newValues);
};

Record.prototype.wasAltered = function wasAltered () {
  return this._values.wasAltered();
};

Record.prototype.toSeq = function toSeq () {
  return recordSeq(this);
};

Record.prototype.toJS = function toJS$1 () {
  return toJS(this);
};

Record.prototype.entries = function entries () {
  return this.__iterator(ITERATE_ENTRIES);
};

Record.prototype.__iterator = function __iterator (type, reverse) {
  return recordSeq(this).__iterator(type, reverse);
};

Record.prototype.__iterate = function __iterate (fn, reverse) {
  return recordSeq(this).__iterate(fn, reverse);
};

Record.prototype.__ensureOwner = function __ensureOwner (ownerID) {
  if (ownerID === this.__ownerID) {
    return this;
  }
  var newValues = this._values.__ensureOwner(ownerID);
  if (!ownerID) {
    this.__ownerID = ownerID;
    this._values = newValues;
    return this;
  }
  return makeRecord(this, newValues, ownerID);
};

Record.isRecord = isRecord;
Record.getDescriptiveName = recordName;
var RecordPrototype = Record.prototype;
RecordPrototype[IS_RECORD_SYMBOL] = true;
RecordPrototype[DELETE] = RecordPrototype.remove;
RecordPrototype.deleteIn = RecordPrototype.removeIn = deleteIn;
RecordPrototype.getIn = getIn$1;
RecordPrototype.hasIn = CollectionPrototype.hasIn;
RecordPrototype.merge = merge;
RecordPrototype.mergeWith = mergeWith;
RecordPrototype.mergeIn = mergeIn;
RecordPrototype.mergeDeep = mergeDeep$1;
RecordPrototype.mergeDeepWith = mergeDeepWith$1;
RecordPrototype.mergeDeepIn = mergeDeepIn;
RecordPrototype.setIn = setIn$1;
RecordPrototype.update = update$1;
RecordPrototype.updateIn = updateIn$1;
RecordPrototype.withMutations = withMutations;
RecordPrototype.asMutable = asMutable;
RecordPrototype.asImmutable = asImmutable;
RecordPrototype[ITERATOR_SYMBOL] = RecordPrototype.entries;
RecordPrototype.toJSON = RecordPrototype.toObject =
  CollectionPrototype.toObject;
RecordPrototype.inspect = RecordPrototype.toSource = function() {
  return this.toString();
};

function makeRecord(likeRecord, values, ownerID) {
  var record = Object.create(Object.getPrototypeOf(likeRecord));
  record._values = values;
  record.__ownerID = ownerID;
  return record;
}

function recordName(record) {
  return record.constructor.displayName || record.constructor.name || 'Record';
}

function recordSeq(record) {
  return keyedSeqFromValue(record._keys.map(function (k) { return [k, record.get(k)]; }));
}

function setProp(prototype, name) {
  try {
    Object.defineProperty(prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        invariant(this.__ownerID, 'Cannot set on an immutable record.');
        this.set(name, value);
      },
    });
  } catch (error) {
    // Object.defineProperty failed. Probably IE8.
  }
}

/**
 * Returns a lazy Seq of `value` repeated `times` times. When `times` is
 * undefined, returns an infinite sequence of `value`.
 */
var Repeat = /*@__PURE__*/(function (IndexedSeq$$1) {
  function Repeat(value, times) {
    if (!(this instanceof Repeat)) {
      return new Repeat(value, times);
    }
    this._value = value;
    this.size = times === undefined ? Infinity : Math.max(0, times);
    if (this.size === 0) {
      if (EMPTY_REPEAT) {
        return EMPTY_REPEAT;
      }
      EMPTY_REPEAT = this;
    }
  }

  if ( IndexedSeq$$1 ) Repeat.__proto__ = IndexedSeq$$1;
  Repeat.prototype = Object.create( IndexedSeq$$1 && IndexedSeq$$1.prototype );
  Repeat.prototype.constructor = Repeat;

  Repeat.prototype.toString = function toString () {
    if (this.size === 0) {
      return 'Repeat []';
    }
    return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
  };

  Repeat.prototype.get = function get (index, notSetValue) {
    return this.has(index) ? this._value : notSetValue;
  };

  Repeat.prototype.includes = function includes (searchValue) {
    return is(this._value, searchValue);
  };

  Repeat.prototype.slice = function slice (begin, end) {
    var size = this.size;
    return wholeSlice(begin, end, size)
      ? this
      : new Repeat(
          this._value,
          resolveEnd(end, size) - resolveBegin(begin, size)
        );
  };

  Repeat.prototype.reverse = function reverse () {
    return this;
  };

  Repeat.prototype.indexOf = function indexOf (searchValue) {
    if (is(this._value, searchValue)) {
      return 0;
    }
    return -1;
  };

  Repeat.prototype.lastIndexOf = function lastIndexOf (searchValue) {
    if (is(this._value, searchValue)) {
      return this.size;
    }
    return -1;
  };

  Repeat.prototype.__iterate = function __iterate (fn, reverse) {
    var size = this.size;
    var i = 0;
    while (i !== size) {
      if (fn(this._value, reverse ? size - ++i : i++, this) === false) {
        break;
      }
    }
    return i;
  };

  Repeat.prototype.__iterator = function __iterator (type, reverse) {
    var this$1 = this;

    var size = this.size;
    var i = 0;
    return new Iterator(
      function () { return i === size
          ? iteratorDone()
          : iteratorValue(type, reverse ? size - ++i : i++, this$1._value); }
    );
  };

  Repeat.prototype.equals = function equals (other) {
    return other instanceof Repeat
      ? is(this._value, other._value)
      : deepEqual(other);
  };

  return Repeat;
}(IndexedSeq));

var EMPTY_REPEAT;

function fromJS(value, converter) {
  return fromJSWith(
    [],
    converter || defaultConverter,
    value,
    '',
    converter && converter.length > 2 ? [] : undefined,
    { '': value }
  );
}

function fromJSWith(stack, converter, value, key, keyPath, parentValue) {
  var toSeq = Array.isArray(value)
    ? IndexedSeq
    : isPlainObj(value)
      ? KeyedSeq
      : null;
  if (toSeq) {
    if (~stack.indexOf(value)) {
      throw new TypeError('Cannot convert circular structure to Immutable');
    }
    stack.push(value);
    keyPath && key !== '' && keyPath.push(key);
    var converted = converter.call(
      parentValue,
      key,
      toSeq(value).map(function (v, k) { return fromJSWith(stack, converter, v, k, keyPath, value); }
      ),
      keyPath && keyPath.slice()
    );
    stack.pop();
    keyPath && keyPath.pop();
    return converted;
  }
  return value;
}

function defaultConverter(k, v) {
  return isKeyed(v) ? v.toMap() : v.toList();
}

var version = "4.0.0-rc.11";

var Immutable = {
  version: version,

  Collection: Collection,
  // Note: Iterable is deprecated
  Iterable: Collection,

  Seq: Seq,
  Map: Map,
  OrderedMap: OrderedMap,
  List: List,
  Stack: Stack,
  Set: Set,
  OrderedSet: OrderedSet,

  Record: Record,
  Range: Range,
  Repeat: Repeat,

  is: is,
  fromJS: fromJS,
  hash: hash,

  isImmutable: isImmutable,
  isCollection: isCollection,
  isKeyed: isKeyed,
  isIndexed: isIndexed,
  isAssociative: isAssociative,
  isOrdered: isOrdered,
  isValueObject: isValueObject,
  isSeq: isSeq,
  isList: isList,
  isMap: isMap,
  isOrderedMap: isOrderedMap,
  isStack: isStack,
  isSet: isSet,
  isOrderedSet: isOrderedSet,
  isRecord: isRecord,

  get: get,
  getIn: getIn,
  has: has,
  hasIn: hasIn,
  merge: merge$1,
  mergeDeep: mergeDeep,
  mergeWith: mergeWith$1,
  mergeDeepWith: mergeDeepWith,
  remove: remove,
  removeIn: removeIn,
  set: set,
  setIn: setIn,
  update: update,
  updateIn: updateIn,
};

// Note: Iterable is deprecated
var Iterable = Collection;

/* harmony default export */ __webpack_exports__["default"] = (Immutable);



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

/***/ "./node_modules/rememo/es/rememo.js":
/*!******************************************!*\
  !*** ./node_modules/rememo/es/rememo.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


var LEAF_KEY, hasWeakMap;

/**
 * Arbitrary value used as key for referencing cache object in WeakMap tree.
 *
 * @type {Object}
 */
LEAF_KEY = {};

/**
 * Whether environment supports WeakMap.
 *
 * @type {boolean}
 */
hasWeakMap = typeof WeakMap !== 'undefined';

/**
 * Returns the first argument as the sole entry in an array.
 *
 * @param {*} value Value to return.
 *
 * @return {Array} Value returned as entry in array.
 */
function arrayOf( value ) {
	return [ value ];
}

/**
 * Returns true if the value passed is object-like, or false otherwise. A value
 * is object-like if it can support property assignment, e.g. object or array.
 *
 * @param {*} value Value to test.
 *
 * @return {boolean} Whether value is object-like.
 */
function isObjectLike( value ) {
	return !! value && 'object' === typeof value;
}

/**
 * Creates and returns a new cache object.
 *
 * @return {Object} Cache object.
 */
function createCache() {
	var cache = {
		clear: function() {
			cache.head = null;
		},
	};

	return cache;
}

/**
 * Returns true if entries within the two arrays are strictly equal by
 * reference from a starting index.
 *
 * @param {Array}  a         First array.
 * @param {Array}  b         Second array.
 * @param {number} fromIndex Index from which to start comparison.
 *
 * @return {boolean} Whether arrays are shallowly equal.
 */
function isShallowEqual( a, b, fromIndex ) {
	var i;

	if ( a.length !== b.length ) {
		return false;
	}

	for ( i = fromIndex; i < a.length; i++ ) {
		if ( a[ i ] !== b[ i ] ) {
			return false;
		}
	}

	return true;
}

/**
 * Returns a memoized selector function. The getDependants function argument is
 * called before the memoized selector and is expected to return an immutable
 * reference or array of references on which the selector depends for computing
 * its own return value. The memoize cache is preserved only as long as those
 * dependant references remain the same. If getDependants returns a different
 * reference(s), the cache is cleared and the selector value regenerated.
 *
 * @param {Function} selector      Selector function.
 * @param {Function} getDependants Dependant getter returning an immutable
 *                                 reference or array of reference used in
 *                                 cache bust consideration.
 *
 * @return {Function} Memoized selector.
 */
/* harmony default export */ __webpack_exports__["default"] = (function( selector, getDependants ) {
	var rootCache, getCache;

	// Use object source as dependant if getter not provided
	if ( ! getDependants ) {
		getDependants = arrayOf;
	}

	/**
	 * Returns the root cache. If WeakMap is supported, this is assigned to the
	 * root WeakMap cache set, otherwise it is a shared instance of the default
	 * cache object.
	 *
	 * @return {(WeakMap|Object)} Root cache object.
	 */
	function getRootCache() {
		return rootCache;
	}

	/**
	 * Returns the cache for a given dependants array. When possible, a WeakMap
	 * will be used to create a unique cache for each set of dependants. This
	 * is feasible due to the nature of WeakMap in allowing garbage collection
	 * to occur on entries where the key object is no longer referenced. Since
	 * WeakMap requires the key to be an object, this is only possible when the
	 * dependant is object-like. The root cache is created as a hierarchy where
	 * each top-level key is the first entry in a dependants set, the value a
	 * WeakMap where each key is the next dependant, and so on. This continues
	 * so long as the dependants are object-like. If no dependants are object-
	 * like, then the cache is shared across all invocations.
	 *
	 * @see isObjectLike
	 *
	 * @param {Array} dependants Selector dependants.
	 *
	 * @return {Object} Cache object.
	 */
	function getWeakMapCache( dependants ) {
		var caches = rootCache,
			isUniqueByDependants = true,
			i, dependant, map, cache;

		for ( i = 0; i < dependants.length; i++ ) {
			dependant = dependants[ i ];

			// Can only compose WeakMap from object-like key.
			if ( ! isObjectLike( dependant ) ) {
				isUniqueByDependants = false;
				break;
			}

			// Does current segment of cache already have a WeakMap?
			if ( caches.has( dependant ) ) {
				// Traverse into nested WeakMap.
				caches = caches.get( dependant );
			} else {
				// Create, set, and traverse into a new one.
				map = new WeakMap();
				caches.set( dependant, map );
				caches = map;
			}
		}

		// We use an arbitrary (but consistent) object as key for the last item
		// in the WeakMap to serve as our running cache.
		if ( ! caches.has( LEAF_KEY ) ) {
			cache = createCache();
			cache.isUniqueByDependants = isUniqueByDependants;
			caches.set( LEAF_KEY, cache );
		}

		return caches.get( LEAF_KEY );
	}

	// Assign cache handler by availability of WeakMap
	getCache = hasWeakMap ? getWeakMapCache : getRootCache;

	/**
	 * Resets root memoization cache.
	 */
	function clear() {
		rootCache = hasWeakMap ? new WeakMap() : createCache();
	}

	// eslint-disable-next-line jsdoc/check-param-names
	/**
	 * The augmented selector call, considering first whether dependants have
	 * changed before passing it to underlying memoize function.
	 *
	 * @param {Object} source    Source object for derivation.
	 * @param {...*}   extraArgs Additional arguments to pass to selector.
	 *
	 * @return {*} Selector result.
	 */
	function callSelector( /* source, ...extraArgs */ ) {
		var len = arguments.length,
			cache, node, i, args, dependants;

		// Create copy of arguments (avoid leaking deoptimization).
		args = new Array( len );
		for ( i = 0; i < len; i++ ) {
			args[ i ] = arguments[ i ];
		}

		dependants = getDependants.apply( null, args );
		cache = getCache( dependants );

		// If not guaranteed uniqueness by dependants (primitive type or lack
		// of WeakMap support), shallow compare against last dependants and, if
		// references have changed, destroy cache to recalculate result.
		if ( ! cache.isUniqueByDependants ) {
			if ( cache.lastDependants && ! isShallowEqual( dependants, cache.lastDependants, 0 ) ) {
				cache.clear();
			}

			cache.lastDependants = dependants;
		}

		node = cache.head;
		while ( node ) {
			// Check whether node arguments match arguments
			if ( ! isShallowEqual( node.args, args, 1 ) ) {
				node = node.next;
				continue;
			}

			// At this point we can assume we've found a match

			// Surface matched node to head if not already
			if ( node !== cache.head ) {
				// Adjust siblings to point to each other.
				node.prev.next = node.next;
				if ( node.next ) {
					node.next.prev = node.prev;
				}

				node.next = cache.head;
				node.prev = null;
				cache.head.prev = node;
				cache.head = node;
			}

			// Return immediately
			return node.val;
		}

		// No cached value found. Continue to insertion phase:

		node = {
			// Generate the result from original function
			val: selector.apply( null, args ),
		};

		// Avoid including the source object in the cache.
		args[ 0 ] = null;
		node.args = args;

		// Don't need to check whether node is already head, since it would
		// have been returned above already if it was

		// Shift existing head down list
		if ( cache.head ) {
			cache.head.prev = node;
			node.next = cache.head;
		}

		cache.head = node;

		return node.val;
	}

	callSelector.getDependants = getDependants;
	callSelector.clear = clear;
	clear();

	return callSelector;
});


/***/ }),

/***/ "@babel/runtime/regenerator":
/*!**********************************************!*\
  !*** external {"this":"regeneratorRuntime"} ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["regeneratorRuntime"]; }());

/***/ }),

/***/ "@eventespresso/helpers":
/*!********************************************!*\
  !*** external {"this":["eejs","helpers"]} ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["helpers"]; }());

/***/ }),

/***/ "@eventespresso/model":
/*!******************************************!*\
  !*** external {"this":["eejs","model"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["model"]; }());

/***/ }),

/***/ "@eventespresso/validators":
/*!***********************************************!*\
  !*** external {"this":["eejs","validators"]} ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["validators"]; }());

/***/ }),

/***/ "@wordpress/api-fetch":
/*!*******************************************!*\
  !*** external {"this":["wp","apiFetch"]} ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["apiFetch"]; }());

/***/ }),

/***/ "@wordpress/data":
/*!***************************************!*\
  !*** external {"this":["wp","data"]} ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["data"]; }());

/***/ }),

/***/ "@wordpress/is-shallow-equal":
/*!*************************************************!*\
  !*** external {"this":["wp","isShallowEqual"]} ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["isShallowEqual"]; }());

/***/ }),

/***/ "lodash":
/*!**********************************!*\
  !*** external {"this":"lodash"} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["lodash"]; }());

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9iYXNlLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9iYXNlLW1vZGVsLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9iYXNlLXNlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vYXNzZXRzL3NyYy9kYXRhL2V2ZW50ZXNwcmVzc28vY29yZS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL2Fzc2V0cy9zcmMvZGF0YS9ldmVudGVzcHJlc3NvL3NjaGVtYS9hY3Rpb24tdHlwZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL2Fzc2V0cy9zcmMvZGF0YS9ldmVudGVzcHJlc3NvL3NjaGVtYS9hY3Rpb25zLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9zY2hlbWEvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9zY2hlbWEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL2Fzc2V0cy9zcmMvZGF0YS9ldmVudGVzcHJlc3NvL3NjaGVtYS9tb2RlbC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vYXNzZXRzL3NyYy9kYXRhL2V2ZW50ZXNwcmVzc28vc2NoZW1hL3JlZHVjZXJzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9zY2hlbWEvcmVzb2x2ZXJzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9zY2hlbWEvc2VsZWN0b3JzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9ub2RlX21vZHVsZXMvaW1tdXRhYmxlL2Rpc3QvaW1tdXRhYmxlLmVzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9ub2RlX21vZHVsZXMvcGx1cmFsaXplL3BsdXJhbGl6ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vbm9kZV9tb2R1bGVzL3JlbWVtby9lcy9yZW1lbW8uanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6XCJyZWdlbmVyYXRvclJ1bnRpbWVcIn0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaGVscGVyc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwibW9kZWxcIl19Iiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZhbGlkYXRvcnNcIl19Iiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJhcGlGZXRjaFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImRhdGFcIl19Iiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJpc1NoYWxsb3dFcXVhbFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iXSwibmFtZXMiOlsiZmV0Y2giLCJyZXF1ZXN0IiwidHlwZSIsInNlbGVjdCIsInJlZHVjZXJLZXkiLCJzZWxlY3Rvck5hbWUiLCJhcmdzIiwicmVzb2x2ZVNlbGVjdCIsImRpc3BhdGNoIiwiZGlzcGF0Y2hOYW1lIiwicmVzb2x2ZURpc3BhdGNoIiwicmVzb2x2ZUdldEVudGl0eUJ5SWRGb3JJZHMiLCJtb2RlbE5hbWUiLCJlbnRpdHlJZHMiLCJyZXNvbHZlR2V0UmVsYXRlZEVudGl0aWVzIiwiZW50aXR5IiwicmVsYXRpb25FbnRpdGllcyIsInJlbGF0aW9uSWRzIiwiY29udHJvbHMiLCJGRVRDSF9GUk9NX0FQSSIsImFwaUZldGNoIiwiU0VMRUNUIiwic2VsZWN0RGF0YSIsIkRJU1BBVENIIiwiZGlzcGF0Y2hEYXRhIiwiUkVTT0xWRV9ESVNQQVRDSCIsIlJFU09MVkVfU0VMRUNUIiwiUHJvbWlzZSIsInJlc29sdmUiLCJoYXNGaW5pc2hlZCIsImhhc0ZpbmlzaGVkUmVzb2x1dGlvbiIsImdldFJlc3VsdCIsImFwcGx5IiwicmVzdWx0IiwidW5zdWJzY3JpYmUiLCJzdWJzY3JpYmUiLCJSRVNPTFZFX0dFVF9FTlRJVFlfQllfSURfRk9SX0lEUyIsImxlbmd0aCIsIkNPUkVfUkVEVUNFUl9LRVkiLCJwb3AiLCJSRVNPTFZFX0dFVF9SRUxBVEVEX0VOVElUSUVTIiwicmVsYXRpb25FbnRpdHkiLCJnZXQiLCJwbHVyYWxNb2RlbE5hbWUiLCJnZXRNZXRob2ROYW1lIiwic3VmZml4IiwicHJlZml4IiwidXNlUGx1cmFsIiwicGx1cmFsaXplIiwidXBwZXJGaXJzdCIsImNhbWVsQ2FzZSIsImtlZXBFeGlzdGluZ0VudGl0aWVzSW5PYmplY3QiLCJleGlzdGluZ0VudGl0aWVzIiwiaW5jb21pbmdFbnRpdGllcyIsImdldEV4aXN0aW5nT3JEZWZhdWx0RW50aXR5IiwiZGVmYXVsdEVudGl0eSIsImVudGl0eUlkIiwiaXNNYXAiLCJoYXMiLCJyZWR1Y2VDYWxsYmFjayIsIm1hcHBlZCIsIm5vcm1hbGl6ZUVudGl0eUlkIiwic2V0IiwibWFwUmVkdWNlciIsIk1hcCIsInJlZHVjZSIsIm9yaWdpbmFsSWQiLCJwYXJzZUludCIsImlzTmFOIiwiaXNSZXNvbHZpbmciLCJoYXNGaW5pc2hlZFJlc29sdmluZyIsIlJFRFVDRVJfS0VZIiwiVFlQRV9RVUVVRV9SRUxBVElPTl9ERUxFVEUiLCJUWVBFX1FVRVVFX1JFTEFUSU9OX0FERCIsIkFDVElPTl9UWVBFUyIsIlJFQ0VJVkVfU0NIRU1BX1JFQ09SRCIsIlJFQ0VJVkVfRkFDVE9SWV9GT1JfTU9ERUwiLCJSRUNFSVZFX1JFTEFUSU9OX0VORFBPSU5UX0ZPUl9NT0RFTF9FTlRJVFkiLCJSRUNFSVZFX1JFTEFUSU9OX1NDSEVNQSIsInJlY2VpdmVTY2hlbWFGb3JNb2RlbEFuZFJlc29sdmUiLCJyZWNlaXZlRmFjdG9yeUZvck1vZGVsQW5kUmVzb2x2ZSIsInJlY2VpdmVSZWxhdGlvblNjaGVtYUFuZFJlc29sdmUiLCJyZWNlaXZlU2NoZW1hRm9yTW9kZWwiLCJzY2hlbWEiLCJ0eXBlcyIsIlNDSEVNQV9SRURVQ0VSX0tFWSIsInRvTG93ZXJDYXNlIiwicmVjZWl2ZUZhY3RvcnlGb3JNb2RlbCIsImZhY3RvcnkiLCJyZWNlaXZlUmVsYXRpb25FbmRwb2ludEZvck1vZGVsRW50aXR5IiwicmVsYXRpb25OYW1lIiwiZW5kcG9pbnQiLCJyZWNlaXZlUmVsYXRpb25TY2hlbWEiLCJyZWxhdGlvblNjaGVtYSIsIkpPSU5fUkVMQVRJT05fVFlQRVMiLCJlbnRpdHlTZWxlY3RvcnMiLCJjcmVhdGVFbnRpdHlTZWxlY3RvcnMiLCJzZWxlY3RvcnMiLCJlbnRpdHlSZXNvbHZlcnMiLCJjcmVhdGVFbnRpdHlSZXNvbHZlcnMiLCJyZXNvbHZlcnMiLCJyZWdpc3RlclN0b3JlIiwicmVkdWNlciIsImFjdGlvbnMiLCJTQ0hFTUFfS0VZIiwic291cmNlIiwiTU9ERUxfTkFNRVMiLCJzY2hlbWFNZXRob2ROYW1lIiwiZmFjdG9yeU1ldGhvZE5hbWUiLCJzdGF0ZSIsImdldFNjaGVtYUZvck1vZGVsIiwiZ2V0RmFjdG9yeUZvck1vZGVsIiwiREVGQVVMVF9TVEFURV9TQ0hFTUEiLCJmcm9tSlMiLCJERUZBVUxUX1NDSEVNQV9TVEFURSIsIkRFRkFVTFRfU1RBVEVfRkFDVE9SWSIsIkRFRkFVTFRfU1RBVEVfRU5EUE9JTlRTIiwicmVsYXRpb25FbmRwb2ludHMiLCJERUZBVUxUX1NUQVRFX1JFTEFUSU9OUyIsInJlY2VpdmVTY2hlbWEiLCJhY3Rpb24iLCJzaW5ndWxhck1vZGVsTmFtZSIsImlzU2NoZW1hUmVzcG9uc2VPZk1vZGVsIiwiZSIsInJlY2VpdmVGYWN0b3J5IiwiaXNNb2RlbEVudGl0eUZhY3RvcnlPZk1vZGVsIiwicmVjZWl2ZVJlbGF0aW9uRW5kcG9pbnRGb3JFbnRpdHkiLCJzZXRJbiIsImlzU2hhbGxvd0VxdWFsIiwiZ2V0SW4iLCJjb21iaW5lUmVkdWNlcnMiLCJnZXRSZWxhdGlvbkVuZHBvaW50Rm9yRW50aXR5SWQiLCJnZXRSZWxhdGlvblByaW1hcnlLZXlTdHJpbmciLCJnZXRSZWxhdGlvblJlc3BvbnNlVHlwZSIsImhhc0pvaW5UYWJsZVJlbGF0aW9uIiwiZ2V0UmVsYXRpb25UeXBlIiwiaHlkcmF0ZVJlbGF0aW9uU2NoZW1hIiwiZ2V0UmVsYXRpb25TY2hlbWEiLCJwYXRoIiwiZ2V0RW5kcG9pbnQiLCJtZXRob2QiLCJjcmVhdGVFbnRpdHlGYWN0b3J5IiwiTU9ERUxfUFJFRklYRVMiLCJyZWxhdGlvbk1vZGVsTmFtZSIsInBsdXJhbFJlbGF0aW9uTmFtZSIsImlzTW9kZWxFbnRpdHkiLCJzdHJpcEJhc2VSb3V0ZUZyb21VcmwiLCJyZXNvdXJjZUxpbmsiLCJyZXNwb25zZSIsIl9saW5rcyIsImxpbmtzIiwiYmFzZVJlbGF0aW9uUGF0aCIsInJlbGF0aW9uVHlwZSIsInJlbGF0aW9uUHJpbWFyeUtleSIsImdldFByaW1hcnlLZXkiLCJtb2RlbE5hbWVGb3JRdWVyeVN0cmluZyIsImluZGV4T2YiLCJyZWxhdGlvbl90eXBlIiwiRXJyb3IiLCJ0eXBlU2NoZW1hIiwiaGFzT3duUHJvcGVydHkiLCJwcm9wZXJ0aWVzIiwiaXNVbmRlZmluZWQiLCJpc1JlcXVlc3RpbmdTY2hlbWFGb3JNb2RlbCIsImhhc1Jlc29sdmVkU2NoZW1hRm9yTW9kZWwiLCJpc1JlcXVlc3RpbmdGYWN0b3J5Rm9yTW9kZWwiLCJoYXNSZXNvbHZlZEZhY3RvcnlGb3JNb2RlbCIsImlzUmVxdWVzdGluZ1JlbGF0aW9uRW5kcG9pbnRGb3JFbnRpdHlJZCIsImNyZWF0ZVNlbGVjdG9yIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Es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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFVBQVU7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyxLQUFLO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSwrRUFBK0U7QUFDL0U7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFVBQVU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsd0JBQXdCO0FBQzNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFVBQVU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxVQUFVO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsV0FBVztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsZ0JBQWdCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxnQkFBZ0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGVBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxzQkFBc0IsRUFBRTtBQUNsRSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdDQUF3QyxLQUFLO0FBQzdDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLGdEQUFnRCxFQUFFO0FBQzFFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQseUNBQXlDLEVBQUU7QUFDOUY7QUFDQTtBQUNBLCtCQUErQixpQkFBaUIsRUFBRTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIseUJBQXlCLEVBQUU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLG1CQUFtQixFQUFFO0FBQzVELFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDLEtBQUs7QUFDdEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHdDQUF3QywwQkFBMEIsRUFBRTtBQUNwRSxxQ0FBcUMsdUJBQXVCLEVBQUU7QUFDOUQsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMscUJBQXFCLEVBQUU7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUJBQW1CO0FBQ3pDLDhEQUE4RCx1QkFBdUIsRUFBRTtBQUN2RjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLCtCQUErQixFQUFFO0FBQ3hFO0FBQ0E7QUFDQSx3Q0FBd0MsNkJBQTZCLEVBQUU7QUFDdkU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsK0JBQStCLEVBQUU7QUFDeEU7QUFDQTtBQUNBLHNDQUFzQyw2QkFBNkIsRUFBRTtBQUNyRTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTZDLHlCQUF5QixFQUFFO0FBQ3hFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0EsdUNBQXVDLCtCQUErQixFQUFFO0FBQ3hFLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLCtFQUErRSxhQUFhLEVBQUU7QUFDOUYsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsMkJBQTJCO0FBQzNFO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLHdDQUF3QywyQkFBMkIsRUFBRTtBQUNyRSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsNkJBQTZCLEVBQUU7QUFDdkUsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMENBQTBDLCtCQUErQixFQUFFO0FBQzNFLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDJEQUEyRCxFQUFFO0FBQzNGO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsMkNBQTJDLEVBQUU7QUFDM0U7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELCtDQUErQzs7QUFFNUc7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsc0JBQXNCLEVBQUU7QUFDN0QsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwREFBMEQ7QUFDMUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLG1CQUFtQixFQUFFO0FBQzVELFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdDQUF3QyxLQUFLO0FBQzdDOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxrQ0FBa0MsU0FBUztBQUMzQztBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMERBQTBELDJCQUEyQixFQUFFO0FBQ3ZGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsMkVBQTJFO0FBQzNFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsMkRBQTJEO0FBQ25HO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E1RCxhQUFhLHlDQUF5QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXhELGFBQWEscUNBQXFDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBcEQsYUFBYSwrQ0FBK0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E5RCxhQUFhLGlDQUFpQyxFQUFFLEkiLCJmaWxlIjoiZXZlbnRlc3ByZXNzby1tb2RlbC1zY2hlbWEuZGE4OTFkYzYyM2UwMGVmN2Y2NWUuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL3NyYy9kYXRhL2V2ZW50ZXNwcmVzc28vc2NoZW1hL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBhcGlGZXRjaCBmcm9tICdAd29yZHByZXNzL2FwaS1mZXRjaCc7XG5pbXBvcnQge1xuXHRzZWxlY3QgYXMgc2VsZWN0RGF0YSxcblx0ZGlzcGF0Y2ggYXMgZGlzcGF0Y2hEYXRhLFxuXHRzdWJzY3JpYmUsXG59IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBwbHVyYWxNb2RlbE5hbWUgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9tb2RlbCc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBSRURVQ0VSX0tFWSBhcyBDT1JFX1JFRFVDRVJfS0VZIH0gZnJvbSAnLi9jb3JlL2NvbnN0YW50cyc7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYWN0aW9uIG9iamVjdCBmb3IgYSBmZXRjaCBjb250cm9sLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gKiBAcmV0dXJuIHt7XG4gKiAgICAgIHR5cGU6IHN0cmluZyxcbiAqICAgICAgcmVxdWVzdDogT2JqZWN0XG4gKiB9fVxuICogQW4gYWN0aW9uIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2goIHJlcXVlc3QgKSB7XG5cdHJldHVybiB7XG5cdFx0dHlwZTogJ0ZFVENIX0ZST01fQVBJJyxcblx0XHRyZXF1ZXN0LFxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFjdGlvbiBvYmplY3QgZm9yIGEgc2VsZWN0IGNvbnRyb2wuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZHVjZXJLZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3Rvck5hbWVcbiAqIEBwYXJhbSB7Li4uQXJyYXl8Ym9vbGVhbnxudW1iZXJ8T2JqZWN0fHN0cmluZ30gYXJnc1xuICogQHJldHVybiB7e1xuICogICAgICB0eXBlOiBzdHJpbmcsXG4gKiAgICAgIHJlZHVjZXJLZXk6IHN0cmluZyxcbiAqICAgICAgc2VsZWN0b3JOYW1lOiBzdHJpbmcsXG4gKiAgICAgIGFyZ3M6IC4uLkFycmF5fGJvb2xlYW58bnVtYmVyfE9iamVjdHxzdHJpbmdcbiAqIH19XG4gKiBSZXR1cm5zIGFuIGFjdGlvbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3QoIHJlZHVjZXJLZXksIHNlbGVjdG9yTmFtZSwgLi4uYXJncyApIHtcblx0cmV0dXJuIHtcblx0XHR0eXBlOiAnU0VMRUNUJyxcblx0XHRyZWR1Y2VyS2V5LFxuXHRcdHNlbGVjdG9yTmFtZSxcblx0XHRhcmdzLFxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFjdGlvbiBvYmplY3QgZm9yIHJlc29sdmluZyBhIHNlbGVjdG9yIHRoYXQgaGFzIGEgcmVzb2x2ZXIuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZHVjZXJLZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3Rvck5hbWVcbiAqIEBwYXJhbSB7Li4uQXJyYXl8Ym9vbGVhbnxudW1iZXJ8T2JqZWN0fHN0cmluZ30gYXJnc1xuICogQHJldHVybiB7T2JqZWN0fSBBbiBhY3Rpb24gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVNlbGVjdCggcmVkdWNlcktleSwgc2VsZWN0b3JOYW1lLCAuLi5hcmdzICkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6ICdSRVNPTFZFX1NFTEVDVCcsXG5cdFx0cmVkdWNlcktleSxcblx0XHRzZWxlY3Rvck5hbWUsXG5cdFx0YXJncyxcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhY3Rpb24gb2JqZWN0IGZvciBhIGRpc3BhdGNoIGNvbnRyb2wuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZHVjZXJLZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXNwYXRjaE5hbWVcbiAqIEBwYXJhbSB7Li4uQXJyYXl8Ym9vbGVhbnxudW1iZXJ8T2JqZWN0fHN0cmluZ30gYXJnc1xuICogQHJldHVybiB7e1xuICogICAgICB0eXBlOiBzdHJpbmcsXG4gKiAgICAgIHJlZHVjZXJLZXk6IHN0cmluZyxcbiAqICAgICAgZGlzcGF0Y2hOYW1lOiBzdHJpbmcsXG4gKiAgICAgIGFyZ3M6IC4uLkFycmF5fGJvb2xlYW58bnVtYmVyfE9iamVjdHxzdHJpbmdcbiAqIH19XG4gKiBBbiBhY3Rpb24gb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaCggcmVkdWNlcktleSwgZGlzcGF0Y2hOYW1lLCAuLi5hcmdzICkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6ICdESVNQQVRDSCcsXG5cdFx0cmVkdWNlcktleSxcblx0XHRkaXNwYXRjaE5hbWUsXG5cdFx0YXJncyxcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhY3Rpb24gb2JqZWN0IGZvciBhIHJlc29sdmUgZGlzcGF0Y2ggY29udHJvbFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWR1Y2VyS2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gZGlzcGF0Y2hOYW1lXG4gKiBAcGFyYW0gey4uLkFycmF5fGJvb2xlYW58bnVtYmVyfE9iamVjdHxzdHJpbmd9IGFyZ3NcbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIGFjdGlvbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlRGlzcGF0Y2goIHJlZHVjZXJLZXksIGRpc3BhdGNoTmFtZSwgLi4uYXJncyApIHtcblx0cmV0dXJuIHtcblx0XHR0eXBlOiAnUkVTT0xWRV9ESVNQQVRDSCcsXG5cdFx0cmVkdWNlcktleSxcblx0XHRkaXNwYXRjaE5hbWUsXG5cdFx0YXJncyxcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhY3Rpb24gb2JqZWN0IGZvciByZXNvbHZpbmcgdGhlIGdldEVudGl0eUJ5SWQgc2VsZWN0b3JcbiAqIGZvciBhbGwgdGhlIGdpdmVuIGlkcyBvbiB0aGUgZ2l2ZW4gbW9kZWxcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge0FycmF5fSBlbnRpdHlJZHNcbiAqIEByZXR1cm4ge09iamVjdH0gQW4gYWN0aW9uIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUdldEVudGl0eUJ5SWRGb3JJZHMoIG1vZGVsTmFtZSwgZW50aXR5SWRzICkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6ICdSRVNPTFZFX0dFVF9FTlRJVFlfQllfSURfRk9SX0lEUycsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdGVudGl0eUlkcyxcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhY3Rpb24gb2JqZWN0IGZvciByZXNvbHZpbmcgdGhlIGdldFJlbGF0ZWRFbnRpdGllcyBzZWxlY3RvclxuICogb24gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBmb3IgdGhlIGdpdmVuIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl8T2JqZWN0fSBlbnRpdHlcbiAqIEBwYXJhbSB7TWFwfSByZWxhdGlvbkVudGl0aWVzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IHJlbGF0aW9uSWRzXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIGFjdGlvbiBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVHZXRSZWxhdGVkRW50aXRpZXMoXG5cdGVudGl0eSxcblx0cmVsYXRpb25FbnRpdGllcyxcblx0cmVsYXRpb25JZHNcbikge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6ICdSRVNPTFZFX0dFVF9SRUxBVEVEX0VOVElUSUVTJyxcblx0XHRlbnRpdHksXG5cdFx0cmVsYXRpb25FbnRpdGllcyxcblx0XHRyZWxhdGlvbklkcyxcblx0fTtcbn1cblxuY29uc3QgY29udHJvbHMgPSB7XG5cdEZFVENIX0ZST01fQVBJKCB7IHJlcXVlc3QgfSApIHtcblx0XHQvLyByZXR1cm4ge307XG5cdFx0cmV0dXJuIGFwaUZldGNoKCByZXF1ZXN0ICk7XG5cdH0sXG5cdFNFTEVDVCggeyByZWR1Y2VyS2V5LCBzZWxlY3Rvck5hbWUsIGFyZ3MgfSApIHtcblx0XHRyZXR1cm4gc2VsZWN0RGF0YSggcmVkdWNlcktleSApWyBzZWxlY3Rvck5hbWUgXSggLi4uYXJncyApO1xuXHR9LFxuXHRESVNQQVRDSCggeyByZWR1Y2VyS2V5LCBkaXNwYXRjaE5hbWUsIGFyZ3MgfSApIHtcblx0XHRyZXR1cm4gZGlzcGF0Y2hEYXRhKCByZWR1Y2VyS2V5IClbIGRpc3BhdGNoTmFtZSBdKCAuLi5hcmdzICk7XG5cdH0sXG5cdGFzeW5jIFJFU09MVkVfRElTUEFUQ0goIHsgcmVkdWNlcktleSwgZGlzcGF0Y2hOYW1lLCBhcmdzIH0gKSB7XG5cdFx0cmV0dXJuIGF3YWl0IGRpc3BhdGNoRGF0YSggcmVkdWNlcktleSApWyBkaXNwYXRjaE5hbWUgXSggLi4uYXJncyApO1xuXHR9LFxuXHRSRVNPTFZFX1NFTEVDVCggeyByZWR1Y2VyS2V5LCBzZWxlY3Rvck5hbWUsIGFyZ3MgfSApIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSApID0+IHtcblx0XHRcdGNvbnN0IGhhc0ZpbmlzaGVkID0gKCkgPT4gc2VsZWN0RGF0YSggJ2NvcmUvZGF0YScgKVxuXHRcdFx0XHQuaGFzRmluaXNoZWRSZXNvbHV0aW9uKCByZWR1Y2VyS2V5LCBzZWxlY3Rvck5hbWUsIGFyZ3MgKTtcblx0XHRcdGNvbnN0IGdldFJlc3VsdCA9ICgpID0+IHNlbGVjdERhdGEoIHJlZHVjZXJLZXkgKVsgc2VsZWN0b3JOYW1lIF1cblx0XHRcdFx0LmFwcGx5KCBudWxsLCBhcmdzICk7XG5cblx0XHRcdC8vIHRyaWdnZXIgdGhlIHNlbGVjdG9yICh0byB0cmlnZ2VyIHRoZSByZXNvbHZlcilcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGdldFJlc3VsdCgpO1xuXHRcdFx0aWYgKCBoYXNGaW5pc2hlZCgpICkge1xuXHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSggcmVzdWx0ICk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHVuc3Vic2NyaWJlID0gc3Vic2NyaWJlKCAoKSA9PiB7XG5cdFx0XHRcdGlmICggaGFzRmluaXNoZWQoKSApIHtcblx0XHRcdFx0XHR1bnN1YnNjcmliZSgpO1xuXHRcdFx0XHRcdHJlc29sdmUoIGdldFJlc3VsdCgpICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9ICk7XG5cdH0sXG5cdFJFU09MVkVfR0VUX0VOVElUWV9CWV9JRF9GT1JfSURTKCB7IG1vZGVsTmFtZSwgZW50aXR5SWRzIH0gKSB7XG5cdFx0d2hpbGUgKCBlbnRpdHlJZHMubGVuZ3RoID4gMCApIHtcblx0XHRcdGRpc3BhdGNoRGF0YShcblx0XHRcdFx0J2NvcmUvZGF0YScsXG5cdFx0XHRcdCdmaW5pc2hSZXNvbHV0aW9uJyxcblx0XHRcdFx0Q09SRV9SRURVQ0VSX0tFWSxcblx0XHRcdFx0J2dldEVudGl0eUJ5SWQnLFxuXHRcdFx0XHRbIG1vZGVsTmFtZSwgZW50aXR5SWRzLnBvcCgpIF1cblx0XHRcdCk7XG5cdFx0fVxuXHR9LFxuXHRSRVNPTFZFX0dFVF9SRUxBVEVEX0VOVElUSUVTKCB7IGVudGl0eSwgcmVsYXRpb25FbnRpdGllcywgcmVsYXRpb25JZHMgfSApIHtcblx0XHR3aGlsZSAoIHJlbGF0aW9uSWRzLmxlbmd0aCA+IDAgKSB7XG5cdFx0XHRjb25zdCByZWxhdGlvbkVudGl0eSA9IHJlbGF0aW9uRW50aXRpZXMuZ2V0KCByZWxhdGlvbklkcy5wb3AoKSApO1xuXHRcdFx0aWYgKCByZWxhdGlvbkVudGl0eSApIHtcblx0XHRcdFx0ZGlzcGF0Y2hEYXRhKFxuXHRcdFx0XHRcdCdjb3JlL2RhdGEnLFxuXHRcdFx0XHRcdCdmaW5pc2hSZXNvbHV0aW9uJyxcblx0XHRcdFx0XHRDT1JFX1JFRFVDRVJfS0VZLFxuXHRcdFx0XHRcdCdnZXRSZWxhdGVkRW50aXRpZXMnLFxuXHRcdFx0XHRcdFsgcmVsYXRpb25FbnRpdHksIHBsdXJhbE1vZGVsTmFtZSggZW50aXR5Lm1vZGVsTmFtZSApIF1cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb250cm9scztcbiIsIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHVwcGVyRmlyc3QsIGNhbWVsQ2FzZSwgcmVkdWNlLCBpc01hcCwgaXNOYU4gfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHBsdXJhbGl6ZSBmcm9tICdwbHVyYWxpemUnO1xuaW1wb3J0IHsgbWFwUmVkdWNlciB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2hlbHBlcnMnO1xuXG4vKipcbiAqIEEgaGVscGVyIGZvciBnZXR0aW5nIGEgbWV0aG9kIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gc3VmZml4XG4gKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZVBsdXJhbFxuICogQHJldHVybiB7c3RyaW5nfSBSZXR1cm5zIGEgbmFtZSBmb3IgYSBtZXRob2QuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRNZXRob2ROYW1lID0gKFxuXHRtb2RlbE5hbWUsXG5cdHN1ZmZpeCA9ICcnLFxuXHRwcmVmaXggPSAnZ2V0Jyxcblx0dXNlUGx1cmFsID0gZmFsc2VcbikgPT4ge1xuXHRtb2RlbE5hbWUgPSB1c2VQbHVyYWwgPyBwbHVyYWxpemUoIG1vZGVsTmFtZSApIDogbW9kZWxOYW1lO1xuXHRyZXR1cm4gcHJlZml4ICsgdXBwZXJGaXJzdCggY2FtZWxDYXNlKCBtb2RlbE5hbWUgKyB1cHBlckZpcnN0KCBzdWZmaXggKSApICk7XG59O1xuXG4vKipcbiAqIEdpdmVuIGEgY29sbGVjdGlvbiBvZiBleGlzdGluZyBlbnRpdGllcyBhbmQgYSBjb2xsZWN0aW9uIG9mIGluY29taW5nXG4gKiBlbnRpdGllcywgdGhpcyByZXR1cm5zIGEgbWVyZ2VkIG9iamVjdCB3aXRoIHByZWZlcmVuY2UgZ2l2ZW4gdG8gY29tbW9uXG4gKiBlbnRpdGllcyBmcm9tIHRoZSBleGlzdGluZ0VudGl0aWVzIGNvbGxlY3Rpb24uXG4gKlxuICogSW5jb21pbmcgY29sbGVjdGlvbnMgY2FuIGJlIE1hcHMgb3IgcGxhaW4gb2JqZWN0cy5cbiAqXG4gKiBOb3RlIGlmIGluY29taW5nRW50aXRpZXMgaXMgYSBNYXAsIHRoZSBPUkRFUiBvZiB0aGUgbWFwIHdpbGwgYmUgcHJlc2VydmVkXG4gKiBldmVuIGlmIHRoZSB2YWx1ZXMgb2YgZW50aXRpZXMgaW4gdGhlIG1hcCBhcmUgcmVwbGFjZWQgYnkgdmFsdWVzIGZyb21cbiAqIGV4aXN0aW5nIGVudGl0aWVzLlxuICpcbiAqIEBwYXJhbSB7TWFwfE9iamVjdH0gZXhpc3RpbmdFbnRpdGllc1xuICogQHBhcmFtIHtNYXB8T2JqZWN0fSBpbmNvbWluZ0VudGl0aWVzXG4gKiBAcmV0dXJuIHtNYXB9IEEgbmV3IGNvbGxlY3Rpb24gb2YgZW50aXRpZXMuIE5vdGUgaWYgZXhpc3RpbmcgZW50aXRpZXMgY2FtZSBpblxuICogYXMgYSBwbGFpbiBvYmplY3QsIHRoaXMgcmV0dXJucyBhIE1hcC5cbiAqL1xuZXhwb3J0IGNvbnN0IGtlZXBFeGlzdGluZ0VudGl0aWVzSW5PYmplY3QgPSAoXG5cdGV4aXN0aW5nRW50aXRpZXMsXG5cdGluY29taW5nRW50aXRpZXMsXG4pID0+IHtcblx0Y29uc3QgZ2V0RXhpc3RpbmdPckRlZmF1bHRFbnRpdHkgPSAoIGRlZmF1bHRFbnRpdHksIGVudGl0eUlkICkgPT4ge1xuXHRcdGlmICggaXNNYXAoIGV4aXN0aW5nRW50aXRpZXMgKSAmJiBleGlzdGluZ0VudGl0aWVzLmhhcyggZW50aXR5SWQgKSApIHtcblx0XHRcdHJldHVybiBleGlzdGluZ0VudGl0aWVzLmdldCggZW50aXR5SWQgKTtcblx0XHR9XG5cdFx0cmV0dXJuIGV4aXN0aW5nRW50aXRpZXNbIGVudGl0eUlkIF0gfHwgZGVmYXVsdEVudGl0eTtcblx0fTtcblx0Y29uc3QgcmVkdWNlQ2FsbGJhY2sgPSAoIG1hcHBlZCwgZW50aXR5LCBlbnRpdHlJZCApID0+IHtcblx0XHRlbnRpdHlJZCA9IG5vcm1hbGl6ZUVudGl0eUlkKCBlbnRpdHlJZCApO1xuXHRcdG1hcHBlZC5zZXQoIGVudGl0eUlkLCBnZXRFeGlzdGluZ09yRGVmYXVsdEVudGl0eSggZW50aXR5LCBlbnRpdHlJZCApICk7XG5cdFx0cmV0dXJuIG1hcHBlZDtcblx0fTtcblx0cmV0dXJuIGlzTWFwKCBpbmNvbWluZ0VudGl0aWVzICkgP1xuXHRcdG1hcFJlZHVjZXIoIGluY29taW5nRW50aXRpZXMsIHJlZHVjZUNhbGxiYWNrLCBuZXcgTWFwKCkgKSA6XG5cdFx0cmVkdWNlKCBpbmNvbWluZ0VudGl0aWVzLCByZWR1Y2VDYWxsYmFjaywgbmV3IE1hcCgpICk7XG59O1xuXG4vKipcbiAqIFRoaXMgbm9ybWFsaXplcyBudW1lcmljIHZhbHVlcyB0byBpbnRlZ2VyIG51bWJlcnMgYW5kIGxlYXZlcyBub24gbnVtZXJpY1xuICogdmFsdWVzIGFsb25lLlxuICpcbiAqIEBwYXJhbSB7Kn0gZW50aXR5SWRcbiAqIEByZXR1cm4geyp9IE5vcm1hbGl6ZWQgdmFsdWVcbiAqL1xuY29uc3Qgbm9ybWFsaXplRW50aXR5SWQgPSAoIGVudGl0eUlkICkgPT4ge1xuXHRjb25zdCBvcmlnaW5hbElkID0gZW50aXR5SWQ7XG5cdGVudGl0eUlkID0gcGFyc2VJbnQoIGVudGl0eUlkLCAxMCApO1xuXHRyZXR1cm4gaXNOYU4oIGVudGl0eUlkICkgPyBvcmlnaW5hbElkIDogZW50aXR5SWQ7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgc2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcblxuLyoqXG4gKiBJbnZva2VzIHRoZSBzZWxlY3RvciBmb3Igd2hldGhlciBhIGdpdmVuIHNlbGVjdG9yTmFtZSBpbiBhIGdpdmVuIHJlZ2lzdGVyZWRcbiAqIHJlZHVjZXIgc3RvcmUgaXMgaW4gdGhlIG1pZHN0IG9mIHJlc29sdmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSByZWR1Y2VyS2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JOYW1lXG4gKiBAcGFyYW0geypbXX0gYXJnc1xuICogQHJldHVybiB7Ym9vbGVhbn0gIFdoZXRoZXIgcmVzb2x1dGlvbiBpcyBpbiBwcm9ncmVzcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzUmVzb2x2aW5nID0gKCByZWR1Y2VyS2V5LCBzZWxlY3Rvck5hbWUsIC4uLmFyZ3MgKSA9PiB7XG5cdHJldHVybiBzZWxlY3QoICdjb3JlL2RhdGEnICkuaXNSZXNvbHZpbmcoIHJlZHVjZXJLZXksIHNlbGVjdG9yTmFtZSwgYXJncyApO1xufTtcblxuLyoqXG4gKiBJbnZva2VzIHRoZSBzZWxlY3RvciBmb3Igd2hldGhlciBhIGdpdmVuIHNlbGVjdG9yTmFtZSBpbiBhIGdpdmVuIHJlZ2lzdGVyZWRcbiAqIHJlZHVjZXIgc3RvcmUgaGFzIGZpbmlzaGVkIHJlc29sdmluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVkdWNlcktleVxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yTmFtZVxuICogQHBhcmFtIHsqW119IGFyZ3NcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgcmVzb2x1dGlvbiBoYXMgY29tcGxldGVkLlxuICovXG5leHBvcnQgY29uc3QgaGFzRmluaXNoZWRSZXNvbHZpbmcgPSAoIHJlZHVjZXJLZXksIHNlbGVjdG9yTmFtZSwgLi4uYXJncyApID0+IHtcblx0cmV0dXJuIHNlbGVjdCggJ2NvcmUvZGF0YScgKVxuXHRcdC5oYXNGaW5pc2hlZFJlc29sdXRpb24oIHJlZHVjZXJLZXksIHNlbGVjdG9yTmFtZSwgYXJncyApO1xufTtcbiIsImV4cG9ydCBjb25zdCBSRURVQ0VSX0tFWSA9ICdldmVudGVzcHJlc3NvL2NvcmUnO1xuZXhwb3J0IGNvbnN0IFRZUEVfUVVFVUVfUkVMQVRJT05fREVMRVRFID0gJ2RlbGV0ZSc7XG5leHBvcnQgY29uc3QgVFlQRV9RVUVVRV9SRUxBVElPTl9BREQgPSAnYWRkJztcbiIsImV4cG9ydCBjb25zdCBBQ1RJT05fVFlQRVMgPSB7XG5cdFJFQ0VJVkVfU0NIRU1BX1JFQ09SRDogJ1JFQ0VJVkVfU0NIRU1BX1JFQ09SRCcsXG5cdFJFQ0VJVkVfRkFDVE9SWV9GT1JfTU9ERUw6ICdSRUNFSVZFX0ZBQ1RPUllfRk9SX01PREVMJyxcblx0UkVDRUlWRV9SRUxBVElPTl9FTkRQT0lOVF9GT1JfTU9ERUxfRU5USVRZOlxuXHRcdCdSRUNFSVZFX1JFTEFUSU9OX0VORFBPSU5UX0ZPUl9NT0RFTF9FTlRJVFknLFxuXHRSRUNFSVZFX1JFTEFUSU9OX1NDSEVNQTogJ1JFQ0VJVkVfUkVMQVRJT05fU0NIRU1BJyxcbn07XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgQUNUSU9OX1RZUEVTIGFzIHR5cGVzIH0gZnJvbSAnLi9hY3Rpb24tdHlwZXMnO1xuaW1wb3J0IHtcblx0UkVEVUNFUl9LRVkgYXMgU0NIRU1BX1JFRFVDRVJfS0VZLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBkaXNwYXRjaCB9IGZyb20gJy4uL2Jhc2UtY29udHJvbHMnO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYWN0aW9uIG9iamVjdCB1c2VkIHRvIHVwZGF0ZSB0aGUgc3RvcmUgd2l0aCB0aGUgcHJvdmlkZWQgc2NoZW1hXG4gKiBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsTmFtZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHt7dHlwZTogc3RyaW5nLCBtb2RlbE5hbWU6ICosIHNjaGVtYX19ICBUaGUgYWN0aW9uIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY2VpdmVTY2hlbWFGb3JNb2RlbCggbW9kZWxOYW1lLCBzY2hlbWEgPSB7fSApIHtcblx0cmV0dXJuIHtcblx0XHR0eXBlOiB0eXBlcy5SRUNFSVZFX1NDSEVNQV9SRUNPUkQsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdHNjaGVtYSxcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uKiByZWNlaXZlU2NoZW1hRm9yTW9kZWxBbmRSZXNvbHZlKCBtb2RlbE5hbWUsIHNjaGVtYSA9IHt9ICkge1xuXHR5aWVsZCBkaXNwYXRjaChcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J3JlY2VpdmVTY2hlbWFGb3JNb2RlbCcsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdHNjaGVtYVxuXHQpO1xuXHR5aWVsZCBkaXNwYXRjaChcblx0XHQnY29yZS9kYXRhJyxcblx0XHQnZmluaXNoUmVzb2x1dGlvbicsXG5cdFx0U0NIRU1BX1JFRFVDRVJfS0VZLFxuXHRcdCdnZXRTY2hlbWFGb3JNb2RlbCcsXG5cdFx0WyBtb2RlbE5hbWUudG9Mb3dlckNhc2UoKSBdXG5cdCk7XG5cdHJldHVybiBzY2hlbWE7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhY3Rpb24gb2JqZWN0IHVzZWQgdG8gdXBkYXRlIHRoZSBzdG9yZSB3aXRoIHRoZSBwcm92aWRlZCBtb2RlbFxuICogZW50aXR5IGZhY3RvcnkgZm9yIHRoZSBwcm92aWRlZCBtb2RlbE5hbWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGZhY3RvcnlcbiAqIEByZXR1cm4ge3t0eXBlOiBzdHJpbmcsIG1vZGVsTmFtZTogc3RyaW5nLCBmYWN0b3J5OiBPYmplY3R9fSBBbiBhY3Rpb25cbiAqIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY2VpdmVGYWN0b3J5Rm9yTW9kZWwoIG1vZGVsTmFtZSwgZmFjdG9yeSA9IHt9ICkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6IHR5cGVzLlJFQ0VJVkVfRkFDVE9SWV9GT1JfTU9ERUwsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdGZhY3RvcnksXG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiogcmVjZWl2ZUZhY3RvcnlGb3JNb2RlbEFuZFJlc29sdmUoIG1vZGVsTmFtZSwgZmFjdG9yeSA9IHt9ICkge1xuXHR5aWVsZCBkaXNwYXRjaChcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J3JlY2VpdmVGYWN0b3J5Rm9yTW9kZWwnLFxuXHRcdG1vZGVsTmFtZSxcblx0XHRmYWN0b3J5XG5cdCk7XG5cdHlpZWxkIGRpc3BhdGNoKFxuXHRcdCdjb3JlL2RhdGEnLFxuXHRcdCdmaW5pc2hSZXNvbHV0aW9uJyxcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J2dldEZhY3RvcnlGb3JNb2RlbCcsXG5cdFx0WyBtb2RlbE5hbWUudG9Mb3dlckNhc2UoKSBdXG5cdCk7XG5cdHJldHVybiBmYWN0b3J5O1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYWN0aW9uIG9iamVjdCB1c2VkIHRvIHVwZGF0ZSB0aGUgc3RvcmUgd2l0aCB0aGUgcHJvdmlkZWQgcmVsYXRpb25cbiAqIGVuZHBvaW50IGZvciB0aGUgbW9kZWwgYW5kIGlkLCBhbmQgaXRzIHJlbGF0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge251bWJlcn0gZW50aXR5SWRcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbmRwb2ludFxuICogQHJldHVybiB7XG4gKiBcdHtcbiAqIFx0XHRtb2RlbE5hbWU6ICosXG4gKiBcdFx0ZW5kcG9pbnQ6ICosXG4gKiBcdFx0cmVsYXRpb25OYW1lOiAqLFxuICogXHRcdGVudGl0eUlkOiAqLFxuICogXHRcdHR5cGU6IHN0cmluZ1xuICogXHR9XG4gKiB9IEFuIGFjdGlvbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWNlaXZlUmVsYXRpb25FbmRwb2ludEZvck1vZGVsRW50aXR5KFxuXHRtb2RlbE5hbWUsXG5cdGVudGl0eUlkLFxuXHRyZWxhdGlvbk5hbWUsXG5cdGVuZHBvaW50XG4pIHtcblx0cmV0dXJuIHtcblx0XHR0eXBlOiB0eXBlcy5SRUNFSVZFX1JFTEFUSU9OX0VORFBPSU5UX0ZPUl9NT0RFTF9FTlRJVFksXG5cdFx0bW9kZWxOYW1lLFxuXHRcdGVudGl0eUlkLFxuXHRcdHJlbGF0aW9uTmFtZSxcblx0XHRlbmRwb2ludCxcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlY2VpdmVSZWxhdGlvblNjaGVtYShcblx0bW9kZWxOYW1lLFxuXHRyZWxhdGlvbk5hbWUsXG5cdHJlbGF0aW9uU2NoZW1hXG4pIHtcblx0cmV0dXJuIHtcblx0XHR0eXBlOiB0eXBlcy5SRUNFSVZFX1JFTEFUSU9OX1NDSEVNQSxcblx0XHRtb2RlbE5hbWUsXG5cdFx0cmVsYXRpb25OYW1lLFxuXHRcdHJlbGF0aW9uU2NoZW1hLFxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24qIHJlY2VpdmVSZWxhdGlvblNjaGVtYUFuZFJlc29sdmUoXG5cdG1vZGVsTmFtZSxcblx0cmVsYXRpb25OYW1lLFxuXHRyZWxhdGlvblNjaGVtYVxuKSB7XG5cdHlpZWxkIGRpc3BhdGNoKFxuXHRcdFNDSEVNQV9SRURVQ0VSX0tFWSxcblx0XHQncmVjZWl2ZVJlbGF0aW9uU2NoZW1hJyxcblx0XHRtb2RlbE5hbWUsXG5cdFx0cmVsYXRpb25OYW1lLFxuXHRcdHJlbGF0aW9uU2NoZW1hXG5cdCk7XG5cdHlpZWxkIGRpc3BhdGNoKFxuXHRcdCdjb3JlL2RhdGEnLFxuXHRcdCdmaW5pc2hSZXNvbHV0aW9uJyxcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J2dldFJlbGF0aW9uU2NoZW1hJyxcblx0XHRbIG1vZGVsTmFtZS50b0xvd2VyQ2FzZSgpLCByZWxhdGlvbk5hbWUgXVxuXHQpO1xufVxuIiwiLyoqXG4gKiBJZGVudGlmaWVyIGtleSBmb3IgdGhpcyBzdG9yZSByZWR1Y2VyLlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IFJFRFVDRVJfS0VZID0gJ2V2ZW50ZXNwcmVzc28vc2NoZW1hJztcblxuZXhwb3J0IGNvbnN0IEpPSU5fUkVMQVRJT05fVFlQRVMgPSBbXG5cdCdFRV9IQUJUTV9SZWxhdGlvbicsXG5cdCdFRV9IQUJUTV9BbnlfUmVsYXRpb24nLFxuXTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHJlZ2lzdGVyU3RvcmUgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBSRURVQ0VSX0tFWSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCAqIGFzIHNlbGVjdG9ycyBmcm9tICcuL3NlbGVjdG9ycyc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyByZXNvbHZlcnMgZnJvbSAnLi9yZXNvbHZlcnMnO1xuaW1wb3J0IHJlZHVjZXIgZnJvbSAnLi9yZWR1Y2Vycyc7XG5pbXBvcnQgY29udHJvbHMgZnJvbSAnLi4vYmFzZS1jb250cm9scyc7XG5pbXBvcnQgeyBjcmVhdGVFbnRpdHlTZWxlY3RvcnMsIGNyZWF0ZUVudGl0eVJlc29sdmVycyB9IGZyb20gJy4vbW9kZWwnO1xuXG4vKipcbiAqIENyZWF0ZXMgc3BlY2lmaWMgbW9kZWwgZW50aXR5IHNlbGVjdG9ycyAoZ2V0RmFjdG9yeUZvckV2ZW50IGV0YylcbiAqXG4gKiBAdHlwZSB7T2JqZWN0PEZ1bmN0aW9uPn1cbiAqL1xuY29uc3QgZW50aXR5U2VsZWN0b3JzID0gY3JlYXRlRW50aXR5U2VsZWN0b3JzKCBzZWxlY3RvcnMgKTtcblxuLyoqXG4gKiBDcmVhdGVzIHNwZWNpZmljIG1vZGVsIGVudGl0eSByZXNvbHZlcnMgKGdldEZhY3RvcnlGb3JFdmVudCBldGMpXG4gKlxuICogQHR5cGUge09iamVjdDxGdW5jdGlvbj59XG4gKi9cbmNvbnN0IGVudGl0eVJlc29sdmVycyA9IGNyZWF0ZUVudGl0eVJlc29sdmVycyggcmVzb2x2ZXJzICk7XG5cbi8qKlxuICogUmVnaXN0cmF0aW9uIG9mIHN0b3JlIGZvciBldmVudGVzcHJlc3NvL3NjaGVtYS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgcmVnaXN0ZXJTdG9yZSggUkVEVUNFUl9LRVksIHtcblx0cmVkdWNlcixcblx0YWN0aW9ucyxcblx0Y29udHJvbHMsXG5cdHNlbGVjdG9yczogeyAuLi5zZWxlY3RvcnMsIC4uLmVudGl0eVNlbGVjdG9ycyB9LFxuXHRyZXNvbHZlcnM6IHsgLi4ucmVzb2x2ZXJzLCAuLi5lbnRpdHlSZXNvbHZlcnMgfSxcbn0gKTtcblxuZXhwb3J0IGNvbnN0IFNDSEVNQV9LRVkgPSBSRURVQ0VSX0tFWTtcblxuZXhwb3J0IHsgaHlkcmF0ZVJlbGF0aW9uU2NoZW1hIH0gZnJvbSAnLi9yZXNvbHZlcnMnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgTU9ERUxfTkFNRVMgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9tb2RlbCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGdldE1ldGhvZE5hbWUgfSBmcm9tICcuLi9iYXNlLW1vZGVsJztcbmltcG9ydCB7IGlzUmVzb2x2aW5nIH0gZnJvbSAnLi4vYmFzZS1zZWxlY3RvcnMnO1xuaW1wb3J0IHsgUkVEVUNFUl9LRVkgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQ3JlYXRlcyBzZWxlY3RvcnMgZm9yIGVhY2ggcmVnaXN0ZXJlZCBtb2RlbCBuYW1lIHdyYXBwaW5nIHRoZSBnZW5lcmljIHNvdXJjZVxuICogc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGZ1bmN0aW9uPn0gc291cmNlXG4gKiBAcmV0dXJuIHtPYmplY3Q8ZnVuY3Rpb24+fSBBbGwgdGhlIGdlbmVyYXRlZCBzZWxlY3RvcnMgZm9yIGVhY2ggbW9kZWwuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVFbnRpdHlTZWxlY3RvcnMgPSAoIHNvdXJjZSApID0+IE1PREVMX05BTUVTLnJlZHVjZShcblx0KCBzZWxlY3RvcnMsIG1vZGVsTmFtZSApID0+IHtcblx0XHRjb25zdCBzY2hlbWFNZXRob2ROYW1lID0gZ2V0TWV0aG9kTmFtZSggbW9kZWxOYW1lLCAnc2NoZW1hJywgJ2dldCcgKTtcblx0XHRjb25zdCBmYWN0b3J5TWV0aG9kTmFtZSA9IGdldE1ldGhvZE5hbWUoIG1vZGVsTmFtZSwgJ2ZhY3RvcnknLCAnZ2V0JyApO1xuXHRcdHNlbGVjdG9yc1sgc2NoZW1hTWV0aG9kTmFtZSBdID0gKFxuXHRcdFx0c3RhdGVcblx0XHQpID0+IHNvdXJjZS5nZXRTY2hlbWFGb3JNb2RlbCggc3RhdGUsIG1vZGVsTmFtZSApO1xuXHRcdHNlbGVjdG9yc1sgZ2V0TWV0aG9kTmFtZSggbW9kZWxOYW1lLCAnc2NoZW1hJywgJ2lzUmVxdWVzdGluZycgKSBdID1cblx0XHRcdCgpID0+IGlzUmVzb2x2aW5nKCBSRURVQ0VSX0tFWSwgc2NoZW1hTWV0aG9kTmFtZSApO1xuXHRcdHNlbGVjdG9yc1sgZmFjdG9yeU1ldGhvZE5hbWUgXSA9IChcblx0XHRcdHN0YXRlXG5cdFx0KSA9PiBzb3VyY2UuZ2V0RmFjdG9yeUZvck1vZGVsKCBzdGF0ZSwgbW9kZWxOYW1lICk7XG5cdFx0c2VsZWN0b3JzWyBnZXRNZXRob2ROYW1lKCBtb2RlbE5hbWUsICdmYWN0b3J5JywgJ2lzUmVxdWVzdGluZycgKSBdID1cblx0XHRcdCgpID0+IGlzUmVzb2x2aW5nKCBSRURVQ0VSX0tFWSwgZmFjdG9yeU1ldGhvZE5hbWUgKTtcblx0XHRyZXR1cm4gc2VsZWN0b3JzO1xuXHR9LFxuXHR7fVxuKTtcblxuLyoqXG4gKiBDcmVhdGVzIHJlc29sdmVycyBmb3IgZWFjaCByZWdpc3RlcmVkIG1vZGVsIG5hbWUgd3JhcHBpbmcgdGhlIGdlbmVyaWMgc291cmNlXG4gKiByZXNvbHZlcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8ZnVuY3Rpb24+fSBzb3VyY2VcbiAqIEByZXR1cm4ge09iamVjdDxmdW5jdGlvbj59IEFsbCB0aGUgZ2VuZXJhdGVkIHJlc29sdmVycyBmb3IgZWFjaCBtb2RlbC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVudGl0eVJlc29sdmVycyA9ICggc291cmNlICkgPT4gTU9ERUxfTkFNRVMucmVkdWNlKFxuXHQoIHJlc29sdmVycywgbW9kZWxOYW1lICkgPT4ge1xuXHRcdHJlc29sdmVyc1sgZ2V0TWV0aG9kTmFtZSggbW9kZWxOYW1lLCAnc2NoZW1hJywgJ2dldCcgKSBdID0gKCkgPT5cblx0XHRcdHNvdXJjZS5nZXRTY2hlbWFGb3JNb2RlbCggbW9kZWxOYW1lICk7XG5cdFx0cmVzb2x2ZXJzWyBnZXRNZXRob2ROYW1lKCBtb2RlbE5hbWUsICdmYWN0b3J5JywgJ2dldCcgKSBdID0gKCkgPT5cblx0XHRcdHNvdXJjZS5nZXRGYWN0b3J5Rm9yTW9kZWwoIG1vZGVsTmFtZSApO1xuXHRcdHJldHVybiByZXNvbHZlcnM7XG5cdH0sXG5cdHt9XG4pO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IG5vcm1hbGl6ZUVudGl0eUlkIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaGVscGVycyc7XG5pbXBvcnQgeyBERUZBVUxUX1NDSEVNQV9TVEFURSwgc2luZ3VsYXJNb2RlbE5hbWUgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9tb2RlbCc7XG5pbXBvcnQge1xuXHRpc1NjaGVtYVJlc3BvbnNlT2ZNb2RlbCxcblx0aXNNb2RlbEVudGl0eUZhY3RvcnlPZk1vZGVsLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcbmltcG9ydCB7IGZyb21KUywgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBpc1NoYWxsb3dFcXVhbCBmcm9tICdAd29yZHByZXNzL2lzLXNoYWxsb3ctZXF1YWwnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgQUNUSU9OX1RZUEVTIH0gZnJvbSAnLi9hY3Rpb24tdHlwZXMnO1xuXG4vLyBzZXR1cCBpbml0aWFsIHN0YXRlIG9iamVjdHNcbmNvbnN0IERFRkFVTFRfU1RBVEVfU0NIRU1BID0gZnJvbUpTKCBERUZBVUxUX1NDSEVNQV9TVEFURS5zY2hlbWEgKTtcbmNvbnN0IERFRkFVTFRfU1RBVEVfRkFDVE9SWSA9IGZyb21KUyggREVGQVVMVF9TQ0hFTUFfU1RBVEUuZmFjdG9yeSApO1xuY29uc3QgREVGQVVMVF9TVEFURV9FTkRQT0lOVFMgPSBmcm9tSlMoIERFRkFVTFRfU0NIRU1BX1NUQVRFLnJlbGF0aW9uRW5kcG9pbnRzICk7XG5jb25zdCBERUZBVUxUX1NUQVRFX1JFTEFUSU9OUyA9IGZyb21KUyggREVGQVVMVF9TQ0hFTUFfU1RBVEUucmVsYXRpb25TY2hlbWEgKTtcblxuLyoqXG4gKiBSZWR1Y2VyIGZvciBhIG1vZGVsIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge01hcH0gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEByZXR1cm4ge01hcH0gVGhlIG5ldyAob3Igb3JpZ2luYWwpIHN0YXRlLlxuICovXG5leHBvcnQgY29uc3QgcmVjZWl2ZVNjaGVtYSA9ICggc3RhdGUgPSBERUZBVUxUX1NUQVRFX1NDSEVNQSwgYWN0aW9uICkgPT4ge1xuXHR0cnkge1xuXHRcdGlmICggYWN0aW9uLnR5cGUgPT09IEFDVElPTl9UWVBFUy5SRUNFSVZFX1NDSEVNQV9SRUNPUkQgKSB7XG5cdFx0XHRjb25zdCBtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggYWN0aW9uLm1vZGVsTmFtZSApO1xuXHRcdFx0aWYgKCBpc1NjaGVtYVJlc3BvbnNlT2ZNb2RlbCggYWN0aW9uLnNjaGVtYSwgbW9kZWxOYW1lICkgKSB7XG5cdFx0XHRcdHJldHVybiBzdGF0ZS5zZXQoIG1vZGVsTmFtZSwgYWN0aW9uLnNjaGVtYSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cdHJldHVybiBzdGF0ZTtcbn07XG5cbi8qKlxuICogUmVkdWNlciBmb3IgYSBtb2RlbCBmYWN0b3J5XG4gKlxuICogQHBhcmFtIHtNYXB9IHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcmV0dXJuIHtNYXB9IHRoZSBuZXcgKG9yIG9yaWdpbmFsKSBzdGF0ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlY2VpdmVGYWN0b3J5ID0gKCBzdGF0ZSA9IERFRkFVTFRfU1RBVEVfRkFDVE9SWSwgYWN0aW9uICkgPT4ge1xuXHR0cnkge1xuXHRcdGlmICggYWN0aW9uLnR5cGUgPT09IEFDVElPTl9UWVBFUy5SRUNFSVZFX0ZBQ1RPUllfRk9SX01PREVMICkge1xuXHRcdFx0Y29uc3QgbW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIGFjdGlvbi5tb2RlbE5hbWUgKTtcblx0XHRcdGlmICggaXNNb2RlbEVudGl0eUZhY3RvcnlPZk1vZGVsKCBhY3Rpb24uZmFjdG9yeSwgbW9kZWxOYW1lICkgKSB7XG5cdFx0XHRcdHJldHVybiBzdGF0ZS5zZXQoIG1vZGVsTmFtZSwgYWN0aW9uLmZhY3RvcnkgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gY2F0Y2ggKCBlICkge1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXHRyZXR1cm4gc3RhdGU7XG59O1xuXG4vKipcbiAqIFJlZHVjZXIgZm9yIHJlbGF0aW9uIGVuZHBvaW50cy5cbiAqXG4gKiBAcGFyYW0ge01hcH1zdGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHJldHVybiB7TWFwfSBOZXcgb3Igb3JpZ2luYWwgc3RhdGUuXG4gKi9cbmV4cG9ydCBjb25zdCByZWNlaXZlUmVsYXRpb25FbmRwb2ludEZvckVudGl0eSA9IChcblx0c3RhdGUgPSBERUZBVUxUX1NUQVRFX0VORFBPSU5UUyxcblx0YWN0aW9uXG4pID0+IHtcblx0dHJ5IHtcblx0XHRpZiAoIGFjdGlvbi50eXBlID09PSBBQ1RJT05fVFlQRVMuUkVDRUlWRV9SRUxBVElPTl9FTkRQT0lOVF9GT1JfTU9ERUxfRU5USVRZICkge1xuXHRcdFx0Y29uc3QgbW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIGFjdGlvbi5tb2RlbE5hbWUgKTtcblx0XHRcdGNvbnN0IHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBhY3Rpb24ucmVsYXRpb25OYW1lICk7XG5cdFx0XHRyZXR1cm4gc3RhdGUuc2V0SW4oXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRtb2RlbE5hbWUsXG5cdFx0XHRcdFx0bm9ybWFsaXplRW50aXR5SWQoIGFjdGlvbi5lbnRpdHlJZCApLFxuXHRcdFx0XHRcdHJlbGF0aW9uTmFtZSxcblx0XHRcdFx0XSxcblx0XHRcdFx0YWN0aW9uLmVuZHBvaW50XG5cdFx0XHQpO1xuXHRcdH1cblx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cdHJldHVybiBzdGF0ZTtcbn07XG5cbi8qKlxuICogUmVkdWNlciBmb3IgcmVsYXRpb24gc2NoZW1hXG4gKlxuICogQHBhcmFtIHtNYXB9IHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcmV0dXJuIHtNYXB9IE5ldyBvciBvcmlnaW5hbCBzdGF0ZVxuICovXG5leHBvcnQgY29uc3QgcmVjZWl2ZVJlbGF0aW9uU2NoZW1hID0gKFxuXHRzdGF0ZSA9IERFRkFVTFRfU1RBVEVfUkVMQVRJT05TLFxuXHRhY3Rpb25cbikgPT4ge1xuXHRpZiAoIGFjdGlvbi50eXBlID09PSBBQ1RJT05fVFlQRVMuUkVDRUlWRV9SRUxBVElPTl9TQ0hFTUEgKSB7XG5cdFx0Y29uc3QgbW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIGFjdGlvbi5tb2RlbE5hbWUgKTtcblx0XHRjb25zdCByZWxhdGlvbk5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggYWN0aW9uLnJlbGF0aW9uTmFtZSApO1xuXHRcdGlmICggaXNTaGFsbG93RXF1YWwoXG5cdFx0XHRzdGF0ZS5nZXRJbiggWyBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSBdLCB7fSApLFxuXHRcdFx0YWN0aW9uLnJlbGF0aW9uU2NoZW1hLFxuXHRcdCkgKSB7XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXHRcdHJldHVybiBzdGF0ZS5zZXRJbihcblx0XHRcdFsgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgXSxcblx0XHRcdGFjdGlvbi5yZWxhdGlvblNjaGVtYVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIHN0YXRlO1xufTtcblxuLyoqXG4gKiBCZSBhd2FyZSB0aGF0IHRoZSByb290IHN0YXRlIGlzIGEgcGxhaW4gb2JqZWN0IGJ1dCBlYWNoIHNsaWNlICgnc2NoZW1hJyxcbiAqICdmYWN0b3J5JywgJ3JlbGF0aW9uRW5kcG9pbnRzJykgaXMgYW4gaW1tdXRhYmxlIE1hcC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKCB7XG5cdHNjaGVtYTogcmVjZWl2ZVNjaGVtYSxcblx0ZmFjdG9yeTogcmVjZWl2ZUZhY3RvcnksXG5cdHJlbGF0aW9uRW5kcG9pbnRzOiByZWNlaXZlUmVsYXRpb25FbmRwb2ludEZvckVudGl0eSxcblx0cmVsYXRpb25TY2hlbWE6IHJlY2VpdmVSZWxhdGlvblNjaGVtYSxcbn0gKTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7XG5cdGlzU2NoZW1hUmVzcG9uc2VPZk1vZGVsLFxuXHRpc01vZGVsRW50aXR5LFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcbmltcG9ydCB7XG5cdGdldEVuZHBvaW50LFxuXHRzdHJpcEJhc2VSb3V0ZUZyb21VcmwsXG5cdGNyZWF0ZUVudGl0eUZhY3RvcnksXG5cdE1PREVMX1BSRUZJWEVTLFxuXHRzaW5ndWxhck1vZGVsTmFtZSxcblx0cGx1cmFsTW9kZWxOYW1lLFxuXHRnZXRQcmltYXJ5S2V5LFxuXHRtb2RlbE5hbWVGb3JRdWVyeVN0cmluZyxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vbW9kZWwnO1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQge1xuXHRyZWNlaXZlU2NoZW1hRm9yTW9kZWxBbmRSZXNvbHZlLFxuXHRyZWNlaXZlRmFjdG9yeUZvck1vZGVsQW5kUmVzb2x2ZSxcblx0cmVjZWl2ZVJlbGF0aW9uRW5kcG9pbnRGb3JNb2RlbEVudGl0eSxcblx0cmVjZWl2ZVJlbGF0aW9uU2NoZW1hLFxuXHRyZWNlaXZlUmVsYXRpb25TY2hlbWFBbmRSZXNvbHZlLFxufSBmcm9tICcuL2FjdGlvbnMnO1xuaW1wb3J0IHsgZmV0Y2gsIHJlc29sdmVTZWxlY3QgfSBmcm9tICcuLi9iYXNlLWNvbnRyb2xzJztcbmltcG9ydCB7IFJFRFVDRVJfS0VZIGFzIENPUkVfUkVEVUNFUl9LRVkgfSBmcm9tICcuLi9jb3JlL2NvbnN0YW50cyc7XG5pbXBvcnQge1xuXHRSRURVQ0VSX0tFWSBhcyBTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdEpPSU5fUkVMQVRJT05fVFlQRVMsXG59IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBBIHJlc29sdmVyIGZvciBnZXR0aW5nIHRoZSBzY2hlbWEgZm9yIGEgZ2l2ZW4gbW9kZWwgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHJpZXZlZCBzY2hlbWEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogZ2V0U2NoZW1hRm9yTW9kZWwoIG1vZGVsTmFtZSApIHtcblx0Y29uc3QgcGF0aCA9IGdldEVuZHBvaW50KCBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICkgKTtcblx0Y29uc3Qgc2NoZW1hID0geWllbGQgZmV0Y2goIHsgcGF0aCwgbWV0aG9kOiAnT1BUSU9OUycgfSApO1xuXHR5aWVsZCogcmVjZWl2ZVNjaGVtYUZvck1vZGVsQW5kUmVzb2x2ZSggbW9kZWxOYW1lLCBzY2hlbWEgKTtcblx0cmV0dXJuIHNjaGVtYTtcbn1cblxuLyoqXG4gKiBBIHJlc29sdmVyIGZvciBnZXR0aW5nIHRoZSBtb2RlbCBlbnRpdHkgZmFjdG9yeSBmb3IgYSBnaXZlbiBtb2RlbCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge09iamVjdHxudWxsfSByZXRyaWV2ZWQgZmFjdG9yeVxuICovXG5leHBvcnQgZnVuY3Rpb24qIGdldEZhY3RvcnlGb3JNb2RlbCggbW9kZWxOYW1lLCBzY2hlbWEgPSB7fSApIHtcblx0aWYgKCAhIGlzU2NoZW1hUmVzcG9uc2VPZk1vZGVsKCBzY2hlbWEsIG1vZGVsTmFtZSApICkge1xuXHRcdHNjaGVtYSA9IHlpZWxkIHJlc29sdmVTZWxlY3QoXG5cdFx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0XHQnZ2V0U2NoZW1hRm9yTW9kZWwnLFxuXHRcdFx0bW9kZWxOYW1lXG5cdFx0KTtcblx0XHRpZiAoICEgaXNTY2hlbWFSZXNwb25zZU9mTW9kZWwoIHNjaGVtYSwgbW9kZWxOYW1lICkgKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblx0Y29uc3QgZmFjdG9yeSA9IGNyZWF0ZUVudGl0eUZhY3RvcnkoXG5cdFx0bW9kZWxOYW1lLFxuXHRcdHNjaGVtYS5zY2hlbWEsXG5cdFx0TU9ERUxfUFJFRklYRVMoIG1vZGVsTmFtZSApXG5cdCk7XG5cdHlpZWxkKiByZWNlaXZlRmFjdG9yeUZvck1vZGVsQW5kUmVzb2x2ZSggbW9kZWxOYW1lLCBmYWN0b3J5ICk7XG5cdHJldHVybiBmYWN0b3J5O1xufVxuXG4vKipcbiAqIEEgcmVzb2x2ZXIgZm9yIGdldHRpbmcgdGhlIHJlbGF0aW9uIGVuZHBvaW50IGZvciBhIGdpdmVuIG1vZGVsLCBpdCdzIGlkLCBhbmRcbiAqIHRoZSByZXF1ZXN0ZWQgcmVsYXRpb24uXG4gKlxuICogVGhlIEVFIFJFU1QgYXBpIG5hbWVzIHJlbGF0aW9ucyBhY2NvcmRpbmcgdG8gd2hldGhlciB0aGV5IHRoZXJlIGFyZSBzaW5ndWxhclxuICogb3IgcGx1cmFsIHJlbGF0aW9ucyBvbiBhIGdpdmVuIG1vZGVsIChlZy4gUmVnaXN0cmF0aW9ucyBoYXZlIG9uZSBldmVudFxuICogcmVsYXRpb24sIGJ1dCBFdmVudHMgY2FuIGhhdmUgbXVsdGlwbGUgZGF0ZXRpbWVzKS4gIFRoaXMgbWVhbnMgdGhlIG9ubHkgd2F5XG4gKiB0byBkZXJpdmUgYW4gYWNjdXJhdGUgZW5kcG9pbnQgZm9yIGEgZ2l2ZW4gcmVsYXRpb24gcmVxdWVzdCBvbiBhbiBlbnRpdHkgaXNcbiAqIHRvIHJldHJpZXZlIHRoZSBlbnRpdHkgZnJvbSB0aGUgcmVzb3VyY2UgYW5kIGRlcml2ZSB0aGUgZW5kcG9pbnQgZnJvbSB0aGVcbiAqIGxpbmtzIGluIHRoZSByZXNwb25zZS5cbiAqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtudW1iZXJ9IGVudGl0eUlkXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25Nb2RlbE5hbWVcbiAqIEByZXR1cm4ge0l0ZXJhYmxlSXRlcmF0b3I8Kj58c3RyaW5nfSBBIGdlbmVyYXRvciBvciB0aGUgZGVyaXZlZCBlbmRwb2ludC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBnZXRSZWxhdGlvbkVuZHBvaW50Rm9yRW50aXR5SWQoXG5cdG1vZGVsTmFtZSxcblx0ZW50aXR5SWQsXG5cdHJlbGF0aW9uTW9kZWxOYW1lXG4pIHtcblx0Ly8gZmlyc3QgYXR0ZW1wdCB0byBnZXQgdGhlIHJlbGF0aW9uIGVuZHBvaW50IGZyb20gdGhlIGVudGl0eSB0aGF0IG1pZ2h0XG5cdC8vIGFscmVhZHkgYmUgaW4gY29yZSBzdGF0ZS5cblx0Y29uc3QgZW50aXR5ID0geWllbGQgcmVzb2x2ZVNlbGVjdChcblx0XHRDT1JFX1JFRFVDRVJfS0VZLFxuXHRcdCdnZXRFbnRpdHlCeUlkJyxcblx0XHRtb2RlbE5hbWUsXG5cdFx0ZW50aXR5SWRcblx0KTtcblx0cmVsYXRpb25Nb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25Nb2RlbE5hbWUgKTtcblx0Y29uc3QgcGx1cmFsUmVsYXRpb25OYW1lID0gcGx1cmFsTW9kZWxOYW1lKCByZWxhdGlvbk1vZGVsTmFtZSApO1xuXHRsZXQgZW5kcG9pbnQgPSAnJztcblx0aWYgKCBpc01vZGVsRW50aXR5KCBlbnRpdHkgKSAmJiBlbnRpdHlbIHBsdXJhbFJlbGF0aW9uTmFtZSArICdSZXNvdXJjZScgXSApIHtcblx0XHRlbmRwb2ludCA9IHN0cmlwQmFzZVJvdXRlRnJvbVVybChcblx0XHRcdGVudGl0eVsgcGx1cmFsUmVsYXRpb25OYW1lICsgJ1Jlc291cmNlJyBdLnJlc291cmNlTGlua1xuXHRcdCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgcGF0aCA9IGdldEVuZHBvaW50KCBtb2RlbE5hbWUgKSArICcvJyArIGVudGl0eUlkO1xuXHRcdGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goIHsgcGF0aCB9ICk7XG5cdFx0aWYgKCAhIHJlc3BvbnNlLl9saW5rcyApIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdFx0Y29uc3QgbGlua3MgPSByZXNwb25zZS5fbGlua3MgfHwge307XG5cdFx0Y29uc3QgYmFzZVJlbGF0aW9uUGF0aCA9ICdodHRwczovL2FwaS5ldmVudGVzcHJlc3NvLmNvbS8nO1xuXHRcdGVuZHBvaW50ID0gbGlua3NbXG5cdFx0XHRiYXNlUmVsYXRpb25QYXRoICsgcmVsYXRpb25Nb2RlbE5hbWVcblx0XHRdIHx8ICcnO1xuXHRcdGVuZHBvaW50ID0gKCBlbmRwb2ludCA9PT0gJycgJiYgbGlua3NbXG5cdFx0XHRiYXNlUmVsYXRpb25QYXRoICsgcGx1cmFsUmVsYXRpb25OYW1lXG5cdFx0XSApIHx8IGVuZHBvaW50O1xuXHR9XG5cdGlmICggZW5kcG9pbnQgKSB7XG5cdFx0eWllbGQgcmVjZWl2ZVJlbGF0aW9uRW5kcG9pbnRGb3JNb2RlbEVudGl0eShcblx0XHRcdG1vZGVsTmFtZSxcblx0XHRcdGVudGl0eUlkLFxuXHRcdFx0cmVsYXRpb25Nb2RlbE5hbWUsXG5cdFx0XHRlbmRwb2ludFxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIGVuZHBvaW50O1xufVxuXG4vKipcbiAqIEEgcmVzb2x2ZXIgZm9yIGdldHRpbmcgdGhlIHByaW1hcnkga2V5IHN0cmluZyB0byB1c2UgaW4gYSBxdWVyeSBmb3IgdGhlIGdpdmVuXG4gKiBtb2RlbCBhbmQgcmVsYXRpb24uIFRoaXMgY29uc2lkZXJzIHRoZSBqb2luIHR5cGUgZm9yIHRoZSByZWxhdGlvbi5cbiAqXG4gKiBAc2VlIHRoZSBgZ2V0UmVsYXRpb25QcmltYXJ5S2V5U3RyaW5nYCBzZWxlY3RvciBmb3IgZXhhbXBsZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBwcmltYXJ5IGtleSBzdHJpbmcgdG8gdXNlIG9yIGFuIGVtcHR5IHN0cmluZyBpZiByZWxhdGlvblxuICogdHlwZSBjb3VsZCBub3QgYmUgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBnZXRSZWxhdGlvblByaW1hcnlLZXlTdHJpbmcoIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICkge1xuXHQvLyBub3JtYWxpemVcblx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRyZWxhdGlvbk5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25OYW1lICk7XG5cdGNvbnN0IHJlbGF0aW9uVHlwZSA9IHlpZWxkIHJlc29sdmVTZWxlY3QoXG5cdFx0U0NIRU1BX1JFRFVDRVJfS0VZLFxuXHRcdCdnZXRSZWxhdGlvblR5cGUnLFxuXHRcdG1vZGVsTmFtZSxcblx0XHRyZWxhdGlvbk5hbWVcblx0KTtcblx0aWYgKCByZWxhdGlvblR5cGUgPT09ICcnICkge1xuXHRcdHJldHVybiAnJztcblx0fVxuXHRjb25zdCByZWxhdGlvblByaW1hcnlLZXkgPSBnZXRQcmltYXJ5S2V5KCByZWxhdGlvbk5hbWUgKTtcblx0cmV0dXJuIHJlbGF0aW9uVHlwZSA9PT0gJ0VFX0JlbG9uZ3NfVG9fUmVsYXRpb24nID9cblx0XHRyZWxhdGlvblByaW1hcnlLZXkgOlxuXHRcdGAkeyBtb2RlbE5hbWVGb3JRdWVyeVN0cmluZyggcmVsYXRpb25OYW1lICkgfS4keyByZWxhdGlvblByaW1hcnlLZXkgfWA7XG59XG5cbi8qKlxuICogQSByZXNvbHZlciBmb3IgcmV0dXJuaW5nIHdoYXQgdGhlIGV4cGVjdGVkIHJlc3BvbnNlIHR5cGUgaXMgZm9yIHRoZSBnaXZlblxuICogcmVsYXRpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgVGhlIG1vZGVsIHRoZSByZWxhdGlvbiBpcyBmb3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIFRoZSBtb2RlbCBuYW1lIHRoZSByZWxhdGlvbiBpcyB0by5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHR5cGUgb2YgdGhlIHJlbGF0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24qIGdldFJlbGF0aW9uUmVzcG9uc2VUeXBlKCBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSApIHtcblx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRyZWxhdGlvbk5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25OYW1lICk7XG5cdGNvbnN0IHJlbGF0aW9uU2NoZW1hID0geWllbGQgcmVzb2x2ZVNlbGVjdChcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J2dldFJlbGF0aW9uU2NoZW1hJyxcblx0XHRtb2RlbE5hbWUsXG5cdFx0cmVsYXRpb25OYW1lLFxuXHQpO1xuXHRyZXR1cm4gcmVsYXRpb25TY2hlbWEgIT09IG51bGwgPyByZWxhdGlvblNjaGVtYS50eXBlIDogJyc7XG59XG5cbi8qKlxuICogQSByZXNvbHZlciBmb3IgcmV0dXJuaW5nIHdoZXRoZXIgdGhlIGdpdmVuIG1vZGVsTmFtZSBhbmQgcmVsYXRpb25OYW1lIGhhdmVcbiAqIGEgam9pbiB0YWJsZSBmb3IgcmVwcmVzZW50aW5nIHRoZWlyIHJlbGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoZXJlIGlzIGEgam9pbiB0YWJsZSwgZmFsc2UgbWVhbnMgdGhlcmUgaXNuJ3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogaGFzSm9pblRhYmxlUmVsYXRpb24oIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICkge1xuXHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0Y29uc3QgcmVsYXRpb25UeXBlID0geWllbGQgcmVzb2x2ZVNlbGVjdChcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J2dldFJlbGF0aW9uVHlwZScsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdHJlbGF0aW9uTmFtZSxcblx0KTtcblx0cmV0dXJuIEpPSU5fUkVMQVRJT05fVFlQRVMuaW5kZXhPZiggcmVsYXRpb25UeXBlICkgPiAtMTtcbn1cblxuLyoqXG4gKiBBIHJlc29sdmVyIGZvciBnZXR0aW5nIHRoZSByZWxhdGlvbiB0eXBlIGRlc2NyaWJpbmcgdGhlIHJlbGF0aW9uIGJldHdlZW5cbiAqIG1vZGVsTmFtZSBhbmQgcmVsYXRpb25OYW1lXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICogQHJldHVybiB7c3RyaW5nfSAgVGhlIHJlbGF0aW9uIHR5cGUgdG8gZGVzY3JpYmUgdGhlIHJlbGF0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogZ2V0UmVsYXRpb25UeXBlKCBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSApIHtcblx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRyZWxhdGlvbk5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25OYW1lICk7XG5cdGNvbnN0IHJlbGF0aW9uU2NoZW1hID0geWllbGQgcmVzb2x2ZVNlbGVjdChcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J2dldFJlbGF0aW9uU2NoZW1hJyxcblx0XHRtb2RlbE5hbWUsXG5cdFx0cmVsYXRpb25OYW1lXG5cdCk7XG5cdHJldHVybiByZWxhdGlvblNjaGVtYSAhPT0gbnVsbCA/IHJlbGF0aW9uU2NoZW1hLnJlbGF0aW9uX3R5cGUgOiAnJztcbn1cblxuLyoqXG4gKiBBIHJlc29sdmVyIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGlvbiBzY2hlbWEgZnJvbSB0aGUgc2VydmVyIGZvciB0aGUgZ2l2ZW5cbiAqIG1vZGVsTmFtZSBhbmQgcmVsYXRpb25OYW1lLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEB0aHJvd3MgRXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBoeWRyYXRlUmVsYXRpb25TY2hlbWEoIHNjaGVtYSwgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgKSB7XG5cdG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKTtcblx0cmVsYXRpb25OYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIHJlbGF0aW9uTmFtZSApO1xuXHR5aWVsZCByZWNlaXZlUmVsYXRpb25TY2hlbWFBbmRSZXNvbHZlKFxuXHRcdG1vZGVsTmFtZSxcblx0XHRyZWxhdGlvbk5hbWUsXG5cdFx0c2NoZW1hXG5cdCk7XG59XG5cbi8qKlxuICogQSByZXNvbHZlciBmb3IgcmV0cmlldmluZyB0aGUgcmVsYXRpb24gc2NoZW1hIGZyb20gdGhlIHNlcnZlciBmb3IgdGhlIGdpdmVuXG4gKiBtb2RlbE5hbWUgYW5kIHJlbGF0aW9uTmFtZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gKiBAdGhyb3dzIEVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogZ2V0UmVsYXRpb25TY2hlbWEoIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICkge1xuXHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdGNvbnN0IHNjaGVtYSA9IHlpZWxkIHJlc29sdmVTZWxlY3QoXG5cdFx0U0NIRU1BX1JFRFVDRVJfS0VZLFxuXHRcdCdnZXRTY2hlbWFGb3JNb2RlbCcsXG5cdFx0bW9kZWxOYW1lXG5cdCk7XG5cdGlmICggc2NoZW1hID09PSBudWxsICkge1xuXHRcdHRocm93IG5ldyBFcnJvciggJ1RoZSAnICsgbW9kZWxOYW1lICsgJyBkb2VzIG5vdCBoYXZlIGEgc2NoZW1hJyApO1xuXHR9XG5cdHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0Y29uc3QgcGx1cmFsUmVsYXRpb25OYW1lID0gcGx1cmFsTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0Ly8gaXMgdGhlcmUgYSBzY2hlbWEgZm9yIHBsdXJhbCByZWxhdGlvbiBuYW1lP1xuXHRsZXQgdHlwZVNjaGVtYSA9IHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSggJ3NjaGVtYScgKSAmJlxuXHRcdHNjaGVtYS5zY2hlbWEuaGFzT3duUHJvcGVydHkoICdwcm9wZXJ0aWVzJyApID9cblx0XHRzY2hlbWEuc2NoZW1hLnByb3BlcnRpZXNbIHBsdXJhbFJlbGF0aW9uTmFtZSBdIDpcblx0XHRudWxsO1xuXHR0eXBlU2NoZW1hID0gdHlwZVNjaGVtYSA9PT0gbnVsbCAmJlxuXHRcdCEgaXNVbmRlZmluZWQoIHNjaGVtYS5zY2hlbWEucHJvcGVydGllc1sgcmVsYXRpb25OYW1lIF0gKSA/XG5cdFx0c2NoZW1hLnNjaGVtYS5wcm9wZXJ0aWVzWyByZWxhdGlvbk5hbWUgXSA6XG5cdFx0dHlwZVNjaGVtYTtcblx0aWYgKCB0eXBlU2NoZW1hID09PSBudWxsICkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdCdUaGVyZSBpcyBubyByZWxhdGlvbiBmb3IgJyArIHJlbGF0aW9uTmFtZSArICcgb24gdGhlICcgK1xuXHRcdFx0J21vZGVsICcgKyBtb2RlbE5hbWVcblx0XHQpO1xuXHR9XG5cdHlpZWxkIHJlY2VpdmVSZWxhdGlvblNjaGVtYShcblx0XHRtb2RlbE5hbWUsXG5cdFx0cmVsYXRpb25OYW1lLFxuXHRcdHR5cGVTY2hlbWFcblx0KTtcbn1cbiIsIi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGlzUmVzb2x2aW5nLCBoYXNGaW5pc2hlZFJlc29sdmluZyB9IGZyb20gJy4uL2Jhc2Utc2VsZWN0b3JzJztcbmltcG9ydCB7IFJFRFVDRVJfS0VZLCBKT0lOX1JFTEFUSU9OX1RZUEVTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0c2luZ3VsYXJNb2RlbE5hbWUsXG5cdGdldFByaW1hcnlLZXksXG5cdG1vZGVsTmFtZUZvclF1ZXJ5U3RyaW5nLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby9tb2RlbCc7XG5pbXBvcnQgeyBub3JtYWxpemVFbnRpdHlJZCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2hlbHBlcnMnO1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBjcmVhdGVTZWxlY3RvciBmcm9tICdyZW1lbW8nO1xuXG4vKipcbiAqIFNlbGVjdG9yIGZvciByZXR1cm5pbmcgdGhlIHNjaGVtYSBvYmplY3QgZm9yIGEgZ2l2ZW4gbW9kZWwgbmFtZSBmcm9tIHRoZVxuICogc3RhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHNjaGVtYSBvYmplY3Qgb3IgbnVsbCBpZiBpdCBkb2Vzbid0IGV4aXN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NoZW1hRm9yTW9kZWwoIHN0YXRlLCBtb2RlbE5hbWUgKSB7XG5cdHJldHVybiBzdGF0ZS5zY2hlbWEuZ2V0KCBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICksIG51bGwgKTtcbn1cblxuLyoqXG4gKiBTZWxlY3RvciBmb3IgcmV0dXJuaW5nIHdoZXRoZXIgdGhlIHNjaGVtYSBpcyBiZWluZyByZXF1ZXN0ZWQgb3Igbm90IGZvciB0aGVcbiAqIGdpdmVuIG1vZGVsIG5hbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyBpdHMgYmVpbmcgcmVxdWVzdGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNSZXF1ZXN0aW5nU2NoZW1hRm9yTW9kZWwoIHN0YXRlLCBtb2RlbE5hbWUgKSB7XG5cdHJldHVybiBpc1Jlc29sdmluZyhcblx0XHRSRURVQ0VSX0tFWSxcblx0XHQnZ2V0U2NoZW1hRm9yTW9kZWwnLFxuXHRcdHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKVxuXHQpO1xufVxuXG4vKipcbiAqIFNlbGVjdG9yIGZvciByZXR1cm5pbmcgd2hldGhlciB0aGUgc2NoZW1hIGhhcyBiZWVuIHJlc29sdmVkIG9yIG5vdCBmb3IgdGhlXG4gKiBnaXZlbiBtb2RlbCBuYW1lLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoYXQgdGhlIHNjaGVtYSBoYXMgZmluaXNoZWQgcmVzb2x2aW5nIGZvciB0aGlzXG4gKiBtb2RlbCBuYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzUmVzb2x2ZWRTY2hlbWFGb3JNb2RlbCggc3RhdGUsIG1vZGVsTmFtZSApIHtcblx0cmV0dXJuIGhhc0ZpbmlzaGVkUmVzb2x2aW5nKFxuXHRcdFJFRFVDRVJfS0VZLFxuXHRcdCdnZXRTY2hlbWFGb3JNb2RlbCcsXG5cdFx0c2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApXG5cdCk7XG59XG5cbi8qKlxuICogU2VsZWN0b3IgZm9yIHJldHVybmluZyB0aGUgbW9kZWwgZW50aXR5IGZhY3Rvcnkgb2JqZWN0IGZvciBhIGdpdmVuXG4gKiBtb2RlbCBuYW1lIGZyb20gdGhlIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtb2RlbCBlbnRpdHkgZmFjdG9yeSBvciBudWxsIGlmIGl0IGRvZXNuJ3RcbiAqIGV4aXN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmFjdG9yeUZvck1vZGVsKCBzdGF0ZSwgbW9kZWxOYW1lICkge1xuXHRjb25zdCBmYWN0b3J5ID0gc3RhdGUuZmFjdG9yeS5nZXQoIHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKSwgbnVsbCApO1xuXHRyZXR1cm4gISAoIGZhY3RvcnkgaW5zdGFuY2VvZiBNYXAgKSA/IGZhY3RvcnkgOiBudWxsO1xufVxuXG4vKipcbiAqIFNlbGVjdG9yIGZvciByZXR1cm5pbmcgd2hldGhlciB0aGUgbW9kZWwgZW50aXR5IGZhY3RvcnkgaXMgYmVpbmcgcmVxdWVzdGVkXG4gKiBvciBub3QgZm9yIHRoZSBnaXZlbiBtb2RlbCBuYW1lIGZyb20gdGhlIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgaXQgaXMgYmVpbmcgcmVxdWVzdGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNSZXF1ZXN0aW5nRmFjdG9yeUZvck1vZGVsKCBzdGF0ZSwgbW9kZWxOYW1lICkge1xuXHRyZXR1cm4gaXNSZXNvbHZpbmcoXG5cdFx0UkVEVUNFUl9LRVksXG5cdFx0J2dldEZhY3RvcnlGb3JNb2RlbCcsXG5cdFx0c2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApXG5cdCk7XG59XG5cbi8qKlxuICogU2VsZWN0b3IgZm9yIHJldHVybmluZyB3aGV0aGVyIHRoZSBmYWN0b3J5IGhhcyBiZWVuIHJlc29sdmVkIG9yIG5vdCBmb3IgdGhlXG4gKiBnaXZlbiBtb2RlbCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGF0IHRoZSBmYWN0b3J5IGhhcyBmaW5pc2hlZCByZXNvbHZpbmcgZm9yIHRoaXNcbiAqIG1vZGVsIG5hbWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNSZXNvbHZlZEZhY3RvcnlGb3JNb2RlbCggc3RhdGUsIG1vZGVsTmFtZSApIHtcblx0cmV0dXJuIGhhc0ZpbmlzaGVkUmVzb2x2aW5nKFxuXHRcdFJFRFVDRVJfS0VZLFxuXHRcdCdnZXRGYWN0b3J5Rm9yTW9kZWwnLFxuXHRcdHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKVxuXHQpO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgcmVsYXRpb24gZW5kcG9pbnQgZm9yIHRoZSBnaXZlbiBtb2RlbCwgZW50aXR5IGlkIGFuZCByZWxhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZW50aXR5SWRcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk1vZGVsTmFtZVxuICogQHJldHVybiB7c3RyaW5nfSBSZXR1cm5zIHRoZSByZWxhdGlvbiBlbmRwb2ludCBpZiBhdmFpbGFibGUgb3IgYW4gZW1wdHlcbiAqIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbGF0aW9uRW5kcG9pbnRGb3JFbnRpdHlJZChcblx0c3RhdGUsXG5cdG1vZGVsTmFtZSxcblx0ZW50aXR5SWQsXG5cdHJlbGF0aW9uTW9kZWxOYW1lXG4pIHtcblx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRyZWxhdGlvbk1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk1vZGVsTmFtZSApO1xuXHRlbnRpdHlJZCA9IG5vcm1hbGl6ZUVudGl0eUlkKCBlbnRpdHlJZCApO1xuXHRyZXR1cm4gc3RhdGUucmVsYXRpb25FbmRwb2ludHMuZ2V0SW4oXG5cdFx0WyBtb2RlbE5hbWUsIGVudGl0eUlkLCByZWxhdGlvbk1vZGVsTmFtZSBdXG5cdCkgfHwgJyc7XG59XG5cbi8qKlxuICogU2VsZWN0b3IgZm9yIHJldHVybmluZyB3aGV0aGVyIHRoZSByZWxhdGlvbiBlbmRwb2ludCBpcyBiZWluZyByZXF1ZXN0ZWRcbiAqIG9yIG5vdCBmb3IgdGhlIGdpdmVuIG1vZGVsIG5hbWUsIGVudGl0eSBpZCwgYW5kIHJlbGF0aW9uIGZyb20gdGhlIHN0YXRlLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGVudGl0eUlkXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25Nb2RlbE5hbWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIGJlaW5nIHJlcXVlc3RlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUmVxdWVzdGluZ1JlbGF0aW9uRW5kcG9pbnRGb3JFbnRpdHlJZChcblx0c3RhdGUsXG5cdG1vZGVsTmFtZSxcblx0ZW50aXR5SWQsXG5cdHJlbGF0aW9uTW9kZWxOYW1lXG4pIHtcblx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRlbnRpdHlJZCA9IG5vcm1hbGl6ZUVudGl0eUlkKCBlbnRpdHlJZCApO1xuXHRyZWxhdGlvbk1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk1vZGVsTmFtZSApO1xuXHRyZXR1cm4gaXNSZXNvbHZpbmcoXG5cdFx0UkVEVUNFUl9LRVksXG5cdFx0J2dldFJlbGF0aW9uRW5kcG9pbnRGb3JFbnRpdHlJZCcsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdGVudGl0eUlkLFxuXHRcdHJlbGF0aW9uTW9kZWxOYW1lLFxuXHQpO1xufVxuXG4vKipcbiAqIFNlbGVjdG9yIGZvciByZXR1cm5pbmcgdGhlIHByaW1hcnkga2V5IHN0cmluZyB0byB1c2UgaW4gYSBxdWVyeSBmb3IgdGhlIGdpdmVuXG4gKiBtb2RlbCBhbmQgcmVsYXRpb24uICBUaGlzIGNvbnNpZGVycyB0aGUgam9pbiB0eXBlIGZvciB0aGUgcmVsYXRpb24uXG4gKlxuICogRm9yIGV4YW1wbGU6ICBJZiB5b3Ugd2VyZSBkb2luZyBhIHF1ZXJ5IHRvIGdldCB0aGUgcmVnaXN0cmF0aW9ucyByZWxhdGVkIHRvIGFuXG4gKiBhdHRlbmRlZSwgeW91IHdvdWxkIG5lZWQgdGhlIHN0cmluZyB0byB1c2UgZm9yIHRoZSBgUkVHX0lEYCBwcmltYXJ5IGtleSBpblxuICogdGhlIHF1ZXJ5LiAgU2luY2UgdGhlIGpvaW4gdHlwZSBmb3IgcmVnaXN0cmF0aW9ucyB0byBhdHRlbmRlZXMgaXNcbiAqIEVFX0hhc19NYW55X1JlbGF0aW9uLCB0aGVuIHRoZSBxdWVyeSBzdHJpbmcgd291bGQgbmVlZCB0byBiZVxuICogYFJlZ2lzdHJhdGlvbi5SRUdfSURgLiAgSWYgaG93ZXZlciB5b3Ugd2VyZSBnZXR0aW5nIHRoZSBhdHRlbmRlZSByZWxhdGVkXG4gKiB0byBhIHJlZ2lzdHJhdGlvbiwgdGhlbiB0aGUgam9pbiB0eXBlIGZvciBhdHRlbmRlZXMgb24gcmVnaXN0cmF0aW9ucyBpc1xuICogRUVfQmVsb25nc19Ub19SZWxhdGlvbiwgaW4gd2hpY2ggY2FzZSB0aGUgYXR0ZW5kZWUgcHJpbWFyeSBrZXkgd291bGQgYmVcbiAqIGBBVFRfSURgICh0aGUgcmVnaXN0cmF0aW9uIHRhYmxlIGhhcyB0aGUgZm9yZWlnbiBrZXkgb24gaXQpLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICpcbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHByaW1hcnkga2V5IHN0cmluZyB0byB1c2Ugb3IgYW4gZW1wdHkgc3RyaW5nIGlmIHJlbGF0aW9uXG4gKiB0eXBlIGNvdWxkIG5vdCBiZSBkZXRlcm1pbmVkLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UmVsYXRpb25QcmltYXJ5S2V5U3RyaW5nID0gY3JlYXRlU2VsZWN0b3IoXG5cdChcblx0XHRzdGF0ZSxcblx0XHRtb2RlbE5hbWUsXG5cdFx0cmVsYXRpb25OYW1lXG5cdCkgPT4ge1xuXHRcdG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKTtcblx0XHRyZWxhdGlvbk5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25OYW1lICk7XG5cdFx0Y29uc3QgcmVsYXRpb25UeXBlID0gZ2V0UmVsYXRpb25UeXBlKCBzdGF0ZSwgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgKTtcblx0XHRpZiAoIHJlbGF0aW9uVHlwZSA9PT0gJycgKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdGNvbnN0IHJlbGF0aW9uUHJpbWFyeUtleSA9IGdldFByaW1hcnlLZXkoIHJlbGF0aW9uTmFtZSApO1xuXHRcdHJldHVybiByZWxhdGlvblR5cGUgPT09ICdFRV9CZWxvbmdzX1RvX1JlbGF0aW9uJyA/XG5cdFx0XHRyZWxhdGlvblByaW1hcnlLZXkgOlxuXHRcdFx0YCR7IG1vZGVsTmFtZUZvclF1ZXJ5U3RyaW5nKCByZWxhdGlvbk5hbWUgKSB9LiR7IHJlbGF0aW9uUHJpbWFyeUtleSB9YDtcblx0fSxcblx0KCBzdGF0ZSwgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgKSA9PiB7XG5cdFx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRcdHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0XHRyZXR1cm4gW1xuXHRcdFx0c3RhdGUucmVsYXRpb25TY2hlbWEuZ2V0SW4oIFsgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgXSwgJycgKSxcblx0XHRdO1xuXHR9LFxuKTtcblxuLyoqXG4gKiBTZWxlY3RvciByZXR1cm5pbmcgdGhlIHJlbGF0aW9uIHJlc3BvbnNlIHR5cGUgZm9yIHRoZSBnaXZlbiByZWxhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHR5cGUgZm9yIHRoZSByZWxhdGlvbiByZXR1cm5lZCBmb3IgdGhlIGdpdmVuIG1vZGVsIGFuZFxuICogcmVsYXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSZWxhdGlvblJlc3BvbnNlVHlwZSA9ICggc3RhdGUsIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICkgPT4ge1xuXHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0Y29uc3QgcmVsYXRpb25TY2hlbWEgPSBnZXRSZWxhdGlvblNjaGVtYSggc3RhdGUsIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICk7XG5cdHJldHVybiByZWxhdGlvblNjaGVtYSAhPT0gbnVsbCA/XG5cdFx0cmVsYXRpb25TY2hlbWEudHlwZSA6XG5cdFx0Jyc7XG59O1xuXG4vKipcbiAqIFNlbGVjdG9yIHJldHVybmluZyB3aGV0aGVyIHRoZSByZWxhdGlvbiBiZXR3ZWVuIHRoZSBnaXZlbiBtb2RlbCBuYW1lIGFuZFxuICogcmVsYXRpb24gbmFtZSBoYXMgYSBqb2luIHRhYmxlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGVyZSBpcyBhIGpvaW4gdGFibGUsIGZhbHNlIG1lYW5zIHRoZXJlIGlzbid0LlxuICovXG5leHBvcnQgY29uc3QgaGFzSm9pblRhYmxlUmVsYXRpb24gPSAoIHN0YXRlLCBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSApID0+IHtcblx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRyZWxhdGlvbk5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25OYW1lICk7XG5cdGNvbnN0IHJlbGF0aW9uVHlwZSA9IGdldFJlbGF0aW9uVHlwZSggc3RhdGUsIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICk7XG5cdHJldHVybiBKT0lOX1JFTEFUSU9OX1RZUEVTLmluZGV4T2YoIHJlbGF0aW9uVHlwZSApID4gLTE7XG59O1xuXG4vKipcbiAqIFNlbGVjdG9yIHJldHVybmluZyB0aGUgcmVsYXRpb24gdHlwZSBkZXNjcmliaW5nIHRoZSByZWxhdGlvbiBiZXR3ZWVuIHRoZVxuICogZ2l2ZW4gbW9kZWwgbmFtZSBhbmQgcmVsYXRpb24gbmFtZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEByZXR1cm4ge3N0cmluZ30gIFRoZSByZWxhdGlvbiB0eXBlIChlZy4gXCJFRV9IQUJUTV9SZWxhdGlvblwiKVxuICovXG5leHBvcnQgY29uc3QgZ2V0UmVsYXRpb25UeXBlID0gKCBzdGF0ZSwgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgKSA9PiB7XG5cdG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKTtcblx0cmVsYXRpb25OYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIHJlbGF0aW9uTmFtZSApO1xuXHRjb25zdCByZWxhdGlvblNjaGVtYSA9IGdldFJlbGF0aW9uU2NoZW1hKCBzdGF0ZSwgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgKTtcblx0cmV0dXJuIHJlbGF0aW9uU2NoZW1hICE9PSBudWxsID9cblx0XHRyZWxhdGlvblNjaGVtYS5yZWxhdGlvbl90eXBlIDpcblx0XHQnJztcbn07XG5cbi8qKlxuICogU2VsZWN0b3IgcmV0dXJuaW5nIHRoZSByZWxhdGlvbiBzY2hlbWEgZGVzY3JpYmluZyB0aGUgcmVsYXRpb24gYmV0d2VlbiB0aGVcbiAqIGdpdmVuIG1vZGVsIG5hbWUgYW5kIHJlbGF0aW9uIG5hbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gKiBAcmV0dXJuIHtPYmplY3R8bnVsbH0gQW4gb2JqZWN0IG9yIG51bGwgaWYgdGhlcmUgaXMgbm8gcmVsYXRpb24gc2NoZW1hLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UmVsYXRpb25TY2hlbWEgPSAoIHN0YXRlLCBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSApID0+IHtcblx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRyZWxhdGlvbk5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25OYW1lICk7XG5cdHJldHVybiBzdGF0ZS5yZWxhdGlvblNjaGVtYS5nZXRJbiggWyBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSBdLCBudWxsICk7XG59O1xuIiwiZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXM7IiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FzeW5jVG9HZW5lcmF0b3I7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBhcnJheVdpdGhvdXRIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aG91dEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5XCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZFwiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90b0NvbnN1bWFibGVBcnJheTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbi8vIFVzZWQgZm9yIHNldHRpbmcgcHJvdG90eXBlIG1ldGhvZHMgdGhhdCBJRTggY2hva2VzIG9uLlxudmFyIERFTEVURSA9ICdkZWxldGUnO1xuXG4vLyBDb25zdGFudHMgZGVzY3JpYmluZyB0aGUgc2l6ZSBvZiB0cmllIG5vZGVzLlxudmFyIFNISUZUID0gNTsgLy8gUmVzdWx0ZWQgaW4gYmVzdCBwZXJmb3JtYW5jZSBhZnRlciBfX19fX18/XG52YXIgU0laRSA9IDEgPDwgU0hJRlQ7XG52YXIgTUFTSyA9IFNJWkUgLSAxO1xuXG4vLyBBIGNvbnNpc3RlbnQgc2hhcmVkIHZhbHVlIHJlcHJlc2VudGluZyBcIm5vdCBzZXRcIiB3aGljaCBlcXVhbHMgbm90aGluZyBvdGhlclxuLy8gdGhhbiBpdHNlbGYsIGFuZCBub3RoaW5nIHRoYXQgY291bGQgYmUgcHJvdmlkZWQgZXh0ZXJuYWxseS5cbnZhciBOT1RfU0VUID0ge307XG5cbi8vIEJvb2xlYW4gcmVmZXJlbmNlcywgUm91Z2ggZXF1aXZhbGVudCBvZiBgYm9vbCAmYC5cbmZ1bmN0aW9uIE1ha2VSZWYoKSB7XG4gIHJldHVybiB7IHZhbHVlOiBmYWxzZSB9O1xufVxuXG5mdW5jdGlvbiBTZXRSZWYocmVmKSB7XG4gIGlmIChyZWYpIHtcbiAgICByZWYudmFsdWUgPSB0cnVlO1xuICB9XG59XG5cbi8vIEEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIHZhbHVlIHJlcHJlc2VudGluZyBhbiBcIm93bmVyXCIgZm9yIHRyYW5zaWVudCB3cml0ZXNcbi8vIHRvIHRyaWVzLiBUaGUgcmV0dXJuIHZhbHVlIHdpbGwgb25seSBldmVyIGVxdWFsIGl0c2VsZiwgYW5kIHdpbGwgbm90IGVxdWFsXG4vLyB0aGUgcmV0dXJuIG9mIGFueSBzdWJzZXF1ZW50IGNhbGwgb2YgdGhpcyBmdW5jdGlvbi5cbmZ1bmN0aW9uIE93bmVySUQoKSB7fVxuXG5mdW5jdGlvbiBlbnN1cmVTaXplKGl0ZXIpIHtcbiAgaWYgKGl0ZXIuc2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaXRlci5zaXplID0gaXRlci5fX2l0ZXJhdGUocmV0dXJuVHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIGl0ZXIuc2l6ZTtcbn1cblxuZnVuY3Rpb24gd3JhcEluZGV4KGl0ZXIsIGluZGV4KSB7XG4gIC8vIFRoaXMgaW1wbGVtZW50cyBcImlzIGFycmF5IGluZGV4XCIgd2hpY2ggdGhlIEVDTUFTdHJpbmcgc3BlYyBkZWZpbmVzIGFzOlxuICAvL1xuICAvLyAgICAgQSBTdHJpbmcgcHJvcGVydHkgbmFtZSBQIGlzIGFuIGFycmF5IGluZGV4IGlmIGFuZCBvbmx5IGlmXG4gIC8vICAgICBUb1N0cmluZyhUb1VpbnQzMihQKSkgaXMgZXF1YWwgdG8gUCBhbmQgVG9VaW50MzIoUCkgaXMgbm90IGVxdWFsXG4gIC8vICAgICB0byAyXjMy4oiSMS5cbiAgLy9cbiAgLy8gaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLWFycmF5LWV4b3RpYy1vYmplY3RzXG4gIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSB7XG4gICAgdmFyIHVpbnQzMkluZGV4ID0gaW5kZXggPj4+IDA7IC8vIE4gPj4+IDAgaXMgc2hvcnRoYW5kIGZvciBUb1VpbnQzMlxuICAgIGlmICgnJyArIHVpbnQzMkluZGV4ICE9PSBpbmRleCB8fCB1aW50MzJJbmRleCA9PT0gNDI5NDk2NzI5NSkge1xuICAgICAgcmV0dXJuIE5hTjtcbiAgICB9XG4gICAgaW5kZXggPSB1aW50MzJJbmRleDtcbiAgfVxuICByZXR1cm4gaW5kZXggPCAwID8gZW5zdXJlU2l6ZShpdGVyKSArIGluZGV4IDogaW5kZXg7XG59XG5cbmZ1bmN0aW9uIHJldHVyblRydWUoKSB7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiB3aG9sZVNsaWNlKGJlZ2luLCBlbmQsIHNpemUpIHtcbiAgcmV0dXJuIChcbiAgICAoKGJlZ2luID09PSAwICYmICFpc05lZyhiZWdpbikpIHx8XG4gICAgICAoc2l6ZSAhPT0gdW5kZWZpbmVkICYmIGJlZ2luIDw9IC1zaXplKSkgJiZcbiAgICAoZW5kID09PSB1bmRlZmluZWQgfHwgKHNpemUgIT09IHVuZGVmaW5lZCAmJiBlbmQgPj0gc2l6ZSkpXG4gICk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVCZWdpbihiZWdpbiwgc2l6ZSkge1xuICByZXR1cm4gcmVzb2x2ZUluZGV4KGJlZ2luLCBzaXplLCAwKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUVuZChlbmQsIHNpemUpIHtcbiAgcmV0dXJuIHJlc29sdmVJbmRleChlbmQsIHNpemUsIHNpemUpO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlSW5kZXgoaW5kZXgsIHNpemUsIGRlZmF1bHRJbmRleCkge1xuICAvLyBTYW5pdGl6ZSBpbmRpY2VzIHVzaW5nIHRoaXMgc2hvcnRoYW5kIGZvciBUb0ludDMyKGFyZ3VtZW50KVxuICAvLyBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9pbnQzMlxuICByZXR1cm4gaW5kZXggPT09IHVuZGVmaW5lZFxuICAgID8gZGVmYXVsdEluZGV4XG4gICAgOiBpc05lZyhpbmRleClcbiAgICAgID8gc2l6ZSA9PT0gSW5maW5pdHlcbiAgICAgICAgPyBzaXplXG4gICAgICAgIDogTWF0aC5tYXgoMCwgc2l6ZSArIGluZGV4KSB8IDBcbiAgICAgIDogc2l6ZSA9PT0gdW5kZWZpbmVkIHx8IHNpemUgPT09IGluZGV4XG4gICAgICAgID8gaW5kZXhcbiAgICAgICAgOiBNYXRoLm1pbihzaXplLCBpbmRleCkgfCAwO1xufVxuXG5mdW5jdGlvbiBpc05lZyh2YWx1ZSkge1xuICAvLyBBY2NvdW50IGZvciAtMCB3aGljaCBpcyBuZWdhdGl2ZSwgYnV0IG5vdCBsZXNzIHRoYW4gMC5cbiAgcmV0dXJuIHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlID09PSAtSW5maW5pdHkpO1xufVxuXG4vLyBOb3RlOiB2YWx1ZSBpcyB1bmNoYW5nZWQgdG8gbm90IGJyZWFrIGltbXV0YWJsZS1kZXZ0b29scy5cbnZhciBJU19DT0xMRUNUSU9OX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX0lURVJBQkxFX19AQCc7XG5cbmZ1bmN0aW9uIGlzQ29sbGVjdGlvbihtYXliZUNvbGxlY3Rpb24pIHtcbiAgcmV0dXJuIEJvb2xlYW4obWF5YmVDb2xsZWN0aW9uICYmIG1heWJlQ29sbGVjdGlvbltJU19DT0xMRUNUSU9OX1NZTUJPTF0pO1xufVxuXG52YXIgSVNfS0VZRURfU1lNQk9MID0gJ0BAX19JTU1VVEFCTEVfS0VZRURfX0BAJztcblxuZnVuY3Rpb24gaXNLZXllZChtYXliZUtleWVkKSB7XG4gIHJldHVybiBCb29sZWFuKG1heWJlS2V5ZWQgJiYgbWF5YmVLZXllZFtJU19LRVlFRF9TWU1CT0xdKTtcbn1cblxudmFyIElTX0lOREVYRURfU1lNQk9MID0gJ0BAX19JTU1VVEFCTEVfSU5ERVhFRF9fQEAnO1xuXG5mdW5jdGlvbiBpc0luZGV4ZWQobWF5YmVJbmRleGVkKSB7XG4gIHJldHVybiBCb29sZWFuKG1heWJlSW5kZXhlZCAmJiBtYXliZUluZGV4ZWRbSVNfSU5ERVhFRF9TWU1CT0xdKTtcbn1cblxuZnVuY3Rpb24gaXNBc3NvY2lhdGl2ZShtYXliZUFzc29jaWF0aXZlKSB7XG4gIHJldHVybiBpc0tleWVkKG1heWJlQXNzb2NpYXRpdmUpIHx8IGlzSW5kZXhlZChtYXliZUFzc29jaWF0aXZlKTtcbn1cblxudmFyIENvbGxlY3Rpb24gPSBmdW5jdGlvbiBDb2xsZWN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc0NvbGxlY3Rpb24odmFsdWUpID8gdmFsdWUgOiBTZXEodmFsdWUpO1xufTtcblxudmFyIEtleWVkQ29sbGVjdGlvbiA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKENvbGxlY3Rpb24pIHtcbiAgZnVuY3Rpb24gS2V5ZWRDb2xsZWN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzS2V5ZWQodmFsdWUpID8gdmFsdWUgOiBLZXllZFNlcSh2YWx1ZSk7XG4gIH1cblxuICBpZiAoIENvbGxlY3Rpb24gKSBLZXllZENvbGxlY3Rpb24uX19wcm90b19fID0gQ29sbGVjdGlvbjtcbiAgS2V5ZWRDb2xsZWN0aW9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGUgKTtcbiAgS2V5ZWRDb2xsZWN0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEtleWVkQ29sbGVjdGlvbjtcblxuICByZXR1cm4gS2V5ZWRDb2xsZWN0aW9uO1xufShDb2xsZWN0aW9uKSk7XG5cbnZhciBJbmRleGVkQ29sbGVjdGlvbiA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKENvbGxlY3Rpb24pIHtcbiAgZnVuY3Rpb24gSW5kZXhlZENvbGxlY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gaXNJbmRleGVkKHZhbHVlKSA/IHZhbHVlIDogSW5kZXhlZFNlcSh2YWx1ZSk7XG4gIH1cblxuICBpZiAoIENvbGxlY3Rpb24gKSBJbmRleGVkQ29sbGVjdGlvbi5fX3Byb3RvX18gPSBDb2xsZWN0aW9uO1xuICBJbmRleGVkQ29sbGVjdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlICk7XG4gIEluZGV4ZWRDb2xsZWN0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEluZGV4ZWRDb2xsZWN0aW9uO1xuXG4gIHJldHVybiBJbmRleGVkQ29sbGVjdGlvbjtcbn0oQ29sbGVjdGlvbikpO1xuXG52YXIgU2V0Q29sbGVjdGlvbiA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKENvbGxlY3Rpb24pIHtcbiAgZnVuY3Rpb24gU2V0Q29sbGVjdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBpc0NvbGxlY3Rpb24odmFsdWUpICYmICFpc0Fzc29jaWF0aXZlKHZhbHVlKSA/IHZhbHVlIDogU2V0U2VxKHZhbHVlKTtcbiAgfVxuXG4gIGlmICggQ29sbGVjdGlvbiApIFNldENvbGxlY3Rpb24uX19wcm90b19fID0gQ29sbGVjdGlvbjtcbiAgU2V0Q29sbGVjdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlICk7XG4gIFNldENvbGxlY3Rpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2V0Q29sbGVjdGlvbjtcblxuICByZXR1cm4gU2V0Q29sbGVjdGlvbjtcbn0oQ29sbGVjdGlvbikpO1xuXG5Db2xsZWN0aW9uLktleWVkID0gS2V5ZWRDb2xsZWN0aW9uO1xuQ29sbGVjdGlvbi5JbmRleGVkID0gSW5kZXhlZENvbGxlY3Rpb247XG5Db2xsZWN0aW9uLlNldCA9IFNldENvbGxlY3Rpb247XG5cbnZhciBJU19TRVFfU1lNQk9MID0gJ0BAX19JTU1VVEFCTEVfU0VRX19AQCc7XG5cbmZ1bmN0aW9uIGlzU2VxKG1heWJlU2VxKSB7XG4gIHJldHVybiBCb29sZWFuKG1heWJlU2VxICYmIG1heWJlU2VxW0lTX1NFUV9TWU1CT0xdKTtcbn1cblxudmFyIElTX1JFQ09SRF9TWU1CT0wgPSAnQEBfX0lNTVVUQUJMRV9SRUNPUkRfX0BAJztcblxuZnVuY3Rpb24gaXNSZWNvcmQobWF5YmVSZWNvcmQpIHtcbiAgcmV0dXJuIEJvb2xlYW4obWF5YmVSZWNvcmQgJiYgbWF5YmVSZWNvcmRbSVNfUkVDT1JEX1NZTUJPTF0pO1xufVxuXG5mdW5jdGlvbiBpc0ltbXV0YWJsZShtYXliZUltbXV0YWJsZSkge1xuICByZXR1cm4gaXNDb2xsZWN0aW9uKG1heWJlSW1tdXRhYmxlKSB8fCBpc1JlY29yZChtYXliZUltbXV0YWJsZSk7XG59XG5cbnZhciBJU19PUkRFUkVEX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX09SREVSRURfX0BAJztcblxuZnVuY3Rpb24gaXNPcmRlcmVkKG1heWJlT3JkZXJlZCkge1xuICByZXR1cm4gQm9vbGVhbihtYXliZU9yZGVyZWQgJiYgbWF5YmVPcmRlcmVkW0lTX09SREVSRURfU1lNQk9MXSk7XG59XG5cbnZhciBJVEVSQVRFX0tFWVMgPSAwO1xudmFyIElURVJBVEVfVkFMVUVTID0gMTtcbnZhciBJVEVSQVRFX0VOVFJJRVMgPSAyO1xuXG52YXIgUkVBTF9JVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbnZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJztcblxudmFyIElURVJBVE9SX1NZTUJPTCA9IFJFQUxfSVRFUkFUT1JfU1lNQk9MIHx8IEZBVVhfSVRFUkFUT1JfU1lNQk9MO1xuXG52YXIgSXRlcmF0b3IgPSBmdW5jdGlvbiBJdGVyYXRvcihuZXh0KSB7XG4gIHRoaXMubmV4dCA9IG5leHQ7XG59O1xuXG5JdGVyYXRvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHJldHVybiAnW0l0ZXJhdG9yXSc7XG59O1xuXG5JdGVyYXRvci5LRVlTID0gSVRFUkFURV9LRVlTO1xuSXRlcmF0b3IuVkFMVUVTID0gSVRFUkFURV9WQUxVRVM7XG5JdGVyYXRvci5FTlRSSUVTID0gSVRFUkFURV9FTlRSSUVTO1xuXG5JdGVyYXRvci5wcm90b3R5cGUuaW5zcGVjdCA9IEl0ZXJhdG9yLnByb3RvdHlwZS50b1NvdXJjZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xufTtcbkl0ZXJhdG9yLnByb3RvdHlwZVtJVEVSQVRPUl9TWU1CT0xdID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gaXRlcmF0b3JWYWx1ZSh0eXBlLCBrLCB2LCBpdGVyYXRvclJlc3VsdCkge1xuICB2YXIgdmFsdWUgPSB0eXBlID09PSAwID8gayA6IHR5cGUgPT09IDEgPyB2IDogW2ssIHZdO1xuICBpdGVyYXRvclJlc3VsdFxuICAgID8gKGl0ZXJhdG9yUmVzdWx0LnZhbHVlID0gdmFsdWUpXG4gICAgOiAoaXRlcmF0b3JSZXN1bHQgPSB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgZG9uZTogZmFsc2UsXG4gICAgICB9KTtcbiAgcmV0dXJuIGl0ZXJhdG9yUmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpdGVyYXRvckRvbmUoKSB7XG4gIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbn1cblxuZnVuY3Rpb24gaGFzSXRlcmF0b3IobWF5YmVJdGVyYWJsZSkge1xuICByZXR1cm4gISFnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpO1xufVxuXG5mdW5jdGlvbiBpc0l0ZXJhdG9yKG1heWJlSXRlcmF0b3IpIHtcbiAgcmV0dXJuIG1heWJlSXRlcmF0b3IgJiYgdHlwZW9mIG1heWJlSXRlcmF0b3IubmV4dCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gZ2V0SXRlcmF0b3IoaXRlcmFibGUpIHtcbiAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKGl0ZXJhYmxlKTtcbiAgcmV0dXJuIGl0ZXJhdG9yRm4gJiYgaXRlcmF0b3JGbi5jYWxsKGl0ZXJhYmxlKTtcbn1cblxuZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihpdGVyYWJsZSkge1xuICB2YXIgaXRlcmF0b3JGbiA9XG4gICAgaXRlcmFibGUgJiZcbiAgICAoKFJFQUxfSVRFUkFUT1JfU1lNQk9MICYmIGl0ZXJhYmxlW1JFQUxfSVRFUkFUT1JfU1lNQk9MXSkgfHxcbiAgICAgIGl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpdGVyYXRvckZuO1xuICB9XG59XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIHZhbHVlICYmXG4gICAgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuICAgIE51bWJlci5pc0ludGVnZXIodmFsdWUubGVuZ3RoKSAmJlxuICAgIHZhbHVlLmxlbmd0aCA+PSAwICYmXG4gICAgKHZhbHVlLmxlbmd0aCA9PT0gMFxuICAgICAgPyAvLyBPbmx5IHtsZW5ndGg6IDB9IGlzIGNvbnNpZGVyZWQgQXJyYXktbGlrZS5cbiAgICAgICAgT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gMVxuICAgICAgOiAvLyBBbiBvYmplY3QgaXMgb25seSBBcnJheS1saWtlIGlmIGl0IGhhcyBhIHByb3BlcnR5IHdoZXJlIHRoZSBsYXN0IHZhbHVlXG4gICAgICAgIC8vIGluIHRoZSBhcnJheS1saWtlIG1heSBiZSBmb3VuZCAod2hpY2ggY291bGQgYmUgdW5kZWZpbmVkKS5cbiAgICAgICAgdmFsdWUuaGFzT3duUHJvcGVydHkodmFsdWUubGVuZ3RoIC0gMSkpXG4gICk7XG59XG5cbnZhciBTZXEgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChDb2xsZWN0aW9uJCQxKSB7XG4gIGZ1bmN0aW9uIFNlcSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICA/IGVtcHR5U2VxdWVuY2UoKVxuICAgICAgOiBpc0ltbXV0YWJsZSh2YWx1ZSlcbiAgICAgICAgPyB2YWx1ZS50b1NlcSgpXG4gICAgICAgIDogc2VxRnJvbVZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIGlmICggQ29sbGVjdGlvbiQkMSApIFNlcS5fX3Byb3RvX18gPSBDb2xsZWN0aW9uJCQxO1xuICBTZXEucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggQ29sbGVjdGlvbiQkMSAmJiBDb2xsZWN0aW9uJCQxLnByb3RvdHlwZSApO1xuICBTZXEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VxO1xuXG4gIFNlcS5wcm90b3R5cGUudG9TZXEgPSBmdW5jdGlvbiB0b1NlcSAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgU2VxLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RvU3RyaW5nKCdTZXEgeycsICd9Jyk7XG4gIH07XG5cbiAgU2VxLnByb3RvdHlwZS5jYWNoZVJlc3VsdCA9IGZ1bmN0aW9uIGNhY2hlUmVzdWx0ICgpIHtcbiAgICBpZiAoIXRoaXMuX2NhY2hlICYmIHRoaXMuX19pdGVyYXRlVW5jYWNoZWQpIHtcbiAgICAgIHRoaXMuX2NhY2hlID0gdGhpcy5lbnRyeVNlcSgpLnRvQXJyYXkoKTtcbiAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuX2NhY2hlLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gYWJzdHJhY3QgX19pdGVyYXRlVW5jYWNoZWQoZm4sIHJldmVyc2UpXG5cbiAgU2VxLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5fY2FjaGU7XG4gICAgaWYgKGNhY2hlKSB7XG4gICAgICB2YXIgc2l6ZSA9IGNhY2hlLmxlbmd0aDtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHdoaWxlIChpICE9PSBzaXplKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IGNhY2hlW3JldmVyc2UgPyBzaXplIC0gKytpIDogaSsrXTtcbiAgICAgICAgaWYgKGZuKGVudHJ5WzFdLCBlbnRyeVswXSwgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fX2l0ZXJhdGVVbmNhY2hlZChmbiwgcmV2ZXJzZSk7XG4gIH07XG5cbiAgLy8gYWJzdHJhY3QgX19pdGVyYXRvclVuY2FjaGVkKHR5cGUsIHJldmVyc2UpXG5cbiAgU2VxLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuX2NhY2hlO1xuICAgIGlmIChjYWNoZSkge1xuICAgICAgdmFyIHNpemUgPSBjYWNoZS5sZW5ndGg7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGkgPT09IHNpemUpIHtcbiAgICAgICAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVudHJ5ID0gY2FjaGVbcmV2ZXJzZSA/IHNpemUgLSArK2kgOiBpKytdO1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCBlbnRyeVswXSwgZW50cnlbMV0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9faXRlcmF0b3JVbmNhY2hlZCh0eXBlLCByZXZlcnNlKTtcbiAgfTtcblxuICByZXR1cm4gU2VxO1xufShDb2xsZWN0aW9uKSk7XG5cbnZhciBLZXllZFNlcSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKFNlcSkge1xuICBmdW5jdGlvbiBLZXllZFNlcSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICA/IGVtcHR5U2VxdWVuY2UoKS50b0tleWVkU2VxKClcbiAgICAgIDogaXNDb2xsZWN0aW9uKHZhbHVlKVxuICAgICAgICA/IGlzS2V5ZWQodmFsdWUpXG4gICAgICAgICAgPyB2YWx1ZS50b1NlcSgpXG4gICAgICAgICAgOiB2YWx1ZS5mcm9tRW50cnlTZXEoKVxuICAgICAgICA6IGlzUmVjb3JkKHZhbHVlKVxuICAgICAgICAgID8gdmFsdWUudG9TZXEoKVxuICAgICAgICAgIDoga2V5ZWRTZXFGcm9tVmFsdWUodmFsdWUpO1xuICB9XG5cbiAgaWYgKCBTZXEgKSBLZXllZFNlcS5fX3Byb3RvX18gPSBTZXE7XG4gIEtleWVkU2VxLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFNlcSAmJiBTZXEucHJvdG90eXBlICk7XG4gIEtleWVkU2VxLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEtleWVkU2VxO1xuXG4gIEtleWVkU2VxLnByb3RvdHlwZS50b0tleWVkU2VxID0gZnVuY3Rpb24gdG9LZXllZFNlcSAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIEtleWVkU2VxO1xufShTZXEpKTtcblxudmFyIEluZGV4ZWRTZXEgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChTZXEpIHtcbiAgZnVuY3Rpb24gSW5kZXhlZFNlcSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICA/IGVtcHR5U2VxdWVuY2UoKVxuICAgICAgOiBpc0NvbGxlY3Rpb24odmFsdWUpXG4gICAgICAgID8gaXNLZXllZCh2YWx1ZSlcbiAgICAgICAgICA/IHZhbHVlLmVudHJ5U2VxKClcbiAgICAgICAgICA6IHZhbHVlLnRvSW5kZXhlZFNlcSgpXG4gICAgICAgIDogaXNSZWNvcmQodmFsdWUpXG4gICAgICAgICAgPyB2YWx1ZS50b1NlcSgpLmVudHJ5U2VxKClcbiAgICAgICAgICA6IGluZGV4ZWRTZXFGcm9tVmFsdWUodmFsdWUpO1xuICB9XG5cbiAgaWYgKCBTZXEgKSBJbmRleGVkU2VxLl9fcHJvdG9fXyA9IFNlcTtcbiAgSW5kZXhlZFNlcS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBTZXEgJiYgU2VxLnByb3RvdHlwZSApO1xuICBJbmRleGVkU2VxLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEluZGV4ZWRTZXE7XG5cbiAgSW5kZXhlZFNlcS5vZiA9IGZ1bmN0aW9uIG9mICgvKi4uLnZhbHVlcyovKSB7XG4gICAgcmV0dXJuIEluZGV4ZWRTZXEoYXJndW1lbnRzKTtcbiAgfTtcblxuICBJbmRleGVkU2VxLnByb3RvdHlwZS50b0luZGV4ZWRTZXEgPSBmdW5jdGlvbiB0b0luZGV4ZWRTZXEgKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEluZGV4ZWRTZXEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLl9fdG9TdHJpbmcoJ1NlcSBbJywgJ10nKTtcbiAgfTtcblxuICByZXR1cm4gSW5kZXhlZFNlcTtcbn0oU2VxKSk7XG5cbnZhciBTZXRTZXEgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChTZXEpIHtcbiAgZnVuY3Rpb24gU2V0U2VxKHZhbHVlKSB7XG4gICAgcmV0dXJuIChpc0NvbGxlY3Rpb24odmFsdWUpICYmICFpc0Fzc29jaWF0aXZlKHZhbHVlKVxuICAgICAgPyB2YWx1ZVxuICAgICAgOiBJbmRleGVkU2VxKHZhbHVlKVxuICAgICkudG9TZXRTZXEoKTtcbiAgfVxuXG4gIGlmICggU2VxICkgU2V0U2VxLl9fcHJvdG9fXyA9IFNlcTtcbiAgU2V0U2VxLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFNlcSAmJiBTZXEucHJvdG90eXBlICk7XG4gIFNldFNlcS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZXRTZXE7XG5cbiAgU2V0U2VxLm9mID0gZnVuY3Rpb24gb2YgKC8qLi4udmFsdWVzKi8pIHtcbiAgICByZXR1cm4gU2V0U2VxKGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgU2V0U2VxLnByb3RvdHlwZS50b1NldFNlcSA9IGZ1bmN0aW9uIHRvU2V0U2VxICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gU2V0U2VxO1xufShTZXEpKTtcblxuU2VxLmlzU2VxID0gaXNTZXE7XG5TZXEuS2V5ZWQgPSBLZXllZFNlcTtcblNlcS5TZXQgPSBTZXRTZXE7XG5TZXEuSW5kZXhlZCA9IEluZGV4ZWRTZXE7XG5cblNlcS5wcm90b3R5cGVbSVNfU0VRX1NZTUJPTF0gPSB0cnVlO1xuXG4vLyAjcHJhZ21hIFJvb3QgU2VxdWVuY2VzXG5cbnZhciBBcnJheVNlcSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEluZGV4ZWRTZXEpIHtcbiAgZnVuY3Rpb24gQXJyYXlTZXEoYXJyYXkpIHtcbiAgICB0aGlzLl9hcnJheSA9IGFycmF5O1xuICAgIHRoaXMuc2l6ZSA9IGFycmF5Lmxlbmd0aDtcbiAgfVxuXG4gIGlmICggSW5kZXhlZFNlcSApIEFycmF5U2VxLl9fcHJvdG9fXyA9IEluZGV4ZWRTZXE7XG4gIEFycmF5U2VxLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEluZGV4ZWRTZXEgJiYgSW5kZXhlZFNlcS5wcm90b3R5cGUgKTtcbiAgQXJyYXlTZXEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXJyYXlTZXE7XG5cbiAgQXJyYXlTZXEucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoaW5kZXgsIG5vdFNldFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzKGluZGV4KSA/IHRoaXMuX2FycmF5W3dyYXBJbmRleCh0aGlzLCBpbmRleCldIDogbm90U2V0VmFsdWU7XG4gIH07XG5cbiAgQXJyYXlTZXEucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgYXJyYXkgPSB0aGlzLl9hcnJheTtcbiAgICB2YXIgc2l6ZSA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgIT09IHNpemUpIHtcbiAgICAgIHZhciBpaSA9IHJldmVyc2UgPyBzaXplIC0gKytpIDogaSsrO1xuICAgICAgaWYgKGZuKGFycmF5W2lpXSwgaWksIHRoaXMpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGk7XG4gIH07XG5cbiAgQXJyYXlTZXEucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIGFycmF5ID0gdGhpcy5fYXJyYXk7XG4gICAgdmFyIHNpemUgPSBhcnJheS5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGkgPT09IHNpemUpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yRG9uZSgpO1xuICAgICAgfVxuICAgICAgdmFyIGlpID0gcmV2ZXJzZSA/IHNpemUgLSArK2kgOiBpKys7XG4gICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCBpaSwgYXJyYXlbaWldKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQXJyYXlTZXE7XG59KEluZGV4ZWRTZXEpKTtcblxudmFyIE9iamVjdFNlcSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEtleWVkU2VxKSB7XG4gIGZ1bmN0aW9uIE9iamVjdFNlcShvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG4gICAgdGhpcy5fb2JqZWN0ID0gb2JqZWN0O1xuICAgIHRoaXMuX2tleXMgPSBrZXlzO1xuICAgIHRoaXMuc2l6ZSA9IGtleXMubGVuZ3RoO1xuICB9XG5cbiAgaWYgKCBLZXllZFNlcSApIE9iamVjdFNlcS5fX3Byb3RvX18gPSBLZXllZFNlcTtcbiAgT2JqZWN0U2VxLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEtleWVkU2VxICYmIEtleWVkU2VxLnByb3RvdHlwZSApO1xuICBPYmplY3RTZXEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gT2JqZWN0U2VxO1xuXG4gIE9iamVjdFNlcS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChrZXksIG5vdFNldFZhbHVlKSB7XG4gICAgaWYgKG5vdFNldFZhbHVlICE9PSB1bmRlZmluZWQgJiYgIXRoaXMuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBub3RTZXRWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX29iamVjdFtrZXldO1xuICB9O1xuXG4gIE9iamVjdFNlcS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gaGFzIChrZXkpIHtcbiAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLl9vYmplY3QsIGtleSk7XG4gIH07XG5cbiAgT2JqZWN0U2VxLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIG9iamVjdCA9IHRoaXMuX29iamVjdDtcbiAgICB2YXIga2V5cyA9IHRoaXMuX2tleXM7XG4gICAgdmFyIHNpemUgPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgIT09IHNpemUpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW3JldmVyc2UgPyBzaXplIC0gKytpIDogaSsrXTtcbiAgICAgIGlmIChmbihvYmplY3Rba2V5XSwga2V5LCB0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpO1xuICB9O1xuXG4gIE9iamVjdFNlcS5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgb2JqZWN0ID0gdGhpcy5fb2JqZWN0O1xuICAgIHZhciBrZXlzID0gdGhpcy5fa2V5cztcbiAgICB2YXIgc2l6ZSA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpID09PSBzaXplKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHZhciBrZXkgPSBrZXlzW3JldmVyc2UgPyBzaXplIC0gKytpIDogaSsrXTtcbiAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKHR5cGUsIGtleSwgb2JqZWN0W2tleV0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBPYmplY3RTZXE7XG59KEtleWVkU2VxKSk7XG5PYmplY3RTZXEucHJvdG90eXBlW0lTX09SREVSRURfU1lNQk9MXSA9IHRydWU7XG5cbnZhciBDb2xsZWN0aW9uU2VxID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoSW5kZXhlZFNlcSkge1xuICBmdW5jdGlvbiBDb2xsZWN0aW9uU2VxKGNvbGxlY3Rpb24pIHtcbiAgICB0aGlzLl9jb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcbiAgICB0aGlzLnNpemUgPSBjb2xsZWN0aW9uLmxlbmd0aCB8fCBjb2xsZWN0aW9uLnNpemU7XG4gIH1cblxuICBpZiAoIEluZGV4ZWRTZXEgKSBDb2xsZWN0aW9uU2VxLl9fcHJvdG9fXyA9IEluZGV4ZWRTZXE7XG4gIENvbGxlY3Rpb25TZXEucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggSW5kZXhlZFNlcSAmJiBJbmRleGVkU2VxLnByb3RvdHlwZSApO1xuICBDb2xsZWN0aW9uU2VxLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbGxlY3Rpb25TZXE7XG5cbiAgQ29sbGVjdGlvblNlcS5wcm90b3R5cGUuX19pdGVyYXRlVW5jYWNoZWQgPSBmdW5jdGlvbiBfX2l0ZXJhdGVVbmNhY2hlZCAoZm4sIHJldmVyc2UpIHtcbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdGUoZm4sIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgY29sbGVjdGlvbiA9IHRoaXMuX2NvbGxlY3Rpb247XG4gICAgdmFyIGl0ZXJhdG9yID0gZ2V0SXRlcmF0b3IoY29sbGVjdGlvbik7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIGlmIChpc0l0ZXJhdG9yKGl0ZXJhdG9yKSkge1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgIGlmIChmbihzdGVwLnZhbHVlLCBpdGVyYXRpb25zKyssIHRoaXMpID09PSBmYWxzZSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpdGVyYXRpb25zO1xuICB9O1xuXG4gIENvbGxlY3Rpb25TZXEucHJvdG90eXBlLl9faXRlcmF0b3JVbmNhY2hlZCA9IGZ1bmN0aW9uIF9faXRlcmF0b3JVbmNhY2hlZCAodHlwZSwgcmV2ZXJzZSkge1xuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVJlc3VsdCgpLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIHZhciBjb2xsZWN0aW9uID0gdGhpcy5fY29sbGVjdGlvbjtcbiAgICB2YXIgaXRlcmF0b3IgPSBnZXRJdGVyYXRvcihjb2xsZWN0aW9uKTtcbiAgICBpZiAoIWlzSXRlcmF0b3IoaXRlcmF0b3IpKSB7XG4gICAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGl0ZXJhdG9yRG9uZSk7XG4gICAgfVxuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgcmV0dXJuIHN0ZXAuZG9uZSA/IHN0ZXAgOiBpdGVyYXRvclZhbHVlKHR5cGUsIGl0ZXJhdGlvbnMrKywgc3RlcC52YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIENvbGxlY3Rpb25TZXE7XG59KEluZGV4ZWRTZXEpKTtcblxuLy8gIyBwcmFnbWEgSGVscGVyIGZ1bmN0aW9uc1xuXG52YXIgRU1QVFlfU0VRO1xuXG5mdW5jdGlvbiBlbXB0eVNlcXVlbmNlKCkge1xuICByZXR1cm4gRU1QVFlfU0VRIHx8IChFTVBUWV9TRVEgPSBuZXcgQXJyYXlTZXEoW10pKTtcbn1cblxuZnVuY3Rpb24ga2V5ZWRTZXFGcm9tVmFsdWUodmFsdWUpIHtcbiAgdmFyIHNlcSA9IEFycmF5LmlzQXJyYXkodmFsdWUpXG4gICAgPyBuZXcgQXJyYXlTZXEodmFsdWUpXG4gICAgOiBoYXNJdGVyYXRvcih2YWx1ZSlcbiAgICAgID8gbmV3IENvbGxlY3Rpb25TZXEodmFsdWUpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgaWYgKHNlcSkge1xuICAgIHJldHVybiBzZXEuZnJvbUVudHJ5U2VxKCk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdFNlcSh2YWx1ZSk7XG4gIH1cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAnRXhwZWN0ZWQgQXJyYXkgb3IgY29sbGVjdGlvbiBvYmplY3Qgb2YgW2ssIHZdIGVudHJpZXMsIG9yIGtleWVkIG9iamVjdDogJyArXG4gICAgICB2YWx1ZVxuICApO1xufVxuXG5mdW5jdGlvbiBpbmRleGVkU2VxRnJvbVZhbHVlKHZhbHVlKSB7XG4gIHZhciBzZXEgPSBtYXliZUluZGV4ZWRTZXFGcm9tVmFsdWUodmFsdWUpO1xuICBpZiAoc2VxKSB7XG4gICAgcmV0dXJuIHNlcTtcbiAgfVxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdFeHBlY3RlZCBBcnJheSBvciBjb2xsZWN0aW9uIG9iamVjdCBvZiB2YWx1ZXM6ICcgKyB2YWx1ZVxuICApO1xufVxuXG5mdW5jdGlvbiBzZXFGcm9tVmFsdWUodmFsdWUpIHtcbiAgdmFyIHNlcSA9IG1heWJlSW5kZXhlZFNlcUZyb21WYWx1ZSh2YWx1ZSk7XG4gIGlmIChzZXEpIHtcbiAgICByZXR1cm4gc2VxO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG5ldyBPYmplY3RTZXEodmFsdWUpO1xuICB9XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgJ0V4cGVjdGVkIEFycmF5IG9yIGNvbGxlY3Rpb24gb2JqZWN0IG9mIHZhbHVlcywgb3Iga2V5ZWQgb2JqZWN0OiAnICsgdmFsdWVcbiAgKTtcbn1cblxuZnVuY3Rpb24gbWF5YmVJbmRleGVkU2VxRnJvbVZhbHVlKHZhbHVlKSB7XG4gIHJldHVybiBpc0FycmF5TGlrZSh2YWx1ZSlcbiAgICA/IG5ldyBBcnJheVNlcSh2YWx1ZSlcbiAgICA6IGhhc0l0ZXJhdG9yKHZhbHVlKVxuICAgICAgPyBuZXcgQ29sbGVjdGlvblNlcSh2YWx1ZSlcbiAgICAgIDogdW5kZWZpbmVkO1xufVxuXG52YXIgSVNfTUFQX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX01BUF9fQEAnO1xuXG5mdW5jdGlvbiBpc01hcChtYXliZU1hcCkge1xuICByZXR1cm4gQm9vbGVhbihtYXliZU1hcCAmJiBtYXliZU1hcFtJU19NQVBfU1lNQk9MXSk7XG59XG5cbmZ1bmN0aW9uIGlzT3JkZXJlZE1hcChtYXliZU9yZGVyZWRNYXApIHtcbiAgcmV0dXJuIGlzTWFwKG1heWJlT3JkZXJlZE1hcCkgJiYgaXNPcmRlcmVkKG1heWJlT3JkZXJlZE1hcCk7XG59XG5cbmZ1bmN0aW9uIGlzVmFsdWVPYmplY3QobWF5YmVWYWx1ZSkge1xuICByZXR1cm4gQm9vbGVhbihcbiAgICBtYXliZVZhbHVlICYmXG4gICAgICB0eXBlb2YgbWF5YmVWYWx1ZS5lcXVhbHMgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIHR5cGVvZiBtYXliZVZhbHVlLmhhc2hDb2RlID09PSAnZnVuY3Rpb24nXG4gICk7XG59XG5cbi8qKlxuICogQW4gZXh0ZW5zaW9uIG9mIHRoZSBcInNhbWUtdmFsdWVcIiBhbGdvcml0aG0gYXMgW2Rlc2NyaWJlZCBmb3IgdXNlIGJ5IEVTNiBNYXBcbiAqIGFuZCBTZXRdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcCNLZXlfZXF1YWxpdHkpXG4gKlxuICogTmFOIGlzIGNvbnNpZGVyZWQgdGhlIHNhbWUgYXMgTmFOLCBob3dldmVyIC0wIGFuZCAwIGFyZSBjb25zaWRlcmVkIHRoZSBzYW1lXG4gKiB2YWx1ZSwgd2hpY2ggaXMgZGlmZmVyZW50IGZyb20gdGhlIGFsZ29yaXRobSBkZXNjcmliZWQgYnlcbiAqIFtgT2JqZWN0LmlzYF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzKS5cbiAqXG4gKiBUaGlzIGlzIGV4dGVuZGVkIGZ1cnRoZXIgdG8gYWxsb3cgT2JqZWN0cyB0byBkZXNjcmliZSB0aGUgdmFsdWVzIHRoZXlcbiAqIHJlcHJlc2VudCwgYnkgd2F5IG9mIGB2YWx1ZU9mYCBvciBgZXF1YWxzYCAoYW5kIGBoYXNoQ29kZWApLlxuICpcbiAqIE5vdGU6IGJlY2F1c2Ugb2YgdGhpcyBleHRlbnNpb24sIHRoZSBrZXkgZXF1YWxpdHkgb2YgSW1tdXRhYmxlLk1hcCBhbmQgdGhlXG4gKiB2YWx1ZSBlcXVhbGl0eSBvZiBJbW11dGFibGUuU2V0IHdpbGwgZGlmZmVyIGZyb20gRVM2IE1hcCBhbmQgU2V0LlxuICpcbiAqICMjIyBEZWZpbmluZyBjdXN0b20gdmFsdWVzXG4gKlxuICogVGhlIGVhc2llc3Qgd2F5IHRvIGRlc2NyaWJlIHRoZSB2YWx1ZSBhbiBvYmplY3QgcmVwcmVzZW50cyBpcyBieSBpbXBsZW1lbnRpbmdcbiAqIGB2YWx1ZU9mYC4gRm9yIGV4YW1wbGUsIGBEYXRlYCByZXByZXNlbnRzIGEgdmFsdWUgYnkgcmV0dXJuaW5nIGEgdW5peFxuICogdGltZXN0YW1wIGZvciBgdmFsdWVPZmA6XG4gKlxuICogICAgIHZhciBkYXRlMSA9IG5ldyBEYXRlKDEyMzQ1Njc4OTAwMDApOyAvLyBGcmkgRmViIDEzIDIwMDkgLi4uXG4gKiAgICAgdmFyIGRhdGUyID0gbmV3IERhdGUoMTIzNDU2Nzg5MDAwMCk7XG4gKiAgICAgZGF0ZTEudmFsdWVPZigpOyAvLyAxMjM0NTY3ODkwMDAwXG4gKiAgICAgYXNzZXJ0KCBkYXRlMSAhPT0gZGF0ZTIgKTtcbiAqICAgICBhc3NlcnQoIEltbXV0YWJsZS5pcyggZGF0ZTEsIGRhdGUyICkgKTtcbiAqXG4gKiBOb3RlOiBvdmVycmlkaW5nIGB2YWx1ZU9mYCBtYXkgaGF2ZSBvdGhlciBpbXBsaWNhdGlvbnMgaWYgeW91IHVzZSB0aGlzIG9iamVjdFxuICogd2hlcmUgSmF2YVNjcmlwdCBleHBlY3RzIGEgcHJpbWl0aXZlLCBzdWNoIGFzIGltcGxpY2l0IHN0cmluZyBjb2VyY2lvbi5cbiAqXG4gKiBGb3IgbW9yZSBjb21wbGV4IHR5cGVzLCBlc3BlY2lhbGx5IGNvbGxlY3Rpb25zLCBpbXBsZW1lbnRpbmcgYHZhbHVlT2ZgIG1heVxuICogbm90IGJlIHBlcmZvcm1hbnQuIEFuIGFsdGVybmF0aXZlIGlzIHRvIGltcGxlbWVudCBgZXF1YWxzYCBhbmQgYGhhc2hDb2RlYC5cbiAqXG4gKiBgZXF1YWxzYCB0YWtlcyBhbm90aGVyIG9iamVjdCwgcHJlc3VtYWJseSBvZiBzaW1pbGFyIHR5cGUsIGFuZCByZXR1cm5zIHRydWVcbiAqIGlmIGl0IGlzIGVxdWFsLiBFcXVhbGl0eSBpcyBzeW1tZXRyaWNhbCwgc28gdGhlIHNhbWUgcmVzdWx0IHNob3VsZCBiZVxuICogcmV0dXJuZWQgaWYgdGhpcyBhbmQgdGhlIGFyZ3VtZW50IGFyZSBmbGlwcGVkLlxuICpcbiAqICAgICBhc3NlcnQoIGEuZXF1YWxzKGIpID09PSBiLmVxdWFscyhhKSApO1xuICpcbiAqIGBoYXNoQ29kZWAgcmV0dXJucyBhIDMyYml0IGludGVnZXIgbnVtYmVyIHJlcHJlc2VudGluZyB0aGUgb2JqZWN0IHdoaWNoIHdpbGxcbiAqIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIGhvdyB0byBzdG9yZSB0aGUgdmFsdWUgb2JqZWN0IGluIGEgTWFwIG9yIFNldC4gWW91IG11c3RcbiAqIHByb3ZpZGUgYm90aCBvciBuZWl0aGVyIG1ldGhvZHMsIG9uZSBtdXN0IG5vdCBleGlzdCB3aXRob3V0IHRoZSBvdGhlci5cbiAqXG4gKiBBbHNvLCBhbiBpbXBvcnRhbnQgcmVsYXRpb25zaGlwIGJldHdlZW4gdGhlc2UgbWV0aG9kcyBtdXN0IGJlIHVwaGVsZDogaWYgdHdvXG4gKiB2YWx1ZXMgYXJlIGVxdWFsLCB0aGV5ICptdXN0KiByZXR1cm4gdGhlIHNhbWUgaGFzaENvZGUuIElmIHRoZSB2YWx1ZXMgYXJlIG5vdFxuICogZXF1YWwsIHRoZXkgbWlnaHQgaGF2ZSB0aGUgc2FtZSBoYXNoQ29kZTsgdGhpcyBpcyBjYWxsZWQgYSBoYXNoIGNvbGxpc2lvbixcbiAqIGFuZCB3aGlsZSB1bmRlc2lyYWJsZSBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucywgaXQgaXMgYWNjZXB0YWJsZS5cbiAqXG4gKiAgICAgaWYgKGEuZXF1YWxzKGIpKSB7XG4gKiAgICAgICBhc3NlcnQoIGEuaGFzaENvZGUoKSA9PT0gYi5oYXNoQ29kZSgpICk7XG4gKiAgICAgfVxuICpcbiAqIEFsbCBJbW11dGFibGUgY29sbGVjdGlvbnMgYXJlIFZhbHVlIE9iamVjdHM6IHRoZXkgaW1wbGVtZW50IGBlcXVhbHMoKWBcbiAqIGFuZCBgaGFzaENvZGUoKWAuXG4gKi9cbmZ1bmN0aW9uIGlzKHZhbHVlQSwgdmFsdWVCKSB7XG4gIGlmICh2YWx1ZUEgPT09IHZhbHVlQiB8fCAodmFsdWVBICE9PSB2YWx1ZUEgJiYgdmFsdWVCICE9PSB2YWx1ZUIpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKCF2YWx1ZUEgfHwgIXZhbHVlQikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoXG4gICAgdHlwZW9mIHZhbHVlQS52YWx1ZU9mID09PSAnZnVuY3Rpb24nICYmXG4gICAgdHlwZW9mIHZhbHVlQi52YWx1ZU9mID09PSAnZnVuY3Rpb24nXG4gICkge1xuICAgIHZhbHVlQSA9IHZhbHVlQS52YWx1ZU9mKCk7XG4gICAgdmFsdWVCID0gdmFsdWVCLnZhbHVlT2YoKTtcbiAgICBpZiAodmFsdWVBID09PSB2YWx1ZUIgfHwgKHZhbHVlQSAhPT0gdmFsdWVBICYmIHZhbHVlQiAhPT0gdmFsdWVCKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghdmFsdWVBIHx8ICF2YWx1ZUIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICEhKFxuICAgIGlzVmFsdWVPYmplY3QodmFsdWVBKSAmJlxuICAgIGlzVmFsdWVPYmplY3QodmFsdWVCKSAmJlxuICAgIHZhbHVlQS5lcXVhbHModmFsdWVCKVxuICApO1xufVxuXG52YXIgaW11bCA9XG4gIHR5cGVvZiBNYXRoLmltdWwgPT09ICdmdW5jdGlvbicgJiYgTWF0aC5pbXVsKDB4ZmZmZmZmZmYsIDIpID09PSAtMlxuICAgID8gTWF0aC5pbXVsXG4gICAgOiBmdW5jdGlvbiBpbXVsKGEsIGIpIHtcbiAgICAgICAgYSB8PSAwOyAvLyBpbnRcbiAgICAgICAgYiB8PSAwOyAvLyBpbnRcbiAgICAgICAgdmFyIGMgPSBhICYgMHhmZmZmO1xuICAgICAgICB2YXIgZCA9IGIgJiAweGZmZmY7XG4gICAgICAgIC8vIFNoaWZ0IGJ5IDAgZml4ZXMgdGhlIHNpZ24gb24gdGhlIGhpZ2ggcGFydC5cbiAgICAgICAgcmV0dXJuIChjICogZCArICgoKChhID4+PiAxNikgKiBkICsgYyAqIChiID4+PiAxNikpIDw8IDE2KSA+Pj4gMCkpIHwgMDsgLy8gaW50XG4gICAgICB9O1xuXG4vLyB2OCBoYXMgYW4gb3B0aW1pemF0aW9uIGZvciBzdG9yaW5nIDMxLWJpdCBzaWduZWQgbnVtYmVycy5cbi8vIFZhbHVlcyB3aGljaCBoYXZlIGVpdGhlciAwMCBvciAxMSBhcyB0aGUgaGlnaCBvcmRlciBiaXRzIHF1YWxpZnkuXG4vLyBUaGlzIGZ1bmN0aW9uIGRyb3BzIHRoZSBoaWdoZXN0IG9yZGVyIGJpdCBpbiBhIHNpZ25lZCBudW1iZXIsIG1haW50YWluaW5nXG4vLyB0aGUgc2lnbiBiaXQuXG5mdW5jdGlvbiBzbWkoaTMyKSB7XG4gIHJldHVybiAoKGkzMiA+Pj4gMSkgJiAweDQwMDAwMDAwKSB8IChpMzIgJiAweGJmZmZmZmZmKTtcbn1cblxudmFyIGRlZmF1bHRWYWx1ZU9mID0gT2JqZWN0LnByb3RvdHlwZS52YWx1ZU9mO1xuXG5mdW5jdGlvbiBoYXNoKG8pIHtcbiAgc3dpdGNoICh0eXBlb2Ygbykge1xuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgLy8gVGhlIGhhc2ggdmFsdWVzIGZvciBidWlsdC1pbiBjb25zdGFudHMgYXJlIGEgMSB2YWx1ZSBmb3IgZWFjaCA1LWJ5dGVcbiAgICAgIC8vIHNoaWZ0IHJlZ2lvbiBleHBlY3QgZm9yIHRoZSBmaXJzdCwgd2hpY2ggZW5jb2RlcyB0aGUgdmFsdWUuIFRoaXNcbiAgICAgIC8vIHJlZHVjZXMgdGhlIG9kZHMgb2YgYSBoYXNoIGNvbGxpc2lvbiBmb3IgdGhlc2UgY29tbW9uIHZhbHVlcy5cbiAgICAgIHJldHVybiBvID8gMHg0MjEwODQyMSA6IDB4NDIxMDg0MjA7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBoYXNoTnVtYmVyKG8pO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gby5sZW5ndGggPiBTVFJJTkdfSEFTSF9DQUNIRV9NSU5fU1RSTEVOXG4gICAgICAgID8gY2FjaGVkSGFzaFN0cmluZyhvKVxuICAgICAgICA6IGhhc2hTdHJpbmcobyk7XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICBpZiAobyA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gMHg0MjEwODQyMjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygby5oYXNoQ29kZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBEcm9wIGFueSBoaWdoIGJpdHMgZnJvbSBhY2NpZGVudGFsbHkgbG9uZyBoYXNoIGNvZGVzLlxuICAgICAgICByZXR1cm4gc21pKG8uaGFzaENvZGUobykpO1xuICAgICAgfVxuICAgICAgaWYgKG8udmFsdWVPZiAhPT0gZGVmYXVsdFZhbHVlT2YgJiYgdHlwZW9mIG8udmFsdWVPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvID0gby52YWx1ZU9mKG8pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhhc2hKU09iaihvKTtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgcmV0dXJuIDB4NDIxMDg0MjM7XG4gICAgZGVmYXVsdDpcbiAgICAgIGlmICh0eXBlb2Ygby50b1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gaGFzaFN0cmluZyhvLnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSB0eXBlICcgKyB0eXBlb2YgbyArICcgY2Fubm90IGJlIGhhc2hlZC4nKTtcbiAgfVxufVxuXG4vLyBDb21wcmVzcyBhcmJpdHJhcmlseSBsYXJnZSBudW1iZXJzIGludG8gc21pIGhhc2hlcy5cbmZ1bmN0aW9uIGhhc2hOdW1iZXIobikge1xuICBpZiAobiAhPT0gbiB8fCBuID09PSBJbmZpbml0eSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIHZhciBoYXNoID0gbiB8IDA7XG4gIGlmIChoYXNoICE9PSBuKSB7XG4gICAgaGFzaCBePSBuICogMHhmZmZmZmZmZjtcbiAgfVxuICB3aGlsZSAobiA+IDB4ZmZmZmZmZmYpIHtcbiAgICBuIC89IDB4ZmZmZmZmZmY7XG4gICAgaGFzaCBePSBuO1xuICB9XG4gIHJldHVybiBzbWkoaGFzaCk7XG59XG5cbmZ1bmN0aW9uIGNhY2hlZEhhc2hTdHJpbmcoc3RyaW5nKSB7XG4gIHZhciBoYXNoZWQgPSBzdHJpbmdIYXNoQ2FjaGVbc3RyaW5nXTtcbiAgaWYgKGhhc2hlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaGFzaGVkID0gaGFzaFN0cmluZyhzdHJpbmcpO1xuICAgIGlmIChTVFJJTkdfSEFTSF9DQUNIRV9TSVpFID09PSBTVFJJTkdfSEFTSF9DQUNIRV9NQVhfU0laRSkge1xuICAgICAgU1RSSU5HX0hBU0hfQ0FDSEVfU0laRSA9IDA7XG4gICAgICBzdHJpbmdIYXNoQ2FjaGUgPSB7fTtcbiAgICB9XG4gICAgU1RSSU5HX0hBU0hfQ0FDSEVfU0laRSsrO1xuICAgIHN0cmluZ0hhc2hDYWNoZVtzdHJpbmddID0gaGFzaGVkO1xuICB9XG4gIHJldHVybiBoYXNoZWQ7XG59XG5cbi8vIGh0dHA6Ly9qc3BlcmYuY29tL2hhc2hpbmctc3RyaW5nc1xuZnVuY3Rpb24gaGFzaFN0cmluZyhzdHJpbmcpIHtcbiAgLy8gVGhpcyBpcyB0aGUgaGFzaCBmcm9tIEpWTVxuICAvLyBUaGUgaGFzaCBjb2RlIGZvciBhIHN0cmluZyBpcyBjb21wdXRlZCBhc1xuICAvLyBzWzBdICogMzEgXiAobiAtIDEpICsgc1sxXSAqIDMxIF4gKG4gLSAyKSArIC4uLiArIHNbbiAtIDFdLFxuICAvLyB3aGVyZSBzW2ldIGlzIHRoZSBpdGggY2hhcmFjdGVyIG9mIHRoZSBzdHJpbmcgYW5kIG4gaXMgdGhlIGxlbmd0aCBvZlxuICAvLyB0aGUgc3RyaW5nLiBXZSBcIm1vZFwiIHRoZSByZXN1bHQgdG8gbWFrZSBpdCBiZXR3ZWVuIDAgKGluY2x1c2l2ZSkgYW5kIDJeMzFcbiAgLy8gKGV4Y2x1c2l2ZSkgYnkgZHJvcHBpbmcgaGlnaCBiaXRzLlxuICB2YXIgaGFzaGVkID0gMDtcbiAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IHN0cmluZy5sZW5ndGg7IGlpKyspIHtcbiAgICBoYXNoZWQgPSAoMzEgKiBoYXNoZWQgKyBzdHJpbmcuY2hhckNvZGVBdChpaSkpIHwgMDtcbiAgfVxuICByZXR1cm4gc21pKGhhc2hlZCk7XG59XG5cbmZ1bmN0aW9uIGhhc2hKU09iaihvYmopIHtcbiAgdmFyIGhhc2hlZDtcbiAgaWYgKHVzaW5nV2Vha01hcCkge1xuICAgIGhhc2hlZCA9IHdlYWtNYXAuZ2V0KG9iaik7XG4gICAgaWYgKGhhc2hlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gaGFzaGVkO1xuICAgIH1cbiAgfVxuXG4gIGhhc2hlZCA9IG9ialtVSURfSEFTSF9LRVldO1xuICBpZiAoaGFzaGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gaGFzaGVkO1xuICB9XG5cbiAgaWYgKCFjYW5EZWZpbmVQcm9wZXJ0eSkge1xuICAgIGhhc2hlZCA9IG9iai5wcm9wZXJ0eUlzRW51bWVyYWJsZSAmJiBvYmoucHJvcGVydHlJc0VudW1lcmFibGVbVUlEX0hBU0hfS0VZXTtcbiAgICBpZiAoaGFzaGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBoYXNoZWQ7XG4gICAgfVxuXG4gICAgaGFzaGVkID0gZ2V0SUVOb2RlSGFzaChvYmopO1xuICAgIGlmIChoYXNoZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGhhc2hlZDtcbiAgICB9XG4gIH1cblxuICBoYXNoZWQgPSArK29iakhhc2hVSUQ7XG4gIGlmIChvYmpIYXNoVUlEICYgMHg0MDAwMDAwMCkge1xuICAgIG9iakhhc2hVSUQgPSAwO1xuICB9XG5cbiAgaWYgKHVzaW5nV2Vha01hcCkge1xuICAgIHdlYWtNYXAuc2V0KG9iaiwgaGFzaGVkKTtcbiAgfSBlbHNlIGlmIChpc0V4dGVuc2libGUgIT09IHVuZGVmaW5lZCAmJiBpc0V4dGVuc2libGUob2JqKSA9PT0gZmFsc2UpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vbi1leHRlbnNpYmxlIG9iamVjdHMgYXJlIG5vdCBhbGxvd2VkIGFzIGtleXMuJyk7XG4gIH0gZWxzZSBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBVSURfSEFTSF9LRVksIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBoYXNoZWQsXG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoXG4gICAgb2JqLnByb3BlcnR5SXNFbnVtZXJhYmxlICE9PSB1bmRlZmluZWQgJiZcbiAgICBvYmoucHJvcGVydHlJc0VudW1lcmFibGUgPT09IG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVcbiAgKSB7XG4gICAgLy8gU2luY2Ugd2UgY2FuJ3QgZGVmaW5lIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgb24gdGhlIG9iamVjdFxuICAgIC8vIHdlJ2xsIGhpamFjayBvbmUgb2YgdGhlIGxlc3MtdXNlZCBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIHRvXG4gICAgLy8gc2F2ZSBvdXIgaGFzaCBvbiBpdC4gU2luY2UgdGhpcyBpcyBhIGZ1bmN0aW9uIGl0IHdpbGwgbm90IHNob3cgdXAgaW5cbiAgICAvLyBgSlNPTi5zdHJpbmdpZnlgIHdoaWNoIGlzIHdoYXQgd2Ugd2FudC5cbiAgICBvYmoucHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5hcHBseShcbiAgICAgICAgdGhpcyxcbiAgICAgICAgYXJndW1lbnRzXG4gICAgICApO1xuICAgIH07XG4gICAgb2JqLnByb3BlcnR5SXNFbnVtZXJhYmxlW1VJRF9IQVNIX0tFWV0gPSBoYXNoZWQ7XG4gIH0gZWxzZSBpZiAob2JqLm5vZGVUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBBdCB0aGlzIHBvaW50IHdlIGNvdWxkbid0IGdldCB0aGUgSUUgYHVuaXF1ZUlEYCB0byB1c2UgYXMgYSBoYXNoXG4gICAgLy8gYW5kIHdlIGNvdWxkbid0IHVzZSBhIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5IHRvIGV4cGxvaXQgdGhlXG4gICAgLy8gZG9udEVudW0gYnVnIHNvIHdlIHNpbXBseSBhZGQgdGhlIGBVSURfSEFTSF9LRVlgIG9uIHRoZSBub2RlXG4gICAgLy8gaXRzZWxmLlxuICAgIG9ialtVSURfSEFTSF9LRVldID0gaGFzaGVkO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHNldCBhIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5IG9uIG9iamVjdC4nKTtcbiAgfVxuXG4gIHJldHVybiBoYXNoZWQ7XG59XG5cbi8vIEdldCByZWZlcmVuY2VzIHRvIEVTNSBvYmplY3QgbWV0aG9kcy5cbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlO1xuXG4vLyBUcnVlIGlmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB3b3JrcyBhcyBleHBlY3RlZC4gSUU4IGZhaWxzIHRoaXMgdGVzdC5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdAJywge30pO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59KSgpO1xuXG4vLyBJRSBoYXMgYSBgdW5pcXVlSURgIHByb3BlcnR5IG9uIERPTSBub2Rlcy4gV2UgY2FuIGNvbnN0cnVjdCB0aGUgaGFzaCBmcm9tIGl0XG4vLyBhbmQgYXZvaWQgbWVtb3J5IGxlYWtzIGZyb20gdGhlIElFIGNsb25lTm9kZSBidWcuXG5mdW5jdGlvbiBnZXRJRU5vZGVIYXNoKG5vZGUpIHtcbiAgaWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA+IDApIHtcbiAgICBzd2l0Y2ggKG5vZGUubm9kZVR5cGUpIHtcbiAgICAgIGNhc2UgMTogLy8gRWxlbWVudFxuICAgICAgICByZXR1cm4gbm9kZS51bmlxdWVJRDtcbiAgICAgIGNhc2UgOTogLy8gRG9jdW1lbnRcbiAgICAgICAgcmV0dXJuIG5vZGUuZG9jdW1lbnRFbGVtZW50ICYmIG5vZGUuZG9jdW1lbnRFbGVtZW50LnVuaXF1ZUlEO1xuICAgIH1cbiAgfVxufVxuXG4vLyBJZiBwb3NzaWJsZSwgdXNlIGEgV2Vha01hcC5cbnZhciB1c2luZ1dlYWtNYXAgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJztcbnZhciB3ZWFrTWFwO1xuaWYgKHVzaW5nV2Vha01hcCkge1xuICB3ZWFrTWFwID0gbmV3IFdlYWtNYXAoKTtcbn1cblxudmFyIG9iakhhc2hVSUQgPSAwO1xuXG52YXIgVUlEX0hBU0hfS0VZID0gJ19faW1tdXRhYmxlaGFzaF9fJztcbmlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG4gIFVJRF9IQVNIX0tFWSA9IFN5bWJvbChVSURfSEFTSF9LRVkpO1xufVxuXG52YXIgU1RSSU5HX0hBU0hfQ0FDSEVfTUlOX1NUUkxFTiA9IDE2O1xudmFyIFNUUklOR19IQVNIX0NBQ0hFX01BWF9TSVpFID0gMjU1O1xudmFyIFNUUklOR19IQVNIX0NBQ0hFX1NJWkUgPSAwO1xudmFyIHN0cmluZ0hhc2hDYWNoZSA9IHt9O1xuXG52YXIgVG9LZXllZFNlcXVlbmNlID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoS2V5ZWRTZXEkJDEpIHtcbiAgZnVuY3Rpb24gVG9LZXllZFNlcXVlbmNlKGluZGV4ZWQsIHVzZUtleXMpIHtcbiAgICB0aGlzLl9pdGVyID0gaW5kZXhlZDtcbiAgICB0aGlzLl91c2VLZXlzID0gdXNlS2V5cztcbiAgICB0aGlzLnNpemUgPSBpbmRleGVkLnNpemU7XG4gIH1cblxuICBpZiAoIEtleWVkU2VxJCQxICkgVG9LZXllZFNlcXVlbmNlLl9fcHJvdG9fXyA9IEtleWVkU2VxJCQxO1xuICBUb0tleWVkU2VxdWVuY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggS2V5ZWRTZXEkJDEgJiYgS2V5ZWRTZXEkJDEucHJvdG90eXBlICk7XG4gIFRvS2V5ZWRTZXF1ZW5jZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUb0tleWVkU2VxdWVuY2U7XG5cbiAgVG9LZXllZFNlcXVlbmNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGtleSwgbm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlci5nZXQoa2V5LCBub3RTZXRWYWx1ZSk7XG4gIH07XG5cbiAgVG9LZXllZFNlcXVlbmNlLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBoYXMgKGtleSkge1xuICAgIHJldHVybiB0aGlzLl9pdGVyLmhhcyhrZXkpO1xuICB9O1xuXG4gIFRvS2V5ZWRTZXF1ZW5jZS5wcm90b3R5cGUudmFsdWVTZXEgPSBmdW5jdGlvbiB2YWx1ZVNlcSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIudmFsdWVTZXEoKTtcbiAgfTtcblxuICBUb0tleWVkU2VxdWVuY2UucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbiByZXZlcnNlICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciByZXZlcnNlZFNlcXVlbmNlID0gcmV2ZXJzZUZhY3RvcnkodGhpcywgdHJ1ZSk7XG4gICAgaWYgKCF0aGlzLl91c2VLZXlzKSB7XG4gICAgICByZXZlcnNlZFNlcXVlbmNlLnZhbHVlU2VxID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLl9pdGVyLnRvU2VxKCkucmV2ZXJzZSgpOyB9O1xuICAgIH1cbiAgICByZXR1cm4gcmV2ZXJzZWRTZXF1ZW5jZTtcbiAgfTtcblxuICBUb0tleWVkU2VxdWVuY2UucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIG1hcCAobWFwcGVyLCBjb250ZXh0KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgbWFwcGVkU2VxdWVuY2UgPSBtYXBGYWN0b3J5KHRoaXMsIG1hcHBlciwgY29udGV4dCk7XG4gICAgaWYgKCF0aGlzLl91c2VLZXlzKSB7XG4gICAgICBtYXBwZWRTZXF1ZW5jZS52YWx1ZVNlcSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5faXRlci50b1NlcSgpLm1hcChtYXBwZXIsIGNvbnRleHQpOyB9O1xuICAgIH1cbiAgICByZXR1cm4gbWFwcGVkU2VxdWVuY2U7XG4gIH07XG5cbiAgVG9LZXllZFNlcXVlbmNlLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcy5faXRlci5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIGZuKHYsIGssIHRoaXMkMSk7IH0sIHJldmVyc2UpO1xuICB9O1xuXG4gIFRvS2V5ZWRTZXF1ZW5jZS5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlci5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICB9O1xuXG4gIHJldHVybiBUb0tleWVkU2VxdWVuY2U7XG59KEtleWVkU2VxKSk7XG5Ub0tleWVkU2VxdWVuY2UucHJvdG90eXBlW0lTX09SREVSRURfU1lNQk9MXSA9IHRydWU7XG5cbnZhciBUb0luZGV4ZWRTZXF1ZW5jZSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEluZGV4ZWRTZXEkJDEpIHtcbiAgZnVuY3Rpb24gVG9JbmRleGVkU2VxdWVuY2UoaXRlcikge1xuICAgIHRoaXMuX2l0ZXIgPSBpdGVyO1xuICAgIHRoaXMuc2l6ZSA9IGl0ZXIuc2l6ZTtcbiAgfVxuXG4gIGlmICggSW5kZXhlZFNlcSQkMSApIFRvSW5kZXhlZFNlcXVlbmNlLl9fcHJvdG9fXyA9IEluZGV4ZWRTZXEkJDE7XG4gIFRvSW5kZXhlZFNlcXVlbmNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEluZGV4ZWRTZXEkJDEgJiYgSW5kZXhlZFNlcSQkMS5wcm90b3R5cGUgKTtcbiAgVG9JbmRleGVkU2VxdWVuY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVG9JbmRleGVkU2VxdWVuY2U7XG5cbiAgVG9JbmRleGVkU2VxdWVuY2UucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIuaW5jbHVkZXModmFsdWUpO1xuICB9O1xuXG4gIFRvSW5kZXhlZFNlcXVlbmNlLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgaSA9IDA7XG4gICAgcmV2ZXJzZSAmJiBlbnN1cmVTaXplKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLl9pdGVyLl9faXRlcmF0ZShcbiAgICAgIGZ1bmN0aW9uICh2KSB7IHJldHVybiBmbih2LCByZXZlcnNlID8gdGhpcyQxLnNpemUgLSArK2kgOiBpKyssIHRoaXMkMSk7IH0sXG4gICAgICByZXZlcnNlXG4gICAgKTtcbiAgfTtcblxuICBUb0luZGV4ZWRTZXF1ZW5jZS5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBpdGVyYXRvciA9IHRoaXMuX2l0ZXIuX19pdGVyYXRvcihJVEVSQVRFX1ZBTFVFUywgcmV2ZXJzZSk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHJldmVyc2UgJiYgZW5zdXJlU2l6ZSh0aGlzKTtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgcmV0dXJuIHN0ZXAuZG9uZVxuICAgICAgICA/IHN0ZXBcbiAgICAgICAgOiBpdGVyYXRvclZhbHVlKFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHJldmVyc2UgPyB0aGlzJDEuc2l6ZSAtICsraSA6IGkrKyxcbiAgICAgICAgICAgIHN0ZXAudmFsdWUsXG4gICAgICAgICAgICBzdGVwXG4gICAgICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gVG9JbmRleGVkU2VxdWVuY2U7XG59KEluZGV4ZWRTZXEpKTtcblxudmFyIFRvU2V0U2VxdWVuY2UgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChTZXRTZXEkJDEpIHtcbiAgZnVuY3Rpb24gVG9TZXRTZXF1ZW5jZShpdGVyKSB7XG4gICAgdGhpcy5faXRlciA9IGl0ZXI7XG4gICAgdGhpcy5zaXplID0gaXRlci5zaXplO1xuICB9XG5cbiAgaWYgKCBTZXRTZXEkJDEgKSBUb1NldFNlcXVlbmNlLl9fcHJvdG9fXyA9IFNldFNlcSQkMTtcbiAgVG9TZXRTZXF1ZW5jZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBTZXRTZXEkJDEgJiYgU2V0U2VxJCQxLnByb3RvdHlwZSApO1xuICBUb1NldFNlcXVlbmNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRvU2V0U2VxdWVuY2U7XG5cbiAgVG9TZXRTZXF1ZW5jZS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gaGFzIChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlci5pbmNsdWRlcyhrZXkpO1xuICB9O1xuXG4gIFRvU2V0U2VxdWVuY2UucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzLl9pdGVyLl9faXRlcmF0ZShmdW5jdGlvbiAodikgeyByZXR1cm4gZm4odiwgdiwgdGhpcyQxKTsgfSwgcmV2ZXJzZSk7XG4gIH07XG5cbiAgVG9TZXRTZXF1ZW5jZS5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB0aGlzLl9pdGVyLl9faXRlcmF0b3IoSVRFUkFURV9WQUxVRVMsIHJldmVyc2UpO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICByZXR1cm4gc3RlcC5kb25lXG4gICAgICAgID8gc3RlcFxuICAgICAgICA6IGl0ZXJhdG9yVmFsdWUodHlwZSwgc3RlcC52YWx1ZSwgc3RlcC52YWx1ZSwgc3RlcCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFRvU2V0U2VxdWVuY2U7XG59KFNldFNlcSkpO1xuXG52YXIgRnJvbUVudHJpZXNTZXF1ZW5jZSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEtleWVkU2VxJCQxKSB7XG4gIGZ1bmN0aW9uIEZyb21FbnRyaWVzU2VxdWVuY2UoZW50cmllcykge1xuICAgIHRoaXMuX2l0ZXIgPSBlbnRyaWVzO1xuICAgIHRoaXMuc2l6ZSA9IGVudHJpZXMuc2l6ZTtcbiAgfVxuXG4gIGlmICggS2V5ZWRTZXEkJDEgKSBGcm9tRW50cmllc1NlcXVlbmNlLl9fcHJvdG9fXyA9IEtleWVkU2VxJCQxO1xuICBGcm9tRW50cmllc1NlcXVlbmNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEtleWVkU2VxJCQxICYmIEtleWVkU2VxJCQxLnByb3RvdHlwZSApO1xuICBGcm9tRW50cmllc1NlcXVlbmNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZyb21FbnRyaWVzU2VxdWVuY2U7XG5cbiAgRnJvbUVudHJpZXNTZXF1ZW5jZS5wcm90b3R5cGUuZW50cnlTZXEgPSBmdW5jdGlvbiBlbnRyeVNlcSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIudG9TZXEoKTtcbiAgfTtcblxuICBGcm9tRW50cmllc1NlcXVlbmNlLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcy5faXRlci5fX2l0ZXJhdGUoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAvLyBDaGVjayBpZiBlbnRyeSBleGlzdHMgZmlyc3Qgc28gYXJyYXkgYWNjZXNzIGRvZXNuJ3QgdGhyb3cgZm9yIGhvbGVzXG4gICAgICAvLyBpbiB0aGUgcGFyZW50IGl0ZXJhdGlvbi5cbiAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICB2YWxpZGF0ZUVudHJ5KGVudHJ5KTtcbiAgICAgICAgdmFyIGluZGV4ZWRDb2xsZWN0aW9uID0gaXNDb2xsZWN0aW9uKGVudHJ5KTtcbiAgICAgICAgcmV0dXJuIGZuKFxuICAgICAgICAgIGluZGV4ZWRDb2xsZWN0aW9uID8gZW50cnkuZ2V0KDEpIDogZW50cnlbMV0sXG4gICAgICAgICAgaW5kZXhlZENvbGxlY3Rpb24gPyBlbnRyeS5nZXQoMCkgOiBlbnRyeVswXSxcbiAgICAgICAgICB0aGlzJDFcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCByZXZlcnNlKTtcbiAgfTtcblxuICBGcm9tRW50cmllc1NlcXVlbmNlLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBpdGVyYXRvciA9IHRoaXMuX2l0ZXIuX19pdGVyYXRvcihJVEVSQVRFX1ZBTFVFUywgcmV2ZXJzZSk7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgaWYgKHN0ZXAuZG9uZSkge1xuICAgICAgICAgIHJldHVybiBzdGVwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgIC8vIENoZWNrIGlmIGVudHJ5IGV4aXN0cyBmaXJzdCBzbyBhcnJheSBhY2Nlc3MgZG9lc24ndCB0aHJvdyBmb3IgaG9sZXNcbiAgICAgICAgLy8gaW4gdGhlIHBhcmVudCBpdGVyYXRpb24uXG4gICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgIHZhbGlkYXRlRW50cnkoZW50cnkpO1xuICAgICAgICAgIHZhciBpbmRleGVkQ29sbGVjdGlvbiA9IGlzQ29sbGVjdGlvbihlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUoXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgaW5kZXhlZENvbGxlY3Rpb24gPyBlbnRyeS5nZXQoMCkgOiBlbnRyeVswXSxcbiAgICAgICAgICAgIGluZGV4ZWRDb2xsZWN0aW9uID8gZW50cnkuZ2V0KDEpIDogZW50cnlbMV0sXG4gICAgICAgICAgICBzdGVwXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBGcm9tRW50cmllc1NlcXVlbmNlO1xufShLZXllZFNlcSkpO1xuXG5Ub0luZGV4ZWRTZXF1ZW5jZS5wcm90b3R5cGUuY2FjaGVSZXN1bHQgPSBUb0tleWVkU2VxdWVuY2UucHJvdG90eXBlLmNhY2hlUmVzdWx0ID0gVG9TZXRTZXF1ZW5jZS5wcm90b3R5cGUuY2FjaGVSZXN1bHQgPSBGcm9tRW50cmllc1NlcXVlbmNlLnByb3RvdHlwZS5jYWNoZVJlc3VsdCA9IGNhY2hlUmVzdWx0VGhyb3VnaDtcblxuZnVuY3Rpb24gZmxpcEZhY3RvcnkoY29sbGVjdGlvbikge1xuICB2YXIgZmxpcFNlcXVlbmNlID0gbWFrZVNlcXVlbmNlKGNvbGxlY3Rpb24pO1xuICBmbGlwU2VxdWVuY2UuX2l0ZXIgPSBjb2xsZWN0aW9uO1xuICBmbGlwU2VxdWVuY2Uuc2l6ZSA9IGNvbGxlY3Rpb24uc2l6ZTtcbiAgZmxpcFNlcXVlbmNlLmZsaXAgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2xsZWN0aW9uOyB9O1xuICBmbGlwU2VxdWVuY2UucmV2ZXJzZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXZlcnNlZFNlcXVlbmNlID0gY29sbGVjdGlvbi5yZXZlcnNlLmFwcGx5KHRoaXMpOyAvLyBzdXBlci5yZXZlcnNlKClcbiAgICByZXZlcnNlZFNlcXVlbmNlLmZsaXAgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2xsZWN0aW9uLnJldmVyc2UoKTsgfTtcbiAgICByZXR1cm4gcmV2ZXJzZWRTZXF1ZW5jZTtcbiAgfTtcbiAgZmxpcFNlcXVlbmNlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGNvbGxlY3Rpb24uaW5jbHVkZXMoa2V5KTsgfTtcbiAgZmxpcFNlcXVlbmNlLmluY2x1ZGVzID0gZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gY29sbGVjdGlvbi5oYXMoa2V5KTsgfTtcbiAgZmxpcFNlcXVlbmNlLmNhY2hlUmVzdWx0ID0gY2FjaGVSZXN1bHRUaHJvdWdoO1xuICBmbGlwU2VxdWVuY2UuX19pdGVyYXRlVW5jYWNoZWQgPSBmdW5jdGlvbihmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBmbihrLCB2LCB0aGlzJDEpICE9PSBmYWxzZTsgfSwgcmV2ZXJzZSk7XG4gIH07XG4gIGZsaXBTZXF1ZW5jZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbih0eXBlLCByZXZlcnNlKSB7XG4gICAgaWYgKHR5cGUgPT09IElURVJBVEVfRU5UUklFUykge1xuICAgICAgdmFyIGl0ZXJhdG9yID0gY29sbGVjdGlvbi5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICBpZiAoIXN0ZXAuZG9uZSkge1xuICAgICAgICAgIHZhciBrID0gc3RlcC52YWx1ZVswXTtcbiAgICAgICAgICBzdGVwLnZhbHVlWzBdID0gc3RlcC52YWx1ZVsxXTtcbiAgICAgICAgICBzdGVwLnZhbHVlWzFdID0gaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RlcDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbi5fX2l0ZXJhdG9yKFxuICAgICAgdHlwZSA9PT0gSVRFUkFURV9WQUxVRVMgPyBJVEVSQVRFX0tFWVMgOiBJVEVSQVRFX1ZBTFVFUyxcbiAgICAgIHJldmVyc2VcbiAgICApO1xuICB9O1xuICByZXR1cm4gZmxpcFNlcXVlbmNlO1xufVxuXG5mdW5jdGlvbiBtYXBGYWN0b3J5KGNvbGxlY3Rpb24sIG1hcHBlciwgY29udGV4dCkge1xuICB2YXIgbWFwcGVkU2VxdWVuY2UgPSBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbik7XG4gIG1hcHBlZFNlcXVlbmNlLnNpemUgPSBjb2xsZWN0aW9uLnNpemU7XG4gIG1hcHBlZFNlcXVlbmNlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGNvbGxlY3Rpb24uaGFzKGtleSk7IH07XG4gIG1hcHBlZFNlcXVlbmNlLmdldCA9IGZ1bmN0aW9uIChrZXksIG5vdFNldFZhbHVlKSB7XG4gICAgdmFyIHYgPSBjb2xsZWN0aW9uLmdldChrZXksIE5PVF9TRVQpO1xuICAgIHJldHVybiB2ID09PSBOT1RfU0VUXG4gICAgICA/IG5vdFNldFZhbHVlXG4gICAgICA6IG1hcHBlci5jYWxsKGNvbnRleHQsIHYsIGtleSwgY29sbGVjdGlvbik7XG4gIH07XG4gIG1hcHBlZFNlcXVlbmNlLl9faXRlcmF0ZVVuY2FjaGVkID0gZnVuY3Rpb24oZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHJldHVybiBjb2xsZWN0aW9uLl9faXRlcmF0ZShcbiAgICAgIGZ1bmN0aW9uICh2LCBrLCBjKSB7IHJldHVybiBmbihtYXBwZXIuY2FsbChjb250ZXh0LCB2LCBrLCBjKSwgaywgdGhpcyQxKSAhPT0gZmFsc2U7IH0sXG4gICAgICByZXZlcnNlXG4gICAgKTtcbiAgfTtcbiAgbWFwcGVkU2VxdWVuY2UuX19pdGVyYXRvclVuY2FjaGVkID0gZnVuY3Rpb24odHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBpdGVyYXRvciA9IGNvbGxlY3Rpb24uX19pdGVyYXRvcihJVEVSQVRFX0VOVFJJRVMsIHJldmVyc2UpO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICBpZiAoc3RlcC5kb25lKSB7XG4gICAgICAgIHJldHVybiBzdGVwO1xuICAgICAgfVxuICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgIHZhciBrZXkgPSBlbnRyeVswXTtcbiAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKFxuICAgICAgICB0eXBlLFxuICAgICAgICBrZXksXG4gICAgICAgIG1hcHBlci5jYWxsKGNvbnRleHQsIGVudHJ5WzFdLCBrZXksIGNvbGxlY3Rpb24pLFxuICAgICAgICBzdGVwXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuICByZXR1cm4gbWFwcGVkU2VxdWVuY2U7XG59XG5cbmZ1bmN0aW9uIHJldmVyc2VGYWN0b3J5KGNvbGxlY3Rpb24sIHVzZUtleXMpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIHJldmVyc2VkU2VxdWVuY2UgPSBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbik7XG4gIHJldmVyc2VkU2VxdWVuY2UuX2l0ZXIgPSBjb2xsZWN0aW9uO1xuICByZXZlcnNlZFNlcXVlbmNlLnNpemUgPSBjb2xsZWN0aW9uLnNpemU7XG4gIHJldmVyc2VkU2VxdWVuY2UucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbGxlY3Rpb247IH07XG4gIGlmIChjb2xsZWN0aW9uLmZsaXApIHtcbiAgICByZXZlcnNlZFNlcXVlbmNlLmZsaXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmbGlwU2VxdWVuY2UgPSBmbGlwRmFjdG9yeShjb2xsZWN0aW9uKTtcbiAgICAgIGZsaXBTZXF1ZW5jZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY29sbGVjdGlvbi5mbGlwKCk7IH07XG4gICAgICByZXR1cm4gZmxpcFNlcXVlbmNlO1xuICAgIH07XG4gIH1cbiAgcmV2ZXJzZWRTZXF1ZW5jZS5nZXQgPSBmdW5jdGlvbiAoa2V5LCBub3RTZXRWYWx1ZSkgeyByZXR1cm4gY29sbGVjdGlvbi5nZXQodXNlS2V5cyA/IGtleSA6IC0xIC0ga2V5LCBub3RTZXRWYWx1ZSk7IH07XG4gIHJldmVyc2VkU2VxdWVuY2UuaGFzID0gZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gY29sbGVjdGlvbi5oYXModXNlS2V5cyA/IGtleSA6IC0xIC0ga2V5KTsgfTtcbiAgcmV2ZXJzZWRTZXF1ZW5jZS5pbmNsdWRlcyA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gY29sbGVjdGlvbi5pbmNsdWRlcyh2YWx1ZSk7IH07XG4gIHJldmVyc2VkU2VxdWVuY2UuY2FjaGVSZXN1bHQgPSBjYWNoZVJlc3VsdFRocm91Z2g7XG4gIHJldmVyc2VkU2VxdWVuY2UuX19pdGVyYXRlID0gZnVuY3Rpb24oZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBpID0gMDtcbiAgICByZXZlcnNlICYmIGVuc3VyZVNpemUoY29sbGVjdGlvbik7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uX19pdGVyYXRlKFxuICAgICAgZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIGZuKHYsIHVzZUtleXMgPyBrIDogcmV2ZXJzZSA/IHRoaXMkMS5zaXplIC0gKytpIDogaSsrLCB0aGlzJDEpOyB9LFxuICAgICAgIXJldmVyc2VcbiAgICApO1xuICB9O1xuICByZXZlcnNlZFNlcXVlbmNlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBpID0gMDtcbiAgICByZXZlcnNlICYmIGVuc3VyZVNpemUoY29sbGVjdGlvbik7XG4gICAgdmFyIGl0ZXJhdG9yID0gY29sbGVjdGlvbi5fX2l0ZXJhdG9yKElURVJBVEVfRU5UUklFUywgIXJldmVyc2UpO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICBpZiAoc3RlcC5kb25lKSB7XG4gICAgICAgIHJldHVybiBzdGVwO1xuICAgICAgfVxuICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKFxuICAgICAgICB0eXBlLFxuICAgICAgICB1c2VLZXlzID8gZW50cnlbMF0gOiByZXZlcnNlID8gdGhpcyQxLnNpemUgLSArK2kgOiBpKyssXG4gICAgICAgIGVudHJ5WzFdLFxuICAgICAgICBzdGVwXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuICByZXR1cm4gcmV2ZXJzZWRTZXF1ZW5jZTtcbn1cblxuZnVuY3Rpb24gZmlsdGVyRmFjdG9yeShjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIGNvbnRleHQsIHVzZUtleXMpIHtcbiAgdmFyIGZpbHRlclNlcXVlbmNlID0gbWFrZVNlcXVlbmNlKGNvbGxlY3Rpb24pO1xuICBpZiAodXNlS2V5cykge1xuICAgIGZpbHRlclNlcXVlbmNlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciB2ID0gY29sbGVjdGlvbi5nZXQoa2V5LCBOT1RfU0VUKTtcbiAgICAgIHJldHVybiB2ICE9PSBOT1RfU0VUICYmICEhcHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwga2V5LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGZpbHRlclNlcXVlbmNlLmdldCA9IGZ1bmN0aW9uIChrZXksIG5vdFNldFZhbHVlKSB7XG4gICAgICB2YXIgdiA9IGNvbGxlY3Rpb24uZ2V0KGtleSwgTk9UX1NFVCk7XG4gICAgICByZXR1cm4gdiAhPT0gTk9UX1NFVCAmJiBwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2LCBrZXksIGNvbGxlY3Rpb24pXG4gICAgICAgID8gdlxuICAgICAgICA6IG5vdFNldFZhbHVlO1xuICAgIH07XG4gIH1cbiAgZmlsdGVyU2VxdWVuY2UuX19pdGVyYXRlVW5jYWNoZWQgPSBmdW5jdGlvbihmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIGNvbGxlY3Rpb24uX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrLCBjKSB7XG4gICAgICBpZiAocHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwgaywgYykpIHtcbiAgICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgICByZXR1cm4gZm4odiwgdXNlS2V5cyA/IGsgOiBpdGVyYXRpb25zIC0gMSwgdGhpcyQxKTtcbiAgICAgIH1cbiAgICB9LCByZXZlcnNlKTtcbiAgICByZXR1cm4gaXRlcmF0aW9ucztcbiAgfTtcbiAgZmlsdGVyU2VxdWVuY2UuX19pdGVyYXRvclVuY2FjaGVkID0gZnVuY3Rpb24odHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBpdGVyYXRvciA9IGNvbGxlY3Rpb24uX19pdGVyYXRvcihJVEVSQVRFX0VOVFJJRVMsIHJldmVyc2UpO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICBpZiAoc3RlcC5kb25lKSB7XG4gICAgICAgICAgcmV0dXJuIHN0ZXA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgdmFyIGtleSA9IGVudHJ5WzBdO1xuICAgICAgICB2YXIgdmFsdWUgPSBlbnRyeVsxXTtcbiAgICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKGNvbnRleHQsIHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgdXNlS2V5cyA/IGtleSA6IGl0ZXJhdGlvbnMrKywgdmFsdWUsIHN0ZXApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiBmaWx0ZXJTZXF1ZW5jZTtcbn1cblxuZnVuY3Rpb24gY291bnRCeUZhY3RvcnkoY29sbGVjdGlvbiwgZ3JvdXBlciwgY29udGV4dCkge1xuICB2YXIgZ3JvdXBzID0gTWFwKCkuYXNNdXRhYmxlKCk7XG4gIGNvbGxlY3Rpb24uX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgZ3JvdXBzLnVwZGF0ZShncm91cGVyLmNhbGwoY29udGV4dCwgdiwgaywgY29sbGVjdGlvbiksIDAsIGZ1bmN0aW9uIChhKSB7IHJldHVybiBhICsgMTsgfSk7XG4gIH0pO1xuICByZXR1cm4gZ3JvdXBzLmFzSW1tdXRhYmxlKCk7XG59XG5cbmZ1bmN0aW9uIGdyb3VwQnlGYWN0b3J5KGNvbGxlY3Rpb24sIGdyb3VwZXIsIGNvbnRleHQpIHtcbiAgdmFyIGlzS2V5ZWRJdGVyID0gaXNLZXllZChjb2xsZWN0aW9uKTtcbiAgdmFyIGdyb3VwcyA9IChpc09yZGVyZWQoY29sbGVjdGlvbikgPyBPcmRlcmVkTWFwKCkgOiBNYXAoKSkuYXNNdXRhYmxlKCk7XG4gIGNvbGxlY3Rpb24uX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgZ3JvdXBzLnVwZGF0ZShcbiAgICAgIGdyb3VwZXIuY2FsbChjb250ZXh0LCB2LCBrLCBjb2xsZWN0aW9uKSxcbiAgICAgIGZ1bmN0aW9uIChhKSB7IHJldHVybiAoKGEgPSBhIHx8IFtdKSwgYS5wdXNoKGlzS2V5ZWRJdGVyID8gW2ssIHZdIDogdiksIGEpOyB9XG4gICAgKTtcbiAgfSk7XG4gIHZhciBjb2VyY2UgPSBjb2xsZWN0aW9uQ2xhc3MoY29sbGVjdGlvbik7XG4gIHJldHVybiBncm91cHMubWFwKGZ1bmN0aW9uIChhcnIpIHsgcmV0dXJuIHJlaWZ5KGNvbGxlY3Rpb24sIGNvZXJjZShhcnIpKTsgfSkuYXNJbW11dGFibGUoKTtcbn1cblxuZnVuY3Rpb24gc2xpY2VGYWN0b3J5KGNvbGxlY3Rpb24sIGJlZ2luLCBlbmQsIHVzZUtleXMpIHtcbiAgdmFyIG9yaWdpbmFsU2l6ZSA9IGNvbGxlY3Rpb24uc2l6ZTtcblxuICBpZiAod2hvbGVTbGljZShiZWdpbiwgZW5kLCBvcmlnaW5hbFNpemUpKSB7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH1cblxuICB2YXIgcmVzb2x2ZWRCZWdpbiA9IHJlc29sdmVCZWdpbihiZWdpbiwgb3JpZ2luYWxTaXplKTtcbiAgdmFyIHJlc29sdmVkRW5kID0gcmVzb2x2ZUVuZChlbmQsIG9yaWdpbmFsU2l6ZSk7XG5cbiAgLy8gYmVnaW4gb3IgZW5kIHdpbGwgYmUgTmFOIGlmIHRoZXkgd2VyZSBwcm92aWRlZCBhcyBuZWdhdGl2ZSBudW1iZXJzIGFuZFxuICAvLyB0aGlzIGNvbGxlY3Rpb24ncyBzaXplIGlzIHVua25vd24uIEluIHRoYXQgY2FzZSwgY2FjaGUgZmlyc3Qgc28gdGhlcmUgaXNcbiAgLy8gYSBrbm93biBzaXplIGFuZCB0aGVzZSBkbyBub3QgcmVzb2x2ZSB0byBOYU4uXG4gIGlmIChyZXNvbHZlZEJlZ2luICE9PSByZXNvbHZlZEJlZ2luIHx8IHJlc29sdmVkRW5kICE9PSByZXNvbHZlZEVuZCkge1xuICAgIHJldHVybiBzbGljZUZhY3RvcnkoY29sbGVjdGlvbi50b1NlcSgpLmNhY2hlUmVzdWx0KCksIGJlZ2luLCBlbmQsIHVzZUtleXMpO1xuICB9XG5cbiAgLy8gTm90ZTogcmVzb2x2ZWRFbmQgaXMgdW5kZWZpbmVkIHdoZW4gdGhlIG9yaWdpbmFsIHNlcXVlbmNlJ3MgbGVuZ3RoIGlzXG4gIC8vIHVua25vd24gYW5kIHRoaXMgc2xpY2UgZGlkIG5vdCBzdXBwbHkgYW4gZW5kIGFuZCBzaG91bGQgY29udGFpbiBhbGxcbiAgLy8gZWxlbWVudHMgYWZ0ZXIgcmVzb2x2ZWRCZWdpbi5cbiAgLy8gSW4gdGhhdCBjYXNlLCByZXNvbHZlZFNpemUgd2lsbCBiZSBOYU4gYW5kIHNsaWNlU2l6ZSB3aWxsIHJlbWFpbiB1bmRlZmluZWQuXG4gIHZhciByZXNvbHZlZFNpemUgPSByZXNvbHZlZEVuZCAtIHJlc29sdmVkQmVnaW47XG4gIHZhciBzbGljZVNpemU7XG4gIGlmIChyZXNvbHZlZFNpemUgPT09IHJlc29sdmVkU2l6ZSkge1xuICAgIHNsaWNlU2l6ZSA9IHJlc29sdmVkU2l6ZSA8IDAgPyAwIDogcmVzb2x2ZWRTaXplO1xuICB9XG5cbiAgdmFyIHNsaWNlU2VxID0gbWFrZVNlcXVlbmNlKGNvbGxlY3Rpb24pO1xuXG4gIC8vIElmIGNvbGxlY3Rpb24uc2l6ZSBpcyB1bmRlZmluZWQsIHRoZSBzaXplIG9mIHRoZSByZWFsaXplZCBzbGljZVNlcSBpc1xuICAvLyB1bmtub3duIGF0IHRoaXMgcG9pbnQgdW5sZXNzIHRoZSBudW1iZXIgb2YgaXRlbXMgdG8gc2xpY2UgaXMgMFxuICBzbGljZVNlcS5zaXplID1cbiAgICBzbGljZVNpemUgPT09IDAgPyBzbGljZVNpemUgOiAoY29sbGVjdGlvbi5zaXplICYmIHNsaWNlU2l6ZSkgfHwgdW5kZWZpbmVkO1xuXG4gIGlmICghdXNlS2V5cyAmJiBpc1NlcShjb2xsZWN0aW9uKSAmJiBzbGljZVNpemUgPj0gMCkge1xuICAgIHNsaWNlU2VxLmdldCA9IGZ1bmN0aW9uKGluZGV4LCBub3RTZXRWYWx1ZSkge1xuICAgICAgaW5kZXggPSB3cmFwSW5kZXgodGhpcywgaW5kZXgpO1xuICAgICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPCBzbGljZVNpemVcbiAgICAgICAgPyBjb2xsZWN0aW9uLmdldChpbmRleCArIHJlc29sdmVkQmVnaW4sIG5vdFNldFZhbHVlKVxuICAgICAgICA6IG5vdFNldFZhbHVlO1xuICAgIH07XG4gIH1cblxuICBzbGljZVNlcS5fX2l0ZXJhdGVVbmNhY2hlZCA9IGZ1bmN0aW9uKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICBpZiAoc2xpY2VTaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVzdWx0KCkuX19pdGVyYXRlKGZuLCByZXZlcnNlKTtcbiAgICB9XG4gICAgdmFyIHNraXBwZWQgPSAwO1xuICAgIHZhciBpc1NraXBwaW5nID0gdHJ1ZTtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgY29sbGVjdGlvbi5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGspIHtcbiAgICAgIGlmICghKGlzU2tpcHBpbmcgJiYgKGlzU2tpcHBpbmcgPSBza2lwcGVkKysgPCByZXNvbHZlZEJlZ2luKSkpIHtcbiAgICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIGZuKHYsIHVzZUtleXMgPyBrIDogaXRlcmF0aW9ucyAtIDEsIHRoaXMkMSkgIT09IGZhbHNlICYmXG4gICAgICAgICAgaXRlcmF0aW9ucyAhPT0gc2xpY2VTaXplXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG5cbiAgc2xpY2VTZXEuX19pdGVyYXRvclVuY2FjaGVkID0gZnVuY3Rpb24odHlwZSwgcmV2ZXJzZSkge1xuICAgIGlmIChzbGljZVNpemUgIT09IDAgJiYgcmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgaW5zdGFudGlhdGluZyBwYXJlbnQgaXRlcmF0b3IgaWYgdGFraW5nIDAuXG4gICAgaWYgKHNsaWNlU2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIG5ldyBJdGVyYXRvcihpdGVyYXRvckRvbmUpO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0b3IgPSBjb2xsZWN0aW9uLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gICAgdmFyIHNraXBwZWQgPSAwO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHdoaWxlIChza2lwcGVkKysgPCByZXNvbHZlZEJlZ2luKSB7XG4gICAgICAgIGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIH1cbiAgICAgIGlmICgrK2l0ZXJhdGlvbnMgPiBzbGljZVNpemUpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yRG9uZSgpO1xuICAgICAgfVxuICAgICAgdmFyIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICBpZiAodXNlS2V5cyB8fCB0eXBlID09PSBJVEVSQVRFX1ZBTFVFUyB8fCBzdGVwLmRvbmUpIHtcbiAgICAgICAgcmV0dXJuIHN0ZXA7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSA9PT0gSVRFUkFURV9LRVlTKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKHR5cGUsIGl0ZXJhdGlvbnMgLSAxLCB1bmRlZmluZWQsIHN0ZXApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgaXRlcmF0aW9ucyAtIDEsIHN0ZXAudmFsdWVbMV0sIHN0ZXApO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBzbGljZVNlcTtcbn1cblxuZnVuY3Rpb24gdGFrZVdoaWxlRmFjdG9yeShjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgdmFyIHRha2VTZXF1ZW5jZSA9IG1ha2VTZXF1ZW5jZShjb2xsZWN0aW9uKTtcbiAgdGFrZVNlcXVlbmNlLl9faXRlcmF0ZVVuY2FjaGVkID0gZnVuY3Rpb24oZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVJlc3VsdCgpLl9faXRlcmF0ZShmbiwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICBjb2xsZWN0aW9uLl9faXRlcmF0ZShcbiAgICAgIGZ1bmN0aW9uICh2LCBrLCBjKSB7IHJldHVybiBwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2LCBrLCBjKSAmJiArK2l0ZXJhdGlvbnMgJiYgZm4odiwgaywgdGhpcyQxKTsgfVxuICAgICk7XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG4gIHRha2VTZXF1ZW5jZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbih0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0b3IgPSBjb2xsZWN0aW9uLl9faXRlcmF0b3IoSVRFUkFURV9FTlRSSUVTLCByZXZlcnNlKTtcbiAgICB2YXIgaXRlcmF0aW5nID0gdHJ1ZTtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghaXRlcmF0aW5nKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgaWYgKHN0ZXAuZG9uZSkge1xuICAgICAgICByZXR1cm4gc3RlcDtcbiAgICAgIH1cbiAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICB2YXIgayA9IGVudHJ5WzBdO1xuICAgICAgdmFyIHYgPSBlbnRyeVsxXTtcbiAgICAgIGlmICghcHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwgaywgdGhpcyQxKSkge1xuICAgICAgICBpdGVyYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yRG9uZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHR5cGUgPT09IElURVJBVEVfRU5UUklFUyA/IHN0ZXAgOiBpdGVyYXRvclZhbHVlKHR5cGUsIGssIHYsIHN0ZXApO1xuICAgIH0pO1xuICB9O1xuICByZXR1cm4gdGFrZVNlcXVlbmNlO1xufVxuXG5mdW5jdGlvbiBza2lwV2hpbGVGYWN0b3J5KGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgY29udGV4dCwgdXNlS2V5cykge1xuICB2YXIgc2tpcFNlcXVlbmNlID0gbWFrZVNlcXVlbmNlKGNvbGxlY3Rpb24pO1xuICBza2lwU2VxdWVuY2UuX19pdGVyYXRlVW5jYWNoZWQgPSBmdW5jdGlvbihmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVzdWx0KCkuX19pdGVyYXRlKGZuLCByZXZlcnNlKTtcbiAgICB9XG4gICAgdmFyIGlzU2tpcHBpbmcgPSB0cnVlO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICBjb2xsZWN0aW9uLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaywgYykge1xuICAgICAgaWYgKCEoaXNTa2lwcGluZyAmJiAoaXNTa2lwcGluZyA9IHByZWRpY2F0ZS5jYWxsKGNvbnRleHQsIHYsIGssIGMpKSkpIHtcbiAgICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgICByZXR1cm4gZm4odiwgdXNlS2V5cyA/IGsgOiBpdGVyYXRpb25zIC0gMSwgdGhpcyQxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0aW9ucztcbiAgfTtcbiAgc2tpcFNlcXVlbmNlLl9faXRlcmF0b3JVbmNhY2hlZCA9IGZ1bmN0aW9uKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVJlc3VsdCgpLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIHZhciBpdGVyYXRvciA9IGNvbGxlY3Rpb24uX19pdGVyYXRvcihJVEVSQVRFX0VOVFJJRVMsIHJldmVyc2UpO1xuICAgIHZhciBza2lwcGluZyA9IHRydWU7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICB2YXIgaztcbiAgICAgIHZhciB2O1xuICAgICAgZG8ge1xuICAgICAgICBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICBpZiAoc3RlcC5kb25lKSB7XG4gICAgICAgICAgaWYgKHVzZUtleXMgfHwgdHlwZSA9PT0gSVRFUkFURV9WQUxVRVMpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGVwO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZSA9PT0gSVRFUkFURV9LRVlTKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCBpdGVyYXRpb25zKyssIHVuZGVmaW5lZCwgc3RlcCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKHR5cGUsIGl0ZXJhdGlvbnMrKywgc3RlcC52YWx1ZVsxXSwgc3RlcCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgayA9IGVudHJ5WzBdO1xuICAgICAgICB2ID0gZW50cnlbMV07XG4gICAgICAgIHNraXBwaW5nICYmIChza2lwcGluZyA9IHByZWRpY2F0ZS5jYWxsKGNvbnRleHQsIHYsIGssIHRoaXMkMSkpO1xuICAgICAgfSB3aGlsZSAoc2tpcHBpbmcpO1xuICAgICAgcmV0dXJuIHR5cGUgPT09IElURVJBVEVfRU5UUklFUyA/IHN0ZXAgOiBpdGVyYXRvclZhbHVlKHR5cGUsIGssIHYsIHN0ZXApO1xuICAgIH0pO1xuICB9O1xuICByZXR1cm4gc2tpcFNlcXVlbmNlO1xufVxuXG5mdW5jdGlvbiBjb25jYXRGYWN0b3J5KGNvbGxlY3Rpb24sIHZhbHVlcykge1xuICB2YXIgaXNLZXllZENvbGxlY3Rpb24gPSBpc0tleWVkKGNvbGxlY3Rpb24pO1xuICB2YXIgaXRlcnMgPSBbY29sbGVjdGlvbl1cbiAgICAuY29uY2F0KHZhbHVlcylcbiAgICAubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgICBpZiAoIWlzQ29sbGVjdGlvbih2KSkge1xuICAgICAgICB2ID0gaXNLZXllZENvbGxlY3Rpb25cbiAgICAgICAgICA/IGtleWVkU2VxRnJvbVZhbHVlKHYpXG4gICAgICAgICAgOiBpbmRleGVkU2VxRnJvbVZhbHVlKEFycmF5LmlzQXJyYXkodikgPyB2IDogW3ZdKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNLZXllZENvbGxlY3Rpb24pIHtcbiAgICAgICAgdiA9IEtleWVkQ29sbGVjdGlvbih2KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2O1xuICAgIH0pXG4gICAgLmZpbHRlcihmdW5jdGlvbiAodikgeyByZXR1cm4gdi5zaXplICE9PSAwOyB9KTtcblxuICBpZiAoaXRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH1cblxuICBpZiAoaXRlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIHNpbmdsZXRvbiA9IGl0ZXJzWzBdO1xuICAgIGlmIChcbiAgICAgIHNpbmdsZXRvbiA9PT0gY29sbGVjdGlvbiB8fFxuICAgICAgKGlzS2V5ZWRDb2xsZWN0aW9uICYmIGlzS2V5ZWQoc2luZ2xldG9uKSkgfHxcbiAgICAgIChpc0luZGV4ZWQoY29sbGVjdGlvbikgJiYgaXNJbmRleGVkKHNpbmdsZXRvbikpXG4gICAgKSB7XG4gICAgICByZXR1cm4gc2luZ2xldG9uO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb25jYXRTZXEgPSBuZXcgQXJyYXlTZXEoaXRlcnMpO1xuICBpZiAoaXNLZXllZENvbGxlY3Rpb24pIHtcbiAgICBjb25jYXRTZXEgPSBjb25jYXRTZXEudG9LZXllZFNlcSgpO1xuICB9IGVsc2UgaWYgKCFpc0luZGV4ZWQoY29sbGVjdGlvbikpIHtcbiAgICBjb25jYXRTZXEgPSBjb25jYXRTZXEudG9TZXRTZXEoKTtcbiAgfVxuICBjb25jYXRTZXEgPSBjb25jYXRTZXEuZmxhdHRlbih0cnVlKTtcbiAgY29uY2F0U2VxLnNpemUgPSBpdGVycy5yZWR1Y2UoZnVuY3Rpb24gKHN1bSwgc2VxKSB7XG4gICAgaWYgKHN1bSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgc2l6ZSA9IHNlcS5zaXplO1xuICAgICAgaWYgKHNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gc3VtICsgc2l6ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIDApO1xuICByZXR1cm4gY29uY2F0U2VxO1xufVxuXG5mdW5jdGlvbiBmbGF0dGVuRmFjdG9yeShjb2xsZWN0aW9uLCBkZXB0aCwgdXNlS2V5cykge1xuICB2YXIgZmxhdFNlcXVlbmNlID0gbWFrZVNlcXVlbmNlKGNvbGxlY3Rpb24pO1xuICBmbGF0U2VxdWVuY2UuX19pdGVyYXRlVW5jYWNoZWQgPSBmdW5jdGlvbihmbiwgcmV2ZXJzZSkge1xuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVJlc3VsdCgpLl9faXRlcmF0ZShmbiwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB2YXIgc3RvcHBlZCA9IGZhbHNlO1xuICAgIGZ1bmN0aW9uIGZsYXREZWVwKGl0ZXIsIGN1cnJlbnREZXB0aCkge1xuICAgICAgaXRlci5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGspIHtcbiAgICAgICAgaWYgKCghZGVwdGggfHwgY3VycmVudERlcHRoIDwgZGVwdGgpICYmIGlzQ29sbGVjdGlvbih2KSkge1xuICAgICAgICAgIGZsYXREZWVwKHYsIGN1cnJlbnREZXB0aCArIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZXJhdGlvbnMrKztcbiAgICAgICAgICBpZiAoZm4odiwgdXNlS2V5cyA/IGsgOiBpdGVyYXRpb25zIC0gMSwgZmxhdFNlcXVlbmNlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHN0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gIXN0b3BwZWQ7XG4gICAgICB9LCByZXZlcnNlKTtcbiAgICB9XG4gICAgZmxhdERlZXAoY29sbGVjdGlvbiwgMCk7XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG4gIGZsYXRTZXF1ZW5jZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbih0eXBlLCByZXZlcnNlKSB7XG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVzdWx0KCkuX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgICB9XG4gICAgdmFyIGl0ZXJhdG9yID0gY29sbGVjdGlvbi5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgIHZhciBzdGFjayA9IFtdO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHdoaWxlIChpdGVyYXRvcikge1xuICAgICAgICB2YXIgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgaWYgKHN0ZXAuZG9uZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBpdGVyYXRvciA9IHN0YWNrLnBvcCgpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgaWYgKHR5cGUgPT09IElURVJBVEVfRU5UUklFUykge1xuICAgICAgICAgIHYgPSB2WzFdO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoIWRlcHRoIHx8IHN0YWNrLmxlbmd0aCA8IGRlcHRoKSAmJiBpc0NvbGxlY3Rpb24odikpIHtcbiAgICAgICAgICBzdGFjay5wdXNoKGl0ZXJhdG9yKTtcbiAgICAgICAgICBpdGVyYXRvciA9IHYuX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdXNlS2V5cyA/IHN0ZXAgOiBpdGVyYXRvclZhbHVlKHR5cGUsIGl0ZXJhdGlvbnMrKywgdiwgc3RlcCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIGZsYXRTZXF1ZW5jZTtcbn1cblxuZnVuY3Rpb24gZmxhdE1hcEZhY3RvcnkoY29sbGVjdGlvbiwgbWFwcGVyLCBjb250ZXh0KSB7XG4gIHZhciBjb2VyY2UgPSBjb2xsZWN0aW9uQ2xhc3MoY29sbGVjdGlvbik7XG4gIHJldHVybiBjb2xsZWN0aW9uXG4gICAgLnRvU2VxKClcbiAgICAubWFwKGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBjb2VyY2UobWFwcGVyLmNhbGwoY29udGV4dCwgdiwgaywgY29sbGVjdGlvbikpOyB9KVxuICAgIC5mbGF0dGVuKHRydWUpO1xufVxuXG5mdW5jdGlvbiBpbnRlcnBvc2VGYWN0b3J5KGNvbGxlY3Rpb24sIHNlcGFyYXRvcikge1xuICB2YXIgaW50ZXJwb3NlZFNlcXVlbmNlID0gbWFrZVNlcXVlbmNlKGNvbGxlY3Rpb24pO1xuICBpbnRlcnBvc2VkU2VxdWVuY2Uuc2l6ZSA9IGNvbGxlY3Rpb24uc2l6ZSAmJiBjb2xsZWN0aW9uLnNpemUgKiAyIC0gMTtcbiAgaW50ZXJwb3NlZFNlcXVlbmNlLl9faXRlcmF0ZVVuY2FjaGVkID0gZnVuY3Rpb24oZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICBjb2xsZWN0aW9uLl9faXRlcmF0ZShcbiAgICAgIGZ1bmN0aW9uICh2KSB7IHJldHVybiAoIWl0ZXJhdGlvbnMgfHwgZm4oc2VwYXJhdG9yLCBpdGVyYXRpb25zKyssIHRoaXMkMSkgIT09IGZhbHNlKSAmJlxuICAgICAgICBmbih2LCBpdGVyYXRpb25zKyssIHRoaXMkMSkgIT09IGZhbHNlOyB9LFxuICAgICAgcmV2ZXJzZVxuICAgICk7XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG4gIGludGVycG9zZWRTZXF1ZW5jZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbih0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0gY29sbGVjdGlvbi5fX2l0ZXJhdG9yKElURVJBVEVfVkFMVUVTLCByZXZlcnNlKTtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgdmFyIHN0ZXA7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXN0ZXAgfHwgaXRlcmF0aW9ucyAlIDIpIHtcbiAgICAgICAgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgaWYgKHN0ZXAuZG9uZSkge1xuICAgICAgICAgIHJldHVybiBzdGVwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlcmF0aW9ucyAlIDJcbiAgICAgICAgPyBpdGVyYXRvclZhbHVlKHR5cGUsIGl0ZXJhdGlvbnMrKywgc2VwYXJhdG9yKVxuICAgICAgICA6IGl0ZXJhdG9yVmFsdWUodHlwZSwgaXRlcmF0aW9ucysrLCBzdGVwLnZhbHVlLCBzdGVwKTtcbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIGludGVycG9zZWRTZXF1ZW5jZTtcbn1cblxuZnVuY3Rpb24gc29ydEZhY3RvcnkoY29sbGVjdGlvbiwgY29tcGFyYXRvciwgbWFwcGVyKSB7XG4gIGlmICghY29tcGFyYXRvcikge1xuICAgIGNvbXBhcmF0b3IgPSBkZWZhdWx0Q29tcGFyYXRvcjtcbiAgfVxuICB2YXIgaXNLZXllZENvbGxlY3Rpb24gPSBpc0tleWVkKGNvbGxlY3Rpb24pO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgZW50cmllcyA9IGNvbGxlY3Rpb25cbiAgICAudG9TZXEoKVxuICAgIC5tYXAoZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIFtrLCB2LCBpbmRleCsrLCBtYXBwZXIgPyBtYXBwZXIodiwgaywgY29sbGVjdGlvbikgOiB2XTsgfSlcbiAgICAudmFsdWVTZXEoKVxuICAgIC50b0FycmF5KCk7XG4gIGVudHJpZXMuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gY29tcGFyYXRvcihhWzNdLCBiWzNdKSB8fCBhWzJdIC0gYlsyXTsgfSkuZm9yRWFjaChcbiAgICBpc0tleWVkQ29sbGVjdGlvblxuICAgICAgPyBmdW5jdGlvbiAodiwgaSkge1xuICAgICAgICAgIGVudHJpZXNbaV0ubGVuZ3RoID0gMjtcbiAgICAgICAgfVxuICAgICAgOiBmdW5jdGlvbiAodiwgaSkge1xuICAgICAgICAgIGVudHJpZXNbaV0gPSB2WzFdO1xuICAgICAgICB9XG4gICk7XG4gIHJldHVybiBpc0tleWVkQ29sbGVjdGlvblxuICAgID8gS2V5ZWRTZXEoZW50cmllcylcbiAgICA6IGlzSW5kZXhlZChjb2xsZWN0aW9uKVxuICAgICAgPyBJbmRleGVkU2VxKGVudHJpZXMpXG4gICAgICA6IFNldFNlcShlbnRyaWVzKTtcbn1cblxuZnVuY3Rpb24gbWF4RmFjdG9yeShjb2xsZWN0aW9uLCBjb21wYXJhdG9yLCBtYXBwZXIpIHtcbiAgaWYgKCFjb21wYXJhdG9yKSB7XG4gICAgY29tcGFyYXRvciA9IGRlZmF1bHRDb21wYXJhdG9yO1xuICB9XG4gIGlmIChtYXBwZXIpIHtcbiAgICB2YXIgZW50cnkgPSBjb2xsZWN0aW9uXG4gICAgICAudG9TZXEoKVxuICAgICAgLm1hcChmdW5jdGlvbiAodiwgaykgeyByZXR1cm4gW3YsIG1hcHBlcih2LCBrLCBjb2xsZWN0aW9uKV07IH0pXG4gICAgICAucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiAobWF4Q29tcGFyZShjb21wYXJhdG9yLCBhWzFdLCBiWzFdKSA/IGIgOiBhKTsgfSk7XG4gICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5WzBdO1xuICB9XG4gIHJldHVybiBjb2xsZWN0aW9uLnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gKG1heENvbXBhcmUoY29tcGFyYXRvciwgYSwgYikgPyBiIDogYSk7IH0pO1xufVxuXG5mdW5jdGlvbiBtYXhDb21wYXJlKGNvbXBhcmF0b3IsIGEsIGIpIHtcbiAgdmFyIGNvbXAgPSBjb21wYXJhdG9yKGIsIGEpO1xuICAvLyBiIGlzIGNvbnNpZGVyZWQgdGhlIG5ldyBtYXggaWYgdGhlIGNvbXBhcmF0b3IgZGVjbGFyZXMgdGhlbSBlcXVhbCwgYnV0XG4gIC8vIHRoZXkgYXJlIG5vdCBlcXVhbCBhbmQgYiBpcyBpbiBmYWN0IGEgbnVsbGlzaCB2YWx1ZS5cbiAgcmV0dXJuIChcbiAgICAoY29tcCA9PT0gMCAmJiBiICE9PSBhICYmIChiID09PSB1bmRlZmluZWQgfHwgYiA9PT0gbnVsbCB8fCBiICE9PSBiKSkgfHxcbiAgICBjb21wID4gMFxuICApO1xufVxuXG5mdW5jdGlvbiB6aXBXaXRoRmFjdG9yeShrZXlJdGVyLCB6aXBwZXIsIGl0ZXJzLCB6aXBBbGwpIHtcbiAgdmFyIHppcFNlcXVlbmNlID0gbWFrZVNlcXVlbmNlKGtleUl0ZXIpO1xuICB2YXIgc2l6ZXMgPSBuZXcgQXJyYXlTZXEoaXRlcnMpLm1hcChmdW5jdGlvbiAoaSkgeyByZXR1cm4gaS5zaXplOyB9KTtcbiAgemlwU2VxdWVuY2Uuc2l6ZSA9IHppcEFsbCA/IHNpemVzLm1heCgpIDogc2l6ZXMubWluKCk7XG4gIC8vIE5vdGU6IHRoaXMgYSBnZW5lcmljIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgX19pdGVyYXRlIGluIHRlcm1zIG9mXG4gIC8vIF9faXRlcmF0b3Igd2hpY2ggbWF5IGJlIG1vcmUgZ2VuZXJpY2FsbHkgdXNlZnVsIGluIHRoZSBmdXR1cmUuXG4gIHppcFNlcXVlbmNlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uKGZuLCByZXZlcnNlKSB7XG4gICAgLyogZ2VuZXJpYzpcbiAgICB2YXIgaXRlcmF0b3IgPSB0aGlzLl9faXRlcmF0b3IoSVRFUkFURV9FTlRSSUVTLCByZXZlcnNlKTtcbiAgICB2YXIgc3RlcDtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgaWYgKGZuKHN0ZXAudmFsdWVbMV0sIHN0ZXAudmFsdWVbMF0sIHRoaXMpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gICAgKi9cbiAgICAvLyBpbmRleGVkOlxuICAgIHZhciBpdGVyYXRvciA9IHRoaXMuX19pdGVyYXRvcihJVEVSQVRFX1ZBTFVFUywgcmV2ZXJzZSk7XG4gICAgdmFyIHN0ZXA7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgIGlmIChmbihzdGVwLnZhbHVlLCBpdGVyYXRpb25zKyssIHRoaXMpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG4gIHppcFNlcXVlbmNlLl9faXRlcmF0b3JVbmNhY2hlZCA9IGZ1bmN0aW9uKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgaXRlcmF0b3JzID0gaXRlcnMubWFwKFxuICAgICAgZnVuY3Rpb24gKGkpIHsgcmV0dXJuICgoaSA9IENvbGxlY3Rpb24oaSkpLCBnZXRJdGVyYXRvcihyZXZlcnNlID8gaS5yZXZlcnNlKCkgOiBpKSk7IH1cbiAgICApO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB2YXIgaXNEb25lID0gZmFsc2U7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RlcHM7XG4gICAgICBpZiAoIWlzRG9uZSkge1xuICAgICAgICBzdGVwcyA9IGl0ZXJhdG9ycy5tYXAoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGkubmV4dCgpOyB9KTtcbiAgICAgICAgaXNEb25lID0gemlwQWxsID8gc3RlcHMuZXZlcnkoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMuZG9uZTsgfSkgOiBzdGVwcy5zb21lKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLmRvbmU7IH0pO1xuICAgICAgfVxuICAgICAgaWYgKGlzRG9uZSkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZShcbiAgICAgICAgdHlwZSxcbiAgICAgICAgaXRlcmF0aW9ucysrLFxuICAgICAgICB6aXBwZXIuYXBwbHkobnVsbCwgc3RlcHMubWFwKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLnZhbHVlOyB9KSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiB6aXBTZXF1ZW5jZTtcbn1cblxuLy8gI3ByYWdtYSBIZWxwZXIgRnVuY3Rpb25zXG5cbmZ1bmN0aW9uIHJlaWZ5KGl0ZXIsIHNlcSkge1xuICByZXR1cm4gaXRlciA9PT0gc2VxID8gaXRlciA6IGlzU2VxKGl0ZXIpID8gc2VxIDogaXRlci5jb25zdHJ1Y3RvcihzZXEpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUVudHJ5KGVudHJ5KSB7XG4gIGlmIChlbnRyeSAhPT0gT2JqZWN0KGVudHJ5KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFtLLCBWXSB0dXBsZTogJyArIGVudHJ5KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb2xsZWN0aW9uQ2xhc3MoY29sbGVjdGlvbikge1xuICByZXR1cm4gaXNLZXllZChjb2xsZWN0aW9uKVxuICAgID8gS2V5ZWRDb2xsZWN0aW9uXG4gICAgOiBpc0luZGV4ZWQoY29sbGVjdGlvbilcbiAgICAgID8gSW5kZXhlZENvbGxlY3Rpb25cbiAgICAgIDogU2V0Q29sbGVjdGlvbjtcbn1cblxuZnVuY3Rpb24gbWFrZVNlcXVlbmNlKGNvbGxlY3Rpb24pIHtcbiAgcmV0dXJuIE9iamVjdC5jcmVhdGUoXG4gICAgKGlzS2V5ZWQoY29sbGVjdGlvbilcbiAgICAgID8gS2V5ZWRTZXFcbiAgICAgIDogaXNJbmRleGVkKGNvbGxlY3Rpb24pXG4gICAgICAgID8gSW5kZXhlZFNlcVxuICAgICAgICA6IFNldFNlcVxuICAgICkucHJvdG90eXBlXG4gICk7XG59XG5cbmZ1bmN0aW9uIGNhY2hlUmVzdWx0VGhyb3VnaCgpIHtcbiAgaWYgKHRoaXMuX2l0ZXIuY2FjaGVSZXN1bHQpIHtcbiAgICB0aGlzLl9pdGVyLmNhY2hlUmVzdWx0KCk7XG4gICAgdGhpcy5zaXplID0gdGhpcy5faXRlci5zaXplO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHJldHVybiBTZXEucHJvdG90eXBlLmNhY2hlUmVzdWx0LmNhbGwodGhpcyk7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJhdG9yKGEsIGIpIHtcbiAgaWYgKGEgPT09IHVuZGVmaW5lZCAmJiBiID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmIChhID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICByZXR1cm4gYSA+IGIgPyAxIDogYSA8IGIgPyAtMSA6IDA7XG59XG5cbi8vIGh0dHA6Ly9qc3BlcmYuY29tL2NvcHktYXJyYXktaW5saW5lXG5mdW5jdGlvbiBhcnJDb3B5KGFyciwgb2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuICB2YXIgbGVuID0gTWF0aC5tYXgoMCwgYXJyLmxlbmd0aCAtIG9mZnNldCk7XG4gIHZhciBuZXdBcnIgPSBuZXcgQXJyYXkobGVuKTtcbiAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGxlbjsgaWkrKykge1xuICAgIG5ld0FycltpaV0gPSBhcnJbaWkgKyBvZmZzZXRdO1xuICB9XG4gIHJldHVybiBuZXdBcnI7XG59XG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGVycm9yKSB7XG4gIGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihlcnJvcik7IH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0Tm90SW5maW5pdGUoc2l6ZSkge1xuICBpbnZhcmlhbnQoXG4gICAgc2l6ZSAhPT0gSW5maW5pdHksXG4gICAgJ0Nhbm5vdCBwZXJmb3JtIHRoaXMgYWN0aW9uIHdpdGggYW4gaW5maW5pdGUgc2l6ZS4nXG4gICk7XG59XG5cbmZ1bmN0aW9uIGNvZXJjZUtleVBhdGgoa2V5UGF0aCkge1xuICBpZiAoaXNBcnJheUxpa2Uoa2V5UGF0aCkgJiYgdHlwZW9mIGtleVBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGtleVBhdGg7XG4gIH1cbiAgaWYgKGlzT3JkZXJlZChrZXlQYXRoKSkge1xuICAgIHJldHVybiBrZXlQYXRoLnRvQXJyYXkoKTtcbiAgfVxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdJbnZhbGlkIGtleVBhdGg6IGV4cGVjdGVkIE9yZGVyZWQgQ29sbGVjdGlvbiBvciBBcnJheTogJyArIGtleVBhdGhcbiAgKTtcbn1cblxuZnVuY3Rpb24gaXNQbGFpbk9iaih2YWx1ZSkge1xuICByZXR1cm4gKFxuICAgIHZhbHVlICYmXG4gICAgKHR5cGVvZiB2YWx1ZS5jb25zdHJ1Y3RvciAhPT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgdmFsdWUuY29uc3RydWN0b3IubmFtZSA9PT0gJ09iamVjdCcpXG4gICk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHBvdGVudGlhbGx5LXBlcnNpc3RlbnQgZGF0YSBzdHJ1Y3R1cmUsIGVpdGhlclxuICogcHJvdmlkZWQgYnkgSW1tdXRhYmxlLmpzIG9yIGEgcGxhaW4gQXJyYXkgb3IgT2JqZWN0LlxuICovXG5mdW5jdGlvbiBpc0RhdGFTdHJ1Y3R1cmUodmFsdWUpIHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG4gICAgKGlzSW1tdXRhYmxlKHZhbHVlKSB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSB8fCBpc1BsYWluT2JqKHZhbHVlKSlcbiAgKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIHZhbHVlIHRvIGEgc3RyaW5nLCBhZGRpbmcgcXVvdGVzIGlmIGEgc3RyaW5nIHdhcyBwcm92aWRlZC5cbiAqL1xuZnVuY3Rpb24gcXVvdGVTdHJpbmcodmFsdWUpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6IFN0cmluZyh2YWx1ZSk7XG4gIH0gY2F0Y2ggKF9pZ25vcmVFcnJvcikge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFzKGNvbGxlY3Rpb24sIGtleSkge1xuICByZXR1cm4gaXNJbW11dGFibGUoY29sbGVjdGlvbilcbiAgICA/IGNvbGxlY3Rpb24uaGFzKGtleSlcbiAgICA6IGlzRGF0YVN0cnVjdHVyZShjb2xsZWN0aW9uKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbGxlY3Rpb24sIGtleSk7XG59XG5cbmZ1bmN0aW9uIGdldChjb2xsZWN0aW9uLCBrZXksIG5vdFNldFZhbHVlKSB7XG4gIHJldHVybiBpc0ltbXV0YWJsZShjb2xsZWN0aW9uKVxuICAgID8gY29sbGVjdGlvbi5nZXQoa2V5LCBub3RTZXRWYWx1ZSlcbiAgICA6ICFoYXMoY29sbGVjdGlvbiwga2V5KVxuICAgICAgPyBub3RTZXRWYWx1ZVxuICAgICAgOiB0eXBlb2YgY29sbGVjdGlvbi5nZXQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBjb2xsZWN0aW9uLmdldChrZXkpXG4gICAgICAgIDogY29sbGVjdGlvbltrZXldO1xufVxuXG5mdW5jdGlvbiBzaGFsbG93Q29weShmcm9tKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGZyb20pKSB7XG4gICAgcmV0dXJuIGFyckNvcHkoZnJvbSk7XG4gIH1cbiAgdmFyIHRvID0ge307XG4gIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoY29sbGVjdGlvbiwga2V5KSB7XG4gIGlmICghaXNEYXRhU3RydWN0dXJlKGNvbGxlY3Rpb24pKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdDYW5ub3QgdXBkYXRlIG5vbi1kYXRhLXN0cnVjdHVyZSB2YWx1ZTogJyArIGNvbGxlY3Rpb25cbiAgICApO1xuICB9XG4gIGlmIChpc0ltbXV0YWJsZShjb2xsZWN0aW9uKSkge1xuICAgIGlmICghY29sbGVjdGlvbi5yZW1vdmUpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICdDYW5ub3QgdXBkYXRlIGltbXV0YWJsZSB2YWx1ZSB3aXRob3V0IC5yZW1vdmUoKSBtZXRob2Q6ICcgKyBjb2xsZWN0aW9uXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbi5yZW1vdmUoa2V5KTtcbiAgfVxuICBpZiAoIWhhc093blByb3BlcnR5LmNhbGwoY29sbGVjdGlvbiwga2V5KSkge1xuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9XG4gIHZhciBjb2xsZWN0aW9uQ29weSA9IHNoYWxsb3dDb3B5KGNvbGxlY3Rpb24pO1xuICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uQ29weSkpIHtcbiAgICBjb2xsZWN0aW9uQ29weS5zcGxpY2Uoa2V5LCAxKTtcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgY29sbGVjdGlvbkNvcHlba2V5XTtcbiAgfVxuICByZXR1cm4gY29sbGVjdGlvbkNvcHk7XG59XG5cbmZ1bmN0aW9uIHNldChjb2xsZWN0aW9uLCBrZXksIHZhbHVlKSB7XG4gIGlmICghaXNEYXRhU3RydWN0dXJlKGNvbGxlY3Rpb24pKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdDYW5ub3QgdXBkYXRlIG5vbi1kYXRhLXN0cnVjdHVyZSB2YWx1ZTogJyArIGNvbGxlY3Rpb25cbiAgICApO1xuICB9XG4gIGlmIChpc0ltbXV0YWJsZShjb2xsZWN0aW9uKSkge1xuICAgIGlmICghY29sbGVjdGlvbi5zZXQpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICdDYW5ub3QgdXBkYXRlIGltbXV0YWJsZSB2YWx1ZSB3aXRob3V0IC5zZXQoKSBtZXRob2Q6ICcgKyBjb2xsZWN0aW9uXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbi5zZXQoa2V5LCB2YWx1ZSk7XG4gIH1cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29sbGVjdGlvbiwga2V5KSAmJiB2YWx1ZSA9PT0gY29sbGVjdGlvbltrZXldKSB7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH1cbiAgdmFyIGNvbGxlY3Rpb25Db3B5ID0gc2hhbGxvd0NvcHkoY29sbGVjdGlvbik7XG4gIGNvbGxlY3Rpb25Db3B5W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIGNvbGxlY3Rpb25Db3B5O1xufVxuXG5mdW5jdGlvbiB1cGRhdGVJbihjb2xsZWN0aW9uLCBrZXlQYXRoLCBub3RTZXRWYWx1ZSwgdXBkYXRlcikge1xuICBpZiAoIXVwZGF0ZXIpIHtcbiAgICB1cGRhdGVyID0gbm90U2V0VmFsdWU7XG4gICAgbm90U2V0VmFsdWUgPSB1bmRlZmluZWQ7XG4gIH1cbiAgdmFyIHVwZGF0ZWRWYWx1ZSA9IHVwZGF0ZUluRGVlcGx5KFxuICAgIGlzSW1tdXRhYmxlKGNvbGxlY3Rpb24pLFxuICAgIGNvbGxlY3Rpb24sXG4gICAgY29lcmNlS2V5UGF0aChrZXlQYXRoKSxcbiAgICAwLFxuICAgIG5vdFNldFZhbHVlLFxuICAgIHVwZGF0ZXJcbiAgKTtcbiAgcmV0dXJuIHVwZGF0ZWRWYWx1ZSA9PT0gTk9UX1NFVCA/IG5vdFNldFZhbHVlIDogdXBkYXRlZFZhbHVlO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVJbkRlZXBseShcbiAgaW5JbW11dGFibGUsXG4gIGV4aXN0aW5nLFxuICBrZXlQYXRoLFxuICBpLFxuICBub3RTZXRWYWx1ZSxcbiAgdXBkYXRlclxuKSB7XG4gIHZhciB3YXNOb3RTZXQgPSBleGlzdGluZyA9PT0gTk9UX1NFVDtcbiAgaWYgKGkgPT09IGtleVBhdGgubGVuZ3RoKSB7XG4gICAgdmFyIGV4aXN0aW5nVmFsdWUgPSB3YXNOb3RTZXQgPyBub3RTZXRWYWx1ZSA6IGV4aXN0aW5nO1xuICAgIHZhciBuZXdWYWx1ZSA9IHVwZGF0ZXIoZXhpc3RpbmdWYWx1ZSk7XG4gICAgcmV0dXJuIG5ld1ZhbHVlID09PSBleGlzdGluZ1ZhbHVlID8gZXhpc3RpbmcgOiBuZXdWYWx1ZTtcbiAgfVxuICBpZiAoIXdhc05vdFNldCAmJiAhaXNEYXRhU3RydWN0dXJlKGV4aXN0aW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnQ2Fubm90IHVwZGF0ZSB3aXRoaW4gbm9uLWRhdGEtc3RydWN0dXJlIHZhbHVlIGluIHBhdGggWycgK1xuICAgICAgICBrZXlQYXRoLnNsaWNlKDAsIGkpLm1hcChxdW90ZVN0cmluZykgK1xuICAgICAgICAnXTogJyArXG4gICAgICAgIGV4aXN0aW5nXG4gICAgKTtcbiAgfVxuICB2YXIga2V5ID0ga2V5UGF0aFtpXTtcbiAgdmFyIG5leHRFeGlzdGluZyA9IHdhc05vdFNldCA/IE5PVF9TRVQgOiBnZXQoZXhpc3RpbmcsIGtleSwgTk9UX1NFVCk7XG4gIHZhciBuZXh0VXBkYXRlZCA9IHVwZGF0ZUluRGVlcGx5KFxuICAgIG5leHRFeGlzdGluZyA9PT0gTk9UX1NFVCA/IGluSW1tdXRhYmxlIDogaXNJbW11dGFibGUobmV4dEV4aXN0aW5nKSxcbiAgICBuZXh0RXhpc3RpbmcsXG4gICAga2V5UGF0aCxcbiAgICBpICsgMSxcbiAgICBub3RTZXRWYWx1ZSxcbiAgICB1cGRhdGVyXG4gICk7XG4gIHJldHVybiBuZXh0VXBkYXRlZCA9PT0gbmV4dEV4aXN0aW5nXG4gICAgPyBleGlzdGluZ1xuICAgIDogbmV4dFVwZGF0ZWQgPT09IE5PVF9TRVRcbiAgICAgID8gcmVtb3ZlKGV4aXN0aW5nLCBrZXkpXG4gICAgICA6IHNldChcbiAgICAgICAgICB3YXNOb3RTZXQgPyAoaW5JbW11dGFibGUgPyBlbXB0eU1hcCgpIDoge30pIDogZXhpc3RpbmcsXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIG5leHRVcGRhdGVkXG4gICAgICAgICk7XG59XG5cbmZ1bmN0aW9uIHNldEluKGNvbGxlY3Rpb24sIGtleVBhdGgsIHZhbHVlKSB7XG4gIHJldHVybiB1cGRhdGVJbihjb2xsZWN0aW9uLCBrZXlQYXRoLCBOT1RfU0VULCBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfSk7XG59XG5cbmZ1bmN0aW9uIHNldEluJDEoa2V5UGF0aCwgdikge1xuICByZXR1cm4gc2V0SW4odGhpcywga2V5UGF0aCwgdik7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUluKGNvbGxlY3Rpb24sIGtleVBhdGgpIHtcbiAgcmV0dXJuIHVwZGF0ZUluKGNvbGxlY3Rpb24sIGtleVBhdGgsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIE5PVF9TRVQ7IH0pO1xufVxuXG5mdW5jdGlvbiBkZWxldGVJbihrZXlQYXRoKSB7XG4gIHJldHVybiByZW1vdmVJbih0aGlzLCBrZXlQYXRoKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKGNvbGxlY3Rpb24sIGtleSwgbm90U2V0VmFsdWUsIHVwZGF0ZXIpIHtcbiAgcmV0dXJuIHVwZGF0ZUluKGNvbGxlY3Rpb24sIFtrZXldLCBub3RTZXRWYWx1ZSwgdXBkYXRlcik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSQxKGtleSwgbm90U2V0VmFsdWUsIHVwZGF0ZXIpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDFcbiAgICA/IGtleSh0aGlzKVxuICAgIDogdXBkYXRlKHRoaXMsIGtleSwgbm90U2V0VmFsdWUsIHVwZGF0ZXIpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVJbiQxKGtleVBhdGgsIG5vdFNldFZhbHVlLCB1cGRhdGVyKSB7XG4gIHJldHVybiB1cGRhdGVJbih0aGlzLCBrZXlQYXRoLCBub3RTZXRWYWx1ZSwgdXBkYXRlcik7XG59XG5cbmZ1bmN0aW9uIG1lcmdlKCkge1xuICB2YXIgaXRlcnMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgd2hpbGUgKCBsZW4tLSApIGl0ZXJzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgcmV0dXJuIG1lcmdlSW50b0tleWVkV2l0aCh0aGlzLCBpdGVycyk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlV2l0aChtZXJnZXIpIHtcbiAgdmFyIGl0ZXJzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICB3aGlsZSAoIGxlbi0tID4gMCApIGl0ZXJzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gIGlmICh0eXBlb2YgbWVyZ2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBtZXJnZXIgZnVuY3Rpb246ICcgKyBtZXJnZXIpO1xuICB9XG4gIHJldHVybiBtZXJnZUludG9LZXllZFdpdGgodGhpcywgaXRlcnMsIG1lcmdlcik7XG59XG5cbmZ1bmN0aW9uIG1lcmdlSW50b0tleWVkV2l0aChjb2xsZWN0aW9uLCBjb2xsZWN0aW9ucywgbWVyZ2VyKSB7XG4gIHZhciBpdGVycyA9IFtdO1xuICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgY29sbGVjdGlvbnMubGVuZ3RoOyBpaSsrKSB7XG4gICAgdmFyIGNvbGxlY3Rpb24kMSA9IEtleWVkQ29sbGVjdGlvbihjb2xsZWN0aW9uc1tpaV0pO1xuICAgIGlmIChjb2xsZWN0aW9uJDEuc2l6ZSAhPT0gMCkge1xuICAgICAgaXRlcnMucHVzaChjb2xsZWN0aW9uJDEpO1xuICAgIH1cbiAgfVxuICBpZiAoaXRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH1cbiAgaWYgKFxuICAgIGNvbGxlY3Rpb24udG9TZXEoKS5zaXplID09PSAwICYmXG4gICAgIWNvbGxlY3Rpb24uX19vd25lcklEICYmXG4gICAgaXRlcnMubGVuZ3RoID09PSAxXG4gICkge1xuICAgIHJldHVybiBjb2xsZWN0aW9uLmNvbnN0cnVjdG9yKGl0ZXJzWzBdKTtcbiAgfVxuICByZXR1cm4gY29sbGVjdGlvbi53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChjb2xsZWN0aW9uKSB7XG4gICAgdmFyIG1lcmdlSW50b0NvbGxlY3Rpb24gPSBtZXJnZXJcbiAgICAgID8gZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICB1cGRhdGUoXG4gICAgICAgICAgICBjb2xsZWN0aW9uLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgTk9UX1NFVCxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChvbGRWYWwpIHsgcmV0dXJuIChvbGRWYWwgPT09IE5PVF9TRVQgPyB2YWx1ZSA6IG1lcmdlcihvbGRWYWwsIHZhbHVlLCBrZXkpKTsgfVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIDogZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICBjb2xsZWN0aW9uLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfTtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgaXRlcnMubGVuZ3RoOyBpaSsrKSB7XG4gICAgICBpdGVyc1tpaV0uZm9yRWFjaChtZXJnZUludG9Db2xsZWN0aW9uKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtZXJnZSQxKGNvbGxlY3Rpb24pIHtcbiAgdmFyIHNvdXJjZXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gIHdoaWxlICggbGVuLS0gPiAwICkgc291cmNlc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICByZXR1cm4gbWVyZ2VXaXRoU291cmNlcyhjb2xsZWN0aW9uLCBzb3VyY2VzKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VXaXRoJDEobWVyZ2VyLCBjb2xsZWN0aW9uKSB7XG4gIHZhciBzb3VyY2VzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICB3aGlsZSAoIGxlbi0tID4gMCApIHNvdXJjZXNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAyIF07XG5cbiAgcmV0dXJuIG1lcmdlV2l0aFNvdXJjZXMoY29sbGVjdGlvbiwgc291cmNlcywgbWVyZ2VyKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VEZWVwKGNvbGxlY3Rpb24pIHtcbiAgdmFyIHNvdXJjZXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gIHdoaWxlICggbGVuLS0gPiAwICkgc291cmNlc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICByZXR1cm4gbWVyZ2VEZWVwV2l0aFNvdXJjZXMoY29sbGVjdGlvbiwgc291cmNlcyk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlRGVlcFdpdGgobWVyZ2VyLCBjb2xsZWN0aW9uKSB7XG4gIHZhciBzb3VyY2VzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICB3aGlsZSAoIGxlbi0tID4gMCApIHNvdXJjZXNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAyIF07XG5cbiAgcmV0dXJuIG1lcmdlRGVlcFdpdGhTb3VyY2VzKGNvbGxlY3Rpb24sIHNvdXJjZXMsIG1lcmdlcik7XG59XG5cbmZ1bmN0aW9uIG1lcmdlRGVlcFdpdGhTb3VyY2VzKGNvbGxlY3Rpb24sIHNvdXJjZXMsIG1lcmdlcikge1xuICByZXR1cm4gbWVyZ2VXaXRoU291cmNlcyhjb2xsZWN0aW9uLCBzb3VyY2VzLCBkZWVwTWVyZ2VyV2l0aChtZXJnZXIpKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VXaXRoU291cmNlcyhjb2xsZWN0aW9uLCBzb3VyY2VzLCBtZXJnZXIpIHtcbiAgaWYgKCFpc0RhdGFTdHJ1Y3R1cmUoY29sbGVjdGlvbikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ0Nhbm5vdCBtZXJnZSBpbnRvIG5vbi1kYXRhLXN0cnVjdHVyZSB2YWx1ZTogJyArIGNvbGxlY3Rpb25cbiAgICApO1xuICB9XG4gIGlmIChpc0ltbXV0YWJsZShjb2xsZWN0aW9uKSkge1xuICAgIHJldHVybiB0eXBlb2YgbWVyZ2VyID09PSAnZnVuY3Rpb24nICYmIGNvbGxlY3Rpb24ubWVyZ2VXaXRoXG4gICAgICA/IGNvbGxlY3Rpb24ubWVyZ2VXaXRoLmFwcGx5KGNvbGxlY3Rpb24sIFsgbWVyZ2VyIF0uY29uY2F0KCBzb3VyY2VzICkpXG4gICAgICA6IGNvbGxlY3Rpb24ubWVyZ2VcbiAgICAgICAgPyBjb2xsZWN0aW9uLm1lcmdlLmFwcGx5KGNvbGxlY3Rpb24sIHNvdXJjZXMpXG4gICAgICAgIDogY29sbGVjdGlvbi5jb25jYXQuYXBwbHkoY29sbGVjdGlvbiwgc291cmNlcyk7XG4gIH1cbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pO1xuICB2YXIgbWVyZ2VkID0gY29sbGVjdGlvbjtcbiAgdmFyIENvbGxlY3Rpb24kJDEgPSBpc0FycmF5ID8gSW5kZXhlZENvbGxlY3Rpb24gOiBLZXllZENvbGxlY3Rpb247XG4gIHZhciBtZXJnZUl0ZW0gPSBpc0FycmF5XG4gICAgPyBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgLy8gQ29weSBvbiB3cml0ZVxuICAgICAgICBpZiAobWVyZ2VkID09PSBjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgbWVyZ2VkID0gc2hhbGxvd0NvcHkobWVyZ2VkKTtcbiAgICAgICAgfVxuICAgICAgICBtZXJnZWQucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgOiBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICB2YXIgaGFzVmFsID0gaGFzT3duUHJvcGVydHkuY2FsbChtZXJnZWQsIGtleSk7XG4gICAgICAgIHZhciBuZXh0VmFsID1cbiAgICAgICAgICBoYXNWYWwgJiYgbWVyZ2VyID8gbWVyZ2VyKG1lcmdlZFtrZXldLCB2YWx1ZSwga2V5KSA6IHZhbHVlO1xuICAgICAgICBpZiAoIWhhc1ZhbCB8fCBuZXh0VmFsICE9PSBtZXJnZWRba2V5XSkge1xuICAgICAgICAgIC8vIENvcHkgb24gd3JpdGVcbiAgICAgICAgICBpZiAobWVyZ2VkID09PSBjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICBtZXJnZWQgPSBzaGFsbG93Q29weShtZXJnZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtZXJnZWRba2V5XSA9IG5leHRWYWw7XG4gICAgICAgIH1cbiAgICAgIH07XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgIENvbGxlY3Rpb24kJDEoc291cmNlc1tpXSkuZm9yRWFjaChtZXJnZUl0ZW0pO1xuICB9XG4gIHJldHVybiBtZXJnZWQ7XG59XG5cbmZ1bmN0aW9uIGRlZXBNZXJnZXJXaXRoKG1lcmdlcikge1xuICBmdW5jdGlvbiBkZWVwTWVyZ2VyKG9sZFZhbHVlLCBuZXdWYWx1ZSwga2V5KSB7XG4gICAgcmV0dXJuIGlzRGF0YVN0cnVjdHVyZShvbGRWYWx1ZSkgJiYgaXNEYXRhU3RydWN0dXJlKG5ld1ZhbHVlKVxuICAgICAgPyBtZXJnZVdpdGhTb3VyY2VzKG9sZFZhbHVlLCBbbmV3VmFsdWVdLCBkZWVwTWVyZ2VyKVxuICAgICAgOiBtZXJnZXJcbiAgICAgICAgPyBtZXJnZXIob2xkVmFsdWUsIG5ld1ZhbHVlLCBrZXkpXG4gICAgICAgIDogbmV3VmFsdWU7XG4gIH1cbiAgcmV0dXJuIGRlZXBNZXJnZXI7XG59XG5cbmZ1bmN0aW9uIG1lcmdlRGVlcCQxKCkge1xuICB2YXIgaXRlcnMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgd2hpbGUgKCBsZW4tLSApIGl0ZXJzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgcmV0dXJuIG1lcmdlRGVlcFdpdGhTb3VyY2VzKHRoaXMsIGl0ZXJzKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VEZWVwV2l0aCQxKG1lcmdlcikge1xuICB2YXIgaXRlcnMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gIHdoaWxlICggbGVuLS0gPiAwICkgaXRlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cbiAgcmV0dXJuIG1lcmdlRGVlcFdpdGhTb3VyY2VzKHRoaXMsIGl0ZXJzLCBtZXJnZXIpO1xufVxuXG5mdW5jdGlvbiBtZXJnZUluKGtleVBhdGgpIHtcbiAgdmFyIGl0ZXJzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICB3aGlsZSAoIGxlbi0tID4gMCApIGl0ZXJzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gIHJldHVybiB1cGRhdGVJbih0aGlzLCBrZXlQYXRoLCBlbXB0eU1hcCgpLCBmdW5jdGlvbiAobSkgeyByZXR1cm4gbWVyZ2VXaXRoU291cmNlcyhtLCBpdGVycyk7IH0pO1xufVxuXG5mdW5jdGlvbiBtZXJnZURlZXBJbihrZXlQYXRoKSB7XG4gIHZhciBpdGVycyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKCBsZW4tLSA+IDAgKSBpdGVyc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICByZXR1cm4gdXBkYXRlSW4odGhpcywga2V5UGF0aCwgZW1wdHlNYXAoKSwgZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG1lcmdlRGVlcFdpdGhTb3VyY2VzKG0sIGl0ZXJzKTsgfVxuICApO1xufVxuXG5mdW5jdGlvbiB3aXRoTXV0YXRpb25zKGZuKSB7XG4gIHZhciBtdXRhYmxlID0gdGhpcy5hc011dGFibGUoKTtcbiAgZm4obXV0YWJsZSk7XG4gIHJldHVybiBtdXRhYmxlLndhc0FsdGVyZWQoKSA/IG11dGFibGUuX19lbnN1cmVPd25lcih0aGlzLl9fb3duZXJJRCkgOiB0aGlzO1xufVxuXG5mdW5jdGlvbiBhc011dGFibGUoKSB7XG4gIHJldHVybiB0aGlzLl9fb3duZXJJRCA/IHRoaXMgOiB0aGlzLl9fZW5zdXJlT3duZXIobmV3IE93bmVySUQoKSk7XG59XG5cbmZ1bmN0aW9uIGFzSW1tdXRhYmxlKCkge1xuICByZXR1cm4gdGhpcy5fX2Vuc3VyZU93bmVyKCk7XG59XG5cbmZ1bmN0aW9uIHdhc0FsdGVyZWQoKSB7XG4gIHJldHVybiB0aGlzLl9fYWx0ZXJlZDtcbn1cblxudmFyIE1hcCA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEtleWVkQ29sbGVjdGlvbiQkMSkge1xuICBmdW5jdGlvbiBNYXAodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbXB0eU1hcCgpXG4gICAgICA6IGlzTWFwKHZhbHVlKSAmJiAhaXNPcmRlcmVkKHZhbHVlKVxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogZW1wdHlNYXAoKS53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgICAgICAgIHZhciBpdGVyID0gS2V5ZWRDb2xsZWN0aW9uJCQxKHZhbHVlKTtcbiAgICAgICAgICAgIGFzc2VydE5vdEluZmluaXRlKGl0ZXIuc2l6ZSk7XG4gICAgICAgICAgICBpdGVyLmZvckVhY2goZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIG1hcC5zZXQoaywgdik7IH0pO1xuICAgICAgICAgIH0pO1xuICB9XG5cbiAgaWYgKCBLZXllZENvbGxlY3Rpb24kJDEgKSBNYXAuX19wcm90b19fID0gS2V5ZWRDb2xsZWN0aW9uJCQxO1xuICBNYXAucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggS2V5ZWRDb2xsZWN0aW9uJCQxICYmIEtleWVkQ29sbGVjdGlvbiQkMS5wcm90b3R5cGUgKTtcbiAgTWFwLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1hcDtcblxuICBNYXAub2YgPSBmdW5jdGlvbiBvZiAoKSB7XG4gICAgdmFyIGtleVZhbHVlcyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICggbGVuLS0gKSBrZXlWYWx1ZXNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgIHJldHVybiBlbXB0eU1hcCgpLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKG1hcCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlWYWx1ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgaWYgKGkgKyAxID49IGtleVZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgdmFsdWUgZm9yIGtleTogJyArIGtleVZhbHVlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgbWFwLnNldChrZXlWYWx1ZXNbaV0sIGtleVZhbHVlc1tpICsgMV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIE1hcC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX190b1N0cmluZygnTWFwIHsnLCAnfScpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgQWNjZXNzXG5cbiAgTWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGssIG5vdFNldFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvb3RcbiAgICAgID8gdGhpcy5fcm9vdC5nZXQoMCwgdW5kZWZpbmVkLCBrLCBub3RTZXRWYWx1ZSlcbiAgICAgIDogbm90U2V0VmFsdWU7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBNb2RpZmljYXRpb25cblxuICBNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldCAoaywgdikge1xuICAgIHJldHVybiB1cGRhdGVNYXAodGhpcywgaywgdik7XG4gIH07XG5cbiAgTWFwLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUgKGspIHtcbiAgICByZXR1cm4gdXBkYXRlTWFwKHRoaXMsIGssIE5PVF9TRVQpO1xuICB9O1xuXG4gIE1hcC5wcm90b3R5cGUuZGVsZXRlQWxsID0gZnVuY3Rpb24gZGVsZXRlQWxsIChrZXlzKSB7XG4gICAgdmFyIGNvbGxlY3Rpb24gPSBDb2xsZWN0aW9uKGtleXMpO1xuXG4gICAgaWYgKGNvbGxlY3Rpb24uc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobWFwKSB7XG4gICAgICBjb2xsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gbWFwLnJlbW92ZShrZXkpOyB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBNYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAodGhpcy5fX293bmVySUQpIHtcbiAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgICB0aGlzLl9yb290ID0gbnVsbDtcbiAgICAgIHRoaXMuX19oYXNoID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fX2FsdGVyZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBlbXB0eU1hcCgpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgQ29tcG9zaXRpb25cblxuICBNYXAucHJvdG90eXBlLnNvcnQgPSBmdW5jdGlvbiBzb3J0IChjb21wYXJhdG9yKSB7XG4gICAgLy8gTGF0ZSBiaW5kaW5nXG4gICAgcmV0dXJuIE9yZGVyZWRNYXAoc29ydEZhY3RvcnkodGhpcywgY29tcGFyYXRvcikpO1xuICB9O1xuXG4gIE1hcC5wcm90b3R5cGUuc29ydEJ5ID0gZnVuY3Rpb24gc29ydEJ5IChtYXBwZXIsIGNvbXBhcmF0b3IpIHtcbiAgICAvLyBMYXRlIGJpbmRpbmdcbiAgICByZXR1cm4gT3JkZXJlZE1hcChzb3J0RmFjdG9yeSh0aGlzLCBjb21wYXJhdG9yLCBtYXBwZXIpKTtcbiAgfTtcblxuICBNYXAucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIG1hcCAobWFwcGVyLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobWFwKSB7XG4gICAgICBtYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICBtYXAuc2V0KGtleSwgbWFwcGVyLmNhbGwoY29udGV4dCwgdmFsdWUsIGtleSwgbWFwKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIE11dGFiaWxpdHlcblxuICBNYXAucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgcmV0dXJuIG5ldyBNYXBJdGVyYXRvcih0aGlzLCB0eXBlLCByZXZlcnNlKTtcbiAgfTtcblxuICBNYXAucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB0aGlzLl9yb290ICYmXG4gICAgICB0aGlzLl9yb290Lml0ZXJhdGUoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgIGl0ZXJhdGlvbnMrKztcbiAgICAgICAgcmV0dXJuIGZuKGVudHJ5WzFdLCBlbnRyeVswXSwgdGhpcyQxKTtcbiAgICAgIH0sIHJldmVyc2UpO1xuICAgIHJldHVybiBpdGVyYXRpb25zO1xuICB9O1xuXG4gIE1hcC5wcm90b3R5cGUuX19lbnN1cmVPd25lciA9IGZ1bmN0aW9uIF9fZW5zdXJlT3duZXIgKG93bmVySUQpIHtcbiAgICBpZiAob3duZXJJRCA9PT0gdGhpcy5fX293bmVySUQpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAoIW93bmVySUQpIHtcbiAgICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGVtcHR5TWFwKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fb3duZXJJRCA9IG93bmVySUQ7XG4gICAgICB0aGlzLl9fYWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBtYWtlTWFwKHRoaXMuc2l6ZSwgdGhpcy5fcm9vdCwgb3duZXJJRCwgdGhpcy5fX2hhc2gpO1xuICB9O1xuXG4gIHJldHVybiBNYXA7XG59KEtleWVkQ29sbGVjdGlvbikpO1xuXG5NYXAuaXNNYXAgPSBpc01hcDtcblxudmFyIE1hcFByb3RvdHlwZSA9IE1hcC5wcm90b3R5cGU7XG5NYXBQcm90b3R5cGVbSVNfTUFQX1NZTUJPTF0gPSB0cnVlO1xuTWFwUHJvdG90eXBlW0RFTEVURV0gPSBNYXBQcm90b3R5cGUucmVtb3ZlO1xuTWFwUHJvdG90eXBlLnJlbW92ZUFsbCA9IE1hcFByb3RvdHlwZS5kZWxldGVBbGw7XG5NYXBQcm90b3R5cGUuc2V0SW4gPSBzZXRJbiQxO1xuTWFwUHJvdG90eXBlLnJlbW92ZUluID0gTWFwUHJvdG90eXBlLmRlbGV0ZUluID0gZGVsZXRlSW47XG5NYXBQcm90b3R5cGUudXBkYXRlID0gdXBkYXRlJDE7XG5NYXBQcm90b3R5cGUudXBkYXRlSW4gPSB1cGRhdGVJbiQxO1xuTWFwUHJvdG90eXBlLm1lcmdlID0gTWFwUHJvdG90eXBlLmNvbmNhdCA9IG1lcmdlO1xuTWFwUHJvdG90eXBlLm1lcmdlV2l0aCA9IG1lcmdlV2l0aDtcbk1hcFByb3RvdHlwZS5tZXJnZURlZXAgPSBtZXJnZURlZXAkMTtcbk1hcFByb3RvdHlwZS5tZXJnZURlZXBXaXRoID0gbWVyZ2VEZWVwV2l0aCQxO1xuTWFwUHJvdG90eXBlLm1lcmdlSW4gPSBtZXJnZUluO1xuTWFwUHJvdG90eXBlLm1lcmdlRGVlcEluID0gbWVyZ2VEZWVwSW47XG5NYXBQcm90b3R5cGUud2l0aE11dGF0aW9ucyA9IHdpdGhNdXRhdGlvbnM7XG5NYXBQcm90b3R5cGUud2FzQWx0ZXJlZCA9IHdhc0FsdGVyZWQ7XG5NYXBQcm90b3R5cGUuYXNJbW11dGFibGUgPSBhc0ltbXV0YWJsZTtcbk1hcFByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IE1hcFByb3RvdHlwZS5hc011dGFibGUgPSBhc011dGFibGU7XG5NYXBQcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGFycikge1xuICByZXR1cm4gcmVzdWx0LnNldChhcnJbMF0sIGFyclsxXSk7XG59O1xuTWFwUHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iai5hc0ltbXV0YWJsZSgpO1xufTtcblxuLy8gI3ByYWdtYSBUcmllIE5vZGVzXG5cbnZhciBBcnJheU1hcE5vZGUgPSBmdW5jdGlvbiBBcnJheU1hcE5vZGUob3duZXJJRCwgZW50cmllcykge1xuICB0aGlzLm93bmVySUQgPSBvd25lcklEO1xuICB0aGlzLmVudHJpZXMgPSBlbnRyaWVzO1xufTtcblxuQXJyYXlNYXBOb2RlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKHNoaWZ0LCBrZXlIYXNoLCBrZXksIG5vdFNldFZhbHVlKSB7XG4gIHZhciBlbnRyaWVzID0gdGhpcy5lbnRyaWVzO1xuICBmb3IgKHZhciBpaSA9IDAsIGxlbiA9IGVudHJpZXMubGVuZ3RoOyBpaSA8IGxlbjsgaWkrKykge1xuICAgIGlmIChpcyhrZXksIGVudHJpZXNbaWldWzBdKSkge1xuICAgICAgcmV0dXJuIGVudHJpZXNbaWldWzFdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm90U2V0VmFsdWU7XG59O1xuXG5BcnJheU1hcE5vZGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAob3duZXJJRCwgc2hpZnQsIGtleUhhc2gsIGtleSwgdmFsdWUsIGRpZENoYW5nZVNpemUsIGRpZEFsdGVyKSB7XG4gIHZhciByZW1vdmVkID0gdmFsdWUgPT09IE5PVF9TRVQ7XG5cbiAgdmFyIGVudHJpZXMgPSB0aGlzLmVudHJpZXM7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gZW50cmllcy5sZW5ndGg7XG4gIGZvciAoOyBpZHggPCBsZW47IGlkeCsrKSB7XG4gICAgaWYgKGlzKGtleSwgZW50cmllc1tpZHhdWzBdKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHZhciBleGlzdHMgPSBpZHggPCBsZW47XG5cbiAgaWYgKGV4aXN0cyA/IGVudHJpZXNbaWR4XVsxXSA9PT0gdmFsdWUgOiByZW1vdmVkKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBTZXRSZWYoZGlkQWx0ZXIpO1xuICAocmVtb3ZlZCB8fCAhZXhpc3RzKSAmJiBTZXRSZWYoZGlkQ2hhbmdlU2l6ZSk7XG5cbiAgaWYgKHJlbW92ZWQgJiYgZW50cmllcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm47IC8vIHVuZGVmaW5lZFxuICB9XG5cbiAgaWYgKCFleGlzdHMgJiYgIXJlbW92ZWQgJiYgZW50cmllcy5sZW5ndGggPj0gTUFYX0FSUkFZX01BUF9TSVpFKSB7XG4gICAgcmV0dXJuIGNyZWF0ZU5vZGVzKG93bmVySUQsIGVudHJpZXMsIGtleSwgdmFsdWUpO1xuICB9XG5cbiAgdmFyIGlzRWRpdGFibGUgPSBvd25lcklEICYmIG93bmVySUQgPT09IHRoaXMub3duZXJJRDtcbiAgdmFyIG5ld0VudHJpZXMgPSBpc0VkaXRhYmxlID8gZW50cmllcyA6IGFyckNvcHkoZW50cmllcyk7XG5cbiAgaWYgKGV4aXN0cykge1xuICAgIGlmIChyZW1vdmVkKSB7XG4gICAgICBpZHggPT09IGxlbiAtIDFcbiAgICAgICAgPyBuZXdFbnRyaWVzLnBvcCgpXG4gICAgICAgIDogKG5ld0VudHJpZXNbaWR4XSA9IG5ld0VudHJpZXMucG9wKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdFbnRyaWVzW2lkeF0gPSBba2V5LCB2YWx1ZV07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG5ld0VudHJpZXMucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9XG5cbiAgaWYgKGlzRWRpdGFibGUpIHtcbiAgICB0aGlzLmVudHJpZXMgPSBuZXdFbnRyaWVzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBBcnJheU1hcE5vZGUob3duZXJJRCwgbmV3RW50cmllcyk7XG59O1xuXG52YXIgQml0bWFwSW5kZXhlZE5vZGUgPSBmdW5jdGlvbiBCaXRtYXBJbmRleGVkTm9kZShvd25lcklELCBiaXRtYXAsIG5vZGVzKSB7XG4gIHRoaXMub3duZXJJRCA9IG93bmVySUQ7XG4gIHRoaXMuYml0bWFwID0gYml0bWFwO1xuICB0aGlzLm5vZGVzID0gbm9kZXM7XG59O1xuXG5CaXRtYXBJbmRleGVkTm9kZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChzaGlmdCwga2V5SGFzaCwga2V5LCBub3RTZXRWYWx1ZSkge1xuICBpZiAoa2V5SGFzaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAga2V5SGFzaCA9IGhhc2goa2V5KTtcbiAgfVxuICB2YXIgYml0ID0gMSA8PCAoKHNoaWZ0ID09PSAwID8ga2V5SGFzaCA6IGtleUhhc2ggPj4+IHNoaWZ0KSAmIE1BU0spO1xuICB2YXIgYml0bWFwID0gdGhpcy5iaXRtYXA7XG4gIHJldHVybiAoYml0bWFwICYgYml0KSA9PT0gMFxuICAgID8gbm90U2V0VmFsdWVcbiAgICA6IHRoaXMubm9kZXNbcG9wQ291bnQoYml0bWFwICYgKGJpdCAtIDEpKV0uZ2V0KFxuICAgICAgICBzaGlmdCArIFNISUZULFxuICAgICAgICBrZXlIYXNoLFxuICAgICAgICBrZXksXG4gICAgICAgIG5vdFNldFZhbHVlXG4gICAgICApO1xufTtcblxuQml0bWFwSW5kZXhlZE5vZGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAob3duZXJJRCwgc2hpZnQsIGtleUhhc2gsIGtleSwgdmFsdWUsIGRpZENoYW5nZVNpemUsIGRpZEFsdGVyKSB7XG4gIGlmIChrZXlIYXNoID09PSB1bmRlZmluZWQpIHtcbiAgICBrZXlIYXNoID0gaGFzaChrZXkpO1xuICB9XG4gIHZhciBrZXlIYXNoRnJhZyA9IChzaGlmdCA9PT0gMCA/IGtleUhhc2ggOiBrZXlIYXNoID4+PiBzaGlmdCkgJiBNQVNLO1xuICB2YXIgYml0ID0gMSA8PCBrZXlIYXNoRnJhZztcbiAgdmFyIGJpdG1hcCA9IHRoaXMuYml0bWFwO1xuICB2YXIgZXhpc3RzID0gKGJpdG1hcCAmIGJpdCkgIT09IDA7XG5cbiAgaWYgKCFleGlzdHMgJiYgdmFsdWUgPT09IE5PVF9TRVQpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHZhciBpZHggPSBwb3BDb3VudChiaXRtYXAgJiAoYml0IC0gMSkpO1xuICB2YXIgbm9kZXMgPSB0aGlzLm5vZGVzO1xuICB2YXIgbm9kZSA9IGV4aXN0cyA/IG5vZGVzW2lkeF0gOiB1bmRlZmluZWQ7XG4gIHZhciBuZXdOb2RlID0gdXBkYXRlTm9kZShcbiAgICBub2RlLFxuICAgIG93bmVySUQsXG4gICAgc2hpZnQgKyBTSElGVCxcbiAgICBrZXlIYXNoLFxuICAgIGtleSxcbiAgICB2YWx1ZSxcbiAgICBkaWRDaGFuZ2VTaXplLFxuICAgIGRpZEFsdGVyXG4gICk7XG5cbiAgaWYgKG5ld05vZGUgPT09IG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmICghZXhpc3RzICYmIG5ld05vZGUgJiYgbm9kZXMubGVuZ3RoID49IE1BWF9CSVRNQVBfSU5ERVhFRF9TSVpFKSB7XG4gICAgcmV0dXJuIGV4cGFuZE5vZGVzKG93bmVySUQsIG5vZGVzLCBiaXRtYXAsIGtleUhhc2hGcmFnLCBuZXdOb2RlKTtcbiAgfVxuXG4gIGlmIChcbiAgICBleGlzdHMgJiZcbiAgICAhbmV3Tm9kZSAmJlxuICAgIG5vZGVzLmxlbmd0aCA9PT0gMiAmJlxuICAgIGlzTGVhZk5vZGUobm9kZXNbaWR4IF4gMV0pXG4gICkge1xuICAgIHJldHVybiBub2Rlc1tpZHggXiAxXTtcbiAgfVxuXG4gIGlmIChleGlzdHMgJiYgbmV3Tm9kZSAmJiBub2Rlcy5sZW5ndGggPT09IDEgJiYgaXNMZWFmTm9kZShuZXdOb2RlKSkge1xuICAgIHJldHVybiBuZXdOb2RlO1xuICB9XG5cbiAgdmFyIGlzRWRpdGFibGUgPSBvd25lcklEICYmIG93bmVySUQgPT09IHRoaXMub3duZXJJRDtcbiAgdmFyIG5ld0JpdG1hcCA9IGV4aXN0cyA/IChuZXdOb2RlID8gYml0bWFwIDogYml0bWFwIF4gYml0KSA6IGJpdG1hcCB8IGJpdDtcbiAgdmFyIG5ld05vZGVzID0gZXhpc3RzXG4gICAgPyBuZXdOb2RlXG4gICAgICA/IHNldEF0KG5vZGVzLCBpZHgsIG5ld05vZGUsIGlzRWRpdGFibGUpXG4gICAgICA6IHNwbGljZU91dChub2RlcywgaWR4LCBpc0VkaXRhYmxlKVxuICAgIDogc3BsaWNlSW4obm9kZXMsIGlkeCwgbmV3Tm9kZSwgaXNFZGl0YWJsZSk7XG5cbiAgaWYgKGlzRWRpdGFibGUpIHtcbiAgICB0aGlzLmJpdG1hcCA9IG5ld0JpdG1hcDtcbiAgICB0aGlzLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gbmV3IEJpdG1hcEluZGV4ZWROb2RlKG93bmVySUQsIG5ld0JpdG1hcCwgbmV3Tm9kZXMpO1xufTtcblxudmFyIEhhc2hBcnJheU1hcE5vZGUgPSBmdW5jdGlvbiBIYXNoQXJyYXlNYXBOb2RlKG93bmVySUQsIGNvdW50LCBub2Rlcykge1xuICB0aGlzLm93bmVySUQgPSBvd25lcklEO1xuICB0aGlzLmNvdW50ID0gY291bnQ7XG4gIHRoaXMubm9kZXMgPSBub2Rlcztcbn07XG5cbkhhc2hBcnJheU1hcE5vZGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoc2hpZnQsIGtleUhhc2gsIGtleSwgbm90U2V0VmFsdWUpIHtcbiAgaWYgKGtleUhhc2ggPT09IHVuZGVmaW5lZCkge1xuICAgIGtleUhhc2ggPSBoYXNoKGtleSk7XG4gIH1cbiAgdmFyIGlkeCA9IChzaGlmdCA9PT0gMCA/IGtleUhhc2ggOiBrZXlIYXNoID4+PiBzaGlmdCkgJiBNQVNLO1xuICB2YXIgbm9kZSA9IHRoaXMubm9kZXNbaWR4XTtcbiAgcmV0dXJuIG5vZGVcbiAgICA/IG5vZGUuZ2V0KHNoaWZ0ICsgU0hJRlQsIGtleUhhc2gsIGtleSwgbm90U2V0VmFsdWUpXG4gICAgOiBub3RTZXRWYWx1ZTtcbn07XG5cbkhhc2hBcnJheU1hcE5vZGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAob3duZXJJRCwgc2hpZnQsIGtleUhhc2gsIGtleSwgdmFsdWUsIGRpZENoYW5nZVNpemUsIGRpZEFsdGVyKSB7XG4gIGlmIChrZXlIYXNoID09PSB1bmRlZmluZWQpIHtcbiAgICBrZXlIYXNoID0gaGFzaChrZXkpO1xuICB9XG4gIHZhciBpZHggPSAoc2hpZnQgPT09IDAgPyBrZXlIYXNoIDoga2V5SGFzaCA+Pj4gc2hpZnQpICYgTUFTSztcbiAgdmFyIHJlbW92ZWQgPSB2YWx1ZSA9PT0gTk9UX1NFVDtcbiAgdmFyIG5vZGVzID0gdGhpcy5ub2RlcztcbiAgdmFyIG5vZGUgPSBub2Rlc1tpZHhdO1xuXG4gIGlmIChyZW1vdmVkICYmICFub2RlKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgbmV3Tm9kZSA9IHVwZGF0ZU5vZGUoXG4gICAgbm9kZSxcbiAgICBvd25lcklELFxuICAgIHNoaWZ0ICsgU0hJRlQsXG4gICAga2V5SGFzaCxcbiAgICBrZXksXG4gICAgdmFsdWUsXG4gICAgZGlkQ2hhbmdlU2l6ZSxcbiAgICBkaWRBbHRlclxuICApO1xuICBpZiAobmV3Tm9kZSA9PT0gbm9kZSkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIG5ld0NvdW50ID0gdGhpcy5jb3VudDtcbiAgaWYgKCFub2RlKSB7XG4gICAgbmV3Q291bnQrKztcbiAgfSBlbHNlIGlmICghbmV3Tm9kZSkge1xuICAgIG5ld0NvdW50LS07XG4gICAgaWYgKG5ld0NvdW50IDwgTUlOX0hBU0hfQVJSQVlfTUFQX1NJWkUpIHtcbiAgICAgIHJldHVybiBwYWNrTm9kZXMob3duZXJJRCwgbm9kZXMsIG5ld0NvdW50LCBpZHgpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpc0VkaXRhYmxlID0gb3duZXJJRCAmJiBvd25lcklEID09PSB0aGlzLm93bmVySUQ7XG4gIHZhciBuZXdOb2RlcyA9IHNldEF0KG5vZGVzLCBpZHgsIG5ld05vZGUsIGlzRWRpdGFibGUpO1xuXG4gIGlmIChpc0VkaXRhYmxlKSB7XG4gICAgdGhpcy5jb3VudCA9IG5ld0NvdW50O1xuICAgIHRoaXMubm9kZXMgPSBuZXdOb2RlcztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiBuZXcgSGFzaEFycmF5TWFwTm9kZShvd25lcklELCBuZXdDb3VudCwgbmV3Tm9kZXMpO1xufTtcblxudmFyIEhhc2hDb2xsaXNpb25Ob2RlID0gZnVuY3Rpb24gSGFzaENvbGxpc2lvbk5vZGUob3duZXJJRCwga2V5SGFzaCwgZW50cmllcykge1xuICB0aGlzLm93bmVySUQgPSBvd25lcklEO1xuICB0aGlzLmtleUhhc2ggPSBrZXlIYXNoO1xuICB0aGlzLmVudHJpZXMgPSBlbnRyaWVzO1xufTtcblxuSGFzaENvbGxpc2lvbk5vZGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoc2hpZnQsIGtleUhhc2gsIGtleSwgbm90U2V0VmFsdWUpIHtcbiAgdmFyIGVudHJpZXMgPSB0aGlzLmVudHJpZXM7XG4gIGZvciAodmFyIGlpID0gMCwgbGVuID0gZW50cmllcy5sZW5ndGg7IGlpIDwgbGVuOyBpaSsrKSB7XG4gICAgaWYgKGlzKGtleSwgZW50cmllc1tpaV1bMF0pKSB7XG4gICAgICByZXR1cm4gZW50cmllc1tpaV1bMV07XG4gICAgfVxuICB9XG4gIHJldHVybiBub3RTZXRWYWx1ZTtcbn07XG5cbkhhc2hDb2xsaXNpb25Ob2RlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKG93bmVySUQsIHNoaWZ0LCBrZXlIYXNoLCBrZXksIHZhbHVlLCBkaWRDaGFuZ2VTaXplLCBkaWRBbHRlcikge1xuICBpZiAoa2V5SGFzaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAga2V5SGFzaCA9IGhhc2goa2V5KTtcbiAgfVxuXG4gIHZhciByZW1vdmVkID0gdmFsdWUgPT09IE5PVF9TRVQ7XG5cbiAgaWYgKGtleUhhc2ggIT09IHRoaXMua2V5SGFzaCkge1xuICAgIGlmIChyZW1vdmVkKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgU2V0UmVmKGRpZEFsdGVyKTtcbiAgICBTZXRSZWYoZGlkQ2hhbmdlU2l6ZSk7XG4gICAgcmV0dXJuIG1lcmdlSW50b05vZGUodGhpcywgb3duZXJJRCwgc2hpZnQsIGtleUhhc2gsIFtrZXksIHZhbHVlXSk7XG4gIH1cblxuICB2YXIgZW50cmllcyA9IHRoaXMuZW50cmllcztcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBlbnRyaWVzLmxlbmd0aDtcbiAgZm9yICg7IGlkeCA8IGxlbjsgaWR4KyspIHtcbiAgICBpZiAoaXMoa2V5LCBlbnRyaWVzW2lkeF1bMF0pKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgdmFyIGV4aXN0cyA9IGlkeCA8IGxlbjtcblxuICBpZiAoZXhpc3RzID8gZW50cmllc1tpZHhdWzFdID09PSB2YWx1ZSA6IHJlbW92ZWQpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIFNldFJlZihkaWRBbHRlcik7XG4gIChyZW1vdmVkIHx8ICFleGlzdHMpICYmIFNldFJlZihkaWRDaGFuZ2VTaXplKTtcblxuICBpZiAocmVtb3ZlZCAmJiBsZW4gPT09IDIpIHtcbiAgICByZXR1cm4gbmV3IFZhbHVlTm9kZShvd25lcklELCB0aGlzLmtleUhhc2gsIGVudHJpZXNbaWR4IF4gMV0pO1xuICB9XG5cbiAgdmFyIGlzRWRpdGFibGUgPSBvd25lcklEICYmIG93bmVySUQgPT09IHRoaXMub3duZXJJRDtcbiAgdmFyIG5ld0VudHJpZXMgPSBpc0VkaXRhYmxlID8gZW50cmllcyA6IGFyckNvcHkoZW50cmllcyk7XG5cbiAgaWYgKGV4aXN0cykge1xuICAgIGlmIChyZW1vdmVkKSB7XG4gICAgICBpZHggPT09IGxlbiAtIDFcbiAgICAgICAgPyBuZXdFbnRyaWVzLnBvcCgpXG4gICAgICAgIDogKG5ld0VudHJpZXNbaWR4XSA9IG5ld0VudHJpZXMucG9wKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdFbnRyaWVzW2lkeF0gPSBba2V5LCB2YWx1ZV07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG5ld0VudHJpZXMucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9XG5cbiAgaWYgKGlzRWRpdGFibGUpIHtcbiAgICB0aGlzLmVudHJpZXMgPSBuZXdFbnRyaWVzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBIYXNoQ29sbGlzaW9uTm9kZShvd25lcklELCB0aGlzLmtleUhhc2gsIG5ld0VudHJpZXMpO1xufTtcblxudmFyIFZhbHVlTm9kZSA9IGZ1bmN0aW9uIFZhbHVlTm9kZShvd25lcklELCBrZXlIYXNoLCBlbnRyeSkge1xuICB0aGlzLm93bmVySUQgPSBvd25lcklEO1xuICB0aGlzLmtleUhhc2ggPSBrZXlIYXNoO1xuICB0aGlzLmVudHJ5ID0gZW50cnk7XG59O1xuXG5WYWx1ZU5vZGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoc2hpZnQsIGtleUhhc2gsIGtleSwgbm90U2V0VmFsdWUpIHtcbiAgcmV0dXJuIGlzKGtleSwgdGhpcy5lbnRyeVswXSkgPyB0aGlzLmVudHJ5WzFdIDogbm90U2V0VmFsdWU7XG59O1xuXG5WYWx1ZU5vZGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAob3duZXJJRCwgc2hpZnQsIGtleUhhc2gsIGtleSwgdmFsdWUsIGRpZENoYW5nZVNpemUsIGRpZEFsdGVyKSB7XG4gIHZhciByZW1vdmVkID0gdmFsdWUgPT09IE5PVF9TRVQ7XG4gIHZhciBrZXlNYXRjaCA9IGlzKGtleSwgdGhpcy5lbnRyeVswXSk7XG4gIGlmIChrZXlNYXRjaCA/IHZhbHVlID09PSB0aGlzLmVudHJ5WzFdIDogcmVtb3ZlZCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgU2V0UmVmKGRpZEFsdGVyKTtcblxuICBpZiAocmVtb3ZlZCkge1xuICAgIFNldFJlZihkaWRDaGFuZ2VTaXplKTtcbiAgICByZXR1cm47IC8vIHVuZGVmaW5lZFxuICB9XG5cbiAgaWYgKGtleU1hdGNoKSB7XG4gICAgaWYgKG93bmVySUQgJiYgb3duZXJJRCA9PT0gdGhpcy5vd25lcklEKSB7XG4gICAgICB0aGlzLmVudHJ5WzFdID0gdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBWYWx1ZU5vZGUob3duZXJJRCwgdGhpcy5rZXlIYXNoLCBba2V5LCB2YWx1ZV0pO1xuICB9XG5cbiAgU2V0UmVmKGRpZENoYW5nZVNpemUpO1xuICByZXR1cm4gbWVyZ2VJbnRvTm9kZSh0aGlzLCBvd25lcklELCBzaGlmdCwgaGFzaChrZXkpLCBba2V5LCB2YWx1ZV0pO1xufTtcblxuLy8gI3ByYWdtYSBJdGVyYXRvcnNcblxuQXJyYXlNYXBOb2RlLnByb3RvdHlwZS5pdGVyYXRlID0gSGFzaENvbGxpc2lvbk5vZGUucHJvdG90eXBlLml0ZXJhdGUgPSBmdW5jdGlvbihcbiAgZm4sXG4gIHJldmVyc2Vcbikge1xuICB2YXIgZW50cmllcyA9IHRoaXMuZW50cmllcztcbiAgZm9yICh2YXIgaWkgPSAwLCBtYXhJbmRleCA9IGVudHJpZXMubGVuZ3RoIC0gMTsgaWkgPD0gbWF4SW5kZXg7IGlpKyspIHtcbiAgICBpZiAoZm4oZW50cmllc1tyZXZlcnNlID8gbWF4SW5kZXggLSBpaSA6IGlpXSkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuXG5CaXRtYXBJbmRleGVkTm9kZS5wcm90b3R5cGUuaXRlcmF0ZSA9IEhhc2hBcnJheU1hcE5vZGUucHJvdG90eXBlLml0ZXJhdGUgPSBmdW5jdGlvbihcbiAgZm4sXG4gIHJldmVyc2Vcbikge1xuICB2YXIgbm9kZXMgPSB0aGlzLm5vZGVzO1xuICBmb3IgKHZhciBpaSA9IDAsIG1heEluZGV4ID0gbm9kZXMubGVuZ3RoIC0gMTsgaWkgPD0gbWF4SW5kZXg7IGlpKyspIHtcbiAgICB2YXIgbm9kZSA9IG5vZGVzW3JldmVyc2UgPyBtYXhJbmRleCAtIGlpIDogaWldO1xuICAgIGlmIChub2RlICYmIG5vZGUuaXRlcmF0ZShmbiwgcmV2ZXJzZSkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblZhbHVlTm9kZS5wcm90b3R5cGUuaXRlcmF0ZSA9IGZ1bmN0aW9uKGZuLCByZXZlcnNlKSB7XG4gIHJldHVybiBmbih0aGlzLmVudHJ5KTtcbn07XG5cbnZhciBNYXBJdGVyYXRvciA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEl0ZXJhdG9yJCQxKSB7XG4gIGZ1bmN0aW9uIE1hcEl0ZXJhdG9yKG1hcCwgdHlwZSwgcmV2ZXJzZSkge1xuICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgIHRoaXMuX3JldmVyc2UgPSByZXZlcnNlO1xuICAgIHRoaXMuX3N0YWNrID0gbWFwLl9yb290ICYmIG1hcEl0ZXJhdG9yRnJhbWUobWFwLl9yb290KTtcbiAgfVxuXG4gIGlmICggSXRlcmF0b3IkJDEgKSBNYXBJdGVyYXRvci5fX3Byb3RvX18gPSBJdGVyYXRvciQkMTtcbiAgTWFwSXRlcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggSXRlcmF0b3IkJDEgJiYgSXRlcmF0b3IkJDEucHJvdG90eXBlICk7XG4gIE1hcEl0ZXJhdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1hcEl0ZXJhdG9yO1xuXG4gIE1hcEl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gbmV4dCAoKSB7XG4gICAgdmFyIHR5cGUgPSB0aGlzLl90eXBlO1xuICAgIHZhciBzdGFjayA9IHRoaXMuX3N0YWNrO1xuICAgIHdoaWxlIChzdGFjaykge1xuICAgICAgdmFyIG5vZGUgPSBzdGFjay5ub2RlO1xuICAgICAgdmFyIGluZGV4ID0gc3RhY2suaW5kZXgrKztcbiAgICAgIHZhciBtYXhJbmRleCA9ICh2b2lkIDApO1xuICAgICAgaWYgKG5vZGUuZW50cnkpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIG1hcEl0ZXJhdG9yVmFsdWUodHlwZSwgbm9kZS5lbnRyeSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIG1heEluZGV4ID0gbm9kZS5lbnRyaWVzLmxlbmd0aCAtIDE7XG4gICAgICAgIGlmIChpbmRleCA8PSBtYXhJbmRleCkge1xuICAgICAgICAgIHJldHVybiBtYXBJdGVyYXRvclZhbHVlKFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIG5vZGUuZW50cmllc1t0aGlzLl9yZXZlcnNlID8gbWF4SW5kZXggLSBpbmRleCA6IGluZGV4XVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1heEluZGV4ID0gbm9kZS5ub2Rlcy5sZW5ndGggLSAxO1xuICAgICAgICBpZiAoaW5kZXggPD0gbWF4SW5kZXgpIHtcbiAgICAgICAgICB2YXIgc3ViTm9kZSA9IG5vZGUubm9kZXNbdGhpcy5fcmV2ZXJzZSA/IG1heEluZGV4IC0gaW5kZXggOiBpbmRleF07XG4gICAgICAgICAgaWYgKHN1Yk5vZGUpIHtcbiAgICAgICAgICAgIGlmIChzdWJOb2RlLmVudHJ5KSB7XG4gICAgICAgICAgICAgIHJldHVybiBtYXBJdGVyYXRvclZhbHVlKHR5cGUsIHN1Yk5vZGUuZW50cnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhY2sgPSB0aGlzLl9zdGFjayA9IG1hcEl0ZXJhdG9yRnJhbWUoc3ViTm9kZSwgc3RhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc3RhY2sgPSB0aGlzLl9zdGFjayA9IHRoaXMuX3N0YWNrLl9fcHJldjtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZXJhdG9yRG9uZSgpO1xuICB9O1xuXG4gIHJldHVybiBNYXBJdGVyYXRvcjtcbn0oSXRlcmF0b3IpKTtcblxuZnVuY3Rpb24gbWFwSXRlcmF0b3JWYWx1ZSh0eXBlLCBlbnRyeSkge1xuICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCBlbnRyeVswXSwgZW50cnlbMV0pO1xufVxuXG5mdW5jdGlvbiBtYXBJdGVyYXRvckZyYW1lKG5vZGUsIHByZXYpIHtcbiAgcmV0dXJuIHtcbiAgICBub2RlOiBub2RlLFxuICAgIGluZGV4OiAwLFxuICAgIF9fcHJldjogcHJldixcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWFrZU1hcChzaXplLCByb290LCBvd25lcklELCBoYXNoJCQxKSB7XG4gIHZhciBtYXAgPSBPYmplY3QuY3JlYXRlKE1hcFByb3RvdHlwZSk7XG4gIG1hcC5zaXplID0gc2l6ZTtcbiAgbWFwLl9yb290ID0gcm9vdDtcbiAgbWFwLl9fb3duZXJJRCA9IG93bmVySUQ7XG4gIG1hcC5fX2hhc2ggPSBoYXNoJCQxO1xuICBtYXAuX19hbHRlcmVkID0gZmFsc2U7XG4gIHJldHVybiBtYXA7XG59XG5cbnZhciBFTVBUWV9NQVA7XG5mdW5jdGlvbiBlbXB0eU1hcCgpIHtcbiAgcmV0dXJuIEVNUFRZX01BUCB8fCAoRU1QVFlfTUFQID0gbWFrZU1hcCgwKSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU1hcChtYXAsIGssIHYpIHtcbiAgdmFyIG5ld1Jvb3Q7XG4gIHZhciBuZXdTaXplO1xuICBpZiAoIW1hcC5fcm9vdCkge1xuICAgIGlmICh2ID09PSBOT1RfU0VUKSB7XG4gICAgICByZXR1cm4gbWFwO1xuICAgIH1cbiAgICBuZXdTaXplID0gMTtcbiAgICBuZXdSb290ID0gbmV3IEFycmF5TWFwTm9kZShtYXAuX19vd25lcklELCBbW2ssIHZdXSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGRpZENoYW5nZVNpemUgPSBNYWtlUmVmKCk7XG4gICAgdmFyIGRpZEFsdGVyID0gTWFrZVJlZigpO1xuICAgIG5ld1Jvb3QgPSB1cGRhdGVOb2RlKFxuICAgICAgbWFwLl9yb290LFxuICAgICAgbWFwLl9fb3duZXJJRCxcbiAgICAgIDAsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICBrLFxuICAgICAgdixcbiAgICAgIGRpZENoYW5nZVNpemUsXG4gICAgICBkaWRBbHRlclxuICAgICk7XG4gICAgaWYgKCFkaWRBbHRlci52YWx1ZSkge1xuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG4gICAgbmV3U2l6ZSA9IG1hcC5zaXplICsgKGRpZENoYW5nZVNpemUudmFsdWUgPyAodiA9PT0gTk9UX1NFVCA/IC0xIDogMSkgOiAwKTtcbiAgfVxuICBpZiAobWFwLl9fb3duZXJJRCkge1xuICAgIG1hcC5zaXplID0gbmV3U2l6ZTtcbiAgICBtYXAuX3Jvb3QgPSBuZXdSb290O1xuICAgIG1hcC5fX2hhc2ggPSB1bmRlZmluZWQ7XG4gICAgbWFwLl9fYWx0ZXJlZCA9IHRydWU7XG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuICByZXR1cm4gbmV3Um9vdCA/IG1ha2VNYXAobmV3U2l6ZSwgbmV3Um9vdCkgOiBlbXB0eU1hcCgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVOb2RlKFxuICBub2RlLFxuICBvd25lcklELFxuICBzaGlmdCxcbiAga2V5SGFzaCxcbiAga2V5LFxuICB2YWx1ZSxcbiAgZGlkQ2hhbmdlU2l6ZSxcbiAgZGlkQWx0ZXJcbikge1xuICBpZiAoIW5vZGUpIHtcbiAgICBpZiAodmFsdWUgPT09IE5PVF9TRVQpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBTZXRSZWYoZGlkQWx0ZXIpO1xuICAgIFNldFJlZihkaWRDaGFuZ2VTaXplKTtcbiAgICByZXR1cm4gbmV3IFZhbHVlTm9kZShvd25lcklELCBrZXlIYXNoLCBba2V5LCB2YWx1ZV0pO1xuICB9XG4gIHJldHVybiBub2RlLnVwZGF0ZShcbiAgICBvd25lcklELFxuICAgIHNoaWZ0LFxuICAgIGtleUhhc2gsXG4gICAga2V5LFxuICAgIHZhbHVlLFxuICAgIGRpZENoYW5nZVNpemUsXG4gICAgZGlkQWx0ZXJcbiAgKTtcbn1cblxuZnVuY3Rpb24gaXNMZWFmTm9kZShub2RlKSB7XG4gIHJldHVybiAoXG4gICAgbm9kZS5jb25zdHJ1Y3RvciA9PT0gVmFsdWVOb2RlIHx8IG5vZGUuY29uc3RydWN0b3IgPT09IEhhc2hDb2xsaXNpb25Ob2RlXG4gICk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlSW50b05vZGUobm9kZSwgb3duZXJJRCwgc2hpZnQsIGtleUhhc2gsIGVudHJ5KSB7XG4gIGlmIChub2RlLmtleUhhc2ggPT09IGtleUhhc2gpIHtcbiAgICByZXR1cm4gbmV3IEhhc2hDb2xsaXNpb25Ob2RlKG93bmVySUQsIGtleUhhc2gsIFtub2RlLmVudHJ5LCBlbnRyeV0pO1xuICB9XG5cbiAgdmFyIGlkeDEgPSAoc2hpZnQgPT09IDAgPyBub2RlLmtleUhhc2ggOiBub2RlLmtleUhhc2ggPj4+IHNoaWZ0KSAmIE1BU0s7XG4gIHZhciBpZHgyID0gKHNoaWZ0ID09PSAwID8ga2V5SGFzaCA6IGtleUhhc2ggPj4+IHNoaWZ0KSAmIE1BU0s7XG5cbiAgdmFyIG5ld05vZGU7XG4gIHZhciBub2RlcyA9XG4gICAgaWR4MSA9PT0gaWR4MlxuICAgICAgPyBbbWVyZ2VJbnRvTm9kZShub2RlLCBvd25lcklELCBzaGlmdCArIFNISUZULCBrZXlIYXNoLCBlbnRyeSldXG4gICAgICA6ICgobmV3Tm9kZSA9IG5ldyBWYWx1ZU5vZGUob3duZXJJRCwga2V5SGFzaCwgZW50cnkpKSxcbiAgICAgICAgaWR4MSA8IGlkeDIgPyBbbm9kZSwgbmV3Tm9kZV0gOiBbbmV3Tm9kZSwgbm9kZV0pO1xuXG4gIHJldHVybiBuZXcgQml0bWFwSW5kZXhlZE5vZGUob3duZXJJRCwgKDEgPDwgaWR4MSkgfCAoMSA8PCBpZHgyKSwgbm9kZXMpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOb2Rlcyhvd25lcklELCBlbnRyaWVzLCBrZXksIHZhbHVlKSB7XG4gIGlmICghb3duZXJJRCkge1xuICAgIG93bmVySUQgPSBuZXcgT3duZXJJRCgpO1xuICB9XG4gIHZhciBub2RlID0gbmV3IFZhbHVlTm9kZShvd25lcklELCBoYXNoKGtleSksIFtrZXksIHZhbHVlXSk7XG4gIGZvciAodmFyIGlpID0gMDsgaWkgPCBlbnRyaWVzLmxlbmd0aDsgaWkrKykge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaWldO1xuICAgIG5vZGUgPSBub2RlLnVwZGF0ZShvd25lcklELCAwLCB1bmRlZmluZWQsIGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbiAgcmV0dXJuIG5vZGU7XG59XG5cbmZ1bmN0aW9uIHBhY2tOb2Rlcyhvd25lcklELCBub2RlcywgY291bnQsIGV4Y2x1ZGluZykge1xuICB2YXIgYml0bWFwID0gMDtcbiAgdmFyIHBhY2tlZElJID0gMDtcbiAgdmFyIHBhY2tlZE5vZGVzID0gbmV3IEFycmF5KGNvdW50KTtcbiAgZm9yICh2YXIgaWkgPSAwLCBiaXQgPSAxLCBsZW4gPSBub2Rlcy5sZW5ndGg7IGlpIDwgbGVuOyBpaSsrLCBiaXQgPDw9IDEpIHtcbiAgICB2YXIgbm9kZSA9IG5vZGVzW2lpXTtcbiAgICBpZiAobm9kZSAhPT0gdW5kZWZpbmVkICYmIGlpICE9PSBleGNsdWRpbmcpIHtcbiAgICAgIGJpdG1hcCB8PSBiaXQ7XG4gICAgICBwYWNrZWROb2Rlc1twYWNrZWRJSSsrXSA9IG5vZGU7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgQml0bWFwSW5kZXhlZE5vZGUob3duZXJJRCwgYml0bWFwLCBwYWNrZWROb2Rlcyk7XG59XG5cbmZ1bmN0aW9uIGV4cGFuZE5vZGVzKG93bmVySUQsIG5vZGVzLCBiaXRtYXAsIGluY2x1ZGluZywgbm9kZSkge1xuICB2YXIgY291bnQgPSAwO1xuICB2YXIgZXhwYW5kZWROb2RlcyA9IG5ldyBBcnJheShTSVpFKTtcbiAgZm9yICh2YXIgaWkgPSAwOyBiaXRtYXAgIT09IDA7IGlpKyssIGJpdG1hcCA+Pj49IDEpIHtcbiAgICBleHBhbmRlZE5vZGVzW2lpXSA9IGJpdG1hcCAmIDEgPyBub2Rlc1tjb3VudCsrXSA6IHVuZGVmaW5lZDtcbiAgfVxuICBleHBhbmRlZE5vZGVzW2luY2x1ZGluZ10gPSBub2RlO1xuICByZXR1cm4gbmV3IEhhc2hBcnJheU1hcE5vZGUob3duZXJJRCwgY291bnQgKyAxLCBleHBhbmRlZE5vZGVzKTtcbn1cblxuZnVuY3Rpb24gcG9wQ291bnQoeCkge1xuICB4IC09ICh4ID4+IDEpICYgMHg1NTU1NTU1NTtcbiAgeCA9ICh4ICYgMHgzMzMzMzMzMykgKyAoKHggPj4gMikgJiAweDMzMzMzMzMzKTtcbiAgeCA9ICh4ICsgKHggPj4gNCkpICYgMHgwZjBmMGYwZjtcbiAgeCArPSB4ID4+IDg7XG4gIHggKz0geCA+PiAxNjtcbiAgcmV0dXJuIHggJiAweDdmO1xufVxuXG5mdW5jdGlvbiBzZXRBdChhcnJheSwgaWR4LCB2YWwsIGNhbkVkaXQpIHtcbiAgdmFyIG5ld0FycmF5ID0gY2FuRWRpdCA/IGFycmF5IDogYXJyQ29weShhcnJheSk7XG4gIG5ld0FycmF5W2lkeF0gPSB2YWw7XG4gIHJldHVybiBuZXdBcnJheTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlSW4oYXJyYXksIGlkeCwgdmFsLCBjYW5FZGl0KSB7XG4gIHZhciBuZXdMZW4gPSBhcnJheS5sZW5ndGggKyAxO1xuICBpZiAoY2FuRWRpdCAmJiBpZHggKyAxID09PSBuZXdMZW4pIHtcbiAgICBhcnJheVtpZHhdID0gdmFsO1xuICAgIHJldHVybiBhcnJheTtcbiAgfVxuICB2YXIgbmV3QXJyYXkgPSBuZXcgQXJyYXkobmV3TGVuKTtcbiAgdmFyIGFmdGVyID0gMDtcbiAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IG5ld0xlbjsgaWkrKykge1xuICAgIGlmIChpaSA9PT0gaWR4KSB7XG4gICAgICBuZXdBcnJheVtpaV0gPSB2YWw7XG4gICAgICBhZnRlciA9IC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdBcnJheVtpaV0gPSBhcnJheVtpaSArIGFmdGVyXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld0FycmF5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPdXQoYXJyYXksIGlkeCwgY2FuRWRpdCkge1xuICB2YXIgbmV3TGVuID0gYXJyYXkubGVuZ3RoIC0gMTtcbiAgaWYgKGNhbkVkaXQgJiYgaWR4ID09PSBuZXdMZW4pIHtcbiAgICBhcnJheS5wb3AoKTtcbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cbiAgdmFyIG5ld0FycmF5ID0gbmV3IEFycmF5KG5ld0xlbik7XG4gIHZhciBhZnRlciA9IDA7XG4gIGZvciAodmFyIGlpID0gMDsgaWkgPCBuZXdMZW47IGlpKyspIHtcbiAgICBpZiAoaWkgPT09IGlkeCkge1xuICAgICAgYWZ0ZXIgPSAxO1xuICAgIH1cbiAgICBuZXdBcnJheVtpaV0gPSBhcnJheVtpaSArIGFmdGVyXTtcbiAgfVxuICByZXR1cm4gbmV3QXJyYXk7XG59XG5cbnZhciBNQVhfQVJSQVlfTUFQX1NJWkUgPSBTSVpFIC8gNDtcbnZhciBNQVhfQklUTUFQX0lOREVYRURfU0laRSA9IFNJWkUgLyAyO1xudmFyIE1JTl9IQVNIX0FSUkFZX01BUF9TSVpFID0gU0laRSAvIDQ7XG5cbnZhciBJU19MSVNUX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX0xJU1RfX0BAJztcblxuZnVuY3Rpb24gaXNMaXN0KG1heWJlTGlzdCkge1xuICByZXR1cm4gQm9vbGVhbihtYXliZUxpc3QgJiYgbWF5YmVMaXN0W0lTX0xJU1RfU1lNQk9MXSk7XG59XG5cbnZhciBMaXN0ID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoSW5kZXhlZENvbGxlY3Rpb24kJDEpIHtcbiAgZnVuY3Rpb24gTGlzdCh2YWx1ZSkge1xuICAgIHZhciBlbXB0eSA9IGVtcHR5TGlzdCgpO1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZW1wdHk7XG4gICAgfVxuICAgIGlmIChpc0xpc3QodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHZhciBpdGVyID0gSW5kZXhlZENvbGxlY3Rpb24kJDEodmFsdWUpO1xuICAgIHZhciBzaXplID0gaXRlci5zaXplO1xuICAgIGlmIChzaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gZW1wdHk7XG4gICAgfVxuICAgIGFzc2VydE5vdEluZmluaXRlKHNpemUpO1xuICAgIGlmIChzaXplID4gMCAmJiBzaXplIDwgU0laRSkge1xuICAgICAgcmV0dXJuIG1ha2VMaXN0KDAsIHNpemUsIFNISUZULCBudWxsLCBuZXcgVk5vZGUoaXRlci50b0FycmF5KCkpKTtcbiAgICB9XG4gICAgcmV0dXJuIGVtcHR5LndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgIGxpc3Quc2V0U2l6ZShzaXplKTtcbiAgICAgIGl0ZXIuZm9yRWFjaChmdW5jdGlvbiAodiwgaSkgeyByZXR1cm4gbGlzdC5zZXQoaSwgdik7IH0pO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKCBJbmRleGVkQ29sbGVjdGlvbiQkMSApIExpc3QuX19wcm90b19fID0gSW5kZXhlZENvbGxlY3Rpb24kJDE7XG4gIExpc3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggSW5kZXhlZENvbGxlY3Rpb24kJDEgJiYgSW5kZXhlZENvbGxlY3Rpb24kJDEucHJvdG90eXBlICk7XG4gIExpc3QucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTGlzdDtcblxuICBMaXN0Lm9mID0gZnVuY3Rpb24gb2YgKC8qLi4udmFsdWVzKi8pIHtcbiAgICByZXR1cm4gdGhpcyhhcmd1bWVudHMpO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLl9fdG9TdHJpbmcoJ0xpc3QgWycsICddJyk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBBY2Nlc3NcblxuICBMaXN0LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGluZGV4LCBub3RTZXRWYWx1ZSkge1xuICAgIGluZGV4ID0gd3JhcEluZGV4KHRoaXMsIGluZGV4KTtcbiAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuc2l6ZSkge1xuICAgICAgaW5kZXggKz0gdGhpcy5fb3JpZ2luO1xuICAgICAgdmFyIG5vZGUgPSBsaXN0Tm9kZUZvcih0aGlzLCBpbmRleCk7XG4gICAgICByZXR1cm4gbm9kZSAmJiBub2RlLmFycmF5W2luZGV4ICYgTUFTS107XG4gICAgfVxuICAgIHJldHVybiBub3RTZXRWYWx1ZTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIE1vZGlmaWNhdGlvblxuXG4gIExpc3QucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldCAoaW5kZXgsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHVwZGF0ZUxpc3QodGhpcywgaW5kZXgsIHZhbHVlKTtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUgKGluZGV4KSB7XG4gICAgcmV0dXJuICF0aGlzLmhhcyhpbmRleClcbiAgICAgID8gdGhpc1xuICAgICAgOiBpbmRleCA9PT0gMFxuICAgICAgICA/IHRoaXMuc2hpZnQoKVxuICAgICAgICA6IGluZGV4ID09PSB0aGlzLnNpemUgLSAxXG4gICAgICAgICAgPyB0aGlzLnBvcCgpXG4gICAgICAgICAgOiB0aGlzLnNwbGljZShpbmRleCwgMSk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gaW5zZXJ0IChpbmRleCwgdmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5zcGxpY2UoaW5kZXgsIDAsIHZhbHVlKTtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKHRoaXMuX19vd25lcklEKSB7XG4gICAgICB0aGlzLnNpemUgPSB0aGlzLl9vcmlnaW4gPSB0aGlzLl9jYXBhY2l0eSA9IDA7XG4gICAgICB0aGlzLl9sZXZlbCA9IFNISUZUO1xuICAgICAgdGhpcy5fcm9vdCA9IHRoaXMuX3RhaWwgPSBudWxsO1xuICAgICAgdGhpcy5fX2hhc2ggPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9fYWx0ZXJlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIGVtcHR5TGlzdCgpO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoICgvKi4uLnZhbHVlcyovKSB7XG4gICAgdmFyIHZhbHVlcyA9IGFyZ3VtZW50cztcbiAgICB2YXIgb2xkU2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICByZXR1cm4gdGhpcy53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICBzZXRMaXN0Qm91bmRzKGxpc3QsIDAsIG9sZFNpemUgKyB2YWx1ZXMubGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCB2YWx1ZXMubGVuZ3RoOyBpaSsrKSB7XG4gICAgICAgIGxpc3Quc2V0KG9sZFNpemUgKyBpaSwgdmFsdWVzW2lpXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24gcG9wICgpIHtcbiAgICByZXR1cm4gc2V0TGlzdEJvdW5kcyh0aGlzLCAwLCAtMSk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uIHVuc2hpZnQgKC8qLi4udmFsdWVzKi8pIHtcbiAgICB2YXIgdmFsdWVzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiB0aGlzLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgIHNldExpc3RCb3VuZHMobGlzdCwgLXZhbHVlcy5sZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IHZhbHVlcy5sZW5ndGg7IGlpKyspIHtcbiAgICAgICAgbGlzdC5zZXQoaWksIHZhbHVlc1tpaV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLnNoaWZ0ID0gZnVuY3Rpb24gc2hpZnQgKCkge1xuICAgIHJldHVybiBzZXRMaXN0Qm91bmRzKHRoaXMsIDEpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgQ29tcG9zaXRpb25cblxuICBMaXN0LnByb3RvdHlwZS5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKC8qLi4uY29sbGVjdGlvbnMqLykge1xuICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcblxuICAgIHZhciBzZXFzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBhcmd1bWVudCA9IGFyZ3VtZW50cyQxW2ldO1xuICAgICAgdmFyIHNlcSA9IEluZGV4ZWRDb2xsZWN0aW9uJCQxKFxuICAgICAgICB0eXBlb2YgYXJndW1lbnQgIT09ICdzdHJpbmcnICYmIGhhc0l0ZXJhdG9yKGFyZ3VtZW50KVxuICAgICAgICAgID8gYXJndW1lbnRcbiAgICAgICAgICA6IFthcmd1bWVudF1cbiAgICAgICk7XG4gICAgICBpZiAoc2VxLnNpemUgIT09IDApIHtcbiAgICAgICAgc2Vxcy5wdXNoKHNlcSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZXFzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICh0aGlzLnNpemUgPT09IDAgJiYgIXRoaXMuX19vd25lcklEICYmIHNlcXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3RvcihzZXFzWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobGlzdCkge1xuICAgICAgc2Vxcy5mb3JFYWNoKGZ1bmN0aW9uIChzZXEpIHsgcmV0dXJuIHNlcS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gbGlzdC5wdXNoKHZhbHVlKTsgfSk7IH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiBzZXRTaXplIChzaXplKSB7XG4gICAgcmV0dXJuIHNldExpc3RCb3VuZHModGhpcywgMCwgc2l6ZSk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gbWFwIChtYXBwZXIsIGNvbnRleHQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcyQxLnNpemU7IGkrKykge1xuICAgICAgICBsaXN0LnNldChpLCBtYXBwZXIuY2FsbChjb250ZXh0LCBsaXN0LmdldChpKSwgaSwgbGlzdCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgSXRlcmF0aW9uXG5cbiAgTGlzdC5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoYmVnaW4sIGVuZCkge1xuICAgIHZhciBzaXplID0gdGhpcy5zaXplO1xuICAgIGlmICh3aG9sZVNsaWNlKGJlZ2luLCBlbmQsIHNpemUpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIHNldExpc3RCb3VuZHMoXG4gICAgICB0aGlzLFxuICAgICAgcmVzb2x2ZUJlZ2luKGJlZ2luLCBzaXplKSxcbiAgICAgIHJlc29sdmVFbmQoZW5kLCBzaXplKVxuICAgICk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgaW5kZXggPSByZXZlcnNlID8gdGhpcy5zaXplIDogMDtcbiAgICB2YXIgdmFsdWVzID0gaXRlcmF0ZUxpc3QodGhpcywgcmV2ZXJzZSk7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWUgPSB2YWx1ZXMoKTtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gRE9ORVxuICAgICAgICA/IGl0ZXJhdG9yRG9uZSgpXG4gICAgICAgIDogaXRlcmF0b3JWYWx1ZSh0eXBlLCByZXZlcnNlID8gLS1pbmRleCA6IGluZGV4KyssIHZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIGluZGV4ID0gcmV2ZXJzZSA/IHRoaXMuc2l6ZSA6IDA7XG4gICAgdmFyIHZhbHVlcyA9IGl0ZXJhdGVMaXN0KHRoaXMsIHJldmVyc2UpO1xuICAgIHZhciB2YWx1ZTtcbiAgICB3aGlsZSAoKHZhbHVlID0gdmFsdWVzKCkpICE9PSBET05FKSB7XG4gICAgICBpZiAoZm4odmFsdWUsIHJldmVyc2UgPyAtLWluZGV4IDogaW5kZXgrKywgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5kZXg7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUuX19lbnN1cmVPd25lciA9IGZ1bmN0aW9uIF9fZW5zdXJlT3duZXIgKG93bmVySUQpIHtcbiAgICBpZiAob3duZXJJRCA9PT0gdGhpcy5fX293bmVySUQpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAoIW93bmVySUQpIHtcbiAgICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGVtcHR5TGlzdCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX293bmVySUQgPSBvd25lcklEO1xuICAgICAgdGhpcy5fX2FsdGVyZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gbWFrZUxpc3QoXG4gICAgICB0aGlzLl9vcmlnaW4sXG4gICAgICB0aGlzLl9jYXBhY2l0eSxcbiAgICAgIHRoaXMuX2xldmVsLFxuICAgICAgdGhpcy5fcm9vdCxcbiAgICAgIHRoaXMuX3RhaWwsXG4gICAgICBvd25lcklELFxuICAgICAgdGhpcy5fX2hhc2hcbiAgICApO1xuICB9O1xuXG4gIHJldHVybiBMaXN0O1xufShJbmRleGVkQ29sbGVjdGlvbikpO1xuXG5MaXN0LmlzTGlzdCA9IGlzTGlzdDtcblxudmFyIExpc3RQcm90b3R5cGUgPSBMaXN0LnByb3RvdHlwZTtcbkxpc3RQcm90b3R5cGVbSVNfTElTVF9TWU1CT0xdID0gdHJ1ZTtcbkxpc3RQcm90b3R5cGVbREVMRVRFXSA9IExpc3RQcm90b3R5cGUucmVtb3ZlO1xuTGlzdFByb3RvdHlwZS5tZXJnZSA9IExpc3RQcm90b3R5cGUuY29uY2F0O1xuTGlzdFByb3RvdHlwZS5zZXRJbiA9IHNldEluJDE7XG5MaXN0UHJvdG90eXBlLmRlbGV0ZUluID0gTGlzdFByb3RvdHlwZS5yZW1vdmVJbiA9IGRlbGV0ZUluO1xuTGlzdFByb3RvdHlwZS51cGRhdGUgPSB1cGRhdGUkMTtcbkxpc3RQcm90b3R5cGUudXBkYXRlSW4gPSB1cGRhdGVJbiQxO1xuTGlzdFByb3RvdHlwZS5tZXJnZUluID0gbWVyZ2VJbjtcbkxpc3RQcm90b3R5cGUubWVyZ2VEZWVwSW4gPSBtZXJnZURlZXBJbjtcbkxpc3RQcm90b3R5cGUud2l0aE11dGF0aW9ucyA9IHdpdGhNdXRhdGlvbnM7XG5MaXN0UHJvdG90eXBlLndhc0FsdGVyZWQgPSB3YXNBbHRlcmVkO1xuTGlzdFByb3RvdHlwZS5hc0ltbXV0YWJsZSA9IGFzSW1tdXRhYmxlO1xuTGlzdFByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IExpc3RQcm90b3R5cGUuYXNNdXRhYmxlID0gYXNNdXRhYmxlO1xuTGlzdFByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlc3VsdCwgYXJyKSB7XG4gIHJldHVybiByZXN1bHQucHVzaChhcnIpO1xufTtcbkxpc3RQcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqLmFzSW1tdXRhYmxlKCk7XG59O1xuXG52YXIgVk5vZGUgPSBmdW5jdGlvbiBWTm9kZShhcnJheSwgb3duZXJJRCkge1xuICB0aGlzLmFycmF5ID0gYXJyYXk7XG4gIHRoaXMub3duZXJJRCA9IG93bmVySUQ7XG59O1xuXG4vLyBUT0RPOiBzZWVtcyBsaWtlIHRoZXNlIG1ldGhvZHMgYXJlIHZlcnkgc2ltaWxhclxuXG5WTm9kZS5wcm90b3R5cGUucmVtb3ZlQmVmb3JlID0gZnVuY3Rpb24gcmVtb3ZlQmVmb3JlIChvd25lcklELCBsZXZlbCwgaW5kZXgpIHtcbiAgaWYgKGluZGV4ID09PSBsZXZlbCA/IDEgPDwgbGV2ZWwgOiB0aGlzLmFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHZhciBvcmlnaW5JbmRleCA9IChpbmRleCA+Pj4gbGV2ZWwpICYgTUFTSztcbiAgaWYgKG9yaWdpbkluZGV4ID49IHRoaXMuYXJyYXkubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBWTm9kZShbXSwgb3duZXJJRCk7XG4gIH1cbiAgdmFyIHJlbW92aW5nRmlyc3QgPSBvcmlnaW5JbmRleCA9PT0gMDtcbiAgdmFyIG5ld0NoaWxkO1xuICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgdmFyIG9sZENoaWxkID0gdGhpcy5hcnJheVtvcmlnaW5JbmRleF07XG4gICAgbmV3Q2hpbGQgPVxuICAgICAgb2xkQ2hpbGQgJiYgb2xkQ2hpbGQucmVtb3ZlQmVmb3JlKG93bmVySUQsIGxldmVsIC0gU0hJRlQsIGluZGV4KTtcbiAgICBpZiAobmV3Q2hpbGQgPT09IG9sZENoaWxkICYmIHJlbW92aW5nRmlyc3QpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuICBpZiAocmVtb3ZpbmdGaXJzdCAmJiAhbmV3Q2hpbGQpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB2YXIgZWRpdGFibGUgPSBlZGl0YWJsZVZOb2RlKHRoaXMsIG93bmVySUQpO1xuICBpZiAoIXJlbW92aW5nRmlyc3QpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgb3JpZ2luSW5kZXg7IGlpKyspIHtcbiAgICAgIGVkaXRhYmxlLmFycmF5W2lpXSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbiAgaWYgKG5ld0NoaWxkKSB7XG4gICAgZWRpdGFibGUuYXJyYXlbb3JpZ2luSW5kZXhdID0gbmV3Q2hpbGQ7XG4gIH1cbiAgcmV0dXJuIGVkaXRhYmxlO1xufTtcblxuVk5vZGUucHJvdG90eXBlLnJlbW92ZUFmdGVyID0gZnVuY3Rpb24gcmVtb3ZlQWZ0ZXIgKG93bmVySUQsIGxldmVsLCBpbmRleCkge1xuICBpZiAoaW5kZXggPT09IChsZXZlbCA/IDEgPDwgbGV2ZWwgOiAwKSB8fCB0aGlzLmFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHZhciBzaXplSW5kZXggPSAoKGluZGV4IC0gMSkgPj4+IGxldmVsKSAmIE1BU0s7XG4gIGlmIChzaXplSW5kZXggPj0gdGhpcy5hcnJheS5sZW5ndGgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHZhciBuZXdDaGlsZDtcbiAgaWYgKGxldmVsID4gMCkge1xuICAgIHZhciBvbGRDaGlsZCA9IHRoaXMuYXJyYXlbc2l6ZUluZGV4XTtcbiAgICBuZXdDaGlsZCA9XG4gICAgICBvbGRDaGlsZCAmJiBvbGRDaGlsZC5yZW1vdmVBZnRlcihvd25lcklELCBsZXZlbCAtIFNISUZULCBpbmRleCk7XG4gICAgaWYgKG5ld0NoaWxkID09PSBvbGRDaGlsZCAmJiBzaXplSW5kZXggPT09IHRoaXMuYXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG5cbiAgdmFyIGVkaXRhYmxlID0gZWRpdGFibGVWTm9kZSh0aGlzLCBvd25lcklEKTtcbiAgZWRpdGFibGUuYXJyYXkuc3BsaWNlKHNpemVJbmRleCArIDEpO1xuICBpZiAobmV3Q2hpbGQpIHtcbiAgICBlZGl0YWJsZS5hcnJheVtzaXplSW5kZXhdID0gbmV3Q2hpbGQ7XG4gIH1cbiAgcmV0dXJuIGVkaXRhYmxlO1xufTtcblxudmFyIERPTkUgPSB7fTtcblxuZnVuY3Rpb24gaXRlcmF0ZUxpc3QobGlzdCwgcmV2ZXJzZSkge1xuICB2YXIgbGVmdCA9IGxpc3QuX29yaWdpbjtcbiAgdmFyIHJpZ2h0ID0gbGlzdC5fY2FwYWNpdHk7XG4gIHZhciB0YWlsUG9zID0gZ2V0VGFpbE9mZnNldChyaWdodCk7XG4gIHZhciB0YWlsID0gbGlzdC5fdGFpbDtcblxuICByZXR1cm4gaXRlcmF0ZU5vZGVPckxlYWYobGlzdC5fcm9vdCwgbGlzdC5fbGV2ZWwsIDApO1xuXG4gIGZ1bmN0aW9uIGl0ZXJhdGVOb2RlT3JMZWFmKG5vZGUsIGxldmVsLCBvZmZzZXQpIHtcbiAgICByZXR1cm4gbGV2ZWwgPT09IDBcbiAgICAgID8gaXRlcmF0ZUxlYWYobm9kZSwgb2Zmc2V0KVxuICAgICAgOiBpdGVyYXRlTm9kZShub2RlLCBsZXZlbCwgb2Zmc2V0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGl0ZXJhdGVMZWFmKG5vZGUsIG9mZnNldCkge1xuICAgIHZhciBhcnJheSA9IG9mZnNldCA9PT0gdGFpbFBvcyA/IHRhaWwgJiYgdGFpbC5hcnJheSA6IG5vZGUgJiYgbm9kZS5hcnJheTtcbiAgICB2YXIgZnJvbSA9IG9mZnNldCA+IGxlZnQgPyAwIDogbGVmdCAtIG9mZnNldDtcbiAgICB2YXIgdG8gPSByaWdodCAtIG9mZnNldDtcbiAgICBpZiAodG8gPiBTSVpFKSB7XG4gICAgICB0byA9IFNJWkU7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZnJvbSA9PT0gdG8pIHtcbiAgICAgICAgcmV0dXJuIERPTkU7XG4gICAgICB9XG4gICAgICB2YXIgaWR4ID0gcmV2ZXJzZSA/IC0tdG8gOiBmcm9tKys7XG4gICAgICByZXR1cm4gYXJyYXkgJiYgYXJyYXlbaWR4XTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaXRlcmF0ZU5vZGUobm9kZSwgbGV2ZWwsIG9mZnNldCkge1xuICAgIHZhciB2YWx1ZXM7XG4gICAgdmFyIGFycmF5ID0gbm9kZSAmJiBub2RlLmFycmF5O1xuICAgIHZhciBmcm9tID0gb2Zmc2V0ID4gbGVmdCA/IDAgOiAobGVmdCAtIG9mZnNldCkgPj4gbGV2ZWw7XG4gICAgdmFyIHRvID0gKChyaWdodCAtIG9mZnNldCkgPj4gbGV2ZWwpICsgMTtcbiAgICBpZiAodG8gPiBTSVpFKSB7XG4gICAgICB0byA9IFNJWkU7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBpZiAodmFsdWVzKSB7XG4gICAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVzKCk7XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSBET05FKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyb20gPT09IHRvKSB7XG4gICAgICAgICAgcmV0dXJuIERPTkU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlkeCA9IHJldmVyc2UgPyAtLXRvIDogZnJvbSsrO1xuICAgICAgICB2YWx1ZXMgPSBpdGVyYXRlTm9kZU9yTGVhZihcbiAgICAgICAgICBhcnJheSAmJiBhcnJheVtpZHhdLFxuICAgICAgICAgIGxldmVsIC0gU0hJRlQsXG4gICAgICAgICAgb2Zmc2V0ICsgKGlkeCA8PCBsZXZlbClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VMaXN0KG9yaWdpbiwgY2FwYWNpdHksIGxldmVsLCByb290LCB0YWlsLCBvd25lcklELCBoYXNoKSB7XG4gIHZhciBsaXN0ID0gT2JqZWN0LmNyZWF0ZShMaXN0UHJvdG90eXBlKTtcbiAgbGlzdC5zaXplID0gY2FwYWNpdHkgLSBvcmlnaW47XG4gIGxpc3QuX29yaWdpbiA9IG9yaWdpbjtcbiAgbGlzdC5fY2FwYWNpdHkgPSBjYXBhY2l0eTtcbiAgbGlzdC5fbGV2ZWwgPSBsZXZlbDtcbiAgbGlzdC5fcm9vdCA9IHJvb3Q7XG4gIGxpc3QuX3RhaWwgPSB0YWlsO1xuICBsaXN0Ll9fb3duZXJJRCA9IG93bmVySUQ7XG4gIGxpc3QuX19oYXNoID0gaGFzaDtcbiAgbGlzdC5fX2FsdGVyZWQgPSBmYWxzZTtcbiAgcmV0dXJuIGxpc3Q7XG59XG5cbnZhciBFTVBUWV9MSVNUO1xuZnVuY3Rpb24gZW1wdHlMaXN0KCkge1xuICByZXR1cm4gRU1QVFlfTElTVCB8fCAoRU1QVFlfTElTVCA9IG1ha2VMaXN0KDAsIDAsIFNISUZUKSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpc3QobGlzdCwgaW5kZXgsIHZhbHVlKSB7XG4gIGluZGV4ID0gd3JhcEluZGV4KGxpc3QsIGluZGV4KTtcblxuICBpZiAoaW5kZXggIT09IGluZGV4KSB7XG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cblxuICBpZiAoaW5kZXggPj0gbGlzdC5zaXplIHx8IGluZGV4IDwgMCkge1xuICAgIHJldHVybiBsaXN0LndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgIGluZGV4IDwgMFxuICAgICAgICA/IHNldExpc3RCb3VuZHMobGlzdCwgaW5kZXgpLnNldCgwLCB2YWx1ZSlcbiAgICAgICAgOiBzZXRMaXN0Qm91bmRzKGxpc3QsIDAsIGluZGV4ICsgMSkuc2V0KGluZGV4LCB2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBpbmRleCArPSBsaXN0Ll9vcmlnaW47XG5cbiAgdmFyIG5ld1RhaWwgPSBsaXN0Ll90YWlsO1xuICB2YXIgbmV3Um9vdCA9IGxpc3QuX3Jvb3Q7XG4gIHZhciBkaWRBbHRlciA9IE1ha2VSZWYoKTtcbiAgaWYgKGluZGV4ID49IGdldFRhaWxPZmZzZXQobGlzdC5fY2FwYWNpdHkpKSB7XG4gICAgbmV3VGFpbCA9IHVwZGF0ZVZOb2RlKG5ld1RhaWwsIGxpc3QuX19vd25lcklELCAwLCBpbmRleCwgdmFsdWUsIGRpZEFsdGVyKTtcbiAgfSBlbHNlIHtcbiAgICBuZXdSb290ID0gdXBkYXRlVk5vZGUoXG4gICAgICBuZXdSb290LFxuICAgICAgbGlzdC5fX293bmVySUQsXG4gICAgICBsaXN0Ll9sZXZlbCxcbiAgICAgIGluZGV4LFxuICAgICAgdmFsdWUsXG4gICAgICBkaWRBbHRlclxuICAgICk7XG4gIH1cblxuICBpZiAoIWRpZEFsdGVyLnZhbHVlKSB7XG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cblxuICBpZiAobGlzdC5fX293bmVySUQpIHtcbiAgICBsaXN0Ll9yb290ID0gbmV3Um9vdDtcbiAgICBsaXN0Ll90YWlsID0gbmV3VGFpbDtcbiAgICBsaXN0Ll9faGFzaCA9IHVuZGVmaW5lZDtcbiAgICBsaXN0Ll9fYWx0ZXJlZCA9IHRydWU7XG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cbiAgcmV0dXJuIG1ha2VMaXN0KGxpc3QuX29yaWdpbiwgbGlzdC5fY2FwYWNpdHksIGxpc3QuX2xldmVsLCBuZXdSb290LCBuZXdUYWlsKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVk5vZGUobm9kZSwgb3duZXJJRCwgbGV2ZWwsIGluZGV4LCB2YWx1ZSwgZGlkQWx0ZXIpIHtcbiAgdmFyIGlkeCA9IChpbmRleCA+Pj4gbGV2ZWwpICYgTUFTSztcbiAgdmFyIG5vZGVIYXMgPSBub2RlICYmIGlkeCA8IG5vZGUuYXJyYXkubGVuZ3RoO1xuICBpZiAoIW5vZGVIYXMgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgdmFyIG5ld05vZGU7XG5cbiAgaWYgKGxldmVsID4gMCkge1xuICAgIHZhciBsb3dlck5vZGUgPSBub2RlICYmIG5vZGUuYXJyYXlbaWR4XTtcbiAgICB2YXIgbmV3TG93ZXJOb2RlID0gdXBkYXRlVk5vZGUoXG4gICAgICBsb3dlck5vZGUsXG4gICAgICBvd25lcklELFxuICAgICAgbGV2ZWwgLSBTSElGVCxcbiAgICAgIGluZGV4LFxuICAgICAgdmFsdWUsXG4gICAgICBkaWRBbHRlclxuICAgICk7XG4gICAgaWYgKG5ld0xvd2VyTm9kZSA9PT0gbG93ZXJOb2RlKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgbmV3Tm9kZSA9IGVkaXRhYmxlVk5vZGUobm9kZSwgb3duZXJJRCk7XG4gICAgbmV3Tm9kZS5hcnJheVtpZHhdID0gbmV3TG93ZXJOb2RlO1xuICAgIHJldHVybiBuZXdOb2RlO1xuICB9XG5cbiAgaWYgKG5vZGVIYXMgJiYgbm9kZS5hcnJheVtpZHhdID09PSB2YWx1ZSkge1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgaWYgKGRpZEFsdGVyKSB7XG4gICAgU2V0UmVmKGRpZEFsdGVyKTtcbiAgfVxuXG4gIG5ld05vZGUgPSBlZGl0YWJsZVZOb2RlKG5vZGUsIG93bmVySUQpO1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiBpZHggPT09IG5ld05vZGUuYXJyYXkubGVuZ3RoIC0gMSkge1xuICAgIG5ld05vZGUuYXJyYXkucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgbmV3Tm9kZS5hcnJheVtpZHhdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIG5ld05vZGU7XG59XG5cbmZ1bmN0aW9uIGVkaXRhYmxlVk5vZGUobm9kZSwgb3duZXJJRCkge1xuICBpZiAob3duZXJJRCAmJiBub2RlICYmIG93bmVySUQgPT09IG5vZGUub3duZXJJRCkge1xuICAgIHJldHVybiBub2RlO1xuICB9XG4gIHJldHVybiBuZXcgVk5vZGUobm9kZSA/IG5vZGUuYXJyYXkuc2xpY2UoKSA6IFtdLCBvd25lcklEKTtcbn1cblxuZnVuY3Rpb24gbGlzdE5vZGVGb3IobGlzdCwgcmF3SW5kZXgpIHtcbiAgaWYgKHJhd0luZGV4ID49IGdldFRhaWxPZmZzZXQobGlzdC5fY2FwYWNpdHkpKSB7XG4gICAgcmV0dXJuIGxpc3QuX3RhaWw7XG4gIH1cbiAgaWYgKHJhd0luZGV4IDwgMSA8PCAobGlzdC5fbGV2ZWwgKyBTSElGVCkpIHtcbiAgICB2YXIgbm9kZSA9IGxpc3QuX3Jvb3Q7XG4gICAgdmFyIGxldmVsID0gbGlzdC5fbGV2ZWw7XG4gICAgd2hpbGUgKG5vZGUgJiYgbGV2ZWwgPiAwKSB7XG4gICAgICBub2RlID0gbm9kZS5hcnJheVsocmF3SW5kZXggPj4+IGxldmVsKSAmIE1BU0tdO1xuICAgICAgbGV2ZWwgLT0gU0hJRlQ7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldExpc3RCb3VuZHMobGlzdCwgYmVnaW4sIGVuZCkge1xuICAvLyBTYW5pdGl6ZSBiZWdpbiAmIGVuZCB1c2luZyB0aGlzIHNob3J0aGFuZCBmb3IgVG9JbnQzMihhcmd1bWVudClcbiAgLy8gaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXRvaW50MzJcbiAgaWYgKGJlZ2luICE9PSB1bmRlZmluZWQpIHtcbiAgICBiZWdpbiB8PSAwO1xuICB9XG4gIGlmIChlbmQgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCB8PSAwO1xuICB9XG4gIHZhciBvd25lciA9IGxpc3QuX19vd25lcklEIHx8IG5ldyBPd25lcklEKCk7XG4gIHZhciBvbGRPcmlnaW4gPSBsaXN0Ll9vcmlnaW47XG4gIHZhciBvbGRDYXBhY2l0eSA9IGxpc3QuX2NhcGFjaXR5O1xuICB2YXIgbmV3T3JpZ2luID0gb2xkT3JpZ2luICsgYmVnaW47XG4gIHZhciBuZXdDYXBhY2l0eSA9XG4gICAgZW5kID09PSB1bmRlZmluZWRcbiAgICAgID8gb2xkQ2FwYWNpdHlcbiAgICAgIDogZW5kIDwgMFxuICAgICAgICA/IG9sZENhcGFjaXR5ICsgZW5kXG4gICAgICAgIDogb2xkT3JpZ2luICsgZW5kO1xuICBpZiAobmV3T3JpZ2luID09PSBvbGRPcmlnaW4gJiYgbmV3Q2FwYWNpdHkgPT09IG9sZENhcGFjaXR5KSB7XG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cblxuICAvLyBJZiBpdCdzIGdvaW5nIHRvIGVuZCBhZnRlciBpdCBzdGFydHMsIGl0J3MgZW1wdHkuXG4gIGlmIChuZXdPcmlnaW4gPj0gbmV3Q2FwYWNpdHkpIHtcbiAgICByZXR1cm4gbGlzdC5jbGVhcigpO1xuICB9XG5cbiAgdmFyIG5ld0xldmVsID0gbGlzdC5fbGV2ZWw7XG4gIHZhciBuZXdSb290ID0gbGlzdC5fcm9vdDtcblxuICAvLyBOZXcgb3JpZ2luIG1pZ2h0IG5lZWQgY3JlYXRpbmcgYSBoaWdoZXIgcm9vdC5cbiAgdmFyIG9mZnNldFNoaWZ0ID0gMDtcbiAgd2hpbGUgKG5ld09yaWdpbiArIG9mZnNldFNoaWZ0IDwgMCkge1xuICAgIG5ld1Jvb3QgPSBuZXcgVk5vZGUoXG4gICAgICBuZXdSb290ICYmIG5ld1Jvb3QuYXJyYXkubGVuZ3RoID8gW3VuZGVmaW5lZCwgbmV3Um9vdF0gOiBbXSxcbiAgICAgIG93bmVyXG4gICAgKTtcbiAgICBuZXdMZXZlbCArPSBTSElGVDtcbiAgICBvZmZzZXRTaGlmdCArPSAxIDw8IG5ld0xldmVsO1xuICB9XG4gIGlmIChvZmZzZXRTaGlmdCkge1xuICAgIG5ld09yaWdpbiArPSBvZmZzZXRTaGlmdDtcbiAgICBvbGRPcmlnaW4gKz0gb2Zmc2V0U2hpZnQ7XG4gICAgbmV3Q2FwYWNpdHkgKz0gb2Zmc2V0U2hpZnQ7XG4gICAgb2xkQ2FwYWNpdHkgKz0gb2Zmc2V0U2hpZnQ7XG4gIH1cblxuICB2YXIgb2xkVGFpbE9mZnNldCA9IGdldFRhaWxPZmZzZXQob2xkQ2FwYWNpdHkpO1xuICB2YXIgbmV3VGFpbE9mZnNldCA9IGdldFRhaWxPZmZzZXQobmV3Q2FwYWNpdHkpO1xuXG4gIC8vIE5ldyBzaXplIG1pZ2h0IG5lZWQgY3JlYXRpbmcgYSBoaWdoZXIgcm9vdC5cbiAgd2hpbGUgKG5ld1RhaWxPZmZzZXQgPj0gMSA8PCAobmV3TGV2ZWwgKyBTSElGVCkpIHtcbiAgICBuZXdSb290ID0gbmV3IFZOb2RlKFxuICAgICAgbmV3Um9vdCAmJiBuZXdSb290LmFycmF5Lmxlbmd0aCA/IFtuZXdSb290XSA6IFtdLFxuICAgICAgb3duZXJcbiAgICApO1xuICAgIG5ld0xldmVsICs9IFNISUZUO1xuICB9XG5cbiAgLy8gTG9jYXRlIG9yIGNyZWF0ZSB0aGUgbmV3IHRhaWwuXG4gIHZhciBvbGRUYWlsID0gbGlzdC5fdGFpbDtcbiAgdmFyIG5ld1RhaWwgPVxuICAgIG5ld1RhaWxPZmZzZXQgPCBvbGRUYWlsT2Zmc2V0XG4gICAgICA/IGxpc3ROb2RlRm9yKGxpc3QsIG5ld0NhcGFjaXR5IC0gMSlcbiAgICAgIDogbmV3VGFpbE9mZnNldCA+IG9sZFRhaWxPZmZzZXRcbiAgICAgICAgPyBuZXcgVk5vZGUoW10sIG93bmVyKVxuICAgICAgICA6IG9sZFRhaWw7XG5cbiAgLy8gTWVyZ2UgVGFpbCBpbnRvIHRyZWUuXG4gIGlmIChcbiAgICBvbGRUYWlsICYmXG4gICAgbmV3VGFpbE9mZnNldCA+IG9sZFRhaWxPZmZzZXQgJiZcbiAgICBuZXdPcmlnaW4gPCBvbGRDYXBhY2l0eSAmJlxuICAgIG9sZFRhaWwuYXJyYXkubGVuZ3RoXG4gICkge1xuICAgIG5ld1Jvb3QgPSBlZGl0YWJsZVZOb2RlKG5ld1Jvb3QsIG93bmVyKTtcbiAgICB2YXIgbm9kZSA9IG5ld1Jvb3Q7XG4gICAgZm9yICh2YXIgbGV2ZWwgPSBuZXdMZXZlbDsgbGV2ZWwgPiBTSElGVDsgbGV2ZWwgLT0gU0hJRlQpIHtcbiAgICAgIHZhciBpZHggPSAob2xkVGFpbE9mZnNldCA+Pj4gbGV2ZWwpICYgTUFTSztcbiAgICAgIG5vZGUgPSBub2RlLmFycmF5W2lkeF0gPSBlZGl0YWJsZVZOb2RlKG5vZGUuYXJyYXlbaWR4XSwgb3duZXIpO1xuICAgIH1cbiAgICBub2RlLmFycmF5WyhvbGRUYWlsT2Zmc2V0ID4+PiBTSElGVCkgJiBNQVNLXSA9IG9sZFRhaWw7XG4gIH1cblxuICAvLyBJZiB0aGUgc2l6ZSBoYXMgYmVlbiByZWR1Y2VkLCB0aGVyZSdzIGEgY2hhbmNlIHRoZSB0YWlsIG5lZWRzIHRvIGJlIHRyaW1tZWQuXG4gIGlmIChuZXdDYXBhY2l0eSA8IG9sZENhcGFjaXR5KSB7XG4gICAgbmV3VGFpbCA9IG5ld1RhaWwgJiYgbmV3VGFpbC5yZW1vdmVBZnRlcihvd25lciwgMCwgbmV3Q2FwYWNpdHkpO1xuICB9XG5cbiAgLy8gSWYgdGhlIG5ldyBvcmlnaW4gaXMgd2l0aGluIHRoZSB0YWlsLCB0aGVuIHdlIGRvIG5vdCBuZWVkIGEgcm9vdC5cbiAgaWYgKG5ld09yaWdpbiA+PSBuZXdUYWlsT2Zmc2V0KSB7XG4gICAgbmV3T3JpZ2luIC09IG5ld1RhaWxPZmZzZXQ7XG4gICAgbmV3Q2FwYWNpdHkgLT0gbmV3VGFpbE9mZnNldDtcbiAgICBuZXdMZXZlbCA9IFNISUZUO1xuICAgIG5ld1Jvb3QgPSBudWxsO1xuICAgIG5ld1RhaWwgPSBuZXdUYWlsICYmIG5ld1RhaWwucmVtb3ZlQmVmb3JlKG93bmVyLCAwLCBuZXdPcmlnaW4pO1xuXG4gICAgLy8gT3RoZXJ3aXNlLCBpZiB0aGUgcm9vdCBoYXMgYmVlbiB0cmltbWVkLCBnYXJiYWdlIGNvbGxlY3QuXG4gIH0gZWxzZSBpZiAobmV3T3JpZ2luID4gb2xkT3JpZ2luIHx8IG5ld1RhaWxPZmZzZXQgPCBvbGRUYWlsT2Zmc2V0KSB7XG4gICAgb2Zmc2V0U2hpZnQgPSAwO1xuXG4gICAgLy8gSWRlbnRpZnkgdGhlIG5ldyB0b3Agcm9vdCBub2RlIG9mIHRoZSBzdWJ0cmVlIG9mIHRoZSBvbGQgcm9vdC5cbiAgICB3aGlsZSAobmV3Um9vdCkge1xuICAgICAgdmFyIGJlZ2luSW5kZXggPSAobmV3T3JpZ2luID4+PiBuZXdMZXZlbCkgJiBNQVNLO1xuICAgICAgaWYgKChiZWdpbkluZGV4ICE9PSBuZXdUYWlsT2Zmc2V0ID4+PiBuZXdMZXZlbCkgJiBNQVNLKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGJlZ2luSW5kZXgpIHtcbiAgICAgICAgb2Zmc2V0U2hpZnQgKz0gKDEgPDwgbmV3TGV2ZWwpICogYmVnaW5JbmRleDtcbiAgICAgIH1cbiAgICAgIG5ld0xldmVsIC09IFNISUZUO1xuICAgICAgbmV3Um9vdCA9IG5ld1Jvb3QuYXJyYXlbYmVnaW5JbmRleF07XG4gICAgfVxuXG4gICAgLy8gVHJpbSB0aGUgbmV3IHNpZGVzIG9mIHRoZSBuZXcgcm9vdC5cbiAgICBpZiAobmV3Um9vdCAmJiBuZXdPcmlnaW4gPiBvbGRPcmlnaW4pIHtcbiAgICAgIG5ld1Jvb3QgPSBuZXdSb290LnJlbW92ZUJlZm9yZShvd25lciwgbmV3TGV2ZWwsIG5ld09yaWdpbiAtIG9mZnNldFNoaWZ0KTtcbiAgICB9XG4gICAgaWYgKG5ld1Jvb3QgJiYgbmV3VGFpbE9mZnNldCA8IG9sZFRhaWxPZmZzZXQpIHtcbiAgICAgIG5ld1Jvb3QgPSBuZXdSb290LnJlbW92ZUFmdGVyKFxuICAgICAgICBvd25lcixcbiAgICAgICAgbmV3TGV2ZWwsXG4gICAgICAgIG5ld1RhaWxPZmZzZXQgLSBvZmZzZXRTaGlmdFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG9mZnNldFNoaWZ0KSB7XG4gICAgICBuZXdPcmlnaW4gLT0gb2Zmc2V0U2hpZnQ7XG4gICAgICBuZXdDYXBhY2l0eSAtPSBvZmZzZXRTaGlmdDtcbiAgICB9XG4gIH1cblxuICBpZiAobGlzdC5fX293bmVySUQpIHtcbiAgICBsaXN0LnNpemUgPSBuZXdDYXBhY2l0eSAtIG5ld09yaWdpbjtcbiAgICBsaXN0Ll9vcmlnaW4gPSBuZXdPcmlnaW47XG4gICAgbGlzdC5fY2FwYWNpdHkgPSBuZXdDYXBhY2l0eTtcbiAgICBsaXN0Ll9sZXZlbCA9IG5ld0xldmVsO1xuICAgIGxpc3QuX3Jvb3QgPSBuZXdSb290O1xuICAgIGxpc3QuX3RhaWwgPSBuZXdUYWlsO1xuICAgIGxpc3QuX19oYXNoID0gdW5kZWZpbmVkO1xuICAgIGxpc3QuX19hbHRlcmVkID0gdHJ1ZTtcbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuICByZXR1cm4gbWFrZUxpc3QobmV3T3JpZ2luLCBuZXdDYXBhY2l0eSwgbmV3TGV2ZWwsIG5ld1Jvb3QsIG5ld1RhaWwpO1xufVxuXG5mdW5jdGlvbiBnZXRUYWlsT2Zmc2V0KHNpemUpIHtcbiAgcmV0dXJuIHNpemUgPCBTSVpFID8gMCA6ICgoc2l6ZSAtIDEpID4+PiBTSElGVCkgPDwgU0hJRlQ7XG59XG5cbnZhciBPcmRlcmVkTWFwID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoTWFwJCQxKSB7XG4gIGZ1bmN0aW9uIE9yZGVyZWRNYXAodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbXB0eU9yZGVyZWRNYXAoKVxuICAgICAgOiBpc09yZGVyZWRNYXAodmFsdWUpXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiBlbXB0eU9yZGVyZWRNYXAoKS53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgICAgICAgIHZhciBpdGVyID0gS2V5ZWRDb2xsZWN0aW9uKHZhbHVlKTtcbiAgICAgICAgICAgIGFzc2VydE5vdEluZmluaXRlKGl0ZXIuc2l6ZSk7XG4gICAgICAgICAgICBpdGVyLmZvckVhY2goZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIG1hcC5zZXQoaywgdik7IH0pO1xuICAgICAgICAgIH0pO1xuICB9XG5cbiAgaWYgKCBNYXAkJDEgKSBPcmRlcmVkTWFwLl9fcHJvdG9fXyA9IE1hcCQkMTtcbiAgT3JkZXJlZE1hcC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBNYXAkJDEgJiYgTWFwJCQxLnByb3RvdHlwZSApO1xuICBPcmRlcmVkTWFwLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE9yZGVyZWRNYXA7XG5cbiAgT3JkZXJlZE1hcC5vZiA9IGZ1bmN0aW9uIG9mICgvKi4uLnZhbHVlcyovKSB7XG4gICAgcmV0dXJuIHRoaXMoYXJndW1lbnRzKTtcbiAgfTtcblxuICBPcmRlcmVkTWFwLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RvU3RyaW5nKCdPcmRlcmVkTWFwIHsnLCAnfScpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgQWNjZXNzXG5cbiAgT3JkZXJlZE1hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChrLCBub3RTZXRWYWx1ZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMuX21hcC5nZXQoayk7XG4gICAgcmV0dXJuIGluZGV4ICE9PSB1bmRlZmluZWQgPyB0aGlzLl9saXN0LmdldChpbmRleClbMV0gOiBub3RTZXRWYWx1ZTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIE1vZGlmaWNhdGlvblxuXG4gIE9yZGVyZWRNYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAodGhpcy5fX293bmVySUQpIHtcbiAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgICB0aGlzLl9tYXAuY2xlYXIoKTtcbiAgICAgIHRoaXMuX2xpc3QuY2xlYXIoKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gZW1wdHlPcmRlcmVkTWFwKCk7XG4gIH07XG5cbiAgT3JkZXJlZE1hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0IChrLCB2KSB7XG4gICAgcmV0dXJuIHVwZGF0ZU9yZGVyZWRNYXAodGhpcywgaywgdik7XG4gIH07XG5cbiAgT3JkZXJlZE1hcC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlIChrKSB7XG4gICAgcmV0dXJuIHVwZGF0ZU9yZGVyZWRNYXAodGhpcywgaywgTk9UX1NFVCk7XG4gIH07XG5cbiAgT3JkZXJlZE1hcC5wcm90b3R5cGUud2FzQWx0ZXJlZCA9IGZ1bmN0aW9uIHdhc0FsdGVyZWQgKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXAud2FzQWx0ZXJlZCgpIHx8IHRoaXMuX2xpc3Qud2FzQWx0ZXJlZCgpO1xuICB9O1xuXG4gIE9yZGVyZWRNYXAucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzLl9saXN0Ll9faXRlcmF0ZShcbiAgICAgIGZ1bmN0aW9uIChlbnRyeSkgeyByZXR1cm4gZW50cnkgJiYgZm4oZW50cnlbMV0sIGVudHJ5WzBdLCB0aGlzJDEpOyB9LFxuICAgICAgcmV2ZXJzZVxuICAgICk7XG4gIH07XG5cbiAgT3JkZXJlZE1hcC5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdC5mcm9tRW50cnlTZXEoKS5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICB9O1xuXG4gIE9yZGVyZWRNYXAucHJvdG90eXBlLl9fZW5zdXJlT3duZXIgPSBmdW5jdGlvbiBfX2Vuc3VyZU93bmVyIChvd25lcklEKSB7XG4gICAgaWYgKG93bmVySUQgPT09IHRoaXMuX19vd25lcklEKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdmFyIG5ld01hcCA9IHRoaXMuX21hcC5fX2Vuc3VyZU93bmVyKG93bmVySUQpO1xuICAgIHZhciBuZXdMaXN0ID0gdGhpcy5fbGlzdC5fX2Vuc3VyZU93bmVyKG93bmVySUQpO1xuICAgIGlmICghb3duZXJJRCkge1xuICAgICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZW1wdHlPcmRlcmVkTWFwKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fb3duZXJJRCA9IG93bmVySUQ7XG4gICAgICB0aGlzLl9tYXAgPSBuZXdNYXA7XG4gICAgICB0aGlzLl9saXN0ID0gbmV3TGlzdDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gbWFrZU9yZGVyZWRNYXAobmV3TWFwLCBuZXdMaXN0LCBvd25lcklELCB0aGlzLl9faGFzaCk7XG4gIH07XG5cbiAgcmV0dXJuIE9yZGVyZWRNYXA7XG59KE1hcCkpO1xuXG5PcmRlcmVkTWFwLmlzT3JkZXJlZE1hcCA9IGlzT3JkZXJlZE1hcDtcblxuT3JkZXJlZE1hcC5wcm90b3R5cGVbSVNfT1JERVJFRF9TWU1CT0xdID0gdHJ1ZTtcbk9yZGVyZWRNYXAucHJvdG90eXBlW0RFTEVURV0gPSBPcmRlcmVkTWFwLnByb3RvdHlwZS5yZW1vdmU7XG5cbmZ1bmN0aW9uIG1ha2VPcmRlcmVkTWFwKG1hcCwgbGlzdCwgb3duZXJJRCwgaGFzaCkge1xuICB2YXIgb21hcCA9IE9iamVjdC5jcmVhdGUoT3JkZXJlZE1hcC5wcm90b3R5cGUpO1xuICBvbWFwLnNpemUgPSBtYXAgPyBtYXAuc2l6ZSA6IDA7XG4gIG9tYXAuX21hcCA9IG1hcDtcbiAgb21hcC5fbGlzdCA9IGxpc3Q7XG4gIG9tYXAuX19vd25lcklEID0gb3duZXJJRDtcbiAgb21hcC5fX2hhc2ggPSBoYXNoO1xuICByZXR1cm4gb21hcDtcbn1cblxudmFyIEVNUFRZX09SREVSRURfTUFQO1xuZnVuY3Rpb24gZW1wdHlPcmRlcmVkTWFwKCkge1xuICByZXR1cm4gKFxuICAgIEVNUFRZX09SREVSRURfTUFQIHx8XG4gICAgKEVNUFRZX09SREVSRURfTUFQID0gbWFrZU9yZGVyZWRNYXAoZW1wdHlNYXAoKSwgZW1wdHlMaXN0KCkpKVxuICApO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVPcmRlcmVkTWFwKG9tYXAsIGssIHYpIHtcbiAgdmFyIG1hcCA9IG9tYXAuX21hcDtcbiAgdmFyIGxpc3QgPSBvbWFwLl9saXN0O1xuICB2YXIgaSA9IG1hcC5nZXQoayk7XG4gIHZhciBoYXMgPSBpICE9PSB1bmRlZmluZWQ7XG4gIHZhciBuZXdNYXA7XG4gIHZhciBuZXdMaXN0O1xuICBpZiAodiA9PT0gTk9UX1NFVCkge1xuICAgIC8vIHJlbW92ZWRcbiAgICBpZiAoIWhhcykge1xuICAgICAgcmV0dXJuIG9tYXA7XG4gICAgfVxuICAgIGlmIChsaXN0LnNpemUgPj0gU0laRSAmJiBsaXN0LnNpemUgPj0gbWFwLnNpemUgKiAyKSB7XG4gICAgICBuZXdMaXN0ID0gbGlzdC5maWx0ZXIoZnVuY3Rpb24gKGVudHJ5LCBpZHgpIHsgcmV0dXJuIGVudHJ5ICE9PSB1bmRlZmluZWQgJiYgaSAhPT0gaWR4OyB9KTtcbiAgICAgIG5ld01hcCA9IG5ld0xpc3RcbiAgICAgICAgLnRvS2V5ZWRTZXEoKVxuICAgICAgICAubWFwKGZ1bmN0aW9uIChlbnRyeSkgeyByZXR1cm4gZW50cnlbMF07IH0pXG4gICAgICAgIC5mbGlwKClcbiAgICAgICAgLnRvTWFwKCk7XG4gICAgICBpZiAob21hcC5fX293bmVySUQpIHtcbiAgICAgICAgbmV3TWFwLl9fb3duZXJJRCA9IG5ld0xpc3QuX19vd25lcklEID0gb21hcC5fX293bmVySUQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld01hcCA9IG1hcC5yZW1vdmUoayk7XG4gICAgICBuZXdMaXN0ID0gaSA9PT0gbGlzdC5zaXplIC0gMSA/IGxpc3QucG9wKCkgOiBsaXN0LnNldChpLCB1bmRlZmluZWQpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChoYXMpIHtcbiAgICBpZiAodiA9PT0gbGlzdC5nZXQoaSlbMV0pIHtcbiAgICAgIHJldHVybiBvbWFwO1xuICAgIH1cbiAgICBuZXdNYXAgPSBtYXA7XG4gICAgbmV3TGlzdCA9IGxpc3Quc2V0KGksIFtrLCB2XSk7XG4gIH0gZWxzZSB7XG4gICAgbmV3TWFwID0gbWFwLnNldChrLCBsaXN0LnNpemUpO1xuICAgIG5ld0xpc3QgPSBsaXN0LnNldChsaXN0LnNpemUsIFtrLCB2XSk7XG4gIH1cbiAgaWYgKG9tYXAuX19vd25lcklEKSB7XG4gICAgb21hcC5zaXplID0gbmV3TWFwLnNpemU7XG4gICAgb21hcC5fbWFwID0gbmV3TWFwO1xuICAgIG9tYXAuX2xpc3QgPSBuZXdMaXN0O1xuICAgIG9tYXAuX19oYXNoID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBvbWFwO1xuICB9XG4gIHJldHVybiBtYWtlT3JkZXJlZE1hcChuZXdNYXAsIG5ld0xpc3QpO1xufVxuXG52YXIgSVNfU1RBQ0tfU1lNQk9MID0gJ0BAX19JTU1VVEFCTEVfU1RBQ0tfX0BAJztcblxuZnVuY3Rpb24gaXNTdGFjayhtYXliZVN0YWNrKSB7XG4gIHJldHVybiBCb29sZWFuKG1heWJlU3RhY2sgJiYgbWF5YmVTdGFja1tJU19TVEFDS19TWU1CT0xdKTtcbn1cblxudmFyIFN0YWNrID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoSW5kZXhlZENvbGxlY3Rpb24kJDEpIHtcbiAgZnVuY3Rpb24gU3RhY2sodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbXB0eVN0YWNrKClcbiAgICAgIDogaXNTdGFjayh2YWx1ZSlcbiAgICAgICAgPyB2YWx1ZVxuICAgICAgICA6IGVtcHR5U3RhY2soKS5wdXNoQWxsKHZhbHVlKTtcbiAgfVxuXG4gIGlmICggSW5kZXhlZENvbGxlY3Rpb24kJDEgKSBTdGFjay5fX3Byb3RvX18gPSBJbmRleGVkQ29sbGVjdGlvbiQkMTtcbiAgU3RhY2sucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggSW5kZXhlZENvbGxlY3Rpb24kJDEgJiYgSW5kZXhlZENvbGxlY3Rpb24kJDEucHJvdG90eXBlICk7XG4gIFN0YWNrLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN0YWNrO1xuXG4gIFN0YWNrLm9mID0gZnVuY3Rpb24gb2YgKC8qLi4udmFsdWVzKi8pIHtcbiAgICByZXR1cm4gdGhpcyhhcmd1bWVudHMpO1xuICB9O1xuXG4gIFN0YWNrLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RvU3RyaW5nKCdTdGFjayBbJywgJ10nKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIEFjY2Vzc1xuXG4gIFN0YWNrLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGluZGV4LCBub3RTZXRWYWx1ZSkge1xuICAgIHZhciBoZWFkID0gdGhpcy5faGVhZDtcbiAgICBpbmRleCA9IHdyYXBJbmRleCh0aGlzLCBpbmRleCk7XG4gICAgd2hpbGUgKGhlYWQgJiYgaW5kZXgtLSkge1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWQgPyBoZWFkLnZhbHVlIDogbm90U2V0VmFsdWU7XG4gIH07XG5cbiAgU3RhY2sucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiBwZWVrICgpIHtcbiAgICByZXR1cm4gdGhpcy5faGVhZCAmJiB0aGlzLl9oZWFkLnZhbHVlO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgTW9kaWZpY2F0aW9uXG5cbiAgU3RhY2sucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoICgvKi4uLnZhbHVlcyovKSB7XG4gICAgdmFyIGFyZ3VtZW50cyQxID0gYXJndW1lbnRzO1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgbmV3U2l6ZSA9IHRoaXMuc2l6ZSArIGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIGhlYWQgPSB0aGlzLl9oZWFkO1xuICAgIGZvciAodmFyIGlpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGlpID49IDA7IGlpLS0pIHtcbiAgICAgIGhlYWQgPSB7XG4gICAgICAgIHZhbHVlOiBhcmd1bWVudHMkMVtpaV0sXG4gICAgICAgIG5leHQ6IGhlYWQsXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAodGhpcy5fX293bmVySUQpIHtcbiAgICAgIHRoaXMuc2l6ZSA9IG5ld1NpemU7XG4gICAgICB0aGlzLl9oZWFkID0gaGVhZDtcbiAgICAgIHRoaXMuX19oYXNoID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fX2FsdGVyZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBtYWtlU3RhY2sobmV3U2l6ZSwgaGVhZCk7XG4gIH07XG5cbiAgU3RhY2sucHJvdG90eXBlLnB1c2hBbGwgPSBmdW5jdGlvbiBwdXNoQWxsIChpdGVyKSB7XG4gICAgaXRlciA9IEluZGV4ZWRDb2xsZWN0aW9uJCQxKGl0ZXIpO1xuICAgIGlmIChpdGVyLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaXplID09PSAwICYmIGlzU3RhY2soaXRlcikpIHtcbiAgICAgIHJldHVybiBpdGVyO1xuICAgIH1cbiAgICBhc3NlcnROb3RJbmZpbml0ZShpdGVyLnNpemUpO1xuICAgIHZhciBuZXdTaXplID0gdGhpcy5zaXplO1xuICAgIHZhciBoZWFkID0gdGhpcy5faGVhZDtcbiAgICBpdGVyLl9faXRlcmF0ZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIG5ld1NpemUrKztcbiAgICAgIGhlYWQgPSB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgbmV4dDogaGVhZCxcbiAgICAgIH07XG4gICAgfSwgLyogcmV2ZXJzZSAqLyB0cnVlKTtcbiAgICBpZiAodGhpcy5fX293bmVySUQpIHtcbiAgICAgIHRoaXMuc2l6ZSA9IG5ld1NpemU7XG4gICAgICB0aGlzLl9oZWFkID0gaGVhZDtcbiAgICAgIHRoaXMuX19oYXNoID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fX2FsdGVyZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBtYWtlU3RhY2sobmV3U2l6ZSwgaGVhZCk7XG4gIH07XG5cbiAgU3RhY2sucHJvdG90eXBlLnBvcCA9IGZ1bmN0aW9uIHBvcCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2xpY2UoMSk7XG4gIH07XG5cbiAgU3RhY2sucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAodGhpcy5fX293bmVySUQpIHtcbiAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgICB0aGlzLl9oZWFkID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fX2hhc2ggPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9fYWx0ZXJlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIGVtcHR5U3RhY2soKTtcbiAgfTtcblxuICBTdGFjay5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoYmVnaW4sIGVuZCkge1xuICAgIGlmICh3aG9sZVNsaWNlKGJlZ2luLCBlbmQsIHRoaXMuc2l6ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgcmVzb2x2ZWRCZWdpbiA9IHJlc29sdmVCZWdpbihiZWdpbiwgdGhpcy5zaXplKTtcbiAgICB2YXIgcmVzb2x2ZWRFbmQgPSByZXNvbHZlRW5kKGVuZCwgdGhpcy5zaXplKTtcbiAgICBpZiAocmVzb2x2ZWRFbmQgIT09IHRoaXMuc2l6ZSkge1xuICAgICAgLy8gc3VwZXIuc2xpY2UoYmVnaW4sIGVuZCk7XG4gICAgICByZXR1cm4gSW5kZXhlZENvbGxlY3Rpb24kJDEucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcywgYmVnaW4sIGVuZCk7XG4gICAgfVxuICAgIHZhciBuZXdTaXplID0gdGhpcy5zaXplIC0gcmVzb2x2ZWRCZWdpbjtcbiAgICB2YXIgaGVhZCA9IHRoaXMuX2hlYWQ7XG4gICAgd2hpbGUgKHJlc29sdmVkQmVnaW4tLSkge1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX19vd25lcklEKSB7XG4gICAgICB0aGlzLnNpemUgPSBuZXdTaXplO1xuICAgICAgdGhpcy5faGVhZCA9IGhlYWQ7XG4gICAgICB0aGlzLl9faGFzaCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX19hbHRlcmVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gbWFrZVN0YWNrKG5ld1NpemUsIGhlYWQpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgTXV0YWJpbGl0eVxuXG4gIFN0YWNrLnByb3RvdHlwZS5fX2Vuc3VyZU93bmVyID0gZnVuY3Rpb24gX19lbnN1cmVPd25lciAob3duZXJJRCkge1xuICAgIGlmIChvd25lcklEID09PSB0aGlzLl9fb3duZXJJRCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICghb3duZXJJRCkge1xuICAgICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZW1wdHlTdGFjaygpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX293bmVySUQgPSBvd25lcklEO1xuICAgICAgdGhpcy5fX2FsdGVyZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gbWFrZVN0YWNrKHRoaXMuc2l6ZSwgdGhpcy5faGVhZCwgb3duZXJJRCwgdGhpcy5fX2hhc2gpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgSXRlcmF0aW9uXG5cbiAgU3RhY2sucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICByZXR1cm4gbmV3IEFycmF5U2VxKHRoaXMudG9BcnJheSgpKS5fX2l0ZXJhdGUoXG4gICAgICAgIGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBmbih2LCBrLCB0aGlzJDEpOyB9LFxuICAgICAgICByZXZlcnNlXG4gICAgICApO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgdmFyIG5vZGUgPSB0aGlzLl9oZWFkO1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICBpZiAoZm4obm9kZS52YWx1ZSwgaXRlcmF0aW9ucysrLCB0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgIH1cbiAgICByZXR1cm4gaXRlcmF0aW9ucztcbiAgfTtcblxuICBTdGFjay5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIG5ldyBBcnJheVNlcSh0aGlzLnRvQXJyYXkoKSkuX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgICB9XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHZhciBub2RlID0gdGhpcy5faGVhZDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IG5vZGUudmFsdWU7XG4gICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKHR5cGUsIGl0ZXJhdGlvbnMrKywgdmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZXJhdG9yRG9uZSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBTdGFjaztcbn0oSW5kZXhlZENvbGxlY3Rpb24pKTtcblxuU3RhY2suaXNTdGFjayA9IGlzU3RhY2s7XG5cbnZhciBTdGFja1Byb3RvdHlwZSA9IFN0YWNrLnByb3RvdHlwZTtcblN0YWNrUHJvdG90eXBlW0lTX1NUQUNLX1NZTUJPTF0gPSB0cnVlO1xuU3RhY2tQcm90b3R5cGUuc2hpZnQgPSBTdGFja1Byb3RvdHlwZS5wb3A7XG5TdGFja1Byb3RvdHlwZS51bnNoaWZ0ID0gU3RhY2tQcm90b3R5cGUucHVzaDtcblN0YWNrUHJvdG90eXBlLnVuc2hpZnRBbGwgPSBTdGFja1Byb3RvdHlwZS5wdXNoQWxsO1xuU3RhY2tQcm90b3R5cGUud2l0aE11dGF0aW9ucyA9IHdpdGhNdXRhdGlvbnM7XG5TdGFja1Byb3RvdHlwZS53YXNBbHRlcmVkID0gd2FzQWx0ZXJlZDtcblN0YWNrUHJvdG90eXBlLmFzSW1tdXRhYmxlID0gYXNJbW11dGFibGU7XG5TdGFja1Byb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IFN0YWNrUHJvdG90eXBlLmFzTXV0YWJsZSA9IGFzTXV0YWJsZTtcblN0YWNrUHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBhcnIpIHtcbiAgcmV0dXJuIHJlc3VsdC51bnNoaWZ0KGFycik7XG59O1xuU3RhY2tQcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqLmFzSW1tdXRhYmxlKCk7XG59O1xuXG5mdW5jdGlvbiBtYWtlU3RhY2soc2l6ZSwgaGVhZCwgb3duZXJJRCwgaGFzaCkge1xuICB2YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShTdGFja1Byb3RvdHlwZSk7XG4gIG1hcC5zaXplID0gc2l6ZTtcbiAgbWFwLl9oZWFkID0gaGVhZDtcbiAgbWFwLl9fb3duZXJJRCA9IG93bmVySUQ7XG4gIG1hcC5fX2hhc2ggPSBoYXNoO1xuICBtYXAuX19hbHRlcmVkID0gZmFsc2U7XG4gIHJldHVybiBtYXA7XG59XG5cbnZhciBFTVBUWV9TVEFDSztcbmZ1bmN0aW9uIGVtcHR5U3RhY2soKSB7XG4gIHJldHVybiBFTVBUWV9TVEFDSyB8fCAoRU1QVFlfU1RBQ0sgPSBtYWtlU3RhY2soMCkpO1xufVxuXG52YXIgSVNfU0VUX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX1NFVF9fQEAnO1xuXG5mdW5jdGlvbiBpc1NldChtYXliZVNldCkge1xuICByZXR1cm4gQm9vbGVhbihtYXliZVNldCAmJiBtYXliZVNldFtJU19TRVRfU1lNQk9MXSk7XG59XG5cbmZ1bmN0aW9uIGlzT3JkZXJlZFNldChtYXliZU9yZGVyZWRTZXQpIHtcbiAgcmV0dXJuIGlzU2V0KG1heWJlT3JkZXJlZFNldCkgJiYgaXNPcmRlcmVkKG1heWJlT3JkZXJlZFNldCk7XG59XG5cbmZ1bmN0aW9uIGRlZXBFcXVhbChhLCBiKSB7XG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoXG4gICAgIWlzQ29sbGVjdGlvbihiKSB8fFxuICAgIChhLnNpemUgIT09IHVuZGVmaW5lZCAmJiBiLnNpemUgIT09IHVuZGVmaW5lZCAmJiBhLnNpemUgIT09IGIuc2l6ZSkgfHxcbiAgICAoYS5fX2hhc2ggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgYi5fX2hhc2ggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgYS5fX2hhc2ggIT09IGIuX19oYXNoKSB8fFxuICAgIGlzS2V5ZWQoYSkgIT09IGlzS2V5ZWQoYikgfHxcbiAgICBpc0luZGV4ZWQoYSkgIT09IGlzSW5kZXhlZChiKSB8fFxuICAgIGlzT3JkZXJlZChhKSAhPT0gaXNPcmRlcmVkKGIpXG4gICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChhLnNpemUgPT09IDAgJiYgYi5zaXplID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB2YXIgbm90QXNzb2NpYXRpdmUgPSAhaXNBc3NvY2lhdGl2ZShhKTtcblxuICBpZiAoaXNPcmRlcmVkKGEpKSB7XG4gICAgdmFyIGVudHJpZXMgPSBhLmVudHJpZXMoKTtcbiAgICByZXR1cm4gKFxuICAgICAgYi5ldmVyeShmdW5jdGlvbiAodiwgaykge1xuICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzLm5leHQoKS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIGVudHJ5ICYmIGlzKGVudHJ5WzFdLCB2KSAmJiAobm90QXNzb2NpYXRpdmUgfHwgaXMoZW50cnlbMF0sIGspKTtcbiAgICAgIH0pICYmIGVudHJpZXMubmV4dCgpLmRvbmVcbiAgICApO1xuICB9XG5cbiAgdmFyIGZsaXBwZWQgPSBmYWxzZTtcblxuICBpZiAoYS5zaXplID09PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoYi5zaXplID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2YgYS5jYWNoZVJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBhLmNhY2hlUmVzdWx0KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsaXBwZWQgPSB0cnVlO1xuICAgICAgdmFyIF8gPSBhO1xuICAgICAgYSA9IGI7XG4gICAgICBiID0gXztcbiAgICB9XG4gIH1cblxuICB2YXIgYWxsRXF1YWwgPSB0cnVlO1xuICB2YXIgYlNpemUgPSBiLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaykge1xuICAgIGlmIChcbiAgICAgIG5vdEFzc29jaWF0aXZlXG4gICAgICAgID8gIWEuaGFzKHYpXG4gICAgICAgIDogZmxpcHBlZFxuICAgICAgICAgID8gIWlzKHYsIGEuZ2V0KGssIE5PVF9TRVQpKVxuICAgICAgICAgIDogIWlzKGEuZ2V0KGssIE5PVF9TRVQpLCB2KVxuICAgICkge1xuICAgICAgYWxsRXF1YWwgPSBmYWxzZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBhbGxFcXVhbCAmJiBhLnNpemUgPT09IGJTaXplO1xufVxuXG4vKipcbiAqIENvbnRyaWJ1dGVzIGFkZGl0aW9uYWwgbWV0aG9kcyB0byBhIGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIG1peGluKGN0b3IsIG1ldGhvZHMpIHtcbiAgdmFyIGtleUNvcGllciA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICBjdG9yLnByb3RvdHlwZVtrZXldID0gbWV0aG9kc1trZXldO1xuICB9O1xuICBPYmplY3Qua2V5cyhtZXRob2RzKS5mb3JFYWNoKGtleUNvcGllcik7XG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiZcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG1ldGhvZHMpLmZvckVhY2goa2V5Q29waWVyKTtcbiAgcmV0dXJuIGN0b3I7XG59XG5cbmZ1bmN0aW9uIHRvSlModmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmICghaXNDb2xsZWN0aW9uKHZhbHVlKSkge1xuICAgIGlmICghaXNEYXRhU3RydWN0dXJlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICB2YWx1ZSA9IFNlcSh2YWx1ZSk7XG4gIH1cbiAgaWYgKGlzS2V5ZWQodmFsdWUpKSB7XG4gICAgdmFyIHJlc3VsdCQxID0ge307XG4gICAgdmFsdWUuX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICByZXN1bHQkMVtrXSA9IHRvSlModik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdCQxO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFsdWUuX19pdGVyYXRlKGZ1bmN0aW9uICh2KSB7XG4gICAgcmVzdWx0LnB1c2godG9KUyh2KSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgU2V0ID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoU2V0Q29sbGVjdGlvbiQkMSkge1xuICBmdW5jdGlvbiBTZXQodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbXB0eVNldCgpXG4gICAgICA6IGlzU2V0KHZhbHVlKSAmJiAhaXNPcmRlcmVkKHZhbHVlKVxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogZW1wdHlTZXQoKS53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChzZXQpIHtcbiAgICAgICAgICAgIHZhciBpdGVyID0gU2V0Q29sbGVjdGlvbiQkMSh2YWx1ZSk7XG4gICAgICAgICAgICBhc3NlcnROb3RJbmZpbml0ZShpdGVyLnNpemUpO1xuICAgICAgICAgICAgaXRlci5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7IHJldHVybiBzZXQuYWRkKHYpOyB9KTtcbiAgICAgICAgICB9KTtcbiAgfVxuXG4gIGlmICggU2V0Q29sbGVjdGlvbiQkMSApIFNldC5fX3Byb3RvX18gPSBTZXRDb2xsZWN0aW9uJCQxO1xuICBTZXQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggU2V0Q29sbGVjdGlvbiQkMSAmJiBTZXRDb2xsZWN0aW9uJCQxLnByb3RvdHlwZSApO1xuICBTZXQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2V0O1xuXG4gIFNldC5vZiA9IGZ1bmN0aW9uIG9mICgvKi4uLnZhbHVlcyovKSB7XG4gICAgcmV0dXJuIHRoaXMoYXJndW1lbnRzKTtcbiAgfTtcblxuICBTZXQuZnJvbUtleXMgPSBmdW5jdGlvbiBmcm9tS2V5cyAodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcyhLZXllZENvbGxlY3Rpb24odmFsdWUpLmtleVNlcSgpKTtcbiAgfTtcblxuICBTZXQuaW50ZXJzZWN0ID0gZnVuY3Rpb24gaW50ZXJzZWN0IChzZXRzKSB7XG4gICAgc2V0cyA9IENvbGxlY3Rpb24oc2V0cykudG9BcnJheSgpO1xuICAgIHJldHVybiBzZXRzLmxlbmd0aFxuICAgICAgPyBTZXRQcm90b3R5cGUuaW50ZXJzZWN0LmFwcGx5KFNldChzZXRzLnBvcCgpKSwgc2V0cylcbiAgICAgIDogZW1wdHlTZXQoKTtcbiAgfTtcblxuICBTZXQudW5pb24gPSBmdW5jdGlvbiB1bmlvbiAoc2V0cykge1xuICAgIHNldHMgPSBDb2xsZWN0aW9uKHNldHMpLnRvQXJyYXkoKTtcbiAgICByZXR1cm4gc2V0cy5sZW5ndGhcbiAgICAgID8gU2V0UHJvdG90eXBlLnVuaW9uLmFwcGx5KFNldChzZXRzLnBvcCgpKSwgc2V0cylcbiAgICAgIDogZW1wdHlTZXQoKTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLl9fdG9TdHJpbmcoJ1NldCB7JywgJ30nKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIEFjY2Vzc1xuXG4gIFNldC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gaGFzICh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9tYXAuaGFzKHZhbHVlKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIE1vZGlmaWNhdGlvblxuXG4gIFNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkICh2YWx1ZSkge1xuICAgIHJldHVybiB1cGRhdGVTZXQodGhpcywgdGhpcy5fbWFwLnNldCh2YWx1ZSwgdmFsdWUpKTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSAodmFsdWUpIHtcbiAgICByZXR1cm4gdXBkYXRlU2V0KHRoaXMsIHRoaXMuX21hcC5yZW1vdmUodmFsdWUpKTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgIHJldHVybiB1cGRhdGVTZXQodGhpcywgdGhpcy5fbWFwLmNsZWFyKCkpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgQ29tcG9zaXRpb25cblxuICBTZXQucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIG1hcCAobWFwcGVyLCBjb250ZXh0KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgcmVtb3ZlcyA9IFtdO1xuICAgIHZhciBhZGRzID0gW107XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdmFyIG1hcHBlZCA9IG1hcHBlci5jYWxsKGNvbnRleHQsIHZhbHVlLCB2YWx1ZSwgdGhpcyQxKTtcbiAgICAgIGlmIChtYXBwZWQgIT09IHZhbHVlKSB7XG4gICAgICAgIHJlbW92ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgIGFkZHMucHVzaChtYXBwZWQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKHNldCkge1xuICAgICAgcmVtb3Zlcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gc2V0LnJlbW92ZSh2YWx1ZSk7IH0pO1xuICAgICAgYWRkcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gc2V0LmFkZCh2YWx1ZSk7IH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIFNldC5wcm90b3R5cGUudW5pb24gPSBmdW5jdGlvbiB1bmlvbiAoKSB7XG4gICAgdmFyIGl0ZXJzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKCBsZW4tLSApIGl0ZXJzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICBpdGVycyA9IGl0ZXJzLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5zaXplICE9PSAwOyB9KTtcbiAgICBpZiAoaXRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCAmJiAhdGhpcy5fX293bmVySUQgJiYgaXRlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3RvcihpdGVyc1swXSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKHNldCkge1xuICAgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGl0ZXJzLmxlbmd0aDsgaWkrKykge1xuICAgICAgICBTZXRDb2xsZWN0aW9uJCQxKGl0ZXJzW2lpXSkuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHNldC5hZGQodmFsdWUpOyB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLmludGVyc2VjdCA9IGZ1bmN0aW9uIGludGVyc2VjdCAoKSB7XG4gICAgdmFyIGl0ZXJzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKCBsZW4tLSApIGl0ZXJzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICBpZiAoaXRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaXRlcnMgPSBpdGVycy5tYXAoZnVuY3Rpb24gKGl0ZXIpIHsgcmV0dXJuIFNldENvbGxlY3Rpb24kJDEoaXRlcik7IH0pO1xuICAgIHZhciB0b1JlbW92ZSA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICghaXRlcnMuZXZlcnkoZnVuY3Rpb24gKGl0ZXIpIHsgcmV0dXJuIGl0ZXIuaW5jbHVkZXModmFsdWUpOyB9KSkge1xuICAgICAgICB0b1JlbW92ZS5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChzZXQpIHtcbiAgICAgIHRvUmVtb3ZlLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNldC5yZW1vdmUodmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgU2V0LnByb3RvdHlwZS5zdWJ0cmFjdCA9IGZ1bmN0aW9uIHN1YnRyYWN0ICgpIHtcbiAgICB2YXIgaXRlcnMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkgaXRlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgIGlmIChpdGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpdGVycyA9IGl0ZXJzLm1hcChmdW5jdGlvbiAoaXRlcikgeyByZXR1cm4gU2V0Q29sbGVjdGlvbiQkMShpdGVyKTsgfSk7XG4gICAgdmFyIHRvUmVtb3ZlID0gW107XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKGl0ZXJzLnNvbWUoZnVuY3Rpb24gKGl0ZXIpIHsgcmV0dXJuIGl0ZXIuaW5jbHVkZXModmFsdWUpOyB9KSkge1xuICAgICAgICB0b1JlbW92ZS5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChzZXQpIHtcbiAgICAgIHRvUmVtb3ZlLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHNldC5yZW1vdmUodmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgU2V0LnByb3RvdHlwZS5zb3J0ID0gZnVuY3Rpb24gc29ydCAoY29tcGFyYXRvcikge1xuICAgIC8vIExhdGUgYmluZGluZ1xuICAgIHJldHVybiBPcmRlcmVkU2V0KHNvcnRGYWN0b3J5KHRoaXMsIGNvbXBhcmF0b3IpKTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLnNvcnRCeSA9IGZ1bmN0aW9uIHNvcnRCeSAobWFwcGVyLCBjb21wYXJhdG9yKSB7XG4gICAgLy8gTGF0ZSBiaW5kaW5nXG4gICAgcmV0dXJuIE9yZGVyZWRTZXQoc29ydEZhY3RvcnkodGhpcywgY29tcGFyYXRvciwgbWFwcGVyKSk7XG4gIH07XG5cbiAgU2V0LnByb3RvdHlwZS53YXNBbHRlcmVkID0gZnVuY3Rpb24gd2FzQWx0ZXJlZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hcC53YXNBbHRlcmVkKCk7XG4gIH07XG5cbiAgU2V0LnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcy5fbWFwLl9faXRlcmF0ZShmdW5jdGlvbiAoaykgeyByZXR1cm4gZm4oaywgaywgdGhpcyQxKTsgfSwgcmV2ZXJzZSk7XG4gIH07XG5cbiAgU2V0LnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHJldHVybiB0aGlzLl9tYXAuX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLl9fZW5zdXJlT3duZXIgPSBmdW5jdGlvbiBfX2Vuc3VyZU93bmVyIChvd25lcklEKSB7XG4gICAgaWYgKG93bmVySUQgPT09IHRoaXMuX19vd25lcklEKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdmFyIG5ld01hcCA9IHRoaXMuX21hcC5fX2Vuc3VyZU93bmVyKG93bmVySUQpO1xuICAgIGlmICghb3duZXJJRCkge1xuICAgICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2VtcHR5KCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fb3duZXJJRCA9IG93bmVySUQ7XG4gICAgICB0aGlzLl9tYXAgPSBuZXdNYXA7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX19tYWtlKG5ld01hcCwgb3duZXJJRCk7XG4gIH07XG5cbiAgcmV0dXJuIFNldDtcbn0oU2V0Q29sbGVjdGlvbikpO1xuXG5TZXQuaXNTZXQgPSBpc1NldDtcblxudmFyIFNldFByb3RvdHlwZSA9IFNldC5wcm90b3R5cGU7XG5TZXRQcm90b3R5cGVbSVNfU0VUX1NZTUJPTF0gPSB0cnVlO1xuU2V0UHJvdG90eXBlW0RFTEVURV0gPSBTZXRQcm90b3R5cGUucmVtb3ZlO1xuU2V0UHJvdG90eXBlLm1lcmdlID0gU2V0UHJvdG90eXBlLmNvbmNhdCA9IFNldFByb3RvdHlwZS51bmlvbjtcblNldFByb3RvdHlwZS53aXRoTXV0YXRpb25zID0gd2l0aE11dGF0aW9ucztcblNldFByb3RvdHlwZS5hc0ltbXV0YWJsZSA9IGFzSW1tdXRhYmxlO1xuU2V0UHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gU2V0UHJvdG90eXBlLmFzTXV0YWJsZSA9IGFzTXV0YWJsZTtcblNldFByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlc3VsdCwgYXJyKSB7XG4gIHJldHVybiByZXN1bHQuYWRkKGFycik7XG59O1xuU2V0UHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iai5hc0ltbXV0YWJsZSgpO1xufTtcblxuU2V0UHJvdG90eXBlLl9fZW1wdHkgPSBlbXB0eVNldDtcblNldFByb3RvdHlwZS5fX21ha2UgPSBtYWtlU2V0O1xuXG5mdW5jdGlvbiB1cGRhdGVTZXQoc2V0LCBuZXdNYXApIHtcbiAgaWYgKHNldC5fX293bmVySUQpIHtcbiAgICBzZXQuc2l6ZSA9IG5ld01hcC5zaXplO1xuICAgIHNldC5fbWFwID0gbmV3TWFwO1xuICAgIHJldHVybiBzZXQ7XG4gIH1cbiAgcmV0dXJuIG5ld01hcCA9PT0gc2V0Ll9tYXBcbiAgICA/IHNldFxuICAgIDogbmV3TWFwLnNpemUgPT09IDBcbiAgICAgID8gc2V0Ll9fZW1wdHkoKVxuICAgICAgOiBzZXQuX19tYWtlKG5ld01hcCk7XG59XG5cbmZ1bmN0aW9uIG1ha2VTZXQobWFwLCBvd25lcklEKSB7XG4gIHZhciBzZXQgPSBPYmplY3QuY3JlYXRlKFNldFByb3RvdHlwZSk7XG4gIHNldC5zaXplID0gbWFwID8gbWFwLnNpemUgOiAwO1xuICBzZXQuX21hcCA9IG1hcDtcbiAgc2V0Ll9fb3duZXJJRCA9IG93bmVySUQ7XG4gIHJldHVybiBzZXQ7XG59XG5cbnZhciBFTVBUWV9TRVQ7XG5mdW5jdGlvbiBlbXB0eVNldCgpIHtcbiAgcmV0dXJuIEVNUFRZX1NFVCB8fCAoRU1QVFlfU0VUID0gbWFrZVNldChlbXB0eU1hcCgpKSk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGxhenkgc2VxIG9mIG51bXMgZnJvbSBzdGFydCAoaW5jbHVzaXZlKSB0byBlbmRcbiAqIChleGNsdXNpdmUpLCBieSBzdGVwLCB3aGVyZSBzdGFydCBkZWZhdWx0cyB0byAwLCBzdGVwIHRvIDEsIGFuZCBlbmQgdG9cbiAqIGluZmluaXR5LiBXaGVuIHN0YXJ0IGlzIGVxdWFsIHRvIGVuZCwgcmV0dXJucyBlbXB0eSBsaXN0LlxuICovXG52YXIgUmFuZ2UgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChJbmRleGVkU2VxJCQxKSB7XG4gIGZ1bmN0aW9uIFJhbmdlKHN0YXJ0LCBlbmQsIHN0ZXApIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmFuZ2UpKSB7XG4gICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0LCBlbmQsIHN0ZXApO1xuICAgIH1cbiAgICBpbnZhcmlhbnQoc3RlcCAhPT0gMCwgJ0Nhbm5vdCBzdGVwIGEgUmFuZ2UgYnkgMCcpO1xuICAgIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVuZCA9IEluZmluaXR5O1xuICAgIH1cbiAgICBzdGVwID0gc3RlcCA9PT0gdW5kZWZpbmVkID8gMSA6IE1hdGguYWJzKHN0ZXApO1xuICAgIGlmIChlbmQgPCBzdGFydCkge1xuICAgICAgc3RlcCA9IC1zdGVwO1xuICAgIH1cbiAgICB0aGlzLl9zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuX2VuZCA9IGVuZDtcbiAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgICB0aGlzLnNpemUgPSBNYXRoLm1heCgwLCBNYXRoLmNlaWwoKGVuZCAtIHN0YXJ0KSAvIHN0ZXAgLSAxKSArIDEpO1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIGlmIChFTVBUWV9SQU5HRSkge1xuICAgICAgICByZXR1cm4gRU1QVFlfUkFOR0U7XG4gICAgICB9XG4gICAgICBFTVBUWV9SQU5HRSA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgaWYgKCBJbmRleGVkU2VxJCQxICkgUmFuZ2UuX19wcm90b19fID0gSW5kZXhlZFNlcSQkMTtcbiAgUmFuZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggSW5kZXhlZFNlcSQkMSAmJiBJbmRleGVkU2VxJCQxLnByb3RvdHlwZSApO1xuICBSYW5nZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSYW5nZTtcblxuICBSYW5nZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuICdSYW5nZSBbXSc7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICAnUmFuZ2UgWyAnICtcbiAgICAgIHRoaXMuX3N0YXJ0ICtcbiAgICAgICcuLi4nICtcbiAgICAgIHRoaXMuX2VuZCArXG4gICAgICAodGhpcy5fc3RlcCAhPT0gMSA/ICcgYnkgJyArIHRoaXMuX3N0ZXAgOiAnJykgK1xuICAgICAgJyBdJ1xuICAgICk7XG4gIH07XG5cbiAgUmFuZ2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoaW5kZXgsIG5vdFNldFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzKGluZGV4KVxuICAgICAgPyB0aGlzLl9zdGFydCArIHdyYXBJbmRleCh0aGlzLCBpbmRleCkgKiB0aGlzLl9zdGVwXG4gICAgICA6IG5vdFNldFZhbHVlO1xuICB9O1xuXG4gIFJhbmdlLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzIChzZWFyY2hWYWx1ZSkge1xuICAgIHZhciBwb3NzaWJsZUluZGV4ID0gKHNlYXJjaFZhbHVlIC0gdGhpcy5fc3RhcnQpIC8gdGhpcy5fc3RlcDtcbiAgICByZXR1cm4gKFxuICAgICAgcG9zc2libGVJbmRleCA+PSAwICYmXG4gICAgICBwb3NzaWJsZUluZGV4IDwgdGhpcy5zaXplICYmXG4gICAgICBwb3NzaWJsZUluZGV4ID09PSBNYXRoLmZsb29yKHBvc3NpYmxlSW5kZXgpXG4gICAgKTtcbiAgfTtcblxuICBSYW5nZS5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoYmVnaW4sIGVuZCkge1xuICAgIGlmICh3aG9sZVNsaWNlKGJlZ2luLCBlbmQsIHRoaXMuc2l6ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBiZWdpbiA9IHJlc29sdmVCZWdpbihiZWdpbiwgdGhpcy5zaXplKTtcbiAgICBlbmQgPSByZXNvbHZlRW5kKGVuZCwgdGhpcy5zaXplKTtcbiAgICBpZiAoZW5kIDw9IGJlZ2luKSB7XG4gICAgICByZXR1cm4gbmV3IFJhbmdlKDAsIDApO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJhbmdlKFxuICAgICAgdGhpcy5nZXQoYmVnaW4sIHRoaXMuX2VuZCksXG4gICAgICB0aGlzLmdldChlbmQsIHRoaXMuX2VuZCksXG4gICAgICB0aGlzLl9zdGVwXG4gICAgKTtcbiAgfTtcblxuICBSYW5nZS5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHNlYXJjaFZhbHVlKSB7XG4gICAgdmFyIG9mZnNldFZhbHVlID0gc2VhcmNoVmFsdWUgLSB0aGlzLl9zdGFydDtcbiAgICBpZiAob2Zmc2V0VmFsdWUgJSB0aGlzLl9zdGVwID09PSAwKSB7XG4gICAgICB2YXIgaW5kZXggPSBvZmZzZXRWYWx1ZSAvIHRoaXMuX3N0ZXA7XG4gICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuc2l6ZSkge1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfTtcblxuICBSYW5nZS5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAoc2VhcmNoVmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleE9mKHNlYXJjaFZhbHVlKTtcbiAgfTtcblxuICBSYW5nZS5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciBzaXplID0gdGhpcy5zaXplO1xuICAgIHZhciBzdGVwID0gdGhpcy5fc3RlcDtcbiAgICB2YXIgdmFsdWUgPSByZXZlcnNlID8gdGhpcy5fc3RhcnQgKyAoc2l6ZSAtIDEpICogc3RlcCA6IHRoaXMuX3N0YXJ0O1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSAhPT0gc2l6ZSkge1xuICAgICAgaWYgKGZuKHZhbHVlLCByZXZlcnNlID8gc2l6ZSAtICsraSA6IGkrKywgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdmFsdWUgKz0gcmV2ZXJzZSA/IC1zdGVwIDogc3RlcDtcbiAgICB9XG4gICAgcmV0dXJuIGk7XG4gIH07XG5cbiAgUmFuZ2UucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIHNpemUgPSB0aGlzLnNpemU7XG4gICAgdmFyIHN0ZXAgPSB0aGlzLl9zdGVwO1xuICAgIHZhciB2YWx1ZSA9IHJldmVyc2UgPyB0aGlzLl9zdGFydCArIChzaXplIC0gMSkgKiBzdGVwIDogdGhpcy5fc3RhcnQ7XG4gICAgdmFyIGkgPSAwO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGkgPT09IHNpemUpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yRG9uZSgpO1xuICAgICAgfVxuICAgICAgdmFyIHYgPSB2YWx1ZTtcbiAgICAgIHZhbHVlICs9IHJldmVyc2UgPyAtc3RlcCA6IHN0ZXA7XG4gICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCByZXZlcnNlID8gc2l6ZSAtICsraSA6IGkrKywgdik7XG4gICAgfSk7XG4gIH07XG5cbiAgUmFuZ2UucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAob3RoZXIpIHtcbiAgICByZXR1cm4gb3RoZXIgaW5zdGFuY2VvZiBSYW5nZVxuICAgICAgPyB0aGlzLl9zdGFydCA9PT0gb3RoZXIuX3N0YXJ0ICYmXG4gICAgICAgICAgdGhpcy5fZW5kID09PSBvdGhlci5fZW5kICYmXG4gICAgICAgICAgdGhpcy5fc3RlcCA9PT0gb3RoZXIuX3N0ZXBcbiAgICAgIDogZGVlcEVxdWFsKHRoaXMsIG90aGVyKTtcbiAgfTtcblxuICByZXR1cm4gUmFuZ2U7XG59KEluZGV4ZWRTZXEpKTtcblxudmFyIEVNUFRZX1JBTkdFO1xuXG5mdW5jdGlvbiBnZXRJbihjb2xsZWN0aW9uLCBzZWFyY2hLZXlQYXRoLCBub3RTZXRWYWx1ZSkge1xuICB2YXIga2V5UGF0aCA9IGNvZXJjZUtleVBhdGgoc2VhcmNoS2V5UGF0aCk7XG4gIHZhciBpID0gMDtcbiAgd2hpbGUgKGkgIT09IGtleVBhdGgubGVuZ3RoKSB7XG4gICAgY29sbGVjdGlvbiA9IGdldChjb2xsZWN0aW9uLCBrZXlQYXRoW2krK10sIE5PVF9TRVQpO1xuICAgIGlmIChjb2xsZWN0aW9uID09PSBOT1RfU0VUKSB7XG4gICAgICByZXR1cm4gbm90U2V0VmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb2xsZWN0aW9uO1xufVxuXG5mdW5jdGlvbiBnZXRJbiQxKHNlYXJjaEtleVBhdGgsIG5vdFNldFZhbHVlKSB7XG4gIHJldHVybiBnZXRJbih0aGlzLCBzZWFyY2hLZXlQYXRoLCBub3RTZXRWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGhhc0luKGNvbGxlY3Rpb24sIGtleVBhdGgpIHtcbiAgcmV0dXJuIGdldEluKGNvbGxlY3Rpb24sIGtleVBhdGgsIE5PVF9TRVQpICE9PSBOT1RfU0VUO1xufVxuXG5mdW5jdGlvbiBoYXNJbiQxKHNlYXJjaEtleVBhdGgpIHtcbiAgcmV0dXJuIGhhc0luKHRoaXMsIHNlYXJjaEtleVBhdGgpO1xufVxuXG5mdW5jdGlvbiB0b09iamVjdCgpIHtcbiAgYXNzZXJ0Tm90SW5maW5pdGUodGhpcy5zaXplKTtcbiAgdmFyIG9iamVjdCA9IHt9O1xuICB0aGlzLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaykge1xuICAgIG9iamVjdFtrXSA9IHY7XG4gIH0pO1xuICByZXR1cm4gb2JqZWN0O1xufVxuXG4vLyBOb3RlOiBhbGwgb2YgdGhlc2UgbWV0aG9kcyBhcmUgZGVwcmVjYXRlZC5cbkNvbGxlY3Rpb24uaXNJdGVyYWJsZSA9IGlzQ29sbGVjdGlvbjtcbkNvbGxlY3Rpb24uaXNLZXllZCA9IGlzS2V5ZWQ7XG5Db2xsZWN0aW9uLmlzSW5kZXhlZCA9IGlzSW5kZXhlZDtcbkNvbGxlY3Rpb24uaXNBc3NvY2lhdGl2ZSA9IGlzQXNzb2NpYXRpdmU7XG5Db2xsZWN0aW9uLmlzT3JkZXJlZCA9IGlzT3JkZXJlZDtcblxuQ29sbGVjdGlvbi5JdGVyYXRvciA9IEl0ZXJhdG9yO1xuXG5taXhpbihDb2xsZWN0aW9uLCB7XG4gIC8vICMjIyBDb252ZXJzaW9uIHRvIG90aGVyIHR5cGVzXG5cbiAgdG9BcnJheTogZnVuY3Rpb24gdG9BcnJheSgpIHtcbiAgICBhc3NlcnROb3RJbmZpbml0ZSh0aGlzLnNpemUpO1xuICAgIHZhciBhcnJheSA9IG5ldyBBcnJheSh0aGlzLnNpemUgfHwgMCk7XG4gICAgdmFyIHVzZVR1cGxlcyA9IGlzS2V5ZWQodGhpcyk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHRoaXMuX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICAvLyBLZXllZCBjb2xsZWN0aW9ucyBwcm9kdWNlIGFuIGFycmF5IG9mIHR1cGxlcy5cbiAgICAgIGFycmF5W2krK10gPSB1c2VUdXBsZXMgPyBbaywgdl0gOiB2O1xuICAgIH0pO1xuICAgIHJldHVybiBhcnJheTtcbiAgfSxcblxuICB0b0luZGV4ZWRTZXE6IGZ1bmN0aW9uIHRvSW5kZXhlZFNlcSgpIHtcbiAgICByZXR1cm4gbmV3IFRvSW5kZXhlZFNlcXVlbmNlKHRoaXMpO1xuICB9LFxuXG4gIHRvSlM6IGZ1bmN0aW9uIHRvSlMkMSgpIHtcbiAgICByZXR1cm4gdG9KUyh0aGlzKTtcbiAgfSxcblxuICB0b0tleWVkU2VxOiBmdW5jdGlvbiB0b0tleWVkU2VxKCkge1xuICAgIHJldHVybiBuZXcgVG9LZXllZFNlcXVlbmNlKHRoaXMsIHRydWUpO1xuICB9LFxuXG4gIHRvTWFwOiBmdW5jdGlvbiB0b01hcCgpIHtcbiAgICAvLyBVc2UgTGF0ZSBCaW5kaW5nIGhlcmUgdG8gc29sdmUgdGhlIGNpcmN1bGFyIGRlcGVuZGVuY3kuXG4gICAgcmV0dXJuIE1hcCh0aGlzLnRvS2V5ZWRTZXEoKSk7XG4gIH0sXG5cbiAgdG9PYmplY3Q6IHRvT2JqZWN0LFxuXG4gIHRvT3JkZXJlZE1hcDogZnVuY3Rpb24gdG9PcmRlcmVkTWFwKCkge1xuICAgIC8vIFVzZSBMYXRlIEJpbmRpbmcgaGVyZSB0byBzb2x2ZSB0aGUgY2lyY3VsYXIgZGVwZW5kZW5jeS5cbiAgICByZXR1cm4gT3JkZXJlZE1hcCh0aGlzLnRvS2V5ZWRTZXEoKSk7XG4gIH0sXG5cbiAgdG9PcmRlcmVkU2V0OiBmdW5jdGlvbiB0b09yZGVyZWRTZXQoKSB7XG4gICAgLy8gVXNlIExhdGUgQmluZGluZyBoZXJlIHRvIHNvbHZlIHRoZSBjaXJjdWxhciBkZXBlbmRlbmN5LlxuICAgIHJldHVybiBPcmRlcmVkU2V0KGlzS2V5ZWQodGhpcykgPyB0aGlzLnZhbHVlU2VxKCkgOiB0aGlzKTtcbiAgfSxcblxuICB0b1NldDogZnVuY3Rpb24gdG9TZXQoKSB7XG4gICAgLy8gVXNlIExhdGUgQmluZGluZyBoZXJlIHRvIHNvbHZlIHRoZSBjaXJjdWxhciBkZXBlbmRlbmN5LlxuICAgIHJldHVybiBTZXQoaXNLZXllZCh0aGlzKSA/IHRoaXMudmFsdWVTZXEoKSA6IHRoaXMpO1xuICB9LFxuXG4gIHRvU2V0U2VxOiBmdW5jdGlvbiB0b1NldFNlcSgpIHtcbiAgICByZXR1cm4gbmV3IFRvU2V0U2VxdWVuY2UodGhpcyk7XG4gIH0sXG5cbiAgdG9TZXE6IGZ1bmN0aW9uIHRvU2VxKCkge1xuICAgIHJldHVybiBpc0luZGV4ZWQodGhpcylcbiAgICAgID8gdGhpcy50b0luZGV4ZWRTZXEoKVxuICAgICAgOiBpc0tleWVkKHRoaXMpXG4gICAgICAgID8gdGhpcy50b0tleWVkU2VxKClcbiAgICAgICAgOiB0aGlzLnRvU2V0U2VxKCk7XG4gIH0sXG5cbiAgdG9TdGFjazogZnVuY3Rpb24gdG9TdGFjaygpIHtcbiAgICAvLyBVc2UgTGF0ZSBCaW5kaW5nIGhlcmUgdG8gc29sdmUgdGhlIGNpcmN1bGFyIGRlcGVuZGVuY3kuXG4gICAgcmV0dXJuIFN0YWNrKGlzS2V5ZWQodGhpcykgPyB0aGlzLnZhbHVlU2VxKCkgOiB0aGlzKTtcbiAgfSxcblxuICB0b0xpc3Q6IGZ1bmN0aW9uIHRvTGlzdCgpIHtcbiAgICAvLyBVc2UgTGF0ZSBCaW5kaW5nIGhlcmUgdG8gc29sdmUgdGhlIGNpcmN1bGFyIGRlcGVuZGVuY3kuXG4gICAgcmV0dXJuIExpc3QoaXNLZXllZCh0aGlzKSA/IHRoaXMudmFsdWVTZXEoKSA6IHRoaXMpO1xuICB9LFxuXG4gIC8vICMjIyBDb21tb24gSmF2YVNjcmlwdCBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzXG5cbiAgdG9TdHJpbmc6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAnW0NvbGxlY3Rpb25dJztcbiAgfSxcblxuICBfX3RvU3RyaW5nOiBmdW5jdGlvbiBfX3RvU3RyaW5nKGhlYWQsIHRhaWwpIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gaGVhZCArIHRhaWw7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICBoZWFkICtcbiAgICAgICcgJyArXG4gICAgICB0aGlzLnRvU2VxKClcbiAgICAgICAgLm1hcCh0aGlzLl9fdG9TdHJpbmdNYXBwZXIpXG4gICAgICAgIC5qb2luKCcsICcpICtcbiAgICAgICcgJyArXG4gICAgICB0YWlsXG4gICAgKTtcbiAgfSxcblxuICAvLyAjIyMgRVM2IENvbGxlY3Rpb24gbWV0aG9kcyAoRVM2IEFycmF5IGFuZCBNYXApXG5cbiAgY29uY2F0OiBmdW5jdGlvbiBjb25jYXQoKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICggbGVuLS0gKSB2YWx1ZXNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgIHJldHVybiByZWlmeSh0aGlzLCBjb25jYXRGYWN0b3J5KHRoaXMsIHZhbHVlcykpO1xuICB9LFxuXG4gIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhzZWFyY2hWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnNvbWUoZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBpcyh2YWx1ZSwgc2VhcmNoVmFsdWUpOyB9KTtcbiAgfSxcblxuICBlbnRyaWVzOiBmdW5jdGlvbiBlbnRyaWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9faXRlcmF0b3IoSVRFUkFURV9FTlRSSUVTKTtcbiAgfSxcblxuICBldmVyeTogZnVuY3Rpb24gZXZlcnkocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgYXNzZXJ0Tm90SW5maW5pdGUodGhpcy5zaXplKTtcbiAgICB2YXIgcmV0dXJuVmFsdWUgPSB0cnVlO1xuICAgIHRoaXMuX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrLCBjKSB7XG4gICAgICBpZiAoIXByZWRpY2F0ZS5jYWxsKGNvbnRleHQsIHYsIGssIGMpKSB7XG4gICAgICAgIHJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH0sXG5cbiAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIGZpbHRlckZhY3RvcnkodGhpcywgcHJlZGljYXRlLCBjb250ZXh0LCB0cnVlKSk7XG4gIH0sXG5cbiAgZmluZDogZnVuY3Rpb24gZmluZChwcmVkaWNhdGUsIGNvbnRleHQsIG5vdFNldFZhbHVlKSB7XG4gICAgdmFyIGVudHJ5ID0gdGhpcy5maW5kRW50cnkocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gZW50cnkgPyBlbnRyeVsxXSA6IG5vdFNldFZhbHVlO1xuICB9LFxuXG4gIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goc2lkZUVmZmVjdCwgY29udGV4dCkge1xuICAgIGFzc2VydE5vdEluZmluaXRlKHRoaXMuc2l6ZSk7XG4gICAgcmV0dXJuIHRoaXMuX19pdGVyYXRlKGNvbnRleHQgPyBzaWRlRWZmZWN0LmJpbmQoY29udGV4dCkgOiBzaWRlRWZmZWN0KTtcbiAgfSxcblxuICBqb2luOiBmdW5jdGlvbiBqb2luKHNlcGFyYXRvcikge1xuICAgIGFzc2VydE5vdEluZmluaXRlKHRoaXMuc2l6ZSk7XG4gICAgc2VwYXJhdG9yID0gc2VwYXJhdG9yICE9PSB1bmRlZmluZWQgPyAnJyArIHNlcGFyYXRvciA6ICcsJztcbiAgICB2YXIgam9pbmVkID0gJyc7XG4gICAgdmFyIGlzRmlyc3QgPSB0cnVlO1xuICAgIHRoaXMuX19pdGVyYXRlKGZ1bmN0aW9uICh2KSB7XG4gICAgICBpc0ZpcnN0ID8gKGlzRmlyc3QgPSBmYWxzZSkgOiAoam9pbmVkICs9IHNlcGFyYXRvcik7XG4gICAgICBqb2luZWQgKz0gdiAhPT0gbnVsbCAmJiB2ICE9PSB1bmRlZmluZWQgPyB2LnRvU3RyaW5nKCkgOiAnJztcbiAgICB9KTtcbiAgICByZXR1cm4gam9pbmVkO1xuICB9LFxuXG4gIGtleXM6IGZ1bmN0aW9uIGtleXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19pdGVyYXRvcihJVEVSQVRFX0tFWVMpO1xuICB9LFxuXG4gIG1hcDogZnVuY3Rpb24gbWFwKG1hcHBlciwgY29udGV4dCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBtYXBGYWN0b3J5KHRoaXMsIG1hcHBlciwgY29udGV4dCkpO1xuICB9LFxuXG4gIHJlZHVjZTogZnVuY3Rpb24gcmVkdWNlJDEocmVkdWNlciwgaW5pdGlhbFJlZHVjdGlvbiwgY29udGV4dCkge1xuICAgIHJldHVybiByZWR1Y2UoXG4gICAgICB0aGlzLFxuICAgICAgcmVkdWNlcixcbiAgICAgIGluaXRpYWxSZWR1Y3Rpb24sXG4gICAgICBjb250ZXh0LFxuICAgICAgYXJndW1lbnRzLmxlbmd0aCA8IDIsXG4gICAgICBmYWxzZVxuICAgICk7XG4gIH0sXG5cbiAgcmVkdWNlUmlnaHQ6IGZ1bmN0aW9uIHJlZHVjZVJpZ2h0KHJlZHVjZXIsIGluaXRpYWxSZWR1Y3Rpb24sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gcmVkdWNlKFxuICAgICAgdGhpcyxcbiAgICAgIHJlZHVjZXIsXG4gICAgICBpbml0aWFsUmVkdWN0aW9uLFxuICAgICAgY29udGV4dCxcbiAgICAgIGFyZ3VtZW50cy5sZW5ndGggPCAyLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gIH0sXG5cbiAgcmV2ZXJzZTogZnVuY3Rpb24gcmV2ZXJzZSgpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgcmV2ZXJzZUZhY3RvcnkodGhpcywgdHJ1ZSkpO1xuICB9LFxuXG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShiZWdpbiwgZW5kKSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHNsaWNlRmFjdG9yeSh0aGlzLCBiZWdpbiwgZW5kLCB0cnVlKSk7XG4gIH0sXG5cbiAgc29tZTogZnVuY3Rpb24gc29tZShwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gIXRoaXMuZXZlcnkobm90KHByZWRpY2F0ZSksIGNvbnRleHQpO1xuICB9LFxuXG4gIHNvcnQ6IGZ1bmN0aW9uIHNvcnQoY29tcGFyYXRvcikge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBzb3J0RmFjdG9yeSh0aGlzLCBjb21wYXJhdG9yKSk7XG4gIH0sXG5cbiAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19pdGVyYXRvcihJVEVSQVRFX1ZBTFVFUyk7XG4gIH0sXG5cbiAgLy8gIyMjIE1vcmUgc2VxdWVudGlhbCBtZXRob2RzXG5cbiAgYnV0TGFzdDogZnVuY3Rpb24gYnV0TGFzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5zbGljZSgwLCAtMSk7XG4gIH0sXG5cbiAgaXNFbXB0eTogZnVuY3Rpb24gaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaXplICE9PSB1bmRlZmluZWQgPyB0aGlzLnNpemUgPT09IDAgOiAhdGhpcy5zb21lKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH0pO1xuICB9LFxuXG4gIGNvdW50OiBmdW5jdGlvbiBjb3VudChwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gZW5zdXJlU2l6ZShcbiAgICAgIHByZWRpY2F0ZSA/IHRoaXMudG9TZXEoKS5maWx0ZXIocHJlZGljYXRlLCBjb250ZXh0KSA6IHRoaXNcbiAgICApO1xuICB9LFxuXG4gIGNvdW50Qnk6IGZ1bmN0aW9uIGNvdW50QnkoZ3JvdXBlciwgY29udGV4dCkge1xuICAgIHJldHVybiBjb3VudEJ5RmFjdG9yeSh0aGlzLCBncm91cGVyLCBjb250ZXh0KTtcbiAgfSxcblxuICBlcXVhbHM6IGZ1bmN0aW9uIGVxdWFscyhvdGhlcikge1xuICAgIHJldHVybiBkZWVwRXF1YWwodGhpcywgb3RoZXIpO1xuICB9LFxuXG4gIGVudHJ5U2VxOiBmdW5jdGlvbiBlbnRyeVNlcSgpIHtcbiAgICB2YXIgY29sbGVjdGlvbiA9IHRoaXM7XG4gICAgaWYgKGNvbGxlY3Rpb24uX2NhY2hlKSB7XG4gICAgICAvLyBXZSBjYWNoZSBhcyBhbiBlbnRyaWVzIGFycmF5LCBzbyB3ZSBjYW4ganVzdCByZXR1cm4gdGhlIGNhY2hlIVxuICAgICAgcmV0dXJuIG5ldyBBcnJheVNlcShjb2xsZWN0aW9uLl9jYWNoZSk7XG4gICAgfVxuICAgIHZhciBlbnRyaWVzU2VxdWVuY2UgPSBjb2xsZWN0aW9uXG4gICAgICAudG9TZXEoKVxuICAgICAgLm1hcChlbnRyeU1hcHBlcilcbiAgICAgIC50b0luZGV4ZWRTZXEoKTtcbiAgICBlbnRyaWVzU2VxdWVuY2UuZnJvbUVudHJ5U2VxID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY29sbGVjdGlvbi50b1NlcSgpOyB9O1xuICAgIHJldHVybiBlbnRyaWVzU2VxdWVuY2U7XG4gIH0sXG5cbiAgZmlsdGVyTm90OiBmdW5jdGlvbiBmaWx0ZXJOb3QocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyKG5vdChwcmVkaWNhdGUpLCBjb250ZXh0KTtcbiAgfSxcblxuICBmaW5kRW50cnk6IGZ1bmN0aW9uIGZpbmRFbnRyeShwcmVkaWNhdGUsIGNvbnRleHQsIG5vdFNldFZhbHVlKSB7XG4gICAgdmFyIGZvdW5kID0gbm90U2V0VmFsdWU7XG4gICAgdGhpcy5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGssIGMpIHtcbiAgICAgIGlmIChwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2LCBrLCBjKSkge1xuICAgICAgICBmb3VuZCA9IFtrLCB2XTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmb3VuZDtcbiAgfSxcblxuICBmaW5kS2V5OiBmdW5jdGlvbiBmaW5kS2V5KHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBlbnRyeSA9IHRoaXMuZmluZEVudHJ5KHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5WzBdO1xuICB9LFxuXG4gIGZpbmRMYXN0OiBmdW5jdGlvbiBmaW5kTGFzdChwcmVkaWNhdGUsIGNvbnRleHQsIG5vdFNldFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMudG9LZXllZFNlcSgpXG4gICAgICAucmV2ZXJzZSgpXG4gICAgICAuZmluZChwcmVkaWNhdGUsIGNvbnRleHQsIG5vdFNldFZhbHVlKTtcbiAgfSxcblxuICBmaW5kTGFzdEVudHJ5OiBmdW5jdGlvbiBmaW5kTGFzdEVudHJ5KHByZWRpY2F0ZSwgY29udGV4dCwgbm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy50b0tleWVkU2VxKClcbiAgICAgIC5yZXZlcnNlKClcbiAgICAgIC5maW5kRW50cnkocHJlZGljYXRlLCBjb250ZXh0LCBub3RTZXRWYWx1ZSk7XG4gIH0sXG5cbiAgZmluZExhc3RLZXk6IGZ1bmN0aW9uIGZpbmRMYXN0S2V5KHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnRvS2V5ZWRTZXEoKVxuICAgICAgLnJldmVyc2UoKVxuICAgICAgLmZpbmRLZXkocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgfSxcblxuICBmaXJzdDogZnVuY3Rpb24gZmlyc3Qobm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kKHJldHVyblRydWUsIG51bGwsIG5vdFNldFZhbHVlKTtcbiAgfSxcblxuICBmbGF0TWFwOiBmdW5jdGlvbiBmbGF0TWFwKG1hcHBlciwgY29udGV4dCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBmbGF0TWFwRmFjdG9yeSh0aGlzLCBtYXBwZXIsIGNvbnRleHQpKTtcbiAgfSxcblxuICBmbGF0dGVuOiBmdW5jdGlvbiBmbGF0dGVuKGRlcHRoKSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIGZsYXR0ZW5GYWN0b3J5KHRoaXMsIGRlcHRoLCB0cnVlKSk7XG4gIH0sXG5cbiAgZnJvbUVudHJ5U2VxOiBmdW5jdGlvbiBmcm9tRW50cnlTZXEoKSB7XG4gICAgcmV0dXJuIG5ldyBGcm9tRW50cmllc1NlcXVlbmNlKHRoaXMpO1xuICB9LFxuXG4gIGdldDogZnVuY3Rpb24gZ2V0KHNlYXJjaEtleSwgbm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kKGZ1bmN0aW9uIChfLCBrZXkpIHsgcmV0dXJuIGlzKGtleSwgc2VhcmNoS2V5KTsgfSwgdW5kZWZpbmVkLCBub3RTZXRWYWx1ZSk7XG4gIH0sXG5cbiAgZ2V0SW46IGdldEluJDEsXG5cbiAgZ3JvdXBCeTogZnVuY3Rpb24gZ3JvdXBCeShncm91cGVyLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGdyb3VwQnlGYWN0b3J5KHRoaXMsIGdyb3VwZXIsIGNvbnRleHQpO1xuICB9LFxuXG4gIGhhczogZnVuY3Rpb24gaGFzKHNlYXJjaEtleSkge1xuICAgIHJldHVybiB0aGlzLmdldChzZWFyY2hLZXksIE5PVF9TRVQpICE9PSBOT1RfU0VUO1xuICB9LFxuXG4gIGhhc0luOiBoYXNJbiQxLFxuXG4gIGlzU3Vic2V0OiBmdW5jdGlvbiBpc1N1YnNldChpdGVyKSB7XG4gICAgaXRlciA9IHR5cGVvZiBpdGVyLmluY2x1ZGVzID09PSAnZnVuY3Rpb24nID8gaXRlciA6IENvbGxlY3Rpb24oaXRlcik7XG4gICAgcmV0dXJuIHRoaXMuZXZlcnkoZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBpdGVyLmluY2x1ZGVzKHZhbHVlKTsgfSk7XG4gIH0sXG5cbiAgaXNTdXBlcnNldDogZnVuY3Rpb24gaXNTdXBlcnNldChpdGVyKSB7XG4gICAgaXRlciA9IHR5cGVvZiBpdGVyLmlzU3Vic2V0ID09PSAnZnVuY3Rpb24nID8gaXRlciA6IENvbGxlY3Rpb24oaXRlcik7XG4gICAgcmV0dXJuIGl0ZXIuaXNTdWJzZXQodGhpcyk7XG4gIH0sXG5cbiAga2V5T2Y6IGZ1bmN0aW9uIGtleU9mKHNlYXJjaFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZEtleShmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGlzKHZhbHVlLCBzZWFyY2hWYWx1ZSk7IH0pO1xuICB9LFxuXG4gIGtleVNlcTogZnVuY3Rpb24ga2V5U2VxKCkge1xuICAgIHJldHVybiB0aGlzLnRvU2VxKClcbiAgICAgIC5tYXAoa2V5TWFwcGVyKVxuICAgICAgLnRvSW5kZXhlZFNlcSgpO1xuICB9LFxuXG4gIGxhc3Q6IGZ1bmN0aW9uIGxhc3Qobm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy50b1NlcSgpXG4gICAgICAucmV2ZXJzZSgpXG4gICAgICAuZmlyc3Qobm90U2V0VmFsdWUpO1xuICB9LFxuXG4gIGxhc3RLZXlPZjogZnVuY3Rpb24gbGFzdEtleU9mKHNlYXJjaFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMudG9LZXllZFNlcSgpXG4gICAgICAucmV2ZXJzZSgpXG4gICAgICAua2V5T2Yoc2VhcmNoVmFsdWUpO1xuICB9LFxuXG4gIG1heDogZnVuY3Rpb24gbWF4KGNvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gbWF4RmFjdG9yeSh0aGlzLCBjb21wYXJhdG9yKTtcbiAgfSxcblxuICBtYXhCeTogZnVuY3Rpb24gbWF4QnkobWFwcGVyLCBjb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuIG1heEZhY3RvcnkodGhpcywgY29tcGFyYXRvciwgbWFwcGVyKTtcbiAgfSxcblxuICBtaW46IGZ1bmN0aW9uIG1pbihjb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuIG1heEZhY3RvcnkoXG4gICAgICB0aGlzLFxuICAgICAgY29tcGFyYXRvciA/IG5lZyhjb21wYXJhdG9yKSA6IGRlZmF1bHROZWdDb21wYXJhdG9yXG4gICAgKTtcbiAgfSxcblxuICBtaW5CeTogZnVuY3Rpb24gbWluQnkobWFwcGVyLCBjb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuIG1heEZhY3RvcnkoXG4gICAgICB0aGlzLFxuICAgICAgY29tcGFyYXRvciA/IG5lZyhjb21wYXJhdG9yKSA6IGRlZmF1bHROZWdDb21wYXJhdG9yLFxuICAgICAgbWFwcGVyXG4gICAgKTtcbiAgfSxcblxuICByZXN0OiBmdW5jdGlvbiByZXN0KCkge1xuICAgIHJldHVybiB0aGlzLnNsaWNlKDEpO1xuICB9LFxuXG4gIHNraXA6IGZ1bmN0aW9uIHNraXAoYW1vdW50KSB7XG4gICAgcmV0dXJuIGFtb3VudCA9PT0gMCA/IHRoaXMgOiB0aGlzLnNsaWNlKE1hdGgubWF4KDAsIGFtb3VudCkpO1xuICB9LFxuXG4gIHNraXBMYXN0OiBmdW5jdGlvbiBza2lwTGFzdChhbW91bnQpIHtcbiAgICByZXR1cm4gYW1vdW50ID09PSAwID8gdGhpcyA6IHRoaXMuc2xpY2UoMCwgLU1hdGgubWF4KDAsIGFtb3VudCkpO1xuICB9LFxuXG4gIHNraXBXaGlsZTogZnVuY3Rpb24gc2tpcFdoaWxlKHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBza2lwV2hpbGVGYWN0b3J5KHRoaXMsIHByZWRpY2F0ZSwgY29udGV4dCwgdHJ1ZSkpO1xuICB9LFxuXG4gIHNraXBVbnRpbDogZnVuY3Rpb24gc2tpcFVudGlsKHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnNraXBXaGlsZShub3QocHJlZGljYXRlKSwgY29udGV4dCk7XG4gIH0sXG5cbiAgc29ydEJ5OiBmdW5jdGlvbiBzb3J0QnkobWFwcGVyLCBjb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHNvcnRGYWN0b3J5KHRoaXMsIGNvbXBhcmF0b3IsIG1hcHBlcikpO1xuICB9LFxuXG4gIHRha2U6IGZ1bmN0aW9uIHRha2UoYW1vdW50KSB7XG4gICAgcmV0dXJuIHRoaXMuc2xpY2UoMCwgTWF0aC5tYXgoMCwgYW1vdW50KSk7XG4gIH0sXG5cbiAgdGFrZUxhc3Q6IGZ1bmN0aW9uIHRha2VMYXN0KGFtb3VudCkge1xuICAgIHJldHVybiB0aGlzLnNsaWNlKC1NYXRoLm1heCgwLCBhbW91bnQpKTtcbiAgfSxcblxuICB0YWtlV2hpbGU6IGZ1bmN0aW9uIHRha2VXaGlsZShwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgdGFrZVdoaWxlRmFjdG9yeSh0aGlzLCBwcmVkaWNhdGUsIGNvbnRleHQpKTtcbiAgfSxcblxuICB0YWtlVW50aWw6IGZ1bmN0aW9uIHRha2VVbnRpbChwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy50YWtlV2hpbGUobm90KHByZWRpY2F0ZSksIGNvbnRleHQpO1xuICB9LFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGZuKSB7XG4gICAgcmV0dXJuIGZuKHRoaXMpO1xuICB9LFxuXG4gIHZhbHVlU2VxOiBmdW5jdGlvbiB2YWx1ZVNlcSgpIHtcbiAgICByZXR1cm4gdGhpcy50b0luZGV4ZWRTZXEoKTtcbiAgfSxcblxuICAvLyAjIyMgSGFzaGFibGUgT2JqZWN0XG5cbiAgaGFzaENvZGU6IGZ1bmN0aW9uIGhhc2hDb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9faGFzaCB8fCAodGhpcy5fX2hhc2ggPSBoYXNoQ29sbGVjdGlvbih0aGlzKSk7XG4gIH0sXG5cbiAgLy8gIyMjIEludGVybmFsXG5cbiAgLy8gYWJzdHJhY3QgX19pdGVyYXRlKGZuLCByZXZlcnNlKVxuXG4gIC8vIGFic3RyYWN0IF9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSlcbn0pO1xuXG52YXIgQ29sbGVjdGlvblByb3RvdHlwZSA9IENvbGxlY3Rpb24ucHJvdG90eXBlO1xuQ29sbGVjdGlvblByb3RvdHlwZVtJU19DT0xMRUNUSU9OX1NZTUJPTF0gPSB0cnVlO1xuQ29sbGVjdGlvblByb3RvdHlwZVtJVEVSQVRPUl9TWU1CT0xdID0gQ29sbGVjdGlvblByb3RvdHlwZS52YWx1ZXM7XG5Db2xsZWN0aW9uUHJvdG90eXBlLnRvSlNPTiA9IENvbGxlY3Rpb25Qcm90b3R5cGUudG9BcnJheTtcbkNvbGxlY3Rpb25Qcm90b3R5cGUuX190b1N0cmluZ01hcHBlciA9IHF1b3RlU3RyaW5nO1xuQ29sbGVjdGlvblByb3RvdHlwZS5pbnNwZWN0ID0gQ29sbGVjdGlvblByb3RvdHlwZS50b1NvdXJjZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xufTtcbkNvbGxlY3Rpb25Qcm90b3R5cGUuY2hhaW4gPSBDb2xsZWN0aW9uUHJvdG90eXBlLmZsYXRNYXA7XG5Db2xsZWN0aW9uUHJvdG90eXBlLmNvbnRhaW5zID0gQ29sbGVjdGlvblByb3RvdHlwZS5pbmNsdWRlcztcblxubWl4aW4oS2V5ZWRDb2xsZWN0aW9uLCB7XG4gIC8vICMjIyBNb3JlIHNlcXVlbnRpYWwgbWV0aG9kc1xuXG4gIGZsaXA6IGZ1bmN0aW9uIGZsaXAoKSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIGZsaXBGYWN0b3J5KHRoaXMpKTtcbiAgfSxcblxuICBtYXBFbnRyaWVzOiBmdW5jdGlvbiBtYXBFbnRyaWVzKG1hcHBlciwgY29udGV4dCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHJldHVybiByZWlmeShcbiAgICAgIHRoaXMsXG4gICAgICB0aGlzLnRvU2VxKClcbiAgICAgICAgLm1hcChmdW5jdGlvbiAodiwgaykgeyByZXR1cm4gbWFwcGVyLmNhbGwoY29udGV4dCwgW2ssIHZdLCBpdGVyYXRpb25zKyssIHRoaXMkMSk7IH0pXG4gICAgICAgIC5mcm9tRW50cnlTZXEoKVxuICAgICk7XG4gIH0sXG5cbiAgbWFwS2V5czogZnVuY3Rpb24gbWFwS2V5cyhtYXBwZXIsIGNvbnRleHQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHJldHVybiByZWlmeShcbiAgICAgIHRoaXMsXG4gICAgICB0aGlzLnRvU2VxKClcbiAgICAgICAgLmZsaXAoKVxuICAgICAgICAubWFwKGZ1bmN0aW9uIChrLCB2KSB7IHJldHVybiBtYXBwZXIuY2FsbChjb250ZXh0LCBrLCB2LCB0aGlzJDEpOyB9KVxuICAgICAgICAuZmxpcCgpXG4gICAgKTtcbiAgfSxcbn0pO1xuXG52YXIgS2V5ZWRDb2xsZWN0aW9uUHJvdG90eXBlID0gS2V5ZWRDb2xsZWN0aW9uLnByb3RvdHlwZTtcbktleWVkQ29sbGVjdGlvblByb3RvdHlwZVtJU19LRVlFRF9TWU1CT0xdID0gdHJ1ZTtcbktleWVkQ29sbGVjdGlvblByb3RvdHlwZVtJVEVSQVRPUl9TWU1CT0xdID0gQ29sbGVjdGlvblByb3RvdHlwZS5lbnRyaWVzO1xuS2V5ZWRDb2xsZWN0aW9uUHJvdG90eXBlLnRvSlNPTiA9IHRvT2JqZWN0O1xuS2V5ZWRDb2xsZWN0aW9uUHJvdG90eXBlLl9fdG9TdHJpbmdNYXBwZXIgPSBmdW5jdGlvbiAodiwgaykgeyByZXR1cm4gcXVvdGVTdHJpbmcoaykgKyAnOiAnICsgcXVvdGVTdHJpbmcodik7IH07XG5cbm1peGluKEluZGV4ZWRDb2xsZWN0aW9uLCB7XG4gIC8vICMjIyBDb252ZXJzaW9uIHRvIG90aGVyIHR5cGVzXG5cbiAgdG9LZXllZFNlcTogZnVuY3Rpb24gdG9LZXllZFNlcSgpIHtcbiAgICByZXR1cm4gbmV3IFRvS2V5ZWRTZXF1ZW5jZSh0aGlzLCBmYWxzZSk7XG4gIH0sXG5cbiAgLy8gIyMjIEVTNiBDb2xsZWN0aW9uIG1ldGhvZHMgKEVTNiBBcnJheSBhbmQgTWFwKVxuXG4gIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBmaWx0ZXJGYWN0b3J5KHRoaXMsIHByZWRpY2F0ZSwgY29udGV4dCwgZmFsc2UpKTtcbiAgfSxcblxuICBmaW5kSW5kZXg6IGZ1bmN0aW9uIGZpbmRJbmRleChwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgZW50cnkgPSB0aGlzLmZpbmRFbnRyeShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHJldHVybiBlbnRyeSA/IGVudHJ5WzBdIDogLTE7XG4gIH0sXG5cbiAgaW5kZXhPZjogZnVuY3Rpb24gaW5kZXhPZihzZWFyY2hWYWx1ZSkge1xuICAgIHZhciBrZXkgPSB0aGlzLmtleU9mKHNlYXJjaFZhbHVlKTtcbiAgICByZXR1cm4ga2V5ID09PSB1bmRlZmluZWQgPyAtMSA6IGtleTtcbiAgfSxcblxuICBsYXN0SW5kZXhPZjogZnVuY3Rpb24gbGFzdEluZGV4T2Yoc2VhcmNoVmFsdWUpIHtcbiAgICB2YXIga2V5ID0gdGhpcy5sYXN0S2V5T2Yoc2VhcmNoVmFsdWUpO1xuICAgIHJldHVybiBrZXkgPT09IHVuZGVmaW5lZCA/IC0xIDoga2V5O1xuICB9LFxuXG4gIHJldmVyc2U6IGZ1bmN0aW9uIHJldmVyc2UoKSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHJldmVyc2VGYWN0b3J5KHRoaXMsIGZhbHNlKSk7XG4gIH0sXG5cbiAgc2xpY2U6IGZ1bmN0aW9uIHNsaWNlKGJlZ2luLCBlbmQpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgc2xpY2VGYWN0b3J5KHRoaXMsIGJlZ2luLCBlbmQsIGZhbHNlKSk7XG4gIH0sXG5cbiAgc3BsaWNlOiBmdW5jdGlvbiBzcGxpY2UoaW5kZXgsIHJlbW92ZU51bSAvKiwgLi4udmFsdWVzKi8pIHtcbiAgICB2YXIgbnVtQXJncyA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgcmVtb3ZlTnVtID0gTWF0aC5tYXgocmVtb3ZlTnVtIHx8IDAsIDApO1xuICAgIGlmIChudW1BcmdzID09PSAwIHx8IChudW1BcmdzID09PSAyICYmICFyZW1vdmVOdW0pKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gSWYgaW5kZXggaXMgbmVnYXRpdmUsIGl0IHNob3VsZCByZXNvbHZlIHJlbGF0aXZlIHRvIHRoZSBzaXplIG9mIHRoZVxuICAgIC8vIGNvbGxlY3Rpb24uIEhvd2V2ZXIgc2l6ZSBtYXkgYmUgZXhwZW5zaXZlIHRvIGNvbXB1dGUgaWYgbm90IGNhY2hlZCwgc29cbiAgICAvLyBvbmx5IGNhbGwgY291bnQoKSBpZiB0aGUgbnVtYmVyIGlzIGluIGZhY3QgbmVnYXRpdmUuXG4gICAgaW5kZXggPSByZXNvbHZlQmVnaW4oaW5kZXgsIGluZGV4IDwgMCA/IHRoaXMuY291bnQoKSA6IHRoaXMuc2l6ZSk7XG4gICAgdmFyIHNwbGljZWQgPSB0aGlzLnNsaWNlKDAsIGluZGV4KTtcbiAgICByZXR1cm4gcmVpZnkoXG4gICAgICB0aGlzLFxuICAgICAgbnVtQXJncyA9PT0gMVxuICAgICAgICA/IHNwbGljZWRcbiAgICAgICAgOiBzcGxpY2VkLmNvbmNhdChhcnJDb3B5KGFyZ3VtZW50cywgMiksIHRoaXMuc2xpY2UoaW5kZXggKyByZW1vdmVOdW0pKVxuICAgICk7XG4gIH0sXG5cbiAgLy8gIyMjIE1vcmUgY29sbGVjdGlvbiBtZXRob2RzXG5cbiAgZmluZExhc3RJbmRleDogZnVuY3Rpb24gZmluZExhc3RJbmRleChwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgZW50cnkgPSB0aGlzLmZpbmRMYXN0RW50cnkocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gZW50cnkgPyBlbnRyeVswXSA6IC0xO1xuICB9LFxuXG4gIGZpcnN0OiBmdW5jdGlvbiBmaXJzdChub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmdldCgwLCBub3RTZXRWYWx1ZSk7XG4gIH0sXG5cbiAgZmxhdHRlbjogZnVuY3Rpb24gZmxhdHRlbihkZXB0aCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBmbGF0dGVuRmFjdG9yeSh0aGlzLCBkZXB0aCwgZmFsc2UpKTtcbiAgfSxcblxuICBnZXQ6IGZ1bmN0aW9uIGdldChpbmRleCwgbm90U2V0VmFsdWUpIHtcbiAgICBpbmRleCA9IHdyYXBJbmRleCh0aGlzLCBpbmRleCk7XG4gICAgcmV0dXJuIGluZGV4IDwgMCB8fFxuICAgICAgKHRoaXMuc2l6ZSA9PT0gSW5maW5pdHkgfHwgKHRoaXMuc2l6ZSAhPT0gdW5kZWZpbmVkICYmIGluZGV4ID4gdGhpcy5zaXplKSlcbiAgICAgID8gbm90U2V0VmFsdWVcbiAgICAgIDogdGhpcy5maW5kKGZ1bmN0aW9uIChfLCBrZXkpIHsgcmV0dXJuIGtleSA9PT0gaW5kZXg7IH0sIHVuZGVmaW5lZCwgbm90U2V0VmFsdWUpO1xuICB9LFxuXG4gIGhhczogZnVuY3Rpb24gaGFzKGluZGV4KSB7XG4gICAgaW5kZXggPSB3cmFwSW5kZXgodGhpcywgaW5kZXgpO1xuICAgIHJldHVybiAoXG4gICAgICBpbmRleCA+PSAwICYmXG4gICAgICAodGhpcy5zaXplICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyB0aGlzLnNpemUgPT09IEluZmluaXR5IHx8IGluZGV4IDwgdGhpcy5zaXplXG4gICAgICAgIDogdGhpcy5pbmRleE9mKGluZGV4KSAhPT0gLTEpXG4gICAgKTtcbiAgfSxcblxuICBpbnRlcnBvc2U6IGZ1bmN0aW9uIGludGVycG9zZShzZXBhcmF0b3IpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgaW50ZXJwb3NlRmFjdG9yeSh0aGlzLCBzZXBhcmF0b3IpKTtcbiAgfSxcblxuICBpbnRlcmxlYXZlOiBmdW5jdGlvbiBpbnRlcmxlYXZlKC8qLi4uY29sbGVjdGlvbnMqLykge1xuICAgIHZhciBjb2xsZWN0aW9ucyA9IFt0aGlzXS5jb25jYXQoYXJyQ29weShhcmd1bWVudHMpKTtcbiAgICB2YXIgemlwcGVkID0gemlwV2l0aEZhY3RvcnkodGhpcy50b1NlcSgpLCBJbmRleGVkU2VxLm9mLCBjb2xsZWN0aW9ucyk7XG4gICAgdmFyIGludGVybGVhdmVkID0gemlwcGVkLmZsYXR0ZW4odHJ1ZSk7XG4gICAgaWYgKHppcHBlZC5zaXplKSB7XG4gICAgICBpbnRlcmxlYXZlZC5zaXplID0gemlwcGVkLnNpemUgKiBjb2xsZWN0aW9ucy5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiByZWlmeSh0aGlzLCBpbnRlcmxlYXZlZCk7XG4gIH0sXG5cbiAga2V5U2VxOiBmdW5jdGlvbiBrZXlTZXEoKSB7XG4gICAgcmV0dXJuIFJhbmdlKDAsIHRoaXMuc2l6ZSk7XG4gIH0sXG5cbiAgbGFzdDogZnVuY3Rpb24gbGFzdChub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmdldCgtMSwgbm90U2V0VmFsdWUpO1xuICB9LFxuXG4gIHNraXBXaGlsZTogZnVuY3Rpb24gc2tpcFdoaWxlKHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBza2lwV2hpbGVGYWN0b3J5KHRoaXMsIHByZWRpY2F0ZSwgY29udGV4dCwgZmFsc2UpKTtcbiAgfSxcblxuICB6aXA6IGZ1bmN0aW9uIHppcCgvKiwgLi4uY29sbGVjdGlvbnMgKi8pIHtcbiAgICB2YXIgY29sbGVjdGlvbnMgPSBbdGhpc10uY29uY2F0KGFyckNvcHkoYXJndW1lbnRzKSk7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHppcFdpdGhGYWN0b3J5KHRoaXMsIGRlZmF1bHRaaXBwZXIsIGNvbGxlY3Rpb25zKSk7XG4gIH0sXG5cbiAgemlwQWxsOiBmdW5jdGlvbiB6aXBBbGwoLyosIC4uLmNvbGxlY3Rpb25zICovKSB7XG4gICAgdmFyIGNvbGxlY3Rpb25zID0gW3RoaXNdLmNvbmNhdChhcnJDb3B5KGFyZ3VtZW50cykpO1xuICAgIHJldHVybiByZWlmeSh0aGlzLCB6aXBXaXRoRmFjdG9yeSh0aGlzLCBkZWZhdWx0WmlwcGVyLCBjb2xsZWN0aW9ucywgdHJ1ZSkpO1xuICB9LFxuXG4gIHppcFdpdGg6IGZ1bmN0aW9uIHppcFdpdGgoemlwcGVyIC8qLCAuLi5jb2xsZWN0aW9ucyAqLykge1xuICAgIHZhciBjb2xsZWN0aW9ucyA9IGFyckNvcHkoYXJndW1lbnRzKTtcbiAgICBjb2xsZWN0aW9uc1swXSA9IHRoaXM7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHppcFdpdGhGYWN0b3J5KHRoaXMsIHppcHBlciwgY29sbGVjdGlvbnMpKTtcbiAgfSxcbn0pO1xuXG52YXIgSW5kZXhlZENvbGxlY3Rpb25Qcm90b3R5cGUgPSBJbmRleGVkQ29sbGVjdGlvbi5wcm90b3R5cGU7XG5JbmRleGVkQ29sbGVjdGlvblByb3RvdHlwZVtJU19JTkRFWEVEX1NZTUJPTF0gPSB0cnVlO1xuSW5kZXhlZENvbGxlY3Rpb25Qcm90b3R5cGVbSVNfT1JERVJFRF9TWU1CT0xdID0gdHJ1ZTtcblxubWl4aW4oU2V0Q29sbGVjdGlvbiwge1xuICAvLyAjIyMgRVM2IENvbGxlY3Rpb24gbWV0aG9kcyAoRVM2IEFycmF5IGFuZCBNYXApXG5cbiAgZ2V0OiBmdW5jdGlvbiBnZXQodmFsdWUsIG5vdFNldFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzKHZhbHVlKSA/IHZhbHVlIDogbm90U2V0VmFsdWU7XG4gIH0sXG5cbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzKHZhbHVlKTtcbiAgfSxcblxuICAvLyAjIyMgTW9yZSBzZXF1ZW50aWFsIG1ldGhvZHNcblxuICBrZXlTZXE6IGZ1bmN0aW9uIGtleVNlcSgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZVNlcSgpO1xuICB9LFxufSk7XG5cblNldENvbGxlY3Rpb24ucHJvdG90eXBlLmhhcyA9IENvbGxlY3Rpb25Qcm90b3R5cGUuaW5jbHVkZXM7XG5TZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5jb250YWlucyA9IFNldENvbGxlY3Rpb24ucHJvdG90eXBlLmluY2x1ZGVzO1xuXG4vLyBNaXhpbiBzdWJjbGFzc2VzXG5cbm1peGluKEtleWVkU2VxLCBLZXllZENvbGxlY3Rpb24ucHJvdG90eXBlKTtcbm1peGluKEluZGV4ZWRTZXEsIEluZGV4ZWRDb2xsZWN0aW9uLnByb3RvdHlwZSk7XG5taXhpbihTZXRTZXEsIFNldENvbGxlY3Rpb24ucHJvdG90eXBlKTtcblxuLy8gI3ByYWdtYSBIZWxwZXIgZnVuY3Rpb25zXG5cbmZ1bmN0aW9uIHJlZHVjZShjb2xsZWN0aW9uLCByZWR1Y2VyLCByZWR1Y3Rpb24sIGNvbnRleHQsIHVzZUZpcnN0LCByZXZlcnNlKSB7XG4gIGFzc2VydE5vdEluZmluaXRlKGNvbGxlY3Rpb24uc2l6ZSk7XG4gIGNvbGxlY3Rpb24uX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrLCBjKSB7XG4gICAgaWYgKHVzZUZpcnN0KSB7XG4gICAgICB1c2VGaXJzdCA9IGZhbHNlO1xuICAgICAgcmVkdWN0aW9uID0gdjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVkdWN0aW9uID0gcmVkdWNlci5jYWxsKGNvbnRleHQsIHJlZHVjdGlvbiwgdiwgaywgYyk7XG4gICAgfVxuICB9LCByZXZlcnNlKTtcbiAgcmV0dXJuIHJlZHVjdGlvbjtcbn1cblxuZnVuY3Rpb24ga2V5TWFwcGVyKHYsIGspIHtcbiAgcmV0dXJuIGs7XG59XG5cbmZ1bmN0aW9uIGVudHJ5TWFwcGVyKHYsIGspIHtcbiAgcmV0dXJuIFtrLCB2XTtcbn1cblxuZnVuY3Rpb24gbm90KHByZWRpY2F0ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICFwcmVkaWNhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbmVnKHByZWRpY2F0ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIC1wcmVkaWNhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFppcHBlcigpIHtcbiAgcmV0dXJuIGFyckNvcHkoYXJndW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdE5lZ0NvbXBhcmF0b3IoYSwgYikge1xuICByZXR1cm4gYSA8IGIgPyAxIDogYSA+IGIgPyAtMSA6IDA7XG59XG5cbmZ1bmN0aW9uIGhhc2hDb2xsZWN0aW9uKGNvbGxlY3Rpb24pIHtcbiAgaWYgKGNvbGxlY3Rpb24uc2l6ZSA9PT0gSW5maW5pdHkpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICB2YXIgb3JkZXJlZCA9IGlzT3JkZXJlZChjb2xsZWN0aW9uKTtcbiAgdmFyIGtleWVkID0gaXNLZXllZChjb2xsZWN0aW9uKTtcbiAgdmFyIGggPSBvcmRlcmVkID8gMSA6IDA7XG4gIHZhciBzaXplID0gY29sbGVjdGlvbi5fX2l0ZXJhdGUoXG4gICAga2V5ZWRcbiAgICAgID8gb3JkZXJlZFxuICAgICAgICA/IGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICAgICAgICBoID0gKDMxICogaCArIGhhc2hNZXJnZShoYXNoKHYpLCBoYXNoKGspKSkgfCAwO1xuICAgICAgICAgIH1cbiAgICAgICAgOiBmdW5jdGlvbiAodiwgaykge1xuICAgICAgICAgICAgaCA9IChoICsgaGFzaE1lcmdlKGhhc2godiksIGhhc2goaykpKSB8IDA7XG4gICAgICAgICAgfVxuICAgICAgOiBvcmRlcmVkXG4gICAgICAgID8gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGggPSAoMzEgKiBoICsgaGFzaCh2KSkgfCAwO1xuICAgICAgICAgIH1cbiAgICAgICAgOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgaCA9IChoICsgaGFzaCh2KSkgfCAwO1xuICAgICAgICAgIH1cbiAgKTtcbiAgcmV0dXJuIG11cm11ckhhc2hPZlNpemUoc2l6ZSwgaCk7XG59XG5cbmZ1bmN0aW9uIG11cm11ckhhc2hPZlNpemUoc2l6ZSwgaCkge1xuICBoID0gaW11bChoLCAweGNjOWUyZDUxKTtcbiAgaCA9IGltdWwoKGggPDwgMTUpIHwgKGggPj4+IC0xNSksIDB4MWI4NzM1OTMpO1xuICBoID0gaW11bCgoaCA8PCAxMykgfCAoaCA+Pj4gLTEzKSwgNSk7XG4gIGggPSAoKGggKyAweGU2NTQ2YjY0KSB8IDApIF4gc2l6ZTtcbiAgaCA9IGltdWwoaCBeIChoID4+PiAxNiksIDB4ODVlYmNhNmIpO1xuICBoID0gaW11bChoIF4gKGggPj4+IDEzKSwgMHhjMmIyYWUzNSk7XG4gIGggPSBzbWkoaCBeIChoID4+PiAxNikpO1xuICByZXR1cm4gaDtcbn1cblxuZnVuY3Rpb24gaGFzaE1lcmdlKGEsIGIpIHtcbiAgcmV0dXJuIChhIF4gKGIgKyAweDllMzc3OWI5ICsgKGEgPDwgNikgKyAoYSA+PiAyKSkpIHwgMDsgLy8gaW50XG59XG5cbnZhciBPcmRlcmVkU2V0ID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoU2V0JCQxKSB7XG4gIGZ1bmN0aW9uIE9yZGVyZWRTZXQodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbXB0eU9yZGVyZWRTZXQoKVxuICAgICAgOiBpc09yZGVyZWRTZXQodmFsdWUpXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiBlbXB0eU9yZGVyZWRTZXQoKS53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChzZXQpIHtcbiAgICAgICAgICAgIHZhciBpdGVyID0gU2V0Q29sbGVjdGlvbih2YWx1ZSk7XG4gICAgICAgICAgICBhc3NlcnROb3RJbmZpbml0ZShpdGVyLnNpemUpO1xuICAgICAgICAgICAgaXRlci5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7IHJldHVybiBzZXQuYWRkKHYpOyB9KTtcbiAgICAgICAgICB9KTtcbiAgfVxuXG4gIGlmICggU2V0JCQxICkgT3JkZXJlZFNldC5fX3Byb3RvX18gPSBTZXQkJDE7XG4gIE9yZGVyZWRTZXQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggU2V0JCQxICYmIFNldCQkMS5wcm90b3R5cGUgKTtcbiAgT3JkZXJlZFNldC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBPcmRlcmVkU2V0O1xuXG4gIE9yZGVyZWRTZXQub2YgPSBmdW5jdGlvbiBvZiAoLyouLi52YWx1ZXMqLykge1xuICAgIHJldHVybiB0aGlzKGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgT3JkZXJlZFNldC5mcm9tS2V5cyA9IGZ1bmN0aW9uIGZyb21LZXlzICh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzKEtleWVkQ29sbGVjdGlvbih2YWx1ZSkua2V5U2VxKCkpO1xuICB9O1xuXG4gIE9yZGVyZWRTZXQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLl9fdG9TdHJpbmcoJ09yZGVyZWRTZXQgeycsICd9Jyk7XG4gIH07XG5cbiAgcmV0dXJuIE9yZGVyZWRTZXQ7XG59KFNldCkpO1xuXG5PcmRlcmVkU2V0LmlzT3JkZXJlZFNldCA9IGlzT3JkZXJlZFNldDtcblxudmFyIE9yZGVyZWRTZXRQcm90b3R5cGUgPSBPcmRlcmVkU2V0LnByb3RvdHlwZTtcbk9yZGVyZWRTZXRQcm90b3R5cGVbSVNfT1JERVJFRF9TWU1CT0xdID0gdHJ1ZTtcbk9yZGVyZWRTZXRQcm90b3R5cGUuemlwID0gSW5kZXhlZENvbGxlY3Rpb25Qcm90b3R5cGUuemlwO1xuT3JkZXJlZFNldFByb3RvdHlwZS56aXBXaXRoID0gSW5kZXhlZENvbGxlY3Rpb25Qcm90b3R5cGUuemlwV2l0aDtcblxuT3JkZXJlZFNldFByb3RvdHlwZS5fX2VtcHR5ID0gZW1wdHlPcmRlcmVkU2V0O1xuT3JkZXJlZFNldFByb3RvdHlwZS5fX21ha2UgPSBtYWtlT3JkZXJlZFNldDtcblxuZnVuY3Rpb24gbWFrZU9yZGVyZWRTZXQobWFwLCBvd25lcklEKSB7XG4gIHZhciBzZXQgPSBPYmplY3QuY3JlYXRlKE9yZGVyZWRTZXRQcm90b3R5cGUpO1xuICBzZXQuc2l6ZSA9IG1hcCA/IG1hcC5zaXplIDogMDtcbiAgc2V0Ll9tYXAgPSBtYXA7XG4gIHNldC5fX293bmVySUQgPSBvd25lcklEO1xuICByZXR1cm4gc2V0O1xufVxuXG52YXIgRU1QVFlfT1JERVJFRF9TRVQ7XG5mdW5jdGlvbiBlbXB0eU9yZGVyZWRTZXQoKSB7XG4gIHJldHVybiAoXG4gICAgRU1QVFlfT1JERVJFRF9TRVQgfHwgKEVNUFRZX09SREVSRURfU0VUID0gbWFrZU9yZGVyZWRTZXQoZW1wdHlPcmRlcmVkTWFwKCkpKVxuICApO1xufVxuXG52YXIgUmVjb3JkID0gZnVuY3Rpb24gUmVjb3JkKGRlZmF1bHRWYWx1ZXMsIG5hbWUpIHtcbiAgdmFyIGhhc0luaXRpYWxpemVkO1xuXG4gIHZhciBSZWNvcmRUeXBlID0gZnVuY3Rpb24gUmVjb3JkKHZhbHVlcykge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgaWYgKHZhbHVlcyBpbnN0YW5jZW9mIFJlY29yZFR5cGUpIHtcbiAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZWNvcmRUeXBlKSkge1xuICAgICAgcmV0dXJuIG5ldyBSZWNvcmRUeXBlKHZhbHVlcyk7XG4gICAgfVxuICAgIGlmICghaGFzSW5pdGlhbGl6ZWQpIHtcbiAgICAgIGhhc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZGVmYXVsdFZhbHVlcyk7XG4gICAgICB2YXIgaW5kaWNlcyA9IChSZWNvcmRUeXBlUHJvdG90eXBlLl9pbmRpY2VzID0ge30pO1xuICAgICAgLy8gRGVwcmVjYXRlZDogbGVmdCB0byBhdHRlbXB0IG5vdCB0byBicmVhayBhbnkgZXh0ZXJuYWwgY29kZSB3aGljaFxuICAgICAgLy8gcmVsaWVzIG9uIGEgLl9uYW1lIHByb3BlcnR5IGV4aXN0aW5nIG9uIHJlY29yZCBpbnN0YW5jZXMuXG4gICAgICAvLyBVc2UgUmVjb3JkLmdldERlc2NyaXB0aXZlTmFtZSgpIGluc3RlYWRcbiAgICAgIFJlY29yZFR5cGVQcm90b3R5cGUuX25hbWUgPSBuYW1lO1xuICAgICAgUmVjb3JkVHlwZVByb3RvdHlwZS5fa2V5cyA9IGtleXM7XG4gICAgICBSZWNvcmRUeXBlUHJvdG90eXBlLl9kZWZhdWx0VmFsdWVzID0gZGVmYXVsdFZhbHVlcztcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcHJvcE5hbWUgPSBrZXlzW2ldO1xuICAgICAgICBpbmRpY2VzW3Byb3BOYW1lXSA9IGk7XG4gICAgICAgIGlmIChSZWNvcmRUeXBlUHJvdG90eXBlW3Byb3BOYW1lXSkge1xuICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgICAgICAgICB0eXBlb2YgY29uc29sZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIGNvbnNvbGUud2FybiAmJlxuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAnQ2Fubm90IGRlZmluZSAnICtcbiAgICAgICAgICAgICAgICByZWNvcmROYW1lKHRoaXMpICtcbiAgICAgICAgICAgICAgICAnIHdpdGggcHJvcGVydHkgXCInICtcbiAgICAgICAgICAgICAgICBwcm9wTmFtZSArXG4gICAgICAgICAgICAgICAgJ1wiIHNpbmNlIHRoYXQgcHJvcGVydHkgbmFtZSBpcyBwYXJ0IG9mIHRoZSBSZWNvcmQgQVBJLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0UHJvcChSZWNvcmRUeXBlUHJvdG90eXBlLCBwcm9wTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fX293bmVySUQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fdmFsdWVzID0gTGlzdCgpLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKGwpIHtcbiAgICAgIGwuc2V0U2l6ZSh0aGlzJDEuX2tleXMubGVuZ3RoKTtcbiAgICAgIEtleWVkQ29sbGVjdGlvbih2YWx1ZXMpLmZvckVhY2goZnVuY3Rpb24gKHYsIGspIHtcbiAgICAgICAgbC5zZXQodGhpcyQxLl9pbmRpY2VzW2tdLCB2ID09PSB0aGlzJDEuX2RlZmF1bHRWYWx1ZXNba10gPyB1bmRlZmluZWQgOiB2KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciBSZWNvcmRUeXBlUHJvdG90eXBlID0gKFJlY29yZFR5cGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShcbiAgICBSZWNvcmRQcm90b3R5cGVcbiAgKSk7XG4gIFJlY29yZFR5cGVQcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWNvcmRUeXBlO1xuXG4gIGlmIChuYW1lKSB7XG4gICAgUmVjb3JkVHlwZS5kaXNwbGF5TmFtZSA9IG5hbWU7XG4gIH1cblxuICByZXR1cm4gUmVjb3JkVHlwZTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBzdHIgPSByZWNvcmROYW1lKHRoaXMpICsgJyB7ICc7XG4gIHZhciBrZXlzID0gdGhpcy5fa2V5cztcbiAgdmFyIGs7XG4gIGZvciAodmFyIGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgIT09IGw7IGkrKykge1xuICAgIGsgPSBrZXlzW2ldO1xuICAgIHN0ciArPSAoaSA/ICcsICcgOiAnJykgKyBrICsgJzogJyArIHF1b3RlU3RyaW5nKHRoaXMuZ2V0KGspKTtcbiAgfVxuICByZXR1cm4gc3RyICsgJyB9Jztcbn07XG5cblJlY29yZC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChvdGhlcikge1xuICByZXR1cm4gKFxuICAgIHRoaXMgPT09IG90aGVyIHx8XG4gICAgKG90aGVyICYmXG4gICAgICB0aGlzLl9rZXlzID09PSBvdGhlci5fa2V5cyAmJlxuICAgICAgcmVjb3JkU2VxKHRoaXMpLmVxdWFscyhyZWNvcmRTZXEob3RoZXIpKSlcbiAgKTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUuaGFzaENvZGUgPSBmdW5jdGlvbiBoYXNoQ29kZSAoKSB7XG4gIHJldHVybiByZWNvcmRTZXEodGhpcykuaGFzaENvZGUoKTtcbn07XG5cbi8vIEBwcmFnbWEgQWNjZXNzXG5cblJlY29yZC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gaGFzIChrKSB7XG4gIHJldHVybiB0aGlzLl9pbmRpY2VzLmhhc093blByb3BlcnR5KGspO1xufTtcblxuUmVjb3JkLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGssIG5vdFNldFZhbHVlKSB7XG4gIGlmICghdGhpcy5oYXMoaykpIHtcbiAgICByZXR1cm4gbm90U2V0VmFsdWU7XG4gIH1cbiAgdmFyIGluZGV4ID0gdGhpcy5faW5kaWNlc1trXTtcbiAgdmFyIHZhbHVlID0gdGhpcy5fdmFsdWVzLmdldChpbmRleCk7XG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdFZhbHVlc1trXSA6IHZhbHVlO1xufTtcblxuLy8gQHByYWdtYSBNb2RpZmljYXRpb25cblxuUmVjb3JkLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQgKGssIHYpIHtcbiAgaWYgKHRoaXMuaGFzKGspKSB7XG4gICAgdmFyIG5ld1ZhbHVlcyA9IHRoaXMuX3ZhbHVlcy5zZXQoXG4gICAgICB0aGlzLl9pbmRpY2VzW2tdLFxuICAgICAgdiA9PT0gdGhpcy5fZGVmYXVsdFZhbHVlc1trXSA/IHVuZGVmaW5lZCA6IHZcbiAgICApO1xuICAgIGlmIChuZXdWYWx1ZXMgIT09IHRoaXMuX3ZhbHVlcyAmJiAhdGhpcy5fX293bmVySUQpIHtcbiAgICAgIHJldHVybiBtYWtlUmVjb3JkKHRoaXMsIG5ld1ZhbHVlcyk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVjb3JkLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUgKGspIHtcbiAgcmV0dXJuIHRoaXMuc2V0KGspO1xufTtcblxuUmVjb3JkLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgdmFyIG5ld1ZhbHVlcyA9IHRoaXMuX3ZhbHVlcy5jbGVhcigpLnNldFNpemUodGhpcy5fa2V5cy5sZW5ndGgpO1xuICByZXR1cm4gdGhpcy5fX293bmVySUQgPyB0aGlzIDogbWFrZVJlY29yZCh0aGlzLCBuZXdWYWx1ZXMpO1xufTtcblxuUmVjb3JkLnByb3RvdHlwZS53YXNBbHRlcmVkID0gZnVuY3Rpb24gd2FzQWx0ZXJlZCAoKSB7XG4gIHJldHVybiB0aGlzLl92YWx1ZXMud2FzQWx0ZXJlZCgpO1xufTtcblxuUmVjb3JkLnByb3RvdHlwZS50b1NlcSA9IGZ1bmN0aW9uIHRvU2VxICgpIHtcbiAgcmV0dXJuIHJlY29yZFNlcSh0aGlzKTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUudG9KUyA9IGZ1bmN0aW9uIHRvSlMkMSAoKSB7XG4gIHJldHVybiB0b0pTKHRoaXMpO1xufTtcblxuUmVjb3JkLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gZW50cmllcyAoKSB7XG4gIHJldHVybiB0aGlzLl9faXRlcmF0b3IoSVRFUkFURV9FTlRSSUVTKTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgcmV0dXJuIHJlY29yZFNlcSh0aGlzKS5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xufTtcblxuUmVjb3JkLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gIHJldHVybiByZWNvcmRTZXEodGhpcykuX19pdGVyYXRlKGZuLCByZXZlcnNlKTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUuX19lbnN1cmVPd25lciA9IGZ1bmN0aW9uIF9fZW5zdXJlT3duZXIgKG93bmVySUQpIHtcbiAgaWYgKG93bmVySUQgPT09IHRoaXMuX19vd25lcklEKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdmFyIG5ld1ZhbHVlcyA9IHRoaXMuX3ZhbHVlcy5fX2Vuc3VyZU93bmVyKG93bmVySUQpO1xuICBpZiAoIW93bmVySUQpIHtcbiAgICB0aGlzLl9fb3duZXJJRCA9IG93bmVySUQ7XG4gICAgdGhpcy5fdmFsdWVzID0gbmV3VmFsdWVzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHJldHVybiBtYWtlUmVjb3JkKHRoaXMsIG5ld1ZhbHVlcywgb3duZXJJRCk7XG59O1xuXG5SZWNvcmQuaXNSZWNvcmQgPSBpc1JlY29yZDtcblJlY29yZC5nZXREZXNjcmlwdGl2ZU5hbWUgPSByZWNvcmROYW1lO1xudmFyIFJlY29yZFByb3RvdHlwZSA9IFJlY29yZC5wcm90b3R5cGU7XG5SZWNvcmRQcm90b3R5cGVbSVNfUkVDT1JEX1NZTUJPTF0gPSB0cnVlO1xuUmVjb3JkUHJvdG90eXBlW0RFTEVURV0gPSBSZWNvcmRQcm90b3R5cGUucmVtb3ZlO1xuUmVjb3JkUHJvdG90eXBlLmRlbGV0ZUluID0gUmVjb3JkUHJvdG90eXBlLnJlbW92ZUluID0gZGVsZXRlSW47XG5SZWNvcmRQcm90b3R5cGUuZ2V0SW4gPSBnZXRJbiQxO1xuUmVjb3JkUHJvdG90eXBlLmhhc0luID0gQ29sbGVjdGlvblByb3RvdHlwZS5oYXNJbjtcblJlY29yZFByb3RvdHlwZS5tZXJnZSA9IG1lcmdlO1xuUmVjb3JkUHJvdG90eXBlLm1lcmdlV2l0aCA9IG1lcmdlV2l0aDtcblJlY29yZFByb3RvdHlwZS5tZXJnZUluID0gbWVyZ2VJbjtcblJlY29yZFByb3RvdHlwZS5tZXJnZURlZXAgPSBtZXJnZURlZXAkMTtcblJlY29yZFByb3RvdHlwZS5tZXJnZURlZXBXaXRoID0gbWVyZ2VEZWVwV2l0aCQxO1xuUmVjb3JkUHJvdG90eXBlLm1lcmdlRGVlcEluID0gbWVyZ2VEZWVwSW47XG5SZWNvcmRQcm90b3R5cGUuc2V0SW4gPSBzZXRJbiQxO1xuUmVjb3JkUHJvdG90eXBlLnVwZGF0ZSA9IHVwZGF0ZSQxO1xuUmVjb3JkUHJvdG90eXBlLnVwZGF0ZUluID0gdXBkYXRlSW4kMTtcblJlY29yZFByb3RvdHlwZS53aXRoTXV0YXRpb25zID0gd2l0aE11dGF0aW9ucztcblJlY29yZFByb3RvdHlwZS5hc011dGFibGUgPSBhc011dGFibGU7XG5SZWNvcmRQcm90b3R5cGUuYXNJbW11dGFibGUgPSBhc0ltbXV0YWJsZTtcblJlY29yZFByb3RvdHlwZVtJVEVSQVRPUl9TWU1CT0xdID0gUmVjb3JkUHJvdG90eXBlLmVudHJpZXM7XG5SZWNvcmRQcm90b3R5cGUudG9KU09OID0gUmVjb3JkUHJvdG90eXBlLnRvT2JqZWN0ID1cbiAgQ29sbGVjdGlvblByb3RvdHlwZS50b09iamVjdDtcblJlY29yZFByb3RvdHlwZS5pbnNwZWN0ID0gUmVjb3JkUHJvdG90eXBlLnRvU291cmNlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG59O1xuXG5mdW5jdGlvbiBtYWtlUmVjb3JkKGxpa2VSZWNvcmQsIHZhbHVlcywgb3duZXJJRCkge1xuICB2YXIgcmVjb3JkID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2YobGlrZVJlY29yZCkpO1xuICByZWNvcmQuX3ZhbHVlcyA9IHZhbHVlcztcbiAgcmVjb3JkLl9fb3duZXJJRCA9IG93bmVySUQ7XG4gIHJldHVybiByZWNvcmQ7XG59XG5cbmZ1bmN0aW9uIHJlY29yZE5hbWUocmVjb3JkKSB7XG4gIHJldHVybiByZWNvcmQuY29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgcmVjb3JkLmNvbnN0cnVjdG9yLm5hbWUgfHwgJ1JlY29yZCc7XG59XG5cbmZ1bmN0aW9uIHJlY29yZFNlcShyZWNvcmQpIHtcbiAgcmV0dXJuIGtleWVkU2VxRnJvbVZhbHVlKHJlY29yZC5fa2V5cy5tYXAoZnVuY3Rpb24gKGspIHsgcmV0dXJuIFtrLCByZWNvcmQuZ2V0KGspXTsgfSkpO1xufVxuXG5mdW5jdGlvbiBzZXRQcm9wKHByb3RvdHlwZSwgbmFtZSkge1xuICB0cnkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsIG5hbWUsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChuYW1lKTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGludmFyaWFudCh0aGlzLl9fb3duZXJJRCwgJ0Nhbm5vdCBzZXQgb24gYW4gaW1tdXRhYmxlIHJlY29yZC4nKTtcbiAgICAgICAgdGhpcy5zZXQobmFtZSwgdmFsdWUpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBPYmplY3QuZGVmaW5lUHJvcGVydHkgZmFpbGVkLiBQcm9iYWJseSBJRTguXG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbGF6eSBTZXEgb2YgYHZhbHVlYCByZXBlYXRlZCBgdGltZXNgIHRpbWVzLiBXaGVuIGB0aW1lc2AgaXNcbiAqIHVuZGVmaW5lZCwgcmV0dXJucyBhbiBpbmZpbml0ZSBzZXF1ZW5jZSBvZiBgdmFsdWVgLlxuICovXG52YXIgUmVwZWF0ID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoSW5kZXhlZFNlcSQkMSkge1xuICBmdW5jdGlvbiBSZXBlYXQodmFsdWUsIHRpbWVzKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlcGVhdCkpIHtcbiAgICAgIHJldHVybiBuZXcgUmVwZWF0KHZhbHVlLCB0aW1lcyk7XG4gICAgfVxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5zaXplID0gdGltZXMgPT09IHVuZGVmaW5lZCA/IEluZmluaXR5IDogTWF0aC5tYXgoMCwgdGltZXMpO1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIGlmIChFTVBUWV9SRVBFQVQpIHtcbiAgICAgICAgcmV0dXJuIEVNUFRZX1JFUEVBVDtcbiAgICAgIH1cbiAgICAgIEVNUFRZX1JFUEVBVCA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgaWYgKCBJbmRleGVkU2VxJCQxICkgUmVwZWF0Ll9fcHJvdG9fXyA9IEluZGV4ZWRTZXEkJDE7XG4gIFJlcGVhdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBJbmRleGVkU2VxJCQxICYmIEluZGV4ZWRTZXEkJDEucHJvdG90eXBlICk7XG4gIFJlcGVhdC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZXBlYXQ7XG5cbiAgUmVwZWF0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gJ1JlcGVhdCBbXSc7XG4gICAgfVxuICAgIHJldHVybiAnUmVwZWF0IFsgJyArIHRoaXMuX3ZhbHVlICsgJyAnICsgdGhpcy5zaXplICsgJyB0aW1lcyBdJztcbiAgfTtcblxuICBSZXBlYXQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoaW5kZXgsIG5vdFNldFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzKGluZGV4KSA/IHRoaXMuX3ZhbHVlIDogbm90U2V0VmFsdWU7XG4gIH07XG5cbiAgUmVwZWF0LnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzIChzZWFyY2hWYWx1ZSkge1xuICAgIHJldHVybiBpcyh0aGlzLl92YWx1ZSwgc2VhcmNoVmFsdWUpO1xuICB9O1xuXG4gIFJlcGVhdC5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoYmVnaW4sIGVuZCkge1xuICAgIHZhciBzaXplID0gdGhpcy5zaXplO1xuICAgIHJldHVybiB3aG9sZVNsaWNlKGJlZ2luLCBlbmQsIHNpemUpXG4gICAgICA/IHRoaXNcbiAgICAgIDogbmV3IFJlcGVhdChcbiAgICAgICAgICB0aGlzLl92YWx1ZSxcbiAgICAgICAgICByZXNvbHZlRW5kKGVuZCwgc2l6ZSkgLSByZXNvbHZlQmVnaW4oYmVnaW4sIHNpemUpXG4gICAgICAgICk7XG4gIH07XG5cbiAgUmVwZWF0LnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gcmV2ZXJzZSAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgUmVwZWF0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAoc2VhcmNoVmFsdWUpIHtcbiAgICBpZiAoaXModGhpcy5fdmFsdWUsIHNlYXJjaFZhbHVlKSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfTtcblxuICBSZXBlYXQucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHNlYXJjaFZhbHVlKSB7XG4gICAgaWYgKGlzKHRoaXMuX3ZhbHVlLCBzZWFyY2hWYWx1ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNpemU7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfTtcblxuICBSZXBlYXQucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgIT09IHNpemUpIHtcbiAgICAgIGlmIChmbih0aGlzLl92YWx1ZSwgcmV2ZXJzZSA/IHNpemUgLSArK2kgOiBpKyssIHRoaXMpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGk7XG4gIH07XG5cbiAgUmVwZWF0LnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIHNpemUgPSB0aGlzLnNpemU7XG4gICAgdmFyIGkgPSAwO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoXG4gICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBpID09PSBzaXplXG4gICAgICAgICAgPyBpdGVyYXRvckRvbmUoKVxuICAgICAgICAgIDogaXRlcmF0b3JWYWx1ZSh0eXBlLCByZXZlcnNlID8gc2l6ZSAtICsraSA6IGkrKywgdGhpcyQxLl92YWx1ZSk7IH1cbiAgICApO1xuICB9O1xuXG4gIFJlcGVhdC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChvdGhlcikge1xuICAgIHJldHVybiBvdGhlciBpbnN0YW5jZW9mIFJlcGVhdFxuICAgICAgPyBpcyh0aGlzLl92YWx1ZSwgb3RoZXIuX3ZhbHVlKVxuICAgICAgOiBkZWVwRXF1YWwob3RoZXIpO1xuICB9O1xuXG4gIHJldHVybiBSZXBlYXQ7XG59KEluZGV4ZWRTZXEpKTtcblxudmFyIEVNUFRZX1JFUEVBVDtcblxuZnVuY3Rpb24gZnJvbUpTKHZhbHVlLCBjb252ZXJ0ZXIpIHtcbiAgcmV0dXJuIGZyb21KU1dpdGgoXG4gICAgW10sXG4gICAgY29udmVydGVyIHx8IGRlZmF1bHRDb252ZXJ0ZXIsXG4gICAgdmFsdWUsXG4gICAgJycsXG4gICAgY29udmVydGVyICYmIGNvbnZlcnRlci5sZW5ndGggPiAyID8gW10gOiB1bmRlZmluZWQsXG4gICAgeyAnJzogdmFsdWUgfVxuICApO1xufVxuXG5mdW5jdGlvbiBmcm9tSlNXaXRoKHN0YWNrLCBjb252ZXJ0ZXIsIHZhbHVlLCBrZXksIGtleVBhdGgsIHBhcmVudFZhbHVlKSB7XG4gIHZhciB0b1NlcSA9IEFycmF5LmlzQXJyYXkodmFsdWUpXG4gICAgPyBJbmRleGVkU2VxXG4gICAgOiBpc1BsYWluT2JqKHZhbHVlKVxuICAgICAgPyBLZXllZFNlcVxuICAgICAgOiBudWxsO1xuICBpZiAodG9TZXEpIHtcbiAgICBpZiAofnN0YWNrLmluZGV4T2YodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCBjaXJjdWxhciBzdHJ1Y3R1cmUgdG8gSW1tdXRhYmxlJyk7XG4gICAgfVxuICAgIHN0YWNrLnB1c2godmFsdWUpO1xuICAgIGtleVBhdGggJiYga2V5ICE9PSAnJyAmJiBrZXlQYXRoLnB1c2goa2V5KTtcbiAgICB2YXIgY29udmVydGVkID0gY29udmVydGVyLmNhbGwoXG4gICAgICBwYXJlbnRWYWx1ZSxcbiAgICAgIGtleSxcbiAgICAgIHRvU2VxKHZhbHVlKS5tYXAoZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIGZyb21KU1dpdGgoc3RhY2ssIGNvbnZlcnRlciwgdiwgaywga2V5UGF0aCwgdmFsdWUpOyB9XG4gICAgICApLFxuICAgICAga2V5UGF0aCAmJiBrZXlQYXRoLnNsaWNlKClcbiAgICApO1xuICAgIHN0YWNrLnBvcCgpO1xuICAgIGtleVBhdGggJiYga2V5UGF0aC5wb3AoKTtcbiAgICByZXR1cm4gY29udmVydGVkO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdENvbnZlcnRlcihrLCB2KSB7XG4gIHJldHVybiBpc0tleWVkKHYpID8gdi50b01hcCgpIDogdi50b0xpc3QoKTtcbn1cblxudmFyIHZlcnNpb24gPSBcIjQuMC4wLXJjLjExXCI7XG5cbnZhciBJbW11dGFibGUgPSB7XG4gIHZlcnNpb246IHZlcnNpb24sXG5cbiAgQ29sbGVjdGlvbjogQ29sbGVjdGlvbixcbiAgLy8gTm90ZTogSXRlcmFibGUgaXMgZGVwcmVjYXRlZFxuICBJdGVyYWJsZTogQ29sbGVjdGlvbixcblxuICBTZXE6IFNlcSxcbiAgTWFwOiBNYXAsXG4gIE9yZGVyZWRNYXA6IE9yZGVyZWRNYXAsXG4gIExpc3Q6IExpc3QsXG4gIFN0YWNrOiBTdGFjayxcbiAgU2V0OiBTZXQsXG4gIE9yZGVyZWRTZXQ6IE9yZGVyZWRTZXQsXG5cbiAgUmVjb3JkOiBSZWNvcmQsXG4gIFJhbmdlOiBSYW5nZSxcbiAgUmVwZWF0OiBSZXBlYXQsXG5cbiAgaXM6IGlzLFxuICBmcm9tSlM6IGZyb21KUyxcbiAgaGFzaDogaGFzaCxcblxuICBpc0ltbXV0YWJsZTogaXNJbW11dGFibGUsXG4gIGlzQ29sbGVjdGlvbjogaXNDb2xsZWN0aW9uLFxuICBpc0tleWVkOiBpc0tleWVkLFxuICBpc0luZGV4ZWQ6IGlzSW5kZXhlZCxcbiAgaXNBc3NvY2lhdGl2ZTogaXNBc3NvY2lhdGl2ZSxcbiAgaXNPcmRlcmVkOiBpc09yZGVyZWQsXG4gIGlzVmFsdWVPYmplY3Q6IGlzVmFsdWVPYmplY3QsXG4gIGlzU2VxOiBpc1NlcSxcbiAgaXNMaXN0OiBpc0xpc3QsXG4gIGlzTWFwOiBpc01hcCxcbiAgaXNPcmRlcmVkTWFwOiBpc09yZGVyZWRNYXAsXG4gIGlzU3RhY2s6IGlzU3RhY2ssXG4gIGlzU2V0OiBpc1NldCxcbiAgaXNPcmRlcmVkU2V0OiBpc09yZGVyZWRTZXQsXG4gIGlzUmVjb3JkOiBpc1JlY29yZCxcblxuICBnZXQ6IGdldCxcbiAgZ2V0SW46IGdldEluLFxuICBoYXM6IGhhcyxcbiAgaGFzSW46IGhhc0luLFxuICBtZXJnZTogbWVyZ2UkMSxcbiAgbWVyZ2VEZWVwOiBtZXJnZURlZXAsXG4gIG1lcmdlV2l0aDogbWVyZ2VXaXRoJDEsXG4gIG1lcmdlRGVlcFdpdGg6IG1lcmdlRGVlcFdpdGgsXG4gIHJlbW92ZTogcmVtb3ZlLFxuICByZW1vdmVJbjogcmVtb3ZlSW4sXG4gIHNldDogc2V0LFxuICBzZXRJbjogc2V0SW4sXG4gIHVwZGF0ZTogdXBkYXRlLFxuICB1cGRhdGVJbjogdXBkYXRlSW4sXG59O1xuXG4vLyBOb3RlOiBJdGVyYWJsZSBpcyBkZXByZWNhdGVkXG52YXIgSXRlcmFibGUgPSBDb2xsZWN0aW9uO1xuXG5leHBvcnQgZGVmYXVsdCBJbW11dGFibGU7XG5leHBvcnQgeyB2ZXJzaW9uLCBDb2xsZWN0aW9uLCBJdGVyYWJsZSwgU2VxLCBNYXAsIE9yZGVyZWRNYXAsIExpc3QsIFN0YWNrLCBTZXQsIE9yZGVyZWRTZXQsIFJlY29yZCwgUmFuZ2UsIFJlcGVhdCwgaXMsIGZyb21KUywgaGFzaCwgaXNJbW11dGFibGUsIGlzQ29sbGVjdGlvbiwgaXNLZXllZCwgaXNJbmRleGVkLCBpc0Fzc29jaWF0aXZlLCBpc09yZGVyZWQsIGlzVmFsdWVPYmplY3QsIGdldCwgZ2V0SW4sIGhhcywgaGFzSW4sIG1lcmdlJDEgYXMgbWVyZ2UsIG1lcmdlRGVlcCwgbWVyZ2VXaXRoJDEgYXMgbWVyZ2VXaXRoLCBtZXJnZURlZXBXaXRoLCByZW1vdmUsIHJlbW92ZUluLCBzZXQsIHNldEluLCB1cGRhdGUsIHVwZGF0ZUluIH07XG4iLCIvKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAocm9vdCwgcGx1cmFsaXplKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICh0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBOb2RlLlxuICAgIG1vZHVsZS5leHBvcnRzID0gcGx1cmFsaXplKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELCByZWdpc3RlcnMgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHBsdXJhbGl6ZSgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsLlxuICAgIHJvb3QucGx1cmFsaXplID0gcGx1cmFsaXplKCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgLy8gUnVsZSBzdG9yYWdlIC0gcGx1cmFsaXplIGFuZCBzaW5ndWxhcml6ZSBuZWVkIHRvIGJlIHJ1biBzZXF1ZW50aWFsbHksXG4gIC8vIHdoaWxlIG90aGVyIHJ1bGVzIGNhbiBiZSBvcHRpbWl6ZWQgdXNpbmcgYW4gb2JqZWN0IGZvciBpbnN0YW50IGxvb2t1cHMuXG4gIHZhciBwbHVyYWxSdWxlcyA9IFtdO1xuICB2YXIgc2luZ3VsYXJSdWxlcyA9IFtdO1xuICB2YXIgdW5jb3VudGFibGVzID0ge307XG4gIHZhciBpcnJlZ3VsYXJQbHVyYWxzID0ge307XG4gIHZhciBpcnJlZ3VsYXJTaW5nbGVzID0ge307XG5cbiAgLyoqXG4gICAqIFNhbml0aXplIGEgcGx1cmFsaXphdGlvbiBydWxlIHRvIGEgdXNhYmxlIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtICB7KFJlZ0V4cHxzdHJpbmcpfSBydWxlXG4gICAqIEByZXR1cm4ge1JlZ0V4cH1cbiAgICovXG4gIGZ1bmN0aW9uIHNhbml0aXplUnVsZSAocnVsZSkge1xuICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHJ1bGUgKyAnJCcsICdpJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJ1bGU7XG4gIH1cblxuICAvKipcbiAgICogUGFzcyBpbiBhIHdvcmQgdG9rZW4gdG8gcHJvZHVjZSBhIGZ1bmN0aW9uIHRoYXQgY2FuIHJlcGxpY2F0ZSB0aGUgY2FzZSBvblxuICAgKiBhbm90aGVyIHdvcmQuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB3b3JkXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB0b2tlblxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIHJlc3RvcmVDYXNlICh3b3JkLCB0b2tlbikge1xuICAgIC8vIFRva2VucyBhcmUgYW4gZXhhY3QgbWF0Y2guXG4gICAgaWYgKHdvcmQgPT09IHRva2VuKSByZXR1cm4gdG9rZW47XG5cbiAgICAvLyBMb3dlciBjYXNlZCB3b3Jkcy4gRS5nLiBcImhlbGxvXCIuXG4gICAgaWYgKHdvcmQgPT09IHdvcmQudG9Mb3dlckNhc2UoKSkgcmV0dXJuIHRva2VuLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyBVcHBlciBjYXNlZCB3b3Jkcy4gRS5nLiBcIldISVNLWVwiLlxuICAgIGlmICh3b3JkID09PSB3b3JkLnRvVXBwZXJDYXNlKCkpIHJldHVybiB0b2tlbi50b1VwcGVyQ2FzZSgpO1xuXG4gICAgLy8gVGl0bGUgY2FzZWQgd29yZHMuIEUuZy4gXCJUaXRsZVwiLlxuICAgIGlmICh3b3JkWzBdID09PSB3b3JkWzBdLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiB0b2tlbi5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRva2VuLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIC8vIExvd2VyIGNhc2VkIHdvcmRzLiBFLmcuIFwidGVzdFwiLlxuICAgIHJldHVybiB0b2tlbi50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVycG9sYXRlIGEgcmVnZXhwIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSBzdHJcbiAgICogQHBhcmFtICB7QXJyYXl9ICBhcmdzXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIGludGVycG9sYXRlIChzdHIsIGFyZ3MpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcJChcXGR7MSwyfSkvZywgZnVuY3Rpb24gKG1hdGNoLCBpbmRleCkge1xuICAgICAgcmV0dXJuIGFyZ3NbaW5kZXhdIHx8ICcnO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgYSB3b3JkIHVzaW5nIGEgcnVsZS5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSB3b3JkXG4gICAqIEBwYXJhbSAge0FycmF5fSAgcnVsZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlICh3b3JkLCBydWxlKSB7XG4gICAgcmV0dXJuIHdvcmQucmVwbGFjZShydWxlWzBdLCBmdW5jdGlvbiAobWF0Y2gsIGluZGV4KSB7XG4gICAgICB2YXIgcmVzdWx0ID0gaW50ZXJwb2xhdGUocnVsZVsxXSwgYXJndW1lbnRzKTtcblxuICAgICAgaWYgKG1hdGNoID09PSAnJykge1xuICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2Uod29yZFtpbmRleCAtIDFdLCByZXN1bHQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdG9yZUNhc2UobWF0Y2gsIHJlc3VsdCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2FuaXRpemUgYSB3b3JkIGJ5IHBhc3NpbmcgaW4gdGhlIHdvcmQgYW5kIHNhbml0aXphdGlvbiBydWxlcy5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIHRva2VuXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB3b3JkXG4gICAqIEBwYXJhbSAge0FycmF5fSAgICBydWxlc1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBzYW5pdGl6ZVdvcmQgKHRva2VuLCB3b3JkLCBydWxlcykge1xuICAgIC8vIEVtcHR5IHN0cmluZyBvciBkb2Vzbid0IG5lZWQgZml4aW5nLlxuICAgIGlmICghdG9rZW4ubGVuZ3RoIHx8IHVuY291bnRhYmxlcy5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgIHJldHVybiB3b3JkO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBydWxlcy5sZW5ndGg7XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIHNhbml0aXphdGlvbiBydWxlcyBhbmQgdXNlIHRoZSBmaXJzdCBvbmUgdG8gbWF0Y2guXG4gICAgd2hpbGUgKGxlbi0tKSB7XG4gICAgICB2YXIgcnVsZSA9IHJ1bGVzW2xlbl07XG5cbiAgICAgIGlmIChydWxlWzBdLnRlc3Qod29yZCkpIHJldHVybiByZXBsYWNlKHdvcmQsIHJ1bGUpO1xuICAgIH1cblxuICAgIHJldHVybiB3b3JkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgYSB3b3JkIHdpdGggdGhlIHVwZGF0ZWQgd29yZC5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIHJlcGxhY2VNYXBcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgIGtlZXBNYXBcbiAgICogQHBhcmFtICB7QXJyYXl9ICAgIHJ1bGVzXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVdvcmQgKHJlcGxhY2VNYXAsIGtlZXBNYXAsIHJ1bGVzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgICAvLyBHZXQgdGhlIGNvcnJlY3QgdG9rZW4gYW5kIGNhc2UgcmVzdG9yYXRpb24gZnVuY3Rpb25zLlxuICAgICAgdmFyIHRva2VuID0gd29yZC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAvLyBDaGVjayBhZ2FpbnN0IHRoZSBrZWVwIG9iamVjdCBtYXAuXG4gICAgICBpZiAoa2VlcE1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKHdvcmQsIHRva2VuKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgYWdhaW5zdCB0aGUgcmVwbGFjZW1lbnQgbWFwIGZvciBhIGRpcmVjdCB3b3JkIHJlcGxhY2VtZW50LlxuICAgICAgaWYgKHJlcGxhY2VNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3JkLCByZXBsYWNlTWFwW3Rva2VuXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biBhbGwgdGhlIHJ1bGVzIGFnYWluc3QgdGhlIHdvcmQuXG4gICAgICByZXR1cm4gc2FuaXRpemVXb3JkKHRva2VuLCB3b3JkLCBydWxlcyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHdvcmQgaXMgcGFydCBvZiB0aGUgbWFwLlxuICAgKi9cbiAgZnVuY3Rpb24gY2hlY2tXb3JkIChyZXBsYWNlTWFwLCBrZWVwTWFwLCBydWxlcywgYm9vbCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAod29yZCkge1xuICAgICAgdmFyIHRva2VuID0gd29yZC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAoa2VlcE1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHJldHVybiB0cnVlO1xuICAgICAgaWYgKHJlcGxhY2VNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHJldHVybiBzYW5pdGl6ZVdvcmQodG9rZW4sIHRva2VuLCBydWxlcykgPT09IHRva2VuO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUGx1cmFsaXplIG9yIHNpbmd1bGFyaXplIGEgd29yZCBiYXNlZCBvbiB0aGUgcGFzc2VkIGluIGNvdW50LlxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICB3b3JkICAgICAgVGhlIHdvcmQgdG8gcGx1cmFsaXplXG4gICAqIEBwYXJhbSAge251bWJlcn0gIGNvdW50ICAgICBIb3cgbWFueSBvZiB0aGUgd29yZCBleGlzdFxuICAgKiBAcGFyYW0gIHtib29sZWFufSBpbmNsdXNpdmUgV2hldGhlciB0byBwcmVmaXggd2l0aCB0aGUgbnVtYmVyIChlLmcuIDMgZHVja3MpXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIHBsdXJhbGl6ZSAod29yZCwgY291bnQsIGluY2x1c2l2ZSkge1xuICAgIHZhciBwbHVyYWxpemVkID0gY291bnQgPT09IDFcbiAgICAgID8gcGx1cmFsaXplLnNpbmd1bGFyKHdvcmQpIDogcGx1cmFsaXplLnBsdXJhbCh3b3JkKTtcblxuICAgIHJldHVybiAoaW5jbHVzaXZlID8gY291bnQgKyAnICcgOiAnJykgKyBwbHVyYWxpemVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsdXJhbGl6ZSBhIHdvcmQuXG4gICAqXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIHBsdXJhbGl6ZS5wbHVyYWwgPSByZXBsYWNlV29yZChcbiAgICBpcnJlZ3VsYXJTaW5nbGVzLCBpcnJlZ3VsYXJQbHVyYWxzLCBwbHVyYWxSdWxlc1xuICApO1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHdvcmQgaXMgcGx1cmFsLlxuICAgKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBwbHVyYWxpemUuaXNQbHVyYWwgPSBjaGVja1dvcmQoXG4gICAgaXJyZWd1bGFyU2luZ2xlcywgaXJyZWd1bGFyUGx1cmFscywgcGx1cmFsUnVsZXNcbiAgKTtcblxuICAvKipcbiAgICogU2luZ3VsYXJpemUgYSB3b3JkLlxuICAgKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBwbHVyYWxpemUuc2luZ3VsYXIgPSByZXBsYWNlV29yZChcbiAgICBpcnJlZ3VsYXJQbHVyYWxzLCBpcnJlZ3VsYXJTaW5nbGVzLCBzaW5ndWxhclJ1bGVzXG4gICk7XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgd29yZCBpcyBzaW5ndWxhci5cbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgcGx1cmFsaXplLmlzU2luZ3VsYXIgPSBjaGVja1dvcmQoXG4gICAgaXJyZWd1bGFyUGx1cmFscywgaXJyZWd1bGFyU2luZ2xlcywgc2luZ3VsYXJSdWxlc1xuICApO1xuXG4gIC8qKlxuICAgKiBBZGQgYSBwbHVyYWxpemF0aW9uIHJ1bGUgdG8gdGhlIGNvbGxlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHApfSBydWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICByZXBsYWNlbWVudFxuICAgKi9cbiAgcGx1cmFsaXplLmFkZFBsdXJhbFJ1bGUgPSBmdW5jdGlvbiAocnVsZSwgcmVwbGFjZW1lbnQpIHtcbiAgICBwbHVyYWxSdWxlcy5wdXNoKFtzYW5pdGl6ZVJ1bGUocnVsZSksIHJlcGxhY2VtZW50XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBhIHNpbmd1bGFyaXphdGlvbiBydWxlIHRvIHRoZSBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwKX0gcnVsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgcmVwbGFjZW1lbnRcbiAgICovXG4gIHBsdXJhbGl6ZS5hZGRTaW5ndWxhclJ1bGUgPSBmdW5jdGlvbiAocnVsZSwgcmVwbGFjZW1lbnQpIHtcbiAgICBzaW5ndWxhclJ1bGVzLnB1c2goW3Nhbml0aXplUnVsZShydWxlKSwgcmVwbGFjZW1lbnRdKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGFuIHVuY291bnRhYmxlIHdvcmQgcnVsZS5cbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cCl9IHdvcmRcbiAgICovXG4gIHBsdXJhbGl6ZS5hZGRVbmNvdW50YWJsZVJ1bGUgPSBmdW5jdGlvbiAod29yZCkge1xuICAgIGlmICh0eXBlb2Ygd29yZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHVuY291bnRhYmxlc1t3b3JkLnRvTG93ZXJDYXNlKCldID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTZXQgc2luZ3VsYXIgYW5kIHBsdXJhbCByZWZlcmVuY2VzIGZvciB0aGUgd29yZC5cbiAgICBwbHVyYWxpemUuYWRkUGx1cmFsUnVsZSh3b3JkLCAnJDAnKTtcbiAgICBwbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlKHdvcmQsICckMCcpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gaXJyZWd1bGFyIHdvcmQgZGVmaW5pdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNpbmdsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGx1cmFsXG4gICAqL1xuICBwbHVyYWxpemUuYWRkSXJyZWd1bGFyUnVsZSA9IGZ1bmN0aW9uIChzaW5nbGUsIHBsdXJhbCkge1xuICAgIHBsdXJhbCA9IHBsdXJhbC50b0xvd2VyQ2FzZSgpO1xuICAgIHNpbmdsZSA9IHNpbmdsZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaXJyZWd1bGFyU2luZ2xlc1tzaW5nbGVdID0gcGx1cmFsO1xuICAgIGlycmVndWxhclBsdXJhbHNbcGx1cmFsXSA9IHNpbmdsZTtcbiAgfTtcblxuICAvKipcbiAgICogSXJyZWd1bGFyIHJ1bGVzLlxuICAgKi9cbiAgW1xuICAgIC8vIFByb25vdW5zLlxuICAgIFsnSScsICd3ZSddLFxuICAgIFsnbWUnLCAndXMnXSxcbiAgICBbJ2hlJywgJ3RoZXknXSxcbiAgICBbJ3NoZScsICd0aGV5J10sXG4gICAgWyd0aGVtJywgJ3RoZW0nXSxcbiAgICBbJ215c2VsZicsICdvdXJzZWx2ZXMnXSxcbiAgICBbJ3lvdXJzZWxmJywgJ3lvdXJzZWx2ZXMnXSxcbiAgICBbJ2l0c2VsZicsICd0aGVtc2VsdmVzJ10sXG4gICAgWydoZXJzZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgICBbJ2hpbXNlbGYnLCAndGhlbXNlbHZlcyddLFxuICAgIFsndGhlbXNlbGYnLCAndGhlbXNlbHZlcyddLFxuICAgIFsnaXMnLCAnYXJlJ10sXG4gICAgWyd3YXMnLCAnd2VyZSddLFxuICAgIFsnaGFzJywgJ2hhdmUnXSxcbiAgICBbJ3RoaXMnLCAndGhlc2UnXSxcbiAgICBbJ3RoYXQnLCAndGhvc2UnXSxcbiAgICAvLyBXb3JkcyBlbmRpbmcgaW4gd2l0aCBhIGNvbnNvbmFudCBhbmQgYG9gLlxuICAgIFsnZWNobycsICdlY2hvZXMnXSxcbiAgICBbJ2RpbmdvJywgJ2RpbmdvZXMnXSxcbiAgICBbJ3ZvbGNhbm8nLCAndm9sY2Fub2VzJ10sXG4gICAgWyd0b3JuYWRvJywgJ3Rvcm5hZG9lcyddLFxuICAgIFsndG9ycGVkbycsICd0b3JwZWRvZXMnXSxcbiAgICAvLyBFbmRzIHdpdGggYHVzYC5cbiAgICBbJ2dlbnVzJywgJ2dlbmVyYSddLFxuICAgIFsndmlzY3VzJywgJ3Zpc2NlcmEnXSxcbiAgICAvLyBFbmRzIHdpdGggYG1hYC5cbiAgICBbJ3N0aWdtYScsICdzdGlnbWF0YSddLFxuICAgIFsnc3RvbWEnLCAnc3RvbWF0YSddLFxuICAgIFsnZG9nbWEnLCAnZG9nbWF0YSddLFxuICAgIFsnbGVtbWEnLCAnbGVtbWF0YSddLFxuICAgIFsnc2NoZW1hJywgJ3NjaGVtYXRhJ10sXG4gICAgWydhbmF0aGVtYScsICdhbmF0aGVtYXRhJ10sXG4gICAgLy8gT3RoZXIgaXJyZWd1bGFyIHJ1bGVzLlxuICAgIFsnb3gnLCAnb3hlbiddLFxuICAgIFsnYXhlJywgJ2F4ZXMnXSxcbiAgICBbJ2RpZScsICdkaWNlJ10sXG4gICAgWyd5ZXMnLCAneWVzZXMnXSxcbiAgICBbJ2Zvb3QnLCAnZmVldCddLFxuICAgIFsnZWF2ZScsICdlYXZlcyddLFxuICAgIFsnZ29vc2UnLCAnZ2Vlc2UnXSxcbiAgICBbJ3Rvb3RoJywgJ3RlZXRoJ10sXG4gICAgWydxdWl6JywgJ3F1aXp6ZXMnXSxcbiAgICBbJ2h1bWFuJywgJ2h1bWFucyddLFxuICAgIFsncHJvb2YnLCAncHJvb2ZzJ10sXG4gICAgWydjYXJ2ZScsICdjYXJ2ZXMnXSxcbiAgICBbJ3ZhbHZlJywgJ3ZhbHZlcyddLFxuICAgIFsnbG9vZXknLCAnbG9vaWVzJ10sXG4gICAgWyd0aGllZicsICd0aGlldmVzJ10sXG4gICAgWydncm9vdmUnLCAnZ3Jvb3ZlcyddLFxuICAgIFsncGlja2F4ZScsICdwaWNrYXhlcyddLFxuICAgIFsncGFzc2VyYnknLCAncGFzc2Vyc2J5J11cbiAgXS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgcmV0dXJuIHBsdXJhbGl6ZS5hZGRJcnJlZ3VsYXJSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xuICB9KTtcblxuICAvKipcbiAgICogUGx1cmFsaXphdGlvbiBydWxlcy5cbiAgICovXG4gIFtcbiAgICBbL3M/JC9pLCAncyddLFxuICAgIFsvW15cXHUwMDAwLVxcdTAwN0ZdJC9pLCAnJDAnXSxcbiAgICBbLyhbXmFlaW91XWVzZSkkL2ksICckMSddLFxuICAgIFsvKGF4fHRlc3QpaXMkL2ksICckMWVzJ10sXG4gICAgWy8oYWxpYXN8W15hb3VddXN8dFtsbV1hc3xnYXN8cmlzKSQvaSwgJyQxZXMnXSxcbiAgICBbLyhlW21uXXUpcz8kL2ksICckMXMnXSxcbiAgICBbLyhbXmxdaWFzfFthZWlvdV1sYXN8W2VqenJdYXN8W2l1XWFtKSQvaSwgJyQxJ10sXG4gICAgWy8oYWx1bW58c3lsbGFifHZpcnxyYWRpfG51Y2xlfGZ1bmd8Y2FjdHxzdGltdWx8dGVybWlufGJhY2lsbHxmb2N8dXRlcnxsb2N8c3RyYXQpKD86dXN8aSkkL2ksICckMWknXSxcbiAgICBbLyhhbHVtbnxhbGd8dmVydGVicikoPzphfGFlKSQvaSwgJyQxYWUnXSxcbiAgICBbLyhzZXJhcGh8Y2hlcnViKSg/OmltKT8kL2ksICckMWltJ10sXG4gICAgWy8oaGVyfGF0fGdyKW8kL2ksICckMW9lcyddLFxuICAgIFsvKGFnZW5kfGFkZGVuZHxtaWxsZW5uaXxkYXR8ZXh0cmVtfGJhY3Rlcml8ZGVzaWRlcmF0fHN0cmF0fGNhbmRlbGFicnxlcnJhdHxvdnxzeW1wb3NpfGN1cnJpY3VsfGF1dG9tYXR8cXVvcikoPzphfHVtKSQvaSwgJyQxYSddLFxuICAgIFsvKGFwaGVsaXxoeXBlcmJhdHxwZXJpaGVsaXxhc3luZGV0fG5vdW1lbnxwaGVub21lbnxjcml0ZXJpfG9yZ2FufHByb2xlZ29tZW58aGVkcnxhdXRvbWF0KSg/OmF8b24pJC9pLCAnJDFhJ10sXG4gICAgWy9zaXMkL2ksICdzZXMnXSxcbiAgICBbLyg/Oihrbml8d2l8bGkpZmV8KGFyfGx8ZWF8ZW98b2F8aG9vKWYpJC9pLCAnJDEkMnZlcyddLFxuICAgIFsvKFteYWVpb3V5XXxxdSl5JC9pLCAnJDFpZXMnXSxcbiAgICBbLyhbXmNoXVtpZW9dW2xuXSlleSQvaSwgJyQxaWVzJ10sXG4gICAgWy8oeHxjaHxzc3xzaHx6eikkL2ksICckMWVzJ10sXG4gICAgWy8obWF0cnxjb2R8bXVyfHNpbHx2ZXJ0fGluZHxhcHBlbmQpKD86aXh8ZXgpJC9pLCAnJDFpY2VzJ10sXG4gICAgWy9cXGIoKD86dGl0KT9tfGwpKD86aWNlfG91c2UpJC9pLCAnJDFpY2UnXSxcbiAgICBbLyhwZSkoPzpyc29ufG9wbGUpJC9pLCAnJDFvcGxlJ10sXG4gICAgWy8oY2hpbGQpKD86cmVuKT8kL2ksICckMXJlbiddLFxuICAgIFsvZWF1eCQvaSwgJyQwJ10sXG4gICAgWy9tW2FlXW4kL2ksICdtZW4nXSxcbiAgICBbJ3Rob3UnLCAneW91J11cbiAgXS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgcmV0dXJuIHBsdXJhbGl6ZS5hZGRQbHVyYWxSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xuICB9KTtcblxuICAvKipcbiAgICogU2luZ3VsYXJpemF0aW9uIHJ1bGVzLlxuICAgKi9cbiAgW1xuICAgIFsvcyQvaSwgJyddLFxuICAgIFsvKHNzKSQvaSwgJyQxJ10sXG4gICAgWy8od2l8a25pfCg/OmFmdGVyfGhhbGZ8aGlnaHxsb3d8bWlkfG5vbnxuaWdodHxbXlxcd118XilsaSl2ZXMkL2ksICckMWZlJ10sXG4gICAgWy8oYXJ8KD86d298W2FlXSlsfFtlb11bYW9dKXZlcyQvaSwgJyQxZiddLFxuICAgIFsvaWVzJC9pLCAneSddLFxuICAgIFsvXFxiKFtwbF18em9tYnwoPzpuZWNrfGNyb3NzKT90fGNvbGx8ZmFlcnxmb29kfGdlbnxnb29ufGdyb3VwfGxhc3N8dGFsa3xnb2FsfGN1dClpZXMkL2ksICckMWllJ10sXG4gICAgWy9cXGIobW9ufHNtaWwpaWVzJC9pLCAnJDFleSddLFxuICAgIFsvXFxiKCg/OnRpdCk/bXxsKWljZSQvaSwgJyQxb3VzZSddLFxuICAgIFsvKHNlcmFwaHxjaGVydWIpaW0kL2ksICckMSddLFxuICAgIFsvKHh8Y2h8c3N8c2h8enp8dHRvfGdvfGNob3xhbGlhc3xbXmFvdV11c3x0W2xtXWFzfGdhc3woPzpoZXJ8YXR8Z3Ipb3xbYWVpb3VdcmlzKSg/OmVzKT8kL2ksICckMSddLFxuICAgIFsvKGFuYWx5fGRpYWdub3xwYXJlbnRoZXxwcm9nbm98c3lub3B8dGhlfGVtcGhhfGNyaXxuZSkoPzpzaXN8c2VzKSQvaSwgJyQxc2lzJ10sXG4gICAgWy8obW92aWV8dHdlbHZlfGFidXNlfGVbbW5ddSlzJC9pLCAnJDEnXSxcbiAgICBbLyh0ZXN0KSg/OmlzfGVzKSQvaSwgJyQxaXMnXSxcbiAgICBbLyhhbHVtbnxzeWxsYWJ8dmlyfHJhZGl8bnVjbGV8ZnVuZ3xjYWN0fHN0aW11bHx0ZXJtaW58YmFjaWxsfGZvY3x1dGVyfGxvY3xzdHJhdCkoPzp1c3xpKSQvaSwgJyQxdXMnXSxcbiAgICBbLyhhZ2VuZHxhZGRlbmR8bWlsbGVubml8ZGF0fGV4dHJlbXxiYWN0ZXJpfGRlc2lkZXJhdHxzdHJhdHxjYW5kZWxhYnJ8ZXJyYXR8b3Z8c3ltcG9zaXxjdXJyaWN1bHxxdW9yKWEkL2ksICckMXVtJ10sXG4gICAgWy8oYXBoZWxpfGh5cGVyYmF0fHBlcmloZWxpfGFzeW5kZXR8bm91bWVufHBoZW5vbWVufGNyaXRlcml8b3JnYW58cHJvbGVnb21lbnxoZWRyfGF1dG9tYXQpYSQvaSwgJyQxb24nXSxcbiAgICBbLyhhbHVtbnxhbGd8dmVydGVicilhZSQvaSwgJyQxYSddLFxuICAgIFsvKGNvZHxtdXJ8c2lsfHZlcnR8aW5kKWljZXMkL2ksICckMWV4J10sXG4gICAgWy8obWF0cnxhcHBlbmQpaWNlcyQvaSwgJyQxaXgnXSxcbiAgICBbLyhwZSkocnNvbnxvcGxlKSQvaSwgJyQxcnNvbiddLFxuICAgIFsvKGNoaWxkKXJlbiQvaSwgJyQxJ10sXG4gICAgWy8oZWF1KXg/JC9pLCAnJDEnXSxcbiAgICBbL21lbiQvaSwgJ21hbiddXG4gIF0uZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgIHJldHVybiBwbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlKHJ1bGVbMF0sIHJ1bGVbMV0pO1xuICB9KTtcblxuICAvKipcbiAgICogVW5jb3VudGFibGUgcnVsZXMuXG4gICAqL1xuICBbXG4gICAgLy8gU2luZ3VsYXIgd29yZHMgd2l0aCBubyBwbHVyYWxzLlxuICAgICdhZHVsdGhvb2QnLFxuICAgICdhZHZpY2UnLFxuICAgICdhZ2VuZGEnLFxuICAgICdhaWQnLFxuICAgICdhaXJjcmFmdCcsXG4gICAgJ2FsY29ob2wnLFxuICAgICdhbW1vJyxcbiAgICAnYW5hbHl0aWNzJyxcbiAgICAnYW5pbWUnLFxuICAgICdhdGhsZXRpY3MnLFxuICAgICdhdWRpbycsXG4gICAgJ2Jpc29uJyxcbiAgICAnYmxvb2QnLFxuICAgICdicmVhbScsXG4gICAgJ2J1ZmZhbG8nLFxuICAgICdidXR0ZXInLFxuICAgICdjYXJwJyxcbiAgICAnY2FzaCcsXG4gICAgJ2NoYXNzaXMnLFxuICAgICdjaGVzcycsXG4gICAgJ2Nsb3RoaW5nJyxcbiAgICAnY29kJyxcbiAgICAnY29tbWVyY2UnLFxuICAgICdjb29wZXJhdGlvbicsXG4gICAgJ2NvcnBzJyxcbiAgICAnZGVicmlzJyxcbiAgICAnZGlhYmV0ZXMnLFxuICAgICdkaWdlc3Rpb24nLFxuICAgICdlbGsnLFxuICAgICdlbmVyZ3knLFxuICAgICdlcXVpcG1lbnQnLFxuICAgICdleGNyZXRpb24nLFxuICAgICdleHBlcnRpc2UnLFxuICAgICdmaXJtd2FyZScsXG4gICAgJ2Zsb3VuZGVyJyxcbiAgICAnZnVuJyxcbiAgICAnZ2FsbG93cycsXG4gICAgJ2dhcmJhZ2UnLFxuICAgICdncmFmZml0aScsXG4gICAgJ2hhcmR3YXJlJyxcbiAgICAnaGVhZHF1YXJ0ZXJzJyxcbiAgICAnaGVhbHRoJyxcbiAgICAnaGVycGVzJyxcbiAgICAnaGlnaGppbmtzJyxcbiAgICAnaG9tZXdvcmsnLFxuICAgICdob3VzZXdvcmsnLFxuICAgICdpbmZvcm1hdGlvbicsXG4gICAgJ2plYW5zJyxcbiAgICAnanVzdGljZScsXG4gICAgJ2t1ZG9zJyxcbiAgICAnbGFib3VyJyxcbiAgICAnbGl0ZXJhdHVyZScsXG4gICAgJ21hY2hpbmVyeScsXG4gICAgJ21hY2tlcmVsJyxcbiAgICAnbWFpbCcsXG4gICAgJ21lZGlhJyxcbiAgICAnbWV3cycsXG4gICAgJ21vb3NlJyxcbiAgICAnbXVzaWMnLFxuICAgICdtdWQnLFxuICAgICdtYW5nYScsXG4gICAgJ25ld3MnLFxuICAgICdvbmx5JyxcbiAgICAncGVyc29ubmVsJyxcbiAgICAncGlrZScsXG4gICAgJ3BsYW5rdG9uJyxcbiAgICAncGxpZXJzJyxcbiAgICAncG9saWNlJyxcbiAgICAncG9sbHV0aW9uJyxcbiAgICAncHJlbWlzZXMnLFxuICAgICdyYWluJyxcbiAgICAncmVzZWFyY2gnLFxuICAgICdyaWNlJyxcbiAgICAnc2FsbW9uJyxcbiAgICAnc2Npc3NvcnMnLFxuICAgICdzZXJpZXMnLFxuICAgICdzZXdhZ2UnLFxuICAgICdzaGFtYmxlcycsXG4gICAgJ3NocmltcCcsXG4gICAgJ3NvZnR3YXJlJyxcbiAgICAnc3BlY2llcycsXG4gICAgJ3N0YWZmJyxcbiAgICAnc3dpbmUnLFxuICAgICd0ZW5uaXMnLFxuICAgICd0cmFmZmljJyxcbiAgICAndHJhbnNwb3J0YXRpb24nLFxuICAgICd0cm91dCcsXG4gICAgJ3R1bmEnLFxuICAgICd3ZWFsdGgnLFxuICAgICd3ZWxmYXJlJyxcbiAgICAnd2hpdGluZycsXG4gICAgJ3dpbGRlYmVlc3QnLFxuICAgICd3aWxkbGlmZScsXG4gICAgJ3lvdScsXG4gICAgL3Bva1tlw6ldbW9uJC9pLFxuICAgIC8vIFJlZ2V4ZXMuXG4gICAgL1teYWVpb3VdZXNlJC9pLCAvLyBcImNoaW5lc2VcIiwgXCJqYXBhbmVzZVwiXG4gICAgL2RlZXIkL2ksIC8vIFwiZGVlclwiLCBcInJlaW5kZWVyXCJcbiAgICAvZmlzaCQvaSwgLy8gXCJmaXNoXCIsIFwiYmxvd2Zpc2hcIiwgXCJhbmdlbGZpc2hcIlxuICAgIC9tZWFzbGVzJC9pLFxuICAgIC9vW2l1XXMkL2ksIC8vIFwiY2Fybml2b3JvdXNcIlxuICAgIC9wb3gkL2ksIC8vIFwiY2hpY2twb3hcIiwgXCJzbWFsbHBveFwiXG4gICAgL3NoZWVwJC9pXG4gIF0uZm9yRWFjaChwbHVyYWxpemUuYWRkVW5jb3VudGFibGVSdWxlKTtcblxuICByZXR1cm4gcGx1cmFsaXplO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBMRUFGX0tFWSwgaGFzV2Vha01hcDtcblxuLyoqXG4gKiBBcmJpdHJhcnkgdmFsdWUgdXNlZCBhcyBrZXkgZm9yIHJlZmVyZW5jaW5nIGNhY2hlIG9iamVjdCBpbiBXZWFrTWFwIHRyZWUuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuTEVBRl9LRVkgPSB7fTtcblxuLyoqXG4gKiBXaGV0aGVyIGVudmlyb25tZW50IHN1cHBvcnRzIFdlYWtNYXAuXG4gKlxuICogQHR5cGUge2Jvb2xlYW59XG4gKi9cbmhhc1dlYWtNYXAgPSB0eXBlb2YgV2Vha01hcCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgYXMgdGhlIHNvbGUgZW50cnkgaW4gYW4gYXJyYXkuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byByZXR1cm4uXG4gKlxuICogQHJldHVybiB7QXJyYXl9IFZhbHVlIHJldHVybmVkIGFzIGVudHJ5IGluIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU9mKCB2YWx1ZSApIHtcblx0cmV0dXJuIFsgdmFsdWUgXTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvYmplY3QtbGlrZSwgb3IgZmFsc2Ugb3RoZXJ3aXNlLiBBIHZhbHVlXG4gKiBpcyBvYmplY3QtbGlrZSBpZiBpdCBjYW4gc3VwcG9ydCBwcm9wZXJ0eSBhc3NpZ25tZW50LCBlLmcuIG9iamVjdCBvciBhcnJheS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHRlc3QuXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciB2YWx1ZSBpcyBvYmplY3QtbGlrZS5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKCB2YWx1ZSApIHtcblx0cmV0dXJuICEhIHZhbHVlICYmICdvYmplY3QnID09PSB0eXBlb2YgdmFsdWU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIG5ldyBjYWNoZSBvYmplY3QuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBDYWNoZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNhY2hlKCkge1xuXHR2YXIgY2FjaGUgPSB7XG5cdFx0Y2xlYXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y2FjaGUuaGVhZCA9IG51bGw7XG5cdFx0fSxcblx0fTtcblxuXHRyZXR1cm4gY2FjaGU7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGVudHJpZXMgd2l0aGluIHRoZSB0d28gYXJyYXlzIGFyZSBzdHJpY3RseSBlcXVhbCBieVxuICogcmVmZXJlbmNlIGZyb20gYSBzdGFydGluZyBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSAgYSAgICAgICAgIEZpcnN0IGFycmF5LlxuICogQHBhcmFtIHtBcnJheX0gIGIgICAgICAgICBTZWNvbmQgYXJyYXkuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IEluZGV4IGZyb20gd2hpY2ggdG8gc3RhcnQgY29tcGFyaXNvbi5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIGFycmF5cyBhcmUgc2hhbGxvd2x5IGVxdWFsLlxuICovXG5mdW5jdGlvbiBpc1NoYWxsb3dFcXVhbCggYSwgYiwgZnJvbUluZGV4ICkge1xuXHR2YXIgaTtcblxuXHRpZiAoIGEubGVuZ3RoICE9PSBiLmxlbmd0aCApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRmb3IgKCBpID0gZnJvbUluZGV4OyBpIDwgYS5sZW5ndGg7IGkrKyApIHtcblx0XHRpZiAoIGFbIGkgXSAhPT0gYlsgaSBdICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBtZW1vaXplZCBzZWxlY3RvciBmdW5jdGlvbi4gVGhlIGdldERlcGVuZGFudHMgZnVuY3Rpb24gYXJndW1lbnQgaXNcbiAqIGNhbGxlZCBiZWZvcmUgdGhlIG1lbW9pemVkIHNlbGVjdG9yIGFuZCBpcyBleHBlY3RlZCB0byByZXR1cm4gYW4gaW1tdXRhYmxlXG4gKiByZWZlcmVuY2Ugb3IgYXJyYXkgb2YgcmVmZXJlbmNlcyBvbiB3aGljaCB0aGUgc2VsZWN0b3IgZGVwZW5kcyBmb3IgY29tcHV0aW5nXG4gKiBpdHMgb3duIHJldHVybiB2YWx1ZS4gVGhlIG1lbW9pemUgY2FjaGUgaXMgcHJlc2VydmVkIG9ubHkgYXMgbG9uZyBhcyB0aG9zZVxuICogZGVwZW5kYW50IHJlZmVyZW5jZXMgcmVtYWluIHRoZSBzYW1lLiBJZiBnZXREZXBlbmRhbnRzIHJldHVybnMgYSBkaWZmZXJlbnRcbiAqIHJlZmVyZW5jZShzKSwgdGhlIGNhY2hlIGlzIGNsZWFyZWQgYW5kIHRoZSBzZWxlY3RvciB2YWx1ZSByZWdlbmVyYXRlZC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzZWxlY3RvciAgICAgIFNlbGVjdG9yIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZ2V0RGVwZW5kYW50cyBEZXBlbmRhbnQgZ2V0dGVyIHJldHVybmluZyBhbiBpbW11dGFibGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJlbmNlIG9yIGFycmF5IG9mIHJlZmVyZW5jZSB1c2VkIGluXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlIGJ1c3QgY29uc2lkZXJhdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gTWVtb2l6ZWQgc2VsZWN0b3IuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCBzZWxlY3RvciwgZ2V0RGVwZW5kYW50cyApIHtcblx0dmFyIHJvb3RDYWNoZSwgZ2V0Q2FjaGU7XG5cblx0Ly8gVXNlIG9iamVjdCBzb3VyY2UgYXMgZGVwZW5kYW50IGlmIGdldHRlciBub3QgcHJvdmlkZWRcblx0aWYgKCAhIGdldERlcGVuZGFudHMgKSB7XG5cdFx0Z2V0RGVwZW5kYW50cyA9IGFycmF5T2Y7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgcm9vdCBjYWNoZS4gSWYgV2Vha01hcCBpcyBzdXBwb3J0ZWQsIHRoaXMgaXMgYXNzaWduZWQgdG8gdGhlXG5cdCAqIHJvb3QgV2Vha01hcCBjYWNoZSBzZXQsIG90aGVyd2lzZSBpdCBpcyBhIHNoYXJlZCBpbnN0YW5jZSBvZiB0aGUgZGVmYXVsdFxuXHQgKiBjYWNoZSBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4geyhXZWFrTWFwfE9iamVjdCl9IFJvb3QgY2FjaGUgb2JqZWN0LlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0Um9vdENhY2hlKCkge1xuXHRcdHJldHVybiByb290Q2FjaGU7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgY2FjaGUgZm9yIGEgZ2l2ZW4gZGVwZW5kYW50cyBhcnJheS4gV2hlbiBwb3NzaWJsZSwgYSBXZWFrTWFwXG5cdCAqIHdpbGwgYmUgdXNlZCB0byBjcmVhdGUgYSB1bmlxdWUgY2FjaGUgZm9yIGVhY2ggc2V0IG9mIGRlcGVuZGFudHMuIFRoaXNcblx0ICogaXMgZmVhc2libGUgZHVlIHRvIHRoZSBuYXR1cmUgb2YgV2Vha01hcCBpbiBhbGxvd2luZyBnYXJiYWdlIGNvbGxlY3Rpb25cblx0ICogdG8gb2NjdXIgb24gZW50cmllcyB3aGVyZSB0aGUga2V5IG9iamVjdCBpcyBubyBsb25nZXIgcmVmZXJlbmNlZC4gU2luY2Vcblx0ICogV2Vha01hcCByZXF1aXJlcyB0aGUga2V5IHRvIGJlIGFuIG9iamVjdCwgdGhpcyBpcyBvbmx5IHBvc3NpYmxlIHdoZW4gdGhlXG5cdCAqIGRlcGVuZGFudCBpcyBvYmplY3QtbGlrZS4gVGhlIHJvb3QgY2FjaGUgaXMgY3JlYXRlZCBhcyBhIGhpZXJhcmNoeSB3aGVyZVxuXHQgKiBlYWNoIHRvcC1sZXZlbCBrZXkgaXMgdGhlIGZpcnN0IGVudHJ5IGluIGEgZGVwZW5kYW50cyBzZXQsIHRoZSB2YWx1ZSBhXG5cdCAqIFdlYWtNYXAgd2hlcmUgZWFjaCBrZXkgaXMgdGhlIG5leHQgZGVwZW5kYW50LCBhbmQgc28gb24uIFRoaXMgY29udGludWVzXG5cdCAqIHNvIGxvbmcgYXMgdGhlIGRlcGVuZGFudHMgYXJlIG9iamVjdC1saWtlLiBJZiBubyBkZXBlbmRhbnRzIGFyZSBvYmplY3QtXG5cdCAqIGxpa2UsIHRoZW4gdGhlIGNhY2hlIGlzIHNoYXJlZCBhY3Jvc3MgYWxsIGludm9jYXRpb25zLlxuXHQgKlxuXHQgKiBAc2VlIGlzT2JqZWN0TGlrZVxuXHQgKlxuXHQgKiBAcGFyYW0ge0FycmF5fSBkZXBlbmRhbnRzIFNlbGVjdG9yIGRlcGVuZGFudHMuXG5cdCAqXG5cdCAqIEByZXR1cm4ge09iamVjdH0gQ2FjaGUgb2JqZWN0LlxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0V2Vha01hcENhY2hlKCBkZXBlbmRhbnRzICkge1xuXHRcdHZhciBjYWNoZXMgPSByb290Q2FjaGUsXG5cdFx0XHRpc1VuaXF1ZUJ5RGVwZW5kYW50cyA9IHRydWUsXG5cdFx0XHRpLCBkZXBlbmRhbnQsIG1hcCwgY2FjaGU7XG5cblx0XHRmb3IgKCBpID0gMDsgaSA8IGRlcGVuZGFudHMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRkZXBlbmRhbnQgPSBkZXBlbmRhbnRzWyBpIF07XG5cblx0XHRcdC8vIENhbiBvbmx5IGNvbXBvc2UgV2Vha01hcCBmcm9tIG9iamVjdC1saWtlIGtleS5cblx0XHRcdGlmICggISBpc09iamVjdExpa2UoIGRlcGVuZGFudCApICkge1xuXHRcdFx0XHRpc1VuaXF1ZUJ5RGVwZW5kYW50cyA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0Ly8gRG9lcyBjdXJyZW50IHNlZ21lbnQgb2YgY2FjaGUgYWxyZWFkeSBoYXZlIGEgV2Vha01hcD9cblx0XHRcdGlmICggY2FjaGVzLmhhcyggZGVwZW5kYW50ICkgKSB7XG5cdFx0XHRcdC8vIFRyYXZlcnNlIGludG8gbmVzdGVkIFdlYWtNYXAuXG5cdFx0XHRcdGNhY2hlcyA9IGNhY2hlcy5nZXQoIGRlcGVuZGFudCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gQ3JlYXRlLCBzZXQsIGFuZCB0cmF2ZXJzZSBpbnRvIGEgbmV3IG9uZS5cblx0XHRcdFx0bWFwID0gbmV3IFdlYWtNYXAoKTtcblx0XHRcdFx0Y2FjaGVzLnNldCggZGVwZW5kYW50LCBtYXAgKTtcblx0XHRcdFx0Y2FjaGVzID0gbWFwO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFdlIHVzZSBhbiBhcmJpdHJhcnkgKGJ1dCBjb25zaXN0ZW50KSBvYmplY3QgYXMga2V5IGZvciB0aGUgbGFzdCBpdGVtXG5cdFx0Ly8gaW4gdGhlIFdlYWtNYXAgdG8gc2VydmUgYXMgb3VyIHJ1bm5pbmcgY2FjaGUuXG5cdFx0aWYgKCAhIGNhY2hlcy5oYXMoIExFQUZfS0VZICkgKSB7XG5cdFx0XHRjYWNoZSA9IGNyZWF0ZUNhY2hlKCk7XG5cdFx0XHRjYWNoZS5pc1VuaXF1ZUJ5RGVwZW5kYW50cyA9IGlzVW5pcXVlQnlEZXBlbmRhbnRzO1xuXHRcdFx0Y2FjaGVzLnNldCggTEVBRl9LRVksIGNhY2hlICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNhY2hlcy5nZXQoIExFQUZfS0VZICk7XG5cdH1cblxuXHQvLyBBc3NpZ24gY2FjaGUgaGFuZGxlciBieSBhdmFpbGFiaWxpdHkgb2YgV2Vha01hcFxuXHRnZXRDYWNoZSA9IGhhc1dlYWtNYXAgPyBnZXRXZWFrTWFwQ2FjaGUgOiBnZXRSb290Q2FjaGU7XG5cblx0LyoqXG5cdCAqIFJlc2V0cyByb290IG1lbW9pemF0aW9uIGNhY2hlLlxuXHQgKi9cblx0ZnVuY3Rpb24gY2xlYXIoKSB7XG5cdFx0cm9vdENhY2hlID0gaGFzV2Vha01hcCA/IG5ldyBXZWFrTWFwKCkgOiBjcmVhdGVDYWNoZSgpO1xuXHR9XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzZG9jL2NoZWNrLXBhcmFtLW5hbWVzXG5cdC8qKlxuXHQgKiBUaGUgYXVnbWVudGVkIHNlbGVjdG9yIGNhbGwsIGNvbnNpZGVyaW5nIGZpcnN0IHdoZXRoZXIgZGVwZW5kYW50cyBoYXZlXG5cdCAqIGNoYW5nZWQgYmVmb3JlIHBhc3NpbmcgaXQgdG8gdW5kZXJseWluZyBtZW1vaXplIGZ1bmN0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gc291cmNlICAgIFNvdXJjZSBvYmplY3QgZm9yIGRlcml2YXRpb24uXG5cdCAqIEBwYXJhbSB7Li4uKn0gICBleHRyYUFyZ3MgQWRkaXRpb25hbCBhcmd1bWVudHMgdG8gcGFzcyB0byBzZWxlY3Rvci5cblx0ICpcblx0ICogQHJldHVybiB7Kn0gU2VsZWN0b3IgcmVzdWx0LlxuXHQgKi9cblx0ZnVuY3Rpb24gY2FsbFNlbGVjdG9yKCAvKiBzb3VyY2UsIC4uLmV4dHJhQXJncyAqLyApIHtcblx0XHR2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRcdGNhY2hlLCBub2RlLCBpLCBhcmdzLCBkZXBlbmRhbnRzO1xuXG5cdFx0Ly8gQ3JlYXRlIGNvcHkgb2YgYXJndW1lbnRzIChhdm9pZCBsZWFraW5nIGRlb3B0aW1pemF0aW9uKS5cblx0XHRhcmdzID0gbmV3IEFycmF5KCBsZW4gKTtcblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0YXJnc1sgaSBdID0gYXJndW1lbnRzWyBpIF07XG5cdFx0fVxuXG5cdFx0ZGVwZW5kYW50cyA9IGdldERlcGVuZGFudHMuYXBwbHkoIG51bGwsIGFyZ3MgKTtcblx0XHRjYWNoZSA9IGdldENhY2hlKCBkZXBlbmRhbnRzICk7XG5cblx0XHQvLyBJZiBub3QgZ3VhcmFudGVlZCB1bmlxdWVuZXNzIGJ5IGRlcGVuZGFudHMgKHByaW1pdGl2ZSB0eXBlIG9yIGxhY2tcblx0XHQvLyBvZiBXZWFrTWFwIHN1cHBvcnQpLCBzaGFsbG93IGNvbXBhcmUgYWdhaW5zdCBsYXN0IGRlcGVuZGFudHMgYW5kLCBpZlxuXHRcdC8vIHJlZmVyZW5jZXMgaGF2ZSBjaGFuZ2VkLCBkZXN0cm95IGNhY2hlIHRvIHJlY2FsY3VsYXRlIHJlc3VsdC5cblx0XHRpZiAoICEgY2FjaGUuaXNVbmlxdWVCeURlcGVuZGFudHMgKSB7XG5cdFx0XHRpZiAoIGNhY2hlLmxhc3REZXBlbmRhbnRzICYmICEgaXNTaGFsbG93RXF1YWwoIGRlcGVuZGFudHMsIGNhY2hlLmxhc3REZXBlbmRhbnRzLCAwICkgKSB7XG5cdFx0XHRcdGNhY2hlLmNsZWFyKCk7XG5cdFx0XHR9XG5cblx0XHRcdGNhY2hlLmxhc3REZXBlbmRhbnRzID0gZGVwZW5kYW50cztcblx0XHR9XG5cblx0XHRub2RlID0gY2FjaGUuaGVhZDtcblx0XHR3aGlsZSAoIG5vZGUgKSB7XG5cdFx0XHQvLyBDaGVjayB3aGV0aGVyIG5vZGUgYXJndW1lbnRzIG1hdGNoIGFyZ3VtZW50c1xuXHRcdFx0aWYgKCAhIGlzU2hhbGxvd0VxdWFsKCBub2RlLmFyZ3MsIGFyZ3MsIDEgKSApIHtcblx0XHRcdFx0bm9kZSA9IG5vZGUubmV4dDtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQgd2UgY2FuIGFzc3VtZSB3ZSd2ZSBmb3VuZCBhIG1hdGNoXG5cblx0XHRcdC8vIFN1cmZhY2UgbWF0Y2hlZCBub2RlIHRvIGhlYWQgaWYgbm90IGFscmVhZHlcblx0XHRcdGlmICggbm9kZSAhPT0gY2FjaGUuaGVhZCApIHtcblx0XHRcdFx0Ly8gQWRqdXN0IHNpYmxpbmdzIHRvIHBvaW50IHRvIGVhY2ggb3RoZXIuXG5cdFx0XHRcdG5vZGUucHJldi5uZXh0ID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRpZiAoIG5vZGUubmV4dCApIHtcblx0XHRcdFx0XHRub2RlLm5leHQucHJldiA9IG5vZGUucHJldjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG5vZGUubmV4dCA9IGNhY2hlLmhlYWQ7XG5cdFx0XHRcdG5vZGUucHJldiA9IG51bGw7XG5cdFx0XHRcdGNhY2hlLmhlYWQucHJldiA9IG5vZGU7XG5cdFx0XHRcdGNhY2hlLmhlYWQgPSBub2RlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXR1cm4gaW1tZWRpYXRlbHlcblx0XHRcdHJldHVybiBub2RlLnZhbDtcblx0XHR9XG5cblx0XHQvLyBObyBjYWNoZWQgdmFsdWUgZm91bmQuIENvbnRpbnVlIHRvIGluc2VydGlvbiBwaGFzZTpcblxuXHRcdG5vZGUgPSB7XG5cdFx0XHQvLyBHZW5lcmF0ZSB0aGUgcmVzdWx0IGZyb20gb3JpZ2luYWwgZnVuY3Rpb25cblx0XHRcdHZhbDogc2VsZWN0b3IuYXBwbHkoIG51bGwsIGFyZ3MgKSxcblx0XHR9O1xuXG5cdFx0Ly8gQXZvaWQgaW5jbHVkaW5nIHRoZSBzb3VyY2Ugb2JqZWN0IGluIHRoZSBjYWNoZS5cblx0XHRhcmdzWyAwIF0gPSBudWxsO1xuXHRcdG5vZGUuYXJncyA9IGFyZ3M7XG5cblx0XHQvLyBEb24ndCBuZWVkIHRvIGNoZWNrIHdoZXRoZXIgbm9kZSBpcyBhbHJlYWR5IGhlYWQsIHNpbmNlIGl0IHdvdWxkXG5cdFx0Ly8gaGF2ZSBiZWVuIHJldHVybmVkIGFib3ZlIGFscmVhZHkgaWYgaXQgd2FzXG5cblx0XHQvLyBTaGlmdCBleGlzdGluZyBoZWFkIGRvd24gbGlzdFxuXHRcdGlmICggY2FjaGUuaGVhZCApIHtcblx0XHRcdGNhY2hlLmhlYWQucHJldiA9IG5vZGU7XG5cdFx0XHRub2RlLm5leHQgPSBjYWNoZS5oZWFkO1xuXHRcdH1cblxuXHRcdGNhY2hlLmhlYWQgPSBub2RlO1xuXG5cdFx0cmV0dXJuIG5vZGUudmFsO1xuXHR9XG5cblx0Y2FsbFNlbGVjdG9yLmdldERlcGVuZGFudHMgPSBnZXREZXBlbmRhbnRzO1xuXHRjYWxsU2VsZWN0b3IuY2xlYXIgPSBjbGVhcjtcblx0Y2xlYXIoKTtcblxuXHRyZXR1cm4gY2FsbFNlbGVjdG9yO1xufVxuIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJyZWdlbmVyYXRvclJ1bnRpbWVcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1wiaGVscGVyc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJtb2RlbFwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJ2YWxpZGF0b3JzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJhcGlGZXRjaFwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIndwXCJdW1wiZGF0YVwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIndwXCJdW1wiaXNTaGFsbG93RXF1YWxcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJsb2Rhc2hcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==
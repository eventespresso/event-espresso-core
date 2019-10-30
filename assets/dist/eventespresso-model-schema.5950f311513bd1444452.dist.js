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
  return {};
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
          _context.next = 6;
          return Object(_actions__WEBPACK_IMPORTED_MODULE_4__["receiveSchemaForModelAndResolve"])(modelName, schema);

        case 6:
          return _context.abrupt("return", schema);

        case 7:
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
          _context2.next = 10;
          return Object(_actions__WEBPACK_IMPORTED_MODULE_4__["receiveFactoryForModelAndResolve"])(modelName, factory);

        case 10:
          return _context2.abrupt("return", factory);

        case 11:
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
  var schema = state.schema.get(Object(_eventespresso_model__WEBPACK_IMPORTED_MODULE_2__["singularModelName"])(modelName), null);
  return schema;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9iYXNlLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9iYXNlLW1vZGVsLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9iYXNlLXNlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vYXNzZXRzL3NyYy9kYXRhL2V2ZW50ZXNwcmVzc28vY29yZS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL2Fzc2V0cy9zcmMvZGF0YS9ldmVudGVzcHJlc3NvL3NjaGVtYS9hY3Rpb24tdHlwZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL2Fzc2V0cy9zcmMvZGF0YS9ldmVudGVzcHJlc3NvL3NjaGVtYS9hY3Rpb25zLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9zY2hlbWEvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9zY2hlbWEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL2Fzc2V0cy9zcmMvZGF0YS9ldmVudGVzcHJlc3NvL3NjaGVtYS9tb2RlbC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vYXNzZXRzL3NyYy9kYXRhL2V2ZW50ZXNwcmVzc28vc2NoZW1hL3JlZHVjZXJzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9zY2hlbWEvcmVzb2x2ZXJzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9zY2hlbWEvc2VsZWN0b3JzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9ub2RlX21vZHVsZXMvaW1tdXRhYmxlL2Rpc3QvaW1tdXRhYmxlLmVzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9ub2RlX21vZHVsZXMvcGx1cmFsaXplL3BsdXJhbGl6ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vbm9kZV9tb2R1bGVzL3JlbWVtby9lcy9yZW1lbW8uanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6XCJyZWdlbmVyYXRvclJ1bnRpbWVcIn0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaGVscGVyc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwibW9kZWxcIl19Iiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZhbGlkYXRvcnNcIl19Iiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJhcGlGZXRjaFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImRhdGFcIl19Iiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJpc1NoYWxsb3dFcXVhbFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iXSwibmFtZXMiOlsiZmV0Y2giLCJyZXF1ZXN0IiwidHlwZSIsInNlbGVjdCIsInJlZHVjZXJLZXkiLCJzZWxlY3Rvck5hbWUiLCJhcmdzIiwicmVzb2x2ZVNlbGVjdCIsImRpc3BhdGNoIiwiZGlzcGF0Y2hOYW1lIiwicmVzb2x2ZURpc3BhdGNoIiwicmVzb2x2ZUdldEVudGl0eUJ5SWRGb3JJZHMiLCJtb2RlbE5hbWUiLCJlbnRpdHlJZHMiLCJyZXNvbHZlR2V0UmVsYXRlZEVudGl0aWVzIiwiZW50aXR5IiwicmVsYXRpb25FbnRpdGllcyIsInJlbGF0aW9uSWRzIiwiY29udHJvbHMiLCJGRVRDSF9GUk9NX0FQSSIsImFwaUZldGNoIiwiU0VMRUNUIiwic2VsZWN0RGF0YSIsIkRJU1BBVENIIiwiZGlzcGF0Y2hEYXRhIiwiUkVTT0xWRV9ESVNQQVRDSCIsIlJFU09MVkVfU0VMRUNUIiwiUHJvbWlzZSIsInJlc29sdmUiLCJoYXNGaW5pc2hlZCIsImhhc0ZpbmlzaGVkUmVzb2x1dGlvbiIsImdldFJlc3VsdCIsImFwcGx5IiwicmVzdWx0IiwidW5zdWJzY3JpYmUiLCJzdWJzY3JpYmUiLCJSRVNPTFZFX0dFVF9FTlRJVFlfQllfSURfRk9SX0lEUyIsImxlbmd0aCIsIkNPUkVfUkVEVUNFUl9LRVkiLCJwb3AiLCJSRVNPTFZFX0dFVF9SRUxBVEVEX0VOVElUSUVTIiwicmVsYXRpb25FbnRpdHkiLCJnZXQiLCJwbHVyYWxNb2RlbE5hbWUiLCJnZXRNZXRob2ROYW1lIiwic3VmZml4IiwicHJlZml4IiwidXNlUGx1cmFsIiwicGx1cmFsaXplIiwidXBwZXJGaXJzdCIsImNhbWVsQ2FzZSIsImtlZXBFeGlzdGluZ0VudGl0aWVzSW5PYmplY3QiLCJleGlzdGluZ0VudGl0aWVzIiwiaW5jb21pbmdFbnRpdGllcyIsImdldEV4aXN0aW5nT3JEZWZhdWx0RW50aXR5IiwiZGVmYXVsdEVudGl0eSIsImVudGl0eUlkIiwiaXNNYXAiLCJoYXMiLCJyZWR1Y2VDYWxsYmFjayIsIm1hcHBlZCIsIm5vcm1hbGl6ZUVudGl0eUlkIiwic2V0IiwibWFwUmVkdWNlciIsIk1hcCIsInJlZHVjZSIsIm9yaWdpbmFsSWQiLCJwYXJzZUludCIsImlzTmFOIiwiaXNSZXNvbHZpbmciLCJoYXNGaW5pc2hlZFJlc29sdmluZyIsIlJFRFVDRVJfS0VZIiwiVFlQRV9RVUVVRV9SRUxBVElPTl9ERUxFVEUiLCJUWVBFX1FVRVVFX1JFTEFUSU9OX0FERCIsIkFDVElPTl9UWVBFUyIsIlJFQ0VJVkVfU0NIRU1BX1JFQ09SRCIsIlJFQ0VJVkVfRkFDVE9SWV9GT1JfTU9ERUwiLCJSRUNFSVZFX1JFTEFUSU9OX0VORFBPSU5UX0ZPUl9NT0RFTF9FTlRJVFkiLCJSRUNFSVZFX1JFTEFUSU9OX1NDSEVNQSIsInJlY2VpdmVTY2hlbWFGb3JNb2RlbEFuZFJlc29sdmUiLCJyZWNlaXZlRmFjdG9yeUZvck1vZGVsQW5kUmVzb2x2ZSIsInJlY2VpdmVSZWxhdGlvblNjaGVtYUFuZFJlc29sdmUiLCJyZWNlaXZlU2NoZW1hRm9yTW9kZWwiLCJzY2hlbWEiLCJ0eXBlcyIsIlNDSEVNQV9SRURVQ0VSX0tFWSIsInRvTG93ZXJDYXNlIiwicmVjZWl2ZUZhY3RvcnlGb3JNb2RlbCIsImZhY3RvcnkiLCJyZWNlaXZlUmVsYXRpb25FbmRwb2ludEZvck1vZGVsRW50aXR5IiwicmVsYXRpb25OYW1lIiwiZW5kcG9pbnQiLCJyZWNlaXZlUmVsYXRpb25TY2hlbWEiLCJyZWxhdGlvblNjaGVtYSIsIkpPSU5fUkVMQVRJT05fVFlQRVMiLCJlbnRpdHlTZWxlY3RvcnMiLCJjcmVhdGVFbnRpdHlTZWxlY3RvcnMiLCJzZWxlY3RvcnMiLCJlbnRpdHlSZXNvbHZlcnMiLCJjcmVhdGVFbnRpdHlSZXNvbHZlcnMiLCJyZXNvbHZlcnMiLCJyZWdpc3RlclN0b3JlIiwicmVkdWNlciIsImFjdGlvbnMiLCJTQ0hFTUFfS0VZIiwic291cmNlIiwiTU9ERUxfTkFNRVMiLCJzY2hlbWFNZXRob2ROYW1lIiwiZmFjdG9yeU1ldGhvZE5hbWUiLCJzdGF0ZSIsImdldFNjaGVtYUZvck1vZGVsIiwiZ2V0RmFjdG9yeUZvck1vZGVsIiwiREVGQVVMVF9TVEFURV9TQ0hFTUEiLCJmcm9tSlMiLCJERUZBVUxUX1NDSEVNQV9TVEFURSIsIkRFRkFVTFRfU1RBVEVfRkFDVE9SWSIsIkRFRkFVTFRfU1RBVEVfRU5EUE9JTlRTIiwicmVsYXRpb25FbmRwb2ludHMiLCJERUZBVUxUX1NUQVRFX1JFTEFUSU9OUyIsInJlY2VpdmVTY2hlbWEiLCJhY3Rpb24iLCJzaW5ndWxhck1vZGVsTmFtZSIsImlzU2NoZW1hUmVzcG9uc2VPZk1vZGVsIiwiZSIsInJlY2VpdmVGYWN0b3J5IiwiaXNNb2RlbEVudGl0eUZhY3RvcnlPZk1vZGVsIiwicmVjZWl2ZVJlbGF0aW9uRW5kcG9pbnRGb3JFbnRpdHkiLCJzZXRJbiIsImlzU2hhbGxvd0VxdWFsIiwiZ2V0SW4iLCJjb21iaW5lUmVkdWNlcnMiLCJnZXRSZWxhdGlvbkVuZHBvaW50Rm9yRW50aXR5SWQiLCJnZXRSZWxhdGlvblByaW1hcnlLZXlTdHJpbmciLCJnZXRSZWxhdGlvblJlc3BvbnNlVHlwZSIsImhhc0pvaW5UYWJsZVJlbGF0aW9uIiwiZ2V0UmVsYXRpb25UeXBlIiwiaHlkcmF0ZVJlbGF0aW9uU2NoZW1hIiwiZ2V0UmVsYXRpb25TY2hlbWEiLCJwYXRoIiwiZ2V0RW5kcG9pbnQiLCJtZXRob2QiLCJjcmVhdGVFbnRpdHlGYWN0b3J5IiwiTU9ERUxfUFJFRklYRVMiLCJyZWxhdGlvbk1vZGVsTmFtZSIsInBsdXJhbFJlbGF0aW9uTmFtZSIsImlzTW9kZWxFbnRpdHkiLCJzdHJpcEJhc2VSb3V0ZUZyb21VcmwiLCJyZXNvdXJjZUxpbmsiLCJyZXNwb25zZSIsIl9saW5rcyIsImxpbmtzIiwiYmFzZVJlbGF0aW9uUGF0aCIsInJlbGF0aW9uVHlwZSIsInJlbGF0aW9uUHJpbWFyeUtleSIsImdldFByaW1hcnlLZXkiLCJtb2RlbE5hbWVGb3JRdWVyeVN0cmluZyIsImluZGV4T2YiLCJyZWxhdGlvbl90eXBlIiwiRXJyb3IiLCJ0eXBlU2NoZW1hIiwiaGFzT3duUHJvcGVydHkiLCJwcm9wZXJ0aWVzIiwiaXNVbmRlZmluZWQiLCJpc1JlcXVlc3RpbmdTY2hlbWFGb3JNb2RlbCIsImhhc1Jlc29sdmVkU2NoZW1hRm9yTW9kZWwiLCJpc1JlcXVlc3RpbmdGYWN0b3J5Rm9yTW9kZWwiLCJoYXNSZXNvbHZlZEZhY3RvcnlGb3JNb2RlbCIsImlzUmVxdWVzdGluZ1JlbGF0aW9uRW5kcG9pbnRGb3JFbnRpdHlJZCIsImNyZWF0ZVNlbGVjdG9yIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Es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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFVBQVU7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyxLQUFLO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSwrRUFBK0U7QUFDL0U7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwwQkFBMEIscUJBQXFCLEVBQUU7O0FBRWpEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix1REFBdUQsRUFBRTtBQUNuRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQiw4Q0FBOEMsRUFBRTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsK0RBQStELEVBQUU7QUFDM0Y7QUFDQTtBQUNBLGdDQUFnQyw4Q0FBOEMsRUFBRTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNDQUFzQyxFQUFFO0FBQ3BFLCtCQUErQixxREFBcUQsRUFBRTtBQUN0RjtBQUNBO0FBQ0EsNENBQTRDLCtDQUErQyxFQUFFO0FBQzdGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0RBQW9ELGVBQWUsRUFBRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNFQUFzRTtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsaUJBQWlCLEVBQUU7QUFDL0Qsb0RBQW9ELGVBQWUsRUFBRSw2QkFBNkIsZUFBZSxFQUFFO0FBQ25IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELGdCQUFnQixFQUFFO0FBQ3JFO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFVBQVU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsd0JBQXdCO0FBQzNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFVBQVU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxVQUFVO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsV0FBVztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsZ0JBQWdCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxnQkFBZ0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGVBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxzQkFBc0IsRUFBRTtBQUNsRSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdDQUF3QyxLQUFLO0FBQzdDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLGdEQUFnRCxFQUFFO0FBQzFFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQseUNBQXlDLEVBQUU7QUFDOUY7QUFDQTtBQUNBLCtCQUErQixpQkFBaUIsRUFBRTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIseUJBQXlCLEVBQUU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLG1CQUFtQixFQUFFO0FBQzVELFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDLEtBQUs7QUFDdEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHdDQUF3QywwQkFBMEIsRUFBRTtBQUNwRSxxQ0FBcUMsdUJBQXVCLEVBQUU7QUFDOUQsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMscUJBQXFCLEVBQUU7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUJBQW1CO0FBQ3pDLDhEQUE4RCx1QkFBdUIsRUFBRTtBQUN2RjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLCtCQUErQixFQUFFO0FBQ3hFO0FBQ0E7QUFDQSx3Q0FBd0MsNkJBQTZCLEVBQUU7QUFDdkU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsK0JBQStCLEVBQUU7QUFDeEU7QUFDQTtBQUNBLHNDQUFzQyw2QkFBNkIsRUFBRTtBQUNyRTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTZDLHlCQUF5QixFQUFFO0FBQ3hFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0EsdUNBQXVDLCtCQUErQixFQUFFO0FBQ3hFLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLCtFQUErRSxhQUFhLEVBQUU7QUFDOUYsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsMkJBQTJCO0FBQzNFO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLHdDQUF3QywyQkFBMkIsRUFBRTtBQUNyRSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsNkJBQTZCLEVBQUU7QUFDdkUsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMENBQTBDLCtCQUErQixFQUFFO0FBQzNFLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDJEQUEyRCxFQUFFO0FBQzNGO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsMkNBQTJDLEVBQUU7QUFDM0U7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELCtDQUErQzs7QUFFNUc7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsc0JBQXNCLEVBQUU7QUFDN0QsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwREFBMEQ7QUFDMUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLG1CQUFtQixFQUFFO0FBQzVELFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdDQUF3QyxLQUFLO0FBQzdDOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxrQ0FBa0MsU0FBUztBQUMzQztBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMERBQTBELDJCQUEyQixFQUFFO0FBQ3ZGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsMkVBQTJFO0FBQzNFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsMkRBQTJEO0FBQ25HO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRWUsd0VBQVMsRUFBQztBQUNtVjs7Ozs7Ozs7Ozs7O0FDenJMNVc7O0FBRUE7QUFDQTtBQUNBLE1BQU0sSUFBMEY7QUFDaEc7QUFDQTtBQUNBLEdBQUcsTUFBTSxFQVFOO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsZ0JBQWdCO0FBQzlCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsY0FBYyxPQUFPO0FBQ3JCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQixjQUFjLE1BQU07QUFDcEIsY0FBYztBQUNkO0FBQ0E7QUFDQSw4QkFBOEIsSUFBSTtBQUNsQztBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsY0FBYyxNQUFNO0FBQ3BCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCLGNBQWMsT0FBTztBQUNyQixjQUFjLE1BQU07QUFDcEIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQixjQUFjLE9BQU87QUFDckIsY0FBYyxNQUFNO0FBQ3BCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsY0FBYyxPQUFPO0FBQ3JCLGNBQWMsUUFBUTtBQUN0QixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxnQkFBZ0I7QUFDN0IsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0JBQWdCO0FBQzdCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGdCQUFnQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBdkQsYUFBYSw2Q0FBNkMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E1RCxhQUFhLHlDQUF5QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXhELGFBQWEscUNBQXFDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBcEQsYUFBYSwrQ0FBK0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E5RCxhQUFhLGlDQUFpQyxFQUFFLEkiLCJmaWxlIjoiZXZlbnRlc3ByZXNzby1tb2RlbC1zY2hlbWEuNTk1MGYzMTE1MTNiZDE0NDQ0NTIuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL3NyYy9kYXRhL2V2ZW50ZXNwcmVzc28vc2NoZW1hL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBhcGlGZXRjaCBmcm9tICdAd29yZHByZXNzL2FwaS1mZXRjaCc7XG5pbXBvcnQge1xuXHRzZWxlY3QgYXMgc2VsZWN0RGF0YSxcblx0ZGlzcGF0Y2ggYXMgZGlzcGF0Y2hEYXRhLFxuXHRzdWJzY3JpYmUsXG59IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBwbHVyYWxNb2RlbE5hbWUgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9tb2RlbCc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBSRURVQ0VSX0tFWSBhcyBDT1JFX1JFRFVDRVJfS0VZIH0gZnJvbSAnLi9jb3JlL2NvbnN0YW50cyc7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYWN0aW9uIG9iamVjdCBmb3IgYSBmZXRjaCBjb250cm9sLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gKiBAcmV0dXJuIHt7XG4gKiAgICAgIHR5cGU6IHN0cmluZyxcbiAqICAgICAgcmVxdWVzdDogT2JqZWN0XG4gKiB9fVxuICogQW4gYWN0aW9uIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2goIHJlcXVlc3QgKSB7XG5cdHJldHVybiB7fTtcblx0cmV0dXJuIHtcblx0XHR0eXBlOiAnRkVUQ0hfRlJPTV9BUEknLFxuXHRcdHJlcXVlc3QsXG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYWN0aW9uIG9iamVjdCBmb3IgYSBzZWxlY3QgY29udHJvbC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVkdWNlcktleVxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yTmFtZVxuICogQHBhcmFtIHsuLi5BcnJheXxib29sZWFufG51bWJlcnxPYmplY3R8c3RyaW5nfSBhcmdzXG4gKiBAcmV0dXJuIHt7XG4gKiAgICAgIHR5cGU6IHN0cmluZyxcbiAqICAgICAgcmVkdWNlcktleTogc3RyaW5nLFxuICogICAgICBzZWxlY3Rvck5hbWU6IHN0cmluZyxcbiAqICAgICAgYXJnczogLi4uQXJyYXl8Ym9vbGVhbnxudW1iZXJ8T2JqZWN0fHN0cmluZ1xuICogfX1cbiAqIFJldHVybnMgYW4gYWN0aW9uIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdCggcmVkdWNlcktleSwgc2VsZWN0b3JOYW1lLCAuLi5hcmdzICkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6ICdTRUxFQ1QnLFxuXHRcdHJlZHVjZXJLZXksXG5cdFx0c2VsZWN0b3JOYW1lLFxuXHRcdGFyZ3MsXG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYWN0aW9uIG9iamVjdCBmb3IgcmVzb2x2aW5nIGEgc2VsZWN0b3IgdGhhdCBoYXMgYSByZXNvbHZlci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVkdWNlcktleVxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yTmFtZVxuICogQHBhcmFtIHsuLi5BcnJheXxib29sZWFufG51bWJlcnxPYmplY3R8c3RyaW5nfSBhcmdzXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIGFjdGlvbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlU2VsZWN0KCByZWR1Y2VyS2V5LCBzZWxlY3Rvck5hbWUsIC4uLmFyZ3MgKSB7XG5cdHJldHVybiB7XG5cdFx0dHlwZTogJ1JFU09MVkVfU0VMRUNUJyxcblx0XHRyZWR1Y2VyS2V5LFxuXHRcdHNlbGVjdG9yTmFtZSxcblx0XHRhcmdzLFxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFjdGlvbiBvYmplY3QgZm9yIGEgZGlzcGF0Y2ggY29udHJvbC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVkdWNlcktleVxuICogQHBhcmFtIHtzdHJpbmd9IGRpc3BhdGNoTmFtZVxuICogQHBhcmFtIHsuLi5BcnJheXxib29sZWFufG51bWJlcnxPYmplY3R8c3RyaW5nfSBhcmdzXG4gKiBAcmV0dXJuIHt7XG4gKiAgICAgIHR5cGU6IHN0cmluZyxcbiAqICAgICAgcmVkdWNlcktleTogc3RyaW5nLFxuICogICAgICBkaXNwYXRjaE5hbWU6IHN0cmluZyxcbiAqICAgICAgYXJnczogLi4uQXJyYXl8Ym9vbGVhbnxudW1iZXJ8T2JqZWN0fHN0cmluZ1xuICogfX1cbiAqIEFuIGFjdGlvbiBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoKCByZWR1Y2VyS2V5LCBkaXNwYXRjaE5hbWUsIC4uLmFyZ3MgKSB7XG5cdHJldHVybiB7XG5cdFx0dHlwZTogJ0RJU1BBVENIJyxcblx0XHRyZWR1Y2VyS2V5LFxuXHRcdGRpc3BhdGNoTmFtZSxcblx0XHRhcmdzLFxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFjdGlvbiBvYmplY3QgZm9yIGEgcmVzb2x2ZSBkaXNwYXRjaCBjb250cm9sXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZHVjZXJLZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXNwYXRjaE5hbWVcbiAqIEBwYXJhbSB7Li4uQXJyYXl8Ym9vbGVhbnxudW1iZXJ8T2JqZWN0fHN0cmluZ30gYXJnc1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgYWN0aW9uIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVEaXNwYXRjaCggcmVkdWNlcktleSwgZGlzcGF0Y2hOYW1lLCAuLi5hcmdzICkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6ICdSRVNPTFZFX0RJU1BBVENIJyxcblx0XHRyZWR1Y2VyS2V5LFxuXHRcdGRpc3BhdGNoTmFtZSxcblx0XHRhcmdzLFxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFjdGlvbiBvYmplY3QgZm9yIHJlc29sdmluZyB0aGUgZ2V0RW50aXR5QnlJZCBzZWxlY3RvclxuICogZm9yIGFsbCB0aGUgZ2l2ZW4gaWRzIG9uIHRoZSBnaXZlbiBtb2RlbFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7QXJyYXl9IGVudGl0eUlkc1xuICogQHJldHVybiB7T2JqZWN0fSBBbiBhY3Rpb24gb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlR2V0RW50aXR5QnlJZEZvcklkcyggbW9kZWxOYW1lLCBlbnRpdHlJZHMgKSB7XG5cdHJldHVybiB7XG5cdFx0dHlwZTogJ1JFU09MVkVfR0VUX0VOVElUWV9CWV9JRF9GT1JfSURTJyxcblx0XHRtb2RlbE5hbWUsXG5cdFx0ZW50aXR5SWRzLFxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFjdGlvbiBvYmplY3QgZm9yIHJlc29sdmluZyB0aGUgZ2V0UmVsYXRlZEVudGl0aWVzIHNlbGVjdG9yXG4gKiBvbiB0aGUgZXZlbnRlc3ByZXNzby9jb3JlIHN0b3JlIGZvciB0aGUgZ2l2ZW4gYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7QmFzZUVudGl0eXxPYmplY3R9IGVudGl0eVxuICogQHBhcmFtIHtNYXB9IHJlbGF0aW9uRW50aXRpZXNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gcmVsYXRpb25JZHNcbiAqIEByZXR1cm4ge09iamVjdH0gQW4gYWN0aW9uIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUdldFJlbGF0ZWRFbnRpdGllcyhcblx0ZW50aXR5LFxuXHRyZWxhdGlvbkVudGl0aWVzLFxuXHRyZWxhdGlvbklkc1xuKSB7XG5cdHJldHVybiB7XG5cdFx0dHlwZTogJ1JFU09MVkVfR0VUX1JFTEFURURfRU5USVRJRVMnLFxuXHRcdGVudGl0eSxcblx0XHRyZWxhdGlvbkVudGl0aWVzLFxuXHRcdHJlbGF0aW9uSWRzLFxuXHR9O1xufVxuXG5jb25zdCBjb250cm9scyA9IHtcblx0RkVUQ0hfRlJPTV9BUEkoIHsgcmVxdWVzdCB9ICkge1xuXHRcdC8vIHJldHVybiB7fTtcblx0XHRyZXR1cm4gYXBpRmV0Y2goIHJlcXVlc3QgKTtcblx0fSxcblx0U0VMRUNUKCB7IHJlZHVjZXJLZXksIHNlbGVjdG9yTmFtZSwgYXJncyB9ICkge1xuXHRcdHJldHVybiBzZWxlY3REYXRhKCByZWR1Y2VyS2V5IClbIHNlbGVjdG9yTmFtZSBdKCAuLi5hcmdzICk7XG5cdH0sXG5cdERJU1BBVENIKCB7IHJlZHVjZXJLZXksIGRpc3BhdGNoTmFtZSwgYXJncyB9ICkge1xuXHRcdHJldHVybiBkaXNwYXRjaERhdGEoIHJlZHVjZXJLZXkgKVsgZGlzcGF0Y2hOYW1lIF0oIC4uLmFyZ3MgKTtcblx0fSxcblx0YXN5bmMgUkVTT0xWRV9ESVNQQVRDSCggeyByZWR1Y2VyS2V5LCBkaXNwYXRjaE5hbWUsIGFyZ3MgfSApIHtcblx0XHRyZXR1cm4gYXdhaXQgZGlzcGF0Y2hEYXRhKCByZWR1Y2VyS2V5IClbIGRpc3BhdGNoTmFtZSBdKCAuLi5hcmdzICk7XG5cdH0sXG5cdFJFU09MVkVfU0VMRUNUKCB7IHJlZHVjZXJLZXksIHNlbGVjdG9yTmFtZSwgYXJncyB9ICkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSggKCByZXNvbHZlICkgPT4ge1xuXHRcdFx0Y29uc3QgaGFzRmluaXNoZWQgPSAoKSA9PiBzZWxlY3REYXRhKCAnY29yZS9kYXRhJyApXG5cdFx0XHRcdC5oYXNGaW5pc2hlZFJlc29sdXRpb24oIHJlZHVjZXJLZXksIHNlbGVjdG9yTmFtZSwgYXJncyApO1xuXHRcdFx0Y29uc3QgZ2V0UmVzdWx0ID0gKCkgPT4gc2VsZWN0RGF0YSggcmVkdWNlcktleSApWyBzZWxlY3Rvck5hbWUgXVxuXHRcdFx0XHQuYXBwbHkoIG51bGwsIGFyZ3MgKTtcblxuXHRcdFx0Ly8gdHJpZ2dlciB0aGUgc2VsZWN0b3IgKHRvIHRyaWdnZXIgdGhlIHJlc29sdmVyKVxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gZ2V0UmVzdWx0KCk7XG5cdFx0XHRpZiAoIGhhc0ZpbmlzaGVkKCkgKSB7XG5cdFx0XHRcdHJldHVybiByZXNvbHZlKCByZXN1bHQgKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgdW5zdWJzY3JpYmUgPSBzdWJzY3JpYmUoICgpID0+IHtcblx0XHRcdFx0aWYgKCBoYXNGaW5pc2hlZCgpICkge1xuXHRcdFx0XHRcdHVuc3Vic2NyaWJlKCk7XG5cdFx0XHRcdFx0cmVzb2x2ZSggZ2V0UmVzdWx0KCkgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHRcdH0gKTtcblx0fSxcblx0UkVTT0xWRV9HRVRfRU5USVRZX0JZX0lEX0ZPUl9JRFMoIHsgbW9kZWxOYW1lLCBlbnRpdHlJZHMgfSApIHtcblx0XHR3aGlsZSAoIGVudGl0eUlkcy5sZW5ndGggPiAwICkge1xuXHRcdFx0ZGlzcGF0Y2hEYXRhKFxuXHRcdFx0XHQnY29yZS9kYXRhJyxcblx0XHRcdFx0J2ZpbmlzaFJlc29sdXRpb24nLFxuXHRcdFx0XHRDT1JFX1JFRFVDRVJfS0VZLFxuXHRcdFx0XHQnZ2V0RW50aXR5QnlJZCcsXG5cdFx0XHRcdFsgbW9kZWxOYW1lLCBlbnRpdHlJZHMucG9wKCkgXVxuXHRcdFx0KTtcblx0XHR9XG5cdH0sXG5cdFJFU09MVkVfR0VUX1JFTEFURURfRU5USVRJRVMoIHsgZW50aXR5LCByZWxhdGlvbkVudGl0aWVzLCByZWxhdGlvbklkcyB9ICkge1xuXHRcdHdoaWxlICggcmVsYXRpb25JZHMubGVuZ3RoID4gMCApIHtcblx0XHRcdGNvbnN0IHJlbGF0aW9uRW50aXR5ID0gcmVsYXRpb25FbnRpdGllcy5nZXQoIHJlbGF0aW9uSWRzLnBvcCgpICk7XG5cdFx0XHRpZiAoIHJlbGF0aW9uRW50aXR5ICkge1xuXHRcdFx0XHRkaXNwYXRjaERhdGEoXG5cdFx0XHRcdFx0J2NvcmUvZGF0YScsXG5cdFx0XHRcdFx0J2ZpbmlzaFJlc29sdXRpb24nLFxuXHRcdFx0XHRcdENPUkVfUkVEVUNFUl9LRVksXG5cdFx0XHRcdFx0J2dldFJlbGF0ZWRFbnRpdGllcycsXG5cdFx0XHRcdFx0WyByZWxhdGlvbkVudGl0eSwgcGx1cmFsTW9kZWxOYW1lKCBlbnRpdHkubW9kZWxOYW1lICkgXVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRyb2xzO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgdXBwZXJGaXJzdCwgY2FtZWxDYXNlLCByZWR1Y2UsIGlzTWFwLCBpc05hTiB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcGx1cmFsaXplIGZyb20gJ3BsdXJhbGl6ZSc7XG5pbXBvcnQgeyBtYXBSZWR1Y2VyIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaGVscGVycyc7XG5cbi8qKlxuICogQSBoZWxwZXIgZm9yIGdldHRpbmcgYSBtZXRob2QgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWZmaXhcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdXNlUGx1cmFsXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFJldHVybnMgYSBuYW1lIGZvciBhIG1ldGhvZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldE1ldGhvZE5hbWUgPSAoXG5cdG1vZGVsTmFtZSxcblx0c3VmZml4ID0gJycsXG5cdHByZWZpeCA9ICdnZXQnLFxuXHR1c2VQbHVyYWwgPSBmYWxzZVxuKSA9PiB7XG5cdG1vZGVsTmFtZSA9IHVzZVBsdXJhbCA/IHBsdXJhbGl6ZSggbW9kZWxOYW1lICkgOiBtb2RlbE5hbWU7XG5cdHJldHVybiBwcmVmaXggKyB1cHBlckZpcnN0KCBjYW1lbENhc2UoIG1vZGVsTmFtZSArIHVwcGVyRmlyc3QoIHN1ZmZpeCApICkgKTtcbn07XG5cbi8qKlxuICogR2l2ZW4gYSBjb2xsZWN0aW9uIG9mIGV4aXN0aW5nIGVudGl0aWVzIGFuZCBhIGNvbGxlY3Rpb24gb2YgaW5jb21pbmdcbiAqIGVudGl0aWVzLCB0aGlzIHJldHVybnMgYSBtZXJnZWQgb2JqZWN0IHdpdGggcHJlZmVyZW5jZSBnaXZlbiB0byBjb21tb25cbiAqIGVudGl0aWVzIGZyb20gdGhlIGV4aXN0aW5nRW50aXRpZXMgY29sbGVjdGlvbi5cbiAqXG4gKiBJbmNvbWluZyBjb2xsZWN0aW9ucyBjYW4gYmUgTWFwcyBvciBwbGFpbiBvYmplY3RzLlxuICpcbiAqIE5vdGUgaWYgaW5jb21pbmdFbnRpdGllcyBpcyBhIE1hcCwgdGhlIE9SREVSIG9mIHRoZSBtYXAgd2lsbCBiZSBwcmVzZXJ2ZWRcbiAqIGV2ZW4gaWYgdGhlIHZhbHVlcyBvZiBlbnRpdGllcyBpbiB0aGUgbWFwIGFyZSByZXBsYWNlZCBieSB2YWx1ZXMgZnJvbVxuICogZXhpc3RpbmcgZW50aXRpZXMuXG4gKlxuICogQHBhcmFtIHtNYXB8T2JqZWN0fSBleGlzdGluZ0VudGl0aWVzXG4gKiBAcGFyYW0ge01hcHxPYmplY3R9IGluY29taW5nRW50aXRpZXNcbiAqIEByZXR1cm4ge01hcH0gQSBuZXcgY29sbGVjdGlvbiBvZiBlbnRpdGllcy4gTm90ZSBpZiBleGlzdGluZyBlbnRpdGllcyBjYW1lIGluXG4gKiBhcyBhIHBsYWluIG9iamVjdCwgdGhpcyByZXR1cm5zIGEgTWFwLlxuICovXG5leHBvcnQgY29uc3Qga2VlcEV4aXN0aW5nRW50aXRpZXNJbk9iamVjdCA9IChcblx0ZXhpc3RpbmdFbnRpdGllcyxcblx0aW5jb21pbmdFbnRpdGllcyxcbikgPT4ge1xuXHRjb25zdCBnZXRFeGlzdGluZ09yRGVmYXVsdEVudGl0eSA9ICggZGVmYXVsdEVudGl0eSwgZW50aXR5SWQgKSA9PiB7XG5cdFx0aWYgKCBpc01hcCggZXhpc3RpbmdFbnRpdGllcyApICYmIGV4aXN0aW5nRW50aXRpZXMuaGFzKCBlbnRpdHlJZCApICkge1xuXHRcdFx0cmV0dXJuIGV4aXN0aW5nRW50aXRpZXMuZ2V0KCBlbnRpdHlJZCApO1xuXHRcdH1cblx0XHRyZXR1cm4gZXhpc3RpbmdFbnRpdGllc1sgZW50aXR5SWQgXSB8fCBkZWZhdWx0RW50aXR5O1xuXHR9O1xuXHRjb25zdCByZWR1Y2VDYWxsYmFjayA9ICggbWFwcGVkLCBlbnRpdHksIGVudGl0eUlkICkgPT4ge1xuXHRcdGVudGl0eUlkID0gbm9ybWFsaXplRW50aXR5SWQoIGVudGl0eUlkICk7XG5cdFx0bWFwcGVkLnNldCggZW50aXR5SWQsIGdldEV4aXN0aW5nT3JEZWZhdWx0RW50aXR5KCBlbnRpdHksIGVudGl0eUlkICkgKTtcblx0XHRyZXR1cm4gbWFwcGVkO1xuXHR9O1xuXHRyZXR1cm4gaXNNYXAoIGluY29taW5nRW50aXRpZXMgKSA/XG5cdFx0bWFwUmVkdWNlciggaW5jb21pbmdFbnRpdGllcywgcmVkdWNlQ2FsbGJhY2ssIG5ldyBNYXAoKSApIDpcblx0XHRyZWR1Y2UoIGluY29taW5nRW50aXRpZXMsIHJlZHVjZUNhbGxiYWNrLCBuZXcgTWFwKCkgKTtcbn07XG5cbi8qKlxuICogVGhpcyBub3JtYWxpemVzIG51bWVyaWMgdmFsdWVzIHRvIGludGVnZXIgbnVtYmVycyBhbmQgbGVhdmVzIG5vbiBudW1lcmljXG4gKiB2YWx1ZXMgYWxvbmUuXG4gKlxuICogQHBhcmFtIHsqfSBlbnRpdHlJZFxuICogQHJldHVybiB7Kn0gTm9ybWFsaXplZCB2YWx1ZVxuICovXG5jb25zdCBub3JtYWxpemVFbnRpdHlJZCA9ICggZW50aXR5SWQgKSA9PiB7XG5cdGNvbnN0IG9yaWdpbmFsSWQgPSBlbnRpdHlJZDtcblx0ZW50aXR5SWQgPSBwYXJzZUludCggZW50aXR5SWQsIDEwICk7XG5cdHJldHVybiBpc05hTiggZW50aXR5SWQgKSA/IG9yaWdpbmFsSWQgOiBlbnRpdHlJZDtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG4vKipcbiAqIEludm9rZXMgdGhlIHNlbGVjdG9yIGZvciB3aGV0aGVyIGEgZ2l2ZW4gc2VsZWN0b3JOYW1lIGluIGEgZ2l2ZW4gcmVnaXN0ZXJlZFxuICogcmVkdWNlciBzdG9yZSBpcyBpbiB0aGUgbWlkc3Qgb2YgcmVzb2x2aW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZHVjZXJLZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3Rvck5hbWVcbiAqIEBwYXJhbSB7KltdfSBhcmdzXG4gKiBAcmV0dXJuIHtib29sZWFufSAgV2hldGhlciByZXNvbHV0aW9uIGlzIGluIHByb2dyZXNzLlxuICovXG5leHBvcnQgY29uc3QgaXNSZXNvbHZpbmcgPSAoIHJlZHVjZXJLZXksIHNlbGVjdG9yTmFtZSwgLi4uYXJncyApID0+IHtcblx0cmV0dXJuIHNlbGVjdCggJ2NvcmUvZGF0YScgKS5pc1Jlc29sdmluZyggcmVkdWNlcktleSwgc2VsZWN0b3JOYW1lLCBhcmdzICk7XG59O1xuXG4vKipcbiAqIEludm9rZXMgdGhlIHNlbGVjdG9yIGZvciB3aGV0aGVyIGEgZ2l2ZW4gc2VsZWN0b3JOYW1lIGluIGEgZ2l2ZW4gcmVnaXN0ZXJlZFxuICogcmVkdWNlciBzdG9yZSBoYXMgZmluaXNoZWQgcmVzb2x2aW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWR1Y2VyS2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JOYW1lXG4gKiBAcGFyYW0geypbXX0gYXJnc1xuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciByZXNvbHV0aW9uIGhhcyBjb21wbGV0ZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNGaW5pc2hlZFJlc29sdmluZyA9ICggcmVkdWNlcktleSwgc2VsZWN0b3JOYW1lLCAuLi5hcmdzICkgPT4ge1xuXHRyZXR1cm4gc2VsZWN0KCAnY29yZS9kYXRhJyApXG5cdFx0Lmhhc0ZpbmlzaGVkUmVzb2x1dGlvbiggcmVkdWNlcktleSwgc2VsZWN0b3JOYW1lLCBhcmdzICk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IFJFRFVDRVJfS0VZID0gJ2V2ZW50ZXNwcmVzc28vY29yZSc7XG5leHBvcnQgY29uc3QgVFlQRV9RVUVVRV9SRUxBVElPTl9ERUxFVEUgPSAnZGVsZXRlJztcbmV4cG9ydCBjb25zdCBUWVBFX1FVRVVFX1JFTEFUSU9OX0FERCA9ICdhZGQnO1xuIiwiZXhwb3J0IGNvbnN0IEFDVElPTl9UWVBFUyA9IHtcblx0UkVDRUlWRV9TQ0hFTUFfUkVDT1JEOiAnUkVDRUlWRV9TQ0hFTUFfUkVDT1JEJyxcblx0UkVDRUlWRV9GQUNUT1JZX0ZPUl9NT0RFTDogJ1JFQ0VJVkVfRkFDVE9SWV9GT1JfTU9ERUwnLFxuXHRSRUNFSVZFX1JFTEFUSU9OX0VORFBPSU5UX0ZPUl9NT0RFTF9FTlRJVFk6XG5cdFx0J1JFQ0VJVkVfUkVMQVRJT05fRU5EUE9JTlRfRk9SX01PREVMX0VOVElUWScsXG5cdFJFQ0VJVkVfUkVMQVRJT05fU0NIRU1BOiAnUkVDRUlWRV9SRUxBVElPTl9TQ0hFTUEnLFxufTtcbiIsIi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBBQ1RJT05fVFlQRVMgYXMgdHlwZXMgfSBmcm9tICcuL2FjdGlvbi10eXBlcyc7XG5pbXBvcnQge1xuXHRSRURVQ0VSX0tFWSBhcyBTQ0hFTUFfUkVEVUNFUl9LRVksXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IGRpc3BhdGNoIH0gZnJvbSAnLi4vYmFzZS1jb250cm9scyc7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhY3Rpb24gb2JqZWN0IHVzZWQgdG8gdXBkYXRlIHRoZSBzdG9yZSB3aXRoIHRoZSBwcm92aWRlZCBzY2hlbWFcbiAqIGZvciB0aGUgcHJvdmlkZWQgbW9kZWxOYW1lLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge3t0eXBlOiBzdHJpbmcsIG1vZGVsTmFtZTogKiwgc2NoZW1hfX0gIFRoZSBhY3Rpb24gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVjZWl2ZVNjaGVtYUZvck1vZGVsKCBtb2RlbE5hbWUsIHNjaGVtYSA9IHt9ICkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6IHR5cGVzLlJFQ0VJVkVfU0NIRU1BX1JFQ09SRCxcblx0XHRtb2RlbE5hbWUsXG5cdFx0c2NoZW1hLFxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24qIHJlY2VpdmVTY2hlbWFGb3JNb2RlbEFuZFJlc29sdmUoIG1vZGVsTmFtZSwgc2NoZW1hID0ge30gKSB7XG5cdHlpZWxkIGRpc3BhdGNoKFxuXHRcdFNDSEVNQV9SRURVQ0VSX0tFWSxcblx0XHQncmVjZWl2ZVNjaGVtYUZvck1vZGVsJyxcblx0XHRtb2RlbE5hbWUsXG5cdFx0c2NoZW1hXG5cdCk7XG5cdHlpZWxkIGRpc3BhdGNoKFxuXHRcdCdjb3JlL2RhdGEnLFxuXHRcdCdmaW5pc2hSZXNvbHV0aW9uJyxcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J2dldFNjaGVtYUZvck1vZGVsJyxcblx0XHRbIG1vZGVsTmFtZS50b0xvd2VyQ2FzZSgpIF1cblx0KTtcblx0cmV0dXJuIHNjaGVtYTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFjdGlvbiBvYmplY3QgdXNlZCB0byB1cGRhdGUgdGhlIHN0b3JlIHdpdGggdGhlIHByb3ZpZGVkIG1vZGVsXG4gKiBlbnRpdHkgZmFjdG9yeSBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsTmFtZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gZmFjdG9yeVxuICogQHJldHVybiB7e3R5cGU6IHN0cmluZywgbW9kZWxOYW1lOiBzdHJpbmcsIGZhY3Rvcnk6IE9iamVjdH19IEFuIGFjdGlvblxuICogb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVjZWl2ZUZhY3RvcnlGb3JNb2RlbCggbW9kZWxOYW1lLCBmYWN0b3J5ID0ge30gKSB7XG5cdHJldHVybiB7XG5cdFx0dHlwZTogdHlwZXMuUkVDRUlWRV9GQUNUT1JZX0ZPUl9NT0RFTCxcblx0XHRtb2RlbE5hbWUsXG5cdFx0ZmFjdG9yeSxcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uKiByZWNlaXZlRmFjdG9yeUZvck1vZGVsQW5kUmVzb2x2ZSggbW9kZWxOYW1lLCBmYWN0b3J5ID0ge30gKSB7XG5cdHlpZWxkIGRpc3BhdGNoKFxuXHRcdFNDSEVNQV9SRURVQ0VSX0tFWSxcblx0XHQncmVjZWl2ZUZhY3RvcnlGb3JNb2RlbCcsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdGZhY3Rvcnlcblx0KTtcblx0eWllbGQgZGlzcGF0Y2goXG5cdFx0J2NvcmUvZGF0YScsXG5cdFx0J2ZpbmlzaFJlc29sdXRpb24nLFxuXHRcdFNDSEVNQV9SRURVQ0VSX0tFWSxcblx0XHQnZ2V0RmFjdG9yeUZvck1vZGVsJyxcblx0XHRbIG1vZGVsTmFtZS50b0xvd2VyQ2FzZSgpIF1cblx0KTtcblx0cmV0dXJuIGZhY3Rvcnk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhY3Rpb24gb2JqZWN0IHVzZWQgdG8gdXBkYXRlIHRoZSBzdG9yZSB3aXRoIHRoZSBwcm92aWRlZCByZWxhdGlvblxuICogZW5kcG9pbnQgZm9yIHRoZSBtb2RlbCBhbmQgaWQsIGFuZCBpdHMgcmVsYXRpb25zLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbnRpdHlJZFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGVuZHBvaW50XG4gKiBAcmV0dXJuIHtcbiAqIFx0e1xuICogXHRcdG1vZGVsTmFtZTogKixcbiAqIFx0XHRlbmRwb2ludDogKixcbiAqIFx0XHRyZWxhdGlvbk5hbWU6ICosXG4gKiBcdFx0ZW50aXR5SWQ6ICosXG4gKiBcdFx0dHlwZTogc3RyaW5nXG4gKiBcdH1cbiAqIH0gQW4gYWN0aW9uIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY2VpdmVSZWxhdGlvbkVuZHBvaW50Rm9yTW9kZWxFbnRpdHkoXG5cdG1vZGVsTmFtZSxcblx0ZW50aXR5SWQsXG5cdHJlbGF0aW9uTmFtZSxcblx0ZW5kcG9pbnRcbikge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6IHR5cGVzLlJFQ0VJVkVfUkVMQVRJT05fRU5EUE9JTlRfRk9SX01PREVMX0VOVElUWSxcblx0XHRtb2RlbE5hbWUsXG5cdFx0ZW50aXR5SWQsXG5cdFx0cmVsYXRpb25OYW1lLFxuXHRcdGVuZHBvaW50LFxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjZWl2ZVJlbGF0aW9uU2NoZW1hKFxuXHRtb2RlbE5hbWUsXG5cdHJlbGF0aW9uTmFtZSxcblx0cmVsYXRpb25TY2hlbWFcbikge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6IHR5cGVzLlJFQ0VJVkVfUkVMQVRJT05fU0NIRU1BLFxuXHRcdG1vZGVsTmFtZSxcblx0XHRyZWxhdGlvbk5hbWUsXG5cdFx0cmVsYXRpb25TY2hlbWEsXG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiogcmVjZWl2ZVJlbGF0aW9uU2NoZW1hQW5kUmVzb2x2ZShcblx0bW9kZWxOYW1lLFxuXHRyZWxhdGlvbk5hbWUsXG5cdHJlbGF0aW9uU2NoZW1hXG4pIHtcblx0eWllbGQgZGlzcGF0Y2goXG5cdFx0U0NIRU1BX1JFRFVDRVJfS0VZLFxuXHRcdCdyZWNlaXZlUmVsYXRpb25TY2hlbWEnLFxuXHRcdG1vZGVsTmFtZSxcblx0XHRyZWxhdGlvbk5hbWUsXG5cdFx0cmVsYXRpb25TY2hlbWFcblx0KTtcblx0eWllbGQgZGlzcGF0Y2goXG5cdFx0J2NvcmUvZGF0YScsXG5cdFx0J2ZpbmlzaFJlc29sdXRpb24nLFxuXHRcdFNDSEVNQV9SRURVQ0VSX0tFWSxcblx0XHQnZ2V0UmVsYXRpb25TY2hlbWEnLFxuXHRcdFsgbW9kZWxOYW1lLnRvTG93ZXJDYXNlKCksIHJlbGF0aW9uTmFtZSBdXG5cdCk7XG59XG4iLCIvKipcbiAqIElkZW50aWZpZXIga2V5IGZvciB0aGlzIHN0b3JlIHJlZHVjZXIuXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgUkVEVUNFUl9LRVkgPSAnZXZlbnRlc3ByZXNzby9zY2hlbWEnO1xuXG5leHBvcnQgY29uc3QgSk9JTl9SRUxBVElPTl9UWVBFUyA9IFtcblx0J0VFX0hBQlRNX1JlbGF0aW9uJyxcblx0J0VFX0hBQlRNX0FueV9SZWxhdGlvbicsXG5dO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgcmVnaXN0ZXJTdG9yZSB9IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IFJFRFVDRVJfS0VZIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0ICogYXMgc2VsZWN0b3JzIGZyb20gJy4vc2VsZWN0b3JzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCAqIGFzIHJlc29sdmVycyBmcm9tICcuL3Jlc29sdmVycyc7XG5pbXBvcnQgcmVkdWNlciBmcm9tICcuL3JlZHVjZXJzJztcbmltcG9ydCBjb250cm9scyBmcm9tICcuLi9iYXNlLWNvbnRyb2xzJztcbmltcG9ydCB7IGNyZWF0ZUVudGl0eVNlbGVjdG9ycywgY3JlYXRlRW50aXR5UmVzb2x2ZXJzIH0gZnJvbSAnLi9tb2RlbCc7XG5cbi8qKlxuICogQ3JlYXRlcyBzcGVjaWZpYyBtb2RlbCBlbnRpdHkgc2VsZWN0b3JzIChnZXRGYWN0b3J5Rm9yRXZlbnQgZXRjKVxuICpcbiAqIEB0eXBlIHtPYmplY3Q8RnVuY3Rpb24+fVxuICovXG5jb25zdCBlbnRpdHlTZWxlY3RvcnMgPSBjcmVhdGVFbnRpdHlTZWxlY3RvcnMoIHNlbGVjdG9ycyApO1xuXG4vKipcbiAqIENyZWF0ZXMgc3BlY2lmaWMgbW9kZWwgZW50aXR5IHJlc29sdmVycyAoZ2V0RmFjdG9yeUZvckV2ZW50IGV0YylcbiAqXG4gKiBAdHlwZSB7T2JqZWN0PEZ1bmN0aW9uPn1cbiAqL1xuY29uc3QgZW50aXR5UmVzb2x2ZXJzID0gY3JlYXRlRW50aXR5UmVzb2x2ZXJzKCByZXNvbHZlcnMgKTtcblxuLyoqXG4gKiBSZWdpc3RyYXRpb24gb2Ygc3RvcmUgZm9yIGV2ZW50ZXNwcmVzc28vc2NoZW1hLlxuICovXG5leHBvcnQgZGVmYXVsdCByZWdpc3RlclN0b3JlKCBSRURVQ0VSX0tFWSwge1xuXHRyZWR1Y2VyLFxuXHRhY3Rpb25zLFxuXHRjb250cm9scyxcblx0c2VsZWN0b3JzOiB7IC4uLnNlbGVjdG9ycywgLi4uZW50aXR5U2VsZWN0b3JzIH0sXG5cdHJlc29sdmVyczogeyAuLi5yZXNvbHZlcnMsIC4uLmVudGl0eVJlc29sdmVycyB9LFxufSApO1xuXG5leHBvcnQgY29uc3QgU0NIRU1BX0tFWSA9IFJFRFVDRVJfS0VZO1xuXG5leHBvcnQgeyBoeWRyYXRlUmVsYXRpb25TY2hlbWEgfSBmcm9tICcuL3Jlc29sdmVycyc7XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBNT0RFTF9OQU1FUyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL21vZGVsJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgZ2V0TWV0aG9kTmFtZSB9IGZyb20gJy4uL2Jhc2UtbW9kZWwnO1xuaW1wb3J0IHsgaXNSZXNvbHZpbmcgfSBmcm9tICcuLi9iYXNlLXNlbGVjdG9ycyc7XG5pbXBvcnQgeyBSRURVQ0VSX0tFWSB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBDcmVhdGVzIHNlbGVjdG9ycyBmb3IgZWFjaCByZWdpc3RlcmVkIG1vZGVsIG5hbWUgd3JhcHBpbmcgdGhlIGdlbmVyaWMgc291cmNlXG4gKiBzZWxlY3RvcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8ZnVuY3Rpb24+fSBzb3VyY2VcbiAqIEByZXR1cm4ge09iamVjdDxmdW5jdGlvbj59IEFsbCB0aGUgZ2VuZXJhdGVkIHNlbGVjdG9ycyBmb3IgZWFjaCBtb2RlbC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVudGl0eVNlbGVjdG9ycyA9ICggc291cmNlICkgPT4gTU9ERUxfTkFNRVMucmVkdWNlKFxuXHQoIHNlbGVjdG9ycywgbW9kZWxOYW1lICkgPT4ge1xuXHRcdGNvbnN0IHNjaGVtYU1ldGhvZE5hbWUgPSBnZXRNZXRob2ROYW1lKCBtb2RlbE5hbWUsICdzY2hlbWEnLCAnZ2V0JyApO1xuXHRcdGNvbnN0IGZhY3RvcnlNZXRob2ROYW1lID0gZ2V0TWV0aG9kTmFtZSggbW9kZWxOYW1lLCAnZmFjdG9yeScsICdnZXQnICk7XG5cdFx0c2VsZWN0b3JzWyBzY2hlbWFNZXRob2ROYW1lIF0gPSAoXG5cdFx0XHRzdGF0ZVxuXHRcdCkgPT4gc291cmNlLmdldFNjaGVtYUZvck1vZGVsKCBzdGF0ZSwgbW9kZWxOYW1lICk7XG5cdFx0c2VsZWN0b3JzWyBnZXRNZXRob2ROYW1lKCBtb2RlbE5hbWUsICdzY2hlbWEnLCAnaXNSZXF1ZXN0aW5nJyApIF0gPVxuXHRcdFx0KCkgPT4gaXNSZXNvbHZpbmcoIFJFRFVDRVJfS0VZLCBzY2hlbWFNZXRob2ROYW1lICk7XG5cdFx0c2VsZWN0b3JzWyBmYWN0b3J5TWV0aG9kTmFtZSBdID0gKFxuXHRcdFx0c3RhdGVcblx0XHQpID0+IHNvdXJjZS5nZXRGYWN0b3J5Rm9yTW9kZWwoIHN0YXRlLCBtb2RlbE5hbWUgKTtcblx0XHRzZWxlY3RvcnNbIGdldE1ldGhvZE5hbWUoIG1vZGVsTmFtZSwgJ2ZhY3RvcnknLCAnaXNSZXF1ZXN0aW5nJyApIF0gPVxuXHRcdFx0KCkgPT4gaXNSZXNvbHZpbmcoIFJFRFVDRVJfS0VZLCBmYWN0b3J5TWV0aG9kTmFtZSApO1xuXHRcdHJldHVybiBzZWxlY3RvcnM7XG5cdH0sXG5cdHt9XG4pO1xuXG4vKipcbiAqIENyZWF0ZXMgcmVzb2x2ZXJzIGZvciBlYWNoIHJlZ2lzdGVyZWQgbW9kZWwgbmFtZSB3cmFwcGluZyB0aGUgZ2VuZXJpYyBzb3VyY2VcbiAqIHJlc29sdmVycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxmdW5jdGlvbj59IHNvdXJjZVxuICogQHJldHVybiB7T2JqZWN0PGZ1bmN0aW9uPn0gQWxsIHRoZSBnZW5lcmF0ZWQgcmVzb2x2ZXJzIGZvciBlYWNoIG1vZGVsLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlRW50aXR5UmVzb2x2ZXJzID0gKCBzb3VyY2UgKSA9PiBNT0RFTF9OQU1FUy5yZWR1Y2UoXG5cdCggcmVzb2x2ZXJzLCBtb2RlbE5hbWUgKSA9PiB7XG5cdFx0cmVzb2x2ZXJzWyBnZXRNZXRob2ROYW1lKCBtb2RlbE5hbWUsICdzY2hlbWEnLCAnZ2V0JyApIF0gPSAoKSA9PlxuXHRcdFx0c291cmNlLmdldFNjaGVtYUZvck1vZGVsKCBtb2RlbE5hbWUgKTtcblx0XHRyZXNvbHZlcnNbIGdldE1ldGhvZE5hbWUoIG1vZGVsTmFtZSwgJ2ZhY3RvcnknLCAnZ2V0JyApIF0gPSAoKSA9PlxuXHRcdFx0c291cmNlLmdldEZhY3RvcnlGb3JNb2RlbCggbW9kZWxOYW1lICk7XG5cdFx0cmV0dXJuIHJlc29sdmVycztcblx0fSxcblx0e31cbik7XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgbm9ybWFsaXplRW50aXR5SWQgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9oZWxwZXJzJztcbmltcG9ydCB7IERFRkFVTFRfU0NIRU1BX1NUQVRFLCBzaW5ndWxhck1vZGVsTmFtZSB9IGZyb20gJ0BldmVudGVzcHJlc3NvL21vZGVsJztcbmltcG9ydCB7XG5cdGlzU2NoZW1hUmVzcG9uc2VPZk1vZGVsLFxuXHRpc01vZGVsRW50aXR5RmFjdG9yeU9mTW9kZWwsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgZnJvbUpTLCBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IGlzU2hhbGxvd0VxdWFsIGZyb20gJ0B3b3JkcHJlc3MvaXMtc2hhbGxvdy1lcXVhbCc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBBQ1RJT05fVFlQRVMgfSBmcm9tICcuL2FjdGlvbi10eXBlcyc7XG5cbi8vIHNldHVwIGluaXRpYWwgc3RhdGUgb2JqZWN0c1xuY29uc3QgREVGQVVMVF9TVEFURV9TQ0hFTUEgPSBmcm9tSlMoIERFRkFVTFRfU0NIRU1BX1NUQVRFLnNjaGVtYSApO1xuY29uc3QgREVGQVVMVF9TVEFURV9GQUNUT1JZID0gZnJvbUpTKCBERUZBVUxUX1NDSEVNQV9TVEFURS5mYWN0b3J5ICk7XG5jb25zdCBERUZBVUxUX1NUQVRFX0VORFBPSU5UUyA9IGZyb21KUyggREVGQVVMVF9TQ0hFTUFfU1RBVEUucmVsYXRpb25FbmRwb2ludHMgKTtcbmNvbnN0IERFRkFVTFRfU1RBVEVfUkVMQVRJT05TID0gZnJvbUpTKCBERUZBVUxUX1NDSEVNQV9TVEFURS5yZWxhdGlvblNjaGVtYSApO1xuXG4vKipcbiAqIFJlZHVjZXIgZm9yIGEgbW9kZWwgc2NoZW1hLlxuICpcbiAqIEBwYXJhbSB7TWFwfSBzdGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHJldHVybiB7TWFwfSBUaGUgbmV3IChvciBvcmlnaW5hbCkgc3RhdGUuXG4gKi9cbmV4cG9ydCBjb25zdCByZWNlaXZlU2NoZW1hID0gKCBzdGF0ZSA9IERFRkFVTFRfU1RBVEVfU0NIRU1BLCBhY3Rpb24gKSA9PiB7XG5cdHRyeSB7XG5cdFx0aWYgKCBhY3Rpb24udHlwZSA9PT0gQUNUSU9OX1RZUEVTLlJFQ0VJVkVfU0NIRU1BX1JFQ09SRCApIHtcblx0XHRcdGNvbnN0IG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBhY3Rpb24ubW9kZWxOYW1lICk7XG5cdFx0XHRpZiAoIGlzU2NoZW1hUmVzcG9uc2VPZk1vZGVsKCBhY3Rpb24uc2NoZW1hLCBtb2RlbE5hbWUgKSApIHtcblx0XHRcdFx0cmV0dXJuIHN0YXRlLnNldCggbW9kZWxOYW1lLCBhY3Rpb24uc2NoZW1hICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGNhdGNoICggZSApIHtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblx0cmV0dXJuIHN0YXRlO1xufTtcblxuLyoqXG4gKiBSZWR1Y2VyIGZvciBhIG1vZGVsIGZhY3RvcnlcbiAqXG4gKiBAcGFyYW0ge01hcH0gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEByZXR1cm4ge01hcH0gdGhlIG5ldyAob3Igb3JpZ2luYWwpIHN0YXRlLlxuICovXG5leHBvcnQgY29uc3QgcmVjZWl2ZUZhY3RvcnkgPSAoIHN0YXRlID0gREVGQVVMVF9TVEFURV9GQUNUT1JZLCBhY3Rpb24gKSA9PiB7XG5cdHRyeSB7XG5cdFx0aWYgKCBhY3Rpb24udHlwZSA9PT0gQUNUSU9OX1RZUEVTLlJFQ0VJVkVfRkFDVE9SWV9GT1JfTU9ERUwgKSB7XG5cdFx0XHRjb25zdCBtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggYWN0aW9uLm1vZGVsTmFtZSApO1xuXHRcdFx0aWYgKCBpc01vZGVsRW50aXR5RmFjdG9yeU9mTW9kZWwoIGFjdGlvbi5mYWN0b3J5LCBtb2RlbE5hbWUgKSApIHtcblx0XHRcdFx0cmV0dXJuIHN0YXRlLnNldCggbW9kZWxOYW1lLCBhY3Rpb24uZmFjdG9yeSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cdHJldHVybiBzdGF0ZTtcbn07XG5cbi8qKlxuICogUmVkdWNlciBmb3IgcmVsYXRpb24gZW5kcG9pbnRzLlxuICpcbiAqIEBwYXJhbSB7TWFwfXN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcmV0dXJuIHtNYXB9IE5ldyBvciBvcmlnaW5hbCBzdGF0ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlY2VpdmVSZWxhdGlvbkVuZHBvaW50Rm9yRW50aXR5ID0gKFxuXHRzdGF0ZSA9IERFRkFVTFRfU1RBVEVfRU5EUE9JTlRTLFxuXHRhY3Rpb25cbikgPT4ge1xuXHR0cnkge1xuXHRcdGlmICggYWN0aW9uLnR5cGUgPT09IEFDVElPTl9UWVBFUy5SRUNFSVZFX1JFTEFUSU9OX0VORFBPSU5UX0ZPUl9NT0RFTF9FTlRJVFkgKSB7XG5cdFx0XHRjb25zdCBtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggYWN0aW9uLm1vZGVsTmFtZSApO1xuXHRcdFx0Y29uc3QgcmVsYXRpb25OYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIGFjdGlvbi5yZWxhdGlvbk5hbWUgKTtcblx0XHRcdHJldHVybiBzdGF0ZS5zZXRJbihcblx0XHRcdFx0W1xuXHRcdFx0XHRcdG1vZGVsTmFtZSxcblx0XHRcdFx0XHRub3JtYWxpemVFbnRpdHlJZCggYWN0aW9uLmVudGl0eUlkICksXG5cdFx0XHRcdFx0cmVsYXRpb25OYW1lXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGFjdGlvbi5lbmRwb2ludFxuXHRcdFx0KTtcblx0XHR9XG5cdH0gY2F0Y2ggKCBlICkge1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXHRyZXR1cm4gc3RhdGU7XG59O1xuXG4vKipcbiAqIFJlZHVjZXIgZm9yIHJlbGF0aW9uIHNjaGVtYVxuICpcbiAqIEBwYXJhbSB7TWFwfSBzdGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHJldHVybiB7TWFwfSBOZXcgb3Igb3JpZ2luYWwgc3RhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IHJlY2VpdmVSZWxhdGlvblNjaGVtYSA9IChcblx0c3RhdGUgPSBERUZBVUxUX1NUQVRFX1JFTEFUSU9OUyxcblx0YWN0aW9uXG4pID0+IHtcblx0aWYgKCBhY3Rpb24udHlwZSA9PT0gQUNUSU9OX1RZUEVTLlJFQ0VJVkVfUkVMQVRJT05fU0NIRU1BICkge1xuXHRcdGNvbnN0IG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBhY3Rpb24ubW9kZWxOYW1lICk7XG5cdFx0Y29uc3QgcmVsYXRpb25OYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIGFjdGlvbi5yZWxhdGlvbk5hbWUgKTtcblx0XHRpZiAoIGlzU2hhbGxvd0VxdWFsKFxuXHRcdFx0c3RhdGUuZ2V0SW4oIFsgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgXSwge30gKSxcblx0XHRcdGFjdGlvbi5yZWxhdGlvblNjaGVtYSxcblx0XHQpICkge1xuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH1cblx0XHRyZXR1cm4gc3RhdGUuc2V0SW4oXG5cdFx0XHRbIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lIF0sXG5cdFx0XHRhY3Rpb24ucmVsYXRpb25TY2hlbWFcblx0XHQpO1xuXHR9XG5cdHJldHVybiBzdGF0ZTtcbn07XG5cbi8qKlxuICogQmUgYXdhcmUgdGhhdCB0aGUgcm9vdCBzdGF0ZSBpcyBhIHBsYWluIG9iamVjdCBidXQgZWFjaCBzbGljZSAoJ3NjaGVtYScsXG4gKiAnZmFjdG9yeScsICdyZWxhdGlvbkVuZHBvaW50cycpIGlzIGFuIGltbXV0YWJsZSBNYXAuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSZWR1Y2Vycygge1xuXHRzY2hlbWE6IHJlY2VpdmVTY2hlbWEsXG5cdGZhY3Rvcnk6IHJlY2VpdmVGYWN0b3J5LFxuXHRyZWxhdGlvbkVuZHBvaW50czogcmVjZWl2ZVJlbGF0aW9uRW5kcG9pbnRGb3JFbnRpdHksXG5cdHJlbGF0aW9uU2NoZW1hOiByZWNlaXZlUmVsYXRpb25TY2hlbWEsXG59ICk7XG4iLCIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQge1xuXHRpc1NjaGVtYVJlc3BvbnNlT2ZNb2RlbCxcblx0aXNNb2RlbEVudGl0eSxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsaWRhdG9ycyc7XG5pbXBvcnQge1xuXHRnZXRFbmRwb2ludCxcblx0c3RyaXBCYXNlUm91dGVGcm9tVXJsLFxuXHRjcmVhdGVFbnRpdHlGYWN0b3J5LFxuXHRNT0RFTF9QUkVGSVhFUyxcblx0c2luZ3VsYXJNb2RlbE5hbWUsXG5cdHBsdXJhbE1vZGVsTmFtZSxcblx0Z2V0UHJpbWFyeUtleSxcblx0bW9kZWxOYW1lRm9yUXVlcnlTdHJpbmcsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL21vZGVsJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHtcblx0cmVjZWl2ZVNjaGVtYUZvck1vZGVsQW5kUmVzb2x2ZSxcblx0cmVjZWl2ZUZhY3RvcnlGb3JNb2RlbEFuZFJlc29sdmUsXG5cdHJlY2VpdmVSZWxhdGlvbkVuZHBvaW50Rm9yTW9kZWxFbnRpdHksXG5cdHJlY2VpdmVSZWxhdGlvblNjaGVtYSxcblx0cmVjZWl2ZVJlbGF0aW9uU2NoZW1hQW5kUmVzb2x2ZSxcbn0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCB7IGZldGNoLCByZXNvbHZlU2VsZWN0IH0gZnJvbSAnLi4vYmFzZS1jb250cm9scyc7XG5pbXBvcnQgeyBSRURVQ0VSX0tFWSBhcyBDT1JFX1JFRFVDRVJfS0VZIH0gZnJvbSAnLi4vY29yZS9jb25zdGFudHMnO1xuaW1wb3J0IHtcblx0UkVEVUNFUl9LRVkgYXMgU0NIRU1BX1JFRFVDRVJfS0VZLFxuXHRKT0lOX1JFTEFUSU9OX1RZUEVTLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQSByZXNvbHZlciBmb3IgZ2V0dGluZyB0aGUgc2NoZW1hIGZvciBhIGdpdmVuIG1vZGVsIG5hbWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7T2JqZWN0fSBSZXRyaWV2ZWQgc2NoZW1hLlxuICovXG5leHBvcnQgZnVuY3Rpb24qIGdldFNjaGVtYUZvck1vZGVsKCBtb2RlbE5hbWUgKSB7XG5cdGNvbnN0IHBhdGggPSBnZXRFbmRwb2ludCggc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApICk7XG5cdGNvbnN0IHNjaGVtYSA9IHlpZWxkIGZldGNoKCB7IHBhdGgsIG1ldGhvZDogJ09QVElPTlMnIH0gKTtcblx0eWllbGQgcmVjZWl2ZVNjaGVtYUZvck1vZGVsQW5kUmVzb2x2ZSggbW9kZWxOYW1lLCBzY2hlbWEgKTtcblx0cmV0dXJuIHNjaGVtYTtcbn1cblxuLyoqXG4gKiBBIHJlc29sdmVyIGZvciBnZXR0aW5nIHRoZSBtb2RlbCBlbnRpdHkgZmFjdG9yeSBmb3IgYSBnaXZlbiBtb2RlbCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge09iamVjdHxudWxsfSByZXRyaWV2ZWQgZmFjdG9yeVxuICovXG5leHBvcnQgZnVuY3Rpb24qIGdldEZhY3RvcnlGb3JNb2RlbCggbW9kZWxOYW1lLCBzY2hlbWEgPSB7fSApIHtcblx0aWYgKCAhIGlzU2NoZW1hUmVzcG9uc2VPZk1vZGVsKCBzY2hlbWEsIG1vZGVsTmFtZSApICkge1xuXHRcdHNjaGVtYSA9IHlpZWxkIHJlc29sdmVTZWxlY3QoXG5cdFx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0XHQnZ2V0U2NoZW1hRm9yTW9kZWwnLFxuXHRcdFx0bW9kZWxOYW1lXG5cdFx0KTtcblx0XHRpZiAoICEgaXNTY2hlbWFSZXNwb25zZU9mTW9kZWwoIHNjaGVtYSwgbW9kZWxOYW1lICkgKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblx0Y29uc3QgZmFjdG9yeSA9IGNyZWF0ZUVudGl0eUZhY3RvcnkoXG5cdFx0bW9kZWxOYW1lLFxuXHRcdHNjaGVtYS5zY2hlbWEsXG5cdFx0TU9ERUxfUFJFRklYRVMoIG1vZGVsTmFtZSApXG5cdCk7XG5cdHlpZWxkIHJlY2VpdmVGYWN0b3J5Rm9yTW9kZWxBbmRSZXNvbHZlKCBtb2RlbE5hbWUsIGZhY3RvcnkgKTtcblx0cmV0dXJuIGZhY3Rvcnk7XG59XG5cbi8qKlxuICogQSByZXNvbHZlciBmb3IgZ2V0dGluZyB0aGUgcmVsYXRpb24gZW5kcG9pbnQgZm9yIGEgZ2l2ZW4gbW9kZWwsIGl0J3MgaWQsIGFuZFxuICogdGhlIHJlcXVlc3RlZCByZWxhdGlvbi5cbiAqXG4gKiBUaGUgRUUgUkVTVCBhcGkgbmFtZXMgcmVsYXRpb25zIGFjY29yZGluZyB0byB3aGV0aGVyIHRoZXkgdGhlcmUgYXJlIHNpbmd1bGFyXG4gKiBvciBwbHVyYWwgcmVsYXRpb25zIG9uIGEgZ2l2ZW4gbW9kZWwgKGVnLiBSZWdpc3RyYXRpb25zIGhhdmUgb25lIGV2ZW50XG4gKiByZWxhdGlvbiwgYnV0IEV2ZW50cyBjYW4gaGF2ZSBtdWx0aXBsZSBkYXRldGltZXMpLiAgVGhpcyBtZWFucyB0aGUgb25seSB3YXlcbiAqIHRvIGRlcml2ZSBhbiBhY2N1cmF0ZSBlbmRwb2ludCBmb3IgYSBnaXZlbiByZWxhdGlvbiByZXF1ZXN0IG9uIGFuIGVudGl0eSBpc1xuICogdG8gcmV0cmlldmUgdGhlIGVudGl0eSBmcm9tIHRoZSByZXNvdXJjZSBhbmQgZGVyaXZlIHRoZSBlbmRwb2ludCBmcm9tIHRoZVxuICogbGlua3MgaW4gdGhlIHJlc3BvbnNlLlxuICpcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge251bWJlcn0gZW50aXR5SWRcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk1vZGVsTmFtZVxuICogQHJldHVybiB7SXRlcmFibGVJdGVyYXRvcjwqPnxzdHJpbmd9IEEgZ2VuZXJhdG9yIG9yIHRoZSBkZXJpdmVkIGVuZHBvaW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24qIGdldFJlbGF0aW9uRW5kcG9pbnRGb3JFbnRpdHlJZChcblx0bW9kZWxOYW1lLFxuXHRlbnRpdHlJZCxcblx0cmVsYXRpb25Nb2RlbE5hbWVcbikge1xuXHQvLyBmaXJzdCBhdHRlbXB0IHRvIGdldCB0aGUgcmVsYXRpb24gZW5kcG9pbnQgZnJvbSB0aGUgZW50aXR5IHRoYXQgbWlnaHRcblx0Ly8gYWxyZWFkeSBiZSBpbiBjb3JlIHN0YXRlLlxuXHRjb25zdCBlbnRpdHkgPSB5aWVsZCByZXNvbHZlU2VsZWN0KFxuXHRcdENPUkVfUkVEVUNFUl9LRVksXG5cdFx0J2dldEVudGl0eUJ5SWQnLFxuXHRcdG1vZGVsTmFtZSxcblx0XHRlbnRpdHlJZFxuXHQpO1xuXHRyZWxhdGlvbk1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk1vZGVsTmFtZSApO1xuXHRjb25zdCBwbHVyYWxSZWxhdGlvbk5hbWUgPSBwbHVyYWxNb2RlbE5hbWUoIHJlbGF0aW9uTW9kZWxOYW1lICk7XG5cdGxldCBlbmRwb2ludCA9ICcnO1xuXHRpZiAoIGlzTW9kZWxFbnRpdHkoIGVudGl0eSApICYmIGVudGl0eVsgcGx1cmFsUmVsYXRpb25OYW1lICsgJ1Jlc291cmNlJyBdICkge1xuXHRcdGVuZHBvaW50ID0gc3RyaXBCYXNlUm91dGVGcm9tVXJsKFxuXHRcdFx0ZW50aXR5WyBwbHVyYWxSZWxhdGlvbk5hbWUgKyAnUmVzb3VyY2UnIF0ucmVzb3VyY2VMaW5rXG5cdFx0KTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBwYXRoID0gZ2V0RW5kcG9pbnQoIG1vZGVsTmFtZSApICsgJy8nICsgZW50aXR5SWQ7XG5cdFx0Y29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaCggeyBwYXRoIH0gKTtcblx0XHRpZiAoICEgcmVzcG9uc2UuX2xpbmtzICkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0XHRjb25zdCBsaW5rcyA9IHJlc3BvbnNlLl9saW5rcyB8fCB7fTtcblx0XHRjb25zdCBiYXNlUmVsYXRpb25QYXRoID0gJ2h0dHBzOi8vYXBpLmV2ZW50ZXNwcmVzc28uY29tLyc7XG5cdFx0ZW5kcG9pbnQgPSBsaW5rc1tcblx0XHRcdGJhc2VSZWxhdGlvblBhdGggKyByZWxhdGlvbk1vZGVsTmFtZVxuXHRcdF0gfHwgJyc7XG5cdFx0ZW5kcG9pbnQgPSAoIGVuZHBvaW50ID09PSAnJyAmJiBsaW5rc1tcblx0XHRcdGJhc2VSZWxhdGlvblBhdGggKyBwbHVyYWxSZWxhdGlvbk5hbWVcblx0XHRdICkgfHwgZW5kcG9pbnQ7XG5cdH1cblx0aWYgKCBlbmRwb2ludCApIHtcblx0XHR5aWVsZCByZWNlaXZlUmVsYXRpb25FbmRwb2ludEZvck1vZGVsRW50aXR5KFxuXHRcdFx0bW9kZWxOYW1lLFxuXHRcdFx0ZW50aXR5SWQsXG5cdFx0XHRyZWxhdGlvbk1vZGVsTmFtZSxcblx0XHRcdGVuZHBvaW50XG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gZW5kcG9pbnQ7XG59XG5cbi8qKlxuICogQSByZXNvbHZlciBmb3IgZ2V0dGluZyB0aGUgcHJpbWFyeSBrZXkgc3RyaW5nIHRvIHVzZSBpbiBhIHF1ZXJ5IGZvciB0aGUgZ2l2ZW5cbiAqIG1vZGVsIGFuZCByZWxhdGlvbi4gVGhpcyBjb25zaWRlcnMgdGhlIGpvaW4gdHlwZSBmb3IgdGhlIHJlbGF0aW9uLlxuICpcbiAqIEBzZWUgdGhlIGBnZXRSZWxhdGlvblByaW1hcnlLZXlTdHJpbmdgIHNlbGVjdG9yIGZvciBleGFtcGxlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHByaW1hcnkga2V5IHN0cmluZyB0byB1c2Ugb3IgYW4gZW1wdHkgc3RyaW5nIGlmIHJlbGF0aW9uXG4gKiB0eXBlIGNvdWxkIG5vdCBiZSBkZXRlcm1pbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24qIGdldFJlbGF0aW9uUHJpbWFyeUtleVN0cmluZyggbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgKSB7XG5cdC8vIG5vcm1hbGl6ZVxuXHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0Y29uc3QgcmVsYXRpb25UeXBlID0geWllbGQgcmVzb2x2ZVNlbGVjdChcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J2dldFJlbGF0aW9uVHlwZScsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdHJlbGF0aW9uTmFtZVxuXHQpO1xuXHRpZiAoIHJlbGF0aW9uVHlwZSA9PT0gJycgKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cdGNvbnN0IHJlbGF0aW9uUHJpbWFyeUtleSA9IGdldFByaW1hcnlLZXkoIHJlbGF0aW9uTmFtZSApO1xuXHRyZXR1cm4gcmVsYXRpb25UeXBlID09PSAnRUVfQmVsb25nc19Ub19SZWxhdGlvbicgP1xuXHRcdHJlbGF0aW9uUHJpbWFyeUtleSA6XG5cdFx0YCR7IG1vZGVsTmFtZUZvclF1ZXJ5U3RyaW5nKCByZWxhdGlvbk5hbWUgKSB9LiR7IHJlbGF0aW9uUHJpbWFyeUtleSB9YDtcbn1cblxuLyoqXG4gKiBBIHJlc29sdmVyIGZvciByZXR1cm5pbmcgd2hhdCB0aGUgZXhwZWN0ZWQgcmVzcG9uc2UgdHlwZSBpcyBmb3IgdGhlIGdpdmVuXG4gKiByZWxhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lICBUaGUgbW9kZWwgdGhlIHJlbGF0aW9uIGlzIGZvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWUgVGhlIG1vZGVsIG5hbWUgdGhlIHJlbGF0aW9uIGlzIHRvLlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgdHlwZSBvZiB0aGUgcmVsYXRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogZ2V0UmVsYXRpb25SZXNwb25zZVR5cGUoIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICkge1xuXHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0Y29uc3QgcmVsYXRpb25TY2hlbWEgPSB5aWVsZCByZXNvbHZlU2VsZWN0KFxuXHRcdFNDSEVNQV9SRURVQ0VSX0tFWSxcblx0XHQnZ2V0UmVsYXRpb25TY2hlbWEnLFxuXHRcdG1vZGVsTmFtZSxcblx0XHRyZWxhdGlvbk5hbWUsXG5cdCk7XG5cdHJldHVybiByZWxhdGlvblNjaGVtYSAhPT0gbnVsbCA/IHJlbGF0aW9uU2NoZW1hLnR5cGUgOiAnJztcbn1cblxuLyoqXG4gKiBBIHJlc29sdmVyIGZvciByZXR1cm5pbmcgd2hldGhlciB0aGUgZ2l2ZW4gbW9kZWxOYW1lIGFuZCByZWxhdGlvbk5hbWUgaGF2ZVxuICogYSBqb2luIHRhYmxlIGZvciByZXByZXNlbnRpbmcgdGhlaXIgcmVsYXRpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhlcmUgaXMgYSBqb2luIHRhYmxlLCBmYWxzZSBtZWFucyB0aGVyZSBpc24ndC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBoYXNKb2luVGFibGVSZWxhdGlvbiggbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgKSB7XG5cdG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKTtcblx0cmVsYXRpb25OYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIHJlbGF0aW9uTmFtZSApO1xuXHRjb25zdCByZWxhdGlvblR5cGUgPSB5aWVsZCByZXNvbHZlU2VsZWN0KFxuXHRcdFNDSEVNQV9SRURVQ0VSX0tFWSxcblx0XHQnZ2V0UmVsYXRpb25UeXBlJyxcblx0XHRtb2RlbE5hbWUsXG5cdFx0cmVsYXRpb25OYW1lLFxuXHQpO1xuXHRyZXR1cm4gSk9JTl9SRUxBVElPTl9UWVBFUy5pbmRleE9mKCByZWxhdGlvblR5cGUgKSA+IC0xO1xufVxuXG4vKipcbiAqIEEgcmVzb2x2ZXIgZm9yIGdldHRpbmcgdGhlIHJlbGF0aW9uIHR5cGUgZGVzY3JpYmluZyB0aGUgcmVsYXRpb24gYmV0d2VlblxuICogbW9kZWxOYW1lIGFuZCByZWxhdGlvbk5hbWVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICBUaGUgcmVsYXRpb24gdHlwZSB0byBkZXNjcmliZSB0aGUgcmVsYXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBnZXRSZWxhdGlvblR5cGUoIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICkge1xuXHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0Y29uc3QgcmVsYXRpb25TY2hlbWEgPSB5aWVsZCByZXNvbHZlU2VsZWN0KFxuXHRcdFNDSEVNQV9SRURVQ0VSX0tFWSxcblx0XHQnZ2V0UmVsYXRpb25TY2hlbWEnLFxuXHRcdG1vZGVsTmFtZSxcblx0XHRyZWxhdGlvbk5hbWVcblx0KTtcblx0cmV0dXJuIHJlbGF0aW9uU2NoZW1hICE9PSBudWxsID8gcmVsYXRpb25TY2hlbWEucmVsYXRpb25fdHlwZSA6ICcnO1xufVxuXG4vKipcbiAqIEEgcmVzb2x2ZXIgZm9yIHJldHJpZXZpbmcgdGhlIHJlbGF0aW9uIHNjaGVtYSBmcm9tIHRoZSBzZXJ2ZXIgZm9yIHRoZSBnaXZlblxuICogbW9kZWxOYW1lIGFuZCByZWxhdGlvbk5hbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICogQHRocm93cyBFcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24qIGh5ZHJhdGVSZWxhdGlvblNjaGVtYSggc2NoZW1hLCBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSApIHtcblx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRyZWxhdGlvbk5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25OYW1lICk7XG5cdHlpZWxkIHJlY2VpdmVSZWxhdGlvblNjaGVtYUFuZFJlc29sdmUoXG5cdFx0bW9kZWxOYW1lLFxuXHRcdHJlbGF0aW9uTmFtZSxcblx0XHRzY2hlbWFcblx0KTtcbn1cblxuLyoqXG4gKiBBIHJlc29sdmVyIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGlvbiBzY2hlbWEgZnJvbSB0aGUgc2VydmVyIGZvciB0aGUgZ2l2ZW5cbiAqIG1vZGVsTmFtZSBhbmQgcmVsYXRpb25OYW1lLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEB0aHJvd3MgRXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBnZXRSZWxhdGlvblNjaGVtYSggbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgKSB7XG5cdG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKTtcblx0Y29uc3Qgc2NoZW1hID0geWllbGQgcmVzb2x2ZVNlbGVjdChcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J2dldFNjaGVtYUZvck1vZGVsJyxcblx0XHRtb2RlbE5hbWVcblx0KTtcblx0aWYgKCBzY2hlbWEgPT09IG51bGwgKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCAnVGhlICcgKyBtb2RlbE5hbWUgKyAnIGRvZXMgbm90IGhhdmUgYSBzY2hlbWEnICk7XG5cdH1cblx0cmVsYXRpb25OYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIHJlbGF0aW9uTmFtZSApO1xuXHRjb25zdCBwbHVyYWxSZWxhdGlvbk5hbWUgPSBwbHVyYWxNb2RlbE5hbWUoIHJlbGF0aW9uTmFtZSApO1xuXHQvLyBpcyB0aGVyZSBhIHNjaGVtYSBmb3IgcGx1cmFsIHJlbGF0aW9uIG5hbWU/XG5cdGxldCB0eXBlU2NoZW1hID0gc2NoZW1hLmhhc093blByb3BlcnR5KCAnc2NoZW1hJyApICYmXG5cdFx0c2NoZW1hLnNjaGVtYS5oYXNPd25Qcm9wZXJ0eSggJ3Byb3BlcnRpZXMnICkgP1xuXHRcdHNjaGVtYS5zY2hlbWEucHJvcGVydGllc1sgcGx1cmFsUmVsYXRpb25OYW1lIF0gOlxuXHRcdG51bGw7XG5cdHR5cGVTY2hlbWEgPSB0eXBlU2NoZW1hID09PSBudWxsICYmXG5cdFx0ISBpc1VuZGVmaW5lZCggc2NoZW1hLnNjaGVtYS5wcm9wZXJ0aWVzWyByZWxhdGlvbk5hbWUgXSApID9cblx0XHRzY2hlbWEuc2NoZW1hLnByb3BlcnRpZXNbIHJlbGF0aW9uTmFtZSBdIDpcblx0XHR0eXBlU2NoZW1hO1xuXHRpZiAoIHR5cGVTY2hlbWEgPT09IG51bGwgKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0J1RoZXJlIGlzIG5vIHJlbGF0aW9uIGZvciAnICsgcmVsYXRpb25OYW1lICsgJyBvbiB0aGUgJyArXG5cdFx0XHQnbW9kZWwgJyArIG1vZGVsTmFtZVxuXHRcdCk7XG5cdH1cblx0eWllbGQgcmVjZWl2ZVJlbGF0aW9uU2NoZW1hKFxuXHRcdG1vZGVsTmFtZSxcblx0XHRyZWxhdGlvbk5hbWUsXG5cdFx0dHlwZVNjaGVtYVxuXHQpO1xufVxuIiwiLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgaXNSZXNvbHZpbmcsIGhhc0ZpbmlzaGVkUmVzb2x2aW5nIH0gZnJvbSAnLi4vYmFzZS1zZWxlY3RvcnMnO1xuaW1wb3J0IHsgUkVEVUNFUl9LRVksIEpPSU5fUkVMQVRJT05fVFlQRVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQge1xuXHRzaW5ndWxhck1vZGVsTmFtZSxcblx0Z2V0UHJpbWFyeUtleSxcblx0bW9kZWxOYW1lRm9yUXVlcnlTdHJpbmcsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL21vZGVsJztcbmltcG9ydCB7IG5vcm1hbGl6ZUVudGl0eUlkIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaGVscGVycyc7XG5pbXBvcnQgeyBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IGNyZWF0ZVNlbGVjdG9yIGZyb20gJ3JlbWVtbyc7XG5cbi8qKlxuICogU2VsZWN0b3IgZm9yIHJldHVybmluZyB0aGUgc2NoZW1hIG9iamVjdCBmb3IgYSBnaXZlbiBtb2RlbCBuYW1lIGZyb20gdGhlXG4gKiBzdGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgc2NoZW1hIG9iamVjdCBvciBudWxsIGlmIGl0IGRvZXNuJ3QgZXhpc3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2hlbWFGb3JNb2RlbCggc3RhdGUsIG1vZGVsTmFtZSApIHtcblx0Y29uc3Qgc2NoZW1hID0gc3RhdGUuc2NoZW1hLmdldCggc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApLCBudWxsICk7XG5cdHJldHVybiBzY2hlbWE7XG59XG5cbi8qKlxuICogU2VsZWN0b3IgZm9yIHJldHVybmluZyB3aGV0aGVyIHRoZSBzY2hlbWEgaXMgYmVpbmcgcmVxdWVzdGVkIG9yIG5vdCBmb3IgdGhlXG4gKiBnaXZlbiBtb2RlbCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgaXRzIGJlaW5nIHJlcXVlc3RlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUmVxdWVzdGluZ1NjaGVtYUZvck1vZGVsKCBzdGF0ZSwgbW9kZWxOYW1lICkge1xuXHRyZXR1cm4gaXNSZXNvbHZpbmcoXG5cdFx0UkVEVUNFUl9LRVksXG5cdFx0J2dldFNjaGVtYUZvck1vZGVsJyxcblx0XHRzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lIClcblx0KTtcbn1cblxuLyoqXG4gKiBTZWxlY3RvciBmb3IgcmV0dXJuaW5nIHdoZXRoZXIgdGhlIHNjaGVtYSBoYXMgYmVlbiByZXNvbHZlZCBvciBub3QgZm9yIHRoZVxuICogZ2l2ZW4gbW9kZWwgbmFtZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGF0IHRoZSBzY2hlbWEgaGFzIGZpbmlzaGVkIHJlc29sdmluZyBmb3IgdGhpc1xuICogbW9kZWwgbmFtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc1Jlc29sdmVkU2NoZW1hRm9yTW9kZWwoIHN0YXRlLCBtb2RlbE5hbWUgKSB7XG5cdHJldHVybiBoYXNGaW5pc2hlZFJlc29sdmluZyhcblx0XHRSRURVQ0VSX0tFWSxcblx0XHQnZ2V0U2NoZW1hRm9yTW9kZWwnLFxuXHRcdHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKVxuXHQpO1xufVxuXG4vKipcbiAqIFNlbGVjdG9yIGZvciByZXR1cm5pbmcgdGhlIG1vZGVsIGVudGl0eSBmYWN0b3J5IG9iamVjdCBmb3IgYSBnaXZlblxuICogbW9kZWwgbmFtZSBmcm9tIHRoZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyB0aGUgbW9kZWwgZW50aXR5IGZhY3Rvcnkgb3IgbnVsbCBpZiBpdCBkb2Vzbid0XG4gKiBleGlzdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZhY3RvcnlGb3JNb2RlbCggc3RhdGUsIG1vZGVsTmFtZSApIHtcblx0Y29uc3QgZmFjdG9yeSA9IHN0YXRlLmZhY3RvcnkuZ2V0KCBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICksIG51bGwgKTtcblx0cmV0dXJuICEgKCBmYWN0b3J5IGluc3RhbmNlb2YgTWFwICkgPyBmYWN0b3J5IDogbnVsbDtcbn1cblxuLyoqXG4gKiBTZWxlY3RvciBmb3IgcmV0dXJuaW5nIHdoZXRoZXIgdGhlIG1vZGVsIGVudGl0eSBmYWN0b3J5IGlzIGJlaW5nIHJlcXVlc3RlZFxuICogb3Igbm90IGZvciB0aGUgZ2l2ZW4gbW9kZWwgbmFtZSBmcm9tIHRoZSBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0IGlzIGJlaW5nIHJlcXVlc3RlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUmVxdWVzdGluZ0ZhY3RvcnlGb3JNb2RlbCggc3RhdGUsIG1vZGVsTmFtZSApIHtcblx0cmV0dXJuIGlzUmVzb2x2aW5nKFxuXHRcdFJFRFVDRVJfS0VZLFxuXHRcdCdnZXRGYWN0b3J5Rm9yTW9kZWwnLFxuXHRcdHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKVxuXHQpO1xufVxuXG4vKipcbiAqIFNlbGVjdG9yIGZvciByZXR1cm5pbmcgd2hldGhlciB0aGUgZmFjdG9yeSBoYXMgYmVlbiByZXNvbHZlZCBvciBub3QgZm9yIHRoZVxuICogZ2l2ZW4gbW9kZWwgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhhdCB0aGUgZmFjdG9yeSBoYXMgZmluaXNoZWQgcmVzb2x2aW5nIGZvciB0aGlzXG4gKiBtb2RlbCBuYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzUmVzb2x2ZWRGYWN0b3J5Rm9yTW9kZWwoIHN0YXRlLCBtb2RlbE5hbWUgKSB7XG5cdHJldHVybiBoYXNGaW5pc2hlZFJlc29sdmluZyhcblx0XHRSRURVQ0VSX0tFWSxcblx0XHQnZ2V0RmFjdG9yeUZvck1vZGVsJyxcblx0XHRzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lIClcblx0KTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIHJlbGF0aW9uIGVuZHBvaW50IGZvciB0aGUgZ2l2ZW4gbW9kZWwsIGVudGl0eSBpZCBhbmQgcmVsYXRpb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGVudGl0eUlkXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25Nb2RlbE5hbWVcbiAqIEByZXR1cm4ge3N0cmluZ30gUmV0dXJucyB0aGUgcmVsYXRpb24gZW5kcG9pbnQgaWYgYXZhaWxhYmxlIG9yIGFuIGVtcHR5XG4gKiBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWxhdGlvbkVuZHBvaW50Rm9yRW50aXR5SWQoXG5cdHN0YXRlLFxuXHRtb2RlbE5hbWUsXG5cdGVudGl0eUlkLFxuXHRyZWxhdGlvbk1vZGVsTmFtZVxuKSB7XG5cdG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKTtcblx0cmVsYXRpb25Nb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25Nb2RlbE5hbWUgKTtcblx0ZW50aXR5SWQgPSBub3JtYWxpemVFbnRpdHlJZCggZW50aXR5SWQgKTtcblx0cmV0dXJuIHN0YXRlLnJlbGF0aW9uRW5kcG9pbnRzLmdldEluKFxuXHRcdFsgbW9kZWxOYW1lLCBlbnRpdHlJZCwgcmVsYXRpb25Nb2RlbE5hbWUgXVxuXHQpIHx8ICcnO1xufVxuXG4vKipcbiAqIFNlbGVjdG9yIGZvciByZXR1cm5pbmcgd2hldGhlciB0aGUgcmVsYXRpb24gZW5kcG9pbnQgaXMgYmVpbmcgcmVxdWVzdGVkXG4gKiBvciBub3QgZm9yIHRoZSBnaXZlbiBtb2RlbCBuYW1lLCBlbnRpdHkgaWQsIGFuZCByZWxhdGlvbiBmcm9tIHRoZSBzdGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBlbnRpdHlJZFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyBpdCBpcyBiZWluZyByZXF1ZXN0ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1JlcXVlc3RpbmdSZWxhdGlvbkVuZHBvaW50Rm9yRW50aXR5SWQoXG5cdHN0YXRlLFxuXHRtb2RlbE5hbWUsXG5cdGVudGl0eUlkLFxuXHRyZWxhdGlvbk1vZGVsTmFtZVxuKSB7XG5cdG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKTtcblx0ZW50aXR5SWQgPSBub3JtYWxpemVFbnRpdHlJZCggZW50aXR5SWQgKTtcblx0cmVsYXRpb25Nb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25Nb2RlbE5hbWUgKTtcblx0cmV0dXJuIGlzUmVzb2x2aW5nKFxuXHRcdFJFRFVDRVJfS0VZLFxuXHRcdCdnZXRSZWxhdGlvbkVuZHBvaW50Rm9yRW50aXR5SWQnLFxuXHRcdG1vZGVsTmFtZSxcblx0XHRlbnRpdHlJZCxcblx0XHRyZWxhdGlvbk1vZGVsTmFtZSxcblx0KTtcbn1cblxuLyoqXG4gKiBTZWxlY3RvciBmb3IgcmV0dXJuaW5nIHRoZSBwcmltYXJ5IGtleSBzdHJpbmcgdG8gdXNlIGluIGEgcXVlcnkgZm9yIHRoZSBnaXZlblxuICogbW9kZWwgYW5kIHJlbGF0aW9uLiAgVGhpcyBjb25zaWRlcnMgdGhlIGpvaW4gdHlwZSBmb3IgdGhlIHJlbGF0aW9uLlxuICpcbiAqIEZvciBleGFtcGxlOiAgSWYgeW91IHdlcmUgZG9pbmcgYSBxdWVyeSB0byBnZXQgdGhlIHJlZ2lzdHJhdGlvbnMgcmVsYXRlZCB0byBhblxuICogYXR0ZW5kZWUsIHlvdSB3b3VsZCBuZWVkIHRoZSBzdHJpbmcgdG8gdXNlIGZvciB0aGUgYFJFR19JRGAgcHJpbWFyeSBrZXkgaW5cbiAqIHRoZSBxdWVyeS4gIFNpbmNlIHRoZSBqb2luIHR5cGUgZm9yIHJlZ2lzdHJhdGlvbnMgdG8gYXR0ZW5kZWVzIGlzXG4gKiBFRV9IYXNfTWFueV9SZWxhdGlvbiwgdGhlbiB0aGUgcXVlcnkgc3RyaW5nIHdvdWxkIG5lZWQgdG8gYmVcbiAqIGBSZWdpc3RyYXRpb24uUkVHX0lEYC4gIElmIGhvd2V2ZXIgeW91IHdlcmUgZ2V0dGluZyB0aGUgYXR0ZW5kZWUgcmVsYXRlZFxuICogdG8gYSByZWdpc3RyYXRpb24sIHRoZW4gdGhlIGpvaW4gdHlwZSBmb3IgYXR0ZW5kZWVzIG9uIHJlZ2lzdHJhdGlvbnMgaXNcbiAqIEVFX0JlbG9uZ3NfVG9fUmVsYXRpb24sIGluIHdoaWNoIGNhc2UgdGhlIGF0dGVuZGVlIHByaW1hcnkga2V5IHdvdWxkIGJlXG4gKiBgQVRUX0lEYCAodGhlIHJlZ2lzdHJhdGlvbiB0YWJsZSBoYXMgdGhlIGZvcmVpZ24ga2V5IG9uIGl0KS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBwcmltYXJ5IGtleSBzdHJpbmcgdG8gdXNlIG9yIGFuIGVtcHR5IHN0cmluZyBpZiByZWxhdGlvblxuICogdHlwZSBjb3VsZCBub3QgYmUgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFJlbGF0aW9uUHJpbWFyeUtleVN0cmluZyA9IGNyZWF0ZVNlbGVjdG9yKFxuXHQoXG5cdFx0c3RhdGUsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdHJlbGF0aW9uTmFtZVxuXHQpID0+IHtcblx0XHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdFx0cmVsYXRpb25OYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIHJlbGF0aW9uTmFtZSApO1xuXHRcdGNvbnN0IHJlbGF0aW9uVHlwZSA9IGdldFJlbGF0aW9uVHlwZSggc3RhdGUsIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICk7XG5cdFx0aWYgKCByZWxhdGlvblR5cGUgPT09ICcnICkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0XHRjb25zdCByZWxhdGlvblByaW1hcnlLZXkgPSBnZXRQcmltYXJ5S2V5KCByZWxhdGlvbk5hbWUgKTtcblx0XHRyZXR1cm4gcmVsYXRpb25UeXBlID09PSAnRUVfQmVsb25nc19Ub19SZWxhdGlvbicgP1xuXHRcdFx0cmVsYXRpb25QcmltYXJ5S2V5IDpcblx0XHRcdGAkeyBtb2RlbE5hbWVGb3JRdWVyeVN0cmluZyggcmVsYXRpb25OYW1lICkgfS4keyByZWxhdGlvblByaW1hcnlLZXkgfWA7XG5cdH0sXG5cdCggc3RhdGUsIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICkgPT4ge1xuXHRcdG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKTtcblx0XHRyZWxhdGlvbk5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25OYW1lICk7XG5cdFx0cmV0dXJuIFtcblx0XHRcdHN0YXRlLnJlbGF0aW9uU2NoZW1hLmdldEluKCBbIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lIF0sICcnICksXG5cdFx0XTtcblx0fSxcbik7XG5cbi8qKlxuICogU2VsZWN0b3IgcmV0dXJuaW5nIHRoZSByZWxhdGlvbiByZXNwb25zZSB0eXBlIGZvciB0aGUgZ2l2ZW4gcmVsYXRpb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB0eXBlIGZvciB0aGUgcmVsYXRpb24gcmV0dXJuZWQgZm9yIHRoZSBnaXZlbiBtb2RlbCBhbmRcbiAqIHJlbGF0aW9uLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UmVsYXRpb25SZXNwb25zZVR5cGUgPSAoIHN0YXRlLCBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSApID0+IHtcblx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRyZWxhdGlvbk5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25OYW1lICk7XG5cdGNvbnN0IHJlbGF0aW9uU2NoZW1hID0gZ2V0UmVsYXRpb25TY2hlbWEoIHN0YXRlLCBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSApO1xuXHRyZXR1cm4gcmVsYXRpb25TY2hlbWEgIT09IG51bGwgP1xuXHRcdHJlbGF0aW9uU2NoZW1hLnR5cGUgOlxuXHRcdCcnO1xufTtcblxuLyoqXG4gKiBTZWxlY3RvciByZXR1cm5pbmcgd2hldGhlciB0aGUgcmVsYXRpb24gYmV0d2VlbiB0aGUgZ2l2ZW4gbW9kZWwgbmFtZSBhbmRcbiAqIHJlbGF0aW9uIG5hbWUgaGFzIGEgam9pbiB0YWJsZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhlcmUgaXMgYSBqb2luIHRhYmxlLCBmYWxzZSBtZWFucyB0aGVyZSBpc24ndC5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0pvaW5UYWJsZVJlbGF0aW9uID0gKCBzdGF0ZSwgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgKSA9PiB7XG5cdG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKTtcblx0cmVsYXRpb25OYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIHJlbGF0aW9uTmFtZSApO1xuXHRjb25zdCByZWxhdGlvblR5cGUgPSBnZXRSZWxhdGlvblR5cGUoIHN0YXRlLCBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSApO1xuXHRyZXR1cm4gSk9JTl9SRUxBVElPTl9UWVBFUy5pbmRleE9mKCByZWxhdGlvblR5cGUgKSA+IC0xO1xufTtcblxuLyoqXG4gKiBTZWxlY3RvciByZXR1cm5pbmcgdGhlIHJlbGF0aW9uIHR5cGUgZGVzY3JpYmluZyB0aGUgcmVsYXRpb24gYmV0d2VlbiB0aGVcbiAqIGdpdmVuIG1vZGVsIG5hbWUgYW5kIHJlbGF0aW9uIG5hbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICBUaGUgcmVsYXRpb24gdHlwZSAoZWcuIFwiRUVfSEFCVE1fUmVsYXRpb25cIilcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFJlbGF0aW9uVHlwZSA9ICggc3RhdGUsIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICkgPT4ge1xuXHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0Y29uc3QgcmVsYXRpb25TY2hlbWEgPSBnZXRSZWxhdGlvblNjaGVtYSggc3RhdGUsIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICk7XG5cdHJldHVybiByZWxhdGlvblNjaGVtYSAhPT0gbnVsbCA/XG5cdFx0cmVsYXRpb25TY2hlbWEucmVsYXRpb25fdHlwZSA6XG5cdFx0Jyc7XG59O1xuXG4vKipcbiAqIFNlbGVjdG9yIHJldHVybmluZyB0aGUgcmVsYXRpb24gc2NoZW1hIGRlc2NyaWJpbmcgdGhlIHJlbGF0aW9uIGJldHdlZW4gdGhlXG4gKiBnaXZlbiBtb2RlbCBuYW1lIGFuZCByZWxhdGlvbiBuYW1lLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICogQHJldHVybiB7T2JqZWN0fG51bGx9IEFuIG9iamVjdCBvciBudWxsIGlmIHRoZXJlIGlzIG5vIHJlbGF0aW9uIHNjaGVtYS5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFJlbGF0aW9uU2NoZW1hID0gKCBzdGF0ZSwgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgKSA9PiB7XG5cdG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKTtcblx0cmVsYXRpb25OYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIHJlbGF0aW9uTmFtZSApO1xuXHRyZXR1cm4gc3RhdGUucmVsYXRpb25TY2hlbWEuZ2V0SW4oIFsgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgXSwgbnVsbCApO1xufTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aG91dEhvbGVzOyIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3luY1RvR2VuZXJhdG9yOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXIpID09PSBcIltvYmplY3QgQXJndW1lbnRzXVwiKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVNwcmVhZDsiLCJ2YXIgYXJyYXlXaXRob3V0SG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhvdXRIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheVwiKTtcblxudmFyIG5vbkl0ZXJhYmxlU3ByZWFkID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVTcHJlYWRcIik7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdG9Db25zdW1hYmxlQXJyYXk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4vLyBVc2VkIGZvciBzZXR0aW5nIHByb3RvdHlwZSBtZXRob2RzIHRoYXQgSUU4IGNob2tlcyBvbi5cbnZhciBERUxFVEUgPSAnZGVsZXRlJztcblxuLy8gQ29uc3RhbnRzIGRlc2NyaWJpbmcgdGhlIHNpemUgb2YgdHJpZSBub2Rlcy5cbnZhciBTSElGVCA9IDU7IC8vIFJlc3VsdGVkIGluIGJlc3QgcGVyZm9ybWFuY2UgYWZ0ZXIgX19fX19fP1xudmFyIFNJWkUgPSAxIDw8IFNISUZUO1xudmFyIE1BU0sgPSBTSVpFIC0gMTtcblxuLy8gQSBjb25zaXN0ZW50IHNoYXJlZCB2YWx1ZSByZXByZXNlbnRpbmcgXCJub3Qgc2V0XCIgd2hpY2ggZXF1YWxzIG5vdGhpbmcgb3RoZXJcbi8vIHRoYW4gaXRzZWxmLCBhbmQgbm90aGluZyB0aGF0IGNvdWxkIGJlIHByb3ZpZGVkIGV4dGVybmFsbHkuXG52YXIgTk9UX1NFVCA9IHt9O1xuXG4vLyBCb29sZWFuIHJlZmVyZW5jZXMsIFJvdWdoIGVxdWl2YWxlbnQgb2YgYGJvb2wgJmAuXG5mdW5jdGlvbiBNYWtlUmVmKCkge1xuICByZXR1cm4geyB2YWx1ZTogZmFsc2UgfTtcbn1cblxuZnVuY3Rpb24gU2V0UmVmKHJlZikge1xuICBpZiAocmVmKSB7XG4gICAgcmVmLnZhbHVlID0gdHJ1ZTtcbiAgfVxufVxuXG4vLyBBIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSB2YWx1ZSByZXByZXNlbnRpbmcgYW4gXCJvd25lclwiIGZvciB0cmFuc2llbnQgd3JpdGVzXG4vLyB0byB0cmllcy4gVGhlIHJldHVybiB2YWx1ZSB3aWxsIG9ubHkgZXZlciBlcXVhbCBpdHNlbGYsIGFuZCB3aWxsIG5vdCBlcXVhbFxuLy8gdGhlIHJldHVybiBvZiBhbnkgc3Vic2VxdWVudCBjYWxsIG9mIHRoaXMgZnVuY3Rpb24uXG5mdW5jdGlvbiBPd25lcklEKCkge31cblxuZnVuY3Rpb24gZW5zdXJlU2l6ZShpdGVyKSB7XG4gIGlmIChpdGVyLnNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgIGl0ZXIuc2l6ZSA9IGl0ZXIuX19pdGVyYXRlKHJldHVyblRydWUpO1xuICB9XG4gIHJldHVybiBpdGVyLnNpemU7XG59XG5cbmZ1bmN0aW9uIHdyYXBJbmRleChpdGVyLCBpbmRleCkge1xuICAvLyBUaGlzIGltcGxlbWVudHMgXCJpcyBhcnJheSBpbmRleFwiIHdoaWNoIHRoZSBFQ01BU3RyaW5nIHNwZWMgZGVmaW5lcyBhczpcbiAgLy9cbiAgLy8gICAgIEEgU3RyaW5nIHByb3BlcnR5IG5hbWUgUCBpcyBhbiBhcnJheSBpbmRleCBpZiBhbmQgb25seSBpZlxuICAvLyAgICAgVG9TdHJpbmcoVG9VaW50MzIoUCkpIGlzIGVxdWFsIHRvIFAgYW5kIFRvVWludDMyKFApIGlzIG5vdCBlcXVhbFxuICAvLyAgICAgdG8gMl4zMuKIkjEuXG4gIC8vXG4gIC8vIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1hcnJheS1leG90aWMtb2JqZWN0c1xuICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykge1xuICAgIHZhciB1aW50MzJJbmRleCA9IGluZGV4ID4+PiAwOyAvLyBOID4+PiAwIGlzIHNob3J0aGFuZCBmb3IgVG9VaW50MzJcbiAgICBpZiAoJycgKyB1aW50MzJJbmRleCAhPT0gaW5kZXggfHwgdWludDMySW5kZXggPT09IDQyOTQ5NjcyOTUpIHtcbiAgICAgIHJldHVybiBOYU47XG4gICAgfVxuICAgIGluZGV4ID0gdWludDMySW5kZXg7XG4gIH1cbiAgcmV0dXJuIGluZGV4IDwgMCA/IGVuc3VyZVNpemUoaXRlcikgKyBpbmRleCA6IGluZGV4O1xufVxuXG5mdW5jdGlvbiByZXR1cm5UcnVlKCkge1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gd2hvbGVTbGljZShiZWdpbiwgZW5kLCBzaXplKSB7XG4gIHJldHVybiAoXG4gICAgKChiZWdpbiA9PT0gMCAmJiAhaXNOZWcoYmVnaW4pKSB8fFxuICAgICAgKHNpemUgIT09IHVuZGVmaW5lZCAmJiBiZWdpbiA8PSAtc2l6ZSkpICYmXG4gICAgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IChzaXplICE9PSB1bmRlZmluZWQgJiYgZW5kID49IHNpemUpKVxuICApO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQmVnaW4oYmVnaW4sIHNpemUpIHtcbiAgcmV0dXJuIHJlc29sdmVJbmRleChiZWdpbiwgc2l6ZSwgMCk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVFbmQoZW5kLCBzaXplKSB7XG4gIHJldHVybiByZXNvbHZlSW5kZXgoZW5kLCBzaXplLCBzaXplKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUluZGV4KGluZGV4LCBzaXplLCBkZWZhdWx0SW5kZXgpIHtcbiAgLy8gU2FuaXRpemUgaW5kaWNlcyB1c2luZyB0aGlzIHNob3J0aGFuZCBmb3IgVG9JbnQzMihhcmd1bWVudClcbiAgLy8gaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXRvaW50MzJcbiAgcmV0dXJuIGluZGV4ID09PSB1bmRlZmluZWRcbiAgICA/IGRlZmF1bHRJbmRleFxuICAgIDogaXNOZWcoaW5kZXgpXG4gICAgICA/IHNpemUgPT09IEluZmluaXR5XG4gICAgICAgID8gc2l6ZVxuICAgICAgICA6IE1hdGgubWF4KDAsIHNpemUgKyBpbmRleCkgfCAwXG4gICAgICA6IHNpemUgPT09IHVuZGVmaW5lZCB8fCBzaXplID09PSBpbmRleFxuICAgICAgICA/IGluZGV4XG4gICAgICAgIDogTWF0aC5taW4oc2l6ZSwgaW5kZXgpIHwgMDtcbn1cblxuZnVuY3Rpb24gaXNOZWcodmFsdWUpIHtcbiAgLy8gQWNjb3VudCBmb3IgLTAgd2hpY2ggaXMgbmVnYXRpdmUsIGJ1dCBub3QgbGVzcyB0aGFuIDAuXG4gIHJldHVybiB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA9PT0gLUluZmluaXR5KTtcbn1cblxuLy8gTm90ZTogdmFsdWUgaXMgdW5jaGFuZ2VkIHRvIG5vdCBicmVhayBpbW11dGFibGUtZGV2dG9vbHMuXG52YXIgSVNfQ09MTEVDVElPTl9TWU1CT0wgPSAnQEBfX0lNTVVUQUJMRV9JVEVSQUJMRV9fQEAnO1xuXG5mdW5jdGlvbiBpc0NvbGxlY3Rpb24obWF5YmVDb2xsZWN0aW9uKSB7XG4gIHJldHVybiBCb29sZWFuKG1heWJlQ29sbGVjdGlvbiAmJiBtYXliZUNvbGxlY3Rpb25bSVNfQ09MTEVDVElPTl9TWU1CT0xdKTtcbn1cblxudmFyIElTX0tFWUVEX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX0tFWUVEX19AQCc7XG5cbmZ1bmN0aW9uIGlzS2V5ZWQobWF5YmVLZXllZCkge1xuICByZXR1cm4gQm9vbGVhbihtYXliZUtleWVkICYmIG1heWJlS2V5ZWRbSVNfS0VZRURfU1lNQk9MXSk7XG59XG5cbnZhciBJU19JTkRFWEVEX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX0lOREVYRURfX0BAJztcblxuZnVuY3Rpb24gaXNJbmRleGVkKG1heWJlSW5kZXhlZCkge1xuICByZXR1cm4gQm9vbGVhbihtYXliZUluZGV4ZWQgJiYgbWF5YmVJbmRleGVkW0lTX0lOREVYRURfU1lNQk9MXSk7XG59XG5cbmZ1bmN0aW9uIGlzQXNzb2NpYXRpdmUobWF5YmVBc3NvY2lhdGl2ZSkge1xuICByZXR1cm4gaXNLZXllZChtYXliZUFzc29jaWF0aXZlKSB8fCBpc0luZGV4ZWQobWF5YmVBc3NvY2lhdGl2ZSk7XG59XG5cbnZhciBDb2xsZWN0aW9uID0gZnVuY3Rpb24gQ29sbGVjdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNDb2xsZWN0aW9uKHZhbHVlKSA/IHZhbHVlIDogU2VxKHZhbHVlKTtcbn07XG5cbnZhciBLZXllZENvbGxlY3Rpb24gPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChDb2xsZWN0aW9uKSB7XG4gIGZ1bmN0aW9uIEtleWVkQ29sbGVjdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBpc0tleWVkKHZhbHVlKSA/IHZhbHVlIDogS2V5ZWRTZXEodmFsdWUpO1xuICB9XG5cbiAgaWYgKCBDb2xsZWN0aW9uICkgS2V5ZWRDb2xsZWN0aW9uLl9fcHJvdG9fXyA9IENvbGxlY3Rpb247XG4gIEtleWVkQ29sbGVjdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlICk7XG4gIEtleWVkQ29sbGVjdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBLZXllZENvbGxlY3Rpb247XG5cbiAgcmV0dXJuIEtleWVkQ29sbGVjdGlvbjtcbn0oQ29sbGVjdGlvbikpO1xuXG52YXIgSW5kZXhlZENvbGxlY3Rpb24gPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChDb2xsZWN0aW9uKSB7XG4gIGZ1bmN0aW9uIEluZGV4ZWRDb2xsZWN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzSW5kZXhlZCh2YWx1ZSkgPyB2YWx1ZSA6IEluZGV4ZWRTZXEodmFsdWUpO1xuICB9XG5cbiAgaWYgKCBDb2xsZWN0aW9uICkgSW5kZXhlZENvbGxlY3Rpb24uX19wcm90b19fID0gQ29sbGVjdGlvbjtcbiAgSW5kZXhlZENvbGxlY3Rpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZSApO1xuICBJbmRleGVkQ29sbGVjdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbmRleGVkQ29sbGVjdGlvbjtcblxuICByZXR1cm4gSW5kZXhlZENvbGxlY3Rpb247XG59KENvbGxlY3Rpb24pKTtcblxudmFyIFNldENvbGxlY3Rpb24gPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChDb2xsZWN0aW9uKSB7XG4gIGZ1bmN0aW9uIFNldENvbGxlY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gaXNDb2xsZWN0aW9uKHZhbHVlKSAmJiAhaXNBc3NvY2lhdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IFNldFNlcSh2YWx1ZSk7XG4gIH1cblxuICBpZiAoIENvbGxlY3Rpb24gKSBTZXRDb2xsZWN0aW9uLl9fcHJvdG9fXyA9IENvbGxlY3Rpb247XG4gIFNldENvbGxlY3Rpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZSApO1xuICBTZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNldENvbGxlY3Rpb247XG5cbiAgcmV0dXJuIFNldENvbGxlY3Rpb247XG59KENvbGxlY3Rpb24pKTtcblxuQ29sbGVjdGlvbi5LZXllZCA9IEtleWVkQ29sbGVjdGlvbjtcbkNvbGxlY3Rpb24uSW5kZXhlZCA9IEluZGV4ZWRDb2xsZWN0aW9uO1xuQ29sbGVjdGlvbi5TZXQgPSBTZXRDb2xsZWN0aW9uO1xuXG52YXIgSVNfU0VRX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX1NFUV9fQEAnO1xuXG5mdW5jdGlvbiBpc1NlcShtYXliZVNlcSkge1xuICByZXR1cm4gQm9vbGVhbihtYXliZVNlcSAmJiBtYXliZVNlcVtJU19TRVFfU1lNQk9MXSk7XG59XG5cbnZhciBJU19SRUNPUkRfU1lNQk9MID0gJ0BAX19JTU1VVEFCTEVfUkVDT1JEX19AQCc7XG5cbmZ1bmN0aW9uIGlzUmVjb3JkKG1heWJlUmVjb3JkKSB7XG4gIHJldHVybiBCb29sZWFuKG1heWJlUmVjb3JkICYmIG1heWJlUmVjb3JkW0lTX1JFQ09SRF9TWU1CT0xdKTtcbn1cblxuZnVuY3Rpb24gaXNJbW11dGFibGUobWF5YmVJbW11dGFibGUpIHtcbiAgcmV0dXJuIGlzQ29sbGVjdGlvbihtYXliZUltbXV0YWJsZSkgfHwgaXNSZWNvcmQobWF5YmVJbW11dGFibGUpO1xufVxuXG52YXIgSVNfT1JERVJFRF9TWU1CT0wgPSAnQEBfX0lNTVVUQUJMRV9PUkRFUkVEX19AQCc7XG5cbmZ1bmN0aW9uIGlzT3JkZXJlZChtYXliZU9yZGVyZWQpIHtcbiAgcmV0dXJuIEJvb2xlYW4obWF5YmVPcmRlcmVkICYmIG1heWJlT3JkZXJlZFtJU19PUkRFUkVEX1NZTUJPTF0pO1xufVxuXG52YXIgSVRFUkFURV9LRVlTID0gMDtcbnZhciBJVEVSQVRFX1ZBTFVFUyA9IDE7XG52YXIgSVRFUkFURV9FTlRSSUVTID0gMjtcblxudmFyIFJFQUxfSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG52YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7XG5cbnZhciBJVEVSQVRPUl9TWU1CT0wgPSBSRUFMX0lURVJBVE9SX1NZTUJPTCB8fCBGQVVYX0lURVJBVE9SX1NZTUJPTDtcblxudmFyIEl0ZXJhdG9yID0gZnVuY3Rpb24gSXRlcmF0b3IobmV4dCkge1xuICB0aGlzLm5leHQgPSBuZXh0O1xufTtcblxuSXRlcmF0b3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICByZXR1cm4gJ1tJdGVyYXRvcl0nO1xufTtcblxuSXRlcmF0b3IuS0VZUyA9IElURVJBVEVfS0VZUztcbkl0ZXJhdG9yLlZBTFVFUyA9IElURVJBVEVfVkFMVUVTO1xuSXRlcmF0b3IuRU5UUklFUyA9IElURVJBVEVfRU5UUklFUztcblxuSXRlcmF0b3IucHJvdG90eXBlLmluc3BlY3QgPSBJdGVyYXRvci5wcm90b3R5cGUudG9Tb3VyY2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbn07XG5JdGVyYXRvci5wcm90b3R5cGVbSVRFUkFUT1JfU1lNQk9MXSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIGl0ZXJhdG9yVmFsdWUodHlwZSwgaywgdiwgaXRlcmF0b3JSZXN1bHQpIHtcbiAgdmFyIHZhbHVlID0gdHlwZSA9PT0gMCA/IGsgOiB0eXBlID09PSAxID8gdiA6IFtrLCB2XTtcbiAgaXRlcmF0b3JSZXN1bHRcbiAgICA/IChpdGVyYXRvclJlc3VsdC52YWx1ZSA9IHZhbHVlKVxuICAgIDogKGl0ZXJhdG9yUmVzdWx0ID0ge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgfSk7XG4gIHJldHVybiBpdGVyYXRvclJlc3VsdDtcbn1cblxuZnVuY3Rpb24gaXRlcmF0b3JEb25lKCkge1xuICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG59XG5cbmZ1bmN0aW9uIGhhc0l0ZXJhdG9yKG1heWJlSXRlcmFibGUpIHtcbiAgcmV0dXJuICEhZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKTtcbn1cblxuZnVuY3Rpb24gaXNJdGVyYXRvcihtYXliZUl0ZXJhdG9yKSB7XG4gIHJldHVybiBtYXliZUl0ZXJhdG9yICYmIHR5cGVvZiBtYXliZUl0ZXJhdG9yLm5leHQgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGdldEl0ZXJhdG9yKGl0ZXJhYmxlKSB7XG4gIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihpdGVyYWJsZSk7XG4gIHJldHVybiBpdGVyYXRvckZuICYmIGl0ZXJhdG9yRm4uY2FsbChpdGVyYWJsZSk7XG59XG5cbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4oaXRlcmFibGUpIHtcbiAgdmFyIGl0ZXJhdG9yRm4gPVxuICAgIGl0ZXJhYmxlICYmXG4gICAgKChSRUFMX0lURVJBVE9SX1NZTUJPTCAmJiBpdGVyYWJsZVtSRUFMX0lURVJBVE9SX1NZTUJPTF0pIHx8XG4gICAgICBpdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgfVxufVxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICB2YWx1ZSAmJlxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlLmxlbmd0aCkgJiZcbiAgICB2YWx1ZS5sZW5ndGggPj0gMCAmJlxuICAgICh2YWx1ZS5sZW5ndGggPT09IDBcbiAgICAgID8gLy8gT25seSB7bGVuZ3RoOiAwfSBpcyBjb25zaWRlcmVkIEFycmF5LWxpa2UuXG4gICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT09IDFcbiAgICAgIDogLy8gQW4gb2JqZWN0IGlzIG9ubHkgQXJyYXktbGlrZSBpZiBpdCBoYXMgYSBwcm9wZXJ0eSB3aGVyZSB0aGUgbGFzdCB2YWx1ZVxuICAgICAgICAvLyBpbiB0aGUgYXJyYXktbGlrZSBtYXkgYmUgZm91bmQgKHdoaWNoIGNvdWxkIGJlIHVuZGVmaW5lZCkuXG4gICAgICAgIHZhbHVlLmhhc093blByb3BlcnR5KHZhbHVlLmxlbmd0aCAtIDEpKVxuICApO1xufVxuXG52YXIgU2VxID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoQ29sbGVjdGlvbiQkMSkge1xuICBmdW5jdGlvbiBTZXEodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbXB0eVNlcXVlbmNlKClcbiAgICAgIDogaXNJbW11dGFibGUodmFsdWUpXG4gICAgICAgID8gdmFsdWUudG9TZXEoKVxuICAgICAgICA6IHNlcUZyb21WYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBpZiAoIENvbGxlY3Rpb24kJDEgKSBTZXEuX19wcm90b19fID0gQ29sbGVjdGlvbiQkMTtcbiAgU2VxLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIENvbGxlY3Rpb24kJDEgJiYgQ29sbGVjdGlvbiQkMS5wcm90b3R5cGUgKTtcbiAgU2VxLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlcTtcblxuICBTZXEucHJvdG90eXBlLnRvU2VxID0gZnVuY3Rpb24gdG9TZXEgKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFNlcS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX190b1N0cmluZygnU2VxIHsnLCAnfScpO1xuICB9O1xuXG4gIFNlcS5wcm90b3R5cGUuY2FjaGVSZXN1bHQgPSBmdW5jdGlvbiBjYWNoZVJlc3VsdCAoKSB7XG4gICAgaWYgKCF0aGlzLl9jYWNoZSAmJiB0aGlzLl9faXRlcmF0ZVVuY2FjaGVkKSB7XG4gICAgICB0aGlzLl9jYWNoZSA9IHRoaXMuZW50cnlTZXEoKS50b0FycmF5KCk7XG4gICAgICB0aGlzLnNpemUgPSB0aGlzLl9jYWNoZS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIGFic3RyYWN0IF9faXRlcmF0ZVVuY2FjaGVkKGZuLCByZXZlcnNlKVxuXG4gIFNlcS5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuX2NhY2hlO1xuICAgIGlmIChjYWNoZSkge1xuICAgICAgdmFyIHNpemUgPSBjYWNoZS5sZW5ndGg7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB3aGlsZSAoaSAhPT0gc2l6ZSkge1xuICAgICAgICB2YXIgZW50cnkgPSBjYWNoZVtyZXZlcnNlID8gc2l6ZSAtICsraSA6IGkrK107XG4gICAgICAgIGlmIChmbihlbnRyeVsxXSwgZW50cnlbMF0sIHRoaXMpID09PSBmYWxzZSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX19pdGVyYXRlVW5jYWNoZWQoZm4sIHJldmVyc2UpO1xuICB9O1xuXG4gIC8vIGFic3RyYWN0IF9faXRlcmF0b3JVbmNhY2hlZCh0eXBlLCByZXZlcnNlKVxuXG4gIFNlcS5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLl9jYWNoZTtcbiAgICBpZiAoY2FjaGUpIHtcbiAgICAgIHZhciBzaXplID0gY2FjaGUubGVuZ3RoO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpID09PSBzaXplKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yRG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRyeSA9IGNhY2hlW3JldmVyc2UgPyBzaXplIC0gKytpIDogaSsrXTtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fX2l0ZXJhdG9yVW5jYWNoZWQodHlwZSwgcmV2ZXJzZSk7XG4gIH07XG5cbiAgcmV0dXJuIFNlcTtcbn0oQ29sbGVjdGlvbikpO1xuXG52YXIgS2V5ZWRTZXEgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChTZXEpIHtcbiAgZnVuY3Rpb24gS2V5ZWRTZXEodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbXB0eVNlcXVlbmNlKCkudG9LZXllZFNlcSgpXG4gICAgICA6IGlzQ29sbGVjdGlvbih2YWx1ZSlcbiAgICAgICAgPyBpc0tleWVkKHZhbHVlKVxuICAgICAgICAgID8gdmFsdWUudG9TZXEoKVxuICAgICAgICAgIDogdmFsdWUuZnJvbUVudHJ5U2VxKClcbiAgICAgICAgOiBpc1JlY29yZCh2YWx1ZSlcbiAgICAgICAgICA/IHZhbHVlLnRvU2VxKClcbiAgICAgICAgICA6IGtleWVkU2VxRnJvbVZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIGlmICggU2VxICkgS2V5ZWRTZXEuX19wcm90b19fID0gU2VxO1xuICBLZXllZFNlcS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBTZXEgJiYgU2VxLnByb3RvdHlwZSApO1xuICBLZXllZFNlcS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBLZXllZFNlcTtcblxuICBLZXllZFNlcS5wcm90b3R5cGUudG9LZXllZFNlcSA9IGZ1bmN0aW9uIHRvS2V5ZWRTZXEgKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBLZXllZFNlcTtcbn0oU2VxKSk7XG5cbnZhciBJbmRleGVkU2VxID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoU2VxKSB7XG4gIGZ1bmN0aW9uIEluZGV4ZWRTZXEodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgPyBlbXB0eVNlcXVlbmNlKClcbiAgICAgIDogaXNDb2xsZWN0aW9uKHZhbHVlKVxuICAgICAgICA/IGlzS2V5ZWQodmFsdWUpXG4gICAgICAgICAgPyB2YWx1ZS5lbnRyeVNlcSgpXG4gICAgICAgICAgOiB2YWx1ZS50b0luZGV4ZWRTZXEoKVxuICAgICAgICA6IGlzUmVjb3JkKHZhbHVlKVxuICAgICAgICAgID8gdmFsdWUudG9TZXEoKS5lbnRyeVNlcSgpXG4gICAgICAgICAgOiBpbmRleGVkU2VxRnJvbVZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIGlmICggU2VxICkgSW5kZXhlZFNlcS5fX3Byb3RvX18gPSBTZXE7XG4gIEluZGV4ZWRTZXEucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggU2VxICYmIFNlcS5wcm90b3R5cGUgKTtcbiAgSW5kZXhlZFNlcS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbmRleGVkU2VxO1xuXG4gIEluZGV4ZWRTZXEub2YgPSBmdW5jdGlvbiBvZiAoLyouLi52YWx1ZXMqLykge1xuICAgIHJldHVybiBJbmRleGVkU2VxKGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgSW5kZXhlZFNlcS5wcm90b3R5cGUudG9JbmRleGVkU2VxID0gZnVuY3Rpb24gdG9JbmRleGVkU2VxICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBJbmRleGVkU2VxLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RvU3RyaW5nKCdTZXEgWycsICddJyk7XG4gIH07XG5cbiAgcmV0dXJuIEluZGV4ZWRTZXE7XG59KFNlcSkpO1xuXG52YXIgU2V0U2VxID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoU2VxKSB7XG4gIGZ1bmN0aW9uIFNldFNlcSh2YWx1ZSkge1xuICAgIHJldHVybiAoaXNDb2xsZWN0aW9uKHZhbHVlKSAmJiAhaXNBc3NvY2lhdGl2ZSh2YWx1ZSlcbiAgICAgID8gdmFsdWVcbiAgICAgIDogSW5kZXhlZFNlcSh2YWx1ZSlcbiAgICApLnRvU2V0U2VxKCk7XG4gIH1cblxuICBpZiAoIFNlcSApIFNldFNlcS5fX3Byb3RvX18gPSBTZXE7XG4gIFNldFNlcS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBTZXEgJiYgU2VxLnByb3RvdHlwZSApO1xuICBTZXRTZXEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2V0U2VxO1xuXG4gIFNldFNlcS5vZiA9IGZ1bmN0aW9uIG9mICgvKi4uLnZhbHVlcyovKSB7XG4gICAgcmV0dXJuIFNldFNlcShhcmd1bWVudHMpO1xuICB9O1xuXG4gIFNldFNlcS5wcm90b3R5cGUudG9TZXRTZXEgPSBmdW5jdGlvbiB0b1NldFNlcSAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIFNldFNlcTtcbn0oU2VxKSk7XG5cblNlcS5pc1NlcSA9IGlzU2VxO1xuU2VxLktleWVkID0gS2V5ZWRTZXE7XG5TZXEuU2V0ID0gU2V0U2VxO1xuU2VxLkluZGV4ZWQgPSBJbmRleGVkU2VxO1xuXG5TZXEucHJvdG90eXBlW0lTX1NFUV9TWU1CT0xdID0gdHJ1ZTtcblxuLy8gI3ByYWdtYSBSb290IFNlcXVlbmNlc1xuXG52YXIgQXJyYXlTZXEgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChJbmRleGVkU2VxKSB7XG4gIGZ1bmN0aW9uIEFycmF5U2VxKGFycmF5KSB7XG4gICAgdGhpcy5fYXJyYXkgPSBhcnJheTtcbiAgICB0aGlzLnNpemUgPSBhcnJheS5sZW5ndGg7XG4gIH1cblxuICBpZiAoIEluZGV4ZWRTZXEgKSBBcnJheVNlcS5fX3Byb3RvX18gPSBJbmRleGVkU2VxO1xuICBBcnJheVNlcS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBJbmRleGVkU2VxICYmIEluZGV4ZWRTZXEucHJvdG90eXBlICk7XG4gIEFycmF5U2VxLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFycmF5U2VxO1xuXG4gIEFycmF5U2VxLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGluZGV4LCBub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmhhcyhpbmRleCkgPyB0aGlzLl9hcnJheVt3cmFwSW5kZXgodGhpcywgaW5kZXgpXSA6IG5vdFNldFZhbHVlO1xuICB9O1xuXG4gIEFycmF5U2VxLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIGFycmF5ID0gdGhpcy5fYXJyYXk7XG4gICAgdmFyIHNpemUgPSBhcnJheS5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpICE9PSBzaXplKSB7XG4gICAgICB2YXIgaWkgPSByZXZlcnNlID8gc2l6ZSAtICsraSA6IGkrKztcbiAgICAgIGlmIChmbihhcnJheVtpaV0sIGlpLCB0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpO1xuICB9O1xuXG4gIEFycmF5U2VxLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBhcnJheSA9IHRoaXMuX2FycmF5O1xuICAgIHZhciBzaXplID0gYXJyYXkubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpID09PSBzaXplKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHZhciBpaSA9IHJldmVyc2UgPyBzaXplIC0gKytpIDogaSsrO1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgaWksIGFycmF5W2lpXSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEFycmF5U2VxO1xufShJbmRleGVkU2VxKSk7XG5cbnZhciBPYmplY3RTZXEgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChLZXllZFNlcSkge1xuICBmdW5jdGlvbiBPYmplY3RTZXEob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuICAgIHRoaXMuX29iamVjdCA9IG9iamVjdDtcbiAgICB0aGlzLl9rZXlzID0ga2V5cztcbiAgICB0aGlzLnNpemUgPSBrZXlzLmxlbmd0aDtcbiAgfVxuXG4gIGlmICggS2V5ZWRTZXEgKSBPYmplY3RTZXEuX19wcm90b19fID0gS2V5ZWRTZXE7XG4gIE9iamVjdFNlcS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBLZXllZFNlcSAmJiBLZXllZFNlcS5wcm90b3R5cGUgKTtcbiAgT2JqZWN0U2VxLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE9iamVjdFNlcTtcblxuICBPYmplY3RTZXEucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoa2V5LCBub3RTZXRWYWx1ZSkge1xuICAgIGlmIChub3RTZXRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gbm90U2V0VmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9vYmplY3Rba2V5XTtcbiAgfTtcblxuICBPYmplY3RTZXEucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIGhhcyAoa2V5KSB7XG4gICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwodGhpcy5fb2JqZWN0LCBrZXkpO1xuICB9O1xuXG4gIE9iamVjdFNlcS5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciBvYmplY3QgPSB0aGlzLl9vYmplY3Q7XG4gICAgdmFyIGtleXMgPSB0aGlzLl9rZXlzO1xuICAgIHZhciBzaXplID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpICE9PSBzaXplKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tyZXZlcnNlID8gc2l6ZSAtICsraSA6IGkrK107XG4gICAgICBpZiAoZm4ob2JqZWN0W2tleV0sIGtleSwgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaTtcbiAgfTtcblxuICBPYmplY3RTZXEucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIG9iamVjdCA9IHRoaXMuX29iamVjdDtcbiAgICB2YXIga2V5cyA9IHRoaXMuX2tleXM7XG4gICAgdmFyIHNpemUgPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaSA9IDA7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaSA9PT0gc2l6ZSkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gICAgICB9XG4gICAgICB2YXIga2V5ID0ga2V5c1tyZXZlcnNlID8gc2l6ZSAtICsraSA6IGkrK107XG4gICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCBrZXksIG9iamVjdFtrZXldKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gT2JqZWN0U2VxO1xufShLZXllZFNlcSkpO1xuT2JqZWN0U2VxLnByb3RvdHlwZVtJU19PUkRFUkVEX1NZTUJPTF0gPSB0cnVlO1xuXG52YXIgQ29sbGVjdGlvblNlcSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEluZGV4ZWRTZXEpIHtcbiAgZnVuY3Rpb24gQ29sbGVjdGlvblNlcShjb2xsZWN0aW9uKSB7XG4gICAgdGhpcy5fY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG4gICAgdGhpcy5zaXplID0gY29sbGVjdGlvbi5sZW5ndGggfHwgY29sbGVjdGlvbi5zaXplO1xuICB9XG5cbiAgaWYgKCBJbmRleGVkU2VxICkgQ29sbGVjdGlvblNlcS5fX3Byb3RvX18gPSBJbmRleGVkU2VxO1xuICBDb2xsZWN0aW9uU2VxLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEluZGV4ZWRTZXEgJiYgSW5kZXhlZFNlcS5wcm90b3R5cGUgKTtcbiAgQ29sbGVjdGlvblNlcS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2xsZWN0aW9uU2VxO1xuXG4gIENvbGxlY3Rpb25TZXEucHJvdG90eXBlLl9faXRlcmF0ZVVuY2FjaGVkID0gZnVuY3Rpb24gX19pdGVyYXRlVW5jYWNoZWQgKGZuLCByZXZlcnNlKSB7XG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVzdWx0KCkuX19pdGVyYXRlKGZuLCByZXZlcnNlKTtcbiAgICB9XG4gICAgdmFyIGNvbGxlY3Rpb24gPSB0aGlzLl9jb2xsZWN0aW9uO1xuICAgIHZhciBpdGVyYXRvciA9IGdldEl0ZXJhdG9yKGNvbGxlY3Rpb24pO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICBpZiAoaXNJdGVyYXRvcihpdGVyYXRvcikpIHtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICBpZiAoZm4oc3RlcC52YWx1ZSwgaXRlcmF0aW9ucysrLCB0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXRlcmF0aW9ucztcbiAgfTtcblxuICBDb2xsZWN0aW9uU2VxLnByb3RvdHlwZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yVW5jYWNoZWQgKHR5cGUsIHJldmVyc2UpIHtcbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgY29sbGVjdGlvbiA9IHRoaXMuX2NvbGxlY3Rpb247XG4gICAgdmFyIGl0ZXJhdG9yID0gZ2V0SXRlcmF0b3IoY29sbGVjdGlvbik7XG4gICAgaWYgKCFpc0l0ZXJhdG9yKGl0ZXJhdG9yKSkge1xuICAgICAgcmV0dXJuIG5ldyBJdGVyYXRvcihpdGVyYXRvckRvbmUpO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIHJldHVybiBzdGVwLmRvbmUgPyBzdGVwIDogaXRlcmF0b3JWYWx1ZSh0eXBlLCBpdGVyYXRpb25zKyssIHN0ZXAudmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBDb2xsZWN0aW9uU2VxO1xufShJbmRleGVkU2VxKSk7XG5cbi8vICMgcHJhZ21hIEhlbHBlciBmdW5jdGlvbnNcblxudmFyIEVNUFRZX1NFUTtcblxuZnVuY3Rpb24gZW1wdHlTZXF1ZW5jZSgpIHtcbiAgcmV0dXJuIEVNUFRZX1NFUSB8fCAoRU1QVFlfU0VRID0gbmV3IEFycmF5U2VxKFtdKSk7XG59XG5cbmZ1bmN0aW9uIGtleWVkU2VxRnJvbVZhbHVlKHZhbHVlKSB7XG4gIHZhciBzZXEgPSBBcnJheS5pc0FycmF5KHZhbHVlKVxuICAgID8gbmV3IEFycmF5U2VxKHZhbHVlKVxuICAgIDogaGFzSXRlcmF0b3IodmFsdWUpXG4gICAgICA/IG5ldyBDb2xsZWN0aW9uU2VxKHZhbHVlKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIGlmIChzZXEpIHtcbiAgICByZXR1cm4gc2VxLmZyb21FbnRyeVNlcSgpO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG5ldyBPYmplY3RTZXEodmFsdWUpO1xuICB9XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgJ0V4cGVjdGVkIEFycmF5IG9yIGNvbGxlY3Rpb24gb2JqZWN0IG9mIFtrLCB2XSBlbnRyaWVzLCBvciBrZXllZCBvYmplY3Q6ICcgK1xuICAgICAgdmFsdWVcbiAgKTtcbn1cblxuZnVuY3Rpb24gaW5kZXhlZFNlcUZyb21WYWx1ZSh2YWx1ZSkge1xuICB2YXIgc2VxID0gbWF5YmVJbmRleGVkU2VxRnJvbVZhbHVlKHZhbHVlKTtcbiAgaWYgKHNlcSkge1xuICAgIHJldHVybiBzZXE7XG4gIH1cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAnRXhwZWN0ZWQgQXJyYXkgb3IgY29sbGVjdGlvbiBvYmplY3Qgb2YgdmFsdWVzOiAnICsgdmFsdWVcbiAgKTtcbn1cblxuZnVuY3Rpb24gc2VxRnJvbVZhbHVlKHZhbHVlKSB7XG4gIHZhciBzZXEgPSBtYXliZUluZGV4ZWRTZXFGcm9tVmFsdWUodmFsdWUpO1xuICBpZiAoc2VxKSB7XG4gICAgcmV0dXJuIHNlcTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBuZXcgT2JqZWN0U2VxKHZhbHVlKTtcbiAgfVxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdFeHBlY3RlZCBBcnJheSBvciBjb2xsZWN0aW9uIG9iamVjdCBvZiB2YWx1ZXMsIG9yIGtleWVkIG9iamVjdDogJyArIHZhbHVlXG4gICk7XG59XG5cbmZ1bmN0aW9uIG1heWJlSW5kZXhlZFNlcUZyb21WYWx1ZSh2YWx1ZSkge1xuICByZXR1cm4gaXNBcnJheUxpa2UodmFsdWUpXG4gICAgPyBuZXcgQXJyYXlTZXEodmFsdWUpXG4gICAgOiBoYXNJdGVyYXRvcih2YWx1ZSlcbiAgICAgID8gbmV3IENvbGxlY3Rpb25TZXEodmFsdWUpXG4gICAgICA6IHVuZGVmaW5lZDtcbn1cblxudmFyIElTX01BUF9TWU1CT0wgPSAnQEBfX0lNTVVUQUJMRV9NQVBfX0BAJztcblxuZnVuY3Rpb24gaXNNYXAobWF5YmVNYXApIHtcbiAgcmV0dXJuIEJvb2xlYW4obWF5YmVNYXAgJiYgbWF5YmVNYXBbSVNfTUFQX1NZTUJPTF0pO1xufVxuXG5mdW5jdGlvbiBpc09yZGVyZWRNYXAobWF5YmVPcmRlcmVkTWFwKSB7XG4gIHJldHVybiBpc01hcChtYXliZU9yZGVyZWRNYXApICYmIGlzT3JkZXJlZChtYXliZU9yZGVyZWRNYXApO1xufVxuXG5mdW5jdGlvbiBpc1ZhbHVlT2JqZWN0KG1heWJlVmFsdWUpIHtcbiAgcmV0dXJuIEJvb2xlYW4oXG4gICAgbWF5YmVWYWx1ZSAmJlxuICAgICAgdHlwZW9mIG1heWJlVmFsdWUuZXF1YWxzID09PSAnZnVuY3Rpb24nICYmXG4gICAgICB0eXBlb2YgbWF5YmVWYWx1ZS5oYXNoQ29kZSA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufVxuXG4vKipcbiAqIEFuIGV4dGVuc2lvbiBvZiB0aGUgXCJzYW1lLXZhbHVlXCIgYWxnb3JpdGhtIGFzIFtkZXNjcmliZWQgZm9yIHVzZSBieSBFUzYgTWFwXG4gKiBhbmQgU2V0XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAjS2V5X2VxdWFsaXR5KVxuICpcbiAqIE5hTiBpcyBjb25zaWRlcmVkIHRoZSBzYW1lIGFzIE5hTiwgaG93ZXZlciAtMCBhbmQgMCBhcmUgY29uc2lkZXJlZCB0aGUgc2FtZVxuICogdmFsdWUsIHdoaWNoIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBhbGdvcml0aG0gZGVzY3JpYmVkIGJ5XG4gKiBbYE9iamVjdC5pc2BdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pcykuXG4gKlxuICogVGhpcyBpcyBleHRlbmRlZCBmdXJ0aGVyIHRvIGFsbG93IE9iamVjdHMgdG8gZGVzY3JpYmUgdGhlIHZhbHVlcyB0aGV5XG4gKiByZXByZXNlbnQsIGJ5IHdheSBvZiBgdmFsdWVPZmAgb3IgYGVxdWFsc2AgKGFuZCBgaGFzaENvZGVgKS5cbiAqXG4gKiBOb3RlOiBiZWNhdXNlIG9mIHRoaXMgZXh0ZW5zaW9uLCB0aGUga2V5IGVxdWFsaXR5IG9mIEltbXV0YWJsZS5NYXAgYW5kIHRoZVxuICogdmFsdWUgZXF1YWxpdHkgb2YgSW1tdXRhYmxlLlNldCB3aWxsIGRpZmZlciBmcm9tIEVTNiBNYXAgYW5kIFNldC5cbiAqXG4gKiAjIyMgRGVmaW5pbmcgY3VzdG9tIHZhbHVlc1xuICpcbiAqIFRoZSBlYXNpZXN0IHdheSB0byBkZXNjcmliZSB0aGUgdmFsdWUgYW4gb2JqZWN0IHJlcHJlc2VudHMgaXMgYnkgaW1wbGVtZW50aW5nXG4gKiBgdmFsdWVPZmAuIEZvciBleGFtcGxlLCBgRGF0ZWAgcmVwcmVzZW50cyBhIHZhbHVlIGJ5IHJldHVybmluZyBhIHVuaXhcbiAqIHRpbWVzdGFtcCBmb3IgYHZhbHVlT2ZgOlxuICpcbiAqICAgICB2YXIgZGF0ZTEgPSBuZXcgRGF0ZSgxMjM0NTY3ODkwMDAwKTsgLy8gRnJpIEZlYiAxMyAyMDA5IC4uLlxuICogICAgIHZhciBkYXRlMiA9IG5ldyBEYXRlKDEyMzQ1Njc4OTAwMDApO1xuICogICAgIGRhdGUxLnZhbHVlT2YoKTsgLy8gMTIzNDU2Nzg5MDAwMFxuICogICAgIGFzc2VydCggZGF0ZTEgIT09IGRhdGUyICk7XG4gKiAgICAgYXNzZXJ0KCBJbW11dGFibGUuaXMoIGRhdGUxLCBkYXRlMiApICk7XG4gKlxuICogTm90ZTogb3ZlcnJpZGluZyBgdmFsdWVPZmAgbWF5IGhhdmUgb3RoZXIgaW1wbGljYXRpb25zIGlmIHlvdSB1c2UgdGhpcyBvYmplY3RcbiAqIHdoZXJlIEphdmFTY3JpcHQgZXhwZWN0cyBhIHByaW1pdGl2ZSwgc3VjaCBhcyBpbXBsaWNpdCBzdHJpbmcgY29lcmNpb24uXG4gKlxuICogRm9yIG1vcmUgY29tcGxleCB0eXBlcywgZXNwZWNpYWxseSBjb2xsZWN0aW9ucywgaW1wbGVtZW50aW5nIGB2YWx1ZU9mYCBtYXlcbiAqIG5vdCBiZSBwZXJmb3JtYW50LiBBbiBhbHRlcm5hdGl2ZSBpcyB0byBpbXBsZW1lbnQgYGVxdWFsc2AgYW5kIGBoYXNoQ29kZWAuXG4gKlxuICogYGVxdWFsc2AgdGFrZXMgYW5vdGhlciBvYmplY3QsIHByZXN1bWFibHkgb2Ygc2ltaWxhciB0eXBlLCBhbmQgcmV0dXJucyB0cnVlXG4gKiBpZiBpdCBpcyBlcXVhbC4gRXF1YWxpdHkgaXMgc3ltbWV0cmljYWwsIHNvIHRoZSBzYW1lIHJlc3VsdCBzaG91bGQgYmVcbiAqIHJldHVybmVkIGlmIHRoaXMgYW5kIHRoZSBhcmd1bWVudCBhcmUgZmxpcHBlZC5cbiAqXG4gKiAgICAgYXNzZXJ0KCBhLmVxdWFscyhiKSA9PT0gYi5lcXVhbHMoYSkgKTtcbiAqXG4gKiBgaGFzaENvZGVgIHJldHVybnMgYSAzMmJpdCBpbnRlZ2VyIG51bWJlciByZXByZXNlbnRpbmcgdGhlIG9iamVjdCB3aGljaCB3aWxsXG4gKiBiZSB1c2VkIHRvIGRldGVybWluZSBob3cgdG8gc3RvcmUgdGhlIHZhbHVlIG9iamVjdCBpbiBhIE1hcCBvciBTZXQuIFlvdSBtdXN0XG4gKiBwcm92aWRlIGJvdGggb3IgbmVpdGhlciBtZXRob2RzLCBvbmUgbXVzdCBub3QgZXhpc3Qgd2l0aG91dCB0aGUgb3RoZXIuXG4gKlxuICogQWxzbywgYW4gaW1wb3J0YW50IHJlbGF0aW9uc2hpcCBiZXR3ZWVuIHRoZXNlIG1ldGhvZHMgbXVzdCBiZSB1cGhlbGQ6IGlmIHR3b1xuICogdmFsdWVzIGFyZSBlcXVhbCwgdGhleSAqbXVzdCogcmV0dXJuIHRoZSBzYW1lIGhhc2hDb2RlLiBJZiB0aGUgdmFsdWVzIGFyZSBub3RcbiAqIGVxdWFsLCB0aGV5IG1pZ2h0IGhhdmUgdGhlIHNhbWUgaGFzaENvZGU7IHRoaXMgaXMgY2FsbGVkIGEgaGFzaCBjb2xsaXNpb24sXG4gKiBhbmQgd2hpbGUgdW5kZXNpcmFibGUgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIGl0IGlzIGFjY2VwdGFibGUuXG4gKlxuICogICAgIGlmIChhLmVxdWFscyhiKSkge1xuICogICAgICAgYXNzZXJ0KCBhLmhhc2hDb2RlKCkgPT09IGIuaGFzaENvZGUoKSApO1xuICogICAgIH1cbiAqXG4gKiBBbGwgSW1tdXRhYmxlIGNvbGxlY3Rpb25zIGFyZSBWYWx1ZSBPYmplY3RzOiB0aGV5IGltcGxlbWVudCBgZXF1YWxzKClgXG4gKiBhbmQgYGhhc2hDb2RlKClgLlxuICovXG5mdW5jdGlvbiBpcyh2YWx1ZUEsIHZhbHVlQikge1xuICBpZiAodmFsdWVBID09PSB2YWx1ZUIgfHwgKHZhbHVlQSAhPT0gdmFsdWVBICYmIHZhbHVlQiAhPT0gdmFsdWVCKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICghdmFsdWVBIHx8ICF2YWx1ZUIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKFxuICAgIHR5cGVvZiB2YWx1ZUEudmFsdWVPZiA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIHR5cGVvZiB2YWx1ZUIudmFsdWVPZiA9PT0gJ2Z1bmN0aW9uJ1xuICApIHtcbiAgICB2YWx1ZUEgPSB2YWx1ZUEudmFsdWVPZigpO1xuICAgIHZhbHVlQiA9IHZhbHVlQi52YWx1ZU9mKCk7XG4gICAgaWYgKHZhbHVlQSA9PT0gdmFsdWVCIHx8ICh2YWx1ZUEgIT09IHZhbHVlQSAmJiB2YWx1ZUIgIT09IHZhbHVlQikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXZhbHVlQSB8fCAhdmFsdWVCKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiAhIShcbiAgICBpc1ZhbHVlT2JqZWN0KHZhbHVlQSkgJiZcbiAgICBpc1ZhbHVlT2JqZWN0KHZhbHVlQikgJiZcbiAgICB2YWx1ZUEuZXF1YWxzKHZhbHVlQilcbiAgKTtcbn1cblxudmFyIGltdWwgPVxuICB0eXBlb2YgTWF0aC5pbXVsID09PSAnZnVuY3Rpb24nICYmIE1hdGguaW11bCgweGZmZmZmZmZmLCAyKSA9PT0gLTJcbiAgICA/IE1hdGguaW11bFxuICAgIDogZnVuY3Rpb24gaW11bChhLCBiKSB7XG4gICAgICAgIGEgfD0gMDsgLy8gaW50XG4gICAgICAgIGIgfD0gMDsgLy8gaW50XG4gICAgICAgIHZhciBjID0gYSAmIDB4ZmZmZjtcbiAgICAgICAgdmFyIGQgPSBiICYgMHhmZmZmO1xuICAgICAgICAvLyBTaGlmdCBieSAwIGZpeGVzIHRoZSBzaWduIG9uIHRoZSBoaWdoIHBhcnQuXG4gICAgICAgIHJldHVybiAoYyAqIGQgKyAoKCgoYSA+Pj4gMTYpICogZCArIGMgKiAoYiA+Pj4gMTYpKSA8PCAxNikgPj4+IDApKSB8IDA7IC8vIGludFxuICAgICAgfTtcblxuLy8gdjggaGFzIGFuIG9wdGltaXphdGlvbiBmb3Igc3RvcmluZyAzMS1iaXQgc2lnbmVkIG51bWJlcnMuXG4vLyBWYWx1ZXMgd2hpY2ggaGF2ZSBlaXRoZXIgMDAgb3IgMTEgYXMgdGhlIGhpZ2ggb3JkZXIgYml0cyBxdWFsaWZ5LlxuLy8gVGhpcyBmdW5jdGlvbiBkcm9wcyB0aGUgaGlnaGVzdCBvcmRlciBiaXQgaW4gYSBzaWduZWQgbnVtYmVyLCBtYWludGFpbmluZ1xuLy8gdGhlIHNpZ24gYml0LlxuZnVuY3Rpb24gc21pKGkzMikge1xuICByZXR1cm4gKChpMzIgPj4+IDEpICYgMHg0MDAwMDAwMCkgfCAoaTMyICYgMHhiZmZmZmZmZik7XG59XG5cbnZhciBkZWZhdWx0VmFsdWVPZiA9IE9iamVjdC5wcm90b3R5cGUudmFsdWVPZjtcblxuZnVuY3Rpb24gaGFzaChvKSB7XG4gIHN3aXRjaCAodHlwZW9mIG8pIHtcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIC8vIFRoZSBoYXNoIHZhbHVlcyBmb3IgYnVpbHQtaW4gY29uc3RhbnRzIGFyZSBhIDEgdmFsdWUgZm9yIGVhY2ggNS1ieXRlXG4gICAgICAvLyBzaGlmdCByZWdpb24gZXhwZWN0IGZvciB0aGUgZmlyc3QsIHdoaWNoIGVuY29kZXMgdGhlIHZhbHVlLiBUaGlzXG4gICAgICAvLyByZWR1Y2VzIHRoZSBvZGRzIG9mIGEgaGFzaCBjb2xsaXNpb24gZm9yIHRoZXNlIGNvbW1vbiB2YWx1ZXMuXG4gICAgICByZXR1cm4gbyA/IDB4NDIxMDg0MjEgOiAweDQyMTA4NDIwO1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaGFzaE51bWJlcihvKTtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIG8ubGVuZ3RoID4gU1RSSU5HX0hBU0hfQ0FDSEVfTUlOX1NUUkxFTlxuICAgICAgICA/IGNhY2hlZEhhc2hTdHJpbmcobylcbiAgICAgICAgOiBoYXNoU3RyaW5nKG8pO1xuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgaWYgKG8gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIDB4NDIxMDg0MjI7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG8uaGFzaENvZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gRHJvcCBhbnkgaGlnaCBiaXRzIGZyb20gYWNjaWRlbnRhbGx5IGxvbmcgaGFzaCBjb2Rlcy5cbiAgICAgICAgcmV0dXJuIHNtaShvLmhhc2hDb2RlKG8pKTtcbiAgICAgIH1cbiAgICAgIGlmIChvLnZhbHVlT2YgIT09IGRlZmF1bHRWYWx1ZU9mICYmIHR5cGVvZiBvLnZhbHVlT2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbyA9IG8udmFsdWVPZihvKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXNoSlNPYmoobyk7XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgIHJldHVybiAweDQyMTA4NDIzO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAodHlwZW9mIG8udG9TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGhhc2hTdHJpbmcoby50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWUgdHlwZSAnICsgdHlwZW9mIG8gKyAnIGNhbm5vdCBiZSBoYXNoZWQuJyk7XG4gIH1cbn1cblxuLy8gQ29tcHJlc3MgYXJiaXRyYXJpbHkgbGFyZ2UgbnVtYmVycyBpbnRvIHNtaSBoYXNoZXMuXG5mdW5jdGlvbiBoYXNoTnVtYmVyKG4pIHtcbiAgaWYgKG4gIT09IG4gfHwgbiA9PT0gSW5maW5pdHkpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICB2YXIgaGFzaCA9IG4gfCAwO1xuICBpZiAoaGFzaCAhPT0gbikge1xuICAgIGhhc2ggXj0gbiAqIDB4ZmZmZmZmZmY7XG4gIH1cbiAgd2hpbGUgKG4gPiAweGZmZmZmZmZmKSB7XG4gICAgbiAvPSAweGZmZmZmZmZmO1xuICAgIGhhc2ggXj0gbjtcbiAgfVxuICByZXR1cm4gc21pKGhhc2gpO1xufVxuXG5mdW5jdGlvbiBjYWNoZWRIYXNoU3RyaW5nKHN0cmluZykge1xuICB2YXIgaGFzaGVkID0gc3RyaW5nSGFzaENhY2hlW3N0cmluZ107XG4gIGlmIChoYXNoZWQgPT09IHVuZGVmaW5lZCkge1xuICAgIGhhc2hlZCA9IGhhc2hTdHJpbmcoc3RyaW5nKTtcbiAgICBpZiAoU1RSSU5HX0hBU0hfQ0FDSEVfU0laRSA9PT0gU1RSSU5HX0hBU0hfQ0FDSEVfTUFYX1NJWkUpIHtcbiAgICAgIFNUUklOR19IQVNIX0NBQ0hFX1NJWkUgPSAwO1xuICAgICAgc3RyaW5nSGFzaENhY2hlID0ge307XG4gICAgfVxuICAgIFNUUklOR19IQVNIX0NBQ0hFX1NJWkUrKztcbiAgICBzdHJpbmdIYXNoQ2FjaGVbc3RyaW5nXSA9IGhhc2hlZDtcbiAgfVxuICByZXR1cm4gaGFzaGVkO1xufVxuXG4vLyBodHRwOi8vanNwZXJmLmNvbS9oYXNoaW5nLXN0cmluZ3NcbmZ1bmN0aW9uIGhhc2hTdHJpbmcoc3RyaW5nKSB7XG4gIC8vIFRoaXMgaXMgdGhlIGhhc2ggZnJvbSBKVk1cbiAgLy8gVGhlIGhhc2ggY29kZSBmb3IgYSBzdHJpbmcgaXMgY29tcHV0ZWQgYXNcbiAgLy8gc1swXSAqIDMxIF4gKG4gLSAxKSArIHNbMV0gKiAzMSBeIChuIC0gMikgKyAuLi4gKyBzW24gLSAxXSxcbiAgLy8gd2hlcmUgc1tpXSBpcyB0aGUgaXRoIGNoYXJhY3RlciBvZiB0aGUgc3RyaW5nIGFuZCBuIGlzIHRoZSBsZW5ndGggb2ZcbiAgLy8gdGhlIHN0cmluZy4gV2UgXCJtb2RcIiB0aGUgcmVzdWx0IHRvIG1ha2UgaXQgYmV0d2VlbiAwIChpbmNsdXNpdmUpIGFuZCAyXjMxXG4gIC8vIChleGNsdXNpdmUpIGJ5IGRyb3BwaW5nIGhpZ2ggYml0cy5cbiAgdmFyIGhhc2hlZCA9IDA7XG4gIGZvciAodmFyIGlpID0gMDsgaWkgPCBzdHJpbmcubGVuZ3RoOyBpaSsrKSB7XG4gICAgaGFzaGVkID0gKDMxICogaGFzaGVkICsgc3RyaW5nLmNoYXJDb2RlQXQoaWkpKSB8IDA7XG4gIH1cbiAgcmV0dXJuIHNtaShoYXNoZWQpO1xufVxuXG5mdW5jdGlvbiBoYXNoSlNPYmoob2JqKSB7XG4gIHZhciBoYXNoZWQ7XG4gIGlmICh1c2luZ1dlYWtNYXApIHtcbiAgICBoYXNoZWQgPSB3ZWFrTWFwLmdldChvYmopO1xuICAgIGlmIChoYXNoZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGhhc2hlZDtcbiAgICB9XG4gIH1cblxuICBoYXNoZWQgPSBvYmpbVUlEX0hBU0hfS0VZXTtcbiAgaWYgKGhhc2hlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGhhc2hlZDtcbiAgfVxuXG4gIGlmICghY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICBoYXNoZWQgPSBvYmoucHJvcGVydHlJc0VudW1lcmFibGUgJiYgb2JqLnByb3BlcnR5SXNFbnVtZXJhYmxlW1VJRF9IQVNIX0tFWV07XG4gICAgaWYgKGhhc2hlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gaGFzaGVkO1xuICAgIH1cblxuICAgIGhhc2hlZCA9IGdldElFTm9kZUhhc2gob2JqKTtcbiAgICBpZiAoaGFzaGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBoYXNoZWQ7XG4gICAgfVxuICB9XG5cbiAgaGFzaGVkID0gKytvYmpIYXNoVUlEO1xuICBpZiAob2JqSGFzaFVJRCAmIDB4NDAwMDAwMDApIHtcbiAgICBvYmpIYXNoVUlEID0gMDtcbiAgfVxuXG4gIGlmICh1c2luZ1dlYWtNYXApIHtcbiAgICB3ZWFrTWFwLnNldChvYmosIGhhc2hlZCk7XG4gIH0gZWxzZSBpZiAoaXNFeHRlbnNpYmxlICE9PSB1bmRlZmluZWQgJiYgaXNFeHRlbnNpYmxlKG9iaikgPT09IGZhbHNlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb24tZXh0ZW5zaWJsZSBvYmplY3RzIGFyZSBub3QgYWxsb3dlZCBhcyBrZXlzLicpO1xuICB9IGVsc2UgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgVUlEX0hBU0hfS0VZLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogaGFzaGVkLFxuICAgIH0pO1xuICB9IGVsc2UgaWYgKFxuICAgIG9iai5wcm9wZXJ0eUlzRW51bWVyYWJsZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgb2JqLnByb3BlcnR5SXNFbnVtZXJhYmxlID09PSBvYmouY29uc3RydWN0b3IucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlXG4gICkge1xuICAgIC8vIFNpbmNlIHdlIGNhbid0IGRlZmluZSBhIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5IG9uIHRoZSBvYmplY3RcbiAgICAvLyB3ZSdsbCBoaWphY2sgb25lIG9mIHRoZSBsZXNzLXVzZWQgbm9uLWVudW1lcmFibGUgcHJvcGVydGllcyB0b1xuICAgIC8vIHNhdmUgb3VyIGhhc2ggb24gaXQuIFNpbmNlIHRoaXMgaXMgYSBmdW5jdGlvbiBpdCB3aWxsIG5vdCBzaG93IHVwIGluXG4gICAgLy8gYEpTT04uc3RyaW5naWZ5YCB3aGljaCBpcyB3aGF0IHdlIHdhbnQuXG4gICAgb2JqLnByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuYXBwbHkoXG4gICAgICAgIHRoaXMsXG4gICAgICAgIGFyZ3VtZW50c1xuICAgICAgKTtcbiAgICB9O1xuICAgIG9iai5wcm9wZXJ0eUlzRW51bWVyYWJsZVtVSURfSEFTSF9LRVldID0gaGFzaGVkO1xuICB9IGVsc2UgaWYgKG9iai5ub2RlVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gQXQgdGhpcyBwb2ludCB3ZSBjb3VsZG4ndCBnZXQgdGhlIElFIGB1bmlxdWVJRGAgdG8gdXNlIGFzIGEgaGFzaFxuICAgIC8vIGFuZCB3ZSBjb3VsZG4ndCB1c2UgYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSB0byBleHBsb2l0IHRoZVxuICAgIC8vIGRvbnRFbnVtIGJ1ZyBzbyB3ZSBzaW1wbHkgYWRkIHRoZSBgVUlEX0hBU0hfS0VZYCBvbiB0aGUgbm9kZVxuICAgIC8vIGl0c2VsZi5cbiAgICBvYmpbVUlEX0hBU0hfS0VZXSA9IGhhc2hlZDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBzZXQgYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSBvbiBvYmplY3QuJyk7XG4gIH1cblxuICByZXR1cm4gaGFzaGVkO1xufVxuXG4vLyBHZXQgcmVmZXJlbmNlcyB0byBFUzUgb2JqZWN0IG1ldGhvZHMuXG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZTtcblxuLy8gVHJ1ZSBpZiBPYmplY3QuZGVmaW5lUHJvcGVydHkgd29ya3MgYXMgZXhwZWN0ZWQuIElFOCBmYWlscyB0aGlzIHRlc3QuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnQCcsIHt9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSkoKTtcblxuLy8gSUUgaGFzIGEgYHVuaXF1ZUlEYCBwcm9wZXJ0eSBvbiBET00gbm9kZXMuIFdlIGNhbiBjb25zdHJ1Y3QgdGhlIGhhc2ggZnJvbSBpdFxuLy8gYW5kIGF2b2lkIG1lbW9yeSBsZWFrcyBmcm9tIHRoZSBJRSBjbG9uZU5vZGUgYnVnLlxuZnVuY3Rpb24gZ2V0SUVOb2RlSGFzaChub2RlKSB7XG4gIGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUgPiAwKSB7XG4gICAgc3dpdGNoIChub2RlLm5vZGVUeXBlKSB7XG4gICAgICBjYXNlIDE6IC8vIEVsZW1lbnRcbiAgICAgICAgcmV0dXJuIG5vZGUudW5pcXVlSUQ7XG4gICAgICBjYXNlIDk6IC8vIERvY3VtZW50XG4gICAgICAgIHJldHVybiBub2RlLmRvY3VtZW50RWxlbWVudCAmJiBub2RlLmRvY3VtZW50RWxlbWVudC51bmlxdWVJRDtcbiAgICB9XG4gIH1cbn1cblxuLy8gSWYgcG9zc2libGUsIHVzZSBhIFdlYWtNYXAuXG52YXIgdXNpbmdXZWFrTWFwID0gdHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbic7XG52YXIgd2Vha01hcDtcbmlmICh1c2luZ1dlYWtNYXApIHtcbiAgd2Vha01hcCA9IG5ldyBXZWFrTWFwKCk7XG59XG5cbnZhciBvYmpIYXNoVUlEID0gMDtcblxudmFyIFVJRF9IQVNIX0tFWSA9ICdfX2ltbXV0YWJsZWhhc2hfXyc7XG5pZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuICBVSURfSEFTSF9LRVkgPSBTeW1ib2woVUlEX0hBU0hfS0VZKTtcbn1cblxudmFyIFNUUklOR19IQVNIX0NBQ0hFX01JTl9TVFJMRU4gPSAxNjtcbnZhciBTVFJJTkdfSEFTSF9DQUNIRV9NQVhfU0laRSA9IDI1NTtcbnZhciBTVFJJTkdfSEFTSF9DQUNIRV9TSVpFID0gMDtcbnZhciBzdHJpbmdIYXNoQ2FjaGUgPSB7fTtcblxudmFyIFRvS2V5ZWRTZXF1ZW5jZSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEtleWVkU2VxJCQxKSB7XG4gIGZ1bmN0aW9uIFRvS2V5ZWRTZXF1ZW5jZShpbmRleGVkLCB1c2VLZXlzKSB7XG4gICAgdGhpcy5faXRlciA9IGluZGV4ZWQ7XG4gICAgdGhpcy5fdXNlS2V5cyA9IHVzZUtleXM7XG4gICAgdGhpcy5zaXplID0gaW5kZXhlZC5zaXplO1xuICB9XG5cbiAgaWYgKCBLZXllZFNlcSQkMSApIFRvS2V5ZWRTZXF1ZW5jZS5fX3Byb3RvX18gPSBLZXllZFNlcSQkMTtcbiAgVG9LZXllZFNlcXVlbmNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEtleWVkU2VxJCQxICYmIEtleWVkU2VxJCQxLnByb3RvdHlwZSApO1xuICBUb0tleWVkU2VxdWVuY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVG9LZXllZFNlcXVlbmNlO1xuXG4gIFRvS2V5ZWRTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChrZXksIG5vdFNldFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIuZ2V0KGtleSwgbm90U2V0VmFsdWUpO1xuICB9O1xuXG4gIFRvS2V5ZWRTZXF1ZW5jZS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gaGFzIChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlci5oYXMoa2V5KTtcbiAgfTtcblxuICBUb0tleWVkU2VxdWVuY2UucHJvdG90eXBlLnZhbHVlU2VxID0gZnVuY3Rpb24gdmFsdWVTZXEgKCkge1xuICAgIHJldHVybiB0aGlzLl9pdGVyLnZhbHVlU2VxKCk7XG4gIH07XG5cbiAgVG9LZXllZFNlcXVlbmNlLnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gcmV2ZXJzZSAoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgcmV2ZXJzZWRTZXF1ZW5jZSA9IHJldmVyc2VGYWN0b3J5KHRoaXMsIHRydWUpO1xuICAgIGlmICghdGhpcy5fdXNlS2V5cykge1xuICAgICAgcmV2ZXJzZWRTZXF1ZW5jZS52YWx1ZVNlcSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5faXRlci50b1NlcSgpLnJldmVyc2UoKTsgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJldmVyc2VkU2VxdWVuY2U7XG4gIH07XG5cbiAgVG9LZXllZFNlcXVlbmNlLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiBtYXAgKG1hcHBlciwgY29udGV4dCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIG1hcHBlZFNlcXVlbmNlID0gbWFwRmFjdG9yeSh0aGlzLCBtYXBwZXIsIGNvbnRleHQpO1xuICAgIGlmICghdGhpcy5fdXNlS2V5cykge1xuICAgICAgbWFwcGVkU2VxdWVuY2UudmFsdWVTZXEgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuX2l0ZXIudG9TZXEoKS5tYXAobWFwcGVyLCBjb250ZXh0KTsgfTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcHBlZFNlcXVlbmNlO1xuICB9O1xuXG4gIFRvS2V5ZWRTZXF1ZW5jZS5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIuX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBmbih2LCBrLCB0aGlzJDEpOyB9LCByZXZlcnNlKTtcbiAgfTtcblxuICBUb0tleWVkU2VxdWVuY2UucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIuX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgfTtcblxuICByZXR1cm4gVG9LZXllZFNlcXVlbmNlO1xufShLZXllZFNlcSkpO1xuVG9LZXllZFNlcXVlbmNlLnByb3RvdHlwZVtJU19PUkRFUkVEX1NZTUJPTF0gPSB0cnVlO1xuXG52YXIgVG9JbmRleGVkU2VxdWVuY2UgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChJbmRleGVkU2VxJCQxKSB7XG4gIGZ1bmN0aW9uIFRvSW5kZXhlZFNlcXVlbmNlKGl0ZXIpIHtcbiAgICB0aGlzLl9pdGVyID0gaXRlcjtcbiAgICB0aGlzLnNpemUgPSBpdGVyLnNpemU7XG4gIH1cblxuICBpZiAoIEluZGV4ZWRTZXEkJDEgKSBUb0luZGV4ZWRTZXF1ZW5jZS5fX3Byb3RvX18gPSBJbmRleGVkU2VxJCQxO1xuICBUb0luZGV4ZWRTZXF1ZW5jZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBJbmRleGVkU2VxJCQxICYmIEluZGV4ZWRTZXEkJDEucHJvdG90eXBlICk7XG4gIFRvSW5kZXhlZFNlcXVlbmNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRvSW5kZXhlZFNlcXVlbmNlO1xuXG4gIFRvSW5kZXhlZFNlcXVlbmNlLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9pdGVyLmluY2x1ZGVzKHZhbHVlKTtcbiAgfTtcblxuICBUb0luZGV4ZWRTZXF1ZW5jZS5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIGkgPSAwO1xuICAgIHJldmVyc2UgJiYgZW5zdXJlU2l6ZSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5faXRlci5fX2l0ZXJhdGUoXG4gICAgICBmdW5jdGlvbiAodikgeyByZXR1cm4gZm4odiwgcmV2ZXJzZSA/IHRoaXMkMS5zaXplIC0gKytpIDogaSsrLCB0aGlzJDEpOyB9LFxuICAgICAgcmV2ZXJzZVxuICAgICk7XG4gIH07XG5cbiAgVG9JbmRleGVkU2VxdWVuY2UucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgaXRlcmF0b3IgPSB0aGlzLl9pdGVyLl9faXRlcmF0b3IoSVRFUkFURV9WQUxVRVMsIHJldmVyc2UpO1xuICAgIHZhciBpID0gMDtcbiAgICByZXZlcnNlICYmIGVuc3VyZVNpemUodGhpcyk7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIHJldHVybiBzdGVwLmRvbmVcbiAgICAgICAgPyBzdGVwXG4gICAgICAgIDogaXRlcmF0b3JWYWx1ZShcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICByZXZlcnNlID8gdGhpcyQxLnNpemUgLSArK2kgOiBpKyssXG4gICAgICAgICAgICBzdGVwLnZhbHVlLFxuICAgICAgICAgICAgc3RlcFxuICAgICAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFRvSW5kZXhlZFNlcXVlbmNlO1xufShJbmRleGVkU2VxKSk7XG5cbnZhciBUb1NldFNlcXVlbmNlID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoU2V0U2VxJCQxKSB7XG4gIGZ1bmN0aW9uIFRvU2V0U2VxdWVuY2UoaXRlcikge1xuICAgIHRoaXMuX2l0ZXIgPSBpdGVyO1xuICAgIHRoaXMuc2l6ZSA9IGl0ZXIuc2l6ZTtcbiAgfVxuXG4gIGlmICggU2V0U2VxJCQxICkgVG9TZXRTZXF1ZW5jZS5fX3Byb3RvX18gPSBTZXRTZXEkJDE7XG4gIFRvU2V0U2VxdWVuY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggU2V0U2VxJCQxICYmIFNldFNlcSQkMS5wcm90b3R5cGUgKTtcbiAgVG9TZXRTZXF1ZW5jZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUb1NldFNlcXVlbmNlO1xuXG4gIFRvU2V0U2VxdWVuY2UucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIGhhcyAoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIuaW5jbHVkZXMoa2V5KTtcbiAgfTtcblxuICBUb1NldFNlcXVlbmNlLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcy5faXRlci5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIGZuKHYsIHYsIHRoaXMkMSk7IH0sIHJldmVyc2UpO1xuICB9O1xuXG4gIFRvU2V0U2VxdWVuY2UucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0gdGhpcy5faXRlci5fX2l0ZXJhdG9yKElURVJBVEVfVkFMVUVTLCByZXZlcnNlKTtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgcmV0dXJuIHN0ZXAuZG9uZVxuICAgICAgICA/IHN0ZXBcbiAgICAgICAgOiBpdGVyYXRvclZhbHVlKHR5cGUsIHN0ZXAudmFsdWUsIHN0ZXAudmFsdWUsIHN0ZXApO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBUb1NldFNlcXVlbmNlO1xufShTZXRTZXEpKTtcblxudmFyIEZyb21FbnRyaWVzU2VxdWVuY2UgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChLZXllZFNlcSQkMSkge1xuICBmdW5jdGlvbiBGcm9tRW50cmllc1NlcXVlbmNlKGVudHJpZXMpIHtcbiAgICB0aGlzLl9pdGVyID0gZW50cmllcztcbiAgICB0aGlzLnNpemUgPSBlbnRyaWVzLnNpemU7XG4gIH1cblxuICBpZiAoIEtleWVkU2VxJCQxICkgRnJvbUVudHJpZXNTZXF1ZW5jZS5fX3Byb3RvX18gPSBLZXllZFNlcSQkMTtcbiAgRnJvbUVudHJpZXNTZXF1ZW5jZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBLZXllZFNlcSQkMSAmJiBLZXllZFNlcSQkMS5wcm90b3R5cGUgKTtcbiAgRnJvbUVudHJpZXNTZXF1ZW5jZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGcm9tRW50cmllc1NlcXVlbmNlO1xuXG4gIEZyb21FbnRyaWVzU2VxdWVuY2UucHJvdG90eXBlLmVudHJ5U2VxID0gZnVuY3Rpb24gZW50cnlTZXEgKCkge1xuICAgIHJldHVybiB0aGlzLl9pdGVyLnRvU2VxKCk7XG4gIH07XG5cbiAgRnJvbUVudHJpZXNTZXF1ZW5jZS5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIuX19pdGVyYXRlKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgLy8gQ2hlY2sgaWYgZW50cnkgZXhpc3RzIGZpcnN0IHNvIGFycmF5IGFjY2VzcyBkb2Vzbid0IHRocm93IGZvciBob2xlc1xuICAgICAgLy8gaW4gdGhlIHBhcmVudCBpdGVyYXRpb24uXG4gICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgdmFsaWRhdGVFbnRyeShlbnRyeSk7XG4gICAgICAgIHZhciBpbmRleGVkQ29sbGVjdGlvbiA9IGlzQ29sbGVjdGlvbihlbnRyeSk7XG4gICAgICAgIHJldHVybiBmbihcbiAgICAgICAgICBpbmRleGVkQ29sbGVjdGlvbiA/IGVudHJ5LmdldCgxKSA6IGVudHJ5WzFdLFxuICAgICAgICAgIGluZGV4ZWRDb2xsZWN0aW9uID8gZW50cnkuZ2V0KDApIDogZW50cnlbMF0sXG4gICAgICAgICAgdGhpcyQxXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSwgcmV2ZXJzZSk7XG4gIH07XG5cbiAgRnJvbUVudHJpZXNTZXF1ZW5jZS5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB0aGlzLl9pdGVyLl9faXRlcmF0b3IoSVRFUkFURV9WQUxVRVMsIHJldmVyc2UpO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIGlmIChzdGVwLmRvbmUpIHtcbiAgICAgICAgICByZXR1cm4gc3RlcDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAvLyBDaGVjayBpZiBlbnRyeSBleGlzdHMgZmlyc3Qgc28gYXJyYXkgYWNjZXNzIGRvZXNuJ3QgdGhyb3cgZm9yIGhvbGVzXG4gICAgICAgIC8vIGluIHRoZSBwYXJlbnQgaXRlcmF0aW9uLlxuICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICB2YWxpZGF0ZUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB2YXIgaW5kZXhlZENvbGxlY3Rpb24gPSBpc0NvbGxlY3Rpb24oZW50cnkpO1xuICAgICAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIGluZGV4ZWRDb2xsZWN0aW9uID8gZW50cnkuZ2V0KDApIDogZW50cnlbMF0sXG4gICAgICAgICAgICBpbmRleGVkQ29sbGVjdGlvbiA/IGVudHJ5LmdldCgxKSA6IGVudHJ5WzFdLFxuICAgICAgICAgICAgc3RlcFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gRnJvbUVudHJpZXNTZXF1ZW5jZTtcbn0oS2V5ZWRTZXEpKTtcblxuVG9JbmRleGVkU2VxdWVuY2UucHJvdG90eXBlLmNhY2hlUmVzdWx0ID0gVG9LZXllZFNlcXVlbmNlLnByb3RvdHlwZS5jYWNoZVJlc3VsdCA9IFRvU2V0U2VxdWVuY2UucHJvdG90eXBlLmNhY2hlUmVzdWx0ID0gRnJvbUVudHJpZXNTZXF1ZW5jZS5wcm90b3R5cGUuY2FjaGVSZXN1bHQgPSBjYWNoZVJlc3VsdFRocm91Z2g7XG5cbmZ1bmN0aW9uIGZsaXBGYWN0b3J5KGNvbGxlY3Rpb24pIHtcbiAgdmFyIGZsaXBTZXF1ZW5jZSA9IG1ha2VTZXF1ZW5jZShjb2xsZWN0aW9uKTtcbiAgZmxpcFNlcXVlbmNlLl9pdGVyID0gY29sbGVjdGlvbjtcbiAgZmxpcFNlcXVlbmNlLnNpemUgPSBjb2xsZWN0aW9uLnNpemU7XG4gIGZsaXBTZXF1ZW5jZS5mbGlwID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY29sbGVjdGlvbjsgfTtcbiAgZmxpcFNlcXVlbmNlLnJldmVyc2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmV2ZXJzZWRTZXF1ZW5jZSA9IGNvbGxlY3Rpb24ucmV2ZXJzZS5hcHBseSh0aGlzKTsgLy8gc3VwZXIucmV2ZXJzZSgpXG4gICAgcmV2ZXJzZWRTZXF1ZW5jZS5mbGlwID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY29sbGVjdGlvbi5yZXZlcnNlKCk7IH07XG4gICAgcmV0dXJuIHJldmVyc2VkU2VxdWVuY2U7XG4gIH07XG4gIGZsaXBTZXF1ZW5jZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBjb2xsZWN0aW9uLmluY2x1ZGVzKGtleSk7IH07XG4gIGZsaXBTZXF1ZW5jZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGNvbGxlY3Rpb24uaGFzKGtleSk7IH07XG4gIGZsaXBTZXF1ZW5jZS5jYWNoZVJlc3VsdCA9IGNhY2hlUmVzdWx0VGhyb3VnaDtcbiAgZmxpcFNlcXVlbmNlLl9faXRlcmF0ZVVuY2FjaGVkID0gZnVuY3Rpb24oZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHJldHVybiBjb2xsZWN0aW9uLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaykgeyByZXR1cm4gZm4oaywgdiwgdGhpcyQxKSAhPT0gZmFsc2U7IH0sIHJldmVyc2UpO1xuICB9O1xuICBmbGlwU2VxdWVuY2UuX19pdGVyYXRvclVuY2FjaGVkID0gZnVuY3Rpb24odHlwZSwgcmV2ZXJzZSkge1xuICAgIGlmICh0eXBlID09PSBJVEVSQVRFX0VOVFJJRVMpIHtcbiAgICAgIHZhciBpdGVyYXRvciA9IGNvbGxlY3Rpb24uX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgaWYgKCFzdGVwLmRvbmUpIHtcbiAgICAgICAgICB2YXIgayA9IHN0ZXAudmFsdWVbMF07XG4gICAgICAgICAgc3RlcC52YWx1ZVswXSA9IHN0ZXAudmFsdWVbMV07XG4gICAgICAgICAgc3RlcC52YWx1ZVsxXSA9IGs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0ZXA7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uX19pdGVyYXRvcihcbiAgICAgIHR5cGUgPT09IElURVJBVEVfVkFMVUVTID8gSVRFUkFURV9LRVlTIDogSVRFUkFURV9WQUxVRVMsXG4gICAgICByZXZlcnNlXG4gICAgKTtcbiAgfTtcbiAgcmV0dXJuIGZsaXBTZXF1ZW5jZTtcbn1cblxuZnVuY3Rpb24gbWFwRmFjdG9yeShjb2xsZWN0aW9uLCBtYXBwZXIsIGNvbnRleHQpIHtcbiAgdmFyIG1hcHBlZFNlcXVlbmNlID0gbWFrZVNlcXVlbmNlKGNvbGxlY3Rpb24pO1xuICBtYXBwZWRTZXF1ZW5jZS5zaXplID0gY29sbGVjdGlvbi5zaXplO1xuICBtYXBwZWRTZXF1ZW5jZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBjb2xsZWN0aW9uLmhhcyhrZXkpOyB9O1xuICBtYXBwZWRTZXF1ZW5jZS5nZXQgPSBmdW5jdGlvbiAoa2V5LCBub3RTZXRWYWx1ZSkge1xuICAgIHZhciB2ID0gY29sbGVjdGlvbi5nZXQoa2V5LCBOT1RfU0VUKTtcbiAgICByZXR1cm4gdiA9PT0gTk9UX1NFVFxuICAgICAgPyBub3RTZXRWYWx1ZVxuICAgICAgOiBtYXBwZXIuY2FsbChjb250ZXh0LCB2LCBrZXksIGNvbGxlY3Rpb24pO1xuICB9O1xuICBtYXBwZWRTZXF1ZW5jZS5fX2l0ZXJhdGVVbmNhY2hlZCA9IGZ1bmN0aW9uKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByZXR1cm4gY29sbGVjdGlvbi5fX2l0ZXJhdGUoXG4gICAgICBmdW5jdGlvbiAodiwgaywgYykgeyByZXR1cm4gZm4obWFwcGVyLmNhbGwoY29udGV4dCwgdiwgaywgYyksIGssIHRoaXMkMSkgIT09IGZhbHNlOyB9LFxuICAgICAgcmV2ZXJzZVxuICAgICk7XG4gIH07XG4gIG1hcHBlZFNlcXVlbmNlLl9faXRlcmF0b3JVbmNhY2hlZCA9IGZ1bmN0aW9uKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSBjb2xsZWN0aW9uLl9faXRlcmF0b3IoSVRFUkFURV9FTlRSSUVTLCByZXZlcnNlKTtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgaWYgKHN0ZXAuZG9uZSkge1xuICAgICAgICByZXR1cm4gc3RlcDtcbiAgICAgIH1cbiAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICB2YXIga2V5ID0gZW50cnlbMF07XG4gICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZShcbiAgICAgICAgdHlwZSxcbiAgICAgICAga2V5LFxuICAgICAgICBtYXBwZXIuY2FsbChjb250ZXh0LCBlbnRyeVsxXSwga2V5LCBjb2xsZWN0aW9uKSxcbiAgICAgICAgc3RlcFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIG1hcHBlZFNlcXVlbmNlO1xufVxuXG5mdW5jdGlvbiByZXZlcnNlRmFjdG9yeShjb2xsZWN0aW9uLCB1c2VLZXlzKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHZhciByZXZlcnNlZFNlcXVlbmNlID0gbWFrZVNlcXVlbmNlKGNvbGxlY3Rpb24pO1xuICByZXZlcnNlZFNlcXVlbmNlLl9pdGVyID0gY29sbGVjdGlvbjtcbiAgcmV2ZXJzZWRTZXF1ZW5jZS5zaXplID0gY29sbGVjdGlvbi5zaXplO1xuICByZXZlcnNlZFNlcXVlbmNlLnJldmVyc2UgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2xsZWN0aW9uOyB9O1xuICBpZiAoY29sbGVjdGlvbi5mbGlwKSB7XG4gICAgcmV2ZXJzZWRTZXF1ZW5jZS5mbGlwID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZmxpcFNlcXVlbmNlID0gZmxpcEZhY3RvcnkoY29sbGVjdGlvbik7XG4gICAgICBmbGlwU2VxdWVuY2UucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbGxlY3Rpb24uZmxpcCgpOyB9O1xuICAgICAgcmV0dXJuIGZsaXBTZXF1ZW5jZTtcbiAgICB9O1xuICB9XG4gIHJldmVyc2VkU2VxdWVuY2UuZ2V0ID0gZnVuY3Rpb24gKGtleSwgbm90U2V0VmFsdWUpIHsgcmV0dXJuIGNvbGxlY3Rpb24uZ2V0KHVzZUtleXMgPyBrZXkgOiAtMSAtIGtleSwgbm90U2V0VmFsdWUpOyB9O1xuICByZXZlcnNlZFNlcXVlbmNlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGNvbGxlY3Rpb24uaGFzKHVzZUtleXMgPyBrZXkgOiAtMSAtIGtleSk7IH07XG4gIHJldmVyc2VkU2VxdWVuY2UuaW5jbHVkZXMgPSBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGNvbGxlY3Rpb24uaW5jbHVkZXModmFsdWUpOyB9O1xuICByZXZlcnNlZFNlcXVlbmNlLmNhY2hlUmVzdWx0ID0gY2FjaGVSZXN1bHRUaHJvdWdoO1xuICByZXZlcnNlZFNlcXVlbmNlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgaSA9IDA7XG4gICAgcmV2ZXJzZSAmJiBlbnN1cmVTaXplKGNvbGxlY3Rpb24pO1xuICAgIHJldHVybiBjb2xsZWN0aW9uLl9faXRlcmF0ZShcbiAgICAgIGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBmbih2LCB1c2VLZXlzID8gayA6IHJldmVyc2UgPyB0aGlzJDEuc2l6ZSAtICsraSA6IGkrKywgdGhpcyQxKTsgfSxcbiAgICAgICFyZXZlcnNlXG4gICAgKTtcbiAgfTtcbiAgcmV2ZXJzZWRTZXF1ZW5jZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgcmV2ZXJzZSAmJiBlbnN1cmVTaXplKGNvbGxlY3Rpb24pO1xuICAgIHZhciBpdGVyYXRvciA9IGNvbGxlY3Rpb24uX19pdGVyYXRvcihJVEVSQVRFX0VOVFJJRVMsICFyZXZlcnNlKTtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgaWYgKHN0ZXAuZG9uZSkge1xuICAgICAgICByZXR1cm4gc3RlcDtcbiAgICAgIH1cbiAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZShcbiAgICAgICAgdHlwZSxcbiAgICAgICAgdXNlS2V5cyA/IGVudHJ5WzBdIDogcmV2ZXJzZSA/IHRoaXMkMS5zaXplIC0gKytpIDogaSsrLFxuICAgICAgICBlbnRyeVsxXSxcbiAgICAgICAgc3RlcFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIHJldmVyc2VkU2VxdWVuY2U7XG59XG5cbmZ1bmN0aW9uIGZpbHRlckZhY3RvcnkoY29sbGVjdGlvbiwgcHJlZGljYXRlLCBjb250ZXh0LCB1c2VLZXlzKSB7XG4gIHZhciBmaWx0ZXJTZXF1ZW5jZSA9IG1ha2VTZXF1ZW5jZShjb2xsZWN0aW9uKTtcbiAgaWYgKHVzZUtleXMpIHtcbiAgICBmaWx0ZXJTZXF1ZW5jZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgdiA9IGNvbGxlY3Rpb24uZ2V0KGtleSwgTk9UX1NFVCk7XG4gICAgICByZXR1cm4gdiAhPT0gTk9UX1NFVCAmJiAhIXByZWRpY2F0ZS5jYWxsKGNvbnRleHQsIHYsIGtleSwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBmaWx0ZXJTZXF1ZW5jZS5nZXQgPSBmdW5jdGlvbiAoa2V5LCBub3RTZXRWYWx1ZSkge1xuICAgICAgdmFyIHYgPSBjb2xsZWN0aW9uLmdldChrZXksIE5PVF9TRVQpO1xuICAgICAgcmV0dXJuIHYgIT09IE5PVF9TRVQgJiYgcHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwga2V5LCBjb2xsZWN0aW9uKVxuICAgICAgICA/IHZcbiAgICAgICAgOiBub3RTZXRWYWx1ZTtcbiAgICB9O1xuICB9XG4gIGZpbHRlclNlcXVlbmNlLl9faXRlcmF0ZVVuY2FjaGVkID0gZnVuY3Rpb24oZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICBjb2xsZWN0aW9uLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaywgYykge1xuICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKGNvbnRleHQsIHYsIGssIGMpKSB7XG4gICAgICAgIGl0ZXJhdGlvbnMrKztcbiAgICAgICAgcmV0dXJuIGZuKHYsIHVzZUtleXMgPyBrIDogaXRlcmF0aW9ucyAtIDEsIHRoaXMkMSk7XG4gICAgICB9XG4gICAgfSwgcmV2ZXJzZSk7XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG4gIGZpbHRlclNlcXVlbmNlLl9faXRlcmF0b3JVbmNhY2hlZCA9IGZ1bmN0aW9uKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSBjb2xsZWN0aW9uLl9faXRlcmF0b3IoSVRFUkFURV9FTlRSSUVTLCByZXZlcnNlKTtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgaWYgKHN0ZXAuZG9uZSkge1xuICAgICAgICAgIHJldHVybiBzdGVwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgIHZhciBrZXkgPSBlbnRyeVswXTtcbiAgICAgICAgdmFyIHZhbHVlID0gZW50cnlbMV07XG4gICAgICAgIGlmIChwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSkge1xuICAgICAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKHR5cGUsIHVzZUtleXMgPyBrZXkgOiBpdGVyYXRpb25zKyssIHZhbHVlLCBzdGVwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICByZXR1cm4gZmlsdGVyU2VxdWVuY2U7XG59XG5cbmZ1bmN0aW9uIGNvdW50QnlGYWN0b3J5KGNvbGxlY3Rpb24sIGdyb3VwZXIsIGNvbnRleHQpIHtcbiAgdmFyIGdyb3VwcyA9IE1hcCgpLmFzTXV0YWJsZSgpO1xuICBjb2xsZWN0aW9uLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaykge1xuICAgIGdyb3Vwcy51cGRhdGUoZ3JvdXBlci5jYWxsKGNvbnRleHQsIHYsIGssIGNvbGxlY3Rpb24pLCAwLCBmdW5jdGlvbiAoYSkgeyByZXR1cm4gYSArIDE7IH0pO1xuICB9KTtcbiAgcmV0dXJuIGdyb3Vwcy5hc0ltbXV0YWJsZSgpO1xufVxuXG5mdW5jdGlvbiBncm91cEJ5RmFjdG9yeShjb2xsZWN0aW9uLCBncm91cGVyLCBjb250ZXh0KSB7XG4gIHZhciBpc0tleWVkSXRlciA9IGlzS2V5ZWQoY29sbGVjdGlvbik7XG4gIHZhciBncm91cHMgPSAoaXNPcmRlcmVkKGNvbGxlY3Rpb24pID8gT3JkZXJlZE1hcCgpIDogTWFwKCkpLmFzTXV0YWJsZSgpO1xuICBjb2xsZWN0aW9uLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaykge1xuICAgIGdyb3Vwcy51cGRhdGUoXG4gICAgICBncm91cGVyLmNhbGwoY29udGV4dCwgdiwgaywgY29sbGVjdGlvbiksXG4gICAgICBmdW5jdGlvbiAoYSkgeyByZXR1cm4gKChhID0gYSB8fCBbXSksIGEucHVzaChpc0tleWVkSXRlciA/IFtrLCB2XSA6IHYpLCBhKTsgfVxuICAgICk7XG4gIH0pO1xuICB2YXIgY29lcmNlID0gY29sbGVjdGlvbkNsYXNzKGNvbGxlY3Rpb24pO1xuICByZXR1cm4gZ3JvdXBzLm1hcChmdW5jdGlvbiAoYXJyKSB7IHJldHVybiByZWlmeShjb2xsZWN0aW9uLCBjb2VyY2UoYXJyKSk7IH0pLmFzSW1tdXRhYmxlKCk7XG59XG5cbmZ1bmN0aW9uIHNsaWNlRmFjdG9yeShjb2xsZWN0aW9uLCBiZWdpbiwgZW5kLCB1c2VLZXlzKSB7XG4gIHZhciBvcmlnaW5hbFNpemUgPSBjb2xsZWN0aW9uLnNpemU7XG5cbiAgaWYgKHdob2xlU2xpY2UoYmVnaW4sIGVuZCwgb3JpZ2luYWxTaXplKSkge1xuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9XG5cbiAgdmFyIHJlc29sdmVkQmVnaW4gPSByZXNvbHZlQmVnaW4oYmVnaW4sIG9yaWdpbmFsU2l6ZSk7XG4gIHZhciByZXNvbHZlZEVuZCA9IHJlc29sdmVFbmQoZW5kLCBvcmlnaW5hbFNpemUpO1xuXG4gIC8vIGJlZ2luIG9yIGVuZCB3aWxsIGJlIE5hTiBpZiB0aGV5IHdlcmUgcHJvdmlkZWQgYXMgbmVnYXRpdmUgbnVtYmVycyBhbmRcbiAgLy8gdGhpcyBjb2xsZWN0aW9uJ3Mgc2l6ZSBpcyB1bmtub3duLiBJbiB0aGF0IGNhc2UsIGNhY2hlIGZpcnN0IHNvIHRoZXJlIGlzXG4gIC8vIGEga25vd24gc2l6ZSBhbmQgdGhlc2UgZG8gbm90IHJlc29sdmUgdG8gTmFOLlxuICBpZiAocmVzb2x2ZWRCZWdpbiAhPT0gcmVzb2x2ZWRCZWdpbiB8fCByZXNvbHZlZEVuZCAhPT0gcmVzb2x2ZWRFbmQpIHtcbiAgICByZXR1cm4gc2xpY2VGYWN0b3J5KGNvbGxlY3Rpb24udG9TZXEoKS5jYWNoZVJlc3VsdCgpLCBiZWdpbiwgZW5kLCB1c2VLZXlzKTtcbiAgfVxuXG4gIC8vIE5vdGU6IHJlc29sdmVkRW5kIGlzIHVuZGVmaW5lZCB3aGVuIHRoZSBvcmlnaW5hbCBzZXF1ZW5jZSdzIGxlbmd0aCBpc1xuICAvLyB1bmtub3duIGFuZCB0aGlzIHNsaWNlIGRpZCBub3Qgc3VwcGx5IGFuIGVuZCBhbmQgc2hvdWxkIGNvbnRhaW4gYWxsXG4gIC8vIGVsZW1lbnRzIGFmdGVyIHJlc29sdmVkQmVnaW4uXG4gIC8vIEluIHRoYXQgY2FzZSwgcmVzb2x2ZWRTaXplIHdpbGwgYmUgTmFOIGFuZCBzbGljZVNpemUgd2lsbCByZW1haW4gdW5kZWZpbmVkLlxuICB2YXIgcmVzb2x2ZWRTaXplID0gcmVzb2x2ZWRFbmQgLSByZXNvbHZlZEJlZ2luO1xuICB2YXIgc2xpY2VTaXplO1xuICBpZiAocmVzb2x2ZWRTaXplID09PSByZXNvbHZlZFNpemUpIHtcbiAgICBzbGljZVNpemUgPSByZXNvbHZlZFNpemUgPCAwID8gMCA6IHJlc29sdmVkU2l6ZTtcbiAgfVxuXG4gIHZhciBzbGljZVNlcSA9IG1ha2VTZXF1ZW5jZShjb2xsZWN0aW9uKTtcblxuICAvLyBJZiBjb2xsZWN0aW9uLnNpemUgaXMgdW5kZWZpbmVkLCB0aGUgc2l6ZSBvZiB0aGUgcmVhbGl6ZWQgc2xpY2VTZXEgaXNcbiAgLy8gdW5rbm93biBhdCB0aGlzIHBvaW50IHVubGVzcyB0aGUgbnVtYmVyIG9mIGl0ZW1zIHRvIHNsaWNlIGlzIDBcbiAgc2xpY2VTZXEuc2l6ZSA9XG4gICAgc2xpY2VTaXplID09PSAwID8gc2xpY2VTaXplIDogKGNvbGxlY3Rpb24uc2l6ZSAmJiBzbGljZVNpemUpIHx8IHVuZGVmaW5lZDtcblxuICBpZiAoIXVzZUtleXMgJiYgaXNTZXEoY29sbGVjdGlvbikgJiYgc2xpY2VTaXplID49IDApIHtcbiAgICBzbGljZVNlcS5nZXQgPSBmdW5jdGlvbihpbmRleCwgbm90U2V0VmFsdWUpIHtcbiAgICAgIGluZGV4ID0gd3JhcEluZGV4KHRoaXMsIGluZGV4KTtcbiAgICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDwgc2xpY2VTaXplXG4gICAgICAgID8gY29sbGVjdGlvbi5nZXQoaW5kZXggKyByZXNvbHZlZEJlZ2luLCBub3RTZXRWYWx1ZSlcbiAgICAgICAgOiBub3RTZXRWYWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgc2xpY2VTZXEuX19pdGVyYXRlVW5jYWNoZWQgPSBmdW5jdGlvbihmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgaWYgKHNsaWNlU2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVJlc3VsdCgpLl9faXRlcmF0ZShmbiwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIHZhciBza2lwcGVkID0gMDtcbiAgICB2YXIgaXNTa2lwcGluZyA9IHRydWU7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIGNvbGxlY3Rpb24uX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICBpZiAoIShpc1NraXBwaW5nICYmIChpc1NraXBwaW5nID0gc2tpcHBlZCsrIDwgcmVzb2x2ZWRCZWdpbikpKSB7XG4gICAgICAgIGl0ZXJhdGlvbnMrKztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBmbih2LCB1c2VLZXlzID8gayA6IGl0ZXJhdGlvbnMgLSAxLCB0aGlzJDEpICE9PSBmYWxzZSAmJlxuICAgICAgICAgIGl0ZXJhdGlvbnMgIT09IHNsaWNlU2l6ZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBpdGVyYXRpb25zO1xuICB9O1xuXG4gIHNsaWNlU2VxLl9faXRlcmF0b3JVbmNhY2hlZCA9IGZ1bmN0aW9uKHR5cGUsIHJldmVyc2UpIHtcbiAgICBpZiAoc2xpY2VTaXplICE9PSAwICYmIHJldmVyc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVzdWx0KCkuX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGluc3RhbnRpYXRpbmcgcGFyZW50IGl0ZXJhdG9yIGlmIHRha2luZyAwLlxuICAgIGlmIChzbGljZVNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiBuZXcgSXRlcmF0b3IoaXRlcmF0b3JEb25lKTtcbiAgICB9XG4gICAgdmFyIGl0ZXJhdG9yID0gY29sbGVjdGlvbi5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgIHZhciBza2lwcGVkID0gMDtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB3aGlsZSAoc2tpcHBlZCsrIDwgcmVzb2x2ZWRCZWdpbikge1xuICAgICAgICBpdGVyYXRvci5uZXh0KCk7XG4gICAgICB9XG4gICAgICBpZiAoKytpdGVyYXRpb25zID4gc2xpY2VTaXplKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgaWYgKHVzZUtleXMgfHwgdHlwZSA9PT0gSVRFUkFURV9WQUxVRVMgfHwgc3RlcC5kb25lKSB7XG4gICAgICAgIHJldHVybiBzdGVwO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09IElURVJBVEVfS0VZUykge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCBpdGVyYXRpb25zIC0gMSwgdW5kZWZpbmVkLCBzdGVwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKHR5cGUsIGl0ZXJhdGlvbnMgLSAxLCBzdGVwLnZhbHVlWzFdLCBzdGVwKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gc2xpY2VTZXE7XG59XG5cbmZ1bmN0aW9uIHRha2VXaGlsZUZhY3RvcnkoY29sbGVjdGlvbiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gIHZhciB0YWtlU2VxdWVuY2UgPSBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbik7XG4gIHRha2VTZXF1ZW5jZS5fX2l0ZXJhdGVVbmNhY2hlZCA9IGZ1bmN0aW9uKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdGUoZm4sIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgY29sbGVjdGlvbi5fX2l0ZXJhdGUoXG4gICAgICBmdW5jdGlvbiAodiwgaywgYykgeyByZXR1cm4gcHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwgaywgYykgJiYgKytpdGVyYXRpb25zICYmIGZuKHYsIGssIHRoaXMkMSk7IH1cbiAgICApO1xuICAgIHJldHVybiBpdGVyYXRpb25zO1xuICB9O1xuICB0YWtlU2VxdWVuY2UuX19pdGVyYXRvclVuY2FjaGVkID0gZnVuY3Rpb24odHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVzdWx0KCkuX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgICB9XG4gICAgdmFyIGl0ZXJhdG9yID0gY29sbGVjdGlvbi5fX2l0ZXJhdG9yKElURVJBVEVfRU5UUklFUywgcmV2ZXJzZSk7XG4gICAgdmFyIGl0ZXJhdGluZyA9IHRydWU7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWl0ZXJhdGluZykge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gICAgICB9XG4gICAgICB2YXIgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIGlmIChzdGVwLmRvbmUpIHtcbiAgICAgICAgcmV0dXJuIHN0ZXA7XG4gICAgICB9XG4gICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgdmFyIGsgPSBlbnRyeVswXTtcbiAgICAgIHZhciB2ID0gZW50cnlbMV07XG4gICAgICBpZiAoIXByZWRpY2F0ZS5jYWxsKGNvbnRleHQsIHYsIGssIHRoaXMkMSkpIHtcbiAgICAgICAgaXRlcmF0aW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0eXBlID09PSBJVEVSQVRFX0VOVFJJRVMgPyBzdGVwIDogaXRlcmF0b3JWYWx1ZSh0eXBlLCBrLCB2LCBzdGVwKTtcbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIHRha2VTZXF1ZW5jZTtcbn1cblxuZnVuY3Rpb24gc2tpcFdoaWxlRmFjdG9yeShjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIGNvbnRleHQsIHVzZUtleXMpIHtcbiAgdmFyIHNraXBTZXF1ZW5jZSA9IG1ha2VTZXF1ZW5jZShjb2xsZWN0aW9uKTtcbiAgc2tpcFNlcXVlbmNlLl9faXRlcmF0ZVVuY2FjaGVkID0gZnVuY3Rpb24oZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVJlc3VsdCgpLl9faXRlcmF0ZShmbiwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIHZhciBpc1NraXBwaW5nID0gdHJ1ZTtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgY29sbGVjdGlvbi5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGssIGMpIHtcbiAgICAgIGlmICghKGlzU2tpcHBpbmcgJiYgKGlzU2tpcHBpbmcgPSBwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2LCBrLCBjKSkpKSB7XG4gICAgICAgIGl0ZXJhdGlvbnMrKztcbiAgICAgICAgcmV0dXJuIGZuKHYsIHVzZUtleXMgPyBrIDogaXRlcmF0aW9ucyAtIDEsIHRoaXMkMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG4gIHNraXBTZXF1ZW5jZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbih0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0b3IgPSBjb2xsZWN0aW9uLl9faXRlcmF0b3IoSVRFUkFURV9FTlRSSUVTLCByZXZlcnNlKTtcbiAgICB2YXIgc2tpcHBpbmcgPSB0cnVlO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgdmFyIGs7XG4gICAgICB2YXIgdjtcbiAgICAgIGRvIHtcbiAgICAgICAgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgaWYgKHN0ZXAuZG9uZSkge1xuICAgICAgICAgIGlmICh1c2VLZXlzIHx8IHR5cGUgPT09IElURVJBVEVfVkFMVUVTKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RlcDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGUgPT09IElURVJBVEVfS0VZUykge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgaXRlcmF0aW9ucysrLCB1bmRlZmluZWQsIHN0ZXApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCBpdGVyYXRpb25zKyssIHN0ZXAudmFsdWVbMV0sIHN0ZXApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgIGsgPSBlbnRyeVswXTtcbiAgICAgICAgdiA9IGVudHJ5WzFdO1xuICAgICAgICBza2lwcGluZyAmJiAoc2tpcHBpbmcgPSBwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2LCBrLCB0aGlzJDEpKTtcbiAgICAgIH0gd2hpbGUgKHNraXBwaW5nKTtcbiAgICAgIHJldHVybiB0eXBlID09PSBJVEVSQVRFX0VOVFJJRVMgPyBzdGVwIDogaXRlcmF0b3JWYWx1ZSh0eXBlLCBrLCB2LCBzdGVwKTtcbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIHNraXBTZXF1ZW5jZTtcbn1cblxuZnVuY3Rpb24gY29uY2F0RmFjdG9yeShjb2xsZWN0aW9uLCB2YWx1ZXMpIHtcbiAgdmFyIGlzS2V5ZWRDb2xsZWN0aW9uID0gaXNLZXllZChjb2xsZWN0aW9uKTtcbiAgdmFyIGl0ZXJzID0gW2NvbGxlY3Rpb25dXG4gICAgLmNvbmNhdCh2YWx1ZXMpXG4gICAgLm1hcChmdW5jdGlvbiAodikge1xuICAgICAgaWYgKCFpc0NvbGxlY3Rpb24odikpIHtcbiAgICAgICAgdiA9IGlzS2V5ZWRDb2xsZWN0aW9uXG4gICAgICAgICAgPyBrZXllZFNlcUZyb21WYWx1ZSh2KVxuICAgICAgICAgIDogaW5kZXhlZFNlcUZyb21WYWx1ZShBcnJheS5pc0FycmF5KHYpID8gdiA6IFt2XSk7XG4gICAgICB9IGVsc2UgaWYgKGlzS2V5ZWRDb2xsZWN0aW9uKSB7XG4gICAgICAgIHYgPSBLZXllZENvbGxlY3Rpb24odik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdjtcbiAgICB9KVxuICAgIC5maWx0ZXIoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHYuc2l6ZSAhPT0gMDsgfSk7XG5cbiAgaWYgKGl0ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9XG5cbiAgaWYgKGl0ZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBzaW5nbGV0b24gPSBpdGVyc1swXTtcbiAgICBpZiAoXG4gICAgICBzaW5nbGV0b24gPT09IGNvbGxlY3Rpb24gfHxcbiAgICAgIChpc0tleWVkQ29sbGVjdGlvbiAmJiBpc0tleWVkKHNpbmdsZXRvbikpIHx8XG4gICAgICAoaXNJbmRleGVkKGNvbGxlY3Rpb24pICYmIGlzSW5kZXhlZChzaW5nbGV0b24pKVxuICAgICkge1xuICAgICAgcmV0dXJuIHNpbmdsZXRvbjtcbiAgICB9XG4gIH1cblxuICB2YXIgY29uY2F0U2VxID0gbmV3IEFycmF5U2VxKGl0ZXJzKTtcbiAgaWYgKGlzS2V5ZWRDb2xsZWN0aW9uKSB7XG4gICAgY29uY2F0U2VxID0gY29uY2F0U2VxLnRvS2V5ZWRTZXEoKTtcbiAgfSBlbHNlIGlmICghaXNJbmRleGVkKGNvbGxlY3Rpb24pKSB7XG4gICAgY29uY2F0U2VxID0gY29uY2F0U2VxLnRvU2V0U2VxKCk7XG4gIH1cbiAgY29uY2F0U2VxID0gY29uY2F0U2VxLmZsYXR0ZW4odHJ1ZSk7XG4gIGNvbmNhdFNlcS5zaXplID0gaXRlcnMucmVkdWNlKGZ1bmN0aW9uIChzdW0sIHNlcSkge1xuICAgIGlmIChzdW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHNpemUgPSBzZXEuc2l6ZTtcbiAgICAgIGlmIChzaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHN1bSArIHNpemU7XG4gICAgICB9XG4gICAgfVxuICB9LCAwKTtcbiAgcmV0dXJuIGNvbmNhdFNlcTtcbn1cblxuZnVuY3Rpb24gZmxhdHRlbkZhY3RvcnkoY29sbGVjdGlvbiwgZGVwdGgsIHVzZUtleXMpIHtcbiAgdmFyIGZsYXRTZXF1ZW5jZSA9IG1ha2VTZXF1ZW5jZShjb2xsZWN0aW9uKTtcbiAgZmxhdFNlcXVlbmNlLl9faXRlcmF0ZVVuY2FjaGVkID0gZnVuY3Rpb24oZm4sIHJldmVyc2UpIHtcbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdGUoZm4sIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgdmFyIHN0b3BwZWQgPSBmYWxzZTtcbiAgICBmdW5jdGlvbiBmbGF0RGVlcChpdGVyLCBjdXJyZW50RGVwdGgpIHtcbiAgICAgIGl0ZXIuX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICAgIGlmICgoIWRlcHRoIHx8IGN1cnJlbnREZXB0aCA8IGRlcHRoKSAmJiBpc0NvbGxlY3Rpb24odikpIHtcbiAgICAgICAgICBmbGF0RGVlcCh2LCBjdXJyZW50RGVwdGggKyAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVyYXRpb25zKys7XG4gICAgICAgICAgaWYgKGZuKHYsIHVzZUtleXMgPyBrIDogaXRlcmF0aW9ucyAtIDEsIGZsYXRTZXF1ZW5jZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBzdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICFzdG9wcGVkO1xuICAgICAgfSwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIGZsYXREZWVwKGNvbGxlY3Rpb24sIDApO1xuICAgIHJldHVybiBpdGVyYXRpb25zO1xuICB9O1xuICBmbGF0U2VxdWVuY2UuX19pdGVyYXRvclVuY2FjaGVkID0gZnVuY3Rpb24odHlwZSwgcmV2ZXJzZSkge1xuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVJlc3VsdCgpLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIHZhciBpdGVyYXRvciA9IGNvbGxlY3Rpb24uX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgICB2YXIgc3RhY2sgPSBbXTtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB3aGlsZSAoaXRlcmF0b3IpIHtcbiAgICAgICAgdmFyIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIGlmIChzdGVwLmRvbmUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgaXRlcmF0b3IgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdiA9IHN0ZXAudmFsdWU7XG4gICAgICAgIGlmICh0eXBlID09PSBJVEVSQVRFX0VOVFJJRVMpIHtcbiAgICAgICAgICB2ID0gdlsxXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKCFkZXB0aCB8fCBzdGFjay5sZW5ndGggPCBkZXB0aCkgJiYgaXNDb2xsZWN0aW9uKHYpKSB7XG4gICAgICAgICAgc3RhY2sucHVzaChpdGVyYXRvcik7XG4gICAgICAgICAgaXRlcmF0b3IgPSB2Ll9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHVzZUtleXMgPyBzdGVwIDogaXRlcmF0b3JWYWx1ZSh0eXBlLCBpdGVyYXRpb25zKyssIHYsIHN0ZXApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiBmbGF0U2VxdWVuY2U7XG59XG5cbmZ1bmN0aW9uIGZsYXRNYXBGYWN0b3J5KGNvbGxlY3Rpb24sIG1hcHBlciwgY29udGV4dCkge1xuICB2YXIgY29lcmNlID0gY29sbGVjdGlvbkNsYXNzKGNvbGxlY3Rpb24pO1xuICByZXR1cm4gY29sbGVjdGlvblxuICAgIC50b1NlcSgpXG4gICAgLm1hcChmdW5jdGlvbiAodiwgaykgeyByZXR1cm4gY29lcmNlKG1hcHBlci5jYWxsKGNvbnRleHQsIHYsIGssIGNvbGxlY3Rpb24pKTsgfSlcbiAgICAuZmxhdHRlbih0cnVlKTtcbn1cblxuZnVuY3Rpb24gaW50ZXJwb3NlRmFjdG9yeShjb2xsZWN0aW9uLCBzZXBhcmF0b3IpIHtcbiAgdmFyIGludGVycG9zZWRTZXF1ZW5jZSA9IG1ha2VTZXF1ZW5jZShjb2xsZWN0aW9uKTtcbiAgaW50ZXJwb3NlZFNlcXVlbmNlLnNpemUgPSBjb2xsZWN0aW9uLnNpemUgJiYgY29sbGVjdGlvbi5zaXplICogMiAtIDE7XG4gIGludGVycG9zZWRTZXF1ZW5jZS5fX2l0ZXJhdGVVbmNhY2hlZCA9IGZ1bmN0aW9uKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgY29sbGVjdGlvbi5fX2l0ZXJhdGUoXG4gICAgICBmdW5jdGlvbiAodikgeyByZXR1cm4gKCFpdGVyYXRpb25zIHx8IGZuKHNlcGFyYXRvciwgaXRlcmF0aW9ucysrLCB0aGlzJDEpICE9PSBmYWxzZSkgJiZcbiAgICAgICAgZm4odiwgaXRlcmF0aW9ucysrLCB0aGlzJDEpICE9PSBmYWxzZTsgfSxcbiAgICAgIHJldmVyc2VcbiAgICApO1xuICAgIHJldHVybiBpdGVyYXRpb25zO1xuICB9O1xuICBpbnRlcnBvc2VkU2VxdWVuY2UuX19pdGVyYXRvclVuY2FjaGVkID0gZnVuY3Rpb24odHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBpdGVyYXRvciA9IGNvbGxlY3Rpb24uX19pdGVyYXRvcihJVEVSQVRFX1ZBTFVFUywgcmV2ZXJzZSk7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHZhciBzdGVwO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFzdGVwIHx8IGl0ZXJhdGlvbnMgJSAyKSB7XG4gICAgICAgIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIGlmIChzdGVwLmRvbmUpIHtcbiAgICAgICAgICByZXR1cm4gc3RlcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZXJhdGlvbnMgJSAyXG4gICAgICAgID8gaXRlcmF0b3JWYWx1ZSh0eXBlLCBpdGVyYXRpb25zKyssIHNlcGFyYXRvcilcbiAgICAgICAgOiBpdGVyYXRvclZhbHVlKHR5cGUsIGl0ZXJhdGlvbnMrKywgc3RlcC52YWx1ZSwgc3RlcCk7XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiBpbnRlcnBvc2VkU2VxdWVuY2U7XG59XG5cbmZ1bmN0aW9uIHNvcnRGYWN0b3J5KGNvbGxlY3Rpb24sIGNvbXBhcmF0b3IsIG1hcHBlcikge1xuICBpZiAoIWNvbXBhcmF0b3IpIHtcbiAgICBjb21wYXJhdG9yID0gZGVmYXVsdENvbXBhcmF0b3I7XG4gIH1cbiAgdmFyIGlzS2V5ZWRDb2xsZWN0aW9uID0gaXNLZXllZChjb2xsZWN0aW9uKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGVudHJpZXMgPSBjb2xsZWN0aW9uXG4gICAgLnRvU2VxKClcbiAgICAubWFwKGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBbaywgdiwgaW5kZXgrKywgbWFwcGVyID8gbWFwcGVyKHYsIGssIGNvbGxlY3Rpb24pIDogdl07IH0pXG4gICAgLnZhbHVlU2VxKClcbiAgICAudG9BcnJheSgpO1xuICBlbnRyaWVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGNvbXBhcmF0b3IoYVszXSwgYlszXSkgfHwgYVsyXSAtIGJbMl07IH0pLmZvckVhY2goXG4gICAgaXNLZXllZENvbGxlY3Rpb25cbiAgICAgID8gZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgICAgICBlbnRyaWVzW2ldLmxlbmd0aCA9IDI7XG4gICAgICAgIH1cbiAgICAgIDogZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgICAgICBlbnRyaWVzW2ldID0gdlsxXTtcbiAgICAgICAgfVxuICApO1xuICByZXR1cm4gaXNLZXllZENvbGxlY3Rpb25cbiAgICA/IEtleWVkU2VxKGVudHJpZXMpXG4gICAgOiBpc0luZGV4ZWQoY29sbGVjdGlvbilcbiAgICAgID8gSW5kZXhlZFNlcShlbnRyaWVzKVxuICAgICAgOiBTZXRTZXEoZW50cmllcyk7XG59XG5cbmZ1bmN0aW9uIG1heEZhY3RvcnkoY29sbGVjdGlvbiwgY29tcGFyYXRvciwgbWFwcGVyKSB7XG4gIGlmICghY29tcGFyYXRvcikge1xuICAgIGNvbXBhcmF0b3IgPSBkZWZhdWx0Q29tcGFyYXRvcjtcbiAgfVxuICBpZiAobWFwcGVyKSB7XG4gICAgdmFyIGVudHJ5ID0gY29sbGVjdGlvblxuICAgICAgLnRvU2VxKClcbiAgICAgIC5tYXAoZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIFt2LCBtYXBwZXIodiwgaywgY29sbGVjdGlvbildOyB9KVxuICAgICAgLnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gKG1heENvbXBhcmUoY29tcGFyYXRvciwgYVsxXSwgYlsxXSkgPyBiIDogYSk7IH0pO1xuICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeVswXTtcbiAgfVxuICByZXR1cm4gY29sbGVjdGlvbi5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIChtYXhDb21wYXJlKGNvbXBhcmF0b3IsIGEsIGIpID8gYiA6IGEpOyB9KTtcbn1cblxuZnVuY3Rpb24gbWF4Q29tcGFyZShjb21wYXJhdG9yLCBhLCBiKSB7XG4gIHZhciBjb21wID0gY29tcGFyYXRvcihiLCBhKTtcbiAgLy8gYiBpcyBjb25zaWRlcmVkIHRoZSBuZXcgbWF4IGlmIHRoZSBjb21wYXJhdG9yIGRlY2xhcmVzIHRoZW0gZXF1YWwsIGJ1dFxuICAvLyB0aGV5IGFyZSBub3QgZXF1YWwgYW5kIGIgaXMgaW4gZmFjdCBhIG51bGxpc2ggdmFsdWUuXG4gIHJldHVybiAoXG4gICAgKGNvbXAgPT09IDAgJiYgYiAhPT0gYSAmJiAoYiA9PT0gdW5kZWZpbmVkIHx8IGIgPT09IG51bGwgfHwgYiAhPT0gYikpIHx8XG4gICAgY29tcCA+IDBcbiAgKTtcbn1cblxuZnVuY3Rpb24gemlwV2l0aEZhY3Rvcnkoa2V5SXRlciwgemlwcGVyLCBpdGVycywgemlwQWxsKSB7XG4gIHZhciB6aXBTZXF1ZW5jZSA9IG1ha2VTZXF1ZW5jZShrZXlJdGVyKTtcbiAgdmFyIHNpemVzID0gbmV3IEFycmF5U2VxKGl0ZXJzKS5tYXAoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGkuc2l6ZTsgfSk7XG4gIHppcFNlcXVlbmNlLnNpemUgPSB6aXBBbGwgPyBzaXplcy5tYXgoKSA6IHNpemVzLm1pbigpO1xuICAvLyBOb3RlOiB0aGlzIGEgZ2VuZXJpYyBiYXNlIGltcGxlbWVudGF0aW9uIG9mIF9faXRlcmF0ZSBpbiB0ZXJtcyBvZlxuICAvLyBfX2l0ZXJhdG9yIHdoaWNoIG1heSBiZSBtb3JlIGdlbmVyaWNhbGx5IHVzZWZ1bCBpbiB0aGUgZnV0dXJlLlxuICB6aXBTZXF1ZW5jZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbihmbiwgcmV2ZXJzZSkge1xuICAgIC8qIGdlbmVyaWM6XG4gICAgdmFyIGl0ZXJhdG9yID0gdGhpcy5fX2l0ZXJhdG9yKElURVJBVEVfRU5UUklFUywgcmV2ZXJzZSk7XG4gICAgdmFyIHN0ZXA7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgIGl0ZXJhdGlvbnMrKztcbiAgICAgIGlmIChmbihzdGVwLnZhbHVlWzFdLCBzdGVwLnZhbHVlWzBdLCB0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpdGVyYXRpb25zO1xuICAgICovXG4gICAgLy8gaW5kZXhlZDpcbiAgICB2YXIgaXRlcmF0b3IgPSB0aGlzLl9faXRlcmF0b3IoSVRFUkFURV9WQUxVRVMsIHJldmVyc2UpO1xuICAgIHZhciBzdGVwO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICBpZiAoZm4oc3RlcC52YWx1ZSwgaXRlcmF0aW9ucysrLCB0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpdGVyYXRpb25zO1xuICB9O1xuICB6aXBTZXF1ZW5jZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbih0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIGl0ZXJhdG9ycyA9IGl0ZXJzLm1hcChcbiAgICAgIGZ1bmN0aW9uIChpKSB7IHJldHVybiAoKGkgPSBDb2xsZWN0aW9uKGkpKSwgZ2V0SXRlcmF0b3IocmV2ZXJzZSA/IGkucmV2ZXJzZSgpIDogaSkpOyB9XG4gICAgKTtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgdmFyIGlzRG9uZSA9IGZhbHNlO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN0ZXBzO1xuICAgICAgaWYgKCFpc0RvbmUpIHtcbiAgICAgICAgc3RlcHMgPSBpdGVyYXRvcnMubWFwKGZ1bmN0aW9uIChpKSB7IHJldHVybiBpLm5leHQoKTsgfSk7XG4gICAgICAgIGlzRG9uZSA9IHppcEFsbCA/IHN0ZXBzLmV2ZXJ5KGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLmRvbmU7IH0pIDogc3RlcHMuc29tZShmdW5jdGlvbiAocykgeyByZXR1cm4gcy5kb25lOyB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0RvbmUpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yRG9uZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUoXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGl0ZXJhdGlvbnMrKyxcbiAgICAgICAgemlwcGVyLmFwcGx5KG51bGwsIHN0ZXBzLm1hcChmdW5jdGlvbiAocykgeyByZXR1cm4gcy52YWx1ZTsgfSkpXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuICByZXR1cm4gemlwU2VxdWVuY2U7XG59XG5cbi8vICNwcmFnbWEgSGVscGVyIEZ1bmN0aW9uc1xuXG5mdW5jdGlvbiByZWlmeShpdGVyLCBzZXEpIHtcbiAgcmV0dXJuIGl0ZXIgPT09IHNlcSA/IGl0ZXIgOiBpc1NlcShpdGVyKSA/IHNlcSA6IGl0ZXIuY29uc3RydWN0b3Ioc2VxKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVFbnRyeShlbnRyeSkge1xuICBpZiAoZW50cnkgIT09IE9iamVjdChlbnRyeSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBbSywgVl0gdHVwbGU6ICcgKyBlbnRyeSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29sbGVjdGlvbkNsYXNzKGNvbGxlY3Rpb24pIHtcbiAgcmV0dXJuIGlzS2V5ZWQoY29sbGVjdGlvbilcbiAgICA/IEtleWVkQ29sbGVjdGlvblxuICAgIDogaXNJbmRleGVkKGNvbGxlY3Rpb24pXG4gICAgICA/IEluZGV4ZWRDb2xsZWN0aW9uXG4gICAgICA6IFNldENvbGxlY3Rpb247XG59XG5cbmZ1bmN0aW9uIG1ha2VTZXF1ZW5jZShjb2xsZWN0aW9uKSB7XG4gIHJldHVybiBPYmplY3QuY3JlYXRlKFxuICAgIChpc0tleWVkKGNvbGxlY3Rpb24pXG4gICAgICA/IEtleWVkU2VxXG4gICAgICA6IGlzSW5kZXhlZChjb2xsZWN0aW9uKVxuICAgICAgICA/IEluZGV4ZWRTZXFcbiAgICAgICAgOiBTZXRTZXFcbiAgICApLnByb3RvdHlwZVxuICApO1xufVxuXG5mdW5jdGlvbiBjYWNoZVJlc3VsdFRocm91Z2goKSB7XG4gIGlmICh0aGlzLl9pdGVyLmNhY2hlUmVzdWx0KSB7XG4gICAgdGhpcy5faXRlci5jYWNoZVJlc3VsdCgpO1xuICAgIHRoaXMuc2l6ZSA9IHRoaXMuX2l0ZXIuc2l6ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZXR1cm4gU2VxLnByb3RvdHlwZS5jYWNoZVJlc3VsdC5jYWxsKHRoaXMpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyYXRvcihhLCBiKSB7XG4gIGlmIChhID09PSB1bmRlZmluZWQgJiYgYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgcmV0dXJuIGEgPiBiID8gMSA6IGEgPCBiID8gLTEgOiAwO1xufVxuXG4vLyBodHRwOi8vanNwZXJmLmNvbS9jb3B5LWFycmF5LWlubGluZVxuZnVuY3Rpb24gYXJyQ29weShhcnIsIG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcbiAgdmFyIGxlbiA9IE1hdGgubWF4KDAsIGFyci5sZW5ndGggLSBvZmZzZXQpO1xuICB2YXIgbmV3QXJyID0gbmV3IEFycmF5KGxlbik7XG4gIGZvciAodmFyIGlpID0gMDsgaWkgPCBsZW47IGlpKyspIHtcbiAgICBuZXdBcnJbaWldID0gYXJyW2lpICsgb2Zmc2V0XTtcbiAgfVxuICByZXR1cm4gbmV3QXJyO1xufVxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBlcnJvcikge1xuICBpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpOyB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydE5vdEluZmluaXRlKHNpemUpIHtcbiAgaW52YXJpYW50KFxuICAgIHNpemUgIT09IEluZmluaXR5LFxuICAgICdDYW5ub3QgcGVyZm9ybSB0aGlzIGFjdGlvbiB3aXRoIGFuIGluZmluaXRlIHNpemUuJ1xuICApO1xufVxuXG5mdW5jdGlvbiBjb2VyY2VLZXlQYXRoKGtleVBhdGgpIHtcbiAgaWYgKGlzQXJyYXlMaWtlKGtleVBhdGgpICYmIHR5cGVvZiBrZXlQYXRoICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBrZXlQYXRoO1xuICB9XG4gIGlmIChpc09yZGVyZWQoa2V5UGF0aCkpIHtcbiAgICByZXR1cm4ga2V5UGF0aC50b0FycmF5KCk7XG4gIH1cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAnSW52YWxpZCBrZXlQYXRoOiBleHBlY3RlZCBPcmRlcmVkIENvbGxlY3Rpb24gb3IgQXJyYXk6ICcgKyBrZXlQYXRoXG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzUGxhaW5PYmoodmFsdWUpIHtcbiAgcmV0dXJuIChcbiAgICB2YWx1ZSAmJlxuICAgICh0eXBlb2YgdmFsdWUuY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicgfHxcbiAgICAgIHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdPYmplY3QnKVxuICApO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBwb3RlbnRpYWxseS1wZXJzaXN0ZW50IGRhdGEgc3RydWN0dXJlLCBlaXRoZXJcbiAqIHByb3ZpZGVkIGJ5IEltbXV0YWJsZS5qcyBvciBhIHBsYWluIEFycmF5IG9yIE9iamVjdC5cbiAqL1xuZnVuY3Rpb24gaXNEYXRhU3RydWN0dXJlKHZhbHVlKSB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuICAgIChpc0ltbXV0YWJsZSh2YWx1ZSkgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgaXNQbGFpbk9iaih2YWx1ZSkpXG4gICk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYSB2YWx1ZSB0byBhIHN0cmluZywgYWRkaW5nIHF1b3RlcyBpZiBhIHN0cmluZyB3YXMgcHJvdmlkZWQuXG4gKi9cbmZ1bmN0aW9uIHF1b3RlU3RyaW5nKHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgOiBTdHJpbmcodmFsdWUpO1xuICB9IGNhdGNoIChfaWdub3JlRXJyb3IpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhcyhjb2xsZWN0aW9uLCBrZXkpIHtcbiAgcmV0dXJuIGlzSW1tdXRhYmxlKGNvbGxlY3Rpb24pXG4gICAgPyBjb2xsZWN0aW9uLmhhcyhrZXkpXG4gICAgOiBpc0RhdGFTdHJ1Y3R1cmUoY29sbGVjdGlvbikgJiYgaGFzT3duUHJvcGVydHkuY2FsbChjb2xsZWN0aW9uLCBrZXkpO1xufVxuXG5mdW5jdGlvbiBnZXQoY29sbGVjdGlvbiwga2V5LCBub3RTZXRWYWx1ZSkge1xuICByZXR1cm4gaXNJbW11dGFibGUoY29sbGVjdGlvbilcbiAgICA/IGNvbGxlY3Rpb24uZ2V0KGtleSwgbm90U2V0VmFsdWUpXG4gICAgOiAhaGFzKGNvbGxlY3Rpb24sIGtleSlcbiAgICAgID8gbm90U2V0VmFsdWVcbiAgICAgIDogdHlwZW9mIGNvbGxlY3Rpb24uZ2V0ID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gY29sbGVjdGlvbi5nZXQoa2V5KVxuICAgICAgICA6IGNvbGxlY3Rpb25ba2V5XTtcbn1cblxuZnVuY3Rpb24gc2hhbGxvd0NvcHkoZnJvbSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShmcm9tKSkge1xuICAgIHJldHVybiBhcnJDb3B5KGZyb20pO1xuICB9XG4gIHZhciB0byA9IHt9O1xuICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0bztcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKGNvbGxlY3Rpb24sIGtleSkge1xuICBpZiAoIWlzRGF0YVN0cnVjdHVyZShjb2xsZWN0aW9uKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnQ2Fubm90IHVwZGF0ZSBub24tZGF0YS1zdHJ1Y3R1cmUgdmFsdWU6ICcgKyBjb2xsZWN0aW9uXG4gICAgKTtcbiAgfVxuICBpZiAoaXNJbW11dGFibGUoY29sbGVjdGlvbikpIHtcbiAgICBpZiAoIWNvbGxlY3Rpb24ucmVtb3ZlKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnQ2Fubm90IHVwZGF0ZSBpbW11dGFibGUgdmFsdWUgd2l0aG91dCAucmVtb3ZlKCkgbWV0aG9kOiAnICsgY29sbGVjdGlvblxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbGxlY3Rpb24ucmVtb3ZlKGtleSk7XG4gIH1cbiAgaWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbGxlY3Rpb24sIGtleSkpIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfVxuICB2YXIgY29sbGVjdGlvbkNvcHkgPSBzaGFsbG93Q29weShjb2xsZWN0aW9uKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbkNvcHkpKSB7XG4gICAgY29sbGVjdGlvbkNvcHkuc3BsaWNlKGtleSwgMSk7XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIGNvbGxlY3Rpb25Db3B5W2tleV07XG4gIH1cbiAgcmV0dXJuIGNvbGxlY3Rpb25Db3B5O1xufVxuXG5mdW5jdGlvbiBzZXQoY29sbGVjdGlvbiwga2V5LCB2YWx1ZSkge1xuICBpZiAoIWlzRGF0YVN0cnVjdHVyZShjb2xsZWN0aW9uKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnQ2Fubm90IHVwZGF0ZSBub24tZGF0YS1zdHJ1Y3R1cmUgdmFsdWU6ICcgKyBjb2xsZWN0aW9uXG4gICAgKTtcbiAgfVxuICBpZiAoaXNJbW11dGFibGUoY29sbGVjdGlvbikpIHtcbiAgICBpZiAoIWNvbGxlY3Rpb24uc2V0KSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnQ2Fubm90IHVwZGF0ZSBpbW11dGFibGUgdmFsdWUgd2l0aG91dCAuc2V0KCkgbWV0aG9kOiAnICsgY29sbGVjdGlvblxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uc2V0KGtleSwgdmFsdWUpO1xuICB9XG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbGxlY3Rpb24sIGtleSkgJiYgdmFsdWUgPT09IGNvbGxlY3Rpb25ba2V5XSkge1xuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9XG4gIHZhciBjb2xsZWN0aW9uQ29weSA9IHNoYWxsb3dDb3B5KGNvbGxlY3Rpb24pO1xuICBjb2xsZWN0aW9uQ29weVtrZXldID0gdmFsdWU7XG4gIHJldHVybiBjb2xsZWN0aW9uQ29weTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlSW4oY29sbGVjdGlvbiwga2V5UGF0aCwgbm90U2V0VmFsdWUsIHVwZGF0ZXIpIHtcbiAgaWYgKCF1cGRhdGVyKSB7XG4gICAgdXBkYXRlciA9IG5vdFNldFZhbHVlO1xuICAgIG5vdFNldFZhbHVlID0gdW5kZWZpbmVkO1xuICB9XG4gIHZhciB1cGRhdGVkVmFsdWUgPSB1cGRhdGVJbkRlZXBseShcbiAgICBpc0ltbXV0YWJsZShjb2xsZWN0aW9uKSxcbiAgICBjb2xsZWN0aW9uLFxuICAgIGNvZXJjZUtleVBhdGgoa2V5UGF0aCksXG4gICAgMCxcbiAgICBub3RTZXRWYWx1ZSxcbiAgICB1cGRhdGVyXG4gICk7XG4gIHJldHVybiB1cGRhdGVkVmFsdWUgPT09IE5PVF9TRVQgPyBub3RTZXRWYWx1ZSA6IHVwZGF0ZWRWYWx1ZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlSW5EZWVwbHkoXG4gIGluSW1tdXRhYmxlLFxuICBleGlzdGluZyxcbiAga2V5UGF0aCxcbiAgaSxcbiAgbm90U2V0VmFsdWUsXG4gIHVwZGF0ZXJcbikge1xuICB2YXIgd2FzTm90U2V0ID0gZXhpc3RpbmcgPT09IE5PVF9TRVQ7XG4gIGlmIChpID09PSBrZXlQYXRoLmxlbmd0aCkge1xuICAgIHZhciBleGlzdGluZ1ZhbHVlID0gd2FzTm90U2V0ID8gbm90U2V0VmFsdWUgOiBleGlzdGluZztcbiAgICB2YXIgbmV3VmFsdWUgPSB1cGRhdGVyKGV4aXN0aW5nVmFsdWUpO1xuICAgIHJldHVybiBuZXdWYWx1ZSA9PT0gZXhpc3RpbmdWYWx1ZSA/IGV4aXN0aW5nIDogbmV3VmFsdWU7XG4gIH1cbiAgaWYgKCF3YXNOb3RTZXQgJiYgIWlzRGF0YVN0cnVjdHVyZShleGlzdGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ0Nhbm5vdCB1cGRhdGUgd2l0aGluIG5vbi1kYXRhLXN0cnVjdHVyZSB2YWx1ZSBpbiBwYXRoIFsnICtcbiAgICAgICAga2V5UGF0aC5zbGljZSgwLCBpKS5tYXAocXVvdGVTdHJpbmcpICtcbiAgICAgICAgJ106ICcgK1xuICAgICAgICBleGlzdGluZ1xuICAgICk7XG4gIH1cbiAgdmFyIGtleSA9IGtleVBhdGhbaV07XG4gIHZhciBuZXh0RXhpc3RpbmcgPSB3YXNOb3RTZXQgPyBOT1RfU0VUIDogZ2V0KGV4aXN0aW5nLCBrZXksIE5PVF9TRVQpO1xuICB2YXIgbmV4dFVwZGF0ZWQgPSB1cGRhdGVJbkRlZXBseShcbiAgICBuZXh0RXhpc3RpbmcgPT09IE5PVF9TRVQgPyBpbkltbXV0YWJsZSA6IGlzSW1tdXRhYmxlKG5leHRFeGlzdGluZyksXG4gICAgbmV4dEV4aXN0aW5nLFxuICAgIGtleVBhdGgsXG4gICAgaSArIDEsXG4gICAgbm90U2V0VmFsdWUsXG4gICAgdXBkYXRlclxuICApO1xuICByZXR1cm4gbmV4dFVwZGF0ZWQgPT09IG5leHRFeGlzdGluZ1xuICAgID8gZXhpc3RpbmdcbiAgICA6IG5leHRVcGRhdGVkID09PSBOT1RfU0VUXG4gICAgICA/IHJlbW92ZShleGlzdGluZywga2V5KVxuICAgICAgOiBzZXQoXG4gICAgICAgICAgd2FzTm90U2V0ID8gKGluSW1tdXRhYmxlID8gZW1wdHlNYXAoKSA6IHt9KSA6IGV4aXN0aW5nLFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICBuZXh0VXBkYXRlZFxuICAgICAgICApO1xufVxuXG5mdW5jdGlvbiBzZXRJbihjb2xsZWN0aW9uLCBrZXlQYXRoLCB2YWx1ZSkge1xuICByZXR1cm4gdXBkYXRlSW4oY29sbGVjdGlvbiwga2V5UGF0aCwgTk9UX1NFVCwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsdWU7IH0pO1xufVxuXG5mdW5jdGlvbiBzZXRJbiQxKGtleVBhdGgsIHYpIHtcbiAgcmV0dXJuIHNldEluKHRoaXMsIGtleVBhdGgsIHYpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVJbihjb2xsZWN0aW9uLCBrZXlQYXRoKSB7XG4gIHJldHVybiB1cGRhdGVJbihjb2xsZWN0aW9uLCBrZXlQYXRoLCBmdW5jdGlvbiAoKSB7IHJldHVybiBOT1RfU0VUOyB9KTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlSW4oa2V5UGF0aCkge1xuICByZXR1cm4gcmVtb3ZlSW4odGhpcywga2V5UGF0aCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZShjb2xsZWN0aW9uLCBrZXksIG5vdFNldFZhbHVlLCB1cGRhdGVyKSB7XG4gIHJldHVybiB1cGRhdGVJbihjb2xsZWN0aW9uLCBba2V5XSwgbm90U2V0VmFsdWUsIHVwZGF0ZXIpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUkMShrZXksIG5vdFNldFZhbHVlLCB1cGRhdGVyKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxXG4gICAgPyBrZXkodGhpcylcbiAgICA6IHVwZGF0ZSh0aGlzLCBrZXksIG5vdFNldFZhbHVlLCB1cGRhdGVyKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlSW4kMShrZXlQYXRoLCBub3RTZXRWYWx1ZSwgdXBkYXRlcikge1xuICByZXR1cm4gdXBkYXRlSW4odGhpcywga2V5UGF0aCwgbm90U2V0VmFsdWUsIHVwZGF0ZXIpO1xufVxuXG5mdW5jdGlvbiBtZXJnZSgpIHtcbiAgdmFyIGl0ZXJzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHdoaWxlICggbGVuLS0gKSBpdGVyc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gIHJldHVybiBtZXJnZUludG9LZXllZFdpdGgodGhpcywgaXRlcnMpO1xufVxuXG5mdW5jdGlvbiBtZXJnZVdpdGgobWVyZ2VyKSB7XG4gIHZhciBpdGVycyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKCBsZW4tLSA+IDAgKSBpdGVyc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICBpZiAodHlwZW9mIG1lcmdlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWVyZ2VyIGZ1bmN0aW9uOiAnICsgbWVyZ2VyKTtcbiAgfVxuICByZXR1cm4gbWVyZ2VJbnRvS2V5ZWRXaXRoKHRoaXMsIGl0ZXJzLCBtZXJnZXIpO1xufVxuXG5mdW5jdGlvbiBtZXJnZUludG9LZXllZFdpdGgoY29sbGVjdGlvbiwgY29sbGVjdGlvbnMsIG1lcmdlcikge1xuICB2YXIgaXRlcnMgPSBbXTtcbiAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGNvbGxlY3Rpb25zLmxlbmd0aDsgaWkrKykge1xuICAgIHZhciBjb2xsZWN0aW9uJDEgPSBLZXllZENvbGxlY3Rpb24oY29sbGVjdGlvbnNbaWldKTtcbiAgICBpZiAoY29sbGVjdGlvbiQxLnNpemUgIT09IDApIHtcbiAgICAgIGl0ZXJzLnB1c2goY29sbGVjdGlvbiQxKTtcbiAgICB9XG4gIH1cbiAgaWYgKGl0ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9XG4gIGlmIChcbiAgICBjb2xsZWN0aW9uLnRvU2VxKCkuc2l6ZSA9PT0gMCAmJlxuICAgICFjb2xsZWN0aW9uLl9fb3duZXJJRCAmJlxuICAgIGl0ZXJzLmxlbmd0aCA9PT0gMVxuICApIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbi5jb25zdHJ1Y3RvcihpdGVyc1swXSk7XG4gIH1cbiAgcmV0dXJuIGNvbGxlY3Rpb24ud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAoY29sbGVjdGlvbikge1xuICAgIHZhciBtZXJnZUludG9Db2xsZWN0aW9uID0gbWVyZ2VyXG4gICAgICA/IGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgdXBkYXRlKFxuICAgICAgICAgICAgY29sbGVjdGlvbixcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIE5PVF9TRVQsXG4gICAgICAgICAgICBmdW5jdGlvbiAob2xkVmFsKSB7IHJldHVybiAob2xkVmFsID09PSBOT1RfU0VUID8gdmFsdWUgOiBtZXJnZXIob2xkVmFsLCB2YWx1ZSwga2V5KSk7IH1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICA6IGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgY29sbGVjdGlvbi5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGl0ZXJzLmxlbmd0aDsgaWkrKykge1xuICAgICAgaXRlcnNbaWldLmZvckVhY2gobWVyZ2VJbnRvQ29sbGVjdGlvbik7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gbWVyZ2UkMShjb2xsZWN0aW9uKSB7XG4gIHZhciBzb3VyY2VzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICB3aGlsZSAoIGxlbi0tID4gMCApIHNvdXJjZXNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cbiAgcmV0dXJuIG1lcmdlV2l0aFNvdXJjZXMoY29sbGVjdGlvbiwgc291cmNlcyk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlV2l0aCQxKG1lcmdlciwgY29sbGVjdGlvbikge1xuICB2YXIgc291cmNlcyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgd2hpbGUgKCBsZW4tLSA+IDAgKSBzb3VyY2VzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMiBdO1xuXG4gIHJldHVybiBtZXJnZVdpdGhTb3VyY2VzKGNvbGxlY3Rpb24sIHNvdXJjZXMsIG1lcmdlcik7XG59XG5cbmZ1bmN0aW9uIG1lcmdlRGVlcChjb2xsZWN0aW9uKSB7XG4gIHZhciBzb3VyY2VzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICB3aGlsZSAoIGxlbi0tID4gMCApIHNvdXJjZXNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cbiAgcmV0dXJuIG1lcmdlRGVlcFdpdGhTb3VyY2VzKGNvbGxlY3Rpb24sIHNvdXJjZXMpO1xufVxuXG5mdW5jdGlvbiBtZXJnZURlZXBXaXRoKG1lcmdlciwgY29sbGVjdGlvbikge1xuICB2YXIgc291cmNlcyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgd2hpbGUgKCBsZW4tLSA+IDAgKSBzb3VyY2VzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMiBdO1xuXG4gIHJldHVybiBtZXJnZURlZXBXaXRoU291cmNlcyhjb2xsZWN0aW9uLCBzb3VyY2VzLCBtZXJnZXIpO1xufVxuXG5mdW5jdGlvbiBtZXJnZURlZXBXaXRoU291cmNlcyhjb2xsZWN0aW9uLCBzb3VyY2VzLCBtZXJnZXIpIHtcbiAgcmV0dXJuIG1lcmdlV2l0aFNvdXJjZXMoY29sbGVjdGlvbiwgc291cmNlcywgZGVlcE1lcmdlcldpdGgobWVyZ2VyKSk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlV2l0aFNvdXJjZXMoY29sbGVjdGlvbiwgc291cmNlcywgbWVyZ2VyKSB7XG4gIGlmICghaXNEYXRhU3RydWN0dXJlKGNvbGxlY3Rpb24pKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdDYW5ub3QgbWVyZ2UgaW50byBub24tZGF0YS1zdHJ1Y3R1cmUgdmFsdWU6ICcgKyBjb2xsZWN0aW9uXG4gICAgKTtcbiAgfVxuICBpZiAoaXNJbW11dGFibGUoY29sbGVjdGlvbikpIHtcbiAgICByZXR1cm4gdHlwZW9mIG1lcmdlciA9PT0gJ2Z1bmN0aW9uJyAmJiBjb2xsZWN0aW9uLm1lcmdlV2l0aFxuICAgICAgPyBjb2xsZWN0aW9uLm1lcmdlV2l0aC5hcHBseShjb2xsZWN0aW9uLCBbIG1lcmdlciBdLmNvbmNhdCggc291cmNlcyApKVxuICAgICAgOiBjb2xsZWN0aW9uLm1lcmdlXG4gICAgICAgID8gY29sbGVjdGlvbi5tZXJnZS5hcHBseShjb2xsZWN0aW9uLCBzb3VyY2VzKVxuICAgICAgICA6IGNvbGxlY3Rpb24uY29uY2F0LmFwcGx5KGNvbGxlY3Rpb24sIHNvdXJjZXMpO1xuICB9XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKTtcbiAgdmFyIG1lcmdlZCA9IGNvbGxlY3Rpb247XG4gIHZhciBDb2xsZWN0aW9uJCQxID0gaXNBcnJheSA/IEluZGV4ZWRDb2xsZWN0aW9uIDogS2V5ZWRDb2xsZWN0aW9uO1xuICB2YXIgbWVyZ2VJdGVtID0gaXNBcnJheVxuICAgID8gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIC8vIENvcHkgb24gd3JpdGVcbiAgICAgICAgaWYgKG1lcmdlZCA9PT0gY29sbGVjdGlvbikge1xuICAgICAgICAgIG1lcmdlZCA9IHNoYWxsb3dDb3B5KG1lcmdlZCk7XG4gICAgICAgIH1cbiAgICAgICAgbWVyZ2VkLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIDogZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgdmFyIGhhc1ZhbCA9IGhhc093blByb3BlcnR5LmNhbGwobWVyZ2VkLCBrZXkpO1xuICAgICAgICB2YXIgbmV4dFZhbCA9XG4gICAgICAgICAgaGFzVmFsICYmIG1lcmdlciA/IG1lcmdlcihtZXJnZWRba2V5XSwgdmFsdWUsIGtleSkgOiB2YWx1ZTtcbiAgICAgICAgaWYgKCFoYXNWYWwgfHwgbmV4dFZhbCAhPT0gbWVyZ2VkW2tleV0pIHtcbiAgICAgICAgICAvLyBDb3B5IG9uIHdyaXRlXG4gICAgICAgICAgaWYgKG1lcmdlZCA9PT0gY29sbGVjdGlvbikge1xuICAgICAgICAgICAgbWVyZ2VkID0gc2hhbGxvd0NvcHkobWVyZ2VkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVyZ2VkW2tleV0gPSBuZXh0VmFsO1xuICAgICAgICB9XG4gICAgICB9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICBDb2xsZWN0aW9uJCQxKHNvdXJjZXNbaV0pLmZvckVhY2gobWVyZ2VJdGVtKTtcbiAgfVxuICByZXR1cm4gbWVyZ2VkO1xufVxuXG5mdW5jdGlvbiBkZWVwTWVyZ2VyV2l0aChtZXJnZXIpIHtcbiAgZnVuY3Rpb24gZGVlcE1lcmdlcihvbGRWYWx1ZSwgbmV3VmFsdWUsIGtleSkge1xuICAgIHJldHVybiBpc0RhdGFTdHJ1Y3R1cmUob2xkVmFsdWUpICYmIGlzRGF0YVN0cnVjdHVyZShuZXdWYWx1ZSlcbiAgICAgID8gbWVyZ2VXaXRoU291cmNlcyhvbGRWYWx1ZSwgW25ld1ZhbHVlXSwgZGVlcE1lcmdlcilcbiAgICAgIDogbWVyZ2VyXG4gICAgICAgID8gbWVyZ2VyKG9sZFZhbHVlLCBuZXdWYWx1ZSwga2V5KVxuICAgICAgICA6IG5ld1ZhbHVlO1xuICB9XG4gIHJldHVybiBkZWVwTWVyZ2VyO1xufVxuXG5mdW5jdGlvbiBtZXJnZURlZXAkMSgpIHtcbiAgdmFyIGl0ZXJzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHdoaWxlICggbGVuLS0gKSBpdGVyc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gIHJldHVybiBtZXJnZURlZXBXaXRoU291cmNlcyh0aGlzLCBpdGVycyk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlRGVlcFdpdGgkMShtZXJnZXIpIHtcbiAgdmFyIGl0ZXJzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICB3aGlsZSAoIGxlbi0tID4gMCApIGl0ZXJzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gIHJldHVybiBtZXJnZURlZXBXaXRoU291cmNlcyh0aGlzLCBpdGVycywgbWVyZ2VyKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VJbihrZXlQYXRoKSB7XG4gIHZhciBpdGVycyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKCBsZW4tLSA+IDAgKSBpdGVyc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICByZXR1cm4gdXBkYXRlSW4odGhpcywga2V5UGF0aCwgZW1wdHlNYXAoKSwgZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG1lcmdlV2l0aFNvdXJjZXMobSwgaXRlcnMpOyB9KTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VEZWVwSW4oa2V5UGF0aCkge1xuICB2YXIgaXRlcnMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gIHdoaWxlICggbGVuLS0gPiAwICkgaXRlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cbiAgcmV0dXJuIHVwZGF0ZUluKHRoaXMsIGtleVBhdGgsIGVtcHR5TWFwKCksIGZ1bmN0aW9uIChtKSB7IHJldHVybiBtZXJnZURlZXBXaXRoU291cmNlcyhtLCBpdGVycyk7IH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gd2l0aE11dGF0aW9ucyhmbikge1xuICB2YXIgbXV0YWJsZSA9IHRoaXMuYXNNdXRhYmxlKCk7XG4gIGZuKG11dGFibGUpO1xuICByZXR1cm4gbXV0YWJsZS53YXNBbHRlcmVkKCkgPyBtdXRhYmxlLl9fZW5zdXJlT3duZXIodGhpcy5fX293bmVySUQpIDogdGhpcztcbn1cblxuZnVuY3Rpb24gYXNNdXRhYmxlKCkge1xuICByZXR1cm4gdGhpcy5fX293bmVySUQgPyB0aGlzIDogdGhpcy5fX2Vuc3VyZU93bmVyKG5ldyBPd25lcklEKCkpO1xufVxuXG5mdW5jdGlvbiBhc0ltbXV0YWJsZSgpIHtcbiAgcmV0dXJuIHRoaXMuX19lbnN1cmVPd25lcigpO1xufVxuXG5mdW5jdGlvbiB3YXNBbHRlcmVkKCkge1xuICByZXR1cm4gdGhpcy5fX2FsdGVyZWQ7XG59XG5cbnZhciBNYXAgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChLZXllZENvbGxlY3Rpb24kJDEpIHtcbiAgZnVuY3Rpb24gTWFwKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgID8gZW1wdHlNYXAoKVxuICAgICAgOiBpc01hcCh2YWx1ZSkgJiYgIWlzT3JkZXJlZCh2YWx1ZSlcbiAgICAgICAgPyB2YWx1ZVxuICAgICAgICA6IGVtcHR5TWFwKCkud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgICAgICB2YXIgaXRlciA9IEtleWVkQ29sbGVjdGlvbiQkMSh2YWx1ZSk7XG4gICAgICAgICAgICBhc3NlcnROb3RJbmZpbml0ZShpdGVyLnNpemUpO1xuICAgICAgICAgICAgaXRlci5mb3JFYWNoKGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBtYXAuc2V0KGssIHYpOyB9KTtcbiAgICAgICAgICB9KTtcbiAgfVxuXG4gIGlmICggS2V5ZWRDb2xsZWN0aW9uJCQxICkgTWFwLl9fcHJvdG9fXyA9IEtleWVkQ29sbGVjdGlvbiQkMTtcbiAgTWFwLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEtleWVkQ29sbGVjdGlvbiQkMSAmJiBLZXllZENvbGxlY3Rpb24kJDEucHJvdG90eXBlICk7XG4gIE1hcC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNYXA7XG5cbiAgTWFwLm9mID0gZnVuY3Rpb24gb2YgKCkge1xuICAgIHZhciBrZXlWYWx1ZXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkga2V5VmFsdWVzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICByZXR1cm4gZW1wdHlNYXAoKS53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5VmFsdWVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGlmIChpICsgMSA+PSBrZXlWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHZhbHVlIGZvciBrZXk6ICcgKyBrZXlWYWx1ZXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIG1hcC5zZXQoa2V5VmFsdWVzW2ldLCBrZXlWYWx1ZXNbaSArIDFdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBNYXAucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLl9fdG9TdHJpbmcoJ01hcCB7JywgJ30nKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIEFjY2Vzc1xuXG4gIE1hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChrLCBub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9yb290XG4gICAgICA/IHRoaXMuX3Jvb3QuZ2V0KDAsIHVuZGVmaW5lZCwgaywgbm90U2V0VmFsdWUpXG4gICAgICA6IG5vdFNldFZhbHVlO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgTW9kaWZpY2F0aW9uXG5cbiAgTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQgKGssIHYpIHtcbiAgICByZXR1cm4gdXBkYXRlTWFwKHRoaXMsIGssIHYpO1xuICB9O1xuXG4gIE1hcC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlIChrKSB7XG4gICAgcmV0dXJuIHVwZGF0ZU1hcCh0aGlzLCBrLCBOT1RfU0VUKTtcbiAgfTtcblxuICBNYXAucHJvdG90eXBlLmRlbGV0ZUFsbCA9IGZ1bmN0aW9uIGRlbGV0ZUFsbCAoa2V5cykge1xuICAgIHZhciBjb2xsZWN0aW9uID0gQ29sbGVjdGlvbihrZXlzKTtcblxuICAgIGlmIChjb2xsZWN0aW9uLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKG1hcCkge1xuICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIG1hcC5yZW1vdmUoa2V5KTsgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgTWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKHRoaXMuX19vd25lcklEKSB7XG4gICAgICB0aGlzLnNpemUgPSAwO1xuICAgICAgdGhpcy5fcm9vdCA9IG51bGw7XG4gICAgICB0aGlzLl9faGFzaCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX19hbHRlcmVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gZW1wdHlNYXAoKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIENvbXBvc2l0aW9uXG5cbiAgTWFwLnByb3RvdHlwZS5zb3J0ID0gZnVuY3Rpb24gc29ydCAoY29tcGFyYXRvcikge1xuICAgIC8vIExhdGUgYmluZGluZ1xuICAgIHJldHVybiBPcmRlcmVkTWFwKHNvcnRGYWN0b3J5KHRoaXMsIGNvbXBhcmF0b3IpKTtcbiAgfTtcblxuICBNYXAucHJvdG90eXBlLnNvcnRCeSA9IGZ1bmN0aW9uIHNvcnRCeSAobWFwcGVyLCBjb21wYXJhdG9yKSB7XG4gICAgLy8gTGF0ZSBiaW5kaW5nXG4gICAgcmV0dXJuIE9yZGVyZWRNYXAoc29ydEZhY3RvcnkodGhpcywgY29tcGFyYXRvciwgbWFwcGVyKSk7XG4gIH07XG5cbiAgTWFwLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiBtYXAgKG1hcHBlciwgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKG1hcCkge1xuICAgICAgbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgbWFwLnNldChrZXksIG1hcHBlci5jYWxsKGNvbnRleHQsIHZhbHVlLCBrZXksIG1hcCkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBNdXRhYmlsaXR5XG5cbiAgTWFwLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHJldHVybiBuZXcgTWFwSXRlcmF0b3IodGhpcywgdHlwZSwgcmV2ZXJzZSk7XG4gIH07XG5cbiAgTWFwLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgdGhpcy5fcm9vdCAmJlxuICAgICAgdGhpcy5fcm9vdC5pdGVyYXRlKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICBpdGVyYXRpb25zKys7XG4gICAgICAgIHJldHVybiBmbihlbnRyeVsxXSwgZW50cnlbMF0sIHRoaXMkMSk7XG4gICAgICB9LCByZXZlcnNlKTtcbiAgICByZXR1cm4gaXRlcmF0aW9ucztcbiAgfTtcblxuICBNYXAucHJvdG90eXBlLl9fZW5zdXJlT3duZXIgPSBmdW5jdGlvbiBfX2Vuc3VyZU93bmVyIChvd25lcklEKSB7XG4gICAgaWYgKG93bmVySUQgPT09IHRoaXMuX19vd25lcklEKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKCFvd25lcklEKSB7XG4gICAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICAgIHJldHVybiBlbXB0eU1hcCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX293bmVySUQgPSBvd25lcklEO1xuICAgICAgdGhpcy5fX2FsdGVyZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gbWFrZU1hcCh0aGlzLnNpemUsIHRoaXMuX3Jvb3QsIG93bmVySUQsIHRoaXMuX19oYXNoKTtcbiAgfTtcblxuICByZXR1cm4gTWFwO1xufShLZXllZENvbGxlY3Rpb24pKTtcblxuTWFwLmlzTWFwID0gaXNNYXA7XG5cbnZhciBNYXBQcm90b3R5cGUgPSBNYXAucHJvdG90eXBlO1xuTWFwUHJvdG90eXBlW0lTX01BUF9TWU1CT0xdID0gdHJ1ZTtcbk1hcFByb3RvdHlwZVtERUxFVEVdID0gTWFwUHJvdG90eXBlLnJlbW92ZTtcbk1hcFByb3RvdHlwZS5yZW1vdmVBbGwgPSBNYXBQcm90b3R5cGUuZGVsZXRlQWxsO1xuTWFwUHJvdG90eXBlLnNldEluID0gc2V0SW4kMTtcbk1hcFByb3RvdHlwZS5yZW1vdmVJbiA9IE1hcFByb3RvdHlwZS5kZWxldGVJbiA9IGRlbGV0ZUluO1xuTWFwUHJvdG90eXBlLnVwZGF0ZSA9IHVwZGF0ZSQxO1xuTWFwUHJvdG90eXBlLnVwZGF0ZUluID0gdXBkYXRlSW4kMTtcbk1hcFByb3RvdHlwZS5tZXJnZSA9IE1hcFByb3RvdHlwZS5jb25jYXQgPSBtZXJnZTtcbk1hcFByb3RvdHlwZS5tZXJnZVdpdGggPSBtZXJnZVdpdGg7XG5NYXBQcm90b3R5cGUubWVyZ2VEZWVwID0gbWVyZ2VEZWVwJDE7XG5NYXBQcm90b3R5cGUubWVyZ2VEZWVwV2l0aCA9IG1lcmdlRGVlcFdpdGgkMTtcbk1hcFByb3RvdHlwZS5tZXJnZUluID0gbWVyZ2VJbjtcbk1hcFByb3RvdHlwZS5tZXJnZURlZXBJbiA9IG1lcmdlRGVlcEluO1xuTWFwUHJvdG90eXBlLndpdGhNdXRhdGlvbnMgPSB3aXRoTXV0YXRpb25zO1xuTWFwUHJvdG90eXBlLndhc0FsdGVyZWQgPSB3YXNBbHRlcmVkO1xuTWFwUHJvdG90eXBlLmFzSW1tdXRhYmxlID0gYXNJbW11dGFibGU7XG5NYXBQcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBNYXBQcm90b3R5cGUuYXNNdXRhYmxlID0gYXNNdXRhYmxlO1xuTWFwUHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBhcnIpIHtcbiAgcmV0dXJuIHJlc3VsdC5zZXQoYXJyWzBdLCBhcnJbMV0pO1xufTtcbk1hcFByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmouYXNJbW11dGFibGUoKTtcbn07XG5cbi8vICNwcmFnbWEgVHJpZSBOb2Rlc1xuXG52YXIgQXJyYXlNYXBOb2RlID0gZnVuY3Rpb24gQXJyYXlNYXBOb2RlKG93bmVySUQsIGVudHJpZXMpIHtcbiAgdGhpcy5vd25lcklEID0gb3duZXJJRDtcbiAgdGhpcy5lbnRyaWVzID0gZW50cmllcztcbn07XG5cbkFycmF5TWFwTm9kZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChzaGlmdCwga2V5SGFzaCwga2V5LCBub3RTZXRWYWx1ZSkge1xuICB2YXIgZW50cmllcyA9IHRoaXMuZW50cmllcztcbiAgZm9yICh2YXIgaWkgPSAwLCBsZW4gPSBlbnRyaWVzLmxlbmd0aDsgaWkgPCBsZW47IGlpKyspIHtcbiAgICBpZiAoaXMoa2V5LCBlbnRyaWVzW2lpXVswXSkpIHtcbiAgICAgIHJldHVybiBlbnRyaWVzW2lpXVsxXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vdFNldFZhbHVlO1xufTtcblxuQXJyYXlNYXBOb2RlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKG93bmVySUQsIHNoaWZ0LCBrZXlIYXNoLCBrZXksIHZhbHVlLCBkaWRDaGFuZ2VTaXplLCBkaWRBbHRlcikge1xuICB2YXIgcmVtb3ZlZCA9IHZhbHVlID09PSBOT1RfU0VUO1xuXG4gIHZhciBlbnRyaWVzID0gdGhpcy5lbnRyaWVzO1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGVudHJpZXMubGVuZ3RoO1xuICBmb3IgKDsgaWR4IDwgbGVuOyBpZHgrKykge1xuICAgIGlmIChpcyhrZXksIGVudHJpZXNbaWR4XVswXSkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICB2YXIgZXhpc3RzID0gaWR4IDwgbGVuO1xuXG4gIGlmIChleGlzdHMgPyBlbnRyaWVzW2lkeF1bMV0gPT09IHZhbHVlIDogcmVtb3ZlZCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgU2V0UmVmKGRpZEFsdGVyKTtcbiAgKHJlbW92ZWQgfHwgIWV4aXN0cykgJiYgU2V0UmVmKGRpZENoYW5nZVNpemUpO1xuXG4gIGlmIChyZW1vdmVkICYmIGVudHJpZXMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuOyAvLyB1bmRlZmluZWRcbiAgfVxuXG4gIGlmICghZXhpc3RzICYmICFyZW1vdmVkICYmIGVudHJpZXMubGVuZ3RoID49IE1BWF9BUlJBWV9NQVBfU0laRSkge1xuICAgIHJldHVybiBjcmVhdGVOb2Rlcyhvd25lcklELCBlbnRyaWVzLCBrZXksIHZhbHVlKTtcbiAgfVxuXG4gIHZhciBpc0VkaXRhYmxlID0gb3duZXJJRCAmJiBvd25lcklEID09PSB0aGlzLm93bmVySUQ7XG4gIHZhciBuZXdFbnRyaWVzID0gaXNFZGl0YWJsZSA/IGVudHJpZXMgOiBhcnJDb3B5KGVudHJpZXMpO1xuXG4gIGlmIChleGlzdHMpIHtcbiAgICBpZiAocmVtb3ZlZCkge1xuICAgICAgaWR4ID09PSBsZW4gLSAxXG4gICAgICAgID8gbmV3RW50cmllcy5wb3AoKVxuICAgICAgICA6IChuZXdFbnRyaWVzW2lkeF0gPSBuZXdFbnRyaWVzLnBvcCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3RW50cmllc1tpZHhdID0gW2tleSwgdmFsdWVdO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBuZXdFbnRyaWVzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfVxuXG4gIGlmIChpc0VkaXRhYmxlKSB7XG4gICAgdGhpcy5lbnRyaWVzID0gbmV3RW50cmllcztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiBuZXcgQXJyYXlNYXBOb2RlKG93bmVySUQsIG5ld0VudHJpZXMpO1xufTtcblxudmFyIEJpdG1hcEluZGV4ZWROb2RlID0gZnVuY3Rpb24gQml0bWFwSW5kZXhlZE5vZGUob3duZXJJRCwgYml0bWFwLCBub2Rlcykge1xuICB0aGlzLm93bmVySUQgPSBvd25lcklEO1xuICB0aGlzLmJpdG1hcCA9IGJpdG1hcDtcbiAgdGhpcy5ub2RlcyA9IG5vZGVzO1xufTtcblxuQml0bWFwSW5kZXhlZE5vZGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoc2hpZnQsIGtleUhhc2gsIGtleSwgbm90U2V0VmFsdWUpIHtcbiAgaWYgKGtleUhhc2ggPT09IHVuZGVmaW5lZCkge1xuICAgIGtleUhhc2ggPSBoYXNoKGtleSk7XG4gIH1cbiAgdmFyIGJpdCA9IDEgPDwgKChzaGlmdCA9PT0gMCA/IGtleUhhc2ggOiBrZXlIYXNoID4+PiBzaGlmdCkgJiBNQVNLKTtcbiAgdmFyIGJpdG1hcCA9IHRoaXMuYml0bWFwO1xuICByZXR1cm4gKGJpdG1hcCAmIGJpdCkgPT09IDBcbiAgICA/IG5vdFNldFZhbHVlXG4gICAgOiB0aGlzLm5vZGVzW3BvcENvdW50KGJpdG1hcCAmIChiaXQgLSAxKSldLmdldChcbiAgICAgICAgc2hpZnQgKyBTSElGVCxcbiAgICAgICAga2V5SGFzaCxcbiAgICAgICAga2V5LFxuICAgICAgICBub3RTZXRWYWx1ZVxuICAgICAgKTtcbn07XG5cbkJpdG1hcEluZGV4ZWROb2RlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKG93bmVySUQsIHNoaWZ0LCBrZXlIYXNoLCBrZXksIHZhbHVlLCBkaWRDaGFuZ2VTaXplLCBkaWRBbHRlcikge1xuICBpZiAoa2V5SGFzaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAga2V5SGFzaCA9IGhhc2goa2V5KTtcbiAgfVxuICB2YXIga2V5SGFzaEZyYWcgPSAoc2hpZnQgPT09IDAgPyBrZXlIYXNoIDoga2V5SGFzaCA+Pj4gc2hpZnQpICYgTUFTSztcbiAgdmFyIGJpdCA9IDEgPDwga2V5SGFzaEZyYWc7XG4gIHZhciBiaXRtYXAgPSB0aGlzLmJpdG1hcDtcbiAgdmFyIGV4aXN0cyA9IChiaXRtYXAgJiBiaXQpICE9PSAwO1xuXG4gIGlmICghZXhpc3RzICYmIHZhbHVlID09PSBOT1RfU0VUKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgaWR4ID0gcG9wQ291bnQoYml0bWFwICYgKGJpdCAtIDEpKTtcbiAgdmFyIG5vZGVzID0gdGhpcy5ub2RlcztcbiAgdmFyIG5vZGUgPSBleGlzdHMgPyBub2Rlc1tpZHhdIDogdW5kZWZpbmVkO1xuICB2YXIgbmV3Tm9kZSA9IHVwZGF0ZU5vZGUoXG4gICAgbm9kZSxcbiAgICBvd25lcklELFxuICAgIHNoaWZ0ICsgU0hJRlQsXG4gICAga2V5SGFzaCxcbiAgICBrZXksXG4gICAgdmFsdWUsXG4gICAgZGlkQ2hhbmdlU2l6ZSxcbiAgICBkaWRBbHRlclxuICApO1xuXG4gIGlmIChuZXdOb2RlID09PSBub2RlKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoIWV4aXN0cyAmJiBuZXdOb2RlICYmIG5vZGVzLmxlbmd0aCA+PSBNQVhfQklUTUFQX0lOREVYRURfU0laRSkge1xuICAgIHJldHVybiBleHBhbmROb2Rlcyhvd25lcklELCBub2RlcywgYml0bWFwLCBrZXlIYXNoRnJhZywgbmV3Tm9kZSk7XG4gIH1cblxuICBpZiAoXG4gICAgZXhpc3RzICYmXG4gICAgIW5ld05vZGUgJiZcbiAgICBub2Rlcy5sZW5ndGggPT09IDIgJiZcbiAgICBpc0xlYWZOb2RlKG5vZGVzW2lkeCBeIDFdKVxuICApIHtcbiAgICByZXR1cm4gbm9kZXNbaWR4IF4gMV07XG4gIH1cblxuICBpZiAoZXhpc3RzICYmIG5ld05vZGUgJiYgbm9kZXMubGVuZ3RoID09PSAxICYmIGlzTGVhZk5vZGUobmV3Tm9kZSkpIHtcbiAgICByZXR1cm4gbmV3Tm9kZTtcbiAgfVxuXG4gIHZhciBpc0VkaXRhYmxlID0gb3duZXJJRCAmJiBvd25lcklEID09PSB0aGlzLm93bmVySUQ7XG4gIHZhciBuZXdCaXRtYXAgPSBleGlzdHMgPyAobmV3Tm9kZSA/IGJpdG1hcCA6IGJpdG1hcCBeIGJpdCkgOiBiaXRtYXAgfCBiaXQ7XG4gIHZhciBuZXdOb2RlcyA9IGV4aXN0c1xuICAgID8gbmV3Tm9kZVxuICAgICAgPyBzZXRBdChub2RlcywgaWR4LCBuZXdOb2RlLCBpc0VkaXRhYmxlKVxuICAgICAgOiBzcGxpY2VPdXQobm9kZXMsIGlkeCwgaXNFZGl0YWJsZSlcbiAgICA6IHNwbGljZUluKG5vZGVzLCBpZHgsIG5ld05vZGUsIGlzRWRpdGFibGUpO1xuXG4gIGlmIChpc0VkaXRhYmxlKSB7XG4gICAgdGhpcy5iaXRtYXAgPSBuZXdCaXRtYXA7XG4gICAgdGhpcy5ub2RlcyA9IG5ld05vZGVzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBCaXRtYXBJbmRleGVkTm9kZShvd25lcklELCBuZXdCaXRtYXAsIG5ld05vZGVzKTtcbn07XG5cbnZhciBIYXNoQXJyYXlNYXBOb2RlID0gZnVuY3Rpb24gSGFzaEFycmF5TWFwTm9kZShvd25lcklELCBjb3VudCwgbm9kZXMpIHtcbiAgdGhpcy5vd25lcklEID0gb3duZXJJRDtcbiAgdGhpcy5jb3VudCA9IGNvdW50O1xuICB0aGlzLm5vZGVzID0gbm9kZXM7XG59O1xuXG5IYXNoQXJyYXlNYXBOb2RlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKHNoaWZ0LCBrZXlIYXNoLCBrZXksIG5vdFNldFZhbHVlKSB7XG4gIGlmIChrZXlIYXNoID09PSB1bmRlZmluZWQpIHtcbiAgICBrZXlIYXNoID0gaGFzaChrZXkpO1xuICB9XG4gIHZhciBpZHggPSAoc2hpZnQgPT09IDAgPyBrZXlIYXNoIDoga2V5SGFzaCA+Pj4gc2hpZnQpICYgTUFTSztcbiAgdmFyIG5vZGUgPSB0aGlzLm5vZGVzW2lkeF07XG4gIHJldHVybiBub2RlXG4gICAgPyBub2RlLmdldChzaGlmdCArIFNISUZULCBrZXlIYXNoLCBrZXksIG5vdFNldFZhbHVlKVxuICAgIDogbm90U2V0VmFsdWU7XG59O1xuXG5IYXNoQXJyYXlNYXBOb2RlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKG93bmVySUQsIHNoaWZ0LCBrZXlIYXNoLCBrZXksIHZhbHVlLCBkaWRDaGFuZ2VTaXplLCBkaWRBbHRlcikge1xuICBpZiAoa2V5SGFzaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAga2V5SGFzaCA9IGhhc2goa2V5KTtcbiAgfVxuICB2YXIgaWR4ID0gKHNoaWZ0ID09PSAwID8ga2V5SGFzaCA6IGtleUhhc2ggPj4+IHNoaWZ0KSAmIE1BU0s7XG4gIHZhciByZW1vdmVkID0gdmFsdWUgPT09IE5PVF9TRVQ7XG4gIHZhciBub2RlcyA9IHRoaXMubm9kZXM7XG4gIHZhciBub2RlID0gbm9kZXNbaWR4XTtcblxuICBpZiAocmVtb3ZlZCAmJiAhbm9kZSkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIG5ld05vZGUgPSB1cGRhdGVOb2RlKFxuICAgIG5vZGUsXG4gICAgb3duZXJJRCxcbiAgICBzaGlmdCArIFNISUZULFxuICAgIGtleUhhc2gsXG4gICAga2V5LFxuICAgIHZhbHVlLFxuICAgIGRpZENoYW5nZVNpemUsXG4gICAgZGlkQWx0ZXJcbiAgKTtcbiAgaWYgKG5ld05vZGUgPT09IG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHZhciBuZXdDb3VudCA9IHRoaXMuY291bnQ7XG4gIGlmICghbm9kZSkge1xuICAgIG5ld0NvdW50Kys7XG4gIH0gZWxzZSBpZiAoIW5ld05vZGUpIHtcbiAgICBuZXdDb3VudC0tO1xuICAgIGlmIChuZXdDb3VudCA8IE1JTl9IQVNIX0FSUkFZX01BUF9TSVpFKSB7XG4gICAgICByZXR1cm4gcGFja05vZGVzKG93bmVySUQsIG5vZGVzLCBuZXdDb3VudCwgaWR4KTtcbiAgICB9XG4gIH1cblxuICB2YXIgaXNFZGl0YWJsZSA9IG93bmVySUQgJiYgb3duZXJJRCA9PT0gdGhpcy5vd25lcklEO1xuICB2YXIgbmV3Tm9kZXMgPSBzZXRBdChub2RlcywgaWR4LCBuZXdOb2RlLCBpc0VkaXRhYmxlKTtcblxuICBpZiAoaXNFZGl0YWJsZSkge1xuICAgIHRoaXMuY291bnQgPSBuZXdDb3VudDtcbiAgICB0aGlzLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gbmV3IEhhc2hBcnJheU1hcE5vZGUob3duZXJJRCwgbmV3Q291bnQsIG5ld05vZGVzKTtcbn07XG5cbnZhciBIYXNoQ29sbGlzaW9uTm9kZSA9IGZ1bmN0aW9uIEhhc2hDb2xsaXNpb25Ob2RlKG93bmVySUQsIGtleUhhc2gsIGVudHJpZXMpIHtcbiAgdGhpcy5vd25lcklEID0gb3duZXJJRDtcbiAgdGhpcy5rZXlIYXNoID0ga2V5SGFzaDtcbiAgdGhpcy5lbnRyaWVzID0gZW50cmllcztcbn07XG5cbkhhc2hDb2xsaXNpb25Ob2RlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKHNoaWZ0LCBrZXlIYXNoLCBrZXksIG5vdFNldFZhbHVlKSB7XG4gIHZhciBlbnRyaWVzID0gdGhpcy5lbnRyaWVzO1xuICBmb3IgKHZhciBpaSA9IDAsIGxlbiA9IGVudHJpZXMubGVuZ3RoOyBpaSA8IGxlbjsgaWkrKykge1xuICAgIGlmIChpcyhrZXksIGVudHJpZXNbaWldWzBdKSkge1xuICAgICAgcmV0dXJuIGVudHJpZXNbaWldWzFdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm90U2V0VmFsdWU7XG59O1xuXG5IYXNoQ29sbGlzaW9uTm9kZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlIChvd25lcklELCBzaGlmdCwga2V5SGFzaCwga2V5LCB2YWx1ZSwgZGlkQ2hhbmdlU2l6ZSwgZGlkQWx0ZXIpIHtcbiAgaWYgKGtleUhhc2ggPT09IHVuZGVmaW5lZCkge1xuICAgIGtleUhhc2ggPSBoYXNoKGtleSk7XG4gIH1cblxuICB2YXIgcmVtb3ZlZCA9IHZhbHVlID09PSBOT1RfU0VUO1xuXG4gIGlmIChrZXlIYXNoICE9PSB0aGlzLmtleUhhc2gpIHtcbiAgICBpZiAocmVtb3ZlZCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFNldFJlZihkaWRBbHRlcik7XG4gICAgU2V0UmVmKGRpZENoYW5nZVNpemUpO1xuICAgIHJldHVybiBtZXJnZUludG9Ob2RlKHRoaXMsIG93bmVySUQsIHNoaWZ0LCBrZXlIYXNoLCBba2V5LCB2YWx1ZV0pO1xuICB9XG5cbiAgdmFyIGVudHJpZXMgPSB0aGlzLmVudHJpZXM7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gZW50cmllcy5sZW5ndGg7XG4gIGZvciAoOyBpZHggPCBsZW47IGlkeCsrKSB7XG4gICAgaWYgKGlzKGtleSwgZW50cmllc1tpZHhdWzBdKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHZhciBleGlzdHMgPSBpZHggPCBsZW47XG5cbiAgaWYgKGV4aXN0cyA/IGVudHJpZXNbaWR4XVsxXSA9PT0gdmFsdWUgOiByZW1vdmVkKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBTZXRSZWYoZGlkQWx0ZXIpO1xuICAocmVtb3ZlZCB8fCAhZXhpc3RzKSAmJiBTZXRSZWYoZGlkQ2hhbmdlU2l6ZSk7XG5cbiAgaWYgKHJlbW92ZWQgJiYgbGVuID09PSAyKSB7XG4gICAgcmV0dXJuIG5ldyBWYWx1ZU5vZGUob3duZXJJRCwgdGhpcy5rZXlIYXNoLCBlbnRyaWVzW2lkeCBeIDFdKTtcbiAgfVxuXG4gIHZhciBpc0VkaXRhYmxlID0gb3duZXJJRCAmJiBvd25lcklEID09PSB0aGlzLm93bmVySUQ7XG4gIHZhciBuZXdFbnRyaWVzID0gaXNFZGl0YWJsZSA/IGVudHJpZXMgOiBhcnJDb3B5KGVudHJpZXMpO1xuXG4gIGlmIChleGlzdHMpIHtcbiAgICBpZiAocmVtb3ZlZCkge1xuICAgICAgaWR4ID09PSBsZW4gLSAxXG4gICAgICAgID8gbmV3RW50cmllcy5wb3AoKVxuICAgICAgICA6IChuZXdFbnRyaWVzW2lkeF0gPSBuZXdFbnRyaWVzLnBvcCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3RW50cmllc1tpZHhdID0gW2tleSwgdmFsdWVdO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBuZXdFbnRyaWVzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfVxuXG4gIGlmIChpc0VkaXRhYmxlKSB7XG4gICAgdGhpcy5lbnRyaWVzID0gbmV3RW50cmllcztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiBuZXcgSGFzaENvbGxpc2lvbk5vZGUob3duZXJJRCwgdGhpcy5rZXlIYXNoLCBuZXdFbnRyaWVzKTtcbn07XG5cbnZhciBWYWx1ZU5vZGUgPSBmdW5jdGlvbiBWYWx1ZU5vZGUob3duZXJJRCwga2V5SGFzaCwgZW50cnkpIHtcbiAgdGhpcy5vd25lcklEID0gb3duZXJJRDtcbiAgdGhpcy5rZXlIYXNoID0ga2V5SGFzaDtcbiAgdGhpcy5lbnRyeSA9IGVudHJ5O1xufTtcblxuVmFsdWVOb2RlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKHNoaWZ0LCBrZXlIYXNoLCBrZXksIG5vdFNldFZhbHVlKSB7XG4gIHJldHVybiBpcyhrZXksIHRoaXMuZW50cnlbMF0pID8gdGhpcy5lbnRyeVsxXSA6IG5vdFNldFZhbHVlO1xufTtcblxuVmFsdWVOb2RlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKG93bmVySUQsIHNoaWZ0LCBrZXlIYXNoLCBrZXksIHZhbHVlLCBkaWRDaGFuZ2VTaXplLCBkaWRBbHRlcikge1xuICB2YXIgcmVtb3ZlZCA9IHZhbHVlID09PSBOT1RfU0VUO1xuICB2YXIga2V5TWF0Y2ggPSBpcyhrZXksIHRoaXMuZW50cnlbMF0pO1xuICBpZiAoa2V5TWF0Y2ggPyB2YWx1ZSA9PT0gdGhpcy5lbnRyeVsxXSA6IHJlbW92ZWQpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIFNldFJlZihkaWRBbHRlcik7XG5cbiAgaWYgKHJlbW92ZWQpIHtcbiAgICBTZXRSZWYoZGlkQ2hhbmdlU2l6ZSk7XG4gICAgcmV0dXJuOyAvLyB1bmRlZmluZWRcbiAgfVxuXG4gIGlmIChrZXlNYXRjaCkge1xuICAgIGlmIChvd25lcklEICYmIG93bmVySUQgPT09IHRoaXMub3duZXJJRCkge1xuICAgICAgdGhpcy5lbnRyeVsxXSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBuZXcgVmFsdWVOb2RlKG93bmVySUQsIHRoaXMua2V5SGFzaCwgW2tleSwgdmFsdWVdKTtcbiAgfVxuXG4gIFNldFJlZihkaWRDaGFuZ2VTaXplKTtcbiAgcmV0dXJuIG1lcmdlSW50b05vZGUodGhpcywgb3duZXJJRCwgc2hpZnQsIGhhc2goa2V5KSwgW2tleSwgdmFsdWVdKTtcbn07XG5cbi8vICNwcmFnbWEgSXRlcmF0b3JzXG5cbkFycmF5TWFwTm9kZS5wcm90b3R5cGUuaXRlcmF0ZSA9IEhhc2hDb2xsaXNpb25Ob2RlLnByb3RvdHlwZS5pdGVyYXRlID0gZnVuY3Rpb24oXG4gIGZuLFxuICByZXZlcnNlXG4pIHtcbiAgdmFyIGVudHJpZXMgPSB0aGlzLmVudHJpZXM7XG4gIGZvciAodmFyIGlpID0gMCwgbWF4SW5kZXggPSBlbnRyaWVzLmxlbmd0aCAtIDE7IGlpIDw9IG1heEluZGV4OyBpaSsrKSB7XG4gICAgaWYgKGZuKGVudHJpZXNbcmV2ZXJzZSA/IG1heEluZGV4IC0gaWkgOiBpaV0pID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufTtcblxuQml0bWFwSW5kZXhlZE5vZGUucHJvdG90eXBlLml0ZXJhdGUgPSBIYXNoQXJyYXlNYXBOb2RlLnByb3RvdHlwZS5pdGVyYXRlID0gZnVuY3Rpb24oXG4gIGZuLFxuICByZXZlcnNlXG4pIHtcbiAgdmFyIG5vZGVzID0gdGhpcy5ub2RlcztcbiAgZm9yICh2YXIgaWkgPSAwLCBtYXhJbmRleCA9IG5vZGVzLmxlbmd0aCAtIDE7IGlpIDw9IG1heEluZGV4OyBpaSsrKSB7XG4gICAgdmFyIG5vZGUgPSBub2Rlc1tyZXZlcnNlID8gbWF4SW5kZXggLSBpaSA6IGlpXTtcbiAgICBpZiAobm9kZSAmJiBub2RlLml0ZXJhdGUoZm4sIHJldmVyc2UpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5WYWx1ZU5vZGUucHJvdG90eXBlLml0ZXJhdGUgPSBmdW5jdGlvbihmbiwgcmV2ZXJzZSkge1xuICByZXR1cm4gZm4odGhpcy5lbnRyeSk7XG59O1xuXG52YXIgTWFwSXRlcmF0b3IgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChJdGVyYXRvciQkMSkge1xuICBmdW5jdGlvbiBNYXBJdGVyYXRvcihtYXAsIHR5cGUsIHJldmVyc2UpIHtcbiAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICB0aGlzLl9yZXZlcnNlID0gcmV2ZXJzZTtcbiAgICB0aGlzLl9zdGFjayA9IG1hcC5fcm9vdCAmJiBtYXBJdGVyYXRvckZyYW1lKG1hcC5fcm9vdCk7XG4gIH1cblxuICBpZiAoIEl0ZXJhdG9yJCQxICkgTWFwSXRlcmF0b3IuX19wcm90b19fID0gSXRlcmF0b3IkJDE7XG4gIE1hcEl0ZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEl0ZXJhdG9yJCQxICYmIEl0ZXJhdG9yJCQxLnByb3RvdHlwZSApO1xuICBNYXBJdGVyYXRvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNYXBJdGVyYXRvcjtcblxuICBNYXBJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uIG5leHQgKCkge1xuICAgIHZhciB0eXBlID0gdGhpcy5fdHlwZTtcbiAgICB2YXIgc3RhY2sgPSB0aGlzLl9zdGFjaztcbiAgICB3aGlsZSAoc3RhY2spIHtcbiAgICAgIHZhciBub2RlID0gc3RhY2subm9kZTtcbiAgICAgIHZhciBpbmRleCA9IHN0YWNrLmluZGV4Kys7XG4gICAgICB2YXIgbWF4SW5kZXggPSAodm9pZCAwKTtcbiAgICAgIGlmIChub2RlLmVudHJ5KSB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBtYXBJdGVyYXRvclZhbHVlKHR5cGUsIG5vZGUuZW50cnkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5vZGUuZW50cmllcykge1xuICAgICAgICBtYXhJbmRleCA9IG5vZGUuZW50cmllcy5sZW5ndGggLSAxO1xuICAgICAgICBpZiAoaW5kZXggPD0gbWF4SW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gbWFwSXRlcmF0b3JWYWx1ZShcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICBub2RlLmVudHJpZXNbdGhpcy5fcmV2ZXJzZSA/IG1heEluZGV4IC0gaW5kZXggOiBpbmRleF1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXhJbmRleCA9IG5vZGUubm9kZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgaWYgKGluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgICAgICAgdmFyIHN1Yk5vZGUgPSBub2RlLm5vZGVzW3RoaXMuX3JldmVyc2UgPyBtYXhJbmRleCAtIGluZGV4IDogaW5kZXhdO1xuICAgICAgICAgIGlmIChzdWJOb2RlKSB7XG4gICAgICAgICAgICBpZiAoc3ViTm9kZS5lbnRyeSkge1xuICAgICAgICAgICAgICByZXR1cm4gbWFwSXRlcmF0b3JWYWx1ZSh0eXBlLCBzdWJOb2RlLmVudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YWNrID0gdGhpcy5fc3RhY2sgPSBtYXBJdGVyYXRvckZyYW1lKHN1Yk5vZGUsIHN0YWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN0YWNrID0gdGhpcy5fc3RhY2sgPSB0aGlzLl9zdGFjay5fX3ByZXY7XG4gICAgfVxuICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgfTtcblxuICByZXR1cm4gTWFwSXRlcmF0b3I7XG59KEl0ZXJhdG9yKSk7XG5cbmZ1bmN0aW9uIG1hcEl0ZXJhdG9yVmFsdWUodHlwZSwgZW50cnkpIHtcbiAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgZW50cnlbMF0sIGVudHJ5WzFdKTtcbn1cblxuZnVuY3Rpb24gbWFwSXRlcmF0b3JGcmFtZShub2RlLCBwcmV2KSB7XG4gIHJldHVybiB7XG4gICAgbm9kZTogbm9kZSxcbiAgICBpbmRleDogMCxcbiAgICBfX3ByZXY6IHByZXYsXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1ha2VNYXAoc2l6ZSwgcm9vdCwgb3duZXJJRCwgaGFzaCQkMSkge1xuICB2YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShNYXBQcm90b3R5cGUpO1xuICBtYXAuc2l6ZSA9IHNpemU7XG4gIG1hcC5fcm9vdCA9IHJvb3Q7XG4gIG1hcC5fX293bmVySUQgPSBvd25lcklEO1xuICBtYXAuX19oYXNoID0gaGFzaCQkMTtcbiAgbWFwLl9fYWx0ZXJlZCA9IGZhbHNlO1xuICByZXR1cm4gbWFwO1xufVxuXG52YXIgRU1QVFlfTUFQO1xuZnVuY3Rpb24gZW1wdHlNYXAoKSB7XG4gIHJldHVybiBFTVBUWV9NQVAgfHwgKEVNUFRZX01BUCA9IG1ha2VNYXAoMCkpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVNYXAobWFwLCBrLCB2KSB7XG4gIHZhciBuZXdSb290O1xuICB2YXIgbmV3U2l6ZTtcbiAgaWYgKCFtYXAuX3Jvb3QpIHtcbiAgICBpZiAodiA9PT0gTk9UX1NFVCkge1xuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG4gICAgbmV3U2l6ZSA9IDE7XG4gICAgbmV3Um9vdCA9IG5ldyBBcnJheU1hcE5vZGUobWFwLl9fb3duZXJJRCwgW1trLCB2XV0pO1xuICB9IGVsc2Uge1xuICAgIHZhciBkaWRDaGFuZ2VTaXplID0gTWFrZVJlZigpO1xuICAgIHZhciBkaWRBbHRlciA9IE1ha2VSZWYoKTtcbiAgICBuZXdSb290ID0gdXBkYXRlTm9kZShcbiAgICAgIG1hcC5fcm9vdCxcbiAgICAgIG1hcC5fX293bmVySUQsXG4gICAgICAwLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgayxcbiAgICAgIHYsXG4gICAgICBkaWRDaGFuZ2VTaXplLFxuICAgICAgZGlkQWx0ZXJcbiAgICApO1xuICAgIGlmICghZGlkQWx0ZXIudmFsdWUpIHtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuICAgIG5ld1NpemUgPSBtYXAuc2l6ZSArIChkaWRDaGFuZ2VTaXplLnZhbHVlID8gKHYgPT09IE5PVF9TRVQgPyAtMSA6IDEpIDogMCk7XG4gIH1cbiAgaWYgKG1hcC5fX293bmVySUQpIHtcbiAgICBtYXAuc2l6ZSA9IG5ld1NpemU7XG4gICAgbWFwLl9yb290ID0gbmV3Um9vdDtcbiAgICBtYXAuX19oYXNoID0gdW5kZWZpbmVkO1xuICAgIG1hcC5fX2FsdGVyZWQgPSB0cnVlO1xuICAgIHJldHVybiBtYXA7XG4gIH1cbiAgcmV0dXJuIG5ld1Jvb3QgPyBtYWtlTWFwKG5ld1NpemUsIG5ld1Jvb3QpIDogZW1wdHlNYXAoKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTm9kZShcbiAgbm9kZSxcbiAgb3duZXJJRCxcbiAgc2hpZnQsXG4gIGtleUhhc2gsXG4gIGtleSxcbiAgdmFsdWUsXG4gIGRpZENoYW5nZVNpemUsXG4gIGRpZEFsdGVyXG4pIHtcbiAgaWYgKCFub2RlKSB7XG4gICAgaWYgKHZhbHVlID09PSBOT1RfU0VUKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgU2V0UmVmKGRpZEFsdGVyKTtcbiAgICBTZXRSZWYoZGlkQ2hhbmdlU2l6ZSk7XG4gICAgcmV0dXJuIG5ldyBWYWx1ZU5vZGUob3duZXJJRCwga2V5SGFzaCwgW2tleSwgdmFsdWVdKTtcbiAgfVxuICByZXR1cm4gbm9kZS51cGRhdGUoXG4gICAgb3duZXJJRCxcbiAgICBzaGlmdCxcbiAgICBrZXlIYXNoLFxuICAgIGtleSxcbiAgICB2YWx1ZSxcbiAgICBkaWRDaGFuZ2VTaXplLFxuICAgIGRpZEFsdGVyXG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzTGVhZk5vZGUobm9kZSkge1xuICByZXR1cm4gKFxuICAgIG5vZGUuY29uc3RydWN0b3IgPT09IFZhbHVlTm9kZSB8fCBub2RlLmNvbnN0cnVjdG9yID09PSBIYXNoQ29sbGlzaW9uTm9kZVxuICApO1xufVxuXG5mdW5jdGlvbiBtZXJnZUludG9Ob2RlKG5vZGUsIG93bmVySUQsIHNoaWZ0LCBrZXlIYXNoLCBlbnRyeSkge1xuICBpZiAobm9kZS5rZXlIYXNoID09PSBrZXlIYXNoKSB7XG4gICAgcmV0dXJuIG5ldyBIYXNoQ29sbGlzaW9uTm9kZShvd25lcklELCBrZXlIYXNoLCBbbm9kZS5lbnRyeSwgZW50cnldKTtcbiAgfVxuXG4gIHZhciBpZHgxID0gKHNoaWZ0ID09PSAwID8gbm9kZS5rZXlIYXNoIDogbm9kZS5rZXlIYXNoID4+PiBzaGlmdCkgJiBNQVNLO1xuICB2YXIgaWR4MiA9IChzaGlmdCA9PT0gMCA/IGtleUhhc2ggOiBrZXlIYXNoID4+PiBzaGlmdCkgJiBNQVNLO1xuXG4gIHZhciBuZXdOb2RlO1xuICB2YXIgbm9kZXMgPVxuICAgIGlkeDEgPT09IGlkeDJcbiAgICAgID8gW21lcmdlSW50b05vZGUobm9kZSwgb3duZXJJRCwgc2hpZnQgKyBTSElGVCwga2V5SGFzaCwgZW50cnkpXVxuICAgICAgOiAoKG5ld05vZGUgPSBuZXcgVmFsdWVOb2RlKG93bmVySUQsIGtleUhhc2gsIGVudHJ5KSksXG4gICAgICAgIGlkeDEgPCBpZHgyID8gW25vZGUsIG5ld05vZGVdIDogW25ld05vZGUsIG5vZGVdKTtcblxuICByZXR1cm4gbmV3IEJpdG1hcEluZGV4ZWROb2RlKG93bmVySUQsICgxIDw8IGlkeDEpIHwgKDEgPDwgaWR4MiksIG5vZGVzKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTm9kZXMob3duZXJJRCwgZW50cmllcywga2V5LCB2YWx1ZSkge1xuICBpZiAoIW93bmVySUQpIHtcbiAgICBvd25lcklEID0gbmV3IE93bmVySUQoKTtcbiAgfVxuICB2YXIgbm9kZSA9IG5ldyBWYWx1ZU5vZGUob3duZXJJRCwgaGFzaChrZXkpLCBba2V5LCB2YWx1ZV0pO1xuICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgZW50cmllcy5sZW5ndGg7IGlpKyspIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2lpXTtcbiAgICBub2RlID0gbm9kZS51cGRhdGUob3duZXJJRCwgMCwgdW5kZWZpbmVkLCBlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG4gIHJldHVybiBub2RlO1xufVxuXG5mdW5jdGlvbiBwYWNrTm9kZXMob3duZXJJRCwgbm9kZXMsIGNvdW50LCBleGNsdWRpbmcpIHtcbiAgdmFyIGJpdG1hcCA9IDA7XG4gIHZhciBwYWNrZWRJSSA9IDA7XG4gIHZhciBwYWNrZWROb2RlcyA9IG5ldyBBcnJheShjb3VudCk7XG4gIGZvciAodmFyIGlpID0gMCwgYml0ID0gMSwgbGVuID0gbm9kZXMubGVuZ3RoOyBpaSA8IGxlbjsgaWkrKywgYml0IDw8PSAxKSB7XG4gICAgdmFyIG5vZGUgPSBub2Rlc1tpaV07XG4gICAgaWYgKG5vZGUgIT09IHVuZGVmaW5lZCAmJiBpaSAhPT0gZXhjbHVkaW5nKSB7XG4gICAgICBiaXRtYXAgfD0gYml0O1xuICAgICAgcGFja2VkTm9kZXNbcGFja2VkSUkrK10gPSBub2RlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IEJpdG1hcEluZGV4ZWROb2RlKG93bmVySUQsIGJpdG1hcCwgcGFja2VkTm9kZXMpO1xufVxuXG5mdW5jdGlvbiBleHBhbmROb2Rlcyhvd25lcklELCBub2RlcywgYml0bWFwLCBpbmNsdWRpbmcsIG5vZGUpIHtcbiAgdmFyIGNvdW50ID0gMDtcbiAgdmFyIGV4cGFuZGVkTm9kZXMgPSBuZXcgQXJyYXkoU0laRSk7XG4gIGZvciAodmFyIGlpID0gMDsgYml0bWFwICE9PSAwOyBpaSsrLCBiaXRtYXAgPj4+PSAxKSB7XG4gICAgZXhwYW5kZWROb2Rlc1tpaV0gPSBiaXRtYXAgJiAxID8gbm9kZXNbY291bnQrK10gOiB1bmRlZmluZWQ7XG4gIH1cbiAgZXhwYW5kZWROb2Rlc1tpbmNsdWRpbmddID0gbm9kZTtcbiAgcmV0dXJuIG5ldyBIYXNoQXJyYXlNYXBOb2RlKG93bmVySUQsIGNvdW50ICsgMSwgZXhwYW5kZWROb2Rlcyk7XG59XG5cbmZ1bmN0aW9uIHBvcENvdW50KHgpIHtcbiAgeCAtPSAoeCA+PiAxKSAmIDB4NTU1NTU1NTU7XG4gIHggPSAoeCAmIDB4MzMzMzMzMzMpICsgKCh4ID4+IDIpICYgMHgzMzMzMzMzMyk7XG4gIHggPSAoeCArICh4ID4+IDQpKSAmIDB4MGYwZjBmMGY7XG4gIHggKz0geCA+PiA4O1xuICB4ICs9IHggPj4gMTY7XG4gIHJldHVybiB4ICYgMHg3Zjtcbn1cblxuZnVuY3Rpb24gc2V0QXQoYXJyYXksIGlkeCwgdmFsLCBjYW5FZGl0KSB7XG4gIHZhciBuZXdBcnJheSA9IGNhbkVkaXQgPyBhcnJheSA6IGFyckNvcHkoYXJyYXkpO1xuICBuZXdBcnJheVtpZHhdID0gdmFsO1xuICByZXR1cm4gbmV3QXJyYXk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZUluKGFycmF5LCBpZHgsIHZhbCwgY2FuRWRpdCkge1xuICB2YXIgbmV3TGVuID0gYXJyYXkubGVuZ3RoICsgMTtcbiAgaWYgKGNhbkVkaXQgJiYgaWR4ICsgMSA9PT0gbmV3TGVuKSB7XG4gICAgYXJyYXlbaWR4XSA9IHZhbDtcbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cbiAgdmFyIG5ld0FycmF5ID0gbmV3IEFycmF5KG5ld0xlbik7XG4gIHZhciBhZnRlciA9IDA7XG4gIGZvciAodmFyIGlpID0gMDsgaWkgPCBuZXdMZW47IGlpKyspIHtcbiAgICBpZiAoaWkgPT09IGlkeCkge1xuICAgICAgbmV3QXJyYXlbaWldID0gdmFsO1xuICAgICAgYWZ0ZXIgPSAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3QXJyYXlbaWldID0gYXJyYXlbaWkgKyBhZnRlcl07XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdBcnJheTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT3V0KGFycmF5LCBpZHgsIGNhbkVkaXQpIHtcbiAgdmFyIG5ld0xlbiA9IGFycmF5Lmxlbmd0aCAtIDE7XG4gIGlmIChjYW5FZGl0ICYmIGlkeCA9PT0gbmV3TGVuKSB7XG4gICAgYXJyYXkucG9wKCk7XG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG4gIHZhciBuZXdBcnJheSA9IG5ldyBBcnJheShuZXdMZW4pO1xuICB2YXIgYWZ0ZXIgPSAwO1xuICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgbmV3TGVuOyBpaSsrKSB7XG4gICAgaWYgKGlpID09PSBpZHgpIHtcbiAgICAgIGFmdGVyID0gMTtcbiAgICB9XG4gICAgbmV3QXJyYXlbaWldID0gYXJyYXlbaWkgKyBhZnRlcl07XG4gIH1cbiAgcmV0dXJuIG5ld0FycmF5O1xufVxuXG52YXIgTUFYX0FSUkFZX01BUF9TSVpFID0gU0laRSAvIDQ7XG52YXIgTUFYX0JJVE1BUF9JTkRFWEVEX1NJWkUgPSBTSVpFIC8gMjtcbnZhciBNSU5fSEFTSF9BUlJBWV9NQVBfU0laRSA9IFNJWkUgLyA0O1xuXG52YXIgSVNfTElTVF9TWU1CT0wgPSAnQEBfX0lNTVVUQUJMRV9MSVNUX19AQCc7XG5cbmZ1bmN0aW9uIGlzTGlzdChtYXliZUxpc3QpIHtcbiAgcmV0dXJuIEJvb2xlYW4obWF5YmVMaXN0ICYmIG1heWJlTGlzdFtJU19MSVNUX1NZTUJPTF0pO1xufVxuXG52YXIgTGlzdCA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEluZGV4ZWRDb2xsZWN0aW9uJCQxKSB7XG4gIGZ1bmN0aW9uIExpc3QodmFsdWUpIHtcbiAgICB2YXIgZW1wdHkgPSBlbXB0eUxpc3QoKTtcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGVtcHR5O1xuICAgIH1cbiAgICBpZiAoaXNMaXN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICB2YXIgaXRlciA9IEluZGV4ZWRDb2xsZWN0aW9uJCQxKHZhbHVlKTtcbiAgICB2YXIgc2l6ZSA9IGl0ZXIuc2l6ZTtcbiAgICBpZiAoc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIGVtcHR5O1xuICAgIH1cbiAgICBhc3NlcnROb3RJbmZpbml0ZShzaXplKTtcbiAgICBpZiAoc2l6ZSA+IDAgJiYgc2l6ZSA8IFNJWkUpIHtcbiAgICAgIHJldHVybiBtYWtlTGlzdCgwLCBzaXplLCBTSElGVCwgbnVsbCwgbmV3IFZOb2RlKGl0ZXIudG9BcnJheSgpKSk7XG4gICAgfVxuICAgIHJldHVybiBlbXB0eS53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICBsaXN0LnNldFNpemUoc2l6ZSk7XG4gICAgICBpdGVyLmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHsgcmV0dXJuIGxpc3Quc2V0KGksIHYpOyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmICggSW5kZXhlZENvbGxlY3Rpb24kJDEgKSBMaXN0Ll9fcHJvdG9fXyA9IEluZGV4ZWRDb2xsZWN0aW9uJCQxO1xuICBMaXN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEluZGV4ZWRDb2xsZWN0aW9uJCQxICYmIEluZGV4ZWRDb2xsZWN0aW9uJCQxLnByb3RvdHlwZSApO1xuICBMaXN0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExpc3Q7XG5cbiAgTGlzdC5vZiA9IGZ1bmN0aW9uIG9mICgvKi4uLnZhbHVlcyovKSB7XG4gICAgcmV0dXJuIHRoaXMoYXJndW1lbnRzKTtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RvU3RyaW5nKCdMaXN0IFsnLCAnXScpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgQWNjZXNzXG5cbiAgTGlzdC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChpbmRleCwgbm90U2V0VmFsdWUpIHtcbiAgICBpbmRleCA9IHdyYXBJbmRleCh0aGlzLCBpbmRleCk7XG4gICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLnNpemUpIHtcbiAgICAgIGluZGV4ICs9IHRoaXMuX29yaWdpbjtcbiAgICAgIHZhciBub2RlID0gbGlzdE5vZGVGb3IodGhpcywgaW5kZXgpO1xuICAgICAgcmV0dXJuIG5vZGUgJiYgbm9kZS5hcnJheVtpbmRleCAmIE1BU0tdO1xuICAgIH1cbiAgICByZXR1cm4gbm90U2V0VmFsdWU7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBNb2RpZmljYXRpb25cblxuICBMaXN0LnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQgKGluZGV4LCB2YWx1ZSkge1xuICAgIHJldHVybiB1cGRhdGVMaXN0KHRoaXMsIGluZGV4LCB2YWx1ZSk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlIChpbmRleCkge1xuICAgIHJldHVybiAhdGhpcy5oYXMoaW5kZXgpXG4gICAgICA/IHRoaXNcbiAgICAgIDogaW5kZXggPT09IDBcbiAgICAgICAgPyB0aGlzLnNoaWZ0KClcbiAgICAgICAgOiBpbmRleCA9PT0gdGhpcy5zaXplIC0gMVxuICAgICAgICAgID8gdGhpcy5wb3AoKVxuICAgICAgICAgIDogdGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIGluc2VydCAoaW5kZXgsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuc3BsaWNlKGluZGV4LCAwLCB2YWx1ZSk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3duZXJJRCkge1xuICAgICAgdGhpcy5zaXplID0gdGhpcy5fb3JpZ2luID0gdGhpcy5fY2FwYWNpdHkgPSAwO1xuICAgICAgdGhpcy5fbGV2ZWwgPSBTSElGVDtcbiAgICAgIHRoaXMuX3Jvb3QgPSB0aGlzLl90YWlsID0gbnVsbDtcbiAgICAgIHRoaXMuX19oYXNoID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fX2FsdGVyZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBlbXB0eUxpc3QoKTtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gcHVzaCAoLyouLi52YWx1ZXMqLykge1xuICAgIHZhciB2YWx1ZXMgPSBhcmd1bWVudHM7XG4gICAgdmFyIG9sZFNpemUgPSB0aGlzLnNpemU7XG4gICAgcmV0dXJuIHRoaXMud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobGlzdCkge1xuICAgICAgc2V0TGlzdEJvdW5kcyhsaXN0LCAwLCBvbGRTaXplICsgdmFsdWVzLmxlbmd0aCk7XG4gICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgdmFsdWVzLmxlbmd0aDsgaWkrKykge1xuICAgICAgICBsaXN0LnNldChvbGRTaXplICsgaWksIHZhbHVlc1tpaV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLnBvcCA9IGZ1bmN0aW9uIHBvcCAoKSB7XG4gICAgcmV0dXJuIHNldExpc3RCb3VuZHModGhpcywgMCwgLTEpO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLnVuc2hpZnQgPSBmdW5jdGlvbiB1bnNoaWZ0ICgvKi4uLnZhbHVlcyovKSB7XG4gICAgdmFyIHZhbHVlcyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gdGhpcy53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICBzZXRMaXN0Qm91bmRzKGxpc3QsIC12YWx1ZXMubGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCB2YWx1ZXMubGVuZ3RoOyBpaSsrKSB7XG4gICAgICAgIGxpc3Quc2V0KGlpLCB2YWx1ZXNbaWldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS5zaGlmdCA9IGZ1bmN0aW9uIHNoaWZ0ICgpIHtcbiAgICByZXR1cm4gc2V0TGlzdEJvdW5kcyh0aGlzLCAxKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIENvbXBvc2l0aW9uXG5cbiAgTGlzdC5wcm90b3R5cGUuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0ICgvKi4uLmNvbGxlY3Rpb25zKi8pIHtcbiAgICB2YXIgYXJndW1lbnRzJDEgPSBhcmd1bWVudHM7XG5cbiAgICB2YXIgc2VxcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYXJndW1lbnQgPSBhcmd1bWVudHMkMVtpXTtcbiAgICAgIHZhciBzZXEgPSBJbmRleGVkQ29sbGVjdGlvbiQkMShcbiAgICAgICAgdHlwZW9mIGFyZ3VtZW50ICE9PSAnc3RyaW5nJyAmJiBoYXNJdGVyYXRvcihhcmd1bWVudClcbiAgICAgICAgICA/IGFyZ3VtZW50XG4gICAgICAgICAgOiBbYXJndW1lbnRdXG4gICAgICApO1xuICAgICAgaWYgKHNlcS5zaXplICE9PSAwKSB7XG4gICAgICAgIHNlcXMucHVzaChzZXEpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2Vxcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaXplID09PSAwICYmICF0aGlzLl9fb3duZXJJRCAmJiBzZXFzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3Ioc2Vxc1swXSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgIHNlcXMuZm9yRWFjaChmdW5jdGlvbiAoc2VxKSB7IHJldHVybiBzZXEuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGxpc3QucHVzaCh2YWx1ZSk7IH0pOyB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZSAoc2l6ZSkge1xuICAgIHJldHVybiBzZXRMaXN0Qm91bmRzKHRoaXMsIDAsIHNpemUpO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIG1hcCAobWFwcGVyLCBjb250ZXh0KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcy53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMkMS5zaXplOyBpKyspIHtcbiAgICAgICAgbGlzdC5zZXQoaSwgbWFwcGVyLmNhbGwoY29udGV4dCwgbGlzdC5nZXQoaSksIGksIGxpc3QpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIEl0ZXJhdGlvblxuXG4gIExpc3QucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKGJlZ2luLCBlbmQpIHtcbiAgICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICBpZiAod2hvbGVTbGljZShiZWdpbiwgZW5kLCBzaXplKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBzZXRMaXN0Qm91bmRzKFxuICAgICAgdGhpcyxcbiAgICAgIHJlc29sdmVCZWdpbihiZWdpbiwgc2l6ZSksXG4gICAgICByZXNvbHZlRW5kKGVuZCwgc2l6ZSlcbiAgICApO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIGluZGV4ID0gcmV2ZXJzZSA/IHRoaXMuc2l6ZSA6IDA7XG4gICAgdmFyIHZhbHVlcyA9IGl0ZXJhdGVMaXN0KHRoaXMsIHJldmVyc2UpO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHZhbHVlID0gdmFsdWVzKCk7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IERPTkVcbiAgICAgICAgPyBpdGVyYXRvckRvbmUoKVxuICAgICAgICA6IGl0ZXJhdG9yVmFsdWUodHlwZSwgcmV2ZXJzZSA/IC0taW5kZXggOiBpbmRleCsrLCB2YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciBpbmRleCA9IHJldmVyc2UgPyB0aGlzLnNpemUgOiAwO1xuICAgIHZhciB2YWx1ZXMgPSBpdGVyYXRlTGlzdCh0aGlzLCByZXZlcnNlKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgd2hpbGUgKCh2YWx1ZSA9IHZhbHVlcygpKSAhPT0gRE9ORSkge1xuICAgICAgaWYgKGZuKHZhbHVlLCByZXZlcnNlID8gLS1pbmRleCA6IGluZGV4KyssIHRoaXMpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluZGV4O1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLl9fZW5zdXJlT3duZXIgPSBmdW5jdGlvbiBfX2Vuc3VyZU93bmVyIChvd25lcklEKSB7XG4gICAgaWYgKG93bmVySUQgPT09IHRoaXMuX19vd25lcklEKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKCFvd25lcklEKSB7XG4gICAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICAgIHJldHVybiBlbXB0eUxpc3QoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19vd25lcklEID0gb3duZXJJRDtcbiAgICAgIHRoaXMuX19hbHRlcmVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VMaXN0KFxuICAgICAgdGhpcy5fb3JpZ2luLFxuICAgICAgdGhpcy5fY2FwYWNpdHksXG4gICAgICB0aGlzLl9sZXZlbCxcbiAgICAgIHRoaXMuX3Jvb3QsXG4gICAgICB0aGlzLl90YWlsLFxuICAgICAgb3duZXJJRCxcbiAgICAgIHRoaXMuX19oYXNoXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gTGlzdDtcbn0oSW5kZXhlZENvbGxlY3Rpb24pKTtcblxuTGlzdC5pc0xpc3QgPSBpc0xpc3Q7XG5cbnZhciBMaXN0UHJvdG90eXBlID0gTGlzdC5wcm90b3R5cGU7XG5MaXN0UHJvdG90eXBlW0lTX0xJU1RfU1lNQk9MXSA9IHRydWU7XG5MaXN0UHJvdG90eXBlW0RFTEVURV0gPSBMaXN0UHJvdG90eXBlLnJlbW92ZTtcbkxpc3RQcm90b3R5cGUubWVyZ2UgPSBMaXN0UHJvdG90eXBlLmNvbmNhdDtcbkxpc3RQcm90b3R5cGUuc2V0SW4gPSBzZXRJbiQxO1xuTGlzdFByb3RvdHlwZS5kZWxldGVJbiA9IExpc3RQcm90b3R5cGUucmVtb3ZlSW4gPSBkZWxldGVJbjtcbkxpc3RQcm90b3R5cGUudXBkYXRlID0gdXBkYXRlJDE7XG5MaXN0UHJvdG90eXBlLnVwZGF0ZUluID0gdXBkYXRlSW4kMTtcbkxpc3RQcm90b3R5cGUubWVyZ2VJbiA9IG1lcmdlSW47XG5MaXN0UHJvdG90eXBlLm1lcmdlRGVlcEluID0gbWVyZ2VEZWVwSW47XG5MaXN0UHJvdG90eXBlLndpdGhNdXRhdGlvbnMgPSB3aXRoTXV0YXRpb25zO1xuTGlzdFByb3RvdHlwZS53YXNBbHRlcmVkID0gd2FzQWx0ZXJlZDtcbkxpc3RQcm90b3R5cGUuYXNJbW11dGFibGUgPSBhc0ltbXV0YWJsZTtcbkxpc3RQcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBMaXN0UHJvdG90eXBlLmFzTXV0YWJsZSA9IGFzTXV0YWJsZTtcbkxpc3RQcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGFycikge1xuICByZXR1cm4gcmVzdWx0LnB1c2goYXJyKTtcbn07XG5MaXN0UHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iai5hc0ltbXV0YWJsZSgpO1xufTtcblxudmFyIFZOb2RlID0gZnVuY3Rpb24gVk5vZGUoYXJyYXksIG93bmVySUQpIHtcbiAgdGhpcy5hcnJheSA9IGFycmF5O1xuICB0aGlzLm93bmVySUQgPSBvd25lcklEO1xufTtcblxuLy8gVE9ETzogc2VlbXMgbGlrZSB0aGVzZSBtZXRob2RzIGFyZSB2ZXJ5IHNpbWlsYXJcblxuVk5vZGUucHJvdG90eXBlLnJlbW92ZUJlZm9yZSA9IGZ1bmN0aW9uIHJlbW92ZUJlZm9yZSAob3duZXJJRCwgbGV2ZWwsIGluZGV4KSB7XG4gIGlmIChpbmRleCA9PT0gbGV2ZWwgPyAxIDw8IGxldmVsIDogdGhpcy5hcnJheS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB2YXIgb3JpZ2luSW5kZXggPSAoaW5kZXggPj4+IGxldmVsKSAmIE1BU0s7XG4gIGlmIChvcmlnaW5JbmRleCA+PSB0aGlzLmFycmF5Lmxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgVk5vZGUoW10sIG93bmVySUQpO1xuICB9XG4gIHZhciByZW1vdmluZ0ZpcnN0ID0gb3JpZ2luSW5kZXggPT09IDA7XG4gIHZhciBuZXdDaGlsZDtcbiAgaWYgKGxldmVsID4gMCkge1xuICAgIHZhciBvbGRDaGlsZCA9IHRoaXMuYXJyYXlbb3JpZ2luSW5kZXhdO1xuICAgIG5ld0NoaWxkID1cbiAgICAgIG9sZENoaWxkICYmIG9sZENoaWxkLnJlbW92ZUJlZm9yZShvd25lcklELCBsZXZlbCAtIFNISUZULCBpbmRleCk7XG4gICAgaWYgKG5ld0NoaWxkID09PSBvbGRDaGlsZCAmJiByZW1vdmluZ0ZpcnN0KSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cbiAgaWYgKHJlbW92aW5nRmlyc3QgJiYgIW5ld0NoaWxkKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdmFyIGVkaXRhYmxlID0gZWRpdGFibGVWTm9kZSh0aGlzLCBvd25lcklEKTtcbiAgaWYgKCFyZW1vdmluZ0ZpcnN0KSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IG9yaWdpbkluZGV4OyBpaSsrKSB7XG4gICAgICBlZGl0YWJsZS5hcnJheVtpaV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG4gIGlmIChuZXdDaGlsZCkge1xuICAgIGVkaXRhYmxlLmFycmF5W29yaWdpbkluZGV4XSA9IG5ld0NoaWxkO1xuICB9XG4gIHJldHVybiBlZGl0YWJsZTtcbn07XG5cblZOb2RlLnByb3RvdHlwZS5yZW1vdmVBZnRlciA9IGZ1bmN0aW9uIHJlbW92ZUFmdGVyIChvd25lcklELCBsZXZlbCwgaW5kZXgpIHtcbiAgaWYgKGluZGV4ID09PSAobGV2ZWwgPyAxIDw8IGxldmVsIDogMCkgfHwgdGhpcy5hcnJheS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB2YXIgc2l6ZUluZGV4ID0gKChpbmRleCAtIDEpID4+PiBsZXZlbCkgJiBNQVNLO1xuICBpZiAoc2l6ZUluZGV4ID49IHRoaXMuYXJyYXkubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgbmV3Q2hpbGQ7XG4gIGlmIChsZXZlbCA+IDApIHtcbiAgICB2YXIgb2xkQ2hpbGQgPSB0aGlzLmFycmF5W3NpemVJbmRleF07XG4gICAgbmV3Q2hpbGQgPVxuICAgICAgb2xkQ2hpbGQgJiYgb2xkQ2hpbGQucmVtb3ZlQWZ0ZXIob3duZXJJRCwgbGV2ZWwgLSBTSElGVCwgaW5kZXgpO1xuICAgIGlmIChuZXdDaGlsZCA9PT0gb2xkQ2hpbGQgJiYgc2l6ZUluZGV4ID09PSB0aGlzLmFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIHZhciBlZGl0YWJsZSA9IGVkaXRhYmxlVk5vZGUodGhpcywgb3duZXJJRCk7XG4gIGVkaXRhYmxlLmFycmF5LnNwbGljZShzaXplSW5kZXggKyAxKTtcbiAgaWYgKG5ld0NoaWxkKSB7XG4gICAgZWRpdGFibGUuYXJyYXlbc2l6ZUluZGV4XSA9IG5ld0NoaWxkO1xuICB9XG4gIHJldHVybiBlZGl0YWJsZTtcbn07XG5cbnZhciBET05FID0ge307XG5cbmZ1bmN0aW9uIGl0ZXJhdGVMaXN0KGxpc3QsIHJldmVyc2UpIHtcbiAgdmFyIGxlZnQgPSBsaXN0Ll9vcmlnaW47XG4gIHZhciByaWdodCA9IGxpc3QuX2NhcGFjaXR5O1xuICB2YXIgdGFpbFBvcyA9IGdldFRhaWxPZmZzZXQocmlnaHQpO1xuICB2YXIgdGFpbCA9IGxpc3QuX3RhaWw7XG5cbiAgcmV0dXJuIGl0ZXJhdGVOb2RlT3JMZWFmKGxpc3QuX3Jvb3QsIGxpc3QuX2xldmVsLCAwKTtcblxuICBmdW5jdGlvbiBpdGVyYXRlTm9kZU9yTGVhZihub2RlLCBsZXZlbCwgb2Zmc2V0KSB7XG4gICAgcmV0dXJuIGxldmVsID09PSAwXG4gICAgICA/IGl0ZXJhdGVMZWFmKG5vZGUsIG9mZnNldClcbiAgICAgIDogaXRlcmF0ZU5vZGUobm9kZSwgbGV2ZWwsIG9mZnNldCk7XG4gIH1cblxuICBmdW5jdGlvbiBpdGVyYXRlTGVhZihub2RlLCBvZmZzZXQpIHtcbiAgICB2YXIgYXJyYXkgPSBvZmZzZXQgPT09IHRhaWxQb3MgPyB0YWlsICYmIHRhaWwuYXJyYXkgOiBub2RlICYmIG5vZGUuYXJyYXk7XG4gICAgdmFyIGZyb20gPSBvZmZzZXQgPiBsZWZ0ID8gMCA6IGxlZnQgLSBvZmZzZXQ7XG4gICAgdmFyIHRvID0gcmlnaHQgLSBvZmZzZXQ7XG4gICAgaWYgKHRvID4gU0laRSkge1xuICAgICAgdG8gPSBTSVpFO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGZyb20gPT09IHRvKSB7XG4gICAgICAgIHJldHVybiBET05FO1xuICAgICAgfVxuICAgICAgdmFyIGlkeCA9IHJldmVyc2UgPyAtLXRvIDogZnJvbSsrO1xuICAgICAgcmV0dXJuIGFycmF5ICYmIGFycmF5W2lkeF07XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGl0ZXJhdGVOb2RlKG5vZGUsIGxldmVsLCBvZmZzZXQpIHtcbiAgICB2YXIgdmFsdWVzO1xuICAgIHZhciBhcnJheSA9IG5vZGUgJiYgbm9kZS5hcnJheTtcbiAgICB2YXIgZnJvbSA9IG9mZnNldCA+IGxlZnQgPyAwIDogKGxlZnQgLSBvZmZzZXQpID4+IGxldmVsO1xuICAgIHZhciB0byA9ICgocmlnaHQgLSBvZmZzZXQpID4+IGxldmVsKSArIDE7XG4gICAgaWYgKHRvID4gU0laRSkge1xuICAgICAgdG8gPSBTSVpFO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlcygpO1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gRE9ORSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZXMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcm9tID09PSB0bykge1xuICAgICAgICAgIHJldHVybiBET05FO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpZHggPSByZXZlcnNlID8gLS10byA6IGZyb20rKztcbiAgICAgICAgdmFsdWVzID0gaXRlcmF0ZU5vZGVPckxlYWYoXG4gICAgICAgICAgYXJyYXkgJiYgYXJyYXlbaWR4XSxcbiAgICAgICAgICBsZXZlbCAtIFNISUZULFxuICAgICAgICAgIG9mZnNldCArIChpZHggPDwgbGV2ZWwpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlTGlzdChvcmlnaW4sIGNhcGFjaXR5LCBsZXZlbCwgcm9vdCwgdGFpbCwgb3duZXJJRCwgaGFzaCkge1xuICB2YXIgbGlzdCA9IE9iamVjdC5jcmVhdGUoTGlzdFByb3RvdHlwZSk7XG4gIGxpc3Quc2l6ZSA9IGNhcGFjaXR5IC0gb3JpZ2luO1xuICBsaXN0Ll9vcmlnaW4gPSBvcmlnaW47XG4gIGxpc3QuX2NhcGFjaXR5ID0gY2FwYWNpdHk7XG4gIGxpc3QuX2xldmVsID0gbGV2ZWw7XG4gIGxpc3QuX3Jvb3QgPSByb290O1xuICBsaXN0Ll90YWlsID0gdGFpbDtcbiAgbGlzdC5fX293bmVySUQgPSBvd25lcklEO1xuICBsaXN0Ll9faGFzaCA9IGhhc2g7XG4gIGxpc3QuX19hbHRlcmVkID0gZmFsc2U7XG4gIHJldHVybiBsaXN0O1xufVxuXG52YXIgRU1QVFlfTElTVDtcbmZ1bmN0aW9uIGVtcHR5TGlzdCgpIHtcbiAgcmV0dXJuIEVNUFRZX0xJU1QgfHwgKEVNUFRZX0xJU1QgPSBtYWtlTGlzdCgwLCAwLCBTSElGVCkpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVMaXN0KGxpc3QsIGluZGV4LCB2YWx1ZSkge1xuICBpbmRleCA9IHdyYXBJbmRleChsaXN0LCBpbmRleCk7XG5cbiAgaWYgKGluZGV4ICE9PSBpbmRleCkge1xuICAgIHJldHVybiBsaXN0O1xuICB9XG5cbiAgaWYgKGluZGV4ID49IGxpc3Quc2l6ZSB8fCBpbmRleCA8IDApIHtcbiAgICByZXR1cm4gbGlzdC53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICBpbmRleCA8IDBcbiAgICAgICAgPyBzZXRMaXN0Qm91bmRzKGxpc3QsIGluZGV4KS5zZXQoMCwgdmFsdWUpXG4gICAgICAgIDogc2V0TGlzdEJvdW5kcyhsaXN0LCAwLCBpbmRleCArIDEpLnNldChpbmRleCwgdmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5kZXggKz0gbGlzdC5fb3JpZ2luO1xuXG4gIHZhciBuZXdUYWlsID0gbGlzdC5fdGFpbDtcbiAgdmFyIG5ld1Jvb3QgPSBsaXN0Ll9yb290O1xuICB2YXIgZGlkQWx0ZXIgPSBNYWtlUmVmKCk7XG4gIGlmIChpbmRleCA+PSBnZXRUYWlsT2Zmc2V0KGxpc3QuX2NhcGFjaXR5KSkge1xuICAgIG5ld1RhaWwgPSB1cGRhdGVWTm9kZShuZXdUYWlsLCBsaXN0Ll9fb3duZXJJRCwgMCwgaW5kZXgsIHZhbHVlLCBkaWRBbHRlcik7XG4gIH0gZWxzZSB7XG4gICAgbmV3Um9vdCA9IHVwZGF0ZVZOb2RlKFxuICAgICAgbmV3Um9vdCxcbiAgICAgIGxpc3QuX19vd25lcklELFxuICAgICAgbGlzdC5fbGV2ZWwsXG4gICAgICBpbmRleCxcbiAgICAgIHZhbHVlLFxuICAgICAgZGlkQWx0ZXJcbiAgICApO1xuICB9XG5cbiAgaWYgKCFkaWRBbHRlci52YWx1ZSkge1xuICAgIHJldHVybiBsaXN0O1xuICB9XG5cbiAgaWYgKGxpc3QuX19vd25lcklEKSB7XG4gICAgbGlzdC5fcm9vdCA9IG5ld1Jvb3Q7XG4gICAgbGlzdC5fdGFpbCA9IG5ld1RhaWw7XG4gICAgbGlzdC5fX2hhc2ggPSB1bmRlZmluZWQ7XG4gICAgbGlzdC5fX2FsdGVyZWQgPSB0cnVlO1xuICAgIHJldHVybiBsaXN0O1xuICB9XG4gIHJldHVybiBtYWtlTGlzdChsaXN0Ll9vcmlnaW4sIGxpc3QuX2NhcGFjaXR5LCBsaXN0Ll9sZXZlbCwgbmV3Um9vdCwgbmV3VGFpbCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVZOb2RlKG5vZGUsIG93bmVySUQsIGxldmVsLCBpbmRleCwgdmFsdWUsIGRpZEFsdGVyKSB7XG4gIHZhciBpZHggPSAoaW5kZXggPj4+IGxldmVsKSAmIE1BU0s7XG4gIHZhciBub2RlSGFzID0gbm9kZSAmJiBpZHggPCBub2RlLmFycmF5Lmxlbmd0aDtcbiAgaWYgKCFub2RlSGFzICYmIHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZhciBuZXdOb2RlO1xuXG4gIGlmIChsZXZlbCA+IDApIHtcbiAgICB2YXIgbG93ZXJOb2RlID0gbm9kZSAmJiBub2RlLmFycmF5W2lkeF07XG4gICAgdmFyIG5ld0xvd2VyTm9kZSA9IHVwZGF0ZVZOb2RlKFxuICAgICAgbG93ZXJOb2RlLFxuICAgICAgb3duZXJJRCxcbiAgICAgIGxldmVsIC0gU0hJRlQsXG4gICAgICBpbmRleCxcbiAgICAgIHZhbHVlLFxuICAgICAgZGlkQWx0ZXJcbiAgICApO1xuICAgIGlmIChuZXdMb3dlck5vZGUgPT09IGxvd2VyTm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIG5ld05vZGUgPSBlZGl0YWJsZVZOb2RlKG5vZGUsIG93bmVySUQpO1xuICAgIG5ld05vZGUuYXJyYXlbaWR4XSA9IG5ld0xvd2VyTm9kZTtcbiAgICByZXR1cm4gbmV3Tm9kZTtcbiAgfVxuXG4gIGlmIChub2RlSGFzICYmIG5vZGUuYXJyYXlbaWR4XSA9PT0gdmFsdWUpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGlmIChkaWRBbHRlcikge1xuICAgIFNldFJlZihkaWRBbHRlcik7XG4gIH1cblxuICBuZXdOb2RlID0gZWRpdGFibGVWTm9kZShub2RlLCBvd25lcklEKTtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgaWR4ID09PSBuZXdOb2RlLmFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICBuZXdOb2RlLmFycmF5LnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIG5ld05vZGUuYXJyYXlbaWR4XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBuZXdOb2RlO1xufVxuXG5mdW5jdGlvbiBlZGl0YWJsZVZOb2RlKG5vZGUsIG93bmVySUQpIHtcbiAgaWYgKG93bmVySUQgJiYgbm9kZSAmJiBvd25lcklEID09PSBub2RlLm93bmVySUQpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICByZXR1cm4gbmV3IFZOb2RlKG5vZGUgPyBub2RlLmFycmF5LnNsaWNlKCkgOiBbXSwgb3duZXJJRCk7XG59XG5cbmZ1bmN0aW9uIGxpc3ROb2RlRm9yKGxpc3QsIHJhd0luZGV4KSB7XG4gIGlmIChyYXdJbmRleCA+PSBnZXRUYWlsT2Zmc2V0KGxpc3QuX2NhcGFjaXR5KSkge1xuICAgIHJldHVybiBsaXN0Ll90YWlsO1xuICB9XG4gIGlmIChyYXdJbmRleCA8IDEgPDwgKGxpc3QuX2xldmVsICsgU0hJRlQpKSB7XG4gICAgdmFyIG5vZGUgPSBsaXN0Ll9yb290O1xuICAgIHZhciBsZXZlbCA9IGxpc3QuX2xldmVsO1xuICAgIHdoaWxlIChub2RlICYmIGxldmVsID4gMCkge1xuICAgICAgbm9kZSA9IG5vZGUuYXJyYXlbKHJhd0luZGV4ID4+PiBsZXZlbCkgJiBNQVNLXTtcbiAgICAgIGxldmVsIC09IFNISUZUO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRMaXN0Qm91bmRzKGxpc3QsIGJlZ2luLCBlbmQpIHtcbiAgLy8gU2FuaXRpemUgYmVnaW4gJiBlbmQgdXNpbmcgdGhpcyBzaG9ydGhhbmQgZm9yIFRvSW50MzIoYXJndW1lbnQpXG4gIC8vIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy10b2ludDMyXG4gIGlmIChiZWdpbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgYmVnaW4gfD0gMDtcbiAgfVxuICBpZiAoZW5kICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgfD0gMDtcbiAgfVxuICB2YXIgb3duZXIgPSBsaXN0Ll9fb3duZXJJRCB8fCBuZXcgT3duZXJJRCgpO1xuICB2YXIgb2xkT3JpZ2luID0gbGlzdC5fb3JpZ2luO1xuICB2YXIgb2xkQ2FwYWNpdHkgPSBsaXN0Ll9jYXBhY2l0eTtcbiAgdmFyIG5ld09yaWdpbiA9IG9sZE9yaWdpbiArIGJlZ2luO1xuICB2YXIgbmV3Q2FwYWNpdHkgPVxuICAgIGVuZCA9PT0gdW5kZWZpbmVkXG4gICAgICA/IG9sZENhcGFjaXR5XG4gICAgICA6IGVuZCA8IDBcbiAgICAgICAgPyBvbGRDYXBhY2l0eSArIGVuZFxuICAgICAgICA6IG9sZE9yaWdpbiArIGVuZDtcbiAgaWYgKG5ld09yaWdpbiA9PT0gb2xkT3JpZ2luICYmIG5ld0NhcGFjaXR5ID09PSBvbGRDYXBhY2l0eSkge1xuICAgIHJldHVybiBsaXN0O1xuICB9XG5cbiAgLy8gSWYgaXQncyBnb2luZyB0byBlbmQgYWZ0ZXIgaXQgc3RhcnRzLCBpdCdzIGVtcHR5LlxuICBpZiAobmV3T3JpZ2luID49IG5ld0NhcGFjaXR5KSB7XG4gICAgcmV0dXJuIGxpc3QuY2xlYXIoKTtcbiAgfVxuXG4gIHZhciBuZXdMZXZlbCA9IGxpc3QuX2xldmVsO1xuICB2YXIgbmV3Um9vdCA9IGxpc3QuX3Jvb3Q7XG5cbiAgLy8gTmV3IG9yaWdpbiBtaWdodCBuZWVkIGNyZWF0aW5nIGEgaGlnaGVyIHJvb3QuXG4gIHZhciBvZmZzZXRTaGlmdCA9IDA7XG4gIHdoaWxlIChuZXdPcmlnaW4gKyBvZmZzZXRTaGlmdCA8IDApIHtcbiAgICBuZXdSb290ID0gbmV3IFZOb2RlKFxuICAgICAgbmV3Um9vdCAmJiBuZXdSb290LmFycmF5Lmxlbmd0aCA/IFt1bmRlZmluZWQsIG5ld1Jvb3RdIDogW10sXG4gICAgICBvd25lclxuICAgICk7XG4gICAgbmV3TGV2ZWwgKz0gU0hJRlQ7XG4gICAgb2Zmc2V0U2hpZnQgKz0gMSA8PCBuZXdMZXZlbDtcbiAgfVxuICBpZiAob2Zmc2V0U2hpZnQpIHtcbiAgICBuZXdPcmlnaW4gKz0gb2Zmc2V0U2hpZnQ7XG4gICAgb2xkT3JpZ2luICs9IG9mZnNldFNoaWZ0O1xuICAgIG5ld0NhcGFjaXR5ICs9IG9mZnNldFNoaWZ0O1xuICAgIG9sZENhcGFjaXR5ICs9IG9mZnNldFNoaWZ0O1xuICB9XG5cbiAgdmFyIG9sZFRhaWxPZmZzZXQgPSBnZXRUYWlsT2Zmc2V0KG9sZENhcGFjaXR5KTtcbiAgdmFyIG5ld1RhaWxPZmZzZXQgPSBnZXRUYWlsT2Zmc2V0KG5ld0NhcGFjaXR5KTtcblxuICAvLyBOZXcgc2l6ZSBtaWdodCBuZWVkIGNyZWF0aW5nIGEgaGlnaGVyIHJvb3QuXG4gIHdoaWxlIChuZXdUYWlsT2Zmc2V0ID49IDEgPDwgKG5ld0xldmVsICsgU0hJRlQpKSB7XG4gICAgbmV3Um9vdCA9IG5ldyBWTm9kZShcbiAgICAgIG5ld1Jvb3QgJiYgbmV3Um9vdC5hcnJheS5sZW5ndGggPyBbbmV3Um9vdF0gOiBbXSxcbiAgICAgIG93bmVyXG4gICAgKTtcbiAgICBuZXdMZXZlbCArPSBTSElGVDtcbiAgfVxuXG4gIC8vIExvY2F0ZSBvciBjcmVhdGUgdGhlIG5ldyB0YWlsLlxuICB2YXIgb2xkVGFpbCA9IGxpc3QuX3RhaWw7XG4gIHZhciBuZXdUYWlsID1cbiAgICBuZXdUYWlsT2Zmc2V0IDwgb2xkVGFpbE9mZnNldFxuICAgICAgPyBsaXN0Tm9kZUZvcihsaXN0LCBuZXdDYXBhY2l0eSAtIDEpXG4gICAgICA6IG5ld1RhaWxPZmZzZXQgPiBvbGRUYWlsT2Zmc2V0XG4gICAgICAgID8gbmV3IFZOb2RlKFtdLCBvd25lcilcbiAgICAgICAgOiBvbGRUYWlsO1xuXG4gIC8vIE1lcmdlIFRhaWwgaW50byB0cmVlLlxuICBpZiAoXG4gICAgb2xkVGFpbCAmJlxuICAgIG5ld1RhaWxPZmZzZXQgPiBvbGRUYWlsT2Zmc2V0ICYmXG4gICAgbmV3T3JpZ2luIDwgb2xkQ2FwYWNpdHkgJiZcbiAgICBvbGRUYWlsLmFycmF5Lmxlbmd0aFxuICApIHtcbiAgICBuZXdSb290ID0gZWRpdGFibGVWTm9kZShuZXdSb290LCBvd25lcik7XG4gICAgdmFyIG5vZGUgPSBuZXdSb290O1xuICAgIGZvciAodmFyIGxldmVsID0gbmV3TGV2ZWw7IGxldmVsID4gU0hJRlQ7IGxldmVsIC09IFNISUZUKSB7XG4gICAgICB2YXIgaWR4ID0gKG9sZFRhaWxPZmZzZXQgPj4+IGxldmVsKSAmIE1BU0s7XG4gICAgICBub2RlID0gbm9kZS5hcnJheVtpZHhdID0gZWRpdGFibGVWTm9kZShub2RlLmFycmF5W2lkeF0sIG93bmVyKTtcbiAgICB9XG4gICAgbm9kZS5hcnJheVsob2xkVGFpbE9mZnNldCA+Pj4gU0hJRlQpICYgTUFTS10gPSBvbGRUYWlsO1xuICB9XG5cbiAgLy8gSWYgdGhlIHNpemUgaGFzIGJlZW4gcmVkdWNlZCwgdGhlcmUncyBhIGNoYW5jZSB0aGUgdGFpbCBuZWVkcyB0byBiZSB0cmltbWVkLlxuICBpZiAobmV3Q2FwYWNpdHkgPCBvbGRDYXBhY2l0eSkge1xuICAgIG5ld1RhaWwgPSBuZXdUYWlsICYmIG5ld1RhaWwucmVtb3ZlQWZ0ZXIob3duZXIsIDAsIG5ld0NhcGFjaXR5KTtcbiAgfVxuXG4gIC8vIElmIHRoZSBuZXcgb3JpZ2luIGlzIHdpdGhpbiB0aGUgdGFpbCwgdGhlbiB3ZSBkbyBub3QgbmVlZCBhIHJvb3QuXG4gIGlmIChuZXdPcmlnaW4gPj0gbmV3VGFpbE9mZnNldCkge1xuICAgIG5ld09yaWdpbiAtPSBuZXdUYWlsT2Zmc2V0O1xuICAgIG5ld0NhcGFjaXR5IC09IG5ld1RhaWxPZmZzZXQ7XG4gICAgbmV3TGV2ZWwgPSBTSElGVDtcbiAgICBuZXdSb290ID0gbnVsbDtcbiAgICBuZXdUYWlsID0gbmV3VGFpbCAmJiBuZXdUYWlsLnJlbW92ZUJlZm9yZShvd25lciwgMCwgbmV3T3JpZ2luKTtcblxuICAgIC8vIE90aGVyd2lzZSwgaWYgdGhlIHJvb3QgaGFzIGJlZW4gdHJpbW1lZCwgZ2FyYmFnZSBjb2xsZWN0LlxuICB9IGVsc2UgaWYgKG5ld09yaWdpbiA+IG9sZE9yaWdpbiB8fCBuZXdUYWlsT2Zmc2V0IDwgb2xkVGFpbE9mZnNldCkge1xuICAgIG9mZnNldFNoaWZ0ID0gMDtcblxuICAgIC8vIElkZW50aWZ5IHRoZSBuZXcgdG9wIHJvb3Qgbm9kZSBvZiB0aGUgc3VidHJlZSBvZiB0aGUgb2xkIHJvb3QuXG4gICAgd2hpbGUgKG5ld1Jvb3QpIHtcbiAgICAgIHZhciBiZWdpbkluZGV4ID0gKG5ld09yaWdpbiA+Pj4gbmV3TGV2ZWwpICYgTUFTSztcbiAgICAgIGlmICgoYmVnaW5JbmRleCAhPT0gbmV3VGFpbE9mZnNldCA+Pj4gbmV3TGV2ZWwpICYgTUFTSykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChiZWdpbkluZGV4KSB7XG4gICAgICAgIG9mZnNldFNoaWZ0ICs9ICgxIDw8IG5ld0xldmVsKSAqIGJlZ2luSW5kZXg7XG4gICAgICB9XG4gICAgICBuZXdMZXZlbCAtPSBTSElGVDtcbiAgICAgIG5ld1Jvb3QgPSBuZXdSb290LmFycmF5W2JlZ2luSW5kZXhdO1xuICAgIH1cblxuICAgIC8vIFRyaW0gdGhlIG5ldyBzaWRlcyBvZiB0aGUgbmV3IHJvb3QuXG4gICAgaWYgKG5ld1Jvb3QgJiYgbmV3T3JpZ2luID4gb2xkT3JpZ2luKSB7XG4gICAgICBuZXdSb290ID0gbmV3Um9vdC5yZW1vdmVCZWZvcmUob3duZXIsIG5ld0xldmVsLCBuZXdPcmlnaW4gLSBvZmZzZXRTaGlmdCk7XG4gICAgfVxuICAgIGlmIChuZXdSb290ICYmIG5ld1RhaWxPZmZzZXQgPCBvbGRUYWlsT2Zmc2V0KSB7XG4gICAgICBuZXdSb290ID0gbmV3Um9vdC5yZW1vdmVBZnRlcihcbiAgICAgICAgb3duZXIsXG4gICAgICAgIG5ld0xldmVsLFxuICAgICAgICBuZXdUYWlsT2Zmc2V0IC0gb2Zmc2V0U2hpZnRcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChvZmZzZXRTaGlmdCkge1xuICAgICAgbmV3T3JpZ2luIC09IG9mZnNldFNoaWZ0O1xuICAgICAgbmV3Q2FwYWNpdHkgLT0gb2Zmc2V0U2hpZnQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKGxpc3QuX19vd25lcklEKSB7XG4gICAgbGlzdC5zaXplID0gbmV3Q2FwYWNpdHkgLSBuZXdPcmlnaW47XG4gICAgbGlzdC5fb3JpZ2luID0gbmV3T3JpZ2luO1xuICAgIGxpc3QuX2NhcGFjaXR5ID0gbmV3Q2FwYWNpdHk7XG4gICAgbGlzdC5fbGV2ZWwgPSBuZXdMZXZlbDtcbiAgICBsaXN0Ll9yb290ID0gbmV3Um9vdDtcbiAgICBsaXN0Ll90YWlsID0gbmV3VGFpbDtcbiAgICBsaXN0Ll9faGFzaCA9IHVuZGVmaW5lZDtcbiAgICBsaXN0Ll9fYWx0ZXJlZCA9IHRydWU7XG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cbiAgcmV0dXJuIG1ha2VMaXN0KG5ld09yaWdpbiwgbmV3Q2FwYWNpdHksIG5ld0xldmVsLCBuZXdSb290LCBuZXdUYWlsKTtcbn1cblxuZnVuY3Rpb24gZ2V0VGFpbE9mZnNldChzaXplKSB7XG4gIHJldHVybiBzaXplIDwgU0laRSA/IDAgOiAoKHNpemUgLSAxKSA+Pj4gU0hJRlQpIDw8IFNISUZUO1xufVxuXG52YXIgT3JkZXJlZE1hcCA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKE1hcCQkMSkge1xuICBmdW5jdGlvbiBPcmRlcmVkTWFwKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgID8gZW1wdHlPcmRlcmVkTWFwKClcbiAgICAgIDogaXNPcmRlcmVkTWFwKHZhbHVlKVxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogZW1wdHlPcmRlcmVkTWFwKCkud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgICAgICB2YXIgaXRlciA9IEtleWVkQ29sbGVjdGlvbih2YWx1ZSk7XG4gICAgICAgICAgICBhc3NlcnROb3RJbmZpbml0ZShpdGVyLnNpemUpO1xuICAgICAgICAgICAgaXRlci5mb3JFYWNoKGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBtYXAuc2V0KGssIHYpOyB9KTtcbiAgICAgICAgICB9KTtcbiAgfVxuXG4gIGlmICggTWFwJCQxICkgT3JkZXJlZE1hcC5fX3Byb3RvX18gPSBNYXAkJDE7XG4gIE9yZGVyZWRNYXAucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggTWFwJCQxICYmIE1hcCQkMS5wcm90b3R5cGUgKTtcbiAgT3JkZXJlZE1hcC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBPcmRlcmVkTWFwO1xuXG4gIE9yZGVyZWRNYXAub2YgPSBmdW5jdGlvbiBvZiAoLyouLi52YWx1ZXMqLykge1xuICAgIHJldHVybiB0aGlzKGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgT3JkZXJlZE1hcC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX190b1N0cmluZygnT3JkZXJlZE1hcCB7JywgJ30nKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIEFjY2Vzc1xuXG4gIE9yZGVyZWRNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoaywgbm90U2V0VmFsdWUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLl9tYXAuZ2V0KGspO1xuICAgIHJldHVybiBpbmRleCAhPT0gdW5kZWZpbmVkID8gdGhpcy5fbGlzdC5nZXQoaW5kZXgpWzFdIDogbm90U2V0VmFsdWU7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBNb2RpZmljYXRpb25cblxuICBPcmRlcmVkTWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKHRoaXMuX19vd25lcklEKSB7XG4gICAgICB0aGlzLnNpemUgPSAwO1xuICAgICAgdGhpcy5fbWFwLmNsZWFyKCk7XG4gICAgICB0aGlzLl9saXN0LmNsZWFyKCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIGVtcHR5T3JkZXJlZE1hcCgpO1xuICB9O1xuXG4gIE9yZGVyZWRNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldCAoaywgdikge1xuICAgIHJldHVybiB1cGRhdGVPcmRlcmVkTWFwKHRoaXMsIGssIHYpO1xuICB9O1xuXG4gIE9yZGVyZWRNYXAucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSAoaykge1xuICAgIHJldHVybiB1cGRhdGVPcmRlcmVkTWFwKHRoaXMsIGssIE5PVF9TRVQpO1xuICB9O1xuXG4gIE9yZGVyZWRNYXAucHJvdG90eXBlLndhc0FsdGVyZWQgPSBmdW5jdGlvbiB3YXNBbHRlcmVkICgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFwLndhc0FsdGVyZWQoKSB8fCB0aGlzLl9saXN0Lndhc0FsdGVyZWQoKTtcbiAgfTtcblxuICBPcmRlcmVkTWFwLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcy5fbGlzdC5fX2l0ZXJhdGUoXG4gICAgICBmdW5jdGlvbiAoZW50cnkpIHsgcmV0dXJuIGVudHJ5ICYmIGZuKGVudHJ5WzFdLCBlbnRyeVswXSwgdGhpcyQxKTsgfSxcbiAgICAgIHJldmVyc2VcbiAgICApO1xuICB9O1xuXG4gIE9yZGVyZWRNYXAucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3QuZnJvbUVudHJ5U2VxKCkuX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgfTtcblxuICBPcmRlcmVkTWFwLnByb3RvdHlwZS5fX2Vuc3VyZU93bmVyID0gZnVuY3Rpb24gX19lbnN1cmVPd25lciAob3duZXJJRCkge1xuICAgIGlmIChvd25lcklEID09PSB0aGlzLl9fb3duZXJJRCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHZhciBuZXdNYXAgPSB0aGlzLl9tYXAuX19lbnN1cmVPd25lcihvd25lcklEKTtcbiAgICB2YXIgbmV3TGlzdCA9IHRoaXMuX2xpc3QuX19lbnN1cmVPd25lcihvd25lcklEKTtcbiAgICBpZiAoIW93bmVySUQpIHtcbiAgICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGVtcHR5T3JkZXJlZE1hcCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX293bmVySUQgPSBvd25lcklEO1xuICAgICAgdGhpcy5fbWFwID0gbmV3TWFwO1xuICAgICAgdGhpcy5fbGlzdCA9IG5ld0xpc3Q7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VPcmRlcmVkTWFwKG5ld01hcCwgbmV3TGlzdCwgb3duZXJJRCwgdGhpcy5fX2hhc2gpO1xuICB9O1xuXG4gIHJldHVybiBPcmRlcmVkTWFwO1xufShNYXApKTtcblxuT3JkZXJlZE1hcC5pc09yZGVyZWRNYXAgPSBpc09yZGVyZWRNYXA7XG5cbk9yZGVyZWRNYXAucHJvdG90eXBlW0lTX09SREVSRURfU1lNQk9MXSA9IHRydWU7XG5PcmRlcmVkTWFwLnByb3RvdHlwZVtERUxFVEVdID0gT3JkZXJlZE1hcC5wcm90b3R5cGUucmVtb3ZlO1xuXG5mdW5jdGlvbiBtYWtlT3JkZXJlZE1hcChtYXAsIGxpc3QsIG93bmVySUQsIGhhc2gpIHtcbiAgdmFyIG9tYXAgPSBPYmplY3QuY3JlYXRlKE9yZGVyZWRNYXAucHJvdG90eXBlKTtcbiAgb21hcC5zaXplID0gbWFwID8gbWFwLnNpemUgOiAwO1xuICBvbWFwLl9tYXAgPSBtYXA7XG4gIG9tYXAuX2xpc3QgPSBsaXN0O1xuICBvbWFwLl9fb3duZXJJRCA9IG93bmVySUQ7XG4gIG9tYXAuX19oYXNoID0gaGFzaDtcbiAgcmV0dXJuIG9tYXA7XG59XG5cbnZhciBFTVBUWV9PUkRFUkVEX01BUDtcbmZ1bmN0aW9uIGVtcHR5T3JkZXJlZE1hcCgpIHtcbiAgcmV0dXJuIChcbiAgICBFTVBUWV9PUkRFUkVEX01BUCB8fFxuICAgIChFTVBUWV9PUkRFUkVEX01BUCA9IG1ha2VPcmRlcmVkTWFwKGVtcHR5TWFwKCksIGVtcHR5TGlzdCgpKSlcbiAgKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlT3JkZXJlZE1hcChvbWFwLCBrLCB2KSB7XG4gIHZhciBtYXAgPSBvbWFwLl9tYXA7XG4gIHZhciBsaXN0ID0gb21hcC5fbGlzdDtcbiAgdmFyIGkgPSBtYXAuZ2V0KGspO1xuICB2YXIgaGFzID0gaSAhPT0gdW5kZWZpbmVkO1xuICB2YXIgbmV3TWFwO1xuICB2YXIgbmV3TGlzdDtcbiAgaWYgKHYgPT09IE5PVF9TRVQpIHtcbiAgICAvLyByZW1vdmVkXG4gICAgaWYgKCFoYXMpIHtcbiAgICAgIHJldHVybiBvbWFwO1xuICAgIH1cbiAgICBpZiAobGlzdC5zaXplID49IFNJWkUgJiYgbGlzdC5zaXplID49IG1hcC5zaXplICogMikge1xuICAgICAgbmV3TGlzdCA9IGxpc3QuZmlsdGVyKGZ1bmN0aW9uIChlbnRyeSwgaWR4KSB7IHJldHVybiBlbnRyeSAhPT0gdW5kZWZpbmVkICYmIGkgIT09IGlkeDsgfSk7XG4gICAgICBuZXdNYXAgPSBuZXdMaXN0XG4gICAgICAgIC50b0tleWVkU2VxKClcbiAgICAgICAgLm1hcChmdW5jdGlvbiAoZW50cnkpIHsgcmV0dXJuIGVudHJ5WzBdOyB9KVxuICAgICAgICAuZmxpcCgpXG4gICAgICAgIC50b01hcCgpO1xuICAgICAgaWYgKG9tYXAuX19vd25lcklEKSB7XG4gICAgICAgIG5ld01hcC5fX293bmVySUQgPSBuZXdMaXN0Ll9fb3duZXJJRCA9IG9tYXAuX19vd25lcklEO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdNYXAgPSBtYXAucmVtb3ZlKGspO1xuICAgICAgbmV3TGlzdCA9IGkgPT09IGxpc3Quc2l6ZSAtIDEgPyBsaXN0LnBvcCgpIDogbGlzdC5zZXQoaSwgdW5kZWZpbmVkKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaGFzKSB7XG4gICAgaWYgKHYgPT09IGxpc3QuZ2V0KGkpWzFdKSB7XG4gICAgICByZXR1cm4gb21hcDtcbiAgICB9XG4gICAgbmV3TWFwID0gbWFwO1xuICAgIG5ld0xpc3QgPSBsaXN0LnNldChpLCBbaywgdl0pO1xuICB9IGVsc2Uge1xuICAgIG5ld01hcCA9IG1hcC5zZXQoaywgbGlzdC5zaXplKTtcbiAgICBuZXdMaXN0ID0gbGlzdC5zZXQobGlzdC5zaXplLCBbaywgdl0pO1xuICB9XG4gIGlmIChvbWFwLl9fb3duZXJJRCkge1xuICAgIG9tYXAuc2l6ZSA9IG5ld01hcC5zaXplO1xuICAgIG9tYXAuX21hcCA9IG5ld01hcDtcbiAgICBvbWFwLl9saXN0ID0gbmV3TGlzdDtcbiAgICBvbWFwLl9faGFzaCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gb21hcDtcbiAgfVxuICByZXR1cm4gbWFrZU9yZGVyZWRNYXAobmV3TWFwLCBuZXdMaXN0KTtcbn1cblxudmFyIElTX1NUQUNLX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX1NUQUNLX19AQCc7XG5cbmZ1bmN0aW9uIGlzU3RhY2sobWF5YmVTdGFjaykge1xuICByZXR1cm4gQm9vbGVhbihtYXliZVN0YWNrICYmIG1heWJlU3RhY2tbSVNfU1RBQ0tfU1lNQk9MXSk7XG59XG5cbnZhciBTdGFjayA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEluZGV4ZWRDb2xsZWN0aW9uJCQxKSB7XG4gIGZ1bmN0aW9uIFN0YWNrKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgID8gZW1wdHlTdGFjaygpXG4gICAgICA6IGlzU3RhY2sodmFsdWUpXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiBlbXB0eVN0YWNrKCkucHVzaEFsbCh2YWx1ZSk7XG4gIH1cblxuICBpZiAoIEluZGV4ZWRDb2xsZWN0aW9uJCQxICkgU3RhY2suX19wcm90b19fID0gSW5kZXhlZENvbGxlY3Rpb24kJDE7XG4gIFN0YWNrLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEluZGV4ZWRDb2xsZWN0aW9uJCQxICYmIEluZGV4ZWRDb2xsZWN0aW9uJCQxLnByb3RvdHlwZSApO1xuICBTdGFjay5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTdGFjaztcblxuICBTdGFjay5vZiA9IGZ1bmN0aW9uIG9mICgvKi4uLnZhbHVlcyovKSB7XG4gICAgcmV0dXJuIHRoaXMoYXJndW1lbnRzKTtcbiAgfTtcblxuICBTdGFjay5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX190b1N0cmluZygnU3RhY2sgWycsICddJyk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBBY2Nlc3NcblxuICBTdGFjay5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChpbmRleCwgbm90U2V0VmFsdWUpIHtcbiAgICB2YXIgaGVhZCA9IHRoaXMuX2hlYWQ7XG4gICAgaW5kZXggPSB3cmFwSW5kZXgodGhpcywgaW5kZXgpO1xuICAgIHdoaWxlIChoZWFkICYmIGluZGV4LS0pIHtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgfVxuICAgIHJldHVybiBoZWFkID8gaGVhZC52YWx1ZSA6IG5vdFNldFZhbHVlO1xuICB9O1xuXG4gIFN0YWNrLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24gcGVlayAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hlYWQgJiYgdGhpcy5faGVhZC52YWx1ZTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIE1vZGlmaWNhdGlvblxuXG4gIFN0YWNrLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gcHVzaCAoLyouLi52YWx1ZXMqLykge1xuICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdmFyIG5ld1NpemUgPSB0aGlzLnNpemUgKyBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBoZWFkID0gdGhpcy5faGVhZDtcbiAgICBmb3IgKHZhciBpaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpaSA+PSAwOyBpaS0tKSB7XG4gICAgICBoZWFkID0ge1xuICAgICAgICB2YWx1ZTogYXJndW1lbnRzJDFbaWldLFxuICAgICAgICBuZXh0OiBoZWFkLFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX19vd25lcklEKSB7XG4gICAgICB0aGlzLnNpemUgPSBuZXdTaXplO1xuICAgICAgdGhpcy5faGVhZCA9IGhlYWQ7XG4gICAgICB0aGlzLl9faGFzaCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX19hbHRlcmVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gbWFrZVN0YWNrKG5ld1NpemUsIGhlYWQpO1xuICB9O1xuXG4gIFN0YWNrLnByb3RvdHlwZS5wdXNoQWxsID0gZnVuY3Rpb24gcHVzaEFsbCAoaXRlcikge1xuICAgIGl0ZXIgPSBJbmRleGVkQ29sbGVjdGlvbiQkMShpdGVyKTtcbiAgICBpZiAoaXRlci5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCAmJiBpc1N0YWNrKGl0ZXIpKSB7XG4gICAgICByZXR1cm4gaXRlcjtcbiAgICB9XG4gICAgYXNzZXJ0Tm90SW5maW5pdGUoaXRlci5zaXplKTtcbiAgICB2YXIgbmV3U2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICB2YXIgaGVhZCA9IHRoaXMuX2hlYWQ7XG4gICAgaXRlci5fX2l0ZXJhdGUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBuZXdTaXplKys7XG4gICAgICBoZWFkID0ge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIG5leHQ6IGhlYWQsXG4gICAgICB9O1xuICAgIH0sIC8qIHJldmVyc2UgKi8gdHJ1ZSk7XG4gICAgaWYgKHRoaXMuX19vd25lcklEKSB7XG4gICAgICB0aGlzLnNpemUgPSBuZXdTaXplO1xuICAgICAgdGhpcy5faGVhZCA9IGhlYWQ7XG4gICAgICB0aGlzLl9faGFzaCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX19hbHRlcmVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gbWFrZVN0YWNrKG5ld1NpemUsIGhlYWQpO1xuICB9O1xuXG4gIFN0YWNrLnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbiBwb3AgKCkge1xuICAgIHJldHVybiB0aGlzLnNsaWNlKDEpO1xuICB9O1xuXG4gIFN0YWNrLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKHRoaXMuX19vd25lcklEKSB7XG4gICAgICB0aGlzLnNpemUgPSAwO1xuICAgICAgdGhpcy5faGVhZCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX19oYXNoID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fX2FsdGVyZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBlbXB0eVN0YWNrKCk7XG4gIH07XG5cbiAgU3RhY2sucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKGJlZ2luLCBlbmQpIHtcbiAgICBpZiAod2hvbGVTbGljZShiZWdpbiwgZW5kLCB0aGlzLnNpemUpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdmFyIHJlc29sdmVkQmVnaW4gPSByZXNvbHZlQmVnaW4oYmVnaW4sIHRoaXMuc2l6ZSk7XG4gICAgdmFyIHJlc29sdmVkRW5kID0gcmVzb2x2ZUVuZChlbmQsIHRoaXMuc2l6ZSk7XG4gICAgaWYgKHJlc29sdmVkRW5kICE9PSB0aGlzLnNpemUpIHtcbiAgICAgIC8vIHN1cGVyLnNsaWNlKGJlZ2luLCBlbmQpO1xuICAgICAgcmV0dXJuIEluZGV4ZWRDb2xsZWN0aW9uJCQxLnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMsIGJlZ2luLCBlbmQpO1xuICAgIH1cbiAgICB2YXIgbmV3U2l6ZSA9IHRoaXMuc2l6ZSAtIHJlc29sdmVkQmVnaW47XG4gICAgdmFyIGhlYWQgPSB0aGlzLl9oZWFkO1xuICAgIHdoaWxlIChyZXNvbHZlZEJlZ2luLS0pIHtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3duZXJJRCkge1xuICAgICAgdGhpcy5zaXplID0gbmV3U2l6ZTtcbiAgICAgIHRoaXMuX2hlYWQgPSBoZWFkO1xuICAgICAgdGhpcy5fX2hhc2ggPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9fYWx0ZXJlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VTdGFjayhuZXdTaXplLCBoZWFkKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIE11dGFiaWxpdHlcblxuICBTdGFjay5wcm90b3R5cGUuX19lbnN1cmVPd25lciA9IGZ1bmN0aW9uIF9fZW5zdXJlT3duZXIgKG93bmVySUQpIHtcbiAgICBpZiAob3duZXJJRCA9PT0gdGhpcy5fX293bmVySUQpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAoIW93bmVySUQpIHtcbiAgICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGVtcHR5U3RhY2soKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19vd25lcklEID0gb3duZXJJRDtcbiAgICAgIHRoaXMuX19hbHRlcmVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VTdGFjayh0aGlzLnNpemUsIHRoaXMuX2hlYWQsIG93bmVySUQsIHRoaXMuX19oYXNoKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIEl0ZXJhdGlvblxuXG4gIFN0YWNrLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIG5ldyBBcnJheVNlcSh0aGlzLnRvQXJyYXkoKSkuX19pdGVyYXRlKFxuICAgICAgICBmdW5jdGlvbiAodiwgaykgeyByZXR1cm4gZm4odiwgaywgdGhpcyQxKTsgfSxcbiAgICAgICAgcmV2ZXJzZVxuICAgICAgKTtcbiAgICB9XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHZhciBub2RlID0gdGhpcy5faGVhZDtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgaWYgKGZuKG5vZGUudmFsdWUsIGl0ZXJhdGlvbnMrKywgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG5cbiAgU3RhY2sucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHJldHVybiBuZXcgQXJyYXlTZXEodGhpcy50b0FycmF5KCkpLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB2YXIgbm9kZSA9IHRoaXMuX2hlYWQ7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAobm9kZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBub2RlLnZhbHVlO1xuICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCBpdGVyYXRpb25zKyssIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gU3RhY2s7XG59KEluZGV4ZWRDb2xsZWN0aW9uKSk7XG5cblN0YWNrLmlzU3RhY2sgPSBpc1N0YWNrO1xuXG52YXIgU3RhY2tQcm90b3R5cGUgPSBTdGFjay5wcm90b3R5cGU7XG5TdGFja1Byb3RvdHlwZVtJU19TVEFDS19TWU1CT0xdID0gdHJ1ZTtcblN0YWNrUHJvdG90eXBlLnNoaWZ0ID0gU3RhY2tQcm90b3R5cGUucG9wO1xuU3RhY2tQcm90b3R5cGUudW5zaGlmdCA9IFN0YWNrUHJvdG90eXBlLnB1c2g7XG5TdGFja1Byb3RvdHlwZS51bnNoaWZ0QWxsID0gU3RhY2tQcm90b3R5cGUucHVzaEFsbDtcblN0YWNrUHJvdG90eXBlLndpdGhNdXRhdGlvbnMgPSB3aXRoTXV0YXRpb25zO1xuU3RhY2tQcm90b3R5cGUud2FzQWx0ZXJlZCA9IHdhc0FsdGVyZWQ7XG5TdGFja1Byb3RvdHlwZS5hc0ltbXV0YWJsZSA9IGFzSW1tdXRhYmxlO1xuU3RhY2tQcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBTdGFja1Byb3RvdHlwZS5hc011dGFibGUgPSBhc011dGFibGU7XG5TdGFja1Byb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlc3VsdCwgYXJyKSB7XG4gIHJldHVybiByZXN1bHQudW5zaGlmdChhcnIpO1xufTtcblN0YWNrUHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIG9iai5hc0ltbXV0YWJsZSgpO1xufTtcblxuZnVuY3Rpb24gbWFrZVN0YWNrKHNpemUsIGhlYWQsIG93bmVySUQsIGhhc2gpIHtcbiAgdmFyIG1hcCA9IE9iamVjdC5jcmVhdGUoU3RhY2tQcm90b3R5cGUpO1xuICBtYXAuc2l6ZSA9IHNpemU7XG4gIG1hcC5faGVhZCA9IGhlYWQ7XG4gIG1hcC5fX293bmVySUQgPSBvd25lcklEO1xuICBtYXAuX19oYXNoID0gaGFzaDtcbiAgbWFwLl9fYWx0ZXJlZCA9IGZhbHNlO1xuICByZXR1cm4gbWFwO1xufVxuXG52YXIgRU1QVFlfU1RBQ0s7XG5mdW5jdGlvbiBlbXB0eVN0YWNrKCkge1xuICByZXR1cm4gRU1QVFlfU1RBQ0sgfHwgKEVNUFRZX1NUQUNLID0gbWFrZVN0YWNrKDApKTtcbn1cblxudmFyIElTX1NFVF9TWU1CT0wgPSAnQEBfX0lNTVVUQUJMRV9TRVRfX0BAJztcblxuZnVuY3Rpb24gaXNTZXQobWF5YmVTZXQpIHtcbiAgcmV0dXJuIEJvb2xlYW4obWF5YmVTZXQgJiYgbWF5YmVTZXRbSVNfU0VUX1NZTUJPTF0pO1xufVxuXG5mdW5jdGlvbiBpc09yZGVyZWRTZXQobWF5YmVPcmRlcmVkU2V0KSB7XG4gIHJldHVybiBpc1NldChtYXliZU9yZGVyZWRTZXQpICYmIGlzT3JkZXJlZChtYXliZU9yZGVyZWRTZXQpO1xufVxuXG5mdW5jdGlvbiBkZWVwRXF1YWwoYSwgYikge1xuICBpZiAoYSA9PT0gYikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKFxuICAgICFpc0NvbGxlY3Rpb24oYikgfHxcbiAgICAoYS5zaXplICE9PSB1bmRlZmluZWQgJiYgYi5zaXplICE9PSB1bmRlZmluZWQgJiYgYS5zaXplICE9PSBiLnNpemUpIHx8XG4gICAgKGEuX19oYXNoICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIGIuX19oYXNoICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIGEuX19oYXNoICE9PSBiLl9faGFzaCkgfHxcbiAgICBpc0tleWVkKGEpICE9PSBpc0tleWVkKGIpIHx8XG4gICAgaXNJbmRleGVkKGEpICE9PSBpc0luZGV4ZWQoYikgfHxcbiAgICBpc09yZGVyZWQoYSkgIT09IGlzT3JkZXJlZChiKVxuICApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoYS5zaXplID09PSAwICYmIGIuc2l6ZSA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdmFyIG5vdEFzc29jaWF0aXZlID0gIWlzQXNzb2NpYXRpdmUoYSk7XG5cbiAgaWYgKGlzT3JkZXJlZChhKSkge1xuICAgIHZhciBlbnRyaWVzID0gYS5lbnRyaWVzKCk7XG4gICAgcmV0dXJuIChcbiAgICAgIGIuZXZlcnkoZnVuY3Rpb24gKHYsIGspIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gZW50cmllcy5uZXh0KCkudmFsdWU7XG4gICAgICAgIHJldHVybiBlbnRyeSAmJiBpcyhlbnRyeVsxXSwgdikgJiYgKG5vdEFzc29jaWF0aXZlIHx8IGlzKGVudHJ5WzBdLCBrKSk7XG4gICAgICB9KSAmJiBlbnRyaWVzLm5leHQoKS5kb25lXG4gICAgKTtcbiAgfVxuXG4gIHZhciBmbGlwcGVkID0gZmFsc2U7XG5cbiAgaWYgKGEuc2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGIuc2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodHlwZW9mIGEuY2FjaGVSZXN1bHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgYS5jYWNoZVJlc3VsdCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmbGlwcGVkID0gdHJ1ZTtcbiAgICAgIHZhciBfID0gYTtcbiAgICAgIGEgPSBiO1xuICAgICAgYiA9IF87XG4gICAgfVxuICB9XG5cbiAgdmFyIGFsbEVxdWFsID0gdHJ1ZTtcbiAgdmFyIGJTaXplID0gYi5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGspIHtcbiAgICBpZiAoXG4gICAgICBub3RBc3NvY2lhdGl2ZVxuICAgICAgICA/ICFhLmhhcyh2KVxuICAgICAgICA6IGZsaXBwZWRcbiAgICAgICAgICA/ICFpcyh2LCBhLmdldChrLCBOT1RfU0VUKSlcbiAgICAgICAgICA6ICFpcyhhLmdldChrLCBOT1RfU0VUKSwgdilcbiAgICApIHtcbiAgICAgIGFsbEVxdWFsID0gZmFsc2U7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gYWxsRXF1YWwgJiYgYS5zaXplID09PSBiU2l6ZTtcbn1cblxuLyoqXG4gKiBDb250cmlidXRlcyBhZGRpdGlvbmFsIG1ldGhvZHMgdG8gYSBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBtaXhpbihjdG9yLCBtZXRob2RzKSB7XG4gIHZhciBrZXlDb3BpZXIgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgY3Rvci5wcm90b3R5cGVba2V5XSA9IG1ldGhvZHNba2V5XTtcbiAgfTtcbiAgT2JqZWN0LmtleXMobWV0aG9kcykuZm9yRWFjaChrZXlDb3BpZXIpO1xuICBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhtZXRob2RzKS5mb3JFYWNoKGtleUNvcGllcik7XG4gIHJldHVybiBjdG9yO1xufVxuXG5mdW5jdGlvbiB0b0pTKHZhbHVlKSB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoIWlzQ29sbGVjdGlvbih2YWx1ZSkpIHtcbiAgICBpZiAoIWlzRGF0YVN0cnVjdHVyZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgdmFsdWUgPSBTZXEodmFsdWUpO1xuICB9XG4gIGlmIChpc0tleWVkKHZhbHVlKSkge1xuICAgIHZhciByZXN1bHQkMSA9IHt9O1xuICAgIHZhbHVlLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaykge1xuICAgICAgcmVzdWx0JDFba10gPSB0b0pTKHYpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQkMTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhbHVlLl9faXRlcmF0ZShmdW5jdGlvbiAodikge1xuICAgIHJlc3VsdC5wdXNoKHRvSlModikpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxudmFyIFNldCA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKFNldENvbGxlY3Rpb24kJDEpIHtcbiAgZnVuY3Rpb24gU2V0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgID8gZW1wdHlTZXQoKVxuICAgICAgOiBpc1NldCh2YWx1ZSkgJiYgIWlzT3JkZXJlZCh2YWx1ZSlcbiAgICAgICAgPyB2YWx1ZVxuICAgICAgICA6IGVtcHR5U2V0KCkud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAoc2V0KSB7XG4gICAgICAgICAgICB2YXIgaXRlciA9IFNldENvbGxlY3Rpb24kJDEodmFsdWUpO1xuICAgICAgICAgICAgYXNzZXJ0Tm90SW5maW5pdGUoaXRlci5zaXplKTtcbiAgICAgICAgICAgIGl0ZXIuZm9yRWFjaChmdW5jdGlvbiAodikgeyByZXR1cm4gc2V0LmFkZCh2KTsgfSk7XG4gICAgICAgICAgfSk7XG4gIH1cblxuICBpZiAoIFNldENvbGxlY3Rpb24kJDEgKSBTZXQuX19wcm90b19fID0gU2V0Q29sbGVjdGlvbiQkMTtcbiAgU2V0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFNldENvbGxlY3Rpb24kJDEgJiYgU2V0Q29sbGVjdGlvbiQkMS5wcm90b3R5cGUgKTtcbiAgU2V0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNldDtcblxuICBTZXQub2YgPSBmdW5jdGlvbiBvZiAoLyouLi52YWx1ZXMqLykge1xuICAgIHJldHVybiB0aGlzKGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgU2V0LmZyb21LZXlzID0gZnVuY3Rpb24gZnJvbUtleXMgKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMoS2V5ZWRDb2xsZWN0aW9uKHZhbHVlKS5rZXlTZXEoKSk7XG4gIH07XG5cbiAgU2V0LmludGVyc2VjdCA9IGZ1bmN0aW9uIGludGVyc2VjdCAoc2V0cykge1xuICAgIHNldHMgPSBDb2xsZWN0aW9uKHNldHMpLnRvQXJyYXkoKTtcbiAgICByZXR1cm4gc2V0cy5sZW5ndGhcbiAgICAgID8gU2V0UHJvdG90eXBlLmludGVyc2VjdC5hcHBseShTZXQoc2V0cy5wb3AoKSksIHNldHMpXG4gICAgICA6IGVtcHR5U2V0KCk7XG4gIH07XG5cbiAgU2V0LnVuaW9uID0gZnVuY3Rpb24gdW5pb24gKHNldHMpIHtcbiAgICBzZXRzID0gQ29sbGVjdGlvbihzZXRzKS50b0FycmF5KCk7XG4gICAgcmV0dXJuIHNldHMubGVuZ3RoXG4gICAgICA/IFNldFByb3RvdHlwZS51bmlvbi5hcHBseShTZXQoc2V0cy5wb3AoKSksIHNldHMpXG4gICAgICA6IGVtcHR5U2V0KCk7XG4gIH07XG5cbiAgU2V0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RvU3RyaW5nKCdTZXQgeycsICd9Jyk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBBY2Nlc3NcblxuICBTZXQucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIGhhcyAodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFwLmhhcyh2YWx1ZSk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBNb2RpZmljYXRpb25cblxuICBTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCAodmFsdWUpIHtcbiAgICByZXR1cm4gdXBkYXRlU2V0KHRoaXMsIHRoaXMuX21hcC5zZXQodmFsdWUsIHZhbHVlKSk7XG4gIH07XG5cbiAgU2V0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUgKHZhbHVlKSB7XG4gICAgcmV0dXJuIHVwZGF0ZVNldCh0aGlzLCB0aGlzLl9tYXAucmVtb3ZlKHZhbHVlKSk7XG4gIH07XG5cbiAgU2V0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgICByZXR1cm4gdXBkYXRlU2V0KHRoaXMsIHRoaXMuX21hcC5jbGVhcigpKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIENvbXBvc2l0aW9uXG5cbiAgU2V0LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiBtYXAgKG1hcHBlciwgY29udGV4dCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIHJlbW92ZXMgPSBbXTtcbiAgICB2YXIgYWRkcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHZhciBtYXBwZWQgPSBtYXBwZXIuY2FsbChjb250ZXh0LCB2YWx1ZSwgdmFsdWUsIHRoaXMkMSk7XG4gICAgICBpZiAobWFwcGVkICE9PSB2YWx1ZSkge1xuICAgICAgICByZW1vdmVzLnB1c2godmFsdWUpO1xuICAgICAgICBhZGRzLnB1c2gobWFwcGVkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChzZXQpIHtcbiAgICAgIHJlbW92ZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHNldC5yZW1vdmUodmFsdWUpOyB9KTtcbiAgICAgIGFkZHMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHNldC5hZGQodmFsdWUpOyB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLnVuaW9uID0gZnVuY3Rpb24gdW5pb24gKCkge1xuICAgIHZhciBpdGVycyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICggbGVuLS0gKSBpdGVyc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgaXRlcnMgPSBpdGVycy5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguc2l6ZSAhPT0gMDsgfSk7XG4gICAgaWYgKGl0ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICh0aGlzLnNpemUgPT09IDAgJiYgIXRoaXMuX19vd25lcklEICYmIGl0ZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IoaXRlcnNbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChzZXQpIHtcbiAgICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCBpdGVycy5sZW5ndGg7IGlpKyspIHtcbiAgICAgICAgU2V0Q29sbGVjdGlvbiQkMShpdGVyc1tpaV0pLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBzZXQuYWRkKHZhbHVlKTsgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgU2V0LnByb3RvdHlwZS5pbnRlcnNlY3QgPSBmdW5jdGlvbiBpbnRlcnNlY3QgKCkge1xuICAgIHZhciBpdGVycyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICggbGVuLS0gKSBpdGVyc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgaWYgKGl0ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGl0ZXJzID0gaXRlcnMubWFwKGZ1bmN0aW9uIChpdGVyKSB7IHJldHVybiBTZXRDb2xsZWN0aW9uJCQxKGl0ZXIpOyB9KTtcbiAgICB2YXIgdG9SZW1vdmUgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAoIWl0ZXJzLmV2ZXJ5KGZ1bmN0aW9uIChpdGVyKSB7IHJldHVybiBpdGVyLmluY2x1ZGVzKHZhbHVlKTsgfSkpIHtcbiAgICAgICAgdG9SZW1vdmUucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAoc2V0KSB7XG4gICAgICB0b1JlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZXQucmVtb3ZlKHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIFNldC5wcm90b3R5cGUuc3VidHJhY3QgPSBmdW5jdGlvbiBzdWJ0cmFjdCAoKSB7XG4gICAgdmFyIGl0ZXJzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKCBsZW4tLSApIGl0ZXJzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICBpZiAoaXRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaXRlcnMgPSBpdGVycy5tYXAoZnVuY3Rpb24gKGl0ZXIpIHsgcmV0dXJuIFNldENvbGxlY3Rpb24kJDEoaXRlcik7IH0pO1xuICAgIHZhciB0b1JlbW92ZSA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmIChpdGVycy5zb21lKGZ1bmN0aW9uIChpdGVyKSB7IHJldHVybiBpdGVyLmluY2x1ZGVzKHZhbHVlKTsgfSkpIHtcbiAgICAgICAgdG9SZW1vdmUucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAoc2V0KSB7XG4gICAgICB0b1JlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzZXQucmVtb3ZlKHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIFNldC5wcm90b3R5cGUuc29ydCA9IGZ1bmN0aW9uIHNvcnQgKGNvbXBhcmF0b3IpIHtcbiAgICAvLyBMYXRlIGJpbmRpbmdcbiAgICByZXR1cm4gT3JkZXJlZFNldChzb3J0RmFjdG9yeSh0aGlzLCBjb21wYXJhdG9yKSk7XG4gIH07XG5cbiAgU2V0LnByb3RvdHlwZS5zb3J0QnkgPSBmdW5jdGlvbiBzb3J0QnkgKG1hcHBlciwgY29tcGFyYXRvcikge1xuICAgIC8vIExhdGUgYmluZGluZ1xuICAgIHJldHVybiBPcmRlcmVkU2V0KHNvcnRGYWN0b3J5KHRoaXMsIGNvbXBhcmF0b3IsIG1hcHBlcikpO1xuICB9O1xuXG4gIFNldC5wcm90b3R5cGUud2FzQWx0ZXJlZCA9IGZ1bmN0aW9uIHdhc0FsdGVyZWQgKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXAud2FzQWx0ZXJlZCgpO1xuICB9O1xuXG4gIFNldC5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMuX21hcC5fX2l0ZXJhdGUoZnVuY3Rpb24gKGspIHsgcmV0dXJuIGZuKGssIGssIHRoaXMkMSk7IH0sIHJldmVyc2UpO1xuICB9O1xuXG4gIFNldC5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFwLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gIH07XG5cbiAgU2V0LnByb3RvdHlwZS5fX2Vuc3VyZU93bmVyID0gZnVuY3Rpb24gX19lbnN1cmVPd25lciAob3duZXJJRCkge1xuICAgIGlmIChvd25lcklEID09PSB0aGlzLl9fb3duZXJJRCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHZhciBuZXdNYXAgPSB0aGlzLl9tYXAuX19lbnN1cmVPd25lcihvd25lcklEKTtcbiAgICBpZiAoIW93bmVySUQpIHtcbiAgICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19lbXB0eSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX293bmVySUQgPSBvd25lcklEO1xuICAgICAgdGhpcy5fbWFwID0gbmV3TWFwO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9fbWFrZShuZXdNYXAsIG93bmVySUQpO1xuICB9O1xuXG4gIHJldHVybiBTZXQ7XG59KFNldENvbGxlY3Rpb24pKTtcblxuU2V0LmlzU2V0ID0gaXNTZXQ7XG5cbnZhciBTZXRQcm90b3R5cGUgPSBTZXQucHJvdG90eXBlO1xuU2V0UHJvdG90eXBlW0lTX1NFVF9TWU1CT0xdID0gdHJ1ZTtcblNldFByb3RvdHlwZVtERUxFVEVdID0gU2V0UHJvdG90eXBlLnJlbW92ZTtcblNldFByb3RvdHlwZS5tZXJnZSA9IFNldFByb3RvdHlwZS5jb25jYXQgPSBTZXRQcm90b3R5cGUudW5pb247XG5TZXRQcm90b3R5cGUud2l0aE11dGF0aW9ucyA9IHdpdGhNdXRhdGlvbnM7XG5TZXRQcm90b3R5cGUuYXNJbW11dGFibGUgPSBhc0ltbXV0YWJsZTtcblNldFByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IFNldFByb3RvdHlwZS5hc011dGFibGUgPSBhc011dGFibGU7XG5TZXRQcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGFycikge1xuICByZXR1cm4gcmVzdWx0LmFkZChhcnIpO1xufTtcblNldFByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmouYXNJbW11dGFibGUoKTtcbn07XG5cblNldFByb3RvdHlwZS5fX2VtcHR5ID0gZW1wdHlTZXQ7XG5TZXRQcm90b3R5cGUuX19tYWtlID0gbWFrZVNldDtcblxuZnVuY3Rpb24gdXBkYXRlU2V0KHNldCwgbmV3TWFwKSB7XG4gIGlmIChzZXQuX19vd25lcklEKSB7XG4gICAgc2V0LnNpemUgPSBuZXdNYXAuc2l6ZTtcbiAgICBzZXQuX21hcCA9IG5ld01hcDtcbiAgICByZXR1cm4gc2V0O1xuICB9XG4gIHJldHVybiBuZXdNYXAgPT09IHNldC5fbWFwXG4gICAgPyBzZXRcbiAgICA6IG5ld01hcC5zaXplID09PSAwXG4gICAgICA/IHNldC5fX2VtcHR5KClcbiAgICAgIDogc2V0Ll9fbWFrZShuZXdNYXApO1xufVxuXG5mdW5jdGlvbiBtYWtlU2V0KG1hcCwgb3duZXJJRCkge1xuICB2YXIgc2V0ID0gT2JqZWN0LmNyZWF0ZShTZXRQcm90b3R5cGUpO1xuICBzZXQuc2l6ZSA9IG1hcCA/IG1hcC5zaXplIDogMDtcbiAgc2V0Ll9tYXAgPSBtYXA7XG4gIHNldC5fX293bmVySUQgPSBvd25lcklEO1xuICByZXR1cm4gc2V0O1xufVxuXG52YXIgRU1QVFlfU0VUO1xuZnVuY3Rpb24gZW1wdHlTZXQoKSB7XG4gIHJldHVybiBFTVBUWV9TRVQgfHwgKEVNUFRZX1NFVCA9IG1ha2VTZXQoZW1wdHlNYXAoKSkpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBsYXp5IHNlcSBvZiBudW1zIGZyb20gc3RhcnQgKGluY2x1c2l2ZSkgdG8gZW5kXG4gKiAoZXhjbHVzaXZlKSwgYnkgc3RlcCwgd2hlcmUgc3RhcnQgZGVmYXVsdHMgdG8gMCwgc3RlcCB0byAxLCBhbmQgZW5kIHRvXG4gKiBpbmZpbml0eS4gV2hlbiBzdGFydCBpcyBlcXVhbCB0byBlbmQsIHJldHVybnMgZW1wdHkgbGlzdC5cbiAqL1xudmFyIFJhbmdlID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoSW5kZXhlZFNlcSQkMSkge1xuICBmdW5jdGlvbiBSYW5nZShzdGFydCwgZW5kLCBzdGVwKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJhbmdlKSkge1xuICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydCwgZW5kLCBzdGVwKTtcbiAgICB9XG4gICAgaW52YXJpYW50KHN0ZXAgIT09IDAsICdDYW5ub3Qgc3RlcCBhIFJhbmdlIGJ5IDAnKTtcbiAgICBzdGFydCA9IHN0YXJ0IHx8IDA7XG4gICAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbmQgPSBJbmZpbml0eTtcbiAgICB9XG4gICAgc3RlcCA9IHN0ZXAgPT09IHVuZGVmaW5lZCA/IDEgOiBNYXRoLmFicyhzdGVwKTtcbiAgICBpZiAoZW5kIDwgc3RhcnQpIHtcbiAgICAgIHN0ZXAgPSAtc3RlcDtcbiAgICB9XG4gICAgdGhpcy5fc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLl9lbmQgPSBlbmQ7XG4gICAgdGhpcy5fc3RlcCA9IHN0ZXA7XG4gICAgdGhpcy5zaXplID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyBzdGVwIC0gMSkgKyAxKTtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICBpZiAoRU1QVFlfUkFOR0UpIHtcbiAgICAgICAgcmV0dXJuIEVNUFRZX1JBTkdFO1xuICAgICAgfVxuICAgICAgRU1QVFlfUkFOR0UgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIGlmICggSW5kZXhlZFNlcSQkMSApIFJhbmdlLl9fcHJvdG9fXyA9IEluZGV4ZWRTZXEkJDE7XG4gIFJhbmdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEluZGV4ZWRTZXEkJDEgJiYgSW5kZXhlZFNlcSQkMS5wcm90b3R5cGUgKTtcbiAgUmFuZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmFuZ2U7XG5cbiAgUmFuZ2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiAnUmFuZ2UgW10nO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgJ1JhbmdlIFsgJyArXG4gICAgICB0aGlzLl9zdGFydCArXG4gICAgICAnLi4uJyArXG4gICAgICB0aGlzLl9lbmQgK1xuICAgICAgKHRoaXMuX3N0ZXAgIT09IDEgPyAnIGJ5ICcgKyB0aGlzLl9zdGVwIDogJycpICtcbiAgICAgICcgXSdcbiAgICApO1xuICB9O1xuXG4gIFJhbmdlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGluZGV4LCBub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmhhcyhpbmRleClcbiAgICAgID8gdGhpcy5fc3RhcnQgKyB3cmFwSW5kZXgodGhpcywgaW5kZXgpICogdGhpcy5fc3RlcFxuICAgICAgOiBub3RTZXRWYWx1ZTtcbiAgfTtcblxuICBSYW5nZS5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAoc2VhcmNoVmFsdWUpIHtcbiAgICB2YXIgcG9zc2libGVJbmRleCA9IChzZWFyY2hWYWx1ZSAtIHRoaXMuX3N0YXJ0KSAvIHRoaXMuX3N0ZXA7XG4gICAgcmV0dXJuIChcbiAgICAgIHBvc3NpYmxlSW5kZXggPj0gMCAmJlxuICAgICAgcG9zc2libGVJbmRleCA8IHRoaXMuc2l6ZSAmJlxuICAgICAgcG9zc2libGVJbmRleCA9PT0gTWF0aC5mbG9vcihwb3NzaWJsZUluZGV4KVxuICAgICk7XG4gIH07XG5cbiAgUmFuZ2UucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKGJlZ2luLCBlbmQpIHtcbiAgICBpZiAod2hvbGVTbGljZShiZWdpbiwgZW5kLCB0aGlzLnNpemUpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYmVnaW4gPSByZXNvbHZlQmVnaW4oYmVnaW4sIHRoaXMuc2l6ZSk7XG4gICAgZW5kID0gcmVzb2x2ZUVuZChlbmQsIHRoaXMuc2l6ZSk7XG4gICAgaWYgKGVuZCA8PSBiZWdpbikge1xuICAgICAgcmV0dXJuIG5ldyBSYW5nZSgwLCAwKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSYW5nZShcbiAgICAgIHRoaXMuZ2V0KGJlZ2luLCB0aGlzLl9lbmQpLFxuICAgICAgdGhpcy5nZXQoZW5kLCB0aGlzLl9lbmQpLFxuICAgICAgdGhpcy5fc3RlcFxuICAgICk7XG4gIH07XG5cbiAgUmFuZ2UucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mIChzZWFyY2hWYWx1ZSkge1xuICAgIHZhciBvZmZzZXRWYWx1ZSA9IHNlYXJjaFZhbHVlIC0gdGhpcy5fc3RhcnQ7XG4gICAgaWYgKG9mZnNldFZhbHVlICUgdGhpcy5fc3RlcCA9PT0gMCkge1xuICAgICAgdmFyIGluZGV4ID0gb2Zmc2V0VmFsdWUgLyB0aGlzLl9zdGVwO1xuICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLnNpemUpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgUmFuZ2UucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHNlYXJjaFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXhPZihzZWFyY2hWYWx1ZSk7XG4gIH07XG5cbiAgUmFuZ2UucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICB2YXIgc3RlcCA9IHRoaXMuX3N0ZXA7XG4gICAgdmFyIHZhbHVlID0gcmV2ZXJzZSA/IHRoaXMuX3N0YXJ0ICsgKHNpemUgLSAxKSAqIHN0ZXAgOiB0aGlzLl9zdGFydDtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgIT09IHNpemUpIHtcbiAgICAgIGlmIChmbih2YWx1ZSwgcmV2ZXJzZSA/IHNpemUgLSArK2kgOiBpKyssIHRoaXMpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHZhbHVlICs9IHJldmVyc2UgPyAtc3RlcCA6IHN0ZXA7XG4gICAgfVxuICAgIHJldHVybiBpO1xuICB9O1xuXG4gIFJhbmdlLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBzaXplID0gdGhpcy5zaXplO1xuICAgIHZhciBzdGVwID0gdGhpcy5fc3RlcDtcbiAgICB2YXIgdmFsdWUgPSByZXZlcnNlID8gdGhpcy5fc3RhcnQgKyAoc2l6ZSAtIDEpICogc3RlcCA6IHRoaXMuX3N0YXJ0O1xuICAgIHZhciBpID0gMDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpID09PSBzaXplKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHZhciB2ID0gdmFsdWU7XG4gICAgICB2YWx1ZSArPSByZXZlcnNlID8gLXN0ZXAgOiBzdGVwO1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgcmV2ZXJzZSA/IHNpemUgLSArK2kgOiBpKyssIHYpO1xuICAgIH0pO1xuICB9O1xuXG4gIFJhbmdlLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKG90aGVyKSB7XG4gICAgcmV0dXJuIG90aGVyIGluc3RhbmNlb2YgUmFuZ2VcbiAgICAgID8gdGhpcy5fc3RhcnQgPT09IG90aGVyLl9zdGFydCAmJlxuICAgICAgICAgIHRoaXMuX2VuZCA9PT0gb3RoZXIuX2VuZCAmJlxuICAgICAgICAgIHRoaXMuX3N0ZXAgPT09IG90aGVyLl9zdGVwXG4gICAgICA6IGRlZXBFcXVhbCh0aGlzLCBvdGhlcik7XG4gIH07XG5cbiAgcmV0dXJuIFJhbmdlO1xufShJbmRleGVkU2VxKSk7XG5cbnZhciBFTVBUWV9SQU5HRTtcblxuZnVuY3Rpb24gZ2V0SW4oY29sbGVjdGlvbiwgc2VhcmNoS2V5UGF0aCwgbm90U2V0VmFsdWUpIHtcbiAgdmFyIGtleVBhdGggPSBjb2VyY2VLZXlQYXRoKHNlYXJjaEtleVBhdGgpO1xuICB2YXIgaSA9IDA7XG4gIHdoaWxlIChpICE9PSBrZXlQYXRoLmxlbmd0aCkge1xuICAgIGNvbGxlY3Rpb24gPSBnZXQoY29sbGVjdGlvbiwga2V5UGF0aFtpKytdLCBOT1RfU0VUKTtcbiAgICBpZiAoY29sbGVjdGlvbiA9PT0gTk9UX1NFVCkge1xuICAgICAgcmV0dXJuIG5vdFNldFZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29sbGVjdGlvbjtcbn1cblxuZnVuY3Rpb24gZ2V0SW4kMShzZWFyY2hLZXlQYXRoLCBub3RTZXRWYWx1ZSkge1xuICByZXR1cm4gZ2V0SW4odGhpcywgc2VhcmNoS2V5UGF0aCwgbm90U2V0VmFsdWUpO1xufVxuXG5mdW5jdGlvbiBoYXNJbihjb2xsZWN0aW9uLCBrZXlQYXRoKSB7XG4gIHJldHVybiBnZXRJbihjb2xsZWN0aW9uLCBrZXlQYXRoLCBOT1RfU0VUKSAhPT0gTk9UX1NFVDtcbn1cblxuZnVuY3Rpb24gaGFzSW4kMShzZWFyY2hLZXlQYXRoKSB7XG4gIHJldHVybiBoYXNJbih0aGlzLCBzZWFyY2hLZXlQYXRoKTtcbn1cblxuZnVuY3Rpb24gdG9PYmplY3QoKSB7XG4gIGFzc2VydE5vdEluZmluaXRlKHRoaXMuc2l6ZSk7XG4gIHZhciBvYmplY3QgPSB7fTtcbiAgdGhpcy5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGspIHtcbiAgICBvYmplY3Rba10gPSB2O1xuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuLy8gTm90ZTogYWxsIG9mIHRoZXNlIG1ldGhvZHMgYXJlIGRlcHJlY2F0ZWQuXG5Db2xsZWN0aW9uLmlzSXRlcmFibGUgPSBpc0NvbGxlY3Rpb247XG5Db2xsZWN0aW9uLmlzS2V5ZWQgPSBpc0tleWVkO1xuQ29sbGVjdGlvbi5pc0luZGV4ZWQgPSBpc0luZGV4ZWQ7XG5Db2xsZWN0aW9uLmlzQXNzb2NpYXRpdmUgPSBpc0Fzc29jaWF0aXZlO1xuQ29sbGVjdGlvbi5pc09yZGVyZWQgPSBpc09yZGVyZWQ7XG5cbkNvbGxlY3Rpb24uSXRlcmF0b3IgPSBJdGVyYXRvcjtcblxubWl4aW4oQ29sbGVjdGlvbiwge1xuICAvLyAjIyMgQ29udmVyc2lvbiB0byBvdGhlciB0eXBlc1xuXG4gIHRvQXJyYXk6IGZ1bmN0aW9uIHRvQXJyYXkoKSB7XG4gICAgYXNzZXJ0Tm90SW5maW5pdGUodGhpcy5zaXplKTtcbiAgICB2YXIgYXJyYXkgPSBuZXcgQXJyYXkodGhpcy5zaXplIHx8IDApO1xuICAgIHZhciB1c2VUdXBsZXMgPSBpc0tleWVkKHRoaXMpO1xuICAgIHZhciBpID0gMDtcbiAgICB0aGlzLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaykge1xuICAgICAgLy8gS2V5ZWQgY29sbGVjdGlvbnMgcHJvZHVjZSBhbiBhcnJheSBvZiB0dXBsZXMuXG4gICAgICBhcnJheVtpKytdID0gdXNlVHVwbGVzID8gW2ssIHZdIDogdjtcbiAgICB9KTtcbiAgICByZXR1cm4gYXJyYXk7XG4gIH0sXG5cbiAgdG9JbmRleGVkU2VxOiBmdW5jdGlvbiB0b0luZGV4ZWRTZXEoKSB7XG4gICAgcmV0dXJuIG5ldyBUb0luZGV4ZWRTZXF1ZW5jZSh0aGlzKTtcbiAgfSxcblxuICB0b0pTOiBmdW5jdGlvbiB0b0pTJDEoKSB7XG4gICAgcmV0dXJuIHRvSlModGhpcyk7XG4gIH0sXG5cbiAgdG9LZXllZFNlcTogZnVuY3Rpb24gdG9LZXllZFNlcSgpIHtcbiAgICByZXR1cm4gbmV3IFRvS2V5ZWRTZXF1ZW5jZSh0aGlzLCB0cnVlKTtcbiAgfSxcblxuICB0b01hcDogZnVuY3Rpb24gdG9NYXAoKSB7XG4gICAgLy8gVXNlIExhdGUgQmluZGluZyBoZXJlIHRvIHNvbHZlIHRoZSBjaXJjdWxhciBkZXBlbmRlbmN5LlxuICAgIHJldHVybiBNYXAodGhpcy50b0tleWVkU2VxKCkpO1xuICB9LFxuXG4gIHRvT2JqZWN0OiB0b09iamVjdCxcblxuICB0b09yZGVyZWRNYXA6IGZ1bmN0aW9uIHRvT3JkZXJlZE1hcCgpIHtcbiAgICAvLyBVc2UgTGF0ZSBCaW5kaW5nIGhlcmUgdG8gc29sdmUgdGhlIGNpcmN1bGFyIGRlcGVuZGVuY3kuXG4gICAgcmV0dXJuIE9yZGVyZWRNYXAodGhpcy50b0tleWVkU2VxKCkpO1xuICB9LFxuXG4gIHRvT3JkZXJlZFNldDogZnVuY3Rpb24gdG9PcmRlcmVkU2V0KCkge1xuICAgIC8vIFVzZSBMYXRlIEJpbmRpbmcgaGVyZSB0byBzb2x2ZSB0aGUgY2lyY3VsYXIgZGVwZW5kZW5jeS5cbiAgICByZXR1cm4gT3JkZXJlZFNldChpc0tleWVkKHRoaXMpID8gdGhpcy52YWx1ZVNlcSgpIDogdGhpcyk7XG4gIH0sXG5cbiAgdG9TZXQ6IGZ1bmN0aW9uIHRvU2V0KCkge1xuICAgIC8vIFVzZSBMYXRlIEJpbmRpbmcgaGVyZSB0byBzb2x2ZSB0aGUgY2lyY3VsYXIgZGVwZW5kZW5jeS5cbiAgICByZXR1cm4gU2V0KGlzS2V5ZWQodGhpcykgPyB0aGlzLnZhbHVlU2VxKCkgOiB0aGlzKTtcbiAgfSxcblxuICB0b1NldFNlcTogZnVuY3Rpb24gdG9TZXRTZXEoKSB7XG4gICAgcmV0dXJuIG5ldyBUb1NldFNlcXVlbmNlKHRoaXMpO1xuICB9LFxuXG4gIHRvU2VxOiBmdW5jdGlvbiB0b1NlcSgpIHtcbiAgICByZXR1cm4gaXNJbmRleGVkKHRoaXMpXG4gICAgICA/IHRoaXMudG9JbmRleGVkU2VxKClcbiAgICAgIDogaXNLZXllZCh0aGlzKVxuICAgICAgICA/IHRoaXMudG9LZXllZFNlcSgpXG4gICAgICAgIDogdGhpcy50b1NldFNlcSgpO1xuICB9LFxuXG4gIHRvU3RhY2s6IGZ1bmN0aW9uIHRvU3RhY2soKSB7XG4gICAgLy8gVXNlIExhdGUgQmluZGluZyBoZXJlIHRvIHNvbHZlIHRoZSBjaXJjdWxhciBkZXBlbmRlbmN5LlxuICAgIHJldHVybiBTdGFjayhpc0tleWVkKHRoaXMpID8gdGhpcy52YWx1ZVNlcSgpIDogdGhpcyk7XG4gIH0sXG5cbiAgdG9MaXN0OiBmdW5jdGlvbiB0b0xpc3QoKSB7XG4gICAgLy8gVXNlIExhdGUgQmluZGluZyBoZXJlIHRvIHNvbHZlIHRoZSBjaXJjdWxhciBkZXBlbmRlbmN5LlxuICAgIHJldHVybiBMaXN0KGlzS2V5ZWQodGhpcykgPyB0aGlzLnZhbHVlU2VxKCkgOiB0aGlzKTtcbiAgfSxcblxuICAvLyAjIyMgQ29tbW9uIEphdmFTY3JpcHQgbWV0aG9kcyBhbmQgcHJvcGVydGllc1xuXG4gIHRvU3RyaW5nOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ1tDb2xsZWN0aW9uXSc7XG4gIH0sXG5cbiAgX190b1N0cmluZzogZnVuY3Rpb24gX190b1N0cmluZyhoZWFkLCB0YWlsKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIGhlYWQgKyB0YWlsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgaGVhZCArXG4gICAgICAnICcgK1xuICAgICAgdGhpcy50b1NlcSgpXG4gICAgICAgIC5tYXAodGhpcy5fX3RvU3RyaW5nTWFwcGVyKVxuICAgICAgICAuam9pbignLCAnKSArXG4gICAgICAnICcgK1xuICAgICAgdGFpbFxuICAgICk7XG4gIH0sXG5cbiAgLy8gIyMjIEVTNiBDb2xsZWN0aW9uIG1ldGhvZHMgKEVTNiBBcnJheSBhbmQgTWFwKVxuXG4gIGNvbmNhdDogZnVuY3Rpb24gY29uY2F0KCkge1xuICAgIHZhciB2YWx1ZXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkgdmFsdWVzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICByZXR1cm4gcmVpZnkodGhpcywgY29uY2F0RmFjdG9yeSh0aGlzLCB2YWx1ZXMpKTtcbiAgfSxcblxuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoc2VhcmNoVmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5zb21lKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gaXModmFsdWUsIHNlYXJjaFZhbHVlKTsgfSk7XG4gIH0sXG5cbiAgZW50cmllczogZnVuY3Rpb24gZW50cmllcygpIHtcbiAgICByZXR1cm4gdGhpcy5fX2l0ZXJhdG9yKElURVJBVEVfRU5UUklFUyk7XG4gIH0sXG5cbiAgZXZlcnk6IGZ1bmN0aW9uIGV2ZXJ5KHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIGFzc2VydE5vdEluZmluaXRlKHRoaXMuc2l6ZSk7XG4gICAgdmFyIHJldHVyblZhbHVlID0gdHJ1ZTtcbiAgICB0aGlzLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaywgYykge1xuICAgICAgaWYgKCFwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2LCBrLCBjKSkge1xuICAgICAgICByZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9LFxuXG4gIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBmaWx0ZXJGYWN0b3J5KHRoaXMsIHByZWRpY2F0ZSwgY29udGV4dCwgdHJ1ZSkpO1xuICB9LFxuXG4gIGZpbmQ6IGZ1bmN0aW9uIGZpbmQocHJlZGljYXRlLCBjb250ZXh0LCBub3RTZXRWYWx1ZSkge1xuICAgIHZhciBlbnRyeSA9IHRoaXMuZmluZEVudHJ5KHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIGVudHJ5ID8gZW50cnlbMV0gOiBub3RTZXRWYWx1ZTtcbiAgfSxcblxuICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKHNpZGVFZmZlY3QsIGNvbnRleHQpIHtcbiAgICBhc3NlcnROb3RJbmZpbml0ZSh0aGlzLnNpemUpO1xuICAgIHJldHVybiB0aGlzLl9faXRlcmF0ZShjb250ZXh0ID8gc2lkZUVmZmVjdC5iaW5kKGNvbnRleHQpIDogc2lkZUVmZmVjdCk7XG4gIH0sXG5cbiAgam9pbjogZnVuY3Rpb24gam9pbihzZXBhcmF0b3IpIHtcbiAgICBhc3NlcnROb3RJbmZpbml0ZSh0aGlzLnNpemUpO1xuICAgIHNlcGFyYXRvciA9IHNlcGFyYXRvciAhPT0gdW5kZWZpbmVkID8gJycgKyBzZXBhcmF0b3IgOiAnLCc7XG4gICAgdmFyIGpvaW5lZCA9ICcnO1xuICAgIHZhciBpc0ZpcnN0ID0gdHJ1ZTtcbiAgICB0aGlzLl9faXRlcmF0ZShmdW5jdGlvbiAodikge1xuICAgICAgaXNGaXJzdCA/IChpc0ZpcnN0ID0gZmFsc2UpIDogKGpvaW5lZCArPSBzZXBhcmF0b3IpO1xuICAgICAgam9pbmVkICs9IHYgIT09IG51bGwgJiYgdiAhPT0gdW5kZWZpbmVkID8gdi50b1N0cmluZygpIDogJyc7XG4gICAgfSk7XG4gICAgcmV0dXJuIGpvaW5lZDtcbiAgfSxcblxuICBrZXlzOiBmdW5jdGlvbiBrZXlzKCkge1xuICAgIHJldHVybiB0aGlzLl9faXRlcmF0b3IoSVRFUkFURV9LRVlTKTtcbiAgfSxcblxuICBtYXA6IGZ1bmN0aW9uIG1hcChtYXBwZXIsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgbWFwRmFjdG9yeSh0aGlzLCBtYXBwZXIsIGNvbnRleHQpKTtcbiAgfSxcblxuICByZWR1Y2U6IGZ1bmN0aW9uIHJlZHVjZSQxKHJlZHVjZXIsIGluaXRpYWxSZWR1Y3Rpb24sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gcmVkdWNlKFxuICAgICAgdGhpcyxcbiAgICAgIHJlZHVjZXIsXG4gICAgICBpbml0aWFsUmVkdWN0aW9uLFxuICAgICAgY29udGV4dCxcbiAgICAgIGFyZ3VtZW50cy5sZW5ndGggPCAyLFxuICAgICAgZmFsc2VcbiAgICApO1xuICB9LFxuXG4gIHJlZHVjZVJpZ2h0OiBmdW5jdGlvbiByZWR1Y2VSaWdodChyZWR1Y2VyLCBpbml0aWFsUmVkdWN0aW9uLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHJlZHVjZShcbiAgICAgIHRoaXMsXG4gICAgICByZWR1Y2VyLFxuICAgICAgaW5pdGlhbFJlZHVjdGlvbixcbiAgICAgIGNvbnRleHQsXG4gICAgICBhcmd1bWVudHMubGVuZ3RoIDwgMixcbiAgICAgIHRydWVcbiAgICApO1xuICB9LFxuXG4gIHJldmVyc2U6IGZ1bmN0aW9uIHJldmVyc2UoKSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHJldmVyc2VGYWN0b3J5KHRoaXMsIHRydWUpKTtcbiAgfSxcblxuICBzbGljZTogZnVuY3Rpb24gc2xpY2UoYmVnaW4sIGVuZCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBzbGljZUZhY3RvcnkodGhpcywgYmVnaW4sIGVuZCwgdHJ1ZSkpO1xuICB9LFxuXG4gIHNvbWU6IGZ1bmN0aW9uIHNvbWUocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuICF0aGlzLmV2ZXJ5KG5vdChwcmVkaWNhdGUpLCBjb250ZXh0KTtcbiAgfSxcblxuICBzb3J0OiBmdW5jdGlvbiBzb3J0KGNvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgc29ydEZhY3RvcnkodGhpcywgY29tcGFyYXRvcikpO1xuICB9LFxuXG4gIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9faXRlcmF0b3IoSVRFUkFURV9WQUxVRVMpO1xuICB9LFxuXG4gIC8vICMjIyBNb3JlIHNlcXVlbnRpYWwgbWV0aG9kc1xuXG4gIGJ1dExhc3Q6IGZ1bmN0aW9uIGJ1dExhc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2xpY2UoMCwgLTEpO1xuICB9LFxuXG4gIGlzRW1wdHk6IGZ1bmN0aW9uIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSAhPT0gdW5kZWZpbmVkID8gdGhpcy5zaXplID09PSAwIDogIXRoaXMuc29tZShmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlOyB9KTtcbiAgfSxcblxuICBjb3VudDogZnVuY3Rpb24gY291bnQocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGVuc3VyZVNpemUoXG4gICAgICBwcmVkaWNhdGUgPyB0aGlzLnRvU2VxKCkuZmlsdGVyKHByZWRpY2F0ZSwgY29udGV4dCkgOiB0aGlzXG4gICAgKTtcbiAgfSxcblxuICBjb3VudEJ5OiBmdW5jdGlvbiBjb3VudEJ5KGdyb3VwZXIsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gY291bnRCeUZhY3RvcnkodGhpcywgZ3JvdXBlciwgY29udGV4dCk7XG4gIH0sXG5cbiAgZXF1YWxzOiBmdW5jdGlvbiBlcXVhbHMob3RoZXIpIHtcbiAgICByZXR1cm4gZGVlcEVxdWFsKHRoaXMsIG90aGVyKTtcbiAgfSxcblxuICBlbnRyeVNlcTogZnVuY3Rpb24gZW50cnlTZXEoKSB7XG4gICAgdmFyIGNvbGxlY3Rpb24gPSB0aGlzO1xuICAgIGlmIChjb2xsZWN0aW9uLl9jYWNoZSkge1xuICAgICAgLy8gV2UgY2FjaGUgYXMgYW4gZW50cmllcyBhcnJheSwgc28gd2UgY2FuIGp1c3QgcmV0dXJuIHRoZSBjYWNoZSFcbiAgICAgIHJldHVybiBuZXcgQXJyYXlTZXEoY29sbGVjdGlvbi5fY2FjaGUpO1xuICAgIH1cbiAgICB2YXIgZW50cmllc1NlcXVlbmNlID0gY29sbGVjdGlvblxuICAgICAgLnRvU2VxKClcbiAgICAgIC5tYXAoZW50cnlNYXBwZXIpXG4gICAgICAudG9JbmRleGVkU2VxKCk7XG4gICAgZW50cmllc1NlcXVlbmNlLmZyb21FbnRyeVNlcSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbGxlY3Rpb24udG9TZXEoKTsgfTtcbiAgICByZXR1cm4gZW50cmllc1NlcXVlbmNlO1xuICB9LFxuXG4gIGZpbHRlck5vdDogZnVuY3Rpb24gZmlsdGVyTm90KHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLmZpbHRlcihub3QocHJlZGljYXRlKSwgY29udGV4dCk7XG4gIH0sXG5cbiAgZmluZEVudHJ5OiBmdW5jdGlvbiBmaW5kRW50cnkocHJlZGljYXRlLCBjb250ZXh0LCBub3RTZXRWYWx1ZSkge1xuICAgIHZhciBmb3VuZCA9IG5vdFNldFZhbHVlO1xuICAgIHRoaXMuX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrLCBjKSB7XG4gICAgICBpZiAocHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwgaywgYykpIHtcbiAgICAgICAgZm91bmQgPSBbaywgdl07XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm91bmQ7XG4gIH0sXG5cbiAgZmluZEtleTogZnVuY3Rpb24gZmluZEtleShwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgZW50cnkgPSB0aGlzLmZpbmRFbnRyeShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeVswXTtcbiAgfSxcblxuICBmaW5kTGFzdDogZnVuY3Rpb24gZmluZExhc3QocHJlZGljYXRlLCBjb250ZXh0LCBub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnRvS2V5ZWRTZXEoKVxuICAgICAgLnJldmVyc2UoKVxuICAgICAgLmZpbmQocHJlZGljYXRlLCBjb250ZXh0LCBub3RTZXRWYWx1ZSk7XG4gIH0sXG5cbiAgZmluZExhc3RFbnRyeTogZnVuY3Rpb24gZmluZExhc3RFbnRyeShwcmVkaWNhdGUsIGNvbnRleHQsIG5vdFNldFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMudG9LZXllZFNlcSgpXG4gICAgICAucmV2ZXJzZSgpXG4gICAgICAuZmluZEVudHJ5KHByZWRpY2F0ZSwgY29udGV4dCwgbm90U2V0VmFsdWUpO1xuICB9LFxuXG4gIGZpbmRMYXN0S2V5OiBmdW5jdGlvbiBmaW5kTGFzdEtleShwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy50b0tleWVkU2VxKClcbiAgICAgIC5yZXZlcnNlKClcbiAgICAgIC5maW5kS2V5KHByZWRpY2F0ZSwgY29udGV4dCk7XG4gIH0sXG5cbiAgZmlyc3Q6IGZ1bmN0aW9uIGZpcnN0KG5vdFNldFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZChyZXR1cm5UcnVlLCBudWxsLCBub3RTZXRWYWx1ZSk7XG4gIH0sXG5cbiAgZmxhdE1hcDogZnVuY3Rpb24gZmxhdE1hcChtYXBwZXIsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgZmxhdE1hcEZhY3RvcnkodGhpcywgbWFwcGVyLCBjb250ZXh0KSk7XG4gIH0sXG5cbiAgZmxhdHRlbjogZnVuY3Rpb24gZmxhdHRlbihkZXB0aCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBmbGF0dGVuRmFjdG9yeSh0aGlzLCBkZXB0aCwgdHJ1ZSkpO1xuICB9LFxuXG4gIGZyb21FbnRyeVNlcTogZnVuY3Rpb24gZnJvbUVudHJ5U2VxKCkge1xuICAgIHJldHVybiBuZXcgRnJvbUVudHJpZXNTZXF1ZW5jZSh0aGlzKTtcbiAgfSxcblxuICBnZXQ6IGZ1bmN0aW9uIGdldChzZWFyY2hLZXksIG5vdFNldFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZChmdW5jdGlvbiAoXywga2V5KSB7IHJldHVybiBpcyhrZXksIHNlYXJjaEtleSk7IH0sIHVuZGVmaW5lZCwgbm90U2V0VmFsdWUpO1xuICB9LFxuXG4gIGdldEluOiBnZXRJbiQxLFxuXG4gIGdyb3VwQnk6IGZ1bmN0aW9uIGdyb3VwQnkoZ3JvdXBlciwgY29udGV4dCkge1xuICAgIHJldHVybiBncm91cEJ5RmFjdG9yeSh0aGlzLCBncm91cGVyLCBjb250ZXh0KTtcbiAgfSxcblxuICBoYXM6IGZ1bmN0aW9uIGhhcyhzZWFyY2hLZXkpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoc2VhcmNoS2V5LCBOT1RfU0VUKSAhPT0gTk9UX1NFVDtcbiAgfSxcblxuICBoYXNJbjogaGFzSW4kMSxcblxuICBpc1N1YnNldDogZnVuY3Rpb24gaXNTdWJzZXQoaXRlcikge1xuICAgIGl0ZXIgPSB0eXBlb2YgaXRlci5pbmNsdWRlcyA9PT0gJ2Z1bmN0aW9uJyA/IGl0ZXIgOiBDb2xsZWN0aW9uKGl0ZXIpO1xuICAgIHJldHVybiB0aGlzLmV2ZXJ5KGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gaXRlci5pbmNsdWRlcyh2YWx1ZSk7IH0pO1xuICB9LFxuXG4gIGlzU3VwZXJzZXQ6IGZ1bmN0aW9uIGlzU3VwZXJzZXQoaXRlcikge1xuICAgIGl0ZXIgPSB0eXBlb2YgaXRlci5pc1N1YnNldCA9PT0gJ2Z1bmN0aW9uJyA/IGl0ZXIgOiBDb2xsZWN0aW9uKGl0ZXIpO1xuICAgIHJldHVybiBpdGVyLmlzU3Vic2V0KHRoaXMpO1xuICB9LFxuXG4gIGtleU9mOiBmdW5jdGlvbiBrZXlPZihzZWFyY2hWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmZpbmRLZXkoZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBpcyh2YWx1ZSwgc2VhcmNoVmFsdWUpOyB9KTtcbiAgfSxcblxuICBrZXlTZXE6IGZ1bmN0aW9uIGtleVNlcSgpIHtcbiAgICByZXR1cm4gdGhpcy50b1NlcSgpXG4gICAgICAubWFwKGtleU1hcHBlcilcbiAgICAgIC50b0luZGV4ZWRTZXEoKTtcbiAgfSxcblxuICBsYXN0OiBmdW5jdGlvbiBsYXN0KG5vdFNldFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMudG9TZXEoKVxuICAgICAgLnJldmVyc2UoKVxuICAgICAgLmZpcnN0KG5vdFNldFZhbHVlKTtcbiAgfSxcblxuICBsYXN0S2V5T2Y6IGZ1bmN0aW9uIGxhc3RLZXlPZihzZWFyY2hWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnRvS2V5ZWRTZXEoKVxuICAgICAgLnJldmVyc2UoKVxuICAgICAgLmtleU9mKHNlYXJjaFZhbHVlKTtcbiAgfSxcblxuICBtYXg6IGZ1bmN0aW9uIG1heChjb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuIG1heEZhY3RvcnkodGhpcywgY29tcGFyYXRvcik7XG4gIH0sXG5cbiAgbWF4Qnk6IGZ1bmN0aW9uIG1heEJ5KG1hcHBlciwgY29tcGFyYXRvcikge1xuICAgIHJldHVybiBtYXhGYWN0b3J5KHRoaXMsIGNvbXBhcmF0b3IsIG1hcHBlcik7XG4gIH0sXG5cbiAgbWluOiBmdW5jdGlvbiBtaW4oY29tcGFyYXRvcikge1xuICAgIHJldHVybiBtYXhGYWN0b3J5KFxuICAgICAgdGhpcyxcbiAgICAgIGNvbXBhcmF0b3IgPyBuZWcoY29tcGFyYXRvcikgOiBkZWZhdWx0TmVnQ29tcGFyYXRvclxuICAgICk7XG4gIH0sXG5cbiAgbWluQnk6IGZ1bmN0aW9uIG1pbkJ5KG1hcHBlciwgY29tcGFyYXRvcikge1xuICAgIHJldHVybiBtYXhGYWN0b3J5KFxuICAgICAgdGhpcyxcbiAgICAgIGNvbXBhcmF0b3IgPyBuZWcoY29tcGFyYXRvcikgOiBkZWZhdWx0TmVnQ29tcGFyYXRvcixcbiAgICAgIG1hcHBlclxuICAgICk7XG4gIH0sXG5cbiAgcmVzdDogZnVuY3Rpb24gcmVzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5zbGljZSgxKTtcbiAgfSxcblxuICBza2lwOiBmdW5jdGlvbiBza2lwKGFtb3VudCkge1xuICAgIHJldHVybiBhbW91bnQgPT09IDAgPyB0aGlzIDogdGhpcy5zbGljZShNYXRoLm1heCgwLCBhbW91bnQpKTtcbiAgfSxcblxuICBza2lwTGFzdDogZnVuY3Rpb24gc2tpcExhc3QoYW1vdW50KSB7XG4gICAgcmV0dXJuIGFtb3VudCA9PT0gMCA/IHRoaXMgOiB0aGlzLnNsaWNlKDAsIC1NYXRoLm1heCgwLCBhbW91bnQpKTtcbiAgfSxcblxuICBza2lwV2hpbGU6IGZ1bmN0aW9uIHNraXBXaGlsZShwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgc2tpcFdoaWxlRmFjdG9yeSh0aGlzLCBwcmVkaWNhdGUsIGNvbnRleHQsIHRydWUpKTtcbiAgfSxcblxuICBza2lwVW50aWw6IGZ1bmN0aW9uIHNraXBVbnRpbChwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5za2lwV2hpbGUobm90KHByZWRpY2F0ZSksIGNvbnRleHQpO1xuICB9LFxuXG4gIHNvcnRCeTogZnVuY3Rpb24gc29ydEJ5KG1hcHBlciwgY29tcGFyYXRvcikge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBzb3J0RmFjdG9yeSh0aGlzLCBjb21wYXJhdG9yLCBtYXBwZXIpKTtcbiAgfSxcblxuICB0YWtlOiBmdW5jdGlvbiB0YWtlKGFtb3VudCkge1xuICAgIHJldHVybiB0aGlzLnNsaWNlKDAsIE1hdGgubWF4KDAsIGFtb3VudCkpO1xuICB9LFxuXG4gIHRha2VMYXN0OiBmdW5jdGlvbiB0YWtlTGFzdChhbW91bnQpIHtcbiAgICByZXR1cm4gdGhpcy5zbGljZSgtTWF0aC5tYXgoMCwgYW1vdW50KSk7XG4gIH0sXG5cbiAgdGFrZVdoaWxlOiBmdW5jdGlvbiB0YWtlV2hpbGUocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHRha2VXaGlsZUZhY3RvcnkodGhpcywgcHJlZGljYXRlLCBjb250ZXh0KSk7XG4gIH0sXG5cbiAgdGFrZVVudGlsOiBmdW5jdGlvbiB0YWtlVW50aWwocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMudGFrZVdoaWxlKG5vdChwcmVkaWNhdGUpLCBjb250ZXh0KTtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShmbikge1xuICAgIHJldHVybiBmbih0aGlzKTtcbiAgfSxcblxuICB2YWx1ZVNlcTogZnVuY3Rpb24gdmFsdWVTZXEoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9JbmRleGVkU2VxKCk7XG4gIH0sXG5cbiAgLy8gIyMjIEhhc2hhYmxlIE9iamVjdFxuXG4gIGhhc2hDb2RlOiBmdW5jdGlvbiBoYXNoQ29kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fX2hhc2ggfHwgKHRoaXMuX19oYXNoID0gaGFzaENvbGxlY3Rpb24odGhpcykpO1xuICB9LFxuXG4gIC8vICMjIyBJbnRlcm5hbFxuXG4gIC8vIGFic3RyYWN0IF9faXRlcmF0ZShmbiwgcmV2ZXJzZSlcblxuICAvLyBhYnN0cmFjdCBfX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpXG59KTtcblxudmFyIENvbGxlY3Rpb25Qcm90b3R5cGUgPSBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbkNvbGxlY3Rpb25Qcm90b3R5cGVbSVNfQ09MTEVDVElPTl9TWU1CT0xdID0gdHJ1ZTtcbkNvbGxlY3Rpb25Qcm90b3R5cGVbSVRFUkFUT1JfU1lNQk9MXSA9IENvbGxlY3Rpb25Qcm90b3R5cGUudmFsdWVzO1xuQ29sbGVjdGlvblByb3RvdHlwZS50b0pTT04gPSBDb2xsZWN0aW9uUHJvdG90eXBlLnRvQXJyYXk7XG5Db2xsZWN0aW9uUHJvdG90eXBlLl9fdG9TdHJpbmdNYXBwZXIgPSBxdW90ZVN0cmluZztcbkNvbGxlY3Rpb25Qcm90b3R5cGUuaW5zcGVjdCA9IENvbGxlY3Rpb25Qcm90b3R5cGUudG9Tb3VyY2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbn07XG5Db2xsZWN0aW9uUHJvdG90eXBlLmNoYWluID0gQ29sbGVjdGlvblByb3RvdHlwZS5mbGF0TWFwO1xuQ29sbGVjdGlvblByb3RvdHlwZS5jb250YWlucyA9IENvbGxlY3Rpb25Qcm90b3R5cGUuaW5jbHVkZXM7XG5cbm1peGluKEtleWVkQ29sbGVjdGlvbiwge1xuICAvLyAjIyMgTW9yZSBzZXF1ZW50aWFsIG1ldGhvZHNcblxuICBmbGlwOiBmdW5jdGlvbiBmbGlwKCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBmbGlwRmFjdG9yeSh0aGlzKSk7XG4gIH0sXG5cbiAgbWFwRW50cmllczogZnVuY3Rpb24gbWFwRW50cmllcyhtYXBwZXIsIGNvbnRleHQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICByZXR1cm4gcmVpZnkoXG4gICAgICB0aGlzLFxuICAgICAgdGhpcy50b1NlcSgpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIG1hcHBlci5jYWxsKGNvbnRleHQsIFtrLCB2XSwgaXRlcmF0aW9ucysrLCB0aGlzJDEpOyB9KVxuICAgICAgICAuZnJvbUVudHJ5U2VxKClcbiAgICApO1xuICB9LFxuXG4gIG1hcEtleXM6IGZ1bmN0aW9uIG1hcEtleXMobWFwcGVyLCBjb250ZXh0KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByZXR1cm4gcmVpZnkoXG4gICAgICB0aGlzLFxuICAgICAgdGhpcy50b1NlcSgpXG4gICAgICAgIC5mbGlwKClcbiAgICAgICAgLm1hcChmdW5jdGlvbiAoaywgdikgeyByZXR1cm4gbWFwcGVyLmNhbGwoY29udGV4dCwgaywgdiwgdGhpcyQxKTsgfSlcbiAgICAgICAgLmZsaXAoKVxuICAgICk7XG4gIH0sXG59KTtcblxudmFyIEtleWVkQ29sbGVjdGlvblByb3RvdHlwZSA9IEtleWVkQ29sbGVjdGlvbi5wcm90b3R5cGU7XG5LZXllZENvbGxlY3Rpb25Qcm90b3R5cGVbSVNfS0VZRURfU1lNQk9MXSA9IHRydWU7XG5LZXllZENvbGxlY3Rpb25Qcm90b3R5cGVbSVRFUkFUT1JfU1lNQk9MXSA9IENvbGxlY3Rpb25Qcm90b3R5cGUuZW50cmllcztcbktleWVkQ29sbGVjdGlvblByb3RvdHlwZS50b0pTT04gPSB0b09iamVjdDtcbktleWVkQ29sbGVjdGlvblByb3RvdHlwZS5fX3RvU3RyaW5nTWFwcGVyID0gZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIHF1b3RlU3RyaW5nKGspICsgJzogJyArIHF1b3RlU3RyaW5nKHYpOyB9O1xuXG5taXhpbihJbmRleGVkQ29sbGVjdGlvbiwge1xuICAvLyAjIyMgQ29udmVyc2lvbiB0byBvdGhlciB0eXBlc1xuXG4gIHRvS2V5ZWRTZXE6IGZ1bmN0aW9uIHRvS2V5ZWRTZXEoKSB7XG4gICAgcmV0dXJuIG5ldyBUb0tleWVkU2VxdWVuY2UodGhpcywgZmFsc2UpO1xuICB9LFxuXG4gIC8vICMjIyBFUzYgQ29sbGVjdGlvbiBtZXRob2RzIChFUzYgQXJyYXkgYW5kIE1hcClcblxuICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcihwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgZmlsdGVyRmFjdG9yeSh0aGlzLCBwcmVkaWNhdGUsIGNvbnRleHQsIGZhbHNlKSk7XG4gIH0sXG5cbiAgZmluZEluZGV4OiBmdW5jdGlvbiBmaW5kSW5kZXgocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIGVudHJ5ID0gdGhpcy5maW5kRW50cnkocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gZW50cnkgPyBlbnRyeVswXSA6IC0xO1xuICB9LFxuXG4gIGluZGV4T2Y6IGZ1bmN0aW9uIGluZGV4T2Yoc2VhcmNoVmFsdWUpIHtcbiAgICB2YXIga2V5ID0gdGhpcy5rZXlPZihzZWFyY2hWYWx1ZSk7XG4gICAgcmV0dXJuIGtleSA9PT0gdW5kZWZpbmVkID8gLTEgOiBrZXk7XG4gIH0sXG5cbiAgbGFzdEluZGV4T2Y6IGZ1bmN0aW9uIGxhc3RJbmRleE9mKHNlYXJjaFZhbHVlKSB7XG4gICAgdmFyIGtleSA9IHRoaXMubGFzdEtleU9mKHNlYXJjaFZhbHVlKTtcbiAgICByZXR1cm4ga2V5ID09PSB1bmRlZmluZWQgPyAtMSA6IGtleTtcbiAgfSxcblxuICByZXZlcnNlOiBmdW5jdGlvbiByZXZlcnNlKCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCByZXZlcnNlRmFjdG9yeSh0aGlzLCBmYWxzZSkpO1xuICB9LFxuXG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShiZWdpbiwgZW5kKSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHNsaWNlRmFjdG9yeSh0aGlzLCBiZWdpbiwgZW5kLCBmYWxzZSkpO1xuICB9LFxuXG4gIHNwbGljZTogZnVuY3Rpb24gc3BsaWNlKGluZGV4LCByZW1vdmVOdW0gLyosIC4uLnZhbHVlcyovKSB7XG4gICAgdmFyIG51bUFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHJlbW92ZU51bSA9IE1hdGgubWF4KHJlbW92ZU51bSB8fCAwLCAwKTtcbiAgICBpZiAobnVtQXJncyA9PT0gMCB8fCAobnVtQXJncyA9PT0gMiAmJiAhcmVtb3ZlTnVtKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIElmIGluZGV4IGlzIG5lZ2F0aXZlLCBpdCBzaG91bGQgcmVzb2x2ZSByZWxhdGl2ZSB0byB0aGUgc2l6ZSBvZiB0aGVcbiAgICAvLyBjb2xsZWN0aW9uLiBIb3dldmVyIHNpemUgbWF5IGJlIGV4cGVuc2l2ZSB0byBjb21wdXRlIGlmIG5vdCBjYWNoZWQsIHNvXG4gICAgLy8gb25seSBjYWxsIGNvdW50KCkgaWYgdGhlIG51bWJlciBpcyBpbiBmYWN0IG5lZ2F0aXZlLlxuICAgIGluZGV4ID0gcmVzb2x2ZUJlZ2luKGluZGV4LCBpbmRleCA8IDAgPyB0aGlzLmNvdW50KCkgOiB0aGlzLnNpemUpO1xuICAgIHZhciBzcGxpY2VkID0gdGhpcy5zbGljZSgwLCBpbmRleCk7XG4gICAgcmV0dXJuIHJlaWZ5KFxuICAgICAgdGhpcyxcbiAgICAgIG51bUFyZ3MgPT09IDFcbiAgICAgICAgPyBzcGxpY2VkXG4gICAgICAgIDogc3BsaWNlZC5jb25jYXQoYXJyQ29weShhcmd1bWVudHMsIDIpLCB0aGlzLnNsaWNlKGluZGV4ICsgcmVtb3ZlTnVtKSlcbiAgICApO1xuICB9LFxuXG4gIC8vICMjIyBNb3JlIGNvbGxlY3Rpb24gbWV0aG9kc1xuXG4gIGZpbmRMYXN0SW5kZXg6IGZ1bmN0aW9uIGZpbmRMYXN0SW5kZXgocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIGVudHJ5ID0gdGhpcy5maW5kTGFzdEVudHJ5KHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIGVudHJ5ID8gZW50cnlbMF0gOiAtMTtcbiAgfSxcblxuICBmaXJzdDogZnVuY3Rpb24gZmlyc3Qobm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoMCwgbm90U2V0VmFsdWUpO1xuICB9LFxuXG4gIGZsYXR0ZW46IGZ1bmN0aW9uIGZsYXR0ZW4oZGVwdGgpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgZmxhdHRlbkZhY3RvcnkodGhpcywgZGVwdGgsIGZhbHNlKSk7XG4gIH0sXG5cbiAgZ2V0OiBmdW5jdGlvbiBnZXQoaW5kZXgsIG5vdFNldFZhbHVlKSB7XG4gICAgaW5kZXggPSB3cmFwSW5kZXgodGhpcywgaW5kZXgpO1xuICAgIHJldHVybiBpbmRleCA8IDAgfHxcbiAgICAgICh0aGlzLnNpemUgPT09IEluZmluaXR5IHx8ICh0aGlzLnNpemUgIT09IHVuZGVmaW5lZCAmJiBpbmRleCA+IHRoaXMuc2l6ZSkpXG4gICAgICA/IG5vdFNldFZhbHVlXG4gICAgICA6IHRoaXMuZmluZChmdW5jdGlvbiAoXywga2V5KSB7IHJldHVybiBrZXkgPT09IGluZGV4OyB9LCB1bmRlZmluZWQsIG5vdFNldFZhbHVlKTtcbiAgfSxcblxuICBoYXM6IGZ1bmN0aW9uIGhhcyhpbmRleCkge1xuICAgIGluZGV4ID0gd3JhcEluZGV4KHRoaXMsIGluZGV4KTtcbiAgICByZXR1cm4gKFxuICAgICAgaW5kZXggPj0gMCAmJlxuICAgICAgKHRoaXMuc2l6ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gdGhpcy5zaXplID09PSBJbmZpbml0eSB8fCBpbmRleCA8IHRoaXMuc2l6ZVxuICAgICAgICA6IHRoaXMuaW5kZXhPZihpbmRleCkgIT09IC0xKVxuICAgICk7XG4gIH0sXG5cbiAgaW50ZXJwb3NlOiBmdW5jdGlvbiBpbnRlcnBvc2Uoc2VwYXJhdG9yKSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIGludGVycG9zZUZhY3RvcnkodGhpcywgc2VwYXJhdG9yKSk7XG4gIH0sXG5cbiAgaW50ZXJsZWF2ZTogZnVuY3Rpb24gaW50ZXJsZWF2ZSgvKi4uLmNvbGxlY3Rpb25zKi8pIHtcbiAgICB2YXIgY29sbGVjdGlvbnMgPSBbdGhpc10uY29uY2F0KGFyckNvcHkoYXJndW1lbnRzKSk7XG4gICAgdmFyIHppcHBlZCA9IHppcFdpdGhGYWN0b3J5KHRoaXMudG9TZXEoKSwgSW5kZXhlZFNlcS5vZiwgY29sbGVjdGlvbnMpO1xuICAgIHZhciBpbnRlcmxlYXZlZCA9IHppcHBlZC5mbGF0dGVuKHRydWUpO1xuICAgIGlmICh6aXBwZWQuc2l6ZSkge1xuICAgICAgaW50ZXJsZWF2ZWQuc2l6ZSA9IHppcHBlZC5zaXplICogY29sbGVjdGlvbnMubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gcmVpZnkodGhpcywgaW50ZXJsZWF2ZWQpO1xuICB9LFxuXG4gIGtleVNlcTogZnVuY3Rpb24ga2V5U2VxKCkge1xuICAgIHJldHVybiBSYW5nZSgwLCB0aGlzLnNpemUpO1xuICB9LFxuXG4gIGxhc3Q6IGZ1bmN0aW9uIGxhc3Qobm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoLTEsIG5vdFNldFZhbHVlKTtcbiAgfSxcblxuICBza2lwV2hpbGU6IGZ1bmN0aW9uIHNraXBXaGlsZShwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgc2tpcFdoaWxlRmFjdG9yeSh0aGlzLCBwcmVkaWNhdGUsIGNvbnRleHQsIGZhbHNlKSk7XG4gIH0sXG5cbiAgemlwOiBmdW5jdGlvbiB6aXAoLyosIC4uLmNvbGxlY3Rpb25zICovKSB7XG4gICAgdmFyIGNvbGxlY3Rpb25zID0gW3RoaXNdLmNvbmNhdChhcnJDb3B5KGFyZ3VtZW50cykpO1xuICAgIHJldHVybiByZWlmeSh0aGlzLCB6aXBXaXRoRmFjdG9yeSh0aGlzLCBkZWZhdWx0WmlwcGVyLCBjb2xsZWN0aW9ucykpO1xuICB9LFxuXG4gIHppcEFsbDogZnVuY3Rpb24gemlwQWxsKC8qLCAuLi5jb2xsZWN0aW9ucyAqLykge1xuICAgIHZhciBjb2xsZWN0aW9ucyA9IFt0aGlzXS5jb25jYXQoYXJyQ29weShhcmd1bWVudHMpKTtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgemlwV2l0aEZhY3RvcnkodGhpcywgZGVmYXVsdFppcHBlciwgY29sbGVjdGlvbnMsIHRydWUpKTtcbiAgfSxcblxuICB6aXBXaXRoOiBmdW5jdGlvbiB6aXBXaXRoKHppcHBlciAvKiwgLi4uY29sbGVjdGlvbnMgKi8pIHtcbiAgICB2YXIgY29sbGVjdGlvbnMgPSBhcnJDb3B5KGFyZ3VtZW50cyk7XG4gICAgY29sbGVjdGlvbnNbMF0gPSB0aGlzO1xuICAgIHJldHVybiByZWlmeSh0aGlzLCB6aXBXaXRoRmFjdG9yeSh0aGlzLCB6aXBwZXIsIGNvbGxlY3Rpb25zKSk7XG4gIH0sXG59KTtcblxudmFyIEluZGV4ZWRDb2xsZWN0aW9uUHJvdG90eXBlID0gSW5kZXhlZENvbGxlY3Rpb24ucHJvdG90eXBlO1xuSW5kZXhlZENvbGxlY3Rpb25Qcm90b3R5cGVbSVNfSU5ERVhFRF9TWU1CT0xdID0gdHJ1ZTtcbkluZGV4ZWRDb2xsZWN0aW9uUHJvdG90eXBlW0lTX09SREVSRURfU1lNQk9MXSA9IHRydWU7XG5cbm1peGluKFNldENvbGxlY3Rpb24sIHtcbiAgLy8gIyMjIEVTNiBDb2xsZWN0aW9uIG1ldGhvZHMgKEVTNiBBcnJheSBhbmQgTWFwKVxuXG4gIGdldDogZnVuY3Rpb24gZ2V0KHZhbHVlLCBub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmhhcyh2YWx1ZSkgPyB2YWx1ZSA6IG5vdFNldFZhbHVlO1xuICB9LFxuXG4gIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmhhcyh2YWx1ZSk7XG4gIH0sXG5cbiAgLy8gIyMjIE1vcmUgc2VxdWVudGlhbCBtZXRob2RzXG5cbiAga2V5U2VxOiBmdW5jdGlvbiBrZXlTZXEoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVTZXEoKTtcbiAgfSxcbn0pO1xuXG5TZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5oYXMgPSBDb2xsZWN0aW9uUHJvdG90eXBlLmluY2x1ZGVzO1xuU2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuY29udGFpbnMgPSBTZXRDb2xsZWN0aW9uLnByb3RvdHlwZS5pbmNsdWRlcztcblxuLy8gTWl4aW4gc3ViY2xhc3Nlc1xuXG5taXhpbihLZXllZFNlcSwgS2V5ZWRDb2xsZWN0aW9uLnByb3RvdHlwZSk7XG5taXhpbihJbmRleGVkU2VxLCBJbmRleGVkQ29sbGVjdGlvbi5wcm90b3R5cGUpO1xubWl4aW4oU2V0U2VxLCBTZXRDb2xsZWN0aW9uLnByb3RvdHlwZSk7XG5cbi8vICNwcmFnbWEgSGVscGVyIGZ1bmN0aW9uc1xuXG5mdW5jdGlvbiByZWR1Y2UoY29sbGVjdGlvbiwgcmVkdWNlciwgcmVkdWN0aW9uLCBjb250ZXh0LCB1c2VGaXJzdCwgcmV2ZXJzZSkge1xuICBhc3NlcnROb3RJbmZpbml0ZShjb2xsZWN0aW9uLnNpemUpO1xuICBjb2xsZWN0aW9uLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaywgYykge1xuICAgIGlmICh1c2VGaXJzdCkge1xuICAgICAgdXNlRmlyc3QgPSBmYWxzZTtcbiAgICAgIHJlZHVjdGlvbiA9IHY7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlZHVjdGlvbiA9IHJlZHVjZXIuY2FsbChjb250ZXh0LCByZWR1Y3Rpb24sIHYsIGssIGMpO1xuICAgIH1cbiAgfSwgcmV2ZXJzZSk7XG4gIHJldHVybiByZWR1Y3Rpb247XG59XG5cbmZ1bmN0aW9uIGtleU1hcHBlcih2LCBrKSB7XG4gIHJldHVybiBrO1xufVxuXG5mdW5jdGlvbiBlbnRyeU1hcHBlcih2LCBrKSB7XG4gIHJldHVybiBbaywgdl07XG59XG5cbmZ1bmN0aW9uIG5vdChwcmVkaWNhdGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAhcHJlZGljYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG5lZyhwcmVkaWNhdGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAtcHJlZGljYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRaaXBwZXIoKSB7XG4gIHJldHVybiBhcnJDb3B5KGFyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHROZWdDb21wYXJhdG9yKGEsIGIpIHtcbiAgcmV0dXJuIGEgPCBiID8gMSA6IGEgPiBiID8gLTEgOiAwO1xufVxuXG5mdW5jdGlvbiBoYXNoQ29sbGVjdGlvbihjb2xsZWN0aW9uKSB7XG4gIGlmIChjb2xsZWN0aW9uLnNpemUgPT09IEluZmluaXR5KSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgdmFyIG9yZGVyZWQgPSBpc09yZGVyZWQoY29sbGVjdGlvbik7XG4gIHZhciBrZXllZCA9IGlzS2V5ZWQoY29sbGVjdGlvbik7XG4gIHZhciBoID0gb3JkZXJlZCA/IDEgOiAwO1xuICB2YXIgc2l6ZSA9IGNvbGxlY3Rpb24uX19pdGVyYXRlKFxuICAgIGtleWVkXG4gICAgICA/IG9yZGVyZWRcbiAgICAgICAgPyBmdW5jdGlvbiAodiwgaykge1xuICAgICAgICAgICAgaCA9ICgzMSAqIGggKyBoYXNoTWVyZ2UoaGFzaCh2KSwgaGFzaChrKSkpIHwgMDtcbiAgICAgICAgICB9XG4gICAgICAgIDogZnVuY3Rpb24gKHYsIGspIHtcbiAgICAgICAgICAgIGggPSAoaCArIGhhc2hNZXJnZShoYXNoKHYpLCBoYXNoKGspKSkgfCAwO1xuICAgICAgICAgIH1cbiAgICAgIDogb3JkZXJlZFxuICAgICAgICA/IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICBoID0gKDMxICogaCArIGhhc2godikpIHwgMDtcbiAgICAgICAgICB9XG4gICAgICAgIDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGggPSAoaCArIGhhc2godikpIHwgMDtcbiAgICAgICAgICB9XG4gICk7XG4gIHJldHVybiBtdXJtdXJIYXNoT2ZTaXplKHNpemUsIGgpO1xufVxuXG5mdW5jdGlvbiBtdXJtdXJIYXNoT2ZTaXplKHNpemUsIGgpIHtcbiAgaCA9IGltdWwoaCwgMHhjYzllMmQ1MSk7XG4gIGggPSBpbXVsKChoIDw8IDE1KSB8IChoID4+PiAtMTUpLCAweDFiODczNTkzKTtcbiAgaCA9IGltdWwoKGggPDwgMTMpIHwgKGggPj4+IC0xMyksIDUpO1xuICBoID0gKChoICsgMHhlNjU0NmI2NCkgfCAwKSBeIHNpemU7XG4gIGggPSBpbXVsKGggXiAoaCA+Pj4gMTYpLCAweDg1ZWJjYTZiKTtcbiAgaCA9IGltdWwoaCBeIChoID4+PiAxMyksIDB4YzJiMmFlMzUpO1xuICBoID0gc21pKGggXiAoaCA+Pj4gMTYpKTtcbiAgcmV0dXJuIGg7XG59XG5cbmZ1bmN0aW9uIGhhc2hNZXJnZShhLCBiKSB7XG4gIHJldHVybiAoYSBeIChiICsgMHg5ZTM3NzliOSArIChhIDw8IDYpICsgKGEgPj4gMikpKSB8IDA7IC8vIGludFxufVxuXG52YXIgT3JkZXJlZFNldCA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKFNldCQkMSkge1xuICBmdW5jdGlvbiBPcmRlcmVkU2V0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgID8gZW1wdHlPcmRlcmVkU2V0KClcbiAgICAgIDogaXNPcmRlcmVkU2V0KHZhbHVlKVxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogZW1wdHlPcmRlcmVkU2V0KCkud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAoc2V0KSB7XG4gICAgICAgICAgICB2YXIgaXRlciA9IFNldENvbGxlY3Rpb24odmFsdWUpO1xuICAgICAgICAgICAgYXNzZXJ0Tm90SW5maW5pdGUoaXRlci5zaXplKTtcbiAgICAgICAgICAgIGl0ZXIuZm9yRWFjaChmdW5jdGlvbiAodikgeyByZXR1cm4gc2V0LmFkZCh2KTsgfSk7XG4gICAgICAgICAgfSk7XG4gIH1cblxuICBpZiAoIFNldCQkMSApIE9yZGVyZWRTZXQuX19wcm90b19fID0gU2V0JCQxO1xuICBPcmRlcmVkU2V0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFNldCQkMSAmJiBTZXQkJDEucHJvdG90eXBlICk7XG4gIE9yZGVyZWRTZXQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gT3JkZXJlZFNldDtcblxuICBPcmRlcmVkU2V0Lm9mID0gZnVuY3Rpb24gb2YgKC8qLi4udmFsdWVzKi8pIHtcbiAgICByZXR1cm4gdGhpcyhhcmd1bWVudHMpO1xuICB9O1xuXG4gIE9yZGVyZWRTZXQuZnJvbUtleXMgPSBmdW5jdGlvbiBmcm9tS2V5cyAodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcyhLZXllZENvbGxlY3Rpb24odmFsdWUpLmtleVNlcSgpKTtcbiAgfTtcblxuICBPcmRlcmVkU2V0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RvU3RyaW5nKCdPcmRlcmVkU2V0IHsnLCAnfScpO1xuICB9O1xuXG4gIHJldHVybiBPcmRlcmVkU2V0O1xufShTZXQpKTtcblxuT3JkZXJlZFNldC5pc09yZGVyZWRTZXQgPSBpc09yZGVyZWRTZXQ7XG5cbnZhciBPcmRlcmVkU2V0UHJvdG90eXBlID0gT3JkZXJlZFNldC5wcm90b3R5cGU7XG5PcmRlcmVkU2V0UHJvdG90eXBlW0lTX09SREVSRURfU1lNQk9MXSA9IHRydWU7XG5PcmRlcmVkU2V0UHJvdG90eXBlLnppcCA9IEluZGV4ZWRDb2xsZWN0aW9uUHJvdG90eXBlLnppcDtcbk9yZGVyZWRTZXRQcm90b3R5cGUuemlwV2l0aCA9IEluZGV4ZWRDb2xsZWN0aW9uUHJvdG90eXBlLnppcFdpdGg7XG5cbk9yZGVyZWRTZXRQcm90b3R5cGUuX19lbXB0eSA9IGVtcHR5T3JkZXJlZFNldDtcbk9yZGVyZWRTZXRQcm90b3R5cGUuX19tYWtlID0gbWFrZU9yZGVyZWRTZXQ7XG5cbmZ1bmN0aW9uIG1ha2VPcmRlcmVkU2V0KG1hcCwgb3duZXJJRCkge1xuICB2YXIgc2V0ID0gT2JqZWN0LmNyZWF0ZShPcmRlcmVkU2V0UHJvdG90eXBlKTtcbiAgc2V0LnNpemUgPSBtYXAgPyBtYXAuc2l6ZSA6IDA7XG4gIHNldC5fbWFwID0gbWFwO1xuICBzZXQuX19vd25lcklEID0gb3duZXJJRDtcbiAgcmV0dXJuIHNldDtcbn1cblxudmFyIEVNUFRZX09SREVSRURfU0VUO1xuZnVuY3Rpb24gZW1wdHlPcmRlcmVkU2V0KCkge1xuICByZXR1cm4gKFxuICAgIEVNUFRZX09SREVSRURfU0VUIHx8IChFTVBUWV9PUkRFUkVEX1NFVCA9IG1ha2VPcmRlcmVkU2V0KGVtcHR5T3JkZXJlZE1hcCgpKSlcbiAgKTtcbn1cblxudmFyIFJlY29yZCA9IGZ1bmN0aW9uIFJlY29yZChkZWZhdWx0VmFsdWVzLCBuYW1lKSB7XG4gIHZhciBoYXNJbml0aWFsaXplZDtcblxuICB2YXIgUmVjb3JkVHlwZSA9IGZ1bmN0aW9uIFJlY29yZCh2YWx1ZXMpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIGlmICh2YWx1ZXMgaW5zdGFuY2VvZiBSZWNvcmRUeXBlKSB7XG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVjb3JkVHlwZSkpIHtcbiAgICAgIHJldHVybiBuZXcgUmVjb3JkVHlwZSh2YWx1ZXMpO1xuICAgIH1cbiAgICBpZiAoIWhhc0luaXRpYWxpemVkKSB7XG4gICAgICBoYXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGRlZmF1bHRWYWx1ZXMpO1xuICAgICAgdmFyIGluZGljZXMgPSAoUmVjb3JkVHlwZVByb3RvdHlwZS5faW5kaWNlcyA9IHt9KTtcbiAgICAgIC8vIERlcHJlY2F0ZWQ6IGxlZnQgdG8gYXR0ZW1wdCBub3QgdG8gYnJlYWsgYW55IGV4dGVybmFsIGNvZGUgd2hpY2hcbiAgICAgIC8vIHJlbGllcyBvbiBhIC5fbmFtZSBwcm9wZXJ0eSBleGlzdGluZyBvbiByZWNvcmQgaW5zdGFuY2VzLlxuICAgICAgLy8gVXNlIFJlY29yZC5nZXREZXNjcmlwdGl2ZU5hbWUoKSBpbnN0ZWFkXG4gICAgICBSZWNvcmRUeXBlUHJvdG90eXBlLl9uYW1lID0gbmFtZTtcbiAgICAgIFJlY29yZFR5cGVQcm90b3R5cGUuX2tleXMgPSBrZXlzO1xuICAgICAgUmVjb3JkVHlwZVByb3RvdHlwZS5fZGVmYXVsdFZhbHVlcyA9IGRlZmF1bHRWYWx1ZXM7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHByb3BOYW1lID0ga2V5c1tpXTtcbiAgICAgICAgaW5kaWNlc1twcm9wTmFtZV0gPSBpO1xuICAgICAgICBpZiAoUmVjb3JkVHlwZVByb3RvdHlwZVtwcm9wTmFtZV0pIHtcbiAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gICAgICAgICAgdHlwZW9mIGNvbnNvbGUgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICBjb25zb2xlLndhcm4gJiZcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgJ0Nhbm5vdCBkZWZpbmUgJyArXG4gICAgICAgICAgICAgICAgcmVjb3JkTmFtZSh0aGlzKSArXG4gICAgICAgICAgICAgICAgJyB3aXRoIHByb3BlcnR5IFwiJyArXG4gICAgICAgICAgICAgICAgcHJvcE5hbWUgK1xuICAgICAgICAgICAgICAgICdcIiBzaW5jZSB0aGF0IHByb3BlcnR5IG5hbWUgaXMgcGFydCBvZiB0aGUgUmVjb3JkIEFQSS4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFByb3AoUmVjb3JkVHlwZVByb3RvdHlwZSwgcHJvcE5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX19vd25lcklEID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3ZhbHVlcyA9IExpc3QoKS53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChsKSB7XG4gICAgICBsLnNldFNpemUodGhpcyQxLl9rZXlzLmxlbmd0aCk7XG4gICAgICBLZXllZENvbGxlY3Rpb24odmFsdWVzKS5mb3JFYWNoKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICAgIGwuc2V0KHRoaXMkMS5faW5kaWNlc1trXSwgdiA9PT0gdGhpcyQxLl9kZWZhdWx0VmFsdWVzW2tdID8gdW5kZWZpbmVkIDogdik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgUmVjb3JkVHlwZVByb3RvdHlwZSA9IChSZWNvcmRUeXBlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoXG4gICAgUmVjb3JkUHJvdG90eXBlXG4gICkpO1xuICBSZWNvcmRUeXBlUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVjb3JkVHlwZTtcblxuICBpZiAobmFtZSkge1xuICAgIFJlY29yZFR5cGUuZGlzcGxheU5hbWUgPSBuYW1lO1xuICB9XG5cbiAgcmV0dXJuIFJlY29yZFR5cGU7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgc3RyID0gcmVjb3JkTmFtZSh0aGlzKSArICcgeyAnO1xuICB2YXIga2V5cyA9IHRoaXMuX2tleXM7XG4gIHZhciBrO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpICE9PSBsOyBpKyspIHtcbiAgICBrID0ga2V5c1tpXTtcbiAgICBzdHIgKz0gKGkgPyAnLCAnIDogJycpICsgayArICc6ICcgKyBxdW90ZVN0cmluZyh0aGlzLmdldChrKSk7XG4gIH1cbiAgcmV0dXJuIHN0ciArICcgfSc7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAob3RoZXIpIHtcbiAgcmV0dXJuIChcbiAgICB0aGlzID09PSBvdGhlciB8fFxuICAgIChvdGhlciAmJlxuICAgICAgdGhpcy5fa2V5cyA9PT0gb3RoZXIuX2tleXMgJiZcbiAgICAgIHJlY29yZFNlcSh0aGlzKS5lcXVhbHMocmVjb3JkU2VxKG90aGVyKSkpXG4gICk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLmhhc2hDb2RlID0gZnVuY3Rpb24gaGFzaENvZGUgKCkge1xuICByZXR1cm4gcmVjb3JkU2VxKHRoaXMpLmhhc2hDb2RlKCk7XG59O1xuXG4vLyBAcHJhZ21hIEFjY2Vzc1xuXG5SZWNvcmQucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIGhhcyAoaykge1xuICByZXR1cm4gdGhpcy5faW5kaWNlcy5oYXNPd25Qcm9wZXJ0eShrKTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChrLCBub3RTZXRWYWx1ZSkge1xuICBpZiAoIXRoaXMuaGFzKGspKSB7XG4gICAgcmV0dXJuIG5vdFNldFZhbHVlO1xuICB9XG4gIHZhciBpbmRleCA9IHRoaXMuX2luZGljZXNba107XG4gIHZhciB2YWx1ZSA9IHRoaXMuX3ZhbHVlcy5nZXQoaW5kZXgpO1xuICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHRWYWx1ZXNba10gOiB2YWx1ZTtcbn07XG5cbi8vIEBwcmFnbWEgTW9kaWZpY2F0aW9uXG5cblJlY29yZC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0IChrLCB2KSB7XG4gIGlmICh0aGlzLmhhcyhrKSkge1xuICAgIHZhciBuZXdWYWx1ZXMgPSB0aGlzLl92YWx1ZXMuc2V0KFxuICAgICAgdGhpcy5faW5kaWNlc1trXSxcbiAgICAgIHYgPT09IHRoaXMuX2RlZmF1bHRWYWx1ZXNba10gPyB1bmRlZmluZWQgOiB2XG4gICAgKTtcbiAgICBpZiAobmV3VmFsdWVzICE9PSB0aGlzLl92YWx1ZXMgJiYgIXRoaXMuX19vd25lcklEKSB7XG4gICAgICByZXR1cm4gbWFrZVJlY29yZCh0aGlzLCBuZXdWYWx1ZXMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cblJlY29yZC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlIChrKSB7XG4gIHJldHVybiB0aGlzLnNldChrKTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhciAoKSB7XG4gIHZhciBuZXdWYWx1ZXMgPSB0aGlzLl92YWx1ZXMuY2xlYXIoKS5zZXRTaXplKHRoaXMuX2tleXMubGVuZ3RoKTtcbiAgcmV0dXJuIHRoaXMuX19vd25lcklEID8gdGhpcyA6IG1ha2VSZWNvcmQodGhpcywgbmV3VmFsdWVzKTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUud2FzQWx0ZXJlZCA9IGZ1bmN0aW9uIHdhc0FsdGVyZWQgKCkge1xuICByZXR1cm4gdGhpcy5fdmFsdWVzLndhc0FsdGVyZWQoKTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUudG9TZXEgPSBmdW5jdGlvbiB0b1NlcSAoKSB7XG4gIHJldHVybiByZWNvcmRTZXEodGhpcyk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLnRvSlMgPSBmdW5jdGlvbiB0b0pTJDEgKCkge1xuICByZXR1cm4gdG9KUyh0aGlzKTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uIGVudHJpZXMgKCkge1xuICByZXR1cm4gdGhpcy5fX2l0ZXJhdG9yKElURVJBVEVfRU5UUklFUyk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gIHJldHVybiByZWNvcmRTZXEodGhpcykuX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbn07XG5cblJlY29yZC5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICByZXR1cm4gcmVjb3JkU2VxKHRoaXMpLl9faXRlcmF0ZShmbiwgcmV2ZXJzZSk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLl9fZW5zdXJlT3duZXIgPSBmdW5jdGlvbiBfX2Vuc3VyZU93bmVyIChvd25lcklEKSB7XG4gIGlmIChvd25lcklEID09PSB0aGlzLl9fb3duZXJJRCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHZhciBuZXdWYWx1ZXMgPSB0aGlzLl92YWx1ZXMuX19lbnN1cmVPd25lcihvd25lcklEKTtcbiAgaWYgKCFvd25lcklEKSB7XG4gICAgdGhpcy5fX293bmVySUQgPSBvd25lcklEO1xuICAgIHRoaXMuX3ZhbHVlcyA9IG5ld1ZhbHVlcztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZXR1cm4gbWFrZVJlY29yZCh0aGlzLCBuZXdWYWx1ZXMsIG93bmVySUQpO1xufTtcblxuUmVjb3JkLmlzUmVjb3JkID0gaXNSZWNvcmQ7XG5SZWNvcmQuZ2V0RGVzY3JpcHRpdmVOYW1lID0gcmVjb3JkTmFtZTtcbnZhciBSZWNvcmRQcm90b3R5cGUgPSBSZWNvcmQucHJvdG90eXBlO1xuUmVjb3JkUHJvdG90eXBlW0lTX1JFQ09SRF9TWU1CT0xdID0gdHJ1ZTtcblJlY29yZFByb3RvdHlwZVtERUxFVEVdID0gUmVjb3JkUHJvdG90eXBlLnJlbW92ZTtcblJlY29yZFByb3RvdHlwZS5kZWxldGVJbiA9IFJlY29yZFByb3RvdHlwZS5yZW1vdmVJbiA9IGRlbGV0ZUluO1xuUmVjb3JkUHJvdG90eXBlLmdldEluID0gZ2V0SW4kMTtcblJlY29yZFByb3RvdHlwZS5oYXNJbiA9IENvbGxlY3Rpb25Qcm90b3R5cGUuaGFzSW47XG5SZWNvcmRQcm90b3R5cGUubWVyZ2UgPSBtZXJnZTtcblJlY29yZFByb3RvdHlwZS5tZXJnZVdpdGggPSBtZXJnZVdpdGg7XG5SZWNvcmRQcm90b3R5cGUubWVyZ2VJbiA9IG1lcmdlSW47XG5SZWNvcmRQcm90b3R5cGUubWVyZ2VEZWVwID0gbWVyZ2VEZWVwJDE7XG5SZWNvcmRQcm90b3R5cGUubWVyZ2VEZWVwV2l0aCA9IG1lcmdlRGVlcFdpdGgkMTtcblJlY29yZFByb3RvdHlwZS5tZXJnZURlZXBJbiA9IG1lcmdlRGVlcEluO1xuUmVjb3JkUHJvdG90eXBlLnNldEluID0gc2V0SW4kMTtcblJlY29yZFByb3RvdHlwZS51cGRhdGUgPSB1cGRhdGUkMTtcblJlY29yZFByb3RvdHlwZS51cGRhdGVJbiA9IHVwZGF0ZUluJDE7XG5SZWNvcmRQcm90b3R5cGUud2l0aE11dGF0aW9ucyA9IHdpdGhNdXRhdGlvbnM7XG5SZWNvcmRQcm90b3R5cGUuYXNNdXRhYmxlID0gYXNNdXRhYmxlO1xuUmVjb3JkUHJvdG90eXBlLmFzSW1tdXRhYmxlID0gYXNJbW11dGFibGU7XG5SZWNvcmRQcm90b3R5cGVbSVRFUkFUT1JfU1lNQk9MXSA9IFJlY29yZFByb3RvdHlwZS5lbnRyaWVzO1xuUmVjb3JkUHJvdG90eXBlLnRvSlNPTiA9IFJlY29yZFByb3RvdHlwZS50b09iamVjdCA9XG4gIENvbGxlY3Rpb25Qcm90b3R5cGUudG9PYmplY3Q7XG5SZWNvcmRQcm90b3R5cGUuaW5zcGVjdCA9IFJlY29yZFByb3RvdHlwZS50b1NvdXJjZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xufTtcblxuZnVuY3Rpb24gbWFrZVJlY29yZChsaWtlUmVjb3JkLCB2YWx1ZXMsIG93bmVySUQpIHtcbiAgdmFyIHJlY29yZCA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKGxpa2VSZWNvcmQpKTtcbiAgcmVjb3JkLl92YWx1ZXMgPSB2YWx1ZXM7XG4gIHJlY29yZC5fX293bmVySUQgPSBvd25lcklEO1xuICByZXR1cm4gcmVjb3JkO1xufVxuXG5mdW5jdGlvbiByZWNvcmROYW1lKHJlY29yZCkge1xuICByZXR1cm4gcmVjb3JkLmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8IHJlY29yZC5jb25zdHJ1Y3Rvci5uYW1lIHx8ICdSZWNvcmQnO1xufVxuXG5mdW5jdGlvbiByZWNvcmRTZXEocmVjb3JkKSB7XG4gIHJldHVybiBrZXllZFNlcUZyb21WYWx1ZShyZWNvcmQuX2tleXMubWFwKGZ1bmN0aW9uIChrKSB7IHJldHVybiBbaywgcmVjb3JkLmdldChrKV07IH0pKTtcbn1cblxuZnVuY3Rpb24gc2V0UHJvcChwcm90b3R5cGUsIG5hbWUpIHtcbiAgdHJ5IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlLCBuYW1lLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQobmFtZSk7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpbnZhcmlhbnQodGhpcy5fX293bmVySUQsICdDYW5ub3Qgc2V0IG9uIGFuIGltbXV0YWJsZSByZWNvcmQuJyk7XG4gICAgICAgIHRoaXMuc2V0KG5hbWUsIHZhbHVlKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5IGZhaWxlZC4gUHJvYmFibHkgSUU4LlxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGxhenkgU2VxIG9mIGB2YWx1ZWAgcmVwZWF0ZWQgYHRpbWVzYCB0aW1lcy4gV2hlbiBgdGltZXNgIGlzXG4gKiB1bmRlZmluZWQsIHJldHVybnMgYW4gaW5maW5pdGUgc2VxdWVuY2Ugb2YgYHZhbHVlYC5cbiAqL1xudmFyIFJlcGVhdCA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEluZGV4ZWRTZXEkJDEpIHtcbiAgZnVuY3Rpb24gUmVwZWF0KHZhbHVlLCB0aW1lcykge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXBlYXQpKSB7XG4gICAgICByZXR1cm4gbmV3IFJlcGVhdCh2YWx1ZSwgdGltZXMpO1xuICAgIH1cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuc2l6ZSA9IHRpbWVzID09PSB1bmRlZmluZWQgPyBJbmZpbml0eSA6IE1hdGgubWF4KDAsIHRpbWVzKTtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICBpZiAoRU1QVFlfUkVQRUFUKSB7XG4gICAgICAgIHJldHVybiBFTVBUWV9SRVBFQVQ7XG4gICAgICB9XG4gICAgICBFTVBUWV9SRVBFQVQgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIGlmICggSW5kZXhlZFNlcSQkMSApIFJlcGVhdC5fX3Byb3RvX18gPSBJbmRleGVkU2VxJCQxO1xuICBSZXBlYXQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggSW5kZXhlZFNlcSQkMSAmJiBJbmRleGVkU2VxJCQxLnByb3RvdHlwZSApO1xuICBSZXBlYXQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVwZWF0O1xuXG4gIFJlcGVhdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuICdSZXBlYXQgW10nO1xuICAgIH1cbiAgICByZXR1cm4gJ1JlcGVhdCBbICcgKyB0aGlzLl92YWx1ZSArICcgJyArIHRoaXMuc2l6ZSArICcgdGltZXMgXSc7XG4gIH07XG5cbiAgUmVwZWF0LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGluZGV4LCBub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmhhcyhpbmRleCkgPyB0aGlzLl92YWx1ZSA6IG5vdFNldFZhbHVlO1xuICB9O1xuXG4gIFJlcGVhdC5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAoc2VhcmNoVmFsdWUpIHtcbiAgICByZXR1cm4gaXModGhpcy5fdmFsdWUsIHNlYXJjaFZhbHVlKTtcbiAgfTtcblxuICBSZXBlYXQucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKGJlZ2luLCBlbmQpIHtcbiAgICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICByZXR1cm4gd2hvbGVTbGljZShiZWdpbiwgZW5kLCBzaXplKVxuICAgICAgPyB0aGlzXG4gICAgICA6IG5ldyBSZXBlYXQoXG4gICAgICAgICAgdGhpcy5fdmFsdWUsXG4gICAgICAgICAgcmVzb2x2ZUVuZChlbmQsIHNpemUpIC0gcmVzb2x2ZUJlZ2luKGJlZ2luLCBzaXplKVxuICAgICAgICApO1xuICB9O1xuXG4gIFJlcGVhdC5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uIHJldmVyc2UgKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFJlcGVhdC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHNlYXJjaFZhbHVlKSB7XG4gICAgaWYgKGlzKHRoaXMuX3ZhbHVlLCBzZWFyY2hWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgUmVwZWF0LnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mIChzZWFyY2hWYWx1ZSkge1xuICAgIGlmIChpcyh0aGlzLl92YWx1ZSwgc2VhcmNoVmFsdWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaXplO1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgUmVwZWF0LnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHNpemUgPSB0aGlzLnNpemU7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpICE9PSBzaXplKSB7XG4gICAgICBpZiAoZm4odGhpcy5fdmFsdWUsIHJldmVyc2UgPyBzaXplIC0gKytpIDogaSsrLCB0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpO1xuICB9O1xuXG4gIFJlcGVhdC5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBzaXplID0gdGhpcy5zaXplO1xuICAgIHZhciBpID0gMDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKFxuICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gaSA9PT0gc2l6ZVxuICAgICAgICAgID8gaXRlcmF0b3JEb25lKClcbiAgICAgICAgICA6IGl0ZXJhdG9yVmFsdWUodHlwZSwgcmV2ZXJzZSA/IHNpemUgLSArK2kgOiBpKyssIHRoaXMkMS5fdmFsdWUpOyB9XG4gICAgKTtcbiAgfTtcblxuICBSZXBlYXQucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAob3RoZXIpIHtcbiAgICByZXR1cm4gb3RoZXIgaW5zdGFuY2VvZiBSZXBlYXRcbiAgICAgID8gaXModGhpcy5fdmFsdWUsIG90aGVyLl92YWx1ZSlcbiAgICAgIDogZGVlcEVxdWFsKG90aGVyKTtcbiAgfTtcblxuICByZXR1cm4gUmVwZWF0O1xufShJbmRleGVkU2VxKSk7XG5cbnZhciBFTVBUWV9SRVBFQVQ7XG5cbmZ1bmN0aW9uIGZyb21KUyh2YWx1ZSwgY29udmVydGVyKSB7XG4gIHJldHVybiBmcm9tSlNXaXRoKFxuICAgIFtdLFxuICAgIGNvbnZlcnRlciB8fCBkZWZhdWx0Q29udmVydGVyLFxuICAgIHZhbHVlLFxuICAgICcnLFxuICAgIGNvbnZlcnRlciAmJiBjb252ZXJ0ZXIubGVuZ3RoID4gMiA/IFtdIDogdW5kZWZpbmVkLFxuICAgIHsgJyc6IHZhbHVlIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gZnJvbUpTV2l0aChzdGFjaywgY29udmVydGVyLCB2YWx1ZSwga2V5LCBrZXlQYXRoLCBwYXJlbnRWYWx1ZSkge1xuICB2YXIgdG9TZXEgPSBBcnJheS5pc0FycmF5KHZhbHVlKVxuICAgID8gSW5kZXhlZFNlcVxuICAgIDogaXNQbGFpbk9iaih2YWx1ZSlcbiAgICAgID8gS2V5ZWRTZXFcbiAgICAgIDogbnVsbDtcbiAgaWYgKHRvU2VxKSB7XG4gICAgaWYgKH5zdGFjay5pbmRleE9mKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgY2lyY3VsYXIgc3RydWN0dXJlIHRvIEltbXV0YWJsZScpO1xuICAgIH1cbiAgICBzdGFjay5wdXNoKHZhbHVlKTtcbiAgICBrZXlQYXRoICYmIGtleSAhPT0gJycgJiYga2V5UGF0aC5wdXNoKGtleSk7XG4gICAgdmFyIGNvbnZlcnRlZCA9IGNvbnZlcnRlci5jYWxsKFxuICAgICAgcGFyZW50VmFsdWUsXG4gICAgICBrZXksXG4gICAgICB0b1NlcSh2YWx1ZSkubWFwKGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBmcm9tSlNXaXRoKHN0YWNrLCBjb252ZXJ0ZXIsIHYsIGssIGtleVBhdGgsIHZhbHVlKTsgfVxuICAgICAgKSxcbiAgICAgIGtleVBhdGggJiYga2V5UGF0aC5zbGljZSgpXG4gICAgKTtcbiAgICBzdGFjay5wb3AoKTtcbiAgICBrZXlQYXRoICYmIGtleVBhdGgucG9wKCk7XG4gICAgcmV0dXJuIGNvbnZlcnRlZDtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRDb252ZXJ0ZXIoaywgdikge1xuICByZXR1cm4gaXNLZXllZCh2KSA/IHYudG9NYXAoKSA6IHYudG9MaXN0KCk7XG59XG5cbnZhciB2ZXJzaW9uID0gXCI0LjAuMC1yYy4xMVwiO1xuXG52YXIgSW1tdXRhYmxlID0ge1xuICB2ZXJzaW9uOiB2ZXJzaW9uLFxuXG4gIENvbGxlY3Rpb246IENvbGxlY3Rpb24sXG4gIC8vIE5vdGU6IEl0ZXJhYmxlIGlzIGRlcHJlY2F0ZWRcbiAgSXRlcmFibGU6IENvbGxlY3Rpb24sXG5cbiAgU2VxOiBTZXEsXG4gIE1hcDogTWFwLFxuICBPcmRlcmVkTWFwOiBPcmRlcmVkTWFwLFxuICBMaXN0OiBMaXN0LFxuICBTdGFjazogU3RhY2ssXG4gIFNldDogU2V0LFxuICBPcmRlcmVkU2V0OiBPcmRlcmVkU2V0LFxuXG4gIFJlY29yZDogUmVjb3JkLFxuICBSYW5nZTogUmFuZ2UsXG4gIFJlcGVhdDogUmVwZWF0LFxuXG4gIGlzOiBpcyxcbiAgZnJvbUpTOiBmcm9tSlMsXG4gIGhhc2g6IGhhc2gsXG5cbiAgaXNJbW11dGFibGU6IGlzSW1tdXRhYmxlLFxuICBpc0NvbGxlY3Rpb246IGlzQ29sbGVjdGlvbixcbiAgaXNLZXllZDogaXNLZXllZCxcbiAgaXNJbmRleGVkOiBpc0luZGV4ZWQsXG4gIGlzQXNzb2NpYXRpdmU6IGlzQXNzb2NpYXRpdmUsXG4gIGlzT3JkZXJlZDogaXNPcmRlcmVkLFxuICBpc1ZhbHVlT2JqZWN0OiBpc1ZhbHVlT2JqZWN0LFxuICBpc1NlcTogaXNTZXEsXG4gIGlzTGlzdDogaXNMaXN0LFxuICBpc01hcDogaXNNYXAsXG4gIGlzT3JkZXJlZE1hcDogaXNPcmRlcmVkTWFwLFxuICBpc1N0YWNrOiBpc1N0YWNrLFxuICBpc1NldDogaXNTZXQsXG4gIGlzT3JkZXJlZFNldDogaXNPcmRlcmVkU2V0LFxuICBpc1JlY29yZDogaXNSZWNvcmQsXG5cbiAgZ2V0OiBnZXQsXG4gIGdldEluOiBnZXRJbixcbiAgaGFzOiBoYXMsXG4gIGhhc0luOiBoYXNJbixcbiAgbWVyZ2U6IG1lcmdlJDEsXG4gIG1lcmdlRGVlcDogbWVyZ2VEZWVwLFxuICBtZXJnZVdpdGg6IG1lcmdlV2l0aCQxLFxuICBtZXJnZURlZXBXaXRoOiBtZXJnZURlZXBXaXRoLFxuICByZW1vdmU6IHJlbW92ZSxcbiAgcmVtb3ZlSW46IHJlbW92ZUluLFxuICBzZXQ6IHNldCxcbiAgc2V0SW46IHNldEluLFxuICB1cGRhdGU6IHVwZGF0ZSxcbiAgdXBkYXRlSW46IHVwZGF0ZUluLFxufTtcblxuLy8gTm90ZTogSXRlcmFibGUgaXMgZGVwcmVjYXRlZFxudmFyIEl0ZXJhYmxlID0gQ29sbGVjdGlvbjtcblxuZXhwb3J0IGRlZmF1bHQgSW1tdXRhYmxlO1xuZXhwb3J0IHsgdmVyc2lvbiwgQ29sbGVjdGlvbiwgSXRlcmFibGUsIFNlcSwgTWFwLCBPcmRlcmVkTWFwLCBMaXN0LCBTdGFjaywgU2V0LCBPcmRlcmVkU2V0LCBSZWNvcmQsIFJhbmdlLCBSZXBlYXQsIGlzLCBmcm9tSlMsIGhhc2gsIGlzSW1tdXRhYmxlLCBpc0NvbGxlY3Rpb24sIGlzS2V5ZWQsIGlzSW5kZXhlZCwgaXNBc3NvY2lhdGl2ZSwgaXNPcmRlcmVkLCBpc1ZhbHVlT2JqZWN0LCBnZXQsIGdldEluLCBoYXMsIGhhc0luLCBtZXJnZSQxIGFzIG1lcmdlLCBtZXJnZURlZXAsIG1lcmdlV2l0aCQxIGFzIG1lcmdlV2l0aCwgbWVyZ2VEZWVwV2l0aCwgcmVtb3ZlLCByZW1vdmVJbiwgc2V0LCBzZXRJbiwgdXBkYXRlLCB1cGRhdGVJbiB9O1xuIiwiLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKHJvb3QsIHBsdXJhbGl6ZSkge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAodHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gTm9kZS5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHBsdXJhbGl6ZSgpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRCwgcmVnaXN0ZXJzIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBwbHVyYWxpemUoKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbC5cbiAgICByb290LnBsdXJhbGl6ZSA9IHBsdXJhbGl6ZSgpO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gIC8vIFJ1bGUgc3RvcmFnZSAtIHBsdXJhbGl6ZSBhbmQgc2luZ3VsYXJpemUgbmVlZCB0byBiZSBydW4gc2VxdWVudGlhbGx5LFxuICAvLyB3aGlsZSBvdGhlciBydWxlcyBjYW4gYmUgb3B0aW1pemVkIHVzaW5nIGFuIG9iamVjdCBmb3IgaW5zdGFudCBsb29rdXBzLlxuICB2YXIgcGx1cmFsUnVsZXMgPSBbXTtcbiAgdmFyIHNpbmd1bGFyUnVsZXMgPSBbXTtcbiAgdmFyIHVuY291bnRhYmxlcyA9IHt9O1xuICB2YXIgaXJyZWd1bGFyUGx1cmFscyA9IHt9O1xuICB2YXIgaXJyZWd1bGFyU2luZ2xlcyA9IHt9O1xuXG4gIC8qKlxuICAgKiBTYW5pdGl6ZSBhIHBsdXJhbGl6YXRpb24gcnVsZSB0byBhIHVzYWJsZSByZWd1bGFyIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSAgeyhSZWdFeHB8c3RyaW5nKX0gcnVsZVxuICAgKiBAcmV0dXJuIHtSZWdFeHB9XG4gICAqL1xuICBmdW5jdGlvbiBzYW5pdGl6ZVJ1bGUgKHJ1bGUpIHtcbiAgICBpZiAodHlwZW9mIHJ1bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyBydWxlICsgJyQnLCAnaScpO1xuICAgIH1cblxuICAgIHJldHVybiBydWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3MgaW4gYSB3b3JkIHRva2VuIHRvIHByb2R1Y2UgYSBmdW5jdGlvbiB0aGF0IGNhbiByZXBsaWNhdGUgdGhlIGNhc2Ugb25cbiAgICogYW5vdGhlciB3b3JkLlxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgd29yZFxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdG9rZW5cbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiByZXN0b3JlQ2FzZSAod29yZCwgdG9rZW4pIHtcbiAgICAvLyBUb2tlbnMgYXJlIGFuIGV4YWN0IG1hdGNoLlxuICAgIGlmICh3b3JkID09PSB0b2tlbikgcmV0dXJuIHRva2VuO1xuXG4gICAgLy8gTG93ZXIgY2FzZWQgd29yZHMuIEUuZy4gXCJoZWxsb1wiLlxuICAgIGlmICh3b3JkID09PSB3b3JkLnRvTG93ZXJDYXNlKCkpIHJldHVybiB0b2tlbi50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gVXBwZXIgY2FzZWQgd29yZHMuIEUuZy4gXCJXSElTS1lcIi5cbiAgICBpZiAod29yZCA9PT0gd29yZC50b1VwcGVyQ2FzZSgpKSByZXR1cm4gdG9rZW4udG9VcHBlckNhc2UoKTtcblxuICAgIC8vIFRpdGxlIGNhc2VkIHdvcmRzLiBFLmcuIFwiVGl0bGVcIi5cbiAgICBpZiAod29yZFswXSA9PT0gd29yZFswXS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICByZXR1cm4gdG9rZW4uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0b2tlbi5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICAvLyBMb3dlciBjYXNlZCB3b3Jkcy4gRS5nLiBcInRlc3RcIi5cbiAgICByZXR1cm4gdG9rZW4udG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcnBvbGF0ZSBhIHJlZ2V4cCBzdHJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gc3RyXG4gICAqIEBwYXJhbSAge0FycmF5fSAgYXJnc1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBpbnRlcnBvbGF0ZSAoc3RyLCBhcmdzKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXCQoXFxkezEsMn0pL2csIGZ1bmN0aW9uIChtYXRjaCwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBhcmdzW2luZGV4XSB8fCAnJztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIGEgd29yZCB1c2luZyBhIHJ1bGUuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gd29yZFxuICAgKiBAcGFyYW0gIHtBcnJheX0gIHJ1bGVcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZSAod29yZCwgcnVsZSkge1xuICAgIHJldHVybiB3b3JkLnJlcGxhY2UocnVsZVswXSwgZnVuY3Rpb24gKG1hdGNoLCBpbmRleCkge1xuICAgICAgdmFyIHJlc3VsdCA9IGludGVycG9sYXRlKHJ1bGVbMV0sIGFyZ3VtZW50cyk7XG5cbiAgICAgIGlmIChtYXRjaCA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKHdvcmRbaW5kZXggLSAxXSwgcmVzdWx0KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKG1hdGNoLCByZXN1bHQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhbml0aXplIGEgd29yZCBieSBwYXNzaW5nIGluIHRoZSB3b3JkIGFuZCBzYW5pdGl6YXRpb24gcnVsZXMuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICB0b2tlblxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgd29yZFxuICAgKiBAcGFyYW0gIHtBcnJheX0gICAgcnVsZXNcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gc2FuaXRpemVXb3JkICh0b2tlbiwgd29yZCwgcnVsZXMpIHtcbiAgICAvLyBFbXB0eSBzdHJpbmcgb3IgZG9lc24ndCBuZWVkIGZpeGluZy5cbiAgICBpZiAoIXRva2VuLmxlbmd0aCB8fCB1bmNvdW50YWJsZXMuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgICByZXR1cm4gd29yZDtcbiAgICB9XG5cbiAgICB2YXIgbGVuID0gcnVsZXMubGVuZ3RoO1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBzYW5pdGl6YXRpb24gcnVsZXMgYW5kIHVzZSB0aGUgZmlyc3Qgb25lIHRvIG1hdGNoLlxuICAgIHdoaWxlIChsZW4tLSkge1xuICAgICAgdmFyIHJ1bGUgPSBydWxlc1tsZW5dO1xuXG4gICAgICBpZiAocnVsZVswXS50ZXN0KHdvcmQpKSByZXR1cm4gcmVwbGFjZSh3b3JkLCBydWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd29yZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIGEgd29yZCB3aXRoIHRoZSB1cGRhdGVkIHdvcmQuXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gICByZXBsYWNlTWFwXG4gICAqIEBwYXJhbSAge09iamVjdH0gICBrZWVwTWFwXG4gICAqIEBwYXJhbSAge0FycmF5fSAgICBydWxlc1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIHJlcGxhY2VXb3JkIChyZXBsYWNlTWFwLCBrZWVwTWFwLCBydWxlcykge1xuICAgIHJldHVybiBmdW5jdGlvbiAod29yZCkge1xuICAgICAgLy8gR2V0IHRoZSBjb3JyZWN0IHRva2VuIGFuZCBjYXNlIHJlc3RvcmF0aW9uIGZ1bmN0aW9ucy5cbiAgICAgIHZhciB0b2tlbiA9IHdvcmQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgLy8gQ2hlY2sgYWdhaW5zdCB0aGUga2VlcCBvYmplY3QgbWFwLlxuICAgICAgaWYgKGtlZXBNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3JkLCB0b2tlbik7XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIGFnYWluc3QgdGhlIHJlcGxhY2VtZW50IG1hcCBmb3IgYSBkaXJlY3Qgd29yZCByZXBsYWNlbWVudC5cbiAgICAgIGlmIChyZXBsYWNlTWFwLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2Uod29yZCwgcmVwbGFjZU1hcFt0b2tlbl0pO1xuICAgICAgfVxuXG4gICAgICAvLyBSdW4gYWxsIHRoZSBydWxlcyBhZ2FpbnN0IHRoZSB3b3JkLlxuICAgICAgcmV0dXJuIHNhbml0aXplV29yZCh0b2tlbiwgd29yZCwgcnVsZXMpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB3b3JkIGlzIHBhcnQgb2YgdGhlIG1hcC5cbiAgICovXG4gIGZ1bmN0aW9uIGNoZWNrV29yZCAocmVwbGFjZU1hcCwga2VlcE1hcCwgcnVsZXMsIGJvb2wpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHdvcmQpIHtcbiAgICAgIHZhciB0b2tlbiA9IHdvcmQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgaWYgKGtlZXBNYXAuaGFzT3duUHJvcGVydHkodG9rZW4pKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGlmIChyZXBsYWNlTWFwLmhhc093blByb3BlcnR5KHRva2VuKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICByZXR1cm4gc2FuaXRpemVXb3JkKHRva2VuLCB0b2tlbiwgcnVsZXMpID09PSB0b2tlbjtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFBsdXJhbGl6ZSBvciBzaW5ndWxhcml6ZSBhIHdvcmQgYmFzZWQgb24gdGhlIHBhc3NlZCBpbiBjb3VudC5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgd29yZCAgICAgIFRoZSB3b3JkIHRvIHBsdXJhbGl6ZVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBjb3VudCAgICAgSG93IG1hbnkgb2YgdGhlIHdvcmQgZXhpc3RcbiAgICogQHBhcmFtICB7Ym9vbGVhbn0gaW5jbHVzaXZlIFdoZXRoZXIgdG8gcHJlZml4IHdpdGggdGhlIG51bWJlciAoZS5nLiAzIGR1Y2tzKVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBwbHVyYWxpemUgKHdvcmQsIGNvdW50LCBpbmNsdXNpdmUpIHtcbiAgICB2YXIgcGx1cmFsaXplZCA9IGNvdW50ID09PSAxXG4gICAgICA/IHBsdXJhbGl6ZS5zaW5ndWxhcih3b3JkKSA6IHBsdXJhbGl6ZS5wbHVyYWwod29yZCk7XG5cbiAgICByZXR1cm4gKGluY2x1c2l2ZSA/IGNvdW50ICsgJyAnIDogJycpICsgcGx1cmFsaXplZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQbHVyYWxpemUgYSB3b3JkLlxuICAgKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBwbHVyYWxpemUucGx1cmFsID0gcmVwbGFjZVdvcmQoXG4gICAgaXJyZWd1bGFyU2luZ2xlcywgaXJyZWd1bGFyUGx1cmFscywgcGx1cmFsUnVsZXNcbiAgKTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB3b3JkIGlzIHBsdXJhbC5cbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgcGx1cmFsaXplLmlzUGx1cmFsID0gY2hlY2tXb3JkKFxuICAgIGlycmVndWxhclNpbmdsZXMsIGlycmVndWxhclBsdXJhbHMsIHBsdXJhbFJ1bGVzXG4gICk7XG5cbiAgLyoqXG4gICAqIFNpbmd1bGFyaXplIGEgd29yZC5cbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgcGx1cmFsaXplLnNpbmd1bGFyID0gcmVwbGFjZVdvcmQoXG4gICAgaXJyZWd1bGFyUGx1cmFscywgaXJyZWd1bGFyU2luZ2xlcywgc2luZ3VsYXJSdWxlc1xuICApO1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHdvcmQgaXMgc2luZ3VsYXIuXG4gICAqXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIHBsdXJhbGl6ZS5pc1Npbmd1bGFyID0gY2hlY2tXb3JkKFxuICAgIGlycmVndWxhclBsdXJhbHMsIGlycmVndWxhclNpbmdsZXMsIHNpbmd1bGFyUnVsZXNcbiAgKTtcblxuICAvKipcbiAgICogQWRkIGEgcGx1cmFsaXphdGlvbiBydWxlIHRvIHRoZSBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwKX0gcnVsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgcmVwbGFjZW1lbnRcbiAgICovXG4gIHBsdXJhbGl6ZS5hZGRQbHVyYWxSdWxlID0gZnVuY3Rpb24gKHJ1bGUsIHJlcGxhY2VtZW50KSB7XG4gICAgcGx1cmFsUnVsZXMucHVzaChbc2FuaXRpemVSdWxlKHJ1bGUpLCByZXBsYWNlbWVudF0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYSBzaW5ndWxhcml6YXRpb24gcnVsZSB0byB0aGUgY29sbGVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cCl9IHJ1bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgIHJlcGxhY2VtZW50XG4gICAqL1xuICBwbHVyYWxpemUuYWRkU2luZ3VsYXJSdWxlID0gZnVuY3Rpb24gKHJ1bGUsIHJlcGxhY2VtZW50KSB7XG4gICAgc2luZ3VsYXJSdWxlcy5wdXNoKFtzYW5pdGl6ZVJ1bGUocnVsZSksIHJlcGxhY2VtZW50XSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBhbiB1bmNvdW50YWJsZSB3b3JkIHJ1bGUuXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHApfSB3b3JkXG4gICAqL1xuICBwbHVyYWxpemUuYWRkVW5jb3VudGFibGVSdWxlID0gZnVuY3Rpb24gKHdvcmQpIHtcbiAgICBpZiAodHlwZW9mIHdvcmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB1bmNvdW50YWJsZXNbd29yZC50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU2V0IHNpbmd1bGFyIGFuZCBwbHVyYWwgcmVmZXJlbmNlcyBmb3IgdGhlIHdvcmQuXG4gICAgcGx1cmFsaXplLmFkZFBsdXJhbFJ1bGUod29yZCwgJyQwJyk7XG4gICAgcGx1cmFsaXplLmFkZFNpbmd1bGFyUnVsZSh3b3JkLCAnJDAnKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGFuIGlycmVndWxhciB3b3JkIGRlZmluaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzaW5nbGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBsdXJhbFxuICAgKi9cbiAgcGx1cmFsaXplLmFkZElycmVndWxhclJ1bGUgPSBmdW5jdGlvbiAoc2luZ2xlLCBwbHVyYWwpIHtcbiAgICBwbHVyYWwgPSBwbHVyYWwudG9Mb3dlckNhc2UoKTtcbiAgICBzaW5nbGUgPSBzaW5nbGUudG9Mb3dlckNhc2UoKTtcblxuICAgIGlycmVndWxhclNpbmdsZXNbc2luZ2xlXSA9IHBsdXJhbDtcbiAgICBpcnJlZ3VsYXJQbHVyYWxzW3BsdXJhbF0gPSBzaW5nbGU7XG4gIH07XG5cbiAgLyoqXG4gICAqIElycmVndWxhciBydWxlcy5cbiAgICovXG4gIFtcbiAgICAvLyBQcm9ub3Vucy5cbiAgICBbJ0knLCAnd2UnXSxcbiAgICBbJ21lJywgJ3VzJ10sXG4gICAgWydoZScsICd0aGV5J10sXG4gICAgWydzaGUnLCAndGhleSddLFxuICAgIFsndGhlbScsICd0aGVtJ10sXG4gICAgWydteXNlbGYnLCAnb3Vyc2VsdmVzJ10sXG4gICAgWyd5b3Vyc2VsZicsICd5b3Vyc2VsdmVzJ10sXG4gICAgWydpdHNlbGYnLCAndGhlbXNlbHZlcyddLFxuICAgIFsnaGVyc2VsZicsICd0aGVtc2VsdmVzJ10sXG4gICAgWydoaW1zZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgICBbJ3RoZW1zZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgICBbJ2lzJywgJ2FyZSddLFxuICAgIFsnd2FzJywgJ3dlcmUnXSxcbiAgICBbJ2hhcycsICdoYXZlJ10sXG4gICAgWyd0aGlzJywgJ3RoZXNlJ10sXG4gICAgWyd0aGF0JywgJ3Rob3NlJ10sXG4gICAgLy8gV29yZHMgZW5kaW5nIGluIHdpdGggYSBjb25zb25hbnQgYW5kIGBvYC5cbiAgICBbJ2VjaG8nLCAnZWNob2VzJ10sXG4gICAgWydkaW5nbycsICdkaW5nb2VzJ10sXG4gICAgWyd2b2xjYW5vJywgJ3ZvbGNhbm9lcyddLFxuICAgIFsndG9ybmFkbycsICd0b3JuYWRvZXMnXSxcbiAgICBbJ3RvcnBlZG8nLCAndG9ycGVkb2VzJ10sXG4gICAgLy8gRW5kcyB3aXRoIGB1c2AuXG4gICAgWydnZW51cycsICdnZW5lcmEnXSxcbiAgICBbJ3Zpc2N1cycsICd2aXNjZXJhJ10sXG4gICAgLy8gRW5kcyB3aXRoIGBtYWAuXG4gICAgWydzdGlnbWEnLCAnc3RpZ21hdGEnXSxcbiAgICBbJ3N0b21hJywgJ3N0b21hdGEnXSxcbiAgICBbJ2RvZ21hJywgJ2RvZ21hdGEnXSxcbiAgICBbJ2xlbW1hJywgJ2xlbW1hdGEnXSxcbiAgICBbJ3NjaGVtYScsICdzY2hlbWF0YSddLFxuICAgIFsnYW5hdGhlbWEnLCAnYW5hdGhlbWF0YSddLFxuICAgIC8vIE90aGVyIGlycmVndWxhciBydWxlcy5cbiAgICBbJ294JywgJ294ZW4nXSxcbiAgICBbJ2F4ZScsICdheGVzJ10sXG4gICAgWydkaWUnLCAnZGljZSddLFxuICAgIFsneWVzJywgJ3llc2VzJ10sXG4gICAgWydmb290JywgJ2ZlZXQnXSxcbiAgICBbJ2VhdmUnLCAnZWF2ZXMnXSxcbiAgICBbJ2dvb3NlJywgJ2dlZXNlJ10sXG4gICAgWyd0b290aCcsICd0ZWV0aCddLFxuICAgIFsncXVpeicsICdxdWl6emVzJ10sXG4gICAgWydodW1hbicsICdodW1hbnMnXSxcbiAgICBbJ3Byb29mJywgJ3Byb29mcyddLFxuICAgIFsnY2FydmUnLCAnY2FydmVzJ10sXG4gICAgWyd2YWx2ZScsICd2YWx2ZXMnXSxcbiAgICBbJ2xvb2V5JywgJ2xvb2llcyddLFxuICAgIFsndGhpZWYnLCAndGhpZXZlcyddLFxuICAgIFsnZ3Jvb3ZlJywgJ2dyb292ZXMnXSxcbiAgICBbJ3BpY2theGUnLCAncGlja2F4ZXMnXSxcbiAgICBbJ3Bhc3NlcmJ5JywgJ3Bhc3NlcnNieSddXG4gIF0uZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgIHJldHVybiBwbHVyYWxpemUuYWRkSXJyZWd1bGFyUnVsZShydWxlWzBdLCBydWxlWzFdKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFBsdXJhbGl6YXRpb24gcnVsZXMuXG4gICAqL1xuICBbXG4gICAgWy9zPyQvaSwgJ3MnXSxcbiAgICBbL1teXFx1MDAwMC1cXHUwMDdGXSQvaSwgJyQwJ10sXG4gICAgWy8oW15hZWlvdV1lc2UpJC9pLCAnJDEnXSxcbiAgICBbLyhheHx0ZXN0KWlzJC9pLCAnJDFlcyddLFxuICAgIFsvKGFsaWFzfFteYW91XXVzfHRbbG1dYXN8Z2FzfHJpcykkL2ksICckMWVzJ10sXG4gICAgWy8oZVttbl11KXM/JC9pLCAnJDFzJ10sXG4gICAgWy8oW15sXWlhc3xbYWVpb3VdbGFzfFtlanpyXWFzfFtpdV1hbSkkL2ksICckMSddLFxuICAgIFsvKGFsdW1ufHN5bGxhYnx2aXJ8cmFkaXxudWNsZXxmdW5nfGNhY3R8c3RpbXVsfHRlcm1pbnxiYWNpbGx8Zm9jfHV0ZXJ8bG9jfHN0cmF0KSg/OnVzfGkpJC9pLCAnJDFpJ10sXG4gICAgWy8oYWx1bW58YWxnfHZlcnRlYnIpKD86YXxhZSkkL2ksICckMWFlJ10sXG4gICAgWy8oc2VyYXBofGNoZXJ1YikoPzppbSk/JC9pLCAnJDFpbSddLFxuICAgIFsvKGhlcnxhdHxncilvJC9pLCAnJDFvZXMnXSxcbiAgICBbLyhhZ2VuZHxhZGRlbmR8bWlsbGVubml8ZGF0fGV4dHJlbXxiYWN0ZXJpfGRlc2lkZXJhdHxzdHJhdHxjYW5kZWxhYnJ8ZXJyYXR8b3Z8c3ltcG9zaXxjdXJyaWN1bHxhdXRvbWF0fHF1b3IpKD86YXx1bSkkL2ksICckMWEnXSxcbiAgICBbLyhhcGhlbGl8aHlwZXJiYXR8cGVyaWhlbGl8YXN5bmRldHxub3VtZW58cGhlbm9tZW58Y3JpdGVyaXxvcmdhbnxwcm9sZWdvbWVufGhlZHJ8YXV0b21hdCkoPzphfG9uKSQvaSwgJyQxYSddLFxuICAgIFsvc2lzJC9pLCAnc2VzJ10sXG4gICAgWy8oPzooa25pfHdpfGxpKWZlfChhcnxsfGVhfGVvfG9hfGhvbylmKSQvaSwgJyQxJDJ2ZXMnXSxcbiAgICBbLyhbXmFlaW91eV18cXUpeSQvaSwgJyQxaWVzJ10sXG4gICAgWy8oW15jaF1baWVvXVtsbl0pZXkkL2ksICckMWllcyddLFxuICAgIFsvKHh8Y2h8c3N8c2h8enopJC9pLCAnJDFlcyddLFxuICAgIFsvKG1hdHJ8Y29kfG11cnxzaWx8dmVydHxpbmR8YXBwZW5kKSg/Oml4fGV4KSQvaSwgJyQxaWNlcyddLFxuICAgIFsvXFxiKCg/OnRpdCk/bXxsKSg/OmljZXxvdXNlKSQvaSwgJyQxaWNlJ10sXG4gICAgWy8ocGUpKD86cnNvbnxvcGxlKSQvaSwgJyQxb3BsZSddLFxuICAgIFsvKGNoaWxkKSg/OnJlbik/JC9pLCAnJDFyZW4nXSxcbiAgICBbL2VhdXgkL2ksICckMCddLFxuICAgIFsvbVthZV1uJC9pLCAnbWVuJ10sXG4gICAgWyd0aG91JywgJ3lvdSddXG4gIF0uZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgIHJldHVybiBwbHVyYWxpemUuYWRkUGx1cmFsUnVsZShydWxlWzBdLCBydWxlWzFdKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFNpbmd1bGFyaXphdGlvbiBydWxlcy5cbiAgICovXG4gIFtcbiAgICBbL3MkL2ksICcnXSxcbiAgICBbLyhzcykkL2ksICckMSddLFxuICAgIFsvKHdpfGtuaXwoPzphZnRlcnxoYWxmfGhpZ2h8bG93fG1pZHxub258bmlnaHR8W15cXHddfF4pbGkpdmVzJC9pLCAnJDFmZSddLFxuICAgIFsvKGFyfCg/OndvfFthZV0pbHxbZW9dW2FvXSl2ZXMkL2ksICckMWYnXSxcbiAgICBbL2llcyQvaSwgJ3knXSxcbiAgICBbL1xcYihbcGxdfHpvbWJ8KD86bmVja3xjcm9zcyk/dHxjb2xsfGZhZXJ8Zm9vZHxnZW58Z29vbnxncm91cHxsYXNzfHRhbGt8Z29hbHxjdXQpaWVzJC9pLCAnJDFpZSddLFxuICAgIFsvXFxiKG1vbnxzbWlsKWllcyQvaSwgJyQxZXknXSxcbiAgICBbL1xcYigoPzp0aXQpP218bClpY2UkL2ksICckMW91c2UnXSxcbiAgICBbLyhzZXJhcGh8Y2hlcnViKWltJC9pLCAnJDEnXSxcbiAgICBbLyh4fGNofHNzfHNofHp6fHR0b3xnb3xjaG98YWxpYXN8W15hb3VddXN8dFtsbV1hc3xnYXN8KD86aGVyfGF0fGdyKW98W2FlaW91XXJpcykoPzplcyk/JC9pLCAnJDEnXSxcbiAgICBbLyhhbmFseXxkaWFnbm98cGFyZW50aGV8cHJvZ25vfHN5bm9wfHRoZXxlbXBoYXxjcml8bmUpKD86c2lzfHNlcykkL2ksICckMXNpcyddLFxuICAgIFsvKG1vdmllfHR3ZWx2ZXxhYnVzZXxlW21uXXUpcyQvaSwgJyQxJ10sXG4gICAgWy8odGVzdCkoPzppc3xlcykkL2ksICckMWlzJ10sXG4gICAgWy8oYWx1bW58c3lsbGFifHZpcnxyYWRpfG51Y2xlfGZ1bmd8Y2FjdHxzdGltdWx8dGVybWlufGJhY2lsbHxmb2N8dXRlcnxsb2N8c3RyYXQpKD86dXN8aSkkL2ksICckMXVzJ10sXG4gICAgWy8oYWdlbmR8YWRkZW5kfG1pbGxlbm5pfGRhdHxleHRyZW18YmFjdGVyaXxkZXNpZGVyYXR8c3RyYXR8Y2FuZGVsYWJyfGVycmF0fG92fHN5bXBvc2l8Y3VycmljdWx8cXVvcilhJC9pLCAnJDF1bSddLFxuICAgIFsvKGFwaGVsaXxoeXBlcmJhdHxwZXJpaGVsaXxhc3luZGV0fG5vdW1lbnxwaGVub21lbnxjcml0ZXJpfG9yZ2FufHByb2xlZ29tZW58aGVkcnxhdXRvbWF0KWEkL2ksICckMW9uJ10sXG4gICAgWy8oYWx1bW58YWxnfHZlcnRlYnIpYWUkL2ksICckMWEnXSxcbiAgICBbLyhjb2R8bXVyfHNpbHx2ZXJ0fGluZClpY2VzJC9pLCAnJDFleCddLFxuICAgIFsvKG1hdHJ8YXBwZW5kKWljZXMkL2ksICckMWl4J10sXG4gICAgWy8ocGUpKHJzb258b3BsZSkkL2ksICckMXJzb24nXSxcbiAgICBbLyhjaGlsZClyZW4kL2ksICckMSddLFxuICAgIFsvKGVhdSl4PyQvaSwgJyQxJ10sXG4gICAgWy9tZW4kL2ksICdtYW4nXVxuICBdLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICByZXR1cm4gcGx1cmFsaXplLmFkZFNpbmd1bGFyUnVsZShydWxlWzBdLCBydWxlWzFdKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFVuY291bnRhYmxlIHJ1bGVzLlxuICAgKi9cbiAgW1xuICAgIC8vIFNpbmd1bGFyIHdvcmRzIHdpdGggbm8gcGx1cmFscy5cbiAgICAnYWR1bHRob29kJyxcbiAgICAnYWR2aWNlJyxcbiAgICAnYWdlbmRhJyxcbiAgICAnYWlkJyxcbiAgICAnYWlyY3JhZnQnLFxuICAgICdhbGNvaG9sJyxcbiAgICAnYW1tbycsXG4gICAgJ2FuYWx5dGljcycsXG4gICAgJ2FuaW1lJyxcbiAgICAnYXRobGV0aWNzJyxcbiAgICAnYXVkaW8nLFxuICAgICdiaXNvbicsXG4gICAgJ2Jsb29kJyxcbiAgICAnYnJlYW0nLFxuICAgICdidWZmYWxvJyxcbiAgICAnYnV0dGVyJyxcbiAgICAnY2FycCcsXG4gICAgJ2Nhc2gnLFxuICAgICdjaGFzc2lzJyxcbiAgICAnY2hlc3MnLFxuICAgICdjbG90aGluZycsXG4gICAgJ2NvZCcsXG4gICAgJ2NvbW1lcmNlJyxcbiAgICAnY29vcGVyYXRpb24nLFxuICAgICdjb3JwcycsXG4gICAgJ2RlYnJpcycsXG4gICAgJ2RpYWJldGVzJyxcbiAgICAnZGlnZXN0aW9uJyxcbiAgICAnZWxrJyxcbiAgICAnZW5lcmd5JyxcbiAgICAnZXF1aXBtZW50JyxcbiAgICAnZXhjcmV0aW9uJyxcbiAgICAnZXhwZXJ0aXNlJyxcbiAgICAnZmlybXdhcmUnLFxuICAgICdmbG91bmRlcicsXG4gICAgJ2Z1bicsXG4gICAgJ2dhbGxvd3MnLFxuICAgICdnYXJiYWdlJyxcbiAgICAnZ3JhZmZpdGknLFxuICAgICdoYXJkd2FyZScsXG4gICAgJ2hlYWRxdWFydGVycycsXG4gICAgJ2hlYWx0aCcsXG4gICAgJ2hlcnBlcycsXG4gICAgJ2hpZ2hqaW5rcycsXG4gICAgJ2hvbWV3b3JrJyxcbiAgICAnaG91c2V3b3JrJyxcbiAgICAnaW5mb3JtYXRpb24nLFxuICAgICdqZWFucycsXG4gICAgJ2p1c3RpY2UnLFxuICAgICdrdWRvcycsXG4gICAgJ2xhYm91cicsXG4gICAgJ2xpdGVyYXR1cmUnLFxuICAgICdtYWNoaW5lcnknLFxuICAgICdtYWNrZXJlbCcsXG4gICAgJ21haWwnLFxuICAgICdtZWRpYScsXG4gICAgJ21ld3MnLFxuICAgICdtb29zZScsXG4gICAgJ211c2ljJyxcbiAgICAnbXVkJyxcbiAgICAnbWFuZ2EnLFxuICAgICduZXdzJyxcbiAgICAnb25seScsXG4gICAgJ3BlcnNvbm5lbCcsXG4gICAgJ3Bpa2UnLFxuICAgICdwbGFua3RvbicsXG4gICAgJ3BsaWVycycsXG4gICAgJ3BvbGljZScsXG4gICAgJ3BvbGx1dGlvbicsXG4gICAgJ3ByZW1pc2VzJyxcbiAgICAncmFpbicsXG4gICAgJ3Jlc2VhcmNoJyxcbiAgICAncmljZScsXG4gICAgJ3NhbG1vbicsXG4gICAgJ3NjaXNzb3JzJyxcbiAgICAnc2VyaWVzJyxcbiAgICAnc2V3YWdlJyxcbiAgICAnc2hhbWJsZXMnLFxuICAgICdzaHJpbXAnLFxuICAgICdzb2Z0d2FyZScsXG4gICAgJ3NwZWNpZXMnLFxuICAgICdzdGFmZicsXG4gICAgJ3N3aW5lJyxcbiAgICAndGVubmlzJyxcbiAgICAndHJhZmZpYycsXG4gICAgJ3RyYW5zcG9ydGF0aW9uJyxcbiAgICAndHJvdXQnLFxuICAgICd0dW5hJyxcbiAgICAnd2VhbHRoJyxcbiAgICAnd2VsZmFyZScsXG4gICAgJ3doaXRpbmcnLFxuICAgICd3aWxkZWJlZXN0JyxcbiAgICAnd2lsZGxpZmUnLFxuICAgICd5b3UnLFxuICAgIC9wb2tbZcOpXW1vbiQvaSxcbiAgICAvLyBSZWdleGVzLlxuICAgIC9bXmFlaW91XWVzZSQvaSwgLy8gXCJjaGluZXNlXCIsIFwiamFwYW5lc2VcIlxuICAgIC9kZWVyJC9pLCAvLyBcImRlZXJcIiwgXCJyZWluZGVlclwiXG4gICAgL2Zpc2gkL2ksIC8vIFwiZmlzaFwiLCBcImJsb3dmaXNoXCIsIFwiYW5nZWxmaXNoXCJcbiAgICAvbWVhc2xlcyQvaSxcbiAgICAvb1tpdV1zJC9pLCAvLyBcImNhcm5pdm9yb3VzXCJcbiAgICAvcG94JC9pLCAvLyBcImNoaWNrcG94XCIsIFwic21hbGxwb3hcIlxuICAgIC9zaGVlcCQvaVxuICBdLmZvckVhY2gocGx1cmFsaXplLmFkZFVuY291bnRhYmxlUnVsZSk7XG5cbiAgcmV0dXJuIHBsdXJhbGl6ZTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgTEVBRl9LRVksIGhhc1dlYWtNYXA7XG5cbi8qKlxuICogQXJiaXRyYXJ5IHZhbHVlIHVzZWQgYXMga2V5IGZvciByZWZlcmVuY2luZyBjYWNoZSBvYmplY3QgaW4gV2Vha01hcCB0cmVlLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbkxFQUZfS0VZID0ge307XG5cbi8qKlxuICogV2hldGhlciBlbnZpcm9ubWVudCBzdXBwb3J0cyBXZWFrTWFwLlxuICpcbiAqIEB0eXBlIHtib29sZWFufVxuICovXG5oYXNXZWFrTWFwID0gdHlwZW9mIFdlYWtNYXAgIT09ICd1bmRlZmluZWQnO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGFzIHRoZSBzb2xlIGVudHJ5IGluIGFuIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gcmV0dXJuLlxuICpcbiAqIEByZXR1cm4ge0FycmF5fSBWYWx1ZSByZXR1cm5lZCBhcyBlbnRyeSBpbiBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlPZiggdmFsdWUgKSB7XG5cdHJldHVybiBbIHZhbHVlIF07XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb2JqZWN0LWxpa2UsIG9yIGZhbHNlIG90aGVyd2lzZS4gQSB2YWx1ZVxuICogaXMgb2JqZWN0LWxpa2UgaWYgaXQgY2FuIHN1cHBvcnQgcHJvcGVydHkgYXNzaWdubWVudCwgZS5nLiBvYmplY3Qgb3IgYXJyYXkuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byB0ZXN0LlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdmFsdWUgaXMgb2JqZWN0LWxpa2UuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSggdmFsdWUgKSB7XG5cdHJldHVybiAhISB2YWx1ZSAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHZhbHVlO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gQ2FjaGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBjcmVhdGVDYWNoZSgpIHtcblx0dmFyIGNhY2hlID0ge1xuXHRcdGNsZWFyOiBmdW5jdGlvbigpIHtcblx0XHRcdGNhY2hlLmhlYWQgPSBudWxsO1xuXHRcdH0sXG5cdH07XG5cblx0cmV0dXJuIGNhY2hlO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBlbnRyaWVzIHdpdGhpbiB0aGUgdHdvIGFycmF5cyBhcmUgc3RyaWN0bHkgZXF1YWwgYnlcbiAqIHJlZmVyZW5jZSBmcm9tIGEgc3RhcnRpbmcgaW5kZXguXG4gKlxuICogQHBhcmFtIHtBcnJheX0gIGEgICAgICAgICBGaXJzdCBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXl9ICBiICAgICAgICAgU2Vjb25kIGFycmF5LlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBJbmRleCBmcm9tIHdoaWNoIHRvIHN0YXJ0IGNvbXBhcmlzb24uXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBhcnJheXMgYXJlIHNoYWxsb3dseSBlcXVhbC5cbiAqL1xuZnVuY3Rpb24gaXNTaGFsbG93RXF1YWwoIGEsIGIsIGZyb21JbmRleCApIHtcblx0dmFyIGk7XG5cblx0aWYgKCBhLmxlbmd0aCAhPT0gYi5sZW5ndGggKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Zm9yICggaSA9IGZyb21JbmRleDsgaSA8IGEubGVuZ3RoOyBpKysgKSB7XG5cdFx0aWYgKCBhWyBpIF0gIT09IGJbIGkgXSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbWVtb2l6ZWQgc2VsZWN0b3IgZnVuY3Rpb24uIFRoZSBnZXREZXBlbmRhbnRzIGZ1bmN0aW9uIGFyZ3VtZW50IGlzXG4gKiBjYWxsZWQgYmVmb3JlIHRoZSBtZW1vaXplZCBzZWxlY3RvciBhbmQgaXMgZXhwZWN0ZWQgdG8gcmV0dXJuIGFuIGltbXV0YWJsZVxuICogcmVmZXJlbmNlIG9yIGFycmF5IG9mIHJlZmVyZW5jZXMgb24gd2hpY2ggdGhlIHNlbGVjdG9yIGRlcGVuZHMgZm9yIGNvbXB1dGluZ1xuICogaXRzIG93biByZXR1cm4gdmFsdWUuIFRoZSBtZW1vaXplIGNhY2hlIGlzIHByZXNlcnZlZCBvbmx5IGFzIGxvbmcgYXMgdGhvc2VcbiAqIGRlcGVuZGFudCByZWZlcmVuY2VzIHJlbWFpbiB0aGUgc2FtZS4gSWYgZ2V0RGVwZW5kYW50cyByZXR1cm5zIGEgZGlmZmVyZW50XG4gKiByZWZlcmVuY2UocyksIHRoZSBjYWNoZSBpcyBjbGVhcmVkIGFuZCB0aGUgc2VsZWN0b3IgdmFsdWUgcmVnZW5lcmF0ZWQuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc2VsZWN0b3IgICAgICBTZWxlY3RvciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGdldERlcGVuZGFudHMgRGVwZW5kYW50IGdldHRlciByZXR1cm5pbmcgYW4gaW1tdXRhYmxlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVyZW5jZSBvciBhcnJheSBvZiByZWZlcmVuY2UgdXNlZCBpblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZSBidXN0IGNvbnNpZGVyYXRpb24uXG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259IE1lbW9pemVkIHNlbGVjdG9yLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiggc2VsZWN0b3IsIGdldERlcGVuZGFudHMgKSB7XG5cdHZhciByb290Q2FjaGUsIGdldENhY2hlO1xuXG5cdC8vIFVzZSBvYmplY3Qgc291cmNlIGFzIGRlcGVuZGFudCBpZiBnZXR0ZXIgbm90IHByb3ZpZGVkXG5cdGlmICggISBnZXREZXBlbmRhbnRzICkge1xuXHRcdGdldERlcGVuZGFudHMgPSBhcnJheU9mO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHJvb3QgY2FjaGUuIElmIFdlYWtNYXAgaXMgc3VwcG9ydGVkLCB0aGlzIGlzIGFzc2lnbmVkIHRvIHRoZVxuXHQgKiByb290IFdlYWtNYXAgY2FjaGUgc2V0LCBvdGhlcndpc2UgaXQgaXMgYSBzaGFyZWQgaW5zdGFuY2Ugb2YgdGhlIGRlZmF1bHRcblx0ICogY2FjaGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHsoV2Vha01hcHxPYmplY3QpfSBSb290IGNhY2hlIG9iamVjdC5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJvb3RDYWNoZSgpIHtcblx0XHRyZXR1cm4gcm9vdENhY2hlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGNhY2hlIGZvciBhIGdpdmVuIGRlcGVuZGFudHMgYXJyYXkuIFdoZW4gcG9zc2libGUsIGEgV2Vha01hcFxuXHQgKiB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlIGEgdW5pcXVlIGNhY2hlIGZvciBlYWNoIHNldCBvZiBkZXBlbmRhbnRzLiBUaGlzXG5cdCAqIGlzIGZlYXNpYmxlIGR1ZSB0byB0aGUgbmF0dXJlIG9mIFdlYWtNYXAgaW4gYWxsb3dpbmcgZ2FyYmFnZSBjb2xsZWN0aW9uXG5cdCAqIHRvIG9jY3VyIG9uIGVudHJpZXMgd2hlcmUgdGhlIGtleSBvYmplY3QgaXMgbm8gbG9uZ2VyIHJlZmVyZW5jZWQuIFNpbmNlXG5cdCAqIFdlYWtNYXAgcmVxdWlyZXMgdGhlIGtleSB0byBiZSBhbiBvYmplY3QsIHRoaXMgaXMgb25seSBwb3NzaWJsZSB3aGVuIHRoZVxuXHQgKiBkZXBlbmRhbnQgaXMgb2JqZWN0LWxpa2UuIFRoZSByb290IGNhY2hlIGlzIGNyZWF0ZWQgYXMgYSBoaWVyYXJjaHkgd2hlcmVcblx0ICogZWFjaCB0b3AtbGV2ZWwga2V5IGlzIHRoZSBmaXJzdCBlbnRyeSBpbiBhIGRlcGVuZGFudHMgc2V0LCB0aGUgdmFsdWUgYVxuXHQgKiBXZWFrTWFwIHdoZXJlIGVhY2gga2V5IGlzIHRoZSBuZXh0IGRlcGVuZGFudCwgYW5kIHNvIG9uLiBUaGlzIGNvbnRpbnVlc1xuXHQgKiBzbyBsb25nIGFzIHRoZSBkZXBlbmRhbnRzIGFyZSBvYmplY3QtbGlrZS4gSWYgbm8gZGVwZW5kYW50cyBhcmUgb2JqZWN0LVxuXHQgKiBsaWtlLCB0aGVuIHRoZSBjYWNoZSBpcyBzaGFyZWQgYWNyb3NzIGFsbCBpbnZvY2F0aW9ucy5cblx0ICpcblx0ICogQHNlZSBpc09iamVjdExpa2Vcblx0ICpcblx0ICogQHBhcmFtIHtBcnJheX0gZGVwZW5kYW50cyBTZWxlY3RvciBkZXBlbmRhbnRzLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IENhY2hlIG9iamVjdC5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFdlYWtNYXBDYWNoZSggZGVwZW5kYW50cyApIHtcblx0XHR2YXIgY2FjaGVzID0gcm9vdENhY2hlLFxuXHRcdFx0aXNVbmlxdWVCeURlcGVuZGFudHMgPSB0cnVlLFxuXHRcdFx0aSwgZGVwZW5kYW50LCBtYXAsIGNhY2hlO1xuXG5cdFx0Zm9yICggaSA9IDA7IGkgPCBkZXBlbmRhbnRzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0ZGVwZW5kYW50ID0gZGVwZW5kYW50c1sgaSBdO1xuXG5cdFx0XHQvLyBDYW4gb25seSBjb21wb3NlIFdlYWtNYXAgZnJvbSBvYmplY3QtbGlrZSBrZXkuXG5cdFx0XHRpZiAoICEgaXNPYmplY3RMaWtlKCBkZXBlbmRhbnQgKSApIHtcblx0XHRcdFx0aXNVbmlxdWVCeURlcGVuZGFudHMgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8vIERvZXMgY3VycmVudCBzZWdtZW50IG9mIGNhY2hlIGFscmVhZHkgaGF2ZSBhIFdlYWtNYXA/XG5cdFx0XHRpZiAoIGNhY2hlcy5oYXMoIGRlcGVuZGFudCApICkge1xuXHRcdFx0XHQvLyBUcmF2ZXJzZSBpbnRvIG5lc3RlZCBXZWFrTWFwLlxuXHRcdFx0XHRjYWNoZXMgPSBjYWNoZXMuZ2V0KCBkZXBlbmRhbnQgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIENyZWF0ZSwgc2V0LCBhbmQgdHJhdmVyc2UgaW50byBhIG5ldyBvbmUuXG5cdFx0XHRcdG1hcCA9IG5ldyBXZWFrTWFwKCk7XG5cdFx0XHRcdGNhY2hlcy5zZXQoIGRlcGVuZGFudCwgbWFwICk7XG5cdFx0XHRcdGNhY2hlcyA9IG1hcDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBXZSB1c2UgYW4gYXJiaXRyYXJ5IChidXQgY29uc2lzdGVudCkgb2JqZWN0IGFzIGtleSBmb3IgdGhlIGxhc3QgaXRlbVxuXHRcdC8vIGluIHRoZSBXZWFrTWFwIHRvIHNlcnZlIGFzIG91ciBydW5uaW5nIGNhY2hlLlxuXHRcdGlmICggISBjYWNoZXMuaGFzKCBMRUFGX0tFWSApICkge1xuXHRcdFx0Y2FjaGUgPSBjcmVhdGVDYWNoZSgpO1xuXHRcdFx0Y2FjaGUuaXNVbmlxdWVCeURlcGVuZGFudHMgPSBpc1VuaXF1ZUJ5RGVwZW5kYW50cztcblx0XHRcdGNhY2hlcy5zZXQoIExFQUZfS0VZLCBjYWNoZSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBjYWNoZXMuZ2V0KCBMRUFGX0tFWSApO1xuXHR9XG5cblx0Ly8gQXNzaWduIGNhY2hlIGhhbmRsZXIgYnkgYXZhaWxhYmlsaXR5IG9mIFdlYWtNYXBcblx0Z2V0Q2FjaGUgPSBoYXNXZWFrTWFwID8gZ2V0V2Vha01hcENhY2hlIDogZ2V0Um9vdENhY2hlO1xuXG5cdC8qKlxuXHQgKiBSZXNldHMgcm9vdCBtZW1vaXphdGlvbiBjYWNoZS5cblx0ICovXG5cdGZ1bmN0aW9uIGNsZWFyKCkge1xuXHRcdHJvb3RDYWNoZSA9IGhhc1dlYWtNYXAgPyBuZXcgV2Vha01hcCgpIDogY3JlYXRlQ2FjaGUoKTtcblx0fVxuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc2RvYy9jaGVjay1wYXJhbS1uYW1lc1xuXHQvKipcblx0ICogVGhlIGF1Z21lbnRlZCBzZWxlY3RvciBjYWxsLCBjb25zaWRlcmluZyBmaXJzdCB3aGV0aGVyIGRlcGVuZGFudHMgaGF2ZVxuXHQgKiBjaGFuZ2VkIGJlZm9yZSBwYXNzaW5nIGl0IHRvIHVuZGVybHlpbmcgbWVtb2l6ZSBmdW5jdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSAgICBTb3VyY2Ugb2JqZWN0IGZvciBkZXJpdmF0aW9uLlxuXHQgKiBAcGFyYW0gey4uLip9ICAgZXh0cmFBcmdzIEFkZGl0aW9uYWwgYXJndW1lbnRzIHRvIHBhc3MgdG8gc2VsZWN0b3IuXG5cdCAqXG5cdCAqIEByZXR1cm4geyp9IFNlbGVjdG9yIHJlc3VsdC5cblx0ICovXG5cdGZ1bmN0aW9uIGNhbGxTZWxlY3RvciggLyogc291cmNlLCAuLi5leHRyYUFyZ3MgKi8gKSB7XG5cdFx0dmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0XHRjYWNoZSwgbm9kZSwgaSwgYXJncywgZGVwZW5kYW50cztcblxuXHRcdC8vIENyZWF0ZSBjb3B5IG9mIGFyZ3VtZW50cyAoYXZvaWQgbGVha2luZyBkZW9wdGltaXphdGlvbikuXG5cdFx0YXJncyA9IG5ldyBBcnJheSggbGVuICk7XG5cdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdGFyZ3NbIGkgXSA9IGFyZ3VtZW50c1sgaSBdO1xuXHRcdH1cblxuXHRcdGRlcGVuZGFudHMgPSBnZXREZXBlbmRhbnRzLmFwcGx5KCBudWxsLCBhcmdzICk7XG5cdFx0Y2FjaGUgPSBnZXRDYWNoZSggZGVwZW5kYW50cyApO1xuXG5cdFx0Ly8gSWYgbm90IGd1YXJhbnRlZWQgdW5pcXVlbmVzcyBieSBkZXBlbmRhbnRzIChwcmltaXRpdmUgdHlwZSBvciBsYWNrXG5cdFx0Ly8gb2YgV2Vha01hcCBzdXBwb3J0KSwgc2hhbGxvdyBjb21wYXJlIGFnYWluc3QgbGFzdCBkZXBlbmRhbnRzIGFuZCwgaWZcblx0XHQvLyByZWZlcmVuY2VzIGhhdmUgY2hhbmdlZCwgZGVzdHJveSBjYWNoZSB0byByZWNhbGN1bGF0ZSByZXN1bHQuXG5cdFx0aWYgKCAhIGNhY2hlLmlzVW5pcXVlQnlEZXBlbmRhbnRzICkge1xuXHRcdFx0aWYgKCBjYWNoZS5sYXN0RGVwZW5kYW50cyAmJiAhIGlzU2hhbGxvd0VxdWFsKCBkZXBlbmRhbnRzLCBjYWNoZS5sYXN0RGVwZW5kYW50cywgMCApICkge1xuXHRcdFx0XHRjYWNoZS5jbGVhcigpO1xuXHRcdFx0fVxuXG5cdFx0XHRjYWNoZS5sYXN0RGVwZW5kYW50cyA9IGRlcGVuZGFudHM7XG5cdFx0fVxuXG5cdFx0bm9kZSA9IGNhY2hlLmhlYWQ7XG5cdFx0d2hpbGUgKCBub2RlICkge1xuXHRcdFx0Ly8gQ2hlY2sgd2hldGhlciBub2RlIGFyZ3VtZW50cyBtYXRjaCBhcmd1bWVudHNcblx0XHRcdGlmICggISBpc1NoYWxsb3dFcXVhbCggbm9kZS5hcmdzLCBhcmdzLCAxICkgKSB7XG5cdFx0XHRcdG5vZGUgPSBub2RlLm5leHQ7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBdCB0aGlzIHBvaW50IHdlIGNhbiBhc3N1bWUgd2UndmUgZm91bmQgYSBtYXRjaFxuXG5cdFx0XHQvLyBTdXJmYWNlIG1hdGNoZWQgbm9kZSB0byBoZWFkIGlmIG5vdCBhbHJlYWR5XG5cdFx0XHRpZiAoIG5vZGUgIT09IGNhY2hlLmhlYWQgKSB7XG5cdFx0XHRcdC8vIEFkanVzdCBzaWJsaW5ncyB0byBwb2ludCB0byBlYWNoIG90aGVyLlxuXHRcdFx0XHRub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcblx0XHRcdFx0aWYgKCBub2RlLm5leHQgKSB7XG5cdFx0XHRcdFx0bm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRub2RlLm5leHQgPSBjYWNoZS5oZWFkO1xuXHRcdFx0XHRub2RlLnByZXYgPSBudWxsO1xuXHRcdFx0XHRjYWNoZS5oZWFkLnByZXYgPSBub2RlO1xuXHRcdFx0XHRjYWNoZS5oZWFkID0gbm9kZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV0dXJuIGltbWVkaWF0ZWx5XG5cdFx0XHRyZXR1cm4gbm9kZS52YWw7XG5cdFx0fVxuXG5cdFx0Ly8gTm8gY2FjaGVkIHZhbHVlIGZvdW5kLiBDb250aW51ZSB0byBpbnNlcnRpb24gcGhhc2U6XG5cblx0XHRub2RlID0ge1xuXHRcdFx0Ly8gR2VuZXJhdGUgdGhlIHJlc3VsdCBmcm9tIG9yaWdpbmFsIGZ1bmN0aW9uXG5cdFx0XHR2YWw6IHNlbGVjdG9yLmFwcGx5KCBudWxsLCBhcmdzICksXG5cdFx0fTtcblxuXHRcdC8vIEF2b2lkIGluY2x1ZGluZyB0aGUgc291cmNlIG9iamVjdCBpbiB0aGUgY2FjaGUuXG5cdFx0YXJnc1sgMCBdID0gbnVsbDtcblx0XHRub2RlLmFyZ3MgPSBhcmdzO1xuXG5cdFx0Ly8gRG9uJ3QgbmVlZCB0byBjaGVjayB3aGV0aGVyIG5vZGUgaXMgYWxyZWFkeSBoZWFkLCBzaW5jZSBpdCB3b3VsZFxuXHRcdC8vIGhhdmUgYmVlbiByZXR1cm5lZCBhYm92ZSBhbHJlYWR5IGlmIGl0IHdhc1xuXG5cdFx0Ly8gU2hpZnQgZXhpc3RpbmcgaGVhZCBkb3duIGxpc3Rcblx0XHRpZiAoIGNhY2hlLmhlYWQgKSB7XG5cdFx0XHRjYWNoZS5oZWFkLnByZXYgPSBub2RlO1xuXHRcdFx0bm9kZS5uZXh0ID0gY2FjaGUuaGVhZDtcblx0XHR9XG5cblx0XHRjYWNoZS5oZWFkID0gbm9kZTtcblxuXHRcdHJldHVybiBub2RlLnZhbDtcblx0fVxuXG5cdGNhbGxTZWxlY3Rvci5nZXREZXBlbmRhbnRzID0gZ2V0RGVwZW5kYW50cztcblx0Y2FsbFNlbGVjdG9yLmNsZWFyID0gY2xlYXI7XG5cdGNsZWFyKCk7XG5cblx0cmV0dXJuIGNhbGxTZWxlY3Rvcjtcbn1cbiIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wicmVnZW5lcmF0b3JSdW50aW1lXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcImhlbHBlcnNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1wibW9kZWxcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1widmFsaWRhdG9yc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIndwXCJdW1wiYXBpRmV0Y2hcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJ3cFwiXVtcImRhdGFcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJ3cFwiXVtcImlzU2hhbGxvd0VxdWFsXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibG9kYXNoXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
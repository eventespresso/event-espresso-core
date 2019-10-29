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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9iYXNlLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9iYXNlLW1vZGVsLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9iYXNlLXNlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vYXNzZXRzL3NyYy9kYXRhL2V2ZW50ZXNwcmVzc28vY29yZS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL2Fzc2V0cy9zcmMvZGF0YS9ldmVudGVzcHJlc3NvL3NjaGVtYS9hY3Rpb24tdHlwZXMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL2Fzc2V0cy9zcmMvZGF0YS9ldmVudGVzcHJlc3NvL3NjaGVtYS9hY3Rpb25zLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9zY2hlbWEvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9zY2hlbWEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL2Fzc2V0cy9zcmMvZGF0YS9ldmVudGVzcHJlc3NvL3NjaGVtYS9tb2RlbC5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vYXNzZXRzL3NyYy9kYXRhL2V2ZW50ZXNwcmVzc28vc2NoZW1hL3JlZHVjZXJzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9zY2hlbWEvcmVzb2x2ZXJzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9hc3NldHMvc3JjL2RhdGEvZXZlbnRlc3ByZXNzby9zY2hlbWEvc2VsZWN0b3JzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9ub2RlX21vZHVsZXMvaW1tdXRhYmxlL2Rpc3QvaW1tdXRhYmxlLmVzLmpzIiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvLi9ub2RlX21vZHVsZXMvcGx1cmFsaXplL3BsdXJhbGl6ZS5qcyIsIndlYnBhY2s6Ly9lZWpzLm1vZGVsU2NoZW1hLy4vbm9kZV9tb2R1bGVzL3JlbWVtby9lcy9yZW1lbW8uanMiLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6XCJyZWdlbmVyYXRvclJ1bnRpbWVcIn0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaGVscGVyc1wiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwibW9kZWxcIl19Iiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcInZhbGlkYXRvcnNcIl19Iiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJhcGlGZXRjaFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImRhdGFcIl19Iiwid2VicGFjazovL2VlanMubW9kZWxTY2hlbWEvZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJpc1NoYWxsb3dFcXVhbFwiXX0iLCJ3ZWJwYWNrOi8vZWVqcy5tb2RlbFNjaGVtYS9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iXSwibmFtZXMiOlsiZmV0Y2giLCJyZXF1ZXN0IiwidHlwZSIsInNlbGVjdCIsInJlZHVjZXJLZXkiLCJzZWxlY3Rvck5hbWUiLCJhcmdzIiwicmVzb2x2ZVNlbGVjdCIsImRpc3BhdGNoIiwiZGlzcGF0Y2hOYW1lIiwicmVzb2x2ZURpc3BhdGNoIiwicmVzb2x2ZUdldEVudGl0eUJ5SWRGb3JJZHMiLCJtb2RlbE5hbWUiLCJlbnRpdHlJZHMiLCJyZXNvbHZlR2V0UmVsYXRlZEVudGl0aWVzIiwiZW50aXR5IiwicmVsYXRpb25FbnRpdGllcyIsInJlbGF0aW9uSWRzIiwiY29udHJvbHMiLCJGRVRDSF9GUk9NX0FQSSIsImFwaUZldGNoIiwiU0VMRUNUIiwic2VsZWN0RGF0YSIsIkRJU1BBVENIIiwiZGlzcGF0Y2hEYXRhIiwiUkVTT0xWRV9ESVNQQVRDSCIsIlJFU09MVkVfU0VMRUNUIiwiUHJvbWlzZSIsInJlc29sdmUiLCJoYXNGaW5pc2hlZCIsImhhc0ZpbmlzaGVkUmVzb2x1dGlvbiIsImdldFJlc3VsdCIsImFwcGx5IiwicmVzdWx0IiwidW5zdWJzY3JpYmUiLCJzdWJzY3JpYmUiLCJSRVNPTFZFX0dFVF9FTlRJVFlfQllfSURfRk9SX0lEUyIsImxlbmd0aCIsIkNPUkVfUkVEVUNFUl9LRVkiLCJwb3AiLCJSRVNPTFZFX0dFVF9SRUxBVEVEX0VOVElUSUVTIiwicmVsYXRpb25FbnRpdHkiLCJnZXQiLCJwbHVyYWxNb2RlbE5hbWUiLCJnZXRNZXRob2ROYW1lIiwic3VmZml4IiwicHJlZml4IiwidXNlUGx1cmFsIiwicGx1cmFsaXplIiwidXBwZXJGaXJzdCIsImNhbWVsQ2FzZSIsImtlZXBFeGlzdGluZ0VudGl0aWVzSW5PYmplY3QiLCJleGlzdGluZ0VudGl0aWVzIiwiaW5jb21pbmdFbnRpdGllcyIsImdldEV4aXN0aW5nT3JEZWZhdWx0RW50aXR5IiwiZGVmYXVsdEVudGl0eSIsImVudGl0eUlkIiwiaXNNYXAiLCJoYXMiLCJyZWR1Y2VDYWxsYmFjayIsIm1hcHBlZCIsIm5vcm1hbGl6ZUVudGl0eUlkIiwic2V0IiwibWFwUmVkdWNlciIsIk1hcCIsInJlZHVjZSIsIm9yaWdpbmFsSWQiLCJwYXJzZUludCIsImlzTmFOIiwiaXNSZXNvbHZpbmciLCJoYXNGaW5pc2hlZFJlc29sdmluZyIsIlJFRFVDRVJfS0VZIiwiVFlQRV9RVUVVRV9SRUxBVElPTl9ERUxFVEUiLCJUWVBFX1FVRVVFX1JFTEFUSU9OX0FERCIsIkFDVElPTl9UWVBFUyIsIlJFQ0VJVkVfU0NIRU1BX1JFQ09SRCIsIlJFQ0VJVkVfRkFDVE9SWV9GT1JfTU9ERUwiLCJSRUNFSVZFX1JFTEFUSU9OX0VORFBPSU5UX0ZPUl9NT0RFTF9FTlRJVFkiLCJSRUNFSVZFX1JFTEFUSU9OX1NDSEVNQSIsInJlY2VpdmVTY2hlbWFGb3JNb2RlbEFuZFJlc29sdmUiLCJyZWNlaXZlRmFjdG9yeUZvck1vZGVsQW5kUmVzb2x2ZSIsInJlY2VpdmVSZWxhdGlvblNjaGVtYUFuZFJlc29sdmUiLCJyZWNlaXZlU2NoZW1hRm9yTW9kZWwiLCJzY2hlbWEiLCJ0eXBlcyIsIlNDSEVNQV9SRURVQ0VSX0tFWSIsInRvTG93ZXJDYXNlIiwicmVjZWl2ZUZhY3RvcnlGb3JNb2RlbCIsImZhY3RvcnkiLCJyZWNlaXZlUmVsYXRpb25FbmRwb2ludEZvck1vZGVsRW50aXR5IiwicmVsYXRpb25OYW1lIiwiZW5kcG9pbnQiLCJyZWNlaXZlUmVsYXRpb25TY2hlbWEiLCJyZWxhdGlvblNjaGVtYSIsIkpPSU5fUkVMQVRJT05fVFlQRVMiLCJlbnRpdHlTZWxlY3RvcnMiLCJjcmVhdGVFbnRpdHlTZWxlY3RvcnMiLCJzZWxlY3RvcnMiLCJlbnRpdHlSZXNvbHZlcnMiLCJjcmVhdGVFbnRpdHlSZXNvbHZlcnMiLCJyZXNvbHZlcnMiLCJyZWdpc3RlclN0b3JlIiwicmVkdWNlciIsImFjdGlvbnMiLCJTQ0hFTUFfS0VZIiwic291cmNlIiwiTU9ERUxfTkFNRVMiLCJzY2hlbWFNZXRob2ROYW1lIiwiZmFjdG9yeU1ldGhvZE5hbWUiLCJzdGF0ZSIsImdldFNjaGVtYUZvck1vZGVsIiwiZ2V0RmFjdG9yeUZvck1vZGVsIiwiREVGQVVMVF9TVEFURV9TQ0hFTUEiLCJmcm9tSlMiLCJERUZBVUxUX1NDSEVNQV9TVEFURSIsIkRFRkFVTFRfU1RBVEVfRkFDVE9SWSIsIkRFRkFVTFRfU1RBVEVfRU5EUE9JTlRTIiwicmVsYXRpb25FbmRwb2ludHMiLCJERUZBVUxUX1NUQVRFX1JFTEFUSU9OUyIsInJlY2VpdmVTY2hlbWEiLCJhY3Rpb24iLCJzaW5ndWxhck1vZGVsTmFtZSIsImlzU2NoZW1hUmVzcG9uc2VPZk1vZGVsIiwiZSIsInJlY2VpdmVGYWN0b3J5IiwiaXNNb2RlbEVudGl0eUZhY3RvcnlPZk1vZGVsIiwicmVjZWl2ZVJlbGF0aW9uRW5kcG9pbnRGb3JFbnRpdHkiLCJzZXRJbiIsImlzU2hhbGxvd0VxdWFsIiwiZ2V0SW4iLCJjb21iaW5lUmVkdWNlcnMiLCJnZXRSZWxhdGlvbkVuZHBvaW50Rm9yRW50aXR5SWQiLCJnZXRSZWxhdGlvblByaW1hcnlLZXlTdHJpbmciLCJnZXRSZWxhdGlvblJlc3BvbnNlVHlwZSIsImhhc0pvaW5UYWJsZVJlbGF0aW9uIiwiZ2V0UmVsYXRpb25UeXBlIiwiaHlkcmF0ZVJlbGF0aW9uU2NoZW1hIiwiZ2V0UmVsYXRpb25TY2hlbWEiLCJwYXRoIiwiZ2V0RW5kcG9pbnQiLCJtZXRob2QiLCJjcmVhdGVFbnRpdHlGYWN0b3J5IiwiTU9ERUxfUFJFRklYRVMiLCJyZWxhdGlvbk1vZGVsTmFtZSIsInBsdXJhbFJlbGF0aW9uTmFtZSIsImlzTW9kZWxFbnRpdHkiLCJzdHJpcEJhc2VSb3V0ZUZyb21VcmwiLCJyZXNvdXJjZUxpbmsiLCJyZXNwb25zZSIsIl9saW5rcyIsImxpbmtzIiwiYmFzZVJlbGF0aW9uUGF0aCIsInJlbGF0aW9uVHlwZSIsInJlbGF0aW9uUHJpbWFyeUtleSIsImdldFByaW1hcnlLZXkiLCJtb2RlbE5hbWVGb3JRdWVyeVN0cmluZyIsImluZGV4T2YiLCJyZWxhdGlvbl90eXBlIiwiRXJyb3IiLCJ0eXBlU2NoZW1hIiwiaGFzT3duUHJvcGVydHkiLCJwcm9wZXJ0aWVzIiwiaXNVbmRlZmluZWQiLCJpc1JlcXVlc3RpbmdTY2hlbWFGb3JNb2RlbCIsImhhc1Jlc29sdmVkU2NoZW1hRm9yTW9kZWwiLCJpc1JlcXVlc3RpbmdGYWN0b3J5Rm9yTW9kZWwiLCJoYXNSZXNvbHZlZEZhY3RvcnlGb3JNb2RlbCIsImlzUmVxdWVzdGluZ1JlbGF0aW9uRW5kcG9pbnRGb3JFbnRpdHlJZCIsImNyZWF0ZVNlbGVjdG9yIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Es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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFVBQVU7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyxLQUFLO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSwrRUFBK0U7QUFDL0U7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG9CQUFvQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsU0FBUztBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0NBQStDLHVDQUF1QztBQUN0RjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkNBQTZDLGtEQUFrRDtBQUMvRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpREFBaUQseUJBQXlCLEVBQUU7QUFDNUU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5REFBeUQsRUFBRTtBQUMvRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLHlCQUF5QixFQUFFO0FBQ3pFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG1CQUFtQjtBQUN0RDtBQUNBLDBEQUEwRDtBQUMxRCx5Q0FBeUMsNkJBQTZCO0FBQ3RFO0FBQ0E7QUFDQSxxQ0FBcUMsaUNBQWlDO0FBQ3RFLDBDQUEwQyw0QkFBNEI7QUFDdEU7QUFDQTtBQUNBOztBQUVBLGlEQUFpRCxtQ0FBbUMsRUFBRTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsNEJBQTRCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsK0RBQStELEVBQUU7QUFDM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxtQkFBbUI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDBCQUEwQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsOERBQThEO0FBQ3BILHlDQUF5QyxpREFBaUQ7QUFDMUYsZ0RBQWdELG1DQUFtQztBQUNuRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVFQUF1RSxFQUFFO0FBQ2hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEUsY0FBYyxFQUFFO0FBQzVGLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw2REFBNkQ7QUFDakY7QUFDQSxHQUFHO0FBQ0g7QUFDQSxvQ0FBb0MsdUNBQXVDLEVBQUU7QUFDN0U7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsNkVBQTZFO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwwQkFBMEIscUJBQXFCLEVBQUU7O0FBRWpEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix1REFBdUQsRUFBRTtBQUNuRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQiw4Q0FBOEMsRUFBRTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsK0RBQStELEVBQUU7QUFDM0Y7QUFDQTtBQUNBLGdDQUFnQyw4Q0FBOEMsRUFBRTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNDQUFzQyxFQUFFO0FBQ3BFLCtCQUErQixxREFBcUQsRUFBRTtBQUN0RjtBQUNBO0FBQ0EsNENBQTRDLCtDQUErQyxFQUFFO0FBQzdGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0RBQW9ELGVBQWUsRUFBRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNFQUFzRTtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsaUJBQWlCLEVBQUU7QUFDL0Qsb0RBQW9ELGVBQWUsRUFBRSw2QkFBNkIsZUFBZSxFQUFFO0FBQ25IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELGdCQUFnQixFQUFFO0FBQ3JFO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFVBQVU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsd0JBQXdCO0FBQzNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFVBQVU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxVQUFVO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsV0FBVztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsZ0JBQWdCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxnQkFBZ0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGVBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxzQkFBc0IsRUFBRTtBQUNsRSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdDQUF3QyxLQUFLO0FBQzdDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLGdEQUFnRCxFQUFFO0FBQzFFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQseUNBQXlDLEVBQUU7QUFDOUY7QUFDQTtBQUNBLCtCQUErQixpQkFBaUIsRUFBRTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIseUJBQXlCLEVBQUU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLG1CQUFtQixFQUFFO0FBQzVELFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDLEtBQUs7QUFDdEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHdDQUF3QywwQkFBMEIsRUFBRTtBQUNwRSxxQ0FBcUMsdUJBQXVCLEVBQUU7QUFDOUQsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMscUJBQXFCLEVBQUU7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUJBQW1CO0FBQ3pDLDhEQUE4RCx1QkFBdUIsRUFBRTtBQUN2RjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLCtCQUErQixFQUFFO0FBQ3hFO0FBQ0E7QUFDQSx3Q0FBd0MsNkJBQTZCLEVBQUU7QUFDdkU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsK0JBQStCLEVBQUU7QUFDeEU7QUFDQTtBQUNBLHNDQUFzQyw2QkFBNkIsRUFBRTtBQUNyRTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTZDLHlCQUF5QixFQUFFO0FBQ3hFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0EsdUNBQXVDLCtCQUErQixFQUFFO0FBQ3hFLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLCtFQUErRSxhQUFhLEVBQUU7QUFDOUYsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsMkJBQTJCO0FBQzNFO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLHdDQUF3QywyQkFBMkIsRUFBRTtBQUNyRSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsNkJBQTZCLEVBQUU7QUFDdkUsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsMENBQTBDLCtCQUErQixFQUFFO0FBQzNFLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDJEQUEyRCxFQUFFO0FBQzNGO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsMkNBQTJDLEVBQUU7QUFDM0U7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELCtDQUErQzs7QUFFNUc7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsc0JBQXNCLEVBQUU7QUFDN0QsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwREFBMEQ7QUFDMUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLG1CQUFtQixFQUFFO0FBQzVELFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdDQUF3QyxLQUFLO0FBQzdDOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxrQ0FBa0MsU0FBUztBQUMzQztBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMERBQTBELDJCQUEyQixFQUFFO0FBQ3ZGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsMkVBQTJFO0FBQzNFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsMkRBQTJEO0FBQ25HO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Ozs7QUNBdkQsYUFBYSw2Q0FBNkMsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E1RCxhQUFhLHlDQUF5QyxFQUFFLEk7Ozs7Ozs7Ozs7O0FDQXhELGFBQWEscUNBQXFDLEVBQUUsSTs7Ozs7Ozs7Ozs7QUNBcEQsYUFBYSwrQ0FBK0MsRUFBRSxJOzs7Ozs7Ozs7OztBQ0E5RCxhQUFhLGlDQUFpQyxFQUFFLEkiLCJmaWxlIjoiZXZlbnRlc3ByZXNzby1tb2RlbC1zY2hlbWEuZjNmOTE1YzgzMDJlMjMxMDczOTEuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL3NyYy9kYXRhL2V2ZW50ZXNwcmVzc28vc2NoZW1hL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCBhcGlGZXRjaCBmcm9tICdAd29yZHByZXNzL2FwaS1mZXRjaCc7XG5pbXBvcnQge1xuXHRzZWxlY3QgYXMgc2VsZWN0RGF0YSxcblx0ZGlzcGF0Y2ggYXMgZGlzcGF0Y2hEYXRhLFxuXHRzdWJzY3JpYmUsXG59IGZyb20gJ0B3b3JkcHJlc3MvZGF0YSc7XG5pbXBvcnQgeyBwbHVyYWxNb2RlbE5hbWUgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9tb2RlbCc7XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBSRURVQ0VSX0tFWSBhcyBDT1JFX1JFRFVDRVJfS0VZIH0gZnJvbSAnLi9jb3JlL2NvbnN0YW50cyc7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYWN0aW9uIG9iamVjdCBmb3IgYSBmZXRjaCBjb250cm9sLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gKiBAcmV0dXJuIHt7XG4gKiAgICAgIHR5cGU6IHN0cmluZyxcbiAqICAgICAgcmVxdWVzdDogT2JqZWN0XG4gKiB9fVxuICogQW4gYWN0aW9uIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2goIHJlcXVlc3QgKSB7XG5cdHJldHVybiB7XG5cdFx0dHlwZTogJ0ZFVENIX0ZST01fQVBJJyxcblx0XHRyZXF1ZXN0LFxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFjdGlvbiBvYmplY3QgZm9yIGEgc2VsZWN0IGNvbnRyb2wuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZHVjZXJLZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3Rvck5hbWVcbiAqIEBwYXJhbSB7Li4uQXJyYXl8Ym9vbGVhbnxudW1iZXJ8T2JqZWN0fHN0cmluZ30gYXJnc1xuICogQHJldHVybiB7e1xuICogICAgICB0eXBlOiBzdHJpbmcsXG4gKiAgICAgIHJlZHVjZXJLZXk6IHN0cmluZyxcbiAqICAgICAgc2VsZWN0b3JOYW1lOiBzdHJpbmcsXG4gKiAgICAgIGFyZ3M6IC4uLkFycmF5fGJvb2xlYW58bnVtYmVyfE9iamVjdHxzdHJpbmdcbiAqIH19XG4gKiBSZXR1cm5zIGFuIGFjdGlvbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3QoIHJlZHVjZXJLZXksIHNlbGVjdG9yTmFtZSwgLi4uYXJncyApIHtcblx0cmV0dXJuIHtcblx0XHR0eXBlOiAnU0VMRUNUJyxcblx0XHRyZWR1Y2VyS2V5LFxuXHRcdHNlbGVjdG9yTmFtZSxcblx0XHRhcmdzLFxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFjdGlvbiBvYmplY3QgZm9yIHJlc29sdmluZyBhIHNlbGVjdG9yIHRoYXQgaGFzIGEgcmVzb2x2ZXIuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZHVjZXJLZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3Rvck5hbWVcbiAqIEBwYXJhbSB7Li4uQXJyYXl8Ym9vbGVhbnxudW1iZXJ8T2JqZWN0fHN0cmluZ30gYXJnc1xuICogQHJldHVybiB7T2JqZWN0fSBBbiBhY3Rpb24gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVNlbGVjdCggcmVkdWNlcktleSwgc2VsZWN0b3JOYW1lLCAuLi5hcmdzICkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6ICdSRVNPTFZFX1NFTEVDVCcsXG5cdFx0cmVkdWNlcktleSxcblx0XHRzZWxlY3Rvck5hbWUsXG5cdFx0YXJncyxcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhY3Rpb24gb2JqZWN0IGZvciBhIGRpc3BhdGNoIGNvbnRyb2wuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZHVjZXJLZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXNwYXRjaE5hbWVcbiAqIEBwYXJhbSB7Li4uQXJyYXl8Ym9vbGVhbnxudW1iZXJ8T2JqZWN0fHN0cmluZ30gYXJnc1xuICogQHJldHVybiB7e1xuICogICAgICB0eXBlOiBzdHJpbmcsXG4gKiAgICAgIHJlZHVjZXJLZXk6IHN0cmluZyxcbiAqICAgICAgZGlzcGF0Y2hOYW1lOiBzdHJpbmcsXG4gKiAgICAgIGFyZ3M6IC4uLkFycmF5fGJvb2xlYW58bnVtYmVyfE9iamVjdHxzdHJpbmdcbiAqIH19XG4gKiBBbiBhY3Rpb24gb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaCggcmVkdWNlcktleSwgZGlzcGF0Y2hOYW1lLCAuLi5hcmdzICkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6ICdESVNQQVRDSCcsXG5cdFx0cmVkdWNlcktleSxcblx0XHRkaXNwYXRjaE5hbWUsXG5cdFx0YXJncyxcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhY3Rpb24gb2JqZWN0IGZvciBhIHJlc29sdmUgZGlzcGF0Y2ggY29udHJvbFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWR1Y2VyS2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gZGlzcGF0Y2hOYW1lXG4gKiBAcGFyYW0gey4uLkFycmF5fGJvb2xlYW58bnVtYmVyfE9iamVjdHxzdHJpbmd9IGFyZ3NcbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIGFjdGlvbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlRGlzcGF0Y2goIHJlZHVjZXJLZXksIGRpc3BhdGNoTmFtZSwgLi4uYXJncyApIHtcblx0cmV0dXJuIHtcblx0XHR0eXBlOiAnUkVTT0xWRV9ESVNQQVRDSCcsXG5cdFx0cmVkdWNlcktleSxcblx0XHRkaXNwYXRjaE5hbWUsXG5cdFx0YXJncyxcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhY3Rpb24gb2JqZWN0IGZvciByZXNvbHZpbmcgdGhlIGdldEVudGl0eUJ5SWQgc2VsZWN0b3JcbiAqIGZvciBhbGwgdGhlIGdpdmVuIGlkcyBvbiB0aGUgZ2l2ZW4gbW9kZWxcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge0FycmF5fSBlbnRpdHlJZHNcbiAqIEByZXR1cm4ge09iamVjdH0gQW4gYWN0aW9uIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUdldEVudGl0eUJ5SWRGb3JJZHMoIG1vZGVsTmFtZSwgZW50aXR5SWRzICkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6ICdSRVNPTFZFX0dFVF9FTlRJVFlfQllfSURfRk9SX0lEUycsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdGVudGl0eUlkcyxcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhY3Rpb24gb2JqZWN0IGZvciByZXNvbHZpbmcgdGhlIGdldFJlbGF0ZWRFbnRpdGllcyBzZWxlY3RvclxuICogb24gdGhlIGV2ZW50ZXNwcmVzc28vY29yZSBzdG9yZSBmb3IgdGhlIGdpdmVuIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0ge0Jhc2VFbnRpdHl8T2JqZWN0fSBlbnRpdHlcbiAqIEBwYXJhbSB7TWFwfSByZWxhdGlvbkVudGl0aWVzXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IHJlbGF0aW9uSWRzXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIGFjdGlvbiBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVHZXRSZWxhdGVkRW50aXRpZXMoXG5cdGVudGl0eSxcblx0cmVsYXRpb25FbnRpdGllcyxcblx0cmVsYXRpb25JZHNcbikge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6ICdSRVNPTFZFX0dFVF9SRUxBVEVEX0VOVElUSUVTJyxcblx0XHRlbnRpdHksXG5cdFx0cmVsYXRpb25FbnRpdGllcyxcblx0XHRyZWxhdGlvbklkcyxcblx0fTtcbn1cblxuY29uc3QgY29udHJvbHMgPSB7XG5cdEZFVENIX0ZST01fQVBJKCB7IHJlcXVlc3QgfSApIHtcblx0XHQvLyByZXR1cm4ge307XG5cdFx0cmV0dXJuIGFwaUZldGNoKCByZXF1ZXN0ICk7XG5cdH0sXG5cdFNFTEVDVCggeyByZWR1Y2VyS2V5LCBzZWxlY3Rvck5hbWUsIGFyZ3MgfSApIHtcblx0XHRyZXR1cm4gc2VsZWN0RGF0YSggcmVkdWNlcktleSApWyBzZWxlY3Rvck5hbWUgXSggLi4uYXJncyApO1xuXHR9LFxuXHRESVNQQVRDSCggeyByZWR1Y2VyS2V5LCBkaXNwYXRjaE5hbWUsIGFyZ3MgfSApIHtcblx0XHRyZXR1cm4gZGlzcGF0Y2hEYXRhKCByZWR1Y2VyS2V5IClbIGRpc3BhdGNoTmFtZSBdKCAuLi5hcmdzICk7XG5cdH0sXG5cdGFzeW5jIFJFU09MVkVfRElTUEFUQ0goIHsgcmVkdWNlcktleSwgZGlzcGF0Y2hOYW1lLCBhcmdzIH0gKSB7XG5cdFx0cmV0dXJuIGF3YWl0IGRpc3BhdGNoRGF0YSggcmVkdWNlcktleSApWyBkaXNwYXRjaE5hbWUgXSggLi4uYXJncyApO1xuXHR9LFxuXHRSRVNPTFZFX1NFTEVDVCggeyByZWR1Y2VyS2V5LCBzZWxlY3Rvck5hbWUsIGFyZ3MgfSApIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSApID0+IHtcblx0XHRcdGNvbnN0IGhhc0ZpbmlzaGVkID0gKCkgPT4gc2VsZWN0RGF0YSggJ2NvcmUvZGF0YScgKVxuXHRcdFx0XHQuaGFzRmluaXNoZWRSZXNvbHV0aW9uKCByZWR1Y2VyS2V5LCBzZWxlY3Rvck5hbWUsIGFyZ3MgKTtcblx0XHRcdGNvbnN0IGdldFJlc3VsdCA9ICgpID0+IHNlbGVjdERhdGEoIHJlZHVjZXJLZXkgKVsgc2VsZWN0b3JOYW1lIF1cblx0XHRcdFx0LmFwcGx5KCBudWxsLCBhcmdzICk7XG5cblx0XHRcdC8vIHRyaWdnZXIgdGhlIHNlbGVjdG9yICh0byB0cmlnZ2VyIHRoZSByZXNvbHZlcilcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGdldFJlc3VsdCgpO1xuXHRcdFx0aWYgKCBoYXNGaW5pc2hlZCgpICkge1xuXHRcdFx0XHRyZXR1cm4gcmVzb2x2ZSggcmVzdWx0ICk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHVuc3Vic2NyaWJlID0gc3Vic2NyaWJlKCAoKSA9PiB7XG5cdFx0XHRcdGlmICggaGFzRmluaXNoZWQoKSApIHtcblx0XHRcdFx0XHR1bnN1YnNjcmliZSgpO1xuXHRcdFx0XHRcdHJlc29sdmUoIGdldFJlc3VsdCgpICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9ICk7XG5cdH0sXG5cdFJFU09MVkVfR0VUX0VOVElUWV9CWV9JRF9GT1JfSURTKCB7IG1vZGVsTmFtZSwgZW50aXR5SWRzIH0gKSB7XG5cdFx0d2hpbGUgKCBlbnRpdHlJZHMubGVuZ3RoID4gMCApIHtcblx0XHRcdGRpc3BhdGNoRGF0YShcblx0XHRcdFx0J2NvcmUvZGF0YScsXG5cdFx0XHRcdCdmaW5pc2hSZXNvbHV0aW9uJyxcblx0XHRcdFx0Q09SRV9SRURVQ0VSX0tFWSxcblx0XHRcdFx0J2dldEVudGl0eUJ5SWQnLFxuXHRcdFx0XHRbIG1vZGVsTmFtZSwgZW50aXR5SWRzLnBvcCgpIF1cblx0XHRcdCk7XG5cdFx0fVxuXHR9LFxuXHRSRVNPTFZFX0dFVF9SRUxBVEVEX0VOVElUSUVTKCB7IGVudGl0eSwgcmVsYXRpb25FbnRpdGllcywgcmVsYXRpb25JZHMgfSApIHtcblx0XHR3aGlsZSAoIHJlbGF0aW9uSWRzLmxlbmd0aCA+IDAgKSB7XG5cdFx0XHRjb25zdCByZWxhdGlvbkVudGl0eSA9IHJlbGF0aW9uRW50aXRpZXMuZ2V0KCByZWxhdGlvbklkcy5wb3AoKSApO1xuXHRcdFx0aWYgKCByZWxhdGlvbkVudGl0eSApIHtcblx0XHRcdFx0ZGlzcGF0Y2hEYXRhKFxuXHRcdFx0XHRcdCdjb3JlL2RhdGEnLFxuXHRcdFx0XHRcdCdmaW5pc2hSZXNvbHV0aW9uJyxcblx0XHRcdFx0XHRDT1JFX1JFRFVDRVJfS0VZLFxuXHRcdFx0XHRcdCdnZXRSZWxhdGVkRW50aXRpZXMnLFxuXHRcdFx0XHRcdFsgcmVsYXRpb25FbnRpdHksIHBsdXJhbE1vZGVsTmFtZSggZW50aXR5Lm1vZGVsTmFtZSApIF1cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb250cm9scztcbiIsIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHVwcGVyRmlyc3QsIGNhbWVsQ2FzZSwgcmVkdWNlLCBpc01hcCwgaXNOYU4gfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHBsdXJhbGl6ZSBmcm9tICdwbHVyYWxpemUnO1xuaW1wb3J0IHsgbWFwUmVkdWNlciB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2hlbHBlcnMnO1xuXG4vKipcbiAqIEEgaGVscGVyIGZvciBnZXR0aW5nIGEgbWV0aG9kIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gc3VmZml4XG4gKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZVBsdXJhbFxuICogQHJldHVybiB7c3RyaW5nfSBSZXR1cm5zIGEgbmFtZSBmb3IgYSBtZXRob2QuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRNZXRob2ROYW1lID0gKFxuXHRtb2RlbE5hbWUsXG5cdHN1ZmZpeCA9ICcnLFxuXHRwcmVmaXggPSAnZ2V0Jyxcblx0dXNlUGx1cmFsID0gZmFsc2VcbikgPT4ge1xuXHRtb2RlbE5hbWUgPSB1c2VQbHVyYWwgPyBwbHVyYWxpemUoIG1vZGVsTmFtZSApIDogbW9kZWxOYW1lO1xuXHRyZXR1cm4gcHJlZml4ICsgdXBwZXJGaXJzdCggY2FtZWxDYXNlKCBtb2RlbE5hbWUgKyB1cHBlckZpcnN0KCBzdWZmaXggKSApICk7XG59O1xuXG4vKipcbiAqIEdpdmVuIGEgY29sbGVjdGlvbiBvZiBleGlzdGluZyBlbnRpdGllcyBhbmQgYSBjb2xsZWN0aW9uIG9mIGluY29taW5nXG4gKiBlbnRpdGllcywgdGhpcyByZXR1cm5zIGEgbWVyZ2VkIG9iamVjdCB3aXRoIHByZWZlcmVuY2UgZ2l2ZW4gdG8gY29tbW9uXG4gKiBlbnRpdGllcyBmcm9tIHRoZSBleGlzdGluZ0VudGl0aWVzIGNvbGxlY3Rpb24uXG4gKlxuICogSW5jb21pbmcgY29sbGVjdGlvbnMgY2FuIGJlIE1hcHMgb3IgcGxhaW4gb2JqZWN0cy5cbiAqXG4gKiBOb3RlIGlmIGluY29taW5nRW50aXRpZXMgaXMgYSBNYXAsIHRoZSBPUkRFUiBvZiB0aGUgbWFwIHdpbGwgYmUgcHJlc2VydmVkXG4gKiBldmVuIGlmIHRoZSB2YWx1ZXMgb2YgZW50aXRpZXMgaW4gdGhlIG1hcCBhcmUgcmVwbGFjZWQgYnkgdmFsdWVzIGZyb21cbiAqIGV4aXN0aW5nIGVudGl0aWVzLlxuICpcbiAqIEBwYXJhbSB7TWFwfE9iamVjdH0gZXhpc3RpbmdFbnRpdGllc1xuICogQHBhcmFtIHtNYXB8T2JqZWN0fSBpbmNvbWluZ0VudGl0aWVzXG4gKiBAcmV0dXJuIHtNYXB9IEEgbmV3IGNvbGxlY3Rpb24gb2YgZW50aXRpZXMuIE5vdGUgaWYgZXhpc3RpbmcgZW50aXRpZXMgY2FtZSBpblxuICogYXMgYSBwbGFpbiBvYmplY3QsIHRoaXMgcmV0dXJucyBhIE1hcC5cbiAqL1xuZXhwb3J0IGNvbnN0IGtlZXBFeGlzdGluZ0VudGl0aWVzSW5PYmplY3QgPSAoXG5cdGV4aXN0aW5nRW50aXRpZXMsXG5cdGluY29taW5nRW50aXRpZXMsXG4pID0+IHtcblx0Y29uc3QgZ2V0RXhpc3RpbmdPckRlZmF1bHRFbnRpdHkgPSAoIGRlZmF1bHRFbnRpdHksIGVudGl0eUlkICkgPT4ge1xuXHRcdGlmICggaXNNYXAoIGV4aXN0aW5nRW50aXRpZXMgKSAmJiBleGlzdGluZ0VudGl0aWVzLmhhcyggZW50aXR5SWQgKSApIHtcblx0XHRcdHJldHVybiBleGlzdGluZ0VudGl0aWVzLmdldCggZW50aXR5SWQgKTtcblx0XHR9XG5cdFx0cmV0dXJuIGV4aXN0aW5nRW50aXRpZXNbIGVudGl0eUlkIF0gfHwgZGVmYXVsdEVudGl0eTtcblx0fTtcblx0Y29uc3QgcmVkdWNlQ2FsbGJhY2sgPSAoIG1hcHBlZCwgZW50aXR5LCBlbnRpdHlJZCApID0+IHtcblx0XHRlbnRpdHlJZCA9IG5vcm1hbGl6ZUVudGl0eUlkKCBlbnRpdHlJZCApO1xuXHRcdG1hcHBlZC5zZXQoIGVudGl0eUlkLCBnZXRFeGlzdGluZ09yRGVmYXVsdEVudGl0eSggZW50aXR5LCBlbnRpdHlJZCApICk7XG5cdFx0cmV0dXJuIG1hcHBlZDtcblx0fTtcblx0cmV0dXJuIGlzTWFwKCBpbmNvbWluZ0VudGl0aWVzICkgP1xuXHRcdG1hcFJlZHVjZXIoIGluY29taW5nRW50aXRpZXMsIHJlZHVjZUNhbGxiYWNrLCBuZXcgTWFwKCkgKSA6XG5cdFx0cmVkdWNlKCBpbmNvbWluZ0VudGl0aWVzLCByZWR1Y2VDYWxsYmFjaywgbmV3IE1hcCgpICk7XG59O1xuXG4vKipcbiAqIFRoaXMgbm9ybWFsaXplcyBudW1lcmljIHZhbHVlcyB0byBpbnRlZ2VyIG51bWJlcnMgYW5kIGxlYXZlcyBub24gbnVtZXJpY1xuICogdmFsdWVzIGFsb25lLlxuICpcbiAqIEBwYXJhbSB7Kn0gZW50aXR5SWRcbiAqIEByZXR1cm4geyp9IE5vcm1hbGl6ZWQgdmFsdWVcbiAqL1xuY29uc3Qgbm9ybWFsaXplRW50aXR5SWQgPSAoIGVudGl0eUlkICkgPT4ge1xuXHRjb25zdCBvcmlnaW5hbElkID0gZW50aXR5SWQ7XG5cdGVudGl0eUlkID0gcGFyc2VJbnQoIGVudGl0eUlkLCAxMCApO1xuXHRyZXR1cm4gaXNOYU4oIGVudGl0eUlkICkgPyBvcmlnaW5hbElkIDogZW50aXR5SWQ7XG59O1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgc2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcblxuLyoqXG4gKiBJbnZva2VzIHRoZSBzZWxlY3RvciBmb3Igd2hldGhlciBhIGdpdmVuIHNlbGVjdG9yTmFtZSBpbiBhIGdpdmVuIHJlZ2lzdGVyZWRcbiAqIHJlZHVjZXIgc3RvcmUgaXMgaW4gdGhlIG1pZHN0IG9mIHJlc29sdmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSByZWR1Y2VyS2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JOYW1lXG4gKiBAcGFyYW0geypbXX0gYXJnc1xuICogQHJldHVybiB7Ym9vbGVhbn0gIFdoZXRoZXIgcmVzb2x1dGlvbiBpcyBpbiBwcm9ncmVzcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzUmVzb2x2aW5nID0gKCByZWR1Y2VyS2V5LCBzZWxlY3Rvck5hbWUsIC4uLmFyZ3MgKSA9PiB7XG5cdHJldHVybiBzZWxlY3QoICdjb3JlL2RhdGEnICkuaXNSZXNvbHZpbmcoIHJlZHVjZXJLZXksIHNlbGVjdG9yTmFtZSwgYXJncyApO1xufTtcblxuLyoqXG4gKiBJbnZva2VzIHRoZSBzZWxlY3RvciBmb3Igd2hldGhlciBhIGdpdmVuIHNlbGVjdG9yTmFtZSBpbiBhIGdpdmVuIHJlZ2lzdGVyZWRcbiAqIHJlZHVjZXIgc3RvcmUgaGFzIGZpbmlzaGVkIHJlc29sdmluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVkdWNlcktleVxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yTmFtZVxuICogQHBhcmFtIHsqW119IGFyZ3NcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgcmVzb2x1dGlvbiBoYXMgY29tcGxldGVkLlxuICovXG5leHBvcnQgY29uc3QgaGFzRmluaXNoZWRSZXNvbHZpbmcgPSAoIHJlZHVjZXJLZXksIHNlbGVjdG9yTmFtZSwgLi4uYXJncyApID0+IHtcblx0cmV0dXJuIHNlbGVjdCggJ2NvcmUvZGF0YScgKVxuXHRcdC5oYXNGaW5pc2hlZFJlc29sdXRpb24oIHJlZHVjZXJLZXksIHNlbGVjdG9yTmFtZSwgYXJncyApO1xufTtcbiIsImV4cG9ydCBjb25zdCBSRURVQ0VSX0tFWSA9ICdldmVudGVzcHJlc3NvL2NvcmUnO1xuZXhwb3J0IGNvbnN0IFRZUEVfUVVFVUVfUkVMQVRJT05fREVMRVRFID0gJ2RlbGV0ZSc7XG5leHBvcnQgY29uc3QgVFlQRV9RVUVVRV9SRUxBVElPTl9BREQgPSAnYWRkJztcbiIsImV4cG9ydCBjb25zdCBBQ1RJT05fVFlQRVMgPSB7XG5cdFJFQ0VJVkVfU0NIRU1BX1JFQ09SRDogJ1JFQ0VJVkVfU0NIRU1BX1JFQ09SRCcsXG5cdFJFQ0VJVkVfRkFDVE9SWV9GT1JfTU9ERUw6ICdSRUNFSVZFX0ZBQ1RPUllfRk9SX01PREVMJyxcblx0UkVDRUlWRV9SRUxBVElPTl9FTkRQT0lOVF9GT1JfTU9ERUxfRU5USVRZOlxuXHRcdCdSRUNFSVZFX1JFTEFUSU9OX0VORFBPSU5UX0ZPUl9NT0RFTF9FTlRJVFknLFxuXHRSRUNFSVZFX1JFTEFUSU9OX1NDSEVNQTogJ1JFQ0VJVkVfUkVMQVRJT05fU0NIRU1BJyxcbn07XG4iLCIvKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgQUNUSU9OX1RZUEVTIGFzIHR5cGVzIH0gZnJvbSAnLi9hY3Rpb24tdHlwZXMnO1xuaW1wb3J0IHtcblx0UkVEVUNFUl9LRVkgYXMgU0NIRU1BX1JFRFVDRVJfS0VZLFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBkaXNwYXRjaCB9IGZyb20gJy4uL2Jhc2UtY29udHJvbHMnO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYWN0aW9uIG9iamVjdCB1c2VkIHRvIHVwZGF0ZSB0aGUgc3RvcmUgd2l0aCB0aGUgcHJvdmlkZWQgc2NoZW1hXG4gKiBmb3IgdGhlIHByb3ZpZGVkIG1vZGVsTmFtZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHt7dHlwZTogc3RyaW5nLCBtb2RlbE5hbWU6ICosIHNjaGVtYX19ICBUaGUgYWN0aW9uIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY2VpdmVTY2hlbWFGb3JNb2RlbCggbW9kZWxOYW1lLCBzY2hlbWEgPSB7fSApIHtcblx0cmV0dXJuIHtcblx0XHR0eXBlOiB0eXBlcy5SRUNFSVZFX1NDSEVNQV9SRUNPUkQsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdHNjaGVtYSxcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uKiByZWNlaXZlU2NoZW1hRm9yTW9kZWxBbmRSZXNvbHZlKCBtb2RlbE5hbWUsIHNjaGVtYSA9IHt9ICkge1xuXHR5aWVsZCBkaXNwYXRjaChcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J3JlY2VpdmVTY2hlbWFGb3JNb2RlbCcsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdHNjaGVtYVxuXHQpO1xuXHR5aWVsZCBkaXNwYXRjaChcblx0XHQnY29yZS9kYXRhJyxcblx0XHQnZmluaXNoUmVzb2x1dGlvbicsXG5cdFx0U0NIRU1BX1JFRFVDRVJfS0VZLFxuXHRcdCdnZXRTY2hlbWFGb3JNb2RlbCcsXG5cdFx0WyBtb2RlbE5hbWUudG9Mb3dlckNhc2UoKSBdXG5cdCk7XG5cdHJldHVybiBzY2hlbWE7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhY3Rpb24gb2JqZWN0IHVzZWQgdG8gdXBkYXRlIHRoZSBzdG9yZSB3aXRoIHRoZSBwcm92aWRlZCBtb2RlbFxuICogZW50aXR5IGZhY3RvcnkgZm9yIHRoZSBwcm92aWRlZCBtb2RlbE5hbWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGZhY3RvcnlcbiAqIEByZXR1cm4ge3t0eXBlOiBzdHJpbmcsIG1vZGVsTmFtZTogc3RyaW5nLCBmYWN0b3J5OiBPYmplY3R9fSBBbiBhY3Rpb25cbiAqIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY2VpdmVGYWN0b3J5Rm9yTW9kZWwoIG1vZGVsTmFtZSwgZmFjdG9yeSA9IHt9ICkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6IHR5cGVzLlJFQ0VJVkVfRkFDVE9SWV9GT1JfTU9ERUwsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdGZhY3RvcnksXG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiogcmVjZWl2ZUZhY3RvcnlGb3JNb2RlbEFuZFJlc29sdmUoIG1vZGVsTmFtZSwgZmFjdG9yeSA9IHt9ICkge1xuXHR5aWVsZCBkaXNwYXRjaChcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J3JlY2VpdmVGYWN0b3J5Rm9yTW9kZWwnLFxuXHRcdG1vZGVsTmFtZSxcblx0XHRmYWN0b3J5XG5cdCk7XG5cdHlpZWxkIGRpc3BhdGNoKFxuXHRcdCdjb3JlL2RhdGEnLFxuXHRcdCdmaW5pc2hSZXNvbHV0aW9uJyxcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J2dldEZhY3RvcnlGb3JNb2RlbCcsXG5cdFx0WyBtb2RlbE5hbWUudG9Mb3dlckNhc2UoKSBdXG5cdCk7XG5cdHJldHVybiBmYWN0b3J5O1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYWN0aW9uIG9iamVjdCB1c2VkIHRvIHVwZGF0ZSB0aGUgc3RvcmUgd2l0aCB0aGUgcHJvdmlkZWQgcmVsYXRpb25cbiAqIGVuZHBvaW50IGZvciB0aGUgbW9kZWwgYW5kIGlkLCBhbmQgaXRzIHJlbGF0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge251bWJlcn0gZW50aXR5SWRcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbmRwb2ludFxuICogQHJldHVybiB7XG4gKiBcdHtcbiAqIFx0XHRtb2RlbE5hbWU6ICosXG4gKiBcdFx0ZW5kcG9pbnQ6ICosXG4gKiBcdFx0cmVsYXRpb25OYW1lOiAqLFxuICogXHRcdGVudGl0eUlkOiAqLFxuICogXHRcdHR5cGU6IHN0cmluZ1xuICogXHR9XG4gKiB9IEFuIGFjdGlvbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWNlaXZlUmVsYXRpb25FbmRwb2ludEZvck1vZGVsRW50aXR5KFxuXHRtb2RlbE5hbWUsXG5cdGVudGl0eUlkLFxuXHRyZWxhdGlvbk5hbWUsXG5cdGVuZHBvaW50XG4pIHtcblx0cmV0dXJuIHtcblx0XHR0eXBlOiB0eXBlcy5SRUNFSVZFX1JFTEFUSU9OX0VORFBPSU5UX0ZPUl9NT0RFTF9FTlRJVFksXG5cdFx0bW9kZWxOYW1lLFxuXHRcdGVudGl0eUlkLFxuXHRcdHJlbGF0aW9uTmFtZSxcblx0XHRlbmRwb2ludCxcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlY2VpdmVSZWxhdGlvblNjaGVtYShcblx0bW9kZWxOYW1lLFxuXHRyZWxhdGlvbk5hbWUsXG5cdHJlbGF0aW9uU2NoZW1hXG4pIHtcblx0cmV0dXJuIHtcblx0XHR0eXBlOiB0eXBlcy5SRUNFSVZFX1JFTEFUSU9OX1NDSEVNQSxcblx0XHRtb2RlbE5hbWUsXG5cdFx0cmVsYXRpb25OYW1lLFxuXHRcdHJlbGF0aW9uU2NoZW1hLFxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24qIHJlY2VpdmVSZWxhdGlvblNjaGVtYUFuZFJlc29sdmUoXG5cdG1vZGVsTmFtZSxcblx0cmVsYXRpb25OYW1lLFxuXHRyZWxhdGlvblNjaGVtYVxuKSB7XG5cdHlpZWxkIGRpc3BhdGNoKFxuXHRcdFNDSEVNQV9SRURVQ0VSX0tFWSxcblx0XHQncmVjZWl2ZVJlbGF0aW9uU2NoZW1hJyxcblx0XHRtb2RlbE5hbWUsXG5cdFx0cmVsYXRpb25OYW1lLFxuXHRcdHJlbGF0aW9uU2NoZW1hXG5cdCk7XG5cdHlpZWxkIGRpc3BhdGNoKFxuXHRcdCdjb3JlL2RhdGEnLFxuXHRcdCdmaW5pc2hSZXNvbHV0aW9uJyxcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J2dldFJlbGF0aW9uU2NoZW1hJyxcblx0XHRbIG1vZGVsTmFtZS50b0xvd2VyQ2FzZSgpLCByZWxhdGlvbk5hbWUgXVxuXHQpO1xufVxuIiwiLyoqXG4gKiBJZGVudGlmaWVyIGtleSBmb3IgdGhpcyBzdG9yZSByZWR1Y2VyLlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IFJFRFVDRVJfS0VZID0gJ2V2ZW50ZXNwcmVzc28vc2NoZW1hJztcblxuZXhwb3J0IGNvbnN0IEpPSU5fUkVMQVRJT05fVFlQRVMgPSBbXG5cdCdFRV9IQUJUTV9SZWxhdGlvbicsXG5cdCdFRV9IQUJUTV9BbnlfUmVsYXRpb24nLFxuXTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHJlZ2lzdGVyU3RvcmUgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBSRURVQ0VSX0tFWSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCAqIGFzIHNlbGVjdG9ycyBmcm9tICcuL3NlbGVjdG9ycyc7XG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyByZXNvbHZlcnMgZnJvbSAnLi9yZXNvbHZlcnMnO1xuaW1wb3J0IHJlZHVjZXIgZnJvbSAnLi9yZWR1Y2Vycyc7XG5pbXBvcnQgY29udHJvbHMgZnJvbSAnLi4vYmFzZS1jb250cm9scyc7XG5pbXBvcnQgeyBjcmVhdGVFbnRpdHlTZWxlY3RvcnMsIGNyZWF0ZUVudGl0eVJlc29sdmVycyB9IGZyb20gJy4vbW9kZWwnO1xuXG4vKipcbiAqIENyZWF0ZXMgc3BlY2lmaWMgbW9kZWwgZW50aXR5IHNlbGVjdG9ycyAoZ2V0RmFjdG9yeUZvckV2ZW50IGV0YylcbiAqXG4gKiBAdHlwZSB7T2JqZWN0PEZ1bmN0aW9uPn1cbiAqL1xuY29uc3QgZW50aXR5U2VsZWN0b3JzID0gY3JlYXRlRW50aXR5U2VsZWN0b3JzKCBzZWxlY3RvcnMgKTtcblxuLyoqXG4gKiBDcmVhdGVzIHNwZWNpZmljIG1vZGVsIGVudGl0eSByZXNvbHZlcnMgKGdldEZhY3RvcnlGb3JFdmVudCBldGMpXG4gKlxuICogQHR5cGUge09iamVjdDxGdW5jdGlvbj59XG4gKi9cbmNvbnN0IGVudGl0eVJlc29sdmVycyA9IGNyZWF0ZUVudGl0eVJlc29sdmVycyggcmVzb2x2ZXJzICk7XG5cbi8qKlxuICogUmVnaXN0cmF0aW9uIG9mIHN0b3JlIGZvciBldmVudGVzcHJlc3NvL3NjaGVtYS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgcmVnaXN0ZXJTdG9yZSggUkVEVUNFUl9LRVksIHtcblx0cmVkdWNlcixcblx0YWN0aW9ucyxcblx0Y29udHJvbHMsXG5cdHNlbGVjdG9yczogeyAuLi5zZWxlY3RvcnMsIC4uLmVudGl0eVNlbGVjdG9ycyB9LFxuXHRyZXNvbHZlcnM6IHsgLi4ucmVzb2x2ZXJzLCAuLi5lbnRpdHlSZXNvbHZlcnMgfSxcbn0gKTtcblxuZXhwb3J0IGNvbnN0IFNDSEVNQV9LRVkgPSBSRURVQ0VSX0tFWTtcblxuZXhwb3J0IHsgaHlkcmF0ZVJlbGF0aW9uU2NoZW1hIH0gZnJvbSAnLi9yZXNvbHZlcnMnO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgTU9ERUxfTkFNRVMgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9tb2RlbCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGdldE1ldGhvZE5hbWUgfSBmcm9tICcuLi9iYXNlLW1vZGVsJztcbmltcG9ydCB7IGlzUmVzb2x2aW5nIH0gZnJvbSAnLi4vYmFzZS1zZWxlY3RvcnMnO1xuaW1wb3J0IHsgUkVEVUNFUl9LRVkgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQ3JlYXRlcyBzZWxlY3RvcnMgZm9yIGVhY2ggcmVnaXN0ZXJlZCBtb2RlbCBuYW1lIHdyYXBwaW5nIHRoZSBnZW5lcmljIHNvdXJjZVxuICogc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGZ1bmN0aW9uPn0gc291cmNlXG4gKiBAcmV0dXJuIHtPYmplY3Q8ZnVuY3Rpb24+fSBBbGwgdGhlIGdlbmVyYXRlZCBzZWxlY3RvcnMgZm9yIGVhY2ggbW9kZWwuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVFbnRpdHlTZWxlY3RvcnMgPSAoIHNvdXJjZSApID0+IE1PREVMX05BTUVTLnJlZHVjZShcblx0KCBzZWxlY3RvcnMsIG1vZGVsTmFtZSApID0+IHtcblx0XHRjb25zdCBzY2hlbWFNZXRob2ROYW1lID0gZ2V0TWV0aG9kTmFtZSggbW9kZWxOYW1lLCAnc2NoZW1hJywgJ2dldCcgKTtcblx0XHRjb25zdCBmYWN0b3J5TWV0aG9kTmFtZSA9IGdldE1ldGhvZE5hbWUoIG1vZGVsTmFtZSwgJ2ZhY3RvcnknLCAnZ2V0JyApO1xuXHRcdHNlbGVjdG9yc1sgc2NoZW1hTWV0aG9kTmFtZSBdID0gKFxuXHRcdFx0c3RhdGVcblx0XHQpID0+IHNvdXJjZS5nZXRTY2hlbWFGb3JNb2RlbCggc3RhdGUsIG1vZGVsTmFtZSApO1xuXHRcdHNlbGVjdG9yc1sgZ2V0TWV0aG9kTmFtZSggbW9kZWxOYW1lLCAnc2NoZW1hJywgJ2lzUmVxdWVzdGluZycgKSBdID1cblx0XHRcdCgpID0+IGlzUmVzb2x2aW5nKCBSRURVQ0VSX0tFWSwgc2NoZW1hTWV0aG9kTmFtZSApO1xuXHRcdHNlbGVjdG9yc1sgZmFjdG9yeU1ldGhvZE5hbWUgXSA9IChcblx0XHRcdHN0YXRlXG5cdFx0KSA9PiBzb3VyY2UuZ2V0RmFjdG9yeUZvck1vZGVsKCBzdGF0ZSwgbW9kZWxOYW1lICk7XG5cdFx0c2VsZWN0b3JzWyBnZXRNZXRob2ROYW1lKCBtb2RlbE5hbWUsICdmYWN0b3J5JywgJ2lzUmVxdWVzdGluZycgKSBdID1cblx0XHRcdCgpID0+IGlzUmVzb2x2aW5nKCBSRURVQ0VSX0tFWSwgZmFjdG9yeU1ldGhvZE5hbWUgKTtcblx0XHRyZXR1cm4gc2VsZWN0b3JzO1xuXHR9LFxuXHR7fVxuKTtcblxuLyoqXG4gKiBDcmVhdGVzIHJlc29sdmVycyBmb3IgZWFjaCByZWdpc3RlcmVkIG1vZGVsIG5hbWUgd3JhcHBpbmcgdGhlIGdlbmVyaWMgc291cmNlXG4gKiByZXNvbHZlcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8ZnVuY3Rpb24+fSBzb3VyY2VcbiAqIEByZXR1cm4ge09iamVjdDxmdW5jdGlvbj59IEFsbCB0aGUgZ2VuZXJhdGVkIHJlc29sdmVycyBmb3IgZWFjaCBtb2RlbC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVudGl0eVJlc29sdmVycyA9ICggc291cmNlICkgPT4gTU9ERUxfTkFNRVMucmVkdWNlKFxuXHQoIHJlc29sdmVycywgbW9kZWxOYW1lICkgPT4ge1xuXHRcdHJlc29sdmVyc1sgZ2V0TWV0aG9kTmFtZSggbW9kZWxOYW1lLCAnc2NoZW1hJywgJ2dldCcgKSBdID0gKCkgPT5cblx0XHRcdHNvdXJjZS5nZXRTY2hlbWFGb3JNb2RlbCggbW9kZWxOYW1lICk7XG5cdFx0cmVzb2x2ZXJzWyBnZXRNZXRob2ROYW1lKCBtb2RlbE5hbWUsICdmYWN0b3J5JywgJ2dldCcgKSBdID0gKCkgPT5cblx0XHRcdHNvdXJjZS5nZXRGYWN0b3J5Rm9yTW9kZWwoIG1vZGVsTmFtZSApO1xuXHRcdHJldHVybiByZXNvbHZlcnM7XG5cdH0sXG5cdHt9XG4pO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IG5vcm1hbGl6ZUVudGl0eUlkIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaGVscGVycyc7XG5pbXBvcnQgeyBERUZBVUxUX1NDSEVNQV9TVEFURSwgc2luZ3VsYXJNb2RlbE5hbWUgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9tb2RlbCc7XG5pbXBvcnQge1xuXHRpc1NjaGVtYVJlc3BvbnNlT2ZNb2RlbCxcblx0aXNNb2RlbEVudGl0eUZhY3RvcnlPZk1vZGVsLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcbmltcG9ydCB7IGZyb21KUywgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBpc1NoYWxsb3dFcXVhbCBmcm9tICdAd29yZHByZXNzL2lzLXNoYWxsb3ctZXF1YWwnO1xuXG4vKipcbiAqIEludGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgQUNUSU9OX1RZUEVTIH0gZnJvbSAnLi9hY3Rpb24tdHlwZXMnO1xuXG4vLyBzZXR1cCBpbml0aWFsIHN0YXRlIG9iamVjdHNcbmNvbnN0IERFRkFVTFRfU1RBVEVfU0NIRU1BID0gZnJvbUpTKCBERUZBVUxUX1NDSEVNQV9TVEFURS5zY2hlbWEgKTtcbmNvbnN0IERFRkFVTFRfU1RBVEVfRkFDVE9SWSA9IGZyb21KUyggREVGQVVMVF9TQ0hFTUFfU1RBVEUuZmFjdG9yeSApO1xuY29uc3QgREVGQVVMVF9TVEFURV9FTkRQT0lOVFMgPSBmcm9tSlMoIERFRkFVTFRfU0NIRU1BX1NUQVRFLnJlbGF0aW9uRW5kcG9pbnRzICk7XG5jb25zdCBERUZBVUxUX1NUQVRFX1JFTEFUSU9OUyA9IGZyb21KUyggREVGQVVMVF9TQ0hFTUFfU1RBVEUucmVsYXRpb25TY2hlbWEgKTtcblxuLyoqXG4gKiBSZWR1Y2VyIGZvciBhIG1vZGVsIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge01hcH0gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEByZXR1cm4ge01hcH0gVGhlIG5ldyAob3Igb3JpZ2luYWwpIHN0YXRlLlxuICovXG5leHBvcnQgY29uc3QgcmVjZWl2ZVNjaGVtYSA9ICggc3RhdGUgPSBERUZBVUxUX1NUQVRFX1NDSEVNQSwgYWN0aW9uICkgPT4ge1xuXHR0cnkge1xuXHRcdGlmICggYWN0aW9uLnR5cGUgPT09IEFDVElPTl9UWVBFUy5SRUNFSVZFX1NDSEVNQV9SRUNPUkQgKSB7XG5cdFx0XHRjb25zdCBtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggYWN0aW9uLm1vZGVsTmFtZSApO1xuXHRcdFx0aWYgKCBpc1NjaGVtYVJlc3BvbnNlT2ZNb2RlbCggYWN0aW9uLnNjaGVtYSwgbW9kZWxOYW1lICkgKSB7XG5cdFx0XHRcdHJldHVybiBzdGF0ZS5zZXQoIG1vZGVsTmFtZSwgYWN0aW9uLnNjaGVtYSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cdHJldHVybiBzdGF0ZTtcbn07XG5cbi8qKlxuICogUmVkdWNlciBmb3IgYSBtb2RlbCBmYWN0b3J5XG4gKlxuICogQHBhcmFtIHtNYXB9IHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcmV0dXJuIHtNYXB9IHRoZSBuZXcgKG9yIG9yaWdpbmFsKSBzdGF0ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlY2VpdmVGYWN0b3J5ID0gKCBzdGF0ZSA9IERFRkFVTFRfU1RBVEVfRkFDVE9SWSwgYWN0aW9uICkgPT4ge1xuXHR0cnkge1xuXHRcdGlmICggYWN0aW9uLnR5cGUgPT09IEFDVElPTl9UWVBFUy5SRUNFSVZFX0ZBQ1RPUllfRk9SX01PREVMICkge1xuXHRcdFx0Y29uc3QgbW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIGFjdGlvbi5tb2RlbE5hbWUgKTtcblx0XHRcdGlmICggaXNNb2RlbEVudGl0eUZhY3RvcnlPZk1vZGVsKCBhY3Rpb24uZmFjdG9yeSwgbW9kZWxOYW1lICkgKSB7XG5cdFx0XHRcdHJldHVybiBzdGF0ZS5zZXQoIG1vZGVsTmFtZSwgYWN0aW9uLmZhY3RvcnkgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gY2F0Y2ggKCBlICkge1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXHRyZXR1cm4gc3RhdGU7XG59O1xuXG4vKipcbiAqIFJlZHVjZXIgZm9yIHJlbGF0aW9uIGVuZHBvaW50cy5cbiAqXG4gKiBAcGFyYW0ge01hcH1zdGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHJldHVybiB7TWFwfSBOZXcgb3Igb3JpZ2luYWwgc3RhdGUuXG4gKi9cbmV4cG9ydCBjb25zdCByZWNlaXZlUmVsYXRpb25FbmRwb2ludEZvckVudGl0eSA9IChcblx0c3RhdGUgPSBERUZBVUxUX1NUQVRFX0VORFBPSU5UUyxcblx0YWN0aW9uXG4pID0+IHtcblx0dHJ5IHtcblx0XHRpZiAoIGFjdGlvbi50eXBlID09PSBBQ1RJT05fVFlQRVMuUkVDRUlWRV9SRUxBVElPTl9FTkRQT0lOVF9GT1JfTU9ERUxfRU5USVRZICkge1xuXHRcdFx0Y29uc3QgbW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIGFjdGlvbi5tb2RlbE5hbWUgKTtcblx0XHRcdGNvbnN0IHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBhY3Rpb24ucmVsYXRpb25OYW1lICk7XG5cdFx0XHRyZXR1cm4gc3RhdGUuc2V0SW4oXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRtb2RlbE5hbWUsXG5cdFx0XHRcdFx0bm9ybWFsaXplRW50aXR5SWQoIGFjdGlvbi5lbnRpdHlJZCApLFxuXHRcdFx0XHRcdHJlbGF0aW9uTmFtZVxuXHRcdFx0XHRdLFxuXHRcdFx0XHRhY3Rpb24uZW5kcG9pbnRcblx0XHRcdCk7XG5cdFx0fVxuXHR9IGNhdGNoICggZSApIHtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblx0cmV0dXJuIHN0YXRlO1xufTtcblxuLyoqXG4gKiBSZWR1Y2VyIGZvciByZWxhdGlvbiBzY2hlbWFcbiAqXG4gKiBAcGFyYW0ge01hcH0gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEByZXR1cm4ge01hcH0gTmV3IG9yIG9yaWdpbmFsIHN0YXRlXG4gKi9cbmV4cG9ydCBjb25zdCByZWNlaXZlUmVsYXRpb25TY2hlbWEgPSAoXG5cdHN0YXRlID0gREVGQVVMVF9TVEFURV9SRUxBVElPTlMsXG5cdGFjdGlvblxuKSA9PiB7XG5cdGlmICggYWN0aW9uLnR5cGUgPT09IEFDVElPTl9UWVBFUy5SRUNFSVZFX1JFTEFUSU9OX1NDSEVNQSApIHtcblx0XHRjb25zdCBtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggYWN0aW9uLm1vZGVsTmFtZSApO1xuXHRcdGNvbnN0IHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBhY3Rpb24ucmVsYXRpb25OYW1lICk7XG5cdFx0aWYgKCBpc1NoYWxsb3dFcXVhbChcblx0XHRcdHN0YXRlLmdldEluKCBbIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lIF0sIHt9ICksXG5cdFx0XHRhY3Rpb24ucmVsYXRpb25TY2hlbWEsXG5cdFx0KSApIHtcblx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHR9XG5cdFx0cmV0dXJuIHN0YXRlLnNldEluKFxuXHRcdFx0WyBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSBdLFxuXHRcdFx0YWN0aW9uLnJlbGF0aW9uU2NoZW1hXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gc3RhdGU7XG59O1xuXG4vKipcbiAqIEJlIGF3YXJlIHRoYXQgdGhlIHJvb3Qgc3RhdGUgaXMgYSBwbGFpbiBvYmplY3QgYnV0IGVhY2ggc2xpY2UgKCdzY2hlbWEnLFxuICogJ2ZhY3RvcnknLCAncmVsYXRpb25FbmRwb2ludHMnKSBpcyBhbiBpbW11dGFibGUgTWFwLlxuICovXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUmVkdWNlcnMoIHtcblx0c2NoZW1hOiByZWNlaXZlU2NoZW1hLFxuXHRmYWN0b3J5OiByZWNlaXZlRmFjdG9yeSxcblx0cmVsYXRpb25FbmRwb2ludHM6IHJlY2VpdmVSZWxhdGlvbkVuZHBvaW50Rm9yRW50aXR5LFxuXHRyZWxhdGlvblNjaGVtYTogcmVjZWl2ZVJlbGF0aW9uU2NoZW1hLFxufSApO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHtcblx0aXNTY2hlbWFSZXNwb25zZU9mTW9kZWwsXG5cdGlzTW9kZWxFbnRpdHksXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHtcblx0Z2V0RW5kcG9pbnQsXG5cdHN0cmlwQmFzZVJvdXRlRnJvbVVybCxcblx0Y3JlYXRlRW50aXR5RmFjdG9yeSxcblx0TU9ERUxfUFJFRklYRVMsXG5cdHNpbmd1bGFyTW9kZWxOYW1lLFxuXHRwbHVyYWxNb2RlbE5hbWUsXG5cdGdldFByaW1hcnlLZXksXG5cdG1vZGVsTmFtZUZvclF1ZXJ5U3RyaW5nLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby9tb2RlbCc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7XG5cdHJlY2VpdmVTY2hlbWFGb3JNb2RlbEFuZFJlc29sdmUsXG5cdHJlY2VpdmVGYWN0b3J5Rm9yTW9kZWxBbmRSZXNvbHZlLFxuXHRyZWNlaXZlUmVsYXRpb25FbmRwb2ludEZvck1vZGVsRW50aXR5LFxuXHRyZWNlaXZlUmVsYXRpb25TY2hlbWEsXG5cdHJlY2VpdmVSZWxhdGlvblNjaGVtYUFuZFJlc29sdmUsXG59IGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgeyBmZXRjaCwgcmVzb2x2ZVNlbGVjdCB9IGZyb20gJy4uL2Jhc2UtY29udHJvbHMnO1xuaW1wb3J0IHsgUkVEVUNFUl9LRVkgYXMgQ09SRV9SRURVQ0VSX0tFWSB9IGZyb20gJy4uL2NvcmUvY29uc3RhbnRzJztcbmltcG9ydCB7XG5cdFJFRFVDRVJfS0VZIGFzIFNDSEVNQV9SRURVQ0VSX0tFWSxcblx0Sk9JTl9SRUxBVElPTl9UWVBFUyxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEEgcmVzb2x2ZXIgZm9yIGdldHRpbmcgdGhlIHNjaGVtYSBmb3IgYSBnaXZlbiBtb2RlbCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge09iamVjdH0gUmV0cmlldmVkIHNjaGVtYS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBnZXRTY2hlbWFGb3JNb2RlbCggbW9kZWxOYW1lICkge1xuXHRjb25zdCBwYXRoID0gZ2V0RW5kcG9pbnQoIHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKSApO1xuXHRjb25zdCBzY2hlbWEgPSB5aWVsZCBmZXRjaCggeyBwYXRoLCBtZXRob2Q6ICdPUFRJT05TJyB9ICk7XG5cdHlpZWxkIHJlY2VpdmVTY2hlbWFGb3JNb2RlbEFuZFJlc29sdmUoIG1vZGVsTmFtZSwgc2NoZW1hICk7XG5cdHJldHVybiBzY2hlbWE7XG59XG5cbi8qKlxuICogQSByZXNvbHZlciBmb3IgZ2V0dGluZyB0aGUgbW9kZWwgZW50aXR5IGZhY3RvcnkgZm9yIGEgZ2l2ZW4gbW9kZWwgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtPYmplY3R8bnVsbH0gcmV0cmlldmVkIGZhY3RvcnlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBnZXRGYWN0b3J5Rm9yTW9kZWwoIG1vZGVsTmFtZSwgc2NoZW1hID0ge30gKSB7XG5cdGlmICggISBpc1NjaGVtYVJlc3BvbnNlT2ZNb2RlbCggc2NoZW1hLCBtb2RlbE5hbWUgKSApIHtcblx0XHRzY2hlbWEgPSB5aWVsZCByZXNvbHZlU2VsZWN0KFxuXHRcdFx0U0NIRU1BX1JFRFVDRVJfS0VZLFxuXHRcdFx0J2dldFNjaGVtYUZvck1vZGVsJyxcblx0XHRcdG1vZGVsTmFtZVxuXHRcdCk7XG5cdFx0aWYgKCAhIGlzU2NoZW1hUmVzcG9uc2VPZk1vZGVsKCBzY2hlbWEsIG1vZGVsTmFtZSApICkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cdGNvbnN0IGZhY3RvcnkgPSBjcmVhdGVFbnRpdHlGYWN0b3J5KFxuXHRcdG1vZGVsTmFtZSxcblx0XHRzY2hlbWEuc2NoZW1hLFxuXHRcdE1PREVMX1BSRUZJWEVTKCBtb2RlbE5hbWUgKVxuXHQpO1xuXHR5aWVsZCByZWNlaXZlRmFjdG9yeUZvck1vZGVsQW5kUmVzb2x2ZSggbW9kZWxOYW1lLCBmYWN0b3J5ICk7XG5cdHJldHVybiBmYWN0b3J5O1xufVxuXG4vKipcbiAqIEEgcmVzb2x2ZXIgZm9yIGdldHRpbmcgdGhlIHJlbGF0aW9uIGVuZHBvaW50IGZvciBhIGdpdmVuIG1vZGVsLCBpdCdzIGlkLCBhbmRcbiAqIHRoZSByZXF1ZXN0ZWQgcmVsYXRpb24uXG4gKlxuICogVGhlIEVFIFJFU1QgYXBpIG5hbWVzIHJlbGF0aW9ucyBhY2NvcmRpbmcgdG8gd2hldGhlciB0aGV5IHRoZXJlIGFyZSBzaW5ndWxhclxuICogb3IgcGx1cmFsIHJlbGF0aW9ucyBvbiBhIGdpdmVuIG1vZGVsIChlZy4gUmVnaXN0cmF0aW9ucyBoYXZlIG9uZSBldmVudFxuICogcmVsYXRpb24sIGJ1dCBFdmVudHMgY2FuIGhhdmUgbXVsdGlwbGUgZGF0ZXRpbWVzKS4gIFRoaXMgbWVhbnMgdGhlIG9ubHkgd2F5XG4gKiB0byBkZXJpdmUgYW4gYWNjdXJhdGUgZW5kcG9pbnQgZm9yIGEgZ2l2ZW4gcmVsYXRpb24gcmVxdWVzdCBvbiBhbiBlbnRpdHkgaXNcbiAqIHRvIHJldHJpZXZlIHRoZSBlbnRpdHkgZnJvbSB0aGUgcmVzb3VyY2UgYW5kIGRlcml2ZSB0aGUgZW5kcG9pbnQgZnJvbSB0aGVcbiAqIGxpbmtzIGluIHRoZSByZXNwb25zZS5cbiAqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtudW1iZXJ9IGVudGl0eUlkXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25Nb2RlbE5hbWVcbiAqIEByZXR1cm4ge0l0ZXJhYmxlSXRlcmF0b3I8Kj58c3RyaW5nfSBBIGdlbmVyYXRvciBvciB0aGUgZGVyaXZlZCBlbmRwb2ludC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBnZXRSZWxhdGlvbkVuZHBvaW50Rm9yRW50aXR5SWQoXG5cdG1vZGVsTmFtZSxcblx0ZW50aXR5SWQsXG5cdHJlbGF0aW9uTW9kZWxOYW1lXG4pIHtcblx0Ly8gZmlyc3QgYXR0ZW1wdCB0byBnZXQgdGhlIHJlbGF0aW9uIGVuZHBvaW50IGZyb20gdGhlIGVudGl0eSB0aGF0IG1pZ2h0XG5cdC8vIGFscmVhZHkgYmUgaW4gY29yZSBzdGF0ZS5cblx0Y29uc3QgZW50aXR5ID0geWllbGQgcmVzb2x2ZVNlbGVjdChcblx0XHRDT1JFX1JFRFVDRVJfS0VZLFxuXHRcdCdnZXRFbnRpdHlCeUlkJyxcblx0XHRtb2RlbE5hbWUsXG5cdFx0ZW50aXR5SWRcblx0KTtcblx0cmVsYXRpb25Nb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25Nb2RlbE5hbWUgKTtcblx0Y29uc3QgcGx1cmFsUmVsYXRpb25OYW1lID0gcGx1cmFsTW9kZWxOYW1lKCByZWxhdGlvbk1vZGVsTmFtZSApO1xuXHRsZXQgZW5kcG9pbnQgPSAnJztcblx0aWYgKCBpc01vZGVsRW50aXR5KCBlbnRpdHkgKSAmJiBlbnRpdHlbIHBsdXJhbFJlbGF0aW9uTmFtZSArICdSZXNvdXJjZScgXSApIHtcblx0XHRlbmRwb2ludCA9IHN0cmlwQmFzZVJvdXRlRnJvbVVybChcblx0XHRcdGVudGl0eVsgcGx1cmFsUmVsYXRpb25OYW1lICsgJ1Jlc291cmNlJyBdLnJlc291cmNlTGlua1xuXHRcdCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgcGF0aCA9IGdldEVuZHBvaW50KCBtb2RlbE5hbWUgKSArICcvJyArIGVudGl0eUlkO1xuXHRcdGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goIHsgcGF0aCB9ICk7XG5cdFx0aWYgKCAhIHJlc3BvbnNlLl9saW5rcyApIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdFx0Y29uc3QgbGlua3MgPSByZXNwb25zZS5fbGlua3MgfHwge307XG5cdFx0Y29uc3QgYmFzZVJlbGF0aW9uUGF0aCA9ICdodHRwczovL2FwaS5ldmVudGVzcHJlc3NvLmNvbS8nO1xuXHRcdGVuZHBvaW50ID0gbGlua3NbXG5cdFx0XHRiYXNlUmVsYXRpb25QYXRoICsgcmVsYXRpb25Nb2RlbE5hbWVcblx0XHRdIHx8ICcnO1xuXHRcdGVuZHBvaW50ID0gKCBlbmRwb2ludCA9PT0gJycgJiYgbGlua3NbXG5cdFx0XHRiYXNlUmVsYXRpb25QYXRoICsgcGx1cmFsUmVsYXRpb25OYW1lXG5cdFx0XSApIHx8IGVuZHBvaW50O1xuXHR9XG5cdGlmICggZW5kcG9pbnQgKSB7XG5cdFx0eWllbGQgcmVjZWl2ZVJlbGF0aW9uRW5kcG9pbnRGb3JNb2RlbEVudGl0eShcblx0XHRcdG1vZGVsTmFtZSxcblx0XHRcdGVudGl0eUlkLFxuXHRcdFx0cmVsYXRpb25Nb2RlbE5hbWUsXG5cdFx0XHRlbmRwb2ludFxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIGVuZHBvaW50O1xufVxuXG4vKipcbiAqIEEgcmVzb2x2ZXIgZm9yIGdldHRpbmcgdGhlIHByaW1hcnkga2V5IHN0cmluZyB0byB1c2UgaW4gYSBxdWVyeSBmb3IgdGhlIGdpdmVuXG4gKiBtb2RlbCBhbmQgcmVsYXRpb24uIFRoaXMgY29uc2lkZXJzIHRoZSBqb2luIHR5cGUgZm9yIHRoZSByZWxhdGlvbi5cbiAqXG4gKiBAc2VlIHRoZSBgZ2V0UmVsYXRpb25QcmltYXJ5S2V5U3RyaW5nYCBzZWxlY3RvciBmb3IgZXhhbXBsZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBwcmltYXJ5IGtleSBzdHJpbmcgdG8gdXNlIG9yIGFuIGVtcHR5IHN0cmluZyBpZiByZWxhdGlvblxuICogdHlwZSBjb3VsZCBub3QgYmUgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBnZXRSZWxhdGlvblByaW1hcnlLZXlTdHJpbmcoIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICkge1xuXHQvLyBub3JtYWxpemVcblx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRyZWxhdGlvbk5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25OYW1lICk7XG5cdGNvbnN0IHJlbGF0aW9uVHlwZSA9IHlpZWxkIHJlc29sdmVTZWxlY3QoXG5cdFx0U0NIRU1BX1JFRFVDRVJfS0VZLFxuXHRcdCdnZXRSZWxhdGlvblR5cGUnLFxuXHRcdG1vZGVsTmFtZSxcblx0XHRyZWxhdGlvbk5hbWVcblx0KTtcblx0aWYgKCByZWxhdGlvblR5cGUgPT09ICcnICkge1xuXHRcdHJldHVybiAnJztcblx0fVxuXHRjb25zdCByZWxhdGlvblByaW1hcnlLZXkgPSBnZXRQcmltYXJ5S2V5KCByZWxhdGlvbk5hbWUgKTtcblx0cmV0dXJuIHJlbGF0aW9uVHlwZSA9PT0gJ0VFX0JlbG9uZ3NfVG9fUmVsYXRpb24nID9cblx0XHRyZWxhdGlvblByaW1hcnlLZXkgOlxuXHRcdGAkeyBtb2RlbE5hbWVGb3JRdWVyeVN0cmluZyggcmVsYXRpb25OYW1lICkgfS4keyByZWxhdGlvblByaW1hcnlLZXkgfWA7XG59XG5cbi8qKlxuICogQSByZXNvbHZlciBmb3IgcmV0dXJuaW5nIHdoYXQgdGhlIGV4cGVjdGVkIHJlc3BvbnNlIHR5cGUgaXMgZm9yIHRoZSBnaXZlblxuICogcmVsYXRpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZSAgVGhlIG1vZGVsIHRoZSByZWxhdGlvbiBpcyBmb3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIFRoZSBtb2RlbCBuYW1lIHRoZSByZWxhdGlvbiBpcyB0by5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHR5cGUgb2YgdGhlIHJlbGF0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24qIGdldFJlbGF0aW9uUmVzcG9uc2VUeXBlKCBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSApIHtcblx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRyZWxhdGlvbk5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25OYW1lICk7XG5cdGNvbnN0IHJlbGF0aW9uU2NoZW1hID0geWllbGQgcmVzb2x2ZVNlbGVjdChcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J2dldFJlbGF0aW9uU2NoZW1hJyxcblx0XHRtb2RlbE5hbWUsXG5cdFx0cmVsYXRpb25OYW1lLFxuXHQpO1xuXHRyZXR1cm4gcmVsYXRpb25TY2hlbWEgIT09IG51bGwgPyByZWxhdGlvblNjaGVtYS50eXBlIDogJyc7XG59XG5cbi8qKlxuICogQSByZXNvbHZlciBmb3IgcmV0dXJuaW5nIHdoZXRoZXIgdGhlIGdpdmVuIG1vZGVsTmFtZSBhbmQgcmVsYXRpb25OYW1lIGhhdmVcbiAqIGEgam9pbiB0YWJsZSBmb3IgcmVwcmVzZW50aW5nIHRoZWlyIHJlbGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoZXJlIGlzIGEgam9pbiB0YWJsZSwgZmFsc2UgbWVhbnMgdGhlcmUgaXNuJ3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogaGFzSm9pblRhYmxlUmVsYXRpb24oIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICkge1xuXHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0Y29uc3QgcmVsYXRpb25UeXBlID0geWllbGQgcmVzb2x2ZVNlbGVjdChcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J2dldFJlbGF0aW9uVHlwZScsXG5cdFx0bW9kZWxOYW1lLFxuXHRcdHJlbGF0aW9uTmFtZSxcblx0KTtcblx0cmV0dXJuIEpPSU5fUkVMQVRJT05fVFlQRVMuaW5kZXhPZiggcmVsYXRpb25UeXBlICkgPiAtMTtcbn1cblxuLyoqXG4gKiBBIHJlc29sdmVyIGZvciBnZXR0aW5nIHRoZSByZWxhdGlvbiB0eXBlIGRlc2NyaWJpbmcgdGhlIHJlbGF0aW9uIGJldHdlZW5cbiAqIG1vZGVsTmFtZSBhbmQgcmVsYXRpb25OYW1lXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICogQHJldHVybiB7c3RyaW5nfSAgVGhlIHJlbGF0aW9uIHR5cGUgdG8gZGVzY3JpYmUgdGhlIHJlbGF0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogZ2V0UmVsYXRpb25UeXBlKCBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSApIHtcblx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRyZWxhdGlvbk5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25OYW1lICk7XG5cdGNvbnN0IHJlbGF0aW9uU2NoZW1hID0geWllbGQgcmVzb2x2ZVNlbGVjdChcblx0XHRTQ0hFTUFfUkVEVUNFUl9LRVksXG5cdFx0J2dldFJlbGF0aW9uU2NoZW1hJyxcblx0XHRtb2RlbE5hbWUsXG5cdFx0cmVsYXRpb25OYW1lXG5cdCk7XG5cdHJldHVybiByZWxhdGlvblNjaGVtYSAhPT0gbnVsbCA/IHJlbGF0aW9uU2NoZW1hLnJlbGF0aW9uX3R5cGUgOiAnJztcbn1cblxuLyoqXG4gKiBBIHJlc29sdmVyIGZvciByZXRyaWV2aW5nIHRoZSByZWxhdGlvbiBzY2hlbWEgZnJvbSB0aGUgc2VydmVyIGZvciB0aGUgZ2l2ZW5cbiAqIG1vZGVsTmFtZSBhbmQgcmVsYXRpb25OYW1lLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEB0aHJvd3MgRXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uKiBoeWRyYXRlUmVsYXRpb25TY2hlbWEoIHNjaGVtYSwgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgKSB7XG5cdG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKTtcblx0cmVsYXRpb25OYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIHJlbGF0aW9uTmFtZSApO1xuXHR5aWVsZCByZWNlaXZlUmVsYXRpb25TY2hlbWFBbmRSZXNvbHZlKFxuXHRcdG1vZGVsTmFtZSxcblx0XHRyZWxhdGlvbk5hbWUsXG5cdFx0c2NoZW1hXG5cdCk7XG59XG5cbi8qKlxuICogQSByZXNvbHZlciBmb3IgcmV0cmlldmluZyB0aGUgcmVsYXRpb24gc2NoZW1hIGZyb20gdGhlIHNlcnZlciBmb3IgdGhlIGdpdmVuXG4gKiBtb2RlbE5hbWUgYW5kIHJlbGF0aW9uTmFtZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gKiBAdGhyb3dzIEVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogZ2V0UmVsYXRpb25TY2hlbWEoIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICkge1xuXHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdGNvbnN0IHNjaGVtYSA9IHlpZWxkIHJlc29sdmVTZWxlY3QoXG5cdFx0U0NIRU1BX1JFRFVDRVJfS0VZLFxuXHRcdCdnZXRTY2hlbWFGb3JNb2RlbCcsXG5cdFx0bW9kZWxOYW1lXG5cdCk7XG5cdGlmICggc2NoZW1hID09PSBudWxsICkge1xuXHRcdHRocm93IG5ldyBFcnJvciggJ1RoZSAnICsgbW9kZWxOYW1lICsgJyBkb2VzIG5vdCBoYXZlIGEgc2NoZW1hJyApO1xuXHR9XG5cdHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0Y29uc3QgcGx1cmFsUmVsYXRpb25OYW1lID0gcGx1cmFsTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0Ly8gaXMgdGhlcmUgYSBzY2hlbWEgZm9yIHBsdXJhbCByZWxhdGlvbiBuYW1lP1xuXHRsZXQgdHlwZVNjaGVtYSA9IHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSggJ3NjaGVtYScgKSAmJlxuXHRcdHNjaGVtYS5zY2hlbWEuaGFzT3duUHJvcGVydHkoICdwcm9wZXJ0aWVzJyApID9cblx0XHRzY2hlbWEuc2NoZW1hLnByb3BlcnRpZXNbIHBsdXJhbFJlbGF0aW9uTmFtZSBdIDpcblx0XHRudWxsO1xuXHR0eXBlU2NoZW1hID0gdHlwZVNjaGVtYSA9PT0gbnVsbCAmJlxuXHRcdCEgaXNVbmRlZmluZWQoIHNjaGVtYS5zY2hlbWEucHJvcGVydGllc1sgcmVsYXRpb25OYW1lIF0gKSA/XG5cdFx0c2NoZW1hLnNjaGVtYS5wcm9wZXJ0aWVzWyByZWxhdGlvbk5hbWUgXSA6XG5cdFx0dHlwZVNjaGVtYTtcblx0aWYgKCB0eXBlU2NoZW1hID09PSBudWxsICkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdCdUaGVyZSBpcyBubyByZWxhdGlvbiBmb3IgJyArIHJlbGF0aW9uTmFtZSArICcgb24gdGhlICcgK1xuXHRcdFx0J21vZGVsICcgKyBtb2RlbE5hbWVcblx0XHQpO1xuXHR9XG5cdHlpZWxkIHJlY2VpdmVSZWxhdGlvblNjaGVtYShcblx0XHRtb2RlbE5hbWUsXG5cdFx0cmVsYXRpb25OYW1lLFxuXHRcdHR5cGVTY2hlbWFcblx0KTtcbn1cbiIsIi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGlzUmVzb2x2aW5nLCBoYXNGaW5pc2hlZFJlc29sdmluZyB9IGZyb20gJy4uL2Jhc2Utc2VsZWN0b3JzJztcbmltcG9ydCB7IFJFRFVDRVJfS0VZLCBKT0lOX1JFTEFUSU9OX1RZUEVTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHtcblx0c2luZ3VsYXJNb2RlbE5hbWUsXG5cdGdldFByaW1hcnlLZXksXG5cdG1vZGVsTmFtZUZvclF1ZXJ5U3RyaW5nLFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby9tb2RlbCc7XG5pbXBvcnQgeyBub3JtYWxpemVFbnRpdHlJZCB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2hlbHBlcnMnO1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBjcmVhdGVTZWxlY3RvciBmcm9tICdyZW1lbW8nO1xuXG4vKipcbiAqIFNlbGVjdG9yIGZvciByZXR1cm5pbmcgdGhlIHNjaGVtYSBvYmplY3QgZm9yIGEgZ2l2ZW4gbW9kZWwgbmFtZSBmcm9tIHRoZVxuICogc3RhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHNjaGVtYSBvYmplY3Qgb3IgbnVsbCBpZiBpdCBkb2Vzbid0IGV4aXN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NoZW1hRm9yTW9kZWwoIHN0YXRlLCBtb2RlbE5hbWUgKSB7XG5cdGNvbnN0IHNjaGVtYSA9IHN0YXRlLnNjaGVtYS5nZXQoIHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKSwgbnVsbCApO1xuXHRyZXR1cm4gc2NoZW1hO1xufVxuXG4vKipcbiAqIFNlbGVjdG9yIGZvciByZXR1cm5pbmcgd2hldGhlciB0aGUgc2NoZW1hIGlzIGJlaW5nIHJlcXVlc3RlZCBvciBub3QgZm9yIHRoZVxuICogZ2l2ZW4gbW9kZWwgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIGl0cyBiZWluZyByZXF1ZXN0ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1JlcXVlc3RpbmdTY2hlbWFGb3JNb2RlbCggc3RhdGUsIG1vZGVsTmFtZSApIHtcblx0cmV0dXJuIGlzUmVzb2x2aW5nKFxuXHRcdFJFRFVDRVJfS0VZLFxuXHRcdCdnZXRTY2hlbWFGb3JNb2RlbCcsXG5cdFx0c2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApXG5cdCk7XG59XG5cbi8qKlxuICogU2VsZWN0b3IgZm9yIHJldHVybmluZyB3aGV0aGVyIHRoZSBzY2hlbWEgaGFzIGJlZW4gcmVzb2x2ZWQgb3Igbm90IGZvciB0aGVcbiAqIGdpdmVuIG1vZGVsIG5hbWUuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhhdCB0aGUgc2NoZW1hIGhhcyBmaW5pc2hlZCByZXNvbHZpbmcgZm9yIHRoaXNcbiAqIG1vZGVsIG5hbWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNSZXNvbHZlZFNjaGVtYUZvck1vZGVsKCBzdGF0ZSwgbW9kZWxOYW1lICkge1xuXHRyZXR1cm4gaGFzRmluaXNoZWRSZXNvbHZpbmcoXG5cdFx0UkVEVUNFUl9LRVksXG5cdFx0J2dldFNjaGVtYUZvck1vZGVsJyxcblx0XHRzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lIClcblx0KTtcbn1cblxuLyoqXG4gKiBTZWxlY3RvciBmb3IgcmV0dXJuaW5nIHRoZSBtb2RlbCBlbnRpdHkgZmFjdG9yeSBvYmplY3QgZm9yIGEgZ2l2ZW5cbiAqIG1vZGVsIG5hbWUgZnJvbSB0aGUgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgdGhlIG1vZGVsIGVudGl0eSBmYWN0b3J5IG9yIG51bGwgaWYgaXQgZG9lc24ndFxuICogZXhpc3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGYWN0b3J5Rm9yTW9kZWwoIHN0YXRlLCBtb2RlbE5hbWUgKSB7XG5cdGNvbnN0IGZhY3RvcnkgPSBzdGF0ZS5mYWN0b3J5LmdldCggc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApLCBudWxsICk7XG5cdHJldHVybiAhICggZmFjdG9yeSBpbnN0YW5jZW9mIE1hcCApID8gZmFjdG9yeSA6IG51bGw7XG59XG5cbi8qKlxuICogU2VsZWN0b3IgZm9yIHJldHVybmluZyB3aGV0aGVyIHRoZSBtb2RlbCBlbnRpdHkgZmFjdG9yeSBpcyBiZWluZyByZXF1ZXN0ZWRcbiAqIG9yIG5vdCBmb3IgdGhlIGdpdmVuIG1vZGVsIG5hbWUgZnJvbSB0aGUgc3RhdGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBtZWFucyBpdCBpcyBiZWluZyByZXF1ZXN0ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1JlcXVlc3RpbmdGYWN0b3J5Rm9yTW9kZWwoIHN0YXRlLCBtb2RlbE5hbWUgKSB7XG5cdHJldHVybiBpc1Jlc29sdmluZyhcblx0XHRSRURVQ0VSX0tFWSxcblx0XHQnZ2V0RmFjdG9yeUZvck1vZGVsJyxcblx0XHRzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lIClcblx0KTtcbn1cblxuLyoqXG4gKiBTZWxlY3RvciBmb3IgcmV0dXJuaW5nIHdoZXRoZXIgdGhlIGZhY3RvcnkgaGFzIGJlZW4gcmVzb2x2ZWQgb3Igbm90IGZvciB0aGVcbiAqIGdpdmVuIG1vZGVsIG5hbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoYXQgdGhlIGZhY3RvcnkgaGFzIGZpbmlzaGVkIHJlc29sdmluZyBmb3IgdGhpc1xuICogbW9kZWwgbmFtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc1Jlc29sdmVkRmFjdG9yeUZvck1vZGVsKCBzdGF0ZSwgbW9kZWxOYW1lICkge1xuXHRyZXR1cm4gaGFzRmluaXNoZWRSZXNvbHZpbmcoXG5cdFx0UkVEVUNFUl9LRVksXG5cdFx0J2dldEZhY3RvcnlGb3JNb2RlbCcsXG5cdFx0c2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApXG5cdCk7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSByZWxhdGlvbiBlbmRwb2ludCBmb3IgdGhlIGdpdmVuIG1vZGVsLCBlbnRpdHkgaWQgYW5kIHJlbGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBlbnRpdHlJZFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFJldHVybnMgdGhlIHJlbGF0aW9uIGVuZHBvaW50IGlmIGF2YWlsYWJsZSBvciBhbiBlbXB0eVxuICogc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVsYXRpb25FbmRwb2ludEZvckVudGl0eUlkKFxuXHRzdGF0ZSxcblx0bW9kZWxOYW1lLFxuXHRlbnRpdHlJZCxcblx0cmVsYXRpb25Nb2RlbE5hbWVcbikge1xuXHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdHJlbGF0aW9uTW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIHJlbGF0aW9uTW9kZWxOYW1lICk7XG5cdGVudGl0eUlkID0gbm9ybWFsaXplRW50aXR5SWQoIGVudGl0eUlkICk7XG5cdHJldHVybiBzdGF0ZS5yZWxhdGlvbkVuZHBvaW50cy5nZXRJbihcblx0XHRbIG1vZGVsTmFtZSwgZW50aXR5SWQsIHJlbGF0aW9uTW9kZWxOYW1lIF1cblx0KSB8fCAnJztcbn1cblxuLyoqXG4gKiBTZWxlY3RvciBmb3IgcmV0dXJuaW5nIHdoZXRoZXIgdGhlIHJlbGF0aW9uIGVuZHBvaW50IGlzIGJlaW5nIHJlcXVlc3RlZFxuICogb3Igbm90IGZvciB0aGUgZ2l2ZW4gbW9kZWwgbmFtZSwgZW50aXR5IGlkLCBhbmQgcmVsYXRpb24gZnJvbSB0aGUgc3RhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZW50aXR5SWRcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk1vZGVsTmFtZVxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgaXQgaXMgYmVpbmcgcmVxdWVzdGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNSZXF1ZXN0aW5nUmVsYXRpb25FbmRwb2ludEZvckVudGl0eUlkKFxuXHRzdGF0ZSxcblx0bW9kZWxOYW1lLFxuXHRlbnRpdHlJZCxcblx0cmVsYXRpb25Nb2RlbE5hbWVcbikge1xuXHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdGVudGl0eUlkID0gbm9ybWFsaXplRW50aXR5SWQoIGVudGl0eUlkICk7XG5cdHJlbGF0aW9uTW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIHJlbGF0aW9uTW9kZWxOYW1lICk7XG5cdHJldHVybiBpc1Jlc29sdmluZyhcblx0XHRSRURVQ0VSX0tFWSxcblx0XHQnZ2V0UmVsYXRpb25FbmRwb2ludEZvckVudGl0eUlkJyxcblx0XHRtb2RlbE5hbWUsXG5cdFx0ZW50aXR5SWQsXG5cdFx0cmVsYXRpb25Nb2RlbE5hbWUsXG5cdCk7XG59XG5cbi8qKlxuICogU2VsZWN0b3IgZm9yIHJldHVybmluZyB0aGUgcHJpbWFyeSBrZXkgc3RyaW5nIHRvIHVzZSBpbiBhIHF1ZXJ5IGZvciB0aGUgZ2l2ZW5cbiAqIG1vZGVsIGFuZCByZWxhdGlvbi4gIFRoaXMgY29uc2lkZXJzIHRoZSBqb2luIHR5cGUgZm9yIHRoZSByZWxhdGlvbi5cbiAqXG4gKiBGb3IgZXhhbXBsZTogIElmIHlvdSB3ZXJlIGRvaW5nIGEgcXVlcnkgdG8gZ2V0IHRoZSByZWdpc3RyYXRpb25zIHJlbGF0ZWQgdG8gYW5cbiAqIGF0dGVuZGVlLCB5b3Ugd291bGQgbmVlZCB0aGUgc3RyaW5nIHRvIHVzZSBmb3IgdGhlIGBSRUdfSURgIHByaW1hcnkga2V5IGluXG4gKiB0aGUgcXVlcnkuICBTaW5jZSB0aGUgam9pbiB0eXBlIGZvciByZWdpc3RyYXRpb25zIHRvIGF0dGVuZGVlcyBpc1xuICogRUVfSGFzX01hbnlfUmVsYXRpb24sIHRoZW4gdGhlIHF1ZXJ5IHN0cmluZyB3b3VsZCBuZWVkIHRvIGJlXG4gKiBgUmVnaXN0cmF0aW9uLlJFR19JRGAuICBJZiBob3dldmVyIHlvdSB3ZXJlIGdldHRpbmcgdGhlIGF0dGVuZGVlIHJlbGF0ZWRcbiAqIHRvIGEgcmVnaXN0cmF0aW9uLCB0aGVuIHRoZSBqb2luIHR5cGUgZm9yIGF0dGVuZGVlcyBvbiByZWdpc3RyYXRpb25zIGlzXG4gKiBFRV9CZWxvbmdzX1RvX1JlbGF0aW9uLCBpbiB3aGljaCBjYXNlIHRoZSBhdHRlbmRlZSBwcmltYXJ5IGtleSB3b3VsZCBiZVxuICogYEFUVF9JRGAgKHRoZSByZWdpc3RyYXRpb24gdGFibGUgaGFzIHRoZSBmb3JlaWduIGtleSBvbiBpdCkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gKlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgcHJpbWFyeSBrZXkgc3RyaW5nIHRvIHVzZSBvciBhbiBlbXB0eSBzdHJpbmcgaWYgcmVsYXRpb25cbiAqIHR5cGUgY291bGQgbm90IGJlIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSZWxhdGlvblByaW1hcnlLZXlTdHJpbmcgPSBjcmVhdGVTZWxlY3Rvcihcblx0KFxuXHRcdHN0YXRlLFxuXHRcdG1vZGVsTmFtZSxcblx0XHRyZWxhdGlvbk5hbWVcblx0KSA9PiB7XG5cdFx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRcdHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0XHRjb25zdCByZWxhdGlvblR5cGUgPSBnZXRSZWxhdGlvblR5cGUoIHN0YXRlLCBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSApO1xuXHRcdGlmICggcmVsYXRpb25UeXBlID09PSAnJyApIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdFx0Y29uc3QgcmVsYXRpb25QcmltYXJ5S2V5ID0gZ2V0UHJpbWFyeUtleSggcmVsYXRpb25OYW1lICk7XG5cdFx0cmV0dXJuIHJlbGF0aW9uVHlwZSA9PT0gJ0VFX0JlbG9uZ3NfVG9fUmVsYXRpb24nID9cblx0XHRcdHJlbGF0aW9uUHJpbWFyeUtleSA6XG5cdFx0XHRgJHsgbW9kZWxOYW1lRm9yUXVlcnlTdHJpbmcoIHJlbGF0aW9uTmFtZSApIH0uJHsgcmVsYXRpb25QcmltYXJ5S2V5IH1gO1xuXHR9LFxuXHQoIHN0YXRlLCBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSApID0+IHtcblx0XHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdFx0cmVsYXRpb25OYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIHJlbGF0aW9uTmFtZSApO1xuXHRcdHJldHVybiBbXG5cdFx0XHRzdGF0ZS5yZWxhdGlvblNjaGVtYS5nZXRJbiggWyBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSBdLCAnJyApLFxuXHRcdF07XG5cdH0sXG4pO1xuXG4vKipcbiAqIFNlbGVjdG9yIHJldHVybmluZyB0aGUgcmVsYXRpb24gcmVzcG9uc2UgdHlwZSBmb3IgdGhlIGdpdmVuIHJlbGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgdHlwZSBmb3IgdGhlIHJlbGF0aW9uIHJldHVybmVkIGZvciB0aGUgZ2l2ZW4gbW9kZWwgYW5kXG4gKiByZWxhdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFJlbGF0aW9uUmVzcG9uc2VUeXBlID0gKCBzdGF0ZSwgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgKSA9PiB7XG5cdG1vZGVsTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCBtb2RlbE5hbWUgKTtcblx0cmVsYXRpb25OYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIHJlbGF0aW9uTmFtZSApO1xuXHRjb25zdCByZWxhdGlvblNjaGVtYSA9IGdldFJlbGF0aW9uU2NoZW1hKCBzdGF0ZSwgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgKTtcblx0cmV0dXJuIHJlbGF0aW9uU2NoZW1hICE9PSBudWxsID9cblx0XHRyZWxhdGlvblNjaGVtYS50eXBlIDpcblx0XHQnJztcbn07XG5cbi8qKlxuICogU2VsZWN0b3IgcmV0dXJuaW5nIHdoZXRoZXIgdGhlIHJlbGF0aW9uIGJldHdlZW4gdGhlIGdpdmVuIG1vZGVsIG5hbWUgYW5kXG4gKiByZWxhdGlvbiBuYW1lIGhhcyBhIGpvaW4gdGFibGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoZXJlIGlzIGEgam9pbiB0YWJsZSwgZmFsc2UgbWVhbnMgdGhlcmUgaXNuJ3QuXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNKb2luVGFibGVSZWxhdGlvbiA9ICggc3RhdGUsIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICkgPT4ge1xuXHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0Y29uc3QgcmVsYXRpb25UeXBlID0gZ2V0UmVsYXRpb25UeXBlKCBzdGF0ZSwgbW9kZWxOYW1lLCByZWxhdGlvbk5hbWUgKTtcblx0cmV0dXJuIEpPSU5fUkVMQVRJT05fVFlQRVMuaW5kZXhPZiggcmVsYXRpb25UeXBlICkgPiAtMTtcbn07XG5cbi8qKlxuICogU2VsZWN0b3IgcmV0dXJuaW5nIHRoZSByZWxhdGlvbiB0eXBlIGRlc2NyaWJpbmcgdGhlIHJlbGF0aW9uIGJldHdlZW4gdGhlXG4gKiBnaXZlbiBtb2RlbCBuYW1lIGFuZCByZWxhdGlvbiBuYW1lLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICogQHJldHVybiB7c3RyaW5nfSAgVGhlIHJlbGF0aW9uIHR5cGUgKGVnLiBcIkVFX0hBQlRNX1JlbGF0aW9uXCIpXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSZWxhdGlvblR5cGUgPSAoIHN0YXRlLCBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSApID0+IHtcblx0bW9kZWxOYW1lID0gc2luZ3VsYXJNb2RlbE5hbWUoIG1vZGVsTmFtZSApO1xuXHRyZWxhdGlvbk5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggcmVsYXRpb25OYW1lICk7XG5cdGNvbnN0IHJlbGF0aW9uU2NoZW1hID0gZ2V0UmVsYXRpb25TY2hlbWEoIHN0YXRlLCBtb2RlbE5hbWUsIHJlbGF0aW9uTmFtZSApO1xuXHRyZXR1cm4gcmVsYXRpb25TY2hlbWEgIT09IG51bGwgP1xuXHRcdHJlbGF0aW9uU2NoZW1hLnJlbGF0aW9uX3R5cGUgOlxuXHRcdCcnO1xufTtcblxuLyoqXG4gKiBTZWxlY3RvciByZXR1cm5pbmcgdGhlIHJlbGF0aW9uIHNjaGVtYSBkZXNjcmliaW5nIHRoZSByZWxhdGlvbiBiZXR3ZWVuIHRoZVxuICogZ2l2ZW4gbW9kZWwgbmFtZSBhbmQgcmVsYXRpb24gbmFtZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAqIEByZXR1cm4ge09iamVjdHxudWxsfSBBbiBvYmplY3Qgb3IgbnVsbCBpZiB0aGVyZSBpcyBubyByZWxhdGlvbiBzY2hlbWEuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSZWxhdGlvblNjaGVtYSA9ICggc3RhdGUsIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lICkgPT4ge1xuXHRtb2RlbE5hbWUgPSBzaW5ndWxhck1vZGVsTmFtZSggbW9kZWxOYW1lICk7XG5cdHJlbGF0aW9uTmFtZSA9IHNpbmd1bGFyTW9kZWxOYW1lKCByZWxhdGlvbk5hbWUgKTtcblx0cmV0dXJuIHN0YXRlLnJlbGF0aW9uU2NoZW1hLmdldEluKCBbIG1vZGVsTmFtZSwgcmVsYXRpb25OYW1lIF0sIG51bGwgKTtcbn07XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhvdXRIb2xlczsiLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvcjsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVyKSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIikgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheTsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVTcHJlYWQ7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLy8gVXNlZCBmb3Igc2V0dGluZyBwcm90b3R5cGUgbWV0aG9kcyB0aGF0IElFOCBjaG9rZXMgb24uXG52YXIgREVMRVRFID0gJ2RlbGV0ZSc7XG5cbi8vIENvbnN0YW50cyBkZXNjcmliaW5nIHRoZSBzaXplIG9mIHRyaWUgbm9kZXMuXG52YXIgU0hJRlQgPSA1OyAvLyBSZXN1bHRlZCBpbiBiZXN0IHBlcmZvcm1hbmNlIGFmdGVyIF9fX19fXz9cbnZhciBTSVpFID0gMSA8PCBTSElGVDtcbnZhciBNQVNLID0gU0laRSAtIDE7XG5cbi8vIEEgY29uc2lzdGVudCBzaGFyZWQgdmFsdWUgcmVwcmVzZW50aW5nIFwibm90IHNldFwiIHdoaWNoIGVxdWFscyBub3RoaW5nIG90aGVyXG4vLyB0aGFuIGl0c2VsZiwgYW5kIG5vdGhpbmcgdGhhdCBjb3VsZCBiZSBwcm92aWRlZCBleHRlcm5hbGx5LlxudmFyIE5PVF9TRVQgPSB7fTtcblxuLy8gQm9vbGVhbiByZWZlcmVuY2VzLCBSb3VnaCBlcXVpdmFsZW50IG9mIGBib29sICZgLlxuZnVuY3Rpb24gTWFrZVJlZigpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IGZhbHNlIH07XG59XG5cbmZ1bmN0aW9uIFNldFJlZihyZWYpIHtcbiAgaWYgKHJlZikge1xuICAgIHJlZi52YWx1ZSA9IHRydWU7XG4gIH1cbn1cblxuLy8gQSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGEgdmFsdWUgcmVwcmVzZW50aW5nIGFuIFwib3duZXJcIiBmb3IgdHJhbnNpZW50IHdyaXRlc1xuLy8gdG8gdHJpZXMuIFRoZSByZXR1cm4gdmFsdWUgd2lsbCBvbmx5IGV2ZXIgZXF1YWwgaXRzZWxmLCBhbmQgd2lsbCBub3QgZXF1YWxcbi8vIHRoZSByZXR1cm4gb2YgYW55IHN1YnNlcXVlbnQgY2FsbCBvZiB0aGlzIGZ1bmN0aW9uLlxuZnVuY3Rpb24gT3duZXJJRCgpIHt9XG5cbmZ1bmN0aW9uIGVuc3VyZVNpemUoaXRlcikge1xuICBpZiAoaXRlci5zaXplID09PSB1bmRlZmluZWQpIHtcbiAgICBpdGVyLnNpemUgPSBpdGVyLl9faXRlcmF0ZShyZXR1cm5UcnVlKTtcbiAgfVxuICByZXR1cm4gaXRlci5zaXplO1xufVxuXG5mdW5jdGlvbiB3cmFwSW5kZXgoaXRlciwgaW5kZXgpIHtcbiAgLy8gVGhpcyBpbXBsZW1lbnRzIFwiaXMgYXJyYXkgaW5kZXhcIiB3aGljaCB0aGUgRUNNQVN0cmluZyBzcGVjIGRlZmluZXMgYXM6XG4gIC8vXG4gIC8vICAgICBBIFN0cmluZyBwcm9wZXJ0eSBuYW1lIFAgaXMgYW4gYXJyYXkgaW5kZXggaWYgYW5kIG9ubHkgaWZcbiAgLy8gICAgIFRvU3RyaW5nKFRvVWludDMyKFApKSBpcyBlcXVhbCB0byBQIGFuZCBUb1VpbnQzMihQKSBpcyBub3QgZXF1YWxcbiAgLy8gICAgIHRvIDJeMzLiiJIxLlxuICAvL1xuICAvLyBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtYXJyYXktZXhvdGljLW9iamVjdHNcbiAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHtcbiAgICB2YXIgdWludDMySW5kZXggPSBpbmRleCA+Pj4gMDsgLy8gTiA+Pj4gMCBpcyBzaG9ydGhhbmQgZm9yIFRvVWludDMyXG4gICAgaWYgKCcnICsgdWludDMySW5kZXggIT09IGluZGV4IHx8IHVpbnQzMkluZGV4ID09PSA0Mjk0OTY3Mjk1KSB7XG4gICAgICByZXR1cm4gTmFOO1xuICAgIH1cbiAgICBpbmRleCA9IHVpbnQzMkluZGV4O1xuICB9XG4gIHJldHVybiBpbmRleCA8IDAgPyBlbnN1cmVTaXplKGl0ZXIpICsgaW5kZXggOiBpbmRleDtcbn1cblxuZnVuY3Rpb24gcmV0dXJuVHJ1ZSgpIHtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHdob2xlU2xpY2UoYmVnaW4sIGVuZCwgc2l6ZSkge1xuICByZXR1cm4gKFxuICAgICgoYmVnaW4gPT09IDAgJiYgIWlzTmVnKGJlZ2luKSkgfHxcbiAgICAgIChzaXplICE9PSB1bmRlZmluZWQgJiYgYmVnaW4gPD0gLXNpemUpKSAmJlxuICAgIChlbmQgPT09IHVuZGVmaW5lZCB8fCAoc2l6ZSAhPT0gdW5kZWZpbmVkICYmIGVuZCA+PSBzaXplKSlcbiAgKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUJlZ2luKGJlZ2luLCBzaXplKSB7XG4gIHJldHVybiByZXNvbHZlSW5kZXgoYmVnaW4sIHNpemUsIDApO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlRW5kKGVuZCwgc2l6ZSkge1xuICByZXR1cm4gcmVzb2x2ZUluZGV4KGVuZCwgc2l6ZSwgc2l6ZSk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVJbmRleChpbmRleCwgc2l6ZSwgZGVmYXVsdEluZGV4KSB7XG4gIC8vIFNhbml0aXplIGluZGljZXMgdXNpbmcgdGhpcyBzaG9ydGhhbmQgZm9yIFRvSW50MzIoYXJndW1lbnQpXG4gIC8vIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy10b2ludDMyXG4gIHJldHVybiBpbmRleCA9PT0gdW5kZWZpbmVkXG4gICAgPyBkZWZhdWx0SW5kZXhcbiAgICA6IGlzTmVnKGluZGV4KVxuICAgICAgPyBzaXplID09PSBJbmZpbml0eVxuICAgICAgICA/IHNpemVcbiAgICAgICAgOiBNYXRoLm1heCgwLCBzaXplICsgaW5kZXgpIHwgMFxuICAgICAgOiBzaXplID09PSB1bmRlZmluZWQgfHwgc2l6ZSA9PT0gaW5kZXhcbiAgICAgICAgPyBpbmRleFxuICAgICAgICA6IE1hdGgubWluKHNpemUsIGluZGV4KSB8IDA7XG59XG5cbmZ1bmN0aW9uIGlzTmVnKHZhbHVlKSB7XG4gIC8vIEFjY291bnQgZm9yIC0wIHdoaWNoIGlzIG5lZ2F0aXZlLCBidXQgbm90IGxlc3MgdGhhbiAwLlxuICByZXR1cm4gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPT09IC1JbmZpbml0eSk7XG59XG5cbi8vIE5vdGU6IHZhbHVlIGlzIHVuY2hhbmdlZCB0byBub3QgYnJlYWsgaW1tdXRhYmxlLWRldnRvb2xzLlxudmFyIElTX0NPTExFQ1RJT05fU1lNQk9MID0gJ0BAX19JTU1VVEFCTEVfSVRFUkFCTEVfX0BAJztcblxuZnVuY3Rpb24gaXNDb2xsZWN0aW9uKG1heWJlQ29sbGVjdGlvbikge1xuICByZXR1cm4gQm9vbGVhbihtYXliZUNvbGxlY3Rpb24gJiYgbWF5YmVDb2xsZWN0aW9uW0lTX0NPTExFQ1RJT05fU1lNQk9MXSk7XG59XG5cbnZhciBJU19LRVlFRF9TWU1CT0wgPSAnQEBfX0lNTVVUQUJMRV9LRVlFRF9fQEAnO1xuXG5mdW5jdGlvbiBpc0tleWVkKG1heWJlS2V5ZWQpIHtcbiAgcmV0dXJuIEJvb2xlYW4obWF5YmVLZXllZCAmJiBtYXliZUtleWVkW0lTX0tFWUVEX1NZTUJPTF0pO1xufVxuXG52YXIgSVNfSU5ERVhFRF9TWU1CT0wgPSAnQEBfX0lNTVVUQUJMRV9JTkRFWEVEX19AQCc7XG5cbmZ1bmN0aW9uIGlzSW5kZXhlZChtYXliZUluZGV4ZWQpIHtcbiAgcmV0dXJuIEJvb2xlYW4obWF5YmVJbmRleGVkICYmIG1heWJlSW5kZXhlZFtJU19JTkRFWEVEX1NZTUJPTF0pO1xufVxuXG5mdW5jdGlvbiBpc0Fzc29jaWF0aXZlKG1heWJlQXNzb2NpYXRpdmUpIHtcbiAgcmV0dXJuIGlzS2V5ZWQobWF5YmVBc3NvY2lhdGl2ZSkgfHwgaXNJbmRleGVkKG1heWJlQXNzb2NpYXRpdmUpO1xufVxuXG52YXIgQ29sbGVjdGlvbiA9IGZ1bmN0aW9uIENvbGxlY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzQ29sbGVjdGlvbih2YWx1ZSkgPyB2YWx1ZSA6IFNlcSh2YWx1ZSk7XG59O1xuXG52YXIgS2V5ZWRDb2xsZWN0aW9uID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoQ29sbGVjdGlvbikge1xuICBmdW5jdGlvbiBLZXllZENvbGxlY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gaXNLZXllZCh2YWx1ZSkgPyB2YWx1ZSA6IEtleWVkU2VxKHZhbHVlKTtcbiAgfVxuXG4gIGlmICggQ29sbGVjdGlvbiApIEtleWVkQ29sbGVjdGlvbi5fX3Byb3RvX18gPSBDb2xsZWN0aW9uO1xuICBLZXllZENvbGxlY3Rpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZSApO1xuICBLZXllZENvbGxlY3Rpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gS2V5ZWRDb2xsZWN0aW9uO1xuXG4gIHJldHVybiBLZXllZENvbGxlY3Rpb247XG59KENvbGxlY3Rpb24pKTtcblxudmFyIEluZGV4ZWRDb2xsZWN0aW9uID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoQ29sbGVjdGlvbikge1xuICBmdW5jdGlvbiBJbmRleGVkQ29sbGVjdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBpc0luZGV4ZWQodmFsdWUpID8gdmFsdWUgOiBJbmRleGVkU2VxKHZhbHVlKTtcbiAgfVxuXG4gIGlmICggQ29sbGVjdGlvbiApIEluZGV4ZWRDb2xsZWN0aW9uLl9fcHJvdG9fXyA9IENvbGxlY3Rpb247XG4gIEluZGV4ZWRDb2xsZWN0aW9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGUgKTtcbiAgSW5kZXhlZENvbGxlY3Rpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSW5kZXhlZENvbGxlY3Rpb247XG5cbiAgcmV0dXJuIEluZGV4ZWRDb2xsZWN0aW9uO1xufShDb2xsZWN0aW9uKSk7XG5cbnZhciBTZXRDb2xsZWN0aW9uID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoQ29sbGVjdGlvbikge1xuICBmdW5jdGlvbiBTZXRDb2xsZWN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzQ29sbGVjdGlvbih2YWx1ZSkgJiYgIWlzQXNzb2NpYXRpdmUodmFsdWUpID8gdmFsdWUgOiBTZXRTZXEodmFsdWUpO1xuICB9XG5cbiAgaWYgKCBDb2xsZWN0aW9uICkgU2V0Q29sbGVjdGlvbi5fX3Byb3RvX18gPSBDb2xsZWN0aW9uO1xuICBTZXRDb2xsZWN0aW9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGUgKTtcbiAgU2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZXRDb2xsZWN0aW9uO1xuXG4gIHJldHVybiBTZXRDb2xsZWN0aW9uO1xufShDb2xsZWN0aW9uKSk7XG5cbkNvbGxlY3Rpb24uS2V5ZWQgPSBLZXllZENvbGxlY3Rpb247XG5Db2xsZWN0aW9uLkluZGV4ZWQgPSBJbmRleGVkQ29sbGVjdGlvbjtcbkNvbGxlY3Rpb24uU2V0ID0gU2V0Q29sbGVjdGlvbjtcblxudmFyIElTX1NFUV9TWU1CT0wgPSAnQEBfX0lNTVVUQUJMRV9TRVFfX0BAJztcblxuZnVuY3Rpb24gaXNTZXEobWF5YmVTZXEpIHtcbiAgcmV0dXJuIEJvb2xlYW4obWF5YmVTZXEgJiYgbWF5YmVTZXFbSVNfU0VRX1NZTUJPTF0pO1xufVxuXG52YXIgSVNfUkVDT1JEX1NZTUJPTCA9ICdAQF9fSU1NVVRBQkxFX1JFQ09SRF9fQEAnO1xuXG5mdW5jdGlvbiBpc1JlY29yZChtYXliZVJlY29yZCkge1xuICByZXR1cm4gQm9vbGVhbihtYXliZVJlY29yZCAmJiBtYXliZVJlY29yZFtJU19SRUNPUkRfU1lNQk9MXSk7XG59XG5cbmZ1bmN0aW9uIGlzSW1tdXRhYmxlKG1heWJlSW1tdXRhYmxlKSB7XG4gIHJldHVybiBpc0NvbGxlY3Rpb24obWF5YmVJbW11dGFibGUpIHx8IGlzUmVjb3JkKG1heWJlSW1tdXRhYmxlKTtcbn1cblxudmFyIElTX09SREVSRURfU1lNQk9MID0gJ0BAX19JTU1VVEFCTEVfT1JERVJFRF9fQEAnO1xuXG5mdW5jdGlvbiBpc09yZGVyZWQobWF5YmVPcmRlcmVkKSB7XG4gIHJldHVybiBCb29sZWFuKG1heWJlT3JkZXJlZCAmJiBtYXliZU9yZGVyZWRbSVNfT1JERVJFRF9TWU1CT0xdKTtcbn1cblxudmFyIElURVJBVEVfS0VZUyA9IDA7XG52YXIgSVRFUkFURV9WQUxVRVMgPSAxO1xudmFyIElURVJBVEVfRU5UUklFUyA9IDI7XG5cbnZhciBSRUFMX0lURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InO1xuXG52YXIgSVRFUkFUT1JfU1lNQk9MID0gUkVBTF9JVEVSQVRPUl9TWU1CT0wgfHwgRkFVWF9JVEVSQVRPUl9TWU1CT0w7XG5cbnZhciBJdGVyYXRvciA9IGZ1bmN0aW9uIEl0ZXJhdG9yKG5leHQpIHtcbiAgdGhpcy5uZXh0ID0gbmV4dDtcbn07XG5cbkl0ZXJhdG9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgcmV0dXJuICdbSXRlcmF0b3JdJztcbn07XG5cbkl0ZXJhdG9yLktFWVMgPSBJVEVSQVRFX0tFWVM7XG5JdGVyYXRvci5WQUxVRVMgPSBJVEVSQVRFX1ZBTFVFUztcbkl0ZXJhdG9yLkVOVFJJRVMgPSBJVEVSQVRFX0VOVFJJRVM7XG5cbkl0ZXJhdG9yLnByb3RvdHlwZS5pbnNwZWN0ID0gSXRlcmF0b3IucHJvdG90eXBlLnRvU291cmNlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG59O1xuSXRlcmF0b3IucHJvdG90eXBlW0lURVJBVE9SX1NZTUJPTF0gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBpdGVyYXRvclZhbHVlKHR5cGUsIGssIHYsIGl0ZXJhdG9yUmVzdWx0KSB7XG4gIHZhciB2YWx1ZSA9IHR5cGUgPT09IDAgPyBrIDogdHlwZSA9PT0gMSA/IHYgOiBbaywgdl07XG4gIGl0ZXJhdG9yUmVzdWx0XG4gICAgPyAoaXRlcmF0b3JSZXN1bHQudmFsdWUgPSB2YWx1ZSlcbiAgICA6IChpdGVyYXRvclJlc3VsdCA9IHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBkb25lOiBmYWxzZSxcbiAgICAgIH0pO1xuICByZXR1cm4gaXRlcmF0b3JSZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGl0ZXJhdG9yRG9uZSgpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xufVxuXG5mdW5jdGlvbiBoYXNJdGVyYXRvcihtYXliZUl0ZXJhYmxlKSB7XG4gIHJldHVybiAhIWdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSk7XG59XG5cbmZ1bmN0aW9uIGlzSXRlcmF0b3IobWF5YmVJdGVyYXRvcikge1xuICByZXR1cm4gbWF5YmVJdGVyYXRvciAmJiB0eXBlb2YgbWF5YmVJdGVyYXRvci5uZXh0ID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBnZXRJdGVyYXRvcihpdGVyYWJsZSkge1xuICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4oaXRlcmFibGUpO1xuICByZXR1cm4gaXRlcmF0b3JGbiAmJiBpdGVyYXRvckZuLmNhbGwoaXRlcmFibGUpO1xufVxuXG5mdW5jdGlvbiBnZXRJdGVyYXRvckZuKGl0ZXJhYmxlKSB7XG4gIHZhciBpdGVyYXRvckZuID1cbiAgICBpdGVyYWJsZSAmJlxuICAgICgoUkVBTF9JVEVSQVRPUl9TWU1CT0wgJiYgaXRlcmFibGVbUkVBTF9JVEVSQVRPUl9TWU1CT0xdKSB8fFxuICAgICAgaXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gIH1cbn1cblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgdmFsdWUgJiZcbiAgICB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG4gICAgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZS5sZW5ndGgpICYmXG4gICAgdmFsdWUubGVuZ3RoID49IDAgJiZcbiAgICAodmFsdWUubGVuZ3RoID09PSAwXG4gICAgICA/IC8vIE9ubHkge2xlbmd0aDogMH0gaXMgY29uc2lkZXJlZCBBcnJheS1saWtlLlxuICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID09PSAxXG4gICAgICA6IC8vIEFuIG9iamVjdCBpcyBvbmx5IEFycmF5LWxpa2UgaWYgaXQgaGFzIGEgcHJvcGVydHkgd2hlcmUgdGhlIGxhc3QgdmFsdWVcbiAgICAgICAgLy8gaW4gdGhlIGFycmF5LWxpa2UgbWF5IGJlIGZvdW5kICh3aGljaCBjb3VsZCBiZSB1bmRlZmluZWQpLlxuICAgICAgICB2YWx1ZS5oYXNPd25Qcm9wZXJ0eSh2YWx1ZS5sZW5ndGggLSAxKSlcbiAgKTtcbn1cblxudmFyIFNlcSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKENvbGxlY3Rpb24kJDEpIHtcbiAgZnVuY3Rpb24gU2VxKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgID8gZW1wdHlTZXF1ZW5jZSgpXG4gICAgICA6IGlzSW1tdXRhYmxlKHZhbHVlKVxuICAgICAgICA/IHZhbHVlLnRvU2VxKClcbiAgICAgICAgOiBzZXFGcm9tVmFsdWUodmFsdWUpO1xuICB9XG5cbiAgaWYgKCBDb2xsZWN0aW9uJCQxICkgU2VxLl9fcHJvdG9fXyA9IENvbGxlY3Rpb24kJDE7XG4gIFNlcS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBDb2xsZWN0aW9uJCQxICYmIENvbGxlY3Rpb24kJDEucHJvdG90eXBlICk7XG4gIFNlcS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZXE7XG5cbiAgU2VxLnByb3RvdHlwZS50b1NlcSA9IGZ1bmN0aW9uIHRvU2VxICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBTZXEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLl9fdG9TdHJpbmcoJ1NlcSB7JywgJ30nKTtcbiAgfTtcblxuICBTZXEucHJvdG90eXBlLmNhY2hlUmVzdWx0ID0gZnVuY3Rpb24gY2FjaGVSZXN1bHQgKCkge1xuICAgIGlmICghdGhpcy5fY2FjaGUgJiYgdGhpcy5fX2l0ZXJhdGVVbmNhY2hlZCkge1xuICAgICAgdGhpcy5fY2FjaGUgPSB0aGlzLmVudHJ5U2VxKCkudG9BcnJheSgpO1xuICAgICAgdGhpcy5zaXplID0gdGhpcy5fY2FjaGUubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBhYnN0cmFjdCBfX2l0ZXJhdGVVbmNhY2hlZChmbiwgcmV2ZXJzZSlcblxuICBTZXEucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLl9jYWNoZTtcbiAgICBpZiAoY2FjaGUpIHtcbiAgICAgIHZhciBzaXplID0gY2FjaGUubGVuZ3RoO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgd2hpbGUgKGkgIT09IHNpemUpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gY2FjaGVbcmV2ZXJzZSA/IHNpemUgLSArK2kgOiBpKytdO1xuICAgICAgICBpZiAoZm4oZW50cnlbMV0sIGVudHJ5WzBdLCB0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9faXRlcmF0ZVVuY2FjaGVkKGZuLCByZXZlcnNlKTtcbiAgfTtcblxuICAvLyBhYnN0cmFjdCBfX2l0ZXJhdG9yVW5jYWNoZWQodHlwZSwgcmV2ZXJzZSlcblxuICBTZXEucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5fY2FjaGU7XG4gICAgaWYgKGNhY2hlKSB7XG4gICAgICB2YXIgc2l6ZSA9IGNhY2hlLmxlbmd0aDtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaSA9PT0gc2l6ZSkge1xuICAgICAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50cnkgPSBjYWNoZVtyZXZlcnNlID8gc2l6ZSAtICsraSA6IGkrK107XG4gICAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKHR5cGUsIGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX19pdGVyYXRvclVuY2FjaGVkKHR5cGUsIHJldmVyc2UpO1xuICB9O1xuXG4gIHJldHVybiBTZXE7XG59KENvbGxlY3Rpb24pKTtcblxudmFyIEtleWVkU2VxID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoU2VxKSB7XG4gIGZ1bmN0aW9uIEtleWVkU2VxKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgID8gZW1wdHlTZXF1ZW5jZSgpLnRvS2V5ZWRTZXEoKVxuICAgICAgOiBpc0NvbGxlY3Rpb24odmFsdWUpXG4gICAgICAgID8gaXNLZXllZCh2YWx1ZSlcbiAgICAgICAgICA/IHZhbHVlLnRvU2VxKClcbiAgICAgICAgICA6IHZhbHVlLmZyb21FbnRyeVNlcSgpXG4gICAgICAgIDogaXNSZWNvcmQodmFsdWUpXG4gICAgICAgICAgPyB2YWx1ZS50b1NlcSgpXG4gICAgICAgICAgOiBrZXllZFNlcUZyb21WYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBpZiAoIFNlcSApIEtleWVkU2VxLl9fcHJvdG9fXyA9IFNlcTtcbiAgS2V5ZWRTZXEucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggU2VxICYmIFNlcS5wcm90b3R5cGUgKTtcbiAgS2V5ZWRTZXEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gS2V5ZWRTZXE7XG5cbiAgS2V5ZWRTZXEucHJvdG90eXBlLnRvS2V5ZWRTZXEgPSBmdW5jdGlvbiB0b0tleWVkU2VxICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gS2V5ZWRTZXE7XG59KFNlcSkpO1xuXG52YXIgSW5kZXhlZFNlcSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKFNlcSkge1xuICBmdW5jdGlvbiBJbmRleGVkU2VxKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgID8gZW1wdHlTZXF1ZW5jZSgpXG4gICAgICA6IGlzQ29sbGVjdGlvbih2YWx1ZSlcbiAgICAgICAgPyBpc0tleWVkKHZhbHVlKVxuICAgICAgICAgID8gdmFsdWUuZW50cnlTZXEoKVxuICAgICAgICAgIDogdmFsdWUudG9JbmRleGVkU2VxKClcbiAgICAgICAgOiBpc1JlY29yZCh2YWx1ZSlcbiAgICAgICAgICA/IHZhbHVlLnRvU2VxKCkuZW50cnlTZXEoKVxuICAgICAgICAgIDogaW5kZXhlZFNlcUZyb21WYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBpZiAoIFNlcSApIEluZGV4ZWRTZXEuX19wcm90b19fID0gU2VxO1xuICBJbmRleGVkU2VxLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFNlcSAmJiBTZXEucHJvdG90eXBlICk7XG4gIEluZGV4ZWRTZXEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSW5kZXhlZFNlcTtcblxuICBJbmRleGVkU2VxLm9mID0gZnVuY3Rpb24gb2YgKC8qLi4udmFsdWVzKi8pIHtcbiAgICByZXR1cm4gSW5kZXhlZFNlcShhcmd1bWVudHMpO1xuICB9O1xuXG4gIEluZGV4ZWRTZXEucHJvdG90eXBlLnRvSW5kZXhlZFNlcSA9IGZ1bmN0aW9uIHRvSW5kZXhlZFNlcSAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgSW5kZXhlZFNlcS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX190b1N0cmluZygnU2VxIFsnLCAnXScpO1xuICB9O1xuXG4gIHJldHVybiBJbmRleGVkU2VxO1xufShTZXEpKTtcblxudmFyIFNldFNlcSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKFNlcSkge1xuICBmdW5jdGlvbiBTZXRTZXEodmFsdWUpIHtcbiAgICByZXR1cm4gKGlzQ29sbGVjdGlvbih2YWx1ZSkgJiYgIWlzQXNzb2NpYXRpdmUodmFsdWUpXG4gICAgICA/IHZhbHVlXG4gICAgICA6IEluZGV4ZWRTZXEodmFsdWUpXG4gICAgKS50b1NldFNlcSgpO1xuICB9XG5cbiAgaWYgKCBTZXEgKSBTZXRTZXEuX19wcm90b19fID0gU2VxO1xuICBTZXRTZXEucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggU2VxICYmIFNlcS5wcm90b3R5cGUgKTtcbiAgU2V0U2VxLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNldFNlcTtcblxuICBTZXRTZXEub2YgPSBmdW5jdGlvbiBvZiAoLyouLi52YWx1ZXMqLykge1xuICAgIHJldHVybiBTZXRTZXEoYXJndW1lbnRzKTtcbiAgfTtcblxuICBTZXRTZXEucHJvdG90eXBlLnRvU2V0U2VxID0gZnVuY3Rpb24gdG9TZXRTZXEgKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBTZXRTZXE7XG59KFNlcSkpO1xuXG5TZXEuaXNTZXEgPSBpc1NlcTtcblNlcS5LZXllZCA9IEtleWVkU2VxO1xuU2VxLlNldCA9IFNldFNlcTtcblNlcS5JbmRleGVkID0gSW5kZXhlZFNlcTtcblxuU2VxLnByb3RvdHlwZVtJU19TRVFfU1lNQk9MXSA9IHRydWU7XG5cbi8vICNwcmFnbWEgUm9vdCBTZXF1ZW5jZXNcblxudmFyIEFycmF5U2VxID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoSW5kZXhlZFNlcSkge1xuICBmdW5jdGlvbiBBcnJheVNlcShhcnJheSkge1xuICAgIHRoaXMuX2FycmF5ID0gYXJyYXk7XG4gICAgdGhpcy5zaXplID0gYXJyYXkubGVuZ3RoO1xuICB9XG5cbiAgaWYgKCBJbmRleGVkU2VxICkgQXJyYXlTZXEuX19wcm90b19fID0gSW5kZXhlZFNlcTtcbiAgQXJyYXlTZXEucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggSW5kZXhlZFNlcSAmJiBJbmRleGVkU2VxLnByb3RvdHlwZSApO1xuICBBcnJheVNlcS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBcnJheVNlcTtcblxuICBBcnJheVNlcS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChpbmRleCwgbm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5oYXMoaW5kZXgpID8gdGhpcy5fYXJyYXlbd3JhcEluZGV4KHRoaXMsIGluZGV4KV0gOiBub3RTZXRWYWx1ZTtcbiAgfTtcblxuICBBcnJheVNlcS5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciBhcnJheSA9IHRoaXMuX2FycmF5O1xuICAgIHZhciBzaXplID0gYXJyYXkubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSAhPT0gc2l6ZSkge1xuICAgICAgdmFyIGlpID0gcmV2ZXJzZSA/IHNpemUgLSArK2kgOiBpKys7XG4gICAgICBpZiAoZm4oYXJyYXlbaWldLCBpaSwgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaTtcbiAgfTtcblxuICBBcnJheVNlcS5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgYXJyYXkgPSB0aGlzLl9hcnJheTtcbiAgICB2YXIgc2l6ZSA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgaSA9IDA7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaSA9PT0gc2l6ZSkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gICAgICB9XG4gICAgICB2YXIgaWkgPSByZXZlcnNlID8gc2l6ZSAtICsraSA6IGkrKztcbiAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKHR5cGUsIGlpLCBhcnJheVtpaV0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBBcnJheVNlcTtcbn0oSW5kZXhlZFNlcSkpO1xuXG52YXIgT2JqZWN0U2VxID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoS2V5ZWRTZXEpIHtcbiAgZnVuY3Rpb24gT2JqZWN0U2VxKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcbiAgICB0aGlzLl9vYmplY3QgPSBvYmplY3Q7XG4gICAgdGhpcy5fa2V5cyA9IGtleXM7XG4gICAgdGhpcy5zaXplID0ga2V5cy5sZW5ndGg7XG4gIH1cblxuICBpZiAoIEtleWVkU2VxICkgT2JqZWN0U2VxLl9fcHJvdG9fXyA9IEtleWVkU2VxO1xuICBPYmplY3RTZXEucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggS2V5ZWRTZXEgJiYgS2V5ZWRTZXEucHJvdG90eXBlICk7XG4gIE9iamVjdFNlcS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBPYmplY3RTZXE7XG5cbiAgT2JqZWN0U2VxLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGtleSwgbm90U2V0VmFsdWUpIHtcbiAgICBpZiAobm90U2V0VmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhdGhpcy5oYXMoa2V5KSkge1xuICAgICAgcmV0dXJuIG5vdFNldFZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fb2JqZWN0W2tleV07XG4gIH07XG5cbiAgT2JqZWN0U2VxLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBoYXMgKGtleSkge1xuICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuX29iamVjdCwga2V5KTtcbiAgfTtcblxuICBPYmplY3RTZXEucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgb2JqZWN0ID0gdGhpcy5fb2JqZWN0O1xuICAgIHZhciBrZXlzID0gdGhpcy5fa2V5cztcbiAgICB2YXIgc2l6ZSA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSAhPT0gc2l6ZSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbcmV2ZXJzZSA/IHNpemUgLSArK2kgOiBpKytdO1xuICAgICAgaWYgKGZuKG9iamVjdFtrZXldLCBrZXksIHRoaXMpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGk7XG4gIH07XG5cbiAgT2JqZWN0U2VxLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBvYmplY3QgPSB0aGlzLl9vYmplY3Q7XG4gICAgdmFyIGtleXMgPSB0aGlzLl9rZXlzO1xuICAgIHZhciBzaXplID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGkgPSAwO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGkgPT09IHNpemUpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yRG9uZSgpO1xuICAgICAgfVxuICAgICAgdmFyIGtleSA9IGtleXNbcmV2ZXJzZSA/IHNpemUgLSArK2kgOiBpKytdO1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwga2V5LCBvYmplY3Rba2V5XSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIE9iamVjdFNlcTtcbn0oS2V5ZWRTZXEpKTtcbk9iamVjdFNlcS5wcm90b3R5cGVbSVNfT1JERVJFRF9TWU1CT0xdID0gdHJ1ZTtcblxudmFyIENvbGxlY3Rpb25TZXEgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChJbmRleGVkU2VxKSB7XG4gIGZ1bmN0aW9uIENvbGxlY3Rpb25TZXEoY29sbGVjdGlvbikge1xuICAgIHRoaXMuX2NvbGxlY3Rpb24gPSBjb2xsZWN0aW9uO1xuICAgIHRoaXMuc2l6ZSA9IGNvbGxlY3Rpb24ubGVuZ3RoIHx8IGNvbGxlY3Rpb24uc2l6ZTtcbiAgfVxuXG4gIGlmICggSW5kZXhlZFNlcSApIENvbGxlY3Rpb25TZXEuX19wcm90b19fID0gSW5kZXhlZFNlcTtcbiAgQ29sbGVjdGlvblNlcS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBJbmRleGVkU2VxICYmIEluZGV4ZWRTZXEucHJvdG90eXBlICk7XG4gIENvbGxlY3Rpb25TZXEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29sbGVjdGlvblNlcTtcblxuICBDb2xsZWN0aW9uU2VxLnByb3RvdHlwZS5fX2l0ZXJhdGVVbmNhY2hlZCA9IGZ1bmN0aW9uIF9faXRlcmF0ZVVuY2FjaGVkIChmbiwgcmV2ZXJzZSkge1xuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVJlc3VsdCgpLl9faXRlcmF0ZShmbiwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIHZhciBjb2xsZWN0aW9uID0gdGhpcy5fY29sbGVjdGlvbjtcbiAgICB2YXIgaXRlcmF0b3IgPSBnZXRJdGVyYXRvcihjb2xsZWN0aW9uKTtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgaWYgKGlzSXRlcmF0b3IoaXRlcmF0b3IpKSB7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgaWYgKGZuKHN0ZXAudmFsdWUsIGl0ZXJhdGlvbnMrKywgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG5cbiAgQ29sbGVjdGlvblNlcS5wcm90b3R5cGUuX19pdGVyYXRvclVuY2FjaGVkID0gZnVuY3Rpb24gX19pdGVyYXRvclVuY2FjaGVkICh0eXBlLCByZXZlcnNlKSB7XG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVzdWx0KCkuX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgICB9XG4gICAgdmFyIGNvbGxlY3Rpb24gPSB0aGlzLl9jb2xsZWN0aW9uO1xuICAgIHZhciBpdGVyYXRvciA9IGdldEl0ZXJhdG9yKGNvbGxlY3Rpb24pO1xuICAgIGlmICghaXNJdGVyYXRvcihpdGVyYXRvcikpIHtcbiAgICAgIHJldHVybiBuZXcgSXRlcmF0b3IoaXRlcmF0b3JEb25lKTtcbiAgICB9XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICByZXR1cm4gc3RlcC5kb25lID8gc3RlcCA6IGl0ZXJhdG9yVmFsdWUodHlwZSwgaXRlcmF0aW9ucysrLCBzdGVwLnZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQ29sbGVjdGlvblNlcTtcbn0oSW5kZXhlZFNlcSkpO1xuXG4vLyAjIHByYWdtYSBIZWxwZXIgZnVuY3Rpb25zXG5cbnZhciBFTVBUWV9TRVE7XG5cbmZ1bmN0aW9uIGVtcHR5U2VxdWVuY2UoKSB7XG4gIHJldHVybiBFTVBUWV9TRVEgfHwgKEVNUFRZX1NFUSA9IG5ldyBBcnJheVNlcShbXSkpO1xufVxuXG5mdW5jdGlvbiBrZXllZFNlcUZyb21WYWx1ZSh2YWx1ZSkge1xuICB2YXIgc2VxID0gQXJyYXkuaXNBcnJheSh2YWx1ZSlcbiAgICA/IG5ldyBBcnJheVNlcSh2YWx1ZSlcbiAgICA6IGhhc0l0ZXJhdG9yKHZhbHVlKVxuICAgICAgPyBuZXcgQ29sbGVjdGlvblNlcSh2YWx1ZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICBpZiAoc2VxKSB7XG4gICAgcmV0dXJuIHNlcS5mcm9tRW50cnlTZXEoKTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBuZXcgT2JqZWN0U2VxKHZhbHVlKTtcbiAgfVxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdFeHBlY3RlZCBBcnJheSBvciBjb2xsZWN0aW9uIG9iamVjdCBvZiBbaywgdl0gZW50cmllcywgb3Iga2V5ZWQgb2JqZWN0OiAnICtcbiAgICAgIHZhbHVlXG4gICk7XG59XG5cbmZ1bmN0aW9uIGluZGV4ZWRTZXFGcm9tVmFsdWUodmFsdWUpIHtcbiAgdmFyIHNlcSA9IG1heWJlSW5kZXhlZFNlcUZyb21WYWx1ZSh2YWx1ZSk7XG4gIGlmIChzZXEpIHtcbiAgICByZXR1cm4gc2VxO1xuICB9XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgJ0V4cGVjdGVkIEFycmF5IG9yIGNvbGxlY3Rpb24gb2JqZWN0IG9mIHZhbHVlczogJyArIHZhbHVlXG4gICk7XG59XG5cbmZ1bmN0aW9uIHNlcUZyb21WYWx1ZSh2YWx1ZSkge1xuICB2YXIgc2VxID0gbWF5YmVJbmRleGVkU2VxRnJvbVZhbHVlKHZhbHVlKTtcbiAgaWYgKHNlcSkge1xuICAgIHJldHVybiBzZXE7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdFNlcSh2YWx1ZSk7XG4gIH1cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAnRXhwZWN0ZWQgQXJyYXkgb3IgY29sbGVjdGlvbiBvYmplY3Qgb2YgdmFsdWVzLCBvciBrZXllZCBvYmplY3Q6ICcgKyB2YWx1ZVxuICApO1xufVxuXG5mdW5jdGlvbiBtYXliZUluZGV4ZWRTZXFGcm9tVmFsdWUodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKHZhbHVlKVxuICAgID8gbmV3IEFycmF5U2VxKHZhbHVlKVxuICAgIDogaGFzSXRlcmF0b3IodmFsdWUpXG4gICAgICA/IG5ldyBDb2xsZWN0aW9uU2VxKHZhbHVlKVxuICAgICAgOiB1bmRlZmluZWQ7XG59XG5cbnZhciBJU19NQVBfU1lNQk9MID0gJ0BAX19JTU1VVEFCTEVfTUFQX19AQCc7XG5cbmZ1bmN0aW9uIGlzTWFwKG1heWJlTWFwKSB7XG4gIHJldHVybiBCb29sZWFuKG1heWJlTWFwICYmIG1heWJlTWFwW0lTX01BUF9TWU1CT0xdKTtcbn1cblxuZnVuY3Rpb24gaXNPcmRlcmVkTWFwKG1heWJlT3JkZXJlZE1hcCkge1xuICByZXR1cm4gaXNNYXAobWF5YmVPcmRlcmVkTWFwKSAmJiBpc09yZGVyZWQobWF5YmVPcmRlcmVkTWFwKTtcbn1cblxuZnVuY3Rpb24gaXNWYWx1ZU9iamVjdChtYXliZVZhbHVlKSB7XG4gIHJldHVybiBCb29sZWFuKFxuICAgIG1heWJlVmFsdWUgJiZcbiAgICAgIHR5cGVvZiBtYXliZVZhbHVlLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgdHlwZW9mIG1heWJlVmFsdWUuaGFzaENvZGUgPT09ICdmdW5jdGlvbidcbiAgKTtcbn1cblxuLyoqXG4gKiBBbiBleHRlbnNpb24gb2YgdGhlIFwic2FtZS12YWx1ZVwiIGFsZ29yaXRobSBhcyBbZGVzY3JpYmVkIGZvciB1c2UgYnkgRVM2IE1hcFxuICogYW5kIFNldF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwI0tleV9lcXVhbGl0eSlcbiAqXG4gKiBOYU4gaXMgY29uc2lkZXJlZCB0aGUgc2FtZSBhcyBOYU4sIGhvd2V2ZXIgLTAgYW5kIDAgYXJlIGNvbnNpZGVyZWQgdGhlIHNhbWVcbiAqIHZhbHVlLCB3aGljaCBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgYWxnb3JpdGhtIGRlc2NyaWJlZCBieVxuICogW2BPYmplY3QuaXNgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXMpLlxuICpcbiAqIFRoaXMgaXMgZXh0ZW5kZWQgZnVydGhlciB0byBhbGxvdyBPYmplY3RzIHRvIGRlc2NyaWJlIHRoZSB2YWx1ZXMgdGhleVxuICogcmVwcmVzZW50LCBieSB3YXkgb2YgYHZhbHVlT2ZgIG9yIGBlcXVhbHNgIChhbmQgYGhhc2hDb2RlYCkuXG4gKlxuICogTm90ZTogYmVjYXVzZSBvZiB0aGlzIGV4dGVuc2lvbiwgdGhlIGtleSBlcXVhbGl0eSBvZiBJbW11dGFibGUuTWFwIGFuZCB0aGVcbiAqIHZhbHVlIGVxdWFsaXR5IG9mIEltbXV0YWJsZS5TZXQgd2lsbCBkaWZmZXIgZnJvbSBFUzYgTWFwIGFuZCBTZXQuXG4gKlxuICogIyMjIERlZmluaW5nIGN1c3RvbSB2YWx1ZXNcbiAqXG4gKiBUaGUgZWFzaWVzdCB3YXkgdG8gZGVzY3JpYmUgdGhlIHZhbHVlIGFuIG9iamVjdCByZXByZXNlbnRzIGlzIGJ5IGltcGxlbWVudGluZ1xuICogYHZhbHVlT2ZgLiBGb3IgZXhhbXBsZSwgYERhdGVgIHJlcHJlc2VudHMgYSB2YWx1ZSBieSByZXR1cm5pbmcgYSB1bml4XG4gKiB0aW1lc3RhbXAgZm9yIGB2YWx1ZU9mYDpcbiAqXG4gKiAgICAgdmFyIGRhdGUxID0gbmV3IERhdGUoMTIzNDU2Nzg5MDAwMCk7IC8vIEZyaSBGZWIgMTMgMjAwOSAuLi5cbiAqICAgICB2YXIgZGF0ZTIgPSBuZXcgRGF0ZSgxMjM0NTY3ODkwMDAwKTtcbiAqICAgICBkYXRlMS52YWx1ZU9mKCk7IC8vIDEyMzQ1Njc4OTAwMDBcbiAqICAgICBhc3NlcnQoIGRhdGUxICE9PSBkYXRlMiApO1xuICogICAgIGFzc2VydCggSW1tdXRhYmxlLmlzKCBkYXRlMSwgZGF0ZTIgKSApO1xuICpcbiAqIE5vdGU6IG92ZXJyaWRpbmcgYHZhbHVlT2ZgIG1heSBoYXZlIG90aGVyIGltcGxpY2F0aW9ucyBpZiB5b3UgdXNlIHRoaXMgb2JqZWN0XG4gKiB3aGVyZSBKYXZhU2NyaXB0IGV4cGVjdHMgYSBwcmltaXRpdmUsIHN1Y2ggYXMgaW1wbGljaXQgc3RyaW5nIGNvZXJjaW9uLlxuICpcbiAqIEZvciBtb3JlIGNvbXBsZXggdHlwZXMsIGVzcGVjaWFsbHkgY29sbGVjdGlvbnMsIGltcGxlbWVudGluZyBgdmFsdWVPZmAgbWF5XG4gKiBub3QgYmUgcGVyZm9ybWFudC4gQW4gYWx0ZXJuYXRpdmUgaXMgdG8gaW1wbGVtZW50IGBlcXVhbHNgIGFuZCBgaGFzaENvZGVgLlxuICpcbiAqIGBlcXVhbHNgIHRha2VzIGFub3RoZXIgb2JqZWN0LCBwcmVzdW1hYmx5IG9mIHNpbWlsYXIgdHlwZSwgYW5kIHJldHVybnMgdHJ1ZVxuICogaWYgaXQgaXMgZXF1YWwuIEVxdWFsaXR5IGlzIHN5bW1ldHJpY2FsLCBzbyB0aGUgc2FtZSByZXN1bHQgc2hvdWxkIGJlXG4gKiByZXR1cm5lZCBpZiB0aGlzIGFuZCB0aGUgYXJndW1lbnQgYXJlIGZsaXBwZWQuXG4gKlxuICogICAgIGFzc2VydCggYS5lcXVhbHMoYikgPT09IGIuZXF1YWxzKGEpICk7XG4gKlxuICogYGhhc2hDb2RlYCByZXR1cm5zIGEgMzJiaXQgaW50ZWdlciBudW1iZXIgcmVwcmVzZW50aW5nIHRoZSBvYmplY3Qgd2hpY2ggd2lsbFxuICogYmUgdXNlZCB0byBkZXRlcm1pbmUgaG93IHRvIHN0b3JlIHRoZSB2YWx1ZSBvYmplY3QgaW4gYSBNYXAgb3IgU2V0LiBZb3UgbXVzdFxuICogcHJvdmlkZSBib3RoIG9yIG5laXRoZXIgbWV0aG9kcywgb25lIG11c3Qgbm90IGV4aXN0IHdpdGhvdXQgdGhlIG90aGVyLlxuICpcbiAqIEFsc28sIGFuIGltcG9ydGFudCByZWxhdGlvbnNoaXAgYmV0d2VlbiB0aGVzZSBtZXRob2RzIG11c3QgYmUgdXBoZWxkOiBpZiB0d29cbiAqIHZhbHVlcyBhcmUgZXF1YWwsIHRoZXkgKm11c3QqIHJldHVybiB0aGUgc2FtZSBoYXNoQ29kZS4gSWYgdGhlIHZhbHVlcyBhcmUgbm90XG4gKiBlcXVhbCwgdGhleSBtaWdodCBoYXZlIHRoZSBzYW1lIGhhc2hDb2RlOyB0aGlzIGlzIGNhbGxlZCBhIGhhc2ggY29sbGlzaW9uLFxuICogYW5kIHdoaWxlIHVuZGVzaXJhYmxlIGZvciBwZXJmb3JtYW5jZSByZWFzb25zLCBpdCBpcyBhY2NlcHRhYmxlLlxuICpcbiAqICAgICBpZiAoYS5lcXVhbHMoYikpIHtcbiAqICAgICAgIGFzc2VydCggYS5oYXNoQ29kZSgpID09PSBiLmhhc2hDb2RlKCkgKTtcbiAqICAgICB9XG4gKlxuICogQWxsIEltbXV0YWJsZSBjb2xsZWN0aW9ucyBhcmUgVmFsdWUgT2JqZWN0czogdGhleSBpbXBsZW1lbnQgYGVxdWFscygpYFxuICogYW5kIGBoYXNoQ29kZSgpYC5cbiAqL1xuZnVuY3Rpb24gaXModmFsdWVBLCB2YWx1ZUIpIHtcbiAgaWYgKHZhbHVlQSA9PT0gdmFsdWVCIHx8ICh2YWx1ZUEgIT09IHZhbHVlQSAmJiB2YWx1ZUIgIT09IHZhbHVlQikpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoIXZhbHVlQSB8fCAhdmFsdWVCKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChcbiAgICB0eXBlb2YgdmFsdWVBLnZhbHVlT2YgPT09ICdmdW5jdGlvbicgJiZcbiAgICB0eXBlb2YgdmFsdWVCLnZhbHVlT2YgPT09ICdmdW5jdGlvbidcbiAgKSB7XG4gICAgdmFsdWVBID0gdmFsdWVBLnZhbHVlT2YoKTtcbiAgICB2YWx1ZUIgPSB2YWx1ZUIudmFsdWVPZigpO1xuICAgIGlmICh2YWx1ZUEgPT09IHZhbHVlQiB8fCAodmFsdWVBICE9PSB2YWx1ZUEgJiYgdmFsdWVCICE9PSB2YWx1ZUIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCF2YWx1ZUEgfHwgIXZhbHVlQikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gISEoXG4gICAgaXNWYWx1ZU9iamVjdCh2YWx1ZUEpICYmXG4gICAgaXNWYWx1ZU9iamVjdCh2YWx1ZUIpICYmXG4gICAgdmFsdWVBLmVxdWFscyh2YWx1ZUIpXG4gICk7XG59XG5cbnZhciBpbXVsID1cbiAgdHlwZW9mIE1hdGguaW11bCA9PT0gJ2Z1bmN0aW9uJyAmJiBNYXRoLmltdWwoMHhmZmZmZmZmZiwgMikgPT09IC0yXG4gICAgPyBNYXRoLmltdWxcbiAgICA6IGZ1bmN0aW9uIGltdWwoYSwgYikge1xuICAgICAgICBhIHw9IDA7IC8vIGludFxuICAgICAgICBiIHw9IDA7IC8vIGludFxuICAgICAgICB2YXIgYyA9IGEgJiAweGZmZmY7XG4gICAgICAgIHZhciBkID0gYiAmIDB4ZmZmZjtcbiAgICAgICAgLy8gU2hpZnQgYnkgMCBmaXhlcyB0aGUgc2lnbiBvbiB0aGUgaGlnaCBwYXJ0LlxuICAgICAgICByZXR1cm4gKGMgKiBkICsgKCgoKGEgPj4+IDE2KSAqIGQgKyBjICogKGIgPj4+IDE2KSkgPDwgMTYpID4+PiAwKSkgfCAwOyAvLyBpbnRcbiAgICAgIH07XG5cbi8vIHY4IGhhcyBhbiBvcHRpbWl6YXRpb24gZm9yIHN0b3JpbmcgMzEtYml0IHNpZ25lZCBudW1iZXJzLlxuLy8gVmFsdWVzIHdoaWNoIGhhdmUgZWl0aGVyIDAwIG9yIDExIGFzIHRoZSBoaWdoIG9yZGVyIGJpdHMgcXVhbGlmeS5cbi8vIFRoaXMgZnVuY3Rpb24gZHJvcHMgdGhlIGhpZ2hlc3Qgb3JkZXIgYml0IGluIGEgc2lnbmVkIG51bWJlciwgbWFpbnRhaW5pbmdcbi8vIHRoZSBzaWduIGJpdC5cbmZ1bmN0aW9uIHNtaShpMzIpIHtcbiAgcmV0dXJuICgoaTMyID4+PiAxKSAmIDB4NDAwMDAwMDApIHwgKGkzMiAmIDB4YmZmZmZmZmYpO1xufVxuXG52YXIgZGVmYXVsdFZhbHVlT2YgPSBPYmplY3QucHJvdG90eXBlLnZhbHVlT2Y7XG5cbmZ1bmN0aW9uIGhhc2gobykge1xuICBzd2l0Y2ggKHR5cGVvZiBvKSB7XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAvLyBUaGUgaGFzaCB2YWx1ZXMgZm9yIGJ1aWx0LWluIGNvbnN0YW50cyBhcmUgYSAxIHZhbHVlIGZvciBlYWNoIDUtYnl0ZVxuICAgICAgLy8gc2hpZnQgcmVnaW9uIGV4cGVjdCBmb3IgdGhlIGZpcnN0LCB3aGljaCBlbmNvZGVzIHRoZSB2YWx1ZS4gVGhpc1xuICAgICAgLy8gcmVkdWNlcyB0aGUgb2RkcyBvZiBhIGhhc2ggY29sbGlzaW9uIGZvciB0aGVzZSBjb21tb24gdmFsdWVzLlxuICAgICAgcmV0dXJuIG8gPyAweDQyMTA4NDIxIDogMHg0MjEwODQyMDtcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGhhc2hOdW1iZXIobyk7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiBvLmxlbmd0aCA+IFNUUklOR19IQVNIX0NBQ0hFX01JTl9TVFJMRU5cbiAgICAgICAgPyBjYWNoZWRIYXNoU3RyaW5nKG8pXG4gICAgICAgIDogaGFzaFN0cmluZyhvKTtcbiAgICBjYXNlICdvYmplY3QnOlxuICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIGlmIChvID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAweDQyMTA4NDIyO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBvLmhhc2hDb2RlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIERyb3AgYW55IGhpZ2ggYml0cyBmcm9tIGFjY2lkZW50YWxseSBsb25nIGhhc2ggY29kZXMuXG4gICAgICAgIHJldHVybiBzbWkoby5oYXNoQ29kZShvKSk7XG4gICAgICB9XG4gICAgICBpZiAoby52YWx1ZU9mICE9PSBkZWZhdWx0VmFsdWVPZiAmJiB0eXBlb2Ygby52YWx1ZU9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG8gPSBvLnZhbHVlT2Yobyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFzaEpTT2JqKG8pO1xuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICByZXR1cm4gMHg0MjEwODQyMztcbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKHR5cGVvZiBvLnRvU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBoYXNoU3RyaW5nKG8udG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIHR5cGUgJyArIHR5cGVvZiBvICsgJyBjYW5ub3QgYmUgaGFzaGVkLicpO1xuICB9XG59XG5cbi8vIENvbXByZXNzIGFyYml0cmFyaWx5IGxhcmdlIG51bWJlcnMgaW50byBzbWkgaGFzaGVzLlxuZnVuY3Rpb24gaGFzaE51bWJlcihuKSB7XG4gIGlmIChuICE9PSBuIHx8IG4gPT09IEluZmluaXR5KSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgdmFyIGhhc2ggPSBuIHwgMDtcbiAgaWYgKGhhc2ggIT09IG4pIHtcbiAgICBoYXNoIF49IG4gKiAweGZmZmZmZmZmO1xuICB9XG4gIHdoaWxlIChuID4gMHhmZmZmZmZmZikge1xuICAgIG4gLz0gMHhmZmZmZmZmZjtcbiAgICBoYXNoIF49IG47XG4gIH1cbiAgcmV0dXJuIHNtaShoYXNoKTtcbn1cblxuZnVuY3Rpb24gY2FjaGVkSGFzaFN0cmluZyhzdHJpbmcpIHtcbiAgdmFyIGhhc2hlZCA9IHN0cmluZ0hhc2hDYWNoZVtzdHJpbmddO1xuICBpZiAoaGFzaGVkID09PSB1bmRlZmluZWQpIHtcbiAgICBoYXNoZWQgPSBoYXNoU3RyaW5nKHN0cmluZyk7XG4gICAgaWYgKFNUUklOR19IQVNIX0NBQ0hFX1NJWkUgPT09IFNUUklOR19IQVNIX0NBQ0hFX01BWF9TSVpFKSB7XG4gICAgICBTVFJJTkdfSEFTSF9DQUNIRV9TSVpFID0gMDtcbiAgICAgIHN0cmluZ0hhc2hDYWNoZSA9IHt9O1xuICAgIH1cbiAgICBTVFJJTkdfSEFTSF9DQUNIRV9TSVpFKys7XG4gICAgc3RyaW5nSGFzaENhY2hlW3N0cmluZ10gPSBoYXNoZWQ7XG4gIH1cbiAgcmV0dXJuIGhhc2hlZDtcbn1cblxuLy8gaHR0cDovL2pzcGVyZi5jb20vaGFzaGluZy1zdHJpbmdzXG5mdW5jdGlvbiBoYXNoU3RyaW5nKHN0cmluZykge1xuICAvLyBUaGlzIGlzIHRoZSBoYXNoIGZyb20gSlZNXG4gIC8vIFRoZSBoYXNoIGNvZGUgZm9yIGEgc3RyaW5nIGlzIGNvbXB1dGVkIGFzXG4gIC8vIHNbMF0gKiAzMSBeIChuIC0gMSkgKyBzWzFdICogMzEgXiAobiAtIDIpICsgLi4uICsgc1tuIC0gMV0sXG4gIC8vIHdoZXJlIHNbaV0gaXMgdGhlIGl0aCBjaGFyYWN0ZXIgb2YgdGhlIHN0cmluZyBhbmQgbiBpcyB0aGUgbGVuZ3RoIG9mXG4gIC8vIHRoZSBzdHJpbmcuIFdlIFwibW9kXCIgdGhlIHJlc3VsdCB0byBtYWtlIGl0IGJldHdlZW4gMCAoaW5jbHVzaXZlKSBhbmQgMl4zMVxuICAvLyAoZXhjbHVzaXZlKSBieSBkcm9wcGluZyBoaWdoIGJpdHMuXG4gIHZhciBoYXNoZWQgPSAwO1xuICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgc3RyaW5nLmxlbmd0aDsgaWkrKykge1xuICAgIGhhc2hlZCA9ICgzMSAqIGhhc2hlZCArIHN0cmluZy5jaGFyQ29kZUF0KGlpKSkgfCAwO1xuICB9XG4gIHJldHVybiBzbWkoaGFzaGVkKTtcbn1cblxuZnVuY3Rpb24gaGFzaEpTT2JqKG9iaikge1xuICB2YXIgaGFzaGVkO1xuICBpZiAodXNpbmdXZWFrTWFwKSB7XG4gICAgaGFzaGVkID0gd2Vha01hcC5nZXQob2JqKTtcbiAgICBpZiAoaGFzaGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBoYXNoZWQ7XG4gICAgfVxuICB9XG5cbiAgaGFzaGVkID0gb2JqW1VJRF9IQVNIX0tFWV07XG4gIGlmIChoYXNoZWQgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBoYXNoZWQ7XG4gIH1cblxuICBpZiAoIWNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgaGFzaGVkID0gb2JqLnByb3BlcnR5SXNFbnVtZXJhYmxlICYmIG9iai5wcm9wZXJ0eUlzRW51bWVyYWJsZVtVSURfSEFTSF9LRVldO1xuICAgIGlmIChoYXNoZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGhhc2hlZDtcbiAgICB9XG5cbiAgICBoYXNoZWQgPSBnZXRJRU5vZGVIYXNoKG9iaik7XG4gICAgaWYgKGhhc2hlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gaGFzaGVkO1xuICAgIH1cbiAgfVxuXG4gIGhhc2hlZCA9ICsrb2JqSGFzaFVJRDtcbiAgaWYgKG9iakhhc2hVSUQgJiAweDQwMDAwMDAwKSB7XG4gICAgb2JqSGFzaFVJRCA9IDA7XG4gIH1cblxuICBpZiAodXNpbmdXZWFrTWFwKSB7XG4gICAgd2Vha01hcC5zZXQob2JqLCBoYXNoZWQpO1xuICB9IGVsc2UgaWYgKGlzRXh0ZW5zaWJsZSAhPT0gdW5kZWZpbmVkICYmIGlzRXh0ZW5zaWJsZShvYmopID09PSBmYWxzZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm9uLWV4dGVuc2libGUgb2JqZWN0cyBhcmUgbm90IGFsbG93ZWQgYXMga2V5cy4nKTtcbiAgfSBlbHNlIGlmIChjYW5EZWZpbmVQcm9wZXJ0eSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIFVJRF9IQVNIX0tFWSwge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IGhhc2hlZCxcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChcbiAgICBvYmoucHJvcGVydHlJc0VudW1lcmFibGUgIT09IHVuZGVmaW5lZCAmJlxuICAgIG9iai5wcm9wZXJ0eUlzRW51bWVyYWJsZSA9PT0gb2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICApIHtcbiAgICAvLyBTaW5jZSB3ZSBjYW4ndCBkZWZpbmUgYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSBvbiB0aGUgb2JqZWN0XG4gICAgLy8gd2UnbGwgaGlqYWNrIG9uZSBvZiB0aGUgbGVzcy11c2VkIG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXMgdG9cbiAgICAvLyBzYXZlIG91ciBoYXNoIG9uIGl0LiBTaW5jZSB0aGlzIGlzIGEgZnVuY3Rpb24gaXQgd2lsbCBub3Qgc2hvdyB1cCBpblxuICAgIC8vIGBKU09OLnN0cmluZ2lmeWAgd2hpY2ggaXMgd2hhdCB3ZSB3YW50LlxuICAgIG9iai5wcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmFwcGx5KFxuICAgICAgICB0aGlzLFxuICAgICAgICBhcmd1bWVudHNcbiAgICAgICk7XG4gICAgfTtcbiAgICBvYmoucHJvcGVydHlJc0VudW1lcmFibGVbVUlEX0hBU0hfS0VZXSA9IGhhc2hlZDtcbiAgfSBlbHNlIGlmIChvYmoubm9kZVR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIEF0IHRoaXMgcG9pbnQgd2UgY291bGRuJ3QgZ2V0IHRoZSBJRSBgdW5pcXVlSURgIHRvIHVzZSBhcyBhIGhhc2hcbiAgICAvLyBhbmQgd2UgY291bGRuJ3QgdXNlIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgdG8gZXhwbG9pdCB0aGVcbiAgICAvLyBkb250RW51bSBidWcgc28gd2Ugc2ltcGx5IGFkZCB0aGUgYFVJRF9IQVNIX0tFWWAgb24gdGhlIG5vZGVcbiAgICAvLyBpdHNlbGYuXG4gICAgb2JqW1VJRF9IQVNIX0tFWV0gPSBoYXNoZWQ7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gc2V0IGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgb24gb2JqZWN0LicpO1xuICB9XG5cbiAgcmV0dXJuIGhhc2hlZDtcbn1cblxuLy8gR2V0IHJlZmVyZW5jZXMgdG8gRVM1IG9iamVjdCBtZXRob2RzLlxudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGU7XG5cbi8vIFRydWUgaWYgT2JqZWN0LmRlZmluZVByb3BlcnR5IHdvcmtzIGFzIGV4cGVjdGVkLiBJRTggZmFpbHMgdGhpcyB0ZXN0LlxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ0AnLCB7fSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0pKCk7XG5cbi8vIElFIGhhcyBhIGB1bmlxdWVJRGAgcHJvcGVydHkgb24gRE9NIG5vZGVzLiBXZSBjYW4gY29uc3RydWN0IHRoZSBoYXNoIGZyb20gaXRcbi8vIGFuZCBhdm9pZCBtZW1vcnkgbGVha3MgZnJvbSB0aGUgSUUgY2xvbmVOb2RlIGJ1Zy5cbmZ1bmN0aW9uIGdldElFTm9kZUhhc2gobm9kZSkge1xuICBpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID4gMCkge1xuICAgIHN3aXRjaCAobm9kZS5ub2RlVHlwZSkge1xuICAgICAgY2FzZSAxOiAvLyBFbGVtZW50XG4gICAgICAgIHJldHVybiBub2RlLnVuaXF1ZUlEO1xuICAgICAgY2FzZSA5OiAvLyBEb2N1bWVudFxuICAgICAgICByZXR1cm4gbm9kZS5kb2N1bWVudEVsZW1lbnQgJiYgbm9kZS5kb2N1bWVudEVsZW1lbnQudW5pcXVlSUQ7XG4gICAgfVxuICB9XG59XG5cbi8vIElmIHBvc3NpYmxlLCB1c2UgYSBXZWFrTWFwLlxudmFyIHVzaW5nV2Vha01hcCA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nO1xudmFyIHdlYWtNYXA7XG5pZiAodXNpbmdXZWFrTWFwKSB7XG4gIHdlYWtNYXAgPSBuZXcgV2Vha01hcCgpO1xufVxuXG52YXIgb2JqSGFzaFVJRCA9IDA7XG5cbnZhciBVSURfSEFTSF9LRVkgPSAnX19pbW11dGFibGVoYXNoX18nO1xuaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcbiAgVUlEX0hBU0hfS0VZID0gU3ltYm9sKFVJRF9IQVNIX0tFWSk7XG59XG5cbnZhciBTVFJJTkdfSEFTSF9DQUNIRV9NSU5fU1RSTEVOID0gMTY7XG52YXIgU1RSSU5HX0hBU0hfQ0FDSEVfTUFYX1NJWkUgPSAyNTU7XG52YXIgU1RSSU5HX0hBU0hfQ0FDSEVfU0laRSA9IDA7XG52YXIgc3RyaW5nSGFzaENhY2hlID0ge307XG5cbnZhciBUb0tleWVkU2VxdWVuY2UgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChLZXllZFNlcSQkMSkge1xuICBmdW5jdGlvbiBUb0tleWVkU2VxdWVuY2UoaW5kZXhlZCwgdXNlS2V5cykge1xuICAgIHRoaXMuX2l0ZXIgPSBpbmRleGVkO1xuICAgIHRoaXMuX3VzZUtleXMgPSB1c2VLZXlzO1xuICAgIHRoaXMuc2l6ZSA9IGluZGV4ZWQuc2l6ZTtcbiAgfVxuXG4gIGlmICggS2V5ZWRTZXEkJDEgKSBUb0tleWVkU2VxdWVuY2UuX19wcm90b19fID0gS2V5ZWRTZXEkJDE7XG4gIFRvS2V5ZWRTZXF1ZW5jZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBLZXllZFNlcSQkMSAmJiBLZXllZFNlcSQkMS5wcm90b3R5cGUgKTtcbiAgVG9LZXllZFNlcXVlbmNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRvS2V5ZWRTZXF1ZW5jZTtcblxuICBUb0tleWVkU2VxdWVuY2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoa2V5LCBub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9pdGVyLmdldChrZXksIG5vdFNldFZhbHVlKTtcbiAgfTtcblxuICBUb0tleWVkU2VxdWVuY2UucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIGhhcyAoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIuaGFzKGtleSk7XG4gIH07XG5cbiAgVG9LZXllZFNlcXVlbmNlLnByb3RvdHlwZS52YWx1ZVNlcSA9IGZ1bmN0aW9uIHZhbHVlU2VxICgpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlci52YWx1ZVNlcSgpO1xuICB9O1xuXG4gIFRvS2V5ZWRTZXF1ZW5jZS5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uIHJldmVyc2UgKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIHJldmVyc2VkU2VxdWVuY2UgPSByZXZlcnNlRmFjdG9yeSh0aGlzLCB0cnVlKTtcbiAgICBpZiAoIXRoaXMuX3VzZUtleXMpIHtcbiAgICAgIHJldmVyc2VkU2VxdWVuY2UudmFsdWVTZXEgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuX2l0ZXIudG9TZXEoKS5yZXZlcnNlKCk7IH07XG4gICAgfVxuICAgIHJldHVybiByZXZlcnNlZFNlcXVlbmNlO1xuICB9O1xuXG4gIFRvS2V5ZWRTZXF1ZW5jZS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gbWFwIChtYXBwZXIsIGNvbnRleHQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBtYXBwZWRTZXF1ZW5jZSA9IG1hcEZhY3RvcnkodGhpcywgbWFwcGVyLCBjb250ZXh0KTtcbiAgICBpZiAoIXRoaXMuX3VzZUtleXMpIHtcbiAgICAgIG1hcHBlZFNlcXVlbmNlLnZhbHVlU2VxID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLl9pdGVyLnRvU2VxKCkubWFwKG1hcHBlciwgY29udGV4dCk7IH07XG4gICAgfVxuICAgIHJldHVybiBtYXBwZWRTZXF1ZW5jZTtcbiAgfTtcblxuICBUb0tleWVkU2VxdWVuY2UucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzLl9pdGVyLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaykgeyByZXR1cm4gZm4odiwgaywgdGhpcyQxKTsgfSwgcmV2ZXJzZSk7XG4gIH07XG5cbiAgVG9LZXllZFNlcXVlbmNlLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHJldHVybiB0aGlzLl9pdGVyLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gIH07XG5cbiAgcmV0dXJuIFRvS2V5ZWRTZXF1ZW5jZTtcbn0oS2V5ZWRTZXEpKTtcblRvS2V5ZWRTZXF1ZW5jZS5wcm90b3R5cGVbSVNfT1JERVJFRF9TWU1CT0xdID0gdHJ1ZTtcblxudmFyIFRvSW5kZXhlZFNlcXVlbmNlID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoSW5kZXhlZFNlcSQkMSkge1xuICBmdW5jdGlvbiBUb0luZGV4ZWRTZXF1ZW5jZShpdGVyKSB7XG4gICAgdGhpcy5faXRlciA9IGl0ZXI7XG4gICAgdGhpcy5zaXplID0gaXRlci5zaXplO1xuICB9XG5cbiAgaWYgKCBJbmRleGVkU2VxJCQxICkgVG9JbmRleGVkU2VxdWVuY2UuX19wcm90b19fID0gSW5kZXhlZFNlcSQkMTtcbiAgVG9JbmRleGVkU2VxdWVuY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggSW5kZXhlZFNlcSQkMSAmJiBJbmRleGVkU2VxJCQxLnByb3RvdHlwZSApO1xuICBUb0luZGV4ZWRTZXF1ZW5jZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUb0luZGV4ZWRTZXF1ZW5jZTtcblxuICBUb0luZGV4ZWRTZXF1ZW5jZS5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlci5pbmNsdWRlcyh2YWx1ZSk7XG4gIH07XG5cbiAgVG9JbmRleGVkU2VxdWVuY2UucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBpID0gMDtcbiAgICByZXZlcnNlICYmIGVuc3VyZVNpemUodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIuX19pdGVyYXRlKFxuICAgICAgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIGZuKHYsIHJldmVyc2UgPyB0aGlzJDEuc2l6ZSAtICsraSA6IGkrKywgdGhpcyQxKTsgfSxcbiAgICAgIHJldmVyc2VcbiAgICApO1xuICB9O1xuXG4gIFRvSW5kZXhlZFNlcXVlbmNlLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIGl0ZXJhdG9yID0gdGhpcy5faXRlci5fX2l0ZXJhdG9yKElURVJBVEVfVkFMVUVTLCByZXZlcnNlKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgcmV2ZXJzZSAmJiBlbnN1cmVTaXplKHRoaXMpO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICByZXR1cm4gc3RlcC5kb25lXG4gICAgICAgID8gc3RlcFxuICAgICAgICA6IGl0ZXJhdG9yVmFsdWUoXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgcmV2ZXJzZSA/IHRoaXMkMS5zaXplIC0gKytpIDogaSsrLFxuICAgICAgICAgICAgc3RlcC52YWx1ZSxcbiAgICAgICAgICAgIHN0ZXBcbiAgICAgICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBUb0luZGV4ZWRTZXF1ZW5jZTtcbn0oSW5kZXhlZFNlcSkpO1xuXG52YXIgVG9TZXRTZXF1ZW5jZSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKFNldFNlcSQkMSkge1xuICBmdW5jdGlvbiBUb1NldFNlcXVlbmNlKGl0ZXIpIHtcbiAgICB0aGlzLl9pdGVyID0gaXRlcjtcbiAgICB0aGlzLnNpemUgPSBpdGVyLnNpemU7XG4gIH1cblxuICBpZiAoIFNldFNlcSQkMSApIFRvU2V0U2VxdWVuY2UuX19wcm90b19fID0gU2V0U2VxJCQxO1xuICBUb1NldFNlcXVlbmNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFNldFNlcSQkMSAmJiBTZXRTZXEkJDEucHJvdG90eXBlICk7XG4gIFRvU2V0U2VxdWVuY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVG9TZXRTZXF1ZW5jZTtcblxuICBUb1NldFNlcXVlbmNlLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBoYXMgKGtleSkge1xuICAgIHJldHVybiB0aGlzLl9pdGVyLmluY2x1ZGVzKGtleSk7XG4gIH07XG5cbiAgVG9TZXRTZXF1ZW5jZS5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMuX2l0ZXIuX19pdGVyYXRlKGZ1bmN0aW9uICh2KSB7IHJldHVybiBmbih2LCB2LCB0aGlzJDEpOyB9LCByZXZlcnNlKTtcbiAgfTtcblxuICBUb1NldFNlcXVlbmNlLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBpdGVyYXRvciA9IHRoaXMuX2l0ZXIuX19pdGVyYXRvcihJVEVSQVRFX1ZBTFVFUywgcmV2ZXJzZSk7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIHJldHVybiBzdGVwLmRvbmVcbiAgICAgICAgPyBzdGVwXG4gICAgICAgIDogaXRlcmF0b3JWYWx1ZSh0eXBlLCBzdGVwLnZhbHVlLCBzdGVwLnZhbHVlLCBzdGVwKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gVG9TZXRTZXF1ZW5jZTtcbn0oU2V0U2VxKSk7XG5cbnZhciBGcm9tRW50cmllc1NlcXVlbmNlID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoS2V5ZWRTZXEkJDEpIHtcbiAgZnVuY3Rpb24gRnJvbUVudHJpZXNTZXF1ZW5jZShlbnRyaWVzKSB7XG4gICAgdGhpcy5faXRlciA9IGVudHJpZXM7XG4gICAgdGhpcy5zaXplID0gZW50cmllcy5zaXplO1xuICB9XG5cbiAgaWYgKCBLZXllZFNlcSQkMSApIEZyb21FbnRyaWVzU2VxdWVuY2UuX19wcm90b19fID0gS2V5ZWRTZXEkJDE7XG4gIEZyb21FbnRyaWVzU2VxdWVuY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggS2V5ZWRTZXEkJDEgJiYgS2V5ZWRTZXEkJDEucHJvdG90eXBlICk7XG4gIEZyb21FbnRyaWVzU2VxdWVuY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRnJvbUVudHJpZXNTZXF1ZW5jZTtcblxuICBGcm9tRW50cmllc1NlcXVlbmNlLnByb3RvdHlwZS5lbnRyeVNlcSA9IGZ1bmN0aW9uIGVudHJ5U2VxICgpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlci50b1NlcSgpO1xuICB9O1xuXG4gIEZyb21FbnRyaWVzU2VxdWVuY2UucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzLl9pdGVyLl9faXRlcmF0ZShmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgIC8vIENoZWNrIGlmIGVudHJ5IGV4aXN0cyBmaXJzdCBzbyBhcnJheSBhY2Nlc3MgZG9lc24ndCB0aHJvdyBmb3IgaG9sZXNcbiAgICAgIC8vIGluIHRoZSBwYXJlbnQgaXRlcmF0aW9uLlxuICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgIHZhbGlkYXRlRW50cnkoZW50cnkpO1xuICAgICAgICB2YXIgaW5kZXhlZENvbGxlY3Rpb24gPSBpc0NvbGxlY3Rpb24oZW50cnkpO1xuICAgICAgICByZXR1cm4gZm4oXG4gICAgICAgICAgaW5kZXhlZENvbGxlY3Rpb24gPyBlbnRyeS5nZXQoMSkgOiBlbnRyeVsxXSxcbiAgICAgICAgICBpbmRleGVkQ29sbGVjdGlvbiA/IGVudHJ5LmdldCgwKSA6IGVudHJ5WzBdLFxuICAgICAgICAgIHRoaXMkMVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sIHJldmVyc2UpO1xuICB9O1xuXG4gIEZyb21FbnRyaWVzU2VxdWVuY2UucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0gdGhpcy5faXRlci5fX2l0ZXJhdG9yKElURVJBVEVfVkFMVUVTLCByZXZlcnNlKTtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICBpZiAoc3RlcC5kb25lKSB7XG4gICAgICAgICAgcmV0dXJuIHN0ZXA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgZW50cnkgZXhpc3RzIGZpcnN0IHNvIGFycmF5IGFjY2VzcyBkb2Vzbid0IHRocm93IGZvciBob2xlc1xuICAgICAgICAvLyBpbiB0aGUgcGFyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgdmFsaWRhdGVFbnRyeShlbnRyeSk7XG4gICAgICAgICAgdmFyIGluZGV4ZWRDb2xsZWN0aW9uID0gaXNDb2xsZWN0aW9uKGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZShcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICBpbmRleGVkQ29sbGVjdGlvbiA/IGVudHJ5LmdldCgwKSA6IGVudHJ5WzBdLFxuICAgICAgICAgICAgaW5kZXhlZENvbGxlY3Rpb24gPyBlbnRyeS5nZXQoMSkgOiBlbnRyeVsxXSxcbiAgICAgICAgICAgIHN0ZXBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEZyb21FbnRyaWVzU2VxdWVuY2U7XG59KEtleWVkU2VxKSk7XG5cblRvSW5kZXhlZFNlcXVlbmNlLnByb3RvdHlwZS5jYWNoZVJlc3VsdCA9IFRvS2V5ZWRTZXF1ZW5jZS5wcm90b3R5cGUuY2FjaGVSZXN1bHQgPSBUb1NldFNlcXVlbmNlLnByb3RvdHlwZS5jYWNoZVJlc3VsdCA9IEZyb21FbnRyaWVzU2VxdWVuY2UucHJvdG90eXBlLmNhY2hlUmVzdWx0ID0gY2FjaGVSZXN1bHRUaHJvdWdoO1xuXG5mdW5jdGlvbiBmbGlwRmFjdG9yeShjb2xsZWN0aW9uKSB7XG4gIHZhciBmbGlwU2VxdWVuY2UgPSBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbik7XG4gIGZsaXBTZXF1ZW5jZS5faXRlciA9IGNvbGxlY3Rpb247XG4gIGZsaXBTZXF1ZW5jZS5zaXplID0gY29sbGVjdGlvbi5zaXplO1xuICBmbGlwU2VxdWVuY2UuZmxpcCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbGxlY3Rpb247IH07XG4gIGZsaXBTZXF1ZW5jZS5yZXZlcnNlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJldmVyc2VkU2VxdWVuY2UgPSBjb2xsZWN0aW9uLnJldmVyc2UuYXBwbHkodGhpcyk7IC8vIHN1cGVyLnJldmVyc2UoKVxuICAgIHJldmVyc2VkU2VxdWVuY2UuZmxpcCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbGxlY3Rpb24ucmV2ZXJzZSgpOyB9O1xuICAgIHJldHVybiByZXZlcnNlZFNlcXVlbmNlO1xuICB9O1xuICBmbGlwU2VxdWVuY2UuaGFzID0gZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gY29sbGVjdGlvbi5pbmNsdWRlcyhrZXkpOyB9O1xuICBmbGlwU2VxdWVuY2UuaW5jbHVkZXMgPSBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBjb2xsZWN0aW9uLmhhcyhrZXkpOyB9O1xuICBmbGlwU2VxdWVuY2UuY2FjaGVSZXN1bHQgPSBjYWNoZVJlc3VsdFRocm91Z2g7XG4gIGZsaXBTZXF1ZW5jZS5fX2l0ZXJhdGVVbmNhY2hlZCA9IGZ1bmN0aW9uKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByZXR1cm4gY29sbGVjdGlvbi5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIGZuKGssIHYsIHRoaXMkMSkgIT09IGZhbHNlOyB9LCByZXZlcnNlKTtcbiAgfTtcbiAgZmxpcFNlcXVlbmNlLl9faXRlcmF0b3JVbmNhY2hlZCA9IGZ1bmN0aW9uKHR5cGUsIHJldmVyc2UpIHtcbiAgICBpZiAodHlwZSA9PT0gSVRFUkFURV9FTlRSSUVTKSB7XG4gICAgICB2YXIgaXRlcmF0b3IgPSBjb2xsZWN0aW9uLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gICAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIGlmICghc3RlcC5kb25lKSB7XG4gICAgICAgICAgdmFyIGsgPSBzdGVwLnZhbHVlWzBdO1xuICAgICAgICAgIHN0ZXAudmFsdWVbMF0gPSBzdGVwLnZhbHVlWzFdO1xuICAgICAgICAgIHN0ZXAudmFsdWVbMV0gPSBrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGVwO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uLl9faXRlcmF0b3IoXG4gICAgICB0eXBlID09PSBJVEVSQVRFX1ZBTFVFUyA/IElURVJBVEVfS0VZUyA6IElURVJBVEVfVkFMVUVTLFxuICAgICAgcmV2ZXJzZVxuICAgICk7XG4gIH07XG4gIHJldHVybiBmbGlwU2VxdWVuY2U7XG59XG5cbmZ1bmN0aW9uIG1hcEZhY3RvcnkoY29sbGVjdGlvbiwgbWFwcGVyLCBjb250ZXh0KSB7XG4gIHZhciBtYXBwZWRTZXF1ZW5jZSA9IG1ha2VTZXF1ZW5jZShjb2xsZWN0aW9uKTtcbiAgbWFwcGVkU2VxdWVuY2Uuc2l6ZSA9IGNvbGxlY3Rpb24uc2l6ZTtcbiAgbWFwcGVkU2VxdWVuY2UuaGFzID0gZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gY29sbGVjdGlvbi5oYXMoa2V5KTsgfTtcbiAgbWFwcGVkU2VxdWVuY2UuZ2V0ID0gZnVuY3Rpb24gKGtleSwgbm90U2V0VmFsdWUpIHtcbiAgICB2YXIgdiA9IGNvbGxlY3Rpb24uZ2V0KGtleSwgTk9UX1NFVCk7XG4gICAgcmV0dXJuIHYgPT09IE5PVF9TRVRcbiAgICAgID8gbm90U2V0VmFsdWVcbiAgICAgIDogbWFwcGVyLmNhbGwoY29udGV4dCwgdiwga2V5LCBjb2xsZWN0aW9uKTtcbiAgfTtcbiAgbWFwcGVkU2VxdWVuY2UuX19pdGVyYXRlVW5jYWNoZWQgPSBmdW5jdGlvbihmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uX19pdGVyYXRlKFxuICAgICAgZnVuY3Rpb24gKHYsIGssIGMpIHsgcmV0dXJuIGZuKG1hcHBlci5jYWxsKGNvbnRleHQsIHYsIGssIGMpLCBrLCB0aGlzJDEpICE9PSBmYWxzZTsgfSxcbiAgICAgIHJldmVyc2VcbiAgICApO1xuICB9O1xuICBtYXBwZWRTZXF1ZW5jZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbih0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0gY29sbGVjdGlvbi5fX2l0ZXJhdG9yKElURVJBVEVfRU5UUklFUywgcmV2ZXJzZSk7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIGlmIChzdGVwLmRvbmUpIHtcbiAgICAgICAgcmV0dXJuIHN0ZXA7XG4gICAgICB9XG4gICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgdmFyIGtleSA9IGVudHJ5WzBdO1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUoXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGtleSxcbiAgICAgICAgbWFwcGVyLmNhbGwoY29udGV4dCwgZW50cnlbMV0sIGtleSwgY29sbGVjdGlvbiksXG4gICAgICAgIHN0ZXBcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiBtYXBwZWRTZXF1ZW5jZTtcbn1cblxuZnVuY3Rpb24gcmV2ZXJzZUZhY3RvcnkoY29sbGVjdGlvbiwgdXNlS2V5cykge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgcmV2ZXJzZWRTZXF1ZW5jZSA9IG1ha2VTZXF1ZW5jZShjb2xsZWN0aW9uKTtcbiAgcmV2ZXJzZWRTZXF1ZW5jZS5faXRlciA9IGNvbGxlY3Rpb247XG4gIHJldmVyc2VkU2VxdWVuY2Uuc2l6ZSA9IGNvbGxlY3Rpb24uc2l6ZTtcbiAgcmV2ZXJzZWRTZXF1ZW5jZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY29sbGVjdGlvbjsgfTtcbiAgaWYgKGNvbGxlY3Rpb24uZmxpcCkge1xuICAgIHJldmVyc2VkU2VxdWVuY2UuZmxpcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGZsaXBTZXF1ZW5jZSA9IGZsaXBGYWN0b3J5KGNvbGxlY3Rpb24pO1xuICAgICAgZmxpcFNlcXVlbmNlLnJldmVyc2UgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2xsZWN0aW9uLmZsaXAoKTsgfTtcbiAgICAgIHJldHVybiBmbGlwU2VxdWVuY2U7XG4gICAgfTtcbiAgfVxuICByZXZlcnNlZFNlcXVlbmNlLmdldCA9IGZ1bmN0aW9uIChrZXksIG5vdFNldFZhbHVlKSB7IHJldHVybiBjb2xsZWN0aW9uLmdldCh1c2VLZXlzID8ga2V5IDogLTEgLSBrZXksIG5vdFNldFZhbHVlKTsgfTtcbiAgcmV2ZXJzZWRTZXF1ZW5jZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBjb2xsZWN0aW9uLmhhcyh1c2VLZXlzID8ga2V5IDogLTEgLSBrZXkpOyB9O1xuICByZXZlcnNlZFNlcXVlbmNlLmluY2x1ZGVzID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBjb2xsZWN0aW9uLmluY2x1ZGVzKHZhbHVlKTsgfTtcbiAgcmV2ZXJzZWRTZXF1ZW5jZS5jYWNoZVJlc3VsdCA9IGNhY2hlUmVzdWx0VGhyb3VnaDtcbiAgcmV2ZXJzZWRTZXF1ZW5jZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbihmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIGkgPSAwO1xuICAgIHJldmVyc2UgJiYgZW5zdXJlU2l6ZShjb2xsZWN0aW9uKTtcbiAgICByZXR1cm4gY29sbGVjdGlvbi5fX2l0ZXJhdGUoXG4gICAgICBmdW5jdGlvbiAodiwgaykgeyByZXR1cm4gZm4odiwgdXNlS2V5cyA/IGsgOiByZXZlcnNlID8gdGhpcyQxLnNpemUgLSArK2kgOiBpKyssIHRoaXMkMSk7IH0sXG4gICAgICAhcmV2ZXJzZVxuICAgICk7XG4gIH07XG4gIHJldmVyc2VkU2VxdWVuY2UuX19pdGVyYXRvciA9IGZ1bmN0aW9uICh0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHJldmVyc2UgJiYgZW5zdXJlU2l6ZShjb2xsZWN0aW9uKTtcbiAgICB2YXIgaXRlcmF0b3IgPSBjb2xsZWN0aW9uLl9faXRlcmF0b3IoSVRFUkFURV9FTlRSSUVTLCAhcmV2ZXJzZSk7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIGlmIChzdGVwLmRvbmUpIHtcbiAgICAgICAgcmV0dXJuIHN0ZXA7XG4gICAgICB9XG4gICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUoXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHVzZUtleXMgPyBlbnRyeVswXSA6IHJldmVyc2UgPyB0aGlzJDEuc2l6ZSAtICsraSA6IGkrKyxcbiAgICAgICAgZW50cnlbMV0sXG4gICAgICAgIHN0ZXBcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiByZXZlcnNlZFNlcXVlbmNlO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJGYWN0b3J5KGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgY29udGV4dCwgdXNlS2V5cykge1xuICB2YXIgZmlsdGVyU2VxdWVuY2UgPSBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbik7XG4gIGlmICh1c2VLZXlzKSB7XG4gICAgZmlsdGVyU2VxdWVuY2UuaGFzID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIHYgPSBjb2xsZWN0aW9uLmdldChrZXksIE5PVF9TRVQpO1xuICAgICAgcmV0dXJuIHYgIT09IE5PVF9TRVQgJiYgISFwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2LCBrZXksIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgZmlsdGVyU2VxdWVuY2UuZ2V0ID0gZnVuY3Rpb24gKGtleSwgbm90U2V0VmFsdWUpIHtcbiAgICAgIHZhciB2ID0gY29sbGVjdGlvbi5nZXQoa2V5LCBOT1RfU0VUKTtcbiAgICAgIHJldHVybiB2ICE9PSBOT1RfU0VUICYmIHByZWRpY2F0ZS5jYWxsKGNvbnRleHQsIHYsIGtleSwgY29sbGVjdGlvbilcbiAgICAgICAgPyB2XG4gICAgICAgIDogbm90U2V0VmFsdWU7XG4gICAgfTtcbiAgfVxuICBmaWx0ZXJTZXF1ZW5jZS5fX2l0ZXJhdGVVbmNhY2hlZCA9IGZ1bmN0aW9uKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgY29sbGVjdGlvbi5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGssIGMpIHtcbiAgICAgIGlmIChwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2LCBrLCBjKSkge1xuICAgICAgICBpdGVyYXRpb25zKys7XG4gICAgICAgIHJldHVybiBmbih2LCB1c2VLZXlzID8gayA6IGl0ZXJhdGlvbnMgLSAxLCB0aGlzJDEpO1xuICAgICAgfVxuICAgIH0sIHJldmVyc2UpO1xuICAgIHJldHVybiBpdGVyYXRpb25zO1xuICB9O1xuICBmaWx0ZXJTZXF1ZW5jZS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbih0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0gY29sbGVjdGlvbi5fX2l0ZXJhdG9yKElURVJBVEVfRU5UUklFUywgcmV2ZXJzZSk7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIGlmIChzdGVwLmRvbmUpIHtcbiAgICAgICAgICByZXR1cm4gc3RlcDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICB2YXIga2V5ID0gZW50cnlbMF07XG4gICAgICAgIHZhciB2YWx1ZSA9IGVudHJ5WzFdO1xuICAgICAgICBpZiAocHJlZGljYXRlLmNhbGwoY29udGV4dCwgdmFsdWUsIGtleSwgY29sbGVjdGlvbikpIHtcbiAgICAgICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCB1c2VLZXlzID8ga2V5IDogaXRlcmF0aW9ucysrLCB2YWx1ZSwgc3RlcCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIGZpbHRlclNlcXVlbmNlO1xufVxuXG5mdW5jdGlvbiBjb3VudEJ5RmFjdG9yeShjb2xsZWN0aW9uLCBncm91cGVyLCBjb250ZXh0KSB7XG4gIHZhciBncm91cHMgPSBNYXAoKS5hc011dGFibGUoKTtcbiAgY29sbGVjdGlvbi5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGspIHtcbiAgICBncm91cHMudXBkYXRlKGdyb3VwZXIuY2FsbChjb250ZXh0LCB2LCBrLCBjb2xsZWN0aW9uKSwgMCwgZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEgKyAxOyB9KTtcbiAgfSk7XG4gIHJldHVybiBncm91cHMuYXNJbW11dGFibGUoKTtcbn1cblxuZnVuY3Rpb24gZ3JvdXBCeUZhY3RvcnkoY29sbGVjdGlvbiwgZ3JvdXBlciwgY29udGV4dCkge1xuICB2YXIgaXNLZXllZEl0ZXIgPSBpc0tleWVkKGNvbGxlY3Rpb24pO1xuICB2YXIgZ3JvdXBzID0gKGlzT3JkZXJlZChjb2xsZWN0aW9uKSA/IE9yZGVyZWRNYXAoKSA6IE1hcCgpKS5hc011dGFibGUoKTtcbiAgY29sbGVjdGlvbi5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGspIHtcbiAgICBncm91cHMudXBkYXRlKFxuICAgICAgZ3JvdXBlci5jYWxsKGNvbnRleHQsIHYsIGssIGNvbGxlY3Rpb24pLFxuICAgICAgZnVuY3Rpb24gKGEpIHsgcmV0dXJuICgoYSA9IGEgfHwgW10pLCBhLnB1c2goaXNLZXllZEl0ZXIgPyBbaywgdl0gOiB2KSwgYSk7IH1cbiAgICApO1xuICB9KTtcbiAgdmFyIGNvZXJjZSA9IGNvbGxlY3Rpb25DbGFzcyhjb2xsZWN0aW9uKTtcbiAgcmV0dXJuIGdyb3Vwcy5tYXAoZnVuY3Rpb24gKGFycikgeyByZXR1cm4gcmVpZnkoY29sbGVjdGlvbiwgY29lcmNlKGFycikpOyB9KS5hc0ltbXV0YWJsZSgpO1xufVxuXG5mdW5jdGlvbiBzbGljZUZhY3RvcnkoY29sbGVjdGlvbiwgYmVnaW4sIGVuZCwgdXNlS2V5cykge1xuICB2YXIgb3JpZ2luYWxTaXplID0gY29sbGVjdGlvbi5zaXplO1xuXG4gIGlmICh3aG9sZVNsaWNlKGJlZ2luLCBlbmQsIG9yaWdpbmFsU2l6ZSkpIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfVxuXG4gIHZhciByZXNvbHZlZEJlZ2luID0gcmVzb2x2ZUJlZ2luKGJlZ2luLCBvcmlnaW5hbFNpemUpO1xuICB2YXIgcmVzb2x2ZWRFbmQgPSByZXNvbHZlRW5kKGVuZCwgb3JpZ2luYWxTaXplKTtcblxuICAvLyBiZWdpbiBvciBlbmQgd2lsbCBiZSBOYU4gaWYgdGhleSB3ZXJlIHByb3ZpZGVkIGFzIG5lZ2F0aXZlIG51bWJlcnMgYW5kXG4gIC8vIHRoaXMgY29sbGVjdGlvbidzIHNpemUgaXMgdW5rbm93bi4gSW4gdGhhdCBjYXNlLCBjYWNoZSBmaXJzdCBzbyB0aGVyZSBpc1xuICAvLyBhIGtub3duIHNpemUgYW5kIHRoZXNlIGRvIG5vdCByZXNvbHZlIHRvIE5hTi5cbiAgaWYgKHJlc29sdmVkQmVnaW4gIT09IHJlc29sdmVkQmVnaW4gfHwgcmVzb2x2ZWRFbmQgIT09IHJlc29sdmVkRW5kKSB7XG4gICAgcmV0dXJuIHNsaWNlRmFjdG9yeShjb2xsZWN0aW9uLnRvU2VxKCkuY2FjaGVSZXN1bHQoKSwgYmVnaW4sIGVuZCwgdXNlS2V5cyk7XG4gIH1cblxuICAvLyBOb3RlOiByZXNvbHZlZEVuZCBpcyB1bmRlZmluZWQgd2hlbiB0aGUgb3JpZ2luYWwgc2VxdWVuY2UncyBsZW5ndGggaXNcbiAgLy8gdW5rbm93biBhbmQgdGhpcyBzbGljZSBkaWQgbm90IHN1cHBseSBhbiBlbmQgYW5kIHNob3VsZCBjb250YWluIGFsbFxuICAvLyBlbGVtZW50cyBhZnRlciByZXNvbHZlZEJlZ2luLlxuICAvLyBJbiB0aGF0IGNhc2UsIHJlc29sdmVkU2l6ZSB3aWxsIGJlIE5hTiBhbmQgc2xpY2VTaXplIHdpbGwgcmVtYWluIHVuZGVmaW5lZC5cbiAgdmFyIHJlc29sdmVkU2l6ZSA9IHJlc29sdmVkRW5kIC0gcmVzb2x2ZWRCZWdpbjtcbiAgdmFyIHNsaWNlU2l6ZTtcbiAgaWYgKHJlc29sdmVkU2l6ZSA9PT0gcmVzb2x2ZWRTaXplKSB7XG4gICAgc2xpY2VTaXplID0gcmVzb2x2ZWRTaXplIDwgMCA/IDAgOiByZXNvbHZlZFNpemU7XG4gIH1cblxuICB2YXIgc2xpY2VTZXEgPSBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbik7XG5cbiAgLy8gSWYgY29sbGVjdGlvbi5zaXplIGlzIHVuZGVmaW5lZCwgdGhlIHNpemUgb2YgdGhlIHJlYWxpemVkIHNsaWNlU2VxIGlzXG4gIC8vIHVua25vd24gYXQgdGhpcyBwb2ludCB1bmxlc3MgdGhlIG51bWJlciBvZiBpdGVtcyB0byBzbGljZSBpcyAwXG4gIHNsaWNlU2VxLnNpemUgPVxuICAgIHNsaWNlU2l6ZSA9PT0gMCA/IHNsaWNlU2l6ZSA6IChjb2xsZWN0aW9uLnNpemUgJiYgc2xpY2VTaXplKSB8fCB1bmRlZmluZWQ7XG5cbiAgaWYgKCF1c2VLZXlzICYmIGlzU2VxKGNvbGxlY3Rpb24pICYmIHNsaWNlU2l6ZSA+PSAwKSB7XG4gICAgc2xpY2VTZXEuZ2V0ID0gZnVuY3Rpb24oaW5kZXgsIG5vdFNldFZhbHVlKSB7XG4gICAgICBpbmRleCA9IHdyYXBJbmRleCh0aGlzLCBpbmRleCk7XG4gICAgICByZXR1cm4gaW5kZXggPj0gMCAmJiBpbmRleCA8IHNsaWNlU2l6ZVxuICAgICAgICA/IGNvbGxlY3Rpb24uZ2V0KGluZGV4ICsgcmVzb2x2ZWRCZWdpbiwgbm90U2V0VmFsdWUpXG4gICAgICAgIDogbm90U2V0VmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIHNsaWNlU2VxLl9faXRlcmF0ZVVuY2FjaGVkID0gZnVuY3Rpb24oZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIGlmIChzbGljZVNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdGUoZm4sIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgc2tpcHBlZCA9IDA7XG4gICAgdmFyIGlzU2tpcHBpbmcgPSB0cnVlO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICBjb2xsZWN0aW9uLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaykge1xuICAgICAgaWYgKCEoaXNTa2lwcGluZyAmJiAoaXNTa2lwcGluZyA9IHNraXBwZWQrKyA8IHJlc29sdmVkQmVnaW4pKSkge1xuICAgICAgICBpdGVyYXRpb25zKys7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgZm4odiwgdXNlS2V5cyA/IGsgOiBpdGVyYXRpb25zIC0gMSwgdGhpcyQxKSAhPT0gZmFsc2UgJiZcbiAgICAgICAgICBpdGVyYXRpb25zICE9PSBzbGljZVNpemVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0aW9ucztcbiAgfTtcblxuICBzbGljZVNlcS5fX2l0ZXJhdG9yVW5jYWNoZWQgPSBmdW5jdGlvbih0eXBlLCByZXZlcnNlKSB7XG4gICAgaWYgKHNsaWNlU2l6ZSAhPT0gMCAmJiByZXZlcnNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVJlc3VsdCgpLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBpbnN0YW50aWF0aW5nIHBhcmVudCBpdGVyYXRvciBpZiB0YWtpbmcgMC5cbiAgICBpZiAoc2xpY2VTaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGl0ZXJhdG9yRG9uZSk7XG4gICAgfVxuICAgIHZhciBpdGVyYXRvciA9IGNvbGxlY3Rpb24uX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgICB2YXIgc2tpcHBlZCA9IDA7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgd2hpbGUgKHNraXBwZWQrKyA8IHJlc29sdmVkQmVnaW4pIHtcbiAgICAgICAgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgfVxuICAgICAgaWYgKCsraXRlcmF0aW9ucyA+IHNsaWNlU2l6ZSkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gICAgICB9XG4gICAgICB2YXIgc3RlcCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIGlmICh1c2VLZXlzIHx8IHR5cGUgPT09IElURVJBVEVfVkFMVUVTIHx8IHN0ZXAuZG9uZSkge1xuICAgICAgICByZXR1cm4gc3RlcDtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSBJVEVSQVRFX0tFWVMpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgaXRlcmF0aW9ucyAtIDEsIHVuZGVmaW5lZCwgc3RlcCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlcmF0b3JWYWx1ZSh0eXBlLCBpdGVyYXRpb25zIC0gMSwgc3RlcC52YWx1ZVsxXSwgc3RlcCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHNsaWNlU2VxO1xufVxuXG5mdW5jdGlvbiB0YWtlV2hpbGVGYWN0b3J5KGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICB2YXIgdGFrZVNlcXVlbmNlID0gbWFrZVNlcXVlbmNlKGNvbGxlY3Rpb24pO1xuICB0YWtlU2VxdWVuY2UuX19pdGVyYXRlVW5jYWNoZWQgPSBmdW5jdGlvbihmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVzdWx0KCkuX19pdGVyYXRlKGZuLCByZXZlcnNlKTtcbiAgICB9XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIGNvbGxlY3Rpb24uX19pdGVyYXRlKFxuICAgICAgZnVuY3Rpb24gKHYsIGssIGMpIHsgcmV0dXJuIHByZWRpY2F0ZS5jYWxsKGNvbnRleHQsIHYsIGssIGMpICYmICsraXRlcmF0aW9ucyAmJiBmbih2LCBrLCB0aGlzJDEpOyB9XG4gICAgKTtcbiAgICByZXR1cm4gaXRlcmF0aW9ucztcbiAgfTtcbiAgdGFrZVNlcXVlbmNlLl9faXRlcmF0b3JVbmNhY2hlZCA9IGZ1bmN0aW9uKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVJlc3VsdCgpLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gICAgfVxuICAgIHZhciBpdGVyYXRvciA9IGNvbGxlY3Rpb24uX19pdGVyYXRvcihJVEVSQVRFX0VOVFJJRVMsIHJldmVyc2UpO1xuICAgIHZhciBpdGVyYXRpbmcgPSB0cnVlO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFpdGVyYXRpbmcpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yRG9uZSgpO1xuICAgICAgfVxuICAgICAgdmFyIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICBpZiAoc3RlcC5kb25lKSB7XG4gICAgICAgIHJldHVybiBzdGVwO1xuICAgICAgfVxuICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgIHZhciBrID0gZW50cnlbMF07XG4gICAgICB2YXIgdiA9IGVudHJ5WzFdO1xuICAgICAgaWYgKCFwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2LCBrLCB0aGlzJDEpKSB7XG4gICAgICAgIGl0ZXJhdGluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHlwZSA9PT0gSVRFUkFURV9FTlRSSUVTID8gc3RlcCA6IGl0ZXJhdG9yVmFsdWUodHlwZSwgaywgdiwgc3RlcCk7XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiB0YWtlU2VxdWVuY2U7XG59XG5cbmZ1bmN0aW9uIHNraXBXaGlsZUZhY3RvcnkoY29sbGVjdGlvbiwgcHJlZGljYXRlLCBjb250ZXh0LCB1c2VLZXlzKSB7XG4gIHZhciBza2lwU2VxdWVuY2UgPSBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbik7XG4gIHNraXBTZXF1ZW5jZS5fX2l0ZXJhdGVVbmNhY2hlZCA9IGZ1bmN0aW9uKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdGUoZm4sIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgaXNTa2lwcGluZyA9IHRydWU7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIGNvbGxlY3Rpb24uX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrLCBjKSB7XG4gICAgICBpZiAoIShpc1NraXBwaW5nICYmIChpc1NraXBwaW5nID0gcHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwgaywgYykpKSkge1xuICAgICAgICBpdGVyYXRpb25zKys7XG4gICAgICAgIHJldHVybiBmbih2LCB1c2VLZXlzID8gayA6IGl0ZXJhdGlvbnMgLSAxLCB0aGlzJDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBpdGVyYXRpb25zO1xuICB9O1xuICBza2lwU2VxdWVuY2UuX19pdGVyYXRvclVuY2FjaGVkID0gZnVuY3Rpb24odHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVzdWx0KCkuX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKTtcbiAgICB9XG4gICAgdmFyIGl0ZXJhdG9yID0gY29sbGVjdGlvbi5fX2l0ZXJhdG9yKElURVJBVEVfRU5UUklFUywgcmV2ZXJzZSk7XG4gICAgdmFyIHNraXBwaW5nID0gdHJ1ZTtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIHZhciBrO1xuICAgICAgdmFyIHY7XG4gICAgICBkbyB7XG4gICAgICAgIHN0ZXAgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIGlmIChzdGVwLmRvbmUpIHtcbiAgICAgICAgICBpZiAodXNlS2V5cyB8fCB0eXBlID09PSBJVEVSQVRFX1ZBTFVFUykge1xuICAgICAgICAgICAgcmV0dXJuIHN0ZXA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlID09PSBJVEVSQVRFX0tFWVMpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKHR5cGUsIGl0ZXJhdGlvbnMrKywgdW5kZWZpbmVkLCBzdGVwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgaXRlcmF0aW9ucysrLCBzdGVwLnZhbHVlWzFdLCBzdGVwKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICBrID0gZW50cnlbMF07XG4gICAgICAgIHYgPSBlbnRyeVsxXTtcbiAgICAgICAgc2tpcHBpbmcgJiYgKHNraXBwaW5nID0gcHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwgaywgdGhpcyQxKSk7XG4gICAgICB9IHdoaWxlIChza2lwcGluZyk7XG4gICAgICByZXR1cm4gdHlwZSA9PT0gSVRFUkFURV9FTlRSSUVTID8gc3RlcCA6IGl0ZXJhdG9yVmFsdWUodHlwZSwgaywgdiwgc3RlcCk7XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiBza2lwU2VxdWVuY2U7XG59XG5cbmZ1bmN0aW9uIGNvbmNhdEZhY3RvcnkoY29sbGVjdGlvbiwgdmFsdWVzKSB7XG4gIHZhciBpc0tleWVkQ29sbGVjdGlvbiA9IGlzS2V5ZWQoY29sbGVjdGlvbik7XG4gIHZhciBpdGVycyA9IFtjb2xsZWN0aW9uXVxuICAgIC5jb25jYXQodmFsdWVzKVxuICAgIC5tYXAoZnVuY3Rpb24gKHYpIHtcbiAgICAgIGlmICghaXNDb2xsZWN0aW9uKHYpKSB7XG4gICAgICAgIHYgPSBpc0tleWVkQ29sbGVjdGlvblxuICAgICAgICAgID8ga2V5ZWRTZXFGcm9tVmFsdWUodilcbiAgICAgICAgICA6IGluZGV4ZWRTZXFGcm9tVmFsdWUoQXJyYXkuaXNBcnJheSh2KSA/IHYgOiBbdl0pO1xuICAgICAgfSBlbHNlIGlmIChpc0tleWVkQ29sbGVjdGlvbikge1xuICAgICAgICB2ID0gS2V5ZWRDb2xsZWN0aW9uKHYpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHY7XG4gICAgfSlcbiAgICAuZmlsdGVyKGZ1bmN0aW9uICh2KSB7IHJldHVybiB2LnNpemUgIT09IDA7IH0pO1xuXG4gIGlmIChpdGVycy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfVxuXG4gIGlmIChpdGVycy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgc2luZ2xldG9uID0gaXRlcnNbMF07XG4gICAgaWYgKFxuICAgICAgc2luZ2xldG9uID09PSBjb2xsZWN0aW9uIHx8XG4gICAgICAoaXNLZXllZENvbGxlY3Rpb24gJiYgaXNLZXllZChzaW5nbGV0b24pKSB8fFxuICAgICAgKGlzSW5kZXhlZChjb2xsZWN0aW9uKSAmJiBpc0luZGV4ZWQoc2luZ2xldG9uKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBzaW5nbGV0b247XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvbmNhdFNlcSA9IG5ldyBBcnJheVNlcShpdGVycyk7XG4gIGlmIChpc0tleWVkQ29sbGVjdGlvbikge1xuICAgIGNvbmNhdFNlcSA9IGNvbmNhdFNlcS50b0tleWVkU2VxKCk7XG4gIH0gZWxzZSBpZiAoIWlzSW5kZXhlZChjb2xsZWN0aW9uKSkge1xuICAgIGNvbmNhdFNlcSA9IGNvbmNhdFNlcS50b1NldFNlcSgpO1xuICB9XG4gIGNvbmNhdFNlcSA9IGNvbmNhdFNlcS5mbGF0dGVuKHRydWUpO1xuICBjb25jYXRTZXEuc2l6ZSA9IGl0ZXJzLnJlZHVjZShmdW5jdGlvbiAoc3VtLCBzZXEpIHtcbiAgICBpZiAoc3VtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBzaXplID0gc2VxLnNpemU7XG4gICAgICBpZiAoc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBzdW0gKyBzaXplO1xuICAgICAgfVxuICAgIH1cbiAgfSwgMCk7XG4gIHJldHVybiBjb25jYXRTZXE7XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5GYWN0b3J5KGNvbGxlY3Rpb24sIGRlcHRoLCB1c2VLZXlzKSB7XG4gIHZhciBmbGF0U2VxdWVuY2UgPSBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbik7XG4gIGZsYXRTZXF1ZW5jZS5fX2l0ZXJhdGVVbmNhY2hlZCA9IGZ1bmN0aW9uKGZuLCByZXZlcnNlKSB7XG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVzdWx0KCkuX19pdGVyYXRlKGZuLCByZXZlcnNlKTtcbiAgICB9XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHZhciBzdG9wcGVkID0gZmFsc2U7XG4gICAgZnVuY3Rpb24gZmxhdERlZXAoaXRlciwgY3VycmVudERlcHRoKSB7XG4gICAgICBpdGVyLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaykge1xuICAgICAgICBpZiAoKCFkZXB0aCB8fCBjdXJyZW50RGVwdGggPCBkZXB0aCkgJiYgaXNDb2xsZWN0aW9uKHYpKSB7XG4gICAgICAgICAgZmxhdERlZXAodiwgY3VycmVudERlcHRoICsgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgICAgIGlmIChmbih2LCB1c2VLZXlzID8gayA6IGl0ZXJhdGlvbnMgLSAxLCBmbGF0U2VxdWVuY2UpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgc3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhc3RvcHBlZDtcbiAgICAgIH0sIHJldmVyc2UpO1xuICAgIH1cbiAgICBmbGF0RGVlcChjb2xsZWN0aW9uLCAwKTtcbiAgICByZXR1cm4gaXRlcmF0aW9ucztcbiAgfTtcbiAgZmxhdFNlcXVlbmNlLl9faXRlcmF0b3JVbmNhY2hlZCA9IGZ1bmN0aW9uKHR5cGUsIHJldmVyc2UpIHtcbiAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVSZXN1bHQoKS5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0b3IgPSBjb2xsZWN0aW9uLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gICAgdmFyIHN0YWNrID0gW107XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgd2hpbGUgKGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICBpZiAoc3RlcC5kb25lICE9PSBmYWxzZSkge1xuICAgICAgICAgIGl0ZXJhdG9yID0gc3RhY2sucG9wKCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHYgPSBzdGVwLnZhbHVlO1xuICAgICAgICBpZiAodHlwZSA9PT0gSVRFUkFURV9FTlRSSUVTKSB7XG4gICAgICAgICAgdiA9IHZbMV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCghZGVwdGggfHwgc3RhY2subGVuZ3RoIDwgZGVwdGgpICYmIGlzQ29sbGVjdGlvbih2KSkge1xuICAgICAgICAgIHN0YWNrLnB1c2goaXRlcmF0b3IpO1xuICAgICAgICAgIGl0ZXJhdG9yID0gdi5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB1c2VLZXlzID8gc3RlcCA6IGl0ZXJhdG9yVmFsdWUodHlwZSwgaXRlcmF0aW9ucysrLCB2LCBzdGVwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZXJhdG9yRG9uZSgpO1xuICAgIH0pO1xuICB9O1xuICByZXR1cm4gZmxhdFNlcXVlbmNlO1xufVxuXG5mdW5jdGlvbiBmbGF0TWFwRmFjdG9yeShjb2xsZWN0aW9uLCBtYXBwZXIsIGNvbnRleHQpIHtcbiAgdmFyIGNvZXJjZSA9IGNvbGxlY3Rpb25DbGFzcyhjb2xsZWN0aW9uKTtcbiAgcmV0dXJuIGNvbGxlY3Rpb25cbiAgICAudG9TZXEoKVxuICAgIC5tYXAoZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIGNvZXJjZShtYXBwZXIuY2FsbChjb250ZXh0LCB2LCBrLCBjb2xsZWN0aW9uKSk7IH0pXG4gICAgLmZsYXR0ZW4odHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGludGVycG9zZUZhY3RvcnkoY29sbGVjdGlvbiwgc2VwYXJhdG9yKSB7XG4gIHZhciBpbnRlcnBvc2VkU2VxdWVuY2UgPSBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbik7XG4gIGludGVycG9zZWRTZXF1ZW5jZS5zaXplID0gY29sbGVjdGlvbi5zaXplICYmIGNvbGxlY3Rpb24uc2l6ZSAqIDIgLSAxO1xuICBpbnRlcnBvc2VkU2VxdWVuY2UuX19pdGVyYXRlVW5jYWNoZWQgPSBmdW5jdGlvbihmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIGNvbGxlY3Rpb24uX19pdGVyYXRlKFxuICAgICAgZnVuY3Rpb24gKHYpIHsgcmV0dXJuICghaXRlcmF0aW9ucyB8fCBmbihzZXBhcmF0b3IsIGl0ZXJhdGlvbnMrKywgdGhpcyQxKSAhPT0gZmFsc2UpICYmXG4gICAgICAgIGZuKHYsIGl0ZXJhdGlvbnMrKywgdGhpcyQxKSAhPT0gZmFsc2U7IH0sXG4gICAgICByZXZlcnNlXG4gICAgKTtcbiAgICByZXR1cm4gaXRlcmF0aW9ucztcbiAgfTtcbiAgaW50ZXJwb3NlZFNlcXVlbmNlLl9faXRlcmF0b3JVbmNhY2hlZCA9IGZ1bmN0aW9uKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSBjb2xsZWN0aW9uLl9faXRlcmF0b3IoSVRFUkFURV9WQUxVRVMsIHJldmVyc2UpO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB2YXIgc3RlcDtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghc3RlcCB8fCBpdGVyYXRpb25zICUgMikge1xuICAgICAgICBzdGVwID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICBpZiAoc3RlcC5kb25lKSB7XG4gICAgICAgICAgcmV0dXJuIHN0ZXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVyYXRpb25zICUgMlxuICAgICAgICA/IGl0ZXJhdG9yVmFsdWUodHlwZSwgaXRlcmF0aW9ucysrLCBzZXBhcmF0b3IpXG4gICAgICAgIDogaXRlcmF0b3JWYWx1ZSh0eXBlLCBpdGVyYXRpb25zKyssIHN0ZXAudmFsdWUsIHN0ZXApO1xuICAgIH0pO1xuICB9O1xuICByZXR1cm4gaW50ZXJwb3NlZFNlcXVlbmNlO1xufVxuXG5mdW5jdGlvbiBzb3J0RmFjdG9yeShjb2xsZWN0aW9uLCBjb21wYXJhdG9yLCBtYXBwZXIpIHtcbiAgaWYgKCFjb21wYXJhdG9yKSB7XG4gICAgY29tcGFyYXRvciA9IGRlZmF1bHRDb21wYXJhdG9yO1xuICB9XG4gIHZhciBpc0tleWVkQ29sbGVjdGlvbiA9IGlzS2V5ZWQoY29sbGVjdGlvbik7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBlbnRyaWVzID0gY29sbGVjdGlvblxuICAgIC50b1NlcSgpXG4gICAgLm1hcChmdW5jdGlvbiAodiwgaykgeyByZXR1cm4gW2ssIHYsIGluZGV4KyssIG1hcHBlciA/IG1hcHBlcih2LCBrLCBjb2xsZWN0aW9uKSA6IHZdOyB9KVxuICAgIC52YWx1ZVNlcSgpXG4gICAgLnRvQXJyYXkoKTtcbiAgZW50cmllcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBjb21wYXJhdG9yKGFbM10sIGJbM10pIHx8IGFbMl0gLSBiWzJdOyB9KS5mb3JFYWNoKFxuICAgIGlzS2V5ZWRDb2xsZWN0aW9uXG4gICAgICA/IGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgICAgICAgZW50cmllc1tpXS5sZW5ndGggPSAyO1xuICAgICAgICB9XG4gICAgICA6IGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgICAgICAgZW50cmllc1tpXSA9IHZbMV07XG4gICAgICAgIH1cbiAgKTtcbiAgcmV0dXJuIGlzS2V5ZWRDb2xsZWN0aW9uXG4gICAgPyBLZXllZFNlcShlbnRyaWVzKVxuICAgIDogaXNJbmRleGVkKGNvbGxlY3Rpb24pXG4gICAgICA/IEluZGV4ZWRTZXEoZW50cmllcylcbiAgICAgIDogU2V0U2VxKGVudHJpZXMpO1xufVxuXG5mdW5jdGlvbiBtYXhGYWN0b3J5KGNvbGxlY3Rpb24sIGNvbXBhcmF0b3IsIG1hcHBlcikge1xuICBpZiAoIWNvbXBhcmF0b3IpIHtcbiAgICBjb21wYXJhdG9yID0gZGVmYXVsdENvbXBhcmF0b3I7XG4gIH1cbiAgaWYgKG1hcHBlcikge1xuICAgIHZhciBlbnRyeSA9IGNvbGxlY3Rpb25cbiAgICAgIC50b1NlcSgpXG4gICAgICAubWFwKGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBbdiwgbWFwcGVyKHYsIGssIGNvbGxlY3Rpb24pXTsgfSlcbiAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIChtYXhDb21wYXJlKGNvbXBhcmF0b3IsIGFbMV0sIGJbMV0pID8gYiA6IGEpOyB9KTtcbiAgICByZXR1cm4gZW50cnkgJiYgZW50cnlbMF07XG4gIH1cbiAgcmV0dXJuIGNvbGxlY3Rpb24ucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiAobWF4Q29tcGFyZShjb21wYXJhdG9yLCBhLCBiKSA/IGIgOiBhKTsgfSk7XG59XG5cbmZ1bmN0aW9uIG1heENvbXBhcmUoY29tcGFyYXRvciwgYSwgYikge1xuICB2YXIgY29tcCA9IGNvbXBhcmF0b3IoYiwgYSk7XG4gIC8vIGIgaXMgY29uc2lkZXJlZCB0aGUgbmV3IG1heCBpZiB0aGUgY29tcGFyYXRvciBkZWNsYXJlcyB0aGVtIGVxdWFsLCBidXRcbiAgLy8gdGhleSBhcmUgbm90IGVxdWFsIGFuZCBiIGlzIGluIGZhY3QgYSBudWxsaXNoIHZhbHVlLlxuICByZXR1cm4gKFxuICAgIChjb21wID09PSAwICYmIGIgIT09IGEgJiYgKGIgPT09IHVuZGVmaW5lZCB8fCBiID09PSBudWxsIHx8IGIgIT09IGIpKSB8fFxuICAgIGNvbXAgPiAwXG4gICk7XG59XG5cbmZ1bmN0aW9uIHppcFdpdGhGYWN0b3J5KGtleUl0ZXIsIHppcHBlciwgaXRlcnMsIHppcEFsbCkge1xuICB2YXIgemlwU2VxdWVuY2UgPSBtYWtlU2VxdWVuY2Uoa2V5SXRlcik7XG4gIHZhciBzaXplcyA9IG5ldyBBcnJheVNlcShpdGVycykubWFwKGZ1bmN0aW9uIChpKSB7IHJldHVybiBpLnNpemU7IH0pO1xuICB6aXBTZXF1ZW5jZS5zaXplID0gemlwQWxsID8gc2l6ZXMubWF4KCkgOiBzaXplcy5taW4oKTtcbiAgLy8gTm90ZTogdGhpcyBhIGdlbmVyaWMgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBfX2l0ZXJhdGUgaW4gdGVybXMgb2ZcbiAgLy8gX19pdGVyYXRvciB3aGljaCBtYXkgYmUgbW9yZSBnZW5lcmljYWxseSB1c2VmdWwgaW4gdGhlIGZ1dHVyZS5cbiAgemlwU2VxdWVuY2UuX19pdGVyYXRlID0gZnVuY3Rpb24oZm4sIHJldmVyc2UpIHtcbiAgICAvKiBnZW5lcmljOlxuICAgIHZhciBpdGVyYXRvciA9IHRoaXMuX19pdGVyYXRvcihJVEVSQVRFX0VOVFJJRVMsIHJldmVyc2UpO1xuICAgIHZhciBzdGVwO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICBpdGVyYXRpb25zKys7XG4gICAgICBpZiAoZm4oc3RlcC52YWx1ZVsxXSwgc3RlcC52YWx1ZVswXSwgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXRlcmF0aW9ucztcbiAgICAqL1xuICAgIC8vIGluZGV4ZWQ6XG4gICAgdmFyIGl0ZXJhdG9yID0gdGhpcy5fX2l0ZXJhdG9yKElURVJBVEVfVkFMVUVTLCByZXZlcnNlKTtcbiAgICB2YXIgc3RlcDtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgaWYgKGZuKHN0ZXAudmFsdWUsIGl0ZXJhdGlvbnMrKywgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXRlcmF0aW9ucztcbiAgfTtcbiAgemlwU2VxdWVuY2UuX19pdGVyYXRvclVuY2FjaGVkID0gZnVuY3Rpb24odHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBpdGVyYXRvcnMgPSBpdGVycy5tYXAoXG4gICAgICBmdW5jdGlvbiAoaSkgeyByZXR1cm4gKChpID0gQ29sbGVjdGlvbihpKSksIGdldEl0ZXJhdG9yKHJldmVyc2UgPyBpLnJldmVyc2UoKSA6IGkpKTsgfVxuICAgICk7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHZhciBpc0RvbmUgPSBmYWxzZTtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzdGVwcztcbiAgICAgIGlmICghaXNEb25lKSB7XG4gICAgICAgIHN0ZXBzID0gaXRlcmF0b3JzLm1hcChmdW5jdGlvbiAoaSkgeyByZXR1cm4gaS5uZXh0KCk7IH0pO1xuICAgICAgICBpc0RvbmUgPSB6aXBBbGwgPyBzdGVwcy5ldmVyeShmdW5jdGlvbiAocykgeyByZXR1cm4gcy5kb25lOyB9KSA6IHN0ZXBzLnNvbWUoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMuZG9uZTsgfSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNEb25lKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvckRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKFxuICAgICAgICB0eXBlLFxuICAgICAgICBpdGVyYXRpb25zKyssXG4gICAgICAgIHppcHBlci5hcHBseShudWxsLCBzdGVwcy5tYXAoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudmFsdWU7IH0pKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIHppcFNlcXVlbmNlO1xufVxuXG4vLyAjcHJhZ21hIEhlbHBlciBGdW5jdGlvbnNcblxuZnVuY3Rpb24gcmVpZnkoaXRlciwgc2VxKSB7XG4gIHJldHVybiBpdGVyID09PSBzZXEgPyBpdGVyIDogaXNTZXEoaXRlcikgPyBzZXEgOiBpdGVyLmNvbnN0cnVjdG9yKHNlcSk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRW50cnkoZW50cnkpIHtcbiAgaWYgKGVudHJ5ICE9PSBPYmplY3QoZW50cnkpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgW0ssIFZdIHR1cGxlOiAnICsgZW50cnkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3Rpb25DbGFzcyhjb2xsZWN0aW9uKSB7XG4gIHJldHVybiBpc0tleWVkKGNvbGxlY3Rpb24pXG4gICAgPyBLZXllZENvbGxlY3Rpb25cbiAgICA6IGlzSW5kZXhlZChjb2xsZWN0aW9uKVxuICAgICAgPyBJbmRleGVkQ29sbGVjdGlvblxuICAgICAgOiBTZXRDb2xsZWN0aW9uO1xufVxuXG5mdW5jdGlvbiBtYWtlU2VxdWVuY2UoY29sbGVjdGlvbikge1xuICByZXR1cm4gT2JqZWN0LmNyZWF0ZShcbiAgICAoaXNLZXllZChjb2xsZWN0aW9uKVxuICAgICAgPyBLZXllZFNlcVxuICAgICAgOiBpc0luZGV4ZWQoY29sbGVjdGlvbilcbiAgICAgICAgPyBJbmRleGVkU2VxXG4gICAgICAgIDogU2V0U2VxXG4gICAgKS5wcm90b3R5cGVcbiAgKTtcbn1cblxuZnVuY3Rpb24gY2FjaGVSZXN1bHRUaHJvdWdoKCkge1xuICBpZiAodGhpcy5faXRlci5jYWNoZVJlc3VsdCkge1xuICAgIHRoaXMuX2l0ZXIuY2FjaGVSZXN1bHQoKTtcbiAgICB0aGlzLnNpemUgPSB0aGlzLl9pdGVyLnNpemU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmV0dXJuIFNlcS5wcm90b3R5cGUuY2FjaGVSZXN1bHQuY2FsbCh0aGlzKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmF0b3IoYSwgYikge1xuICBpZiAoYSA9PT0gdW5kZWZpbmVkICYmIGIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgaWYgKGEgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIHJldHVybiBhID4gYiA/IDEgOiBhIDwgYiA/IC0xIDogMDtcbn1cblxuLy8gaHR0cDovL2pzcGVyZi5jb20vY29weS1hcnJheS1pbmxpbmVcbmZ1bmN0aW9uIGFyckNvcHkoYXJyLCBvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBsZW4gPSBNYXRoLm1heCgwLCBhcnIubGVuZ3RoIC0gb2Zmc2V0KTtcbiAgdmFyIG5ld0FyciA9IG5ldyBBcnJheShsZW4pO1xuICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgbGVuOyBpaSsrKSB7XG4gICAgbmV3QXJyW2lpXSA9IGFycltpaSArIG9mZnNldF07XG4gIH1cbiAgcmV0dXJuIG5ld0Fycjtcbn1cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZXJyb3IpIHtcbiAgaWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKGVycm9yKTsgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnROb3RJbmZpbml0ZShzaXplKSB7XG4gIGludmFyaWFudChcbiAgICBzaXplICE9PSBJbmZpbml0eSxcbiAgICAnQ2Fubm90IHBlcmZvcm0gdGhpcyBhY3Rpb24gd2l0aCBhbiBpbmZpbml0ZSBzaXplLidcbiAgKTtcbn1cblxuZnVuY3Rpb24gY29lcmNlS2V5UGF0aChrZXlQYXRoKSB7XG4gIGlmIChpc0FycmF5TGlrZShrZXlQYXRoKSAmJiB0eXBlb2Yga2V5UGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4ga2V5UGF0aDtcbiAgfVxuICBpZiAoaXNPcmRlcmVkKGtleVBhdGgpKSB7XG4gICAgcmV0dXJuIGtleVBhdGgudG9BcnJheSgpO1xuICB9XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgJ0ludmFsaWQga2V5UGF0aDogZXhwZWN0ZWQgT3JkZXJlZCBDb2xsZWN0aW9uIG9yIEFycmF5OiAnICsga2V5UGF0aFxuICApO1xufVxuXG5mdW5jdGlvbiBpc1BsYWluT2JqKHZhbHVlKSB7XG4gIHJldHVybiAoXG4gICAgdmFsdWUgJiZcbiAgICAodHlwZW9mIHZhbHVlLmNvbnN0cnVjdG9yICE9PSAnZnVuY3Rpb24nIHx8XG4gICAgICB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lID09PSAnT2JqZWN0JylcbiAgKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIGlzIGEgcG90ZW50aWFsbHktcGVyc2lzdGVudCBkYXRhIHN0cnVjdHVyZSwgZWl0aGVyXG4gKiBwcm92aWRlZCBieSBJbW11dGFibGUuanMgb3IgYSBwbGFpbiBBcnJheSBvciBPYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGlzRGF0YVN0cnVjdHVyZSh2YWx1ZSkge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAoaXNJbW11dGFibGUodmFsdWUpIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IGlzUGxhaW5PYmoodmFsdWUpKVxuICApO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgdmFsdWUgdG8gYSBzdHJpbmcsIGFkZGluZyBxdW90ZXMgaWYgYSBzdHJpbmcgd2FzIHByb3ZpZGVkLlxuICovXG5mdW5jdGlvbiBxdW90ZVN0cmluZyh2YWx1ZSkge1xuICB0cnkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogU3RyaW5nKHZhbHVlKTtcbiAgfSBjYXRjaCAoX2lnbm9yZUVycm9yKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYXMoY29sbGVjdGlvbiwga2V5KSB7XG4gIHJldHVybiBpc0ltbXV0YWJsZShjb2xsZWN0aW9uKVxuICAgID8gY29sbGVjdGlvbi5oYXMoa2V5KVxuICAgIDogaXNEYXRhU3RydWN0dXJlKGNvbGxlY3Rpb24pICYmIGhhc093blByb3BlcnR5LmNhbGwoY29sbGVjdGlvbiwga2V5KTtcbn1cblxuZnVuY3Rpb24gZ2V0KGNvbGxlY3Rpb24sIGtleSwgbm90U2V0VmFsdWUpIHtcbiAgcmV0dXJuIGlzSW1tdXRhYmxlKGNvbGxlY3Rpb24pXG4gICAgPyBjb2xsZWN0aW9uLmdldChrZXksIG5vdFNldFZhbHVlKVxuICAgIDogIWhhcyhjb2xsZWN0aW9uLCBrZXkpXG4gICAgICA/IG5vdFNldFZhbHVlXG4gICAgICA6IHR5cGVvZiBjb2xsZWN0aW9uLmdldCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IGNvbGxlY3Rpb24uZ2V0KGtleSlcbiAgICAgICAgOiBjb2xsZWN0aW9uW2tleV07XG59XG5cbmZ1bmN0aW9uIHNoYWxsb3dDb3B5KGZyb20pIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZnJvbSkpIHtcbiAgICByZXR1cm4gYXJyQ29weShmcm9tKTtcbiAgfVxuICB2YXIgdG8gPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG4gICAgICB0b1trZXldID0gZnJvbVtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdG87XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShjb2xsZWN0aW9uLCBrZXkpIHtcbiAgaWYgKCFpc0RhdGFTdHJ1Y3R1cmUoY29sbGVjdGlvbikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ0Nhbm5vdCB1cGRhdGUgbm9uLWRhdGEtc3RydWN0dXJlIHZhbHVlOiAnICsgY29sbGVjdGlvblxuICAgICk7XG4gIH1cbiAgaWYgKGlzSW1tdXRhYmxlKGNvbGxlY3Rpb24pKSB7XG4gICAgaWYgKCFjb2xsZWN0aW9uLnJlbW92ZSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgJ0Nhbm5vdCB1cGRhdGUgaW1tdXRhYmxlIHZhbHVlIHdpdGhvdXQgLnJlbW92ZSgpIG1ldGhvZDogJyArIGNvbGxlY3Rpb25cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uLnJlbW92ZShrZXkpO1xuICB9XG4gIGlmICghaGFzT3duUHJvcGVydHkuY2FsbChjb2xsZWN0aW9uLCBrZXkpKSB7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH1cbiAgdmFyIGNvbGxlY3Rpb25Db3B5ID0gc2hhbGxvd0NvcHkoY29sbGVjdGlvbik7XG4gIGlmIChBcnJheS5pc0FycmF5KGNvbGxlY3Rpb25Db3B5KSkge1xuICAgIGNvbGxlY3Rpb25Db3B5LnNwbGljZShrZXksIDEpO1xuICB9IGVsc2Uge1xuICAgIGRlbGV0ZSBjb2xsZWN0aW9uQ29weVtrZXldO1xuICB9XG4gIHJldHVybiBjb2xsZWN0aW9uQ29weTtcbn1cblxuZnVuY3Rpb24gc2V0KGNvbGxlY3Rpb24sIGtleSwgdmFsdWUpIHtcbiAgaWYgKCFpc0RhdGFTdHJ1Y3R1cmUoY29sbGVjdGlvbikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ0Nhbm5vdCB1cGRhdGUgbm9uLWRhdGEtc3RydWN0dXJlIHZhbHVlOiAnICsgY29sbGVjdGlvblxuICAgICk7XG4gIH1cbiAgaWYgKGlzSW1tdXRhYmxlKGNvbGxlY3Rpb24pKSB7XG4gICAgaWYgKCFjb2xsZWN0aW9uLnNldCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgJ0Nhbm5vdCB1cGRhdGUgaW1tdXRhYmxlIHZhbHVlIHdpdGhvdXQgLnNldCgpIG1ldGhvZDogJyArIGNvbGxlY3Rpb25cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uLnNldChrZXksIHZhbHVlKTtcbiAgfVxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb2xsZWN0aW9uLCBrZXkpICYmIHZhbHVlID09PSBjb2xsZWN0aW9uW2tleV0pIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfVxuICB2YXIgY29sbGVjdGlvbkNvcHkgPSBzaGFsbG93Q29weShjb2xsZWN0aW9uKTtcbiAgY29sbGVjdGlvbkNvcHlba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gY29sbGVjdGlvbkNvcHk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUluKGNvbGxlY3Rpb24sIGtleVBhdGgsIG5vdFNldFZhbHVlLCB1cGRhdGVyKSB7XG4gIGlmICghdXBkYXRlcikge1xuICAgIHVwZGF0ZXIgPSBub3RTZXRWYWx1ZTtcbiAgICBub3RTZXRWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgfVxuICB2YXIgdXBkYXRlZFZhbHVlID0gdXBkYXRlSW5EZWVwbHkoXG4gICAgaXNJbW11dGFibGUoY29sbGVjdGlvbiksXG4gICAgY29sbGVjdGlvbixcbiAgICBjb2VyY2VLZXlQYXRoKGtleVBhdGgpLFxuICAgIDAsXG4gICAgbm90U2V0VmFsdWUsXG4gICAgdXBkYXRlclxuICApO1xuICByZXR1cm4gdXBkYXRlZFZhbHVlID09PSBOT1RfU0VUID8gbm90U2V0VmFsdWUgOiB1cGRhdGVkVmFsdWU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUluRGVlcGx5KFxuICBpbkltbXV0YWJsZSxcbiAgZXhpc3RpbmcsXG4gIGtleVBhdGgsXG4gIGksXG4gIG5vdFNldFZhbHVlLFxuICB1cGRhdGVyXG4pIHtcbiAgdmFyIHdhc05vdFNldCA9IGV4aXN0aW5nID09PSBOT1RfU0VUO1xuICBpZiAoaSA9PT0ga2V5UGF0aC5sZW5ndGgpIHtcbiAgICB2YXIgZXhpc3RpbmdWYWx1ZSA9IHdhc05vdFNldCA/IG5vdFNldFZhbHVlIDogZXhpc3Rpbmc7XG4gICAgdmFyIG5ld1ZhbHVlID0gdXBkYXRlcihleGlzdGluZ1ZhbHVlKTtcbiAgICByZXR1cm4gbmV3VmFsdWUgPT09IGV4aXN0aW5nVmFsdWUgPyBleGlzdGluZyA6IG5ld1ZhbHVlO1xuICB9XG4gIGlmICghd2FzTm90U2V0ICYmICFpc0RhdGFTdHJ1Y3R1cmUoZXhpc3RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdDYW5ub3QgdXBkYXRlIHdpdGhpbiBub24tZGF0YS1zdHJ1Y3R1cmUgdmFsdWUgaW4gcGF0aCBbJyArXG4gICAgICAgIGtleVBhdGguc2xpY2UoMCwgaSkubWFwKHF1b3RlU3RyaW5nKSArXG4gICAgICAgICddOiAnICtcbiAgICAgICAgZXhpc3RpbmdcbiAgICApO1xuICB9XG4gIHZhciBrZXkgPSBrZXlQYXRoW2ldO1xuICB2YXIgbmV4dEV4aXN0aW5nID0gd2FzTm90U2V0ID8gTk9UX1NFVCA6IGdldChleGlzdGluZywga2V5LCBOT1RfU0VUKTtcbiAgdmFyIG5leHRVcGRhdGVkID0gdXBkYXRlSW5EZWVwbHkoXG4gICAgbmV4dEV4aXN0aW5nID09PSBOT1RfU0VUID8gaW5JbW11dGFibGUgOiBpc0ltbXV0YWJsZShuZXh0RXhpc3RpbmcpLFxuICAgIG5leHRFeGlzdGluZyxcbiAgICBrZXlQYXRoLFxuICAgIGkgKyAxLFxuICAgIG5vdFNldFZhbHVlLFxuICAgIHVwZGF0ZXJcbiAgKTtcbiAgcmV0dXJuIG5leHRVcGRhdGVkID09PSBuZXh0RXhpc3RpbmdcbiAgICA/IGV4aXN0aW5nXG4gICAgOiBuZXh0VXBkYXRlZCA9PT0gTk9UX1NFVFxuICAgICAgPyByZW1vdmUoZXhpc3RpbmcsIGtleSlcbiAgICAgIDogc2V0KFxuICAgICAgICAgIHdhc05vdFNldCA/IChpbkltbXV0YWJsZSA/IGVtcHR5TWFwKCkgOiB7fSkgOiBleGlzdGluZyxcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgbmV4dFVwZGF0ZWRcbiAgICAgICAgKTtcbn1cblxuZnVuY3Rpb24gc2V0SW4oY29sbGVjdGlvbiwga2V5UGF0aCwgdmFsdWUpIHtcbiAgcmV0dXJuIHVwZGF0ZUluKGNvbGxlY3Rpb24sIGtleVBhdGgsIE5PVF9TRVQsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbHVlOyB9KTtcbn1cblxuZnVuY3Rpb24gc2V0SW4kMShrZXlQYXRoLCB2KSB7XG4gIHJldHVybiBzZXRJbih0aGlzLCBrZXlQYXRoLCB2KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSW4oY29sbGVjdGlvbiwga2V5UGF0aCkge1xuICByZXR1cm4gdXBkYXRlSW4oY29sbGVjdGlvbiwga2V5UGF0aCwgZnVuY3Rpb24gKCkgeyByZXR1cm4gTk9UX1NFVDsgfSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUluKGtleVBhdGgpIHtcbiAgcmV0dXJuIHJlbW92ZUluKHRoaXMsIGtleVBhdGgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUoY29sbGVjdGlvbiwga2V5LCBub3RTZXRWYWx1ZSwgdXBkYXRlcikge1xuICByZXR1cm4gdXBkYXRlSW4oY29sbGVjdGlvbiwgW2tleV0sIG5vdFNldFZhbHVlLCB1cGRhdGVyKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlJDEoa2V5LCBub3RTZXRWYWx1ZSwgdXBkYXRlcikge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMVxuICAgID8ga2V5KHRoaXMpXG4gICAgOiB1cGRhdGUodGhpcywga2V5LCBub3RTZXRWYWx1ZSwgdXBkYXRlcik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUluJDEoa2V5UGF0aCwgbm90U2V0VmFsdWUsIHVwZGF0ZXIpIHtcbiAgcmV0dXJuIHVwZGF0ZUluKHRoaXMsIGtleVBhdGgsIG5vdFNldFZhbHVlLCB1cGRhdGVyKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2UoKSB7XG4gIHZhciBpdGVycyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB3aGlsZSAoIGxlbi0tICkgaXRlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICByZXR1cm4gbWVyZ2VJbnRvS2V5ZWRXaXRoKHRoaXMsIGl0ZXJzKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VXaXRoKG1lcmdlcikge1xuICB2YXIgaXRlcnMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gIHdoaWxlICggbGVuLS0gPiAwICkgaXRlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cbiAgaWYgKHR5cGVvZiBtZXJnZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1lcmdlciBmdW5jdGlvbjogJyArIG1lcmdlcik7XG4gIH1cbiAgcmV0dXJuIG1lcmdlSW50b0tleWVkV2l0aCh0aGlzLCBpdGVycywgbWVyZ2VyKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VJbnRvS2V5ZWRXaXRoKGNvbGxlY3Rpb24sIGNvbGxlY3Rpb25zLCBtZXJnZXIpIHtcbiAgdmFyIGl0ZXJzID0gW107XG4gIGZvciAodmFyIGlpID0gMDsgaWkgPCBjb2xsZWN0aW9ucy5sZW5ndGg7IGlpKyspIHtcbiAgICB2YXIgY29sbGVjdGlvbiQxID0gS2V5ZWRDb2xsZWN0aW9uKGNvbGxlY3Rpb25zW2lpXSk7XG4gICAgaWYgKGNvbGxlY3Rpb24kMS5zaXplICE9PSAwKSB7XG4gICAgICBpdGVycy5wdXNoKGNvbGxlY3Rpb24kMSk7XG4gICAgfVxuICB9XG4gIGlmIChpdGVycy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfVxuICBpZiAoXG4gICAgY29sbGVjdGlvbi50b1NlcSgpLnNpemUgPT09IDAgJiZcbiAgICAhY29sbGVjdGlvbi5fX293bmVySUQgJiZcbiAgICBpdGVycy5sZW5ndGggPT09IDFcbiAgKSB7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uY29uc3RydWN0b3IoaXRlcnNbMF0pO1xuICB9XG4gIHJldHVybiBjb2xsZWN0aW9uLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKGNvbGxlY3Rpb24pIHtcbiAgICB2YXIgbWVyZ2VJbnRvQ29sbGVjdGlvbiA9IG1lcmdlclxuICAgICAgPyBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgIHVwZGF0ZShcbiAgICAgICAgICAgIGNvbGxlY3Rpb24sXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBOT1RfU0VULFxuICAgICAgICAgICAgZnVuY3Rpb24gKG9sZFZhbCkgeyByZXR1cm4gKG9sZFZhbCA9PT0gTk9UX1NFVCA/IHZhbHVlIDogbWVyZ2VyKG9sZFZhbCwgdmFsdWUsIGtleSkpOyB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgOiBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgIGNvbGxlY3Rpb24uc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9O1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCBpdGVycy5sZW5ndGg7IGlpKyspIHtcbiAgICAgIGl0ZXJzW2lpXS5mb3JFYWNoKG1lcmdlSW50b0NvbGxlY3Rpb24pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlJDEoY29sbGVjdGlvbikge1xuICB2YXIgc291cmNlcyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKCBsZW4tLSA+IDAgKSBzb3VyY2VzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gIHJldHVybiBtZXJnZVdpdGhTb3VyY2VzKGNvbGxlY3Rpb24sIHNvdXJjZXMpO1xufVxuXG5mdW5jdGlvbiBtZXJnZVdpdGgkMShtZXJnZXIsIGNvbGxlY3Rpb24pIHtcbiAgdmFyIHNvdXJjZXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIHdoaWxlICggbGVuLS0gPiAwICkgc291cmNlc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDIgXTtcblxuICByZXR1cm4gbWVyZ2VXaXRoU291cmNlcyhjb2xsZWN0aW9uLCBzb3VyY2VzLCBtZXJnZXIpO1xufVxuXG5mdW5jdGlvbiBtZXJnZURlZXAoY29sbGVjdGlvbikge1xuICB2YXIgc291cmNlcyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKCBsZW4tLSA+IDAgKSBzb3VyY2VzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gIHJldHVybiBtZXJnZURlZXBXaXRoU291cmNlcyhjb2xsZWN0aW9uLCBzb3VyY2VzKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VEZWVwV2l0aChtZXJnZXIsIGNvbGxlY3Rpb24pIHtcbiAgdmFyIHNvdXJjZXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIHdoaWxlICggbGVuLS0gPiAwICkgc291cmNlc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDIgXTtcblxuICByZXR1cm4gbWVyZ2VEZWVwV2l0aFNvdXJjZXMoY29sbGVjdGlvbiwgc291cmNlcywgbWVyZ2VyKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VEZWVwV2l0aFNvdXJjZXMoY29sbGVjdGlvbiwgc291cmNlcywgbWVyZ2VyKSB7XG4gIHJldHVybiBtZXJnZVdpdGhTb3VyY2VzKGNvbGxlY3Rpb24sIHNvdXJjZXMsIGRlZXBNZXJnZXJXaXRoKG1lcmdlcikpO1xufVxuXG5mdW5jdGlvbiBtZXJnZVdpdGhTb3VyY2VzKGNvbGxlY3Rpb24sIHNvdXJjZXMsIG1lcmdlcikge1xuICBpZiAoIWlzRGF0YVN0cnVjdHVyZShjb2xsZWN0aW9uKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnQ2Fubm90IG1lcmdlIGludG8gbm9uLWRhdGEtc3RydWN0dXJlIHZhbHVlOiAnICsgY29sbGVjdGlvblxuICAgICk7XG4gIH1cbiAgaWYgKGlzSW1tdXRhYmxlKGNvbGxlY3Rpb24pKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBtZXJnZXIgPT09ICdmdW5jdGlvbicgJiYgY29sbGVjdGlvbi5tZXJnZVdpdGhcbiAgICAgID8gY29sbGVjdGlvbi5tZXJnZVdpdGguYXBwbHkoY29sbGVjdGlvbiwgWyBtZXJnZXIgXS5jb25jYXQoIHNvdXJjZXMgKSlcbiAgICAgIDogY29sbGVjdGlvbi5tZXJnZVxuICAgICAgICA/IGNvbGxlY3Rpb24ubWVyZ2UuYXBwbHkoY29sbGVjdGlvbiwgc291cmNlcylcbiAgICAgICAgOiBjb2xsZWN0aW9uLmNvbmNhdC5hcHBseShjb2xsZWN0aW9uLCBzb3VyY2VzKTtcbiAgfVxuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbik7XG4gIHZhciBtZXJnZWQgPSBjb2xsZWN0aW9uO1xuICB2YXIgQ29sbGVjdGlvbiQkMSA9IGlzQXJyYXkgPyBJbmRleGVkQ29sbGVjdGlvbiA6IEtleWVkQ29sbGVjdGlvbjtcbiAgdmFyIG1lcmdlSXRlbSA9IGlzQXJyYXlcbiAgICA/IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAvLyBDb3B5IG9uIHdyaXRlXG4gICAgICAgIGlmIChtZXJnZWQgPT09IGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICBtZXJnZWQgPSBzaGFsbG93Q29weShtZXJnZWQpO1xuICAgICAgICB9XG4gICAgICAgIG1lcmdlZC5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICA6IGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIHZhciBoYXNWYWwgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKG1lcmdlZCwga2V5KTtcbiAgICAgICAgdmFyIG5leHRWYWwgPVxuICAgICAgICAgIGhhc1ZhbCAmJiBtZXJnZXIgPyBtZXJnZXIobWVyZ2VkW2tleV0sIHZhbHVlLCBrZXkpIDogdmFsdWU7XG4gICAgICAgIGlmICghaGFzVmFsIHx8IG5leHRWYWwgIT09IG1lcmdlZFtrZXldKSB7XG4gICAgICAgICAgLy8gQ29weSBvbiB3cml0ZVxuICAgICAgICAgIGlmIChtZXJnZWQgPT09IGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIG1lcmdlZCA9IHNoYWxsb3dDb3B5KG1lcmdlZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1lcmdlZFtrZXldID0gbmV4dFZhbDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgQ29sbGVjdGlvbiQkMShzb3VyY2VzW2ldKS5mb3JFYWNoKG1lcmdlSXRlbSk7XG4gIH1cbiAgcmV0dXJuIG1lcmdlZDtcbn1cblxuZnVuY3Rpb24gZGVlcE1lcmdlcldpdGgobWVyZ2VyKSB7XG4gIGZ1bmN0aW9uIGRlZXBNZXJnZXIob2xkVmFsdWUsIG5ld1ZhbHVlLCBrZXkpIHtcbiAgICByZXR1cm4gaXNEYXRhU3RydWN0dXJlKG9sZFZhbHVlKSAmJiBpc0RhdGFTdHJ1Y3R1cmUobmV3VmFsdWUpXG4gICAgICA/IG1lcmdlV2l0aFNvdXJjZXMob2xkVmFsdWUsIFtuZXdWYWx1ZV0sIGRlZXBNZXJnZXIpXG4gICAgICA6IG1lcmdlclxuICAgICAgICA/IG1lcmdlcihvbGRWYWx1ZSwgbmV3VmFsdWUsIGtleSlcbiAgICAgICAgOiBuZXdWYWx1ZTtcbiAgfVxuICByZXR1cm4gZGVlcE1lcmdlcjtcbn1cblxuZnVuY3Rpb24gbWVyZ2VEZWVwJDEoKSB7XG4gIHZhciBpdGVycyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB3aGlsZSAoIGxlbi0tICkgaXRlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICByZXR1cm4gbWVyZ2VEZWVwV2l0aFNvdXJjZXModGhpcywgaXRlcnMpO1xufVxuXG5mdW5jdGlvbiBtZXJnZURlZXBXaXRoJDEobWVyZ2VyKSB7XG4gIHZhciBpdGVycyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKCBsZW4tLSA+IDAgKSBpdGVyc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICByZXR1cm4gbWVyZ2VEZWVwV2l0aFNvdXJjZXModGhpcywgaXRlcnMsIG1lcmdlcik7XG59XG5cbmZ1bmN0aW9uIG1lcmdlSW4oa2V5UGF0aCkge1xuICB2YXIgaXRlcnMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gIHdoaWxlICggbGVuLS0gPiAwICkgaXRlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cbiAgcmV0dXJuIHVwZGF0ZUluKHRoaXMsIGtleVBhdGgsIGVtcHR5TWFwKCksIGZ1bmN0aW9uIChtKSB7IHJldHVybiBtZXJnZVdpdGhTb3VyY2VzKG0sIGl0ZXJzKTsgfSk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlRGVlcEluKGtleVBhdGgpIHtcbiAgdmFyIGl0ZXJzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICB3aGlsZSAoIGxlbi0tID4gMCApIGl0ZXJzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gIHJldHVybiB1cGRhdGVJbih0aGlzLCBrZXlQYXRoLCBlbXB0eU1hcCgpLCBmdW5jdGlvbiAobSkgeyByZXR1cm4gbWVyZ2VEZWVwV2l0aFNvdXJjZXMobSwgaXRlcnMpOyB9XG4gICk7XG59XG5cbmZ1bmN0aW9uIHdpdGhNdXRhdGlvbnMoZm4pIHtcbiAgdmFyIG11dGFibGUgPSB0aGlzLmFzTXV0YWJsZSgpO1xuICBmbihtdXRhYmxlKTtcbiAgcmV0dXJuIG11dGFibGUud2FzQWx0ZXJlZCgpID8gbXV0YWJsZS5fX2Vuc3VyZU93bmVyKHRoaXMuX19vd25lcklEKSA6IHRoaXM7XG59XG5cbmZ1bmN0aW9uIGFzTXV0YWJsZSgpIHtcbiAgcmV0dXJuIHRoaXMuX19vd25lcklEID8gdGhpcyA6IHRoaXMuX19lbnN1cmVPd25lcihuZXcgT3duZXJJRCgpKTtcbn1cblxuZnVuY3Rpb24gYXNJbW11dGFibGUoKSB7XG4gIHJldHVybiB0aGlzLl9fZW5zdXJlT3duZXIoKTtcbn1cblxuZnVuY3Rpb24gd2FzQWx0ZXJlZCgpIHtcbiAgcmV0dXJuIHRoaXMuX19hbHRlcmVkO1xufVxuXG52YXIgTWFwID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoS2V5ZWRDb2xsZWN0aW9uJCQxKSB7XG4gIGZ1bmN0aW9uIE1hcCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICA/IGVtcHR5TWFwKClcbiAgICAgIDogaXNNYXAodmFsdWUpICYmICFpc09yZGVyZWQodmFsdWUpXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiBlbXB0eU1hcCgpLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICAgICAgdmFyIGl0ZXIgPSBLZXllZENvbGxlY3Rpb24kJDEodmFsdWUpO1xuICAgICAgICAgICAgYXNzZXJ0Tm90SW5maW5pdGUoaXRlci5zaXplKTtcbiAgICAgICAgICAgIGl0ZXIuZm9yRWFjaChmdW5jdGlvbiAodiwgaykgeyByZXR1cm4gbWFwLnNldChrLCB2KTsgfSk7XG4gICAgICAgICAgfSk7XG4gIH1cblxuICBpZiAoIEtleWVkQ29sbGVjdGlvbiQkMSApIE1hcC5fX3Byb3RvX18gPSBLZXllZENvbGxlY3Rpb24kJDE7XG4gIE1hcC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBLZXllZENvbGxlY3Rpb24kJDEgJiYgS2V5ZWRDb2xsZWN0aW9uJCQxLnByb3RvdHlwZSApO1xuICBNYXAucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFwO1xuXG4gIE1hcC5vZiA9IGZ1bmN0aW9uIG9mICgpIHtcbiAgICB2YXIga2V5VmFsdWVzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKCBsZW4tLSApIGtleVZhbHVlc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgcmV0dXJuIGVtcHR5TWFwKCkud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobWFwKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleVZhbHVlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBpZiAoaSArIDEgPj0ga2V5VmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyB2YWx1ZSBmb3Iga2V5OiAnICsga2V5VmFsdWVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBtYXAuc2V0KGtleVZhbHVlc1tpXSwga2V5VmFsdWVzW2kgKyAxXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgTWFwLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RvU3RyaW5nKCdNYXAgeycsICd9Jyk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBBY2Nlc3NcblxuICBNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoaywgbm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcm9vdFxuICAgICAgPyB0aGlzLl9yb290LmdldCgwLCB1bmRlZmluZWQsIGssIG5vdFNldFZhbHVlKVxuICAgICAgOiBub3RTZXRWYWx1ZTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIE1vZGlmaWNhdGlvblxuXG4gIE1hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0IChrLCB2KSB7XG4gICAgcmV0dXJuIHVwZGF0ZU1hcCh0aGlzLCBrLCB2KTtcbiAgfTtcblxuICBNYXAucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSAoaykge1xuICAgIHJldHVybiB1cGRhdGVNYXAodGhpcywgaywgTk9UX1NFVCk7XG4gIH07XG5cbiAgTWFwLnByb3RvdHlwZS5kZWxldGVBbGwgPSBmdW5jdGlvbiBkZWxldGVBbGwgKGtleXMpIHtcbiAgICB2YXIgY29sbGVjdGlvbiA9IENvbGxlY3Rpb24oa2V5cyk7XG5cbiAgICBpZiAoY29sbGVjdGlvbi5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBtYXAucmVtb3ZlKGtleSk7IH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIE1hcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3duZXJJRCkge1xuICAgICAgdGhpcy5zaXplID0gMDtcbiAgICAgIHRoaXMuX3Jvb3QgPSBudWxsO1xuICAgICAgdGhpcy5fX2hhc2ggPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9fYWx0ZXJlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIGVtcHR5TWFwKCk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBDb21wb3NpdGlvblxuXG4gIE1hcC5wcm90b3R5cGUuc29ydCA9IGZ1bmN0aW9uIHNvcnQgKGNvbXBhcmF0b3IpIHtcbiAgICAvLyBMYXRlIGJpbmRpbmdcbiAgICByZXR1cm4gT3JkZXJlZE1hcChzb3J0RmFjdG9yeSh0aGlzLCBjb21wYXJhdG9yKSk7XG4gIH07XG5cbiAgTWFwLnByb3RvdHlwZS5zb3J0QnkgPSBmdW5jdGlvbiBzb3J0QnkgKG1hcHBlciwgY29tcGFyYXRvcikge1xuICAgIC8vIExhdGUgYmluZGluZ1xuICAgIHJldHVybiBPcmRlcmVkTWFwKHNvcnRGYWN0b3J5KHRoaXMsIGNvbXBhcmF0b3IsIG1hcHBlcikpO1xuICB9O1xuXG4gIE1hcC5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gbWFwIChtYXBwZXIsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgIG1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIG1hcC5zZXQoa2V5LCBtYXBwZXIuY2FsbChjb250ZXh0LCB2YWx1ZSwga2V5LCBtYXApKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgTXV0YWJpbGl0eVxuXG4gIE1hcC5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICByZXR1cm4gbmV3IE1hcEl0ZXJhdG9yKHRoaXMsIHR5cGUsIHJldmVyc2UpO1xuICB9O1xuXG4gIE1hcC5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHRoaXMuX3Jvb3QgJiZcbiAgICAgIHRoaXMuX3Jvb3QuaXRlcmF0ZShmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgICByZXR1cm4gZm4oZW50cnlbMV0sIGVudHJ5WzBdLCB0aGlzJDEpO1xuICAgICAgfSwgcmV2ZXJzZSk7XG4gICAgcmV0dXJuIGl0ZXJhdGlvbnM7XG4gIH07XG5cbiAgTWFwLnByb3RvdHlwZS5fX2Vuc3VyZU93bmVyID0gZnVuY3Rpb24gX19lbnN1cmVPd25lciAob3duZXJJRCkge1xuICAgIGlmIChvd25lcklEID09PSB0aGlzLl9fb3duZXJJRCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICghb3duZXJJRCkge1xuICAgICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZW1wdHlNYXAoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19vd25lcklEID0gb3duZXJJRDtcbiAgICAgIHRoaXMuX19hbHRlcmVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VNYXAodGhpcy5zaXplLCB0aGlzLl9yb290LCBvd25lcklELCB0aGlzLl9faGFzaCk7XG4gIH07XG5cbiAgcmV0dXJuIE1hcDtcbn0oS2V5ZWRDb2xsZWN0aW9uKSk7XG5cbk1hcC5pc01hcCA9IGlzTWFwO1xuXG52YXIgTWFwUHJvdG90eXBlID0gTWFwLnByb3RvdHlwZTtcbk1hcFByb3RvdHlwZVtJU19NQVBfU1lNQk9MXSA9IHRydWU7XG5NYXBQcm90b3R5cGVbREVMRVRFXSA9IE1hcFByb3RvdHlwZS5yZW1vdmU7XG5NYXBQcm90b3R5cGUucmVtb3ZlQWxsID0gTWFwUHJvdG90eXBlLmRlbGV0ZUFsbDtcbk1hcFByb3RvdHlwZS5zZXRJbiA9IHNldEluJDE7XG5NYXBQcm90b3R5cGUucmVtb3ZlSW4gPSBNYXBQcm90b3R5cGUuZGVsZXRlSW4gPSBkZWxldGVJbjtcbk1hcFByb3RvdHlwZS51cGRhdGUgPSB1cGRhdGUkMTtcbk1hcFByb3RvdHlwZS51cGRhdGVJbiA9IHVwZGF0ZUluJDE7XG5NYXBQcm90b3R5cGUubWVyZ2UgPSBNYXBQcm90b3R5cGUuY29uY2F0ID0gbWVyZ2U7XG5NYXBQcm90b3R5cGUubWVyZ2VXaXRoID0gbWVyZ2VXaXRoO1xuTWFwUHJvdG90eXBlLm1lcmdlRGVlcCA9IG1lcmdlRGVlcCQxO1xuTWFwUHJvdG90eXBlLm1lcmdlRGVlcFdpdGggPSBtZXJnZURlZXBXaXRoJDE7XG5NYXBQcm90b3R5cGUubWVyZ2VJbiA9IG1lcmdlSW47XG5NYXBQcm90b3R5cGUubWVyZ2VEZWVwSW4gPSBtZXJnZURlZXBJbjtcbk1hcFByb3RvdHlwZS53aXRoTXV0YXRpb25zID0gd2l0aE11dGF0aW9ucztcbk1hcFByb3RvdHlwZS53YXNBbHRlcmVkID0gd2FzQWx0ZXJlZDtcbk1hcFByb3RvdHlwZS5hc0ltbXV0YWJsZSA9IGFzSW1tdXRhYmxlO1xuTWFwUHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gTWFwUHJvdG90eXBlLmFzTXV0YWJsZSA9IGFzTXV0YWJsZTtcbk1hcFByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlc3VsdCwgYXJyKSB7XG4gIHJldHVybiByZXN1bHQuc2V0KGFyclswXSwgYXJyWzFdKTtcbn07XG5NYXBQcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqLmFzSW1tdXRhYmxlKCk7XG59O1xuXG4vLyAjcHJhZ21hIFRyaWUgTm9kZXNcblxudmFyIEFycmF5TWFwTm9kZSA9IGZ1bmN0aW9uIEFycmF5TWFwTm9kZShvd25lcklELCBlbnRyaWVzKSB7XG4gIHRoaXMub3duZXJJRCA9IG93bmVySUQ7XG4gIHRoaXMuZW50cmllcyA9IGVudHJpZXM7XG59O1xuXG5BcnJheU1hcE5vZGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoc2hpZnQsIGtleUhhc2gsIGtleSwgbm90U2V0VmFsdWUpIHtcbiAgdmFyIGVudHJpZXMgPSB0aGlzLmVudHJpZXM7XG4gIGZvciAodmFyIGlpID0gMCwgbGVuID0gZW50cmllcy5sZW5ndGg7IGlpIDwgbGVuOyBpaSsrKSB7XG4gICAgaWYgKGlzKGtleSwgZW50cmllc1tpaV1bMF0pKSB7XG4gICAgICByZXR1cm4gZW50cmllc1tpaV1bMV07XG4gICAgfVxuICB9XG4gIHJldHVybiBub3RTZXRWYWx1ZTtcbn07XG5cbkFycmF5TWFwTm9kZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlIChvd25lcklELCBzaGlmdCwga2V5SGFzaCwga2V5LCB2YWx1ZSwgZGlkQ2hhbmdlU2l6ZSwgZGlkQWx0ZXIpIHtcbiAgdmFyIHJlbW92ZWQgPSB2YWx1ZSA9PT0gTk9UX1NFVDtcblxuICB2YXIgZW50cmllcyA9IHRoaXMuZW50cmllcztcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBlbnRyaWVzLmxlbmd0aDtcbiAgZm9yICg7IGlkeCA8IGxlbjsgaWR4KyspIHtcbiAgICBpZiAoaXMoa2V5LCBlbnRyaWVzW2lkeF1bMF0pKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgdmFyIGV4aXN0cyA9IGlkeCA8IGxlbjtcblxuICBpZiAoZXhpc3RzID8gZW50cmllc1tpZHhdWzFdID09PSB2YWx1ZSA6IHJlbW92ZWQpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIFNldFJlZihkaWRBbHRlcik7XG4gIChyZW1vdmVkIHx8ICFleGlzdHMpICYmIFNldFJlZihkaWRDaGFuZ2VTaXplKTtcblxuICBpZiAocmVtb3ZlZCAmJiBlbnRyaWVzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybjsgLy8gdW5kZWZpbmVkXG4gIH1cblxuICBpZiAoIWV4aXN0cyAmJiAhcmVtb3ZlZCAmJiBlbnRyaWVzLmxlbmd0aCA+PSBNQVhfQVJSQVlfTUFQX1NJWkUpIHtcbiAgICByZXR1cm4gY3JlYXRlTm9kZXMob3duZXJJRCwgZW50cmllcywga2V5LCB2YWx1ZSk7XG4gIH1cblxuICB2YXIgaXNFZGl0YWJsZSA9IG93bmVySUQgJiYgb3duZXJJRCA9PT0gdGhpcy5vd25lcklEO1xuICB2YXIgbmV3RW50cmllcyA9IGlzRWRpdGFibGUgPyBlbnRyaWVzIDogYXJyQ29weShlbnRyaWVzKTtcblxuICBpZiAoZXhpc3RzKSB7XG4gICAgaWYgKHJlbW92ZWQpIHtcbiAgICAgIGlkeCA9PT0gbGVuIC0gMVxuICAgICAgICA/IG5ld0VudHJpZXMucG9wKClcbiAgICAgICAgOiAobmV3RW50cmllc1tpZHhdID0gbmV3RW50cmllcy5wb3AoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0VudHJpZXNbaWR4XSA9IFtrZXksIHZhbHVlXTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbmV3RW50cmllcy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH1cblxuICBpZiAoaXNFZGl0YWJsZSkge1xuICAgIHRoaXMuZW50cmllcyA9IG5ld0VudHJpZXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gbmV3IEFycmF5TWFwTm9kZShvd25lcklELCBuZXdFbnRyaWVzKTtcbn07XG5cbnZhciBCaXRtYXBJbmRleGVkTm9kZSA9IGZ1bmN0aW9uIEJpdG1hcEluZGV4ZWROb2RlKG93bmVySUQsIGJpdG1hcCwgbm9kZXMpIHtcbiAgdGhpcy5vd25lcklEID0gb3duZXJJRDtcbiAgdGhpcy5iaXRtYXAgPSBiaXRtYXA7XG4gIHRoaXMubm9kZXMgPSBub2Rlcztcbn07XG5cbkJpdG1hcEluZGV4ZWROb2RlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKHNoaWZ0LCBrZXlIYXNoLCBrZXksIG5vdFNldFZhbHVlKSB7XG4gIGlmIChrZXlIYXNoID09PSB1bmRlZmluZWQpIHtcbiAgICBrZXlIYXNoID0gaGFzaChrZXkpO1xuICB9XG4gIHZhciBiaXQgPSAxIDw8ICgoc2hpZnQgPT09IDAgPyBrZXlIYXNoIDoga2V5SGFzaCA+Pj4gc2hpZnQpICYgTUFTSyk7XG4gIHZhciBiaXRtYXAgPSB0aGlzLmJpdG1hcDtcbiAgcmV0dXJuIChiaXRtYXAgJiBiaXQpID09PSAwXG4gICAgPyBub3RTZXRWYWx1ZVxuICAgIDogdGhpcy5ub2Rlc1twb3BDb3VudChiaXRtYXAgJiAoYml0IC0gMSkpXS5nZXQoXG4gICAgICAgIHNoaWZ0ICsgU0hJRlQsXG4gICAgICAgIGtleUhhc2gsXG4gICAgICAgIGtleSxcbiAgICAgICAgbm90U2V0VmFsdWVcbiAgICAgICk7XG59O1xuXG5CaXRtYXBJbmRleGVkTm9kZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlIChvd25lcklELCBzaGlmdCwga2V5SGFzaCwga2V5LCB2YWx1ZSwgZGlkQ2hhbmdlU2l6ZSwgZGlkQWx0ZXIpIHtcbiAgaWYgKGtleUhhc2ggPT09IHVuZGVmaW5lZCkge1xuICAgIGtleUhhc2ggPSBoYXNoKGtleSk7XG4gIH1cbiAgdmFyIGtleUhhc2hGcmFnID0gKHNoaWZ0ID09PSAwID8ga2V5SGFzaCA6IGtleUhhc2ggPj4+IHNoaWZ0KSAmIE1BU0s7XG4gIHZhciBiaXQgPSAxIDw8IGtleUhhc2hGcmFnO1xuICB2YXIgYml0bWFwID0gdGhpcy5iaXRtYXA7XG4gIHZhciBleGlzdHMgPSAoYml0bWFwICYgYml0KSAhPT0gMDtcblxuICBpZiAoIWV4aXN0cyAmJiB2YWx1ZSA9PT0gTk9UX1NFVCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGlkeCA9IHBvcENvdW50KGJpdG1hcCAmIChiaXQgLSAxKSk7XG4gIHZhciBub2RlcyA9IHRoaXMubm9kZXM7XG4gIHZhciBub2RlID0gZXhpc3RzID8gbm9kZXNbaWR4XSA6IHVuZGVmaW5lZDtcbiAgdmFyIG5ld05vZGUgPSB1cGRhdGVOb2RlKFxuICAgIG5vZGUsXG4gICAgb3duZXJJRCxcbiAgICBzaGlmdCArIFNISUZULFxuICAgIGtleUhhc2gsXG4gICAga2V5LFxuICAgIHZhbHVlLFxuICAgIGRpZENoYW5nZVNpemUsXG4gICAgZGlkQWx0ZXJcbiAgKTtcblxuICBpZiAobmV3Tm9kZSA9PT0gbm9kZSkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKCFleGlzdHMgJiYgbmV3Tm9kZSAmJiBub2Rlcy5sZW5ndGggPj0gTUFYX0JJVE1BUF9JTkRFWEVEX1NJWkUpIHtcbiAgICByZXR1cm4gZXhwYW5kTm9kZXMob3duZXJJRCwgbm9kZXMsIGJpdG1hcCwga2V5SGFzaEZyYWcsIG5ld05vZGUpO1xuICB9XG5cbiAgaWYgKFxuICAgIGV4aXN0cyAmJlxuICAgICFuZXdOb2RlICYmXG4gICAgbm9kZXMubGVuZ3RoID09PSAyICYmXG4gICAgaXNMZWFmTm9kZShub2Rlc1tpZHggXiAxXSlcbiAgKSB7XG4gICAgcmV0dXJuIG5vZGVzW2lkeCBeIDFdO1xuICB9XG5cbiAgaWYgKGV4aXN0cyAmJiBuZXdOb2RlICYmIG5vZGVzLmxlbmd0aCA9PT0gMSAmJiBpc0xlYWZOb2RlKG5ld05vZGUpKSB7XG4gICAgcmV0dXJuIG5ld05vZGU7XG4gIH1cblxuICB2YXIgaXNFZGl0YWJsZSA9IG93bmVySUQgJiYgb3duZXJJRCA9PT0gdGhpcy5vd25lcklEO1xuICB2YXIgbmV3Qml0bWFwID0gZXhpc3RzID8gKG5ld05vZGUgPyBiaXRtYXAgOiBiaXRtYXAgXiBiaXQpIDogYml0bWFwIHwgYml0O1xuICB2YXIgbmV3Tm9kZXMgPSBleGlzdHNcbiAgICA/IG5ld05vZGVcbiAgICAgID8gc2V0QXQobm9kZXMsIGlkeCwgbmV3Tm9kZSwgaXNFZGl0YWJsZSlcbiAgICAgIDogc3BsaWNlT3V0KG5vZGVzLCBpZHgsIGlzRWRpdGFibGUpXG4gICAgOiBzcGxpY2VJbihub2RlcywgaWR4LCBuZXdOb2RlLCBpc0VkaXRhYmxlKTtcblxuICBpZiAoaXNFZGl0YWJsZSkge1xuICAgIHRoaXMuYml0bWFwID0gbmV3Qml0bWFwO1xuICAgIHRoaXMubm9kZXMgPSBuZXdOb2RlcztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJldHVybiBuZXcgQml0bWFwSW5kZXhlZE5vZGUob3duZXJJRCwgbmV3Qml0bWFwLCBuZXdOb2Rlcyk7XG59O1xuXG52YXIgSGFzaEFycmF5TWFwTm9kZSA9IGZ1bmN0aW9uIEhhc2hBcnJheU1hcE5vZGUob3duZXJJRCwgY291bnQsIG5vZGVzKSB7XG4gIHRoaXMub3duZXJJRCA9IG93bmVySUQ7XG4gIHRoaXMuY291bnQgPSBjb3VudDtcbiAgdGhpcy5ub2RlcyA9IG5vZGVzO1xufTtcblxuSGFzaEFycmF5TWFwTm9kZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChzaGlmdCwga2V5SGFzaCwga2V5LCBub3RTZXRWYWx1ZSkge1xuICBpZiAoa2V5SGFzaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAga2V5SGFzaCA9IGhhc2goa2V5KTtcbiAgfVxuICB2YXIgaWR4ID0gKHNoaWZ0ID09PSAwID8ga2V5SGFzaCA6IGtleUhhc2ggPj4+IHNoaWZ0KSAmIE1BU0s7XG4gIHZhciBub2RlID0gdGhpcy5ub2Rlc1tpZHhdO1xuICByZXR1cm4gbm9kZVxuICAgID8gbm9kZS5nZXQoc2hpZnQgKyBTSElGVCwga2V5SGFzaCwga2V5LCBub3RTZXRWYWx1ZSlcbiAgICA6IG5vdFNldFZhbHVlO1xufTtcblxuSGFzaEFycmF5TWFwTm9kZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlIChvd25lcklELCBzaGlmdCwga2V5SGFzaCwga2V5LCB2YWx1ZSwgZGlkQ2hhbmdlU2l6ZSwgZGlkQWx0ZXIpIHtcbiAgaWYgKGtleUhhc2ggPT09IHVuZGVmaW5lZCkge1xuICAgIGtleUhhc2ggPSBoYXNoKGtleSk7XG4gIH1cbiAgdmFyIGlkeCA9IChzaGlmdCA9PT0gMCA/IGtleUhhc2ggOiBrZXlIYXNoID4+PiBzaGlmdCkgJiBNQVNLO1xuICB2YXIgcmVtb3ZlZCA9IHZhbHVlID09PSBOT1RfU0VUO1xuICB2YXIgbm9kZXMgPSB0aGlzLm5vZGVzO1xuICB2YXIgbm9kZSA9IG5vZGVzW2lkeF07XG5cbiAgaWYgKHJlbW92ZWQgJiYgIW5vZGUpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHZhciBuZXdOb2RlID0gdXBkYXRlTm9kZShcbiAgICBub2RlLFxuICAgIG93bmVySUQsXG4gICAgc2hpZnQgKyBTSElGVCxcbiAgICBrZXlIYXNoLFxuICAgIGtleSxcbiAgICB2YWx1ZSxcbiAgICBkaWRDaGFuZ2VTaXplLFxuICAgIGRpZEFsdGVyXG4gICk7XG4gIGlmIChuZXdOb2RlID09PSBub2RlKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgbmV3Q291bnQgPSB0aGlzLmNvdW50O1xuICBpZiAoIW5vZGUpIHtcbiAgICBuZXdDb3VudCsrO1xuICB9IGVsc2UgaWYgKCFuZXdOb2RlKSB7XG4gICAgbmV3Q291bnQtLTtcbiAgICBpZiAobmV3Q291bnQgPCBNSU5fSEFTSF9BUlJBWV9NQVBfU0laRSkge1xuICAgICAgcmV0dXJuIHBhY2tOb2Rlcyhvd25lcklELCBub2RlcywgbmV3Q291bnQsIGlkeCk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGlzRWRpdGFibGUgPSBvd25lcklEICYmIG93bmVySUQgPT09IHRoaXMub3duZXJJRDtcbiAgdmFyIG5ld05vZGVzID0gc2V0QXQobm9kZXMsIGlkeCwgbmV3Tm9kZSwgaXNFZGl0YWJsZSk7XG5cbiAgaWYgKGlzRWRpdGFibGUpIHtcbiAgICB0aGlzLmNvdW50ID0gbmV3Q291bnQ7XG4gICAgdGhpcy5ub2RlcyA9IG5ld05vZGVzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBIYXNoQXJyYXlNYXBOb2RlKG93bmVySUQsIG5ld0NvdW50LCBuZXdOb2Rlcyk7XG59O1xuXG52YXIgSGFzaENvbGxpc2lvbk5vZGUgPSBmdW5jdGlvbiBIYXNoQ29sbGlzaW9uTm9kZShvd25lcklELCBrZXlIYXNoLCBlbnRyaWVzKSB7XG4gIHRoaXMub3duZXJJRCA9IG93bmVySUQ7XG4gIHRoaXMua2V5SGFzaCA9IGtleUhhc2g7XG4gIHRoaXMuZW50cmllcyA9IGVudHJpZXM7XG59O1xuXG5IYXNoQ29sbGlzaW9uTm9kZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChzaGlmdCwga2V5SGFzaCwga2V5LCBub3RTZXRWYWx1ZSkge1xuICB2YXIgZW50cmllcyA9IHRoaXMuZW50cmllcztcbiAgZm9yICh2YXIgaWkgPSAwLCBsZW4gPSBlbnRyaWVzLmxlbmd0aDsgaWkgPCBsZW47IGlpKyspIHtcbiAgICBpZiAoaXMoa2V5LCBlbnRyaWVzW2lpXVswXSkpIHtcbiAgICAgIHJldHVybiBlbnRyaWVzW2lpXVsxXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vdFNldFZhbHVlO1xufTtcblxuSGFzaENvbGxpc2lvbk5vZGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAob3duZXJJRCwgc2hpZnQsIGtleUhhc2gsIGtleSwgdmFsdWUsIGRpZENoYW5nZVNpemUsIGRpZEFsdGVyKSB7XG4gIGlmIChrZXlIYXNoID09PSB1bmRlZmluZWQpIHtcbiAgICBrZXlIYXNoID0gaGFzaChrZXkpO1xuICB9XG5cbiAgdmFyIHJlbW92ZWQgPSB2YWx1ZSA9PT0gTk9UX1NFVDtcblxuICBpZiAoa2V5SGFzaCAhPT0gdGhpcy5rZXlIYXNoKSB7XG4gICAgaWYgKHJlbW92ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBTZXRSZWYoZGlkQWx0ZXIpO1xuICAgIFNldFJlZihkaWRDaGFuZ2VTaXplKTtcbiAgICByZXR1cm4gbWVyZ2VJbnRvTm9kZSh0aGlzLCBvd25lcklELCBzaGlmdCwga2V5SGFzaCwgW2tleSwgdmFsdWVdKTtcbiAgfVxuXG4gIHZhciBlbnRyaWVzID0gdGhpcy5lbnRyaWVzO1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGVudHJpZXMubGVuZ3RoO1xuICBmb3IgKDsgaWR4IDwgbGVuOyBpZHgrKykge1xuICAgIGlmIChpcyhrZXksIGVudHJpZXNbaWR4XVswXSkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICB2YXIgZXhpc3RzID0gaWR4IDwgbGVuO1xuXG4gIGlmIChleGlzdHMgPyBlbnRyaWVzW2lkeF1bMV0gPT09IHZhbHVlIDogcmVtb3ZlZCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgU2V0UmVmKGRpZEFsdGVyKTtcbiAgKHJlbW92ZWQgfHwgIWV4aXN0cykgJiYgU2V0UmVmKGRpZENoYW5nZVNpemUpO1xuXG4gIGlmIChyZW1vdmVkICYmIGxlbiA9PT0gMikge1xuICAgIHJldHVybiBuZXcgVmFsdWVOb2RlKG93bmVySUQsIHRoaXMua2V5SGFzaCwgZW50cmllc1tpZHggXiAxXSk7XG4gIH1cblxuICB2YXIgaXNFZGl0YWJsZSA9IG93bmVySUQgJiYgb3duZXJJRCA9PT0gdGhpcy5vd25lcklEO1xuICB2YXIgbmV3RW50cmllcyA9IGlzRWRpdGFibGUgPyBlbnRyaWVzIDogYXJyQ29weShlbnRyaWVzKTtcblxuICBpZiAoZXhpc3RzKSB7XG4gICAgaWYgKHJlbW92ZWQpIHtcbiAgICAgIGlkeCA9PT0gbGVuIC0gMVxuICAgICAgICA/IG5ld0VudHJpZXMucG9wKClcbiAgICAgICAgOiAobmV3RW50cmllc1tpZHhdID0gbmV3RW50cmllcy5wb3AoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0VudHJpZXNbaWR4XSA9IFtrZXksIHZhbHVlXTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbmV3RW50cmllcy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH1cblxuICBpZiAoaXNFZGl0YWJsZSkge1xuICAgIHRoaXMuZW50cmllcyA9IG5ld0VudHJpZXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gbmV3IEhhc2hDb2xsaXNpb25Ob2RlKG93bmVySUQsIHRoaXMua2V5SGFzaCwgbmV3RW50cmllcyk7XG59O1xuXG52YXIgVmFsdWVOb2RlID0gZnVuY3Rpb24gVmFsdWVOb2RlKG93bmVySUQsIGtleUhhc2gsIGVudHJ5KSB7XG4gIHRoaXMub3duZXJJRCA9IG93bmVySUQ7XG4gIHRoaXMua2V5SGFzaCA9IGtleUhhc2g7XG4gIHRoaXMuZW50cnkgPSBlbnRyeTtcbn07XG5cblZhbHVlTm9kZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChzaGlmdCwga2V5SGFzaCwga2V5LCBub3RTZXRWYWx1ZSkge1xuICByZXR1cm4gaXMoa2V5LCB0aGlzLmVudHJ5WzBdKSA/IHRoaXMuZW50cnlbMV0gOiBub3RTZXRWYWx1ZTtcbn07XG5cblZhbHVlTm9kZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlIChvd25lcklELCBzaGlmdCwga2V5SGFzaCwga2V5LCB2YWx1ZSwgZGlkQ2hhbmdlU2l6ZSwgZGlkQWx0ZXIpIHtcbiAgdmFyIHJlbW92ZWQgPSB2YWx1ZSA9PT0gTk9UX1NFVDtcbiAgdmFyIGtleU1hdGNoID0gaXMoa2V5LCB0aGlzLmVudHJ5WzBdKTtcbiAgaWYgKGtleU1hdGNoID8gdmFsdWUgPT09IHRoaXMuZW50cnlbMV0gOiByZW1vdmVkKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBTZXRSZWYoZGlkQWx0ZXIpO1xuXG4gIGlmIChyZW1vdmVkKSB7XG4gICAgU2V0UmVmKGRpZENoYW5nZVNpemUpO1xuICAgIHJldHVybjsgLy8gdW5kZWZpbmVkXG4gIH1cblxuICBpZiAoa2V5TWF0Y2gpIHtcbiAgICBpZiAob3duZXJJRCAmJiBvd25lcklEID09PSB0aGlzLm93bmVySUQpIHtcbiAgICAgIHRoaXMuZW50cnlbMV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFZhbHVlTm9kZShvd25lcklELCB0aGlzLmtleUhhc2gsIFtrZXksIHZhbHVlXSk7XG4gIH1cblxuICBTZXRSZWYoZGlkQ2hhbmdlU2l6ZSk7XG4gIHJldHVybiBtZXJnZUludG9Ob2RlKHRoaXMsIG93bmVySUQsIHNoaWZ0LCBoYXNoKGtleSksIFtrZXksIHZhbHVlXSk7XG59O1xuXG4vLyAjcHJhZ21hIEl0ZXJhdG9yc1xuXG5BcnJheU1hcE5vZGUucHJvdG90eXBlLml0ZXJhdGUgPSBIYXNoQ29sbGlzaW9uTm9kZS5wcm90b3R5cGUuaXRlcmF0ZSA9IGZ1bmN0aW9uKFxuICBmbixcbiAgcmV2ZXJzZVxuKSB7XG4gIHZhciBlbnRyaWVzID0gdGhpcy5lbnRyaWVzO1xuICBmb3IgKHZhciBpaSA9IDAsIG1heEluZGV4ID0gZW50cmllcy5sZW5ndGggLSAxOyBpaSA8PSBtYXhJbmRleDsgaWkrKykge1xuICAgIGlmIChmbihlbnRyaWVzW3JldmVyc2UgPyBtYXhJbmRleCAtIGlpIDogaWldKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG5cbkJpdG1hcEluZGV4ZWROb2RlLnByb3RvdHlwZS5pdGVyYXRlID0gSGFzaEFycmF5TWFwTm9kZS5wcm90b3R5cGUuaXRlcmF0ZSA9IGZ1bmN0aW9uKFxuICBmbixcbiAgcmV2ZXJzZVxuKSB7XG4gIHZhciBub2RlcyA9IHRoaXMubm9kZXM7XG4gIGZvciAodmFyIGlpID0gMCwgbWF4SW5kZXggPSBub2Rlcy5sZW5ndGggLSAxOyBpaSA8PSBtYXhJbmRleDsgaWkrKykge1xuICAgIHZhciBub2RlID0gbm9kZXNbcmV2ZXJzZSA/IG1heEluZGV4IC0gaWkgOiBpaV07XG4gICAgaWYgKG5vZGUgJiYgbm9kZS5pdGVyYXRlKGZuLCByZXZlcnNlKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuVmFsdWVOb2RlLnByb3RvdHlwZS5pdGVyYXRlID0gZnVuY3Rpb24oZm4sIHJldmVyc2UpIHtcbiAgcmV0dXJuIGZuKHRoaXMuZW50cnkpO1xufTtcblxudmFyIE1hcEl0ZXJhdG9yID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoSXRlcmF0b3IkJDEpIHtcbiAgZnVuY3Rpb24gTWFwSXRlcmF0b3IobWFwLCB0eXBlLCByZXZlcnNlKSB7XG4gICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgdGhpcy5fcmV2ZXJzZSA9IHJldmVyc2U7XG4gICAgdGhpcy5fc3RhY2sgPSBtYXAuX3Jvb3QgJiYgbWFwSXRlcmF0b3JGcmFtZShtYXAuX3Jvb3QpO1xuICB9XG5cbiAgaWYgKCBJdGVyYXRvciQkMSApIE1hcEl0ZXJhdG9yLl9fcHJvdG9fXyA9IEl0ZXJhdG9yJCQxO1xuICBNYXBJdGVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBJdGVyYXRvciQkMSAmJiBJdGVyYXRvciQkMS5wcm90b3R5cGUgKTtcbiAgTWFwSXRlcmF0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFwSXRlcmF0b3I7XG5cbiAgTWFwSXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiBuZXh0ICgpIHtcbiAgICB2YXIgdHlwZSA9IHRoaXMuX3R5cGU7XG4gICAgdmFyIHN0YWNrID0gdGhpcy5fc3RhY2s7XG4gICAgd2hpbGUgKHN0YWNrKSB7XG4gICAgICB2YXIgbm9kZSA9IHN0YWNrLm5vZGU7XG4gICAgICB2YXIgaW5kZXggPSBzdGFjay5pbmRleCsrO1xuICAgICAgdmFyIG1heEluZGV4ID0gKHZvaWQgMCk7XG4gICAgICBpZiAobm9kZS5lbnRyeSkge1xuICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gbWFwSXRlcmF0b3JWYWx1ZSh0eXBlLCBub2RlLmVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChub2RlLmVudHJpZXMpIHtcbiAgICAgICAgbWF4SW5kZXggPSBub2RlLmVudHJpZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgaWYgKGluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIG1hcEl0ZXJhdG9yVmFsdWUoXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgbm9kZS5lbnRyaWVzW3RoaXMuX3JldmVyc2UgPyBtYXhJbmRleCAtIGluZGV4IDogaW5kZXhdXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWF4SW5kZXggPSBub2RlLm5vZGVzLmxlbmd0aCAtIDE7XG4gICAgICAgIGlmIChpbmRleCA8PSBtYXhJbmRleCkge1xuICAgICAgICAgIHZhciBzdWJOb2RlID0gbm9kZS5ub2Rlc1t0aGlzLl9yZXZlcnNlID8gbWF4SW5kZXggLSBpbmRleCA6IGluZGV4XTtcbiAgICAgICAgICBpZiAoc3ViTm9kZSkge1xuICAgICAgICAgICAgaWYgKHN1Yk5vZGUuZW50cnkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1hcEl0ZXJhdG9yVmFsdWUodHlwZSwgc3ViTm9kZS5lbnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGFjayA9IHRoaXMuX3N0YWNrID0gbWFwSXRlcmF0b3JGcmFtZShzdWJOb2RlLCBzdGFjayk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzdGFjayA9IHRoaXMuX3N0YWNrID0gdGhpcy5fc3RhY2suX19wcmV2O1xuICAgIH1cbiAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gIH07XG5cbiAgcmV0dXJuIE1hcEl0ZXJhdG9yO1xufShJdGVyYXRvcikpO1xuXG5mdW5jdGlvbiBtYXBJdGVyYXRvclZhbHVlKHR5cGUsIGVudHJ5KSB7XG4gIHJldHVybiBpdGVyYXRvclZhbHVlKHR5cGUsIGVudHJ5WzBdLCBlbnRyeVsxXSk7XG59XG5cbmZ1bmN0aW9uIG1hcEl0ZXJhdG9yRnJhbWUobm9kZSwgcHJldikge1xuICByZXR1cm4ge1xuICAgIG5vZGU6IG5vZGUsXG4gICAgaW5kZXg6IDAsXG4gICAgX19wcmV2OiBwcmV2LFxuICB9O1xufVxuXG5mdW5jdGlvbiBtYWtlTWFwKHNpemUsIHJvb3QsIG93bmVySUQsIGhhc2gkJDEpIHtcbiAgdmFyIG1hcCA9IE9iamVjdC5jcmVhdGUoTWFwUHJvdG90eXBlKTtcbiAgbWFwLnNpemUgPSBzaXplO1xuICBtYXAuX3Jvb3QgPSByb290O1xuICBtYXAuX19vd25lcklEID0gb3duZXJJRDtcbiAgbWFwLl9faGFzaCA9IGhhc2gkJDE7XG4gIG1hcC5fX2FsdGVyZWQgPSBmYWxzZTtcbiAgcmV0dXJuIG1hcDtcbn1cblxudmFyIEVNUFRZX01BUDtcbmZ1bmN0aW9uIGVtcHR5TWFwKCkge1xuICByZXR1cm4gRU1QVFlfTUFQIHx8IChFTVBUWV9NQVAgPSBtYWtlTWFwKDApKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTWFwKG1hcCwgaywgdikge1xuICB2YXIgbmV3Um9vdDtcbiAgdmFyIG5ld1NpemU7XG4gIGlmICghbWFwLl9yb290KSB7XG4gICAgaWYgKHYgPT09IE5PVF9TRVQpIHtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuICAgIG5ld1NpemUgPSAxO1xuICAgIG5ld1Jvb3QgPSBuZXcgQXJyYXlNYXBOb2RlKG1hcC5fX293bmVySUQsIFtbaywgdl1dKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZGlkQ2hhbmdlU2l6ZSA9IE1ha2VSZWYoKTtcbiAgICB2YXIgZGlkQWx0ZXIgPSBNYWtlUmVmKCk7XG4gICAgbmV3Um9vdCA9IHVwZGF0ZU5vZGUoXG4gICAgICBtYXAuX3Jvb3QsXG4gICAgICBtYXAuX19vd25lcklELFxuICAgICAgMCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIGssXG4gICAgICB2LFxuICAgICAgZGlkQ2hhbmdlU2l6ZSxcbiAgICAgIGRpZEFsdGVyXG4gICAgKTtcbiAgICBpZiAoIWRpZEFsdGVyLnZhbHVlKSB7XG4gICAgICByZXR1cm4gbWFwO1xuICAgIH1cbiAgICBuZXdTaXplID0gbWFwLnNpemUgKyAoZGlkQ2hhbmdlU2l6ZS52YWx1ZSA/ICh2ID09PSBOT1RfU0VUID8gLTEgOiAxKSA6IDApO1xuICB9XG4gIGlmIChtYXAuX19vd25lcklEKSB7XG4gICAgbWFwLnNpemUgPSBuZXdTaXplO1xuICAgIG1hcC5fcm9vdCA9IG5ld1Jvb3Q7XG4gICAgbWFwLl9faGFzaCA9IHVuZGVmaW5lZDtcbiAgICBtYXAuX19hbHRlcmVkID0gdHJ1ZTtcbiAgICByZXR1cm4gbWFwO1xuICB9XG4gIHJldHVybiBuZXdSb290ID8gbWFrZU1hcChuZXdTaXplLCBuZXdSb290KSA6IGVtcHR5TWFwKCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU5vZGUoXG4gIG5vZGUsXG4gIG93bmVySUQsXG4gIHNoaWZ0LFxuICBrZXlIYXNoLFxuICBrZXksXG4gIHZhbHVlLFxuICBkaWRDaGFuZ2VTaXplLFxuICBkaWRBbHRlclxuKSB7XG4gIGlmICghbm9kZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gTk9UX1NFVCkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIFNldFJlZihkaWRBbHRlcik7XG4gICAgU2V0UmVmKGRpZENoYW5nZVNpemUpO1xuICAgIHJldHVybiBuZXcgVmFsdWVOb2RlKG93bmVySUQsIGtleUhhc2gsIFtrZXksIHZhbHVlXSk7XG4gIH1cbiAgcmV0dXJuIG5vZGUudXBkYXRlKFxuICAgIG93bmVySUQsXG4gICAgc2hpZnQsXG4gICAga2V5SGFzaCxcbiAgICBrZXksXG4gICAgdmFsdWUsXG4gICAgZGlkQ2hhbmdlU2l6ZSxcbiAgICBkaWRBbHRlclxuICApO1xufVxuXG5mdW5jdGlvbiBpc0xlYWZOb2RlKG5vZGUpIHtcbiAgcmV0dXJuIChcbiAgICBub2RlLmNvbnN0cnVjdG9yID09PSBWYWx1ZU5vZGUgfHwgbm9kZS5jb25zdHJ1Y3RvciA9PT0gSGFzaENvbGxpc2lvbk5vZGVcbiAgKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VJbnRvTm9kZShub2RlLCBvd25lcklELCBzaGlmdCwga2V5SGFzaCwgZW50cnkpIHtcbiAgaWYgKG5vZGUua2V5SGFzaCA9PT0ga2V5SGFzaCkge1xuICAgIHJldHVybiBuZXcgSGFzaENvbGxpc2lvbk5vZGUob3duZXJJRCwga2V5SGFzaCwgW25vZGUuZW50cnksIGVudHJ5XSk7XG4gIH1cblxuICB2YXIgaWR4MSA9IChzaGlmdCA9PT0gMCA/IG5vZGUua2V5SGFzaCA6IG5vZGUua2V5SGFzaCA+Pj4gc2hpZnQpICYgTUFTSztcbiAgdmFyIGlkeDIgPSAoc2hpZnQgPT09IDAgPyBrZXlIYXNoIDoga2V5SGFzaCA+Pj4gc2hpZnQpICYgTUFTSztcblxuICB2YXIgbmV3Tm9kZTtcbiAgdmFyIG5vZGVzID1cbiAgICBpZHgxID09PSBpZHgyXG4gICAgICA/IFttZXJnZUludG9Ob2RlKG5vZGUsIG93bmVySUQsIHNoaWZ0ICsgU0hJRlQsIGtleUhhc2gsIGVudHJ5KV1cbiAgICAgIDogKChuZXdOb2RlID0gbmV3IFZhbHVlTm9kZShvd25lcklELCBrZXlIYXNoLCBlbnRyeSkpLFxuICAgICAgICBpZHgxIDwgaWR4MiA/IFtub2RlLCBuZXdOb2RlXSA6IFtuZXdOb2RlLCBub2RlXSk7XG5cbiAgcmV0dXJuIG5ldyBCaXRtYXBJbmRleGVkTm9kZShvd25lcklELCAoMSA8PCBpZHgxKSB8ICgxIDw8IGlkeDIpLCBub2Rlcyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGVzKG93bmVySUQsIGVudHJpZXMsIGtleSwgdmFsdWUpIHtcbiAgaWYgKCFvd25lcklEKSB7XG4gICAgb3duZXJJRCA9IG5ldyBPd25lcklEKCk7XG4gIH1cbiAgdmFyIG5vZGUgPSBuZXcgVmFsdWVOb2RlKG93bmVySUQsIGhhc2goa2V5KSwgW2tleSwgdmFsdWVdKTtcbiAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGVudHJpZXMubGVuZ3RoOyBpaSsrKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpaV07XG4gICAgbm9kZSA9IG5vZGUudXBkYXRlKG93bmVySUQsIDAsIHVuZGVmaW5lZCwgZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxuICByZXR1cm4gbm9kZTtcbn1cblxuZnVuY3Rpb24gcGFja05vZGVzKG93bmVySUQsIG5vZGVzLCBjb3VudCwgZXhjbHVkaW5nKSB7XG4gIHZhciBiaXRtYXAgPSAwO1xuICB2YXIgcGFja2VkSUkgPSAwO1xuICB2YXIgcGFja2VkTm9kZXMgPSBuZXcgQXJyYXkoY291bnQpO1xuICBmb3IgKHZhciBpaSA9IDAsIGJpdCA9IDEsIGxlbiA9IG5vZGVzLmxlbmd0aDsgaWkgPCBsZW47IGlpKyssIGJpdCA8PD0gMSkge1xuICAgIHZhciBub2RlID0gbm9kZXNbaWldO1xuICAgIGlmIChub2RlICE9PSB1bmRlZmluZWQgJiYgaWkgIT09IGV4Y2x1ZGluZykge1xuICAgICAgYml0bWFwIHw9IGJpdDtcbiAgICAgIHBhY2tlZE5vZGVzW3BhY2tlZElJKytdID0gbm9kZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBCaXRtYXBJbmRleGVkTm9kZShvd25lcklELCBiaXRtYXAsIHBhY2tlZE5vZGVzKTtcbn1cblxuZnVuY3Rpb24gZXhwYW5kTm9kZXMob3duZXJJRCwgbm9kZXMsIGJpdG1hcCwgaW5jbHVkaW5nLCBub2RlKSB7XG4gIHZhciBjb3VudCA9IDA7XG4gIHZhciBleHBhbmRlZE5vZGVzID0gbmV3IEFycmF5KFNJWkUpO1xuICBmb3IgKHZhciBpaSA9IDA7IGJpdG1hcCAhPT0gMDsgaWkrKywgYml0bWFwID4+Pj0gMSkge1xuICAgIGV4cGFuZGVkTm9kZXNbaWldID0gYml0bWFwICYgMSA/IG5vZGVzW2NvdW50KytdIDogdW5kZWZpbmVkO1xuICB9XG4gIGV4cGFuZGVkTm9kZXNbaW5jbHVkaW5nXSA9IG5vZGU7XG4gIHJldHVybiBuZXcgSGFzaEFycmF5TWFwTm9kZShvd25lcklELCBjb3VudCArIDEsIGV4cGFuZGVkTm9kZXMpO1xufVxuXG5mdW5jdGlvbiBwb3BDb3VudCh4KSB7XG4gIHggLT0gKHggPj4gMSkgJiAweDU1NTU1NTU1O1xuICB4ID0gKHggJiAweDMzMzMzMzMzKSArICgoeCA+PiAyKSAmIDB4MzMzMzMzMzMpO1xuICB4ID0gKHggKyAoeCA+PiA0KSkgJiAweDBmMGYwZjBmO1xuICB4ICs9IHggPj4gODtcbiAgeCArPSB4ID4+IDE2O1xuICByZXR1cm4geCAmIDB4N2Y7XG59XG5cbmZ1bmN0aW9uIHNldEF0KGFycmF5LCBpZHgsIHZhbCwgY2FuRWRpdCkge1xuICB2YXIgbmV3QXJyYXkgPSBjYW5FZGl0ID8gYXJyYXkgOiBhcnJDb3B5KGFycmF5KTtcbiAgbmV3QXJyYXlbaWR4XSA9IHZhbDtcbiAgcmV0dXJuIG5ld0FycmF5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VJbihhcnJheSwgaWR4LCB2YWwsIGNhbkVkaXQpIHtcbiAgdmFyIG5ld0xlbiA9IGFycmF5Lmxlbmd0aCArIDE7XG4gIGlmIChjYW5FZGl0ICYmIGlkeCArIDEgPT09IG5ld0xlbikge1xuICAgIGFycmF5W2lkeF0gPSB2YWw7XG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG4gIHZhciBuZXdBcnJheSA9IG5ldyBBcnJheShuZXdMZW4pO1xuICB2YXIgYWZ0ZXIgPSAwO1xuICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgbmV3TGVuOyBpaSsrKSB7XG4gICAgaWYgKGlpID09PSBpZHgpIHtcbiAgICAgIG5ld0FycmF5W2lpXSA9IHZhbDtcbiAgICAgIGFmdGVyID0gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0FycmF5W2lpXSA9IGFycmF5W2lpICsgYWZ0ZXJdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3QXJyYXk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU91dChhcnJheSwgaWR4LCBjYW5FZGl0KSB7XG4gIHZhciBuZXdMZW4gPSBhcnJheS5sZW5ndGggLSAxO1xuICBpZiAoY2FuRWRpdCAmJiBpZHggPT09IG5ld0xlbikge1xuICAgIGFycmF5LnBvcCgpO1xuICAgIHJldHVybiBhcnJheTtcbiAgfVxuICB2YXIgbmV3QXJyYXkgPSBuZXcgQXJyYXkobmV3TGVuKTtcbiAgdmFyIGFmdGVyID0gMDtcbiAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IG5ld0xlbjsgaWkrKykge1xuICAgIGlmIChpaSA9PT0gaWR4KSB7XG4gICAgICBhZnRlciA9IDE7XG4gICAgfVxuICAgIG5ld0FycmF5W2lpXSA9IGFycmF5W2lpICsgYWZ0ZXJdO1xuICB9XG4gIHJldHVybiBuZXdBcnJheTtcbn1cblxudmFyIE1BWF9BUlJBWV9NQVBfU0laRSA9IFNJWkUgLyA0O1xudmFyIE1BWF9CSVRNQVBfSU5ERVhFRF9TSVpFID0gU0laRSAvIDI7XG52YXIgTUlOX0hBU0hfQVJSQVlfTUFQX1NJWkUgPSBTSVpFIC8gNDtcblxudmFyIElTX0xJU1RfU1lNQk9MID0gJ0BAX19JTU1VVEFCTEVfTElTVF9fQEAnO1xuXG5mdW5jdGlvbiBpc0xpc3QobWF5YmVMaXN0KSB7XG4gIHJldHVybiBCb29sZWFuKG1heWJlTGlzdCAmJiBtYXliZUxpc3RbSVNfTElTVF9TWU1CT0xdKTtcbn1cblxudmFyIExpc3QgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChJbmRleGVkQ29sbGVjdGlvbiQkMSkge1xuICBmdW5jdGlvbiBMaXN0KHZhbHVlKSB7XG4gICAgdmFyIGVtcHR5ID0gZW1wdHlMaXN0KCk7XG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBlbXB0eTtcbiAgICB9XG4gICAgaWYgKGlzTGlzdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgdmFyIGl0ZXIgPSBJbmRleGVkQ29sbGVjdGlvbiQkMSh2YWx1ZSk7XG4gICAgdmFyIHNpemUgPSBpdGVyLnNpemU7XG4gICAgaWYgKHNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiBlbXB0eTtcbiAgICB9XG4gICAgYXNzZXJ0Tm90SW5maW5pdGUoc2l6ZSk7XG4gICAgaWYgKHNpemUgPiAwICYmIHNpemUgPCBTSVpFKSB7XG4gICAgICByZXR1cm4gbWFrZUxpc3QoMCwgc2l6ZSwgU0hJRlQsIG51bGwsIG5ldyBWTm9kZShpdGVyLnRvQXJyYXkoKSkpO1xuICAgIH1cbiAgICByZXR1cm4gZW1wdHkud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobGlzdCkge1xuICAgICAgbGlzdC5zZXRTaXplKHNpemUpO1xuICAgICAgaXRlci5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7IHJldHVybiBsaXN0LnNldChpLCB2KTsgfSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoIEluZGV4ZWRDb2xsZWN0aW9uJCQxICkgTGlzdC5fX3Byb3RvX18gPSBJbmRleGVkQ29sbGVjdGlvbiQkMTtcbiAgTGlzdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBJbmRleGVkQ29sbGVjdGlvbiQkMSAmJiBJbmRleGVkQ29sbGVjdGlvbiQkMS5wcm90b3R5cGUgKTtcbiAgTGlzdC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMaXN0O1xuXG4gIExpc3Qub2YgPSBmdW5jdGlvbiBvZiAoLyouLi52YWx1ZXMqLykge1xuICAgIHJldHVybiB0aGlzKGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX190b1N0cmluZygnTGlzdCBbJywgJ10nKTtcbiAgfTtcblxuICAvLyBAcHJhZ21hIEFjY2Vzc1xuXG4gIExpc3QucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoaW5kZXgsIG5vdFNldFZhbHVlKSB7XG4gICAgaW5kZXggPSB3cmFwSW5kZXgodGhpcywgaW5kZXgpO1xuICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5zaXplKSB7XG4gICAgICBpbmRleCArPSB0aGlzLl9vcmlnaW47XG4gICAgICB2YXIgbm9kZSA9IGxpc3ROb2RlRm9yKHRoaXMsIGluZGV4KTtcbiAgICAgIHJldHVybiBub2RlICYmIG5vZGUuYXJyYXlbaW5kZXggJiBNQVNLXTtcbiAgICB9XG4gICAgcmV0dXJuIG5vdFNldFZhbHVlO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgTW9kaWZpY2F0aW9uXG5cbiAgTGlzdC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0IChpbmRleCwgdmFsdWUpIHtcbiAgICByZXR1cm4gdXBkYXRlTGlzdCh0aGlzLCBpbmRleCwgdmFsdWUpO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSAoaW5kZXgpIHtcbiAgICByZXR1cm4gIXRoaXMuaGFzKGluZGV4KVxuICAgICAgPyB0aGlzXG4gICAgICA6IGluZGV4ID09PSAwXG4gICAgICAgID8gdGhpcy5zaGlmdCgpXG4gICAgICAgIDogaW5kZXggPT09IHRoaXMuc2l6ZSAtIDFcbiAgICAgICAgICA/IHRoaXMucG9wKClcbiAgICAgICAgICA6IHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiBpbnNlcnQgKGluZGV4LCB2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnNwbGljZShpbmRleCwgMCwgdmFsdWUpO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAodGhpcy5fX293bmVySUQpIHtcbiAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuX29yaWdpbiA9IHRoaXMuX2NhcGFjaXR5ID0gMDtcbiAgICAgIHRoaXMuX2xldmVsID0gU0hJRlQ7XG4gICAgICB0aGlzLl9yb290ID0gdGhpcy5fdGFpbCA9IG51bGw7XG4gICAgICB0aGlzLl9faGFzaCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX19hbHRlcmVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gZW1wdHlMaXN0KCk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2ggKC8qLi4udmFsdWVzKi8pIHtcbiAgICB2YXIgdmFsdWVzID0gYXJndW1lbnRzO1xuICAgIHZhciBvbGRTaXplID0gdGhpcy5zaXplO1xuICAgIHJldHVybiB0aGlzLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgIHNldExpc3RCb3VuZHMobGlzdCwgMCwgb2xkU2l6ZSArIHZhbHVlcy5sZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IHZhbHVlcy5sZW5ndGg7IGlpKyspIHtcbiAgICAgICAgbGlzdC5zZXQob2xkU2l6ZSArIGlpLCB2YWx1ZXNbaWldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbiBwb3AgKCkge1xuICAgIHJldHVybiBzZXRMaXN0Qm91bmRzKHRoaXMsIDAsIC0xKTtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24gdW5zaGlmdCAoLyouLi52YWx1ZXMqLykge1xuICAgIHZhciB2YWx1ZXMgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIHRoaXMud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobGlzdCkge1xuICAgICAgc2V0TGlzdEJvdW5kcyhsaXN0LCAtdmFsdWVzLmxlbmd0aCk7XG4gICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgdmFsdWVzLmxlbmd0aDsgaWkrKykge1xuICAgICAgICBsaXN0LnNldChpaSwgdmFsdWVzW2lpXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUuc2hpZnQgPSBmdW5jdGlvbiBzaGlmdCAoKSB7XG4gICAgcmV0dXJuIHNldExpc3RCb3VuZHModGhpcywgMSk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBDb21wb3NpdGlvblxuXG4gIExpc3QucHJvdG90eXBlLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAoLyouLi5jb2xsZWN0aW9ucyovKSB7XG4gICAgdmFyIGFyZ3VtZW50cyQxID0gYXJndW1lbnRzO1xuXG4gICAgdmFyIHNlcXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGFyZ3VtZW50ID0gYXJndW1lbnRzJDFbaV07XG4gICAgICB2YXIgc2VxID0gSW5kZXhlZENvbGxlY3Rpb24kJDEoXG4gICAgICAgIHR5cGVvZiBhcmd1bWVudCAhPT0gJ3N0cmluZycgJiYgaGFzSXRlcmF0b3IoYXJndW1lbnQpXG4gICAgICAgICAgPyBhcmd1bWVudFxuICAgICAgICAgIDogW2FyZ3VtZW50XVxuICAgICAgKTtcbiAgICAgIGlmIChzZXEuc2l6ZSAhPT0gMCkge1xuICAgICAgICBzZXFzLnB1c2goc2VxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlcXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCAmJiAhdGhpcy5fX293bmVySUQgJiYgc2Vxcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yKHNlcXNbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy53aXRoTXV0YXRpb25zKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICBzZXFzLmZvckVhY2goZnVuY3Rpb24gKHNlcSkgeyByZXR1cm4gc2VxLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBsaXN0LnB1c2godmFsdWUpOyB9KTsgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgTGlzdC5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUgKHNpemUpIHtcbiAgICByZXR1cm4gc2V0TGlzdEJvdW5kcyh0aGlzLCAwLCBzaXplKTtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiBtYXAgKG1hcHBlciwgY29udGV4dCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobGlzdCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzJDEuc2l6ZTsgaSsrKSB7XG4gICAgICAgIGxpc3Quc2V0KGksIG1hcHBlci5jYWxsKGNvbnRleHQsIGxpc3QuZ2V0KGkpLCBpLCBsaXN0KSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBJdGVyYXRpb25cblxuICBMaXN0LnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChiZWdpbiwgZW5kKSB7XG4gICAgdmFyIHNpemUgPSB0aGlzLnNpemU7XG4gICAgaWYgKHdob2xlU2xpY2UoYmVnaW4sIGVuZCwgc2l6ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gc2V0TGlzdEJvdW5kcyhcbiAgICAgIHRoaXMsXG4gICAgICByZXNvbHZlQmVnaW4oYmVnaW4sIHNpemUpLFxuICAgICAgcmVzb2x2ZUVuZChlbmQsIHNpemUpXG4gICAgKTtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHZhciBpbmRleCA9IHJldmVyc2UgPyB0aGlzLnNpemUgOiAwO1xuICAgIHZhciB2YWx1ZXMgPSBpdGVyYXRlTGlzdCh0aGlzLCByZXZlcnNlKTtcbiAgICByZXR1cm4gbmV3IEl0ZXJhdG9yKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHZhbHVlcygpO1xuICAgICAgcmV0dXJuIHZhbHVlID09PSBET05FXG4gICAgICAgID8gaXRlcmF0b3JEb25lKClcbiAgICAgICAgOiBpdGVyYXRvclZhbHVlKHR5cGUsIHJldmVyc2UgPyAtLWluZGV4IDogaW5kZXgrKywgdmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIExpc3QucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgaW5kZXggPSByZXZlcnNlID8gdGhpcy5zaXplIDogMDtcbiAgICB2YXIgdmFsdWVzID0gaXRlcmF0ZUxpc3QodGhpcywgcmV2ZXJzZSk7XG4gICAgdmFyIHZhbHVlO1xuICAgIHdoaWxlICgodmFsdWUgPSB2YWx1ZXMoKSkgIT09IERPTkUpIHtcbiAgICAgIGlmIChmbih2YWx1ZSwgcmV2ZXJzZSA/IC0taW5kZXggOiBpbmRleCsrLCB0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbmRleDtcbiAgfTtcblxuICBMaXN0LnByb3RvdHlwZS5fX2Vuc3VyZU93bmVyID0gZnVuY3Rpb24gX19lbnN1cmVPd25lciAob3duZXJJRCkge1xuICAgIGlmIChvd25lcklEID09PSB0aGlzLl9fb3duZXJJRCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICghb3duZXJJRCkge1xuICAgICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZW1wdHlMaXN0KCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fb3duZXJJRCA9IG93bmVySUQ7XG4gICAgICB0aGlzLl9fYWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBtYWtlTGlzdChcbiAgICAgIHRoaXMuX29yaWdpbixcbiAgICAgIHRoaXMuX2NhcGFjaXR5LFxuICAgICAgdGhpcy5fbGV2ZWwsXG4gICAgICB0aGlzLl9yb290LFxuICAgICAgdGhpcy5fdGFpbCxcbiAgICAgIG93bmVySUQsXG4gICAgICB0aGlzLl9faGFzaFxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIExpc3Q7XG59KEluZGV4ZWRDb2xsZWN0aW9uKSk7XG5cbkxpc3QuaXNMaXN0ID0gaXNMaXN0O1xuXG52YXIgTGlzdFByb3RvdHlwZSA9IExpc3QucHJvdG90eXBlO1xuTGlzdFByb3RvdHlwZVtJU19MSVNUX1NZTUJPTF0gPSB0cnVlO1xuTGlzdFByb3RvdHlwZVtERUxFVEVdID0gTGlzdFByb3RvdHlwZS5yZW1vdmU7XG5MaXN0UHJvdG90eXBlLm1lcmdlID0gTGlzdFByb3RvdHlwZS5jb25jYXQ7XG5MaXN0UHJvdG90eXBlLnNldEluID0gc2V0SW4kMTtcbkxpc3RQcm90b3R5cGUuZGVsZXRlSW4gPSBMaXN0UHJvdG90eXBlLnJlbW92ZUluID0gZGVsZXRlSW47XG5MaXN0UHJvdG90eXBlLnVwZGF0ZSA9IHVwZGF0ZSQxO1xuTGlzdFByb3RvdHlwZS51cGRhdGVJbiA9IHVwZGF0ZUluJDE7XG5MaXN0UHJvdG90eXBlLm1lcmdlSW4gPSBtZXJnZUluO1xuTGlzdFByb3RvdHlwZS5tZXJnZURlZXBJbiA9IG1lcmdlRGVlcEluO1xuTGlzdFByb3RvdHlwZS53aXRoTXV0YXRpb25zID0gd2l0aE11dGF0aW9ucztcbkxpc3RQcm90b3R5cGUud2FzQWx0ZXJlZCA9IHdhc0FsdGVyZWQ7XG5MaXN0UHJvdG90eXBlLmFzSW1tdXRhYmxlID0gYXNJbW11dGFibGU7XG5MaXN0UHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gTGlzdFByb3RvdHlwZS5hc011dGFibGUgPSBhc011dGFibGU7XG5MaXN0UHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBhcnIpIHtcbiAgcmV0dXJuIHJlc3VsdC5wdXNoKGFycik7XG59O1xuTGlzdFByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmouYXNJbW11dGFibGUoKTtcbn07XG5cbnZhciBWTm9kZSA9IGZ1bmN0aW9uIFZOb2RlKGFycmF5LCBvd25lcklEKSB7XG4gIHRoaXMuYXJyYXkgPSBhcnJheTtcbiAgdGhpcy5vd25lcklEID0gb3duZXJJRDtcbn07XG5cbi8vIFRPRE86IHNlZW1zIGxpa2UgdGhlc2UgbWV0aG9kcyBhcmUgdmVyeSBzaW1pbGFyXG5cblZOb2RlLnByb3RvdHlwZS5yZW1vdmVCZWZvcmUgPSBmdW5jdGlvbiByZW1vdmVCZWZvcmUgKG93bmVySUQsIGxldmVsLCBpbmRleCkge1xuICBpZiAoaW5kZXggPT09IGxldmVsID8gMSA8PCBsZXZlbCA6IHRoaXMuYXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdmFyIG9yaWdpbkluZGV4ID0gKGluZGV4ID4+PiBsZXZlbCkgJiBNQVNLO1xuICBpZiAob3JpZ2luSW5kZXggPj0gdGhpcy5hcnJheS5sZW5ndGgpIHtcbiAgICByZXR1cm4gbmV3IFZOb2RlKFtdLCBvd25lcklEKTtcbiAgfVxuICB2YXIgcmVtb3ZpbmdGaXJzdCA9IG9yaWdpbkluZGV4ID09PSAwO1xuICB2YXIgbmV3Q2hpbGQ7XG4gIGlmIChsZXZlbCA+IDApIHtcbiAgICB2YXIgb2xkQ2hpbGQgPSB0aGlzLmFycmF5W29yaWdpbkluZGV4XTtcbiAgICBuZXdDaGlsZCA9XG4gICAgICBvbGRDaGlsZCAmJiBvbGRDaGlsZC5yZW1vdmVCZWZvcmUob3duZXJJRCwgbGV2ZWwgLSBTSElGVCwgaW5kZXgpO1xuICAgIGlmIChuZXdDaGlsZCA9PT0gb2xkQ2hpbGQgJiYgcmVtb3ZpbmdGaXJzdCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG4gIGlmIChyZW1vdmluZ0ZpcnN0ICYmICFuZXdDaGlsZCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHZhciBlZGl0YWJsZSA9IGVkaXRhYmxlVk5vZGUodGhpcywgb3duZXJJRCk7XG4gIGlmICghcmVtb3ZpbmdGaXJzdCkge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCBvcmlnaW5JbmRleDsgaWkrKykge1xuICAgICAgZWRpdGFibGUuYXJyYXlbaWldID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuICBpZiAobmV3Q2hpbGQpIHtcbiAgICBlZGl0YWJsZS5hcnJheVtvcmlnaW5JbmRleF0gPSBuZXdDaGlsZDtcbiAgfVxuICByZXR1cm4gZWRpdGFibGU7XG59O1xuXG5WTm9kZS5wcm90b3R5cGUucmVtb3ZlQWZ0ZXIgPSBmdW5jdGlvbiByZW1vdmVBZnRlciAob3duZXJJRCwgbGV2ZWwsIGluZGV4KSB7XG4gIGlmIChpbmRleCA9PT0gKGxldmVsID8gMSA8PCBsZXZlbCA6IDApIHx8IHRoaXMuYXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdmFyIHNpemVJbmRleCA9ICgoaW5kZXggLSAxKSA+Pj4gbGV2ZWwpICYgTUFTSztcbiAgaWYgKHNpemVJbmRleCA+PSB0aGlzLmFycmF5Lmxlbmd0aCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIG5ld0NoaWxkO1xuICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgdmFyIG9sZENoaWxkID0gdGhpcy5hcnJheVtzaXplSW5kZXhdO1xuICAgIG5ld0NoaWxkID1cbiAgICAgIG9sZENoaWxkICYmIG9sZENoaWxkLnJlbW92ZUFmdGVyKG93bmVySUQsIGxldmVsIC0gU0hJRlQsIGluZGV4KTtcbiAgICBpZiAobmV3Q2hpbGQgPT09IG9sZENoaWxkICYmIHNpemVJbmRleCA9PT0gdGhpcy5hcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cblxuICB2YXIgZWRpdGFibGUgPSBlZGl0YWJsZVZOb2RlKHRoaXMsIG93bmVySUQpO1xuICBlZGl0YWJsZS5hcnJheS5zcGxpY2Uoc2l6ZUluZGV4ICsgMSk7XG4gIGlmIChuZXdDaGlsZCkge1xuICAgIGVkaXRhYmxlLmFycmF5W3NpemVJbmRleF0gPSBuZXdDaGlsZDtcbiAgfVxuICByZXR1cm4gZWRpdGFibGU7XG59O1xuXG52YXIgRE9ORSA9IHt9O1xuXG5mdW5jdGlvbiBpdGVyYXRlTGlzdChsaXN0LCByZXZlcnNlKSB7XG4gIHZhciBsZWZ0ID0gbGlzdC5fb3JpZ2luO1xuICB2YXIgcmlnaHQgPSBsaXN0Ll9jYXBhY2l0eTtcbiAgdmFyIHRhaWxQb3MgPSBnZXRUYWlsT2Zmc2V0KHJpZ2h0KTtcbiAgdmFyIHRhaWwgPSBsaXN0Ll90YWlsO1xuXG4gIHJldHVybiBpdGVyYXRlTm9kZU9yTGVhZihsaXN0Ll9yb290LCBsaXN0Ll9sZXZlbCwgMCk7XG5cbiAgZnVuY3Rpb24gaXRlcmF0ZU5vZGVPckxlYWYobm9kZSwgbGV2ZWwsIG9mZnNldCkge1xuICAgIHJldHVybiBsZXZlbCA9PT0gMFxuICAgICAgPyBpdGVyYXRlTGVhZihub2RlLCBvZmZzZXQpXG4gICAgICA6IGl0ZXJhdGVOb2RlKG5vZGUsIGxldmVsLCBvZmZzZXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXRlcmF0ZUxlYWYobm9kZSwgb2Zmc2V0KSB7XG4gICAgdmFyIGFycmF5ID0gb2Zmc2V0ID09PSB0YWlsUG9zID8gdGFpbCAmJiB0YWlsLmFycmF5IDogbm9kZSAmJiBub2RlLmFycmF5O1xuICAgIHZhciBmcm9tID0gb2Zmc2V0ID4gbGVmdCA/IDAgOiBsZWZ0IC0gb2Zmc2V0O1xuICAgIHZhciB0byA9IHJpZ2h0IC0gb2Zmc2V0O1xuICAgIGlmICh0byA+IFNJWkUpIHtcbiAgICAgIHRvID0gU0laRTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChmcm9tID09PSB0bykge1xuICAgICAgICByZXR1cm4gRE9ORTtcbiAgICAgIH1cbiAgICAgIHZhciBpZHggPSByZXZlcnNlID8gLS10byA6IGZyb20rKztcbiAgICAgIHJldHVybiBhcnJheSAmJiBhcnJheVtpZHhdO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBpdGVyYXRlTm9kZShub2RlLCBsZXZlbCwgb2Zmc2V0KSB7XG4gICAgdmFyIHZhbHVlcztcbiAgICB2YXIgYXJyYXkgPSBub2RlICYmIG5vZGUuYXJyYXk7XG4gICAgdmFyIGZyb20gPSBvZmZzZXQgPiBsZWZ0ID8gMCA6IChsZWZ0IC0gb2Zmc2V0KSA+PiBsZXZlbDtcbiAgICB2YXIgdG8gPSAoKHJpZ2h0IC0gb2Zmc2V0KSA+PiBsZXZlbCkgKyAxO1xuICAgIGlmICh0byA+IFNJWkUpIHtcbiAgICAgIHRvID0gU0laRTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZXMoKTtcbiAgICAgICAgICBpZiAodmFsdWUgIT09IERPTkUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWVzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJvbSA9PT0gdG8pIHtcbiAgICAgICAgICByZXR1cm4gRE9ORTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaWR4ID0gcmV2ZXJzZSA/IC0tdG8gOiBmcm9tKys7XG4gICAgICAgIHZhbHVlcyA9IGl0ZXJhdGVOb2RlT3JMZWFmKFxuICAgICAgICAgIGFycmF5ICYmIGFycmF5W2lkeF0sXG4gICAgICAgICAgbGV2ZWwgLSBTSElGVCxcbiAgICAgICAgICBvZmZzZXQgKyAoaWR4IDw8IGxldmVsKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFrZUxpc3Qob3JpZ2luLCBjYXBhY2l0eSwgbGV2ZWwsIHJvb3QsIHRhaWwsIG93bmVySUQsIGhhc2gpIHtcbiAgdmFyIGxpc3QgPSBPYmplY3QuY3JlYXRlKExpc3RQcm90b3R5cGUpO1xuICBsaXN0LnNpemUgPSBjYXBhY2l0eSAtIG9yaWdpbjtcbiAgbGlzdC5fb3JpZ2luID0gb3JpZ2luO1xuICBsaXN0Ll9jYXBhY2l0eSA9IGNhcGFjaXR5O1xuICBsaXN0Ll9sZXZlbCA9IGxldmVsO1xuICBsaXN0Ll9yb290ID0gcm9vdDtcbiAgbGlzdC5fdGFpbCA9IHRhaWw7XG4gIGxpc3QuX19vd25lcklEID0gb3duZXJJRDtcbiAgbGlzdC5fX2hhc2ggPSBoYXNoO1xuICBsaXN0Ll9fYWx0ZXJlZCA9IGZhbHNlO1xuICByZXR1cm4gbGlzdDtcbn1cblxudmFyIEVNUFRZX0xJU1Q7XG5mdW5jdGlvbiBlbXB0eUxpc3QoKSB7XG4gIHJldHVybiBFTVBUWV9MSVNUIHx8IChFTVBUWV9MSVNUID0gbWFrZUxpc3QoMCwgMCwgU0hJRlQpKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTGlzdChsaXN0LCBpbmRleCwgdmFsdWUpIHtcbiAgaW5kZXggPSB3cmFwSW5kZXgobGlzdCwgaW5kZXgpO1xuXG4gIGlmIChpbmRleCAhPT0gaW5kZXgpIHtcbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gIGlmIChpbmRleCA+PSBsaXN0LnNpemUgfHwgaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGxpc3Qud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobGlzdCkge1xuICAgICAgaW5kZXggPCAwXG4gICAgICAgID8gc2V0TGlzdEJvdW5kcyhsaXN0LCBpbmRleCkuc2V0KDAsIHZhbHVlKVxuICAgICAgICA6IHNldExpc3RCb3VuZHMobGlzdCwgMCwgaW5kZXggKyAxKS5zZXQoaW5kZXgsIHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluZGV4ICs9IGxpc3QuX29yaWdpbjtcblxuICB2YXIgbmV3VGFpbCA9IGxpc3QuX3RhaWw7XG4gIHZhciBuZXdSb290ID0gbGlzdC5fcm9vdDtcbiAgdmFyIGRpZEFsdGVyID0gTWFrZVJlZigpO1xuICBpZiAoaW5kZXggPj0gZ2V0VGFpbE9mZnNldChsaXN0Ll9jYXBhY2l0eSkpIHtcbiAgICBuZXdUYWlsID0gdXBkYXRlVk5vZGUobmV3VGFpbCwgbGlzdC5fX293bmVySUQsIDAsIGluZGV4LCB2YWx1ZSwgZGlkQWx0ZXIpO1xuICB9IGVsc2Uge1xuICAgIG5ld1Jvb3QgPSB1cGRhdGVWTm9kZShcbiAgICAgIG5ld1Jvb3QsXG4gICAgICBsaXN0Ll9fb3duZXJJRCxcbiAgICAgIGxpc3QuX2xldmVsLFxuICAgICAgaW5kZXgsXG4gICAgICB2YWx1ZSxcbiAgICAgIGRpZEFsdGVyXG4gICAgKTtcbiAgfVxuXG4gIGlmICghZGlkQWx0ZXIudmFsdWUpIHtcbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gIGlmIChsaXN0Ll9fb3duZXJJRCkge1xuICAgIGxpc3QuX3Jvb3QgPSBuZXdSb290O1xuICAgIGxpc3QuX3RhaWwgPSBuZXdUYWlsO1xuICAgIGxpc3QuX19oYXNoID0gdW5kZWZpbmVkO1xuICAgIGxpc3QuX19hbHRlcmVkID0gdHJ1ZTtcbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuICByZXR1cm4gbWFrZUxpc3QobGlzdC5fb3JpZ2luLCBsaXN0Ll9jYXBhY2l0eSwgbGlzdC5fbGV2ZWwsIG5ld1Jvb3QsIG5ld1RhaWwpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVWTm9kZShub2RlLCBvd25lcklELCBsZXZlbCwgaW5kZXgsIHZhbHVlLCBkaWRBbHRlcikge1xuICB2YXIgaWR4ID0gKGluZGV4ID4+PiBsZXZlbCkgJiBNQVNLO1xuICB2YXIgbm9kZUhhcyA9IG5vZGUgJiYgaWR4IDwgbm9kZS5hcnJheS5sZW5ndGg7XG4gIGlmICghbm9kZUhhcyAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB2YXIgbmV3Tm9kZTtcblxuICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgdmFyIGxvd2VyTm9kZSA9IG5vZGUgJiYgbm9kZS5hcnJheVtpZHhdO1xuICAgIHZhciBuZXdMb3dlck5vZGUgPSB1cGRhdGVWTm9kZShcbiAgICAgIGxvd2VyTm9kZSxcbiAgICAgIG93bmVySUQsXG4gICAgICBsZXZlbCAtIFNISUZULFxuICAgICAgaW5kZXgsXG4gICAgICB2YWx1ZSxcbiAgICAgIGRpZEFsdGVyXG4gICAgKTtcbiAgICBpZiAobmV3TG93ZXJOb2RlID09PSBsb3dlck5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBuZXdOb2RlID0gZWRpdGFibGVWTm9kZShub2RlLCBvd25lcklEKTtcbiAgICBuZXdOb2RlLmFycmF5W2lkeF0gPSBuZXdMb3dlck5vZGU7XG4gICAgcmV0dXJuIG5ld05vZGU7XG4gIH1cblxuICBpZiAobm9kZUhhcyAmJiBub2RlLmFycmF5W2lkeF0gPT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBpZiAoZGlkQWx0ZXIpIHtcbiAgICBTZXRSZWYoZGlkQWx0ZXIpO1xuICB9XG5cbiAgbmV3Tm9kZSA9IGVkaXRhYmxlVk5vZGUobm9kZSwgb3duZXJJRCk7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGlkeCA9PT0gbmV3Tm9kZS5hcnJheS5sZW5ndGggLSAxKSB7XG4gICAgbmV3Tm9kZS5hcnJheS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBuZXdOb2RlLmFycmF5W2lkeF0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gbmV3Tm9kZTtcbn1cblxuZnVuY3Rpb24gZWRpdGFibGVWTm9kZShub2RlLCBvd25lcklEKSB7XG4gIGlmIChvd25lcklEICYmIG5vZGUgJiYgb3duZXJJRCA9PT0gbm9kZS5vd25lcklEKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgcmV0dXJuIG5ldyBWTm9kZShub2RlID8gbm9kZS5hcnJheS5zbGljZSgpIDogW10sIG93bmVySUQpO1xufVxuXG5mdW5jdGlvbiBsaXN0Tm9kZUZvcihsaXN0LCByYXdJbmRleCkge1xuICBpZiAocmF3SW5kZXggPj0gZ2V0VGFpbE9mZnNldChsaXN0Ll9jYXBhY2l0eSkpIHtcbiAgICByZXR1cm4gbGlzdC5fdGFpbDtcbiAgfVxuICBpZiAocmF3SW5kZXggPCAxIDw8IChsaXN0Ll9sZXZlbCArIFNISUZUKSkge1xuICAgIHZhciBub2RlID0gbGlzdC5fcm9vdDtcbiAgICB2YXIgbGV2ZWwgPSBsaXN0Ll9sZXZlbDtcbiAgICB3aGlsZSAobm9kZSAmJiBsZXZlbCA+IDApIHtcbiAgICAgIG5vZGUgPSBub2RlLmFycmF5WyhyYXdJbmRleCA+Pj4gbGV2ZWwpICYgTUFTS107XG4gICAgICBsZXZlbCAtPSBTSElGVDtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0TGlzdEJvdW5kcyhsaXN0LCBiZWdpbiwgZW5kKSB7XG4gIC8vIFNhbml0aXplIGJlZ2luICYgZW5kIHVzaW5nIHRoaXMgc2hvcnRoYW5kIGZvciBUb0ludDMyKGFyZ3VtZW50KVxuICAvLyBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9pbnQzMlxuICBpZiAoYmVnaW4gIT09IHVuZGVmaW5lZCkge1xuICAgIGJlZ2luIHw9IDA7XG4gIH1cbiAgaWYgKGVuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kIHw9IDA7XG4gIH1cbiAgdmFyIG93bmVyID0gbGlzdC5fX293bmVySUQgfHwgbmV3IE93bmVySUQoKTtcbiAgdmFyIG9sZE9yaWdpbiA9IGxpc3QuX29yaWdpbjtcbiAgdmFyIG9sZENhcGFjaXR5ID0gbGlzdC5fY2FwYWNpdHk7XG4gIHZhciBuZXdPcmlnaW4gPSBvbGRPcmlnaW4gKyBiZWdpbjtcbiAgdmFyIG5ld0NhcGFjaXR5ID1cbiAgICBlbmQgPT09IHVuZGVmaW5lZFxuICAgICAgPyBvbGRDYXBhY2l0eVxuICAgICAgOiBlbmQgPCAwXG4gICAgICAgID8gb2xkQ2FwYWNpdHkgKyBlbmRcbiAgICAgICAgOiBvbGRPcmlnaW4gKyBlbmQ7XG4gIGlmIChuZXdPcmlnaW4gPT09IG9sZE9yaWdpbiAmJiBuZXdDYXBhY2l0eSA9PT0gb2xkQ2FwYWNpdHkpIHtcbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gIC8vIElmIGl0J3MgZ29pbmcgdG8gZW5kIGFmdGVyIGl0IHN0YXJ0cywgaXQncyBlbXB0eS5cbiAgaWYgKG5ld09yaWdpbiA+PSBuZXdDYXBhY2l0eSkge1xuICAgIHJldHVybiBsaXN0LmNsZWFyKCk7XG4gIH1cblxuICB2YXIgbmV3TGV2ZWwgPSBsaXN0Ll9sZXZlbDtcbiAgdmFyIG5ld1Jvb3QgPSBsaXN0Ll9yb290O1xuXG4gIC8vIE5ldyBvcmlnaW4gbWlnaHQgbmVlZCBjcmVhdGluZyBhIGhpZ2hlciByb290LlxuICB2YXIgb2Zmc2V0U2hpZnQgPSAwO1xuICB3aGlsZSAobmV3T3JpZ2luICsgb2Zmc2V0U2hpZnQgPCAwKSB7XG4gICAgbmV3Um9vdCA9IG5ldyBWTm9kZShcbiAgICAgIG5ld1Jvb3QgJiYgbmV3Um9vdC5hcnJheS5sZW5ndGggPyBbdW5kZWZpbmVkLCBuZXdSb290XSA6IFtdLFxuICAgICAgb3duZXJcbiAgICApO1xuICAgIG5ld0xldmVsICs9IFNISUZUO1xuICAgIG9mZnNldFNoaWZ0ICs9IDEgPDwgbmV3TGV2ZWw7XG4gIH1cbiAgaWYgKG9mZnNldFNoaWZ0KSB7XG4gICAgbmV3T3JpZ2luICs9IG9mZnNldFNoaWZ0O1xuICAgIG9sZE9yaWdpbiArPSBvZmZzZXRTaGlmdDtcbiAgICBuZXdDYXBhY2l0eSArPSBvZmZzZXRTaGlmdDtcbiAgICBvbGRDYXBhY2l0eSArPSBvZmZzZXRTaGlmdDtcbiAgfVxuXG4gIHZhciBvbGRUYWlsT2Zmc2V0ID0gZ2V0VGFpbE9mZnNldChvbGRDYXBhY2l0eSk7XG4gIHZhciBuZXdUYWlsT2Zmc2V0ID0gZ2V0VGFpbE9mZnNldChuZXdDYXBhY2l0eSk7XG5cbiAgLy8gTmV3IHNpemUgbWlnaHQgbmVlZCBjcmVhdGluZyBhIGhpZ2hlciByb290LlxuICB3aGlsZSAobmV3VGFpbE9mZnNldCA+PSAxIDw8IChuZXdMZXZlbCArIFNISUZUKSkge1xuICAgIG5ld1Jvb3QgPSBuZXcgVk5vZGUoXG4gICAgICBuZXdSb290ICYmIG5ld1Jvb3QuYXJyYXkubGVuZ3RoID8gW25ld1Jvb3RdIDogW10sXG4gICAgICBvd25lclxuICAgICk7XG4gICAgbmV3TGV2ZWwgKz0gU0hJRlQ7XG4gIH1cblxuICAvLyBMb2NhdGUgb3IgY3JlYXRlIHRoZSBuZXcgdGFpbC5cbiAgdmFyIG9sZFRhaWwgPSBsaXN0Ll90YWlsO1xuICB2YXIgbmV3VGFpbCA9XG4gICAgbmV3VGFpbE9mZnNldCA8IG9sZFRhaWxPZmZzZXRcbiAgICAgID8gbGlzdE5vZGVGb3IobGlzdCwgbmV3Q2FwYWNpdHkgLSAxKVxuICAgICAgOiBuZXdUYWlsT2Zmc2V0ID4gb2xkVGFpbE9mZnNldFxuICAgICAgICA/IG5ldyBWTm9kZShbXSwgb3duZXIpXG4gICAgICAgIDogb2xkVGFpbDtcblxuICAvLyBNZXJnZSBUYWlsIGludG8gdHJlZS5cbiAgaWYgKFxuICAgIG9sZFRhaWwgJiZcbiAgICBuZXdUYWlsT2Zmc2V0ID4gb2xkVGFpbE9mZnNldCAmJlxuICAgIG5ld09yaWdpbiA8IG9sZENhcGFjaXR5ICYmXG4gICAgb2xkVGFpbC5hcnJheS5sZW5ndGhcbiAgKSB7XG4gICAgbmV3Um9vdCA9IGVkaXRhYmxlVk5vZGUobmV3Um9vdCwgb3duZXIpO1xuICAgIHZhciBub2RlID0gbmV3Um9vdDtcbiAgICBmb3IgKHZhciBsZXZlbCA9IG5ld0xldmVsOyBsZXZlbCA+IFNISUZUOyBsZXZlbCAtPSBTSElGVCkge1xuICAgICAgdmFyIGlkeCA9IChvbGRUYWlsT2Zmc2V0ID4+PiBsZXZlbCkgJiBNQVNLO1xuICAgICAgbm9kZSA9IG5vZGUuYXJyYXlbaWR4XSA9IGVkaXRhYmxlVk5vZGUobm9kZS5hcnJheVtpZHhdLCBvd25lcik7XG4gICAgfVxuICAgIG5vZGUuYXJyYXlbKG9sZFRhaWxPZmZzZXQgPj4+IFNISUZUKSAmIE1BU0tdID0gb2xkVGFpbDtcbiAgfVxuXG4gIC8vIElmIHRoZSBzaXplIGhhcyBiZWVuIHJlZHVjZWQsIHRoZXJlJ3MgYSBjaGFuY2UgdGhlIHRhaWwgbmVlZHMgdG8gYmUgdHJpbW1lZC5cbiAgaWYgKG5ld0NhcGFjaXR5IDwgb2xkQ2FwYWNpdHkpIHtcbiAgICBuZXdUYWlsID0gbmV3VGFpbCAmJiBuZXdUYWlsLnJlbW92ZUFmdGVyKG93bmVyLCAwLCBuZXdDYXBhY2l0eSk7XG4gIH1cblxuICAvLyBJZiB0aGUgbmV3IG9yaWdpbiBpcyB3aXRoaW4gdGhlIHRhaWwsIHRoZW4gd2UgZG8gbm90IG5lZWQgYSByb290LlxuICBpZiAobmV3T3JpZ2luID49IG5ld1RhaWxPZmZzZXQpIHtcbiAgICBuZXdPcmlnaW4gLT0gbmV3VGFpbE9mZnNldDtcbiAgICBuZXdDYXBhY2l0eSAtPSBuZXdUYWlsT2Zmc2V0O1xuICAgIG5ld0xldmVsID0gU0hJRlQ7XG4gICAgbmV3Um9vdCA9IG51bGw7XG4gICAgbmV3VGFpbCA9IG5ld1RhaWwgJiYgbmV3VGFpbC5yZW1vdmVCZWZvcmUob3duZXIsIDAsIG5ld09yaWdpbik7XG5cbiAgICAvLyBPdGhlcndpc2UsIGlmIHRoZSByb290IGhhcyBiZWVuIHRyaW1tZWQsIGdhcmJhZ2UgY29sbGVjdC5cbiAgfSBlbHNlIGlmIChuZXdPcmlnaW4gPiBvbGRPcmlnaW4gfHwgbmV3VGFpbE9mZnNldCA8IG9sZFRhaWxPZmZzZXQpIHtcbiAgICBvZmZzZXRTaGlmdCA9IDA7XG5cbiAgICAvLyBJZGVudGlmeSB0aGUgbmV3IHRvcCByb290IG5vZGUgb2YgdGhlIHN1YnRyZWUgb2YgdGhlIG9sZCByb290LlxuICAgIHdoaWxlIChuZXdSb290KSB7XG4gICAgICB2YXIgYmVnaW5JbmRleCA9IChuZXdPcmlnaW4gPj4+IG5ld0xldmVsKSAmIE1BU0s7XG4gICAgICBpZiAoKGJlZ2luSW5kZXggIT09IG5ld1RhaWxPZmZzZXQgPj4+IG5ld0xldmVsKSAmIE1BU0spIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoYmVnaW5JbmRleCkge1xuICAgICAgICBvZmZzZXRTaGlmdCArPSAoMSA8PCBuZXdMZXZlbCkgKiBiZWdpbkluZGV4O1xuICAgICAgfVxuICAgICAgbmV3TGV2ZWwgLT0gU0hJRlQ7XG4gICAgICBuZXdSb290ID0gbmV3Um9vdC5hcnJheVtiZWdpbkluZGV4XTtcbiAgICB9XG5cbiAgICAvLyBUcmltIHRoZSBuZXcgc2lkZXMgb2YgdGhlIG5ldyByb290LlxuICAgIGlmIChuZXdSb290ICYmIG5ld09yaWdpbiA+IG9sZE9yaWdpbikge1xuICAgICAgbmV3Um9vdCA9IG5ld1Jvb3QucmVtb3ZlQmVmb3JlKG93bmVyLCBuZXdMZXZlbCwgbmV3T3JpZ2luIC0gb2Zmc2V0U2hpZnQpO1xuICAgIH1cbiAgICBpZiAobmV3Um9vdCAmJiBuZXdUYWlsT2Zmc2V0IDwgb2xkVGFpbE9mZnNldCkge1xuICAgICAgbmV3Um9vdCA9IG5ld1Jvb3QucmVtb3ZlQWZ0ZXIoXG4gICAgICAgIG93bmVyLFxuICAgICAgICBuZXdMZXZlbCxcbiAgICAgICAgbmV3VGFpbE9mZnNldCAtIG9mZnNldFNoaWZ0XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAob2Zmc2V0U2hpZnQpIHtcbiAgICAgIG5ld09yaWdpbiAtPSBvZmZzZXRTaGlmdDtcbiAgICAgIG5ld0NhcGFjaXR5IC09IG9mZnNldFNoaWZ0O1xuICAgIH1cbiAgfVxuXG4gIGlmIChsaXN0Ll9fb3duZXJJRCkge1xuICAgIGxpc3Quc2l6ZSA9IG5ld0NhcGFjaXR5IC0gbmV3T3JpZ2luO1xuICAgIGxpc3QuX29yaWdpbiA9IG5ld09yaWdpbjtcbiAgICBsaXN0Ll9jYXBhY2l0eSA9IG5ld0NhcGFjaXR5O1xuICAgIGxpc3QuX2xldmVsID0gbmV3TGV2ZWw7XG4gICAgbGlzdC5fcm9vdCA9IG5ld1Jvb3Q7XG4gICAgbGlzdC5fdGFpbCA9IG5ld1RhaWw7XG4gICAgbGlzdC5fX2hhc2ggPSB1bmRlZmluZWQ7XG4gICAgbGlzdC5fX2FsdGVyZWQgPSB0cnVlO1xuICAgIHJldHVybiBsaXN0O1xuICB9XG4gIHJldHVybiBtYWtlTGlzdChuZXdPcmlnaW4sIG5ld0NhcGFjaXR5LCBuZXdMZXZlbCwgbmV3Um9vdCwgbmV3VGFpbCk7XG59XG5cbmZ1bmN0aW9uIGdldFRhaWxPZmZzZXQoc2l6ZSkge1xuICByZXR1cm4gc2l6ZSA8IFNJWkUgPyAwIDogKChzaXplIC0gMSkgPj4+IFNISUZUKSA8PCBTSElGVDtcbn1cblxudmFyIE9yZGVyZWRNYXAgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChNYXAkJDEpIHtcbiAgZnVuY3Rpb24gT3JkZXJlZE1hcCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICA/IGVtcHR5T3JkZXJlZE1hcCgpXG4gICAgICA6IGlzT3JkZXJlZE1hcCh2YWx1ZSlcbiAgICAgICAgPyB2YWx1ZVxuICAgICAgICA6IGVtcHR5T3JkZXJlZE1hcCgpLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICAgICAgdmFyIGl0ZXIgPSBLZXllZENvbGxlY3Rpb24odmFsdWUpO1xuICAgICAgICAgICAgYXNzZXJ0Tm90SW5maW5pdGUoaXRlci5zaXplKTtcbiAgICAgICAgICAgIGl0ZXIuZm9yRWFjaChmdW5jdGlvbiAodiwgaykgeyByZXR1cm4gbWFwLnNldChrLCB2KTsgfSk7XG4gICAgICAgICAgfSk7XG4gIH1cblxuICBpZiAoIE1hcCQkMSApIE9yZGVyZWRNYXAuX19wcm90b19fID0gTWFwJCQxO1xuICBPcmRlcmVkTWFwLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIE1hcCQkMSAmJiBNYXAkJDEucHJvdG90eXBlICk7XG4gIE9yZGVyZWRNYXAucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gT3JkZXJlZE1hcDtcblxuICBPcmRlcmVkTWFwLm9mID0gZnVuY3Rpb24gb2YgKC8qLi4udmFsdWVzKi8pIHtcbiAgICByZXR1cm4gdGhpcyhhcmd1bWVudHMpO1xuICB9O1xuXG4gIE9yZGVyZWRNYXAucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLl9fdG9TdHJpbmcoJ09yZGVyZWRNYXAgeycsICd9Jyk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBBY2Nlc3NcblxuICBPcmRlcmVkTWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGssIG5vdFNldFZhbHVlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5fbWFwLmdldChrKTtcbiAgICByZXR1cm4gaW5kZXggIT09IHVuZGVmaW5lZCA/IHRoaXMuX2xpc3QuZ2V0KGluZGV4KVsxXSA6IG5vdFNldFZhbHVlO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgTW9kaWZpY2F0aW9uXG5cbiAgT3JkZXJlZE1hcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3duZXJJRCkge1xuICAgICAgdGhpcy5zaXplID0gMDtcbiAgICAgIHRoaXMuX21hcC5jbGVhcigpO1xuICAgICAgdGhpcy5fbGlzdC5jbGVhcigpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBlbXB0eU9yZGVyZWRNYXAoKTtcbiAgfTtcblxuICBPcmRlcmVkTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQgKGssIHYpIHtcbiAgICByZXR1cm4gdXBkYXRlT3JkZXJlZE1hcCh0aGlzLCBrLCB2KTtcbiAgfTtcblxuICBPcmRlcmVkTWFwLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUgKGspIHtcbiAgICByZXR1cm4gdXBkYXRlT3JkZXJlZE1hcCh0aGlzLCBrLCBOT1RfU0VUKTtcbiAgfTtcblxuICBPcmRlcmVkTWFwLnByb3RvdHlwZS53YXNBbHRlcmVkID0gZnVuY3Rpb24gd2FzQWx0ZXJlZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hcC53YXNBbHRlcmVkKCkgfHwgdGhpcy5fbGlzdC53YXNBbHRlcmVkKCk7XG4gIH07XG5cbiAgT3JkZXJlZE1hcC5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMuX2xpc3QuX19pdGVyYXRlKFxuICAgICAgZnVuY3Rpb24gKGVudHJ5KSB7IHJldHVybiBlbnRyeSAmJiBmbihlbnRyeVsxXSwgZW50cnlbMF0sIHRoaXMkMSk7IH0sXG4gICAgICByZXZlcnNlXG4gICAgKTtcbiAgfTtcblxuICBPcmRlcmVkTWFwLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIHJldHVybiB0aGlzLl9saXN0LmZyb21FbnRyeVNlcSgpLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG4gIH07XG5cbiAgT3JkZXJlZE1hcC5wcm90b3R5cGUuX19lbnN1cmVPd25lciA9IGZ1bmN0aW9uIF9fZW5zdXJlT3duZXIgKG93bmVySUQpIHtcbiAgICBpZiAob3duZXJJRCA9PT0gdGhpcy5fX293bmVySUQpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgbmV3TWFwID0gdGhpcy5fbWFwLl9fZW5zdXJlT3duZXIob3duZXJJRCk7XG4gICAgdmFyIG5ld0xpc3QgPSB0aGlzLl9saXN0Ll9fZW5zdXJlT3duZXIob3duZXJJRCk7XG4gICAgaWYgKCFvd25lcklEKSB7XG4gICAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICAgIHJldHVybiBlbXB0eU9yZGVyZWRNYXAoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19vd25lcklEID0gb3duZXJJRDtcbiAgICAgIHRoaXMuX21hcCA9IG5ld01hcDtcbiAgICAgIHRoaXMuX2xpc3QgPSBuZXdMaXN0O1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBtYWtlT3JkZXJlZE1hcChuZXdNYXAsIG5ld0xpc3QsIG93bmVySUQsIHRoaXMuX19oYXNoKTtcbiAgfTtcblxuICByZXR1cm4gT3JkZXJlZE1hcDtcbn0oTWFwKSk7XG5cbk9yZGVyZWRNYXAuaXNPcmRlcmVkTWFwID0gaXNPcmRlcmVkTWFwO1xuXG5PcmRlcmVkTWFwLnByb3RvdHlwZVtJU19PUkRFUkVEX1NZTUJPTF0gPSB0cnVlO1xuT3JkZXJlZE1hcC5wcm90b3R5cGVbREVMRVRFXSA9IE9yZGVyZWRNYXAucHJvdG90eXBlLnJlbW92ZTtcblxuZnVuY3Rpb24gbWFrZU9yZGVyZWRNYXAobWFwLCBsaXN0LCBvd25lcklELCBoYXNoKSB7XG4gIHZhciBvbWFwID0gT2JqZWN0LmNyZWF0ZShPcmRlcmVkTWFwLnByb3RvdHlwZSk7XG4gIG9tYXAuc2l6ZSA9IG1hcCA/IG1hcC5zaXplIDogMDtcbiAgb21hcC5fbWFwID0gbWFwO1xuICBvbWFwLl9saXN0ID0gbGlzdDtcbiAgb21hcC5fX293bmVySUQgPSBvd25lcklEO1xuICBvbWFwLl9faGFzaCA9IGhhc2g7XG4gIHJldHVybiBvbWFwO1xufVxuXG52YXIgRU1QVFlfT1JERVJFRF9NQVA7XG5mdW5jdGlvbiBlbXB0eU9yZGVyZWRNYXAoKSB7XG4gIHJldHVybiAoXG4gICAgRU1QVFlfT1JERVJFRF9NQVAgfHxcbiAgICAoRU1QVFlfT1JERVJFRF9NQVAgPSBtYWtlT3JkZXJlZE1hcChlbXB0eU1hcCgpLCBlbXB0eUxpc3QoKSkpXG4gICk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU9yZGVyZWRNYXAob21hcCwgaywgdikge1xuICB2YXIgbWFwID0gb21hcC5fbWFwO1xuICB2YXIgbGlzdCA9IG9tYXAuX2xpc3Q7XG4gIHZhciBpID0gbWFwLmdldChrKTtcbiAgdmFyIGhhcyA9IGkgIT09IHVuZGVmaW5lZDtcbiAgdmFyIG5ld01hcDtcbiAgdmFyIG5ld0xpc3Q7XG4gIGlmICh2ID09PSBOT1RfU0VUKSB7XG4gICAgLy8gcmVtb3ZlZFxuICAgIGlmICghaGFzKSB7XG4gICAgICByZXR1cm4gb21hcDtcbiAgICB9XG4gICAgaWYgKGxpc3Quc2l6ZSA+PSBTSVpFICYmIGxpc3Quc2l6ZSA+PSBtYXAuc2l6ZSAqIDIpIHtcbiAgICAgIG5ld0xpc3QgPSBsaXN0LmZpbHRlcihmdW5jdGlvbiAoZW50cnksIGlkeCkgeyByZXR1cm4gZW50cnkgIT09IHVuZGVmaW5lZCAmJiBpICE9PSBpZHg7IH0pO1xuICAgICAgbmV3TWFwID0gbmV3TGlzdFxuICAgICAgICAudG9LZXllZFNlcSgpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7IHJldHVybiBlbnRyeVswXTsgfSlcbiAgICAgICAgLmZsaXAoKVxuICAgICAgICAudG9NYXAoKTtcbiAgICAgIGlmIChvbWFwLl9fb3duZXJJRCkge1xuICAgICAgICBuZXdNYXAuX19vd25lcklEID0gbmV3TGlzdC5fX293bmVySUQgPSBvbWFwLl9fb3duZXJJRDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbmV3TWFwID0gbWFwLnJlbW92ZShrKTtcbiAgICAgIG5ld0xpc3QgPSBpID09PSBsaXN0LnNpemUgLSAxID8gbGlzdC5wb3AoKSA6IGxpc3Quc2V0KGksIHVuZGVmaW5lZCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGhhcykge1xuICAgIGlmICh2ID09PSBsaXN0LmdldChpKVsxXSkge1xuICAgICAgcmV0dXJuIG9tYXA7XG4gICAgfVxuICAgIG5ld01hcCA9IG1hcDtcbiAgICBuZXdMaXN0ID0gbGlzdC5zZXQoaSwgW2ssIHZdKTtcbiAgfSBlbHNlIHtcbiAgICBuZXdNYXAgPSBtYXAuc2V0KGssIGxpc3Quc2l6ZSk7XG4gICAgbmV3TGlzdCA9IGxpc3Quc2V0KGxpc3Quc2l6ZSwgW2ssIHZdKTtcbiAgfVxuICBpZiAob21hcC5fX293bmVySUQpIHtcbiAgICBvbWFwLnNpemUgPSBuZXdNYXAuc2l6ZTtcbiAgICBvbWFwLl9tYXAgPSBuZXdNYXA7XG4gICAgb21hcC5fbGlzdCA9IG5ld0xpc3Q7XG4gICAgb21hcC5fX2hhc2ggPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIG9tYXA7XG4gIH1cbiAgcmV0dXJuIG1ha2VPcmRlcmVkTWFwKG5ld01hcCwgbmV3TGlzdCk7XG59XG5cbnZhciBJU19TVEFDS19TWU1CT0wgPSAnQEBfX0lNTVVUQUJMRV9TVEFDS19fQEAnO1xuXG5mdW5jdGlvbiBpc1N0YWNrKG1heWJlU3RhY2spIHtcbiAgcmV0dXJuIEJvb2xlYW4obWF5YmVTdGFjayAmJiBtYXliZVN0YWNrW0lTX1NUQUNLX1NZTUJPTF0pO1xufVxuXG52YXIgU3RhY2sgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChJbmRleGVkQ29sbGVjdGlvbiQkMSkge1xuICBmdW5jdGlvbiBTdGFjayh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICA/IGVtcHR5U3RhY2soKVxuICAgICAgOiBpc1N0YWNrKHZhbHVlKVxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogZW1wdHlTdGFjaygpLnB1c2hBbGwodmFsdWUpO1xuICB9XG5cbiAgaWYgKCBJbmRleGVkQ29sbGVjdGlvbiQkMSApIFN0YWNrLl9fcHJvdG9fXyA9IEluZGV4ZWRDb2xsZWN0aW9uJCQxO1xuICBTdGFjay5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBJbmRleGVkQ29sbGVjdGlvbiQkMSAmJiBJbmRleGVkQ29sbGVjdGlvbiQkMS5wcm90b3R5cGUgKTtcbiAgU3RhY2sucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3RhY2s7XG5cbiAgU3RhY2sub2YgPSBmdW5jdGlvbiBvZiAoLyouLi52YWx1ZXMqLykge1xuICAgIHJldHVybiB0aGlzKGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgU3RhY2sucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLl9fdG9TdHJpbmcoJ1N0YWNrIFsnLCAnXScpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgQWNjZXNzXG5cbiAgU3RhY2sucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoaW5kZXgsIG5vdFNldFZhbHVlKSB7XG4gICAgdmFyIGhlYWQgPSB0aGlzLl9oZWFkO1xuICAgIGluZGV4ID0gd3JhcEluZGV4KHRoaXMsIGluZGV4KTtcbiAgICB3aGlsZSAoaGVhZCAmJiBpbmRleC0tKSB7XG4gICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgIH1cbiAgICByZXR1cm4gaGVhZCA/IGhlYWQudmFsdWUgOiBub3RTZXRWYWx1ZTtcbiAgfTtcblxuICBTdGFjay5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uIHBlZWsgKCkge1xuICAgIHJldHVybiB0aGlzLl9oZWFkICYmIHRoaXMuX2hlYWQudmFsdWU7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBNb2RpZmljYXRpb25cblxuICBTdGFjay5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2ggKC8qLi4udmFsdWVzKi8pIHtcbiAgICB2YXIgYXJndW1lbnRzJDEgPSBhcmd1bWVudHM7XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHZhciBuZXdTaXplID0gdGhpcy5zaXplICsgYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgaGVhZCA9IHRoaXMuX2hlYWQ7XG4gICAgZm9yICh2YXIgaWkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaWkgPj0gMDsgaWktLSkge1xuICAgICAgaGVhZCA9IHtcbiAgICAgICAgdmFsdWU6IGFyZ3VtZW50cyQxW2lpXSxcbiAgICAgICAgbmV4dDogaGVhZCxcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3duZXJJRCkge1xuICAgICAgdGhpcy5zaXplID0gbmV3U2l6ZTtcbiAgICAgIHRoaXMuX2hlYWQgPSBoZWFkO1xuICAgICAgdGhpcy5fX2hhc2ggPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9fYWx0ZXJlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VTdGFjayhuZXdTaXplLCBoZWFkKTtcbiAgfTtcblxuICBTdGFjay5wcm90b3R5cGUucHVzaEFsbCA9IGZ1bmN0aW9uIHB1c2hBbGwgKGl0ZXIpIHtcbiAgICBpdGVyID0gSW5kZXhlZENvbGxlY3Rpb24kJDEoaXRlcik7XG4gICAgaWYgKGl0ZXIuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICh0aGlzLnNpemUgPT09IDAgJiYgaXNTdGFjayhpdGVyKSkge1xuICAgICAgcmV0dXJuIGl0ZXI7XG4gICAgfVxuICAgIGFzc2VydE5vdEluZmluaXRlKGl0ZXIuc2l6ZSk7XG4gICAgdmFyIG5ld1NpemUgPSB0aGlzLnNpemU7XG4gICAgdmFyIGhlYWQgPSB0aGlzLl9oZWFkO1xuICAgIGl0ZXIuX19pdGVyYXRlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgbmV3U2l6ZSsrO1xuICAgICAgaGVhZCA9IHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBuZXh0OiBoZWFkLFxuICAgICAgfTtcbiAgICB9LCAvKiByZXZlcnNlICovIHRydWUpO1xuICAgIGlmICh0aGlzLl9fb3duZXJJRCkge1xuICAgICAgdGhpcy5zaXplID0gbmV3U2l6ZTtcbiAgICAgIHRoaXMuX2hlYWQgPSBoZWFkO1xuICAgICAgdGhpcy5fX2hhc2ggPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9fYWx0ZXJlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VTdGFjayhuZXdTaXplLCBoZWFkKTtcbiAgfTtcblxuICBTdGFjay5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24gcG9wICgpIHtcbiAgICByZXR1cm4gdGhpcy5zbGljZSgxKTtcbiAgfTtcblxuICBTdGFjay5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICh0aGlzLl9fb3duZXJJRCkge1xuICAgICAgdGhpcy5zaXplID0gMDtcbiAgICAgIHRoaXMuX2hlYWQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9faGFzaCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX19hbHRlcmVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gZW1wdHlTdGFjaygpO1xuICB9O1xuXG4gIFN0YWNrLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChiZWdpbiwgZW5kKSB7XG4gICAgaWYgKHdob2xlU2xpY2UoYmVnaW4sIGVuZCwgdGhpcy5zaXplKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHZhciByZXNvbHZlZEJlZ2luID0gcmVzb2x2ZUJlZ2luKGJlZ2luLCB0aGlzLnNpemUpO1xuICAgIHZhciByZXNvbHZlZEVuZCA9IHJlc29sdmVFbmQoZW5kLCB0aGlzLnNpemUpO1xuICAgIGlmIChyZXNvbHZlZEVuZCAhPT0gdGhpcy5zaXplKSB7XG4gICAgICAvLyBzdXBlci5zbGljZShiZWdpbiwgZW5kKTtcbiAgICAgIHJldHVybiBJbmRleGVkQ29sbGVjdGlvbiQkMS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLCBiZWdpbiwgZW5kKTtcbiAgICB9XG4gICAgdmFyIG5ld1NpemUgPSB0aGlzLnNpemUgLSByZXNvbHZlZEJlZ2luO1xuICAgIHZhciBoZWFkID0gdGhpcy5faGVhZDtcbiAgICB3aGlsZSAocmVzb2x2ZWRCZWdpbi0tKSB7XG4gICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgIH1cbiAgICBpZiAodGhpcy5fX293bmVySUQpIHtcbiAgICAgIHRoaXMuc2l6ZSA9IG5ld1NpemU7XG4gICAgICB0aGlzLl9oZWFkID0gaGVhZDtcbiAgICAgIHRoaXMuX19oYXNoID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fX2FsdGVyZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBtYWtlU3RhY2sobmV3U2l6ZSwgaGVhZCk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBNdXRhYmlsaXR5XG5cbiAgU3RhY2sucHJvdG90eXBlLl9fZW5zdXJlT3duZXIgPSBmdW5jdGlvbiBfX2Vuc3VyZU93bmVyIChvd25lcklEKSB7XG4gICAgaWYgKG93bmVySUQgPT09IHRoaXMuX19vd25lcklEKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKCFvd25lcklEKSB7XG4gICAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICAgIHJldHVybiBlbXB0eVN0YWNrKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9fb3duZXJJRCA9IG93bmVySUQ7XG4gICAgICB0aGlzLl9fYWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBtYWtlU3RhY2sodGhpcy5zaXplLCB0aGlzLl9oZWFkLCBvd25lcklELCB0aGlzLl9faGFzaCk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBJdGVyYXRpb25cblxuICBTdGFjay5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHJldHVybiBuZXcgQXJyYXlTZXEodGhpcy50b0FycmF5KCkpLl9faXRlcmF0ZShcbiAgICAgICAgZnVuY3Rpb24gKHYsIGspIHsgcmV0dXJuIGZuKHYsIGssIHRoaXMkMSk7IH0sXG4gICAgICAgIHJldmVyc2VcbiAgICAgICk7XG4gICAgfVxuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB2YXIgbm9kZSA9IHRoaXMuX2hlYWQ7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgIGlmIChmbihub2RlLnZhbHVlLCBpdGVyYXRpb25zKyssIHRoaXMpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgfVxuICAgIHJldHVybiBpdGVyYXRpb25zO1xuICB9O1xuXG4gIFN0YWNrLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICByZXR1cm4gbmV3IEFycmF5U2VxKHRoaXMudG9BcnJheSgpKS5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICAgIH1cbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgdmFyIG5vZGUgPSB0aGlzLl9oZWFkO1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gbm9kZS52YWx1ZTtcbiAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yVmFsdWUodHlwZSwgaXRlcmF0aW9ucysrLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFN0YWNrO1xufShJbmRleGVkQ29sbGVjdGlvbikpO1xuXG5TdGFjay5pc1N0YWNrID0gaXNTdGFjaztcblxudmFyIFN0YWNrUHJvdG90eXBlID0gU3RhY2sucHJvdG90eXBlO1xuU3RhY2tQcm90b3R5cGVbSVNfU1RBQ0tfU1lNQk9MXSA9IHRydWU7XG5TdGFja1Byb3RvdHlwZS5zaGlmdCA9IFN0YWNrUHJvdG90eXBlLnBvcDtcblN0YWNrUHJvdG90eXBlLnVuc2hpZnQgPSBTdGFja1Byb3RvdHlwZS5wdXNoO1xuU3RhY2tQcm90b3R5cGUudW5zaGlmdEFsbCA9IFN0YWNrUHJvdG90eXBlLnB1c2hBbGw7XG5TdGFja1Byb3RvdHlwZS53aXRoTXV0YXRpb25zID0gd2l0aE11dGF0aW9ucztcblN0YWNrUHJvdG90eXBlLndhc0FsdGVyZWQgPSB3YXNBbHRlcmVkO1xuU3RhY2tQcm90b3R5cGUuYXNJbW11dGFibGUgPSBhc0ltbXV0YWJsZTtcblN0YWNrUHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gU3RhY2tQcm90b3R5cGUuYXNNdXRhYmxlID0gYXNNdXRhYmxlO1xuU3RhY2tQcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGFycikge1xuICByZXR1cm4gcmVzdWx0LnVuc2hpZnQoYXJyKTtcbn07XG5TdGFja1Byb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBvYmouYXNJbW11dGFibGUoKTtcbn07XG5cbmZ1bmN0aW9uIG1ha2VTdGFjayhzaXplLCBoZWFkLCBvd25lcklELCBoYXNoKSB7XG4gIHZhciBtYXAgPSBPYmplY3QuY3JlYXRlKFN0YWNrUHJvdG90eXBlKTtcbiAgbWFwLnNpemUgPSBzaXplO1xuICBtYXAuX2hlYWQgPSBoZWFkO1xuICBtYXAuX19vd25lcklEID0gb3duZXJJRDtcbiAgbWFwLl9faGFzaCA9IGhhc2g7XG4gIG1hcC5fX2FsdGVyZWQgPSBmYWxzZTtcbiAgcmV0dXJuIG1hcDtcbn1cblxudmFyIEVNUFRZX1NUQUNLO1xuZnVuY3Rpb24gZW1wdHlTdGFjaygpIHtcbiAgcmV0dXJuIEVNUFRZX1NUQUNLIHx8IChFTVBUWV9TVEFDSyA9IG1ha2VTdGFjaygwKSk7XG59XG5cbnZhciBJU19TRVRfU1lNQk9MID0gJ0BAX19JTU1VVEFCTEVfU0VUX19AQCc7XG5cbmZ1bmN0aW9uIGlzU2V0KG1heWJlU2V0KSB7XG4gIHJldHVybiBCb29sZWFuKG1heWJlU2V0ICYmIG1heWJlU2V0W0lTX1NFVF9TWU1CT0xdKTtcbn1cblxuZnVuY3Rpb24gaXNPcmRlcmVkU2V0KG1heWJlT3JkZXJlZFNldCkge1xuICByZXR1cm4gaXNTZXQobWF5YmVPcmRlcmVkU2V0KSAmJiBpc09yZGVyZWQobWF5YmVPcmRlcmVkU2V0KTtcbn1cblxuZnVuY3Rpb24gZGVlcEVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChcbiAgICAhaXNDb2xsZWN0aW9uKGIpIHx8XG4gICAgKGEuc2l6ZSAhPT0gdW5kZWZpbmVkICYmIGIuc2l6ZSAhPT0gdW5kZWZpbmVkICYmIGEuc2l6ZSAhPT0gYi5zaXplKSB8fFxuICAgIChhLl9faGFzaCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBiLl9faGFzaCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBhLl9faGFzaCAhPT0gYi5fX2hhc2gpIHx8XG4gICAgaXNLZXllZChhKSAhPT0gaXNLZXllZChiKSB8fFxuICAgIGlzSW5kZXhlZChhKSAhPT0gaXNJbmRleGVkKGIpIHx8XG4gICAgaXNPcmRlcmVkKGEpICE9PSBpc09yZGVyZWQoYilcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGEuc2l6ZSA9PT0gMCAmJiBiLnNpemUgPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHZhciBub3RBc3NvY2lhdGl2ZSA9ICFpc0Fzc29jaWF0aXZlKGEpO1xuXG4gIGlmIChpc09yZGVyZWQoYSkpIHtcbiAgICB2YXIgZW50cmllcyA9IGEuZW50cmllcygpO1xuICAgIHJldHVybiAoXG4gICAgICBiLmV2ZXJ5KGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IGVudHJpZXMubmV4dCgpLnZhbHVlO1xuICAgICAgICByZXR1cm4gZW50cnkgJiYgaXMoZW50cnlbMV0sIHYpICYmIChub3RBc3NvY2lhdGl2ZSB8fCBpcyhlbnRyeVswXSwgaykpO1xuICAgICAgfSkgJiYgZW50cmllcy5uZXh0KCkuZG9uZVxuICAgICk7XG4gIH1cblxuICB2YXIgZmxpcHBlZCA9IGZhbHNlO1xuXG4gIGlmIChhLnNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChiLnNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBhLmNhY2hlUmVzdWx0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGEuY2FjaGVSZXN1bHQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZmxpcHBlZCA9IHRydWU7XG4gICAgICB2YXIgXyA9IGE7XG4gICAgICBhID0gYjtcbiAgICAgIGIgPSBfO1xuICAgIH1cbiAgfVxuXG4gIHZhciBhbGxFcXVhbCA9IHRydWU7XG4gIHZhciBiU2l6ZSA9IGIuX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgaWYgKFxuICAgICAgbm90QXNzb2NpYXRpdmVcbiAgICAgICAgPyAhYS5oYXModilcbiAgICAgICAgOiBmbGlwcGVkXG4gICAgICAgICAgPyAhaXModiwgYS5nZXQoaywgTk9UX1NFVCkpXG4gICAgICAgICAgOiAhaXMoYS5nZXQoaywgTk9UX1NFVCksIHYpXG4gICAgKSB7XG4gICAgICBhbGxFcXVhbCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGFsbEVxdWFsICYmIGEuc2l6ZSA9PT0gYlNpemU7XG59XG5cbi8qKlxuICogQ29udHJpYnV0ZXMgYWRkaXRpb25hbCBtZXRob2RzIHRvIGEgY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gbWl4aW4oY3RvciwgbWV0aG9kcykge1xuICB2YXIga2V5Q29waWVyID0gZnVuY3Rpb24gKGtleSkge1xuICAgIGN0b3IucHJvdG90eXBlW2tleV0gPSBtZXRob2RzW2tleV07XG4gIH07XG4gIE9iamVjdC5rZXlzKG1ldGhvZHMpLmZvckVhY2goa2V5Q29waWVyKTtcbiAgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJlxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMobWV0aG9kcykuZm9yRWFjaChrZXlDb3BpZXIpO1xuICByZXR1cm4gY3Rvcjtcbn1cblxuZnVuY3Rpb24gdG9KUyh2YWx1ZSkge1xuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKCFpc0NvbGxlY3Rpb24odmFsdWUpKSB7XG4gICAgaWYgKCFpc0RhdGFTdHJ1Y3R1cmUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHZhbHVlID0gU2VxKHZhbHVlKTtcbiAgfVxuICBpZiAoaXNLZXllZCh2YWx1ZSkpIHtcbiAgICB2YXIgcmVzdWx0JDEgPSB7fTtcbiAgICB2YWx1ZS5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGspIHtcbiAgICAgIHJlc3VsdCQxW2tdID0gdG9KUyh2KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0JDE7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YWx1ZS5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYpIHtcbiAgICByZXN1bHQucHVzaCh0b0pTKHYpKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbnZhciBTZXQgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChTZXRDb2xsZWN0aW9uJCQxKSB7XG4gIGZ1bmN0aW9uIFNldCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICA/IGVtcHR5U2V0KClcbiAgICAgIDogaXNTZXQodmFsdWUpICYmICFpc09yZGVyZWQodmFsdWUpXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiBlbXB0eVNldCgpLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKHNldCkge1xuICAgICAgICAgICAgdmFyIGl0ZXIgPSBTZXRDb2xsZWN0aW9uJCQxKHZhbHVlKTtcbiAgICAgICAgICAgIGFzc2VydE5vdEluZmluaXRlKGl0ZXIuc2l6ZSk7XG4gICAgICAgICAgICBpdGVyLmZvckVhY2goZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHNldC5hZGQodik7IH0pO1xuICAgICAgICAgIH0pO1xuICB9XG5cbiAgaWYgKCBTZXRDb2xsZWN0aW9uJCQxICkgU2V0Ll9fcHJvdG9fXyA9IFNldENvbGxlY3Rpb24kJDE7XG4gIFNldC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBTZXRDb2xsZWN0aW9uJCQxICYmIFNldENvbGxlY3Rpb24kJDEucHJvdG90eXBlICk7XG4gIFNldC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZXQ7XG5cbiAgU2V0Lm9mID0gZnVuY3Rpb24gb2YgKC8qLi4udmFsdWVzKi8pIHtcbiAgICByZXR1cm4gdGhpcyhhcmd1bWVudHMpO1xuICB9O1xuXG4gIFNldC5mcm9tS2V5cyA9IGZ1bmN0aW9uIGZyb21LZXlzICh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzKEtleWVkQ29sbGVjdGlvbih2YWx1ZSkua2V5U2VxKCkpO1xuICB9O1xuXG4gIFNldC5pbnRlcnNlY3QgPSBmdW5jdGlvbiBpbnRlcnNlY3QgKHNldHMpIHtcbiAgICBzZXRzID0gQ29sbGVjdGlvbihzZXRzKS50b0FycmF5KCk7XG4gICAgcmV0dXJuIHNldHMubGVuZ3RoXG4gICAgICA/IFNldFByb3RvdHlwZS5pbnRlcnNlY3QuYXBwbHkoU2V0KHNldHMucG9wKCkpLCBzZXRzKVxuICAgICAgOiBlbXB0eVNldCgpO1xuICB9O1xuXG4gIFNldC51bmlvbiA9IGZ1bmN0aW9uIHVuaW9uIChzZXRzKSB7XG4gICAgc2V0cyA9IENvbGxlY3Rpb24oc2V0cykudG9BcnJheSgpO1xuICAgIHJldHVybiBzZXRzLmxlbmd0aFxuICAgICAgPyBTZXRQcm90b3R5cGUudW5pb24uYXBwbHkoU2V0KHNldHMucG9wKCkpLCBzZXRzKVxuICAgICAgOiBlbXB0eVNldCgpO1xuICB9O1xuXG4gIFNldC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX190b1N0cmluZygnU2V0IHsnLCAnfScpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgQWNjZXNzXG5cbiAgU2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBoYXMgKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hcC5oYXModmFsdWUpO1xuICB9O1xuXG4gIC8vIEBwcmFnbWEgTW9kaWZpY2F0aW9uXG5cbiAgU2V0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQgKHZhbHVlKSB7XG4gICAgcmV0dXJuIHVwZGF0ZVNldCh0aGlzLCB0aGlzLl9tYXAuc2V0KHZhbHVlLCB2YWx1ZSkpO1xuICB9O1xuXG4gIFNldC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlICh2YWx1ZSkge1xuICAgIHJldHVybiB1cGRhdGVTZXQodGhpcywgdGhpcy5fbWFwLnJlbW92ZSh2YWx1ZSkpO1xuICB9O1xuXG4gIFNldC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgcmV0dXJuIHVwZGF0ZVNldCh0aGlzLCB0aGlzLl9tYXAuY2xlYXIoKSk7XG4gIH07XG5cbiAgLy8gQHByYWdtYSBDb21wb3NpdGlvblxuXG4gIFNldC5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gbWFwIChtYXBwZXIsIGNvbnRleHQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciByZW1vdmVzID0gW107XG4gICAgdmFyIGFkZHMgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB2YXIgbWFwcGVkID0gbWFwcGVyLmNhbGwoY29udGV4dCwgdmFsdWUsIHZhbHVlLCB0aGlzJDEpO1xuICAgICAgaWYgKG1hcHBlZCAhPT0gdmFsdWUpIHtcbiAgICAgICAgcmVtb3Zlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgYWRkcy5wdXNoKG1hcHBlZCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAoc2V0KSB7XG4gICAgICByZW1vdmVzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBzZXQucmVtb3ZlKHZhbHVlKTsgfSk7XG4gICAgICBhZGRzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBzZXQuYWRkKHZhbHVlKTsgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgU2V0LnByb3RvdHlwZS51bmlvbiA9IGZ1bmN0aW9uIHVuaW9uICgpIHtcbiAgICB2YXIgaXRlcnMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkgaXRlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgIGl0ZXJzID0gaXRlcnMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LnNpemUgIT09IDA7IH0pO1xuICAgIGlmIChpdGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaXplID09PSAwICYmICF0aGlzLl9fb3duZXJJRCAmJiBpdGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yKGl0ZXJzWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAoc2V0KSB7XG4gICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgaXRlcnMubGVuZ3RoOyBpaSsrKSB7XG4gICAgICAgIFNldENvbGxlY3Rpb24kJDEoaXRlcnNbaWldKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gc2V0LmFkZCh2YWx1ZSk7IH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIFNldC5wcm90b3R5cGUuaW50ZXJzZWN0ID0gZnVuY3Rpb24gaW50ZXJzZWN0ICgpIHtcbiAgICB2YXIgaXRlcnMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkgaXRlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgIGlmIChpdGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpdGVycyA9IGl0ZXJzLm1hcChmdW5jdGlvbiAoaXRlcikgeyByZXR1cm4gU2V0Q29sbGVjdGlvbiQkMShpdGVyKTsgfSk7XG4gICAgdmFyIHRvUmVtb3ZlID0gW107XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKCFpdGVycy5ldmVyeShmdW5jdGlvbiAoaXRlcikgeyByZXR1cm4gaXRlci5pbmNsdWRlcyh2YWx1ZSk7IH0pKSB7XG4gICAgICAgIHRvUmVtb3ZlLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKHNldCkge1xuICAgICAgdG9SZW1vdmUuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2V0LnJlbW92ZSh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLnN1YnRyYWN0ID0gZnVuY3Rpb24gc3VidHJhY3QgKCkge1xuICAgIHZhciBpdGVycyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICggbGVuLS0gKSBpdGVyc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgaWYgKGl0ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGl0ZXJzID0gaXRlcnMubWFwKGZ1bmN0aW9uIChpdGVyKSB7IHJldHVybiBTZXRDb2xsZWN0aW9uJCQxKGl0ZXIpOyB9KTtcbiAgICB2YXIgdG9SZW1vdmUgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAoaXRlcnMuc29tZShmdW5jdGlvbiAoaXRlcikgeyByZXR1cm4gaXRlci5pbmNsdWRlcyh2YWx1ZSk7IH0pKSB7XG4gICAgICAgIHRvUmVtb3ZlLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKHNldCkge1xuICAgICAgdG9SZW1vdmUuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgc2V0LnJlbW92ZSh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLnNvcnQgPSBmdW5jdGlvbiBzb3J0IChjb21wYXJhdG9yKSB7XG4gICAgLy8gTGF0ZSBiaW5kaW5nXG4gICAgcmV0dXJuIE9yZGVyZWRTZXQoc29ydEZhY3RvcnkodGhpcywgY29tcGFyYXRvcikpO1xuICB9O1xuXG4gIFNldC5wcm90b3R5cGUuc29ydEJ5ID0gZnVuY3Rpb24gc29ydEJ5IChtYXBwZXIsIGNvbXBhcmF0b3IpIHtcbiAgICAvLyBMYXRlIGJpbmRpbmdcbiAgICByZXR1cm4gT3JkZXJlZFNldChzb3J0RmFjdG9yeSh0aGlzLCBjb21wYXJhdG9yLCBtYXBwZXIpKTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLndhc0FsdGVyZWQgPSBmdW5jdGlvbiB3YXNBbHRlcmVkICgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFwLndhc0FsdGVyZWQoKTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzLl9tYXAuX19pdGVyYXRlKGZ1bmN0aW9uIChrKSB7IHJldHVybiBmbihrLCBrLCB0aGlzJDEpOyB9LCByZXZlcnNlKTtcbiAgfTtcblxuICBTZXQucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hcC5fX2l0ZXJhdG9yKHR5cGUsIHJldmVyc2UpO1xuICB9O1xuXG4gIFNldC5wcm90b3R5cGUuX19lbnN1cmVPd25lciA9IGZ1bmN0aW9uIF9fZW5zdXJlT3duZXIgKG93bmVySUQpIHtcbiAgICBpZiAob3duZXJJRCA9PT0gdGhpcy5fX293bmVySUQpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgbmV3TWFwID0gdGhpcy5fbWFwLl9fZW5zdXJlT3duZXIob3duZXJJRCk7XG4gICAgaWYgKCFvd25lcklEKSB7XG4gICAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fZW1wdHkoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19vd25lcklEID0gb3duZXJJRDtcbiAgICAgIHRoaXMuX21hcCA9IG5ld01hcDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fX21ha2UobmV3TWFwLCBvd25lcklEKTtcbiAgfTtcblxuICByZXR1cm4gU2V0O1xufShTZXRDb2xsZWN0aW9uKSk7XG5cblNldC5pc1NldCA9IGlzU2V0O1xuXG52YXIgU2V0UHJvdG90eXBlID0gU2V0LnByb3RvdHlwZTtcblNldFByb3RvdHlwZVtJU19TRVRfU1lNQk9MXSA9IHRydWU7XG5TZXRQcm90b3R5cGVbREVMRVRFXSA9IFNldFByb3RvdHlwZS5yZW1vdmU7XG5TZXRQcm90b3R5cGUubWVyZ2UgPSBTZXRQcm90b3R5cGUuY29uY2F0ID0gU2V0UHJvdG90eXBlLnVuaW9uO1xuU2V0UHJvdG90eXBlLndpdGhNdXRhdGlvbnMgPSB3aXRoTXV0YXRpb25zO1xuU2V0UHJvdG90eXBlLmFzSW1tdXRhYmxlID0gYXNJbW11dGFibGU7XG5TZXRQcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBTZXRQcm90b3R5cGUuYXNNdXRhYmxlID0gYXNNdXRhYmxlO1xuU2V0UHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBhcnIpIHtcbiAgcmV0dXJuIHJlc3VsdC5hZGQoYXJyKTtcbn07XG5TZXRQcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gb2JqLmFzSW1tdXRhYmxlKCk7XG59O1xuXG5TZXRQcm90b3R5cGUuX19lbXB0eSA9IGVtcHR5U2V0O1xuU2V0UHJvdG90eXBlLl9fbWFrZSA9IG1ha2VTZXQ7XG5cbmZ1bmN0aW9uIHVwZGF0ZVNldChzZXQsIG5ld01hcCkge1xuICBpZiAoc2V0Ll9fb3duZXJJRCkge1xuICAgIHNldC5zaXplID0gbmV3TWFwLnNpemU7XG4gICAgc2V0Ll9tYXAgPSBuZXdNYXA7XG4gICAgcmV0dXJuIHNldDtcbiAgfVxuICByZXR1cm4gbmV3TWFwID09PSBzZXQuX21hcFxuICAgID8gc2V0XG4gICAgOiBuZXdNYXAuc2l6ZSA9PT0gMFxuICAgICAgPyBzZXQuX19lbXB0eSgpXG4gICAgICA6IHNldC5fX21ha2UobmV3TWFwKTtcbn1cblxuZnVuY3Rpb24gbWFrZVNldChtYXAsIG93bmVySUQpIHtcbiAgdmFyIHNldCA9IE9iamVjdC5jcmVhdGUoU2V0UHJvdG90eXBlKTtcbiAgc2V0LnNpemUgPSBtYXAgPyBtYXAuc2l6ZSA6IDA7XG4gIHNldC5fbWFwID0gbWFwO1xuICBzZXQuX19vd25lcklEID0gb3duZXJJRDtcbiAgcmV0dXJuIHNldDtcbn1cblxudmFyIEVNUFRZX1NFVDtcbmZ1bmN0aW9uIGVtcHR5U2V0KCkge1xuICByZXR1cm4gRU1QVFlfU0VUIHx8IChFTVBUWV9TRVQgPSBtYWtlU2V0KGVtcHR5TWFwKCkpKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbGF6eSBzZXEgb2YgbnVtcyBmcm9tIHN0YXJ0IChpbmNsdXNpdmUpIHRvIGVuZFxuICogKGV4Y2x1c2l2ZSksIGJ5IHN0ZXAsIHdoZXJlIHN0YXJ0IGRlZmF1bHRzIHRvIDAsIHN0ZXAgdG8gMSwgYW5kIGVuZCB0b1xuICogaW5maW5pdHkuIFdoZW4gc3RhcnQgaXMgZXF1YWwgdG8gZW5kLCByZXR1cm5zIGVtcHR5IGxpc3QuXG4gKi9cbnZhciBSYW5nZSA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKEluZGV4ZWRTZXEkJDEpIHtcbiAgZnVuY3Rpb24gUmFuZ2Uoc3RhcnQsIGVuZCwgc3RlcCkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSYW5nZSkpIHtcbiAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnQsIGVuZCwgc3RlcCk7XG4gICAgfVxuICAgIGludmFyaWFudChzdGVwICE9PSAwLCAnQ2Fubm90IHN0ZXAgYSBSYW5nZSBieSAwJyk7XG4gICAgc3RhcnQgPSBzdGFydCB8fCAwO1xuICAgIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZW5kID0gSW5maW5pdHk7XG4gICAgfVxuICAgIHN0ZXAgPSBzdGVwID09PSB1bmRlZmluZWQgPyAxIDogTWF0aC5hYnMoc3RlcCk7XG4gICAgaWYgKGVuZCA8IHN0YXJ0KSB7XG4gICAgICBzdGVwID0gLXN0ZXA7XG4gICAgfVxuICAgIHRoaXMuX3N0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5fZW5kID0gZW5kO1xuICAgIHRoaXMuX3N0ZXAgPSBzdGVwO1xuICAgIHRoaXMuc2l6ZSA9IE1hdGgubWF4KDAsIE1hdGguY2VpbCgoZW5kIC0gc3RhcnQpIC8gc3RlcCAtIDEpICsgMSk7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgaWYgKEVNUFRZX1JBTkdFKSB7XG4gICAgICAgIHJldHVybiBFTVBUWV9SQU5HRTtcbiAgICAgIH1cbiAgICAgIEVNUFRZX1JBTkdFID0gdGhpcztcbiAgICB9XG4gIH1cblxuICBpZiAoIEluZGV4ZWRTZXEkJDEgKSBSYW5nZS5fX3Byb3RvX18gPSBJbmRleGVkU2VxJCQxO1xuICBSYW5nZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBJbmRleGVkU2VxJCQxICYmIEluZGV4ZWRTZXEkJDEucHJvdG90eXBlICk7XG4gIFJhbmdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJhbmdlO1xuXG4gIFJhbmdlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gJ1JhbmdlIFtdJztcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICdSYW5nZSBbICcgK1xuICAgICAgdGhpcy5fc3RhcnQgK1xuICAgICAgJy4uLicgK1xuICAgICAgdGhpcy5fZW5kICtcbiAgICAgICh0aGlzLl9zdGVwICE9PSAxID8gJyBieSAnICsgdGhpcy5fc3RlcCA6ICcnKSArXG4gICAgICAnIF0nXG4gICAgKTtcbiAgfTtcblxuICBSYW5nZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChpbmRleCwgbm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5oYXMoaW5kZXgpXG4gICAgICA/IHRoaXMuX3N0YXJ0ICsgd3JhcEluZGV4KHRoaXMsIGluZGV4KSAqIHRoaXMuX3N0ZXBcbiAgICAgIDogbm90U2V0VmFsdWU7XG4gIH07XG5cbiAgUmFuZ2UucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHNlYXJjaFZhbHVlKSB7XG4gICAgdmFyIHBvc3NpYmxlSW5kZXggPSAoc2VhcmNoVmFsdWUgLSB0aGlzLl9zdGFydCkgLyB0aGlzLl9zdGVwO1xuICAgIHJldHVybiAoXG4gICAgICBwb3NzaWJsZUluZGV4ID49IDAgJiZcbiAgICAgIHBvc3NpYmxlSW5kZXggPCB0aGlzLnNpemUgJiZcbiAgICAgIHBvc3NpYmxlSW5kZXggPT09IE1hdGguZmxvb3IocG9zc2libGVJbmRleClcbiAgICApO1xuICB9O1xuXG4gIFJhbmdlLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChiZWdpbiwgZW5kKSB7XG4gICAgaWYgKHdob2xlU2xpY2UoYmVnaW4sIGVuZCwgdGhpcy5zaXplKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGJlZ2luID0gcmVzb2x2ZUJlZ2luKGJlZ2luLCB0aGlzLnNpemUpO1xuICAgIGVuZCA9IHJlc29sdmVFbmQoZW5kLCB0aGlzLnNpemUpO1xuICAgIGlmIChlbmQgPD0gYmVnaW4pIHtcbiAgICAgIHJldHVybiBuZXcgUmFuZ2UoMCwgMCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUmFuZ2UoXG4gICAgICB0aGlzLmdldChiZWdpbiwgdGhpcy5fZW5kKSxcbiAgICAgIHRoaXMuZ2V0KGVuZCwgdGhpcy5fZW5kKSxcbiAgICAgIHRoaXMuX3N0ZXBcbiAgICApO1xuICB9O1xuXG4gIFJhbmdlLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAoc2VhcmNoVmFsdWUpIHtcbiAgICB2YXIgb2Zmc2V0VmFsdWUgPSBzZWFyY2hWYWx1ZSAtIHRoaXMuX3N0YXJ0O1xuICAgIGlmIChvZmZzZXRWYWx1ZSAlIHRoaXMuX3N0ZXAgPT09IDApIHtcbiAgICAgIHZhciBpbmRleCA9IG9mZnNldFZhbHVlIC8gdGhpcy5fc3RlcDtcbiAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5zaXplKSB7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG4gIFJhbmdlLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mIChzZWFyY2hWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmluZGV4T2Yoc2VhcmNoVmFsdWUpO1xuICB9O1xuXG4gIFJhbmdlLnByb3RvdHlwZS5fX2l0ZXJhdGUgPSBmdW5jdGlvbiBfX2l0ZXJhdGUgKGZuLCByZXZlcnNlKSB7XG4gICAgdmFyIHNpemUgPSB0aGlzLnNpemU7XG4gICAgdmFyIHN0ZXAgPSB0aGlzLl9zdGVwO1xuICAgIHZhciB2YWx1ZSA9IHJldmVyc2UgPyB0aGlzLl9zdGFydCArIChzaXplIC0gMSkgKiBzdGVwIDogdGhpcy5fc3RhcnQ7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpICE9PSBzaXplKSB7XG4gICAgICBpZiAoZm4odmFsdWUsIHJldmVyc2UgPyBzaXplIC0gKytpIDogaSsrLCB0aGlzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB2YWx1ZSArPSByZXZlcnNlID8gLXN0ZXAgOiBzdGVwO1xuICAgIH1cbiAgICByZXR1cm4gaTtcbiAgfTtcblxuICBSYW5nZS5wcm90b3R5cGUuX19pdGVyYXRvciA9IGZ1bmN0aW9uIF9faXRlcmF0b3IgKHR5cGUsIHJldmVyc2UpIHtcbiAgICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICB2YXIgc3RlcCA9IHRoaXMuX3N0ZXA7XG4gICAgdmFyIHZhbHVlID0gcmV2ZXJzZSA/IHRoaXMuX3N0YXJ0ICsgKHNpemUgLSAxKSAqIHN0ZXAgOiB0aGlzLl9zdGFydDtcbiAgICB2YXIgaSA9IDA7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaSA9PT0gc2l6ZSkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JEb25lKCk7XG4gICAgICB9XG4gICAgICB2YXIgdiA9IHZhbHVlO1xuICAgICAgdmFsdWUgKz0gcmV2ZXJzZSA/IC1zdGVwIDogc3RlcDtcbiAgICAgIHJldHVybiBpdGVyYXRvclZhbHVlKHR5cGUsIHJldmVyc2UgPyBzaXplIC0gKytpIDogaSsrLCB2KTtcbiAgICB9KTtcbiAgfTtcblxuICBSYW5nZS5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChvdGhlcikge1xuICAgIHJldHVybiBvdGhlciBpbnN0YW5jZW9mIFJhbmdlXG4gICAgICA/IHRoaXMuX3N0YXJ0ID09PSBvdGhlci5fc3RhcnQgJiZcbiAgICAgICAgICB0aGlzLl9lbmQgPT09IG90aGVyLl9lbmQgJiZcbiAgICAgICAgICB0aGlzLl9zdGVwID09PSBvdGhlci5fc3RlcFxuICAgICAgOiBkZWVwRXF1YWwodGhpcywgb3RoZXIpO1xuICB9O1xuXG4gIHJldHVybiBSYW5nZTtcbn0oSW5kZXhlZFNlcSkpO1xuXG52YXIgRU1QVFlfUkFOR0U7XG5cbmZ1bmN0aW9uIGdldEluKGNvbGxlY3Rpb24sIHNlYXJjaEtleVBhdGgsIG5vdFNldFZhbHVlKSB7XG4gIHZhciBrZXlQYXRoID0gY29lcmNlS2V5UGF0aChzZWFyY2hLZXlQYXRoKTtcbiAgdmFyIGkgPSAwO1xuICB3aGlsZSAoaSAhPT0ga2V5UGF0aC5sZW5ndGgpIHtcbiAgICBjb2xsZWN0aW9uID0gZ2V0KGNvbGxlY3Rpb24sIGtleVBhdGhbaSsrXSwgTk9UX1NFVCk7XG4gICAgaWYgKGNvbGxlY3Rpb24gPT09IE5PVF9TRVQpIHtcbiAgICAgIHJldHVybiBub3RTZXRWYWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbGxlY3Rpb247XG59XG5cbmZ1bmN0aW9uIGdldEluJDEoc2VhcmNoS2V5UGF0aCwgbm90U2V0VmFsdWUpIHtcbiAgcmV0dXJuIGdldEluKHRoaXMsIHNlYXJjaEtleVBhdGgsIG5vdFNldFZhbHVlKTtcbn1cblxuZnVuY3Rpb24gaGFzSW4oY29sbGVjdGlvbiwga2V5UGF0aCkge1xuICByZXR1cm4gZ2V0SW4oY29sbGVjdGlvbiwga2V5UGF0aCwgTk9UX1NFVCkgIT09IE5PVF9TRVQ7XG59XG5cbmZ1bmN0aW9uIGhhc0luJDEoc2VhcmNoS2V5UGF0aCkge1xuICByZXR1cm4gaGFzSW4odGhpcywgc2VhcmNoS2V5UGF0aCk7XG59XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KCkge1xuICBhc3NlcnROb3RJbmZpbml0ZSh0aGlzLnNpemUpO1xuICB2YXIgb2JqZWN0ID0ge307XG4gIHRoaXMuX19pdGVyYXRlKGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgb2JqZWN0W2tdID0gdjtcbiAgfSk7XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8vIE5vdGU6IGFsbCBvZiB0aGVzZSBtZXRob2RzIGFyZSBkZXByZWNhdGVkLlxuQ29sbGVjdGlvbi5pc0l0ZXJhYmxlID0gaXNDb2xsZWN0aW9uO1xuQ29sbGVjdGlvbi5pc0tleWVkID0gaXNLZXllZDtcbkNvbGxlY3Rpb24uaXNJbmRleGVkID0gaXNJbmRleGVkO1xuQ29sbGVjdGlvbi5pc0Fzc29jaWF0aXZlID0gaXNBc3NvY2lhdGl2ZTtcbkNvbGxlY3Rpb24uaXNPcmRlcmVkID0gaXNPcmRlcmVkO1xuXG5Db2xsZWN0aW9uLkl0ZXJhdG9yID0gSXRlcmF0b3I7XG5cbm1peGluKENvbGxlY3Rpb24sIHtcbiAgLy8gIyMjIENvbnZlcnNpb24gdG8gb3RoZXIgdHlwZXNcblxuICB0b0FycmF5OiBmdW5jdGlvbiB0b0FycmF5KCkge1xuICAgIGFzc2VydE5vdEluZmluaXRlKHRoaXMuc2l6ZSk7XG4gICAgdmFyIGFycmF5ID0gbmV3IEFycmF5KHRoaXMuc2l6ZSB8fCAwKTtcbiAgICB2YXIgdXNlVHVwbGVzID0gaXNLZXllZCh0aGlzKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdGhpcy5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGspIHtcbiAgICAgIC8vIEtleWVkIGNvbGxlY3Rpb25zIHByb2R1Y2UgYW4gYXJyYXkgb2YgdHVwbGVzLlxuICAgICAgYXJyYXlbaSsrXSA9IHVzZVR1cGxlcyA/IFtrLCB2XSA6IHY7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFycmF5O1xuICB9LFxuXG4gIHRvSW5kZXhlZFNlcTogZnVuY3Rpb24gdG9JbmRleGVkU2VxKCkge1xuICAgIHJldHVybiBuZXcgVG9JbmRleGVkU2VxdWVuY2UodGhpcyk7XG4gIH0sXG5cbiAgdG9KUzogZnVuY3Rpb24gdG9KUyQxKCkge1xuICAgIHJldHVybiB0b0pTKHRoaXMpO1xuICB9LFxuXG4gIHRvS2V5ZWRTZXE6IGZ1bmN0aW9uIHRvS2V5ZWRTZXEoKSB7XG4gICAgcmV0dXJuIG5ldyBUb0tleWVkU2VxdWVuY2UodGhpcywgdHJ1ZSk7XG4gIH0sXG5cbiAgdG9NYXA6IGZ1bmN0aW9uIHRvTWFwKCkge1xuICAgIC8vIFVzZSBMYXRlIEJpbmRpbmcgaGVyZSB0byBzb2x2ZSB0aGUgY2lyY3VsYXIgZGVwZW5kZW5jeS5cbiAgICByZXR1cm4gTWFwKHRoaXMudG9LZXllZFNlcSgpKTtcbiAgfSxcblxuICB0b09iamVjdDogdG9PYmplY3QsXG5cbiAgdG9PcmRlcmVkTWFwOiBmdW5jdGlvbiB0b09yZGVyZWRNYXAoKSB7XG4gICAgLy8gVXNlIExhdGUgQmluZGluZyBoZXJlIHRvIHNvbHZlIHRoZSBjaXJjdWxhciBkZXBlbmRlbmN5LlxuICAgIHJldHVybiBPcmRlcmVkTWFwKHRoaXMudG9LZXllZFNlcSgpKTtcbiAgfSxcblxuICB0b09yZGVyZWRTZXQ6IGZ1bmN0aW9uIHRvT3JkZXJlZFNldCgpIHtcbiAgICAvLyBVc2UgTGF0ZSBCaW5kaW5nIGhlcmUgdG8gc29sdmUgdGhlIGNpcmN1bGFyIGRlcGVuZGVuY3kuXG4gICAgcmV0dXJuIE9yZGVyZWRTZXQoaXNLZXllZCh0aGlzKSA/IHRoaXMudmFsdWVTZXEoKSA6IHRoaXMpO1xuICB9LFxuXG4gIHRvU2V0OiBmdW5jdGlvbiB0b1NldCgpIHtcbiAgICAvLyBVc2UgTGF0ZSBCaW5kaW5nIGhlcmUgdG8gc29sdmUgdGhlIGNpcmN1bGFyIGRlcGVuZGVuY3kuXG4gICAgcmV0dXJuIFNldChpc0tleWVkKHRoaXMpID8gdGhpcy52YWx1ZVNlcSgpIDogdGhpcyk7XG4gIH0sXG5cbiAgdG9TZXRTZXE6IGZ1bmN0aW9uIHRvU2V0U2VxKCkge1xuICAgIHJldHVybiBuZXcgVG9TZXRTZXF1ZW5jZSh0aGlzKTtcbiAgfSxcblxuICB0b1NlcTogZnVuY3Rpb24gdG9TZXEoKSB7XG4gICAgcmV0dXJuIGlzSW5kZXhlZCh0aGlzKVxuICAgICAgPyB0aGlzLnRvSW5kZXhlZFNlcSgpXG4gICAgICA6IGlzS2V5ZWQodGhpcylcbiAgICAgICAgPyB0aGlzLnRvS2V5ZWRTZXEoKVxuICAgICAgICA6IHRoaXMudG9TZXRTZXEoKTtcbiAgfSxcblxuICB0b1N0YWNrOiBmdW5jdGlvbiB0b1N0YWNrKCkge1xuICAgIC8vIFVzZSBMYXRlIEJpbmRpbmcgaGVyZSB0byBzb2x2ZSB0aGUgY2lyY3VsYXIgZGVwZW5kZW5jeS5cbiAgICByZXR1cm4gU3RhY2soaXNLZXllZCh0aGlzKSA/IHRoaXMudmFsdWVTZXEoKSA6IHRoaXMpO1xuICB9LFxuXG4gIHRvTGlzdDogZnVuY3Rpb24gdG9MaXN0KCkge1xuICAgIC8vIFVzZSBMYXRlIEJpbmRpbmcgaGVyZSB0byBzb2x2ZSB0aGUgY2lyY3VsYXIgZGVwZW5kZW5jeS5cbiAgICByZXR1cm4gTGlzdChpc0tleWVkKHRoaXMpID8gdGhpcy52YWx1ZVNlcSgpIDogdGhpcyk7XG4gIH0sXG5cbiAgLy8gIyMjIENvbW1vbiBKYXZhU2NyaXB0IG1ldGhvZHMgYW5kIHByb3BlcnRpZXNcblxuICB0b1N0cmluZzogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICdbQ29sbGVjdGlvbl0nO1xuICB9LFxuXG4gIF9fdG9TdHJpbmc6IGZ1bmN0aW9uIF9fdG9TdHJpbmcoaGVhZCwgdGFpbCkge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiBoZWFkICsgdGFpbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIGhlYWQgK1xuICAgICAgJyAnICtcbiAgICAgIHRoaXMudG9TZXEoKVxuICAgICAgICAubWFwKHRoaXMuX190b1N0cmluZ01hcHBlcilcbiAgICAgICAgLmpvaW4oJywgJykgK1xuICAgICAgJyAnICtcbiAgICAgIHRhaWxcbiAgICApO1xuICB9LFxuXG4gIC8vICMjIyBFUzYgQ29sbGVjdGlvbiBtZXRob2RzIChFUzYgQXJyYXkgYW5kIE1hcClcblxuICBjb25jYXQ6IGZ1bmN0aW9uIGNvbmNhdCgpIHtcbiAgICB2YXIgdmFsdWVzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKCBsZW4tLSApIHZhbHVlc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIGNvbmNhdEZhY3RvcnkodGhpcywgdmFsdWVzKSk7XG4gIH0sXG5cbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKHNlYXJjaFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuc29tZShmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGlzKHZhbHVlLCBzZWFyY2hWYWx1ZSk7IH0pO1xuICB9LFxuXG4gIGVudHJpZXM6IGZ1bmN0aW9uIGVudHJpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19pdGVyYXRvcihJVEVSQVRFX0VOVFJJRVMpO1xuICB9LFxuXG4gIGV2ZXJ5OiBmdW5jdGlvbiBldmVyeShwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBhc3NlcnROb3RJbmZpbml0ZSh0aGlzLnNpemUpO1xuICAgIHZhciByZXR1cm5WYWx1ZSA9IHRydWU7XG4gICAgdGhpcy5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGssIGMpIHtcbiAgICAgIGlmICghcHJlZGljYXRlLmNhbGwoY29udGV4dCwgdiwgaywgYykpIHtcbiAgICAgICAgcmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfSxcblxuICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcihwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgZmlsdGVyRmFjdG9yeSh0aGlzLCBwcmVkaWNhdGUsIGNvbnRleHQsIHRydWUpKTtcbiAgfSxcblxuICBmaW5kOiBmdW5jdGlvbiBmaW5kKHByZWRpY2F0ZSwgY29udGV4dCwgbm90U2V0VmFsdWUpIHtcbiAgICB2YXIgZW50cnkgPSB0aGlzLmZpbmRFbnRyeShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHJldHVybiBlbnRyeSA/IGVudHJ5WzFdIDogbm90U2V0VmFsdWU7XG4gIH0sXG5cbiAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChzaWRlRWZmZWN0LCBjb250ZXh0KSB7XG4gICAgYXNzZXJ0Tm90SW5maW5pdGUodGhpcy5zaXplKTtcbiAgICByZXR1cm4gdGhpcy5fX2l0ZXJhdGUoY29udGV4dCA/IHNpZGVFZmZlY3QuYmluZChjb250ZXh0KSA6IHNpZGVFZmZlY3QpO1xuICB9LFxuXG4gIGpvaW46IGZ1bmN0aW9uIGpvaW4oc2VwYXJhdG9yKSB7XG4gICAgYXNzZXJ0Tm90SW5maW5pdGUodGhpcy5zaXplKTtcbiAgICBzZXBhcmF0b3IgPSBzZXBhcmF0b3IgIT09IHVuZGVmaW5lZCA/ICcnICsgc2VwYXJhdG9yIDogJywnO1xuICAgIHZhciBqb2luZWQgPSAnJztcbiAgICB2YXIgaXNGaXJzdCA9IHRydWU7XG4gICAgdGhpcy5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYpIHtcbiAgICAgIGlzRmlyc3QgPyAoaXNGaXJzdCA9IGZhbHNlKSA6IChqb2luZWQgKz0gc2VwYXJhdG9yKTtcbiAgICAgIGpvaW5lZCArPSB2ICE9PSBudWxsICYmIHYgIT09IHVuZGVmaW5lZCA/IHYudG9TdHJpbmcoKSA6ICcnO1xuICAgIH0pO1xuICAgIHJldHVybiBqb2luZWQ7XG4gIH0sXG5cbiAga2V5czogZnVuY3Rpb24ga2V5cygpIHtcbiAgICByZXR1cm4gdGhpcy5fX2l0ZXJhdG9yKElURVJBVEVfS0VZUyk7XG4gIH0sXG5cbiAgbWFwOiBmdW5jdGlvbiBtYXAobWFwcGVyLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIG1hcEZhY3RvcnkodGhpcywgbWFwcGVyLCBjb250ZXh0KSk7XG4gIH0sXG5cbiAgcmVkdWNlOiBmdW5jdGlvbiByZWR1Y2UkMShyZWR1Y2VyLCBpbml0aWFsUmVkdWN0aW9uLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHJlZHVjZShcbiAgICAgIHRoaXMsXG4gICAgICByZWR1Y2VyLFxuICAgICAgaW5pdGlhbFJlZHVjdGlvbixcbiAgICAgIGNvbnRleHQsXG4gICAgICBhcmd1bWVudHMubGVuZ3RoIDwgMixcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgfSxcblxuICByZWR1Y2VSaWdodDogZnVuY3Rpb24gcmVkdWNlUmlnaHQocmVkdWNlciwgaW5pdGlhbFJlZHVjdGlvbiwgY29udGV4dCkge1xuICAgIHJldHVybiByZWR1Y2UoXG4gICAgICB0aGlzLFxuICAgICAgcmVkdWNlcixcbiAgICAgIGluaXRpYWxSZWR1Y3Rpb24sXG4gICAgICBjb250ZXh0LFxuICAgICAgYXJndW1lbnRzLmxlbmd0aCA8IDIsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgfSxcblxuICByZXZlcnNlOiBmdW5jdGlvbiByZXZlcnNlKCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCByZXZlcnNlRmFjdG9yeSh0aGlzLCB0cnVlKSk7XG4gIH0sXG5cbiAgc2xpY2U6IGZ1bmN0aW9uIHNsaWNlKGJlZ2luLCBlbmQpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgc2xpY2VGYWN0b3J5KHRoaXMsIGJlZ2luLCBlbmQsIHRydWUpKTtcbiAgfSxcblxuICBzb21lOiBmdW5jdGlvbiBzb21lKHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiAhdGhpcy5ldmVyeShub3QocHJlZGljYXRlKSwgY29udGV4dCk7XG4gIH0sXG5cbiAgc29ydDogZnVuY3Rpb24gc29ydChjb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHNvcnRGYWN0b3J5KHRoaXMsIGNvbXBhcmF0b3IpKTtcbiAgfSxcblxuICB2YWx1ZXM6IGZ1bmN0aW9uIHZhbHVlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fX2l0ZXJhdG9yKElURVJBVEVfVkFMVUVTKTtcbiAgfSxcblxuICAvLyAjIyMgTW9yZSBzZXF1ZW50aWFsIG1ldGhvZHNcblxuICBidXRMYXN0OiBmdW5jdGlvbiBidXRMYXN0KCkge1xuICAgIHJldHVybiB0aGlzLnNsaWNlKDAsIC0xKTtcbiAgfSxcblxuICBpc0VtcHR5OiBmdW5jdGlvbiBpc0VtcHR5KCkge1xuICAgIHJldHVybiB0aGlzLnNpemUgIT09IHVuZGVmaW5lZCA/IHRoaXMuc2l6ZSA9PT0gMCA6ICF0aGlzLnNvbWUoZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfSk7XG4gIH0sXG5cbiAgY291bnQ6IGZ1bmN0aW9uIGNvdW50KHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBlbnN1cmVTaXplKFxuICAgICAgcHJlZGljYXRlID8gdGhpcy50b1NlcSgpLmZpbHRlcihwcmVkaWNhdGUsIGNvbnRleHQpIDogdGhpc1xuICAgICk7XG4gIH0sXG5cbiAgY291bnRCeTogZnVuY3Rpb24gY291bnRCeShncm91cGVyLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGNvdW50QnlGYWN0b3J5KHRoaXMsIGdyb3VwZXIsIGNvbnRleHQpO1xuICB9LFxuXG4gIGVxdWFsczogZnVuY3Rpb24gZXF1YWxzKG90aGVyKSB7XG4gICAgcmV0dXJuIGRlZXBFcXVhbCh0aGlzLCBvdGhlcik7XG4gIH0sXG5cbiAgZW50cnlTZXE6IGZ1bmN0aW9uIGVudHJ5U2VxKCkge1xuICAgIHZhciBjb2xsZWN0aW9uID0gdGhpcztcbiAgICBpZiAoY29sbGVjdGlvbi5fY2FjaGUpIHtcbiAgICAgIC8vIFdlIGNhY2hlIGFzIGFuIGVudHJpZXMgYXJyYXksIHNvIHdlIGNhbiBqdXN0IHJldHVybiB0aGUgY2FjaGUhXG4gICAgICByZXR1cm4gbmV3IEFycmF5U2VxKGNvbGxlY3Rpb24uX2NhY2hlKTtcbiAgICB9XG4gICAgdmFyIGVudHJpZXNTZXF1ZW5jZSA9IGNvbGxlY3Rpb25cbiAgICAgIC50b1NlcSgpXG4gICAgICAubWFwKGVudHJ5TWFwcGVyKVxuICAgICAgLnRvSW5kZXhlZFNlcSgpO1xuICAgIGVudHJpZXNTZXF1ZW5jZS5mcm9tRW50cnlTZXEgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2xsZWN0aW9uLnRvU2VxKCk7IH07XG4gICAgcmV0dXJuIGVudHJpZXNTZXF1ZW5jZTtcbiAgfSxcblxuICBmaWx0ZXJOb3Q6IGZ1bmN0aW9uIGZpbHRlck5vdChwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIobm90KHByZWRpY2F0ZSksIGNvbnRleHQpO1xuICB9LFxuXG4gIGZpbmRFbnRyeTogZnVuY3Rpb24gZmluZEVudHJ5KHByZWRpY2F0ZSwgY29udGV4dCwgbm90U2V0VmFsdWUpIHtcbiAgICB2YXIgZm91bmQgPSBub3RTZXRWYWx1ZTtcbiAgICB0aGlzLl9faXRlcmF0ZShmdW5jdGlvbiAodiwgaywgYykge1xuICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKGNvbnRleHQsIHYsIGssIGMpKSB7XG4gICAgICAgIGZvdW5kID0gW2ssIHZdO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9LFxuXG4gIGZpbmRLZXk6IGZ1bmN0aW9uIGZpbmRLZXkocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIGVudHJ5ID0gdGhpcy5maW5kRW50cnkocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gZW50cnkgJiYgZW50cnlbMF07XG4gIH0sXG5cbiAgZmluZExhc3Q6IGZ1bmN0aW9uIGZpbmRMYXN0KHByZWRpY2F0ZSwgY29udGV4dCwgbm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy50b0tleWVkU2VxKClcbiAgICAgIC5yZXZlcnNlKClcbiAgICAgIC5maW5kKHByZWRpY2F0ZSwgY29udGV4dCwgbm90U2V0VmFsdWUpO1xuICB9LFxuXG4gIGZpbmRMYXN0RW50cnk6IGZ1bmN0aW9uIGZpbmRMYXN0RW50cnkocHJlZGljYXRlLCBjb250ZXh0LCBub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnRvS2V5ZWRTZXEoKVxuICAgICAgLnJldmVyc2UoKVxuICAgICAgLmZpbmRFbnRyeShwcmVkaWNhdGUsIGNvbnRleHQsIG5vdFNldFZhbHVlKTtcbiAgfSxcblxuICBmaW5kTGFzdEtleTogZnVuY3Rpb24gZmluZExhc3RLZXkocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMudG9LZXllZFNlcSgpXG4gICAgICAucmV2ZXJzZSgpXG4gICAgICAuZmluZEtleShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICB9LFxuXG4gIGZpcnN0OiBmdW5jdGlvbiBmaXJzdChub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmZpbmQocmV0dXJuVHJ1ZSwgbnVsbCwgbm90U2V0VmFsdWUpO1xuICB9LFxuXG4gIGZsYXRNYXA6IGZ1bmN0aW9uIGZsYXRNYXAobWFwcGVyLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIGZsYXRNYXBGYWN0b3J5KHRoaXMsIG1hcHBlciwgY29udGV4dCkpO1xuICB9LFxuXG4gIGZsYXR0ZW46IGZ1bmN0aW9uIGZsYXR0ZW4oZGVwdGgpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgZmxhdHRlbkZhY3RvcnkodGhpcywgZGVwdGgsIHRydWUpKTtcbiAgfSxcblxuICBmcm9tRW50cnlTZXE6IGZ1bmN0aW9uIGZyb21FbnRyeVNlcSgpIHtcbiAgICByZXR1cm4gbmV3IEZyb21FbnRyaWVzU2VxdWVuY2UodGhpcyk7XG4gIH0sXG5cbiAgZ2V0OiBmdW5jdGlvbiBnZXQoc2VhcmNoS2V5LCBub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmZpbmQoZnVuY3Rpb24gKF8sIGtleSkgeyByZXR1cm4gaXMoa2V5LCBzZWFyY2hLZXkpOyB9LCB1bmRlZmluZWQsIG5vdFNldFZhbHVlKTtcbiAgfSxcblxuICBnZXRJbjogZ2V0SW4kMSxcblxuICBncm91cEJ5OiBmdW5jdGlvbiBncm91cEJ5KGdyb3VwZXIsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gZ3JvdXBCeUZhY3RvcnkodGhpcywgZ3JvdXBlciwgY29udGV4dCk7XG4gIH0sXG5cbiAgaGFzOiBmdW5jdGlvbiBoYXMoc2VhcmNoS2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KHNlYXJjaEtleSwgTk9UX1NFVCkgIT09IE5PVF9TRVQ7XG4gIH0sXG5cbiAgaGFzSW46IGhhc0luJDEsXG5cbiAgaXNTdWJzZXQ6IGZ1bmN0aW9uIGlzU3Vic2V0KGl0ZXIpIHtcbiAgICBpdGVyID0gdHlwZW9mIGl0ZXIuaW5jbHVkZXMgPT09ICdmdW5jdGlvbicgPyBpdGVyIDogQ29sbGVjdGlvbihpdGVyKTtcbiAgICByZXR1cm4gdGhpcy5ldmVyeShmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGl0ZXIuaW5jbHVkZXModmFsdWUpOyB9KTtcbiAgfSxcblxuICBpc1N1cGVyc2V0OiBmdW5jdGlvbiBpc1N1cGVyc2V0KGl0ZXIpIHtcbiAgICBpdGVyID0gdHlwZW9mIGl0ZXIuaXNTdWJzZXQgPT09ICdmdW5jdGlvbicgPyBpdGVyIDogQ29sbGVjdGlvbihpdGVyKTtcbiAgICByZXR1cm4gaXRlci5pc1N1YnNldCh0aGlzKTtcbiAgfSxcblxuICBrZXlPZjogZnVuY3Rpb24ga2V5T2Yoc2VhcmNoVmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kS2V5KGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gaXModmFsdWUsIHNlYXJjaFZhbHVlKTsgfSk7XG4gIH0sXG5cbiAga2V5U2VxOiBmdW5jdGlvbiBrZXlTZXEoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9TZXEoKVxuICAgICAgLm1hcChrZXlNYXBwZXIpXG4gICAgICAudG9JbmRleGVkU2VxKCk7XG4gIH0sXG5cbiAgbGFzdDogZnVuY3Rpb24gbGFzdChub3RTZXRWYWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnRvU2VxKClcbiAgICAgIC5yZXZlcnNlKClcbiAgICAgIC5maXJzdChub3RTZXRWYWx1ZSk7XG4gIH0sXG5cbiAgbGFzdEtleU9mOiBmdW5jdGlvbiBsYXN0S2V5T2Yoc2VhcmNoVmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy50b0tleWVkU2VxKClcbiAgICAgIC5yZXZlcnNlKClcbiAgICAgIC5rZXlPZihzZWFyY2hWYWx1ZSk7XG4gIH0sXG5cbiAgbWF4OiBmdW5jdGlvbiBtYXgoY29tcGFyYXRvcikge1xuICAgIHJldHVybiBtYXhGYWN0b3J5KHRoaXMsIGNvbXBhcmF0b3IpO1xuICB9LFxuXG4gIG1heEJ5OiBmdW5jdGlvbiBtYXhCeShtYXBwZXIsIGNvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gbWF4RmFjdG9yeSh0aGlzLCBjb21wYXJhdG9yLCBtYXBwZXIpO1xuICB9LFxuXG4gIG1pbjogZnVuY3Rpb24gbWluKGNvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gbWF4RmFjdG9yeShcbiAgICAgIHRoaXMsXG4gICAgICBjb21wYXJhdG9yID8gbmVnKGNvbXBhcmF0b3IpIDogZGVmYXVsdE5lZ0NvbXBhcmF0b3JcbiAgICApO1xuICB9LFxuXG4gIG1pbkJ5OiBmdW5jdGlvbiBtaW5CeShtYXBwZXIsIGNvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gbWF4RmFjdG9yeShcbiAgICAgIHRoaXMsXG4gICAgICBjb21wYXJhdG9yID8gbmVnKGNvbXBhcmF0b3IpIDogZGVmYXVsdE5lZ0NvbXBhcmF0b3IsXG4gICAgICBtYXBwZXJcbiAgICApO1xuICB9LFxuXG4gIHJlc3Q6IGZ1bmN0aW9uIHJlc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2xpY2UoMSk7XG4gIH0sXG5cbiAgc2tpcDogZnVuY3Rpb24gc2tpcChhbW91bnQpIHtcbiAgICByZXR1cm4gYW1vdW50ID09PSAwID8gdGhpcyA6IHRoaXMuc2xpY2UoTWF0aC5tYXgoMCwgYW1vdW50KSk7XG4gIH0sXG5cbiAgc2tpcExhc3Q6IGZ1bmN0aW9uIHNraXBMYXN0KGFtb3VudCkge1xuICAgIHJldHVybiBhbW91bnQgPT09IDAgPyB0aGlzIDogdGhpcy5zbGljZSgwLCAtTWF0aC5tYXgoMCwgYW1vdW50KSk7XG4gIH0sXG5cbiAgc2tpcFdoaWxlOiBmdW5jdGlvbiBza2lwV2hpbGUocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHNraXBXaGlsZUZhY3RvcnkodGhpcywgcHJlZGljYXRlLCBjb250ZXh0LCB0cnVlKSk7XG4gIH0sXG5cbiAgc2tpcFVudGlsOiBmdW5jdGlvbiBza2lwVW50aWwocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuc2tpcFdoaWxlKG5vdChwcmVkaWNhdGUpLCBjb250ZXh0KTtcbiAgfSxcblxuICBzb3J0Qnk6IGZ1bmN0aW9uIHNvcnRCeShtYXBwZXIsIGNvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgc29ydEZhY3RvcnkodGhpcywgY29tcGFyYXRvciwgbWFwcGVyKSk7XG4gIH0sXG5cbiAgdGFrZTogZnVuY3Rpb24gdGFrZShhbW91bnQpIHtcbiAgICByZXR1cm4gdGhpcy5zbGljZSgwLCBNYXRoLm1heCgwLCBhbW91bnQpKTtcbiAgfSxcblxuICB0YWtlTGFzdDogZnVuY3Rpb24gdGFrZUxhc3QoYW1vdW50KSB7XG4gICAgcmV0dXJuIHRoaXMuc2xpY2UoLU1hdGgubWF4KDAsIGFtb3VudCkpO1xuICB9LFxuXG4gIHRha2VXaGlsZTogZnVuY3Rpb24gdGFrZVdoaWxlKHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCB0YWtlV2hpbGVGYWN0b3J5KHRoaXMsIHByZWRpY2F0ZSwgY29udGV4dCkpO1xuICB9LFxuXG4gIHRha2VVbnRpbDogZnVuY3Rpb24gdGFrZVVudGlsKHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLnRha2VXaGlsZShub3QocHJlZGljYXRlKSwgY29udGV4dCk7XG4gIH0sXG5cbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZm4pIHtcbiAgICByZXR1cm4gZm4odGhpcyk7XG4gIH0sXG5cbiAgdmFsdWVTZXE6IGZ1bmN0aW9uIHZhbHVlU2VxKCkge1xuICAgIHJldHVybiB0aGlzLnRvSW5kZXhlZFNlcSgpO1xuICB9LFxuXG4gIC8vICMjIyBIYXNoYWJsZSBPYmplY3RcblxuICBoYXNoQ29kZTogZnVuY3Rpb24gaGFzaENvZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19oYXNoIHx8ICh0aGlzLl9faGFzaCA9IGhhc2hDb2xsZWN0aW9uKHRoaXMpKTtcbiAgfSxcblxuICAvLyAjIyMgSW50ZXJuYWxcblxuICAvLyBhYnN0cmFjdCBfX2l0ZXJhdGUoZm4sIHJldmVyc2UpXG5cbiAgLy8gYWJzdHJhY3QgX19pdGVyYXRvcih0eXBlLCByZXZlcnNlKVxufSk7XG5cbnZhciBDb2xsZWN0aW9uUHJvdG90eXBlID0gQ29sbGVjdGlvbi5wcm90b3R5cGU7XG5Db2xsZWN0aW9uUHJvdG90eXBlW0lTX0NPTExFQ1RJT05fU1lNQk9MXSA9IHRydWU7XG5Db2xsZWN0aW9uUHJvdG90eXBlW0lURVJBVE9SX1NZTUJPTF0gPSBDb2xsZWN0aW9uUHJvdG90eXBlLnZhbHVlcztcbkNvbGxlY3Rpb25Qcm90b3R5cGUudG9KU09OID0gQ29sbGVjdGlvblByb3RvdHlwZS50b0FycmF5O1xuQ29sbGVjdGlvblByb3RvdHlwZS5fX3RvU3RyaW5nTWFwcGVyID0gcXVvdGVTdHJpbmc7XG5Db2xsZWN0aW9uUHJvdG90eXBlLmluc3BlY3QgPSBDb2xsZWN0aW9uUHJvdG90eXBlLnRvU291cmNlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG59O1xuQ29sbGVjdGlvblByb3RvdHlwZS5jaGFpbiA9IENvbGxlY3Rpb25Qcm90b3R5cGUuZmxhdE1hcDtcbkNvbGxlY3Rpb25Qcm90b3R5cGUuY29udGFpbnMgPSBDb2xsZWN0aW9uUHJvdG90eXBlLmluY2x1ZGVzO1xuXG5taXhpbihLZXllZENvbGxlY3Rpb24sIHtcbiAgLy8gIyMjIE1vcmUgc2VxdWVudGlhbCBtZXRob2RzXG5cbiAgZmxpcDogZnVuY3Rpb24gZmxpcCgpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgZmxpcEZhY3RvcnkodGhpcykpO1xuICB9LFxuXG4gIG1hcEVudHJpZXM6IGZ1bmN0aW9uIG1hcEVudHJpZXMobWFwcGVyLCBjb250ZXh0KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgcmV0dXJuIHJlaWZ5KFxuICAgICAgdGhpcyxcbiAgICAgIHRoaXMudG9TZXEoKVxuICAgICAgICAubWFwKGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBtYXBwZXIuY2FsbChjb250ZXh0LCBbaywgdl0sIGl0ZXJhdGlvbnMrKywgdGhpcyQxKTsgfSlcbiAgICAgICAgLmZyb21FbnRyeVNlcSgpXG4gICAgKTtcbiAgfSxcblxuICBtYXBLZXlzOiBmdW5jdGlvbiBtYXBLZXlzKG1hcHBlciwgY29udGV4dCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHJlaWZ5KFxuICAgICAgdGhpcyxcbiAgICAgIHRoaXMudG9TZXEoKVxuICAgICAgICAuZmxpcCgpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKGssIHYpIHsgcmV0dXJuIG1hcHBlci5jYWxsKGNvbnRleHQsIGssIHYsIHRoaXMkMSk7IH0pXG4gICAgICAgIC5mbGlwKClcbiAgICApO1xuICB9LFxufSk7XG5cbnZhciBLZXllZENvbGxlY3Rpb25Qcm90b3R5cGUgPSBLZXllZENvbGxlY3Rpb24ucHJvdG90eXBlO1xuS2V5ZWRDb2xsZWN0aW9uUHJvdG90eXBlW0lTX0tFWUVEX1NZTUJPTF0gPSB0cnVlO1xuS2V5ZWRDb2xsZWN0aW9uUHJvdG90eXBlW0lURVJBVE9SX1NZTUJPTF0gPSBDb2xsZWN0aW9uUHJvdG90eXBlLmVudHJpZXM7XG5LZXllZENvbGxlY3Rpb25Qcm90b3R5cGUudG9KU09OID0gdG9PYmplY3Q7XG5LZXllZENvbGxlY3Rpb25Qcm90b3R5cGUuX190b1N0cmluZ01hcHBlciA9IGZ1bmN0aW9uICh2LCBrKSB7IHJldHVybiBxdW90ZVN0cmluZyhrKSArICc6ICcgKyBxdW90ZVN0cmluZyh2KTsgfTtcblxubWl4aW4oSW5kZXhlZENvbGxlY3Rpb24sIHtcbiAgLy8gIyMjIENvbnZlcnNpb24gdG8gb3RoZXIgdHlwZXNcblxuICB0b0tleWVkU2VxOiBmdW5jdGlvbiB0b0tleWVkU2VxKCkge1xuICAgIHJldHVybiBuZXcgVG9LZXllZFNlcXVlbmNlKHRoaXMsIGZhbHNlKTtcbiAgfSxcblxuICAvLyAjIyMgRVM2IENvbGxlY3Rpb24gbWV0aG9kcyAoRVM2IEFycmF5IGFuZCBNYXApXG5cbiAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIGZpbHRlckZhY3RvcnkodGhpcywgcHJlZGljYXRlLCBjb250ZXh0LCBmYWxzZSkpO1xuICB9LFxuXG4gIGZpbmRJbmRleDogZnVuY3Rpb24gZmluZEluZGV4KHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBlbnRyeSA9IHRoaXMuZmluZEVudHJ5KHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIGVudHJ5ID8gZW50cnlbMF0gOiAtMTtcbiAgfSxcblxuICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNlYXJjaFZhbHVlKSB7XG4gICAgdmFyIGtleSA9IHRoaXMua2V5T2Yoc2VhcmNoVmFsdWUpO1xuICAgIHJldHVybiBrZXkgPT09IHVuZGVmaW5lZCA/IC0xIDoga2V5O1xuICB9LFxuXG4gIGxhc3RJbmRleE9mOiBmdW5jdGlvbiBsYXN0SW5kZXhPZihzZWFyY2hWYWx1ZSkge1xuICAgIHZhciBrZXkgPSB0aGlzLmxhc3RLZXlPZihzZWFyY2hWYWx1ZSk7XG4gICAgcmV0dXJuIGtleSA9PT0gdW5kZWZpbmVkID8gLTEgOiBrZXk7XG4gIH0sXG5cbiAgcmV2ZXJzZTogZnVuY3Rpb24gcmV2ZXJzZSgpIHtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgcmV2ZXJzZUZhY3RvcnkodGhpcywgZmFsc2UpKTtcbiAgfSxcblxuICBzbGljZTogZnVuY3Rpb24gc2xpY2UoYmVnaW4sIGVuZCkge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBzbGljZUZhY3RvcnkodGhpcywgYmVnaW4sIGVuZCwgZmFsc2UpKTtcbiAgfSxcblxuICBzcGxpY2U6IGZ1bmN0aW9uIHNwbGljZShpbmRleCwgcmVtb3ZlTnVtIC8qLCAuLi52YWx1ZXMqLykge1xuICAgIHZhciBudW1BcmdzID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICByZW1vdmVOdW0gPSBNYXRoLm1heChyZW1vdmVOdW0gfHwgMCwgMCk7XG4gICAgaWYgKG51bUFyZ3MgPT09IDAgfHwgKG51bUFyZ3MgPT09IDIgJiYgIXJlbW92ZU51bSkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBJZiBpbmRleCBpcyBuZWdhdGl2ZSwgaXQgc2hvdWxkIHJlc29sdmUgcmVsYXRpdmUgdG8gdGhlIHNpemUgb2YgdGhlXG4gICAgLy8gY29sbGVjdGlvbi4gSG93ZXZlciBzaXplIG1heSBiZSBleHBlbnNpdmUgdG8gY29tcHV0ZSBpZiBub3QgY2FjaGVkLCBzb1xuICAgIC8vIG9ubHkgY2FsbCBjb3VudCgpIGlmIHRoZSBudW1iZXIgaXMgaW4gZmFjdCBuZWdhdGl2ZS5cbiAgICBpbmRleCA9IHJlc29sdmVCZWdpbihpbmRleCwgaW5kZXggPCAwID8gdGhpcy5jb3VudCgpIDogdGhpcy5zaXplKTtcbiAgICB2YXIgc3BsaWNlZCA9IHRoaXMuc2xpY2UoMCwgaW5kZXgpO1xuICAgIHJldHVybiByZWlmeShcbiAgICAgIHRoaXMsXG4gICAgICBudW1BcmdzID09PSAxXG4gICAgICAgID8gc3BsaWNlZFxuICAgICAgICA6IHNwbGljZWQuY29uY2F0KGFyckNvcHkoYXJndW1lbnRzLCAyKSwgdGhpcy5zbGljZShpbmRleCArIHJlbW92ZU51bSkpXG4gICAgKTtcbiAgfSxcblxuICAvLyAjIyMgTW9yZSBjb2xsZWN0aW9uIG1ldGhvZHNcblxuICBmaW5kTGFzdEluZGV4OiBmdW5jdGlvbiBmaW5kTGFzdEluZGV4KHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBlbnRyeSA9IHRoaXMuZmluZExhc3RFbnRyeShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHJldHVybiBlbnRyeSA/IGVudHJ5WzBdIDogLTE7XG4gIH0sXG5cbiAgZmlyc3Q6IGZ1bmN0aW9uIGZpcnN0KG5vdFNldFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KDAsIG5vdFNldFZhbHVlKTtcbiAgfSxcblxuICBmbGF0dGVuOiBmdW5jdGlvbiBmbGF0dGVuKGRlcHRoKSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIGZsYXR0ZW5GYWN0b3J5KHRoaXMsIGRlcHRoLCBmYWxzZSkpO1xuICB9LFxuXG4gIGdldDogZnVuY3Rpb24gZ2V0KGluZGV4LCBub3RTZXRWYWx1ZSkge1xuICAgIGluZGV4ID0gd3JhcEluZGV4KHRoaXMsIGluZGV4KTtcbiAgICByZXR1cm4gaW5kZXggPCAwIHx8XG4gICAgICAodGhpcy5zaXplID09PSBJbmZpbml0eSB8fCAodGhpcy5zaXplICE9PSB1bmRlZmluZWQgJiYgaW5kZXggPiB0aGlzLnNpemUpKVxuICAgICAgPyBub3RTZXRWYWx1ZVxuICAgICAgOiB0aGlzLmZpbmQoZnVuY3Rpb24gKF8sIGtleSkgeyByZXR1cm4ga2V5ID09PSBpbmRleDsgfSwgdW5kZWZpbmVkLCBub3RTZXRWYWx1ZSk7XG4gIH0sXG5cbiAgaGFzOiBmdW5jdGlvbiBoYXMoaW5kZXgpIHtcbiAgICBpbmRleCA9IHdyYXBJbmRleCh0aGlzLCBpbmRleCk7XG4gICAgcmV0dXJuIChcbiAgICAgIGluZGV4ID49IDAgJiZcbiAgICAgICh0aGlzLnNpemUgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IHRoaXMuc2l6ZSA9PT0gSW5maW5pdHkgfHwgaW5kZXggPCB0aGlzLnNpemVcbiAgICAgICAgOiB0aGlzLmluZGV4T2YoaW5kZXgpICE9PSAtMSlcbiAgICApO1xuICB9LFxuXG4gIGludGVycG9zZTogZnVuY3Rpb24gaW50ZXJwb3NlKHNlcGFyYXRvcikge1xuICAgIHJldHVybiByZWlmeSh0aGlzLCBpbnRlcnBvc2VGYWN0b3J5KHRoaXMsIHNlcGFyYXRvcikpO1xuICB9LFxuXG4gIGludGVybGVhdmU6IGZ1bmN0aW9uIGludGVybGVhdmUoLyouLi5jb2xsZWN0aW9ucyovKSB7XG4gICAgdmFyIGNvbGxlY3Rpb25zID0gW3RoaXNdLmNvbmNhdChhcnJDb3B5KGFyZ3VtZW50cykpO1xuICAgIHZhciB6aXBwZWQgPSB6aXBXaXRoRmFjdG9yeSh0aGlzLnRvU2VxKCksIEluZGV4ZWRTZXEub2YsIGNvbGxlY3Rpb25zKTtcbiAgICB2YXIgaW50ZXJsZWF2ZWQgPSB6aXBwZWQuZmxhdHRlbih0cnVlKTtcbiAgICBpZiAoemlwcGVkLnNpemUpIHtcbiAgICAgIGludGVybGVhdmVkLnNpemUgPSB6aXBwZWQuc2l6ZSAqIGNvbGxlY3Rpb25zLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIGludGVybGVhdmVkKTtcbiAgfSxcblxuICBrZXlTZXE6IGZ1bmN0aW9uIGtleVNlcSgpIHtcbiAgICByZXR1cm4gUmFuZ2UoMCwgdGhpcy5zaXplKTtcbiAgfSxcblxuICBsYXN0OiBmdW5jdGlvbiBsYXN0KG5vdFNldFZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KC0xLCBub3RTZXRWYWx1ZSk7XG4gIH0sXG5cbiAgc2tpcFdoaWxlOiBmdW5jdGlvbiBza2lwV2hpbGUocHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHNraXBXaGlsZUZhY3RvcnkodGhpcywgcHJlZGljYXRlLCBjb250ZXh0LCBmYWxzZSkpO1xuICB9LFxuXG4gIHppcDogZnVuY3Rpb24gemlwKC8qLCAuLi5jb2xsZWN0aW9ucyAqLykge1xuICAgIHZhciBjb2xsZWN0aW9ucyA9IFt0aGlzXS5jb25jYXQoYXJyQ29weShhcmd1bWVudHMpKTtcbiAgICByZXR1cm4gcmVpZnkodGhpcywgemlwV2l0aEZhY3RvcnkodGhpcywgZGVmYXVsdFppcHBlciwgY29sbGVjdGlvbnMpKTtcbiAgfSxcblxuICB6aXBBbGw6IGZ1bmN0aW9uIHppcEFsbCgvKiwgLi4uY29sbGVjdGlvbnMgKi8pIHtcbiAgICB2YXIgY29sbGVjdGlvbnMgPSBbdGhpc10uY29uY2F0KGFyckNvcHkoYXJndW1lbnRzKSk7XG4gICAgcmV0dXJuIHJlaWZ5KHRoaXMsIHppcFdpdGhGYWN0b3J5KHRoaXMsIGRlZmF1bHRaaXBwZXIsIGNvbGxlY3Rpb25zLCB0cnVlKSk7XG4gIH0sXG5cbiAgemlwV2l0aDogZnVuY3Rpb24gemlwV2l0aCh6aXBwZXIgLyosIC4uLmNvbGxlY3Rpb25zICovKSB7XG4gICAgdmFyIGNvbGxlY3Rpb25zID0gYXJyQ29weShhcmd1bWVudHMpO1xuICAgIGNvbGxlY3Rpb25zWzBdID0gdGhpcztcbiAgICByZXR1cm4gcmVpZnkodGhpcywgemlwV2l0aEZhY3RvcnkodGhpcywgemlwcGVyLCBjb2xsZWN0aW9ucykpO1xuICB9LFxufSk7XG5cbnZhciBJbmRleGVkQ29sbGVjdGlvblByb3RvdHlwZSA9IEluZGV4ZWRDb2xsZWN0aW9uLnByb3RvdHlwZTtcbkluZGV4ZWRDb2xsZWN0aW9uUHJvdG90eXBlW0lTX0lOREVYRURfU1lNQk9MXSA9IHRydWU7XG5JbmRleGVkQ29sbGVjdGlvblByb3RvdHlwZVtJU19PUkRFUkVEX1NZTUJPTF0gPSB0cnVlO1xuXG5taXhpbihTZXRDb2xsZWN0aW9uLCB7XG4gIC8vICMjIyBFUzYgQ29sbGVjdGlvbiBtZXRob2RzIChFUzYgQXJyYXkgYW5kIE1hcClcblxuICBnZXQ6IGZ1bmN0aW9uIGdldCh2YWx1ZSwgbm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5oYXModmFsdWUpID8gdmFsdWUgOiBub3RTZXRWYWx1ZTtcbiAgfSxcblxuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXModmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5oYXModmFsdWUpO1xuICB9LFxuXG4gIC8vICMjIyBNb3JlIHNlcXVlbnRpYWwgbWV0aG9kc1xuXG4gIGtleVNlcTogZnVuY3Rpb24ga2V5U2VxKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlU2VxKCk7XG4gIH0sXG59KTtcblxuU2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuaGFzID0gQ29sbGVjdGlvblByb3RvdHlwZS5pbmNsdWRlcztcblNldENvbGxlY3Rpb24ucHJvdG90eXBlLmNvbnRhaW5zID0gU2V0Q29sbGVjdGlvbi5wcm90b3R5cGUuaW5jbHVkZXM7XG5cbi8vIE1peGluIHN1YmNsYXNzZXNcblxubWl4aW4oS2V5ZWRTZXEsIEtleWVkQ29sbGVjdGlvbi5wcm90b3R5cGUpO1xubWl4aW4oSW5kZXhlZFNlcSwgSW5kZXhlZENvbGxlY3Rpb24ucHJvdG90eXBlKTtcbm1peGluKFNldFNlcSwgU2V0Q29sbGVjdGlvbi5wcm90b3R5cGUpO1xuXG4vLyAjcHJhZ21hIEhlbHBlciBmdW5jdGlvbnNcblxuZnVuY3Rpb24gcmVkdWNlKGNvbGxlY3Rpb24sIHJlZHVjZXIsIHJlZHVjdGlvbiwgY29udGV4dCwgdXNlRmlyc3QsIHJldmVyc2UpIHtcbiAgYXNzZXJ0Tm90SW5maW5pdGUoY29sbGVjdGlvbi5zaXplKTtcbiAgY29sbGVjdGlvbi5fX2l0ZXJhdGUoZnVuY3Rpb24gKHYsIGssIGMpIHtcbiAgICBpZiAodXNlRmlyc3QpIHtcbiAgICAgIHVzZUZpcnN0ID0gZmFsc2U7XG4gICAgICByZWR1Y3Rpb24gPSB2O1xuICAgIH0gZWxzZSB7XG4gICAgICByZWR1Y3Rpb24gPSByZWR1Y2VyLmNhbGwoY29udGV4dCwgcmVkdWN0aW9uLCB2LCBrLCBjKTtcbiAgICB9XG4gIH0sIHJldmVyc2UpO1xuICByZXR1cm4gcmVkdWN0aW9uO1xufVxuXG5mdW5jdGlvbiBrZXlNYXBwZXIodiwgaykge1xuICByZXR1cm4gaztcbn1cblxuZnVuY3Rpb24gZW50cnlNYXBwZXIodiwgaykge1xuICByZXR1cm4gW2ssIHZdO1xufVxuXG5mdW5jdGlvbiBub3QocHJlZGljYXRlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gIXByZWRpY2F0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBuZWcocHJlZGljYXRlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gLXByZWRpY2F0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0WmlwcGVyKCkge1xuICByZXR1cm4gYXJyQ29weShhcmd1bWVudHMpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0TmVnQ29tcGFyYXRvcihhLCBiKSB7XG4gIHJldHVybiBhIDwgYiA/IDEgOiBhID4gYiA/IC0xIDogMDtcbn1cblxuZnVuY3Rpb24gaGFzaENvbGxlY3Rpb24oY29sbGVjdGlvbikge1xuICBpZiAoY29sbGVjdGlvbi5zaXplID09PSBJbmZpbml0eSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIHZhciBvcmRlcmVkID0gaXNPcmRlcmVkKGNvbGxlY3Rpb24pO1xuICB2YXIga2V5ZWQgPSBpc0tleWVkKGNvbGxlY3Rpb24pO1xuICB2YXIgaCA9IG9yZGVyZWQgPyAxIDogMDtcbiAgdmFyIHNpemUgPSBjb2xsZWN0aW9uLl9faXRlcmF0ZShcbiAgICBrZXllZFxuICAgICAgPyBvcmRlcmVkXG4gICAgICAgID8gZnVuY3Rpb24gKHYsIGspIHtcbiAgICAgICAgICAgIGggPSAoMzEgKiBoICsgaGFzaE1lcmdlKGhhc2godiksIGhhc2goaykpKSB8IDA7XG4gICAgICAgICAgfVxuICAgICAgICA6IGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICAgICAgICBoID0gKGggKyBoYXNoTWVyZ2UoaGFzaCh2KSwgaGFzaChrKSkpIHwgMDtcbiAgICAgICAgICB9XG4gICAgICA6IG9yZGVyZWRcbiAgICAgICAgPyBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgaCA9ICgzMSAqIGggKyBoYXNoKHYpKSB8IDA7XG4gICAgICAgICAgfVxuICAgICAgICA6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICBoID0gKGggKyBoYXNoKHYpKSB8IDA7XG4gICAgICAgICAgfVxuICApO1xuICByZXR1cm4gbXVybXVySGFzaE9mU2l6ZShzaXplLCBoKTtcbn1cblxuZnVuY3Rpb24gbXVybXVySGFzaE9mU2l6ZShzaXplLCBoKSB7XG4gIGggPSBpbXVsKGgsIDB4Y2M5ZTJkNTEpO1xuICBoID0gaW11bCgoaCA8PCAxNSkgfCAoaCA+Pj4gLTE1KSwgMHgxYjg3MzU5Myk7XG4gIGggPSBpbXVsKChoIDw8IDEzKSB8IChoID4+PiAtMTMpLCA1KTtcbiAgaCA9ICgoaCArIDB4ZTY1NDZiNjQpIHwgMCkgXiBzaXplO1xuICBoID0gaW11bChoIF4gKGggPj4+IDE2KSwgMHg4NWViY2E2Yik7XG4gIGggPSBpbXVsKGggXiAoaCA+Pj4gMTMpLCAweGMyYjJhZTM1KTtcbiAgaCA9IHNtaShoIF4gKGggPj4+IDE2KSk7XG4gIHJldHVybiBoO1xufVxuXG5mdW5jdGlvbiBoYXNoTWVyZ2UoYSwgYikge1xuICByZXR1cm4gKGEgXiAoYiArIDB4OWUzNzc5YjkgKyAoYSA8PCA2KSArIChhID4+IDIpKSkgfCAwOyAvLyBpbnRcbn1cblxudmFyIE9yZGVyZWRTZXQgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChTZXQkJDEpIHtcbiAgZnVuY3Rpb24gT3JkZXJlZFNldCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICA/IGVtcHR5T3JkZXJlZFNldCgpXG4gICAgICA6IGlzT3JkZXJlZFNldCh2YWx1ZSlcbiAgICAgICAgPyB2YWx1ZVxuICAgICAgICA6IGVtcHR5T3JkZXJlZFNldCgpLndpdGhNdXRhdGlvbnMoZnVuY3Rpb24gKHNldCkge1xuICAgICAgICAgICAgdmFyIGl0ZXIgPSBTZXRDb2xsZWN0aW9uKHZhbHVlKTtcbiAgICAgICAgICAgIGFzc2VydE5vdEluZmluaXRlKGl0ZXIuc2l6ZSk7XG4gICAgICAgICAgICBpdGVyLmZvckVhY2goZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHNldC5hZGQodik7IH0pO1xuICAgICAgICAgIH0pO1xuICB9XG5cbiAgaWYgKCBTZXQkJDEgKSBPcmRlcmVkU2V0Ll9fcHJvdG9fXyA9IFNldCQkMTtcbiAgT3JkZXJlZFNldC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBTZXQkJDEgJiYgU2V0JCQxLnByb3RvdHlwZSApO1xuICBPcmRlcmVkU2V0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE9yZGVyZWRTZXQ7XG5cbiAgT3JkZXJlZFNldC5vZiA9IGZ1bmN0aW9uIG9mICgvKi4uLnZhbHVlcyovKSB7XG4gICAgcmV0dXJuIHRoaXMoYXJndW1lbnRzKTtcbiAgfTtcblxuICBPcmRlcmVkU2V0LmZyb21LZXlzID0gZnVuY3Rpb24gZnJvbUtleXMgKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMoS2V5ZWRDb2xsZWN0aW9uKHZhbHVlKS5rZXlTZXEoKSk7XG4gIH07XG5cbiAgT3JkZXJlZFNldC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX190b1N0cmluZygnT3JkZXJlZFNldCB7JywgJ30nKTtcbiAgfTtcblxuICByZXR1cm4gT3JkZXJlZFNldDtcbn0oU2V0KSk7XG5cbk9yZGVyZWRTZXQuaXNPcmRlcmVkU2V0ID0gaXNPcmRlcmVkU2V0O1xuXG52YXIgT3JkZXJlZFNldFByb3RvdHlwZSA9IE9yZGVyZWRTZXQucHJvdG90eXBlO1xuT3JkZXJlZFNldFByb3RvdHlwZVtJU19PUkRFUkVEX1NZTUJPTF0gPSB0cnVlO1xuT3JkZXJlZFNldFByb3RvdHlwZS56aXAgPSBJbmRleGVkQ29sbGVjdGlvblByb3RvdHlwZS56aXA7XG5PcmRlcmVkU2V0UHJvdG90eXBlLnppcFdpdGggPSBJbmRleGVkQ29sbGVjdGlvblByb3RvdHlwZS56aXBXaXRoO1xuXG5PcmRlcmVkU2V0UHJvdG90eXBlLl9fZW1wdHkgPSBlbXB0eU9yZGVyZWRTZXQ7XG5PcmRlcmVkU2V0UHJvdG90eXBlLl9fbWFrZSA9IG1ha2VPcmRlcmVkU2V0O1xuXG5mdW5jdGlvbiBtYWtlT3JkZXJlZFNldChtYXAsIG93bmVySUQpIHtcbiAgdmFyIHNldCA9IE9iamVjdC5jcmVhdGUoT3JkZXJlZFNldFByb3RvdHlwZSk7XG4gIHNldC5zaXplID0gbWFwID8gbWFwLnNpemUgOiAwO1xuICBzZXQuX21hcCA9IG1hcDtcbiAgc2V0Ll9fb3duZXJJRCA9IG93bmVySUQ7XG4gIHJldHVybiBzZXQ7XG59XG5cbnZhciBFTVBUWV9PUkRFUkVEX1NFVDtcbmZ1bmN0aW9uIGVtcHR5T3JkZXJlZFNldCgpIHtcbiAgcmV0dXJuIChcbiAgICBFTVBUWV9PUkRFUkVEX1NFVCB8fCAoRU1QVFlfT1JERVJFRF9TRVQgPSBtYWtlT3JkZXJlZFNldChlbXB0eU9yZGVyZWRNYXAoKSkpXG4gICk7XG59XG5cbnZhciBSZWNvcmQgPSBmdW5jdGlvbiBSZWNvcmQoZGVmYXVsdFZhbHVlcywgbmFtZSkge1xuICB2YXIgaGFzSW5pdGlhbGl6ZWQ7XG5cbiAgdmFyIFJlY29yZFR5cGUgPSBmdW5jdGlvbiBSZWNvcmQodmFsdWVzKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICBpZiAodmFsdWVzIGluc3RhbmNlb2YgUmVjb3JkVHlwZSkge1xuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlY29yZFR5cGUpKSB7XG4gICAgICByZXR1cm4gbmV3IFJlY29yZFR5cGUodmFsdWVzKTtcbiAgICB9XG4gICAgaWYgKCFoYXNJbml0aWFsaXplZCkge1xuICAgICAgaGFzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkZWZhdWx0VmFsdWVzKTtcbiAgICAgIHZhciBpbmRpY2VzID0gKFJlY29yZFR5cGVQcm90b3R5cGUuX2luZGljZXMgPSB7fSk7XG4gICAgICAvLyBEZXByZWNhdGVkOiBsZWZ0IHRvIGF0dGVtcHQgbm90IHRvIGJyZWFrIGFueSBleHRlcm5hbCBjb2RlIHdoaWNoXG4gICAgICAvLyByZWxpZXMgb24gYSAuX25hbWUgcHJvcGVydHkgZXhpc3Rpbmcgb24gcmVjb3JkIGluc3RhbmNlcy5cbiAgICAgIC8vIFVzZSBSZWNvcmQuZ2V0RGVzY3JpcHRpdmVOYW1lKCkgaW5zdGVhZFxuICAgICAgUmVjb3JkVHlwZVByb3RvdHlwZS5fbmFtZSA9IG5hbWU7XG4gICAgICBSZWNvcmRUeXBlUHJvdG90eXBlLl9rZXlzID0ga2V5cztcbiAgICAgIFJlY29yZFR5cGVQcm90b3R5cGUuX2RlZmF1bHRWYWx1ZXMgPSBkZWZhdWx0VmFsdWVzO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwcm9wTmFtZSA9IGtleXNbaV07XG4gICAgICAgIGluZGljZXNbcHJvcE5hbWVdID0gaTtcbiAgICAgICAgaWYgKFJlY29yZFR5cGVQcm90b3R5cGVbcHJvcE5hbWVdKSB7XG4gICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgICAgICAgIHR5cGVvZiBjb25zb2xlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgY29uc29sZS53YXJuICYmXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICdDYW5ub3QgZGVmaW5lICcgK1xuICAgICAgICAgICAgICAgIHJlY29yZE5hbWUodGhpcykgK1xuICAgICAgICAgICAgICAgICcgd2l0aCBwcm9wZXJ0eSBcIicgK1xuICAgICAgICAgICAgICAgIHByb3BOYW1lICtcbiAgICAgICAgICAgICAgICAnXCIgc2luY2UgdGhhdCBwcm9wZXJ0eSBuYW1lIGlzIHBhcnQgb2YgdGhlIFJlY29yZCBBUEkuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRQcm9wKFJlY29yZFR5cGVQcm90b3R5cGUsIHByb3BOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9fb3duZXJJRCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl92YWx1ZXMgPSBMaXN0KCkud2l0aE11dGF0aW9ucyhmdW5jdGlvbiAobCkge1xuICAgICAgbC5zZXRTaXplKHRoaXMkMS5fa2V5cy5sZW5ndGgpO1xuICAgICAgS2V5ZWRDb2xsZWN0aW9uKHZhbHVlcykuZm9yRWFjaChmdW5jdGlvbiAodiwgaykge1xuICAgICAgICBsLnNldCh0aGlzJDEuX2luZGljZXNba10sIHYgPT09IHRoaXMkMS5fZGVmYXVsdFZhbHVlc1trXSA/IHVuZGVmaW5lZCA6IHYpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIFJlY29yZFR5cGVQcm90b3R5cGUgPSAoUmVjb3JkVHlwZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFxuICAgIFJlY29yZFByb3RvdHlwZVxuICApKTtcbiAgUmVjb3JkVHlwZVByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlY29yZFR5cGU7XG5cbiAgaWYgKG5hbWUpIHtcbiAgICBSZWNvcmRUeXBlLmRpc3BsYXlOYW1lID0gbmFtZTtcbiAgfVxuXG4gIHJldHVybiBSZWNvcmRUeXBlO1xufTtcblxuUmVjb3JkLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgdmFyIHN0ciA9IHJlY29yZE5hbWUodGhpcykgKyAnIHsgJztcbiAgdmFyIGtleXMgPSB0aGlzLl9rZXlzO1xuICB2YXIgaztcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSAhPT0gbDsgaSsrKSB7XG4gICAgayA9IGtleXNbaV07XG4gICAgc3RyICs9IChpID8gJywgJyA6ICcnKSArIGsgKyAnOiAnICsgcXVvdGVTdHJpbmcodGhpcy5nZXQoaykpO1xuICB9XG4gIHJldHVybiBzdHIgKyAnIH0nO1xufTtcblxuUmVjb3JkLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKG90aGVyKSB7XG4gIHJldHVybiAoXG4gICAgdGhpcyA9PT0gb3RoZXIgfHxcbiAgICAob3RoZXIgJiZcbiAgICAgIHRoaXMuX2tleXMgPT09IG90aGVyLl9rZXlzICYmXG4gICAgICByZWNvcmRTZXEodGhpcykuZXF1YWxzKHJlY29yZFNlcShvdGhlcikpKVxuICApO1xufTtcblxuUmVjb3JkLnByb3RvdHlwZS5oYXNoQ29kZSA9IGZ1bmN0aW9uIGhhc2hDb2RlICgpIHtcbiAgcmV0dXJuIHJlY29yZFNlcSh0aGlzKS5oYXNoQ29kZSgpO1xufTtcblxuLy8gQHByYWdtYSBBY2Nlc3NcblxuUmVjb3JkLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBoYXMgKGspIHtcbiAgcmV0dXJuIHRoaXMuX2luZGljZXMuaGFzT3duUHJvcGVydHkoayk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAoaywgbm90U2V0VmFsdWUpIHtcbiAgaWYgKCF0aGlzLmhhcyhrKSkge1xuICAgIHJldHVybiBub3RTZXRWYWx1ZTtcbiAgfVxuICB2YXIgaW5kZXggPSB0aGlzLl9pbmRpY2VzW2tdO1xuICB2YXIgdmFsdWUgPSB0aGlzLl92YWx1ZXMuZ2V0KGluZGV4KTtcbiAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0VmFsdWVzW2tdIDogdmFsdWU7XG59O1xuXG4vLyBAcHJhZ21hIE1vZGlmaWNhdGlvblxuXG5SZWNvcmQucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldCAoaywgdikge1xuICBpZiAodGhpcy5oYXMoaykpIHtcbiAgICB2YXIgbmV3VmFsdWVzID0gdGhpcy5fdmFsdWVzLnNldChcbiAgICAgIHRoaXMuX2luZGljZXNba10sXG4gICAgICB2ID09PSB0aGlzLl9kZWZhdWx0VmFsdWVzW2tdID8gdW5kZWZpbmVkIDogdlxuICAgICk7XG4gICAgaWYgKG5ld1ZhbHVlcyAhPT0gdGhpcy5fdmFsdWVzICYmICF0aGlzLl9fb3duZXJJRCkge1xuICAgICAgcmV0dXJuIG1ha2VSZWNvcmQodGhpcywgbmV3VmFsdWVzKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSAoaykge1xuICByZXR1cm4gdGhpcy5zZXQoayk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIgKCkge1xuICB2YXIgbmV3VmFsdWVzID0gdGhpcy5fdmFsdWVzLmNsZWFyKCkuc2V0U2l6ZSh0aGlzLl9rZXlzLmxlbmd0aCk7XG4gIHJldHVybiB0aGlzLl9fb3duZXJJRCA/IHRoaXMgOiBtYWtlUmVjb3JkKHRoaXMsIG5ld1ZhbHVlcyk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLndhc0FsdGVyZWQgPSBmdW5jdGlvbiB3YXNBbHRlcmVkICgpIHtcbiAgcmV0dXJuIHRoaXMuX3ZhbHVlcy53YXNBbHRlcmVkKCk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLnRvU2VxID0gZnVuY3Rpb24gdG9TZXEgKCkge1xuICByZXR1cm4gcmVjb3JkU2VxKHRoaXMpO1xufTtcblxuUmVjb3JkLnByb3RvdHlwZS50b0pTID0gZnVuY3Rpb24gdG9KUyQxICgpIHtcbiAgcmV0dXJuIHRvSlModGhpcyk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbiBlbnRyaWVzICgpIHtcbiAgcmV0dXJuIHRoaXMuX19pdGVyYXRvcihJVEVSQVRFX0VOVFJJRVMpO1xufTtcblxuUmVjb3JkLnByb3RvdHlwZS5fX2l0ZXJhdG9yID0gZnVuY3Rpb24gX19pdGVyYXRvciAodHlwZSwgcmV2ZXJzZSkge1xuICByZXR1cm4gcmVjb3JkU2VxKHRoaXMpLl9faXRlcmF0b3IodHlwZSwgcmV2ZXJzZSk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLl9faXRlcmF0ZSA9IGZ1bmN0aW9uIF9faXRlcmF0ZSAoZm4sIHJldmVyc2UpIHtcbiAgcmV0dXJuIHJlY29yZFNlcSh0aGlzKS5fX2l0ZXJhdGUoZm4sIHJldmVyc2UpO1xufTtcblxuUmVjb3JkLnByb3RvdHlwZS5fX2Vuc3VyZU93bmVyID0gZnVuY3Rpb24gX19lbnN1cmVPd25lciAob3duZXJJRCkge1xuICBpZiAob3duZXJJRCA9PT0gdGhpcy5fX293bmVySUQpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB2YXIgbmV3VmFsdWVzID0gdGhpcy5fdmFsdWVzLl9fZW5zdXJlT3duZXIob3duZXJJRCk7XG4gIGlmICghb3duZXJJRCkge1xuICAgIHRoaXMuX19vd25lcklEID0gb3duZXJJRDtcbiAgICB0aGlzLl92YWx1ZXMgPSBuZXdWYWx1ZXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmV0dXJuIG1ha2VSZWNvcmQodGhpcywgbmV3VmFsdWVzLCBvd25lcklEKTtcbn07XG5cblJlY29yZC5pc1JlY29yZCA9IGlzUmVjb3JkO1xuUmVjb3JkLmdldERlc2NyaXB0aXZlTmFtZSA9IHJlY29yZE5hbWU7XG52YXIgUmVjb3JkUHJvdG90eXBlID0gUmVjb3JkLnByb3RvdHlwZTtcblJlY29yZFByb3RvdHlwZVtJU19SRUNPUkRfU1lNQk9MXSA9IHRydWU7XG5SZWNvcmRQcm90b3R5cGVbREVMRVRFXSA9IFJlY29yZFByb3RvdHlwZS5yZW1vdmU7XG5SZWNvcmRQcm90b3R5cGUuZGVsZXRlSW4gPSBSZWNvcmRQcm90b3R5cGUucmVtb3ZlSW4gPSBkZWxldGVJbjtcblJlY29yZFByb3RvdHlwZS5nZXRJbiA9IGdldEluJDE7XG5SZWNvcmRQcm90b3R5cGUuaGFzSW4gPSBDb2xsZWN0aW9uUHJvdG90eXBlLmhhc0luO1xuUmVjb3JkUHJvdG90eXBlLm1lcmdlID0gbWVyZ2U7XG5SZWNvcmRQcm90b3R5cGUubWVyZ2VXaXRoID0gbWVyZ2VXaXRoO1xuUmVjb3JkUHJvdG90eXBlLm1lcmdlSW4gPSBtZXJnZUluO1xuUmVjb3JkUHJvdG90eXBlLm1lcmdlRGVlcCA9IG1lcmdlRGVlcCQxO1xuUmVjb3JkUHJvdG90eXBlLm1lcmdlRGVlcFdpdGggPSBtZXJnZURlZXBXaXRoJDE7XG5SZWNvcmRQcm90b3R5cGUubWVyZ2VEZWVwSW4gPSBtZXJnZURlZXBJbjtcblJlY29yZFByb3RvdHlwZS5zZXRJbiA9IHNldEluJDE7XG5SZWNvcmRQcm90b3R5cGUudXBkYXRlID0gdXBkYXRlJDE7XG5SZWNvcmRQcm90b3R5cGUudXBkYXRlSW4gPSB1cGRhdGVJbiQxO1xuUmVjb3JkUHJvdG90eXBlLndpdGhNdXRhdGlvbnMgPSB3aXRoTXV0YXRpb25zO1xuUmVjb3JkUHJvdG90eXBlLmFzTXV0YWJsZSA9IGFzTXV0YWJsZTtcblJlY29yZFByb3RvdHlwZS5hc0ltbXV0YWJsZSA9IGFzSW1tdXRhYmxlO1xuUmVjb3JkUHJvdG90eXBlW0lURVJBVE9SX1NZTUJPTF0gPSBSZWNvcmRQcm90b3R5cGUuZW50cmllcztcblJlY29yZFByb3RvdHlwZS50b0pTT04gPSBSZWNvcmRQcm90b3R5cGUudG9PYmplY3QgPVxuICBDb2xsZWN0aW9uUHJvdG90eXBlLnRvT2JqZWN0O1xuUmVjb3JkUHJvdG90eXBlLmluc3BlY3QgPSBSZWNvcmRQcm90b3R5cGUudG9Tb3VyY2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbn07XG5cbmZ1bmN0aW9uIG1ha2VSZWNvcmQobGlrZVJlY29yZCwgdmFsdWVzLCBvd25lcklEKSB7XG4gIHZhciByZWNvcmQgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZihsaWtlUmVjb3JkKSk7XG4gIHJlY29yZC5fdmFsdWVzID0gdmFsdWVzO1xuICByZWNvcmQuX19vd25lcklEID0gb3duZXJJRDtcbiAgcmV0dXJuIHJlY29yZDtcbn1cblxuZnVuY3Rpb24gcmVjb3JkTmFtZShyZWNvcmQpIHtcbiAgcmV0dXJuIHJlY29yZC5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCByZWNvcmQuY29uc3RydWN0b3IubmFtZSB8fCAnUmVjb3JkJztcbn1cblxuZnVuY3Rpb24gcmVjb3JkU2VxKHJlY29yZCkge1xuICByZXR1cm4ga2V5ZWRTZXFGcm9tVmFsdWUocmVjb3JkLl9rZXlzLm1hcChmdW5jdGlvbiAoaykgeyByZXR1cm4gW2ssIHJlY29yZC5nZXQoayldOyB9KSk7XG59XG5cbmZ1bmN0aW9uIHNldFByb3AocHJvdG90eXBlLCBuYW1lKSB7XG4gIHRyeSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvdHlwZSwgbmFtZSwge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KG5hbWUpO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaW52YXJpYW50KHRoaXMuX19vd25lcklELCAnQ2Fubm90IHNldCBvbiBhbiBpbW11dGFibGUgcmVjb3JkLicpO1xuICAgICAgICB0aGlzLnNldChuYW1lLCB2YWx1ZSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBmYWlsZWQuIFByb2JhYmx5IElFOC5cbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgYSBsYXp5IFNlcSBvZiBgdmFsdWVgIHJlcGVhdGVkIGB0aW1lc2AgdGltZXMuIFdoZW4gYHRpbWVzYCBpc1xuICogdW5kZWZpbmVkLCByZXR1cm5zIGFuIGluZmluaXRlIHNlcXVlbmNlIG9mIGB2YWx1ZWAuXG4gKi9cbnZhciBSZXBlYXQgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChJbmRleGVkU2VxJCQxKSB7XG4gIGZ1bmN0aW9uIFJlcGVhdCh2YWx1ZSwgdGltZXMpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwZWF0KSkge1xuICAgICAgcmV0dXJuIG5ldyBSZXBlYXQodmFsdWUsIHRpbWVzKTtcbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnNpemUgPSB0aW1lcyA9PT0gdW5kZWZpbmVkID8gSW5maW5pdHkgOiBNYXRoLm1heCgwLCB0aW1lcyk7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgaWYgKEVNUFRZX1JFUEVBVCkge1xuICAgICAgICByZXR1cm4gRU1QVFlfUkVQRUFUO1xuICAgICAgfVxuICAgICAgRU1QVFlfUkVQRUFUID0gdGhpcztcbiAgICB9XG4gIH1cblxuICBpZiAoIEluZGV4ZWRTZXEkJDEgKSBSZXBlYXQuX19wcm90b19fID0gSW5kZXhlZFNlcSQkMTtcbiAgUmVwZWF0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEluZGV4ZWRTZXEkJDEgJiYgSW5kZXhlZFNlcSQkMS5wcm90b3R5cGUgKTtcbiAgUmVwZWF0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlcGVhdDtcblxuICBSZXBlYXQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiAnUmVwZWF0IFtdJztcbiAgICB9XG4gICAgcmV0dXJuICdSZXBlYXQgWyAnICsgdGhpcy5fdmFsdWUgKyAnICcgKyB0aGlzLnNpemUgKyAnIHRpbWVzIF0nO1xuICB9O1xuXG4gIFJlcGVhdC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0IChpbmRleCwgbm90U2V0VmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5oYXMoaW5kZXgpID8gdGhpcy5fdmFsdWUgOiBub3RTZXRWYWx1ZTtcbiAgfTtcblxuICBSZXBlYXQucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHNlYXJjaFZhbHVlKSB7XG4gICAgcmV0dXJuIGlzKHRoaXMuX3ZhbHVlLCBzZWFyY2hWYWx1ZSk7XG4gIH07XG5cbiAgUmVwZWF0LnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChiZWdpbiwgZW5kKSB7XG4gICAgdmFyIHNpemUgPSB0aGlzLnNpemU7XG4gICAgcmV0dXJuIHdob2xlU2xpY2UoYmVnaW4sIGVuZCwgc2l6ZSlcbiAgICAgID8gdGhpc1xuICAgICAgOiBuZXcgUmVwZWF0KFxuICAgICAgICAgIHRoaXMuX3ZhbHVlLFxuICAgICAgICAgIHJlc29sdmVFbmQoZW5kLCBzaXplKSAtIHJlc29sdmVCZWdpbihiZWdpbiwgc2l6ZSlcbiAgICAgICAgKTtcbiAgfTtcblxuICBSZXBlYXQucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbiByZXZlcnNlICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBSZXBlYXQucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mIChzZWFyY2hWYWx1ZSkge1xuICAgIGlmIChpcyh0aGlzLl92YWx1ZSwgc2VhcmNoVmFsdWUpKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG4gIFJlcGVhdC5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAoc2VhcmNoVmFsdWUpIHtcbiAgICBpZiAoaXModGhpcy5fdmFsdWUsIHNlYXJjaFZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2l6ZTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG4gIFJlcGVhdC5wcm90b3R5cGUuX19pdGVyYXRlID0gZnVuY3Rpb24gX19pdGVyYXRlIChmbiwgcmV2ZXJzZSkge1xuICAgIHZhciBzaXplID0gdGhpcy5zaXplO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSAhPT0gc2l6ZSkge1xuICAgICAgaWYgKGZuKHRoaXMuX3ZhbHVlLCByZXZlcnNlID8gc2l6ZSAtICsraSA6IGkrKywgdGhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaTtcbiAgfTtcblxuICBSZXBlYXQucHJvdG90eXBlLl9faXRlcmF0b3IgPSBmdW5jdGlvbiBfX2l0ZXJhdG9yICh0eXBlLCByZXZlcnNlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICB2YXIgaSA9IDA7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcihcbiAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGkgPT09IHNpemVcbiAgICAgICAgICA/IGl0ZXJhdG9yRG9uZSgpXG4gICAgICAgICAgOiBpdGVyYXRvclZhbHVlKHR5cGUsIHJldmVyc2UgPyBzaXplIC0gKytpIDogaSsrLCB0aGlzJDEuX3ZhbHVlKTsgfVxuICAgICk7XG4gIH07XG5cbiAgUmVwZWF0LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKG90aGVyKSB7XG4gICAgcmV0dXJuIG90aGVyIGluc3RhbmNlb2YgUmVwZWF0XG4gICAgICA/IGlzKHRoaXMuX3ZhbHVlLCBvdGhlci5fdmFsdWUpXG4gICAgICA6IGRlZXBFcXVhbChvdGhlcik7XG4gIH07XG5cbiAgcmV0dXJuIFJlcGVhdDtcbn0oSW5kZXhlZFNlcSkpO1xuXG52YXIgRU1QVFlfUkVQRUFUO1xuXG5mdW5jdGlvbiBmcm9tSlModmFsdWUsIGNvbnZlcnRlcikge1xuICByZXR1cm4gZnJvbUpTV2l0aChcbiAgICBbXSxcbiAgICBjb252ZXJ0ZXIgfHwgZGVmYXVsdENvbnZlcnRlcixcbiAgICB2YWx1ZSxcbiAgICAnJyxcbiAgICBjb252ZXJ0ZXIgJiYgY29udmVydGVyLmxlbmd0aCA+IDIgPyBbXSA6IHVuZGVmaW5lZCxcbiAgICB7ICcnOiB2YWx1ZSB9XG4gICk7XG59XG5cbmZ1bmN0aW9uIGZyb21KU1dpdGgoc3RhY2ssIGNvbnZlcnRlciwgdmFsdWUsIGtleSwga2V5UGF0aCwgcGFyZW50VmFsdWUpIHtcbiAgdmFyIHRvU2VxID0gQXJyYXkuaXNBcnJheSh2YWx1ZSlcbiAgICA/IEluZGV4ZWRTZXFcbiAgICA6IGlzUGxhaW5PYmoodmFsdWUpXG4gICAgICA/IEtleWVkU2VxXG4gICAgICA6IG51bGw7XG4gIGlmICh0b1NlcSkge1xuICAgIGlmICh+c3RhY2suaW5kZXhPZih2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGNpcmN1bGFyIHN0cnVjdHVyZSB0byBJbW11dGFibGUnKTtcbiAgICB9XG4gICAgc3RhY2sucHVzaCh2YWx1ZSk7XG4gICAga2V5UGF0aCAmJiBrZXkgIT09ICcnICYmIGtleVBhdGgucHVzaChrZXkpO1xuICAgIHZhciBjb252ZXJ0ZWQgPSBjb252ZXJ0ZXIuY2FsbChcbiAgICAgIHBhcmVudFZhbHVlLFxuICAgICAga2V5LFxuICAgICAgdG9TZXEodmFsdWUpLm1hcChmdW5jdGlvbiAodiwgaykgeyByZXR1cm4gZnJvbUpTV2l0aChzdGFjaywgY29udmVydGVyLCB2LCBrLCBrZXlQYXRoLCB2YWx1ZSk7IH1cbiAgICAgICksXG4gICAgICBrZXlQYXRoICYmIGtleVBhdGguc2xpY2UoKVxuICAgICk7XG4gICAgc3RhY2sucG9wKCk7XG4gICAga2V5UGF0aCAmJiBrZXlQYXRoLnBvcCgpO1xuICAgIHJldHVybiBjb252ZXJ0ZWQ7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0Q29udmVydGVyKGssIHYpIHtcbiAgcmV0dXJuIGlzS2V5ZWQodikgPyB2LnRvTWFwKCkgOiB2LnRvTGlzdCgpO1xufVxuXG52YXIgdmVyc2lvbiA9IFwiNC4wLjAtcmMuMTFcIjtcblxudmFyIEltbXV0YWJsZSA9IHtcbiAgdmVyc2lvbjogdmVyc2lvbixcblxuICBDb2xsZWN0aW9uOiBDb2xsZWN0aW9uLFxuICAvLyBOb3RlOiBJdGVyYWJsZSBpcyBkZXByZWNhdGVkXG4gIEl0ZXJhYmxlOiBDb2xsZWN0aW9uLFxuXG4gIFNlcTogU2VxLFxuICBNYXA6IE1hcCxcbiAgT3JkZXJlZE1hcDogT3JkZXJlZE1hcCxcbiAgTGlzdDogTGlzdCxcbiAgU3RhY2s6IFN0YWNrLFxuICBTZXQ6IFNldCxcbiAgT3JkZXJlZFNldDogT3JkZXJlZFNldCxcblxuICBSZWNvcmQ6IFJlY29yZCxcbiAgUmFuZ2U6IFJhbmdlLFxuICBSZXBlYXQ6IFJlcGVhdCxcblxuICBpczogaXMsXG4gIGZyb21KUzogZnJvbUpTLFxuICBoYXNoOiBoYXNoLFxuXG4gIGlzSW1tdXRhYmxlOiBpc0ltbXV0YWJsZSxcbiAgaXNDb2xsZWN0aW9uOiBpc0NvbGxlY3Rpb24sXG4gIGlzS2V5ZWQ6IGlzS2V5ZWQsXG4gIGlzSW5kZXhlZDogaXNJbmRleGVkLFxuICBpc0Fzc29jaWF0aXZlOiBpc0Fzc29jaWF0aXZlLFxuICBpc09yZGVyZWQ6IGlzT3JkZXJlZCxcbiAgaXNWYWx1ZU9iamVjdDogaXNWYWx1ZU9iamVjdCxcbiAgaXNTZXE6IGlzU2VxLFxuICBpc0xpc3Q6IGlzTGlzdCxcbiAgaXNNYXA6IGlzTWFwLFxuICBpc09yZGVyZWRNYXA6IGlzT3JkZXJlZE1hcCxcbiAgaXNTdGFjazogaXNTdGFjayxcbiAgaXNTZXQ6IGlzU2V0LFxuICBpc09yZGVyZWRTZXQ6IGlzT3JkZXJlZFNldCxcbiAgaXNSZWNvcmQ6IGlzUmVjb3JkLFxuXG4gIGdldDogZ2V0LFxuICBnZXRJbjogZ2V0SW4sXG4gIGhhczogaGFzLFxuICBoYXNJbjogaGFzSW4sXG4gIG1lcmdlOiBtZXJnZSQxLFxuICBtZXJnZURlZXA6IG1lcmdlRGVlcCxcbiAgbWVyZ2VXaXRoOiBtZXJnZVdpdGgkMSxcbiAgbWVyZ2VEZWVwV2l0aDogbWVyZ2VEZWVwV2l0aCxcbiAgcmVtb3ZlOiByZW1vdmUsXG4gIHJlbW92ZUluOiByZW1vdmVJbixcbiAgc2V0OiBzZXQsXG4gIHNldEluOiBzZXRJbixcbiAgdXBkYXRlOiB1cGRhdGUsXG4gIHVwZGF0ZUluOiB1cGRhdGVJbixcbn07XG5cbi8vIE5vdGU6IEl0ZXJhYmxlIGlzIGRlcHJlY2F0ZWRcbnZhciBJdGVyYWJsZSA9IENvbGxlY3Rpb247XG5cbmV4cG9ydCBkZWZhdWx0IEltbXV0YWJsZTtcbmV4cG9ydCB7IHZlcnNpb24sIENvbGxlY3Rpb24sIEl0ZXJhYmxlLCBTZXEsIE1hcCwgT3JkZXJlZE1hcCwgTGlzdCwgU3RhY2ssIFNldCwgT3JkZXJlZFNldCwgUmVjb3JkLCBSYW5nZSwgUmVwZWF0LCBpcywgZnJvbUpTLCBoYXNoLCBpc0ltbXV0YWJsZSwgaXNDb2xsZWN0aW9uLCBpc0tleWVkLCBpc0luZGV4ZWQsIGlzQXNzb2NpYXRpdmUsIGlzT3JkZXJlZCwgaXNWYWx1ZU9iamVjdCwgZ2V0LCBnZXRJbiwgaGFzLCBoYXNJbiwgbWVyZ2UkMSBhcyBtZXJnZSwgbWVyZ2VEZWVwLCBtZXJnZVdpdGgkMSBhcyBtZXJnZVdpdGgsIG1lcmdlRGVlcFdpdGgsIHJlbW92ZSwgcmVtb3ZlSW4sIHNldCwgc2V0SW4sIHVwZGF0ZSwgdXBkYXRlSW4gfTtcbiIsIi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uIChyb290LCBwbHVyYWxpemUpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xuICAgIC8vIE5vZGUuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBwbHVyYWxpemUoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQsIHJlZ2lzdGVycyBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcGx1cmFsaXplKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWwuXG4gICAgcm9vdC5wbHVyYWxpemUgPSBwbHVyYWxpemUoKTtcbiAgfVxufSkodGhpcywgZnVuY3Rpb24gKCkge1xuICAvLyBSdWxlIHN0b3JhZ2UgLSBwbHVyYWxpemUgYW5kIHNpbmd1bGFyaXplIG5lZWQgdG8gYmUgcnVuIHNlcXVlbnRpYWxseSxcbiAgLy8gd2hpbGUgb3RoZXIgcnVsZXMgY2FuIGJlIG9wdGltaXplZCB1c2luZyBhbiBvYmplY3QgZm9yIGluc3RhbnQgbG9va3Vwcy5cbiAgdmFyIHBsdXJhbFJ1bGVzID0gW107XG4gIHZhciBzaW5ndWxhclJ1bGVzID0gW107XG4gIHZhciB1bmNvdW50YWJsZXMgPSB7fTtcbiAgdmFyIGlycmVndWxhclBsdXJhbHMgPSB7fTtcbiAgdmFyIGlycmVndWxhclNpbmdsZXMgPSB7fTtcblxuICAvKipcbiAgICogU2FuaXRpemUgYSBwbHVyYWxpemF0aW9uIHJ1bGUgdG8gYSB1c2FibGUgcmVndWxhciBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIHsoUmVnRXhwfHN0cmluZyl9IHJ1bGVcbiAgICogQHJldHVybiB7UmVnRXhwfVxuICAgKi9cbiAgZnVuY3Rpb24gc2FuaXRpemVSdWxlIChydWxlKSB7XG4gICAgaWYgKHR5cGVvZiBydWxlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgcnVsZSArICckJywgJ2knKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcnVsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXNzIGluIGEgd29yZCB0b2tlbiB0byBwcm9kdWNlIGEgZnVuY3Rpb24gdGhhdCBjYW4gcmVwbGljYXRlIHRoZSBjYXNlIG9uXG4gICAqIGFub3RoZXIgd29yZC5cbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIHdvcmRcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIHRva2VuXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gcmVzdG9yZUNhc2UgKHdvcmQsIHRva2VuKSB7XG4gICAgLy8gVG9rZW5zIGFyZSBhbiBleGFjdCBtYXRjaC5cbiAgICBpZiAod29yZCA9PT0gdG9rZW4pIHJldHVybiB0b2tlbjtcblxuICAgIC8vIExvd2VyIGNhc2VkIHdvcmRzLiBFLmcuIFwiaGVsbG9cIi5cbiAgICBpZiAod29yZCA9PT0gd29yZC50b0xvd2VyQ2FzZSgpKSByZXR1cm4gdG9rZW4udG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIFVwcGVyIGNhc2VkIHdvcmRzLiBFLmcuIFwiV0hJU0tZXCIuXG4gICAgaWYgKHdvcmQgPT09IHdvcmQudG9VcHBlckNhc2UoKSkgcmV0dXJuIHRva2VuLnRvVXBwZXJDYXNlKCk7XG5cbiAgICAvLyBUaXRsZSBjYXNlZCB3b3Jkcy4gRS5nLiBcIlRpdGxlXCIuXG4gICAgaWYgKHdvcmRbMF0gPT09IHdvcmRbMF0udG9VcHBlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIHRva2VuLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdG9rZW4uc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLy8gTG93ZXIgY2FzZWQgd29yZHMuIEUuZy4gXCJ0ZXN0XCIuXG4gICAgcmV0dXJuIHRva2VuLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJwb2xhdGUgYSByZWdleHAgc3RyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICAgKiBAcGFyYW0gIHtBcnJheX0gIGFyZ3NcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gaW50ZXJwb2xhdGUgKHN0ciwgYXJncykge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFwkKFxcZHsxLDJ9KS9nLCBmdW5jdGlvbiAobWF0Y2gsIGluZGV4KSB7XG4gICAgICByZXR1cm4gYXJnc1tpbmRleF0gfHwgJyc7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBhIHdvcmQgdXNpbmcgYSBydWxlLlxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHdvcmRcbiAgICogQHBhcmFtICB7QXJyYXl9ICBydWxlXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIHJlcGxhY2UgKHdvcmQsIHJ1bGUpIHtcbiAgICByZXR1cm4gd29yZC5yZXBsYWNlKHJ1bGVbMF0sIGZ1bmN0aW9uIChtYXRjaCwgaW5kZXgpIHtcbiAgICAgIHZhciByZXN1bHQgPSBpbnRlcnBvbGF0ZShydWxlWzFdLCBhcmd1bWVudHMpO1xuXG4gICAgICBpZiAobWF0Y2ggPT09ICcnKSB7XG4gICAgICAgIHJldHVybiByZXN0b3JlQ2FzZSh3b3JkW2luZGV4IC0gMV0sIHJlc3VsdCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN0b3JlQ2FzZShtYXRjaCwgcmVzdWx0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYW5pdGl6ZSBhIHdvcmQgYnkgcGFzc2luZyBpbiB0aGUgd29yZCBhbmQgc2FuaXRpemF0aW9uIHJ1bGVzLlxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgdG9rZW5cbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIHdvcmRcbiAgICogQHBhcmFtICB7QXJyYXl9ICAgIHJ1bGVzXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIHNhbml0aXplV29yZCAodG9rZW4sIHdvcmQsIHJ1bGVzKSB7XG4gICAgLy8gRW1wdHkgc3RyaW5nIG9yIGRvZXNuJ3QgbmVlZCBmaXhpbmcuXG4gICAgaWYgKCF0b2tlbi5sZW5ndGggfHwgdW5jb3VudGFibGVzLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuICAgICAgcmV0dXJuIHdvcmQ7XG4gICAgfVxuXG4gICAgdmFyIGxlbiA9IHJ1bGVzLmxlbmd0aDtcblxuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgc2FuaXRpemF0aW9uIHJ1bGVzIGFuZCB1c2UgdGhlIGZpcnN0IG9uZSB0byBtYXRjaC5cbiAgICB3aGlsZSAobGVuLS0pIHtcbiAgICAgIHZhciBydWxlID0gcnVsZXNbbGVuXTtcblxuICAgICAgaWYgKHJ1bGVbMF0udGVzdCh3b3JkKSkgcmV0dXJuIHJlcGxhY2Uod29yZCwgcnVsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdvcmQ7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBhIHdvcmQgd2l0aCB0aGUgdXBkYXRlZCB3b3JkLlxuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgcmVwbGFjZU1hcFxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAga2VlcE1hcFxuICAgKiBAcGFyYW0gIHtBcnJheX0gICAgcnVsZXNcbiAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlV29yZCAocmVwbGFjZU1hcCwga2VlcE1hcCwgcnVsZXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHdvcmQpIHtcbiAgICAgIC8vIEdldCB0aGUgY29ycmVjdCB0b2tlbiBhbmQgY2FzZSByZXN0b3JhdGlvbiBmdW5jdGlvbnMuXG4gICAgICB2YXIgdG9rZW4gPSB3b3JkLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIC8vIENoZWNrIGFnYWluc3QgdGhlIGtlZXAgb2JqZWN0IG1hcC5cbiAgICAgIGlmIChrZWVwTWFwLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuICAgICAgICByZXR1cm4gcmVzdG9yZUNhc2Uod29yZCwgdG9rZW4pO1xuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayBhZ2FpbnN0IHRoZSByZXBsYWNlbWVudCBtYXAgZm9yIGEgZGlyZWN0IHdvcmQgcmVwbGFjZW1lbnQuXG4gICAgICBpZiAocmVwbGFjZU1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgICAgcmV0dXJuIHJlc3RvcmVDYXNlKHdvcmQsIHJlcGxhY2VNYXBbdG9rZW5dKTtcbiAgICAgIH1cblxuICAgICAgLy8gUnVuIGFsbCB0aGUgcnVsZXMgYWdhaW5zdCB0aGUgd29yZC5cbiAgICAgIHJldHVybiBzYW5pdGl6ZVdvcmQodG9rZW4sIHdvcmQsIHJ1bGVzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgd29yZCBpcyBwYXJ0IG9mIHRoZSBtYXAuXG4gICAqL1xuICBmdW5jdGlvbiBjaGVja1dvcmQgKHJlcGxhY2VNYXAsIGtlZXBNYXAsIHJ1bGVzLCBib29sKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgICB2YXIgdG9rZW4gPSB3b3JkLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGlmIChrZWVwTWFwLmhhc093blByb3BlcnR5KHRva2VuKSkgcmV0dXJuIHRydWU7XG4gICAgICBpZiAocmVwbGFjZU1hcC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHJldHVybiBmYWxzZTtcblxuICAgICAgcmV0dXJuIHNhbml0aXplV29yZCh0b2tlbiwgdG9rZW4sIHJ1bGVzKSA9PT0gdG9rZW47XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQbHVyYWxpemUgb3Igc2luZ3VsYXJpemUgYSB3b3JkIGJhc2VkIG9uIHRoZSBwYXNzZWQgaW4gY291bnQuXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gIHdvcmQgICAgICBUaGUgd29yZCB0byBwbHVyYWxpemVcbiAgICogQHBhcmFtICB7bnVtYmVyfSAgY291bnQgICAgIEhvdyBtYW55IG9mIHRoZSB3b3JkIGV4aXN0XG4gICAqIEBwYXJhbSAge2Jvb2xlYW59IGluY2x1c2l2ZSBXaGV0aGVyIHRvIHByZWZpeCB3aXRoIHRoZSBudW1iZXIgKGUuZy4gMyBkdWNrcylcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gcGx1cmFsaXplICh3b3JkLCBjb3VudCwgaW5jbHVzaXZlKSB7XG4gICAgdmFyIHBsdXJhbGl6ZWQgPSBjb3VudCA9PT0gMVxuICAgICAgPyBwbHVyYWxpemUuc2luZ3VsYXIod29yZCkgOiBwbHVyYWxpemUucGx1cmFsKHdvcmQpO1xuXG4gICAgcmV0dXJuIChpbmNsdXNpdmUgPyBjb3VudCArICcgJyA6ICcnKSArIHBsdXJhbGl6ZWQ7XG4gIH1cblxuICAvKipcbiAgICogUGx1cmFsaXplIGEgd29yZC5cbiAgICpcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgcGx1cmFsaXplLnBsdXJhbCA9IHJlcGxhY2VXb3JkKFxuICAgIGlycmVndWxhclNpbmdsZXMsIGlycmVndWxhclBsdXJhbHMsIHBsdXJhbFJ1bGVzXG4gICk7XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgd29yZCBpcyBwbHVyYWwuXG4gICAqXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIHBsdXJhbGl6ZS5pc1BsdXJhbCA9IGNoZWNrV29yZChcbiAgICBpcnJlZ3VsYXJTaW5nbGVzLCBpcnJlZ3VsYXJQbHVyYWxzLCBwbHVyYWxSdWxlc1xuICApO1xuXG4gIC8qKlxuICAgKiBTaW5ndWxhcml6ZSBhIHdvcmQuXG4gICAqXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIHBsdXJhbGl6ZS5zaW5ndWxhciA9IHJlcGxhY2VXb3JkKFxuICAgIGlycmVndWxhclBsdXJhbHMsIGlycmVndWxhclNpbmdsZXMsIHNpbmd1bGFyUnVsZXNcbiAgKTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB3b3JkIGlzIHNpbmd1bGFyLlxuICAgKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBwbHVyYWxpemUuaXNTaW5ndWxhciA9IGNoZWNrV29yZChcbiAgICBpcnJlZ3VsYXJQbHVyYWxzLCBpcnJlZ3VsYXJTaW5nbGVzLCBzaW5ndWxhclJ1bGVzXG4gICk7XG5cbiAgLyoqXG4gICAqIEFkZCBhIHBsdXJhbGl6YXRpb24gcnVsZSB0byB0aGUgY29sbGVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cCl9IHJ1bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgIHJlcGxhY2VtZW50XG4gICAqL1xuICBwbHVyYWxpemUuYWRkUGx1cmFsUnVsZSA9IGZ1bmN0aW9uIChydWxlLCByZXBsYWNlbWVudCkge1xuICAgIHBsdXJhbFJ1bGVzLnB1c2goW3Nhbml0aXplUnVsZShydWxlKSwgcmVwbGFjZW1lbnRdKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGEgc2luZ3VsYXJpemF0aW9uIHJ1bGUgdG8gdGhlIGNvbGxlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHApfSBydWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICByZXBsYWNlbWVudFxuICAgKi9cbiAgcGx1cmFsaXplLmFkZFNpbmd1bGFyUnVsZSA9IGZ1bmN0aW9uIChydWxlLCByZXBsYWNlbWVudCkge1xuICAgIHNpbmd1bGFyUnVsZXMucHVzaChbc2FuaXRpemVSdWxlKHJ1bGUpLCByZXBsYWNlbWVudF0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gdW5jb3VudGFibGUgd29yZCBydWxlLlxuICAgKlxuICAgKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwKX0gd29yZFxuICAgKi9cbiAgcGx1cmFsaXplLmFkZFVuY291bnRhYmxlUnVsZSA9IGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgaWYgKHR5cGVvZiB3b3JkID09PSAnc3RyaW5nJykge1xuICAgICAgdW5jb3VudGFibGVzW3dvcmQudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNldCBzaW5ndWxhciBhbmQgcGx1cmFsIHJlZmVyZW5jZXMgZm9yIHRoZSB3b3JkLlxuICAgIHBsdXJhbGl6ZS5hZGRQbHVyYWxSdWxlKHdvcmQsICckMCcpO1xuICAgIHBsdXJhbGl6ZS5hZGRTaW5ndWxhclJ1bGUod29yZCwgJyQwJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBpcnJlZ3VsYXIgd29yZCBkZWZpbml0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2luZ2xlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwbHVyYWxcbiAgICovXG4gIHBsdXJhbGl6ZS5hZGRJcnJlZ3VsYXJSdWxlID0gZnVuY3Rpb24gKHNpbmdsZSwgcGx1cmFsKSB7XG4gICAgcGx1cmFsID0gcGx1cmFsLnRvTG93ZXJDYXNlKCk7XG4gICAgc2luZ2xlID0gc2luZ2xlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpcnJlZ3VsYXJTaW5nbGVzW3NpbmdsZV0gPSBwbHVyYWw7XG4gICAgaXJyZWd1bGFyUGx1cmFsc1twbHVyYWxdID0gc2luZ2xlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcnJlZ3VsYXIgcnVsZXMuXG4gICAqL1xuICBbXG4gICAgLy8gUHJvbm91bnMuXG4gICAgWydJJywgJ3dlJ10sXG4gICAgWydtZScsICd1cyddLFxuICAgIFsnaGUnLCAndGhleSddLFxuICAgIFsnc2hlJywgJ3RoZXknXSxcbiAgICBbJ3RoZW0nLCAndGhlbSddLFxuICAgIFsnbXlzZWxmJywgJ291cnNlbHZlcyddLFxuICAgIFsneW91cnNlbGYnLCAneW91cnNlbHZlcyddLFxuICAgIFsnaXRzZWxmJywgJ3RoZW1zZWx2ZXMnXSxcbiAgICBbJ2hlcnNlbGYnLCAndGhlbXNlbHZlcyddLFxuICAgIFsnaGltc2VsZicsICd0aGVtc2VsdmVzJ10sXG4gICAgWyd0aGVtc2VsZicsICd0aGVtc2VsdmVzJ10sXG4gICAgWydpcycsICdhcmUnXSxcbiAgICBbJ3dhcycsICd3ZXJlJ10sXG4gICAgWydoYXMnLCAnaGF2ZSddLFxuICAgIFsndGhpcycsICd0aGVzZSddLFxuICAgIFsndGhhdCcsICd0aG9zZSddLFxuICAgIC8vIFdvcmRzIGVuZGluZyBpbiB3aXRoIGEgY29uc29uYW50IGFuZCBgb2AuXG4gICAgWydlY2hvJywgJ2VjaG9lcyddLFxuICAgIFsnZGluZ28nLCAnZGluZ29lcyddLFxuICAgIFsndm9sY2FubycsICd2b2xjYW5vZXMnXSxcbiAgICBbJ3Rvcm5hZG8nLCAndG9ybmFkb2VzJ10sXG4gICAgWyd0b3JwZWRvJywgJ3RvcnBlZG9lcyddLFxuICAgIC8vIEVuZHMgd2l0aCBgdXNgLlxuICAgIFsnZ2VudXMnLCAnZ2VuZXJhJ10sXG4gICAgWyd2aXNjdXMnLCAndmlzY2VyYSddLFxuICAgIC8vIEVuZHMgd2l0aCBgbWFgLlxuICAgIFsnc3RpZ21hJywgJ3N0aWdtYXRhJ10sXG4gICAgWydzdG9tYScsICdzdG9tYXRhJ10sXG4gICAgWydkb2dtYScsICdkb2dtYXRhJ10sXG4gICAgWydsZW1tYScsICdsZW1tYXRhJ10sXG4gICAgWydzY2hlbWEnLCAnc2NoZW1hdGEnXSxcbiAgICBbJ2FuYXRoZW1hJywgJ2FuYXRoZW1hdGEnXSxcbiAgICAvLyBPdGhlciBpcnJlZ3VsYXIgcnVsZXMuXG4gICAgWydveCcsICdveGVuJ10sXG4gICAgWydheGUnLCAnYXhlcyddLFxuICAgIFsnZGllJywgJ2RpY2UnXSxcbiAgICBbJ3llcycsICd5ZXNlcyddLFxuICAgIFsnZm9vdCcsICdmZWV0J10sXG4gICAgWydlYXZlJywgJ2VhdmVzJ10sXG4gICAgWydnb29zZScsICdnZWVzZSddLFxuICAgIFsndG9vdGgnLCAndGVldGgnXSxcbiAgICBbJ3F1aXonLCAncXVpenplcyddLFxuICAgIFsnaHVtYW4nLCAnaHVtYW5zJ10sXG4gICAgWydwcm9vZicsICdwcm9vZnMnXSxcbiAgICBbJ2NhcnZlJywgJ2NhcnZlcyddLFxuICAgIFsndmFsdmUnLCAndmFsdmVzJ10sXG4gICAgWydsb29leScsICdsb29pZXMnXSxcbiAgICBbJ3RoaWVmJywgJ3RoaWV2ZXMnXSxcbiAgICBbJ2dyb292ZScsICdncm9vdmVzJ10sXG4gICAgWydwaWNrYXhlJywgJ3BpY2theGVzJ10sXG4gICAgWydwYXNzZXJieScsICdwYXNzZXJzYnknXVxuICBdLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICByZXR1cm4gcGx1cmFsaXplLmFkZElycmVndWxhclJ1bGUocnVsZVswXSwgcnVsZVsxXSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBQbHVyYWxpemF0aW9uIHJ1bGVzLlxuICAgKi9cbiAgW1xuICAgIFsvcz8kL2ksICdzJ10sXG4gICAgWy9bXlxcdTAwMDAtXFx1MDA3Rl0kL2ksICckMCddLFxuICAgIFsvKFteYWVpb3VdZXNlKSQvaSwgJyQxJ10sXG4gICAgWy8oYXh8dGVzdClpcyQvaSwgJyQxZXMnXSxcbiAgICBbLyhhbGlhc3xbXmFvdV11c3x0W2xtXWFzfGdhc3xyaXMpJC9pLCAnJDFlcyddLFxuICAgIFsvKGVbbW5ddSlzPyQvaSwgJyQxcyddLFxuICAgIFsvKFtebF1pYXN8W2FlaW91XWxhc3xbZWp6cl1hc3xbaXVdYW0pJC9pLCAnJDEnXSxcbiAgICBbLyhhbHVtbnxzeWxsYWJ8dmlyfHJhZGl8bnVjbGV8ZnVuZ3xjYWN0fHN0aW11bHx0ZXJtaW58YmFjaWxsfGZvY3x1dGVyfGxvY3xzdHJhdCkoPzp1c3xpKSQvaSwgJyQxaSddLFxuICAgIFsvKGFsdW1ufGFsZ3x2ZXJ0ZWJyKSg/OmF8YWUpJC9pLCAnJDFhZSddLFxuICAgIFsvKHNlcmFwaHxjaGVydWIpKD86aW0pPyQvaSwgJyQxaW0nXSxcbiAgICBbLyhoZXJ8YXR8Z3IpbyQvaSwgJyQxb2VzJ10sXG4gICAgWy8oYWdlbmR8YWRkZW5kfG1pbGxlbm5pfGRhdHxleHRyZW18YmFjdGVyaXxkZXNpZGVyYXR8c3RyYXR8Y2FuZGVsYWJyfGVycmF0fG92fHN5bXBvc2l8Y3VycmljdWx8YXV0b21hdHxxdW9yKSg/OmF8dW0pJC9pLCAnJDFhJ10sXG4gICAgWy8oYXBoZWxpfGh5cGVyYmF0fHBlcmloZWxpfGFzeW5kZXR8bm91bWVufHBoZW5vbWVufGNyaXRlcml8b3JnYW58cHJvbGVnb21lbnxoZWRyfGF1dG9tYXQpKD86YXxvbikkL2ksICckMWEnXSxcbiAgICBbL3NpcyQvaSwgJ3NlcyddLFxuICAgIFsvKD86KGtuaXx3aXxsaSlmZXwoYXJ8bHxlYXxlb3xvYXxob28pZikkL2ksICckMSQydmVzJ10sXG4gICAgWy8oW15hZWlvdXldfHF1KXkkL2ksICckMWllcyddLFxuICAgIFsvKFteY2hdW2llb11bbG5dKWV5JC9pLCAnJDFpZXMnXSxcbiAgICBbLyh4fGNofHNzfHNofHp6KSQvaSwgJyQxZXMnXSxcbiAgICBbLyhtYXRyfGNvZHxtdXJ8c2lsfHZlcnR8aW5kfGFwcGVuZCkoPzppeHxleCkkL2ksICckMWljZXMnXSxcbiAgICBbL1xcYigoPzp0aXQpP218bCkoPzppY2V8b3VzZSkkL2ksICckMWljZSddLFxuICAgIFsvKHBlKSg/OnJzb258b3BsZSkkL2ksICckMW9wbGUnXSxcbiAgICBbLyhjaGlsZCkoPzpyZW4pPyQvaSwgJyQxcmVuJ10sXG4gICAgWy9lYXV4JC9pLCAnJDAnXSxcbiAgICBbL21bYWVdbiQvaSwgJ21lbiddLFxuICAgIFsndGhvdScsICd5b3UnXVxuICBdLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICByZXR1cm4gcGx1cmFsaXplLmFkZFBsdXJhbFJ1bGUocnVsZVswXSwgcnVsZVsxXSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBTaW5ndWxhcml6YXRpb24gcnVsZXMuXG4gICAqL1xuICBbXG4gICAgWy9zJC9pLCAnJ10sXG4gICAgWy8oc3MpJC9pLCAnJDEnXSxcbiAgICBbLyh3aXxrbml8KD86YWZ0ZXJ8aGFsZnxoaWdofGxvd3xtaWR8bm9ufG5pZ2h0fFteXFx3XXxeKWxpKXZlcyQvaSwgJyQxZmUnXSxcbiAgICBbLyhhcnwoPzp3b3xbYWVdKWx8W2VvXVthb10pdmVzJC9pLCAnJDFmJ10sXG4gICAgWy9pZXMkL2ksICd5J10sXG4gICAgWy9cXGIoW3BsXXx6b21ifCg/Om5lY2t8Y3Jvc3MpP3R8Y29sbHxmYWVyfGZvb2R8Z2VufGdvb258Z3JvdXB8bGFzc3x0YWxrfGdvYWx8Y3V0KWllcyQvaSwgJyQxaWUnXSxcbiAgICBbL1xcYihtb258c21pbClpZXMkL2ksICckMWV5J10sXG4gICAgWy9cXGIoKD86dGl0KT9tfGwpaWNlJC9pLCAnJDFvdXNlJ10sXG4gICAgWy8oc2VyYXBofGNoZXJ1YilpbSQvaSwgJyQxJ10sXG4gICAgWy8oeHxjaHxzc3xzaHx6enx0dG98Z298Y2hvfGFsaWFzfFteYW91XXVzfHRbbG1dYXN8Z2FzfCg/OmhlcnxhdHxncilvfFthZWlvdV1yaXMpKD86ZXMpPyQvaSwgJyQxJ10sXG4gICAgWy8oYW5hbHl8ZGlhZ25vfHBhcmVudGhlfHByb2dub3xzeW5vcHx0aGV8ZW1waGF8Y3JpfG5lKSg/OnNpc3xzZXMpJC9pLCAnJDFzaXMnXSxcbiAgICBbLyhtb3ZpZXx0d2VsdmV8YWJ1c2V8ZVttbl11KXMkL2ksICckMSddLFxuICAgIFsvKHRlc3QpKD86aXN8ZXMpJC9pLCAnJDFpcyddLFxuICAgIFsvKGFsdW1ufHN5bGxhYnx2aXJ8cmFkaXxudWNsZXxmdW5nfGNhY3R8c3RpbXVsfHRlcm1pbnxiYWNpbGx8Zm9jfHV0ZXJ8bG9jfHN0cmF0KSg/OnVzfGkpJC9pLCAnJDF1cyddLFxuICAgIFsvKGFnZW5kfGFkZGVuZHxtaWxsZW5uaXxkYXR8ZXh0cmVtfGJhY3Rlcml8ZGVzaWRlcmF0fHN0cmF0fGNhbmRlbGFicnxlcnJhdHxvdnxzeW1wb3NpfGN1cnJpY3VsfHF1b3IpYSQvaSwgJyQxdW0nXSxcbiAgICBbLyhhcGhlbGl8aHlwZXJiYXR8cGVyaWhlbGl8YXN5bmRldHxub3VtZW58cGhlbm9tZW58Y3JpdGVyaXxvcmdhbnxwcm9sZWdvbWVufGhlZHJ8YXV0b21hdClhJC9pLCAnJDFvbiddLFxuICAgIFsvKGFsdW1ufGFsZ3x2ZXJ0ZWJyKWFlJC9pLCAnJDFhJ10sXG4gICAgWy8oY29kfG11cnxzaWx8dmVydHxpbmQpaWNlcyQvaSwgJyQxZXgnXSxcbiAgICBbLyhtYXRyfGFwcGVuZClpY2VzJC9pLCAnJDFpeCddLFxuICAgIFsvKHBlKShyc29ufG9wbGUpJC9pLCAnJDFyc29uJ10sXG4gICAgWy8oY2hpbGQpcmVuJC9pLCAnJDEnXSxcbiAgICBbLyhlYXUpeD8kL2ksICckMSddLFxuICAgIFsvbWVuJC9pLCAnbWFuJ11cbiAgXS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgcmV0dXJuIHBsdXJhbGl6ZS5hZGRTaW5ndWxhclJ1bGUocnVsZVswXSwgcnVsZVsxXSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBVbmNvdW50YWJsZSBydWxlcy5cbiAgICovXG4gIFtcbiAgICAvLyBTaW5ndWxhciB3b3JkcyB3aXRoIG5vIHBsdXJhbHMuXG4gICAgJ2FkdWx0aG9vZCcsXG4gICAgJ2FkdmljZScsXG4gICAgJ2FnZW5kYScsXG4gICAgJ2FpZCcsXG4gICAgJ2FpcmNyYWZ0JyxcbiAgICAnYWxjb2hvbCcsXG4gICAgJ2FtbW8nLFxuICAgICdhbmFseXRpY3MnLFxuICAgICdhbmltZScsXG4gICAgJ2F0aGxldGljcycsXG4gICAgJ2F1ZGlvJyxcbiAgICAnYmlzb24nLFxuICAgICdibG9vZCcsXG4gICAgJ2JyZWFtJyxcbiAgICAnYnVmZmFsbycsXG4gICAgJ2J1dHRlcicsXG4gICAgJ2NhcnAnLFxuICAgICdjYXNoJyxcbiAgICAnY2hhc3NpcycsXG4gICAgJ2NoZXNzJyxcbiAgICAnY2xvdGhpbmcnLFxuICAgICdjb2QnLFxuICAgICdjb21tZXJjZScsXG4gICAgJ2Nvb3BlcmF0aW9uJyxcbiAgICAnY29ycHMnLFxuICAgICdkZWJyaXMnLFxuICAgICdkaWFiZXRlcycsXG4gICAgJ2RpZ2VzdGlvbicsXG4gICAgJ2VsaycsXG4gICAgJ2VuZXJneScsXG4gICAgJ2VxdWlwbWVudCcsXG4gICAgJ2V4Y3JldGlvbicsXG4gICAgJ2V4cGVydGlzZScsXG4gICAgJ2Zpcm13YXJlJyxcbiAgICAnZmxvdW5kZXInLFxuICAgICdmdW4nLFxuICAgICdnYWxsb3dzJyxcbiAgICAnZ2FyYmFnZScsXG4gICAgJ2dyYWZmaXRpJyxcbiAgICAnaGFyZHdhcmUnLFxuICAgICdoZWFkcXVhcnRlcnMnLFxuICAgICdoZWFsdGgnLFxuICAgICdoZXJwZXMnLFxuICAgICdoaWdoamlua3MnLFxuICAgICdob21ld29yaycsXG4gICAgJ2hvdXNld29yaycsXG4gICAgJ2luZm9ybWF0aW9uJyxcbiAgICAnamVhbnMnLFxuICAgICdqdXN0aWNlJyxcbiAgICAna3Vkb3MnLFxuICAgICdsYWJvdXInLFxuICAgICdsaXRlcmF0dXJlJyxcbiAgICAnbWFjaGluZXJ5JyxcbiAgICAnbWFja2VyZWwnLFxuICAgICdtYWlsJyxcbiAgICAnbWVkaWEnLFxuICAgICdtZXdzJyxcbiAgICAnbW9vc2UnLFxuICAgICdtdXNpYycsXG4gICAgJ211ZCcsXG4gICAgJ21hbmdhJyxcbiAgICAnbmV3cycsXG4gICAgJ29ubHknLFxuICAgICdwZXJzb25uZWwnLFxuICAgICdwaWtlJyxcbiAgICAncGxhbmt0b24nLFxuICAgICdwbGllcnMnLFxuICAgICdwb2xpY2UnLFxuICAgICdwb2xsdXRpb24nLFxuICAgICdwcmVtaXNlcycsXG4gICAgJ3JhaW4nLFxuICAgICdyZXNlYXJjaCcsXG4gICAgJ3JpY2UnLFxuICAgICdzYWxtb24nLFxuICAgICdzY2lzc29ycycsXG4gICAgJ3NlcmllcycsXG4gICAgJ3Nld2FnZScsXG4gICAgJ3NoYW1ibGVzJyxcbiAgICAnc2hyaW1wJyxcbiAgICAnc29mdHdhcmUnLFxuICAgICdzcGVjaWVzJyxcbiAgICAnc3RhZmYnLFxuICAgICdzd2luZScsXG4gICAgJ3Rlbm5pcycsXG4gICAgJ3RyYWZmaWMnLFxuICAgICd0cmFuc3BvcnRhdGlvbicsXG4gICAgJ3Ryb3V0JyxcbiAgICAndHVuYScsXG4gICAgJ3dlYWx0aCcsXG4gICAgJ3dlbGZhcmUnLFxuICAgICd3aGl0aW5nJyxcbiAgICAnd2lsZGViZWVzdCcsXG4gICAgJ3dpbGRsaWZlJyxcbiAgICAneW91JyxcbiAgICAvcG9rW2XDqV1tb24kL2ksXG4gICAgLy8gUmVnZXhlcy5cbiAgICAvW15hZWlvdV1lc2UkL2ksIC8vIFwiY2hpbmVzZVwiLCBcImphcGFuZXNlXCJcbiAgICAvZGVlciQvaSwgLy8gXCJkZWVyXCIsIFwicmVpbmRlZXJcIlxuICAgIC9maXNoJC9pLCAvLyBcImZpc2hcIiwgXCJibG93ZmlzaFwiLCBcImFuZ2VsZmlzaFwiXG4gICAgL21lYXNsZXMkL2ksXG4gICAgL29baXVdcyQvaSwgLy8gXCJjYXJuaXZvcm91c1wiXG4gICAgL3BveCQvaSwgLy8gXCJjaGlja3BveFwiLCBcInNtYWxscG94XCJcbiAgICAvc2hlZXAkL2lcbiAgXS5mb3JFYWNoKHBsdXJhbGl6ZS5hZGRVbmNvdW50YWJsZVJ1bGUpO1xuXG4gIHJldHVybiBwbHVyYWxpemU7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIExFQUZfS0VZLCBoYXNXZWFrTWFwO1xuXG4vKipcbiAqIEFyYml0cmFyeSB2YWx1ZSB1c2VkIGFzIGtleSBmb3IgcmVmZXJlbmNpbmcgY2FjaGUgb2JqZWN0IGluIFdlYWtNYXAgdHJlZS5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5MRUFGX0tFWSA9IHt9O1xuXG4vKipcbiAqIFdoZXRoZXIgZW52aXJvbm1lbnQgc3VwcG9ydHMgV2Vha01hcC5cbiAqXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqL1xuaGFzV2Vha01hcCA9IHR5cGVvZiBXZWFrTWFwICE9PSAndW5kZWZpbmVkJztcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBhcyB0aGUgc29sZSBlbnRyeSBpbiBhbiBhcnJheS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHJldHVybi5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0gVmFsdWUgcmV0dXJuZWQgYXMgZW50cnkgaW4gYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5T2YoIHZhbHVlICkge1xuXHRyZXR1cm4gWyB2YWx1ZSBdO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG9iamVjdC1saWtlLCBvciBmYWxzZSBvdGhlcndpc2UuIEEgdmFsdWVcbiAqIGlzIG9iamVjdC1saWtlIGlmIGl0IGNhbiBzdXBwb3J0IHByb3BlcnR5IGFzc2lnbm1lbnQsIGUuZy4gb2JqZWN0IG9yIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gdGVzdC5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIHZhbHVlIGlzIG9iamVjdC1saWtlLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UoIHZhbHVlICkge1xuXHRyZXR1cm4gISEgdmFsdWUgJiYgJ29iamVjdCcgPT09IHR5cGVvZiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgbmV3IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IENhY2hlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2FjaGUoKSB7XG5cdHZhciBjYWNoZSA9IHtcblx0XHRjbGVhcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRjYWNoZS5oZWFkID0gbnVsbDtcblx0XHR9LFxuXHR9O1xuXG5cdHJldHVybiBjYWNoZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgZW50cmllcyB3aXRoaW4gdGhlIHR3byBhcnJheXMgYXJlIHN0cmljdGx5IGVxdWFsIGJ5XG4gKiByZWZlcmVuY2UgZnJvbSBhIHN0YXJ0aW5nIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9ICBhICAgICAgICAgRmlyc3QgYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5fSAgYiAgICAgICAgIFNlY29uZCBhcnJheS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggSW5kZXggZnJvbSB3aGljaCB0byBzdGFydCBjb21wYXJpc29uLlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgYXJyYXlzIGFyZSBzaGFsbG93bHkgZXF1YWwuXG4gKi9cbmZ1bmN0aW9uIGlzU2hhbGxvd0VxdWFsKCBhLCBiLCBmcm9tSW5kZXggKSB7XG5cdHZhciBpO1xuXG5cdGlmICggYS5sZW5ndGggIT09IGIubGVuZ3RoICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGZvciAoIGkgPSBmcm9tSW5kZXg7IGkgPCBhLmxlbmd0aDsgaSsrICkge1xuXHRcdGlmICggYVsgaSBdICE9PSBiWyBpIF0gKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIG1lbW9pemVkIHNlbGVjdG9yIGZ1bmN0aW9uLiBUaGUgZ2V0RGVwZW5kYW50cyBmdW5jdGlvbiBhcmd1bWVudCBpc1xuICogY2FsbGVkIGJlZm9yZSB0aGUgbWVtb2l6ZWQgc2VsZWN0b3IgYW5kIGlzIGV4cGVjdGVkIHRvIHJldHVybiBhbiBpbW11dGFibGVcbiAqIHJlZmVyZW5jZSBvciBhcnJheSBvZiByZWZlcmVuY2VzIG9uIHdoaWNoIHRoZSBzZWxlY3RvciBkZXBlbmRzIGZvciBjb21wdXRpbmdcbiAqIGl0cyBvd24gcmV0dXJuIHZhbHVlLiBUaGUgbWVtb2l6ZSBjYWNoZSBpcyBwcmVzZXJ2ZWQgb25seSBhcyBsb25nIGFzIHRob3NlXG4gKiBkZXBlbmRhbnQgcmVmZXJlbmNlcyByZW1haW4gdGhlIHNhbWUuIElmIGdldERlcGVuZGFudHMgcmV0dXJucyBhIGRpZmZlcmVudFxuICogcmVmZXJlbmNlKHMpLCB0aGUgY2FjaGUgaXMgY2xlYXJlZCBhbmQgdGhlIHNlbGVjdG9yIHZhbHVlIHJlZ2VuZXJhdGVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNlbGVjdG9yICAgICAgU2VsZWN0b3IgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBnZXREZXBlbmRhbnRzIERlcGVuZGFudCBnZXR0ZXIgcmV0dXJuaW5nIGFuIGltbXV0YWJsZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2Ugb3IgYXJyYXkgb2YgcmVmZXJlbmNlIHVzZWQgaW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGUgYnVzdCBjb25zaWRlcmF0aW9uLlxuICpcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBNZW1vaXplZCBzZWxlY3Rvci5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oIHNlbGVjdG9yLCBnZXREZXBlbmRhbnRzICkge1xuXHR2YXIgcm9vdENhY2hlLCBnZXRDYWNoZTtcblxuXHQvLyBVc2Ugb2JqZWN0IHNvdXJjZSBhcyBkZXBlbmRhbnQgaWYgZ2V0dGVyIG5vdCBwcm92aWRlZFxuXHRpZiAoICEgZ2V0RGVwZW5kYW50cyApIHtcblx0XHRnZXREZXBlbmRhbnRzID0gYXJyYXlPZjtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSByb290IGNhY2hlLiBJZiBXZWFrTWFwIGlzIHN1cHBvcnRlZCwgdGhpcyBpcyBhc3NpZ25lZCB0byB0aGVcblx0ICogcm9vdCBXZWFrTWFwIGNhY2hlIHNldCwgb3RoZXJ3aXNlIGl0IGlzIGEgc2hhcmVkIGluc3RhbmNlIG9mIHRoZSBkZWZhdWx0XG5cdCAqIGNhY2hlIG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiB7KFdlYWtNYXB8T2JqZWN0KX0gUm9vdCBjYWNoZSBvYmplY3QuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSb290Q2FjaGUoKSB7XG5cdFx0cmV0dXJuIHJvb3RDYWNoZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBjYWNoZSBmb3IgYSBnaXZlbiBkZXBlbmRhbnRzIGFycmF5LiBXaGVuIHBvc3NpYmxlLCBhIFdlYWtNYXBcblx0ICogd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZSBhIHVuaXF1ZSBjYWNoZSBmb3IgZWFjaCBzZXQgb2YgZGVwZW5kYW50cy4gVGhpc1xuXHQgKiBpcyBmZWFzaWJsZSBkdWUgdG8gdGhlIG5hdHVyZSBvZiBXZWFrTWFwIGluIGFsbG93aW5nIGdhcmJhZ2UgY29sbGVjdGlvblxuXHQgKiB0byBvY2N1ciBvbiBlbnRyaWVzIHdoZXJlIHRoZSBrZXkgb2JqZWN0IGlzIG5vIGxvbmdlciByZWZlcmVuY2VkLiBTaW5jZVxuXHQgKiBXZWFrTWFwIHJlcXVpcmVzIHRoZSBrZXkgdG8gYmUgYW4gb2JqZWN0LCB0aGlzIGlzIG9ubHkgcG9zc2libGUgd2hlbiB0aGVcblx0ICogZGVwZW5kYW50IGlzIG9iamVjdC1saWtlLiBUaGUgcm9vdCBjYWNoZSBpcyBjcmVhdGVkIGFzIGEgaGllcmFyY2h5IHdoZXJlXG5cdCAqIGVhY2ggdG9wLWxldmVsIGtleSBpcyB0aGUgZmlyc3QgZW50cnkgaW4gYSBkZXBlbmRhbnRzIHNldCwgdGhlIHZhbHVlIGFcblx0ICogV2Vha01hcCB3aGVyZSBlYWNoIGtleSBpcyB0aGUgbmV4dCBkZXBlbmRhbnQsIGFuZCBzbyBvbi4gVGhpcyBjb250aW51ZXNcblx0ICogc28gbG9uZyBhcyB0aGUgZGVwZW5kYW50cyBhcmUgb2JqZWN0LWxpa2UuIElmIG5vIGRlcGVuZGFudHMgYXJlIG9iamVjdC1cblx0ICogbGlrZSwgdGhlbiB0aGUgY2FjaGUgaXMgc2hhcmVkIGFjcm9zcyBhbGwgaW52b2NhdGlvbnMuXG5cdCAqXG5cdCAqIEBzZWUgaXNPYmplY3RMaWtlXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGRlcGVuZGFudHMgU2VsZWN0b3IgZGVwZW5kYW50cy5cblx0ICpcblx0ICogQHJldHVybiB7T2JqZWN0fSBDYWNoZSBvYmplY3QuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRXZWFrTWFwQ2FjaGUoIGRlcGVuZGFudHMgKSB7XG5cdFx0dmFyIGNhY2hlcyA9IHJvb3RDYWNoZSxcblx0XHRcdGlzVW5pcXVlQnlEZXBlbmRhbnRzID0gdHJ1ZSxcblx0XHRcdGksIGRlcGVuZGFudCwgbWFwLCBjYWNoZTtcblxuXHRcdGZvciAoIGkgPSAwOyBpIDwgZGVwZW5kYW50cy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdGRlcGVuZGFudCA9IGRlcGVuZGFudHNbIGkgXTtcblxuXHRcdFx0Ly8gQ2FuIG9ubHkgY29tcG9zZSBXZWFrTWFwIGZyb20gb2JqZWN0LWxpa2Uga2V5LlxuXHRcdFx0aWYgKCAhIGlzT2JqZWN0TGlrZSggZGVwZW5kYW50ICkgKSB7XG5cdFx0XHRcdGlzVW5pcXVlQnlEZXBlbmRhbnRzID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBEb2VzIGN1cnJlbnQgc2VnbWVudCBvZiBjYWNoZSBhbHJlYWR5IGhhdmUgYSBXZWFrTWFwP1xuXHRcdFx0aWYgKCBjYWNoZXMuaGFzKCBkZXBlbmRhbnQgKSApIHtcblx0XHRcdFx0Ly8gVHJhdmVyc2UgaW50byBuZXN0ZWQgV2Vha01hcC5cblx0XHRcdFx0Y2FjaGVzID0gY2FjaGVzLmdldCggZGVwZW5kYW50ICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBDcmVhdGUsIHNldCwgYW5kIHRyYXZlcnNlIGludG8gYSBuZXcgb25lLlxuXHRcdFx0XHRtYXAgPSBuZXcgV2Vha01hcCgpO1xuXHRcdFx0XHRjYWNoZXMuc2V0KCBkZXBlbmRhbnQsIG1hcCApO1xuXHRcdFx0XHRjYWNoZXMgPSBtYXA7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gV2UgdXNlIGFuIGFyYml0cmFyeSAoYnV0IGNvbnNpc3RlbnQpIG9iamVjdCBhcyBrZXkgZm9yIHRoZSBsYXN0IGl0ZW1cblx0XHQvLyBpbiB0aGUgV2Vha01hcCB0byBzZXJ2ZSBhcyBvdXIgcnVubmluZyBjYWNoZS5cblx0XHRpZiAoICEgY2FjaGVzLmhhcyggTEVBRl9LRVkgKSApIHtcblx0XHRcdGNhY2hlID0gY3JlYXRlQ2FjaGUoKTtcblx0XHRcdGNhY2hlLmlzVW5pcXVlQnlEZXBlbmRhbnRzID0gaXNVbmlxdWVCeURlcGVuZGFudHM7XG5cdFx0XHRjYWNoZXMuc2V0KCBMRUFGX0tFWSwgY2FjaGUgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY2FjaGVzLmdldCggTEVBRl9LRVkgKTtcblx0fVxuXG5cdC8vIEFzc2lnbiBjYWNoZSBoYW5kbGVyIGJ5IGF2YWlsYWJpbGl0eSBvZiBXZWFrTWFwXG5cdGdldENhY2hlID0gaGFzV2Vha01hcCA/IGdldFdlYWtNYXBDYWNoZSA6IGdldFJvb3RDYWNoZTtcblxuXHQvKipcblx0ICogUmVzZXRzIHJvb3QgbWVtb2l6YXRpb24gY2FjaGUuXG5cdCAqL1xuXHRmdW5jdGlvbiBjbGVhcigpIHtcblx0XHRyb290Q2FjaGUgPSBoYXNXZWFrTWFwID8gbmV3IFdlYWtNYXAoKSA6IGNyZWF0ZUNhY2hlKCk7XG5cdH1cblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganNkb2MvY2hlY2stcGFyYW0tbmFtZXNcblx0LyoqXG5cdCAqIFRoZSBhdWdtZW50ZWQgc2VsZWN0b3IgY2FsbCwgY29uc2lkZXJpbmcgZmlyc3Qgd2hldGhlciBkZXBlbmRhbnRzIGhhdmVcblx0ICogY2hhbmdlZCBiZWZvcmUgcGFzc2luZyBpdCB0byB1bmRlcmx5aW5nIG1lbW9pemUgZnVuY3Rpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgICAgU291cmNlIG9iamVjdCBmb3IgZGVyaXZhdGlvbi5cblx0ICogQHBhcmFtIHsuLi4qfSAgIGV4dHJhQXJncyBBZGRpdGlvbmFsIGFyZ3VtZW50cyB0byBwYXNzIHRvIHNlbGVjdG9yLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHsqfSBTZWxlY3RvciByZXN1bHQuXG5cdCAqL1xuXHRmdW5jdGlvbiBjYWxsU2VsZWN0b3IoIC8qIHNvdXJjZSwgLi4uZXh0cmFBcmdzICovICkge1xuXHRcdHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdFx0Y2FjaGUsIG5vZGUsIGksIGFyZ3MsIGRlcGVuZGFudHM7XG5cblx0XHQvLyBDcmVhdGUgY29weSBvZiBhcmd1bWVudHMgKGF2b2lkIGxlYWtpbmcgZGVvcHRpbWl6YXRpb24pLlxuXHRcdGFyZ3MgPSBuZXcgQXJyYXkoIGxlbiApO1xuXHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRhcmdzWyBpIF0gPSBhcmd1bWVudHNbIGkgXTtcblx0XHR9XG5cblx0XHRkZXBlbmRhbnRzID0gZ2V0RGVwZW5kYW50cy5hcHBseSggbnVsbCwgYXJncyApO1xuXHRcdGNhY2hlID0gZ2V0Q2FjaGUoIGRlcGVuZGFudHMgKTtcblxuXHRcdC8vIElmIG5vdCBndWFyYW50ZWVkIHVuaXF1ZW5lc3MgYnkgZGVwZW5kYW50cyAocHJpbWl0aXZlIHR5cGUgb3IgbGFja1xuXHRcdC8vIG9mIFdlYWtNYXAgc3VwcG9ydCksIHNoYWxsb3cgY29tcGFyZSBhZ2FpbnN0IGxhc3QgZGVwZW5kYW50cyBhbmQsIGlmXG5cdFx0Ly8gcmVmZXJlbmNlcyBoYXZlIGNoYW5nZWQsIGRlc3Ryb3kgY2FjaGUgdG8gcmVjYWxjdWxhdGUgcmVzdWx0LlxuXHRcdGlmICggISBjYWNoZS5pc1VuaXF1ZUJ5RGVwZW5kYW50cyApIHtcblx0XHRcdGlmICggY2FjaGUubGFzdERlcGVuZGFudHMgJiYgISBpc1NoYWxsb3dFcXVhbCggZGVwZW5kYW50cywgY2FjaGUubGFzdERlcGVuZGFudHMsIDAgKSApIHtcblx0XHRcdFx0Y2FjaGUuY2xlYXIoKTtcblx0XHRcdH1cblxuXHRcdFx0Y2FjaGUubGFzdERlcGVuZGFudHMgPSBkZXBlbmRhbnRzO1xuXHRcdH1cblxuXHRcdG5vZGUgPSBjYWNoZS5oZWFkO1xuXHRcdHdoaWxlICggbm9kZSApIHtcblx0XHRcdC8vIENoZWNrIHdoZXRoZXIgbm9kZSBhcmd1bWVudHMgbWF0Y2ggYXJndW1lbnRzXG5cdFx0XHRpZiAoICEgaXNTaGFsbG93RXF1YWwoIG5vZGUuYXJncywgYXJncywgMSApICkge1xuXHRcdFx0XHRub2RlID0gbm9kZS5uZXh0O1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCB3ZSBjYW4gYXNzdW1lIHdlJ3ZlIGZvdW5kIGEgbWF0Y2hcblxuXHRcdFx0Ly8gU3VyZmFjZSBtYXRjaGVkIG5vZGUgdG8gaGVhZCBpZiBub3QgYWxyZWFkeVxuXHRcdFx0aWYgKCBub2RlICE9PSBjYWNoZS5oZWFkICkge1xuXHRcdFx0XHQvLyBBZGp1c3Qgc2libGluZ3MgdG8gcG9pbnQgdG8gZWFjaCBvdGhlci5cblx0XHRcdFx0bm9kZS5wcmV2Lm5leHQgPSBub2RlLm5leHQ7XG5cdFx0XHRcdGlmICggbm9kZS5uZXh0ICkge1xuXHRcdFx0XHRcdG5vZGUubmV4dC5wcmV2ID0gbm9kZS5wcmV2O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bm9kZS5uZXh0ID0gY2FjaGUuaGVhZDtcblx0XHRcdFx0bm9kZS5wcmV2ID0gbnVsbDtcblx0XHRcdFx0Y2FjaGUuaGVhZC5wcmV2ID0gbm9kZTtcblx0XHRcdFx0Y2FjaGUuaGVhZCA9IG5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJldHVybiBpbW1lZGlhdGVseVxuXHRcdFx0cmV0dXJuIG5vZGUudmFsO1xuXHRcdH1cblxuXHRcdC8vIE5vIGNhY2hlZCB2YWx1ZSBmb3VuZC4gQ29udGludWUgdG8gaW5zZXJ0aW9uIHBoYXNlOlxuXG5cdFx0bm9kZSA9IHtcblx0XHRcdC8vIEdlbmVyYXRlIHRoZSByZXN1bHQgZnJvbSBvcmlnaW5hbCBmdW5jdGlvblxuXHRcdFx0dmFsOiBzZWxlY3Rvci5hcHBseSggbnVsbCwgYXJncyApLFxuXHRcdH07XG5cblx0XHQvLyBBdm9pZCBpbmNsdWRpbmcgdGhlIHNvdXJjZSBvYmplY3QgaW4gdGhlIGNhY2hlLlxuXHRcdGFyZ3NbIDAgXSA9IG51bGw7XG5cdFx0bm9kZS5hcmdzID0gYXJncztcblxuXHRcdC8vIERvbid0IG5lZWQgdG8gY2hlY2sgd2hldGhlciBub2RlIGlzIGFscmVhZHkgaGVhZCwgc2luY2UgaXQgd291bGRcblx0XHQvLyBoYXZlIGJlZW4gcmV0dXJuZWQgYWJvdmUgYWxyZWFkeSBpZiBpdCB3YXNcblxuXHRcdC8vIFNoaWZ0IGV4aXN0aW5nIGhlYWQgZG93biBsaXN0XG5cdFx0aWYgKCBjYWNoZS5oZWFkICkge1xuXHRcdFx0Y2FjaGUuaGVhZC5wcmV2ID0gbm9kZTtcblx0XHRcdG5vZGUubmV4dCA9IGNhY2hlLmhlYWQ7XG5cdFx0fVxuXG5cdFx0Y2FjaGUuaGVhZCA9IG5vZGU7XG5cblx0XHRyZXR1cm4gbm9kZS52YWw7XG5cdH1cblxuXHRjYWxsU2VsZWN0b3IuZ2V0RGVwZW5kYW50cyA9IGdldERlcGVuZGFudHM7XG5cdGNhbGxTZWxlY3Rvci5jbGVhciA9IGNsZWFyO1xuXHRjbGVhcigpO1xuXG5cdHJldHVybiBjYWxsU2VsZWN0b3I7XG59XG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcInJlZ2VuZXJhdG9yUnVudGltZVwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJoZWxwZXJzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcIm1vZGVsXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcInZhbGlkYXRvcnNcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJ3cFwiXVtcImFwaUZldGNoXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJkYXRhXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJpc1NoYWxsb3dFcXVhbFwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImxvZGFzaFwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9
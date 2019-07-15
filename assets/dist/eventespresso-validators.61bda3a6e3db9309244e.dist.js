this["eejs"] = this["eejs"] || {}; this["eejs"]["validators"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/eejs/validators/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/eejs/validators/index.js":
/*!*********************************************!*\
  !*** ./assets/src/eejs/validators/index.js ***!
  \*********************************************/
/*! exports provided: isGenerator, isModelEntityFactory, isModelEntityFactoryOfModel, isModelEntity, isModelEntityOfModel, isSchemaResponse, isSchema, isSchemaResponseOfModel, isSchemaOfModel, instanceOf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _is_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-generator */ "./assets/src/eejs/validators/is-generator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isGenerator", function() { return _is_generator__WEBPACK_IMPORTED_MODULE_0__["isGenerator"]; });

/* harmony import */ var _is_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-factory */ "./assets/src/eejs/validators/is-factory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isModelEntityFactory", function() { return _is_factory__WEBPACK_IMPORTED_MODULE_1__["isModelEntityFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isModelEntityFactoryOfModel", function() { return _is_factory__WEBPACK_IMPORTED_MODULE_1__["isModelEntityFactoryOfModel"]; });

/* harmony import */ var _is_model_entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-model-entity */ "./assets/src/eejs/validators/is-model-entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isModelEntity", function() { return _is_model_entity__WEBPACK_IMPORTED_MODULE_2__["isModelEntity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isModelEntityOfModel", function() { return _is_model_entity__WEBPACK_IMPORTED_MODULE_2__["isModelEntityOfModel"]; });

/* harmony import */ var _is_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./is-schema */ "./assets/src/eejs/validators/is-schema.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSchemaResponse", function() { return _is_schema__WEBPACK_IMPORTED_MODULE_3__["isSchemaResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSchema", function() { return _is_schema__WEBPACK_IMPORTED_MODULE_3__["isSchema"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSchemaResponseOfModel", function() { return _is_schema__WEBPACK_IMPORTED_MODULE_3__["isSchemaResponseOfModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSchemaOfModel", function() { return _is_schema__WEBPACK_IMPORTED_MODULE_3__["isSchemaOfModel"]; });

/* harmony import */ var _instance_of__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instance-of */ "./assets/src/eejs/validators/instance-of.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "instanceOf", function() { return _instance_of__WEBPACK_IMPORTED_MODULE_4__["instanceOf"]; });







/***/ }),

/***/ "./assets/src/eejs/validators/instance-of.js":
/*!***************************************************!*\
  !*** ./assets/src/eejs/validators/instance-of.js ***!
  \***************************************************/
/*! exports provided: instanceOf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "instanceOf", function() { return instanceOf; });
/**
 * Helper method for determining whether the given object instance is an
 * instance of the given expected class/function name.  This is a more reliable
 * method for doing instanceof checks than an `instanceof` expression.
 *
 * @param {Object} objectInstance
 * @param {string} expectedName
 * @return {boolean} True means the object is an instance of expectedName.
 */
function instanceOf(objectInstance, expectedName) {
  if (!objectInstance || !objectInstance.constructor || !objectInstance.constructor.name) {
    return false;
  }

  return objectInstance.constructor.name === expectedName;
}

/***/ }),

/***/ "./assets/src/eejs/validators/is-factory.js":
/*!**************************************************!*\
  !*** ./assets/src/eejs/validators/is-factory.js ***!
  \**************************************************/
/*! exports provided: isModelEntityFactory, isModelEntityFactoryOfModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isModelEntityFactory", function() { return isModelEntityFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isModelEntityFactoryOfModel", function() { return isModelEntityFactoryOfModel; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

/**
 * Utility for checking whether the given value represents a
 * ModelEntityFactory object.
 *
 * @param {Object} factory
 * @return {boolean} true means the object is a ModelEntityFactory
 */

var isModelEntityFactory = function isModelEntityFactory(factory) {
  return !!factory && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(factory.classDef) && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(factory.modelName) && Object.getPrototypeOf(factory.classDef).name === 'BaseEntity';
};
/**
 * Utility for checking whether the given value represents a ModelEntityFactory
 * for a specific model.
 *
 * Note: modelName is expected to be the lowercase, snakecase string for the
 * model.  Eg. 'event', or 'message_template'.
 *
 * @param {Object} factory
 * @param {string} modelName
 * @return {boolean} True means the given factory
 */

var isModelEntityFactoryOfModel = function isModelEntityFactoryOfModel(factory, modelName) {
  return isModelEntityFactory(factory) && factory.modelName === modelName;
};

/***/ }),

/***/ "./assets/src/eejs/validators/is-generator.js":
/*!****************************************************!*\
  !*** ./assets/src/eejs/validators/is-generator.js ***!
  \****************************************************/
/*! exports provided: isGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGenerator", function() { return isGenerator; });
/**
 * Tests for whether the provide value is a generator or not.
 *
 * Note: Generators are different than GeneratorFunctions!
 * This is a Generator:  function* (){}(); (an invoked GeneratorFunction)
 * this is a GeneratorFunction: function* (){}
 *
 * @param {*} object
 * @return {boolean} True if the provided value is a generator.
 */
var isGenerator = function isGenerator(object) {
  return !!object && object[Symbol.toStringTag] === 'Generator';
};

/***/ }),

/***/ "./assets/src/eejs/validators/is-model-entity.js":
/*!*******************************************************!*\
  !*** ./assets/src/eejs/validators/is-model-entity.js ***!
  \*******************************************************/
/*! exports provided: isModelEntity, isModelEntityOfModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isModelEntity", function() { return isModelEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isModelEntityOfModel", function() { return isModelEntityOfModel; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

/**
 * Returns whether the given value is a model entity.
 *
 * @param {Object} entity
 * @return {boolean} True means it is a model entity.
 */

var isModelEntity = function isModelEntity(entity) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isObject"])(entity) && Object.getPrototypeOf(entity.constructor).name === 'BaseEntity';
};
/**
 * Returns whether the given value is a model entity for the given model type.
 *
 * @param {Object} entity
 * @param {string} modelName
 * @return {boolean} True means it is a model entity for the given model.
 */

var isModelEntityOfModel = function isModelEntityOfModel(entity, modelName) {
  modelName = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["upperFirst"])(Object(lodash__WEBPACK_IMPORTED_MODULE_0__["camelCase"])(modelName));
  return isModelEntity(entity) && entity.constructor.name === modelName;
};

/***/ }),

/***/ "./assets/src/eejs/validators/is-schema.js":
/*!*************************************************!*\
  !*** ./assets/src/eejs/validators/is-schema.js ***!
  \*************************************************/
/*! exports provided: isSchemaResponse, isSchema, isSchemaResponseOfModel, isSchemaOfModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSchemaResponse", function() { return isSchemaResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSchema", function() { return isSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSchemaResponseOfModel", function() { return isSchemaResponseOfModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSchemaOfModel", function() { return isSchemaOfModel; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External imports
 */

/**
 * Returns whether the given value is a schema response object from a schema
 * request.
 *
 * @param {Object} response
 * @return {boolean} true if this is a schema response object.
 */

var isSchemaResponse = function isSchemaResponse(response) {
  return hasSchemaProperty(response) && isSchema(response.schema);
};
/**
 * Returns whether the given value is a schema object.
 *
 * @param {Object} schema
 * @return {boolean} true if this is a schema object.
 */

var isSchema = function isSchema(schema) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(schema) && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema.$schema) && Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(schema.properties);
};
/**
 * Returns whether the given value is a schema response object for the given
 * model name
 *
 * @param {Object} response
 * @param {string} modelName
 * @return {boolean}  True means this is a schema response object for the given
 * model name.
 */

var isSchemaResponseOfModel = function isSchemaResponseOfModel(response, modelName) {
  return hasSchemaProperty(response) && isSchemaOfModel(response.schema, modelName);
};
/**
 * Returns whether the given value is a schema object for the given model name.
 *
 * @param {Object} schema
 * @param {string} modelName
 * @return {boolean} True means this is a schema object for the given model
 * name.
 */

var isSchemaOfModel = function isSchemaOfModel(schema, modelName) {
  return isSchema(schema) && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(schema.title) && Object(lodash__WEBPACK_IMPORTED_MODULE_0__["lowerCase"])(modelName) === Object(lodash__WEBPACK_IMPORTED_MODULE_0__["lowerCase"])(schema.title);
};
/**
 * Returns whether the given value is an object with a schema property
 *
 * @param {*} object
 * @return {boolean}  True if a plain object with a schema property
 */

var hasSchemaProperty = function hasSchemaProperty(object) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(object) && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(object.schema);
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLnZhbGlkYXRvcnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWVqcy52YWxpZGF0b3JzLy4vYXNzZXRzL3NyYy9lZWpzL3ZhbGlkYXRvcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWxpZGF0b3JzLy4vYXNzZXRzL3NyYy9lZWpzL3ZhbGlkYXRvcnMvaW5zdGFuY2Utb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWxpZGF0b3JzLy4vYXNzZXRzL3NyYy9lZWpzL3ZhbGlkYXRvcnMvaXMtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbGlkYXRvcnMvLi9hc3NldHMvc3JjL2VlanMvdmFsaWRhdG9ycy9pcy1nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vZWVqcy52YWxpZGF0b3JzLy4vYXNzZXRzL3NyYy9lZWpzL3ZhbGlkYXRvcnMvaXMtbW9kZWwtZW50aXR5LmpzIiwid2VicGFjazovL2VlanMudmFsaWRhdG9ycy8uL2Fzc2V0cy9zcmMvZWVqcy92YWxpZGF0b3JzL2lzLXNjaGVtYS5qcyIsIndlYnBhY2s6Ly9lZWpzLnZhbGlkYXRvcnMvZXh0ZXJuYWwge1widGhpc1wiOlwibG9kYXNoXCJ9Il0sIm5hbWVzIjpbImluc3RhbmNlT2YiLCJvYmplY3RJbnN0YW5jZSIsImV4cGVjdGVkTmFtZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImlzTW9kZWxFbnRpdHlGYWN0b3J5IiwiZmFjdG9yeSIsImlzVW5kZWZpbmVkIiwiY2xhc3NEZWYiLCJtb2RlbE5hbWUiLCJPYmplY3QiLCJnZXRQcm90b3R5cGVPZiIsImlzTW9kZWxFbnRpdHlGYWN0b3J5T2ZNb2RlbCIsImlzR2VuZXJhdG9yIiwib2JqZWN0IiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJpc01vZGVsRW50aXR5IiwiZW50aXR5IiwiaXNPYmplY3QiLCJpc01vZGVsRW50aXR5T2ZNb2RlbCIsInVwcGVyRmlyc3QiLCJjYW1lbENhc2UiLCJpc1NjaGVtYVJlc3BvbnNlIiwicmVzcG9uc2UiLCJoYXNTY2hlbWFQcm9wZXJ0eSIsImlzU2NoZW1hIiwic2NoZW1hIiwiaXNQbGFpbk9iamVjdCIsIiRzY2hlbWEiLCJwcm9wZXJ0aWVzIiwiaXNTY2hlbWFSZXNwb25zZU9mTW9kZWwiLCJpc1NjaGVtYU9mTW9kZWwiLCJ0aXRsZSIsImxvd2VyQ2FzZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDSEE7QUFBQTtBQUFBOzs7Ozs7Ozs7QUFTTyxTQUFTQSxVQUFULENBQXFCQyxjQUFyQixFQUFxQ0MsWUFBckMsRUFBb0Q7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QUVSLFFBQVEsQ0FBQ0csTUFBWCxFQUFtQmxCLFNBQW5CLENBRmhCO0FBSUEsQ0FMTTtBQU9QOzs7Ozs7Ozs7QUFRTyxJQUFNdUIsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFFTCxNQUFGLEVBQVVsQixTQUFWLEVBQXlCO0FBQ3ZELFNBQ0NpQixRQUFRLENBQUVDLE1BQUYsQ0FBUixJQUNBLENBQUVwQiwwREFBVyxDQUFFb0IsTUFBTSxDQUFDTSxLQUFULENBRGIsSUFFQUMsd0RBQVMsQ0FBRXpCLFNBQUYsQ0FBVCxLQUEyQnlCLHdEQUFTLENBQUVQLE1BQU0sQ0FBQ00sS0FBVCxDQUhyQztBQUtBLENBTk07QUFRUDs7Ozs7OztBQU1BLElBQU1SLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBRVgsTUFBRixFQUFjO0FBQ3ZDLFNBQU9jLDREQUFhLENBQUVkLE1BQUYsQ0FBYixJQUEyQixDQUFFUCwwREFBVyxDQUFFTyxNQUFNLENBQUNhLE1BQVQsQ0FBL0M7QUFDQSxDQUZELEM7Ozs7Ozs7Ozs7O0FDdkVBLGFBQWEsaUNBQWlDLEVBQUUsSSIsImZpbGUiOiJldmVudGVzcHJlc3NvLXZhbGlkYXRvcnMuNjFiZGEzYTZlM2RiOTMwOTI0NGUuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL3NyYy9lZWpzL3ZhbGlkYXRvcnMvaW5kZXguanNcIik7XG4iLCJleHBvcnQgKiBmcm9tICcuL2lzLWdlbmVyYXRvcic7XG5leHBvcnQgKiBmcm9tICcuL2lzLWZhY3RvcnknO1xuZXhwb3J0ICogZnJvbSAnLi9pcy1tb2RlbC1lbnRpdHknO1xuZXhwb3J0ICogZnJvbSAnLi9pcy1zY2hlbWEnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnN0YW5jZS1vZic7XG4iLCIvKipcbiAqIEhlbHBlciBtZXRob2QgZm9yIGRldGVybWluaW5nIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpbnN0YW5jZSBpcyBhblxuICogaW5zdGFuY2Ugb2YgdGhlIGdpdmVuIGV4cGVjdGVkIGNsYXNzL2Z1bmN0aW9uIG5hbWUuICBUaGlzIGlzIGEgbW9yZSByZWxpYWJsZVxuICogbWV0aG9kIGZvciBkb2luZyBpbnN0YW5jZW9mIGNoZWNrcyB0aGFuIGFuIGBpbnN0YW5jZW9mYCBleHByZXNzaW9uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RJbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGV4cGVjdGVkTmFtZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGUgb2JqZWN0IGlzIGFuIGluc3RhbmNlIG9mIGV4cGVjdGVkTmFtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbmNlT2YoIG9iamVjdEluc3RhbmNlLCBleHBlY3RlZE5hbWUgKSB7XG5cdGlmICggISBvYmplY3RJbnN0YW5jZSB8fFxuXHRcdCEgb2JqZWN0SW5zdGFuY2UuY29uc3RydWN0b3IgfHxcblx0XHQhIG9iamVjdEluc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWVcblx0KSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJldHVybiBvYmplY3RJbnN0YW5jZS5jb25zdHJ1Y3Rvci5uYW1lID09PSBleHBlY3RlZE5hbWU7XG59XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNVbmRlZmluZWQgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIFV0aWxpdHkgZm9yIGNoZWNraW5nIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIHJlcHJlc2VudHMgYVxuICogTW9kZWxFbnRpdHlGYWN0b3J5IG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZmFjdG9yeVxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBtZWFucyB0aGUgb2JqZWN0IGlzIGEgTW9kZWxFbnRpdHlGYWN0b3J5XG4gKi9cbmV4cG9ydCBjb25zdCBpc01vZGVsRW50aXR5RmFjdG9yeSA9ICggZmFjdG9yeSApID0+IHtcblx0cmV0dXJuIChcblx0XHQhISBmYWN0b3J5ICYmXG5cdFx0ISBpc1VuZGVmaW5lZCggZmFjdG9yeS5jbGFzc0RlZiApICYmXG5cdFx0ISBpc1VuZGVmaW5lZCggZmFjdG9yeS5tb2RlbE5hbWUgKSAmJlxuXHRcdE9iamVjdC5nZXRQcm90b3R5cGVPZiggZmFjdG9yeS5jbGFzc0RlZiApLm5hbWUgPT09ICdCYXNlRW50aXR5J1xuXHQpO1xufTtcblxuLyoqXG4gKiBVdGlsaXR5IGZvciBjaGVja2luZyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSByZXByZXNlbnRzIGEgTW9kZWxFbnRpdHlGYWN0b3J5XG4gKiBmb3IgYSBzcGVjaWZpYyBtb2RlbC5cbiAqXG4gKiBOb3RlOiBtb2RlbE5hbWUgaXMgZXhwZWN0ZWQgdG8gYmUgdGhlIGxvd2VyY2FzZSwgc25ha2VjYXNlIHN0cmluZyBmb3IgdGhlXG4gKiBtb2RlbC4gIEVnLiAnZXZlbnQnLCBvciAnbWVzc2FnZV90ZW1wbGF0ZScuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGZhY3RvcnlcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgdGhlIGdpdmVuIGZhY3RvcnlcbiAqL1xuZXhwb3J0IGNvbnN0IGlzTW9kZWxFbnRpdHlGYWN0b3J5T2ZNb2RlbCA9ICggZmFjdG9yeSwgbW9kZWxOYW1lICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdGlzTW9kZWxFbnRpdHlGYWN0b3J5KCBmYWN0b3J5ICkgJiZcblx0XHRmYWN0b3J5Lm1vZGVsTmFtZSA9PT0gbW9kZWxOYW1lXG5cdCk7XG59O1xuIiwiLyoqXG4gKiBUZXN0cyBmb3Igd2hldGhlciB0aGUgcHJvdmlkZSB2YWx1ZSBpcyBhIGdlbmVyYXRvciBvciBub3QuXG4gKlxuICogTm90ZTogR2VuZXJhdG9ycyBhcmUgZGlmZmVyZW50IHRoYW4gR2VuZXJhdG9yRnVuY3Rpb25zIVxuICogVGhpcyBpcyBhIEdlbmVyYXRvcjogIGZ1bmN0aW9uKiAoKXt9KCk7IChhbiBpbnZva2VkIEdlbmVyYXRvckZ1bmN0aW9uKVxuICogdGhpcyBpcyBhIEdlbmVyYXRvckZ1bmN0aW9uOiBmdW5jdGlvbiogKCl7fVxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhIGdlbmVyYXRvci5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzR2VuZXJhdG9yID0gKCBvYmplY3QgKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0ISEgb2JqZWN0ICYmXG5cdFx0b2JqZWN0WyBTeW1ib2wudG9TdHJpbmdUYWcgXSA9PT0gJ0dlbmVyYXRvcidcblx0KTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNPYmplY3QsIGNhbWVsQ2FzZSwgdXBwZXJGaXJzdCB9IGZyb20gJ2xvZGFzaCc7XG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBtb2RlbCBlbnRpdHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVudGl0eVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyBpdCBpcyBhIG1vZGVsIGVudGl0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTW9kZWxFbnRpdHkgPSAoIGVudGl0eSApID0+IHtcblx0cmV0dXJuIChcblx0XHRpc09iamVjdCggZW50aXR5ICkgJiZcblx0XHRPYmplY3QuZ2V0UHJvdG90eXBlT2YoIGVudGl0eS5jb25zdHJ1Y3RvciApLm5hbWUgPT09ICdCYXNlRW50aXR5J1xuXHQpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGEgbW9kZWwgZW50aXR5IGZvciB0aGUgZ2l2ZW4gbW9kZWwgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZW50aXR5XG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIGl0IGlzIGEgbW9kZWwgZW50aXR5IGZvciB0aGUgZ2l2ZW4gbW9kZWwuXG4gKi9cbmV4cG9ydCBjb25zdCBpc01vZGVsRW50aXR5T2ZNb2RlbCA9ICggZW50aXR5LCBtb2RlbE5hbWUgKSA9PiB7XG5cdG1vZGVsTmFtZSA9IHVwcGVyRmlyc3QoIGNhbWVsQ2FzZSggbW9kZWxOYW1lICkgKTtcblx0cmV0dXJuIChcblx0XHRpc01vZGVsRW50aXR5KCBlbnRpdHkgKSAmJlxuXHRcdGVudGl0eS5jb25zdHJ1Y3Rvci5uYW1lID09PSBtb2RlbE5hbWVcblx0KTtcbn07XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgaXNQbGFpbk9iamVjdCwgaXNVbmRlZmluZWQsIGxvd2VyQ2FzZSB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIHNjaGVtYSByZXNwb25zZSBvYmplY3QgZnJvbSBhIHNjaGVtYVxuICogcmVxdWVzdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBpcyBhIHNjaGVtYSByZXNwb25zZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1NjaGVtYVJlc3BvbnNlID0gKCByZXNwb25zZSApID0+IHtcblx0cmV0dXJuIChcblx0XHRoYXNTY2hlbWFQcm9wZXJ0eSggcmVzcG9uc2UgKSAmJlxuXHRcdGlzU2NoZW1hKCByZXNwb25zZS5zY2hlbWEgKVxuXHQpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGEgc2NoZW1hIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgaXMgYSBzY2hlbWEgb2JqZWN0LlxuICovXG5leHBvcnQgY29uc3QgaXNTY2hlbWEgPSAoIHNjaGVtYSApID0+IHtcblx0cmV0dXJuIChcblx0XHRpc1BsYWluT2JqZWN0KCBzY2hlbWEgKSAmJlxuXHRcdCEgaXNVbmRlZmluZWQoIHNjaGVtYS4kc2NoZW1hICkgJiZcblx0XHRpc1BsYWluT2JqZWN0KCBzY2hlbWEucHJvcGVydGllcyApXG5cdCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBzY2hlbWEgcmVzcG9uc2Ugb2JqZWN0IGZvciB0aGUgZ2l2ZW5cbiAqIG1vZGVsIG5hbWVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIG1lYW5zIHRoaXMgaXMgYSBzY2hlbWEgcmVzcG9uc2Ugb2JqZWN0IGZvciB0aGUgZ2l2ZW5cbiAqIG1vZGVsIG5hbWUuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1NjaGVtYVJlc3BvbnNlT2ZNb2RlbCA9ICggcmVzcG9uc2UsIG1vZGVsTmFtZSApID0+IHtcblx0cmV0dXJuIChcblx0XHRoYXNTY2hlbWFQcm9wZXJ0eSggcmVzcG9uc2UgKSAmJlxuXHRcdGlzU2NoZW1hT2ZNb2RlbCggcmVzcG9uc2Uuc2NoZW1hLCBtb2RlbE5hbWUgKVxuXHQpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGEgc2NoZW1hIG9iamVjdCBmb3IgdGhlIGdpdmVuIG1vZGVsIG5hbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGlzIGlzIGEgc2NoZW1hIG9iamVjdCBmb3IgdGhlIGdpdmVuIG1vZGVsXG4gKiBuYW1lLlxuICovXG5leHBvcnQgY29uc3QgaXNTY2hlbWFPZk1vZGVsID0gKCBzY2hlbWEsIG1vZGVsTmFtZSApID0+IHtcblx0cmV0dXJuIChcblx0XHRpc1NjaGVtYSggc2NoZW1hICkgJiZcblx0XHQhIGlzVW5kZWZpbmVkKCBzY2hlbWEudGl0bGUgKSAmJlxuXHRcdGxvd2VyQ2FzZSggbW9kZWxOYW1lICkgPT09IGxvd2VyQ2FzZSggc2NoZW1hLnRpdGxlIClcblx0KTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhIHNjaGVtYSBwcm9wZXJ0eVxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBpZiBhIHBsYWluIG9iamVjdCB3aXRoIGEgc2NoZW1hIHByb3BlcnR5XG4gKi9cbmNvbnN0IGhhc1NjaGVtYVByb3BlcnR5ID0gKCBvYmplY3QgKSA9PiB7XG5cdHJldHVybiBpc1BsYWluT2JqZWN0KCBvYmplY3QgKSAmJiAhIGlzVW5kZWZpbmVkKCBvYmplY3Quc2NoZW1hICk7XG59O1xuIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJsb2Rhc2hcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==
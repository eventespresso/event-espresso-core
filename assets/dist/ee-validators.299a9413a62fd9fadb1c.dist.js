var eejs = typeof eejs === "object" ? eejs : {}; eejs["validators"] =
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
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = lodash;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLltuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvZWVqcy92YWxpZGF0b3JzL2luZGV4LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9lZWpzL3ZhbGlkYXRvcnMvaW5zdGFuY2Utb2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2VlanMvdmFsaWRhdG9ycy9pcy1mYWN0b3J5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9lZWpzL3ZhbGlkYXRvcnMvaXMtZ2VuZXJhdG9yLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9lZWpzL3ZhbGlkYXRvcnMvaXMtbW9kZWwtZW50aXR5LmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9lZWpzL3ZhbGlkYXRvcnMvaXMtc2NoZW1hLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwibG9kYXNoXCIiXSwibmFtZXMiOlsiaW5zdGFuY2VPZiIsIm9iamVjdEluc3RhbmNlIiwiZXhwZWN0ZWROYW1lIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiaXNNb2RlbEVudGl0eUZhY3RvcnkiLCJmYWN0b3J5IiwiaXNVbmRlZmluZWQiLCJjbGFzc0RlZiIsIm1vZGVsTmFtZSIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwiaXNNb2RlbEVudGl0eUZhY3RvcnlPZk1vZGVsIiwiaXNHZW5lcmF0b3IiLCJvYmplY3QiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsImlzTW9kZWxFbnRpdHkiLCJlbnRpdHkiLCJpc09iamVjdCIsImlzTW9kZWxFbnRpdHlPZk1vZGVsIiwidXBwZXJGaXJzdCIsImNhbWVsQ2FzZSIsImlzU2NoZW1hUmVzcG9uc2UiLCJyZXNwb25zZSIsImhhc1NjaGVtYVByb3BlcnR5IiwiaXNTY2hlbWEiLCJzY2hlbWEiLCJpc1BsYWluT2JqZWN0IiwiJHNjaGVtYSIsInByb3BlcnRpZXMiLCJpc1NjaGVtYVJlc3BvbnNlT2ZNb2RlbCIsImlzU2NoZW1hT2ZNb2RlbCIsInRpdGxlIiwibG93ZXJDYXNlIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUFBO0FBQUE7Ozs7Ozs7OztBQVNPLFNBQVNBLFVBQVQsQ0FBcUJDLGNBQXJCLEVBQXFDQyxZQUFyQyxFQUFvRDtBQUMxRCxNQUFLLENBQUVELGNBQUYsSUFDSixDQUFFQSxjQUFjLENBQUNF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QSxDQUxNO0FBT1A7Ozs7Ozs7OztBQVFPLElBQU11QixlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUVMLE1BQUYsRUFBVWxCLFNBQVYsRUFBeUI7QUFDdkQsU0FDQ2lCLFFBQVEsQ0FBRUMsTUFBRixDQUFSLElBQ0EsQ0FBRXBCLDBEQUFXLENBQUVvQixNQUFNLENBQUNNLEtBQVQsQ0FEYixJQUVBQyx3REFBUyxDQUFFekIsU0FBRixDQUFULEtBQTJCeUIsd0RBQVMsQ0FBRVAsTUFBTSxDQUFDTSxLQUFULENBSHJDO0FBS0EsQ0FOTTtBQVFQOzs7Ozs7O0FBTUEsSUFBTVIsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFFWCxNQUFGLEVBQWM7QUFDdkMsU0FBT2MsNERBQWEsQ0FBRWQsTUFBRixDQUFiLElBQTJCLENBQUVQLDBEQUFXLENBQUVPLE1BQU0sQ0FBQ2EsTUFBVCxDQUEvQztBQUNBLENBRkQsQzs7Ozs7Ozs7Ozs7QUN2RUEsd0IiLCJmaWxlIjoiZWUtdmFsaWRhdG9ycy4yOTlhOTQxM2E2MmZkOWZhZGIxYy5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvc3JjL2VlanMvdmFsaWRhdG9ycy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCAqIGZyb20gJy4vaXMtZ2VuZXJhdG9yJztcbmV4cG9ydCAqIGZyb20gJy4vaXMtZmFjdG9yeSc7XG5leHBvcnQgKiBmcm9tICcuL2lzLW1vZGVsLWVudGl0eSc7XG5leHBvcnQgKiBmcm9tICcuL2lzLXNjaGVtYSc7XG5leHBvcnQgKiBmcm9tICcuL2luc3RhbmNlLW9mJztcbiIsIi8qKlxuICogSGVscGVyIG1ldGhvZCBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciB0aGUgZ2l2ZW4gb2JqZWN0IGluc3RhbmNlIGlzIGFuXG4gKiBpbnN0YW5jZSBvZiB0aGUgZ2l2ZW4gZXhwZWN0ZWQgY2xhc3MvZnVuY3Rpb24gbmFtZS4gIFRoaXMgaXMgYSBtb3JlIHJlbGlhYmxlXG4gKiBtZXRob2QgZm9yIGRvaW5nIGluc3RhbmNlb2YgY2hlY2tzIHRoYW4gYW4gYGluc3RhbmNlb2ZgIGV4cHJlc3Npb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdEluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhwZWN0ZWROYW1lXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoZSBvYmplY3QgaXMgYW4gaW5zdGFuY2Ugb2YgZXhwZWN0ZWROYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFuY2VPZiggb2JqZWN0SW5zdGFuY2UsIGV4cGVjdGVkTmFtZSApIHtcblx0aWYgKCAhIG9iamVjdEluc3RhbmNlIHx8XG5cdFx0ISBvYmplY3RJbnN0YW5jZS5jb25zdHJ1Y3RvciB8fFxuXHRcdCEgb2JqZWN0SW5zdGFuY2UuY29uc3RydWN0b3IubmFtZVxuXHQpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cmV0dXJuIG9iamVjdEluc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWUgPT09IGV4cGVjdGVkTmFtZTtcbn1cbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogVXRpbGl0eSBmb3IgY2hlY2tpbmcgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgcmVwcmVzZW50cyBhXG4gKiBNb2RlbEVudGl0eUZhY3Rvcnkgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBmYWN0b3J5XG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG1lYW5zIHRoZSBvYmplY3QgaXMgYSBNb2RlbEVudGl0eUZhY3RvcnlcbiAqL1xuZXhwb3J0IGNvbnN0IGlzTW9kZWxFbnRpdHlGYWN0b3J5ID0gKCBmYWN0b3J5ICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdCEhIGZhY3RvcnkgJiZcblx0XHQhIGlzVW5kZWZpbmVkKCBmYWN0b3J5LmNsYXNzRGVmICkgJiZcblx0XHQhIGlzVW5kZWZpbmVkKCBmYWN0b3J5Lm1vZGVsTmFtZSApICYmXG5cdFx0T2JqZWN0LmdldFByb3RvdHlwZU9mKCBmYWN0b3J5LmNsYXNzRGVmICkubmFtZSA9PT0gJ0Jhc2VFbnRpdHknXG5cdCk7XG59O1xuXG4vKipcbiAqIFV0aWxpdHkgZm9yIGNoZWNraW5nIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIHJlcHJlc2VudHMgYSBNb2RlbEVudGl0eUZhY3RvcnlcbiAqIGZvciBhIHNwZWNpZmljIG1vZGVsLlxuICpcbiAqIE5vdGU6IG1vZGVsTmFtZSBpcyBleHBlY3RlZCB0byBiZSB0aGUgbG93ZXJjYXNlLCBzbmFrZWNhc2Ugc3RyaW5nIGZvciB0aGVcbiAqIG1vZGVsLiAgRWcuICdldmVudCcsIG9yICdtZXNzYWdlX3RlbXBsYXRlJy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZmFjdG9yeVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBtZWFucyB0aGUgZ2l2ZW4gZmFjdG9yeVxuICovXG5leHBvcnQgY29uc3QgaXNNb2RlbEVudGl0eUZhY3RvcnlPZk1vZGVsID0gKCBmYWN0b3J5LCBtb2RlbE5hbWUgKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0aXNNb2RlbEVudGl0eUZhY3RvcnkoIGZhY3RvcnkgKSAmJlxuXHRcdGZhY3RvcnkubW9kZWxOYW1lID09PSBtb2RlbE5hbWVcblx0KTtcbn07XG4iLCIvKipcbiAqIFRlc3RzIGZvciB3aGV0aGVyIHRoZSBwcm92aWRlIHZhbHVlIGlzIGEgZ2VuZXJhdG9yIG9yIG5vdC5cbiAqXG4gKiBOb3RlOiBHZW5lcmF0b3JzIGFyZSBkaWZmZXJlbnQgdGhhbiBHZW5lcmF0b3JGdW5jdGlvbnMhXG4gKiBUaGlzIGlzIGEgR2VuZXJhdG9yOiAgZnVuY3Rpb24qICgpe30oKTsgKGFuIGludm9rZWQgR2VuZXJhdG9yRnVuY3Rpb24pXG4gKiB0aGlzIGlzIGEgR2VuZXJhdG9yRnVuY3Rpb246IGZ1bmN0aW9uKiAoKXt9XG4gKlxuICogQHBhcmFtIHsqfSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGEgZ2VuZXJhdG9yLlxuICovXG5leHBvcnQgY29uc3QgaXNHZW5lcmF0b3IgPSAoIG9iamVjdCApID0+IHtcblx0cmV0dXJuIChcblx0XHQhISBvYmplY3QgJiZcblx0XHRvYmplY3RbIFN5bWJvbC50b1N0cmluZ1RhZyBdID09PSAnR2VuZXJhdG9yJ1xuXHQpO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc09iamVjdCwgY2FtZWxDYXNlLCB1cHBlckZpcnN0IH0gZnJvbSAnbG9kYXNoJztcbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIG1vZGVsIGVudGl0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZW50aXR5XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIGl0IGlzIGEgbW9kZWwgZW50aXR5LlxuICovXG5leHBvcnQgY29uc3QgaXNNb2RlbEVudGl0eSA9ICggZW50aXR5ICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdGlzT2JqZWN0KCBlbnRpdHkgKSAmJlxuXHRcdE9iamVjdC5nZXRQcm90b3R5cGVPZiggZW50aXR5LmNvbnN0cnVjdG9yICkubmFtZSA9PT0gJ0Jhc2VFbnRpdHknXG5cdCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBtb2RlbCBlbnRpdHkgZm9yIHRoZSBnaXZlbiBtb2RlbCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbnRpdHlcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE5hbWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgbWVhbnMgaXQgaXMgYSBtb2RlbCBlbnRpdHkgZm9yIHRoZSBnaXZlbiBtb2RlbC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTW9kZWxFbnRpdHlPZk1vZGVsID0gKCBlbnRpdHksIG1vZGVsTmFtZSApID0+IHtcblx0bW9kZWxOYW1lID0gdXBwZXJGaXJzdCggY2FtZWxDYXNlKCBtb2RlbE5hbWUgKSApO1xuXHRyZXR1cm4gKFxuXHRcdGlzTW9kZWxFbnRpdHkoIGVudGl0eSApICYmXG5cdFx0ZW50aXR5LmNvbnN0cnVjdG9yLm5hbWUgPT09IG1vZGVsTmFtZVxuXHQpO1xufTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc1BsYWluT2JqZWN0LCBpc1VuZGVmaW5lZCwgbG93ZXJDYXNlIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGEgc2NoZW1hIHJlc3BvbnNlIG9iamVjdCBmcm9tIGEgc2NoZW1hXG4gKiByZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGlzIGEgc2NoZW1hIHJlc3BvbnNlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2NoZW1hUmVzcG9uc2UgPSAoIHJlc3BvbnNlICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdGhhc1NjaGVtYVByb3BlcnR5KCByZXNwb25zZSApICYmXG5cdFx0aXNTY2hlbWEoIHJlc3BvbnNlLnNjaGVtYSApXG5cdCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBzY2hlbWEgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzY2hlbWFcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBpcyBhIHNjaGVtYSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1NjaGVtYSA9ICggc2NoZW1hICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdGlzUGxhaW5PYmplY3QoIHNjaGVtYSApICYmXG5cdFx0ISBpc1VuZGVmaW5lZCggc2NoZW1hLiRzY2hlbWEgKSAmJlxuXHRcdGlzUGxhaW5PYmplY3QoIHNjaGVtYS5wcm9wZXJ0aWVzIClcblx0KTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIHNjaGVtYSByZXNwb25zZSBvYmplY3QgZm9yIHRoZSBnaXZlblxuICogbW9kZWwgbmFtZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsTmFtZVxuICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgbWVhbnMgdGhpcyBpcyBhIHNjaGVtYSByZXNwb25zZSBvYmplY3QgZm9yIHRoZSBnaXZlblxuICogbW9kZWwgbmFtZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2NoZW1hUmVzcG9uc2VPZk1vZGVsID0gKCByZXNwb25zZSwgbW9kZWxOYW1lICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdGhhc1NjaGVtYVByb3BlcnR5KCByZXNwb25zZSApICYmXG5cdFx0aXNTY2hlbWFPZk1vZGVsKCByZXNwb25zZS5zY2hlbWEsIG1vZGVsTmFtZSApXG5cdCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBzY2hlbWEgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gbW9kZWwgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxOYW1lXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIG1lYW5zIHRoaXMgaXMgYSBzY2hlbWEgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gbW9kZWxcbiAqIG5hbWUuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1NjaGVtYU9mTW9kZWwgPSAoIHNjaGVtYSwgbW9kZWxOYW1lICkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdGlzU2NoZW1hKCBzY2hlbWEgKSAmJlxuXHRcdCEgaXNVbmRlZmluZWQoIHNjaGVtYS50aXRsZSApICYmXG5cdFx0bG93ZXJDYXNlKCBtb2RlbE5hbWUgKSA9PT0gbG93ZXJDYXNlKCBzY2hlbWEudGl0bGUgKVxuXHQpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIGEgc2NoZW1hIHByb3BlcnR5XG4gKlxuICogQHBhcmFtIHsqfSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIGlmIGEgcGxhaW4gb2JqZWN0IHdpdGggYSBzY2hlbWEgcHJvcGVydHlcbiAqL1xuY29uc3QgaGFzU2NoZW1hUHJvcGVydHkgPSAoIG9iamVjdCApID0+IHtcblx0cmV0dXJuIGlzUGxhaW5PYmplY3QoIG9iamVjdCApICYmICEgaXNVbmRlZmluZWQoIG9iamVjdC5zY2hlbWEgKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGxvZGFzaDsiXSwic291cmNlUm9vdCI6IiJ9
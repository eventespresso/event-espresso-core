var eejs = typeof eejs === "object" ? eejs : {}; eejs["editorHocs"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/editor/hocs/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/editor/hocs/index.js":
/*!*****************************************!*\
  !*** ./assets/src/editor/hocs/index.js ***!
  \*****************************************/
/*! exports provided: NotWithPostTypeCheck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _not_with_post_type_check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not-with-post-type-check */ "./assets/src/editor/hocs/not-with-post-type-check/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotWithPostTypeCheck", function() { return _not_with_post_type_check__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./assets/src/editor/hocs/not-with-post-type-check/index.js":
/*!******************************************************************!*\
  !*** ./assets/src/editor/hocs/not-with-post-type-check/index.js ***!
  \******************************************************************/
/*! exports provided: NotWithPostTypeCheck, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotWithPostTypeCheck", function() { return NotWithPostTypeCheck; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External Imports
 */


/**
 * A component with renders its own children oly if the current editor post type
 * is not one of the given `excludedPostTypeSlugs` prop.
 *
 * @param {string} postType
 * @param {WPElement} children
 * @param {(string|string[])} excludedPostTypeSlugs
 * @return {?WPElement} Rendered element or null.
 * @constructor
 */

function NotWithPostTypeCheck(_ref) {
  var postType = _ref.postType,
      children = _ref.children,
      excludedPostTypeSlugs = _ref.excludedPostTypeSlugs;
  var isExcluded = false;

  if (postType) {
    isExcluded = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["some"])(Object(lodash__WEBPACK_IMPORTED_MODULE_0__["castArray"])(excludedPostTypeSlugs), function (type) {
      return postType === type;
    });
  }

  if (isExcluded) {
    return null;
  }

  return children;
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__["withSelect"])(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute;

  return {
    postType: getEditedPostAttribute('type')
  };
})(NotWithPostTypeCheck));

/***/ }),

/***/ "@wordpress/data":
/*!**************************!*\
  !*** external "wp.data" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp.data;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvLi9hc3NldHMvc3JjL2VkaXRvci9ob2NzL25vdC13aXRoLXBvc3QtdHlwZS1jaGVjay9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3MvZXh0ZXJuYWwgXCJ3cC5kYXRhXCIiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIFwibG9kYXNoXCIiXSwibmFtZXMiOlsiTm90V2l0aFBvc3RUeXBlQ2hlY2siLCJwb3N0VHlwZSIsImNoaWxkcmVuIiwiZXhjbHVkZWRQb3N0VHlwZVNsdWdzIiwiaXNFeGNsdWRlZCIsInNvbWUiLCJjYXN0QXJyYXkiLCJ0eXBlIiwid2l0aFNlbGVjdCIsInNlbGVjdCIsImdldEVkaXRlZFBvc3RBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQUdBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUFVTyxTQUFTQSxvQkFBVCxPQUlIO0FBQUEsTUFISEMsUUFHRyxRQUhIQSxRQUdHO0FBQUEsTUFGSEMsUUFFRyxRQUZIQSxRQUVHO0FBQUEsTUFESEMscUJBQ0csUUFESEEscUJBQ0c7QUFDSCxNQUFJQyxVQUFVLEdBQUcsS0FBakI7O0FBQ0EsTUFBS0gsUUFBTCxFQUFnQjtBQUNmRyxjQUFVLEdBQUdDLG1EQUFJLENBQ2hCQyx3REFBUyxDQUFFSCxxQkFBRixDQURPLEVBRWhCLFVBQUFJLElBQUk7QUFBQSxhQUFJTixRQUFRLEtBQUtNLElBQWpCO0FBQUEsS0FGWSxDQUFqQjtBQUlBOztBQUNELE1BQUtILFVBQUwsRUFBa0I7QUFDakIsV0FBTyxJQUFQO0FBQ0E7O0FBRUQsU0FBT0YsUUFBUDtBQUNBO0FBRWNNLGlJQUFVLENBQUUsVUFBRUMsTUFBRixFQUFjO0FBQUEsZ0JBQ0xBLE1BQU0sQ0FBRSxhQUFGLENBREQ7QUFBQSxNQUNoQ0Msc0JBRGdDLFdBQ2hDQSxzQkFEZ0M7O0FBRXhDLFNBQU87QUFDTlQsWUFBUSxFQUFFUyxzQkFBc0IsQ0FBRSxNQUFGO0FBRDFCLEdBQVA7QUFHQSxDQUx3QixDQUFWLENBS1ZWLG9CQUxVLENBQWYsRTs7Ozs7Ozs7Ozs7QUNuQ0EseUI7Ozs7Ozs7Ozs7O0FDQUEsd0IiLCJmaWxlIjoiZWUtZWRpdG9yLWhvY3MuMTVhODEzYWFjN2E1MWI1NDczY2IuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgTm90V2l0aFBvc3RUeXBlQ2hlY2sgfSBmcm9tICcuL25vdC13aXRoLXBvc3QtdHlwZS1jaGVjayc7XG4iLCIvKipcbiAqIEV4dGVybmFsIEltcG9ydHNcbiAqL1xuaW1wb3J0IHsgc29tZSwgY2FzdEFycmF5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHdpdGhTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG4vKipcbiAqIEEgY29tcG9uZW50IHdpdGggcmVuZGVycyBpdHMgb3duIGNoaWxkcmVuIG9seSBpZiB0aGUgY3VycmVudCBlZGl0b3IgcG9zdCB0eXBlXG4gKiBpcyBub3Qgb25lIG9mIHRoZSBnaXZlbiBgZXhjbHVkZWRQb3N0VHlwZVNsdWdzYCBwcm9wLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwb3N0VHlwZVxuICogQHBhcmFtIHtXUEVsZW1lbnR9IGNoaWxkcmVuXG4gKiBAcGFyYW0geyhzdHJpbmd8c3RyaW5nW10pfSBleGNsdWRlZFBvc3RUeXBlU2x1Z3NcbiAqIEByZXR1cm4gez9XUEVsZW1lbnR9IFJlbmRlcmVkIGVsZW1lbnQgb3IgbnVsbC5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gTm90V2l0aFBvc3RUeXBlQ2hlY2soIHtcblx0cG9zdFR5cGUsXG5cdGNoaWxkcmVuLFxuXHRleGNsdWRlZFBvc3RUeXBlU2x1Z3MsXG59ICkge1xuXHRsZXQgaXNFeGNsdWRlZCA9IGZhbHNlO1xuXHRpZiAoIHBvc3RUeXBlICkge1xuXHRcdGlzRXhjbHVkZWQgPSBzb21lKFxuXHRcdFx0Y2FzdEFycmF5KCBleGNsdWRlZFBvc3RUeXBlU2x1Z3MgKSxcblx0XHRcdHR5cGUgPT4gcG9zdFR5cGUgPT09IHR5cGVcblx0XHQpO1xuXHR9XG5cdGlmICggaXNFeGNsdWRlZCApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBjaGlsZHJlbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFNlbGVjdCggKCBzZWxlY3QgKSA9PiB7XG5cdGNvbnN0IHsgZ2V0RWRpdGVkUG9zdEF0dHJpYnV0ZSB9ID0gc2VsZWN0KCAnY29yZS9lZGl0b3InICk7XG5cdHJldHVybiB7XG5cdFx0cG9zdFR5cGU6IGdldEVkaXRlZFBvc3RBdHRyaWJ1dGUoICd0eXBlJyApLFxuXHR9O1xufSApKCBOb3RXaXRoUG9zdFR5cGVDaGVjayApO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB3cC5kYXRhOyIsIm1vZHVsZS5leHBvcnRzID0gbG9kYXNoOyJdLCJzb3VyY2VSb290IjoiIn0=
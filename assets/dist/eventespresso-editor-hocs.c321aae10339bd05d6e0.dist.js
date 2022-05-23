/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/editor/hocs/not-with-post-type-check/index.js":
/*!******************************************************************!*\
  !*** ./assets/src/editor/hocs/not-with-post-type-check/index.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotWithPostTypeCheck": function() { return /* binding */ NotWithPostTypeCheck; }
/* harmony export */ });
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
 * @class
 */

function NotWithPostTypeCheck(_ref) {
  let {
    postType,
    children,
    excludedPostTypeSlugs
  } = _ref;
  let isExcluded = false;

  if (postType) {
    isExcluded = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.some)((0,lodash__WEBPACK_IMPORTED_MODULE_0__.castArray)(excludedPostTypeSlugs), type => postType === type);
  }

  if (isExcluded) {
    return null;
  }

  return children;
}
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.withSelect)(select => {
  const {
    getEditedPostAttribute
  } = select('core/editor');
  return {
    postType: getEditedPostAttribute('type')
  };
})(NotWithPostTypeCheck));

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*****************************************!*\
  !*** ./assets/src/editor/hocs/index.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotWithPostTypeCheck": function() { return /* reexport safe */ _not_with_post_type_check__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _not_with_post_type_check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not-with-post-type-check */ "./assets/src/editor/hocs/not-with-post-type-check/index.js");

}();
(this.eejs = this.eejs || {}).editorHocs = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRlc3ByZXNzby1lZGl0b3ItaG9jcy5jMzIxYWFlMTAzMzliZDA1ZDZlMC5kaXN0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxTQUFTRyxvQkFBVCxPQUlKO0VBQUEsSUFKa0M7SUFDcENDLFFBRG9DO0lBRXBDQyxRQUZvQztJQUdwQ0M7RUFIb0MsQ0FJbEM7RUFDRixJQUFJQyxVQUFVLEdBQUcsS0FBakI7O0VBQ0EsSUFBSUgsUUFBSixFQUFjO0lBQ2JHLFVBQVUsR0FBR1AsNENBQUksQ0FDaEJDLGlEQUFTLENBQUNLLHFCQUFELENBRE8sRUFFZkUsSUFBRCxJQUFVSixRQUFRLEtBQUtJLElBRlAsQ0FBakI7RUFJQTs7RUFDRCxJQUFJRCxVQUFKLEVBQWdCO0lBQ2YsT0FBTyxJQUFQO0VBQ0E7O0VBRUQsT0FBT0YsUUFBUDtBQUNBO0FBRUQsK0RBQWVILDJEQUFVLENBQUVPLE1BQUQsSUFBWTtFQUNyQyxNQUFNO0lBQUVDO0VBQUYsSUFBNkJELE1BQU0sQ0FBQyxhQUFELENBQXpDO0VBQ0EsT0FBTztJQUNOTCxRQUFRLEVBQUVNLHNCQUFzQixDQUFDLE1BQUQ7RUFEMUIsQ0FBUDtBQUdBLENBTHdCLENBQVYsQ0FLWlAsb0JBTFksQ0FBZjs7Ozs7Ozs7OztBQ25DQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzLy4vYXNzZXRzL3NyYy9lZGl0b3IvaG9jcy9ub3Qtd2l0aC1wb3N0LXR5cGUtY2hlY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL2V4dGVybmFsIHdpbmRvdyBcImxvZGFzaFwiIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy9leHRlcm5hbCB3aW5kb3cgW1wid3BcIixcImRhdGFcIl0iLCJ3ZWJwYWNrOi8vZWVqcy5lZGl0b3JIb2NzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9lZWpzLmVkaXRvckhvY3Mvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VlanMuZWRpdG9ySG9jcy8uL2Fzc2V0cy9zcmMvZWRpdG9yL2hvY3MvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBJbXBvcnRzXG4gKi9cbmltcG9ydCB7IHNvbWUsIGNhc3RBcnJheSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB3aXRoU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcblxuLyoqXG4gKiBBIGNvbXBvbmVudCB3aXRoIHJlbmRlcnMgaXRzIG93biBjaGlsZHJlbiBvbHkgaWYgdGhlIGN1cnJlbnQgZWRpdG9yIHBvc3QgdHlwZVxuICogaXMgbm90IG9uZSBvZiB0aGUgZ2l2ZW4gYGV4Y2x1ZGVkUG9zdFR5cGVTbHVnc2AgcHJvcC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcG9zdFR5cGVcbiAqIEBwYXJhbSB7V1BFbGVtZW50fSBjaGlsZHJlblxuICogQHBhcmFtIHsoc3RyaW5nfHN0cmluZ1tdKX0gZXhjbHVkZWRQb3N0VHlwZVNsdWdzXG4gKiBAcmV0dXJuIHs/V1BFbGVtZW50fSBSZW5kZXJlZCBlbGVtZW50IG9yIG51bGwuXG4gKiBAY2xhc3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE5vdFdpdGhQb3N0VHlwZUNoZWNrKHtcblx0cG9zdFR5cGUsXG5cdGNoaWxkcmVuLFxuXHRleGNsdWRlZFBvc3RUeXBlU2x1Z3MsXG59KSB7XG5cdGxldCBpc0V4Y2x1ZGVkID0gZmFsc2U7XG5cdGlmIChwb3N0VHlwZSkge1xuXHRcdGlzRXhjbHVkZWQgPSBzb21lKFxuXHRcdFx0Y2FzdEFycmF5KGV4Y2x1ZGVkUG9zdFR5cGVTbHVncyksXG5cdFx0XHQodHlwZSkgPT4gcG9zdFR5cGUgPT09IHR5cGVcblx0XHQpO1xuXHR9XG5cdGlmIChpc0V4Y2x1ZGVkKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gY2hpbGRyZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTZWxlY3QoKHNlbGVjdCkgPT4ge1xuXHRjb25zdCB7IGdldEVkaXRlZFBvc3RBdHRyaWJ1dGUgfSA9IHNlbGVjdCgnY29yZS9lZGl0b3InKTtcblx0cmV0dXJuIHtcblx0XHRwb3N0VHlwZTogZ2V0RWRpdGVkUG9zdEF0dHJpYnV0ZSgndHlwZScpLFxuXHR9O1xufSkoTm90V2l0aFBvc3RUeXBlQ2hlY2spO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJsb2Rhc2hcIl07IiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJ3cFwiXVtcImRhdGFcIl07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgTm90V2l0aFBvc3RUeXBlQ2hlY2sgfSBmcm9tICcuL25vdC13aXRoLXBvc3QtdHlwZS1jaGVjayc7XG4iXSwibmFtZXMiOlsic29tZSIsImNhc3RBcnJheSIsIndpdGhTZWxlY3QiLCJOb3RXaXRoUG9zdFR5cGVDaGVjayIsInBvc3RUeXBlIiwiY2hpbGRyZW4iLCJleGNsdWRlZFBvc3RUeXBlU2x1Z3MiLCJpc0V4Y2x1ZGVkIiwidHlwZSIsInNlbGVjdCIsImdldEVkaXRlZFBvc3RBdHRyaWJ1dGUiLCJkZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==
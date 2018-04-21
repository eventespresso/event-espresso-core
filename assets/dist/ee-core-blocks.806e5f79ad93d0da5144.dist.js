this["eejs"] =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_index__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_index__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__editor_index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__widgets_index__ = __webpack_require__(6);




/***/ }),
/* 4 */
/***/ (function(module, exports) {



/***/ }),
/* 5 */
/***/ (function(module, exports) {



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_attendees__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_attendees___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__event_attendees__);


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

registerBlockType('event-espresso/widgets-event-attendees', {
  title: __('Event Attendees'),
  description: 'Displays a list of people that have registered for the specified event',
  icon: 'groups',
  category: 'widgets',
  keywords: [__('event'), __('attendees'), __('list')],
  useOnce: false,
  supports: {
    anchor: true
  },
  attributes: {
    content: {
      source: 'children',
      selector: 'p',
      type: 'string'
    }
  },
  // The "edit" property must be a valid function.
  edit: function edit(props) {
    console.log(props);
    return React.createElement(
      'div',
      { className: props.className },
      React.createElement(
        'p',
        null,
        'Event Editor'
      )
    );
  },

  // The "save" property must be specified and must be a valid function.
  //   <p>props.attributes.id</p>
  save: function save(props) {
    return React.createElement(
      'div',
      { className: props.className },
      React.createElement(
        'p',
        null,
        'Next Upcoming Event Datetime:'
      )
    );
  }
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDQ4NTY2ZjU0NTExYjExYTIxYzciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9ibG9ja3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9ibG9ja3Mvd2lkZ2V0cy9ldmVudC1hdHRlbmRlZXMuanMiXSwibmFtZXMiOlsiX18iLCJ3cCIsImkxOG4iLCJyZWdpc3RlckJsb2NrVHlwZSIsImJsb2NrcyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJpY29uIiwiY2F0ZWdvcnkiLCJrZXl3b3JkcyIsInVzZU9uY2UiLCJzdXBwb3J0cyIsImFuY2hvciIsImF0dHJpYnV0ZXMiLCJjb250ZW50Iiwic291cmNlIiwic2VsZWN0b3IiLCJ0eXBlIiwiZWRpdCIsInByb3BzIiwiY29uc29sZSIsImxvZyIsImNsYXNzTmFtZSIsInNhdmUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNET0EsRSxHQUFxQkMsR0FBR0MsSSxDQUF4QkYsRSxFQUE4Qjs7SUFDOUJHLGlCLEdBQXFCRixHQUFHRyxNLENBQXhCRCxpQixFQUFnQzs7QUFFdkNBLGtCQUNJLHdDQURKLEVBRUk7QUFDRUUsU0FBYUwsR0FBRyxpQkFBSCxDQURmO0FBRUVNLGVBQWEsd0VBRmY7QUFHRUMsUUFBYSxRQUhmO0FBSUVDLFlBQWEsU0FKZjtBQUtFQyxZQUFhLENBQUNULEdBQUcsT0FBSCxDQUFELEVBQWNBLEdBQUcsV0FBSCxDQUFkLEVBQStCQSxHQUFHLE1BQUgsQ0FBL0IsQ0FMZjtBQU1FVSxXQUFhLEtBTmY7QUFPRUMsWUFBYTtBQUNYQyxZQUFRO0FBREcsR0FQZjtBQVVFQyxjQUFhO0FBQ1hDLGFBQVM7QUFDUEMsY0FBUSxVQUREO0FBRVBDLGdCQUNRLEdBSEQ7QUFJUEMsWUFDUTtBQUxEO0FBREUsR0FWZjtBQW1CRTtBQUNBQyxRQUFhLGNBQVNDLEtBQVQsRUFBZ0I7QUFDM0JDLFlBQVFDLEdBQVIsQ0FBWUYsS0FBWjtBQUNBLFdBQ0k7QUFBQTtBQUFBLFFBQUssV0FBV0EsTUFBTUcsU0FBdEI7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREYsS0FESjtBQUtELEdBM0JIOztBQTZCRTtBQUNBO0FBQ0FDLFFBQU0sY0FBU0osS0FBVCxFQUFnQjtBQUNwQixXQUNJO0FBQUE7QUFBQSxRQUFLLFdBQVdBLE1BQU1HLFNBQXRCO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLEtBREo7QUFLRDtBQXJDSCxDQUZKLEUiLCJmaWxlIjoiZWUtY29yZS1ibG9ja3MuODA2ZTVmNzlhZDkzZDBkYTUxNDQuZGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQ0ODU2NmY1NDUxMWIxMWEyMWM3IiwiaW1wb3J0ICcuL2NvbW1vbi9pbmRleCc7XHJcbmltcG9ydCAnLi9lZGl0b3IvaW5kZXgnO1xyXG5pbXBvcnQgJy4vd2lkZ2V0cy9pbmRleCc7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9zcmMvYmxvY2tzL2luZGV4LmpzIiwiY29uc3Qge19ffSAgICAgICAgICAgICAgICA9IHdwLmkxOG47IC8vIEltcG9ydCBfXygpIGZyb20gd3AuaTE4blxyXG5jb25zdCB7cmVnaXN0ZXJCbG9ja1R5cGV9ID0gd3AuYmxvY2tzOyAvLyBJbXBvcnQgcmVnaXN0ZXJCbG9ja1R5cGUoKSBmcm9tIHdwLmJsb2Nrc1xyXG5cclxucmVnaXN0ZXJCbG9ja1R5cGUoXHJcbiAgICAnZXZlbnQtZXNwcmVzc28vd2lkZ2V0cy1ldmVudC1hdHRlbmRlZXMnLFxyXG4gICAge1xyXG4gICAgICB0aXRsZTogICAgICAgX18oJ0V2ZW50IEF0dGVuZGVlcycpLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ0Rpc3BsYXlzIGEgbGlzdCBvZiBwZW9wbGUgdGhhdCBoYXZlIHJlZ2lzdGVyZWQgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnQnLFxyXG4gICAgICBpY29uOiAgICAgICAgJ2dyb3VwcycsXHJcbiAgICAgIGNhdGVnb3J5OiAgICAnd2lkZ2V0cycsXHJcbiAgICAgIGtleXdvcmRzOiAgICBbX18oJ2V2ZW50JyksIF9fKCdhdHRlbmRlZXMnKSwgX18oJ2xpc3QnKV0sXHJcbiAgICAgIHVzZU9uY2U6ICAgICBmYWxzZSxcclxuICAgICAgc3VwcG9ydHM6ICAgIHtcclxuICAgICAgICBhbmNob3I6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIGF0dHJpYnV0ZXM6ICB7XHJcbiAgICAgICAgY29udGVudDoge1xyXG4gICAgICAgICAgc291cmNlOiAnY2hpbGRyZW4nLFxyXG4gICAgICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgICAgICAgICAgICdwJyxcclxuICAgICAgICAgIHR5cGU6XHJcbiAgICAgICAgICAgICAgICAgICdzdHJpbmcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIFRoZSBcImVkaXRcIiBwcm9wZXJ0eSBtdXN0IGJlIGEgdmFsaWQgZnVuY3Rpb24uXHJcbiAgICAgIGVkaXQ6ICAgICAgICBmdW5jdGlvbihwcm9wcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHByb3BzKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfT5cclxuICAgICAgICAgICAgICA8cD5FdmVudCBFZGl0b3I8L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyBUaGUgXCJzYXZlXCIgcHJvcGVydHkgbXVzdCBiZSBzcGVjaWZpZWQgYW5kIG11c3QgYmUgYSB2YWxpZCBmdW5jdGlvbi5cclxuICAgICAgLy8gICA8cD5wcm9wcy5hdHRyaWJ1dGVzLmlkPC9wPlxyXG4gICAgICBzYXZlOiBmdW5jdGlvbihwcm9wcykge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9PlxyXG4gICAgICAgICAgICAgIDxwPk5leHQgVXBjb21pbmcgRXZlbnQgRGF0ZXRpbWU6PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuKTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9zcmMvYmxvY2tzL3dpZGdldHMvZXZlbnQtYXR0ZW5kZWVzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
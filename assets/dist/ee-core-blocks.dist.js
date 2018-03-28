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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_index__ = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__next_upcoming_event_datetime__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__next_upcoming_event_datetime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__next_upcoming_event_datetime__);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks

registerBlockType('event-espresso/common-next-upcoming-event-datetime', {
  title: __('Next Upcoming Event Datetime'),
  description: 'Displays the next upcoming active datetime for an event',
  icon: 'calendar-alt',
  category: 'common',
  keywords: [__('event'), __('date'), __('datetime')],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDBkMGY5YmM5ZTg0YzI5YTk5ODYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9ibG9ja3MvY29tbW9uL25leHQtdXBjb21pbmctZXZlbnQtZGF0ZXRpbWUuanMiXSwibmFtZXMiOlsiX18iLCJ3cCIsImkxOG4iLCJyZWdpc3RlckJsb2NrVHlwZSIsImJsb2NrcyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJpY29uIiwiY2F0ZWdvcnkiLCJrZXl3b3JkcyIsInVzZU9uY2UiLCJzdXBwb3J0cyIsImFuY2hvciIsImF0dHJpYnV0ZXMiLCJjb250ZW50Iiwic291cmNlIiwic2VsZWN0b3IiLCJ0eXBlIiwiZWRpdCIsInByb3BzIiwiY29uc29sZSIsImxvZyIsImNsYXNzTmFtZSIsInNhdmUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUM3RE9BLEUsR0FBcUJDLEdBQUdDLEksQ0FBeEJGLEUsRUFBOEI7O0lBQzlCRyxpQixHQUFxQkYsR0FBR0csTSxDQUF4QkQsaUIsRUFBZ0M7O0FBRXZDQSxrQkFDSSxvREFESixFQUVJO0FBQ0VFLFNBQVlMLEdBQUcsOEJBQUgsQ0FEZDtBQUVFTSxlQUFhLHlEQUZmO0FBR0VDLFFBQVksY0FIZDtBQUlFQyxZQUFZLFFBSmQ7QUFLRUMsWUFBVSxDQUFDVCxHQUFHLE9BQUgsQ0FBRCxFQUFjQSxHQUFHLE1BQUgsQ0FBZCxFQUEwQkEsR0FBRyxVQUFILENBQTFCLENBTFo7QUFNRVUsV0FBVSxLQU5aO0FBT0VDLFlBQVU7QUFDUkMsWUFBUTtBQURBLEdBUFo7QUFVRUMsY0FBWTtBQUNWQyxhQUFTO0FBQ1BDLGNBQVEsVUFERDtBQUVQQyxnQkFDUSxHQUhEO0FBSVBDLFlBQ1E7QUFMRDtBQURDLEdBVmQ7QUFtQkU7QUFDQUMsUUFBTSxjQUFTQyxLQUFULEVBQWdCO0FBQ3BCQyxZQUFRQyxHQUFSLENBQVlGLEtBQVo7QUFDQSxXQUNJO0FBQUE7QUFBQSxRQUFLLFdBQVdBLE1BQU1HLFNBQXRCO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLEtBREo7QUFLRCxHQTNCSDs7QUE2QkU7QUFDQTtBQUNBQyxRQUFNLGNBQVNKLEtBQVQsRUFBZ0I7QUFDcEIsV0FDSTtBQUFBO0FBQUEsUUFBSyxXQUFXQSxNQUFNRyxTQUF0QjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixLQURKO0FBS0Q7QUFyQ0gsQ0FGSixFIiwiZmlsZSI6ImVlLWNvcmUtYmxvY2tzLmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkMGQwZjliYzllODRjMjlhOTk4NiIsImNvbnN0IHtfX30gICAgICAgICAgICAgICAgPSB3cC5pMThuOyAvLyBJbXBvcnQgX18oKSBmcm9tIHdwLmkxOG5cclxuY29uc3Qge3JlZ2lzdGVyQmxvY2tUeXBlfSA9IHdwLmJsb2NrczsgLy8gSW1wb3J0IHJlZ2lzdGVyQmxvY2tUeXBlKCkgZnJvbSB3cC5ibG9ja3NcclxuXHJcbnJlZ2lzdGVyQmxvY2tUeXBlKFxyXG4gICAgJ2V2ZW50LWVzcHJlc3NvL2NvbW1vbi1uZXh0LXVwY29taW5nLWV2ZW50LWRhdGV0aW1lJyxcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICAgICAgX18oJ05leHQgVXBjb21pbmcgRXZlbnQgRGF0ZXRpbWUnKSxcclxuICAgICAgZGVzY3JpcHRpb246ICdEaXNwbGF5cyB0aGUgbmV4dCB1cGNvbWluZyBhY3RpdmUgZGF0ZXRpbWUgZm9yIGFuIGV2ZW50JyxcclxuICAgICAgaWNvbjogICAgICAgJ2NhbGVuZGFyLWFsdCcsXHJcbiAgICAgIGNhdGVnb3J5OiAgICdjb21tb24nLFxyXG4gICAgICBrZXl3b3JkczogW19fKCdldmVudCcpLCBfXygnZGF0ZScpLCBfXygnZGF0ZXRpbWUnKV0sXHJcbiAgICAgIHVzZU9uY2U6ICBmYWxzZSxcclxuICAgICAgc3VwcG9ydHM6IHtcclxuICAgICAgICBhbmNob3I6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICBjb250ZW50OiB7XHJcbiAgICAgICAgICBzb3VyY2U6ICdjaGlsZHJlbicsXHJcbiAgICAgICAgICBzZWxlY3RvcjpcclxuICAgICAgICAgICAgICAgICAgJ3AnLFxyXG4gICAgICAgICAgdHlwZTpcclxuICAgICAgICAgICAgICAgICAgJ3N0cmluZycsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgLy8gVGhlIFwiZWRpdFwiIHByb3BlcnR5IG11c3QgYmUgYSB2YWxpZCBmdW5jdGlvbi5cclxuICAgICAgZWRpdDogZnVuY3Rpb24ocHJvcHMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhwcm9wcyk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX0+XHJcbiAgICAgICAgICAgICAgPHA+RXZlbnQgRWRpdG9yPC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8gVGhlIFwic2F2ZVwiIHByb3BlcnR5IG11c3QgYmUgc3BlY2lmaWVkIGFuZCBtdXN0IGJlIGEgdmFsaWQgZnVuY3Rpb24uXHJcbiAgICAgIC8vICAgPHA+cHJvcHMuYXR0cmlidXRlcy5pZDwvcD5cclxuICAgICAgc2F2ZTogZnVuY3Rpb24ocHJvcHMpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cHJvcHMuY2xhc3NOYW1lfT5cclxuICAgICAgICAgICAgICA8cD5OZXh0IFVwY29taW5nIEV2ZW50IERhdGV0aW1lOjwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbik7XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvc3JjL2Jsb2Nrcy9jb21tb24vbmV4dC11cGNvbWluZy1ldmVudC1kYXRldGltZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=
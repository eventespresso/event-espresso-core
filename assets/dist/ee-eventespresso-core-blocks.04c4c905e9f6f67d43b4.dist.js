(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["eventespresso-core-blocks"],{

/***/ "./assets/src/blocks/index.js":
/*!************************************!*\
  !*** ./assets/src/blocks/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./widgets */ "./assets/src/blocks/widgets/index.js");


/***/ }),

/***/ "./assets/src/blocks/widgets/event-attendees/block.js":
/*!************************************************************!*\
  !*** ./assets/src/blocks/widgets/event-attendees/block.js ***!
  \************************************************************/
/*! exports provided: EventAttendees, default */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: C:/VVV/www/wordpress-default/public_html/wp-content/plugins/event-espresso-core/assets/src/blocks/widgets/event-attendees/block.js: Unexpected token (67:6)\n\n\u001b[0m \u001b[90m 65 | \u001b[39m\t\t\t\t\u001b[33m<\u001b[39m\u001b[33mul\u001b[39m className\u001b[33m=\u001b[39m\u001b[32m\"event-attendees-ul\"\u001b[39m\u001b[33m>\u001b[39m\n \u001b[90m 66 | \u001b[39m\t\t\t\t\t{ attendees\u001b[33m.\u001b[39mmap( ( attendee\u001b[33m,\u001b[39m i ) \u001b[33m=>\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 67 | \u001b[39m\t\t\t\t\t\t\u001b[36mconst\u001b[39m attendeeAvatar \u001b[33m=\u001b[39m {\n \u001b[90m    | \u001b[39m\t\t\t\t\t\t\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 68 | \u001b[39m\t\t\t\t\t\tbaseClass\u001b[33m:\u001b[39m \u001b[32m\"event-attendee\"\u001b[39m\u001b[33m,\u001b[39m\n \u001b[90m 69 | \u001b[39m\t\t\t\t\t\turl\u001b[33m:\u001b[39m attendee\u001b[33m.\u001b[39m_calculated_fields\u001b[33m.\u001b[39muserAvatar\u001b[33m,\u001b[39m\n \u001b[90m 70 | \u001b[39m\t\t\t\t\t}\u001b[0m\n");

/***/ }),

/***/ "./assets/src/blocks/widgets/event-attendees/index.js":
/*!************************************************************!*\
  !*** ./assets/src/blocks/widgets/event-attendees/index.js ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block */ "./assets/src/blocks/widgets/event-attendees/block.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./assets/src/blocks/widgets/event-attendees/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress dependencies
 */


/**
 * External dependencies
 */


/**
 * Internal dependencies
 */



Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])('eventespresso/widgets-event-attendees', {
	title: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Event Attendees', 'event_espresso'),
	description: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Displays a list of people that have registered for the specified event', 'event_espresso'),
	icon: 'groups',
	category: 'widgets',
	keywords: [Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('event', 'event_espresso'), Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('attendees', 'event_espresso'), Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('list', 'event_espresso')],
	useOnce: false,
	supports: {
		anchor: true
	},
	edit: _block__WEBPACK_IMPORTED_MODULE_2__["default"],
	save: function save() {
		return null;
	}
});

/***/ }),

/***/ "./assets/src/blocks/widgets/event-attendees/style.css":
/*!*************************************************************!*\
  !*** ./assets/src/blocks/widgets/event-attendees/style.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"editor":"editor","event-attendees-ul":"event-attendees-ul","event-attendee-avatar-img":"event-attendee-avatar-img"};

/***/ }),

/***/ "./assets/src/blocks/widgets/index.js":
/*!********************************************!*\
  !*** ./assets/src/blocks/widgets/index.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _event_attendees__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event-attendees */ "./assets/src/blocks/widgets/event-attendees/index.js");


/***/ }),

/***/ 4:
/*!******************************************!*\
  !*** multi ./assets/src/blocks/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./assets/src/blocks/index.js */"./assets/src/blocks/index.js");


/***/ }),

/***/ "@eventespresso/i18n":
/*!****************************!*\
  !*** external "eejs.i18n" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.i18n;

/***/ }),

/***/ "@wordpress/blocks":
/*!****************************!*\
  !*** external "wp.blocks" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp.blocks;

/***/ })

},[[4,"manifest"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvc3JjL2Jsb2Nrcy93aWRnZXRzL2V2ZW50LWF0dGVuZGVlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3JjL2Jsb2Nrcy93aWRnZXRzL2V2ZW50LWF0dGVuZGVlcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZWVqcy5pMThuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid3AuYmxvY2tzXCIiXSwibmFtZXMiOlsicmVnaXN0ZXJCbG9ja1R5cGUiLCJ0aXRsZSIsIl9fIiwiZGVzY3JpcHRpb24iLCJpY29uIiwiY2F0ZWdvcnkiLCJrZXl3b3JkcyIsInVzZU9uY2UiLCJzdXBwb3J0cyIsImFuY2hvciIsImVkaXQiLCJzYXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTs7O0FBR0E7O0FBRUE7OztBQUdBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBLDJFQUFBQSxDQUNDLHVDQURELEVBRUM7QUFDQ0MsUUFBTyw4REFBQUMsQ0FBSSxpQkFBSixFQUF1QixnQkFBdkIsQ0FEUjtBQUVDQyxjQUFhLDhEQUFBRCxDQUNaLHdFQURZLEVBRVosZ0JBRlksQ0FGZDtBQU1DRSxPQUFNLFFBTlA7QUFPQ0MsV0FBVSxTQVBYO0FBUUNDLFdBQVUsQ0FDVCw4REFBQUosQ0FBSSxPQUFKLEVBQWEsZ0JBQWIsQ0FEUyxFQUVULDhEQUFBQSxDQUFJLFdBQUosRUFBaUIsZ0JBQWpCLENBRlMsRUFHVCw4REFBQUEsQ0FBSSxNQUFKLEVBQVksZ0JBQVosQ0FIUyxDQVJYO0FBYUNLLFVBQVMsS0FiVjtBQWNDQyxXQUFVO0FBQ1RDLFVBQVE7QUFEQyxFQWRYO0FBaUJDQyxPQUFNLDhDQWpCUDtBQWtCQ0MsS0FsQkQsa0JBa0JRO0FBQ04sU0FBTyxJQUFQO0FBQ0E7QUFwQkYsQ0FGRCxFOzs7Ozs7Ozs7OztBQ2hCQTtBQUNBLGtCQUFrQixxSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RsQiwyQjs7Ozs7Ozs7Ozs7QUNBQSwyQiIsImZpbGUiOiJlZS1ldmVudGVzcHJlc3NvLWNvcmUtYmxvY2tzLjA0YzRjOTA1ZTlmNmY2N2Q0M2I0LmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSBmcm9tICdAd29yZHByZXNzL2Jsb2Nrcyc7XHJcblxyXG4vKipcclxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IEV2ZW50QXR0ZW5kZWVzIGZyb20gJy4vYmxvY2snO1xyXG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcclxuXHJcbnJlZ2lzdGVyQmxvY2tUeXBlKFxyXG5cdCdldmVudGVzcHJlc3NvL3dpZGdldHMtZXZlbnQtYXR0ZW5kZWVzJyxcclxuXHR7XHJcblx0XHR0aXRsZTogX18oICdFdmVudCBBdHRlbmRlZXMnLCAnZXZlbnRfZXNwcmVzc28nICksXHJcblx0XHRkZXNjcmlwdGlvbjogX18oXHJcblx0XHRcdCdEaXNwbGF5cyBhIGxpc3Qgb2YgcGVvcGxlIHRoYXQgaGF2ZSByZWdpc3RlcmVkIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50JyxcclxuXHRcdFx0J2V2ZW50X2VzcHJlc3NvJyxcclxuXHRcdCksXHJcblx0XHRpY29uOiAnZ3JvdXBzJyxcclxuXHRcdGNhdGVnb3J5OiAnd2lkZ2V0cycsXHJcblx0XHRrZXl3b3JkczogW1xyXG5cdFx0XHRfXyggJ2V2ZW50JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxyXG5cdFx0XHRfXyggJ2F0dGVuZGVlcycsICdldmVudF9lc3ByZXNzbycgKSxcclxuXHRcdFx0X18oICdsaXN0JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxyXG5cdFx0XSxcclxuXHRcdHVzZU9uY2U6IGZhbHNlLFxyXG5cdFx0c3VwcG9ydHM6IHtcclxuXHRcdFx0YW5jaG9yOiB0cnVlLFxyXG5cdFx0fSxcclxuXHRcdGVkaXQ6IEV2ZW50QXR0ZW5kZWVzLFxyXG5cdFx0c2F2ZSgpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9LFxyXG5cdH0sXHJcbik7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcImVkaXRvclwiOlwiZWRpdG9yXCIsXCJldmVudC1hdHRlbmRlZXMtdWxcIjpcImV2ZW50LWF0dGVuZGVlcy11bFwiLFwiZXZlbnQtYXR0ZW5kZWUtYXZhdGFyLWltZ1wiOlwiZXZlbnQtYXR0ZW5kZWUtYXZhdGFyLWltZ1wifTsiLCJtb2R1bGUuZXhwb3J0cyA9IGVlanMuaTE4bjsiLCJtb2R1bGUuZXhwb3J0cyA9IHdwLmJsb2NrczsiXSwic291cmNlUm9vdCI6IiJ9
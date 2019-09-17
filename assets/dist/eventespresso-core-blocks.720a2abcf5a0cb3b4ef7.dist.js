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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/blocks/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/blocks/constants.js":
/*!****************************************!*\
  !*** ./assets/src/blocks/constants.js ***!
  \****************************************/
/*! exports provided: CSS_CLASS_CORE_BLOCKS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSS_CLASS_CORE_BLOCKS", function() { return CSS_CLASS_CORE_BLOCKS; });
var CSS_CLASS_CORE_BLOCKS = 'ee-core-blocks event-espresso-blocks';

/***/ }),

/***/ "./assets/src/blocks/event-attendees/edit.js":
/*!***************************************************!*\
  !*** ./assets/src/blocks/event-attendees/edit.js ***!
  \***************************************************/
/*! exports provided: EventAttendeesEditor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventAttendeesEditor", function() { return EventAttendeesEditor; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _eventespresso_editor_hocs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @eventespresso/editor-hocs */ "@eventespresso/editor-hocs");
/* harmony import */ var _eventespresso_editor_hocs__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_editor_hocs__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _eventespresso_model__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @eventespresso/model */ "@eventespresso/model");
/* harmony import */ var _eventespresso_model__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_model__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../constants */ "./assets/src/blocks/constants.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */










/**
 * Internal dependencies
 */


var defaultQueryData = {
  showExpired: true,
  limit: 50
};

var isNewBlock = function isNewBlock(_ref) {
  var eventId = _ref.eventId,
      datetimeId = _ref.datetimeId,
      ticketId = _ref.ticketId;
  return eventId === 0 && datetimeId === 0 && ticketId === 0;
};

var DEFAULT_ARRAY = [];
var highestRequestedLimit = 200;
/**
 * EventAttendeesEditor Component
 *
 * This returns the component for the `edit` argument on the `EventAttendees`
 * Block.
 */

var EventAttendeesEditor =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(EventAttendeesEditor, _Component);

  /**
   * @param {Object} props
   */
  function EventAttendeesEditor(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, EventAttendeesEditor);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(EventAttendeesEditor).call(this, props));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "setEventId", function (eventId) {
      var value = eventId !== null && eventId.value ? parseInt(eventId.value, 10) : 0;

      _this.props.setAttributes({
        eventId: value,
        datetimeId: 0,
        ticketId: 0
      });

      _this.setState({
        datetimeQueryData: _objectSpread({}, _this.state.datetimeQueryData, {
          forEventId: value
        })
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "setDatetimeId", function (datetimeId) {
      var value = datetimeId !== null && datetimeId.value ? parseInt(datetimeId.value, 10) : 0;

      _this.props.setAttributes({
        datetimeId: value,
        ticketId: 0
      });

      _this.setState({
        ticketQueryData: _objectSpread({}, _this.state.ticketQueryData, {
          forDatetimeId: value
        })
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "setTicketId", function (ticketId) {
      var value = ticketId !== null && ticketId.value ? parseInt(ticketId.value, 10) : 0;

      _this.props.setAttributes({
        ticketId: value
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "setStatus", function (status) {
      var value = status !== null && status.value ? status.value : _eventespresso_model__WEBPACK_IMPORTED_MODULE_16__["statusModel"].REGISTRATION_STATUS_ID.APPROVED;

      _this.props.setAttributes({
        status: value
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "setLimit", function (limit) {
      _this.props.setAttributes({
        limit: parseInt(limit, 10)
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "setOrderBy", function (orderBy) {
      _this.props.setAttributes({
        orderBy: orderBy
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "setOrder", function (order) {
      _this.props.setAttributes({
        order: order
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "setAvatarSize", function (size) {
      _this.props.setAttributes({
        avatarSize: parseInt(size, 10)
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "toggleShowGravatar", function (showGravatar) {
      _this.props.setAttributes({
        showGravatar: showGravatar
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "toggleDisplayOnArchives", function (displayOnArchives) {
      _this.props.setAttributes({
        displayOnArchives: displayOnArchives
      });
    });

    var _this$props$attribute = _this.props.attributes,
        _eventId = _this$props$attribute.eventId,
        _datetimeId = _this$props$attribute.datetimeId;
    _this.state = {
      eventQueryData: _objectSpread({}, defaultQueryData),
      datetimeQueryData: _objectSpread({}, defaultQueryData, {
        forEventId: _eventId
      }),
      ticketQueryData: _objectSpread({}, defaultQueryData, {
        forDatetimeId: _datetimeId
      }),
      statusQueryData: _objectSpread({}, defaultQueryData, {
        statusType: _eventespresso_model__WEBPACK_IMPORTED_MODULE_16__["statusModel"].STATUS_TYPE_REGISTRATION
      })
    };
    return _this;
  }
  /**
   * Set eventId on attributes
   * @param {Object} eventId
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(EventAttendeesEditor, [{
    key: "getAttendeesDisplay",

    /**
     * Retrieve the Attendees List component for the given attributes
     * @return {Component} What to display for the attendee display.
     */
    value: function getAttendeesDisplay() {
      var _this$props = this.props,
          isLoading = _this$props.isLoading,
          attendees = _this$props.attendees;
      var _this$props$attribute2 = this.props.attributes,
          showGravatar = _this$props$attribute2.showGravatar,
          avatarSize = _this$props$attribute2.avatarSize,
          avatarClass = _this$props$attribute2.avatarClass;
      var avatarOptions = {
        avatarWidth: avatarSize,
        avatarHeight: avatarSize,
        avatarClass: avatarClass
      };

      if (isLoading) {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["Placeholder"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["Spinner"], null));
      }

      if (isNewBlock(this.props.attributes) && attendees === DEFAULT_ARRAY) {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["Placeholder"], null, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('To get started, select what event you want to show attendees from in the block settings.', 'event_espresso'));
      }

      if (!isLoading && Object(lodash__WEBPACK_IMPORTED_MODULE_9__["isEmpty"])(attendees)) {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["Placeholder"], null, Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('There are no attendees for selected options.', 'event_espresso'));
      }

      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_eventespresso_components__WEBPACK_IMPORTED_MODULE_13__["EventAttendeeList"], {
        attendees: this.applyLimit(attendees),
        showGravatar: showGravatar,
        avatarOptions: avatarOptions,
        isLoading: isLoading,
        containerCssClass: _constants__WEBPACK_IMPORTED_MODULE_17__["CSS_CLASS_CORE_BLOCKS"],
        containerId: 'ee-block-event-attendees'
      });
    }
    /**
     * This receives the array of attendees and applies the limit to it so that
     * only the set limit of attendees is returned from the beginning of the
     * array.
     * @param {Array} attendees
     * @return {Array} A new array of attendees with the applied limit
     */

  }, {
    key: "applyLimit",
    value: function applyLimit(attendees) {
      if (attendees.length <= this.props.attributes.limit) {
        return attendees;
      }

      return attendees.slice(0, this.props.attributes.limit);
    }
    /**
     * Returns inspector controls for the block.
     *
     * @param {Object} attributes
     * @return {Component} The inspector controls component
     */

  }, {
    key: "getInspectorControls",
    value: function getInspectorControls(attributes) {
      var countAttendees = this.props.attendees.length || 0;
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_editor__WEBPACK_IMPORTED_MODULE_12__["InspectorControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["PanelBody"], {
        title: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Filter By Settings', 'event_espresso')
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_eventespresso_components__WEBPACK_IMPORTED_MODULE_13__["EditorEventSelect"], {
        key: "attendees-event-select",
        selected: attributes.eventId,
        onSelect: this.setEventId,
        queryData: this.state.eventQueryData
      }), attributes.eventId !== 0 && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_eventespresso_components__WEBPACK_IMPORTED_MODULE_13__["EditorDatetimeSelect"], {
        key: "attendees-datetime-select",
        selected: attributes.datetimeId,
        onSelect: this.setDatetimeId,
        queryData: this.state.datetimeQueryData
      }), attributes.datetimeId !== 0 && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_eventespresso_components__WEBPACK_IMPORTED_MODULE_13__["EditorTicketSelect"], {
        key: "attendees-ticket-select",
        selected: attributes.ticketId,
        onSelect: this.setTicketId,
        queryData: this.state.ticketQueryData
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_eventespresso_components__WEBPACK_IMPORTED_MODULE_13__["EditorStatusSelect"], {
        key: "attendees-status-select",
        selected: attributes.status,
        onSelect: this.setStatus,
        queryData: this.state.statusQueryData,
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Select Registration Status', 'event_espresso')
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_eventespresso_components__WEBPACK_IMPORTED_MODULE_13__["QueryLimit"], {
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Number of Attendees to Display:', 'event_espresso'),
        limit: attributes.limit,
        onLimitChange: this.setLimit,
        min: 1,
        withSlider: false,
        help: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["sprintf"])(Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["_n"])('Used to adjust the number of attendees displayed (There is %d total attendee for the current filter settings).', 'Used to adjust the number of attendees displayed (There are %d total attendees for the current filter settings).', countAttendees, 'event_espresso'), countAttendees)
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["SelectControl"], {
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Order Attendees by:', 'event_espresso'),
        value: attributes.orderBy,
        options: [{
          label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Attendee id', 'event_espresso'),
          value: 'id'
        }, {
          label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Last name only', 'event_espresso'),
          value: 'lastNameOnly'
        }, {
          label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('First name only', 'event_espresso'),
          value: 'firstNameOnly'
        }, {
          label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('First, then Last name', 'event_espresso'),
          value: 'firstThenLastName'
        }, {
          label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Last, then First name', 'event_espresso'),
          value: 'lastThenFirstName'
        }],
        onChange: this.setOrderBy
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["SelectControl"], {
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Sort order:', 'event_espresso'),
        value: attributes.order,
        options: [{
          label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Ascending', 'event_espresso'),
          value: _eventespresso_model__WEBPACK_IMPORTED_MODULE_16__["QUERY_ORDER_ASC"]
        }, {
          label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Descending', 'event_espresso'),
          value: _eventespresso_model__WEBPACK_IMPORTED_MODULE_16__["QUERY_ORDER_DESC"]
        }],
        onChange: this.setOrder
      })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["PanelBody"], {
        title: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Gravatar Setttings', 'event_espresso')
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["ToggleControl"], {
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Display Gravatar', 'event_espresso'),
        checked: attributes.showGravatar,
        onChange: this.toggleShowGravatar,
        help: attributes.showGravatar ? Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Gravatar images are shown for each attendee.', 'event_espresso') : Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('No gravatar images are shown for each attendee.', 'event_espresso')
      }), attributes.showGravatar && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["RangeControl"], {
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Size of Gravatar', 'event_espresso'),
        value: attributes.avatarSize,
        min: 10,
        max: 128,
        onChange: this.setAvatarSize
      })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_eventespresso_editor_hocs__WEBPACK_IMPORTED_MODULE_14__["NotWithPostTypeCheck"], {
        excludedPostTypeSlugs: 'page'
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["PanelBody"], {
        title: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Archive Settings', 'event_espresso')
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["ToggleControl"], {
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Display on Archives', 'event_espresso'),
        checked: attributes.displayOnArchives,
        onChange: this.toggleDisplayOnArchives,
        help: attributes.displayOnArchives ? Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Attendees are shown whenever this post is listed in an archive view.', 'event_espresso') : Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_15__["__"])('Attendees are hidden whenever this post is listed in an archive view.', 'event_espresso')
      }))));
    }
  }, {
    key: "render",
    value: function render() {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["Fragment"], null, this.getAttendeesDisplay(), this.getInspectorControls(this.props.attributes));
    }
  }]);

  return EventAttendeesEditor;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["Component"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(EventAttendeesEditor, "propTypes", {
  attendees: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.array,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool,
  attributes: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.shape({
    eventId: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number,
    datetimeId: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number,
    ticketId: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number,
    status: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
    showGravatar: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool,
    displayOnArchives: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool,
    limit: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number,
    orderBy: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.oneOf(['id', 'lastNameOnly', 'firstNameOnly', 'firstThenLastName', 'lastThenFirstName']),
    order: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.oneOf(_eventespresso_model__WEBPACK_IMPORTED_MODULE_16__["ALLOWED_ORDER_VALUES"]),
    avatarSize: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number,
    avatarClass: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string
  })
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(EventAttendeesEditor, "defaultProps", {
  attendees: [],
  isLoading: true,
  attributes: {
    eventId: 0,
    datetimeId: 0,
    ticketId: 0,
    status: _eventespresso_model__WEBPACK_IMPORTED_MODULE_16__["statusModel"].REGISTRATION_STATUS_ID.APPROVED,
    showGravatar: true,
    displayOnArchives: false,
    limit: 100,
    orderBy: 'lastThenFirstName',
    order: _eventespresso_model__WEBPACK_IMPORTED_MODULE_16__["QUERY_ORDER_ASC"],
    avatarSize: 24,
    avatarClass: 'contact'
  }
});

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_11__["withSelect"])(function (select, ownProps) {
  var defaultProps = _objectSpread({}, EventAttendeesEditor.defaultProps.attributes);

  var _ownProps$attributes = ownProps.attributes,
      _ownProps$attributes$ = _ownProps$attributes.eventId,
      eventId = _ownProps$attributes$ === void 0 ? defaultProps.eventId : _ownProps$attributes$,
      _ownProps$attributes$2 = _ownProps$attributes.datetimeId,
      datetimeId = _ownProps$attributes$2 === void 0 ? defaultProps.datetimeId : _ownProps$attributes$2,
      _ownProps$attributes$3 = _ownProps$attributes.ticketId,
      ticketId = _ownProps$attributes$3 === void 0 ? defaultProps.ticketId : _ownProps$attributes$3,
      _ownProps$attributes$4 = _ownProps$attributes.status,
      status = _ownProps$attributes$4 === void 0 ? defaultProps.status : _ownProps$attributes$4,
      _ownProps$attributes$5 = _ownProps$attributes.orderBy,
      orderBy = _ownProps$attributes$5 === void 0 ? defaultProps.orderBy : _ownProps$attributes$5,
      _ownProps$attributes$6 = _ownProps$attributes.order,
      order = _ownProps$attributes$6 === void 0 ? defaultProps.order : _ownProps$attributes$6,
      _ownProps$attributes$7 = _ownProps$attributes.limit,
      limit = _ownProps$attributes$7 === void 0 ? defaultProps.limit : _ownProps$attributes$7; // This ensures that we don't query unnecessarily since if the limit is
  // lower than a query we've already done, then we already have cached data
  // for this limit (and cache is still busted by any other query changes)

  highestRequestedLimit = !limit || isNaN(limit) || limit <= highestRequestedLimit ? highestRequestedLimit : limit;
  var queryData = {
    forEventId: eventId,
    forDatetimeId: datetimeId,
    forTicketId: ticketId,
    forStatusId: status,
    showGravatar: true,
    defaultWhereConditions: 'full_this_minimum_others',
    order: order,
    orderBy: orderBy,
    limit: highestRequestedLimit
  };
  var queryString = _eventespresso_model__WEBPACK_IMPORTED_MODULE_16__["attendeeModel"].getQueryString(queryData);

  var _select = select('eventespresso/lists'),
      getAttendees = _select.getAttendees,
      isRequestingAttendees = _select.isRequestingAttendees;

  return _objectSpread({}, EventAttendeesEditor.defaultProps, {}, ownProps, {
    attributes: _objectSpread({}, EventAttendeesEditor.defaultProps.attributes, {}, ownProps.attributes),
    attendees: isNewBlock({
      eventId: eventId,
      datetimeId: datetimeId,
      ticketId: ticketId
    }) ? DEFAULT_ARRAY : getAttendees(queryString),
    isLoading: isRequestingAttendees(queryString)
  });
})(EventAttendeesEditor));

/***/ }),

/***/ "./assets/src/blocks/event-attendees/index.js":
/*!****************************************************!*\
  !*** ./assets/src/blocks/event-attendees/index.js ***!
  \****************************************************/
/*! exports provided: name, settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "name", function() { return name; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./assets/src/blocks/event-attendees/edit.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./assets/src/blocks/event-attendees/style.css");
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



var name = 'eventespresso/event-attendees';
var settings = {
  title: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Event Attendees', 'event_espresso'),
  description: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Displays a list of people that have registered for the specified event', 'event_espresso'),
  icon: 'groups',
  category: 'event-espresso',
  keywords: [Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('event', 'event_espresso'), Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('attendees', 'event_espresso'), Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('list', 'event_espresso')],
  attributes: {
    eventId: {
      type: 'number',
      default: 0
    },
    datetimeId: {
      type: 'number',
      default: 0
    },
    ticketId: {
      type: 'number',
      default: 0
    },
    status: {
      type: 'string',
      default: 'RAP'
    },
    limit: {
      type: 'number',
      default: 100
    },
    order: {
      type: 'string',
      default: 'ASC'
    },
    orderBy: {
      type: 'string',
      default: 'lastThenFirstName'
    },
    showGravatar: {
      type: 'boolean',
      default: false
    },
    avatarClass: {
      type: 'string',
      default: 'contact'
    },
    avatarSize: {
      type: 'number',
      default: 24
    },
    displayOnArchives: {
      type: 'boolean',
      default: false
    }
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: function save() {
    return null;
  }
};
Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])(name, settings);

/***/ }),

/***/ "./assets/src/blocks/event-attendees/style.css":
/*!*****************************************************!*\
  !*** ./assets/src/blocks/event-attendees/style.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/src/blocks/index.js":
/*!************************************!*\
  !*** ./assets/src/blocks/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _event_attendees__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event-attendees */ "./assets/src/blocks/event-attendees/index.js");


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

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

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;
          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;
              default:
                return $$typeof;
            }
        }
      case REACT_LAZY_TYPE:
      case REACT_MEMO_TYPE:
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}

// AsyncMode is deprecated along with isAsyncMode
var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;

var hasWarnedAboutDeprecatedIsAsyncMode = false;

// AsyncMode should be deprecated
function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }
  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.typeOf = typeOf;
exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isValidElementType = isValidElementType;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "@eventespresso/components":
/*!***********************************************!*\
  !*** external {"this":["eejs","components"]} ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["components"]; }());

/***/ }),

/***/ "@eventespresso/editor-hocs":
/*!***********************************************!*\
  !*** external {"this":["eejs","editorHocs"]} ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["editorHocs"]; }());

/***/ }),

/***/ "@eventespresso/i18n":
/*!*****************************************!*\
  !*** external {"this":["eejs","i18n"]} ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["i18n"]; }());

/***/ }),

/***/ "@eventespresso/model":
/*!******************************************!*\
  !*** external {"this":["eejs","model"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["eejs"]["model"]; }());

/***/ }),

/***/ "@wordpress/blocks":
/*!*****************************************!*\
  !*** external {"this":["wp","blocks"]} ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["blocks"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!*********************************************!*\
  !*** external {"this":["wp","components"]} ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["components"]; }());

/***/ }),

/***/ "@wordpress/data":
/*!***************************************!*\
  !*** external {"this":["wp","data"]} ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["data"]; }());

/***/ }),

/***/ "@wordpress/editor":
/*!*****************************************!*\
  !*** external {"this":["wp","editor"]} ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["editor"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!******************************************!*\
  !*** external {"this":["wp","element"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["element"]; }());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9ibG9ja3MvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvYmxvY2tzL2V2ZW50LWF0dGVuZGVlcy9lZGl0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvYmxvY2tzL2V2ZW50LWF0dGVuZGVlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3JjL2Jsb2Nrcy9ldmVudC1hdHRlbmRlZXMvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvYmxvY2tzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9ub2RlX21vZHVsZXMvcmVhY3QtaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJjb21wb25lbnRzXCJdfSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1widGhpc1wiOltcImVlanNcIixcImVkaXRvckhvY3NcIl19Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wiZWVqc1wiLFwiaTE4blwiXX0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInRoaXNcIjpbXCJlZWpzXCIsXCJtb2RlbFwiXX0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInRoaXNcIjpbXCJ3cFwiLFwiYmxvY2tzXCJdfSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJjb21wb25lbnRzXCJdfSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJkYXRhXCJdfSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1widGhpc1wiOltcIndwXCIsXCJlZGl0b3JcIl19Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJ0aGlzXCI6W1wid3BcIixcImVsZW1lbnRcIl19Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJ0aGlzXCI6XCJsb2Rhc2hcIn0iXSwibmFtZXMiOlsiQ1NTX0NMQVNTX0NPUkVfQkxPQ0tTIiwiZGVmYXVsdFF1ZXJ5RGF0YSIsInNob3dFeHBpcmVkIiwibGltaXQiLCJpc05ld0Jsb2NrIiwiZXZlbnRJZCIsImRhdGV0aW1lSWQiLCJ0aWNrZXRJZCIsIkRFRkFVTFRfQVJSQVkiLCJoaWdoZXN0UmVxdWVzdGVkTGltaXQiLCJFdmVudEF0dGVuZGVlc0VkaXRvciIsInByb3BzIiwidmFsdWUiLCJwYXJzZUludCIsInNldEF0dHJpYnV0ZXMiLCJzZXRTdGF0ZSIsImRhdGV0aW1lUXVlcnlEYXRhIiwic3RhdGUiLCJmb3JFdmVudElkIiwidGlja2V0UXVlcnlEYXRhIiwiZm9yRGF0ZXRpbWVJZCIsInN0YXR1cyIsInN0YXR1c01vZGVsIiwiUkVHSVNUUkFUSU9OX1NUQVRVU19JRCIsIkFQUFJPVkVEIiwib3JkZXJCeSIsIm9yZGVyIiwic2l6ZSIsImF2YXRhclNpemUiLCJzaG93R3JhdmF0YXIiLCJkaXNwbGF5T25BcmNoaXZlcyIsImF0dHJpYnV0ZXMiLCJldmVudFF1ZXJ5RGF0YSIsInN0YXR1c1F1ZXJ5RGF0YSIsInN0YXR1c1R5cGUiLCJTVEFUVVNfVFlQRV9SRUdJU1RSQVRJT04iLCJpc0xvYWRpbmciLCJhdHRlbmRlZXMiLCJhdmF0YXJDbGFzcyIsImF2YXRhck9wdGlvbnMiLCJhdmF0YXJXaWR0aCIsImF2YXRhckhlaWdodCIsIl9fIiwiaXNFbXB0eSIsImFwcGx5TGltaXQiLCJsZW5ndGgiLCJzbGljZSIsImNvdW50QXR0ZW5kZWVzIiwic2V0RXZlbnRJZCIsInNldERhdGV0aW1lSWQiLCJzZXRUaWNrZXRJZCIsInNldFN0YXR1cyIsInNldExpbWl0Iiwic3ByaW50ZiIsIl9uIiwibGFiZWwiLCJzZXRPcmRlckJ5IiwiUVVFUllfT1JERVJfQVNDIiwiUVVFUllfT1JERVJfREVTQyIsInNldE9yZGVyIiwidG9nZ2xlU2hvd0dyYXZhdGFyIiwic2V0QXZhdGFyU2l6ZSIsInRvZ2dsZURpc3BsYXlPbkFyY2hpdmVzIiwiZ2V0QXR0ZW5kZWVzRGlzcGxheSIsImdldEluc3BlY3RvckNvbnRyb2xzIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwiYXJyYXkiLCJib29sIiwic2hhcGUiLCJudW1iZXIiLCJzdHJpbmciLCJvbmVPZiIsIkFMTE9XRURfT1JERVJfVkFMVUVTIiwid2l0aFNlbGVjdCIsInNlbGVjdCIsIm93blByb3BzIiwiZGVmYXVsdFByb3BzIiwiaXNOYU4iLCJxdWVyeURhdGEiLCJmb3JUaWNrZXRJZCIsImZvclN0YXR1c0lkIiwiZGVmYXVsdFdoZXJlQ29uZGl0aW9ucyIsInF1ZXJ5U3RyaW5nIiwiYXR0ZW5kZWVNb2RlbCIsImdldFF1ZXJ5U3RyaW5nIiwiZ2V0QXR0ZW5kZWVzIiwiaXNSZXF1ZXN0aW5nQXR0ZW5kZWVzIiwibmFtZSIsInNldHRpbmdzIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImljb24iLCJjYXRlZ29yeSIsImtleXdvcmRzIiwidHlwZSIsImRlZmF1bHQiLCJlZGl0Iiwic2F2ZSIsInJlZ2lzdGVyQmxvY2tUeXBlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFD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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Ozs7Ozs7Ozs7OztBQ0F2RCxhQUFhLGlDQUFpQyxFQUFFLEkiLCJmaWxlIjoiZXZlbnRlc3ByZXNzby1jb3JlLWJsb2Nrcy43MjBhMmFiY2Y1YTBjYjNiNGVmNy5kaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvc3JjL2Jsb2Nrcy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjb25zdCBDU1NfQ0xBU1NfQ09SRV9CTE9DS1MgPSAnZWUtY29yZS1ibG9ja3MgZXZlbnQtZXNwcmVzc28tYmxvY2tzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7XG5cdFBhbmVsQm9keSxcblx0UGxhY2Vob2xkZXIsXG5cdFRvZ2dsZUNvbnRyb2wsXG5cdFNwaW5uZXIsXG5cdFJhbmdlQ29udHJvbCxcblx0U2VsZWN0Q29udHJvbCxcbn0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb25lbnRzJztcbmltcG9ydCB7IHdpdGhTZWxlY3QgfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgSW5zcGVjdG9yQ29udHJvbHMgfSBmcm9tICdAd29yZHByZXNzL2VkaXRvcic7XG5pbXBvcnQgeyBDb21wb25lbnQsIEZyYWdtZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCB7XG5cdEVkaXRvckRhdGV0aW1lU2VsZWN0LFxuXHRFZGl0b3JFdmVudFNlbGVjdCxcblx0RWRpdG9yU3RhdHVzU2VsZWN0LFxuXHRFZGl0b3JUaWNrZXRTZWxlY3QsXG5cdFF1ZXJ5TGltaXQsXG5cdEV2ZW50QXR0ZW5kZWVMaXN0LFxufSBmcm9tICdAZXZlbnRlc3ByZXNzby9jb21wb25lbnRzJztcbmltcG9ydCB7IE5vdFdpdGhQb3N0VHlwZUNoZWNrIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vZWRpdG9yLWhvY3MnO1xuaW1wb3J0IHsgc3ByaW50ZiwgX24sIF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5pbXBvcnQge1xuXHRzdGF0dXNNb2RlbCxcblx0YXR0ZW5kZWVNb2RlbCxcblx0UVVFUllfT1JERVJfQVNDLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vbW9kZWwnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBDU1NfQ0xBU1NfQ09SRV9CTE9DS1MgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5jb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRzaG93RXhwaXJlZDogdHJ1ZSxcblx0bGltaXQ6IDUwLFxufTtcblxuY29uc3QgaXNOZXdCbG9jayA9ICggeyBldmVudElkLCBkYXRldGltZUlkLCB0aWNrZXRJZCB9ICkgPT4gZXZlbnRJZCA9PT0gMCAmJlxuXHRkYXRldGltZUlkID09PSAwICYmXG5cdHRpY2tldElkID09PSAwO1xuXG5jb25zdCBERUZBVUxUX0FSUkFZID0gW107XG5cbmxldCBoaWdoZXN0UmVxdWVzdGVkTGltaXQgPSAyMDA7XG5cbi8qKlxuICogRXZlbnRBdHRlbmRlZXNFZGl0b3IgQ29tcG9uZW50XG4gKlxuICogVGhpcyByZXR1cm5zIHRoZSBjb21wb25lbnQgZm9yIHRoZSBgZWRpdGAgYXJndW1lbnQgb24gdGhlIGBFdmVudEF0dGVuZGVlc2BcbiAqIEJsb2NrLlxuICovXG5leHBvcnQgY2xhc3MgRXZlbnRBdHRlbmRlZXNFZGl0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgcHJvcFR5cGVzID0ge1xuXHRcdGF0dGVuZGVlczogUHJvcFR5cGVzLmFycmF5LFxuXHRcdGlzTG9hZGluZzogUHJvcFR5cGVzLmJvb2wsXG5cdFx0YXR0cmlidXRlczogUHJvcFR5cGVzLnNoYXBlKCB7XG5cdFx0XHRldmVudElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0ZGF0ZXRpbWVJZDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdHRpY2tldElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0c3RhdHVzOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFx0c2hvd0dyYXZhdGFyOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRcdGRpc3BsYXlPbkFyY2hpdmVzOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKCBbXG5cdFx0XHRcdCdpZCcsXG5cdFx0XHRcdCdsYXN0TmFtZU9ubHknLFxuXHRcdFx0XHQnZmlyc3ROYW1lT25seScsXG5cdFx0XHRcdCdmaXJzdFRoZW5MYXN0TmFtZScsXG5cdFx0XHRcdCdsYXN0VGhlbkZpcnN0TmFtZScsXG5cdFx0XHRdICksXG5cdFx0XHRvcmRlcjogUHJvcFR5cGVzLm9uZU9mKCBBTExPV0VEX09SREVSX1ZBTFVFUyApLFxuXHRcdFx0YXZhdGFyU2l6ZTogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdGF2YXRhckNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdH0gKSxcblx0fTtcblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuXHRcdGF0dGVuZGVlczogW10sXG5cdFx0aXNMb2FkaW5nOiB0cnVlLFxuXHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdGV2ZW50SWQ6IDAsXG5cdFx0XHRkYXRldGltZUlkOiAwLFxuXHRcdFx0dGlja2V0SWQ6IDAsXG5cdFx0XHRzdGF0dXM6IHN0YXR1c01vZGVsLlJFR0lTVFJBVElPTl9TVEFUVVNfSUQuQVBQUk9WRUQsXG5cdFx0XHRzaG93R3JhdmF0YXI6IHRydWUsXG5cdFx0XHRkaXNwbGF5T25BcmNoaXZlczogZmFsc2UsXG5cdFx0XHRsaW1pdDogMTAwLFxuXHRcdFx0b3JkZXJCeTogJ2xhc3RUaGVuRmlyc3ROYW1lJyxcblx0XHRcdG9yZGVyOiBRVUVSWV9PUkRFUl9BU0MsXG5cdFx0XHRhdmF0YXJTaXplOiAyNCxcblx0XHRcdGF2YXRhckNsYXNzOiAnY29udGFjdCcsXG5cdFx0fSxcblx0fTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtPYmplY3R9IHByb3BzXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG5cdFx0c3VwZXIoIHByb3BzICk7XG5cdFx0Y29uc3QgeyBldmVudElkLCBkYXRldGltZUlkIH0gPSB0aGlzLnByb3BzLmF0dHJpYnV0ZXM7XG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGV2ZW50UXVlcnlEYXRhOiB7XG5cdFx0XHRcdC4uLmRlZmF1bHRRdWVyeURhdGEsXG5cdFx0XHR9LFxuXHRcdFx0ZGF0ZXRpbWVRdWVyeURhdGE6IHtcblx0XHRcdFx0Li4uZGVmYXVsdFF1ZXJ5RGF0YSxcblx0XHRcdFx0Zm9yRXZlbnRJZDogZXZlbnRJZCxcblx0XHRcdH0sXG5cdFx0XHR0aWNrZXRRdWVyeURhdGE6IHtcblx0XHRcdFx0Li4uZGVmYXVsdFF1ZXJ5RGF0YSxcblx0XHRcdFx0Zm9yRGF0ZXRpbWVJZDogZGF0ZXRpbWVJZCxcblx0XHRcdH0sXG5cdFx0XHRzdGF0dXNRdWVyeURhdGE6IHtcblx0XHRcdFx0Li4uZGVmYXVsdFF1ZXJ5RGF0YSxcblx0XHRcdFx0c3RhdHVzVHlwZTogc3RhdHVzTW9kZWwuU1RBVFVTX1RZUEVfUkVHSVNUUkFUSU9OLFxuXHRcdFx0fSxcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBldmVudElkIG9uIGF0dHJpYnV0ZXNcblx0ICogQHBhcmFtIHtPYmplY3R9IGV2ZW50SWRcblx0ICovXG5cdHNldEV2ZW50SWQgPSAoIGV2ZW50SWQgKSA9PiB7XG5cdFx0Y29uc3QgdmFsdWUgPSBldmVudElkICE9PSBudWxsICYmIGV2ZW50SWQudmFsdWUgP1xuXHRcdFx0cGFyc2VJbnQoIGV2ZW50SWQudmFsdWUsIDEwICkgOlxuXHRcdFx0MDtcblx0XHR0aGlzLnByb3BzLnNldEF0dHJpYnV0ZXMoXG5cdFx0XHR7XG5cdFx0XHRcdGV2ZW50SWQ6IHZhbHVlLFxuXHRcdFx0XHRkYXRldGltZUlkOiAwLFxuXHRcdFx0XHR0aWNrZXRJZDogMCxcblx0XHRcdH1cblx0XHQpO1xuXHRcdHRoaXMuc2V0U3RhdGUoIHtcblx0XHRcdGRhdGV0aW1lUXVlcnlEYXRhOiB7XG5cdFx0XHRcdC4uLnRoaXMuc3RhdGUuZGF0ZXRpbWVRdWVyeURhdGEsXG5cdFx0XHRcdGZvckV2ZW50SWQ6IHZhbHVlLFxuXHRcdFx0fSxcblx0XHR9ICk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNldCBkYXRldGltZUlkIG9uIGF0dHJpYnV0ZXNcblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGV0aW1lSWRcblx0ICovXG5cdHNldERhdGV0aW1lSWQgPSAoIGRhdGV0aW1lSWQgKSA9PiB7XG5cdFx0Y29uc3QgdmFsdWUgPSBkYXRldGltZUlkICE9PSBudWxsICYmIGRhdGV0aW1lSWQudmFsdWUgP1xuXHRcdFx0cGFyc2VJbnQoIGRhdGV0aW1lSWQudmFsdWUsIDEwICkgOlxuXHRcdFx0MDtcblx0XHR0aGlzLnByb3BzLnNldEF0dHJpYnV0ZXMoXG5cdFx0XHR7XG5cdFx0XHRcdGRhdGV0aW1lSWQ6IHZhbHVlLFxuXHRcdFx0XHR0aWNrZXRJZDogMCxcblx0XHRcdH1cblx0XHQpO1xuXHRcdHRoaXMuc2V0U3RhdGUoIHtcblx0XHRcdHRpY2tldFF1ZXJ5RGF0YToge1xuXHRcdFx0XHQuLi50aGlzLnN0YXRlLnRpY2tldFF1ZXJ5RGF0YSxcblx0XHRcdFx0Zm9yRGF0ZXRpbWVJZDogdmFsdWUsXG5cdFx0XHR9LFxuXHRcdH0gKTtcblx0fTtcblxuXHQvKipcblx0ICogU2V0IHRpY2tldElkIG9uIGF0dHJpYnV0ZXNcblx0ICogQHBhcmFtIHtPYmplY3R9IHRpY2tldElkXG5cdCAqL1xuXHRzZXRUaWNrZXRJZCA9ICggdGlja2V0SWQgKSA9PiB7XG5cdFx0Y29uc3QgdmFsdWUgPSB0aWNrZXRJZCAhPT0gbnVsbCAmJiB0aWNrZXRJZC52YWx1ZSA/XG5cdFx0XHRwYXJzZUludCggdGlja2V0SWQudmFsdWUsIDEwICkgOlxuXHRcdFx0MDtcblx0XHR0aGlzLnByb3BzLnNldEF0dHJpYnV0ZXMoIHsgdGlja2V0SWQ6IHZhbHVlIH0gKTtcblx0fTtcblxuXHQvKipcblx0ICogU2V0IHN0YXR1cyBvbiBhdHRyaWJ1dGVzXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0dXNcblx0ICovXG5cdHNldFN0YXR1cyA9ICggc3RhdHVzICkgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gc3RhdHVzICE9PSBudWxsICYmIHN0YXR1cy52YWx1ZSA/XG5cdFx0XHRzdGF0dXMudmFsdWUgOlxuXHRcdFx0c3RhdHVzTW9kZWwuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5BUFBST1ZFRDtcblx0XHR0aGlzLnByb3BzLnNldEF0dHJpYnV0ZXMoIHsgc3RhdHVzOiB2YWx1ZSB9ICk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNldCBsaW1pdCBmb3IgYXR0ZW5kZWVzIHRvIGJlIHNob3duIGluIGF0dHJpYnV0ZXMuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBsaW1pdFxuXHQgKi9cblx0c2V0TGltaXQgPSAoIGxpbWl0ICkgPT4ge1xuXHRcdHRoaXMucHJvcHMuc2V0QXR0cmlidXRlcygge1xuXHRcdFx0bGltaXQ6IHBhcnNlSW50KCBsaW1pdCwgMTAgKSxcblx0XHR9ICk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgb3JkZXJCeSBhdHRyaWJ1dGVcblx0ICogQHBhcmFtIHtzdHJpbmd9IG9yZGVyQnlcblx0ICovXG5cdHNldE9yZGVyQnkgPSAoIG9yZGVyQnkgKSA9PiB7XG5cdFx0dGhpcy5wcm9wcy5zZXRBdHRyaWJ1dGVzKCB7IG9yZGVyQnkgfSApO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIG9yZGVyIGF0dHJpYnV0ZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJcblx0ICovXG5cdHNldE9yZGVyID0gKCBvcmRlciApID0+IHtcblx0XHR0aGlzLnByb3BzLnNldEF0dHJpYnV0ZXMoIHsgb3JkZXIgfSApO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIHNpemUgZm9yIHRoZSBncmF2YXRhciBkaXNwbGF5ZWQuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXG5cdCAqL1xuXHRzZXRBdmF0YXJTaXplID0gKCBzaXplICkgPT4ge1xuXHRcdHRoaXMucHJvcHMuc2V0QXR0cmlidXRlcygge1xuXHRcdFx0YXZhdGFyU2l6ZTogcGFyc2VJbnQoIHNpemUsIDEwICksXG5cdFx0fSApO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTZXRzIHdoZXRoZXIgdG8gc2hvdyBncmF2YXRhciBmb3IgYXR0ZW5kZWVzIGluIGF0dHJpYnV0ZXMuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0dyYXZhdGFyXG5cdCAqL1xuXHR0b2dnbGVTaG93R3JhdmF0YXIgPSAoIHNob3dHcmF2YXRhciApID0+IHtcblx0XHR0aGlzLnByb3BzLnNldEF0dHJpYnV0ZXMoIHsgc2hvd0dyYXZhdGFyIH0gKTtcblx0fTtcblxuXHQvKipcblx0ICogU2V0cyB3aGV0aGVyIHRvIHNob3cgYmxvY2sgb24gYXJjaGl2ZSBwYWdlcyBpbiBhdHRyaWJ1dGVzLlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGRpc3BsYXlPbkFyY2hpdmVzXG5cdCAqL1xuXHR0b2dnbGVEaXNwbGF5T25BcmNoaXZlcyA9ICggZGlzcGxheU9uQXJjaGl2ZXMgKSA9PiB7XG5cdFx0dGhpcy5wcm9wcy5zZXRBdHRyaWJ1dGVzKCB7IGRpc3BsYXlPbkFyY2hpdmVzIH0gKTtcblx0fTtcblxuXHQvKipcblx0ICogUmV0cmlldmUgdGhlIEF0dGVuZGVlcyBMaXN0IGNvbXBvbmVudCBmb3IgdGhlIGdpdmVuIGF0dHJpYnV0ZXNcblx0ICogQHJldHVybiB7Q29tcG9uZW50fSBXaGF0IHRvIGRpc3BsYXkgZm9yIHRoZSBhdHRlbmRlZSBkaXNwbGF5LlxuXHQgKi9cblx0Z2V0QXR0ZW5kZWVzRGlzcGxheSgpIHtcblx0XHRjb25zdCB7IGlzTG9hZGluZywgYXR0ZW5kZWVzIH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHtcblx0XHRcdHNob3dHcmF2YXRhcixcblx0XHRcdGF2YXRhclNpemUsXG5cdFx0XHRhdmF0YXJDbGFzcyxcblx0XHR9ID0gdGhpcy5wcm9wcy5hdHRyaWJ1dGVzO1xuXG5cdFx0Y29uc3QgYXZhdGFyT3B0aW9ucyA9IHtcblx0XHRcdGF2YXRhcldpZHRoOiBhdmF0YXJTaXplLFxuXHRcdFx0YXZhdGFySGVpZ2h0OiBhdmF0YXJTaXplLFxuXHRcdFx0YXZhdGFyQ2xhc3MsXG5cdFx0fTtcblxuXHRcdGlmICggaXNMb2FkaW5nICkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFBsYWNlaG9sZGVyPlxuXHRcdFx0XHRcdDxTcGlubmVyIC8+XG5cdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggaXNOZXdCbG9jayggdGhpcy5wcm9wcy5hdHRyaWJ1dGVzICkgJiZcblx0XHRcdGF0dGVuZGVlcyA9PT0gREVGQVVMVF9BUlJBWVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFBsYWNlaG9sZGVyPlxuXHRcdFx0XHRcdHsgX18oXG5cdFx0XHRcdFx0XHQnVG8gZ2V0IHN0YXJ0ZWQsIHNlbGVjdCB3aGF0IGV2ZW50IHlvdSB3YW50IHRvIHNob3cgYXR0ZW5kZWVzIGZyb20gaW4gdGhlIGJsb2NrIHNldHRpbmdzLicsXG5cdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0KSB9XG5cdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICggISBpc0xvYWRpbmcgJiYgaXNFbXB0eSggYXR0ZW5kZWVzICkgKSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8UGxhY2Vob2xkZXI+XG5cdFx0XHRcdFx0eyBfXyhcblx0XHRcdFx0XHRcdCdUaGVyZSBhcmUgbm8gYXR0ZW5kZWVzIGZvciBzZWxlY3RlZCBvcHRpb25zLicsXG5cdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0KSB9XG5cdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gPEV2ZW50QXR0ZW5kZWVMaXN0XG5cdFx0XHRhdHRlbmRlZXM9eyB0aGlzLmFwcGx5TGltaXQoIGF0dGVuZGVlcyApIH1cblx0XHRcdHNob3dHcmF2YXRhcj17IHNob3dHcmF2YXRhciB9XG5cdFx0XHRhdmF0YXJPcHRpb25zPXsgYXZhdGFyT3B0aW9ucyB9XG5cdFx0XHRpc0xvYWRpbmc9eyBpc0xvYWRpbmcgfVxuXHRcdFx0Y29udGFpbmVyQ3NzQ2xhc3M9eyBDU1NfQ0xBU1NfQ09SRV9CTE9DS1MgfVxuXHRcdFx0Y29udGFpbmVySWQ9eyAnZWUtYmxvY2stZXZlbnQtYXR0ZW5kZWVzJyB9XG5cdFx0Lz47XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyByZWNlaXZlcyB0aGUgYXJyYXkgb2YgYXR0ZW5kZWVzIGFuZCBhcHBsaWVzIHRoZSBsaW1pdCB0byBpdCBzbyB0aGF0XG5cdCAqIG9ubHkgdGhlIHNldCBsaW1pdCBvZiBhdHRlbmRlZXMgaXMgcmV0dXJuZWQgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZVxuXHQgKiBhcnJheS5cblx0ICogQHBhcmFtIHtBcnJheX0gYXR0ZW5kZWVzXG5cdCAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBhcnJheSBvZiBhdHRlbmRlZXMgd2l0aCB0aGUgYXBwbGllZCBsaW1pdFxuXHQgKi9cblx0YXBwbHlMaW1pdCggYXR0ZW5kZWVzICkge1xuXHRcdGlmICggYXR0ZW5kZWVzLmxlbmd0aCA8PSB0aGlzLnByb3BzLmF0dHJpYnV0ZXMubGltaXQgKSB7XG5cdFx0XHRyZXR1cm4gYXR0ZW5kZWVzO1xuXHRcdH1cblx0XHRyZXR1cm4gYXR0ZW5kZWVzLnNsaWNlKCAwLCB0aGlzLnByb3BzLmF0dHJpYnV0ZXMubGltaXQgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGluc3BlY3RvciBjb250cm9scyBmb3IgdGhlIGJsb2NrLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlc1xuXHQgKiBAcmV0dXJuIHtDb21wb25lbnR9IFRoZSBpbnNwZWN0b3IgY29udHJvbHMgY29tcG9uZW50XG5cdCAqL1xuXHRnZXRJbnNwZWN0b3JDb250cm9scyggYXR0cmlidXRlcyApIHtcblx0XHRjb25zdCBjb3VudEF0dGVuZGVlcyA9IHRoaXMucHJvcHMuYXR0ZW5kZWVzLmxlbmd0aCB8fCAwO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8SW5zcGVjdG9yQ29udHJvbHM+XG5cdFx0XHRcdDxQYW5lbEJvZHkgdGl0bGU9eyBfXyhcblx0XHRcdFx0XHQnRmlsdGVyIEJ5IFNldHRpbmdzJyxcblx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdCkgfT5cblx0XHRcdFx0XHQ8RWRpdG9yRXZlbnRTZWxlY3Rcblx0XHRcdFx0XHRcdGtleT1cImF0dGVuZGVlcy1ldmVudC1zZWxlY3RcIlxuXHRcdFx0XHRcdFx0c2VsZWN0ZWQ9eyBhdHRyaWJ1dGVzLmV2ZW50SWQgfVxuXHRcdFx0XHRcdFx0b25TZWxlY3Q9eyB0aGlzLnNldEV2ZW50SWQgfVxuXHRcdFx0XHRcdFx0cXVlcnlEYXRhPXsgdGhpcy5zdGF0ZS5ldmVudFF1ZXJ5RGF0YSB9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHR7IGF0dHJpYnV0ZXMuZXZlbnRJZCAhPT0gMCAmJlxuXHRcdFx0XHRcdFx0PEVkaXRvckRhdGV0aW1lU2VsZWN0XG5cdFx0XHRcdFx0XHRcdGtleT1cImF0dGVuZGVlcy1kYXRldGltZS1zZWxlY3RcIlxuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZD17IGF0dHJpYnV0ZXMuZGF0ZXRpbWVJZCB9XG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0PXsgdGhpcy5zZXREYXRldGltZUlkIH1cblx0XHRcdFx0XHRcdFx0cXVlcnlEYXRhPXsgdGhpcy5zdGF0ZS5kYXRldGltZVF1ZXJ5RGF0YSB9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR7IGF0dHJpYnV0ZXMuZGF0ZXRpbWVJZCAhPT0gMCAmJlxuXHRcdFx0XHRcdFx0PEVkaXRvclRpY2tldFNlbGVjdFxuXHRcdFx0XHRcdFx0XHRrZXk9XCJhdHRlbmRlZXMtdGlja2V0LXNlbGVjdFwiXG5cdFx0XHRcdFx0XHRcdHNlbGVjdGVkPXsgYXR0cmlidXRlcy50aWNrZXRJZCB9XG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0PXsgdGhpcy5zZXRUaWNrZXRJZCB9XG5cdFx0XHRcdFx0XHRcdHF1ZXJ5RGF0YT17IHRoaXMuc3RhdGUudGlja2V0UXVlcnlEYXRhIH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDxFZGl0b3JTdGF0dXNTZWxlY3Rcblx0XHRcdFx0XHRcdGtleT1cImF0dGVuZGVlcy1zdGF0dXMtc2VsZWN0XCJcblx0XHRcdFx0XHRcdHNlbGVjdGVkPXsgYXR0cmlidXRlcy5zdGF0dXMgfVxuXHRcdFx0XHRcdFx0b25TZWxlY3Q9eyB0aGlzLnNldFN0YXR1cyB9XG5cdFx0XHRcdFx0XHRxdWVyeURhdGE9eyB0aGlzLnN0YXRlLnN0YXR1c1F1ZXJ5RGF0YSB9XG5cdFx0XHRcdFx0XHRsYWJlbD17IF9fKFxuXHRcdFx0XHRcdFx0XHQnU2VsZWN0IFJlZ2lzdHJhdGlvbiBTdGF0dXMnLFxuXHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHQpIH1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDxRdWVyeUxpbWl0XG5cdFx0XHRcdFx0XHRsYWJlbD17IF9fKFxuXHRcdFx0XHRcdFx0XHQnTnVtYmVyIG9mIEF0dGVuZGVlcyB0byBEaXNwbGF5OicsXG5cdFx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHRcdCkgfVxuXHRcdFx0XHRcdFx0bGltaXQ9eyBhdHRyaWJ1dGVzLmxpbWl0IH1cblx0XHRcdFx0XHRcdG9uTGltaXRDaGFuZ2U9eyB0aGlzLnNldExpbWl0IH1cblx0XHRcdFx0XHRcdG1pbj17IDEgfVxuXHRcdFx0XHRcdFx0d2l0aFNsaWRlcj17IGZhbHNlIH1cblx0XHRcdFx0XHRcdGhlbHA9eyBzcHJpbnRmKFxuXHRcdFx0XHRcdFx0XHRfbihcblx0XHRcdFx0XHRcdFx0XHQnVXNlZCB0byBhZGp1c3QgdGhlIG51bWJlciBvZiBhdHRlbmRlZXMgZGlzcGxheWVkIChUaGVyZSBpcyAlZCB0b3RhbCBhdHRlbmRlZSBmb3IgdGhlIGN1cnJlbnQgZmlsdGVyIHNldHRpbmdzKS4nLFxuXHRcdFx0XHRcdFx0XHRcdCdVc2VkIHRvIGFkanVzdCB0aGUgbnVtYmVyIG9mIGF0dGVuZGVlcyBkaXNwbGF5ZWQgKFRoZXJlIGFyZSAlZCB0b3RhbCBhdHRlbmRlZXMgZm9yIHRoZSBjdXJyZW50IGZpbHRlciBzZXR0aW5ncykuJyxcblx0XHRcdFx0XHRcdFx0XHRjb3VudEF0dGVuZGVlcyxcblx0XHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRcdGNvdW50QXR0ZW5kZWVzXG5cdFx0XHRcdFx0XHQpIH1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDxTZWxlY3RDb250cm9sXG5cdFx0XHRcdFx0XHRsYWJlbD17IF9fKCAnT3JkZXIgQXR0ZW5kZWVzIGJ5OicsICdldmVudF9lc3ByZXNzbycgKSB9XG5cdFx0XHRcdFx0XHR2YWx1ZT17IGF0dHJpYnV0ZXMub3JkZXJCeSB9XG5cdFx0XHRcdFx0XHRvcHRpb25zPXsgW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IF9fKCAnQXR0ZW5kZWUgaWQnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6ICdpZCcsXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogX18oICdMYXN0IG5hbWUgb25seScsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogJ2xhc3ROYW1lT25seScsXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogX18oXG5cdFx0XHRcdFx0XHRcdFx0XHQnRmlyc3QgbmFtZSBvbmx5Jyxcblx0XHRcdFx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiAnZmlyc3ROYW1lT25seScsXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogX18oXG5cdFx0XHRcdFx0XHRcdFx0XHQnRmlyc3QsIHRoZW4gTGFzdCBuYW1lJyxcblx0XHRcdFx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiAnZmlyc3RUaGVuTGFzdE5hbWUnLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IF9fKFxuXHRcdFx0XHRcdFx0XHRcdFx0J0xhc3QsIHRoZW4gRmlyc3QgbmFtZScsXG5cdFx0XHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogJ2xhc3RUaGVuRmlyc3ROYW1lJyxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdF0gfVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyB0aGlzLnNldE9yZGVyQnkgfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdGxhYmVsPXsgX18oICdTb3J0IG9yZGVyOicsICdldmVudF9lc3ByZXNzbycgKSB9XG5cdFx0XHRcdFx0XHR2YWx1ZT17IGF0dHJpYnV0ZXMub3JkZXIgfVxuXHRcdFx0XHRcdFx0b3B0aW9ucz17IFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBfXyggJ0FzY2VuZGluZycsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogUVVFUllfT1JERVJfQVNDLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IF9fKCAnRGVzY2VuZGluZycsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogUVVFUllfT1JERVJfREVTQyxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdF0gfVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyB0aGlzLnNldE9yZGVyIH1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8L1BhbmVsQm9keT5cblx0XHRcdFx0PFBhbmVsQm9keSB0aXRsZT17IF9fKFxuXHRcdFx0XHRcdCdHcmF2YXRhciBTZXR0dGluZ3MnLFxuXHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0KSB9ID5cblx0XHRcdFx0XHQ8VG9nZ2xlQ29udHJvbFxuXHRcdFx0XHRcdFx0bGFiZWw9eyBfXyggJ0Rpc3BsYXkgR3JhdmF0YXInLCAnZXZlbnRfZXNwcmVzc28nICkgfVxuXHRcdFx0XHRcdFx0Y2hlY2tlZD17IGF0dHJpYnV0ZXMuc2hvd0dyYXZhdGFyIH1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsgdGhpcy50b2dnbGVTaG93R3JhdmF0YXIgfVxuXHRcdFx0XHRcdFx0aGVscD17IGF0dHJpYnV0ZXMuc2hvd0dyYXZhdGFyID9cblx0XHRcdFx0XHRcdFx0X18oXG5cdFx0XHRcdFx0XHRcdFx0J0dyYXZhdGFyIGltYWdlcyBhcmUgc2hvd24gZm9yIGVhY2ggYXR0ZW5kZWUuJyxcblx0XHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHRcdCkgOlxuXHRcdFx0XHRcdFx0XHRfXyhcblx0XHRcdFx0XHRcdFx0XHQnTm8gZ3JhdmF0YXIgaW1hZ2VzIGFyZSBzaG93biBmb3IgZWFjaCBhdHRlbmRlZS4nLFxuXHRcdFx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHRcdFx0KSB9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHR7IGF0dHJpYnV0ZXMuc2hvd0dyYXZhdGFyICYmXG5cdFx0XHRcdFx0PFJhbmdlQ29udHJvbFxuXHRcdFx0XHRcdFx0bGFiZWw9eyBfXyggJ1NpemUgb2YgR3JhdmF0YXInLCAnZXZlbnRfZXNwcmVzc28nICkgfVxuXHRcdFx0XHRcdFx0dmFsdWU9eyBhdHRyaWJ1dGVzLmF2YXRhclNpemUgfVxuXHRcdFx0XHRcdFx0bWluPXsgMTAgfVxuXHRcdFx0XHRcdFx0bWF4PXsgMTI4IH1cblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsgdGhpcy5zZXRBdmF0YXJTaXplIH1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC9QYW5lbEJvZHk+XG5cdFx0XHRcdDxOb3RXaXRoUG9zdFR5cGVDaGVjayBleGNsdWRlZFBvc3RUeXBlU2x1Z3M9eyAncGFnZScgfT5cblx0XHRcdFx0XHQ8UGFuZWxCb2R5IHRpdGxlPXsgX18oXG5cdFx0XHRcdFx0XHQnQXJjaGl2ZSBTZXR0aW5ncycsXG5cdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0KSB9ID5cblx0XHRcdFx0XHRcdDxUb2dnbGVDb250cm9sXG5cdFx0XHRcdFx0XHRcdGxhYmVsPXsgX18oICdEaXNwbGF5IG9uIEFyY2hpdmVzJywgJ2V2ZW50X2VzcHJlc3NvJyApIH1cblx0XHRcdFx0XHRcdFx0Y2hlY2tlZD17IGF0dHJpYnV0ZXMuZGlzcGxheU9uQXJjaGl2ZXMgfVxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17IHRoaXMudG9nZ2xlRGlzcGxheU9uQXJjaGl2ZXMgfVxuXHRcdFx0XHRcdFx0XHRoZWxwPXsgYXR0cmlidXRlcy5kaXNwbGF5T25BcmNoaXZlcyA/XG5cdFx0XHRcdFx0XHRcdFx0X18oXG5cdFx0XHRcdFx0XHRcdFx0XHQnQXR0ZW5kZWVzIGFyZSBzaG93biB3aGVuZXZlciB0aGlzIHBvc3QgaXMgbGlzdGVkIGluIGFuIGFyY2hpdmUgdmlldy4nLFxuXHRcdFx0XHRcdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHRcdFx0XHRcdCkgOlxuXHRcdFx0XHRcdFx0XHRcdF9fKFxuXHRcdFx0XHRcdFx0XHRcdFx0J0F0dGVuZGVlcyBhcmUgaGlkZGVuIHdoZW5ldmVyIHRoaXMgcG9zdCBpcyBsaXN0ZWQgaW4gYW4gYXJjaGl2ZSB2aWV3LicsXG5cdFx0XHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvUGFuZWxCb2R5PlxuXHRcdFx0XHQ8L05vdFdpdGhQb3N0VHlwZUNoZWNrPlxuXHRcdFx0PC9JbnNwZWN0b3JDb250cm9scz5cblx0XHQpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8RnJhZ21lbnQ+XG5cdFx0XHRcdHsgdGhpcy5nZXRBdHRlbmRlZXNEaXNwbGF5KCkgfVxuXHRcdFx0XHR7IHRoaXMuZ2V0SW5zcGVjdG9yQ29udHJvbHMoIHRoaXMucHJvcHMuYXR0cmlidXRlcyApIH1cblx0XHRcdDwvRnJhZ21lbnQ+XG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU2VsZWN0KCAoIHNlbGVjdCwgb3duUHJvcHMgKSA9PiB7XG5cdGNvbnN0IGRlZmF1bHRQcm9wcyA9IHsgLi4uRXZlbnRBdHRlbmRlZXNFZGl0b3IuZGVmYXVsdFByb3BzLmF0dHJpYnV0ZXMgfTtcblx0Y29uc3Qge1xuXHRcdGV2ZW50SWQgPSBkZWZhdWx0UHJvcHMuZXZlbnRJZCxcblx0XHRkYXRldGltZUlkID0gZGVmYXVsdFByb3BzLmRhdGV0aW1lSWQsXG5cdFx0dGlja2V0SWQgPSBkZWZhdWx0UHJvcHMudGlja2V0SWQsXG5cdFx0c3RhdHVzID0gZGVmYXVsdFByb3BzLnN0YXR1cyxcblx0XHRvcmRlckJ5ID0gZGVmYXVsdFByb3BzLm9yZGVyQnksXG5cdFx0b3JkZXIgPSBkZWZhdWx0UHJvcHMub3JkZXIsXG5cdFx0bGltaXQgPSBkZWZhdWx0UHJvcHMubGltaXQsXG5cdH0gPSBvd25Qcm9wcy5hdHRyaWJ1dGVzO1xuXG5cdC8vIFRoaXMgZW5zdXJlcyB0aGF0IHdlIGRvbid0IHF1ZXJ5IHVubmVjZXNzYXJpbHkgc2luY2UgaWYgdGhlIGxpbWl0IGlzXG5cdC8vIGxvd2VyIHRoYW4gYSBxdWVyeSB3ZSd2ZSBhbHJlYWR5IGRvbmUsIHRoZW4gd2UgYWxyZWFkeSBoYXZlIGNhY2hlZCBkYXRhXG5cdC8vIGZvciB0aGlzIGxpbWl0IChhbmQgY2FjaGUgaXMgc3RpbGwgYnVzdGVkIGJ5IGFueSBvdGhlciBxdWVyeSBjaGFuZ2VzKVxuXHRoaWdoZXN0UmVxdWVzdGVkTGltaXQgPSAhIGxpbWl0IHx8XG5cdFx0aXNOYU4oIGxpbWl0ICkgfHxcblx0XHRsaW1pdCA8PSBoaWdoZXN0UmVxdWVzdGVkTGltaXQgP1xuXHRcdGhpZ2hlc3RSZXF1ZXN0ZWRMaW1pdCA6XG5cdFx0bGltaXQ7XG5cblx0Y29uc3QgcXVlcnlEYXRhID0ge1xuXHRcdGZvckV2ZW50SWQ6IGV2ZW50SWQsXG5cdFx0Zm9yRGF0ZXRpbWVJZDogZGF0ZXRpbWVJZCxcblx0XHRmb3JUaWNrZXRJZDogdGlja2V0SWQsXG5cdFx0Zm9yU3RhdHVzSWQ6IHN0YXR1cyxcblx0XHRzaG93R3JhdmF0YXI6IHRydWUsXG5cdFx0ZGVmYXVsdFdoZXJlQ29uZGl0aW9uczogJ2Z1bGxfdGhpc19taW5pbXVtX290aGVycycsXG5cdFx0b3JkZXIsXG5cdFx0b3JkZXJCeSxcblx0XHRsaW1pdDogaGlnaGVzdFJlcXVlc3RlZExpbWl0LFxuXHR9O1xuXG5cdGNvbnN0IHF1ZXJ5U3RyaW5nID0gYXR0ZW5kZWVNb2RlbC5nZXRRdWVyeVN0cmluZyggcXVlcnlEYXRhICk7XG5cdGNvbnN0IHtcblx0XHRnZXRBdHRlbmRlZXMsXG5cdFx0aXNSZXF1ZXN0aW5nQXR0ZW5kZWVzLFxuXHR9ID0gc2VsZWN0KCAnZXZlbnRlc3ByZXNzby9saXN0cycgKTtcblx0cmV0dXJuIHtcblx0XHQuLi5FdmVudEF0dGVuZGVlc0VkaXRvci5kZWZhdWx0UHJvcHMsXG5cdFx0Li4ub3duUHJvcHMsXG5cdFx0YXR0cmlidXRlczoge1xuXHRcdFx0Li4uRXZlbnRBdHRlbmRlZXNFZGl0b3IuZGVmYXVsdFByb3BzLmF0dHJpYnV0ZXMsXG5cdFx0XHQuLi5vd25Qcm9wcy5hdHRyaWJ1dGVzLFxuXHRcdH0sXG5cdFx0YXR0ZW5kZWVzOiBpc05ld0Jsb2NrKCB7IGV2ZW50SWQsIGRhdGV0aW1lSWQsIHRpY2tldElkIH0gKSA/XG5cdFx0XHRERUZBVUxUX0FSUkFZIDpcblx0XHRcdGdldEF0dGVuZGVlcyggcXVlcnlTdHJpbmcgKSxcblx0XHRpc0xvYWRpbmc6IGlzUmVxdWVzdGluZ0F0dGVuZGVlcyggcXVlcnlTdHJpbmcgKSxcblx0fTtcbn0gKSggRXZlbnRBdHRlbmRlZXNFZGl0b3IgKTtcbiIsIi8qKlxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyByZWdpc3RlckJsb2NrVHlwZSB9IGZyb20gJ0B3b3JkcHJlc3MvYmxvY2tzJztcblxuLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgX18gfSBmcm9tICdAZXZlbnRlc3ByZXNzby9pMThuJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IEV2ZW50QXR0ZW5kZWVzRWRpdG9yIGZyb20gJy4vZWRpdCc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuZXhwb3J0IGNvbnN0IG5hbWUgPSAnZXZlbnRlc3ByZXNzby9ldmVudC1hdHRlbmRlZXMnO1xuXG5leHBvcnQgY29uc3Qgc2V0dGluZ3MgPSB7XG5cblx0dGl0bGU6IF9fKCAnRXZlbnQgQXR0ZW5kZWVzJywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXG5cdGRlc2NyaXB0aW9uOiBfXyhcblx0XHQnRGlzcGxheXMgYSBsaXN0IG9mIHBlb3BsZSB0aGF0IGhhdmUgcmVnaXN0ZXJlZCBmb3IgdGhlIHNwZWNpZmllZCBldmVudCcsXG5cdFx0J2V2ZW50X2VzcHJlc3NvJyxcblx0KSxcblxuXHRpY29uOiAnZ3JvdXBzJyxcblxuXHRjYXRlZ29yeTogJ2V2ZW50LWVzcHJlc3NvJyxcblxuXHRrZXl3b3JkczogW1xuXHRcdF9fKCAnZXZlbnQnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0X18oICdhdHRlbmRlZXMnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0X18oICdsaXN0JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRdLFxuXG5cdGF0dHJpYnV0ZXM6IHtcblx0XHRldmVudElkOiB7XG5cdFx0XHR0eXBlOiAnbnVtYmVyJyxcblx0XHRcdGRlZmF1bHQ6IDAsXG5cdFx0fSxcblx0XHRkYXRldGltZUlkOiB7XG5cdFx0XHR0eXBlOiAnbnVtYmVyJyxcblx0XHRcdGRlZmF1bHQ6IDAsXG5cdFx0fSxcblx0XHR0aWNrZXRJZDoge1xuXHRcdFx0dHlwZTogJ251bWJlcicsXG5cdFx0XHRkZWZhdWx0OiAwLFxuXHRcdH0sXG5cdFx0c3RhdHVzOiB7XG5cdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdGRlZmF1bHQ6ICdSQVAnLFxuXHRcdH0sXG5cdFx0bGltaXQ6IHtcblx0XHRcdHR5cGU6ICdudW1iZXInLFxuXHRcdFx0ZGVmYXVsdDogMTAwLFxuXHRcdH0sXG5cdFx0b3JkZXI6IHtcblx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0ZGVmYXVsdDogJ0FTQycsXG5cdFx0fSxcblx0XHRvcmRlckJ5OiB7XG5cdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdGRlZmF1bHQ6ICdsYXN0VGhlbkZpcnN0TmFtZScsXG5cdFx0fSxcblx0XHRzaG93R3JhdmF0YXI6IHtcblx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdGRlZmF1bHQ6IGZhbHNlLFxuXHRcdH0sXG5cdFx0YXZhdGFyQ2xhc3M6IHtcblx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0ZGVmYXVsdDogJ2NvbnRhY3QnLFxuXHRcdH0sXG5cdFx0YXZhdGFyU2l6ZToge1xuXHRcdFx0dHlwZTogJ251bWJlcicsXG5cdFx0XHRkZWZhdWx0OiAyNCxcblx0XHR9LFxuXHRcdGRpc3BsYXlPbkFyY2hpdmVzOiB7XG5cdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRkZWZhdWx0OiBmYWxzZSxcblx0XHR9LFxuXHR9LFxuXG5cdGVkaXQ6IEV2ZW50QXR0ZW5kZWVzRWRpdG9yLFxuXG5cdHNhdmUoKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG59O1xuXG5yZWdpc3RlckJsb2NrVHlwZSggbmFtZSwgc2V0dGluZ3MgKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCAnLi9ldmVudC1hdHRlbmRlZXMnO1xuIiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZjsiLCJ2YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9zZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbmhlcml0czsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIGFzc2VydFRoaXNJbml0aWFsaXplZCA9IHJlcXVpcmUoXCIuL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiKTtcblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjsiLCJmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZjsiLCJmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZjIob2JqKTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YyKFN5bWJvbC5pdGVyYXRvcikgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IF90eXBlb2YyKG9iaik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG4gIHZhciBoYXMgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG5cbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKGhhcyh0eXBlU3BlY3MsIHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIGVyciA9IEVycm9yKFxuICAgICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6ICcgKyBsb2NhdGlvbiArICcgdHlwZSBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7ICcgK1xuICAgICAgICAgICAgICAnaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCcgKyB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gKyAnYC4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgJiYgIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICcgK1xuICAgICAgICAgICAgbG9jYXRpb24gKyAnIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAnICsgdHlwZW9mIGVycm9yICsgJy4gJyArXG4gICAgICAgICAgICAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICtcbiAgICAgICAgICAgICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc3RhY2sgPSBnZXRTdGFjayA/IGdldFN0YWNrKCkgOiAnJztcblxuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICdGYWlsZWQgJyArIGxvY2F0aW9uICsgJyB0eXBlOiAnICsgZXJyb3IubWVzc2FnZSArIChzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmVzZXRzIHdhcm5pbmcgY2FjaGUgd2hlbiB0ZXN0aW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmNoZWNrUHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlID0gZnVuY3Rpb24oKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1Byb3BUeXBlcztcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG52YXIgaGFzID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG5mdW5jdGlvbiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGVsZW1lbnRUeXBlOiBjcmVhdGVFbGVtZW50VHlwZVR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyLFxuICAgIGV4YWN0OiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyLFxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gT2xkIGJlaGF2aW9yIGZvciBwZW9wbGUgdXNpbmcgUmVhY3QuUHJvcFR5cGVzXG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gJiZcbiAgICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPCAzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBwcm9wIG9uIGAnICsgY29tcG9uZW50TmFtZSAgKyAnYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgK1xuICAgICAgICAgICAgICAnYW5kIHdpbGwgdGhyb3cgaW4gdGhlIHN0YW5kYWxvbmUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICtcbiAgICAgICAgICAgICAgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIVJlYWN0SXMuaXNWYWxpZEVsZW1lbnRUeXBlKHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50IHR5cGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudHMgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGFycmF5LCBnb3QgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIGFyZ3VtZW50cy4gJyArXG4gICAgICAgICAgICAnQSBjb21tb24gbWlzdGFrZSBpcyB0byB3cml0ZSBvbmVPZih4LCB5LCB6KSBpbnN0ZWFkIG9mIG9uZU9mKFt4LCB5LCB6XSkuJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBhcnJheS4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMsIGZ1bmN0aW9uIHJlcGxhY2VyKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlID09PSAnc3ltYm9sJykge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIFN0cmluZyhwcm9wVmFsdWUpICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgIGlmIChoYXMocHJvcFZhbHVlLCBrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAnICsgZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKGNoZWNrZXIpICsgJyBhdCBpbmRleCAnICsgaSArICcuJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gZmFsc3kgdmFsdWUgY2FuJ3QgYmUgYSBTeW1ib2xcbiAgICBpZiAoIXByb3BWYWx1ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlID0gY2hlY2tQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGU7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKFJlYWN0SXMuaXNFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuOC42XG4gKiByZWFjdC1pcy5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTtcbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb25jdXJyZW50X21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKSA6IDB4ZWFkMDtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0O1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8XG4gIC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSk7XG59XG5cbi8qKlxuICogRm9ya2VkIGZyb20gZmJqcy93YXJuaW5nOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2ZianMvYmxvYi9lNjZiYTIwYWQ1YmU0MzNlYjU0NDIzZjJiMDk3ZDgyOTMyNGQ5ZGU2L3BhY2thZ2VzL2ZianMvc3JjL19fZm9ya3NfXy93YXJuaW5nLmpzXG4gKlxuICogT25seSBjaGFuZ2UgaXMgd2UgdXNlIGNvbnNvbGUud2FybiBpbnN0ZWFkIG9mIGNvbnNvbGUuZXJyb3IsXG4gKiBhbmQgZG8gbm90aGluZyB3aGVuICdjb25zb2xlJyBpcyBub3Qgc3VwcG9ydGVkLlxuICogVGhpcyByZWFsbHkgc2ltcGxpZmllcyB0aGUgY29kZS5cbiAqIC0tLVxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYGxvd1ByaW9yaXR5V2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmckMSA9IGxvd1ByaW9yaXR5V2FybmluZztcblxuZnVuY3Rpb24gdHlwZU9mKG9iamVjdCkge1xuICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsKSB7XG4gICAgdmFyICQkdHlwZW9mID0gb2JqZWN0LiQkdHlwZW9mO1xuICAgIHN3aXRjaCAoJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICB2YXIgdHlwZSA9IG9iamVjdC50eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciAkJHR5cGVvZlR5cGUgPSB0eXBlICYmIHR5cGUuJCR0eXBlb2Y7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2ZUeXBlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vLyBBc3luY01vZGUgaXMgZGVwcmVjYXRlZCBhbG9uZyB3aXRoIGlzQXN5bmNNb2RlXG52YXIgQXN5bmNNb2RlID0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xudmFyIENvbmN1cnJlbnRNb2RlID0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG52YXIgQ29udGV4dENvbnN1bWVyID0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xudmFyIENvbnRleHRQcm92aWRlciA9IFJFQUNUX1BST1ZJREVSX1RZUEU7XG52YXIgRWxlbWVudCA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcbnZhciBGb3J3YXJkUmVmID0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbnZhciBGcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG52YXIgTGF6eSA9IFJFQUNUX0xBWllfVFlQRTtcbnZhciBNZW1vID0gUkVBQ1RfTUVNT19UWVBFO1xudmFyIFBvcnRhbCA9IFJFQUNUX1BPUlRBTF9UWVBFO1xudmFyIFByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbnZhciBTdHJpY3RNb2RlID0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbnZhciBTdXNwZW5zZSA9IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG5cbnZhciBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IGZhbHNlO1xuXG4vLyBBc3luY01vZGUgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcbmZ1bmN0aW9uIGlzQXN5bmNNb2RlKG9iamVjdCkge1xuICB7XG4gICAgaWYgKCFoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSkge1xuICAgICAgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSB0cnVlO1xuICAgICAgbG93UHJpb3JpdHlXYXJuaW5nJDEoZmFsc2UsICdUaGUgUmVhY3RJcy5pc0FzeW5jTW9kZSgpIGFsaWFzIGhhcyBiZWVuIGRlcHJlY2F0ZWQsICcgKyAnYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBSZWFjdCAxNysuIFVwZGF0ZSB5b3VyIGNvZGUgdG8gdXNlICcgKyAnUmVhY3RJcy5pc0NvbmN1cnJlbnRNb2RlKCkgaW5zdGVhZC4gSXQgaGFzIHRoZSBleGFjdCBzYW1lIEFQSS4nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB8fCB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dENvbnN1bWVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTlRFWFRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dFByb3ZpZGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST1ZJREVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZvcndhcmRSZWYob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRnJhZ21lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTGF6eShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9MQVpZX1RZUEU7XG59XG5mdW5jdGlvbiBpc01lbW8ob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTUVNT19UWVBFO1xufVxuZnVuY3Rpb24gaXNQb3J0YWwob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUE9SVEFMX1RZUEU7XG59XG5mdW5jdGlvbiBpc1Byb2ZpbGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N0cmljdE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3VzcGVuc2Uob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbn1cblxuZXhwb3J0cy50eXBlT2YgPSB0eXBlT2Y7XG5leHBvcnRzLkFzeW5jTW9kZSA9IEFzeW5jTW9kZTtcbmV4cG9ydHMuQ29uY3VycmVudE1vZGUgPSBDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuQ29udGV4dENvbnN1bWVyID0gQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5Db250ZXh0UHJvdmlkZXIgPSBDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLkVsZW1lbnQgPSBFbGVtZW50O1xuZXhwb3J0cy5Gb3J3YXJkUmVmID0gRm9yd2FyZFJlZjtcbmV4cG9ydHMuRnJhZ21lbnQgPSBGcmFnbWVudDtcbmV4cG9ydHMuTGF6eSA9IExhenk7XG5leHBvcnRzLk1lbW8gPSBNZW1vO1xuZXhwb3J0cy5Qb3J0YWwgPSBQb3J0YWw7XG5leHBvcnRzLlByb2ZpbGVyID0gUHJvZmlsZXI7XG5leHBvcnRzLlN0cmljdE1vZGUgPSBTdHJpY3RNb2RlO1xuZXhwb3J0cy5TdXNwZW5zZSA9IFN1c3BlbnNlO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGU7XG5leHBvcnRzLmlzQXN5bmNNb2RlID0gaXNBc3luY01vZGU7XG5leHBvcnRzLmlzQ29uY3VycmVudE1vZGUgPSBpc0NvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lciA9IGlzQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlciA9IGlzQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzRm9yd2FyZFJlZiA9IGlzRm9yd2FyZFJlZjtcbmV4cG9ydHMuaXNGcmFnbWVudCA9IGlzRnJhZ21lbnQ7XG5leHBvcnRzLmlzTGF6eSA9IGlzTGF6eTtcbmV4cG9ydHMuaXNNZW1vID0gaXNNZW1vO1xuZXhwb3J0cy5pc1BvcnRhbCA9IGlzUG9ydGFsO1xuZXhwb3J0cy5pc1Byb2ZpbGVyID0gaXNQcm9maWxlcjtcbmV4cG9ydHMuaXNTdHJpY3RNb2RlID0gaXNTdHJpY3RNb2RlO1xuZXhwb3J0cy5pc1N1c3BlbnNlID0gaXNTdXNwZW5zZTtcbiAgfSkoKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1wiY29tcG9uZW50c1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcImVlanNcIl1bXCJlZGl0b3JIb2NzXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiZWVqc1wiXVtcImkxOG5cIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJlZWpzXCJdW1wibW9kZWxcIl07IH0oKSk7IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJ3cFwiXVtcImJsb2Nrc1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIndwXCJdW1wiY29tcG9uZW50c1wiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIndwXCJdW1wiZGF0YVwiXTsgfSgpKTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIndwXCJdW1wiZWRpdG9yXCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wid3BcIl1bXCJlbGVtZW50XCJdOyB9KCkpOyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wibG9kYXNoXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
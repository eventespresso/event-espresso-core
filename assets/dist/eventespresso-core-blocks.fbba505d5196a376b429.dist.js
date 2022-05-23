/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/blocks/constants.js":
/*!****************************************!*\
  !*** ./assets/src/blocks/constants.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CSS_CLASS_CORE_BLOCKS": function() { return /* binding */ CSS_CLASS_CORE_BLOCKS; }
/* harmony export */ });
const CSS_CLASS_CORE_BLOCKS = 'ee-core-blocks event-espresso-blocks';

/***/ }),

/***/ "./assets/src/blocks/event-attendees/edit.js":
/*!***************************************************!*\
  !*** ./assets/src/blocks/event-attendees/edit.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventAttendeesEditor": function() { return /* binding */ EventAttendeesEditor; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @eventespresso/components */ "@eventespresso/components");
/* harmony import */ var _eventespresso_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _eventespresso_editor_hocs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @eventespresso/editor-hocs */ "@eventespresso/editor-hocs");
/* harmony import */ var _eventespresso_editor_hocs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_editor_hocs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _eventespresso_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @eventespresso/model */ "@eventespresso/model");
/* harmony import */ var _eventespresso_model__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_model__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../constants */ "./assets/src/blocks/constants.js");



/**
 * External dependencies
 */










/**
 * Internal dependencies
 */


const defaultQueryData = {
  showExpired: true,
  limit: 50
};

const isNewBlock = _ref => {
  let {
    eventId,
    datetimeId,
    ticketId
  } = _ref;
  return eventId === 0 && datetimeId === 0 && ticketId === 0;
};

const DEFAULT_ARRAY = [];
let highestRequestedLimit = 200;
/**
 * EventAttendeesEditor Component
 *
 * This returns the component for the `edit` argument on the `EventAttendees`
 * Block.
 */

class EventAttendeesEditor extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "setEventId", eventId => {
      const value = eventId !== null && eventId.value ? parseInt(eventId.value, 10) : 0;
      this.props.setAttributes({
        eventId: value,
        datetimeId: 0,
        ticketId: 0
      });
      this.setState({
        datetimeQueryData: { ...this.state.datetimeQueryData,
          forEventId: value
        }
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "setDatetimeId", datetimeId => {
      const value = datetimeId !== null && datetimeId.value ? parseInt(datetimeId.value, 10) : 0;
      this.props.setAttributes({
        datetimeId: value,
        ticketId: 0
      });
      this.setState({
        ticketQueryData: { ...this.state.ticketQueryData,
          forDatetimeId: value
        }
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "setTicketId", ticketId => {
      const value = ticketId !== null && ticketId.value ? parseInt(ticketId.value, 10) : 0;
      this.props.setAttributes({
        ticketId: value
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "setStatus", status => {
      const value = status !== null && status.value ? status.value : _eventespresso_model__WEBPACK_IMPORTED_MODULE_8__.statusModel.REGISTRATION_STATUS_ID.APPROVED;
      this.props.setAttributes({
        status: value
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "setLimit", limit => {
      this.props.setAttributes({
        limit: parseInt(limit, 10)
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "setOrderBy", orderBy => {
      this.props.setAttributes({
        orderBy
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "setOrder", order => {
      this.props.setAttributes({
        order
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "setAvatarSize", size => {
      this.props.setAttributes({
        avatarSize: parseInt(size, 10)
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "toggleShowGravatar", showGravatar => {
      this.props.setAttributes({
        showGravatar
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "toggleDisplayOnArchives", displayOnArchives => {
      this.props.setAttributes({
        displayOnArchives
      });
    });

    const {
      eventId: _eventId,
      datetimeId: _datetimeId
    } = this.props.attributes;
    this.state = {
      eventQueryData: { ...defaultQueryData
      },
      datetimeQueryData: { ...defaultQueryData,
        forEventId: _eventId
      },
      ticketQueryData: { ...defaultQueryData,
        forDatetimeId: _datetimeId
      },
      statusQueryData: { ...defaultQueryData,
        statusType: _eventespresso_model__WEBPACK_IMPORTED_MODULE_8__.statusModel.STATUS_TYPE_REGISTRATION
      }
    };
  }
  /**
   * Set eventId on attributes
   *
   * @param {Object} eventId
   */


  /**
   * Retrieve the Attendees List component for the given attributes
   *
   * @return {Component} What to display for the attendee display.
   */
  getAttendeesDisplay() {
    const {
      isLoading,
      attendees
    } = this.props;
    const {
      showGravatar,
      avatarSize,
      avatarClass
    } = this.props.attributes;
    const avatarOptions = {
      avatarWidth: avatarSize,
      avatarHeight: avatarSize,
      avatarClass
    };

    if (isLoading) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Placeholder, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null));
    }

    if (isNewBlock(this.props.attributes) && attendees === DEFAULT_ARRAY) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Placeholder, null, (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('To get started, select what event you want to show attendees from in the block settings.', 'event_espresso'));
    }

    if (!isLoading && (0,lodash__WEBPACK_IMPORTED_MODULE_9__.isEmpty)(attendees)) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Placeholder, null, (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('There are no attendees for selected options.', 'event_espresso'));
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_eventespresso_components__WEBPACK_IMPORTED_MODULE_6__.EventAttendeeList, {
      attendees: this.applyLimit(attendees),
      showGravatar: showGravatar,
      avatarOptions: avatarOptions,
      isLoading: isLoading,
      containerCssClass: _constants__WEBPACK_IMPORTED_MODULE_10__.CSS_CLASS_CORE_BLOCKS,
      containerId: 'ee-block-event-attendees'
    });
  }
  /**
   * This receives the array of attendees and applies the limit to it so that
   * only the set limit of attendees is returned from the beginning of the
   * array.
   *
   * @param {Array} attendees
   * @return {Array} A new array of attendees with the applied limit
   */


  applyLimit(attendees) {
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


  getInspectorControls(attributes) {
    const countAttendees = this.props.attendees.length || 0;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Filter By Settings', 'event_espresso')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_eventespresso_components__WEBPACK_IMPORTED_MODULE_6__.EditorEventSelect, {
      key: "attendees-event-select",
      selected: attributes.eventId,
      onSelect: this.setEventId,
      queryData: this.state.eventQueryData
    }), attributes.eventId !== 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_eventespresso_components__WEBPACK_IMPORTED_MODULE_6__.EditorDatetimeSelect, {
      key: "attendees-datetime-select",
      selected: attributes.datetimeId,
      onSelect: this.setDatetimeId,
      queryData: this.state.datetimeQueryData
    }), attributes.datetimeId !== 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_eventespresso_components__WEBPACK_IMPORTED_MODULE_6__.EditorTicketSelect, {
      key: "attendees-ticket-select",
      selected: attributes.ticketId,
      onSelect: this.setTicketId,
      queryData: this.state.ticketQueryData
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_eventespresso_components__WEBPACK_IMPORTED_MODULE_6__.EditorStatusSelect, {
      key: "attendees-status-select",
      selected: attributes.status,
      onSelect: this.setStatus,
      queryData: this.state.statusQueryData,
      label: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Select Registration Status', 'event_espresso')
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_eventespresso_components__WEBPACK_IMPORTED_MODULE_6__.QueryLimit, {
      label: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Number of Attendees to Display:', 'event_espresso'),
      limit: attributes.limit,
      onLimitChange: this.setLimit,
      min: 1,
      withSlider: false,
      help: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.sprintf)((0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__._n)('Used to adjust the number of attendees displayed (There is %d total attendee for the current filter settings).', 'Used to adjust the number of attendees displayed (There are %d total attendees for the current filter settings).', countAttendees, 'event_espresso'), countAttendees)
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
      label: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Order Attendees by:', 'event_espresso'),
      value: attributes.orderBy,
      options: [{
        label: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Attendee id', 'event_espresso'),
        value: 'id'
      }, {
        label: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Last name only', 'event_espresso'),
        value: 'lastNameOnly'
      }, {
        label: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('First name only', 'event_espresso'),
        value: 'firstNameOnly'
      }, {
        label: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('First, then Last name', 'event_espresso'),
        value: 'firstThenLastName'
      }, {
        label: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Last, then First name', 'event_espresso'),
        value: 'lastThenFirstName'
      }],
      onChange: this.setOrderBy
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
      label: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Sort order:', 'event_espresso'),
      value: attributes.order,
      options: [{
        label: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Ascending', 'event_espresso'),
        value: _eventespresso_model__WEBPACK_IMPORTED_MODULE_8__.QUERY_ORDER_ASC
      }, {
        label: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Descending', 'event_espresso'),
        value: _eventespresso_model__WEBPACK_IMPORTED_MODULE_8__.QUERY_ORDER_DESC
      }],
      onChange: this.setOrder
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Gravatar Setttings', 'event_espresso')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Display Gravatar', 'event_espresso'),
      checked: attributes.showGravatar,
      onChange: this.toggleShowGravatar,
      help: attributes.showGravatar ? (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Gravatar images are shown for each attendee.', 'event_espresso') : (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('No gravatar images are shown for each attendee.', 'event_espresso')
    }), attributes.showGravatar && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
      label: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Size of Gravatar', 'event_espresso'),
      value: attributes.avatarSize,
      min: 10,
      max: 128,
      onChange: this.setAvatarSize
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_eventespresso_editor_hocs__WEBPACK_IMPORTED_MODULE_7__.NotWithPostTypeCheck, {
      excludedPostTypeSlugs: 'page'
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
      title: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Archive Settings', 'event_espresso')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Display on Archives', 'event_espresso'),
      checked: attributes.displayOnArchives,
      onChange: this.toggleDisplayOnArchives,
      help: attributes.displayOnArchives ? (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Attendees are shown whenever this post is listed in an archive view.', 'event_espresso') : (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Attendees are hidden whenever this post is listed in an archive view.', 'event_espresso')
    }))));
  }

  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, this.getAttendeesDisplay(), this.getInspectorControls(this.props.attributes));
  }

}

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(EventAttendeesEditor, "propTypes", {
  attendees: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().array),
  isLoading: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),
  attributes: prop_types__WEBPACK_IMPORTED_MODULE_11___default().shape({
    eventId: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().number),
    datetimeId: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().number),
    ticketId: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().number),
    status: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string),
    showGravatar: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),
    displayOnArchives: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),
    limit: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().number),
    orderBy: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOf(['id', 'lastNameOnly', 'firstNameOnly', 'firstThenLastName', 'lastThenFirstName']),
    order: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOf(_eventespresso_model__WEBPACK_IMPORTED_MODULE_8__.ALLOWED_ORDER_VALUES),
    avatarSize: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().number),
    avatarClass: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string)
  })
});

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(EventAttendeesEditor, "defaultProps", {
  attendees: [],
  isLoading: true,
  attributes: {
    eventId: 0,
    datetimeId: 0,
    ticketId: 0,
    status: _eventespresso_model__WEBPACK_IMPORTED_MODULE_8__.statusModel.REGISTRATION_STATUS_ID.APPROVED,
    showGravatar: true,
    displayOnArchives: false,
    limit: 100,
    orderBy: 'lastThenFirstName',
    order: _eventespresso_model__WEBPACK_IMPORTED_MODULE_8__.QUERY_ORDER_ASC,
    avatarSize: 24,
    avatarClass: 'contact'
  }
});

/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.withSelect)((select, ownProps) => {
  const defaultProps = { ...EventAttendeesEditor.defaultProps.attributes
  };
  const {
    eventId = defaultProps.eventId,
    datetimeId = defaultProps.datetimeId,
    ticketId = defaultProps.ticketId,
    status = defaultProps.status,
    orderBy = defaultProps.orderBy,
    order = defaultProps.order,
    limit = defaultProps.limit
  } = ownProps.attributes; // This ensures that we don't query unnecessarily since if the limit is
  // lower than a query we've already done, then we already have cached data
  // for this limit (and cache is still busted by any other query changes)

  highestRequestedLimit = !limit || isNaN(limit) || limit <= highestRequestedLimit ? highestRequestedLimit : limit;
  const queryData = {
    forEventId: eventId,
    forDatetimeId: datetimeId,
    forTicketId: ticketId,
    forStatusId: status,
    showGravatar: true,
    defaultWhereConditions: 'full_this_minimum_others',
    order,
    orderBy,
    limit: highestRequestedLimit
  };
  const queryString = _eventespresso_model__WEBPACK_IMPORTED_MODULE_8__.attendeeModel.getQueryString(queryData);
  const {
    getAttendees,
    isRequestingAttendees
  } = select('eventespresso/lists');
  return { ...EventAttendeesEditor.defaultProps,
    ...ownProps,
    attributes: { ...EventAttendeesEditor.defaultProps.attributes,
      ...ownProps.attributes
    },
    attendees: isNewBlock({
      eventId,
      datetimeId,
      ticketId
    }) ? DEFAULT_ARRAY : getAttendees(queryString),
    isLoading: isRequestingAttendees(queryString)
  };
})(EventAttendeesEditor));

/***/ }),

/***/ "./assets/src/blocks/event-attendees/index.js":
/*!****************************************************!*\
  !*** ./assets/src/blocks/event-attendees/index.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "name": function() { return /* binding */ name; },
/* harmony export */   "settings": function() { return /* binding */ settings; }
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./assets/src/blocks/event-attendees/edit.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./assets/src/blocks/event-attendees/style.css");
/**
 * WordPress dependencies
 */

/**
 * External dependencies
 */


/**
 * Internal dependencies
 */



const name = 'eventespresso/event-attendees';
const settings = {
  title: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Event Attendees', 'event_espresso'),
  description: (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Displays a list of people that have registered for the specified event', 'event_espresso'),
  icon: 'groups',
  category: 'event-espresso',
  keywords: [(0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('event', 'event_espresso'), (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('attendees', 'event_espresso'), (0,_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('list', 'event_espresso')],
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

  save() {
    return null;
  }

};
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(name, settings);

/***/ }),

/***/ "./assets/src/blocks/event-attendees/style.css":
/*!*****************************************************!*\
  !*** ./assets/src/blocks/event-attendees/style.css ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ (function(module) {

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
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

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
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

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
    } catch (x) { /**/ }
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
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
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
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

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
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

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
    bigint: createPrimitiveTypeChecker('bigint'),
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
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
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
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
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

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
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
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
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
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
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

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
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
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
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
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
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
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

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
/***/ (function(module) {

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

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ (function(module) {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
/** @license React v16.13.1
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

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

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
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

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
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
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
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "@eventespresso/components":
/*!**************************************!*\
  !*** external ["eejs","components"] ***!
  \**************************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"]["components"];

/***/ }),

/***/ "@eventespresso/editor-hocs":
/*!**************************************!*\
  !*** external ["eejs","editorHocs"] ***!
  \**************************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"]["editorHocs"];

/***/ }),

/***/ "@eventespresso/i18n":
/*!********************************!*\
  !*** external ["eejs","i18n"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"]["i18n"];

/***/ }),

/***/ "@eventespresso/model":
/*!*********************************!*\
  !*** external ["eejs","model"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["eejs"]["model"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _defineProperty; }
/* harmony export */ });
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!************************************!*\
  !*** ./assets/src/blocks/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _event_attendees__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event-attendees */ "./assets/src/blocks/event-attendees/index.js");

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRlc3ByZXNzby1jb3JlLWJsb2Nrcy5mYmJhNTA1ZDUxOTZhMzc2YjQyOS5kaXN0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTUEscUJBQXFCLEdBQUcsc0NBQTlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBUUE7QUFDQTtBQU9BO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFFQSxNQUFNNEIsZ0JBQWdCLEdBQUc7RUFDeEJDLFdBQVcsRUFBRSxJQURXO0VBRXhCQyxLQUFLLEVBQUU7QUFGaUIsQ0FBekI7O0FBS0EsTUFBTUMsVUFBVSxHQUFHO0VBQUEsSUFBQztJQUFFQyxPQUFGO0lBQVdDLFVBQVg7SUFBdUJDO0VBQXZCLENBQUQ7RUFBQSxPQUNsQkYsT0FBTyxLQUFLLENBQVosSUFBaUJDLFVBQVUsS0FBSyxDQUFoQyxJQUFxQ0MsUUFBUSxLQUFLLENBRGhDO0FBQUEsQ0FBbkI7O0FBR0EsTUFBTUMsYUFBYSxHQUFHLEVBQXRCO0FBRUEsSUFBSUMscUJBQXFCLEdBQUcsR0FBNUI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sTUFBTUMsb0JBQU4sU0FBbUNuQyx5REFBbkMsQ0FBNkM7RUEyQ25EO0FBQ0Q7QUFDQTtFQUNDb0MsV0FBVyxDQUFDQyxLQUFELEVBQVE7SUFDbEIsTUFBTUEsS0FBTjs7SUFEa0Isc0dBMkJMUCxPQUFELElBQWE7TUFDekIsTUFBTVEsS0FBSyxHQUNWUixPQUFPLEtBQUssSUFBWixJQUFvQkEsT0FBTyxDQUFDUSxLQUE1QixHQUFvQ0MsUUFBUSxDQUFDVCxPQUFPLENBQUNRLEtBQVQsRUFBZ0IsRUFBaEIsQ0FBNUMsR0FBa0UsQ0FEbkU7TUFFQSxLQUFLRCxLQUFMLENBQVdHLGFBQVgsQ0FBeUI7UUFDeEJWLE9BQU8sRUFBRVEsS0FEZTtRQUV4QlAsVUFBVSxFQUFFLENBRlk7UUFHeEJDLFFBQVEsRUFBRTtNQUhjLENBQXpCO01BS0EsS0FBS1MsUUFBTCxDQUFjO1FBQ2JDLGlCQUFpQixFQUFFLEVBQ2xCLEdBQUcsS0FBS0MsS0FBTCxDQUFXRCxpQkFESTtVQUVsQkUsVUFBVSxFQUFFTjtRQUZNO01BRE4sQ0FBZDtJQU1BLENBekNrQjs7SUFBQSx5R0FnREZQLFVBQUQsSUFBZ0I7TUFDL0IsTUFBTU8sS0FBSyxHQUNWUCxVQUFVLEtBQUssSUFBZixJQUF1QkEsVUFBVSxDQUFDTyxLQUFsQyxHQUNHQyxRQUFRLENBQUNSLFVBQVUsQ0FBQ08sS0FBWixFQUFtQixFQUFuQixDQURYLEdBRUcsQ0FISjtNQUlBLEtBQUtELEtBQUwsQ0FBV0csYUFBWCxDQUF5QjtRQUN4QlQsVUFBVSxFQUFFTyxLQURZO1FBRXhCTixRQUFRLEVBQUU7TUFGYyxDQUF6QjtNQUlBLEtBQUtTLFFBQUwsQ0FBYztRQUNiSSxlQUFlLEVBQUUsRUFDaEIsR0FBRyxLQUFLRixLQUFMLENBQVdFLGVBREU7VUFFaEJDLGFBQWEsRUFBRVI7UUFGQztNQURKLENBQWQ7SUFNQSxDQS9Ea0I7O0lBQUEsdUdBc0VKTixRQUFELElBQWM7TUFDM0IsTUFBTU0sS0FBSyxHQUNWTixRQUFRLEtBQUssSUFBYixJQUFxQkEsUUFBUSxDQUFDTSxLQUE5QixHQUNHQyxRQUFRLENBQUNQLFFBQVEsQ0FBQ00sS0FBVixFQUFpQixFQUFqQixDQURYLEdBRUcsQ0FISjtNQUlBLEtBQUtELEtBQUwsQ0FBV0csYUFBWCxDQUF5QjtRQUFFUixRQUFRLEVBQUVNO01BQVosQ0FBekI7SUFDQSxDQTVFa0I7O0lBQUEscUdBbUZOUyxNQUFELElBQVk7TUFDdkIsTUFBTVQsS0FBSyxHQUNWUyxNQUFNLEtBQUssSUFBWCxJQUFtQkEsTUFBTSxDQUFDVCxLQUExQixHQUNHUyxNQUFNLENBQUNULEtBRFYsR0FFR25CLDZGQUhKO01BSUEsS0FBS2tCLEtBQUwsQ0FBV0csYUFBWCxDQUF5QjtRQUFFTyxNQUFNLEVBQUVUO01BQVYsQ0FBekI7SUFDQSxDQXpGa0I7O0lBQUEsb0dBZ0dQVixLQUFELElBQVc7TUFDckIsS0FBS1MsS0FBTCxDQUFXRyxhQUFYLENBQXlCO1FBQ3hCWixLQUFLLEVBQUVXLFFBQVEsQ0FBQ1gsS0FBRCxFQUFRLEVBQVI7TUFEUyxDQUF6QjtJQUdBLENBcEdrQjs7SUFBQSxzR0EyR0xzQixPQUFELElBQWE7TUFDekIsS0FBS2IsS0FBTCxDQUFXRyxhQUFYLENBQXlCO1FBQUVVO01BQUYsQ0FBekI7SUFDQSxDQTdHa0I7O0lBQUEsb0dBb0hQQyxLQUFELElBQVc7TUFDckIsS0FBS2QsS0FBTCxDQUFXRyxhQUFYLENBQXlCO1FBQUVXO01BQUYsQ0FBekI7SUFDQSxDQXRIa0I7O0lBQUEseUdBNkhGQyxJQUFELElBQVU7TUFDekIsS0FBS2YsS0FBTCxDQUFXRyxhQUFYLENBQXlCO1FBQ3hCYSxVQUFVLEVBQUVkLFFBQVEsQ0FBQ2EsSUFBRCxFQUFPLEVBQVA7TUFESSxDQUF6QjtJQUdBLENBaklrQjs7SUFBQSw4R0F3SUdFLFlBQUQsSUFBa0I7TUFDdEMsS0FBS2pCLEtBQUwsQ0FBV0csYUFBWCxDQUF5QjtRQUFFYztNQUFGLENBQXpCO0lBQ0EsQ0ExSWtCOztJQUFBLG1IQWlKUUMsaUJBQUQsSUFBdUI7TUFDaEQsS0FBS2xCLEtBQUwsQ0FBV0csYUFBWCxDQUF5QjtRQUFFZTtNQUFGLENBQXpCO0lBQ0EsQ0FuSmtCOztJQUVsQixNQUFNO01BQUV6QixPQUFPLEVBQVBBLFFBQUY7TUFBV0MsVUFBVSxFQUFWQTtJQUFYLElBQTBCLEtBQUtNLEtBQUwsQ0FBV21CLFVBQTNDO0lBQ0EsS0FBS2IsS0FBTCxHQUFhO01BQ1pjLGNBQWMsRUFBRSxFQUNmLEdBQUcvQjtNQURZLENBREo7TUFJWmdCLGlCQUFpQixFQUFFLEVBQ2xCLEdBQUdoQixnQkFEZTtRQUVsQmtCLFVBQVUsRUFBRWQ7TUFGTSxDQUpQO01BUVplLGVBQWUsRUFBRSxFQUNoQixHQUFHbkIsZ0JBRGE7UUFFaEJvQixhQUFhLEVBQUVmO01BRkMsQ0FSTDtNQVlaMkIsZUFBZSxFQUFFLEVBQ2hCLEdBQUdoQyxnQkFEYTtRQUVoQmlDLFVBQVUsRUFBRXhDLHNGQUFvQ3lDO01BRmhDO0lBWkwsQ0FBYjtFQWlCQTtFQUVEO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7OztFQTJIQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0VBQ0NDLG1CQUFtQixHQUFHO0lBQ3JCLE1BQU07TUFBRUMsU0FBRjtNQUFhQztJQUFiLElBQTJCLEtBQUsxQixLQUF0QztJQUNBLE1BQU07TUFBRWlCLFlBQUY7TUFBZ0JELFVBQWhCO01BQTRCVztJQUE1QixJQUE0QyxLQUFLM0IsS0FBTCxDQUFXbUIsVUFBN0Q7SUFFQSxNQUFNUyxhQUFhLEdBQUc7TUFDckJDLFdBQVcsRUFBRWIsVUFEUTtNQUVyQmMsWUFBWSxFQUFFZCxVQUZPO01BR3JCVztJQUhxQixDQUF0Qjs7SUFNQSxJQUFJRixTQUFKLEVBQWU7TUFDZCxPQUNDLGtFQUFDLDhEQUFELFFBQ0Msa0VBQUMsMERBQUQsT0FERCxDQUREO0lBS0E7O0lBRUQsSUFBSWpDLFVBQVUsQ0FBQyxLQUFLUSxLQUFMLENBQVdtQixVQUFaLENBQVYsSUFBcUNPLFNBQVMsS0FBSzlCLGFBQXZELEVBQXNFO01BQ3JFLE9BQ0Msa0VBQUMsOERBQUQsUUFDRXRCLHVEQUFFLENBQ0YsMEZBREUsRUFFRixnQkFGRSxDQURKLENBREQ7SUFRQTs7SUFFRCxJQUFJLENBQUNtRCxTQUFELElBQWNyQywrQ0FBTyxDQUFDc0MsU0FBRCxDQUF6QixFQUFzQztNQUNyQyxPQUNDLGtFQUFDLDhEQUFELFFBQ0VwRCx1REFBRSxDQUNGLDhDQURFLEVBRUYsZ0JBRkUsQ0FESixDQUREO0lBUUE7O0lBQ0QsT0FDQyxrRUFBQyx3RUFBRDtNQUNDLFNBQVMsRUFBRSxLQUFLeUQsVUFBTCxDQUFnQkwsU0FBaEIsQ0FEWjtNQUVDLFlBQVksRUFBRVQsWUFGZjtNQUdDLGFBQWEsRUFBRVcsYUFIaEI7TUFJQyxTQUFTLEVBQUVILFNBSlo7TUFLQyxpQkFBaUIsRUFBRWhFLDhEQUxwQjtNQU1DLFdBQVcsRUFBRTtJQU5kLEVBREQ7RUFVQTtFQUVEO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztFQUNDc0UsVUFBVSxDQUFDTCxTQUFELEVBQVk7SUFDckIsSUFBSUEsU0FBUyxDQUFDTSxNQUFWLElBQW9CLEtBQUtoQyxLQUFMLENBQVdtQixVQUFYLENBQXNCNUIsS0FBOUMsRUFBcUQ7TUFDcEQsT0FBT21DLFNBQVA7SUFDQTs7SUFDRCxPQUFPQSxTQUFTLENBQUNPLEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUIsS0FBS2pDLEtBQUwsQ0FBV21CLFVBQVgsQ0FBc0I1QixLQUF6QyxDQUFQO0VBQ0E7RUFFRDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztFQUNDMkMsb0JBQW9CLENBQUNmLFVBQUQsRUFBYTtJQUNoQyxNQUFNZ0IsY0FBYyxHQUFHLEtBQUtuQyxLQUFMLENBQVcwQixTQUFYLENBQXFCTSxNQUFyQixJQUErQixDQUF0RDtJQUNBLE9BQ0Msa0VBQUMsc0VBQUQsUUFDQyxrRUFBQyw0REFBRDtNQUFXLEtBQUssRUFBRTFELHVEQUFFLENBQUMsb0JBQUQsRUFBdUIsZ0JBQXZCO0lBQXBCLEdBQ0Msa0VBQUMsd0VBQUQ7TUFDQyxHQUFHLEVBQUMsd0JBREw7TUFFQyxRQUFRLEVBQUU2QyxVQUFVLENBQUMxQixPQUZ0QjtNQUdDLFFBQVEsRUFBRSxLQUFLMkMsVUFIaEI7TUFJQyxTQUFTLEVBQUUsS0FBSzlCLEtBQUwsQ0FBV2M7SUFKdkIsRUFERCxFQU9FRCxVQUFVLENBQUMxQixPQUFYLEtBQXVCLENBQXZCLElBQ0Esa0VBQUMsMkVBQUQ7TUFDQyxHQUFHLEVBQUMsMkJBREw7TUFFQyxRQUFRLEVBQUUwQixVQUFVLENBQUN6QixVQUZ0QjtNQUdDLFFBQVEsRUFBRSxLQUFLMkMsYUFIaEI7TUFJQyxTQUFTLEVBQUUsS0FBSy9CLEtBQUwsQ0FBV0Q7SUFKdkIsRUFSRixFQWVFYyxVQUFVLENBQUN6QixVQUFYLEtBQTBCLENBQTFCLElBQ0Esa0VBQUMseUVBQUQ7TUFDQyxHQUFHLEVBQUMseUJBREw7TUFFQyxRQUFRLEVBQUV5QixVQUFVLENBQUN4QixRQUZ0QjtNQUdDLFFBQVEsRUFBRSxLQUFLMkMsV0FIaEI7TUFJQyxTQUFTLEVBQUUsS0FBS2hDLEtBQUwsQ0FBV0U7SUFKdkIsRUFoQkYsRUF1QkMsa0VBQUMseUVBQUQ7TUFDQyxHQUFHLEVBQUMseUJBREw7TUFFQyxRQUFRLEVBQUVXLFVBQVUsQ0FBQ1QsTUFGdEI7TUFHQyxRQUFRLEVBQUUsS0FBSzZCLFNBSGhCO01BSUMsU0FBUyxFQUFFLEtBQUtqQyxLQUFMLENBQVdlLGVBSnZCO01BS0MsS0FBSyxFQUFFL0MsdURBQUUsQ0FDUiw0QkFEUSxFQUVSLGdCQUZRO0lBTFYsRUF2QkQsRUFpQ0Msa0VBQUMsaUVBQUQ7TUFDQyxLQUFLLEVBQUVBLHVEQUFFLENBQ1IsaUNBRFEsRUFFUixnQkFGUSxDQURWO01BS0MsS0FBSyxFQUFFNkMsVUFBVSxDQUFDNUIsS0FMbkI7TUFNQyxhQUFhLEVBQUUsS0FBS2lELFFBTnJCO01BT0MsR0FBRyxFQUFFLENBUE47TUFRQyxVQUFVLEVBQUUsS0FSYjtNQVNDLElBQUksRUFBRXBFLDREQUFPLENBQ1pDLHVEQUFFLENBQ0QsZ0hBREMsRUFFRCxrSEFGQyxFQUdEOEQsY0FIQyxFQUlELGdCQUpDLENBRFUsRUFPWkEsY0FQWTtJQVRkLEVBakNELEVBb0RDLGtFQUFDLGdFQUFEO01BQ0MsS0FBSyxFQUFFN0QsdURBQUUsQ0FBQyxxQkFBRCxFQUF3QixnQkFBeEIsQ0FEVjtNQUVDLEtBQUssRUFBRTZDLFVBQVUsQ0FBQ04sT0FGbkI7TUFHQyxPQUFPLEVBQUUsQ0FDUjtRQUNDNEIsS0FBSyxFQUFFbkUsdURBQUUsQ0FBQyxhQUFELEVBQWdCLGdCQUFoQixDQURWO1FBRUMyQixLQUFLLEVBQUU7TUFGUixDQURRLEVBS1I7UUFDQ3dDLEtBQUssRUFBRW5FLHVEQUFFLENBQUMsZ0JBQUQsRUFBbUIsZ0JBQW5CLENBRFY7UUFFQzJCLEtBQUssRUFBRTtNQUZSLENBTFEsRUFTUjtRQUNDd0MsS0FBSyxFQUFFbkUsdURBQUUsQ0FBQyxpQkFBRCxFQUFvQixnQkFBcEIsQ0FEVjtRQUVDMkIsS0FBSyxFQUFFO01BRlIsQ0FUUSxFQWFSO1FBQ0N3QyxLQUFLLEVBQUVuRSx1REFBRSxDQUNSLHVCQURRLEVBRVIsZ0JBRlEsQ0FEVjtRQUtDMkIsS0FBSyxFQUFFO01BTFIsQ0FiUSxFQW9CUjtRQUNDd0MsS0FBSyxFQUFFbkUsdURBQUUsQ0FDUix1QkFEUSxFQUVSLGdCQUZRLENBRFY7UUFLQzJCLEtBQUssRUFBRTtNQUxSLENBcEJRLENBSFY7TUErQkMsUUFBUSxFQUFFLEtBQUt5QztJQS9CaEIsRUFwREQsRUFxRkMsa0VBQUMsZ0VBQUQ7TUFDQyxLQUFLLEVBQUVwRSx1REFBRSxDQUFDLGFBQUQsRUFBZ0IsZ0JBQWhCLENBRFY7TUFFQyxLQUFLLEVBQUU2QyxVQUFVLENBQUNMLEtBRm5CO01BR0MsT0FBTyxFQUFFLENBQ1I7UUFDQzJCLEtBQUssRUFBRW5FLHVEQUFFLENBQUMsV0FBRCxFQUFjLGdCQUFkLENBRFY7UUFFQzJCLEtBQUssRUFBRWpCLGlFQUFlQTtNQUZ2QixDQURRLEVBS1I7UUFDQ3lELEtBQUssRUFBRW5FLHVEQUFFLENBQUMsWUFBRCxFQUFlLGdCQUFmLENBRFY7UUFFQzJCLEtBQUssRUFBRWhCLGtFQUFnQkE7TUFGeEIsQ0FMUSxDQUhWO01BYUMsUUFBUSxFQUFFLEtBQUswRDtJQWJoQixFQXJGRCxDQURELEVBc0dDLGtFQUFDLDREQUFEO01BQVcsS0FBSyxFQUFFckUsdURBQUUsQ0FBQyxvQkFBRCxFQUF1QixnQkFBdkI7SUFBcEIsR0FDQyxrRUFBQyxnRUFBRDtNQUNDLEtBQUssRUFBRUEsdURBQUUsQ0FBQyxrQkFBRCxFQUFxQixnQkFBckIsQ0FEVjtNQUVDLE9BQU8sRUFBRTZDLFVBQVUsQ0FBQ0YsWUFGckI7TUFHQyxRQUFRLEVBQUUsS0FBSzJCLGtCQUhoQjtNQUlDLElBQUksRUFDSHpCLFVBQVUsQ0FBQ0YsWUFBWCxHQUNHM0MsdURBQUUsQ0FDRiw4Q0FERSxFQUVGLGdCQUZFLENBREwsR0FLR0EsdURBQUUsQ0FDRixpREFERSxFQUVGLGdCQUZFO0lBVlAsRUFERCxFQWlCRTZDLFVBQVUsQ0FBQ0YsWUFBWCxJQUNBLGtFQUFDLCtEQUFEO01BQ0MsS0FBSyxFQUFFM0MsdURBQUUsQ0FBQyxrQkFBRCxFQUFxQixnQkFBckIsQ0FEVjtNQUVDLEtBQUssRUFBRTZDLFVBQVUsQ0FBQ0gsVUFGbkI7TUFHQyxHQUFHLEVBQUUsRUFITjtNQUlDLEdBQUcsRUFBRSxHQUpOO01BS0MsUUFBUSxFQUFFLEtBQUs2QjtJQUxoQixFQWxCRixDQXRHRCxFQWlJQyxrRUFBQyw0RUFBRDtNQUFzQixxQkFBcUIsRUFBRTtJQUE3QyxHQUNDLGtFQUFDLDREQUFEO01BQVcsS0FBSyxFQUFFdkUsdURBQUUsQ0FBQyxrQkFBRCxFQUFxQixnQkFBckI7SUFBcEIsR0FDQyxrRUFBQyxnRUFBRDtNQUNDLEtBQUssRUFBRUEsdURBQUUsQ0FBQyxxQkFBRCxFQUF3QixnQkFBeEIsQ0FEVjtNQUVDLE9BQU8sRUFBRTZDLFVBQVUsQ0FBQ0QsaUJBRnJCO01BR0MsUUFBUSxFQUFFLEtBQUs0Qix1QkFIaEI7TUFJQyxJQUFJLEVBQ0gzQixVQUFVLENBQUNELGlCQUFYLEdBQ0c1Qyx1REFBRSxDQUNGLHNFQURFLEVBRUYsZ0JBRkUsQ0FETCxHQUtHQSx1REFBRSxDQUNGLHVFQURFLEVBRUYsZ0JBRkU7SUFWUCxFQURELENBREQsQ0FqSUQsQ0FERDtFQXdKQTs7RUFFRHlFLE1BQU0sR0FBRztJQUNSLE9BQ0Msa0VBQUMsd0RBQUQsUUFDRSxLQUFLdkIsbUJBQUwsRUFERixFQUVFLEtBQUtVLG9CQUFMLENBQTBCLEtBQUtsQyxLQUFMLENBQVdtQixVQUFyQyxDQUZGLENBREQ7RUFNQTs7QUFuYmtEOztrRkFBdkNyQixtQ0FDTztFQUNsQjRCLFNBQVMsRUFBRXZDLDBEQURPO0VBRWxCc0MsU0FBUyxFQUFFdEMseURBRk87RUFHbEJnQyxVQUFVLEVBQUVoQyx3REFBQSxDQUFnQjtJQUMzQk0sT0FBTyxFQUFFTiwyREFEa0I7SUFFM0JPLFVBQVUsRUFBRVAsMkRBRmU7SUFHM0JRLFFBQVEsRUFBRVIsMkRBSGlCO0lBSTNCdUIsTUFBTSxFQUFFdkIsMkRBSm1CO0lBSzNCOEIsWUFBWSxFQUFFOUIseURBTGE7SUFNM0IrQixpQkFBaUIsRUFBRS9CLHlEQU5RO0lBTzNCSSxLQUFLLEVBQUVKLDJEQVBvQjtJQVEzQjBCLE9BQU8sRUFBRTFCLHdEQUFBLENBQWdCLENBQ3hCLElBRHdCLEVBRXhCLGNBRndCLEVBR3hCLGVBSHdCLEVBSXhCLG1CQUp3QixFQUt4QixtQkFMd0IsQ0FBaEIsQ0FSa0I7SUFlM0IyQixLQUFLLEVBQUUzQix3REFBQSxDQUFnQkQsc0VBQWhCLENBZm9CO0lBZ0IzQjhCLFVBQVUsRUFBRTdCLDJEQWhCZTtJQWlCM0J3QyxXQUFXLEVBQUV4QywyREFBZ0JpRTtFQWpCRixDQUFoQjtBQUhNOztrRkFEUHRELHNDQXlCVTtFQUNyQjRCLFNBQVMsRUFBRSxFQURVO0VBRXJCRCxTQUFTLEVBQUUsSUFGVTtFQUdyQk4sVUFBVSxFQUFFO0lBQ1gxQixPQUFPLEVBQUUsQ0FERTtJQUVYQyxVQUFVLEVBQUUsQ0FGRDtJQUdYQyxRQUFRLEVBQUUsQ0FIQztJQUlYZSxNQUFNLEVBQUU1Qiw2RkFKRztJQUtYbUMsWUFBWSxFQUFFLElBTEg7SUFNWEMsaUJBQWlCLEVBQUUsS0FOUjtJQU9YM0IsS0FBSyxFQUFFLEdBUEk7SUFRWHNCLE9BQU8sRUFBRSxtQkFSRTtJQVNYQyxLQUFLLEVBQUU5QixpRUFUSTtJQVVYZ0MsVUFBVSxFQUFFLEVBVkQ7SUFXWFcsV0FBVyxFQUFFO0VBWEY7QUFIUzs7QUE2WnZCLCtEQUFleEQsMkRBQVUsQ0FBQyxDQUFDbUYsTUFBRCxFQUFTQyxRQUFULEtBQXNCO0VBQy9DLE1BQU1DLFlBQVksR0FBRyxFQUFFLEdBQUcxRCxvQkFBb0IsQ0FBQzBELFlBQXJCLENBQWtDckM7RUFBdkMsQ0FBckI7RUFDQSxNQUFNO0lBQ0wxQixPQUFPLEdBQUcrRCxZQUFZLENBQUMvRCxPQURsQjtJQUVMQyxVQUFVLEdBQUc4RCxZQUFZLENBQUM5RCxVQUZyQjtJQUdMQyxRQUFRLEdBQUc2RCxZQUFZLENBQUM3RCxRQUhuQjtJQUlMZSxNQUFNLEdBQUc4QyxZQUFZLENBQUM5QyxNQUpqQjtJQUtMRyxPQUFPLEdBQUcyQyxZQUFZLENBQUMzQyxPQUxsQjtJQU1MQyxLQUFLLEdBQUcwQyxZQUFZLENBQUMxQyxLQU5oQjtJQU9MdkIsS0FBSyxHQUFHaUUsWUFBWSxDQUFDakU7RUFQaEIsSUFRRmdFLFFBQVEsQ0FBQ3BDLFVBUmIsQ0FGK0MsQ0FZL0M7RUFDQTtFQUNBOztFQUNBdEIscUJBQXFCLEdBQ3BCLENBQUNOLEtBQUQsSUFBVWtFLEtBQUssQ0FBQ2xFLEtBQUQsQ0FBZixJQUEwQkEsS0FBSyxJQUFJTSxxQkFBbkMsR0FDR0EscUJBREgsR0FFR04sS0FISjtFQUtBLE1BQU1tRSxTQUFTLEdBQUc7SUFDakJuRCxVQUFVLEVBQUVkLE9BREs7SUFFakJnQixhQUFhLEVBQUVmLFVBRkU7SUFHakJpRSxXQUFXLEVBQUVoRSxRQUhJO0lBSWpCaUUsV0FBVyxFQUFFbEQsTUFKSTtJQUtqQk8sWUFBWSxFQUFFLElBTEc7SUFNakI0QyxzQkFBc0IsRUFBRSwwQkFOUDtJQU9qQi9DLEtBUGlCO0lBUWpCRCxPQVJpQjtJQVNqQnRCLEtBQUssRUFBRU07RUFUVSxDQUFsQjtFQVlBLE1BQU1pRSxXQUFXLEdBQUcvRSw4RUFBQSxDQUE2QjJFLFNBQTdCLENBQXBCO0VBQ0EsTUFBTTtJQUFFTSxZQUFGO0lBQWdCQztFQUFoQixJQUEwQ1gsTUFBTSxDQUNyRCxxQkFEcUQsQ0FBdEQ7RUFHQSxPQUFPLEVBQ04sR0FBR3hELG9CQUFvQixDQUFDMEQsWUFEbEI7SUFFTixHQUFHRCxRQUZHO0lBR05wQyxVQUFVLEVBQUUsRUFDWCxHQUFHckIsb0JBQW9CLENBQUMwRCxZQUFyQixDQUFrQ3JDLFVBRDFCO01BRVgsR0FBR29DLFFBQVEsQ0FBQ3BDO0lBRkQsQ0FITjtJQU9OTyxTQUFTLEVBQUVsQyxVQUFVLENBQUM7TUFBRUMsT0FBRjtNQUFXQyxVQUFYO01BQXVCQztJQUF2QixDQUFELENBQVYsR0FDUkMsYUFEUSxHQUVSb0UsWUFBWSxDQUFDRixXQUFELENBVFQ7SUFVTnJDLFNBQVMsRUFBRXdDLHFCQUFxQixDQUFDSCxXQUFEO0VBVjFCLENBQVA7QUFZQSxDQWhEd0IsQ0FBVixDQWdEWmhFLG9CQWhEWSxDQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL2VBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFFTyxNQUFNcUUsSUFBSSxHQUFHLCtCQUFiO0FBRUEsTUFBTUMsUUFBUSxHQUFHO0VBQ3ZCQyxLQUFLLEVBQUUvRix1REFBRSxDQUFDLGlCQUFELEVBQW9CLGdCQUFwQixDQURjO0VBR3ZCZ0csV0FBVyxFQUFFaEcsdURBQUUsQ0FDZCx3RUFEYyxFQUVkLGdCQUZjLENBSFE7RUFRdkJpRyxJQUFJLEVBQUUsUUFSaUI7RUFVdkJDLFFBQVEsRUFBRSxnQkFWYTtFQVl2QkMsUUFBUSxFQUFFLENBQ1RuRyx1REFBRSxDQUFDLE9BQUQsRUFBVSxnQkFBVixDQURPLEVBRVRBLHVEQUFFLENBQUMsV0FBRCxFQUFjLGdCQUFkLENBRk8sRUFHVEEsdURBQUUsQ0FBQyxNQUFELEVBQVMsZ0JBQVQsQ0FITyxDQVphO0VBa0J2QjZDLFVBQVUsRUFBRTtJQUNYMUIsT0FBTyxFQUFFO01BQ1JpRixJQUFJLEVBQUUsUUFERTtNQUVSQyxPQUFPLEVBQUU7SUFGRCxDQURFO0lBS1hqRixVQUFVLEVBQUU7TUFDWGdGLElBQUksRUFBRSxRQURLO01BRVhDLE9BQU8sRUFBRTtJQUZFLENBTEQ7SUFTWGhGLFFBQVEsRUFBRTtNQUNUK0UsSUFBSSxFQUFFLFFBREc7TUFFVEMsT0FBTyxFQUFFO0lBRkEsQ0FUQztJQWFYakUsTUFBTSxFQUFFO01BQ1BnRSxJQUFJLEVBQUUsUUFEQztNQUVQQyxPQUFPLEVBQUU7SUFGRixDQWJHO0lBaUJYcEYsS0FBSyxFQUFFO01BQ05tRixJQUFJLEVBQUUsUUFEQTtNQUVOQyxPQUFPLEVBQUU7SUFGSCxDQWpCSTtJQXFCWDdELEtBQUssRUFBRTtNQUNONEQsSUFBSSxFQUFFLFFBREE7TUFFTkMsT0FBTyxFQUFFO0lBRkgsQ0FyQkk7SUF5Qlg5RCxPQUFPLEVBQUU7TUFDUjZELElBQUksRUFBRSxRQURFO01BRVJDLE9BQU8sRUFBRTtJQUZELENBekJFO0lBNkJYMUQsWUFBWSxFQUFFO01BQ2J5RCxJQUFJLEVBQUUsU0FETztNQUViQyxPQUFPLEVBQUU7SUFGSSxDQTdCSDtJQWlDWGhELFdBQVcsRUFBRTtNQUNaK0MsSUFBSSxFQUFFLFFBRE07TUFFWkMsT0FBTyxFQUFFO0lBRkcsQ0FqQ0Y7SUFxQ1gzRCxVQUFVLEVBQUU7TUFDWDBELElBQUksRUFBRSxRQURLO01BRVhDLE9BQU8sRUFBRTtJQUZFLENBckNEO0lBeUNYekQsaUJBQWlCLEVBQUU7TUFDbEJ3RCxJQUFJLEVBQUUsU0FEWTtNQUVsQkMsT0FBTyxFQUFFO0lBRlM7RUF6Q1IsQ0FsQlc7RUFpRXZCQyxJQUFJLEVBQUU5RSw2Q0FqRWlCOztFQW1FdkIrRSxJQUFJLEdBQUc7SUFDTixPQUFPLElBQVA7RUFDQTs7QUFyRXNCLENBQWpCO0FBd0VQWCxvRUFBaUIsQ0FBQ0MsSUFBRCxFQUFPQyxRQUFQLENBQWpCOzs7Ozs7Ozs7Ozs7QUMxRkE7QUFDQSwrREFBZSxFQUFFOzs7Ozs7Ozs7OztBQ0RqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7O0FBRUEsSUFBSSxJQUFxQztBQUN6Qyw2QkFBNkIsbUJBQU8sQ0FBQyx5RkFBNEI7QUFDakU7QUFDQSxZQUFZLG1CQUFPLENBQUMsdURBQVc7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxZQUFZO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxXQUFXO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLE1BQU0sSUFBcUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZHQUE2RztBQUM3RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxJQUFxQztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsY0FBYyxtQkFBTyxDQUFDLDBFQUFVO0FBQ2hDLGFBQWEsbUJBQU8sQ0FBQyw0REFBZTs7QUFFcEMsMkJBQTJCLG1CQUFPLENBQUMseUZBQTRCO0FBQy9ELFVBQVUsbUJBQU8sQ0FBQyx1REFBVztBQUM3QixxQkFBcUIsbUJBQU8sQ0FBQyxxRUFBa0I7O0FBRS9DOztBQUVBLElBQUksSUFBcUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsOEJBQThCO0FBQzlCLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixLQUFLO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsNEJBQTRCO0FBQzVCLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLElBQXFDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsU0FBUyxLQUFxQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHNCQUFzQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsSUFBcUM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsMkJBQTJCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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Ozs7OztBQ3BMYTs7QUFFYixJQUFJLEtBQXFDLEVBQUUsRUFFMUMsQ0FBQztBQUNGLEVBQUUsd0pBQXlEO0FBQzNEOzs7Ozs7Ozs7Ozs7QUNOQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCIsInNvdXJjZXMiOlsid2VicGFjazovL0BldmVudGVzcHJlc3NvL2NvcmUvLi9hc3NldHMvc3JjL2Jsb2Nrcy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQGV2ZW50ZXNwcmVzc28vY29yZS8uL2Fzc2V0cy9zcmMvYmxvY2tzL2V2ZW50LWF0dGVuZGVlcy9lZGl0LmpzIiwid2VicGFjazovL0BldmVudGVzcHJlc3NvL2NvcmUvLi9hc3NldHMvc3JjL2Jsb2Nrcy9ldmVudC1hdHRlbmRlZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGV2ZW50ZXNwcmVzc28vY29yZS8uL2Fzc2V0cy9zcmMvYmxvY2tzL2V2ZW50LWF0dGVuZGVlcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vQGV2ZW50ZXNwcmVzc28vY29yZS8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL0BldmVudGVzcHJlc3NvL2NvcmUvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIndlYnBhY2s6Ly9AZXZlbnRlc3ByZXNzby9jb3JlLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vQGV2ZW50ZXNwcmVzc28vY29yZS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzIiwid2VicGFjazovL0BldmVudGVzcHJlc3NvL2NvcmUvLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJ3ZWJwYWNrOi8vQGV2ZW50ZXNwcmVzc28vY29yZS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9oYXMuanMiLCJ3ZWJwYWNrOi8vQGV2ZW50ZXNwcmVzc28vY29yZS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMiLCJ3ZWJwYWNrOi8vQGV2ZW50ZXNwcmVzc28vY29yZS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9AZXZlbnRlc3ByZXNzby9jb3JlL2V4dGVybmFsIHdpbmRvdyBcImxvZGFzaFwiIiwid2VicGFjazovL0BldmVudGVzcHJlc3NvL2NvcmUvZXh0ZXJuYWwgd2luZG93IFtcImVlanNcIixcImNvbXBvbmVudHNcIl0iLCJ3ZWJwYWNrOi8vQGV2ZW50ZXNwcmVzc28vY29yZS9leHRlcm5hbCB3aW5kb3cgW1wiZWVqc1wiLFwiZWRpdG9ySG9jc1wiXSIsIndlYnBhY2s6Ly9AZXZlbnRlc3ByZXNzby9jb3JlL2V4dGVybmFsIHdpbmRvdyBbXCJlZWpzXCIsXCJpMThuXCJdIiwid2VicGFjazovL0BldmVudGVzcHJlc3NvL2NvcmUvZXh0ZXJuYWwgd2luZG93IFtcImVlanNcIixcIm1vZGVsXCJdIiwid2VicGFjazovL0BldmVudGVzcHJlc3NvL2NvcmUvZXh0ZXJuYWwgd2luZG93IFtcIndwXCIsXCJibG9ja0VkaXRvclwiXSIsIndlYnBhY2s6Ly9AZXZlbnRlc3ByZXNzby9jb3JlL2V4dGVybmFsIHdpbmRvdyBbXCJ3cFwiLFwiYmxvY2tzXCJdIiwid2VicGFjazovL0BldmVudGVzcHJlc3NvL2NvcmUvZXh0ZXJuYWwgd2luZG93IFtcIndwXCIsXCJjb21wb25lbnRzXCJdIiwid2VicGFjazovL0BldmVudGVzcHJlc3NvL2NvcmUvZXh0ZXJuYWwgd2luZG93IFtcIndwXCIsXCJkYXRhXCJdIiwid2VicGFjazovL0BldmVudGVzcHJlc3NvL2NvcmUvZXh0ZXJuYWwgd2luZG93IFtcIndwXCIsXCJlbGVtZW50XCJdIiwid2VicGFjazovL0BldmVudGVzcHJlc3NvL2NvcmUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vQGV2ZW50ZXNwcmVzc28vY29yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AZXZlbnRlc3ByZXNzby9jb3JlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0BldmVudGVzcHJlc3NvL2NvcmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0BldmVudGVzcHJlc3NvL2NvcmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZXZlbnRlc3ByZXNzby9jb3JlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGV2ZW50ZXNwcmVzc28vY29yZS8uL2Fzc2V0cy9zcmMvYmxvY2tzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBDU1NfQ0xBU1NfQ09SRV9CTE9DS1MgPSAnZWUtY29yZS1ibG9ja3MgZXZlbnQtZXNwcmVzc28tYmxvY2tzJztcbiIsIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IEluc3BlY3RvckNvbnRyb2xzIH0gZnJvbSAnQHdvcmRwcmVzcy9ibG9jay1lZGl0b3InO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQge1xuXHRQYW5lbEJvZHksXG5cdFBsYWNlaG9sZGVyLFxuXHRUb2dnbGVDb250cm9sLFxuXHRTcGlubmVyLFxuXHRSYW5nZUNvbnRyb2wsXG5cdFNlbGVjdENvbnRyb2wsXG59IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9uZW50cyc7XG5pbXBvcnQgeyB3aXRoU2VsZWN0IH0gZnJvbSAnQHdvcmRwcmVzcy9kYXRhJztcbmltcG9ydCB7IHNwcmludGYsIF9uLCBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuaW1wb3J0IHtcblx0RWRpdG9yRGF0ZXRpbWVTZWxlY3QsXG5cdEVkaXRvckV2ZW50U2VsZWN0LFxuXHRFZGl0b3JTdGF0dXNTZWxlY3QsXG5cdEVkaXRvclRpY2tldFNlbGVjdCxcblx0UXVlcnlMaW1pdCxcblx0RXZlbnRBdHRlbmRlZUxpc3QsXG59IGZyb20gJ0BldmVudGVzcHJlc3NvL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgTm90V2l0aFBvc3RUeXBlQ2hlY2sgfSBmcm9tICdAZXZlbnRlc3ByZXNzby9lZGl0b3ItaG9jcyc7XG5pbXBvcnQge1xuXHRzdGF0dXNNb2RlbCxcblx0YXR0ZW5kZWVNb2RlbCxcblx0UVVFUllfT1JERVJfQVNDLFxuXHRRVUVSWV9PUkRFUl9ERVNDLFxuXHRBTExPV0VEX09SREVSX1ZBTFVFUyxcbn0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vbW9kZWwnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBDU1NfQ0xBU1NfQ09SRV9CTE9DS1MgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5jb25zdCBkZWZhdWx0UXVlcnlEYXRhID0ge1xuXHRzaG93RXhwaXJlZDogdHJ1ZSxcblx0bGltaXQ6IDUwLFxufTtcblxuY29uc3QgaXNOZXdCbG9jayA9ICh7IGV2ZW50SWQsIGRhdGV0aW1lSWQsIHRpY2tldElkIH0pID0+XG5cdGV2ZW50SWQgPT09IDAgJiYgZGF0ZXRpbWVJZCA9PT0gMCAmJiB0aWNrZXRJZCA9PT0gMDtcblxuY29uc3QgREVGQVVMVF9BUlJBWSA9IFtdO1xuXG5sZXQgaGlnaGVzdFJlcXVlc3RlZExpbWl0ID0gMjAwO1xuXG4vKipcbiAqIEV2ZW50QXR0ZW5kZWVzRWRpdG9yIENvbXBvbmVudFxuICpcbiAqIFRoaXMgcmV0dXJucyB0aGUgY29tcG9uZW50IGZvciB0aGUgYGVkaXRgIGFyZ3VtZW50IG9uIHRoZSBgRXZlbnRBdHRlbmRlZXNgXG4gKiBCbG9jay5cbiAqL1xuZXhwb3J0IGNsYXNzIEV2ZW50QXR0ZW5kZWVzRWRpdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIHByb3BUeXBlcyA9IHtcblx0XHRhdHRlbmRlZXM6IFByb3BUeXBlcy5hcnJheSxcblx0XHRpc0xvYWRpbmc6IFByb3BUeXBlcy5ib29sLFxuXHRcdGF0dHJpYnV0ZXM6IFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHRldmVudElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0ZGF0ZXRpbWVJZDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdHRpY2tldElkOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0c3RhdHVzOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFx0c2hvd0dyYXZhdGFyOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRcdGRpc3BsYXlPbkFyY2hpdmVzOiBQcm9wVHlwZXMuYm9vbCxcblx0XHRcdGxpbWl0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0b3JkZXJCeTogUHJvcFR5cGVzLm9uZU9mKFtcblx0XHRcdFx0J2lkJyxcblx0XHRcdFx0J2xhc3ROYW1lT25seScsXG5cdFx0XHRcdCdmaXJzdE5hbWVPbmx5Jyxcblx0XHRcdFx0J2ZpcnN0VGhlbkxhc3ROYW1lJyxcblx0XHRcdFx0J2xhc3RUaGVuRmlyc3ROYW1lJyxcblx0XHRcdF0pLFxuXHRcdFx0b3JkZXI6IFByb3BUeXBlcy5vbmVPZihBTExPV0VEX09SREVSX1ZBTFVFUyksXG5cdFx0XHRhdmF0YXJTaXplOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0YXZhdGFyQ2xhc3M6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0fSksXG5cdH07XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcblx0XHRhdHRlbmRlZXM6IFtdLFxuXHRcdGlzTG9hZGluZzogdHJ1ZSxcblx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRldmVudElkOiAwLFxuXHRcdFx0ZGF0ZXRpbWVJZDogMCxcblx0XHRcdHRpY2tldElkOiAwLFxuXHRcdFx0c3RhdHVzOiBzdGF0dXNNb2RlbC5SRUdJU1RSQVRJT05fU1RBVFVTX0lELkFQUFJPVkVELFxuXHRcdFx0c2hvd0dyYXZhdGFyOiB0cnVlLFxuXHRcdFx0ZGlzcGxheU9uQXJjaGl2ZXM6IGZhbHNlLFxuXHRcdFx0bGltaXQ6IDEwMCxcblx0XHRcdG9yZGVyQnk6ICdsYXN0VGhlbkZpcnN0TmFtZScsXG5cdFx0XHRvcmRlcjogUVVFUllfT1JERVJfQVNDLFxuXHRcdFx0YXZhdGFyU2l6ZTogMjQsXG5cdFx0XHRhdmF0YXJDbGFzczogJ2NvbnRhY3QnLFxuXHRcdH0sXG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xuXHQgKi9cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0Y29uc3QgeyBldmVudElkLCBkYXRldGltZUlkIH0gPSB0aGlzLnByb3BzLmF0dHJpYnV0ZXM7XG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGV2ZW50UXVlcnlEYXRhOiB7XG5cdFx0XHRcdC4uLmRlZmF1bHRRdWVyeURhdGEsXG5cdFx0XHR9LFxuXHRcdFx0ZGF0ZXRpbWVRdWVyeURhdGE6IHtcblx0XHRcdFx0Li4uZGVmYXVsdFF1ZXJ5RGF0YSxcblx0XHRcdFx0Zm9yRXZlbnRJZDogZXZlbnRJZCxcblx0XHRcdH0sXG5cdFx0XHR0aWNrZXRRdWVyeURhdGE6IHtcblx0XHRcdFx0Li4uZGVmYXVsdFF1ZXJ5RGF0YSxcblx0XHRcdFx0Zm9yRGF0ZXRpbWVJZDogZGF0ZXRpbWVJZCxcblx0XHRcdH0sXG5cdFx0XHRzdGF0dXNRdWVyeURhdGE6IHtcblx0XHRcdFx0Li4uZGVmYXVsdFF1ZXJ5RGF0YSxcblx0XHRcdFx0c3RhdHVzVHlwZTogc3RhdHVzTW9kZWwuU1RBVFVTX1RZUEVfUkVHSVNUUkFUSU9OLFxuXHRcdFx0fSxcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBldmVudElkIG9uIGF0dHJpYnV0ZXNcblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IGV2ZW50SWRcblx0ICovXG5cdHNldEV2ZW50SWQgPSAoZXZlbnRJZCkgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID1cblx0XHRcdGV2ZW50SWQgIT09IG51bGwgJiYgZXZlbnRJZC52YWx1ZSA/IHBhcnNlSW50KGV2ZW50SWQudmFsdWUsIDEwKSA6IDA7XG5cdFx0dGhpcy5wcm9wcy5zZXRBdHRyaWJ1dGVzKHtcblx0XHRcdGV2ZW50SWQ6IHZhbHVlLFxuXHRcdFx0ZGF0ZXRpbWVJZDogMCxcblx0XHRcdHRpY2tldElkOiAwLFxuXHRcdH0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0ZGF0ZXRpbWVRdWVyeURhdGE6IHtcblx0XHRcdFx0Li4udGhpcy5zdGF0ZS5kYXRldGltZVF1ZXJ5RGF0YSxcblx0XHRcdFx0Zm9yRXZlbnRJZDogdmFsdWUsXG5cdFx0XHR9LFxuXHRcdH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTZXQgZGF0ZXRpbWVJZCBvbiBhdHRyaWJ1dGVzXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRldGltZUlkXG5cdCAqL1xuXHRzZXREYXRldGltZUlkID0gKGRhdGV0aW1lSWQpID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9XG5cdFx0XHRkYXRldGltZUlkICE9PSBudWxsICYmIGRhdGV0aW1lSWQudmFsdWVcblx0XHRcdFx0PyBwYXJzZUludChkYXRldGltZUlkLnZhbHVlLCAxMClcblx0XHRcdFx0OiAwO1xuXHRcdHRoaXMucHJvcHMuc2V0QXR0cmlidXRlcyh7XG5cdFx0XHRkYXRldGltZUlkOiB2YWx1ZSxcblx0XHRcdHRpY2tldElkOiAwLFxuXHRcdH0pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0dGlja2V0UXVlcnlEYXRhOiB7XG5cdFx0XHRcdC4uLnRoaXMuc3RhdGUudGlja2V0UXVlcnlEYXRhLFxuXHRcdFx0XHRmb3JEYXRldGltZUlkOiB2YWx1ZSxcblx0XHRcdH0sXG5cdFx0fSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNldCB0aWNrZXRJZCBvbiBhdHRyaWJ1dGVzXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB0aWNrZXRJZFxuXHQgKi9cblx0c2V0VGlja2V0SWQgPSAodGlja2V0SWQpID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9XG5cdFx0XHR0aWNrZXRJZCAhPT0gbnVsbCAmJiB0aWNrZXRJZC52YWx1ZVxuXHRcdFx0XHQ/IHBhcnNlSW50KHRpY2tldElkLnZhbHVlLCAxMClcblx0XHRcdFx0OiAwO1xuXHRcdHRoaXMucHJvcHMuc2V0QXR0cmlidXRlcyh7IHRpY2tldElkOiB2YWx1ZSB9KTtcblx0fTtcblxuXHQvKipcblx0ICogU2V0IHN0YXR1cyBvbiBhdHRyaWJ1dGVzXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0dXNcblx0ICovXG5cdHNldFN0YXR1cyA9IChzdGF0dXMpID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9XG5cdFx0XHRzdGF0dXMgIT09IG51bGwgJiYgc3RhdHVzLnZhbHVlXG5cdFx0XHRcdD8gc3RhdHVzLnZhbHVlXG5cdFx0XHRcdDogc3RhdHVzTW9kZWwuUkVHSVNUUkFUSU9OX1NUQVRVU19JRC5BUFBST1ZFRDtcblx0XHR0aGlzLnByb3BzLnNldEF0dHJpYnV0ZXMoeyBzdGF0dXM6IHZhbHVlIH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTZXQgbGltaXQgZm9yIGF0dGVuZGVlcyB0byBiZSBzaG93biBpbiBhdHRyaWJ1dGVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gbGltaXRcblx0ICovXG5cdHNldExpbWl0ID0gKGxpbWl0KSA9PiB7XG5cdFx0dGhpcy5wcm9wcy5zZXRBdHRyaWJ1dGVzKHtcblx0XHRcdGxpbWl0OiBwYXJzZUludChsaW1pdCwgMTApLFxuXHRcdH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIG9yZGVyQnkgYXR0cmlidXRlXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBvcmRlckJ5XG5cdCAqL1xuXHRzZXRPcmRlckJ5ID0gKG9yZGVyQnkpID0+IHtcblx0XHR0aGlzLnByb3BzLnNldEF0dHJpYnV0ZXMoeyBvcmRlckJ5IH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIG9yZGVyIGF0dHJpYnV0ZVxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gb3JkZXJcblx0ICovXG5cdHNldE9yZGVyID0gKG9yZGVyKSA9PiB7XG5cdFx0dGhpcy5wcm9wcy5zZXRBdHRyaWJ1dGVzKHsgb3JkZXIgfSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgc2l6ZSBmb3IgdGhlIGdyYXZhdGFyIGRpc3BsYXllZC5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IHNpemVcblx0ICovXG5cdHNldEF2YXRhclNpemUgPSAoc2l6ZSkgPT4ge1xuXHRcdHRoaXMucHJvcHMuc2V0QXR0cmlidXRlcyh7XG5cdFx0XHRhdmF0YXJTaXplOiBwYXJzZUludChzaXplLCAxMCksXG5cdFx0fSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNldHMgd2hldGhlciB0byBzaG93IGdyYXZhdGFyIGZvciBhdHRlbmRlZXMgaW4gYXR0cmlidXRlcy5cblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBzaG93R3JhdmF0YXJcblx0ICovXG5cdHRvZ2dsZVNob3dHcmF2YXRhciA9IChzaG93R3JhdmF0YXIpID0+IHtcblx0XHR0aGlzLnByb3BzLnNldEF0dHJpYnV0ZXMoeyBzaG93R3JhdmF0YXIgfSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNldHMgd2hldGhlciB0byBzaG93IGJsb2NrIG9uIGFyY2hpdmUgcGFnZXMgaW4gYXR0cmlidXRlcy5cblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBkaXNwbGF5T25BcmNoaXZlc1xuXHQgKi9cblx0dG9nZ2xlRGlzcGxheU9uQXJjaGl2ZXMgPSAoZGlzcGxheU9uQXJjaGl2ZXMpID0+IHtcblx0XHR0aGlzLnByb3BzLnNldEF0dHJpYnV0ZXMoeyBkaXNwbGF5T25BcmNoaXZlcyB9KTtcblx0fTtcblxuXHQvKipcblx0ICogUmV0cmlldmUgdGhlIEF0dGVuZGVlcyBMaXN0IGNvbXBvbmVudCBmb3IgdGhlIGdpdmVuIGF0dHJpYnV0ZXNcblx0ICpcblx0ICogQHJldHVybiB7Q29tcG9uZW50fSBXaGF0IHRvIGRpc3BsYXkgZm9yIHRoZSBhdHRlbmRlZSBkaXNwbGF5LlxuXHQgKi9cblx0Z2V0QXR0ZW5kZWVzRGlzcGxheSgpIHtcblx0XHRjb25zdCB7IGlzTG9hZGluZywgYXR0ZW5kZWVzIH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHsgc2hvd0dyYXZhdGFyLCBhdmF0YXJTaXplLCBhdmF0YXJDbGFzcyB9ID0gdGhpcy5wcm9wcy5hdHRyaWJ1dGVzO1xuXG5cdFx0Y29uc3QgYXZhdGFyT3B0aW9ucyA9IHtcblx0XHRcdGF2YXRhcldpZHRoOiBhdmF0YXJTaXplLFxuXHRcdFx0YXZhdGFySGVpZ2h0OiBhdmF0YXJTaXplLFxuXHRcdFx0YXZhdGFyQ2xhc3MsXG5cdFx0fTtcblxuXHRcdGlmIChpc0xvYWRpbmcpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxQbGFjZWhvbGRlcj5cblx0XHRcdFx0XHQ8U3Bpbm5lciAvPlxuXHRcdFx0XHQ8L1BsYWNlaG9sZGVyPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoaXNOZXdCbG9jayh0aGlzLnByb3BzLmF0dHJpYnV0ZXMpICYmIGF0dGVuZGVlcyA9PT0gREVGQVVMVF9BUlJBWSkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFBsYWNlaG9sZGVyPlxuXHRcdFx0XHRcdHtfXyhcblx0XHRcdFx0XHRcdCdUbyBnZXQgc3RhcnRlZCwgc2VsZWN0IHdoYXQgZXZlbnQgeW91IHdhbnQgdG8gc2hvdyBhdHRlbmRlZXMgZnJvbSBpbiB0aGUgYmxvY2sgc2V0dGluZ3MuJyxcblx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHQpfVxuXHRcdFx0XHQ8L1BsYWNlaG9sZGVyPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoIWlzTG9hZGluZyAmJiBpc0VtcHR5KGF0dGVuZGVlcykpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxQbGFjZWhvbGRlcj5cblx0XHRcdFx0XHR7X18oXG5cdFx0XHRcdFx0XHQnVGhlcmUgYXJlIG5vIGF0dGVuZGVlcyBmb3Igc2VsZWN0ZWQgb3B0aW9ucy4nLFxuXHRcdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHRcdCl9XG5cdFx0XHRcdDwvUGxhY2Vob2xkZXI+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PEV2ZW50QXR0ZW5kZWVMaXN0XG5cdFx0XHRcdGF0dGVuZGVlcz17dGhpcy5hcHBseUxpbWl0KGF0dGVuZGVlcyl9XG5cdFx0XHRcdHNob3dHcmF2YXRhcj17c2hvd0dyYXZhdGFyfVxuXHRcdFx0XHRhdmF0YXJPcHRpb25zPXthdmF0YXJPcHRpb25zfVxuXHRcdFx0XHRpc0xvYWRpbmc9e2lzTG9hZGluZ31cblx0XHRcdFx0Y29udGFpbmVyQ3NzQ2xhc3M9e0NTU19DTEFTU19DT1JFX0JMT0NLU31cblx0XHRcdFx0Y29udGFpbmVySWQ9eydlZS1ibG9jay1ldmVudC1hdHRlbmRlZXMnfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgcmVjZWl2ZXMgdGhlIGFycmF5IG9mIGF0dGVuZGVlcyBhbmQgYXBwbGllcyB0aGUgbGltaXQgdG8gaXQgc28gdGhhdFxuXHQgKiBvbmx5IHRoZSBzZXQgbGltaXQgb2YgYXR0ZW5kZWVzIGlzIHJldHVybmVkIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGVcblx0ICogYXJyYXkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGF0dGVuZGVlc1xuXHQgKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgYXJyYXkgb2YgYXR0ZW5kZWVzIHdpdGggdGhlIGFwcGxpZWQgbGltaXRcblx0ICovXG5cdGFwcGx5TGltaXQoYXR0ZW5kZWVzKSB7XG5cdFx0aWYgKGF0dGVuZGVlcy5sZW5ndGggPD0gdGhpcy5wcm9wcy5hdHRyaWJ1dGVzLmxpbWl0KSB7XG5cdFx0XHRyZXR1cm4gYXR0ZW5kZWVzO1xuXHRcdH1cblx0XHRyZXR1cm4gYXR0ZW5kZWVzLnNsaWNlKDAsIHRoaXMucHJvcHMuYXR0cmlidXRlcy5saW1pdCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBpbnNwZWN0b3IgY29udHJvbHMgZm9yIHRoZSBibG9jay5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZXNcblx0ICogQHJldHVybiB7Q29tcG9uZW50fSBUaGUgaW5zcGVjdG9yIGNvbnRyb2xzIGNvbXBvbmVudFxuXHQgKi9cblx0Z2V0SW5zcGVjdG9yQ29udHJvbHMoYXR0cmlidXRlcykge1xuXHRcdGNvbnN0IGNvdW50QXR0ZW5kZWVzID0gdGhpcy5wcm9wcy5hdHRlbmRlZXMubGVuZ3RoIHx8IDA7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxJbnNwZWN0b3JDb250cm9scz5cblx0XHRcdFx0PFBhbmVsQm9keSB0aXRsZT17X18oJ0ZpbHRlciBCeSBTZXR0aW5ncycsICdldmVudF9lc3ByZXNzbycpfT5cblx0XHRcdFx0XHQ8RWRpdG9yRXZlbnRTZWxlY3Rcblx0XHRcdFx0XHRcdGtleT1cImF0dGVuZGVlcy1ldmVudC1zZWxlY3RcIlxuXHRcdFx0XHRcdFx0c2VsZWN0ZWQ9e2F0dHJpYnV0ZXMuZXZlbnRJZH1cblx0XHRcdFx0XHRcdG9uU2VsZWN0PXt0aGlzLnNldEV2ZW50SWR9XG5cdFx0XHRcdFx0XHRxdWVyeURhdGE9e3RoaXMuc3RhdGUuZXZlbnRRdWVyeURhdGF9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHR7YXR0cmlidXRlcy5ldmVudElkICE9PSAwICYmIChcblx0XHRcdFx0XHRcdDxFZGl0b3JEYXRldGltZVNlbGVjdFxuXHRcdFx0XHRcdFx0XHRrZXk9XCJhdHRlbmRlZXMtZGF0ZXRpbWUtc2VsZWN0XCJcblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQ9e2F0dHJpYnV0ZXMuZGF0ZXRpbWVJZH1cblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q9e3RoaXMuc2V0RGF0ZXRpbWVJZH1cblx0XHRcdFx0XHRcdFx0cXVlcnlEYXRhPXt0aGlzLnN0YXRlLmRhdGV0aW1lUXVlcnlEYXRhfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQpfVxuXHRcdFx0XHRcdHthdHRyaWJ1dGVzLmRhdGV0aW1lSWQgIT09IDAgJiYgKFxuXHRcdFx0XHRcdFx0PEVkaXRvclRpY2tldFNlbGVjdFxuXHRcdFx0XHRcdFx0XHRrZXk9XCJhdHRlbmRlZXMtdGlja2V0LXNlbGVjdFwiXG5cdFx0XHRcdFx0XHRcdHNlbGVjdGVkPXthdHRyaWJ1dGVzLnRpY2tldElkfVxuXHRcdFx0XHRcdFx0XHRvblNlbGVjdD17dGhpcy5zZXRUaWNrZXRJZH1cblx0XHRcdFx0XHRcdFx0cXVlcnlEYXRhPXt0aGlzLnN0YXRlLnRpY2tldFF1ZXJ5RGF0YX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0KX1cblx0XHRcdFx0XHQ8RWRpdG9yU3RhdHVzU2VsZWN0XG5cdFx0XHRcdFx0XHRrZXk9XCJhdHRlbmRlZXMtc3RhdHVzLXNlbGVjdFwiXG5cdFx0XHRcdFx0XHRzZWxlY3RlZD17YXR0cmlidXRlcy5zdGF0dXN9XG5cdFx0XHRcdFx0XHRvblNlbGVjdD17dGhpcy5zZXRTdGF0dXN9XG5cdFx0XHRcdFx0XHRxdWVyeURhdGE9e3RoaXMuc3RhdGUuc3RhdHVzUXVlcnlEYXRhfVxuXHRcdFx0XHRcdFx0bGFiZWw9e19fKFxuXHRcdFx0XHRcdFx0XHQnU2VsZWN0IFJlZ2lzdHJhdGlvbiBTdGF0dXMnLFxuXHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHQpfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PFF1ZXJ5TGltaXRcblx0XHRcdFx0XHRcdGxhYmVsPXtfXyhcblx0XHRcdFx0XHRcdFx0J051bWJlciBvZiBBdHRlbmRlZXMgdG8gRGlzcGxheTonLFxuXHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHQpfVxuXHRcdFx0XHRcdFx0bGltaXQ9e2F0dHJpYnV0ZXMubGltaXR9XG5cdFx0XHRcdFx0XHRvbkxpbWl0Q2hhbmdlPXt0aGlzLnNldExpbWl0fVxuXHRcdFx0XHRcdFx0bWluPXsxfVxuXHRcdFx0XHRcdFx0d2l0aFNsaWRlcj17ZmFsc2V9XG5cdFx0XHRcdFx0XHRoZWxwPXtzcHJpbnRmKFxuXHRcdFx0XHRcdFx0XHRfbihcblx0XHRcdFx0XHRcdFx0XHQnVXNlZCB0byBhZGp1c3QgdGhlIG51bWJlciBvZiBhdHRlbmRlZXMgZGlzcGxheWVkIChUaGVyZSBpcyAlZCB0b3RhbCBhdHRlbmRlZSBmb3IgdGhlIGN1cnJlbnQgZmlsdGVyIHNldHRpbmdzKS4nLFxuXHRcdFx0XHRcdFx0XHRcdCdVc2VkIHRvIGFkanVzdCB0aGUgbnVtYmVyIG9mIGF0dGVuZGVlcyBkaXNwbGF5ZWQgKFRoZXJlIGFyZSAlZCB0b3RhbCBhdHRlbmRlZXMgZm9yIHRoZSBjdXJyZW50IGZpbHRlciBzZXR0aW5ncykuJyxcblx0XHRcdFx0XHRcdFx0XHRjb3VudEF0dGVuZGVlcyxcblx0XHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRcdGNvdW50QXR0ZW5kZWVzXG5cdFx0XHRcdFx0XHQpfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdGxhYmVsPXtfXygnT3JkZXIgQXR0ZW5kZWVzIGJ5OicsICdldmVudF9lc3ByZXNzbycpfVxuXHRcdFx0XHRcdFx0dmFsdWU9e2F0dHJpYnV0ZXMub3JkZXJCeX1cblx0XHRcdFx0XHRcdG9wdGlvbnM9e1tcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBfXygnQXR0ZW5kZWUgaWQnLCAnZXZlbnRfZXNwcmVzc28nKSxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogJ2lkJyxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBfXygnTGFzdCBuYW1lIG9ubHknLCAnZXZlbnRfZXNwcmVzc28nKSxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogJ2xhc3ROYW1lT25seScsXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogX18oJ0ZpcnN0IG5hbWUgb25seScsICdldmVudF9lc3ByZXNzbycpLFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiAnZmlyc3ROYW1lT25seScsXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogX18oXG5cdFx0XHRcdFx0XHRcdFx0XHQnRmlyc3QsIHRoZW4gTGFzdCBuYW1lJyxcblx0XHRcdFx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiAnZmlyc3RUaGVuTGFzdE5hbWUnLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IF9fKFxuXHRcdFx0XHRcdFx0XHRcdFx0J0xhc3QsIHRoZW4gRmlyc3QgbmFtZScsXG5cdFx0XHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogJ2xhc3RUaGVuRmlyc3ROYW1lJyxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdF19XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZXRPcmRlckJ5fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdFx0XHRcdGxhYmVsPXtfXygnU29ydCBvcmRlcjonLCAnZXZlbnRfZXNwcmVzc28nKX1cblx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLm9yZGVyfVxuXHRcdFx0XHRcdFx0b3B0aW9ucz17W1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IF9fKCdBc2NlbmRpbmcnLCAnZXZlbnRfZXNwcmVzc28nKSxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogUVVFUllfT1JERVJfQVNDLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IF9fKCdEZXNjZW5kaW5nJywgJ2V2ZW50X2VzcHJlc3NvJyksXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFFVRVJZX09SREVSX0RFU0MsXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRdfVxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMuc2V0T3JkZXJ9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PC9QYW5lbEJvZHk+XG5cdFx0XHRcdDxQYW5lbEJvZHkgdGl0bGU9e19fKCdHcmF2YXRhciBTZXR0dGluZ3MnLCAnZXZlbnRfZXNwcmVzc28nKX0+XG5cdFx0XHRcdFx0PFRvZ2dsZUNvbnRyb2xcblx0XHRcdFx0XHRcdGxhYmVsPXtfXygnRGlzcGxheSBHcmF2YXRhcicsICdldmVudF9lc3ByZXNzbycpfVxuXHRcdFx0XHRcdFx0Y2hlY2tlZD17YXR0cmlidXRlcy5zaG93R3JhdmF0YXJ9XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy50b2dnbGVTaG93R3JhdmF0YXJ9XG5cdFx0XHRcdFx0XHRoZWxwPXtcblx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcy5zaG93R3JhdmF0YXJcblx0XHRcdFx0XHRcdFx0XHQ/IF9fKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQnR3JhdmF0YXIgaW1hZ2VzIGFyZSBzaG93biBmb3IgZWFjaCBhdHRlbmRlZS4nLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHRcdFx0ICApXG5cdFx0XHRcdFx0XHRcdFx0OiBfXyhcblx0XHRcdFx0XHRcdFx0XHRcdFx0J05vIGdyYXZhdGFyIGltYWdlcyBhcmUgc2hvd24gZm9yIGVhY2ggYXR0ZW5kZWUuJyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHRcdFx0XHRcdCAgKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0e2F0dHJpYnV0ZXMuc2hvd0dyYXZhdGFyICYmIChcblx0XHRcdFx0XHRcdDxSYW5nZUNvbnRyb2xcblx0XHRcdFx0XHRcdFx0bGFiZWw9e19fKCdTaXplIG9mIEdyYXZhdGFyJywgJ2V2ZW50X2VzcHJlc3NvJyl9XG5cdFx0XHRcdFx0XHRcdHZhbHVlPXthdHRyaWJ1dGVzLmF2YXRhclNpemV9XG5cdFx0XHRcdFx0XHRcdG1pbj17MTB9XG5cdFx0XHRcdFx0XHRcdG1heD17MTI4fVxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZXRBdmF0YXJTaXplfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQpfVxuXHRcdFx0XHQ8L1BhbmVsQm9keT5cblx0XHRcdFx0PE5vdFdpdGhQb3N0VHlwZUNoZWNrIGV4Y2x1ZGVkUG9zdFR5cGVTbHVncz17J3BhZ2UnfT5cblx0XHRcdFx0XHQ8UGFuZWxCb2R5IHRpdGxlPXtfXygnQXJjaGl2ZSBTZXR0aW5ncycsICdldmVudF9lc3ByZXNzbycpfT5cblx0XHRcdFx0XHRcdDxUb2dnbGVDb250cm9sXG5cdFx0XHRcdFx0XHRcdGxhYmVsPXtfXygnRGlzcGxheSBvbiBBcmNoaXZlcycsICdldmVudF9lc3ByZXNzbycpfVxuXHRcdFx0XHRcdFx0XHRjaGVja2VkPXthdHRyaWJ1dGVzLmRpc3BsYXlPbkFyY2hpdmVzfVxuXHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy50b2dnbGVEaXNwbGF5T25BcmNoaXZlc31cblx0XHRcdFx0XHRcdFx0aGVscD17XG5cdFx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcy5kaXNwbGF5T25BcmNoaXZlc1xuXHRcdFx0XHRcdFx0XHRcdFx0PyBfXyhcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnQXR0ZW5kZWVzIGFyZSBzaG93biB3aGVuZXZlciB0aGlzIHBvc3QgaXMgbGlzdGVkIGluIGFuIGFyY2hpdmUgdmlldy4nLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHRcdFx0XHRcdCAgKVxuXHRcdFx0XHRcdFx0XHRcdFx0OiBfXyhcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnQXR0ZW5kZWVzIGFyZSBoaWRkZW4gd2hlbmV2ZXIgdGhpcyBwb3N0IGlzIGxpc3RlZCBpbiBhbiBhcmNoaXZlIHZpZXcuJyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnZXZlbnRfZXNwcmVzc28nXG5cdFx0XHRcdFx0XHRcdFx0XHQgIClcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L1BhbmVsQm9keT5cblx0XHRcdFx0PC9Ob3RXaXRoUG9zdFR5cGVDaGVjaz5cblx0XHRcdDwvSW5zcGVjdG9yQ29udHJvbHM+XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEZyYWdtZW50PlxuXHRcdFx0XHR7dGhpcy5nZXRBdHRlbmRlZXNEaXNwbGF5KCl9XG5cdFx0XHRcdHt0aGlzLmdldEluc3BlY3RvckNvbnRyb2xzKHRoaXMucHJvcHMuYXR0cmlidXRlcyl9XG5cdFx0XHQ8L0ZyYWdtZW50PlxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFNlbGVjdCgoc2VsZWN0LCBvd25Qcm9wcykgPT4ge1xuXHRjb25zdCBkZWZhdWx0UHJvcHMgPSB7IC4uLkV2ZW50QXR0ZW5kZWVzRWRpdG9yLmRlZmF1bHRQcm9wcy5hdHRyaWJ1dGVzIH07XG5cdGNvbnN0IHtcblx0XHRldmVudElkID0gZGVmYXVsdFByb3BzLmV2ZW50SWQsXG5cdFx0ZGF0ZXRpbWVJZCA9IGRlZmF1bHRQcm9wcy5kYXRldGltZUlkLFxuXHRcdHRpY2tldElkID0gZGVmYXVsdFByb3BzLnRpY2tldElkLFxuXHRcdHN0YXR1cyA9IGRlZmF1bHRQcm9wcy5zdGF0dXMsXG5cdFx0b3JkZXJCeSA9IGRlZmF1bHRQcm9wcy5vcmRlckJ5LFxuXHRcdG9yZGVyID0gZGVmYXVsdFByb3BzLm9yZGVyLFxuXHRcdGxpbWl0ID0gZGVmYXVsdFByb3BzLmxpbWl0LFxuXHR9ID0gb3duUHJvcHMuYXR0cmlidXRlcztcblxuXHQvLyBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBkb24ndCBxdWVyeSB1bm5lY2Vzc2FyaWx5IHNpbmNlIGlmIHRoZSBsaW1pdCBpc1xuXHQvLyBsb3dlciB0aGFuIGEgcXVlcnkgd2UndmUgYWxyZWFkeSBkb25lLCB0aGVuIHdlIGFscmVhZHkgaGF2ZSBjYWNoZWQgZGF0YVxuXHQvLyBmb3IgdGhpcyBsaW1pdCAoYW5kIGNhY2hlIGlzIHN0aWxsIGJ1c3RlZCBieSBhbnkgb3RoZXIgcXVlcnkgY2hhbmdlcylcblx0aGlnaGVzdFJlcXVlc3RlZExpbWl0ID1cblx0XHQhbGltaXQgfHwgaXNOYU4obGltaXQpIHx8IGxpbWl0IDw9IGhpZ2hlc3RSZXF1ZXN0ZWRMaW1pdFxuXHRcdFx0PyBoaWdoZXN0UmVxdWVzdGVkTGltaXRcblx0XHRcdDogbGltaXQ7XG5cblx0Y29uc3QgcXVlcnlEYXRhID0ge1xuXHRcdGZvckV2ZW50SWQ6IGV2ZW50SWQsXG5cdFx0Zm9yRGF0ZXRpbWVJZDogZGF0ZXRpbWVJZCxcblx0XHRmb3JUaWNrZXRJZDogdGlja2V0SWQsXG5cdFx0Zm9yU3RhdHVzSWQ6IHN0YXR1cyxcblx0XHRzaG93R3JhdmF0YXI6IHRydWUsXG5cdFx0ZGVmYXVsdFdoZXJlQ29uZGl0aW9uczogJ2Z1bGxfdGhpc19taW5pbXVtX290aGVycycsXG5cdFx0b3JkZXIsXG5cdFx0b3JkZXJCeSxcblx0XHRsaW1pdDogaGlnaGVzdFJlcXVlc3RlZExpbWl0LFxuXHR9O1xuXG5cdGNvbnN0IHF1ZXJ5U3RyaW5nID0gYXR0ZW5kZWVNb2RlbC5nZXRRdWVyeVN0cmluZyhxdWVyeURhdGEpO1xuXHRjb25zdCB7IGdldEF0dGVuZGVlcywgaXNSZXF1ZXN0aW5nQXR0ZW5kZWVzIH0gPSBzZWxlY3QoXG5cdFx0J2V2ZW50ZXNwcmVzc28vbGlzdHMnXG5cdCk7XG5cdHJldHVybiB7XG5cdFx0Li4uRXZlbnRBdHRlbmRlZXNFZGl0b3IuZGVmYXVsdFByb3BzLFxuXHRcdC4uLm93blByb3BzLFxuXHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdC4uLkV2ZW50QXR0ZW5kZWVzRWRpdG9yLmRlZmF1bHRQcm9wcy5hdHRyaWJ1dGVzLFxuXHRcdFx0Li4ub3duUHJvcHMuYXR0cmlidXRlcyxcblx0XHR9LFxuXHRcdGF0dGVuZGVlczogaXNOZXdCbG9jayh7IGV2ZW50SWQsIGRhdGV0aW1lSWQsIHRpY2tldElkIH0pXG5cdFx0XHQ/IERFRkFVTFRfQVJSQVlcblx0XHRcdDogZ2V0QXR0ZW5kZWVzKHF1ZXJ5U3RyaW5nKSxcblx0XHRpc0xvYWRpbmc6IGlzUmVxdWVzdGluZ0F0dGVuZGVlcyhxdWVyeVN0cmluZyksXG5cdH07XG59KShFdmVudEF0dGVuZGVlc0VkaXRvcik7XG4iLCIvKipcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSBmcm9tICdAd29yZHByZXNzL2Jsb2Nrcyc7XG5cbi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IF9fIH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vaTE4bic7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBFdmVudEF0dGVuZGVlc0VkaXRvciBmcm9tICcuL2VkaXQnO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5cbmV4cG9ydCBjb25zdCBuYW1lID0gJ2V2ZW50ZXNwcmVzc28vZXZlbnQtYXR0ZW5kZWVzJztcblxuZXhwb3J0IGNvbnN0IHNldHRpbmdzID0ge1xuXHR0aXRsZTogX18oJ0V2ZW50IEF0dGVuZGVlcycsICdldmVudF9lc3ByZXNzbycpLFxuXG5cdGRlc2NyaXB0aW9uOiBfXyhcblx0XHQnRGlzcGxheXMgYSBsaXN0IG9mIHBlb3BsZSB0aGF0IGhhdmUgcmVnaXN0ZXJlZCBmb3IgdGhlIHNwZWNpZmllZCBldmVudCcsXG5cdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHQpLFxuXG5cdGljb246ICdncm91cHMnLFxuXG5cdGNhdGVnb3J5OiAnZXZlbnQtZXNwcmVzc28nLFxuXG5cdGtleXdvcmRzOiBbXG5cdFx0X18oJ2V2ZW50JywgJ2V2ZW50X2VzcHJlc3NvJyksXG5cdFx0X18oJ2F0dGVuZGVlcycsICdldmVudF9lc3ByZXNzbycpLFxuXHRcdF9fKCdsaXN0JywgJ2V2ZW50X2VzcHJlc3NvJyksXG5cdF0sXG5cblx0YXR0cmlidXRlczoge1xuXHRcdGV2ZW50SWQ6IHtcblx0XHRcdHR5cGU6ICdudW1iZXInLFxuXHRcdFx0ZGVmYXVsdDogMCxcblx0XHR9LFxuXHRcdGRhdGV0aW1lSWQ6IHtcblx0XHRcdHR5cGU6ICdudW1iZXInLFxuXHRcdFx0ZGVmYXVsdDogMCxcblx0XHR9LFxuXHRcdHRpY2tldElkOiB7XG5cdFx0XHR0eXBlOiAnbnVtYmVyJyxcblx0XHRcdGRlZmF1bHQ6IDAsXG5cdFx0fSxcblx0XHRzdGF0dXM6IHtcblx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0ZGVmYXVsdDogJ1JBUCcsXG5cdFx0fSxcblx0XHRsaW1pdDoge1xuXHRcdFx0dHlwZTogJ251bWJlcicsXG5cdFx0XHRkZWZhdWx0OiAxMDAsXG5cdFx0fSxcblx0XHRvcmRlcjoge1xuXHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRkZWZhdWx0OiAnQVNDJyxcblx0XHR9LFxuXHRcdG9yZGVyQnk6IHtcblx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0ZGVmYXVsdDogJ2xhc3RUaGVuRmlyc3ROYW1lJyxcblx0XHR9LFxuXHRcdHNob3dHcmF2YXRhcjoge1xuXHRcdFx0dHlwZTogJ2Jvb2xlYW4nLFxuXHRcdFx0ZGVmYXVsdDogZmFsc2UsXG5cdFx0fSxcblx0XHRhdmF0YXJDbGFzczoge1xuXHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRkZWZhdWx0OiAnY29udGFjdCcsXG5cdFx0fSxcblx0XHRhdmF0YXJTaXplOiB7XG5cdFx0XHR0eXBlOiAnbnVtYmVyJyxcblx0XHRcdGRlZmF1bHQ6IDI0LFxuXHRcdH0sXG5cdFx0ZGlzcGxheU9uQXJjaGl2ZXM6IHtcblx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdGRlZmF1bHQ6IGZhbHNlLFxuXHRcdH0sXG5cdH0sXG5cblx0ZWRpdDogRXZlbnRBdHRlbmRlZXNFZGl0b3IsXG5cblx0c2F2ZSgpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcbn07XG5cbnJlZ2lzdGVyQmxvY2tUeXBlKG5hbWUsIHNldHRpbmdzKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IGRlZmF1bHQge307IiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB2YXIgaGFzID0gcmVxdWlyZSgnLi9saWIvaGFzJyk7XG5cbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHsgLyoqLyB9XG4gIH07XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKGhhcyh0eXBlU3BlY3MsIHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIGVyciA9IEVycm9yKFxuICAgICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6ICcgKyBsb2NhdGlvbiArICcgdHlwZSBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7ICcgK1xuICAgICAgICAgICAgICAnaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCcgKyB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gKyAnYC4nICtcbiAgICAgICAgICAgICAgJ1RoaXMgb2Z0ZW4gaGFwcGVucyBiZWNhdXNlIG9mIHR5cG9zIHN1Y2ggYXMgYFByb3BUeXBlcy5mdW5jdGlvbmAgaW5zdGVhZCBvZiBgUHJvcFR5cGVzLmZ1bmNgLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciAmJiAhKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJyArXG4gICAgICAgICAgICBsb2NhdGlvbiArICcgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICcgKyB0eXBlb2YgZXJyb3IgKyAnLiAnICtcbiAgICAgICAgICAgICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgK1xuICAgICAgICAgICAgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ZhaWxlZCAnICsgbG9jYXRpb24gKyAnIHR5cGU6ICcgKyBlcnJvci5tZXNzYWdlICsgKHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXNldHMgd2FybmluZyBjYWNoZSB3aGVuIHRlc3RpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2hlY2tQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9saWIvaGFzJyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuZnVuY3Rpb24gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBiaWdpbnQ6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdiaWdpbnQnKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBlbGVtZW50VHlwZTogY3JlYXRlRWxlbWVudFR5cGVUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSwgZGF0YSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5kYXRhID0gZGF0YSAmJiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgPyBkYXRhOiB7fTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gT2xkIGJlaGF2aW9yIGZvciBwZW9wbGUgdXNpbmcgUmVhY3QuUHJvcFR5cGVzXG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gJiZcbiAgICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPCAzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBwcm9wIG9uIGAnICsgY29tcG9uZW50TmFtZSArICdgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSxcbiAgICAgICAgICB7ZXhwZWN0ZWRUeXBlOiBleHBlY3RlZFR5cGV9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZVR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghUmVhY3RJcy5pc1ZhbGlkRWxlbWVudFR5cGUocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQgdHlwZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50cyBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gYXJyYXksIGdvdCAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgYXJndW1lbnRzLiAnICtcbiAgICAgICAgICAgICdBIGNvbW1vbiBtaXN0YWtlIGlzIHRvIHdyaXRlIG9uZU9mKHgsIHksIHopIGluc3RlYWQgb2Ygb25lT2YoW3gsIHksIHpdKS4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGFycmF5LicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcywgZnVuY3Rpb24gcmVwbGFjZXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgU3RyaW5nKHByb3BWYWx1ZSkgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKGhhcyhwcm9wVmFsdWUsIGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZS4gRXhwZWN0ZWQgYW4gYXJyYXkgb2YgY2hlY2sgZnVuY3Rpb25zLCBidXQgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkICcgKyBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcoY2hlY2tlcikgKyAnIGF0IGluZGV4ICcgKyBpICsgJy4nXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIGV4cGVjdGVkVHlwZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIHZhciBjaGVja2VyUmVzdWx0ID0gY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGNoZWNrZXJSZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGVja2VyUmVzdWx0LmRhdGEgJiYgaGFzKGNoZWNrZXJSZXN1bHQuZGF0YSwgJ2V4cGVjdGVkVHlwZScpKSB7XG4gICAgICAgICAgZXhwZWN0ZWRUeXBlcy5wdXNoKGNoZWNrZXJSZXN1bHQuZGF0YS5leHBlY3RlZFR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgZXhwZWN0ZWRUeXBlc01lc3NhZ2UgPSAoZXhwZWN0ZWRUeXBlcy5sZW5ndGggPiAwKSA/ICcsIGV4cGVjdGVkIG9uZSBvZiB0eXBlIFsnICsgZXhwZWN0ZWRUeXBlcy5qb2luKCcsICcpICsgJ10nOiAnJztcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AnICsgZXhwZWN0ZWRUeXBlc01lc3NhZ2UgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGludmFsaWRWYWxpZGF0b3JFcnJvcihjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBrZXksIHR5cGUpIHtcbiAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6ICcgKyBsb2NhdGlvbiArICcgdHlwZSBgJyArIHByb3BGdWxsTmFtZSArICcuJyArIGtleSArICdgIGlzIGludmFsaWQ7ICcgK1xuICAgICAgJ2l0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAnICsgdHlwZSArICdgLidcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkVmFsaWRhdG9yRXJyb3IoY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwga2V5LCBnZXRQcmVjaXNlVHlwZShjaGVja2VyKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb20gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoaGFzKHNoYXBlVHlwZXMsIGtleSkgJiYgdHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZFZhbGlkYXRvckVycm9yKGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIGtleSwgZ2V0UHJlY2lzZVR5cGUoY2hlY2tlcikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgICAgICAgICdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBrZXkgYCcgKyBrZXkgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nICtcbiAgICAgICAgICAgICdcXG5CYWQgb2JqZWN0OiAnICsgSlNPTi5zdHJpbmdpZnkocHJvcHNbcHJvcE5hbWVdLCBudWxsLCAnICAnKSArXG4gICAgICAgICAgICAnXFxuVmFsaWQga2V5czogJyArIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGZhbHN5IHZhbHVlIGNhbid0IGJlIGEgU3ltYm9sXG4gICAgaWYgKCFwcm9wVmFsdWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICAgIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbiAgZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gICAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbiAgLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG4gIGZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBwcm9wVmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJyArIHByb3BWYWx1ZTtcbiAgICB9XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgaXMgcG9zdGZpeGVkIHRvIGEgd2FybmluZyBhYm91dCBhbiBpbnZhbGlkIHR5cGUuXG4gIC8vIEZvciBleGFtcGxlLCBcInVuZGVmaW5lZFwiIG9yIFwib2YgdHlwZSBhcnJheVwiXG4gIGZ1bmN0aW9uIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuICdhbiAnICsgdHlwZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdyZWdleHAnOlxuICAgICAgICByZXR1cm4gJ2EgJyArIHR5cGU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuICBmdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gICAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICByZXR1cm4gQU5PTllNT1VTO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGNoZWNrUHJvcFR5cGVzO1xuICBSZWFjdFByb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGNoZWNrUHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG5cbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgZGV2ZWxvcG1lbnQgYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgdmFyIHRocm93T25EaXJlY3RBY2Nlc3MgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKShSZWFjdElzLmlzRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59IGVsc2Uge1xuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBwcm9kdWN0aW9uIGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMnKSgpO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbiIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuMTMuMVxuICogcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cblxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIChmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50LWxpa2UgdHlwZXMuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cbnZhciBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3I7XG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIDogMHhlYWM3O1xudmFyIFJFQUNUX1BPUlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucG9ydGFsJykgOiAweGVhY2E7XG52YXIgUkVBQ1RfRlJBR01FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZyYWdtZW50JykgOiAweGVhY2I7XG52YXIgUkVBQ1RfU1RSSUNUX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN0cmljdF9tb2RlJykgOiAweGVhY2M7XG52YXIgUkVBQ1RfUFJPRklMRVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb2ZpbGVyJykgOiAweGVhZDI7XG52YXIgUkVBQ1RfUFJPVklERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb3ZpZGVyJykgOiAweGVhY2Q7XG52YXIgUkVBQ1RfQ09OVEVYVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29udGV4dCcpIDogMHhlYWNlOyAvLyBUT0RPOiBXZSBkb24ndCB1c2UgQXN5bmNNb2RlIG9yIENvbmN1cnJlbnRNb2RlIGFueW1vcmUuIFRoZXkgd2VyZSB0ZW1wb3Jhcnlcbi8vICh1bnN0YWJsZSkgQVBJcyB0aGF0IGhhdmUgYmVlbiByZW1vdmVkLiBDYW4gd2UgcmVtb3ZlIHRoZSBzeW1ib2xzP1xuXG52YXIgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuYXN5bmNfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29uY3VycmVudF9tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJykgOiAweGVhZDA7XG52YXIgUkVBQ1RfU1VTUEVOU0VfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlJykgOiAweGVhZDE7XG52YXIgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2VfbGlzdCcpIDogMHhlYWQ4O1xudmFyIFJFQUNUX01FTU9fVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0Lm1lbW8nKSA6IDB4ZWFkMztcbnZhciBSRUFDVF9MQVpZX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5sYXp5JykgOiAweGVhZDQ7XG52YXIgUkVBQ1RfQkxPQ0tfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmJsb2NrJykgOiAweGVhZDk7XG52YXIgUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZ1bmRhbWVudGFsJykgOiAweGVhZDU7XG52YXIgUkVBQ1RfUkVTUE9OREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5yZXNwb25kZXInKSA6IDB4ZWFkNjtcbnZhciBSRUFDVF9TQ09QRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc2NvcGUnKSA6IDB4ZWFkNztcblxuZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCAvLyBOb3RlOiBpdHMgdHlwZW9mIG1pZ2h0IGJlIG90aGVyIHRoYW4gJ3N5bWJvbCcgb3IgJ251bWJlcicgaWYgaXQncyBhIHBvbHlmaWxsLlxuICB0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSB8fCB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCAmJiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTEFaWV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9QUk9WSURFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0NPTlRFWFRfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZVTkRBTUVOVEFMX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUkVTUE9OREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfU0NPUEVfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9CTE9DS19UWVBFKTtcbn1cblxuZnVuY3Rpb24gdHlwZU9mKG9iamVjdCkge1xuICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsKSB7XG4gICAgdmFyICQkdHlwZW9mID0gb2JqZWN0LiQkdHlwZW9mO1xuXG4gICAgc3dpdGNoICgkJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9FTEVNRU5UX1RZUEU6XG4gICAgICAgIHZhciB0eXBlID0gb2JqZWN0LnR5cGU7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgY2FzZSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0ZSQUdNRU5UX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1RSSUNUX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICAgICAgICByZXR1cm4gdHlwZTtcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgJCR0eXBlb2ZUeXBlID0gdHlwZSAmJiB0eXBlLiQkdHlwZW9mO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKCQkdHlwZW9mVHlwZSkge1xuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2ZUeXBlO1xuXG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgICAgcmV0dXJuICQkdHlwZW9mO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59IC8vIEFzeW5jTW9kZSBpcyBkZXByZWNhdGVkIGFsb25nIHdpdGggaXNBc3luY01vZGVcblxudmFyIEFzeW5jTW9kZSA9IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbnZhciBDb25jdXJyZW50TW9kZSA9IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFO1xudmFyIENvbnRleHRDb25zdW1lciA9IFJFQUNUX0NPTlRFWFRfVFlQRTtcbnZhciBDb250ZXh0UHJvdmlkZXIgPSBSRUFDVF9QUk9WSURFUl9UWVBFO1xudmFyIEVsZW1lbnQgPSBSRUFDVF9FTEVNRU5UX1RZUEU7XG52YXIgRm9yd2FyZFJlZiA9IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG52YXIgRnJhZ21lbnQgPSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xudmFyIExhenkgPSBSRUFDVF9MQVpZX1RZUEU7XG52YXIgTWVtbyA9IFJFQUNUX01FTU9fVFlQRTtcbnZhciBQb3J0YWwgPSBSRUFDVF9QT1JUQUxfVFlQRTtcbnZhciBQcm9maWxlciA9IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG52YXIgU3RyaWN0TW9kZSA9IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG52YXIgU3VzcGVuc2UgPSBSRUFDVF9TVVNQRU5TRV9UWVBFO1xudmFyIGhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlID0gZmFsc2U7IC8vIEFzeW5jTW9kZSBzaG91bGQgYmUgZGVwcmVjYXRlZFxuXG5mdW5jdGlvbiBpc0FzeW5jTW9kZShvYmplY3QpIHtcbiAge1xuICAgIGlmICghaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUpIHtcbiAgICAgIGhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlID0gdHJ1ZTsgLy8gVXNpbmcgY29uc29sZVsnd2FybiddIHRvIGV2YWRlIEJhYmVsIGFuZCBFU0xpbnRcblxuICAgICAgY29uc29sZVsnd2FybiddKCdUaGUgUmVhY3RJcy5pc0FzeW5jTW9kZSgpIGFsaWFzIGhhcyBiZWVuIGRlcHJlY2F0ZWQsICcgKyAnYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBSZWFjdCAxNysuIFVwZGF0ZSB5b3VyIGNvZGUgdG8gdXNlICcgKyAnUmVhY3RJcy5pc0NvbmN1cnJlbnRNb2RlKCkgaW5zdGVhZC4gSXQgaGFzIHRoZSBleGFjdCBzYW1lIEFQSS4nKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHx8IHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb250ZXh0Q29uc3VtZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb250ZXh0UHJvdmlkZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRWxlbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRm9yd2FyZFJlZihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xufVxuZnVuY3Rpb24gaXNGcmFnbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNMYXp5KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0xBWllfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTWVtbyhvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9NRU1PX1RZUEU7XG59XG5mdW5jdGlvbiBpc1BvcnRhbChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QT1JUQUxfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUHJvZmlsZXIob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3RyaWN0TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdXNwZW5zZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9TVVNQRU5TRV9UWVBFO1xufVxuXG5leHBvcnRzLkFzeW5jTW9kZSA9IEFzeW5jTW9kZTtcbmV4cG9ydHMuQ29uY3VycmVudE1vZGUgPSBDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuQ29udGV4dENvbnN1bWVyID0gQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5Db250ZXh0UHJvdmlkZXIgPSBDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLkVsZW1lbnQgPSBFbGVtZW50O1xuZXhwb3J0cy5Gb3J3YXJkUmVmID0gRm9yd2FyZFJlZjtcbmV4cG9ydHMuRnJhZ21lbnQgPSBGcmFnbWVudDtcbmV4cG9ydHMuTGF6eSA9IExhenk7XG5leHBvcnRzLk1lbW8gPSBNZW1vO1xuZXhwb3J0cy5Qb3J0YWwgPSBQb3J0YWw7XG5leHBvcnRzLlByb2ZpbGVyID0gUHJvZmlsZXI7XG5leHBvcnRzLlN0cmljdE1vZGUgPSBTdHJpY3RNb2RlO1xuZXhwb3J0cy5TdXNwZW5zZSA9IFN1c3BlbnNlO1xuZXhwb3J0cy5pc0FzeW5jTW9kZSA9IGlzQXN5bmNNb2RlO1xuZXhwb3J0cy5pc0NvbmN1cnJlbnRNb2RlID0gaXNDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuaXNDb250ZXh0Q29uc3VtZXIgPSBpc0NvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuaXNDb250ZXh0UHJvdmlkZXIgPSBpc0NvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuaXNFbGVtZW50ID0gaXNFbGVtZW50O1xuZXhwb3J0cy5pc0ZvcndhcmRSZWYgPSBpc0ZvcndhcmRSZWY7XG5leHBvcnRzLmlzRnJhZ21lbnQgPSBpc0ZyYWdtZW50O1xuZXhwb3J0cy5pc0xhenkgPSBpc0xhenk7XG5leHBvcnRzLmlzTWVtbyA9IGlzTWVtbztcbmV4cG9ydHMuaXNQb3J0YWwgPSBpc1BvcnRhbDtcbmV4cG9ydHMuaXNQcm9maWxlciA9IGlzUHJvZmlsZXI7XG5leHBvcnRzLmlzU3RyaWN0TW9kZSA9IGlzU3RyaWN0TW9kZTtcbmV4cG9ydHMuaXNTdXNwZW5zZSA9IGlzU3VzcGVuc2U7XG5leHBvcnRzLmlzVmFsaWRFbGVtZW50VHlwZSA9IGlzVmFsaWRFbGVtZW50VHlwZTtcbmV4cG9ydHMudHlwZU9mID0gdHlwZU9mO1xuICB9KSgpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWlzLnByb2R1Y3Rpb24ubWluLmpzJyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzJyk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImxvZGFzaFwiXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImVlanNcIl1bXCJjb21wb25lbnRzXCJdOyIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wiZWVqc1wiXVtcImVkaXRvckhvY3NcIl07IiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJlZWpzXCJdW1wiaTE4blwiXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImVlanNcIl1bXCJtb2RlbFwiXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcIndwXCJdW1wiYmxvY2tFZGl0b3JcIl07IiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJ3cFwiXVtcImJsb2Nrc1wiXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcIndwXCJdW1wiY29tcG9uZW50c1wiXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcIndwXCJdW1wiZGF0YVwiXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcIndwXCJdW1wiZWxlbWVudFwiXTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL2V2ZW50LWF0dGVuZGVlcyc7XG4iXSwibmFtZXMiOlsiQ1NTX0NMQVNTX0NPUkVfQkxPQ0tTIiwiSW5zcGVjdG9yQ29udHJvbHMiLCJDb21wb25lbnQiLCJGcmFnbWVudCIsIlBhbmVsQm9keSIsIlBsYWNlaG9sZGVyIiwiVG9nZ2xlQ29udHJvbCIsIlNwaW5uZXIiLCJSYW5nZUNvbnRyb2wiLCJTZWxlY3RDb250cm9sIiwid2l0aFNlbGVjdCIsInNwcmludGYiLCJfbiIsIl9fIiwiRWRpdG9yRGF0ZXRpbWVTZWxlY3QiLCJFZGl0b3JFdmVudFNlbGVjdCIsIkVkaXRvclN0YXR1c1NlbGVjdCIsIkVkaXRvclRpY2tldFNlbGVjdCIsIlF1ZXJ5TGltaXQiLCJFdmVudEF0dGVuZGVlTGlzdCIsIk5vdFdpdGhQb3N0VHlwZUNoZWNrIiwic3RhdHVzTW9kZWwiLCJhdHRlbmRlZU1vZGVsIiwiUVVFUllfT1JERVJfQVNDIiwiUVVFUllfT1JERVJfREVTQyIsIkFMTE9XRURfT1JERVJfVkFMVUVTIiwiUHJvcFR5cGVzIiwiaXNFbXB0eSIsImRlZmF1bHRRdWVyeURhdGEiLCJzaG93RXhwaXJlZCIsImxpbWl0IiwiaXNOZXdCbG9jayIsImV2ZW50SWQiLCJkYXRldGltZUlkIiwidGlja2V0SWQiLCJERUZBVUxUX0FSUkFZIiwiaGlnaGVzdFJlcXVlc3RlZExpbWl0IiwiRXZlbnRBdHRlbmRlZXNFZGl0b3IiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwidmFsdWUiLCJwYXJzZUludCIsInNldEF0dHJpYnV0ZXMiLCJzZXRTdGF0ZSIsImRhdGV0aW1lUXVlcnlEYXRhIiwic3RhdGUiLCJmb3JFdmVudElkIiwidGlja2V0UXVlcnlEYXRhIiwiZm9yRGF0ZXRpbWVJZCIsInN0YXR1cyIsIlJFR0lTVFJBVElPTl9TVEFUVVNfSUQiLCJBUFBST1ZFRCIsIm9yZGVyQnkiLCJvcmRlciIsInNpemUiLCJhdmF0YXJTaXplIiwic2hvd0dyYXZhdGFyIiwiZGlzcGxheU9uQXJjaGl2ZXMiLCJhdHRyaWJ1dGVzIiwiZXZlbnRRdWVyeURhdGEiLCJzdGF0dXNRdWVyeURhdGEiLCJzdGF0dXNUeXBlIiwiU1RBVFVTX1RZUEVfUkVHSVNUUkFUSU9OIiwiZ2V0QXR0ZW5kZWVzRGlzcGxheSIsImlzTG9hZGluZyIsImF0dGVuZGVlcyIsImF2YXRhckNsYXNzIiwiYXZhdGFyT3B0aW9ucyIsImF2YXRhcldpZHRoIiwiYXZhdGFySGVpZ2h0IiwiYXBwbHlMaW1pdCIsImxlbmd0aCIsInNsaWNlIiwiZ2V0SW5zcGVjdG9yQ29udHJvbHMiLCJjb3VudEF0dGVuZGVlcyIsInNldEV2ZW50SWQiLCJzZXREYXRldGltZUlkIiwic2V0VGlja2V0SWQiLCJzZXRTdGF0dXMiLCJzZXRMaW1pdCIsImxhYmVsIiwic2V0T3JkZXJCeSIsInNldE9yZGVyIiwidG9nZ2xlU2hvd0dyYXZhdGFyIiwic2V0QXZhdGFyU2l6ZSIsInRvZ2dsZURpc3BsYXlPbkFyY2hpdmVzIiwicmVuZGVyIiwiYXJyYXkiLCJib29sIiwic2hhcGUiLCJudW1iZXIiLCJzdHJpbmciLCJvbmVPZiIsInNlbGVjdCIsIm93blByb3BzIiwiZGVmYXVsdFByb3BzIiwiaXNOYU4iLCJxdWVyeURhdGEiLCJmb3JUaWNrZXRJZCIsImZvclN0YXR1c0lkIiwiZGVmYXVsdFdoZXJlQ29uZGl0aW9ucyIsInF1ZXJ5U3RyaW5nIiwiZ2V0UXVlcnlTdHJpbmciLCJnZXRBdHRlbmRlZXMiLCJpc1JlcXVlc3RpbmdBdHRlbmRlZXMiLCJyZWdpc3RlckJsb2NrVHlwZSIsIm5hbWUiLCJzZXR0aW5ncyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJpY29uIiwiY2F0ZWdvcnkiLCJrZXl3b3JkcyIsInR5cGUiLCJkZWZhdWx0IiwiZWRpdCIsInNhdmUiXSwic291cmNlUm9vdCI6IiJ9
var eejs = typeof eejs === "object" ? eejs : {}; eejs["hocs"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/higher-order-components/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/higher-order-components/base-control.js":
/*!************************************************************!*\
  !*** ./assets/src/higher-order-components/base-control.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);









/**
 * WordPress Imports
 */



/**
 * External Imports
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  var customId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_8__["createHigherOrderComponent"])(Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_8__["compose"])([_wordpress_compose__WEBPACK_IMPORTED_MODULE_8__["withInstanceId"], function (WrappedComponent) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(_class, _Component);

      function _class() {
        _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, _class);

        return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(_class).apply(this, arguments));
      }

      _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(_class, [{
        key: "render",
        value: function render() {
          var _this$props = this.props,
              label = _this$props.label,
              instanceId = _this$props.instanceId,
              className = _this$props.className,
              help = _this$props.help;
          var id = "inspector-".concat(customId, "-control-").concat(instanceId);
          return React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__["BaseControl"], {
            label: label,
            id: id,
            className: className,
            help: help
          }, React.createElement(WrappedComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, {
            label: '',
            id: id
          })));
        }
      }]);

      return _class;
    }(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["Component"]), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_class, "propTypes", {
      label: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string,
      instanceId: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string]),
      className: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string,
      help: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string
    }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_class, "defaultProps", {
      label: WrappedComponent.defaultProps && WrappedComponent.defaultProps.label ? WrappedComponent.defaultProps.label : ''
    }), _temp;
  }]), 'withBaseControl');
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/higher-order-components/filter-bar/entity-list-filter-bar.js":
/*!*********************************************************************************!*\
  !*** ./assets/src/higher-order-components/filter-bar/entity-list-filter-bar.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
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
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./style.css */ "./assets/src/higher-order-components/filter-bar/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_12__);









/**
 * External imports
 */





/**
 * Internal dependencies
 */


/**
 * EntityListFilterBar
 * a group of inputs for controlling how a list of entities is displayed
 *
 * @param {Object} entityFilters additional entity specific filters
 * @param {number} perPage
 * @param {string} view
 * @param {Function} setPerPage callback for perPage input
 * @param {Function} setListView callback for list view icon button
 * @param {Function} setGridView callback for grid view icon button
 * @return {Object} EntityListFilterBar
 */

var EntityListFilterBar =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(EntityListFilterBar, _Component);

  function EntityListFilterBar() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, EntityListFilterBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(EntityListFilterBar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "search", function (searchText, setSearchText) {
      return Object(lodash__WEBPACK_IMPORTED_MODULE_9__["isFunction"])(setSearchText) ? React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["Fragment"], null, React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["TextControl"], {
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_11__["__"])('search', 'event_espresso'),
        className: "ee-entity-list-filter-bar-search",
        value: searchText,
        onChange: setSearchText
      })) : null;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "perPage", function (perPage, setPerPage) {
      return React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["SelectControl"], {
        label: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_11__["__"])('per page', 'event_espresso'),
        className: "ee-entity-list-filter-bar-perPage-select",
        value: perPage,
        options: [{
          value: 2,
          label: 2
        }, {
          value: 6,
          label: 6
        }, {
          value: 12,
          label: 12
        }, {
          value: 24,
          label: 24
        }, {
          value: 48,
          label: 48
        }],
        onChange: setPerPage
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "listView", function (view, setListView) {
      return React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["IconButton"], {
        className: view === 'list' ? 'active-list' : '',
        icon: "editor-justify",
        tooltip: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_11__["__"])('list view', 'event_espresso'),
        onClick: setListView
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "gridView", function (view, setGridView) {
      return React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["IconButton"], {
        className: view === 'grid' ? 'active-list' : '',
        icon: "screenoptions",
        tooltip: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_11__["__"])('grid view', 'event_espresso'),
        onClick: setGridView
      });
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(EntityListFilterBar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$searchTex = _this$props.searchText,
          searchText = _this$props$searchTex === void 0 ? '' : _this$props$searchTex,
          setSearchText = _this$props.setSearchText,
          perPage = _this$props.perPage,
          view = _this$props.view,
          setPerPage = _this$props.setPerPage,
          setListView = _this$props.setListView,
          setGridView = _this$props.setGridView;
      var entityFilters = this.props.entityFilters ? React.createElement("div", {
        className: "ee-entity-list-filter-bar"
      }, this.props.entityFilters) : null;
      return React.createElement("div", {
        className: "ee-entity-list-filter-bar-wrapper"
      }, entityFilters, React.createElement("div", {
        className: "ee-entity-list-view-bar"
      }, React.createElement("div", {
        className: "ee-search-filter ee-filter-bar-filter"
      }, this.search(searchText, setSearchText)), React.createElement("div", {
        className: "ee-per-page-filter ee-filter-bar-filter"
      }, this.perPage(perPage, setPerPage)), React.createElement("div", {
        className: "ee-view-filter ee-filter-bar-filter"
      }, this.listView(view, setListView), this.gridView(view, setGridView))));
    }
  }]);

  return EntityListFilterBar;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["Component"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(EntityListFilterBar, "propTypes", {
  entityFilters: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object,
  perPage: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number.isRequired,
  view: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string.isRequired,
  setPerPage: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func.isRequired,
  setListView: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func.isRequired,
  setGridView: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (EntityListFilterBar);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/higher-order-components/filter-bar/index.js":
/*!****************************************************************!*\
  !*** ./assets/src/higher-order-components/filter-bar/index.js ***!
  \****************************************************************/
/*! exports provided: PaginatedEntityListWithFilterBar, PaginatedEntityListWithFilterBarAndState, EntityListFilterBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginatedEntityListWithFilterBar", function() { return PaginatedEntityListWithFilterBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginatedEntityListWithFilterBarAndState", function() { return PaginatedEntityListWithFilterBarAndState; });
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pagination */ "./assets/src/higher-order-components/pagination/index.js");
/* harmony import */ var _with_entity_list_filter_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./with-entity-list-filter-bar */ "./assets/src/higher-order-components/filter-bar/with-entity-list-filter-bar.js");
/* harmony import */ var _with_entity_list_filter_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./with-entity-list-filter-state */ "./assets/src/higher-order-components/filter-bar/with-entity-list-filter-state.js");
/* harmony import */ var _entity_list_filter_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entity-list-filter-bar */ "./assets/src/higher-order-components/filter-bar/entity-list-filter-bar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityListFilterBar", function() { return _entity_list_filter_bar__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/**
 * External imports
 */

/**
 * Internal dependencies
 */



var PaginatedEntityListWithFilterBar = function PaginatedEntityListWithFilterBar(EntityList) {
  var paginationConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object(_with_entity_list_filter_bar__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_pagination__WEBPACK_IMPORTED_MODULE_0__["default"])(paginationConfig)(EntityList));
};
var PaginatedEntityListWithFilterBarAndState = function PaginatedEntityListWithFilterBarAndState(EntityList) {
  var paginationConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object(_with_entity_list_filter_state__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_with_entity_list_filter_bar__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_pagination__WEBPACK_IMPORTED_MODULE_0__["default"])(paginationConfig)(EntityList)));
};


/***/ }),

/***/ "./assets/src/higher-order-components/filter-bar/style.css":
/*!*****************************************************************!*\
  !*** ./assets/src/higher-order-components/filter-bar/style.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"ee-entity-list-filter-bar-wrapper":"ee-entity-list-filter-bar-wrapper","ee-entity-list-filter-bar":"ee-entity-list-filter-bar","ee-entity-list-view-bar":"ee-entity-list-view-bar","ee-entity-list-filter-bar-perPage-select":"ee-entity-list-filter-bar-perPage-select","ee-filter-bar-filter":"ee-filter-bar-filter","ee-search-filter":"ee-search-filter","ee-per-page-filter":"ee-per-page-filter","ee-grid-view-filter":"ee-grid-view-filter","ee-list-view-filter":"ee-list-view-filter","components-icon-button":"components-icon-button","active-list":"active-list","components-base-control__label":"components-base-control__label","components-text-control__input":"components-text-control__input","components-select-control__input":"components-select-control__input"};

/***/ }),

/***/ "./assets/src/higher-order-components/filter-bar/with-entity-list-filter-bar.js":
/*!**************************************************************************************!*\
  !*** ./assets/src/higher-order-components/filter-bar/with-entity-list-filter-bar.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _entity_list_filter_bar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./entity-list-filter-bar */ "./assets/src/higher-order-components/filter-bar/entity-list-filter-bar.js");











/**
 * External imports
 */




/**
 * Internal dependencies
 */


/**
 * withEntityListFilterBar
 * Higher-Order-Component that wraps an EntityList component
 * for changing how the EntityList is viewed
 *
 * @return {Object} EntityList with added EntityListFilterBar
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_11__["createHigherOrderComponent"])(function (EntityList) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function (_Component) {
    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(_temp, _Component);

    function _temp() {
      var _getPrototypeOf2;

      var _this;

      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, _temp);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(_temp)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "searchEntities", function (searchText, entities) {
        return searchText !== '' ? entities.filter(function (entity) {
          var entityName = entity.name ? entity.name : '';
          return entityName.toLowerCase().search(searchText.toLowerCase()) !== -1;
        }) : entities;
      });

      return _this;
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(_temp, [{
      key: "render",
      value: function render() {
        var entities = this.props.entities;

        var _this$props = this.props,
            searchText = _this$props.searchText,
            setSearchText = _this$props.setSearchText,
            perPage = _this$props.perPage,
            view = _this$props.view,
            setPerPage = _this$props.setPerPage,
            setListView = _this$props.setListView,
            setGridView = _this$props.setGridView,
            otherProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_this$props, ["searchText", "setSearchText", "perPage", "view", "setPerPage", "setListView", "setGridView"]);

        entities = Object(lodash__WEBPACK_IMPORTED_MODULE_10__["isFunction"])(setSearchText) ? this.searchEntities(searchText, entities) : entities;
        return React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Fragment"], null, React.createElement(_entity_list_filter_bar__WEBPACK_IMPORTED_MODULE_13__["default"], {
          searchText: searchText,
          setSearchText: setSearchText,
          perPage: perPage,
          view: view,
          setPerPage: setPerPage,
          setListView: setListView,
          setGridView: setGridView
        }), React.createElement(EntityList, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
          entities: entities,
          entitiesPerPage: perPage,
          view: view,
          noResultsText: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('no results found (try changing filters)', 'event_espresso')
        }, otherProps)));
      }
    }]);

    return _temp;
  }(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Component"]), _temp;
}, 'withEntityListFilterBar'));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/higher-order-components/filter-bar/with-entity-list-filter-state.js":
/*!****************************************************************************************!*\
  !*** ./assets/src/higher-order-components/filter-bar/with-entity-list-filter-state.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_9__);








/**
 * External imports
 */




/**
 * withEntityListFilterState
 * Higher-Order-Component that wraps an "EntityListFilterBar" component
 * in order to provide state management for it and its children
 *
 * @param {Object} WrappedComponent
 * @return {Object} WrappedComponent with added EntityListFilterState
 */

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_8__["createHigherOrderComponent"])(Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_8__["compose"])([Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_9__["withSelect"])(function (select, ownProps) {
  var _ownProps$searchText = ownProps.searchText,
      searchText = _ownProps$searchText === void 0 ? '' : _ownProps$searchText,
      _ownProps$perPage = ownProps.perPage,
      perPage = _ownProps$perPage === void 0 ? 6 : _ownProps$perPage,
      _ownProps$view = ownProps.view,
      view = _ownProps$view === void 0 ? 'grid' : _ownProps$view;
  var store = select('eventespresso/filter-state');
  return {
    searchText: store.getFilter('entity-list', 'searchText', searchText),
    perPage: parseInt(store.getFilter('entity-list', 'perPage', perPage)),
    view: store.getFilter('entity-list', 'view', view)
  };
}), Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_9__["withDispatch"])(function (dispatch) {
  var store = dispatch('eventespresso/filter-state');
  return {
    setSearchText: function setSearchText(searchText) {
      return store.setFilter('entity-list', 'searchText', searchText);
    },
    setPerPage: function setPerPage(perPage) {
      return store.setFilter('entity-list', 'perPage', parseInt(perPage));
    },
    setListView: function setListView() {
      return store.setFilter('entity-list', 'view', 'list');
    },
    setGridView: function setGridView() {
      return store.setFilter('entity-list', 'view', 'grid');
    }
  };
}), function (WrappedComponent) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(_class, _Component);

    function _class() {
      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, _class);

      return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(_class).apply(this, arguments));
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(_class, [{
      key: "render",
      value: function render() {
        return React.createElement(WrappedComponent, this.props);
      }
    }]);

    return _class;
  }(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["Component"]), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_class, "propTypes", {
    entities: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object).isRequired
  }), _temp;
}]), 'withEntityListFilterState'));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/higher-order-components/index.js":
/*!*****************************************************!*\
  !*** ./assets/src/higher-order-components/index.js ***!
  \*****************************************************/
/*! exports provided: withBaseControl, PaginatedEntityListWithFilterBar, PaginatedEntityListWithFilterBarAndState, EntityListFilterBar, withEntityPagination, withLatestCheckin, withMoney */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control */ "./assets/src/higher-order-components/base-control.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withBaseControl", function() { return _base_control__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _filter_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter-bar */ "./assets/src/higher-order-components/filter-bar/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PaginatedEntityListWithFilterBar", function() { return _filter_bar__WEBPACK_IMPORTED_MODULE_1__["PaginatedEntityListWithFilterBar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PaginatedEntityListWithFilterBarAndState", function() { return _filter_bar__WEBPACK_IMPORTED_MODULE_1__["PaginatedEntityListWithFilterBarAndState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntityListFilterBar", function() { return _filter_bar__WEBPACK_IMPORTED_MODULE_1__["EntityListFilterBar"]; });

/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pagination */ "./assets/src/higher-order-components/pagination/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withEntityPagination", function() { return _pagination__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _with_latest_checkin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./with-latest-checkin */ "./assets/src/higher-order-components/with-latest-checkin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withLatestCheckin", function() { return _with_latest_checkin__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _money__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./money */ "./assets/src/higher-order-components/money.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withMoney", function() { return _money__WEBPACK_IMPORTED_MODULE_4__["default"]; });







/***/ }),

/***/ "./assets/src/higher-order-components/money.js":
/*!*****************************************************!*\
  !*** ./assets/src/higher-order-components/money.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/is-shallow-equal */ "./node_modules/@wordpress/is-shallow-equal/index.js");
/* harmony import */ var _wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @eventespresso/value-objects */ "@eventespresso/value-objects");
/* harmony import */ var _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_13__);











/**
 * External imports
 */





/**
 * This validates whether the nextStateResponse is in the expected shape.
 * If any of the validation fails, then a console.error is triggered (via
 * warning)
 *
 * @param {{}} nextStateResponse
 */

var validateNextState = function validateNextState(nextStateResponse) {
  warning__WEBPACK_IMPORTED_MODULE_12___default()(nextStateResponse && nextStateResponse.hasOwnProperty('convertedValues'), 'The propNameMap callback for the withMoney HOC should return an' + ' object with a "convertedValues" key.');

  if (nextStateResponse && nextStateResponse.hasOwnProperty('convertedValues')) {
    warning__WEBPACK_IMPORTED_MODULE_12___default()(Object(lodash__WEBPACK_IMPORTED_MODULE_10__["isArray"])(nextStateResponse.convertedValues), 'The propNameMap callback for the withMoney HOC should return an ' + 'object with a "convertedValues" key that has an array' + ' of numbers as the value.');
  }

  warning__WEBPACK_IMPORTED_MODULE_12___default()(nextStateResponse && nextStateResponse.hasOwnProperty('props'), 'The propNameMap callback for the withMoneyHOC should return an' + ' object with a "props" key.');
};
/**
 * A higher order component that converts any props matching the map provided
 * as an argument to Money value objects and passes them to the WrappedComponent
 *
 * @param {Array|function} propNameMap
 * @return {function(*): EnhancedComponent}  Returns an enhanced component where
 * props that represent money values have been converted to a Money value object
 */


var withMoney = function withMoney() {
  var propNameMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return function (WrappedComponent) {
    var EnhancedComponent =
    /*#__PURE__*/
    function (_Component) {
      _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(EnhancedComponent, _Component);

      function EnhancedComponent() {
        var _getPrototypeOf2;

        var _this;

        _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, EnhancedComponent);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(EnhancedComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "state", {
          convertedValues: []
        });

        _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "getNextState", function (props) {
          var nextStateResponse,
              nextState = {},
              convertedValues = [];

          if (Object(lodash__WEBPACK_IMPORTED_MODULE_10__["isFunction"])(propNameMap)) {
            nextStateResponse = propNameMap(props, _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_13__["Money"]);
            validateNextState(nextStateResponse);

            if (nextStateResponse && nextStateResponse.props) {
              nextState = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, nextStateResponse.props);
            }

            convertedValues = nextStateResponse.convertedValues || convertedValues;
          } else if (Object(lodash__WEBPACK_IMPORTED_MODULE_10__["isArray"])(propNameMap)) {
            propNameMap.forEach(function (propName) {
              if (props[propName]) {
                nextState[propName] = new _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_13__["Money"](props[propName], _eventespresso_value_objects__WEBPACK_IMPORTED_MODULE_13__["SiteCurrency"]);
                convertedValues.push(nextState[propName].toNumber());
              }
            });
          } else {
            warning__WEBPACK_IMPORTED_MODULE_12___default()(false, 'The propNameMap argument provided to withMoney must be either a' + ' function or an array');
          }

          nextState.convertedValues = convertedValues;
          return nextState;
        });

        _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "shouldUpdateStateWithConvertedValues", function (prevProps, prevState, nextState) {
          return !_wordpress_is_shallow_equal__WEBPACK_IMPORTED_MODULE_11___default()(nextState.convertedValues, prevState.convertedValues) && nextState.convertedValues[0] !== prevState.convertedValues[0];
        });

        return _this;
      }

      _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(EnhancedComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.setState(this.getNextState(this.props));
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
          var nextState = this.getNextState(this.props);

          if (this.shouldUpdateStateWithConvertedValues(prevProps, prevState, nextState)) {
            this.setState(nextState);
          }
        }
      }, {
        key: "render",
        value: function render() {
          return React.createElement(WrappedComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.props, this.state));
        }
      }]);

      return EnhancedComponent;
    }(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Component"]);

    return EnhancedComponent;
  };
};

/* harmony default export */ __webpack_exports__["default"] = (withMoney);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/higher-order-components/pagination/index.js":
/*!****************************************************************!*\
  !*** ./assets/src/higher-order-components/pagination/index.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React) {/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var jw_react_pagination__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! jw-react-pagination */ "./node_modules/jw-react-pagination/lib/JwPagination.js");
/* harmony import */ var jw_react_pagination__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(jw_react_pagination__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @eventespresso/i18n */ "@eventespresso/i18n");
/* harmony import */ var _eventespresso_i18n__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./style.css */ "./assets/src/higher-order-components/pagination/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_15__);











/**
 * External imports
 */






/**
 * Internal dependencies
 */


/**
 * withEntityPagination
 * Higher-Order-Component that wraps an "EntityList" component
 * with an EntityPagination component that adds a pagination container
 * below the EntityList and controls what entities are displayed
 *
 * @param {Object} paginationConfig
 * @return {Object} EntityList with added EntityPagination
 */

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var paginationConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_13__["createHigherOrderComponent"])(Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_13__["compose"])([_wordpress_compose__WEBPACK_IMPORTED_MODULE_13__["withInstanceId"], function (EntityList) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(EntityPagination, _Component);

      function EntityPagination(props) {
        var _this;

        _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, EntityPagination);

        _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(EntityPagination).call(this, props));

        _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "onPaginationChange", function (entityPage) {
          // update local state with new page of items
          _this.setState({
            entityPage: entityPage
          });
        });

        _this.state = {
          entityPage: []
        };
        return _this;
      }

      _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(EntityPagination, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
          return !(Object(lodash__WEBPACK_IMPORTED_MODULE_10__["isEqual"])(nextProps, this.props) && Object(lodash__WEBPACK_IMPORTED_MODULE_10__["isEqual"])(nextState.entityPage, this.state.entityPage));
        }
        /**
         * @function
         * @param {Array} entityPage
         */

      }, {
        key: "render",
        value: function render() {
          var _this$props = this.props,
              entities = _this$props.entities,
              instanceId = _this$props.instanceId,
              _this$props$entitiesP = _this$props.entitiesPerPage,
              entitiesPerPage = _this$props$entitiesP === void 0 ? 10 : _this$props$entitiesP,
              _this$props$position = _this$props.position,
              position = _this$props$position === void 0 ? 'top' : _this$props$position,
              otherProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_this$props, ["entities", "instanceId", "entitiesPerPage", "position"]);

          paginationConfig.labels = paginationConfig.labels && paginationConfig.labels.first && paginationConfig.labels.last && paginationConfig.labels.previous && paginationConfig.labels.next ? paginationConfig.labels : {
            first: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_14__["__"])('First', 'event_espresso'),
            last: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_14__["__"])('Last', 'event_espresso'),
            previous: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_14__["__"])('Prev', 'event_espresso'),
            next: Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_14__["__"])('Next', 'event_espresso')
          };
          var noResultsText = paginationConfig.noResultsText ? paginationConfig.noResultsText : Object(_eventespresso_i18n__WEBPACK_IMPORTED_MODULE_14__["__"])('no results found (try changing filters)', 'event_espresso');
          var returnAsProp = paginationConfig.returnAsProp ? paginationConfig.returnAsProp : false;
          var pagination = React.createElement("div", {
            id: "ee-entity-pagination-".concat(instanceId),
            className: "ee-entity-pagination"
          }, React.createElement(jw_react_pagination__WEBPACK_IMPORTED_MODULE_12___default.a, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
            items: entities,
            onChangePage: this.onPaginationChange,
            pageSize: parseInt(entitiesPerPage)
          }, paginationConfig)));
          var topPagination = position === ('top' || false) ? pagination : null;
          var bottomPagination = position === ('bottom' || false) ? pagination : null;
          return returnAsProp ? React.createElement(EntityList, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
            pagination: pagination,
            entities: this.state.entityPage,
            noResultsText: noResultsText
          }, otherProps)) : React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Fragment"], null, topPagination, React.createElement(EntityList, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
            entities: this.state.entityPage,
            noResultsText: noResultsText
          }, otherProps)), bottomPagination);
        }
      }]);

      return EntityPagination;
    }(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__["Component"]), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_class, "propTypes", {
      entities: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.array.isRequired,
      instanceId: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number.isRequired,
      entitiesPerPage: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number]),
      position: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string
    }), _temp;
  }]), 'withEntityPagination');
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react")))

/***/ }),

/***/ "./assets/src/higher-order-components/pagination/style.css":
/*!*****************************************************************!*\
  !*** ./assets/src/higher-order-components/pagination/style.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"ee-entity-pagination":"ee-entity-pagination","pagination":"pagination","disabled":"disabled","active":"active"};

/***/ }),

/***/ "./assets/src/higher-order-components/with-latest-checkin.js":
/*!*******************************************************************!*\
  !*** ./assets/src/higher-order-components/with-latest-checkin.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @eventespresso/validators */ "@eventespresso/validators");
/* harmony import */ var _eventespresso_validators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__);
/**
 * External imports
 */



/**
 * Exposes properties related to the latest check-in entity for a given
 * registration and datetime.
 *
 * Properties passed through to wrapped component are:
 *
 * - checkInEntity {BaseEntity|null} The check-in entity that is related to the
 * given registration and datetime id.
 * - hasResolvedCheckin {boolean} Whether the check-in entity selector has
 * resolved.  This is important because its possible there is no entity for
 * this registration and datetime if that registration hasn never been checked
 * in.
 * - onClick {function} A click handler which when invoked, will toggle the
 * check-in state for the given registration and datetimeId. Note: this will
 * replace the store latestCheckin record in the state for this given
 * registration and datetime id which will get picked up by the `withSelect`
 * HOC in the composed component.
 *
 * @type {WPComponent}
 */

var withLatestCheckin = Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__["createHigherOrderComponent"])(Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__["compose"])([Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["withSelect"])(function (select, _ref) {
  var registration = _ref.registration,
      datetimeId = _ref.datetimeId;

  if (!Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__["isModelEntityOfModel"])(registration, 'registration')) {
    return {};
  }

  var _select = select('eventespresso/core'),
      getLatestCheckin = _select.getLatestCheckin;

  var _select2 = select('core/data'),
      hasFinishedResolution = _select2.hasFinishedResolution;

  var checkInEntity = getLatestCheckin(registration.id, datetimeId);
  return {
    checkinEntity: checkInEntity || null,
    hasResolvedCheckin: hasFinishedResolution('eventespresso/core', 'getLatestCheckin', [registration.id, datetimeId])
  };
}), Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["withDispatch"])(function (dispatch, _ref2) {
  var registration = _ref2.registration,
      datetimeId = _ref2.datetimeId;

  var _dispatch = dispatch('eventespresso/core'),
      toggleCheckin = _dispatch.toggleCheckin;

  return {
    onClick: function onClick() {
      if (Object(_eventespresso_validators__WEBPACK_IMPORTED_MODULE_2__["isModelEntityOfModel"])(registration, 'registration')) {
        toggleCheckin(registration.id, datetimeId);
      }
    }
  };
})]), 'withLatestCheckin');
/* harmony default export */ __webpack_exports__["default"] = (withLatestCheckin);

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

/***/ "./node_modules/@babel/runtime/helpers/extends.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/extends.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

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

/***/ "./node_modules/@babel/runtime/helpers/objectSpread.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectSpread.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

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

/***/ "./node_modules/@wordpress/is-shallow-equal/arrays.js":
/*!************************************************************!*\
  !*** ./node_modules/@wordpress/is-shallow-equal/arrays.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Returns true if the two arrays are shallow equal, or false otherwise.
 *
 * @param {Array} a First array to compare.
 * @param {Array} b Second array to compare.
 *
 * @return {boolean} Whether the two arrays are shallow equal.
 */
function isShallowEqualArrays( a, b ) {
	var i;

	if ( a === b ) {
		return true;
	}

	if ( a.length !== b.length ) {
		return false;
	}

	for ( i = 0; i < a.length; i++ ) {
		if ( a[ i ] !== b[ i ] ) {
			return false;
		}
	}

	return true;
}

module.exports = isShallowEqualArrays;


/***/ }),

/***/ "./node_modules/@wordpress/is-shallow-equal/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@wordpress/is-shallow-equal/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Internal dependencies;
 */
var isShallowEqualObjects = __webpack_require__( /*! ./objects */ "./node_modules/@wordpress/is-shallow-equal/objects.js" );
var isShallowEqualArrays = __webpack_require__( /*! ./arrays */ "./node_modules/@wordpress/is-shallow-equal/arrays.js" );

var isArray = Array.isArray;

/**
 * Returns true if the two arrays or objects are shallow equal, or false
 * otherwise.
 *
 * @param {(Array|Object)} a First object or array to compare.
 * @param {(Array|Object)} b Second object or array to compare.
 *
 * @return {boolean} Whether the two values are shallow equal.
 */
function isShallowEqual( a, b ) {
	if ( a && b ) {
		if ( a.constructor === Object && b.constructor === Object ) {
			return isShallowEqualObjects( a, b );
		} else if ( isArray( a ) && isArray( b ) ) {
			return isShallowEqualArrays( a, b );
		}
	}

	return a === b;
}

module.exports = isShallowEqual;
module.exports.isShallowEqualObjects = isShallowEqualObjects;
module.exports.isShallowEqualArrays = isShallowEqualArrays;


/***/ }),

/***/ "./node_modules/@wordpress/is-shallow-equal/objects.js":
/*!*************************************************************!*\
  !*** ./node_modules/@wordpress/is-shallow-equal/objects.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = Object.keys;

/**
 * Returns true if the two objects are shallow equal, or false otherwise.
 *
 * @param {Object} a First object to compare.
 * @param {Object} b Second object to compare.
 *
 * @return {boolean} Whether the two objects are shallow equal.
 */
function isShallowEqualObjects( a, b ) {
	var aKeys, bKeys, i, key;

	if ( a === b ) {
		return true;
	}

	aKeys = keys( a );
	bKeys = keys( b );

	if ( aKeys.length !== bKeys.length ) {
		return false;
	}

	i = 0;

	while ( i < aKeys.length ) {
		key = aKeys[ i ];
		if ( a[ key ] !== b[ key ] ) {
			return false;
		}

		i++;
	}

	return true;
}

module.exports = isShallowEqualObjects;


/***/ }),

/***/ "./node_modules/jw-react-pagination/lib/JwPagination.js":
/*!**************************************************************!*\
  !*** ./node_modules/jw-react-pagination/lib/JwPagination.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=i(r(1)),u=i(r(4)),l=i(r(7));function i(e){return e&&e.__esModule?e:{default:e}}var s={items:u.default.array.isRequired,onChangePage:u.default.func.isRequired,initialPage:u.default.number,pageSize:u.default.number,maxPages:u.default.number,labels:u.default.object,styles:u.default.object,disableDefaultStyles:u.default.bool},c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={pager:{}},r.styles={},e.disableDefaultStyles||(r.styles={ul:{margin:0,padding:0,display:"inline-block"},li:{listStyle:"none",display:"inline",textAlign:"center"},a:{cursor:"pointer",padding:"6px 12px",display:"block",float:"left"}}),e.styles&&(r.styles={ul:n({},r.styles.ul,e.styles.ul),li:n({},r.styles.li,e.styles.li),a:n({},r.styles.a,e.styles.a)}),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),o(t,[{key:"componentWillMount",value:function(){this.props.items&&this.props.items.length&&this.setPage(this.props.initialPage)}},{key:"componentDidUpdate",value:function(e,t){this.props.items!==e.items&&this.setPage(this.props.initialPage)}},{key:"setPage",value:function(e){var t=this.props,r=t.items,n=t.pageSize,o=t.maxPages,a=this.state.pager;a=(0,l.default)(r.length,e,n,o);var u=r.slice(a.startIndex,a.endIndex+1);this.setState({pager:a}),this.props.onChangePage(u)}},{key:"render",value:function(){var e=this,t=this.state.pager,r=this.props.labels,n=this.styles;return!t.pages||t.pages.length<=1?null:a.default.createElement("ul",{className:"pagination",style:n.ul},a.default.createElement("li",{className:"page-item first "+(1===t.currentPage?"disabled":""),style:n.li},a.default.createElement("a",{className:"page-link",onClick:function(){return e.setPage(1)},style:n.a},r.first)),a.default.createElement("li",{className:"page-item previous "+(1===t.currentPage?"disabled":""),style:n.li},a.default.createElement("a",{className:"page-link",onClick:function(){return e.setPage(t.currentPage-1)},style:n.a},r.previous)),t.pages.map(function(r,o){return a.default.createElement("li",{key:o,className:"page-item page-number "+(t.currentPage===r?"active":""),style:n.li},a.default.createElement("a",{className:"page-link",onClick:function(){return e.setPage(r)},style:n.a},r))}),a.default.createElement("li",{className:"page-item next "+(t.currentPage===t.totalPages?"disabled":""),style:n.li},a.default.createElement("a",{className:"page-link",onClick:function(){return e.setPage(t.currentPage+1)},style:n.a},r.next)),a.default.createElement("li",{className:"page-item last "+(t.currentPage===t.totalPages?"disabled":""),style:n.li},a.default.createElement("a",{className:"page-link",onClick:function(){return e.setPage(t.totalPages)},style:n.a},r.last)))}}]),t}();c.propTypes=s,c.defaultProps={initialPage:1,pageSize:10,maxPages:10,labels:{first:"First",last:"Last",previous:"Previous",next:"Next"}},t.default=c},function(e,t,r){"use strict";e.exports=r(2)},function(e,t,r){"use strict";
/** @license React v16.8.6
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(3),o="function"==typeof Symbol&&Symbol.for,a=o?Symbol.for("react.element"):60103,u=o?Symbol.for("react.portal"):60106,l=o?Symbol.for("react.fragment"):60107,i=o?Symbol.for("react.strict_mode"):60108,s=o?Symbol.for("react.profiler"):60114,c=o?Symbol.for("react.provider"):60109,f=o?Symbol.for("react.context"):60110,p=o?Symbol.for("react.concurrent_mode"):60111,y=o?Symbol.for("react.forward_ref"):60112,d=o?Symbol.for("react.suspense"):60113,m=o?Symbol.for("react.memo"):60115,g=o?Symbol.for("react.lazy"):60116,b="function"==typeof Symbol&&Symbol.iterator;function v(e){for(var t=arguments.length-1,r="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=0;n<t;n++)r+="&args[]="+encodeURIComponent(arguments[n+1]);!function(e,t,r,n,o,a,u,l){if(!e){if(e=void 0,void 0===t)e=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var i=[r,n,o,a,u,l],s=0;(e=Error(t.replace(/%s/g,function(){return i[s++]}))).name="Invariant Violation"}throw e.framesToPop=1,e}}(!1,"Minified React error #"+e+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",r)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},P={};function _(e,t,r){this.props=e,this.context=t,this.refs=P,this.updater=r||h}function O(){}function S(e,t,r){this.props=e,this.context=t,this.refs=P,this.updater=r||h}_.prototype.isReactComponent={},_.prototype.setState=function(e,t){"object"!=typeof e&&"function"!=typeof e&&null!=e&&v("85"),this.updater.enqueueSetState(this,e,t,"setState")},_.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},O.prototype=_.prototype;var k=S.prototype=new O;k.constructor=S,n(k,_.prototype),k.isPureReactComponent=!0;var j={current:null},x={current:null},w=Object.prototype.hasOwnProperty,E={key:!0,ref:!0,__self:!0,__source:!0};function C(e,t,r){var n=void 0,o={},u=null,l=null;if(null!=t)for(n in void 0!==t.ref&&(l=t.ref),void 0!==t.key&&(u=""+t.key),t)w.call(t,n)&&!E.hasOwnProperty(n)&&(o[n]=t[n]);var i=arguments.length-2;if(1===i)o.children=r;else if(1<i){for(var s=Array(i),c=0;c<i;c++)s[c]=arguments[c+2];o.children=s}if(e&&e.defaultProps)for(n in i=e.defaultProps)void 0===o[n]&&(o[n]=i[n]);return{$$typeof:a,type:e,key:u,ref:l,props:o,_owner:x.current}}function R(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var $=/\/+/g,T=[];function M(e,t,r,n){if(T.length){var o=T.pop();return o.result=e,o.keyPrefix=t,o.func=r,o.context=n,o.count=0,o}return{result:e,keyPrefix:t,func:r,context:n,count:0}}function N(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>T.length&&T.push(e)}function I(e,t,r){return null==e?0:function e(t,r,n,o){var l=typeof t;"undefined"!==l&&"boolean"!==l||(t=null);var i=!1;if(null===t)i=!0;else switch(l){case"string":case"number":i=!0;break;case"object":switch(t.$$typeof){case a:case u:i=!0}}if(i)return n(o,t,""===r?"."+A(t,0):r),1;if(i=0,r=""===r?".":r+":",Array.isArray(t))for(var s=0;s<t.length;s++){var c=r+A(l=t[s],s);i+=e(l,c,n,o)}else if(c=null===t||"object"!=typeof t?null:"function"==typeof(c=b&&t[b]||t["@@iterator"])?c:null,"function"==typeof c)for(t=c.call(t),s=0;!(l=t.next()).done;)i+=e(l=l.value,c=r+A(l,s++),n,o);else"object"===l&&v("31","[object Object]"==(n=""+t)?"object with keys {"+Object.keys(t).join(", ")+"}":n,"");return i}(e,"",t,r)}function A(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}(e.key):t.toString(36)}function q(e,t){e.func.call(e.context,t,e.count++)}function U(e,t,r){var n=e.result,o=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?D(e,n,r,function(e){return e}):null!=e&&(R(e)&&(e=function(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(e,o+(!e.key||t&&t.key===e.key?"":(""+e.key).replace($,"$&/")+"/")+r)),n.push(e))}function D(e,t,r,n,o){var a="";null!=r&&(a=(""+r).replace($,"$&/")+"/"),I(e,U,t=M(t,a,n,o)),N(t)}function L(){var e=j.current;return null===e&&v("321"),e}var F={Children:{map:function(e,t,r){if(null==e)return e;var n=[];return D(e,n,null,t,r),n},forEach:function(e,t,r){if(null==e)return e;I(e,q,t=M(null,null,t,r)),N(t)},count:function(e){return I(e,function(){return null},null)},toArray:function(e){var t=[];return D(e,t,null,function(e){return e}),t},only:function(e){return R(e)||v("143"),e}},createRef:function(){return{current:null}},Component:_,PureComponent:S,createContext:function(e,t){return void 0===t&&(t=null),(e={$$typeof:f,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:c,_context:e},e.Consumer=e},forwardRef:function(e){return{$$typeof:y,render:e}},lazy:function(e){return{$$typeof:g,_ctor:e,_status:-1,_result:null}},memo:function(e,t){return{$$typeof:m,type:e,compare:void 0===t?null:t}},useCallback:function(e,t){return L().useCallback(e,t)},useContext:function(e,t){return L().useContext(e,t)},useEffect:function(e,t){return L().useEffect(e,t)},useImperativeHandle:function(e,t,r){return L().useImperativeHandle(e,t,r)},useDebugValue:function(){},useLayoutEffect:function(e,t){return L().useLayoutEffect(e,t)},useMemo:function(e,t){return L().useMemo(e,t)},useReducer:function(e,t,r){return L().useReducer(e,t,r)},useRef:function(e){return L().useRef(e)},useState:function(e){return L().useState(e)},Fragment:l,StrictMode:i,Suspense:d,createElement:C,cloneElement:function(e,t,r){null==e&&v("267",e);var o=void 0,u=n({},e.props),l=e.key,i=e.ref,s=e._owner;if(null!=t){void 0!==t.ref&&(i=t.ref,s=x.current),void 0!==t.key&&(l=""+t.key);var c=void 0;for(o in e.type&&e.type.defaultProps&&(c=e.type.defaultProps),t)w.call(t,o)&&!E.hasOwnProperty(o)&&(u[o]=void 0===t[o]&&void 0!==c?c[o]:t[o])}if(1===(o=arguments.length-2))u.children=r;else if(1<o){c=Array(o);for(var f=0;f<o;f++)c[f]=arguments[f+2];u.children=c}return{$$typeof:a,type:e.type,key:l,ref:i,props:u,_owner:s}},createFactory:function(e){var t=C.bind(null,e);return t.type=e,t},isValidElement:R,version:"16.8.6",unstable_ConcurrentMode:p,unstable_Profiler:s,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentDispatcher:j,ReactCurrentOwner:x,assign:n}},z={default:F},V=z&&F||z;e.exports=V.default||V},function(e,t,r){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(e){n[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var r,u,l=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),i=1;i<arguments.length;i++){for(var s in r=Object(arguments[i]))o.call(r,s)&&(l[s]=r[s]);if(n){u=n(r);for(var c=0;c<u.length;c++)a.call(r,u[c])&&(l[u[c]]=r[u[c]])}}return l}},function(e,t,r){e.exports=r(5)()},function(e,t,r){"use strict";var n=r(6);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,r,o,a,u){if(u!==n){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return r.PropTypes=r,r}},function(e,t,r){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,r){"use strict";e.exports=function(e,t,r,n){void 0===t&&(t=1),void 0===r&&(r=10),void 0===n&&(n=10);var o,a,u=Math.ceil(e/r);if(t<1?t=1:t>u&&(t=u),u<=n)o=1,a=u;else{var l=Math.floor(n/2),i=Math.ceil(n/2)-1;t<=l?(o=1,a=n):t+i>=u?(o=u-n+1,a=u):(o=t-l,a=t+i)}var s=(t-1)*r,c=Math.min(s+r-1,e-1),f=Array.from(Array(a+1-o).keys()).map(function(e){return o+e});return{totalItems:e,currentPage:t,pageSize:r,totalPages:u,startPage:o,endPage:a,startIndex:s,endIndex:c,pages:f}}}]);

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

/***/ "./node_modules/warning/warning.js":
/*!*****************************************!*\
  !*** ./node_modules/warning/warning.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "development" !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  }

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;


/***/ }),

/***/ "@eventespresso/i18n":
/*!****************************!*\
  !*** external "eejs.i18n" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.i18n;

/***/ }),

/***/ "@eventespresso/validators":
/*!**********************************!*\
  !*** external "eejs.validators" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.validators;

/***/ }),

/***/ "@eventespresso/value-objects":
/*!************************************!*\
  !*** external "eejs.valueObjects" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = eejs.valueObjects;

/***/ }),

/***/ "@wordpress/components":
/*!********************************!*\
  !*** external "wp.components" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp.components;

/***/ }),

/***/ "@wordpress/compose":
/*!*****************************!*\
  !*** external "wp.compose" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp.compose;

/***/ }),

/***/ "@wordpress/data":
/*!**************************!*\
  !*** external "wp.data" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp.data;

/***/ }),

/***/ "@wordpress/element":
/*!*****************************!*\
  !*** external "wp.element" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp.element;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = lodash;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZWpzLltuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvYmFzZS1jb250cm9sLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9oaWdoZXItb3JkZXItY29tcG9uZW50cy9maWx0ZXItYmFyL2VudGl0eS1saXN0LWZpbHRlci1iYXIuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL2ZpbHRlci1iYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL2ZpbHRlci1iYXIvc3R5bGUuY3NzPzIxZjIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL2ZpbHRlci1iYXIvd2l0aC1lbnRpdHktbGlzdC1maWx0ZXItYmFyLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9oaWdoZXItb3JkZXItY29tcG9uZW50cy9maWx0ZXItYmFyL3dpdGgtZW50aXR5LWxpc3QtZmlsdGVyLXN0YXRlLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vYXNzZXRzL3NyYy9oaWdoZXItb3JkZXItY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvbW9uZXkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL3BhZ2luYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL3BhZ2luYXRpb24vc3R5bGUuY3NzPzcwZTMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9hc3NldHMvc3JjL2hpZ2hlci1vcmRlci1jb21wb25lbnRzL3dpdGgtbGF0ZXN0LWNoZWNraW4uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFNwcmVhZC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZS5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9Ad29yZHByZXNzL2lzLXNoYWxsb3ctZXF1YWwvYXJyYXlzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL0B3b3JkcHJlc3MvaXMtc2hhbGxvdy1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9Ad29yZHByZXNzL2lzLXNoYWxsb3ctZXF1YWwvb2JqZWN0cy5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9qdy1yZWFjdC1wYWdpbmF0aW9uL2xpYi9Kd1BhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS8uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9ub2RlX21vZHVsZXMvcmVhY3QtaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vLi9ub2RlX21vZHVsZXMvd2FybmluZy93YXJuaW5nLmpzIiwid2VicGFjazovL2VlanMuW25hbWVdL2V4dGVybmFsIFwiZWVqcy5pMThuXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJlZWpzLnZhbGlkYXRvcnNcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcImVlanMudmFsdWVPYmplY3RzXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJ3cC5jb21wb25lbnRzXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJ3cC5jb21wb3NlXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJ3cC5kYXRhXCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJ3cC5lbGVtZW50XCIiLCJ3ZWJwYWNrOi8vZWVqcy5bbmFtZV0vZXh0ZXJuYWwgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly9lZWpzLltuYW1lXS9leHRlcm5hbCBcIlJlYWN0XCIiXSwibmFtZXMiOlsiY3VzdG9tSWQiLCJjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCIsImNvbXBvc2UiLCJ3aXRoSW5zdGFuY2VJZCIsIldyYXBwZWRDb21wb25lbnQiLCJwcm9wcyIsImxhYmVsIiwiaW5zdGFuY2VJZCIsImNsYXNzTmFtZSIsImhlbHAiLCJpZCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsInN0cmluZyIsIm9uZU9mVHlwZSIsIm51bWJlciIsImRlZmF1bHRQcm9wcyIsIkVudGl0eUxpc3RGaWx0ZXJCYXIiLCJzZWFyY2hUZXh0Iiwic2V0U2VhcmNoVGV4dCIsImlzRnVuY3Rpb24iLCJfXyIsInBlclBhZ2UiLCJzZXRQZXJQYWdlIiwidmFsdWUiLCJ2aWV3Iiwic2V0TGlzdFZpZXciLCJzZXRHcmlkVmlldyIsImVudGl0eUZpbHRlcnMiLCJzZWFyY2giLCJsaXN0VmlldyIsImdyaWRWaWV3Iiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJQYWdpbmF0ZWRFbnRpdHlMaXN0V2l0aEZpbHRlckJhciIsIkVudGl0eUxpc3QiLCJwYWdpbmF0aW9uQ29uZmlnIiwid2l0aEVudGl0eUxpc3RGaWx0ZXJCYXIiLCJ3aXRoRW50aXR5UGFnaW5hdGlvbiIsIlBhZ2luYXRlZEVudGl0eUxpc3RXaXRoRmlsdGVyQmFyQW5kU3RhdGUiLCJ3aXRoRW50aXR5TGlzdEZpbHRlclN0YXRlIiwiZW50aXRpZXMiLCJmaWx0ZXIiLCJlbnRpdHkiLCJlbnRpdHlOYW1lIiwibmFtZSIsInRvTG93ZXJDYXNlIiwib3RoZXJQcm9wcyIsInNlYXJjaEVudGl0aWVzIiwid2l0aFNlbGVjdCIsInNlbGVjdCIsIm93blByb3BzIiwic3RvcmUiLCJnZXRGaWx0ZXIiLCJwYXJzZUludCIsIndpdGhEaXNwYXRjaCIsImRpc3BhdGNoIiwic2V0RmlsdGVyIiwiYXJyYXlPZiIsInZhbGlkYXRlTmV4dFN0YXRlIiwibmV4dFN0YXRlUmVzcG9uc2UiLCJ3YXJuaW5nIiwiaGFzT3duUHJvcGVydHkiLCJpc0FycmF5IiwiY29udmVydGVkVmFsdWVzIiwid2l0aE1vbmV5IiwicHJvcE5hbWVNYXAiLCJFbmhhbmNlZENvbXBvbmVudCIsIm5leHRTdGF0ZSIsIk1vbmV5IiwiZm9yRWFjaCIsInByb3BOYW1lIiwiU2l0ZUN1cnJlbmN5IiwicHVzaCIsInRvTnVtYmVyIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwiaXNTaGFsbG93RXF1YWxBcnJheXMiLCJzZXRTdGF0ZSIsImdldE5leHRTdGF0ZSIsInNob3VsZFVwZGF0ZVN0YXRlV2l0aENvbnZlcnRlZFZhbHVlcyIsInN0YXRlIiwiZW50aXR5UGFnZSIsIm5leHRQcm9wcyIsImlzRXF1YWwiLCJlbnRpdGllc1BlclBhZ2UiLCJwb3NpdGlvbiIsImxhYmVscyIsImZpcnN0IiwibGFzdCIsInByZXZpb3VzIiwibmV4dCIsIm5vUmVzdWx0c1RleHQiLCJyZXR1cm5Bc1Byb3AiLCJwYWdpbmF0aW9uIiwib25QYWdpbmF0aW9uQ2hhbmdlIiwidG9wUGFnaW5hdGlvbiIsImJvdHRvbVBhZ2luYXRpb24iLCJhcnJheSIsIndpdGhMYXRlc3RDaGVja2luIiwicmVnaXN0cmF0aW9uIiwiZGF0ZXRpbWVJZCIsImlzTW9kZWxFbnRpdHlPZk1vZGVsIiwiZ2V0TGF0ZXN0Q2hlY2tpbiIsImhhc0ZpbmlzaGVkUmVzb2x1dGlvbiIsImNoZWNrSW5FbnRpdHkiLCJjaGVja2luRW50aXR5IiwiaGFzUmVzb2x2ZWRDaGVja2luIiwidG9nZ2xlQ2hlY2tpbiIsIm9uQ2xpY2siXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FB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SUFBSSxJQUFxQztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViw2QkFBNkI7QUFDN0IsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw0QkFBNEI7QUFDNUIsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFVBQVUsS0FBcUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxJQUFxQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNLEtBQXFDLDRGQUE0RixTQUFNO0FBQzdJO0FBQ0E7O0FBRUEsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZ0NBQWdDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksSUFBcUM7QUFDekMsZ0JBQWdCLG1CQUFPLENBQUMsMEVBQVU7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtQkFBTyxDQUFDLHVGQUEyQjtBQUN0RCxDQUFDLE1BQU0sRUFJTjs7Ozs7Ozs7Ozs7OztBQ2xCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOzs7O0FBSWIsSUFBSSxJQUFxQztBQUN6QztBQUNBOztBQUVBLDhDQUE4QyxjQUFjOztBQUU1RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esc0ZBQXNGLGFBQWE7QUFDbkc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEZBQTRGLGVBQWU7QUFDM0c7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQ2xPYTs7QUFFYixJQUFJLEtBQXFDLEVBQUUsRUFFMUM7QUFDRCxtQkFBbUIsbUJBQU8sQ0FBQyxrSEFBK0I7QUFDMUQ7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsYUFBb0I7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFdBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFdBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzdEQSwyQjs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSw0Qjs7Ozs7Ozs7Ozs7QUNBQSx5Qjs7Ozs7Ozs7Ozs7QUNBQSw0Qjs7Ozs7Ozs7Ozs7QUNBQSx3Qjs7Ozs7Ozs7Ozs7QUNBQSx1QiIsImZpbGUiOiJlZS1ob2NzLjcwM2UzMjY0MWM2MzhhMjI0YmY1LmRpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9zcmMvaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvaW5kZXguanNcIik7XG4iLCIvKipcbiAqIFdvcmRQcmVzcyBJbXBvcnRzXG4gKi9cbmltcG9ydCB7XG5cdGNvbXBvc2UsXG5cdGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50LFxuXHR3aXRoSW5zdGFuY2VJZCxcbn0gZnJvbSAnQHdvcmRwcmVzcy9jb21wb3NlJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBCYXNlQ29udHJvbCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9uZW50cyc7XG5cbi8qKlxuICogRXh0ZXJuYWwgSW1wb3J0c1xuICovXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCAoIGN1c3RvbUlkID0gJycgKSA9PiBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudChcblx0Y29tcG9zZSggW1xuXHRcdHdpdGhJbnN0YW5jZUlkLFxuXHRcdCggV3JhcHBlZENvbXBvbmVudCApID0+IHtcblx0XHRcdHJldHVybiBjbGFzcyBleHRlbmRzIENvbXBvbmVudCB7XG5cdFx0XHRcdHN0YXRpYyBwcm9wVHlwZXMgPSB7XG5cdFx0XHRcdFx0bGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0XHRcdFx0aW5zdGFuY2VJZDogUHJvcFR5cGVzLm9uZU9mVHlwZSggW1xuXHRcdFx0XHRcdFx0UHJvcFR5cGVzLm51bWJlcixcblx0XHRcdFx0XHRcdFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0XHRcdFx0XSApLFxuXHRcdFx0XHRcdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcdFx0XHRoZWxwOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG5cdFx0XHRcdFx0bGFiZWw6IFdyYXBwZWRDb21wb25lbnQuZGVmYXVsdFByb3BzICYmXG5cdFx0XHRcdFx0XHRXcmFwcGVkQ29tcG9uZW50LmRlZmF1bHRQcm9wcy5sYWJlbCA/XG5cdFx0XHRcdFx0XHRXcmFwcGVkQ29tcG9uZW50LmRlZmF1bHRQcm9wcy5sYWJlbCA6XG5cdFx0XHRcdFx0XHQnJyxcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRyZW5kZXIoKSB7XG5cdFx0XHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRcdFx0bGFiZWwsXG5cdFx0XHRcdFx0XHRpbnN0YW5jZUlkLFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lLFxuXHRcdFx0XHRcdFx0aGVscCxcblx0XHRcdFx0XHR9ID0gdGhpcy5wcm9wcztcblx0XHRcdFx0XHRjb25zdCBpZCA9IGBpbnNwZWN0b3ItJHsgY3VzdG9tSWQgfS1jb250cm9sLSR7IGluc3RhbmNlSWQgfWA7XG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdDxCYXNlQ29udHJvbFxuXHRcdFx0XHRcdFx0XHRsYWJlbD17IGxhYmVsIH1cblx0XHRcdFx0XHRcdFx0aWQ9eyBpZCB9XG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT17IGNsYXNzTmFtZSB9XG5cdFx0XHRcdFx0XHRcdGhlbHA9eyBoZWxwIH1cblx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0PFdyYXBwZWRDb21wb25lbnQgeyAuLi50aGlzLnByb3BzIH0gbGFiZWw9eyAnJyB9IGlkPXsgaWQgfSAvPlxuXHRcdFx0XHRcdFx0PC9CYXNlQ29udHJvbD5cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0sXG5cdF0gKSxcblx0J3dpdGhCYXNlQ29udHJvbCdcbik7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBJY29uQnV0dG9uLCBTZWxlY3RDb250cm9sLCBUZXh0Q29udHJvbCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuLyoqXG4gKiBFbnRpdHlMaXN0RmlsdGVyQmFyXG4gKiBhIGdyb3VwIG9mIGlucHV0cyBmb3IgY29udHJvbGxpbmcgaG93IGEgbGlzdCBvZiBlbnRpdGllcyBpcyBkaXNwbGF5ZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZW50aXR5RmlsdGVycyBhZGRpdGlvbmFsIGVudGl0eSBzcGVjaWZpYyBmaWx0ZXJzXG4gKiBAcGFyYW0ge251bWJlcn0gcGVyUGFnZVxuICogQHBhcmFtIHtzdHJpbmd9IHZpZXdcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNldFBlclBhZ2UgY2FsbGJhY2sgZm9yIHBlclBhZ2UgaW5wdXRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNldExpc3RWaWV3IGNhbGxiYWNrIGZvciBsaXN0IHZpZXcgaWNvbiBidXR0b25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNldEdyaWRWaWV3IGNhbGxiYWNrIGZvciBncmlkIHZpZXcgaWNvbiBidXR0b25cbiAqIEByZXR1cm4ge09iamVjdH0gRW50aXR5TGlzdEZpbHRlckJhclxuICovXG5jbGFzcyBFbnRpdHlMaXN0RmlsdGVyQmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIHByb3BUeXBlcyA9IHtcblx0XHRlbnRpdHlGaWx0ZXJzOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdHBlclBhZ2U6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHR2aWV3OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0c2V0UGVyUGFnZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0XHRzZXRMaXN0VmlldzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0XHRzZXRHcmlkVmlldzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0fTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRleHRcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gc2V0U2VhcmNoVGV4dFxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IHJlbmRlcmVkIHNlYXJjaCBpbnB1dFxuXHQgKi9cblx0c2VhcmNoID0gKCBzZWFyY2hUZXh0LCBzZXRTZWFyY2hUZXh0ICkgPT4ge1xuXHRcdHJldHVybiBpc0Z1bmN0aW9uKCBzZXRTZWFyY2hUZXh0ICkgPyAoXG5cdFx0XHQ8RnJhZ21lbnQ+XG5cdFx0XHRcdDxUZXh0Q29udHJvbFxuXHRcdFx0XHRcdGxhYmVsPXsgX18oICdzZWFyY2gnLCAnZXZlbnRfZXNwcmVzc28nICkgfVxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImVlLWVudGl0eS1saXN0LWZpbHRlci1iYXItc2VhcmNoXCJcblx0XHRcdFx0XHR2YWx1ZT17IHNlYXJjaFRleHQgfVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXsgc2V0U2VhcmNoVGV4dCB9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L0ZyYWdtZW50PlxuXHRcdCkgOiBudWxsO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGVyUGFnZVxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzZXRQZXJQYWdlXG5cdCAqIEByZXR1cm4ge09iamVjdH0gcmVuZGVyZWQgcGVyUGFnZSBzZWxlY3QgaW5wdXRcblx0ICovXG5cdHBlclBhZ2UgPSAoIHBlclBhZ2UsIHNldFBlclBhZ2UgKSA9PiAoXG5cdFx0PFNlbGVjdENvbnRyb2xcblx0XHRcdGxhYmVsPXsgX18oICdwZXIgcGFnZScsICdldmVudF9lc3ByZXNzbycgKSB9XG5cdFx0XHRjbGFzc05hbWU9XCJlZS1lbnRpdHktbGlzdC1maWx0ZXItYmFyLXBlclBhZ2Utc2VsZWN0XCJcblx0XHRcdHZhbHVlPXsgcGVyUGFnZSB9XG5cdFx0XHRvcHRpb25zPXsgW1xuXHRcdFx0XHR7IHZhbHVlOiAyLCBsYWJlbDogMiB9LFxuXHRcdFx0XHR7IHZhbHVlOiA2LCBsYWJlbDogNiB9LFxuXHRcdFx0XHR7IHZhbHVlOiAxMiwgbGFiZWw6IDEyIH0sXG5cdFx0XHRcdHsgdmFsdWU6IDI0LCBsYWJlbDogMjQgfSxcblx0XHRcdFx0eyB2YWx1ZTogNDgsIGxhYmVsOiA0OCB9LFxuXHRcdFx0XSB9XG5cdFx0XHRvbkNoYW5nZT17IHNldFBlclBhZ2UgfVxuXHRcdC8+XG5cdCk7XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB2aWV3XG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IHNldExpc3RWaWV3XG5cdCAqIEByZXR1cm4ge09iamVjdH0gcmVuZGVyZWQgbGlzdCB2aWV3IGljb24gYnV0dG9uXG5cdCAqL1xuXHRsaXN0VmlldyA9ICggdmlldywgc2V0TGlzdFZpZXcgKSA9PiAoXG5cdFx0PEljb25CdXR0b25cblx0XHRcdGNsYXNzTmFtZT17IHZpZXcgPT09ICdsaXN0JyA/ICdhY3RpdmUtbGlzdCcgOiAnJyB9XG5cdFx0XHRpY29uPVwiZWRpdG9yLWp1c3RpZnlcIlxuXHRcdFx0dG9vbHRpcD17IF9fKCAnbGlzdCB2aWV3JywgJ2V2ZW50X2VzcHJlc3NvJyApIH1cblx0XHRcdG9uQ2xpY2s9eyBzZXRMaXN0VmlldyB9XG5cdFx0Lz5cblx0KTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtzdHJpbmd9IHZpZXdcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gc2V0R3JpZFZpZXdcblx0ICogQHJldHVybiB7T2JqZWN0fSByZW5kZXJlZCBncmlkIHZpZXcgaWNvbiBidXR0b25cblx0ICovXG5cdGdyaWRWaWV3ID0gKCB2aWV3LCBzZXRHcmlkVmlldyApID0+IChcblx0XHQ8SWNvbkJ1dHRvblxuXHRcdFx0Y2xhc3NOYW1lPXsgdmlldyA9PT0gJ2dyaWQnID8gJ2FjdGl2ZS1saXN0JyA6ICcnIH1cblx0XHRcdGljb249XCJzY3JlZW5vcHRpb25zXCJcblx0XHRcdHRvb2x0aXA9eyBfXyggJ2dyaWQgdmlldycsICdldmVudF9lc3ByZXNzbycgKSB9XG5cdFx0XHRvbkNsaWNrPXsgc2V0R3JpZFZpZXcgfVxuXHRcdC8+XG5cdCk7XG5cblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdHNlYXJjaFRleHQgPSAnJyxcblx0XHRcdHNldFNlYXJjaFRleHQsXG5cdFx0XHRwZXJQYWdlLFxuXHRcdFx0dmlldyxcblx0XHRcdHNldFBlclBhZ2UsXG5cdFx0XHRzZXRMaXN0Vmlldyxcblx0XHRcdHNldEdyaWRWaWV3LFxuXHRcdH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IGVudGl0eUZpbHRlcnMgPSB0aGlzLnByb3BzLmVudGl0eUZpbHRlcnMgP1xuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlZS1lbnRpdHktbGlzdC1maWx0ZXItYmFyXCI+XG5cdFx0XHRcdHsgdGhpcy5wcm9wcy5lbnRpdHlGaWx0ZXJzIH1cblx0XHRcdDwvZGl2PiA6XG5cdFx0XHRudWxsO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVlLWVudGl0eS1saXN0LWZpbHRlci1iYXItd3JhcHBlclwiPlxuXHRcdFx0XHR7IGVudGl0eUZpbHRlcnMgfVxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVlLWVudGl0eS1saXN0LXZpZXctYmFyXCI+XG5cdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZWUtc2VhcmNoLWZpbHRlciBlZS1maWx0ZXItYmFyLWZpbHRlclwiPlxuXHRcdFx0XHRcdFx0eyB0aGlzLnNlYXJjaCggc2VhcmNoVGV4dCwgc2V0U2VhcmNoVGV4dCApIH1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJlZS1wZXItcGFnZS1maWx0ZXIgZWUtZmlsdGVyLWJhci1maWx0ZXJcIj5cblx0XHRcdFx0XHRcdHsgdGhpcy5wZXJQYWdlKCBwZXJQYWdlLCBzZXRQZXJQYWdlICkgfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImVlLXZpZXctZmlsdGVyIGVlLWZpbHRlci1iYXItZmlsdGVyXCI+XG5cdFx0XHRcdFx0XHR7IHRoaXMubGlzdFZpZXcoIHZpZXcsIHNldExpc3RWaWV3ICkgfVxuXHRcdFx0XHRcdFx0eyB0aGlzLmdyaWRWaWV3KCB2aWV3LCBzZXRHcmlkVmlldyApIH1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVudGl0eUxpc3RGaWx0ZXJCYXI7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IHsgZGVmYXVsdCBhcyB3aXRoRW50aXR5UGFnaW5hdGlvbiB9IGZyb20gJy4uL3BhZ2luYXRpb24nO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQge1xuXHRkZWZhdWx0IGFzIHdpdGhFbnRpdHlMaXN0RmlsdGVyQmFyLFxufSBmcm9tICcuL3dpdGgtZW50aXR5LWxpc3QtZmlsdGVyLWJhcic7XG5pbXBvcnQge1xuXHRkZWZhdWx0IGFzIHdpdGhFbnRpdHlMaXN0RmlsdGVyU3RhdGUsXG59IGZyb20gJy4vd2l0aC1lbnRpdHktbGlzdC1maWx0ZXItc3RhdGUnO1xuXG5leHBvcnQgY29uc3QgUGFnaW5hdGVkRW50aXR5TGlzdFdpdGhGaWx0ZXJCYXIgPSAoXG5cdEVudGl0eUxpc3QsXG5cdHBhZ2luYXRpb25Db25maWcgPSB7fSxcbikgPT4gd2l0aEVudGl0eUxpc3RGaWx0ZXJCYXIoXG5cdHdpdGhFbnRpdHlQYWdpbmF0aW9uKCBwYWdpbmF0aW9uQ29uZmlnICkoIEVudGl0eUxpc3QgKVxuKTtcblxuZXhwb3J0IGNvbnN0IFBhZ2luYXRlZEVudGl0eUxpc3RXaXRoRmlsdGVyQmFyQW5kU3RhdGUgPSAoXG5cdEVudGl0eUxpc3QsXG5cdHBhZ2luYXRpb25Db25maWcgPSB7fSxcbikgPT4gd2l0aEVudGl0eUxpc3RGaWx0ZXJTdGF0ZSggd2l0aEVudGl0eUxpc3RGaWx0ZXJCYXIoXG5cdHdpdGhFbnRpdHlQYWdpbmF0aW9uKCBwYWdpbmF0aW9uQ29uZmlnICkoIEVudGl0eUxpc3QgKVxuKSApO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIEVudGl0eUxpc3RGaWx0ZXJCYXIgfSBmcm9tICcuL2VudGl0eS1saXN0LWZpbHRlci1iYXInO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcImVlLWVudGl0eS1saXN0LWZpbHRlci1iYXItd3JhcHBlclwiOlwiZWUtZW50aXR5LWxpc3QtZmlsdGVyLWJhci13cmFwcGVyXCIsXCJlZS1lbnRpdHktbGlzdC1maWx0ZXItYmFyXCI6XCJlZS1lbnRpdHktbGlzdC1maWx0ZXItYmFyXCIsXCJlZS1lbnRpdHktbGlzdC12aWV3LWJhclwiOlwiZWUtZW50aXR5LWxpc3Qtdmlldy1iYXJcIixcImVlLWVudGl0eS1saXN0LWZpbHRlci1iYXItcGVyUGFnZS1zZWxlY3RcIjpcImVlLWVudGl0eS1saXN0LWZpbHRlci1iYXItcGVyUGFnZS1zZWxlY3RcIixcImVlLWZpbHRlci1iYXItZmlsdGVyXCI6XCJlZS1maWx0ZXItYmFyLWZpbHRlclwiLFwiZWUtc2VhcmNoLWZpbHRlclwiOlwiZWUtc2VhcmNoLWZpbHRlclwiLFwiZWUtcGVyLXBhZ2UtZmlsdGVyXCI6XCJlZS1wZXItcGFnZS1maWx0ZXJcIixcImVlLWdyaWQtdmlldy1maWx0ZXJcIjpcImVlLWdyaWQtdmlldy1maWx0ZXJcIixcImVlLWxpc3Qtdmlldy1maWx0ZXJcIjpcImVlLWxpc3Qtdmlldy1maWx0ZXJcIixcImNvbXBvbmVudHMtaWNvbi1idXR0b25cIjpcImNvbXBvbmVudHMtaWNvbi1idXR0b25cIixcImFjdGl2ZS1saXN0XCI6XCJhY3RpdmUtbGlzdFwiLFwiY29tcG9uZW50cy1iYXNlLWNvbnRyb2xfX2xhYmVsXCI6XCJjb21wb25lbnRzLWJhc2UtY29udHJvbF9fbGFiZWxcIixcImNvbXBvbmVudHMtdGV4dC1jb250cm9sX19pbnB1dFwiOlwiY29tcG9uZW50cy10ZXh0LWNvbnRyb2xfX2lucHV0XCIsXCJjb21wb25lbnRzLXNlbGVjdC1jb250cm9sX19pbnB1dFwiOlwiY29tcG9uZW50cy1zZWxlY3QtY29udHJvbF9faW5wdXRcIn07IiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9zZSc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBkZWZhdWx0IGFzIEVudGl0eUxpc3RGaWx0ZXJCYXIgfSBmcm9tICcuL2VudGl0eS1saXN0LWZpbHRlci1iYXInO1xuXG4vKipcbiAqIHdpdGhFbnRpdHlMaXN0RmlsdGVyQmFyXG4gKiBIaWdoZXItT3JkZXItQ29tcG9uZW50IHRoYXQgd3JhcHMgYW4gRW50aXR5TGlzdCBjb21wb25lbnRcbiAqIGZvciBjaGFuZ2luZyBob3cgdGhlIEVudGl0eUxpc3QgaXMgdmlld2VkXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBFbnRpdHlMaXN0IHdpdGggYWRkZWQgRW50aXR5TGlzdEZpbHRlckJhclxuICovXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudChcblx0KCBFbnRpdHlMaXN0ICkgPT4ge1xuXHRcdHJldHVybiBjbGFzcyBleHRlbmRzIENvbXBvbmVudCB7XG5cdFx0XHRzZWFyY2hFbnRpdGllcyA9ICggc2VhcmNoVGV4dCwgZW50aXRpZXMgKSA9PiB7XG5cdFx0XHRcdHJldHVybiBzZWFyY2hUZXh0ICE9PSAnJyA/XG5cdFx0XHRcdFx0ZW50aXRpZXMuZmlsdGVyKCAoIGVudGl0eSApID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IGVudGl0eU5hbWUgPSBlbnRpdHkubmFtZSA/IGVudGl0eS5uYW1lIDogJyc7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZW50aXR5TmFtZS50b0xvd2VyQ2FzZSgpLnNlYXJjaChcblx0XHRcdFx0XHRcdFx0c2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpICkgIT09IC0xO1xuXHRcdFx0XHRcdH0gKSA6XG5cdFx0XHRcdFx0ZW50aXRpZXM7XG5cdFx0XHR9O1xuXG5cdFx0XHRyZW5kZXIoKSB7XG5cdFx0XHRcdGxldCB7IGVudGl0aWVzIH0gPSB0aGlzLnByb3BzO1xuXHRcdFx0XHRjb25zdCB7XG5cdFx0XHRcdFx0c2VhcmNoVGV4dCxcblx0XHRcdFx0XHRzZXRTZWFyY2hUZXh0LFxuXHRcdFx0XHRcdHBlclBhZ2UsXG5cdFx0XHRcdFx0dmlldyxcblx0XHRcdFx0XHRzZXRQZXJQYWdlLFxuXHRcdFx0XHRcdHNldExpc3RWaWV3LFxuXHRcdFx0XHRcdHNldEdyaWRWaWV3LFxuXHRcdFx0XHRcdC4uLm90aGVyUHJvcHNcblx0XHRcdFx0fSA9IHRoaXMucHJvcHM7XG5cdFx0XHRcdGVudGl0aWVzID0gaXNGdW5jdGlvbiggc2V0U2VhcmNoVGV4dCApID9cblx0XHRcdFx0XHR0aGlzLnNlYXJjaEVudGl0aWVzKCBzZWFyY2hUZXh0LCBlbnRpdGllcyApIDpcblx0XHRcdFx0XHRlbnRpdGllcztcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8RnJhZ21lbnQ+XG5cdFx0XHRcdFx0XHQ8RW50aXR5TGlzdEZpbHRlckJhclxuXHRcdFx0XHRcdFx0XHRzZWFyY2hUZXh0PXsgc2VhcmNoVGV4dCB9XG5cdFx0XHRcdFx0XHRcdHNldFNlYXJjaFRleHQ9eyBzZXRTZWFyY2hUZXh0IH1cblx0XHRcdFx0XHRcdFx0cGVyUGFnZT17IHBlclBhZ2UgfVxuXHRcdFx0XHRcdFx0XHR2aWV3PXsgdmlldyB9XG5cdFx0XHRcdFx0XHRcdHNldFBlclBhZ2U9eyBzZXRQZXJQYWdlIH1cblx0XHRcdFx0XHRcdFx0c2V0TGlzdFZpZXc9eyBzZXRMaXN0VmlldyB9XG5cdFx0XHRcdFx0XHRcdHNldEdyaWRWaWV3PXsgc2V0R3JpZFZpZXcgfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDxFbnRpdHlMaXN0XG5cdFx0XHRcdFx0XHRcdGVudGl0aWVzPXsgZW50aXRpZXMgfVxuXHRcdFx0XHRcdFx0XHRlbnRpdGllc1BlclBhZ2U9eyBwZXJQYWdlIH1cblx0XHRcdFx0XHRcdFx0dmlldz17IHZpZXcgfVxuXHRcdFx0XHRcdFx0XHRub1Jlc3VsdHNUZXh0PXtcblx0XHRcdFx0XHRcdFx0XHRfXyhcblx0XHRcdFx0XHRcdFx0XHRcdCdubyByZXN1bHRzIGZvdW5kICh0cnkgY2hhbmdpbmcgZmlsdGVycyknLFxuXHRcdFx0XHRcdFx0XHRcdFx0J2V2ZW50X2VzcHJlc3NvJ1xuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR7IC4uLm90aGVyUHJvcHMgfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L0ZyYWdtZW50PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0sXG5cdCd3aXRoRW50aXR5TGlzdEZpbHRlckJhcidcbik7XG4iLCIvKipcbiAqIEV4dGVybmFsIGltcG9ydHNcbiAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCwgY29tcG9zZSB9IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9zZSc7XG5pbXBvcnQgeyB3aXRoU2VsZWN0LCB3aXRoRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuXG4vKipcbiAqIHdpdGhFbnRpdHlMaXN0RmlsdGVyU3RhdGVcbiAqIEhpZ2hlci1PcmRlci1Db21wb25lbnQgdGhhdCB3cmFwcyBhbiBcIkVudGl0eUxpc3RGaWx0ZXJCYXJcIiBjb21wb25lbnRcbiAqIGluIG9yZGVyIHRvIHByb3ZpZGUgc3RhdGUgbWFuYWdlbWVudCBmb3IgaXQgYW5kIGl0cyBjaGlsZHJlblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBXcmFwcGVkQ29tcG9uZW50XG4gKiBAcmV0dXJuIHtPYmplY3R9IFdyYXBwZWRDb21wb25lbnQgd2l0aCBhZGRlZCBFbnRpdHlMaXN0RmlsdGVyU3RhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQoXG5cdGNvbXBvc2UoIFtcblx0XHR3aXRoU2VsZWN0KCAoIHNlbGVjdCwgb3duUHJvcHMgKSA9PiB7XG5cdFx0XHRjb25zdCB7XG5cdFx0XHRcdHNlYXJjaFRleHQgPSAnJyxcblx0XHRcdFx0cGVyUGFnZSA9IDYsXG5cdFx0XHRcdHZpZXcgPSAnZ3JpZCcsXG5cdFx0XHR9ID0gb3duUHJvcHM7XG5cdFx0XHRjb25zdCBzdG9yZSA9IHNlbGVjdCggJ2V2ZW50ZXNwcmVzc28vZmlsdGVyLXN0YXRlJyApO1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c2VhcmNoVGV4dDogc3RvcmUuZ2V0RmlsdGVyKFxuXHRcdFx0XHRcdCdlbnRpdHktbGlzdCcsXG5cdFx0XHRcdFx0J3NlYXJjaFRleHQnLFxuXHRcdFx0XHRcdHNlYXJjaFRleHRcblx0XHRcdFx0KSxcblx0XHRcdFx0cGVyUGFnZTogcGFyc2VJbnQoXG5cdFx0XHRcdFx0c3RvcmUuZ2V0RmlsdGVyKFxuXHRcdFx0XHRcdFx0J2VudGl0eS1saXN0Jyxcblx0XHRcdFx0XHRcdCdwZXJQYWdlJyxcblx0XHRcdFx0XHRcdHBlclBhZ2Vcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCksXG5cdFx0XHRcdHZpZXc6IHN0b3JlLmdldEZpbHRlcihcblx0XHRcdFx0XHQnZW50aXR5LWxpc3QnLFxuXHRcdFx0XHRcdCd2aWV3Jyxcblx0XHRcdFx0XHR2aWV3XG5cdFx0XHRcdCksXG5cdFx0XHR9O1xuXHRcdH0gKSxcblx0XHR3aXRoRGlzcGF0Y2goICggZGlzcGF0Y2ggKSA9PiB7XG5cdFx0XHRjb25zdCBzdG9yZSA9IGRpc3BhdGNoKCAnZXZlbnRlc3ByZXNzby9maWx0ZXItc3RhdGUnICk7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRzZXRTZWFyY2hUZXh0OiAoIHNlYXJjaFRleHQgKSA9PiBzdG9yZS5zZXRGaWx0ZXIoXG5cdFx0XHRcdFx0J2VudGl0eS1saXN0Jyxcblx0XHRcdFx0XHQnc2VhcmNoVGV4dCcsXG5cdFx0XHRcdFx0c2VhcmNoVGV4dFxuXHRcdFx0XHQpLFxuXHRcdFx0XHRzZXRQZXJQYWdlOiAoIHBlclBhZ2UgKSA9PiBzdG9yZS5zZXRGaWx0ZXIoXG5cdFx0XHRcdFx0J2VudGl0eS1saXN0Jyxcblx0XHRcdFx0XHQncGVyUGFnZScsXG5cdFx0XHRcdFx0cGFyc2VJbnQoIHBlclBhZ2UgKVxuXHRcdFx0XHQpLFxuXHRcdFx0XHRzZXRMaXN0VmlldzogKCkgPT4gc3RvcmUuc2V0RmlsdGVyKFxuXHRcdFx0XHRcdCdlbnRpdHktbGlzdCcsXG5cdFx0XHRcdFx0J3ZpZXcnLFxuXHRcdFx0XHRcdCdsaXN0J1xuXHRcdFx0XHQpLFxuXHRcdFx0XHRzZXRHcmlkVmlldzogKCkgPT4gc3RvcmUuc2V0RmlsdGVyKFxuXHRcdFx0XHRcdCdlbnRpdHktbGlzdCcsXG5cdFx0XHRcdFx0J3ZpZXcnLFxuXHRcdFx0XHRcdCdncmlkJ1xuXHRcdFx0XHQpLFxuXHRcdFx0fTtcblx0XHR9ICksXG5cdFx0KCBXcmFwcGVkQ29tcG9uZW50ICkgPT4ge1xuXHRcdFx0cmV0dXJuIGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0XHRcdFx0c3RhdGljIHByb3BUeXBlcyA9IHtcblx0XHRcdFx0XHRlbnRpdGllczogUHJvcFR5cGVzLmFycmF5T2YoIFByb3BUeXBlcy5vYmplY3QgKS5pc1JlcXVpcmVkLFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZW5kZXIoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIDxXcmFwcGVkQ29tcG9uZW50IHsgLi4udGhpcy5wcm9wcyB9IC8+O1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0sXG5cdF0gKSxcblx0J3dpdGhFbnRpdHlMaXN0RmlsdGVyU3RhdGUnXG4pO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyB3aXRoQmFzZUNvbnRyb2wgfSBmcm9tICcuL2Jhc2UtY29udHJvbCc7XG5leHBvcnQge1xuXHRQYWdpbmF0ZWRFbnRpdHlMaXN0V2l0aEZpbHRlckJhcixcblx0UGFnaW5hdGVkRW50aXR5TGlzdFdpdGhGaWx0ZXJCYXJBbmRTdGF0ZSxcblx0RW50aXR5TGlzdEZpbHRlckJhcixcbn0gZnJvbSAnLi9maWx0ZXItYmFyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgd2l0aEVudGl0eVBhZ2luYXRpb24gfSBmcm9tICcuL3BhZ2luYXRpb24nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB3aXRoTGF0ZXN0Q2hlY2tpbiB9IGZyb20gJy4vd2l0aC1sYXRlc3QtY2hlY2tpbic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHdpdGhNb25leSB9IGZyb20gJy4vbW9uZXknO1xuIiwiLyoqXG4gKiBFeHRlcm5hbCBpbXBvcnRzXG4gKi9cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uLCBpc0FycmF5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBpc1NoYWxsb3dFcXVhbEFycmF5cyBmcm9tICdAd29yZHByZXNzL2lzLXNoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XG5pbXBvcnQgeyBNb25leSwgU2l0ZUN1cnJlbmN5IH0gZnJvbSAnQGV2ZW50ZXNwcmVzc28vdmFsdWUtb2JqZWN0cyc7XG5cbi8qKlxuICogVGhpcyB2YWxpZGF0ZXMgd2hldGhlciB0aGUgbmV4dFN0YXRlUmVzcG9uc2UgaXMgaW4gdGhlIGV4cGVjdGVkIHNoYXBlLlxuICogSWYgYW55IG9mIHRoZSB2YWxpZGF0aW9uIGZhaWxzLCB0aGVuIGEgY29uc29sZS5lcnJvciBpcyB0cmlnZ2VyZWQgKHZpYVxuICogd2FybmluZylcbiAqXG4gKiBAcGFyYW0ge3t9fSBuZXh0U3RhdGVSZXNwb25zZVxuICovXG5jb25zdCB2YWxpZGF0ZU5leHRTdGF0ZSA9ICggbmV4dFN0YXRlUmVzcG9uc2UgKSA9PiB7XG5cdHdhcm5pbmcoXG5cdFx0bmV4dFN0YXRlUmVzcG9uc2UgJiZcblx0XHRuZXh0U3RhdGVSZXNwb25zZS5oYXNPd25Qcm9wZXJ0eSggJ2NvbnZlcnRlZFZhbHVlcycgKSxcblx0XHQnVGhlIHByb3BOYW1lTWFwIGNhbGxiYWNrIGZvciB0aGUgd2l0aE1vbmV5IEhPQyBzaG91bGQgcmV0dXJuIGFuJyArXG5cdFx0JyBvYmplY3Qgd2l0aCBhIFwiY29udmVydGVkVmFsdWVzXCIga2V5Lidcblx0KTtcblx0aWYgKCBuZXh0U3RhdGVSZXNwb25zZSAmJlxuXHRcdG5leHRTdGF0ZVJlc3BvbnNlLmhhc093blByb3BlcnR5KCAnY29udmVydGVkVmFsdWVzJyApICkge1xuXHRcdHdhcm5pbmcoXG5cdFx0XHRpc0FycmF5KCBuZXh0U3RhdGVSZXNwb25zZS5jb252ZXJ0ZWRWYWx1ZXMgKSxcblx0XHRcdCdUaGUgcHJvcE5hbWVNYXAgY2FsbGJhY2sgZm9yIHRoZSB3aXRoTW9uZXkgSE9DIHNob3VsZCByZXR1cm4gYW4gJyArXG5cdFx0XHQnb2JqZWN0IHdpdGggYSBcImNvbnZlcnRlZFZhbHVlc1wiIGtleSB0aGF0IGhhcyBhbiBhcnJheScgK1xuXHRcdFx0JyBvZiBudW1iZXJzIGFzIHRoZSB2YWx1ZS4nXG5cdFx0KTtcblx0fVxuXHR3YXJuaW5nKFxuXHRcdG5leHRTdGF0ZVJlc3BvbnNlICYmIG5leHRTdGF0ZVJlc3BvbnNlLmhhc093blByb3BlcnR5KCAncHJvcHMnICksXG5cdFx0J1RoZSBwcm9wTmFtZU1hcCBjYWxsYmFjayBmb3IgdGhlIHdpdGhNb25leUhPQyBzaG91bGQgcmV0dXJuIGFuJyArXG5cdFx0JyBvYmplY3Qgd2l0aCBhIFwicHJvcHNcIiBrZXkuJ1xuXHQpO1xufTtcblxuLyoqXG4gKiBBIGhpZ2hlciBvcmRlciBjb21wb25lbnQgdGhhdCBjb252ZXJ0cyBhbnkgcHJvcHMgbWF0Y2hpbmcgdGhlIG1hcCBwcm92aWRlZFxuICogYXMgYW4gYXJndW1lbnQgdG8gTW9uZXkgdmFsdWUgb2JqZWN0cyBhbmQgcGFzc2VzIHRoZW0gdG8gdGhlIFdyYXBwZWRDb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge0FycmF5fGZ1bmN0aW9ufSBwcm9wTmFtZU1hcFxuICogQHJldHVybiB7ZnVuY3Rpb24oKik6IEVuaGFuY2VkQ29tcG9uZW50fSAgUmV0dXJucyBhbiBlbmhhbmNlZCBjb21wb25lbnQgd2hlcmVcbiAqIHByb3BzIHRoYXQgcmVwcmVzZW50IG1vbmV5IHZhbHVlcyBoYXZlIGJlZW4gY29udmVydGVkIHRvIGEgTW9uZXkgdmFsdWUgb2JqZWN0XG4gKi9cbmNvbnN0IHdpdGhNb25leSA9ICggcHJvcE5hbWVNYXAgPSBbXSApID0+ICggV3JhcHBlZENvbXBvbmVudCApID0+IHtcblx0Y2xhc3MgRW5oYW5jZWRDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRcdHN0YXRlID0ge1xuXHRcdFx0Y29udmVydGVkVmFsdWVzOiBbXSxcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVGhpcyBwcm92aWRlcyB0aGUgbmV4dCBzdGF0ZSBvbiBhbnkgcHJvcCBjaGFuZ2UuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3t9fSBwcm9wc1xuXHRcdCAqIEByZXR1cm4ge3t9fSBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXh0U3RhdGUgZm9yIHRoZSBjb21wb25lbnQuXG5cdFx0ICovXG5cdFx0Z2V0TmV4dFN0YXRlID0gKCBwcm9wcyApID0+IHtcblx0XHRcdGxldCBuZXh0U3RhdGVSZXNwb25zZSxcblx0XHRcdFx0bmV4dFN0YXRlID0ge30sXG5cdFx0XHRcdGNvbnZlcnRlZFZhbHVlcyA9IFtdO1xuXHRcdFx0aWYgKCBpc0Z1bmN0aW9uKCBwcm9wTmFtZU1hcCApICkge1xuXHRcdFx0XHRuZXh0U3RhdGVSZXNwb25zZSA9IHByb3BOYW1lTWFwKCBwcm9wcywgTW9uZXkgKTtcblx0XHRcdFx0dmFsaWRhdGVOZXh0U3RhdGUoIG5leHRTdGF0ZVJlc3BvbnNlICk7XG5cdFx0XHRcdGlmICggbmV4dFN0YXRlUmVzcG9uc2UgJiYgbmV4dFN0YXRlUmVzcG9uc2UucHJvcHMgKSB7XG5cdFx0XHRcdFx0bmV4dFN0YXRlID0geyAuLi5uZXh0U3RhdGVSZXNwb25zZS5wcm9wcyB9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnZlcnRlZFZhbHVlcyA9IG5leHRTdGF0ZVJlc3BvbnNlLmNvbnZlcnRlZFZhbHVlcyB8fFxuXHRcdFx0XHRcdGNvbnZlcnRlZFZhbHVlcztcblx0XHRcdH0gZWxzZSBpZiAoIGlzQXJyYXkoIHByb3BOYW1lTWFwICkgKSB7XG5cdFx0XHRcdHByb3BOYW1lTWFwLmZvckVhY2goICggcHJvcE5hbWUgKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCBwcm9wc1sgcHJvcE5hbWUgXSApIHtcblx0XHRcdFx0XHRcdG5leHRTdGF0ZVsgcHJvcE5hbWUgXSA9XG5cdFx0XHRcdFx0XHRcdG5ldyBNb25leShcblx0XHRcdFx0XHRcdFx0XHRwcm9wc1sgcHJvcE5hbWUgXSxcblx0XHRcdFx0XHRcdFx0XHRTaXRlQ3VycmVuY3lcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdGNvbnZlcnRlZFZhbHVlcy5wdXNoKFxuXHRcdFx0XHRcdFx0XHRuZXh0U3RhdGVbIHByb3BOYW1lIF0udG9OdW1iZXIoKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdhcm5pbmcoXG5cdFx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdFx0J1RoZSBwcm9wTmFtZU1hcCBhcmd1bWVudCBwcm92aWRlZCB0byB3aXRoTW9uZXkgbXVzdCBiZSBlaXRoZXIgYScgK1xuXHRcdFx0XHRcdCcgZnVuY3Rpb24gb3IgYW4gYXJyYXknXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRuZXh0U3RhdGUuY29udmVydGVkVmFsdWVzID0gY29udmVydGVkVmFsdWVzO1xuXHRcdFx0cmV0dXJuIG5leHRTdGF0ZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2FsY3VsYXRlcyB3aGV0aGVyIHRoZSBzdGF0ZSBzaG91bGQgYmUgdXBkYXRlZCB1c2luZyB0aGUgcHJvdmlkZWRcblx0XHQgKiBhcmd1bWVudHMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3t9fSBwcmV2UHJvcHNcblx0XHQgKiBAcGFyYW0ge3t9fSBwcmV2U3RhdGVcblx0XHQgKiBAcGFyYW0ge3t9fSBuZXh0U3RhdGVcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufSAgSWYgYSBzaGFsbG93IGNvbXBhcmUgb2YgcHJldlN0YXRlLmNvbnZlcnRlZFZhbHVlc1xuXHRcdCAqIGFuZCBuZXh0U3RhdGUuY29udmVydGVkVmFsdWVzIGlzIGZhbHNlLCB0aGVuIHRoaXMgcmV0dXJucyB0cnVlIHRvXG5cdFx0ICogc2lnbmFsIHN0YXRlIHNob3VsZCBiZSB1cGRhdGVkLlxuXHRcdCAqL1xuXHRcdHNob3VsZFVwZGF0ZVN0YXRlV2l0aENvbnZlcnRlZFZhbHVlcyA9IChcblx0XHRcdHByZXZQcm9wcyxcblx0XHRcdHByZXZTdGF0ZSxcblx0XHRcdG5leHRTdGF0ZVxuXHRcdCkgPT4ge1xuXHRcdFx0cmV0dXJuICEgaXNTaGFsbG93RXF1YWxBcnJheXMoXG5cdFx0XHRcdG5leHRTdGF0ZS5jb252ZXJ0ZWRWYWx1ZXMsXG5cdFx0XHRcdHByZXZTdGF0ZS5jb252ZXJ0ZWRWYWx1ZXNcblx0XHRcdCkgJiZcblx0XHRcdFx0bmV4dFN0YXRlLmNvbnZlcnRlZFZhbHVlc1sgMCBdICE9PVxuXHRcdFx0XHRwcmV2U3RhdGUuY29udmVydGVkVmFsdWVzWyAwIF07XG5cdFx0fTtcblxuXHRcdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSggdGhpcy5nZXROZXh0U3RhdGUoIHRoaXMucHJvcHMgKSApO1xuXHRcdH1cblxuXHRcdGNvbXBvbmVudERpZFVwZGF0ZSggcHJldlByb3BzLCBwcmV2U3RhdGUgKSB7XG5cdFx0XHRjb25zdCBuZXh0U3RhdGUgPSB0aGlzLmdldE5leHRTdGF0ZSggdGhpcy5wcm9wcyApO1xuXHRcdFx0aWYgKCB0aGlzLnNob3VsZFVwZGF0ZVN0YXRlV2l0aENvbnZlcnRlZFZhbHVlcyhcblx0XHRcdFx0cHJldlByb3BzLFxuXHRcdFx0XHRwcmV2U3RhdGUsXG5cdFx0XHRcdG5leHRTdGF0ZVxuXHRcdFx0KSApIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSggbmV4dFN0YXRlICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmVuZGVyKCkge1xuXHRcdFx0cmV0dXJuIDxXcmFwcGVkQ29tcG9uZW50IHsgLi4udGhpcy5wcm9wcyB9IHsgLi4udGhpcy5zdGF0ZSB9IC8+O1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBFbmhhbmNlZENvbXBvbmVudDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhNb25leTtcbiIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSndQYWdpbmF0aW9uIGZyb20gJ2p3LXJlYWN0LXBhZ2luYXRpb24nO1xuaW1wb3J0IHtcblx0Y29tcG9zZSxcblx0Y3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQsXG5cdHdpdGhJbnN0YW5jZUlkLFxufSBmcm9tICdAd29yZHByZXNzL2NvbXBvc2UnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0BldmVudGVzcHJlc3NvL2kxOG4nO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuLyoqXG4gKiB3aXRoRW50aXR5UGFnaW5hdGlvblxuICogSGlnaGVyLU9yZGVyLUNvbXBvbmVudCB0aGF0IHdyYXBzIGFuIFwiRW50aXR5TGlzdFwiIGNvbXBvbmVudFxuICogd2l0aCBhbiBFbnRpdHlQYWdpbmF0aW9uIGNvbXBvbmVudCB0aGF0IGFkZHMgYSBwYWdpbmF0aW9uIGNvbnRhaW5lclxuICogYmVsb3cgdGhlIEVudGl0eUxpc3QgYW5kIGNvbnRyb2xzIHdoYXQgZW50aXRpZXMgYXJlIGRpc3BsYXllZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWdpbmF0aW9uQ29uZmlnXG4gKiBAcmV0dXJuIHtPYmplY3R9IEVudGl0eUxpc3Qgd2l0aCBhZGRlZCBFbnRpdHlQYWdpbmF0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0ICggcGFnaW5hdGlvbkNvbmZpZyA9IHt9ICkgPT4gY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQoXG5cdGNvbXBvc2UoIFtcblx0XHR3aXRoSW5zdGFuY2VJZCxcblx0XHQoIEVudGl0eUxpc3QgKSA9PiB7XG5cdFx0XHRyZXR1cm4gY2xhc3MgRW50aXR5UGFnaW5hdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cdFx0XHRcdHN0YXRpYyBwcm9wVHlwZXMgPSB7XG5cdFx0XHRcdFx0ZW50aXRpZXM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuXHRcdFx0XHRcdGluc3RhbmNlSWQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRcdFx0XHRlbnRpdGllc1BlclBhZ2U6IFByb3BUeXBlcy5vbmVPZlR5cGUoIFtcblx0XHRcdFx0XHRcdFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0XHRcdFx0XHRQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0XHRcdF0gKSxcblx0XHRcdFx0XHRwb3NpdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG5cdFx0XHRcdFx0c3VwZXIoIHByb3BzICk7XG5cdFx0XHRcdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdFx0XHRcdGVudGl0eVBhZ2U6IFtdLFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcywgbmV4dFN0YXRlICkge1xuXHRcdFx0XHRcdHJldHVybiAhIChcblx0XHRcdFx0XHRcdGlzRXF1YWwoIG5leHRQcm9wcywgdGhpcy5wcm9wcyApICYmXG5cdFx0XHRcdFx0XHRpc0VxdWFsKCBuZXh0U3RhdGUuZW50aXR5UGFnZSwgdGhpcy5zdGF0ZS5lbnRpdHlQYWdlIClcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIEBmdW5jdGlvblxuXHRcdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBlbnRpdHlQYWdlXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRvblBhZ2luYXRpb25DaGFuZ2UgPSAoIGVudGl0eVBhZ2UgKSA9PiB7XG5cdFx0XHRcdFx0Ly8gdXBkYXRlIGxvY2FsIHN0YXRlIHdpdGggbmV3IHBhZ2Ugb2YgaXRlbXNcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKCB7IGVudGl0eVBhZ2UgfSApO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHJlbmRlcigpIHtcblx0XHRcdFx0XHRjb25zdCB7XG5cdFx0XHRcdFx0XHRlbnRpdGllcyxcblx0XHRcdFx0XHRcdGluc3RhbmNlSWQsXG5cdFx0XHRcdFx0XHRlbnRpdGllc1BlclBhZ2UgPSAxMCxcblx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ3RvcCcsXG5cdFx0XHRcdFx0XHQuLi5vdGhlclByb3BzXG5cdFx0XHRcdFx0fSA9IHRoaXMucHJvcHM7XG5cdFx0XHRcdFx0cGFnaW5hdGlvbkNvbmZpZy5sYWJlbHMgPSBwYWdpbmF0aW9uQ29uZmlnLmxhYmVscyAmJlxuXHRcdFx0XHRcdFx0cGFnaW5hdGlvbkNvbmZpZy5sYWJlbHMuZmlyc3QgJiZcblx0XHRcdFx0XHRcdHBhZ2luYXRpb25Db25maWcubGFiZWxzLmxhc3QgJiZcblx0XHRcdFx0XHRcdHBhZ2luYXRpb25Db25maWcubGFiZWxzLnByZXZpb3VzICYmXG5cdFx0XHRcdFx0XHRwYWdpbmF0aW9uQ29uZmlnLmxhYmVscy5uZXh0ID9cblx0XHRcdFx0XHRcdHBhZ2luYXRpb25Db25maWcubGFiZWxzIDpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Zmlyc3Q6IF9fKCAnRmlyc3QnLCAnZXZlbnRfZXNwcmVzc28nICksXG5cdFx0XHRcdFx0XHRcdGxhc3Q6IF9fKCAnTGFzdCcsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRcdFx0XHRcdFx0cHJldmlvdXM6IF9fKCAnUHJldicsICdldmVudF9lc3ByZXNzbycgKSxcblx0XHRcdFx0XHRcdFx0bmV4dDogX18oICdOZXh0JywgJ2V2ZW50X2VzcHJlc3NvJyApLFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRjb25zdCBub1Jlc3VsdHNUZXh0ID0gcGFnaW5hdGlvbkNvbmZpZy5ub1Jlc3VsdHNUZXh0ID9cblx0XHRcdFx0XHRcdHBhZ2luYXRpb25Db25maWcubm9SZXN1bHRzVGV4dCA6XG5cdFx0XHRcdFx0XHRfXyhcblx0XHRcdFx0XHRcdFx0J25vIHJlc3VsdHMgZm91bmQgKHRyeSBjaGFuZ2luZyBmaWx0ZXJzKScsXG5cdFx0XHRcdFx0XHRcdCdldmVudF9lc3ByZXNzbydcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0Y29uc3QgcmV0dXJuQXNQcm9wID0gcGFnaW5hdGlvbkNvbmZpZy5yZXR1cm5Bc1Byb3AgP1xuXHRcdFx0XHRcdFx0cGFnaW5hdGlvbkNvbmZpZy5yZXR1cm5Bc1Byb3AgOlxuXHRcdFx0XHRcdFx0ZmFsc2U7XG5cdFx0XHRcdFx0Y29uc3QgcGFnaW5hdGlvbiA9IChcblx0XHRcdFx0XHRcdDxkaXYgaWQ9eyBgZWUtZW50aXR5LXBhZ2luYXRpb24tJHsgaW5zdGFuY2VJZCB9YCB9XG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImVlLWVudGl0eS1wYWdpbmF0aW9uXCJcblx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0PEp3UGFnaW5hdGlvblxuXHRcdFx0XHRcdFx0XHRcdGl0ZW1zPXsgZW50aXRpZXMgfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlUGFnZT17IHRoaXMub25QYWdpbmF0aW9uQ2hhbmdlIH1cblx0XHRcdFx0XHRcdFx0XHRwYWdlU2l6ZT17IHBhcnNlSW50KCBlbnRpdGllc1BlclBhZ2UgKSB9XG5cdFx0XHRcdFx0XHRcdFx0eyAuLi5wYWdpbmF0aW9uQ29uZmlnIH1cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0Y29uc3QgdG9wUGFnaW5hdGlvbiA9IHBvc2l0aW9uID09PSAoICd0b3AnIHx8ICdib3RoJyApID9cblx0XHRcdFx0XHRcdHBhZ2luYXRpb24gOlxuXHRcdFx0XHRcdFx0bnVsbDtcblx0XHRcdFx0XHRjb25zdCBib3R0b21QYWdpbmF0aW9uID0gcG9zaXRpb24gPT09ICggJ2JvdHRvbScgfHwgJ2JvdGgnICkgP1xuXHRcdFx0XHRcdFx0cGFnaW5hdGlvbiA6XG5cdFx0XHRcdFx0XHRudWxsO1xuXHRcdFx0XHRcdHJldHVybiByZXR1cm5Bc1Byb3AgPyAoXG5cdFx0XHRcdFx0XHQ8RW50aXR5TGlzdFxuXHRcdFx0XHRcdFx0XHRwYWdpbmF0aW9uPXsgcGFnaW5hdGlvbiB9XG5cdFx0XHRcdFx0XHRcdGVudGl0aWVzPXsgdGhpcy5zdGF0ZS5lbnRpdHlQYWdlIH1cblx0XHRcdFx0XHRcdFx0bm9SZXN1bHRzVGV4dD17IG5vUmVzdWx0c1RleHQgfVxuXHRcdFx0XHRcdFx0XHR7IC4uLm90aGVyUHJvcHMgfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQpIDogKFxuXHRcdFx0XHRcdFx0PEZyYWdtZW50PlxuXHRcdFx0XHRcdFx0XHR7IHRvcFBhZ2luYXRpb24gfVxuXHRcdFx0XHRcdFx0XHQ8RW50aXR5TGlzdFxuXHRcdFx0XHRcdFx0XHRcdGVudGl0aWVzPXsgdGhpcy5zdGF0ZS5lbnRpdHlQYWdlIH1cblx0XHRcdFx0XHRcdFx0XHRub1Jlc3VsdHNUZXh0PXsgbm9SZXN1bHRzVGV4dCB9XG5cdFx0XHRcdFx0XHRcdFx0eyAuLi5vdGhlclByb3BzIH1cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0eyBib3R0b21QYWdpbmF0aW9uIH1cblx0XHRcdFx0XHRcdDwvRnJhZ21lbnQ+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9LFxuXHRdICksXG5cdCd3aXRoRW50aXR5UGFnaW5hdGlvbidcbik7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiZWUtZW50aXR5LXBhZ2luYXRpb25cIjpcImVlLWVudGl0eS1wYWdpbmF0aW9uXCIsXCJwYWdpbmF0aW9uXCI6XCJwYWdpbmF0aW9uXCIsXCJkaXNhYmxlZFwiOlwiZGlzYWJsZWRcIixcImFjdGl2ZVwiOlwiYWN0aXZlXCJ9OyIsIi8qKlxuICogRXh0ZXJuYWwgaW1wb3J0c1xuICovXG5pbXBvcnQgeyB3aXRoU2VsZWN0LCB3aXRoRGlzcGF0Y2ggfSBmcm9tICdAd29yZHByZXNzL2RhdGEnO1xuaW1wb3J0IHsgY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQsIGNvbXBvc2UgfSBmcm9tICdAd29yZHByZXNzL2NvbXBvc2UnO1xuaW1wb3J0IHsgaXNNb2RlbEVudGl0eU9mTW9kZWwgfSBmcm9tICdAZXZlbnRlc3ByZXNzby92YWxpZGF0b3JzJztcblxuLyoqXG4gKiBFeHBvc2VzIHByb3BlcnRpZXMgcmVsYXRlZCB0byB0aGUgbGF0ZXN0IGNoZWNrLWluIGVudGl0eSBmb3IgYSBnaXZlblxuICogcmVnaXN0cmF0aW9uIGFuZCBkYXRldGltZS5cbiAqXG4gKiBQcm9wZXJ0aWVzIHBhc3NlZCB0aHJvdWdoIHRvIHdyYXBwZWQgY29tcG9uZW50IGFyZTpcbiAqXG4gKiAtIGNoZWNrSW5FbnRpdHkge0Jhc2VFbnRpdHl8bnVsbH0gVGhlIGNoZWNrLWluIGVudGl0eSB0aGF0IGlzIHJlbGF0ZWQgdG8gdGhlXG4gKiBnaXZlbiByZWdpc3RyYXRpb24gYW5kIGRhdGV0aW1lIGlkLlxuICogLSBoYXNSZXNvbHZlZENoZWNraW4ge2Jvb2xlYW59IFdoZXRoZXIgdGhlIGNoZWNrLWluIGVudGl0eSBzZWxlY3RvciBoYXNcbiAqIHJlc29sdmVkLiAgVGhpcyBpcyBpbXBvcnRhbnQgYmVjYXVzZSBpdHMgcG9zc2libGUgdGhlcmUgaXMgbm8gZW50aXR5IGZvclxuICogdGhpcyByZWdpc3RyYXRpb24gYW5kIGRhdGV0aW1lIGlmIHRoYXQgcmVnaXN0cmF0aW9uIGhhc24gbmV2ZXIgYmVlbiBjaGVja2VkXG4gKiBpbi5cbiAqIC0gb25DbGljayB7ZnVuY3Rpb259IEEgY2xpY2sgaGFuZGxlciB3aGljaCB3aGVuIGludm9rZWQsIHdpbGwgdG9nZ2xlIHRoZVxuICogY2hlY2staW4gc3RhdGUgZm9yIHRoZSBnaXZlbiByZWdpc3RyYXRpb24gYW5kIGRhdGV0aW1lSWQuIE5vdGU6IHRoaXMgd2lsbFxuICogcmVwbGFjZSB0aGUgc3RvcmUgbGF0ZXN0Q2hlY2tpbiByZWNvcmQgaW4gdGhlIHN0YXRlIGZvciB0aGlzIGdpdmVuXG4gKiByZWdpc3RyYXRpb24gYW5kIGRhdGV0aW1lIGlkIHdoaWNoIHdpbGwgZ2V0IHBpY2tlZCB1cCBieSB0aGUgYHdpdGhTZWxlY3RgXG4gKiBIT0MgaW4gdGhlIGNvbXBvc2VkIGNvbXBvbmVudC5cbiAqXG4gKiBAdHlwZSB7V1BDb21wb25lbnR9XG4gKi9cbmNvbnN0IHdpdGhMYXRlc3RDaGVja2luID0gY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQoXG5cdGNvbXBvc2UoIFtcblx0XHR3aXRoU2VsZWN0KFxuXHRcdFx0KCBzZWxlY3QsIHsgcmVnaXN0cmF0aW9uLCBkYXRldGltZUlkIH0gKSA9PiB7XG5cdFx0XHRcdGlmICggISBpc01vZGVsRW50aXR5T2ZNb2RlbChcblx0XHRcdFx0XHRyZWdpc3RyYXRpb24sXG5cdFx0XHRcdFx0J3JlZ2lzdHJhdGlvbidcblx0XHRcdFx0KSApIHtcblx0XHRcdFx0XHRyZXR1cm4ge307XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgeyBnZXRMYXRlc3RDaGVja2luIH0gPSBzZWxlY3QoICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0XHRcdGNvbnN0IHsgaGFzRmluaXNoZWRSZXNvbHV0aW9uIH0gPSBzZWxlY3QoICdjb3JlL2RhdGEnICk7XG5cdFx0XHRcdGNvbnN0IGNoZWNrSW5FbnRpdHkgPSBnZXRMYXRlc3RDaGVja2luKFxuXHRcdFx0XHRcdHJlZ2lzdHJhdGlvbi5pZCxcblx0XHRcdFx0XHRkYXRldGltZUlkXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Y2hlY2tpbkVudGl0eTogY2hlY2tJbkVudGl0eSB8fCBudWxsLFxuXHRcdFx0XHRcdGhhc1Jlc29sdmVkQ2hlY2tpbjogaGFzRmluaXNoZWRSZXNvbHV0aW9uKFxuXHRcdFx0XHRcdFx0J2V2ZW50ZXNwcmVzc28vY29yZScsXG5cdFx0XHRcdFx0XHQnZ2V0TGF0ZXN0Q2hlY2tpbicsXG5cdFx0XHRcdFx0XHRbIHJlZ2lzdHJhdGlvbi5pZCwgZGF0ZXRpbWVJZCBdXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHQpLFxuXHRcdHdpdGhEaXNwYXRjaChcblx0XHRcdCggZGlzcGF0Y2gsIHsgcmVnaXN0cmF0aW9uLCBkYXRldGltZUlkIH0gKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHsgdG9nZ2xlQ2hlY2tpbiB9ID0gZGlzcGF0Y2goICdldmVudGVzcHJlc3NvL2NvcmUnICk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0b25DbGljaygpIHtcblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0aXNNb2RlbEVudGl0eU9mTW9kZWwoXG5cdFx0XHRcdFx0XHRcdFx0cmVnaXN0cmF0aW9uLFxuXHRcdFx0XHRcdFx0XHRcdCdyZWdpc3RyYXRpb24nXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR0b2dnbGVDaGVja2luKCByZWdpc3RyYXRpb24uaWQsIGRhdGV0aW1lSWQgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdCksXG5cdF0gKSxcblx0J3dpdGhMYXRlc3RDaGVja2luJ1xuKTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aExhdGVzdENoZWNraW47XG4iLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQ7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9leHRlbmRzOyIsImZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZjsiLCJ2YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9zZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbmhlcml0czsiLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi9kZWZpbmVQcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQ7IiwidmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgPSByZXF1aXJlKFwiLi9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCk7XG4gIHZhciBrZXksIGk7XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzOyIsImZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgYXNzZXJ0VGhpc0luaXRpYWxpemVkID0gcmVxdWlyZShcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuOyIsImZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBhcnJheXMgYXJlIHNoYWxsb3cgZXF1YWwsIG9yIGZhbHNlIG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhIEZpcnN0IGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBiIFNlY29uZCBhcnJheSB0byBjb21wYXJlLlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdGhlIHR3byBhcnJheXMgYXJlIHNoYWxsb3cgZXF1YWwuXG4gKi9cbmZ1bmN0aW9uIGlzU2hhbGxvd0VxdWFsQXJyYXlzKCBhLCBiICkge1xuXHR2YXIgaTtcblxuXHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRpZiAoIGEubGVuZ3RoICE9PSBiLmxlbmd0aCApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRmb3IgKCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKysgKSB7XG5cdFx0aWYgKCBhWyBpIF0gIT09IGJbIGkgXSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1NoYWxsb3dFcXVhbEFycmF5cztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXM7XG4gKi9cbnZhciBpc1NoYWxsb3dFcXVhbE9iamVjdHMgPSByZXF1aXJlKCAnLi9vYmplY3RzJyApO1xudmFyIGlzU2hhbGxvd0VxdWFsQXJyYXlzID0gcmVxdWlyZSggJy4vYXJyYXlzJyApO1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gYXJyYXlzIG9yIG9iamVjdHMgYXJlIHNoYWxsb3cgZXF1YWwsIG9yIGZhbHNlXG4gKiBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHsoQXJyYXl8T2JqZWN0KX0gYSBGaXJzdCBvYmplY3Qgb3IgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7KEFycmF5fE9iamVjdCl9IGIgU2Vjb25kIG9iamVjdCBvciBhcnJheSB0byBjb21wYXJlLlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdGhlIHR3byB2YWx1ZXMgYXJlIHNoYWxsb3cgZXF1YWwuXG4gKi9cbmZ1bmN0aW9uIGlzU2hhbGxvd0VxdWFsKCBhLCBiICkge1xuXHRpZiAoIGEgJiYgYiApIHtcblx0XHRpZiAoIGEuY29uc3RydWN0b3IgPT09IE9iamVjdCAmJiBiLmNvbnN0cnVjdG9yID09PSBPYmplY3QgKSB7XG5cdFx0XHRyZXR1cm4gaXNTaGFsbG93RXF1YWxPYmplY3RzKCBhLCBiICk7XG5cdFx0fSBlbHNlIGlmICggaXNBcnJheSggYSApICYmIGlzQXJyYXkoIGIgKSApIHtcblx0XHRcdHJldHVybiBpc1NoYWxsb3dFcXVhbEFycmF5cyggYSwgYiApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhID09PSBiO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2hhbGxvd0VxdWFsO1xubW9kdWxlLmV4cG9ydHMuaXNTaGFsbG93RXF1YWxPYmplY3RzID0gaXNTaGFsbG93RXF1YWxPYmplY3RzO1xubW9kdWxlLmV4cG9ydHMuaXNTaGFsbG93RXF1YWxBcnJheXMgPSBpc1NoYWxsb3dFcXVhbEFycmF5cztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSBPYmplY3Qua2V5cztcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBvYmplY3RzIGFyZSBzaGFsbG93IGVxdWFsLCBvciBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgRmlyc3Qgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gYiBTZWNvbmQgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciB0aGUgdHdvIG9iamVjdHMgYXJlIHNoYWxsb3cgZXF1YWwuXG4gKi9cbmZ1bmN0aW9uIGlzU2hhbGxvd0VxdWFsT2JqZWN0cyggYSwgYiApIHtcblx0dmFyIGFLZXlzLCBiS2V5cywgaSwga2V5O1xuXG5cdGlmICggYSA9PT0gYiApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGFLZXlzID0ga2V5cyggYSApO1xuXHRiS2V5cyA9IGtleXMoIGIgKTtcblxuXHRpZiAoIGFLZXlzLmxlbmd0aCAhPT0gYktleXMubGVuZ3RoICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGkgPSAwO1xuXG5cdHdoaWxlICggaSA8IGFLZXlzLmxlbmd0aCApIHtcblx0XHRrZXkgPSBhS2V5c1sgaSBdO1xuXHRcdGlmICggYVsga2V5IF0gIT09IGJbIGtleSBdICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGkrKztcblx0fVxuXG5cdHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2hhbGxvd0VxdWFsT2JqZWN0cztcbiIsIm1vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKGUpe3ZhciB0PXt9O2Z1bmN0aW9uIHIobil7aWYodFtuXSlyZXR1cm4gdFtuXS5leHBvcnRzO3ZhciBvPXRbbl09e2k6bixsOiExLGV4cG9ydHM6e319O3JldHVybiBlW25dLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLHIpLG8ubD0hMCxvLmV4cG9ydHN9cmV0dXJuIHIubT1lLHIuYz10LHIuZD1mdW5jdGlvbihlLHQsbil7ci5vKGUsdCl8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLHQse2VudW1lcmFibGU6ITAsZ2V0Om59KX0sci5yPWZ1bmN0aW9uKGUpe1widW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2wmJlN5bWJvbC50b1N0cmluZ1RhZyYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsU3ltYm9sLnRvU3RyaW5nVGFnLHt2YWx1ZTpcIk1vZHVsZVwifSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSl9LHIudD1mdW5jdGlvbihlLHQpe2lmKDEmdCYmKGU9cihlKSksOCZ0KXJldHVybiBlO2lmKDQmdCYmXCJvYmplY3RcIj09dHlwZW9mIGUmJmUmJmUuX19lc01vZHVsZSlyZXR1cm4gZTt2YXIgbj1PYmplY3QuY3JlYXRlKG51bGwpO2lmKHIucihuKSxPYmplY3QuZGVmaW5lUHJvcGVydHkobixcImRlZmF1bHRcIix7ZW51bWVyYWJsZTohMCx2YWx1ZTplfSksMiZ0JiZcInN0cmluZ1wiIT10eXBlb2YgZSlmb3IodmFyIG8gaW4gZSlyLmQobixvLGZ1bmN0aW9uKHQpe3JldHVybiBlW3RdfS5iaW5kKG51bGwsbykpO3JldHVybiBufSxyLm49ZnVuY3Rpb24oZSl7dmFyIHQ9ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHIuZCh0LFwiYVwiLHQpLHR9LHIubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sci5wPVwiXCIscihyLnM9MCl9KFtmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG49T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PTE7dDxhcmd1bWVudHMubGVuZ3RoO3QrKyl7dmFyIHI9YXJndW1lbnRzW3RdO2Zvcih2YXIgbiBpbiByKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyLG4pJiYoZVtuXT1yW25dKX1yZXR1cm4gZX0sbz1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0KXtmb3IodmFyIHI9MDtyPHQubGVuZ3RoO3IrKyl7dmFyIG49dFtyXTtuLmVudW1lcmFibGU9bi5lbnVtZXJhYmxlfHwhMSxuLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiBuJiYobi53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbi5rZXksbil9fXJldHVybiBmdW5jdGlvbih0LHIsbil7cmV0dXJuIHImJmUodC5wcm90b3R5cGUsciksbiYmZSh0LG4pLHR9fSgpLGE9aShyKDEpKSx1PWkocig0KSksbD1pKHIoNykpO2Z1bmN0aW9uIGkoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fXZhciBzPXtpdGVtczp1LmRlZmF1bHQuYXJyYXkuaXNSZXF1aXJlZCxvbkNoYW5nZVBhZ2U6dS5kZWZhdWx0LmZ1bmMuaXNSZXF1aXJlZCxpbml0aWFsUGFnZTp1LmRlZmF1bHQubnVtYmVyLHBhZ2VTaXplOnUuZGVmYXVsdC5udW1iZXIsbWF4UGFnZXM6dS5kZWZhdWx0Lm51bWJlcixsYWJlbHM6dS5kZWZhdWx0Lm9iamVjdCxzdHlsZXM6dS5kZWZhdWx0Lm9iamVjdCxkaXNhYmxlRGVmYXVsdFN0eWxlczp1LmRlZmF1bHQuYm9vbH0sYz1mdW5jdGlvbihlKXtmdW5jdGlvbiB0KGUpeyFmdW5jdGlvbihlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9KHRoaXMsdCk7dmFyIHI9ZnVuY3Rpb24oZSx0KXtpZighZSl0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7cmV0dXJuIXR8fFwib2JqZWN0XCIhPXR5cGVvZiB0JiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0P2U6dH0odGhpcywodC5fX3Byb3RvX198fE9iamVjdC5nZXRQcm90b3R5cGVPZih0KSkuY2FsbCh0aGlzLGUpKTtyZXR1cm4gci5zdGF0ZT17cGFnZXI6e319LHIuc3R5bGVzPXt9LGUuZGlzYWJsZURlZmF1bHRTdHlsZXN8fChyLnN0eWxlcz17dWw6e21hcmdpbjowLHBhZGRpbmc6MCxkaXNwbGF5OlwiaW5saW5lLWJsb2NrXCJ9LGxpOntsaXN0U3R5bGU6XCJub25lXCIsZGlzcGxheTpcImlubGluZVwiLHRleHRBbGlnbjpcImNlbnRlclwifSxhOntjdXJzb3I6XCJwb2ludGVyXCIscGFkZGluZzpcIjZweCAxMnB4XCIsZGlzcGxheTpcImJsb2NrXCIsZmxvYXQ6XCJsZWZ0XCJ9fSksZS5zdHlsZXMmJihyLnN0eWxlcz17dWw6bih7fSxyLnN0eWxlcy51bCxlLnN0eWxlcy51bCksbGk6bih7fSxyLnN0eWxlcy5saSxlLnN0eWxlcy5saSksYTpuKHt9LHIuc3R5bGVzLmEsZS5zdHlsZXMuYSl9KSxyfXJldHVybiBmdW5jdGlvbihlLHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQmJm51bGwhPT10KXRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiK3R5cGVvZiB0KTtlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHQmJnQucHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7dmFsdWU6ZSxlbnVtZXJhYmxlOiExLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH19KSx0JiYoT2JqZWN0LnNldFByb3RvdHlwZU9mP09iamVjdC5zZXRQcm90b3R5cGVPZihlLHQpOmUuX19wcm90b19fPXQpfSh0LGEuZGVmYXVsdC5Db21wb25lbnQpLG8odCxbe2tleTpcImNvbXBvbmVudFdpbGxNb3VudFwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5wcm9wcy5pdGVtcyYmdGhpcy5wcm9wcy5pdGVtcy5sZW5ndGgmJnRoaXMuc2V0UGFnZSh0aGlzLnByb3BzLmluaXRpYWxQYWdlKX19LHtrZXk6XCJjb21wb25lbnREaWRVcGRhdGVcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3RoaXMucHJvcHMuaXRlbXMhPT1lLml0ZW1zJiZ0aGlzLnNldFBhZ2UodGhpcy5wcm9wcy5pbml0aWFsUGFnZSl9fSx7a2V5Olwic2V0UGFnZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMucHJvcHMscj10Lml0ZW1zLG49dC5wYWdlU2l6ZSxvPXQubWF4UGFnZXMsYT10aGlzLnN0YXRlLnBhZ2VyO2E9KDAsbC5kZWZhdWx0KShyLmxlbmd0aCxlLG4sbyk7dmFyIHU9ci5zbGljZShhLnN0YXJ0SW5kZXgsYS5lbmRJbmRleCsxKTt0aGlzLnNldFN0YXRlKHtwYWdlcjphfSksdGhpcy5wcm9wcy5vbkNoYW5nZVBhZ2UodSl9fSx7a2V5OlwicmVuZGVyXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9dGhpcy5zdGF0ZS5wYWdlcixyPXRoaXMucHJvcHMubGFiZWxzLG49dGhpcy5zdHlsZXM7cmV0dXJuIXQucGFnZXN8fHQucGFnZXMubGVuZ3RoPD0xP251bGw6YS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLHtjbGFzc05hbWU6XCJwYWdpbmF0aW9uXCIsc3R5bGU6bi51bH0sYS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLHtjbGFzc05hbWU6XCJwYWdlLWl0ZW0gZmlyc3QgXCIrKDE9PT10LmN1cnJlbnRQYWdlP1wiZGlzYWJsZWRcIjpcIlwiKSxzdHlsZTpuLmxpfSxhLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIix7Y2xhc3NOYW1lOlwicGFnZS1saW5rXCIsb25DbGljazpmdW5jdGlvbigpe3JldHVybiBlLnNldFBhZ2UoMSl9LHN0eWxlOm4uYX0sci5maXJzdCkpLGEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIix7Y2xhc3NOYW1lOlwicGFnZS1pdGVtIHByZXZpb3VzIFwiKygxPT09dC5jdXJyZW50UGFnZT9cImRpc2FibGVkXCI6XCJcIiksc3R5bGU6bi5saX0sYS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIse2NsYXNzTmFtZTpcInBhZ2UtbGlua1wiLG9uQ2xpY2s6ZnVuY3Rpb24oKXtyZXR1cm4gZS5zZXRQYWdlKHQuY3VycmVudFBhZ2UtMSl9LHN0eWxlOm4uYX0sci5wcmV2aW91cykpLHQucGFnZXMubWFwKGZ1bmN0aW9uKHIsbyl7cmV0dXJuIGEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlcIix7a2V5Om8sY2xhc3NOYW1lOlwicGFnZS1pdGVtIHBhZ2UtbnVtYmVyIFwiKyh0LmN1cnJlbnRQYWdlPT09cj9cImFjdGl2ZVwiOlwiXCIpLHN0eWxlOm4ubGl9LGEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLHtjbGFzc05hbWU6XCJwYWdlLWxpbmtcIixvbkNsaWNrOmZ1bmN0aW9uKCl7cmV0dXJuIGUuc2V0UGFnZShyKX0sc3R5bGU6bi5hfSxyKSl9KSxhLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIse2NsYXNzTmFtZTpcInBhZ2UtaXRlbSBuZXh0IFwiKyh0LmN1cnJlbnRQYWdlPT09dC50b3RhbFBhZ2VzP1wiZGlzYWJsZWRcIjpcIlwiKSxzdHlsZTpuLmxpfSxhLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIix7Y2xhc3NOYW1lOlwicGFnZS1saW5rXCIsb25DbGljazpmdW5jdGlvbigpe3JldHVybiBlLnNldFBhZ2UodC5jdXJyZW50UGFnZSsxKX0sc3R5bGU6bi5hfSxyLm5leHQpKSxhLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpXCIse2NsYXNzTmFtZTpcInBhZ2UtaXRlbSBsYXN0IFwiKyh0LmN1cnJlbnRQYWdlPT09dC50b3RhbFBhZ2VzP1wiZGlzYWJsZWRcIjpcIlwiKSxzdHlsZTpuLmxpfSxhLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImFcIix7Y2xhc3NOYW1lOlwicGFnZS1saW5rXCIsb25DbGljazpmdW5jdGlvbigpe3JldHVybiBlLnNldFBhZ2UodC50b3RhbFBhZ2VzKX0sc3R5bGU6bi5hfSxyLmxhc3QpKSl9fV0pLHR9KCk7Yy5wcm9wVHlwZXM9cyxjLmRlZmF1bHRQcm9wcz17aW5pdGlhbFBhZ2U6MSxwYWdlU2l6ZToxMCxtYXhQYWdlczoxMCxsYWJlbHM6e2ZpcnN0OlwiRmlyc3RcIixsYXN0OlwiTGFzdFwiLHByZXZpb3VzOlwiUHJldmlvdXNcIixuZXh0OlwiTmV4dFwifX0sdC5kZWZhdWx0PWN9LGZ1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtlLmV4cG9ydHM9cigyKX0sZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO1xuLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi44LjZcbiAqIHJlYWN0LnByb2R1Y3Rpb24ubWluLmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi92YXIgbj1yKDMpLG89XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZTeW1ib2wuZm9yLGE9bz9TeW1ib2wuZm9yKFwicmVhY3QuZWxlbWVudFwiKTo2MDEwMyx1PW8/U3ltYm9sLmZvcihcInJlYWN0LnBvcnRhbFwiKTo2MDEwNixsPW8/U3ltYm9sLmZvcihcInJlYWN0LmZyYWdtZW50XCIpOjYwMTA3LGk9bz9TeW1ib2wuZm9yKFwicmVhY3Quc3RyaWN0X21vZGVcIik6NjAxMDgscz1vP1N5bWJvbC5mb3IoXCJyZWFjdC5wcm9maWxlclwiKTo2MDExNCxjPW8/U3ltYm9sLmZvcihcInJlYWN0LnByb3ZpZGVyXCIpOjYwMTA5LGY9bz9TeW1ib2wuZm9yKFwicmVhY3QuY29udGV4dFwiKTo2MDExMCxwPW8/U3ltYm9sLmZvcihcInJlYWN0LmNvbmN1cnJlbnRfbW9kZVwiKTo2MDExMSx5PW8/U3ltYm9sLmZvcihcInJlYWN0LmZvcndhcmRfcmVmXCIpOjYwMTEyLGQ9bz9TeW1ib2wuZm9yKFwicmVhY3Quc3VzcGVuc2VcIik6NjAxMTMsbT1vP1N5bWJvbC5mb3IoXCJyZWFjdC5tZW1vXCIpOjYwMTE1LGc9bz9TeW1ib2wuZm9yKFwicmVhY3QubGF6eVwiKTo2MDExNixiPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmU3ltYm9sLml0ZXJhdG9yO2Z1bmN0aW9uIHYoZSl7Zm9yKHZhciB0PWFyZ3VtZW50cy5sZW5ndGgtMSxyPVwiaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL2Vycm9yLWRlY29kZXIuaHRtbD9pbnZhcmlhbnQ9XCIrZSxuPTA7bjx0O24rKylyKz1cIiZhcmdzW109XCIrZW5jb2RlVVJJQ29tcG9uZW50KGFyZ3VtZW50c1tuKzFdKTshZnVuY3Rpb24oZSx0LHIsbixvLGEsdSxsKXtpZighZSl7aWYoZT12b2lkIDAsdm9pZCAwPT09dCllPUVycm9yKFwiTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy5cIik7ZWxzZXt2YXIgaT1bcixuLG8sYSx1LGxdLHM9MDsoZT1FcnJvcih0LnJlcGxhY2UoLyVzL2csZnVuY3Rpb24oKXtyZXR1cm4gaVtzKytdfSkpKS5uYW1lPVwiSW52YXJpYW50IFZpb2xhdGlvblwifXRocm93IGUuZnJhbWVzVG9Qb3A9MSxlfX0oITEsXCJNaW5pZmllZCBSZWFjdCBlcnJvciAjXCIrZStcIjsgdmlzaXQgJXMgZm9yIHRoZSBmdWxsIG1lc3NhZ2Ugb3IgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50IGZvciBmdWxsIGVycm9ycyBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLiBcIixyKX12YXIgaD17aXNNb3VudGVkOmZ1bmN0aW9uKCl7cmV0dXJuITF9LGVucXVldWVGb3JjZVVwZGF0ZTpmdW5jdGlvbigpe30sZW5xdWV1ZVJlcGxhY2VTdGF0ZTpmdW5jdGlvbigpe30sZW5xdWV1ZVNldFN0YXRlOmZ1bmN0aW9uKCl7fX0sUD17fTtmdW5jdGlvbiBfKGUsdCxyKXt0aGlzLnByb3BzPWUsdGhpcy5jb250ZXh0PXQsdGhpcy5yZWZzPVAsdGhpcy51cGRhdGVyPXJ8fGh9ZnVuY3Rpb24gTygpe31mdW5jdGlvbiBTKGUsdCxyKXt0aGlzLnByb3BzPWUsdGhpcy5jb250ZXh0PXQsdGhpcy5yZWZzPVAsdGhpcy51cGRhdGVyPXJ8fGh9Xy5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudD17fSxfLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihlLHQpe1wib2JqZWN0XCIhPXR5cGVvZiBlJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBlJiZudWxsIT1lJiZ2KFwiODVcIiksdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLGUsdCxcInNldFN0YXRlXCIpfSxfLnByb3RvdHlwZS5mb3JjZVVwZGF0ZT1mdW5jdGlvbihlKXt0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMsZSxcImZvcmNlVXBkYXRlXCIpfSxPLnByb3RvdHlwZT1fLnByb3RvdHlwZTt2YXIgaz1TLnByb3RvdHlwZT1uZXcgTztrLmNvbnN0cnVjdG9yPVMsbihrLF8ucHJvdG90eXBlKSxrLmlzUHVyZVJlYWN0Q29tcG9uZW50PSEwO3ZhciBqPXtjdXJyZW50Om51bGx9LHg9e2N1cnJlbnQ6bnVsbH0sdz1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LEU9e2tleTohMCxyZWY6ITAsX19zZWxmOiEwLF9fc291cmNlOiEwfTtmdW5jdGlvbiBDKGUsdCxyKXt2YXIgbj12b2lkIDAsbz17fSx1PW51bGwsbD1udWxsO2lmKG51bGwhPXQpZm9yKG4gaW4gdm9pZCAwIT09dC5yZWYmJihsPXQucmVmKSx2b2lkIDAhPT10LmtleSYmKHU9XCJcIit0LmtleSksdCl3LmNhbGwodCxuKSYmIUUuaGFzT3duUHJvcGVydHkobikmJihvW25dPXRbbl0pO3ZhciBpPWFyZ3VtZW50cy5sZW5ndGgtMjtpZigxPT09aSlvLmNoaWxkcmVuPXI7ZWxzZSBpZigxPGkpe2Zvcih2YXIgcz1BcnJheShpKSxjPTA7YzxpO2MrKylzW2NdPWFyZ3VtZW50c1tjKzJdO28uY2hpbGRyZW49c31pZihlJiZlLmRlZmF1bHRQcm9wcylmb3IobiBpbiBpPWUuZGVmYXVsdFByb3BzKXZvaWQgMD09PW9bbl0mJihvW25dPWlbbl0pO3JldHVybnskJHR5cGVvZjphLHR5cGU6ZSxrZXk6dSxyZWY6bCxwcm9wczpvLF9vd25lcjp4LmN1cnJlbnR9fWZ1bmN0aW9uIFIoZSl7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIGUmJm51bGwhPT1lJiZlLiQkdHlwZW9mPT09YX12YXIgJD0vXFwvKy9nLFQ9W107ZnVuY3Rpb24gTShlLHQscixuKXtpZihULmxlbmd0aCl7dmFyIG89VC5wb3AoKTtyZXR1cm4gby5yZXN1bHQ9ZSxvLmtleVByZWZpeD10LG8uZnVuYz1yLG8uY29udGV4dD1uLG8uY291bnQ9MCxvfXJldHVybntyZXN1bHQ6ZSxrZXlQcmVmaXg6dCxmdW5jOnIsY29udGV4dDpuLGNvdW50OjB9fWZ1bmN0aW9uIE4oZSl7ZS5yZXN1bHQ9bnVsbCxlLmtleVByZWZpeD1udWxsLGUuZnVuYz1udWxsLGUuY29udGV4dD1udWxsLGUuY291bnQ9MCwxMD5ULmxlbmd0aCYmVC5wdXNoKGUpfWZ1bmN0aW9uIEkoZSx0LHIpe3JldHVybiBudWxsPT1lPzA6ZnVuY3Rpb24gZSh0LHIsbixvKXt2YXIgbD10eXBlb2YgdDtcInVuZGVmaW5lZFwiIT09bCYmXCJib29sZWFuXCIhPT1sfHwodD1udWxsKTt2YXIgaT0hMTtpZihudWxsPT09dClpPSEwO2Vsc2Ugc3dpdGNoKGwpe2Nhc2VcInN0cmluZ1wiOmNhc2VcIm51bWJlclwiOmk9ITA7YnJlYWs7Y2FzZVwib2JqZWN0XCI6c3dpdGNoKHQuJCR0eXBlb2Ype2Nhc2UgYTpjYXNlIHU6aT0hMH19aWYoaSlyZXR1cm4gbihvLHQsXCJcIj09PXI/XCIuXCIrQSh0LDApOnIpLDE7aWYoaT0wLHI9XCJcIj09PXI/XCIuXCI6citcIjpcIixBcnJheS5pc0FycmF5KHQpKWZvcih2YXIgcz0wO3M8dC5sZW5ndGg7cysrKXt2YXIgYz1yK0EobD10W3NdLHMpO2krPWUobCxjLG4sbyl9ZWxzZSBpZihjPW51bGw9PT10fHxcIm9iamVjdFwiIT10eXBlb2YgdD9udWxsOlwiZnVuY3Rpb25cIj09dHlwZW9mKGM9YiYmdFtiXXx8dFtcIkBAaXRlcmF0b3JcIl0pP2M6bnVsbCxcImZ1bmN0aW9uXCI9PXR5cGVvZiBjKWZvcih0PWMuY2FsbCh0KSxzPTA7IShsPXQubmV4dCgpKS5kb25lOylpKz1lKGw9bC52YWx1ZSxjPXIrQShsLHMrKyksbixvKTtlbHNlXCJvYmplY3RcIj09PWwmJnYoXCIzMVwiLFwiW29iamVjdCBPYmplY3RdXCI9PShuPVwiXCIrdCk/XCJvYmplY3Qgd2l0aCBrZXlzIHtcIitPYmplY3Qua2V5cyh0KS5qb2luKFwiLCBcIikrXCJ9XCI6bixcIlwiKTtyZXR1cm4gaX0oZSxcIlwiLHQscil9ZnVuY3Rpb24gQShlLHQpe3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiBlJiZudWxsIT09ZSYmbnVsbCE9ZS5rZXk/ZnVuY3Rpb24oZSl7dmFyIHQ9e1wiPVwiOlwiPTBcIixcIjpcIjpcIj0yXCJ9O3JldHVyblwiJFwiKyhcIlwiK2UpLnJlcGxhY2UoL1s9Ol0vZyxmdW5jdGlvbihlKXtyZXR1cm4gdFtlXX0pfShlLmtleSk6dC50b1N0cmluZygzNil9ZnVuY3Rpb24gcShlLHQpe2UuZnVuYy5jYWxsKGUuY29udGV4dCx0LGUuY291bnQrKyl9ZnVuY3Rpb24gVShlLHQscil7dmFyIG49ZS5yZXN1bHQsbz1lLmtleVByZWZpeDtlPWUuZnVuYy5jYWxsKGUuY29udGV4dCx0LGUuY291bnQrKyksQXJyYXkuaXNBcnJheShlKT9EKGUsbixyLGZ1bmN0aW9uKGUpe3JldHVybiBlfSk6bnVsbCE9ZSYmKFIoZSkmJihlPWZ1bmN0aW9uKGUsdCl7cmV0dXJueyQkdHlwZW9mOmEsdHlwZTplLnR5cGUsa2V5OnQscmVmOmUucmVmLHByb3BzOmUucHJvcHMsX293bmVyOmUuX293bmVyfX0oZSxvKyghZS5rZXl8fHQmJnQua2V5PT09ZS5rZXk/XCJcIjooXCJcIitlLmtleSkucmVwbGFjZSgkLFwiJCYvXCIpK1wiL1wiKStyKSksbi5wdXNoKGUpKX1mdW5jdGlvbiBEKGUsdCxyLG4sbyl7dmFyIGE9XCJcIjtudWxsIT1yJiYoYT0oXCJcIityKS5yZXBsYWNlKCQsXCIkJi9cIikrXCIvXCIpLEkoZSxVLHQ9TSh0LGEsbixvKSksTih0KX1mdW5jdGlvbiBMKCl7dmFyIGU9ai5jdXJyZW50O3JldHVybiBudWxsPT09ZSYmdihcIjMyMVwiKSxlfXZhciBGPXtDaGlsZHJlbjp7bWFwOmZ1bmN0aW9uKGUsdCxyKXtpZihudWxsPT1lKXJldHVybiBlO3ZhciBuPVtdO3JldHVybiBEKGUsbixudWxsLHQsciksbn0sZm9yRWFjaDpmdW5jdGlvbihlLHQscil7aWYobnVsbD09ZSlyZXR1cm4gZTtJKGUscSx0PU0obnVsbCxudWxsLHQscikpLE4odCl9LGNvdW50OmZ1bmN0aW9uKGUpe3JldHVybiBJKGUsZnVuY3Rpb24oKXtyZXR1cm4gbnVsbH0sbnVsbCl9LHRvQXJyYXk6ZnVuY3Rpb24oZSl7dmFyIHQ9W107cmV0dXJuIEQoZSx0LG51bGwsZnVuY3Rpb24oZSl7cmV0dXJuIGV9KSx0fSxvbmx5OmZ1bmN0aW9uKGUpe3JldHVybiBSKGUpfHx2KFwiMTQzXCIpLGV9fSxjcmVhdGVSZWY6ZnVuY3Rpb24oKXtyZXR1cm57Y3VycmVudDpudWxsfX0sQ29tcG9uZW50Ol8sUHVyZUNvbXBvbmVudDpTLGNyZWF0ZUNvbnRleHQ6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdm9pZCAwPT09dCYmKHQ9bnVsbCksKGU9eyQkdHlwZW9mOmYsX2NhbGN1bGF0ZUNoYW5nZWRCaXRzOnQsX2N1cnJlbnRWYWx1ZTplLF9jdXJyZW50VmFsdWUyOmUsX3RocmVhZENvdW50OjAsUHJvdmlkZXI6bnVsbCxDb25zdW1lcjpudWxsfSkuUHJvdmlkZXI9eyQkdHlwZW9mOmMsX2NvbnRleHQ6ZX0sZS5Db25zdW1lcj1lfSxmb3J3YXJkUmVmOmZ1bmN0aW9uKGUpe3JldHVybnskJHR5cGVvZjp5LHJlbmRlcjplfX0sbGF6eTpmdW5jdGlvbihlKXtyZXR1cm57JCR0eXBlb2Y6ZyxfY3RvcjplLF9zdGF0dXM6LTEsX3Jlc3VsdDpudWxsfX0sbWVtbzpmdW5jdGlvbihlLHQpe3JldHVybnskJHR5cGVvZjptLHR5cGU6ZSxjb21wYXJlOnZvaWQgMD09PXQ/bnVsbDp0fX0sdXNlQ2FsbGJhY2s6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gTCgpLnVzZUNhbGxiYWNrKGUsdCl9LHVzZUNvbnRleHQ6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gTCgpLnVzZUNvbnRleHQoZSx0KX0sdXNlRWZmZWN0OmZ1bmN0aW9uKGUsdCl7cmV0dXJuIEwoKS51c2VFZmZlY3QoZSx0KX0sdXNlSW1wZXJhdGl2ZUhhbmRsZTpmdW5jdGlvbihlLHQscil7cmV0dXJuIEwoKS51c2VJbXBlcmF0aXZlSGFuZGxlKGUsdCxyKX0sdXNlRGVidWdWYWx1ZTpmdW5jdGlvbigpe30sdXNlTGF5b3V0RWZmZWN0OmZ1bmN0aW9uKGUsdCl7cmV0dXJuIEwoKS51c2VMYXlvdXRFZmZlY3QoZSx0KX0sdXNlTWVtbzpmdW5jdGlvbihlLHQpe3JldHVybiBMKCkudXNlTWVtbyhlLHQpfSx1c2VSZWR1Y2VyOmZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gTCgpLnVzZVJlZHVjZXIoZSx0LHIpfSx1c2VSZWY6ZnVuY3Rpb24oZSl7cmV0dXJuIEwoKS51c2VSZWYoZSl9LHVzZVN0YXRlOmZ1bmN0aW9uKGUpe3JldHVybiBMKCkudXNlU3RhdGUoZSl9LEZyYWdtZW50OmwsU3RyaWN0TW9kZTppLFN1c3BlbnNlOmQsY3JlYXRlRWxlbWVudDpDLGNsb25lRWxlbWVudDpmdW5jdGlvbihlLHQscil7bnVsbD09ZSYmdihcIjI2N1wiLGUpO3ZhciBvPXZvaWQgMCx1PW4oe30sZS5wcm9wcyksbD1lLmtleSxpPWUucmVmLHM9ZS5fb3duZXI7aWYobnVsbCE9dCl7dm9pZCAwIT09dC5yZWYmJihpPXQucmVmLHM9eC5jdXJyZW50KSx2b2lkIDAhPT10LmtleSYmKGw9XCJcIit0LmtleSk7dmFyIGM9dm9pZCAwO2ZvcihvIGluIGUudHlwZSYmZS50eXBlLmRlZmF1bHRQcm9wcyYmKGM9ZS50eXBlLmRlZmF1bHRQcm9wcyksdCl3LmNhbGwodCxvKSYmIUUuaGFzT3duUHJvcGVydHkobykmJih1W29dPXZvaWQgMD09PXRbb10mJnZvaWQgMCE9PWM/Y1tvXTp0W29dKX1pZigxPT09KG89YXJndW1lbnRzLmxlbmd0aC0yKSl1LmNoaWxkcmVuPXI7ZWxzZSBpZigxPG8pe2M9QXJyYXkobyk7Zm9yKHZhciBmPTA7ZjxvO2YrKyljW2ZdPWFyZ3VtZW50c1tmKzJdO3UuY2hpbGRyZW49Y31yZXR1cm57JCR0eXBlb2Y6YSx0eXBlOmUudHlwZSxrZXk6bCxyZWY6aSxwcm9wczp1LF9vd25lcjpzfX0sY3JlYXRlRmFjdG9yeTpmdW5jdGlvbihlKXt2YXIgdD1DLmJpbmQobnVsbCxlKTtyZXR1cm4gdC50eXBlPWUsdH0saXNWYWxpZEVsZW1lbnQ6Uix2ZXJzaW9uOlwiMTYuOC42XCIsdW5zdGFibGVfQ29uY3VycmVudE1vZGU6cCx1bnN0YWJsZV9Qcm9maWxlcjpzLF9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEOntSZWFjdEN1cnJlbnREaXNwYXRjaGVyOmosUmVhY3RDdXJyZW50T3duZXI6eCxhc3NpZ246bn19LHo9e2RlZmF1bHQ6Rn0sVj16JiZGfHx6O2UuZXhwb3J0cz1WLmRlZmF1bHR8fFZ9LGZ1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtcbi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL3ZhciBuPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsbz1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LGE9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtlLmV4cG9ydHM9ZnVuY3Rpb24oKXt0cnl7aWYoIU9iamVjdC5hc3NpZ24pcmV0dXJuITE7dmFyIGU9bmV3IFN0cmluZyhcImFiY1wiKTtpZihlWzVdPVwiZGVcIixcIjVcIj09PU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGUpWzBdKXJldHVybiExO2Zvcih2YXIgdD17fSxyPTA7cjwxMDtyKyspdFtcIl9cIitTdHJpbmcuZnJvbUNoYXJDb2RlKHIpXT1yO2lmKFwiMDEyMzQ1Njc4OVwiIT09T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModCkubWFwKGZ1bmN0aW9uKGUpe3JldHVybiB0W2VdfSkuam9pbihcIlwiKSlyZXR1cm4hMTt2YXIgbj17fTtyZXR1cm5cImFiY2RlZmdoaWprbG1ub3BxcnN0XCIuc3BsaXQoXCJcIikuZm9yRWFjaChmdW5jdGlvbihlKXtuW2VdPWV9KSxcImFiY2RlZmdoaWprbG1ub3BxcnN0XCI9PT1PYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LG4pKS5qb2luKFwiXCIpfWNhdGNoKGUpe3JldHVybiExfX0oKT9PYmplY3QuYXNzaWduOmZ1bmN0aW9uKGUsdCl7Zm9yKHZhciByLHUsbD1mdW5jdGlvbihlKXtpZihudWxsPT1lKXRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZFwiKTtyZXR1cm4gT2JqZWN0KGUpfShlKSxpPTE7aTxhcmd1bWVudHMubGVuZ3RoO2krKyl7Zm9yKHZhciBzIGluIHI9T2JqZWN0KGFyZ3VtZW50c1tpXSkpby5jYWxsKHIscykmJihsW3NdPXJbc10pO2lmKG4pe3U9bihyKTtmb3IodmFyIGM9MDtjPHUubGVuZ3RoO2MrKylhLmNhbGwocix1W2NdKSYmKGxbdVtjXV09clt1W2NdXSl9fXJldHVybiBsfX0sZnVuY3Rpb24oZSx0LHIpe2UuZXhwb3J0cz1yKDUpKCl9LGZ1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1yKDYpO2Z1bmN0aW9uIG8oKXt9ZnVuY3Rpb24gYSgpe31hLnJlc2V0V2FybmluZ0NhY2hlPW8sZS5leHBvcnRzPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQscixvLGEsdSl7aWYodSE9PW4pe3ZhciBsPW5ldyBFcnJvcihcIkNhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuIFVzZSBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKSB0byBjYWxsIHRoZW0uIFJlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXNcIik7dGhyb3cgbC5uYW1lPVwiSW52YXJpYW50IFZpb2xhdGlvblwiLGx9fWZ1bmN0aW9uIHQoKXtyZXR1cm4gZX1lLmlzUmVxdWlyZWQ9ZTt2YXIgcj17YXJyYXk6ZSxib29sOmUsZnVuYzplLG51bWJlcjplLG9iamVjdDplLHN0cmluZzplLHN5bWJvbDplLGFueTplLGFycmF5T2Y6dCxlbGVtZW50OmUsZWxlbWVudFR5cGU6ZSxpbnN0YW5jZU9mOnQsbm9kZTplLG9iamVjdE9mOnQsb25lT2Y6dCxvbmVPZlR5cGU6dCxzaGFwZTp0LGV4YWN0OnQsY2hlY2tQcm9wVHlwZXM6YSxyZXNldFdhcm5pbmdDYWNoZTpvfTtyZXR1cm4gci5Qcm9wVHlwZXM9cixyfX0sZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2UuZXhwb3J0cz1cIlNFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEXCJ9LGZ1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0LHIsbil7dm9pZCAwPT09dCYmKHQ9MSksdm9pZCAwPT09ciYmKHI9MTApLHZvaWQgMD09PW4mJihuPTEwKTt2YXIgbyxhLHU9TWF0aC5jZWlsKGUvcik7aWYodDwxP3Q9MTp0PnUmJih0PXUpLHU8PW4pbz0xLGE9dTtlbHNle3ZhciBsPU1hdGguZmxvb3Iobi8yKSxpPU1hdGguY2VpbChuLzIpLTE7dDw9bD8obz0xLGE9bik6dCtpPj11PyhvPXUtbisxLGE9dSk6KG89dC1sLGE9dCtpKX12YXIgcz0odC0xKSpyLGM9TWF0aC5taW4ocytyLTEsZS0xKSxmPUFycmF5LmZyb20oQXJyYXkoYSsxLW8pLmtleXMoKSkubWFwKGZ1bmN0aW9uKGUpe3JldHVybiBvK2V9KTtyZXR1cm57dG90YWxJdGVtczplLGN1cnJlbnRQYWdlOnQscGFnZVNpemU6cix0b3RhbFBhZ2VzOnUsc3RhcnRQYWdlOm8sZW5kUGFnZTphLHN0YXJ0SW5kZXg6cyxlbmRJbmRleDpjLHBhZ2VzOmZ9fX1dKTsiLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG4gIHZhciBoYXMgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG5cbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKGhhcyh0eXBlU3BlY3MsIHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIGVyciA9IEVycm9yKFxuICAgICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6ICcgKyBsb2NhdGlvbiArICcgdHlwZSBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7ICcgK1xuICAgICAgICAgICAgICAnaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCcgKyB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gKyAnYC4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgJiYgIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICcgK1xuICAgICAgICAgICAgbG9jYXRpb24gKyAnIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAnICsgdHlwZW9mIGVycm9yICsgJy4gJyArXG4gICAgICAgICAgICAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICtcbiAgICAgICAgICAgICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc3RhY2sgPSBnZXRTdGFjayA/IGdldFN0YWNrKCkgOiAnJztcblxuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICdGYWlsZWQgJyArIGxvY2F0aW9uICsgJyB0eXBlOiAnICsgZXJyb3IubWVzc2FnZSArIChzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmVzZXRzIHdhcm5pbmcgY2FjaGUgd2hlbiB0ZXN0aW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmNoZWNrUHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlID0gZnVuY3Rpb24oKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1Byb3BUeXBlcztcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG52YXIgaGFzID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG5mdW5jdGlvbiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGVsZW1lbnRUeXBlOiBjcmVhdGVFbGVtZW50VHlwZVR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyLFxuICAgIGV4YWN0OiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyLFxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gT2xkIGJlaGF2aW9yIGZvciBwZW9wbGUgdXNpbmcgUmVhY3QuUHJvcFR5cGVzXG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gJiZcbiAgICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPCAzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBwcm9wIG9uIGAnICsgY29tcG9uZW50TmFtZSAgKyAnYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgK1xuICAgICAgICAgICAgICAnYW5kIHdpbGwgdGhyb3cgaW4gdGhlIHN0YW5kYWxvbmUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICtcbiAgICAgICAgICAgICAgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIVJlYWN0SXMuaXNWYWxpZEVsZW1lbnRUeXBlKHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50IHR5cGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudHMgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGFycmF5LCBnb3QgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIGFyZ3VtZW50cy4gJyArXG4gICAgICAgICAgICAnQSBjb21tb24gbWlzdGFrZSBpcyB0byB3cml0ZSBvbmVPZih4LCB5LCB6KSBpbnN0ZWFkIG9mIG9uZU9mKFt4LCB5LCB6XSkuJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBhcnJheS4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMsIGZ1bmN0aW9uIHJlcGxhY2VyKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlID09PSAnc3ltYm9sJykge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIFN0cmluZyhwcm9wVmFsdWUpICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgIGlmIChoYXMocHJvcFZhbHVlLCBrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAnICsgZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKGNoZWNrZXIpICsgJyBhdCBpbmRleCAnICsgaSArICcuJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gZmFsc3kgdmFsdWUgY2FuJ3QgYmUgYSBTeW1ib2xcbiAgICBpZiAoIXByb3BWYWx1ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlID0gY2hlY2tQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGU7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKFJlYWN0SXMuaXNFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuOC42XG4gKiByZWFjdC1pcy5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTtcbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb25jdXJyZW50X21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKSA6IDB4ZWFkMDtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0O1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8XG4gIC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSk7XG59XG5cbi8qKlxuICogRm9ya2VkIGZyb20gZmJqcy93YXJuaW5nOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2ZianMvYmxvYi9lNjZiYTIwYWQ1YmU0MzNlYjU0NDIzZjJiMDk3ZDgyOTMyNGQ5ZGU2L3BhY2thZ2VzL2ZianMvc3JjL19fZm9ya3NfXy93YXJuaW5nLmpzXG4gKlxuICogT25seSBjaGFuZ2UgaXMgd2UgdXNlIGNvbnNvbGUud2FybiBpbnN0ZWFkIG9mIGNvbnNvbGUuZXJyb3IsXG4gKiBhbmQgZG8gbm90aGluZyB3aGVuICdjb25zb2xlJyBpcyBub3Qgc3VwcG9ydGVkLlxuICogVGhpcyByZWFsbHkgc2ltcGxpZmllcyB0aGUgY29kZS5cbiAqIC0tLVxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYGxvd1ByaW9yaXR5V2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmckMSA9IGxvd1ByaW9yaXR5V2FybmluZztcblxuZnVuY3Rpb24gdHlwZU9mKG9iamVjdCkge1xuICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsKSB7XG4gICAgdmFyICQkdHlwZW9mID0gb2JqZWN0LiQkdHlwZW9mO1xuICAgIHN3aXRjaCAoJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICB2YXIgdHlwZSA9IG9iamVjdC50eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciAkJHR5cGVvZlR5cGUgPSB0eXBlICYmIHR5cGUuJCR0eXBlb2Y7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2ZUeXBlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vLyBBc3luY01vZGUgaXMgZGVwcmVjYXRlZCBhbG9uZyB3aXRoIGlzQXN5bmNNb2RlXG52YXIgQXN5bmNNb2RlID0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xudmFyIENvbmN1cnJlbnRNb2RlID0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG52YXIgQ29udGV4dENvbnN1bWVyID0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xudmFyIENvbnRleHRQcm92aWRlciA9IFJFQUNUX1BST1ZJREVSX1RZUEU7XG52YXIgRWxlbWVudCA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcbnZhciBGb3J3YXJkUmVmID0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbnZhciBGcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG52YXIgTGF6eSA9IFJFQUNUX0xBWllfVFlQRTtcbnZhciBNZW1vID0gUkVBQ1RfTUVNT19UWVBFO1xudmFyIFBvcnRhbCA9IFJFQUNUX1BPUlRBTF9UWVBFO1xudmFyIFByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbnZhciBTdHJpY3RNb2RlID0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbnZhciBTdXNwZW5zZSA9IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG5cbnZhciBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IGZhbHNlO1xuXG4vLyBBc3luY01vZGUgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcbmZ1bmN0aW9uIGlzQXN5bmNNb2RlKG9iamVjdCkge1xuICB7XG4gICAgaWYgKCFoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSkge1xuICAgICAgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSB0cnVlO1xuICAgICAgbG93UHJpb3JpdHlXYXJuaW5nJDEoZmFsc2UsICdUaGUgUmVhY3RJcy5pc0FzeW5jTW9kZSgpIGFsaWFzIGhhcyBiZWVuIGRlcHJlY2F0ZWQsICcgKyAnYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBSZWFjdCAxNysuIFVwZGF0ZSB5b3VyIGNvZGUgdG8gdXNlICcgKyAnUmVhY3RJcy5pc0NvbmN1cnJlbnRNb2RlKCkgaW5zdGVhZC4gSXQgaGFzIHRoZSBleGFjdCBzYW1lIEFQSS4nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB8fCB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dENvbnN1bWVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTlRFWFRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dFByb3ZpZGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST1ZJREVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZvcndhcmRSZWYob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRnJhZ21lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTGF6eShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9MQVpZX1RZUEU7XG59XG5mdW5jdGlvbiBpc01lbW8ob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTUVNT19UWVBFO1xufVxuZnVuY3Rpb24gaXNQb3J0YWwob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUE9SVEFMX1RZUEU7XG59XG5mdW5jdGlvbiBpc1Byb2ZpbGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N0cmljdE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3VzcGVuc2Uob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbn1cblxuZXhwb3J0cy50eXBlT2YgPSB0eXBlT2Y7XG5leHBvcnRzLkFzeW5jTW9kZSA9IEFzeW5jTW9kZTtcbmV4cG9ydHMuQ29uY3VycmVudE1vZGUgPSBDb25jdXJyZW50TW9kZTtcbmV4cG9ydHMuQ29udGV4dENvbnN1bWVyID0gQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5Db250ZXh0UHJvdmlkZXIgPSBDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLkVsZW1lbnQgPSBFbGVtZW50O1xuZXhwb3J0cy5Gb3J3YXJkUmVmID0gRm9yd2FyZFJlZjtcbmV4cG9ydHMuRnJhZ21lbnQgPSBGcmFnbWVudDtcbmV4cG9ydHMuTGF6eSA9IExhenk7XG5leHBvcnRzLk1lbW8gPSBNZW1vO1xuZXhwb3J0cy5Qb3J0YWwgPSBQb3J0YWw7XG5leHBvcnRzLlByb2ZpbGVyID0gUHJvZmlsZXI7XG5leHBvcnRzLlN0cmljdE1vZGUgPSBTdHJpY3RNb2RlO1xuZXhwb3J0cy5TdXNwZW5zZSA9IFN1c3BlbnNlO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGU7XG5leHBvcnRzLmlzQXN5bmNNb2RlID0gaXNBc3luY01vZGU7XG5leHBvcnRzLmlzQ29uY3VycmVudE1vZGUgPSBpc0NvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lciA9IGlzQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlciA9IGlzQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzRm9yd2FyZFJlZiA9IGlzRm9yd2FyZFJlZjtcbmV4cG9ydHMuaXNGcmFnbWVudCA9IGlzRnJhZ21lbnQ7XG5leHBvcnRzLmlzTGF6eSA9IGlzTGF6eTtcbmV4cG9ydHMuaXNNZW1vID0gaXNNZW1vO1xuZXhwb3J0cy5pc1BvcnRhbCA9IGlzUG9ydGFsO1xuZXhwb3J0cy5pc1Byb2ZpbGVyID0gaXNQcm9maWxlcjtcbmV4cG9ydHMuaXNTdHJpY3RNb2RlID0gaXNTdHJpY3RNb2RlO1xuZXhwb3J0cy5pc1N1c3BlbnNlID0gaXNTdXNwZW5zZTtcbiAgfSkoKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcycpO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAoX19ERVZfXykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMSA/IGxlbiAtIDEgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAxOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDFdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkobnVsbCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy5pMThuOyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy52YWxpZGF0b3JzOyIsIm1vZHVsZS5leHBvcnRzID0gZWVqcy52YWx1ZU9iamVjdHM7IiwibW9kdWxlLmV4cG9ydHMgPSB3cC5jb21wb25lbnRzOyIsIm1vZHVsZS5leHBvcnRzID0gd3AuY29tcG9zZTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdwLmRhdGE7IiwibW9kdWxlLmV4cG9ydHMgPSB3cC5lbGVtZW50OyIsIm1vZHVsZS5leHBvcnRzID0gbG9kYXNoOyIsIm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7Il0sInNvdXJjZVJvb3QiOiIifQ==